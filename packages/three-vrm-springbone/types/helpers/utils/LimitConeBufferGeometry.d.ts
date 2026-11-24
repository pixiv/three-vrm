import * as THREE from 'three';
import { LimitBufferGeometry } from './LimitBufferGeometry';
import { VRMSpringBoneLimitCone } from '../../VRMSpringBoneLimitCone';
export declare class LimitConeBufferGeometry extends THREE.BufferGeometry implements LimitBufferGeometry {
    private readonly _attrPos;
    private readonly _attrIndex;
    private readonly _limit;
    private _currentAngle;
    constructor(limit: VRMSpringBoneLimitCone);
    update(): void;
    private _buildPosition;
    private _buildIndex;
}
