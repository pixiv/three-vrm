import * as THREE from 'three';
import { VRMHumanoid } from '../humanoid';
import type { VRMLookAtApplier } from './VRMLookAtApplier';
/**
 * A class controls eye gaze movements of a VRM.
 */
export declare class VRMLookAt {
    static readonly EULER_ORDER = "YXZ";
    /**
     * The origin of LookAt. Position offset from the head bone.
     */
    offsetFromHeadBone: THREE.Vector3;
    /**
     * Its associated {@link VRMHumanoid}.
     */
    readonly humanoid: VRMHumanoid;
    /**
     * The {@link VRMLookAtApplier} of the LookAt.
     */
    applier: VRMLookAtApplier;
    /**
     * If this is true, the LookAt will be updated automatically by calling {@link update}, towarding the direction to the {@link target}.
     *
     * See also: {@link target}
     */
    autoUpdate: boolean;
    /**
     * The target object of the LookAt.
     * Note that it does not make any sense if {@link autoUpdate} is disabled.
     *
     * See also: {@link autoUpdate}
     */
    target?: THREE.Object3D;
    /**
     * The front direction of the face.
     * Intended to be used for VRM 0.0 compat (VRM 0.0 models are facing Z- instead of Z+).
     * You usually don't want to touch this.
     */
    faceFront: THREE.Vector3;
    protected _euler: THREE.Euler;
    /**
     * Its current euler direction.
     */
    get euler(): THREE.Euler;
    /**
     * Create a new {@link VRMLookAt}.
     *
     * @param humanoid A {@link VRMHumanoid}
     * @param applier A {@link VRMLookAtApplier}
     */
    constructor(humanoid: VRMHumanoid, applier: VRMLookAtApplier);
    /**
     * Copy the given {@link VRMLookAt} into this one.
     * {@link humanoid} must be same as the source one.
     * {@link applier} will reference the same instance as the source one.
     * @param source The {@link VRMLookAt} you want to copy
     * @returns this
     */
    copy(source: VRMLookAt): this;
    /**
     * Returns a clone of this {@link VRMLookAt}.
     * Note that {@link humanoid} and {@link applier} will reference the same instance as this one.
     * @returns Copied {@link VRMLookAt}
     */
    clone(): VRMLookAt;
    /**
     * Reset the lookAt direction to initial direction.
     */
    reset(): void;
    /**
     * Get its head position in world coordinate.
     *
     * @param target A target `THREE.Vector3`
     */
    getLookAtWorldPosition(target: THREE.Vector3): THREE.Vector3;
    /**
     * Get its LookAt orientation in world coordinate.
     *
     * @param target A target `THREE.Vector3`
     */
    getLookAtWorldQuaternion(target: THREE.Quaternion): THREE.Quaternion;
    /**
     * Get its LookAt direction in world coordinate.
     *
     * @param target A target `THREE.Vector3`
     */
    getLookAtWorldDirection(target: THREE.Vector3): THREE.Vector3;
    /**
     * Set its LookAt position.
     * Note that its result will be instantly overwritten if {@link VRMLookAtHead.autoUpdate} is enabled.
     *
     * @param position A target position
     */
    lookAt(position: THREE.Vector3): void;
    /**
     * Update the VRMLookAtHead.
     * If {@link VRMLookAtHead.autoUpdate} is disabled, it will do nothing.
     *
     * @param delta deltaTime, it isn't used though. You can use the parameter if you want to use this in your own extended {@link VRMLookAt}.
     */
    update(delta: number): void;
    protected _calcEuler(target: THREE.Euler, position: THREE.Vector3): THREE.Euler;
}
