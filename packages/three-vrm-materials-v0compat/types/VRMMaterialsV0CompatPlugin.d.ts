import type { GLTFLoaderPlugin, GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader';
export declare class VRMMaterialsV0CompatPlugin implements GLTFLoaderPlugin {
    readonly parser: GLTFParser;
    get name(): string;
    constructor(parser: GLTFParser);
    beforeRoot(): Promise<void>;
    private _parseV0MToonProperties;
    private _parseV0UnlitProperties;
    /**
     * Create a glTF `KHR_texture_transform` extension from v0 texture transform info.
     */
    private _portTextureTransform;
    /**
     * Convert v0 render order into v1 render order.
     */
    private _v0ParseRenderQueue;
}
