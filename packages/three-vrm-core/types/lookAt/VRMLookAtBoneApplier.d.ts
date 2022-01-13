import { VRMHumanoid } from '../humanoid';
import * as THREE from 'three';
import type { VRMLookAtApplier } from './VRMLookAtApplier';
import { VRMLookAtRangeMap } from './VRMLookAtRangeMap';
/**
 * A class that applies eye gaze directions to a VRM.
 * It will be used by {@link VRMLookAt}.
 */
export declare class VRMLookAtBoneApplier implements VRMLookAtApplier {
    /**
     * Represent its type of applier.
     */
    static readonly type = "bone";
    /**
     * Its associated {@link VRMHumanoid}.
     */
    readonly humanoid: VRMHumanoid;
    /**
     * A {@link VRMLookAtRangeMap} for horizontal inward movement. The left eye moves right. The right eye moves left.
     */
    rangeMapHorizontalInner: VRMLookAtRangeMap;
    /**
     * A {@link VRMLookAtRangeMap} for horizontal outward movement. The left eye moves left. The right eye moves right.
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
     * Create a new {@link VRMLookAtBoneApplier}.
     *
     * @param humanoid A {@link VRMHumanoid}
     * @param rangeMapHorizontalInner A {@link VRMLookAtRangeMap} used for inner transverse direction
     * @param rangeMapHorizontalOuter A {@link VRMLookAtRangeMap} used for outer transverse direction
     * @param rangeMapVerticalDown A {@link VRMLookAtRangeMap} used for down direction
     * @param rangeMapVerticalUp A {@link VRMLookAtRangeMap} used for up direction
     */
    constructor(humanoid: VRMHumanoid, rangeMapHorizontalInner: VRMLookAtRangeMap, rangeMapHorizontalOuter: VRMLookAtRangeMap, rangeMapVerticalDown: VRMLookAtRangeMap, rangeMapVerticalUp: VRMLookAtRangeMap);
    /**
     * Apply the input angle to its associated VRM model.
     *
     * @param angle An input angle
     */
    lookAt(angle: THREE.Euler): void;
}
