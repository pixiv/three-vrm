import * as THREE from 'three';
import { VRMBlendShapeImporter } from './blendshape';
import { VRMFirstPersonImporter } from './firstperson';
import { VRMHumanoidImporter } from './humanoid/VRMHumanoidImporter';
import { VRMLookAtImporter } from './lookat/VRMLookAtImporter';
import { VRMMaterialImporter } from './material';
import { reduceBones } from './reduceBones';
import { VRMSpringBoneImporter } from './springbone/VRMSpringBoneImporter';
import { VRMSchema } from './types';
import { VRM } from './VRM';

export interface VRMImporterOptions {
  lookAtImporter?: VRMLookAtImporter;
  humanoidImporter?: VRMHumanoidImporter;
  blendShapeImporter?: VRMBlendShapeImporter;
  firstPersonImporter?: VRMFirstPersonImporter;
  materialImporter?: VRMMaterialImporter;
  springBoneImporter?: VRMSpringBoneImporter;
}

/**
 * An importer that imports a [[VRM]] from a VRM extension of a GLTF.
 */
export class VRMImporter {
  protected readonly _blendShapeImporter: VRMBlendShapeImporter;
  protected readonly _lookAtImporter: VRMLookAtImporter;
  protected readonly _humanoidImporter: VRMHumanoidImporter;
  protected readonly _firstPersonImporter: VRMFirstPersonImporter;
  protected readonly _materialImporter: VRMMaterialImporter;
  protected readonly _springBoneImporter: VRMSpringBoneImporter;

  /**
   * Create a new VRMImporter.
   *
   * @param options [[VRMImporterOptions]], optionally contains importers for each component
   */
  public constructor(options: VRMImporterOptions = {}) {
    this._blendShapeImporter = options.blendShapeImporter || new VRMBlendShapeImporter();
    this._lookAtImporter = options.lookAtImporter || new VRMLookAtImporter();
    this._humanoidImporter = options.humanoidImporter || new VRMHumanoidImporter();
    this._firstPersonImporter = options.firstPersonImporter || new VRMFirstPersonImporter();
    this._materialImporter = options.materialImporter || new VRMMaterialImporter();
    this._springBoneImporter = options.springBoneImporter || new VRMSpringBoneImporter();
  }

  /**
   * Receive a GLTF object retrieved from `THREE.GLTFLoader` and create a new [[VRM]] instance.
   *
   * @param gltf A parsed result of GLTF taken from GLTFLoader
   */
  public async import(gltf: THREE.GLTF): Promise<VRM> {
    if (gltf.parser.json.extensions === undefined || gltf.parser.json.extensions.VRM === undefined) {
      throw new Error('Could not find VRM extension on the GLTF');
    }
    const vrmExt: VRMSchema.VRM = gltf.parser.json.extensions.VRM;

    const scene = gltf.scene;

    scene.updateMatrixWorld(false);

    // Skinned object should not be frustumCulled
    // Since pre-skinned position might be outside of view
    scene.traverse((object3d) => {
      if ((object3d as any).isMesh) {
        object3d.frustumCulled = false;
      }
    });

    reduceBones(scene);

    const materials = await this._materialImporter.convertGLTFMaterials(gltf);

    const humanoid = vrmExt.humanoid
      ? (await this._humanoidImporter.import(gltf, vrmExt.humanoid)) || undefined
      : undefined;

    const firstPerson =
      vrmExt.firstPerson && humanoid
        ? (await this._firstPersonImporter.import(gltf, humanoid, vrmExt.firstPerson)) || undefined
        : undefined;

    const blendShapeProxy = vrmExt.blendShapeMaster
      ? (await this._blendShapeImporter.import(gltf, vrmExt.blendShapeMaster)) || undefined
      : undefined;

    const lookAt =
      vrmExt.firstPerson && blendShapeProxy && humanoid
        ? await this._lookAtImporter.import(vrmExt.firstPerson, blendShapeProxy, humanoid)
        : undefined;

    const springBoneManager = (await this._springBoneImporter.import(gltf)) || undefined;

    return new VRM({
      scene: gltf.scene,
      meta: vrmExt.meta,
      materials,
      humanoid,
      firstPerson,
      blendShapeProxy,
      lookAt,
      springBoneManager,
    });
  }
}
