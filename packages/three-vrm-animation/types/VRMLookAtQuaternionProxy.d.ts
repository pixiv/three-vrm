import { VRMLookAt } from '@pixiv/three-vrm-core';
import * as THREE from 'three';
export declare class VRMLookAtQuaternionProxy extends THREE.Object3D {
    readonly vrmLookAt: VRMLookAt;
    readonly type: string | 'VRMLookAtQuaternionProxy';
    constructor(lookAt: VRMLookAt);
    private _applyToLookAt;
}
