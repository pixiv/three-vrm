import { GLTF } from '../types'
import { VRM } from '../VRM'
import { VRMImporter } from '../VRMImporter'
import { DebugOption, VRMDebug } from './VRM'
import { VRMImporterContextDebug } from './VRMImporterContext'

export class VRMImporterDebug extends VRMImporter{

  public debug?: DebugOption

  public importerContext = new VRMImporterContextDebug()

  public load(gltf: GLTF,) : Promise<VRM> {
    return this.materialConverter.convertGLTFMaterials(gltf)
      .then( (converted: GLTF) => new VRMDebug(converted, this.importerContext, this.debug))
  }

}