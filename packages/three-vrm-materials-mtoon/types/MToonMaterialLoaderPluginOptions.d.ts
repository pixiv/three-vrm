import type { MToonMaterialDebugMode } from './MToonMaterialDebugMode';
export interface MToonMaterialLoaderPluginOptions {
    /**
     * This value will be added to every meshes who have MaterialsMToon.
     * The final renderOrder will be sum of this `renderOrderOffset` and `renderQueueOffsetNumber` for each materials.
     * `0` by default.
     */
    renderOrderOffset?: number;
    /**
     * There is a line of the shader called "comment out if you want to PBR absolutely" in VRM0.0 MToon.
     * When this is true, the material enables the line to make it compatible with the legacy rendering of VRM.
     * Usually not recommended to turn this on.
     * `false` by default.
     */
    v0CompatShade?: boolean;
    /**
     * Debug mode for the material.
     * You can visualize several components for diagnosis using debug mode.
     *
     * See: {@link MToonMaterialDebugMode}
     */
    debugMode?: MToonMaterialDebugMode;
}
