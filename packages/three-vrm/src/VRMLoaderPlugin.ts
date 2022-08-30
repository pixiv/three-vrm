import * as THREE from 'three';
import { GLTF, GLTFLoaderPlugin, GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {
  VRMExpressionLoaderPlugin,
  VRMFirstPersonLoaderPlugin,
  VRMHumanoid,
  VRMHumanoidLoaderPlugin,
  VRMLookAtLoaderPlugin,
  VRMMeta,
  VRMMetaLoaderPlugin,
} from '@pixiv/three-vrm-core';
import { MToonMaterialLoaderPlugin } from '@pixiv/three-vrm-materials-mtoon';
import { VRMMaterialsHDREmissiveMultiplierLoaderPlugin } from '@pixiv/three-vrm-materials-hdr-emissive-multiplier';
import { VRMMaterialsV0CompatPlugin } from '@pixiv/three-vrm-materials-v0compat';
import { VRMNodeConstraintLoaderPlugin } from '@pixiv/three-vrm-node-constraint';
import { VRMSpringBoneLoaderPlugin } from '@pixiv/three-vrm-springbone';
import { VRMLoaderPluginOptions } from './VRMLoaderPluginOptions';
import { VRM } from './VRM';

export class VRMLoaderPlugin implements GLTFLoaderPlugin {
  public readonly parser: GLTFParser;

  public readonly expressionPlugin: VRMExpressionLoaderPlugin;
  public readonly firstPersonPlugin: VRMFirstPersonLoaderPlugin;
  public readonly humanoidPlugin: VRMHumanoidLoaderPlugin;
  public readonly lookAtPlugin: VRMLookAtLoaderPlugin;
  public readonly metaPlugin: VRMMetaLoaderPlugin;
  public readonly mtoonMaterialPlugin: MToonMaterialLoaderPlugin;
  public readonly materialsHDREmissiveMultiplierPlugin: VRMMaterialsHDREmissiveMultiplierLoaderPlugin;
  public readonly materialsV0CompatPlugin: VRMMaterialsV0CompatPlugin;
  public readonly springBonePlugin: VRMSpringBoneLoaderPlugin;
  public readonly nodeConstraintPlugin: VRMNodeConstraintLoaderPlugin;

  public get name(): string {
    return 'VRMLoaderPlugin';
  }

  public constructor(parser: GLTFParser, options?: VRMLoaderPluginOptions) {
    this.parser = parser;

    const helperRoot = options?.helperRoot;
    const autoUpdateHumanBones = options?.autoUpdateHumanBones;

    this.expressionPlugin = options?.expressionPlugin ?? new VRMExpressionLoaderPlugin(parser);
    this.firstPersonPlugin = options?.firstPersonPlugin ?? new VRMFirstPersonLoaderPlugin(parser);
    this.humanoidPlugin =
      options?.humanoidPlugin ??
      new VRMHumanoidLoaderPlugin(parser, {
        helperRoot,
        autoUpdateHumanBones,
      });
    this.lookAtPlugin = options?.lookAtPlugin ?? new VRMLookAtLoaderPlugin(parser, { helperRoot });
    this.metaPlugin = options?.metaPlugin ?? new VRMMetaLoaderPlugin(parser);
    this.mtoonMaterialPlugin = options?.mtoonMaterialPlugin ?? new MToonMaterialLoaderPlugin(parser);
    this.materialsHDREmissiveMultiplierPlugin =
      options?.materialsHDREmissiveMultiplierPlugin ?? new VRMMaterialsHDREmissiveMultiplierLoaderPlugin(parser);
    this.materialsV0CompatPlugin = options?.materialsV0CompatPlugin ?? new VRMMaterialsV0CompatPlugin(parser);

    this.springBonePlugin =
      options?.springBonePlugin ??
      new VRMSpringBoneLoaderPlugin(parser, {
        colliderHelperRoot: helperRoot,
        jointHelperRoot: helperRoot,
      });

    this.nodeConstraintPlugin =
      options?.nodeConstraintPlugin ?? new VRMNodeConstraintLoaderPlugin(parser, { helperRoot });
  }

  public async beforeRoot(): Promise<void> {
    await this.materialsV0CompatPlugin.beforeRoot();
    await this.mtoonMaterialPlugin.beforeRoot();
  }

  public async loadMesh(meshIndex: number): Promise<THREE.Group | THREE.Mesh | THREE.SkinnedMesh> {
    return await this.mtoonMaterialPlugin.loadMesh(meshIndex);
  }

  public getMaterialType(materialIndex: number): typeof THREE.Material | null {
    const mtoonType = this.mtoonMaterialPlugin.getMaterialType(materialIndex);
    if (mtoonType != null) {
      return mtoonType;
    }

    return null;
  }

  public async extendMaterialParams(materialIndex: number, materialParams: { [key: string]: any }): Promise<any> {
    await this.materialsHDREmissiveMultiplierPlugin.extendMaterialParams(materialIndex, materialParams);
    await this.mtoonMaterialPlugin.extendMaterialParams(materialIndex, materialParams);
  }

  public async afterRoot(gltf: GLTF): Promise<void> {
    await this.metaPlugin.afterRoot(gltf);
    await this.humanoidPlugin.afterRoot(gltf);
    await this.expressionPlugin.afterRoot(gltf);
    await this.lookAtPlugin.afterRoot(gltf);
    await this.firstPersonPlugin.afterRoot(gltf);
    await this.springBonePlugin.afterRoot(gltf);
    await this.nodeConstraintPlugin.afterRoot(gltf);
    await this.mtoonMaterialPlugin.afterRoot(gltf);

    const meta = gltf.userData.vrmMeta as VRMMeta | null;
    const humanoid = gltf.userData.vrmHumanoid as VRMHumanoid | null;

    // meta and humanoid are required to be a VRM.
    // Don't create VRM if they are null
    if (meta && humanoid) {
      const vrm = new VRM({
        scene: gltf.scene,
        expressionManager: gltf.userData.vrmExpressionManager,
        firstPerson: gltf.userData.vrmFirstPerson,
        humanoid,
        lookAt: gltf.userData.vrmLookAt,
        meta,
        materials: gltf.userData.vrmMToonMaterials,
        springBoneManager: gltf.userData.vrmSpringBoneManager,
        nodeConstraintManager: gltf.userData.vrmNodeConstraintManager,
      });

      gltf.userData.vrm = vrm;
    }
  }
}
