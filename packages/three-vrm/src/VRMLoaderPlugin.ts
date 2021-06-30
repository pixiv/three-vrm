import * as THREE from 'three';
import { GLTF, GLTFLoaderPlugin, GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRMConstraintLoaderPlugin } from '@pixiv/three-vrm-constraints';
import {
  VRMExpressionLoaderPlugin,
  VRMFirstPersonLoaderPlugin,
  VRMHumanoidLoaderPlugin,
  VRMLookAtLoaderPlugin,
  VRMMetaLoaderPlugin,
} from '@pixiv/three-vrm-core';
import { VRMSpringBoneLoaderPlugin } from '@pixiv/three-vrm-springbone';
import { MToonLoaderPlugin } from '@pixiv/three-vrm-materials-mtoon';
import { VRMLoaderPluginOptions } from './VRMLoaderPluginOptions';
import { VRM } from './VRM';

export class VRMLoaderPlugin implements GLTFLoaderPlugin {
  public readonly parser: GLTFParser;

  public readonly expressionPlugin: VRMExpressionLoaderPlugin;
  public readonly firstPersonPlugin: VRMFirstPersonLoaderPlugin;
  public readonly humanoidPlugin: VRMHumanoidLoaderPlugin;
  public readonly lookAtPlugin: VRMLookAtLoaderPlugin;
  public readonly metaPlugin: VRMMetaLoaderPlugin;
  public readonly mtoonPlugin: MToonLoaderPlugin;
  public readonly springBonePlugin: VRMSpringBoneLoaderPlugin;
  public readonly constraintPlugin: VRMConstraintLoaderPlugin;

  public constructor(parser: GLTFParser, options?: VRMLoaderPluginOptions) {
    this.parser = parser;
    this.expressionPlugin = options?.expressionPlugin ?? new VRMExpressionLoaderPlugin(parser);
    this.firstPersonPlugin = options?.firstPersonPlugin ?? new VRMFirstPersonLoaderPlugin(parser);
    this.humanoidPlugin = options?.humanoidPlugin ?? new VRMHumanoidLoaderPlugin(parser);
    this.lookAtPlugin = options?.lookAtPlugin ?? new VRMLookAtLoaderPlugin(parser);
    this.metaPlugin = options?.metaPlugin ?? new VRMMetaLoaderPlugin(parser);
    this.mtoonPlugin = options?.mtoonPlugin ?? new MToonLoaderPlugin(parser);
    this.springBonePlugin = options?.springBonePlugin ?? new VRMSpringBoneLoaderPlugin(parser);
    this.constraintPlugin = options?.constraintPlugin ?? new VRMConstraintLoaderPlugin(parser);
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
    await this.springBonePlugin.afterRoot(gltf);
    await this.constraintPlugin.afterRoot(gltf);

    const vrm = new VRM({
      scene: gltf.scene,
      expressionManager: gltf.userData.vrmExpressionManager,
      firstPerson: gltf.userData.vrmFirstPerson,
      humanoid: gltf.userData.vrmHumanoid,
      lookAt: gltf.userData.vrmLookAt,
      meta: gltf.userData.vrmMeta,
      springBoneManager: gltf.userData.vrmSpringBoneManager,
      constraintManager: gltf.userData.vrmConstraintManager,
    });
    gltf.userData.vrm = vrm;
  }
}
