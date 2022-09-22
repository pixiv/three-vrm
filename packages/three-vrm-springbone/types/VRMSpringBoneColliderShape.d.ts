/**
 * Represents a shape of a collider.
 */
export declare abstract class VRMSpringBoneColliderShape {
    /**
     * The type of the shape.
     */
    abstract get type(): string;
    /**
     * Calculate a distance and a direction from the collider to a target object.
     * It's hit if the distance is negative.
     * The direction will be contained in the given target vector.
     *
     * @param colliderMatrix A matrix represents the transform of the collider
     * @param objectPosition A vector represents the position of the target object
     * @param objectRadius The radius of the object
     * @param target The result direction will be contained in this vector
     */
    abstract calculateCollision(colliderMatrix: THREE.Matrix4, objectPosition: THREE.Vector3, objectRadius: number, target: THREE.Vector3): number;
}
