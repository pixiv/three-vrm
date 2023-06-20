import * as THREE from 'three';
import { GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MToonMaterialParameters } from './MToonMaterialParameters';
import { setTextureColorSpace } from './utils/setTextureColorSpace';

/**
 * MaterialParameters hates `undefined`. This helper automatically rejects assign of these `undefined`.
 * It also handles asynchronous process of textures.
 * Make sure await for {@link GLTFMToonMaterialParamsAssignHelper.pending}.
 */
export class GLTFMToonMaterialParamsAssignHelper {
  private readonly _parser: GLTFParser;
  private _materialParams: MToonMaterialParameters;
  private _pendings: Promise<any>[];

  public get pending(): Promise<unknown> {
    return Promise.all(this._pendings);
  }

  public constructor(parser: GLTFParser, materialParams: MToonMaterialParameters) {
    this._parser = parser;
    this._materialParams = materialParams;
    this._pendings = [];
  }

  public assignPrimitive<T extends keyof MToonMaterialParameters>(key: T, value: MToonMaterialParameters[T]): void {
    if (value != null) {
      this._materialParams[key] = value;
    }
  }

  public assignColor<T extends keyof MToonMaterialParameters>(
    key: T,
    value: number[] | undefined,
    convertSRGBToLinear?: boolean,
  ): void {
    if (value != null) {
      this._materialParams[key] = new THREE.Color().fromArray(value);

      if (convertSRGBToLinear) {
        this._materialParams[key].convertSRGBToLinear();
      }
    }
  }

  public async assignTexture<T extends keyof MToonMaterialParameters>(
    key: T,
    texture: { index: number } | undefined,
    isColorTexture: boolean,
  ): Promise<void> {
    const promise = (async () => {
      if (texture != null) {
        await this._parser.assignTexture(this._materialParams, key, texture);

        if (isColorTexture) {
          setTextureColorSpace(this._materialParams[key], 'srgb');
        }
      }
    })();

    this._pendings.push(promise);

    return promise;
  }

  public async assignTextureByIndex<T extends keyof MToonMaterialParameters>(
    key: T,
    textureIndex: number | undefined,
    isColorTexture: boolean,
  ): Promise<void> {
    return this.assignTexture(key, textureIndex != null ? { index: textureIndex } : undefined, isColorTexture);
  }
}
