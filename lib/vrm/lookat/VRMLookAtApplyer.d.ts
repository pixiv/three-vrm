import * as THREE from 'three';
import { LookAtTypeName, RawVrmFirstPersonDegreemap } from '../types';
export declare abstract class VRMLookAtApplyer {
    lookAtHorizontalOuter: RawVrmFirstPersonDegreemap;
    lookAtVerticalDown: RawVrmFirstPersonDegreemap;
    lookAtVerticalUp: RawVrmFirstPersonDegreemap;
    protected constructor(lookAtHorizontalOuter: RawVrmFirstPersonDegreemap, lookAtVerticalDown: RawVrmFirstPersonDegreemap, lookAtVerticalUp: RawVrmFirstPersonDegreemap);
    abstract name(): LookAtTypeName;
    abstract lookAt(euler: THREE.Euler): void;
}
