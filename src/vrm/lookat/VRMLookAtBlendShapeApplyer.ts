import * as THREE from 'three';
import { VRMBlendShapeProxy } from '../blendshape';
import { BlendShapePresetName, LookAtTypeName, RawVrmFirstPersonDegreemap } from '../types';
import { CurveMapper, DEG2RAD } from './CurveMapper';
import { VRMLookAtApplyer } from './VRMLookAtApplyer';

export class VRMLookAtBlendShapeApplyer extends VRMLookAtApplyer {
  private readonly _blendShapeProxy: VRMBlendShapeProxy;

  constructor(
    blendShapeProxy: VRMBlendShapeProxy,
    lookAtHorizontalOuter: RawVrmFirstPersonDegreemap,
    lookAtVerticalDown: RawVrmFirstPersonDegreemap,
    lookAtVerticalUp: RawVrmFirstPersonDegreemap,
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

    const mapperHorizontal = CurveMapper.apply(deg2rad(this.lookAtHorizontalOuter));
    const mapperVerticalDown = CurveMapper.apply(deg2rad(this.lookAtVerticalDown));
    const mapperVerticalUp = CurveMapper.apply(deg2rad(this.lookAtVerticalUp));

    if (srcY < 0.0) {
      this._blendShapeProxy.setValue(BlendShapePresetName.Lookleft, 0.0);
      this._blendShapeProxy.setValue(BlendShapePresetName.Lookright, mapperHorizontal.map(-srcY));
    } else {
      this._blendShapeProxy.setValue(BlendShapePresetName.Lookright, 0.0);
      this._blendShapeProxy.setValue(BlendShapePresetName.Lookleft, mapperHorizontal.map(srcY));
    }
    if (srcX < 0.0) {
      this._blendShapeProxy.setValue(BlendShapePresetName.Lookdown, 0.0);
      this._blendShapeProxy.setValue(BlendShapePresetName.Lookup, mapperVerticalUp.map(-srcX));
    } else {
      this._blendShapeProxy.setValue(BlendShapePresetName.Lookup, 0.0);
      this._blendShapeProxy.setValue(BlendShapePresetName.Lookdown, mapperVerticalDown.map(srcX));
    }
  }
}

function deg2rad(map: RawVrmFirstPersonDegreemap): RawVrmFirstPersonDegreemap {
  return {
    xRange: typeof map.xRange === 'number' ? DEG2RAD * map.xRange : undefined,
    yRange: map.yRange, // yRange means weight not radian
    curve: map.curve,
  };
}
