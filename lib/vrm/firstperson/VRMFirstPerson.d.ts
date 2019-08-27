import * as THREE from 'three';
import { GLTFMesh, GLTFNode } from '../types';
declare enum FirstPersonFlag {
    Auto = 0,
    Both = 1,
    ThirdPersonOnly = 2,
    FirstPersonOnly = 3
}
export declare class RendererFirstPersonFlags {
    private static parseFirstPersonFlag;
    firstPersonFlag: FirstPersonFlag;
    mesh: GLTFMesh;
    constructor(firstPersonFlag: string | undefined, mesh: GLTFMesh);
}
export declare class VRMFirstPerson {
    private static readonly DEFAULT_FIRSTPERSON_ONLY_LAYER;
    private static readonly DEFAULT_THIRDPERSON_ONLY_LAYER;
    private readonly _firstPersonBone;
    private readonly _meshAnnotations;
    private readonly _firstPersonBoneOffset;
    private _firstPersonOnlyLayer;
    private _thirdPersonOnlyLayer;
    private _initialized;
    constructor(firstPersonBone: GLTFNode, firstPersonBoneOffset: THREE.Vector3, meshAnnotations: RendererFirstPersonFlags[]);
    getFirstPersonBone(): GLTFNode;
    getFirstPersonBoneOffset(): THREE.Vector3;
    getMeshAnnotations(): RendererFirstPersonFlags[];
    setup({ firstPersonOnlyLayer, thirdPersonOnlyLayer, }?: {
        firstPersonOnlyLayer?: number | undefined;
        thirdPersonOnlyLayer?: number | undefined;
    }): void;
    getFirstPersonOnlyLayer(): number;
    getThirdPersonOnlyLayer(): number;
    getFirstPersonWorldPosition(v3: THREE.Vector3): THREE.Vector3;
    private excludeTriangles;
    private createErasedMesh;
    private createHeadlessModelForSkinnedMesh;
    private createHeadlessModel;
    private isEraseTarget;
}
export {};
