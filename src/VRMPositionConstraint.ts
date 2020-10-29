import * as THREE from 'three';
import { VRMConstraint } from './VRMConstraint';
import { VRMConstraintSpace } from './VRMConstraintSpace';

const _v3A = new THREE.Vector3();
const _matA = new THREE.Matrix4();

export class VRMPositionConstraint extends VRMConstraint {
  private _initPosition = new THREE.Vector3();

  public setInitState(): void {
    this.object.updateMatrix();

    this._getDestinationMatrix(_matA);
    this._initPosition.setFromMatrixPosition(_matA);
    this._getWeightedSource(_v3A);
    this._initPosition.sub(_v3A);
  }

  public update(): void {
    this._getWeightedSource(this.object.position);
    this.object.position.add(this._initPosition);

    if (this.destinationSpace === VRMConstraintSpace.Model) {
      this._getParentMatrixInModelSpace(_matA).getInverse(_matA);
      this.object.position.applyMatrix4(_matA);
    }

    this.object.updateMatrix();
  }

  private _getWeightedSource(target: THREE.Vector3): THREE.Vector3 {
    target.set(0.0, 0.0, 0.0);

    if (this._source) {
      this._getSourceMatrix(_matA);
      target.setFromMatrixPosition(_matA);
    }

    target.multiplyScalar(this.weight);

    return target;
  }
}
