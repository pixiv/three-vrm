import type * as THREE from 'three';
import type { VRMFirstPersonMeshAnnotationType } from './VRMFirstPersonMeshAnnotationType';
export interface VRMFirstPersonMeshAnnotation {
    meshes: THREE.Mesh[];
    type: VRMFirstPersonMeshAnnotationType;
}
