import * as THREE from 'three';
import { VRMCore } from '@pixiv/three-vrm-core';
import { VRMNodeConstraintManager } from '@pixiv/three-vrm-node-constraint';
import { VRMSpringBoneManager } from '@pixiv/three-vrm-springbone';
import { VRMParameters } from './VRMParameters';

/**
 * A class that represents a single VRM model.
 */
export class VRM extends VRMCore {
  /**
   * Contains materials of the VRM.
   * `update` method of these materials will be called via its {@link VRM.update} method.
   */
  public readonly materials?: THREE.Material[];

  /**
   * A {@link VRMSpringBoneManager} manipulates all spring bones attached on the VRM.
   * Usually you don't have to care about this property.
   */
  public readonly springBoneManager?: VRMSpringBoneManager;

  /**
   * A {@link VRMNodeConstraintManager} manipulates all constraints attached on the VRM.
   * Usually you don't have to care about this property.
   */
  public readonly nodeConstraintManager?: VRMNodeConstraintManager;

  /**
   * Create a new VRM instance.
   *
   * @param params [[VRMParameters]] that represents components of the VRM
   */
  public constructor(params: VRMParameters) {
    super(params);

    this.materials = params.materials;
    this.springBoneManager = params.springBoneManager;
    this.nodeConstraintManager = params.nodeConstraintManager;
  }

  /**
   * **You need to call this on your update loop.**
   *
   * This function updates every VRM components.
   *
   * @param delta deltaTime
   */
  public update(delta: number): void {
    super.update(delta);

    if (this.nodeConstraintManager) {
      this.nodeConstraintManager.update();
    }

    if (this.springBoneManager) {
      this.springBoneManager.update(delta);
    }

    if (this.materials) {
      this.materials.forEach((material: any) => {
        if (material.update) {
          material.update(delta);
        }
      });
    }
  }
}
