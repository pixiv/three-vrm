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
   * @param yaw Rotation around Y axis, in degree
   * @param pitch Rotation around X axis, in degree
   */
  public apply(yaw: number, pitch: number): void {
    const leftEye = this.humanoid.getBoneNode('leftEye');
    const rightEye = this.humanoid.getBoneNode('rightEye');

    // left
    if (leftEye) {
      if (pitch < 0.0) {
        _eulerA.x = -THREE.MathUtils.DEG2RAD * this.rangeMapVerticalDown.map(-pitch);
      } else {
        _eulerA.x = THREE.MathUtils.DEG2RAD * this.rangeMapVerticalUp.map(pitch);
      }

      if (yaw < 0.0) {
        _eulerA.y = -THREE.MathUtils.DEG2RAD * this.rangeMapHorizontalInner.map(-yaw);
      } else {
        _eulerA.y = THREE.MathUtils.DEG2RAD * this.rangeMapHorizontalOuter.map(yaw);
      }

      leftEye.quaternion.setFromEuler(_eulerA);
    }

    // right
    if (rightEye) {
      if (pitch < 0.0) {
        _eulerA.x = -THREE.MathUtils.DEG2RAD * this.rangeMapVerticalDown.map(-pitch);
      } else {
        _eulerA.x = THREE.MathUtils.DEG2RAD * this.rangeMapVerticalUp.map(pitch);
      }

      if (yaw < 0.0) {
        _eulerA.y = -THREE.MathUtils.DEG2RAD * this.rangeMapHorizontalOuter.map(-yaw);
      } else {
        _eulerA.y = THREE.MathUtils.DEG2RAD * this.rangeMapHorizontalInner.map(yaw);
      }

      rightEye.quaternion.setFromEuler(_eulerA);
    }
  }

  /**
   * @deprecated Use {@link apply} instead.
   */
  public lookAt(euler: THREE.Euler): void {
    const yaw = THREE.MathUtils.RAD2DEG * euler.y;
    const pitch = THREE.MathUtils.RAD2DEG * euler.x;

    this.apply(yaw, pitch);
  }
}
