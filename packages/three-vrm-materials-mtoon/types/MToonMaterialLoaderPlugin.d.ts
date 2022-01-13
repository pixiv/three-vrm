import * as THREE from 'three';
import type { GLTF, GLTFLoaderPlugin, GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader';
import type { MToonMaterialParameters } from './MToonMaterialParameters';
import { MToonMaterialLoaderPluginOptions } from './MToonMaterialLoaderPluginOptions';
import type { MToonMaterialDebugMode } from './MToonMaterialDebugMode';
export declare class MToonMaterialLoaderPlugin implements GLTFLoaderPlugin {
    static EXTENSION_NAME: string;
    /**
     * This value will be added to `renderOrder` of every meshes who have MaterialsMToon.
     * The final renderOrder will be sum of this `renderOrderOffset` and `renderQueueOffsetNumber` for each materials.
     * `0` by default.
     */
    renderOrderOffset: number;
    /**
     * There is a line of the shader called "comment out if you want to PBR absolutely" in VRM0.0 MToon.
     * When this is true, the material enables the line to make it compatible with the legacy rendering of VRM.
     * Usually not recommended to turn this on.
     * `false` by default.
     */
    v0CompatShade: boolean;
    /**
     * Debug mode for the material.
     * You can visualize several components for diagnosis using debug mode.
     *
     * See: {@link MToonMaterialDebugMode}
     */
    debugMode: MToonMaterialDebugMode;
    readonly parser: GLTFParser;
    /**
     * Loaded materials will be stored in this set.
     * Will be transferred into `gltf.userData.vrmMToonMaterials` in {@link afterRoot}.
     */
    private readonly _mToonMaterialSet;
    get name(): string;
    constructor(parser: GLTFParser, options?: MToonMaterialLoaderPluginOptions);
    beforeRoot(): Promise<void>;
    afterRoot(gltf: GLTF): Promise<void>;
    getMaterialType(materialIndex: number): typeof THREE.Material | null;
    extendMaterialParams(materialIndex: number, materialParams: MToonMaterialParameters): Promise<any> | null;
    loadMesh(meshIndex: number): Promise<THREE.Group | THREE.Mesh | THREE.SkinnedMesh>;
    /**
     * Delete use of `KHR_materials_unlit` from its `materials` if the material is using MToon.
     *
     * Since GLTFLoader have so many hardcoded procedure related to `KHR_materials_unlit`
     * we have to delete the extension before we start to parse the glTF.
     */
    private _removeUnlitExtensionIfMToonExists;
    private _getMToonExtension;
    private _extendMaterialParams;
    /**
     * This will do two processes that is required to render MToon properly.
     *
     * - Set render order
     * - Generate outline
     *
     * @param mesh A target GLTF primitive
     * @param materialIndex The material index of the primitive
     */
    private _setupPrimitive;
    /**
     * Generate outline for the given mesh, if it needs.
     *
     * @param mesh The target mesh
     */
    private _generateOutline;
    private _addToMaterialSet;
    private _parseRenderOrder;
}
