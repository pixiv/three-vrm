import * as THREE from 'three/webgpu';
export declare class MToonLightingModel extends THREE.LightingModel {
    constructor();
    direct({ lightDirection, lightColor, reflectedLight, }: THREE.LightingModelDirectInput & {
        lightDirection: THREE.Node;
        lightColor: THREE.Node;
    }): void;
    indirect(builderOrContext: THREE.NodeBuilder | THREE.LightingContext): void;
    indirectDiffuse(context: THREE.LightingContext): void;
    indirectSpecular(context: THREE.LightingContext): void;
}
