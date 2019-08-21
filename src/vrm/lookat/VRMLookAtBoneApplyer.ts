import * as THREE from 'three';
import { VRMHumanBones } from '../humanoid';
import { GLTFNode } from '../types';
import { LookAtTypeName, RawVrmFirstPersonDegreemap } from '../types';
import { CurveMapper, DEG2RAD } from './CurveMapper';
import { VRMLookAtApplyer } from './VRMLookAtApplyer';
import { VRMLookAtHead } from './VRMLookAtHead';

const _euler = new THREE.Euler(0.0, 0.0, 0.0, VRMLookAtHead.EULER_ORDER);

export class VRMLookAtBoneApplyer extends VRMLookAtApplyer {
  private readonly lookAtHorizontalInner: RawVrmFirstPersonDegreemap;

  private readonly _leftEye?: GLTFNode;
  private readonly _rightEye?: GLTFNode;

  constructor(
    humanBodyBones: VRMHumanBones,
    lookAtHorizontalInner: RawVrmFirstPersonDegreemap,
    lookAtHorizontalOuter: RawVrmFirstPersonDegreemap,
    lookAtVerticalDown: RawVrmFirstPersonDegreemap,
    lookAtVerticalUp: RawVrmFirstPersonDegreemap,
  ) {
    super(lookAtHorizontalOuter, lookAtVerticalDown, lookAtVerticalUp);
    this._leftEye = humanBodyBones.leftEye;
    this._rightEye = humanBodyBones.rightEye;
    this.lookAtHorizontalInner = lookAtHorizontalInner;
  }

  public name(): LookAtTypeName {
    return LookAtTypeName.Bone;
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
        _euler.x = -mapperVerticalDown.map(-srcX);
      } else {
        _euler.x = mapperVerticalUp.map(srcX);
      }

      if (srcY < 0.0) {
        _euler.y = -mapperHorizontalInner.map(-srcY);
      } else {
        _euler.y = mapperHorizontalOuter.map(srcY);
      }

      this._leftEye.quaternion.setFromEuler(_euler);
    }

    // right
    if (this._rightEye) {
      if (srcX < 0.0) {
        _euler.x = -mapperVerticalDown.map(-srcX);
      } else {
        _euler.x = mapperVerticalUp.map(srcX);
      }

      if (srcY < 0.0) {
        _euler.y = -mapperHorizontalOuter.map(-srcY);
      } else {
        _euler.y = mapperHorizontalInner.map(srcY);
      }

      this._rightEye.quaternion.setFromEuler(_euler);
    }
  }
}

function deg2rad(map: RawVrmFirstPersonDegreemap): RawVrmFirstPersonDegreemap {
  return {
    xRange: typeof map.xRange === 'number' ? DEG2RAD * map.xRange : undefined,
    yRange: typeof map.yRange === 'number' ? DEG2RAD * map.yRange : undefined,
    curve: map.curve,
  };
}
