import type { SpringBoneExtendedColliderShapeCapsule } from './SpringBoneExtendedColliderShapeCapsule';
import type { SpringBoneExtendedColliderShapePlane } from './SpringBoneExtendedColliderShapePlane';
import type { SpringBoneExtendedColliderShapeSphere } from './SpringBoneExtendedColliderShapeSphere';

/**
 * The shape of the collider. One of sphere, capsule, or plane is defined.
 */
export interface SpringBoneExtendedColliderShape {
  sphere?: SpringBoneExtendedColliderShapeSphere;
  capsule?: SpringBoneExtendedColliderShapeCapsule;
  plane?: SpringBoneExtendedColliderShapePlane;

  extensions?: { [name: string]: any };
  extras?: any;
}
