export interface VRMAnimationLoaderPluginOptions {
    /**
     * Specify a desired frame rate in case if the animation need to be baked.
     * Animation bake occurs when the lookAt target is not a direct child of the root.
     */
    bakeFrameRate?: number;
}
