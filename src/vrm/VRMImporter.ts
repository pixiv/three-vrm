import * as THREE from 'three';
import { VRMBlendShapeImporter, VRMBlendShapeMaster } from './blendshape';
import { VRMFirstPersonImporter } from './firstperson';
import { VRMHumanoid } from './humanoid';
import { VRMHumanoidImporter } from './humanoid/VRMHumanoidImporter';
import { VRMLookAtHead } from './lookat';
import { VRMLookAtBlendShapeApplyer } from './lookat/VRMLookAtBlendShapeApplyer';
import { VRMLookAtBoneApplyer } from './lookat/VRMLookAtBoneApplyer';
import { VRMMaterialImporter } from './material';
import { reduceBones } from './reduceBones';
import { VRMSpringBoneImporter } from './springbone/VRMSpringBoneImporter';
import { VRMSchema } from './types';
import { VRM } from './VRM';

export interface VRMImporterOptions {
  humanoidImporter?: VRMHumanoidImporter;
  blendShapeImporter?: VRMBlendShapeImporter;
  firstPersonImporter?: VRMFirstPersonImporter;
  materialImporter?: VRMMaterialImporter;
  springBoneImporter?: VRMSpringBoneImporter;
}

export class VRMImporter {
  protected readonly _blendShapeImporter: VRMBlendShapeImporter;
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

    const blendShapeMaster = vrmExt.blendShapeMaster
      ? (await this._blendShapeImporter.import(gltf, vrmExt.blendShapeMaster)) || undefined
      : undefined;

    const lookAt =
      vrmExt.firstPerson && blendShapeMaster && humanoid
        ? this.loadLookAt(vrmExt.firstPerson, blendShapeMaster, humanoid)
        : undefined;

    const springBoneManager = (await this._springBoneImporter.import(gltf)) || undefined;

    return new VRM({
      scene: gltf.scene,
      meta: vrmExt.meta,
      materials,
      humanoid,
      firstPerson,
      blendShapeMaster,
      lookAt,
      springBoneManager,
    });
  }

  public loadLookAt(
    firstPerson: VRMSchema.FirstPerson,
    blendShapeMaster: VRMBlendShapeMaster,
    humanoid: VRMHumanoid,
  ): VRMLookAtHead {
    const lookAtHorizontalInner = firstPerson.lookAtHorizontalInner;
    const lookAtHorizontalOuter = firstPerson.lookAtHorizontalOuter;
    const lookAtVerticalDown = firstPerson.lookAtVerticalDown;
    const lookAtVerticalUp = firstPerson.lookAtVerticalUp;

    switch (firstPerson.lookAtTypeName) {
      case VRMSchema.FirstPersonLookAtTypeName.Bone: {
        if (
          lookAtHorizontalInner === undefined ||
          lookAtHorizontalOuter === undefined ||
          lookAtVerticalDown === undefined ||
          lookAtVerticalUp === undefined
        ) {
          return new VRMLookAtHead(humanoid);
        } else {
          return new VRMLookAtHead(
            humanoid,
            new VRMLookAtBoneApplyer(
              humanoid,
              lookAtHorizontalInner,
              lookAtHorizontalOuter,
              lookAtVerticalDown,
              lookAtVerticalUp,
            ),
          );
        }
      }
      case VRMSchema.FirstPersonLookAtTypeName.BlendShape: {
        if (lookAtHorizontalOuter === undefined || lookAtVerticalDown === undefined || lookAtVerticalUp === undefined) {
          return new VRMLookAtHead(humanoid);
        } else {
          return new VRMLookAtHead(
            humanoid,
            new VRMLookAtBlendShapeApplyer(
              blendShapeMaster,
              lookAtHorizontalOuter,
              lookAtVerticalDown,
              lookAtVerticalUp,
            ),
          );
        }
      }
      default: {
        return new VRMLookAtHead(humanoid);
      }
    }
  }
}
