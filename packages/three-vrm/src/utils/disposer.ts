// See: https://threejs.org/docs/#manual/en/introduction/How-to-dispose-of-objects

import * as THREE from 'three';

function disposeMaterial(material: THREE.Material): void {
  Object.values(material).forEach((value) => {
    if (value?.isTexture) {
      const texture = value as THREE.Texture;
      texture.dispose();
    }
  });

  material.dispose();
}

function dispose(object3D: THREE.Object3D): void {
  const geometry: THREE.BufferGeometry | undefined = (object3D as any).geometry;
  if (geometry) {
    geometry.dispose();
  }

  const material: THREE.Material | THREE.Material[] | undefined = (object3D as any).material;
  if (material) {
    if (Array.isArray(material)) {
      material.forEach((material: THREE.Material) => disposeMaterial(material));
    } else {
      disposeMaterial(material);
    }
  }
}

export function deepDispose(object3D: THREE.Object3D): void {
  object3D.traverse(dispose);
}
