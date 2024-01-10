import * as Nodes from 'three/examples/jsm/nodes/Nodes.js';

export const refColor = Nodes.materialReference('color', 'color');
export const refMap = Nodes.materialReference('map', 'texture');
export const refNormalMap = Nodes.materialReference('normalMap', 'texture');
export const refNormalScale = Nodes.materialReference('normalScale', 'vec2');
export const refEmissive = Nodes.materialReference('emissive', 'color');
export const refEmissiveIntensity = Nodes.materialReference('emissiveIntensity', 'float');
export const refEmissiveMap = Nodes.materialReference('emissiveMap', 'texture');

export const refShadeColorFactor = Nodes.materialReference('shadeColorFactor', 'color');
export const refShadingShiftFactor = Nodes.materialReference('shadingShiftFactor', 'float');
export const refShadeMultiplyTexture = Nodes.materialReference('shadeMultiplyTexture', 'texture');
export const refShadeMultiplyTextureScale = Nodes.materialReference('shadeMultiplyTextureScale', 'float');
export const refShadingToonyFactor = Nodes.materialReference('shadingToonyFactor', 'float');
export const refRimLightingMixFactor = Nodes.materialReference('rimLightingMixFactor', 'float');
export const refRimMultiplyTexture = Nodes.materialReference('rimMultiplyTexture', 'texture');
export const refMatcapFactor = Nodes.materialReference('matcapFactor', 'color');
export const refMatcapTexture = Nodes.materialReference('matcapTexture', 'texture');
export const refParametricRimColorFactor = Nodes.materialReference('parametricRimColorFactor', 'color');
export const refParametricRimLiftFactor = Nodes.materialReference('parametricRimLiftFactor', 'float');
export const refParametricRimFresnelPowerFactor = Nodes.materialReference('parametricRimFresnelPowerFactor', 'float');
export const refOutlineWidthMultiplyTexture = Nodes.materialReference('outlineWidthMultiplyTexture', 'texture');
export const refOutlineWidthFactor = Nodes.materialReference('outlineWidthFactor', 'float');
export const refOutlineColorFactor = Nodes.materialReference('outlineColorFactor', 'color');
export const refOutlineLightingMixFactor = Nodes.materialReference('outlineLightingMixFactor', 'float');
export const refUVAnimationMaskTexture = Nodes.materialReference('uvAnimationMaskTexture', 'texture');

export const refUVAnimationScrollXOffset = Nodes.materialReference('uvAnimationScrollXOffset', 'float');
export const refUVAnimationScrollYOffset = Nodes.materialReference('uvAnimationScrollYOffset', 'float');
export const refUVAnimationRotationPhase = Nodes.materialReference('uvAnimationRotationPhase', 'float');
