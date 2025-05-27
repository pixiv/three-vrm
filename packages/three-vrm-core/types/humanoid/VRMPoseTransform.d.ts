/**
 * Represents a transform of a single bone of {@link VRMPose}.
 * Both `position` and `rotation` are optional.
 */
export interface VRMPoseTransform {
    /**
     * Position of the transform.
     */
    position?: [number, number, number];
    /**
     * Rotation of the transform.
     * Note that it's a quaternion.
     */
    rotation?: [number, number, number, number];
}
