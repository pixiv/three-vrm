import * as THREE from 'three';
import { VRMHumanoid } from '../humanoid';
import { GLTFNode, RawVector3, VRMSchema } from '../types';
import { getWorldQuaternionLite } from '../utils/math';
import { VRMLookAtApplyer } from './VRMLookAtApplyer';

const _v3A = new THREE.Vector3();
const _v3B = new THREE.Vector3();
const _euler = new THREE.Euler();
const _mat4 = new THREE.Matrix4();
const _quatA = new THREE.Quaternion();
const _quatB = new THREE.Quaternion();
const _quatC = new THREE.Quaternion();
const UP_VECTOR = Object.freeze(new THREE.Vector3(0, 1, 0));
const LOOK_AT_EULER_ORDER = 'ZXY'; // yaw-pitch-roll

export class VRMLookAtHead {
  public head: GLTFNode;

  public autoUpdate = true;

  public givingUpThreshold?: number = undefined; // this is the value of cos(theta)
  public dumpingFactor = 0.5;

  public leftEyeWorldPosition?: THREE.Vector3;
  public rightEyeWorldPosition?: THREE.Vector3;

  private readonly _leftEye: GLTFNode | null;
  private readonly _rightEye: GLTFNode | null;

  private readonly _applyer?: VRMLookAtApplyer;

  private _target?: THREE.Object3D;
  private _lastTargetPosition: THREE.Vector3 = new THREE.Vector3();
  private _lookAtTargetTo?: THREE.Vector3;
  private _lookAtTarget?: THREE.Vector3;

  constructor(humanoid: VRMHumanoid, applyer?: VRMLookAtApplyer) {
    this._applyer = applyer;
    this.head = humanoid.getBoneNode(VRMSchema.HumanoidBoneName.Head)!;

    // 目のボーンはVRM仕様ではオプショナル。
    this._leftEye = humanoid.getBoneNode(VRMSchema.HumanoidBoneName.LeftEye);
    this._rightEye = humanoid.getBoneNode(VRMSchema.HumanoidBoneName.RightEye);

    if (this._leftEye) {
      this.leftEyeWorldPosition = new THREE.Vector3().setFromMatrixPosition(this._leftEye.matrixWorld);
    }
    if (this._rightEye) {
      this.rightEyeWorldPosition = new THREE.Vector3().setFromMatrixPosition(this._rightEye.matrixWorld);
    }
  }

  public getApplyer(): VRMLookAtApplyer | undefined {
    return this._applyer;
  }

  public getTarget(): THREE.Object3D | undefined {
    return this._target;
  }

  public setTarget(target: THREE.Object3D): void {
    this._target = target;
    const worldPosition = new THREE.Vector3();
    this._target.getWorldPosition(worldPosition);
    this._lookAtTarget = worldPosition;
    this._lastTargetPosition = worldPosition.clone();
    this._lookAtTargetTo = worldPosition.clone();
  }

  // 顔の中心座標を取得する
  // カメラフォーカス用
  public getHeadPosition(): RawVector3 {
    _v3A.setFromMatrixPosition(this.head.matrixWorld);
    const x = _v3A.x;
    const z = _v3A.z;
    // 高さは、目の位置を中心にする
    const y = this.leftEyeWorldPosition
      ? this.leftEyeWorldPosition.y
      : this.rightEyeWorldPosition
      ? this.rightEyeWorldPosition.y
      : _v3A.y;

    return [x, y, z];
  }

  // 顔が向いているworld上での方向ベクトルを取得
  public getFaceDirection(): RawVector3 {
    _mat4.extractRotation(this.head.matrixWorld);
    // VRMにとっての正面方向。VRMは標準で後ろを向いている仕様。
    const direction = _v3A.set(0, 0, -1);
    direction.applyMatrix4(_mat4);

    return [direction.x, direction.y, direction.z];
  }

  public lookAt(x: number, y: number, z: number): void {
    if (!this._applyer) {
      return;
    }
    const headPosition = _v3A.fromArray(this.getHeadPosition());
    const targetPosition = _v3B.set(x, y, z);
    _mat4.identity().lookAt(headPosition, targetPosition, UP_VECTOR);
    const worldRotation = _quatA.setFromRotationMatrix(_mat4);
    const localRotation = _quatB.multiplyQuaternions(
      worldRotation,
      getWorldQuaternionLite(this.head.parent!, _quatC).inverse(),
    );
    _euler.setFromQuaternion(localRotation, LOOK_AT_EULER_ORDER);
    this._applyer.lookAt(_euler);
  }

  public update(): void {
    if (this._target && this.head && this.autoUpdate && this._lookAtTarget && this._lookAtTargetTo) {
      this._setCurrentTargetPosition(this._target, this._lookAtTargetTo);

      const result = new THREE.Vector3().set(
        this._lookAtTargetTo.x - this._lookAtTarget.x,
        this._lookAtTargetTo.y - this._lookAtTarget.y,
        this._lookAtTargetTo.z - this._lookAtTarget.z,
      );
      this._lookAtTarget.add(result.multiplyScalar(this.dumpingFactor));
      this.lookAt(this._lookAtTarget.x, this._lookAtTarget.y, this._lookAtTarget.z);
    }

    // 最新のworldMatrixを流し込む
    if (this._leftEye) {
      this.leftEyeWorldPosition = new THREE.Vector3().setFromMatrixPosition(this._leftEye.matrixWorld);
    }
    if (this._rightEye) {
      this.rightEyeWorldPosition = new THREE.Vector3().setFromMatrixPosition(this._rightEye.matrixWorld);
    }
  }

  private _setCurrentTargetPosition(target: THREE.Object3D, lookAtTargetTo: THREE.Vector3): void {
    if (!this._lastTargetPosition.equals(target.position)) {
      this.setTarget(target);

      const headPosition = new THREE.Vector3().fromArray(this.getHeadPosition());
      const faceDirection = new THREE.Vector3().fromArray(this.getFaceDirection());
      const targetPosition = new THREE.Vector3(target.position.x, target.position.y, target.position.z);

      // VRMモデルから見た対象の方向（world座標）
      const lookAtDirection = targetPosition.sub(headPosition).normalize();

      // 顔の正面からの角度がきつい場合、lookAtを諦める
      if (this.givingUpThreshold !== undefined && lookAtDirection.dot(faceDirection) < this.givingUpThreshold) {
        targetPosition.copy(headPosition).add(faceDirection.multiplyScalar(3.0));
        lookAtTargetTo.copy(targetPosition);
        return;
      }

      const distance = targetPosition.distanceTo(headPosition);
      const modifiedLookAtDirection = lookAtDirection.multiplyScalar(distance).add(headPosition);
      lookAtTargetTo.set(modifiedLookAtDirection.x, modifiedLookAtDirection.y, modifiedLookAtDirection.z);
    }
  }
}
