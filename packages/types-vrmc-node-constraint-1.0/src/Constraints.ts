import type { AimConstraint } from './AimConstraint';
import type { PositionConstraint } from './PositionConstraint';
import type { RotationConstraint } from './RotationConstraint';

/**
 * glTF extension that defines constraints.
 */
export interface Constraints {
  /**
   * Specification version of VRMC_node_constraint
   */
  specVersion: '1.0-draft';

  position?: PositionConstraint;
  rotation?: RotationConstraint;
  aim?: AimConstraint;

  extensions?: { [name: string]: any };
  extras?: any;
}
