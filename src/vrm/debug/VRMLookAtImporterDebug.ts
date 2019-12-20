import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRMBlendShapeProxy } from '../blendshape';
import { VRMFirstPerson } from '../firstperson';
import { VRMHumanoid } from '../humanoid';
import { VRMLookAtHead } from '../lookat/VRMLookAtHead';
import { VRMLookAtImporter } from '../lookat/VRMLookAtImporter';
import { VRMSchema } from '../types';
import { VRMLookAtHeadDebug } from './VRMLookAtHeadDebug';

export class VRMLookAtImporterDebug extends VRMLookAtImporter {
  public import(
    gltf: GLTF,
    firstPerson: VRMFirstPerson,
    blendShapeProxy: VRMBlendShapeProxy,
    humanoid: VRMHumanoid,
  ): VRMLookAtHead | null {
    const vrmExt: VRMSchema.VRM | undefined = gltf.parser.json.extensions && gltf.parser.json.extensions.VRM;
    if (!vrmExt) {
      return null;
    }

    const schemaFirstPerson: VRMSchema.FirstPerson | undefined = vrmExt.firstPerson;
    if (!schemaFirstPerson) {
      return null;
    }

    const applyer = this._importApplyer(schemaFirstPerson, blendShapeProxy, humanoid);
    return new VRMLookAtHeadDebug(firstPerson, applyer || undefined);
  }
}
