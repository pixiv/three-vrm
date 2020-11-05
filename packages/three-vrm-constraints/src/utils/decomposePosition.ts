import * as THREE from 'three';

export function decomposePosition(matrix: THREE.Matrix4, target: THREE.Vector3): typeof target {
  return target.set(matrix.elements[12], matrix.elements[13], matrix.elements[14]);
}
