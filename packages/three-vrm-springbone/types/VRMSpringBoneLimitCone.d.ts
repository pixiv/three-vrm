import * as THREE from 'three';
import { VRMSpringBoneLimit } from './VRMSpringBoneLimit';
/**
 * Represents the cone limit of a spring bone defined in `VRMC_springBone_limit`.
 */
export declare class VRMSpringBoneLimitCone extends VRMSpringBoneLimit {
    /**
     * The angle of the cone limit in radians.
     * If the angle is set to π or greater, the angle will be interpreted as π by the implementation.
     * When the angle is set to π, the cone shape becomes a sphere.
     */
    angle: number;
    constructor(params?: {
        angle?: number;
        rotation?: THREE.Quaternion;
    });
    calculateLimit(tailDir: THREE.Vector3): boolean;
}
