import type { ExpressionMaterialColorBind } from './ExpressionMaterialColorBind';
import type { ExpressionMorphTargetBind } from './ExpressionMorphTargetBind';
import type { ExpressionPreset } from './ExpressionPreset';
import type { ExpressionTextureTransformBind } from './ExpressionTextureTransformBind';

/**
 * Definition of expression by weighted animation
 */
export interface Expression {
  /**
   * Use only if the preset is custom. Unique within the model
   */
  name?: string;

  /**
   * Functions of Expression
   */
  preset?: ExpressionPreset;

  /**
   * Specify a morph target. 'required' :   [  'mesh' ,  'index' ,  'weight'  ]
   */
  morphTargetBinds?: ExpressionMorphTargetBind[];

  /**
   * Material color animation references. 'required' :   [  'material' ,  'type' ,  'targetValue'  ]
   */
  materialColorBinds?: ExpressionMaterialColorBind[];

  /**
   * Texture transform animation references
   */
  textureTransformBinds?: ExpressionTextureTransformBind[];

  /**
   * Interpret non-zero values as 1
   */
  isBinary?: boolean;

  /**
   * Disable Blink when this Expression is enabled
   */
  ignoreBlink?: boolean;

  /**
   * Disable LookAt when this Expression is enabled
   */
  ignoreLookAt?: boolean;

  /**
   * Disable Mouth when this Expression is enabled
   */
  ignoreMouth?: boolean;
}
