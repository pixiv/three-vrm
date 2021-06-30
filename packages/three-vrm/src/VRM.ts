import * as THREE from 'three';
import { VRMConstraintManager } from '@pixiv/three-vrm-constraints';
import { VRMExpressionManager, VRMFirstPerson, VRMHumanoid, VRMLookAt, VRMMeta } from '@pixiv/three-vrm-core';
import { VRMSpringBoneManager } from '@pixiv/three-vrm-springbone';

/**
 * Parameters for a [[VRM]] class.
 */
export interface VRMParameters {
  scene: THREE.Scene | THREE.Group; // COMPAT: `GLTF.scene` is going to be `THREE.Group` in r114
  humanoid?: VRMHumanoid;
  expressionManager?: VRMExpressionManager;
  firstPerson?: VRMFirstPerson;
  lookAt?: VRMLookAt;
  materials?: THREE.Material[];
  springBoneManager?: VRMSpringBoneManager;
  constraintManager?: VRMConstraintManager;
  meta?: VRMMeta;
}

/**
 * A class that represents a single VRM model.
 * See the documentation of [[VRM.from]] for the most basic use of VRM.
 */
export class VRM {
  /**
   * `THREE.Scene` or `THREE.Group` (depends on your three.js revision) that contains the entire VRM.
   */
  public readonly scene: THREE.Scene | THREE.Group; // COMPAT: `GLTF.scene` is going to be `THREE.Group` in r114

  /**
   * Contains [[VRMHumanoid]] of the VRM.
   * You can control each bones using [[VRMHumanoid.getBoneNode]].
   *
   * @TODO Add a link to VRM spec
   */
  public readonly humanoid?: VRMHumanoid;

  /**
   * Contains [[VRMBlendShapeProxy]] of the VRM.
   * You might want to control these facial expressions via [[VRMBlendShapeProxy.setValue]].
   */
  public readonly expressionManager?: VRMExpressionManager;

  /**
   * Contains [[VRMFirstPerson]] of the VRM.
   * You can use various feature of the firstPerson field.
   */
  public readonly firstPerson?: VRMFirstPerson;

  /**
   * Contains [[VRMLookAtHead]] of the VRM.
   * You might want to use [[VRMLookAtHead.target]] to control the eye direction of your VRMs.
   */
  public readonly lookAt?: VRMLookAt;

  /**
   * Contains materials of the VRM.
   * `updateVRMMaterials` method of these materials will be called via its [[VRM.update]] method.
   */
  public readonly materials?: THREE.Material[];

  /**
   * Contains meta fields of the VRM.
   * You might want to refer these license fields before use your VRMs.
   */
  public readonly meta?: VRMMeta;

  /**
   * A [[VRMSpringBoneManager]] manipulates all spring bones attached on the VRM.
   * Usually you don't have to care about this property.
   */
  public readonly springBoneManager?: VRMSpringBoneManager;

  /**
   * A [[VRMConstraintManager]] manipulates all constraints attached on the VRM.
   * Usually you don't have to care about this property.
   */
  public readonly constraintManager?: VRMConstraintManager;

  /**
   * Create a new VRM instance.
   *
   * @param params [[VRMParameters]] that represents components of the VRM
   */
  public constructor(params: VRMParameters) {
    this.scene = params.scene;
    this.humanoid = params.humanoid;
    this.expressionManager = params.expressionManager;
    this.firstPerson = params.firstPerson;
    this.lookAt = params.lookAt;
    this.materials = params.materials;
    this.springBoneManager = params.springBoneManager;
    this.constraintManager = params.constraintManager;
    this.meta = params.meta;
  }

  /**
   * **You need to call this on your update loop.**
   *
   * This function updates every VRM components.
   *
   * @param delta deltaTime
   */
  public update(delta: number): void {
    if (this.lookAt) {
      this.lookAt.update(delta);
    }

    if (this.expressionManager) {
      this.expressionManager.update();
    }

    if (this.constraintManager) {
      this.constraintManager.update();
    }

    if (this.springBoneManager) {
      this.springBoneManager.update(delta);
    }

    if (this.materials) {
      this.materials.forEach((material: any) => {
        if (material.updateVRMMaterials) {
          material.updateVRMMaterials(delta);
        }
      });
    }
  }
}
