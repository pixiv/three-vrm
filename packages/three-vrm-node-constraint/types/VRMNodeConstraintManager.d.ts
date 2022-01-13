import type { VRMNodeConstraint } from './VRMNodeConstraint';
export declare class VRMNodeConstraintManager {
    private _constraints;
    get constraints(): Set<VRMNodeConstraint>;
    private _objectConstraintsMap;
    addConstraint(constraint: VRMNodeConstraint): void;
    deleteConstraint(constraint: VRMNodeConstraint): void;
    setInitState(): void;
    update(): void;
    /**
     * Update a constraint.
     * If there are other constraints that are dependant, it will try to update them recursively.
     * It might throw an error if there are circular dependencies.
     *
     * Intended to be used in {@link update} and {@link _processConstraint} itself recursively.
     *
     * @param constraint A constraint you want to update
     * @param constraintsTried Set of constraints that are already tried to be updated
     * @param constraintsDone Set of constraints that are already up to date
     */
    private _processConstraint;
}
