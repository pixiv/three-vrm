import * as THREE from 'three';
import { VRMBlendShapePresetName } from '../blendshape/VRMBlendShapePresetName';
import { VRMBlendShapeProxy } from '../blendshape/VRMBlendShapeProxy';
import { VRMCurveMapper } from './VRMCurveMapper';
import { VRMLookAtApplyer } from './VRMLookAtApplyer';
import { VRMLookAtTypeName } from './VRMLookAtTypeName';

/**
 * This class is used by [[VRMLookAtHead]], applies look at direction to eye blend shapes of a VRM.
 */
export class VRMLookAtBlendShapeApplyer extends VRMLookAtApplyer {
  public readonly type = VRMLookAtTypeName.BlendShape;

  private readonly _curveHorizontal: VRMCurveMapper;
  private readonly _curveVerticalDown: VRMCurveMapper;
  private readonly _curveVerticalUp: VRMCurveMapper;

  private readonly _blendShapeProxy: VRMBlendShapeProxy;

  /**
   * Create a new VRMLookAtBlendShapeApplyer.
   *
   * @param blendShapeProxy A [[VRMBlendShapeProxy]] used by this applier
   * @param curveHorizontal A [[VRMCurveMapper]] used for transverse direction
   * @param curveVerticalDown A [[VRMCurveMapper]] used for down direction
   * @param curveVerticalUp A [[VRMCurveMapper]] used for up direction
   */
  constructor(
    blendShapeProxy: VRMBlendShapeProxy,
    curveHorizontal: VRMCurveMapper,
    curveVerticalDown: VRMCurveMapper,
    curveVerticalUp: VRMCurveMapper,
  ) {
    super();

    this._curveHorizontal = curveHorizontal;
    this._curveVerticalDown = curveVerticalDown;
    this._curveVerticalUp = curveVerticalUp;

    this._blendShapeProxy = blendShapeProxy;
  }

  public name(): VRMLookAtTypeName {
    return VRMLookAtTypeName.BlendShape;
  }

  public lookAt(euler: THREE.Euler): void {
    const srcX = euler.x;
    const srcY = euler.y;

    if (srcX < 0.0) {
      this._blendShapeProxy.setValue(VRMBlendShapePresetName.Lookup, 0.0);
      this._blendShapeProxy.setValue(VRMBlendShapePresetName.Lookdown, this._curveVerticalDown.map(-srcX));
    } else {
      this._blendShapeProxy.setValue(VRMBlendShapePresetName.Lookdown, 0.0);
      this._blendShapeProxy.setValue(VRMBlendShapePresetName.Lookup, this._curveVerticalUp.map(srcX));
    }

    if (srcY < 0.0) {
      this._blendShapeProxy.setValue(VRMBlendShapePresetName.Lookleft, 0.0);
      this._blendShapeProxy.setValue(VRMBlendShapePresetName.Lookright, this._curveHorizontal.map(-srcY));
    } else {
      this._blendShapeProxy.setValue(VRMBlendShapePresetName.Lookright, 0.0);
      this._blendShapeProxy.setValue(VRMBlendShapePresetName.Lookleft, this._curveHorizontal.map(srcY));
    }
  }
}
