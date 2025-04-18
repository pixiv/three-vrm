import * as THREE from 'three';
import { VRMSpringBoneLimit } from './VRMSpringBoneLimit';

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

    this.angle = params?.angle ?? Math.PI;
    this.rotation = params?.rotation ?? new THREE.Quaternion();
  }

  public calculateLimit(tailDir: THREE.Vector3): boolean {
    // bring the direction into the local space of the limit
    tailDir.applyQuaternion(this._totalRotationInvCache);

    // kill the x component and normalize the direction
    let isLimited = false;
    if (tailDir.x !== 0.0) {
      tailDir.x = 0.0;
      tailDir.normalize();
    }

    // compare the y component with the cos of the angle
    const cosAngle = Math.cos(this.angle);

    if (tailDir.y < cosAngle) {
      // now we have to apply the limit
      isLimited = true;

      // multiply the z component by the ratio of the sins of the angles
      const ratio = Math.sqrt((1.0 - cosAngle * cosAngle) / (1.0 - tailDir.y * tailDir.y));
      tailDir.z *= ratio;

      // set the y component to the cos of the angle
      tailDir.y = cosAngle;
    }

    // change the direction back to the world space
    tailDir.applyQuaternion(this._totalRotationCache);

    return isLimited;
  }
}
