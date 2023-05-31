import * as THREE from 'three';
declare const RGBEEncoding = 3002;
declare const RGBM7Encoding = 3004;
declare const RGBM16Encoding = 3005;
declare const RGBDEncoding = 3006;
declare const GammaEncoding = 3007;
type TextureEncoding = THREE.TextureEncoding | typeof RGBEEncoding | typeof RGBM7Encoding | typeof RGBM16Encoding | typeof RGBDEncoding | typeof GammaEncoding;
/**
 * COMPAT: pre-r137
 *
 * Ref: https://github.com/mrdoob/three.js/blob/r136/src/renderers/webgl/WebGLProgram.js#L22
 */
export declare const getEncodingComponents: (encoding: TextureEncoding) => [string, string];
/**
 * COMPAT: pre-r137
 *
 * This function is no longer required beginning from r137
 *
 * https://github.com/mrdoob/three.js/blob/r136/src/renderers/webgl/WebGLProgram.js#L52
 */
export declare const getTexelDecodingFunction: (functionName: string, encoding: TextureEncoding) => string;
export {};
