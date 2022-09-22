import type * as THREE from 'three';
import type { VRMExpressionBind } from './VRMExpressionBind';
/**
 * A bind of {@link VRMExpression} influences to morph targets.
 */
export declare class VRMExpressionMorphTargetBind implements VRMExpressionBind {
    /**
     * The mesh primitives that attached to target mesh.
     */
    readonly primitives: THREE.Mesh[];
    /**
     * The index of the morph target in the mesh.
     */
    readonly index: number;
    /**
     * The weight value of target morph target. Ranging in [0.0 - 1.0].
     */
    readonly weight: number;
    constructor({ primitives, index, weight, }: {
        /**
         * The mesh primitives that attached to target mesh.
         */
        primitives: THREE.Mesh[];
        /**
         * The index of the morph target in the mesh.
         */
        index: number;
        /**
         * The weight value of target morph target. Ranging in [0.0 - 1.0].
         */
        weight: number;
    });
    applyWeight(weight: number): void;
    clearAppliedWeight(): void;
}
