import * as THREE from 'three';
import { Xorshift } from './Xorshift';

const TAU = Math.PI * 2.0;

export function setRandomQuaternion(target: THREE.Quaternion, rng: Xorshift): typeof target {
  const u1 = rng.gen();
  const u2 = rng.gen();
  const u3 = rng.gen();

  const sqrtU1 = Math.sqrt(u1);
  const sqrtOneSubU1 = Math.sqrt(1.0 - u1);

  return target.set(
    sqrtOneSubU1 * Math.sin(TAU * u2),
    sqrtOneSubU1 * Math.cos(TAU * u2),
    sqrtU1 * Math.sin(TAU * u3),
    sqrtU1 * Math.cos(TAU * u3),
  );
}
