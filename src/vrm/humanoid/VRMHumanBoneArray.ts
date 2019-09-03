import { HumanBone } from '../types';
import { VRMHumanBone } from './VRMHumanBone';

/**
 * An array represents a `vrm.humanoid.humanBones` field of VRM specification.
 */
export type VRMHumanBoneArray = Array<{
  name: HumanBone;
  bone: VRMHumanBone;
}>;
