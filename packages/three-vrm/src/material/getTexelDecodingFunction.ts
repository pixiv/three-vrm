import * as THREE from 'three';

/**
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
        console.warn( 'THREE.WebGLProgram: Unsupported encoding:', encoding );
        return [ 'Linear', '( value )' ];
    }
  } else {
    // COMPAT: pre-r136
    switch (encoding) {
      case THREE.LinearEncoding:
        return ['Linear', '( value )'];
      case THREE.sRGBEncoding:
        return ['sRGB', '( value )'];
      case (THREE as any).RGBEEncoding:
        return ['RGBE', '( value )'];
      case THREE.RGBM7Encoding:
        return ['RGBM', '( value, 7.0 )'];
      case THREE.RGBM16Encoding:
        return ['RGBM', '( value, 16.0 )'];
      case (THREE as any).RGBDEncoding:
        return ['RGBD', '( value, 256.0 )'];
      case (THREE as any).GammaEncoding:
        return ['Gamma', '( value, float( GAMMA_FACTOR ) )'];
      default:
        throw new Error('unsupported encoding: ' + encoding);
    }
  }
};

/**
 * https://github.com/mrdoob/three.js/blob/r136/src/renderers/webgl/WebGLProgram.js#L52
 */
export const getTexelDecodingFunction = (functionName: string, encoding: THREE.TextureEncoding): string => {
  const components = getEncodingComponents(encoding);
  return 'vec4 ' + functionName + '( vec4 value ) { return ' + components[0] + 'ToLinear' + components[1] + '; }';
};
