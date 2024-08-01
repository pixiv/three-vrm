/*!
 * @pixiv/three-vrm-springbone v3.0.0-beta.2
 * Spring bone module for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2024 pixiv Inc.
 * @pixiv/three-vrm-springbone is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.ts
var src_exports = {};
__export(src_exports, {
  VRMSpringBoneCollider: () => VRMSpringBoneCollider,
  VRMSpringBoneColliderHelper: () => VRMSpringBoneColliderHelper,
  VRMSpringBoneColliderShape: () => VRMSpringBoneColliderShape,
  VRMSpringBoneColliderShapeCapsule: () => VRMSpringBoneColliderShapeCapsule,
  VRMSpringBoneColliderShapeSphere: () => VRMSpringBoneColliderShapeSphere,
  VRMSpringBoneJoint: () => VRMSpringBoneJoint,
  VRMSpringBoneJointHelper: () => VRMSpringBoneJointHelper,
  VRMSpringBoneLoaderPlugin: () => VRMSpringBoneLoaderPlugin,
  VRMSpringBoneManager: () => VRMSpringBoneManager
});
module.exports = __toCommonJS(src_exports);

// src/helpers/VRMSpringBoneColliderHelper.ts
var THREE5 = __toESM(require("three"), 1);

// src/VRMSpringBoneColliderShapeCapsule.ts
var THREE = __toESM(require("three"), 1);

// src/VRMSpringBoneColliderShape.ts
var VRMSpringBoneColliderShape = class {
};

// src/VRMSpringBoneColliderShapeCapsule.ts
var _v3A = new THREE.Vector3();
var _v3B = new THREE.Vector3();
var VRMSpringBoneColliderShapeCapsule = class extends VRMSpringBoneColliderShape {
  get type() {
    return "capsule";
  }
  constructor(params) {
    var _a, _b, _c;
    super();
    this.offset = (_a = params == null ? void 0 : params.offset) != null ? _a : new THREE.Vector3(0, 0, 0);
    this.tail = (_b = params == null ? void 0 : params.tail) != null ? _b : new THREE.Vector3(0, 0, 0);
    this.radius = (_c = params == null ? void 0 : params.radius) != null ? _c : 0;
  }
  calculateCollision(colliderMatrix, objectPosition, objectRadius, target) {
    _v3A.copy(this.offset).applyMatrix4(colliderMatrix);
    _v3B.copy(this.tail).applyMatrix4(colliderMatrix);
    _v3B.sub(_v3A);
    const lengthSqCapsule = _v3B.lengthSq();
    target.copy(objectPosition).sub(_v3A);
    const dot = _v3B.dot(target);
    if (dot <= 0) {
    } else if (lengthSqCapsule <= dot) {
      target.sub(_v3B);
    } else {
      _v3B.multiplyScalar(dot / lengthSqCapsule);
      target.sub(_v3B);
    }
    const radius = objectRadius + this.radius;
    const distance = target.length() - radius;
    target.normalize();
    return distance;
  }
};

// src/VRMSpringBoneColliderShapeSphere.ts
var THREE2 = __toESM(require("three"), 1);
var VRMSpringBoneColliderShapeSphere = class extends VRMSpringBoneColliderShape {
  get type() {
    return "sphere";
  }
  constructor(params) {
    var _a, _b;
    super();
    this.offset = (_a = params == null ? void 0 : params.offset) != null ? _a : new THREE2.Vector3(0, 0, 0);
    this.radius = (_b = params == null ? void 0 : params.radius) != null ? _b : 0;
  }
  calculateCollision(colliderMatrix, objectPosition, objectRadius, target) {
    target.copy(this.offset).applyMatrix4(colliderMatrix);
    target.negate().add(objectPosition);
    const radius = objectRadius + this.radius;
    const distance = target.length() - radius;
    target.normalize();
    return distance;
  }
};

// src/helpers/utils/ColliderShapeCapsuleBufferGeometry.ts
var THREE3 = __toESM(require("three"), 1);
var _v3A2 = new THREE3.Vector3();
var ColliderShapeCapsuleBufferGeometry = class extends THREE3.BufferGeometry {
  constructor(shape) {
    super();
    this.worldScale = 1;
    this._currentRadius = 0;
    this._currentOffset = new THREE3.Vector3();
    this._currentTail = new THREE3.Vector3();
    this._shape = shape;
    this._attrPos = new THREE3.BufferAttribute(new Float32Array(396), 3);
    this.setAttribute("position", this._attrPos);
    this._attrIndex = new THREE3.BufferAttribute(new Uint16Array(264), 1);
    this.setIndex(this._attrIndex);
    this._buildIndex();
    this.update();
  }
  update() {
    let shouldUpdateGeometry = false;
    const radius = this._shape.radius / this.worldScale;
    if (this._currentRadius !== radius) {
      this._currentRadius = radius;
      shouldUpdateGeometry = true;
    }
    if (!this._currentOffset.equals(this._shape.offset)) {
      this._currentOffset.copy(this._shape.offset);
      shouldUpdateGeometry = true;
    }
    const tail = _v3A2.copy(this._shape.tail).divideScalar(this.worldScale);
    if (this._currentTail.distanceToSquared(tail) > 1e-10) {
      this._currentTail.copy(tail);
      shouldUpdateGeometry = true;
    }
    if (shouldUpdateGeometry) {
      this._buildPosition();
    }
  }
  _buildPosition() {
    _v3A2.copy(this._currentTail).sub(this._currentOffset);
    const l = _v3A2.length() / this._currentRadius;
    for (let i = 0; i <= 16; i++) {
      const t = i / 16 * Math.PI;
      this._attrPos.setXYZ(i, -Math.sin(t), -Math.cos(t), 0);
      this._attrPos.setXYZ(17 + i, l + Math.sin(t), Math.cos(t), 0);
      this._attrPos.setXYZ(34 + i, -Math.sin(t), 0, -Math.cos(t));
      this._attrPos.setXYZ(51 + i, l + Math.sin(t), 0, Math.cos(t));
    }
    for (let i = 0; i < 32; i++) {
      const t = i / 16 * Math.PI;
      this._attrPos.setXYZ(68 + i, 0, Math.sin(t), Math.cos(t));
      this._attrPos.setXYZ(100 + i, l, Math.sin(t), Math.cos(t));
    }
    const theta = Math.atan2(_v3A2.y, Math.sqrt(_v3A2.x * _v3A2.x + _v3A2.z * _v3A2.z));
    const phi = -Math.atan2(_v3A2.z, _v3A2.x);
    this.rotateZ(theta);
    this.rotateY(phi);
    this.scale(this._currentRadius, this._currentRadius, this._currentRadius);
    this.translate(this._currentOffset.x, this._currentOffset.y, this._currentOffset.z);
    this._attrPos.needsUpdate = true;
  }
  _buildIndex() {
    for (let i = 0; i < 34; i++) {
      const i1 = (i + 1) % 34;
      this._attrIndex.setXY(i * 2, i, i1);
      this._attrIndex.setXY(68 + i * 2, 34 + i, 34 + i1);
    }
    for (let i = 0; i < 32; i++) {
      const i1 = (i + 1) % 32;
      this._attrIndex.setXY(136 + i * 2, 68 + i, 68 + i1);
      this._attrIndex.setXY(200 + i * 2, 100 + i, 100 + i1);
    }
    this._attrIndex.needsUpdate = true;
  }
};

// src/helpers/utils/ColliderShapeSphereBufferGeometry.ts
var THREE4 = __toESM(require("three"), 1);
var ColliderShapeSphereBufferGeometry = class extends THREE4.BufferGeometry {
  constructor(shape) {
    super();
    this.worldScale = 1;
    this._currentRadius = 0;
    this._currentOffset = new THREE4.Vector3();
    this._shape = shape;
    this._attrPos = new THREE4.BufferAttribute(new Float32Array(32 * 3 * 3), 3);
    this.setAttribute("position", this._attrPos);
    this._attrIndex = new THREE4.BufferAttribute(new Uint16Array(64 * 3), 1);
    this.setIndex(this._attrIndex);
    this._buildIndex();
    this.update();
  }
  update() {
    let shouldUpdateGeometry = false;
    const radius = this._shape.radius / this.worldScale;
    if (this._currentRadius !== radius) {
      this._currentRadius = radius;
      shouldUpdateGeometry = true;
    }
    if (!this._currentOffset.equals(this._shape.offset)) {
      this._currentOffset.copy(this._shape.offset);
      shouldUpdateGeometry = true;
    }
    if (shouldUpdateGeometry) {
      this._buildPosition();
    }
  }
  _buildPosition() {
    for (let i = 0; i < 32; i++) {
      const t = i / 16 * Math.PI;
      this._attrPos.setXYZ(i, Math.cos(t), Math.sin(t), 0);
      this._attrPos.setXYZ(32 + i, 0, Math.cos(t), Math.sin(t));
      this._attrPos.setXYZ(64 + i, Math.sin(t), 0, Math.cos(t));
    }
    this.scale(this._currentRadius, this._currentRadius, this._currentRadius);
    this.translate(this._currentOffset.x, this._currentOffset.y, this._currentOffset.z);
    this._attrPos.needsUpdate = true;
  }
  _buildIndex() {
    for (let i = 0; i < 32; i++) {
      const i1 = (i + 1) % 32;
      this._attrIndex.setXY(i * 2, i, i1);
      this._attrIndex.setXY(64 + i * 2, 32 + i, 32 + i1);
      this._attrIndex.setXY(128 + i * 2, 64 + i, 64 + i1);
    }
    this._attrIndex.needsUpdate = true;
  }
};

// src/helpers/VRMSpringBoneColliderHelper.ts
var _v3A3 = new THREE5.Vector3();
var VRMSpringBoneColliderHelper = class extends THREE5.Group {
  constructor(collider) {
    super();
    this.matrixAutoUpdate = false;
    this.collider = collider;
    if (this.collider.shape instanceof VRMSpringBoneColliderShapeSphere) {
      this._geometry = new ColliderShapeSphereBufferGeometry(this.collider.shape);
    } else if (this.collider.shape instanceof VRMSpringBoneColliderShapeCapsule) {
      this._geometry = new ColliderShapeCapsuleBufferGeometry(this.collider.shape);
    } else {
      throw new Error("VRMSpringBoneColliderHelper: Unknown collider shape type detected");
    }
    const material = new THREE5.LineBasicMaterial({
      color: 16711935,
      depthTest: false,
      depthWrite: false
    });
    this._line = new THREE5.LineSegments(this._geometry, material);
    this.add(this._line);
  }
  dispose() {
    this._geometry.dispose();
  }
  updateMatrixWorld(force) {
    this.collider.updateWorldMatrix(true, false);
    this.matrix.copy(this.collider.matrixWorld);
    const matrixWorldElements = this.matrix.elements;
    this._geometry.worldScale = _v3A3.set(matrixWorldElements[0], matrixWorldElements[1], matrixWorldElements[2]).length();
    this._geometry.update();
    super.updateMatrixWorld(force);
  }
};

// src/helpers/VRMSpringBoneJointHelper.ts
var THREE7 = __toESM(require("three"), 1);

// src/helpers/utils/SpringBoneBufferGeometry.ts
var THREE6 = __toESM(require("three"), 1);
var SpringBoneBufferGeometry = class extends THREE6.BufferGeometry {
  constructor(springBone) {
    super();
    this.worldScale = 1;
    this._currentRadius = 0;
    this._currentTail = new THREE6.Vector3();
    this._springBone = springBone;
    this._attrPos = new THREE6.BufferAttribute(new Float32Array(294), 3);
    this.setAttribute("position", this._attrPos);
    this._attrIndex = new THREE6.BufferAttribute(new Uint16Array(194), 1);
    this.setIndex(this._attrIndex);
    this._buildIndex();
    this.update();
  }
  update() {
    let shouldUpdateGeometry = false;
    const radius = this._springBone.settings.hitRadius / this.worldScale;
    if (this._currentRadius !== radius) {
      this._currentRadius = radius;
      shouldUpdateGeometry = true;
    }
    if (!this._currentTail.equals(this._springBone.initialLocalChildPosition)) {
      this._currentTail.copy(this._springBone.initialLocalChildPosition);
      shouldUpdateGeometry = true;
    }
    if (shouldUpdateGeometry) {
      this._buildPosition();
    }
  }
  _buildPosition() {
    for (let i = 0; i < 32; i++) {
      const t = i / 16 * Math.PI;
      this._attrPos.setXYZ(i, Math.cos(t), Math.sin(t), 0);
      this._attrPos.setXYZ(32 + i, 0, Math.cos(t), Math.sin(t));
      this._attrPos.setXYZ(64 + i, Math.sin(t), 0, Math.cos(t));
    }
    this.scale(this._currentRadius, this._currentRadius, this._currentRadius);
    this.translate(this._currentTail.x, this._currentTail.y, this._currentTail.z);
    this._attrPos.setXYZ(96, 0, 0, 0);
    this._attrPos.setXYZ(97, this._currentTail.x, this._currentTail.y, this._currentTail.z);
    this._attrPos.needsUpdate = true;
  }
  _buildIndex() {
    for (let i = 0; i < 32; i++) {
      const i1 = (i + 1) % 32;
      this._attrIndex.setXY(i * 2, i, i1);
      this._attrIndex.setXY(64 + i * 2, 32 + i, 32 + i1);
      this._attrIndex.setXY(128 + i * 2, 64 + i, 64 + i1);
    }
    this._attrIndex.setXY(192, 96, 97);
    this._attrIndex.needsUpdate = true;
  }
};

// src/helpers/VRMSpringBoneJointHelper.ts
var _v3A4 = new THREE7.Vector3();
var VRMSpringBoneJointHelper = class extends THREE7.Group {
  constructor(springBone) {
    super();
    this.matrixAutoUpdate = false;
    this.springBone = springBone;
    this._geometry = new SpringBoneBufferGeometry(this.springBone);
    const material = new THREE7.LineBasicMaterial({
      color: 16776960,
      depthTest: false,
      depthWrite: false
    });
    this._line = new THREE7.LineSegments(this._geometry, material);
    this.add(this._line);
  }
  dispose() {
    this._geometry.dispose();
  }
  updateMatrixWorld(force) {
    this.springBone.bone.updateWorldMatrix(true, false);
    this.matrix.copy(this.springBone.bone.matrixWorld);
    const matrixWorldElements = this.matrix.elements;
    this._geometry.worldScale = _v3A4.set(matrixWorldElements[0], matrixWorldElements[1], matrixWorldElements[2]).length();
    this._geometry.update();
    super.updateMatrixWorld(force);
  }
};

// src/VRMSpringBoneCollider.ts
var THREE8 = __toESM(require("three"), 1);
var VRMSpringBoneCollider = class extends THREE8.Object3D {
  constructor(shape) {
    super();
    this.shape = shape;
  }
};

// src/VRMSpringBoneJoint.ts
var THREE11 = __toESM(require("three"), 1);

// src/utils/mat4InvertCompat.ts
var THREE9 = __toESM(require("three"), 1);
var _matA = new THREE9.Matrix4();
function mat4InvertCompat(target) {
  if (target.invert) {
    target.invert();
  } else {
    target.getInverse(_matA.copy(target));
  }
  return target;
}

// src/utils/Matrix4InverseCache.ts
var THREE10 = __toESM(require("three"), 1);
var Matrix4InverseCache = class {
  constructor(matrix) {
    /**
     * A cache of inverse of current matrix.
     */
    this._inverseCache = new THREE10.Matrix4();
    /**
     * A flag that makes it want to recalculate its {@link _inverseCache}.
     * Will be set `true` when `elements` are mutated and be used in `getInverse`.
     */
    this._shouldUpdateInverse = true;
    this.matrix = matrix;
    const handler = {
      set: (obj, prop, newVal) => {
        this._shouldUpdateInverse = true;
        obj[prop] = newVal;
        return true;
      }
    };
    this._originalElements = matrix.elements;
    matrix.elements = new Proxy(matrix.elements, handler);
  }
  /**
   * Inverse of given matrix.
   * Note that it will return its internal private instance.
   * Make sure copying this before mutate this.
   */
  get inverse() {
    if (this._shouldUpdateInverse) {
      mat4InvertCompat(this._inverseCache.copy(this.matrix));
      this._shouldUpdateInverse = false;
    }
    return this._inverseCache;
  }
  revert() {
    this.matrix.elements = this._originalElements;
  }
};

// src/VRMSpringBoneJoint.ts
var IDENTITY_MATRIX4 = new THREE11.Matrix4();
var _v3A5 = new THREE11.Vector3();
var _v3B2 = new THREE11.Vector3();
var _v3C = new THREE11.Vector3();
var _worldSpacePosition = new THREE11.Vector3();
var _centerSpacePosition = new THREE11.Vector3();
var _nextTail = new THREE11.Vector3();
var _quatA = new THREE11.Quaternion();
var _matA2 = new THREE11.Matrix4();
var _matB = new THREE11.Matrix4();
var VRMSpringBoneJoint = class {
  /**
   * Create a new VRMSpringBone.
   *
   * @param bone An Object3D that will be attached to this bone
   * @param child An Object3D that will be used as a tail of this spring bone. It can be null when the spring bone is imported from VRM 0.0
   * @param settings Several parameters related to behavior of the spring bone
   * @param colliderGroups Collider groups that will be collided with this spring bone
   */
  constructor(bone, child, settings = {}, colliderGroups = []) {
    /**
     * Current position of child tail, in center unit. Will be used for verlet integration.
     */
    this._currentTail = new THREE11.Vector3();
    /**
     * Previous position of child tail, in center unit. Will be used for verlet integration.
     */
    this._prevTail = new THREE11.Vector3();
    /**
     * Initial axis of the bone, in local unit.
     */
    this._boneAxis = new THREE11.Vector3();
    /**
     * Length of the bone in world unit.
     * Will be used for normalization in update loop, will be updated by {@link _calcWorldSpaceBoneLength}.
     *
     * It's same as local unit length unless there are scale transformations in the world space.
     */
    this._worldSpaceBoneLength = 0;
    /**
     * This springbone will be calculated based on the space relative from this object.
     * If this is `null`, springbone will be calculated in world space.
     */
    this._center = null;
    /**
     * Initial state of the local matrix of the bone.
     */
    this._initialLocalMatrix = new THREE11.Matrix4();
    /**
     * Initial state of the rotation of the bone.
     */
    this._initialLocalRotation = new THREE11.Quaternion();
    /**
     * Initial state of the position of its child.
     */
    this._initialLocalChildPosition = new THREE11.Vector3();
    var _a, _b, _c, _d, _e, _f;
    this.bone = bone;
    this.bone.matrixAutoUpdate = false;
    this.child = child;
    this.settings = {
      hitRadius: (_a = settings.hitRadius) != null ? _a : 0,
      stiffness: (_b = settings.stiffness) != null ? _b : 1,
      gravityPower: (_c = settings.gravityPower) != null ? _c : 0,
      gravityDir: (_e = (_d = settings.gravityDir) == null ? void 0 : _d.clone()) != null ? _e : new THREE11.Vector3(0, -1, 0),
      dragForce: (_f = settings.dragForce) != null ? _f : 0.4
    };
    this.colliderGroups = colliderGroups;
  }
  get center() {
    return this._center;
  }
  set center(center) {
    var _a;
    if ((_a = this._center) == null ? void 0 : _a.userData.inverseCacheProxy) {
      this._center.userData.inverseCacheProxy.revert();
      delete this._center.userData.inverseCacheProxy;
    }
    this._center = center;
    if (this._center) {
      if (!this._center.userData.inverseCacheProxy) {
        this._center.userData.inverseCacheProxy = new Matrix4InverseCache(this._center.matrixWorld);
      }
    }
  }
  get initialLocalChildPosition() {
    return this._initialLocalChildPosition;
  }
  /**
   * Returns the world matrix of its parent object.
   * Note that it returns a reference to the matrix. Don't mutate this directly!
   */
  get _parentMatrixWorld() {
    return this.bone.parent ? this.bone.parent.matrixWorld : IDENTITY_MATRIX4;
  }
  /**
   * Set the initial state of this spring bone.
   * You might want to call {@link VRMSpringBoneManager.setInitState} instead.
   */
  setInitState() {
    this._initialLocalMatrix.copy(this.bone.matrix);
    this._initialLocalRotation.copy(this.bone.quaternion);
    if (this.child) {
      this._initialLocalChildPosition.copy(this.child.position);
    } else {
      this._initialLocalChildPosition.copy(this.bone.position).normalize().multiplyScalar(0.07);
    }
    const matrixWorldToCenter = this._getMatrixWorldToCenter(_matA2);
    this.bone.localToWorld(this._currentTail.copy(this._initialLocalChildPosition)).applyMatrix4(matrixWorldToCenter);
    this._prevTail.copy(this._currentTail);
    this._boneAxis.copy(this._initialLocalChildPosition).normalize();
  }
  /**
   * Reset the state of this bone.
   * You might want to call [[VRMSpringBoneManager.reset]] instead.
   */
  reset() {
    this.bone.quaternion.copy(this._initialLocalRotation);
    this.bone.updateMatrix();
    this.bone.matrixWorld.multiplyMatrices(this._parentMatrixWorld, this.bone.matrix);
    const matrixWorldToCenter = this._getMatrixWorldToCenter(_matA2);
    this.bone.localToWorld(this._currentTail.copy(this._initialLocalChildPosition)).applyMatrix4(matrixWorldToCenter);
    this._prevTail.copy(this._currentTail);
  }
  /**
   * Update the state of this bone.
   * You might want to call [[VRMSpringBoneManager.update]] instead.
   *
   * @param delta deltaTime
   */
  update(delta) {
    if (delta <= 0) return;
    this._calcWorldSpaceBoneLength();
    _worldSpacePosition.setFromMatrixPosition(this.bone.matrixWorld);
    let matrixWorldToCenter = this._getMatrixWorldToCenter(_matA2);
    _centerSpacePosition.copy(_worldSpacePosition).applyMatrix4(matrixWorldToCenter);
    const quatWorldToCenter = _quatA.setFromRotationMatrix(matrixWorldToCenter);
    const centerSpaceParentMatrix = _matB.copy(matrixWorldToCenter).multiply(this._parentMatrixWorld);
    const centerSpaceBoneAxis = _v3B2.copy(this._boneAxis).applyMatrix4(this._initialLocalMatrix).applyMatrix4(centerSpaceParentMatrix).sub(_centerSpacePosition).normalize();
    const centerSpaceGravity = _v3C.copy(this.settings.gravityDir).applyQuaternion(quatWorldToCenter).normalize();
    const matrixCenterToWorld = this._getMatrixCenterToWorld(_matA2);
    _nextTail.copy(this._currentTail).add(
      _v3A5.copy(this._currentTail).sub(this._prevTail).multiplyScalar(1 - this.settings.dragForce)
    ).add(_v3A5.copy(centerSpaceBoneAxis).multiplyScalar(this.settings.stiffness * delta)).add(_v3A5.copy(centerSpaceGravity).multiplyScalar(this.settings.gravityPower * delta)).applyMatrix4(matrixCenterToWorld);
    _nextTail.sub(_worldSpacePosition).normalize().multiplyScalar(this._worldSpaceBoneLength).add(_worldSpacePosition);
    this._collision(_nextTail);
    matrixWorldToCenter = this._getMatrixWorldToCenter(_matA2);
    this._prevTail.copy(this._currentTail);
    this._currentTail.copy(_v3A5.copy(_nextTail).applyMatrix4(matrixWorldToCenter));
    const worldSpaceInitialMatrixInv = mat4InvertCompat(
      _matA2.copy(this._parentMatrixWorld).multiply(this._initialLocalMatrix)
    );
    const applyRotation = _quatA.setFromUnitVectors(
      this._boneAxis,
      _v3A5.copy(_nextTail).applyMatrix4(worldSpaceInitialMatrixInv).normalize()
    );
    this.bone.quaternion.copy(this._initialLocalRotation).multiply(applyRotation);
    this.bone.updateMatrix();
    this.bone.matrixWorld.multiplyMatrices(this._parentMatrixWorld, this.bone.matrix);
  }
  /**
   * Do collision math against every colliders attached to this bone.
   *
   * @param tail The tail you want to process
   */
  _collision(tail) {
    this.colliderGroups.forEach((colliderGroup) => {
      colliderGroup.colliders.forEach((collider) => {
        const dist = collider.shape.calculateCollision(collider.matrixWorld, tail, this.settings.hitRadius, _v3A5);
        if (dist < 0) {
          tail.add(_v3A5.multiplyScalar(-dist));
          tail.sub(_worldSpacePosition).normalize().multiplyScalar(this._worldSpaceBoneLength).add(_worldSpacePosition);
        }
      });
    });
  }
  /**
   * Calculate the {@link _worldSpaceBoneLength}.
   * Intended to be used in {@link update}.
   */
  _calcWorldSpaceBoneLength() {
    _v3A5.setFromMatrixPosition(this.bone.matrixWorld);
    if (this.child) {
      _v3B2.setFromMatrixPosition(this.child.matrixWorld);
    } else {
      _v3B2.copy(this._initialLocalChildPosition);
      _v3B2.applyMatrix4(this.bone.matrixWorld);
    }
    this._worldSpaceBoneLength = _v3A5.sub(_v3B2).length();
  }
  /**
   * Create a matrix that converts center space into world space.
   * @param target Target matrix
   */
  _getMatrixCenterToWorld(target) {
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
  _getMatrixWorldToCenter(target) {
    if (this._center) {
      target.copy(this._center.userData.inverseCacheProxy.inverse);
    } else {
      target.identity();
    }
    return target;
  }
};

// src/VRMSpringBoneLoaderPlugin.ts
var THREE12 = __toESM(require("three"), 1);

// src/utils/traverseAncestorsFromRoot.ts
function traverseAncestorsFromRoot(object, callback) {
  const ancestors = [];
  let head = object;
  while (head !== null) {
    ancestors.unshift(head);
    head = head.parent;
  }
  ancestors.forEach((ancestor) => {
    callback(ancestor);
  });
}

// src/utils/traverseChildrenUntilConditionMet.ts
function traverseChildrenUntilConditionMet(object, callback) {
  object.children.forEach((child) => {
    const result = callback(child);
    if (!result) {
      traverseChildrenUntilConditionMet(child, callback);
    }
  });
}

// src/VRMSpringBoneManager.ts
var VRMSpringBoneManager = class {
  constructor() {
    this._joints = /* @__PURE__ */ new Set();
    this._objectSpringBonesMap = /* @__PURE__ */ new Map();
  }
  get joints() {
    return this._joints;
  }
  /**
   * @deprecated Use {@link joints} instead.
   */
  get springBones() {
    console.warn("VRMSpringBoneManager: springBones is deprecated. use joints instead.");
    return this._joints;
  }
  get colliderGroups() {
    const set = /* @__PURE__ */ new Set();
    this._joints.forEach((springBone) => {
      springBone.colliderGroups.forEach((colliderGroup) => {
        set.add(colliderGroup);
      });
    });
    return Array.from(set);
  }
  get colliders() {
    const set = /* @__PURE__ */ new Set();
    this.colliderGroups.forEach((colliderGroup) => {
      colliderGroup.colliders.forEach((collider) => {
        set.add(collider);
      });
    });
    return Array.from(set);
  }
  addJoint(joint) {
    this._joints.add(joint);
    let objectSet = this._objectSpringBonesMap.get(joint.bone);
    if (objectSet == null) {
      objectSet = /* @__PURE__ */ new Set();
      this._objectSpringBonesMap.set(joint.bone, objectSet);
    }
    objectSet.add(joint);
  }
  /**
   * @deprecated Use {@link addJoint} instead.
   */
  addSpringBone(joint) {
    console.warn("VRMSpringBoneManager: addSpringBone() is deprecated. use addJoint() instead.");
    this.addJoint(joint);
  }
  deleteJoint(joint) {
    this._joints.delete(joint);
    const objectSet = this._objectSpringBonesMap.get(joint.bone);
    objectSet.delete(joint);
  }
  /**
   * @deprecated Use {@link deleteJoint} instead.
   */
  deleteSpringBone(joint) {
    console.warn("VRMSpringBoneManager: deleteSpringBone() is deprecated. use deleteJoint() instead.");
    this.deleteJoint(joint);
  }
  setInitState() {
    const springBonesTried = /* @__PURE__ */ new Set();
    const springBonesDone = /* @__PURE__ */ new Set();
    const objectUpdated = /* @__PURE__ */ new Set();
    for (const springBone of this._joints) {
      this._processSpringBone(
        springBone,
        springBonesTried,
        springBonesDone,
        objectUpdated,
        (springBone2) => springBone2.setInitState()
      );
    }
  }
  reset() {
    const springBonesTried = /* @__PURE__ */ new Set();
    const springBonesDone = /* @__PURE__ */ new Set();
    const objectUpdated = /* @__PURE__ */ new Set();
    for (const springBone of this._joints) {
      this._processSpringBone(
        springBone,
        springBonesTried,
        springBonesDone,
        objectUpdated,
        (springBone2) => springBone2.reset()
      );
    }
  }
  update(delta) {
    const springBonesTried = /* @__PURE__ */ new Set();
    const springBonesDone = /* @__PURE__ */ new Set();
    const objectUpdated = /* @__PURE__ */ new Set();
    for (const springBone of this._joints) {
      this._processSpringBone(
        springBone,
        springBonesTried,
        springBonesDone,
        objectUpdated,
        (springBone2) => springBone2.update(delta)
      );
      traverseChildrenUntilConditionMet(springBone.bone, (object) => {
        var _a, _b;
        if (((_b = (_a = this._objectSpringBonesMap.get(object)) == null ? void 0 : _a.size) != null ? _b : 0) > 0) {
          return true;
        }
        object.updateWorldMatrix(false, false);
        return false;
      });
    }
  }
  /**
   * Update a spring bone.
   * If there are other spring bone that are dependant, it will try to update them recursively.
   * It updates matrixWorld of all ancestors and myself.
   * It might throw an error if there are circular dependencies.
   *
   * Intended to be used in {@link update} and {@link _processSpringBone} itself recursively.
   *
   * @param springBone A springBone you want to update
   * @param springBonesTried Set of springBones that are already tried to be updated
   * @param springBonesDone Set of springBones that are already up to date
   * @param objectUpdated Set of object3D whose matrixWorld is updated
   */
  _processSpringBone(springBone, springBonesTried, springBonesDone, objectUpdated, callback) {
    if (springBonesDone.has(springBone)) {
      return;
    }
    if (springBonesTried.has(springBone)) {
      throw new Error("VRMSpringBoneManager: Circular dependency detected while updating springbones");
    }
    springBonesTried.add(springBone);
    const depObjects = this._getDependencies(springBone);
    for (const depObject of depObjects) {
      traverseAncestorsFromRoot(depObject, (depObjectAncestor) => {
        const objectSet = this._objectSpringBonesMap.get(depObjectAncestor);
        if (objectSet) {
          for (const depSpringBone of objectSet) {
            this._processSpringBone(depSpringBone, springBonesTried, springBonesDone, objectUpdated, callback);
          }
        } else if (!objectUpdated.has(depObjectAncestor)) {
          depObjectAncestor.updateWorldMatrix(false, false);
          objectUpdated.add(depObjectAncestor);
        }
      });
    }
    springBone.bone.updateMatrix();
    springBone.bone.updateWorldMatrix(false, false);
    callback(springBone);
    objectUpdated.add(springBone.bone);
    springBonesDone.add(springBone);
  }
  /**
   * Return a set of objects that are dependant of given spring bone.
   * @param springBone A spring bone
   * @return A set of objects that are dependant of given spring bone
   */
  _getDependencies(springBone) {
    const set = /* @__PURE__ */ new Set();
    const parent = springBone.bone.parent;
    if (parent) {
      set.add(parent);
    }
    springBone.colliderGroups.forEach((colliderGroup) => {
      colliderGroup.colliders.forEach((collider) => {
        set.add(collider);
      });
    });
    return set;
  }
};

// src/VRMSpringBoneLoaderPlugin.ts
var POSSIBLE_SPEC_VERSIONS = /* @__PURE__ */ new Set(["1.0", "1.0-beta"]);
var _VRMSpringBoneLoaderPlugin = class _VRMSpringBoneLoaderPlugin {
  get name() {
    return _VRMSpringBoneLoaderPlugin.EXTENSION_NAME;
  }
  constructor(parser, options) {
    this.parser = parser;
    this.jointHelperRoot = options == null ? void 0 : options.jointHelperRoot;
    this.colliderHelperRoot = options == null ? void 0 : options.colliderHelperRoot;
  }
  afterRoot(gltf) {
    return __async(this, null, function* () {
      gltf.userData.vrmSpringBoneManager = yield this._import(gltf);
    });
  }
  /**
   * Import spring bones from a GLTF and return a {@link VRMSpringBoneManager}.
   * It might return `null` instead when it does not need to be created or something go wrong.
   *
   * @param gltf A parsed result of GLTF taken from GLTFLoader
   */
  _import(gltf) {
    return __async(this, null, function* () {
      const v1Result = yield this._v1Import(gltf);
      if (v1Result != null) {
        return v1Result;
      }
      const v0Result = yield this._v0Import(gltf);
      if (v0Result != null) {
        return v0Result;
      }
      return null;
    });
  }
  _v1Import(gltf) {
    return __async(this, null, function* () {
      var _a, _b, _c, _d, _e;
      const json = gltf.parser.json;
      const isSpringBoneUsed = ((_a = json.extensionsUsed) == null ? void 0 : _a.indexOf(_VRMSpringBoneLoaderPlugin.EXTENSION_NAME)) !== -1;
      if (!isSpringBoneUsed) {
        return null;
      }
      const manager = new VRMSpringBoneManager();
      const threeNodes = yield gltf.parser.getDependencies("node");
      const extension = (_b = json.extensions) == null ? void 0 : _b[_VRMSpringBoneLoaderPlugin.EXTENSION_NAME];
      if (!extension) {
        return null;
      }
      const specVersion = extension.specVersion;
      if (!POSSIBLE_SPEC_VERSIONS.has(specVersion)) {
        console.warn(
          `VRMSpringBoneLoaderPlugin: Unknown ${_VRMSpringBoneLoaderPlugin.EXTENSION_NAME} specVersion "${specVersion}"`
        );
        return null;
      }
      const colliders = (_c = extension.colliders) == null ? void 0 : _c.map((schemaCollider, iCollider) => {
        var _a2, _b2, _c2, _d2, _e2;
        const node = threeNodes[schemaCollider.node];
        const schemaShape = schemaCollider.shape;
        if (schemaShape.sphere) {
          return this._importSphereCollider(node, {
            offset: new THREE12.Vector3().fromArray((_a2 = schemaShape.sphere.offset) != null ? _a2 : [0, 0, 0]),
            radius: (_b2 = schemaShape.sphere.radius) != null ? _b2 : 0
          });
        } else if (schemaShape.capsule) {
          return this._importCapsuleCollider(node, {
            offset: new THREE12.Vector3().fromArray((_c2 = schemaShape.capsule.offset) != null ? _c2 : [0, 0, 0]),
            radius: (_d2 = schemaShape.capsule.radius) != null ? _d2 : 0,
            tail: new THREE12.Vector3().fromArray((_e2 = schemaShape.capsule.tail) != null ? _e2 : [0, 0, 0])
          });
        }
        throw new Error(`VRMSpringBoneLoaderPlugin: The collider #${iCollider} has no valid shape`);
      });
      const colliderGroups = (_d = extension.colliderGroups) == null ? void 0 : _d.map(
        (schemaColliderGroup, iColliderGroup) => {
          var _a2;
          const cols = ((_a2 = schemaColliderGroup.colliders) != null ? _a2 : []).map((iCollider) => {
            const col = colliders == null ? void 0 : colliders[iCollider];
            if (col == null) {
              throw new Error(
                `VRMSpringBoneLoaderPlugin: The colliderGroup #${iColliderGroup} attempted to use a collider #${iCollider} but not found`
              );
            }
            return col;
          });
          return {
            colliders: cols,
            name: schemaColliderGroup.name
          };
        }
      );
      (_e = extension.springs) == null ? void 0 : _e.forEach((schemaSpring, iSpring) => {
        var _a2;
        const schemaJoints = schemaSpring.joints;
        const colliderGroupsForSpring = (_a2 = schemaSpring.colliderGroups) == null ? void 0 : _a2.map((iColliderGroup) => {
          const group = colliderGroups == null ? void 0 : colliderGroups[iColliderGroup];
          if (group == null) {
            throw new Error(
              `VRMSpringBoneLoaderPlugin: The spring #${iSpring} attempted to use a colliderGroup ${iColliderGroup} but not found`
            );
          }
          return group;
        });
        const center = schemaSpring.center != null ? threeNodes[schemaSpring.center] : void 0;
        let prevSchemaJoint;
        schemaJoints.forEach((schemaJoint) => {
          if (prevSchemaJoint) {
            const nodeIndex = prevSchemaJoint.node;
            const node = threeNodes[nodeIndex];
            const childIndex = schemaJoint.node;
            const child = threeNodes[childIndex];
            const setting = {
              hitRadius: prevSchemaJoint.hitRadius,
              dragForce: prevSchemaJoint.dragForce,
              gravityPower: prevSchemaJoint.gravityPower,
              stiffness: prevSchemaJoint.stiffness,
              gravityDir: prevSchemaJoint.gravityDir != null ? new THREE12.Vector3().fromArray(prevSchemaJoint.gravityDir) : void 0
            };
            const joint = this._importJoint(node, child, setting, colliderGroupsForSpring);
            if (center) {
              joint.center = center;
            }
            manager.addJoint(joint);
          }
          prevSchemaJoint = schemaJoint;
        });
      });
      manager.setInitState();
      return manager;
    });
  }
  _v0Import(gltf) {
    return __async(this, null, function* () {
      var _a, _b, _c;
      const json = gltf.parser.json;
      const isVRMUsed = ((_a = json.extensionsUsed) == null ? void 0 : _a.indexOf("VRM")) !== -1;
      if (!isVRMUsed) {
        return null;
      }
      const extension = (_b = json.extensions) == null ? void 0 : _b["VRM"];
      const schemaSecondaryAnimation = extension == null ? void 0 : extension.secondaryAnimation;
      if (!schemaSecondaryAnimation) {
        return null;
      }
      const schemaBoneGroups = schemaSecondaryAnimation == null ? void 0 : schemaSecondaryAnimation.boneGroups;
      if (!schemaBoneGroups) {
        return null;
      }
      const manager = new VRMSpringBoneManager();
      const threeNodes = yield gltf.parser.getDependencies("node");
      const colliderGroups = (_c = schemaSecondaryAnimation.colliderGroups) == null ? void 0 : _c.map(
        (schemaColliderGroup) => {
          var _a2;
          const node = threeNodes[schemaColliderGroup.node];
          const colliders = ((_a2 = schemaColliderGroup.colliders) != null ? _a2 : []).map((schemaCollider, iCollider) => {
            var _a3, _b2, _c2;
            const offset = new THREE12.Vector3(0, 0, 0);
            if (schemaCollider.offset) {
              offset.set(
                (_a3 = schemaCollider.offset.x) != null ? _a3 : 0,
                (_b2 = schemaCollider.offset.y) != null ? _b2 : 0,
                schemaCollider.offset.z ? -schemaCollider.offset.z : 0
                // z is opposite in VRM0.0
              );
            }
            return this._importSphereCollider(node, {
              offset,
              radius: (_c2 = schemaCollider.radius) != null ? _c2 : 0
            });
          });
          return { colliders };
        }
      );
      schemaBoneGroups == null ? void 0 : schemaBoneGroups.forEach((schemaBoneGroup, iBoneGroup) => {
        const rootIndices = schemaBoneGroup.bones;
        if (!rootIndices) {
          return;
        }
        rootIndices.forEach((rootIndex) => {
          var _a2, _b2, _c2, _d;
          const root = threeNodes[rootIndex];
          const gravityDir = new THREE12.Vector3();
          if (schemaBoneGroup.gravityDir) {
            gravityDir.set(
              (_a2 = schemaBoneGroup.gravityDir.x) != null ? _a2 : 0,
              (_b2 = schemaBoneGroup.gravityDir.y) != null ? _b2 : 0,
              (_c2 = schemaBoneGroup.gravityDir.z) != null ? _c2 : 0
            );
          } else {
            gravityDir.set(0, -1, 0);
          }
          const center = schemaBoneGroup.center != null ? threeNodes[schemaBoneGroup.center] : void 0;
          const setting = {
            hitRadius: schemaBoneGroup.hitRadius,
            dragForce: schemaBoneGroup.dragForce,
            gravityPower: schemaBoneGroup.gravityPower,
            stiffness: schemaBoneGroup.stiffiness,
            gravityDir
          };
          const colliderGroupsForSpring = (_d = schemaBoneGroup.colliderGroups) == null ? void 0 : _d.map((iColliderGroup) => {
            const group = colliderGroups == null ? void 0 : colliderGroups[iColliderGroup];
            if (group == null) {
              throw new Error(
                `VRMSpringBoneLoaderPlugin: The spring #${iBoneGroup} attempted to use a colliderGroup ${iColliderGroup} but not found`
              );
            }
            return group;
          });
          root.traverse((node) => {
            var _a3;
            const child = (_a3 = node.children[0]) != null ? _a3 : null;
            const joint = this._importJoint(node, child, setting, colliderGroupsForSpring);
            if (center) {
              joint.center = center;
            }
            manager.addJoint(joint);
          });
        });
      });
      gltf.scene.updateMatrixWorld();
      manager.setInitState();
      return manager;
    });
  }
  _importJoint(node, child, setting, colliderGroupsForSpring) {
    const springBone = new VRMSpringBoneJoint(node, child, setting, colliderGroupsForSpring);
    if (this.jointHelperRoot) {
      const helper = new VRMSpringBoneJointHelper(springBone);
      this.jointHelperRoot.add(helper);
      helper.renderOrder = this.jointHelperRoot.renderOrder;
    }
    return springBone;
  }
  _importSphereCollider(destination, params) {
    const { offset, radius } = params;
    const shape = new VRMSpringBoneColliderShapeSphere({ offset, radius });
    const collider = new VRMSpringBoneCollider(shape);
    destination.add(collider);
    if (this.colliderHelperRoot) {
      const helper = new VRMSpringBoneColliderHelper(collider);
      this.colliderHelperRoot.add(helper);
      helper.renderOrder = this.colliderHelperRoot.renderOrder;
    }
    return collider;
  }
  _importCapsuleCollider(destination, params) {
    const { offset, radius, tail } = params;
    const shape = new VRMSpringBoneColliderShapeCapsule({ offset, radius, tail });
    const collider = new VRMSpringBoneCollider(shape);
    destination.add(collider);
    if (this.colliderHelperRoot) {
      const helper = new VRMSpringBoneColliderHelper(collider);
      this.colliderHelperRoot.add(helper);
      helper.renderOrder = this.colliderHelperRoot.renderOrder;
    }
    return collider;
  }
};
_VRMSpringBoneLoaderPlugin.EXTENSION_NAME = "VRMC_springBone";
var VRMSpringBoneLoaderPlugin = _VRMSpringBoneLoaderPlugin;
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIiwgIi4uL3NyYy9oZWxwZXJzL1ZSTVNwcmluZ0JvbmVDb2xsaWRlckhlbHBlci50cyIsICIuLi9zcmMvVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVDYXBzdWxlLnRzIiwgIi4uL3NyYy9WUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZS50cyIsICIuLi9zcmMvVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVTcGhlcmUudHMiLCAiLi4vc3JjL2hlbHBlcnMvdXRpbHMvQ29sbGlkZXJTaGFwZUNhcHN1bGVCdWZmZXJHZW9tZXRyeS50cyIsICIuLi9zcmMvaGVscGVycy91dGlscy9Db2xsaWRlclNoYXBlU3BoZXJlQnVmZmVyR2VvbWV0cnkudHMiLCAiLi4vc3JjL2hlbHBlcnMvVlJNU3ByaW5nQm9uZUpvaW50SGVscGVyLnRzIiwgIi4uL3NyYy9oZWxwZXJzL3V0aWxzL1NwcmluZ0JvbmVCdWZmZXJHZW9tZXRyeS50cyIsICIuLi9zcmMvVlJNU3ByaW5nQm9uZUNvbGxpZGVyLnRzIiwgIi4uL3NyYy9WUk1TcHJpbmdCb25lSm9pbnQudHMiLCAiLi4vc3JjL3V0aWxzL21hdDRJbnZlcnRDb21wYXQudHMiLCAiLi4vc3JjL3V0aWxzL01hdHJpeDRJbnZlcnNlQ2FjaGUudHMiLCAiLi4vc3JjL1ZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW4udHMiLCAiLi4vc3JjL3V0aWxzL3RyYXZlcnNlQW5jZXN0b3JzRnJvbVJvb3QudHMiLCAiLi4vc3JjL3V0aWxzL3RyYXZlcnNlQ2hpbGRyZW5VbnRpbENvbmRpdGlvbk1ldC50cyIsICIuLi9zcmMvVlJNU3ByaW5nQm9uZU1hbmFnZXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImV4cG9ydCAqIGZyb20gJy4vaGVscGVycyc7XG5leHBvcnQgKiBmcm9tICcuL1ZSTVNwcmluZ0JvbmVDb2xsaWRlcic7XG5leHBvcnQgKiBmcm9tICcuL1ZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwJztcbmV4cG9ydCAqIGZyb20gJy4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGUnO1xuZXhwb3J0ICogZnJvbSAnLi9WUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZUNhcHN1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi9WUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZVNwaGVyZSc7XG5leHBvcnQgKiBmcm9tICcuL1ZSTVNwcmluZ0JvbmVKb2ludCc7XG5leHBvcnQgKiBmcm9tICcuL1ZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW4nO1xuZXhwb3J0ICogZnJvbSAnLi9WUk1TcHJpbmdCb25lTWFuYWdlcic7XG5leHBvcnQgKiBmcm9tICcuL1ZSTVNwcmluZ0JvbmVKb2ludFNldHRpbmdzJztcbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXIgfSBmcm9tICcuLi9WUk1TcHJpbmdCb25lQ29sbGlkZXInO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVDYXBzdWxlIH0gZnJvbSAnLi4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVDYXBzdWxlJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlU3BoZXJlIH0gZnJvbSAnLi4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVTcGhlcmUnO1xuaW1wb3J0IHsgQ29sbGlkZXJTaGFwZUJ1ZmZlckdlb21ldHJ5IH0gZnJvbSAnLi91dGlscy9Db2xsaWRlclNoYXBlQnVmZmVyR2VvbWV0cnknO1xuaW1wb3J0IHsgQ29sbGlkZXJTaGFwZUNhcHN1bGVCdWZmZXJHZW9tZXRyeSB9IGZyb20gJy4vdXRpbHMvQ29sbGlkZXJTaGFwZUNhcHN1bGVCdWZmZXJHZW9tZXRyeSc7XG5pbXBvcnQgeyBDb2xsaWRlclNoYXBlU3BoZXJlQnVmZmVyR2VvbWV0cnkgfSBmcm9tICcuL3V0aWxzL0NvbGxpZGVyU2hhcGVTcGhlcmVCdWZmZXJHZW9tZXRyeSc7XG5cbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5leHBvcnQgY2xhc3MgVlJNU3ByaW5nQm9uZUNvbGxpZGVySGVscGVyIGV4dGVuZHMgVEhSRUUuR3JvdXAge1xuICBwdWJsaWMgcmVhZG9ubHkgY29sbGlkZXI6IFZSTVNwcmluZ0JvbmVDb2xsaWRlcjtcbiAgcHJpdmF0ZSByZWFkb25seSBfZ2VvbWV0cnk6IENvbGxpZGVyU2hhcGVCdWZmZXJHZW9tZXRyeTtcbiAgcHJpdmF0ZSByZWFkb25seSBfbGluZTogVEhSRUUuTGluZVNlZ21lbnRzO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb2xsaWRlcjogVlJNU3ByaW5nQm9uZUNvbGxpZGVyKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLm1hdHJpeEF1dG9VcGRhdGUgPSBmYWxzZTtcblxuICAgIHRoaXMuY29sbGlkZXIgPSBjb2xsaWRlcjtcblxuICAgIGlmICh0aGlzLmNvbGxpZGVyLnNoYXBlIGluc3RhbmNlb2YgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVTcGhlcmUpIHtcbiAgICAgIHRoaXMuX2dlb21ldHJ5ID0gbmV3IENvbGxpZGVyU2hhcGVTcGhlcmVCdWZmZXJHZW9tZXRyeSh0aGlzLmNvbGxpZGVyLnNoYXBlKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY29sbGlkZXIuc2hhcGUgaW5zdGFuY2VvZiBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZUNhcHN1bGUpIHtcbiAgICAgIHRoaXMuX2dlb21ldHJ5ID0gbmV3IENvbGxpZGVyU2hhcGVDYXBzdWxlQnVmZmVyR2VvbWV0cnkodGhpcy5jb2xsaWRlci5zaGFwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVlJNU3ByaW5nQm9uZUNvbGxpZGVySGVscGVyOiBVbmtub3duIGNvbGxpZGVyIHNoYXBlIHR5cGUgZGV0ZWN0ZWQnKTtcbiAgICB9XG5cbiAgICBjb25zdCBtYXRlcmlhbCA9IG5ldyBUSFJFRS5MaW5lQmFzaWNNYXRlcmlhbCh7XG4gICAgICBjb2xvcjogMHhmZjAwZmYsXG4gICAgICBkZXB0aFRlc3Q6IGZhbHNlLFxuICAgICAgZGVwdGhXcml0ZTogZmFsc2UsXG4gICAgfSk7XG5cbiAgICB0aGlzLl9saW5lID0gbmV3IFRIUkVFLkxpbmVTZWdtZW50cyh0aGlzLl9nZW9tZXRyeSwgbWF0ZXJpYWwpO1xuICAgIHRoaXMuYWRkKHRoaXMuX2xpbmUpO1xuICB9XG5cbiAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5fZ2VvbWV0cnkuZGlzcG9zZSgpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZU1hdHJpeFdvcmxkKGZvcmNlOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5jb2xsaWRlci51cGRhdGVXb3JsZE1hdHJpeCh0cnVlLCBmYWxzZSk7XG5cbiAgICB0aGlzLm1hdHJpeC5jb3B5KHRoaXMuY29sbGlkZXIubWF0cml4V29ybGQpO1xuXG4gICAgY29uc3QgbWF0cml4V29ybGRFbGVtZW50cyA9IHRoaXMubWF0cml4LmVsZW1lbnRzO1xuICAgIHRoaXMuX2dlb21ldHJ5LndvcmxkU2NhbGUgPSBfdjNBXG4gICAgICAuc2V0KG1hdHJpeFdvcmxkRWxlbWVudHNbMF0sIG1hdHJpeFdvcmxkRWxlbWVudHNbMV0sIG1hdHJpeFdvcmxkRWxlbWVudHNbMl0pXG4gICAgICAubGVuZ3RoKCk7IC8vIGNhbGN1bGF0ZSBzY2FsZSBvZiB4IGNvbXBvbmVudFxuXG4gICAgdGhpcy5fZ2VvbWV0cnkudXBkYXRlKCk7XG5cbiAgICBzdXBlci51cGRhdGVNYXRyaXhXb3JsZChmb3JjZSk7XG4gIH1cbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZSB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGUnO1xuXG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF92M0IgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5leHBvcnQgY2xhc3MgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVDYXBzdWxlIGV4dGVuZHMgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGUge1xuICBwdWJsaWMgZ2V0IHR5cGUoKTogJ2NhcHN1bGUnIHtcbiAgICByZXR1cm4gJ2NhcHN1bGUnO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBvZmZzZXQgb2YgdGhlIGhlYWQgZnJvbSB0aGUgb3JpZ2luLlxuICAgKi9cbiAgcHVibGljIG9mZnNldDogVEhSRUUuVmVjdG9yMztcblxuICAvKipcbiAgICogVGhlIG9mZnNldCBvZiB0aGUgdGFpbCBmcm9tIHRoZSBvcmlnaW4uXG4gICAqL1xuICBwdWJsaWMgdGFpbDogVEhSRUUuVmVjdG9yMztcblxuICAvKipcbiAgICogVGhlIHJhZGl1cy5cbiAgICovXG4gIHB1YmxpYyByYWRpdXM6IG51bWJlcjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IocGFyYW1zPzogeyByYWRpdXM/OiBudW1iZXI7IG9mZnNldD86IFRIUkVFLlZlY3RvcjM7IHRhaWw/OiBUSFJFRS5WZWN0b3IzIH0pIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5vZmZzZXQgPSBwYXJhbXM/Lm9mZnNldCA/PyBuZXcgVEhSRUUuVmVjdG9yMygwLjAsIDAuMCwgMC4wKTtcbiAgICB0aGlzLnRhaWwgPSBwYXJhbXM/LnRhaWwgPz8gbmV3IFRIUkVFLlZlY3RvcjMoMC4wLCAwLjAsIDAuMCk7XG4gICAgdGhpcy5yYWRpdXMgPSBwYXJhbXM/LnJhZGl1cyA/PyAwLjA7XG4gIH1cblxuICBwdWJsaWMgY2FsY3VsYXRlQ29sbGlzaW9uKFxuICAgIGNvbGxpZGVyTWF0cml4OiBUSFJFRS5NYXRyaXg0LFxuICAgIG9iamVjdFBvc2l0aW9uOiBUSFJFRS5WZWN0b3IzLFxuICAgIG9iamVjdFJhZGl1czogbnVtYmVyLFxuICAgIHRhcmdldDogVEhSRUUuVmVjdG9yMyxcbiAgKTogbnVtYmVyIHtcbiAgICBfdjNBLmNvcHkodGhpcy5vZmZzZXQpLmFwcGx5TWF0cml4NChjb2xsaWRlck1hdHJpeCk7IC8vIHRyYW5zZm9ybWVkIGhlYWRcbiAgICBfdjNCLmNvcHkodGhpcy50YWlsKS5hcHBseU1hdHJpeDQoY29sbGlkZXJNYXRyaXgpOyAvLyB0cmFuc2Zvcm1lZCB0YWlsXG4gICAgX3YzQi5zdWIoX3YzQSk7IC8vIGZyb20gaGVhZCB0byB0YWlsXG4gICAgY29uc3QgbGVuZ3RoU3FDYXBzdWxlID0gX3YzQi5sZW5ndGhTcSgpO1xuXG4gICAgdGFyZ2V0LmNvcHkob2JqZWN0UG9zaXRpb24pLnN1YihfdjNBKTsgLy8gZnJvbSBoZWFkIHRvIG9iamVjdFxuICAgIGNvbnN0IGRvdCA9IF92M0IuZG90KHRhcmdldCk7IC8vIGRvdCBwcm9kdWN0IG9mIG9mZnNldFRvVGFpbCBhbmQgb2Zmc2V0VG9PYmplY3RcblxuICAgIGlmIChkb3QgPD0gMC4wKSB7XG4gICAgICAvLyBpZiBvYmplY3QgaXMgbmVhciBmcm9tIHRoZSBoZWFkXG4gICAgICAvLyBkbyBub3RoaW5nLCB1c2UgdGhlIGN1cnJlbnQgdmFsdWUgZGlyZWN0bHlcbiAgICB9IGVsc2UgaWYgKGxlbmd0aFNxQ2Fwc3VsZSA8PSBkb3QpIHtcbiAgICAgIC8vIGlmIG9iamVjdCBpcyBuZWFyIGZyb20gdGhlIHRhaWxcbiAgICAgIHRhcmdldC5zdWIoX3YzQik7IC8vIGZyb20gdGFpbCB0byBvYmplY3RcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaWYgb2JqZWN0IGlzIGJldHdlZW4gdHdvIGVuZHNcbiAgICAgIF92M0IubXVsdGlwbHlTY2FsYXIoZG90IC8gbGVuZ3RoU3FDYXBzdWxlKTsgLy8gZnJvbSBoZWFkIHRvIHRoZSBuZWFyZXN0IHBvaW50IG9mIHRoZSBzaGFmdFxuICAgICAgdGFyZ2V0LnN1YihfdjNCKTsgLy8gZnJvbSB0aGUgc2hhZnQgcG9pbnQgdG8gb2JqZWN0XG4gICAgfVxuXG4gICAgY29uc3QgcmFkaXVzID0gb2JqZWN0UmFkaXVzICsgdGhpcy5yYWRpdXM7XG4gICAgY29uc3QgZGlzdGFuY2UgPSB0YXJnZXQubGVuZ3RoKCkgLSByYWRpdXM7XG4gICAgdGFyZ2V0Lm5vcm1hbGl6ZSgpO1xuICAgIHJldHVybiBkaXN0YW5jZTtcbiAgfVxufVxuIiwgImltcG9ydCB0eXBlICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBzaGFwZSBvZiBhIGNvbGxpZGVyLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGUge1xuICAvKipcbiAgICogVGhlIHR5cGUgb2YgdGhlIHNoYXBlLlxuICAgKi9cbiAgcHVibGljIGFic3RyYWN0IGdldCB0eXBlKCk6IHN0cmluZztcblxuICAvKipcbiAgICogQ2FsY3VsYXRlIGEgZGlzdGFuY2UgYW5kIGEgZGlyZWN0aW9uIGZyb20gdGhlIGNvbGxpZGVyIHRvIGEgdGFyZ2V0IG9iamVjdC5cbiAgICogSXQncyBoaXQgaWYgdGhlIGRpc3RhbmNlIGlzIG5lZ2F0aXZlLlxuICAgKiBUaGUgZGlyZWN0aW9uIHdpbGwgYmUgY29udGFpbmVkIGluIHRoZSBnaXZlbiB0YXJnZXQgdmVjdG9yLlxuICAgKlxuICAgKiBAcGFyYW0gY29sbGlkZXJNYXRyaXggQSBtYXRyaXggcmVwcmVzZW50cyB0aGUgdHJhbnNmb3JtIG9mIHRoZSBjb2xsaWRlclxuICAgKiBAcGFyYW0gb2JqZWN0UG9zaXRpb24gQSB2ZWN0b3IgcmVwcmVzZW50cyB0aGUgcG9zaXRpb24gb2YgdGhlIHRhcmdldCBvYmplY3RcbiAgICogQHBhcmFtIG9iamVjdFJhZGl1cyBUaGUgcmFkaXVzIG9mIHRoZSBvYmplY3RcbiAgICogQHBhcmFtIHRhcmdldCBUaGUgcmVzdWx0IGRpcmVjdGlvbiB3aWxsIGJlIGNvbnRhaW5lZCBpbiB0aGlzIHZlY3RvclxuICAgKi9cbiAgcHVibGljIGFic3RyYWN0IGNhbGN1bGF0ZUNvbGxpc2lvbihcbiAgICBjb2xsaWRlck1hdHJpeDogVEhSRUUuTWF0cml4NCxcbiAgICBvYmplY3RQb3NpdGlvbjogVEhSRUUuVmVjdG9yMyxcbiAgICBvYmplY3RSYWRpdXM6IG51bWJlcixcbiAgICB0YXJnZXQ6IFRIUkVFLlZlY3RvcjMsXG4gICk6IG51bWJlcjtcbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZSB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGUnO1xuXG5leHBvcnQgY2xhc3MgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVTcGhlcmUgZXh0ZW5kcyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZSB7XG4gIHB1YmxpYyBnZXQgdHlwZSgpOiAnc3BoZXJlJyB7XG4gICAgcmV0dXJuICdzcGhlcmUnO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBvZmZzZXQgZnJvbSB0aGUgb3JpZ2luLlxuICAgKi9cbiAgcHVibGljIG9mZnNldDogVEhSRUUuVmVjdG9yMztcblxuICAvKipcbiAgICogVGhlIHJhZGl1cy5cbiAgICovXG4gIHB1YmxpYyByYWRpdXM6IG51bWJlcjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IocGFyYW1zPzogeyByYWRpdXM/OiBudW1iZXI7IG9mZnNldD86IFRIUkVFLlZlY3RvcjMgfSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLm9mZnNldCA9IHBhcmFtcz8ub2Zmc2V0ID8/IG5ldyBUSFJFRS5WZWN0b3IzKDAuMCwgMC4wLCAwLjApO1xuICAgIHRoaXMucmFkaXVzID0gcGFyYW1zPy5yYWRpdXMgPz8gMC4wO1xuICB9XG5cbiAgcHVibGljIGNhbGN1bGF0ZUNvbGxpc2lvbihcbiAgICBjb2xsaWRlck1hdHJpeDogVEhSRUUuTWF0cml4NCxcbiAgICBvYmplY3RQb3NpdGlvbjogVEhSRUUuVmVjdG9yMyxcbiAgICBvYmplY3RSYWRpdXM6IG51bWJlcixcbiAgICB0YXJnZXQ6IFRIUkVFLlZlY3RvcjMsXG4gICk6IG51bWJlciB7XG4gICAgdGFyZ2V0LmNvcHkodGhpcy5vZmZzZXQpLmFwcGx5TWF0cml4NChjb2xsaWRlck1hdHJpeCk7IC8vIHRyYW5zZm9ybWVkIG9mZnNldFxuICAgIHRhcmdldC5uZWdhdGUoKS5hZGQob2JqZWN0UG9zaXRpb24pOyAvLyBhIHZlY3RvciBmcm9tIGNvbGxpZGVyIGNlbnRlciB0byBvYmplY3QgcG9zaXRpb25cbiAgICBjb25zdCByYWRpdXMgPSBvYmplY3RSYWRpdXMgKyB0aGlzLnJhZGl1cztcbiAgICBjb25zdCBkaXN0YW5jZSA9IHRhcmdldC5sZW5ndGgoKSAtIHJhZGl1cztcbiAgICB0YXJnZXQubm9ybWFsaXplKCk7XG4gICAgcmV0dXJuIGRpc3RhbmNlO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVDYXBzdWxlIH0gZnJvbSAnLi4vLi4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVDYXBzdWxlJztcbmltcG9ydCB7IENvbGxpZGVyU2hhcGVCdWZmZXJHZW9tZXRyeSB9IGZyb20gJy4vQ29sbGlkZXJTaGFwZUJ1ZmZlckdlb21ldHJ5JztcblxuY29uc3QgX3YzQSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbmV4cG9ydCBjbGFzcyBDb2xsaWRlclNoYXBlQ2Fwc3VsZUJ1ZmZlckdlb21ldHJ5IGV4dGVuZHMgVEhSRUUuQnVmZmVyR2VvbWV0cnkgaW1wbGVtZW50cyBDb2xsaWRlclNoYXBlQnVmZmVyR2VvbWV0cnkge1xuICBwdWJsaWMgd29ybGRTY2FsZSA9IDEuMDtcblxuICBwcml2YXRlIHJlYWRvbmx5IF9hdHRyUG9zOiBUSFJFRS5CdWZmZXJBdHRyaWJ1dGU7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2F0dHJJbmRleDogVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xuICBwcml2YXRlIHJlYWRvbmx5IF9zaGFwZTogVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVDYXBzdWxlO1xuICBwcml2YXRlIF9jdXJyZW50UmFkaXVzID0gMDtcbiAgcHJpdmF0ZSByZWFkb25seSBfY3VycmVudE9mZnNldCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2N1cnJlbnRUYWlsID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuICBwdWJsaWMgY29uc3RydWN0b3Ioc2hhcGU6IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlQ2Fwc3VsZSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLl9zaGFwZSA9IHNoYXBlO1xuXG4gICAgdGhpcy5fYXR0clBvcyA9IG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUobmV3IEZsb2F0MzJBcnJheSgzOTYpLCAzKTtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgncG9zaXRpb24nLCB0aGlzLl9hdHRyUG9zKTtcblxuICAgIHRoaXMuX2F0dHJJbmRleCA9IG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUobmV3IFVpbnQxNkFycmF5KDI2NCksIDEpO1xuICAgIHRoaXMuc2V0SW5kZXgodGhpcy5fYXR0ckluZGV4KTtcblxuICAgIHRoaXMuX2J1aWxkSW5kZXgoKTtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBsZXQgc2hvdWxkVXBkYXRlR2VvbWV0cnkgPSBmYWxzZTtcblxuICAgIGNvbnN0IHJhZGl1cyA9IHRoaXMuX3NoYXBlLnJhZGl1cyAvIHRoaXMud29ybGRTY2FsZTtcbiAgICBpZiAodGhpcy5fY3VycmVudFJhZGl1cyAhPT0gcmFkaXVzKSB7XG4gICAgICB0aGlzLl9jdXJyZW50UmFkaXVzID0gcmFkaXVzO1xuICAgICAgc2hvdWxkVXBkYXRlR2VvbWV0cnkgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fY3VycmVudE9mZnNldC5lcXVhbHModGhpcy5fc2hhcGUub2Zmc2V0KSkge1xuICAgICAgdGhpcy5fY3VycmVudE9mZnNldC5jb3B5KHRoaXMuX3NoYXBlLm9mZnNldCk7XG4gICAgICBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IHRydWU7XG4gICAgfVxuXG4gICAgY29uc3QgdGFpbCA9IF92M0EuY29weSh0aGlzLl9zaGFwZS50YWlsKS5kaXZpZGVTY2FsYXIodGhpcy53b3JsZFNjYWxlKTtcbiAgICBpZiAodGhpcy5fY3VycmVudFRhaWwuZGlzdGFuY2VUb1NxdWFyZWQodGFpbCkgPiAxZS0xMCkge1xuICAgICAgdGhpcy5fY3VycmVudFRhaWwuY29weSh0YWlsKTtcbiAgICAgIHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoc2hvdWxkVXBkYXRlR2VvbWV0cnkpIHtcbiAgICAgIHRoaXMuX2J1aWxkUG9zaXRpb24oKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9idWlsZFBvc2l0aW9uKCk6IHZvaWQge1xuICAgIF92M0EuY29weSh0aGlzLl9jdXJyZW50VGFpbCkuc3ViKHRoaXMuX2N1cnJlbnRPZmZzZXQpO1xuICAgIGNvbnN0IGwgPSBfdjNBLmxlbmd0aCgpIC8gdGhpcy5fY3VycmVudFJhZGl1cztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IDE2OyBpKyspIHtcbiAgICAgIGNvbnN0IHQgPSAoaSAvIDE2LjApICogTWF0aC5QSTtcblxuICAgICAgdGhpcy5fYXR0clBvcy5zZXRYWVooaSwgLU1hdGguc2luKHQpLCAtTWF0aC5jb3ModCksIDAuMCk7XG4gICAgICB0aGlzLl9hdHRyUG9zLnNldFhZWigxNyArIGksIGwgKyBNYXRoLnNpbih0KSwgTWF0aC5jb3ModCksIDAuMCk7XG4gICAgICB0aGlzLl9hdHRyUG9zLnNldFhZWigzNCArIGksIC1NYXRoLnNpbih0KSwgMC4wLCAtTWF0aC5jb3ModCkpO1xuICAgICAgdGhpcy5fYXR0clBvcy5zZXRYWVooNTEgKyBpLCBsICsgTWF0aC5zaW4odCksIDAuMCwgTWF0aC5jb3ModCkpO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzI7IGkrKykge1xuICAgICAgY29uc3QgdCA9IChpIC8gMTYuMCkgKiBNYXRoLlBJO1xuICAgICAgdGhpcy5fYXR0clBvcy5zZXRYWVooNjggKyBpLCAwLjAsIE1hdGguc2luKHQpLCBNYXRoLmNvcyh0KSk7XG4gICAgICB0aGlzLl9hdHRyUG9zLnNldFhZWigxMDAgKyBpLCBsLCBNYXRoLnNpbih0KSwgTWF0aC5jb3ModCkpO1xuICAgIH1cblxuICAgIGNvbnN0IHRoZXRhID0gTWF0aC5hdGFuMihfdjNBLnksIE1hdGguc3FydChfdjNBLnggKiBfdjNBLnggKyBfdjNBLnogKiBfdjNBLnopKTtcbiAgICBjb25zdCBwaGkgPSAtTWF0aC5hdGFuMihfdjNBLnosIF92M0EueCk7XG5cbiAgICB0aGlzLnJvdGF0ZVoodGhldGEpO1xuICAgIHRoaXMucm90YXRlWShwaGkpO1xuICAgIHRoaXMuc2NhbGUodGhpcy5fY3VycmVudFJhZGl1cywgdGhpcy5fY3VycmVudFJhZGl1cywgdGhpcy5fY3VycmVudFJhZGl1cyk7XG4gICAgdGhpcy50cmFuc2xhdGUodGhpcy5fY3VycmVudE9mZnNldC54LCB0aGlzLl9jdXJyZW50T2Zmc2V0LnksIHRoaXMuX2N1cnJlbnRPZmZzZXQueik7XG5cbiAgICB0aGlzLl9hdHRyUG9zLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX2J1aWxkSW5kZXgoKTogdm9pZCB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzNDsgaSsrKSB7XG4gICAgICBjb25zdCBpMSA9IChpICsgMSkgJSAzNDtcblxuICAgICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKGkgKiAyLCBpLCBpMSk7XG4gICAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoNjggKyBpICogMiwgMzQgKyBpLCAzNCArIGkxKTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDMyOyBpKyspIHtcbiAgICAgIGNvbnN0IGkxID0gKGkgKyAxKSAlIDMyO1xuXG4gICAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoMTM2ICsgaSAqIDIsIDY4ICsgaSwgNjggKyBpMSk7XG4gICAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoMjAwICsgaSAqIDIsIDEwMCArIGksIDEwMCArIGkxKTtcbiAgICB9XG5cbiAgICB0aGlzLl9hdHRySW5kZXgubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVTcGhlcmUgfSBmcm9tICcuLi8uLi9WUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZVNwaGVyZSc7XG5pbXBvcnQgeyBDb2xsaWRlclNoYXBlQnVmZmVyR2VvbWV0cnkgfSBmcm9tICcuL0NvbGxpZGVyU2hhcGVCdWZmZXJHZW9tZXRyeSc7XG5cbmV4cG9ydCBjbGFzcyBDb2xsaWRlclNoYXBlU3BoZXJlQnVmZmVyR2VvbWV0cnkgZXh0ZW5kcyBUSFJFRS5CdWZmZXJHZW9tZXRyeSBpbXBsZW1lbnRzIENvbGxpZGVyU2hhcGVCdWZmZXJHZW9tZXRyeSB7XG4gIHB1YmxpYyB3b3JsZFNjYWxlID0gMS4wO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgX2F0dHJQb3M6IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZTtcbiAgcHJpdmF0ZSByZWFkb25seSBfYXR0ckluZGV4OiBUSFJFRS5CdWZmZXJBdHRyaWJ1dGU7XG4gIHByaXZhdGUgcmVhZG9ubHkgX3NoYXBlOiBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZVNwaGVyZTtcbiAgcHJpdmF0ZSBfY3VycmVudFJhZGl1cyA9IDA7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2N1cnJlbnRPZmZzZXQgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihzaGFwZTogVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVTcGhlcmUpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5fc2hhcGUgPSBzaGFwZTtcblxuICAgIHRoaXMuX2F0dHJQb3MgPSBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKG5ldyBGbG9hdDMyQXJyYXkoMzIgKiAzICogMyksIDMpO1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKCdwb3NpdGlvbicsIHRoaXMuX2F0dHJQb3MpO1xuXG4gICAgdGhpcy5fYXR0ckluZGV4ID0gbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShuZXcgVWludDE2QXJyYXkoNjQgKiAzKSwgMSk7XG4gICAgdGhpcy5zZXRJbmRleCh0aGlzLl9hdHRySW5kZXgpO1xuXG4gICAgdGhpcy5fYnVpbGRJbmRleCgpO1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIGxldCBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IGZhbHNlO1xuXG4gICAgY29uc3QgcmFkaXVzID0gdGhpcy5fc2hhcGUucmFkaXVzIC8gdGhpcy53b3JsZFNjYWxlO1xuICAgIGlmICh0aGlzLl9jdXJyZW50UmFkaXVzICE9PSByYWRpdXMpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRSYWRpdXMgPSByYWRpdXM7XG4gICAgICBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9jdXJyZW50T2Zmc2V0LmVxdWFscyh0aGlzLl9zaGFwZS5vZmZzZXQpKSB7XG4gICAgICB0aGlzLl9jdXJyZW50T2Zmc2V0LmNvcHkodGhpcy5fc2hhcGUub2Zmc2V0KTtcbiAgICAgIHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoc2hvdWxkVXBkYXRlR2VvbWV0cnkpIHtcbiAgICAgIHRoaXMuX2J1aWxkUG9zaXRpb24oKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9idWlsZFBvc2l0aW9uKCk6IHZvaWQge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzI7IGkrKykge1xuICAgICAgY29uc3QgdCA9IChpIC8gMTYuMCkgKiBNYXRoLlBJO1xuXG4gICAgICB0aGlzLl9hdHRyUG9zLnNldFhZWihpLCBNYXRoLmNvcyh0KSwgTWF0aC5zaW4odCksIDAuMCk7XG4gICAgICB0aGlzLl9hdHRyUG9zLnNldFhZWigzMiArIGksIDAuMCwgTWF0aC5jb3ModCksIE1hdGguc2luKHQpKTtcbiAgICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKDY0ICsgaSwgTWF0aC5zaW4odCksIDAuMCwgTWF0aC5jb3ModCkpO1xuICAgIH1cblxuICAgIHRoaXMuc2NhbGUodGhpcy5fY3VycmVudFJhZGl1cywgdGhpcy5fY3VycmVudFJhZGl1cywgdGhpcy5fY3VycmVudFJhZGl1cyk7XG4gICAgdGhpcy50cmFuc2xhdGUodGhpcy5fY3VycmVudE9mZnNldC54LCB0aGlzLl9jdXJyZW50T2Zmc2V0LnksIHRoaXMuX2N1cnJlbnRPZmZzZXQueik7XG5cbiAgICB0aGlzLl9hdHRyUG9zLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX2J1aWxkSW5kZXgoKTogdm9pZCB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzMjsgaSsrKSB7XG4gICAgICBjb25zdCBpMSA9IChpICsgMSkgJSAzMjtcblxuICAgICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKGkgKiAyLCBpLCBpMSk7XG4gICAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoNjQgKyBpICogMiwgMzIgKyBpLCAzMiArIGkxKTtcbiAgICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWSgxMjggKyBpICogMiwgNjQgKyBpLCA2NCArIGkxKTtcbiAgICB9XG5cbiAgICB0aGlzLl9hdHRySW5kZXgubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUpvaW50IH0gZnJvbSAnLi4vVlJNU3ByaW5nQm9uZUpvaW50JztcbmltcG9ydCB7IFNwcmluZ0JvbmVCdWZmZXJHZW9tZXRyeSB9IGZyb20gJy4vdXRpbHMvU3ByaW5nQm9uZUJ1ZmZlckdlb21ldHJ5JztcblxuY29uc3QgX3YzQSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbmV4cG9ydCBjbGFzcyBWUk1TcHJpbmdCb25lSm9pbnRIZWxwZXIgZXh0ZW5kcyBUSFJFRS5Hcm91cCB7XG4gIHB1YmxpYyByZWFkb25seSBzcHJpbmdCb25lOiBWUk1TcHJpbmdCb25lSm9pbnQ7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2dlb21ldHJ5OiBTcHJpbmdCb25lQnVmZmVyR2VvbWV0cnk7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2xpbmU6IFRIUkVFLkxpbmVTZWdtZW50cztcblxuICBwdWJsaWMgY29uc3RydWN0b3Ioc3ByaW5nQm9uZTogVlJNU3ByaW5nQm9uZUpvaW50KSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLm1hdHJpeEF1dG9VcGRhdGUgPSBmYWxzZTtcblxuICAgIHRoaXMuc3ByaW5nQm9uZSA9IHNwcmluZ0JvbmU7XG5cbiAgICB0aGlzLl9nZW9tZXRyeSA9IG5ldyBTcHJpbmdCb25lQnVmZmVyR2VvbWV0cnkodGhpcy5zcHJpbmdCb25lKTtcblxuICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLkxpbmVCYXNpY01hdGVyaWFsKHtcbiAgICAgIGNvbG9yOiAweGZmZmYwMCxcbiAgICAgIGRlcHRoVGVzdDogZmFsc2UsXG4gICAgICBkZXB0aFdyaXRlOiBmYWxzZSxcbiAgICB9KTtcblxuICAgIHRoaXMuX2xpbmUgPSBuZXcgVEhSRUUuTGluZVNlZ21lbnRzKHRoaXMuX2dlb21ldHJ5LCBtYXRlcmlhbCk7XG4gICAgdGhpcy5hZGQodGhpcy5fbGluZSk7XG4gIH1cblxuICBwdWJsaWMgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9nZW9tZXRyeS5kaXNwb3NlKCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlTWF0cml4V29ybGQoZm9yY2U6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLnNwcmluZ0JvbmUuYm9uZS51cGRhdGVXb3JsZE1hdHJpeCh0cnVlLCBmYWxzZSk7XG5cbiAgICB0aGlzLm1hdHJpeC5jb3B5KHRoaXMuc3ByaW5nQm9uZS5ib25lLm1hdHJpeFdvcmxkKTtcblxuICAgIGNvbnN0IG1hdHJpeFdvcmxkRWxlbWVudHMgPSB0aGlzLm1hdHJpeC5lbGVtZW50cztcbiAgICB0aGlzLl9nZW9tZXRyeS53b3JsZFNjYWxlID0gX3YzQVxuICAgICAgLnNldChtYXRyaXhXb3JsZEVsZW1lbnRzWzBdLCBtYXRyaXhXb3JsZEVsZW1lbnRzWzFdLCBtYXRyaXhXb3JsZEVsZW1lbnRzWzJdKVxuICAgICAgLmxlbmd0aCgpOyAvLyBjYWxjdWxhdGUgc2NhbGUgb2YgeCBjb21wb25lbnRcblxuICAgIHRoaXMuX2dlb21ldHJ5LnVwZGF0ZSgpO1xuXG4gICAgc3VwZXIudXBkYXRlTWF0cml4V29ybGQoZm9yY2UpO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUpvaW50IH0gZnJvbSAnLi4vLi4vVlJNU3ByaW5nQm9uZUpvaW50JztcblxuZXhwb3J0IGNsYXNzIFNwcmluZ0JvbmVCdWZmZXJHZW9tZXRyeSBleHRlbmRzIFRIUkVFLkJ1ZmZlckdlb21ldHJ5IHtcbiAgcHVibGljIHdvcmxkU2NhbGUgPSAxLjA7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBfYXR0clBvczogVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xuICBwcml2YXRlIHJlYWRvbmx5IF9hdHRySW5kZXg6IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZTtcbiAgcHJpdmF0ZSByZWFkb25seSBfc3ByaW5nQm9uZTogVlJNU3ByaW5nQm9uZUpvaW50O1xuICBwcml2YXRlIF9jdXJyZW50UmFkaXVzID0gMDtcbiAgcHJpdmF0ZSByZWFkb25seSBfY3VycmVudFRhaWwgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihzcHJpbmdCb25lOiBWUk1TcHJpbmdCb25lSm9pbnQpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5fc3ByaW5nQm9uZSA9IHNwcmluZ0JvbmU7XG5cbiAgICB0aGlzLl9hdHRyUG9zID0gbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShuZXcgRmxvYXQzMkFycmF5KDI5NCksIDMpO1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKCdwb3NpdGlvbicsIHRoaXMuX2F0dHJQb3MpO1xuXG4gICAgdGhpcy5fYXR0ckluZGV4ID0gbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShuZXcgVWludDE2QXJyYXkoMTk0KSwgMSk7XG4gICAgdGhpcy5zZXRJbmRleCh0aGlzLl9hdHRySW5kZXgpO1xuXG4gICAgdGhpcy5fYnVpbGRJbmRleCgpO1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIGxldCBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IGZhbHNlO1xuXG4gICAgY29uc3QgcmFkaXVzID0gdGhpcy5fc3ByaW5nQm9uZS5zZXR0aW5ncy5oaXRSYWRpdXMgLyB0aGlzLndvcmxkU2NhbGU7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRSYWRpdXMgIT09IHJhZGl1cykge1xuICAgICAgdGhpcy5fY3VycmVudFJhZGl1cyA9IHJhZGl1cztcbiAgICAgIHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX2N1cnJlbnRUYWlsLmVxdWFscyh0aGlzLl9zcHJpbmdCb25lLmluaXRpYWxMb2NhbENoaWxkUG9zaXRpb24pKSB7XG4gICAgICB0aGlzLl9jdXJyZW50VGFpbC5jb3B5KHRoaXMuX3NwcmluZ0JvbmUuaW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbik7XG4gICAgICBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHNob3VsZFVwZGF0ZUdlb21ldHJ5KSB7XG4gICAgICB0aGlzLl9idWlsZFBvc2l0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRQb3NpdGlvbigpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDMyOyBpKyspIHtcbiAgICAgIGNvbnN0IHQgPSAoaSAvIDE2LjApICogTWF0aC5QSTtcblxuICAgICAgdGhpcy5fYXR0clBvcy5zZXRYWVooaSwgTWF0aC5jb3ModCksIE1hdGguc2luKHQpLCAwLjApO1xuICAgICAgdGhpcy5fYXR0clBvcy5zZXRYWVooMzIgKyBpLCAwLjAsIE1hdGguY29zKHQpLCBNYXRoLnNpbih0KSk7XG4gICAgICB0aGlzLl9hdHRyUG9zLnNldFhZWig2NCArIGksIE1hdGguc2luKHQpLCAwLjAsIE1hdGguY29zKHQpKTtcbiAgICB9XG5cbiAgICB0aGlzLnNjYWxlKHRoaXMuX2N1cnJlbnRSYWRpdXMsIHRoaXMuX2N1cnJlbnRSYWRpdXMsIHRoaXMuX2N1cnJlbnRSYWRpdXMpO1xuICAgIHRoaXMudHJhbnNsYXRlKHRoaXMuX2N1cnJlbnRUYWlsLngsIHRoaXMuX2N1cnJlbnRUYWlsLnksIHRoaXMuX2N1cnJlbnRUYWlsLnopO1xuXG4gICAgdGhpcy5fYXR0clBvcy5zZXRYWVooOTYsIDAsIDAsIDApO1xuICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKDk3LCB0aGlzLl9jdXJyZW50VGFpbC54LCB0aGlzLl9jdXJyZW50VGFpbC55LCB0aGlzLl9jdXJyZW50VGFpbC56KTtcblxuICAgIHRoaXMuX2F0dHJQb3MubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRJbmRleCgpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDMyOyBpKyspIHtcbiAgICAgIGNvbnN0IGkxID0gKGkgKyAxKSAlIDMyO1xuXG4gICAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoaSAqIDIsIGksIGkxKTtcbiAgICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWSg2NCArIGkgKiAyLCAzMiArIGksIDMyICsgaTEpO1xuICAgICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKDEyOCArIGkgKiAyLCA2NCArIGksIDY0ICsgaTEpO1xuICAgIH1cbiAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoMTkyLCA5NiwgOTcpO1xuXG4gICAgdGhpcy5fYXR0ckluZGV4Lm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB0eXBlIHsgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGUgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgY29sbGlkZXIgb2YgYSBWUk0uXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1TcHJpbmdCb25lQ29sbGlkZXIgZXh0ZW5kcyBUSFJFRS5PYmplY3QzRCB7XG4gIC8qKlxuICAgKiBUaGUgc2hhcGUgb2YgdGhlIGNvbGxpZGVyLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IHNoYXBlOiBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZTtcblxuICBwdWJsaWMgY29uc3RydWN0b3Ioc2hhcGU6IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuc2hhcGUgPSBzaGFwZTtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IG1hdDRJbnZlcnRDb21wYXQgfSBmcm9tICcuL3V0aWxzL21hdDRJbnZlcnRDb21wYXQnO1xuaW1wb3J0IHsgTWF0cml4NEludmVyc2VDYWNoZSB9IGZyb20gJy4vdXRpbHMvTWF0cml4NEludmVyc2VDYWNoZSc7XG5pbXBvcnQgdHlwZSB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cCc7XG5pbXBvcnQgdHlwZSB7IFZSTVNwcmluZ0JvbmVKb2ludFNldHRpbmdzIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lSm9pbnRTZXR0aW5ncyc7XG5cbi8vIGJhc2VkIG9uXG4vLyBodHRwOi8vcm9ja2V0anVtcC5za3IuanAvdW5pdHkzZC8xMDkvXG4vLyBodHRwczovL2dpdGh1Yi5jb20vZHdhbmdvL1VuaVZSTS9ibG9iL21hc3Rlci9TY3JpcHRzL1NwcmluZ0JvbmUvVlJNU3ByaW5nQm9uZS5jc1xuXG5jb25zdCBJREVOVElUWV9NQVRSSVg0ID0gbmV3IFRIUkVFLk1hdHJpeDQoKTtcblxuLy8gXHU4QTA4XHU3Qjk3XHU0RTJEXHUzMDZFXHU0RTAwXHU2NjQyXHU0RkREXHU1QjU4XHU3NTI4XHU1OTA5XHU2NTcwXHVGRjA4XHU0RTAwXHU1RUE2XHUzMEE0XHUzMEYzXHUzMEI5XHUzMEJGXHUzMEYzXHUzMEI5XHUzMDkyXHU0RjVDXHUzMDYzXHUzMDVGXHUzMDg5XHUzMDQyXHUzMDY4XHUzMDZGXHU0RjdGXHUzMDQ0XHU1NkRFXHUzMDU5XHVGRjA5XG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF92M0IgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3YzQyA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbi8qKlxuICogQSB0ZW1wb3JhcnkgdmFyaWFibGUgd2hpY2ggaXMgdXNlZCBpbiBgdXBkYXRlYFxuICovXG5jb25zdCBfd29ybGRTcGFjZVBvc2l0aW9uID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuLyoqXG4gKiBBIHRlbXBvcmFyeSB2YXJpYWJsZSB3aGljaCBpcyB1c2VkIGluIGB1cGRhdGVgXG4gKi9cbmNvbnN0IF9jZW50ZXJTcGFjZVBvc2l0aW9uID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuLyoqXG4gKiBBIHRlbXBvcmFyeSB2YXJpYWJsZSB3aGljaCBpcyB1c2VkIGluIGB1cGRhdGVgXG4gKi9cbmNvbnN0IF9uZXh0VGFpbCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbmNvbnN0IF9xdWF0QSA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5jb25zdCBfbWF0QSA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG5jb25zdCBfbWF0QiA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG5cbi8qKlxuICogQSBjbGFzcyByZXByZXNlbnRzIGEgc2luZ2xlIGpvaW50IG9mIGEgc3ByaW5nIGJvbmUuXG4gKiBJdCBzaG91bGQgYmUgbWFuYWdlZCBieSBhIFtbVlJNU3ByaW5nQm9uZU1hbmFnZXJdXS5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTVNwcmluZ0JvbmVKb2ludCB7XG4gIC8qKlxuICAgKiBTZXR0aW5ncyBvZiB0aGUgYm9uZS5cbiAgICovXG4gIHB1YmxpYyBzZXR0aW5nczogVlJNU3ByaW5nQm9uZUpvaW50U2V0dGluZ3M7XG5cbiAgLyoqXG4gICAqIENvbGxpZGVyIGdyb3VwcyBhdHRhY2hlZCB0byB0aGlzIGJvbmUuXG4gICAqL1xuICBwdWJsaWMgY29sbGlkZXJHcm91cHM6IFZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwW107XG5cbiAgLyoqXG4gICAqIEFuIE9iamVjdDNEIGF0dGFjaGVkIHRvIHRoaXMgYm9uZS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBib25lOiBUSFJFRS5PYmplY3QzRDtcblxuICAvKipcbiAgICogQW4gT2JqZWN0M0QgdGhhdCB3aWxsIGJlIHVzZWQgYXMgYSB0YWlsIG9mIHRoaXMgc3ByaW5nIGJvbmUuXG4gICAqIEl0IGNhbiBiZSBudWxsIHdoZW4gdGhlIHNwcmluZyBib25lIGlzIGltcG9ydGVkIGZyb20gVlJNIDAuMC5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBjaGlsZDogVEhSRUUuT2JqZWN0M0QgfCBudWxsO1xuXG4gIC8qKlxuICAgKiBDdXJyZW50IHBvc2l0aW9uIG9mIGNoaWxkIHRhaWwsIGluIGNlbnRlciB1bml0LiBXaWxsIGJlIHVzZWQgZm9yIHZlcmxldCBpbnRlZ3JhdGlvbi5cbiAgICovXG4gIHByaXZhdGUgX2N1cnJlbnRUYWlsID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuICAvKipcbiAgICogUHJldmlvdXMgcG9zaXRpb24gb2YgY2hpbGQgdGFpbCwgaW4gY2VudGVyIHVuaXQuIFdpbGwgYmUgdXNlZCBmb3IgdmVybGV0IGludGVncmF0aW9uLlxuICAgKi9cbiAgcHJpdmF0ZSBfcHJldlRhaWwgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4gIC8qKlxuICAgKiBJbml0aWFsIGF4aXMgb2YgdGhlIGJvbmUsIGluIGxvY2FsIHVuaXQuXG4gICAqL1xuICBwcml2YXRlIF9ib25lQXhpcyA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbiAgLyoqXG4gICAqIExlbmd0aCBvZiB0aGUgYm9uZSBpbiB3b3JsZCB1bml0LlxuICAgKiBXaWxsIGJlIHVzZWQgZm9yIG5vcm1hbGl6YXRpb24gaW4gdXBkYXRlIGxvb3AsIHdpbGwgYmUgdXBkYXRlZCBieSB7QGxpbmsgX2NhbGNXb3JsZFNwYWNlQm9uZUxlbmd0aH0uXG4gICAqXG4gICAqIEl0J3Mgc2FtZSBhcyBsb2NhbCB1bml0IGxlbmd0aCB1bmxlc3MgdGhlcmUgYXJlIHNjYWxlIHRyYW5zZm9ybWF0aW9ucyBpbiB0aGUgd29ybGQgc3BhY2UuXG4gICAqL1xuICBwcml2YXRlIF93b3JsZFNwYWNlQm9uZUxlbmd0aCA9IDAuMDtcblxuICAvKipcbiAgICogVGhpcyBzcHJpbmdib25lIHdpbGwgYmUgY2FsY3VsYXRlZCBiYXNlZCBvbiB0aGUgc3BhY2UgcmVsYXRpdmUgZnJvbSB0aGlzIG9iamVjdC5cbiAgICogSWYgdGhpcyBpcyBgbnVsbGAsIHNwcmluZ2JvbmUgd2lsbCBiZSBjYWxjdWxhdGVkIGluIHdvcmxkIHNwYWNlLlxuICAgKi9cbiAgcHJpdmF0ZSBfY2VudGVyOiBUSFJFRS5PYmplY3QzRCB8IG51bGwgPSBudWxsO1xuICBwdWJsaWMgZ2V0IGNlbnRlcigpOiBUSFJFRS5PYmplY3QzRCB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl9jZW50ZXI7XG4gIH1cbiAgcHVibGljIHNldCBjZW50ZXIoY2VudGVyOiBUSFJFRS5PYmplY3QzRCB8IG51bGwpIHtcbiAgICAvLyB1bmluc3RhbGwgaW52ZXJzZSBjYWNoZVxuICAgIGlmICh0aGlzLl9jZW50ZXI/LnVzZXJEYXRhLmludmVyc2VDYWNoZVByb3h5KSB7XG4gICAgICAodGhpcy5fY2VudGVyLnVzZXJEYXRhLmludmVyc2VDYWNoZVByb3h5IGFzIE1hdHJpeDRJbnZlcnNlQ2FjaGUpLnJldmVydCgpO1xuICAgICAgZGVsZXRlIHRoaXMuX2NlbnRlci51c2VyRGF0YS5pbnZlcnNlQ2FjaGVQcm94eTtcbiAgICB9XG5cbiAgICAvLyBjaGFuZ2UgdGhlIGNlbnRlclxuICAgIHRoaXMuX2NlbnRlciA9IGNlbnRlcjtcblxuICAgIC8vIGluc3RhbGwgaW52ZXJzZSBjYWNoZVxuICAgIGlmICh0aGlzLl9jZW50ZXIpIHtcbiAgICAgIGlmICghdGhpcy5fY2VudGVyLnVzZXJEYXRhLmludmVyc2VDYWNoZVByb3h5KSB7XG4gICAgICAgIHRoaXMuX2NlbnRlci51c2VyRGF0YS5pbnZlcnNlQ2FjaGVQcm94eSA9IG5ldyBNYXRyaXg0SW52ZXJzZUNhY2hlKHRoaXMuX2NlbnRlci5tYXRyaXhXb3JsZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWwgc3RhdGUgb2YgdGhlIGxvY2FsIG1hdHJpeCBvZiB0aGUgYm9uZS5cbiAgICovXG4gIHByaXZhdGUgX2luaXRpYWxMb2NhbE1hdHJpeCA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG5cbiAgLyoqXG4gICAqIEluaXRpYWwgc3RhdGUgb2YgdGhlIHJvdGF0aW9uIG9mIHRoZSBib25lLlxuICAgKi9cbiAgcHJpdmF0ZSBfaW5pdGlhbExvY2FsUm90YXRpb24gPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXG4gIC8qKlxuICAgKiBJbml0aWFsIHN0YXRlIG9mIHRoZSBwb3NpdGlvbiBvZiBpdHMgY2hpbGQuXG4gICAqL1xuICBwcml2YXRlIF9pbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbiAgcHVibGljIGdldCBpbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uKCk6IFRIUkVFLlZlY3RvcjMge1xuICAgIHJldHVybiB0aGlzLl9pbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHdvcmxkIG1hdHJpeCBvZiBpdHMgcGFyZW50IG9iamVjdC5cbiAgICogTm90ZSB0aGF0IGl0IHJldHVybnMgYSByZWZlcmVuY2UgdG8gdGhlIG1hdHJpeC4gRG9uJ3QgbXV0YXRlIHRoaXMgZGlyZWN0bHkhXG4gICAqL1xuICBwcml2YXRlIGdldCBfcGFyZW50TWF0cml4V29ybGQoKTogVEhSRUUuTWF0cml4NCB7XG4gICAgcmV0dXJuIHRoaXMuYm9uZS5wYXJlbnQgPyB0aGlzLmJvbmUucGFyZW50Lm1hdHJpeFdvcmxkIDogSURFTlRJVFlfTUFUUklYNDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgVlJNU3ByaW5nQm9uZS5cbiAgICpcbiAgICogQHBhcmFtIGJvbmUgQW4gT2JqZWN0M0QgdGhhdCB3aWxsIGJlIGF0dGFjaGVkIHRvIHRoaXMgYm9uZVxuICAgKiBAcGFyYW0gY2hpbGQgQW4gT2JqZWN0M0QgdGhhdCB3aWxsIGJlIHVzZWQgYXMgYSB0YWlsIG9mIHRoaXMgc3ByaW5nIGJvbmUuIEl0IGNhbiBiZSBudWxsIHdoZW4gdGhlIHNwcmluZyBib25lIGlzIGltcG9ydGVkIGZyb20gVlJNIDAuMFxuICAgKiBAcGFyYW0gc2V0dGluZ3MgU2V2ZXJhbCBwYXJhbWV0ZXJzIHJlbGF0ZWQgdG8gYmVoYXZpb3Igb2YgdGhlIHNwcmluZyBib25lXG4gICAqIEBwYXJhbSBjb2xsaWRlckdyb3VwcyBDb2xsaWRlciBncm91cHMgdGhhdCB3aWxsIGJlIGNvbGxpZGVkIHdpdGggdGhpcyBzcHJpbmcgYm9uZVxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgYm9uZTogVEhSRUUuT2JqZWN0M0QsXG4gICAgY2hpbGQ6IFRIUkVFLk9iamVjdDNEIHwgbnVsbCxcbiAgICBzZXR0aW5nczogUGFydGlhbDxWUk1TcHJpbmdCb25lSm9pbnRTZXR0aW5ncz4gPSB7fSxcbiAgICBjb2xsaWRlckdyb3VwczogVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXBbXSA9IFtdLFxuICApIHtcbiAgICB0aGlzLmJvbmUgPSBib25lOyAvLyB1bmlWUk1cdTMwNjdcdTMwNkUgcGFyZW50XG4gICAgdGhpcy5ib25lLm1hdHJpeEF1dG9VcGRhdGUgPSBmYWxzZTsgLy8gdXBkYXRlXHUzMDZCXHUzMDg4XHUzMDhBXHU4QTA4XHU3Qjk3XHUzMDU1XHUzMDhDXHUzMDhCXHUzMDZFXHUzMDY3dGhyZWUuanNcdTUxODVcdTMwNjdcdTMwNkVcdTgxRUFcdTUyRDVcdTUxRTZcdTc0MDZcdTMwNkZcdTRFMERcdTg5ODFcblxuICAgIHRoaXMuY2hpbGQgPSBjaGlsZDtcblxuICAgIHRoaXMuc2V0dGluZ3MgPSB7XG4gICAgICBoaXRSYWRpdXM6IHNldHRpbmdzLmhpdFJhZGl1cyA/PyAwLjAsXG4gICAgICBzdGlmZm5lc3M6IHNldHRpbmdzLnN0aWZmbmVzcyA/PyAxLjAsXG4gICAgICBncmF2aXR5UG93ZXI6IHNldHRpbmdzLmdyYXZpdHlQb3dlciA/PyAwLjAsXG4gICAgICBncmF2aXR5RGlyOiBzZXR0aW5ncy5ncmF2aXR5RGlyPy5jbG9uZSgpID8/IG5ldyBUSFJFRS5WZWN0b3IzKDAuMCwgLTEuMCwgMC4wKSxcbiAgICAgIGRyYWdGb3JjZTogc2V0dGluZ3MuZHJhZ0ZvcmNlID8/IDAuNCxcbiAgICB9O1xuXG4gICAgdGhpcy5jb2xsaWRlckdyb3VwcyA9IGNvbGxpZGVyR3JvdXBzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgaW5pdGlhbCBzdGF0ZSBvZiB0aGlzIHNwcmluZyBib25lLlxuICAgKiBZb3UgbWlnaHQgd2FudCB0byBjYWxsIHtAbGluayBWUk1TcHJpbmdCb25lTWFuYWdlci5zZXRJbml0U3RhdGV9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgc2V0SW5pdFN0YXRlKCk6IHZvaWQge1xuICAgIC8vIHJlbWVtYmVyIGluaXRpYWwgcG9zaXRpb24gb2YgaXRzZWxmXG4gICAgdGhpcy5faW5pdGlhbExvY2FsTWF0cml4LmNvcHkodGhpcy5ib25lLm1hdHJpeCk7XG4gICAgdGhpcy5faW5pdGlhbExvY2FsUm90YXRpb24uY29weSh0aGlzLmJvbmUucXVhdGVybmlvbik7XG5cbiAgICAvLyBzZWUgaW5pdGlhbCBwb3NpdGlvbiBvZiBpdHMgbG9jYWwgY2hpbGRcbiAgICBpZiAodGhpcy5jaGlsZCkge1xuICAgICAgdGhpcy5faW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbi5jb3B5KHRoaXMuY2hpbGQucG9zaXRpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyB2cm0wIHJlcXVpcmVzIGEgN2NtIGZpeGVkIGJvbmUgbGVuZ3RoIGZvciB0aGUgZmluYWwgbm9kZSBpbiBhIGNoYWluXG4gICAgICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS92cm0tYy92cm0tc3BlY2lmaWNhdGlvbi90cmVlL21hc3Rlci9zcGVjaWZpY2F0aW9uL1ZSTUNfc3ByaW5nQm9uZS0xLjAjYWJvdXQtc3ByaW5nLWNvbmZpZ3VyYXRpb25cbiAgICAgIHRoaXMuX2luaXRpYWxMb2NhbENoaWxkUG9zaXRpb24uY29weSh0aGlzLmJvbmUucG9zaXRpb24pLm5vcm1hbGl6ZSgpLm11bHRpcGx5U2NhbGFyKDAuMDcpO1xuICAgIH1cblxuICAgIC8vIGNvcHkgdGhlIGNoaWxkIHBvc2l0aW9uIHRvIHRhaWxzXG4gICAgY29uc3QgbWF0cml4V29ybGRUb0NlbnRlciA9IHRoaXMuX2dldE1hdHJpeFdvcmxkVG9DZW50ZXIoX21hdEEpO1xuICAgIHRoaXMuYm9uZS5sb2NhbFRvV29ybGQodGhpcy5fY3VycmVudFRhaWwuY29weSh0aGlzLl9pbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uKSkuYXBwbHlNYXRyaXg0KG1hdHJpeFdvcmxkVG9DZW50ZXIpO1xuICAgIHRoaXMuX3ByZXZUYWlsLmNvcHkodGhpcy5fY3VycmVudFRhaWwpO1xuXG4gICAgLy8gc2V0IGluaXRpYWwgc3RhdGVzIHRoYXQgYXJlIHJlbGF0ZWQgdG8gbG9jYWwgY2hpbGQgcG9zaXRpb25cbiAgICB0aGlzLl9ib25lQXhpcy5jb3B5KHRoaXMuX2luaXRpYWxMb2NhbENoaWxkUG9zaXRpb24pLm5vcm1hbGl6ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoZSBzdGF0ZSBvZiB0aGlzIGJvbmUuXG4gICAqIFlvdSBtaWdodCB3YW50IHRvIGNhbGwgW1tWUk1TcHJpbmdCb25lTWFuYWdlci5yZXNldF1dIGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy5ib25lLnF1YXRlcm5pb24uY29weSh0aGlzLl9pbml0aWFsTG9jYWxSb3RhdGlvbik7XG5cbiAgICAvLyBXZSBuZWVkIHRvIHVwZGF0ZSBpdHMgbWF0cml4V29ybGQgbWFudWFsbHksIHNpbmNlIHdlIHR3ZWFrZWQgdGhlIGJvbmUgYnkgb3VyIGhhbmRcbiAgICB0aGlzLmJvbmUudXBkYXRlTWF0cml4KCk7XG4gICAgdGhpcy5ib25lLm1hdHJpeFdvcmxkLm11bHRpcGx5TWF0cmljZXModGhpcy5fcGFyZW50TWF0cml4V29ybGQsIHRoaXMuYm9uZS5tYXRyaXgpO1xuXG4gICAgLy8gQXBwbHkgdXBkYXRlZCBwb3NpdGlvbiB0byB0YWlsIHN0YXRlc1xuICAgIGNvbnN0IG1hdHJpeFdvcmxkVG9DZW50ZXIgPSB0aGlzLl9nZXRNYXRyaXhXb3JsZFRvQ2VudGVyKF9tYXRBKTtcbiAgICB0aGlzLmJvbmUubG9jYWxUb1dvcmxkKHRoaXMuX2N1cnJlbnRUYWlsLmNvcHkodGhpcy5faW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbikpLmFwcGx5TWF0cml4NChtYXRyaXhXb3JsZFRvQ2VudGVyKTtcbiAgICB0aGlzLl9wcmV2VGFpbC5jb3B5KHRoaXMuX2N1cnJlbnRUYWlsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIHN0YXRlIG9mIHRoaXMgYm9uZS5cbiAgICogWW91IG1pZ2h0IHdhbnQgdG8gY2FsbCBbW1ZSTVNwcmluZ0JvbmVNYW5hZ2VyLnVwZGF0ZV1dIGluc3RlYWQuXG4gICAqXG4gICAqIEBwYXJhbSBkZWx0YSBkZWx0YVRpbWVcbiAgICovXG4gIHB1YmxpYyB1cGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChkZWx0YSA8PSAwKSByZXR1cm47XG5cbiAgICAvLyBVcGRhdGUgdGhlIF93b3JsZFNwYWNlQm9uZUxlbmd0aFxuICAgIHRoaXMuX2NhbGNXb3JsZFNwYWNlQm9uZUxlbmd0aCgpO1xuXG4gICAgLy8gR2V0IGJvbmUgcG9zaXRpb24gaW4gY2VudGVyIHNwYWNlXG4gICAgX3dvcmxkU3BhY2VQb3NpdGlvbi5zZXRGcm9tTWF0cml4UG9zaXRpb24odGhpcy5ib25lLm1hdHJpeFdvcmxkKTtcbiAgICBsZXQgbWF0cml4V29ybGRUb0NlbnRlciA9IHRoaXMuX2dldE1hdHJpeFdvcmxkVG9DZW50ZXIoX21hdEEpO1xuICAgIF9jZW50ZXJTcGFjZVBvc2l0aW9uLmNvcHkoX3dvcmxkU3BhY2VQb3NpdGlvbikuYXBwbHlNYXRyaXg0KG1hdHJpeFdvcmxkVG9DZW50ZXIpO1xuICAgIGNvbnN0IHF1YXRXb3JsZFRvQ2VudGVyID0gX3F1YXRBLnNldEZyb21Sb3RhdGlvbk1hdHJpeChtYXRyaXhXb3JsZFRvQ2VudGVyKTtcblxuICAgIC8vIEdldCBwYXJlbnQgbWF0cml4IGluIGNlbnRlciBzcGFjZVxuICAgIGNvbnN0IGNlbnRlclNwYWNlUGFyZW50TWF0cml4ID0gX21hdEIuY29weShtYXRyaXhXb3JsZFRvQ2VudGVyKS5tdWx0aXBseSh0aGlzLl9wYXJlbnRNYXRyaXhXb3JsZCk7XG5cbiAgICAvLyBHZXQgYm9uZUF4aXMgaW4gY2VudGVyIHNwYWNlXG4gICAgY29uc3QgY2VudGVyU3BhY2VCb25lQXhpcyA9IF92M0JcbiAgICAgIC5jb3B5KHRoaXMuX2JvbmVBeGlzKVxuICAgICAgLmFwcGx5TWF0cml4NCh0aGlzLl9pbml0aWFsTG9jYWxNYXRyaXgpXG4gICAgICAuYXBwbHlNYXRyaXg0KGNlbnRlclNwYWNlUGFyZW50TWF0cml4KVxuICAgICAgLnN1YihfY2VudGVyU3BhY2VQb3NpdGlvbilcbiAgICAgIC5ub3JtYWxpemUoKTtcblxuICAgIC8vIGdyYXZpdHkgaW4gY2VudGVyIHNwYWNlXG4gICAgY29uc3QgY2VudGVyU3BhY2VHcmF2aXR5ID0gX3YzQy5jb3B5KHRoaXMuc2V0dGluZ3MuZ3Jhdml0eURpcikuYXBwbHlRdWF0ZXJuaW9uKHF1YXRXb3JsZFRvQ2VudGVyKS5ub3JtYWxpemUoKTtcblxuICAgIGNvbnN0IG1hdHJpeENlbnRlclRvV29ybGQgPSB0aGlzLl9nZXRNYXRyaXhDZW50ZXJUb1dvcmxkKF9tYXRBKTtcblxuICAgIC8vIHZlcmxldFx1N0E0RFx1NTIwNlx1MzA2N1x1NkIyMVx1MzA2RVx1NEY0RFx1N0Y2RVx1MzA5Mlx1OEEwOFx1N0I5N1xuICAgIF9uZXh0VGFpbFxuICAgICAgLmNvcHkodGhpcy5fY3VycmVudFRhaWwpXG4gICAgICAuYWRkKFxuICAgICAgICBfdjNBXG4gICAgICAgICAgLmNvcHkodGhpcy5fY3VycmVudFRhaWwpXG4gICAgICAgICAgLnN1Yih0aGlzLl9wcmV2VGFpbClcbiAgICAgICAgICAubXVsdGlwbHlTY2FsYXIoMSAtIHRoaXMuc2V0dGluZ3MuZHJhZ0ZvcmNlKSxcbiAgICAgICkgLy8gXHU1MjREXHUzMEQ1XHUzMEVDXHUzMEZDXHUzMEUwXHUzMDZFXHU3OUZCXHU1MkQ1XHUzMDkyXHU3RDk5XHU3RDlBXHUzMDU5XHUzMDhCKFx1NkUxQlx1ODg3MFx1MzA4Mlx1MzA0Mlx1MzA4Qlx1MzA4OClcbiAgICAgIC5hZGQoX3YzQS5jb3B5KGNlbnRlclNwYWNlQm9uZUF4aXMpLm11bHRpcGx5U2NhbGFyKHRoaXMuc2V0dGluZ3Muc3RpZmZuZXNzICogZGVsdGEpKSAvLyBcdTg5QUFcdTMwNkVcdTU2REVcdThFRTJcdTMwNkJcdTMwODhcdTMwOEJcdTVCNTBcdTMwRENcdTMwRkNcdTMwRjNcdTMwNkVcdTc5RkJcdTUyRDVcdTc2RUVcdTZBMTlcbiAgICAgIC5hZGQoX3YzQS5jb3B5KGNlbnRlclNwYWNlR3Jhdml0eSkubXVsdGlwbHlTY2FsYXIodGhpcy5zZXR0aW5ncy5ncmF2aXR5UG93ZXIgKiBkZWx0YSkpIC8vIFx1NTkxNlx1NTI5Qlx1MzA2Qlx1MzA4OFx1MzA4Qlx1NzlGQlx1NTJENVx1OTFDRlxuICAgICAgLmFwcGx5TWF0cml4NChtYXRyaXhDZW50ZXJUb1dvcmxkKTsgLy8gdGFpbFx1MzA5MndvcmxkIHNwYWNlXHUzMDZCXHU2MjNCXHUzMDU5XG5cbiAgICAvLyBub3JtYWxpemUgYm9uZSBsZW5ndGhcbiAgICBfbmV4dFRhaWwuc3ViKF93b3JsZFNwYWNlUG9zaXRpb24pLm5vcm1hbGl6ZSgpLm11bHRpcGx5U2NhbGFyKHRoaXMuX3dvcmxkU3BhY2VCb25lTGVuZ3RoKS5hZGQoX3dvcmxkU3BhY2VQb3NpdGlvbik7XG5cbiAgICAvLyBDb2xsaXNpb25cdTMwNjdcdTc5RkJcdTUyRDVcbiAgICB0aGlzLl9jb2xsaXNpb24oX25leHRUYWlsKTtcblxuICAgIC8vIHVwZGF0ZSBwcmV2VGFpbCBhbmQgY3VycmVudFRhaWxcbiAgICBtYXRyaXhXb3JsZFRvQ2VudGVyID0gdGhpcy5fZ2V0TWF0cml4V29ybGRUb0NlbnRlcihfbWF0QSk7XG5cbiAgICB0aGlzLl9wcmV2VGFpbC5jb3B5KHRoaXMuX2N1cnJlbnRUYWlsKTtcbiAgICB0aGlzLl9jdXJyZW50VGFpbC5jb3B5KF92M0EuY29weShfbmV4dFRhaWwpLmFwcGx5TWF0cml4NChtYXRyaXhXb3JsZFRvQ2VudGVyKSk7XG5cbiAgICAvLyBBcHBseSByb3RhdGlvbiwgY29udmVydCB2ZWN0b3IzIHRoaW5nIGludG8gYWN0dWFsIHF1YXRlcm5pb25cbiAgICAvLyBPcmlnaW5hbCBVbmlWUk0gaXMgZG9pbmcgY2VudGVyIHVuaXQgY2FsY3VsdXMgYXQgaGVyZSBidXQgd2UncmUgZ29ubmEgZG8gdGhpcyBvbiBsb2NhbCB1bml0XG4gICAgY29uc3Qgd29ybGRTcGFjZUluaXRpYWxNYXRyaXhJbnYgPSBtYXQ0SW52ZXJ0Q29tcGF0KFxuICAgICAgX21hdEEuY29weSh0aGlzLl9wYXJlbnRNYXRyaXhXb3JsZCkubXVsdGlwbHkodGhpcy5faW5pdGlhbExvY2FsTWF0cml4KSxcbiAgICApO1xuICAgIGNvbnN0IGFwcGx5Um90YXRpb24gPSBfcXVhdEEuc2V0RnJvbVVuaXRWZWN0b3JzKFxuICAgICAgdGhpcy5fYm9uZUF4aXMsXG4gICAgICBfdjNBLmNvcHkoX25leHRUYWlsKS5hcHBseU1hdHJpeDQod29ybGRTcGFjZUluaXRpYWxNYXRyaXhJbnYpLm5vcm1hbGl6ZSgpLFxuICAgICk7XG5cbiAgICB0aGlzLmJvbmUucXVhdGVybmlvbi5jb3B5KHRoaXMuX2luaXRpYWxMb2NhbFJvdGF0aW9uKS5tdWx0aXBseShhcHBseVJvdGF0aW9uKTtcblxuICAgIC8vIFdlIG5lZWQgdG8gdXBkYXRlIGl0cyBtYXRyaXhXb3JsZCBtYW51YWxseSwgc2luY2Ugd2UgdHdlYWtlZCB0aGUgYm9uZSBieSBvdXIgaGFuZFxuICAgIHRoaXMuYm9uZS51cGRhdGVNYXRyaXgoKTtcbiAgICB0aGlzLmJvbmUubWF0cml4V29ybGQubXVsdGlwbHlNYXRyaWNlcyh0aGlzLl9wYXJlbnRNYXRyaXhXb3JsZCwgdGhpcy5ib25lLm1hdHJpeCk7XG4gIH1cblxuICAvKipcbiAgICogRG8gY29sbGlzaW9uIG1hdGggYWdhaW5zdCBldmVyeSBjb2xsaWRlcnMgYXR0YWNoZWQgdG8gdGhpcyBib25lLlxuICAgKlxuICAgKiBAcGFyYW0gdGFpbCBUaGUgdGFpbCB5b3Ugd2FudCB0byBwcm9jZXNzXG4gICAqL1xuICBwcml2YXRlIF9jb2xsaXNpb24odGFpbDogVEhSRUUuVmVjdG9yMyk6IHZvaWQge1xuICAgIHRoaXMuY29sbGlkZXJHcm91cHMuZm9yRWFjaCgoY29sbGlkZXJHcm91cCkgPT4ge1xuICAgICAgY29sbGlkZXJHcm91cC5jb2xsaWRlcnMuZm9yRWFjaCgoY29sbGlkZXIpID0+IHtcbiAgICAgICAgY29uc3QgZGlzdCA9IGNvbGxpZGVyLnNoYXBlLmNhbGN1bGF0ZUNvbGxpc2lvbihjb2xsaWRlci5tYXRyaXhXb3JsZCwgdGFpbCwgdGhpcy5zZXR0aW5ncy5oaXRSYWRpdXMsIF92M0EpO1xuXG4gICAgICAgIGlmIChkaXN0IDwgMC4wKSB7XG4gICAgICAgICAgLy8gaGl0XG4gICAgICAgICAgdGFpbC5hZGQoX3YzQS5tdWx0aXBseVNjYWxhcigtZGlzdCkpO1xuXG4gICAgICAgICAgLy8gbm9ybWFsaXplIGJvbmUgbGVuZ3RoXG4gICAgICAgICAgdGFpbC5zdWIoX3dvcmxkU3BhY2VQb3NpdGlvbikubm9ybWFsaXplKCkubXVsdGlwbHlTY2FsYXIodGhpcy5fd29ybGRTcGFjZUJvbmVMZW5ndGgpLmFkZChfd29ybGRTcGFjZVBvc2l0aW9uKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlIHRoZSB7QGxpbmsgX3dvcmxkU3BhY2VCb25lTGVuZ3RofS5cbiAgICogSW50ZW5kZWQgdG8gYmUgdXNlZCBpbiB7QGxpbmsgdXBkYXRlfS5cbiAgICovXG4gIHByaXZhdGUgX2NhbGNXb3JsZFNwYWNlQm9uZUxlbmd0aCgpOiB2b2lkIHtcbiAgICBfdjNBLnNldEZyb21NYXRyaXhQb3NpdGlvbih0aGlzLmJvbmUubWF0cml4V29ybGQpOyAvLyBnZXQgd29ybGQgcG9zaXRpb24gb2YgdGhpcy5ib25lXG5cbiAgICBpZiAodGhpcy5jaGlsZCkge1xuICAgICAgX3YzQi5zZXRGcm9tTWF0cml4UG9zaXRpb24odGhpcy5jaGlsZC5tYXRyaXhXb3JsZCk7IC8vIGdldCB3b3JsZCBwb3NpdGlvbiBvZiB0aGlzLmNoaWxkXG4gICAgfSBlbHNlIHtcbiAgICAgIF92M0IuY29weSh0aGlzLl9pbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uKTtcbiAgICAgIF92M0IuYXBwbHlNYXRyaXg0KHRoaXMuYm9uZS5tYXRyaXhXb3JsZCk7XG4gICAgfVxuXG4gICAgdGhpcy5fd29ybGRTcGFjZUJvbmVMZW5ndGggPSBfdjNBLnN1YihfdjNCKS5sZW5ndGgoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBtYXRyaXggdGhhdCBjb252ZXJ0cyBjZW50ZXIgc3BhY2UgaW50byB3b3JsZCBzcGFjZS5cbiAgICogQHBhcmFtIHRhcmdldCBUYXJnZXQgbWF0cml4XG4gICAqL1xuICBwcml2YXRlIF9nZXRNYXRyaXhDZW50ZXJUb1dvcmxkKHRhcmdldDogVEhSRUUuTWF0cml4NCk6IFRIUkVFLk1hdHJpeDQge1xuICAgIGlmICh0aGlzLl9jZW50ZXIpIHtcbiAgICAgIHRhcmdldC5jb3B5KHRoaXMuX2NlbnRlci5tYXRyaXhXb3JsZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhcmdldC5pZGVudGl0eSgpO1xuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbWF0cml4IHRoYXQgY29udmVydHMgd29ybGQgc3BhY2UgaW50byBjZW50ZXIgc3BhY2UuXG4gICAqIEBwYXJhbSB0YXJnZXQgVGFyZ2V0IG1hdHJpeFxuICAgKi9cbiAgcHJpdmF0ZSBfZ2V0TWF0cml4V29ybGRUb0NlbnRlcih0YXJnZXQ6IFRIUkVFLk1hdHJpeDQpOiBUSFJFRS5NYXRyaXg0IHtcbiAgICBpZiAodGhpcy5fY2VudGVyKSB7XG4gICAgICB0YXJnZXQuY29weSgodGhpcy5fY2VudGVyLnVzZXJEYXRhLmludmVyc2VDYWNoZVByb3h5IGFzIE1hdHJpeDRJbnZlcnNlQ2FjaGUpLmludmVyc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0YXJnZXQuaWRlbnRpdHkoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG5jb25zdCBfbWF0QSA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG5cbi8qKlxuICogQSBjb21wYXQgZnVuY3Rpb24gZm9yIGBNYXRyaXg0LmludmVydCgpYCAvIGBNYXRyaXg0LmdldEludmVyc2UoKWAuXG4gKiBgTWF0cml4NC5pbnZlcnQoKWAgaXMgaW50cm9kdWNlZCBpbiByMTIzIGFuZCBgTWF0cml4NC5nZXRJbnZlcnNlKClgIGVtaXRzIGEgd2FybmluZy5cbiAqIFdlIGFyZSBnb2luZyB0byB1c2UgdGhpcyBjb21wYXQgZm9yIGEgd2hpbGUuXG4gKiBAcGFyYW0gdGFyZ2V0IEEgdGFyZ2V0IG1hdHJpeFxuICovXG5leHBvcnQgZnVuY3Rpb24gbWF0NEludmVydENvbXBhdDxUIGV4dGVuZHMgVEhSRUUuTWF0cml4ND4odGFyZ2V0OiBUKTogVCB7XG4gIGlmICgodGFyZ2V0IGFzIGFueSkuaW52ZXJ0KSB7XG4gICAgdGFyZ2V0LmludmVydCgpO1xuICB9IGVsc2Uge1xuICAgICh0YXJnZXQgYXMgYW55KS5nZXRJbnZlcnNlKF9tYXRBLmNvcHkodGFyZ2V0KSk7XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IG1hdDRJbnZlcnRDb21wYXQgfSBmcm9tICcuL21hdDRJbnZlcnRDb21wYXQnO1xuXG5leHBvcnQgY2xhc3MgTWF0cml4NEludmVyc2VDYWNoZSB7XG4gIC8qKlxuICAgKiBUaGUgdGFyZ2V0IG1hdHJpeC5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBtYXRyaXg6IFRIUkVFLk1hdHJpeDQ7XG5cbiAgLyoqXG4gICAqIEEgY2FjaGUgb2YgaW52ZXJzZSBvZiBjdXJyZW50IG1hdHJpeC5cbiAgICovXG4gIHByaXZhdGUgcmVhZG9ubHkgX2ludmVyc2VDYWNoZSA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG5cbiAgLyoqXG4gICAqIEEgZmxhZyB0aGF0IG1ha2VzIGl0IHdhbnQgdG8gcmVjYWxjdWxhdGUgaXRzIHtAbGluayBfaW52ZXJzZUNhY2hlfS5cbiAgICogV2lsbCBiZSBzZXQgYHRydWVgIHdoZW4gYGVsZW1lbnRzYCBhcmUgbXV0YXRlZCBhbmQgYmUgdXNlZCBpbiBgZ2V0SW52ZXJzZWAuXG4gICAqL1xuICBwcml2YXRlIF9zaG91bGRVcGRhdGVJbnZlcnNlID0gdHJ1ZTtcblxuICAvKipcbiAgICogVGhlIG9yaWdpbmFsIG9mIGBtYXRyaXguZWxlbWVudHNgXG4gICAqL1xuICBwcml2YXRlIHJlYWRvbmx5IF9vcmlnaW5hbEVsZW1lbnRzOiBUSFJFRS5NYXRyaXg0VHVwbGU7XG5cbiAgLyoqXG4gICAqIEludmVyc2Ugb2YgZ2l2ZW4gbWF0cml4LlxuICAgKiBOb3RlIHRoYXQgaXQgd2lsbCByZXR1cm4gaXRzIGludGVybmFsIHByaXZhdGUgaW5zdGFuY2UuXG4gICAqIE1ha2Ugc3VyZSBjb3B5aW5nIHRoaXMgYmVmb3JlIG11dGF0ZSB0aGlzLlxuICAgKi9cbiAgcHVibGljIGdldCBpbnZlcnNlKCk6IFRIUkVFLk1hdHJpeDQge1xuICAgIGlmICh0aGlzLl9zaG91bGRVcGRhdGVJbnZlcnNlKSB7XG4gICAgICBtYXQ0SW52ZXJ0Q29tcGF0KHRoaXMuX2ludmVyc2VDYWNoZS5jb3B5KHRoaXMubWF0cml4KSk7XG4gICAgICB0aGlzLl9zaG91bGRVcGRhdGVJbnZlcnNlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX2ludmVyc2VDYWNoZTtcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihtYXRyaXg6IFRIUkVFLk1hdHJpeDQpIHtcbiAgICB0aGlzLm1hdHJpeCA9IG1hdHJpeDtcblxuICAgIGNvbnN0IGhhbmRsZXI6IFByb3h5SGFuZGxlcjxudW1iZXJbXT4gPSB7XG4gICAgICBzZXQ6IChvYmosIHByb3A6IGFueSwgbmV3VmFsKSA9PiB7XG4gICAgICAgIHRoaXMuX3Nob3VsZFVwZGF0ZUludmVyc2UgPSB0cnVlO1xuICAgICAgICBvYmpbcHJvcF0gPSBuZXdWYWw7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9LFxuICAgIH07XG5cbiAgICB0aGlzLl9vcmlnaW5hbEVsZW1lbnRzID0gbWF0cml4LmVsZW1lbnRzO1xuICAgIG1hdHJpeC5lbGVtZW50cyA9IG5ldyBQcm94eTxUSFJFRS5NYXRyaXg0VHVwbGU+KG1hdHJpeC5lbGVtZW50cywgaGFuZGxlcik7XG4gIH1cblxuICBwdWJsaWMgcmV2ZXJ0KCk6IHZvaWQge1xuICAgIHRoaXMubWF0cml4LmVsZW1lbnRzID0gdGhpcy5fb3JpZ2luYWxFbGVtZW50cztcbiAgfVxufVxuIiwgImltcG9ydCB0eXBlICogYXMgVjBWUk0gZnJvbSAnQHBpeGl2L3R5cGVzLXZybS0wLjAnO1xuaW1wb3J0IHR5cGUgKiBhcyBWMVNwcmluZ0JvbmVTY2hlbWEgZnJvbSAnQHBpeGl2L3R5cGVzLXZybWMtc3ByaW5nYm9uZS0xLjAnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHR5cGUgeyBHTFRGLCBHTFRGTG9hZGVyUGx1Z2luLCBHTFRGUGFyc2VyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlci5qcyc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXJIZWxwZXIsIFZSTVNwcmluZ0JvbmVKb2ludEhlbHBlciB9IGZyb20gJy4vaGVscGVycyc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXIgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVDb2xsaWRlcic7XG5pbXBvcnQgdHlwZSB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cCc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZUNhcHN1bGUgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlQ2Fwc3VsZSc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZVNwaGVyZSB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVTcGhlcmUnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUpvaW50IH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lSm9pbnQnO1xuaW1wb3J0IHR5cGUgeyBWUk1TcHJpbmdCb25lTG9hZGVyUGx1Z2luT3B0aW9ucyB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUxvYWRlclBsdWdpbk9wdGlvbnMnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZU1hbmFnZXIgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVNYW5hZ2VyJztcbmltcG9ydCB0eXBlIHsgVlJNU3ByaW5nQm9uZUpvaW50U2V0dGluZ3MgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVKb2ludFNldHRpbmdzJztcbmltcG9ydCB7IEdMVEYgYXMgR0xURlNjaGVtYSB9IGZyb20gJ0BnbHRmLXRyYW5zZm9ybS9jb3JlJztcblxuLyoqXG4gKiBQb3NzaWJsZSBzcGVjIHZlcnNpb25zIGl0IHJlY29nbml6ZXMuXG4gKi9cbmNvbnN0IFBPU1NJQkxFX1NQRUNfVkVSU0lPTlMgPSBuZXcgU2V0KFsnMS4wJywgJzEuMC1iZXRhJ10pO1xuXG5leHBvcnQgY2xhc3MgVlJNU3ByaW5nQm9uZUxvYWRlclBsdWdpbiBpbXBsZW1lbnRzIEdMVEZMb2FkZXJQbHVnaW4ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEVYVEVOU0lPTl9OQU1FID0gJ1ZSTUNfc3ByaW5nQm9uZSc7XG5cbiAgLyoqXG4gICAqIFNwZWNpZnkgYW4gT2JqZWN0M0QgdG8gYWRkIHtAbGluayBWUk1TcHJpbmdCb25lSm9pbnRIZWxwZXJ9IHMuXG4gICAqIElmIG5vdCBzcGVjaWZpZWQsIGhlbHBlciB3aWxsIG5vdCBiZSBjcmVhdGVkLlxuICAgKiBJZiBgcmVuZGVyT3JkZXJgIGlzIHNldCB0byB0aGUgcm9vdCwgaGVscGVycyB3aWxsIGNvcHkgdGhlIHNhbWUgYHJlbmRlck9yZGVyYCAuXG4gICAqL1xuICBwdWJsaWMgam9pbnRIZWxwZXJSb290PzogVEhSRUUuT2JqZWN0M0Q7XG5cbiAgLyoqXG4gICAqIFNwZWNpZnkgYW4gT2JqZWN0M0QgdG8gYWRkIHtAbGluayBWUk1TcHJpbmdCb25lSm9pbnRIZWxwZXJ9IHMuXG4gICAqIElmIG5vdCBzcGVjaWZpZWQsIGhlbHBlciB3aWxsIG5vdCBiZSBjcmVhdGVkLlxuICAgKiBJZiBgcmVuZGVyT3JkZXJgIGlzIHNldCB0byB0aGUgcm9vdCwgaGVscGVycyB3aWxsIGNvcHkgdGhlIHNhbWUgYHJlbmRlck9yZGVyYCAuXG4gICAqL1xuICBwdWJsaWMgY29sbGlkZXJIZWxwZXJSb290PzogVEhSRUUuT2JqZWN0M0Q7XG5cbiAgcHVibGljIHJlYWRvbmx5IHBhcnNlcjogR0xURlBhcnNlcjtcblxuICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gVlJNU3ByaW5nQm9uZUxvYWRlclBsdWdpbi5FWFRFTlNJT05fTkFNRTtcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJzZXI6IEdMVEZQYXJzZXIsIG9wdGlvbnM/OiBWUk1TcHJpbmdCb25lTG9hZGVyUGx1Z2luT3B0aW9ucykge1xuICAgIHRoaXMucGFyc2VyID0gcGFyc2VyO1xuXG4gICAgdGhpcy5qb2ludEhlbHBlclJvb3QgPSBvcHRpb25zPy5qb2ludEhlbHBlclJvb3Q7XG4gICAgdGhpcy5jb2xsaWRlckhlbHBlclJvb3QgPSBvcHRpb25zPy5jb2xsaWRlckhlbHBlclJvb3Q7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgYWZ0ZXJSb290KGdsdGY6IEdMVEYpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBnbHRmLnVzZXJEYXRhLnZybVNwcmluZ0JvbmVNYW5hZ2VyID0gYXdhaXQgdGhpcy5faW1wb3J0KGdsdGYpO1xuICB9XG5cbiAgLyoqXG4gICAqIEltcG9ydCBzcHJpbmcgYm9uZXMgZnJvbSBhIEdMVEYgYW5kIHJldHVybiBhIHtAbGluayBWUk1TcHJpbmdCb25lTWFuYWdlcn0uXG4gICAqIEl0IG1pZ2h0IHJldHVybiBgbnVsbGAgaW5zdGVhZCB3aGVuIGl0IGRvZXMgbm90IG5lZWQgdG8gYmUgY3JlYXRlZCBvciBzb21ldGhpbmcgZ28gd3JvbmcuXG4gICAqXG4gICAqIEBwYXJhbSBnbHRmIEEgcGFyc2VkIHJlc3VsdCBvZiBHTFRGIHRha2VuIGZyb20gR0xURkxvYWRlclxuICAgKi9cbiAgcHJpdmF0ZSBhc3luYyBfaW1wb3J0KGdsdGY6IEdMVEYpOiBQcm9taXNlPFZSTVNwcmluZ0JvbmVNYW5hZ2VyIHwgbnVsbD4ge1xuICAgIGNvbnN0IHYxUmVzdWx0ID0gYXdhaXQgdGhpcy5fdjFJbXBvcnQoZ2x0Zik7XG4gICAgaWYgKHYxUmVzdWx0ICE9IG51bGwpIHtcbiAgICAgIHJldHVybiB2MVJlc3VsdDtcbiAgICB9XG5cbiAgICBjb25zdCB2MFJlc3VsdCA9IGF3YWl0IHRoaXMuX3YwSW1wb3J0KGdsdGYpO1xuICAgIGlmICh2MFJlc3VsdCAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gdjBSZXN1bHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF92MUltcG9ydChnbHRmOiBHTFRGKTogUHJvbWlzZTxWUk1TcHJpbmdCb25lTWFuYWdlciB8IG51bGw+IHtcbiAgICBjb25zdCBqc29uID0gZ2x0Zi5wYXJzZXIuanNvbiBhcyBHTFRGU2NoZW1hLklHTFRGO1xuXG4gICAgLy8gZWFybHkgYWJvcnQgaWYgaXQgZG9lc24ndCB1c2Ugc3ByaW5nIGJvbmVzXG4gICAgY29uc3QgaXNTcHJpbmdCb25lVXNlZCA9IGpzb24uZXh0ZW5zaW9uc1VzZWQ/LmluZGV4T2YoVlJNU3ByaW5nQm9uZUxvYWRlclBsdWdpbi5FWFRFTlNJT05fTkFNRSkgIT09IC0xO1xuICAgIGlmICghaXNTcHJpbmdCb25lVXNlZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgbWFuYWdlciA9IG5ldyBWUk1TcHJpbmdCb25lTWFuYWdlcigpO1xuXG4gICAgY29uc3QgdGhyZWVOb2RlczogVEhSRUUuT2JqZWN0M0RbXSA9IGF3YWl0IGdsdGYucGFyc2VyLmdldERlcGVuZGVuY2llcygnbm9kZScpO1xuXG4gICAgY29uc3QgZXh0ZW5zaW9uID0ganNvbi5leHRlbnNpb25zPy5bVlJNU3ByaW5nQm9uZUxvYWRlclBsdWdpbi5FWFRFTlNJT05fTkFNRV0gYXNcbiAgICAgIHwgVjFTcHJpbmdCb25lU2NoZW1hLlZSTUNTcHJpbmdCb25lXG4gICAgICB8IHVuZGVmaW5lZDtcbiAgICBpZiAoIWV4dGVuc2lvbikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc3BlY1ZlcnNpb24gPSBleHRlbnNpb24uc3BlY1ZlcnNpb247XG4gICAgaWYgKCFQT1NTSUJMRV9TUEVDX1ZFUlNJT05TLmhhcyhzcGVjVmVyc2lvbikpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgYFZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW46IFVua25vd24gJHtWUk1TcHJpbmdCb25lTG9hZGVyUGx1Z2luLkVYVEVOU0lPTl9OQU1FfSBzcGVjVmVyc2lvbiBcIiR7c3BlY1ZlcnNpb259XCJgLFxuICAgICAgKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbGxpZGVycyA9IGV4dGVuc2lvbi5jb2xsaWRlcnM/Lm1hcCgoc2NoZW1hQ29sbGlkZXIsIGlDb2xsaWRlcikgPT4ge1xuICAgICAgY29uc3Qgbm9kZSA9IHRocmVlTm9kZXNbc2NoZW1hQ29sbGlkZXIubm9kZSFdO1xuICAgICAgY29uc3Qgc2NoZW1hU2hhcGUgPSBzY2hlbWFDb2xsaWRlci5zaGFwZSE7XG5cbiAgICAgIGlmIChzY2hlbWFTaGFwZS5zcGhlcmUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ltcG9ydFNwaGVyZUNvbGxpZGVyKG5vZGUsIHtcbiAgICAgICAgICBvZmZzZXQ6IG5ldyBUSFJFRS5WZWN0b3IzKCkuZnJvbUFycmF5KHNjaGVtYVNoYXBlLnNwaGVyZS5vZmZzZXQgPz8gWzAuMCwgMC4wLCAwLjBdKSxcbiAgICAgICAgICByYWRpdXM6IHNjaGVtYVNoYXBlLnNwaGVyZS5yYWRpdXMgPz8gMC4wLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoc2NoZW1hU2hhcGUuY2Fwc3VsZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5faW1wb3J0Q2Fwc3VsZUNvbGxpZGVyKG5vZGUsIHtcbiAgICAgICAgICBvZmZzZXQ6IG5ldyBUSFJFRS5WZWN0b3IzKCkuZnJvbUFycmF5KHNjaGVtYVNoYXBlLmNhcHN1bGUub2Zmc2V0ID8/IFswLjAsIDAuMCwgMC4wXSksXG4gICAgICAgICAgcmFkaXVzOiBzY2hlbWFTaGFwZS5jYXBzdWxlLnJhZGl1cyA/PyAwLjAsXG4gICAgICAgICAgdGFpbDogbmV3IFRIUkVFLlZlY3RvcjMoKS5mcm9tQXJyYXkoc2NoZW1hU2hhcGUuY2Fwc3VsZS50YWlsID8/IFswLjAsIDAuMCwgMC4wXSksXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW46IFRoZSBjb2xsaWRlciAjJHtpQ29sbGlkZXJ9IGhhcyBubyB2YWxpZCBzaGFwZWApO1xuICAgIH0pO1xuXG4gICAgY29uc3QgY29sbGlkZXJHcm91cHMgPSBleHRlbnNpb24uY29sbGlkZXJHcm91cHM/Lm1hcChcbiAgICAgIChzY2hlbWFDb2xsaWRlckdyb3VwLCBpQ29sbGlkZXJHcm91cCk6IFZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwID0+IHtcbiAgICAgICAgY29uc3QgY29scyA9IChzY2hlbWFDb2xsaWRlckdyb3VwLmNvbGxpZGVycyA/PyBbXSkubWFwKChpQ29sbGlkZXIpID0+IHtcbiAgICAgICAgICBjb25zdCBjb2wgPSBjb2xsaWRlcnM/LltpQ29sbGlkZXJdO1xuXG4gICAgICAgICAgaWYgKGNvbCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgIGBWUk1TcHJpbmdCb25lTG9hZGVyUGx1Z2luOiBUaGUgY29sbGlkZXJHcm91cCAjJHtpQ29sbGlkZXJHcm91cH0gYXR0ZW1wdGVkIHRvIHVzZSBhIGNvbGxpZGVyICMke2lDb2xsaWRlcn0gYnV0IG5vdCBmb3VuZGAsXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBjb2w7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgY29sbGlkZXJzOiBjb2xzLFxuICAgICAgICAgIG5hbWU6IHNjaGVtYUNvbGxpZGVyR3JvdXAubmFtZSxcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgKTtcblxuICAgIGV4dGVuc2lvbi5zcHJpbmdzPy5mb3JFYWNoKChzY2hlbWFTcHJpbmcsIGlTcHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IHNjaGVtYUpvaW50cyA9IHNjaGVtYVNwcmluZy5qb2ludHM7XG5cbiAgICAgIC8vIHByZXBhcmUgY29sbGlkZXJzXG4gICAgICBjb25zdCBjb2xsaWRlckdyb3Vwc0ZvclNwcmluZyA9IHNjaGVtYVNwcmluZy5jb2xsaWRlckdyb3Vwcz8ubWFwKChpQ29sbGlkZXJHcm91cCkgPT4ge1xuICAgICAgICBjb25zdCBncm91cCA9IGNvbGxpZGVyR3JvdXBzPy5baUNvbGxpZGVyR3JvdXBdO1xuXG4gICAgICAgIGlmIChncm91cCA9PSBudWxsKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgYFZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW46IFRoZSBzcHJpbmcgIyR7aVNwcmluZ30gYXR0ZW1wdGVkIHRvIHVzZSBhIGNvbGxpZGVyR3JvdXAgJHtpQ29sbGlkZXJHcm91cH0gYnV0IG5vdCBmb3VuZGAsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBncm91cDtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBjZW50ZXIgPSBzY2hlbWFTcHJpbmcuY2VudGVyICE9IG51bGwgPyB0aHJlZU5vZGVzW3NjaGVtYVNwcmluZy5jZW50ZXJdIDogdW5kZWZpbmVkO1xuXG4gICAgICBsZXQgcHJldlNjaGVtYUpvaW50OiBWMVNwcmluZ0JvbmVTY2hlbWEuU3ByaW5nQm9uZUpvaW50IHwgdW5kZWZpbmVkO1xuICAgICAgc2NoZW1hSm9pbnRzLmZvckVhY2goKHNjaGVtYUpvaW50KSA9PiB7XG4gICAgICAgIGlmIChwcmV2U2NoZW1hSm9pbnQpIHtcbiAgICAgICAgICAvLyBwcmVwYXJlIG5vZGVcbiAgICAgICAgICBjb25zdCBub2RlSW5kZXggPSBwcmV2U2NoZW1hSm9pbnQubm9kZTtcbiAgICAgICAgICBjb25zdCBub2RlID0gdGhyZWVOb2Rlc1tub2RlSW5kZXhdO1xuICAgICAgICAgIGNvbnN0IGNoaWxkSW5kZXggPSBzY2hlbWFKb2ludC5ub2RlO1xuICAgICAgICAgIGNvbnN0IGNoaWxkID0gdGhyZWVOb2Rlc1tjaGlsZEluZGV4XTtcblxuICAgICAgICAgIC8vIHByZXBhcmUgc2V0dGluZ1xuICAgICAgICAgIGNvbnN0IHNldHRpbmc6IFBhcnRpYWw8VlJNU3ByaW5nQm9uZUpvaW50U2V0dGluZ3M+ID0ge1xuICAgICAgICAgICAgaGl0UmFkaXVzOiBwcmV2U2NoZW1hSm9pbnQuaGl0UmFkaXVzLFxuICAgICAgICAgICAgZHJhZ0ZvcmNlOiBwcmV2U2NoZW1hSm9pbnQuZHJhZ0ZvcmNlLFxuICAgICAgICAgICAgZ3Jhdml0eVBvd2VyOiBwcmV2U2NoZW1hSm9pbnQuZ3Jhdml0eVBvd2VyLFxuICAgICAgICAgICAgc3RpZmZuZXNzOiBwcmV2U2NoZW1hSm9pbnQuc3RpZmZuZXNzLFxuICAgICAgICAgICAgZ3Jhdml0eURpcjpcbiAgICAgICAgICAgICAgcHJldlNjaGVtYUpvaW50LmdyYXZpdHlEaXIgIT0gbnVsbFxuICAgICAgICAgICAgICAgID8gbmV3IFRIUkVFLlZlY3RvcjMoKS5mcm9tQXJyYXkocHJldlNjaGVtYUpvaW50LmdyYXZpdHlEaXIpXG4gICAgICAgICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIC8vIGNyZWF0ZSBzcHJpbmcgYm9uZXNcbiAgICAgICAgICBjb25zdCBqb2ludCA9IHRoaXMuX2ltcG9ydEpvaW50KG5vZGUsIGNoaWxkLCBzZXR0aW5nLCBjb2xsaWRlckdyb3Vwc0ZvclNwcmluZyk7XG4gICAgICAgICAgaWYgKGNlbnRlcikge1xuICAgICAgICAgICAgam9pbnQuY2VudGVyID0gY2VudGVyO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIG1hbmFnZXIuYWRkSm9pbnQoam9pbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJldlNjaGVtYUpvaW50ID0gc2NoZW1hSm9pbnQ7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIGluaXQgc3ByaW5nIGJvbmVzXG4gICAgbWFuYWdlci5zZXRJbml0U3RhdGUoKTtcblxuICAgIHJldHVybiBtYW5hZ2VyO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfdjBJbXBvcnQoZ2x0ZjogR0xURik6IFByb21pc2U8VlJNU3ByaW5nQm9uZU1hbmFnZXIgfCBudWxsPiB7XG4gICAgY29uc3QganNvbiA9IGdsdGYucGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAgIC8vIGVhcmx5IGFib3J0IGlmIGl0IGRvZXNuJ3QgdXNlIHZybVxuICAgIGNvbnN0IGlzVlJNVXNlZCA9IGpzb24uZXh0ZW5zaW9uc1VzZWQ/LmluZGV4T2YoJ1ZSTScpICE9PSAtMTtcbiAgICBpZiAoIWlzVlJNVXNlZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gZWFybHkgYWJvcnQgaWYgaXQgZG9lc24ndCBoYXZlIGJvbmUgZ3JvdXBzXG4gICAgY29uc3QgZXh0ZW5zaW9uID0ganNvbi5leHRlbnNpb25zPy5bJ1ZSTSddIGFzIFYwVlJNLlZSTSB8IHVuZGVmaW5lZDtcbiAgICBjb25zdCBzY2hlbWFTZWNvbmRhcnlBbmltYXRpb24gPSBleHRlbnNpb24/LnNlY29uZGFyeUFuaW1hdGlvbjtcbiAgICBpZiAoIXNjaGVtYVNlY29uZGFyeUFuaW1hdGlvbikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc2NoZW1hQm9uZUdyb3VwcyA9IHNjaGVtYVNlY29uZGFyeUFuaW1hdGlvbj8uYm9uZUdyb3VwcztcbiAgICBpZiAoIXNjaGVtYUJvbmVHcm91cHMpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IG1hbmFnZXIgPSBuZXcgVlJNU3ByaW5nQm9uZU1hbmFnZXIoKTtcblxuICAgIGNvbnN0IHRocmVlTm9kZXM6IFRIUkVFLk9iamVjdDNEW10gPSBhd2FpdCBnbHRmLnBhcnNlci5nZXREZXBlbmRlbmNpZXMoJ25vZGUnKTtcblxuICAgIGNvbnN0IGNvbGxpZGVyR3JvdXBzID0gc2NoZW1hU2Vjb25kYXJ5QW5pbWF0aW9uLmNvbGxpZGVyR3JvdXBzPy5tYXAoXG4gICAgICAoc2NoZW1hQ29sbGlkZXJHcm91cCk6IFZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwID0+IHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IHRocmVlTm9kZXNbc2NoZW1hQ29sbGlkZXJHcm91cC5ub2RlIV07XG4gICAgICAgIGNvbnN0IGNvbGxpZGVycyA9IChzY2hlbWFDb2xsaWRlckdyb3VwLmNvbGxpZGVycyA/PyBbXSkubWFwKChzY2hlbWFDb2xsaWRlciwgaUNvbGxpZGVyKSA9PiB7XG4gICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gbmV3IFRIUkVFLlZlY3RvcjMoMC4wLCAwLjAsIDAuMCk7XG4gICAgICAgICAgaWYgKHNjaGVtYUNvbGxpZGVyLm9mZnNldCkge1xuICAgICAgICAgICAgb2Zmc2V0LnNldChcbiAgICAgICAgICAgICAgc2NoZW1hQ29sbGlkZXIub2Zmc2V0LnggPz8gMC4wLFxuICAgICAgICAgICAgICBzY2hlbWFDb2xsaWRlci5vZmZzZXQueSA/PyAwLjAsXG4gICAgICAgICAgICAgIHNjaGVtYUNvbGxpZGVyLm9mZnNldC56ID8gLXNjaGVtYUNvbGxpZGVyLm9mZnNldC56IDogMC4wLCAvLyB6IGlzIG9wcG9zaXRlIGluIFZSTTAuMFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gdGhpcy5faW1wb3J0U3BoZXJlQ29sbGlkZXIobm9kZSwge1xuICAgICAgICAgICAgb2Zmc2V0LFxuICAgICAgICAgICAgcmFkaXVzOiBzY2hlbWFDb2xsaWRlci5yYWRpdXMgPz8gMC4wLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4geyBjb2xsaWRlcnMgfTtcbiAgICAgIH0sXG4gICAgKTtcblxuICAgIC8vIGltcG9ydCBzcHJpbmcgYm9uZXMgZm9yIGVhY2ggc3ByaW5nIGJvbmUgZ3JvdXBzXG4gICAgc2NoZW1hQm9uZUdyb3Vwcz8uZm9yRWFjaCgoc2NoZW1hQm9uZUdyb3VwLCBpQm9uZUdyb3VwKSA9PiB7XG4gICAgICBjb25zdCByb290SW5kaWNlcyA9IHNjaGVtYUJvbmVHcm91cC5ib25lcztcbiAgICAgIGlmICghcm9vdEluZGljZXMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICByb290SW5kaWNlcy5mb3JFYWNoKChyb290SW5kZXgpID0+IHtcbiAgICAgICAgY29uc3Qgcm9vdCA9IHRocmVlTm9kZXNbcm9vdEluZGV4XTtcblxuICAgICAgICAvLyBwcmVwYXJlIHNldHRpbmdcbiAgICAgICAgY29uc3QgZ3Jhdml0eURpciA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG4gICAgICAgIGlmIChzY2hlbWFCb25lR3JvdXAuZ3Jhdml0eURpcikge1xuICAgICAgICAgIGdyYXZpdHlEaXIuc2V0KFxuICAgICAgICAgICAgc2NoZW1hQm9uZUdyb3VwLmdyYXZpdHlEaXIueCA/PyAwLjAsXG4gICAgICAgICAgICBzY2hlbWFCb25lR3JvdXAuZ3Jhdml0eURpci55ID8/IDAuMCxcbiAgICAgICAgICAgIHNjaGVtYUJvbmVHcm91cC5ncmF2aXR5RGlyLnogPz8gMC4wLFxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZ3Jhdml0eURpci5zZXQoMC4wLCAtMS4wLCAwLjApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY2VudGVyID0gc2NoZW1hQm9uZUdyb3VwLmNlbnRlciAhPSBudWxsID8gdGhyZWVOb2Rlc1tzY2hlbWFCb25lR3JvdXAuY2VudGVyXSA6IHVuZGVmaW5lZDtcblxuICAgICAgICBjb25zdCBzZXR0aW5nOiBQYXJ0aWFsPFZSTVNwcmluZ0JvbmVKb2ludFNldHRpbmdzPiA9IHtcbiAgICAgICAgICBoaXRSYWRpdXM6IHNjaGVtYUJvbmVHcm91cC5oaXRSYWRpdXMsXG4gICAgICAgICAgZHJhZ0ZvcmNlOiBzY2hlbWFCb25lR3JvdXAuZHJhZ0ZvcmNlLFxuICAgICAgICAgIGdyYXZpdHlQb3dlcjogc2NoZW1hQm9uZUdyb3VwLmdyYXZpdHlQb3dlcixcbiAgICAgICAgICBzdGlmZm5lc3M6IHNjaGVtYUJvbmVHcm91cC5zdGlmZmluZXNzLFxuICAgICAgICAgIGdyYXZpdHlEaXIsXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gcHJlcGFyZSBjb2xsaWRlcnNcbiAgICAgICAgY29uc3QgY29sbGlkZXJHcm91cHNGb3JTcHJpbmcgPSBzY2hlbWFCb25lR3JvdXAuY29sbGlkZXJHcm91cHM/Lm1hcCgoaUNvbGxpZGVyR3JvdXApID0+IHtcbiAgICAgICAgICBjb25zdCBncm91cCA9IGNvbGxpZGVyR3JvdXBzPy5baUNvbGxpZGVyR3JvdXBdO1xuXG4gICAgICAgICAgaWYgKGdyb3VwID09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgYFZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW46IFRoZSBzcHJpbmcgIyR7aUJvbmVHcm91cH0gYXR0ZW1wdGVkIHRvIHVzZSBhIGNvbGxpZGVyR3JvdXAgJHtpQ29sbGlkZXJHcm91cH0gYnV0IG5vdCBmb3VuZGAsXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBncm91cDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gY3JlYXRlIHNwcmluZyBib25lc1xuICAgICAgICByb290LnRyYXZlcnNlKChub2RlKSA9PiB7XG4gICAgICAgICAgY29uc3QgY2hpbGQ6IFRIUkVFLk9iamVjdDNEIHwgbnVsbCA9IG5vZGUuY2hpbGRyZW5bMF0gPz8gbnVsbDtcblxuICAgICAgICAgIGNvbnN0IGpvaW50ID0gdGhpcy5faW1wb3J0Sm9pbnQobm9kZSwgY2hpbGQsIHNldHRpbmcsIGNvbGxpZGVyR3JvdXBzRm9yU3ByaW5nKTtcbiAgICAgICAgICBpZiAoY2VudGVyKSB7XG4gICAgICAgICAgICBqb2ludC5jZW50ZXIgPSBjZW50ZXI7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbWFuYWdlci5hZGRKb2ludChqb2ludCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBpbml0IHNwcmluZyBib25lc1xuICAgIGdsdGYuc2NlbmUudXBkYXRlTWF0cml4V29ybGQoKTtcbiAgICBtYW5hZ2VyLnNldEluaXRTdGF0ZSgpO1xuXG4gICAgcmV0dXJuIG1hbmFnZXI7XG4gIH1cblxuICBwcml2YXRlIF9pbXBvcnRKb2ludChcbiAgICBub2RlOiBUSFJFRS5PYmplY3QzRCxcbiAgICBjaGlsZDogVEhSRUUuT2JqZWN0M0QsXG4gICAgc2V0dGluZz86IFBhcnRpYWw8VlJNU3ByaW5nQm9uZUpvaW50U2V0dGluZ3M+LFxuICAgIGNvbGxpZGVyR3JvdXBzRm9yU3ByaW5nPzogVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXBbXSxcbiAgKTogVlJNU3ByaW5nQm9uZUpvaW50IHtcbiAgICBjb25zdCBzcHJpbmdCb25lID0gbmV3IFZSTVNwcmluZ0JvbmVKb2ludChub2RlLCBjaGlsZCwgc2V0dGluZywgY29sbGlkZXJHcm91cHNGb3JTcHJpbmcpO1xuXG4gICAgaWYgKHRoaXMuam9pbnRIZWxwZXJSb290KSB7XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgVlJNU3ByaW5nQm9uZUpvaW50SGVscGVyKHNwcmluZ0JvbmUpO1xuICAgICAgdGhpcy5qb2ludEhlbHBlclJvb3QuYWRkKGhlbHBlcik7XG4gICAgICBoZWxwZXIucmVuZGVyT3JkZXIgPSB0aGlzLmpvaW50SGVscGVyUm9vdC5yZW5kZXJPcmRlcjtcbiAgICB9XG5cbiAgICByZXR1cm4gc3ByaW5nQm9uZTtcbiAgfVxuXG4gIHByaXZhdGUgX2ltcG9ydFNwaGVyZUNvbGxpZGVyKFxuICAgIGRlc3RpbmF0aW9uOiBUSFJFRS5PYmplY3QzRCxcbiAgICBwYXJhbXM6IHtcbiAgICAgIG9mZnNldDogVEhSRUUuVmVjdG9yMztcbiAgICAgIHJhZGl1czogbnVtYmVyO1xuICAgIH0sXG4gICk6IFZSTVNwcmluZ0JvbmVDb2xsaWRlciB7XG4gICAgY29uc3QgeyBvZmZzZXQsIHJhZGl1cyB9ID0gcGFyYW1zO1xuXG4gICAgY29uc3Qgc2hhcGUgPSBuZXcgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVTcGhlcmUoeyBvZmZzZXQsIHJhZGl1cyB9KTtcblxuICAgIGNvbnN0IGNvbGxpZGVyID0gbmV3IFZSTVNwcmluZ0JvbmVDb2xsaWRlcihzaGFwZSk7XG5cbiAgICBkZXN0aW5hdGlvbi5hZGQoY29sbGlkZXIpO1xuXG4gICAgaWYgKHRoaXMuY29sbGlkZXJIZWxwZXJSb290KSB7XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgVlJNU3ByaW5nQm9uZUNvbGxpZGVySGVscGVyKGNvbGxpZGVyKTtcbiAgICAgIHRoaXMuY29sbGlkZXJIZWxwZXJSb290LmFkZChoZWxwZXIpO1xuICAgICAgaGVscGVyLnJlbmRlck9yZGVyID0gdGhpcy5jb2xsaWRlckhlbHBlclJvb3QucmVuZGVyT3JkZXI7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbGxpZGVyO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW1wb3J0Q2Fwc3VsZUNvbGxpZGVyKFxuICAgIGRlc3RpbmF0aW9uOiBUSFJFRS5PYmplY3QzRCxcbiAgICBwYXJhbXM6IHtcbiAgICAgIG9mZnNldDogVEhSRUUuVmVjdG9yMztcbiAgICAgIHJhZGl1czogbnVtYmVyO1xuICAgICAgdGFpbDogVEhSRUUuVmVjdG9yMztcbiAgICB9LFxuICApOiBWUk1TcHJpbmdCb25lQ29sbGlkZXIge1xuICAgIGNvbnN0IHsgb2Zmc2V0LCByYWRpdXMsIHRhaWwgfSA9IHBhcmFtcztcblxuICAgIGNvbnN0IHNoYXBlID0gbmV3IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlQ2Fwc3VsZSh7IG9mZnNldCwgcmFkaXVzLCB0YWlsIH0pO1xuXG4gICAgY29uc3QgY29sbGlkZXIgPSBuZXcgVlJNU3ByaW5nQm9uZUNvbGxpZGVyKHNoYXBlKTtcblxuICAgIGRlc3RpbmF0aW9uLmFkZChjb2xsaWRlcik7XG5cbiAgICBpZiAodGhpcy5jb2xsaWRlckhlbHBlclJvb3QpIHtcbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBWUk1TcHJpbmdCb25lQ29sbGlkZXJIZWxwZXIoY29sbGlkZXIpO1xuICAgICAgdGhpcy5jb2xsaWRlckhlbHBlclJvb3QuYWRkKGhlbHBlcik7XG4gICAgICBoZWxwZXIucmVuZGVyT3JkZXIgPSB0aGlzLmNvbGxpZGVySGVscGVyUm9vdC5yZW5kZXJPcmRlcjtcbiAgICB9XG5cbiAgICByZXR1cm4gY29sbGlkZXI7XG4gIH1cbn1cbiIsICJpbXBvcnQgdHlwZSAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuZXhwb3J0IGZ1bmN0aW9uIHRyYXZlcnNlQW5jZXN0b3JzRnJvbVJvb3Qob2JqZWN0OiBUSFJFRS5PYmplY3QzRCwgY2FsbGJhY2s6IChvYmplY3Q6IFRIUkVFLk9iamVjdDNEKSA9PiB2b2lkKTogdm9pZCB7XG4gIGNvbnN0IGFuY2VzdG9yczogVEhSRUUuT2JqZWN0M0RbXSA9IFtdO1xuXG4gIGxldCBoZWFkOiBUSFJFRS5PYmplY3QzRCB8IG51bGwgPSBvYmplY3Q7XG4gIHdoaWxlIChoZWFkICE9PSBudWxsKSB7XG4gICAgYW5jZXN0b3JzLnVuc2hpZnQoaGVhZCk7XG4gICAgaGVhZCA9IGhlYWQucGFyZW50O1xuICB9XG5cbiAgYW5jZXN0b3JzLmZvckVhY2goKGFuY2VzdG9yKSA9PiB7XG4gICAgY2FsbGJhY2soYW5jZXN0b3IpO1xuICB9KTtcbn1cbiIsICJpbXBvcnQgdHlwZSAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBUcmF2ZXJzZSBjaGlsZHJlbiBvZiBnaXZlbiBvYmplY3QgYW5kIGV4ZWN1dGUgZ2l2ZW4gY2FsbGJhY2suXG4gKiBUaGUgZ2l2ZW4gb2JqZWN0IGl0c2VsZiB3b250IGJlIGdpdmVuIHRvIHRoZSBjYWxsYmFjay5cbiAqIElmIHRoZSByZXR1cm4gdmFsdWUgb2YgdGhlIGNhbGxiYWNrIGlzIGB0cnVlYCwgaXQgd2lsbCBoYWx0IHRoZSB0cmF2ZXJzYWwgb2YgaXRzIGNoaWxkcmVuLlxuICogQHBhcmFtIG9iamVjdCBBIHJvb3Qgb2JqZWN0XG4gKiBAcGFyYW0gY2FsbGJhY2sgQSBjYWxsYmFjayBmdW5jdGlvbiBjYWxsZWQgZm9yIGVhY2ggY2hpbGRyZW5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRyYXZlcnNlQ2hpbGRyZW5VbnRpbENvbmRpdGlvbk1ldChcbiAgb2JqZWN0OiBUSFJFRS5PYmplY3QzRCxcbiAgY2FsbGJhY2s6IChvYmplY3Q6IFRIUkVFLk9iamVjdDNEKSA9PiBib29sZWFuLFxuKTogdm9pZCB7XG4gIG9iamVjdC5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IGNhbGxiYWNrKGNoaWxkKTtcbiAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgdHJhdmVyc2VDaGlsZHJlblVudGlsQ29uZGl0aW9uTWV0KGNoaWxkLCBjYWxsYmFjayk7XG4gICAgfVxuICB9KTtcbn1cbiIsICJpbXBvcnQgdHlwZSAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB0eXBlIHsgVlJNU3ByaW5nQm9uZUpvaW50IH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lSm9pbnQnO1xuaW1wb3J0IHsgdHJhdmVyc2VBbmNlc3RvcnNGcm9tUm9vdCB9IGZyb20gJy4vdXRpbHMvdHJhdmVyc2VBbmNlc3RvcnNGcm9tUm9vdCc7XG5pbXBvcnQgdHlwZSB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlciB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyJztcbmltcG9ydCB0eXBlIHsgVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXAgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwJztcbmltcG9ydCB7IHRyYXZlcnNlQ2hpbGRyZW5VbnRpbENvbmRpdGlvbk1ldCB9IGZyb20gJy4vdXRpbHMvdHJhdmVyc2VDaGlsZHJlblVudGlsQ29uZGl0aW9uTWV0JztcblxuZXhwb3J0IGNsYXNzIFZSTVNwcmluZ0JvbmVNYW5hZ2VyIHtcbiAgcHJpdmF0ZSBfam9pbnRzID0gbmV3IFNldDxWUk1TcHJpbmdCb25lSm9pbnQ+KCk7XG4gIHB1YmxpYyBnZXQgam9pbnRzKCk6IFNldDxWUk1TcHJpbmdCb25lSm9pbnQ+IHtcbiAgICByZXR1cm4gdGhpcy5fam9pbnRzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFVzZSB7QGxpbmsgam9pbnRzfSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIGdldCBzcHJpbmdCb25lcygpOiBTZXQ8VlJNU3ByaW5nQm9uZUpvaW50PiB7XG4gICAgY29uc29sZS53YXJuKCdWUk1TcHJpbmdCb25lTWFuYWdlcjogc3ByaW5nQm9uZXMgaXMgZGVwcmVjYXRlZC4gdXNlIGpvaW50cyBpbnN0ZWFkLicpO1xuXG4gICAgcmV0dXJuIHRoaXMuX2pvaW50cztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgY29sbGlkZXJHcm91cHMoKTogVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXBbXSB7XG4gICAgY29uc3Qgc2V0ID0gbmV3IFNldDxWUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cD4oKTtcbiAgICB0aGlzLl9qb2ludHMuZm9yRWFjaCgoc3ByaW5nQm9uZSkgPT4ge1xuICAgICAgc3ByaW5nQm9uZS5jb2xsaWRlckdyb3Vwcy5mb3JFYWNoKChjb2xsaWRlckdyb3VwKSA9PiB7XG4gICAgICAgIHNldC5hZGQoY29sbGlkZXJHcm91cCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShzZXQpO1xuICB9XG5cbiAgcHVibGljIGdldCBjb2xsaWRlcnMoKTogVlJNU3ByaW5nQm9uZUNvbGxpZGVyW10ge1xuICAgIGNvbnN0IHNldCA9IG5ldyBTZXQ8VlJNU3ByaW5nQm9uZUNvbGxpZGVyPigpO1xuICAgIHRoaXMuY29sbGlkZXJHcm91cHMuZm9yRWFjaCgoY29sbGlkZXJHcm91cCkgPT4ge1xuICAgICAgY29sbGlkZXJHcm91cC5jb2xsaWRlcnMuZm9yRWFjaCgoY29sbGlkZXIpID0+IHtcbiAgICAgICAgc2V0LmFkZChjb2xsaWRlcik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShzZXQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfb2JqZWN0U3ByaW5nQm9uZXNNYXAgPSBuZXcgTWFwPFRIUkVFLk9iamVjdDNELCBTZXQ8VlJNU3ByaW5nQm9uZUpvaW50Pj4oKTtcblxuICBwdWJsaWMgYWRkSm9pbnQoam9pbnQ6IFZSTVNwcmluZ0JvbmVKb2ludCk6IHZvaWQge1xuICAgIHRoaXMuX2pvaW50cy5hZGQoam9pbnQpO1xuXG4gICAgbGV0IG9iamVjdFNldCA9IHRoaXMuX29iamVjdFNwcmluZ0JvbmVzTWFwLmdldChqb2ludC5ib25lKTtcbiAgICBpZiAob2JqZWN0U2V0ID09IG51bGwpIHtcbiAgICAgIG9iamVjdFNldCA9IG5ldyBTZXQ8VlJNU3ByaW5nQm9uZUpvaW50PigpO1xuICAgICAgdGhpcy5fb2JqZWN0U3ByaW5nQm9uZXNNYXAuc2V0KGpvaW50LmJvbmUsIG9iamVjdFNldCk7XG4gICAgfVxuICAgIG9iamVjdFNldC5hZGQoam9pbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFVzZSB7QGxpbmsgYWRkSm9pbnR9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgYWRkU3ByaW5nQm9uZShqb2ludDogVlJNU3ByaW5nQm9uZUpvaW50KTogdm9pZCB7XG4gICAgY29uc29sZS53YXJuKCdWUk1TcHJpbmdCb25lTWFuYWdlcjogYWRkU3ByaW5nQm9uZSgpIGlzIGRlcHJlY2F0ZWQuIHVzZSBhZGRKb2ludCgpIGluc3RlYWQuJyk7XG5cbiAgICB0aGlzLmFkZEpvaW50KGpvaW50KTtcbiAgfVxuXG4gIHB1YmxpYyBkZWxldGVKb2ludChqb2ludDogVlJNU3ByaW5nQm9uZUpvaW50KTogdm9pZCB7XG4gICAgdGhpcy5fam9pbnRzLmRlbGV0ZShqb2ludCk7XG5cbiAgICBjb25zdCBvYmplY3RTZXQgPSB0aGlzLl9vYmplY3RTcHJpbmdCb25lc01hcC5nZXQoam9pbnQuYm9uZSkhO1xuICAgIG9iamVjdFNldC5kZWxldGUoam9pbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFVzZSB7QGxpbmsgZGVsZXRlSm9pbnR9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgZGVsZXRlU3ByaW5nQm9uZShqb2ludDogVlJNU3ByaW5nQm9uZUpvaW50KTogdm9pZCB7XG4gICAgY29uc29sZS53YXJuKCdWUk1TcHJpbmdCb25lTWFuYWdlcjogZGVsZXRlU3ByaW5nQm9uZSgpIGlzIGRlcHJlY2F0ZWQuIHVzZSBkZWxldGVKb2ludCgpIGluc3RlYWQuJyk7XG5cbiAgICB0aGlzLmRlbGV0ZUpvaW50KGpvaW50KTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRJbml0U3RhdGUoKTogdm9pZCB7XG4gICAgY29uc3Qgc3ByaW5nQm9uZXNUcmllZCA9IG5ldyBTZXQ8VlJNU3ByaW5nQm9uZUpvaW50PigpO1xuICAgIGNvbnN0IHNwcmluZ0JvbmVzRG9uZSA9IG5ldyBTZXQ8VlJNU3ByaW5nQm9uZUpvaW50PigpO1xuICAgIGNvbnN0IG9iamVjdFVwZGF0ZWQgPSBuZXcgU2V0PFRIUkVFLk9iamVjdDNEPigpO1xuXG4gICAgZm9yIChjb25zdCBzcHJpbmdCb25lIG9mIHRoaXMuX2pvaW50cykge1xuICAgICAgdGhpcy5fcHJvY2Vzc1NwcmluZ0JvbmUoc3ByaW5nQm9uZSwgc3ByaW5nQm9uZXNUcmllZCwgc3ByaW5nQm9uZXNEb25lLCBvYmplY3RVcGRhdGVkLCAoc3ByaW5nQm9uZSkgPT5cbiAgICAgICAgc3ByaW5nQm9uZS5zZXRJbml0U3RhdGUoKSxcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xuICAgIGNvbnN0IHNwcmluZ0JvbmVzVHJpZWQgPSBuZXcgU2V0PFZSTVNwcmluZ0JvbmVKb2ludD4oKTtcbiAgICBjb25zdCBzcHJpbmdCb25lc0RvbmUgPSBuZXcgU2V0PFZSTVNwcmluZ0JvbmVKb2ludD4oKTtcbiAgICBjb25zdCBvYmplY3RVcGRhdGVkID0gbmV3IFNldDxUSFJFRS5PYmplY3QzRD4oKTtcblxuICAgIGZvciAoY29uc3Qgc3ByaW5nQm9uZSBvZiB0aGlzLl9qb2ludHMpIHtcbiAgICAgIHRoaXMuX3Byb2Nlc3NTcHJpbmdCb25lKHNwcmluZ0JvbmUsIHNwcmluZ0JvbmVzVHJpZWQsIHNwcmluZ0JvbmVzRG9uZSwgb2JqZWN0VXBkYXRlZCwgKHNwcmluZ0JvbmUpID0+XG4gICAgICAgIHNwcmluZ0JvbmUucmVzZXQoKSxcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHVwZGF0ZShkZWx0YTogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3Qgc3ByaW5nQm9uZXNUcmllZCA9IG5ldyBTZXQ8VlJNU3ByaW5nQm9uZUpvaW50PigpO1xuICAgIGNvbnN0IHNwcmluZ0JvbmVzRG9uZSA9IG5ldyBTZXQ8VlJNU3ByaW5nQm9uZUpvaW50PigpO1xuICAgIGNvbnN0IG9iamVjdFVwZGF0ZWQgPSBuZXcgU2V0PFRIUkVFLk9iamVjdDNEPigpO1xuXG4gICAgZm9yIChjb25zdCBzcHJpbmdCb25lIG9mIHRoaXMuX2pvaW50cykge1xuICAgICAgLy8gdXBkYXRlIHRoZSBzcHJpbmdib25lXG4gICAgICB0aGlzLl9wcm9jZXNzU3ByaW5nQm9uZShzcHJpbmdCb25lLCBzcHJpbmdCb25lc1RyaWVkLCBzcHJpbmdCb25lc0RvbmUsIG9iamVjdFVwZGF0ZWQsIChzcHJpbmdCb25lKSA9PlxuICAgICAgICBzcHJpbmdCb25lLnVwZGF0ZShkZWx0YSksXG4gICAgICApO1xuXG4gICAgICAvLyB1cGRhdGUgY2hpbGRyZW4gd29ybGQgbWF0cmljZXNcbiAgICAgIC8vIGl0IGlzIHJlcXVpcmVkIHdoZW4gdGhlIHNwcmluZyBib25lIGNoYWluIGlzIHNwYXJzZVxuICAgICAgdHJhdmVyc2VDaGlsZHJlblVudGlsQ29uZGl0aW9uTWV0KHNwcmluZ0JvbmUuYm9uZSwgKG9iamVjdCkgPT4ge1xuICAgICAgICAvLyBpZiB0aGUgb2JqZWN0IGhhcyBhdHRhY2hlZCBzcHJpbmdib25lLCBoYWx0IHRoZSB0cmF2ZXJzYWxcbiAgICAgICAgaWYgKCh0aGlzLl9vYmplY3RTcHJpbmdCb25lc01hcC5nZXQob2JqZWN0KT8uc2l6ZSA/PyAwKSA+IDApIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG90aGVyd2lzZSB1cGRhdGUgaXRzIHdvcmxkIG1hdHJpeFxuICAgICAgICBvYmplY3QudXBkYXRlV29ybGRNYXRyaXgoZmFsc2UsIGZhbHNlKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBhIHNwcmluZyBib25lLlxuICAgKiBJZiB0aGVyZSBhcmUgb3RoZXIgc3ByaW5nIGJvbmUgdGhhdCBhcmUgZGVwZW5kYW50LCBpdCB3aWxsIHRyeSB0byB1cGRhdGUgdGhlbSByZWN1cnNpdmVseS5cbiAgICogSXQgdXBkYXRlcyBtYXRyaXhXb3JsZCBvZiBhbGwgYW5jZXN0b3JzIGFuZCBteXNlbGYuXG4gICAqIEl0IG1pZ2h0IHRocm93IGFuIGVycm9yIGlmIHRoZXJlIGFyZSBjaXJjdWxhciBkZXBlbmRlbmNpZXMuXG4gICAqXG4gICAqIEludGVuZGVkIHRvIGJlIHVzZWQgaW4ge0BsaW5rIHVwZGF0ZX0gYW5kIHtAbGluayBfcHJvY2Vzc1NwcmluZ0JvbmV9IGl0c2VsZiByZWN1cnNpdmVseS5cbiAgICpcbiAgICogQHBhcmFtIHNwcmluZ0JvbmUgQSBzcHJpbmdCb25lIHlvdSB3YW50IHRvIHVwZGF0ZVxuICAgKiBAcGFyYW0gc3ByaW5nQm9uZXNUcmllZCBTZXQgb2Ygc3ByaW5nQm9uZXMgdGhhdCBhcmUgYWxyZWFkeSB0cmllZCB0byBiZSB1cGRhdGVkXG4gICAqIEBwYXJhbSBzcHJpbmdCb25lc0RvbmUgU2V0IG9mIHNwcmluZ0JvbmVzIHRoYXQgYXJlIGFscmVhZHkgdXAgdG8gZGF0ZVxuICAgKiBAcGFyYW0gb2JqZWN0VXBkYXRlZCBTZXQgb2Ygb2JqZWN0M0Qgd2hvc2UgbWF0cml4V29ybGQgaXMgdXBkYXRlZFxuICAgKi9cbiAgcHJpdmF0ZSBfcHJvY2Vzc1NwcmluZ0JvbmUoXG4gICAgc3ByaW5nQm9uZTogVlJNU3ByaW5nQm9uZUpvaW50LFxuICAgIHNwcmluZ0JvbmVzVHJpZWQ6IFNldDxWUk1TcHJpbmdCb25lSm9pbnQ+LFxuICAgIHNwcmluZ0JvbmVzRG9uZTogU2V0PFZSTVNwcmluZ0JvbmVKb2ludD4sXG4gICAgb2JqZWN0VXBkYXRlZDogU2V0PFRIUkVFLk9iamVjdDNEPixcbiAgICBjYWxsYmFjazogKHNwcmluZ0JvbmU6IFZSTVNwcmluZ0JvbmVKb2ludCkgPT4gdm9pZCxcbiAgKTogdm9pZCB7XG4gICAgaWYgKHNwcmluZ0JvbmVzRG9uZS5oYXMoc3ByaW5nQm9uZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoc3ByaW5nQm9uZXNUcmllZC5oYXMoc3ByaW5nQm9uZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVlJNU3ByaW5nQm9uZU1hbmFnZXI6IENpcmN1bGFyIGRlcGVuZGVuY3kgZGV0ZWN0ZWQgd2hpbGUgdXBkYXRpbmcgc3ByaW5nYm9uZXMnKTtcbiAgICB9XG4gICAgc3ByaW5nQm9uZXNUcmllZC5hZGQoc3ByaW5nQm9uZSk7XG5cbiAgICBjb25zdCBkZXBPYmplY3RzID0gdGhpcy5fZ2V0RGVwZW5kZW5jaWVzKHNwcmluZ0JvbmUpO1xuICAgIGZvciAoY29uc3QgZGVwT2JqZWN0IG9mIGRlcE9iamVjdHMpIHtcbiAgICAgIHRyYXZlcnNlQW5jZXN0b3JzRnJvbVJvb3QoZGVwT2JqZWN0LCAoZGVwT2JqZWN0QW5jZXN0b3IpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqZWN0U2V0ID0gdGhpcy5fb2JqZWN0U3ByaW5nQm9uZXNNYXAuZ2V0KGRlcE9iamVjdEFuY2VzdG9yKTtcbiAgICAgICAgaWYgKG9iamVjdFNldCkge1xuICAgICAgICAgIGZvciAoY29uc3QgZGVwU3ByaW5nQm9uZSBvZiBvYmplY3RTZXQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Byb2Nlc3NTcHJpbmdCb25lKGRlcFNwcmluZ0JvbmUsIHNwcmluZ0JvbmVzVHJpZWQsIHNwcmluZ0JvbmVzRG9uZSwgb2JqZWN0VXBkYXRlZCwgY2FsbGJhY2spO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICghb2JqZWN0VXBkYXRlZC5oYXMoZGVwT2JqZWN0QW5jZXN0b3IpKSB7XG4gICAgICAgICAgLy8gdXBkYXRlIG1hdHJpeCBvZiBub24tc3ByaW5nYm9uZVxuICAgICAgICAgIGRlcE9iamVjdEFuY2VzdG9yLnVwZGF0ZVdvcmxkTWF0cml4KGZhbHNlLCBmYWxzZSk7XG4gICAgICAgICAgb2JqZWN0VXBkYXRlZC5hZGQoZGVwT2JqZWN0QW5jZXN0b3IpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgbXkgbWF0cml4XG4gICAgc3ByaW5nQm9uZS5ib25lLnVwZGF0ZU1hdHJpeCgpO1xuICAgIHNwcmluZ0JvbmUuYm9uZS51cGRhdGVXb3JsZE1hdHJpeChmYWxzZSwgZmFsc2UpO1xuXG4gICAgY2FsbGJhY2soc3ByaW5nQm9uZSk7XG5cbiAgICBvYmplY3RVcGRhdGVkLmFkZChzcHJpbmdCb25lLmJvbmUpO1xuXG4gICAgc3ByaW5nQm9uZXNEb25lLmFkZChzcHJpbmdCb25lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYSBzZXQgb2Ygb2JqZWN0cyB0aGF0IGFyZSBkZXBlbmRhbnQgb2YgZ2l2ZW4gc3ByaW5nIGJvbmUuXG4gICAqIEBwYXJhbSBzcHJpbmdCb25lIEEgc3ByaW5nIGJvbmVcbiAgICogQHJldHVybiBBIHNldCBvZiBvYmplY3RzIHRoYXQgYXJlIGRlcGVuZGFudCBvZiBnaXZlbiBzcHJpbmcgYm9uZVxuICAgKi9cbiAgcHJpdmF0ZSBfZ2V0RGVwZW5kZW5jaWVzKHNwcmluZ0JvbmU6IFZSTVNwcmluZ0JvbmVKb2ludCk6IFNldDxUSFJFRS5PYmplY3QzRD4ge1xuICAgIGNvbnN0IHNldCA9IG5ldyBTZXQ8VEhSRUUuT2JqZWN0M0Q+KCk7XG5cbiAgICBjb25zdCBwYXJlbnQgPSBzcHJpbmdCb25lLmJvbmUucGFyZW50O1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgIHNldC5hZGQocGFyZW50KTtcbiAgICB9XG5cbiAgICBzcHJpbmdCb25lLmNvbGxpZGVyR3JvdXBzLmZvckVhY2goKGNvbGxpZGVyR3JvdXApID0+IHtcbiAgICAgIGNvbGxpZGVyR3JvdXAuY29sbGlkZXJzLmZvckVhY2goKGNvbGxpZGVyKSA9PiB7XG4gICAgICAgIHNldC5hZGQoY29sbGlkZXIpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc2V0O1xuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7OztBQ0FBLElBQUFBLFNBQXVCOzs7QUNBdkIsWUFBdUI7OztBQ0toQixJQUFlLDZCQUFmLE1BQTBD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dUI7QUFDdkIsVUFBTSxFQUFFLFFBQVEsT0FBTyxJQUFJO0FBRTNCLFVBQU0sUUFBUSxJQUFJLGlDQUFpQyxFQUFFLFFBQVEsT0FBTyxDQUFDO0FBRXJFLFVBQU0sV0FBVyxJQUFJLHNCQUFzQixLQUFLO0FBRWhELGdCQUFZLElBQUksUUFBUTtBQUV4QixRQUFJLEtBQUssb0JBQW9CO0FBQzNCLFlBQU0sU0FBUyxJQUFJLDRCQUE0QixRQUFRO0FBQ3ZELFdBQUssbUJBQW1CLElBQUksTUFBTTtBQUNsQyxhQUFPLGNBQWMsS0FBSyxtQkFBbUI7QUFBQSxJQUMvQztBQUVBLFdBQU87QUFBQSxFQUNUO0FBQUEsRUFFUSx1QkFDTixhQUNBLFFBS3VCO0FBQ3ZCLFVBQU0sRUFBRSxRQUFRLFFBQVEsS0FBSyxJQUFJO0FBRWpDLFVBQU0sUUFBUSxJQUFJLGtDQUFrQyxFQUFFLFFBQVEsUUFBUSxLQUFLLENBQUM7QUFFNUUsVUFBTSxXQUFXLElBQUksc0JBQXNCLEtBQUs7QUFFaEQsZ0JBQVksSUFBSSxRQUFRO0FBRXhCLFFBQUksS0FBSyxvQkFBb0I7QUFDM0IsWUFBTSxTQUFTLElBQUksNEJBQTRCLFFBQVE7QUFDdkQsV0FBSyxtQkFBbUIsSUFBSSxNQUFNO0FBQ2xDLGFBQU8sY0FBYyxLQUFLLG1CQUFtQjtBQUFBLElBQy9DO0FBRUEsV0FBTztBQUFBLEVBQ1Q7QUFDRjtBQXhXYSwyQkFDWSxpQkFBaUI7QUFEbkMsSUFBTSw0QkFBTjsiLAogICJuYW1lcyI6IFsiVEhSRUUiLCAiVEhSRUUiLCAiVEhSRUUiLCAiX3YzQSIsICJUSFJFRSIsICJfdjNBIiwgIlRIUkVFIiwgIlRIUkVFIiwgIl92M0EiLCAiVEhSRUUiLCAiVEhSRUUiLCAiVEhSRUUiLCAiVEhSRUUiLCAiX3YzQSIsICJfdjNCIiwgIl9tYXRBIiwgIlRIUkVFIiwgInNwcmluZ0JvbmUiLCAiX2EiLCAiX2IiLCAiX2MiLCAiX2QiLCAiX2UiXQp9Cg==
