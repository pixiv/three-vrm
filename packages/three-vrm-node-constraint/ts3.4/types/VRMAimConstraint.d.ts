import * as THREE from 'three';
import { VRMNodeConstraint } from './VRMNodeConstraint';
export declare class VRMAimConstraint extends VRMNodeConstraint {
    /**
     * Represents the aim vector used for reference of aim rotation.
     * It must be normalized.
     */
    readonly aimVector: THREE.Vector3;
    /**
     * Represents the up vector used for calculation of aim rotation.
     * It must be normalized.
     */
    readonly upVector: THREE.Vector3;
    freezeAxes: [
        boolean,
        boolean
    ];
    private readonly _quatInitAim;
    private readonly _quatInvInitAim;
    private readonly _quatInitDst;
    setInitState(): void;
    update(): void;
    /**
     * Return a quaternion that represents a diff from the initial -> current orientation of the aim direction.
     * It's aware of its {@link sourceSpace}, {@link freezeAxes}, and {@link weight}.
     * @param target Target quaternion
     */
    private _getAimDiffQuat;
    /**
     * Return a current orientation of the aim direction.
     * It's aware of its {@link sourceSpace} and {@link freezeAxes}.
     * @param target Target quaternion
     */
    private _getAimQuat;
    /**
     * Return the current position of the object.
     * It's aware of its {@link sourceSpace}.
     * @param target Target quaternion
     */
    private _getDestinationPosition;
    /**
     * Return the current position of the source.
     * It's aware of its {@link sourceSpace}.
     * @param target Target quaternion
     */
    private _getSourcePosition;
}
