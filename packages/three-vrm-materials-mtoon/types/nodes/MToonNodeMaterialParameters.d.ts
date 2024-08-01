import * as THREE from 'three/webgpu';
export interface MToonNodeMaterialParameters extends THREE.ShaderMaterialParameters {
    transparentWithZWrite?: boolean;
    shadeColorNode?: THREE.Swizzable | null;
    shadingShiftNode?: THREE.Node | null;
    shadingToonyNode?: THREE.Node | null;
    rimLightingMixNode?: THREE.Node | null;
    rimMultiplyNode?: THREE.Node | null;
    matcapNode?: THREE.Node | null;
    parametricRimColorNode?: THREE.Swizzable | null;
    parametricRimLiftNode?: THREE.Node | null;
    parametricRimFresnelPowerNode?: THREE.Node | null;
}
