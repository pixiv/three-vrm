import * as THREE from 'three';
import { setRandomQuaternion } from './setRandomQuaternion';

export function setRandomTransform(object: THREE.Object3D, rng: () => number): typeof object {
  // apply random position
  object.position.set(2.0 * rng() - 1.0, 2.0 * rng() - 1.0, 2.0 * rng() - 1.0);

  // apply random rotation
  setRandomQuaternion(object.quaternion, rng);

  // apply random scale. scale must be uniform
  const scale = 2.0 * rng();
  object.scale.set(scale, scale, scale);

  return object;
}
