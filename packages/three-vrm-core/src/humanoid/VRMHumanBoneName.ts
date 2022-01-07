/* eslint-disable @typescript-eslint/naming-convention */

/**
 * The names of {@link VRMHumanoid} bone names.
 *
 * Ref: https://github.com/vrm-c/vrm-specification/blob/master/specification/VRMC_vrm-1.0-beta/humanoid.md
 */
export const VRMHumanBoneName = {
  Hips: 'hips',
  Spine: 'spine',
  Chest: 'chest',
  UpperChest: 'upperChest',
  Neck: 'neck',

  Head: 'head',
  LeftEye: 'leftEye',
  RightEye: 'rightEye',
  Jaw: 'jaw',

  LeftUpperLeg: 'leftUpperLeg',
  LeftLowerLeg: 'leftLowerLeg',
  LeftFoot: 'leftFoot',
  LeftToes: 'leftToes',

  RightUpperLeg: 'rightUpperLeg',
  RightLowerLeg: 'rightLowerLeg',
  RightFoot: 'rightFoot',
  RightToes: 'rightToes',

  LeftShoulder: 'leftShoulder',
  LeftUpperArm: 'leftUpperArm',
  LeftLowerArm: 'leftLowerArm',
  LeftHand: 'leftHand',

  RightShoulder: 'rightShoulder',
  RightUpperArm: 'rightUpperArm',
  RightLowerArm: 'rightLowerArm',
  RightHand: 'rightHand',

  LeftThumbProximal: 'leftThumbProximal',
  LeftThumbIntermediate: 'leftThumbIntermediate',
  LeftThumbDistal: 'leftThumbDistal',
  LeftIndexProximal: 'leftIndexProximal',
  LeftIndexIntermediate: 'leftIndexIntermediate',
  LeftIndexDistal: 'leftIndexDistal',
  LeftMiddleProximal: 'leftMiddleProximal',
  LeftMiddleIntermediate: 'leftMiddleIntermediate',
  LeftMiddleDistal: 'leftMiddleDistal',
  LeftRingProximal: 'leftRingProximal',
  LeftRingIntermediate: 'leftRingIntermediate',
  LeftRingDistal: 'leftRingDistal',
  LeftLittleProximal: 'leftLittleProximal',
  LeftLittleIntermediate: 'leftLittleIntermediate',
  LeftLittleDistal: 'leftLittleDistal',

  RightThumbProximal: 'rightThumbProximal',
  RightThumbIntermediate: 'rightThumbIntermediate',
  RightThumbDistal: 'rightThumbDistal',
  RightIndexProximal: 'rightIndexProximal',
  RightIndexIntermediate: 'rightIndexIntermediate',
  RightIndexDistal: 'rightIndexDistal',
  RightMiddleProximal: 'rightMiddleProximal',
  RightMiddleIntermediate: 'rightMiddleIntermediate',
  RightMiddleDistal: 'rightMiddleDistal',
  RightRingProximal: 'rightRingProximal',
  RightRingIntermediate: 'rightRingIntermediate',
  RightRingDistal: 'rightRingDistal',
  RightLittleProximal: 'rightLittleProximal',
  RightLittleIntermediate: 'rightLittleIntermediate',
  RightLittleDistal: 'rightLittleDistal',
} as const;

export type VRMHumanBoneName = typeof VRMHumanBoneName[keyof typeof VRMHumanBoneName];
