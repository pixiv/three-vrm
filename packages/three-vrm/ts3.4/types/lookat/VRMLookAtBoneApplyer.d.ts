import * as THREE from 'three';
import { VRMHumanoid } from '../humanoid';
import { VRMSchema } from '../types';
import { VRMCurveMapper } from './VRMCurveMapper';
import { VRMLookAtApplyer } from './VRMLookAtApplyer';
/**
 * This class is used by [[VRMLookAtHead]], applies look at direction to eye bones of a VRM.
 */
export declare class VRMLookAtBoneApplyer extends VRMLookAtApplyer {
    readonly type = VRMSchema.FirstPersonLookAtTypeName.Bone;
    private readonly _curveHorizontalInner;
    private readonly _curveHorizontalOuter;
    private readonly _curveVerticalDown;
    private readonly _curveVerticalUp;
    private readonly _leftEye;
    private readonly _rightEye;
    /**
     * Create a new VRMLookAtBoneApplyer.
     *
     * @param humanoid A [[VRMHumanoid]] used by this applier
     * @param curveHorizontalInner A [[VRMCurveMapper]] used for inner transverse direction
     * @param curveHorizontalOuter A [[VRMCurveMapper]] used for outer transverse direction
     * @param curveVerticalDown A [[VRMCurveMapper]] used for down direction
     * @param curveVerticalUp A [[VRMCurveMapper]] used for up direction
     */
    constructor(humanoid: VRMHumanoid, curveHorizontalInner: VRMCurveMapper, curveHorizontalOuter: VRMCurveMapper, curveVerticalDown: VRMCurveMapper, curveVerticalUp: VRMCurveMapper);
    lookAt(euler: THREE.Euler): void;
}
