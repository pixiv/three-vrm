import type { LookAtRangeMap } from './LookAtRangeMap';

/**
 * Eye gaze control
 */
export interface LookAt {
  /**
   * The origin of LookAt. Position offset from the head bone
   */
  offsetFromHeadBone?: number[];

  type?: 'bone' | 'expression';

  /**
   * Horizontal inward movement. The left eye moves right. The right eye moves left.
   */
  rangeMapHorizontalInner?: LookAtRangeMap;

  /**
   * Horizontal outward movement. The left eye moves left. The right eye moves right.
   */
  rangeMapHorizontalOuter?: LookAtRangeMap;

  /**
   * Vertical downward movement. Both eyes move upwards
   */
  rangeMapVerticalDown?: LookAtRangeMap;

  /**
   * Vertical upward movement. Both eyes move downwards
   */
  rangeMapVerticalUp?: LookAtRangeMap;

  extensions?: { [name: string]: any };
  extras?: any;
}
