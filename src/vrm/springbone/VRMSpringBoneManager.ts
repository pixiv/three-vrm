import { VRMSpringBone } from './VRMSpringBone';

export type VRMSpringBoneGroup = VRMSpringBone[];

/**
 * A class manages all the spring bones of a VRM.
 * You usually don't have to care of this class, sometimes you might want to call [[reset]] though.
 */
export class VRMSpringBoneManager {
  public readonly springBoneGroupList: VRMSpringBoneGroup[] = [];

  public constructor(springBoneGroupList: VRMSpringBoneGroup[]) {
    this.springBoneGroupList = springBoneGroupList;
  }

  /**
   * Update all the spring bones belongs to this manager.
   * Usually this will be called via [[VRM.update]] so you don't have to call this manually.
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
   * Reset all the spring bones belongs to this manager.
   */
  public reset(): void {
    this.springBoneGroupList.forEach((springBoneGroup) => {
      springBoneGroup.forEach((springBone) => {
        springBone.reset();
      });
    });
  }
}
