import { ExpressionMaterialColorType } from './ExpressionMaterialColorType';
export interface ExpressionMaterialColorBind {
    /**
     * target material
     */
    material: number;
    type: ExpressionMaterialColorType;
    /**
     * target color
     */
    targetValue: [
        number,
        number,
        number,
        number
    ];
    extensions?: {
        [key: string]: {
            [key: string]: any;
        };
    };
    extras?: any;
}
