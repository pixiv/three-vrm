import * as THREE from 'three';
/**
 * COMPAT: pre-r137
 *
 * Ref: https://github.com/mrdoob/three.js/blob/r136/src/renderers/webgl/WebGLProgram.js#L22
 */
export declare const getEncodingComponents: (encoding: THREE.TextureEncoding) => [string, string];
/**
 * COMPAT: pre-r137
 *
 * This function is no longer required beginning from r137
 *
 * https://github.com/mrdoob/three.js/blob/r136/src/renderers/webgl/WebGLProgram.js#L52
 */
export declare const getTexelDecodingFunction: (functionName: string, encoding: THREE.TextureEncoding) => string;
