import * as THREE from 'three';
import { VRMFirstPerson } from '../firstperson/VRMFirstPerson';
import { getWorldQuaternionLite, mod } from '../utils/math';
import { VRMLookAtApplyer } from './VRMLookAtApplyer';

const _v3A = new THREE.Vector3();
const _v3B = new THREE.Vector3();
const _v3C = new THREE.Vector3();
const _quat = new THREE.Quaternion();

export class VRMLookAtHead {
  public static readonly EULER_ORDER = 'YXZ'; // yaw-pitch-roll

  public readonly firstPerson: VRMFirstPerson;
  public readonly applyer?: VRMLookAtApplyer;

  public autoUpdate: boolean = true;

  private _target?: THREE.Object3D;
  private _euler: THREE.Euler = new THREE.Euler(0.0, 0.0, 0.0, VRMLookAtHead.EULER_ORDER);

  constructor(firstPerson: VRMFirstPerson, applyer?: VRMLookAtApplyer) {
    this.firstPerson = firstPerson;
    this.applyer = applyer;
  }

  public getTarget(): THREE.Object3D | undefined {
    return this._target;
  }

  public setTarget(target: THREE.Object3D) {
    this._target = target;
  }

  public getLookAtWorldDirection(target: THREE.Vector3) {
    const rot = getWorldQuaternionLite(this.firstPerson.getFirstPersonBone(), _quat);
    return _v3A
      .set(0.0, 0.0, -1.0)
      .applyEuler(this._euler)
      .applyQuaternion(rot);
  }

  public lookAt(position: THREE.Vector3): void {
    if (!this.applyer) {
      return;
    }

    const headPosition = this.firstPerson.getFirstPersonWorldPosition(_v3B);
    const lookAtDir = _v3C
      .copy(position)
      .sub(headPosition)
      .normalize();
    const headDir = this.firstPerson.getFirstPersonDirection(_v3B);

    this._euler.x = Math.atan2(lookAtDir.y, Math.sqrt(lookAtDir.x * lookAtDir.x + lookAtDir.z * lookAtDir.z));
    this._euler.x -= Math.atan2(headDir.y, Math.sqrt(headDir.x * headDir.x + headDir.z * headDir.z));
    this._euler.x = mod(this._euler.x + Math.PI, Math.PI * 2.0) - Math.PI;

    this._euler.y = Math.atan2(headDir.z, headDir.x);
    this._euler.y -= Math.atan2(lookAtDir.z, lookAtDir.x);
    this._euler.y = mod(this._euler.y + Math.PI, Math.PI * 2.0) - Math.PI;

    this.applyer.lookAt(this._euler);
  }

  public update(): void {
    if (this._target && this.autoUpdate) {
      this.lookAt(this._target.getWorldPosition(_v3A));
    }
  }
}
