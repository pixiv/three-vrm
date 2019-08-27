import * as THREE from 'three';
import { VRMSpringBone, VRMSpringBoneManager } from '../springbone';
export declare class VRMSpringBoneManagerDebug extends VRMSpringBoneManager {
    protected isColiderMeshVisible(): boolean;
    protected createSpringBone(gltf: THREE.GLTF, bone: THREE.Object3D, hitRadius: number, stiffiness: number, gravityDir: THREE.Vector3, gravityPower: number, dragForce: number, colliders?: THREE.Mesh[]): VRMSpringBone;
}
