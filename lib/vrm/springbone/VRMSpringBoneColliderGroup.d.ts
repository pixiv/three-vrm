import * as THREE from 'three';
export declare type ColliderMesh = THREE.Mesh;
export interface VRMSpringBoneColliderGroup {
    node: number;
    colliders: ColliderMesh[];
}
