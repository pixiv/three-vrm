import * as THREE from 'three';
import { quatInvertCompat } from '../utils/quatInvertCompat';
import type { VRMHumanBone } from './VRMHumanBone';
import type { VRMHumanBones } from './VRMHumanBones';
import type { VRMHumanBoneName } from './VRMHumanBoneName';
import type { VRMPose } from './VRMPose';

const _v3A = new THREE.Vector3();
const _quatA = new THREE.Quaternion();

/**
 * A class represents the Rig of a VRM.
 */
export class VRMRig {
  /**
   * A {@link VRMHumanBones} that contains all the human bones of the VRM.
   * You might want to get these bones using {@link VRMHumanoid.getBone}.
   */
  public humanBones: VRMHumanBones;

  /**
   * A {@link VRMPose} that is its default state.
   * Note that it's not compatible with {@link setPose} and {@link getPose}, since it contains non-relative values of each local transforms.
   */
  public restPose: VRMPose;

  /**
   * Create a new {@link VRMHumanoid}.
   * @param humanBones A {@link VRMHumanBones} contains all the bones of the new humanoid
   */
  public constructor(humanBones: VRMHumanBones) {
    this.humanBones = humanBones;

    this.restPose = this.getAbsolutePose();
  }

  /**
   * Return the current absolute pose of this humanoid as a {@link VRMPose}.
   * Note that the output result will contain initial state of the VRM and not compatible between different models.
   * You might want to use {@link getPose} instead.
   */
  public getAbsolutePose(): VRMPose {
    const pose = {} as VRMPose;

    Object.keys(this.humanBones).forEach((vrmBoneNameString) => {
      const vrmBoneName = vrmBoneNameString as VRMHumanBoneName;
      const node = this.getBoneNode(vrmBoneName);

      // Ignore when there are no bone on the VRMHumanoid
      if (!node) {
        return;
      }

      // Get the position / rotation from the node
      _v3A.copy(node.position);
      _quatA.copy(node.quaternion);

      // Convert to raw arrays
      pose[vrmBoneName] = {
        position: _v3A.toArray() as [number, number, number],
        rotation: _quatA.toArray() as [number, number, number, number],
      };
    });

    return pose;
  }

  /**
   * Return the current pose of this humanoid as a {@link VRMPose}.
   *
   * Each transform is a local transform relative from rest pose (T-pose).
   */
  public getPose(): VRMPose {
    const pose = {} as VRMPose;

    Object.keys(this.humanBones).forEach((boneNameString) => {
      const boneName = boneNameString as VRMHumanBoneName;
      const node = this.getBoneNode(boneName);

      // Ignore when there are no bone on the VRMHumanoid
      if (!node) {
        return;
      }

      // Take a diff from restPose
      _v3A.set(0, 0, 0);
      _quatA.identity();

      const restState = this.restPose[boneName];
      if (restState?.position) {
        _v3A.fromArray(restState.position).negate();
      }
      if (restState?.rotation) {
        quatInvertCompat(_quatA.fromArray(restState.rotation));
      }

      // Get the position / rotation from the node
      _v3A.add(node.position);
      _quatA.premultiply(node.quaternion);

      // Convert to raw arrays
      pose[boneName] = {
        position: _v3A.toArray() as [number, number, number],
        rotation: _quatA.toArray() as [number, number, number, number],
      };
    });

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
    Object.entries(poseObject).forEach(([boneNameString, state]) => {
      const boneName = boneNameString as VRMHumanBoneName;
      const node = this.getBoneNode(boneName);

      // Ignore when there are no bone that is defined in the pose on the VRMHumanoid
      if (!node) {
        return;
      }

      const restState = this.restPose[boneName];
      if (!restState) {
        // It's very unlikely. Possibly a bug
        return;
      }

      // Apply the state to the actual bone
      if (state?.position) {
        node.position.fromArray(state.position);

        if (restState.position) {
          node.position.add(_v3A.fromArray(restState.position));
        }
      }

      if (state?.rotation) {
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
    Object.entries(this.restPose).forEach(([boneName, rest]) => {
      const node = this.getBoneNode(boneName as VRMHumanBoneName);

      if (!node) {
        return;
      }

      if (rest?.position) {
        node.position.fromArray(rest.position);
      }

      if (rest?.rotation) {
        node.quaternion.fromArray(rest.rotation);
      }
    });
  }

  /**
   * Return a bone bound to a specified {@link VRMHumanBoneName}, as a {@link VRMHumanBone}.
   *
   * @param name Name of the bone you want
   */
  public getBone(name: VRMHumanBoneName): VRMHumanBone | undefined {
    return this.humanBones[name] ?? undefined;
  }

  /**
   * Return a bone bound to a specified {@link VRMHumanBoneName}, as a `THREE.Object3D`.
   *
   * @param name Name of the bone you want
   */
  public getBoneNode(name: VRMHumanBoneName): THREE.Object3D | null {
    return this.humanBones[name]?.node ?? null;
  }
}
