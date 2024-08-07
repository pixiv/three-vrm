import type { SpringBoneExtendedColliderShape } from './SpringBoneExtendedColliderShape';

/**
 * An extended collider for VRMC_springBone.
 */
export interface VRMCSpringBoneExtendedCollider {
  /**
   * Specification version of VRMC_springBone_extended_collider.
   */
  specVersion: '1.0';

  /**
   * The shape of the collider.
   */
  shape?: SpringBoneExtendedColliderShape;

  extensions?: { [name: string]: any };
  extras?: any;
}
