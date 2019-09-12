import * as THREE from 'three';
import { VRMFirstPerson } from '../firstperson/VRMFirstPerson';
import { getWorldQuaternionLite } from '../utils/math';
import { VRMLookAtApplyer } from './VRMLookAtApplyer';

const VECTOR3_FRONT = Object.freeze(new THREE.Vector3(0.0, 0.0, -1.0));

const _v3A = new THREE.Vector3();
const _v3B = new THREE.Vector3();
const _v3C = new THREE.Vector3();
const _quat = new THREE.Quaternion();

/**
 * A class represents look at of a VRM.
 */
export class VRMLookAtHead {
  public static readonly EULER_ORDER = 'YXZ'; // yaw-pitch-roll

  /**
   * Associated [[VRMFirstPerson]], will be used for direction calculation.
   */
  public readonly firstPerson: VRMFirstPerson;

  /**
   * Associated [[VRMLookAtApplyer]], its look at direction will be applied to the model using this applier.
   */
  public readonly applyer?: VRMLookAtApplyer;

  /**
   * If this is true, its look at direction will be updated automatically by calling [[VRMLookAtHead.update]] (which is called from [[VRM.update]]).
   *
   * See also: [[VRMLookAtHead.target]]
   */
  public autoUpdate = true;

  /**
   * The target object of the look at.
   * Note that it does not make any sense if [[VRMLookAtHead.autoUpdate]] is disabled.
   */
  public target?: THREE.Object3D;

  protected _euler: THREE.Euler = new THREE.Euler(0.0, 0.0, 0.0, VRMLookAtHead.EULER_ORDER);

  /**
   * Create a new VRMLookAtHead.
   *
   * @param firstPerson A [[VRMFirstPerson]] that will be associated with this new VRMLookAtHead
   * @param applyer A [[VRMLookAtApplyer]] that will be associated with this new VRMLookAtHead
   */
  constructor(firstPerson: VRMFirstPerson, applyer?: VRMLookAtApplyer) {
    this.firstPerson = firstPerson;
    this.applyer = applyer;
  }

  /**
   * Get its look at direction in world coordinate.
   *
   * @param target A target `THREE.Vector3`
   */
  public getLookAtWorldDirection(target: THREE.Vector3): THREE.Vector3 {
    const rot = getWorldQuaternionLite(this.firstPerson.firstPersonBone, _quat);
    return target
      .copy(VECTOR3_FRONT)
      .applyEuler(this._euler)
      .applyQuaternion(rot);
  }

  /**
   * Set its look at position.
   * Note that its result will be instantly overwritten if [[VRMLookAtHead.autoUpdate]] is enabled.
   *
   * @param position A target position
   */
  public lookAt(position: THREE.Vector3): void {
    this._calcEuler(this._euler, position);

    if (this.applyer) {
      this.applyer.lookAt(this._euler);
    }
  }

  /**
   * Update the VRMLookAtHead.
   * If [[VRMLookAtHead.autoUpdate]] is disabled, it will do nothing.
   *
   * @param delta deltaTime
   */
  public update(delta: number): void {
    if (this.target && this.autoUpdate) {
      this.lookAt(this.target.getWorldPosition(_v3A));

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
    lookAtDir.applyQuaternion(getWorldQuaternionLite(this.firstPerson.firstPersonBone, _quat).inverse());

    // convert the direction into euler
    target.x = Math.atan2(lookAtDir.y, Math.sqrt(lookAtDir.x * lookAtDir.x + lookAtDir.z * lookAtDir.z));
    target.y = Math.atan2(-lookAtDir.x, -lookAtDir.z);

    return target;
  }
}
