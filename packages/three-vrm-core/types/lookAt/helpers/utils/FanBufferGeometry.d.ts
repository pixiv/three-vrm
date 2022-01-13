import * as THREE from 'three';
export declare class FanBufferGeometry extends THREE.BufferGeometry {
    theta: number;
    radius: number;
    private _currentTheta;
    private _currentRadius;
    private readonly _attrPos;
    private readonly _attrIndex;
    constructor();
    update(): void;
    private _buildPosition;
    private _buildIndex;
}
