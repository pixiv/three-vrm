import * as THREE from 'three';
import { VRMSpringBoneLimit } from './VRMSpringBoneLimit';
/**
 * Represents the spherical limit of a spring bone defined in `VRMC_springBone_limit`.
 */
export declare class VRMSpringBoneLimitSpherical extends VRMSpringBoneLimit {
    /**
     * The pitch angle of the spherical limit in radians.
     * If the pitch angle is set to π or greater, the angle will be interpreted as π by the implementation.
     */
    pitch: number;
    /**
     * The yaw angle of the spherical limit in radians.
     * If the yaw angle is set to π/2 or greater, the angle will be interpreted as π/2 by the implementation.
     */
    yaw: number;
    constructor(params?: {
        pitch?: number;
        yaw?: number;
        rotation?: THREE.Quaternion;
    });
    calculateLimit(tailDir: THREE.Vector3): boolean;
}
