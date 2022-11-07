import { VRMHumanoid } from '../humanoid';
import * as THREE from 'three';
import type { VRMLookAtApplier } from './VRMLookAtApplier';
import { VRMLookAtRangeMap } from './VRMLookAtRangeMap';
import { calcAzimuthAltitude } from './utils/calcAzimuthAltitude';
import { getWorldQuaternionLite } from '../utils/getWorldQuaternionLite';

const VEC3_POSITIVE_Z = new THREE.Vector3(0.0, 0.0, 1.0);

const _quatA = new THREE.Quaternion();
const _quatB = new THREE.Quaternion();
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
   * The front direction of the face.
   * Intended to be used for VRM 0.0 compat (VRM 0.0 models are facing Z- instead of Z+).
   * You usually don't want to touch this.
   */
  public faceFront: THREE.Vector3;

  /**
   * The rest quaternion of LeftEye bone.
   */
  private _restQuatLeftEye: THREE.Quaternion;

  /**
   * The rest quaternion of RightEye bone.
   */
  private _restQuatRightEye: THREE.Quaternion;

  /**
   * The world-space rest quaternion of the parent of the humanoid LeftEye.
   */
  private _restLeftEyeParentWorldQuat: THREE.Quaternion;

  /**
   * The world-space rest quaternion of the parent of the humanoid RightEye.
   */
  private _restRightEyeParentWorldQuat: THREE.Quaternion;

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

    this.faceFront = new THREE.Vector3(0.0, 0.0, 1.0);

    // set rest quaternions
    this._restQuatLeftEye = new THREE.Quaternion();
    this._restQuatRightEye = new THREE.Quaternion();
    this._restLeftEyeParentWorldQuat = new THREE.Quaternion();
    this._restRightEyeParentWorldQuat = new THREE.Quaternion();

    const leftEye = this.humanoid.getRawBoneNode('leftEye');
    const rightEye = this.humanoid.getRawBoneNode('rightEye');

    if (leftEye) {
      this._restQuatLeftEye.copy(leftEye.quaternion);
      getWorldQuaternionLite(leftEye.parent!, this._restLeftEyeParentWorldQuat);
    }

    if (rightEye) {
      this._restQuatRightEye.copy(rightEye.quaternion);
      getWorldQuaternionLite(rightEye.parent!, this._restRightEyeParentWorldQuat);
    }
  }

  /**
   * Apply the input angle to its associated VRM model.
   *
   * @param yaw Rotation around Y axis, in degree
   * @param pitch Rotation around X axis, in degree
   */
  public applyYawPitch(yaw: number, pitch: number): void {
    const leftEye = this.humanoid.getRawBoneNode('leftEye');
    const rightEye = this.humanoid.getRawBoneNode('rightEye');
    const leftEyeNormalized = this.humanoid.getNormalizedBoneNode('leftEye');
    const rightEyeNormalized = this.humanoid.getNormalizedBoneNode('rightEye');
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

      _quatA.setFromEuler(_eulerA);
      this._getWorldFaceFrontQuat(_quatB);

      // _quatB * _quatA * _quatB^-1
      // where _quatA is LookAt rotation
      // and _quatB is worldFaceFrontQuat
      leftEyeNormalized!.quaternion.copy(_quatB).multiply(_quatA).multiply(_quatB.invert());

      _quatA.copy(this._restLeftEyeParentWorldQuat);

      // _quatA^-1 * leftEyeNormalized.quaternion * _quatA * restQuatLeftEye
      // where _quatA is restLeftEyeParentWorldQuat
      leftEye.quaternion
        .copy(leftEyeNormalized!.quaternion)
        .multiply(_quatA)
        .premultiply(_quatA.invert())
        .multiply(this._restQuatLeftEye);
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

      _quatA.setFromEuler(_eulerA);
      this._getWorldFaceFrontQuat(_quatB);

      // _quatB * _quatA * _quatB^-1
      // where _quatA is LookAt rotation
      // and _quatB is worldFaceFrontQuat
      rightEyeNormalized!.quaternion.copy(_quatB).multiply(_quatA).multiply(_quatB.invert());

      _quatA.copy(this._restRightEyeParentWorldQuat);

      // _quatA^-1 * rightEyeNormalized.quaternion * _quatA * restQuatRightEye
      // where _quatA is restRightEyeParentWorldQuat
      rightEye.quaternion
        .copy(rightEyeNormalized!.quaternion)
        .multiply(_quatA)
        .premultiply(_quatA.invert())
        .multiply(this._restQuatRightEye);
    }
  }

  /**
   * @deprecated Use {@link applyYawPitch} instead.
   */
  public lookAt(euler: THREE.Euler): void {
    console.warn('VRMLookAtBoneApplier: lookAt() is deprecated. use apply() instead.');

    const yaw = THREE.MathUtils.RAD2DEG * euler.y;
    const pitch = THREE.MathUtils.RAD2DEG * euler.x;

    this.applyYawPitch(yaw, pitch);
  }

  /**
   * Get a quaternion that rotates the world-space +Z unit vector to the {@link faceFront} direction.
   *
   * @param target A target `THREE.Quaternion`
   */
  private _getWorldFaceFrontQuat(target: THREE.Quaternion): THREE.Quaternion {
    if (this.faceFront.distanceToSquared(VEC3_POSITIVE_Z) < 0.01) {
      return target.identity();
    }

    const [faceFrontAzimuth, faceFrontAltitude] = calcAzimuthAltitude(this.faceFront);
    _eulerA.set(0.0, 0.5 * Math.PI + faceFrontAzimuth, faceFrontAltitude, 'YZX');

    return target.setFromEuler(_eulerA);
  }
}
