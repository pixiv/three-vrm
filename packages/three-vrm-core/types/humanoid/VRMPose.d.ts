import type { VRMHumanBoneName } from './VRMHumanBoneName';
import type { VRMPoseTransform } from './VRMPoseTransform';
/**
 * Represents a pose that VRM can do.
 *
 * See {@link VRMHumanBone} for complete list of bone names.
 * Note that certain VRM models might not have every bones defined in {@link VRMHumanBone}.
 *
 * @example An example of VRMPose interface
 * ```js
 * {
 *   [HumanBone.LeftUpperLeg] : {
 *     rotation: [  0.000,  0.000, -0.454,  0.891 ],
 *     position: [  0.000,  0.000,  0.000 ] // position is not required though
 *   },
 *   [HumanBone.LeftLowerLeg] : {
 *     rotation: [ -0.454,  0.000,  0.000,  0.891 ]
 *   },
 * }
 * ```
 */
export type VRMPose = {
    [boneName in VRMHumanBoneName]?: VRMPoseTransform;
};
