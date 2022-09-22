import type { GLTFLoaderPlugin, GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader.js';
export declare class VRMMaterialsV0CompatPlugin implements GLTFLoaderPlugin {
    readonly parser: GLTFParser;
    /**
     * A map from v0 render queue to v1 render queue offset, for Transparent materials.
     */
    private readonly _renderQueueMapTransparent;
    /**
     * A map from v0 render queue to v1 render queue offset, for TransparentZWrite materials.
     */
    private readonly _renderQueueMapTransparentZWrite;
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
     * This uses a map from v0 render queue to v1 compliant render queue offset which is generated in {@link _populateRenderQueueMap}.
     */
    private _v0ParseRenderQueue;
    /**
     * Create a map which maps v0 render queue to v1 compliant render queue offset.
     * This lists up all render queues the model use and creates a map to new render queue offsets in the same order.
     */
    private _populateRenderQueueMap;
}
