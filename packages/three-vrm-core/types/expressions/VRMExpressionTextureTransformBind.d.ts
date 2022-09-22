import * as THREE from 'three';
import type { VRMExpressionBind } from './VRMExpressionBind';
/**
 * A bind of expression influences to texture transforms.
 */
export declare class VRMExpressionTextureTransformBind implements VRMExpressionBind {
    private static _propertyNamesMap;
    /**
     * The target material.
     */
    readonly material: THREE.Material;
    /**
     * The uv scale of the texture.
     */
    readonly scale: THREE.Vector2;
    /**
     * The uv offset of the texture.
     */
    readonly offset: THREE.Vector2;
    /**
     * The list of texture names and its state that should be transformed by this bind.
     */
    private _properties;
    constructor({ material, scale, offset, }: {
        /**
         * The target material.
         */
        material: THREE.Material;
        /**
         * The uv scale of the texture.
         */
        scale: THREE.Vector2;
        /**
         * The uv offset of the texture.
         */
        offset: THREE.Vector2;
    });
    applyWeight(weight: number): void;
    clearAppliedWeight(): void;
}
