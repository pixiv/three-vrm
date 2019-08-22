import * as THREE from 'three';
import { VRMBlendShapeProxy } from '../blendshape';
import { BlendShapePresetName, LookAtTypeName } from '../types';
import { CurveMapper } from './CurveMapper';
import { VRMLookAtApplyer } from './VRMLookAtApplyer';

export class VRMLookAtBlendShapeApplyer extends VRMLookAtApplyer {
  private readonly _blendShapeProxy: VRMBlendShapeProxy;

  constructor(
    blendShapeProxy: VRMBlendShapeProxy,
    lookAtHorizontalOuter: CurveMapper,
    lookAtVerticalDown: CurveMapper,
    lookAtVerticalUp: CurveMapper,
  ) {
    super(lookAtHorizontalOuter, lookAtVerticalDown, lookAtVerticalUp);
    this._blendShapeProxy = blendShapeProxy;
  }

  public name(): LookAtTypeName {
    return LookAtTypeName.BlendShape;
  }

  public lookAt(euler: THREE.Euler) {
    const srcX = euler.x;
    const srcY = euler.y;

    if (srcX < 0.0) {
      this._blendShapeProxy.setValue(BlendShapePresetName.Lookup, 0.0);
      this._blendShapeProxy.setValue(BlendShapePresetName.Lookdown, this.lookAtVerticalDown.map(-srcX));
    } else {
      this._blendShapeProxy.setValue(BlendShapePresetName.Lookdown, 0.0);
      this._blendShapeProxy.setValue(BlendShapePresetName.Lookup, this.lookAtVerticalUp.map(srcX));
    }

    if (srcY < 0.0) {
      this._blendShapeProxy.setValue(BlendShapePresetName.Lookleft, 0.0);
      this._blendShapeProxy.setValue(BlendShapePresetName.Lookright, this.lookAtHorizontalOuter.map(-srcY));
    } else {
      this._blendShapeProxy.setValue(BlendShapePresetName.Lookright, 0.0);
      this._blendShapeProxy.setValue(BlendShapePresetName.Lookleft, this.lookAtHorizontalOuter.map(srcY));
    }
  }
}
