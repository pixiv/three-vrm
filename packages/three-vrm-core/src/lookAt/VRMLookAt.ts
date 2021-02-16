import * as THREE from 'three';
import { VRMHumanoid } from '../humanoid';
import { getWorldQuaternionLite } from '../utils/getWorldQuaternionLite';
import { quatInvertCompat } from '../utils/quatInvertCompat';
import type { VRMLookAtApplier } from './VRMLookAtApplier';

const _v3A = new THREE.Vector3();
const _v3B = new THREE.Vector3();
const _v3C = new THREE.Vector3();
const _quatA = new THREE.Quaternion();
const _quatB = new THREE.Quaternion();

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

  /**
   * The front direction of the face.
   * Intended to be used for VRM 0.0 compat (VRM 0.0 models are facing Z- instead of Z+).
   * You usually don't want to touch this.
   */
  public faceFront = new THREE.Vector3(0.0, 0.0, 1.0);

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

    return target.copy(this.faceFront).applyEuler(this._euler).applyQuaternion(rot);
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

    // Look at direction in local coordinate
    const headRotInv = quatInvertCompat(getWorldQuaternionLite(head, _quatA));
    const headPos = this.getLookAtWorldPosition(_v3B);
    const lookAtDir = _v3C.copy(position).sub(headPos).applyQuaternion(headRotInv).normalize();

    // calculate the rotation
    const rotLocal = _quatB.setFromUnitVectors(this.faceFront, lookAtDir);

    // Transform the direction into local coordinate from the first person bone
    _v3C.set(0.0, 0.0, 1.0).applyQuaternion(rotLocal);

    // convert the direction into euler
    target.x = Math.atan2(-_v3C.y, Math.sqrt(_v3C.x * _v3C.x + _v3C.z * _v3C.z));
    target.y = Math.atan2(_v3C.x, _v3C.z);

    return target;
  }
}
