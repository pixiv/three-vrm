import * as THREE from 'three';
import { VRMConstraint } from './VRMConstraint';
import { quatExp, quatLog } from './utils/quatUtils';

const _quatA = new THREE.Quaternion();
const _quatGetWeightedSum = new THREE.Quaternion();

export class VRMRotationConstraint extends VRMConstraint {
  private _initQuaternion = new THREE.Quaternion();

  public setInitState(): void {
    this._initQuaternion.copy(this._object.quaternion);

    this._getWeightedSum(_quatA);
    _quatA.inverse();
    this._initQuaternion.multiply(_quatA);
  }

  public update(): void {
    this._object.quaternion.set(0.0, 0.0, 0.0, 1.0);

    this._getWeightedSum(_quatA);
    this._object.quaternion.multiply(_quatA);

    this._object.quaternion.multiply(this._initQuaternion);

    this._object.updateMatrixWorld();
  }

  private _getWeightedSum(target: THREE.Quaternion): THREE.Quaternion {
    target.set(0.0, 0.0, 0.0, 0.0);

    let weightSum = 0.0;
    for (const source of this._sources) {
      source.object.updateMatrixWorld();
      _quatGetWeightedSum.setFromRotationMatrix(source.object.matrixWorld);
      quatLog(_quatGetWeightedSum);

      const weight = source.weight;
      target.x += weight * _quatGetWeightedSum.x;
      target.y += weight * _quatGetWeightedSum.y;
      target.z += weight * _quatGetWeightedSum.z;
      weightSum += weight;
    }

    weightSum *= this.weight;
    target.x /= weightSum;
    target.y /= weightSum;
    target.z /= weightSum;

    quatExp(target);

    return target;
  }
}
