import * as THREE from 'three';
/**
 * Represents an angle limit of a spring bone.
 */
export declare abstract class VRMSpringBoneLimit {
    /**
     * The rotation from the default orientation of the limit.
     */
    rotation: THREE.Quaternion;
    /**
     * The cache for the total rotation of the limit.
     * It will be calculated in {@link internalPrecalcRotation}.
     */
    protected _totalRotationCache: THREE.Quaternion;
    /**
     * The cache for the total rotation of the limit.
     * It will be calculated in {@link internalPrecalcRotation}.
     *
     * This is a public property to use in {@link VRMSpringBoneLimitHelper}.
     * Do not touch this property as we might change the interface without notice.
     */
    get internalTotalRotationCache(): THREE.Quaternion;
    /**
     * The cache for the inverse of the {@link _totalRotationCache}.
     * It will be calculated in {@link internalPrecalcRotation}.
     */
    protected _totalRotationInvCache: THREE.Quaternion;
    constructor();
    /**
     * Precalculate the rotation of the limit.
     *
     * This is intended to be called from {@link VRMSpringBoneJoint.update}.
     * Do not touch this property as we might change the interface without notice.
     *
     * @param worldSpaceInitialRotation The initial local rotation in the current world space
     * @param boneAxis The initial axis of the child bone, in local unit
     */
    internalPrecalcRotation(worldSpaceInitialRotation: THREE.Quaternion, boneAxis: THREE.Vector3): void;
    /**
     * Calculate the limit direction.
     * If the direction is limited, it will return `true`.
     *
     * @param tailDir The tail direction in world space
     */
    abstract calculateLimit(tailDir: THREE.Vector3): boolean;
}
