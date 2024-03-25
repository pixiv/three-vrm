import * as THREE from 'three';
import type { GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader';
import { MToonMaterialLoaderPlugin } from '../MToonMaterialLoaderPlugin';
import type { MToonMaterialLoaderPluginOptions } from '../MToonMaterialLoaderPluginOptions';
import { MToonNodeMaterial } from './MToonNodeMaterial';

export class MToonNodeMaterialLoaderPlugin extends MToonMaterialLoaderPlugin {
  public constructor(parser: GLTFParser, options: MToonMaterialLoaderPluginOptions = {}) {
    super(parser, options);
  }

  public getMaterialType(materialIndex: number): typeof THREE.Material | null {
    const v1Extension = this._getMToonExtension(materialIndex);
    if (v1Extension) {
      return MToonNodeMaterial;
    }

    return null;
  }
}
