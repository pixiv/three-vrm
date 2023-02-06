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
   * A raw rig of the VRM.
   */
  private _rawHumanBones: VRMRig; // TODO: Rename

  /**
   * A normalized rig of the VRM.
   */
  private _normalizedHumanBones: VRMHumanoidRig; // TODO: Rename

  /**
   * @deprecated Deprecated. Use either {@link rawRestPose} or {@link normalizedRestPose} instead.
   */
  public get restPose(): VRMPose {
    console.warn('VRMHumanoid: restPose is deprecated. Use either rawRestPose or normalizedRestPose instead.');

    return this.rawRestPose;
  }

  /**
   * A {@link VRMPose} of its raw human bones that is its default state.
   * Note that it's not compatible with {@link setRawPose} and {@link getRawPose}, since it contains non-relative values of each local transforms.
   */
  public get rawRestPose(): VRMPose {
    return this._rawHumanBones.restPose;
  }

  /**
   * A {@link VRMPose} of its normalized human bones that is its default state.
   * Note that it's not compatible with {@link setNormalizedPose} and {@link getNormalizedPose}, since it contains non-relative values of each local transforms.
   */
  public get normalizedRestPose(): VRMPose {
    return this._normalizedHumanBones.restPose;
  }

  /**
   * A map from {@link VRMHumanBoneName} to raw {@link VRMHumanBone}s.
   */
  public get humanBones(): VRMHumanBones {
    // an alias of `rawHumanBones`
    return this._rawHumanBones.humanBones;
  }

  /**
   * A map from {@link VRMHumanBoneName} to raw {@link VRMHumanBone}s.
   */
  public get rawHumanBones(): VRMHumanBones {
    return this._rawHumanBones.humanBones;
  }

  /**
   * A map from {@link VRMHumanBoneName} to normalized {@link VRMHumanBone}s.
   */
  public get normalizedHumanBones(): VRMHumanBones {
    return this._normalizedHumanBones.humanBones;
  }

  /**
   * The root of normalized {@link VRMHumanBone}s.
   */
  public get normalizedHumanBonesRoot(): THREE.Object3D {
    return this._normalizedHumanBones.root;
  }

  /**
   * Create a new {@link VRMHumanoid}.
   * @param humanBones A {@link VRMHumanBones} contains all the bones of the new humanoid
   * @param autoUpdateHumanBones Whether it copies pose from normalizedHumanBones to rawHumanBones on {@link update}. `true` by default.
   */
  public constructor(humanBones: VRMHumanBones, options?: { autoUpdateHumanBones?: boolean }) {
    this.autoUpdateHumanBones = options?.autoUpdateHumanBones ?? true;
    this._rawHumanBones = new VRMRig(humanBones);
    this._normalizedHumanBones = new VRMHumanoidRig(this._rawHumanBones);
  }

  /**
   * Copy the given {@link VRMHumanoid} into this one.
   * @param source The {@link VRMHumanoid} you want to copy
   * @returns this
   */
  public copy(source: VRMHumanoid): this {
    this.autoUpdateHumanBones = source.autoUpdateHumanBones;
    this._rawHumanBones = new VRMRig(source.humanBones);
    this._normalizedHumanBones = new VRMHumanoidRig(this._rawHumanBones);

    return this;
  }

  /**
   * Returns a clone of this {@link VRMHumanoid}.
   * @returns Copied {@link VRMHumanoid}
   */
  public clone(): VRMHumanoid {
    return new VRMHumanoid(this.humanBones, { autoUpdateHumanBones: this.autoUpdateHumanBones }).copy(this);
  }

  /**
   * @deprecated Deprecated. Use either {@link getRawAbsolutePose} or {@link getNormalizedAbsolutePose} instead.
   */
  public getAbsolutePose(): VRMPose {
    console.warn(
      'VRMHumanoid: getAbsolutePose() is deprecated. Use either getRawAbsolutePose() or getNormalizedAbsolutePose() instead.',
    );

    return this.getRawAbsolutePose();
  }

  /**
   * Return the current absolute pose of this raw human bones as a {@link VRMPose}.
   * Note that the output result will contain initial state of the VRM and not compatible between different models.
   * You might want to use {@link getRawPose} instead.
   */
  public getRawAbsolutePose(): VRMPose {
    return this._rawHumanBones.getAbsolutePose();
  }

  /**
   * Return the current absolute pose of this normalized human bones as a {@link VRMPose}.
   * Note that the output result will contain initial state of the VRM and not compatible between different models.
   * You might want to use {@link getNormalizedPose} instead.
   */
  public getNormalizedAbsolutePose(): VRMPose {
    return this._normalizedHumanBones.getAbsolutePose();
  }

  /**
   * @deprecated Deprecated. Use either {@link getRawPose} or {@link getNormalizedPose} instead.
   */
  public getPose(): VRMPose {
    console.warn('VRMHumanoid: getPose() is deprecated. Use either getRawPose() or getNormalizedPose() instead.');

    return this.getRawPose();
  }

  /**
   * Return the current pose of raw human bones as a {@link VRMPose}.
   *
   * Each transform is a local transform relative from rest pose (T-pose).
   */
  public getRawPose(): VRMPose {
    return this._rawHumanBones.getPose();
  }

  /**
   * Return the current pose of normalized human bones as a {@link VRMPose}.
   *
   * Each transform is a local transform relative from rest pose (T-pose).
   */
  public getNormalizedPose(): VRMPose {
    return this._normalizedHumanBones.getPose();
  }

  /**
   * @deprecated Deprecated. Use either {@link setRawPose} or {@link setNormalizedPose} instead.
   */
  public setPose(poseObject: VRMPose): void {
    console.warn('VRMHumanoid: setPose() is deprecated. Use either setRawPose() or setNormalizedPose() instead.');

    return this.setRawPose(poseObject);
  }

  /**
   * Let the raw human bones do a specified pose.
   *
   * Each transform have to be a local transform relative from rest pose (T-pose).
   * You can pass what you got from {@link getRawPose}.
   *
   * If you are using {@link autoUpdateHumanBones}, you might want to use {@link setNormalizedPose} instead.
   *
   * @param poseObject A {@link VRMPose} that represents a single pose
   */
  public setRawPose(poseObject: VRMPose): void {
    return this._rawHumanBones.setPose(poseObject);
  }

  /**
   * Let the normalized human bones do a specified pose.
   *
   * Each transform have to be a local transform relative from rest pose (T-pose).
   * You can pass what you got from {@link getNormalizedPose}.
   *
   * @param poseObject A {@link VRMPose} that represents a single pose
   */
  public setNormalizedPose(poseObject: VRMPose): void {
    return this._normalizedHumanBones.setPose(poseObject);
  }

  /**
   * @deprecated Deprecated. Use either {@link resetRawPose} or {@link resetNormalizedPose} instead.
   */
  public resetPose(): void {
    console.warn('VRMHumanoid: resetPose() is deprecated. Use either resetRawPose() or resetNormalizedPose() instead.');

    return this.resetRawPose();
  }

  /**
   * Reset the raw humanoid to its rest pose.
   *
   * If you are using {@link autoUpdateHumanBones}, you might want to use {@link resetNormalizedPose} instead.
   */
  public resetRawPose(): void {
    return this._rawHumanBones.resetPose();
  }

  /**
   * Reset the normalized humanoid to its rest pose.
   */
  public resetNormalizedPose(): void {
    return this._normalizedHumanBones.resetPose();
  }

  /**
   * @deprecated Deprecated. Use either {@link getRawBone} or {@link getNormalizedBone} instead.
   */
  public getBone(name: VRMHumanBoneName): VRMHumanBone | undefined {
    console.warn('VRMHumanoid: getBone() is deprecated. Use either getRawBone() or getNormalizedBone() instead.');

    return this.getRawBone(name);
  }

  /**
   * Return a raw {@link VRMHumanBone} bound to a specified {@link VRMHumanBoneName}.
   *
   * @param name Name of the bone you want
   */
  public getRawBone(name: VRMHumanBoneName): VRMHumanBone | undefined {
    return this._rawHumanBones.getBone(name);
  }

  /**
   * Return a normalized {@link VRMHumanBone} bound to a specified {@link VRMHumanBoneName}.
   *
   * @param name Name of the bone you want
   */
  public getNormalizedBone(name: VRMHumanBoneName): VRMHumanBone | undefined {
    return this._normalizedHumanBones.getBone(name);
  }

  /**
   * @deprecated Deprecated. Use either {@link getRawBoneNode} or {@link getNormalizedBoneNode} instead.
   */
  public getBoneNode(name: VRMHumanBoneName): THREE.Object3D | null {
    console.warn(
      'VRMHumanoid: getBoneNode() is deprecated. Use either getRawBoneNode() or getNormalizedBoneNode() instead.',
    );

    return this.getRawBoneNode(name);
  }

  /**
   * Return a raw bone as a `THREE.Object3D` bound to a specified {@link VRMHumanBoneName}.
   *
   * @param name Name of the bone you want
   */
  public getRawBoneNode(name: VRMHumanBoneName): THREE.Object3D | null {
    return this._rawHumanBones.getBoneNode(name);
  }

  /**
   * Return a normalized bone as a `THREE.Object3D` bound to a specified {@link VRMHumanBoneName}.
   *
   * @param name Name of the bone you want
   */
  public getNormalizedBoneNode(name: VRMHumanBoneName): THREE.Object3D | null {
    return this._normalizedHumanBones.getBoneNode(name);
  }

  /**
   * Update the humanoid component.
   *
   * If {@link autoUpdateHumanBones} is `true`, it transfers the pose of normalized human bones to raw human bones.
   */
  public update(): void {
    if (this.autoUpdateHumanBones) {
      this._normalizedHumanBones.update();
    }
  }
}
