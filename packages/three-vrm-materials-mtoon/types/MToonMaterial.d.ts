import * as THREE from 'three';
import { MToonMaterialDebugMode } from './MToonMaterialDebugMode';
import { MToonMaterialOutlineWidthMode } from './MToonMaterialOutlineWidthMode';
import type { MToonMaterialParameters } from './MToonMaterialParameters';
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
    get color(): THREE.Color;
    set color(value: THREE.Color);
    get map(): THREE.Texture | null;
    set map(value: THREE.Texture | null);
    get normalMap(): THREE.Texture | null;
    set normalMap(value: THREE.Texture | null);
    get normalScale(): THREE.Vector2;
    set normalScale(value: THREE.Vector2);
    get emissive(): THREE.Color;
    set emissive(value: THREE.Color);
    get emissiveIntensity(): number;
    set emissiveIntensity(value: number);
    get emissiveMap(): THREE.Texture | null;
    set emissiveMap(value: THREE.Texture | null);
    get shadeColorFactor(): THREE.Color;
    set shadeColorFactor(value: THREE.Color);
    get shadeMultiplyTexture(): THREE.Texture | null;
    set shadeMultiplyTexture(value: THREE.Texture | null);
    get shadingShiftFactor(): number;
    set shadingShiftFactor(value: number);
    get shadingShiftTexture(): THREE.Texture | null;
    set shadingShiftTexture(value: THREE.Texture | null);
    get shadingShiftTextureScale(): number;
    set shadingShiftTextureScale(value: number);
    get shadingToonyFactor(): number;
    set shadingToonyFactor(value: number);
    get giEqualizationFactor(): number;
    set giEqualizationFactor(value: number);
    get matcapFactor(): THREE.Color;
    set matcapFactor(value: THREE.Color);
    get matcapTexture(): THREE.Texture | null;
    set matcapTexture(value: THREE.Texture | null);
    get parametricRimColorFactor(): THREE.Color;
    set parametricRimColorFactor(value: THREE.Color);
    get rimMultiplyTexture(): THREE.Texture | null;
    set rimMultiplyTexture(value: THREE.Texture | null);
    get rimLightingMixFactor(): number;
    set rimLightingMixFactor(value: number);
    get parametricRimFresnelPowerFactor(): number;
    set parametricRimFresnelPowerFactor(value: number);
    get parametricRimLiftFactor(): number;
    set parametricRimLiftFactor(value: number);
    get outlineWidthMultiplyTexture(): THREE.Texture | null;
    set outlineWidthMultiplyTexture(value: THREE.Texture | null);
    get outlineWidthFactor(): number;
    set outlineWidthFactor(value: number);
    get outlineColorFactor(): THREE.Color;
    set outlineColorFactor(value: THREE.Color);
    get outlineLightingMixFactor(): number;
    set outlineLightingMixFactor(value: number);
    get uvAnimationMaskTexture(): THREE.Texture | null;
    set uvAnimationMaskTexture(value: THREE.Texture | null);
    get uvAnimationScrollXOffset(): number;
    set uvAnimationScrollXOffset(value: number);
    get uvAnimationScrollYOffset(): number;
    set uvAnimationScrollYOffset(value: number);
    get uvAnimationRotationPhase(): number;
    set uvAnimationRotationPhase(value: number);
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
    /**
     * When this is `true`, vertex colors will be ignored.
     * `true` by default.
     */
    get ignoreVertexColor(): boolean;
    set ignoreVertexColor(value: boolean);
    private _v0CompatShade;
    /**
     * There is a line of the shader called "comment out if you want to PBR absolutely" in VRM0.0 MToon.
     * When this is true, the material enables the line to make it compatible with the legacy rendering of VRM.
     * Usually not recommended to turn this on.
     * `false` by default.
     */
    get v0CompatShade(): boolean;
    /**
     * There is a line of the shader called "comment out if you want to PBR absolutely" in VRM0.0 MToon.
     * When this is true, the material enables the line to make it compatible with the legacy rendering of VRM.
     * Usually not recommended to turn this on.
     * `false` by default.
     */
    set v0CompatShade(v: boolean);
    private _debugMode;
    /**
     * Debug mode for the material.
     * You can visualize several components for diagnosis using debug mode.
     *
     * See: {@link MToonMaterialDebugMode}
     */
    get debugMode(): MToonMaterialDebugMode;
    /**
     * Debug mode for the material.
     * You can visualize several components for diagnosis using debug mode.
     *
     * See: {@link MToonMaterialDebugMode}
     */
    set debugMode(m: MToonMaterialDebugMode);
    private _outlineWidthMode;
    get outlineWidthMode(): MToonMaterialOutlineWidthMode;
    set outlineWidthMode(m: MToonMaterialOutlineWidthMode);
    private _isOutline;
    get isOutline(): boolean;
    set isOutline(b: boolean);
    /**
     * Readonly boolean that indicates this is a [[MToonMaterial]].
     */
    get isMToonMaterial(): true;
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
