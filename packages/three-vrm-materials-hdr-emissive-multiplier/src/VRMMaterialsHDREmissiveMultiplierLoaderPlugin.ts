import { GLTF, GLTFLoaderPlugin, GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader';
import * as HDREmissiveMultiplierSchema from '@pixiv/types-vrmc-materials-hdr-emissive-multiplier-1.0';

export class VRMMaterialsHDREmissiveMultiplierLoaderPlugin implements GLTFLoaderPlugin {
  public static EXTENSION_NAME = 'VRMC_materials_hdr_emissiveMultiplier' as const;

  public readonly parser: GLTFParser;

  public get name(): string {
    return VRMMaterialsHDREmissiveMultiplierLoaderPlugin.EXTENSION_NAME;
  }

  public constructor(parser: GLTFParser) {
    this.parser = parser;
  }

  public async afterRoot(gltf: GLTF): Promise<void> {
    const parser = this.parser;

    // list all materials in the gltf
    const materialsIndexInstancePairs: Array<[number, THREE.Material]> = [];
    Array.from(parser.associations.entries()).forEach(([value, { type, index }]) => {
      if (type === 'materials') {
        materialsIndexInstancePairs.push([index, value as THREE.Material]);
      }
    });

    // multiply emissive value using the extension
    materialsIndexInstancePairs.forEach(([index, material]) => {
      const extension = this._getHDREmissiveMultiplierExtension(index);
      if (extension) {
        (material as any).emissive?.multiplyScalar(extension.emissiveMultiplier);
      }
    });
  }

  private _getHDREmissiveMultiplierExtension(
    materialIndex: number,
  ): HDREmissiveMultiplierSchema.VRMCMaterialsHDREmissiveMultiplier | undefined {
    const parser = this.parser;
    const json = parser.json;

    const materialDef = json.materials[materialIndex];

    const extension: HDREmissiveMultiplierSchema.VRMCMaterialsHDREmissiveMultiplier | undefined =
      materialDef.extensions?.[VRMMaterialsHDREmissiveMultiplierLoaderPlugin.EXTENSION_NAME];
    if (extension == null) {
      return undefined;
    }

    return extension;
  }
}
