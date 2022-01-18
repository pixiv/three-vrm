import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRMMeta } from './VRMMeta';
import { VRMMetaImporterOptions } from './VRMMetaImporterOptions';
/**
 * An importer that imports a {@link VRMMeta} from a VRM extension of a GLTF.
 */
export declare class VRMMetaImporter {
    /**
     * If `true`, it won't load its thumbnail texture ({@link VRMMeta.texture}). `false` by default.
     */
    ignoreTexture: boolean;
    constructor(options?: VRMMetaImporterOptions);
    import(gltf: GLTF): Promise<VRMMeta | null>;
}
