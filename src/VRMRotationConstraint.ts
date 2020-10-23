import * as THREE from 'three';
import { VRMConstraint } from './VRMConstraint';
import { VRMConstraintSpace } from './VRMConstraintSpace';

const QUAT_IDENTITY = new THREE.Quaternion(0, 0, 0, 1);

const _matA = new THREE.Matrix4();
const _quatA = new THREE.Quaternion();

export class VRMRotationConstraint extends VRMConstraint {
  private _initQuaternion = new THREE.Quaternion();

  public setInitState(): void {
    this.object.updateMatrix();

    this._getDestinationMatrix(_matA);
    this._initQuaternion.setFromRotationMatrix(_matA);
    this._getWeightedSource(_quatA);
    _quatA.inverse();
    this._initQuaternion.multiply(_quatA);
  }

  public update(): void {
    this._getWeightedSource(this.object.quaternion);
    this.object.quaternion.multiply(this._initQuaternion);

    if (this.destinationSpace === VRMConstraintSpace.Model) {
      this._getInverseParentMatrixInModelSpace(_matA);
      _quatA.setFromRotationMatrix(_matA);
      this.object.quaternion.multiply(_quatA);
    }

    this.object.updateMatrix();
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
