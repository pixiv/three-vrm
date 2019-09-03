import { VRMBlendShapeMaster } from '../blendshape';
import { VRMHumanoid } from '../humanoid';
import { VRMSchema } from '../types';
import { VRMLookAtApplyer } from './VRMLookAtApplyer';
import { VRMLookAtBlendShapeApplyer } from './VRMLookAtBlendShapeApplyer';
import { VRMLookAtBoneApplyer } from './VRMLookAtBoneApplyer';
import { VRMLookAtHead } from './VRMLookAtHead';

export class VRMLookAtImporter {
  public import(
    firstPerson: VRMSchema.FirstPerson,
    blendShapeMaster: VRMBlendShapeMaster,
    humanoid: VRMHumanoid,
  ): VRMLookAtHead {
    const applyer = this._importApplyer(firstPerson, blendShapeMaster, humanoid);
    return new VRMLookAtHead(humanoid, applyer || undefined);
  }

  protected _importApplyer(
    firstPerson: VRMSchema.FirstPerson,
    blendShapeMaster: VRMBlendShapeMaster,
    humanoid: VRMHumanoid,
  ): VRMLookAtApplyer | null {
    const lookAtHorizontalInner = firstPerson.lookAtHorizontalInner;
    const lookAtHorizontalOuter = firstPerson.lookAtHorizontalOuter;
    const lookAtVerticalDown = firstPerson.lookAtVerticalDown;
    const lookAtVerticalUp = firstPerson.lookAtVerticalUp;

    switch (firstPerson.lookAtTypeName) {
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
            lookAtHorizontalInner,
            lookAtHorizontalOuter,
            lookAtVerticalDown,
            lookAtVerticalUp,
          );
        }
      }
      case VRMSchema.FirstPersonLookAtTypeName.BlendShape: {
        if (lookAtHorizontalOuter === undefined || lookAtVerticalDown === undefined || lookAtVerticalUp === undefined) {
          return null;
        } else {
          return new VRMLookAtBlendShapeApplyer(
            blendShapeMaster,
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
