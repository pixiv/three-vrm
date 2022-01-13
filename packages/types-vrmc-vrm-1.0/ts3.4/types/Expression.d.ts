import { ExpressionMaterialColorBind } from './ExpressionMaterialColorBind';
import { ExpressionMorphTargetBind } from './ExpressionMorphTargetBind';
import { ExpressionOverrideType } from './ExpressionOverrideType';
import { ExpressionPresetName } from './ExpressionPresetName';
import { ExpressionTextureTransformBind } from './ExpressionTextureTransformBind';
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
    preset: ExpressionPresetName;
    /**
     * Specify a morph target
     */
    morphTargetBinds?: ExpressionMorphTargetBind[];
    /**
     * Material color animation references
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
     * Override values of Blink expressions when this Expression is enabled
     */
    overrideBlink?: ExpressionOverrideType;
    /**
     * Override values of LookAt expressions when this Expression is enabled
     */
    overrideLookAt?: ExpressionOverrideType;
    /**
     * Override values of Mouth expressions when this Expression is enabled
     */
    overrideMouth?: ExpressionOverrideType;
    extensions?: {
        [key: string]: {
            [key: string]: any;
        };
    };
    extras?: any;
}
