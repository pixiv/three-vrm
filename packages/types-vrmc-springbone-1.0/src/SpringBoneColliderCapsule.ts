export interface SpringBoneColliderCapsule {
  /**
   * The capsule head. vector3
   */
  offset?: [number, number, number];

  /**
   * The capsule radius
   */
  radius?: number;

  /**
   * The capsule tail. vector3
   */
  tail?: [number, number, number];
}
