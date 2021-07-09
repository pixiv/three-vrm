/* eslint-disable @typescript-eslint/naming-convention */

export const VRMConstraintSpace = {
  Local: 'local',
  Model: 'model',
} as const;

export type VRMConstraintSpace = typeof VRMConstraintSpace[keyof typeof VRMConstraintSpace];
