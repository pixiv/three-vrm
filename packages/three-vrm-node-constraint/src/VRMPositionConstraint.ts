import * as THREE from 'three';
import { decomposePosition } from './utils/decomposePosition';
import { mat4InvertCompat } from './utils/mat4InvertCompat';
import { vector3FreezeAxes } from './utils/vector3FreezeAxes';
import { VRMNodeConstraint } from './VRMConstraint';

const _matA = new THREE.Matrix4();

export class VRMPositionConstraint extends VRMNodeConstraint {
  public freezeAxes: [boolean, boolean, boolean] = [true, true, true];

  private _v3InitDst = new THREE.Vector3();
  private _v3InitSrc = new THREE.Vector3();

  public setInitState(): void {
    this._v3InitDst.copy(this.object.position);

    this._getSourcePosition(this._v3InitSrc);
  }

  public update(): void {
    this._getSourceDiffPosition(this.object.position);

    if (this.destinationSpace === 'model') {
      mat4InvertCompat(this._getParentMatrixInModelSpace(_matA));

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
   * It's aware of its {@link sourceSpace}, {@link freezeAxes}, and {@link weight}.
   * @param target Target quaternion
   */
  private _getSourceDiffPosition<T extends THREE.Vector3>(target: T): T {
    this._getSourcePosition(target);
    target.sub(this._v3InitSrc);

    vector3FreezeAxes(target, this.freezeAxes);

    target.multiplyScalar(this.weight);

    return target;
  }

  /**
   * Return the current position of the source.
   * It's aware of its {@link sourceSpace}.
   * @param target Target quaternion
   */
  private _getSourcePosition<T extends THREE.Vector3>(target: T): T {
    target.set(0.0, 0.0, 0.0);

    if (this._source) {
      this._getSourceMatrix(_matA);
      decomposePosition(_matA, target);
    }

    return target;
  }
}
