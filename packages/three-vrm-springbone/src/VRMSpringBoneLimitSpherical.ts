import * as THREE from 'three';
import { VRMSpringBoneLimit } from './VRMSpringBoneLimit';

const SINGULARITY_EPSILON = Math.sqrt(Number.EPSILON);

/**
 * Represents the spherical limit of a spring bone defined in `VRMC_springBone_limit`.
 */
export class VRMSpringBoneLimitSpherical extends VRMSpringBoneLimit {
  /**
   * The pitch angle of the spherical limit in radians.
   * If the pitch angle is set to π or greater, the angle will be interpreted as π by the implementation.
   */
  public pitch: number;

  /**
   * The yaw angle of the spherical limit in radians.
   * If the yaw angle is set to π/2 or greater, the angle will be interpreted as π/2 by the implementation.
   */
  public yaw: number;

  public constructor(params?: { pitch?: number; yaw?: number; rotation?: THREE.Quaternion }) {
    super();

    this.pitch = THREE.MathUtils.clamp(params?.pitch ?? Math.PI, 0.0, Math.PI);
    this.yaw = THREE.MathUtils.clamp(params?.yaw ?? Math.PI / 2.0, 0.0, Math.PI / 2.0);
    this.rotation = params?.rotation ?? new THREE.Quaternion();
  }

  public calculateLimit(tailDir: THREE.Vector3): boolean {
    // bring the direction into the local space of the limit
    tailDir.applyQuaternion(this._totalRotationInvCache);

    let isLimited = false;

    // calculate the pitch / yaw of the direction
    let pitch: number;
    if (tailDir.y < -1.0 + SINGULARITY_EPSILON) {
      // The direction is -Y, choose the +Z side
      pitch = Math.PI;
    } else if (Math.abs(tailDir.x) > 1.0 - SINGULARITY_EPSILON) {
      // The direction is either +X or -X, choose the +Y side
      pitch = 0.0;
    } else {
      pitch = Math.atan2(tailDir.z, tailDir.y);
    }
    let yaw = Math.asin(THREE.MathUtils.clamp(tailDir.x, -1.0, 1.0));

    // limit the pitch angle
    // Assume that `pitch` is within [0, π]
    if (Math.abs(pitch) > this.pitch) {
      isLimited = true;
      pitch = this.pitch * Math.sign(pitch);
    }

    // limit the yaw angle
    // Assume that `yaw` is within [0, π/2]
    if (Math.abs(yaw) > this.yaw) {
      isLimited = true;
      yaw = this.yaw * Math.sign(yaw);
    }

    // recalculate the direction using the limited pitch / yaw
    const cosYaw = Math.cos(yaw);
    const sinYaw = Math.sin(yaw);
    tailDir.set(sinYaw, cosYaw * Math.cos(pitch), cosYaw * Math.sin(pitch));

    // change the direction back to the world space
    tailDir.applyQuaternion(this._totalRotationCache);

    return isLimited;
  }
}
