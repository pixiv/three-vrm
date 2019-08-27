import * as THREE from 'three';
import { RawVrmMaterial } from '../types';
export interface MaterialConverterOptions {
    requestEnvMap?: () => Promise<THREE.Texture | null>;
}
export declare class MaterialConverter {
    private readonly _colorSpaceGamma;
    private readonly _options;
    constructor(colorSpaceGamma: boolean, options?: MaterialConverterOptions);
    convertGLTFMaterials(gltf: THREE.GLTF): Promise<THREE.GLTF>;
    createVRMMaterials(originalMaterial: THREE.Material, vrmProps: RawVrmMaterial, gltf: THREE.GLTF): Promise<{
        surface: THREE.Material;
        outline?: THREE.Material;
    }>;
    private renameMaterialProperty;
    private convertGLTFMaterial;
    private extractMaterialProperties;
}
