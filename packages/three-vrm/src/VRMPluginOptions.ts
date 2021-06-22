import {
  VRMExpressionPlugin,
  VRMFirstPersonPlugin,
  VRMHumanoidPlugin,
  VRMLookAtPlugin,
  VRMMetaPlugin,
} from 'packages/three-vrm-core/types';
import { VRMCMaterialsMToonExtensionPlugin } from '@pixiv/three-vrm-materials-mtoon';

export interface VRMPluginOptions {
  expressionPlugin?: VRMExpressionPlugin;
  firstPersonPlugin?: VRMFirstPersonPlugin;
  humanoidPlugin?: VRMHumanoidPlugin;
  lookAtPlugin?: VRMLookAtPlugin;
  metaPlugin?: VRMMetaPlugin;
  mtoonPlugin?: VRMCMaterialsMToonExtensionPlugin;
}
