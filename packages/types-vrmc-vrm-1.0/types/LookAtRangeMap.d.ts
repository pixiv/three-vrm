/**
 * Horizontal inward movement. The left eye moves right. The right eye moves left.
 */
export interface LookAtRangeMap {
  /**
   * Yaw and pitch angles  ( degrees )  between the head bone forward vector and the eye gaze LookAt vector
   */
  inputMaxValue?: number;

  /**
   * Degree for type.bone, Weight for type.expressions
   */
  outputScale?: number;

  extensions?: { [name: string]: any };
  extras?: any;
}
