import { VRMSchema } from '../types';
import { VRMHumanBone } from './VRMHumanBone';
/**
 * An array represents a `vrm.humanoid.humanBones` field of VRM specification.
 */
export declare type VRMHumanBoneArray = Array<{
    name: VRMSchema.HumanoidBoneName;
    bone: VRMHumanBone;
}>;
