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
export declare function getTextureEncodingFromMap(map: THREE.Texture, isWebGL2: boolean): THREE.TextureEncoding;
