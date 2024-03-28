import type { SpringBoneExtendedColliderShape } from './SpringBoneExtendedColliderShape.js';

/**
 * An extended collider for VRMC_springBone.
 */
export interface VRMCSpringBoneExtendedCollider {
  /**
   * Specification version of VRMC_springBone_extended_collider.
   */
  specVersion: '1.0' | '1.0-beta';

  /**
   * The shape of the collider.
   */
  shape?: SpringBoneExtendedColliderShape;

  extensions?: { [name: string]: any };
  extras?: any;
}
