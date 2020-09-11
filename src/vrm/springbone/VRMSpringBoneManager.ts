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
  public setRelativeRoot(root: THREE.Object3D | null): void {
    this.springBoneGroupList.forEach((springBoneGroup) => {
      springBoneGroup.forEach((springBone) => {
        springBone.relativeRoot = root;
      });
    });
  }

  /**
   * Update every spring bone attached to this manager.
   *
   * @param delta deltaTime
   */
  public lateUpdate(delta: number): void {
    this.springBoneGroupList.forEach((springBoneGroup) => {
      springBoneGroup.forEach((springBone) => {
        springBone.update(delta);
      });
    });
  }

  /**
   * Reset every spring bone attached to this manager.
   */
  public reset(): void {
    this.springBoneGroupList.forEach((springBoneGroup) => {
      springBoneGroup.forEach((springBone) => {
        springBone.reset();
      });
    });
  }
}
