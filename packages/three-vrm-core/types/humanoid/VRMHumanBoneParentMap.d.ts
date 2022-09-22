import { VRMHumanBoneName } from './VRMHumanBoneName';
/**
 * An object that maps from {@link VRMHumanBoneName} to its parent {@link VRMHumanBoneName}.
 *
 * Ref: https://github.com/vrm-c/vrm-specification/blob/master/specification/VRMC_vrm-1.0/humanoid.md
 */
export declare const VRMHumanBoneParentMap: {
    [bone in VRMHumanBoneName]: VRMHumanBoneName | null;
};
