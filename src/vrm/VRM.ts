import * as THREE from 'three'
import { VRMBlendShapeProxy } from './blendshape'
import { VRMFirstPerson } from './firstperson'
import { VRMHumanBones } from './humanoid'
import { VRMLookAtHead } from './lookat'
import { MaterialConverter } from "./material";
import { VRMSpringBoneManager } from './springbone'
import { GLTF, GLTFNode, RawVrmMeta,VRMPose } from './types'
import { VRMPartsBuilder } from './VRMPartsBuilder'

export class VRMBuilder {

  protected _materialConverter = new MaterialConverter(true)

  protected _partsBuilder = new VRMPartsBuilder()

  public materialConverter(materialConverter: MaterialConverter) : VRMBuilder{
    this._materialConverter = materialConverter;
    return this;
  }

  public partsBuilder(partsBuilder: VRMPartsBuilder){
    this._partsBuilder = partsBuilder;
    return this;
  }

  public build(gltf: GLTF,) : Promise<VRM> {
    return this._materialConverter.convertGLTFMaterials(gltf)
      .then( (converted: GLTF) => new VRM(converted, this._partsBuilder))
  }
}

export class VRM {

  public static get Builder() : VRMBuilder {
    return new VRMBuilder()
  }

  public static from(gltf:GLTF) : Promise<VRM> {
    return new VRMBuilder().build(gltf)
  }

  public readonly restPose: VRMPose
  public readonly humanBones: VRMHumanBones
  public readonly blendShapeProxy: VRMBlendShapeProxy
  public readonly firstPerson: VRMFirstPerson
  public readonly lookAt: VRMLookAtHead
  public readonly meta: RawVrmMeta
  public readonly animationMixer: THREE.AnimationMixer

  public readonly springBoneManager: VRMSpringBoneManager
  protected readonly nodesMap: GLTFNode[]

  private readonly _gltf: GLTF

  private readonly _partsBuilder: VRMPartsBuilder

  constructor (gltf: GLTF, _builder?: VRMPartsBuilder) {

    if(_builder) {
      this._partsBuilder = _builder
    }else {
      this._partsBuilder = new VRMPartsBuilder()
    }

    this._gltf = gltf

    if (gltf.parser.json.extensions === undefined || gltf.parser.json.extensions.VRM === undefined) {
      throw new Error('not a VRM file')
    }
    const vrmExt = gltf.parser.json.extensions.VRM

    this.meta = vrmExt.meta

    gltf.scene.updateMatrixWorld(false)

    // Skinned object should not be frustumCulled
    // Since pre-skinned position might be outside of view
    gltf.scene.traverse((object3d) => {
      if ((object3d as any).isMesh) {
        object3d.frustumCulled = false
      }
    })

    reduceBones(gltf.scene)

    this.nodesMap = this._partsBuilder.getNodesMap(gltf)
    this.humanBones = this._partsBuilder.loadHumanoid(gltf, this.nodesMap)
    this.firstPerson = this._partsBuilder.loadFirstPerson(vrmExt.firstPerson, this.nodesMap, this.humanBones, gltf)

    this.animationMixer = new THREE.AnimationMixer(gltf.scene)
    this.blendShapeProxy = this._partsBuilder.loadBlendShapeMaster(this.animationMixer, gltf)
    this.springBoneManager = this._partsBuilder.loadSecondary(gltf, this.nodesMap)
    this.lookAt = this._partsBuilder.loadLookAt(vrmExt.firstPerson, this.blendShapeProxy, this.humanBones)

    // 破壊的な変更後もrestposeにリセットできるように初期状態ポーズを保存。
    this.restPose = {}
    Object.keys(this.humanBones).forEach((vrmBoneName) => {
      const bone = this.humanBones[vrmBoneName]!
      this.restPose[vrmBoneName] = {
        position: bone.position.toArray(),
        rotation: bone.quaternion.toArray(),
      }
    })
  }

  public setPose (poseObject: VRMPose): void {
    // VRMに定められたboneが足りない場合、正しくposeが取れない可能性がある

    Object.keys(poseObject).forEach((boneName) => {
      const state = poseObject[boneName]!
      const targetBone = this.humanBones[boneName]

      // VRM標準ボーンを満たしていないVRMファイルが世の中には存在する
      // （少し古いuniVRMは、必須なのにhipsを出力していなさそう）
      // その場合は無視。
      if (!targetBone) {
        return
      }

      const restState = this.restPose[boneName]
      if (!restState) {
        return
      }

      if (state.position) {
        // 元の状態に戻してから、移動分を追加
        targetBone.position.set(
          restState.position[0] + state.position[0],
          restState.position[1] + state.position[1],
          restState.position[2] + state.position[2],
        )
      }
      if (state.rotation) {
        targetBone.quaternion.fromArray(state.rotation)
      }
    })
  }

  get scene () {
    return this._gltf.scene
  }

  public update (delta: number): void {

    this.lookAt.update()
    this.animationMixer.update(delta)
    this.blendShapeProxy.update()
    this.springBoneManager.lateUpdate(delta)

  }
}

function reduceBones (root: THREE.Object3D): void {
  // Traverse an entire tree
  root.traverse((obj) => {
    if (obj.type !== 'SkinnedMesh') {
      return
    }

    const mesh = obj as THREE.SkinnedMesh
    const geometry = (mesh.geometry as THREE.BufferGeometry).clone()
    mesh.geometry = geometry
    const attribute = geometry.getAttribute('skinIndex')

    // generate reduced bone list
    const bones: THREE.Bone[] = [] // new list of bone
    const boneInverses: THREE.Matrix4[] = [] // new list of boneInverse
    const boneIndexMap: { [index: number]: number } = {} // map of old bone index vs. new bone index
    const array = (attribute.array as any).map((index: number) => {
      // new skinIndex buffer
      if (boneIndexMap[index] === undefined) {
        boneIndexMap[index] = bones.length
        bones.push(mesh.skeleton.bones[index])
        boneInverses.push(mesh.skeleton.boneInverses[index])
      }
      return boneIndexMap[index]
    })

    // attach new skinIndex buffer
    geometry.removeAttribute('skinIndex')
    geometry.addAttribute('skinIndex', new THREE.BufferAttribute(array, 4, false))
    mesh.bind(new THREE.Skeleton(bones, boneInverses), new THREE.Matrix4())
    //                                                ^^^^^^^^^^^^^^^^^^^ transform of meshes should be ignored
    // See: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#skins
  })
}