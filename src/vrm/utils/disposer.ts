import * as THREE from 'three';

export function deepDispose(object3D: THREE.Object3D): void {
  object3D.traverse(dispose);
}

function dispose(object3D: any): void {
  if (!!object3D.geometry) {
    object3D.geometry.dispose();
    object3D.geometry = undefined;
  }

  if (!!object3D.material && Array.isArray(object3D.material)) {
    object3D.material.forEach((material: THREE.Material) => disposeMaterial(material));
  } else if (!!object3D.material) {
    disposeMaterial(object3D.material);
  }
}

function disposeMaterial(material: any): void {
  Object.keys(material).forEach((propertyName) => {
    if (!!material[propertyName] && typeof material[propertyName].dispose === 'function') {
      material[propertyName].dispose();
    }
  });

  material.dispose();
  material = undefined;
}
