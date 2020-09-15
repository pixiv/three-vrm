import * as THREE from 'three';
import { getWorldQuaternionLite } from '../utils/math';
import { VRMSpringBoneColliderMesh } from './VRMSpringBoneColliderGroup';
import { Matrix4WithInverseCache } from '../utils/Matrix4WithInverseCache';
// based on
// http://rocketjump.skr.jp/unity3d/109/
// https://github.com/dwango/UniVRM/blob/master/Scripts/SpringBone/VRMSpringBone.cs

const IDENTITY_MATRIX4 = Object.freeze(new THREE.Matrix4());
const IDENTITY_QUATERNION = Object.freeze(new THREE.Quaternion());

// 計算中の一時保存用変数（一度インスタンスを作ったらあとは使い回す）
const _v3A = new THREE.Vector3();
const _v3B = new THREE.Vector3();
const _v3C = new THREE.Vector3();
const _quatA = new THREE.Quaternion();
const _matA = new THREE.Matrix4();
const _matB = new THREE.Matrix4();

/**
 * A class represents a single spring bone of a VRM.
 * It should be managed by a [[VRMSpringBoneManager]].
 */
export class VRMSpringBone {
  /**
   * Radius of the bone, will be used for collision.
   */
  public readonly radius: number;

  /**
   * Stiffness force of the bone. Increasing the value = faster convergence (feels "harder").
   * On UniVRM, its range on GUI is between `0.0` and `4.0` .
   */
  public readonly stiffnessForce: number;

  /**
   * Power of the gravity against this bone.
   * The "power" used in here is very far from scientific physics term...
   */
  public readonly gravityPower: number;

  /**
   * Direction of the gravity against this bone.
   * Usually it should be normalized.
   */
  public readonly gravityDir: THREE.Vector3;

  /**
   * Drag force of the bone. Increasing the value = less oscillation (feels "heavier").
   * On UniVRM, its range on GUI is between `0.0` and `1.0` .
   */
  public readonly dragForce: number;

  /**
   * An Object3D attached to this bone.
   */
  public readonly bone: THREE.Object3D;

  /**
   * Collider groups attached to this bone.
   */
  public readonly colliders: VRMSpringBoneColliderMesh[];

  /**
   * Current position of child tail, in world unit. Will be used for verlet integration.
   */
  protected _currentTail = new THREE.Vector3();

  /**
   * Previous position of child tail, in world unit. Will be used for verlet integration.
   */
  protected _prevTail = new THREE.Vector3();

  /**
   * Next position of child tail, in world unit. Will be used for verlet integration.
   * Actually used only in [[update]] and it's kind of temporary variable.
   */
  protected _nextTail = new THREE.Vector3();

  /**
   * Initial axis of the bone, in local unit.
   */
  protected _boneAxis = new THREE.Vector3();

  /**
   * Length of the bone in relative space unit. Will be used for normalization in update loop.
   * It's same as local unit length unless there are scale transformation in world matrix.
   */
  protected _centerSpaceBoneLength: number;

  /**
   * Position of this bone in relative space, kind of a temporary variable.
   */
  protected _centerSpacePosition = new THREE.Vector3();

  /**
   * This springbone will be calculated based on the space relative from this object.
   * If this is `null`, springbone will be calculated in world space.
   */
  protected _center: THREE.Object3D | null = null;
  public get center(): THREE.Object3D | null {
    return this._center;
  }
  public set center(center: THREE.Object3D | null) {
    // convert tails to world space
    this._getMatrixCenterToWorld(_matA);

    this._currentTail.applyMatrix4(_matA);
    this._prevTail.applyMatrix4(_matA);
    this._nextTail.applyMatrix4(_matA);

    // change `matrixWorld` back to an ordinary Matrix4
    if (this._center) {
      const newMatrix = new THREE.Matrix4();
      newMatrix.copy(this._center.matrixWorld);
      this._center.matrixWorld = newMatrix;
    }

    // change the center
    this._center = center;

    // HACK: replacing `matrixWorld` of the center with a Matrix4 that has a cache of inverse (wow)
    if (this._center) {
      const newMatrix = new Matrix4WithInverseCache();
      newMatrix.copy(this._center.matrixWorld);
      this._center.matrixWorld = newMatrix;
    }

    // convert tails to center space
    this._getMatrixWorldToCenter(_matA);

    this._currentTail.applyMatrix4(_matA);
    this._prevTail.applyMatrix4(_matA);
    this._nextTail.applyMatrix4(_matA);

    // convert center space dependant state
    _matA.multiply(this.bone.matrixWorld); // 🔥 ??

    this._centerSpacePosition.setFromMatrixPosition(_matA);

    this._centerSpaceBoneLength = _v3A
      .copy(this._initialLocalChildPosition)
      .applyMatrix4(_matA)
      .sub(this._centerSpacePosition)
      .length();
  }

  /**
   * Rotation of parent bone, in world unit.
   * We should update this constantly in [[update]].
   */
  private _parentWorldRotation = new THREE.Quaternion();

  /**
   * Initial state of the local matrix of the bone.
   */
  private _initialLocalMatrix = new THREE.Matrix4();

  /**
   * Initial state of the rotation of the bone.
   */
  private _initialLocalRotation = new THREE.Quaternion();

  /**
   * Initial state of the position of its child.
   */
  private _initialLocalChildPosition = new THREE.Vector3();

  /**
   * Create a new VRMSpringBone.
   *
   * @param bone An Object3D that will be attached to this bone
   * @param radius Radius of the bone
   * @param stiffness Stiffness force of the bone
   * @param gravityDir Direction of the gravity against this bone
   * @param gravityPower Power of the gravity against this bone
   * @param dragForce Drag force of the bone
   * @param colliders Colliders that will be attached to this bone
   */
  constructor(
    bone: THREE.Object3D,
    radius: number,
    stiffiness: number,
    gravityDir: THREE.Vector3,
    gravityPower: number,
    dragForce: number,
    colliders: THREE.Mesh[] = [],
    center?: THREE.Object3D | null, // TODO: make it sane in next breaking update
  ) {
    this.bone = bone; // uniVRMでの parent
    this.bone.matrixAutoUpdate = false; // updateにより計算されるのでthree.js内での自動処理は不要

    this.radius = radius;
    this.stiffnessForce = stiffiness;
    this.gravityDir = new THREE.Vector3().copy(gravityDir);
    this.gravityPower = gravityPower;
    this.dragForce = dragForce;
    this.colliders = colliders;

    this._centerSpacePosition.setFromMatrixPosition(this.bone.matrixWorld);

    this._initialLocalMatrix.copy(this.bone.matrix);
    this._initialLocalRotation.copy(this.bone.quaternion);

    if (this.bone.children.length === 0) {
      // 末端のボーン。子ボーンがいないため「自分の少し先」が子ボーンということにする
      // https://github.com/dwango/UniVRM/blob/master/Assets/VRM/UniVRM/Scripts/SpringBone/VRMSpringBone.cs#L246
      this._initialLocalChildPosition
        .copy(this.bone.position)
        .normalize()
        .multiplyScalar(0.07); // magic number! derives from original source
    } else {
      const firstChild = this.bone.children[0];
      this._initialLocalChildPosition.copy(firstChild.position);
    }

    this.bone.localToWorld(this._currentTail.copy(this._initialLocalChildPosition));
    this._prevTail.copy(this._currentTail);
    this._nextTail.copy(this._currentTail);

    this._boneAxis.copy(this._initialLocalChildPosition).normalize();
    this._centerSpaceBoneLength = _v3A
      .copy(this._initialLocalChildPosition)
      .applyMatrix4(this.bone.matrixWorld)
      .sub(this._centerSpacePosition)
      .length();

    this.center = center ?? null;
  }

  /**
   * Reset the state of this bone.
   * You might want to call [[VRMSpringBoneManager.reset]] instead.
   */
  public reset(): void {
    this.bone.quaternion.copy(this._initialLocalRotation);

    // We need to update its matrixWorld manually, since we tweaked the bone by our hand
    this.bone.updateMatrix();
    this.bone.matrixWorld.multiplyMatrices(this._getParentMatrixWorld(), this.bone.matrix);
    this._centerSpacePosition.setFromMatrixPosition(this.bone.matrixWorld);

    // Apply updated position to tail states
    this.bone.localToWorld(this._currentTail.copy(this._initialLocalChildPosition));
    this._prevTail.copy(this._currentTail);
    this._nextTail.copy(this._currentTail);
  }

  /**
   * Update the state of this bone.
   * You might want to call [[VRMSpringBoneManager.update]] instead.
   *
   * @param delta deltaTime
   */
  public update(delta: number): void {
    if (delta <= 0) return;

    // 親スプリングボーンの姿勢は常に変化している。
    // それに基づいて処理直前に自分のworldMatrixを更新しておく
    this.bone.matrixWorld.multiplyMatrices(this._getParentMatrixWorld(), this.bone.matrix);

    if (this.bone.parent) {
      // SpringBoneは親から順に処理されていくため、
      // 親のmatrixWorldは最新状態の前提でworldMatrixからquaternionを取り出す。
      // 制限はあるけれど、計算は少ないのでgetWorldQuaternionではなくこの方法を取る。
      getWorldQuaternionLite(this.bone.parent, this._parentWorldRotation);
    } else {
      this._parentWorldRotation.copy(IDENTITY_QUATERNION);
    }

    // Get bone position in center space
    this._getMatrixWorldToCenter(_matA);
    _matA.multiply(this.bone.matrixWorld); // 🔥 ??
    this._centerSpacePosition.setFromMatrixPosition(_matA);

    // Get parent position in center space
    this._getMatrixWorldToCenter(_matB);
    _matB.multiply(this._getParentMatrixWorld());

    // several parameters
    const stiffness = this.stiffnessForce * delta;
    const external = _v3B.copy(this.gravityDir).multiplyScalar(this.gravityPower * delta);

    // verlet積分で次の位置を計算
    this._nextTail
      .copy(this._currentTail)
      .add(
        _v3A
          .copy(this._currentTail)
          .sub(this._prevTail)
          .multiplyScalar(1 - this.dragForce),
      ) // 前フレームの移動を継続する(減衰もあるよ)
      .add(
        _v3A
          .copy(this._boneAxis)
          .applyMatrix4(this._initialLocalMatrix)
          .applyMatrix4(_matB)
          .sub(this._centerSpacePosition)
          .normalize()
          .multiplyScalar(stiffness),
      ) // 親の回転による子ボーンの移動目標
      .add(external); // 外力による移動量

    // normalize bone length
    this._nextTail
      .sub(this._centerSpacePosition)
      .normalize()
      .multiplyScalar(this._centerSpaceBoneLength)
      .add(this._centerSpacePosition);

    // Collisionで移動
    this._collision(this._nextTail);

    this._prevTail.copy(this._currentTail);
    this._currentTail.copy(this._nextTail);

    // Apply rotation, convert vector3 thing into actual quaternion
    // Original UniVRM is doing world unit calculus at here but we're gonna do this on local unit
    // since Three.js is not good at world coordination stuff
    const initialCenterSpaceMatrixInv = _matA.getInverse(_matB.multiply(this._initialLocalMatrix));
    const applyRotation = _quatA.setFromUnitVectors(
      this._boneAxis,
      _v3A
        .copy(this._nextTail)
        .applyMatrix4(initialCenterSpaceMatrixInv)
        .normalize(),
    );

    this.bone.quaternion.copy(this._initialLocalRotation).multiply(applyRotation);

    // We need to update its matrixWorld manually, since we tweaked the bone by our hand
    this.bone.updateMatrix();
    this.bone.matrixWorld.multiplyMatrices(this._getParentMatrixWorld(), this.bone.matrix);
  }

  /**
   * Do collision math against every colliders attached to this bone.
   *
   * @param tail The tail you want to process
   */
  private _collision(tail: THREE.Vector3): void {
    this.colliders.forEach((collider) => {
      this._getMatrixWorldToCenter(_matA);
      _matA.multiply(collider.matrixWorld);
      const colliderCenterSpacePosition = _v3A.setFromMatrixPosition(_matA);
      const colliderRadius = collider.geometry.boundingSphere!.radius; // the bounding sphere is guaranteed to be exist by VRMSpringBoneImporter._createColliderMesh
      const r = this.radius + colliderRadius;

      if (tail.distanceToSquared(colliderCenterSpacePosition) <= r * r) {
        // ヒット。Colliderの半径方向に押し出す
        const normal = _v3B.subVectors(tail, colliderCenterSpacePosition).normalize();
        const posFromCollider = _v3C.addVectors(colliderCenterSpacePosition, normal.multiplyScalar(r));

        // normalize bone length
        tail.copy(
          posFromCollider
            .sub(this._centerSpacePosition)
            .normalize()
            .multiplyScalar(this._centerSpaceBoneLength)
            .add(this._centerSpacePosition),
        );
      }
    });
  }

  /**
   * Create a matrix that converts center space into world space.
   * @param target Target matrix
   */
  private _getMatrixCenterToWorld(target: THREE.Matrix4): THREE.Matrix4 {
    if (this._center) {
      target.copy(this._center.matrixWorld);
    } else {
      target.identity();
    }

    return target;
  }

  /**
   * Create a matrix that converts world space into center space.
   * @param target Target matrix
   */
  private _getMatrixWorldToCenter(target: THREE.Matrix4): THREE.Matrix4 {
    if (this._center) {
      target.copy((this._center.matrixWorld as Matrix4WithInverseCache).inverse);
    } else {
      target.identity();
    }

    return target;
  }

  /**
   * Returns the world matrix of its parent object.
   */
  private _getParentMatrixWorld(): THREE.Matrix4 {
    return this.bone.parent ? this.bone.parent.matrixWorld : IDENTITY_MATRIX4;
  }
}
