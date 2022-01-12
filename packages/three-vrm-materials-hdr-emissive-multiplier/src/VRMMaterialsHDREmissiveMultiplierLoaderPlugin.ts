import * as THREE from 'three';
import { GLTF, GLTFLoaderPlugin, GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader';
import * as HDREmissiveMultiplierSchema from '@pixiv/types-vrmc-materials-hdr-emissive-multiplier-1.0';
import { gltfGetAssociatedMaterialIndex } from './utils/gltfGetAssociatedMaterialIndex';
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

  public async afterRoot(gltf: GLTF): Promise<void> {
    const parser = this.parser;

    // list up every material in `gltf.scene`
    const gltfMaterials: THREE.Material[] = [];
    gltf.scene.traverse((object) => {
      const material = (object as any).material as THREE.Material | undefined;
      if (material) {
        gltfMaterials.push(material);
      }
    });

    // multiply emissive value using the extension
    gltfMaterials.forEach((material) => {
      const materialIndex = gltfGetAssociatedMaterialIndex(parser, material);

      if (materialIndex != null) {
        const extension = this._getHDREmissiveMultiplierExtension(materialIndex);

        if (extension) {
          (material as any).emissive?.multiplyScalar(extension.emissiveMultiplier);
        }
      }
    });
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
