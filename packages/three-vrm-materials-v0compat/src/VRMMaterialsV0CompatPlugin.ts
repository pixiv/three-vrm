import * as THREE from 'three';
import { VRM as V0VRM, Material as V0Material } from '@pixiv/types-vrm-0.0';
import * as V1MToonSchema from '@pixiv/types-vrmc-materials-mtoon-1.0';
import type { GLTFLoaderPlugin, GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { gammaEOTF } from './utils/gammaEOTF';
import { GLTF as GLTFSchema } from '@gltf-transform/core';

export class VRMMaterialsV0CompatPlugin implements GLTFLoaderPlugin {
  public readonly parser: GLTFParser;

  /**
   * A map from v0 render queue to v1 render queue offset, for Transparent materials.
   */
  private readonly _renderQueueMapTransparent: Map<number, number>;

  /**
   * A map from v0 render queue to v1 render queue offset, for TransparentZWrite materials.
   */
  private readonly _renderQueueMapTransparentZWrite: Map<number, number>;

  public get name(): string {
    return 'VRMMaterialsV0CompatPlugin';
  }

  public constructor(parser: GLTFParser) {
    this.parser = parser;

    this._renderQueueMapTransparent = new Map();
    this._renderQueueMapTransparentZWrite = new Map();

    // WORKAROUND: Add KHR_texture_transform to extensionsUsed
    // It is too late to add this in beforeRoot
    const json = this.parser.json as GLTFSchema.IGLTF;

    json.extensionsUsed = json.extensionsUsed ?? [];
    if (json.extensionsUsed.indexOf('KHR_texture_transform') === -1) {
      json.extensionsUsed.push('KHR_texture_transform');
    }
  }

  public async beforeRoot(): Promise<void> {
    const json = this.parser.json as GLTFSchema.IGLTF;

    // early abort if it doesn't use V0VRM
    const v0VRMExtension = json.extensions?.['VRM'] as V0VRM | undefined;
    const v0MaterialProperties = v0VRMExtension?.materialProperties;
    if (!v0MaterialProperties) {
      return;
    }

    // populate render queue map
    this._populateRenderQueueMap(v0MaterialProperties);

    // convert V0 material properties into V1 compatible format
    v0MaterialProperties.forEach((materialProperties, materialIndex) => {
      const materialDef = json.materials?.[materialIndex];

      if (materialDef == null) {
        console.warn(
          `VRMMaterialsV0CompatPlugin: Attempt to use materials[${materialIndex}] of glTF but the material doesn't exist`,
        );
        return;
      }

      if (materialProperties.shader === 'VRM/MToon') {
        const material = this._parseV0MToonProperties(materialProperties, materialDef);
        json.materials![materialIndex] = material;
      } else if (materialProperties.shader?.startsWith('VRM/Unlit')) {
        const material = this._parseV0UnlitProperties(materialProperties, materialDef);
        json.materials![materialIndex] = material;
      } else if (materialProperties.shader === 'VRM_USE_GLTFSHADER') {
        // `json.materials[materialIndex]` should be already valid
      } else {
        console.warn(`VRMMaterialsV0CompatPlugin: Unknown shader: ${materialProperties.shader}`);
      }
    });
  }

  private _parseV0MToonProperties(
    materialProperties: V0Material,
    schemaMaterial: GLTFSchema.IMaterial,
  ): GLTFSchema.IMaterial {
    const isTransparent = materialProperties.keywordMap?.['_ALPHABLEND_ON'] ?? false;
    const enabledZWrite = materialProperties.floatProperties?.['_ZWrite'] === 1;
    const transparentWithZWrite = enabledZWrite && isTransparent;

    const renderQueueOffsetNumber = this._v0ParseRenderQueue(materialProperties);

    const isCutoff = materialProperties.keywordMap?.['_ALPHATEST_ON'] ?? false;
    const alphaMode = isTransparent ? 'BLEND' : isCutoff ? 'MASK' : 'OPAQUE';
    const alphaCutoff = isCutoff ? materialProperties.floatProperties?.['_Cutoff'] : undefined;

    const cullMode = materialProperties.floatProperties?.['_CullMode'] ?? 2; // enum, { Off, Front, Back }
    const doubleSided = cullMode === 0;

    const textureTransformExt = this._portTextureTransform(materialProperties);

    const baseColorFactor = materialProperties.vectorProperties?.['_Color']?.map(
      (v: number, i: number) => (i === 3 ? v : gammaEOTF(v)), // alpha channel is stored in linear
    );
    const baseColorTextureIndex = materialProperties.textureProperties?.['_MainTex'];
    const baseColorTexture =
      baseColorTextureIndex != null
        ? {
            index: baseColorTextureIndex,
            extensions: {
              ...textureTransformExt,
            },
          }
        : undefined;

    const normalTextureScale = materialProperties.floatProperties?.['_BumpScale'];
    const normalTextureIndex = materialProperties.textureProperties?.['_BumpMap'];
    const normalTexture =
      normalTextureIndex != null
        ? {
            index: normalTextureIndex,
            scale: normalTextureScale,
            extensions: {
              ...textureTransformExt,
            },
          }
        : undefined;

    const emissiveFactor = materialProperties.vectorProperties?.['_EmissionColor']?.map(gammaEOTF);
    const emissiveTextureIndex = materialProperties.textureProperties?.['_EmissionMap'];
    const emissiveTexture =
      emissiveTextureIndex != null
        ? {
            index: emissiveTextureIndex,
            extensions: {
              ...textureTransformExt,
            },
          }
        : undefined;

    const shadeColorFactor = materialProperties.vectorProperties?.['_ShadeColor']?.map(gammaEOTF);
    const shadeMultiplyTextureIndex = materialProperties.textureProperties?.['_ShadeTexture'];
    const shadeMultiplyTexture =
      shadeMultiplyTextureIndex != null
        ? {
            index: shadeMultiplyTextureIndex,
            extensions: {
              ...textureTransformExt,
            },
          }
        : undefined;

    // // convert v0 shade shift / shade toony
    let shadingShiftFactor = materialProperties.floatProperties?.['_ShadeShift'] ?? 0.0;
    let shadingToonyFactor = materialProperties.floatProperties?.['_ShadeToony'] ?? 0.9;
    shadingToonyFactor = THREE.MathUtils.lerp(shadingToonyFactor, 1.0, 0.5 + 0.5 * shadingShiftFactor);
    shadingShiftFactor = -shadingShiftFactor - (1.0 - shadingToonyFactor);

    const giIntensityFactor = materialProperties.floatProperties?.['_IndirectLightIntensity'];
    const giEqualizationFactor = giIntensityFactor ? 1.0 - giIntensityFactor : undefined;

    const matcapTextureIndex = materialProperties.textureProperties?.['_SphereAdd'];
    const matcapFactor = matcapTextureIndex != null ? [1.0, 1.0, 1.0] : undefined;
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
            extensions: {
              ...textureTransformExt,
            },
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
            extensions: {
              ...textureTransformExt,
            },
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
            extensions: {
              ...textureTransformExt,
            },
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
      specVersion: '1.0',
      transparentWithZWrite,
      renderQueueOffsetNumber,
      shadeColorFactor,
      shadeMultiplyTexture,
      shadingShiftFactor,
      shadingToonyFactor,
      giEqualizationFactor,
      matcapFactor,
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

  private _parseV0UnlitProperties(
    materialProperties: V0Material,
    schemaMaterial: GLTFSchema.IMaterial,
  ): GLTFSchema.IMaterial {
    const isTransparentZWrite = materialProperties.shader === 'VRM/UnlitTransparentZWrite';
    const isTransparent = materialProperties.shader === 'VRM/UnlitTransparent' || isTransparentZWrite;

    const renderQueueOffsetNumber = this._v0ParseRenderQueue(materialProperties);

    const isCutoff = materialProperties.shader === 'VRM/UnlitCutout';
    const alphaMode = isTransparent ? 'BLEND' : isCutoff ? 'MASK' : 'OPAQUE';
    const alphaCutoff = isCutoff ? materialProperties.floatProperties?.['_Cutoff'] : undefined;

    const textureTransformExt = this._portTextureTransform(materialProperties);

    const baseColorFactor = materialProperties.vectorProperties?.['_Color']?.map(gammaEOTF);
    const baseColorTextureIndex = materialProperties.textureProperties?.['_MainTex'];
    const baseColorTexture =
      baseColorTextureIndex != null
        ? {
            index: baseColorTextureIndex,
            extensions: {
              ...textureTransformExt,
            },
          }
        : undefined;

    // use mtoon instead of unlit, since there might be VRM0.0 specific features that are not supported by gltf
    const mtoonExtension: V1MToonSchema.VRMCMaterialsMToon = {
      specVersion: '1.0',
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
   * Create a glTF `KHR_texture_transform` extension from v0 texture transform info.
   */
  private _portTextureTransform(materialProperties: V0Material): { [name: string]: any } {
    const textureTransform = materialProperties.vectorProperties?.['_MainTex'];
    if (textureTransform == null) {
      return {};
    }

    const offset = [textureTransform?.[0] ?? 0.0, textureTransform?.[1] ?? 0.0];
    const scale = [textureTransform?.[2] ?? 1.0, textureTransform?.[3] ?? 1.0];

    offset[1] = (scale[1] * (1.0 - offset[1])) % 1.0;

    return {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      KHR_texture_transform: { offset, scale },
    };
  }

  /**
   * Convert v0 render order into v1 render order.
   * This uses a map from v0 render queue to v1 compliant render queue offset which is generated in {@link _populateRenderQueueMap}.
   */
  private _v0ParseRenderQueue(materialProperties: V0Material): number {
    const isTransparent = materialProperties.keywordMap?.['_ALPHABLEND_ON'] ?? false;
    const enabledZWrite = materialProperties.floatProperties?.['_ZWrite'] === 1;

    let offset = 0;

    if (isTransparent) {
      const v0Queue = materialProperties.renderQueue;

      if (v0Queue != null) {
        if (enabledZWrite) {
          offset = this._renderQueueMapTransparentZWrite.get(v0Queue)!;
        } else {
          offset = this._renderQueueMapTransparent.get(v0Queue)!;
        }
      }
    }

    return offset;
  }

  /**
   * Create a map which maps v0 render queue to v1 compliant render queue offset.
   * This lists up all render queues the model use and creates a map to new render queue offsets in the same order.
   */
  private _populateRenderQueueMap(materialPropertiesList: V0Material[]) {
    /**
     * A set of used render queues in Transparent materials.
     */
    const renderQueuesTransparent = new Set<number>();

    /**
     * A set of used render queues in TransparentZWrite materials.
     */
    const renderQueuesTransparentZWrite = new Set<number>();

    // populate the render queue set
    materialPropertiesList.forEach((materialProperties) => {
      const isTransparent = materialProperties.keywordMap?.['_ALPHABLEND_ON'] ?? false;
      const enabledZWrite = materialProperties.floatProperties?.['_ZWrite'] === 1;

      if (isTransparent) {
        const v0Queue = materialProperties.renderQueue;

        if (v0Queue != null) {
          if (enabledZWrite) {
            renderQueuesTransparentZWrite.add(v0Queue);
          } else {
            renderQueuesTransparent.add(v0Queue);
          }
        }
      }
    });

    // show a warning if the model uses v1 incompatible number of render queues
    if (renderQueuesTransparent.size > 10) {
      console.warn(
        `VRMMaterialsV0CompatPlugin: This VRM uses ${renderQueuesTransparent.size} render queues for Transparent materials while VRM 1.0 only supports up to 10 render queues. The model might not be rendered correctly.`,
      );
    }

    if (renderQueuesTransparentZWrite.size > 10) {
      console.warn(
        `VRMMaterialsV0CompatPlugin: This VRM uses ${renderQueuesTransparentZWrite.size} render queues for TransparentZWrite materials while VRM 1.0 only supports up to 10 render queues. The model might not be rendered correctly.`,
      );
    }

    // create a map from v0 render queue to v1 render queue offset
    Array.from(renderQueuesTransparent)
      .sort()
      .forEach((queue, i) => {
        const newQueueOffset = Math.min(Math.max(i - renderQueuesTransparent.size + 1, -9), 0);
        this._renderQueueMapTransparent.set(queue, newQueueOffset);
      });

    Array.from(renderQueuesTransparentZWrite)
      .sort()
      .forEach((queue, i) => {
        const newQueueOffset = Math.min(Math.max(i, 0), 9);
        this._renderQueueMapTransparentZWrite.set(queue, newQueueOffset);
      });
  }
}
