import * as THREE from 'three/webgpu';
import { ShaderNodeObject } from 'three/tsl';
export declare class MToonAnimatedUVNode extends THREE.TempNode {
    readonly hasMaskTexture: boolean;
    constructor(hasMaskTexture: boolean);
    setup(): ShaderNodeObject<THREE.VarNode>;
}
