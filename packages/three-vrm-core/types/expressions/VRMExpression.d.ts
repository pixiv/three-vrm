import * as THREE from 'three';
import { VRMExpressionBind } from './VRMExpressionBind';
import type { VRMExpressionOverrideType } from './VRMExpressionOverrideType';
export declare class VRMExpression extends THREE.Object3D {
    /**
     * Name of this expression.
     * Distinguished with `name` since `name` will be conflicted with Object3D.
     */
    expressionName: string;
    /**
     * The current weight of the expression.
     */
    weight: number;
    /**
     * Interpret values greater than 0.5 as 1.0, ortherwise 0.0.
     */
    isBinary: boolean;
    /**
     * Specify how the expression overrides blink expressions.
     */
    overrideBlink: VRMExpressionOverrideType;
    /**
     * Specify how the expression overrides lookAt expressions.
     */
    overrideLookAt: VRMExpressionOverrideType;
    /**
     * Specify how the expression overrides mouth expressions.
     */
    overrideMouth: VRMExpressionOverrideType;
    private _binds;
    readonly type: string | 'VRMExpression';
    /**
     * A value represents how much it should override blink expressions.
     * `0.0` == no override at all, `1.0` == completely block the expressions.
     */
    get overrideBlinkAmount(): number;
    /**
     * A value represents how much it should override lookAt expressions.
     * `0.0` == no override at all, `1.0` == completely block the expressions.
     */
    get overrideLookAtAmount(): number;
    /**
     * A value represents how much it should override mouth expressions.
     * `0.0` == no override at all, `1.0` == completely block the expressions.
     */
    get overrideMouthAmount(): number;
    constructor(expressionName: string);
    addBind(bind: VRMExpressionBind): void;
    /**
     * Apply weight to every assigned blend shapes.
     * Should be called every frame.
     */
    applyWeight(options?: {
        /**
         * Multiplies a value to its weight to apply.
         * Intended to be used for overriding an expression weight by another expression.
         * See also: {@link overrideBlink}, {@link overrideLookAt}, {@link overrideMouth}
         */
        multiplier?: number;
    }): void;
    /**
     * Clear previously assigned blend shapes.
     */
    clearAppliedWeight(): void;
}
