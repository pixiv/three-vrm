import * as THREE from 'three';

const encodingColorSpaceMap: Record<any, '' | 'srgb'> = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  3000: '',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  3001: 'srgb',
};

/**
 * A compat function to get texture color space.
 *
 * COMPAT: pre-r152
 * Starting from Three.js r152, `texture.encoding` is renamed to `texture.colorSpace`.
 * This function will handle the comapt.
 *
 * @param texture The texture you want to get the color space from
 */
export function getTextureColorSpace(texture: THREE.Texture): '' | 'srgb' {
  if (parseInt(THREE.REVISION, 10) >= 152) {
    return texture.colorSpace as '' | 'srgb';
  } else {
    return encodingColorSpaceMap[(texture as any).encoding];
  }
}
