export interface SpringBoneExtendedColliderShapePlane {
  /**
   * The offset of the plane from the origin in local space.
   */
  offset?: [number, number, number];

  /**
   * The normal of the plane in local space. Must be normalized.
   */
  normal?: [number, number, number];
}
