import * as THREE_TSL from 'three/tsl';
/**
 * A compat function for `Fn()` / `tslFn()`.
 * `tslFn()` has been renamed to `Fn()` in r168.
 * We are going to use this compat for a while.
 *
 * See: https://github.com/mrdoob/three.js/pull/29064
 */
export declare const FnCompat: typeof THREE_TSL.Fn;
