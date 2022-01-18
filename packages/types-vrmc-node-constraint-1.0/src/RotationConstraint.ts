/**
 * A constraint that links the rotation with sources.
 */
export interface RotationConstraint {
  /**
   * The index of the node constrains the node.
   */
  source: number;

  /**
   * Axes be constrained by this constraint, in X-Y-Z order.
   */
  freezeAxes?: [boolean, boolean, boolean];

  /**
   * The weight of the constraint.
   */
  weight?: number;
}
