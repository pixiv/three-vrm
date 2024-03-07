import type * as THREE from 'three';
export interface VRMLookAtLoaderPluginOptions {
    /**
     * Specify an Object3D to add {@link VRMLookAtHelper} s.
     * If not specified, helper will not be created.
     * If `renderOrder` is set to the root, helpers will copy the same `renderOrder` .
     */
    helperRoot?: THREE.Object3D;
}
