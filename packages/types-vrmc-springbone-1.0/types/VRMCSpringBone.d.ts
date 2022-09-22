import type { SpringBoneCollider } from './SpringBoneCollider';
import type { SpringBoneColliderGroup } from './SpringBoneColliderGroup';
import type { SpringBoneSpring } from './SpringBoneSpring';
/**
 * SpringBone makes objects such as costumes and hair swaying
 */
export interface VRMCSpringBone {
    /**
     * Specification version of VRMC_springBone
     */
    specVersion: '1.0' | '1.0-beta';
    /**
     * An array of colliders.
     */
    colliders?: SpringBoneCollider[];
    /**
     * An array of collider groups.
     */
    colliderGroups?: SpringBoneColliderGroup[];
    /**
     * An array of springs.
     */
    springs?: SpringBoneSpring[];
    extensions?: {
        [name: string]: any;
    };
    extras?: any;
}
