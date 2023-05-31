/**
 * Specifiers of debug mode of {@link MToonMaterial}.
 *
 * See: {@link MToonMaterial.debugMode}
 */
export declare const MToonMaterialDebugMode: {
    /**
     * Render normally.
     */
    readonly None: "none";
    /**
     * Visualize normals of the surface.
     */
    readonly Normal: "normal";
    /**
     * Visualize lit/shade of the surface.
     */
    readonly LitShadeRate: "litShadeRate";
    /**
     * Visualize UV of the surface.
     */
    readonly UV: "uv";
};
export type MToonMaterialDebugMode = typeof MToonMaterialDebugMode[keyof typeof MToonMaterialDebugMode];
