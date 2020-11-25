/**
 * A bone group of VRMCSpringBone.
 */
export interface SpringBoneSpring {
  /**
   * Name of the Spring
   */
  name?: string;

  /**
   * The index of spring settings
   */
  setting: number;

  /**
   * The node index of spring root
   */
  springRoot: number;

  /**
   * The radius of spring sphere
   */
  hitRadius: number;

  /**
   * Colliders that detect collision with nodes start from springRoot
   */
  colliders?: number[];
}
