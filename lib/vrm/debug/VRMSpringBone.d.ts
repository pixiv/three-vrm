import * as THREE from 'three';
import { VRMSpringBone } from '../springbone';
export declare class VRMSpringBoneDebug extends VRMSpringBone {
    private _gizmo?;
    constructor(bone: THREE.Object3D, radius: number, stiffiness: number, gravityDir: THREE.Vector3, gravityPower: number, dragForce: number, colliders?: THREE.Mesh[]);
    getGizmo(): THREE.ArrowHelper;
    update(delta: number): void;
    private updateGizmo;
}
