export interface VRMConstraintLoaderPluginOptions {
  /**
   * Specify an Object3D to add {@link VRMConstraintHelper} s.
   * If not specified, helper will not be created.
   */
  helperRoot?: THREE.Object3D;
}
