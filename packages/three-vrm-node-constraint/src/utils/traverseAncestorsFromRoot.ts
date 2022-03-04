import type * as THREE from 'three';

/**
 * Traverse ancestors of given object and call given callback from root side.
 * It will include the given object itself.
 *
 * @param object The object you want to traverse
 * @param callback The call back function that will be called for each ancestors
 */
export function traverseAncestorsFromRoot(object: THREE.Object3D, callback: (object: THREE.Object3D) => void): void {
  const ancestors: THREE.Object3D[] = [object];

  let head: THREE.Object3D | null = object.parent;
  while (head !== null) {
    ancestors.unshift(head);
    head = head.parent;
  }

  ancestors.forEach((ancestor) => {
    callback(ancestor);
  });
}
