import * as THREE from 'three';
import { VRMSpringBoneColliderShapeSphere } from '../../VRMSpringBoneColliderShapeSphere';
import { ColliderShapeBufferGeometry } from './ColliderShapeBufferGeometry';
export declare class ColliderShapeSphereBufferGeometry extends THREE.BufferGeometry implements ColliderShapeBufferGeometry {
    worldScale: number;
    private readonly _attrPos;
    private readonly _attrIndex;
    private readonly _shape;
    private _currentRadius;
    private readonly _currentOffset;
    constructor(shape: VRMSpringBoneColliderShapeSphere);
    update(): void;
    private _buildPosition;
    private _buildIndex;
}
