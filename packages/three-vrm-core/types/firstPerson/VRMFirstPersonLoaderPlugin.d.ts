import type { GLTF, GLTFLoaderPlugin, GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader';
/**
 * A plugin of GLTFLoader that imports a {@link VRMFirstPerson} from a VRM extension of a GLTF.
 */
export declare class VRMFirstPersonLoaderPlugin implements GLTFLoaderPlugin {
    readonly parser: GLTFParser;
    get name(): string;
    constructor(parser: GLTFParser);
    afterRoot(gltf: GLTF): Promise<void>;
    /**
     * Import a {@link VRMFirstPerson} from a VRM.
     *
     * @param gltf A parsed result of GLTF taken from GLTFLoader
     * @param humanoid A {@link VRMHumanoid} instance that represents the VRM
     */
    private _import;
    private _v1Import;
    private _v0Import;
    private _convertV0FlagToV1Type;
}
