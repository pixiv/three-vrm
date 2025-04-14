/**
 * A limit that restricts the orientation of the spring in a spherical coordinate shape.
 */
export interface SpringBoneLimitLimitSpherical {
  /**
   * The theta angle of the spherical limit in radians. If the theta angle is set to π or greater, the angle will be interpreted as π by the implementation.
   */
  theta: number;

  /**
   * The phi angle of the spherical limit in radians. If the phi angle is set to π/2 or greater, the angle will be interpreted as π/2 by the implementation.
   */
  phi: number;

  /**
   * The rotation from the default orientation of the spherical limit. The rotation is represented as a quaternion (x, y, z, w), where w is the scalar.
   */
  rotation?: [number, number, number, number];

  extensions?: { [name: string]: any };
  extras?: any;
}
