import * as Nodes from 'three/examples/jsm/nodes/Nodes.js';

export const shadeColor = Nodes.nodeImmutable(Nodes.PropertyNode, 'vec3').temp('ShadeColor');
export const shadingShift = Nodes.nodeImmutable(Nodes.PropertyNode, 'float').temp('ShadingShift');
export const shadingToony = Nodes.nodeImmutable(Nodes.PropertyNode, 'float').temp('ShadingToony');
export const rimLightingMix = Nodes.nodeImmutable(Nodes.PropertyNode, 'float').temp('RimLightingMix');
export const rimMultiply = Nodes.nodeImmutable(Nodes.PropertyNode, 'vec3').temp('RimMultiply');
export const matcap = Nodes.nodeImmutable(Nodes.PropertyNode, 'vec3').temp('matcap');
export const parametricRim = Nodes.nodeImmutable(Nodes.PropertyNode, 'vec3').temp('ParametricRim');
