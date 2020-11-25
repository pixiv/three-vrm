/**
 * A bone group of VRMCSpringBone.
 */
export interface SpringBoneSetting {
  /**
   * The force to return to the initial pose
   */
  stiffness: number;

  /**
   * Gravitational acceleration
   */
  gravityPower: number;

  /**
   * The direction of gravity. A gravity other than downward direction also works.
   */
  gravityDir?: [number, number, number];

  /**
   * Air resistance. Deceleration force
   */
  dragForce: number;
}
