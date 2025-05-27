import * as THREE from 'three';
import type { VRMSpringBoneColliderGroup } from './VRMSpringBoneColliderGroup';
import type { VRMSpringBoneJointSettings } from './VRMSpringBoneJointSettings';
/**
 * A class represents a single joint of a spring bone.
 * It should be managed by a {@link VRMSpringBoneManager}.
 */
export declare class VRMSpringBoneJoint {
    /**
     * Settings of the bone.
     */
    settings: VRMSpringBoneJointSettings;
    /**
     * Collider groups attached to this bone.
     */
    colliderGroups: VRMSpringBoneColliderGroup[];
    /**
     * An Object3D attached to this bone.
     */
    readonly bone: THREE.Object3D;
    /**
     * An Object3D that will be used as a tail of this spring bone.
     * It can be null when the spring bone is imported from VRM 0.0.
     */
    readonly child: THREE.Object3D | null;
    /**
     * Current position of child tail, in center unit. Will be used for verlet integration.
     */
    private _currentTail;
    /**
     * Previous position of child tail, in center unit. Will be used for verlet integration.
     */
    private _prevTail;
    /**
     * Initial axis of the bone, in local unit.
     */
    private _boneAxis;
    /**
     * Length of the bone in world unit.
     * Will be used for normalization in update loop, will be updated by {@link _calcWorldSpaceBoneLength}.
     *
     * It's same as local unit length unless there are scale transformations in the world space.
     */
    private _worldSpaceBoneLength;
    /**
     * Set of dependencies that need to be updated before this joint.
     */
    get dependencies(): Set<THREE.Object3D>;
    /**
     * This springbone will be calculated based on the space relative from this object.
     * If this is `null`, springbone will be calculated in world space.
     */
    private _center;
    get center(): THREE.Object3D | null;
    set center(center: THREE.Object3D | null);
    /**
     * Initial state of the local matrix of the bone.
     */
    private _initialLocalMatrix;
    /**
     * Initial state of the rotation of the bone.
     */
    private _initialLocalRotation;
    /**
     * Initial state of the position of its child.
     */
    private _initialLocalChildPosition;
    get initialLocalChildPosition(): THREE.Vector3;
    /**
     * Returns the world matrix of its parent object.
     * Note that it returns a reference to the matrix. Don't mutate this directly!
     */
    private get _parentMatrixWorld();
    /**
     * Create a new VRMSpringBone.
     *
     * @param bone An Object3D that will be attached to this bone
     * @param child An Object3D that will be used as a tail of this spring bone. It can be null when the spring bone is imported from VRM 0.0
     * @param settings Several parameters related to behavior of the spring bone
     * @param colliderGroups Collider groups that will be collided with this spring bone
     */
    constructor(bone: THREE.Object3D, child: THREE.Object3D | null, settings?: Partial<VRMSpringBoneJointSettings>, colliderGroups?: VRMSpringBoneColliderGroup[]);
    /**
     * Set the initial state of this spring bone.
     * You might want to call {@link VRMSpringBoneManager.setInitState} instead.
     */
    setInitState(): void;
    /**
     * Reset the state of this bone.
     * You might want to call {@link VRMSpringBoneManager.reset} instead.
     */
    reset(): void;
    /**
     * Update the state of this bone.
     * You might want to call {@link VRMSpringBoneManager.update} instead.
     *
     * @param delta deltaTime
     */
    update(delta: number): void;
    /**
     * Do collision math against every colliders attached to this bone.
     *
     * @param tail The tail you want to process
     */
    private _collision;
    /**
     * Calculate the {@link _worldSpaceBoneLength}.
     * Intended to be used in {@link update}.
     */
    private _calcWorldSpaceBoneLength;
    /**
     * Create a matrix that converts center space into world space.
     */
    private _getMatrixCenterToWorld;
    /**
     * Create a matrix that converts world space into center space.
     */
    private _getMatrixWorldToCenter;
}
