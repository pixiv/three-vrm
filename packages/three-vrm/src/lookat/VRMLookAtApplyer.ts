import * as THREE from 'three';
import { VRMLookAtTypeName } from './VRMLookAtTypeName';

/**
 * This class is used by [[VRMLookAtHead]], applies look at direction.
 * There are currently two variant of applier: [[VRMLookAtBoneApplyer]] and [[VRMLookAtBlendShapeApplyer]].
 */
export abstract class VRMLookAtApplyer {
  /**
   * It represents its type of applier.
   */
  public abstract readonly type: VRMLookAtTypeName;

  /**
   * Apply look at direction to its associated VRM model.
   *
   * @param euler `THREE.Euler` object that represents the look at direction
   */
  public abstract lookAt(euler: THREE.Euler): void;
}
