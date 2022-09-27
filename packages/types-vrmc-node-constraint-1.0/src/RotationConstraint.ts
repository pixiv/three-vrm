/**
 * A constraint that links the rotation with a source.
 */
export interface RotationConstraint {
  /**
   * The index of the node constrains the node.
   */
  source: number;

  /**
   * The weight of the constraint.
   */
  weight?: number;

  extensions?: { [name: string]: any };
  extras?: any;
}
