/**
 * This class is used by {@link VRMLookAtHead}, applies look at direction.
 * There are currently two variant of applier: {@link VRMLookAtBoneApplier} and {@link VRMLookAtExpressionApplier}.
 */
export interface VRMLookAtApplier {
    /**
     * Apply look at direction to its associated VRM model.
     *
     * @param euler `THREE.Euler` object that represents the look at direction
     */
    lookAt: (euler: THREE.Euler) => void;
}
