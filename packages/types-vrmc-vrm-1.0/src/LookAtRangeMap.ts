/**
 * Horizontal inward movement. The left eye moves right. The right eye moves left.
 */
export interface LookAtRangeMap {
  /**
   * Yaw and pitch angles  ( degrees )  between the head bone forward vector and the eye gaze LookAt vector
   */
  inputMaxValue?: number;

  /**
   * Degree for LookAtType.bone ,  Weight for LookAtType.blendShape
   */
  outputScale?: number;
}
