import * as THREE from 'three';
import * as Nodes from 'three/addons/nodes/Nodes.js';

export interface MToonNodeMaterialParameters extends THREE.ShaderMaterialParameters {
  transparentWithZWrite?: boolean;

  shadeColorNode?: Nodes.Swizzable | null;
  shadingShiftNode?: Nodes.Node | null;
  shadingToonyNode?: Nodes.Node | null;
  rimLightingMixNode?: Nodes.Node | null;
  rimMultiplyNode?: Nodes.Node | null;
  matcapNode?: Nodes.Node | null;
  parametricRimColorNode?: Nodes.Swizzable | null;
  parametricRimLiftNode?: Nodes.Node | null;
  parametricRimFresnelPowerNode?: Nodes.Node | null;
}
