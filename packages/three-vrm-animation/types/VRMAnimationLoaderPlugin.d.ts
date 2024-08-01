import { GLTF, GLTFLoaderPlugin, GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader.js';
/**
 * A plugin of GLTFLoader that imports {@link VRMAnimation}s from a `VRMC_vrm_animation` extension and gltf animations.
 */
export declare class VRMAnimationLoaderPlugin implements GLTFLoaderPlugin {
    readonly parser: GLTFParser;
    constructor(parser: GLTFParser);
    get name(): string;
    afterRoot(gltf: GLTF): Promise<void>;
    private _createNodeMap;
    private _createBoneWorldMatrixMap;
    private _parseAnimation;
}
