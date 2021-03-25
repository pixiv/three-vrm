import * as THREE from 'three';
import { VRM as V0VRM, Material as V0Material } from '@pixiv/types-vrm-0.0';
import * as V1MToonSchema from '@pixiv/types-vrmc-materials-mtoon-1.0';
import type { GLTFLoaderPlugin, GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader';
import { MToonMaterial } from './MToonMaterial';
import type { MToonMaterialParameters } from './MToonMaterialParameters';
import { MToonMaterialOutlineWidthMode } from './MToonMaterialOutlineWidthMode';
import { MToonMaterialOutlineColorMode } from './MToonMaterialOutlineColorMode';

export class VRMCMaterialsMToonExtensionPlugin implements GLTFLoaderPlugin {
  public static EXTENSION_NAME = 'VRMC_materials_mtoon-1.0';

  public static EXTENSION_NAME_CANDIDATES = [
    'VRMC_materials_mtoon-1.0',
    'VRMC_materials_mtoon-1.0_draft',
  ];

  /**
   * This value will be added to `renderOrder` of every meshes who have MaterialsMToon.
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
    this._v1RemoveUnlitExtension();
    this._v0RemoveUnlitExtension();
  }

  public getMaterialType(materialIndex: number): (typeof THREE.Material) | null {
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
   * Delete use of `KHR_materials_unlit` from its `materials` if the material is using MToon.
   *
   * Since GLTFLoader have so many hardcoded procedure related to `KHR_materials_unlit`
   * we have to delete the extension before we start to parse the glTF.
   */
  private _v1RemoveUnlitExtension(): void {
    const parser = this._parser;
    const json = parser.json;

    const materialDefs: any[] = json.materials;
    materialDefs.map((materialDef, iMaterial) => {
      const extension = this._v1GetMToonExtension(iMaterial);

      if (extension && materialDef.extensions?.['KHR_materials_unlit']) {
        delete materialDef.extensions['KHR_materials_unlit'];
      }
    });
  }

  /**
   * Delete use of `KHR_materials_unlit` from its `materials` if the material is using MToon.
   *
   * Since GLTFLoader have so many hardcoded procedure related to `KHR_materials_unlit`
   * we have to delete the extension before we start to parse the glTF.
   */
  private _v0RemoveUnlitExtension(): void {
    const parser = this._parser;
    const json = parser.json;

    const materialDefs: any[] = json.materials;
    materialDefs.map((materialDef, iMaterial) => {
      const properties = this._v0GetMToonProperties(iMaterial);

      if (properties && materialDef.extensions?.['KHR_materials_unlit']) {
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
    materialParams.onLoadMaterial = this.onLoadMaterial;

    // Removing material params that is not required to supress warnings.
    delete (materialParams as THREE.MeshStandardMaterialParameters).metalness;
    delete (materialParams as THREE.MeshStandardMaterialParameters).roughness;

    await Promise.all([
      this._assignPrimitive(materialParams, 'transparentWithZWrite', extension.transparentWithZWrite),
      this._assignColor(materialParams, 'shadeFactor', extension.shadeFactor),
      this._assignTexture(materialParams, 'shadeMultiplyTexture', extension.shadeMultiplyTexture?.index, true),
      this._assignPrimitive(materialParams, 'shadingShiftFactor', extension.shadingShiftFactor),
      this._assignTexture(materialParams, 'shadingShiftTexture', extension.shadingShiftTexture?.index, true),
      this._assignPrimitive(materialParams, 'shadingShiftTextureScale', extension.shadingShiftTexture?.scale),
      this._assignPrimitive(materialParams, 'shadingToonyFactor', extension.shadingToonyFactor),
      this._assignPrimitive(materialParams, 'lightColorAttenuationFactor', extension.lightColorAttenuationFactor),
      this._assignPrimitive(materialParams, 'giIntensityFactor', extension.giIntensityFactor),
      this._assignTexture(materialParams, 'additiveTexture', extension.additiveTexture?.index, true),
      this._assignColor(materialParams, 'rimFactor', extension.rimFactor),
      this._assignTexture(materialParams, 'rimMultiplyTexture', extension.rimMultiplyTexture?.index, true),
      this._assignPrimitive(materialParams, 'rimLightingMixFactor', extension.rimLightingMixFactor),
      this._assignPrimitive(materialParams, 'rimFresnelPowerFactor', extension.rimFresnelPowerFactor),
      this._assignPrimitive(materialParams, 'rimLiftFactor', extension.rimLiftFactor),
      this._assignPrimitive(materialParams, 'outlineWidthMode', extension.outlineWidthMode as MToonMaterialOutlineWidthMode),
      this._assignPrimitive(materialParams, 'outlineWidthFactor', extension.outlineWidthFactor),
      this._assignTexture(materialParams, 'outlineWidthMultiplyTexture', extension.outlineWidthMultiplyTexture?.index, false),
      this._assignPrimitive(materialParams, 'outlineScaledMaxDistanceFactor', extension.outlineScaledMaxDistanceFactor),
      this._assignPrimitive(materialParams, 'outlineColorMode', extension.outlineColorMode as MToonMaterialOutlineColorMode),
      this._assignColor(materialParams, 'outlineFactor', extension.outlineFactor),
      this._assignPrimitive(materialParams, 'outlineLightingMixFactor', extension.outlineLightingMixFactor),
      this._assignTexture(materialParams, 'uvAnimationMaskTexture', extension.uvAnimationMaskTexture?.index, false),
      this._assignPrimitive(materialParams, 'uvAnimationScrollXSpeedFactor', extension.uvAnimationScrollXSpeedFactor),
      this._assignPrimitive(materialParams, 'uvAnimationScrollYSpeedFactor', extension.uvAnimationScrollYSpeedFactor),
      this._assignPrimitive(materialParams, 'uvAnimationRotationSpeedFactor', extension.uvAnimationRotationSpeedFactor),
    ]);
  }

  private async _v0ExtendMaterialParams(
    properties: V0Material,
    materialParams: MToonMaterialParameters,
  ): Promise<void> {
    materialParams.onLoadMaterial = this.onLoadMaterial;

    // Removing material params that is not required to supress warnings.
    delete (materialParams as THREE.MeshStandardMaterialParameters).metalness;
    delete (materialParams as THREE.MeshStandardMaterialParameters).roughness;

    const isTransparent = properties.keywordMap?.['_ALPHABLEND_ON'] ?? false;
    const enabledZWrite = properties.floatProperties?.['_ZWrite'] === 1;
    const transparentWithZWrite = enabledZWrite && isTransparent;

    const outlineWidthMode = [
      MToonMaterialOutlineWidthMode.None,
      MToonMaterialOutlineWidthMode.WorldCoordinates,
      MToonMaterialOutlineWidthMode.ScreenCoordinates
    ][properties.floatProperties?.['_OutlineWidthMode'] ?? 0];

    const outlineColorMode = [
      MToonMaterialOutlineColorMode.FixedColor,
      MToonMaterialOutlineColorMode.MixedLighting
    ][properties.floatProperties?.['_OutlineColorMode'] ?? 0];

    await Promise.all([
      this._assignColor(materialParams, 'color', properties.vectorProperties?.['_Color'], true),
      this._assignTexture(materialParams, 'map', properties.textureProperties?.['_MainTex'], true),
      this._assignTexture(materialParams, 'normalMap', properties.textureProperties?.['_BumpMap'], false),
      this._assignPrimitive(materialParams, 'normalScale', properties.floatProperties?.['_BumpScale']),
      this._assignColor(materialParams, 'emissive', properties.vectorProperties?.['_EmissionColor'], true),
      this._assignTexture(materialParams, 'emissiveMap', properties.textureProperties?.['_EmissionMap'], true),
      this._assignPrimitive(materialParams, 'transparentWithZWrite', transparentWithZWrite),
      this._assignColor(materialParams, 'shadeFactor', properties.vectorProperties?.['_ShadeColor'], true),
      this._assignTexture(materialParams, 'shadeMultiplyTexture', properties.textureProperties?.['_ShadeTexture'], true),
      this._assignPrimitive(materialParams, 'shadingShiftFactor', properties.floatProperties?.['_ShadeShift']),
      this._assignPrimitive(materialParams, 'shadingToonyFactor', properties.floatProperties?.['_ShadeToony']),
      this._assignPrimitive(materialParams, 'lightColorAttenuationFactor', properties.floatProperties?.['_LightColorAttenuation']),
      this._assignPrimitive(materialParams, 'giIntensityFactor', properties.floatProperties?.['_IndirectLightIntensity']),
      this._assignTexture(materialParams, 'additiveTexture', properties.textureProperties?.['_SphereAdd'], true),
      this._assignColor(materialParams, 'rimFactor', properties.vectorProperties?.['_RimColor'], true),
      this._assignTexture(materialParams, 'rimMultiplyTexture', properties.textureProperties?.['_RimTexture'], true),
      this._assignPrimitive(materialParams, 'rimLightingMixFactor', properties.floatProperties?.['_RimLightingMix']),
      this._assignPrimitive(materialParams, 'rimFresnelPowerFactor', properties.floatProperties?.['_RimFresnelPower']),
      this._assignPrimitive(materialParams, 'rimLiftFactor', properties.floatProperties?.['_RimLift']),
      this._assignPrimitive(materialParams, 'outlineWidthMode', outlineWidthMode),
      this._assignPrimitive(materialParams, 'outlineWidthFactor', properties.floatProperties?.['_OutlineWidth']),
      this._assignTexture(materialParams, 'outlineWidthMultiplyTexture', properties.textureProperties?.['_OutlineWidthTexture'], false),
      this._assignPrimitive(materialParams, 'outlineScaledMaxDistanceFactor', properties.floatProperties?.['_OutlineScaledMaxDistance']),
      this._assignPrimitive(materialParams, 'outlineColorMode', outlineColorMode),
      this._assignColor(materialParams, 'outlineFactor', properties.vectorProperties?.['_OutlineColor'], true),
      this._assignPrimitive(materialParams, 'outlineLightingMixFactor', properties.floatProperties?.['_OutlineLightingMix']),
      this._assignTexture(materialParams, 'uvAnimationMaskTexture', properties.textureProperties?.['_UvAnimMaskTexture'], false),
      this._assignPrimitive(materialParams, 'uvAnimationScrollXSpeedFactor', properties.floatProperties?.['_UvAnimScrollX']),
      this._assignPrimitive(materialParams, 'uvAnimationScrollYSpeedFactor', properties.floatProperties?.['_UvAnimScrollY']),
      this._assignPrimitive(materialParams, 'uvAnimationRotationSpeedFactor', properties.floatProperties?.['_UvAnimRotation']),
    ]);
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

  private async _assignPrimitive<T extends keyof MToonMaterialParameters>(
    materialParams: MToonMaterialParameters,
    key: T,
    value: MToonMaterialParameters[T],
  ): Promise<void> {
    if (value != null) {
      materialParams[key] = value;
    }
  }

  private async _assignColor<T extends keyof MToonMaterialParameters>(
    materialParams: MToonMaterialParameters,
    key: T,
    value: number[] | undefined,
    convertSRGBToLinear?: boolean,
  ): Promise<void> {
    if (value != null) {
      materialParams[key] = new THREE.Color().fromArray(value);

      if (convertSRGBToLinear) {
        materialParams[key].convertSRGBToLinear();
      }
    }
  }

  private async _assignTexture<T extends keyof MToonMaterialParameters>(
    materialParams: MToonMaterialParameters,
    key: T,
    index: number | undefined,
    isColorTexture: boolean
  ): Promise<void> {
    if (index != null) {
      await (this._parser as any).assignTexture(materialParams, key, { index });

      if (isColorTexture) {
        materialParams[key].encoding = THREE.sRGBEncoding;
      }
    }
  }
}
