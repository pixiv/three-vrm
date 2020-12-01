import * as THREE from 'three';
import { VRMNodeColliderShape } from './VRMNodeColliderShape';

export class VRMNodeColliderShapeCapsule extends VRMNodeColliderShape {
  public get type(): 'capsule' {
    return 'capsule';
  }

  /**
   * The offset of the head from the origin.
   */
  public offset: THREE.Vector3;

  /**
   * The offset of the tail from the origin.
   */
  public tail: THREE.Vector3;

  /**
   * The radius.
   */
  public radius: number;

  public constructor(params?: { radius?: number; offset?: THREE.Vector3; tail?: THREE.Vector3 }) {
    super();

    this.offset = params?.offset ?? new THREE.Vector3(0.0, 0.0, 0.0);
    this.tail = params?.tail ?? new THREE.Vector3(0.0, 0.0, 0.0);
    this.radius = params?.radius ?? 1.0;
  }

  public calculateCollision(
    colliderMatrix: THREE.Matrix4,
    objectPosition: THREE.Vector3,
    objectRadius: number,
    target: THREE.Vector3,
  ): number {
    throw new Error('TODO');

    // target.copy( this.offset ).applyMatrix4( colliderMatrix ); // transformed offset
    // target.negate().add( objectPosition ); // a vector from collider center to object position
    // const radius = objectRadius + this.radius;
    // const distanceSq = target.lengthSq() - radius * radius;
    // target.normalize();
    // return distanceSq;
  }
}
