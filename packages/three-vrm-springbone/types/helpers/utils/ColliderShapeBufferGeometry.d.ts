import * as THREE from 'three';
export interface ColliderShapeBufferGeometry extends THREE.BufferGeometry {
    worldScale: number;
    update: () => void;
}
