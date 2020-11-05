import * as THREE from 'three';

const _v3A = new THREE.Vector3();
const _v3B = new THREE.Vector3();

export function decomposeRotation<T extends THREE.Quaternion>(matrix: THREE.Matrix4, target: T): T {
  matrix.decompose(_v3A, target, _v3B);
  return target;
}
