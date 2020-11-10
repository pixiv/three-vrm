import type { ExpressionMaterialColorType } from './ExpressionMaterialColorType';

export interface ExpressionMaterialColorBind {
  /**
   * target material
   */
  material?: number;

  type?: ExpressionMaterialColorType;

  /**
   * target color
   */
  targetValue?: number;
}
