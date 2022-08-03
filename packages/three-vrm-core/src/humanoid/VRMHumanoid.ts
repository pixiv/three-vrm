import * as THREE from 'three';
import type { VRMHumanBone } from './VRMHumanBone';
import type { VRMHumanBones } from './VRMHumanBones';
import type { VRMHumanBoneName } from './VRMHumanBoneName';
import type { VRMPose } from './VRMPose';
import { VRMRig } from './VRMRig';
import { VRMHumanoidRig } from './VRMHumanoidRig';

/**
 * A class represents a humanoid of a VRM.
 */
export class VRMHumanoid {
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
   * A raw rig of the VRM.
   */
  public modelRig: VRMRig;

  /**
   * A normalized rig of the VRM.
   */
  public humanoidRig: VRMHumanoidRig;

  /**
   * Copy pose from humanoidRig to modelRig on update().
   */
  public autoUpdate: boolean;

  /**
   * Create a new {@link VRMHumanoid}.
   * @param boneArray A {@link VRMHumanBones} contains all the bones of the new humanoid
   */
  public constructor(humanBones: VRMHumanBones, autoUpdate = true) {
    this.autoUpdate = autoUpdate;
    this.humanBones = humanBones;
    this.modelRig = new VRMRig(humanBones);
    this.humanoidRig = new VRMHumanoidRig(this.modelRig);
    this.restPose = this.getAbsolutePose();
  }

  /**
   * Copy the given {@link VRMHumanoid} into this one.
   * @param source The {@link VRMHumanoid} you want to copy
   * @returns this
   */
  public copy(source: VRMHumanoid): this {
    this.humanBones = source.humanBones;
    this.restPose = source.restPose;

    return this;
  }

  /**
   * Returns a clone of this {@link VRMHumanoid}.
   * @returns Copied {@link VRMHumanoid}
   */
  public clone(): VRMHumanoid {
    return new VRMHumanoid(this.humanBones).copy(this);
  }

  /**
   * Return the current absolute pose of this humanoid as a {@link VRMPose}.
   * Note that the output result will contain initial state of the VRM and not compatible between different models.
   * You might want to use {@link getPose} instead.
   */
  public getAbsolutePose(): VRMPose {
    return this.humanoidRig.getAbsolutePose();
  }

  /**
   * Return the current pose of this humanoid as a {@link VRMPose}.
   *
   * Each transform is a local transform relative from rest pose (T-pose).
   */
  public getPose(): VRMPose {
    return this.humanoidRig.getPose();
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
    return this.humanoidRig.setPose(poseObject);
  }

  /**
   * Reset the humanoid to its rest pose.
   */
  public resetPose(): void {
    return this.humanoidRig.resetPose();
  }

  /**
   * Return a bone bound to a specified {@link VRMHumanBoneName}, as a {@link VRMHumanBone}.
   *
   * @param name Name of the bone you want
   */
  public getBone(name: VRMHumanBoneName): VRMHumanBone | undefined {
    return this.humanoidRig.getBone(name);
  }

  /**
   * Return a bone bound to a specified {@link VRMHumanBoneName}, as a `THREE.Object3D`.
   *
   * @param name Name of the bone you want
   */
  public getBoneNode(name: VRMHumanBoneName): THREE.Object3D | null {
    return this.humanoidRig.getBoneNode(name);
  }

  public update(): void {
    if (this.autoUpdate) {
      this.humanoidRig.update();
    }
  }
}
