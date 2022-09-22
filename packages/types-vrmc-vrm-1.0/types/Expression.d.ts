import type { ExpressionMaterialColorBind } from './ExpressionMaterialColorBind';
import type { ExpressionMorphTargetBind } from './ExpressionMorphTargetBind';
import type { ExpressionOverrideType } from './ExpressionOverrideType';
import type { ExpressionPresetName } from './ExpressionPresetName';
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
     * A value greater than 0.5 is 1.0, otherwise 0.0
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
        [name: string]: any;
    };
    extras?: any;
}
