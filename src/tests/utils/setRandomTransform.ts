import * as THREE from 'three';
import { setRandomQuaternion } from './setRandomQuaternion';
import { setRandomVector3 } from './setRandomVector3';

export function setRandomTransform(object: THREE.Object3D, rng: () => number): typeof object {
  // apply random position
  setRandomVector3(object.position, rng);

  // apply random rotation
  setRandomQuaternion(object.quaternion, rng);

  // apply random scale. scale must be uniform
  const scale = 2.0 * rng();
  object.scale.set(scale, scale, scale);

  return object;
}
