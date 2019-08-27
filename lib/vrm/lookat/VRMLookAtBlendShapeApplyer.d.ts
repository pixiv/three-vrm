import * as THREE from 'three';
import { VRMBlendShapeProxy } from '../blendshape';
import { LookAtTypeName, RawVrmFirstPersonDegreemap } from '../types';
import { VRMLookAtApplyer } from './VRMLookAtApplyer';
export declare class VRMLookAtBlendShapeApplyer extends VRMLookAtApplyer {
    private readonly _blendShapeProxy;
    constructor(blendShapeProxy: VRMBlendShapeProxy, lookAtHorizontalOuter: RawVrmFirstPersonDegreemap, lookAtVerticalDown: RawVrmFirstPersonDegreemap, lookAtVerticalUp: RawVrmFirstPersonDegreemap);
    name(): LookAtTypeName;
    lookAt(euler: THREE.Euler): void;
}
