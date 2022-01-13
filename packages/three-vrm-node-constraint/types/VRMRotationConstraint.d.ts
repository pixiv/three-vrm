import { VRMNodeConstraint } from './VRMNodeConstraint';
export declare class VRMRotationConstraint extends VRMNodeConstraint {
    freezeAxes: [boolean, boolean, boolean];
    private _quatInitSrc;
    private _quatInvInitSrc;
    private _quatInitDst;
    setInitState(): void;
    update(): void;
    /**
     * Return a quaternion that represents a diff from the initial -> current orientation of the source.
     * It's aware of its {@link sourceSpace}, {@link freezeAxes}, and {@link weight}.
     * @param target Target quaternion
     */
    private _getSourceDiffQuat;
    /**
     * Return the current orientation of the source.
     * It's aware of its {@link sourceSpace}.
     * @param target Target quaternion
     */
    private _getSourceQuat;
}
