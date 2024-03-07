import type * as THREE from 'three';
import type { GLTF, GLTFLoaderPlugin, GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { VRMHumanoidLoaderPluginOptions } from './VRMHumanoidLoaderPluginOptions';
/**
 * A plugin of GLTFLoader that imports a {@link VRMHumanoid} from a VRM extension of a GLTF.
 */
export declare class VRMHumanoidLoaderPlugin implements GLTFLoaderPlugin {
    /**
     * Specify an Object3D to add {@link VRMHumanoidHelper}.
     * If not specified, helper will not be created.
     * If `renderOrder` is set to the root, the helper will copy the same `renderOrder` .
     */
    helperRoot?: THREE.Object3D;
    autoUpdateHumanBones?: boolean;
    readonly parser: GLTFParser;
    get name(): string;
    constructor(parser: GLTFParser, options?: VRMHumanoidLoaderPluginOptions);
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
