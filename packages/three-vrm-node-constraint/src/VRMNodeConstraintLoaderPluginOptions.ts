export interface VRMNodeConstraintLoaderPluginOptions {
  /**
   * Specify an Object3D to add {@link VRMNodeConstraintHelper} s.
   * If not specified, helper will not be created.
   */
  helperRoot?: THREE.Object3D;
}
