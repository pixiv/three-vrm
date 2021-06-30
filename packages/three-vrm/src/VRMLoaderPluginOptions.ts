import type {
  VRMExpressionLoaderPlugin,
  VRMFirstPersonLoaderPlugin,
  VRMHumanoidLoaderPlugin,
  VRMLookAtLoaderPlugin,
  VRMMetaLoaderPlugin,
} from '@pixiv/three-vrm-core';
import type { MToonLoaderPlugin } from '@pixiv/three-vrm-materials-mtoon';
import type { VRMSpringBoneLoaderPlugin } from '@pixiv/three-vrm-springbone';
import type { VRMConstraintLoaderPlugin } from '@pixiv/three-vrm-constraints';

export interface VRMLoaderPluginOptions {
  expressionPlugin?: VRMExpressionLoaderPlugin;
  firstPersonPlugin?: VRMFirstPersonLoaderPlugin;
  humanoidPlugin?: VRMHumanoidLoaderPlugin;
  lookAtPlugin?: VRMLookAtLoaderPlugin;
  metaPlugin?: VRMMetaLoaderPlugin;
  mtoonPlugin?: MToonLoaderPlugin;
  springBonePlugin?: VRMSpringBoneLoaderPlugin;
  constraintPlugin?: VRMConstraintLoaderPlugin;
}
