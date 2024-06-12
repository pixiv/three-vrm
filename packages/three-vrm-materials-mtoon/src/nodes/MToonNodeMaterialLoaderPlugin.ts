import type * as THREE from 'three';
import type { GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader';
import { MToonMaterialLoaderPlugin } from '../MToonMaterialLoaderPlugin';
import { MToonNodeMaterial } from './MToonNodeMaterial';
import type { MToonNodeMaterialLoaderPluginOptions } from './MToonNodeMaterialLoaderPluginOptions';

/**
 * A loader plugin of {@link GLTFLoader} for the extension `VRMC_materials_mtoon`.
 *
 * This plugin is for uses with WebGPURenderer.
 * To use MToon in WebGLRenderer, use {@link MToonMaterialLoaderPlugin} instead.
 *
 * @example Usage with VRMLoaderPlugin
 *
 * ```js
 * import { VRMLoaderPlugin, MToonNodeMaterialLoaderPlugin } from '@pixiv/three-vrm';
 *
 * // ...
 *
 * // Register a VRMLoaderPlugin
 * loader.register((parser) => {
 *
 *   // create a WebGPU compatible MToon loader plugin
 *   const mtoonMaterialPlugin = new MToonNodeMaterialLoaderPlugin(parser);
 *
 *   return new VRMLoaderPlugin(parser, {
 *
 *     // Specify the MToon loader plugin to use in the VRMLoaderPlugin instance
 *     mtoonMaterialPlugin,
 *
 *   });
 *
 * });
 * ```
 */
export class MToonNodeMaterialLoaderPlugin extends MToonMaterialLoaderPlugin {
  public constructor(parser: GLTFParser, options: MToonNodeMaterialLoaderPluginOptions = {}) {
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
