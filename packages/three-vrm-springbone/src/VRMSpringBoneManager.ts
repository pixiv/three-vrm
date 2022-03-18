import type * as THREE from 'three';
import type { VRMSpringBoneJoint } from './VRMSpringBoneJoint';
import { traverseAncestorsFromRoot } from './utils/traverseAncestorsFromRoot';
import type { VRMSpringBoneCollider } from './VRMSpringBoneCollider';
import type { VRMSpringBoneColliderGroup } from './VRMSpringBoneColliderGroup';
import { traverseChildrenUntilConditionMet } from './utils/traverseChildrenUntilConditionMet';

export class VRMSpringBoneManager {
  private _springBones = new Set<VRMSpringBoneJoint>();
  public get springBones(): Set<VRMSpringBoneJoint> {
    return this._springBones;
  }

  public get colliderGroups(): VRMSpringBoneColliderGroup[] {
    const set = new Set<VRMSpringBoneColliderGroup>();
    this._springBones.forEach((springBone) => {
      springBone.colliderGroups.forEach((colliderGroup) => {
        set.add(colliderGroup);
      });
    });
    return Array.from(set);
  }

  public get colliders(): VRMSpringBoneCollider[] {
    const set = new Set<VRMSpringBoneCollider>();
    this.colliderGroups.forEach((colliderGroup) => {
      colliderGroup.colliders.forEach((collider) => {
        set.add(collider);
      });
    });
    return Array.from(set);
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

  public deleteSpringBone(springBone: VRMSpringBoneJoint): void {
    this._springBones.delete(springBone);

    const objectSet = this._objectSpringBonesMap.get(springBone.bone)!;
    objectSet.delete(springBone);
  }

  public setInitState(): void {
    const springBonesTried = new Set<VRMSpringBoneJoint>();
    const springBonesDone = new Set<VRMSpringBoneJoint>();
    const objectUpdated = new Set<THREE.Object3D>();

    for (const springBone of this._springBones) {
      this._processSpringBone(springBone, springBonesTried, springBonesDone, objectUpdated, (springBone) =>
        springBone.setInitState(),
      );
    }
  }

  public reset(): void {
    const springBonesTried = new Set<VRMSpringBoneJoint>();
    const springBonesDone = new Set<VRMSpringBoneJoint>();
    const objectUpdated = new Set<THREE.Object3D>();

    for (const springBone of this._springBones) {
      this._processSpringBone(springBone, springBonesTried, springBonesDone, objectUpdated, (springBone) =>
        springBone.reset(),
      );
    }
  }

  public update(delta: number): void {
    const constraintsTried = new Set<VRMSpringBoneJoint>();
    const constraintsDone = new Set<VRMSpringBoneJoint>();
    const objectUpdated = new Set<THREE.Object3D>();

    for (const springBone of this._springBones) {
      // update the springbone
      this._processSpringBone(springBone, constraintsTried, constraintsDone, objectUpdated, (springBone) =>
        springBone.update(delta),
      );

      // update children world matrices
      // it is required when the spring bone chain is sparse
      traverseChildrenUntilConditionMet(springBone.bone, (object) => {
        // if the object has attached springbone, halt the traversal
        if ((this._objectSpringBonesMap.get(object)?.size ?? 0) > 0) {
          return true;
        }

        // otherwise update its world matrix
        object.updateWorldMatrix(false, false);
        return false;
      });
    }
  }

  /**
   * Update a spring bone.
   * If there are other spring bone that are dependant, it will try to update them recursively.
   * It updates matrixWorld of all ancestors and myself.
   * It might throw an error if there are circular dependencies.
   *
   * Intended to be used in {@link update} and {@link _processSpringBone} itself recursively.
   *
   * @param springBone A springBone you want to update
   * @param springBonesTried Set of springBones that are already tried to be updated
   * @param springBonesDone Set of springBones that are already up to date
   * @param objectUpdated Set of object3D whose matrixWorld is updated
   */
  private _processSpringBone(
    springBone: VRMSpringBoneJoint,
    springBonesTried: Set<VRMSpringBoneJoint>,
    springBonesDone: Set<VRMSpringBoneJoint>,
    objectUpdated: Set<THREE.Object3D>,
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
        if (!objectUpdated.has(springBone.bone)) {
          // update matrix of all nodes
          springBone.bone.updateMatrix()
          springBone.bone.updateWorldMatrix(false, false);
          objectUpdated.add(springBone.bone);
        }
        const objectSet = this._objectSpringBonesMap.get(depObjectAncestor);
        if (objectSet) {
          for (const depConstraint of objectSet) {
            this._processSpringBone(depConstraint, springBonesTried, springBonesDone, objectUpdated, callback);
          }
        }
      });
    }

    if (!objectUpdated.has(springBone.bone)) {
      // update my matrix
      springBone.bone.updateMatrix()
      springBone.bone.updateWorldMatrix(false, false);
      objectUpdated.add(springBone.bone);
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
