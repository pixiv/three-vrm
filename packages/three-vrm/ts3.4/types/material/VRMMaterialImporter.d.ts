import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRMSchema } from '../types';
/**
 * Options for a [[VRMMaterialImporter]] instance.
 */
export interface VRMMaterialImporterOptions {
    /**
     * Specify the encoding of input uniform colors and textures.
     *
     * When your `renderer.outputEncoding` is `THREE.LinearEncoding`, use `THREE.LinearEncoding`.
     * When your `renderer.outputEncoding` is `THREE.sRGBEncoding`, use `THREE.sRGBEncoding`.
     *
     * The importer will use `THREE.LinearEncoding` if this option isn't specified.
     *
     * See also: https://threejs.org/docs/#api/en/renderers/WebGLRenderer.outputEncoding
     */
    encoding?: THREE.TextureEncoding;
    /**
     * A function that returns a `Promise` of environment map texture.
     * The importer will attempt to call this function when it have to use an envmap.
     */
    requestEnvMap?: () => Promise<THREE.Texture | null>;
}
/**
 * An importer that imports VRM materials from a VRM extension of a GLTF.
 */
export declare class VRMMaterialImporter {
    private readonly _encoding;
    private readonly _requestEnvMap?;
    /**
     * Create a new VRMMaterialImporter.
     *
     * @param options Options of the VRMMaterialImporter
     */
    constructor(options?: VRMMaterialImporterOptions);
    /**
     * Convert all the materials of given GLTF based on VRM extension field `materialProperties`.
     *
     * @param gltf A parsed result of GLTF taken from GLTFLoader
     */
    convertGLTFMaterials(gltf: GLTF): Promise<THREE.Material[] | null>;
    createVRMMaterials(originalMaterial: THREE.Material, vrmProps: VRMSchema.Material, gltf: GLTF): Promise<{
        surface: THREE.Material;
        outline?: THREE.Material;
    }>;
    private _renameMaterialProperty;
    private _convertGLTFMaterial;
    private _extractMaterialProperties;
}
