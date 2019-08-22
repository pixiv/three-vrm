import * as THREE from 'three';
import { HumanBone } from '../types';
import { getWorldQuaternionLite } from '../utils/math';
import { VRM, VRMParameters } from '../VRM';
import { VRMImporterOptions } from '../VRMImporter';
import { DebugOption } from './DebugOption';
import { VRMImporterDebug } from './VRMImporterDebug';

const _v3B = new THREE.Vector3();
const _quatA = new THREE.Quaternion();

export class VRMDebug extends VRM {
  public static async from(
    gltf: THREE.GLTF,
    options: VRMImporterOptions = {},
    debugOption: DebugOption = {},
  ): Promise<VRM> {
    const importer = new VRMImporterDebug(options);
    return await importer.import(gltf, debugOption);
  }

  private _faceDirectionHelper?: THREE.ArrowHelper;
  private _leftEyeDirectionHelper?: THREE.ArrowHelper;
  private _rightEyeDirectionHelper?: THREE.ArrowHelper;

  constructor(params: VRMParameters, debugOption: DebugOption = {}) {
    super(params);

    // Gizmoを展開
    if (!debugOption.disableBoxHelper) {
      this.scene.add(new THREE.BoxHelper(this.scene));
    }

    if (!debugOption.disableSkeletonHelper) {
      this.scene.add(new THREE.SkeletonHelper(this.scene));
    }

    if (!debugOption.disableFaceDirectionHelper) {
      this._faceDirectionHelper = new THREE.ArrowHelper(
        new THREE.Vector3(0, 0, -1),
        new THREE.Vector3(0, 0, 0),
        0.5,
        0xff00ff,
      );
      this.scene.add(this._faceDirectionHelper);
    }

    if (
      this.humanoid &&
      this.humanoid.humanBones.leftEye &&
      this.lookAt &&
      !debugOption.disableLeftEyeDirectionHelper
    ) {
      this._leftEyeDirectionHelper = new THREE.ArrowHelper(
        new THREE.Vector3(0, 0, -1),
        new THREE.Vector3(0, 0, 0),
        0.3,
        0xff00ff,
        0.05,
      );
      this.scene.add(this._leftEyeDirectionHelper);
    }

    if (
      this.humanoid &&
      this.humanoid.humanBones.rightEye &&
      this.lookAt &&
      !debugOption.disableRightEyeDirectionHelper
    ) {
      this._rightEyeDirectionHelper = new THREE.ArrowHelper(
        new THREE.Vector3(0, 0, -1),
        new THREE.Vector3(0, 0, 0),
        0.3,
        0xff00ff,
        0.05,
      );
      this.scene.add(this._rightEyeDirectionHelper);
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
      this.humanoid &&
      this.humanoid.humanBones.leftEye &&
      this.lookAt &&
      this.lookAt.leftEyeWorldPosition &&
      this._leftEyeDirectionHelper
    ) {
      const leftEyeWorldRotation = getWorldQuaternionLite(this.humanoid.getBoneNode(HumanBone.LeftEye)!, _quatA);
      const direction = _v3B.set(0, 0, -1).applyQuaternion(leftEyeWorldRotation);
      this._leftEyeDirectionHelper.position.copy(this.lookAt.leftEyeWorldPosition);
      this._leftEyeDirectionHelper.setDirection(direction);
    }

    if (
      this.humanoid &&
      this.humanoid.humanBones.rightEye &&
      this.lookAt &&
      this.lookAt.rightEyeWorldPosition &&
      this._rightEyeDirectionHelper
    ) {
      const rightEyeWorldRotation = getWorldQuaternionLite(this.humanoid.getBoneNode(HumanBone.RightEye)!, _quatA);
      const direction = _v3B.set(0, 0, -1).applyQuaternion(rightEyeWorldRotation);
      this._rightEyeDirectionHelper.position.copy(this.lookAt.rightEyeWorldPosition);
      this._rightEyeDirectionHelper.setDirection(direction);
    }
  }
}
