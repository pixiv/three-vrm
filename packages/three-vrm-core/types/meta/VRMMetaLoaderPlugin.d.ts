import type { GLTF, GLTFLoaderPlugin, GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { VRMMetaLoaderPluginOptions } from './VRMMetaLoaderPluginOptions';
/**
 * A plugin of GLTFLoader that imports a {@link VRM1Meta} from a VRM extension of a GLTF.
 */
export declare class VRMMetaLoaderPlugin implements GLTFLoaderPlugin {
    readonly parser: GLTFParser;
    /**
     * If `false`, it won't load its thumbnail image ({@link VRM1Meta.thumbnailImage}).
     * `false` by default.
     */
    needThumbnailImage: boolean;
    /**
     * A list of license urls.
     * This meta loader will accept these `licenseUrl`s.
     * Otherwise it won't be loaded.
     */
    acceptLicenseUrls: string[];
    /**
     * Whether it should accept VRM0.0 meta or not.
     * Note that it might load {@link VRM0Meta} instead of {@link VRM1Meta} when this is `true`.
     * `true` by default.
     */
    acceptV0Meta: boolean;
    get name(): string;
    constructor(parser: GLTFParser, options?: VRMMetaLoaderPluginOptions);
    afterRoot(gltf: GLTF): Promise<void>;
    private _import;
    private _v1Import;
    private _v0Import;
    private _extractGLTFImage;
}
