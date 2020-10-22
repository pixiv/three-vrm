import * as THREE from 'three';
import { VRMConstraint } from './VRMConstraint';

const QUAT_IDENTITY = new THREE.Quaternion(0, 0, 0, 1);

const _matA = new THREE.Matrix4();
const _quatA = new THREE.Quaternion();

export class VRMRotationConstraint extends VRMConstraint {
  private _initQuaternion = new THREE.Quaternion();

  public setInitState(): void {
    this._initQuaternion.copy(this.object.quaternion);

    this._getWeightedSource(_quatA);
    _quatA.inverse();
    this._initQuaternion.multiply(_quatA);
  }

  public update(): void {
    this.object.quaternion.set(0.0, 0.0, 0.0, 1.0);

    this._getWeightedSource(_quatA);
    this.object.quaternion.multiply(_quatA);

    this.object.quaternion.multiply(this._initQuaternion);

    this.object.updateMatrixWorld();
  }

  private _getWeightedSource(target: THREE.Quaternion): THREE.Quaternion {
    target.set(0.0, 0.0, 0.0, 0.0);

    if (this._source) {
      this._getSourceMatrix(_matA);
      target.setFromRotationMatrix(_matA);
    }

    target.slerp(QUAT_IDENTITY, 1.0 - this.weight);

    return target;
  }
}
