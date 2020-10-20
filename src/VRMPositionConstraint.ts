import * as THREE from 'three';
import { VRMConstraint } from './VRMConstraint';

const _v3A = new THREE.Vector3();

export class VRMPositionConstraint extends VRMConstraint {
  private _initPosition = new THREE.Vector3();

  public setInitState(): void {
    this._initPosition.copy(this._object.position);
    this._getWeightedSource(_v3A);
    this._initPosition.sub(_v3A);
  }

  public update(): void {
    this._object.position.copy(this._initPosition);
    this._getWeightedSource(_v3A);
    this._object.position.add(_v3A);

    this._object.updateMatrixWorld();
  }

  private _getWeightedSource(target: THREE.Vector3): THREE.Vector3 {
    target.set(0.0, 0.0, 0.0);

    if (this._source) {
      this._source.updateMatrixWorld();
      target.setFromMatrixPosition(this._source.matrixWorld);
    }

    target.multiplyScalar(this.weight);

    return target;
  }
}
