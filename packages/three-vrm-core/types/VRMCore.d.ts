import * as THREE from 'three';
import { VRMExpressionManager } from './expressions/VRMExpressionManager';
import { VRMFirstPerson } from './firstPerson/VRMFirstPerson';
import { VRMHumanoid } from './humanoid/VRMHumanoid';
import { VRMLookAt } from './lookAt/VRMLookAt';
import { VRMMeta } from './meta/VRMMeta';
import { VRMCoreParameters } from './VRMCoreParameters';
/**
 * A class that represents a single VRM model.
 * This class only includes core spec of the VRM (`VRMC_vrm`).
 */
export declare class VRMCore {
    /**
     * `THREE.Group` that contains the entire VRM.
     */
    readonly scene: THREE.Group;
    /**
     * Contains meta fields of the VRM.
     * You might want to refer these license fields before use your VRMs.
     */
    readonly meta: VRMMeta;
    /**
     * Contains {@link VRMHumanoid} of the VRM.
     * You can control each bones using {@link VRMHumanoid.getNormalizedBoneNode} or {@link VRMHumanoid.getRawBoneNode}.
     *
     * @TODO Add a link to VRM spec
     */
    readonly humanoid: VRMHumanoid;
    /**
     * Contains {@link VRMExpressionManager} of the VRM.
     * You might want to control these facial expressions via {@link VRMExpressionManager.setValue}.
     */
    readonly expressionManager?: VRMExpressionManager;
    /**
     * Contains {@link VRMFirstPerson} of the VRM.
     * VRMFirstPerson is mostly used for mesh culling for first person view.
     */
    readonly firstPerson?: VRMFirstPerson;
    /**
     * Contains {@link VRMLookAt} of the VRM.
     * You might want to use {@link VRMLookAt.target} to control the eye direction of your VRMs.
     */
    readonly lookAt?: VRMLookAt;
    /**
     * Create a new VRM instance.
     *
     * @param params {@link VRMParameters} that represents components of the VRM
     */
    constructor(params: VRMCoreParameters);
    /**
     * **You need to call this on your update loop.**
     *
     * This function updates every VRM components.
     *
     * @param delta deltaTime
     */
    update(delta: number): void;
}
