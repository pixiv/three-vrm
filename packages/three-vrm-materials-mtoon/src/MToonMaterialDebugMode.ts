/* eslint-disable @typescript-eslint/naming-convention */

export const MToonMaterialDebugMode = {
  None: 'none',
  Normal: 'normal',
  LitShadeRate: 'litShadeRate',
  UV: 'uv',
} as const;

export type MToonMaterialDebugMode = typeof MToonMaterialDebugMode[keyof typeof MToonMaterialDebugMode];
