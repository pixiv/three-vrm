import { VRMBlendShapeMaster } from '../blendshape';
import { VRMHumanoid } from '../humanoid';
import { VRMLookAtHead } from '../lookat/VRMLookAtHead';
import { VRMLookAtImporter } from '../lookat/VRMLookAtImporter';
import { VRMSchema } from '../types';
import { VRMLookAtHeadDebug } from './VRMLookAtHeadDebug';

export class VRMLookAtImporterDebug extends VRMLookAtImporter {
  public import(
    firstPerson: VRMSchema.FirstPerson,
    blendShapeMaster: VRMBlendShapeMaster,
    humanoid: VRMHumanoid,
  ): VRMLookAtHead {
    const applyer = this._importApplyer(firstPerson, blendShapeMaster, humanoid);
    return new VRMLookAtHeadDebug(humanoid, applyer || undefined);
  }
}
