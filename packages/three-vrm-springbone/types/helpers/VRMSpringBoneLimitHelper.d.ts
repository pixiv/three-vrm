import * as THREE from 'three';
import { VRMSpringBoneLimit } from '../VRMSpringBoneLimit';
import { VRMSpringBoneJoint } from '../VRMSpringBoneJoint';
export declare class VRMSpringBoneLimitHelper extends THREE.Group {
    readonly limit: VRMSpringBoneLimit;
    readonly joint: VRMSpringBoneJoint;
    private readonly _geometry;
    private readonly _line;
    constructor(limit: VRMSpringBoneLimit, joint: VRMSpringBoneJoint);
    dispose(): void;
    updateMatrixWorld(force: boolean): void;
}
