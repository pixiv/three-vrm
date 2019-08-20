import { VRMBlendShapeProxy } from '../blendshape';
import { VRMHumanBones } from '../humanoid';
import { VRMLookAtHead } from '../lookat/VRMLookAtHead';
import { VRMLookAtImporter } from '../lookat/VRMLookAtImporter';
import * as Raw from '../types/VRM';
import { VRMLookAtHeadDebug } from './VRMLookAtHeadDebug';

export class VRMLookAtImporterDebug extends VRMLookAtImporter {
  public import(
    firstPerson: Raw.RawVrmFirstPerson,
    blendShapeProxy: VRMBlendShapeProxy,
    humanBodyBones: VRMHumanBones,
  ): VRMLookAtHead {
    const applyer = this._importApplyer(firstPerson, blendShapeProxy, humanBodyBones);
    return new VRMLookAtHeadDebug(humanBodyBones, applyer || undefined);
  }
}
