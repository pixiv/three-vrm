import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRMSpringBone } from '../springbone/VRMSpringBone';
import { VRMSpringBoneImporter } from '../springbone/VRMSpringBoneImporter';
import { VRMSpringBoneDebug } from './VRMSpringBoneDebug';

export class VRMSpringBoneImporterDebug extends VRMSpringBoneImporter {
  protected get _isColiderMeshVisible(): boolean {
    return true;
  }

  protected _createSpringBone(
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
    );
    gltf.scene.add(springBone.getGizmo());
    return springBone;
  }
}
