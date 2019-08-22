import * as THREE from 'three';
import { LookAtTypeName, RawVrmFirstPersonDegreemap } from '../types';

export abstract class VRMLookAtApplyer {
  public lookAtHorizontalOuter: RawVrmFirstPersonDegreemap; // outer for bone, horizontal for blendshape
  public lookAtVerticalDown: RawVrmFirstPersonDegreemap;
  public lookAtVerticalUp: RawVrmFirstPersonDegreemap;

  protected constructor(
    lookAtHorizontalOuter: RawVrmFirstPersonDegreemap,
    lookAtVerticalDown: RawVrmFirstPersonDegreemap,
    lookAtVerticalUp: RawVrmFirstPersonDegreemap,
  ) {
    this.lookAtHorizontalOuter = lookAtHorizontalOuter;
    this.lookAtVerticalDown = lookAtVerticalDown;
    this.lookAtVerticalUp = lookAtVerticalUp;
  }

  public abstract name(): LookAtTypeName;

  public abstract lookAt(euler: THREE.Euler): void;
}
