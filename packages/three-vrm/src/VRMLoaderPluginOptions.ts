import type * as THREE from 'three';
import type {
  VRMExpressionLoaderPlugin,
  VRMFirstPersonLoaderPlugin,
  VRMHumanoidLoaderPlugin,
  VRMLookAtLoaderPlugin,
  VRMMetaLoaderPlugin,
} from '@pixiv/three-vrm-core';
import type { MToonMaterialLoaderPlugin } from '@pixiv/three-vrm-materials-mtoon';
import type { VRMSpringBoneLoaderPlugin } from '@pixiv/three-vrm-springbone';
import type { VRMConstraintLoaderPlugin } from '@pixiv/three-vrm-constraints';

export interface VRMLoaderPluginOptions {
  expressionPlugin?: VRMExpressionLoaderPlugin;
  firstPersonPlugin?: VRMFirstPersonLoaderPlugin;
  humanoidPlugin?: VRMHumanoidLoaderPlugin;
  lookAtPlugin?: VRMLookAtLoaderPlugin;
  metaPlugin?: VRMMetaLoaderPlugin;
  mtoonMaterialPlugin?: MToonMaterialLoaderPlugin;
  springBonePlugin?: VRMSpringBoneLoaderPlugin;
  constraintPlugin?: VRMConstraintLoaderPlugin;

  /**
   * If assigned, the object will be used as a helper root of every component.
   * Useful for debug.
   * Will be overwritten if you use custom loader plugins for each components.
   */
  helperRoot?: THREE.Object3D;
}
