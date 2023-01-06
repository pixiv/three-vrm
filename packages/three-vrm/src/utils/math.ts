import * as THREE from 'three';

/**
 * Clamp an input number within [ `0.0` - `1.0` ].
 *
 * @param value The input value
 */
export function saturate(value: number): number {
  return Math.max(Math.min(value, 1.0), 0.0);
}

const _position = new THREE.Vector3();
const _scale = new THREE.Vector3();

/**
 * Extract world rotation of an object from its world space matrix, in cheaper way.
 *
 * @param object The object
 * @param out Target vector
 */
export function getWorldQuaternionLite(object: THREE.Object3D, out: THREE.Quaternion): THREE.Quaternion {
  object.matrixWorld.decompose(_position, out, _scale);
  return out;
}
