import type { SpringBoneExtendedColliderShapeCapsule } from './SpringBoneExtendedColliderShapeCapsule.js';
import type { SpringBoneExtendedColliderShapePlane } from './SpringBoneExtendedColliderShapePlane.js';
import type { SpringBoneExtendedColliderShapeSphere } from './SpringBoneExtendedColliderShapeSphere.js';

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
