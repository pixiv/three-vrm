import * as THREE from 'three';
import type { VRMExpressionBind } from './VRMExpressionBind';
import type { VRMExpressionMaterialColorType } from './VRMExpressionMaterialColorType';
/**
 * A bind of expression influences to a material color.
 */
export declare class VRMExpressionMaterialColorBind implements VRMExpressionBind {
    /**
     * Mapping of property names from VRMC/materialColorBinds.type to three.js/Material.
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
     * Its state.
     * If it cannot find the target property in constructor, it will be null instead.
     */
    private _state;
    constructor({ material, type, targetValue, }: {
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
    });
    applyWeight(weight: number): void;
    clearAppliedWeight(): void;
}
