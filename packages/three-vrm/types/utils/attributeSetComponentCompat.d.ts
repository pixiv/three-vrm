import * as THREE from 'three';
/**
 * A compat function for `BufferAttribute.setComponent()`.
 * `BufferAttribute.setComponent()` is introduced in r155.
 *
 * See: https://github.com/mrdoob/three.js/pull/24515
 */
export declare function attributeSetComponentCompat(attribute: THREE.BufferAttribute | THREE.InterleavedBufferAttribute, index: number, component: number, value: number): void;
