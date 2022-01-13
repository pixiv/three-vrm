import * as THREE from 'three';
import { VRMSpringBoneJoint } from '../VRMSpringBoneJoint';
export declare class VRMSpringBoneJointHelper extends THREE.Group {
    readonly springBone: VRMSpringBoneJoint;
    private readonly _geometry;
    private readonly _line;
    constructor(springBone: VRMSpringBoneJoint);
    dispose(): void;
    updateMatrixWorld(force: boolean): void;
}
