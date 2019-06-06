import * as THREE from 'three'
import { BlendShapeController, BlendShapeMaster, VRMBlendShapeProxy} from './blendshape'
import { RendererFirstPersonFlags, VRMFirstPerson } from './firstperson'
import { VRMHumanBones } from './humanoid'
import { VRMLookAtHead } from './lookat'
import { VRMLookAtBlendShapeApplyer } from './lookat/VRMLookAtBlendShapeApplyer'
import { VRMLookAtBoneApplyer } from './lookat/VRMLookAtBoneApplyer'
import { VRMSpringBoneManager } from './springbone'
import { GLTF, GLTFNode, GLTFPrimitive, RawVrmHumanoidBone } from './types'
import * as Raw from './types/VRM'

export class VRMPartsBuilder {

  /**
   * @param {GLTF} gltf
   * @returns {GLTFNode[]}
   */
  public getNodesMap (gltf: GLTF): GLTFNode[] {
    const nodesMap: GLTFNode[] = []
    gltf.scene.traverse((object3D) => {
      const index: number = object3D.userData.gltfIndex && object3D.userData.gltfIndex.nodes
      if (index !== undefined) {
        nodesMap[index] = object3D
      }
    })
    return nodesMap
  }

  /**
   * load humanoid
   * @param {GLTF} gltf
   * @param {GLTFNode[]} nodesMap
   * @returns {VRMHumanBones | null}
   */
  public loadHumanoid (gltf: GLTF, nodesMap: GLTFNode[]): VRMHumanBones | null {
    const humanBones: RawVrmHumanoidBone[] | undefined =
      gltf.parser.json.extensions &&
      gltf.parser.json.extensions.VRM &&
      gltf.parser.json.extensions.VRM.humanoid &&
      gltf.parser.json.extensions.VRM.humanoid.humanBones
    if (!humanBones) {
      return null
    }

    return humanBones.reduce(
      (vrmBones, bone) => {
        const nodeIndex = bone.node
        const boneName = bone.bone

        if (nodeIndex !== undefined && boneName !== undefined) {
          vrmBones[boneName] = nodesMap[nodeIndex]
        }
        return vrmBones
      },
      {} as VRMHumanBones,
    )
  }

  /**
   * load first person
   * @param {VrmFirstPerson | undefined} firstPerson
   * @param {GLTFNode[]} nodesMap
   * @param {VRMHumanBones} humanBones
   * @param {GLTF} gltf
   * @returns { | undefined}
   */
  public loadFirstPerson (
    firstPerson: Raw.RawVrmFirstPerson | undefined,
    nodesMap: GLTFNode[],
    humanBones: VRMHumanBones,
    gltf: GLTF,
  ): VRMFirstPerson | null {
    if (!firstPerson) {
      return null
    }

    const isFirstPersonBoneNotSet = firstPerson.firstPersonBone === undefined || firstPerson.firstPersonBone === -1
    const firstPersonBone = isFirstPersonBoneNotSet
      ? nodesMap.find((node) => node.name === humanBones[Raw.HumanBone.Head].name)
      : nodesMap[firstPerson.firstPersonBone!]

    if (!firstPersonBone) {
      console.warn(`no firstPersonBone found at ${firstPersonBone}`)
      return null
    }

    const firstPersonBoneOffset =
      !isFirstPersonBoneNotSet && firstPerson.firstPersonBoneOffset
        ? new THREE.Vector3(
        firstPerson.firstPersonBoneOffset!.x,
        firstPerson.firstPersonBoneOffset!.y,
        firstPerson.firstPersonBoneOffset!.z,
        )
        : new THREE.Vector3(0, 0.06, 0)

    const meshes = gltf.parser.json.nodes!.filter((item) => item.mesh !== undefined && item.mesh >= 0)
    if (!meshes.length) {
      console.warn('there are no mesh')
      return null
    }

    const meshAnnotations: RendererFirstPersonFlags[] = []
    meshes.forEach((mesh) => {
      const sanitizedName = THREE.PropertyBinding.sanitizeNodeName(mesh.name!)
      const node = nodesMap.find((e) => e.name === sanitizedName)
      if (!node) {
        console.warn(`no node found for raw node '${sanitizedName}'`)
        return null
      }
      const setting = (firstPerson.meshAnnotations || [])
        .find((annotation: Raw.RawVrmFirstPersonMeshannotation) => annotation.mesh === mesh.mesh)
      meshAnnotations.push(new RendererFirstPersonFlags(setting && setting.firstPersonFlag, node))
    })
    return new VRMFirstPerson(firstPersonBone, firstPersonBoneOffset, meshAnnotations)
  }


  public loadLookAt (firstPerson: Raw.RawVrmFirstPerson, blendShapeProxy: VRMBlendShapeProxy, humanBodyBones: VRMHumanBones): VRMLookAtHead {
    const lookAtHorizontalInner = firstPerson.lookAtHorizontalInner
    const lookAtHorizontalOuter = firstPerson.lookAtHorizontalOuter
    const lookAtVerticalDown = firstPerson.lookAtVerticalDown
    const lookAtVerticalUp = firstPerson.lookAtVerticalUp

    switch (firstPerson.lookAtTypeName) {
      case Raw.LookAtTypeName.Bone: {
        if (
          lookAtHorizontalInner === undefined ||
          lookAtHorizontalOuter === undefined ||
          lookAtVerticalDown === undefined ||
          lookAtVerticalUp === undefined
        ) {
          return new VRMLookAtHead(humanBodyBones)
        } else {
          return new VRMLookAtHead(humanBodyBones, new VRMLookAtBoneApplyer(
            humanBodyBones,
            lookAtHorizontalInner,
            lookAtHorizontalOuter,
            lookAtVerticalDown,
            lookAtVerticalUp
          ))
        }
      }
      case Raw.LookAtTypeName.BlendShape: {
        if (lookAtHorizontalOuter === undefined || lookAtVerticalDown === undefined || lookAtVerticalUp === undefined) {
          return new VRMLookAtHead(humanBodyBones)
        } else {
          return new VRMLookAtHead(humanBodyBones, new VRMLookAtBlendShapeApplyer(
            blendShapeProxy,
            lookAtHorizontalOuter,
            lookAtVerticalDown,
            lookAtVerticalUp
          ))
        }
      }
      default: {
        return new VRMLookAtHead(humanBodyBones)
      }
    }
  }

  /**
   *
   * @param {AnimationMixer} animationMixer
   * @param {GLTF} gltf
   * @returns {VRMBlendShapeProxy}
   */
  public loadBlendShapeMaster (animationMixer: THREE.AnimationMixer, gltf: GLTF): VRMBlendShapeProxy | null {

    const meshes = this.getMeshesMap(gltf)
    if (!meshes) {
      return null
    }

    const materials = this.getMaterialsMap(gltf)
    if (!materials) {
      return null
    }

    const blendShapeGroups: Raw.RawVrmBlendShapeGroup[] | undefined =
      gltf.parser.json.extensions &&
      gltf.parser.json.extensions.VRM &&
      gltf.parser.json.extensions.VRM.blendShapeMaster &&
      gltf.parser.json.extensions.VRM.blendShapeMaster.blendShapeGroups
    if (!blendShapeGroups) {
      return null
    }

    const blendShapeMaster = new BlendShapeMaster()
    const blendShapePresetMap: { [presetName in Raw.BlendShapePresetName]?: string } = {}

    blendShapeGroups.forEach((group) => {
      const name = group.name
      if (name === undefined) {
        console.warn('createBlendShapeMasterFromVRM: One of blendShapeGroups has no name')
        return
      }

      if (group.presetName && group.presetName !== Raw.BlendShapePresetName.Unknown && !blendShapePresetMap[group.presetName]) {
        blendShapePresetMap[group.presetName] = group.name
      }

      const controller = new BlendShapeController(name)
      gltf.scene.add(controller)

      controller.isBinary = group.isBinary || false

      if (Array.isArray(group.binds)) {
        group.binds.forEach((bind) => {
          if (bind.mesh === undefined || bind.index === undefined) {
            return
          }

          const morphMeshes = meshes[bind.mesh]
          const morphTargetIndex = bind.index
          if (
            !morphMeshes.every(
              (primitive) =>
                Array.isArray(primitive.morphTargetInfluences) &&
                morphTargetIndex < primitive.morphTargetInfluences.length,
            )
          ) {
            console.warn(
              `createBlendShapeMasterFromVRM: ${group.name} attempts to index ${morphTargetIndex}th morph but not found.`,
            )
            return
          }

          controller.addBind({
            meshes: morphMeshes,
            morphTargetIndex,
            weight: bind.weight || 100,
          })
        })
      }

      const materialValues = group.materialValues
      if (Array.isArray(materialValues)) {
        materialValues.forEach((materialValue) => {
          if (
            materialValue.materialName === undefined ||
            materialValue.propertyName === undefined ||
            materialValue.targetValue === undefined
          ) {
            return
          }

          const material = materials.find((m) => m.name === materialValue.materialName)
          if (!material) {
            return
          }

          controller.addMaterialValue({
            material,
            propertyName: this.renameMaterialProperty(materialValue.propertyName),
            targetValue: materialValue.targetValue,
          })
        })
      }

      blendShapeMaster.registerBlendShapeGroup(name, controller)

      // TODO: materialBinds
    })

    return VRMBlendShapeProxy.create(animationMixer, blendShapeMaster, blendShapePresetMap)
  }

  public loadSecondary (gltf: GLTF, nodesMap: GLTFNode[]): VRMSpringBoneManager {
    return new VRMSpringBoneManager(gltf, nodesMap)
  }

  private renameMaterialProperty (name: string): string {
    if (name[0] !== '_') {
      console.warn(`VRMMaterials: Given property name "${name}" might be invalid`)
      return name
    }
    name = name.substring(1)

    if (!/[A-Z]/.test(name[0])) {
      console.warn(`VRMMaterials: Given property name "${name}" might be invalid`)
      return name
    }
    return name[0].toLowerCase() + name.substring(1)
  }

// three.jsの各オブジェクトが、「glTF上でのmeshesの順番」と一致する配列をつくる
  private getMeshesMap (gltf: GLTF): GLTFPrimitive[][] {
    const meshesMap: GLTFPrimitive[][] = []

    gltf.scene.traverse((object3D) => {
      const index: number = object3D.userData.gltfIndex && object3D.userData.gltfIndex.meshes
      if (index !== undefined) {
        if (meshesMap[index] === undefined) {
          meshesMap[index] = []
        }

        // find index, against non-flattened mesh node
        // TODO: is this still required?
        // See: https://github.com/mrdoob/three.js/issues/11944
        const i = object3D.name.lastIndexOf('_')
        let geometryIndex = i !== -1 ? parseInt(object3D.name.substr(i + 1), 10) : 0
        if (isNaN(geometryIndex)) {
          geometryIndex = 0
        }
        meshesMap[index][geometryIndex] = object3D as GLTFPrimitive
      }
    })

    return meshesMap
  }

  // three.jsの各マテリアルが、「glTF上でのmaterialsの順番」と一致する配列をつくる
  private getMaterialsMap (gltf: GLTF): THREE.Material[] {
    const materialsMap: THREE.Material[] = []

    gltf.scene.traverse((object3D) => {
      if ((object3D as any).isMesh) {
        const mesh = object3D as THREE.Mesh

        if (Array.isArray(mesh.material)) {
          (mesh.material as THREE.Material[]).forEach((material) => {
            const index: number = material.userData.gltfIndex && material.userData.gltfIndex.materials
            if (index !== undefined && materialsMap[index] === undefined) {
              materialsMap[index] = material
            }
          })
        } else {
          const material = mesh.material as THREE.Material
          const index: number = material.userData.gltfIndex && material.userData.gltfIndex.materials
          if (index !== undefined && materialsMap[index] === undefined) {
            materialsMap[index] = material
          }
        }
      }
    })

    return materialsMap
  }

}