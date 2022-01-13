import { GLTF, GLTFLoaderPlugin, GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader';
export declare class VRMMaterialsHDREmissiveMultiplierLoaderPlugin implements GLTFLoaderPlugin {
    static EXTENSION_NAME: "VRMC_materials_hdr_emissiveMultiplier";
    readonly parser: GLTFParser;
    readonly name: string;
    constructor(parser: GLTFParser);
    afterRoot(gltf: GLTF): Promise<void>;
    private _getHDREmissiveMultiplierExtension;
}
