import * as THREE from 'three';
import type { VRMSpringBoneColliderGroup } from './VRMSpringBoneColliderGroup';
import type { VRMSpringBoneJointSettings } from './VRMSpringBoneJointSettings';
/**
 * A class represents a single joint of a spring bone.
 * It should be managed by a [[VRMSpringBoneManager]].
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
     * Current position of child tail, in world unit. Will be used for verlet integration.
     */
    private _currentTail;
    /**
     * Previous position of child tail, in world unit. Will be used for verlet integration.
     */
    private _prevTail;
    /**
     * Next position of child tail, in world unit. Will be used for verlet integration.
     * Actually used only in [[update]] and it's kind of temporary variable.
     */
    private _nextTail;
    /**
     * Initial axis of the bone, in local unit.
     */
    private _boneAxis;
    /**
     * Length of the bone in relative space unit. Will be used for normalization in update loop.
     * It's same as local unit length unless there are scale transformation in world matrix.
     */
    private _centerSpaceBoneLength;
    /**
     * Position of this bone in relative space, kind of a temporary variable.
     */
    private _centerSpacePosition;
    /**
     * This springbone will be calculated based on the space relative from this object.
     * If this is `null`, springbone will be calculated in world space.
     */
    private _center;
    get center(): THREE.Object3D | null;
    set center(center: THREE.Object3D | null);
    /**
     * Rotation of parent bone, in world unit.
     * We should update this constantly in [[update]].
     */
    private _parentWorldRotation;
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
     * You might want to call [[VRMSpringBoneManager.reset]] instead.
     */
    reset(): void;
    /**
     * Update the state of this bone.
     * You might want to call [[VRMSpringBoneManager.update]] instead.
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
     * Create a matrix that converts center space into world space.
     * @param target Target matrix
     */
    private _getMatrixCenterToWorld;
    /**
     * Create a matrix that converts world space into center space.
     * @param target Target matrix
     */
    private _getMatrixWorldToCenter;
    /**
     * Returns the world matrix of its parent object.
     */
    private _getParentMatrixWorld;
}
