import * as THREE from 'three';
import { VRMBlendShapeProxy } from '../blendshape';
import { VRMFirstPerson } from '../firstperson';
import { VRMHumanoid } from '../humanoid';
import { VRMSchema } from '../types';
import { CurveMapper } from './CurveMapper';
import { VRMLookAtApplyer } from './VRMLookAtApplyer';
import { VRMLookAtBlendShapeApplyer } from './VRMLookAtBlendShapeApplyer';
import { VRMLookAtBoneApplyer } from './VRMLookAtBoneApplyer';
import { VRMLookAtHead } from './VRMLookAtHead';

export class VRMLookAtImporter {
  public import(
    schemaFirstPerson: VRMSchema.FirstPerson,
    firstPerson: VRMFirstPerson,
    blendShapeProxy: VRMBlendShapeProxy,
    humanoid: VRMHumanoid,
  ): VRMLookAtHead {
    const applyer = this._importApplyer(schemaFirstPerson, blendShapeProxy, humanoid);
    return new VRMLookAtHead(firstPerson, applyer || undefined);
  }

  protected _importApplyer(
    schemaFirstPerson: VRMSchema.FirstPerson,
    blendShapeProxy: VRMBlendShapeProxy,
    humanoid: VRMHumanoid,
  ): VRMLookAtApplyer | null {
    const lookAtHorizontalInner = schemaFirstPerson.lookAtHorizontalInner;
    const lookAtHorizontalOuter = schemaFirstPerson.lookAtHorizontalOuter;
    const lookAtVerticalDown = schemaFirstPerson.lookAtVerticalDown;
    const lookAtVerticalUp = schemaFirstPerson.lookAtVerticalUp;

    switch (schemaFirstPerson.lookAtTypeName) {
      case VRMSchema.FirstPersonLookAtTypeName.Bone: {
        if (
          lookAtHorizontalInner === undefined ||
          lookAtHorizontalOuter === undefined ||
          lookAtVerticalDown === undefined ||
          lookAtVerticalUp === undefined
        ) {
          return null;
        } else {
          return new VRMLookAtBoneApplyer(
            humanoid,
            this._importCurveMapperBone(lookAtHorizontalInner),
            this._importCurveMapperBone(lookAtHorizontalOuter),
            this._importCurveMapperBone(lookAtVerticalDown),
            this._importCurveMapperBone(lookAtVerticalUp),
          );
        }
      }
      case VRMSchema.FirstPersonLookAtTypeName.BlendShape: {
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

  private _importCurveMapperBone(map: VRMSchema.FirstPersonDegreeMap): CurveMapper {
    return new CurveMapper(
      typeof map.xRange === 'number' ? THREE.Math.DEG2RAD * map.xRange : undefined,
      typeof map.yRange === 'number' ? THREE.Math.DEG2RAD * map.yRange : undefined,
      map.curve,
    );
  }

  private _importCurveMapperBlendShape(map: VRMSchema.FirstPersonDegreeMap): CurveMapper {
    return new CurveMapper(
      typeof map.xRange === 'number' ? THREE.Math.DEG2RAD * map.xRange : undefined,
      map.yRange,
      map.curve,
    );
  }
}
