import { VRMExpressionManager } from '../expressions';
import * as THREE from 'three';
import type { VRMLookAtApplier } from './VRMLookAtApplier';
import { VRMLookAtRangeMap } from './VRMLookAtRangeMap';
/**
 * A class that applies eye gaze directions to a VRM.
 * It will be used by {@link VRMLookAt}.
 */
export declare class VRMLookAtExpressionApplier implements VRMLookAtApplier {
    /**
     * Represent its type of applier.
     */
    static readonly type = "expression";
    /**
     * Its associated {@link VRMExpressionManager}.
     */
    readonly expressions: VRMExpressionManager;
    /**
     * It won't be used in expression applier.
     * See also: {@link rangeMapHorizontalOuter}
     */
    rangeMapHorizontalInner: VRMLookAtRangeMap;
    /**
     * A {@link VRMLookAtRangeMap} for horizontal movement. Both eyes move left or right.
     */
    rangeMapHorizontalOuter: VRMLookAtRangeMap;
    /**
     * A {@link VRMLookAtRangeMap} for vertical downward movement. Both eyes move upwards.
     */
    rangeMapVerticalDown: VRMLookAtRangeMap;
    /**
     * A {@link VRMLookAtRangeMap} for vertical upward movement. Both eyes move downwards.
     */
    rangeMapVerticalUp: VRMLookAtRangeMap;
    /**
     * Create a new {@link VRMLookAtExpressionApplier}.
     *
     * @param expressions A {@link VRMExpressionManager}
     * @param rangeMapHorizontalInner A {@link VRMLookAtRangeMap} used for inner transverse direction
     * @param rangeMapHorizontalOuter A {@link VRMLookAtRangeMap} used for outer transverse direction
     * @param rangeMapVerticalDown A {@link VRMLookAtRangeMap} used for down direction
     * @param rangeMapVerticalUp A {@link VRMLookAtRangeMap} used for up direction
     */
    constructor(expressions: VRMExpressionManager, rangeMapHorizontalInner: VRMLookAtRangeMap, rangeMapHorizontalOuter: VRMLookAtRangeMap, rangeMapVerticalDown: VRMLookAtRangeMap, rangeMapVerticalUp: VRMLookAtRangeMap);
    /**
     * Apply the input angle to its associated VRM model.
     *
     * @param yaw Rotation around Y axis, in degree
     * @param pitch Rotation around X axis, in degree
     */
    applyYawPitch(yaw: number, pitch: number): void;
    /**
     * @deprecated Use {@link applyYawPitch} instead.
     */
    lookAt(euler: THREE.Euler): void;
}
