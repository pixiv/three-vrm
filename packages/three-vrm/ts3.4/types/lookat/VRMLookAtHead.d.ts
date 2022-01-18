import * as THREE from 'three';
import { VRMFirstPerson } from '../firstperson/VRMFirstPerson';
import { VRMLookAtApplyer } from './VRMLookAtApplyer';
/**
 * A class represents look at of a VRM.
 */
export declare class VRMLookAtHead {
    static readonly EULER_ORDER = "YXZ";
    /**
     * Associated [[VRMFirstPerson]], will be used for direction calculation.
     */
    readonly firstPerson: VRMFirstPerson;
    /**
     * Associated [[VRMLookAtApplyer]], its look at direction will be applied to the model using this applier.
     */
    readonly applyer?: VRMLookAtApplyer;
    /**
     * If this is true, its look at direction will be updated automatically by calling [[VRMLookAtHead.update]] (which is called from [[VRM.update]]).
     *
     * See also: [[VRMLookAtHead.target]]
     */
    autoUpdate: boolean;
    /**
     * The target object of the look at.
     * Note that it does not make any sense if [[VRMLookAtHead.autoUpdate]] is disabled.
     */
    target?: THREE.Object3D;
    protected _euler: THREE.Euler;
    /**
     * Create a new VRMLookAtHead.
     *
     * @param firstPerson A [[VRMFirstPerson]] that will be associated with this new VRMLookAtHead
     * @param applyer A [[VRMLookAtApplyer]] that will be associated with this new VRMLookAtHead
     */
    constructor(firstPerson: VRMFirstPerson, applyer?: VRMLookAtApplyer);
    /**
     * Get its look at direction in world coordinate.
     *
     * @param target A target `THREE.Vector3`
     */
    getLookAtWorldDirection(target: THREE.Vector3): THREE.Vector3;
    /**
     * Set its look at position.
     * Note that its result will be instantly overwritten if [[VRMLookAtHead.autoUpdate]] is enabled.
     *
     * @param position A target position
     */
    lookAt(position: THREE.Vector3): void;
    /**
     * Update the VRMLookAtHead.
     * If [[VRMLookAtHead.autoUpdate]] is disabled, it will do nothing.
     *
     * @param delta deltaTime
     */
    update(delta: number): void;
    protected _calcEuler(target: THREE.Euler, position: THREE.Vector3): THREE.Euler;
}
