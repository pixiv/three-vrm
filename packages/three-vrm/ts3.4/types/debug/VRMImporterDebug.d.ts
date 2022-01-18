import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRMImporter, VRMImporterOptions } from '../VRMImporter';
import { VRMDebug } from './VRMDebug';
import { VRMDebugOptions } from './VRMDebugOptions';
/**
 * An importer that imports a [[VRMDebug]] from a VRM extension of a GLTF.
 */
export declare class VRMImporterDebug extends VRMImporter {
    constructor(options?: VRMImporterOptions);
    import(gltf: GLTF, debugOptions?: VRMDebugOptions): Promise<VRMDebug>;
}
