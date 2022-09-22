import type * as THREE from 'three';
import type { VRMSpringBoneJoint } from './VRMSpringBoneJoint';
import { traverseAncestorsFromRoot } from './utils/traverseAncestorsFromRoot';
import type { VRMSpringBoneCollider } from './VRMSpringBoneCollider';
import type { VRMSpringBoneColliderGroup } from './VRMSpringBoneColliderGroup';
import { traverseChildrenUntilConditionMet } from './utils/traverseChildrenUntilConditionMet';

export class VRMSpringBoneManager {
  private _joints = new Set<VRMSpringBoneJoint>();
  public get joints(): Set<VRMSpringBoneJoint> {
    return this._joints;
  }

  /**
   * @deprecated Use {@link joints} instead.
   */
  public get springBones(): Set<VRMSpringBoneJoint> {
    console.warn('VRMSpringBoneManager: springBones is deprecated. use joints instead.');

    return this._joints;
  }

  public get colliderGroups(): VRMSpringBoneColliderGroup[] {
    const set = new Set<VRMSpringBoneColliderGroup>();
    this._joints.forEach((springBone) => {
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

  public addJoint(joint: VRMSpringBoneJoint): void {
    this._joints.add(joint);

    let objectSet = this._objectSpringBonesMap.get(joint.bone);
    if (objectSet == null) {
      objectSet = new Set<VRMSpringBoneJoint>();
      this._objectSpringBonesMap.set(joint.bone, objectSet);
    }
    objectSet.add(joint);
  }

  /**
   * @deprecated Use {@link addJoint} instead.
   */
  public addSpringBone(joint: VRMSpringBoneJoint): void {
    console.warn('VRMSpringBoneManager: addSpringBone() is deprecated. use addJoint() instead.');

    this.addJoint(joint);
  }

  public deleteJoint(joint: VRMSpringBoneJoint): void {
    this._joints.delete(joint);

    const objectSet = this._objectSpringBonesMap.get(joint.bone)!;
    objectSet.delete(joint);
  }

  /**
   * @deprecated Use {@link deleteJoint} instead.
   */
  public deleteSpringBone(joint: VRMSpringBoneJoint): void {
    console.warn('VRMSpringBoneManager: deleteSpringBone() is deprecated. use deleteJoint() instead.');

    this.deleteJoint(joint);
  }

  public setInitState(): void {
    const springBonesTried = new Set<VRMSpringBoneJoint>();
    const springBonesDone = new Set<VRMSpringBoneJoint>();
    const objectUpdated = new Set<THREE.Object3D>();

    for (const springBone of this._joints) {
      this._processSpringBone(springBone, springBonesTried, springBonesDone, objectUpdated, (springBone) =>
        springBone.setInitState(),
      );
    }
  }

  public reset(): void {
    const springBonesTried = new Set<VRMSpringBoneJoint>();
    const springBonesDone = new Set<VRMSpringBoneJoint>();
    const objectUpdated = new Set<THREE.Object3D>();

    for (const springBone of this._joints) {
      this._processSpringBone(springBone, springBonesTried, springBonesDone, objectUpdated, (springBone) =>
        springBone.reset(),
      );
    }
  }

  public update(delta: number): void {
    const springBonesTried = new Set<VRMSpringBoneJoint>();
    const springBonesDone = new Set<VRMSpringBoneJoint>();
    const objectUpdated = new Set<THREE.Object3D>();

    for (const springBone of this._joints) {
      // update the springbone
      this._processSpringBone(springBone, springBonesTried, springBonesDone, objectUpdated, (springBone) =>
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
      throw new Error('VRMSpringBoneManager: Circular dependency detected while updating springbones');
    }
    springBonesTried.add(springBone);

    const depObjects = this._getDependencies(springBone);
    for (const depObject of depObjects) {
      traverseAncestorsFromRoot(depObject, (depObjectAncestor) => {
        const objectSet = this._objectSpringBonesMap.get(depObjectAncestor);
        if (objectSet) {
          for (const depSpringBone of objectSet) {
            this._processSpringBone(depSpringBone, springBonesTried, springBonesDone, objectUpdated, callback);
          }
        } else if (!objectUpdated.has(depObjectAncestor)) {
          // update matrix of non-springbone
          depObjectAncestor.updateWorldMatrix(false, false);
          objectUpdated.add(depObjectAncestor);
        }
      });
    }

    // update my matrix
    springBone.bone.updateMatrix();
    springBone.bone.updateWorldMatrix(false, false);

    callback(springBone);

    objectUpdated.add(springBone.bone);

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

    springBone.colliderGroups.forEach((colliderGroup) => {
      colliderGroup.colliders.forEach((collider) => {
        set.add(collider);
      });
    });

    return set;
  }
}
