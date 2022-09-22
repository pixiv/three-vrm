import type { MToonMaterialDebugMode } from './MToonMaterialDebugMode';
import type { MToonMaterialOutlineWidthMode } from './MToonMaterialOutlineWidthMode';
export interface MToonMaterialParameters extends THREE.ShaderMaterialParameters {
    /**
     * Enable depth buffer when renderMode is transparent.
     * Will be processed in the constructor.
     */
    transparentWithZWrite?: boolean;
    color?: THREE.Color;
    map?: THREE.Texture;
    normalMap?: THREE.Texture;
    normalScale?: THREE.Vector2;
    emissive?: THREE.Color;
    emissiveIntensity?: number;
    emissiveMap?: THREE.Texture;
    shadeColorFactor?: THREE.Color;
    shadeMultiplyTexture?: THREE.Texture;
    shadingShiftFactor?: number;
    shadingShiftTexture?: THREE.Texture;
    shadingShiftTextureScale?: number;
    shadingToonyFactor?: number;
    giEqualizationFactor?: number;
    matcapFactor?: THREE.Color;
    matcapTexture?: THREE.Texture;
    parametricRimColorFactor?: THREE.Color;
    rimMultiplyTexture?: THREE.Texture;
    rimLightingMixFactor?: number;
    parametricRimFresnelPowerFactor?: number;
    parametricRimLiftFactor?: number;
    outlineWidthMode?: MToonMaterialOutlineWidthMode;
    outlineWidthFactor?: number;
    outlineWidthMultiplyTexture?: THREE.Texture;
    outlineColorFactor?: THREE.Color;
    outlineLightingMixFactor?: number;
    uvAnimationMaskTexture?: THREE.Texture;
    uvAnimationScrollXSpeedFactor?: number;
    uvAnimationScrollYSpeedFactor?: number;
    uvAnimationRotationSpeedFactor?: number;
    /**
     * Whether the material is affected by fog.
     * `true` by default.
     */
    fog?: boolean;
    /**
     * When this is `true`, vertex colors will be ignored.
     * `true` by default.
     */
    ignoreVertexColor?: boolean;
    /**
     * Debug mode for the material.
     * You can visualize several components for diagnosis using debug mode.
     *
     * See: {@link MToonMaterialDebugMode}
     */
    debugMode?: MToonMaterialDebugMode;
    /**
     * There is a line of the shader called "comment out if you want to PBR absolutely" in VRM0.0 MToon.
     * When this is true, the material enables the line to make it compatible with the legacy rendering of VRM.
     * Usually not recommended to turn this on.
     * `false` by default.
     */
    v0CompatShade?: boolean;
    /**
     * It will draw its outline instead when it's `true`.
     */
    isOutline?: boolean;
}
