import * as THREE from 'three';

export function decomposePosition<T extends THREE.Vector3>(matrix: THREE.Matrix4, target: T): T {
  return target.set(matrix.elements[12], matrix.elements[13], matrix.elements[14]);
}
