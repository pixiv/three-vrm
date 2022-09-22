import { VRMCoreParameters } from '@pixiv/three-vrm-core';
import { VRMSpringBoneManager } from '@pixiv/three-vrm-springbone';
import { VRMNodeConstraintManager } from '@pixiv/three-vrm-node-constraint';
/**
 * Parameters for a {@link VRM} class.
 */
export interface VRMParameters extends VRMCoreParameters {
    materials?: THREE.Material[];
    springBoneManager?: VRMSpringBoneManager;
    nodeConstraintManager?: VRMNodeConstraintManager;
}
