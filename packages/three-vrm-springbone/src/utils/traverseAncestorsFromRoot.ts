import type * as THREE from 'three';

export function traverseAncestorsFromRoot(object: THREE.Object3D, callback: (object: THREE.Object3D) => void): void {
  const ancestors: THREE.Object3D[] = [];

  let head: THREE.Object3D | null = object;
  while (head !== null) {
    ancestors.unshift(head);
    head = head.parent;
  }

  ancestors.forEach((ancestor) => {
    callback(ancestor);
  });
}
