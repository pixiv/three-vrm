import * as THREE from 'three';
import { LookAtTypeName } from '../types';
import { CurveMapper } from './CurveMapper';

export abstract class VRMLookAtApplyer {
  public lookAtHorizontalOuter: CurveMapper; // outer for bone, horizontal for blendshape
  public lookAtVerticalDown: CurveMapper;
  public lookAtVerticalUp: CurveMapper;

  protected constructor(
    lookAtHorizontalOuter: CurveMapper,
    lookAtVerticalDown: CurveMapper,
    lookAtVerticalUp: CurveMapper,
  ) {
    this.lookAtHorizontalOuter = lookAtHorizontalOuter;
    this.lookAtVerticalDown = lookAtVerticalDown;
    this.lookAtVerticalUp = lookAtVerticalUp;
  }

  public abstract name(): LookAtTypeName;

  public abstract lookAt(euler: THREE.Euler): void;
}
