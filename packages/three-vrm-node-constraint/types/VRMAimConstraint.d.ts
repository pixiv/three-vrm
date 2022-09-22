import * as THREE from 'three';
import { VRMNodeConstraint } from './VRMNodeConstraint';
/**
 * A constraint that makes it look at a source object.
 *
 * See: https://github.com/vrm-c/vrm-specification/tree/master/specification/VRMC_node_constraint-1.0_beta#roll-constraint
 */
export declare class VRMAimConstraint extends VRMNodeConstraint {
    /**
     * The aim axis of the constraint.
     */
    get aimAxis(): 'PositiveX' | 'NegativeX' | 'PositiveY' | 'NegativeY' | 'PositiveZ' | 'NegativeZ';
    /**
     * The aim axis of the constraint.
     */
    set aimAxis(aimAxis: 'PositiveX' | 'NegativeX' | 'PositiveY' | 'NegativeY' | 'PositiveZ' | 'NegativeZ');
    /**
     * The aim axis of the constraint.
     */
    private _aimAxis;
    /**
     * The {@link _aimAxis} but in an actual Vector3 form.
     */
    private _v3AimAxis;
    /**
     * The rest quaternion of the {@link destination}.
     */
    private _dstRestQuat;
    get dependencies(): Set<THREE.Object3D<THREE.Event>>;
    constructor(destination: THREE.Object3D, source: THREE.Object3D);
    setInitState(): void;
    update(): void;
}
