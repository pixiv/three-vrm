import type { SpringBoneColliderShape } from './SpringBoneColliderShape';

/**
 * collider definition for SpringBone
 */
export interface SpringBoneCollider {
  node?: number;

  shapes?: SpringBoneColliderShape;

  extensions?: { [key: string]: { [key: string]: any } };
  extras?: any;
}
