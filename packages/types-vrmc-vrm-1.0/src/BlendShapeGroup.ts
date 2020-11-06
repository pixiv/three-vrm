import type { BlendShapeBind } from './BlendShapeBind';
import type { BlendShapeMaterialUVBind } from './BlendShapeMaterialUVBind';
import type { BlendShapeMaterialValue } from './BlendShapeMaterialValue';
import type { BlendShapePresetName } from './BlendShapePresetName';

/**
 * Group morph target & material color & texture offset
 */
export interface BlendShapeGroup {
  name?: string;

  /**
   * Functions of BlendShapeGroup
   */
  preset?: BlendShapePresetName;

  /**
   * Specify a morph target. 'required' :   [  'mesh' ,  'index' ,  'weight'  ]
   */
  binds?: BlendShapeBind[];

  /**
   * Material animation references. 'required' :   [  'material' ,  'type' ,  'targetValue'  ]
   */
  materialValues?: BlendShapeMaterialValue[];

  /**
   * Texture uv animation references
   */
  materialUVBinds?: BlendShapeMaterialUVBind[];

  /**
   * Interpret non-zero values as 1
   */
  isBinary?: boolean;

  /**
   * Disable Blink when this BlendShapeGroup is enabled
   */
  ignoreBlink?: boolean;

  /**
   * Disable LookAt when this BlendShapeGroup is enabled
   */
  ignoreLookAt?: boolean;

  /**
   * Disable Mouth when this BlendShapeGroup is enabled
   */
  ignoreMouth?: boolean;
}
