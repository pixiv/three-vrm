import * as THREE from 'three';
import { getWorldQuaternionLite } from '../utils/math';
// based on
// http://rocketjump.skr.jp/unity3d/109/
// https://github.com/dwango/UniVRM/blob/master/Scripts/SpringBone/VRMSpringBone.cs

export const GIZMO_RENDER_ORDER = 10000;
export const IDENTITY_MATRIX4 = Object.freeze(new THREE.Matrix4());
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
   * Colliders (as `THREE.Mesh` ) attached to this bone.
   */
  public readonly colliders: THREE.Mesh[];

  /**
   * Current position of child tail, in world unit. Will be used for verlet integration.
   */
  protected currentTail: THREE.Vector3;

  /**
   * Previous position of child tail, in world unit. Will be used for verlet integration.
   */
  protected prevTail: THREE.Vector3;

  /**
   * Next position of child tail, in world unit. Will be used for verlet integration.
   * Actually used only in [[update]] and it's kind of temporary variable.
   */
  protected nextTail: THREE.Vector3;

  /**
   * Initial axis of the bone, in local unit.
   */
  protected boneAxis: THREE.Vector3;

  /**
   * Length of the bone in **world unit**. Will be used for normalization in update loop.
   * It's same as local unit length unless there are scale transformation in world matrix.
   */
  protected worldBoneLength: number;

  /**
   * World position of this bone, kind of temporary variable.
   */
  protected worldPosition: THREE.Vector3;

  /**
   * Rotation of parent bone, in world unit.
   * We should update this constantly in [[update]].
   */
  private _parentWorldRotation: THREE.Quaternion;

  /**
   * Initial state of the local matrix of the bone.
   */
  private _initialLocalMatrix: THREE.Matrix4;

  /**
   * Initial state of the rotation of the bone.
   */
  private _initialLocalRotation: THREE.Quaternion;

  /**
   * Initial state of the position of its child.
   */
  private _initialLocalChildPosition: THREE.Vector3;

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
  ) {
    this.bone = bone; // uniVRMでの parent
    this.bone.matrixAutoUpdate = false; // updateにより計算されるのでthree.js内での自動処理は不要

    this.radius = radius;
    this.stiffnessForce = stiffiness;
    this.gravityDir = gravityDir;
    this.gravityPower = gravityPower;
    this.dragForce = dragForce;
    this.colliders = colliders;

    this.worldPosition = new THREE.Vector3().setFromMatrixPosition(this.bone.matrixWorld);

    this._parentWorldRotation = new THREE.Quaternion();

    this._initialLocalMatrix = this.bone.matrix.clone();
    this._initialLocalRotation = this.bone.quaternion.clone();
    this._initialLocalChildPosition = (() => {
      if (this.bone.children.length === 0) {
        // 末端のボーン。子ボーンがいないため「自分の少し先」が子ボーンということにする
        // https://github.com/dwango/UniVRM/blob/master/Assets/VRM/UniVRM/Scripts/SpringBone/VRMSpringBone.cs#L246
        return this.bone.position
          .clone()
          .normalize()
          .multiplyScalar(0.07); // magic number! derives from original source
      } else {
        const firstChild = this.bone.children[0];
        return firstChild.position.clone();
      }
    })();

    this.currentTail = this.bone.localToWorld(this._initialLocalChildPosition.clone());
    this.prevTail = this.currentTail.clone();
    this.nextTail = this.currentTail.clone();

    this.boneAxis = this._initialLocalChildPosition.clone().normalize();
    this.worldBoneLength = this.bone
      .localToWorld(_v3A.copy(this._initialLocalChildPosition))
      .sub(this.worldPosition)
      .length();
  }

  /**
   * Reset the state of this bone.
   * You might want to call [[VRMSpringBoneManager.reset]] instead.
   */
  public reset(): void {
    this.bone.matrix.copy(this._initialLocalMatrix);

    this.bone.localToWorld(this.currentTail.copy(this._initialLocalChildPosition));
    this.prevTail.copy(this.currentTail);
    this.nextTail.copy(this.currentTail);

    // ボーンの姿勢を手動で操作したので、matrixWorldも更新しておく
    this.bone.updateMatrix();
    this.bone.matrixWorld.multiplyMatrices(this.getParentMatrixWorld(), this.bone.matrix);
    this.worldPosition.setFromMatrixPosition(this.bone.matrixWorld);
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
    this.bone.matrixWorld.multiplyMatrices(this.getParentMatrixWorld(), this.bone.matrix);

    if (!!this.bone.parent) {
      // SpringBoneは親から順に処理されていくため、
      // 親のmatrixWorldは最新状態の前提でworldMatrixからquaternionを取り出す。
      // 制限はあるけれど、計算は少ないのでgetWorldQuaternionではなくこの方法を取る。
      getWorldQuaternionLite(this.bone.parent, this._parentWorldRotation);
    } else {
      this._parentWorldRotation.copy(IDENTITY_QUATERNION);
    }

    // 更新済みのworldMatrixからworldPositionを取り出す。
    // `getWorldPosition()` は負荷が高いので利用しない。
    this.worldPosition.setFromMatrixPosition(this.bone.matrixWorld);
    const stiffness = this.stiffnessForce * delta;
    const external = _v3B.copy(this.gravityDir).multiplyScalar(this.gravityPower * delta);

    // verlet積分で次の位置を計算
    this.nextTail
      .copy(this.currentTail)
      .add(
        _v3A
          .copy(this.currentTail)
          .sub(this.prevTail)
          .multiplyScalar(1 - this.dragForce),
      ) // 前フレームの移動を継続する(減衰もあるよ)
      .add(
        _v3A
          .copy(this.boneAxis)
          .applyMatrix4(this._initialLocalMatrix)
          .applyMatrix4(this.getParentMatrixWorld())
          .sub(this.worldPosition)
          .normalize()
          .multiplyScalar(stiffness),
      ) // 親の回転による子ボーンの移動目標
      .add(external); // 外力による移動量

    // normalize bone length
    this.nextTail
      .sub(this.worldPosition)
      .normalize()
      .multiplyScalar(this.worldBoneLength)
      .add(this.worldPosition);

    // Collisionで移動
    this.collision(this.nextTail);

    this.prevTail.copy(this.currentTail);
    this.currentTail.copy(this.nextTail);

    // Apply rotation, convert vector3 thing into actual quaternion
    // Original UniVRM is doing world unit calculus at here but we're gonna do this on local unit
    // since Three.js is not good at world coordination stuff
    const initialWorldMatrixInv = _matA.getInverse(
      _matB.copy(this.getParentMatrixWorld()).multiply(this._initialLocalMatrix),
    );
    const applyRotation = _quatA.setFromUnitVectors(
      this.boneAxis,
      _v3A
        .copy(this.nextTail)
        .applyMatrix4(initialWorldMatrixInv)
        .normalize(),
    );

    this.bone.quaternion.copy(this._initialLocalRotation).multiply(applyRotation);

    // We need to update its matrixWorld manually, since we tweaked the bone by our hand
    this.bone.updateMatrix();
    this.bone.matrixWorld.multiplyMatrices(this.getParentMatrixWorld(), this.bone.matrix);
  }

  /**
   * Do collision math against every colliders attached to this bone.
   *
   * @param tail The tail you want to process
   */
  private collision(tail: THREE.Vector3): void {
    this.colliders.forEach((collider) => {
      const colliderWorldPosition = _v3A.setFromMatrixPosition(collider.matrixWorld);
      const colliderRadius = collider.geometry.boundingSphere.radius;
      const r = this.radius + colliderRadius;

      if (tail.distanceToSquared(colliderWorldPosition) <= r * r) {
        // ヒット。Colliderの半径方向に押し出す
        const normal = _v3B.subVectors(tail, colliderWorldPosition).normalize();
        const posFromCollider = _v3C.addVectors(colliderWorldPosition, normal.multiplyScalar(r));

        // normalize bone length
        tail.copy(
          posFromCollider
            .sub(this.worldPosition)
            .normalize()
            .multiplyScalar(this.worldBoneLength)
            .add(this.worldPosition),
        );
      }
    });
  }

  /**
   * Returns the world matrix of its parent object.
   */
  private getParentMatrixWorld(): THREE.Matrix4 {
    return this.bone.parent ? this.bone.parent.matrixWorld : IDENTITY_MATRIX4;
  }
}
