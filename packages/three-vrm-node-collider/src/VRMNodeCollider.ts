import * as THREE from 'three';
import { VRMNodeColliderShape } from './VRMNodeColliderShape';

/**
 * Represents a collider of a VRM.
 */
export class VRMNodeCollider extends THREE.Object3D {
  /**
   * The shape of the collider.
   */
  public readonly shape: VRMNodeColliderShape;

  public constructor(shape: VRMNodeColliderShape) {
    super();

    this.shape = shape;
  }
}
