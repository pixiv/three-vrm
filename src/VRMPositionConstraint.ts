import * as THREE from 'three';
import { VRMConstraint } from './VRMConstraint';

const _v3A = new THREE.Vector3();

export class VRMPositionConstraint extends VRMConstraint {
  private _initPosition = new THREE.Vector3();

  public setInitState(): void {
    this._initPosition.copy(this._object.position);
    for (const source of this._sources) {
      _v3A.copy(source.object.position).multiplyScalar(-source.weight);
      this._initPosition.add(_v3A);
    }
  }

  public update(): void {
    this._object.position.copy(this._initPosition);
    for (const source of this._sources) {
      _v3A.copy(source.object.position).multiplyScalar(source.weight);
      this._object.position.add(_v3A);
    }
  }
}
