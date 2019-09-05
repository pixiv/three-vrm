// 「揺れモノ」の衝突判定の球体メッシュを返す
// 対応するboneのpositionに自動で連動する。連動はupdateMatrixWorldによって自動で行われる。
// THREE.Sphere だと `updateMatrixWorld` へのバインドができない。
// そのため、衝突判定専用で表示目的はなくてもMeshを使う（デバッグ用の表示にも使える）
import * as THREE from 'three';

/**
 * ColliderMesh, is actually just a `THREE.Mesh`.
 * Its radius and world position will be used for collisions.
 */
export type VRMSpringBoneColliderMesh = THREE.Mesh;

/**
 * A group of colliders, equivalents to an element of `colliderGroups` field of VRM schema.
 *
 * @see https://github.com/vrm-c/UniVRM/blob/master/specification/0.0/schema/vrm.secondaryanimation.collidergroup.schema.json
 */
export interface VRMSpringBoneColliderGroup {
  node: number;
  colliders: VRMSpringBoneColliderMesh[];
}
