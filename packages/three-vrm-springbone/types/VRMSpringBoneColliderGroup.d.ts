import type { VRMSpringBoneCollider } from './VRMSpringBoneCollider';
/**
 * Represents a collider group of a VRM.
 */
export interface VRMSpringBoneColliderGroup {
    /**
     * The colliders of the collider group.
     */
    colliders: VRMSpringBoneCollider[];
    /**
     * The name of the collider.
     */
    name?: string;
}
