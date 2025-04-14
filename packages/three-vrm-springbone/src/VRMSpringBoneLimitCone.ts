import * as THREE from 'three';
import { VRMSpringBoneLimit } from './VRMSpringBoneLimit';

export class VRMSpringBoneLimitCone extends VRMSpringBoneLimit {
  /**
   * The angle of the cone limit in radians.
   * If the angle is set to π or greater, the angle will be interpreted as π by the implementation.
   * When the angle is set to π, the cone shape becomes a sphere.
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

    // calculate the current angle of the tail
    const dryAngle = Math.acos(tailDir.y);

    let isLimited = false;
    if (dryAngle > this.angle) {
      // now we have to apply the limit
      isLimited = true;

      // set the y component to the cos of the angle
      tailDir.y = Math.cos(this.angle);

      // multiply the x and z components by the ratio of the sins of the angles
      const ratio = Math.sin(this.angle) / Math.sin(dryAngle);
      tailDir.x *= ratio;
      tailDir.z *= ratio;

      // normalize the direction just in case
      tailDir.normalize();
    }

    // change the direction back to the world space
    tailDir.applyQuaternion(this._totalRotationCache);

    return isLimited;
  }
}
