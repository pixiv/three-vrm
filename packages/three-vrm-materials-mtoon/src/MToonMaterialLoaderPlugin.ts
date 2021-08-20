import * as THREE from 'three';
import * as V1MToonSchema from '@pixiv/types-vrmc-materials-mtoon-1.0';
import type { GLTF, GLTFLoaderPlugin, GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader';
import { MToonMaterial } from './MToonMaterial';
import type { MToonMaterialParameters } from './MToonMaterialParameters';
import { MToonMaterialOutlineWidthMode } from './MToonMaterialOutlineWidthMode';
import { GLTFMToonMaterialParamsAssignHelper } from './GLTFMToonMaterialParamsAssignHelper';

export class MToonMaterialLoaderPlugin implements GLTFLoaderPlugin {
  public static EXTENSION_NAME = 'VRMC_materials_mtoon';

  /**
   * This value will be added to `renderOrder` of every meshes who have MaterialsMToon.
   * The final renderOrder will be sum of this `renderOrderOffset` and `renderQueueOffsetNumber` for each materials.
   * `0` by default.
   */
  public renderOrderOffset: number;

  public readonly parser: GLTFParser;

  /**
   * Loaded materials will be stored in this set.
   * Will be transferred into `gltf.userData.vrmMToonMaterials` in {@link afterRoot}.
   */
  private readonly _mToonMaterialSet: Set<MToonMaterial>;

  public get name(): string {
    return MToonMaterialLoaderPlugin.EXTENSION_NAME;
  }

  public constructor(
    parser: GLTFParser,
    options: {
      /**
       * This value will be added to every meshes who have MaterialsMToon.
       * The final renderOrder will be sum of this `renderOrderOffset` and `renderQueueOffsetNumber` for each materials.
       * `0` by default.
       */
      renderOrderOffset?: number;
    } = {},
  ) {
    this.parser = parser;

    this.renderOrderOffset = options.renderOrderOffset ?? 0;

    this._mToonMaterialSet = new Set();
  }

  public async beforeRoot(): Promise<void> {
    // want to do v0compat first if exist
    const v0compatPlugin = (this.parser as any).plugins?.['VRMMaterialsV0CompatPlugin'];
    if (v0compatPlugin != null) {
      await v0compatPlugin.beforeRoot();
    }

    this._removeUnlitExtensionIfMToonExists();
  }

  public async afterRoot(gltf: GLTF): Promise<void> {
    gltf.userData.vrmMToonMaterials = Array.from(this._mToonMaterialSet);
  }

  public getMaterialType(materialIndex: number): typeof THREE.Material | null {
    const v1Extension = this._getMToonExtension(materialIndex);
    if (v1Extension) {
      return MToonMaterial;
    }

    return null;
  }

  public extendMaterialParams(materialIndex: number, materialParams: MToonMaterialParameters): Promise<any> | null {
    const extension = this._getMToonExtension(materialIndex);
    if (extension) {
      return this._extendMaterialParams(extension, materialParams);
    }

    return null;
  }

  public async loadMesh(meshIndex: number): Promise<THREE.Group | THREE.Mesh | THREE.SkinnedMesh> {
    const parser = this.parser;
    const json = parser.json;

    const meshDef = json.meshes[meshIndex];
    const primitivesDef = meshDef.primitives;

    const meshOrGroup = await parser.loadMesh(meshIndex);

    if (primitivesDef.length === 1) {
      const mesh = meshOrGroup as THREE.Mesh;
      const materialIndex = primitivesDef[0].material;

      this._setupPrimitive(mesh, materialIndex);
    } else {
      const group = meshOrGroup as THREE.Group;
      for (let i = 0; i < primitivesDef.length; i++) {
        const mesh = group.children[i] as THREE.Mesh;
        const materialIndex = primitivesDef[i].material;

        this._setupPrimitive(mesh, materialIndex);
      }
    }

    return meshOrGroup;
  }

  /**
   * Delete use of `KHR_materials_unlit` from its `materials` if the material is using MToon.
   *
   * Since GLTFLoader have so many hardcoded procedure related to `KHR_materials_unlit`
   * we have to delete the extension before we start to parse the glTF.
   */
  private _removeUnlitExtensionIfMToonExists(): void {
    const parser = this.parser;
    const json = parser.json;

    const materialDefs: any[] = json.materials;
    materialDefs.map((materialDef, iMaterial) => {
      const extension = this._getMToonExtension(iMaterial);

      if (extension && materialDef.extensions?.['KHR_materials_unlit']) {
        delete materialDef.extensions['KHR_materials_unlit'];
      }
    });
  }

  private _getMToonExtension(materialIndex: number): V1MToonSchema.VRMCMaterialsMToon | undefined {
    const parser = this.parser;
    const json = parser.json;

    const materialDef = json.materials[materialIndex];

    const extension: V1MToonSchema.VRMCMaterialsMToon | undefined =
      materialDef.extensions?.[MToonMaterialLoaderPlugin.EXTENSION_NAME];
    if (extension == null) {
      return undefined;
    }

    const specVersion = extension.specVersion;
    if (specVersion !== '1.0-beta') {
      return undefined;
    }

    return extension;
  }

  private async _extendMaterialParams(
    extension: V1MToonSchema.VRMCMaterialsMToon,
    materialParams: MToonMaterialParameters,
  ): Promise<void> {
    // Removing material params that is not required to supress warnings.
    delete (materialParams as THREE.MeshStandardMaterialParameters).metalness;
    delete (materialParams as THREE.MeshStandardMaterialParameters).roughness;

    const assignHelper = new GLTFMToonMaterialParamsAssignHelper(this.parser, materialParams);

    assignHelper.assignPrimitive('transparentWithZWrite', extension.transparentWithZWrite);
    assignHelper.assignColor('shadeColorFactor', extension.shadeColorFactor);
    assignHelper.assignTexture('shadeMultiplyTexture', extension.shadeMultiplyTexture, true);
    assignHelper.assignPrimitive('shadingShiftFactor', extension.shadingShiftFactor);
    assignHelper.assignTexture('shadingShiftTexture', extension.shadingShiftTexture, true);
    assignHelper.assignPrimitive('shadingShiftTextureScale', extension.shadingShiftTexture?.scale);
    assignHelper.assignPrimitive('shadingToonyFactor', extension.shadingToonyFactor);
    assignHelper.assignPrimitive('giEqualizationFactor', extension.giEqualizationFactor);
    assignHelper.assignColor('matcapFactor', extension.matcapFactor);
    assignHelper.assignTexture('matcapTexture', extension.matcapTexture, true);
    assignHelper.assignColor('parametricRimColorFactor', extension.parametricRimColorFactor);
    assignHelper.assignTexture('rimMultiplyTexture', extension.rimMultiplyTexture, true);
    assignHelper.assignPrimitive('rimLightingMixFactor', extension.rimLightingMixFactor);
    assignHelper.assignPrimitive('parametricRimFresnelPowerFactor', extension.parametricRimFresnelPowerFactor);
    assignHelper.assignPrimitive('parametricRimLiftFactor', extension.parametricRimLiftFactor);
    assignHelper.assignPrimitive('outlineWidthMode', extension.outlineWidthMode as MToonMaterialOutlineWidthMode);
    assignHelper.assignPrimitive('outlineWidthFactor', extension.outlineWidthFactor);
    assignHelper.assignTexture('outlineWidthMultiplyTexture', extension.outlineWidthMultiplyTexture, false);
    assignHelper.assignColor('outlineColorFactor', extension.outlineColorFactor);
    assignHelper.assignPrimitive('outlineLightingMixFactor', extension.outlineLightingMixFactor);
    assignHelper.assignTexture('uvAnimationMaskTexture', extension.uvAnimationMaskTexture, false);
    assignHelper.assignPrimitive('uvAnimationScrollXSpeedFactor', extension.uvAnimationScrollXSpeedFactor);
    assignHelper.assignPrimitive('uvAnimationScrollYSpeedFactor', extension.uvAnimationScrollYSpeedFactor);
    assignHelper.assignPrimitive('uvAnimationRotationSpeedFactor', extension.uvAnimationRotationSpeedFactor);

    await assignHelper.pending;
  }

  /**
   * This will do two processes that is required to render MToon properly.
   *
   * - Set render order
   * - Generate outline
   *
   * @param mesh A target GLTF primitive
   * @param materialIndex The material index of the primitive
   */
  private _setupPrimitive(mesh: THREE.Mesh, materialIndex: number): void {
    const extension = this._getMToonExtension(materialIndex);
    if (extension) {
      const renderOrder = this._parseRenderOrder(extension);
      mesh.renderOrder = renderOrder + this.renderOrderOffset;

      this._generateOutline(mesh);

      this._addToMaterialSet(mesh);

      return;
    }
  }

  /**
   * Generate outline for the given mesh, if it needs.
   *
   * @param mesh The target mesh
   */
  private _generateOutline(mesh: THREE.Mesh): void {
    // OK, it's the hacky part.
    // We are going to duplicate the MToonMaterial for outline use.
    // Then we are going to create two geometry groups and refer same buffer but different material.
    // It's how we draw two materials at once using a single mesh.

    // make sure the material is mtoon
    const surfaceMaterial = mesh.material;
    if (!(surfaceMaterial instanceof MToonMaterial)) {
      return;
    }

    // check whether we really have to prepare outline or not
    if (surfaceMaterial.outlineWidthMode === 'none' || surfaceMaterial.outlineWidthFactor <= 0.0) {
      return;
    }

    // make its material an array
    mesh.material = [surfaceMaterial]; // mesh.material is guaranteed to be a Material in GLTFLoader

    // duplicate the material for outline use
    const outlineMaterial = surfaceMaterial.clone() as MToonMaterial;
    outlineMaterial.name += ' (Outline)';
    outlineMaterial.isOutline = true;
    outlineMaterial.side = THREE.BackSide;
    mesh.material.push(outlineMaterial);

    // make two geometry groups out of a same buffer
    const geometry = mesh.geometry; // mesh.geometry is guaranteed to be a BufferGeometry in GLTFLoader
    const primitiveVertices = geometry.index ? geometry.index.count : geometry.attributes.position.count / 3;
    geometry.addGroup(0, primitiveVertices, 0);
    geometry.addGroup(0, primitiveVertices, 1);
  }

  private _addToMaterialSet(mesh: THREE.Mesh): void {
    const materialOrMaterials = mesh.material;
    const materialSet = new Set<THREE.Material>();

    if (Array.isArray(materialOrMaterials)) {
      materialOrMaterials.forEach((material) => materialSet.add(material));
    } else {
      materialSet.add(materialOrMaterials);
    }

    for (const material of materialSet) {
      if (material instanceof MToonMaterial) {
        this._mToonMaterialSet.add(material);
      }
    }
  }

  private _parseRenderOrder(extension: V1MToonSchema.VRMCMaterialsMToon): number {
    // transparentWithZWrite ranges from 0 to +9
    // mere transparent ranges from -9 to 0
    const enabledZWrite = extension.transparentWithZWrite;
    return (enabledZWrite ? 0 : 19) + (extension.renderQueueOffsetNumber ?? 0);
  }
}