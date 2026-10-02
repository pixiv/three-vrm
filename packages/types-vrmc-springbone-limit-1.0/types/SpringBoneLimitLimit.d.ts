import type { SpringBoneLimitLimitCone } from './SpringBoneLimitLimitCone';
import type { SpringBoneLimitLimitHinge } from './SpringBoneLimitLimitHinge';
import type { SpringBoneLimitLimitSpherical } from './SpringBoneLimitLimitSpherical';

/**
 * Describes a limit apply to the spring. Either cone, hinge, or spherical must be present.
 */
export interface SpringBoneLimitLimit {
  /**
   * A limit that restricts the orientation of the spring in a cone shape.
   */
  cone?: SpringBoneLimitLimitCone;

  /**
   * A limit that restricts the orientation of the spring in a hinge shape.
   */
  hinge?: SpringBoneLimitLimitHinge;

  /**
   * A limit that restricts the orientation of the spring in a spherical coordinate shape.
   */
  spherical?: SpringBoneLimitLimitSpherical;

  extensions?: { [name: string]: any };
  extras?: any;
}
