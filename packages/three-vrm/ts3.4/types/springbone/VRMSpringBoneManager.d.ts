import { VRMSpringBone } from './VRMSpringBone';
import { VRMSpringBoneColliderGroup } from './VRMSpringBoneColliderGroup';
/**
 * Represents a single spring bone group of a VRM.
 */
export declare type VRMSpringBoneGroup = VRMSpringBone[];
/**
 * A class manages every spring bones on a VRM.
 */
export declare class VRMSpringBoneManager {
    readonly colliderGroups: VRMSpringBoneColliderGroup[];
    readonly springBoneGroupList: VRMSpringBoneGroup[];
    /**
     * Create a new [[VRMSpringBoneManager]]
     *
     * @param springBoneGroupList An array of [[VRMSpringBoneGroup]]
     */
    constructor(colliderGroups: VRMSpringBoneColliderGroup[], springBoneGroupList: VRMSpringBoneGroup[]);
    /**
     * Set all bones be calculated based on the space relative from this object.
     * If `null` is given, springbone will be calculated in world space.
     * @param root Root object, or `null`
     */
    setCenter(root: THREE.Object3D | null): void;
    /**
     * Update every spring bone attached to this manager.
     *
     * @param delta deltaTime
     */
    lateUpdate(delta: number): void;
    /**
     * Reset every spring bone attached to this manager.
     */
    reset(): void;
}
