import * as THREE from 'three';
export interface ColliderShapeBufferGeometry extends THREE.BufferGeometry {
    update: () => void;
}
