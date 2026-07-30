import * as THREE from 'three';
import { VRMSpringBoneLimit } from './VRMSpringBoneLimit';

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

    // limit the angles
    let isLimited = false;
    let pitch = Math.atan2(tailDir.z, tailDir.y);
    let yaw = Math.asin(tailDir.x);

    // Assume that `pitch` is within [0, π]
    if (Math.abs(pitch) > this.pitch) {
      isLimited = true;
      pitch = this.pitch * Math.sign(pitch);
    }

    // Assume that `yaw` is within [0, π/2]
    if (Math.abs(yaw) > this.yaw) {
      isLimited = true;
      yaw = this.yaw * Math.sign(yaw);
    }

    // if the angles are limited, we have to recalculate the direction
    if (isLimited) {
      const cosYaw = Math.cos(yaw);
      const sinYaw = Math.sin(yaw);

      tailDir.set(sinYaw, cosYaw * Math.cos(pitch), cosYaw * Math.sin(pitch));
    }

    // change the direction back to the world space
    tailDir.applyQuaternion(this._totalRotationCache);

    return isLimited;
  }
}
