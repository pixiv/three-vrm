import type * as THREE from 'three';
/**
 * An interface represents a single human bone of a VRM.
 */
export interface VRMHumanBone {
    /**
     * A glTF node (that actually is a `THREE.Object3D`) that represents the bone.
     */
    node: THREE.Object3D;
}
