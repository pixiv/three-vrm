import * as THREE from 'three';
import { VRMBlendShapeProxy } from '../blendshape';
import { VRMSchema } from '../types';
import { VRMCurveMapper } from './VRMCurveMapper';
import { VRMLookAtApplyer } from './VRMLookAtApplyer';
/**
 * This class is used by [[VRMLookAtHead]], applies look at direction to eye blend shapes of a VRM.
 */
export declare class VRMLookAtBlendShapeApplyer extends VRMLookAtApplyer {
    readonly type = VRMSchema.FirstPersonLookAtTypeName.BlendShape;
    private readonly _curveHorizontal;
    private readonly _curveVerticalDown;
    private readonly _curveVerticalUp;
    private readonly _blendShapeProxy;
    /**
     * Create a new VRMLookAtBlendShapeApplyer.
     *
     * @param blendShapeProxy A [[VRMBlendShapeProxy]] used by this applier
     * @param curveHorizontal A [[VRMCurveMapper]] used for transverse direction
     * @param curveVerticalDown A [[VRMCurveMapper]] used for down direction
     * @param curveVerticalUp A [[VRMCurveMapper]] used for up direction
     */
    constructor(blendShapeProxy: VRMBlendShapeProxy, curveHorizontal: VRMCurveMapper, curveVerticalDown: VRMCurveMapper, curveVerticalUp: VRMCurveMapper);
    name(): VRMSchema.FirstPersonLookAtTypeName;
    lookAt(euler: THREE.Euler): void;
}
