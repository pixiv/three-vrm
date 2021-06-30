import * as THREE from 'three';
import type { VRMSpringBoneColliderShape } from './VRMSpringBoneColliderShape';

/**
 * Represents a collider of a VRM.
 */
export class VRMSpringBoneCollider extends THREE.Object3D {
  /**
   * The shape of the collider.
   */
  public readonly shape: VRMSpringBoneColliderShape;

  public constructor(shape: VRMSpringBoneColliderShape) {
    super();

    this.shape = shape;
  }
}
