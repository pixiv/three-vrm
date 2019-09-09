import { VRMSpringBone } from './VRMSpringBone';

/**
 * Represents a single spring bone group of a VRM.
 */
export type VRMSpringBoneGroup = VRMSpringBone[];

/**
 * A class manages every spring bones on a VRM.
 */
export class VRMSpringBoneManager {
  public readonly springBoneGroupList: VRMSpringBoneGroup[] = [];

  /**
   * Create a new [[VRMSpringBoneManager]]
   *
   * @param springBoneGroupList An array of [[VRMSpringBoneGroup]]
   */
  public constructor(springBoneGroupList: VRMSpringBoneGroup[]) {
    this.springBoneGroupList = springBoneGroupList;
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
