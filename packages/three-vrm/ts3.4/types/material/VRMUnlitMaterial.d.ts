import * as THREE from 'three';
export interface VRMUnlitMaterialParameters extends THREE.ShaderMaterialParameters {
    cutoff?: number;
    map?: THREE.Texture;
    mainTex?: THREE.Texture;
    mainTex_ST?: THREE.Vector4;
    renderType?: VRMUnlitMaterialRenderType | number;
}
export declare enum VRMUnlitMaterialRenderType {
    Opaque = 0,
    Cutout = 1,
    Transparent = 2,
    TransparentWithZWrite = 3
}
/**
 * This is a material that is an equivalent of "VRM/Unlit***" on VRM spec, those materials are already kinda deprecated though...
 */
export declare class VRMUnlitMaterial extends THREE.ShaderMaterial {
    /**
     * Readonly boolean that indicates this is a [[VRMUnlitMaterial]].
     */
    readonly isVRMUnlitMaterial: boolean;
    cutoff: number;
    map: THREE.Texture | null;
    mainTex_ST: THREE.Vector4;
    private _renderType;
    shouldApplyUniforms: boolean;
    constructor(parameters?: VRMUnlitMaterialParameters);
    mainTex: THREE.Texture | null;
    renderType: VRMUnlitMaterialRenderType;
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
}
