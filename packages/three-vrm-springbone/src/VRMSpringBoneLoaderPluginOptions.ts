import type * as THREE from 'three';
import type { VRMSpringBoneColliderHelper } from './helpers/VRMSpringBoneColliderHelper';
import type { VRMSpringBoneJointHelper } from './helpers/VRMSpringBoneJointHelper';
import type { VRMSpringBoneLimitHelper } from './helpers/VRMSpringBoneLimitHelper';

export interface VRMSpringBoneLoaderPluginOptions {
  /**
   * Specify an Object3D to add {@link VRMSpringBoneJointHelper} s.
   * If not specified, helper will not be created.
   * If `renderOrder` is set to the root, helpers will copy the same `renderOrder` .
   */
  jointHelperRoot?: THREE.Object3D;

  /**
   * Specify an Object3D to add {@link VRMSpringBoneColliderHelper} s.
   * If not specified, helper will not be created.
   * If `renderOrder` is set to the root, helpers will copy the same `renderOrder` .
   */
  colliderHelperRoot?: THREE.Object3D;

  /**
   * Specify an Object3D to add {@link VRMSpringBoneLimitHelper} s.
   * If not specified, helper will not be created.
   * If `renderOrder` is set to the root, helpers will copy the same `renderOrder` .
   */
  limitHelperRoot?: THREE.Object3D;

  /**
   * If true, load colliders defined in `VRMC_springBone_extended_collider`.
   * Set to `false` to disable loading extended colliders and use the fallback behavior.
   * `true` by default.
   */
  useExtendedColliders?: boolean;

  /**
   * If true, load limits defined in `VRMC_springBone_limit`.
   * Set to `false` to disable loading limits and use the fallback behavior.
   * `true` by default.
   */
  useLimits?: boolean;
}
