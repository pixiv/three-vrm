import { VRMExpressionManager } from '../expressions';
import * as THREE from 'three';
import { VRMLookAtApplier } from './VRMLookAtApplier';
import { VRMLookAtRangeMap } from './VRMLookAtRangeMap';

/**
 * A class that applies eye gaze directions to a VRM.
 * It will be used by {@link VRMLookAt}.
 */
export class VRMLookAtExpressionApplier implements VRMLookAtApplier {
  /**
   * Represent its type of applier.
   */
  public static readonly lookAtType = 'expression';

  /**
   * Its associated {@link VRMExpressionManager}.
   */
  public readonly expressions: VRMExpressionManager;

  /**
   * It won't be used in expression applier.
   * See also: {@link lookAtHorizontalOuter}
   */
  public lookAtHorizontalInner: VRMLookAtRangeMap;

  /**
   * A {@link VRMLookAtRangeMap} for horizontal movement. Both eyes move left or right.
   */
  public lookAtHorizontalOuter: VRMLookAtRangeMap;

  /**
   * A {@link VRMLookAtRangeMap} for vertical downward movement. Both eyes move upwards.
   */
  public lookAtVerticalDown: VRMLookAtRangeMap;

  /**
   * A {@link VRMLookAtRangeMap} for vertical upward movement. Both eyes move downwards.
   */
  public lookAtVerticalUp: VRMLookAtRangeMap;

  /**
   * Create a new {@link VRMLookAtExpressionApplier}.
   *
   * @param expressions A {@link VRMExpressionManager}
   * @param lookAtHorizontalInner A {@link VRMLookAtRangeMap} used for inner transverse direction
   * @param lookAtHorizontalOuter A {@link VRMLookAtRangeMap} used for outer transverse direction
   * @param lookAtVerticalDown A {@link VRMLookAtRangeMap} used for down direction
   * @param lookAtVerticalUp A {@link VRMLookAtRangeMap} used for up direction
   */
  public constructor(
    expressions: VRMExpressionManager,
    lookAtHorizontalInner: VRMLookAtRangeMap,
    lookAtHorizontalOuter: VRMLookAtRangeMap,
    lookAtVerticalDown: VRMLookAtRangeMap,
    lookAtVerticalUp: VRMLookAtRangeMap,
  ) {
    this.expressions = expressions;

    this.lookAtHorizontalInner = lookAtHorizontalInner;
    this.lookAtHorizontalOuter = lookAtHorizontalOuter;
    this.lookAtVerticalDown = lookAtVerticalDown;
    this.lookAtVerticalUp = lookAtVerticalUp;
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
      this.expressions.setValue('lookDown', this.lookAtVerticalDown.map(-srcX));
    } else {
      this.expressions.setValue('lookDown', 0.0);
      this.expressions.setValue('lookUp', this.lookAtVerticalUp.map(srcX));
    }

    if (srcY < 0.0) {
      this.expressions.setValue('lookLeft', 0.0);
      this.expressions.setValue('lookRight', this.lookAtHorizontalOuter.map(-srcY));
    } else {
      this.expressions.setValue('lookRight', 0.0);
      this.expressions.setValue('lookLeft', this.lookAtHorizontalOuter.map(srcY));
    }
  }
}
