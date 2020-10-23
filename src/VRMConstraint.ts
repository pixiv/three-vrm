import * as THREE from 'three';
import { Matrix4InverseCache } from './utils/Matrix4InverseCache';
import { VRMConstraintSpace } from './VRMConstraintSpace';

const _matWorldToModel = new THREE.Matrix4();

export abstract class VRMConstraint {
  public weight = 1.0;

  public readonly object: THREE.Object3D;

  /**
   * When {@link sourceSpace} / {@link destinationSpace} is {@link VRMConstraintSpace.Local}, these transforms will be cauculated relatively from this object.
   */
  public readonly modelRoot: THREE.Object3D;

  protected _source?: THREE.Object3D | null;
  public get source(): THREE.Object3D | null | undefined {
    return this._source;
  }

  public sourceSpace = VRMConstraintSpace.Model;
  public destinationSpace = VRMConstraintSpace.Model;

  public get dependencies(): Set<THREE.Object3D> {
    const deps = new Set<THREE.Object3D>();
    this._source && deps.add(this._source);
    if (this.destinationSpace === VRMConstraintSpace.Model && this.object.parent) {
      deps.add(this.object.parent);
    }
    return deps;
  }

  /**
   * @param object The destination object
   * @param modelRoot When {@link sourceSpace} / {@link destinationSpace} is {@link VRMConstraintSpace.Local}, these transforms will be cauculated relatively from this object
   */
  public constructor(object: THREE.Object3D, modelRoot: THREE.Object3D) {
    this.object = object;
    object.matrixAutoUpdate = false;

    this.modelRoot = modelRoot;
  }

  public setSource(source: THREE.Object3D | null): void {
    this._source = source;
  }

  /**
   * Get the inverse of object matrix of the parent, in model space.
   * @param target Target matrix
   */
  protected _getInverseParentMatrixInModelSpace(target: THREE.Matrix4): THREE.Matrix4 {
    if (!this.object.parent) {
      target.identity();
    } else {
      this.object.parent.updateWorldMatrix(false, false);
      target.copy(this.object.parent.matrixWorld);
      target.getInverse(target);

      target.multiply(this.modelRoot.matrixWorld);
    }

    return target;
  }

  /**
   * Get the object matrix of the object, taking desired object space into account.
   * Intended to be used to absorb between different spaces.
   * @param target Target matrix
   */
  protected _getDestinationMatrix(target: THREE.Matrix4): THREE.Matrix4 {
    if (this.destinationSpace === VRMConstraintSpace.Local) {
      this.object.updateMatrix();
      target.copy(this.object.matrix);
    } else if (this.destinationSpace === VRMConstraintSpace.Model) {
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
  protected _getSourceMatrix(target: THREE.Matrix4): THREE.Matrix4 {
    if (!this._source) {
      throw new Error('There is no source specified');
    }

    if (this.sourceSpace === VRMConstraintSpace.Local) {
      this._source.updateMatrix();
      target.copy(this._source.matrix);
    } else if (this.sourceSpace === VRMConstraintSpace.Model) {
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
  private _getMatrixWorldToModel(target: THREE.Matrix4): THREE.Matrix4 {
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
