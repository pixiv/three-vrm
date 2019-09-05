import * as THREE from 'three';
import { VRMLookAtHead } from '../lookat/VRMLookAtHead';
import { VRMDebugOptions } from './VRMDebugOptions';

const _v3 = new THREE.Vector3();

export class VRMLookAtHeadDebug extends VRMLookAtHead {
  private _faceDirectionHelper?: THREE.ArrowHelper;

  public setupHelper(scene: THREE.Scene, debugOption: VRMDebugOptions) {
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

  public update(): void {
    super.update();

    if (this._faceDirectionHelper) {
      this._faceDirectionHelper.position.fromArray(this.getHeadPosition());
      this._faceDirectionHelper.setDirection(_v3.fromArray(this.getFaceDirection()));
    }
  }
}
