import * as THREE from 'three';
import { VRMSpringBone } from '../springbone';
import { VRMSpringBoneParameters } from '../springbone/VRMSpringBoneParameters';
export declare class VRMSpringBoneDebug extends VRMSpringBone {
    private _gizmo?;
    constructor(bone: THREE.Object3D, params: VRMSpringBoneParameters);
    /**
     * Return spring bone gizmo, as `THREE.ArrowHelper`.
     * Useful for debugging spring bones.
     */
    getGizmo(): THREE.ArrowHelper;
    update(delta: number): void;
    private _updateGizmo;
}
