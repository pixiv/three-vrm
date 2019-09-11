import * as THREE from 'three';
import { VRMLookAtHead } from '../lookat/VRMLookAtHead';
import { VRMDebugOptions } from './VRMDebugOptions';

const _v3 = new THREE.Vector3();

export class VRMLookAtHeadDebug extends VRMLookAtHead {
  private _faceDirectionHelper?: THREE.ArrowHelper;

  public setupHelper(scene: THREE.Scene, debugOption: VRMDebugOptions): void {
    if (!debugOption.disableFaceDirectionHelper) {
      this._faceDirectionHelper = new THREE.ArrowHelper(
        new THREE.Vector3(0, 0, -1),
        new THREE.Vector3(0, 0, 0),
        0.5,
        0xff00ff,
      );
      scene.add(this._faceDirectionHelper);
    }
  }

  public update(delta: number): void {
    super.update(delta);

    if (this._faceDirectionHelper) {
      this.firstPerson.getFirstPersonWorldPosition(this._faceDirectionHelper.position);
      this._faceDirectionHelper.setDirection(this.getLookAtWorldDirection(_v3));
    }
  }
}
