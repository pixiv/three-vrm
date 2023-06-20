import * as THREE from 'three';
/**
 * A compat function to get texture color space.
 *
 * COMPAT: pre-r152
 * Starting from Three.js r152, `texture.encoding` is renamed to `texture.colorSpace`.
 * This function will handle the comapt.
 *
 * @param texture The texture you want to get the color space from
 */
export declare function getTextureColorSpace(texture: THREE.Texture): '' | 'srgb';
