import { Expression } from './Expression';
import { ExpressionPresetName } from './ExpressionPresetName';
export interface Expressions {
    preset?: {
        [preset in ExpressionPresetName]?: Expression;
    };
    custom?: {
        [key: string]: Expression;
    };
}
