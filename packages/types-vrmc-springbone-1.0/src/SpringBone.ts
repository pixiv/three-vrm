import type { SpringBoneSetting } from './SpringBoneSetting';
import type { SpringBoneSpring } from './SpringBoneSpring';

/**
 * SpringBone makes objects such as costumes and hair swaying
 */
export interface SpringBone {
  /**
   * An array of settings.
   */
  settings?: SpringBoneSetting[];

  /**
   * An array of springs.
   */
  springs?: SpringBoneSpring[];
}
