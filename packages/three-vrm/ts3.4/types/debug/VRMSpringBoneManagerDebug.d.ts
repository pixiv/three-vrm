import * as THREE from 'three';
import { VRMSpringBoneManager } from '../springbone';
import { VRMDebugOptions } from './VRMDebugOptions';
import { VRMSpringBoneDebug } from './VRMSpringBoneDebug';
/**
 * Represents a single spring bone group of a VRM.
 */
export declare type VRMSpringBoneGroupDebug = VRMSpringBoneDebug[];
export declare class VRMSpringBoneManagerDebug extends VRMSpringBoneManager {
    setupHelper(scene: THREE.Object3D, debugOption: VRMDebugOptions): void;
}
