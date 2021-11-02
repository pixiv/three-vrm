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
    case THREE.LogLuvEncoding:
      return ['LogLuv', '( value )'];
    default:
      throw new Error('unsupported encoding: ' + encoding);
  }
};
