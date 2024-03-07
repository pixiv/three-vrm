import type * as THREE from 'three';
import type { VRMExpressionManager } from './expressions/VRMExpressionManager';
import type { VRMFirstPerson } from './firstPerson/VRMFirstPerson';
import type { VRMHumanoid } from './humanoid/VRMHumanoid';
import type { VRMLookAt } from './lookAt/VRMLookAt';
import type { VRMMeta } from './meta/VRMMeta';
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
