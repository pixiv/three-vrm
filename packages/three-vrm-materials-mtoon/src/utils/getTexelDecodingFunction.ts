import * as THREE from 'three';

// Since these constants are deleted in r136 we have to define by ourselves
/* eslint-disable @typescript-eslint/naming-convention */
const RGBEEncoding = 3002;
const RGBM7Encoding = 3004;
const RGBM16Encoding = 3005;
const RGBDEncoding = 3006;
const GammaEncoding = 3007;
/* eslint-enable @typescript-eslint/naming-convention */

/**
 * COMPAT: pre-r137
 *
 * Ref: https://github.com/mrdoob/three.js/blob/r136/src/renderers/webgl/WebGLProgram.js#L22
 */
export const getEncodingComponents = (encoding: THREE.TextureEncoding): [string, string] => {
  if (parseInt(THREE.REVISION, 10) >= 136) {
    switch (encoding) {
      case THREE.LinearEncoding:
        return ['Linear', '( value )'];
      case THREE.sRGBEncoding:
        return ['sRGB', '( value )'];
      default:
        console.warn('THREE.WebGLProgram: Unsupported encoding:', encoding);
        return ['Linear', '( value )'];
    }
  } else {
    // COMPAT: pre-r136
    switch (encoding) {
      case THREE.LinearEncoding:
        return ['Linear', '( value )'];
      case THREE.sRGBEncoding:
        return ['sRGB', '( value )'];
      case RGBEEncoding:
        return ['RGBE', '( value )'];
      case RGBM7Encoding:
        return ['RGBM', '( value, 7.0 )'];
      case RGBM16Encoding:
        return ['RGBM', '( value, 16.0 )'];
      case RGBDEncoding:
        return ['RGBD', '( value, 256.0 )'];
      case GammaEncoding:
        return ['Gamma', '( value, float( GAMMA_FACTOR ) )'];
      default:
        throw new Error('unsupported encoding: ' + encoding);
    }
  }
};

/**
 * COMPAT: pre-r137
 *
 * This function is no longer required beginning from r137
 *
 * https://github.com/mrdoob/three.js/blob/r136/src/renderers/webgl/WebGLProgram.js#L52
 */
export const getTexelDecodingFunction = (functionName: string, encoding: THREE.TextureEncoding): string => {
  const components = getEncodingComponents(encoding);
  return 'vec4 ' + functionName + '( vec4 value ) { return ' + components[0] + 'ToLinear' + components[1] + '; }';
};
