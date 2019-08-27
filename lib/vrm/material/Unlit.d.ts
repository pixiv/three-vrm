import * as THREE from 'three';
export declare class Unlit extends THREE.ShaderMaterial {
    readonly isVRMUnlit: boolean;
    cutoff: number;
    map: THREE.Texture | null;
    mainTex_ST: THREE.Vector4;
    private _renderType;
    shouldApplyUniforms: boolean;
    constructor(parameters?: UnlitParameters);
    mainTex: THREE.Texture | null;
    renderType: UnlitRenderType;
    copy(source: this): this;
    applyUniforms(): void;
    private updateShaderCode;
}
export interface UnlitParameters extends THREE.ShaderMaterialParameters {
    cutoff?: number;
    map?: THREE.Texture;
    mainTex?: THREE.Texture;
    mainTex_ST?: THREE.Vector4;
    renderType?: UnlitRenderType | number;
}
export declare enum UnlitRenderType {
    Opaque = 0,
    Cutout = 1,
    Transparent = 2,
    TransparentWithZWrite = 3
}
