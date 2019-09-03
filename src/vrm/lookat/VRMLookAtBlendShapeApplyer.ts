import * as THREE from 'three';
import { VRMBlendShapeMaster } from '../blendshape';
import { VRMSchema } from '../types';
import { CurveMapper, DEG2RAD } from './CurveMapper';
import { VRMLookAtApplyer } from './VRMLookAtApplyer';

export class VRMLookAtBlendShapeApplyer extends VRMLookAtApplyer {
  private readonly _blendShapeProxy: VRMBlendShapeMaster;

  constructor(
    blendShapeProxy: VRMBlendShapeMaster,
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

  public lookAt(euler: THREE.Euler) {
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

function deg2rad(map: VRMSchema.FirstPersonDegreeMap): VRMSchema.FirstPersonDegreeMap {
  return {
    xRange: typeof map.xRange === 'number' ? DEG2RAD * map.xRange : undefined,
    yRange: map.yRange, // yRange means weight not radian
    curve: map.curve,
  };
}
