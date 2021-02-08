import * as THREE from 'three';
import { VRMHumanoid } from '../humanoid';
import { getWorldQuaternionLite } from '../utils/getWorldQuaternionLite';
import { quatInvertCompat } from '../utils/quatInvertCompat';
import type { VRMLookAtApplier } from './VRMLookAtApplier';

const VECTOR3_FRONT = Object.freeze(new THREE.Vector3(0.0, 0.0, -1.0));

const _v3A = new THREE.Vector3();
const _v3B = new THREE.Vector3();
const _v3C = new THREE.Vector3();
const _quatA = new THREE.Quaternion();

/**
 * A class controls eye gaze movements of a VRM.
 */
export class VRMLookAt {
  /**
   * The origin of LookAt. Position offset from the head bone.
   */
  public offsetFromHeadBone = new THREE.Vector3();

  /**
   * Its associated {@link VRMHumanoid}.
   */
  public readonly humanoid: VRMHumanoid;

  /**
   * The {@link VRMLookAtApplier} of the LookAt.
   */
  public readonly applier: VRMLookAtApplier;

  /**
   * If this is true, the LookAt will be updated automatically by calling {@link update}, towarding the direction to the {@link target}.
   *
   * See also: {@link target}
   */
  public autoUpdate = true;

  /**
   * The target object of the LookAt.
   * Note that it does not make any sense if {@link autoUpdate} is disabled.
   *
   * See also: {@link autoUpdate}
   */
  public target?: THREE.Object3D;

  protected _euler: THREE.Euler = new THREE.Euler(0.0, 0.0, 0.0, 'YZX');

  /**
   * Create a new {@link VRMLookAt}.
   *
   * @param humanoid A {@link VRMHumanoid}
   * @param applier A {@link VRMLookAtApplier}
   */
  public constructor(humanoid: VRMHumanoid, applier: VRMLookAtApplier) {
    this.humanoid = humanoid;
    this.applier = applier;
  }

  /**
   * Get its head position in world coordinate.
   *
   * @param target A target `THREE.Vector3`
   */
  public getLookAtWorldPosition(target: THREE.Vector3): THREE.Vector3 {
    const head = this.humanoid.getBoneNode('head')!;

    return target.copy(this.offsetFromHeadBone).applyMatrix4(head.matrixWorld);
  }

  /**
   * Get its LookAt direction in world coordinate.
   *
   * @param target A target `THREE.Vector3`
   */
  public getLookAtWorldDirection(target: THREE.Vector3): THREE.Vector3 {
    const head = this.humanoid.getBoneNode('head')!;

    const rot = getWorldQuaternionLite(head, _quatA);
    return target.copy(VECTOR3_FRONT).applyEuler(this._euler).applyQuaternion(rot);
  }

  /**
   * Set its LookAt position.
   * Note that its result will be instantly overwritten if {@link VRMLookAtHead.autoUpdate} is enabled.
   *
   * @param position A target position
   */
  public lookAt(position: THREE.Vector3): void {
    this._calcEuler(this._euler, position);

    if (this.applier) {
      this.applier.lookAt(this._euler);
    }
  }

  /**
   * Update the VRMLookAtHead.
   * If {@link VRMLookAtHead.autoUpdate} is disabled, it will do nothing.
   *
   * @param delta deltaTime, it isn't used though. You can use the parameter if you want to use this in your own extended {@link VRMLookAt}.
   */
  public update(delta: number): void {
    if (this.target && this.autoUpdate) {
      this.lookAt(this.target.getWorldPosition(_v3A));

      if (this.applier) {
        this.applier.lookAt(this._euler);
      }
    }
  }

  protected _calcEuler(target: THREE.Euler, position: THREE.Vector3): THREE.Euler {
    const head = this.humanoid.getBoneNode('head')!;
    const headPosition = this.getLookAtWorldPosition(_v3B);

    // Look at direction in world coordinate
    const lookAtDir = _v3C.copy(position).sub(headPosition).normalize();

    // Transform the direction into local coordinate from the first person bone
    lookAtDir.applyQuaternion(quatInvertCompat(getWorldQuaternionLite(head, _quatA)));

    // convert the direction into euler
    target.x = Math.atan2(lookAtDir.y, Math.sqrt(lookAtDir.x * lookAtDir.x + lookAtDir.z * lookAtDir.z));
    target.y = Math.atan2(-lookAtDir.x, -lookAtDir.z);

    return target;
  }
}
