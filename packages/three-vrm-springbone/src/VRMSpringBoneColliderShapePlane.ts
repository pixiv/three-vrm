import * as THREE from 'three';
import { VRMSpringBoneColliderShape } from './VRMSpringBoneColliderShape';

const _v3A = new THREE.Vector3();
const _mat3A = new THREE.Matrix3();

export class VRMSpringBoneColliderShapePlane extends VRMSpringBoneColliderShape {
  public get type(): 'plane' {
    return 'plane';
  }

  /**
   * The offset of the plane from the origin in local space.
   */
  public offset: THREE.Vector3;

  /**
   * The normal of the plane in local space. Must be normalized.
   */
  public normal: THREE.Vector3;

  public constructor(params?: { offset?: THREE.Vector3; normal?: THREE.Vector3 }) {
    super();

    this.offset = params?.offset ?? new THREE.Vector3(0.0, 0.0, 0.0);
    this.normal = params?.normal ?? new THREE.Vector3(0.0, 0.0, 1.0);
  }

  public calculateCollision(
    colliderMatrix: THREE.Matrix4,
    objectPosition: THREE.Vector3,
    objectRadius: number,
    target: THREE.Vector3,
  ): number {
    target.copy(this.offset).applyMatrix4(colliderMatrix); // transformed offset
    target.negate().add(objectPosition); // a vector from collider center to object position

    _mat3A.getNormalMatrix(colliderMatrix); // convert the collider matrix to the normal matrix
    _v3A.copy(this.normal).applyNormalMatrix(_mat3A).normalize(); // transformed normal
    const distance = target.dot(_v3A) - objectRadius;

    target.copy(_v3A); // convert the delta to the direction

    return distance;
  }
}
