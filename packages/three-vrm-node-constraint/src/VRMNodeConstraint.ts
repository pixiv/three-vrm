import * as THREE from 'three';

/**
 * A base class of VRM constraint classes.
 */
export abstract class VRMNodeConstraint {
  /**
   * The object being constrained by the {@link source}.
   */
  public destination: THREE.Object3D;

  /**
   * The object constrains the {@link destination}.
   */
  public source: THREE.Object3D;

  /**
   * The weight of the constraint.
   */
  public weight: number;

  public abstract get dependencies(): Set<THREE.Object3D>;

  /**
   * @param destination The destination object
   * @param source The source object
   */
  public constructor(destination: THREE.Object3D, source: THREE.Object3D) {
    this.destination = destination;
    this.source = source;

    this.weight = 1.0;
  }

  /**
   * Set initial state of the constraint.
   */
  public abstract setInitState(): void;

  /**
   * Update and apply the constraint.
   */
  public abstract update(): void;
}
