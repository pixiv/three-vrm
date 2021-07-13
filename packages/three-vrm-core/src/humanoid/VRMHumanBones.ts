import type { VRMHumanBone } from './VRMHumanBone';
import type { VRMHumanBoneName } from './VRMHumanBoneName';

/**
 * A map from {@link VRMHumanBoneName} to {@link VRMHumanBone}.
 */
export type VRMHumanBones = { [name in VRMHumanBoneName]?: VRMHumanBone };
