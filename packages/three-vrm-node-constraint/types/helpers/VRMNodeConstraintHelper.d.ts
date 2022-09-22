import * as THREE from 'three';
import { VRMNodeConstraint } from '../VRMNodeConstraint';
export declare class VRMNodeConstraintHelper extends THREE.Group {
    readonly constraint: VRMNodeConstraint;
    private _line;
    private _attrPosition;
    constructor(constraint: VRMNodeConstraint);
    updateMatrixWorld(force?: boolean): void;
}
