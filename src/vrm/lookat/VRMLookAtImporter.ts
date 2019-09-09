import { VRMBlendShapeProxy } from '../blendshape';
import { VRMHumanoid } from '../humanoid';
import { VRMSchema } from '../types';
import { VRMLookAtApplyer } from './VRMLookAtApplyer';
import { VRMLookAtBlendShapeApplyer } from './VRMLookAtBlendShapeApplyer';
import { VRMLookAtBoneApplyer } from './VRMLookAtBoneApplyer';
import { VRMLookAtHead } from './VRMLookAtHead';

/**
 * An importer that imports a [[VRMLookAtHead]] from a VRM extension of a GLTF.
 */
export class VRMLookAtImporter {
  /**
   * Import a [[VRMLookAtHead]] from a VRM.
   *
   * @param firstPerson A raw `firstPerson` field taken from the VRM extension of the GLTF
   * @param blendShapeProxy A [[VRMBlendShapeProxy]] instance that represents the VRM
   * @param humanoid A [[VRMHumanoid]] instance that represents the VRM
   */
  public import(
    firstPerson: VRMSchema.FirstPerson,
    blendShapeProxy: VRMBlendShapeProxy,
    humanoid: VRMHumanoid,
  ): VRMLookAtHead {
    const applyer = this._importApplyer(firstPerson, blendShapeProxy, humanoid);
    return new VRMLookAtHead(humanoid, applyer || undefined);
  }

  protected _importApplyer(
    firstPerson: VRMSchema.FirstPerson,
    blendShapeProxy: VRMBlendShapeProxy,
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
