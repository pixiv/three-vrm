import * as THREE from 'three';
export declare class Matrix4InverseCache {
    /**
     * The target matrix.
     */
    readonly matrix: THREE.Matrix4;
    /**
     * A cache of inverse of current matrix.
     */
    private readonly _inverseCache;
    /**
     * A flag that makes it want to recalculate its {@link _inverseCache}.
     * Will be set `true` when `elements` are mutated and be used in `getInverse`.
     */
    private _shouldUpdateInverse;
    /**
     * The original of `matrix.elements`
     */
    private readonly _originalElements;
    /**
     * Inverse of given matrix.
     * Note that it will return its internal private instance.
     * Make sure copying this before mutate this.
     */
    get inverse(): THREE.Matrix4;
    constructor(matrix: THREE.Matrix4);
    revert(): void;
}
