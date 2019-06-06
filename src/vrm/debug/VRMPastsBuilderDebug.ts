import { VRMSpringBoneManager } from '../springbone'
import { GLTF, GLTFNode } from '../types'
import { VRMPartsBuilder } from '../VRMPartsBuilder'
import { VRMSpringBoneManagerDebug } from './VRMSpringBoneManager'

export class VRMPartsBuilderDebug extends VRMPartsBuilder {

  public loadSecondary (gltf: GLTF, nodesMap: GLTFNode[]): VRMSpringBoneManager {
    return new VRMSpringBoneManagerDebug(gltf, nodesMap)
  }
}