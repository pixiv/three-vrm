import type { VRMSpringBoneJoint } from './VRMSpringBoneJoint';
import type { VRMSpringBoneCollider } from './VRMSpringBoneCollider';
import type { VRMSpringBoneColliderGroup } from './VRMSpringBoneColliderGroup';
export declare class VRMSpringBoneManager {
    private _springBones;
    get springBones(): Set<VRMSpringBoneJoint>;
    get colliderGroups(): VRMSpringBoneColliderGroup[];
    get colliders(): VRMSpringBoneCollider[];
    private _objectSpringBonesMap;
    addSpringBone(springBone: VRMSpringBoneJoint): void;
    deleteSpringBone(springBone: VRMSpringBoneJoint): void;
    setInitState(): void;
    reset(): void;
    update(delta: number): void;
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
    private _processSpringBone;
    /**
     * Return a set of objects that are dependant of given spring bone.
     * @param springBone A spring bone
     * @return A set of objects that are dependant of given spring bone
     */
    private _getDependencies;
}
