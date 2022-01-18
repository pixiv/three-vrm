import * as THREE from 'three';
import { VRMSchema } from '../types';
/**
 * This class is used by [[VRMLookAtHead]], applies look at direction.
 * There are currently two variant of applier: [[VRMLookAtBoneApplyer]] and [[VRMLookAtBlendShapeApplyer]].
 */
export declare abstract class VRMLookAtApplyer {
    /**
     * It represents its type of applier.
     */
    abstract readonly type: VRMSchema.FirstPersonLookAtTypeName;
    /**
     * Apply look at direction to its associated VRM model.
     *
     * @param euler `THREE.Euler` object that represents the look at direction
     */
    abstract lookAt(euler: THREE.Euler): void;
}
