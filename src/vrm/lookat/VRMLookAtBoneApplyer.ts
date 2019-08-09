import * as THREE from 'three';
import { VRMHumanBones } from '../humanoid';
import { GLTFNode, VRMSchema } from '../types';
import { CurveMapper, DEG2RAD } from './CurveMapper';
import { VRMLookAtApplyer } from './VRMLookAtApplyer';

export class VRMLookAtBoneApplyer extends VRMLookAtApplyer {
  private readonly lookAtHorizontalInner: VRMSchema.FirstPersonDegreeMap;

  private readonly _leftEye?: GLTFNode;
  private readonly _rightEye?: GLTFNode;

  constructor(
    humanBodyBones: VRMHumanBones,
    lookAtHorizontalInner: VRMSchema.FirstPersonDegreeMap,
    lookAtHorizontalOuter: VRMSchema.FirstPersonDegreeMap,
    lookAtVerticalDown: VRMSchema.FirstPersonDegreeMap,
    lookAtVerticalUp: VRMSchema.FirstPersonDegreeMap,
  ) {
    super(lookAtHorizontalOuter, lookAtVerticalDown, lookAtVerticalUp);
    this._leftEye = humanBodyBones.leftEye;
    this._rightEye = humanBodyBones.rightEye;
    this.lookAtHorizontalInner = lookAtHorizontalInner;
  }

  public name(): VRMSchema.FirstPersonLookAtTypeName {
    return VRMSchema.FirstPersonLookAtTypeName.Bone;
  }

  public lookAt(euler: THREE.Euler) {
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

function deg2rad(map: VRMSchema.FirstPersonDegreeMap): VRMSchema.FirstPersonDegreeMap {
  return {
    xRange: typeof map.xRange === 'number' ? DEG2RAD * map.xRange : undefined,
    yRange: typeof map.yRange === 'number' ? DEG2RAD * map.yRange : undefined,
    curve: map.curve,
  };
}
