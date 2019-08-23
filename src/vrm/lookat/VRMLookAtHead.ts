import * as THREE from 'three';
import { VRMFirstPerson } from '../firstperson/VRMFirstPerson';
import { getWorldQuaternionLite } from '../utils/math';
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

  protected _euler: THREE.Euler = new THREE.Euler(0.0, 0.0, 0.0, VRMLookAtHead.EULER_ORDER);
  protected _target?: THREE.Object3D;

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
    return target
      .set(0.0, 0.0, -1.0)
      .applyEuler(this._euler)
      .applyQuaternion(rot);
  }

  public lookAt(position: THREE.Vector3): void {
    this._calcEuler(this._euler, position);

    if (this.applyer) {
      this.applyer.lookAt(this._euler);
    }
  }

  public update(delta: number): void {
    if (this._target && this.autoUpdate) {
      this.lookAt(this._target.getWorldPosition(_v3A));

      if (this.applyer) {
        this.applyer.lookAt(this._euler);
      }
    }
  }

  protected _calcEuler(target: THREE.Euler, position: THREE.Vector3): THREE.Euler {
    const headPosition = this.firstPerson.getFirstPersonWorldPosition(_v3B);

    // Look at direction in world coordinate
    const lookAtDir = _v3C
      .copy(position)
      .sub(headPosition)
      .normalize();

    // Transform the direction into local coordinate from the first person bone
    lookAtDir.applyQuaternion(getWorldQuaternionLite(this.firstPerson.getFirstPersonBone(), _quat).inverse());

    // convert the direction into euler
    target.x = Math.atan2(lookAtDir.y, Math.sqrt(lookAtDir.x * lookAtDir.x + lookAtDir.z * lookAtDir.z));
    target.y = Math.atan2(-lookAtDir.x, -lookAtDir.z);

    return target;
  }
}
