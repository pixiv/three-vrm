import { VRMBlendShapeProxy } from '../blendshape';
import { VRMFirstPerson } from '../firstperson';
import { VRMHumanBones } from '../humanoid';
import * as Raw from '../types/VRM';
import { CurveMapper } from './CurveMapper';
import { VRMLookAtApplyer } from './VRMLookAtApplyer';
import { VRMLookAtBlendShapeApplyer } from './VRMLookAtBlendShapeApplyer';
import { VRMLookAtBoneApplyer } from './VRMLookAtBoneApplyer';
import { VRMLookAtHead } from './VRMLookAtHead';

const DEG2RAD = Math.PI / 180.0;

export class VRMLookAtImporter {
  public import(
    schemaFirstPerson: Raw.RawVrmFirstPerson,
    firstPerson: VRMFirstPerson,
    blendShapeProxy: VRMBlendShapeProxy,
    humanBodyBones: VRMHumanBones,
  ): VRMLookAtHead {
    const applyer = this._importApplyer(schemaFirstPerson, blendShapeProxy, humanBodyBones);
    return new VRMLookAtHead(firstPerson, applyer || undefined);
  }

  protected _importApplyer(
    schemaFirstPerson: Raw.RawVrmFirstPerson,
    blendShapeProxy: VRMBlendShapeProxy,
    humanBodyBones: VRMHumanBones,
  ): VRMLookAtApplyer | null {
    const lookAtHorizontalInner = schemaFirstPerson.lookAtHorizontalInner;
    const lookAtHorizontalOuter = schemaFirstPerson.lookAtHorizontalOuter;
    const lookAtVerticalDown = schemaFirstPerson.lookAtVerticalDown;
    const lookAtVerticalUp = schemaFirstPerson.lookAtVerticalUp;

    switch (schemaFirstPerson.lookAtTypeName) {
      case Raw.LookAtTypeName.Bone: {
        if (
          lookAtHorizontalInner === undefined ||
          lookAtHorizontalOuter === undefined ||
          lookAtVerticalDown === undefined ||
          lookAtVerticalUp === undefined
        ) {
          return null;
        } else {
          return new VRMLookAtBoneApplyer(
            humanBodyBones,
            this._importCurveMapperBone(lookAtHorizontalInner),
            this._importCurveMapperBone(lookAtHorizontalOuter),
            this._importCurveMapperBone(lookAtVerticalDown),
            this._importCurveMapperBone(lookAtVerticalUp),
          );
        }
      }
      case Raw.LookAtTypeName.BlendShape: {
        if (lookAtHorizontalOuter === undefined || lookAtVerticalDown === undefined || lookAtVerticalUp === undefined) {
          return null;
        } else {
          return new VRMLookAtBlendShapeApplyer(
            blendShapeProxy,
            this._importCurveMapperBlendShape(lookAtHorizontalOuter),
            this._importCurveMapperBlendShape(lookAtVerticalDown),
            this._importCurveMapperBlendShape(lookAtVerticalUp),
          );
        }
      }
      default: {
        return null;
      }
    }
  }

  private _importCurveMapperBone(map: Raw.RawVrmFirstPersonDegreemap): CurveMapper {
    return new CurveMapper(
      typeof map.xRange === 'number' ? DEG2RAD * map.xRange : undefined,
      typeof map.yRange === 'number' ? DEG2RAD * map.yRange : undefined,
      map.curve,
    );
  }

  private _importCurveMapperBlendShape(map: Raw.RawVrmFirstPersonDegreemap): CurveMapper {
    return new CurveMapper(typeof map.xRange === 'number' ? DEG2RAD * map.xRange : undefined, map.yRange, map.curve);
  }
}
