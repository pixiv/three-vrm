import * as THREE from 'three';
import { VRMBlendShapeProxy } from './blendshape';
import { VRMFirstPerson } from './firstperson';
import { VRMHumanBones } from './humanoid';
import { VRMLookAtHead } from './lookat';
import { MaterialConverter } from './material';
import { VRMSpringBoneManager } from './springbone';
import { GLTF, GLTFNode, RawVrmMeta, VRMPose } from './types';
import { deepDispose } from './utils/disposer';
import { VRMPartsBuilder } from './VRMPartsBuilder';

export class VRMBuilder {
  protected _materialConverter = new MaterialConverter(true);

  protected _partsBuilder = new VRMPartsBuilder();

  public materialConverter(materialConverter: MaterialConverter): VRMBuilder {
    this._materialConverter = materialConverter;
    return this;
  }

  public partsBuilder(partsBuilder: VRMPartsBuilder) {
    this._partsBuilder = partsBuilder;
    return this;
  }

  public build(gltf: GLTF): Promise<VRM> {
    return this._materialConverter
      .convertGLTFMaterials(gltf)
      .then((converted: GLTF) => new VRM(converted, this._partsBuilder));
  }
}

/**
 * Represents a VRM model.
 * It has so many feature to deal with your VRM models!
 * @param gltf A parsed result of GLTF taken from {@link VRMLoader#loadGLTF}
 * @param _builder A {@link VRMPartsBuilder}. Usually you don't have to care about it
 */
export class VRM {
  /**
   * Create a {@link VRM} using Builder pattern.
   * See the reference of {@link VRMBuilder} for further use.
   */
  public static get Builder(): VRMBuilder {
    return new VRMBuilder();
  }

  /**
   * Create a {@link VRM} from A parsed result of GLTF taken from {@link VRMLoader#loadGLTF}.
   * It's probably a thing what you want to get started with VRMs.
   */
  public static from(gltf: GLTF): Promise<VRM> {
    return new VRMBuilder().build(gltf);
  }

  /**
   * Contains informations about rest pose of the VRM.
   * You might want to refer this when you want to reset its pose, along with {@link VRM#setPose}.
   */
  public readonly restPose: VRMPose = {};

  /**
   * Contains {@link VRMHumanBones} of the VRM.
   * You can move or rotate these bones as a `THREE.Object3D`.
   * Each bones defined in VRM spec are either required or optional.
   * See also: {@link VRM#setPose}
   * @TODO Add a link to VRM spec
   */
  public readonly humanBones: VRMHumanBones;

  /**
   * Contains {@link VRMBlendShapeProxy} of the VRM.
   * You might want to control these facial expressions via {@link VRMBlendShapeProxy#setValue}.
   */
  public readonly blendShapeProxy: VRMBlendShapeProxy;

  /**
   * Contains {@link VRMFirstPerson} of the VRM.
   * You can use various feature of the firstPerson field.
   */
  public readonly firstPerson: VRMFirstPerson | null;

  /**
   * Contains {@link VRMLookAtHead} of the VRM.
   * You might want to use {@link VRMLookAtHead#setTarget} to control the eye direction of your VRMs.
   */
  public readonly lookAt: VRMLookAtHead;

  /**
   * Contains meta fields of the VRM.
   * You might want to refer these license fields before use your VRMs.
   */
  public readonly meta: RawVrmMeta;

  /**
   * Contains AnimationMixer associated with the {@link VRM#blendShapeProxy}.
   */
  public readonly animationMixer: THREE.AnimationMixer;

  /**
   * A {@link VRMSpringBoneManager} manipulates all spring bones attached on the VRM.
   * Usually you don't have to touch this property.
   */
  public readonly springBoneManager: VRMSpringBoneManager;

  /**
   * A map of nodes indexed by original gltf node array.
   */
  protected readonly nodesMap: GLTFNode[];

  /**
   * A parsed result of GLTF taken from {@link VRMLoader#loadGLTF}.
   */
  private readonly _gltf: GLTF;

  private readonly _partsBuilder: VRMPartsBuilder;

  constructor(gltf: GLTF, _builder?: VRMPartsBuilder) {
    if (_builder) {
      this._partsBuilder = _builder;
    } else {
      this._partsBuilder = new VRMPartsBuilder();
    }

    this._gltf = gltf;

    if (gltf.parser.json.extensions === undefined || gltf.parser.json.extensions.VRM === undefined) {
      throw new Error('not a VRM file');
    }
    const vrmExt = gltf.parser.json.extensions.VRM;

    this.meta = vrmExt.meta;

    gltf.scene.updateMatrixWorld(false);

    // Skinned object should not be frustumCulled
    // Since pre-skinned position might be outside of view
    gltf.scene.traverse((object3d) => {
      if ((object3d as any).isMesh) {
        object3d.frustumCulled = false;
      }
    });

    reduceBones(gltf.scene);

    this.nodesMap = this._partsBuilder.getNodesMap(gltf);
    const humanBones = this._partsBuilder.loadHumanoid(gltf, this.nodesMap);
    if (!humanBones) {
      throw new Error('no humans bones found. confirm your vrm file');
    }
    this.humanBones = humanBones;

    this.firstPerson = this._partsBuilder.loadFirstPerson(vrmExt.firstPerson, this.nodesMap, this.humanBones, gltf);

    this.animationMixer = new THREE.AnimationMixer(gltf.scene);
    const blendShapeProxy = this._partsBuilder.loadBlendShapeMaster(this.animationMixer, gltf);
    if (!blendShapeProxy) {
      throw new Error('failed to create blendShape. confirm your vrm file');
    }
    this.blendShapeProxy = blendShapeProxy;
    this.springBoneManager = this._partsBuilder.loadSecondary(gltf, this.nodesMap);
    this.lookAt = this._partsBuilder.loadLookAt(vrmExt.firstPerson, this.blendShapeProxy, this.humanBones);

    // 破壊的な変更後もrestposeにリセットできるように初期状態ポーズを保存。
    Object.keys(this.humanBones).forEach((vrmBoneName) => {
      const bone = this.humanBones[vrmBoneName]!;
      this.restPose[vrmBoneName] = {
        position: bone.position.toArray(),
        rotation: bone.quaternion.toArray(),
      };
    });
  }

  public setPose(poseObject: VRMPose): void {
    // VRMに定められたboneが足りない場合、正しくposeが取れない可能性がある

    Object.keys(poseObject).forEach((boneName) => {
      const state = poseObject[boneName]!;
      const targetBone = this.humanBones[boneName];

      // VRM標準ボーンを満たしていないVRMファイルが世の中には存在する
      // （少し古いuniVRMは、必須なのにhipsを出力していなさそう）
      // その場合は無視。
      if (!targetBone) {
        return;
      }

      const restState = this.restPose[boneName];
      if (!restState) {
        return;
      }

      if (state.position) {
        // 元の状態に戻してから、移動分を追加
        targetBone.position.set(
          restState.position![0] + state.position[0],
          restState.position![1] + state.position[1],
          restState.position![2] + state.position[2],
        );
      }
      if (state.rotation) {
        targetBone.quaternion.fromArray(state.rotation);
      }
    });
  }

  get scene() {
    return this._gltf.scene;
  }

  public update(delta: number): void {
    this.lookAt.update();
    this.animationMixer.update(delta);
    this.blendShapeProxy.update();
    this.springBoneManager.lateUpdate(delta);
  }

  public dispose(): void {
    const scene = this.scene;
    while (scene.children.length > 0) {
      const object = scene.children[scene.children.length - 1];
      deepDispose(object);
      scene.remove(object);
    }
  }
}

function reduceBones(root: THREE.Object3D): void {
  // Traverse an entire tree
  root.traverse((obj) => {
    if (obj.type !== 'SkinnedMesh') {
      return;
    }

    const mesh = obj as THREE.SkinnedMesh;
    const geometry = (mesh.geometry as THREE.BufferGeometry).clone();
    mesh.geometry = geometry;
    const attribute = geometry.getAttribute('skinIndex');

    // generate reduced bone list
    const bones: THREE.Bone[] = []; // new list of bone
    const boneInverses: THREE.Matrix4[] = []; // new list of boneInverse
    const boneIndexMap: { [index: number]: number } = {}; // map of old bone index vs. new bone index
    const array = (attribute.array as any).map((index: number) => {
      // new skinIndex buffer
      if (boneIndexMap[index] === undefined) {
        boneIndexMap[index] = bones.length;
        bones.push(mesh.skeleton.bones[index]);
        boneInverses.push(mesh.skeleton.boneInverses[index]);
      }
      return boneIndexMap[index];
    });

    // attach new skinIndex buffer
    geometry.removeAttribute('skinIndex');
    geometry.addAttribute('skinIndex', new THREE.BufferAttribute(array, 4, false));
    mesh.bind(new THREE.Skeleton(bones, boneInverses), new THREE.Matrix4());
    //                                                ^^^^^^^^^^^^^^^^^^^ transform of meshes should be ignored
    // See: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#skins
  });
}
