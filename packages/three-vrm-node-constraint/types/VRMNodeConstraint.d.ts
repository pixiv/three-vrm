import * as THREE from 'three';
export declare abstract class VRMNodeConstraint {
    weight: number;
    readonly object: THREE.Object3D;
    /**
     * When {@link sourceSpace} / {@link destinationSpace} is model space, these transforms will be cauculated relatively from this object.
     */
    readonly modelRoot: THREE.Object3D;
    protected _source?: THREE.Object3D | null;
    get source(): THREE.Object3D | null | undefined;
    sourceSpace: string;
    destinationSpace: string;
    get dependencies(): Set<THREE.Object3D>;
    /**
     * @param object The destination object
     * @param modelRoot When {@link sourceSpace} / {@link destinationSpace} is model space, these transforms will be cauculated relatively from this object
     */
    constructor(object: THREE.Object3D, modelRoot: THREE.Object3D);
    setSource(source: THREE.Object3D | null): void;
    /**
     * Get the object matrix of the parent, in model space.
     * @param target Target matrix
     */
    protected _getParentMatrixInModelSpace<T extends THREE.Matrix4>(target: T): T;
    /**
     * Get the object matrix of the object, taking desired object space into account.
     * Intended to be used to absorb between different spaces.
     * @param target Target matrix
     */
    protected _getDestinationMatrix<T extends THREE.Matrix4>(target: T): T;
    /**
     * Get the object matrix of the source, taking desired object space into account.
     * Intended to be used to absorb between different spaces.
     * @param target Target matrix
     */
    protected _getSourceMatrix<T extends THREE.Matrix4>(target: T): T;
    /**
     * Create a matrix that converts world space into model space.
     * @param target Target matrix
     */
    private _getMatrixWorldToModel;
    abstract setInitState(): void;
    abstract update(): void;
}
