import * as THREE from 'three';

const TAU = Math.PI * 2.0;

export function setRandomQuaternion<T extends THREE.Quaternion>(target: T, rng: () => number): T {
  const u1 = rng();
  const u2 = rng();
  const u3 = rng();

  const sqrtU1 = Math.sqrt(u1);
  const sqrtOneSubU1 = Math.sqrt(1.0 - u1);

  target.set(
    sqrtOneSubU1 * Math.sin(TAU * u2),
    sqrtOneSubU1 * Math.cos(TAU * u2),
    sqrtU1 * Math.sin(TAU * u3),
    sqrtU1 * Math.cos(TAU * u3),
  );
  return target;
}
