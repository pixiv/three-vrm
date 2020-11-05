import * as THREE from 'three';

export function setRandomVector3(target: THREE.Vector3, rng: () => number, min = -1.0, max = 1.0): typeof target {
  const range = max - min;

  return target.set(range * rng() - min, range * rng() - min, range * rng() - min);
}
