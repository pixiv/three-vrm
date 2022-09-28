/* eslint-disable @typescript-eslint/naming-convention */

export const VRMExpressionMaterialColorType = {
  Color: 'color',
  EmissionColor: 'emissionColor',
  ShadeColor: 'shadeColor',
  MatcapColor: 'matcapColor',
  RimColor: 'rimColor',
  OutlineColor: 'outlineColor',
} as const;

export type VRMExpressionMaterialColorType =
  typeof VRMExpressionMaterialColorType[keyof typeof VRMExpressionMaterialColorType];

export const v0ExpressionMaterialColorMap: { [key: string]: VRMExpressionMaterialColorType | undefined } = {
  _Color: VRMExpressionMaterialColorType.Color,
  _EmissionColor: VRMExpressionMaterialColorType.EmissionColor,
  _ShadeColor: VRMExpressionMaterialColorType.ShadeColor,
  _RimColor: VRMExpressionMaterialColorType.RimColor,
  _OutlineColor: VRMExpressionMaterialColorType.OutlineColor,
};
