import * as THREE from 'three';

/**
 * Clamp an input number within [ `0.0` - `1.0` ].
 *
 * @param value The input value
 */
export function saturate(value: number): number {
  return Math.max(Math.min(value, 1.0), 0.0);
}

/**
 * Map the range of an input value from [ `min` - `max` ] to [ `0.0` - `1.0` ].
 * If input value is less than `min` , it returns `0.0`.
 * If input value is greater than `max` , it returns `1.0`.
 *
 * See also: https://threejs.org/docs/#api/en/math/Math.smoothstep
 *
 * @param x The value that will be mapped into the specified range
 * @param min Minimum value of the range
 * @param max Maximum value of the range
 */
export function linstep(x: number, min: number, max: number): number {
  if (x <= min) return 0;
  if (x >= max) return 1;

  return (x - min) / (max - min);
}

const _position = new THREE.Vector3();
const _scale = new THREE.Vector3();
const _rotation = new THREE.Quaternion();

/**
 * Extract world position of an object from its world space matrix, in cheaper way.
 *
 * @param object The object
 * @param out Target vector
 */
export function getWorldPositionLite(object: THREE.Object3D, out: THREE.Vector3): THREE.Vector3 {
  object.matrixWorld.decompose(out, _rotation, _scale);
  return out;
}

/**
 * Extract world scale of an object from its world space matrix, in cheaper way.
 *
 * @param object The object
 * @param out Target vector
 */
export function getWorldScaleLite(object: THREE.Object3D, out: THREE.Vector3): THREE.Vector3 {
  object.matrixWorld.decompose(_position, _rotation, out);
  return out;
}

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
