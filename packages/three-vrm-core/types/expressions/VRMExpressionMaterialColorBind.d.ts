import * as THREE from 'three';
import type { VRMExpressionBind } from './VRMExpressionBind';
import type { VRMExpressionMaterialColorType } from './VRMExpressionMaterialColorType';
/**
 * A bind of expression influences to a material color.
 */
export declare class VRMExpressionMaterialColorBind implements VRMExpressionBind {
    /**
     * Mapping of property names from VRMC/materialColorBinds.type to three.js/Material.
     * The first element stands for color channels, the second element stands for the alpha channel.
     * The second element can be null if the target property doesn't exist.
     */
    private static _propertyNameMapMap;
    /**
     * The target material.
     */
    readonly material: THREE.Material;
    /**
     * The type of the target property of the material.
     */
    readonly type: VRMExpressionMaterialColorType;
    /**
     * The target color.
     */
    readonly targetValue: THREE.Color;
    /**
     * The target alpha.
     */
    readonly targetAlpha: number;
    /**
     * Its binding state.
     * If it cannot find the target property in the constructor, each property will be null instead.
     */
    private _state;
    constructor({ material, type, targetValue, targetAlpha, }: {
        /**
         * The target material.
         */
        material: THREE.Material;
        /**
         * The type of the target property of the material.
         */
        type: VRMExpressionMaterialColorType;
        /**
         * The target color.
         */
        targetValue: THREE.Color;
        /**
         * The target alpha.
         */
        targetAlpha?: number;
    });
    applyWeight(weight: number): void;
    clearAppliedWeight(): void;
    private _initColorBindState;
    private _initAlphaBindState;
    private _getPropertyNameMap;
}
