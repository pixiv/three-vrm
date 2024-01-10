import * as Nodes from 'three/examples/jsm/nodes/Nodes.js';

export const outlineColor = Nodes.nodeImmutable(Nodes.PropertyNode, 'vec3').temp('OutlineColor');
export const outlineLightingMix = Nodes.nodeImmutable(Nodes.PropertyNode, 'float').temp('OutlineLightingMix');
export const shadeColor = Nodes.nodeImmutable(Nodes.PropertyNode, 'vec3').temp('ShadeColor');
export const shadingShift = Nodes.nodeImmutable(Nodes.PropertyNode, 'float').temp('ShadingShift');
export const shadingToony = Nodes.nodeImmutable(Nodes.PropertyNode, 'float').temp('ShadingToony');
export const rimLightingMix = Nodes.nodeImmutable(Nodes.PropertyNode, 'float').temp('RimLightingMix');
export const rimMultiply = Nodes.nodeImmutable(Nodes.PropertyNode, 'vec3').temp('RimMultiply');
export const matcap = Nodes.nodeImmutable(Nodes.PropertyNode, 'vec3').temp('matcap');
export const parametricRimColor = Nodes.nodeImmutable(Nodes.PropertyNode, 'vec3').temp('ParametricRimColor');
export const parametricRimLift = Nodes.nodeImmutable(Nodes.PropertyNode, 'float').temp('ParametricRimLift');
export const parametricRimFresnelPower = Nodes.nodeImmutable(Nodes.PropertyNode, 'float').temp(
  'ParametricRimFresnelPower',
);
