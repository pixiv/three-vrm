import * as THREE from 'three';
import { setRandomQuaternion } from './setRandomQuaternion';
import { Xorshift } from './Xorshift';

export function setRandomTransform(object: THREE.Object3D, rng: Xorshift): THREE.Object3D {
  object.position.set(2.0 * rng.gen() - 1.0, 2.0 * rng.gen() - 1.0, 2.0 * rng.gen() - 1.0);
  setRandomQuaternion(object.quaternion, rng);
  object.scale.set(2.0 * rng.gen(), 2.0 * rng.gen(), 2.0 * rng.gen());

  return object;
}
