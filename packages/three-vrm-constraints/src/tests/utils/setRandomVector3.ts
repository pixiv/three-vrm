import * as THREE from 'three';

export function setRandomVector3<T extends THREE.Vector3>(target: T, rng: () => number, min = -1.0, max = 1.0): T {
  const range = max - min;

  target.set(range * rng() - min, range * rng() - min, range * rng() - min);

  return target;
}
