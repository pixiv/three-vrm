import * as THREE from 'three/webgpu';
import { nodeImmutable } from 'three/tsl';

export const shadeColor = nodeImmutable(THREE.PropertyNode<'vec3'>, 'vec3', 'ShadeColor');
export const shadingShift = nodeImmutable(THREE.PropertyNode<'float'>, 'float', 'ShadingShift');
export const shadingToony = nodeImmutable(THREE.PropertyNode<'float'>, 'float', 'ShadingToony');
export const rimLightingMix = nodeImmutable(THREE.PropertyNode<'float'>, 'float', 'RimLightingMix');
export const rimMultiply = nodeImmutable(THREE.PropertyNode<'vec3'>, 'vec3', 'RimMultiply');
export const matcap = nodeImmutable(THREE.PropertyNode<'vec3'>, 'vec3', 'matcap');
export const parametricRim = nodeImmutable(THREE.PropertyNode<'vec3'>, 'vec3', 'ParametricRim');
