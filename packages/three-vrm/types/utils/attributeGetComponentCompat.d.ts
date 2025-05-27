import * as THREE from 'three';
/**
 * A compat function for `BufferAttribute.getComponent()`.
 * `BufferAttribute.getComponent()` is introduced in r155.
 *
 * See: https://github.com/mrdoob/three.js/pull/24515
 */
export declare function attributeGetComponentCompat(attribute: THREE.BufferAttribute | THREE.InterleavedBufferAttribute, index: number, component: number): number;
