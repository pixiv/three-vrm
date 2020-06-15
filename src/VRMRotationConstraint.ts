import * as THREE from 'three';
import { VRMConstraint } from './VRMConstraint';
import { quatWeightedSum } from './utils/quatUtils';

const _quatA = new THREE.Quaternion();

export class VRMRotationConstraint extends VRMConstraint {
  private _initQuaternion = new THREE.Quaternion();

  public setInitState(): void {
    this._initQuaternion.copy(this._object.quaternion);

    const sourcesArray = Array.from(this._sources.values());
    const quats = sourcesArray.map((source) => ({
      quat: source.object.quaternion,
      weight: source.weight,
    }));
    quatWeightedSum(_quatA, quats);
    _quatA.inverse();

    this._initQuaternion.multiply(_quatA);
  }

  public update(): void {
    this._object.quaternion.set(0.0, 0.0, 0.0, 1.0);

    const sourcesArray = Array.from(this._sources.values());
    const quats = sourcesArray.map((source) => ({
      quat: source.object.quaternion,
      weight: source.weight,
    }));
    quatWeightedSum(_quatA, quats);

    this._object.quaternion.multiply(_quatA);
    this._object.quaternion.multiply(this._initQuaternion);
  }
}
