export interface MToonNodeMaterialLoaderPluginOptions {
  /**
   * This value will be added to `renderOrder` of every meshes who have MToonNodeMaterial.
   * The final `renderOrder` will be sum of this `renderOrderOffset` and `renderQueueOffsetNumber` for each materials.
   * `0` by default.
   */
  renderOrderOffset?: number;
}
