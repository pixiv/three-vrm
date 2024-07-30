import * as THREE from 'three/webgpu';

export const shadeColor = THREE.nodeImmutable(THREE.PropertyNode, 'vec3').temp('ShadeColor');
export const shadingShift = THREE.nodeImmutable(THREE.PropertyNode, 'float').temp('ShadingShift');
export const shadingToony = THREE.nodeImmutable(THREE.PropertyNode, 'float').temp('ShadingToony');
export const rimLightingMix = THREE.nodeImmutable(THREE.PropertyNode, 'float').temp('RimLightingMix');
export const rimMultiply = THREE.nodeImmutable(THREE.PropertyNode, 'vec3').temp('RimMultiply');
export const matcap = THREE.nodeImmutable(THREE.PropertyNode, 'vec3').temp('matcap');
export const parametricRim = THREE.nodeImmutable(THREE.PropertyNode, 'vec3').temp('ParametricRim');
