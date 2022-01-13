import { GLTF, GLTFLoaderPlugin, GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader';
/**
 * A plugin of GLTFLoader that imports a {@link VRMHumanoid} from a VRM extension of a GLTF.
 */
export declare class VRMHumanoidLoaderPlugin implements GLTFLoaderPlugin {
    readonly parser: GLTFParser;
    readonly name: string;
    constructor(parser: GLTFParser);
    afterRoot(gltf: GLTF): Promise<void>;
    /**
     * Import a {@link VRMHumanoid} from a VRM.
     *
     * @param gltf A parsed result of GLTF taken from GLTFLoader
     */
    private _import;
    private _v1Import;
    private _v0Import;
    /**
     * Ensure required bones exist in given human bones.
     * @param humanBones Human bones
     * @returns Human bones, no longer partial!
     */
    private _ensureRequiredBonesExist;
}
