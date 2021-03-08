import type { NodeColliderSphere } from './NodeColliderSphere';
import type { NodeColliderCapsule } from './NodeColliderCapsule';

/**
 * Shape of collider. Have one of sphere and capsule
 */
export interface NodeColliderShape {
  sphere?: NodeColliderSphere;
  capsule?: NodeColliderCapsule;
}
