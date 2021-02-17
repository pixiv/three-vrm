import type * as THREE from 'three';
import type { VRMSpringBoneJoint } from './VRMSpringBoneJoint';
import { traverseAncestorsFromRoot } from './utils/traverseAncestorsFromRoot';

export class VRMSpringBoneManager {
  private _springBones = new Set<VRMSpringBoneJoint>();
  public get springBones(): Set<VRMSpringBoneJoint> {
    return this._springBones;
  }

  private _objectSpringBonesMap = new Map<THREE.Object3D, Set<VRMSpringBoneJoint>>();

  public addSpringBone(springBone: VRMSpringBoneJoint): void {
    this._springBones.add(springBone);

    let objectSet = this._objectSpringBonesMap.get(springBone.bone);
    if (objectSet == null) {
      objectSet = new Set<VRMSpringBoneJoint>();
      this._objectSpringBonesMap.set(springBone.bone, objectSet);
    }
    objectSet.add(springBone);
  }

  public deleteConstraint(springBone: VRMSpringBoneJoint): void {
    this._springBones.delete(springBone);

    const objectSet = this._objectSpringBonesMap.get(springBone.bone)!;
    objectSet.delete(springBone);
  }

  public setInitState(): void {
    const springBonesTried = new Set<VRMSpringBoneJoint>();
    const springBonesDone = new Set<VRMSpringBoneJoint>();

    for (const springBone of this._springBones) {
      this._processSpringBone(springBone, springBonesTried, springBonesDone, (springBone) => springBone.setInitState());
    }
  }

  public reset(): void {
    const springBonesTried = new Set<VRMSpringBoneJoint>();
    const springBonesDone = new Set<VRMSpringBoneJoint>();

    for (const springBone of this._springBones) {
      this._processSpringBone(springBone, springBonesTried, springBonesDone, (springBone) => springBone.reset());
    }
  }

  public update(delta: number): void {
    const constraintsTried = new Set<VRMSpringBoneJoint>();
    const constraintsDone = new Set<VRMSpringBoneJoint>();

    for (const springBone of this._springBones) {
      this._processSpringBone(springBone, constraintsTried, constraintsDone, (springBone) => springBone.update(delta));
    }
  }

  /**
   * Update a spring bone.
   * If there are other spring bone that are dependant, it will try to update them recursively.
   * It might throw an error if there are circular dependencies.
   *
   * Intended to be used in {@link update} and {@link _processSpringBone} itself recursively.
   *
   * @param springBone A springBone you want to update
   * @param springBonesTried Set of springBones that are already tried to be updated
   * @param springBonesDone Set of springBones that are already up to date
   */
  private _processSpringBone(
    springBone: VRMSpringBoneJoint,
    springBonesTried: Set<VRMSpringBoneJoint>,
    springBonesDone: Set<VRMSpringBoneJoint>,
    callback: (springBone: VRMSpringBoneJoint) => void,
  ): void {
    if (springBonesDone.has(springBone)) {
      return;
    }

    if (springBonesTried.has(springBone)) {
      throw new Error('VRMSpringBoneManager: Circular dependency detected while updating constraints');
    }
    springBonesTried.add(springBone);

    const depObjects = this._getDependencies(springBone);
    for (const depObject of depObjects) {
      traverseAncestorsFromRoot(depObject, (depObjectAncestor) => {
        const objectSet = this._objectSpringBonesMap.get(depObjectAncestor);
        if (objectSet) {
          for (const depConstraint of objectSet) {
            this._processSpringBone(depConstraint, springBonesTried, springBonesDone, callback);
          }
        }
      });
    }

    callback(springBone);

    springBonesDone.add(springBone);
  }

  /**
   * Return a set of objects that are dependant of given spring bone.
   * @param springBone A spring bone
   * @return A set of objects that are dependant of given spring bone
   */
  private _getDependencies(springBone: VRMSpringBoneJoint): Set<THREE.Object3D> {
    const set = new Set<THREE.Object3D>();

    const parent = springBone.bone.parent;
    if (parent) {
      set.add(parent);
    }

    return set;
  }
}
