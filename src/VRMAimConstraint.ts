import * as THREE from 'three';
import { VRMConstraint } from './VRMConstraint';
import { VRMConstraintSpace } from './VRMConstraintSpace';

const QUAT_IDENTITY = new THREE.Quaternion(0, 0, 0, 1);

const _quatA = new THREE.Quaternion();
const _matA = new THREE.Matrix4();
const _v3GetRotationUp = new THREE.Vector3();
const _v3GetRotationPos = new THREE.Vector3();
const _v3GetRotationDir = new THREE.Vector3();
const _v3GetRotationPlaneX = new THREE.Vector3();
const _v3GetRotationPlaneY = new THREE.Vector3();
const _quatGetRotation = new THREE.Quaternion();

export class VRMAimConstraint extends VRMConstraint {
  public aimVector = new THREE.Vector3(0.0, 0.0, 1.0);
  public upVector = new THREE.Vector3(0.0, 1.0, 0.0);

  private _initQuaternion = new THREE.Quaternion();

  public setInitState(): void {
    this.object.updateMatrix();

    this._getDestinationMatrix(_matA);
    this._initQuaternion.setFromRotationMatrix(_matA);
    this._getAimRotation(_quatA);
    _quatA.inverse();
    this._initQuaternion.multiply(_quatA);
  }

  public update(): void {
    this._getAimRotation(this.object.quaternion);
    this.object.quaternion.multiply(this._initQuaternion);

    if (this.destinationSpace === VRMConstraintSpace.Model) {
      this._getInverseParentMatrixInModelSpace(_matA);
      _quatA.setFromRotationMatrix(_matA);
      this.object.quaternion.multiply(_quatA);
    }

    this.object.updateMatrix();
  }

  private _getAimRotation(target: THREE.Quaternion): THREE.Quaternion {
    _v3GetRotationUp.copy(this.upVector).normalize();

    this._getSourcePosition(_v3GetRotationDir);
    _v3GetRotationPos.setFromMatrixPosition(this.object.matrixWorld);
    _v3GetRotationDir.sub(_v3GetRotationPos).normalize();

    const thetaAim = Math.asin(_v3GetRotationUp.dot(this.aimVector));
    const thetaDir = Math.asin(_v3GetRotationUp.dot(_v3GetRotationDir));

    _v3GetRotationPlaneX.crossVectors(_v3GetRotationUp, this.aimVector).normalize();
    _v3GetRotationPlaneY.crossVectors(_v3GetRotationPlaneX, _v3GetRotationUp);

    const phiDir = Math.atan2(_v3GetRotationPlaneX.dot(_v3GetRotationDir), _v3GetRotationPlaneY.dot(_v3GetRotationDir));

    target.setFromAxisAngle(_v3GetRotationUp, phiDir);
    _quatGetRotation.setFromAxisAngle(_v3GetRotationPlaneX, thetaAim - thetaDir);
    target.multiply(_quatGetRotation);

    target.slerp(QUAT_IDENTITY, 1.0 - this.weight);

    return target;
  }

  private _getSourcePosition(target: THREE.Vector3): THREE.Vector3 {
    target.set(0.0, 0.0, 0.0);

    if (this._source) {
      this._getSourceMatrix(_matA);
      target.setFromMatrixPosition(_matA);
    }

    return target;
  }
}
