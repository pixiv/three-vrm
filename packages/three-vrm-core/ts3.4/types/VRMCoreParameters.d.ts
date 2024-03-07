import * as THREE from 'three';
import { VRMExpressionManager } from './expressions/VRMExpressionManager';
import { VRMFirstPerson } from './firstPerson/VRMFirstPerson';
import { VRMHumanoid } from './humanoid/VRMHumanoid';
import { VRMLookAt } from './lookAt/VRMLookAt';
import { VRMMeta } from './meta/VRMMeta';
/**
 * Parameters for a {@link VRMCore} class.
 */
export interface VRMCoreParameters {
    scene: THREE.Group;
    meta: VRMMeta;
    humanoid: VRMHumanoid;
    expressionManager?: VRMExpressionManager;
    firstPerson?: VRMFirstPerson;
    lookAt?: VRMLookAt;
}
