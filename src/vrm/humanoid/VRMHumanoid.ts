import { GLTFNode, RawVector3, RawVector4, VRMPose, VRMSchema } from '../types';
import { VRMHumanBone } from './VRMHumanBone';
import { VRMHumanBoneArray } from './VRMHumanBoneArray';
import { VRMHumanBones } from './VRMHumanBones';
import { VRMHumanDescription } from './VRMHumanDescription';

/**
 * A class represents humanoid of a VRM.
 */
export class VRMHumanoid {
  /**
   * A [[VRMHumanBones]] that contains all the human bones of the VRM.
   * You might want to get these bones using [[VRMHumanoid.getBone]].
   */
  public readonly humanBones: VRMHumanBones;

  /**
   * A [[VRMHumanDescription]] that represents properties of the humanoid.
   */
  public readonly humanDescription: VRMHumanDescription;

  /**
   * A [[VRMPose]] that is its default state.
   * You might use [[VRMHumanoid.setPose]] with this pose to reset its state.
   */
  public readonly restPose: VRMPose;

  /**
   * Create a new [[VRMHumanoid]].
   * @param boneArray A [[VRMHumanBoneArray]] contains all the bones of the new humanoid
   * @param humanDescription A [[VRMHumanDescription]] that represents properties of the new humanoid
   */
  public constructor(boneArray: VRMHumanBoneArray, humanDescription: VRMHumanDescription) {
    this.humanBones = this._createHumanBones(boneArray);
    this.humanDescription = humanDescription;

    this.restPose = this.getPose();
  }

  /**
   * Return the current pose of this humanoid as a [[VRMPose]].
   */
  public getPose(): VRMPose {
    const pose: VRMPose = {};
    Object.keys(this.humanBones).forEach((vrmBoneName) => {
      const node = this.getBoneNode(vrmBoneName as VRMSchema.HumanoidBoneName)!;

      // Ignore when there are no bone on the VRMHumanoid
      if (!node) {
        return;
      }

      // When there are two or more bones in a same name, we are not going to overwrite existing one
      if (pose[vrmBoneName]) {
        return;
      }

      pose[vrmBoneName] = {
        position: node.position.toArray() as RawVector3,
        rotation: node.quaternion.toArray() as RawVector4,
      };
    }, {} as VRMPose);
    return pose;
  }

  /**
   * Let the humanoid do a specified pose.
   *
   * @param poseObject A [[VRMPose]] that represents a single pose
   */
  public setPose(poseObject: VRMPose): void {
    Object.keys(poseObject).forEach((boneName) => {
      const state = poseObject[boneName]!;
      const node = this.getBoneNode(boneName as VRMSchema.HumanoidBoneName);

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

  /**
   * Return a bone bound to a specified [[HumanBone]], as a [[VRMHumanBone]].
   *
   * See also: [[VRMHumanoid.getBones]]
   *
   * @param name Name of the bone you want
   */
  public getBone(name: VRMSchema.HumanoidBoneName): VRMHumanBone | undefined {
    return this.humanBones[name][0] || undefined;
  }

  /**
   * Return bones bound to a specified [[HumanBone]], as an array of [[VRMHumanBone]].
   *
   * See also: [[VRMHumanoid.getBone]]
   *
   * @param name Name of the bone you want
   */
  public getBones(name: VRMSchema.HumanoidBoneName): VRMHumanBone[] {
    return this.humanBones[name];
  }

  /**
   * Return a bone bound to a specified [[HumanBone]], as a THREE.Object3D.
   *
   * See also: [[VRMHumanoid.getBoneNodes]]
   *
   * @param name Name of the bone you want
   */
  public getBoneNode(name: VRMSchema.HumanoidBoneName): GLTFNode | null {
    return (this.humanBones[name][0] && this.humanBones[name][0].node) || null;
  }

  /**
   * Return bones bound to a specified [[HumanBone]], as an array of THREE.Object3D.
   *
   * See also: [[VRMHumanoid.getBoneNode]]
   *
   * @param name Name of the bone you want
   */
  public getBoneNodes(name: VRMSchema.HumanoidBoneName): GLTFNode[] {
    return this.humanBones[name].map((bone) => bone.node);
  }

  /**
   * Prepare a [[VRMHumanBones]] from a [[VRMHumanBoneArray]].
   */
  private _createHumanBones(boneArray: VRMHumanBoneArray): VRMHumanBones {
    const bones: VRMHumanBones = Object.values(VRMSchema.HumanoidBoneName).reduce((accum, name) => {
      accum[name] = [];
      return accum;
    }, {} as Partial<VRMHumanBones>) as VRMHumanBones;

    boneArray.forEach((bone) => {
      bones[bone.name].push(bone.bone);
    });

    return bones;
  }
}
