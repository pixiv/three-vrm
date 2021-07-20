import type { BlendShapeBind } from './BlendShapeBind';
import type { BlendShapeMaterialbind } from './BlendShapeMaterialBind';
import type { BlendShapePresetName } from './BlendShapePresetName';

export interface BlendShapeGroup {
  /**
   * Expression name
   */
  name?: string;

  /**
   * Predefined Expression name
   */
  presetName?: BlendShapePresetName;

  /**
   * Low level blendshape references.
   */
  binds?: BlendShapeBind[];

  /**
   * Material animation references.
   */
  materialValues?: BlendShapeMaterialbind[];

  /**
   * 0 or 1. Do not allow an intermediate value. Value should rounded
   */
  isBinary?: boolean;
}
