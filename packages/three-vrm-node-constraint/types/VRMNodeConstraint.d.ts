import * as THREE from 'three';
/**
 * A base class of VRM constraint classes.
 */
export declare abstract class VRMNodeConstraint {
    /**
     * The object being constrained by the {@link source}.
     */
    destination: THREE.Object3D;
    /**
     * The object constrains the {@link destination}.
     */
    source: THREE.Object3D;
    /**
     * The weight of the constraint.
     */
    weight: number;
    abstract get dependencies(): Set<THREE.Object3D>;
    /**
     * @param destination The destination object
     * @param source The source object
     */
    constructor(destination: THREE.Object3D, source: THREE.Object3D);
    /**
     * Set initial state of the constraint.
     */
    abstract setInitState(): void;
    /**
     * Update and apply the constraint.
     */
    abstract update(): void;
}
