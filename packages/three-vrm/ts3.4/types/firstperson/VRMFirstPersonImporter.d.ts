import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRMHumanoid } from '../humanoid';
import { VRMFirstPerson } from './VRMFirstPerson';
/**
 * An importer that imports a [[VRMFirstPerson]] from a VRM extension of a GLTF.
 */
export declare class VRMFirstPersonImporter {
    /**
     * Import a [[VRMFirstPerson]] from a VRM.
     *
     * @param gltf A parsed result of GLTF taken from GLTFLoader
     * @param humanoid A [[VRMHumanoid]] instance that represents the VRM
     */
    import(gltf: GLTF, humanoid: VRMHumanoid): Promise<VRMFirstPerson | null>;
}
