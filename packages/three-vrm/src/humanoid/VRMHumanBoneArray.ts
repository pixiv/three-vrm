import { VRMHumanBone } from './VRMHumanBone';
import { VRMHumanoidBoneName } from './VRMHumanoidBoneName';

/**
 * An array represents a `vrm.humanoid.humanBones` field of VRM specification.
 */
export type VRMHumanBoneArray = Array<{
  name: VRMHumanoidBoneName;
  bone: VRMHumanBone;
}>;
