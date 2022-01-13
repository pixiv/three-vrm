import type { Expression } from './Expression';
import type { ExpressionPresetName } from './ExpressionPresetName';
export interface Expressions {
    preset?: {
        [preset in ExpressionPresetName]?: Expression;
    };
    custom?: {
        [key: string]: Expression;
    };
}
