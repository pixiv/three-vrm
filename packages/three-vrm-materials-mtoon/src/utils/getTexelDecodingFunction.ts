import * as THREE from 'three';

export const getEncodingComponents = (encoding: THREE.TextureEncoding): [string, string] => {
  switch (encoding) {
    case THREE.LinearEncoding:
      return ['Linear', '( value )'];
    case THREE.sRGBEncoding:
      return ['sRGB', '( value )'];
    case THREE.RGBEEncoding:
      return ['RGBE', '( value )'];
    case THREE.RGBM7Encoding:
      return ['RGBM', '( value, 7.0 )'];
    case THREE.RGBM16Encoding:
      return ['RGBM', '( value, 16.0 )'];
    case THREE.RGBDEncoding:
      return ['RGBD', '( value, 256.0 )'];
    case THREE.GammaEncoding:
      return ['Gamma', '( value, float( GAMMA_FACTOR ) )'];
    default:
      throw new Error('unsupported encoding: ' + encoding);
  }
};

export const getTexelDecodingFunction = (functionName: string, encoding: THREE.TextureEncoding): string => {
  const components = getEncodingComponents(encoding);
  return 'vec4 ' + functionName + '( vec4 value ) { return ' + components[0] + 'ToLinear' + components[1] + '; }';
};
