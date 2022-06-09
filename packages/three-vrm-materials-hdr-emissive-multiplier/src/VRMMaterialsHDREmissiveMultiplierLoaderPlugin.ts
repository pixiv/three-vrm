import { GLTFLoaderPlugin, GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as HDREmissiveMultiplierSchema from '@pixiv/types-vrmc-materials-hdr-emissive-multiplier-1.0';
import { GLTF as GLTFSchema } from '@gltf-transform/core';

export class VRMMaterialsHDREmissiveMultiplierLoaderPlugin implements GLTFLoaderPlugin {
  public static EXTENSION_NAME = 'VRMC_materials_hdr_emissiveMultiplier' as const;

  public readonly parser: GLTFParser;

  public get name(): string {
    return VRMMaterialsHDREmissiveMultiplierLoaderPlugin.EXTENSION_NAME;
  }

  public constructor(parser: GLTFParser) {
    this.parser = parser;
  }

  public async extendMaterialParams(materialIndex: number, materialParams: { [key: string]: any }): Promise<void> {
    const extension = this._getHDREmissiveMultiplierExtension(materialIndex);
    if (extension == null) {
      return;
    }

    // This extension is archived. Emit warning
    // See: https://github.com/vrm-c/vrm-specification/pull/375
    console.warn(
      'VRMMaterialsHDREmissiveMultiplierLoaderPlugin: `VRMC_materials_hdr_emissiveMultiplier` is archived. Use `KHR_materials_emissive_strength` instead.',
    );

    const emissiveMultiplier = extension.emissiveMultiplier;
    materialParams.emissiveIntensity = emissiveMultiplier;
  }

  private _getHDREmissiveMultiplierExtension(
    materialIndex: number,
  ): HDREmissiveMultiplierSchema.VRMCMaterialsHDREmissiveMultiplier | undefined {
    const parser = this.parser;
    const json = parser.json as GLTFSchema.IGLTF;

    const materialDef = json.materials?.[materialIndex];

    if (materialDef == null) {
      console.warn(
        `VRMMaterialsHDREmissiveMultiplierLoaderPlugin: Attempt to use materials[${materialIndex}] of glTF but the material doesn't exist`,
      );
      return undefined;
    }

    const extension = materialDef.extensions?.[VRMMaterialsHDREmissiveMultiplierLoaderPlugin.EXTENSION_NAME] as
      | HDREmissiveMultiplierSchema.VRMCMaterialsHDREmissiveMultiplier
      | undefined;
    if (extension == null) {
      return undefined;
    }

    return extension;
  }
}
