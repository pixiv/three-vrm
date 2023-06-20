import * as THREE from 'three';
/**
 * A compat function to set texture color space.
 *
 * COMPAT: pre-r152
 * Starting from Three.js r152, `texture.encoding` is renamed to `texture.colorSpace`.
 * This function will handle the comapt.
 *
 * @param texture The texture you want to set the color space to
 * @param colorSpace The color space you want to set to the texture
 */
export declare function setTextureColorSpace(texture: THREE.Texture, colorSpace: '' | 'srgb'): void;
