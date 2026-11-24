import * as THREE from 'three';

export interface LimitBufferGeometry extends THREE.BufferGeometry {
  update: () => void;
}
