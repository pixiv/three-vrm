import * as THREE from 'three';
import type { VRMSpringBoneColliderShape } from './VRMSpringBoneColliderShape';
/**
 * Represents a collider of a spring bone.
 */
export declare class VRMSpringBoneCollider extends THREE.Object3D {
    /**
     * The shape of the collider.
     */
    readonly shape: VRMSpringBoneColliderShape;
    /**
     * World space matrix for the collider shape used in collision calculations.
     */
    readonly colliderMatrix: THREE.Matrix4;
    constructor(shape: VRMSpringBoneColliderShape);
    updateWorldMatrix(updateParents: boolean, updateChildren: boolean): void;
}
