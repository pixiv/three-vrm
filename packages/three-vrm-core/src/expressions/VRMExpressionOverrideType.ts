/* eslint-disable @typescript-eslint/naming-convention */

export const VRMExpressionOverrideType = {
  None: 'none',
  Block: 'block',
  Blend: 'blend',
} as const;

export type VRMExpressionOverrideType = typeof VRMExpressionOverrideType[keyof typeof VRMExpressionOverrideType];
