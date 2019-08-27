import * as THREE from 'three';
export declare class MToon extends THREE.ShaderMaterial {
    readonly isVRMMToon: boolean;
    cutoff: number;
    color: THREE.Vector4;
    shadeColor: THREE.Vector4;
    map: THREE.Texture | null;
    mainTex_ST: THREE.Vector4;
    shadeTexture: THREE.Texture | null;
    bumpScale: number;
    normalMap: THREE.Texture | null;
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
    shouldApplyUniforms: boolean;
    private _debugMode;
    private _blendMode;
    private _outlineWidthMode;
    private _outlineColorMode;
    private _cullMode;
    private _outlineCullMode;
    private _isOutline;
    private readonly _colorSpaceGamma;
    constructor(colorSpaceGamma: boolean, parameters?: MToonParameters);
    mainTex: THREE.Texture | null;
    bumpMap: THREE.Texture | null;
    emissionMap: THREE.Texture | null;
    blendMode: MToonRenderMode;
    debugMode: MToonDebugMode;
    outlineWidthMode: MToonOutlineWidthMode;
    outlineColorMode: MToonOutlineColorMode;
    cullMode: MToonCullMode;
    outlineCullMode: MToonCullMode;
    zWrite: number;
    isOutline: boolean;
    copy(source: this): this;
    applyUniforms(): void;
    private updateShaderCode;
    private updateCullFace;
}
export interface MToonParameters extends THREE.ShaderMaterialParameters {
    cutoff?: number;
    color?: THREE.Vector4;
    shadeColor?: THREE.Vector4;
    map?: THREE.Texture;
    mainTex?: THREE.Texture;
    mainTex_ST?: THREE.Vector4;
    shadeTexture?: THREE.Texture;
    bumpScale?: number;
    normalMap?: THREE.Texture;
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
    debugMode?: MToonDebugMode | number;
    blendMode?: MToonRenderMode | number;
    outlineWidthMode?: MToonOutlineWidthMode | number;
    outlineColorMode?: MToonOutlineColorMode | number;
    cullMode?: MToonCullMode | number;
    outlineCullMode?: MToonCullMode | number;
    srcBlend?: number;
    dstBlend?: number;
    zWrite?: number;
    isOutline?: boolean;
}
export declare enum MToonCullMode {
    Off = 0,
    Front = 1,
    Back = 2
}
export declare enum MToonDebugMode {
    None = 0,
    Normal = 1,
    LitShadeRate = 2,
    UV = 3
}
export declare enum MToonOutlineColorMode {
    FixedColor = 0,
    MixedLighting = 1
}
export declare enum MToonOutlineWidthMode {
    None = 0,
    WorldCoordinates = 1,
    ScreenCoordinates = 2
}
export declare enum MToonRenderMode {
    Opaque = 0,
    Cutout = 1,
    Transparent = 2,
    TransparentWithZWrite = 3
}
