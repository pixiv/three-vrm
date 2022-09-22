import * as THREE from 'three';
/**
 * Extract world rotation of an object from its world space matrix, in cheaper way.
 *
 * @param object The object
 * @param out Target vector
 */
export declare function getWorldQuaternionLite(object: THREE.Object3D, out: THREE.Quaternion): THREE.Quaternion;
