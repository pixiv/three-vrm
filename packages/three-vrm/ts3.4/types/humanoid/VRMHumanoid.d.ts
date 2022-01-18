import { GLTFNode, VRMPose, VRMSchema } from '../types';
import { VRMHumanBone } from './VRMHumanBone';
import { VRMHumanBoneArray } from './VRMHumanBoneArray';
import { VRMHumanBones } from './VRMHumanBones';
import { VRMHumanDescription } from './VRMHumanDescription';
/**
 * A class represents humanoid of a VRM.
 */
export declare class VRMHumanoid {
    /**
     * A [[VRMHumanBones]] that contains all the human bones of the VRM.
     * You might want to get these bones using [[VRMHumanoid.getBone]].
     */
    readonly humanBones: VRMHumanBones;
    /**
     * A [[VRMHumanDescription]] that represents properties of the humanoid.
     */
    readonly humanDescription: VRMHumanDescription;
    /**
     * A [[VRMPose]] that is its default state.
     * Note that it's not compatible with `setPose` and `getPose`, since it contains non-relative values of each local transforms.
     */
    readonly restPose: VRMPose;
    /**
     * Create a new [[VRMHumanoid]].
     * @param boneArray A [[VRMHumanBoneArray]] contains all the bones of the new humanoid
     * @param humanDescription A [[VRMHumanDescription]] that represents properties of the new humanoid
     */
    constructor(boneArray: VRMHumanBoneArray, humanDescription: VRMHumanDescription);
    /**
     * Return the current pose of this humanoid as a [[VRMPose]].
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
     * @param poseObject A [[VRMPose]] that represents a single pose
     */
    setPose(poseObject: VRMPose): void;
    /**
     * Reset the humanoid to its rest pose.
     */
    resetPose(): void;
    /**
     * Return a bone bound to a specified [[HumanBone]], as a [[VRMHumanBone]].
     *
     * See also: [[VRMHumanoid.getBones]]
     *
     * @param name Name of the bone you want
     */
    getBone(name: VRMSchema.HumanoidBoneName): VRMHumanBone | undefined;
    /**
     * Return bones bound to a specified [[HumanBone]], as an array of [[VRMHumanBone]].
     * If there are no bones bound to the specified HumanBone, it will return an empty array.
     *
     * See also: [[VRMHumanoid.getBone]]
     *
     * @param name Name of the bone you want
     */
    getBones(name: VRMSchema.HumanoidBoneName): VRMHumanBone[];
    /**
     * Return a bone bound to a specified [[HumanBone]], as a THREE.Object3D.
     *
     * See also: [[VRMHumanoid.getBoneNodes]]
     *
     * @param name Name of the bone you want
     */
    getBoneNode(name: VRMSchema.HumanoidBoneName): GLTFNode | null;
    /**
     * Return bones bound to a specified [[HumanBone]], as an array of THREE.Object3D.
     * If there are no bones bound to the specified HumanBone, it will return an empty array.
     *
     * See also: [[VRMHumanoid.getBoneNode]]
     *
     * @param name Name of the bone you want
     */
    getBoneNodes(name: VRMSchema.HumanoidBoneName): GLTFNode[];
    /**
     * Prepare a [[VRMHumanBones]] from a [[VRMHumanBoneArray]].
     */
    private _createHumanBones;
}
