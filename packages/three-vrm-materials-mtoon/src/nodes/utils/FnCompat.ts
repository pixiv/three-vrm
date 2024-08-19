import * as THREE from 'three/webgpu';

/**
 * A compat function for `Fn()` / `tslFn()`.
 * `tslFn()` has been renamed to `Fn()` in r168.
 * We are going to use this compat for a while.
 *
 * See: https://github.com/mrdoob/three.js/pull/29064
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const FnCompat: typeof THREE.tslFn = (jsFunc: any) => {
  // COMPAT r168: `tslFn()` has been renamed to `Fn()`
  // See: https://github.com/mrdoob/three.js/pull/29064
  const threeRevision = parseInt(THREE.REVISION, 10);
  if (threeRevision >= 168) {
    return (THREE as any).Fn(jsFunc);
  } else {
    return (THREE as any).tslFn(jsFunc);
  }
};
