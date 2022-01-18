import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRMBlendShapeProxy } from '../blendshape';
import { VRMFirstPerson } from '../firstperson';
import { VRMHumanoid } from '../humanoid';
import { VRMSchema } from '../types';
import { VRMLookAtApplyer } from './VRMLookAtApplyer';
import { VRMLookAtHead } from './VRMLookAtHead';
/**
 * An importer that imports a [[VRMLookAtHead]] from a VRM extension of a GLTF.
 */
export declare class VRMLookAtImporter {
    /**
     * Import a [[VRMLookAtHead]] from a VRM.
     *
     * @param gltf A parsed result of GLTF taken from GLTFLoader
     * @param blendShapeProxy A [[VRMBlendShapeProxy]] instance that represents the VRM
     * @param humanoid A [[VRMHumanoid]] instance that represents the VRM
     */
    import(gltf: GLTF, firstPerson: VRMFirstPerson, blendShapeProxy: VRMBlendShapeProxy, humanoid: VRMHumanoid): VRMLookAtHead | null;
    protected _importApplyer(schemaFirstPerson: VRMSchema.FirstPerson, blendShapeProxy: VRMBlendShapeProxy, humanoid: VRMHumanoid): VRMLookAtApplyer | null;
    private _importCurveMapperBone;
    private _importCurveMapperBlendShape;
}
