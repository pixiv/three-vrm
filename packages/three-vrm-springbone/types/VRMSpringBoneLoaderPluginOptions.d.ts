export interface VRMSpringBoneLoaderPluginOptions {
    /**
     * Specify an Object3D to add {@link VRMSpringBoneJointHelper} s.
     * If not specified, helper will not be created.
     * If `renderOrder` is set to the root, helpers will copy the same `renderOrder` .
     */
    jointHelperRoot?: THREE.Object3D;
    /**
     * Specify an Object3D to add {@link VRMSpringBoneColliderHelper} s.
     * If not specified, helper will not be created.
     * If `renderOrder` is set to the root, helpers will copy the same `renderOrder` .
     */
    colliderHelperRoot?: THREE.Object3D;
}
