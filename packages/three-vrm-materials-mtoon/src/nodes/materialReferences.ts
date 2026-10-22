import { materialReference } from 'three/tsl';

export const refColor = materialReference('color', 'color');
export const refMap = materialReference('map', 'texture');
export const refNormalMap = materialReference('normalMap', 'texture');
export const refNormalScale = materialReference('normalScale', 'vec2');
export const refEmissive = materialReference('emissive', 'color');
export const refEmissiveIntensity = materialReference('emissiveIntensity', 'float');
export const refEmissiveMap = materialReference('emissiveMap', 'texture');

export const refShadeColorFactor = materialReference('shadeColorFactor', 'color');
export const refShadeMultiplyTexture = materialReference('shadeMultiplyTexture', 'texture');
export const refShadingShiftFactor = materialReference('shadingShiftFactor', 'float');
export const refShadingShiftTexture = materialReference('shadingShiftTexture', 'texture');
export const refShadingShiftTextureScale = materialReference('shadingShiftTextureScale', 'float');
export const refShadingToonyFactor = materialReference('shadingToonyFactor', 'float');
export const refRimLightingMixFactor = materialReference('rimLightingMixFactor', 'float');
export const refRimMultiplyTexture = materialReference('rimMultiplyTexture', 'texture');
export const refMatcapFactor = materialReference('matcapFactor', 'color');
export const refMatcapTexture = materialReference('matcapTexture', 'texture');
export const refParametricRimColorFactor = materialReference('parametricRimColorFactor', 'color');
export const refParametricRimLiftFactor = materialReference('parametricRimLiftFactor', 'float');
export const refParametricRimFresnelPowerFactor = materialReference('parametricRimFresnelPowerFactor', 'float');
export const refOutlineWidthMultiplyTexture = materialReference('outlineWidthMultiplyTexture', 'texture');
export const refOutlineWidthFactor = materialReference('outlineWidthFactor', 'float');
export const refOutlineColorFactor = materialReference('outlineColorFactor', 'color');
export const refOutlineLightingMixFactor = materialReference('outlineLightingMixFactor', 'float');
export const refUVAnimationMaskTexture = materialReference('uvAnimationMaskTexture', 'texture');

export const refUVAnimationScrollXOffset = materialReference('uvAnimationScrollXOffset', 'float');
export const refUVAnimationScrollYOffset = materialReference('uvAnimationScrollYOffset', 'float');
export const refUVAnimationRotationPhase = materialReference('uvAnimationRotationPhase', 'float');
