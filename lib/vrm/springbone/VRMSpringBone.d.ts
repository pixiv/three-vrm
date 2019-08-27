import * as THREE from 'three';
export declare const GIZMO_RENDER_ORDER = 10000;
export declare const IDENTITY_MATRIX4: Readonly<THREE.Matrix4>;
export declare class VRMSpringBone {
    readonly radius: number;
    readonly stiffnessForce: number;
    readonly gravityPower: number;
    readonly gravityDir: THREE.Vector3;
    readonly dragForce: number;
    readonly bone: THREE.Object3D;
    readonly colliders: THREE.Mesh[];
    protected currentTail: THREE.Vector3;
    protected prevTail: THREE.Vector3;
    protected nextTail: THREE.Vector3;
    protected boneAxis: THREE.Vector3;
    protected worldBoneLength: number;
    protected worldPosition: THREE.Vector3;
    private _parentWorldRotation;
    private _initialLocalMatrix;
    private _initialLocalRotation;
    private _initialLocalChildPosition;
    constructor(bone: THREE.Object3D, radius: number, stiffiness: number, gravityDir: THREE.Vector3, gravityPower: number, dragForce: number, colliders?: THREE.Mesh[]);
    reset(): void;
    update(delta: number): void;
    private collision;
    private getParentMatrixWorld;
}
