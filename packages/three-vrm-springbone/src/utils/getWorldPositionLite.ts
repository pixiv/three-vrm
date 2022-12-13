import * as THREE from 'three';

const _quaternion = new THREE.Quaternion();
const _scale = new THREE.Vector3();

/**
 * A replacement of `Object3D.getWorldPosition`.
 * Extract the world position of an object from its world space matrix, without calling `Object3D.updateWorldMatrix`.
 * Use this when you're sure that the world matrix is up-to-date.
 *
 * @param object The object
 * @param out A target vector
 */
export function getWorldPositionLite(object: THREE.Object3D, out: THREE.Vector3): THREE.Vector3 {
  object.matrixWorld.decompose(out, _quaternion, _scale);
  return out;
}
