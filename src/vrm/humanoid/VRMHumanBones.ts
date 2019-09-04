import { VRMSchema } from '../types';
import { VRMHumanBone } from './VRMHumanBone';

/**
 * This object is a object variant of [[VRMHumanBoneArray]], used internally in [[VRMHumanoid]].
 */
export type VRMHumanBones = { [name in VRMSchema.HumanoidBoneName]: VRMHumanBone[] };
