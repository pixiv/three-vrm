import * as THREE from 'three';
import { VRMHumanoid } from '../VRMHumanoid';
export declare class VRMHumanoidHelper extends THREE.Group {
    readonly vrmHumanoid: VRMHumanoid;
    private _boneAxesMap;
    constructor(humanoid: VRMHumanoid);
    dispose(): void;
    updateMatrixWorld(force: boolean): void;
}
