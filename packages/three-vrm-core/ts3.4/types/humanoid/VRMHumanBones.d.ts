import { VRMHumanBone } from './VRMHumanBone';
import { VRMHumanBoneName } from './VRMHumanBoneName';
import { VRMRequiredHumanBoneName } from './VRMRequiredHumanBoneName';
/**
 * A map from {@link VRMHumanBoneName} to {@link VRMHumanBone}.
 */
export type VRMHumanBones = {
    [name in VRMHumanBoneName]?: VRMHumanBone;
} & {
    [name in VRMRequiredHumanBoneName]: VRMHumanBone;
};
