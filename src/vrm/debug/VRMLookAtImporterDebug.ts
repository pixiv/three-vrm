import { VRMBlendShapeProxy } from '../blendshape';
import { VRMFirstPerson } from '../firstperson';
import { VRMHumanoid } from '../humanoid';
import { VRMLookAtHead } from '../lookat/VRMLookAtHead';
import { VRMLookAtImporter } from '../lookat/VRMLookAtImporter';
import { VRMSchema } from '../types';
import { VRMLookAtHeadDebug } from './VRMLookAtHeadDebug';

export class VRMLookAtImporterDebug extends VRMLookAtImporter {
  public import(
    schemaFirstPerson: VRMSchema.FirstPerson,
    firstPerson: VRMFirstPerson,
    blendShapeProxy: VRMBlendShapeProxy,
    humanoid: VRMHumanoid,
  ): VRMLookAtHead {
    const applyer = this._importApplyer(schemaFirstPerson, blendShapeProxy, humanoid);
    return new VRMLookAtHeadDebug(firstPerson, applyer || undefined);
  }
}
