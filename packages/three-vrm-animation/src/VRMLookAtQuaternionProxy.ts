import { VRMLookAt } from '@pixiv/three-vrm-core';
import * as THREE from 'three';

const RAD2DEG = 180 / Math.PI;

const _eulerA = /*@__PURE__*/ new THREE.Euler();

export class VRMLookAtQuaternionProxy extends THREE.Object3D {
  public readonly vrmLookAt: VRMLookAt;
  public override readonly type: string | 'VRMLookAtQuaternionProxy';

  public constructor(lookAt: VRMLookAt) {
    super();

    this.vrmLookAt = lookAt;

    this.type = 'VRMLookAtQuaternionProxy';

    // See: https://github.com/mrdoob/three.js/blob/r158/src/core/Object3D.js#L65
    const prevRotationOnChangeCallback = this.rotation._onChangeCallback;
    this.rotation._onChange(() => {
      prevRotationOnChangeCallback();
      this._applyToLookAt();
    });

    const prevQuaternionOnChangeCallback = this.quaternion._onChangeCallback;
    this.quaternion._onChange(() => {
      prevQuaternionOnChangeCallback();
      this._applyToLookAt();
    });
  }

  private _applyToLookAt(): void {
    _eulerA.setFromQuaternion(this.quaternion, VRMLookAt.EULER_ORDER);

    this.vrmLookAt.yaw = RAD2DEG * _eulerA.y;
    this.vrmLookAt.pitch = RAD2DEG * _eulerA.x;
  }
}
