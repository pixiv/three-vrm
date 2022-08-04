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
   * Copy pose from humanoidRig to modelRig on update().
   */
  public autoUpdateHumanBones: boolean;

  /**
   * A {@link VRMPose} that is its default state.
   * Note that it's not compatible with {@link setPose} and {@link getPose}, since it contains non-relative values of each local transforms.
   */
  public restPose: VRMPose;

  /**
   * A raw rig of the VRM.
   */
  private _rawHumanBonesRig: VRMRig; // TODO: Rename

  /**
   * A normalized rig of the VRM.
   */
  private _normalizedHumanBonesRig: VRMHumanoidRig; // TODO: Rename

  /**
   * Create a new {@link VRMHumanoid}.
   * @param boneArray A {@link VRMHumanBones} contains all the bones of the new humanoid
   */
  public constructor(humanBones: VRMHumanBones, autoUpdateHumanoidRig = true) {
    this.autoUpdateHumanBones = autoUpdateHumanoidRig;
    this._rawHumanBonesRig = new VRMRig(humanBones);
    this._normalizedHumanBonesRig = new VRMHumanoidRig(this._rawHumanBonesRig);
    this.restPose = this.getRawAbsolutePose();
  }

  /**
   * Copy the given {@link VRMHumanoid} into this one.
   * @param source The {@link VRMHumanoid} you want to copy
   * @returns this
   */
  public copy(source: VRMHumanoid): this {
    this._rawHumanBonesRig = new VRMRig(source.humanBones);
    this._normalizedHumanBonesRig = new VRMHumanoidRig(this._rawHumanBonesRig);

    this.restPose = source.restPose;

    return this;
  }

  /**
   * Returns a clone of this {@link VRMHumanoid}.
   * @returns Copied {@link VRMHumanoid}
   */
  public clone(): VRMHumanoid {
    return new VRMHumanoid(this.humanBones, this.autoUpdateHumanBones).copy(this);
  }

  /**
   * Return the current absolute pose of this humanoid as a {@link VRMPose}.
   * Note that the output result will contain initial state of the VRM and not compatible between different models.
   * You might want to use {@link getPose} instead.
   */
  public getRawAbsolutePose(): VRMPose {
    return this._rawHumanBonesRig.getAbsolutePose();
  }

  public getNormalizedAbsolutePose(): VRMPose {
    return this._normalizedHumanBonesRig.getAbsolutePose();
  }

  /**
   * Return the current pose of this humanoid as a {@link VRMPose}.
   *
   * Each transform is a local transform relative from rest pose (T-pose).
   */
  public getRawPose(): VRMPose {
    return this._rawHumanBonesRig.getPose();
  }

  public getNormalizedPose(): VRMPose {
    return this._normalizedHumanBonesRig.getPose();
  }

  /**
   * Let the humanoid do a specified pose.
   *
   * Each transform have to be a local transform relative from rest pose (T-pose).
   * You can pass what you got from {@link getPose}.
   *
   * @param poseObject A [[VRMPose]] that represents a single pose
   */
  public setRawPose(poseObject: VRMPose): void {
    return this._rawHumanBonesRig.setPose(poseObject);
  }

  public setNormalizedPose(poseObject: VRMPose): void {
    return this._normalizedHumanBonesRig.setPose(poseObject);
  }

  /**
   * Reset the humanoid to its rest pose.
   */
  public resetRawPose(): void {
    return this._rawHumanBonesRig.resetPose();
  }

  public resetNormalizedPose(): void {
    return this._rawHumanBonesRig.resetPose();
  }

  public get humanBones(): VRMHumanBones {
    return this._rawHumanBonesRig.humanBones;
  }

  public get normalizedHumanBones(): VRMHumanBones {
    return this._normalizedHumanBonesRig.humanBones;
  }

  /**
   * Return a bone bound to a specified {@link VRMHumanBoneName}, as a {@link VRMHumanBone}.
   *
   * @param name Name of the bone you want
   */
  public getRawBone(name: VRMHumanBoneName): VRMHumanBone | undefined {
    return this._rawHumanBonesRig.getBone(name);
  }

  public getNormalizedBone(name: VRMHumanBoneName): VRMHumanBone | undefined {
    return this._normalizedHumanBonesRig.getBone(name);
  }

  /**
   * Return a bone bound to a specified {@link VRMHumanBoneName}, as a `THREE.Object3D`.
   *
   * @param name Name of the bone you want
   */
  public getRawBoneNode(name: VRMHumanBoneName): THREE.Object3D | null {
    return this._rawHumanBonesRig.getBoneNode(name);
  }

  public getNormalizedBoneNode(name: VRMHumanBoneName): THREE.Object3D | null {
    return this._normalizedHumanBonesRig.getBoneNode(name);
  }

  public update(): void {
    if (this.autoUpdateHumanBones) {
      this._normalizedHumanBonesRig.update();
    }
  }
}
