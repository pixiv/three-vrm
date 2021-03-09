import * as THREE from 'three';
import { VRM as V0VRM, Material as V0Material } from '@pixiv/types-vrm-0.0';
import * as V1MToonSchema from '@pixiv/types-vrmc-materials-mtoon-1.0';
import type { GLTFLoaderPlugin, GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader';
import { MToonMaterial } from './MToonMaterial';
import type { MToonMaterialParameters } from './MToonMaterialParameters';
import { MToonMaterialOutlineWidthMode } from './MToonMaterialOutlineWidthMode';
import { MToonMaterialOutlineColorMode } from './MToonMaterialOutlineColorMode';
import { colorFromArray } from './utils/colorFromArray';

export class VRMCMaterialsMToonExtensionPlugin implements GLTFLoaderPlugin {
  public static EXTENSION_NAME = 'VRMC_materials_mtoon-1.0';

  public static EXTENSION_NAME_CANDIDATES = [
    'VRMC_materials_mtoon-1.0',
    'VRMC_materials_mtoon-1.0_draft',
  ];

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

  public async beforeRoot(): Promise<void> {
    this._removeUnlitExtension();
  }

  public getMaterialType(materialIndex: number): typeof THREE.Material | null {
    const v1Extension = this._v1GetMToonExtension(materialIndex);
    if (v1Extension) {
      return MToonMaterial;
    }

    const v0Properties = this._v0GetMToonProperties(materialIndex);
    if (v0Properties) {
      return MToonMaterial;
    }

    return null;
  }

  public extendMaterialParams(
    materialIndex: number,
    materialParams: MToonMaterialParameters,
  ): Promise<any> | null {
    const extension = this._v1GetMToonExtension(materialIndex);
    if (extension) {
      return this._v1ExtendMaterialParams(extension, materialParams);
    }

    const v0Properties = this._v0GetMToonProperties(materialIndex);
    if (v0Properties) {
      return this._v0ExtendMaterialParams(v0Properties, materialParams);
    }

    return null;
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
   * Delete use of `KHR_materials_unlit` from its `materials` and `extensionsUsed`.
   *
   * Since GLTFLoader have so many hardcoded procedure related to `KHR_materials_unlit`
   * we have to delete the extension before we start to parse the glTF.
   */
  private _removeUnlitExtension(): void {
    const parser = this._parser;
    const json = parser.json;

    const extensionUsedUnlitIndex = json.extensionsUsed.indexOf('KHR_materials_unlit');
    if (extensionUsedUnlitIndex) {
      json.extensionsUsed.splice(extensionUsedUnlitIndex, 1);
    }

    const materialDefs: any[] = json.materials;
    materialDefs.map((materialDef) => {
      if (materialDef.extensions?.['KHR_materials_unlit']) {
        delete materialDef.extensions['KHR_materials_unlit'];
      }
    });
  }

  private _v1GetMToonExtension(materialIndex: number): V1MToonSchema.MaterialsMToon | undefined {
    const parser = this._parser;
    const json = parser.json;

    const materialDef = json.materials[materialIndex];

    for (const nameCandidate of VRMCMaterialsMToonExtensionPlugin.EXTENSION_NAME_CANDIDATES) {
      const extension: V1MToonSchema.MaterialsMToon | undefined = materialDef.extensions?.[nameCandidate];
      if (extension != null) {
        return extension;
      }
    }

    return undefined;
  }

  private _v0GetMToonProperties(materialIndex: number): V0Material | undefined {
    const parser = this._parser;
    const json = parser.json;

    const v0VRMExtension: V0VRM | undefined = json.extensions?.[ 'VRM' ];
    const v0MaterialProperties: V0Material | undefined = v0VRMExtension?.materialProperties?.[ materialIndex ];

    if ( v0MaterialProperties?.shader === 'VRM/MToon' ) {
      return v0MaterialProperties;
    }
  }

  private async _v1ExtendMaterialParams(
    extension: V1MToonSchema.MaterialsMToon,
    materialParams: MToonMaterialParameters,
  ): Promise<void> {
    const parser = this._parser;

    materialParams.onLoadMaterial = this.onLoadMaterial;

    // Removing material params that is not required to supress warnings.
    delete (materialParams as THREE.MeshStandardMaterialParameters).metalness;
    delete (materialParams as THREE.MeshStandardMaterialParameters).roughness;

    const pending: Promise<any>[] = [];

    materialParams.transparentWithZWrite = extension.transparentWithZWrite;

    materialParams.shadeFactor = extension.shadeFactor && new THREE.Color().fromArray(extension.shadeFactor);
    if (extension.shadeMultiplyTexture != null) {
      pending.push(
        (parser as any).assignTexture(materialParams, 'shadeMultiplyTexture', {
          index: extension.shadeMultiplyTexture.index,
        }),
      );
    }

    materialParams.shadingShiftFactor = extension.shadingShiftFactor;
    materialParams.shadingToonyFactor = extension.shadingToonyFactor;
    materialParams.lightColorAttenuationFactor = extension.lightColorAttenuationFactor;
    materialParams.giIntensityFactor = extension.giIntensityFactor;

    if (extension.additiveTexture != null) {
      pending.push(
        (parser as any).assignTexture(materialParams, 'additiveTexture', { index: extension.additiveTexture.index }),
      );
    }

    materialParams.rimFactor = extension.rimFactor && new THREE.Color().fromArray(extension.rimFactor);
    if (extension.rimMultiplyTexture != null) {
      pending.push(
        (parser as any).assignTexture(materialParams, 'rimMultiplyTexture', { index: extension.rimMultiplyTexture.index }),
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
          index: extension.outlineWidthMultiplyTexture.index,
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
          index: extension.uvAnimationMaskTexture.index,
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
  }

  private async _v0ExtendMaterialParams(
    properties: V0Material,
    materialParams: MToonMaterialParameters,
  ): Promise<void> {
    const parser = this._parser;

    materialParams.onLoadMaterial = this.onLoadMaterial;

    // Removing material params that is not required to supress warnings.
    delete (materialParams as THREE.MeshStandardMaterialParameters).metalness;
    delete (materialParams as THREE.MeshStandardMaterialParameters).roughness;

    const pending: Promise<any>[] = [];

    materialParams.color = colorFromArray(properties.vectorProperties?.[ '_Color' ])?.convertSRGBToLinear();
    if (properties.textureProperties?.['_MainTex'] != null) {
      pending.push(
        (parser as any).assignTexture(materialParams, 'map', { index: properties.textureProperties['_MainTex'] }),
      );
    }

    if (properties.textureProperties?.['_BumpMap'] != null) {
      pending.push(
        (parser as any).assignTexture(materialParams, 'normalMap', { index: properties.textureProperties['_BumpMap'] }),
      );
      materialParams.normalScale = properties.textureProperties?.['_BumpScale'];
    }

    materialParams.emissive = colorFromArray(properties.vectorProperties?.[ '_EmissionColor' ])?.convertSRGBToLinear();
    if (properties.textureProperties?.['_EmissionMap'] != null) {
      pending.push(
        (parser as any).assignTexture(materialParams, 'emissiveMap', { index: properties.textureProperties['_EmissionMap'] }),
      );
    }

    const isTransparent = properties.keywordMap?.['_ALPHABLEND_ON'] ?? false;
    const enabledZWrite = properties.floatProperties?.['_ZWrite'] === 1;
    materialParams.transparentWithZWrite = enabledZWrite && isTransparent;

    materialParams.shadeFactor = colorFromArray(properties.vectorProperties?.[ '_ShadeColor' ])?.convertSRGBToLinear();
    if (properties.textureProperties?.['_ShadeTexture'] != null) {
      pending.push(
        (parser as any).assignTexture(materialParams, 'shadeMultiplyTexture', {
          index: properties.textureProperties['_ShadeTexture'],
        }),
      );
    }

    materialParams.shadingShiftFactor = properties.floatProperties?.['_ShadeShift'];
    materialParams.shadingToonyFactor = properties.floatProperties?.['_ShadeToony'];
    materialParams.lightColorAttenuationFactor = properties.floatProperties?.['_LightColorAttenuation'];
    materialParams.giIntensityFactor = properties.floatProperties?.['_IndirectLightIntensity'];

    if (properties.textureProperties?.['_SphereAdd'] != null) {
      pending.push(
        (parser as any).assignTexture(materialParams, 'additiveTexture', { index: properties.textureProperties['_SphereAdd'] }),
      );
    }

    materialParams.rimFactor = colorFromArray(properties.vectorProperties?.['_RimColor'])?.convertSRGBToLinear();
    if (properties.textureProperties?.['_RimTexture'] != null) {
      pending.push(
        (parser as any).assignTexture(materialParams, 'rimMultiplyTexture', { index: properties.textureProperties['_RimTexture'] }),
      );
    }
    materialParams.rimLightingMixFactor = properties.floatProperties?.['_RimLightingMix'];
    materialParams.rimFresnelPowerFactor = properties.floatProperties?.['_RimFresnelPower'];
    materialParams.rimLiftFactor = properties.floatProperties?.['_RimLift'];

    materialParams.outlineWidthMode = [
      MToonMaterialOutlineWidthMode.None,
      MToonMaterialOutlineWidthMode.WorldCoordinates,
      MToonMaterialOutlineWidthMode.ScreenCoordinates
    ][properties.floatProperties?.['_OutlineWidthMode'] ?? 0];
    materialParams.outlineWidthFactor = properties.floatProperties?.['_OutlineWidth'];
    if (properties.textureProperties?.['_OutlineWidthTexture'] != null) {
      pending.push(
        (parser as any).assignTexture(materialParams, 'outlineWidthMultiplyTexture', {
          index: properties.textureProperties['_OutlineWidthTexture'],
        }),
      );
    }
    materialParams.outlineScaledMaxDistanceFactor = properties.floatProperties?.['_OutlineWidth'];
    materialParams.outlineColorMode = [
      MToonMaterialOutlineColorMode.FixedColor,
      MToonMaterialOutlineColorMode.MixedLighting
    ][properties.floatProperties?.['_OutlineColorMode'] ?? 0];
    materialParams.outlineFactor = colorFromArray(properties.vectorProperties?.['_OutlineColor'])?.convertSRGBToLinear();
    materialParams.outlineLightingMixFactor = properties.floatProperties?.['_OutlineLightingMix'];

    if (properties.textureProperties?.['_UvAnimMaskTexture'] != null) {
      pending.push(
        (parser as any).assignTexture(materialParams, 'uvAnimationMaskTexture', {
          index: properties.textureProperties['_UvAnimMaskTexture'],
        }),
      );
    }
    materialParams.uvAnimationScrollXSpeedFactor = properties.floatProperties?.['_UvAnimScrollX'];
    materialParams.uvAnimationScrollYSpeedFactor = properties.floatProperties?.['_UvAnimScrollY'];
    materialParams.uvAnimationRotationSpeedFactor = properties.floatProperties?.['_UvAnimRotation'];

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
  }

  private _setupPrimitive(
    mesh: THREE.Mesh,
    materialIndex: number,
  ): void {
    const v1Extension = this._v1GetMToonExtension(materialIndex);
    if (v1Extension) {
      this._v1SetRenderOrder(mesh, v1Extension);
      this._v1GenerateOutline(mesh, v1Extension);

      return;
    }

    const v0Properties = this._v0GetMToonProperties(materialIndex);
    if (v0Properties) {
      this._v0SetRenderOrder(mesh, v0Properties);
      this._v0GenerateOutline(mesh, v0Properties);

      return;
    }
  }

  private _v1SetRenderOrder(mesh: THREE.Mesh, extension: V1MToonSchema.MaterialsMToon): void {
    // transparentWithZWrite ranges from 0 to +9
    // mere transparent ranges from -9 to 0
    const enabledZWrite = extension.transparentWithZWrite;
    mesh.renderOrder = (enabledZWrite ? 0 : 19) + this.renderOrderOffset + (extension.renderQueueOffsetNumber ?? 0);
  }

  private _v1GenerateOutline(mesh: THREE.Mesh, extension: V1MToonSchema.MaterialsMToon): void {
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
    const outlineMaterial = surfaceMaterial.clone() as MToonMaterial;
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

  private _v0SetRenderOrder(mesh: THREE.Mesh, properties: V0Material): void {
    const isTransparent = properties.keywordMap?.['_ALPHABLEND_ON'] ?? false;
    const enabledZWrite = properties.floatProperties?.['_ZWrite'] === 1;

    let offset = 0;

    if (isTransparent && properties.renderQueue) {
      if (enabledZWrite) {
        offset = Math.min(Math.max(properties.renderQueue - 2501, 0), 9);
      } else {
        offset = Math.min(Math.max(properties.renderQueue - 3000, -9), 0);
      }
    }

    // transparentWithZWrite ranges from 0 to +9
    // mere transparent ranges from -9 to 0
    mesh.renderOrder = (enabledZWrite ? 0 : 19) + this.renderOrderOffset + offset;
  }

  private _v0GenerateOutline(mesh: THREE.Mesh, properties: V0Material): void {
    // Check whether we really have to prepare outline or not
    if (((properties.floatProperties?.['_OutlineWidthMode'] ?? 0) === 0) || ((properties.floatProperties?.['_OutlineWidth'] ?? 0.0) === 0.0)) {
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
    const outlineMaterial = surfaceMaterial.clone() as MToonMaterial;
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
