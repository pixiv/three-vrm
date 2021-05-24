import type { Vector3 } from './Vector3';

export interface SecondaryAnimationSpring {
  /**
   * Annotation comment
   */
  comment?: string;

  /**
   * The resilience of the swaying object (the power of returning to the initial pose).
   */
  stiffiness?: number;

  /**
   * The strength of gravity.
   */
  gravityPower?: number;

  /**
   * The direction of gravity. Set (0, -1, 0) for simulating the gravity. Set (1, 0, 0) for
   * simulating the wind.
   */
  gravityDir?: Vector3;

  /**
   * The resistance (deceleration) of automatic animation.
   */
  dragForce?: number;

  /**
   * The reference point of a swaying object can be set at any location except the origin.
   * When implementing UI moving with warp, the parent node to move with warp can be specified
   * if you don't want to make the object swaying with warp movement.
   */
  center?: number;

  /**
   * The radius of the sphere used for the collision detection with colliders.
   */
  hitRadius?: number;

  /**
   * Specify the node index of the root bone of the swaying object.
   */
  bones?: number[];

  /**
   * Specify the index of the collider group for collisions with swaying objects.
   */
  colliderGroups?: number[];
}
