import * as THREE from 'three';

const _v3A = new THREE.Vector3();
const _quatA = new THREE.Quaternion();

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

/**
 * Compute a weighted sum of quaternions.
 * Sum of weights must be `1.0` .
 */
export function quatWeightedSum(
  target: THREE.Quaternion,
  quats: Array<{ quat: THREE.Quaternion; weight: number }>,
): THREE.Quaternion {
  target.set(0.0, 0.0, 0.0, 0.0);

  let weightSum = 0.0;
  quats.forEach(({ quat, weight }) => {
    quatLog(_quatA.copy(quat));
    target.x += weight * _quatA.x;
    target.y += weight * _quatA.y;
    target.z += weight * _quatA.z;
    weightSum += weight;
  });

  target.x /= weightSum;
  target.y /= weightSum;
  target.z /= weightSum;

  quatExp(target);

  return target;
}
