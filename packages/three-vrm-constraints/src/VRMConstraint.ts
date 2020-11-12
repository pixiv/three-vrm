import * as THREE from 'three';
import { Matrix4InverseCache } from './utils/Matrix4InverseCache';

const _matWorldToModel = new THREE.Matrix4();

export abstract class VRMConstraint {
  public weight = 1.0;

  public readonly object: THREE.Object3D;

  /**
   * When {@link sourceSpace} / {@link destinationSpace} is model space, these transforms will be cauculated relatively from this object.
   */
  public readonly modelRoot: THREE.Object3D;

  protected _source?: THREE.Object3D | null;
  public get source(): THREE.Object3D | null | undefined {
    return this._source;
  }

  public sourceSpace = 'model';
  public destinationSpace = 'model';

  public get dependencies(): Set<THREE.Object3D> {
    const deps = new Set<THREE.Object3D>();
    this._source && deps.add(this._source);
    if (this.destinationSpace === 'model' && this.object.parent) {
      deps.add(this.object.parent);
    }
    return deps;
  }

  /**
   * @param object The destination object
   * @param modelRoot When {@link sourceSpace} / {@link destinationSpace} is model space, these transforms will be cauculated relatively from this object
   */
  public constructor(object: THREE.Object3D, modelRoot: THREE.Object3D) {
    this.object = object;

    this.modelRoot = modelRoot;
  }

  public setSource(source: THREE.Object3D | null): void {
    this._source = source;
  }

  /**
   * Get the object matrix of the parent, in model space.
   * @param target Target matrix
   */
  protected _getParentMatrixInModelSpace<T extends THREE.Matrix4>(target: T): T {
    if (!this.object.parent) {
      target.identity();
    } else {
      this.object.parent.updateWorldMatrix(false, false);
      target.copy(this.object.parent.matrixWorld);

      this._getMatrixWorldToModel(_matWorldToModel);
      target.premultiply(_matWorldToModel);
    }

    return target;
  }

  /**
   * Get the object matrix of the object, taking desired object space into account.
   * Intended to be used to absorb between different spaces.
   * @param target Target matrix
   */
  protected _getDestinationMatrix<T extends THREE.Matrix4>(target: T): T {
    if (this.destinationSpace === 'local') {
      this.object.updateMatrix();
      target.copy(this.object.matrix);
    } else if (this.destinationSpace === 'model') {
      this.object.updateWorldMatrix(false, false);
      target.copy(this.object.matrixWorld);

      this._getMatrixWorldToModel(_matWorldToModel);
      target.premultiply(_matWorldToModel);
    }

    return target;
  }

  /**
   * Get the object matrix of the source, taking desired object space into account.
   * Intended to be used to absorb between different spaces.
   * @param target Target matrix
   */
  protected _getSourceMatrix<T extends THREE.Matrix4>(target: T): T {
    if (!this._source) {
      throw new Error('There is no source specified');
    }

    if (this.sourceSpace === 'local') {
      this._source.updateMatrix();
      target.copy(this._source.matrix);
    } else if (this.sourceSpace === 'model') {
      this._source.updateWorldMatrix(false, false);
      target.copy(this._source.matrixWorld);

      this._getMatrixWorldToModel(_matWorldToModel);
      target.premultiply(_matWorldToModel);
    }

    return target;
  }

  /**
   * Create a matrix that converts world space into model space.
   * @param target Target matrix
   */
  private _getMatrixWorldToModel<T extends THREE.Matrix4>(target: T): T {
    let inverseCacheProxy = this.modelRoot.userData.inverseCacheProxy as Matrix4InverseCache | undefined;
    if (!inverseCacheProxy) {
      inverseCacheProxy = this.modelRoot.userData.inverseCacheProxy = new Matrix4InverseCache(this.modelRoot.matrix);
    }

    target.copy(inverseCacheProxy.inverse);
    return target;
  }

  public abstract setInitState(): void;
  public abstract update(): void;
}
