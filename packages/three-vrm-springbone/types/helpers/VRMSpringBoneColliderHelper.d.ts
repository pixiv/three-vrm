import * as THREE from 'three';
import { VRMSpringBoneCollider } from '../VRMSpringBoneCollider';
export declare class VRMSpringBoneColliderHelper extends THREE.Group {
    readonly collider: VRMSpringBoneCollider;
    private readonly _geometry;
    private readonly _line;
    constructor(collider: VRMSpringBoneCollider);
    dispose(): void;
    updateMatrixWorld(force: boolean): void;
}
