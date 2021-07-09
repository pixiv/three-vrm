import * as THREE from 'three';
import { decomposeRotation } from './utils/decomposeRotation';
import { quaternionFreezeAxes } from './utils/quaternionFreezeAxes';
import { quatInvertCompat } from './utils/quatInvertCompat';
import { VRMConstraint } from './VRMConstraint';

const QUAT_IDENTITY = new THREE.Quaternion(0, 0, 0, 1);

const _matA = new THREE.Matrix4();
const _quatA = new THREE.Quaternion();
const _quatB = new THREE.Quaternion();

export class VRMRotationConstraint extends VRMConstraint {
  public freezeAxes: [boolean, boolean, boolean] = [true, true, true];

  private _quatInitSrc = new THREE.Quaternion();
  private _quatInvInitSrc = new THREE.Quaternion();
  private _quatInitDst = new THREE.Quaternion();

  public setInitState(): void {
    this._quatInitDst.copy(this.object.quaternion);

    this._getSourceQuat(this._quatInitSrc);
    quatInvertCompat(this._quatInvInitSrc.copy(this._quatInitSrc));
  }

  public update(): void {
    if (this.destinationSpace === 'local') {
      this.object.quaternion.copy(this._quatInitDst);
    } else {
      this._getParentMatrixInModelSpace(_matA);
      decomposeRotation(_matA, _quatA);
      quatInvertCompat(this.object.quaternion.copy(_quatA));
    }

    this._getSourceDiffQuat(_quatB);
    this.object.quaternion.multiply(_quatB);

    if (this.destinationSpace === 'model') {
      this.object.quaternion.multiply(_quatA);
      this.object.quaternion.multiply(this._quatInitDst);
    }

    this.object.updateMatrix();
  }

  /**
   * Return a quaternion that represents a diff from the initial -> current orientation of the source.
   * It's aware of its {@link sourceSpace}, {@link freezeAxes}, and {@link weight}.
   * @param target Target quaternion
   */
  private _getSourceDiffQuat<T extends THREE.Quaternion>(target: T): T {
    this._getSourceQuat(target);
    if (this.sourceSpace === 'local') {
      target.premultiply(this._quatInvInitSrc);
    } else {
      target.multiply(this._quatInvInitSrc);
    }

    quaternionFreezeAxes(target, this.freezeAxes);

    target.slerp(QUAT_IDENTITY, 1.0 - this.weight);

    return target;
  }

  /**
   * Return the current orientation of the source.
   * It's aware of its {@link sourceSpace}.
   * @param target Target quaternion
   */
  private _getSourceQuat<T extends THREE.Quaternion>(target: T): T {
    target.copy(QUAT_IDENTITY);

    if (this._source) {
      this._getSourceMatrix(_matA);
      decomposeRotation(_matA, target);
    }

    return target;
  }
}
