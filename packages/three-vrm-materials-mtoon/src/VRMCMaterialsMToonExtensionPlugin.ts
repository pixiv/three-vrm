import * as THREE from 'three';
import * as MToonSchema from '@pixiv/types-vrmc-materials-mtoon-1.0';
import type { GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader';
import { MToonMaterial } from './MToonMaterial';
import type { MToonMaterialParameters } from './MToonMaterialParameters';
import { MToonMaterialOutlineWidthMode } from './MToonMaterialOutlineWidthMode';
import { MToonMaterialOutlineColorMode } from './MToonMaterialOutlineColorMode';

export class VRMCMaterialsMToonExtensionPlugin {
  public static EXTENSION_NAME = 'VRMC_materials_mtoon-1.0';

  /**
   * This value will be added to every meshes who have MaterialsMToon.
   * The final renderOrder will be sum of this `renderOrderOffset` and `renderQueueOffsetNumber` for each materials.
   * `0` by default.
   */
  public renderOrderOffset: number;

  /**
   * All imported materials will call this in their constructor.
   * You will need to use this in order to call update for each materials.
   * Update call is required to do uv animations.
   */
  public onLoadMaterial?: (material: MToonMaterial) => void;

  protected _parser: GLTFParser;

  public get name(): string {
    return VRMCMaterialsMToonExtensionPlugin.EXTENSION_NAME;
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

      /**
       * All imported materials will call this their constructor.
       * You will need to use this in order to call update for each materials.
       * Update call is required to do uv animations.
       */
      onLoadMaterial?: (material: MToonMaterial) => void;
    } = {},
  ) {
    this._parser = parser;

    this.renderOrderOffset = options.renderOrderOffset ?? 0;
    this.onLoadMaterial = options.onLoadMaterial;
  }

  public getMaterialType(materialIndex: number): typeof THREE.Material | null {
    const parser = this._parser;
    const json = parser.json;

    const materialDef = json.materials[materialIndex];
    const extension: MToonSchema.MaterialsMToon | undefined = materialDef.extensions?.[this.name];

    if (!extension) {
      return null;
    }

    return MToonMaterial;
  }

  public async extendMaterialParams(
    materialIndex: number,
    materialParams: MToonMaterialParameters,
  ): Promise<MToonMaterialParameters> {
    const parser = this._parser;
    const json = parser.json;

    const materialDef = json.materials[materialIndex];
    const extension: MToonSchema.MaterialsMToon | undefined = materialDef.extensions?.[this.name];

    if (!extension) {
      return materialParams;
    }

    materialParams.onLoadMaterial = this.onLoadMaterial;

    const pending: Promise<any>[] = [];

    materialParams.transparentWithZWrite = extension.transparentWithZWrite;

    materialParams.shadeFactor = extension.shadeFactor && new THREE.Color().fromArray(extension.shadeFactor);
    if (extension.shadeMultiplyTexture != null) {
      pending.push(
        (parser as any).assignTexture(materialParams, 'shadeMultiplyTexture', {
          index: extension.shadeMultiplyTexture,
        }),
      );
    }

    materialParams.shadingShiftFactor = extension.shadingShiftFactor;
    materialParams.shadingToonyFactor = extension.shadingToonyFactor;
    materialParams.lightColorAttenuationFactor = extension.lightColorAttenuationFactor;
    materialParams.giIntensityFactor = extension.giIntensityFactor;

    if (extension.additiveTexture != null) {
      pending.push(
        (parser as any).assignTexture(materialParams, 'additiveTexture', { index: extension.additiveTexture }),
      );
    }

    materialParams.rimFactor = extension.rimFactor && new THREE.Color().fromArray(extension.rimFactor);
    if (extension.rimMultiplyTexture != null) {
      pending.push(
        (parser as any).assignTexture(materialParams, 'rimMultiplyTexture', { index: extension.rimMultiplyTexture }),
      );
    }
    materialParams.rimLightingMixFactor = extension.rimLightingMixFactor;
    materialParams.rimFresnelPowerFactor = extension.rimFresnelPowerFactor;
    materialParams.rimLiftFactor = extension.rimLiftFactor;

    materialParams.outlineWidthMode = extension.outlineWidthMode as MToonMaterialOutlineWidthMode;
    materialParams.outlineWidthFactor = extension.outlineWidthFactor;
    if (extension.outlineWidthMultiplyTexture != null) {
      pending.push(
        (parser as any).assignTexture(materialParams, 'outlineWidthMultiplyTexture', {
          index: extension.outlineWidthMultiplyTexture,
        }),
      );
    }
    materialParams.outlineScaledMaxDistanceFactor = extension.outlineScaledMaxDistanceFactor;
    materialParams.outlineColorMode = extension.outlineColorMode as MToonMaterialOutlineColorMode;
    materialParams.outlineFactor = extension.outlineFactor && new THREE.Color().fromArray(extension.outlineFactor);
    materialParams.outlineLightingMixFactor = extension.outlineLightingMixFactor;

    if (extension.uvAnimationMaskTexture != null) {
      pending.push(
        (parser as any).assignTexture(materialParams, 'uvAnimationMaskTexture', {
          index: extension.uvAnimationMaskTexture,
        }),
      );
    }
    materialParams.uvAnimationScrollXSpeedFactor = extension.uvAnimationScrollXSpeedFactor;
    materialParams.uvAnimationScrollYSpeedFactor = extension.uvAnimationScrollYSpeedFactor;
    materialParams.uvAnimationRotationSpeedFactor = extension.uvAnimationRotationSpeedFactor;

    await Promise.all(pending);

    if (materialParams.shadeMultiplyTexture) {
      materialParams.shadeMultiplyTexture.encoding = THREE.sRGBEncoding;
    }

    if (materialParams.additiveTexture) {
      materialParams.additiveTexture.encoding = THREE.sRGBEncoding;
    }

    if (materialParams.rimMultiplyTexture) {
      materialParams.rimMultiplyTexture.encoding = THREE.sRGBEncoding;
    }

    return materialParams;
  }

  public async loadMesh(meshIndex: number): Promise<THREE.Group | THREE.Mesh | THREE.SkinnedMesh> {
    const parser = this._parser;
    const json = parser.json;

    const meshDef = json.meshes[meshIndex];
    const primitivesDef = meshDef.primitives;

    const meshOrGroup: THREE.Group | THREE.Mesh | THREE.SkinnedMesh = await (parser as any).loadMesh(meshIndex);

    if (primitivesDef.length === 1) {
      const mesh = meshOrGroup as THREE.Mesh;
      const materialIndex = primitivesDef[0].material;

      this._setRenderOrder(mesh, materialIndex);
      this._generateOutline(mesh, materialIndex);
    } else {
      const group = meshOrGroup as THREE.Group;
      for (let i = 0; i < primitivesDef.length; i++) {
        const mesh = group.children[i] as THREE.Mesh;
        const materialIndex = primitivesDef[i].material;

        this._setRenderOrder(mesh, materialIndex);
        this._generateOutline(mesh, materialIndex);
      }
    }

    return meshOrGroup;
  }

  private _setRenderOrder(mesh: THREE.Mesh, materialIndex: number): void {
    const parser = this._parser;
    const json = parser.json;

    const materialDef = json.materials[materialIndex];
    const extension: MToonSchema.MaterialsMToon | undefined = materialDef.extensions?.[this.name];

    if (!extension) {
      return;
    }

    mesh.renderOrder = this.renderOrderOffset + (extension.renderQueueOffsetNumber ?? 0);
  }

  private _generateOutline(mesh: THREE.Mesh, materialIndex: number): void {
    const parser = this._parser;
    const json = parser.json;

    const materialDef = json.materials[materialIndex];
    const extension: MToonSchema.MaterialsMToon | undefined = materialDef.extensions?.[this.name];

    if (!extension) {
      return;
    }

    // Check whether we really have to prepare outline or not
    if ((extension.outlineWidthMode ?? 'none') === 'none' || (extension.outlineWidthFactor ?? 0.0) === 0.0) {
      return;
    }

    // OK, it's the hacky part.
    // We are going to duplicate the MToonMaterial for outline use.
    // Then we are going to create two geometry groups and refer same buffer but different material.
    // It's how we draw two materials at once using a single mesh.

    // make its material an array
    const surfaceMaterial = mesh.material as MToonMaterial;
    mesh.material = [surfaceMaterial]; // mesh.material is guaranteed to be a Material in GLTFLoader

    // duplicate the material for outline use
    const outlineMaterial = surfaceMaterial.clone();
    outlineMaterial.name += ' (Outline)';
    outlineMaterial.isOutline = true;
    outlineMaterial.side = THREE.BackSide;
    mesh.material.push(outlineMaterial);

    // make two geometry groups out of a same buffer
    const geometry = mesh.geometry as THREE.BufferGeometry; // mesh.geometry is guaranteed to be a BufferGeometry in GLTFLoader
    const primitiveVertices = geometry.index ? geometry.index.count : geometry.attributes.position.count / 3;
    geometry.addGroup(0, primitiveVertices, 0);
    geometry.addGroup(0, primitiveVertices, 1);
  }
}
