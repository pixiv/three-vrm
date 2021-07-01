export interface VRMSpringBoneLoaderPluginOptions {
  /**
   * Specify an Object3D to add {@link VRMSpringBoneJointHelper} s.
   * If not specified, helper will not be created.
   */
  jointHelperRoot?: THREE.Object3D;

  /**
   * Specify an Object3D to add {@link VRMSpringBoneColliderHelper} s.
   * If not specified, helper will not be created.
   */
  colliderHelperRoot?: THREE.Object3D;
}
