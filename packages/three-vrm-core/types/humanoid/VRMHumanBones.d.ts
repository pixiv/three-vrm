import type { VRMHumanBone } from './VRMHumanBone';
import type { VRMHumanBoneName } from './VRMHumanBoneName';
import type { VRMRequiredHumanBoneName } from './VRMRequiredHumanBoneName';
/**
 * A map from {@link VRMHumanBoneName} to {@link VRMHumanBone}.
 */
export type VRMHumanBones = {
    [name in VRMHumanBoneName]?: VRMHumanBone;
} & {
    [name in VRMRequiredHumanBoneName]: VRMHumanBone;
};
