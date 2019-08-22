import * as THREE from 'three';
import { VRMHumanBones } from '../humanoid';
import { GLTFNode } from '../types';
import { LookAtTypeName } from '../types';
import { CurveMapper } from './CurveMapper';
import { VRMLookAtApplyer } from './VRMLookAtApplyer';
import { VRMLookAtHead } from './VRMLookAtHead';

const _euler = new THREE.Euler(0.0, 0.0, 0.0, VRMLookAtHead.EULER_ORDER);

export class VRMLookAtBoneApplyer extends VRMLookAtApplyer {
  private readonly lookAtHorizontalInner: CurveMapper;

  private readonly _leftEye?: GLTFNode;
  private readonly _rightEye?: GLTFNode;

  constructor(
    humanBodyBones: VRMHumanBones,
    lookAtHorizontalInner: CurveMapper,
    lookAtHorizontalOuter: CurveMapper,
    lookAtVerticalDown: CurveMapper,
    lookAtVerticalUp: CurveMapper,
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

    // left
    if (this._leftEye) {
      if (srcX < 0.0) {
        _euler.x = -this.lookAtVerticalDown.map(-srcX);
      } else {
        _euler.x = this.lookAtVerticalUp.map(srcX);
      }

      if (srcY < 0.0) {
        _euler.y = -this.lookAtHorizontalInner.map(-srcY);
      } else {
        _euler.y = this.lookAtHorizontalOuter.map(srcY);
      }

      this._leftEye.quaternion.setFromEuler(_euler);
    }

    // right
    if (this._rightEye) {
      if (srcX < 0.0) {
        _euler.x = -this.lookAtVerticalDown.map(-srcX);
      } else {
        _euler.x = this.lookAtVerticalUp.map(srcX);
      }

      if (srcY < 0.0) {
        _euler.y = -this.lookAtHorizontalOuter.map(-srcY);
      } else {
        _euler.y = this.lookAtHorizontalInner.map(srcY);
      }

      this._rightEye.quaternion.setFromEuler(_euler);
    }
  }
}
