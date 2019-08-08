import * as THREE from 'three';
import { getWorldQuaternionLite } from '../utils/math';
import { VRM, VRMBuilder } from '../VRM';
import { VRMPartsBuilder } from '../VRMPartsBuilder';
import { DebugOption } from './DebugOption';
import { VRMPartsBuilderDebugProxy } from './VRMPartsBuilder';

const _v3B = new THREE.Vector3();
const _quatA = new THREE.Quaternion();

export class VRMBuilderDebug extends VRMBuilder {
  private _option?: DebugOption;

  public option(option: DebugOption): VRMBuilderDebug {
    this._option = option;
    return this;
  }

  public async build(gltf: THREE.GLTF): Promise<VRM> {
    const partsBuilder = new VRMPartsBuilderDebugProxy(this._partsBuilder, this._option);
    const vrm = new VRMDebug(partsBuilder, this._option);
    await vrm.loadGLTF(gltf);
    return vrm;
  }
}

export class VRMDebug extends VRM {
  public static get Builder(): VRMBuilderDebug {
    return new VRMBuilderDebug();
  }

  public static from(gltf: THREE.GLTF): Promise<VRM> {
    return new VRMBuilderDebug().build(gltf);
  }

  private readonly _debugOption: DebugOption;

  private _faceDirectionHelper?: THREE.ArrowHelper;
  private _leftEyeDirectionHelper?: THREE.ArrowHelper;
  private _rightEyeDirectionHelper?: THREE.ArrowHelper;

  constructor(partsBuilder?: VRMPartsBuilder, debugOption?: DebugOption) {
    super(partsBuilder);

    this._debugOption = debugOption || {};
  }

  public async loadGLTF(gltf: THREE.GLTF): Promise<void> {
    await super.loadGLTF(gltf);

    // Gizmoを展開
    if (!this._debugOption.disableBoxHelper) {
      gltf.scene.add(new THREE.BoxHelper(gltf.scene));
    }

    if (!this._debugOption.disableSkeletonHelper) {
      gltf.scene.add(new THREE.SkeletonHelper(gltf.scene));
    }

    if (!this._debugOption.disableFaceDirectionHelper) {
      this._faceDirectionHelper = new THREE.ArrowHelper(
        new THREE.Vector3(0, 0, -1),
        new THREE.Vector3(0, 0, 0),
        0.5,
        0xff00ff,
      );
      gltf.scene.add(this._faceDirectionHelper);
    }

    if (this.humanBones && this.humanBones.leftEye && this.lookAt && !this._debugOption.disableLeftEyeDirectionHelper) {
      this._leftEyeDirectionHelper = new THREE.ArrowHelper(
        new THREE.Vector3(0, 0, -1),
        new THREE.Vector3(0, 0, 0),
        0.3,
        0xff00ff,
        0.05,
      );
      gltf.scene.add(this._leftEyeDirectionHelper);
    }

    if (
      this.humanBones &&
      this.humanBones.rightEye &&
      this.lookAt &&
      !this._debugOption.disableRightEyeDirectionHelper
    ) {
      this._rightEyeDirectionHelper = new THREE.ArrowHelper(
        new THREE.Vector3(0, 0, -1),
        new THREE.Vector3(0, 0, 0),
        0.3,
        0xff00ff,
        0.05,
      );
      gltf.scene.add(this._rightEyeDirectionHelper);
    }
  }

  public update(delta: number): void {
    super.update(delta);
    this.updateGizmos();
  }

  private updateGizmos() {
    if (this.lookAt && this._faceDirectionHelper) {
      this._faceDirectionHelper.position.fromArray(this.lookAt.getHeadPosition());
      this._faceDirectionHelper.setDirection(_v3B.fromArray(this.lookAt.getFaceDirection()));
    }

    if (
      this.humanBones &&
      this.humanBones.leftEye &&
      this.lookAt &&
      this.lookAt.leftEyeWorldPosition &&
      this._leftEyeDirectionHelper
    ) {
      const leftEyeWorldRotation = getWorldQuaternionLite(this.humanBones.leftEye, _quatA);
      const direction = _v3B.set(0, 0, -1).applyQuaternion(leftEyeWorldRotation);
      this._leftEyeDirectionHelper.position.copy(this.lookAt.leftEyeWorldPosition);
      this._leftEyeDirectionHelper.setDirection(direction);
    }

    if (
      this.humanBones &&
      this.humanBones.rightEye &&
      this.lookAt &&
      this.lookAt.rightEyeWorldPosition &&
      this._rightEyeDirectionHelper
    ) {
      const rightEyeWorldRotation = getWorldQuaternionLite(this.humanBones.rightEye, _quatA);
      const direction = _v3B.set(0, 0, -1).applyQuaternion(rightEyeWorldRotation);
      this._rightEyeDirectionHelper.position.copy(this.lookAt.rightEyeWorldPosition);
      this._rightEyeDirectionHelper.setDirection(direction);
    }
  }
}
