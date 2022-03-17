/**
 * A constraint that makes it look at a source object.
 */
export interface AimConstraint {
  /**
   * The index of the node constrains the node.
   */
  source: number;

  /**
   * The aim axis of the constraint.
   */
  aimAxis: '+X' | '-X' | '+Y' | '-Y' | '+Z' | '-Z';

  /**
   * The weight of the constraint.
   */
  weight?: number;

  extensions?: { [name: string]: any };
  extras?: any;
}
