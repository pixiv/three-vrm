import type * as THREE from 'three';
/**
 * Traverse ancestors of given object and call given callback from root side.
 * It will include the given object itself.
 *
 * @param object The object you want to traverse
 * @param callback The call back function that will be called for each ancestors
 */
export declare function traverseAncestorsFromRoot(object: THREE.Object3D, callback: (object: THREE.Object3D) => void): void;
