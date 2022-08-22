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
   * Whether it copies pose from normalizedHumanBones to rawHumanBones on {@link update}.
   * `true` by default.
   *
   * @default true
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
  private _rawHumanBones: VRMRig; // TODO: Rename

  /**
   * A normalized rig of the VRM.
   */
  private _normalizedHumanBones: VRMHumanoidRig; // TODO: Rename

  /**
   * Create a new {@link VRMHumanoid}.
   * @param humanBones A {@link VRMHumanBones} contains all the bones of the new humanoid
   * @param autoUpdateHumanBones Whether it copies pose from normalizedHumanBones to rawHumanBones on {@link update}. `true` by default.
   */
  public constructor(humanBones: VRMHumanBones, autoUpdateHumanBones = true) {
    this.autoUpdateHumanBones = autoUpdateHumanBones;
    this._rawHumanBones = new VRMRig(humanBones);
    this._normalizedHumanBones = new VRMHumanoidRig(this._rawHumanBones);
    this.restPose = this.getRawAbsolutePose();
  }

  /**
   * Copy the given {@link VRMHumanoid} into this one.
   * @param source The {@link VRMHumanoid} you want to copy
   * @returns this
   */
  public copy(source: VRMHumanoid): this {
    this._rawHumanBones = new VRMRig(source.humanBones);
    this._normalizedHumanBones = new VRMHumanoidRig(this._rawHumanBones);

    this.autoUpdateHumanBones = source.autoUpdateHumanBones;
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
    return this._rawHumanBones.getAbsolutePose();
  }

  public getNormalizedAbsolutePose(): VRMPose {
    return this._normalizedHumanBones.getAbsolutePose();
  }

  /**
   * Return the current pose of this humanoid as a {@link VRMPose}.
   *
   * Each transform is a local transform relative from rest pose (T-pose).
   */
  public getRawPose(): VRMPose {
    return this._rawHumanBones.getPose();
  }

  public getNormalizedPose(): VRMPose {
    return this._normalizedHumanBones.getPose();
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
    return this._rawHumanBones.setPose(poseObject);
  }

  public setNormalizedPose(poseObject: VRMPose): void {
    return this._normalizedHumanBones.setPose(poseObject);
  }

  /**
   * Reset the humanoid to its rest pose.
   */
  public resetRawPose(): void {
    return this._rawHumanBones.resetPose();
  }

  public resetNormalizedPose(): void {
    return this._rawHumanBones.resetPose();
  }

  public get humanBones(): VRMHumanBones {
    return this._rawHumanBones.humanBones;
  }

  public get normalizedHumanBones(): VRMHumanBones {
    return this._normalizedHumanBones.humanBones;
  }

  /**
   * Return a bone bound to a specified {@link VRMHumanBoneName}, as a {@link VRMHumanBone}.
   *
   * @param name Name of the bone you want
   */
  public getRawBone(name: VRMHumanBoneName): VRMHumanBone | undefined {
    return this._rawHumanBones.getBone(name);
  }

  public getNormalizedBone(name: VRMHumanBoneName): VRMHumanBone | undefined {
    return this._normalizedHumanBones.getBone(name);
  }

  /**
   * Return a bone bound to a specified {@link VRMHumanBoneName}, as a `THREE.Object3D`.
   *
   * @param name Name of the bone you want
   */
  public getRawBoneNode(name: VRMHumanBoneName): THREE.Object3D | null {
    return this._rawHumanBones.getBoneNode(name);
  }

  public getNormalizedBoneNode(name: VRMHumanBoneName): THREE.Object3D | null {
    return this._normalizedHumanBones.getBoneNode(name);
  }

  public update(): void {
    if (this.autoUpdateHumanBones) {
      this._normalizedHumanBones.update();
    }
  }
}
