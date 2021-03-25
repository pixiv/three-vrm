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
  shadeMultiplyTexture?: {
    index: number;
    texCoord?: number;

    extensions?: { [name: string]: any };
    extras?: any;
  };

  /**
   * Lighting
   */
  shadingShiftFactor?: number;

  shadingShiftTexture?: {
    index: number;
    texCoord?: number;
    scale?: number;

    extensions?: { [name: string]: any };
    extras?: any;
  };

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
  additiveTexture?: {
    index: number;

    extensions?: { [name: string]: any };
    extras?: any;
  };

  /**
   * Rim
   */
  rimFactor?: number[];

  /**
   *
   */
  rimMultiplyTexture?: {
    index: number;
    texCoord?: number;

    extensions?: { [name: string]: any };
    extras?: any;
  };

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
  outlineWidthMultiplyTexture?: {
    index: number;
    texCoord?: number;

    extensions?: { [name: string]: any };
    extras?: any;
  };

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
  uvAnimationMaskTexture?: {
    index: number;
    texCoord?: number;

    extensions?: { [name: string]: any };
    extras?: any;
  };

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
