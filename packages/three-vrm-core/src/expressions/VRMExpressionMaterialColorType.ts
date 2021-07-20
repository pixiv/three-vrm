/* eslint-disable @typescript-eslint/naming-convention */

export const VRMExpressionMaterialColorType = {
  Color: 'color',
  EmissionColor: 'emissionColor',
  ShadeColor: 'shadeColor',
  RimColor: 'rimColor',
  OutlineColor: 'outlineColor',
} as const;

export type VRMExpressionMaterialColorType = typeof VRMExpressionMaterialColorType[keyof typeof VRMExpressionMaterialColorType];
