import type { VRMFirstPersonMeshAnnotationType } from './VRMFirstPersonMeshAnnotationType';

export interface VRMFirstPersonMeshAnnotation {
  meshes: THREE.Mesh[];
  firstPersonType: VRMFirstPersonMeshAnnotationType;
}
