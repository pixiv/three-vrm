import type { SpringBoneLimitLimit } from './SpringBoneLimitLimit';

/**
 * An angle limit for VRMC_springBone.
 */
export interface VRMCSpringBoneLimit {
  /**
   * Specification version of VRMC_springBone_limit.
   */
  specVersion: '1.0-draft';

  /**
   * Describes a limit apply to the spring.
   */
  limit: SpringBoneLimitLimit;

  extensions?: { [name: string]: any };
  extras?: any;
}
