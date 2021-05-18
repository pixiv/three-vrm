import type { NodeColliderSphere } from './SpringBoneColliderSphere';
import type { NodeColliderCapsule } from './SpringBoneColliderCapsule';

/**
 * Shape of collider. Have one of sphere and capsule
 */
export interface NodeColliderShape {
  sphere?: NodeColliderSphere;
  capsule?: NodeColliderCapsule;
}
