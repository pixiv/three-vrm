import type * as THREE from 'three';
/**
 * Finds the lowest common ancestors of the given objects, if it exists.
 * @param objects The objects to find the lowest common ancestor for.
 */
export declare function lowestCommonAncestor(objects: Set<THREE.Object3D>): THREE.Object3D | null;
