import * as THREE from 'three/webgpu';
import type { MToonColorNode } from './MToonColorNode';

export interface MToonNodeMaterialParameters extends THREE.ShaderMaterialParameters {
  transparentWithZWrite?: boolean;

  shadeColorNode?: MToonColorNode | null;
  shadingShiftNode?: THREE.Node<'float'> | null;
  shadingToonyNode?: THREE.Node<'float'> | null;
  rimLightingMixNode?: THREE.Node<'float'> | null;
  rimMultiplyNode?: MToonColorNode | null;
  matcapNode?: MToonColorNode | null;
  parametricRimColorNode?: MToonColorNode | null;
  parametricRimLiftNode?: THREE.Node<'float'> | null;
  parametricRimFresnelPowerNode?: THREE.Node<'float'> | null;
}
