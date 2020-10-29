import * as THREE from 'three';
import { decomposePosition } from './utils/decomposePosition';
import { VRMConstraint } from './VRMConstraint';
import { VRMConstraintSpace } from './VRMConstraintSpace';

const QUAT_IDENTITY = new THREE.Quaternion(0, 0, 0, 1);

const _quatA = new THREE.Quaternion();
const _quatB = new THREE.Quaternion();
const _matA = new THREE.Matrix4();
const _v3UpdatePos = new THREE.Vector3();
const _v3UpdateScale = new THREE.Vector3();
const _v3GetRotationUp = new THREE.Vector3();
const _v3GetRotationPos = new THREE.Vector3();
const _v3GetRotationDir = new THREE.Vector3();
const _v3GetRotationPlaneX = new THREE.Vector3();
const _v3GetRotationPlaneY = new THREE.Vector3();
const _quatGetRotation = new THREE.Quaternion();

export class VRMAimConstraint extends VRMConstraint {
  public aimVector = new THREE.Vector3(0.0, 0.0, 1.0);
  public upVector = new THREE.Vector3(0.0, 1.0, 0.0);

  private _quatInitAim = new THREE.Quaternion();
  private _quatInvInitAim = new THREE.Quaternion();
  private _quatInitDst = new THREE.Quaternion();

  public setInitState(): void {
    this._quatInitDst.copy(this.object.quaternion);

    this._getAimQuat(this._quatInitAim);
    this._quatInvInitAim.copy(this._quatInitAim).inverse();
  }

  public update(): void {
    if (this.destinationSpace === VRMConstraintSpace.Local) {
      this.object.quaternion.copy(this._quatInitDst);
    } else {
      this._getParentMatrixInModelSpace(_matA);
      _matA.decompose(_v3UpdatePos, _quatA, _v3UpdateScale);
      this.object.quaternion.copy(_quatA).inverse();
    }

    this._getAimDiffQuat(_quatB);
    this.object.quaternion.multiply(_quatB);

    if (this.destinationSpace === VRMConstraintSpace.Model) {
      this.object.quaternion.multiply(_quatA);
      this.object.quaternion.multiply(this._quatInitDst);
    }

    this.object.updateMatrix();
  }

  /**
   * Return a quaternion that represents a diff from the initial -> current orientation of the aim direction.
   * It's aware of its {@link sourceSpace} and its {@link weight}.
   * @param target Target quaternion
   */
  private _getAimDiffQuat(target: THREE.Quaternion): typeof target {
    this._getAimQuat(target);
    target.multiply(this._quatInvInitAim);

    target.slerp(QUAT_IDENTITY, 1.0 - this.weight);
    return target;
  }

  /**
   * Return a current orientation of the aim direction.
   * It's aware of its {@link sourceSpace}.
   * @param target Target quaternion
   */
  private _getAimQuat(target: THREE.Quaternion): typeof target {
    _v3GetRotationUp.copy(this.upVector).normalize();

    this._getSourcePosition(_v3GetRotationDir);
    this._getDestinationPosition(_v3GetRotationPos);
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

  /**
   * Return the current position of the object.
   * It's aware of its {@link sourceSpace}.
   * @param target Target quaternion
   */
  private _getDestinationPosition(target: THREE.Vector3): typeof target {
    target.set(0.0, 0.0, 0.0);

    this._getDestinationMatrix(_matA);
    decomposePosition(_matA, target);

    return target;
  }

  /**
   * Return the current position of the source.
   * It's aware of its {@link sourceSpace}.
   * @param target Target quaternion
   */
  private _getSourcePosition(target: THREE.Vector3): typeof target {
    target.set(0.0, 0.0, 0.0);

    if (this._source) {
      this._getSourceMatrix(_matA);
      decomposePosition(_matA, target);
    }

    return target;
  }
}
