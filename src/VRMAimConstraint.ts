import * as THREE from 'three';
import { VRMConstraint } from './VRMConstraint';

const _quatA = new THREE.Quaternion();
const _v3GetWeightedSum = new THREE.Vector3();
const _v3GetRotationUp = new THREE.Vector3();
const _v3GetRotationPos = new THREE.Vector3();
const _v3GetRotationDir = new THREE.Vector3();
const _v3GetRotationPlaneX = new THREE.Vector3();
const _v3GetRotationPlaneY = new THREE.Vector3();
const _quatGetRotation = new THREE.Quaternion();

export class VRMAimConstraint extends VRMConstraint {
  public aimVector = new THREE.Vector3(0.0, 0.0, 1.0);
  public upVector = new THREE.Vector3(0.0, 1.0, 0.0);
  public upNode?: THREE.Object3D;

  private _initQuaternion = new THREE.Quaternion();

  public get dependencies(): Set<THREE.Object3D> {
    const deps = new Set<THREE.Object3D>();
    for (const source of this._sources) {
      deps.add(source.object);
    }
    if (this.upNode) {
      deps.add(this.upNode);
    }
    return deps;
  }

  public setInitState(): void {
    this._initQuaternion.copy(this._object.quaternion);

    this._getAimRotation(_quatA);
    _quatA.inverse();
    this._initQuaternion.multiply(_quatA);
  }

  public update(): void {
    this._object.quaternion.set(0.0, 0.0, 0.0, 1.0);

    this._getAimRotation(_quatA);
    this._object.quaternion.multiply(_quatA);

    this._object.quaternion.multiply(this._initQuaternion);

    this._object.updateMatrixWorld();
  }

  private _getAimRotation(target: THREE.Quaternion): THREE.Quaternion {
    _v3GetRotationUp.copy(this.upVector).normalize();
    if (this.upNode) {
      this.upNode.updateMatrixWorld();
      _quatGetRotation.setFromRotationMatrix(this.upNode.matrixWorld);
      _v3GetRotationUp.applyQuaternion(_quatGetRotation);
    }

    this._getWeightedSum(_v3GetRotationDir);
    _v3GetRotationPos.setFromMatrixPosition(this._object.matrixWorld);
    _v3GetRotationDir.sub(_v3GetRotationPos).normalize();

    const thetaAim = Math.asin(_v3GetRotationUp.dot(this.aimVector));
    const thetaDir = Math.asin(_v3GetRotationUp.dot(_v3GetRotationDir));

    _v3GetRotationPlaneX.crossVectors(_v3GetRotationUp, this.aimVector).normalize();
    _v3GetRotationPlaneY.crossVectors(_v3GetRotationPlaneX, _v3GetRotationUp);

    const phiDir = Math.atan2(_v3GetRotationPlaneX.dot(_v3GetRotationDir), _v3GetRotationPlaneY.dot(_v3GetRotationDir));

    target.setFromAxisAngle(_v3GetRotationUp, phiDir);
    _quatGetRotation.setFromAxisAngle(_v3GetRotationPlaneX, thetaAim - thetaDir);
    target.multiply(_quatGetRotation);

    return target;
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
