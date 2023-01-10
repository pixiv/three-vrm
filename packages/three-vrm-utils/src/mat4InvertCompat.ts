import * as THREE from 'three';

const _matA = new THREE.Matrix4();

/**
 * A compat function for `Matrix4.invert()` / `Matrix4.getInverse()`.
 * `Matrix4.invert()` is introduced in r123 and `Matrix4.getInverse()` emits a warning.
 * We are going to use this compat for a while.
 * @param target A target matrix
 */
export function mat4InvertCompat<T extends THREE.Matrix4>(target: T): T {
  if ((target as any).invert) {
    target.invert();
  } else {
    (target as any).getInverse(_matA.copy(target));
  }

  return target;
}
