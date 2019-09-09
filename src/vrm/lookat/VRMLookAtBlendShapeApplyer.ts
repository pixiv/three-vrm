import * as THREE from 'three';
import { VRMBlendShapeProxy } from '../blendshape';
import { VRMSchema } from '../types';
import { CurveMapper } from './CurveMapper';
import { VRMLookAtApplyer } from './VRMLookAtApplyer';

function deg2rad(map: VRMSchema.FirstPersonDegreeMap): VRMSchema.FirstPersonDegreeMap {
  return {
    xRange: typeof map.xRange === 'number' ? THREE.Math.DEG2RAD * map.xRange : undefined,
    yRange: map.yRange, // yRange means weight not radian
    curve: map.curve,
  };
}

export class VRMLookAtBlendShapeApplyer extends VRMLookAtApplyer {
  private readonly _blendShapeProxy: VRMBlendShapeProxy;

  constructor(
    blendShapeProxy: VRMBlendShapeProxy,
    lookAtHorizontalOuter: VRMSchema.FirstPersonDegreeMap,
    lookAtVerticalDown: VRMSchema.FirstPersonDegreeMap,
    lookAtVerticalUp: VRMSchema.FirstPersonDegreeMap,
  ) {
    super(lookAtHorizontalOuter, lookAtVerticalDown, lookAtVerticalUp);
    this._blendShapeProxy = blendShapeProxy;
  }

  public name(): VRMSchema.FirstPersonLookAtTypeName {
    return VRMSchema.FirstPersonLookAtTypeName.BlendShape;
  }

  public lookAt(euler: THREE.Euler): void {
    const srcX = euler.x;
    const srcY = euler.y;

    const mapperHorizontal = CurveMapper.apply(deg2rad(this.lookAtHorizontalOuter));
    const mapperVerticalDown = CurveMapper.apply(deg2rad(this.lookAtVerticalDown));
    const mapperVerticalUp = CurveMapper.apply(deg2rad(this.lookAtVerticalUp));

    if (srcY < 0.0) {
      this._blendShapeProxy.setValue(VRMSchema.BlendShapePresetName.Lookleft, 0.0);
      this._blendShapeProxy.setValue(VRMSchema.BlendShapePresetName.Lookright, mapperHorizontal.map(-srcY));
    } else {
      this._blendShapeProxy.setValue(VRMSchema.BlendShapePresetName.Lookright, 0.0);
      this._blendShapeProxy.setValue(VRMSchema.BlendShapePresetName.Lookleft, mapperHorizontal.map(srcY));
    }
    if (srcX < 0.0) {
      this._blendShapeProxy.setValue(VRMSchema.BlendShapePresetName.Lookdown, 0.0);
      this._blendShapeProxy.setValue(VRMSchema.BlendShapePresetName.Lookup, mapperVerticalUp.map(-srcX));
    } else {
      this._blendShapeProxy.setValue(VRMSchema.BlendShapePresetName.Lookup, 0.0);
      this._blendShapeProxy.setValue(VRMSchema.BlendShapePresetName.Lookdown, mapperVerticalDown.map(srcX));
    }
  }
}
