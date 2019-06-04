import { MaterialConverter } from './material'
import { GLTF } from './types'
import { VRM } from './VRM'
import { VRMImporterContext } from './VRMImporterContext'

export class VRMImporter {

  public materialConverter = new MaterialConverter(true)

  public importerContext = new VRMImporterContext()

  public load(gltf: GLTF,) : Promise<VRM> {

    return this.materialConverter.convertGLTFMaterials(gltf)
      .then( (converted: GLTF) => new VRM(converted, this.importerContext))
  }

}
