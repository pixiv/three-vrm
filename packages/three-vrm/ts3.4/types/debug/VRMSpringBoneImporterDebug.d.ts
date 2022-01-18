import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRMSpringBoneImporter } from '../springbone/VRMSpringBoneImporter';
import { VRMSpringBoneManagerDebug } from './VRMSpringBoneManagerDebug';
import { VRMSpringBoneDebug } from './VRMSpringBoneDebug';
import { VRMSpringBoneParameters } from '../springbone/VRMSpringBoneParameters';
export declare class VRMSpringBoneImporterDebug extends VRMSpringBoneImporter {
    import(gltf: GLTF): Promise<VRMSpringBoneManagerDebug | null>;
    protected _createSpringBone(bone: THREE.Object3D, params: VRMSpringBoneParameters): VRMSpringBoneDebug;
}
