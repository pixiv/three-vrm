import * as THREE from 'three';

/**
 * COMPAT: pre-r137
 *
 * This function is no longer required beginning from r137
 *
 * Retrieved from https://github.com/mrdoob/three.js/blob/88b6328998d155fa0a7c1f1e5e3bd6bff75268c0/src/renderers/webgl/WebGLPrograms.js#L92
 *
 * Diff:
 *   - Remove WebGLRenderTarget handler because it increases code complexities on TypeScript
 *   - Add a boolean `isWebGL2` as a second argument.
 */
export function getTextureEncodingFromMap(map: THREE.Texture, isWebGL2: boolean): THREE.TextureEncoding {
  let encoding;

  if (map && map.isTexture) {
    encoding = map.encoding;
    // } else if ( map && map.isWebGLRenderTarget ) {
    //   console.warn( 'THREE.WebGLPrograms.getTextureEncodingFromMap: don\'t use render targets as textures. Use their .texture property instead.' );
    //   encoding = map.texture.encoding;
  } else {
    encoding = THREE.LinearEncoding;
  }

  if (parseInt(THREE.REVISION, 10) >= 133) {
    if (
      isWebGL2 &&
      map &&
      map.isTexture &&
      map.format === THREE.RGBAFormat &&
      map.type === THREE.UnsignedByteType &&
      map.encoding === THREE.sRGBEncoding
    ) {
      encoding = THREE.LinearEncoding; // disable inline decode for sRGB textures in WebGL 2
    }
  }

  return encoding;
}
