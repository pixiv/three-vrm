import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRMSpringBoneImporter } from '../springbone/VRMSpringBoneImporter';
import { VRMSpringBoneManagerDebug } from './VRMSpringBoneManagerDebug';
import { VRMSchema } from '../types';
import { VRMSpringBoneDebug } from './VRMSpringBoneDebug';

export class VRMSpringBoneImporterDebug extends VRMSpringBoneImporter {
  public async import(gltf: GLTF): Promise<VRMSpringBoneManagerDebug | null> {
    const vrmExt: VRMSchema.VRM | undefined = gltf.parser.json.extensions && gltf.parser.json.extensions.VRM;
    if (!vrmExt) return null;

    const schemaSecondaryAnimation: VRMSchema.SecondaryAnimation | undefined = vrmExt.secondaryAnimation;
    if (!schemaSecondaryAnimation) return null;

    // 衝突判定球体メッシュ。
    const colliderGroups = await this._importColliderMeshGroups(gltf, schemaSecondaryAnimation);

    // 同じ属性（stiffinessやdragForceが同じ）のボーンはboneGroupにまとめられている。
    // 一列だけではないことに注意。
    const springBoneGroupList = await this._importSpringBoneGroupList(gltf, schemaSecondaryAnimation, colliderGroups);

    return new VRMSpringBoneManagerDebug(colliderGroups, springBoneGroupList);
  }

  protected _createSpringBone(
    bone: THREE.Object3D,
    hitRadius: number,
    stiffiness: number,
    gravityDir: THREE.Vector3,
    gravityPower: number,
    dragForce: number,
    colliders: THREE.Mesh[] = [],
  ): VRMSpringBoneDebug {
    return new VRMSpringBoneDebug(bone, hitRadius, stiffiness, gravityDir, gravityPower, dragForce, colliders);
  }
}
