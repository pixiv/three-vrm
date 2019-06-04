// 「揺れモノ」の衝突判定の球体メッシュを返す
// 対応するboneのpositionに自動で連動する。連動はupdateMatrixWorldによって自動で行われる。
// THREE.Sphere だと `updateMatrixWorld` へのバインドができない。
// そのため、衝突判定専用で表示目的はなくてもMeshを使う（デバッグ用の表示にも使える）
import * as THREE from 'three'

export type ColliderMesh = THREE.Mesh;

export interface VRMSpringBoneColliderGroup {
  node: number;
  colliders: ColliderMesh[];
}