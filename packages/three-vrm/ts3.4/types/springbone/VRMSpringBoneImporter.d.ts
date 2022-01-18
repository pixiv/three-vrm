import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRMSchema } from '../types';
import { VRMSpringBone } from './VRMSpringBone';
import { VRMSpringBoneColliderGroup, VRMSpringBoneColliderMesh } from './VRMSpringBoneColliderGroup';
import { VRMSpringBoneGroup, VRMSpringBoneManager } from './VRMSpringBoneManager';
import { VRMSpringBoneParameters } from './VRMSpringBoneParameters';
/**
 * An importer that imports a [[VRMSpringBoneManager]] from a VRM extension of a GLTF.
 */
export declare class VRMSpringBoneImporter {
    /**
     * Import a [[VRMLookAtHead]] from a VRM.
     *
     * @param gltf A parsed result of GLTF taken from GLTFLoader
     */
    import(gltf: GLTF): Promise<VRMSpringBoneManager | null>;
    protected _createSpringBone(bone: THREE.Object3D, params?: VRMSpringBoneParameters): VRMSpringBone;
    protected _importSpringBoneGroupList(gltf: GLTF, schemaSecondaryAnimation: VRMSchema.SecondaryAnimation, colliderGroups: VRMSpringBoneColliderGroup[]): Promise<VRMSpringBoneGroup[]>;
    /**
     * Create an array of [[VRMSpringBoneColliderGroup]].
     *
     * @param gltf A parsed result of GLTF taken from GLTFLoader
     * @param schemaSecondaryAnimation A `secondaryAnimation` field of VRM
     */
    protected _importColliderMeshGroups(gltf: GLTF, schemaSecondaryAnimation: VRMSchema.SecondaryAnimation): Promise<VRMSpringBoneColliderGroup[]>;
    /**
     * Create a collider mesh.
     *
     * @param radius Radius of the new collider mesh
     * @param offset Offest of the new collider mesh
     */
    protected _createColliderMesh(radius: number, offset: THREE.Vector3): VRMSpringBoneColliderMesh;
}
