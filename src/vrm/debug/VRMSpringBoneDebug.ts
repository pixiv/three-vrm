import * as THREE from 'three';
import { VRMSpringBone } from '../springbone';
import { VRM_GIZMO_RENDER_ORDER } from './VRMDebug';

const _v3A = new THREE.Vector3();

export class VRMSpringBoneDebug extends VRMSpringBone {
  private _gizmo?: THREE.ArrowHelper;

  constructor(
    bone: THREE.Object3D,
    radius: number,
    stiffiness: number,
    gravityDir: THREE.Vector3,
    gravityPower: number,
    dragForce: number,
    colliders: THREE.Mesh[] = [],
  ) {
    super(bone, radius, stiffiness, gravityDir, gravityPower, dragForce, colliders);
  }

  /**
   * Return spring bone gizmo, as `THREE.ArrowHelper`.
   * Useful for debugging spring bones.
   */
  public getGizmo(): THREE.ArrowHelper {
    // return if gizmo is already existed
    if (this._gizmo) {
      return this._gizmo;
    }

    const nextTailRelative = _v3A.copy(this._nextTail).sub(this._worldPosition);
    const nextTailRelativeLength = nextTailRelative.length();

    this._gizmo = new THREE.ArrowHelper(
      nextTailRelative.normalize(),
      this._worldPosition,
      nextTailRelativeLength,
      0xffff00,
      this.radius,
      this.radius,
    );

    // it should be always visible
    this._gizmo.line.renderOrder = VRM_GIZMO_RENDER_ORDER;
    this._gizmo.cone.renderOrder = VRM_GIZMO_RENDER_ORDER;
    (this._gizmo.line.material as THREE.Material).depthTest = false;
    (this._gizmo.line.material as THREE.Material).transparent = true;
    (this._gizmo.cone.material as THREE.Material).depthTest = false;
    (this._gizmo.cone.material as THREE.Material).transparent = true;

    return this._gizmo;
  }

  public update(delta: number): void {
    super.update(delta);
    // lastly we're gonna update gizmo
    this._updateGizmo();
  }

  private _updateGizmo(): void {
    if (!this._gizmo) {
      return;
    }

    const nextTailRelative = _v3A.copy(this._currentTail).sub(this._worldPosition);
    const nextTailRelativeLength = nextTailRelative.length();

    this._gizmo.setDirection(nextTailRelative.normalize());
    this._gizmo.setLength(nextTailRelativeLength, this.radius, this.radius);
    this._gizmo.position.copy(this._worldPosition);
  }
}
