import * as THREE from 'three';
import { Xorshift } from './Xorshift';

export function setRandomTransform(object: THREE.Object3D, rng: Xorshift): THREE.Object3D {
  object.position.set(2.0 * rng.gen() - 1.0, 2.0 * rng.gen() - 1.0, 2.0 * rng.gen() - 1.0);
  object.rotation.set(2.0 * rng.gen() - 1.0, 2.0 * rng.gen() - 1.0, 2.0 * rng.gen() - 1.0);
  object.scale.set(2.0 * rng.gen(), 2.0 * rng.gen(), 2.0 * rng.gen());

  return object;
}
