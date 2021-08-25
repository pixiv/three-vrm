import { VRMExpressionLoaderPlugin } from './expressions/VRMExpressionLoaderPlugin';
import { VRMFirstPersonLoaderPlugin } from './firstPerson/VRMFirstPersonLoaderPlugin';
import { VRMHumanoidLoaderPlugin } from './humanoid/VRMHumanoidLoaderPlugin';
import { VRMLookAtLoaderPlugin } from './lookAt/VRMLookAtLoaderPlugin';
import { VRMMetaLoaderPlugin } from './meta/VRMMetaLoaderPlugin';

export interface VRMCoreLoaderPluginOptions {
  expressionPlugin?: VRMExpressionLoaderPlugin;
  firstPersonPlugin?: VRMFirstPersonLoaderPlugin;
  humanoidPlugin?: VRMHumanoidLoaderPlugin;
  lookAtPlugin?: VRMLookAtLoaderPlugin;
  metaPlugin?: VRMMetaLoaderPlugin;
}
