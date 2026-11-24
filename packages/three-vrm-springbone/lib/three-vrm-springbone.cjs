/*!
 * @pixiv/three-vrm-springbone v3.6.0
 * Spring bone module for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2026 pixiv Inc.
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
  VRMSpringBoneColliderShapePlane: () => VRMSpringBoneColliderShapePlane,
  VRMSpringBoneColliderShapeSphere: () => VRMSpringBoneColliderShapeSphere,
  VRMSpringBoneJoint: () => VRMSpringBoneJoint,
  VRMSpringBoneJointHelper: () => VRMSpringBoneJointHelper,
  VRMSpringBoneLimit: () => VRMSpringBoneLimit,
  VRMSpringBoneLimitCone: () => VRMSpringBoneLimitCone,
  VRMSpringBoneLimitHelper: () => VRMSpringBoneLimitHelper,
  VRMSpringBoneLimitHinge: () => VRMSpringBoneLimitHinge,
  VRMSpringBoneLimitSpherical: () => VRMSpringBoneLimitSpherical,
  VRMSpringBoneLoaderPlugin: () => VRMSpringBoneLoaderPlugin,
  VRMSpringBoneManager: () => VRMSpringBoneManager
});
module.exports = __toCommonJS(src_exports);

// src/helpers/VRMSpringBoneColliderHelper.ts
var THREE7 = __toESM(require("three"), 1);

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
    var _a, _b, _c, _d;
    super();
    this.offset = (_a = params == null ? void 0 : params.offset) != null ? _a : new THREE.Vector3(0, 0, 0);
    this.tail = (_b = params == null ? void 0 : params.tail) != null ? _b : new THREE.Vector3(0, 0, 0);
    this.radius = (_c = params == null ? void 0 : params.radius) != null ? _c : 0;
    this.inside = (_d = params == null ? void 0 : params.inside) != null ? _d : false;
  }
  calculateCollision(colliderMatrix, objectPosition, objectRadius, target) {
    _v3A.setFromMatrixPosition(colliderMatrix);
    _v3B.subVectors(this.tail, this.offset).applyMatrix4(colliderMatrix);
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
    const length = target.length();
    const distance = this.inside ? this.radius - objectRadius - length : length - objectRadius - this.radius;
    if (distance < 0) {
      target.multiplyScalar(1 / length);
      if (this.inside) {
        target.negate();
      }
    }
    return distance;
  }
};

// src/VRMSpringBoneColliderShapePlane.ts
var THREE2 = __toESM(require("three"), 1);
var _v3A2 = new THREE2.Vector3();
var _mat3A = new THREE2.Matrix3();
var VRMSpringBoneColliderShapePlane = class extends VRMSpringBoneColliderShape {
  get type() {
    return "plane";
  }
  constructor(params) {
    var _a, _b;
    super();
    this.offset = (_a = params == null ? void 0 : params.offset) != null ? _a : new THREE2.Vector3(0, 0, 0);
    this.normal = (_b = params == null ? void 0 : params.normal) != null ? _b : new THREE2.Vector3(0, 0, 1);
  }
  calculateCollision(colliderMatrix, objectPosition, objectRadius, target) {
    target.setFromMatrixPosition(colliderMatrix);
    target.negate().add(objectPosition);
    _mat3A.getNormalMatrix(colliderMatrix);
    _v3A2.copy(this.normal).applyNormalMatrix(_mat3A).normalize();
    const distance = target.dot(_v3A2) - objectRadius;
    target.copy(_v3A2);
    return distance;
  }
};

// src/VRMSpringBoneColliderShapeSphere.ts
var THREE3 = __toESM(require("three"), 1);
var _v3A3 = new THREE3.Vector3();
var VRMSpringBoneColliderShapeSphere = class extends VRMSpringBoneColliderShape {
  get type() {
    return "sphere";
  }
  constructor(params) {
    var _a, _b, _c;
    super();
    this.offset = (_a = params == null ? void 0 : params.offset) != null ? _a : new THREE3.Vector3(0, 0, 0);
    this.radius = (_b = params == null ? void 0 : params.radius) != null ? _b : 0;
    this.inside = (_c = params == null ? void 0 : params.inside) != null ? _c : false;
  }
  calculateCollision(colliderMatrix, objectPosition, objectRadius, target) {
    target.subVectors(objectPosition, _v3A3.setFromMatrixPosition(colliderMatrix));
    const length = target.length();
    const distance = this.inside ? this.radius - objectRadius - length : length - objectRadius - this.radius;
    if (distance < 0) {
      target.multiplyScalar(1 / length);
      if (this.inside) {
        target.negate();
      }
    }
    return distance;
  }
};

// src/helpers/utils/ColliderShapeCapsuleBufferGeometry.ts
var THREE4 = __toESM(require("three"), 1);
var _v3A4 = new THREE4.Vector3();
var ColliderShapeCapsuleBufferGeometry = class extends THREE4.BufferGeometry {
  constructor(shape) {
    super();
    this.worldScale = 1;
    this._currentRadius = 0;
    this._currentOffset = new THREE4.Vector3();
    this._currentTail = new THREE4.Vector3();
    this._shape = shape;
    this._attrPos = new THREE4.BufferAttribute(new Float32Array(396), 3);
    this.setAttribute("position", this._attrPos);
    this._attrIndex = new THREE4.BufferAttribute(new Uint16Array(264), 1);
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
    const tail = _v3A4.copy(this._shape.tail).divideScalar(this.worldScale);
    if (this._currentTail.distanceToSquared(tail) > 1e-10) {
      this._currentTail.copy(tail);
      shouldUpdateGeometry = true;
    }
    if (shouldUpdateGeometry) {
      this._buildPosition();
    }
  }
  _buildPosition() {
    _v3A4.copy(this._currentTail).sub(this._currentOffset);
    const l = _v3A4.length() / this._currentRadius;
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
    const theta = Math.atan2(_v3A4.y, Math.sqrt(_v3A4.x * _v3A4.x + _v3A4.z * _v3A4.z));
    const phi = -Math.atan2(_v3A4.z, _v3A4.x);
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

// src/helpers/utils/ColliderShapePlaneBufferGeometry.ts
var THREE5 = __toESM(require("three"), 1);
var ColliderShapePlaneBufferGeometry = class extends THREE5.BufferGeometry {
  constructor(shape) {
    super();
    this.worldScale = 1;
    this._currentOffset = new THREE5.Vector3();
    this._currentNormal = new THREE5.Vector3();
    this._shape = shape;
    this._attrPos = new THREE5.BufferAttribute(new Float32Array(6 * 3), 3);
    this.setAttribute("position", this._attrPos);
    this._attrIndex = new THREE5.BufferAttribute(new Uint16Array(10), 1);
    this.setIndex(this._attrIndex);
    this._buildIndex();
    this.update();
  }
  update() {
    let shouldUpdateGeometry = false;
    if (!this._currentOffset.equals(this._shape.offset)) {
      this._currentOffset.copy(this._shape.offset);
      shouldUpdateGeometry = true;
    }
    if (!this._currentNormal.equals(this._shape.normal)) {
      this._currentNormal.copy(this._shape.normal);
      shouldUpdateGeometry = true;
    }
    if (shouldUpdateGeometry) {
      this._buildPosition();
    }
  }
  _buildPosition() {
    this._attrPos.setXYZ(0, -0.5, -0.5, 0);
    this._attrPos.setXYZ(1, 0.5, -0.5, 0);
    this._attrPos.setXYZ(2, 0.5, 0.5, 0);
    this._attrPos.setXYZ(3, -0.5, 0.5, 0);
    this._attrPos.setXYZ(4, 0, 0, 0);
    this._attrPos.setXYZ(5, 0, 0, 0.25);
    this.translate(this._currentOffset.x, this._currentOffset.y, this._currentOffset.z);
    this.lookAt(this._currentNormal);
    this._attrPos.needsUpdate = true;
  }
  _buildIndex() {
    this._attrIndex.setXY(0, 0, 1);
    this._attrIndex.setXY(2, 1, 2);
    this._attrIndex.setXY(4, 2, 3);
    this._attrIndex.setXY(6, 3, 0);
    this._attrIndex.setXY(8, 4, 5);
    this._attrIndex.needsUpdate = true;
  }
};

// src/helpers/utils/ColliderShapeSphereBufferGeometry.ts
var THREE6 = __toESM(require("three"), 1);
var ColliderShapeSphereBufferGeometry = class extends THREE6.BufferGeometry {
  constructor(shape) {
    super();
    this.worldScale = 1;
    this._currentRadius = 0;
    this._currentOffset = new THREE6.Vector3();
    this._shape = shape;
    this._attrPos = new THREE6.BufferAttribute(new Float32Array(32 * 3 * 3), 3);
    this.setAttribute("position", this._attrPos);
    this._attrIndex = new THREE6.BufferAttribute(new Uint16Array(64 * 3), 1);
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
var _v3A5 = new THREE7.Vector3();
var VRMSpringBoneColliderHelper = class extends THREE7.Group {
  constructor(collider) {
    super();
    this.matrixAutoUpdate = false;
    this.collider = collider;
    if (this.collider.shape instanceof VRMSpringBoneColliderShapeSphere) {
      this._geometry = new ColliderShapeSphereBufferGeometry(this.collider.shape);
    } else if (this.collider.shape instanceof VRMSpringBoneColliderShapeCapsule) {
      this._geometry = new ColliderShapeCapsuleBufferGeometry(this.collider.shape);
    } else if (this.collider.shape instanceof VRMSpringBoneColliderShapePlane) {
      this._geometry = new ColliderShapePlaneBufferGeometry(this.collider.shape);
    } else {
      throw new Error("VRMSpringBoneColliderHelper: Unknown collider shape type detected");
    }
    const material = new THREE7.LineBasicMaterial({
      color: 16711935,
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
    this.collider.updateWorldMatrix(true, false);
    this.matrix.copy(this.collider.matrixWorld);
    const matrixWorldElements = this.matrix.elements;
    this._geometry.worldScale = _v3A5.set(matrixWorldElements[0], matrixWorldElements[1], matrixWorldElements[2]).length();
    this._geometry.update();
    super.updateMatrixWorld(force);
  }
};

// src/helpers/VRMSpringBoneJointHelper.ts
var THREE9 = __toESM(require("three"), 1);

// src/helpers/utils/SpringBoneBufferGeometry.ts
var THREE8 = __toESM(require("three"), 1);
var SpringBoneBufferGeometry = class extends THREE8.BufferGeometry {
  constructor(springBone) {
    super();
    this.worldScale = 1;
    this._currentRadius = 0;
    this._currentTail = new THREE8.Vector3();
    this._springBone = springBone;
    this._attrPos = new THREE8.BufferAttribute(new Float32Array(294), 3);
    this.setAttribute("position", this._attrPos);
    this._attrIndex = new THREE8.BufferAttribute(new Uint16Array(194), 1);
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
var _v3A6 = new THREE9.Vector3();
var VRMSpringBoneJointHelper = class extends THREE9.Group {
  constructor(springBone) {
    super();
    this.matrixAutoUpdate = false;
    this.springBone = springBone;
    this._geometry = new SpringBoneBufferGeometry(this.springBone);
    const material = new THREE9.LineBasicMaterial({
      color: 16776960,
      depthTest: false,
      depthWrite: false
    });
    this._line = new THREE9.LineSegments(this._geometry, material);
    this.add(this._line);
  }
  dispose() {
    this._geometry.dispose();
  }
  updateMatrixWorld(force) {
    this.springBone.bone.updateWorldMatrix(true, false);
    this.matrix.copy(this.springBone.bone.matrixWorld);
    const matrixWorldElements = this.matrix.elements;
    this._geometry.worldScale = _v3A6.set(matrixWorldElements[0], matrixWorldElements[1], matrixWorldElements[2]).length();
    this._geometry.update();
    super.updateMatrixWorld(force);
  }
};

// src/helpers/VRMSpringBoneLimitHelper.ts
var THREE17 = __toESM(require("three"), 1);

// src/VRMSpringBoneLimitCone.ts
var THREE11 = __toESM(require("three"), 1);

// src/VRMSpringBoneLimit.ts
var THREE10 = __toESM(require("three"), 1);
var VEC3_POSITIVE_X = /* @__PURE__ */ new THREE10.Vector3(1, 0, 0);
var VEC3_POSITIVE_Y = /* @__PURE__ */ new THREE10.Vector3(0, 1, 0);
var VEC3_NEGATIVE_Y = /* @__PURE__ */ new THREE10.Vector3(0, -1, 0);
var _quatBoneAxis = /* @__PURE__ */ new THREE10.Quaternion();
var VRMSpringBoneLimit = class {
  /**
   * The cache for the total rotation of the limit.
   * It will be calculated in {@link internalPrecalcRotation}.
   *
   * This is a public property to use in {@link VRMSpringBoneLimitHelper}.
   * Do not touch this property as we might change the interface without notice.
   */
  get internalTotalRotationCache() {
    return this._totalRotationCache;
  }
  constructor() {
    this.rotation = new THREE10.Quaternion();
    this._totalRotationCache = new THREE10.Quaternion();
    this._totalRotationInvCache = new THREE10.Quaternion();
  }
  /**
   * Precalculate the rotation of the limit.
   *
   * This is intended to be called from {@link VRMSpringBoneJoint.update}.
   * Do not touch this property as we might change the interface without notice.
   *
   * @param worldSpaceInitialRotation The initial local rotation in the current world space
   * @param boneAxis The initial axis of the child bone, in local unit
   */
  internalPrecalcRotation(worldSpaceInitialRotation, boneAxis) {
    if (boneAxis.equals(VEC3_NEGATIVE_Y)) {
      _quatBoneAxis.setFromAxisAngle(VEC3_POSITIVE_X, Math.PI);
    } else {
      _quatBoneAxis.setFromUnitVectors(VEC3_POSITIVE_Y, boneAxis);
    }
    this._totalRotationCache.copy(worldSpaceInitialRotation).multiply(_quatBoneAxis).multiply(this.rotation);
    this._totalRotationInvCache.copy(this._totalRotationCache).invert();
  }
};

// src/VRMSpringBoneLimitCone.ts
var SINGULARITY_EPSILON = Math.sqrt(Number.EPSILON);
var VRMSpringBoneLimitCone = class extends VRMSpringBoneLimit {
  constructor(params) {
    var _a, _b;
    super();
    this.angle = THREE11.MathUtils.clamp((_a = params == null ? void 0 : params.angle) != null ? _a : Math.PI, 0, Math.PI);
    this.rotation = (_b = params == null ? void 0 : params.rotation) != null ? _b : new THREE11.Quaternion();
  }
  calculateLimit(tailDir) {
    tailDir.applyQuaternion(this._totalRotationInvCache);
    const cosLimitAngle = Math.cos(this.angle);
    let isLimited = false;
    if (tailDir.y < cosLimitAngle) {
      isLimited = true;
      const horizontalLengthSq = 1 - tailDir.y * tailDir.y;
      if (horizontalLengthSq < SINGULARITY_EPSILON) {
        tailDir.x = 0;
        tailDir.z = Math.sqrt(1 - cosLimitAngle * cosLimitAngle);
      } else {
        const scale = Math.sqrt((1 - cosLimitAngle * cosLimitAngle) / horizontalLengthSq);
        tailDir.x *= scale;
        tailDir.z *= scale;
      }
      tailDir.y = cosLimitAngle;
    }
    tailDir.applyQuaternion(this._totalRotationCache);
    return isLimited;
  }
};

// src/helpers/utils/LimitConeBufferGeometry.ts
var THREE12 = __toESM(require("three"), 1);
var QUARTER_ARC_SEGMENTS = 4;
var ARC_SEGMENTS = 4 * QUARTER_ARC_SEGMENTS;
var LimitConeBufferGeometry = class extends THREE12.BufferGeometry {
  constructor(limit) {
    super();
    this._limit = limit;
    this._currentAngle = limit.angle;
    this._attrPos = new THREE12.BufferAttribute(new Float32Array(3 * (ARC_SEGMENTS + 1)), 3);
    this.setAttribute("position", this._attrPos);
    this._attrIndex = new THREE12.BufferAttribute(new Uint16Array(2 * (ARC_SEGMENTS + 4)), 1);
    this.setIndex(this._attrIndex);
    this._buildIndex();
    this._buildPosition();
  }
  update() {
    let shouldUpdateGeometry = false;
    if (this._currentAngle !== this._limit.angle) {
      this._currentAngle = this._limit.angle;
      shouldUpdateGeometry = true;
    }
    if (shouldUpdateGeometry) {
      this._buildPosition();
    }
  }
  _buildPosition() {
    const cos = Math.cos(this._currentAngle);
    const sin = Math.sin(this._currentAngle);
    for (let i = 0; i < ARC_SEGMENTS; i++) {
      const t = 2 * Math.PI * (i / ARC_SEGMENTS);
      this._attrPos.setXYZ(i, sin * Math.cos(t), cos, sin * Math.sin(t));
    }
    this._attrPos.setXYZ(ARC_SEGMENTS, 0, 0, 0);
    this._attrPos.needsUpdate = true;
  }
  _buildIndex() {
    for (let i = 0; i < ARC_SEGMENTS; i++) {
      const i1 = (i + 1) % ARC_SEGMENTS;
      this._attrIndex.setXY(i * 2, i, i1);
    }
    this._attrIndex.setXY(ARC_SEGMENTS * 2, ARC_SEGMENTS, 0);
    this._attrIndex.setXY(ARC_SEGMENTS * 2 + 2, ARC_SEGMENTS, QUARTER_ARC_SEGMENTS);
    this._attrIndex.setXY(ARC_SEGMENTS * 2 + 4, ARC_SEGMENTS, 2 * QUARTER_ARC_SEGMENTS);
    this._attrIndex.setXY(ARC_SEGMENTS * 2 + 6, ARC_SEGMENTS, 3 * QUARTER_ARC_SEGMENTS);
    this._attrIndex.needsUpdate = true;
  }
};

// src/VRMSpringBoneLimitHinge.ts
var THREE13 = __toESM(require("three"), 1);
var SINGULARITY_EPSILON2 = Math.sqrt(Number.EPSILON);
var VRMSpringBoneLimitHinge = class extends VRMSpringBoneLimit {
  constructor(params) {
    var _a, _b;
    super();
    this.angle = THREE13.MathUtils.clamp((_a = params == null ? void 0 : params.angle) != null ? _a : Math.PI, 0, Math.PI);
    this.rotation = (_b = params == null ? void 0 : params.rotation) != null ? _b : new THREE13.Quaternion();
  }
  calculateLimit(tailDir) {
    tailDir.applyQuaternion(this._totalRotationInvCache);
    let isLimited = false;
    const projectedLengthSq = tailDir.y * tailDir.y + tailDir.z * tailDir.z;
    if (projectedLengthSq < SINGULARITY_EPSILON2) {
      isLimited = true;
      tailDir.set(0, 1, 0);
    } else {
      if (tailDir.x !== 0) {
        isLimited = true;
        const scale = 1 / Math.sqrt(projectedLengthSq);
        tailDir.set(0, tailDir.y * scale, tailDir.z * scale);
      }
      const cosLimitAngle = Math.cos(this.angle);
      if (tailDir.y < cosLimitAngle) {
        isLimited = true;
        const sinLimitAngle = Math.sqrt(1 - cosLimitAngle * cosLimitAngle);
        const zSign = tailDir.z < 0 ? -1 : 1;
        tailDir.y = cosLimitAngle;
        tailDir.z = sinLimitAngle * zSign;
      }
    }
    tailDir.applyQuaternion(this._totalRotationCache);
    return isLimited;
  }
};

// src/helpers/utils/LimitHingeBufferGeometry.ts
var THREE14 = __toESM(require("three"), 1);
var ARC_SEGMENTS2 = 17;
var LimitHingeBufferGeometry = class extends THREE14.BufferGeometry {
  constructor(limit) {
    super();
    this._limit = limit;
    this._currentAngle = limit.angle;
    this._attrPos = new THREE14.BufferAttribute(new Float32Array(3 * (ARC_SEGMENTS2 + 1)), 3);
    this.setAttribute("position", this._attrPos);
    this._attrIndex = new THREE14.BufferAttribute(new Uint16Array(2 * (ARC_SEGMENTS2 + 1)), 1);
    this.setIndex(this._attrIndex);
    this._buildIndex();
    this._buildPosition();
  }
  update() {
    let shouldUpdateGeometry = false;
    if (this._currentAngle !== this._limit.angle) {
      this._currentAngle = this._limit.angle;
      shouldUpdateGeometry = true;
    }
    if (shouldUpdateGeometry) {
      this._buildPosition();
    }
  }
  _buildPosition() {
    for (let i = 0; i < ARC_SEGMENTS2; i++) {
      const t = this._currentAngle * (2 * (i / (ARC_SEGMENTS2 - 1)) - 1);
      this._attrPos.setXYZ(i, 0, Math.cos(t), Math.sin(t));
    }
    this._attrPos.setXYZ(ARC_SEGMENTS2, 0, 0, 0);
    this._attrPos.needsUpdate = true;
  }
  _buildIndex() {
    for (let i = 0; i < ARC_SEGMENTS2 - 1; i++) {
      this._attrIndex.setXY(i * 2, i, i + 1);
    }
    this._attrIndex.setXY(ARC_SEGMENTS2 * 2 - 2, ARC_SEGMENTS2 - 1, ARC_SEGMENTS2);
    this._attrIndex.setXY(ARC_SEGMENTS2 * 2, ARC_SEGMENTS2, 0);
    this._attrIndex.needsUpdate = true;
  }
};

// src/VRMSpringBoneLimitSpherical.ts
var THREE15 = __toESM(require("three"), 1);
var SINGULARITY_EPSILON3 = Math.sqrt(Number.EPSILON);
var VRMSpringBoneLimitSpherical = class extends VRMSpringBoneLimit {
  constructor(params) {
    var _a, _b, _c;
    super();
    this.pitch = THREE15.MathUtils.clamp((_a = params == null ? void 0 : params.pitch) != null ? _a : Math.PI, 0, Math.PI);
    this.yaw = THREE15.MathUtils.clamp((_b = params == null ? void 0 : params.yaw) != null ? _b : Math.PI / 2, 0, Math.PI / 2);
    this.rotation = (_c = params == null ? void 0 : params.rotation) != null ? _c : new THREE15.Quaternion();
  }
  calculateLimit(tailDir) {
    tailDir.applyQuaternion(this._totalRotationInvCache);
    let isLimited = false;
    let pitch;
    if (tailDir.y < -1 + SINGULARITY_EPSILON3) {
      pitch = Math.PI;
    } else if (Math.abs(tailDir.x) > 1 - SINGULARITY_EPSILON3) {
      pitch = 0;
    } else {
      pitch = Math.atan2(tailDir.z, tailDir.y);
    }
    let yaw = Math.asin(THREE15.MathUtils.clamp(tailDir.x, -1, 1));
    if (Math.abs(pitch) > this.pitch) {
      isLimited = true;
      pitch = this.pitch * Math.sign(pitch);
    }
    if (Math.abs(yaw) > this.yaw) {
      isLimited = true;
      yaw = this.yaw * Math.sign(yaw);
    }
    const cosYaw = Math.cos(yaw);
    const sinYaw = Math.sin(yaw);
    tailDir.set(sinYaw, cosYaw * Math.cos(pitch), cosYaw * Math.sin(pitch));
    tailDir.applyQuaternion(this._totalRotationCache);
    return isLimited;
  }
};

// src/helpers/utils/LimitSphericalBufferGeometry.ts
var THREE16 = __toESM(require("three"), 1);
var ARC_SEGMENTS3 = 17;
var LimitSphericalBufferGeometry = class extends THREE16.BufferGeometry {
  constructor(limit) {
    super();
    this._limit = limit;
    this._currentPitch = limit.pitch;
    this._currentYaw = limit.yaw;
    this._attrPos = new THREE16.BufferAttribute(new Float32Array(3 * (ARC_SEGMENTS3 + 4 * (ARC_SEGMENTS3 - 1) + 1)), 3);
    this.setAttribute("position", this._attrPos);
    this._attrIndex = new THREE16.BufferAttribute(new Uint16Array(2 * (5 * (ARC_SEGMENTS3 - 1) + 6)), 1);
    this.setIndex(this._attrIndex);
    this._buildIndex();
    this._buildPosition();
  }
  update() {
    let shouldUpdateGeometry = false;
    if (this._currentPitch !== this._limit.pitch) {
      this._currentPitch = this._limit.pitch;
      shouldUpdateGeometry = true;
    }
    if (this._currentYaw !== this._limit.yaw) {
      this._currentYaw = this._limit.yaw;
      shouldUpdateGeometry = true;
    }
    if (shouldUpdateGeometry) {
      this._buildPosition();
    }
  }
  _buildPosition() {
    for (let i = 0; i < ARC_SEGMENTS3; i++) {
      const pitch = this._currentPitch * (2 * (i / (ARC_SEGMENTS3 - 1)) - 1);
      this._attrPos.setXYZ(i, 0, Math.cos(pitch), Math.sin(pitch));
    }
    {
      const cosYaw = Math.cos(this._currentYaw);
      const sinYaw = Math.sin(this._currentYaw);
      for (let i = 0; i < ARC_SEGMENTS3 - 1; i++) {
        const pitch = this._currentPitch * (2 * (i / (ARC_SEGMENTS3 - 1)) - 1);
        const cosPitch = Math.cos(pitch);
        const sinPitch = Math.sin(pitch);
        this._attrPos.setXYZ(ARC_SEGMENTS3 + i, sinYaw, cosYaw * cosPitch, cosYaw * sinPitch);
        this._attrPos.setXYZ(ARC_SEGMENTS3 + 2 * (ARC_SEGMENTS3 - 1) + i, -sinYaw, cosYaw * cosPitch, -cosYaw * sinPitch);
      }
    }
    {
      const cosPitch = Math.cos(this._currentPitch);
      const sinPitch = Math.sin(this._currentPitch);
      for (let i = 0; i < ARC_SEGMENTS3 - 1; i++) {
        const yaw = this._currentYaw * (2 * (i / (ARC_SEGMENTS3 - 1)) - 1);
        const cosYaw = Math.cos(yaw);
        const sinYaw = Math.sin(yaw);
        this._attrPos.setXYZ(ARC_SEGMENTS3 + ARC_SEGMENTS3 - 1 + i, -sinYaw, cosYaw * cosPitch, cosYaw * sinPitch);
        this._attrPos.setXYZ(ARC_SEGMENTS3 + 3 * (ARC_SEGMENTS3 - 1) + i, sinYaw, cosYaw * cosPitch, -cosYaw * sinPitch);
      }
    }
    this._attrPos.setXYZ(ARC_SEGMENTS3 + 4 * (ARC_SEGMENTS3 - 1), 0, 0, 0);
    this._attrPos.needsUpdate = true;
  }
  _buildIndex() {
    for (let i = 0; i < ARC_SEGMENTS3 - 1; i++) {
      this._attrIndex.setXY(i * 2, i, i + 1);
    }
    for (let i = 0; i < 4 * (ARC_SEGMENTS3 - 1); i++) {
      const i1 = (i + 1) % (4 * (ARC_SEGMENTS3 - 1));
      this._attrIndex.setXY(2 * (ARC_SEGMENTS3 - 1 + i), ARC_SEGMENTS3 + i, ARC_SEGMENTS3 + i1);
    }
    this._attrIndex.setXY(2 * (5 * (ARC_SEGMENTS3 - 1)), ARC_SEGMENTS3 + 4 * (ARC_SEGMENTS3 - 1), 0);
    this._attrIndex.setXY(2 * (5 * (ARC_SEGMENTS3 - 1) + 1), ARC_SEGMENTS3 + 4 * (ARC_SEGMENTS3 - 1), ARC_SEGMENTS3 - 1);
    this._attrIndex.setXY(2 * (5 * (ARC_SEGMENTS3 - 1) + 2), ARC_SEGMENTS3 + 4 * (ARC_SEGMENTS3 - 1), ARC_SEGMENTS3);
    this._attrIndex.setXY(
      2 * (5 * (ARC_SEGMENTS3 - 1) + 3),
      ARC_SEGMENTS3 + 4 * (ARC_SEGMENTS3 - 1),
      ARC_SEGMENTS3 + (ARC_SEGMENTS3 - 1)
    );
    this._attrIndex.setXY(
      2 * (5 * (ARC_SEGMENTS3 - 1) + 4),
      ARC_SEGMENTS3 + 4 * (ARC_SEGMENTS3 - 1),
      ARC_SEGMENTS3 + 2 * (ARC_SEGMENTS3 - 1)
    );
    this._attrIndex.setXY(
      2 * (5 * (ARC_SEGMENTS3 - 1) + 5),
      ARC_SEGMENTS3 + 4 * (ARC_SEGMENTS3 - 1),
      ARC_SEGMENTS3 + 3 * (ARC_SEGMENTS3 - 1)
    );
    this._attrIndex.needsUpdate = true;
  }
};

// src/helpers/VRMSpringBoneLimitHelper.ts
var _vec3WorldPosition = /* @__PURE__ */ new THREE17.Vector3();
var _vec3Scale = /* @__PURE__ */ new THREE17.Vector3();
var VRMSpringBoneLimitHelper = class extends THREE17.Group {
  constructor(limit, joint) {
    super();
    this.matrixAutoUpdate = false;
    this.limit = limit;
    this.joint = joint;
    if (this.limit instanceof VRMSpringBoneLimitCone) {
      this._geometry = new LimitConeBufferGeometry(this.limit);
    } else if (this.limit instanceof VRMSpringBoneLimitHinge) {
      this._geometry = new LimitHingeBufferGeometry(this.limit);
    } else if (this.limit instanceof VRMSpringBoneLimitSpherical) {
      this._geometry = new LimitSphericalBufferGeometry(this.limit);
    } else {
      throw new Error("VRMSpringBoneLimitHelper: Unknown limit type detected");
    }
    const material = new THREE17.LineBasicMaterial({
      color: 65535,
      depthTest: false,
      depthWrite: false
    });
    this._line = new THREE17.LineSegments(this._geometry, material);
    this.add(this._line);
  }
  dispose() {
    this._geometry.dispose();
  }
  updateMatrixWorld(force) {
    this.joint.bone.updateWorldMatrix(true, false);
    this.joint.bone.getWorldPosition(_vec3WorldPosition);
    _vec3Scale.setScalar(0.5 * this.joint.worldSpaceBoneLength);
    this.matrix.compose(_vec3WorldPosition, this.limit.internalTotalRotationCache, _vec3Scale);
    this._geometry.update();
    super.updateMatrixWorld(force);
  }
};

// src/VRMSpringBoneCollider.ts
var THREE18 = __toESM(require("three"), 1);
var VRMSpringBoneCollider = class extends THREE18.Object3D {
  constructor(shape) {
    super();
    /**
     * World space matrix for the collider shape used in collision calculations.
     */
    this.colliderMatrix = new THREE18.Matrix4();
    this.shape = shape;
  }
  updateWorldMatrix(updateParents, updateChildren) {
    super.updateWorldMatrix(updateParents, updateChildren);
    updateColliderMatrix(this.colliderMatrix, this.matrixWorld, this.shape.offset);
  }
};
function updateColliderMatrix(colliderMatrix, matrixWorld, offset) {
  const me = matrixWorld.elements;
  colliderMatrix.copy(matrixWorld);
  if (offset) {
    colliderMatrix.elements[12] = me[0] * offset.x + me[4] * offset.y + me[8] * offset.z + me[12];
    colliderMatrix.elements[13] = me[1] * offset.x + me[5] * offset.y + me[9] * offset.z + me[13];
    colliderMatrix.elements[14] = me[2] * offset.x + me[6] * offset.y + me[10] * offset.z + me[14];
  }
}

// src/VRMSpringBoneJoint.ts
var THREE22 = __toESM(require("three"), 1);

// src/utils/Matrix4InverseCache.ts
var THREE20 = __toESM(require("three"), 1);

// src/utils/mat4InvertCompat.ts
var THREE19 = __toESM(require("three"), 1);
var _matA = new THREE19.Matrix4();
function mat4InvertCompat(target) {
  if (target.invert) {
    target.invert();
  } else {
    target.getInverse(_matA.copy(target));
  }
  return target;
}

// src/utils/Matrix4InverseCache.ts
var Matrix4InverseCache = class {
  constructor(matrix) {
    /**
     * A cache of inverse of current matrix.
     */
    this._inverseCache = new THREE20.Matrix4();
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

// src/utils/getWorldQuaternionLite.ts
var THREE21 = __toESM(require("three"), 1);
var _position = new THREE21.Vector3();
var _scale = new THREE21.Vector3();
function getWorldQuaternionLite(object, out) {
  object.matrixWorld.decompose(_position, out, _scale);
  return out;
}

// src/VRMSpringBoneJoint.ts
var IDENTITY_MATRIX4 = new THREE22.Matrix4();
var _v3A7 = new THREE22.Vector3();
var _v3B2 = new THREE22.Vector3();
var _worldSpaceInitialRotation = new THREE22.Quaternion();
var _worldSpaceInitialMatrix = new THREE22.Matrix4();
var _worldSpaceInitialMatrixInv = new THREE22.Matrix4();
var _worldSpacePosition = new THREE22.Vector3();
var _nextTail = new THREE22.Vector3();
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
    this._currentTail = new THREE22.Vector3();
    /**
     * Previous position of child tail, in center unit. Will be used for verlet integration.
     */
    this._prevTail = new THREE22.Vector3();
    /**
     * The initial axis of the child bone, in local unit.
     */
    this._boneAxis = new THREE22.Vector3();
    /**
     * The length of the bone in world unit.
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
    this._initialLocalMatrix = new THREE22.Matrix4();
    /**
     * Initial state of the rotation of the bone.
     */
    this._initialLocalRotation = new THREE22.Quaternion();
    /**
     * Initial state of the position of its child.
     */
    this._initialLocalChildPosition = new THREE22.Vector3();
    var _a, _b, _c, _d, _e, _f;
    this.bone = bone;
    this.bone.matrixAutoUpdate = false;
    this.child = child;
    this.settings = {
      hitRadius: (_a = settings.hitRadius) != null ? _a : 0,
      stiffness: (_b = settings.stiffness) != null ? _b : 1,
      gravityPower: (_c = settings.gravityPower) != null ? _c : 0,
      gravityDir: (_e = (_d = settings.gravityDir) == null ? void 0 : _d.clone()) != null ? _e : new THREE22.Vector3(0, -1, 0),
      dragForce: (_f = settings.dragForce) != null ? _f : 0.4
    };
    this.limit = null;
    this.colliderGroups = colliderGroups;
  }
  /**
   * The length of the bone in world unit.
   *
   * It's same as local unit length unless there are scale transformations in the world space.
   *
   * Intended to be used by helpers.
   */
  get worldSpaceBoneLength() {
    return this._worldSpaceBoneLength;
  }
  /**
   * Set of dependencies that need to be updated before this joint.
   */
  get dependencies() {
    const set = /* @__PURE__ */ new Set();
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
  /**
   * Initial state of the position of its child.
   *
   * Intended to be used by helpers.
   */
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
    const matrixWorldToCenter = this._getMatrixWorldToCenter();
    this.bone.localToWorld(this._currentTail.copy(this._initialLocalChildPosition)).applyMatrix4(matrixWorldToCenter);
    this._prevTail.copy(this._currentTail);
    this._boneAxis.copy(this._initialLocalChildPosition).normalize();
  }
  /**
   * Reset the state of this bone.
   * You might want to call {@link VRMSpringBoneManager.reset} instead.
   */
  reset() {
    this.bone.quaternion.copy(this._initialLocalRotation);
    this.bone.updateMatrix();
    this.bone.matrixWorld.multiplyMatrices(this._parentMatrixWorld, this.bone.matrix);
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
  update(delta) {
    var _a;
    if (delta <= 0) return;
    this._calcWorldSpaceBoneLength();
    _worldSpaceInitialMatrix.copy(this._parentMatrixWorld).multiply(this._initialLocalMatrix);
    _worldSpaceInitialMatrixInv.copy(_worldSpaceInitialMatrix).invert();
    _worldSpacePosition.setFromMatrixPosition(this.bone.matrixWorld);
    if (this.limit) {
      if (this.bone.parent) {
        getWorldQuaternionLite(this.bone.parent, _worldSpaceInitialRotation);
      } else {
        _worldSpaceInitialRotation.identity();
      }
      _worldSpaceInitialRotation.multiply(this._initialLocalRotation).normalize();
      this.limit.internalPrecalcRotation(_worldSpaceInitialRotation, this._boneAxis);
    }
    const worldSpaceBoneAxis = _v3B2.copy(this._boneAxis).transformDirection(_worldSpaceInitialMatrix);
    _nextTail.copy(this._currentTail).add(_v3A7.subVectors(this._currentTail, this._prevTail).multiplyScalar(1 - this.settings.dragForce)).applyMatrix4(this._getMatrixCenterToWorld()).addScaledVector(worldSpaceBoneAxis, this.settings.stiffness * delta).addScaledVector(this.settings.gravityDir, this.settings.gravityPower * delta);
    _nextTail.sub(_worldSpacePosition).normalize();
    (_a = this.limit) == null ? void 0 : _a.calculateLimit(_nextTail);
    _nextTail.multiplyScalar(this._worldSpaceBoneLength).add(_worldSpacePosition);
    this._collision(_nextTail);
    this._prevTail.copy(this._currentTail);
    this._currentTail.copy(_nextTail).applyMatrix4(this._getMatrixWorldToCenter());
    this.bone.quaternion.setFromUnitVectors(this._boneAxis, _v3A7.copy(_nextTail).applyMatrix4(_worldSpaceInitialMatrixInv).normalize()).premultiply(this._initialLocalRotation);
    this.bone.updateMatrix();
    this.bone.matrixWorld.multiplyMatrices(this._parentMatrixWorld, this.bone.matrix);
  }
  /**
   * Do collision math against every colliders attached to this bone.
   *
   * @param tail The tail you want to process
   */
  _collision(tail) {
    var _a;
    for (let cg = 0; cg < this.colliderGroups.length; cg++) {
      for (let c = 0; c < this.colliderGroups[cg].colliders.length; c++) {
        const collider = this.colliderGroups[cg].colliders[c];
        const dist = collider.shape.calculateCollision(collider.colliderMatrix, tail, this.settings.hitRadius, _v3A7);
        if (dist < 0) {
          tail.addScaledVector(_v3A7, -dist);
          tail.sub(_worldSpacePosition).normalize();
          (_a = this.limit) == null ? void 0 : _a.calculateLimit(tail);
          tail.multiplyScalar(this._worldSpaceBoneLength).add(_worldSpacePosition);
        }
      }
    }
  }
  /**
   * Calculate the {@link _worldSpaceBoneLength}.
   * Intended to be used in {@link update}.
   */
  _calcWorldSpaceBoneLength() {
    _v3A7.setFromMatrixPosition(this.bone.matrixWorld);
    if (this.child) {
      _v3B2.setFromMatrixPosition(this.child.matrixWorld);
    } else {
      _v3B2.copy(this._initialLocalChildPosition);
      _v3B2.applyMatrix4(this.bone.matrixWorld);
    }
    this._worldSpaceBoneLength = _v3A7.sub(_v3B2).length();
  }
  /**
   * Create a matrix that converts center space into world space.
   */
  _getMatrixCenterToWorld() {
    return this._center ? this._center.matrixWorld : IDENTITY_MATRIX4;
  }
  /**
   * Create a matrix that converts world space into center space.
   */
  _getMatrixWorldToCenter() {
    return this._center ? this._center.userData.inverseCacheProxy.inverse : IDENTITY_MATRIX4;
  }
};

// src/VRMSpringBoneLoaderPlugin.ts
var THREE23 = __toESM(require("three"), 1);

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

// src/utils/lowestCommonAncestor.ts
function lowestCommonAncestor(objects) {
  var _a;
  const sharedAncestors = /* @__PURE__ */ new Map();
  for (const object of objects) {
    let current = object;
    do {
      const newValue = ((_a = sharedAncestors.get(current)) != null ? _a : 0) + 1;
      if (newValue === objects.size) {
        return current;
      }
      sharedAncestors.set(current, newValue);
      current = current.parent;
    } while (current !== null);
  }
  return null;
}

// src/VRMSpringBoneManager.ts
var VRMSpringBoneManager = class {
  constructor() {
    this._joints = /* @__PURE__ */ new Set();
    this._sortedJoints = [];
    this._hasWarnedCircularDependency = false;
    /**
     * An ordered list of ancestors of all the SpringBone joints. Before the
     * SpringBone joints can be updated, the world matrices of these ancestors
     * must be calculated. The first element is the lowest common ancestor, for
     * which not only its world matrix but its ancestors' world matrices are
     * updated as well.
     */
    this._ancestors = [];
    this._objectSpringBonesMap = /* @__PURE__ */ new Map();
    this._isSortedJointsDirty = false;
    this._relevantChildrenUpdated = this._relevantChildrenUpdated.bind(this);
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
    this._isSortedJointsDirty = true;
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
    this._isSortedJointsDirty = true;
  }
  /**
   * @deprecated Use {@link deleteJoint} instead.
   */
  deleteSpringBone(joint) {
    console.warn("VRMSpringBoneManager: deleteSpringBone() is deprecated. use deleteJoint() instead.");
    this.deleteJoint(joint);
  }
  setInitState() {
    this._sortJoints();
    for (let i = 0; i < this._sortedJoints.length; i++) {
      const springBone = this._sortedJoints[i];
      springBone.bone.updateMatrix();
      springBone.bone.updateWorldMatrix(false, false);
      springBone.setInitState();
    }
  }
  reset() {
    this._sortJoints();
    for (let i = 0; i < this._sortedJoints.length; i++) {
      const springBone = this._sortedJoints[i];
      springBone.bone.updateMatrix();
      springBone.bone.updateWorldMatrix(false, false);
      springBone.reset();
    }
  }
  update(delta) {
    this._sortJoints();
    for (let i = 0; i < this._ancestors.length; i++) {
      this._ancestors[i].updateWorldMatrix(i === 0, false);
    }
    for (let i = 0; i < this._sortedJoints.length; i++) {
      const springBone = this._sortedJoints[i];
      springBone.bone.updateMatrix();
      springBone.bone.updateWorldMatrix(false, false);
      springBone.update(delta);
      traverseChildrenUntilConditionMet(springBone.bone, this._relevantChildrenUpdated);
    }
  }
  /**
   * Sorts the joints ensuring they are updated in the correct order taking dependencies into account.
   *
   * This method updates {@link _sortedJoints} and {@link _ancestors}.
   * Make sure to call this before using them.
   */
  _sortJoints() {
    if (!this._isSortedJointsDirty) {
      return;
    }
    const springBoneOrder = [];
    const springBonesTried = /* @__PURE__ */ new Set();
    const springBonesDone = /* @__PURE__ */ new Set();
    const ancestors = /* @__PURE__ */ new Set();
    for (const springBone of this._joints) {
      this._insertJointSort(springBone, springBonesTried, springBonesDone, springBoneOrder, ancestors);
    }
    this._sortedJoints = springBoneOrder;
    const lca = lowestCommonAncestor(ancestors);
    this._ancestors = [];
    if (lca) {
      this._ancestors.push(lca);
      traverseChildrenUntilConditionMet(lca, (object) => {
        var _a, _b;
        if (((_b = (_a = this._objectSpringBonesMap.get(object)) == null ? void 0 : _a.size) != null ? _b : 0) > 0) {
          return true;
        }
        this._ancestors.push(object);
        return false;
      });
    }
    this._isSortedJointsDirty = false;
  }
  _insertJointSort(springBone, springBonesTried, springBonesDone, springBoneOrder, ancestors) {
    if (springBonesDone.has(springBone)) {
      return;
    }
    if (springBonesTried.has(springBone)) {
      if (!this._hasWarnedCircularDependency) {
        console.warn("VRMSpringBoneManager: Circular dependency detected");
        this._hasWarnedCircularDependency = true;
      }
      return;
    }
    springBonesTried.add(springBone);
    const depObjects = springBone.dependencies;
    for (const depObject of depObjects) {
      let encounteredSpringBone = false;
      let ancestor = null;
      traverseAncestorsFromRoot(depObject, (depObjectAncestor) => {
        const objectSet = this._objectSpringBonesMap.get(depObjectAncestor);
        if (objectSet) {
          for (const depSpringBone of objectSet) {
            encounteredSpringBone = true;
            this._insertJointSort(depSpringBone, springBonesTried, springBonesDone, springBoneOrder, ancestors);
          }
        } else if (!encounteredSpringBone) {
          ancestor = depObjectAncestor;
        }
      });
      if (ancestor) {
        ancestors.add(ancestor);
      }
    }
    springBoneOrder.push(springBone);
    springBonesDone.add(springBone);
  }
  _relevantChildrenUpdated(object) {
    var _a, _b;
    if (((_b = (_a = this._objectSpringBonesMap.get(object)) == null ? void 0 : _a.size) != null ? _b : 0) > 0) {
      return true;
    }
    object.updateWorldMatrix(false, false);
    return false;
  }
};

// src/VRMSpringBoneLoaderPlugin.ts
var EXTENSION_NAME_EXTENDED_COLLIDER = "VRMC_springBone_extended_collider";
var EXTENSION_NAME_LIMIT = "VRMC_springBone_limit";
var POSSIBLE_SPEC_VERSIONS = /* @__PURE__ */ new Set(["1.0", "1.0-beta"]);
var POSSIBLE_SPEC_VERSIONS_EXTENDED_COLLIDERS = /* @__PURE__ */ new Set(["1.0"]);
var POSSIBLE_SPEC_VERSIONS_LIMIT = /* @__PURE__ */ new Set(["1.0", "1.0-draft"]);
var _VRMSpringBoneLoaderPlugin = class _VRMSpringBoneLoaderPlugin {
  get name() {
    return _VRMSpringBoneLoaderPlugin.EXTENSION_NAME;
  }
  constructor(parser, options) {
    var _a, _b;
    this.parser = parser;
    this.jointHelperRoot = options == null ? void 0 : options.jointHelperRoot;
    this.colliderHelperRoot = options == null ? void 0 : options.colliderHelperRoot;
    this.limitHelperRoot = options == null ? void 0 : options.limitHelperRoot;
    this.useExtendedColliders = (_a = options == null ? void 0 : options.useExtendedColliders) != null ? _a : true;
    this.useLimits = (_b = options == null ? void 0 : options.useLimits) != null ? _b : true;
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
        var _a2, _b2, _c2, _d2, _e2, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o;
        const node = threeNodes[schemaCollider.node];
        if (node == null) {
          console.warn(
            `VRMSpringBoneLoaderPlugin: The collider #${iCollider} attempted to reference a node #${schemaCollider.node} but not found. Skipping the collider`
          );
          return null;
        }
        const schemaShape = schemaCollider.shape;
        const schemaExCollider = (_a2 = schemaCollider.extensions) == null ? void 0 : _a2[EXTENSION_NAME_EXTENDED_COLLIDER];
        if (this.useExtendedColliders && schemaExCollider != null) {
          const specVersionExCollider = schemaExCollider.specVersion;
          if (!POSSIBLE_SPEC_VERSIONS_EXTENDED_COLLIDERS.has(specVersionExCollider)) {
            console.warn(
              `VRMSpringBoneLoaderPlugin: Unknown ${EXTENSION_NAME_EXTENDED_COLLIDER} specVersion "${specVersionExCollider}". Fallbacking to the ${_VRMSpringBoneLoaderPlugin.EXTENSION_NAME} definition`
            );
          } else {
            const schemaExShape = schemaExCollider.shape;
            if (schemaExShape.sphere) {
              return this._importSphereCollider(node, {
                offset: new THREE23.Vector3().fromArray((_b2 = schemaExShape.sphere.offset) != null ? _b2 : [0, 0, 0]),
                radius: (_c2 = schemaExShape.sphere.radius) != null ? _c2 : 0,
                inside: (_d2 = schemaExShape.sphere.inside) != null ? _d2 : false
              });
            } else if (schemaExShape.capsule) {
              return this._importCapsuleCollider(node, {
                offset: new THREE23.Vector3().fromArray((_e2 = schemaExShape.capsule.offset) != null ? _e2 : [0, 0, 0]),
                radius: (_f = schemaExShape.capsule.radius) != null ? _f : 0,
                tail: new THREE23.Vector3().fromArray((_g = schemaExShape.capsule.tail) != null ? _g : [0, 0, 0]),
                inside: (_h = schemaExShape.capsule.inside) != null ? _h : false
              });
            } else if (schemaExShape.plane) {
              return this._importPlaneCollider(node, {
                offset: new THREE23.Vector3().fromArray((_i = schemaExShape.plane.offset) != null ? _i : [0, 0, 0]),
                normal: new THREE23.Vector3().fromArray((_j = schemaExShape.plane.normal) != null ? _j : [0, 0, 1])
              });
            }
          }
        }
        if (schemaShape.sphere) {
          return this._importSphereCollider(node, {
            offset: new THREE23.Vector3().fromArray((_k = schemaShape.sphere.offset) != null ? _k : [0, 0, 0]),
            radius: (_l = schemaShape.sphere.radius) != null ? _l : 0,
            inside: false
          });
        } else if (schemaShape.capsule) {
          return this._importCapsuleCollider(node, {
            offset: new THREE23.Vector3().fromArray((_m = schemaShape.capsule.offset) != null ? _m : [0, 0, 0]),
            radius: (_n = schemaShape.capsule.radius) != null ? _n : 0,
            tail: new THREE23.Vector3().fromArray((_o = schemaShape.capsule.tail) != null ? _o : [0, 0, 0]),
            inside: false
          });
        }
        console.warn(`VRMSpringBoneLoaderPlugin: The collider #${iCollider} has no valid shape. Skipping the collider`);
      });
      const colliderGroups = (_d = extension.colliderGroups) == null ? void 0 : _d.map(
        (schemaColliderGroup, iColliderGroup) => {
          var _a2;
          const cols = ((_a2 = schemaColliderGroup.colliders) != null ? _a2 : []).map((iCollider) => {
            const col = colliders == null ? void 0 : colliders[iCollider];
            if (col == null) {
              console.warn(
                `VRMSpringBoneLoaderPlugin: The collider group #${iColliderGroup} attempted to reference a collider #${iCollider} but not found. Skipping the collider`
              );
              return null;
            }
            return col;
          }).filter((col) => col != null);
          return {
            colliders: cols,
            name: schemaColliderGroup.name
          };
        }
      );
      (_e = extension.springs) == null ? void 0 : _e.forEach((schemaSpring, iSpring) => {
        var _a2;
        const schemaJoints = schemaSpring.joints;
        if (schemaJoints == null) {
          console.warn(`VRMSpringBoneLoaderPlugin: The spring #${iSpring} has no joints. Skipping the spring`);
          return;
        }
        const colliderGroupsForSpring = (_a2 = schemaSpring.colliderGroups) == null ? void 0 : _a2.map((iColliderGroup) => {
          const group = colliderGroups == null ? void 0 : colliderGroups[iColliderGroup];
          if (group == null) {
            console.warn(
              `VRMSpringBoneLoaderPlugin: The spring #${iSpring} attempted to reference a collider group #${iColliderGroup} but not found. Skipping the collider group`
            );
            return null;
          }
          return group;
        }).filter((group) => group != null);
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
              gravityDir: prevSchemaJoint.gravityDir != null ? new THREE23.Vector3().fromArray(prevSchemaJoint.gravityDir) : void 0
            };
            const joint = this._importJoint(node, child, setting, colliderGroupsForSpring);
            if (center) {
              joint.center = center;
            }
            const limit = this._tryImportLimitFromSchema(joint, prevSchemaJoint);
            if (limit) {
              joint.limit = limit;
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
        (schemaColliderGroup, iColliderGroup) => {
          var _a2;
          const node = threeNodes[schemaColliderGroup.node];
          if (node == null) {
            console.warn(
              `VRMSpringBoneLoaderPlugin: The collider group #${iColliderGroup} attempted to reference a node #${schemaColliderGroup.node} but not found. Skipping the collider group`
            );
            return null;
          }
          const colliders = ((_a2 = schemaColliderGroup.colliders) != null ? _a2 : []).map((schemaCollider, iCollider) => {
            var _a3, _b2, _c2;
            const offset = new THREE23.Vector3(0, 0, 0);
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
              radius: (_c2 = schemaCollider.radius) != null ? _c2 : 0,
              inside: false
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
          if (root == null) {
            console.warn(
              `VRMSpringBoneLoaderPlugin: The spring bone group #${iBoneGroup} attempted to reference a node #${rootIndex} but not found. Skipping the node`
            );
            return;
          }
          const gravityDir = new THREE23.Vector3();
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
              console.warn(
                `VRMSpringBoneLoaderPlugin: The spring #${iBoneGroup} attempted to reference a collider group #${iColliderGroup} but not found. Skipping the collider group`
              );
              return null;
            }
            return group;
          }).filter((group) => group != null);
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
    const shape = new VRMSpringBoneColliderShapeSphere(params);
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
    const shape = new VRMSpringBoneColliderShapeCapsule(params);
    const collider = new VRMSpringBoneCollider(shape);
    destination.add(collider);
    if (this.colliderHelperRoot) {
      const helper = new VRMSpringBoneColliderHelper(collider);
      this.colliderHelperRoot.add(helper);
      helper.renderOrder = this.colliderHelperRoot.renderOrder;
    }
    return collider;
  }
  _importPlaneCollider(destination, params) {
    const shape = new VRMSpringBoneColliderShapePlane(params);
    const collider = new VRMSpringBoneCollider(shape);
    destination.add(collider);
    if (this.colliderHelperRoot) {
      const helper = new VRMSpringBoneColliderHelper(collider);
      this.colliderHelperRoot.add(helper);
      helper.renderOrder = this.colliderHelperRoot.renderOrder;
    }
    return collider;
  }
  _importLimitCone(joint, params) {
    const limit = new VRMSpringBoneLimitCone(params);
    if (this.limitHelperRoot) {
      const helper = new VRMSpringBoneLimitHelper(limit, joint);
      this.limitHelperRoot.add(helper);
      helper.renderOrder = this.limitHelperRoot.renderOrder;
    }
    return limit;
  }
  _importLimitHinge(joint, params) {
    const limit = new VRMSpringBoneLimitHinge(params);
    if (this.limitHelperRoot) {
      const helper = new VRMSpringBoneLimitHelper(limit, joint);
      this.limitHelperRoot.add(helper);
      helper.renderOrder = this.limitHelperRoot.renderOrder;
    }
    return limit;
  }
  _importLimitSpherical(joint, params) {
    const limit = new VRMSpringBoneLimitSpherical(params);
    if (this.limitHelperRoot) {
      const helper = new VRMSpringBoneLimitHelper(limit, joint);
      this.limitHelperRoot.add(helper);
      helper.renderOrder = this.limitHelperRoot.renderOrder;
    }
    return limit;
  }
  _tryImportLimitFromSchema(joint, schemaJoint) {
    var _a, _b, _c, _d;
    if (!this.useLimits) {
      return void 0;
    }
    const schemaLimit = (_a = schemaJoint.extensions) == null ? void 0 : _a[EXTENSION_NAME_LIMIT];
    if (schemaLimit != null) {
      const specVersionLimit = schemaLimit.specVersion;
      if (!POSSIBLE_SPEC_VERSIONS_LIMIT.has(specVersionLimit)) {
        console.warn(
          `VRMSpringBoneLoaderPlugin: Unknown ${EXTENSION_NAME_LIMIT} specVersion "${specVersionLimit}". Ignoring the limit`
        );
      } else {
        if (specVersionLimit === "1.0-draft") {
          console.warn(
            `VRMSpringBoneLoaderPlugin: Using a draft spec version of ${EXTENSION_NAME_LIMIT}: 1.0-draft. Some behaviors may be different. Consider updating the model file.`
          );
        }
        const schemaLimitLimit = schemaLimit.limit;
        if (schemaLimitLimit.cone) {
          return this._importLimitCone(joint, {
            angle: schemaLimitLimit.cone.angle,
            rotation: new THREE23.Quaternion().fromArray((_b = schemaLimitLimit.cone.rotation) != null ? _b : [0, 0, 0, 1])
          });
        } else if (schemaLimitLimit.hinge) {
          return this._importLimitHinge(joint, {
            angle: schemaLimitLimit.hinge.angle,
            rotation: new THREE23.Quaternion().fromArray((_c = schemaLimitLimit.hinge.rotation) != null ? _c : [0, 0, 0, 1])
          });
        } else if (schemaLimitLimit.spherical) {
          return this._importLimitSpherical(joint, {
            pitch: schemaLimitLimit.spherical.pitch,
            yaw: schemaLimitLimit.spherical.yaw,
            rotation: new THREE23.Quaternion().fromArray((_d = schemaLimitLimit.spherical.rotation) != null ? _d : [0, 0, 0, 1])
          });
        } else {
          console.warn("VRMSpringBoneLoaderPlugin: Unknown limit type. Ignoring the limit");
          return void 0;
        }
      }
    }
  }
};
_VRMSpringBoneLoaderPlugin.EXTENSION_NAME = "VRMC_springBone";
var VRMSpringBoneLoaderPlugin = _VRMSpringBoneLoaderPlugin;
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIiwgIi4uL3NyYy9oZWxwZXJzL1ZSTVNwcmluZ0JvbmVDb2xsaWRlckhlbHBlci50cyIsICIuLi9zcmMvVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVDYXBzdWxlLnRzIiwgIi4uL3NyYy9WUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZS50cyIsICIuLi9zcmMvVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVQbGFuZS50cyIsICIuLi9zcmMvVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVTcGhlcmUudHMiLCAiLi4vc3JjL2hlbHBlcnMvdXRpbHMvQ29sbGlkZXJTaGFwZUNhcHN1bGVCdWZmZXJHZW9tZXRyeS50cyIsICIuLi9zcmMvaGVscGVycy91dGlscy9Db2xsaWRlclNoYXBlUGxhbmVCdWZmZXJHZW9tZXRyeS50cyIsICIuLi9zcmMvaGVscGVycy91dGlscy9Db2xsaWRlclNoYXBlU3BoZXJlQnVmZmVyR2VvbWV0cnkudHMiLCAiLi4vc3JjL2hlbHBlcnMvVlJNU3ByaW5nQm9uZUpvaW50SGVscGVyLnRzIiwgIi4uL3NyYy9oZWxwZXJzL3V0aWxzL1NwcmluZ0JvbmVCdWZmZXJHZW9tZXRyeS50cyIsICIuLi9zcmMvaGVscGVycy9WUk1TcHJpbmdCb25lTGltaXRIZWxwZXIudHMiLCAiLi4vc3JjL1ZSTVNwcmluZ0JvbmVMaW1pdENvbmUudHMiLCAiLi4vc3JjL1ZSTVNwcmluZ0JvbmVMaW1pdC50cyIsICIuLi9zcmMvaGVscGVycy91dGlscy9MaW1pdENvbmVCdWZmZXJHZW9tZXRyeS50cyIsICIuLi9zcmMvVlJNU3ByaW5nQm9uZUxpbWl0SGluZ2UudHMiLCAiLi4vc3JjL2hlbHBlcnMvdXRpbHMvTGltaXRIaW5nZUJ1ZmZlckdlb21ldHJ5LnRzIiwgIi4uL3NyYy9WUk1TcHJpbmdCb25lTGltaXRTcGhlcmljYWwudHMiLCAiLi4vc3JjL2hlbHBlcnMvdXRpbHMvTGltaXRTcGhlcmljYWxCdWZmZXJHZW9tZXRyeS50cyIsICIuLi9zcmMvVlJNU3ByaW5nQm9uZUNvbGxpZGVyLnRzIiwgIi4uL3NyYy9WUk1TcHJpbmdCb25lSm9pbnQudHMiLCAiLi4vc3JjL3V0aWxzL01hdHJpeDRJbnZlcnNlQ2FjaGUudHMiLCAiLi4vc3JjL3V0aWxzL21hdDRJbnZlcnRDb21wYXQudHMiLCAiLi4vc3JjL3V0aWxzL2dldFdvcmxkUXVhdGVybmlvbkxpdGUudHMiLCAiLi4vc3JjL1ZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW4udHMiLCAiLi4vc3JjL3V0aWxzL3RyYXZlcnNlQW5jZXN0b3JzRnJvbVJvb3QudHMiLCAiLi4vc3JjL3V0aWxzL3RyYXZlcnNlQ2hpbGRyZW5VbnRpbENvbmRpdGlvbk1ldC50cyIsICIuLi9zcmMvdXRpbHMvbG93ZXN0Q29tbW9uQW5jZXN0b3IudHMiLCAiLi4vc3JjL1ZSTVNwcmluZ0JvbmVNYW5hZ2VyLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgKiBmcm9tICcuL2hlbHBlcnMnO1xuZXhwb3J0ICogZnJvbSAnLi9WUk1TcHJpbmdCb25lQ29sbGlkZXInO1xuZXhwb3J0ICogZnJvbSAnLi9WUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cCc7XG5leHBvcnQgKiBmcm9tICcuL1ZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlJztcbmV4cG9ydCAqIGZyb20gJy4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVDYXBzdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVQbGFuZSc7XG5leHBvcnQgKiBmcm9tICcuL1ZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlU3BoZXJlJztcbmV4cG9ydCAqIGZyb20gJy4vVlJNU3ByaW5nQm9uZUpvaW50JztcbmV4cG9ydCAqIGZyb20gJy4vVlJNU3ByaW5nQm9uZUpvaW50U2V0dGluZ3MnO1xuZXhwb3J0ICogZnJvbSAnLi9WUk1TcHJpbmdCb25lTGltaXQnO1xuZXhwb3J0ICogZnJvbSAnLi9WUk1TcHJpbmdCb25lTGltaXRDb25lJztcbmV4cG9ydCAqIGZyb20gJy4vVlJNU3ByaW5nQm9uZUxpbWl0SGluZ2UnO1xuZXhwb3J0ICogZnJvbSAnLi9WUk1TcHJpbmdCb25lTGltaXRTcGhlcmljYWwnO1xuZXhwb3J0ICogZnJvbSAnLi9WUk1TcHJpbmdCb25lTG9hZGVyUGx1Z2luJztcbmV4cG9ydCAqIGZyb20gJy4vVlJNU3ByaW5nQm9uZUxvYWRlclBsdWdpbk9wdGlvbnMnO1xuZXhwb3J0ICogZnJvbSAnLi9WUk1TcHJpbmdCb25lTWFuYWdlcic7XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUNvbGxpZGVyIH0gZnJvbSAnLi4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlQ2Fwc3VsZSB9IGZyb20gJy4uL1ZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlQ2Fwc3VsZSc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZVBsYW5lIH0gZnJvbSAnLi4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVQbGFuZSc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZVNwaGVyZSB9IGZyb20gJy4uL1ZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlU3BoZXJlJztcbmltcG9ydCB7IENvbGxpZGVyU2hhcGVCdWZmZXJHZW9tZXRyeSB9IGZyb20gJy4vdXRpbHMvQ29sbGlkZXJTaGFwZUJ1ZmZlckdlb21ldHJ5JztcbmltcG9ydCB7IENvbGxpZGVyU2hhcGVDYXBzdWxlQnVmZmVyR2VvbWV0cnkgfSBmcm9tICcuL3V0aWxzL0NvbGxpZGVyU2hhcGVDYXBzdWxlQnVmZmVyR2VvbWV0cnknO1xuaW1wb3J0IHsgQ29sbGlkZXJTaGFwZVBsYW5lQnVmZmVyR2VvbWV0cnkgfSBmcm9tICcuL3V0aWxzL0NvbGxpZGVyU2hhcGVQbGFuZUJ1ZmZlckdlb21ldHJ5JztcbmltcG9ydCB7IENvbGxpZGVyU2hhcGVTcGhlcmVCdWZmZXJHZW9tZXRyeSB9IGZyb20gJy4vdXRpbHMvQ29sbGlkZXJTaGFwZVNwaGVyZUJ1ZmZlckdlb21ldHJ5JztcblxuY29uc3QgX3YzQSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbmV4cG9ydCBjbGFzcyBWUk1TcHJpbmdCb25lQ29sbGlkZXJIZWxwZXIgZXh0ZW5kcyBUSFJFRS5Hcm91cCB7XG4gIHB1YmxpYyByZWFkb25seSBjb2xsaWRlcjogVlJNU3ByaW5nQm9uZUNvbGxpZGVyO1xuICBwcml2YXRlIHJlYWRvbmx5IF9nZW9tZXRyeTogQ29sbGlkZXJTaGFwZUJ1ZmZlckdlb21ldHJ5O1xuICBwcml2YXRlIHJlYWRvbmx5IF9saW5lOiBUSFJFRS5MaW5lU2VnbWVudHM7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGNvbGxpZGVyOiBWUk1TcHJpbmdCb25lQ29sbGlkZXIpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMubWF0cml4QXV0b1VwZGF0ZSA9IGZhbHNlO1xuXG4gICAgdGhpcy5jb2xsaWRlciA9IGNvbGxpZGVyO1xuXG4gICAgaWYgKHRoaXMuY29sbGlkZXIuc2hhcGUgaW5zdGFuY2VvZiBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZVNwaGVyZSkge1xuICAgICAgdGhpcy5fZ2VvbWV0cnkgPSBuZXcgQ29sbGlkZXJTaGFwZVNwaGVyZUJ1ZmZlckdlb21ldHJ5KHRoaXMuY29sbGlkZXIuc2hhcGUpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jb2xsaWRlci5zaGFwZSBpbnN0YW5jZW9mIFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlQ2Fwc3VsZSkge1xuICAgICAgdGhpcy5fZ2VvbWV0cnkgPSBuZXcgQ29sbGlkZXJTaGFwZUNhcHN1bGVCdWZmZXJHZW9tZXRyeSh0aGlzLmNvbGxpZGVyLnNoYXBlKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY29sbGlkZXIuc2hhcGUgaW5zdGFuY2VvZiBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZVBsYW5lKSB7XG4gICAgICB0aGlzLl9nZW9tZXRyeSA9IG5ldyBDb2xsaWRlclNoYXBlUGxhbmVCdWZmZXJHZW9tZXRyeSh0aGlzLmNvbGxpZGVyLnNoYXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdWUk1TcHJpbmdCb25lQ29sbGlkZXJIZWxwZXI6IFVua25vd24gY29sbGlkZXIgc2hhcGUgdHlwZSBkZXRlY3RlZCcpO1xuICAgIH1cblxuICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLkxpbmVCYXNpY01hdGVyaWFsKHtcbiAgICAgIGNvbG9yOiAweGZmMDBmZixcbiAgICAgIGRlcHRoVGVzdDogZmFsc2UsXG4gICAgICBkZXB0aFdyaXRlOiBmYWxzZSxcbiAgICB9KTtcblxuICAgIHRoaXMuX2xpbmUgPSBuZXcgVEhSRUUuTGluZVNlZ21lbnRzKHRoaXMuX2dlb21ldHJ5LCBtYXRlcmlhbCk7XG4gICAgdGhpcy5hZGQodGhpcy5fbGluZSk7XG4gIH1cblxuICBwdWJsaWMgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9nZW9tZXRyeS5kaXNwb3NlKCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlTWF0cml4V29ybGQoZm9yY2U6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmNvbGxpZGVyLnVwZGF0ZVdvcmxkTWF0cml4KHRydWUsIGZhbHNlKTtcblxuICAgIHRoaXMubWF0cml4LmNvcHkodGhpcy5jb2xsaWRlci5tYXRyaXhXb3JsZCk7XG5cbiAgICBjb25zdCBtYXRyaXhXb3JsZEVsZW1lbnRzID0gdGhpcy5tYXRyaXguZWxlbWVudHM7XG4gICAgdGhpcy5fZ2VvbWV0cnkud29ybGRTY2FsZSA9IF92M0FcbiAgICAgIC5zZXQobWF0cml4V29ybGRFbGVtZW50c1swXSwgbWF0cml4V29ybGRFbGVtZW50c1sxXSwgbWF0cml4V29ybGRFbGVtZW50c1syXSlcbiAgICAgIC5sZW5ndGgoKTsgLy8gY2FsY3VsYXRlIHNjYWxlIG9mIHggY29tcG9uZW50XG5cbiAgICB0aGlzLl9nZW9tZXRyeS51cGRhdGUoKTtcblxuICAgIHN1cGVyLnVwZGF0ZU1hdHJpeFdvcmxkKGZvcmNlKTtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZSc7XG5cbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3YzQiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbmV4cG9ydCBjbGFzcyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZUNhcHN1bGUgZXh0ZW5kcyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZSB7XG4gIHB1YmxpYyBnZXQgdHlwZSgpOiAnY2Fwc3VsZScge1xuICAgIHJldHVybiAnY2Fwc3VsZSc7XG4gIH1cblxuICAvKipcbiAgICogVGhlIG9mZnNldCBvZiB0aGUgY2Fwc3VsZSBoZWFkIGZyb20gdGhlIG9yaWdpbiBpbiBsb2NhbCBzcGFjZS5cbiAgICovXG4gIHB1YmxpYyBvZmZzZXQ6IFRIUkVFLlZlY3RvcjM7XG5cbiAgLyoqXG4gICAqIFRoZSBvZmZzZXQgb2YgdGhlIGNhcHN1bGUgdGFpbCBmcm9tIHRoZSBvcmlnaW4gaW4gbG9jYWwgc3BhY2UuXG4gICAqL1xuICBwdWJsaWMgdGFpbDogVEhSRUUuVmVjdG9yMztcblxuICAvKipcbiAgICogVGhlIHJhZGl1cyBvZiB0aGUgY2Fwc3VsZS5cbiAgICovXG4gIHB1YmxpYyByYWRpdXM6IG51bWJlcjtcblxuICAvKipcbiAgICogSWYgdHJ1ZSwgdGhlIGNvbGxpZGVyIHByZXZlbnRzIHNwcmluZyBib25lcyBmcm9tIGdvaW5nIG91dHNpZGUgb2YgdGhlIGNhcHN1bGUgaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBpbnNpZGU6IGJvb2xlYW47XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBhcmFtcz86IHsgcmFkaXVzPzogbnVtYmVyOyBvZmZzZXQ/OiBUSFJFRS5WZWN0b3IzOyB0YWlsPzogVEhSRUUuVmVjdG9yMzsgaW5zaWRlPzogYm9vbGVhbiB9KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMub2Zmc2V0ID0gcGFyYW1zPy5vZmZzZXQgPz8gbmV3IFRIUkVFLlZlY3RvcjMoMC4wLCAwLjAsIDAuMCk7XG4gICAgdGhpcy50YWlsID0gcGFyYW1zPy50YWlsID8/IG5ldyBUSFJFRS5WZWN0b3IzKDAuMCwgMC4wLCAwLjApO1xuICAgIHRoaXMucmFkaXVzID0gcGFyYW1zPy5yYWRpdXMgPz8gMC4wO1xuICAgIHRoaXMuaW5zaWRlID0gcGFyYW1zPy5pbnNpZGUgPz8gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgY2FsY3VsYXRlQ29sbGlzaW9uKFxuICAgIGNvbGxpZGVyTWF0cml4OiBUSFJFRS5NYXRyaXg0LFxuICAgIG9iamVjdFBvc2l0aW9uOiBUSFJFRS5WZWN0b3IzLFxuICAgIG9iamVjdFJhZGl1czogbnVtYmVyLFxuICAgIHRhcmdldDogVEhSRUUuVmVjdG9yMyxcbiAgKTogbnVtYmVyIHtcbiAgICBfdjNBLnNldEZyb21NYXRyaXhQb3NpdGlvbihjb2xsaWRlck1hdHJpeCk7IC8vIHRyYW5zZm9ybWVkIGhlYWRcbiAgICBfdjNCLnN1YlZlY3RvcnModGhpcy50YWlsLCB0aGlzLm9mZnNldCkuYXBwbHlNYXRyaXg0KGNvbGxpZGVyTWF0cml4KTsgLy8gdHJhbnNmb3JtZWQgdGFpbFxuICAgIF92M0Iuc3ViKF92M0EpOyAvLyBmcm9tIGhlYWQgdG8gdGFpbFxuICAgIGNvbnN0IGxlbmd0aFNxQ2Fwc3VsZSA9IF92M0IubGVuZ3RoU3EoKTtcblxuICAgIHRhcmdldC5jb3B5KG9iamVjdFBvc2l0aW9uKS5zdWIoX3YzQSk7IC8vIGZyb20gaGVhZCB0byBvYmplY3RcbiAgICBjb25zdCBkb3QgPSBfdjNCLmRvdCh0YXJnZXQpOyAvLyBkb3QgcHJvZHVjdCBvZiBvZmZzZXRUb1RhaWwgYW5kIG9mZnNldFRvT2JqZWN0XG5cbiAgICBpZiAoZG90IDw9IDAuMCkge1xuICAgICAgLy8gaWYgb2JqZWN0IGlzIG5lYXIgZnJvbSB0aGUgaGVhZFxuICAgICAgLy8gZG8gbm90aGluZywgdXNlIHRoZSBjdXJyZW50IHZhbHVlIGRpcmVjdGx5XG4gICAgfSBlbHNlIGlmIChsZW5ndGhTcUNhcHN1bGUgPD0gZG90KSB7XG4gICAgICAvLyBpZiBvYmplY3QgaXMgbmVhciBmcm9tIHRoZSB0YWlsXG4gICAgICB0YXJnZXQuc3ViKF92M0IpOyAvLyBmcm9tIHRhaWwgdG8gb2JqZWN0XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGlmIG9iamVjdCBpcyBiZXR3ZWVuIHR3byBlbmRzXG4gICAgICBfdjNCLm11bHRpcGx5U2NhbGFyKGRvdCAvIGxlbmd0aFNxQ2Fwc3VsZSk7IC8vIGZyb20gaGVhZCB0byB0aGUgbmVhcmVzdCBwb2ludCBvZiB0aGUgc2hhZnRcbiAgICAgIHRhcmdldC5zdWIoX3YzQik7IC8vIGZyb20gdGhlIHNoYWZ0IHBvaW50IHRvIG9iamVjdFxuICAgIH1cblxuICAgIGNvbnN0IGxlbmd0aCA9IHRhcmdldC5sZW5ndGgoKTtcbiAgICBjb25zdCBkaXN0YW5jZSA9IHRoaXMuaW5zaWRlID8gdGhpcy5yYWRpdXMgLSBvYmplY3RSYWRpdXMgLSBsZW5ndGggOiBsZW5ndGggLSBvYmplY3RSYWRpdXMgLSB0aGlzLnJhZGl1cztcblxuICAgIGlmIChkaXN0YW5jZSA8IDApIHtcbiAgICAgIHRhcmdldC5tdWx0aXBseVNjYWxhcigxIC8gbGVuZ3RoKTsgLy8gY29udmVydCB0aGUgZGVsdGEgdG8gdGhlIGRpcmVjdGlvblxuICAgICAgaWYgKHRoaXMuaW5zaWRlKSB7XG4gICAgICAgIHRhcmdldC5uZWdhdGUoKTsgLy8gaWYgaW5zaWRlLCByZXZlcnNlIHRoZSBkaXJlY3Rpb25cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGlzdGFuY2U7XG4gIH1cbn1cbiIsICJpbXBvcnQgdHlwZSAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgc2hhcGUgb2YgYSBjb2xsaWRlci5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlIHtcbiAgLyoqXG4gICAqIFRoZSB0eXBlIG9mIHRoZSBzaGFwZS5cbiAgICovXG4gIHB1YmxpYyBhYnN0cmFjdCBnZXQgdHlwZSgpOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBvZmZzZXQgdG8gdGhlIHNoYXBlLlxuICAgKi9cbiAgcHVibGljIG9mZnNldD86IFRIUkVFLlZlY3RvcjM7XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSBhIGRpc3RhbmNlIGFuZCBhIGRpcmVjdGlvbiBmcm9tIHRoZSBjb2xsaWRlciB0byBhIHRhcmdldCBvYmplY3QuXG4gICAqIEl0J3MgaGl0IGlmIHRoZSBkaXN0YW5jZSBpcyBuZWdhdGl2ZS5cbiAgICogVGhlIGRpcmVjdGlvbiB3aWxsIGJlIGNvbnRhaW5lZCBpbiB0aGUgZ2l2ZW4gdGFyZ2V0IHZlY3Rvci5cbiAgICpcbiAgICogQHBhcmFtIGNvbGxpZGVyTWF0cml4IEEgbWF0cml4IHJlcHJlc2VudHMgdGhlIHRyYW5zZm9ybSBvZiB0aGUgY29sbGlkZXJcbiAgICogQHBhcmFtIG9iamVjdFBvc2l0aW9uIEEgdmVjdG9yIHJlcHJlc2VudHMgdGhlIHBvc2l0aW9uIG9mIHRoZSB0YXJnZXQgb2JqZWN0XG4gICAqIEBwYXJhbSBvYmplY3RSYWRpdXMgVGhlIHJhZGl1cyBvZiB0aGUgb2JqZWN0XG4gICAqIEBwYXJhbSB0YXJnZXQgVGhlIHJlc3VsdCBkaXJlY3Rpb24gd2lsbCBiZSBjb250YWluZWQgaW4gdGhpcyB2ZWN0b3JcbiAgICovXG4gIHB1YmxpYyBhYnN0cmFjdCBjYWxjdWxhdGVDb2xsaXNpb24oXG4gICAgY29sbGlkZXJNYXRyaXg6IFRIUkVFLk1hdHJpeDQsXG4gICAgb2JqZWN0UG9zaXRpb246IFRIUkVFLlZlY3RvcjMsXG4gICAgb2JqZWN0UmFkaXVzOiBudW1iZXIsXG4gICAgdGFyZ2V0OiBUSFJFRS5WZWN0b3IzLFxuICApOiBudW1iZXI7XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGUgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlJztcblxuY29uc3QgX3YzQSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfbWF0M0EgPSBuZXcgVEhSRUUuTWF0cml4MygpO1xuXG5leHBvcnQgY2xhc3MgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVQbGFuZSBleHRlbmRzIFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlIHtcbiAgcHVibGljIGdldCB0eXBlKCk6ICdwbGFuZScge1xuICAgIHJldHVybiAncGxhbmUnO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBvZmZzZXQgb2YgdGhlIHBsYW5lIGZyb20gdGhlIG9yaWdpbiBpbiBsb2NhbCBzcGFjZS5cbiAgICovXG4gIHB1YmxpYyBvZmZzZXQ6IFRIUkVFLlZlY3RvcjM7XG5cbiAgLyoqXG4gICAqIFRoZSBub3JtYWwgb2YgdGhlIHBsYW5lIGluIGxvY2FsIHNwYWNlLiBNdXN0IGJlIG5vcm1hbGl6ZWQuXG4gICAqL1xuICBwdWJsaWMgbm9ybWFsOiBUSFJFRS5WZWN0b3IzO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJhbXM/OiB7IG9mZnNldD86IFRIUkVFLlZlY3RvcjM7IG5vcm1hbD86IFRIUkVFLlZlY3RvcjMgfSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLm9mZnNldCA9IHBhcmFtcz8ub2Zmc2V0ID8/IG5ldyBUSFJFRS5WZWN0b3IzKDAuMCwgMC4wLCAwLjApO1xuICAgIHRoaXMubm9ybWFsID0gcGFyYW1zPy5ub3JtYWwgPz8gbmV3IFRIUkVFLlZlY3RvcjMoMC4wLCAwLjAsIDEuMCk7XG4gIH1cblxuICBwdWJsaWMgY2FsY3VsYXRlQ29sbGlzaW9uKFxuICAgIGNvbGxpZGVyTWF0cml4OiBUSFJFRS5NYXRyaXg0LFxuICAgIG9iamVjdFBvc2l0aW9uOiBUSFJFRS5WZWN0b3IzLFxuICAgIG9iamVjdFJhZGl1czogbnVtYmVyLFxuICAgIHRhcmdldDogVEhSRUUuVmVjdG9yMyxcbiAgKTogbnVtYmVyIHtcbiAgICB0YXJnZXQuc2V0RnJvbU1hdHJpeFBvc2l0aW9uKGNvbGxpZGVyTWF0cml4KTsgLy8gdHJhbnNmb3JtZWQgb2Zmc2V0XG4gICAgdGFyZ2V0Lm5lZ2F0ZSgpLmFkZChvYmplY3RQb3NpdGlvbik7IC8vIGEgdmVjdG9yIGZyb20gY29sbGlkZXIgY2VudGVyIHRvIG9iamVjdCBwb3NpdGlvblxuXG4gICAgX21hdDNBLmdldE5vcm1hbE1hdHJpeChjb2xsaWRlck1hdHJpeCk7IC8vIGNvbnZlcnQgdGhlIGNvbGxpZGVyIG1hdHJpeCB0byB0aGUgbm9ybWFsIG1hdHJpeFxuICAgIF92M0EuY29weSh0aGlzLm5vcm1hbCkuYXBwbHlOb3JtYWxNYXRyaXgoX21hdDNBKS5ub3JtYWxpemUoKTsgLy8gdHJhbnNmb3JtZWQgbm9ybWFsXG4gICAgY29uc3QgZGlzdGFuY2UgPSB0YXJnZXQuZG90KF92M0EpIC0gb2JqZWN0UmFkaXVzO1xuXG4gICAgdGFyZ2V0LmNvcHkoX3YzQSk7IC8vIGNvbnZlcnQgdGhlIGRlbHRhIHRvIHRoZSBkaXJlY3Rpb25cblxuICAgIHJldHVybiBkaXN0YW5jZTtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZSc7XG5cbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5leHBvcnQgY2xhc3MgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVTcGhlcmUgZXh0ZW5kcyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZSB7XG4gIHB1YmxpYyBnZXQgdHlwZSgpOiAnc3BoZXJlJyB7XG4gICAgcmV0dXJuICdzcGhlcmUnO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBvZmZzZXQgb2YgdGhlIHNwaGVyZSBmcm9tIHRoZSBvcmlnaW4gaW4gbG9jYWwgc3BhY2UuXG4gICAqL1xuICBwdWJsaWMgb2Zmc2V0OiBUSFJFRS5WZWN0b3IzO1xuXG4gIC8qKlxuICAgKiBUaGUgcmFkaXVzLlxuICAgKi9cbiAgcHVibGljIHJhZGl1czogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBJZiB0cnVlLCB0aGUgY29sbGlkZXIgcHJldmVudHMgc3ByaW5nIGJvbmVzIGZyb20gZ29pbmcgb3V0c2lkZSBvZiB0aGUgc3BoZXJlIGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgaW5zaWRlOiBib29sZWFuO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJhbXM/OiB7IHJhZGl1cz86IG51bWJlcjsgb2Zmc2V0PzogVEhSRUUuVmVjdG9yMzsgaW5zaWRlPzogYm9vbGVhbiB9KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMub2Zmc2V0ID0gcGFyYW1zPy5vZmZzZXQgPz8gbmV3IFRIUkVFLlZlY3RvcjMoMC4wLCAwLjAsIDAuMCk7XG4gICAgdGhpcy5yYWRpdXMgPSBwYXJhbXM/LnJhZGl1cyA/PyAwLjA7XG4gICAgdGhpcy5pbnNpZGUgPSBwYXJhbXM/Lmluc2lkZSA/PyBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBjYWxjdWxhdGVDb2xsaXNpb24oXG4gICAgY29sbGlkZXJNYXRyaXg6IFRIUkVFLk1hdHJpeDQsXG4gICAgb2JqZWN0UG9zaXRpb246IFRIUkVFLlZlY3RvcjMsXG4gICAgb2JqZWN0UmFkaXVzOiBudW1iZXIsXG4gICAgdGFyZ2V0OiBUSFJFRS5WZWN0b3IzLFxuICApOiBudW1iZXIge1xuICAgIHRhcmdldC5zdWJWZWN0b3JzKG9iamVjdFBvc2l0aW9uLCBfdjNBLnNldEZyb21NYXRyaXhQb3NpdGlvbihjb2xsaWRlck1hdHJpeCkpO1xuXG4gICAgY29uc3QgbGVuZ3RoID0gdGFyZ2V0Lmxlbmd0aCgpO1xuICAgIGNvbnN0IGRpc3RhbmNlID0gdGhpcy5pbnNpZGUgPyB0aGlzLnJhZGl1cyAtIG9iamVjdFJhZGl1cyAtIGxlbmd0aCA6IGxlbmd0aCAtIG9iamVjdFJhZGl1cyAtIHRoaXMucmFkaXVzO1xuXG4gICAgaWYgKGRpc3RhbmNlIDwgMCkge1xuICAgICAgdGFyZ2V0Lm11bHRpcGx5U2NhbGFyKDEgLyBsZW5ndGgpOyAvLyBjb252ZXJ0IHRoZSBkZWx0YSB0byB0aGUgZGlyZWN0aW9uXG4gICAgICBpZiAodGhpcy5pbnNpZGUpIHtcbiAgICAgICAgdGFyZ2V0Lm5lZ2F0ZSgpOyAvLyBpZiBpbnNpZGUsIHJldmVyc2UgdGhlIGRpcmVjdGlvblxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkaXN0YW5jZTtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlQ2Fwc3VsZSB9IGZyb20gJy4uLy4uL1ZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlQ2Fwc3VsZSc7XG5pbXBvcnQgeyBDb2xsaWRlclNoYXBlQnVmZmVyR2VvbWV0cnkgfSBmcm9tICcuL0NvbGxpZGVyU2hhcGVCdWZmZXJHZW9tZXRyeSc7XG5cbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5leHBvcnQgY2xhc3MgQ29sbGlkZXJTaGFwZUNhcHN1bGVCdWZmZXJHZW9tZXRyeSBleHRlbmRzIFRIUkVFLkJ1ZmZlckdlb21ldHJ5IGltcGxlbWVudHMgQ29sbGlkZXJTaGFwZUJ1ZmZlckdlb21ldHJ5IHtcbiAgcHVibGljIHdvcmxkU2NhbGUgPSAxLjA7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBfYXR0clBvczogVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xuICBwcml2YXRlIHJlYWRvbmx5IF9hdHRySW5kZXg6IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZTtcbiAgcHJpdmF0ZSByZWFkb25seSBfc2hhcGU6IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlQ2Fwc3VsZTtcbiAgcHJpdmF0ZSBfY3VycmVudFJhZGl1cyA9IDA7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2N1cnJlbnRPZmZzZXQgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuICBwcml2YXRlIHJlYWRvbmx5IF9jdXJyZW50VGFpbCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHNoYXBlOiBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZUNhcHN1bGUpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5fc2hhcGUgPSBzaGFwZTtcblxuICAgIHRoaXMuX2F0dHJQb3MgPSBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKG5ldyBGbG9hdDMyQXJyYXkoMzk2KSwgMyk7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJywgdGhpcy5fYXR0clBvcyk7XG5cbiAgICB0aGlzLl9hdHRySW5kZXggPSBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKG5ldyBVaW50MTZBcnJheSgyNjQpLCAxKTtcbiAgICB0aGlzLnNldEluZGV4KHRoaXMuX2F0dHJJbmRleCk7XG5cbiAgICB0aGlzLl9idWlsZEluZGV4KCk7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgbGV0IHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gZmFsc2U7XG5cbiAgICBjb25zdCByYWRpdXMgPSB0aGlzLl9zaGFwZS5yYWRpdXMgLyB0aGlzLndvcmxkU2NhbGU7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRSYWRpdXMgIT09IHJhZGl1cykge1xuICAgICAgdGhpcy5fY3VycmVudFJhZGl1cyA9IHJhZGl1cztcbiAgICAgIHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX2N1cnJlbnRPZmZzZXQuZXF1YWxzKHRoaXMuX3NoYXBlLm9mZnNldCkpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRPZmZzZXQuY29weSh0aGlzLl9zaGFwZS5vZmZzZXQpO1xuICAgICAgc2hvdWxkVXBkYXRlR2VvbWV0cnkgPSB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0IHRhaWwgPSBfdjNBLmNvcHkodGhpcy5fc2hhcGUudGFpbCkuZGl2aWRlU2NhbGFyKHRoaXMud29ybGRTY2FsZSk7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRUYWlsLmRpc3RhbmNlVG9TcXVhcmVkKHRhaWwpID4gMWUtMTApIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRUYWlsLmNvcHkodGFpbCk7XG4gICAgICBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHNob3VsZFVwZGF0ZUdlb21ldHJ5KSB7XG4gICAgICB0aGlzLl9idWlsZFBvc2l0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRQb3NpdGlvbigpOiB2b2lkIHtcbiAgICBfdjNBLmNvcHkodGhpcy5fY3VycmVudFRhaWwpLnN1Yih0aGlzLl9jdXJyZW50T2Zmc2V0KTtcbiAgICBjb25zdCBsID0gX3YzQS5sZW5ndGgoKSAvIHRoaXMuX2N1cnJlbnRSYWRpdXM7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSAxNjsgaSsrKSB7XG4gICAgICBjb25zdCB0ID0gKGkgLyAxNi4wKSAqIE1hdGguUEk7XG5cbiAgICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKGksIC1NYXRoLnNpbih0KSwgLU1hdGguY29zKHQpLCAwLjApO1xuICAgICAgdGhpcy5fYXR0clBvcy5zZXRYWVooMTcgKyBpLCBsICsgTWF0aC5zaW4odCksIE1hdGguY29zKHQpLCAwLjApO1xuICAgICAgdGhpcy5fYXR0clBvcy5zZXRYWVooMzQgKyBpLCAtTWF0aC5zaW4odCksIDAuMCwgLU1hdGguY29zKHQpKTtcbiAgICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKDUxICsgaSwgbCArIE1hdGguc2luKHQpLCAwLjAsIE1hdGguY29zKHQpKTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDMyOyBpKyspIHtcbiAgICAgIGNvbnN0IHQgPSAoaSAvIDE2LjApICogTWF0aC5QSTtcbiAgICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKDY4ICsgaSwgMC4wLCBNYXRoLnNpbih0KSwgTWF0aC5jb3ModCkpO1xuICAgICAgdGhpcy5fYXR0clBvcy5zZXRYWVooMTAwICsgaSwgbCwgTWF0aC5zaW4odCksIE1hdGguY29zKHQpKTtcbiAgICB9XG5cbiAgICBjb25zdCB0aGV0YSA9IE1hdGguYXRhbjIoX3YzQS55LCBNYXRoLnNxcnQoX3YzQS54ICogX3YzQS54ICsgX3YzQS56ICogX3YzQS56KSk7XG4gICAgY29uc3QgcGhpID0gLU1hdGguYXRhbjIoX3YzQS56LCBfdjNBLngpO1xuXG4gICAgdGhpcy5yb3RhdGVaKHRoZXRhKTtcbiAgICB0aGlzLnJvdGF0ZVkocGhpKTtcbiAgICB0aGlzLnNjYWxlKHRoaXMuX2N1cnJlbnRSYWRpdXMsIHRoaXMuX2N1cnJlbnRSYWRpdXMsIHRoaXMuX2N1cnJlbnRSYWRpdXMpO1xuICAgIHRoaXMudHJhbnNsYXRlKHRoaXMuX2N1cnJlbnRPZmZzZXQueCwgdGhpcy5fY3VycmVudE9mZnNldC55LCB0aGlzLl9jdXJyZW50T2Zmc2V0LnopO1xuXG4gICAgdGhpcy5fYXR0clBvcy5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIF9idWlsZEluZGV4KCk6IHZvaWQge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzQ7IGkrKykge1xuICAgICAgY29uc3QgaTEgPSAoaSArIDEpICUgMzQ7XG5cbiAgICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWShpICogMiwgaSwgaTEpO1xuICAgICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKDY4ICsgaSAqIDIsIDM0ICsgaSwgMzQgKyBpMSk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzMjsgaSsrKSB7XG4gICAgICBjb25zdCBpMSA9IChpICsgMSkgJSAzMjtcblxuICAgICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKDEzNiArIGkgKiAyLCA2OCArIGksIDY4ICsgaTEpO1xuICAgICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKDIwMCArIGkgKiAyLCAxMDAgKyBpLCAxMDAgKyBpMSk7XG4gICAgfVxuXG4gICAgdGhpcy5fYXR0ckluZGV4Lm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlUGxhbmUgfSBmcm9tICcuLi8uLi9WUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZVBsYW5lJztcbmltcG9ydCB7IENvbGxpZGVyU2hhcGVCdWZmZXJHZW9tZXRyeSB9IGZyb20gJy4vQ29sbGlkZXJTaGFwZUJ1ZmZlckdlb21ldHJ5JztcblxuZXhwb3J0IGNsYXNzIENvbGxpZGVyU2hhcGVQbGFuZUJ1ZmZlckdlb21ldHJ5IGV4dGVuZHMgVEhSRUUuQnVmZmVyR2VvbWV0cnkgaW1wbGVtZW50cyBDb2xsaWRlclNoYXBlQnVmZmVyR2VvbWV0cnkge1xuICBwdWJsaWMgd29ybGRTY2FsZSA9IDEuMDtcblxuICBwcml2YXRlIHJlYWRvbmx5IF9hdHRyUG9zOiBUSFJFRS5CdWZmZXJBdHRyaWJ1dGU7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2F0dHJJbmRleDogVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xuICBwcml2YXRlIHJlYWRvbmx5IF9zaGFwZTogVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVQbGFuZTtcbiAgcHJpdmF0ZSByZWFkb25seSBfY3VycmVudE9mZnNldCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2N1cnJlbnROb3JtYWwgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihzaGFwZTogVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVQbGFuZSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLl9zaGFwZSA9IHNoYXBlO1xuXG4gICAgdGhpcy5fYXR0clBvcyA9IG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUobmV3IEZsb2F0MzJBcnJheSg2ICogMyksIDMpO1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKCdwb3NpdGlvbicsIHRoaXMuX2F0dHJQb3MpO1xuXG4gICAgdGhpcy5fYXR0ckluZGV4ID0gbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShuZXcgVWludDE2QXJyYXkoMTApLCAxKTtcbiAgICB0aGlzLnNldEluZGV4KHRoaXMuX2F0dHJJbmRleCk7XG5cbiAgICB0aGlzLl9idWlsZEluZGV4KCk7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgbGV0IHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gZmFsc2U7XG5cbiAgICBpZiAoIXRoaXMuX2N1cnJlbnRPZmZzZXQuZXF1YWxzKHRoaXMuX3NoYXBlLm9mZnNldCkpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRPZmZzZXQuY29weSh0aGlzLl9zaGFwZS5vZmZzZXQpO1xuICAgICAgc2hvdWxkVXBkYXRlR2VvbWV0cnkgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fY3VycmVudE5vcm1hbC5lcXVhbHModGhpcy5fc2hhcGUubm9ybWFsKSkge1xuICAgICAgdGhpcy5fY3VycmVudE5vcm1hbC5jb3B5KHRoaXMuX3NoYXBlLm5vcm1hbCk7XG4gICAgICBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHNob3VsZFVwZGF0ZUdlb21ldHJ5KSB7XG4gICAgICB0aGlzLl9idWlsZFBvc2l0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRQb3NpdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLl9hdHRyUG9zLnNldFhZWigwLCAtMC41LCAtMC41LCAwKTtcbiAgICB0aGlzLl9hdHRyUG9zLnNldFhZWigxLCAwLjUsIC0wLjUsIDApO1xuICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKDIsIDAuNSwgMC41LCAwKTtcbiAgICB0aGlzLl9hdHRyUG9zLnNldFhZWigzLCAtMC41LCAwLjUsIDApO1xuICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKDQsIDAsIDAsIDApO1xuICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKDUsIDAsIDAsIDAuMjUpO1xuXG4gICAgdGhpcy50cmFuc2xhdGUodGhpcy5fY3VycmVudE9mZnNldC54LCB0aGlzLl9jdXJyZW50T2Zmc2V0LnksIHRoaXMuX2N1cnJlbnRPZmZzZXQueik7XG4gICAgdGhpcy5sb29rQXQodGhpcy5fY3VycmVudE5vcm1hbCk7XG5cbiAgICB0aGlzLl9hdHRyUG9zLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX2J1aWxkSW5kZXgoKTogdm9pZCB7XG4gICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKDAsIDAsIDEpO1xuICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWSgyLCAxLCAyKTtcbiAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoNCwgMiwgMyk7XG4gICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKDYsIDMsIDApO1xuICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWSg4LCA0LCA1KTtcblxuICAgIHRoaXMuX2F0dHJJbmRleC5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZVNwaGVyZSB9IGZyb20gJy4uLy4uL1ZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlU3BoZXJlJztcbmltcG9ydCB7IENvbGxpZGVyU2hhcGVCdWZmZXJHZW9tZXRyeSB9IGZyb20gJy4vQ29sbGlkZXJTaGFwZUJ1ZmZlckdlb21ldHJ5JztcblxuZXhwb3J0IGNsYXNzIENvbGxpZGVyU2hhcGVTcGhlcmVCdWZmZXJHZW9tZXRyeSBleHRlbmRzIFRIUkVFLkJ1ZmZlckdlb21ldHJ5IGltcGxlbWVudHMgQ29sbGlkZXJTaGFwZUJ1ZmZlckdlb21ldHJ5IHtcbiAgcHVibGljIHdvcmxkU2NhbGUgPSAxLjA7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBfYXR0clBvczogVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xuICBwcml2YXRlIHJlYWRvbmx5IF9hdHRySW5kZXg6IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZTtcbiAgcHJpdmF0ZSByZWFkb25seSBfc2hhcGU6IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlU3BoZXJlO1xuICBwcml2YXRlIF9jdXJyZW50UmFkaXVzID0gMDtcbiAgcHJpdmF0ZSByZWFkb25seSBfY3VycmVudE9mZnNldCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHNoYXBlOiBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZVNwaGVyZSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLl9zaGFwZSA9IHNoYXBlO1xuXG4gICAgdGhpcy5fYXR0clBvcyA9IG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUobmV3IEZsb2F0MzJBcnJheSgzMiAqIDMgKiAzKSwgMyk7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJywgdGhpcy5fYXR0clBvcyk7XG5cbiAgICB0aGlzLl9hdHRySW5kZXggPSBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKG5ldyBVaW50MTZBcnJheSg2NCAqIDMpLCAxKTtcbiAgICB0aGlzLnNldEluZGV4KHRoaXMuX2F0dHJJbmRleCk7XG5cbiAgICB0aGlzLl9idWlsZEluZGV4KCk7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgbGV0IHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gZmFsc2U7XG5cbiAgICBjb25zdCByYWRpdXMgPSB0aGlzLl9zaGFwZS5yYWRpdXMgLyB0aGlzLndvcmxkU2NhbGU7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRSYWRpdXMgIT09IHJhZGl1cykge1xuICAgICAgdGhpcy5fY3VycmVudFJhZGl1cyA9IHJhZGl1cztcbiAgICAgIHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX2N1cnJlbnRPZmZzZXQuZXF1YWxzKHRoaXMuX3NoYXBlLm9mZnNldCkpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRPZmZzZXQuY29weSh0aGlzLl9zaGFwZS5vZmZzZXQpO1xuICAgICAgc2hvdWxkVXBkYXRlR2VvbWV0cnkgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmIChzaG91bGRVcGRhdGVHZW9tZXRyeSkge1xuICAgICAgdGhpcy5fYnVpbGRQb3NpdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2J1aWxkUG9zaXRpb24oKTogdm9pZCB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzMjsgaSsrKSB7XG4gICAgICBjb25zdCB0ID0gKGkgLyAxNi4wKSAqIE1hdGguUEk7XG5cbiAgICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKGksIE1hdGguY29zKHQpLCBNYXRoLnNpbih0KSwgMC4wKTtcbiAgICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKDMyICsgaSwgMC4wLCBNYXRoLmNvcyh0KSwgTWF0aC5zaW4odCkpO1xuICAgICAgdGhpcy5fYXR0clBvcy5zZXRYWVooNjQgKyBpLCBNYXRoLnNpbih0KSwgMC4wLCBNYXRoLmNvcyh0KSk7XG4gICAgfVxuXG4gICAgdGhpcy5zY2FsZSh0aGlzLl9jdXJyZW50UmFkaXVzLCB0aGlzLl9jdXJyZW50UmFkaXVzLCB0aGlzLl9jdXJyZW50UmFkaXVzKTtcbiAgICB0aGlzLnRyYW5zbGF0ZSh0aGlzLl9jdXJyZW50T2Zmc2V0LngsIHRoaXMuX2N1cnJlbnRPZmZzZXQueSwgdGhpcy5fY3VycmVudE9mZnNldC56KTtcblxuICAgIHRoaXMuX2F0dHJQb3MubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRJbmRleCgpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDMyOyBpKyspIHtcbiAgICAgIGNvbnN0IGkxID0gKGkgKyAxKSAlIDMyO1xuXG4gICAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoaSAqIDIsIGksIGkxKTtcbiAgICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWSg2NCArIGkgKiAyLCAzMiArIGksIDMyICsgaTEpO1xuICAgICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKDEyOCArIGkgKiAyLCA2NCArIGksIDY0ICsgaTEpO1xuICAgIH1cblxuICAgIHRoaXMuX2F0dHJJbmRleC5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lSm9pbnQgfSBmcm9tICcuLi9WUk1TcHJpbmdCb25lSm9pbnQnO1xuaW1wb3J0IHsgU3ByaW5nQm9uZUJ1ZmZlckdlb21ldHJ5IH0gZnJvbSAnLi91dGlscy9TcHJpbmdCb25lQnVmZmVyR2VvbWV0cnknO1xuXG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuZXhwb3J0IGNsYXNzIFZSTVNwcmluZ0JvbmVKb2ludEhlbHBlciBleHRlbmRzIFRIUkVFLkdyb3VwIHtcbiAgcHVibGljIHJlYWRvbmx5IHNwcmluZ0JvbmU6IFZSTVNwcmluZ0JvbmVKb2ludDtcbiAgcHJpdmF0ZSByZWFkb25seSBfZ2VvbWV0cnk6IFNwcmluZ0JvbmVCdWZmZXJHZW9tZXRyeTtcbiAgcHJpdmF0ZSByZWFkb25seSBfbGluZTogVEhSRUUuTGluZVNlZ21lbnRzO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihzcHJpbmdCb25lOiBWUk1TcHJpbmdCb25lSm9pbnQpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMubWF0cml4QXV0b1VwZGF0ZSA9IGZhbHNlO1xuXG4gICAgdGhpcy5zcHJpbmdCb25lID0gc3ByaW5nQm9uZTtcblxuICAgIHRoaXMuX2dlb21ldHJ5ID0gbmV3IFNwcmluZ0JvbmVCdWZmZXJHZW9tZXRyeSh0aGlzLnNwcmluZ0JvbmUpO1xuXG4gICAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTGluZUJhc2ljTWF0ZXJpYWwoe1xuICAgICAgY29sb3I6IDB4ZmZmZjAwLFxuICAgICAgZGVwdGhUZXN0OiBmYWxzZSxcbiAgICAgIGRlcHRoV3JpdGU6IGZhbHNlLFxuICAgIH0pO1xuXG4gICAgdGhpcy5fbGluZSA9IG5ldyBUSFJFRS5MaW5lU2VnbWVudHModGhpcy5fZ2VvbWV0cnksIG1hdGVyaWFsKTtcbiAgICB0aGlzLmFkZCh0aGlzLl9saW5lKTtcbiAgfVxuXG4gIHB1YmxpYyBkaXNwb3NlKCk6IHZvaWQge1xuICAgIHRoaXMuX2dlb21ldHJ5LmRpc3Bvc2UoKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVNYXRyaXhXb3JsZChmb3JjZTogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuc3ByaW5nQm9uZS5ib25lLnVwZGF0ZVdvcmxkTWF0cml4KHRydWUsIGZhbHNlKTtcblxuICAgIHRoaXMubWF0cml4LmNvcHkodGhpcy5zcHJpbmdCb25lLmJvbmUubWF0cml4V29ybGQpO1xuXG4gICAgY29uc3QgbWF0cml4V29ybGRFbGVtZW50cyA9IHRoaXMubWF0cml4LmVsZW1lbnRzO1xuICAgIHRoaXMuX2dlb21ldHJ5LndvcmxkU2NhbGUgPSBfdjNBXG4gICAgICAuc2V0KG1hdHJpeFdvcmxkRWxlbWVudHNbMF0sIG1hdHJpeFdvcmxkRWxlbWVudHNbMV0sIG1hdHJpeFdvcmxkRWxlbWVudHNbMl0pXG4gICAgICAubGVuZ3RoKCk7IC8vIGNhbGN1bGF0ZSBzY2FsZSBvZiB4IGNvbXBvbmVudFxuXG4gICAgdGhpcy5fZ2VvbWV0cnkudXBkYXRlKCk7XG5cbiAgICBzdXBlci51cGRhdGVNYXRyaXhXb3JsZChmb3JjZSk7XG4gIH1cbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lSm9pbnQgfSBmcm9tICcuLi8uLi9WUk1TcHJpbmdCb25lSm9pbnQnO1xuXG5leHBvcnQgY2xhc3MgU3ByaW5nQm9uZUJ1ZmZlckdlb21ldHJ5IGV4dGVuZHMgVEhSRUUuQnVmZmVyR2VvbWV0cnkge1xuICBwdWJsaWMgd29ybGRTY2FsZSA9IDEuMDtcblxuICBwcml2YXRlIHJlYWRvbmx5IF9hdHRyUG9zOiBUSFJFRS5CdWZmZXJBdHRyaWJ1dGU7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2F0dHJJbmRleDogVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xuICBwcml2YXRlIHJlYWRvbmx5IF9zcHJpbmdCb25lOiBWUk1TcHJpbmdCb25lSm9pbnQ7XG4gIHByaXZhdGUgX2N1cnJlbnRSYWRpdXMgPSAwO1xuICBwcml2YXRlIHJlYWRvbmx5IF9jdXJyZW50VGFpbCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHNwcmluZ0JvbmU6IFZSTVNwcmluZ0JvbmVKb2ludCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLl9zcHJpbmdCb25lID0gc3ByaW5nQm9uZTtcblxuICAgIHRoaXMuX2F0dHJQb3MgPSBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKG5ldyBGbG9hdDMyQXJyYXkoMjk0KSwgMyk7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJywgdGhpcy5fYXR0clBvcyk7XG5cbiAgICB0aGlzLl9hdHRySW5kZXggPSBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKG5ldyBVaW50MTZBcnJheSgxOTQpLCAxKTtcbiAgICB0aGlzLnNldEluZGV4KHRoaXMuX2F0dHJJbmRleCk7XG5cbiAgICB0aGlzLl9idWlsZEluZGV4KCk7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgbGV0IHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gZmFsc2U7XG5cbiAgICBjb25zdCByYWRpdXMgPSB0aGlzLl9zcHJpbmdCb25lLnNldHRpbmdzLmhpdFJhZGl1cyAvIHRoaXMud29ybGRTY2FsZTtcbiAgICBpZiAodGhpcy5fY3VycmVudFJhZGl1cyAhPT0gcmFkaXVzKSB7XG4gICAgICB0aGlzLl9jdXJyZW50UmFkaXVzID0gcmFkaXVzO1xuICAgICAgc2hvdWxkVXBkYXRlR2VvbWV0cnkgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fY3VycmVudFRhaWwuZXF1YWxzKHRoaXMuX3NwcmluZ0JvbmUuaW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbikpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRUYWlsLmNvcHkodGhpcy5fc3ByaW5nQm9uZS5pbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uKTtcbiAgICAgIHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoc2hvdWxkVXBkYXRlR2VvbWV0cnkpIHtcbiAgICAgIHRoaXMuX2J1aWxkUG9zaXRpb24oKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9idWlsZFBvc2l0aW9uKCk6IHZvaWQge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzI7IGkrKykge1xuICAgICAgY29uc3QgdCA9IChpIC8gMTYuMCkgKiBNYXRoLlBJO1xuXG4gICAgICB0aGlzLl9hdHRyUG9zLnNldFhZWihpLCBNYXRoLmNvcyh0KSwgTWF0aC5zaW4odCksIDAuMCk7XG4gICAgICB0aGlzLl9hdHRyUG9zLnNldFhZWigzMiArIGksIDAuMCwgTWF0aC5jb3ModCksIE1hdGguc2luKHQpKTtcbiAgICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKDY0ICsgaSwgTWF0aC5zaW4odCksIDAuMCwgTWF0aC5jb3ModCkpO1xuICAgIH1cblxuICAgIHRoaXMuc2NhbGUodGhpcy5fY3VycmVudFJhZGl1cywgdGhpcy5fY3VycmVudFJhZGl1cywgdGhpcy5fY3VycmVudFJhZGl1cyk7XG4gICAgdGhpcy50cmFuc2xhdGUodGhpcy5fY3VycmVudFRhaWwueCwgdGhpcy5fY3VycmVudFRhaWwueSwgdGhpcy5fY3VycmVudFRhaWwueik7XG5cbiAgICB0aGlzLl9hdHRyUG9zLnNldFhZWig5NiwgMCwgMCwgMCk7XG4gICAgdGhpcy5fYXR0clBvcy5zZXRYWVooOTcsIHRoaXMuX2N1cnJlbnRUYWlsLngsIHRoaXMuX2N1cnJlbnRUYWlsLnksIHRoaXMuX2N1cnJlbnRUYWlsLnopO1xuXG4gICAgdGhpcy5fYXR0clBvcy5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIF9idWlsZEluZGV4KCk6IHZvaWQge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzI7IGkrKykge1xuICAgICAgY29uc3QgaTEgPSAoaSArIDEpICUgMzI7XG5cbiAgICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWShpICogMiwgaSwgaTEpO1xuICAgICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKDY0ICsgaSAqIDIsIDMyICsgaSwgMzIgKyBpMSk7XG4gICAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoMTI4ICsgaSAqIDIsIDY0ICsgaSwgNjQgKyBpMSk7XG4gICAgfVxuICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWSgxOTIsIDk2LCA5Nyk7XG5cbiAgICB0aGlzLl9hdHRySW5kZXgubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUxpbWl0IH0gZnJvbSAnLi4vVlJNU3ByaW5nQm9uZUxpbWl0JztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVKb2ludCB9IGZyb20gJy4uL1ZSTVNwcmluZ0JvbmVKb2ludCc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lTGltaXRDb25lIH0gZnJvbSAnLi4vVlJNU3ByaW5nQm9uZUxpbWl0Q29uZSc7XG5pbXBvcnQgeyBMaW1pdENvbmVCdWZmZXJHZW9tZXRyeSB9IGZyb20gJy4vdXRpbHMvTGltaXRDb25lQnVmZmVyR2VvbWV0cnknO1xuaW1wb3J0IHsgTGltaXRCdWZmZXJHZW9tZXRyeSB9IGZyb20gJy4vdXRpbHMvTGltaXRCdWZmZXJHZW9tZXRyeSc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lTGltaXRIaW5nZSB9IGZyb20gJy4uL1ZSTVNwcmluZ0JvbmVMaW1pdEhpbmdlJztcbmltcG9ydCB7IExpbWl0SGluZ2VCdWZmZXJHZW9tZXRyeSB9IGZyb20gJy4vdXRpbHMvTGltaXRIaW5nZUJ1ZmZlckdlb21ldHJ5JztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVMaW1pdFNwaGVyaWNhbCB9IGZyb20gJy4uL1ZSTVNwcmluZ0JvbmVMaW1pdFNwaGVyaWNhbCc7XG5pbXBvcnQgeyBMaW1pdFNwaGVyaWNhbEJ1ZmZlckdlb21ldHJ5IH0gZnJvbSAnLi91dGlscy9MaW1pdFNwaGVyaWNhbEJ1ZmZlckdlb21ldHJ5JztcblxuY29uc3QgX3ZlYzNXb3JsZFBvc2l0aW9uID0gLypAX19QVVJFX18qLyBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3ZlYzNTY2FsZSA9IC8qQF9fUFVSRV9fKi8gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuZXhwb3J0IGNsYXNzIFZSTVNwcmluZ0JvbmVMaW1pdEhlbHBlciBleHRlbmRzIFRIUkVFLkdyb3VwIHtcbiAgcHVibGljIHJlYWRvbmx5IGxpbWl0OiBWUk1TcHJpbmdCb25lTGltaXQ7XG4gIHB1YmxpYyByZWFkb25seSBqb2ludDogVlJNU3ByaW5nQm9uZUpvaW50O1xuICBwcml2YXRlIHJlYWRvbmx5IF9nZW9tZXRyeTogTGltaXRCdWZmZXJHZW9tZXRyeTtcbiAgcHJpdmF0ZSByZWFkb25seSBfbGluZTogVEhSRUUuTGluZVNlZ21lbnRzO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihsaW1pdDogVlJNU3ByaW5nQm9uZUxpbWl0LCBqb2ludDogVlJNU3ByaW5nQm9uZUpvaW50KSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLm1hdHJpeEF1dG9VcGRhdGUgPSBmYWxzZTtcblxuICAgIHRoaXMubGltaXQgPSBsaW1pdDtcbiAgICB0aGlzLmpvaW50ID0gam9pbnQ7XG5cbiAgICBpZiAodGhpcy5saW1pdCBpbnN0YW5jZW9mIFZSTVNwcmluZ0JvbmVMaW1pdENvbmUpIHtcbiAgICAgIHRoaXMuX2dlb21ldHJ5ID0gbmV3IExpbWl0Q29uZUJ1ZmZlckdlb21ldHJ5KHRoaXMubGltaXQpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5saW1pdCBpbnN0YW5jZW9mIFZSTVNwcmluZ0JvbmVMaW1pdEhpbmdlKSB7XG4gICAgICB0aGlzLl9nZW9tZXRyeSA9IG5ldyBMaW1pdEhpbmdlQnVmZmVyR2VvbWV0cnkodGhpcy5saW1pdCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmxpbWl0IGluc3RhbmNlb2YgVlJNU3ByaW5nQm9uZUxpbWl0U3BoZXJpY2FsKSB7XG4gICAgICB0aGlzLl9nZW9tZXRyeSA9IG5ldyBMaW1pdFNwaGVyaWNhbEJ1ZmZlckdlb21ldHJ5KHRoaXMubGltaXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZSTVNwcmluZ0JvbmVMaW1pdEhlbHBlcjogVW5rbm93biBsaW1pdCB0eXBlIGRldGVjdGVkJyk7XG4gICAgfVxuXG4gICAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTGluZUJhc2ljTWF0ZXJpYWwoe1xuICAgICAgY29sb3I6IDB4MDBmZmZmLFxuICAgICAgZGVwdGhUZXN0OiBmYWxzZSxcbiAgICAgIGRlcHRoV3JpdGU6IGZhbHNlLFxuICAgIH0pO1xuXG4gICAgdGhpcy5fbGluZSA9IG5ldyBUSFJFRS5MaW5lU2VnbWVudHModGhpcy5fZ2VvbWV0cnksIG1hdGVyaWFsKTtcbiAgICB0aGlzLmFkZCh0aGlzLl9saW5lKTtcbiAgfVxuXG4gIHB1YmxpYyBkaXNwb3NlKCk6IHZvaWQge1xuICAgIHRoaXMuX2dlb21ldHJ5LmRpc3Bvc2UoKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVNYXRyaXhXb3JsZChmb3JjZTogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuam9pbnQuYm9uZS51cGRhdGVXb3JsZE1hdHJpeCh0cnVlLCBmYWxzZSk7XG4gICAgdGhpcy5qb2ludC5ib25lLmdldFdvcmxkUG9zaXRpb24oX3ZlYzNXb3JsZFBvc2l0aW9uKTtcbiAgICBfdmVjM1NjYWxlLnNldFNjYWxhcigwLjUgKiB0aGlzLmpvaW50LndvcmxkU3BhY2VCb25lTGVuZ3RoKTtcblxuICAgIHRoaXMubWF0cml4LmNvbXBvc2UoX3ZlYzNXb3JsZFBvc2l0aW9uLCB0aGlzLmxpbWl0LmludGVybmFsVG90YWxSb3RhdGlvbkNhY2hlLCBfdmVjM1NjYWxlKTtcblxuICAgIHRoaXMuX2dlb21ldHJ5LnVwZGF0ZSgpO1xuXG4gICAgc3VwZXIudXBkYXRlTWF0cml4V29ybGQoZm9yY2UpO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUxpbWl0IH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lTGltaXQnO1xuXG5jb25zdCBTSU5HVUxBUklUWV9FUFNJTE9OID0gTWF0aC5zcXJ0KE51bWJlci5FUFNJTE9OKTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBjb25lIGxpbWl0IG9mIGEgc3ByaW5nIGJvbmUgZGVmaW5lZCBpbiBgVlJNQ19zcHJpbmdCb25lX2xpbWl0YC5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTVNwcmluZ0JvbmVMaW1pdENvbmUgZXh0ZW5kcyBWUk1TcHJpbmdCb25lTGltaXQge1xuICAvKipcbiAgICogVGhlIGFuZ2xlIG9mIHRoZSBjb25lIGxpbWl0IGluIHJhZGlhbnMuXG4gICAqIElmIHRoZSBhbmdsZSBpcyBzZXQgdG8gXHUwM0MwIG9yIGdyZWF0ZXIsIHRoZSBhbmdsZSB3aWxsIGJlIGludGVycHJldGVkIGFzIFx1MDNDMCBieSB0aGUgaW1wbGVtZW50YXRpb24uXG4gICAqIFdoZW4gdGhlIGFuZ2xlIGlzIHNldCB0byBcdTAzQzAsIHRoZSBjb25lIHNoYXBlIGJlY29tZXMgYSBzcGhlcmUuXG4gICAqL1xuICBwdWJsaWMgYW5nbGU6IG51bWJlcjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IocGFyYW1zPzogeyBhbmdsZT86IG51bWJlcjsgcm90YXRpb24/OiBUSFJFRS5RdWF0ZXJuaW9uIH0pIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5hbmdsZSA9IFRIUkVFLk1hdGhVdGlscy5jbGFtcChwYXJhbXM/LmFuZ2xlID8/IE1hdGguUEksIDAuMCwgTWF0aC5QSSk7XG4gICAgdGhpcy5yb3RhdGlvbiA9IHBhcmFtcz8ucm90YXRpb24gPz8gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbiAgfVxuXG4gIHB1YmxpYyBjYWxjdWxhdGVMaW1pdCh0YWlsRGlyOiBUSFJFRS5WZWN0b3IzKTogYm9vbGVhbiB7XG4gICAgLy8gYnJpbmcgdGhlIGRpcmVjdGlvbiBpbnRvIHRoZSBsb2NhbCBzcGFjZSBvZiB0aGUgbGltaXRcbiAgICB0YWlsRGlyLmFwcGx5UXVhdGVybmlvbih0aGlzLl90b3RhbFJvdGF0aW9uSW52Q2FjaGUpO1xuXG4gICAgLy8gY29tcGFyZSB0aGUgeSBjb21wb25lbnQgd2l0aCB0aGUgY29zIG9mIHRoZSBhbmdsZVxuICAgIC8vIEFzc3VtZSB0aGF0IGBhbmdsZWAgaXMgd2l0aGluIFswLCBcdTAzQzBdXG4gICAgY29uc3QgY29zTGltaXRBbmdsZSA9IE1hdGguY29zKHRoaXMuYW5nbGUpO1xuXG4gICAgbGV0IGlzTGltaXRlZCA9IGZhbHNlO1xuXG4gICAgaWYgKHRhaWxEaXIueSA8IGNvc0xpbWl0QW5nbGUpIHtcbiAgICAgIC8vIG5vdyB3ZSBoYXZlIHRvIGFwcGx5IHRoZSBsaW1pdFxuICAgICAgaXNMaW1pdGVkID0gdHJ1ZTtcblxuICAgICAgLy8gU2NhbGUgdGhlIHggYW5kIHogY29tcG9uZW50cyBvZiB0aGUgZGlyZWN0aW9uIHVzaW5nIHRoZSByYXRpbyBvZiB0aGUgc2luIG9mIHRoZSBkaXJlY3Rpb24gYW5kIHRoZSBzaW4gb2YgdGhlIGFuZ2xlIHNldCBpbiB0aGUgbGltaXRcbiAgICAgIGNvbnN0IGhvcml6b250YWxMZW5ndGhTcSA9IDEuMCAtIHRhaWxEaXIueSAqIHRhaWxEaXIueTtcblxuICAgICAgaWYgKGhvcml6b250YWxMZW5ndGhTcSA8IFNJTkdVTEFSSVRZX0VQU0lMT04pIHtcbiAgICAgICAgLy8gVGhlIGRpcmVjdGlvbiBpcyAtWSwgY2hvb3NlIHRoZSArWiBzaWRlXG4gICAgICAgIHRhaWxEaXIueCA9IDAuMDtcbiAgICAgICAgdGFpbERpci56ID0gTWF0aC5zcXJ0KDEuMCAtIGNvc0xpbWl0QW5nbGUgKiBjb3NMaW1pdEFuZ2xlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHNjYWxlID0gTWF0aC5zcXJ0KCgxLjAgLSBjb3NMaW1pdEFuZ2xlICogY29zTGltaXRBbmdsZSkgLyBob3Jpem9udGFsTGVuZ3RoU3EpO1xuICAgICAgICB0YWlsRGlyLnggKj0gc2NhbGU7XG4gICAgICAgIHRhaWxEaXIueiAqPSBzY2FsZTtcbiAgICAgIH1cblxuICAgICAgLy8gU2V0IHRoZSB5IGNvbXBvbmVudCB0byB0aGUgY29zIG9mIHRoZSBhbmdsZVxuICAgICAgdGFpbERpci55ID0gY29zTGltaXRBbmdsZTtcbiAgICB9XG5cbiAgICAvLyBjaGFuZ2UgdGhlIGRpcmVjdGlvbiBiYWNrIHRvIHRoZSB3b3JsZCBzcGFjZVxuICAgIHRhaWxEaXIuYXBwbHlRdWF0ZXJuaW9uKHRoaXMuX3RvdGFsUm90YXRpb25DYWNoZSk7XG5cbiAgICByZXR1cm4gaXNMaW1pdGVkO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHR5cGUgeyBWUk1TcHJpbmdCb25lSm9pbnQgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVKb2ludCc7XG5pbXBvcnQgdHlwZSB7IFZSTVNwcmluZ0JvbmVMaW1pdEhlbHBlciB9IGZyb20gJy4vaGVscGVycy9WUk1TcHJpbmdCb25lTGltaXRIZWxwZXInO1xuXG5jb25zdCBWRUMzX1BPU0lUSVZFX1ggPSAvKkBfX1BVUkVfXyovIG5ldyBUSFJFRS5WZWN0b3IzKDEsIDAsIDApO1xuY29uc3QgVkVDM19QT1NJVElWRV9ZID0gLypAX19QVVJFX18qLyBuZXcgVEhSRUUuVmVjdG9yMygwLCAxLCAwKTtcbmNvbnN0IFZFQzNfTkVHQVRJVkVfWSA9IC8qQF9fUFVSRV9fKi8gbmV3IFRIUkVFLlZlY3RvcjMoMCwgLTEsIDApO1xuXG5jb25zdCBfcXVhdEJvbmVBeGlzID0gLypAX19QVVJFX18qLyBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gYW5nbGUgbGltaXQgb2YgYSBzcHJpbmcgYm9uZS5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFZSTVNwcmluZ0JvbmVMaW1pdCB7XG4gIC8qKlxuICAgKiBUaGUgcm90YXRpb24gZnJvbSB0aGUgZGVmYXVsdCBvcmllbnRhdGlvbiBvZiB0aGUgbGltaXQuXG4gICAqL1xuICBwdWJsaWMgcm90YXRpb246IFRIUkVFLlF1YXRlcm5pb247XG5cbiAgLyoqXG4gICAqIFRoZSBjYWNoZSBmb3IgdGhlIHRvdGFsIHJvdGF0aW9uIG9mIHRoZSBsaW1pdC5cbiAgICogSXQgd2lsbCBiZSBjYWxjdWxhdGVkIGluIHtAbGluayBpbnRlcm5hbFByZWNhbGNSb3RhdGlvbn0uXG4gICAqL1xuICBwcm90ZWN0ZWQgX3RvdGFsUm90YXRpb25DYWNoZTogVEhSRUUuUXVhdGVybmlvbjtcblxuICAvKipcbiAgICogVGhlIGNhY2hlIGZvciB0aGUgdG90YWwgcm90YXRpb24gb2YgdGhlIGxpbWl0LlxuICAgKiBJdCB3aWxsIGJlIGNhbGN1bGF0ZWQgaW4ge0BsaW5rIGludGVybmFsUHJlY2FsY1JvdGF0aW9ufS5cbiAgICpcbiAgICogVGhpcyBpcyBhIHB1YmxpYyBwcm9wZXJ0eSB0byB1c2UgaW4ge0BsaW5rIFZSTVNwcmluZ0JvbmVMaW1pdEhlbHBlcn0uXG4gICAqIERvIG5vdCB0b3VjaCB0aGlzIHByb3BlcnR5IGFzIHdlIG1pZ2h0IGNoYW5nZSB0aGUgaW50ZXJmYWNlIHdpdGhvdXQgbm90aWNlLlxuICAgKi9cbiAgcHVibGljIGdldCBpbnRlcm5hbFRvdGFsUm90YXRpb25DYWNoZSgpOiBUSFJFRS5RdWF0ZXJuaW9uIHtcbiAgICByZXR1cm4gdGhpcy5fdG90YWxSb3RhdGlvbkNhY2hlO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBjYWNoZSBmb3IgdGhlIGludmVyc2Ugb2YgdGhlIHtAbGluayBfdG90YWxSb3RhdGlvbkNhY2hlfS5cbiAgICogSXQgd2lsbCBiZSBjYWxjdWxhdGVkIGluIHtAbGluayBpbnRlcm5hbFByZWNhbGNSb3RhdGlvbn0uXG4gICAqL1xuICBwcm90ZWN0ZWQgX3RvdGFsUm90YXRpb25JbnZDYWNoZTogVEhSRUUuUXVhdGVybmlvbjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5yb3RhdGlvbiA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG4gICAgdGhpcy5fdG90YWxSb3RhdGlvbkNhY2hlID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbiAgICB0aGlzLl90b3RhbFJvdGF0aW9uSW52Q2FjaGUgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByZWNhbGN1bGF0ZSB0aGUgcm90YXRpb24gb2YgdGhlIGxpbWl0LlxuICAgKlxuICAgKiBUaGlzIGlzIGludGVuZGVkIHRvIGJlIGNhbGxlZCBmcm9tIHtAbGluayBWUk1TcHJpbmdCb25lSm9pbnQudXBkYXRlfS5cbiAgICogRG8gbm90IHRvdWNoIHRoaXMgcHJvcGVydHkgYXMgd2UgbWlnaHQgY2hhbmdlIHRoZSBpbnRlcmZhY2Ugd2l0aG91dCBub3RpY2UuXG4gICAqXG4gICAqIEBwYXJhbSB3b3JsZFNwYWNlSW5pdGlhbFJvdGF0aW9uIFRoZSBpbml0aWFsIGxvY2FsIHJvdGF0aW9uIGluIHRoZSBjdXJyZW50IHdvcmxkIHNwYWNlXG4gICAqIEBwYXJhbSBib25lQXhpcyBUaGUgaW5pdGlhbCBheGlzIG9mIHRoZSBjaGlsZCBib25lLCBpbiBsb2NhbCB1bml0XG4gICAqL1xuICBwdWJsaWMgaW50ZXJuYWxQcmVjYWxjUm90YXRpb24od29ybGRTcGFjZUluaXRpYWxSb3RhdGlvbjogVEhSRUUuUXVhdGVybmlvbiwgYm9uZUF4aXM6IFRIUkVFLlZlY3RvcjMpOiB2b2lkIHtcbiAgICAvLyBXaGVuIHRoZSBib25lIGF4aXMgaXMgKDAsIC0xLCAwKSwgcm90YXRlIDE4MCBkZWdyZWVzIGFyb3VuZCB0aGUgWCBheGlzLCBhcyB0aGUgc3BlYyBkZWZpbmVzXG4gICAgaWYgKGJvbmVBeGlzLmVxdWFscyhWRUMzX05FR0FUSVZFX1kpKSB7XG4gICAgICBfcXVhdEJvbmVBeGlzLnNldEZyb21BeGlzQW5nbGUoVkVDM19QT1NJVElWRV9YLCBNYXRoLlBJKTtcbiAgICB9IGVsc2Uge1xuICAgICAgX3F1YXRCb25lQXhpcy5zZXRGcm9tVW5pdFZlY3RvcnMoVkVDM19QT1NJVElWRV9ZLCBib25lQXhpcyk7XG4gICAgfVxuXG4gICAgdGhpcy5fdG90YWxSb3RhdGlvbkNhY2hlLmNvcHkod29ybGRTcGFjZUluaXRpYWxSb3RhdGlvbikubXVsdGlwbHkoX3F1YXRCb25lQXhpcykubXVsdGlwbHkodGhpcy5yb3RhdGlvbik7XG4gICAgdGhpcy5fdG90YWxSb3RhdGlvbkludkNhY2hlLmNvcHkodGhpcy5fdG90YWxSb3RhdGlvbkNhY2hlKS5pbnZlcnQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgdGhlIGxpbWl0IGRpcmVjdGlvbi5cbiAgICogSWYgdGhlIGRpcmVjdGlvbiBpcyBsaW1pdGVkLCBpdCB3aWxsIHJldHVybiBgdHJ1ZWAuXG4gICAqXG4gICAqIEBwYXJhbSB0YWlsRGlyIFRoZSB0YWlsIGRpcmVjdGlvbiBpbiB3b3JsZCBzcGFjZVxuICAgKi9cbiAgcHVibGljIGFic3RyYWN0IGNhbGN1bGF0ZUxpbWl0KHRhaWxEaXI6IFRIUkVFLlZlY3RvcjMpOiBib29sZWFuO1xufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IExpbWl0QnVmZmVyR2VvbWV0cnkgfSBmcm9tICcuL0xpbWl0QnVmZmVyR2VvbWV0cnknO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUxpbWl0Q29uZSB9IGZyb20gJy4uLy4uL1ZSTVNwcmluZ0JvbmVMaW1pdENvbmUnO1xuXG5jb25zdCBRVUFSVEVSX0FSQ19TRUdNRU5UUyA9IDQ7XG5jb25zdCBBUkNfU0VHTUVOVFMgPSA0ICogUVVBUlRFUl9BUkNfU0VHTUVOVFM7XG5cbmV4cG9ydCBjbGFzcyBMaW1pdENvbmVCdWZmZXJHZW9tZXRyeSBleHRlbmRzIFRIUkVFLkJ1ZmZlckdlb21ldHJ5IGltcGxlbWVudHMgTGltaXRCdWZmZXJHZW9tZXRyeSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2F0dHJQb3M6IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZTtcbiAgcHJpdmF0ZSByZWFkb25seSBfYXR0ckluZGV4OiBUSFJFRS5CdWZmZXJBdHRyaWJ1dGU7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2xpbWl0OiBWUk1TcHJpbmdCb25lTGltaXRDb25lO1xuICBwcml2YXRlIF9jdXJyZW50QW5nbGU6IG51bWJlcjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IobGltaXQ6IFZSTVNwcmluZ0JvbmVMaW1pdENvbmUpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5fbGltaXQgPSBsaW1pdDtcbiAgICB0aGlzLl9jdXJyZW50QW5nbGUgPSBsaW1pdC5hbmdsZTtcblxuICAgIHRoaXMuX2F0dHJQb3MgPSBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKG5ldyBGbG9hdDMyQXJyYXkoMyAqIChBUkNfU0VHTUVOVFMgKyAxKSksIDMpO1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKCdwb3NpdGlvbicsIHRoaXMuX2F0dHJQb3MpO1xuXG4gICAgdGhpcy5fYXR0ckluZGV4ID0gbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShuZXcgVWludDE2QXJyYXkoMiAqIChBUkNfU0VHTUVOVFMgKyA0KSksIDEpO1xuICAgIHRoaXMuc2V0SW5kZXgodGhpcy5fYXR0ckluZGV4KTtcblxuICAgIHRoaXMuX2J1aWxkSW5kZXgoKTtcbiAgICB0aGlzLl9idWlsZFBvc2l0aW9uKCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIGxldCBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IGZhbHNlO1xuXG4gICAgaWYgKHRoaXMuX2N1cnJlbnRBbmdsZSAhPT0gdGhpcy5fbGltaXQuYW5nbGUpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRBbmdsZSA9IHRoaXMuX2xpbWl0LmFuZ2xlO1xuICAgICAgc2hvdWxkVXBkYXRlR2VvbWV0cnkgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmIChzaG91bGRVcGRhdGVHZW9tZXRyeSkge1xuICAgICAgdGhpcy5fYnVpbGRQb3NpdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2J1aWxkUG9zaXRpb24oKTogdm9pZCB7XG4gICAgY29uc3QgY29zID0gTWF0aC5jb3ModGhpcy5fY3VycmVudEFuZ2xlKTtcbiAgICBjb25zdCBzaW4gPSBNYXRoLnNpbih0aGlzLl9jdXJyZW50QW5nbGUpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBBUkNfU0VHTUVOVFM7IGkrKykge1xuICAgICAgY29uc3QgdCA9IDIuMCAqIE1hdGguUEkgKiAoaSAvIEFSQ19TRUdNRU5UUyk7XG5cbiAgICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKGksIHNpbiAqIE1hdGguY29zKHQpLCBjb3MsIHNpbiAqIE1hdGguc2luKHQpKTtcbiAgICB9XG5cbiAgICB0aGlzLl9hdHRyUG9zLnNldFhZWihBUkNfU0VHTUVOVFMsIDAsIDAsIDApO1xuXG4gICAgdGhpcy5fYXR0clBvcy5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIF9idWlsZEluZGV4KCk6IHZvaWQge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgQVJDX1NFR01FTlRTOyBpKyspIHtcbiAgICAgIGNvbnN0IGkxID0gKGkgKyAxKSAlIEFSQ19TRUdNRU5UUztcblxuICAgICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKGkgKiAyLCBpLCBpMSk7XG4gICAgfVxuXG4gICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKEFSQ19TRUdNRU5UUyAqIDIsIEFSQ19TRUdNRU5UUywgMCk7XG4gICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKEFSQ19TRUdNRU5UUyAqIDIgKyAyLCBBUkNfU0VHTUVOVFMsIFFVQVJURVJfQVJDX1NFR01FTlRTKTtcbiAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoQVJDX1NFR01FTlRTICogMiArIDQsIEFSQ19TRUdNRU5UUywgMiAqIFFVQVJURVJfQVJDX1NFR01FTlRTKTtcbiAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoQVJDX1NFR01FTlRTICogMiArIDYsIEFSQ19TRUdNRU5UUywgMyAqIFFVQVJURVJfQVJDX1NFR01FTlRTKTtcblxuICAgIHRoaXMuX2F0dHJJbmRleC5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lTGltaXQgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVMaW1pdCc7XG5cbmNvbnN0IFNJTkdVTEFSSVRZX0VQU0lMT04gPSBNYXRoLnNxcnQoTnVtYmVyLkVQU0lMT04pO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIGhpbmdlIGxpbWl0IG9mIGEgc3ByaW5nIGJvbmUgZGVmaW5lZCBpbiBgVlJNQ19zcHJpbmdCb25lX2xpbWl0YC5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTVNwcmluZ0JvbmVMaW1pdEhpbmdlIGV4dGVuZHMgVlJNU3ByaW5nQm9uZUxpbWl0IHtcbiAgLyoqXG4gICAqIFRoZSBhbmdsZSBvZiB0aGUgaGluZ2UgbGltaXQgaW4gcmFkaWFucy5cbiAgICogSWYgdGhlIGFuZ2xlIGlzIHNldCB0byBcdTAzQzAgb3IgZ3JlYXRlciwgdGhlIGFuZ2xlIHdpbGwgYmUgaW50ZXJwcmV0ZWQgYXMgXHUwM0MwIGJ5IHRoZSBpbXBsZW1lbnRhdGlvbi5cbiAgICogV2hlbiB0aGUgYW5nbGUgaXMgc2V0IHRvIFx1MDNDMCwgdGhlIGhpbmdlIHNoYXBlIGJlY29tZXMgYSBmdWxsIGRpc2MuXG4gICAqL1xuICBwdWJsaWMgYW5nbGU6IG51bWJlcjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IocGFyYW1zPzogeyBhbmdsZT86IG51bWJlcjsgcm90YXRpb24/OiBUSFJFRS5RdWF0ZXJuaW9uIH0pIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5hbmdsZSA9IFRIUkVFLk1hdGhVdGlscy5jbGFtcChwYXJhbXM/LmFuZ2xlID8/IE1hdGguUEksIDAuMCwgTWF0aC5QSSk7XG4gICAgdGhpcy5yb3RhdGlvbiA9IHBhcmFtcz8ucm90YXRpb24gPz8gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbiAgfVxuXG4gIHB1YmxpYyBjYWxjdWxhdGVMaW1pdCh0YWlsRGlyOiBUSFJFRS5WZWN0b3IzKTogYm9vbGVhbiB7XG4gICAgLy8gYnJpbmcgdGhlIGRpcmVjdGlvbiBpbnRvIHRoZSBsb2NhbCBzcGFjZSBvZiB0aGUgbGltaXRcbiAgICB0YWlsRGlyLmFwcGx5UXVhdGVybmlvbih0aGlzLl90b3RhbFJvdGF0aW9uSW52Q2FjaGUpO1xuXG4gICAgbGV0IGlzTGltaXRlZCA9IGZhbHNlO1xuXG4gICAgY29uc3QgcHJvamVjdGVkTGVuZ3RoU3EgPSB0YWlsRGlyLnkgKiB0YWlsRGlyLnkgKyB0YWlsRGlyLnogKiB0YWlsRGlyLno7XG4gICAgaWYgKHByb2plY3RlZExlbmd0aFNxIDwgU0lOR1VMQVJJVFlfRVBTSUxPTikge1xuICAgICAgLy8gVGhlIGRpcmVjdGlvbiBpcyBlaXRoZXIgK1ggb3IgLVgsIGNob29zZSArWVxuICAgICAgaXNMaW1pdGVkID0gdHJ1ZTtcbiAgICAgIHRhaWxEaXIuc2V0KDAuMCwgMS4wLCAwLjApO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBNYXAgdGhlIGRpcmVjdGlvbiB0byB0aGUgWVogcGxhbmUgb2YgdGhlIGhpbmdlXG4gICAgICBpZiAodGFpbERpci54ICE9PSAwLjApIHtcbiAgICAgICAgaXNMaW1pdGVkID0gdHJ1ZTtcblxuICAgICAgICBjb25zdCBzY2FsZSA9IDEuMCAvIE1hdGguc3FydChwcm9qZWN0ZWRMZW5ndGhTcSk7XG4gICAgICAgIHRhaWxEaXIuc2V0KDAuMCwgdGFpbERpci55ICogc2NhbGUsIHRhaWxEaXIueiAqIHNjYWxlKTtcbiAgICAgIH1cblxuICAgICAgLy8gQXNzdW1lIHRoYXQgYGFuZ2xlYCBpcyB3aXRoaW4gWzAsIFx1MDNDMF1cbiAgICAgIGNvbnN0IGNvc0xpbWl0QW5nbGUgPSBNYXRoLmNvcyh0aGlzLmFuZ2xlKTtcbiAgICAgIGlmICh0YWlsRGlyLnkgPCBjb3NMaW1pdEFuZ2xlKSB7XG4gICAgICAgIGlzTGltaXRlZCA9IHRydWU7XG5cbiAgICAgICAgY29uc3Qgc2luTGltaXRBbmdsZSA9IE1hdGguc3FydCgxLjAgLSBjb3NMaW1pdEFuZ2xlICogY29zTGltaXRBbmdsZSk7XG5cbiAgICAgICAgLy8gV2hlbiB0aGUgZGlyZWN0aW9uIGlzIC1ZLCBjaG9vc2UgdGhlICtaIHNpZGVcbiAgICAgICAgY29uc3QgelNpZ24gPSB0YWlsRGlyLnogPCAwLjAgPyAtMS4wIDogMS4wO1xuICAgICAgICB0YWlsRGlyLnkgPSBjb3NMaW1pdEFuZ2xlO1xuICAgICAgICB0YWlsRGlyLnogPSBzaW5MaW1pdEFuZ2xlICogelNpZ247XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gY2hhbmdlIHRoZSBkaXJlY3Rpb24gYmFjayB0byB0aGUgd29ybGQgc3BhY2VcbiAgICB0YWlsRGlyLmFwcGx5UXVhdGVybmlvbih0aGlzLl90b3RhbFJvdGF0aW9uQ2FjaGUpO1xuXG4gICAgcmV0dXJuIGlzTGltaXRlZDtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IExpbWl0QnVmZmVyR2VvbWV0cnkgfSBmcm9tICcuL0xpbWl0QnVmZmVyR2VvbWV0cnknO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUxpbWl0SGluZ2UgfSBmcm9tICcuLi8uLi9WUk1TcHJpbmdCb25lTGltaXRIaW5nZSc7XG5cbmNvbnN0IEFSQ19TRUdNRU5UUyA9IDE3O1xuXG5leHBvcnQgY2xhc3MgTGltaXRIaW5nZUJ1ZmZlckdlb21ldHJ5IGV4dGVuZHMgVEhSRUUuQnVmZmVyR2VvbWV0cnkgaW1wbGVtZW50cyBMaW1pdEJ1ZmZlckdlb21ldHJ5IHtcbiAgcHJpdmF0ZSByZWFkb25seSBfYXR0clBvczogVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xuICBwcml2YXRlIHJlYWRvbmx5IF9hdHRySW5kZXg6IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZTtcbiAgcHJpdmF0ZSByZWFkb25seSBfbGltaXQ6IFZSTVNwcmluZ0JvbmVMaW1pdEhpbmdlO1xuICBwcml2YXRlIF9jdXJyZW50QW5nbGU6IG51bWJlcjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IobGltaXQ6IFZSTVNwcmluZ0JvbmVMaW1pdEhpbmdlKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuX2xpbWl0ID0gbGltaXQ7XG4gICAgdGhpcy5fY3VycmVudEFuZ2xlID0gbGltaXQuYW5nbGU7XG5cbiAgICB0aGlzLl9hdHRyUG9zID0gbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShuZXcgRmxvYXQzMkFycmF5KDMgKiAoQVJDX1NFR01FTlRTICsgMSkpLCAzKTtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgncG9zaXRpb24nLCB0aGlzLl9hdHRyUG9zKTtcblxuICAgIHRoaXMuX2F0dHJJbmRleCA9IG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUobmV3IFVpbnQxNkFycmF5KDIgKiAoQVJDX1NFR01FTlRTICsgMSkpLCAxKTtcbiAgICB0aGlzLnNldEluZGV4KHRoaXMuX2F0dHJJbmRleCk7XG5cbiAgICB0aGlzLl9idWlsZEluZGV4KCk7XG4gICAgdGhpcy5fYnVpbGRQb3NpdGlvbigpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBsZXQgc2hvdWxkVXBkYXRlR2VvbWV0cnkgPSBmYWxzZTtcblxuICAgIGlmICh0aGlzLl9jdXJyZW50QW5nbGUgIT09IHRoaXMuX2xpbWl0LmFuZ2xlKSB7XG4gICAgICB0aGlzLl9jdXJyZW50QW5nbGUgPSB0aGlzLl9saW1pdC5hbmdsZTtcbiAgICAgIHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoc2hvdWxkVXBkYXRlR2VvbWV0cnkpIHtcbiAgICAgIHRoaXMuX2J1aWxkUG9zaXRpb24oKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9idWlsZFBvc2l0aW9uKCk6IHZvaWQge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgQVJDX1NFR01FTlRTOyBpKyspIHtcbiAgICAgIGNvbnN0IHQgPSB0aGlzLl9jdXJyZW50QW5nbGUgKiAoMi4wICogKGkgLyAoQVJDX1NFR01FTlRTIC0gMSkpIC0gMS4wKTtcblxuICAgICAgdGhpcy5fYXR0clBvcy5zZXRYWVooaSwgMCwgTWF0aC5jb3ModCksIE1hdGguc2luKHQpKTtcbiAgICB9XG5cbiAgICB0aGlzLl9hdHRyUG9zLnNldFhZWihBUkNfU0VHTUVOVFMsIDAsIDAsIDApO1xuXG4gICAgdGhpcy5fYXR0clBvcy5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIF9idWlsZEluZGV4KCk6IHZvaWQge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgQVJDX1NFR01FTlRTIC0gMTsgaSsrKSB7XG4gICAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoaSAqIDIsIGksIGkgKyAxKTtcbiAgICB9XG5cbiAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoQVJDX1NFR01FTlRTICogMiAtIDIsIEFSQ19TRUdNRU5UUyAtIDEsIEFSQ19TRUdNRU5UUyk7XG4gICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKEFSQ19TRUdNRU5UUyAqIDIsIEFSQ19TRUdNRU5UUywgMCk7XG5cbiAgICB0aGlzLl9hdHRySW5kZXgubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUxpbWl0IH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lTGltaXQnO1xuXG5jb25zdCBTSU5HVUxBUklUWV9FUFNJTE9OID0gTWF0aC5zcXJ0KE51bWJlci5FUFNJTE9OKTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBzcGhlcmljYWwgbGltaXQgb2YgYSBzcHJpbmcgYm9uZSBkZWZpbmVkIGluIGBWUk1DX3NwcmluZ0JvbmVfbGltaXRgLlxuICovXG5leHBvcnQgY2xhc3MgVlJNU3ByaW5nQm9uZUxpbWl0U3BoZXJpY2FsIGV4dGVuZHMgVlJNU3ByaW5nQm9uZUxpbWl0IHtcbiAgLyoqXG4gICAqIFRoZSBwaXRjaCBhbmdsZSBvZiB0aGUgc3BoZXJpY2FsIGxpbWl0IGluIHJhZGlhbnMuXG4gICAqIElmIHRoZSBwaXRjaCBhbmdsZSBpcyBzZXQgdG8gXHUwM0MwIG9yIGdyZWF0ZXIsIHRoZSBhbmdsZSB3aWxsIGJlIGludGVycHJldGVkIGFzIFx1MDNDMCBieSB0aGUgaW1wbGVtZW50YXRpb24uXG4gICAqL1xuICBwdWJsaWMgcGl0Y2g6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIHlhdyBhbmdsZSBvZiB0aGUgc3BoZXJpY2FsIGxpbWl0IGluIHJhZGlhbnMuXG4gICAqIElmIHRoZSB5YXcgYW5nbGUgaXMgc2V0IHRvIFx1MDNDMC8yIG9yIGdyZWF0ZXIsIHRoZSBhbmdsZSB3aWxsIGJlIGludGVycHJldGVkIGFzIFx1MDNDMC8yIGJ5IHRoZSBpbXBsZW1lbnRhdGlvbi5cbiAgICovXG4gIHB1YmxpYyB5YXc6IG51bWJlcjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IocGFyYW1zPzogeyBwaXRjaD86IG51bWJlcjsgeWF3PzogbnVtYmVyOyByb3RhdGlvbj86IFRIUkVFLlF1YXRlcm5pb24gfSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnBpdGNoID0gVEhSRUUuTWF0aFV0aWxzLmNsYW1wKHBhcmFtcz8ucGl0Y2ggPz8gTWF0aC5QSSwgMC4wLCBNYXRoLlBJKTtcbiAgICB0aGlzLnlhdyA9IFRIUkVFLk1hdGhVdGlscy5jbGFtcChwYXJhbXM/LnlhdyA/PyBNYXRoLlBJIC8gMi4wLCAwLjAsIE1hdGguUEkgLyAyLjApO1xuICAgIHRoaXMucm90YXRpb24gPSBwYXJhbXM/LnJvdGF0aW9uID8/IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG4gIH1cblxuICBwdWJsaWMgY2FsY3VsYXRlTGltaXQodGFpbERpcjogVEhSRUUuVmVjdG9yMyk6IGJvb2xlYW4ge1xuICAgIC8vIGJyaW5nIHRoZSBkaXJlY3Rpb24gaW50byB0aGUgbG9jYWwgc3BhY2Ugb2YgdGhlIGxpbWl0XG4gICAgdGFpbERpci5hcHBseVF1YXRlcm5pb24odGhpcy5fdG90YWxSb3RhdGlvbkludkNhY2hlKTtcblxuICAgIGxldCBpc0xpbWl0ZWQgPSBmYWxzZTtcblxuICAgIC8vIGNhbGN1bGF0ZSB0aGUgcGl0Y2ggLyB5YXcgb2YgdGhlIGRpcmVjdGlvblxuICAgIGxldCBwaXRjaDogbnVtYmVyO1xuICAgIGlmICh0YWlsRGlyLnkgPCAtMS4wICsgU0lOR1VMQVJJVFlfRVBTSUxPTikge1xuICAgICAgLy8gVGhlIGRpcmVjdGlvbiBpcyAtWSwgY2hvb3NlIHRoZSArWiBzaWRlXG4gICAgICBwaXRjaCA9IE1hdGguUEk7XG4gICAgfSBlbHNlIGlmIChNYXRoLmFicyh0YWlsRGlyLngpID4gMS4wIC0gU0lOR1VMQVJJVFlfRVBTSUxPTikge1xuICAgICAgLy8gVGhlIGRpcmVjdGlvbiBpcyBlaXRoZXIgK1ggb3IgLVgsIGNob29zZSB0aGUgK1kgc2lkZVxuICAgICAgcGl0Y2ggPSAwLjA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBpdGNoID0gTWF0aC5hdGFuMih0YWlsRGlyLnosIHRhaWxEaXIueSk7XG4gICAgfVxuICAgIGxldCB5YXcgPSBNYXRoLmFzaW4oVEhSRUUuTWF0aFV0aWxzLmNsYW1wKHRhaWxEaXIueCwgLTEuMCwgMS4wKSk7XG5cbiAgICAvLyBsaW1pdCB0aGUgcGl0Y2ggYW5nbGVcbiAgICAvLyBBc3N1bWUgdGhhdCBgcGl0Y2hgIGlzIHdpdGhpbiBbMCwgXHUwM0MwXVxuICAgIGlmIChNYXRoLmFicyhwaXRjaCkgPiB0aGlzLnBpdGNoKSB7XG4gICAgICBpc0xpbWl0ZWQgPSB0cnVlO1xuICAgICAgcGl0Y2ggPSB0aGlzLnBpdGNoICogTWF0aC5zaWduKHBpdGNoKTtcbiAgICB9XG5cbiAgICAvLyBsaW1pdCB0aGUgeWF3IGFuZ2xlXG4gICAgLy8gQXNzdW1lIHRoYXQgYHlhd2AgaXMgd2l0aGluIFswLCBcdTAzQzAvMl1cbiAgICBpZiAoTWF0aC5hYnMoeWF3KSA+IHRoaXMueWF3KSB7XG4gICAgICBpc0xpbWl0ZWQgPSB0cnVlO1xuICAgICAgeWF3ID0gdGhpcy55YXcgKiBNYXRoLnNpZ24oeWF3KTtcbiAgICB9XG5cbiAgICAvLyByZWNhbGN1bGF0ZSB0aGUgZGlyZWN0aW9uIHVzaW5nIHRoZSBsaW1pdGVkIHBpdGNoIC8geWF3XG4gICAgY29uc3QgY29zWWF3ID0gTWF0aC5jb3MoeWF3KTtcbiAgICBjb25zdCBzaW5ZYXcgPSBNYXRoLnNpbih5YXcpO1xuICAgIHRhaWxEaXIuc2V0KHNpbllhdywgY29zWWF3ICogTWF0aC5jb3MocGl0Y2gpLCBjb3NZYXcgKiBNYXRoLnNpbihwaXRjaCkpO1xuXG4gICAgLy8gY2hhbmdlIHRoZSBkaXJlY3Rpb24gYmFjayB0byB0aGUgd29ybGQgc3BhY2VcbiAgICB0YWlsRGlyLmFwcGx5UXVhdGVybmlvbih0aGlzLl90b3RhbFJvdGF0aW9uQ2FjaGUpO1xuXG4gICAgcmV0dXJuIGlzTGltaXRlZDtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IExpbWl0QnVmZmVyR2VvbWV0cnkgfSBmcm9tICcuL0xpbWl0QnVmZmVyR2VvbWV0cnknO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUxpbWl0U3BoZXJpY2FsIH0gZnJvbSAnLi4vLi4vVlJNU3ByaW5nQm9uZUxpbWl0U3BoZXJpY2FsJztcblxuY29uc3QgQVJDX1NFR01FTlRTID0gMTc7XG5cbmV4cG9ydCBjbGFzcyBMaW1pdFNwaGVyaWNhbEJ1ZmZlckdlb21ldHJ5IGV4dGVuZHMgVEhSRUUuQnVmZmVyR2VvbWV0cnkgaW1wbGVtZW50cyBMaW1pdEJ1ZmZlckdlb21ldHJ5IHtcbiAgcHJpdmF0ZSByZWFkb25seSBfYXR0clBvczogVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xuICBwcml2YXRlIHJlYWRvbmx5IF9hdHRySW5kZXg6IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZTtcbiAgcHJpdmF0ZSByZWFkb25seSBfbGltaXQ6IFZSTVNwcmluZ0JvbmVMaW1pdFNwaGVyaWNhbDtcbiAgcHJpdmF0ZSBfY3VycmVudFBpdGNoOiBudW1iZXI7XG4gIHByaXZhdGUgX2N1cnJlbnRZYXc6IG51bWJlcjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IobGltaXQ6IFZSTVNwcmluZ0JvbmVMaW1pdFNwaGVyaWNhbCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLl9saW1pdCA9IGxpbWl0O1xuICAgIHRoaXMuX2N1cnJlbnRQaXRjaCA9IGxpbWl0LnBpdGNoO1xuICAgIHRoaXMuX2N1cnJlbnRZYXcgPSBsaW1pdC55YXc7XG5cbiAgICB0aGlzLl9hdHRyUG9zID0gbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShuZXcgRmxvYXQzMkFycmF5KDMgKiAoQVJDX1NFR01FTlRTICsgNCAqIChBUkNfU0VHTUVOVFMgLSAxKSArIDEpKSwgMyk7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJywgdGhpcy5fYXR0clBvcyk7XG5cbiAgICB0aGlzLl9hdHRySW5kZXggPSBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKG5ldyBVaW50MTZBcnJheSgyICogKDUgKiAoQVJDX1NFR01FTlRTIC0gMSkgKyA2KSksIDEpO1xuICAgIHRoaXMuc2V0SW5kZXgodGhpcy5fYXR0ckluZGV4KTtcblxuICAgIHRoaXMuX2J1aWxkSW5kZXgoKTtcbiAgICB0aGlzLl9idWlsZFBvc2l0aW9uKCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIGxldCBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IGZhbHNlO1xuXG4gICAgaWYgKHRoaXMuX2N1cnJlbnRQaXRjaCAhPT0gdGhpcy5fbGltaXQucGl0Y2gpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRQaXRjaCA9IHRoaXMuX2xpbWl0LnBpdGNoO1xuICAgICAgc2hvdWxkVXBkYXRlR2VvbWV0cnkgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9jdXJyZW50WWF3ICE9PSB0aGlzLl9saW1pdC55YXcpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRZYXcgPSB0aGlzLl9saW1pdC55YXc7XG4gICAgICBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHNob3VsZFVwZGF0ZUdlb21ldHJ5KSB7XG4gICAgICB0aGlzLl9idWlsZFBvc2l0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRQb3NpdGlvbigpOiB2b2lkIHtcbiAgICAvLyB5LXogcGl0Y2ggYW5nbGVcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IEFSQ19TRUdNRU5UUzsgaSsrKSB7XG4gICAgICBjb25zdCBwaXRjaCA9IHRoaXMuX2N1cnJlbnRQaXRjaCAqICgyLjAgKiAoaSAvIChBUkNfU0VHTUVOVFMgLSAxKSkgLSAxLjApO1xuXG4gICAgICB0aGlzLl9hdHRyUG9zLnNldFhZWihpLCAwLCBNYXRoLmNvcyhwaXRjaCksIE1hdGguc2luKHBpdGNoKSk7XG4gICAgfVxuXG4gICAgLy8gcGl0Y2ggYXJjIGF0IGVkZ2VzXG4gICAge1xuICAgICAgY29uc3QgY29zWWF3ID0gTWF0aC5jb3ModGhpcy5fY3VycmVudFlhdyk7XG4gICAgICBjb25zdCBzaW5ZYXcgPSBNYXRoLnNpbih0aGlzLl9jdXJyZW50WWF3KTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBBUkNfU0VHTUVOVFMgLSAxOyBpKyspIHtcbiAgICAgICAgY29uc3QgcGl0Y2ggPSB0aGlzLl9jdXJyZW50UGl0Y2ggKiAoMi4wICogKGkgLyAoQVJDX1NFR01FTlRTIC0gMSkpIC0gMS4wKTtcbiAgICAgICAgY29uc3QgY29zUGl0Y2ggPSBNYXRoLmNvcyhwaXRjaCk7XG4gICAgICAgIGNvbnN0IHNpblBpdGNoID0gTWF0aC5zaW4ocGl0Y2gpO1xuXG4gICAgICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKEFSQ19TRUdNRU5UUyArIGksIHNpbllhdywgY29zWWF3ICogY29zUGl0Y2gsIGNvc1lhdyAqIHNpblBpdGNoKTtcbiAgICAgICAgdGhpcy5fYXR0clBvcy5zZXRYWVooQVJDX1NFR01FTlRTICsgMiAqIChBUkNfU0VHTUVOVFMgLSAxKSArIGksIC1zaW5ZYXcsIGNvc1lhdyAqIGNvc1BpdGNoLCAtY29zWWF3ICogc2luUGl0Y2gpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHlhdyBhcmMgYXQgZWRnZXNcbiAgICB7XG4gICAgICBjb25zdCBjb3NQaXRjaCA9IE1hdGguY29zKHRoaXMuX2N1cnJlbnRQaXRjaCk7XG4gICAgICBjb25zdCBzaW5QaXRjaCA9IE1hdGguc2luKHRoaXMuX2N1cnJlbnRQaXRjaCk7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgQVJDX1NFR01FTlRTIC0gMTsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHlhdyA9IHRoaXMuX2N1cnJlbnRZYXcgKiAoMi4wICogKGkgLyAoQVJDX1NFR01FTlRTIC0gMSkpIC0gMS4wKTtcbiAgICAgICAgY29uc3QgY29zWWF3ID0gTWF0aC5jb3MoeWF3KTtcbiAgICAgICAgY29uc3Qgc2luWWF3ID0gTWF0aC5zaW4oeWF3KTtcblxuICAgICAgICB0aGlzLl9hdHRyUG9zLnNldFhZWihBUkNfU0VHTUVOVFMgKyBBUkNfU0VHTUVOVFMgLSAxICsgaSwgLXNpbllhdywgY29zWWF3ICogY29zUGl0Y2gsIGNvc1lhdyAqIHNpblBpdGNoKTtcbiAgICAgICAgdGhpcy5fYXR0clBvcy5zZXRYWVooQVJDX1NFR01FTlRTICsgMyAqIChBUkNfU0VHTUVOVFMgLSAxKSArIGksIHNpbllhdywgY29zWWF3ICogY29zUGl0Y2gsIC1jb3NZYXcgKiBzaW5QaXRjaCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5fYXR0clBvcy5zZXRYWVooQVJDX1NFR01FTlRTICsgNCAqIChBUkNfU0VHTUVOVFMgLSAxKSwgMCwgMCwgMCk7XG5cbiAgICB0aGlzLl9hdHRyUG9zLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX2J1aWxkSW5kZXgoKTogdm9pZCB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBBUkNfU0VHTUVOVFMgLSAxOyBpKyspIHtcbiAgICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWShpICogMiwgaSwgaSArIDEpO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNCAqIChBUkNfU0VHTUVOVFMgLSAxKTsgaSsrKSB7XG4gICAgICBjb25zdCBpMSA9IChpICsgMSkgJSAoNCAqIChBUkNfU0VHTUVOVFMgLSAxKSk7XG4gICAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoMiAqIChBUkNfU0VHTUVOVFMgLSAxICsgaSksIEFSQ19TRUdNRU5UUyArIGksIEFSQ19TRUdNRU5UUyArIGkxKTtcbiAgICB9XG5cbiAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoMiAqICg1ICogKEFSQ19TRUdNRU5UUyAtIDEpKSwgQVJDX1NFR01FTlRTICsgNCAqIChBUkNfU0VHTUVOVFMgLSAxKSwgMCk7XG4gICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKDIgKiAoNSAqIChBUkNfU0VHTUVOVFMgLSAxKSArIDEpLCBBUkNfU0VHTUVOVFMgKyA0ICogKEFSQ19TRUdNRU5UUyAtIDEpLCBBUkNfU0VHTUVOVFMgLSAxKTtcbiAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoMiAqICg1ICogKEFSQ19TRUdNRU5UUyAtIDEpICsgMiksIEFSQ19TRUdNRU5UUyArIDQgKiAoQVJDX1NFR01FTlRTIC0gMSksIEFSQ19TRUdNRU5UUyk7XG4gICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKFxuICAgICAgMiAqICg1ICogKEFSQ19TRUdNRU5UUyAtIDEpICsgMyksXG4gICAgICBBUkNfU0VHTUVOVFMgKyA0ICogKEFSQ19TRUdNRU5UUyAtIDEpLFxuICAgICAgQVJDX1NFR01FTlRTICsgKEFSQ19TRUdNRU5UUyAtIDEpLFxuICAgICk7XG4gICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKFxuICAgICAgMiAqICg1ICogKEFSQ19TRUdNRU5UUyAtIDEpICsgNCksXG4gICAgICBBUkNfU0VHTUVOVFMgKyA0ICogKEFSQ19TRUdNRU5UUyAtIDEpLFxuICAgICAgQVJDX1NFR01FTlRTICsgMiAqIChBUkNfU0VHTUVOVFMgLSAxKSxcbiAgICApO1xuICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWShcbiAgICAgIDIgKiAoNSAqIChBUkNfU0VHTUVOVFMgLSAxKSArIDUpLFxuICAgICAgQVJDX1NFR01FTlRTICsgNCAqIChBUkNfU0VHTUVOVFMgLSAxKSxcbiAgICAgIEFSQ19TRUdNRU5UUyArIDMgKiAoQVJDX1NFR01FTlRTIC0gMSksXG4gICAgKTtcblxuICAgIHRoaXMuX2F0dHJJbmRleC5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgdHlwZSB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZSc7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGNvbGxpZGVyIG9mIGEgc3ByaW5nIGJvbmUuXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1TcHJpbmdCb25lQ29sbGlkZXIgZXh0ZW5kcyBUSFJFRS5PYmplY3QzRCB7XG4gIC8qKlxuICAgKiBUaGUgc2hhcGUgb2YgdGhlIGNvbGxpZGVyLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IHNoYXBlOiBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZTtcblxuICAvKipcbiAgICogV29ybGQgc3BhY2UgbWF0cml4IGZvciB0aGUgY29sbGlkZXIgc2hhcGUgdXNlZCBpbiBjb2xsaXNpb24gY2FsY3VsYXRpb25zLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGNvbGxpZGVyTWF0cml4ID0gbmV3IFRIUkVFLk1hdHJpeDQoKTtcblxuICBwdWJsaWMgY29uc3RydWN0b3Ioc2hhcGU6IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuc2hhcGUgPSBzaGFwZTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVXb3JsZE1hdHJpeCh1cGRhdGVQYXJlbnRzOiBib29sZWFuLCB1cGRhdGVDaGlsZHJlbjogYm9vbGVhbik6IHZvaWQge1xuICAgIHN1cGVyLnVwZGF0ZVdvcmxkTWF0cml4KHVwZGF0ZVBhcmVudHMsIHVwZGF0ZUNoaWxkcmVuKTtcblxuICAgIHVwZGF0ZUNvbGxpZGVyTWF0cml4KHRoaXMuY29sbGlkZXJNYXRyaXgsIHRoaXMubWF0cml4V29ybGQsIHRoaXMuc2hhcGUub2Zmc2V0KTtcbiAgfVxufVxuXG4vKipcbiAqIENvbXB1dGVzIHRoZSBjb2xsaWRlck1hdHJpeCBiYXNlZCBvbiBhbiBvZmZzZXQgYW5kIGEgd29ybGQgbWF0cml4LlxuICogRXF1aXZhbGVudCB0byB0aGUgZm9sbG93aW5nIGNvZGUgd2hlbiBtYXRyaXhXb3JsZCBpcyBhbiBhZmZpbmUgbWF0cml4OlxuICogYGBganNcbiAqIG91dC5tYWtlVHJhbnNsYXRpb24ob2Zmc2V0KS5wcmVtdWx0aXBseShtYXRyaXhXb3JsZClcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSBjb2xsaWRlck1hdHJpeCBUaGUgdGFyZ2V0IG1hdHJpeCB0byBzdG9yZSB0aGUgcmVzdWx0IGluLlxuICogQHBhcmFtIG1hdHJpeFdvcmxkIFRoZSB3b3JsZCBtYXRyaXggZm8gdGhlIGNvbGxpZGVyIG9iamVjdC5cbiAqIEBwYXJhbSBvZmZzZXQgT3B0aW9uYWwgb2Zmc2V0IHRvIHRoZSBjb2xsaWRlciBzaGFwZS5cbiAqL1xuZnVuY3Rpb24gdXBkYXRlQ29sbGlkZXJNYXRyaXgoY29sbGlkZXJNYXRyaXg6IFRIUkVFLk1hdHJpeDQsIG1hdHJpeFdvcmxkOiBUSFJFRS5NYXRyaXg0LCBvZmZzZXQ/OiBUSFJFRS5WZWN0b3IzKSB7XG4gIGNvbnN0IG1lID0gbWF0cml4V29ybGQuZWxlbWVudHM7XG5cbiAgY29sbGlkZXJNYXRyaXguY29weShtYXRyaXhXb3JsZCk7XG5cbiAgaWYgKG9mZnNldCkge1xuICAgIGNvbGxpZGVyTWF0cml4LmVsZW1lbnRzWzEyXSA9IG1lWzBdICogb2Zmc2V0LnggKyBtZVs0XSAqIG9mZnNldC55ICsgbWVbOF0gKiBvZmZzZXQueiArIG1lWzEyXTtcbiAgICBjb2xsaWRlck1hdHJpeC5lbGVtZW50c1sxM10gPSBtZVsxXSAqIG9mZnNldC54ICsgbWVbNV0gKiBvZmZzZXQueSArIG1lWzldICogb2Zmc2V0LnogKyBtZVsxM107XG4gICAgY29sbGlkZXJNYXRyaXguZWxlbWVudHNbMTRdID0gbWVbMl0gKiBvZmZzZXQueCArIG1lWzZdICogb2Zmc2V0LnkgKyBtZVsxMF0gKiBvZmZzZXQueiArIG1lWzE0XTtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IE1hdHJpeDRJbnZlcnNlQ2FjaGUgfSBmcm9tICcuL3V0aWxzL01hdHJpeDRJbnZlcnNlQ2FjaGUnO1xuaW1wb3J0IHsgZ2V0V29ybGRRdWF0ZXJuaW9uTGl0ZSB9IGZyb20gJy4vdXRpbHMvZ2V0V29ybGRRdWF0ZXJuaW9uTGl0ZSc7XG5pbXBvcnQgdHlwZSB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cCc7XG5pbXBvcnQgdHlwZSB7IFZSTVNwcmluZ0JvbmVKb2ludFNldHRpbmdzIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lSm9pbnRTZXR0aW5ncyc7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG5pbXBvcnQgdHlwZSB7IFZSTVNwcmluZ0JvbmVNYW5hZ2VyIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lTWFuYWdlcic7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lTGltaXQgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVMaW1pdCc7XG5cbi8vIGJhc2VkIG9uXG4vLyBodHRwOi8vcm9ja2V0anVtcC5za3IuanAvdW5pdHkzZC8xMDkvXG4vLyBodHRwczovL2dpdGh1Yi5jb20vZHdhbmdvL1VuaVZSTS9ibG9iL21hc3Rlci9TY3JpcHRzL1NwcmluZ0JvbmUvVlJNU3ByaW5nQm9uZS5jc1xuXG5jb25zdCBJREVOVElUWV9NQVRSSVg0ID0gbmV3IFRIUkVFLk1hdHJpeDQoKTtcblxuLy8gXHU4QTA4XHU3Qjk3XHU0RTJEXHUzMDZFXHU0RTAwXHU2NjQyXHU0RkREXHU1QjU4XHU3NTI4XHU1OTA5XHU2NTcwXHVGRjA4XHU0RTAwXHU1RUE2XHUzMEE0XHUzMEYzXHUzMEI5XHUzMEJGXHUzMEYzXHUzMEI5XHUzMDkyXHU0RjVDXHUzMDYzXHUzMDVGXHUzMDg5XHUzMDQyXHUzMDY4XHUzMDZGXHU0RjdGXHUzMDQ0XHU1NkRFXHUzMDU5XHVGRjA5XG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF92M0IgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3dvcmxkU3BhY2VJbml0aWFsUm90YXRpb24gPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXG4vKipcbiAqIFRoZSBpbml0aWFsIGxvY2FsIG1hdHJpeCBpbiB0aGUgY3VycmVudCB3b3JsZCBzcGFjZS5cbiAqIEEgdGVtcG9yYXJ5IHZhcmlhYmxlIHdoaWNoIGlzIHVzZWQgaW4gYHVwZGF0ZWAuXG4gKi9cbmNvbnN0IF93b3JsZFNwYWNlSW5pdGlhbE1hdHJpeCA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG5cbi8qKlxuICogVGhlIGludmVyc2Ugb2Yge0BsaW5rIF93b3JsZFNwYWNlSW5pdGlhbE1hdHJpeH0uXG4gKiBBIHRlbXBvcmFyeSB2YXJpYWJsZSB3aGljaCBpcyB1c2VkIGluIGB1cGRhdGVgLlxuICovXG5jb25zdCBfd29ybGRTcGFjZUluaXRpYWxNYXRyaXhJbnYgPSBuZXcgVEhSRUUuTWF0cml4NCgpO1xuXG4vKipcbiAqIEEgdGVtcG9yYXJ5IHZhcmlhYmxlIHdoaWNoIGlzIHVzZWQgaW4gYHVwZGF0ZWBcbiAqL1xuY29uc3QgX3dvcmxkU3BhY2VQb3NpdGlvbiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbi8qKlxuICogQSB0ZW1wb3JhcnkgdmFyaWFibGUgd2hpY2ggaXMgdXNlZCBpbiBgdXBkYXRlYFxuICovXG5jb25zdCBfbmV4dFRhaWwgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4vKipcbiAqIEEgY2xhc3MgcmVwcmVzZW50cyBhIHNpbmdsZSBqb2ludCBvZiBhIHNwcmluZyBib25lLlxuICogSXQgc2hvdWxkIGJlIG1hbmFnZWQgYnkgYSB7QGxpbmsgVlJNU3ByaW5nQm9uZU1hbmFnZXJ9LlxuICovXG5leHBvcnQgY2xhc3MgVlJNU3ByaW5nQm9uZUpvaW50IHtcbiAgLyoqXG4gICAqIFNldHRpbmdzIG9mIHRoZSBib25lLlxuICAgKi9cbiAgcHVibGljIHNldHRpbmdzOiBWUk1TcHJpbmdCb25lSm9pbnRTZXR0aW5ncztcblxuICAvKipcbiAgICogTGltaXQgYXR0YWNoZWQgdG8gdGhpcyBib25lLlxuICAgKi9cbiAgcHVibGljIGxpbWl0OiBWUk1TcHJpbmdCb25lTGltaXQgfCBudWxsO1xuXG4gIC8qKlxuICAgKiBDb2xsaWRlciBncm91cHMgYXR0YWNoZWQgdG8gdGhpcyBib25lLlxuICAgKi9cbiAgcHVibGljIGNvbGxpZGVyR3JvdXBzOiBWUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cFtdO1xuXG4gIC8qKlxuICAgKiBBbiBPYmplY3QzRCBhdHRhY2hlZCB0byB0aGlzIGJvbmUuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgYm9uZTogVEhSRUUuT2JqZWN0M0Q7XG5cbiAgLyoqXG4gICAqIEFuIE9iamVjdDNEIHRoYXQgd2lsbCBiZSB1c2VkIGFzIGEgdGFpbCBvZiB0aGlzIHNwcmluZyBib25lLlxuICAgKiBJdCBjYW4gYmUgbnVsbCB3aGVuIHRoZSBzcHJpbmcgYm9uZSBpcyBpbXBvcnRlZCBmcm9tIFZSTSAwLjAuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgY2hpbGQ6IFRIUkVFLk9iamVjdDNEIHwgbnVsbDtcblxuICAvKipcbiAgICogQ3VycmVudCBwb3NpdGlvbiBvZiBjaGlsZCB0YWlsLCBpbiBjZW50ZXIgdW5pdC4gV2lsbCBiZSB1c2VkIGZvciB2ZXJsZXQgaW50ZWdyYXRpb24uXG4gICAqL1xuICBwcml2YXRlIF9jdXJyZW50VGFpbCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbiAgLyoqXG4gICAqIFByZXZpb3VzIHBvc2l0aW9uIG9mIGNoaWxkIHRhaWwsIGluIGNlbnRlciB1bml0LiBXaWxsIGJlIHVzZWQgZm9yIHZlcmxldCBpbnRlZ3JhdGlvbi5cbiAgICovXG4gIHByaXZhdGUgX3ByZXZUYWlsID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuICAvKipcbiAgICogVGhlIGluaXRpYWwgYXhpcyBvZiB0aGUgY2hpbGQgYm9uZSwgaW4gbG9jYWwgdW5pdC5cbiAgICovXG4gIHByaXZhdGUgX2JvbmVBeGlzID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuICAvKipcbiAgICogVGhlIGxlbmd0aCBvZiB0aGUgYm9uZSBpbiB3b3JsZCB1bml0LlxuICAgKiBXaWxsIGJlIHVzZWQgZm9yIG5vcm1hbGl6YXRpb24gaW4gdXBkYXRlIGxvb3AsIHdpbGwgYmUgdXBkYXRlZCBieSB7QGxpbmsgX2NhbGNXb3JsZFNwYWNlQm9uZUxlbmd0aH0uXG4gICAqXG4gICAqIEl0J3Mgc2FtZSBhcyBsb2NhbCB1bml0IGxlbmd0aCB1bmxlc3MgdGhlcmUgYXJlIHNjYWxlIHRyYW5zZm9ybWF0aW9ucyBpbiB0aGUgd29ybGQgc3BhY2UuXG4gICAqL1xuICBwcml2YXRlIF93b3JsZFNwYWNlQm9uZUxlbmd0aCA9IDAuMDtcblxuICAvKipcbiAgICogVGhlIGxlbmd0aCBvZiB0aGUgYm9uZSBpbiB3b3JsZCB1bml0LlxuICAgKlxuICAgKiBJdCdzIHNhbWUgYXMgbG9jYWwgdW5pdCBsZW5ndGggdW5sZXNzIHRoZXJlIGFyZSBzY2FsZSB0cmFuc2Zvcm1hdGlvbnMgaW4gdGhlIHdvcmxkIHNwYWNlLlxuICAgKlxuICAgKiBJbnRlbmRlZCB0byBiZSB1c2VkIGJ5IGhlbHBlcnMuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHdvcmxkU3BhY2VCb25lTGVuZ3RoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3dvcmxkU3BhY2VCb25lTGVuZ3RoO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBvZiBkZXBlbmRlbmNpZXMgdGhhdCBuZWVkIHRvIGJlIHVwZGF0ZWQgYmVmb3JlIHRoaXMgam9pbnQuXG4gICAqL1xuICBwdWJsaWMgZ2V0IGRlcGVuZGVuY2llcygpOiBTZXQ8VEhSRUUuT2JqZWN0M0Q+IHtcbiAgICBjb25zdCBzZXQgPSBuZXcgU2V0PFRIUkVFLk9iamVjdDNEPigpO1xuXG4gICAgY29uc3QgcGFyZW50ID0gdGhpcy5ib25lLnBhcmVudDtcbiAgICBpZiAocGFyZW50KSB7XG4gICAgICBzZXQuYWRkKHBhcmVudCk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgY2cgPSAwOyBjZyA8IHRoaXMuY29sbGlkZXJHcm91cHMubGVuZ3RoOyBjZysrKSB7XG4gICAgICBmb3IgKGxldCBjID0gMDsgYyA8IHRoaXMuY29sbGlkZXJHcm91cHNbY2ddLmNvbGxpZGVycy5sZW5ndGg7IGMrKykge1xuICAgICAgICBzZXQuYWRkKHRoaXMuY29sbGlkZXJHcm91cHNbY2ddLmNvbGxpZGVyc1tjXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNldDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIHNwcmluZ2JvbmUgd2lsbCBiZSBjYWxjdWxhdGVkIGJhc2VkIG9uIHRoZSBzcGFjZSByZWxhdGl2ZSBmcm9tIHRoaXMgb2JqZWN0LlxuICAgKiBJZiB0aGlzIGlzIGBudWxsYCwgc3ByaW5nYm9uZSB3aWxsIGJlIGNhbGN1bGF0ZWQgaW4gd29ybGQgc3BhY2UuXG4gICAqL1xuICBwcml2YXRlIF9jZW50ZXI6IFRIUkVFLk9iamVjdDNEIHwgbnVsbCA9IG51bGw7XG4gIHB1YmxpYyBnZXQgY2VudGVyKCk6IFRIUkVFLk9iamVjdDNEIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX2NlbnRlcjtcbiAgfVxuICBwdWJsaWMgc2V0IGNlbnRlcihjZW50ZXI6IFRIUkVFLk9iamVjdDNEIHwgbnVsbCkge1xuICAgIC8vIHVuaW5zdGFsbCBpbnZlcnNlIGNhY2hlXG4gICAgaWYgKHRoaXMuX2NlbnRlcj8udXNlckRhdGEuaW52ZXJzZUNhY2hlUHJveHkpIHtcbiAgICAgICh0aGlzLl9jZW50ZXIudXNlckRhdGEuaW52ZXJzZUNhY2hlUHJveHkgYXMgTWF0cml4NEludmVyc2VDYWNoZSkucmV2ZXJ0KCk7XG4gICAgICBkZWxldGUgdGhpcy5fY2VudGVyLnVzZXJEYXRhLmludmVyc2VDYWNoZVByb3h5O1xuICAgIH1cblxuICAgIC8vIGNoYW5nZSB0aGUgY2VudGVyXG4gICAgdGhpcy5fY2VudGVyID0gY2VudGVyO1xuXG4gICAgLy8gaW5zdGFsbCBpbnZlcnNlIGNhY2hlXG4gICAgaWYgKHRoaXMuX2NlbnRlcikge1xuICAgICAgaWYgKCF0aGlzLl9jZW50ZXIudXNlckRhdGEuaW52ZXJzZUNhY2hlUHJveHkpIHtcbiAgICAgICAgdGhpcy5fY2VudGVyLnVzZXJEYXRhLmludmVyc2VDYWNoZVByb3h5ID0gbmV3IE1hdHJpeDRJbnZlcnNlQ2FjaGUodGhpcy5fY2VudGVyLm1hdHJpeFdvcmxkKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbCBzdGF0ZSBvZiB0aGUgbG9jYWwgbWF0cml4IG9mIHRoZSBib25lLlxuICAgKi9cbiAgcHJpdmF0ZSBfaW5pdGlhbExvY2FsTWF0cml4ID0gbmV3IFRIUkVFLk1hdHJpeDQoKTtcblxuICAvKipcbiAgICogSW5pdGlhbCBzdGF0ZSBvZiB0aGUgcm90YXRpb24gb2YgdGhlIGJvbmUuXG4gICAqL1xuICBwcml2YXRlIF9pbml0aWFsTG9jYWxSb3RhdGlvbiA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5cbiAgLyoqXG4gICAqIEluaXRpYWwgc3RhdGUgb2YgdGhlIHBvc2l0aW9uIG9mIGl0cyBjaGlsZC5cbiAgICovXG4gIHByaXZhdGUgX2luaXRpYWxMb2NhbENoaWxkUG9zaXRpb24gPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4gIC8qKlxuICAgKiBJbml0aWFsIHN0YXRlIG9mIHRoZSBwb3NpdGlvbiBvZiBpdHMgY2hpbGQuXG4gICAqXG4gICAqIEludGVuZGVkIHRvIGJlIHVzZWQgYnkgaGVscGVycy5cbiAgICovXG4gIHB1YmxpYyBnZXQgaW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbigpOiBUSFJFRS5WZWN0b3IzIHtcbiAgICByZXR1cm4gdGhpcy5faW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB3b3JsZCBtYXRyaXggb2YgaXRzIHBhcmVudCBvYmplY3QuXG4gICAqIE5vdGUgdGhhdCBpdCByZXR1cm5zIGEgcmVmZXJlbmNlIHRvIHRoZSBtYXRyaXguIERvbid0IG11dGF0ZSB0aGlzIGRpcmVjdGx5IVxuICAgKi9cbiAgcHJpdmF0ZSBnZXQgX3BhcmVudE1hdHJpeFdvcmxkKCk6IFRIUkVFLk1hdHJpeDQge1xuICAgIHJldHVybiB0aGlzLmJvbmUucGFyZW50ID8gdGhpcy5ib25lLnBhcmVudC5tYXRyaXhXb3JsZCA6IElERU5USVRZX01BVFJJWDQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IFZSTVNwcmluZ0JvbmUuXG4gICAqXG4gICAqIEBwYXJhbSBib25lIEFuIE9iamVjdDNEIHRoYXQgd2lsbCBiZSBhdHRhY2hlZCB0byB0aGlzIGJvbmVcbiAgICogQHBhcmFtIGNoaWxkIEFuIE9iamVjdDNEIHRoYXQgd2lsbCBiZSB1c2VkIGFzIGEgdGFpbCBvZiB0aGlzIHNwcmluZyBib25lLiBJdCBjYW4gYmUgbnVsbCB3aGVuIHRoZSBzcHJpbmcgYm9uZSBpcyBpbXBvcnRlZCBmcm9tIFZSTSAwLjBcbiAgICogQHBhcmFtIHNldHRpbmdzIFNldmVyYWwgcGFyYW1ldGVycyByZWxhdGVkIHRvIGJlaGF2aW9yIG9mIHRoZSBzcHJpbmcgYm9uZVxuICAgKiBAcGFyYW0gY29sbGlkZXJHcm91cHMgQ29sbGlkZXIgZ3JvdXBzIHRoYXQgd2lsbCBiZSBjb2xsaWRlZCB3aXRoIHRoaXMgc3ByaW5nIGJvbmVcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIGJvbmU6IFRIUkVFLk9iamVjdDNELFxuICAgIGNoaWxkOiBUSFJFRS5PYmplY3QzRCB8IG51bGwsXG4gICAgc2V0dGluZ3M6IFBhcnRpYWw8VlJNU3ByaW5nQm9uZUpvaW50U2V0dGluZ3M+ID0ge30sXG4gICAgY29sbGlkZXJHcm91cHM6IFZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwW10gPSBbXSxcbiAgKSB7XG4gICAgdGhpcy5ib25lID0gYm9uZTsgLy8gdW5pVlJNXHUzMDY3XHUzMDZFIHBhcmVudFxuICAgIHRoaXMuYm9uZS5tYXRyaXhBdXRvVXBkYXRlID0gZmFsc2U7IC8vIHVwZGF0ZVx1MzA2Qlx1MzA4OFx1MzA4QVx1OEEwOFx1N0I5N1x1MzA1NVx1MzA4Q1x1MzA4Qlx1MzA2RVx1MzA2N3RocmVlLmpzXHU1MTg1XHUzMDY3XHUzMDZFXHU4MUVBXHU1MkQ1XHU1MUU2XHU3NDA2XHUzMDZGXHU0RTBEXHU4OTgxXG5cbiAgICB0aGlzLmNoaWxkID0gY2hpbGQ7XG5cbiAgICB0aGlzLnNldHRpbmdzID0ge1xuICAgICAgaGl0UmFkaXVzOiBzZXR0aW5ncy5oaXRSYWRpdXMgPz8gMC4wLFxuICAgICAgc3RpZmZuZXNzOiBzZXR0aW5ncy5zdGlmZm5lc3MgPz8gMS4wLFxuICAgICAgZ3Jhdml0eVBvd2VyOiBzZXR0aW5ncy5ncmF2aXR5UG93ZXIgPz8gMC4wLFxuICAgICAgZ3Jhdml0eURpcjogc2V0dGluZ3MuZ3Jhdml0eURpcj8uY2xvbmUoKSA/PyBuZXcgVEhSRUUuVmVjdG9yMygwLjAsIC0xLjAsIDAuMCksXG4gICAgICBkcmFnRm9yY2U6IHNldHRpbmdzLmRyYWdGb3JjZSA/PyAwLjQsXG4gICAgfTtcblxuICAgIHRoaXMubGltaXQgPSBudWxsO1xuXG4gICAgdGhpcy5jb2xsaWRlckdyb3VwcyA9IGNvbGxpZGVyR3JvdXBzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgaW5pdGlhbCBzdGF0ZSBvZiB0aGlzIHNwcmluZyBib25lLlxuICAgKiBZb3UgbWlnaHQgd2FudCB0byBjYWxsIHtAbGluayBWUk1TcHJpbmdCb25lTWFuYWdlci5zZXRJbml0U3RhdGV9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgc2V0SW5pdFN0YXRlKCk6IHZvaWQge1xuICAgIC8vIHJlbWVtYmVyIGluaXRpYWwgcG9zaXRpb24gb2YgaXRzZWxmXG4gICAgdGhpcy5faW5pdGlhbExvY2FsTWF0cml4LmNvcHkodGhpcy5ib25lLm1hdHJpeCk7XG4gICAgdGhpcy5faW5pdGlhbExvY2FsUm90YXRpb24uY29weSh0aGlzLmJvbmUucXVhdGVybmlvbik7XG5cbiAgICAvLyBzZWUgaW5pdGlhbCBwb3NpdGlvbiBvZiBpdHMgbG9jYWwgY2hpbGRcbiAgICBpZiAodGhpcy5jaGlsZCkge1xuICAgICAgdGhpcy5faW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbi5jb3B5KHRoaXMuY2hpbGQucG9zaXRpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyB2cm0wIHJlcXVpcmVzIGEgN2NtIGZpeGVkIGJvbmUgbGVuZ3RoIGZvciB0aGUgZmluYWwgbm9kZSBpbiBhIGNoYWluXG4gICAgICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS92cm0tYy92cm0tc3BlY2lmaWNhdGlvbi90cmVlL21hc3Rlci9zcGVjaWZpY2F0aW9uL1ZSTUNfc3ByaW5nQm9uZS0xLjAjYWJvdXQtc3ByaW5nLWNvbmZpZ3VyYXRpb25cbiAgICAgIHRoaXMuX2luaXRpYWxMb2NhbENoaWxkUG9zaXRpb24uY29weSh0aGlzLmJvbmUucG9zaXRpb24pLm5vcm1hbGl6ZSgpLm11bHRpcGx5U2NhbGFyKDAuMDcpO1xuICAgIH1cblxuICAgIC8vIGNvcHkgdGhlIGNoaWxkIHBvc2l0aW9uIHRvIHRhaWxzXG4gICAgY29uc3QgbWF0cml4V29ybGRUb0NlbnRlciA9IHRoaXMuX2dldE1hdHJpeFdvcmxkVG9DZW50ZXIoKTtcbiAgICB0aGlzLmJvbmUubG9jYWxUb1dvcmxkKHRoaXMuX2N1cnJlbnRUYWlsLmNvcHkodGhpcy5faW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbikpLmFwcGx5TWF0cml4NChtYXRyaXhXb3JsZFRvQ2VudGVyKTtcbiAgICB0aGlzLl9wcmV2VGFpbC5jb3B5KHRoaXMuX2N1cnJlbnRUYWlsKTtcblxuICAgIC8vIHNldCBpbml0aWFsIHN0YXRlcyB0aGF0IGFyZSByZWxhdGVkIHRvIGxvY2FsIGNoaWxkIHBvc2l0aW9uXG4gICAgdGhpcy5fYm9uZUF4aXMuY29weSh0aGlzLl9pbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uKS5ub3JtYWxpemUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGUgc3RhdGUgb2YgdGhpcyBib25lLlxuICAgKiBZb3UgbWlnaHQgd2FudCB0byBjYWxsIHtAbGluayBWUk1TcHJpbmdCb25lTWFuYWdlci5yZXNldH0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLmJvbmUucXVhdGVybmlvbi5jb3B5KHRoaXMuX2luaXRpYWxMb2NhbFJvdGF0aW9uKTtcblxuICAgIC8vIFdlIG5lZWQgdG8gdXBkYXRlIGl0cyBtYXRyaXhXb3JsZCBtYW51YWxseSwgc2luY2Ugd2UgdHdlYWtlZCB0aGUgYm9uZSBieSBvdXIgaGFuZFxuICAgIHRoaXMuYm9uZS51cGRhdGVNYXRyaXgoKTtcbiAgICB0aGlzLmJvbmUubWF0cml4V29ybGQubXVsdGlwbHlNYXRyaWNlcyh0aGlzLl9wYXJlbnRNYXRyaXhXb3JsZCwgdGhpcy5ib25lLm1hdHJpeCk7XG5cbiAgICAvLyBBcHBseSB1cGRhdGVkIHBvc2l0aW9uIHRvIHRhaWwgc3RhdGVzXG4gICAgY29uc3QgbWF0cml4V29ybGRUb0NlbnRlciA9IHRoaXMuX2dldE1hdHJpeFdvcmxkVG9DZW50ZXIoKTtcbiAgICB0aGlzLmJvbmUubG9jYWxUb1dvcmxkKHRoaXMuX2N1cnJlbnRUYWlsLmNvcHkodGhpcy5faW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbikpLmFwcGx5TWF0cml4NChtYXRyaXhXb3JsZFRvQ2VudGVyKTtcbiAgICB0aGlzLl9wcmV2VGFpbC5jb3B5KHRoaXMuX2N1cnJlbnRUYWlsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIHN0YXRlIG9mIHRoaXMgYm9uZS5cbiAgICogWW91IG1pZ2h0IHdhbnQgdG8gY2FsbCB7QGxpbmsgVlJNU3ByaW5nQm9uZU1hbmFnZXIudXBkYXRlfSBpbnN0ZWFkLlxuICAgKlxuICAgKiBAcGFyYW0gZGVsdGEgZGVsdGFUaW1lXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoZGVsdGEgPD0gMCkgcmV0dXJuO1xuXG4gICAgLy8gVXBkYXRlIHRoZSBfd29ybGRTcGFjZUJvbmVMZW5ndGhcbiAgICB0aGlzLl9jYWxjV29ybGRTcGFjZUJvbmVMZW5ndGgoKTtcblxuICAgIC8vIFNldCB0ZW1wb3JhcnkgdmFyaWFibGVzXG4gICAgX3dvcmxkU3BhY2VJbml0aWFsTWF0cml4LmNvcHkodGhpcy5fcGFyZW50TWF0cml4V29ybGQpLm11bHRpcGx5KHRoaXMuX2luaXRpYWxMb2NhbE1hdHJpeCk7XG4gICAgX3dvcmxkU3BhY2VJbml0aWFsTWF0cml4SW52LmNvcHkoX3dvcmxkU3BhY2VJbml0aWFsTWF0cml4KS5pbnZlcnQoKTtcbiAgICBfd29ybGRTcGFjZVBvc2l0aW9uLnNldEZyb21NYXRyaXhQb3NpdGlvbih0aGlzLmJvbmUubWF0cml4V29ybGQpO1xuXG4gICAgLy8gUHJlY2FsYyB0aGUgcm90YXRpb24gb2YgdGhlIGxpbWl0XG4gICAgaWYgKHRoaXMubGltaXQpIHtcbiAgICAgIC8vIGNhbGN1bGF0ZSAocGFyZW50V29ybGRSb3RhdGlvbiAqIGxvY2FsU3BhY2VJbml0aWFsUm90YXRpb24pXG4gICAgICBpZiAodGhpcy5ib25lLnBhcmVudCkge1xuICAgICAgICBnZXRXb3JsZFF1YXRlcm5pb25MaXRlKHRoaXMuYm9uZS5wYXJlbnQsIF93b3JsZFNwYWNlSW5pdGlhbFJvdGF0aW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF93b3JsZFNwYWNlSW5pdGlhbFJvdGF0aW9uLmlkZW50aXR5KCk7XG4gICAgICB9XG4gICAgICBfd29ybGRTcGFjZUluaXRpYWxSb3RhdGlvbi5tdWx0aXBseSh0aGlzLl9pbml0aWFsTG9jYWxSb3RhdGlvbikubm9ybWFsaXplKCk7XG4gICAgICB0aGlzLmxpbWl0LmludGVybmFsUHJlY2FsY1JvdGF0aW9uKF93b3JsZFNwYWNlSW5pdGlhbFJvdGF0aW9uLCB0aGlzLl9ib25lQXhpcyk7XG4gICAgfVxuXG4gICAgLy8gR2V0IGJvbmVBeGlzIGluIHdvcmxkIHNwYWNlXG4gICAgY29uc3Qgd29ybGRTcGFjZUJvbmVBeGlzID0gX3YzQi5jb3B5KHRoaXMuX2JvbmVBeGlzKS50cmFuc2Zvcm1EaXJlY3Rpb24oX3dvcmxkU3BhY2VJbml0aWFsTWF0cml4KTtcblxuICAgIC8vIHZlcmxldFx1N0E0RFx1NTIwNlx1MzA2N1x1NkIyMVx1MzA2RVx1NEY0RFx1N0Y2RVx1MzA5Mlx1OEEwOFx1N0I5N1xuICAgIF9uZXh0VGFpbFxuICAgICAgLy8gRGV0ZXJtaW5lIGluZXJ0aWEgaW4gY2VudGVyIHNwYWNlXG4gICAgICAuY29weSh0aGlzLl9jdXJyZW50VGFpbClcbiAgICAgIC5hZGQoX3YzQS5zdWJWZWN0b3JzKHRoaXMuX2N1cnJlbnRUYWlsLCB0aGlzLl9wcmV2VGFpbCkubXVsdGlwbHlTY2FsYXIoMSAtIHRoaXMuc2V0dGluZ3MuZHJhZ0ZvcmNlKSkgLy8gXHU1MjREXHUzMEQ1XHUzMEVDXHUzMEZDXHUzMEUwXHUzMDZFXHU3OUZCXHU1MkQ1XHUzMDkyXHU3RDk5XHU3RDlBXHUzMDU5XHUzMDhCKFx1NkUxQlx1ODg3MFx1MzA4Mlx1MzA0Mlx1MzA4Qlx1MzA4OClcbiAgICAgIC8vIENvbnZlcnQgY2VudGVyIHNwYWNlIHRvIHdvcmxkIHNwYWNlXG4gICAgICAuYXBwbHlNYXRyaXg0KHRoaXMuX2dldE1hdHJpeENlbnRlclRvV29ybGQoKSkgLy8gdGFpbFx1MzA5MndvcmxkIHNwYWNlXHUzMDZCXHU2MjNCXHUzMDU5XG4gICAgICAvLyBBcHBseSBzdGlmZm5lc3MgYW5kIGdyYXZpdHkgaW4gd29ybGQgc3BhY2VcbiAgICAgIC5hZGRTY2FsZWRWZWN0b3Iod29ybGRTcGFjZUJvbmVBeGlzLCB0aGlzLnNldHRpbmdzLnN0aWZmbmVzcyAqIGRlbHRhKSAvLyBcdTg5QUFcdTMwNkVcdTU2REVcdThFRTJcdTMwNkJcdTMwODhcdTMwOEJcdTVCNTBcdTMwRENcdTMwRkNcdTMwRjNcdTMwNkVcdTc5RkJcdTUyRDVcdTc2RUVcdTZBMTlcbiAgICAgIC5hZGRTY2FsZWRWZWN0b3IodGhpcy5zZXR0aW5ncy5ncmF2aXR5RGlyLCB0aGlzLnNldHRpbmdzLmdyYXZpdHlQb3dlciAqIGRlbHRhKTsgLy8gXHU1OTE2XHU1MjlCXHUzMDZCXHUzMDg4XHUzMDhCXHU3OUZCXHU1MkQ1XHU5MUNGXG5cbiAgICAvLyBBcHBseSBsaW1pdCAtIDFzdCB0aW1lXG4gICAgX25leHRUYWlsLnN1Yihfd29ybGRTcGFjZVBvc2l0aW9uKS5ub3JtYWxpemUoKTtcbiAgICB0aGlzLmxpbWl0Py5jYWxjdWxhdGVMaW1pdChfbmV4dFRhaWwpO1xuICAgIF9uZXh0VGFpbC5tdWx0aXBseVNjYWxhcih0aGlzLl93b3JsZFNwYWNlQm9uZUxlbmd0aCkuYWRkKF93b3JsZFNwYWNlUG9zaXRpb24pO1xuXG4gICAgLy8gQ2FsY3VsYXRlIGNvbGxpc2lvbnNcbiAgICB0aGlzLl9jb2xsaXNpb24oX25leHRUYWlsKTtcblxuICAgIC8vIHVwZGF0ZSBwcmV2VGFpbCBhbmQgY3VycmVudFRhaWxcbiAgICB0aGlzLl9wcmV2VGFpbC5jb3B5KHRoaXMuX2N1cnJlbnRUYWlsKTtcbiAgICB0aGlzLl9jdXJyZW50VGFpbC5jb3B5KF9uZXh0VGFpbCkuYXBwbHlNYXRyaXg0KHRoaXMuX2dldE1hdHJpeFdvcmxkVG9DZW50ZXIoKSk7XG5cbiAgICAvLyBBcHBseSByb3RhdGlvbiwgY29udmVydCB2ZWN0b3IzIHRoaW5nIGludG8gYWN0dWFsIHF1YXRlcm5pb25cbiAgICAvLyBPcmlnaW5hbCBVbmlWUk0gaXMgZG9pbmcgY2VudGVyIHVuaXQgY2FsY3VsdXMgYXQgaGVyZSBidXQgd2UncmUgZ29ubmEgZG8gdGhpcyBvbiBsb2NhbCB1bml0XG4gICAgdGhpcy5ib25lLnF1YXRlcm5pb25cbiAgICAgIC5zZXRGcm9tVW5pdFZlY3RvcnModGhpcy5fYm9uZUF4aXMsIF92M0EuY29weShfbmV4dFRhaWwpLmFwcGx5TWF0cml4NChfd29ybGRTcGFjZUluaXRpYWxNYXRyaXhJbnYpLm5vcm1hbGl6ZSgpKVxuICAgICAgLnByZW11bHRpcGx5KHRoaXMuX2luaXRpYWxMb2NhbFJvdGF0aW9uKTtcblxuICAgIC8vIFdlIG5lZWQgdG8gdXBkYXRlIGl0cyBtYXRyaXhXb3JsZCBtYW51YWxseSwgc2luY2Ugd2UgdHdlYWtlZCB0aGUgYm9uZSBieSBvdXIgaGFuZFxuICAgIHRoaXMuYm9uZS51cGRhdGVNYXRyaXgoKTtcbiAgICB0aGlzLmJvbmUubWF0cml4V29ybGQubXVsdGlwbHlNYXRyaWNlcyh0aGlzLl9wYXJlbnRNYXRyaXhXb3JsZCwgdGhpcy5ib25lLm1hdHJpeCk7XG4gIH1cblxuICAvKipcbiAgICogRG8gY29sbGlzaW9uIG1hdGggYWdhaW5zdCBldmVyeSBjb2xsaWRlcnMgYXR0YWNoZWQgdG8gdGhpcyBib25lLlxuICAgKlxuICAgKiBAcGFyYW0gdGFpbCBUaGUgdGFpbCB5b3Ugd2FudCB0byBwcm9jZXNzXG4gICAqL1xuICBwcml2YXRlIF9jb2xsaXNpb24odGFpbDogVEhSRUUuVmVjdG9yMyk6IHZvaWQge1xuICAgIGZvciAobGV0IGNnID0gMDsgY2cgPCB0aGlzLmNvbGxpZGVyR3JvdXBzLmxlbmd0aDsgY2crKykge1xuICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCB0aGlzLmNvbGxpZGVyR3JvdXBzW2NnXS5jb2xsaWRlcnMubGVuZ3RoOyBjKyspIHtcbiAgICAgICAgY29uc3QgY29sbGlkZXIgPSB0aGlzLmNvbGxpZGVyR3JvdXBzW2NnXS5jb2xsaWRlcnNbY107XG4gICAgICAgIGNvbnN0IGRpc3QgPSBjb2xsaWRlci5zaGFwZS5jYWxjdWxhdGVDb2xsaXNpb24oY29sbGlkZXIuY29sbGlkZXJNYXRyaXgsIHRhaWwsIHRoaXMuc2V0dGluZ3MuaGl0UmFkaXVzLCBfdjNBKTtcblxuICAgICAgICBpZiAoZGlzdCA8IDAuMCkge1xuICAgICAgICAgIC8vIGhpdFxuICAgICAgICAgIHRhaWwuYWRkU2NhbGVkVmVjdG9yKF92M0EsIC1kaXN0KTtcblxuICAgICAgICAgIC8vIEFwcGx5IGxpbWl0XG4gICAgICAgICAgdGFpbC5zdWIoX3dvcmxkU3BhY2VQb3NpdGlvbikubm9ybWFsaXplKCk7XG4gICAgICAgICAgdGhpcy5saW1pdD8uY2FsY3VsYXRlTGltaXQodGFpbCk7XG4gICAgICAgICAgdGFpbC5tdWx0aXBseVNjYWxhcih0aGlzLl93b3JsZFNwYWNlQm9uZUxlbmd0aCkuYWRkKF93b3JsZFNwYWNlUG9zaXRpb24pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSB0aGUge0BsaW5rIF93b3JsZFNwYWNlQm9uZUxlbmd0aH0uXG4gICAqIEludGVuZGVkIHRvIGJlIHVzZWQgaW4ge0BsaW5rIHVwZGF0ZX0uXG4gICAqL1xuICBwcml2YXRlIF9jYWxjV29ybGRTcGFjZUJvbmVMZW5ndGgoKTogdm9pZCB7XG4gICAgX3YzQS5zZXRGcm9tTWF0cml4UG9zaXRpb24odGhpcy5ib25lLm1hdHJpeFdvcmxkKTsgLy8gZ2V0IHdvcmxkIHBvc2l0aW9uIG9mIHRoaXMuYm9uZVxuXG4gICAgaWYgKHRoaXMuY2hpbGQpIHtcbiAgICAgIF92M0Iuc2V0RnJvbU1hdHJpeFBvc2l0aW9uKHRoaXMuY2hpbGQubWF0cml4V29ybGQpOyAvLyBnZXQgd29ybGQgcG9zaXRpb24gb2YgdGhpcy5jaGlsZFxuICAgIH0gZWxzZSB7XG4gICAgICBfdjNCLmNvcHkodGhpcy5faW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbik7XG4gICAgICBfdjNCLmFwcGx5TWF0cml4NCh0aGlzLmJvbmUubWF0cml4V29ybGQpO1xuICAgIH1cblxuICAgIHRoaXMuX3dvcmxkU3BhY2VCb25lTGVuZ3RoID0gX3YzQS5zdWIoX3YzQikubGVuZ3RoKCk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbWF0cml4IHRoYXQgY29udmVydHMgY2VudGVyIHNwYWNlIGludG8gd29ybGQgc3BhY2UuXG4gICAqL1xuICBwcml2YXRlIF9nZXRNYXRyaXhDZW50ZXJUb1dvcmxkKCk6IFRIUkVFLk1hdHJpeDQge1xuICAgIHJldHVybiB0aGlzLl9jZW50ZXIgPyB0aGlzLl9jZW50ZXIubWF0cml4V29ybGQgOiBJREVOVElUWV9NQVRSSVg0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG1hdHJpeCB0aGF0IGNvbnZlcnRzIHdvcmxkIHNwYWNlIGludG8gY2VudGVyIHNwYWNlLlxuICAgKi9cbiAgcHJpdmF0ZSBfZ2V0TWF0cml4V29ybGRUb0NlbnRlcigpOiBUSFJFRS5NYXRyaXg0IHtcbiAgICByZXR1cm4gdGhpcy5fY2VudGVyID8gKHRoaXMuX2NlbnRlci51c2VyRGF0YS5pbnZlcnNlQ2FjaGVQcm94eSBhcyBNYXRyaXg0SW52ZXJzZUNhY2hlKS5pbnZlcnNlIDogSURFTlRJVFlfTUFUUklYNDtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IG1hdDRJbnZlcnRDb21wYXQgfSBmcm9tICcuL21hdDRJbnZlcnRDb21wYXQnO1xuXG5leHBvcnQgY2xhc3MgTWF0cml4NEludmVyc2VDYWNoZSB7XG4gIC8qKlxuICAgKiBUaGUgdGFyZ2V0IG1hdHJpeC5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBtYXRyaXg6IFRIUkVFLk1hdHJpeDQ7XG5cbiAgLyoqXG4gICAqIEEgY2FjaGUgb2YgaW52ZXJzZSBvZiBjdXJyZW50IG1hdHJpeC5cbiAgICovXG4gIHByaXZhdGUgcmVhZG9ubHkgX2ludmVyc2VDYWNoZSA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG5cbiAgLyoqXG4gICAqIEEgZmxhZyB0aGF0IG1ha2VzIGl0IHdhbnQgdG8gcmVjYWxjdWxhdGUgaXRzIHtAbGluayBfaW52ZXJzZUNhY2hlfS5cbiAgICogV2lsbCBiZSBzZXQgYHRydWVgIHdoZW4gYGVsZW1lbnRzYCBhcmUgbXV0YXRlZCBhbmQgYmUgdXNlZCBpbiBgZ2V0SW52ZXJzZWAuXG4gICAqL1xuICBwcml2YXRlIF9zaG91bGRVcGRhdGVJbnZlcnNlID0gdHJ1ZTtcblxuICAvKipcbiAgICogVGhlIG9yaWdpbmFsIG9mIGBtYXRyaXguZWxlbWVudHNgXG4gICAqL1xuICBwcml2YXRlIHJlYWRvbmx5IF9vcmlnaW5hbEVsZW1lbnRzOiBUSFJFRS5NYXRyaXg0VHVwbGU7XG5cbiAgLyoqXG4gICAqIEludmVyc2Ugb2YgZ2l2ZW4gbWF0cml4LlxuICAgKiBOb3RlIHRoYXQgaXQgd2lsbCByZXR1cm4gaXRzIGludGVybmFsIHByaXZhdGUgaW5zdGFuY2UuXG4gICAqIE1ha2Ugc3VyZSBjb3B5aW5nIHRoaXMgYmVmb3JlIG11dGF0ZSB0aGlzLlxuICAgKi9cbiAgcHVibGljIGdldCBpbnZlcnNlKCk6IFRIUkVFLk1hdHJpeDQge1xuICAgIGlmICh0aGlzLl9zaG91bGRVcGRhdGVJbnZlcnNlKSB7XG4gICAgICBtYXQ0SW52ZXJ0Q29tcGF0KHRoaXMuX2ludmVyc2VDYWNoZS5jb3B5KHRoaXMubWF0cml4KSk7XG4gICAgICB0aGlzLl9zaG91bGRVcGRhdGVJbnZlcnNlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX2ludmVyc2VDYWNoZTtcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihtYXRyaXg6IFRIUkVFLk1hdHJpeDQpIHtcbiAgICB0aGlzLm1hdHJpeCA9IG1hdHJpeDtcblxuICAgIGNvbnN0IGhhbmRsZXI6IFByb3h5SGFuZGxlcjxudW1iZXJbXT4gPSB7XG4gICAgICBzZXQ6IChvYmosIHByb3A6IGFueSwgbmV3VmFsKSA9PiB7XG4gICAgICAgIHRoaXMuX3Nob3VsZFVwZGF0ZUludmVyc2UgPSB0cnVlO1xuICAgICAgICBvYmpbcHJvcF0gPSBuZXdWYWw7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9LFxuICAgIH07XG5cbiAgICB0aGlzLl9vcmlnaW5hbEVsZW1lbnRzID0gbWF0cml4LmVsZW1lbnRzO1xuICAgIG1hdHJpeC5lbGVtZW50cyA9IG5ldyBQcm94eTxUSFJFRS5NYXRyaXg0VHVwbGU+KG1hdHJpeC5lbGVtZW50cywgaGFuZGxlcik7XG4gIH1cblxuICBwdWJsaWMgcmV2ZXJ0KCk6IHZvaWQge1xuICAgIHRoaXMubWF0cml4LmVsZW1lbnRzID0gdGhpcy5fb3JpZ2luYWxFbGVtZW50cztcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuY29uc3QgX21hdEEgPSBuZXcgVEhSRUUuTWF0cml4NCgpO1xuXG4vKipcbiAqIEEgY29tcGF0IGZ1bmN0aW9uIGZvciBgTWF0cml4NC5pbnZlcnQoKWAgLyBgTWF0cml4NC5nZXRJbnZlcnNlKClgLlxuICogYE1hdHJpeDQuaW52ZXJ0KClgIGlzIGludHJvZHVjZWQgaW4gcjEyMyBhbmQgYE1hdHJpeDQuZ2V0SW52ZXJzZSgpYCBlbWl0cyBhIHdhcm5pbmcuXG4gKiBXZSBhcmUgZ29pbmcgdG8gdXNlIHRoaXMgY29tcGF0IGZvciBhIHdoaWxlLlxuICogQHBhcmFtIHRhcmdldCBBIHRhcmdldCBtYXRyaXhcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hdDRJbnZlcnRDb21wYXQ8VCBleHRlbmRzIFRIUkVFLk1hdHJpeDQ+KHRhcmdldDogVCk6IFQge1xuICBpZiAoKHRhcmdldCBhcyBhbnkpLmludmVydCkge1xuICAgIHRhcmdldC5pbnZlcnQoKTtcbiAgfSBlbHNlIHtcbiAgICAodGFyZ2V0IGFzIGFueSkuZ2V0SW52ZXJzZShfbWF0QS5jb3B5KHRhcmdldCkpO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbmNvbnN0IF9wb3NpdGlvbiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfc2NhbGUgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4vKipcbiAqIEEgcmVwbGFjZW1lbnQgb2YgYE9iamVjdDNELmdldFdvcmxkUXVhdGVybmlvbmAuXG4gKiBFeHRyYWN0IHRoZSB3b3JsZCBxdWF0ZXJuaW9uIG9mIGFuIG9iamVjdCBmcm9tIGl0cyB3b3JsZCBzcGFjZSBtYXRyaXgsIHdpdGhvdXQgY2FsbGluZyBgT2JqZWN0M0QudXBkYXRlV29ybGRNYXRyaXhgLlxuICogVXNlIHRoaXMgd2hlbiB5b3UncmUgc3VyZSB0aGF0IHRoZSB3b3JsZCBtYXRyaXggaXMgdXAtdG8tZGF0ZS5cbiAqXG4gKiBAcGFyYW0gb2JqZWN0IFRoZSBvYmplY3RcbiAqIEBwYXJhbSBvdXQgQSB0YXJnZXQgcXVhdGVybmlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0V29ybGRRdWF0ZXJuaW9uTGl0ZShvYmplY3Q6IFRIUkVFLk9iamVjdDNELCBvdXQ6IFRIUkVFLlF1YXRlcm5pb24pOiBUSFJFRS5RdWF0ZXJuaW9uIHtcbiAgb2JqZWN0Lm1hdHJpeFdvcmxkLmRlY29tcG9zZShfcG9zaXRpb24sIG91dCwgX3NjYWxlKTtcbiAgcmV0dXJuIG91dDtcbn1cbiIsICJpbXBvcnQgdHlwZSAqIGFzIFYwVlJNIGZyb20gJ0BwaXhpdi90eXBlcy12cm0tMC4wJztcbmltcG9ydCB0eXBlICogYXMgVjFTcHJpbmdCb25lU2NoZW1hIGZyb20gJ0BwaXhpdi90eXBlcy12cm1jLXNwcmluZ2JvbmUtMS4wJztcbmltcG9ydCB0eXBlICogYXMgU3ByaW5nQm9uZUV4dGVuZGVkQ29sbGlkZXJTY2hlbWEgZnJvbSAnQHBpeGl2L3R5cGVzLXZybWMtc3ByaW5nYm9uZS1leHRlbmRlZC1jb2xsaWRlci0xLjAnO1xuaW1wb3J0IHR5cGUgKiBhcyBTcHJpbmdCb25lTGltaXRTY2hlbWEgZnJvbSAnQHBpeGl2L3R5cGVzLXZybWMtc3ByaW5nYm9uZS1saW1pdC0xLjAnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHR5cGUgeyBHTFRGLCBHTFRGTG9hZGVyUGx1Z2luLCBHTFRGUGFyc2VyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlci5qcyc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXJIZWxwZXIsIFZSTVNwcmluZ0JvbmVKb2ludEhlbHBlciB9IGZyb20gJy4vaGVscGVycyc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXIgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVDb2xsaWRlcic7XG5pbXBvcnQgdHlwZSB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cCc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZUNhcHN1bGUgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlQ2Fwc3VsZSc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZVNwaGVyZSB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVTcGhlcmUnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUpvaW50IH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lSm9pbnQnO1xuaW1wb3J0IHR5cGUgeyBWUk1TcHJpbmdCb25lTG9hZGVyUGx1Z2luT3B0aW9ucyB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUxvYWRlclBsdWdpbk9wdGlvbnMnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZU1hbmFnZXIgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVNYW5hZ2VyJztcbmltcG9ydCB0eXBlIHsgVlJNU3ByaW5nQm9uZUpvaW50U2V0dGluZ3MgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVKb2ludFNldHRpbmdzJztcbmltcG9ydCB7IEdMVEYgYXMgR0xURlNjaGVtYSB9IGZyb20gJ0BnbHRmLXRyYW5zZm9ybS9jb3JlJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlUGxhbmUgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlUGxhbmUnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUxpbWl0IH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lTGltaXQnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUxpbWl0Q29uZSB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUxpbWl0Q29uZSc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lTGltaXRIZWxwZXIgfSBmcm9tICcuL2hlbHBlcnMvVlJNU3ByaW5nQm9uZUxpbWl0SGVscGVyJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVMaW1pdEhpbmdlIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lTGltaXRIaW5nZSc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lTGltaXRTcGhlcmljYWwgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVMaW1pdFNwaGVyaWNhbCc7XG5cbmNvbnN0IEVYVEVOU0lPTl9OQU1FX0VYVEVOREVEX0NPTExJREVSID0gJ1ZSTUNfc3ByaW5nQm9uZV9leHRlbmRlZF9jb2xsaWRlcic7XG5jb25zdCBFWFRFTlNJT05fTkFNRV9MSU1JVCA9ICdWUk1DX3NwcmluZ0JvbmVfbGltaXQnO1xuXG4vKipcbiAqIFBvc3NpYmxlIHNwZWMgdmVyc2lvbnMgaXQgcmVjb2duaXplcy5cbiAqL1xuY29uc3QgUE9TU0lCTEVfU1BFQ19WRVJTSU9OUyA9IG5ldyBTZXQoWycxLjAnLCAnMS4wLWJldGEnXSk7XG5cbi8qKlxuICogUG9zc2libGUgc3BlYyB2ZXJzaW9ucyBvZiBgVlJNQ19zcHJpbmdCb25lX2V4dGVuZGVkX2NvbGxpZGVyYCBpdCByZWNvZ25pemVzLlxuICovXG5jb25zdCBQT1NTSUJMRV9TUEVDX1ZFUlNJT05TX0VYVEVOREVEX0NPTExJREVSUyA9IG5ldyBTZXQoWycxLjAnXSk7XG5cbi8qKlxuICogUG9zc2libGUgc3BlYyB2ZXJzaW9ucyBvZiBgVlJNQ19zcHJpbmdCb25lX2xpbWl0YCBpdCByZWNvZ25pemVzLlxuICovXG5jb25zdCBQT1NTSUJMRV9TUEVDX1ZFUlNJT05TX0xJTUlUID0gbmV3IFNldChbJzEuMCcsICcxLjAtZHJhZnQnXSk7XG5cbmV4cG9ydCBjbGFzcyBWUk1TcHJpbmdCb25lTG9hZGVyUGx1Z2luIGltcGxlbWVudHMgR0xURkxvYWRlclBsdWdpbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgRVhURU5TSU9OX05BTUUgPSAnVlJNQ19zcHJpbmdCb25lJztcblxuICAvKipcbiAgICogU3BlY2lmeSBhbiBPYmplY3QzRCB0byBhZGQge0BsaW5rIFZSTVNwcmluZ0JvbmVKb2ludEhlbHBlcn0gcy5cbiAgICogSWYgbm90IHNwZWNpZmllZCwgaGVscGVyIHdpbGwgbm90IGJlIGNyZWF0ZWQuXG4gICAqIElmIGByZW5kZXJPcmRlcmAgaXMgc2V0IHRvIHRoZSByb290LCBoZWxwZXJzIHdpbGwgY29weSB0aGUgc2FtZSBgcmVuZGVyT3JkZXJgIC5cbiAgICovXG4gIHB1YmxpYyBqb2ludEhlbHBlclJvb3Q/OiBUSFJFRS5PYmplY3QzRDtcblxuICAvKipcbiAgICogU3BlY2lmeSBhbiBPYmplY3QzRCB0byBhZGQge0BsaW5rIFZSTVNwcmluZ0JvbmVDb2xsaWRlckhlbHBlcn0gcy5cbiAgICogSWYgbm90IHNwZWNpZmllZCwgaGVscGVyIHdpbGwgbm90IGJlIGNyZWF0ZWQuXG4gICAqIElmIGByZW5kZXJPcmRlcmAgaXMgc2V0IHRvIHRoZSByb290LCBoZWxwZXJzIHdpbGwgY29weSB0aGUgc2FtZSBgcmVuZGVyT3JkZXJgIC5cbiAgICovXG4gIHB1YmxpYyBjb2xsaWRlckhlbHBlclJvb3Q/OiBUSFJFRS5PYmplY3QzRDtcblxuICAvKipcbiAgICogU3BlY2lmeSBhbiBPYmplY3QzRCB0byBhZGQge0BsaW5rIFZSTVNwcmluZ0JvbmVMaW1pdEhlbHBlcn0gcy5cbiAgICogSWYgbm90IHNwZWNpZmllZCwgaGVscGVyIHdpbGwgbm90IGJlIGNyZWF0ZWQuXG4gICAqIElmIGByZW5kZXJPcmRlcmAgaXMgc2V0IHRvIHRoZSByb290LCBoZWxwZXJzIHdpbGwgY29weSB0aGUgc2FtZSBgcmVuZGVyT3JkZXJgIC5cbiAgICovXG4gIHB1YmxpYyBsaW1pdEhlbHBlclJvb3Q/OiBUSFJFRS5PYmplY3QzRDtcblxuICAvKipcbiAgICogSWYgdHJ1ZSwgbG9hZCBjb2xsaWRlcnMgZGVmaW5lZCBpbiBgVlJNQ19zcHJpbmdCb25lX2V4dGVuZGVkX2NvbGxpZGVyYC5cbiAgICogU2V0IHRvIGBmYWxzZWAgdG8gZGlzYWJsZSBsb2FkaW5nIGV4dGVuZGVkIGNvbGxpZGVycyBhbmQgdXNlIHRoZSBmYWxsYmFjayBiZWhhdmlvci5cbiAgICogYHRydWVgIGJ5IGRlZmF1bHQuXG4gICAqL1xuICBwdWJsaWMgdXNlRXh0ZW5kZWRDb2xsaWRlcnM6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIElmIHRydWUsIGxvYWQgbGltaXRzIGRlZmluZWQgaW4gYFZSTUNfc3ByaW5nQm9uZV9saW1pdGAuXG4gICAqIFNldCB0byBgZmFsc2VgIHRvIGRpc2FibGUgbG9hZGluZyBsaW1pdHMgYW5kIHVzZSB0aGUgZmFsbGJhY2sgYmVoYXZpb3IuXG4gICAqIGB0cnVlYCBieSBkZWZhdWx0LlxuICAgKi9cbiAgcHVibGljIHVzZUxpbWl0czogYm9vbGVhbjtcblxuICBwdWJsaWMgcmVhZG9ubHkgcGFyc2VyOiBHTFRGUGFyc2VyO1xuXG4gIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBWUk1TcHJpbmdCb25lTG9hZGVyUGx1Z2luLkVYVEVOU0lPTl9OQU1FO1xuICB9XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBhcnNlcjogR0xURlBhcnNlciwgb3B0aW9ucz86IFZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW5PcHRpb25zKSB7XG4gICAgdGhpcy5wYXJzZXIgPSBwYXJzZXI7XG5cbiAgICB0aGlzLmpvaW50SGVscGVyUm9vdCA9IG9wdGlvbnM/LmpvaW50SGVscGVyUm9vdDtcbiAgICB0aGlzLmNvbGxpZGVySGVscGVyUm9vdCA9IG9wdGlvbnM/LmNvbGxpZGVySGVscGVyUm9vdDtcbiAgICB0aGlzLmxpbWl0SGVscGVyUm9vdCA9IG9wdGlvbnM/LmxpbWl0SGVscGVyUm9vdDtcbiAgICB0aGlzLnVzZUV4dGVuZGVkQ29sbGlkZXJzID0gb3B0aW9ucz8udXNlRXh0ZW5kZWRDb2xsaWRlcnMgPz8gdHJ1ZTtcbiAgICB0aGlzLnVzZUxpbWl0cyA9IG9wdGlvbnM/LnVzZUxpbWl0cyA/PyB0cnVlO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGFmdGVyUm9vdChnbHRmOiBHTFRGKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgZ2x0Zi51c2VyRGF0YS52cm1TcHJpbmdCb25lTWFuYWdlciA9IGF3YWl0IHRoaXMuX2ltcG9ydChnbHRmKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbXBvcnQgc3ByaW5nIGJvbmVzIGZyb20gYSBHTFRGIGFuZCByZXR1cm4gYSB7QGxpbmsgVlJNU3ByaW5nQm9uZU1hbmFnZXJ9LlxuICAgKiBJdCBtaWdodCByZXR1cm4gYG51bGxgIGluc3RlYWQgd2hlbiBpdCBkb2VzIG5vdCBuZWVkIHRvIGJlIGNyZWF0ZWQgb3Igc29tZXRoaW5nIGdvIHdyb25nLlxuICAgKlxuICAgKiBAcGFyYW0gZ2x0ZiBBIHBhcnNlZCByZXN1bHQgb2YgR0xURiB0YWtlbiBmcm9tIEdMVEZMb2FkZXJcbiAgICovXG4gIHByaXZhdGUgYXN5bmMgX2ltcG9ydChnbHRmOiBHTFRGKTogUHJvbWlzZTxWUk1TcHJpbmdCb25lTWFuYWdlciB8IG51bGw+IHtcbiAgICBjb25zdCB2MVJlc3VsdCA9IGF3YWl0IHRoaXMuX3YxSW1wb3J0KGdsdGYpO1xuICAgIGlmICh2MVJlc3VsdCAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gdjFSZXN1bHQ7XG4gICAgfVxuXG4gICAgY29uc3QgdjBSZXN1bHQgPSBhd2FpdCB0aGlzLl92MEltcG9ydChnbHRmKTtcbiAgICBpZiAodjBSZXN1bHQgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHYwUmVzdWx0O1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfdjFJbXBvcnQoZ2x0ZjogR0xURik6IFByb21pc2U8VlJNU3ByaW5nQm9uZU1hbmFnZXIgfCBudWxsPiB7XG4gICAgY29uc3QganNvbiA9IGdsdGYucGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAgIC8vIGVhcmx5IGFib3J0IGlmIGl0IGRvZXNuJ3QgdXNlIHNwcmluZyBib25lc1xuICAgIGNvbnN0IGlzU3ByaW5nQm9uZVVzZWQgPSBqc29uLmV4dGVuc2lvbnNVc2VkPy5pbmRleE9mKFZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW4uRVhURU5TSU9OX05BTUUpICE9PSAtMTtcbiAgICBpZiAoIWlzU3ByaW5nQm9uZVVzZWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IG1hbmFnZXIgPSBuZXcgVlJNU3ByaW5nQm9uZU1hbmFnZXIoKTtcblxuICAgIGNvbnN0IHRocmVlTm9kZXM6IFRIUkVFLk9iamVjdDNEW10gPSBhd2FpdCBnbHRmLnBhcnNlci5nZXREZXBlbmRlbmNpZXMoJ25vZGUnKTtcblxuICAgIGNvbnN0IGV4dGVuc2lvbiA9IGpzb24uZXh0ZW5zaW9ucz8uW1ZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW4uRVhURU5TSU9OX05BTUVdIGFzXG4gICAgICBWMVNwcmluZ0JvbmVTY2hlbWEuVlJNQ1NwcmluZ0JvbmUgfCB1bmRlZmluZWQ7XG4gICAgaWYgKCFleHRlbnNpb24pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNwZWNWZXJzaW9uID0gZXh0ZW5zaW9uLnNwZWNWZXJzaW9uO1xuICAgIGlmICghUE9TU0lCTEVfU1BFQ19WRVJTSU9OUy5oYXMoc3BlY1ZlcnNpb24pKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIGBWUk1TcHJpbmdCb25lTG9hZGVyUGx1Z2luOiBVbmtub3duICR7VlJNU3ByaW5nQm9uZUxvYWRlclBsdWdpbi5FWFRFTlNJT05fTkFNRX0gc3BlY1ZlcnNpb24gXCIke3NwZWNWZXJzaW9ufVwiYCxcbiAgICAgICk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBjb2xsaWRlcnMgPSBleHRlbnNpb24uY29sbGlkZXJzPy5tYXAoKHNjaGVtYUNvbGxpZGVyLCBpQ29sbGlkZXIpID0+IHtcbiAgICAgIGNvbnN0IG5vZGUgPSB0aHJlZU5vZGVzW3NjaGVtYUNvbGxpZGVyLm5vZGUhXTtcblxuICAgICAgLy8gU29tZSBtb2RlbHMgcHV0IGAtMWAgdG8gdGhlIG5vZGUgaW5kZXggb2YgY29sbGlkZXJzXG4gICAgICBpZiAobm9kZSA9PSBudWxsKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICBgVlJNU3ByaW5nQm9uZUxvYWRlclBsdWdpbjogVGhlIGNvbGxpZGVyICMke2lDb2xsaWRlcn0gYXR0ZW1wdGVkIHRvIHJlZmVyZW5jZSBhIG5vZGUgIyR7c2NoZW1hQ29sbGlkZXIubm9kZX0gYnV0IG5vdCBmb3VuZC4gU2tpcHBpbmcgdGhlIGNvbGxpZGVyYCxcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNjaGVtYVNoYXBlID0gc2NoZW1hQ29sbGlkZXIuc2hhcGUhO1xuXG4gICAgICAvLyBUT0RPOiBzZXBhcmF0ZSBpbnRvIHNldmVyYWwgZnVuY3Rpb25zXG5cbiAgICAgIGNvbnN0IHNjaGVtYUV4Q29sbGlkZXI6IFNwcmluZ0JvbmVFeHRlbmRlZENvbGxpZGVyU2NoZW1hLlZSTUNTcHJpbmdCb25lRXh0ZW5kZWRDb2xsaWRlciB8IHVuZGVmaW5lZCA9XG4gICAgICAgIHNjaGVtYUNvbGxpZGVyLmV4dGVuc2lvbnM/LltFWFRFTlNJT05fTkFNRV9FWFRFTkRFRF9DT0xMSURFUl07XG5cbiAgICAgIGlmICh0aGlzLnVzZUV4dGVuZGVkQ29sbGlkZXJzICYmIHNjaGVtYUV4Q29sbGlkZXIgIT0gbnVsbCkge1xuICAgICAgICBjb25zdCBzcGVjVmVyc2lvbkV4Q29sbGlkZXIgPSBzY2hlbWFFeENvbGxpZGVyLnNwZWNWZXJzaW9uO1xuICAgICAgICBpZiAoIVBPU1NJQkxFX1NQRUNfVkVSU0lPTlNfRVhURU5ERURfQ09MTElERVJTLmhhcyhzcGVjVmVyc2lvbkV4Q29sbGlkZXIpKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgYFZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW46IFVua25vd24gJHtFWFRFTlNJT05fTkFNRV9FWFRFTkRFRF9DT0xMSURFUn0gc3BlY1ZlcnNpb24gXCIke3NwZWNWZXJzaW9uRXhDb2xsaWRlcn1cIi4gRmFsbGJhY2tpbmcgdG8gdGhlICR7VlJNU3ByaW5nQm9uZUxvYWRlclBsdWdpbi5FWFRFTlNJT05fTkFNRX0gZGVmaW5pdGlvbmAsXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBzY2hlbWFFeFNoYXBlID0gc2NoZW1hRXhDb2xsaWRlci5zaGFwZSE7XG4gICAgICAgICAgaWYgKHNjaGVtYUV4U2hhcGUuc3BoZXJlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faW1wb3J0U3BoZXJlQ29sbGlkZXIobm9kZSwge1xuICAgICAgICAgICAgICBvZmZzZXQ6IG5ldyBUSFJFRS5WZWN0b3IzKCkuZnJvbUFycmF5KHNjaGVtYUV4U2hhcGUuc3BoZXJlLm9mZnNldCA/PyBbMC4wLCAwLjAsIDAuMF0pLFxuICAgICAgICAgICAgICByYWRpdXM6IHNjaGVtYUV4U2hhcGUuc3BoZXJlLnJhZGl1cyA/PyAwLjAsXG4gICAgICAgICAgICAgIGluc2lkZTogc2NoZW1hRXhTaGFwZS5zcGhlcmUuaW5zaWRlID8/IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChzY2hlbWFFeFNoYXBlLmNhcHN1bGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pbXBvcnRDYXBzdWxlQ29sbGlkZXIobm9kZSwge1xuICAgICAgICAgICAgICBvZmZzZXQ6IG5ldyBUSFJFRS5WZWN0b3IzKCkuZnJvbUFycmF5KHNjaGVtYUV4U2hhcGUuY2Fwc3VsZS5vZmZzZXQgPz8gWzAuMCwgMC4wLCAwLjBdKSxcbiAgICAgICAgICAgICAgcmFkaXVzOiBzY2hlbWFFeFNoYXBlLmNhcHN1bGUucmFkaXVzID8/IDAuMCxcbiAgICAgICAgICAgICAgdGFpbDogbmV3IFRIUkVFLlZlY3RvcjMoKS5mcm9tQXJyYXkoc2NoZW1hRXhTaGFwZS5jYXBzdWxlLnRhaWwgPz8gWzAuMCwgMC4wLCAwLjBdKSxcbiAgICAgICAgICAgICAgaW5zaWRlOiBzY2hlbWFFeFNoYXBlLmNhcHN1bGUuaW5zaWRlID8/IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChzY2hlbWFFeFNoYXBlLnBsYW5lKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faW1wb3J0UGxhbmVDb2xsaWRlcihub2RlLCB7XG4gICAgICAgICAgICAgIG9mZnNldDogbmV3IFRIUkVFLlZlY3RvcjMoKS5mcm9tQXJyYXkoc2NoZW1hRXhTaGFwZS5wbGFuZS5vZmZzZXQgPz8gWzAuMCwgMC4wLCAwLjBdKSxcbiAgICAgICAgICAgICAgbm9ybWFsOiBuZXcgVEhSRUUuVmVjdG9yMygpLmZyb21BcnJheShzY2hlbWFFeFNoYXBlLnBsYW5lLm5vcm1hbCA/PyBbMC4wLCAwLjAsIDEuMF0pLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzY2hlbWFTaGFwZS5zcGhlcmUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ltcG9ydFNwaGVyZUNvbGxpZGVyKG5vZGUsIHtcbiAgICAgICAgICBvZmZzZXQ6IG5ldyBUSFJFRS5WZWN0b3IzKCkuZnJvbUFycmF5KHNjaGVtYVNoYXBlLnNwaGVyZS5vZmZzZXQgPz8gWzAuMCwgMC4wLCAwLjBdKSxcbiAgICAgICAgICByYWRpdXM6IHNjaGVtYVNoYXBlLnNwaGVyZS5yYWRpdXMgPz8gMC4wLFxuICAgICAgICAgIGluc2lkZTogZmFsc2UsXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChzY2hlbWFTaGFwZS5jYXBzdWxlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbXBvcnRDYXBzdWxlQ29sbGlkZXIobm9kZSwge1xuICAgICAgICAgIG9mZnNldDogbmV3IFRIUkVFLlZlY3RvcjMoKS5mcm9tQXJyYXkoc2NoZW1hU2hhcGUuY2Fwc3VsZS5vZmZzZXQgPz8gWzAuMCwgMC4wLCAwLjBdKSxcbiAgICAgICAgICByYWRpdXM6IHNjaGVtYVNoYXBlLmNhcHN1bGUucmFkaXVzID8/IDAuMCxcbiAgICAgICAgICB0YWlsOiBuZXcgVEhSRUUuVmVjdG9yMygpLmZyb21BcnJheShzY2hlbWFTaGFwZS5jYXBzdWxlLnRhaWwgPz8gWzAuMCwgMC4wLCAwLjBdKSxcbiAgICAgICAgICBpbnNpZGU6IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgY29uc29sZS53YXJuKGBWUk1TcHJpbmdCb25lTG9hZGVyUGx1Z2luOiBUaGUgY29sbGlkZXIgIyR7aUNvbGxpZGVyfSBoYXMgbm8gdmFsaWQgc2hhcGUuIFNraXBwaW5nIHRoZSBjb2xsaWRlcmApO1xuICAgIH0pO1xuXG4gICAgY29uc3QgY29sbGlkZXJHcm91cHMgPSBleHRlbnNpb24uY29sbGlkZXJHcm91cHM/Lm1hcChcbiAgICAgIChzY2hlbWFDb2xsaWRlckdyb3VwLCBpQ29sbGlkZXJHcm91cCk6IFZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwID0+IHtcbiAgICAgICAgY29uc3QgY29scyA9IChzY2hlbWFDb2xsaWRlckdyb3VwLmNvbGxpZGVycyA/PyBbXSlcbiAgICAgICAgICAubWFwKChpQ29sbGlkZXIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbCA9IGNvbGxpZGVycz8uW2lDb2xsaWRlcl07XG5cbiAgICAgICAgICAgIGlmIChjb2wgPT0gbnVsbCkge1xuICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICAgICAgYFZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW46IFRoZSBjb2xsaWRlciBncm91cCAjJHtpQ29sbGlkZXJHcm91cH0gYXR0ZW1wdGVkIHRvIHJlZmVyZW5jZSBhIGNvbGxpZGVyICMke2lDb2xsaWRlcn0gYnV0IG5vdCBmb3VuZC4gU2tpcHBpbmcgdGhlIGNvbGxpZGVyYCxcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBjb2w7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZmlsdGVyKChjb2wpOiBjb2wgaXMgVlJNU3ByaW5nQm9uZUNvbGxpZGVyID0+IGNvbCAhPSBudWxsKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGNvbGxpZGVyczogY29scyxcbiAgICAgICAgICBuYW1lOiBzY2hlbWFDb2xsaWRlckdyb3VwLm5hbWUsXG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICk7XG5cbiAgICBleHRlbnNpb24uc3ByaW5ncz8uZm9yRWFjaCgoc2NoZW1hU3ByaW5nLCBpU3ByaW5nKSA9PiB7XG4gICAgICBjb25zdCBzY2hlbWFKb2ludHMgPSBzY2hlbWFTcHJpbmcuam9pbnRzO1xuICAgICAgaWYgKHNjaGVtYUpvaW50cyA9PSBudWxsKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihgVlJNU3ByaW5nQm9uZUxvYWRlclBsdWdpbjogVGhlIHNwcmluZyAjJHtpU3ByaW5nfSBoYXMgbm8gam9pbnRzLiBTa2lwcGluZyB0aGUgc3ByaW5nYCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gcHJlcGFyZSBjb2xsaWRlcnNcbiAgICAgIGNvbnN0IGNvbGxpZGVyR3JvdXBzRm9yU3ByaW5nID0gc2NoZW1hU3ByaW5nLmNvbGxpZGVyR3JvdXBzXG4gICAgICAgID8ubWFwKChpQ29sbGlkZXJHcm91cCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGdyb3VwID0gY29sbGlkZXJHcm91cHM/LltpQ29sbGlkZXJHcm91cF07XG5cbiAgICAgICAgICBpZiAoZ3JvdXAgPT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgICBgVlJNU3ByaW5nQm9uZUxvYWRlclBsdWdpbjogVGhlIHNwcmluZyAjJHtpU3ByaW5nfSBhdHRlbXB0ZWQgdG8gcmVmZXJlbmNlIGEgY29sbGlkZXIgZ3JvdXAgIyR7aUNvbGxpZGVyR3JvdXB9IGJ1dCBub3QgZm91bmQuIFNraXBwaW5nIHRoZSBjb2xsaWRlciBncm91cGAsXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIGdyb3VwO1xuICAgICAgICB9KVxuICAgICAgICAuZmlsdGVyKChncm91cCk6IGdyb3VwIGlzIFZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwID0+IGdyb3VwICE9IG51bGwpO1xuXG4gICAgICBjb25zdCBjZW50ZXIgPSBzY2hlbWFTcHJpbmcuY2VudGVyICE9IG51bGwgPyB0aHJlZU5vZGVzW3NjaGVtYVNwcmluZy5jZW50ZXJdIDogdW5kZWZpbmVkO1xuXG4gICAgICBsZXQgcHJldlNjaGVtYUpvaW50OiBWMVNwcmluZ0JvbmVTY2hlbWEuU3ByaW5nQm9uZUpvaW50IHwgdW5kZWZpbmVkO1xuICAgICAgc2NoZW1hSm9pbnRzLmZvckVhY2goKHNjaGVtYUpvaW50KSA9PiB7XG4gICAgICAgIGlmIChwcmV2U2NoZW1hSm9pbnQpIHtcbiAgICAgICAgICAvLyBwcmVwYXJlIG5vZGVcbiAgICAgICAgICBjb25zdCBub2RlSW5kZXggPSBwcmV2U2NoZW1hSm9pbnQubm9kZTtcbiAgICAgICAgICBjb25zdCBub2RlID0gdGhyZWVOb2Rlc1tub2RlSW5kZXhdO1xuICAgICAgICAgIGNvbnN0IGNoaWxkSW5kZXggPSBzY2hlbWFKb2ludC5ub2RlO1xuICAgICAgICAgIGNvbnN0IGNoaWxkID0gdGhyZWVOb2Rlc1tjaGlsZEluZGV4XTtcblxuICAgICAgICAgIC8vIHByZXBhcmUgc2V0dGluZ1xuICAgICAgICAgIGNvbnN0IHNldHRpbmc6IFBhcnRpYWw8VlJNU3ByaW5nQm9uZUpvaW50U2V0dGluZ3M+ID0ge1xuICAgICAgICAgICAgaGl0UmFkaXVzOiBwcmV2U2NoZW1hSm9pbnQuaGl0UmFkaXVzLFxuICAgICAgICAgICAgZHJhZ0ZvcmNlOiBwcmV2U2NoZW1hSm9pbnQuZHJhZ0ZvcmNlLFxuICAgICAgICAgICAgZ3Jhdml0eVBvd2VyOiBwcmV2U2NoZW1hSm9pbnQuZ3Jhdml0eVBvd2VyLFxuICAgICAgICAgICAgc3RpZmZuZXNzOiBwcmV2U2NoZW1hSm9pbnQuc3RpZmZuZXNzLFxuICAgICAgICAgICAgZ3Jhdml0eURpcjpcbiAgICAgICAgICAgICAgcHJldlNjaGVtYUpvaW50LmdyYXZpdHlEaXIgIT0gbnVsbFxuICAgICAgICAgICAgICAgID8gbmV3IFRIUkVFLlZlY3RvcjMoKS5mcm9tQXJyYXkocHJldlNjaGVtYUpvaW50LmdyYXZpdHlEaXIpXG4gICAgICAgICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIC8vIGNyZWF0ZSBzcHJpbmcgYm9uZXNcbiAgICAgICAgICBjb25zdCBqb2ludCA9IHRoaXMuX2ltcG9ydEpvaW50KG5vZGUsIGNoaWxkLCBzZXR0aW5nLCBjb2xsaWRlckdyb3Vwc0ZvclNwcmluZyk7XG4gICAgICAgICAgaWYgKGNlbnRlcikge1xuICAgICAgICAgICAgam9pbnQuY2VudGVyID0gY2VudGVyO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIGltcG9ydCBsaW1pdFxuICAgICAgICAgIGNvbnN0IGxpbWl0ID0gdGhpcy5fdHJ5SW1wb3J0TGltaXRGcm9tU2NoZW1hKGpvaW50LCBwcmV2U2NoZW1hSm9pbnQpO1xuICAgICAgICAgIGlmIChsaW1pdCkge1xuICAgICAgICAgICAgam9pbnQubGltaXQgPSBsaW1pdDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBtYW5hZ2VyLmFkZEpvaW50KGpvaW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByZXZTY2hlbWFKb2ludCA9IHNjaGVtYUpvaW50O1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBpbml0IHNwcmluZyBib25lc1xuICAgIG1hbmFnZXIuc2V0SW5pdFN0YXRlKCk7XG5cbiAgICByZXR1cm4gbWFuYWdlcjtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX3YwSW1wb3J0KGdsdGY6IEdMVEYpOiBQcm9taXNlPFZSTVNwcmluZ0JvbmVNYW5hZ2VyIHwgbnVsbD4ge1xuICAgIGNvbnN0IGpzb24gPSBnbHRmLnBhcnNlci5qc29uIGFzIEdMVEZTY2hlbWEuSUdMVEY7XG5cbiAgICAvLyBlYXJseSBhYm9ydCBpZiBpdCBkb2Vzbid0IHVzZSB2cm1cbiAgICBjb25zdCBpc1ZSTVVzZWQgPSBqc29uLmV4dGVuc2lvbnNVc2VkPy5pbmRleE9mKCdWUk0nKSAhPT0gLTE7XG4gICAgaWYgKCFpc1ZSTVVzZWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIGVhcmx5IGFib3J0IGlmIGl0IGRvZXNuJ3QgaGF2ZSBib25lIGdyb3Vwc1xuICAgIGNvbnN0IGV4dGVuc2lvbiA9IGpzb24uZXh0ZW5zaW9ucz8uWydWUk0nXSBhcyBWMFZSTS5WUk0gfCB1bmRlZmluZWQ7XG4gICAgY29uc3Qgc2NoZW1hU2Vjb25kYXJ5QW5pbWF0aW9uID0gZXh0ZW5zaW9uPy5zZWNvbmRhcnlBbmltYXRpb247XG4gICAgaWYgKCFzY2hlbWFTZWNvbmRhcnlBbmltYXRpb24pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNjaGVtYUJvbmVHcm91cHMgPSBzY2hlbWFTZWNvbmRhcnlBbmltYXRpb24/LmJvbmVHcm91cHM7XG4gICAgaWYgKCFzY2hlbWFCb25lR3JvdXBzKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBtYW5hZ2VyID0gbmV3IFZSTVNwcmluZ0JvbmVNYW5hZ2VyKCk7XG5cbiAgICBjb25zdCB0aHJlZU5vZGVzOiBUSFJFRS5PYmplY3QzRFtdID0gYXdhaXQgZ2x0Zi5wYXJzZXIuZ2V0RGVwZW5kZW5jaWVzKCdub2RlJyk7XG5cbiAgICBjb25zdCBjb2xsaWRlckdyb3VwcyA9IHNjaGVtYVNlY29uZGFyeUFuaW1hdGlvbi5jb2xsaWRlckdyb3Vwcz8ubWFwKFxuICAgICAgKHNjaGVtYUNvbGxpZGVyR3JvdXAsIGlDb2xsaWRlckdyb3VwKTogVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXAgfCBudWxsID0+IHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IHRocmVlTm9kZXNbc2NoZW1hQ29sbGlkZXJHcm91cC5ub2RlIV07XG4gICAgICAgIGlmIChub2RlID09IG51bGwpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICBgVlJNU3ByaW5nQm9uZUxvYWRlclBsdWdpbjogVGhlIGNvbGxpZGVyIGdyb3VwICMke2lDb2xsaWRlckdyb3VwfSBhdHRlbXB0ZWQgdG8gcmVmZXJlbmNlIGEgbm9kZSAjJHtzY2hlbWFDb2xsaWRlckdyb3VwLm5vZGV9IGJ1dCBub3QgZm91bmQuIFNraXBwaW5nIHRoZSBjb2xsaWRlciBncm91cGAsXG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbGxpZGVycyA9IChzY2hlbWFDb2xsaWRlckdyb3VwLmNvbGxpZGVycyA/PyBbXSkubWFwKChzY2hlbWFDb2xsaWRlciwgaUNvbGxpZGVyKSA9PiB7XG4gICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gbmV3IFRIUkVFLlZlY3RvcjMoMC4wLCAwLjAsIDAuMCk7XG4gICAgICAgICAgaWYgKHNjaGVtYUNvbGxpZGVyLm9mZnNldCkge1xuICAgICAgICAgICAgb2Zmc2V0LnNldChcbiAgICAgICAgICAgICAgc2NoZW1hQ29sbGlkZXIub2Zmc2V0LnggPz8gMC4wLFxuICAgICAgICAgICAgICBzY2hlbWFDb2xsaWRlci5vZmZzZXQueSA/PyAwLjAsXG4gICAgICAgICAgICAgIHNjaGVtYUNvbGxpZGVyLm9mZnNldC56ID8gLXNjaGVtYUNvbGxpZGVyLm9mZnNldC56IDogMC4wLCAvLyB6IGlzIG9wcG9zaXRlIGluIFZSTTAuMFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gdGhpcy5faW1wb3J0U3BoZXJlQ29sbGlkZXIobm9kZSwge1xuICAgICAgICAgICAgb2Zmc2V0LFxuICAgICAgICAgICAgcmFkaXVzOiBzY2hlbWFDb2xsaWRlci5yYWRpdXMgPz8gMC4wLFxuICAgICAgICAgICAgaW5zaWRlOiBmYWxzZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHsgY29sbGlkZXJzIH07XG4gICAgICB9LFxuICAgICk7XG5cbiAgICAvLyBpbXBvcnQgc3ByaW5nIGJvbmVzIGZvciBlYWNoIHNwcmluZyBib25lIGdyb3Vwc1xuICAgIHNjaGVtYUJvbmVHcm91cHM/LmZvckVhY2goKHNjaGVtYUJvbmVHcm91cCwgaUJvbmVHcm91cCkgPT4ge1xuICAgICAgY29uc3Qgcm9vdEluZGljZXMgPSBzY2hlbWFCb25lR3JvdXAuYm9uZXM7XG4gICAgICBpZiAoIXJvb3RJbmRpY2VzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcm9vdEluZGljZXMuZm9yRWFjaCgocm9vdEluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IHJvb3QgPSB0aHJlZU5vZGVzW3Jvb3RJbmRleF07XG4gICAgICAgIGlmIChyb290ID09IG51bGwpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICBgVlJNU3ByaW5nQm9uZUxvYWRlclBsdWdpbjogVGhlIHNwcmluZyBib25lIGdyb3VwICMke2lCb25lR3JvdXB9IGF0dGVtcHRlZCB0byByZWZlcmVuY2UgYSBub2RlICMke3Jvb3RJbmRleH0gYnV0IG5vdCBmb3VuZC4gU2tpcHBpbmcgdGhlIG5vZGVgLFxuICAgICAgICAgICk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcHJlcGFyZSBzZXR0aW5nXG4gICAgICAgIGNvbnN0IGdyYXZpdHlEaXIgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuICAgICAgICBpZiAoc2NoZW1hQm9uZUdyb3VwLmdyYXZpdHlEaXIpIHtcbiAgICAgICAgICBncmF2aXR5RGlyLnNldChcbiAgICAgICAgICAgIHNjaGVtYUJvbmVHcm91cC5ncmF2aXR5RGlyLnggPz8gMC4wLFxuICAgICAgICAgICAgc2NoZW1hQm9uZUdyb3VwLmdyYXZpdHlEaXIueSA/PyAwLjAsXG4gICAgICAgICAgICBzY2hlbWFCb25lR3JvdXAuZ3Jhdml0eURpci56ID8/IDAuMCxcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGdyYXZpdHlEaXIuc2V0KDAuMCwgLTEuMCwgMC4wKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNlbnRlciA9IHNjaGVtYUJvbmVHcm91cC5jZW50ZXIgIT0gbnVsbCA/IHRocmVlTm9kZXNbc2NoZW1hQm9uZUdyb3VwLmNlbnRlcl0gOiB1bmRlZmluZWQ7XG5cbiAgICAgICAgY29uc3Qgc2V0dGluZzogUGFydGlhbDxWUk1TcHJpbmdCb25lSm9pbnRTZXR0aW5ncz4gPSB7XG4gICAgICAgICAgaGl0UmFkaXVzOiBzY2hlbWFCb25lR3JvdXAuaGl0UmFkaXVzLFxuICAgICAgICAgIGRyYWdGb3JjZTogc2NoZW1hQm9uZUdyb3VwLmRyYWdGb3JjZSxcbiAgICAgICAgICBncmF2aXR5UG93ZXI6IHNjaGVtYUJvbmVHcm91cC5ncmF2aXR5UG93ZXIsXG4gICAgICAgICAgc3RpZmZuZXNzOiBzY2hlbWFCb25lR3JvdXAuc3RpZmZpbmVzcyxcbiAgICAgICAgICBncmF2aXR5RGlyLFxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIHByZXBhcmUgY29sbGlkZXJzXG4gICAgICAgIGNvbnN0IGNvbGxpZGVyR3JvdXBzRm9yU3ByaW5nID0gc2NoZW1hQm9uZUdyb3VwLmNvbGxpZGVyR3JvdXBzXG4gICAgICAgICAgPy5tYXAoKGlDb2xsaWRlckdyb3VwKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBncm91cCA9IGNvbGxpZGVyR3JvdXBzPy5baUNvbGxpZGVyR3JvdXBdO1xuXG4gICAgICAgICAgICBpZiAoZ3JvdXAgPT0gbnVsbCkge1xuICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICAgICAgYFZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW46IFRoZSBzcHJpbmcgIyR7aUJvbmVHcm91cH0gYXR0ZW1wdGVkIHRvIHJlZmVyZW5jZSBhIGNvbGxpZGVyIGdyb3VwICMke2lDb2xsaWRlckdyb3VwfSBidXQgbm90IGZvdW5kLiBTa2lwcGluZyB0aGUgY29sbGlkZXIgZ3JvdXBgLFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGdyb3VwO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmZpbHRlcigoZ3JvdXApOiBncm91cCBpcyBWUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cCA9PiBncm91cCAhPSBudWxsKTtcblxuICAgICAgICAvLyBjcmVhdGUgc3ByaW5nIGJvbmVzXG4gICAgICAgIHJvb3QudHJhdmVyc2UoKG5vZGUpID0+IHtcbiAgICAgICAgICBjb25zdCBjaGlsZDogVEhSRUUuT2JqZWN0M0QgfCBudWxsID0gbm9kZS5jaGlsZHJlblswXSA/PyBudWxsO1xuXG4gICAgICAgICAgY29uc3Qgam9pbnQgPSB0aGlzLl9pbXBvcnRKb2ludChub2RlLCBjaGlsZCwgc2V0dGluZywgY29sbGlkZXJHcm91cHNGb3JTcHJpbmcpO1xuICAgICAgICAgIGlmIChjZW50ZXIpIHtcbiAgICAgICAgICAgIGpvaW50LmNlbnRlciA9IGNlbnRlcjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBtYW5hZ2VyLmFkZEpvaW50KGpvaW50KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIGluaXQgc3ByaW5nIGJvbmVzXG4gICAgZ2x0Zi5zY2VuZS51cGRhdGVNYXRyaXhXb3JsZCgpO1xuICAgIG1hbmFnZXIuc2V0SW5pdFN0YXRlKCk7XG5cbiAgICByZXR1cm4gbWFuYWdlcjtcbiAgfVxuXG4gIHByaXZhdGUgX2ltcG9ydEpvaW50KFxuICAgIG5vZGU6IFRIUkVFLk9iamVjdDNELFxuICAgIGNoaWxkOiBUSFJFRS5PYmplY3QzRCxcbiAgICBzZXR0aW5nPzogUGFydGlhbDxWUk1TcHJpbmdCb25lSm9pbnRTZXR0aW5ncz4sXG4gICAgY29sbGlkZXJHcm91cHNGb3JTcHJpbmc/OiBWUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cFtdLFxuICApOiBWUk1TcHJpbmdCb25lSm9pbnQge1xuICAgIGNvbnN0IHNwcmluZ0JvbmUgPSBuZXcgVlJNU3ByaW5nQm9uZUpvaW50KG5vZGUsIGNoaWxkLCBzZXR0aW5nLCBjb2xsaWRlckdyb3Vwc0ZvclNwcmluZyk7XG5cbiAgICBpZiAodGhpcy5qb2ludEhlbHBlclJvb3QpIHtcbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBWUk1TcHJpbmdCb25lSm9pbnRIZWxwZXIoc3ByaW5nQm9uZSk7XG4gICAgICB0aGlzLmpvaW50SGVscGVyUm9vdC5hZGQoaGVscGVyKTtcbiAgICAgIGhlbHBlci5yZW5kZXJPcmRlciA9IHRoaXMuam9pbnRIZWxwZXJSb290LnJlbmRlck9yZGVyO1xuICAgIH1cblxuICAgIHJldHVybiBzcHJpbmdCb25lO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW1wb3J0U3BoZXJlQ29sbGlkZXIoXG4gICAgZGVzdGluYXRpb246IFRIUkVFLk9iamVjdDNELFxuICAgIHBhcmFtczoge1xuICAgICAgb2Zmc2V0OiBUSFJFRS5WZWN0b3IzO1xuICAgICAgcmFkaXVzOiBudW1iZXI7XG4gICAgICBpbnNpZGU6IGJvb2xlYW47XG4gICAgfSxcbiAgKTogVlJNU3ByaW5nQm9uZUNvbGxpZGVyIHtcbiAgICBjb25zdCBzaGFwZSA9IG5ldyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZVNwaGVyZShwYXJhbXMpO1xuXG4gICAgY29uc3QgY29sbGlkZXIgPSBuZXcgVlJNU3ByaW5nQm9uZUNvbGxpZGVyKHNoYXBlKTtcblxuICAgIGRlc3RpbmF0aW9uLmFkZChjb2xsaWRlcik7XG5cbiAgICBpZiAodGhpcy5jb2xsaWRlckhlbHBlclJvb3QpIHtcbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBWUk1TcHJpbmdCb25lQ29sbGlkZXJIZWxwZXIoY29sbGlkZXIpO1xuICAgICAgdGhpcy5jb2xsaWRlckhlbHBlclJvb3QuYWRkKGhlbHBlcik7XG4gICAgICBoZWxwZXIucmVuZGVyT3JkZXIgPSB0aGlzLmNvbGxpZGVySGVscGVyUm9vdC5yZW5kZXJPcmRlcjtcbiAgICB9XG5cbiAgICByZXR1cm4gY29sbGlkZXI7XG4gIH1cblxuICBwcml2YXRlIF9pbXBvcnRDYXBzdWxlQ29sbGlkZXIoXG4gICAgZGVzdGluYXRpb246IFRIUkVFLk9iamVjdDNELFxuICAgIHBhcmFtczoge1xuICAgICAgb2Zmc2V0OiBUSFJFRS5WZWN0b3IzO1xuICAgICAgcmFkaXVzOiBudW1iZXI7XG4gICAgICB0YWlsOiBUSFJFRS5WZWN0b3IzO1xuICAgICAgaW5zaWRlOiBib29sZWFuO1xuICAgIH0sXG4gICk6IFZSTVNwcmluZ0JvbmVDb2xsaWRlciB7XG4gICAgY29uc3Qgc2hhcGUgPSBuZXcgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVDYXBzdWxlKHBhcmFtcyk7XG5cbiAgICBjb25zdCBjb2xsaWRlciA9IG5ldyBWUk1TcHJpbmdCb25lQ29sbGlkZXIoc2hhcGUpO1xuXG4gICAgZGVzdGluYXRpb24uYWRkKGNvbGxpZGVyKTtcblxuICAgIGlmICh0aGlzLmNvbGxpZGVySGVscGVyUm9vdCkge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IFZSTVNwcmluZ0JvbmVDb2xsaWRlckhlbHBlcihjb2xsaWRlcik7XG4gICAgICB0aGlzLmNvbGxpZGVySGVscGVyUm9vdC5hZGQoaGVscGVyKTtcbiAgICAgIGhlbHBlci5yZW5kZXJPcmRlciA9IHRoaXMuY29sbGlkZXJIZWxwZXJSb290LnJlbmRlck9yZGVyO1xuICAgIH1cblxuICAgIHJldHVybiBjb2xsaWRlcjtcbiAgfVxuXG4gIHByaXZhdGUgX2ltcG9ydFBsYW5lQ29sbGlkZXIoXG4gICAgZGVzdGluYXRpb246IFRIUkVFLk9iamVjdDNELFxuICAgIHBhcmFtczoge1xuICAgICAgb2Zmc2V0OiBUSFJFRS5WZWN0b3IzO1xuICAgICAgbm9ybWFsOiBUSFJFRS5WZWN0b3IzO1xuICAgIH0sXG4gICk6IFZSTVNwcmluZ0JvbmVDb2xsaWRlciB7XG4gICAgY29uc3Qgc2hhcGUgPSBuZXcgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVQbGFuZShwYXJhbXMpO1xuXG4gICAgY29uc3QgY29sbGlkZXIgPSBuZXcgVlJNU3ByaW5nQm9uZUNvbGxpZGVyKHNoYXBlKTtcblxuICAgIGRlc3RpbmF0aW9uLmFkZChjb2xsaWRlcik7XG5cbiAgICBpZiAodGhpcy5jb2xsaWRlckhlbHBlclJvb3QpIHtcbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBWUk1TcHJpbmdCb25lQ29sbGlkZXJIZWxwZXIoY29sbGlkZXIpO1xuICAgICAgdGhpcy5jb2xsaWRlckhlbHBlclJvb3QuYWRkKGhlbHBlcik7XG4gICAgICBoZWxwZXIucmVuZGVyT3JkZXIgPSB0aGlzLmNvbGxpZGVySGVscGVyUm9vdC5yZW5kZXJPcmRlcjtcbiAgICB9XG5cbiAgICByZXR1cm4gY29sbGlkZXI7XG4gIH1cblxuICBwcml2YXRlIF9pbXBvcnRMaW1pdENvbmUoXG4gICAgam9pbnQ6IFZSTVNwcmluZ0JvbmVKb2ludCxcbiAgICBwYXJhbXM6IHtcbiAgICAgIGFuZ2xlOiBudW1iZXI7XG4gICAgICByb3RhdGlvbj86IFRIUkVFLlF1YXRlcm5pb247XG4gICAgfSxcbiAgKTogVlJNU3ByaW5nQm9uZUxpbWl0Q29uZSB7XG4gICAgY29uc3QgbGltaXQgPSBuZXcgVlJNU3ByaW5nQm9uZUxpbWl0Q29uZShwYXJhbXMpO1xuXG4gICAgaWYgKHRoaXMubGltaXRIZWxwZXJSb290KSB7XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgVlJNU3ByaW5nQm9uZUxpbWl0SGVscGVyKGxpbWl0LCBqb2ludCk7XG4gICAgICB0aGlzLmxpbWl0SGVscGVyUm9vdC5hZGQoaGVscGVyKTtcbiAgICAgIGhlbHBlci5yZW5kZXJPcmRlciA9IHRoaXMubGltaXRIZWxwZXJSb290LnJlbmRlck9yZGVyO1xuICAgIH1cblxuICAgIHJldHVybiBsaW1pdDtcbiAgfVxuXG4gIHByaXZhdGUgX2ltcG9ydExpbWl0SGluZ2UoXG4gICAgam9pbnQ6IFZSTVNwcmluZ0JvbmVKb2ludCxcbiAgICBwYXJhbXM6IHtcbiAgICAgIGFuZ2xlOiBudW1iZXI7XG4gICAgICByb3RhdGlvbj86IFRIUkVFLlF1YXRlcm5pb247XG4gICAgfSxcbiAgKTogVlJNU3ByaW5nQm9uZUxpbWl0SGluZ2Uge1xuICAgIGNvbnN0IGxpbWl0ID0gbmV3IFZSTVNwcmluZ0JvbmVMaW1pdEhpbmdlKHBhcmFtcyk7XG5cbiAgICBpZiAodGhpcy5saW1pdEhlbHBlclJvb3QpIHtcbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBWUk1TcHJpbmdCb25lTGltaXRIZWxwZXIobGltaXQsIGpvaW50KTtcbiAgICAgIHRoaXMubGltaXRIZWxwZXJSb290LmFkZChoZWxwZXIpO1xuICAgICAgaGVscGVyLnJlbmRlck9yZGVyID0gdGhpcy5saW1pdEhlbHBlclJvb3QucmVuZGVyT3JkZXI7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxpbWl0O1xuICB9XG5cbiAgcHJpdmF0ZSBfaW1wb3J0TGltaXRTcGhlcmljYWwoXG4gICAgam9pbnQ6IFZSTVNwcmluZ0JvbmVKb2ludCxcbiAgICBwYXJhbXM6IHtcbiAgICAgIHBpdGNoOiBudW1iZXI7XG4gICAgICB5YXc6IG51bWJlcjtcbiAgICAgIHJvdGF0aW9uPzogVEhSRUUuUXVhdGVybmlvbjtcbiAgICB9LFxuICApOiBWUk1TcHJpbmdCb25lTGltaXRTcGhlcmljYWwge1xuICAgIGNvbnN0IGxpbWl0ID0gbmV3IFZSTVNwcmluZ0JvbmVMaW1pdFNwaGVyaWNhbChwYXJhbXMpO1xuXG4gICAgaWYgKHRoaXMubGltaXRIZWxwZXJSb290KSB7XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgVlJNU3ByaW5nQm9uZUxpbWl0SGVscGVyKGxpbWl0LCBqb2ludCk7XG4gICAgICB0aGlzLmxpbWl0SGVscGVyUm9vdC5hZGQoaGVscGVyKTtcbiAgICAgIGhlbHBlci5yZW5kZXJPcmRlciA9IHRoaXMubGltaXRIZWxwZXJSb290LnJlbmRlck9yZGVyO1xuICAgIH1cblxuICAgIHJldHVybiBsaW1pdDtcbiAgfVxuXG4gIHByaXZhdGUgX3RyeUltcG9ydExpbWl0RnJvbVNjaGVtYShcbiAgICBqb2ludDogVlJNU3ByaW5nQm9uZUpvaW50LFxuICAgIHNjaGVtYUpvaW50OiBWMVNwcmluZ0JvbmVTY2hlbWEuU3ByaW5nQm9uZUpvaW50LFxuICApOiBWUk1TcHJpbmdCb25lTGltaXQgfCB1bmRlZmluZWQge1xuICAgIGlmICghdGhpcy51c2VMaW1pdHMpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgY29uc3Qgc2NoZW1hTGltaXQ6IFNwcmluZ0JvbmVMaW1pdFNjaGVtYS5WUk1DU3ByaW5nQm9uZUxpbWl0IHwgdW5kZWZpbmVkID1cbiAgICAgIHNjaGVtYUpvaW50LmV4dGVuc2lvbnM/LltFWFRFTlNJT05fTkFNRV9MSU1JVF07XG5cbiAgICBpZiAoc2NoZW1hTGltaXQgIT0gbnVsbCkge1xuICAgICAgY29uc3Qgc3BlY1ZlcnNpb25MaW1pdCA9IHNjaGVtYUxpbWl0LnNwZWNWZXJzaW9uO1xuICAgICAgaWYgKCFQT1NTSUJMRV9TUEVDX1ZFUlNJT05TX0xJTUlULmhhcyhzcGVjVmVyc2lvbkxpbWl0KSkge1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgYFZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW46IFVua25vd24gJHtFWFRFTlNJT05fTkFNRV9MSU1JVH0gc3BlY1ZlcnNpb24gXCIke3NwZWNWZXJzaW9uTGltaXR9XCIuIElnbm9yaW5nIHRoZSBsaW1pdGAsXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoc3BlY1ZlcnNpb25MaW1pdCA9PT0gJzEuMC1kcmFmdCcpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICBgVlJNU3ByaW5nQm9uZUxvYWRlclBsdWdpbjogVXNpbmcgYSBkcmFmdCBzcGVjIHZlcnNpb24gb2YgJHtFWFRFTlNJT05fTkFNRV9MSU1JVH06IDEuMC1kcmFmdC4gU29tZSBiZWhhdmlvcnMgbWF5IGJlIGRpZmZlcmVudC4gQ29uc2lkZXIgdXBkYXRpbmcgdGhlIG1vZGVsIGZpbGUuYCxcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2NoZW1hTGltaXRMaW1pdCA9IHNjaGVtYUxpbWl0LmxpbWl0ITtcbiAgICAgICAgaWYgKHNjaGVtYUxpbWl0TGltaXQuY29uZSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLl9pbXBvcnRMaW1pdENvbmUoam9pbnQsIHtcbiAgICAgICAgICAgIGFuZ2xlOiBzY2hlbWFMaW1pdExpbWl0LmNvbmUuYW5nbGUsXG4gICAgICAgICAgICByb3RhdGlvbjogbmV3IFRIUkVFLlF1YXRlcm5pb24oKS5mcm9tQXJyYXkoc2NoZW1hTGltaXRMaW1pdC5jb25lLnJvdGF0aW9uID8/IFswLjAsIDAuMCwgMC4wLCAxLjBdKSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChzY2hlbWFMaW1pdExpbWl0LmhpbmdlKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2ltcG9ydExpbWl0SGluZ2Uoam9pbnQsIHtcbiAgICAgICAgICAgIGFuZ2xlOiBzY2hlbWFMaW1pdExpbWl0LmhpbmdlLmFuZ2xlLFxuICAgICAgICAgICAgcm90YXRpb246IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCkuZnJvbUFycmF5KHNjaGVtYUxpbWl0TGltaXQuaGluZ2Uucm90YXRpb24gPz8gWzAuMCwgMC4wLCAwLjAsIDEuMF0pLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKHNjaGVtYUxpbWl0TGltaXQuc3BoZXJpY2FsKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2ltcG9ydExpbWl0U3BoZXJpY2FsKGpvaW50LCB7XG4gICAgICAgICAgICBwaXRjaDogc2NoZW1hTGltaXRMaW1pdC5zcGhlcmljYWwucGl0Y2gsXG4gICAgICAgICAgICB5YXc6IHNjaGVtYUxpbWl0TGltaXQuc3BoZXJpY2FsLnlhdyxcbiAgICAgICAgICAgIHJvdGF0aW9uOiBuZXcgVEhSRUUuUXVhdGVybmlvbigpLmZyb21BcnJheShzY2hlbWFMaW1pdExpbWl0LnNwaGVyaWNhbC5yb3RhdGlvbiA/PyBbMC4wLCAwLjAsIDAuMCwgMS4wXSksXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKCdWUk1TcHJpbmdCb25lTG9hZGVyUGx1Z2luOiBVbmtub3duIGxpbWl0IHR5cGUuIElnbm9yaW5nIHRoZSBsaW1pdCcpO1xuICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsICJpbXBvcnQgdHlwZSAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuZXhwb3J0IGZ1bmN0aW9uIHRyYXZlcnNlQW5jZXN0b3JzRnJvbVJvb3Qob2JqZWN0OiBUSFJFRS5PYmplY3QzRCwgY2FsbGJhY2s6IChvYmplY3Q6IFRIUkVFLk9iamVjdDNEKSA9PiB2b2lkKTogdm9pZCB7XG4gIGNvbnN0IGFuY2VzdG9yczogVEhSRUUuT2JqZWN0M0RbXSA9IFtdO1xuXG4gIGxldCBoZWFkOiBUSFJFRS5PYmplY3QzRCB8IG51bGwgPSBvYmplY3Q7XG4gIHdoaWxlIChoZWFkICE9PSBudWxsKSB7XG4gICAgYW5jZXN0b3JzLnVuc2hpZnQoaGVhZCk7XG4gICAgaGVhZCA9IGhlYWQucGFyZW50O1xuICB9XG5cbiAgYW5jZXN0b3JzLmZvckVhY2goKGFuY2VzdG9yKSA9PiB7XG4gICAgY2FsbGJhY2soYW5jZXN0b3IpO1xuICB9KTtcbn1cbiIsICJpbXBvcnQgdHlwZSAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBUcmF2ZXJzZSBjaGlsZHJlbiBvZiBnaXZlbiBvYmplY3QgYW5kIGV4ZWN1dGUgZ2l2ZW4gY2FsbGJhY2suXG4gKiBUaGUgZ2l2ZW4gb2JqZWN0IGl0c2VsZiB3b250IGJlIGdpdmVuIHRvIHRoZSBjYWxsYmFjay5cbiAqIElmIHRoZSByZXR1cm4gdmFsdWUgb2YgdGhlIGNhbGxiYWNrIGlzIGB0cnVlYCwgaXQgd2lsbCBoYWx0IHRoZSB0cmF2ZXJzYWwgb2YgaXRzIGNoaWxkcmVuLlxuICogQHBhcmFtIG9iamVjdCBBIHJvb3Qgb2JqZWN0XG4gKiBAcGFyYW0gY2FsbGJhY2sgQSBjYWxsYmFjayBmdW5jdGlvbiBjYWxsZWQgZm9yIGVhY2ggY2hpbGRyZW5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRyYXZlcnNlQ2hpbGRyZW5VbnRpbENvbmRpdGlvbk1ldChcbiAgb2JqZWN0OiBUSFJFRS5PYmplY3QzRCxcbiAgY2FsbGJhY2s6IChvYmplY3Q6IFRIUkVFLk9iamVjdDNEKSA9PiBib29sZWFuLFxuKTogdm9pZCB7XG4gIG9iamVjdC5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IGNhbGxiYWNrKGNoaWxkKTtcbiAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgdHJhdmVyc2VDaGlsZHJlblVudGlsQ29uZGl0aW9uTWV0KGNoaWxkLCBjYWxsYmFjayk7XG4gICAgfVxuICB9KTtcbn1cbiIsICJpbXBvcnQgdHlwZSAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBGaW5kcyB0aGUgbG93ZXN0IGNvbW1vbiBhbmNlc3RvcnMgb2YgdGhlIGdpdmVuIG9iamVjdHMsIGlmIGl0IGV4aXN0cy5cbiAqIEBwYXJhbSBvYmplY3RzIFRoZSBvYmplY3RzIHRvIGZpbmQgdGhlIGxvd2VzdCBjb21tb24gYW5jZXN0b3IgZm9yLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbG93ZXN0Q29tbW9uQW5jZXN0b3Iob2JqZWN0czogU2V0PFRIUkVFLk9iamVjdDNEPik6IFRIUkVFLk9iamVjdDNEIHwgbnVsbCB7XG4gIGNvbnN0IHNoYXJlZEFuY2VzdG9ycyA9IG5ldyBNYXA8VEhSRUUuT2JqZWN0M0QsIG51bWJlcj4oKTtcbiAgZm9yIChjb25zdCBvYmplY3Qgb2Ygb2JqZWN0cykge1xuICAgIGxldCBjdXJyZW50OiBUSFJFRS5PYmplY3QzRCB8IG51bGwgPSBvYmplY3Q7XG4gICAgZG8ge1xuICAgICAgY29uc3QgbmV3VmFsdWUgPSAoc2hhcmVkQW5jZXN0b3JzLmdldChjdXJyZW50KSA/PyAwKSArIDE7XG4gICAgICBpZiAobmV3VmFsdWUgPT09IG9iamVjdHMuc2l6ZSkge1xuICAgICAgICByZXR1cm4gY3VycmVudDtcbiAgICAgIH1cbiAgICAgIHNoYXJlZEFuY2VzdG9ycy5zZXQoY3VycmVudCwgbmV3VmFsdWUpO1xuICAgICAgY3VycmVudCA9IGN1cnJlbnQucGFyZW50O1xuICAgIH0gd2hpbGUgKGN1cnJlbnQgIT09IG51bGwpO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuIiwgImltcG9ydCB0eXBlICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHR5cGUgeyBWUk1TcHJpbmdCb25lSm9pbnQgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVKb2ludC5qcyc7XG5pbXBvcnQgeyB0cmF2ZXJzZUFuY2VzdG9yc0Zyb21Sb290IH0gZnJvbSAnLi91dGlscy90cmF2ZXJzZUFuY2VzdG9yc0Zyb21Sb290LmpzJztcbmltcG9ydCB0eXBlIHsgVlJNU3ByaW5nQm9uZUNvbGxpZGVyIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lQ29sbGlkZXIuanMnO1xuaW1wb3J0IHR5cGUgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cCB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXAuanMnO1xuaW1wb3J0IHsgdHJhdmVyc2VDaGlsZHJlblVudGlsQ29uZGl0aW9uTWV0IH0gZnJvbSAnLi91dGlscy90cmF2ZXJzZUNoaWxkcmVuVW50aWxDb25kaXRpb25NZXQuanMnO1xuaW1wb3J0IHsgbG93ZXN0Q29tbW9uQW5jZXN0b3IgfSBmcm9tICcuL3V0aWxzL2xvd2VzdENvbW1vbkFuY2VzdG9yLmpzJztcblxuZXhwb3J0IGNsYXNzIFZSTVNwcmluZ0JvbmVNYW5hZ2VyIHtcbiAgcHJpdmF0ZSBfam9pbnRzID0gbmV3IFNldDxWUk1TcHJpbmdCb25lSm9pbnQ+KCk7XG4gIHByaXZhdGUgX3NvcnRlZEpvaW50czogQXJyYXk8VlJNU3ByaW5nQm9uZUpvaW50PiA9IFtdO1xuICBwcml2YXRlIF9oYXNXYXJuZWRDaXJjdWxhckRlcGVuZGVuY3kgPSBmYWxzZTtcblxuICAvKipcbiAgICogQW4gb3JkZXJlZCBsaXN0IG9mIGFuY2VzdG9ycyBvZiBhbGwgdGhlIFNwcmluZ0JvbmUgam9pbnRzLiBCZWZvcmUgdGhlXG4gICAqIFNwcmluZ0JvbmUgam9pbnRzIGNhbiBiZSB1cGRhdGVkLCB0aGUgd29ybGQgbWF0cmljZXMgb2YgdGhlc2UgYW5jZXN0b3JzXG4gICAqIG11c3QgYmUgY2FsY3VsYXRlZC4gVGhlIGZpcnN0IGVsZW1lbnQgaXMgdGhlIGxvd2VzdCBjb21tb24gYW5jZXN0b3IsIGZvclxuICAgKiB3aGljaCBub3Qgb25seSBpdHMgd29ybGQgbWF0cml4IGJ1dCBpdHMgYW5jZXN0b3JzJyB3b3JsZCBtYXRyaWNlcyBhcmVcbiAgICogdXBkYXRlZCBhcyB3ZWxsLlxuICAgKi9cbiAgcHJpdmF0ZSBfYW5jZXN0b3JzOiBUSFJFRS5PYmplY3QzRFtdID0gW107XG5cbiAgcHVibGljIGdldCBqb2ludHMoKTogU2V0PFZSTVNwcmluZ0JvbmVKb2ludD4ge1xuICAgIHJldHVybiB0aGlzLl9qb2ludHM7XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVXNlIHtAbGluayBqb2ludHN9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHNwcmluZ0JvbmVzKCk6IFNldDxWUk1TcHJpbmdCb25lSm9pbnQ+IHtcbiAgICBjb25zb2xlLndhcm4oJ1ZSTVNwcmluZ0JvbmVNYW5hZ2VyOiBzcHJpbmdCb25lcyBpcyBkZXByZWNhdGVkLiB1c2Ugam9pbnRzIGluc3RlYWQuJyk7XG5cbiAgICByZXR1cm4gdGhpcy5fam9pbnRzO1xuICB9XG5cbiAgcHVibGljIGdldCBjb2xsaWRlckdyb3VwcygpOiBWUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cFtdIHtcbiAgICBjb25zdCBzZXQgPSBuZXcgU2V0PFZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwPigpO1xuICAgIHRoaXMuX2pvaW50cy5mb3JFYWNoKChzcHJpbmdCb25lKSA9PiB7XG4gICAgICBzcHJpbmdCb25lLmNvbGxpZGVyR3JvdXBzLmZvckVhY2goKGNvbGxpZGVyR3JvdXApID0+IHtcbiAgICAgICAgc2V0LmFkZChjb2xsaWRlckdyb3VwKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBBcnJheS5mcm9tKHNldCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGNvbGxpZGVycygpOiBWUk1TcHJpbmdCb25lQ29sbGlkZXJbXSB7XG4gICAgY29uc3Qgc2V0ID0gbmV3IFNldDxWUk1TcHJpbmdCb25lQ29sbGlkZXI+KCk7XG4gICAgdGhpcy5jb2xsaWRlckdyb3Vwcy5mb3JFYWNoKChjb2xsaWRlckdyb3VwKSA9PiB7XG4gICAgICBjb2xsaWRlckdyb3VwLmNvbGxpZGVycy5mb3JFYWNoKChjb2xsaWRlcikgPT4ge1xuICAgICAgICBzZXQuYWRkKGNvbGxpZGVyKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBBcnJheS5mcm9tKHNldCk7XG4gIH1cblxuICBwcml2YXRlIF9vYmplY3RTcHJpbmdCb25lc01hcCA9IG5ldyBNYXA8VEhSRUUuT2JqZWN0M0QsIFNldDxWUk1TcHJpbmdCb25lSm9pbnQ+PigpO1xuICBwcml2YXRlIF9pc1NvcnRlZEpvaW50c0RpcnR5ID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fcmVsZXZhbnRDaGlsZHJlblVwZGF0ZWQgPSB0aGlzLl9yZWxldmFudENoaWxkcmVuVXBkYXRlZC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgcHVibGljIGFkZEpvaW50KGpvaW50OiBWUk1TcHJpbmdCb25lSm9pbnQpOiB2b2lkIHtcbiAgICB0aGlzLl9qb2ludHMuYWRkKGpvaW50KTtcblxuICAgIGxldCBvYmplY3RTZXQgPSB0aGlzLl9vYmplY3RTcHJpbmdCb25lc01hcC5nZXQoam9pbnQuYm9uZSk7XG4gICAgaWYgKG9iamVjdFNldCA9PSBudWxsKSB7XG4gICAgICBvYmplY3RTZXQgPSBuZXcgU2V0PFZSTVNwcmluZ0JvbmVKb2ludD4oKTtcbiAgICAgIHRoaXMuX29iamVjdFNwcmluZ0JvbmVzTWFwLnNldChqb2ludC5ib25lLCBvYmplY3RTZXQpO1xuICAgIH1cbiAgICBvYmplY3RTZXQuYWRkKGpvaW50KTtcblxuICAgIHRoaXMuX2lzU29ydGVkSm9pbnRzRGlydHkgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFVzZSB7QGxpbmsgYWRkSm9pbnR9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgYWRkU3ByaW5nQm9uZShqb2ludDogVlJNU3ByaW5nQm9uZUpvaW50KTogdm9pZCB7XG4gICAgY29uc29sZS53YXJuKCdWUk1TcHJpbmdCb25lTWFuYWdlcjogYWRkU3ByaW5nQm9uZSgpIGlzIGRlcHJlY2F0ZWQuIHVzZSBhZGRKb2ludCgpIGluc3RlYWQuJyk7XG5cbiAgICB0aGlzLmFkZEpvaW50KGpvaW50KTtcbiAgfVxuXG4gIHB1YmxpYyBkZWxldGVKb2ludChqb2ludDogVlJNU3ByaW5nQm9uZUpvaW50KTogdm9pZCB7XG4gICAgdGhpcy5fam9pbnRzLmRlbGV0ZShqb2ludCk7XG5cbiAgICBjb25zdCBvYmplY3RTZXQgPSB0aGlzLl9vYmplY3RTcHJpbmdCb25lc01hcC5nZXQoam9pbnQuYm9uZSkhO1xuICAgIG9iamVjdFNldC5kZWxldGUoam9pbnQpO1xuXG4gICAgdGhpcy5faXNTb3J0ZWRKb2ludHNEaXJ0eSA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVXNlIHtAbGluayBkZWxldGVKb2ludH0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBkZWxldGVTcHJpbmdCb25lKGpvaW50OiBWUk1TcHJpbmdCb25lSm9pbnQpOiB2b2lkIHtcbiAgICBjb25zb2xlLndhcm4oJ1ZSTVNwcmluZ0JvbmVNYW5hZ2VyOiBkZWxldGVTcHJpbmdCb25lKCkgaXMgZGVwcmVjYXRlZC4gdXNlIGRlbGV0ZUpvaW50KCkgaW5zdGVhZC4nKTtcblxuICAgIHRoaXMuZGVsZXRlSm9pbnQoam9pbnQpO1xuICB9XG5cbiAgcHVibGljIHNldEluaXRTdGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9zb3J0Sm9pbnRzKCk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3NvcnRlZEpvaW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgc3ByaW5nQm9uZSA9IHRoaXMuX3NvcnRlZEpvaW50c1tpXTtcbiAgICAgIHNwcmluZ0JvbmUuYm9uZS51cGRhdGVNYXRyaXgoKTtcbiAgICAgIHNwcmluZ0JvbmUuYm9uZS51cGRhdGVXb3JsZE1hdHJpeChmYWxzZSwgZmFsc2UpO1xuICAgICAgc3ByaW5nQm9uZS5zZXRJbml0U3RhdGUoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy5fc29ydEpvaW50cygpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9zb3J0ZWRKb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHNwcmluZ0JvbmUgPSB0aGlzLl9zb3J0ZWRKb2ludHNbaV07XG4gICAgICBzcHJpbmdCb25lLmJvbmUudXBkYXRlTWF0cml4KCk7XG4gICAgICBzcHJpbmdCb25lLmJvbmUudXBkYXRlV29ybGRNYXRyaXgoZmFsc2UsIGZhbHNlKTtcbiAgICAgIHNwcmluZ0JvbmUucmVzZXQoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9zb3J0Sm9pbnRzKCk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2FuY2VzdG9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5fYW5jZXN0b3JzW2ldLnVwZGF0ZVdvcmxkTWF0cml4KGkgPT09IDAsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3NvcnRlZEpvaW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgLy8gdXBkYXRlIHRoZSBzcHJpbmdib25lXG4gICAgICBjb25zdCBzcHJpbmdCb25lID0gdGhpcy5fc29ydGVkSm9pbnRzW2ldO1xuICAgICAgc3ByaW5nQm9uZS5ib25lLnVwZGF0ZU1hdHJpeCgpO1xuICAgICAgc3ByaW5nQm9uZS5ib25lLnVwZGF0ZVdvcmxkTWF0cml4KGZhbHNlLCBmYWxzZSk7XG4gICAgICBzcHJpbmdCb25lLnVwZGF0ZShkZWx0YSk7XG5cbiAgICAgIC8vIHVwZGF0ZSBjaGlsZHJlbiB3b3JsZCBtYXRyaWNlc1xuICAgICAgLy8gaXQgaXMgcmVxdWlyZWQgd2hlbiB0aGUgc3ByaW5nIGJvbmUgY2hhaW4gaXMgc3BhcnNlXG4gICAgICB0cmF2ZXJzZUNoaWxkcmVuVW50aWxDb25kaXRpb25NZXQoc3ByaW5nQm9uZS5ib25lLCB0aGlzLl9yZWxldmFudENoaWxkcmVuVXBkYXRlZCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNvcnRzIHRoZSBqb2ludHMgZW5zdXJpbmcgdGhleSBhcmUgdXBkYXRlZCBpbiB0aGUgY29ycmVjdCBvcmRlciB0YWtpbmcgZGVwZW5kZW5jaWVzIGludG8gYWNjb3VudC5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgdXBkYXRlcyB7QGxpbmsgX3NvcnRlZEpvaW50c30gYW5kIHtAbGluayBfYW5jZXN0b3JzfS5cbiAgICogTWFrZSBzdXJlIHRvIGNhbGwgdGhpcyBiZWZvcmUgdXNpbmcgdGhlbS5cbiAgICovXG4gIHByaXZhdGUgX3NvcnRKb2ludHMoKSB7XG4gICAgaWYgKCF0aGlzLl9pc1NvcnRlZEpvaW50c0RpcnR5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc3ByaW5nQm9uZU9yZGVyOiBBcnJheTxWUk1TcHJpbmdCb25lSm9pbnQ+ID0gW107XG4gICAgY29uc3Qgc3ByaW5nQm9uZXNUcmllZCA9IG5ldyBTZXQ8VlJNU3ByaW5nQm9uZUpvaW50PigpO1xuICAgIGNvbnN0IHNwcmluZ0JvbmVzRG9uZSA9IG5ldyBTZXQ8VlJNU3ByaW5nQm9uZUpvaW50PigpO1xuICAgIGNvbnN0IGFuY2VzdG9ycyA9IG5ldyBTZXQ8VEhSRUUuT2JqZWN0M0Q+KCk7XG5cbiAgICBmb3IgKGNvbnN0IHNwcmluZ0JvbmUgb2YgdGhpcy5fam9pbnRzKSB7XG4gICAgICB0aGlzLl9pbnNlcnRKb2ludFNvcnQoc3ByaW5nQm9uZSwgc3ByaW5nQm9uZXNUcmllZCwgc3ByaW5nQm9uZXNEb25lLCBzcHJpbmdCb25lT3JkZXIsIGFuY2VzdG9ycyk7XG4gICAgfVxuICAgIHRoaXMuX3NvcnRlZEpvaW50cyA9IHNwcmluZ0JvbmVPcmRlcjtcblxuICAgIGNvbnN0IGxjYSA9IGxvd2VzdENvbW1vbkFuY2VzdG9yKGFuY2VzdG9ycyk7XG4gICAgdGhpcy5fYW5jZXN0b3JzID0gW107XG4gICAgaWYgKGxjYSkge1xuICAgICAgdGhpcy5fYW5jZXN0b3JzLnB1c2gobGNhKTtcbiAgICAgIHRyYXZlcnNlQ2hpbGRyZW5VbnRpbENvbmRpdGlvbk1ldChsY2EsIChvYmplY3Q6IFRIUkVFLk9iamVjdDNEKSA9PiB7XG4gICAgICAgIC8vIGlmIHRoZSBvYmplY3QgaGFzIGF0dGFjaGVkIHNwcmluZ2JvbmUsIGhhbHQgdGhlIHRyYXZlcnNhbFxuICAgICAgICBpZiAoKHRoaXMuX29iamVjdFNwcmluZ0JvbmVzTWFwLmdldChvYmplY3QpPy5zaXplID8/IDApID4gMCkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2FuY2VzdG9ycy5wdXNoKG9iamVjdCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuX2lzU29ydGVkSm9pbnRzRGlydHkgPSBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgX2luc2VydEpvaW50U29ydChcbiAgICBzcHJpbmdCb25lOiBWUk1TcHJpbmdCb25lSm9pbnQsXG4gICAgc3ByaW5nQm9uZXNUcmllZDogU2V0PFZSTVNwcmluZ0JvbmVKb2ludD4sXG4gICAgc3ByaW5nQm9uZXNEb25lOiBTZXQ8VlJNU3ByaW5nQm9uZUpvaW50PixcbiAgICBzcHJpbmdCb25lT3JkZXI6IEFycmF5PFZSTVNwcmluZ0JvbmVKb2ludD4sXG4gICAgYW5jZXN0b3JzOiBTZXQ8VEhSRUUuT2JqZWN0M0Q+LFxuICApIHtcbiAgICBpZiAoc3ByaW5nQm9uZXNEb25lLmhhcyhzcHJpbmdCb25lKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChzcHJpbmdCb25lc1RyaWVkLmhhcyhzcHJpbmdCb25lKSkge1xuICAgICAgaWYgKCF0aGlzLl9oYXNXYXJuZWRDaXJjdWxhckRlcGVuZGVuY3kpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdWUk1TcHJpbmdCb25lTWFuYWdlcjogQ2lyY3VsYXIgZGVwZW5kZW5jeSBkZXRlY3RlZCcpO1xuICAgICAgICB0aGlzLl9oYXNXYXJuZWRDaXJjdWxhckRlcGVuZGVuY3kgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNwcmluZ0JvbmVzVHJpZWQuYWRkKHNwcmluZ0JvbmUpO1xuXG4gICAgY29uc3QgZGVwT2JqZWN0cyA9IHNwcmluZ0JvbmUuZGVwZW5kZW5jaWVzO1xuICAgIGZvciAoY29uc3QgZGVwT2JqZWN0IG9mIGRlcE9iamVjdHMpIHtcbiAgICAgIGxldCBlbmNvdW50ZXJlZFNwcmluZ0JvbmUgPSBmYWxzZTtcbiAgICAgIGxldCBhbmNlc3RvcjogVEhSRUUuT2JqZWN0M0QgfCBudWxsID0gbnVsbDtcbiAgICAgIHRyYXZlcnNlQW5jZXN0b3JzRnJvbVJvb3QoZGVwT2JqZWN0LCAoZGVwT2JqZWN0QW5jZXN0b3IpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqZWN0U2V0ID0gdGhpcy5fb2JqZWN0U3ByaW5nQm9uZXNNYXAuZ2V0KGRlcE9iamVjdEFuY2VzdG9yKTtcbiAgICAgICAgaWYgKG9iamVjdFNldCkge1xuICAgICAgICAgIGZvciAoY29uc3QgZGVwU3ByaW5nQm9uZSBvZiBvYmplY3RTZXQpIHtcbiAgICAgICAgICAgIGVuY291bnRlcmVkU3ByaW5nQm9uZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9pbnNlcnRKb2ludFNvcnQoZGVwU3ByaW5nQm9uZSwgc3ByaW5nQm9uZXNUcmllZCwgc3ByaW5nQm9uZXNEb25lLCBzcHJpbmdCb25lT3JkZXIsIGFuY2VzdG9ycyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKCFlbmNvdW50ZXJlZFNwcmluZ0JvbmUpIHtcbiAgICAgICAgICAvLyBUaGlzIG9iamVjdCBpcyBhbiBhbmNlc3RvciBvZiBhIHNwcmluZyBib25lLCBidXQgaXMgTk9UIGEgc3BhcnNlIG5vZGUgaW4gYmV0d2VlbiBzcHJpbmcgYm9uZXMuXG4gICAgICAgICAgYW5jZXN0b3IgPSBkZXBPYmplY3RBbmNlc3RvcjtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAoYW5jZXN0b3IpIHtcbiAgICAgICAgYW5jZXN0b3JzLmFkZChhbmNlc3Rvcik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc3ByaW5nQm9uZU9yZGVyLnB1c2goc3ByaW5nQm9uZSk7XG5cbiAgICBzcHJpbmdCb25lc0RvbmUuYWRkKHNwcmluZ0JvbmUpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVsZXZhbnRDaGlsZHJlblVwZGF0ZWQob2JqZWN0OiBUSFJFRS5PYmplY3QzRCkge1xuICAgIC8vIGlmIHRoZSBvYmplY3QgaGFzIGF0dGFjaGVkIHNwcmluZ2JvbmUsIGhhbHQgdGhlIHRyYXZlcnNhbFxuICAgIGlmICgodGhpcy5fb2JqZWN0U3ByaW5nQm9uZXNNYXAuZ2V0KG9iamVjdCk/LnNpemUgPz8gMCkgPiAwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBvdGhlcndpc2UgdXBkYXRlIGl0cyB3b3JsZCBtYXRyaXhcbiAgICBvYmplY3QudXBkYXRlV29ybGRNYXRyaXgoZmFsc2UsIGZhbHNlKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7O0FDQUEsSUFBQUEsU0FBdUI7OztBQ0F2QixZQUF1Qjs7O0FDS2hCLElBQWUsNkJBQWYsTUFBMEM7QUEyQmpEOzs7QUQ3QkEsSUFBTSxPQUFPLElBQVUsY0FBUTtBQUMvQixJQUFNLE9BQU8sSUFBVSxjQUFRO0FBRXhCLElBQU0sb0NBQU4sY0FBZ0QsMkJBQTJCO0FBQUEsRUFDaEYsSUFBVyxPQUFrQjtBQUMzQixXQUFPO0FBQUEsRUFDVDtBQUFBLEVBc0JPLFlBQVksUUFBOEY7QUEvQm5IO0FBZ0NJLFVBQU07QUFFTixTQUFLLFVBQVMsc0NBQVEsV0FBUixZQUFrQixJQUFVLGNBQVEsR0FBSyxHQUFLLENBQUc7QUFDL0QsU0FBSyxRQUFPLHNDQUFRLFNBQVIsWUFBZ0IsSUFBVSxjQUFRLEdBQUssR0FBSyxDQUFHO0FBQzNELFNBQUssVUFBUyxzQ0FBUSxXQUFSLFlBQWtCO0FBQ2hDLFNBQUssVUFBUyxzQ0FBUSxXQUFSLFlB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Q1Q7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRjtBQTFrQmEsMkJBQ1ksaUJBQWlCO0FBRG5DLElBQU0sNEJBQU47IiwKICAibmFtZXMiOiBbIlRIUkVFIiwgIlRIUkVFIiwgIl92M0EiLCAiVEhSRUUiLCAiX3YzQSIsICJUSFJFRSIsICJfdjNBIiwgIlRIUkVFIiwgIlRIUkVFIiwgIl92M0EiLCAiVEhSRUUiLCAiVEhSRUUiLCAiX3YzQSIsICJUSFJFRSIsICJUSFJFRSIsICJUSFJFRSIsICJUSFJFRSIsICJUSFJFRSIsICJTSU5HVUxBUklUWV9FUFNJTE9OIiwgIlRIUkVFIiwgIkFSQ19TRUdNRU5UUyIsICJUSFJFRSIsICJTSU5HVUxBUklUWV9FUFNJTE9OIiwgIlRIUkVFIiwgIkFSQ19TRUdNRU5UUyIsICJUSFJFRSIsICJUSFJFRSIsICJUSFJFRSIsICJUSFJFRSIsICJUSFJFRSIsICJfdjNBIiwgIl92M0IiLCAiVEhSRUUiLCAiX2EiLCAiX2IiLCAiX2MiLCAiX2QiLCAiX2UiXQp9Cg==
