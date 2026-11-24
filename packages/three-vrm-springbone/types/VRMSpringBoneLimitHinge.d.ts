import * as THREE from 'three';
import { VRMSpringBoneLimit } from './VRMSpringBoneLimit';
/**
 * Represents the hinge limit of a spring bone defined in `VRMC_springBone_limit`.
 */
export declare class VRMSpringBoneLimitHinge extends VRMSpringBoneLimit {
    /**
     * The angle of the hinge limit in radians.
     * If the angle is set to π or greater, the angle will be interpreted as π by the implementation.
     * When the angle is set to π, the hinge shape becomes a full disc.
     */
    angle: number;
    constructor(params?: {
        angle?: number;
        rotation?: THREE.Quaternion;
    });
    calculateLimit(tailDir: THREE.Vector3): boolean;
}
