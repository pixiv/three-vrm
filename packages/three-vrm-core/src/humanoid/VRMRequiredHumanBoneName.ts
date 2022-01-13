/* eslint-disable @typescript-eslint/naming-convention */

export const VRMRequiredHumanBoneName = {
  Hips: 'hips',
  Spine: 'spine',
  Head: 'head',
  LeftUpperLeg: 'leftUpperLeg',
  LeftLowerLeg: 'leftLowerLeg',
  LeftFoot: 'leftFoot',
  RightUpperLeg: 'rightUpperLeg',
  RightLowerLeg: 'rightLowerLeg',
  RightFoot: 'rightFoot',
  LeftUpperArm: 'leftUpperArm',
  LeftLowerArm: 'leftLowerArm',
  LeftHand: 'leftHand',
  RightUpperArm: 'rightUpperArm',
  RightLowerArm: 'rightLowerArm',
  RightHand: 'rightHand',
} as const;

export type VRMRequiredHumanBoneName = typeof VRMRequiredHumanBoneName[keyof typeof VRMRequiredHumanBoneName];
