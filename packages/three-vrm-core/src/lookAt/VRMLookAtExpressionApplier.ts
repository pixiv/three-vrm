import { VRMExpressionManager } from '../expressions';
import * as THREE from 'three';
import type { VRMLookAtApplier } from './VRMLookAtApplier';
import { VRMLookAtRangeMap } from './VRMLookAtRangeMap';

/**
 * A class that applies eye gaze directions to a VRM.
 * It will be used by {@link VRMLookAt}.
 */
export class VRMLookAtExpressionApplier implements VRMLookAtApplier {
  /**
   * Represent its type of applier.
   */
  public static readonly type = 'expression';

  /**
   * Its associated {@link VRMExpressionManager}.
   */
  public readonly expressions: VRMExpressionManager;

  /**
   * It won't be used in expression applier.
   * See also: {@link rangeMapHorizontalOuter}
   */
  public rangeMapHorizontalInner: VRMLookAtRangeMap;

  /**
   * A {@link VRMLookAtRangeMap} for horizontal movement. Both eyes move left or right.
   */
  public rangeMapHorizontalOuter: VRMLookAtRangeMap;

  /**
   * A {@link VRMLookAtRangeMap} for vertical downward movement. Both eyes move upwards.
   */
  public rangeMapVerticalDown: VRMLookAtRangeMap;

  /**
   * A {@link VRMLookAtRangeMap} for vertical upward movement. Both eyes move downwards.
   */
  public rangeMapVerticalUp: VRMLookAtRangeMap;

  /**
   * Create a new {@link VRMLookAtExpressionApplier}.
   *
   * @param expressions A {@link VRMExpressionManager}
   * @param rangeMapHorizontalInner A {@link VRMLookAtRangeMap} used for inner transverse direction
   * @param rangeMapHorizontalOuter A {@link VRMLookAtRangeMap} used for outer transverse direction
   * @param rangeMapVerticalDown A {@link VRMLookAtRangeMap} used for down direction
   * @param rangeMapVerticalUp A {@link VRMLookAtRangeMap} used for up direction
   */
  public constructor(
    expressions: VRMExpressionManager,
    rangeMapHorizontalInner: VRMLookAtRangeMap,
    rangeMapHorizontalOuter: VRMLookAtRangeMap,
    rangeMapVerticalDown: VRMLookAtRangeMap,
    rangeMapVerticalUp: VRMLookAtRangeMap,
  ) {
    this.expressions = expressions;

    this.rangeMapHorizontalInner = rangeMapHorizontalInner;
    this.rangeMapHorizontalOuter = rangeMapHorizontalOuter;
    this.rangeMapVerticalDown = rangeMapVerticalDown;
    this.rangeMapVerticalUp = rangeMapVerticalUp;
  }

  /**
   * Apply the input angle to its associated VRM model.
   *
   * @param angle An input angle
   */
  public lookAt(angle: THREE.Euler): void {
    const srcX = (angle.x * 180.0) / Math.PI;
    const srcY = (angle.y * 180.0) / Math.PI;

    if (srcX < 0.0) {
      this.expressions.setValue('lookUp', 0.0);
      this.expressions.setValue('lookDown', this.rangeMapVerticalDown.map(-srcX));
    } else {
      this.expressions.setValue('lookDown', 0.0);
      this.expressions.setValue('lookUp', this.rangeMapVerticalUp.map(srcX));
    }

    if (srcY < 0.0) {
      this.expressions.setValue('lookLeft', 0.0);
      this.expressions.setValue('lookRight', this.rangeMapHorizontalOuter.map(-srcY));
    } else {
      this.expressions.setValue('lookRight', 0.0);
      this.expressions.setValue('lookLeft', this.rangeMapHorizontalOuter.map(srcY));
    }
  }
}
