import * as THREE from 'three';
import { GLTFNode, RawVector3, RawVector4, VRMPose, VRMSchema } from '../types';
import { quatInvertCompat } from '../utils/quatInvertCompat';
import { VRMHumanBone } from './VRMHumanBone';
import { VRMHumanBoneArray } from './VRMHumanBoneArray';
import { VRMHumanBones } from './VRMHumanBones';
import { VRMHumanDescription } from './VRMHumanDescription';

const _v3A = new THREE.Vector3();
const _quatA = new THREE.Quaternion();

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
   * Note that it's not compatible with `setPose` and `getPose`, since it contains non-relative values of each local transforms.
   */
  public readonly restPose: VRMPose = {};

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
   *
   * Each transform is a local transform relative from rest pose (T-pose).
   */
  public getPose(): VRMPose {
    const pose: VRMPose = {};
    Object.keys(this.humanBones).forEach((vrmBoneName) => {
      const node = this.getBoneNode(vrmBoneName as VRMSchema.HumanoidBoneName);

      // Ignore when there are no bone on the VRMHumanoid
      if (!node) {
        return;
      }

      // When there are two or more bones in a same name, we are not going to overwrite existing one
      if (pose[vrmBoneName]) {
        return;
      }

      // Take a diff from restPose
      // note that restPose also will use getPose to initialize itself
      _v3A.set(0, 0, 0);
      _quatA.identity();

      const restState = this.restPose[vrmBoneName];
      if (restState?.position) {
        _v3A.fromArray(restState.position).negate();
      }
      if (restState?.rotation) {
        quatInvertCompat(_quatA.fromArray(restState.rotation));
      }

      // Get the position / rotation from the node
      _v3A.add(node.position);
      _quatA.premultiply(node.quaternion);

      pose[vrmBoneName] = {
        position: _v3A.toArray() as RawVector3,
        rotation: _quatA.toArray() as RawVector4,
      };
    }, {} as VRMPose);
    return pose;
  }

  /**
   * Let the humanoid do a specified pose.
   *
   * Each transform have to be a local transform relative from rest pose (T-pose).
   * You can pass what you got from {@link getPose}.
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
        node.position.fromArray(state.position);

        if (restState.position) {
          node.position.add(_v3A.fromArray(restState.position));
        }
      }

      if (state.rotation) {
        node.quaternion.fromArray(state.rotation);

        if (restState.rotation) {
          node.quaternion.multiply(_quatA.fromArray(restState.rotation));
        }
      }
    });
  }

  /**
   * Reset the humanoid to its rest pose.
   */
  public resetPose(): void {
    this.setPose({});
  }

  /**
   * Return a bone bound to a specified [[HumanBone]], as a [[VRMHumanBone]].
   *
   * See also: [[VRMHumanoid.getBones]]
   *
   * @param name Name of the bone you want
   */
  public getBone(name: VRMSchema.HumanoidBoneName): VRMHumanBone | undefined {
    return this.humanBones[name][0] ?? undefined;
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
    return this.humanBones[name][0]?.node ?? null;
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
