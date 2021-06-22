import * as THREE from 'three';
import { GLTF, GLTFLoaderPlugin, GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader';
import {
  VRMExpressionPlugin,
  VRMFirstPersonPlugin,
  VRMHumanoidPlugin,
  VRMLookAtPlugin,
  VRMMetaPlugin,
} from '@pixiv/three-vrm-core';
import { VRMCMaterialsMToonExtensionPlugin } from '@pixiv/three-vrm-materials-mtoon';
import { VRMPluginOptions } from './VRMPluginOptions';
import { VRM } from './VRM';

export class VRMPlugin implements GLTFLoaderPlugin {
  public readonly parser: GLTFParser;

  public readonly expressionPlugin: VRMExpressionPlugin;
  public readonly firstPersonPlugin: VRMFirstPersonPlugin;
  public readonly humanoidPlugin: VRMHumanoidPlugin;
  public readonly lookAtPlugin: VRMLookAtPlugin;
  public readonly metaPlugin: VRMMetaPlugin;
  public readonly mtoonPlugin: VRMCMaterialsMToonExtensionPlugin;

  public constructor(parser: GLTFParser, options?: VRMPluginOptions) {
    this.parser = parser;
    this.expressionPlugin = options?.expressionPlugin ?? new VRMExpressionPlugin(parser);
    this.firstPersonPlugin = options?.firstPersonPlugin ?? new VRMFirstPersonPlugin(parser);
    this.humanoidPlugin = options?.humanoidPlugin ?? new VRMHumanoidPlugin(parser);
    this.lookAtPlugin = options?.lookAtPlugin ?? new VRMLookAtPlugin(parser);
    this.metaPlugin = options?.metaPlugin ?? new VRMMetaPlugin(parser);
    this.mtoonPlugin = options?.mtoonPlugin ?? new VRMCMaterialsMToonExtensionPlugin(parser);
  }

  public async beforeRoot(): Promise<void> {
    await this.mtoonPlugin.beforeRoot();
  }

  public async loadMesh(meshIndex: number): Promise<THREE.Group | THREE.Mesh | THREE.SkinnedMesh> {
    return await this.mtoonPlugin.loadMesh(meshIndex);
  }

  public getMaterialType(materialIndex: number): typeof THREE.Material | null {
    const mtoonType = this.mtoonPlugin.getMaterialType(materialIndex);
    if (mtoonType != null) {
      return mtoonType;
    }

    return null;
  }

  public async extendMaterialParams(materialIndex: number, materialParams: { [key: string]: any }): Promise<any> {
    await this.mtoonPlugin.extendMaterialParams(materialIndex, materialParams);
  }

  public async afterRoot(gltf: GLTF): Promise<void> {
    await this.metaPlugin.afterRoot(gltf);
    await this.humanoidPlugin.afterRoot(gltf);
    await this.expressionPlugin.afterRoot(gltf);
    await this.lookAtPlugin.afterRoot(gltf);
    await this.firstPersonPlugin.afterRoot(gltf);

    const vrm = new VRM({
      scene: gltf.scene,
      expressionManager: gltf.userData.vrmExpressionManager,
      firstPerson: gltf.userData.vrmFirstPerson,
      humanoid: gltf.userData.vrmHumanoid,
      lookAt: gltf.userData.vrmLookAt,
      meta: gltf.userData.vrmMeta,
    });
    gltf.userData.vrm = vrm;
  }
}
