import * as THREE from 'three';
import { VRMBlendShapeProxy } from '../blendshape';
import { VRMSchema } from '../types';
import { CurveMapper } from './CurveMapper';
import { VRMLookAtApplyer } from './VRMLookAtApplyer';

export class VRMLookAtBlendShapeApplyer extends VRMLookAtApplyer {
  public readonly type = VRMSchema.FirstPersonLookAtTypeName.BlendShape;

  private readonly _curveHorizontal: CurveMapper;
  private readonly _curveVerticalDown: CurveMapper;
  private readonly _curveVerticalUp: CurveMapper;

  private readonly _blendShapeProxy: VRMBlendShapeProxy;

  constructor(
    blendShapeProxy: VRMBlendShapeProxy,
    curveHorizontal: CurveMapper,
    curveVerticalDown: CurveMapper,
    curveVerticalUp: CurveMapper,
  ) {
    super();

    this._curveHorizontal = curveHorizontal;
    this._curveVerticalDown = curveVerticalDown;
    this._curveVerticalUp = curveVerticalUp;

    this._blendShapeProxy = blendShapeProxy;
  }

  public name(): VRMSchema.FirstPersonLookAtTypeName {
    return VRMSchema.FirstPersonLookAtTypeName.BlendShape;
  }

  public lookAt(euler: THREE.Euler) {
    const srcX = euler.x;
    const srcY = euler.y;

    if (srcX < 0.0) {
      this._blendShapeProxy.setValue(VRMSchema.BlendShapePresetName.Lookup, 0.0);
      this._blendShapeProxy.setValue(VRMSchema.BlendShapePresetName.Lookdown, this._curveVerticalDown.map(-srcX));
    } else {
      this._blendShapeProxy.setValue(VRMSchema.BlendShapePresetName.Lookdown, 0.0);
      this._blendShapeProxy.setValue(VRMSchema.BlendShapePresetName.Lookup, this._curveVerticalUp.map(srcX));
    }

    if (srcY < 0.0) {
      this._blendShapeProxy.setValue(VRMSchema.BlendShapePresetName.Lookleft, 0.0);
      this._blendShapeProxy.setValue(VRMSchema.BlendShapePresetName.Lookright, this._curveHorizontal.map(-srcY));
    } else {
      this._blendShapeProxy.setValue(VRMSchema.BlendShapePresetName.Lookright, 0.0);
      this._blendShapeProxy.setValue(VRMSchema.BlendShapePresetName.Lookleft, this._curveHorizontal.map(srcY));
    }
  }
}
