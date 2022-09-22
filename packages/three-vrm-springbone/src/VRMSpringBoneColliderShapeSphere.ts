import * as THREE from 'three';
import { VRMSpringBoneColliderShape } from './VRMSpringBoneColliderShape';

export class VRMSpringBoneColliderShapeSphere extends VRMSpringBoneColliderShape {
  public get type(): 'sphere' {
    return 'sphere';
  }

  /**
   * The offset from the origin.
   */
  public offset: THREE.Vector3;

  /**
   * The radius.
   */
  public radius: number;

  public constructor(params?: { radius?: number; offset?: THREE.Vector3 }) {
    super();

    this.offset = params?.offset ?? new THREE.Vector3(0.0, 0.0, 0.0);
    this.radius = params?.radius ?? 0.0;
  }

  public calculateCollision(
    colliderMatrix: THREE.Matrix4,
    objectPosition: THREE.Vector3,
    objectRadius: number,
    target: THREE.Vector3,
  ): number {
    target.copy(this.offset).applyMatrix4(colliderMatrix); // transformed offset
    target.negate().add(objectPosition); // a vector from collider center to object position
    const radius = objectRadius + this.radius;
    const distance = target.length() - radius;
    target.normalize();
    return distance;
  }
}
