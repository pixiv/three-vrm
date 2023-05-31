import * as THREE from 'three';
import { MToonMaterialDebugMode } from './MToonMaterialDebugMode';
import { MToonMaterialOutlineWidthMode } from './MToonMaterialOutlineWidthMode';
import { MToonMaterialParameters } from './MToonMaterialParameters';
/**
 * MToon is a material specification that has various features.
 * The spec and implementation are originally founded for Unity engine and this is a port of the material.
 *
 * See: https://github.com/Santarh/MToon
 */
export declare class MToonMaterial extends THREE.ShaderMaterial {
    uniforms: {
        litFactor: THREE.IUniform<THREE.Color>;
        alphaTest: THREE.IUniform<number>;
        opacity: THREE.IUniform<number>;
        map: THREE.IUniform<THREE.Texture | null>;
        mapUvTransform: THREE.IUniform<THREE.Matrix3>;
        normalMap: THREE.IUniform<THREE.Texture | null>;
        normalMapUvTransform: THREE.IUniform<THREE.Matrix3>;
        normalScale: THREE.IUniform<THREE.Vector2>;
        emissive: THREE.IUniform<THREE.Color>;
        emissiveIntensity: THREE.IUniform<number>;
        emissiveMap: THREE.IUniform<THREE.Texture | null>;
        emissiveMapUvTransform: THREE.IUniform<THREE.Matrix3>;
        shadeColorFactor: THREE.IUniform<THREE.Color>;
        shadeMultiplyTexture: THREE.IUniform<THREE.Texture | null>;
        shadeMultiplyTextureUvTransform: THREE.IUniform<THREE.Matrix3>;
        shadingShiftFactor: THREE.IUniform<number>;
        shadingShiftTexture: THREE.IUniform<THREE.Texture | null>;
        shadingShiftTextureUvTransform: THREE.IUniform<THREE.Matrix3>;
        shadingShiftTextureScale: THREE.IUniform<number>;
        shadingToonyFactor: THREE.IUniform<number>;
        giEqualizationFactor: THREE.IUniform<number>;
        matcapFactor: THREE.IUniform<THREE.Color>;
        matcapTexture: THREE.IUniform<THREE.Texture | null>;
        matcapTextureUvTransform: THREE.IUniform<THREE.Matrix3>;
        parametricRimColorFactor: THREE.IUniform<THREE.Color>;
        rimMultiplyTexture: THREE.IUniform<THREE.Texture | null>;
        rimMultiplyTextureUvTransform: THREE.IUniform<THREE.Matrix3>;
        rimLightingMixFactor: THREE.IUniform<number>;
        parametricRimFresnelPowerFactor: THREE.IUniform<number>;
        parametricRimLiftFactor: THREE.IUniform<number>;
        outlineWidthMultiplyTexture: THREE.IUniform<THREE.Texture | null>;
        outlineWidthMultiplyTextureUvTransform: THREE.IUniform<THREE.Matrix3>;
        outlineWidthFactor: THREE.IUniform<number>;
        outlineColorFactor: THREE.IUniform<THREE.Color>;
        outlineLightingMixFactor: THREE.IUniform<number>;
        uvAnimationMaskTexture: THREE.IUniform<THREE.Texture | null>;
        uvAnimationMaskTextureUvTransform: THREE.IUniform<THREE.Matrix3>;
        uvAnimationScrollXOffset: THREE.IUniform<number>;
        uvAnimationScrollYOffset: THREE.IUniform<number>;
        uvAnimationRotationPhase: THREE.IUniform<number>;
    };
    color: THREE.Color;
    map: THREE.Texture | null;
    normalMap: THREE.Texture | null;
    normalScale: THREE.Vector2;
    emissive: THREE.Color;
    emissiveIntensity: number;
    emissiveMap: THREE.Texture | null;
    shadeColorFactor: THREE.Color;
    shadeMultiplyTexture: THREE.Texture | null;
    shadingShiftFactor: number;
    shadingShiftTexture: THREE.Texture | null;
    shadingShiftTextureScale: number;
    shadingToonyFactor: number;
    giEqualizationFactor: number;
    matcapFactor: THREE.Color;
    matcapTexture: THREE.Texture | null;
    parametricRimColorFactor: THREE.Color;
    rimMultiplyTexture: THREE.Texture | null;
    rimLightingMixFactor: number;
    parametricRimFresnelPowerFactor: number;
    parametricRimLiftFactor: number;
    outlineWidthMultiplyTexture: THREE.Texture | null;
    outlineWidthFactor: number;
    outlineColorFactor: THREE.Color;
    outlineLightingMixFactor: number;
    uvAnimationMaskTexture: THREE.Texture | null;
    uvAnimationScrollXOffset: number;
    uvAnimationScrollYOffset: number;
    uvAnimationRotationPhase: number;
    uvAnimationScrollXSpeedFactor: number;
    uvAnimationScrollYSpeedFactor: number;
    uvAnimationRotationSpeedFactor: number;
    /**
     * Whether the material is affected by fog.
     * `true` by default.
     */
    fog: boolean;
    /**
     * Will be read in WebGLPrograms
     *
     * See: https://github.com/mrdoob/three.js/blob/4f5236ac3d6f41d904aa58401b40554e8fbdcb15/src/renderers/webgl/WebGLPrograms.js#L190-L191
     */
    normalMapType: 0;
    /**
     * When this is `true`, vertex colors will be ignored.
     * `true` by default.
     */
    private _ignoreVertexColor;
    /*
    * When this is `true`, vertex colors will be ignored.
    * `true` by default.
    */
    ignoreVertexColor: boolean;
    private _v0CompatShade;
    /*
    * There is a line of the shader called "comment out if you want to PBR absolutely" in VRM0.0 MToon.
    * When this is true, the material enables the line to make it compatible with the legacy rendering of VRM.
    * Usually not recommended to turn this on.
    * `false` by default.
    
    
    * There is a line of the shader called "comment out if you want to PBR absolutely" in VRM0.0 MToon.
    * When this is true, the material enables the line to make it compatible with the legacy rendering of VRM.
    * Usually not recommended to turn this on.
    * `false` by default.
    */
    v0CompatShade: boolean;
    private _debugMode;
    /*
    * Debug mode for the material.
    * You can visualize several components for diagnosis using debug mode.
    *
    * See: {@link MToonMaterialDebugMode}
    
    
    * Debug mode for the material.
    * You can visualize several components for diagnosis using debug mode.
    *
    * See: {@link MToonMaterialDebugMode}
    */
    debugMode: MToonMaterialDebugMode;
    private _outlineWidthMode;
    outlineWidthMode: MToonMaterialOutlineWidthMode;
    private _isOutline;
    isOutline: boolean;
    /*
    * Readonly boolean that indicates this is a [[MToonMaterial]].
    */
    readonly isMToonMaterial: true;
    constructor(parameters?: MToonMaterialParameters);
    /**
     * Update this material.
     *
     * @param delta deltaTime since last update
     */
    update(delta: number): void;
    copy(source: this): this;
    /**
     * Update UV animation state.
     * Intended to be called via {@link update}.
     * @param delta deltaTime
     */
    private _updateUVAnimation;
    /**
     * Upload uniforms that need to upload but doesn't automatically because of reasons.
     * Intended to be called via {@link constructor} and {@link update}.
     */
    private _uploadUniformsWorkaround;
    /**
     * Returns a map object of preprocessor token and macro of the shader program.
     */
    private _generateDefines;
    private _updateTextureMatrix;
}
