import type { MToonMaterial } from './MToonMaterial';
import type { MToonMaterialDebugMode } from './MToonMaterialDebugMode';
import type { MToonMaterialOutlineColorMode } from './MToonMaterialOutlineColorMode';
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
  normalScale?: number;
  emissive?: THREE.Color;
  emissiveMap?: THREE.Texture;
  shadeFactor?: THREE.Color;
  shadeMultiplyTexture?: THREE.Texture;
  shadingShiftFactor?: number;
  shadingShiftTexture?: THREE.Texture;
  shadingShiftTextureScale?: number;
  shadingToonyFactor?: number;
  lightColorAttenuationFactor?: number;
  giIntensityFactor?: number;
  additiveTexture?: THREE.Texture;
  rimFactor?: THREE.Color;
  rimMultiplyTexture?: THREE.Texture;
  rimLightingMixFactor?: number;
  rimFresnelPowerFactor?: number;
  rimLiftFactor?: number;
  outlineWidthMode?: MToonMaterialOutlineWidthMode;
  outlineWidthFactor?: number;
  outlineWidthMultiplyTexture?: THREE.Texture;
  outlineScaledMaxDistanceFactor?: number;
  outlineColorMode?: MToonMaterialOutlineColorMode;
  outlineFactor?: THREE.Color;
  outlineLightingMixFactor?: number;
  uvAnimationMaskTexture?: THREE.Texture;
  uvAnimationScrollXSpeedFactor?: number;
  uvAnimationScrollYSpeedFactor?: number;
  uvAnimationRotationSpeedFactor?: number;

  debugMode?: MToonMaterialDebugMode | number;

  /**
   * The material will call this in its constructor.
   * See {@link VRMCMaterialsMToonExtensionPlugin.setMToonMaterial} for more details.
   */
  onLoadMaterial?: (material: MToonMaterial) => void;

  /**
   * It will draw its outline instead when it's `true`.
   */
  isOutline?: boolean;
}
