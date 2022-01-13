import * as THREE from 'three';
export declare class LineAndSphereBufferGeometry extends THREE.BufferGeometry {
    radius: number;
    tail: THREE.Vector3;
    private _currentRadius;
    private _currentTail;
    private readonly _attrPos;
    private readonly _attrIndex;
    constructor();
    update(): void;
    private _buildPosition;
    private _buildIndex;
}
