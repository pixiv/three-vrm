import { GLTFNode, HumanBone, VRMPose } from '../types';
import { VRMHumanBone } from './VRMHumanBone';
import { VRMHumanBoneArray } from './VRMHumanBoneArray';
import { VRMHumanBones } from './VRMHumanBones';
import { VRMHumanDescription } from './VRMHumanDescription';

export class VRMHumanoid {
  public readonly humanBones: VRMHumanBones;
  public readonly humanDescription: VRMHumanDescription;

  public readonly restPose: VRMPose;

  public constructor(boneArray: VRMHumanBoneArray, humanDescription: VRMHumanDescription) {
    this.humanBones = this._createHumanBones(boneArray);
    this.humanDescription = humanDescription;

    this.restPose = this.getPose();
  }

  public getPose(): VRMPose {
    const pose: VRMPose = {};
    Object.keys(this.humanBones).forEach(
      (vrmBoneName) => {
        const node = this.getBoneNode(vrmBoneName as HumanBone);

        // Ignore when there are no bone on the VRMHumanoid
        if (!node) {
          return;
        }

        // When there are two or more bones in a same name, we are not going to overwrite existing one
        if (pose[vrmBoneName]) {
          return;
        }

        pose[vrmBoneName] = {
          position: node.position.toArray(),
          rotation: node.quaternion.toArray(),
        };
      },
      {} as VRMPose,
    );
    return pose;
  }

  public setPose(poseObject: VRMPose): void {
    Object.keys(poseObject).forEach((boneName) => {
      const state = poseObject[boneName]!;
      const nodes = this.getBoneNodes(boneName as HumanBone);

      nodes.map((node) => {
        const restState = this.restPose[boneName];
        if (!restState) {
          return;
        }

        if (state.position) {
          // 元の状態に戻してから、移動分を追加
          node.position.set(
            restState.position![0] + state.position[0],
            restState.position![1] + state.position[1],
            restState.position![2] + state.position[2],
          );
        }
        if (state.rotation) {
          node.quaternion.fromArray(state.rotation);
        }
      });
    });
  }

  public getBone(name: HumanBone): VRMHumanBone | undefined {
    return this.humanBones[name][0] || undefined;
  }

  public getBones(name: HumanBone): VRMHumanBone[] {
    return this.humanBones[name];
  }

  public getBoneNode(name: HumanBone): GLTFNode | null {
    return (this.humanBones[name][0] && this.humanBones[name][0].node) || null;
  }

  public getBoneNodes(name: HumanBone): GLTFNode[] {
    return this.humanBones[name].map((bone) => bone.node);
  }

  private _createHumanBones(boneArray: VRMHumanBoneArray): VRMHumanBones {
    const bones: VRMHumanBones = Object.values(HumanBone).reduce((accum, name) => {
      accum[name] = [];
      return accum;
    }, {});

    boneArray.forEach((bone) => {
      bones[bone.name].push(bone.bone);
    });

    return bones;
  }
}
