import type { Vector3 } from './Vector3';

export interface SecondaryAnimationCollider {
  /**
   * The local coordinate from the node of the collider group.
   */
  offset?: Vector3;

  /**
   * The radius of the collider.
   */
  radius?: number;
}
