import * as THREE from 'three';
import * as V1MToonSchema from '@pixiv/types-vrmc-materials-mtoon-1.0';
import type { GLTF, GLTFLoader, GLTFLoaderPlugin, GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { MToonMaterialParameters } from './MToonMaterialParameters';
import type { MToonMaterialOutlineWidthMode } from './MToonMaterialOutlineWidthMode';
import { GLTFMToonMaterialParamsAssignHelper } from './GLTFMToonMaterialParamsAssignHelper';
import type { MToonMaterialLoaderPluginOptions } from './MToonMaterialLoaderPluginOptions';
import type { MToonMaterialDebugMode } from './MToonMaterialDebugMode';
import { GLTF as GLTFSchema } from '@gltf-transform/core';
import { MToonMaterial } from './MToonMaterial';
import type { MToonNodeMaterial } from './nodes/MToonNodeMaterial';

/**
 * Possible spec versions it recognizes.
 */
const POSSIBLE_SPEC_VERSIONS = new Set(['1.0', '1.0-beta']);

/**
 * A loader plugin of {@link GLTFLoader} for the extension `VRMC_materials_mtoon`.
 *
 * This plugin is for uses with WebGLRenderer by default.
 * To use MToon in WebGPURenderer, set {@link materialType} to {@link MToonNodeMaterial}.
 *
 * @example to use with WebGPURenderer
 * ```js
 * import { MToonMaterialLoaderPlugin } from '@pixiv/three-vrm-materials-mtoon';
 * import { MToonNodeMaterial } from '@pixiv/three-vrm-materials-mtoon/nodes';
 *
 * // ...
 *
 * // Register a MToonMaterialLoaderPlugin with MToonNodeMaterial
 * loader.register((parser) => {
 *
 *   // create a WebGPU compatible MToonMaterialLoaderPlugin
 *   return new MToonMaterialLoaderPlugin(parser, {
 *
 *     // set the material type to MToonNodeMaterial
 *     materialType: MToonNodeMaterial,
 *
 *   });
 *
 * });
 * ```
 */
export class MToonMaterialLoaderPlugin implements GLTFLoaderPlugin {
  public static EXTENSION_NAME = 'VRMC_materials_mtoon';

  /**
   * The type of the material that this plugin will generate.
   *
   * If you are using this plugin with WebGPU, set this to {@link MToonNodeMaterial}.
   *
   * @default MToonMaterial
   */
  public materialType: typeof THREE.Material;

  /**
   * This value will be added to `renderOrder` of every meshes who have MaterialsMToon.
   * The final renderOrder will be sum of this `renderOrderOffset` and `renderQueueOffsetNumber` for each materials.
   *
   * @default 0
   */
  public renderOrderOffset: number;

  /**
   * There is a line of the shader called "comment out if you want to PBR absolutely" in VRM0.0 MToon.
   * When this is true, the material enables the line to make it compatible with the legacy rendering of VRM.
   * Usually not recommended to turn this on.
   *
   * @default false
   */
  public v0CompatShade: boolean;

  /**
   * Debug mode for the material.
   * You can visualize several components for diagnosis using debug mode.
   *
   * See: {@link MToonMaterialDebugMode}
   *
   * @default 'none'
   */
  public debugMode: MToonMaterialDebugMode;

  public readonly parser: GLTFParser;

  /**
   * Loaded materials will be stored in this set.
   * Will be transferred into `gltf.userData.vrmMToonMaterials` in {@link afterRoot}.
   */
  private readonly _mToonMaterialSet: Set<THREE.Material>;

  public get name(): string {
    return MToonMaterialLoaderPlugin.EXTENSION_NAME;
  }

  public constructor(parser: GLTFParser, options: MToonMaterialLoaderPluginOptions = {}) {
    this.parser = parser;

    this.materialType = options.materialType ?? MToonMaterial;
    this.renderOrderOffset = options.renderOrderOffset ?? 0;
    this.v0CompatShade = options.v0CompatShade ?? false;
    this.debugMode = options.debugMode ?? 'none';

    this._mToonMaterialSet = new Set();
  }

  public async beforeRoot(): Promise<void> {
    this._removeUnlitExtensionIfMToonExists();
  }

  public async afterRoot(gltf: GLTF): Promise<void> {
    gltf.userData.vrmMToonMaterials = Array.from(this._mToonMaterialSet);
  }

  public getMaterialType(materialIndex: number): typeof THREE.Material | null {
    const v1Extension = this._getMToonExtension(materialIndex);
    if (v1Extension) {
      return this.materialType;
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
    const json = parser.json as GLTFSchema.IGLTF;

    const meshDef = json.meshes?.[meshIndex];

    if (meshDef == null) {
      throw new Error(
        `MToonMaterialLoaderPlugin: Attempt to use meshes[${meshIndex}] of glTF but the mesh doesn't exist`,
      );
    }

    const primitivesDef = meshDef.primitives;

    const meshOrGroup = await parser.loadMesh(meshIndex);

    if (primitivesDef.length === 1) {
      const mesh = meshOrGroup as THREE.Mesh;
      const materialIndex = primitivesDef[0].material;

      if (materialIndex != null) {
        this._setupPrimitive(mesh, materialIndex);
      }
    } else {
      const group = meshOrGroup as THREE.Group;
      for (let i = 0; i < primitivesDef.length; i++) {
        const mesh = group.children[i] as THREE.Mesh;
        const materialIndex = primitivesDef[i].material;

        if (materialIndex != null) {
          this._setupPrimitive(mesh, materialIndex);
        }
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
    const json = parser.json as GLTFSchema.IGLTF;

    const materialDefs = json.materials;
    materialDefs?.map((materialDef, iMaterial) => {
      const extension = this._getMToonExtension(iMaterial);

      if (extension && materialDef.extensions?.['KHR_materials_unlit']) {
        delete materialDef.extensions['KHR_materials_unlit'];
      }
    });
  }

  protected _getMToonExtension(materialIndex: number): V1MToonSchema.VRMCMaterialsMToon | undefined {
    const parser = this.parser;
    const json = parser.json as GLTFSchema.IGLTF;

    const materialDef = json.materials?.[materialIndex];

    if (materialDef == null) {
      console.warn(
        `MToonMaterialLoaderPlugin: Attempt to use materials[${materialIndex}] of glTF but the material doesn't exist`,
      );
      return undefined;
    }

    const extension = materialDef.extensions?.[MToonMaterialLoaderPlugin.EXTENSION_NAME] as
      | V1MToonSchema.VRMCMaterialsMToon
      | undefined;
    if (extension == null) {
      return undefined;
    }

    const specVersion = extension.specVersion;
    if (!POSSIBLE_SPEC_VERSIONS.has(specVersion)) {
      console.warn(
        `MToonMaterialLoaderPlugin: Unknown ${MToonMaterialLoaderPlugin.EXTENSION_NAME} specVersion "${specVersion}"`,
      );
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

    assignHelper.assignPrimitive('v0CompatShade', this.v0CompatShade);
    assignHelper.assignPrimitive('debugMode', this.debugMode);

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
   * Check whether the material should generate outline or not.
   * @param surfaceMaterial The material to check
   * @returns True if the material should generate outline
   */
  private _shouldGenerateOutline(surfaceMaterial: THREE.Material): boolean {
    // we might receive MToonNodeMaterial as well as MToonMaterial
    // so we're gonna duck type to check if it's compatible with MToon type outlines
    return (
      typeof (surfaceMaterial as any).outlineWidthMode === 'string' &&
      (surfaceMaterial as any).outlineWidthMode !== 'none' &&
      typeof (surfaceMaterial as any).outlineWidthFactor === 'number' &&
      (surfaceMaterial as any).outlineWidthFactor > 0.0
    );
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

    // make sure the material is single
    const surfaceMaterial = mesh.material;
    if (!(surfaceMaterial instanceof THREE.Material)) {
      return;
    }

    if (!this._shouldGenerateOutline(surfaceMaterial)) {
      return;
    }

    // make its material an array
    mesh.material = [surfaceMaterial]; // mesh.material is guaranteed to be a Material in GLTFLoader

    // duplicate the material for outline use
    const outlineMaterial = surfaceMaterial.clone();
    outlineMaterial.name += ' (Outline)';
    (outlineMaterial as any).isOutline = true;
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
      this._mToonMaterialSet.add(material);
    }
  }

  private _parseRenderOrder(extension: V1MToonSchema.VRMCMaterialsMToon): number {
    // transparentWithZWrite ranges from 0 to +9
    // mere transparent ranges from -9 to 0
    const enabledZWrite = extension.transparentWithZWrite;
    return (enabledZWrite ? 0 : 19) + (extension.renderQueueOffsetNumber ?? 0);
  }
}
