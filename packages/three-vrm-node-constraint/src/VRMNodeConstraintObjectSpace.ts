/* eslint-disable @typescript-eslint/naming-convention */

export const VRMNodeConstraintObjectSpace = {
  Local: 'local',
  Model: 'model',
} as const;

export type VRMNodeConstraintObjectSpace = typeof VRMNodeConstraintObjectSpace[keyof typeof VRMNodeConstraintObjectSpace];
