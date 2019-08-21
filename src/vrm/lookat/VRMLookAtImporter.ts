import { VRMBlendShapeProxy } from '../blendshape';
import { VRMFirstPerson } from '../firstperson';
import { VRMHumanBones } from '../humanoid';
import * as Raw from '../types/VRM';
import { VRMLookAtApplyer } from './VRMLookAtApplyer';
import { VRMLookAtBlendShapeApplyer } from './VRMLookAtBlendShapeApplyer';
import { VRMLookAtBoneApplyer } from './VRMLookAtBoneApplyer';
import { VRMLookAtHead } from './VRMLookAtHead';

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
            lookAtHorizontalInner,
            lookAtHorizontalOuter,
            lookAtVerticalDown,
            lookAtVerticalUp,
          );
        }
      }
      case Raw.LookAtTypeName.BlendShape: {
        if (lookAtHorizontalOuter === undefined || lookAtVerticalDown === undefined || lookAtVerticalUp === undefined) {
          return null;
        } else {
          return new VRMLookAtBlendShapeApplyer(
            blendShapeProxy,
            lookAtHorizontalOuter,
            lookAtVerticalDown,
            lookAtVerticalUp,
          );
        }
      }
      default: {
        return null;
      }
    }
  }
}
