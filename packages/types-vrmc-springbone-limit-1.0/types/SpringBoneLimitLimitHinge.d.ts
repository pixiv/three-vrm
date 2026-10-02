/**
 * A limit that restricts the orientation of the spring in a hinge shape.
 */
export interface SpringBoneLimitLimitHinge {
  /**
   * The angle of the hinge limit in radians. If the angle is set to π or greater, the angle will be interpreted as π by the implementation. When the angle is set to 180, the hinge shape becomes a full disc.
   */
  angle: number;

  /**
   * The rotation from the default orientation of the hinge limit. The rotation is represented as a quaternion (x, y, z, w), where w is the scalar.
   */
  rotation?: [number, number, number, number];

  extensions?: { [name: string]: any };
  extras?: any;
}
