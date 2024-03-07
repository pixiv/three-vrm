import * as THREE from 'three';
import { VRMFirstPersonMeshAnnotationType } from './VRMFirstPersonMeshAnnotationType';
export interface VRMFirstPersonMeshAnnotation {
    meshes: THREE.Mesh[];
    type: VRMFirstPersonMeshAnnotationType;
}
