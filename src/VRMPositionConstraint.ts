import * as THREE from 'three';
import { VRMConstraint } from './VRMConstraint';

const _v3A = new THREE.Vector3();
const _v3GetWeightedSum = new THREE.Vector3();

export class VRMPositionConstraint extends VRMConstraint {
  private _initPosition = new THREE.Vector3();

  public setInitState(): void {
    this._initPosition.copy(this._object.position);
    this._getWeightedSum(_v3A);
    this._initPosition.sub(_v3A);
  }

  public update(): void {
    this._object.position.copy(this._initPosition);
    this._getWeightedSum(_v3A);
    this._object.position.add(_v3A);

    this._object.updateMatrixWorld();
  }

  private _getWeightedSum(target: THREE.Vector3): THREE.Vector3 {
    target.set(0.0, 0.0, 0.0);

    for (const source of this._sources) {
      source.object.updateMatrixWorld();
      _v3GetWeightedSum.setFromMatrixPosition(source.object.matrixWorld);
      _v3GetWeightedSum.multiplyScalar(source.weight);
      target.add(_v3GetWeightedSum);
    }

    target.multiplyScalar(this.weight);

    return target;
  }
}
