import { VRMHumanoid } from '../humanoid';
import * as THREE from 'three';
import type { VRMLookAtApplier } from './VRMLookAtApplier';
import { VRMLookAtRangeMap } from './VRMLookAtRangeMap';

const _eulerA = new THREE.Euler(0.0, 0.0, 0.0, 'YXZ');

/**
 * A class that applies eye gaze directions to a VRM.
 * It will be used by {@link VRMLookAt}.
 */
export class VRMLookAtBoneApplier implements VRMLookAtApplier {
  /**
   * Represent its type of applier.
   */
  public static readonly type = 'bone';

  /**
   * Its associated {@link VRMHumanoid}.
   */
  public readonly humanoid: VRMHumanoid;

  /**
   * A {@link VRMLookAtRangeMap} for horizontal inward movement. The left eye moves right. The right eye moves left.
   */
  public rangeMapHorizontalInner: VRMLookAtRangeMap;

  /**
   * A {@link VRMLookAtRangeMap} for horizontal outward movement. The left eye moves left. The right eye moves right.
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
   * Create a new {@link VRMLookAtBoneApplier}.
   *
   * @param humanoid A {@link VRMHumanoid}
   * @param rangeMapHorizontalInner A {@link VRMLookAtRangeMap} used for inner transverse direction
   * @param rangeMapHorizontalOuter A {@link VRMLookAtRangeMap} used for outer transverse direction
   * @param rangeMapVerticalDown A {@link VRMLookAtRangeMap} used for down direction
   * @param rangeMapVerticalUp A {@link VRMLookAtRangeMap} used for up direction
   */
  public constructor(
    humanoid: VRMHumanoid,
    rangeMapHorizontalInner: VRMLookAtRangeMap,
    rangeMapHorizontalOuter: VRMLookAtRangeMap,
    rangeMapVerticalDown: VRMLookAtRangeMap,
    rangeMapVerticalUp: VRMLookAtRangeMap,
  ) {
    this.humanoid = humanoid;

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
    const srcX = THREE.MathUtils.RAD2DEG * angle.x;
    const srcY = THREE.MathUtils.RAD2DEG * angle.y;

    const leftEye = this.humanoid.getBoneNode('leftEye');
    const rightEye = this.humanoid.getBoneNode('rightEye');

    // left
    if (leftEye) {
      if (srcX < 0.0) {
        _eulerA.x = -THREE.MathUtils.DEG2RAD * this.rangeMapVerticalDown.map(-srcX);
      } else {
        _eulerA.x = THREE.MathUtils.DEG2RAD * this.rangeMapVerticalUp.map(srcX);
      }

      if (srcY < 0.0) {
        _eulerA.y = -THREE.MathUtils.DEG2RAD * this.rangeMapHorizontalInner.map(-srcY);
      } else {
        _eulerA.y = THREE.MathUtils.DEG2RAD * this.rangeMapHorizontalOuter.map(srcY);
      }

      leftEye.quaternion.setFromEuler(_eulerA);
    }

    // right
    if (rightEye) {
      if (srcX < 0.0) {
        _eulerA.x = -THREE.MathUtils.DEG2RAD * this.rangeMapVerticalDown.map(-srcX);
      } else {
        _eulerA.x = THREE.MathUtils.DEG2RAD * this.rangeMapVerticalUp.map(srcX);
      }

      if (srcY < 0.0) {
        _eulerA.y = -THREE.MathUtils.DEG2RAD * this.rangeMapHorizontalOuter.map(-srcY);
      } else {
        _eulerA.y = THREE.MathUtils.DEG2RAD * this.rangeMapHorizontalInner.map(srcY);
      }

      rightEye.quaternion.setFromEuler(_eulerA);
    }
  }
}
