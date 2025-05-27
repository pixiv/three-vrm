import * as THREE from 'three';
import { VRMCore } from '@pixiv/three-vrm-core';
import { VRMNodeConstraintManager } from '@pixiv/three-vrm-node-constraint';
import { VRMSpringBoneManager } from '@pixiv/three-vrm-springbone';
import { VRMParameters } from './VRMParameters';
/**
 * A class that represents a single VRM model.
 */
export declare class VRM extends VRMCore {
    /**
     * Contains materials of the VRM.
     * `update` method of these materials will be called via its {@link VRM.update} method.
     */
    readonly materials?: THREE.Material[];
    /**
     * A {@link VRMSpringBoneManager} manipulates all spring bones attached on the VRM.
     * Usually you don't have to care about this property.
     */
    readonly springBoneManager?: VRMSpringBoneManager;
    /**
     * A {@link VRMNodeConstraintManager} manipulates all constraints attached on the VRM.
     * Usually you don't have to care about this property.
     */
    readonly nodeConstraintManager?: VRMNodeConstraintManager;
    /**
     * Create a new VRM instance.
     *
     * @param params {@link VRMParameters} that represents components of the VRM
     */
    constructor(params: VRMParameters);
    /**
     * **You need to call this on your update loop.**
     *
     * This function updates every VRM components.
     *
     * @param delta deltaTime
     */
    update(delta: number): void;
}
