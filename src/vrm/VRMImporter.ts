import * as THREE from 'three';
import { BlendShapeController, BlendShapeMaster, VRMBlendShapeProxy } from './blendshape';
import { RendererFirstPersonFlags, VRMFirstPerson } from './firstperson';
import { VRMHumanBones } from './humanoid';
import { VRMLookAtImporter } from './lookat/VRMLookAtImporter';
import { VRMMaterialImporter } from './material';
import { reduceBones } from './reduceBones';
import { VRMSpringBoneImporter } from './springbone/VRMSpringBoneImporter';
import { GLTFMesh, GLTFNode, GLTFPrimitive, RawVrmHumanoidBone } from './types';
import * as Raw from './types/VRM';
import { VRM } from './VRM';

export interface VRMImporterOptions {
  lookAtImporter?: VRMLookAtImporter;
  materialImporter?: VRMMaterialImporter;
  springBoneImporter?: VRMSpringBoneImporter;
}

export class VRMImporter {
  protected readonly _lookAtImporter: VRMLookAtImporter;
  protected readonly _materialImporter: VRMMaterialImporter;
  protected readonly _springBoneImporter: VRMSpringBoneImporter;

  /**
   * Create a new VRMImporter.
   */
  public constructor(options: VRMImporterOptions = {}) {
    this._lookAtImporter = options.lookAtImporter || new VRMLookAtImporter();
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

    const animationMixer = new THREE.AnimationMixer(gltf.scene);

    const blendShapeProxy = (await this.loadBlendShapeMaster(animationMixer!, gltf)) || undefined;

    const lookAt =
      firstPerson && blendShapeProxy && humanBones
        ? await this._lookAtImporter.import(vrmExt.firstPerson, firstPerson, blendShapeProxy, humanBones)
        : undefined;

    const springBoneManager = (await this._springBoneImporter.import(gltf)) || undefined;

    return new VRM({
      scene: gltf.scene,
      meta: vrmExt.meta,
      materials,
      humanBones,
      firstPerson,
      animationMixer,
      blendShapeProxy,
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
