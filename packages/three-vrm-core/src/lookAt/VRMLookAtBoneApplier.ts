import { VRMHumanoid } from '../humanoid';
import * as THREE from 'three';
import { VRMLookAtApplier } from './VRMLookAtApplier';
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
  public static readonly lookAtType = 'bone';

  /**
   * Its associated {@link VRMHumanoid}.
   */
  public readonly humanoid: VRMHumanoid;

  /**
   * A {@link VRMLookAtRangeMap} for horizontal inward movement. The left eye moves right. The right eye moves left.
   */
  public lookAtHorizontalInner: VRMLookAtRangeMap;

  /**
   * A {@link VRMLookAtRangeMap} for horizontal outward movement. The left eye moves left. The right eye moves right.
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
   * Create a new {@link VRMLookAtBoneApplier}.
   *
   * @param humanoid A {@link VRMHumanoid}
   * @param lookAtHorizontalInner A {@link VRMLookAtRangeMap} used for inner transverse direction
   * @param lookAtHorizontalOuter A {@link VRMLookAtRangeMap} used for outer transverse direction
   * @param lookAtVerticalDown A {@link VRMLookAtRangeMap} used for down direction
   * @param lookAtVerticalUp A {@link VRMLookAtRangeMap} used for up direction
   */
  public constructor(
    humanoid: VRMHumanoid,
    lookAtHorizontalInner: VRMLookAtRangeMap,
    lookAtHorizontalOuter: VRMLookAtRangeMap,
    lookAtVerticalDown: VRMLookAtRangeMap,
    lookAtVerticalUp: VRMLookAtRangeMap,
  ) {
    this.humanoid = humanoid;

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

    const leftEye = this.humanoid.getBoneNode('leftEye');
    const rightEye = this.humanoid.getBoneNode('rightEye');

    // left
    if (leftEye) {
      if (srcX < 0.0) {
        _eulerA.x = (-this.lookAtVerticalDown.map(-srcX) / 180.0) * Math.PI;
      } else {
        _eulerA.x = (this.lookAtVerticalUp.map(srcX) / 180.0) * Math.PI;
      }

      if (srcY < 0.0) {
        _eulerA.y = (-this.lookAtHorizontalInner.map(-srcY) / 180.0) * Math.PI;
      } else {
        _eulerA.y = (this.lookAtHorizontalOuter.map(srcY) / 180.0) * Math.PI;
      }

      leftEye.quaternion.setFromEuler(_eulerA);
    }

    // right
    if (rightEye) {
      if (srcX < 0.0) {
        _eulerA.x = (-this.lookAtVerticalDown.map(-srcX) / 180.0) * Math.PI;
      } else {
        _eulerA.x = (this.lookAtVerticalUp.map(srcX) / 180.0) * Math.PI;
      }

      if (srcY < 0.0) {
        _eulerA.y = (-this.lookAtHorizontalOuter.map(-srcY) / 180.0) * Math.PI;
      } else {
        _eulerA.y = (this.lookAtHorizontalInner.map(srcY) / 180.0) * Math.PI;
      }

      rightEye.quaternion.setFromEuler(_eulerA);
    }
  }
}
