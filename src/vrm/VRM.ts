import * as THREE from 'three';
import { VRMBlendShapeProxy } from './blendshape';
import { VRMFirstPerson } from './firstperson';
import { VRMHumanBones } from './humanoid';
import { VRMLookAtHead } from './lookat';
import { MaterialConverter } from './material';
import { VRMSpringBoneManager } from './springbone';
import { RawVector3, RawVector4, RawVrmMeta, VRMPose } from './types';
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

  public async build(gltf: THREE.GLTF): Promise<VRM> {
    const vrm = new VRM(this._partsBuilder);
    const convertedGltf = await this._materialConverter.convertGLTFMaterials(gltf);
    await vrm.loadGLTF(convertedGltf);
    return vrm;
  }
}

/**
 * Represents a VRM model.
 * It has so many feature to deal with your VRM models!
 *
 * @example Most basic use of VRM
 * ```
 * const scene = new THREE.Scene();
 *
 * new THREE.GLTFLoader().load( 'models/shino.vrm', ( gltf ) => {
 *
 *   THREE.VRM.from( gltf ).then( ( vrm ) => {
 *
 *     scene.add( vrm.scene );
 *
 *   } );
 *
 * } );
 * ```
 */
export class VRM {
  /**
   * Create a [[VRM]] using Builder pattern.
   * See the reference of [[VRMBuilder]] for further use.
   */
  public static get Builder(): VRMBuilder {
    return new VRMBuilder();
  }

  /**
   * Create a [[VRM]] from a parsed result of GLTF taken from GLTFLoader.
   * It's probably a thing what you want to get started with VRMs.
   *
   * @example Most basic use of VRM
   * ```
   * const scene = new THREE.Scene();
   *
   * new THREE.GLTFLoader().load( 'models/shino.vrm', ( gltf ) => {
   *
   *   THREE.VRM.from( gltf ).then( ( vrm ) => {
   *
   *     scene.add( vrm.scene );
   *
   *   } );
   *
   * } );
   * ```
   *
   * @param gltf A parsed GLTF object taken from GLTFLoader
   */
  public static from(gltf: THREE.GLTF): Promise<VRM> {
    return new VRMBuilder().build(gltf);
  }

  private _restPose?: VRMPose | null;

  /**
   * Contains informations about rest pose of the VRM.
   * You might want to refer this when you want to reset its pose, along with [[VRM.setPose]]}.
   */
  public get restPose() {
    return this._restPose;
  }

  private _humanBones?: VRMHumanBones | null;

  /**
   * Contains [[VRMHumanBones]] of the VRM.
   * You can move or rotate these bones as a `THREE.Object3D`.
   * Each bones defined in VRM spec are either required or optional.
   * See also: [[VRM.setPose]]
   *
   * @TODO Add a link to VRM spec
   */
  public get humanBones() {
    return this._humanBones;
  }

  private _blendShapeProxy?: VRMBlendShapeProxy | null;

  /**
   * Contains [[VRMBlendShapeProxy]] of the VRM.
   * You might want to control these facial expressions via [[VRMBlendShapeProxy.setValue]].
   */
  public get blendShapeProxy() {
    return this._blendShapeProxy;
  }

  private _firstPerson?: VRMFirstPerson | null;

  /**
   * Contains [[VRMFirstPerson]] of the VRM.
   * You can use various feature of the firstPerson field.
   */
  public get firstPerson() {
    return this._firstPerson;
  }

  private _lookAt?: VRMLookAtHead | null;

  /**
   * Contains [[VRMLookAtHead]] of the VRM.
   * You might want to use [[VRMLookAtHead.setTarget]] to control the eye direction of your VRMs.
   */
  public get lookAt() {
    return this._lookAt;
  }

  private _meta?: RawVrmMeta;

  /**
   * Contains meta fields of the VRM.
   * You might want to refer these license fields before use your VRMs.
   */
  public get meta() {
    return this._meta;
  }

  private _animationMixer?: THREE.AnimationMixer;

  /**
   * Contains AnimationMixer associated with the [[VRM.blendShapeProxy]].
   */
  public get animationMixer() {
    return this._animationMixer;
  }

  private _springBoneManager?: VRMSpringBoneManager;

  /**
   * A [[VRMSpringBoneManager]] manipulates all spring bones attached on the VRM.
   * Usually you don't have to care about this property.
   */
  public get springBoneManager() {
    return this._springBoneManager;
  }

  /**
   * A parsed result of GLTF taken from GLTFLoader.
   */
  private _gltf?: THREE.GLTF;

  private readonly _partsBuilder: VRMPartsBuilder;

  /**
   * Create a new VRM instance.
   *
   * @param _builder A [[VRMPartsBuilder]]. Usually you don't have to care about it
   */
  constructor(_builder?: VRMPartsBuilder) {
    if (_builder) {
      this._partsBuilder = _builder;
    } else {
      this._partsBuilder = new VRMPartsBuilder();
    }
  }

  /**
   * Receive a GLTF object retrieved from `THREE.GLTFLoader` and load VRM components.
   *
   * @param gltf A parsed result of GLTF taken from GLTFLoader
   */
  public async loadGLTF(gltf: THREE.GLTF): Promise<void> {
    this._gltf = gltf;

    if (gltf.parser.json.extensions === undefined || gltf.parser.json.extensions.VRM === undefined) {
      throw new Error('Could not find VRM extension on the GLTF');
    }
    const vrmExt = gltf.parser.json.extensions.VRM;

    this._meta = vrmExt.meta;

    gltf.scene.updateMatrixWorld(false);

    // Skinned object should not be frustumCulled
    // Since pre-skinned position might be outside of view
    gltf.scene.traverse((object3d) => {
      if ((object3d as any).isMesh) {
        object3d.frustumCulled = false;
      }
    });

    reduceBones(gltf.scene);

    const humanBones = await this._partsBuilder.loadHumanoid(gltf);
    this._humanBones = humanBones;

    this._firstPerson = this.humanBones
      ? await this._partsBuilder.loadFirstPerson(vrmExt.firstPerson, this.humanBones, gltf)
      : null;

    this._animationMixer = new THREE.AnimationMixer(gltf.scene);
    const blendShapeProxy = await this._partsBuilder.loadBlendShapeMaster(this.animationMixer!, gltf);
    if (!blendShapeProxy) {
      throw new Error('failed to create blendShape. confirm your vrm file');
    }

    this._blendShapeProxy = blendShapeProxy;

    this._springBoneManager = await this._partsBuilder.loadSecondary(gltf);

    this._lookAt =
      this.blendShapeProxy && this.humanBones
        ? this._partsBuilder.loadLookAt(vrmExt.firstPerson, this.blendShapeProxy, this.humanBones)
        : null;

    // Save current initial pose (which is Rest-pose) to restPose field, since pose changing may lose the default transforms. This is useful when resetting the pose or referring default pose.
    this._restPose = this.humanBones
      ? Object.keys(this.humanBones).reduce(
          (restPose, vrmBoneName) => {
            const bone = this.humanBones![vrmBoneName]!;
            restPose[vrmBoneName] = {
              position: bone.position.toArray() as RawVector3,
              rotation: bone.quaternion.toArray() as RawVector4,
            };
            return restPose;
          },
          {} as VRMPose,
        )
      : null;
  }

  /**
   * Let the VRM do a given pose.
   *
   * @param poseObject [[VRMPose]] represents a pose
   */
  public setPose(poseObject: VRMPose): void {
    // VRMに定められたboneが足りない場合、正しくposeが取れない可能性がある
    if (!this.humanBones) {
      console.warn('This VRM cannot be posed since humanBones are not properly set');
      return;
    }

    Object.keys(poseObject).forEach((boneName) => {
      const state = poseObject[boneName]!;
      const targetBone = this.humanBones![boneName];

      // VRM標準ボーンを満たしていないVRMファイルが世の中には存在する
      // （少し古いuniVRMは、必須なのにhipsを出力していなさそう）
      // その場合は無視。
      if (!targetBone) {
        return;
      }

      const restState = this.restPose![boneName];
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

  /**
   * Contains the scene of the entire VRM.
   * You might want to do `scene.add( vrm.scene )`.
   * It is an equivalent of `gltf.scene`.
   */
  get scene() {
    return this._gltf && this._gltf.scene;
  }

  /**
   * **You need to call this on your update loop.**
   *
   * This function updates every VRM components.
   *
   * @param delta deltaTime
   */
  public update(delta: number): void {
    if (this.lookAt) {
      this.lookAt.update();
    }

    if (this.animationMixer) {
      this.animationMixer.update(delta);
    }

    if (this.blendShapeProxy) {
      this.blendShapeProxy.update();
    }

    if (this.springBoneManager) {
      this.springBoneManager.lateUpdate(delta);
    }
  }

  /**
   * Dispose the VRM.
   * You might want to call this when you want to unload the VRM model.
   */
  public dispose(): void {
    const scene = this.scene;
    if (scene) {
      while (scene.children.length > 0) {
        const object = scene.children[scene.children.length - 1];
        deepDispose(object);
        scene.remove(object);
      }
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
    //                                                 ^^^^^^^^^^^^^^^^^^^ transform of meshes should be ignored
    // See: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#skins
  });
}
