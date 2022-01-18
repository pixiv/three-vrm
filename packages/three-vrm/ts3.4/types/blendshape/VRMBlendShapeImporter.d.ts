import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRMBlendShapeProxy } from './VRMBlendShapeProxy';
/**
 * An importer that imports a [[VRMBlendShape]] from a VRM extension of a GLTF.
 */
export declare class VRMBlendShapeImporter {
    /**
     * Import a [[VRMBlendShape]] from a VRM.
     *
     * @param gltf A parsed result of GLTF taken from GLTFLoader
     */
    import(gltf: GLTF): Promise<VRMBlendShapeProxy | null>;
}
