import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRMHumanoid } from './VRMHumanoid';
/**
 * An importer that imports a [[VRMHumanoid]] from a VRM extension of a GLTF.
 */
export declare class VRMHumanoidImporter {
    /**
     * Import a [[VRMHumanoid]] from a VRM.
     *
     * @param gltf A parsed result of GLTF taken from GLTFLoader
     */
    import(gltf: GLTF): Promise<VRMHumanoid | null>;
}
