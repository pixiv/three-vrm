import * as THREE from 'three';
import { VRMNodeConstraint } from './VRMNodeConstraint';
/**
 * A constraint that transfers a rotation around one axis of a source.
 *
 * See: https://github.com/vrm-c/vrm-specification/tree/master/specification/VRMC_node_constraint-1.0_beta#roll-constraint
 */
export declare class VRMRollConstraint extends VRMNodeConstraint {
    /**
     * The roll axis of the constraint.
     */
    get rollAxis(): 'X' | 'Y' | 'Z';
    /**
     * The roll axis of the constraint.
     */
    set rollAxis(rollAxis: 'X' | 'Y' | 'Z');
    /**
     * The roll axis of the constraint.
     */
    private _rollAxis;
    /**
     * The {@link _rollAxis} but in an actual Vector3 form.
     */
    private _v3RollAxis;
    /**
     * The rest quaternion of the {@link destination}.
     */
    private _dstRestQuat;
    /**
     * The inverse of the rest quaternion of the {@link destination}.
     */
    private _invDstRestQuat;
    /**
     * `srcRestQuat.invert() * dstRestQuat`.
     */
    private _invSrcRestQuatMulDstRestQuat;
    get dependencies(): Set<THREE.Object3D>;
    constructor(destination: THREE.Object3D, source: THREE.Object3D);
    setInitState(): void;
    update(): void;
}
