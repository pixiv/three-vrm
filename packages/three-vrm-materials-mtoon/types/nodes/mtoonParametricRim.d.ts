import * as THREE from 'three/webgpu';
import { NodeRepresentation } from 'three/tsl';
export declare const mtoonParametricRim: THREE.TSL.ShaderNodeFn<[THREE.TSL.ProxiedObject<{
    parametricRimLift: NodeRepresentation;
    parametricRimFresnelPower: NodeRepresentation;
    parametricRimColor: NodeRepresentation;
}>]>;
