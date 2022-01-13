import * as THREE from 'three';
import { getEncodingComponents } from './getEncodingComponents';

export const getTexelDecodingFunction = (functionName: string, encoding: THREE.TextureEncoding): string => {
  const components = getEncodingComponents(encoding);
  return 'vec4 ' + functionName + '( vec4 value ) { return ' + components[0] + 'ToLinear' + components[1] + '; }';
};
