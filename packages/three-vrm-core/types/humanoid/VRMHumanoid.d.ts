import * as THREE from 'three';
import type { VRMHumanBone } from './VRMHumanBone';
import type { VRMHumanBones } from './VRMHumanBones';
import type { VRMHumanBoneName } from './VRMHumanBoneName';
import type { VRMPose } from './VRMPose';
/**
 * A class represents a humanoid of a VRM.
 */
export declare class VRMHumanoid {
    /**
     * Whether it copies pose from normalizedHumanBones to rawHumanBones on {@link update}.
     * `true` by default.
     *
     * @default true
     */
    autoUpdateHumanBones: boolean;
    /**
     * A raw rig of the VRM.
     */
    private _rawHumanBones;
    /**
     * A normalized rig of the VRM.
     */
    private _normalizedHumanBones;
    /**
     * @deprecated Deprecated. Use either {@link rawRestPose} or {@link normalizedRestPose} instead.
     */
    get restPose(): VRMPose;
    /**
     * A {@link VRMPose} of its raw human bones that is its default state.
     * Note that it's not compatible with {@link setRawPose} and {@link getRawPose}, since it contains non-relative values of each local transforms.
     */
    get rawRestPose(): VRMPose;
    /**
     * A {@link VRMPose} of its normalized human bones that is its default state.
     * Note that it's not compatible with {@link setNormalizedPose} and {@link getNormalizedPose}, since it contains non-relative values of each local transforms.
     */
    get normalizedRestPose(): VRMPose;
    /**
     * A map from {@link VRMHumanBoneName} to raw {@link VRMHumanBone}s.
     */
    get humanBones(): VRMHumanBones;
    /**
     * A map from {@link VRMHumanBoneName} to raw {@link VRMHumanBone}s.
     */
    get rawHumanBones(): VRMHumanBones;
    /**
     * A map from {@link VRMHumanBoneName} to normalized {@link VRMHumanBone}s.
     */
    get normalizedHumanBones(): VRMHumanBones;
    /**
     * The root of normalized {@link VRMHumanBone}s.
     */
    get normalizedHumanBonesRoot(): THREE.Object3D;
    /**
     * Create a new {@link VRMHumanoid}.
     * @param humanBones A {@link VRMHumanBones} contains all the bones of the new humanoid
     * @param autoUpdateHumanBones Whether it copies pose from normalizedHumanBones to rawHumanBones on {@link update}. `true` by default.
     */
    constructor(humanBones: VRMHumanBones, options?: {
        autoUpdateHumanBones?: boolean;
    });
    /**
     * Copy the given {@link VRMHumanoid} into this one.
     * @param source The {@link VRMHumanoid} you want to copy
     * @returns this
     */
    copy(source: VRMHumanoid): this;
    /**
     * Returns a clone of this {@link VRMHumanoid}.
     * @returns Copied {@link VRMHumanoid}
     */
    clone(): VRMHumanoid;
    /**
     * @deprecated Deprecated. Use either {@link getRawAbsolutePose} or {@link getNormalizedAbsolutePose} instead.
     */
    getAbsolutePose(): VRMPose;
    /**
     * Return the current absolute pose of this raw human bones as a {@link VRMPose}.
     * Note that the output result will contain initial state of the VRM and not compatible between different models.
     * You might want to use {@link getRawPose} instead.
     */
    getRawAbsolutePose(): VRMPose;
    /**
     * Return the current absolute pose of this normalized human bones as a {@link VRMPose}.
     * Note that the output result will contain initial state of the VRM and not compatible between different models.
     * You might want to use {@link getNormalizedPose} instead.
     */
    getNormalizedAbsolutePose(): VRMPose;
    /**
     * @deprecated Deprecated. Use either {@link getRawPose} or {@link getNormalizedPose} instead.
     */
    getPose(): VRMPose;
    /**
     * Return the current pose of raw human bones as a {@link VRMPose}.
     *
     * Each transform is a local transform relative from rest pose (T-pose).
     */
    getRawPose(): VRMPose;
    /**
     * Return the current pose of normalized human bones as a {@link VRMPose}.
     *
     * Each transform is a local transform relative from rest pose (T-pose).
     */
    getNormalizedPose(): VRMPose;
    /**
     * @deprecated Deprecated. Use either {@link setRawPose} or {@link setNormalizedPose} instead.
     */
    setPose(poseObject: VRMPose): void;
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
    setRawPose(poseObject: VRMPose): void;
    /**
     * Let the normalized human bones do a specified pose.
     *
     * Each transform have to be a local transform relative from rest pose (T-pose).
     * You can pass what you got from {@link getNormalizedPose}.
     *
     * @param poseObject A {@link VRMPose} that represents a single pose
     */
    setNormalizedPose(poseObject: VRMPose): void;
    /**
     * @deprecated Deprecated. Use either {@link resetRawPose} or {@link resetNormalizedPose} instead.
     */
    resetPose(): void;
    /**
     * Reset the raw humanoid to its rest pose.
     *
     * If you are using {@link autoUpdateHumanBones}, you might want to use {@link resetNormalizedPose} instead.
     */
    resetRawPose(): void;
    /**
     * Reset the normalized humanoid to its rest pose.
     */
    resetNormalizedPose(): void;
    /**
     * @deprecated Deprecated. Use either {@link getRawBone} or {@link getNormalizedBone} instead.
     */
    getBone(name: VRMHumanBoneName): VRMHumanBone | undefined;
    /**
     * Return a raw {@link VRMHumanBone} bound to a specified {@link VRMHumanBoneName}.
     *
     * @param name Name of the bone you want
     */
    getRawBone(name: VRMHumanBoneName): VRMHumanBone | undefined;
    /**
     * Return a normalized {@link VRMHumanBone} bound to a specified {@link VRMHumanBoneName}.
     *
     * @param name Name of the bone you want
     */
    getNormalizedBone(name: VRMHumanBoneName): VRMHumanBone | undefined;
    /**
     * @deprecated Deprecated. Use either {@link getRawBoneNode} or {@link getNormalizedBoneNode} instead.
     */
    getBoneNode(name: VRMHumanBoneName): THREE.Object3D | null;
    /**
     * Return a raw bone as a `THREE.Object3D` bound to a specified {@link VRMHumanBoneName}.
     *
     * @param name Name of the bone you want
     */
    getRawBoneNode(name: VRMHumanBoneName): THREE.Object3D | null;
    /**
     * Return a normalized bone as a `THREE.Object3D` bound to a specified {@link VRMHumanBoneName}.
     *
     * @param name Name of the bone you want
     */
    getNormalizedBoneNode(name: VRMHumanBoneName): THREE.Object3D | null;
    /**
     * Update the humanoid component.
     *
     * If {@link autoUpdateHumanBones} is `true`, it transfers the pose of normalized human bones to raw human bones.
     */
    update(): void;
}
