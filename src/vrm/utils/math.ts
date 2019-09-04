import * as THREE from 'three';

export function saturate(value: number): number {
  return Math.max(Math.min(value, 1.0), 0.0);
}

// minとmaxの間の距離における、xのパーセンテージを表す、0から1までの浮動小数点数値を返す
// （three.jsにはsmoothstepはあるが、linstepが用意されていない）
export function linstep(x: number, min: number, max: number): number {
  if (x <= min) return 0;
  if (x >= max) return 1;

  return (x - min) / (max - min);
}

const _position = new THREE.Vector3();
const _scale = new THREE.Vector3();
const _rotation = new THREE.Quaternion();

/**
 * Extract object's world position, in cheaper way
 */
export function getWorldPositionLite(object: THREE.Object3D, out: THREE.Vector3): THREE.Vector3 {
  object.matrixWorld.decompose(out, _rotation, _scale);
  return out;
}

/**
 * Extract object's world scale, in cheaper way
 */
export function getWorldScaleLite(object: THREE.Object3D, out: THREE.Vector3): THREE.Vector3 {
  object.matrixWorld.decompose(_position, _rotation, out);
  return out;
}

/**
 * Extract object's world rotation, in cheaper way
 */
export function getWorldQuaternionLite(object: THREE.Object3D, out: THREE.Quaternion): THREE.Quaternion {
  object.matrixWorld.decompose(_position, out, _scale);
  return out;
}
