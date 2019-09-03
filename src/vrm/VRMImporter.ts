import * as THREE from 'three';
import { BlendShapeController, BlendShapeMaster, VRMBlendShapeProxy } from './blendshape';
import { RendererFirstPersonFlags, VRMFirstPerson } from './firstperson';
import { VRMHumanoid } from './humanoid';
import { VRMHumanoidImporter } from './humanoid/VRMHumanoidImporter';
import { VRMLookAtHead } from './lookat';
import { VRMLookAtBlendShapeApplyer } from './lookat/VRMLookAtBlendShapeApplyer';
import { VRMLookAtBoneApplyer } from './lookat/VRMLookAtBoneApplyer';
import { VRMMaterialImporter } from './material';
import { reduceBones } from './reduceBones';
import { VRMSpringBoneImporter } from './springbone/VRMSpringBoneImporter';
import { GLTFMesh, GLTFNode, GLTFPrimitive } from './types';
import * as Raw from './types/VRM';
import { VRM } from './VRM';

export interface VRMImporterOptions {
  humanoidImporter?: VRMHumanoidImporter;
  materialImporter?: VRMMaterialImporter;
  springBoneImporter?: VRMSpringBoneImporter;
}

export class VRMImporter {
  protected readonly _humanoidImporter: VRMHumanoidImporter;
  protected readonly _materialImporter: VRMMaterialImporter;
  protected readonly _springBoneImporter: VRMSpringBoneImporter;

  /**
   * Create a new VRMImporter.
   *
   * @param options [[VRMImporterOptions]], optionally contains importers for each component
   */
  public constructor(options: VRMImporterOptions = {}) {
    this._humanoidImporter = options.humanoidImporter || new VRMHumanoidImporter();
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
    const vrmExt: Raw.RawVrm = gltf.parser.json.extensions.VRM;

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
        ? (await this.loadFirstPerson(vrmExt.firstPerson, humanoid, gltf)) || undefined
        : undefined;

    const animationMixer = new THREE.AnimationMixer(gltf.scene);

    const blendShapeProxy = (await this.loadBlendShapeMaster(animationMixer!, gltf)) || undefined;

    const lookAt =
      vrmExt.firstPerson && blendShapeProxy && humanoid
        ? this.loadLookAt(vrmExt.firstPerson, blendShapeProxy, humanoid)
        : undefined;

    const springBoneManager = (await this._springBoneImporter.import(gltf)) || undefined;

    return new VRM({
      scene: gltf.scene,
      meta: vrmExt.meta,
      materials,
      humanoid,
      firstPerson,
      animationMixer,
      blendShapeProxy,
      lookAt,
      springBoneManager,
    });
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
    humanoid: VRMHumanoid,
    gltf: THREE.GLTF,
  ): Promise<VRMFirstPerson | null> {
    const isFirstPersonBoneNotSet = firstPerson.firstPersonBone === undefined || firstPerson.firstPersonBone === -1;

    let firstPersonBone: GLTFNode;
    if (isFirstPersonBoneNotSet) {
      const headNode = humanoid.getBoneNode(Raw.HumanBone.Head);
      if (!headNode) {
        return null;
      }
      firstPersonBone = headNode; // fallback
    } else {
      firstPersonBone = await gltf.parser.getDependency('node', firstPerson.firstPersonBone!);
    }

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
    blendShapeProxy: VRMBlendShapeProxy,
    humanoid: VRMHumanoid,
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
      case Raw.LookAtTypeName.BlendShape: {
        if (lookAtHorizontalOuter === undefined || lookAtVerticalDown === undefined || lookAtVerticalUp === undefined) {
          return new VRMLookAtHead(humanoid);
        } else {
          return new VRMLookAtHead(
            humanoid,
            new VRMLookAtBlendShapeApplyer(
              blendShapeProxy,
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

  /**
   *
   * @param {AnimationMixer} animationMixer
   * @param {GLTF} gltf
   * @returns {VRMBlendShapeProxy}
   */
  public async loadBlendShapeMaster(
    animationMixer: THREE.AnimationMixer,
    gltf: THREE.GLTF,
  ): Promise<VRMBlendShapeProxy | null> {
    const blendShapeGroups: Raw.RawVrmBlendShapeGroup[] | undefined =
      gltf.parser.json.extensions &&
      gltf.parser.json.extensions.VRM &&
      gltf.parser.json.extensions.VRM.blendShapeMaster &&
      gltf.parser.json.extensions.VRM.blendShapeMaster.blendShapeGroups;
    if (!blendShapeGroups) {
      return null;
    }

    const blendShapeMaster = new BlendShapeMaster();
    const blendShapePresetMap: { [presetName in Raw.BlendShapePresetName]?: string } = {};

    blendShapeGroups.forEach(async (group) => {
      const name = group.name;
      if (name === undefined) {
        console.warn('createBlendShapeMasterFromVRM: One of blendShapeGroups has no name');
        return;
      }

      if (
        group.presetName &&
        group.presetName !== Raw.BlendShapePresetName.Unknown &&
        !blendShapePresetMap[group.presetName]
      ) {
        blendShapePresetMap[group.presetName] = group.name;
      }

      const controller = new BlendShapeController(name);
      gltf.scene.add(controller);

      controller.isBinary = group.isBinary || false;

      if (Array.isArray(group.binds)) {
        group.binds.forEach(async (bind) => {
          if (bind.mesh === undefined || bind.index === undefined) {
            return;
          }

          const morphMeshes: GLTFMesh = await gltf.parser.getDependency('mesh', bind.mesh);
          const primitives: GLTFPrimitive[] =
            morphMeshes.type === 'Group'
              ? (morphMeshes.children as Array<GLTFPrimitive>)
              : [morphMeshes as GLTFPrimitive];
          const morphTargetIndex = bind.index;
          if (
            !primitives.every(
              (primitive) =>
                Array.isArray(primitive.morphTargetInfluences) &&
                morphTargetIndex < primitive.morphTargetInfluences.length,
            )
          ) {
            console.warn(
              `createBlendShapeMasterFromVRM: ${
                group.name
              } attempts to index ${morphTargetIndex}th morph but not found.`,
            );
            return;
          }

          controller.addBind({
            meshes: primitives,
            morphTargetIndex,
            weight: bind.weight || 100,
          });
        });
      }

      const materialValues = group.materialValues;
      if (Array.isArray(materialValues)) {
        materialValues.forEach((materialValue) => {
          if (
            materialValue.materialName === undefined ||
            materialValue.propertyName === undefined ||
            materialValue.targetValue === undefined
          ) {
            return;
          }

          const materials: THREE.Material[] = [];
          gltf.scene.traverse((object) => {
            if ((object as any).material) {
              const material: THREE.Material[] | THREE.Material = (object as any).material;
              if (Array.isArray(material)) {
                materials.push(
                  ...material.filter(
                    (mtl) => mtl.name === materialValue.materialName! && materials.indexOf(mtl) === -1,
                  ),
                );
              } else if (material.name === materialValue.materialName && materials.indexOf(material) === -1) {
                materials.push(material);
              }
            }
          });

          materials.forEach((material) => {
            controller.addMaterialValue({
              material,
              propertyName: this.renameMaterialProperty(materialValue.propertyName!),
              targetValue: materialValue.targetValue!,
            });
          });
        });
      }

      blendShapeMaster.registerBlendShapeGroup(name, controller);
    });

    return VRMBlendShapeProxy.create(animationMixer, blendShapeMaster, blendShapePresetMap);
  }

  private renameMaterialProperty(name: string): string {
    if (name[0] !== '_') {
      console.warn(`VRMMaterials: Given property name "${name}" might be invalid`);
      return name;
    }
    name = name.substring(1);

    if (!/[A-Z]/.test(name[0])) {
      console.warn(`VRMMaterials: Given property name "${name}" might be invalid`);
      return name;
    }
    return name[0].toLowerCase() + name.substring(1);
  }
}
