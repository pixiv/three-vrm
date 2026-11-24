import * as THREE from 'three';
import { LimitBufferGeometry } from './LimitBufferGeometry';
import { VRMSpringBoneLimitHinge } from '../../VRMSpringBoneLimitHinge';
export declare class LimitHingeBufferGeometry extends THREE.BufferGeometry implements LimitBufferGeometry {
    private readonly _attrPos;
    private readonly _attrIndex;
    private readonly _limit;
    private _currentAngle;
    constructor(limit: VRMSpringBoneLimitHinge);
    update(): void;
    private _buildPosition;
    private _buildIndex;
}
