import * as THREE from 'three';
import { VRMLookAt } from '../VRMLookAt';
export declare class VRMLookAtHelper extends THREE.Group {
    readonly vrmLookAt: VRMLookAt;
    private readonly _meshYaw;
    private readonly _meshPitch;
    private readonly _lineTarget;
    constructor(lookAt: VRMLookAt);
    dispose(): void;
    updateMatrixWorld(force: boolean): void;
}
