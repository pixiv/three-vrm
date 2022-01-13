import * as THREE from 'three';
/**
 * Return a quaternion that represents a rotation of aim vector.
 * @param target Target quaternion
 * @param from A vector represents eye position of the aim quaternion.
 * @param to A vector represents target position of the aim quaternion.
 * @param aim A reference vector of the aim vector. Must be normalized
 * @param up An up vector. Must be normalized
 */
export declare function setAimQuaternion<T extends THREE.Quaternion>(target: T, from: THREE.Vector3, to: THREE.Vector3, aim: THREE.Vector3, up: THREE.Vector3, freezeAxes: [
    boolean,
    boolean
]): T;
