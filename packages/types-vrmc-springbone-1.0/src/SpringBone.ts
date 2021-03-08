import type { SpringBoneSpring } from './SpringBoneSpring';

/**
 * SpringBone makes objects such as costumes and hair swaying
 */
export interface SpringBone {
  /**
   * An array of springs.
   */
  springs?: SpringBoneSpring[];

  extensions?: { [name: string]: any };
  extras?: any;
}
