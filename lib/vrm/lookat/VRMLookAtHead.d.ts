import * as THREE from 'three';
import { VRMHumanBones } from '../humanoid';
import { GLTFNode, RawVector3 } from '../types';
import { VRMLookAtApplyer } from './VRMLookAtApplyer';
export declare class VRMLookAtHead {
    head: GLTFNode;
    autoUpdate: boolean;
    givingUpThreshold?: number;
    dumpingFactor: number;
    leftEyeWorldPosition?: THREE.Vector3;
    rightEyeWorldPosition?: THREE.Vector3;
    private readonly _leftEye?;
    private readonly _rightEye?;
    private readonly _applyer?;
    private _target?;
    private _lastTargetPosition;
    private _lookAtTargetTo?;
    private _lookAtTarget?;
    constructor(humanBones: VRMHumanBones, applyer?: VRMLookAtApplyer);
    getApplyer(): VRMLookAtApplyer | undefined;
    getTarget(): THREE.Object3D | undefined;
    setTarget(target: THREE.Object3D): void;
    getHeadPosition(): RawVector3;
    getFaceDirection(): RawVector3;
    lookAt(x: number, y: number, z: number): void;
    update(): void;
    private setCurrentTargetPosition;
}
