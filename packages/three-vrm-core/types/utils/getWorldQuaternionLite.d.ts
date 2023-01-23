import * as THREE from 'three';
/**
 * A replacement of `Object3D.getWorldQuaternion`.
 * Extract the world quaternion of an object from its world space matrix, without calling `Object3D.updateWorldMatrix`.
 * Use this when you're sure that the world matrix is up-to-date.
 *
 * @param object The object
 * @param out A target quaternion
 */
export declare function getWorldQuaternionLite(object: THREE.Object3D, out: THREE.Quaternion): THREE.Quaternion;
