import * as THREE from 'three';
import { VRMSpringBoneJoint } from '../../VRMSpringBoneJoint';
export declare class SpringBoneBufferGeometry extends THREE.BufferGeometry {
    worldScale: number;
    private readonly _attrPos;
    private readonly _attrIndex;
    private readonly _springBone;
    private _currentRadius;
    private readonly _currentTail;
    constructor(springBone: VRMSpringBoneJoint);
    update(): void;
    private _buildPosition;
    private _buildIndex;
}
