import * as THREE from 'three';
import { VRMSpringBoneLimit } from './VRMSpringBoneLimit';

const SINGULARITY_EPSILON = Math.sqrt(Number.EPSILON);

/**
 * Represents the hinge limit of a spring bone defined in `VRMC_springBone_limit`.
 */
export class VRMSpringBoneLimitHinge extends VRMSpringBoneLimit {
  /**
   * The angle of the hinge limit in radians.
   * If the angle is set to π or greater, the angle will be interpreted as π by the implementation.
   * When the angle is set to π, the hinge shape becomes a full disc.
   */
  public angle: number;

  public constructor(params?: { angle?: number; rotation?: THREE.Quaternion }) {
    super();

    this.angle = THREE.MathUtils.clamp(params?.angle ?? Math.PI, 0.0, Math.PI);
    this.rotation = params?.rotation ?? new THREE.Quaternion();
  }

  public calculateLimit(tailDir: THREE.Vector3): boolean {
    // bring the direction into the local space of the limit
    tailDir.applyQuaternion(this._totalRotationInvCache);

    let isLimited = false;

    const projectedLengthSq = tailDir.y * tailDir.y + tailDir.z * tailDir.z;
    if (projectedLengthSq < SINGULARITY_EPSILON) {
      // The direction is either +X or -X, choose +Y
      isLimited = true;
      tailDir.set(0.0, 1.0, 0.0);
    } else {
      // Map the direction to the YZ plane of the hinge
      if (tailDir.x !== 0.0) {
        isLimited = true;

        const scale = 1.0 / Math.sqrt(projectedLengthSq);
        tailDir.set(0.0, tailDir.y * scale, tailDir.z * scale);
      }

      // Assume that `angle` is within [0, π]
      const cosLimitAngle = Math.cos(this.angle);
      if (tailDir.y < cosLimitAngle) {
        isLimited = true;

        const sinLimitAngle = Math.sqrt(1.0 - cosLimitAngle * cosLimitAngle);

        // When the direction is -Y, choose the +Z side
        const zSign = tailDir.z < 0.0 ? -1.0 : 1.0;
        tailDir.y = cosLimitAngle;
        tailDir.z = sinLimitAngle * zSign;
      }
    }

    // change the direction back to the world space
    tailDir.applyQuaternion(this._totalRotationCache);

    return isLimited;
  }
}
