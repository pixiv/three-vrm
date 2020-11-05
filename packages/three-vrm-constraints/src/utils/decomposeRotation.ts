import * as THREE from 'three';

const _v3A = new THREE.Vector3();
const _v3B = new THREE.Vector3();

export function decomposeRotation(matrix: THREE.Matrix4, target: THREE.Quaternion): typeof target {
  matrix.decompose(_v3A, target, _v3B);
  return target;
}
