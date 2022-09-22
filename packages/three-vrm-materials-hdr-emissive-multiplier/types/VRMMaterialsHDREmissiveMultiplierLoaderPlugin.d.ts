import { GLTFLoaderPlugin, GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader.js';
export declare class VRMMaterialsHDREmissiveMultiplierLoaderPlugin implements GLTFLoaderPlugin {
    static EXTENSION_NAME: "VRMC_materials_hdr_emissiveMultiplier";
    readonly parser: GLTFParser;
    get name(): string;
    constructor(parser: GLTFParser);
    extendMaterialParams(materialIndex: number, materialParams: {
        [key: string]: any;
    }): Promise<void>;
    private _getHDREmissiveMultiplierExtension;
}
