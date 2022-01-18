import * as THREE from 'three';
/**
 * Ref: https://github.com/mrdoob/three.js/blob/r136/src/renderers/webgl/WebGLProgram.js#L22
 */
export declare const getEncodingComponents: (encoding: THREE.TextureEncoding) => [string, string];
/**
 * https://github.com/mrdoob/three.js/blob/r136/src/renderers/webgl/WebGLProgram.js#L52
 */
export declare const getTexelDecodingFunction: (functionName: string, encoding: THREE.TextureEncoding) => string;
