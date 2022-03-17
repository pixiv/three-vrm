import { VRMSpringBone } from './VRMSpringBone';
import { VRMSpringBoneColliderGroup } from './VRMSpringBoneColliderGroup';

/**
 * Represents a single spring bone group of a VRM.
 */
export type VRMSpringBoneGroup = VRMSpringBone[];

/**
 * A class manages every spring bones on a VRM.
 */
export class VRMSpringBoneManager {
  public readonly colliderGroups: VRMSpringBoneColliderGroup[] = [];
  public readonly springBoneGroupList: VRMSpringBoneGroup[] = [];

  /**
   * Create a new [[VRMSpringBoneManager]]
   *
   * @param springBoneGroupList An array of [[VRMSpringBoneGroup]]
   */
  public constructor(colliderGroups: VRMSpringBoneColliderGroup[], springBoneGroupList: VRMSpringBoneGroup[]) {
    this.colliderGroups = colliderGroups;
    this.springBoneGroupList = springBoneGroupList;
  }

  /**
   * Set all bones be calculated based on the space relative from this object.
   * If `null` is given, springbone will be calculated in world space.
   * @param root Root object, or `null`
   */
  public setCenter(root: THREE.Object3D | null): void {
    this.springBoneGroupList.forEach((springBoneGroup) => {
      springBoneGroup.forEach((springBone) => {
        springBone.center = root;
      });
    });
  }

  /**
   * Update worldMatrix of springbone's ancestors
   * called before update springbone
   * @param updatedObjectSet Set of node which worldMatrix is updated.
   * @param node target bone node.
   */
  private _updateParentMatrix(updatedObjectSet: Set<THREE.Object3D>, node: THREE.Object3D): void {
    if (updatedObjectSet.has(node)) return;

    if (node.parent) this._updateParentMatrix(updatedObjectSet, node.parent);
    node.updateWorldMatrix(false, false);

    updatedObjectSet.add(node);
  }

  /**
   * Update every spring bone attached to this manager.
   *
   * @param delta deltaTime
   */
  public lateUpdate(delta: number): void {
    const updatedObjectSet = new Set<THREE.Object3D>();

    this.springBoneGroupList.forEach((springBoneGroup) => {
      springBoneGroup.forEach((springBone) => {
        this._updateParentMatrix(updatedObjectSet, springBone.bone);
        springBone.update(delta);
      });
    });
  }

  /**
   * Reset every spring bone attached to this manager.
   */
  public reset(): void {
    const updatedObjectSet = new Set<THREE.Object3D>();

    this.springBoneGroupList.forEach((springBoneGroup) => {
      springBoneGroup.forEach((springBone) => {
        this._updateParentMatrix(updatedObjectSet, springBone.bone);
        springBone.reset();
      });
    });
  }
}
