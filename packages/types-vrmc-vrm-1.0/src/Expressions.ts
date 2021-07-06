import type { Expression } from './Expression';
import type { ExpressionPreset } from './ExpressionPreset';

export interface Expressions {
  preset?: {
    [preset in ExpressionPreset]?: Expression;
  };
  custom?: {
    [key: string]: Expression;
  };
}
