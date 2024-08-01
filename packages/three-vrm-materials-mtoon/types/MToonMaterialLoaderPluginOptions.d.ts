import type * as THREE from 'three';
import type { MToonMaterialDebugMode } from './MToonMaterialDebugMode';
export interface MToonMaterialLoaderPluginOptions {
    /**
     * The type of the material that the loader plugin will generate.
     *
     * If you are using this plugin with WebGPU, set this to {@link MToonNodeMaterial}.
     *
     * @default MToonMaterial
     */
    materialType?: typeof THREE.Material;
    /**
     * This value will be added to `renderOrder` of every meshes who have MToonMaterial.
     * The final `renderOrder` will be sum of this `renderOrderOffset` and `renderQueueOffsetNumber` for each materials.
     *
     * @default 0
     */
    renderOrderOffset?: number;
    /**
     * There is a line of the shader called "comment out if you want to PBR absolutely" in VRM0.0 MToon.
     * When this is true, the material enables the line to make it compatible with the legacy rendering of VRM.
     * Usually not recommended to turn this on.
     *
     * @default false
     */
    v0CompatShade?: boolean;
    /**
     * Debug mode for the material.
     * You can visualize several components for diagnosis using debug mode.
     *
     * See: {@link MToonMaterialDebugMode}
     *
     * @default 'none'
     */
    debugMode?: MToonMaterialDebugMode;
}
