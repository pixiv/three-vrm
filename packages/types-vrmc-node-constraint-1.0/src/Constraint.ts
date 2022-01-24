import type { RotationConstraint } from './RotationConstraint';

/**
 * An object contains one of constraints.
 */
export interface Constraint {
  rotation: RotationConstraint;

  extensions?: { [name: string]: any };
  extras?: any;
}
