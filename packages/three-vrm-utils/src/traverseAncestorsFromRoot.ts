import type * as THREE from 'three';

/**
 * Executes the callback on all ancestors.
 * While `Object3D.traverseAncestors` traverses toward the root, it traverses from root instead.
 *
 * @param object The object
 * @param callback A callback function receives the ancestors.
 */
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
