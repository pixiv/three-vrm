import * as THREE from 'three';
import { VRMBlendShapeImporter, VRMBlendShapeMaster } from './blendshape';
import { VRMFirstPersonImporter } from './firstperson';
import { VRMHumanBones } from './humanoid';
import { VRMLookAtHead } from './lookat';
import { VRMLookAtBlendShapeApplyer } from './lookat/VRMLookAtBlendShapeApplyer';
import { VRMLookAtBoneApplyer } from './lookat/VRMLookAtBoneApplyer';
import { VRMMaterialImporter } from './material';
import { reduceBones } from './reduceBones';
import { VRMSpringBoneImporter } from './springbone/VRMSpringBoneImporter';
import { RawVrmHumanoidBone } from './types';
import * as Raw from './types/VRM';
import { VRM } from './VRM';

export interface VRMImporterOptions {
  blendShapeImporter?: VRMBlendShapeImporter;
  firstPersonImporter?: VRMFirstPersonImporter;
  materialImporter?: VRMMaterialImporter;
  springBoneImporter?: VRMSpringBoneImporter;
}

export class VRMImporter {
  protected readonly _blendShapeImporter: VRMBlendShapeImporter;
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
    const vrmExt = gltf.parser.json.extensions.VRM;

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

    const humanBones = (await this.loadHumanoid(gltf)) || undefined;

    const firstPerson =
      vrmExt.firstPerson && humanBones
        ? (await this._firstPersonImporter.import(gltf, humanBones, vrmExt.firstPerson)) || undefined
        : undefined;

    const blendShapeMaster = vrmExt.blendShapeMaster
      ? (await this._blendShapeImporter.import(gltf, vrmExt.blendShapeMaster)) || undefined
      : undefined;

    const lookAt =
      blendShapeMaster && humanBones ? this.loadLookAt(vrmExt.firstPerson, blendShapeMaster, humanBones) : undefined;

    const springBoneManager = (await this._springBoneImporter.import(gltf)) || undefined;

    return new VRM({
      scene: gltf.scene,
      meta: vrmExt.meta,
      materials,
      humanBones,
      firstPerson,
      blendShapeMaster,
      lookAt,
      springBoneManager,
    });
  }

  /**
   * load humanoid
   * @param gltf
   * @returns
   */
  public async loadHumanoid(gltf: THREE.GLTF): Promise<VRMHumanBones | null> {
    const humanBones: RawVrmHumanoidBone[] | undefined =
      gltf.parser.json.extensions &&
      gltf.parser.json.extensions.VRM &&
      gltf.parser.json.extensions.VRM.humanoid &&
      gltf.parser.json.extensions.VRM.humanoid.humanBones;
    if (!humanBones) {
      console.warn('Could not find humanBones field on the VRM file');
      return null;
    }

    return await humanBones.reduce(async (vrmBonesPromise, bone) => {
      const vrmBones = await vrmBonesPromise;
      const nodeIndex = bone.node;
      const boneName = bone.bone;

      if (nodeIndex !== undefined && boneName !== undefined) {
        vrmBones[boneName] = await gltf.parser.getDependency('node', nodeIndex);
      }
      return vrmBones;
    }, Promise.resolve({} as VRMHumanBones));
  }

  public loadLookAt(
    firstPerson: Raw.RawVrmFirstPerson,
    blendShapeMaster: VRMBlendShapeMaster,
    humanBodyBones: VRMHumanBones,
  ): VRMLookAtHead {
    const lookAtHorizontalInner = firstPerson.lookAtHorizontalInner;
    const lookAtHorizontalOuter = firstPerson.lookAtHorizontalOuter;
    const lookAtVerticalDown = firstPerson.lookAtVerticalDown;
    const lookAtVerticalUp = firstPerson.lookAtVerticalUp;

    switch (firstPerson.lookAtTypeName) {
      case Raw.LookAtTypeName.Bone: {
        if (
          lookAtHorizontalInner === undefined ||
          lookAtHorizontalOuter === undefined ||
          lookAtVerticalDown === undefined ||
          lookAtVerticalUp === undefined
        ) {
          return new VRMLookAtHead(humanBodyBones);
        } else {
          return new VRMLookAtHead(
            humanBodyBones,
            new VRMLookAtBoneApplyer(
              humanBodyBones,
              lookAtHorizontalInner,
              lookAtHorizontalOuter,
              lookAtVerticalDown,
              lookAtVerticalUp,
            ),
          );
        }
      }
      case Raw.LookAtTypeName.BlendShape: {
        if (lookAtHorizontalOuter === undefined || lookAtVerticalDown === undefined || lookAtVerticalUp === undefined) {
          return new VRMLookAtHead(humanBodyBones);
        } else {
          return new VRMLookAtHead(
            humanBodyBones,
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
        return new VRMLookAtHead(humanBodyBones);
      }
    }
  }
}
