import { VRMBlendShapeProxy } from '../blendshape';
import { VRMFirstPerson } from '../firstperson';
import { VRMHumanBones } from '../humanoid';
import { VRMLookAtHead } from '../lookat/VRMLookAtHead';
import { VRMLookAtImporter } from '../lookat/VRMLookAtImporter';
import * as Raw from '../types/VRM';
import { VRMLookAtHeadDebug } from './VRMLookAtHeadDebug';

export class VRMLookAtImporterDebug extends VRMLookAtImporter {
  public import(
    schemaFirstPerson: Raw.RawVrmFirstPerson,
    firstPerson: VRMFirstPerson,
    blendShapeProxy: VRMBlendShapeProxy,
    humanBodyBones: VRMHumanBones,
  ): VRMLookAtHead {
    const applyer = this._importApplyer(schemaFirstPerson, blendShapeProxy, humanBodyBones);
    return new VRMLookAtHeadDebug(firstPerson, applyer || undefined);
  }
}
