import * as THREE from 'three';
/**
 * Compute an exponential of a quaternion. Destructive.
 * @param target A quaternion.
 */
export declare function quatExp<T extends THREE.Quaternion>(target: T): T;
/**
 * Compute a logarithm of a quaternion. Destructive.
 * @param target A quaternion.
 */
export declare function quatLog<T extends THREE.Quaternion>(target: T): T;
export declare function quaternionFreezeAxes<T extends THREE.Quaternion>(target: T, freeze: [
    boolean,
    boolean,
    boolean
]): T;
