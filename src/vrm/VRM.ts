import * as THREE from 'three';
import { VRMBlendShapeProxy } from './blendshape';
import { VRMFirstPerson } from './firstperson';
import { VRMHumanBones } from './humanoid';
import { VRMLookAtHead } from './lookat';
import { VRMSpringBoneManager } from './springbone';
import { RawVector3, RawVector4, VRMPose, VRMSchema } from './types';
import { deepDispose } from './utils/disposer';
import { VRMImporter, VRMImporterOptions } from './VRMImporter';

export interface VRMParameters {
  scene: THREE.Scene;
  humanBones?: VRMHumanBones;
  animationMixer?: THREE.AnimationMixer;
  blendShapeProxy?: VRMBlendShapeProxy;
  firstPerson?: VRMFirstPerson;
  lookAt?: VRMLookAtHead;
  materials?: THREE.Material[];
  springBoneManager?: VRMSpringBoneManager;
  meta?: VRMSchema.Meta;
}

export class VRM {
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
   * @param options Options that will be used in importer
   */
  public static async from(gltf: THREE.GLTF, options: VRMImporterOptions = {}): Promise<VRM> {
    const importer = new VRMImporter(options);
    return await importer.import(gltf);
  }
  /**
   * `THREE.Scene` that contains the entire VRM.
   */
  public readonly scene: THREE.Scene;

  /**
   * Contains [[VRMHumanBones]] of the VRM.
   * You can move or rotate these bones as a `THREE.Object3D`.
   * Each bones defined in VRM spec are either required or optional.
   * See also: [[VRM.setPose]]
   *
   * @TODO Add a link to VRM spec
   */
  public readonly humanBones?: VRMHumanBones;

  /**
   * Contains [[VRMBlendShapeProxy]] of the VRM.
   * You might want to control these facial expressions via [[VRMBlendShapeProxy.setValue]].
   */
  public readonly blendShapeProxy?: VRMBlendShapeProxy;

  /**
   * Contains [[VRMFirstPerson]] of the VRM.
   * You can use various feature of the firstPerson field.
   */
  public readonly firstPerson?: VRMFirstPerson;

  /**
   * Contains [[VRMLookAtHead]] of the VRM.
   * You might want to use [[VRMLookAtHead.setTarget]] to control the eye direction of your VRMs.
   */
  public readonly lookAt?: VRMLookAtHead;
  public readonly materials?: THREE.Material[];

  /**
   * Contains meta fields of the VRM.
   * You might want to refer these license fields before use your VRMs.
   */
  public readonly meta?: VRMSchema.Meta;

  /**
   * Contains AnimationMixer associated with the [[VRM.blendShapeProxy]].
   */
  public readonly animationMixer?: THREE.AnimationMixer;

  /**
   * A [[VRMSpringBoneManager]] manipulates all spring bones attached on the VRM.
   * Usually you don't have to care about this property.
   */
  public readonly springBoneManager?: VRMSpringBoneManager;

  /**
   * Contains informations about rest pose of the VRM.
   * You might want to refer this when you want to reset its pose, along with [[VRM.setPose]]}.
   */
  public readonly restPose: VRMPose | null;

  /**
   * Create a new VRM instance.
   *
   * @param params [[VRMParameters]] that represents components of the VRM
   */
  public constructor(params: VRMParameters) {
    this.scene = params.scene;
    this.humanBones = params.humanBones;
    this.animationMixer = params.animationMixer;
    this.blendShapeProxy = params.blendShapeProxy;
    this.firstPerson = params.firstPerson;
    this.lookAt = params.lookAt;
    this.materials = params.materials;
    this.springBoneManager = params.springBoneManager;
    this.meta = params.meta;

    // Save current initial pose (which is Rest-pose) to restPose field, since pose changing may lose the default transforms. This is useful when resetting the pose or referring default pose.
    this.restPose = this.humanBones
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

    if (this.materials) {
      this.materials.forEach((material: any) => {
        if (material.updateVRMMaterials) {
          material.updateVRMMaterials(delta);
        }
      });
    }
  }

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
