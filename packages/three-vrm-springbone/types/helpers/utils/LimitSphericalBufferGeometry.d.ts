import * as THREE from 'three';
import { LimitBufferGeometry } from './LimitBufferGeometry';
import { VRMSpringBoneLimitSpherical } from '../../VRMSpringBoneLimitSpherical';
export declare class LimitSphericalBufferGeometry extends THREE.BufferGeometry implements LimitBufferGeometry {
    private readonly _attrPos;
    private readonly _attrIndex;
    private readonly _limit;
    private _currentPitch;
    private _currentYaw;
    constructor(limit: VRMSpringBoneLimitSpherical);
    update(): void;
    private _buildPosition;
    private _buildIndex;
}
