import { AimConstraint } from './AimConstraint';
import { RollConstraint } from './RollConstraint';
import type { RotationConstraint } from './RotationConstraint';
/**
 * An object contains one of constraints.
 */
export interface Constraint {
    roll?: RollConstraint;
    aim?: AimConstraint;
    rotation?: RotationConstraint;
    extensions?: {
        [name: string]: any;
    };
    extras?: any;
}
