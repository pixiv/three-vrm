import * as THREE from 'three/webgpu';
export declare class MToonAnimatedUVNode extends THREE.TempNode {
    readonly hasMaskTexture: boolean;
    constructor(hasMaskTexture: boolean);
    setup(): THREE.ShaderNodeObject<THREE.VarNode>;
}
