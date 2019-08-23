import * as THREE from 'three';
import { VRMBlendShapeMaster } from './blendshape';
import { VRMFirstPerson } from './firstperson';
import { VRMHumanBones } from './humanoid';
import { VRMLookAtHead } from './lookat';
import { VRMSpringBoneManager } from './springbone';
import { RawVrmMeta, VRMPose } from './types';
import { deepDispose } from './utils/disposer';
import { VRMImporter, VRMImporterOptions } from './VRMImporter';

export interface VRMParameters {
  scene: THREE.Scene;
  humanBones?: VRMHumanBones;
  blendShapeMaster?: VRMBlendShapeMaster;
  firstPerson?: VRMFirstPerson;
  lookAt?: VRMLookAtHead;
  materials?: THREE.Material[];
  springBoneManager?: VRMSpringBoneManager;
  meta?: RawVrmMeta;
}

export class VRM {
  public static async from(gltf: THREE.GLTF, options: VRMImporterOptions = {}): Promise<VRM> {
    const importer = new VRMImporter(options);
    return await importer.import(gltf);
  }

  public readonly scene: THREE.Scene;
  public readonly humanBones?: VRMHumanBones;
  public readonly blendShapeMaster?: VRMBlendShapeMaster;
  public readonly firstPerson?: VRMFirstPerson;
  public readonly lookAt?: VRMLookAtHead;
  public readonly materials?: THREE.Material[];
  public readonly meta?: RawVrmMeta;
  public readonly springBoneManager?: VRMSpringBoneManager;

  public readonly restPose: VRMPose | null;

  public constructor(params: VRMParameters) {
    this.scene = params.scene;
    this.humanBones = params.humanBones;
    this.blendShapeMaster = params.blendShapeMaster;
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
              position: bone.position.toArray(),
              rotation: bone.quaternion.toArray(),
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

  public update(delta: number): void {
    if (this.lookAt) {
      this.lookAt.update();
    }

    if (this.blendShapeMaster) {
      this.blendShapeMaster.update();
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
