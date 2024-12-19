import type { VRMSpringBoneJoint } from './VRMSpringBoneJoint.js';
import type { VRMSpringBoneCollider } from './VRMSpringBoneCollider.js';
import type { VRMSpringBoneColliderGroup } from './VRMSpringBoneColliderGroup.js';
export declare class VRMSpringBoneManager {
    private _joints;
    private _sortedJoints;
    private _hasWarnedCircularDependency;
    /**
     * An ordered list of ancestors of all the SpringBone joints. Before the
     * SpringBone joints can be updated, the world matrices of these ancestors
     * must be calculated. The first element is the lowest common ancestor, for
     * which not only its world matrix but its ancestors' world matrices are
     * updated as well.
     */
    private _ancestors;
    get joints(): Set<VRMSpringBoneJoint>;
    /**
     * @deprecated Use {@link joints} instead.
     */
    get springBones(): Set<VRMSpringBoneJoint>;
    get colliderGroups(): VRMSpringBoneColliderGroup[];
    get colliders(): VRMSpringBoneCollider[];
    private _objectSpringBonesMap;
    private _isSortedJointsDirty;
    constructor();
    addJoint(joint: VRMSpringBoneJoint): void;
    /**
     * @deprecated Use {@link addJoint} instead.
     */
    addSpringBone(joint: VRMSpringBoneJoint): void;
    deleteJoint(joint: VRMSpringBoneJoint): void;
    /**
     * @deprecated Use {@link deleteJoint} instead.
     */
    deleteSpringBone(joint: VRMSpringBoneJoint): void;
    setInitState(): void;
    reset(): void;
    update(delta: number): void;
    /**
     * Sorts the joints ensuring they are updated in the correct order taking dependencies into account.
     *
     * This method updates {@link _sortedJoints} and {@link _ancestors}.
     * Make sure to call this before using them.
     */
    private _sortJoints;
    private _insertJointSort;
    private _relevantChildrenUpdated;
}
