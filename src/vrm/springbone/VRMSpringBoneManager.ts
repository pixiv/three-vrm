import { VRMSpringBone } from './VRMSpringBone';

export type VRMSpringBoneGroup = VRMSpringBone[];

export class VRMSpringBoneManager {
  public readonly springBoneGroupList: VRMSpringBoneGroup[] = [];

  public constructor(springBoneGroupList: VRMSpringBoneGroup[]) {
    this.springBoneGroupList = springBoneGroupList;
  }

  public lateUpdate(delta: number): void {
    this.springBoneGroupList.forEach((springBoneGroup) => {
      springBoneGroup.forEach((springBone) => {
        springBone.update(delta);
      });
    });
  }

  public reset(): void {
    this.springBoneGroupList.forEach((springBoneGroup) => {
      springBoneGroup.forEach((springBone) => {
        springBone.reset();
      });
    });
  }
}
