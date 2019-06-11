import * as THREE from 'three'
import { GLTF } from '../types'
import { getWorldQuaternionLite } from '../utils/math'
import { VRM , VRMBuilder } from '../VRM'
import { VRMPartsBuilder } from '../VRMPartsBuilder'
import { DebugOption } from './DebugOption';
import { VRMPartsBuilderDebugProxy } from './VRMPastsBuilder';

const _v3B = new THREE.Vector3()
const _quatA = new THREE.Quaternion()

export class VRMBuilderDebug extends VRMBuilder {

  private _option?: DebugOption

  constructor() {
    super()
  }

  public option(option: DebugOption):VRMBuilderDebug{
    this._option = option
    return this
  }

  public build(gltf: GLTF,) : Promise<VRM> {
    const partsBuilder = new VRMPartsBuilderDebugProxy(this._partsBuilder, this._option)
    return this._materialConverter.convertGLTFMaterials(gltf)
      .then( (converted: GLTF) => new VRMDebug(converted, partsBuilder, this._option))
  }
}

export class VRMDebug extends VRM {

  public static get Builder() : VRMBuilderDebug {
    return new VRMBuilderDebug()
  }

  public static from(gltf:GLTF) : Promise<VRM> {
    return new VRMBuilderDebug().build(gltf)
  }

  private readonly _faceDirectionHelper?: THREE.ArrowHelper
  private readonly _leftEyeDirectionHelper?: THREE.ArrowHelper
  private readonly _rightEyeDirectionHelper?: THREE.ArrowHelper

  constructor (gltf: GLTF, partsBuilder?: VRMPartsBuilder, debugOption?: DebugOption) {
    super(gltf, partsBuilder)

    const opt: DebugOption = debugOption || {}
    // Gizmoを展開
    if (!opt.disableBoxHelper) gltf.scene.add(new THREE.BoxHelper(gltf.scene))
    if (!opt.disableSkeletonHelper) gltf.scene.add(new THREE.SkeletonHelper(gltf.scene))

    if (!opt.disableFaceDirectionHelper) {
      this._faceDirectionHelper = new THREE.ArrowHelper(
        new THREE.Vector3(0, 0, -1),
        new THREE.Vector3(0, 0, 0),
        0.5,
        0xff00ff,
      )
      gltf.scene.add(this._faceDirectionHelper)
    }

    if (this.humanBones.leftEye && !opt.disableLeftEyeDirectionHelper) {
      this._leftEyeDirectionHelper = new THREE.ArrowHelper(
        new THREE.Vector3(0, 0, -1),
        new THREE.Vector3(0, 0, 0),
        0.3,
        0xff00ff,
        0.05,
      )
      gltf.scene.add(this._leftEyeDirectionHelper)
    }

    if (this.humanBones.rightEye && !opt.disableRightEyeDirectionHelper) {
      this._rightEyeDirectionHelper = new THREE.ArrowHelper(
        new THREE.Vector3(0, 0, -1),
        new THREE.Vector3(0, 0, 0),
        0.3,
        0xff00ff,
        0.05,
      )
      gltf.scene.add(this._rightEyeDirectionHelper)
    }
  }

  public update (delta: number): void {
    super.update(delta)
    this.updateGizmos()
  }

  private updateGizmos () {
    if (this._faceDirectionHelper !== undefined) {
      this._faceDirectionHelper.position.fromArray(this.lookAt.getHeadPosition())
      this._faceDirectionHelper.setDirection(_v3B.fromArray(this.lookAt.getFaceDirection()))
    }

    if (
      this.humanBones.leftEye !== undefined &&
      this.lookAt.leftEyeWorldPosition !== undefined &&
      this._leftEyeDirectionHelper !== undefined
    ) {
      const leftEyeWorldRotation = getWorldQuaternionLite(this.humanBones.leftEye, _quatA)
      const direction = _v3B.set(0, 0, -1).applyQuaternion(leftEyeWorldRotation)
      this._leftEyeDirectionHelper.position.copy(this.lookAt.leftEyeWorldPosition)
      this._leftEyeDirectionHelper.setDirection(direction)
    }

    if (
      this.humanBones.rightEye !== undefined &&
      this.lookAt.rightEyeWorldPosition !== undefined &&
      this._rightEyeDirectionHelper !== undefined
    ) {
      const rightEyeWorldRotation = getWorldQuaternionLite(this.humanBones.rightEye, _quatA)
      const direction = _v3B.set(0, 0, -1).applyQuaternion(rightEyeWorldRotation)
      this._rightEyeDirectionHelper.position.copy(this.lookAt.rightEyeWorldPosition)
      this._rightEyeDirectionHelper.setDirection(direction)
    }
  }

}