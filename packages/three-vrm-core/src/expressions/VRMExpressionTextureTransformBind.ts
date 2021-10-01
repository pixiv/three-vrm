import * as THREE from 'three';
import type { VRMExpressionBind } from './VRMExpressionBind';

const _v2 = new THREE.Vector2();

/**
 * A bind of expression influences to texture transforms.
 */
export class VRMExpressionTextureTransformBind implements VRMExpressionBind {
  private static _propertyNamesMap: { [distinguisher: string]: string[] } = {
    isMeshStandardMaterial: [
      'map',
      'emissiveMap',
      'bumpMap',
      'normalMap',
      'displacementMap',
      'roughnessMap',
      'metalnessMap',
      'alphaMap',
    ],
    isMeshBasicMaterial: ['map', 'specularMap', 'alphaMap'],
    isMToonMaterial: [
      'map',
      'normalMap',
      'emissiveMap',
      'shadeMultiplyTexture',
      'rimMultiplyTexture',
      'outlineWidthMultiplyTexture',
      'uvAnimationMaskTexture',
    ],
  };

  /**
   * The target material.
   */
  public readonly material: THREE.Material;

  /**
   * The uv scale of the texture.
   */
  public readonly scale: THREE.Vector2;

  /**
   * The uv offset of the texture.
   */
  public readonly offset: THREE.Vector2;

  /**
   * The list of texture names and its state that should be transformed by this bind.
   */
  private _properties: {
    name: string;
    initialOffset: THREE.Vector2;
    initialScale: THREE.Vector2;
    deltaOffset: THREE.Vector2;
    deltaScale: THREE.Vector2;
  }[];

  public constructor({
    material,
    scale,
    offset,
  }: {
    /**
     * The target material.
     */
    material: THREE.Material;

    /**
     * The uv scale of the texture.
     */
    scale: THREE.Vector2;

    /**
     * The uv offset of the texture.
     */
    offset: THREE.Vector2;
  }) {
    this.material = material;
    this.scale = scale;
    this.offset = offset;

    const propertyNames = Object.entries(VRMExpressionTextureTransformBind._propertyNamesMap).find(
      ([distinguisher]) => {
        return (material as any)[distinguisher] === true;
      },
    )?.[1];

    if (propertyNames == null) {
      console.warn(
        `Tried to add a texture transform bind to the material ${
          material.name ?? '(no name)'
        } but the material is not supported.`,
      );

      this._properties = [];
    } else {
      this._properties = [];

      propertyNames.forEach((propertyName) => {
        const texture = ((material as any)[propertyName] as THREE.Texture | undefined)?.clone();
        if (!texture) {
          return null;
        }

        (material as any)[propertyName] = texture; // because the texture is cloned

        const initialOffset = texture.offset.clone();
        const initialScale = texture.repeat.clone();
        const deltaOffset = offset.clone().sub(initialOffset);
        const deltaScale = scale.clone().sub(initialScale);

        this._properties.push({
          name: propertyName,
          initialOffset,
          deltaOffset,
          initialScale,
          deltaScale,
        });
      });
    }
  }

  public applyWeight(weight: number): void {
    this._properties.forEach((property) => {
      const target = (this.material as any)[property.name] as THREE.Texture;
      if (target === undefined) {
        return;
      } // TODO: we should kick this at `addMaterialValue`

      target.offset.add(_v2.copy(property.deltaOffset).multiplyScalar(weight));
      target.repeat.add(_v2.copy(property.deltaScale).multiplyScalar(weight));

      target.needsUpdate = true;
    });
  }

  public clearAppliedWeight(): void {
    this._properties.forEach((property) => {
      const target = (this.material as any)[property.name] as THREE.Texture;
      if (target === undefined) {
        return;
      } // TODO: we should kick this at `addMaterialValue`

      target.offset.copy(property.initialOffset);
      target.repeat.copy(property.initialScale);

      target.needsUpdate = true;
    });
  }
}
