import * as THREE from 'three';
import { VRMSpringBoneLimit } from './VRMSpringBoneLimit';

/**
 * Represents the spherical limit of a spring bone defined in `VRMC_springBone_limit`.
 */
export class VRMSpringBoneLimitSpherical extends VRMSpringBoneLimit {
  /**
   * The phi angle of the spherical limit in radians.
   * If the phi angle is set to π or greater, the angle will be interpreted as π by the implementation.
   */
  public phi: number;

  /**
   * The theta angle of the spherical limit in radians.
   * If the theta angle is set to π/2 or greater, the angle will be interpreted as π/2 by the implementation.
   */
  public theta: number;

  public constructor(params?: { phi?: number; theta?: number; rotation?: THREE.Quaternion }) {
    super();

    this.phi = params?.phi ?? Math.PI;
    this.theta = params?.theta ?? Math.PI / 2.0;
    this.rotation = params?.rotation ?? new THREE.Quaternion();
  }

  public calculateLimit(tailDir: THREE.Vector3): boolean {
    // bring the direction into the local space of the limit
    tailDir.applyQuaternion(this._totalRotationInvCache);

    // limit the angles
    let isLimited = false;
    let phi = Math.atan2(tailDir.z, tailDir.y);
    let theta = Math.asin(tailDir.x);

    if (Math.abs(phi) > this.phi) {
      isLimited = true;
      phi = this.phi * Math.sign(phi);
    }

    if (Math.abs(theta) > this.theta) {
      isLimited = true;
      theta = this.theta * Math.sign(theta);
    }

    // if the angles are limited, we have to recalculate the direction
    if (isLimited) {
      const cosTheta = Math.cos(theta);
      const sinTheta = Math.sin(theta);

      tailDir.set(sinTheta, cosTheta * Math.cos(phi), cosTheta * Math.sin(phi));
    }

    // change the direction back to the world space
    tailDir.applyQuaternion(this._totalRotationCache);

    return isLimited;
  }
}
