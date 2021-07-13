import * as THREE from 'three';
import { VRMHumanoid } from '../humanoid';
import { GLTFNode, VRMSchema } from '../types';
import { VRMCurveMapper } from './VRMCurveMapper';
import { VRMLookAtApplyer } from './VRMLookAtApplyer';
import { VRMLookAtHead } from './VRMLookAtHead';

const _euler = new THREE.Euler(0.0, 0.0, 0.0, VRMLookAtHead.EULER_ORDER);

/**
 * This class is used by [[VRMLookAtHead]], applies look at direction to eye bones of a VRM.
 */
export class VRMLookAtBoneApplyer extends VRMLookAtApplyer {
  public readonly type = VRMSchema.FirstPersonLookAtTypeName.Bone;

  private readonly _curveHorizontalInner: VRMCurveMapper;
  private readonly _curveHorizontalOuter: VRMCurveMapper;
  private readonly _curveVerticalDown: VRMCurveMapper;
  private readonly _curveVerticalUp: VRMCurveMapper;

  private readonly _leftEye: GLTFNode | null;
  private readonly _rightEye: GLTFNode | null;

  /**
   * Create a new VRMLookAtBoneApplyer.
   *
   * @param humanoid A [[VRMHumanoid]] used by this applier
   * @param curveHorizontalInner A [[VRMCurveMapper]] used for inner transverse direction
   * @param curveHorizontalOuter A [[VRMCurveMapper]] used for outer transverse direction
   * @param curveVerticalDown A [[VRMCurveMapper]] used for down direction
   * @param curveVerticalUp A [[VRMCurveMapper]] used for up direction
   */
  constructor(
    humanoid: VRMHumanoid,
    curveHorizontalInner: VRMCurveMapper,
    curveHorizontalOuter: VRMCurveMapper,
    curveVerticalDown: VRMCurveMapper,
    curveVerticalUp: VRMCurveMapper,
  ) {
    super();

    this._curveHorizontalInner = curveHorizontalInner;
    this._curveHorizontalOuter = curveHorizontalOuter;
    this._curveVerticalDown = curveVerticalDown;
    this._curveVerticalUp = curveVerticalUp;

    this._leftEye = humanoid.getBoneNode(VRMSchema.HumanoidBoneName.LeftEye);
    this._rightEye = humanoid.getBoneNode(VRMSchema.HumanoidBoneName.RightEye);
  }

  public lookAt(euler: THREE.Euler): void {
    const srcX = euler.x;
    const srcY = euler.y;

    // left
    if (this._leftEye) {
      if (srcX < 0.0) {
        _euler.x = -this._curveVerticalDown.map(-srcX);
      } else {
        _euler.x = this._curveVerticalUp.map(srcX);
      }

      if (srcY < 0.0) {
        _euler.y = -this._curveHorizontalInner.map(-srcY);
      } else {
        _euler.y = this._curveHorizontalOuter.map(srcY);
      }

      this._leftEye.quaternion.setFromEuler(_euler);
    }

    // right
    if (this._rightEye) {
      if (srcX < 0.0) {
        _euler.x = -this._curveVerticalDown.map(-srcX);
      } else {
        _euler.x = this._curveVerticalUp.map(srcX);
      }

      if (srcY < 0.0) {
        _euler.y = -this._curveHorizontalOuter.map(-srcY);
      } else {
        _euler.y = this._curveHorizontalInner.map(srcY);
      }

      this._rightEye.quaternion.setFromEuler(_euler);
    }
  }
}
