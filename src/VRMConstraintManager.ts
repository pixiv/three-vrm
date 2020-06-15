import type * as THREE from 'three';
import type { VRMConstraint } from './VRMConstraint';
import { traverseAncestorsFromRoot } from './utils/traverseAncestorsFromRoot';

export class VRMConstraintManager {
  private _constraints = new Set<VRMConstraint>();
  public get constraints(): Set<VRMConstraint> {
    return this._constraints;
  }

  private _objectConstraintsMap = new Map<THREE.Object3D, Set<VRMConstraint>>();

  public addConstraint(constraint: VRMConstraint): void {
    this._constraints.add(constraint);

    let objectSet = this._objectConstraintsMap.get(constraint.object);
    if (objectSet == null) {
      objectSet = new Set<VRMConstraint>();
      this._objectConstraintsMap.set(constraint.object, objectSet);
    }
    objectSet.add(constraint);
  }

  public deleteConstraint(constraint: VRMConstraint): void {
    this._constraints.delete(constraint);

    const objectSet = this._objectConstraintsMap.get(constraint.object)!;
    objectSet.delete(constraint);
  }

  public update(): void {
    const constraintsTried = new Set<VRMConstraint>();
    const constraintsDone = new Set<VRMConstraint>();

    for (const constraint of this._constraints) {
      this._processConstraint(constraint, constraintsTried, constraintsDone);
    }
  }

  private _processConstraint(
    constraint: VRMConstraint,
    constraintsTried: Set<VRMConstraint>,
    constraintsDone: Set<VRMConstraint>,
  ): void {
    if (constraintsDone.has(constraint)) {
      return;
    }

    if (constraintsTried.has(constraint)) {
      throw new Error('VRMConstraintManager: Circular dependency detected while updating constraints');
    }
    constraintsTried.add(constraint);

    const depObjects = constraint.dependencies;
    for (const depObject of depObjects) {
      traverseAncestorsFromRoot(depObject, (depObjectAncestor) => {
        const objectSet = this._objectConstraintsMap.get(depObjectAncestor);
        if (objectSet) {
          for (const depConstraint of objectSet) {
            this._processConstraint(depConstraint, constraintsTried, constraintsDone);
          }
        }
      });
    }

    constraint.update();

    constraintsDone.add(constraint);
  }
}
