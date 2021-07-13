import * as THREE from 'three';

const QUAT_IDENTITY = new THREE.Quaternion(0, 0, 0, 1);

const _v3A = new THREE.Vector3();

/**
 * Compute an exponential of a quaternion. Destructive.
 * @param target A quaternion.
 */
export function quatExp<T extends THREE.Quaternion>(target: T): T {
  _v3A.set(target.x, target.y, target.z);
  const vNorm = _v3A.length();

  const m = Math.exp(target.w);
  const s = vNorm < Number.EPSILON ? 0.0 : (m * Math.sin(vNorm)) / vNorm;

  target.set(s * target.x, s * target.y, s * target.z, m * Math.cos(vNorm));

  return target;
}

/**
 * Compute a logarithm of a quaternion. Destructive.
 * @param target A quaternion.
 */
export function quatLog<T extends THREE.Quaternion>(target: T): T {
  _v3A.set(target.x, target.y, target.z);
  const vNorm = _v3A.length();

  const t = vNorm < Number.EPSILON ? 0.0 : Math.atan2(vNorm, target.w) / vNorm;

  target.set(t * target.x, t * target.y, t * target.z, 0.5 * Math.log(target.lengthSq()));

  return target;
}

export function quaternionFreezeAxes<T extends THREE.Quaternion>(target: T, freeze: [boolean, boolean, boolean]): T {
  if (freeze[0] && freeze[1] && freeze[2]) {
    return target;
  }
  if (!freeze[0] && !freeze[1] && !freeze[2]) {
    return target.copy(QUAT_IDENTITY);
  }

  quatLog(target);

  if (!freeze[0]) {
    target.x *= 0.0;
  }
  if (!freeze[1]) {
    target.y *= 0.0;
  }
  if (!freeze[2]) {
    target.z *= 0.0;
  }

  return quatExp(target);
}
