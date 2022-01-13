import { VRMNodeConstraint } from './VRMNodeConstraint';
export declare class VRMPositionConstraint extends VRMNodeConstraint {
    freezeAxes: [
        boolean,
        boolean,
        boolean
    ];
    private _v3InitDst;
    private _v3InitSrc;
    setInitState(): void;
    update(): void;
    /**
     * Return a vector that represents a diff from the initial -> current position of the source.
     * It's aware of its {@link sourceSpace}, {@link freezeAxes}, and {@link weight}.
     * @param target Target quaternion
     */
    private _getSourceDiffPosition;
    /**
     * Return the current position of the source.
     * It's aware of its {@link sourceSpace}.
     * @param target Target quaternion
     */
    private _getSourcePosition;
}
