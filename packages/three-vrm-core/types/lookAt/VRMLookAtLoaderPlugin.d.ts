import type { GLTF, GLTFLoaderPlugin, GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader';
import type { VRMLookAtLoaderPluginOptions } from './VRMLookAtLoaderPluginOptions';
/**
 * A plugin of GLTFLoader that imports a {@link VRMLookAt} from a VRM extension of a GLTF.
 */
export declare class VRMLookAtLoaderPlugin implements GLTFLoaderPlugin {
    /**
     * Specify an Object3D to add {@link VRMLookAtHelper} s.
     * If not specified, helper will not be created.
     * If `renderOrder` is set to the root, helpers will copy the same `renderOrder` .
     */
    helperRoot?: THREE.Object3D;
    readonly parser: GLTFParser;
    get name(): string;
    constructor(parser: GLTFParser, options?: VRMLookAtLoaderPluginOptions);
    afterRoot(gltf: GLTF): Promise<void>;
    /**
     * Import a {@link VRMLookAt} from a VRM.
     *
     * @param gltf A parsed result of GLTF taken from GLTFLoader
     * @param humanoid A {@link VRMHumanoid} instance that represents the VRM
     * @param expressions A {@link VRMExpressionManager} instance that represents the VRM
     */
    private _import;
    private _v1Import;
    private _v1ImportRangeMap;
    private _v0Import;
    private _v0ImportDegreeMap;
    private _importLookAt;
}
