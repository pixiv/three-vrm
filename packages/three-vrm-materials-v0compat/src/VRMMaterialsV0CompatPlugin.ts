import * as THREE from 'three';
import { VRM as V0VRM, Material as V0Material } from '@pixiv/types-vrm-0.0';
import * as V1MToonSchema from '@pixiv/types-vrmc-materials-mtoon-1.0';
import type { GLTFLoaderPlugin, GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader';
import { gammaEOTF } from './utils/gammaEOTF';

export class VRMMaterialsV0CompatPlugin implements GLTFLoaderPlugin {
  public readonly parser: GLTFParser;

  private _haveExecutedBeforeRoot: boolean;

  public get name(): string {
    return 'VRMMaterialsV0CompatPlugin';
  }

  public constructor(parser: GLTFParser) {
    this.parser = parser;

    this._haveExecutedBeforeRoot = false;
  }

  public async beforeRoot(): Promise<void> {
    if (this._haveExecutedBeforeRoot) {
      // someone else have already executed beforeRoot
      return;
    }

    // early abort if it doesn't use V0VRM
    const json = this.parser.json;
    const v0VRMExtension: V0VRM | undefined = json.extensions?.['VRM'];
    const v0MaterialProperties = v0VRMExtension?.materialProperties;
    if (!v0MaterialProperties) {
      return;
    }

    // convert V0 material properties into V1 compatible format
    v0MaterialProperties.forEach((materialProperties, materialIndex) => {
      if (materialProperties.shader === 'VRM/MToon') {
        const material = this._parseV0MToonProperties(materialProperties, json.materials[materialIndex]);
        json.materials[materialIndex] = material;
      } else if (materialProperties.shader?.startsWith('VRM/Unlit')) {
        const material = this._parseV0UnlitProperties(materialProperties, json.materials[materialIndex]);
        json.materials[materialIndex] = material;
      } else if (materialProperties.shader === 'VRM_USE_GLTFSHADER') {
        // `json.materials[materialIndex]` should be already valid
      } else {
        console.warn(`VRMMaterialsV0CompatPlugin: Unknown shader: ${materialProperties.shader}`);
      }
    });
  }

  private _parseV0MToonProperties(materialProperties: V0Material, schemaMaterial: any): any {
    const isTransparent = materialProperties.keywordMap?.['_ALPHABLEND_ON'] ?? false;
    const enabledZWrite = materialProperties.floatProperties?.['_ZWrite'] === 1;
    const transparentWithZWrite = enabledZWrite && isTransparent;

    const renderQueueOffsetNumber = this._v0ParseRenderQueue(materialProperties);

    const isCutoff = materialProperties.keywordMap?.['_ALPHATEST_ON'] ?? false;
    const alphaMode = isTransparent ? 'BLEND' : isCutoff ? 'MASK' : 'OPAQUE';
    const alphaCutoff = isCutoff ? materialProperties.floatProperties?.['_Cutoff'] : undefined;

    const cullMode = materialProperties.floatProperties?.['_CullMode'] ?? 2; // enum, { Off, Front, Back }
    const doubleSided = cullMode === 0;

    const baseColorFactor = materialProperties.vectorProperties?.['_Color']?.map(
      (v: number, i: number) => (i === 3 ? v : gammaEOTF(v)), // alpha channel is stored in linear
    );
    const baseColorTextureIndex = materialProperties.textureProperties?.['_MainTex'];
    const baseColorTexture =
      baseColorTextureIndex != null
        ? {
            index: baseColorTextureIndex,
          }
        : undefined;

    const normalTextureScale = materialProperties.floatProperties?.['_BumpScale'];
    const normalTextureIndex = materialProperties.textureProperties?.['_BumpMap'];
    const normalTexture =
      normalTextureIndex != null
        ? {
            index: normalTextureIndex,
            scale: normalTextureScale,
          }
        : undefined;

    const emissiveFactor = materialProperties.vectorProperties?.['_EmissionColor']?.map(gammaEOTF);
    const emissiveTextureIndex = materialProperties.textureProperties?.['_EmissionMap'];
    const emissiveTexture =
      emissiveTextureIndex != null
        ? {
            index: emissiveTextureIndex,
          }
        : undefined;

    const shadeColorFactor = materialProperties.vectorProperties?.['_ShadeColor']?.map(gammaEOTF);
    const shadeMultiplyTextureIndex = materialProperties.textureProperties?.['_ShadeTexture'];
    const shadeMultiplyTexture =
      shadeMultiplyTextureIndex != null
        ? {
            index: shadeMultiplyTextureIndex,
          }
        : undefined;

    // // convert v0 shade shift / shade toony
    let shadingShiftFactor = materialProperties.floatProperties?.['_ShadeShift'] ?? 0.0;
    let shadingToonyFactor = materialProperties.floatProperties?.['_ShadeToony'] ?? 0.9;
    shadingToonyFactor = THREE.MathUtils.lerp(shadingToonyFactor, 1.0, 0.5 + 0.5 * shadingShiftFactor);
    shadingShiftFactor = -shadingShiftFactor - (1.0 - shadingToonyFactor);

    const giIntensityFactor = materialProperties.floatProperties?.['_IndirectLightIntensity'];

    const matcapTextureIndex = materialProperties.textureProperties?.['_SphereAdd'];
    const matcapTexture =
      matcapTextureIndex != null
        ? {
            index: matcapTextureIndex,
          }
        : undefined;

    const rimLightingMixFactor = materialProperties.floatProperties?.['_RimLightingMix'];
    const rimMultiplyTextureIndex = materialProperties.textureProperties?.['_RimTexture'];
    const rimMultiplyTexture =
      rimMultiplyTextureIndex != null
        ? {
            index: rimMultiplyTextureIndex,
          }
        : undefined;

    const parametricRimColorFactor = materialProperties.vectorProperties?.['_RimColor']?.map(gammaEOTF);
    const parametricRimFresnelPowerFactor = materialProperties.floatProperties?.['_RimFresnelPower'];
    const parametricRimLiftFactor = materialProperties.floatProperties?.['_RimLift'];

    const outlineWidthMode = ['none', 'worldCoordinates', 'screenCoordinates'][
      materialProperties.floatProperties?.['_OutlineWidthMode'] ?? 0
    ] as V1MToonSchema.MaterialsMToonOutlineWidthMode;

    // // v0 outlineWidthFactor is in centimeter
    let outlineWidthFactor = materialProperties.floatProperties?.['_OutlineWidth'] ?? 0.0;
    outlineWidthFactor = 0.01 * outlineWidthFactor;

    const outlineWidthMultiplyTextureIndex = materialProperties.textureProperties?.['_OutlineWidthTexture'];
    const outlineWidthMultiplyTexture =
      outlineWidthMultiplyTextureIndex != null
        ? {
            index: outlineWidthMultiplyTextureIndex,
          }
        : undefined;

    const outlineColorFactor = materialProperties.vectorProperties?.['_OutlineColor']?.map(gammaEOTF);
    const outlineColorMode = materialProperties.floatProperties?.['_OutlineColorMode']; // enum, { Fixed, Mixed }
    const outlineLightingMixFactor =
      outlineColorMode === 1 ? materialProperties.floatProperties?.['_OutlineLightingMix'] : 0.0;

    const uvAnimationMaskTextureIndex = materialProperties.textureProperties?.['_UvAnimMaskTexture'];
    const uvAnimationMaskTexture =
      uvAnimationMaskTextureIndex != null
        ? {
            index: uvAnimationMaskTextureIndex,
          }
        : undefined;

    const uvAnimationScrollXSpeedFactor = materialProperties.floatProperties?.['_UvAnimScrollX'];

    // uvAnimationScrollYSpeedFactor will be opposite between V0 and V1
    let uvAnimationScrollYSpeedFactor = materialProperties.floatProperties?.['_UvAnimScrollY'];
    if (uvAnimationScrollYSpeedFactor != null) {
      uvAnimationScrollYSpeedFactor = -uvAnimationScrollYSpeedFactor;
    }

    const uvAnimationRotationSpeedFactor = materialProperties.floatProperties?.['_UvAnimRotation'];

    const mtoonExtension: V1MToonSchema.VRMCMaterialsMToon = {
      specVersion: '1.0-draft',
      transparentWithZWrite,
      renderQueueOffsetNumber,
      shadeColorFactor,
      shadeMultiplyTexture,
      shadingShiftFactor,
      shadingToonyFactor,
      giIntensityFactor,
      matcapTexture,
      rimLightingMixFactor,
      rimMultiplyTexture,
      parametricRimColorFactor,
      parametricRimFresnelPowerFactor,
      parametricRimLiftFactor,
      outlineWidthMode,
      outlineWidthFactor,
      outlineWidthMultiplyTexture,
      outlineColorFactor,
      outlineLightingMixFactor,
      uvAnimationMaskTexture,
      uvAnimationScrollXSpeedFactor,
      uvAnimationScrollYSpeedFactor,
      uvAnimationRotationSpeedFactor,
    };

    return {
      ...schemaMaterial,

      pbrMetallicRoughness: {
        baseColorFactor,
        baseColorTexture,
      },
      normalTexture,
      emissiveTexture,
      emissiveFactor,
      alphaMode,
      alphaCutoff,
      doubleSided,
      extensions: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        VRMC_materials_mtoon: mtoonExtension,
      },
    };
  }

  private _parseV0UnlitProperties(materialProperties: V0Material, schemaMaterial: any): any {
    const isTransparentZWrite = materialProperties.shader === 'VRM/UnlitTransparentZWrite';
    const isTransparent = materialProperties.shader === 'VRM/UnlitTransparent' || isTransparentZWrite;

    const renderQueueOffsetNumber = this._v0ParseRenderQueue(materialProperties);

    const isCutoff = materialProperties.shader === 'VRM/UnlitCutout';
    const alphaMode = isTransparent ? 'BLEND' : isCutoff ? 'MASK' : 'OPAQUE';
    const alphaCutoff = isCutoff ? materialProperties.floatProperties?.['_Cutoff'] : undefined;

    const baseColorFactor = materialProperties.vectorProperties?.['_Color']?.map(gammaEOTF);
    const baseColorTextureIndex = materialProperties.textureProperties?.['_MainTex'];
    const baseColorTexture =
      baseColorTextureIndex != null
        ? {
            index: baseColorTextureIndex,
          }
        : undefined;

    // use mtoon instead of unlit, since there might be VRM0.0 specific features that are not supported by gltf
    const mtoonExtension: V1MToonSchema.VRMCMaterialsMToon = {
      specVersion: '1.0-draft',
      transparentWithZWrite: isTransparentZWrite,
      renderQueueOffsetNumber,
      shadeColorFactor: baseColorFactor,
      shadeMultiplyTexture: baseColorTexture,
    };

    return {
      ...schemaMaterial,

      pbrMetallicRoughness: {
        baseColorFactor,
        baseColorTexture,
      },
      alphaMode,
      alphaCutoff,
      extensions: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        VRMC_materials_mtoon: mtoonExtension,
      },
    };
  }

  /**
   * Convert v0 render order into v1 render order.
   */
  private _v0ParseRenderQueue(materialProperties: V0Material): number {
    const isTransparent = materialProperties.keywordMap?.['_ALPHABLEND_ON'] ?? false;
    const enabledZWrite = materialProperties.floatProperties?.['_ZWrite'] === 1;

    let offset = 0;

    if (isTransparent && materialProperties.renderQueue) {
      if (enabledZWrite) {
        offset = Math.min(Math.max(materialProperties.renderQueue - 2501, 0), 9);
      } else {
        offset = Math.min(Math.max(materialProperties.renderQueue - 3000, -9), 0);
      }
    }

    return offset;
  }
}
