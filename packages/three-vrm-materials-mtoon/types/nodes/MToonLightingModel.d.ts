import * as THREE from 'three/webgpu';
export declare class MToonLightingModel extends THREE.LightingModel {
    constructor();
    direct({ lightDirection, lightColor, reflectedLight }: THREE.LightingModelDirectInput): void;
    indirect(context: THREE.LightingModelIndirectInput): void;
    indirectDiffuse({ irradiance, reflectedLight }: THREE.LightingModelIndirectInput): void;
    indirectSpecular({ reflectedLight }: THREE.LightingModelIndirectInput): void;
}
