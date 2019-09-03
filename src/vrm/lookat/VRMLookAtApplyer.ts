import * as THREE from 'three';
import { VRMSchema } from '../types';

export abstract class VRMLookAtApplyer {
  public lookAtHorizontalOuter: VRMSchema.FirstPersonDegreeMap;
  public lookAtVerticalDown: VRMSchema.FirstPersonDegreeMap;
  public lookAtVerticalUp: VRMSchema.FirstPersonDegreeMap;

  protected constructor(
    lookAtHorizontalOuter: VRMSchema.FirstPersonDegreeMap,
    lookAtVerticalDown: VRMSchema.FirstPersonDegreeMap,
    lookAtVerticalUp: VRMSchema.FirstPersonDegreeMap,
  ) {
    this.lookAtHorizontalOuter = lookAtHorizontalOuter;
    this.lookAtVerticalDown = lookAtVerticalDown;
    this.lookAtVerticalUp = lookAtVerticalUp;
  }

  public abstract name(): VRMSchema.FirstPersonLookAtTypeName;

  public abstract lookAt(euler: THREE.Euler): void;
}
