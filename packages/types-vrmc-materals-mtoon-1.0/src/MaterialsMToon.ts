import type { MaterialsMToonOutlineColorMode } from './MaterialsMToonOutlineColorMode';
import type { MaterialsMToonOutlineWidthMode } from './MaterialsMToonOutlineWidthMode';

export interface MaterialsMToon {
  /**
   * Meta
   */
  version?: string;

  /**
   * enable depth buffer when renderMode is transparent
   */
  transparentWithZWrite?: boolean;

  /**
   *
   */
  renderQueueOffsetNumber?: number;

  /**
   *
   */
  shadeFactor?: number[];

  /**
   *
   */
  shadeMultiplyTexture?: number;

  /**
   * Lighting
   */
  shadingShiftFactor?: number;

  /**
   *
   */
  shadingToonyFactor?: number;

  /**
   *
   */
  lightColorAttenuationFactor?: number;

  /**
   *
   */
  giIntensityFactor?: number;

  /**
   * MatCap
   */
  additiveTexture?: number;

  /**
   * Rim
   */
  rimFactor?: number[];

  /**
   *
   */
  rimMultiplyTexture?: number;

  /**
   *
   */
  rimLightingMixFactor?: number;

  /**
   *
   */
  rimFresnelPowerFactor?: number;

  /**
   *
   */
  rimLiftFactor?: number;

  /**
   * Outline
   */
  outlineWidthMode?: MaterialsMToonOutlineWidthMode;

  /**
   *
   */
  outlineWidthFactor?: number;

  /**
   *
   */
  outlineWidthMultiplyTexture?: number;

  /**
   *
   */
  outlineScaledMaxDistanceFactor?: number;

  /**
   *
   */
  outlineColorMode?: MaterialsMToonOutlineColorMode;

  /**
   *
   */
  outlineFactor?: number[];

  /**
   *
   */
  outlineLightingMixFactor?: number;

  /**
   *
   */
  uvAnimationMaskTexture?: number;

  /**
   *
   */
  uvAnimationScrollXSpeedFactor?: number;

  /**
   *
   */
  uvAnimationScrollYSpeedFactor?: number;

  /**
   *
   */
  uvAnimationRotationSpeedFactor?: number;
}
