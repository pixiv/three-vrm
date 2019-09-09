import * as THREE from 'three';
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
   * @param gltf A parsed result of GLTF taken from GLTFLoader
   * @param blendShapeProxy A [[VRMBlendShapeProxy]] instance that represents the VRM
   * @param humanoid A [[VRMHumanoid]] instance that represents the VRM
   */
  public import(gltf: THREE.GLTF, blendShapeProxy: VRMBlendShapeProxy, humanoid: VRMHumanoid): VRMLookAtHead | null {
    const vrmExt: VRMSchema.VRM | undefined = gltf.parser.json.extensions && gltf.parser.json.extensions.VRM;
    if (!vrmExt) {
      return null;
    }

    const schemaFirstPerson: VRMSchema.FirstPerson | undefined = vrmExt.firstPerson;
    if (!schemaFirstPerson) {
      return null;
    }

    const applyer = this._importApplyer(schemaFirstPerson, blendShapeProxy, humanoid);
    return new VRMLookAtHead(humanoid, applyer || undefined);
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
