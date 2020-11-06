import type { LookAtRangeMap } from './LookAtRangeMap';

/**
 * Eye gaze control
 */
export interface LookAt {
  /**
   * The origin of LookAt. Position offset from the head bone
   */
  offsetFromHeadBone?: number[];

  lookAtType?: 'bone' | 'blendShape';

  /**
   * Horizontal inward movement. The left eye moves right. The right eye moves left.
   */
  lookAtHorizontalInner?: LookAtRangeMap;

  /**
   * Horizontal outward movement. The left eye moves left. The right eye moves right.
   */
  lookAtHorizontalOuter?: LookAtRangeMap;

  /**
   * Vertical downward movement. Both eyes move upwards
   */
  lookAtVerticalDown?: LookAtRangeMap;

  /**
   * Vertical upward movement. Both eyes move downwards
   */
  lookAtVerticalUp?: LookAtRangeMap;
}
