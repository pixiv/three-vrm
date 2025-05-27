import * as THREE from 'three';
import type { VRMHumanBone } from './VRMHumanBone';
import type { VRMHumanBones } from './VRMHumanBones';
import type { VRMHumanBoneName } from './VRMHumanBoneName';
import type { VRMPose } from './VRMPose';
/**
 * A class represents the Rig of a VRM.
 */
export declare class VRMRig {
    /**
     * A {@link VRMHumanBones} that contains all the human bones of the VRM.
     * You might want to get these bones using {@link VRMHumanoid.getBone}.
     */
    humanBones: VRMHumanBones;
    /**
     * A {@link VRMPose} that is its default state.
     * Note that it's not compatible with {@link setPose} and {@link getPose}, since it contains non-relative values of each local transforms.
     */
    restPose: VRMPose;
    /**
     * Create a new {@link VRMHumanoid}.
     * @param humanBones A {@link VRMHumanBones} contains all the bones of the new humanoid
     */
    constructor(humanBones: VRMHumanBones);
    /**
     * Return the current absolute pose of this humanoid as a {@link VRMPose}.
     * Note that the output result will contain initial state of the VRM and not compatible between different models.
     * You might want to use {@link getPose} instead.
     */
    getAbsolutePose(): VRMPose;
    /**
     * Return the current pose of this humanoid as a {@link VRMPose}.
     *
     * Each transform is a local transform relative from rest pose (T-pose).
     */
    getPose(): VRMPose;
    /**
     * Let the humanoid do a specified pose.
     *
     * Each transform have to be a local transform relative from rest pose (T-pose).
     * You can pass what you got from {@link getPose}.
     *
     * @param poseObject A {@link VRMPose} that represents a single pose
     */
    setPose(poseObject: VRMPose): void;
    /**
     * Reset the humanoid to its rest pose.
     */
    resetPose(): void;
    /**
     * Return a bone bound to a specified {@link VRMHumanBoneName}, as a {@link VRMHumanBone}.
     *
     * @param name Name of the bone you want
     */
    getBone(name: VRMHumanBoneName): VRMHumanBone | undefined;
    /**
     * Return a bone bound to a specified {@link VRMHumanBoneName}, as a `THREE.Object3D`.
     *
     * @param name Name of the bone you want
     */
    getBoneNode(name: VRMHumanBoneName): THREE.Object3D | null;
}
