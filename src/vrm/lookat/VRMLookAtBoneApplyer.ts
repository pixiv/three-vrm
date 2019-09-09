import * as THREE from 'three';
import { VRMHumanoid } from '../humanoid';
import { GLTFNode, VRMSchema } from '../types';
import { CurveMapper } from './CurveMapper';
import { VRMLookAtApplyer } from './VRMLookAtApplyer';

function deg2rad(map: VRMSchema.FirstPersonDegreeMap): VRMSchema.FirstPersonDegreeMap {
  return {
    xRange: typeof map.xRange === 'number' ? THREE.Math.DEG2RAD * map.xRange : undefined,
    yRange: typeof map.yRange === 'number' ? THREE.Math.DEG2RAD * map.yRange : undefined,
    curve: map.curve,
  };
}

export class VRMLookAtBoneApplyer extends VRMLookAtApplyer {
  private readonly lookAtHorizontalInner: VRMSchema.FirstPersonDegreeMap;

  private readonly _leftEye: GLTFNode | null;
  private readonly _rightEye: GLTFNode | null;

  constructor(
    humanoid: VRMHumanoid,
    lookAtHorizontalInner: VRMSchema.FirstPersonDegreeMap,
    lookAtHorizontalOuter: VRMSchema.FirstPersonDegreeMap,
    lookAtVerticalDown: VRMSchema.FirstPersonDegreeMap,
    lookAtVerticalUp: VRMSchema.FirstPersonDegreeMap,
  ) {
    super(lookAtHorizontalOuter, lookAtVerticalDown, lookAtVerticalUp);
    this._leftEye = humanoid.getBoneNode(VRMSchema.HumanoidBoneName.LeftEye);
    this._rightEye = humanoid.getBoneNode(VRMSchema.HumanoidBoneName.RightEye);
    this.lookAtHorizontalInner = lookAtHorizontalInner;
  }

  public name(): VRMSchema.FirstPersonLookAtTypeName {
    return VRMSchema.FirstPersonLookAtTypeName.Bone;
  }

  public lookAt(euler: THREE.Euler): void {
    const srcX = euler.x;
    const srcY = euler.y;

    const mapperHorizontalInner = CurveMapper.apply(deg2rad(this.lookAtHorizontalInner));
    const mapperHorizontalOuter = CurveMapper.apply(deg2rad(this.lookAtHorizontalOuter));
    const mapperVerticalDown = CurveMapper.apply(deg2rad(this.lookAtVerticalDown));
    const mapperVerticalUp = CurveMapper.apply(deg2rad(this.lookAtVerticalUp));

    // left
    if (this._leftEye) {
      if (srcX < 0.0) {
        this._leftEye.rotation.x = -mapperVerticalDown.map(-srcX);
      } else {
        this._leftEye.rotation.x = mapperVerticalUp.map(srcX);
      }

      if (srcY < 0.0) {
        this._leftEye.rotation.y = -mapperHorizontalInner.map(-srcY);
      } else {
        this._leftEye.rotation.y = mapperHorizontalOuter.map(srcY);
      }
    }

    // right
    if (this._rightEye) {
      if (srcX < 0.0) {
        this._rightEye.rotation.x = -mapperVerticalDown.map(-srcX);
      } else {
        this._rightEye.rotation.x = mapperVerticalUp.map(srcX);
      }

      if (srcY < 0.0) {
        this._rightEye.rotation.y = -mapperHorizontalOuter.map(-srcY);
      } else {
        this._rightEye.rotation.y = mapperHorizontalInner.map(srcY);
      }
    }
  }
}
