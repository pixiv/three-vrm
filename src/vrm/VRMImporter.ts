import * as THREE from 'three';
import { VRMBlendShapeMaster } from './blendshape';
import { VRMBlendShapeImporter } from './blendshape/VRMBlendShapeImporter';
import { RendererFirstPersonFlags, VRMFirstPerson } from './firstperson';
import { VRMHumanBones } from './humanoid';
import { VRMLookAtHead } from './lookat';
import { VRMLookAtBlendShapeApplyer } from './lookat/VRMLookAtBlendShapeApplyer';
import { VRMLookAtBoneApplyer } from './lookat/VRMLookAtBoneApplyer';
import { VRMMaterialImporter } from './material';
import { reduceBones } from './reduceBones';
import { VRMSpringBoneImporter } from './springbone/VRMSpringBoneImporter';
import { GLTFMesh, GLTFNode, RawVrmHumanoidBone } from './types';
import * as Raw from './types/VRM';
import { VRM } from './VRM';

export interface VRMImporterOptions {
  blendShapeImporter?: VRMBlendShapeImporter;
  materialImporter?: VRMMaterialImporter;
  springBoneImporter?: VRMSpringBoneImporter;
}

export class VRMImporter {
  protected readonly _blendShapeImporter: VRMBlendShapeImporter;
  protected readonly _materialImporter: VRMMaterialImporter;
  protected readonly _springBoneImporter: VRMSpringBoneImporter;

  /**
   * Create a new VRMImporter.
   */
  public constructor(options: VRMImporterOptions = {}) {
    this._blendShapeImporter = options.blendShapeImporter || new VRMBlendShapeImporter();
    this._materialImporter = options.materialImporter || new VRMMaterialImporter();
    this._springBoneImporter = options.springBoneImporter || new VRMSpringBoneImporter();
  }

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

    const firstPerson = humanBones
      ? (await this.loadFirstPerson(vrmExt.firstPerson, humanBones, gltf)) || undefined
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

  /**
   * load first person
   * @param firstPerson
   * @param humanBones
   * @param gltf
   * @returns
   */
  public async loadFirstPerson(
    firstPerson: Raw.RawVrmFirstPerson,
    humanBones: VRMHumanBones,
    gltf: THREE.GLTF,
  ): Promise<VRMFirstPerson | null> {
    const isFirstPersonBoneNotSet = firstPerson.firstPersonBone === undefined || firstPerson.firstPersonBone === -1;
    const firstPersonBone: GLTFNode = isFirstPersonBoneNotSet
      ? humanBones[Raw.HumanBone.Head] // fallback
      : await gltf.parser.getDependency('node', firstPerson.firstPersonBone!);

    if (!firstPersonBone) {
      console.warn('Could not find firstPersonBone of the VRM');
      return null;
    }

    const firstPersonBoneOffset =
      !isFirstPersonBoneNotSet && firstPerson.firstPersonBoneOffset
        ? new THREE.Vector3(
            firstPerson.firstPersonBoneOffset!.x,
            firstPerson.firstPersonBoneOffset!.y,
            firstPerson.firstPersonBoneOffset!.z,
          )
        : new THREE.Vector3(0, 0.06, 0); // fallback

    const meshAnnotations: RendererFirstPersonFlags[] = [];
    const meshes: GLTFMesh[] = await gltf.parser.getDependencies('mesh');
    meshes.forEach((mesh, meshIndex) => {
      const flag = firstPerson.meshAnnotations
        ? firstPerson.meshAnnotations.find((annotation) => annotation.mesh === meshIndex)
        : undefined;
      meshAnnotations.push(new RendererFirstPersonFlags(flag && flag.firstPersonFlag, mesh));
    });

    return new VRMFirstPerson(firstPersonBone, firstPersonBoneOffset, meshAnnotations);
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
