import type { Expression } from './Expression';
import type { ExpressionPresetName } from '@pixiv/types-vrmc-vrm-1.0';

/**
 * An object which maps expressions to nodes.
 */
export interface Expressions {
  /**
   * An object that contains definitions of preset expressions.
   */
  preset?: {
    [preset in ExpressionPresetName]?: Expression;
  };

  /**
   * An object that contains definitions of custom expressions.
   */
  custom?: {
    [key: string]: Expression;
  };
}
