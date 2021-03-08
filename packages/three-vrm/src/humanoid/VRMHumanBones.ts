import { VRMHumanBone } from './VRMHumanBone';
import { VRMHumanoidBoneName } from './VRMHumanoidBoneName';

/**
 * This object is a object variant of [[VRMHumanBoneArray]], used internally in [[VRMHumanoid]].
 */
export type VRMHumanBones = { [name in VRMHumanoidBoneName]: VRMHumanBone[] };
