import * as THREE from 'three';
export interface MToonParameters extends THREE.ShaderMaterialParameters {
    mToonVersion?: number;
    cutoff?: number;
    color?: THREE.Vector4;
    shadeColor?: THREE.Vector4;
    map?: THREE.Texture;
    mainTex?: THREE.Texture;
    mainTex_ST?: THREE.Vector4;
    shadeTexture?: THREE.Texture;
    bumpScale?: number;
    normalMap?: THREE.Texture;
    normalMapType?: THREE.NormalMapTypes;
    normalScale?: THREE.Vector2;
    bumpMap?: THREE.Texture;
    receiveShadowRate?: number;
    receiveShadowTexture?: THREE.Texture;
    shadingGradeRate?: number;
    shadingGradeTexture?: THREE.Texture;
    shadeShift?: number;
    shadeToony?: number;
    lightColorAttenuation?: number;
    indirectLightIntensity?: number;
    rimTexture?: THREE.Texture;
    rimColor?: THREE.Vector4;
    rimLightingMix?: number;
    rimFresnelPower?: number;
    rimLift?: number;
    sphereAdd?: THREE.Texture;
    emissionColor?: THREE.Vector4;
    emissiveMap?: THREE.Texture;
    emissionMap?: THREE.Texture;
    outlineWidthTexture?: THREE.Texture;
    outlineWidth?: number;
    outlineScaledMaxDistance?: number;
    outlineColor?: THREE.Vector4;
    outlineLightingMix?: number;
    uvAnimMaskTexture?: THREE.Texture;
    uvAnimScrollX?: number;
    uvAnimScrollY?: number;
    uvAnimRotation?: number;
    debugMode?: MToonMaterialDebugMode | number;
    blendMode?: MToonMaterialRenderMode | number;
    outlineWidthMode?: MToonMaterialOutlineWidthMode | number;
    outlineColorMode?: MToonMaterialOutlineColorMode | number;
    cullMode?: MToonMaterialCullMode | number;
    outlineCullMode?: MToonMaterialCullMode | number;
    srcBlend?: number;
    dstBlend?: number;
    zWrite?: number;
    isOutline?: boolean;
    /**
     * Specify the encoding of input uniform colors.
     *
     * When your `renderer.outputEncoding` is `THREE.LinearEncoding`, use `THREE.LinearEncoding`.
     * When your `renderer.outputEncoding` is `THREE.sRGBEncoding`, use `THREE.sRGBEncoding`.
     *
     * Encodings of textures should be set independently on textures.
     *
     * This will use `THREE.LinearEncoding` if this option isn't specified.
     *
     * See also: https://threejs.org/docs/#api/en/renderers/WebGLRenderer.outputEncoding
     */
    encoding?: THREE.TextureEncoding;
}
export declare enum MToonMaterialCullMode {
    Off = 0,
    Front = 1,
    Back = 2
}
export declare enum MToonMaterialDebugMode {
    None = 0,
    Normal = 1,
    LitShadeRate = 2,
    UV = 3
}
export declare enum MToonMaterialOutlineColorMode {
    FixedColor = 0,
    MixedLighting = 1
}
export declare enum MToonMaterialOutlineWidthMode {
    None = 0,
    WorldCoordinates = 1,
    ScreenCoordinates = 2
}
export declare enum MToonMaterialRenderMode {
    Opaque = 0,
    Cutout = 1,
    Transparent = 2,
    TransparentWithZWrite = 3
}
/**
 * MToon is a material specification that has various features.
 * The spec and implementation are originally founded for Unity engine and this is a port of the material.
 *
 * See: https://github.com/Santarh/MToon
 */
export declare class MToonMaterial extends THREE.ShaderMaterial {
    /**
     * Readonly boolean that indicates this is a [[MToonMaterial]].
     */
    readonly isMToonMaterial: boolean;
    cutoff: number;
    color: THREE.Vector4;
    shadeColor: THREE.Vector4;
    map: THREE.Texture | null;
    mainTex_ST: THREE.Vector4;
    shadeTexture: THREE.Texture | null;
    normalMap: THREE.Texture | null;
    normalMapType: THREE.NormalMapTypes;
    normalScale: THREE.Vector2;
    receiveShadowRate: number;
    receiveShadowTexture: THREE.Texture | null;
    shadingGradeRate: number;
    shadingGradeTexture: THREE.Texture | null;
    shadeShift: number;
    shadeToony: number;
    lightColorAttenuation: number;
    indirectLightIntensity: number;
    rimTexture: THREE.Texture | null;
    rimColor: THREE.Vector4;
    rimLightingMix: number;
    rimFresnelPower: number;
    rimLift: number;
    sphereAdd: THREE.Texture | null;
    emissionColor: THREE.Vector4;
    emissiveMap: THREE.Texture | null;
    outlineWidthTexture: THREE.Texture | null;
    outlineWidth: number;
    outlineScaledMaxDistance: number;
    outlineColor: THREE.Vector4;
    outlineLightingMix: number;
    uvAnimMaskTexture: THREE.Texture | null;
    uvAnimScrollX: number;
    uvAnimScrollY: number;
    uvAnimRotation: number;
    shouldApplyUniforms: boolean;
    /**
     * The encoding of input uniform colors.
     *
     * When your `renderer.outputEncoding` is `THREE.LinearEncoding`, use `THREE.LinearEncoding`.
     * When your `renderer.outputEncoding` is `THREE.sRGBEncoding`, use `THREE.sRGBEncoding`.
     *
     * Encodings of textures are set independently on textures.
     *
     * This is `THREE.LinearEncoding` by default.
     *
     * See also: https://threejs.org/docs/#api/en/renderers/WebGLRenderer.outputEncoding
     */
    encoding: THREE.TextureEncoding;
    private _debugMode;
    private _blendMode;
    private _outlineWidthMode;
    private _outlineColorMode;
    private _cullMode;
    private _outlineCullMode;
    private _isOutline;
    private _uvAnimOffsetX;
    private _uvAnimOffsetY;
    private _uvAnimPhase;
    constructor(parameters?: MToonParameters);
    mainTex: THREE.Texture | null;
    bumpMap: THREE.Texture | null;
    /*
    * Getting the `bumpScale` reutrns its x component of `normalScale` (assuming x and y component of `normalScale` are same).
    
    
    * Setting the `bumpScale` will be convert the value into Vector2 `normalScale` .
    */
    bumpScale: number;
    emissionMap: THREE.Texture | null;
    blendMode: MToonMaterialRenderMode;
    debugMode: MToonMaterialDebugMode;
    outlineWidthMode: MToonMaterialOutlineWidthMode;
    outlineColorMode: MToonMaterialOutlineColorMode;
    cullMode: MToonMaterialCullMode;
    outlineCullMode: MToonMaterialCullMode;
    zWrite: number;
    isOutline: boolean;
    /**
     * Update this material.
     * Usually this will be called via [[VRM.update]] so you don't have to call this manually.
     *
     * @param delta deltaTime since last update
     */
    updateVRMMaterials(delta: number): void;
    copy(source: this): this;
    /**
     * Apply updated uniform variables.
     */
    private _applyUniforms;
    private _updateShaderCode;
    private _updateCullFace;
}
