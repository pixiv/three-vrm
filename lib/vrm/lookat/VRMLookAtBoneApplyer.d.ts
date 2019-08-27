import * as THREE from 'three';
import { VRMHumanBones } from '../humanoid';
import { LookAtTypeName, RawVrmFirstPersonDegreemap } from '../types';
import { VRMLookAtApplyer } from './VRMLookAtApplyer';
export declare class VRMLookAtBoneApplyer extends VRMLookAtApplyer {
    private readonly lookAtHorizontalInner;
    private readonly _leftEye?;
    private readonly _rightEye?;
    constructor(humanBodyBones: VRMHumanBones, lookAtHorizontalInner: RawVrmFirstPersonDegreemap, lookAtHorizontalOuter: RawVrmFirstPersonDegreemap, lookAtVerticalDown: RawVrmFirstPersonDegreemap, lookAtVerticalUp: RawVrmFirstPersonDegreemap);
    name(): LookAtTypeName;
    lookAt(euler: THREE.Euler): void;
}
