import { VRMSpringBoneManager } from '../springbone'
import { GLTF, GLTFNode } from '../types'
import { VRMImporterContext } from '../VRMImporterContext'
import { VRMSpringBoneManagerDebug } from './VRMSpringBoneManager'

export class VRMImporterContextDebug extends VRMImporterContext {

  public loadSecondary (gltf: GLTF, nodesMap: GLTFNode[]): VRMSpringBoneManager {
    return new VRMSpringBoneManagerDebug(gltf, nodesMap)
  }
}