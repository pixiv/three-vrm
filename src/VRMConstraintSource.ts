import type * as THREE from 'three';

export interface VRMConstraintSource {
  object: THREE.Object3D;
  weight: number;
}
