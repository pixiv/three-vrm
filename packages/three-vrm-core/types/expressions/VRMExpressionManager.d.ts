import { VRMExpressionPresetName } from './VRMExpressionPresetName';
import type { VRMExpression } from './VRMExpression';
export declare class VRMExpressionManager {
    /**
     * A set of name or preset name of expressions that will be overridden by {@link VRMExpression.overrideBlink}.
     */
    blinkExpressionNames: string[];
    /**
     * A set of name or preset name of expressions that will be overridden by {@link VRMExpression.overrideLookAt}.
     */
    lookAtExpressionNames: string[];
    /**
     * A set of name or preset name of expressions that will be overridden by {@link VRMExpression.overrideMouth}.
     */
    mouthExpressionNames: string[];
    /**
     * A set of {@link VRMExpression}.
     * When you want to register expressions, use {@link registerExpression}
     */
    private _expressions;
    get expressions(): VRMExpression[];
    /**
     * A map from name to expression.
     */
    private _expressionMap;
    get expressionMap(): {
        [name: string]: VRMExpression;
    };
    /**
     * A map from name to expression, but excluding custom expressions.
     */
    get presetExpressionMap(): {
        [name in VRMExpressionPresetName]?: VRMExpression;
    };
    /**
     * A map from name to expression, but excluding preset expressions.
     */
    get customExpressionMap(): {
        [name: string]: VRMExpression;
    };
    /**
     * Create a new {@link VRMExpressionManager}.
     */
    constructor();
    /**
     * Copy the given {@link VRMExpressionManager} into this one.
     * @param source The {@link VRMExpressionManager} you want to copy
     * @returns this
     */
    copy(source: VRMExpressionManager): this;
    /**
     * Returns a clone of this {@link VRMExpressionManager}.
     * @returns Copied {@link VRMExpressionManager}
     */
    clone(): VRMExpressionManager;
    /**
     * Return a registered expression.
     * If it cannot find an expression, it will return `null` instead.
     *
     * @param name Name or preset name of the expression
     */
    getExpression(name: VRMExpressionPresetName | string): VRMExpression | null;
    /**
     * Register an expression.
     *
     * @param expression {@link VRMExpression} that describes the expression
     */
    registerExpression(expression: VRMExpression): void;
    /**
     * Unregister an expression.
     *
     * @param expression The expression you want to unregister
     */
    unregisterExpression(expression: VRMExpression): void;
    /**
     * Get the current weight of the specified expression.
     * If it doesn't have an expression of given name, it will return `null` instead.
     *
     * @param name Name of the expression
     */
    getValue(name: VRMExpressionPresetName | string): number | null;
    /**
     * Set a weight to the specified expression.
     *
     * @param name Name of the expression
     * @param weight Weight
     */
    setValue(name: VRMExpressionPresetName | string, weight: number): void;
    /**
     * Get a track name of specified expression.
     * This track name is needed to manipulate its expression via keyframe animations.
     *
     * @example Manipulate an expression using keyframe animation
     * ```js
     * const trackName = vrm.expressionManager.getExpressionTrackName( 'blink' );
     * const track = new THREE.NumberKeyframeTrack(
     *   name,
     *   [ 0.0, 0.5, 1.0 ], // times
     *   [ 0.0, 1.0, 0.0 ] // values
     * );
     *
     * const clip = new THREE.AnimationClip(
     *   'blink', // name
     *   1.0, // duration
     *   [ track ] // tracks
     * );
     *
     * const mixer = new THREE.AnimationMixer( vrm.scene );
     * const action = mixer.clipAction( clip );
     * action.play();
     * ```
     *
     * @param name Name of the expression
     */
    getExpressionTrackName(name: VRMExpressionPresetName | string): string | null;
    /**
     * Update every expressions.
     */
    update(): void;
    /**
     * Calculate sum of override amounts to see how much we should multiply weights of certain expressions.
     */
    private _calculateWeightMultipliers;
}
