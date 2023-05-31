export declare const VRMExpressionMaterialColorType: {
    readonly Color: "color";
    readonly EmissionColor: "emissionColor";
    readonly ShadeColor: "shadeColor";
    readonly MatcapColor: "matcapColor";
    readonly RimColor: "rimColor";
    readonly OutlineColor: "outlineColor";
};
export type VRMExpressionMaterialColorType = typeof VRMExpressionMaterialColorType[keyof typeof VRMExpressionMaterialColorType];
export declare const v0ExpressionMaterialColorMap: {
    [key: string]: VRMExpressionMaterialColorType | undefined;
};
