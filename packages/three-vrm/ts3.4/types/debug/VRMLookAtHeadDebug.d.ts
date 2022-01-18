import * as THREE from 'three';
import { VRMLookAtHead } from '../lookat/VRMLookAtHead';
import { VRMDebugOptions } from './VRMDebugOptions';
export declare class VRMLookAtHeadDebug extends VRMLookAtHead {
    private _faceDirectionHelper?;
    setupHelper(scene: THREE.Object3D, debugOption: VRMDebugOptions): void;
    update(delta: number): void;
}
