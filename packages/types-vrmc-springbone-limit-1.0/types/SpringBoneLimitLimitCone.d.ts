/**
 * A limit that restricts the orientation of the spring in a cone shape.
 */
export interface SpringBoneLimitLimitCone {
  /**
   * The angle of the cone limit in radians. If the angle is set to π or greater, the angle will be interpreted as π by the implementation. When the angle is set to π, the cone shape becomes a sphere.
   */
  angle: number;

  /**
   * The rotation from the default orientation of the cone limit. The rotation is represented as a quaternion (x, y, z, w), where w is the scalar.
   */
  rotation?: [number, number, number, number];

  extensions?: { [name: string]: any };
  extras?: any;
}
