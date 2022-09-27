import { GLTF, GLTFLoaderPlugin, GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { VRMCoreLoaderPluginOptions } from './VRMCoreLoaderPluginOptions';
import { VRMCore } from './VRMCore';
import { VRMExpressionLoaderPlugin } from './expressions/VRMExpressionLoaderPlugin';
import { VRMFirstPersonLoaderPlugin } from './firstPerson/VRMFirstPersonLoaderPlugin';
import { VRMHumanoidLoaderPlugin } from './humanoid/VRMHumanoidLoaderPlugin';
import { VRMMetaLoaderPlugin } from './meta/VRMMetaLoaderPlugin';
import { VRMLookAtLoaderPlugin } from './lookAt/VRMLookAtLoaderPlugin';
import type { VRMHumanoid } from './humanoid';
import type { VRMMeta } from './meta';

export class VRMCoreLoaderPlugin implements GLTFLoaderPlugin {
  public get name(): string {
    // We should use the extension name instead but we have multiple plugins for an extension...
    return 'VRMC_vrm';
  }

  public readonly parser: GLTFParser;

  public readonly expressionPlugin: VRMExpressionLoaderPlugin;
  public readonly firstPersonPlugin: VRMFirstPersonLoaderPlugin;
  public readonly humanoidPlugin: VRMHumanoidLoaderPlugin;
  public readonly lookAtPlugin: VRMLookAtLoaderPlugin;
  public readonly metaPlugin: VRMMetaLoaderPlugin;

  public constructor(parser: GLTFParser, options?: VRMCoreLoaderPluginOptions) {
    this.parser = parser;

    const helperRoot = options?.helperRoot;
    const autoUpdateHumanBones = options?.autoUpdateHumanBones;

    this.expressionPlugin = options?.expressionPlugin ?? new VRMExpressionLoaderPlugin(parser);
    this.firstPersonPlugin = options?.firstPersonPlugin ?? new VRMFirstPersonLoaderPlugin(parser);
    this.humanoidPlugin =
      options?.humanoidPlugin ?? new VRMHumanoidLoaderPlugin(parser, { helperRoot, autoUpdateHumanBones });
    this.lookAtPlugin = options?.lookAtPlugin ?? new VRMLookAtLoaderPlugin(parser, { helperRoot });
    this.metaPlugin = options?.metaPlugin ?? new VRMMetaLoaderPlugin(parser);
  }

  public async afterRoot(gltf: GLTF): Promise<void> {
    await this.metaPlugin.afterRoot(gltf);
    await this.humanoidPlugin.afterRoot(gltf);
    await this.expressionPlugin.afterRoot(gltf);
    await this.lookAtPlugin.afterRoot(gltf);
    await this.firstPersonPlugin.afterRoot(gltf);

    const meta = gltf.userData.vrmMeta as VRMMeta | null;
    const humanoid = gltf.userData.vrmHumanoid as VRMHumanoid | null;

    // meta and humanoid are required to be a VRM.
    // Don't create VRM if they are null
    if (meta && humanoid) {
      const vrmCore = new VRMCore({
        scene: gltf.scene,
        expressionManager: gltf.userData.vrmExpressionManager,
        firstPerson: gltf.userData.vrmFirstPerson,
        humanoid,
        lookAt: gltf.userData.vrmLookAt,
        meta,
      });

      gltf.userData.vrmCore = vrmCore;
    }
  }
}
