import type { AimConstraint } from './AimConstraint';
import type { PositionConstraint } from './PositionConstraint';
import type { RotationConstraint } from './RotationConstraint';

/**
 * glTF extension that defines constraints.
 */
export interface Constraints {
  position?: PositionConstraint;
  rotation?: RotationConstraint;
  aim?: AimConstraint;

  extensions?: { [name: string]: any };
  extras?: any;
}