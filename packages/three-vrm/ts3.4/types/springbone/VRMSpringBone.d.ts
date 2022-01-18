import * as THREE from 'three';
import { VRMSpringBoneColliderMesh } from './VRMSpringBoneColliderGroup';
import { VRMSpringBoneParameters } from './VRMSpringBoneParameters';
/**
 * A class represents a single spring bone of a VRM.
 * It should be managed by a [[VRMSpringBoneManager]].
 */
export declare class VRMSpringBone {
    /**
     * Radius of the bone, will be used for collision.
     */
    radius: number;
    /**
     * Stiffness force of the bone. Increasing the value = faster convergence (feels "harder").
     * On UniVRM, its range on GUI is between `0.0` and `4.0` .
     */
    stiffnessForce: number;
    /**
     * Power of the gravity against this bone.
     * The "power" used in here is very far from scientific physics term...
     */
    gravityPower: number;
    /**
     * Direction of the gravity against this bone.
     * Usually it should be normalized.
     */
    gravityDir: THREE.Vector3;
    /**
     * Drag force of the bone. Increasing the value = less oscillation (feels "heavier").
     * On UniVRM, its range on GUI is between `0.0` and `1.0` .
     */
    dragForce: number;
    /**
     * Collider groups attached to this bone.
     */
    colliders: VRMSpringBoneColliderMesh[];
    /**
     * An Object3D attached to this bone.
     */
    readonly bone: THREE.Object3D;
    /**
     * Current position of child tail, in world unit. Will be used for verlet integration.
     */
    protected _currentTail: THREE.Vector3;
    /**
     * Previous position of child tail, in world unit. Will be used for verlet integration.
     */
    protected _prevTail: THREE.Vector3;
    /**
     * Next position of child tail, in world unit. Will be used for verlet integration.
     * Actually used only in [[update]] and it's kind of temporary variable.
     */
    protected _nextTail: THREE.Vector3;
    /**
     * Initial axis of the bone, in local unit.
     */
    protected _boneAxis: THREE.Vector3;
    /**
     * Length of the bone in relative space unit. Will be used for normalization in update loop.
     * It's same as local unit length unless there are scale transformation in world matrix.
     */
    protected _centerSpaceBoneLength: number;
    /**
     * Position of this bone in relative space, kind of a temporary variable.
     */
    protected _centerSpacePosition: THREE.Vector3;
    /**
     * This springbone will be calculated based on the space relative from this object.
     * If this is `null`, springbone will be calculated in world space.
     */
    protected _center: THREE.Object3D | null;
    center: THREE.Object3D | null;
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
    /**
     * Create a new VRMSpringBone.
     *
     * @param bone An Object3D that will be attached to this bone
     * @param params Several parameters related to behavior of the spring bone
     */
    constructor(bone: THREE.Object3D, params?: VRMSpringBoneParameters);
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
