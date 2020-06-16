import * as THREE from 'three';

const _v3A = new THREE.Vector3();

/**
 * Compute an exponential of a quaternion. Destructive.
 * @param exp A quaternion.
 */
export function quatExp(quat: THREE.Quaternion): THREE.Quaternion {
  _v3A.set(quat.x, quat.y, quat.z);
  const vNorm = _v3A.length();

  const m = Math.exp(quat.w);
  const s = vNorm < Number.EPSILON ? 0.0 : (m * Math.sin(vNorm)) / vNorm;

  return quat.set(s * quat.x, s * quat.y, s * quat.z, m * Math.cos(vNorm));
}

/**
 * Compute a logarithm of a quaternion. Destructive.
 * @param quat A quaternion.
 */
export function quatLog(quat: THREE.Quaternion): THREE.Quaternion {
  _v3A.set(quat.x, quat.y, quat.z);
  const vNorm = _v3A.length();

  const t = vNorm < Number.EPSILON ? 0.0 : Math.atan2(vNorm, quat.w) / vNorm;

  return quat.set(t * quat.x, t * quat.y, t * quat.z, 0.5 * Math.log(quat.lengthSq()));
}
