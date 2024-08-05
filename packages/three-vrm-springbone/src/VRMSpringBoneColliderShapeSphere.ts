import * as THREE from 'three';
import { VRMSpringBoneColliderShape } from './VRMSpringBoneColliderShape';

export class VRMSpringBoneColliderShapeSphere extends VRMSpringBoneColliderShape {
  public get type(): 'sphere' {
    return 'sphere';
  }

  /**
   * The offset of the sphere from the origin in local space.
   */
  public offset: THREE.Vector3;

  /**
   * The radius.
   */
  public radius: number;

  /**
   * If true, the collider prevents spring bones from going outside of the sphere instead.
   */
  public inside: boolean;

  public constructor(params?: { radius?: number; offset?: THREE.Vector3; inside?: boolean }) {
    super();

    this.offset = params?.offset ?? new THREE.Vector3(0.0, 0.0, 0.0);
    this.radius = params?.radius ?? 0.0;
    this.inside = params?.inside ?? false;
  }

  public calculateCollision(
    colliderMatrix: THREE.Matrix4,
    objectPosition: THREE.Vector3,
    objectRadius: number,
    target: THREE.Vector3,
  ): number {
    target.copy(this.offset).applyMatrix4(colliderMatrix); // transformed offset
    target.negate().add(objectPosition); // a vector from collider center to object position

    const distance = this.inside
      ? this.radius - objectRadius - target.length()
      : target.length() - objectRadius - this.radius;

    target.normalize(); // convert the delta to the direction
    if (this.inside) {
      target.negate(); // if inside, reverse the direction
    }

    return distance;
  }
}
