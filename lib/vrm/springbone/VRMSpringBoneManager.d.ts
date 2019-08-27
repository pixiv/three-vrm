import * as THREE from 'three';
import { VRMSpringBone } from './VRMSpringBone';
export declare type VRMSpringBoneGroup = VRMSpringBone[];
export declare class VRMSpringBoneManager {
    readonly springBoneGroupList: VRMSpringBoneGroup[];
    loadGLTF(gltf: THREE.GLTF): Promise<void>;
    lateUpdate(delta: number): void;
    reset(): void;
    protected isColiderMeshVisible(): boolean;
    protected createSpringBone(gltf: THREE.GLTF, bone: THREE.Object3D, hitRadius: number, stiffiness: number, gravityDir: THREE.Vector3, gravityPower: number, dragForce: number, colliders?: THREE.Mesh[]): VRMSpringBone;
    private getColliderMeshGroups;
}
