/**
 * A limit that restricts the orientation of the spring in a spherical coordinate shape.
 */
export interface SpringBoneLimitLimitSpherical {
  /**
   * The pitch angle of the spherical limit in radians. If the pitch angle is set to π or greater, the angle will be interpreted as π by the implementation.
   */
  pitch: number;

  /**
   * The yaw angle of the spherical limit in radians. If the yaw angle is set to π/2 or greater, the angle will be interpreted as π/2 by the implementation.
   */
  yaw: number;

  /**
   * The rotation from the default orientation of the spherical limit. The rotation is represented as a quaternion (x, y, z, w), where w is the scalar.
   */
  rotation?: [number, number, number, number];

  extensions?: { [name: string]: any };
  extras?: any;
}
