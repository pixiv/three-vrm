export interface SpringBoneExtendedColliderShapeSphere {
  /**
   * The offset of the sphere from the origin in local space.
   */
  offset?: [number, number, number];

  /**
   * The radius of the sphere.
   */
  radius?: number;

  /**
   * If true, the collider prevents spring bones from going outside of the sphere instead.
   */
  inside?: boolean;
}
