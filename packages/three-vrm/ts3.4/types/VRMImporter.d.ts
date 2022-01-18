import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRMBlendShapeImporter } from './blendshape';
import { VRMFirstPersonImporter } from './firstperson';
import { VRMHumanoidImporter } from './humanoid/VRMHumanoidImporter';
import { VRMLookAtImporter } from './lookat/VRMLookAtImporter';
import { VRMMaterialImporter } from './material';
import { VRMMetaImporter } from './meta/VRMMetaImporter';
import { VRMSpringBoneImporter } from './springbone/VRMSpringBoneImporter';
import { VRM } from './VRM';
export interface VRMImporterOptions {
    metaImporter?: VRMMetaImporter;
    lookAtImporter?: VRMLookAtImporter;
    humanoidImporter?: VRMHumanoidImporter;
    blendShapeImporter?: VRMBlendShapeImporter;
    firstPersonImporter?: VRMFirstPersonImporter;
    materialImporter?: VRMMaterialImporter;
    springBoneImporter?: VRMSpringBoneImporter;
}
/**
 * An importer that imports a [[VRM]] from a VRM extension of a GLTF.
 */
export declare class VRMImporter {
    protected readonly _metaImporter: VRMMetaImporter;
    protected readonly _blendShapeImporter: VRMBlendShapeImporter;
    protected readonly _lookAtImporter: VRMLookAtImporter;
    protected readonly _humanoidImporter: VRMHumanoidImporter;
    protected readonly _firstPersonImporter: VRMFirstPersonImporter;
    protected readonly _materialImporter: VRMMaterialImporter;
    protected readonly _springBoneImporter: VRMSpringBoneImporter;
    /**
     * Create a new VRMImporter.
     *
     * @param options [[VRMImporterOptions]], optionally contains importers for each component
     */
    constructor(options?: VRMImporterOptions);
    /**
     * Receive a GLTF object retrieved from `THREE.GLTFLoader` and create a new [[VRM]] instance.
     *
     * @param gltf A parsed result of GLTF taken from GLTFLoader
     */
    import(gltf: GLTF): Promise<VRM>;
}
