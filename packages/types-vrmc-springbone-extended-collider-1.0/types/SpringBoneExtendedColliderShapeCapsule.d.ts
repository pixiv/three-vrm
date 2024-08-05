export interface SpringBoneExtendedColliderShapeCapsule {
  /**
   * The offset of the capsule head from the origin in local space.
   */
  offset?: [number, number, number];

  /**
   * The radius of the capsule.
   */
  radius?: number;

  /**
   * The offset of the capsule tail from the origin in local space.
   */
  tail?: [number, number, number];

  /**
   * If true, the collider prevents spring bones from going outside of the capsule instead.
   */
  inside?: boolean;
}
