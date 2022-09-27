/**
 * A constraint that transfers a rotation around one axis of a source.
 */
export interface RollConstraint {
  /**
   * The index of the node constrains the node.
   */
  source: number;

  /**
   * The roll axis of the constraint.
   */
  rollAxis: 'X' | 'Y' | 'Z';

  /**
   * The weight of the constraint.
   */
  weight?: number;

  extensions?: { [name: string]: any };
  extras?: any;
}
