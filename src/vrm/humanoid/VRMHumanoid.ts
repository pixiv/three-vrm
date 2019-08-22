import { GLTFNode, HumanBone, VRMPose } from '../types';
import { VRMHumanBones } from './VRMHumanBones';
import { VRMHumanDescription } from './VRMHumanDescription';

export class VRMHumanoid {
  public readonly humanBones: VRMHumanBones;
  public readonly humanDescription: VRMHumanDescription;

  public readonly restPose: VRMPose;

  public constructor(humanBones: VRMHumanBones, humanDescription: VRMHumanDescription) {
    this.humanBones = humanBones;
    this.humanDescription = humanDescription;

    this.restPose = this.getPose();
  }

  public getPose(): VRMPose {
    const pose: VRMPose = {};
    Object.keys(this.humanBones).forEach(
      (vrmBoneName) => {
        const node = this.getBoneNode(vrmBoneName as HumanBone)!;
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
      const node = this.getBoneNode(boneName as HumanBone);

      // Ignore when there are no bone that is defined in the pose on the VRMHumanoid
      if (!node) {
        return;
      }

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
  }

  public getBoneNode(name: HumanBone): GLTFNode | null {
    return (this.humanBones && this.humanBones[name] && this.humanBones[name]!.node) || null;
  }
}
