import * as THREE from 'three'
import { VRMSpringBone, VRMSpringBoneManager } from '../springbone'
import { GLTF, GLTFNode } from '../types'
import { VRMSpringBoneDebug } from './VRMSpringBone'

export class VRMSpringBoneManagerDebug extends VRMSpringBoneManager {

  constructor (gltf: GLTF, nodesMap: GLTFNode[]) {
    super(gltf, nodesMap)
  }

  protected isColiderMeshVisible (): boolean {
    return true
  }

  protected createSpringBone (
    gltf: GLTF,
    bone: THREE.Object3D,
    hitRadius: number,
    stiffiness: number,
    gravityDir: THREE.Vector3,
    gravityPower: number,
    dragForce: number,
    colliders: THREE.Mesh[] = [],
  ): VRMSpringBone {
    const springBone = new VRMSpringBoneDebug(
      bone,
      hitRadius,
      stiffiness,
      gravityDir,
      gravityPower,
      dragForce,
      colliders,
    )
    gltf.scene.add(springBone.getGizmo())
    return springBone
  }
}
