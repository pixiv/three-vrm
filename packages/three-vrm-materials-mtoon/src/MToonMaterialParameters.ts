import type { MToonMaterial } from './MToonMaterial';
import type { MToonMaterialDebugMode } from './MToonMaterialDebugMode';
import type { MToonMaterialOutlineWidthMode } from './MToonMaterialOutlineWidthMode';

export interface MToonMaterialParameters extends THREE.ShaderMaterialParameters {
  /**
   * Enable depth buffer when renderMode is transparent.
   * Will be processed in the constructor.
   */
  transparentWithZWrite?: boolean;

  color?: THREE.Color;
  map?: THREE.Texture;
  normalMap?: THREE.Texture;
  normalScale?: THREE.Vector2;
  emissive?: THREE.Color;
  emissiveMap?: THREE.Texture;
  shadeColorFactor?: THREE.Color;
  shadeMultiplyTexture?: THREE.Texture;
  shadingShiftFactor?: number;
  shadingShiftTexture?: THREE.Texture;
  shadingShiftTextureScale?: number;
  shadingToonyFactor?: number;
  giIntensityFactor?: number;
  matcapTexture?: THREE.Texture;
  parametricRimColorFactor?: THREE.Color;
  rimMultiplyTexture?: THREE.Texture;
  rimLightingMixFactor?: number;
  parametricRimFresnelPowerFactor?: number;
  parametricRimLiftFactor?: number;
  outlineWidthMode?: MToonMaterialOutlineWidthMode;
  outlineWidthFactor?: number;
  outlineWidthMultiplyTexture?: THREE.Texture;
  outlineColorFactor?: THREE.Color;
  outlineLightingMixFactor?: number;
  uvAnimationMaskTexture?: THREE.Texture;
  uvAnimationScrollXSpeedFactor?: number;
  uvAnimationScrollYSpeedFactor?: number;
  uvAnimationRotationSpeedFactor?: number;

  /**
   * When this is `true`, vertex colors will be ignored.
   * `true` by default.
   */
  ignoreVertexColor?: boolean;

  debugMode?: MToonMaterialDebugMode | number;

  /**
   * The material will call this in its constructor.
   * See {@link MToonMaterialLoaderPlugin.setMToonMaterial} for more details.
   */
  onLoadMaterial?: (material: MToonMaterial) => void;

  /**
   * It will draw its outline instead when it's `true`.
   */
  isOutline?: boolean;
}
