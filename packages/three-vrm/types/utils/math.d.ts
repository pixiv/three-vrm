import * as THREE from 'three';
/**
 * Clamp an input number within [ `0.0` - `1.0` ].
 *
 * @param value The input value
 */
export declare function saturate(value: number): number;
/**
 * Map the range of an input value from [ `min` - `max` ] to [ `0.0` - `1.0` ].
 * If input value is less than `min` , it returns `0.0`.
 * If input value is greater than `max` , it returns `1.0`.
 *
 * See also: https://threejs.org/docs/#api/en/math/Math.smoothstep
 *
 * @param x The value that will be mapped into the specified range
 * @param min Minimum value of the range
 * @param max Maximum value of the range
 */
export declare function linstep(x: number, min: number, max: number): number;
/**
 * Extract world position of an object from its world space matrix, in cheaper way.
 *
 * @param object The object
 * @param out Target vector
 */
export declare function getWorldPositionLite(object: THREE.Object3D, out: THREE.Vector3): THREE.Vector3;
/**
 * Extract world scale of an object from its world space matrix, in cheaper way.
 *
 * @param object The object
 * @param out Target vector
 */
export declare function getWorldScaleLite(object: THREE.Object3D, out: THREE.Vector3): THREE.Vector3;
/**
 * Extract world rotation of an object from its world space matrix, in cheaper way.
 *
 * @param object The object
 * @param out Target vector
 */
export declare function getWorldQuaternionLite(object: THREE.Object3D, out: THREE.Quaternion): THREE.Quaternion;
