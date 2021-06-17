import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import {
  VRMExpressionImporter,
  VRMFirstPersonImporter,
  VRMHumanoidImporter,
  VRMLookAtImporter,
  VRMMetaImporter,
} from '@pixiv/three-vrm-core';
import { VRMCMaterialsMToonExtensionPlugin } from '@pixiv/three-vrm-materials-mtoon';
import { VRMSpringBoneImporter } from '@pixiv/three-vrm-springbone';
import { VRMConstraintImporter } from '@pixiv/three-vrm-constraints';
import { VRM } from './VRM';

export interface VRMImporterOptions {
  metaImporter?: VRMMetaImporter;
  lookAtImporter?: VRMLookAtImporter;
  humanoidImporter?: VRMHumanoidImporter;
  expressionImporter?: VRMExpressionImporter;
  firstPersonImporter?: VRMFirstPersonImporter;
  vrmcMaterialsMToonExtensionPlugin?: VRMCMaterialsMToonExtensionPlugin;
  springBoneImporter?: VRMSpringBoneImporter;
  constraintImporter?: VRMConstraintImporter;
}

/**
 * An importer that imports a [[VRM]] from a VRM extension of a GLTF.
 */
export class VRMImporter {
  protected readonly _metaImporter: VRMMetaImporter;
  protected readonly _expressionImporter: VRMExpressionImporter;
  protected readonly _lookAtImporter: VRMLookAtImporter;
  protected readonly _humanoidImporter: VRMHumanoidImporter;
  protected readonly _firstPersonImporter: VRMFirstPersonImporter;
  protected readonly _vrmcMaterialsMToonExtensionPlugin: VRMCMaterialsMToonExtensionPlugin;
  protected readonly _springBoneImporter: VRMSpringBoneImporter;
  protected readonly _constraintImporter: VRMConstraintImporter;

  /**
   * Create a new VRMImporter.
   *
   * @param options [[VRMImporterOptions]], optionally contains importers for each component
   */
  public constructor(options: VRMImporterOptions = {}) {
    this._metaImporter = options.metaImporter ?? new VRMMetaImporter();
    this._expressionImporter = options.expressionImporter ?? new VRMExpressionImporter();
    this._lookAtImporter = options.lookAtImporter ?? new VRMLookAtImporter();
    this._humanoidImporter = options.humanoidImporter ?? new VRMHumanoidImporter();
    this._firstPersonImporter = options.firstPersonImporter ?? new VRMFirstPersonImporter();
    this._vrmcMaterialsMToonExtensionPlugin =
      options.vrmcMaterialsMToonExtensionPlugin ?? new VRMCMaterialsMToonExtensionPlugin();
    this._springBoneImporter = options.springBoneImporter ?? new VRMSpringBoneImporter();
    this._constraintImporter = options.constraintImporter ?? new VRMConstraintImporter();
  }

  /**
   * Receive a GLTF object retrieved from `THREE.GLTFLoader` and create a new [[VRM]] instance.
   *
   * @param gltf A parsed result of GLTF taken from GLTFLoader
   */
  public async import(gltf: GLTF): Promise<VRM> {
    if (gltf.parser.json.extensions === undefined || gltf.parser.json.extensions.VRM === undefined) {
      throw new Error('Could not find VRM extension on the GLTF');
    }
    const scene = gltf.scene;

    scene.updateMatrixWorld(false);

    // Skinned object should not be frustumCulled
    // Since pre-skinned position might be outside of view
    scene.traverse((object3d) => {
      if ((object3d as any).isMesh) {
        object3d.frustumCulled = false;
      }
    });

    const meta = (await this._metaImporter.import(gltf)) ?? undefined;

    const materials = (await this._vrmcMaterialsMToonExtensionPlugin.convertGLTFMaterials(gltf)) ?? undefined;

    const humanoid = (await this._humanoidImporter.import(gltf)) ?? undefined;

    const firstPerson = humanoid ? (await this._firstPersonImporter.import(gltf, humanoid)) ?? undefined : undefined;

    const expressionManager = (await this._expressionImporter.import(gltf)) ?? undefined;

    const lookAt =
      firstPerson && expressionManager && humanoid
        ? (await this._lookAtImporter.import(gltf, firstPerson, expressionManager, humanoid)) ?? undefined
        : undefined;

    const springBoneManager = (await this._springBoneImporter.import(gltf)) ?? undefined;

    const constraintManager = (await this._constraintImporter.import(gltf)) ?? undefined;

    return new VRM({
      scene: gltf.scene,
      meta,
      materials,
      humanoid,
      firstPerson,
      expressionManager,
      lookAt,
      springBoneManager,
      constraintManager,
    });
  }
}
