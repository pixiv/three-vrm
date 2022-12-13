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
     * `true` by default.
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
    target?: THREE.Object3D | null;
    /**
     * The front direction of the face.
     * Intended to be used for VRM 0.0 compat (VRM 0.0 models are facing Z- instead of Z+).
     * You usually don't want to touch this.
     */
    faceFront: THREE.Vector3;
    /**
     * Its current angle around Y axis, in degree.
     */
    protected _yaw: number;
    /**
     * Its current angle around Y axis, in degree.
     */
    get yaw(): number;
    /**
     * Its current angle around Y axis, in degree.
     */
    set yaw(value: number);
    /**
     * Its current angle around X axis, in degree.
     */
    protected _pitch: number;
    /**
     * Its current angle around X axis, in degree.
     */
    get pitch(): number;
    /**
     * Its current angle around X axis, in degree.
     */
    set pitch(value: number);
    /**
     * Specifies that angles need to be applied to its [@link applier].
     */
    protected _needsUpdate: boolean;
    /**
     * World rotation of the head in its rest pose.
     */
    private _restHeadWorldQuaternion;
    /**
     * @deprecated Use {@link getEuler} instead.
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
     * Get its yaw-pitch angles as an `Euler`.
     * Does NOT consider {@link faceFront}; it returns `Euler(0, 0, 0; "YXZ")` by default regardless of the faceFront value.
     *
     * @param target The target euler
     */
    getEuler(target: THREE.Euler): THREE.Euler;
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
     * Reset the lookAt direction (yaw and pitch) to the initial direction.
     */
    reset(): void;
    /**
     * Get its lookAt position in world coordinate.
     *
     * @param target A target `THREE.Vector3`
     */
    getLookAtWorldPosition(target: THREE.Vector3): THREE.Vector3;
    /**
     * Get its lookAt rotation in world coordinate.
     * Does NOT consider {@link faceFront}.
     *
     * @param target A target `THREE.Quaternion`
     */
    getLookAtWorldQuaternion(target: THREE.Quaternion): THREE.Quaternion;
    /**
     * Get a quaternion that rotates the +Z unit vector of the humanoid Head to the {@link faceFront} direction.
     *
     * @param target A target `THREE.Quaternion`
     */
    getFaceFrontQuaternion(target: THREE.Quaternion): THREE.Quaternion;
    /**
     * Get its LookAt direction in world coordinate.
     *
     * @param target A target `THREE.Vector3`
     */
    getLookAtWorldDirection(target: THREE.Vector3): THREE.Vector3;
    /**
     * Set its lookAt target position.
     *
     * Note that its result will be instantly overwritten if {@link VRMLookAtHead.autoUpdate} is enabled.
     *
     * If you want to track an object continuously, you might want to use {@link target} instead.
     *
     * @param position A target position, in world space
     */
    lookAt(position: THREE.Vector3): void;
    /**
     * Update the VRMLookAtHead.
     * If {@link autoUpdate} is enabled, this will make it look at the {@link target}.
     *
     * @param delta deltaTime, it isn't used though. You can use the parameter if you want to use this in your own extended {@link VRMLookAt}.
     */
    update(delta: number): void;
}
