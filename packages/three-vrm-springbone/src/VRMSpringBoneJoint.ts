import * as THREE from 'three';
import { Matrix4InverseCache } from './utils/Matrix4InverseCache';
import type { VRMSpringBoneColliderGroup } from './VRMSpringBoneColliderGroup';
import type { VRMSpringBoneJointSettings } from './VRMSpringBoneJointSettings';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { VRMSpringBoneManager } from './VRMSpringBoneManager';
import { VRMSpringBoneLimit } from './VRMSpringBoneLimit';

// based on
// http://rocketjump.skr.jp/unity3d/109/
// https://github.com/dwango/UniVRM/blob/master/Scripts/SpringBone/VRMSpringBone.cs

const IDENTITY_MATRIX4 = new THREE.Matrix4();

// 計算中の一時保存用変数（一度インスタンスを作ったらあとは使い回す）
const _v3A = new THREE.Vector3();
const _v3B = new THREE.Vector3();

/**
 * The initial local matrix in the current world space.
 * A temporary variable which is used in `update`.
 */
const _worldSpaceInitialMatrix = new THREE.Matrix4();

/**
 * The inverse of {@link _worldSpaceInitialMatrix}.
 * A temporary variable which is used in `update`.
 */
const _worldSpaceInitialMatrixInv = new THREE.Matrix4();

/**
 * A temporary variable which is used in `update`
 */
const _worldSpacePosition = new THREE.Vector3();

/**
 * A temporary variable which is used in `update`
 */
const _nextTail = new THREE.Vector3();

/**
 * A class represents a single joint of a spring bone.
 * It should be managed by a {@link VRMSpringBoneManager}.
 */
export class VRMSpringBoneJoint {
  /**
   * Settings of the bone.
   */
  public settings: VRMSpringBoneJointSettings;

  /**
   * Limit attached to this bone.
   */
  public limit: VRMSpringBoneLimit | null;

  /**
   * Collider groups attached to this bone.
   */
  public colliderGroups: VRMSpringBoneColliderGroup[];

  /**
   * An Object3D attached to this bone.
   */
  public readonly bone: THREE.Object3D;

  /**
   * An Object3D that will be used as a tail of this spring bone.
   * It can be null when the spring bone is imported from VRM 0.0.
   */
  public readonly child: THREE.Object3D | null;

  /**
   * Current position of child tail, in center unit. Will be used for verlet integration.
   */
  private _currentTail = new THREE.Vector3();

  /**
   * Previous position of child tail, in center unit. Will be used for verlet integration.
   */
  private _prevTail = new THREE.Vector3();

  /**
   * The initial axis of the child bone, in local unit.
   */
  private _boneAxis = new THREE.Vector3();

  /**
   * The length of the bone in world unit.
   * Will be used for normalization in update loop, will be updated by {@link _calcWorldSpaceBoneLength}.
   *
   * It's same as local unit length unless there are scale transformations in the world space.
   */
  private _worldSpaceBoneLength = 0.0;

  /**
   * The length of the bone in world unit.
   *
   * It's same as local unit length unless there are scale transformations in the world space.
   *
   * Intended to be used by helpers.
   */
  public get worldSpaceBoneLength(): number {
    return this._worldSpaceBoneLength;
  }

  /**
   * Set of dependencies that need to be updated before this joint.
   */
  public get dependencies(): Set<THREE.Object3D> {
    const set = new Set<THREE.Object3D>();

    const parent = this.bone.parent;
    if (parent) {
      set.add(parent);
    }

    for (let cg = 0; cg < this.colliderGroups.length; cg++) {
      for (let c = 0; c < this.colliderGroups[cg].colliders.length; c++) {
        set.add(this.colliderGroups[cg].colliders[c]);
      }
    }

    return set;
  }

  /**
   * This springbone will be calculated based on the space relative from this object.
   * If this is `null`, springbone will be calculated in world space.
   */
  private _center: THREE.Object3D | null = null;
  public get center(): THREE.Object3D | null {
    return this._center;
  }
  public set center(center: THREE.Object3D | null) {
    // uninstall inverse cache
    if (this._center?.userData.inverseCacheProxy) {
      (this._center.userData.inverseCacheProxy as Matrix4InverseCache).revert();
      delete this._center.userData.inverseCacheProxy;
    }

    // change the center
    this._center = center;

    // install inverse cache
    if (this._center) {
      if (!this._center.userData.inverseCacheProxy) {
        this._center.userData.inverseCacheProxy = new Matrix4InverseCache(this._center.matrixWorld);
      }
    }
  }

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
   * Initial state of the position of its child.
   *
   * Intended to be used by helpers.
   */
  public get initialLocalChildPosition(): THREE.Vector3 {
    return this._initialLocalChildPosition;
  }

  /**
   * Returns the world matrix of its parent object.
   * Note that it returns a reference to the matrix. Don't mutate this directly!
   */
  private get _parentMatrixWorld(): THREE.Matrix4 {
    return this.bone.parent ? this.bone.parent.matrixWorld : IDENTITY_MATRIX4;
  }

  /**
   * Create a new VRMSpringBone.
   *
   * @param bone An Object3D that will be attached to this bone
   * @param child An Object3D that will be used as a tail of this spring bone. It can be null when the spring bone is imported from VRM 0.0
   * @param settings Several parameters related to behavior of the spring bone
   * @param colliderGroups Collider groups that will be collided with this spring bone
   */
  constructor(
    bone: THREE.Object3D,
    child: THREE.Object3D | null,
    settings: Partial<VRMSpringBoneJointSettings> = {},
    colliderGroups: VRMSpringBoneColliderGroup[] = [],
  ) {
    this.bone = bone; // uniVRMでの parent
    this.bone.matrixAutoUpdate = false; // updateにより計算されるのでthree.js内での自動処理は不要

    this.child = child;

    this.settings = {
      hitRadius: settings.hitRadius ?? 0.0,
      stiffness: settings.stiffness ?? 1.0,
      gravityPower: settings.gravityPower ?? 0.0,
      gravityDir: settings.gravityDir?.clone() ?? new THREE.Vector3(0.0, -1.0, 0.0),
      dragForce: settings.dragForce ?? 0.4,
    };

    this.limit = null;

    this.colliderGroups = colliderGroups;
  }

  /**
   * Set the initial state of this spring bone.
   * You might want to call {@link VRMSpringBoneManager.setInitState} instead.
   */
  public setInitState(): void {
    // remember initial position of itself
    this._initialLocalMatrix.copy(this.bone.matrix);
    this._initialLocalRotation.copy(this.bone.quaternion);

    // see initial position of its local child
    if (this.child) {
      this._initialLocalChildPosition.copy(this.child.position);
    } else {
      // vrm0 requires a 7cm fixed bone length for the final node in a chain
      // See: https://github.com/vrm-c/vrm-specification/tree/master/specification/VRMC_springBone-1.0#about-spring-configuration
      this._initialLocalChildPosition.copy(this.bone.position).normalize().multiplyScalar(0.07);
    }

    // copy the child position to tails
    const matrixWorldToCenter = this._getMatrixWorldToCenter();
    this.bone.localToWorld(this._currentTail.copy(this._initialLocalChildPosition)).applyMatrix4(matrixWorldToCenter);
    this._prevTail.copy(this._currentTail);

    // set initial states that are related to local child position
    this._boneAxis.copy(this._initialLocalChildPosition).normalize();
  }

  /**
   * Reset the state of this bone.
   * You might want to call {@link VRMSpringBoneManager.reset} instead.
   */
  public reset(): void {
    this.bone.quaternion.copy(this._initialLocalRotation);

    // We need to update its matrixWorld manually, since we tweaked the bone by our hand
    this.bone.updateMatrix();
    this.bone.matrixWorld.multiplyMatrices(this._parentMatrixWorld, this.bone.matrix);

    // Apply updated position to tail states
    const matrixWorldToCenter = this._getMatrixWorldToCenter();
    this.bone.localToWorld(this._currentTail.copy(this._initialLocalChildPosition)).applyMatrix4(matrixWorldToCenter);
    this._prevTail.copy(this._currentTail);
  }

  /**
   * Update the state of this bone.
   * You might want to call {@link VRMSpringBoneManager.update} instead.
   *
   * @param delta deltaTime
   */
  public update(delta: number): void {
    if (delta <= 0) return;

    // Update the _worldSpaceBoneLength
    this._calcWorldSpaceBoneLength();

    // Set temporary variables
    _worldSpaceInitialMatrix.copy(this._parentMatrixWorld).multiply(this._initialLocalMatrix);
    _worldSpaceInitialMatrixInv.copy(_worldSpaceInitialMatrix).invert();
    _worldSpacePosition.setFromMatrixPosition(this.bone.matrixWorld);

    // Precalc the rotation of the limit
    this.limit?.internalPrecalcRotation?.(_worldSpaceInitialMatrix, this._boneAxis);

    // Get boneAxis in world space
    const worldSpaceBoneAxis = _v3B.copy(this._boneAxis).transformDirection(_worldSpaceInitialMatrix);

    // verlet積分で次の位置を計算
    _nextTail
      // Determine inertia in center space
      .copy(this._currentTail)
      .add(_v3A.subVectors(this._currentTail, this._prevTail).multiplyScalar(1 - this.settings.dragForce)) // 前フレームの移動を継続する(減衰もあるよ)
      // Convert center space to world space
      .applyMatrix4(this._getMatrixCenterToWorld()) // tailをworld spaceに戻す
      // Apply stiffness and gravity in world space
      .addScaledVector(worldSpaceBoneAxis, this.settings.stiffness * delta) // 親の回転による子ボーンの移動目標
      .addScaledVector(this.settings.gravityDir, this.settings.gravityPower * delta); // 外力による移動量

    // Apply limit - 1st time
    _nextTail.sub(_worldSpacePosition).normalize();
    this.limit?.calculateLimit(_nextTail);
    _nextTail.multiplyScalar(this._worldSpaceBoneLength).add(_worldSpacePosition);

    // Calculate collisions
    this._collision(_nextTail);

    // update prevTail and currentTail
    this._prevTail.copy(this._currentTail);
    this._currentTail.copy(_nextTail).applyMatrix4(this._getMatrixWorldToCenter());

    // Apply rotation, convert vector3 thing into actual quaternion
    // Original UniVRM is doing center unit calculus at here but we're gonna do this on local unit
    this.bone.quaternion
      .setFromUnitVectors(this._boneAxis, _v3A.copy(_nextTail).applyMatrix4(_worldSpaceInitialMatrixInv).normalize())
      .premultiply(this._initialLocalRotation);

    // We need to update its matrixWorld manually, since we tweaked the bone by our hand
    this.bone.updateMatrix();
    this.bone.matrixWorld.multiplyMatrices(this._parentMatrixWorld, this.bone.matrix);
  }

  /**
   * Do collision math against every colliders attached to this bone.
   *
   * @param tail The tail you want to process
   */
  private _collision(tail: THREE.Vector3): void {
    for (let cg = 0; cg < this.colliderGroups.length; cg++) {
      for (let c = 0; c < this.colliderGroups[cg].colliders.length; c++) {
        const collider = this.colliderGroups[cg].colliders[c];
        const dist = collider.shape.calculateCollision(collider.colliderMatrix, tail, this.settings.hitRadius, _v3A);

        if (dist < 0.0) {
          // hit
          tail.addScaledVector(_v3A, -dist);

          // Apply limit
          tail.sub(_worldSpacePosition).normalize();
          this.limit?.calculateLimit(tail);
          tail.multiplyScalar(this._worldSpaceBoneLength).add(_worldSpacePosition);
        }
      }
    }
  }

  /**
   * Calculate the {@link _worldSpaceBoneLength}.
   * Intended to be used in {@link update}.
   */
  private _calcWorldSpaceBoneLength(): void {
    _v3A.setFromMatrixPosition(this.bone.matrixWorld); // get world position of this.bone

    if (this.child) {
      _v3B.setFromMatrixPosition(this.child.matrixWorld); // get world position of this.child
    } else {
      _v3B.copy(this._initialLocalChildPosition);
      _v3B.applyMatrix4(this.bone.matrixWorld);
    }

    this._worldSpaceBoneLength = _v3A.sub(_v3B).length();
  }

  /**
   * Create a matrix that converts center space into world space.
   */
  private _getMatrixCenterToWorld(): THREE.Matrix4 {
    return this._center ? this._center.matrixWorld : IDENTITY_MATRIX4;
  }

  /**
   * Create a matrix that converts world space into center space.
   */
  private _getMatrixWorldToCenter(): THREE.Matrix4 {
    return this._center ? (this._center.userData.inverseCacheProxy as Matrix4InverseCache).inverse : IDENTITY_MATRIX4;
  }
}
