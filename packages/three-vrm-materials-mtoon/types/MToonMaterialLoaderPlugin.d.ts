import * as THREE from 'three';
import * as V1MToonSchema from '@pixiv/types-vrmc-materials-mtoon-1.0';
import type { GLTF, GLTFLoaderPlugin, GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { MToonMaterialParameters } from './MToonMaterialParameters';
import type { MToonMaterialLoaderPluginOptions } from './MToonMaterialLoaderPluginOptions';
import type { MToonMaterialDebugMode } from './MToonMaterialDebugMode';
/**
 * A loader plugin of {@link GLTFLoader} for the extension `VRMC_materials_mtoon`.
 *
 * This plugin is for uses with WebGLRenderer by default.
 * To use MToon in WebGPURenderer, set {@link materialType} to {@link MToonNodeMaterial}.
 *
 * @example to use with WebGPURenderer
 * ```js
 * import { MToonMaterialLoaderPlugin } from '@pixiv/three-vrm-materials-mtoon';
 * import { MToonNodeMaterial } from '@pixiv/three-vrm-materials-mtoon/nodes';
 *
 * // ...
 *
 * // Register a MToonMaterialLoaderPlugin with MToonNodeMaterial
 * loader.register((parser) => {
 *
 *   // create a WebGPU compatible MToonMaterialLoaderPlugin
 *   return new MToonMaterialLoaderPlugin(parser, {
 *
 *     // set the material type to MToonNodeMaterial
 *     materialType: MToonNodeMaterial,
 *
 *   });
 *
 * });
 * ```
 */
export declare class MToonMaterialLoaderPlugin implements GLTFLoaderPlugin {
    static EXTENSION_NAME: string;
    /**
     * The type of the material that this plugin will generate.
     *
     * If you are using this plugin with WebGPU, set this to {@link MToonNodeMaterial}.
     *
     * @default MToonMaterial
     */
    materialType: typeof THREE.Material;
    /**
     * This value will be added to `renderOrder` of every meshes who have MaterialsMToon.
     * The final renderOrder will be sum of this `renderOrderOffset` and `renderQueueOffsetNumber` for each materials.
     *
     * @default 0
     */
    renderOrderOffset: number;
    /**
     * There is a line of the shader called "comment out if you want to PBR absolutely" in VRM0.0 MToon.
     * When this is true, the material enables the line to make it compatible with the legacy rendering of VRM.
     * Usually not recommended to turn this on.
     *
     * @default false
     */
    v0CompatShade: boolean;
    /**
     * Debug mode for the material.
     * You can visualize several components for diagnosis using debug mode.
     *
     * See: {@link MToonMaterialDebugMode}
     *
     * @default 'none'
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
    protected _getMToonExtension(materialIndex: number): V1MToonSchema.VRMCMaterialsMToon | undefined;
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
     * Check whether the material should generate outline or not.
     * @param surfaceMaterial The material to check
     * @returns True if the material should generate outline
     */
    private _shouldGenerateOutline;
    /**
     * Generate outline for the given mesh, if it needs.
     *
     * @param mesh The target mesh
     */
    private _generateOutline;
    private _addToMaterialSet;
    private _parseRenderOrder;
}
