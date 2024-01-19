import * as THREE from 'three';
import { VRMNodeConstraint } from './VRMNodeConstraint';
/**
 * A constraint that transfers a rotation around one axis of a source.
 *
 * See: https://github.com/vrm-c/vrm-specification/tree/master/specification/VRMC_node_constraint-1.0_beta#roll-constraint
 */
export declare class VRMRotationConstraint extends VRMNodeConstraint {
    /**
     * The rest quaternion of the {@link destination}.
     */
    private _dstRestQuat;
    /**
     * The inverse of the rest quaternion of the {@link source}.
     */
    private _invSrcRestQuat;
    get dependencies(): Set<THREE.Object3D>;
    constructor(destination: THREE.Object3D, source: THREE.Object3D);
    setInitState(): void;
    update(): void;
}
