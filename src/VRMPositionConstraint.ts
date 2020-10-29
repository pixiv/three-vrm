import * as THREE from 'three';
import { VRMConstraint } from './VRMConstraint';
import { VRMConstraintSpace } from './VRMConstraintSpace';

const _v3A = new THREE.Vector3();
const _quatA = new THREE.Quaternion();
const _matA = new THREE.Matrix4();

export class VRMPositionConstraint extends VRMConstraint {
  private _v3InitDst = new THREE.Vector3();
  private _v3InitSrc = new THREE.Vector3();

  public setInitState(): void {
    this._v3InitDst.copy(this.object.position);

    this._getSourcePosition(this._v3InitSrc);
  }

  public update(): void {
    this._getSourceDiffPosition(this.object.position);

    if (this.destinationSpace === VRMConstraintSpace.Model) {
      this._getParentMatrixInModelSpace(_matA).getInverse(_matA);

      // remove translation
      _matA.elements[12] = 0;
      _matA.elements[13] = 0;
      _matA.elements[14] = 0;

      this.object.position.applyMatrix4(_matA);
    }

    this.object.position.add(this._v3InitDst);

    this.object.updateMatrix();
  }

  /**
   * Return a vector that represents a diff from the initial -> current position of the source.
   * It's aware of its {@link sourceSpace} and its {@link weight}.
   * @param target Target quaternion
   */
  private _getSourceDiffPosition(target: THREE.Vector3): THREE.Vector3 {
    this._getSourcePosition(target);
    target.sub(this._v3InitSrc);

    target.multiplyScalar(this.weight);
    return target;
  }

  /**
   * Return the current position of the source.
   * It's aware of its {@link sourceSpace}.
   * @param target Target quaternion
   */
  private _getSourcePosition(target: THREE.Vector3): THREE.Vector3 {
    target.set(0.0, 0.0, 0.0);

    if (this._source) {
      this._getSourceMatrix(_matA);
      _matA.decompose(target, _quatA, _v3A);
    }

    return target;
  }
}
