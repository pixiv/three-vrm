import type * as V0VRM from '@pixiv/types-vrm-0.0';
import { GLTF, GLTFLoaderPlugin, GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRMExpressionPresetName } from './VRMExpressionPresetName';
/**
 * A plugin of GLTFLoader that imports a {@link VRMExpressionManager} from a VRM extension of a GLTF.
 */
export declare class VRMExpressionLoaderPlugin implements GLTFLoaderPlugin {
    static readonly v0v1PresetNameMap: {
        [v0Name in V0VRM.BlendShapePresetName]?: VRMExpressionPresetName;
    };
    readonly parser: GLTFParser;
    get name(): string;
    constructor(parser: GLTFParser);
    afterRoot(gltf: GLTF): Promise<void>;
    /**
     * Import a {@link VRMExpressionManager} from a VRM.
     *
     * @param gltf A parsed result of GLTF taken from GLTFLoader
     */
    private _import;
    private _v1Import;
    private _v0Import;
}
