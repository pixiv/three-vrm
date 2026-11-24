/*!
 * @pixiv/three-vrm-springbone v3.6.0
 * Spring bone module for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2026 pixiv Inc.
 * @pixiv/three-vrm-springbone is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
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

// src/helpers/VRMSpringBoneColliderHelper.ts
import * as THREE7 from "three";

// src/VRMSpringBoneColliderShapeCapsule.ts
import * as THREE from "three";

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
import * as THREE2 from "three";
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
import * as THREE3 from "three";
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
import * as THREE4 from "three";
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
import * as THREE5 from "three";
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
import * as THREE6 from "three";
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
import * as THREE9 from "three";

// src/helpers/utils/SpringBoneBufferGeometry.ts
import * as THREE8 from "three";
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
import * as THREE17 from "three";

// src/VRMSpringBoneLimitCone.ts
import * as THREE11 from "three";

// src/VRMSpringBoneLimit.ts
import * as THREE10 from "three";
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
import * as THREE12 from "three";
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
import * as THREE13 from "three";
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
import * as THREE14 from "three";
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
import * as THREE15 from "three";
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
import * as THREE16 from "three";
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
import * as THREE18 from "three";
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
import * as THREE22 from "three";

// src/utils/Matrix4InverseCache.ts
import * as THREE20 from "three";

// src/utils/mat4InvertCompat.ts
import * as THREE19 from "three";
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
import * as THREE21 from "three";
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
import * as THREE23 from "three";

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
export {
  VRMSpringBoneCollider,
  VRMSpringBoneColliderHelper,
  VRMSpringBoneColliderShape,
  VRMSpringBoneColliderShapeCapsule,
  VRMSpringBoneColliderShapePlane,
  VRMSpringBoneColliderShapeSphere,
  VRMSpringBoneJoint,
  VRMSpringBoneJointHelper,
  VRMSpringBoneLimit,
  VRMSpringBoneLimitCone,
  VRMSpringBoneLimitHelper,
  VRMSpringBoneLimitHinge,
  VRMSpringBoneLimitSpherical,
  VRMSpringBoneLoaderPlugin,
  VRMSpringBoneManager
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2hlbHBlcnMvVlJNU3ByaW5nQm9uZUNvbGxpZGVySGVscGVyLnRzIiwgIi4uL3NyYy9WUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZUNhcHN1bGUudHMiLCAiLi4vc3JjL1ZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlLnRzIiwgIi4uL3NyYy9WUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZVBsYW5lLnRzIiwgIi4uL3NyYy9WUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZVNwaGVyZS50cyIsICIuLi9zcmMvaGVscGVycy91dGlscy9Db2xsaWRlclNoYXBlQ2Fwc3VsZUJ1ZmZlckdlb21ldHJ5LnRzIiwgIi4uL3NyYy9oZWxwZXJzL3V0aWxzL0NvbGxpZGVyU2hhcGVQbGFuZUJ1ZmZlckdlb21ldHJ5LnRzIiwgIi4uL3NyYy9oZWxwZXJzL3V0aWxzL0NvbGxpZGVyU2hhcGVTcGhlcmVCdWZmZXJHZW9tZXRyeS50cyIsICIuLi9zcmMvaGVscGVycy9WUk1TcHJpbmdCb25lSm9pbnRIZWxwZXIudHMiLCAiLi4vc3JjL2hlbHBlcnMvdXRpbHMvU3ByaW5nQm9uZUJ1ZmZlckdlb21ldHJ5LnRzIiwgIi4uL3NyYy9oZWxwZXJzL1ZSTVNwcmluZ0JvbmVMaW1pdEhlbHBlci50cyIsICIuLi9zcmMvVlJNU3ByaW5nQm9uZUxpbWl0Q29uZS50cyIsICIuLi9zcmMvVlJNU3ByaW5nQm9uZUxpbWl0LnRzIiwgIi4uL3NyYy9oZWxwZXJzL3V0aWxzL0xpbWl0Q29uZUJ1ZmZlckdlb21ldHJ5LnRzIiwgIi4uL3NyYy9WUk1TcHJpbmdCb25lTGltaXRIaW5nZS50cyIsICIuLi9zcmMvaGVscGVycy91dGlscy9MaW1pdEhpbmdlQnVmZmVyR2VvbWV0cnkudHMiLCAiLi4vc3JjL1ZSTVNwcmluZ0JvbmVMaW1pdFNwaGVyaWNhbC50cyIsICIuLi9zcmMvaGVscGVycy91dGlscy9MaW1pdFNwaGVyaWNhbEJ1ZmZlckdlb21ldHJ5LnRzIiwgIi4uL3NyYy9WUk1TcHJpbmdCb25lQ29sbGlkZXIudHMiLCAiLi4vc3JjL1ZSTVNwcmluZ0JvbmVKb2ludC50cyIsICIuLi9zcmMvdXRpbHMvTWF0cml4NEludmVyc2VDYWNoZS50cyIsICIuLi9zcmMvdXRpbHMvbWF0NEludmVydENvbXBhdC50cyIsICIuLi9zcmMvdXRpbHMvZ2V0V29ybGRRdWF0ZXJuaW9uTGl0ZS50cyIsICIuLi9zcmMvVlJNU3ByaW5nQm9uZUxvYWRlclBsdWdpbi50cyIsICIuLi9zcmMvdXRpbHMvdHJhdmVyc2VBbmNlc3RvcnNGcm9tUm9vdC50cyIsICIuLi9zcmMvdXRpbHMvdHJhdmVyc2VDaGlsZHJlblVudGlsQ29uZGl0aW9uTWV0LnRzIiwgIi4uL3NyYy91dGlscy9sb3dlc3RDb21tb25BbmNlc3Rvci50cyIsICIuLi9zcmMvVlJNU3ByaW5nQm9uZU1hbmFnZXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlciB9IGZyb20gJy4uL1ZSTVNwcmluZ0JvbmVDb2xsaWRlcic7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZUNhcHN1bGUgfSBmcm9tICcuLi9WUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZUNhcHN1bGUnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVQbGFuZSB9IGZyb20gJy4uL1ZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlUGxhbmUnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVTcGhlcmUgfSBmcm9tICcuLi9WUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZVNwaGVyZSc7XG5pbXBvcnQgeyBDb2xsaWRlclNoYXBlQnVmZmVyR2VvbWV0cnkgfSBmcm9tICcuL3V0aWxzL0NvbGxpZGVyU2hhcGVCdWZmZXJHZW9tZXRyeSc7XG5pbXBvcnQgeyBDb2xsaWRlclNoYXBlQ2Fwc3VsZUJ1ZmZlckdlb21ldHJ5IH0gZnJvbSAnLi91dGlscy9Db2xsaWRlclNoYXBlQ2Fwc3VsZUJ1ZmZlckdlb21ldHJ5JztcbmltcG9ydCB7IENvbGxpZGVyU2hhcGVQbGFuZUJ1ZmZlckdlb21ldHJ5IH0gZnJvbSAnLi91dGlscy9Db2xsaWRlclNoYXBlUGxhbmVCdWZmZXJHZW9tZXRyeSc7XG5pbXBvcnQgeyBDb2xsaWRlclNoYXBlU3BoZXJlQnVmZmVyR2VvbWV0cnkgfSBmcm9tICcuL3V0aWxzL0NvbGxpZGVyU2hhcGVTcGhlcmVCdWZmZXJHZW9tZXRyeSc7XG5cbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5leHBvcnQgY2xhc3MgVlJNU3ByaW5nQm9uZUNvbGxpZGVySGVscGVyIGV4dGVuZHMgVEhSRUUuR3JvdXAge1xuICBwdWJsaWMgcmVhZG9ubHkgY29sbGlkZXI6IFZSTVNwcmluZ0JvbmVDb2xsaWRlcjtcbiAgcHJpdmF0ZSByZWFkb25seSBfZ2VvbWV0cnk6IENvbGxpZGVyU2hhcGVCdWZmZXJHZW9tZXRyeTtcbiAgcHJpdmF0ZSByZWFkb25seSBfbGluZTogVEhSRUUuTGluZVNlZ21lbnRzO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb2xsaWRlcjogVlJNU3ByaW5nQm9uZUNvbGxpZGVyKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLm1hdHJpeEF1dG9VcGRhdGUgPSBmYWxzZTtcblxuICAgIHRoaXMuY29sbGlkZXIgPSBjb2xsaWRlcjtcblxuICAgIGlmICh0aGlzLmNvbGxpZGVyLnNoYXBlIGluc3RhbmNlb2YgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVTcGhlcmUpIHtcbiAgICAgIHRoaXMuX2dlb21ldHJ5ID0gbmV3IENvbGxpZGVyU2hhcGVTcGhlcmVCdWZmZXJHZW9tZXRyeSh0aGlzLmNvbGxpZGVyLnNoYXBlKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY29sbGlkZXIuc2hhcGUgaW5zdGFuY2VvZiBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZUNhcHN1bGUpIHtcbiAgICAgIHRoaXMuX2dlb21ldHJ5ID0gbmV3IENvbGxpZGVyU2hhcGVDYXBzdWxlQnVmZmVyR2VvbWV0cnkodGhpcy5jb2xsaWRlci5zaGFwZSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNvbGxpZGVyLnNoYXBlIGluc3RhbmNlb2YgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVQbGFuZSkge1xuICAgICAgdGhpcy5fZ2VvbWV0cnkgPSBuZXcgQ29sbGlkZXJTaGFwZVBsYW5lQnVmZmVyR2VvbWV0cnkodGhpcy5jb2xsaWRlci5zaGFwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVlJNU3ByaW5nQm9uZUNvbGxpZGVySGVscGVyOiBVbmtub3duIGNvbGxpZGVyIHNoYXBlIHR5cGUgZGV0ZWN0ZWQnKTtcbiAgICB9XG5cbiAgICBjb25zdCBtYXRlcmlhbCA9IG5ldyBUSFJFRS5MaW5lQmFzaWNNYXRlcmlhbCh7XG4gICAgICBjb2xvcjogMHhmZjAwZmYsXG4gICAgICBkZXB0aFRlc3Q6IGZhbHNlLFxuICAgICAgZGVwdGhXcml0ZTogZmFsc2UsXG4gICAgfSk7XG5cbiAgICB0aGlzLl9saW5lID0gbmV3IFRIUkVFLkxpbmVTZWdtZW50cyh0aGlzLl9nZW9tZXRyeSwgbWF0ZXJpYWwpO1xuICAgIHRoaXMuYWRkKHRoaXMuX2xpbmUpO1xuICB9XG5cbiAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5fZ2VvbWV0cnkuZGlzcG9zZSgpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZU1hdHJpeFdvcmxkKGZvcmNlOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5jb2xsaWRlci51cGRhdGVXb3JsZE1hdHJpeCh0cnVlLCBmYWxzZSk7XG5cbiAgICB0aGlzLm1hdHJpeC5jb3B5KHRoaXMuY29sbGlkZXIubWF0cml4V29ybGQpO1xuXG4gICAgY29uc3QgbWF0cml4V29ybGRFbGVtZW50cyA9IHRoaXMubWF0cml4LmVsZW1lbnRzO1xuICAgIHRoaXMuX2dlb21ldHJ5LndvcmxkU2NhbGUgPSBfdjNBXG4gICAgICAuc2V0KG1hdHJpeFdvcmxkRWxlbWVudHNbMF0sIG1hdHJpeFdvcmxkRWxlbWVudHNbMV0sIG1hdHJpeFdvcmxkRWxlbWVudHNbMl0pXG4gICAgICAubGVuZ3RoKCk7IC8vIGNhbGN1bGF0ZSBzY2FsZSBvZiB4IGNvbXBvbmVudFxuXG4gICAgdGhpcy5fZ2VvbWV0cnkudXBkYXRlKCk7XG5cbiAgICBzdXBlci51cGRhdGVNYXRyaXhXb3JsZChmb3JjZSk7XG4gIH1cbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZSB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGUnO1xuXG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF92M0IgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5leHBvcnQgY2xhc3MgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVDYXBzdWxlIGV4dGVuZHMgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGUge1xuICBwdWJsaWMgZ2V0IHR5cGUoKTogJ2NhcHN1bGUnIHtcbiAgICByZXR1cm4gJ2NhcHN1bGUnO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBvZmZzZXQgb2YgdGhlIGNhcHN1bGUgaGVhZCBmcm9tIHRoZSBvcmlnaW4gaW4gbG9jYWwgc3BhY2UuXG4gICAqL1xuICBwdWJsaWMgb2Zmc2V0OiBUSFJFRS5WZWN0b3IzO1xuXG4gIC8qKlxuICAgKiBUaGUgb2Zmc2V0IG9mIHRoZSBjYXBzdWxlIHRhaWwgZnJvbSB0aGUgb3JpZ2luIGluIGxvY2FsIHNwYWNlLlxuICAgKi9cbiAgcHVibGljIHRhaWw6IFRIUkVFLlZlY3RvcjM7XG5cbiAgLyoqXG4gICAqIFRoZSByYWRpdXMgb2YgdGhlIGNhcHN1bGUuXG4gICAqL1xuICBwdWJsaWMgcmFkaXVzOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIElmIHRydWUsIHRoZSBjb2xsaWRlciBwcmV2ZW50cyBzcHJpbmcgYm9uZXMgZnJvbSBnb2luZyBvdXRzaWRlIG9mIHRoZSBjYXBzdWxlIGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgaW5zaWRlOiBib29sZWFuO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJhbXM/OiB7IHJhZGl1cz86IG51bWJlcjsgb2Zmc2V0PzogVEhSRUUuVmVjdG9yMzsgdGFpbD86IFRIUkVFLlZlY3RvcjM7IGluc2lkZT86IGJvb2xlYW4gfSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLm9mZnNldCA9IHBhcmFtcz8ub2Zmc2V0ID8/IG5ldyBUSFJFRS5WZWN0b3IzKDAuMCwgMC4wLCAwLjApO1xuICAgIHRoaXMudGFpbCA9IHBhcmFtcz8udGFpbCA/PyBuZXcgVEhSRUUuVmVjdG9yMygwLjAsIDAuMCwgMC4wKTtcbiAgICB0aGlzLnJhZGl1cyA9IHBhcmFtcz8ucmFkaXVzID8/IDAuMDtcbiAgICB0aGlzLmluc2lkZSA9IHBhcmFtcz8uaW5zaWRlID8/IGZhbHNlO1xuICB9XG5cbiAgcHVibGljIGNhbGN1bGF0ZUNvbGxpc2lvbihcbiAgICBjb2xsaWRlck1hdHJpeDogVEhSRUUuTWF0cml4NCxcbiAgICBvYmplY3RQb3NpdGlvbjogVEhSRUUuVmVjdG9yMyxcbiAgICBvYmplY3RSYWRpdXM6IG51bWJlcixcbiAgICB0YXJnZXQ6IFRIUkVFLlZlY3RvcjMsXG4gICk6IG51bWJlciB7XG4gICAgX3YzQS5zZXRGcm9tTWF0cml4UG9zaXRpb24oY29sbGlkZXJNYXRyaXgpOyAvLyB0cmFuc2Zvcm1lZCBoZWFkXG4gICAgX3YzQi5zdWJWZWN0b3JzKHRoaXMudGFpbCwgdGhpcy5vZmZzZXQpLmFwcGx5TWF0cml4NChjb2xsaWRlck1hdHJpeCk7IC8vIHRyYW5zZm9ybWVkIHRhaWxcbiAgICBfdjNCLnN1YihfdjNBKTsgLy8gZnJvbSBoZWFkIHRvIHRhaWxcbiAgICBjb25zdCBsZW5ndGhTcUNhcHN1bGUgPSBfdjNCLmxlbmd0aFNxKCk7XG5cbiAgICB0YXJnZXQuY29weShvYmplY3RQb3NpdGlvbikuc3ViKF92M0EpOyAvLyBmcm9tIGhlYWQgdG8gb2JqZWN0XG4gICAgY29uc3QgZG90ID0gX3YzQi5kb3QodGFyZ2V0KTsgLy8gZG90IHByb2R1Y3Qgb2Ygb2Zmc2V0VG9UYWlsIGFuZCBvZmZzZXRUb09iamVjdFxuXG4gICAgaWYgKGRvdCA8PSAwLjApIHtcbiAgICAgIC8vIGlmIG9iamVjdCBpcyBuZWFyIGZyb20gdGhlIGhlYWRcbiAgICAgIC8vIGRvIG5vdGhpbmcsIHVzZSB0aGUgY3VycmVudCB2YWx1ZSBkaXJlY3RseVxuICAgIH0gZWxzZSBpZiAobGVuZ3RoU3FDYXBzdWxlIDw9IGRvdCkge1xuICAgICAgLy8gaWYgb2JqZWN0IGlzIG5lYXIgZnJvbSB0aGUgdGFpbFxuICAgICAgdGFyZ2V0LnN1YihfdjNCKTsgLy8gZnJvbSB0YWlsIHRvIG9iamVjdFxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpZiBvYmplY3QgaXMgYmV0d2VlbiB0d28gZW5kc1xuICAgICAgX3YzQi5tdWx0aXBseVNjYWxhcihkb3QgLyBsZW5ndGhTcUNhcHN1bGUpOyAvLyBmcm9tIGhlYWQgdG8gdGhlIG5lYXJlc3QgcG9pbnQgb2YgdGhlIHNoYWZ0XG4gICAgICB0YXJnZXQuc3ViKF92M0IpOyAvLyBmcm9tIHRoZSBzaGFmdCBwb2ludCB0byBvYmplY3RcbiAgICB9XG5cbiAgICBjb25zdCBsZW5ndGggPSB0YXJnZXQubGVuZ3RoKCk7XG4gICAgY29uc3QgZGlzdGFuY2UgPSB0aGlzLmluc2lkZSA/IHRoaXMucmFkaXVzIC0gb2JqZWN0UmFkaXVzIC0gbGVuZ3RoIDogbGVuZ3RoIC0gb2JqZWN0UmFkaXVzIC0gdGhpcy5yYWRpdXM7XG5cbiAgICBpZiAoZGlzdGFuY2UgPCAwKSB7XG4gICAgICB0YXJnZXQubXVsdGlwbHlTY2FsYXIoMSAvIGxlbmd0aCk7IC8vIGNvbnZlcnQgdGhlIGRlbHRhIHRvIHRoZSBkaXJlY3Rpb25cbiAgICAgIGlmICh0aGlzLmluc2lkZSkge1xuICAgICAgICB0YXJnZXQubmVnYXRlKCk7IC8vIGlmIGluc2lkZSwgcmV2ZXJzZSB0aGUgZGlyZWN0aW9uXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpc3RhbmNlO1xuICB9XG59XG4iLCAiaW1wb3J0IHR5cGUgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHNoYXBlIG9mIGEgY29sbGlkZXIuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZSB7XG4gIC8qKlxuICAgKiBUaGUgdHlwZSBvZiB0aGUgc2hhcGUuXG4gICAqL1xuICBwdWJsaWMgYWJzdHJhY3QgZ2V0IHR5cGUoKTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgb2Zmc2V0IHRvIHRoZSBzaGFwZS5cbiAgICovXG4gIHB1YmxpYyBvZmZzZXQ/OiBUSFJFRS5WZWN0b3IzO1xuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgYSBkaXN0YW5jZSBhbmQgYSBkaXJlY3Rpb24gZnJvbSB0aGUgY29sbGlkZXIgdG8gYSB0YXJnZXQgb2JqZWN0LlxuICAgKiBJdCdzIGhpdCBpZiB0aGUgZGlzdGFuY2UgaXMgbmVnYXRpdmUuXG4gICAqIFRoZSBkaXJlY3Rpb24gd2lsbCBiZSBjb250YWluZWQgaW4gdGhlIGdpdmVuIHRhcmdldCB2ZWN0b3IuXG4gICAqXG4gICAqIEBwYXJhbSBjb2xsaWRlck1hdHJpeCBBIG1hdHJpeCByZXByZXNlbnRzIHRoZSB0cmFuc2Zvcm0gb2YgdGhlIGNvbGxpZGVyXG4gICAqIEBwYXJhbSBvYmplY3RQb3NpdGlvbiBBIHZlY3RvciByZXByZXNlbnRzIHRoZSBwb3NpdGlvbiBvZiB0aGUgdGFyZ2V0IG9iamVjdFxuICAgKiBAcGFyYW0gb2JqZWN0UmFkaXVzIFRoZSByYWRpdXMgb2YgdGhlIG9iamVjdFxuICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSByZXN1bHQgZGlyZWN0aW9uIHdpbGwgYmUgY29udGFpbmVkIGluIHRoaXMgdmVjdG9yXG4gICAqL1xuICBwdWJsaWMgYWJzdHJhY3QgY2FsY3VsYXRlQ29sbGlzaW9uKFxuICAgIGNvbGxpZGVyTWF0cml4OiBUSFJFRS5NYXRyaXg0LFxuICAgIG9iamVjdFBvc2l0aW9uOiBUSFJFRS5WZWN0b3IzLFxuICAgIG9iamVjdFJhZGl1czogbnVtYmVyLFxuICAgIHRhcmdldDogVEhSRUUuVmVjdG9yMyxcbiAgKTogbnVtYmVyO1xufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZSc7XG5cbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX21hdDNBID0gbmV3IFRIUkVFLk1hdHJpeDMoKTtcblxuZXhwb3J0IGNsYXNzIFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlUGxhbmUgZXh0ZW5kcyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZSB7XG4gIHB1YmxpYyBnZXQgdHlwZSgpOiAncGxhbmUnIHtcbiAgICByZXR1cm4gJ3BsYW5lJztcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgb2Zmc2V0IG9mIHRoZSBwbGFuZSBmcm9tIHRoZSBvcmlnaW4gaW4gbG9jYWwgc3BhY2UuXG4gICAqL1xuICBwdWJsaWMgb2Zmc2V0OiBUSFJFRS5WZWN0b3IzO1xuXG4gIC8qKlxuICAgKiBUaGUgbm9ybWFsIG9mIHRoZSBwbGFuZSBpbiBsb2NhbCBzcGFjZS4gTXVzdCBiZSBub3JtYWxpemVkLlxuICAgKi9cbiAgcHVibGljIG5vcm1hbDogVEhSRUUuVmVjdG9yMztcblxuICBwdWJsaWMgY29uc3RydWN0b3IocGFyYW1zPzogeyBvZmZzZXQ/OiBUSFJFRS5WZWN0b3IzOyBub3JtYWw/OiBUSFJFRS5WZWN0b3IzIH0pIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5vZmZzZXQgPSBwYXJhbXM/Lm9mZnNldCA/PyBuZXcgVEhSRUUuVmVjdG9yMygwLjAsIDAuMCwgMC4wKTtcbiAgICB0aGlzLm5vcm1hbCA9IHBhcmFtcz8ubm9ybWFsID8/IG5ldyBUSFJFRS5WZWN0b3IzKDAuMCwgMC4wLCAxLjApO1xuICB9XG5cbiAgcHVibGljIGNhbGN1bGF0ZUNvbGxpc2lvbihcbiAgICBjb2xsaWRlck1hdHJpeDogVEhSRUUuTWF0cml4NCxcbiAgICBvYmplY3RQb3NpdGlvbjogVEhSRUUuVmVjdG9yMyxcbiAgICBvYmplY3RSYWRpdXM6IG51bWJlcixcbiAgICB0YXJnZXQ6IFRIUkVFLlZlY3RvcjMsXG4gICk6IG51bWJlciB7XG4gICAgdGFyZ2V0LnNldEZyb21NYXRyaXhQb3NpdGlvbihjb2xsaWRlck1hdHJpeCk7IC8vIHRyYW5zZm9ybWVkIG9mZnNldFxuICAgIHRhcmdldC5uZWdhdGUoKS5hZGQob2JqZWN0UG9zaXRpb24pOyAvLyBhIHZlY3RvciBmcm9tIGNvbGxpZGVyIGNlbnRlciB0byBvYmplY3QgcG9zaXRpb25cblxuICAgIF9tYXQzQS5nZXROb3JtYWxNYXRyaXgoY29sbGlkZXJNYXRyaXgpOyAvLyBjb252ZXJ0IHRoZSBjb2xsaWRlciBtYXRyaXggdG8gdGhlIG5vcm1hbCBtYXRyaXhcbiAgICBfdjNBLmNvcHkodGhpcy5ub3JtYWwpLmFwcGx5Tm9ybWFsTWF0cml4KF9tYXQzQSkubm9ybWFsaXplKCk7IC8vIHRyYW5zZm9ybWVkIG5vcm1hbFxuICAgIGNvbnN0IGRpc3RhbmNlID0gdGFyZ2V0LmRvdChfdjNBKSAtIG9iamVjdFJhZGl1cztcblxuICAgIHRhcmdldC5jb3B5KF92M0EpOyAvLyBjb252ZXJ0IHRoZSBkZWx0YSB0byB0aGUgZGlyZWN0aW9uXG5cbiAgICByZXR1cm4gZGlzdGFuY2U7XG4gIH1cbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZSB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGUnO1xuXG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuZXhwb3J0IGNsYXNzIFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlU3BoZXJlIGV4dGVuZHMgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGUge1xuICBwdWJsaWMgZ2V0IHR5cGUoKTogJ3NwaGVyZScge1xuICAgIHJldHVybiAnc3BoZXJlJztcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgb2Zmc2V0IG9mIHRoZSBzcGhlcmUgZnJvbSB0aGUgb3JpZ2luIGluIGxvY2FsIHNwYWNlLlxuICAgKi9cbiAgcHVibGljIG9mZnNldDogVEhSRUUuVmVjdG9yMztcblxuICAvKipcbiAgICogVGhlIHJhZGl1cy5cbiAgICovXG4gIHB1YmxpYyByYWRpdXM6IG51bWJlcjtcblxuICAvKipcbiAgICogSWYgdHJ1ZSwgdGhlIGNvbGxpZGVyIHByZXZlbnRzIHNwcmluZyBib25lcyBmcm9tIGdvaW5nIG91dHNpZGUgb2YgdGhlIHNwaGVyZSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIGluc2lkZTogYm9vbGVhbjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IocGFyYW1zPzogeyByYWRpdXM/OiBudW1iZXI7IG9mZnNldD86IFRIUkVFLlZlY3RvcjM7IGluc2lkZT86IGJvb2xlYW4gfSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLm9mZnNldCA9IHBhcmFtcz8ub2Zmc2V0ID8/IG5ldyBUSFJFRS5WZWN0b3IzKDAuMCwgMC4wLCAwLjApO1xuICAgIHRoaXMucmFkaXVzID0gcGFyYW1zPy5yYWRpdXMgPz8gMC4wO1xuICAgIHRoaXMuaW5zaWRlID0gcGFyYW1zPy5pbnNpZGUgPz8gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgY2FsY3VsYXRlQ29sbGlzaW9uKFxuICAgIGNvbGxpZGVyTWF0cml4OiBUSFJFRS5NYXRyaXg0LFxuICAgIG9iamVjdFBvc2l0aW9uOiBUSFJFRS5WZWN0b3IzLFxuICAgIG9iamVjdFJhZGl1czogbnVtYmVyLFxuICAgIHRhcmdldDogVEhSRUUuVmVjdG9yMyxcbiAgKTogbnVtYmVyIHtcbiAgICB0YXJnZXQuc3ViVmVjdG9ycyhvYmplY3RQb3NpdGlvbiwgX3YzQS5zZXRGcm9tTWF0cml4UG9zaXRpb24oY29sbGlkZXJNYXRyaXgpKTtcblxuICAgIGNvbnN0IGxlbmd0aCA9IHRhcmdldC5sZW5ndGgoKTtcbiAgICBjb25zdCBkaXN0YW5jZSA9IHRoaXMuaW5zaWRlID8gdGhpcy5yYWRpdXMgLSBvYmplY3RSYWRpdXMgLSBsZW5ndGggOiBsZW5ndGggLSBvYmplY3RSYWRpdXMgLSB0aGlzLnJhZGl1cztcblxuICAgIGlmIChkaXN0YW5jZSA8IDApIHtcbiAgICAgIHRhcmdldC5tdWx0aXBseVNjYWxhcigxIC8gbGVuZ3RoKTsgLy8gY29udmVydCB0aGUgZGVsdGEgdG8gdGhlIGRpcmVjdGlvblxuICAgICAgaWYgKHRoaXMuaW5zaWRlKSB7XG4gICAgICAgIHRhcmdldC5uZWdhdGUoKTsgLy8gaWYgaW5zaWRlLCByZXZlcnNlIHRoZSBkaXJlY3Rpb25cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGlzdGFuY2U7XG4gIH1cbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZUNhcHN1bGUgfSBmcm9tICcuLi8uLi9WUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZUNhcHN1bGUnO1xuaW1wb3J0IHsgQ29sbGlkZXJTaGFwZUJ1ZmZlckdlb21ldHJ5IH0gZnJvbSAnLi9Db2xsaWRlclNoYXBlQnVmZmVyR2VvbWV0cnknO1xuXG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuZXhwb3J0IGNsYXNzIENvbGxpZGVyU2hhcGVDYXBzdWxlQnVmZmVyR2VvbWV0cnkgZXh0ZW5kcyBUSFJFRS5CdWZmZXJHZW9tZXRyeSBpbXBsZW1lbnRzIENvbGxpZGVyU2hhcGVCdWZmZXJHZW9tZXRyeSB7XG4gIHB1YmxpYyB3b3JsZFNjYWxlID0gMS4wO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgX2F0dHJQb3M6IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZTtcbiAgcHJpdmF0ZSByZWFkb25seSBfYXR0ckluZGV4OiBUSFJFRS5CdWZmZXJBdHRyaWJ1dGU7XG4gIHByaXZhdGUgcmVhZG9ubHkgX3NoYXBlOiBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZUNhcHN1bGU7XG4gIHByaXZhdGUgX2N1cnJlbnRSYWRpdXMgPSAwO1xuICBwcml2YXRlIHJlYWRvbmx5IF9jdXJyZW50T2Zmc2V0ID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbiAgcHJpdmF0ZSByZWFkb25seSBfY3VycmVudFRhaWwgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihzaGFwZTogVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVDYXBzdWxlKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuX3NoYXBlID0gc2hhcGU7XG5cbiAgICB0aGlzLl9hdHRyUG9zID0gbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShuZXcgRmxvYXQzMkFycmF5KDM5NiksIDMpO1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKCdwb3NpdGlvbicsIHRoaXMuX2F0dHJQb3MpO1xuXG4gICAgdGhpcy5fYXR0ckluZGV4ID0gbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShuZXcgVWludDE2QXJyYXkoMjY0KSwgMSk7XG4gICAgdGhpcy5zZXRJbmRleCh0aGlzLl9hdHRySW5kZXgpO1xuXG4gICAgdGhpcy5fYnVpbGRJbmRleCgpO1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIGxldCBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IGZhbHNlO1xuXG4gICAgY29uc3QgcmFkaXVzID0gdGhpcy5fc2hhcGUucmFkaXVzIC8gdGhpcy53b3JsZFNjYWxlO1xuICAgIGlmICh0aGlzLl9jdXJyZW50UmFkaXVzICE9PSByYWRpdXMpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRSYWRpdXMgPSByYWRpdXM7XG4gICAgICBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9jdXJyZW50T2Zmc2V0LmVxdWFscyh0aGlzLl9zaGFwZS5vZmZzZXQpKSB7XG4gICAgICB0aGlzLl9jdXJyZW50T2Zmc2V0LmNvcHkodGhpcy5fc2hhcGUub2Zmc2V0KTtcbiAgICAgIHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBjb25zdCB0YWlsID0gX3YzQS5jb3B5KHRoaXMuX3NoYXBlLnRhaWwpLmRpdmlkZVNjYWxhcih0aGlzLndvcmxkU2NhbGUpO1xuICAgIGlmICh0aGlzLl9jdXJyZW50VGFpbC5kaXN0YW5jZVRvU3F1YXJlZCh0YWlsKSA+IDFlLTEwKSB7XG4gICAgICB0aGlzLl9jdXJyZW50VGFpbC5jb3B5KHRhaWwpO1xuICAgICAgc2hvdWxkVXBkYXRlR2VvbWV0cnkgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmIChzaG91bGRVcGRhdGVHZW9tZXRyeSkge1xuICAgICAgdGhpcy5fYnVpbGRQb3NpdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2J1aWxkUG9zaXRpb24oKTogdm9pZCB7XG4gICAgX3YzQS5jb3B5KHRoaXMuX2N1cnJlbnRUYWlsKS5zdWIodGhpcy5fY3VycmVudE9mZnNldCk7XG4gICAgY29uc3QgbCA9IF92M0EubGVuZ3RoKCkgLyB0aGlzLl9jdXJyZW50UmFkaXVzO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gMTY7IGkrKykge1xuICAgICAgY29uc3QgdCA9IChpIC8gMTYuMCkgKiBNYXRoLlBJO1xuXG4gICAgICB0aGlzLl9hdHRyUG9zLnNldFhZWihpLCAtTWF0aC5zaW4odCksIC1NYXRoLmNvcyh0KSwgMC4wKTtcbiAgICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKDE3ICsgaSwgbCArIE1hdGguc2luKHQpLCBNYXRoLmNvcyh0KSwgMC4wKTtcbiAgICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKDM0ICsgaSwgLU1hdGguc2luKHQpLCAwLjAsIC1NYXRoLmNvcyh0KSk7XG4gICAgICB0aGlzLl9hdHRyUG9zLnNldFhZWig1MSArIGksIGwgKyBNYXRoLnNpbih0KSwgMC4wLCBNYXRoLmNvcyh0KSk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzMjsgaSsrKSB7XG4gICAgICBjb25zdCB0ID0gKGkgLyAxNi4wKSAqIE1hdGguUEk7XG4gICAgICB0aGlzLl9hdHRyUG9zLnNldFhZWig2OCArIGksIDAuMCwgTWF0aC5zaW4odCksIE1hdGguY29zKHQpKTtcbiAgICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKDEwMCArIGksIGwsIE1hdGguc2luKHQpLCBNYXRoLmNvcyh0KSk7XG4gICAgfVxuXG4gICAgY29uc3QgdGhldGEgPSBNYXRoLmF0YW4yKF92M0EueSwgTWF0aC5zcXJ0KF92M0EueCAqIF92M0EueCArIF92M0EueiAqIF92M0EueikpO1xuICAgIGNvbnN0IHBoaSA9IC1NYXRoLmF0YW4yKF92M0EueiwgX3YzQS54KTtcblxuICAgIHRoaXMucm90YXRlWih0aGV0YSk7XG4gICAgdGhpcy5yb3RhdGVZKHBoaSk7XG4gICAgdGhpcy5zY2FsZSh0aGlzLl9jdXJyZW50UmFkaXVzLCB0aGlzLl9jdXJyZW50UmFkaXVzLCB0aGlzLl9jdXJyZW50UmFkaXVzKTtcbiAgICB0aGlzLnRyYW5zbGF0ZSh0aGlzLl9jdXJyZW50T2Zmc2V0LngsIHRoaXMuX2N1cnJlbnRPZmZzZXQueSwgdGhpcy5fY3VycmVudE9mZnNldC56KTtcblxuICAgIHRoaXMuX2F0dHJQb3MubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRJbmRleCgpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM0OyBpKyspIHtcbiAgICAgIGNvbnN0IGkxID0gKGkgKyAxKSAlIDM0O1xuXG4gICAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoaSAqIDIsIGksIGkxKTtcbiAgICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWSg2OCArIGkgKiAyLCAzNCArIGksIDM0ICsgaTEpO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzI7IGkrKykge1xuICAgICAgY29uc3QgaTEgPSAoaSArIDEpICUgMzI7XG5cbiAgICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWSgxMzYgKyBpICogMiwgNjggKyBpLCA2OCArIGkxKTtcbiAgICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWSgyMDAgKyBpICogMiwgMTAwICsgaSwgMTAwICsgaTEpO1xuICAgIH1cblxuICAgIHRoaXMuX2F0dHJJbmRleC5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZVBsYW5lIH0gZnJvbSAnLi4vLi4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVQbGFuZSc7XG5pbXBvcnQgeyBDb2xsaWRlclNoYXBlQnVmZmVyR2VvbWV0cnkgfSBmcm9tICcuL0NvbGxpZGVyU2hhcGVCdWZmZXJHZW9tZXRyeSc7XG5cbmV4cG9ydCBjbGFzcyBDb2xsaWRlclNoYXBlUGxhbmVCdWZmZXJHZW9tZXRyeSBleHRlbmRzIFRIUkVFLkJ1ZmZlckdlb21ldHJ5IGltcGxlbWVudHMgQ29sbGlkZXJTaGFwZUJ1ZmZlckdlb21ldHJ5IHtcbiAgcHVibGljIHdvcmxkU2NhbGUgPSAxLjA7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBfYXR0clBvczogVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xuICBwcml2YXRlIHJlYWRvbmx5IF9hdHRySW5kZXg6IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZTtcbiAgcHJpdmF0ZSByZWFkb25seSBfc2hhcGU6IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlUGxhbmU7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2N1cnJlbnRPZmZzZXQgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuICBwcml2YXRlIHJlYWRvbmx5IF9jdXJyZW50Tm9ybWFsID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuICBwdWJsaWMgY29uc3RydWN0b3Ioc2hhcGU6IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlUGxhbmUpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5fc2hhcGUgPSBzaGFwZTtcblxuICAgIHRoaXMuX2F0dHJQb3MgPSBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKG5ldyBGbG9hdDMyQXJyYXkoNiAqIDMpLCAzKTtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgncG9zaXRpb24nLCB0aGlzLl9hdHRyUG9zKTtcblxuICAgIHRoaXMuX2F0dHJJbmRleCA9IG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUobmV3IFVpbnQxNkFycmF5KDEwKSwgMSk7XG4gICAgdGhpcy5zZXRJbmRleCh0aGlzLl9hdHRySW5kZXgpO1xuXG4gICAgdGhpcy5fYnVpbGRJbmRleCgpO1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIGxldCBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IGZhbHNlO1xuXG4gICAgaWYgKCF0aGlzLl9jdXJyZW50T2Zmc2V0LmVxdWFscyh0aGlzLl9zaGFwZS5vZmZzZXQpKSB7XG4gICAgICB0aGlzLl9jdXJyZW50T2Zmc2V0LmNvcHkodGhpcy5fc2hhcGUub2Zmc2V0KTtcbiAgICAgIHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX2N1cnJlbnROb3JtYWwuZXF1YWxzKHRoaXMuX3NoYXBlLm5vcm1hbCkpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnROb3JtYWwuY29weSh0aGlzLl9zaGFwZS5ub3JtYWwpO1xuICAgICAgc2hvdWxkVXBkYXRlR2VvbWV0cnkgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmIChzaG91bGRVcGRhdGVHZW9tZXRyeSkge1xuICAgICAgdGhpcy5fYnVpbGRQb3NpdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2J1aWxkUG9zaXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5fYXR0clBvcy5zZXRYWVooMCwgLTAuNSwgLTAuNSwgMCk7XG4gICAgdGhpcy5fYXR0clBvcy5zZXRYWVooMSwgMC41LCAtMC41LCAwKTtcbiAgICB0aGlzLl9hdHRyUG9zLnNldFhZWigyLCAwLjUsIDAuNSwgMCk7XG4gICAgdGhpcy5fYXR0clBvcy5zZXRYWVooMywgLTAuNSwgMC41LCAwKTtcbiAgICB0aGlzLl9hdHRyUG9zLnNldFhZWig0LCAwLCAwLCAwKTtcbiAgICB0aGlzLl9hdHRyUG9zLnNldFhZWig1LCAwLCAwLCAwLjI1KTtcblxuICAgIHRoaXMudHJhbnNsYXRlKHRoaXMuX2N1cnJlbnRPZmZzZXQueCwgdGhpcy5fY3VycmVudE9mZnNldC55LCB0aGlzLl9jdXJyZW50T2Zmc2V0LnopO1xuICAgIHRoaXMubG9va0F0KHRoaXMuX2N1cnJlbnROb3JtYWwpO1xuXG4gICAgdGhpcy5fYXR0clBvcy5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIF9idWlsZEluZGV4KCk6IHZvaWQge1xuICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWSgwLCAwLCAxKTtcbiAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoMiwgMSwgMik7XG4gICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKDQsIDIsIDMpO1xuICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWSg2LCAzLCAwKTtcbiAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoOCwgNCwgNSk7XG5cbiAgICB0aGlzLl9hdHRySW5kZXgubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVTcGhlcmUgfSBmcm9tICcuLi8uLi9WUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZVNwaGVyZSc7XG5pbXBvcnQgeyBDb2xsaWRlclNoYXBlQnVmZmVyR2VvbWV0cnkgfSBmcm9tICcuL0NvbGxpZGVyU2hhcGVCdWZmZXJHZW9tZXRyeSc7XG5cbmV4cG9ydCBjbGFzcyBDb2xsaWRlclNoYXBlU3BoZXJlQnVmZmVyR2VvbWV0cnkgZXh0ZW5kcyBUSFJFRS5CdWZmZXJHZW9tZXRyeSBpbXBsZW1lbnRzIENvbGxpZGVyU2hhcGVCdWZmZXJHZW9tZXRyeSB7XG4gIHB1YmxpYyB3b3JsZFNjYWxlID0gMS4wO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgX2F0dHJQb3M6IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZTtcbiAgcHJpdmF0ZSByZWFkb25seSBfYXR0ckluZGV4OiBUSFJFRS5CdWZmZXJBdHRyaWJ1dGU7XG4gIHByaXZhdGUgcmVhZG9ubHkgX3NoYXBlOiBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZVNwaGVyZTtcbiAgcHJpdmF0ZSBfY3VycmVudFJhZGl1cyA9IDA7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2N1cnJlbnRPZmZzZXQgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihzaGFwZTogVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVTcGhlcmUpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5fc2hhcGUgPSBzaGFwZTtcblxuICAgIHRoaXMuX2F0dHJQb3MgPSBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKG5ldyBGbG9hdDMyQXJyYXkoMzIgKiAzICogMyksIDMpO1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKCdwb3NpdGlvbicsIHRoaXMuX2F0dHJQb3MpO1xuXG4gICAgdGhpcy5fYXR0ckluZGV4ID0gbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShuZXcgVWludDE2QXJyYXkoNjQgKiAzKSwgMSk7XG4gICAgdGhpcy5zZXRJbmRleCh0aGlzLl9hdHRySW5kZXgpO1xuXG4gICAgdGhpcy5fYnVpbGRJbmRleCgpO1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIGxldCBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IGZhbHNlO1xuXG4gICAgY29uc3QgcmFkaXVzID0gdGhpcy5fc2hhcGUucmFkaXVzIC8gdGhpcy53b3JsZFNjYWxlO1xuICAgIGlmICh0aGlzLl9jdXJyZW50UmFkaXVzICE9PSByYWRpdXMpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRSYWRpdXMgPSByYWRpdXM7XG4gICAgICBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9jdXJyZW50T2Zmc2V0LmVxdWFscyh0aGlzLl9zaGFwZS5vZmZzZXQpKSB7XG4gICAgICB0aGlzLl9jdXJyZW50T2Zmc2V0LmNvcHkodGhpcy5fc2hhcGUub2Zmc2V0KTtcbiAgICAgIHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoc2hvdWxkVXBkYXRlR2VvbWV0cnkpIHtcbiAgICAgIHRoaXMuX2J1aWxkUG9zaXRpb24oKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9idWlsZFBvc2l0aW9uKCk6IHZvaWQge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzI7IGkrKykge1xuICAgICAgY29uc3QgdCA9IChpIC8gMTYuMCkgKiBNYXRoLlBJO1xuXG4gICAgICB0aGlzLl9hdHRyUG9zLnNldFhZWihpLCBNYXRoLmNvcyh0KSwgTWF0aC5zaW4odCksIDAuMCk7XG4gICAgICB0aGlzLl9hdHRyUG9zLnNldFhZWigzMiArIGksIDAuMCwgTWF0aC5jb3ModCksIE1hdGguc2luKHQpKTtcbiAgICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKDY0ICsgaSwgTWF0aC5zaW4odCksIDAuMCwgTWF0aC5jb3ModCkpO1xuICAgIH1cblxuICAgIHRoaXMuc2NhbGUodGhpcy5fY3VycmVudFJhZGl1cywgdGhpcy5fY3VycmVudFJhZGl1cywgdGhpcy5fY3VycmVudFJhZGl1cyk7XG4gICAgdGhpcy50cmFuc2xhdGUodGhpcy5fY3VycmVudE9mZnNldC54LCB0aGlzLl9jdXJyZW50T2Zmc2V0LnksIHRoaXMuX2N1cnJlbnRPZmZzZXQueik7XG5cbiAgICB0aGlzLl9hdHRyUG9zLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX2J1aWxkSW5kZXgoKTogdm9pZCB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzMjsgaSsrKSB7XG4gICAgICBjb25zdCBpMSA9IChpICsgMSkgJSAzMjtcblxuICAgICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKGkgKiAyLCBpLCBpMSk7XG4gICAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoNjQgKyBpICogMiwgMzIgKyBpLCAzMiArIGkxKTtcbiAgICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWSgxMjggKyBpICogMiwgNjQgKyBpLCA2NCArIGkxKTtcbiAgICB9XG5cbiAgICB0aGlzLl9hdHRySW5kZXgubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUpvaW50IH0gZnJvbSAnLi4vVlJNU3ByaW5nQm9uZUpvaW50JztcbmltcG9ydCB7IFNwcmluZ0JvbmVCdWZmZXJHZW9tZXRyeSB9IGZyb20gJy4vdXRpbHMvU3ByaW5nQm9uZUJ1ZmZlckdlb21ldHJ5JztcblxuY29uc3QgX3YzQSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbmV4cG9ydCBjbGFzcyBWUk1TcHJpbmdCb25lSm9pbnRIZWxwZXIgZXh0ZW5kcyBUSFJFRS5Hcm91cCB7XG4gIHB1YmxpYyByZWFkb25seSBzcHJpbmdCb25lOiBWUk1TcHJpbmdCb25lSm9pbnQ7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2dlb21ldHJ5OiBTcHJpbmdCb25lQnVmZmVyR2VvbWV0cnk7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2xpbmU6IFRIUkVFLkxpbmVTZWdtZW50cztcblxuICBwdWJsaWMgY29uc3RydWN0b3Ioc3ByaW5nQm9uZTogVlJNU3ByaW5nQm9uZUpvaW50KSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLm1hdHJpeEF1dG9VcGRhdGUgPSBmYWxzZTtcblxuICAgIHRoaXMuc3ByaW5nQm9uZSA9IHNwcmluZ0JvbmU7XG5cbiAgICB0aGlzLl9nZW9tZXRyeSA9IG5ldyBTcHJpbmdCb25lQnVmZmVyR2VvbWV0cnkodGhpcy5zcHJpbmdCb25lKTtcblxuICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLkxpbmVCYXNpY01hdGVyaWFsKHtcbiAgICAgIGNvbG9yOiAweGZmZmYwMCxcbiAgICAgIGRlcHRoVGVzdDogZmFsc2UsXG4gICAgICBkZXB0aFdyaXRlOiBmYWxzZSxcbiAgICB9KTtcblxuICAgIHRoaXMuX2xpbmUgPSBuZXcgVEhSRUUuTGluZVNlZ21lbnRzKHRoaXMuX2dlb21ldHJ5LCBtYXRlcmlhbCk7XG4gICAgdGhpcy5hZGQodGhpcy5fbGluZSk7XG4gIH1cblxuICBwdWJsaWMgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9nZW9tZXRyeS5kaXNwb3NlKCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlTWF0cml4V29ybGQoZm9yY2U6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLnNwcmluZ0JvbmUuYm9uZS51cGRhdGVXb3JsZE1hdHJpeCh0cnVlLCBmYWxzZSk7XG5cbiAgICB0aGlzLm1hdHJpeC5jb3B5KHRoaXMuc3ByaW5nQm9uZS5ib25lLm1hdHJpeFdvcmxkKTtcblxuICAgIGNvbnN0IG1hdHJpeFdvcmxkRWxlbWVudHMgPSB0aGlzLm1hdHJpeC5lbGVtZW50cztcbiAgICB0aGlzLl9nZW9tZXRyeS53b3JsZFNjYWxlID0gX3YzQVxuICAgICAgLnNldChtYXRyaXhXb3JsZEVsZW1lbnRzWzBdLCBtYXRyaXhXb3JsZEVsZW1lbnRzWzFdLCBtYXRyaXhXb3JsZEVsZW1lbnRzWzJdKVxuICAgICAgLmxlbmd0aCgpOyAvLyBjYWxjdWxhdGUgc2NhbGUgb2YgeCBjb21wb25lbnRcblxuICAgIHRoaXMuX2dlb21ldHJ5LnVwZGF0ZSgpO1xuXG4gICAgc3VwZXIudXBkYXRlTWF0cml4V29ybGQoZm9yY2UpO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUpvaW50IH0gZnJvbSAnLi4vLi4vVlJNU3ByaW5nQm9uZUpvaW50JztcblxuZXhwb3J0IGNsYXNzIFNwcmluZ0JvbmVCdWZmZXJHZW9tZXRyeSBleHRlbmRzIFRIUkVFLkJ1ZmZlckdlb21ldHJ5IHtcbiAgcHVibGljIHdvcmxkU2NhbGUgPSAxLjA7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBfYXR0clBvczogVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xuICBwcml2YXRlIHJlYWRvbmx5IF9hdHRySW5kZXg6IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZTtcbiAgcHJpdmF0ZSByZWFkb25seSBfc3ByaW5nQm9uZTogVlJNU3ByaW5nQm9uZUpvaW50O1xuICBwcml2YXRlIF9jdXJyZW50UmFkaXVzID0gMDtcbiAgcHJpdmF0ZSByZWFkb25seSBfY3VycmVudFRhaWwgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihzcHJpbmdCb25lOiBWUk1TcHJpbmdCb25lSm9pbnQpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5fc3ByaW5nQm9uZSA9IHNwcmluZ0JvbmU7XG5cbiAgICB0aGlzLl9hdHRyUG9zID0gbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShuZXcgRmxvYXQzMkFycmF5KDI5NCksIDMpO1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKCdwb3NpdGlvbicsIHRoaXMuX2F0dHJQb3MpO1xuXG4gICAgdGhpcy5fYXR0ckluZGV4ID0gbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShuZXcgVWludDE2QXJyYXkoMTk0KSwgMSk7XG4gICAgdGhpcy5zZXRJbmRleCh0aGlzLl9hdHRySW5kZXgpO1xuXG4gICAgdGhpcy5fYnVpbGRJbmRleCgpO1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIGxldCBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IGZhbHNlO1xuXG4gICAgY29uc3QgcmFkaXVzID0gdGhpcy5fc3ByaW5nQm9uZS5zZXR0aW5ncy5oaXRSYWRpdXMgLyB0aGlzLndvcmxkU2NhbGU7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRSYWRpdXMgIT09IHJhZGl1cykge1xuICAgICAgdGhpcy5fY3VycmVudFJhZGl1cyA9IHJhZGl1cztcbiAgICAgIHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX2N1cnJlbnRUYWlsLmVxdWFscyh0aGlzLl9zcHJpbmdCb25lLmluaXRpYWxMb2NhbENoaWxkUG9zaXRpb24pKSB7XG4gICAgICB0aGlzLl9jdXJyZW50VGFpbC5jb3B5KHRoaXMuX3NwcmluZ0JvbmUuaW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbik7XG4gICAgICBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHNob3VsZFVwZGF0ZUdlb21ldHJ5KSB7XG4gICAgICB0aGlzLl9idWlsZFBvc2l0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRQb3NpdGlvbigpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDMyOyBpKyspIHtcbiAgICAgIGNvbnN0IHQgPSAoaSAvIDE2LjApICogTWF0aC5QSTtcblxuICAgICAgdGhpcy5fYXR0clBvcy5zZXRYWVooaSwgTWF0aC5jb3ModCksIE1hdGguc2luKHQpLCAwLjApO1xuICAgICAgdGhpcy5fYXR0clBvcy5zZXRYWVooMzIgKyBpLCAwLjAsIE1hdGguY29zKHQpLCBNYXRoLnNpbih0KSk7XG4gICAgICB0aGlzLl9hdHRyUG9zLnNldFhZWig2NCArIGksIE1hdGguc2luKHQpLCAwLjAsIE1hdGguY29zKHQpKTtcbiAgICB9XG5cbiAgICB0aGlzLnNjYWxlKHRoaXMuX2N1cnJlbnRSYWRpdXMsIHRoaXMuX2N1cnJlbnRSYWRpdXMsIHRoaXMuX2N1cnJlbnRSYWRpdXMpO1xuICAgIHRoaXMudHJhbnNsYXRlKHRoaXMuX2N1cnJlbnRUYWlsLngsIHRoaXMuX2N1cnJlbnRUYWlsLnksIHRoaXMuX2N1cnJlbnRUYWlsLnopO1xuXG4gICAgdGhpcy5fYXR0clBvcy5zZXRYWVooOTYsIDAsIDAsIDApO1xuICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKDk3LCB0aGlzLl9jdXJyZW50VGFpbC54LCB0aGlzLl9jdXJyZW50VGFpbC55LCB0aGlzLl9jdXJyZW50VGFpbC56KTtcblxuICAgIHRoaXMuX2F0dHJQb3MubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRJbmRleCgpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDMyOyBpKyspIHtcbiAgICAgIGNvbnN0IGkxID0gKGkgKyAxKSAlIDMyO1xuXG4gICAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoaSAqIDIsIGksIGkxKTtcbiAgICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWSg2NCArIGkgKiAyLCAzMiArIGksIDMyICsgaTEpO1xuICAgICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKDEyOCArIGkgKiAyLCA2NCArIGksIDY0ICsgaTEpO1xuICAgIH1cbiAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoMTkyLCA5NiwgOTcpO1xuXG4gICAgdGhpcy5fYXR0ckluZGV4Lm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVMaW1pdCB9IGZyb20gJy4uL1ZSTVNwcmluZ0JvbmVMaW1pdCc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lSm9pbnQgfSBmcm9tICcuLi9WUk1TcHJpbmdCb25lSm9pbnQnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUxpbWl0Q29uZSB9IGZyb20gJy4uL1ZSTVNwcmluZ0JvbmVMaW1pdENvbmUnO1xuaW1wb3J0IHsgTGltaXRDb25lQnVmZmVyR2VvbWV0cnkgfSBmcm9tICcuL3V0aWxzL0xpbWl0Q29uZUJ1ZmZlckdlb21ldHJ5JztcbmltcG9ydCB7IExpbWl0QnVmZmVyR2VvbWV0cnkgfSBmcm9tICcuL3V0aWxzL0xpbWl0QnVmZmVyR2VvbWV0cnknO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUxpbWl0SGluZ2UgfSBmcm9tICcuLi9WUk1TcHJpbmdCb25lTGltaXRIaW5nZSc7XG5pbXBvcnQgeyBMaW1pdEhpbmdlQnVmZmVyR2VvbWV0cnkgfSBmcm9tICcuL3V0aWxzL0xpbWl0SGluZ2VCdWZmZXJHZW9tZXRyeSc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lTGltaXRTcGhlcmljYWwgfSBmcm9tICcuLi9WUk1TcHJpbmdCb25lTGltaXRTcGhlcmljYWwnO1xuaW1wb3J0IHsgTGltaXRTcGhlcmljYWxCdWZmZXJHZW9tZXRyeSB9IGZyb20gJy4vdXRpbHMvTGltaXRTcGhlcmljYWxCdWZmZXJHZW9tZXRyeSc7XG5cbmNvbnN0IF92ZWMzV29ybGRQb3NpdGlvbiA9IC8qQF9fUFVSRV9fKi8gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF92ZWMzU2NhbGUgPSAvKkBfX1BVUkVfXyovIG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbmV4cG9ydCBjbGFzcyBWUk1TcHJpbmdCb25lTGltaXRIZWxwZXIgZXh0ZW5kcyBUSFJFRS5Hcm91cCB7XG4gIHB1YmxpYyByZWFkb25seSBsaW1pdDogVlJNU3ByaW5nQm9uZUxpbWl0O1xuICBwdWJsaWMgcmVhZG9ubHkgam9pbnQ6IFZSTVNwcmluZ0JvbmVKb2ludDtcbiAgcHJpdmF0ZSByZWFkb25seSBfZ2VvbWV0cnk6IExpbWl0QnVmZmVyR2VvbWV0cnk7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2xpbmU6IFRIUkVFLkxpbmVTZWdtZW50cztcblxuICBwdWJsaWMgY29uc3RydWN0b3IobGltaXQ6IFZSTVNwcmluZ0JvbmVMaW1pdCwgam9pbnQ6IFZSTVNwcmluZ0JvbmVKb2ludCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5tYXRyaXhBdXRvVXBkYXRlID0gZmFsc2U7XG5cbiAgICB0aGlzLmxpbWl0ID0gbGltaXQ7XG4gICAgdGhpcy5qb2ludCA9IGpvaW50O1xuXG4gICAgaWYgKHRoaXMubGltaXQgaW5zdGFuY2VvZiBWUk1TcHJpbmdCb25lTGltaXRDb25lKSB7XG4gICAgICB0aGlzLl9nZW9tZXRyeSA9IG5ldyBMaW1pdENvbmVCdWZmZXJHZW9tZXRyeSh0aGlzLmxpbWl0KTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubGltaXQgaW5zdGFuY2VvZiBWUk1TcHJpbmdCb25lTGltaXRIaW5nZSkge1xuICAgICAgdGhpcy5fZ2VvbWV0cnkgPSBuZXcgTGltaXRIaW5nZUJ1ZmZlckdlb21ldHJ5KHRoaXMubGltaXQpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5saW1pdCBpbnN0YW5jZW9mIFZSTVNwcmluZ0JvbmVMaW1pdFNwaGVyaWNhbCkge1xuICAgICAgdGhpcy5fZ2VvbWV0cnkgPSBuZXcgTGltaXRTcGhlcmljYWxCdWZmZXJHZW9tZXRyeSh0aGlzLmxpbWl0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdWUk1TcHJpbmdCb25lTGltaXRIZWxwZXI6IFVua25vd24gbGltaXQgdHlwZSBkZXRlY3RlZCcpO1xuICAgIH1cblxuICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLkxpbmVCYXNpY01hdGVyaWFsKHtcbiAgICAgIGNvbG9yOiAweDAwZmZmZixcbiAgICAgIGRlcHRoVGVzdDogZmFsc2UsXG4gICAgICBkZXB0aFdyaXRlOiBmYWxzZSxcbiAgICB9KTtcblxuICAgIHRoaXMuX2xpbmUgPSBuZXcgVEhSRUUuTGluZVNlZ21lbnRzKHRoaXMuX2dlb21ldHJ5LCBtYXRlcmlhbCk7XG4gICAgdGhpcy5hZGQodGhpcy5fbGluZSk7XG4gIH1cblxuICBwdWJsaWMgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9nZW9tZXRyeS5kaXNwb3NlKCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlTWF0cml4V29ybGQoZm9yY2U6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmpvaW50LmJvbmUudXBkYXRlV29ybGRNYXRyaXgodHJ1ZSwgZmFsc2UpO1xuICAgIHRoaXMuam9pbnQuYm9uZS5nZXRXb3JsZFBvc2l0aW9uKF92ZWMzV29ybGRQb3NpdGlvbik7XG4gICAgX3ZlYzNTY2FsZS5zZXRTY2FsYXIoMC41ICogdGhpcy5qb2ludC53b3JsZFNwYWNlQm9uZUxlbmd0aCk7XG5cbiAgICB0aGlzLm1hdHJpeC5jb21wb3NlKF92ZWMzV29ybGRQb3NpdGlvbiwgdGhpcy5saW1pdC5pbnRlcm5hbFRvdGFsUm90YXRpb25DYWNoZSwgX3ZlYzNTY2FsZSk7XG5cbiAgICB0aGlzLl9nZW9tZXRyeS51cGRhdGUoKTtcblxuICAgIHN1cGVyLnVwZGF0ZU1hdHJpeFdvcmxkKGZvcmNlKTtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVMaW1pdCB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUxpbWl0JztcblxuY29uc3QgU0lOR1VMQVJJVFlfRVBTSUxPTiA9IE1hdGguc3FydChOdW1iZXIuRVBTSUxPTik7XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgY29uZSBsaW1pdCBvZiBhIHNwcmluZyBib25lIGRlZmluZWQgaW4gYFZSTUNfc3ByaW5nQm9uZV9saW1pdGAuXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1TcHJpbmdCb25lTGltaXRDb25lIGV4dGVuZHMgVlJNU3ByaW5nQm9uZUxpbWl0IHtcbiAgLyoqXG4gICAqIFRoZSBhbmdsZSBvZiB0aGUgY29uZSBsaW1pdCBpbiByYWRpYW5zLlxuICAgKiBJZiB0aGUgYW5nbGUgaXMgc2V0IHRvIFx1MDNDMCBvciBncmVhdGVyLCB0aGUgYW5nbGUgd2lsbCBiZSBpbnRlcnByZXRlZCBhcyBcdTAzQzAgYnkgdGhlIGltcGxlbWVudGF0aW9uLlxuICAgKiBXaGVuIHRoZSBhbmdsZSBpcyBzZXQgdG8gXHUwM0MwLCB0aGUgY29uZSBzaGFwZSBiZWNvbWVzIGEgc3BoZXJlLlxuICAgKi9cbiAgcHVibGljIGFuZ2xlOiBudW1iZXI7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBhcmFtcz86IHsgYW5nbGU/OiBudW1iZXI7IHJvdGF0aW9uPzogVEhSRUUuUXVhdGVybmlvbiB9KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuYW5nbGUgPSBUSFJFRS5NYXRoVXRpbHMuY2xhbXAocGFyYW1zPy5hbmdsZSA/PyBNYXRoLlBJLCAwLjAsIE1hdGguUEkpO1xuICAgIHRoaXMucm90YXRpb24gPSBwYXJhbXM/LnJvdGF0aW9uID8/IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG4gIH1cblxuICBwdWJsaWMgY2FsY3VsYXRlTGltaXQodGFpbERpcjogVEhSRUUuVmVjdG9yMyk6IGJvb2xlYW4ge1xuICAgIC8vIGJyaW5nIHRoZSBkaXJlY3Rpb24gaW50byB0aGUgbG9jYWwgc3BhY2Ugb2YgdGhlIGxpbWl0XG4gICAgdGFpbERpci5hcHBseVF1YXRlcm5pb24odGhpcy5fdG90YWxSb3RhdGlvbkludkNhY2hlKTtcblxuICAgIC8vIGNvbXBhcmUgdGhlIHkgY29tcG9uZW50IHdpdGggdGhlIGNvcyBvZiB0aGUgYW5nbGVcbiAgICAvLyBBc3N1bWUgdGhhdCBgYW5nbGVgIGlzIHdpdGhpbiBbMCwgXHUwM0MwXVxuICAgIGNvbnN0IGNvc0xpbWl0QW5nbGUgPSBNYXRoLmNvcyh0aGlzLmFuZ2xlKTtcblxuICAgIGxldCBpc0xpbWl0ZWQgPSBmYWxzZTtcblxuICAgIGlmICh0YWlsRGlyLnkgPCBjb3NMaW1pdEFuZ2xlKSB7XG4gICAgICAvLyBub3cgd2UgaGF2ZSB0byBhcHBseSB0aGUgbGltaXRcbiAgICAgIGlzTGltaXRlZCA9IHRydWU7XG5cbiAgICAgIC8vIFNjYWxlIHRoZSB4IGFuZCB6IGNvbXBvbmVudHMgb2YgdGhlIGRpcmVjdGlvbiB1c2luZyB0aGUgcmF0aW8gb2YgdGhlIHNpbiBvZiB0aGUgZGlyZWN0aW9uIGFuZCB0aGUgc2luIG9mIHRoZSBhbmdsZSBzZXQgaW4gdGhlIGxpbWl0XG4gICAgICBjb25zdCBob3Jpem9udGFsTGVuZ3RoU3EgPSAxLjAgLSB0YWlsRGlyLnkgKiB0YWlsRGlyLnk7XG5cbiAgICAgIGlmIChob3Jpem9udGFsTGVuZ3RoU3EgPCBTSU5HVUxBUklUWV9FUFNJTE9OKSB7XG4gICAgICAgIC8vIFRoZSBkaXJlY3Rpb24gaXMgLVksIGNob29zZSB0aGUgK1ogc2lkZVxuICAgICAgICB0YWlsRGlyLnggPSAwLjA7XG4gICAgICAgIHRhaWxEaXIueiA9IE1hdGguc3FydCgxLjAgLSBjb3NMaW1pdEFuZ2xlICogY29zTGltaXRBbmdsZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBzY2FsZSA9IE1hdGguc3FydCgoMS4wIC0gY29zTGltaXRBbmdsZSAqIGNvc0xpbWl0QW5nbGUpIC8gaG9yaXpvbnRhbExlbmd0aFNxKTtcbiAgICAgICAgdGFpbERpci54ICo9IHNjYWxlO1xuICAgICAgICB0YWlsRGlyLnogKj0gc2NhbGU7XG4gICAgICB9XG5cbiAgICAgIC8vIFNldCB0aGUgeSBjb21wb25lbnQgdG8gdGhlIGNvcyBvZiB0aGUgYW5nbGVcbiAgICAgIHRhaWxEaXIueSA9IGNvc0xpbWl0QW5nbGU7XG4gICAgfVxuXG4gICAgLy8gY2hhbmdlIHRoZSBkaXJlY3Rpb24gYmFjayB0byB0aGUgd29ybGQgc3BhY2VcbiAgICB0YWlsRGlyLmFwcGx5UXVhdGVybmlvbih0aGlzLl90b3RhbFJvdGF0aW9uQ2FjaGUpO1xuXG4gICAgcmV0dXJuIGlzTGltaXRlZDtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB0eXBlIHsgVlJNU3ByaW5nQm9uZUpvaW50IH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lSm9pbnQnO1xuaW1wb3J0IHR5cGUgeyBWUk1TcHJpbmdCb25lTGltaXRIZWxwZXIgfSBmcm9tICcuL2hlbHBlcnMvVlJNU3ByaW5nQm9uZUxpbWl0SGVscGVyJztcblxuY29uc3QgVkVDM19QT1NJVElWRV9YID0gLypAX19QVVJFX18qLyBuZXcgVEhSRUUuVmVjdG9yMygxLCAwLCAwKTtcbmNvbnN0IFZFQzNfUE9TSVRJVkVfWSA9IC8qQF9fUFVSRV9fKi8gbmV3IFRIUkVFLlZlY3RvcjMoMCwgMSwgMCk7XG5jb25zdCBWRUMzX05FR0FUSVZFX1kgPSAvKkBfX1BVUkVfXyovIG5ldyBUSFJFRS5WZWN0b3IzKDAsIC0xLCAwKTtcblxuY29uc3QgX3F1YXRCb25lQXhpcyA9IC8qQF9fUFVSRV9fKi8gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIGFuZ2xlIGxpbWl0IG9mIGEgc3ByaW5nIGJvbmUuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBWUk1TcHJpbmdCb25lTGltaXQge1xuICAvKipcbiAgICogVGhlIHJvdGF0aW9uIGZyb20gdGhlIGRlZmF1bHQgb3JpZW50YXRpb24gb2YgdGhlIGxpbWl0LlxuICAgKi9cbiAgcHVibGljIHJvdGF0aW9uOiBUSFJFRS5RdWF0ZXJuaW9uO1xuXG4gIC8qKlxuICAgKiBUaGUgY2FjaGUgZm9yIHRoZSB0b3RhbCByb3RhdGlvbiBvZiB0aGUgbGltaXQuXG4gICAqIEl0IHdpbGwgYmUgY2FsY3VsYXRlZCBpbiB7QGxpbmsgaW50ZXJuYWxQcmVjYWxjUm90YXRpb259LlxuICAgKi9cbiAgcHJvdGVjdGVkIF90b3RhbFJvdGF0aW9uQ2FjaGU6IFRIUkVFLlF1YXRlcm5pb247XG5cbiAgLyoqXG4gICAqIFRoZSBjYWNoZSBmb3IgdGhlIHRvdGFsIHJvdGF0aW9uIG9mIHRoZSBsaW1pdC5cbiAgICogSXQgd2lsbCBiZSBjYWxjdWxhdGVkIGluIHtAbGluayBpbnRlcm5hbFByZWNhbGNSb3RhdGlvbn0uXG4gICAqXG4gICAqIFRoaXMgaXMgYSBwdWJsaWMgcHJvcGVydHkgdG8gdXNlIGluIHtAbGluayBWUk1TcHJpbmdCb25lTGltaXRIZWxwZXJ9LlxuICAgKiBEbyBub3QgdG91Y2ggdGhpcyBwcm9wZXJ0eSBhcyB3ZSBtaWdodCBjaGFuZ2UgdGhlIGludGVyZmFjZSB3aXRob3V0IG5vdGljZS5cbiAgICovXG4gIHB1YmxpYyBnZXQgaW50ZXJuYWxUb3RhbFJvdGF0aW9uQ2FjaGUoKTogVEhSRUUuUXVhdGVybmlvbiB7XG4gICAgcmV0dXJuIHRoaXMuX3RvdGFsUm90YXRpb25DYWNoZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgY2FjaGUgZm9yIHRoZSBpbnZlcnNlIG9mIHRoZSB7QGxpbmsgX3RvdGFsUm90YXRpb25DYWNoZX0uXG4gICAqIEl0IHdpbGwgYmUgY2FsY3VsYXRlZCBpbiB7QGxpbmsgaW50ZXJuYWxQcmVjYWxjUm90YXRpb259LlxuICAgKi9cbiAgcHJvdGVjdGVkIF90b3RhbFJvdGF0aW9uSW52Q2FjaGU6IFRIUkVFLlF1YXRlcm5pb247XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucm90YXRpb24gPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuICAgIHRoaXMuX3RvdGFsUm90YXRpb25DYWNoZSA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG4gICAgdGhpcy5fdG90YWxSb3RhdGlvbkludkNhY2hlID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcmVjYWxjdWxhdGUgdGhlIHJvdGF0aW9uIG9mIHRoZSBsaW1pdC5cbiAgICpcbiAgICogVGhpcyBpcyBpbnRlbmRlZCB0byBiZSBjYWxsZWQgZnJvbSB7QGxpbmsgVlJNU3ByaW5nQm9uZUpvaW50LnVwZGF0ZX0uXG4gICAqIERvIG5vdCB0b3VjaCB0aGlzIHByb3BlcnR5IGFzIHdlIG1pZ2h0IGNoYW5nZSB0aGUgaW50ZXJmYWNlIHdpdGhvdXQgbm90aWNlLlxuICAgKlxuICAgKiBAcGFyYW0gd29ybGRTcGFjZUluaXRpYWxSb3RhdGlvbiBUaGUgaW5pdGlhbCBsb2NhbCByb3RhdGlvbiBpbiB0aGUgY3VycmVudCB3b3JsZCBzcGFjZVxuICAgKiBAcGFyYW0gYm9uZUF4aXMgVGhlIGluaXRpYWwgYXhpcyBvZiB0aGUgY2hpbGQgYm9uZSwgaW4gbG9jYWwgdW5pdFxuICAgKi9cbiAgcHVibGljIGludGVybmFsUHJlY2FsY1JvdGF0aW9uKHdvcmxkU3BhY2VJbml0aWFsUm90YXRpb246IFRIUkVFLlF1YXRlcm5pb24sIGJvbmVBeGlzOiBUSFJFRS5WZWN0b3IzKTogdm9pZCB7XG4gICAgLy8gV2hlbiB0aGUgYm9uZSBheGlzIGlzICgwLCAtMSwgMCksIHJvdGF0ZSAxODAgZGVncmVlcyBhcm91bmQgdGhlIFggYXhpcywgYXMgdGhlIHNwZWMgZGVmaW5lc1xuICAgIGlmIChib25lQXhpcy5lcXVhbHMoVkVDM19ORUdBVElWRV9ZKSkge1xuICAgICAgX3F1YXRCb25lQXhpcy5zZXRGcm9tQXhpc0FuZ2xlKFZFQzNfUE9TSVRJVkVfWCwgTWF0aC5QSSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIF9xdWF0Qm9uZUF4aXMuc2V0RnJvbVVuaXRWZWN0b3JzKFZFQzNfUE9TSVRJVkVfWSwgYm9uZUF4aXMpO1xuICAgIH1cblxuICAgIHRoaXMuX3RvdGFsUm90YXRpb25DYWNoZS5jb3B5KHdvcmxkU3BhY2VJbml0aWFsUm90YXRpb24pLm11bHRpcGx5KF9xdWF0Qm9uZUF4aXMpLm11bHRpcGx5KHRoaXMucm90YXRpb24pO1xuICAgIHRoaXMuX3RvdGFsUm90YXRpb25JbnZDYWNoZS5jb3B5KHRoaXMuX3RvdGFsUm90YXRpb25DYWNoZSkuaW52ZXJ0KCk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlIHRoZSBsaW1pdCBkaXJlY3Rpb24uXG4gICAqIElmIHRoZSBkaXJlY3Rpb24gaXMgbGltaXRlZCwgaXQgd2lsbCByZXR1cm4gYHRydWVgLlxuICAgKlxuICAgKiBAcGFyYW0gdGFpbERpciBUaGUgdGFpbCBkaXJlY3Rpb24gaW4gd29ybGQgc3BhY2VcbiAgICovXG4gIHB1YmxpYyBhYnN0cmFjdCBjYWxjdWxhdGVMaW1pdCh0YWlsRGlyOiBUSFJFRS5WZWN0b3IzKTogYm9vbGVhbjtcbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBMaW1pdEJ1ZmZlckdlb21ldHJ5IH0gZnJvbSAnLi9MaW1pdEJ1ZmZlckdlb21ldHJ5JztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVMaW1pdENvbmUgfSBmcm9tICcuLi8uLi9WUk1TcHJpbmdCb25lTGltaXRDb25lJztcblxuY29uc3QgUVVBUlRFUl9BUkNfU0VHTUVOVFMgPSA0O1xuY29uc3QgQVJDX1NFR01FTlRTID0gNCAqIFFVQVJURVJfQVJDX1NFR01FTlRTO1xuXG5leHBvcnQgY2xhc3MgTGltaXRDb25lQnVmZmVyR2VvbWV0cnkgZXh0ZW5kcyBUSFJFRS5CdWZmZXJHZW9tZXRyeSBpbXBsZW1lbnRzIExpbWl0QnVmZmVyR2VvbWV0cnkge1xuICBwcml2YXRlIHJlYWRvbmx5IF9hdHRyUG9zOiBUSFJFRS5CdWZmZXJBdHRyaWJ1dGU7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2F0dHJJbmRleDogVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xuICBwcml2YXRlIHJlYWRvbmx5IF9saW1pdDogVlJNU3ByaW5nQm9uZUxpbWl0Q29uZTtcbiAgcHJpdmF0ZSBfY3VycmVudEFuZ2xlOiBudW1iZXI7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGxpbWl0OiBWUk1TcHJpbmdCb25lTGltaXRDb25lKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuX2xpbWl0ID0gbGltaXQ7XG4gICAgdGhpcy5fY3VycmVudEFuZ2xlID0gbGltaXQuYW5nbGU7XG5cbiAgICB0aGlzLl9hdHRyUG9zID0gbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShuZXcgRmxvYXQzMkFycmF5KDMgKiAoQVJDX1NFR01FTlRTICsgMSkpLCAzKTtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgncG9zaXRpb24nLCB0aGlzLl9hdHRyUG9zKTtcblxuICAgIHRoaXMuX2F0dHJJbmRleCA9IG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUobmV3IFVpbnQxNkFycmF5KDIgKiAoQVJDX1NFR01FTlRTICsgNCkpLCAxKTtcbiAgICB0aGlzLnNldEluZGV4KHRoaXMuX2F0dHJJbmRleCk7XG5cbiAgICB0aGlzLl9idWlsZEluZGV4KCk7XG4gICAgdGhpcy5fYnVpbGRQb3NpdGlvbigpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBsZXQgc2hvdWxkVXBkYXRlR2VvbWV0cnkgPSBmYWxzZTtcblxuICAgIGlmICh0aGlzLl9jdXJyZW50QW5nbGUgIT09IHRoaXMuX2xpbWl0LmFuZ2xlKSB7XG4gICAgICB0aGlzLl9jdXJyZW50QW5nbGUgPSB0aGlzLl9saW1pdC5hbmdsZTtcbiAgICAgIHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoc2hvdWxkVXBkYXRlR2VvbWV0cnkpIHtcbiAgICAgIHRoaXMuX2J1aWxkUG9zaXRpb24oKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9idWlsZFBvc2l0aW9uKCk6IHZvaWQge1xuICAgIGNvbnN0IGNvcyA9IE1hdGguY29zKHRoaXMuX2N1cnJlbnRBbmdsZSk7XG4gICAgY29uc3Qgc2luID0gTWF0aC5zaW4odGhpcy5fY3VycmVudEFuZ2xlKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgQVJDX1NFR01FTlRTOyBpKyspIHtcbiAgICAgIGNvbnN0IHQgPSAyLjAgKiBNYXRoLlBJICogKGkgLyBBUkNfU0VHTUVOVFMpO1xuXG4gICAgICB0aGlzLl9hdHRyUG9zLnNldFhZWihpLCBzaW4gKiBNYXRoLmNvcyh0KSwgY29zLCBzaW4gKiBNYXRoLnNpbih0KSk7XG4gICAgfVxuXG4gICAgdGhpcy5fYXR0clBvcy5zZXRYWVooQVJDX1NFR01FTlRTLCAwLCAwLCAwKTtcblxuICAgIHRoaXMuX2F0dHJQb3MubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRJbmRleCgpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IEFSQ19TRUdNRU5UUzsgaSsrKSB7XG4gICAgICBjb25zdCBpMSA9IChpICsgMSkgJSBBUkNfU0VHTUVOVFM7XG5cbiAgICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWShpICogMiwgaSwgaTEpO1xuICAgIH1cblxuICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWShBUkNfU0VHTUVOVFMgKiAyLCBBUkNfU0VHTUVOVFMsIDApO1xuICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWShBUkNfU0VHTUVOVFMgKiAyICsgMiwgQVJDX1NFR01FTlRTLCBRVUFSVEVSX0FSQ19TRUdNRU5UUyk7XG4gICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKEFSQ19TRUdNRU5UUyAqIDIgKyA0LCBBUkNfU0VHTUVOVFMsIDIgKiBRVUFSVEVSX0FSQ19TRUdNRU5UUyk7XG4gICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKEFSQ19TRUdNRU5UUyAqIDIgKyA2LCBBUkNfU0VHTUVOVFMsIDMgKiBRVUFSVEVSX0FSQ19TRUdNRU5UUyk7XG5cbiAgICB0aGlzLl9hdHRySW5kZXgubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUxpbWl0IH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lTGltaXQnO1xuXG5jb25zdCBTSU5HVUxBUklUWV9FUFNJTE9OID0gTWF0aC5zcXJ0KE51bWJlci5FUFNJTE9OKTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBoaW5nZSBsaW1pdCBvZiBhIHNwcmluZyBib25lIGRlZmluZWQgaW4gYFZSTUNfc3ByaW5nQm9uZV9saW1pdGAuXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1TcHJpbmdCb25lTGltaXRIaW5nZSBleHRlbmRzIFZSTVNwcmluZ0JvbmVMaW1pdCB7XG4gIC8qKlxuICAgKiBUaGUgYW5nbGUgb2YgdGhlIGhpbmdlIGxpbWl0IGluIHJhZGlhbnMuXG4gICAqIElmIHRoZSBhbmdsZSBpcyBzZXQgdG8gXHUwM0MwIG9yIGdyZWF0ZXIsIHRoZSBhbmdsZSB3aWxsIGJlIGludGVycHJldGVkIGFzIFx1MDNDMCBieSB0aGUgaW1wbGVtZW50YXRpb24uXG4gICAqIFdoZW4gdGhlIGFuZ2xlIGlzIHNldCB0byBcdTAzQzAsIHRoZSBoaW5nZSBzaGFwZSBiZWNvbWVzIGEgZnVsbCBkaXNjLlxuICAgKi9cbiAgcHVibGljIGFuZ2xlOiBudW1iZXI7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBhcmFtcz86IHsgYW5nbGU/OiBudW1iZXI7IHJvdGF0aW9uPzogVEhSRUUuUXVhdGVybmlvbiB9KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuYW5nbGUgPSBUSFJFRS5NYXRoVXRpbHMuY2xhbXAocGFyYW1zPy5hbmdsZSA/PyBNYXRoLlBJLCAwLjAsIE1hdGguUEkpO1xuICAgIHRoaXMucm90YXRpb24gPSBwYXJhbXM/LnJvdGF0aW9uID8/IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG4gIH1cblxuICBwdWJsaWMgY2FsY3VsYXRlTGltaXQodGFpbERpcjogVEhSRUUuVmVjdG9yMyk6IGJvb2xlYW4ge1xuICAgIC8vIGJyaW5nIHRoZSBkaXJlY3Rpb24gaW50byB0aGUgbG9jYWwgc3BhY2Ugb2YgdGhlIGxpbWl0XG4gICAgdGFpbERpci5hcHBseVF1YXRlcm5pb24odGhpcy5fdG90YWxSb3RhdGlvbkludkNhY2hlKTtcblxuICAgIGxldCBpc0xpbWl0ZWQgPSBmYWxzZTtcblxuICAgIGNvbnN0IHByb2plY3RlZExlbmd0aFNxID0gdGFpbERpci55ICogdGFpbERpci55ICsgdGFpbERpci56ICogdGFpbERpci56O1xuICAgIGlmIChwcm9qZWN0ZWRMZW5ndGhTcSA8IFNJTkdVTEFSSVRZX0VQU0lMT04pIHtcbiAgICAgIC8vIFRoZSBkaXJlY3Rpb24gaXMgZWl0aGVyICtYIG9yIC1YLCBjaG9vc2UgK1lcbiAgICAgIGlzTGltaXRlZCA9IHRydWU7XG4gICAgICB0YWlsRGlyLnNldCgwLjAsIDEuMCwgMC4wKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gTWFwIHRoZSBkaXJlY3Rpb24gdG8gdGhlIFlaIHBsYW5lIG9mIHRoZSBoaW5nZVxuICAgICAgaWYgKHRhaWxEaXIueCAhPT0gMC4wKSB7XG4gICAgICAgIGlzTGltaXRlZCA9IHRydWU7XG5cbiAgICAgICAgY29uc3Qgc2NhbGUgPSAxLjAgLyBNYXRoLnNxcnQocHJvamVjdGVkTGVuZ3RoU3EpO1xuICAgICAgICB0YWlsRGlyLnNldCgwLjAsIHRhaWxEaXIueSAqIHNjYWxlLCB0YWlsRGlyLnogKiBzY2FsZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIEFzc3VtZSB0aGF0IGBhbmdsZWAgaXMgd2l0aGluIFswLCBcdTAzQzBdXG4gICAgICBjb25zdCBjb3NMaW1pdEFuZ2xlID0gTWF0aC5jb3ModGhpcy5hbmdsZSk7XG4gICAgICBpZiAodGFpbERpci55IDwgY29zTGltaXRBbmdsZSkge1xuICAgICAgICBpc0xpbWl0ZWQgPSB0cnVlO1xuXG4gICAgICAgIGNvbnN0IHNpbkxpbWl0QW5nbGUgPSBNYXRoLnNxcnQoMS4wIC0gY29zTGltaXRBbmdsZSAqIGNvc0xpbWl0QW5nbGUpO1xuXG4gICAgICAgIC8vIFdoZW4gdGhlIGRpcmVjdGlvbiBpcyAtWSwgY2hvb3NlIHRoZSArWiBzaWRlXG4gICAgICAgIGNvbnN0IHpTaWduID0gdGFpbERpci56IDwgMC4wID8gLTEuMCA6IDEuMDtcbiAgICAgICAgdGFpbERpci55ID0gY29zTGltaXRBbmdsZTtcbiAgICAgICAgdGFpbERpci56ID0gc2luTGltaXRBbmdsZSAqIHpTaWduO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGNoYW5nZSB0aGUgZGlyZWN0aW9uIGJhY2sgdG8gdGhlIHdvcmxkIHNwYWNlXG4gICAgdGFpbERpci5hcHBseVF1YXRlcm5pb24odGhpcy5fdG90YWxSb3RhdGlvbkNhY2hlKTtcblxuICAgIHJldHVybiBpc0xpbWl0ZWQ7XG4gIH1cbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBMaW1pdEJ1ZmZlckdlb21ldHJ5IH0gZnJvbSAnLi9MaW1pdEJ1ZmZlckdlb21ldHJ5JztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVMaW1pdEhpbmdlIH0gZnJvbSAnLi4vLi4vVlJNU3ByaW5nQm9uZUxpbWl0SGluZ2UnO1xuXG5jb25zdCBBUkNfU0VHTUVOVFMgPSAxNztcblxuZXhwb3J0IGNsYXNzIExpbWl0SGluZ2VCdWZmZXJHZW9tZXRyeSBleHRlbmRzIFRIUkVFLkJ1ZmZlckdlb21ldHJ5IGltcGxlbWVudHMgTGltaXRCdWZmZXJHZW9tZXRyeSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2F0dHJQb3M6IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZTtcbiAgcHJpdmF0ZSByZWFkb25seSBfYXR0ckluZGV4OiBUSFJFRS5CdWZmZXJBdHRyaWJ1dGU7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2xpbWl0OiBWUk1TcHJpbmdCb25lTGltaXRIaW5nZTtcbiAgcHJpdmF0ZSBfY3VycmVudEFuZ2xlOiBudW1iZXI7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGxpbWl0OiBWUk1TcHJpbmdCb25lTGltaXRIaW5nZSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLl9saW1pdCA9IGxpbWl0O1xuICAgIHRoaXMuX2N1cnJlbnRBbmdsZSA9IGxpbWl0LmFuZ2xlO1xuXG4gICAgdGhpcy5fYXR0clBvcyA9IG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUobmV3IEZsb2F0MzJBcnJheSgzICogKEFSQ19TRUdNRU5UUyArIDEpKSwgMyk7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJywgdGhpcy5fYXR0clBvcyk7XG5cbiAgICB0aGlzLl9hdHRySW5kZXggPSBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKG5ldyBVaW50MTZBcnJheSgyICogKEFSQ19TRUdNRU5UUyArIDEpKSwgMSk7XG4gICAgdGhpcy5zZXRJbmRleCh0aGlzLl9hdHRySW5kZXgpO1xuXG4gICAgdGhpcy5fYnVpbGRJbmRleCgpO1xuICAgIHRoaXMuX2J1aWxkUG9zaXRpb24oKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgbGV0IHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gZmFsc2U7XG5cbiAgICBpZiAodGhpcy5fY3VycmVudEFuZ2xlICE9PSB0aGlzLl9saW1pdC5hbmdsZSkge1xuICAgICAgdGhpcy5fY3VycmVudEFuZ2xlID0gdGhpcy5fbGltaXQuYW5nbGU7XG4gICAgICBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHNob3VsZFVwZGF0ZUdlb21ldHJ5KSB7XG4gICAgICB0aGlzLl9idWlsZFBvc2l0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRQb3NpdGlvbigpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IEFSQ19TRUdNRU5UUzsgaSsrKSB7XG4gICAgICBjb25zdCB0ID0gdGhpcy5fY3VycmVudEFuZ2xlICogKDIuMCAqIChpIC8gKEFSQ19TRUdNRU5UUyAtIDEpKSAtIDEuMCk7XG5cbiAgICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKGksIDAsIE1hdGguY29zKHQpLCBNYXRoLnNpbih0KSk7XG4gICAgfVxuXG4gICAgdGhpcy5fYXR0clBvcy5zZXRYWVooQVJDX1NFR01FTlRTLCAwLCAwLCAwKTtcblxuICAgIHRoaXMuX2F0dHJQb3MubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRJbmRleCgpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IEFSQ19TRUdNRU5UUyAtIDE7IGkrKykge1xuICAgICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKGkgKiAyLCBpLCBpICsgMSk7XG4gICAgfVxuXG4gICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKEFSQ19TRUdNRU5UUyAqIDIgLSAyLCBBUkNfU0VHTUVOVFMgLSAxLCBBUkNfU0VHTUVOVFMpO1xuICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWShBUkNfU0VHTUVOVFMgKiAyLCBBUkNfU0VHTUVOVFMsIDApO1xuXG4gICAgdGhpcy5fYXR0ckluZGV4Lm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVMaW1pdCB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUxpbWl0JztcblxuY29uc3QgU0lOR1VMQVJJVFlfRVBTSUxPTiA9IE1hdGguc3FydChOdW1iZXIuRVBTSUxPTik7XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgc3BoZXJpY2FsIGxpbWl0IG9mIGEgc3ByaW5nIGJvbmUgZGVmaW5lZCBpbiBgVlJNQ19zcHJpbmdCb25lX2xpbWl0YC5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTVNwcmluZ0JvbmVMaW1pdFNwaGVyaWNhbCBleHRlbmRzIFZSTVNwcmluZ0JvbmVMaW1pdCB7XG4gIC8qKlxuICAgKiBUaGUgcGl0Y2ggYW5nbGUgb2YgdGhlIHNwaGVyaWNhbCBsaW1pdCBpbiByYWRpYW5zLlxuICAgKiBJZiB0aGUgcGl0Y2ggYW5nbGUgaXMgc2V0IHRvIFx1MDNDMCBvciBncmVhdGVyLCB0aGUgYW5nbGUgd2lsbCBiZSBpbnRlcnByZXRlZCBhcyBcdTAzQzAgYnkgdGhlIGltcGxlbWVudGF0aW9uLlxuICAgKi9cbiAgcHVibGljIHBpdGNoOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSB5YXcgYW5nbGUgb2YgdGhlIHNwaGVyaWNhbCBsaW1pdCBpbiByYWRpYW5zLlxuICAgKiBJZiB0aGUgeWF3IGFuZ2xlIGlzIHNldCB0byBcdTAzQzAvMiBvciBncmVhdGVyLCB0aGUgYW5nbGUgd2lsbCBiZSBpbnRlcnByZXRlZCBhcyBcdTAzQzAvMiBieSB0aGUgaW1wbGVtZW50YXRpb24uXG4gICAqL1xuICBwdWJsaWMgeWF3OiBudW1iZXI7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBhcmFtcz86IHsgcGl0Y2g/OiBudW1iZXI7IHlhdz86IG51bWJlcjsgcm90YXRpb24/OiBUSFJFRS5RdWF0ZXJuaW9uIH0pIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5waXRjaCA9IFRIUkVFLk1hdGhVdGlscy5jbGFtcChwYXJhbXM/LnBpdGNoID8/IE1hdGguUEksIDAuMCwgTWF0aC5QSSk7XG4gICAgdGhpcy55YXcgPSBUSFJFRS5NYXRoVXRpbHMuY2xhbXAocGFyYW1zPy55YXcgPz8gTWF0aC5QSSAvIDIuMCwgMC4wLCBNYXRoLlBJIC8gMi4wKTtcbiAgICB0aGlzLnJvdGF0aW9uID0gcGFyYW1zPy5yb3RhdGlvbiA/PyBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuICB9XG5cbiAgcHVibGljIGNhbGN1bGF0ZUxpbWl0KHRhaWxEaXI6IFRIUkVFLlZlY3RvcjMpOiBib29sZWFuIHtcbiAgICAvLyBicmluZyB0aGUgZGlyZWN0aW9uIGludG8gdGhlIGxvY2FsIHNwYWNlIG9mIHRoZSBsaW1pdFxuICAgIHRhaWxEaXIuYXBwbHlRdWF0ZXJuaW9uKHRoaXMuX3RvdGFsUm90YXRpb25JbnZDYWNoZSk7XG5cbiAgICBsZXQgaXNMaW1pdGVkID0gZmFsc2U7XG5cbiAgICAvLyBjYWxjdWxhdGUgdGhlIHBpdGNoIC8geWF3IG9mIHRoZSBkaXJlY3Rpb25cbiAgICBsZXQgcGl0Y2g6IG51bWJlcjtcbiAgICBpZiAodGFpbERpci55IDwgLTEuMCArIFNJTkdVTEFSSVRZX0VQU0lMT04pIHtcbiAgICAgIC8vIFRoZSBkaXJlY3Rpb24gaXMgLVksIGNob29zZSB0aGUgK1ogc2lkZVxuICAgICAgcGl0Y2ggPSBNYXRoLlBJO1xuICAgIH0gZWxzZSBpZiAoTWF0aC5hYnModGFpbERpci54KSA+IDEuMCAtIFNJTkdVTEFSSVRZX0VQU0lMT04pIHtcbiAgICAgIC8vIFRoZSBkaXJlY3Rpb24gaXMgZWl0aGVyICtYIG9yIC1YLCBjaG9vc2UgdGhlICtZIHNpZGVcbiAgICAgIHBpdGNoID0gMC4wO1xuICAgIH0gZWxzZSB7XG4gICAgICBwaXRjaCA9IE1hdGguYXRhbjIodGFpbERpci56LCB0YWlsRGlyLnkpO1xuICAgIH1cbiAgICBsZXQgeWF3ID0gTWF0aC5hc2luKFRIUkVFLk1hdGhVdGlscy5jbGFtcCh0YWlsRGlyLngsIC0xLjAsIDEuMCkpO1xuXG4gICAgLy8gbGltaXQgdGhlIHBpdGNoIGFuZ2xlXG4gICAgLy8gQXNzdW1lIHRoYXQgYHBpdGNoYCBpcyB3aXRoaW4gWzAsIFx1MDNDMF1cbiAgICBpZiAoTWF0aC5hYnMocGl0Y2gpID4gdGhpcy5waXRjaCkge1xuICAgICAgaXNMaW1pdGVkID0gdHJ1ZTtcbiAgICAgIHBpdGNoID0gdGhpcy5waXRjaCAqIE1hdGguc2lnbihwaXRjaCk7XG4gICAgfVxuXG4gICAgLy8gbGltaXQgdGhlIHlhdyBhbmdsZVxuICAgIC8vIEFzc3VtZSB0aGF0IGB5YXdgIGlzIHdpdGhpbiBbMCwgXHUwM0MwLzJdXG4gICAgaWYgKE1hdGguYWJzKHlhdykgPiB0aGlzLnlhdykge1xuICAgICAgaXNMaW1pdGVkID0gdHJ1ZTtcbiAgICAgIHlhdyA9IHRoaXMueWF3ICogTWF0aC5zaWduKHlhdyk7XG4gICAgfVxuXG4gICAgLy8gcmVjYWxjdWxhdGUgdGhlIGRpcmVjdGlvbiB1c2luZyB0aGUgbGltaXRlZCBwaXRjaCAvIHlhd1xuICAgIGNvbnN0IGNvc1lhdyA9IE1hdGguY29zKHlhdyk7XG4gICAgY29uc3Qgc2luWWF3ID0gTWF0aC5zaW4oeWF3KTtcbiAgICB0YWlsRGlyLnNldChzaW5ZYXcsIGNvc1lhdyAqIE1hdGguY29zKHBpdGNoKSwgY29zWWF3ICogTWF0aC5zaW4ocGl0Y2gpKTtcblxuICAgIC8vIGNoYW5nZSB0aGUgZGlyZWN0aW9uIGJhY2sgdG8gdGhlIHdvcmxkIHNwYWNlXG4gICAgdGFpbERpci5hcHBseVF1YXRlcm5pb24odGhpcy5fdG90YWxSb3RhdGlvbkNhY2hlKTtcblxuICAgIHJldHVybiBpc0xpbWl0ZWQ7XG4gIH1cbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBMaW1pdEJ1ZmZlckdlb21ldHJ5IH0gZnJvbSAnLi9MaW1pdEJ1ZmZlckdlb21ldHJ5JztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVMaW1pdFNwaGVyaWNhbCB9IGZyb20gJy4uLy4uL1ZSTVNwcmluZ0JvbmVMaW1pdFNwaGVyaWNhbCc7XG5cbmNvbnN0IEFSQ19TRUdNRU5UUyA9IDE3O1xuXG5leHBvcnQgY2xhc3MgTGltaXRTcGhlcmljYWxCdWZmZXJHZW9tZXRyeSBleHRlbmRzIFRIUkVFLkJ1ZmZlckdlb21ldHJ5IGltcGxlbWVudHMgTGltaXRCdWZmZXJHZW9tZXRyeSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2F0dHJQb3M6IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZTtcbiAgcHJpdmF0ZSByZWFkb25seSBfYXR0ckluZGV4OiBUSFJFRS5CdWZmZXJBdHRyaWJ1dGU7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2xpbWl0OiBWUk1TcHJpbmdCb25lTGltaXRTcGhlcmljYWw7XG4gIHByaXZhdGUgX2N1cnJlbnRQaXRjaDogbnVtYmVyO1xuICBwcml2YXRlIF9jdXJyZW50WWF3OiBudW1iZXI7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGxpbWl0OiBWUk1TcHJpbmdCb25lTGltaXRTcGhlcmljYWwpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5fbGltaXQgPSBsaW1pdDtcbiAgICB0aGlzLl9jdXJyZW50UGl0Y2ggPSBsaW1pdC5waXRjaDtcbiAgICB0aGlzLl9jdXJyZW50WWF3ID0gbGltaXQueWF3O1xuXG4gICAgdGhpcy5fYXR0clBvcyA9IG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUobmV3IEZsb2F0MzJBcnJheSgzICogKEFSQ19TRUdNRU5UUyArIDQgKiAoQVJDX1NFR01FTlRTIC0gMSkgKyAxKSksIDMpO1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKCdwb3NpdGlvbicsIHRoaXMuX2F0dHJQb3MpO1xuXG4gICAgdGhpcy5fYXR0ckluZGV4ID0gbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShuZXcgVWludDE2QXJyYXkoMiAqICg1ICogKEFSQ19TRUdNRU5UUyAtIDEpICsgNikpLCAxKTtcbiAgICB0aGlzLnNldEluZGV4KHRoaXMuX2F0dHJJbmRleCk7XG5cbiAgICB0aGlzLl9idWlsZEluZGV4KCk7XG4gICAgdGhpcy5fYnVpbGRQb3NpdGlvbigpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBsZXQgc2hvdWxkVXBkYXRlR2VvbWV0cnkgPSBmYWxzZTtcblxuICAgIGlmICh0aGlzLl9jdXJyZW50UGl0Y2ggIT09IHRoaXMuX2xpbWl0LnBpdGNoKSB7XG4gICAgICB0aGlzLl9jdXJyZW50UGl0Y2ggPSB0aGlzLl9saW1pdC5waXRjaDtcbiAgICAgIHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fY3VycmVudFlhdyAhPT0gdGhpcy5fbGltaXQueWF3KSB7XG4gICAgICB0aGlzLl9jdXJyZW50WWF3ID0gdGhpcy5fbGltaXQueWF3O1xuICAgICAgc2hvdWxkVXBkYXRlR2VvbWV0cnkgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmIChzaG91bGRVcGRhdGVHZW9tZXRyeSkge1xuICAgICAgdGhpcy5fYnVpbGRQb3NpdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2J1aWxkUG9zaXRpb24oKTogdm9pZCB7XG4gICAgLy8geS16IHBpdGNoIGFuZ2xlXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBBUkNfU0VHTUVOVFM7IGkrKykge1xuICAgICAgY29uc3QgcGl0Y2ggPSB0aGlzLl9jdXJyZW50UGl0Y2ggKiAoMi4wICogKGkgLyAoQVJDX1NFR01FTlRTIC0gMSkpIC0gMS4wKTtcblxuICAgICAgdGhpcy5fYXR0clBvcy5zZXRYWVooaSwgMCwgTWF0aC5jb3MocGl0Y2gpLCBNYXRoLnNpbihwaXRjaCkpO1xuICAgIH1cblxuICAgIC8vIHBpdGNoIGFyYyBhdCBlZGdlc1xuICAgIHtcbiAgICAgIGNvbnN0IGNvc1lhdyA9IE1hdGguY29zKHRoaXMuX2N1cnJlbnRZYXcpO1xuICAgICAgY29uc3Qgc2luWWF3ID0gTWF0aC5zaW4odGhpcy5fY3VycmVudFlhdyk7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgQVJDX1NFR01FTlRTIC0gMTsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHBpdGNoID0gdGhpcy5fY3VycmVudFBpdGNoICogKDIuMCAqIChpIC8gKEFSQ19TRUdNRU5UUyAtIDEpKSAtIDEuMCk7XG4gICAgICAgIGNvbnN0IGNvc1BpdGNoID0gTWF0aC5jb3MocGl0Y2gpO1xuICAgICAgICBjb25zdCBzaW5QaXRjaCA9IE1hdGguc2luKHBpdGNoKTtcblxuICAgICAgICB0aGlzLl9hdHRyUG9zLnNldFhZWihBUkNfU0VHTUVOVFMgKyBpLCBzaW5ZYXcsIGNvc1lhdyAqIGNvc1BpdGNoLCBjb3NZYXcgKiBzaW5QaXRjaCk7XG4gICAgICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKEFSQ19TRUdNRU5UUyArIDIgKiAoQVJDX1NFR01FTlRTIC0gMSkgKyBpLCAtc2luWWF3LCBjb3NZYXcgKiBjb3NQaXRjaCwgLWNvc1lhdyAqIHNpblBpdGNoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB5YXcgYXJjIGF0IGVkZ2VzXG4gICAge1xuICAgICAgY29uc3QgY29zUGl0Y2ggPSBNYXRoLmNvcyh0aGlzLl9jdXJyZW50UGl0Y2gpO1xuICAgICAgY29uc3Qgc2luUGl0Y2ggPSBNYXRoLnNpbih0aGlzLl9jdXJyZW50UGl0Y2gpO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEFSQ19TRUdNRU5UUyAtIDE7IGkrKykge1xuICAgICAgICBjb25zdCB5YXcgPSB0aGlzLl9jdXJyZW50WWF3ICogKDIuMCAqIChpIC8gKEFSQ19TRUdNRU5UUyAtIDEpKSAtIDEuMCk7XG4gICAgICAgIGNvbnN0IGNvc1lhdyA9IE1hdGguY29zKHlhdyk7XG4gICAgICAgIGNvbnN0IHNpbllhdyA9IE1hdGguc2luKHlhdyk7XG5cbiAgICAgICAgdGhpcy5fYXR0clBvcy5zZXRYWVooQVJDX1NFR01FTlRTICsgQVJDX1NFR01FTlRTIC0gMSArIGksIC1zaW5ZYXcsIGNvc1lhdyAqIGNvc1BpdGNoLCBjb3NZYXcgKiBzaW5QaXRjaCk7XG4gICAgICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKEFSQ19TRUdNRU5UUyArIDMgKiAoQVJDX1NFR01FTlRTIC0gMSkgKyBpLCBzaW5ZYXcsIGNvc1lhdyAqIGNvc1BpdGNoLCAtY29zWWF3ICogc2luUGl0Y2gpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKEFSQ19TRUdNRU5UUyArIDQgKiAoQVJDX1NFR01FTlRTIC0gMSksIDAsIDAsIDApO1xuXG4gICAgdGhpcy5fYXR0clBvcy5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIF9idWlsZEluZGV4KCk6IHZvaWQge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgQVJDX1NFR01FTlRTIC0gMTsgaSsrKSB7XG4gICAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoaSAqIDIsIGksIGkgKyAxKTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQgKiAoQVJDX1NFR01FTlRTIC0gMSk7IGkrKykge1xuICAgICAgY29uc3QgaTEgPSAoaSArIDEpICUgKDQgKiAoQVJDX1NFR01FTlRTIC0gMSkpO1xuICAgICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKDIgKiAoQVJDX1NFR01FTlRTIC0gMSArIGkpLCBBUkNfU0VHTUVOVFMgKyBpLCBBUkNfU0VHTUVOVFMgKyBpMSk7XG4gICAgfVxuXG4gICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKDIgKiAoNSAqIChBUkNfU0VHTUVOVFMgLSAxKSksIEFSQ19TRUdNRU5UUyArIDQgKiAoQVJDX1NFR01FTlRTIC0gMSksIDApO1xuICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWSgyICogKDUgKiAoQVJDX1NFR01FTlRTIC0gMSkgKyAxKSwgQVJDX1NFR01FTlRTICsgNCAqIChBUkNfU0VHTUVOVFMgLSAxKSwgQVJDX1NFR01FTlRTIC0gMSk7XG4gICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKDIgKiAoNSAqIChBUkNfU0VHTUVOVFMgLSAxKSArIDIpLCBBUkNfU0VHTUVOVFMgKyA0ICogKEFSQ19TRUdNRU5UUyAtIDEpLCBBUkNfU0VHTUVOVFMpO1xuICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWShcbiAgICAgIDIgKiAoNSAqIChBUkNfU0VHTUVOVFMgLSAxKSArIDMpLFxuICAgICAgQVJDX1NFR01FTlRTICsgNCAqIChBUkNfU0VHTUVOVFMgLSAxKSxcbiAgICAgIEFSQ19TRUdNRU5UUyArIChBUkNfU0VHTUVOVFMgLSAxKSxcbiAgICApO1xuICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWShcbiAgICAgIDIgKiAoNSAqIChBUkNfU0VHTUVOVFMgLSAxKSArIDQpLFxuICAgICAgQVJDX1NFR01FTlRTICsgNCAqIChBUkNfU0VHTUVOVFMgLSAxKSxcbiAgICAgIEFSQ19TRUdNRU5UUyArIDIgKiAoQVJDX1NFR01FTlRTIC0gMSksXG4gICAgKTtcbiAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoXG4gICAgICAyICogKDUgKiAoQVJDX1NFR01FTlRTIC0gMSkgKyA1KSxcbiAgICAgIEFSQ19TRUdNRU5UUyArIDQgKiAoQVJDX1NFR01FTlRTIC0gMSksXG4gICAgICBBUkNfU0VHTUVOVFMgKyAzICogKEFSQ19TRUdNRU5UUyAtIDEpLFxuICAgICk7XG5cbiAgICB0aGlzLl9hdHRySW5kZXgubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHR5cGUgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZSB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGUnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBjb2xsaWRlciBvZiBhIHNwcmluZyBib25lLlxuICovXG5leHBvcnQgY2xhc3MgVlJNU3ByaW5nQm9uZUNvbGxpZGVyIGV4dGVuZHMgVEhSRUUuT2JqZWN0M0Qge1xuICAvKipcbiAgICogVGhlIHNoYXBlIG9mIHRoZSBjb2xsaWRlci5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBzaGFwZTogVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGU7XG5cbiAgLyoqXG4gICAqIFdvcmxkIHNwYWNlIG1hdHJpeCBmb3IgdGhlIGNvbGxpZGVyIHNoYXBlIHVzZWQgaW4gY29sbGlzaW9uIGNhbGN1bGF0aW9ucy5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBjb2xsaWRlck1hdHJpeCA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHNoYXBlOiBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnNoYXBlID0gc2hhcGU7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlV29ybGRNYXRyaXgodXBkYXRlUGFyZW50czogYm9vbGVhbiwgdXBkYXRlQ2hpbGRyZW46IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBzdXBlci51cGRhdGVXb3JsZE1hdHJpeCh1cGRhdGVQYXJlbnRzLCB1cGRhdGVDaGlsZHJlbik7XG5cbiAgICB1cGRhdGVDb2xsaWRlck1hdHJpeCh0aGlzLmNvbGxpZGVyTWF0cml4LCB0aGlzLm1hdHJpeFdvcmxkLCB0aGlzLnNoYXBlLm9mZnNldCk7XG4gIH1cbn1cblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgY29sbGlkZXJNYXRyaXggYmFzZWQgb24gYW4gb2Zmc2V0IGFuZCBhIHdvcmxkIG1hdHJpeC5cbiAqIEVxdWl2YWxlbnQgdG8gdGhlIGZvbGxvd2luZyBjb2RlIHdoZW4gbWF0cml4V29ybGQgaXMgYW4gYWZmaW5lIG1hdHJpeDpcbiAqIGBgYGpzXG4gKiBvdXQubWFrZVRyYW5zbGF0aW9uKG9mZnNldCkucHJlbXVsdGlwbHkobWF0cml4V29ybGQpXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0gY29sbGlkZXJNYXRyaXggVGhlIHRhcmdldCBtYXRyaXggdG8gc3RvcmUgdGhlIHJlc3VsdCBpbi5cbiAqIEBwYXJhbSBtYXRyaXhXb3JsZCBUaGUgd29ybGQgbWF0cml4IGZvIHRoZSBjb2xsaWRlciBvYmplY3QuXG4gKiBAcGFyYW0gb2Zmc2V0IE9wdGlvbmFsIG9mZnNldCB0byB0aGUgY29sbGlkZXIgc2hhcGUuXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZUNvbGxpZGVyTWF0cml4KGNvbGxpZGVyTWF0cml4OiBUSFJFRS5NYXRyaXg0LCBtYXRyaXhXb3JsZDogVEhSRUUuTWF0cml4NCwgb2Zmc2V0PzogVEhSRUUuVmVjdG9yMykge1xuICBjb25zdCBtZSA9IG1hdHJpeFdvcmxkLmVsZW1lbnRzO1xuXG4gIGNvbGxpZGVyTWF0cml4LmNvcHkobWF0cml4V29ybGQpO1xuXG4gIGlmIChvZmZzZXQpIHtcbiAgICBjb2xsaWRlck1hdHJpeC5lbGVtZW50c1sxMl0gPSBtZVswXSAqIG9mZnNldC54ICsgbWVbNF0gKiBvZmZzZXQueSArIG1lWzhdICogb2Zmc2V0LnogKyBtZVsxMl07XG4gICAgY29sbGlkZXJNYXRyaXguZWxlbWVudHNbMTNdID0gbWVbMV0gKiBvZmZzZXQueCArIG1lWzVdICogb2Zmc2V0LnkgKyBtZVs5XSAqIG9mZnNldC56ICsgbWVbMTNdO1xuICAgIGNvbGxpZGVyTWF0cml4LmVsZW1lbnRzWzE0XSA9IG1lWzJdICogb2Zmc2V0LnggKyBtZVs2XSAqIG9mZnNldC55ICsgbWVbMTBdICogb2Zmc2V0LnogKyBtZVsxNF07XG4gIH1cbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBNYXRyaXg0SW52ZXJzZUNhY2hlIH0gZnJvbSAnLi91dGlscy9NYXRyaXg0SW52ZXJzZUNhY2hlJztcbmltcG9ydCB7IGdldFdvcmxkUXVhdGVybmlvbkxpdGUgfSBmcm9tICcuL3V0aWxzL2dldFdvcmxkUXVhdGVybmlvbkxpdGUnO1xuaW1wb3J0IHR5cGUgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cCB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXAnO1xuaW1wb3J0IHR5cGUgeyBWUk1TcHJpbmdCb25lSm9pbnRTZXR0aW5ncyB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUpvaW50U2V0dGluZ3MnO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuaW1wb3J0IHR5cGUgeyBWUk1TcHJpbmdCb25lTWFuYWdlciB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZU1hbmFnZXInO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUxpbWl0IH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lTGltaXQnO1xuXG4vLyBiYXNlZCBvblxuLy8gaHR0cDovL3JvY2tldGp1bXAuc2tyLmpwL3VuaXR5M2QvMTA5L1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL2R3YW5nby9VbmlWUk0vYmxvYi9tYXN0ZXIvU2NyaXB0cy9TcHJpbmdCb25lL1ZSTVNwcmluZ0JvbmUuY3NcblxuY29uc3QgSURFTlRJVFlfTUFUUklYNCA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG5cbi8vIFx1OEEwOFx1N0I5N1x1NEUyRFx1MzA2RVx1NEUwMFx1NjY0Mlx1NEZERFx1NUI1OFx1NzUyOFx1NTkwOVx1NjU3MFx1RkYwOFx1NEUwMFx1NUVBNlx1MzBBNFx1MzBGM1x1MzBCOVx1MzBCRlx1MzBGM1x1MzBCOVx1MzA5Mlx1NEY1Q1x1MzA2M1x1MzA1Rlx1MzA4OVx1MzA0Mlx1MzA2OFx1MzA2Rlx1NEY3Rlx1MzA0NFx1NTZERVx1MzA1OVx1RkYwOVxuY29uc3QgX3YzQSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfdjNCID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF93b3JsZFNwYWNlSW5pdGlhbFJvdGF0aW9uID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblxuLyoqXG4gKiBUaGUgaW5pdGlhbCBsb2NhbCBtYXRyaXggaW4gdGhlIGN1cnJlbnQgd29ybGQgc3BhY2UuXG4gKiBBIHRlbXBvcmFyeSB2YXJpYWJsZSB3aGljaCBpcyB1c2VkIGluIGB1cGRhdGVgLlxuICovXG5jb25zdCBfd29ybGRTcGFjZUluaXRpYWxNYXRyaXggPSBuZXcgVEhSRUUuTWF0cml4NCgpO1xuXG4vKipcbiAqIFRoZSBpbnZlcnNlIG9mIHtAbGluayBfd29ybGRTcGFjZUluaXRpYWxNYXRyaXh9LlxuICogQSB0ZW1wb3JhcnkgdmFyaWFibGUgd2hpY2ggaXMgdXNlZCBpbiBgdXBkYXRlYC5cbiAqL1xuY29uc3QgX3dvcmxkU3BhY2VJbml0aWFsTWF0cml4SW52ID0gbmV3IFRIUkVFLk1hdHJpeDQoKTtcblxuLyoqXG4gKiBBIHRlbXBvcmFyeSB2YXJpYWJsZSB3aGljaCBpcyB1c2VkIGluIGB1cGRhdGVgXG4gKi9cbmNvbnN0IF93b3JsZFNwYWNlUG9zaXRpb24gPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4vKipcbiAqIEEgdGVtcG9yYXJ5IHZhcmlhYmxlIHdoaWNoIGlzIHVzZWQgaW4gYHVwZGF0ZWBcbiAqL1xuY29uc3QgX25leHRUYWlsID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuLyoqXG4gKiBBIGNsYXNzIHJlcHJlc2VudHMgYSBzaW5nbGUgam9pbnQgb2YgYSBzcHJpbmcgYm9uZS5cbiAqIEl0IHNob3VsZCBiZSBtYW5hZ2VkIGJ5IGEge0BsaW5rIFZSTVNwcmluZ0JvbmVNYW5hZ2VyfS5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTVNwcmluZ0JvbmVKb2ludCB7XG4gIC8qKlxuICAgKiBTZXR0aW5ncyBvZiB0aGUgYm9uZS5cbiAgICovXG4gIHB1YmxpYyBzZXR0aW5nczogVlJNU3ByaW5nQm9uZUpvaW50U2V0dGluZ3M7XG5cbiAgLyoqXG4gICAqIExpbWl0IGF0dGFjaGVkIHRvIHRoaXMgYm9uZS5cbiAgICovXG4gIHB1YmxpYyBsaW1pdDogVlJNU3ByaW5nQm9uZUxpbWl0IHwgbnVsbDtcblxuICAvKipcbiAgICogQ29sbGlkZXIgZ3JvdXBzIGF0dGFjaGVkIHRvIHRoaXMgYm9uZS5cbiAgICovXG4gIHB1YmxpYyBjb2xsaWRlckdyb3VwczogVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXBbXTtcblxuICAvKipcbiAgICogQW4gT2JqZWN0M0QgYXR0YWNoZWQgdG8gdGhpcyBib25lLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGJvbmU6IFRIUkVFLk9iamVjdDNEO1xuXG4gIC8qKlxuICAgKiBBbiBPYmplY3QzRCB0aGF0IHdpbGwgYmUgdXNlZCBhcyBhIHRhaWwgb2YgdGhpcyBzcHJpbmcgYm9uZS5cbiAgICogSXQgY2FuIGJlIG51bGwgd2hlbiB0aGUgc3ByaW5nIGJvbmUgaXMgaW1wb3J0ZWQgZnJvbSBWUk0gMC4wLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGNoaWxkOiBUSFJFRS5PYmplY3QzRCB8IG51bGw7XG5cbiAgLyoqXG4gICAqIEN1cnJlbnQgcG9zaXRpb24gb2YgY2hpbGQgdGFpbCwgaW4gY2VudGVyIHVuaXQuIFdpbGwgYmUgdXNlZCBmb3IgdmVybGV0IGludGVncmF0aW9uLlxuICAgKi9cbiAgcHJpdmF0ZSBfY3VycmVudFRhaWwgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4gIC8qKlxuICAgKiBQcmV2aW91cyBwb3NpdGlvbiBvZiBjaGlsZCB0YWlsLCBpbiBjZW50ZXIgdW5pdC4gV2lsbCBiZSB1c2VkIGZvciB2ZXJsZXQgaW50ZWdyYXRpb24uXG4gICAqL1xuICBwcml2YXRlIF9wcmV2VGFpbCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbiAgLyoqXG4gICAqIFRoZSBpbml0aWFsIGF4aXMgb2YgdGhlIGNoaWxkIGJvbmUsIGluIGxvY2FsIHVuaXQuXG4gICAqL1xuICBwcml2YXRlIF9ib25lQXhpcyA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbiAgLyoqXG4gICAqIFRoZSBsZW5ndGggb2YgdGhlIGJvbmUgaW4gd29ybGQgdW5pdC5cbiAgICogV2lsbCBiZSB1c2VkIGZvciBub3JtYWxpemF0aW9uIGluIHVwZGF0ZSBsb29wLCB3aWxsIGJlIHVwZGF0ZWQgYnkge0BsaW5rIF9jYWxjV29ybGRTcGFjZUJvbmVMZW5ndGh9LlxuICAgKlxuICAgKiBJdCdzIHNhbWUgYXMgbG9jYWwgdW5pdCBsZW5ndGggdW5sZXNzIHRoZXJlIGFyZSBzY2FsZSB0cmFuc2Zvcm1hdGlvbnMgaW4gdGhlIHdvcmxkIHNwYWNlLlxuICAgKi9cbiAgcHJpdmF0ZSBfd29ybGRTcGFjZUJvbmVMZW5ndGggPSAwLjA7XG5cbiAgLyoqXG4gICAqIFRoZSBsZW5ndGggb2YgdGhlIGJvbmUgaW4gd29ybGQgdW5pdC5cbiAgICpcbiAgICogSXQncyBzYW1lIGFzIGxvY2FsIHVuaXQgbGVuZ3RoIHVubGVzcyB0aGVyZSBhcmUgc2NhbGUgdHJhbnNmb3JtYXRpb25zIGluIHRoZSB3b3JsZCBzcGFjZS5cbiAgICpcbiAgICogSW50ZW5kZWQgdG8gYmUgdXNlZCBieSBoZWxwZXJzLlxuICAgKi9cbiAgcHVibGljIGdldCB3b3JsZFNwYWNlQm9uZUxlbmd0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl93b3JsZFNwYWNlQm9uZUxlbmd0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgb2YgZGVwZW5kZW5jaWVzIHRoYXQgbmVlZCB0byBiZSB1cGRhdGVkIGJlZm9yZSB0aGlzIGpvaW50LlxuICAgKi9cbiAgcHVibGljIGdldCBkZXBlbmRlbmNpZXMoKTogU2V0PFRIUkVFLk9iamVjdDNEPiB7XG4gICAgY29uc3Qgc2V0ID0gbmV3IFNldDxUSFJFRS5PYmplY3QzRD4oKTtcblxuICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuYm9uZS5wYXJlbnQ7XG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgc2V0LmFkZChwYXJlbnQpO1xuICAgIH1cblxuICAgIGZvciAobGV0IGNnID0gMDsgY2cgPCB0aGlzLmNvbGxpZGVyR3JvdXBzLmxlbmd0aDsgY2crKykge1xuICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCB0aGlzLmNvbGxpZGVyR3JvdXBzW2NnXS5jb2xsaWRlcnMubGVuZ3RoOyBjKyspIHtcbiAgICAgICAgc2V0LmFkZCh0aGlzLmNvbGxpZGVyR3JvdXBzW2NnXS5jb2xsaWRlcnNbY10pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzZXQ7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBzcHJpbmdib25lIHdpbGwgYmUgY2FsY3VsYXRlZCBiYXNlZCBvbiB0aGUgc3BhY2UgcmVsYXRpdmUgZnJvbSB0aGlzIG9iamVjdC5cbiAgICogSWYgdGhpcyBpcyBgbnVsbGAsIHNwcmluZ2JvbmUgd2lsbCBiZSBjYWxjdWxhdGVkIGluIHdvcmxkIHNwYWNlLlxuICAgKi9cbiAgcHJpdmF0ZSBfY2VudGVyOiBUSFJFRS5PYmplY3QzRCB8IG51bGwgPSBudWxsO1xuICBwdWJsaWMgZ2V0IGNlbnRlcigpOiBUSFJFRS5PYmplY3QzRCB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl9jZW50ZXI7XG4gIH1cbiAgcHVibGljIHNldCBjZW50ZXIoY2VudGVyOiBUSFJFRS5PYmplY3QzRCB8IG51bGwpIHtcbiAgICAvLyB1bmluc3RhbGwgaW52ZXJzZSBjYWNoZVxuICAgIGlmICh0aGlzLl9jZW50ZXI/LnVzZXJEYXRhLmludmVyc2VDYWNoZVByb3h5KSB7XG4gICAgICAodGhpcy5fY2VudGVyLnVzZXJEYXRhLmludmVyc2VDYWNoZVByb3h5IGFzIE1hdHJpeDRJbnZlcnNlQ2FjaGUpLnJldmVydCgpO1xuICAgICAgZGVsZXRlIHRoaXMuX2NlbnRlci51c2VyRGF0YS5pbnZlcnNlQ2FjaGVQcm94eTtcbiAgICB9XG5cbiAgICAvLyBjaGFuZ2UgdGhlIGNlbnRlclxuICAgIHRoaXMuX2NlbnRlciA9IGNlbnRlcjtcblxuICAgIC8vIGluc3RhbGwgaW52ZXJzZSBjYWNoZVxuICAgIGlmICh0aGlzLl9jZW50ZXIpIHtcbiAgICAgIGlmICghdGhpcy5fY2VudGVyLnVzZXJEYXRhLmludmVyc2VDYWNoZVByb3h5KSB7XG4gICAgICAgIHRoaXMuX2NlbnRlci51c2VyRGF0YS5pbnZlcnNlQ2FjaGVQcm94eSA9IG5ldyBNYXRyaXg0SW52ZXJzZUNhY2hlKHRoaXMuX2NlbnRlci5tYXRyaXhXb3JsZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWwgc3RhdGUgb2YgdGhlIGxvY2FsIG1hdHJpeCBvZiB0aGUgYm9uZS5cbiAgICovXG4gIHByaXZhdGUgX2luaXRpYWxMb2NhbE1hdHJpeCA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG5cbiAgLyoqXG4gICAqIEluaXRpYWwgc3RhdGUgb2YgdGhlIHJvdGF0aW9uIG9mIHRoZSBib25lLlxuICAgKi9cbiAgcHJpdmF0ZSBfaW5pdGlhbExvY2FsUm90YXRpb24gPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXG4gIC8qKlxuICAgKiBJbml0aWFsIHN0YXRlIG9mIHRoZSBwb3NpdGlvbiBvZiBpdHMgY2hpbGQuXG4gICAqL1xuICBwcml2YXRlIF9pbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuICAvKipcbiAgICogSW5pdGlhbCBzdGF0ZSBvZiB0aGUgcG9zaXRpb24gb2YgaXRzIGNoaWxkLlxuICAgKlxuICAgKiBJbnRlbmRlZCB0byBiZSB1c2VkIGJ5IGhlbHBlcnMuXG4gICAqL1xuICBwdWJsaWMgZ2V0IGluaXRpYWxMb2NhbENoaWxkUG9zaXRpb24oKTogVEhSRUUuVmVjdG9yMyB7XG4gICAgcmV0dXJuIHRoaXMuX2luaXRpYWxMb2NhbENoaWxkUG9zaXRpb247XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgd29ybGQgbWF0cml4IG9mIGl0cyBwYXJlbnQgb2JqZWN0LlxuICAgKiBOb3RlIHRoYXQgaXQgcmV0dXJucyBhIHJlZmVyZW5jZSB0byB0aGUgbWF0cml4LiBEb24ndCBtdXRhdGUgdGhpcyBkaXJlY3RseSFcbiAgICovXG4gIHByaXZhdGUgZ2V0IF9wYXJlbnRNYXRyaXhXb3JsZCgpOiBUSFJFRS5NYXRyaXg0IHtcbiAgICByZXR1cm4gdGhpcy5ib25lLnBhcmVudCA/IHRoaXMuYm9uZS5wYXJlbnQubWF0cml4V29ybGQgOiBJREVOVElUWV9NQVRSSVg0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBWUk1TcHJpbmdCb25lLlxuICAgKlxuICAgKiBAcGFyYW0gYm9uZSBBbiBPYmplY3QzRCB0aGF0IHdpbGwgYmUgYXR0YWNoZWQgdG8gdGhpcyBib25lXG4gICAqIEBwYXJhbSBjaGlsZCBBbiBPYmplY3QzRCB0aGF0IHdpbGwgYmUgdXNlZCBhcyBhIHRhaWwgb2YgdGhpcyBzcHJpbmcgYm9uZS4gSXQgY2FuIGJlIG51bGwgd2hlbiB0aGUgc3ByaW5nIGJvbmUgaXMgaW1wb3J0ZWQgZnJvbSBWUk0gMC4wXG4gICAqIEBwYXJhbSBzZXR0aW5ncyBTZXZlcmFsIHBhcmFtZXRlcnMgcmVsYXRlZCB0byBiZWhhdmlvciBvZiB0aGUgc3ByaW5nIGJvbmVcbiAgICogQHBhcmFtIGNvbGxpZGVyR3JvdXBzIENvbGxpZGVyIGdyb3VwcyB0aGF0IHdpbGwgYmUgY29sbGlkZWQgd2l0aCB0aGlzIHNwcmluZyBib25lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBib25lOiBUSFJFRS5PYmplY3QzRCxcbiAgICBjaGlsZDogVEhSRUUuT2JqZWN0M0QgfCBudWxsLFxuICAgIHNldHRpbmdzOiBQYXJ0aWFsPFZSTVNwcmluZ0JvbmVKb2ludFNldHRpbmdzPiA9IHt9LFxuICAgIGNvbGxpZGVyR3JvdXBzOiBWUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cFtdID0gW10sXG4gICkge1xuICAgIHRoaXMuYm9uZSA9IGJvbmU7IC8vIHVuaVZSTVx1MzA2N1x1MzA2RSBwYXJlbnRcbiAgICB0aGlzLmJvbmUubWF0cml4QXV0b1VwZGF0ZSA9IGZhbHNlOyAvLyB1cGRhdGVcdTMwNkJcdTMwODhcdTMwOEFcdThBMDhcdTdCOTdcdTMwNTVcdTMwOENcdTMwOEJcdTMwNkVcdTMwNjd0aHJlZS5qc1x1NTE4NVx1MzA2N1x1MzA2RVx1ODFFQVx1NTJENVx1NTFFNlx1NzQwNlx1MzA2Rlx1NEUwRFx1ODk4MVxuXG4gICAgdGhpcy5jaGlsZCA9IGNoaWxkO1xuXG4gICAgdGhpcy5zZXR0aW5ncyA9IHtcbiAgICAgIGhpdFJhZGl1czogc2V0dGluZ3MuaGl0UmFkaXVzID8/IDAuMCxcbiAgICAgIHN0aWZmbmVzczogc2V0dGluZ3Muc3RpZmZuZXNzID8/IDEuMCxcbiAgICAgIGdyYXZpdHlQb3dlcjogc2V0dGluZ3MuZ3Jhdml0eVBvd2VyID8/IDAuMCxcbiAgICAgIGdyYXZpdHlEaXI6IHNldHRpbmdzLmdyYXZpdHlEaXI/LmNsb25lKCkgPz8gbmV3IFRIUkVFLlZlY3RvcjMoMC4wLCAtMS4wLCAwLjApLFxuICAgICAgZHJhZ0ZvcmNlOiBzZXR0aW5ncy5kcmFnRm9yY2UgPz8gMC40LFxuICAgIH07XG5cbiAgICB0aGlzLmxpbWl0ID0gbnVsbDtcblxuICAgIHRoaXMuY29sbGlkZXJHcm91cHMgPSBjb2xsaWRlckdyb3VwcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGluaXRpYWwgc3RhdGUgb2YgdGhpcyBzcHJpbmcgYm9uZS5cbiAgICogWW91IG1pZ2h0IHdhbnQgdG8gY2FsbCB7QGxpbmsgVlJNU3ByaW5nQm9uZU1hbmFnZXIuc2V0SW5pdFN0YXRlfSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIHNldEluaXRTdGF0ZSgpOiB2b2lkIHtcbiAgICAvLyByZW1lbWJlciBpbml0aWFsIHBvc2l0aW9uIG9mIGl0c2VsZlxuICAgIHRoaXMuX2luaXRpYWxMb2NhbE1hdHJpeC5jb3B5KHRoaXMuYm9uZS5tYXRyaXgpO1xuICAgIHRoaXMuX2luaXRpYWxMb2NhbFJvdGF0aW9uLmNvcHkodGhpcy5ib25lLnF1YXRlcm5pb24pO1xuXG4gICAgLy8gc2VlIGluaXRpYWwgcG9zaXRpb24gb2YgaXRzIGxvY2FsIGNoaWxkXG4gICAgaWYgKHRoaXMuY2hpbGQpIHtcbiAgICAgIHRoaXMuX2luaXRpYWxMb2NhbENoaWxkUG9zaXRpb24uY29weSh0aGlzLmNoaWxkLnBvc2l0aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gdnJtMCByZXF1aXJlcyBhIDdjbSBmaXhlZCBib25lIGxlbmd0aCBmb3IgdGhlIGZpbmFsIG5vZGUgaW4gYSBjaGFpblxuICAgICAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vdnJtLWMvdnJtLXNwZWNpZmljYXRpb24vdHJlZS9tYXN0ZXIvc3BlY2lmaWNhdGlvbi9WUk1DX3NwcmluZ0JvbmUtMS4wI2Fib3V0LXNwcmluZy1jb25maWd1cmF0aW9uXG4gICAgICB0aGlzLl9pbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uLmNvcHkodGhpcy5ib25lLnBvc2l0aW9uKS5ub3JtYWxpemUoKS5tdWx0aXBseVNjYWxhcigwLjA3KTtcbiAgICB9XG5cbiAgICAvLyBjb3B5IHRoZSBjaGlsZCBwb3NpdGlvbiB0byB0YWlsc1xuICAgIGNvbnN0IG1hdHJpeFdvcmxkVG9DZW50ZXIgPSB0aGlzLl9nZXRNYXRyaXhXb3JsZFRvQ2VudGVyKCk7XG4gICAgdGhpcy5ib25lLmxvY2FsVG9Xb3JsZCh0aGlzLl9jdXJyZW50VGFpbC5jb3B5KHRoaXMuX2luaXRpYWxMb2NhbENoaWxkUG9zaXRpb24pKS5hcHBseU1hdHJpeDQobWF0cml4V29ybGRUb0NlbnRlcik7XG4gICAgdGhpcy5fcHJldlRhaWwuY29weSh0aGlzLl9jdXJyZW50VGFpbCk7XG5cbiAgICAvLyBzZXQgaW5pdGlhbCBzdGF0ZXMgdGhhdCBhcmUgcmVsYXRlZCB0byBsb2NhbCBjaGlsZCBwb3NpdGlvblxuICAgIHRoaXMuX2JvbmVBeGlzLmNvcHkodGhpcy5faW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbikubm9ybWFsaXplKCk7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhlIHN0YXRlIG9mIHRoaXMgYm9uZS5cbiAgICogWW91IG1pZ2h0IHdhbnQgdG8gY2FsbCB7QGxpbmsgVlJNU3ByaW5nQm9uZU1hbmFnZXIucmVzZXR9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy5ib25lLnF1YXRlcm5pb24uY29weSh0aGlzLl9pbml0aWFsTG9jYWxSb3RhdGlvbik7XG5cbiAgICAvLyBXZSBuZWVkIHRvIHVwZGF0ZSBpdHMgbWF0cml4V29ybGQgbWFudWFsbHksIHNpbmNlIHdlIHR3ZWFrZWQgdGhlIGJvbmUgYnkgb3VyIGhhbmRcbiAgICB0aGlzLmJvbmUudXBkYXRlTWF0cml4KCk7XG4gICAgdGhpcy5ib25lLm1hdHJpeFdvcmxkLm11bHRpcGx5TWF0cmljZXModGhpcy5fcGFyZW50TWF0cml4V29ybGQsIHRoaXMuYm9uZS5tYXRyaXgpO1xuXG4gICAgLy8gQXBwbHkgdXBkYXRlZCBwb3NpdGlvbiB0byB0YWlsIHN0YXRlc1xuICAgIGNvbnN0IG1hdHJpeFdvcmxkVG9DZW50ZXIgPSB0aGlzLl9nZXRNYXRyaXhXb3JsZFRvQ2VudGVyKCk7XG4gICAgdGhpcy5ib25lLmxvY2FsVG9Xb3JsZCh0aGlzLl9jdXJyZW50VGFpbC5jb3B5KHRoaXMuX2luaXRpYWxMb2NhbENoaWxkUG9zaXRpb24pKS5hcHBseU1hdHJpeDQobWF0cml4V29ybGRUb0NlbnRlcik7XG4gICAgdGhpcy5fcHJldlRhaWwuY29weSh0aGlzLl9jdXJyZW50VGFpbCk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSBzdGF0ZSBvZiB0aGlzIGJvbmUuXG4gICAqIFlvdSBtaWdodCB3YW50IHRvIGNhbGwge0BsaW5rIFZSTVNwcmluZ0JvbmVNYW5hZ2VyLnVwZGF0ZX0gaW5zdGVhZC5cbiAgICpcbiAgICogQHBhcmFtIGRlbHRhIGRlbHRhVGltZVxuICAgKi9cbiAgcHVibGljIHVwZGF0ZShkZWx0YTogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKGRlbHRhIDw9IDApIHJldHVybjtcblxuICAgIC8vIFVwZGF0ZSB0aGUgX3dvcmxkU3BhY2VCb25lTGVuZ3RoXG4gICAgdGhpcy5fY2FsY1dvcmxkU3BhY2VCb25lTGVuZ3RoKCk7XG5cbiAgICAvLyBTZXQgdGVtcG9yYXJ5IHZhcmlhYmxlc1xuICAgIF93b3JsZFNwYWNlSW5pdGlhbE1hdHJpeC5jb3B5KHRoaXMuX3BhcmVudE1hdHJpeFdvcmxkKS5tdWx0aXBseSh0aGlzLl9pbml0aWFsTG9jYWxNYXRyaXgpO1xuICAgIF93b3JsZFNwYWNlSW5pdGlhbE1hdHJpeEludi5jb3B5KF93b3JsZFNwYWNlSW5pdGlhbE1hdHJpeCkuaW52ZXJ0KCk7XG4gICAgX3dvcmxkU3BhY2VQb3NpdGlvbi5zZXRGcm9tTWF0cml4UG9zaXRpb24odGhpcy5ib25lLm1hdHJpeFdvcmxkKTtcblxuICAgIC8vIFByZWNhbGMgdGhlIHJvdGF0aW9uIG9mIHRoZSBsaW1pdFxuICAgIGlmICh0aGlzLmxpbWl0KSB7XG4gICAgICAvLyBjYWxjdWxhdGUgKHBhcmVudFdvcmxkUm90YXRpb24gKiBsb2NhbFNwYWNlSW5pdGlhbFJvdGF0aW9uKVxuICAgICAgaWYgKHRoaXMuYm9uZS5wYXJlbnQpIHtcbiAgICAgICAgZ2V0V29ybGRRdWF0ZXJuaW9uTGl0ZSh0aGlzLmJvbmUucGFyZW50LCBfd29ybGRTcGFjZUluaXRpYWxSb3RhdGlvbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfd29ybGRTcGFjZUluaXRpYWxSb3RhdGlvbi5pZGVudGl0eSgpO1xuICAgICAgfVxuICAgICAgX3dvcmxkU3BhY2VJbml0aWFsUm90YXRpb24ubXVsdGlwbHkodGhpcy5faW5pdGlhbExvY2FsUm90YXRpb24pLm5vcm1hbGl6ZSgpO1xuICAgICAgdGhpcy5saW1pdC5pbnRlcm5hbFByZWNhbGNSb3RhdGlvbihfd29ybGRTcGFjZUluaXRpYWxSb3RhdGlvbiwgdGhpcy5fYm9uZUF4aXMpO1xuICAgIH1cblxuICAgIC8vIEdldCBib25lQXhpcyBpbiB3b3JsZCBzcGFjZVxuICAgIGNvbnN0IHdvcmxkU3BhY2VCb25lQXhpcyA9IF92M0IuY29weSh0aGlzLl9ib25lQXhpcykudHJhbnNmb3JtRGlyZWN0aW9uKF93b3JsZFNwYWNlSW5pdGlhbE1hdHJpeCk7XG5cbiAgICAvLyB2ZXJsZXRcdTdBNERcdTUyMDZcdTMwNjdcdTZCMjFcdTMwNkVcdTRGNERcdTdGNkVcdTMwOTJcdThBMDhcdTdCOTdcbiAgICBfbmV4dFRhaWxcbiAgICAgIC8vIERldGVybWluZSBpbmVydGlhIGluIGNlbnRlciBzcGFjZVxuICAgICAgLmNvcHkodGhpcy5fY3VycmVudFRhaWwpXG4gICAgICAuYWRkKF92M0Euc3ViVmVjdG9ycyh0aGlzLl9jdXJyZW50VGFpbCwgdGhpcy5fcHJldlRhaWwpLm11bHRpcGx5U2NhbGFyKDEgLSB0aGlzLnNldHRpbmdzLmRyYWdGb3JjZSkpIC8vIFx1NTI0RFx1MzBENVx1MzBFQ1x1MzBGQ1x1MzBFMFx1MzA2RVx1NzlGQlx1NTJENVx1MzA5Mlx1N0Q5OVx1N0Q5QVx1MzA1OVx1MzA4QihcdTZFMUJcdTg4NzBcdTMwODJcdTMwNDJcdTMwOEJcdTMwODgpXG4gICAgICAvLyBDb252ZXJ0IGNlbnRlciBzcGFjZSB0byB3b3JsZCBzcGFjZVxuICAgICAgLmFwcGx5TWF0cml4NCh0aGlzLl9nZXRNYXRyaXhDZW50ZXJUb1dvcmxkKCkpIC8vIHRhaWxcdTMwOTJ3b3JsZCBzcGFjZVx1MzA2Qlx1NjIzQlx1MzA1OVxuICAgICAgLy8gQXBwbHkgc3RpZmZuZXNzIGFuZCBncmF2aXR5IGluIHdvcmxkIHNwYWNlXG4gICAgICAuYWRkU2NhbGVkVmVjdG9yKHdvcmxkU3BhY2VCb25lQXhpcywgdGhpcy5zZXR0aW5ncy5zdGlmZm5lc3MgKiBkZWx0YSkgLy8gXHU4OUFBXHUzMDZFXHU1NkRFXHU4RUUyXHUzMDZCXHUzMDg4XHUzMDhCXHU1QjUwXHUzMERDXHUzMEZDXHUzMEYzXHUzMDZFXHU3OUZCXHU1MkQ1XHU3NkVFXHU2QTE5XG4gICAgICAuYWRkU2NhbGVkVmVjdG9yKHRoaXMuc2V0dGluZ3MuZ3Jhdml0eURpciwgdGhpcy5zZXR0aW5ncy5ncmF2aXR5UG93ZXIgKiBkZWx0YSk7IC8vIFx1NTkxNlx1NTI5Qlx1MzA2Qlx1MzA4OFx1MzA4Qlx1NzlGQlx1NTJENVx1OTFDRlxuXG4gICAgLy8gQXBwbHkgbGltaXQgLSAxc3QgdGltZVxuICAgIF9uZXh0VGFpbC5zdWIoX3dvcmxkU3BhY2VQb3NpdGlvbikubm9ybWFsaXplKCk7XG4gICAgdGhpcy5saW1pdD8uY2FsY3VsYXRlTGltaXQoX25leHRUYWlsKTtcbiAgICBfbmV4dFRhaWwubXVsdGlwbHlTY2FsYXIodGhpcy5fd29ybGRTcGFjZUJvbmVMZW5ndGgpLmFkZChfd29ybGRTcGFjZVBvc2l0aW9uKTtcblxuICAgIC8vIENhbGN1bGF0ZSBjb2xsaXNpb25zXG4gICAgdGhpcy5fY29sbGlzaW9uKF9uZXh0VGFpbCk7XG5cbiAgICAvLyB1cGRhdGUgcHJldlRhaWwgYW5kIGN1cnJlbnRUYWlsXG4gICAgdGhpcy5fcHJldlRhaWwuY29weSh0aGlzLl9jdXJyZW50VGFpbCk7XG4gICAgdGhpcy5fY3VycmVudFRhaWwuY29weShfbmV4dFRhaWwpLmFwcGx5TWF0cml4NCh0aGlzLl9nZXRNYXRyaXhXb3JsZFRvQ2VudGVyKCkpO1xuXG4gICAgLy8gQXBwbHkgcm90YXRpb24sIGNvbnZlcnQgdmVjdG9yMyB0aGluZyBpbnRvIGFjdHVhbCBxdWF0ZXJuaW9uXG4gICAgLy8gT3JpZ2luYWwgVW5pVlJNIGlzIGRvaW5nIGNlbnRlciB1bml0IGNhbGN1bHVzIGF0IGhlcmUgYnV0IHdlJ3JlIGdvbm5hIGRvIHRoaXMgb24gbG9jYWwgdW5pdFxuICAgIHRoaXMuYm9uZS5xdWF0ZXJuaW9uXG4gICAgICAuc2V0RnJvbVVuaXRWZWN0b3JzKHRoaXMuX2JvbmVBeGlzLCBfdjNBLmNvcHkoX25leHRUYWlsKS5hcHBseU1hdHJpeDQoX3dvcmxkU3BhY2VJbml0aWFsTWF0cml4SW52KS5ub3JtYWxpemUoKSlcbiAgICAgIC5wcmVtdWx0aXBseSh0aGlzLl9pbml0aWFsTG9jYWxSb3RhdGlvbik7XG5cbiAgICAvLyBXZSBuZWVkIHRvIHVwZGF0ZSBpdHMgbWF0cml4V29ybGQgbWFudWFsbHksIHNpbmNlIHdlIHR3ZWFrZWQgdGhlIGJvbmUgYnkgb3VyIGhhbmRcbiAgICB0aGlzLmJvbmUudXBkYXRlTWF0cml4KCk7XG4gICAgdGhpcy5ib25lLm1hdHJpeFdvcmxkLm11bHRpcGx5TWF0cmljZXModGhpcy5fcGFyZW50TWF0cml4V29ybGQsIHRoaXMuYm9uZS5tYXRyaXgpO1xuICB9XG5cbiAgLyoqXG4gICAqIERvIGNvbGxpc2lvbiBtYXRoIGFnYWluc3QgZXZlcnkgY29sbGlkZXJzIGF0dGFjaGVkIHRvIHRoaXMgYm9uZS5cbiAgICpcbiAgICogQHBhcmFtIHRhaWwgVGhlIHRhaWwgeW91IHdhbnQgdG8gcHJvY2Vzc1xuICAgKi9cbiAgcHJpdmF0ZSBfY29sbGlzaW9uKHRhaWw6IFRIUkVFLlZlY3RvcjMpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBjZyA9IDA7IGNnIDwgdGhpcy5jb2xsaWRlckdyb3Vwcy5sZW5ndGg7IGNnKyspIHtcbiAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgdGhpcy5jb2xsaWRlckdyb3Vwc1tjZ10uY29sbGlkZXJzLmxlbmd0aDsgYysrKSB7XG4gICAgICAgIGNvbnN0IGNvbGxpZGVyID0gdGhpcy5jb2xsaWRlckdyb3Vwc1tjZ10uY29sbGlkZXJzW2NdO1xuICAgICAgICBjb25zdCBkaXN0ID0gY29sbGlkZXIuc2hhcGUuY2FsY3VsYXRlQ29sbGlzaW9uKGNvbGxpZGVyLmNvbGxpZGVyTWF0cml4LCB0YWlsLCB0aGlzLnNldHRpbmdzLmhpdFJhZGl1cywgX3YzQSk7XG5cbiAgICAgICAgaWYgKGRpc3QgPCAwLjApIHtcbiAgICAgICAgICAvLyBoaXRcbiAgICAgICAgICB0YWlsLmFkZFNjYWxlZFZlY3RvcihfdjNBLCAtZGlzdCk7XG5cbiAgICAgICAgICAvLyBBcHBseSBsaW1pdFxuICAgICAgICAgIHRhaWwuc3ViKF93b3JsZFNwYWNlUG9zaXRpb24pLm5vcm1hbGl6ZSgpO1xuICAgICAgICAgIHRoaXMubGltaXQ/LmNhbGN1bGF0ZUxpbWl0KHRhaWwpO1xuICAgICAgICAgIHRhaWwubXVsdGlwbHlTY2FsYXIodGhpcy5fd29ybGRTcGFjZUJvbmVMZW5ndGgpLmFkZChfd29ybGRTcGFjZVBvc2l0aW9uKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgdGhlIHtAbGluayBfd29ybGRTcGFjZUJvbmVMZW5ndGh9LlxuICAgKiBJbnRlbmRlZCB0byBiZSB1c2VkIGluIHtAbGluayB1cGRhdGV9LlxuICAgKi9cbiAgcHJpdmF0ZSBfY2FsY1dvcmxkU3BhY2VCb25lTGVuZ3RoKCk6IHZvaWQge1xuICAgIF92M0Euc2V0RnJvbU1hdHJpeFBvc2l0aW9uKHRoaXMuYm9uZS5tYXRyaXhXb3JsZCk7IC8vIGdldCB3b3JsZCBwb3NpdGlvbiBvZiB0aGlzLmJvbmVcblxuICAgIGlmICh0aGlzLmNoaWxkKSB7XG4gICAgICBfdjNCLnNldEZyb21NYXRyaXhQb3NpdGlvbih0aGlzLmNoaWxkLm1hdHJpeFdvcmxkKTsgLy8gZ2V0IHdvcmxkIHBvc2l0aW9uIG9mIHRoaXMuY2hpbGRcbiAgICB9IGVsc2Uge1xuICAgICAgX3YzQi5jb3B5KHRoaXMuX2luaXRpYWxMb2NhbENoaWxkUG9zaXRpb24pO1xuICAgICAgX3YzQi5hcHBseU1hdHJpeDQodGhpcy5ib25lLm1hdHJpeFdvcmxkKTtcbiAgICB9XG5cbiAgICB0aGlzLl93b3JsZFNwYWNlQm9uZUxlbmd0aCA9IF92M0Euc3ViKF92M0IpLmxlbmd0aCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG1hdHJpeCB0aGF0IGNvbnZlcnRzIGNlbnRlciBzcGFjZSBpbnRvIHdvcmxkIHNwYWNlLlxuICAgKi9cbiAgcHJpdmF0ZSBfZ2V0TWF0cml4Q2VudGVyVG9Xb3JsZCgpOiBUSFJFRS5NYXRyaXg0IHtcbiAgICByZXR1cm4gdGhpcy5fY2VudGVyID8gdGhpcy5fY2VudGVyLm1hdHJpeFdvcmxkIDogSURFTlRJVFlfTUFUUklYNDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBtYXRyaXggdGhhdCBjb252ZXJ0cyB3b3JsZCBzcGFjZSBpbnRvIGNlbnRlciBzcGFjZS5cbiAgICovXG4gIHByaXZhdGUgX2dldE1hdHJpeFdvcmxkVG9DZW50ZXIoKTogVEhSRUUuTWF0cml4NCB7XG4gICAgcmV0dXJuIHRoaXMuX2NlbnRlciA/ICh0aGlzLl9jZW50ZXIudXNlckRhdGEuaW52ZXJzZUNhY2hlUHJveHkgYXMgTWF0cml4NEludmVyc2VDYWNoZSkuaW52ZXJzZSA6IElERU5USVRZX01BVFJJWDQ7XG4gIH1cbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBtYXQ0SW52ZXJ0Q29tcGF0IH0gZnJvbSAnLi9tYXQ0SW52ZXJ0Q29tcGF0JztcblxuZXhwb3J0IGNsYXNzIE1hdHJpeDRJbnZlcnNlQ2FjaGUge1xuICAvKipcbiAgICogVGhlIHRhcmdldCBtYXRyaXguXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgbWF0cml4OiBUSFJFRS5NYXRyaXg0O1xuXG4gIC8qKlxuICAgKiBBIGNhY2hlIG9mIGludmVyc2Ugb2YgY3VycmVudCBtYXRyaXguXG4gICAqL1xuICBwcml2YXRlIHJlYWRvbmx5IF9pbnZlcnNlQ2FjaGUgPSBuZXcgVEhSRUUuTWF0cml4NCgpO1xuXG4gIC8qKlxuICAgKiBBIGZsYWcgdGhhdCBtYWtlcyBpdCB3YW50IHRvIHJlY2FsY3VsYXRlIGl0cyB7QGxpbmsgX2ludmVyc2VDYWNoZX0uXG4gICAqIFdpbGwgYmUgc2V0IGB0cnVlYCB3aGVuIGBlbGVtZW50c2AgYXJlIG11dGF0ZWQgYW5kIGJlIHVzZWQgaW4gYGdldEludmVyc2VgLlxuICAgKi9cbiAgcHJpdmF0ZSBfc2hvdWxkVXBkYXRlSW52ZXJzZSA9IHRydWU7XG5cbiAgLyoqXG4gICAqIFRoZSBvcmlnaW5hbCBvZiBgbWF0cml4LmVsZW1lbnRzYFxuICAgKi9cbiAgcHJpdmF0ZSByZWFkb25seSBfb3JpZ2luYWxFbGVtZW50czogVEhSRUUuTWF0cml4NFR1cGxlO1xuXG4gIC8qKlxuICAgKiBJbnZlcnNlIG9mIGdpdmVuIG1hdHJpeC5cbiAgICogTm90ZSB0aGF0IGl0IHdpbGwgcmV0dXJuIGl0cyBpbnRlcm5hbCBwcml2YXRlIGluc3RhbmNlLlxuICAgKiBNYWtlIHN1cmUgY29weWluZyB0aGlzIGJlZm9yZSBtdXRhdGUgdGhpcy5cbiAgICovXG4gIHB1YmxpYyBnZXQgaW52ZXJzZSgpOiBUSFJFRS5NYXRyaXg0IHtcbiAgICBpZiAodGhpcy5fc2hvdWxkVXBkYXRlSW52ZXJzZSkge1xuICAgICAgbWF0NEludmVydENvbXBhdCh0aGlzLl9pbnZlcnNlQ2FjaGUuY29weSh0aGlzLm1hdHJpeCkpO1xuICAgICAgdGhpcy5fc2hvdWxkVXBkYXRlSW52ZXJzZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9pbnZlcnNlQ2FjaGU7XG4gIH1cblxuICBwdWJsaWMgY29uc3RydWN0b3IobWF0cml4OiBUSFJFRS5NYXRyaXg0KSB7XG4gICAgdGhpcy5tYXRyaXggPSBtYXRyaXg7XG5cbiAgICBjb25zdCBoYW5kbGVyOiBQcm94eUhhbmRsZXI8bnVtYmVyW10+ID0ge1xuICAgICAgc2V0OiAob2JqLCBwcm9wOiBhbnksIG5ld1ZhbCkgPT4ge1xuICAgICAgICB0aGlzLl9zaG91bGRVcGRhdGVJbnZlcnNlID0gdHJ1ZTtcbiAgICAgICAgb2JqW3Byb3BdID0gbmV3VmFsO1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSxcbiAgICB9O1xuXG4gICAgdGhpcy5fb3JpZ2luYWxFbGVtZW50cyA9IG1hdHJpeC5lbGVtZW50cztcbiAgICBtYXRyaXguZWxlbWVudHMgPSBuZXcgUHJveHk8VEhSRUUuTWF0cml4NFR1cGxlPihtYXRyaXguZWxlbWVudHMsIGhhbmRsZXIpO1xuICB9XG5cbiAgcHVibGljIHJldmVydCgpOiB2b2lkIHtcbiAgICB0aGlzLm1hdHJpeC5lbGVtZW50cyA9IHRoaXMuX29yaWdpbmFsRWxlbWVudHM7XG4gIH1cbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbmNvbnN0IF9tYXRBID0gbmV3IFRIUkVFLk1hdHJpeDQoKTtcblxuLyoqXG4gKiBBIGNvbXBhdCBmdW5jdGlvbiBmb3IgYE1hdHJpeDQuaW52ZXJ0KClgIC8gYE1hdHJpeDQuZ2V0SW52ZXJzZSgpYC5cbiAqIGBNYXRyaXg0LmludmVydCgpYCBpcyBpbnRyb2R1Y2VkIGluIHIxMjMgYW5kIGBNYXRyaXg0LmdldEludmVyc2UoKWAgZW1pdHMgYSB3YXJuaW5nLlxuICogV2UgYXJlIGdvaW5nIHRvIHVzZSB0aGlzIGNvbXBhdCBmb3IgYSB3aGlsZS5cbiAqIEBwYXJhbSB0YXJnZXQgQSB0YXJnZXQgbWF0cml4XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYXQ0SW52ZXJ0Q29tcGF0PFQgZXh0ZW5kcyBUSFJFRS5NYXRyaXg0Pih0YXJnZXQ6IFQpOiBUIHtcbiAgaWYgKCh0YXJnZXQgYXMgYW55KS5pbnZlcnQpIHtcbiAgICB0YXJnZXQuaW52ZXJ0KCk7XG4gIH0gZWxzZSB7XG4gICAgKHRhcmdldCBhcyBhbnkpLmdldEludmVyc2UoX21hdEEuY29weSh0YXJnZXQpKTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG5jb25zdCBfcG9zaXRpb24gPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3NjYWxlID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuLyoqXG4gKiBBIHJlcGxhY2VtZW50IG9mIGBPYmplY3QzRC5nZXRXb3JsZFF1YXRlcm5pb25gLlxuICogRXh0cmFjdCB0aGUgd29ybGQgcXVhdGVybmlvbiBvZiBhbiBvYmplY3QgZnJvbSBpdHMgd29ybGQgc3BhY2UgbWF0cml4LCB3aXRob3V0IGNhbGxpbmcgYE9iamVjdDNELnVwZGF0ZVdvcmxkTWF0cml4YC5cbiAqIFVzZSB0aGlzIHdoZW4geW91J3JlIHN1cmUgdGhhdCB0aGUgd29ybGQgbWF0cml4IGlzIHVwLXRvLWRhdGUuXG4gKlxuICogQHBhcmFtIG9iamVjdCBUaGUgb2JqZWN0XG4gKiBAcGFyYW0gb3V0IEEgdGFyZ2V0IHF1YXRlcm5pb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFdvcmxkUXVhdGVybmlvbkxpdGUob2JqZWN0OiBUSFJFRS5PYmplY3QzRCwgb3V0OiBUSFJFRS5RdWF0ZXJuaW9uKTogVEhSRUUuUXVhdGVybmlvbiB7XG4gIG9iamVjdC5tYXRyaXhXb3JsZC5kZWNvbXBvc2UoX3Bvc2l0aW9uLCBvdXQsIF9zY2FsZSk7XG4gIHJldHVybiBvdXQ7XG59XG4iLCAiaW1wb3J0IHR5cGUgKiBhcyBWMFZSTSBmcm9tICdAcGl4aXYvdHlwZXMtdnJtLTAuMCc7XG5pbXBvcnQgdHlwZSAqIGFzIFYxU3ByaW5nQm9uZVNjaGVtYSBmcm9tICdAcGl4aXYvdHlwZXMtdnJtYy1zcHJpbmdib25lLTEuMCc7XG5pbXBvcnQgdHlwZSAqIGFzIFNwcmluZ0JvbmVFeHRlbmRlZENvbGxpZGVyU2NoZW1hIGZyb20gJ0BwaXhpdi90eXBlcy12cm1jLXNwcmluZ2JvbmUtZXh0ZW5kZWQtY29sbGlkZXItMS4wJztcbmltcG9ydCB0eXBlICogYXMgU3ByaW5nQm9uZUxpbWl0U2NoZW1hIGZyb20gJ0BwaXhpdi90eXBlcy12cm1jLXNwcmluZ2JvbmUtbGltaXQtMS4wJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB0eXBlIHsgR0xURiwgR0xURkxvYWRlclBsdWdpbiwgR0xURlBhcnNlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXIuanMnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUNvbGxpZGVySGVscGVyLCBWUk1TcHJpbmdCb25lSm9pbnRIZWxwZXIgfSBmcm9tICcuL2hlbHBlcnMnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUNvbGxpZGVyIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lQ29sbGlkZXInO1xuaW1wb3J0IHR5cGUgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cCB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXAnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVDYXBzdWxlIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZUNhcHN1bGUnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVTcGhlcmUgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlU3BoZXJlJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVKb2ludCB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUpvaW50JztcbmltcG9ydCB0eXBlIHsgVlJNU3ByaW5nQm9uZUxvYWRlclBsdWdpbk9wdGlvbnMgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW5PcHRpb25zJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVNYW5hZ2VyIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lTWFuYWdlcic7XG5pbXBvcnQgdHlwZSB7IFZSTVNwcmluZ0JvbmVKb2ludFNldHRpbmdzIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lSm9pbnRTZXR0aW5ncyc7XG5pbXBvcnQgeyBHTFRGIGFzIEdMVEZTY2hlbWEgfSBmcm9tICdAZ2x0Zi10cmFuc2Zvcm0vY29yZSc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZVBsYW5lIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZVBsYW5lJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVMaW1pdCB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUxpbWl0JztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVMaW1pdENvbmUgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVMaW1pdENvbmUnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUxpbWl0SGVscGVyIH0gZnJvbSAnLi9oZWxwZXJzL1ZSTVNwcmluZ0JvbmVMaW1pdEhlbHBlcic7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lTGltaXRIaW5nZSB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUxpbWl0SGluZ2UnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUxpbWl0U3BoZXJpY2FsIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lTGltaXRTcGhlcmljYWwnO1xuXG5jb25zdCBFWFRFTlNJT05fTkFNRV9FWFRFTkRFRF9DT0xMSURFUiA9ICdWUk1DX3NwcmluZ0JvbmVfZXh0ZW5kZWRfY29sbGlkZXInO1xuY29uc3QgRVhURU5TSU9OX05BTUVfTElNSVQgPSAnVlJNQ19zcHJpbmdCb25lX2xpbWl0JztcblxuLyoqXG4gKiBQb3NzaWJsZSBzcGVjIHZlcnNpb25zIGl0IHJlY29nbml6ZXMuXG4gKi9cbmNvbnN0IFBPU1NJQkxFX1NQRUNfVkVSU0lPTlMgPSBuZXcgU2V0KFsnMS4wJywgJzEuMC1iZXRhJ10pO1xuXG4vKipcbiAqIFBvc3NpYmxlIHNwZWMgdmVyc2lvbnMgb2YgYFZSTUNfc3ByaW5nQm9uZV9leHRlbmRlZF9jb2xsaWRlcmAgaXQgcmVjb2duaXplcy5cbiAqL1xuY29uc3QgUE9TU0lCTEVfU1BFQ19WRVJTSU9OU19FWFRFTkRFRF9DT0xMSURFUlMgPSBuZXcgU2V0KFsnMS4wJ10pO1xuXG4vKipcbiAqIFBvc3NpYmxlIHNwZWMgdmVyc2lvbnMgb2YgYFZSTUNfc3ByaW5nQm9uZV9saW1pdGAgaXQgcmVjb2duaXplcy5cbiAqL1xuY29uc3QgUE9TU0lCTEVfU1BFQ19WRVJTSU9OU19MSU1JVCA9IG5ldyBTZXQoWycxLjAnLCAnMS4wLWRyYWZ0J10pO1xuXG5leHBvcnQgY2xhc3MgVlJNU3ByaW5nQm9uZUxvYWRlclBsdWdpbiBpbXBsZW1lbnRzIEdMVEZMb2FkZXJQbHVnaW4ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEVYVEVOU0lPTl9OQU1FID0gJ1ZSTUNfc3ByaW5nQm9uZSc7XG5cbiAgLyoqXG4gICAqIFNwZWNpZnkgYW4gT2JqZWN0M0QgdG8gYWRkIHtAbGluayBWUk1TcHJpbmdCb25lSm9pbnRIZWxwZXJ9IHMuXG4gICAqIElmIG5vdCBzcGVjaWZpZWQsIGhlbHBlciB3aWxsIG5vdCBiZSBjcmVhdGVkLlxuICAgKiBJZiBgcmVuZGVyT3JkZXJgIGlzIHNldCB0byB0aGUgcm9vdCwgaGVscGVycyB3aWxsIGNvcHkgdGhlIHNhbWUgYHJlbmRlck9yZGVyYCAuXG4gICAqL1xuICBwdWJsaWMgam9pbnRIZWxwZXJSb290PzogVEhSRUUuT2JqZWN0M0Q7XG5cbiAgLyoqXG4gICAqIFNwZWNpZnkgYW4gT2JqZWN0M0QgdG8gYWRkIHtAbGluayBWUk1TcHJpbmdCb25lQ29sbGlkZXJIZWxwZXJ9IHMuXG4gICAqIElmIG5vdCBzcGVjaWZpZWQsIGhlbHBlciB3aWxsIG5vdCBiZSBjcmVhdGVkLlxuICAgKiBJZiBgcmVuZGVyT3JkZXJgIGlzIHNldCB0byB0aGUgcm9vdCwgaGVscGVycyB3aWxsIGNvcHkgdGhlIHNhbWUgYHJlbmRlck9yZGVyYCAuXG4gICAqL1xuICBwdWJsaWMgY29sbGlkZXJIZWxwZXJSb290PzogVEhSRUUuT2JqZWN0M0Q7XG5cbiAgLyoqXG4gICAqIFNwZWNpZnkgYW4gT2JqZWN0M0QgdG8gYWRkIHtAbGluayBWUk1TcHJpbmdCb25lTGltaXRIZWxwZXJ9IHMuXG4gICAqIElmIG5vdCBzcGVjaWZpZWQsIGhlbHBlciB3aWxsIG5vdCBiZSBjcmVhdGVkLlxuICAgKiBJZiBgcmVuZGVyT3JkZXJgIGlzIHNldCB0byB0aGUgcm9vdCwgaGVscGVycyB3aWxsIGNvcHkgdGhlIHNhbWUgYHJlbmRlck9yZGVyYCAuXG4gICAqL1xuICBwdWJsaWMgbGltaXRIZWxwZXJSb290PzogVEhSRUUuT2JqZWN0M0Q7XG5cbiAgLyoqXG4gICAqIElmIHRydWUsIGxvYWQgY29sbGlkZXJzIGRlZmluZWQgaW4gYFZSTUNfc3ByaW5nQm9uZV9leHRlbmRlZF9jb2xsaWRlcmAuXG4gICAqIFNldCB0byBgZmFsc2VgIHRvIGRpc2FibGUgbG9hZGluZyBleHRlbmRlZCBjb2xsaWRlcnMgYW5kIHVzZSB0aGUgZmFsbGJhY2sgYmVoYXZpb3IuXG4gICAqIGB0cnVlYCBieSBkZWZhdWx0LlxuICAgKi9cbiAgcHVibGljIHVzZUV4dGVuZGVkQ29sbGlkZXJzOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBJZiB0cnVlLCBsb2FkIGxpbWl0cyBkZWZpbmVkIGluIGBWUk1DX3NwcmluZ0JvbmVfbGltaXRgLlxuICAgKiBTZXQgdG8gYGZhbHNlYCB0byBkaXNhYmxlIGxvYWRpbmcgbGltaXRzIGFuZCB1c2UgdGhlIGZhbGxiYWNrIGJlaGF2aW9yLlxuICAgKiBgdHJ1ZWAgYnkgZGVmYXVsdC5cbiAgICovXG4gIHB1YmxpYyB1c2VMaW1pdHM6IGJvb2xlYW47XG5cbiAgcHVibGljIHJlYWRvbmx5IHBhcnNlcjogR0xURlBhcnNlcjtcblxuICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gVlJNU3ByaW5nQm9uZUxvYWRlclBsdWdpbi5FWFRFTlNJT05fTkFNRTtcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJzZXI6IEdMVEZQYXJzZXIsIG9wdGlvbnM/OiBWUk1TcHJpbmdCb25lTG9hZGVyUGx1Z2luT3B0aW9ucykge1xuICAgIHRoaXMucGFyc2VyID0gcGFyc2VyO1xuXG4gICAgdGhpcy5qb2ludEhlbHBlclJvb3QgPSBvcHRpb25zPy5qb2ludEhlbHBlclJvb3Q7XG4gICAgdGhpcy5jb2xsaWRlckhlbHBlclJvb3QgPSBvcHRpb25zPy5jb2xsaWRlckhlbHBlclJvb3Q7XG4gICAgdGhpcy5saW1pdEhlbHBlclJvb3QgPSBvcHRpb25zPy5saW1pdEhlbHBlclJvb3Q7XG4gICAgdGhpcy51c2VFeHRlbmRlZENvbGxpZGVycyA9IG9wdGlvbnM/LnVzZUV4dGVuZGVkQ29sbGlkZXJzID8/IHRydWU7XG4gICAgdGhpcy51c2VMaW1pdHMgPSBvcHRpb25zPy51c2VMaW1pdHMgPz8gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBhZnRlclJvb3QoZ2x0ZjogR0xURik6IFByb21pc2U8dm9pZD4ge1xuICAgIGdsdGYudXNlckRhdGEudnJtU3ByaW5nQm9uZU1hbmFnZXIgPSBhd2FpdCB0aGlzLl9pbXBvcnQoZ2x0Zik7XG4gIH1cblxuICAvKipcbiAgICogSW1wb3J0IHNwcmluZyBib25lcyBmcm9tIGEgR0xURiBhbmQgcmV0dXJuIGEge0BsaW5rIFZSTVNwcmluZ0JvbmVNYW5hZ2VyfS5cbiAgICogSXQgbWlnaHQgcmV0dXJuIGBudWxsYCBpbnN0ZWFkIHdoZW4gaXQgZG9lcyBub3QgbmVlZCB0byBiZSBjcmVhdGVkIG9yIHNvbWV0aGluZyBnbyB3cm9uZy5cbiAgICpcbiAgICogQHBhcmFtIGdsdGYgQSBwYXJzZWQgcmVzdWx0IG9mIEdMVEYgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gICAqL1xuICBwcml2YXRlIGFzeW5jIF9pbXBvcnQoZ2x0ZjogR0xURik6IFByb21pc2U8VlJNU3ByaW5nQm9uZU1hbmFnZXIgfCBudWxsPiB7XG4gICAgY29uc3QgdjFSZXN1bHQgPSBhd2FpdCB0aGlzLl92MUltcG9ydChnbHRmKTtcbiAgICBpZiAodjFSZXN1bHQgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHYxUmVzdWx0O1xuICAgIH1cblxuICAgIGNvbnN0IHYwUmVzdWx0ID0gYXdhaXQgdGhpcy5fdjBJbXBvcnQoZ2x0Zik7XG4gICAgaWYgKHYwUmVzdWx0ICE9IG51bGwpIHtcbiAgICAgIHJldHVybiB2MFJlc3VsdDtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX3YxSW1wb3J0KGdsdGY6IEdMVEYpOiBQcm9taXNlPFZSTVNwcmluZ0JvbmVNYW5hZ2VyIHwgbnVsbD4ge1xuICAgIGNvbnN0IGpzb24gPSBnbHRmLnBhcnNlci5qc29uIGFzIEdMVEZTY2hlbWEuSUdMVEY7XG5cbiAgICAvLyBlYXJseSBhYm9ydCBpZiBpdCBkb2Vzbid0IHVzZSBzcHJpbmcgYm9uZXNcbiAgICBjb25zdCBpc1NwcmluZ0JvbmVVc2VkID0ganNvbi5leHRlbnNpb25zVXNlZD8uaW5kZXhPZihWUk1TcHJpbmdCb25lTG9hZGVyUGx1Z2luLkVYVEVOU0lPTl9OQU1FKSAhPT0gLTE7XG4gICAgaWYgKCFpc1NwcmluZ0JvbmVVc2VkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBtYW5hZ2VyID0gbmV3IFZSTVNwcmluZ0JvbmVNYW5hZ2VyKCk7XG5cbiAgICBjb25zdCB0aHJlZU5vZGVzOiBUSFJFRS5PYmplY3QzRFtdID0gYXdhaXQgZ2x0Zi5wYXJzZXIuZ2V0RGVwZW5kZW5jaWVzKCdub2RlJyk7XG5cbiAgICBjb25zdCBleHRlbnNpb24gPSBqc29uLmV4dGVuc2lvbnM/LltWUk1TcHJpbmdCb25lTG9hZGVyUGx1Z2luLkVYVEVOU0lPTl9OQU1FXSBhc1xuICAgICAgVjFTcHJpbmdCb25lU2NoZW1hLlZSTUNTcHJpbmdCb25lIHwgdW5kZWZpbmVkO1xuICAgIGlmICghZXh0ZW5zaW9uKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzcGVjVmVyc2lvbiA9IGV4dGVuc2lvbi5zcGVjVmVyc2lvbjtcbiAgICBpZiAoIVBPU1NJQkxFX1NQRUNfVkVSU0lPTlMuaGFzKHNwZWNWZXJzaW9uKSkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBgVlJNU3ByaW5nQm9uZUxvYWRlclBsdWdpbjogVW5rbm93biAke1ZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW4uRVhURU5TSU9OX05BTUV9IHNwZWNWZXJzaW9uIFwiJHtzcGVjVmVyc2lvbn1cImAsXG4gICAgICApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgY29sbGlkZXJzID0gZXh0ZW5zaW9uLmNvbGxpZGVycz8ubWFwKChzY2hlbWFDb2xsaWRlciwgaUNvbGxpZGVyKSA9PiB7XG4gICAgICBjb25zdCBub2RlID0gdGhyZWVOb2Rlc1tzY2hlbWFDb2xsaWRlci5ub2RlIV07XG5cbiAgICAgIC8vIFNvbWUgbW9kZWxzIHB1dCBgLTFgIHRvIHRoZSBub2RlIGluZGV4IG9mIGNvbGxpZGVyc1xuICAgICAgaWYgKG5vZGUgPT0gbnVsbCkge1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgYFZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW46IFRoZSBjb2xsaWRlciAjJHtpQ29sbGlkZXJ9IGF0dGVtcHRlZCB0byByZWZlcmVuY2UgYSBub2RlICMke3NjaGVtYUNvbGxpZGVyLm5vZGV9IGJ1dCBub3QgZm91bmQuIFNraXBwaW5nIHRoZSBjb2xsaWRlcmAsXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzY2hlbWFTaGFwZSA9IHNjaGVtYUNvbGxpZGVyLnNoYXBlITtcblxuICAgICAgLy8gVE9ETzogc2VwYXJhdGUgaW50byBzZXZlcmFsIGZ1bmN0aW9uc1xuXG4gICAgICBjb25zdCBzY2hlbWFFeENvbGxpZGVyOiBTcHJpbmdCb25lRXh0ZW5kZWRDb2xsaWRlclNjaGVtYS5WUk1DU3ByaW5nQm9uZUV4dGVuZGVkQ29sbGlkZXIgfCB1bmRlZmluZWQgPVxuICAgICAgICBzY2hlbWFDb2xsaWRlci5leHRlbnNpb25zPy5bRVhURU5TSU9OX05BTUVfRVhURU5ERURfQ09MTElERVJdO1xuXG4gICAgICBpZiAodGhpcy51c2VFeHRlbmRlZENvbGxpZGVycyAmJiBzY2hlbWFFeENvbGxpZGVyICE9IG51bGwpIHtcbiAgICAgICAgY29uc3Qgc3BlY1ZlcnNpb25FeENvbGxpZGVyID0gc2NoZW1hRXhDb2xsaWRlci5zcGVjVmVyc2lvbjtcbiAgICAgICAgaWYgKCFQT1NTSUJMRV9TUEVDX1ZFUlNJT05TX0VYVEVOREVEX0NPTExJREVSUy5oYXMoc3BlY1ZlcnNpb25FeENvbGxpZGVyKSkge1xuICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgIGBWUk1TcHJpbmdCb25lTG9hZGVyUGx1Z2luOiBVbmtub3duICR7RVhURU5TSU9OX05BTUVfRVhURU5ERURfQ09MTElERVJ9IHNwZWNWZXJzaW9uIFwiJHtzcGVjVmVyc2lvbkV4Q29sbGlkZXJ9XCIuIEZhbGxiYWNraW5nIHRvIHRoZSAke1ZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW4uRVhURU5TSU9OX05BTUV9IGRlZmluaXRpb25gLFxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3Qgc2NoZW1hRXhTaGFwZSA9IHNjaGVtYUV4Q29sbGlkZXIuc2hhcGUhO1xuICAgICAgICAgIGlmIChzY2hlbWFFeFNoYXBlLnNwaGVyZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2ltcG9ydFNwaGVyZUNvbGxpZGVyKG5vZGUsIHtcbiAgICAgICAgICAgICAgb2Zmc2V0OiBuZXcgVEhSRUUuVmVjdG9yMygpLmZyb21BcnJheShzY2hlbWFFeFNoYXBlLnNwaGVyZS5vZmZzZXQgPz8gWzAuMCwgMC4wLCAwLjBdKSxcbiAgICAgICAgICAgICAgcmFkaXVzOiBzY2hlbWFFeFNoYXBlLnNwaGVyZS5yYWRpdXMgPz8gMC4wLFxuICAgICAgICAgICAgICBpbnNpZGU6IHNjaGVtYUV4U2hhcGUuc3BoZXJlLmluc2lkZSA/PyBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc2NoZW1hRXhTaGFwZS5jYXBzdWxlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faW1wb3J0Q2Fwc3VsZUNvbGxpZGVyKG5vZGUsIHtcbiAgICAgICAgICAgICAgb2Zmc2V0OiBuZXcgVEhSRUUuVmVjdG9yMygpLmZyb21BcnJheShzY2hlbWFFeFNoYXBlLmNhcHN1bGUub2Zmc2V0ID8/IFswLjAsIDAuMCwgMC4wXSksXG4gICAgICAgICAgICAgIHJhZGl1czogc2NoZW1hRXhTaGFwZS5jYXBzdWxlLnJhZGl1cyA/PyAwLjAsXG4gICAgICAgICAgICAgIHRhaWw6IG5ldyBUSFJFRS5WZWN0b3IzKCkuZnJvbUFycmF5KHNjaGVtYUV4U2hhcGUuY2Fwc3VsZS50YWlsID8/IFswLjAsIDAuMCwgMC4wXSksXG4gICAgICAgICAgICAgIGluc2lkZTogc2NoZW1hRXhTaGFwZS5jYXBzdWxlLmluc2lkZSA/PyBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc2NoZW1hRXhTaGFwZS5wbGFuZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2ltcG9ydFBsYW5lQ29sbGlkZXIobm9kZSwge1xuICAgICAgICAgICAgICBvZmZzZXQ6IG5ldyBUSFJFRS5WZWN0b3IzKCkuZnJvbUFycmF5KHNjaGVtYUV4U2hhcGUucGxhbmUub2Zmc2V0ID8/IFswLjAsIDAuMCwgMC4wXSksXG4gICAgICAgICAgICAgIG5vcm1hbDogbmV3IFRIUkVFLlZlY3RvcjMoKS5mcm9tQXJyYXkoc2NoZW1hRXhTaGFwZS5wbGFuZS5ub3JtYWwgPz8gWzAuMCwgMC4wLCAxLjBdKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc2NoZW1hU2hhcGUuc3BoZXJlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbXBvcnRTcGhlcmVDb2xsaWRlcihub2RlLCB7XG4gICAgICAgICAgb2Zmc2V0OiBuZXcgVEhSRUUuVmVjdG9yMygpLmZyb21BcnJheShzY2hlbWFTaGFwZS5zcGhlcmUub2Zmc2V0ID8/IFswLjAsIDAuMCwgMC4wXSksXG4gICAgICAgICAgcmFkaXVzOiBzY2hlbWFTaGFwZS5zcGhlcmUucmFkaXVzID8/IDAuMCxcbiAgICAgICAgICBpbnNpZGU6IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoc2NoZW1hU2hhcGUuY2Fwc3VsZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5faW1wb3J0Q2Fwc3VsZUNvbGxpZGVyKG5vZGUsIHtcbiAgICAgICAgICBvZmZzZXQ6IG5ldyBUSFJFRS5WZWN0b3IzKCkuZnJvbUFycmF5KHNjaGVtYVNoYXBlLmNhcHN1bGUub2Zmc2V0ID8/IFswLjAsIDAuMCwgMC4wXSksXG4gICAgICAgICAgcmFkaXVzOiBzY2hlbWFTaGFwZS5jYXBzdWxlLnJhZGl1cyA/PyAwLjAsXG4gICAgICAgICAgdGFpbDogbmV3IFRIUkVFLlZlY3RvcjMoKS5mcm9tQXJyYXkoc2NoZW1hU2hhcGUuY2Fwc3VsZS50YWlsID8/IFswLjAsIDAuMCwgMC4wXSksXG4gICAgICAgICAgaW5zaWRlOiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnNvbGUud2FybihgVlJNU3ByaW5nQm9uZUxvYWRlclBsdWdpbjogVGhlIGNvbGxpZGVyICMke2lDb2xsaWRlcn0gaGFzIG5vIHZhbGlkIHNoYXBlLiBTa2lwcGluZyB0aGUgY29sbGlkZXJgKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGNvbGxpZGVyR3JvdXBzID0gZXh0ZW5zaW9uLmNvbGxpZGVyR3JvdXBzPy5tYXAoXG4gICAgICAoc2NoZW1hQ29sbGlkZXJHcm91cCwgaUNvbGxpZGVyR3JvdXApOiBWUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cCA9PiB7XG4gICAgICAgIGNvbnN0IGNvbHMgPSAoc2NoZW1hQ29sbGlkZXJHcm91cC5jb2xsaWRlcnMgPz8gW10pXG4gICAgICAgICAgLm1hcCgoaUNvbGxpZGVyKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjb2wgPSBjb2xsaWRlcnM/LltpQ29sbGlkZXJdO1xuXG4gICAgICAgICAgICBpZiAoY29sID09IG51bGwpIHtcbiAgICAgICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgICAgIGBWUk1TcHJpbmdCb25lTG9hZGVyUGx1Z2luOiBUaGUgY29sbGlkZXIgZ3JvdXAgIyR7aUNvbGxpZGVyR3JvdXB9IGF0dGVtcHRlZCB0byByZWZlcmVuY2UgYSBjb2xsaWRlciAjJHtpQ29sbGlkZXJ9IGJ1dCBub3QgZm91bmQuIFNraXBwaW5nIHRoZSBjb2xsaWRlcmAsXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gY29sO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmZpbHRlcigoY29sKTogY29sIGlzIFZSTVNwcmluZ0JvbmVDb2xsaWRlciA9PiBjb2wgIT0gbnVsbCk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBjb2xsaWRlcnM6IGNvbHMsXG4gICAgICAgICAgbmFtZTogc2NoZW1hQ29sbGlkZXJHcm91cC5uYW1lLFxuICAgICAgICB9O1xuICAgICAgfSxcbiAgICApO1xuXG4gICAgZXh0ZW5zaW9uLnNwcmluZ3M/LmZvckVhY2goKHNjaGVtYVNwcmluZywgaVNwcmluZykgPT4ge1xuICAgICAgY29uc3Qgc2NoZW1hSm9pbnRzID0gc2NoZW1hU3ByaW5nLmpvaW50cztcbiAgICAgIGlmIChzY2hlbWFKb2ludHMgPT0gbnVsbCkge1xuICAgICAgICBjb25zb2xlLndhcm4oYFZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW46IFRoZSBzcHJpbmcgIyR7aVNwcmluZ30gaGFzIG5vIGpvaW50cy4gU2tpcHBpbmcgdGhlIHNwcmluZ2ApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIHByZXBhcmUgY29sbGlkZXJzXG4gICAgICBjb25zdCBjb2xsaWRlckdyb3Vwc0ZvclNwcmluZyA9IHNjaGVtYVNwcmluZy5jb2xsaWRlckdyb3Vwc1xuICAgICAgICA/Lm1hcCgoaUNvbGxpZGVyR3JvdXApID0+IHtcbiAgICAgICAgICBjb25zdCBncm91cCA9IGNvbGxpZGVyR3JvdXBzPy5baUNvbGxpZGVyR3JvdXBdO1xuXG4gICAgICAgICAgaWYgKGdyb3VwID09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgICAgYFZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW46IFRoZSBzcHJpbmcgIyR7aVNwcmluZ30gYXR0ZW1wdGVkIHRvIHJlZmVyZW5jZSBhIGNvbGxpZGVyIGdyb3VwICMke2lDb2xsaWRlckdyb3VwfSBidXQgbm90IGZvdW5kLiBTa2lwcGluZyB0aGUgY29sbGlkZXIgZ3JvdXBgLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBncm91cDtcbiAgICAgICAgfSlcbiAgICAgICAgLmZpbHRlcigoZ3JvdXApOiBncm91cCBpcyBWUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cCA9PiBncm91cCAhPSBudWxsKTtcblxuICAgICAgY29uc3QgY2VudGVyID0gc2NoZW1hU3ByaW5nLmNlbnRlciAhPSBudWxsID8gdGhyZWVOb2Rlc1tzY2hlbWFTcHJpbmcuY2VudGVyXSA6IHVuZGVmaW5lZDtcblxuICAgICAgbGV0IHByZXZTY2hlbWFKb2ludDogVjFTcHJpbmdCb25lU2NoZW1hLlNwcmluZ0JvbmVKb2ludCB8IHVuZGVmaW5lZDtcbiAgICAgIHNjaGVtYUpvaW50cy5mb3JFYWNoKChzY2hlbWFKb2ludCkgPT4ge1xuICAgICAgICBpZiAocHJldlNjaGVtYUpvaW50KSB7XG4gICAgICAgICAgLy8gcHJlcGFyZSBub2RlXG4gICAgICAgICAgY29uc3Qgbm9kZUluZGV4ID0gcHJldlNjaGVtYUpvaW50Lm5vZGU7XG4gICAgICAgICAgY29uc3Qgbm9kZSA9IHRocmVlTm9kZXNbbm9kZUluZGV4XTtcbiAgICAgICAgICBjb25zdCBjaGlsZEluZGV4ID0gc2NoZW1hSm9pbnQubm9kZTtcbiAgICAgICAgICBjb25zdCBjaGlsZCA9IHRocmVlTm9kZXNbY2hpbGRJbmRleF07XG5cbiAgICAgICAgICAvLyBwcmVwYXJlIHNldHRpbmdcbiAgICAgICAgICBjb25zdCBzZXR0aW5nOiBQYXJ0aWFsPFZSTVNwcmluZ0JvbmVKb2ludFNldHRpbmdzPiA9IHtcbiAgICAgICAgICAgIGhpdFJhZGl1czogcHJldlNjaGVtYUpvaW50LmhpdFJhZGl1cyxcbiAgICAgICAgICAgIGRyYWdGb3JjZTogcHJldlNjaGVtYUpvaW50LmRyYWdGb3JjZSxcbiAgICAgICAgICAgIGdyYXZpdHlQb3dlcjogcHJldlNjaGVtYUpvaW50LmdyYXZpdHlQb3dlcixcbiAgICAgICAgICAgIHN0aWZmbmVzczogcHJldlNjaGVtYUpvaW50LnN0aWZmbmVzcyxcbiAgICAgICAgICAgIGdyYXZpdHlEaXI6XG4gICAgICAgICAgICAgIHByZXZTY2hlbWFKb2ludC5ncmF2aXR5RGlyICE9IG51bGxcbiAgICAgICAgICAgICAgICA/IG5ldyBUSFJFRS5WZWN0b3IzKCkuZnJvbUFycmF5KHByZXZTY2hlbWFKb2ludC5ncmF2aXR5RGlyKVxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgICAgIH07XG5cbiAgICAgICAgICAvLyBjcmVhdGUgc3ByaW5nIGJvbmVzXG4gICAgICAgICAgY29uc3Qgam9pbnQgPSB0aGlzLl9pbXBvcnRKb2ludChub2RlLCBjaGlsZCwgc2V0dGluZywgY29sbGlkZXJHcm91cHNGb3JTcHJpbmcpO1xuICAgICAgICAgIGlmIChjZW50ZXIpIHtcbiAgICAgICAgICAgIGpvaW50LmNlbnRlciA9IGNlbnRlcjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBpbXBvcnQgbGltaXRcbiAgICAgICAgICBjb25zdCBsaW1pdCA9IHRoaXMuX3RyeUltcG9ydExpbWl0RnJvbVNjaGVtYShqb2ludCwgcHJldlNjaGVtYUpvaW50KTtcbiAgICAgICAgICBpZiAobGltaXQpIHtcbiAgICAgICAgICAgIGpvaW50LmxpbWl0ID0gbGltaXQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbWFuYWdlci5hZGRKb2ludChqb2ludCk7XG4gICAgICAgIH1cblxuICAgICAgICBwcmV2U2NoZW1hSm9pbnQgPSBzY2hlbWFKb2ludDtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gaW5pdCBzcHJpbmcgYm9uZXNcbiAgICBtYW5hZ2VyLnNldEluaXRTdGF0ZSgpO1xuXG4gICAgcmV0dXJuIG1hbmFnZXI7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF92MEltcG9ydChnbHRmOiBHTFRGKTogUHJvbWlzZTxWUk1TcHJpbmdCb25lTWFuYWdlciB8IG51bGw+IHtcbiAgICBjb25zdCBqc29uID0gZ2x0Zi5wYXJzZXIuanNvbiBhcyBHTFRGU2NoZW1hLklHTFRGO1xuXG4gICAgLy8gZWFybHkgYWJvcnQgaWYgaXQgZG9lc24ndCB1c2UgdnJtXG4gICAgY29uc3QgaXNWUk1Vc2VkID0ganNvbi5leHRlbnNpb25zVXNlZD8uaW5kZXhPZignVlJNJykgIT09IC0xO1xuICAgIGlmICghaXNWUk1Vc2VkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBlYXJseSBhYm9ydCBpZiBpdCBkb2Vzbid0IGhhdmUgYm9uZSBncm91cHNcbiAgICBjb25zdCBleHRlbnNpb24gPSBqc29uLmV4dGVuc2lvbnM/LlsnVlJNJ10gYXMgVjBWUk0uVlJNIHwgdW5kZWZpbmVkO1xuICAgIGNvbnN0IHNjaGVtYVNlY29uZGFyeUFuaW1hdGlvbiA9IGV4dGVuc2lvbj8uc2Vjb25kYXJ5QW5pbWF0aW9uO1xuICAgIGlmICghc2NoZW1hU2Vjb25kYXJ5QW5pbWF0aW9uKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzY2hlbWFCb25lR3JvdXBzID0gc2NoZW1hU2Vjb25kYXJ5QW5pbWF0aW9uPy5ib25lR3JvdXBzO1xuICAgIGlmICghc2NoZW1hQm9uZUdyb3Vwcykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgbWFuYWdlciA9IG5ldyBWUk1TcHJpbmdCb25lTWFuYWdlcigpO1xuXG4gICAgY29uc3QgdGhyZWVOb2RlczogVEhSRUUuT2JqZWN0M0RbXSA9IGF3YWl0IGdsdGYucGFyc2VyLmdldERlcGVuZGVuY2llcygnbm9kZScpO1xuXG4gICAgY29uc3QgY29sbGlkZXJHcm91cHMgPSBzY2hlbWFTZWNvbmRhcnlBbmltYXRpb24uY29sbGlkZXJHcm91cHM/Lm1hcChcbiAgICAgIChzY2hlbWFDb2xsaWRlckdyb3VwLCBpQ29sbGlkZXJHcm91cCk6IFZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwIHwgbnVsbCA9PiB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSB0aHJlZU5vZGVzW3NjaGVtYUNvbGxpZGVyR3JvdXAubm9kZSFdO1xuICAgICAgICBpZiAobm9kZSA9PSBudWxsKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgYFZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW46IFRoZSBjb2xsaWRlciBncm91cCAjJHtpQ29sbGlkZXJHcm91cH0gYXR0ZW1wdGVkIHRvIHJlZmVyZW5jZSBhIG5vZGUgIyR7c2NoZW1hQ29sbGlkZXJHcm91cC5ub2RlfSBidXQgbm90IGZvdW5kLiBTa2lwcGluZyB0aGUgY29sbGlkZXIgZ3JvdXBgLFxuICAgICAgICAgICk7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb2xsaWRlcnMgPSAoc2NoZW1hQ29sbGlkZXJHcm91cC5jb2xsaWRlcnMgPz8gW10pLm1hcCgoc2NoZW1hQ29sbGlkZXIsIGlDb2xsaWRlcikgPT4ge1xuICAgICAgICAgIGNvbnN0IG9mZnNldCA9IG5ldyBUSFJFRS5WZWN0b3IzKDAuMCwgMC4wLCAwLjApO1xuICAgICAgICAgIGlmIChzY2hlbWFDb2xsaWRlci5vZmZzZXQpIHtcbiAgICAgICAgICAgIG9mZnNldC5zZXQoXG4gICAgICAgICAgICAgIHNjaGVtYUNvbGxpZGVyLm9mZnNldC54ID8/IDAuMCxcbiAgICAgICAgICAgICAgc2NoZW1hQ29sbGlkZXIub2Zmc2V0LnkgPz8gMC4wLFxuICAgICAgICAgICAgICBzY2hlbWFDb2xsaWRlci5vZmZzZXQueiA/IC1zY2hlbWFDb2xsaWRlci5vZmZzZXQueiA6IDAuMCwgLy8geiBpcyBvcHBvc2l0ZSBpbiBWUk0wLjBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2ltcG9ydFNwaGVyZUNvbGxpZGVyKG5vZGUsIHtcbiAgICAgICAgICAgIG9mZnNldCxcbiAgICAgICAgICAgIHJhZGl1czogc2NoZW1hQ29sbGlkZXIucmFkaXVzID8/IDAuMCxcbiAgICAgICAgICAgIGluc2lkZTogZmFsc2UsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB7IGNvbGxpZGVycyB9O1xuICAgICAgfSxcbiAgICApO1xuXG4gICAgLy8gaW1wb3J0IHNwcmluZyBib25lcyBmb3IgZWFjaCBzcHJpbmcgYm9uZSBncm91cHNcbiAgICBzY2hlbWFCb25lR3JvdXBzPy5mb3JFYWNoKChzY2hlbWFCb25lR3JvdXAsIGlCb25lR3JvdXApID0+IHtcbiAgICAgIGNvbnN0IHJvb3RJbmRpY2VzID0gc2NoZW1hQm9uZUdyb3VwLmJvbmVzO1xuICAgICAgaWYgKCFyb290SW5kaWNlcykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHJvb3RJbmRpY2VzLmZvckVhY2goKHJvb3RJbmRleCkgPT4ge1xuICAgICAgICBjb25zdCByb290ID0gdGhyZWVOb2Rlc1tyb290SW5kZXhdO1xuICAgICAgICBpZiAocm9vdCA9PSBudWxsKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgYFZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW46IFRoZSBzcHJpbmcgYm9uZSBncm91cCAjJHtpQm9uZUdyb3VwfSBhdHRlbXB0ZWQgdG8gcmVmZXJlbmNlIGEgbm9kZSAjJHtyb290SW5kZXh9IGJ1dCBub3QgZm91bmQuIFNraXBwaW5nIHRoZSBub2RlYCxcbiAgICAgICAgICApO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHByZXBhcmUgc2V0dGluZ1xuICAgICAgICBjb25zdCBncmF2aXR5RGlyID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbiAgICAgICAgaWYgKHNjaGVtYUJvbmVHcm91cC5ncmF2aXR5RGlyKSB7XG4gICAgICAgICAgZ3Jhdml0eURpci5zZXQoXG4gICAgICAgICAgICBzY2hlbWFCb25lR3JvdXAuZ3Jhdml0eURpci54ID8/IDAuMCxcbiAgICAgICAgICAgIHNjaGVtYUJvbmVHcm91cC5ncmF2aXR5RGlyLnkgPz8gMC4wLFxuICAgICAgICAgICAgc2NoZW1hQm9uZUdyb3VwLmdyYXZpdHlEaXIueiA/PyAwLjAsXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBncmF2aXR5RGlyLnNldCgwLjAsIC0xLjAsIDAuMCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjZW50ZXIgPSBzY2hlbWFCb25lR3JvdXAuY2VudGVyICE9IG51bGwgPyB0aHJlZU5vZGVzW3NjaGVtYUJvbmVHcm91cC5jZW50ZXJdIDogdW5kZWZpbmVkO1xuXG4gICAgICAgIGNvbnN0IHNldHRpbmc6IFBhcnRpYWw8VlJNU3ByaW5nQm9uZUpvaW50U2V0dGluZ3M+ID0ge1xuICAgICAgICAgIGhpdFJhZGl1czogc2NoZW1hQm9uZUdyb3VwLmhpdFJhZGl1cyxcbiAgICAgICAgICBkcmFnRm9yY2U6IHNjaGVtYUJvbmVHcm91cC5kcmFnRm9yY2UsXG4gICAgICAgICAgZ3Jhdml0eVBvd2VyOiBzY2hlbWFCb25lR3JvdXAuZ3Jhdml0eVBvd2VyLFxuICAgICAgICAgIHN0aWZmbmVzczogc2NoZW1hQm9uZUdyb3VwLnN0aWZmaW5lc3MsXG4gICAgICAgICAgZ3Jhdml0eURpcixcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBwcmVwYXJlIGNvbGxpZGVyc1xuICAgICAgICBjb25zdCBjb2xsaWRlckdyb3Vwc0ZvclNwcmluZyA9IHNjaGVtYUJvbmVHcm91cC5jb2xsaWRlckdyb3Vwc1xuICAgICAgICAgID8ubWFwKChpQ29sbGlkZXJHcm91cCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZ3JvdXAgPSBjb2xsaWRlckdyb3Vwcz8uW2lDb2xsaWRlckdyb3VwXTtcblxuICAgICAgICAgICAgaWYgKGdyb3VwID09IG51bGwpIHtcbiAgICAgICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgICAgIGBWUk1TcHJpbmdCb25lTG9hZGVyUGx1Z2luOiBUaGUgc3ByaW5nICMke2lCb25lR3JvdXB9IGF0dGVtcHRlZCB0byByZWZlcmVuY2UgYSBjb2xsaWRlciBncm91cCAjJHtpQ29sbGlkZXJHcm91cH0gYnV0IG5vdCBmb3VuZC4gU2tpcHBpbmcgdGhlIGNvbGxpZGVyIGdyb3VwYCxcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBncm91cDtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5maWx0ZXIoKGdyb3VwKTogZ3JvdXAgaXMgVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXAgPT4gZ3JvdXAgIT0gbnVsbCk7XG5cbiAgICAgICAgLy8gY3JlYXRlIHNwcmluZyBib25lc1xuICAgICAgICByb290LnRyYXZlcnNlKChub2RlKSA9PiB7XG4gICAgICAgICAgY29uc3QgY2hpbGQ6IFRIUkVFLk9iamVjdDNEIHwgbnVsbCA9IG5vZGUuY2hpbGRyZW5bMF0gPz8gbnVsbDtcblxuICAgICAgICAgIGNvbnN0IGpvaW50ID0gdGhpcy5faW1wb3J0Sm9pbnQobm9kZSwgY2hpbGQsIHNldHRpbmcsIGNvbGxpZGVyR3JvdXBzRm9yU3ByaW5nKTtcbiAgICAgICAgICBpZiAoY2VudGVyKSB7XG4gICAgICAgICAgICBqb2ludC5jZW50ZXIgPSBjZW50ZXI7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbWFuYWdlci5hZGRKb2ludChqb2ludCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBpbml0IHNwcmluZyBib25lc1xuICAgIGdsdGYuc2NlbmUudXBkYXRlTWF0cml4V29ybGQoKTtcbiAgICBtYW5hZ2VyLnNldEluaXRTdGF0ZSgpO1xuXG4gICAgcmV0dXJuIG1hbmFnZXI7XG4gIH1cblxuICBwcml2YXRlIF9pbXBvcnRKb2ludChcbiAgICBub2RlOiBUSFJFRS5PYmplY3QzRCxcbiAgICBjaGlsZDogVEhSRUUuT2JqZWN0M0QsXG4gICAgc2V0dGluZz86IFBhcnRpYWw8VlJNU3ByaW5nQm9uZUpvaW50U2V0dGluZ3M+LFxuICAgIGNvbGxpZGVyR3JvdXBzRm9yU3ByaW5nPzogVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXBbXSxcbiAgKTogVlJNU3ByaW5nQm9uZUpvaW50IHtcbiAgICBjb25zdCBzcHJpbmdCb25lID0gbmV3IFZSTVNwcmluZ0JvbmVKb2ludChub2RlLCBjaGlsZCwgc2V0dGluZywgY29sbGlkZXJHcm91cHNGb3JTcHJpbmcpO1xuXG4gICAgaWYgKHRoaXMuam9pbnRIZWxwZXJSb290KSB7XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgVlJNU3ByaW5nQm9uZUpvaW50SGVscGVyKHNwcmluZ0JvbmUpO1xuICAgICAgdGhpcy5qb2ludEhlbHBlclJvb3QuYWRkKGhlbHBlcik7XG4gICAgICBoZWxwZXIucmVuZGVyT3JkZXIgPSB0aGlzLmpvaW50SGVscGVyUm9vdC5yZW5kZXJPcmRlcjtcbiAgICB9XG5cbiAgICByZXR1cm4gc3ByaW5nQm9uZTtcbiAgfVxuXG4gIHByaXZhdGUgX2ltcG9ydFNwaGVyZUNvbGxpZGVyKFxuICAgIGRlc3RpbmF0aW9uOiBUSFJFRS5PYmplY3QzRCxcbiAgICBwYXJhbXM6IHtcbiAgICAgIG9mZnNldDogVEhSRUUuVmVjdG9yMztcbiAgICAgIHJhZGl1czogbnVtYmVyO1xuICAgICAgaW5zaWRlOiBib29sZWFuO1xuICAgIH0sXG4gICk6IFZSTVNwcmluZ0JvbmVDb2xsaWRlciB7XG4gICAgY29uc3Qgc2hhcGUgPSBuZXcgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVTcGhlcmUocGFyYW1zKTtcblxuICAgIGNvbnN0IGNvbGxpZGVyID0gbmV3IFZSTVNwcmluZ0JvbmVDb2xsaWRlcihzaGFwZSk7XG5cbiAgICBkZXN0aW5hdGlvbi5hZGQoY29sbGlkZXIpO1xuXG4gICAgaWYgKHRoaXMuY29sbGlkZXJIZWxwZXJSb290KSB7XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgVlJNU3ByaW5nQm9uZUNvbGxpZGVySGVscGVyKGNvbGxpZGVyKTtcbiAgICAgIHRoaXMuY29sbGlkZXJIZWxwZXJSb290LmFkZChoZWxwZXIpO1xuICAgICAgaGVscGVyLnJlbmRlck9yZGVyID0gdGhpcy5jb2xsaWRlckhlbHBlclJvb3QucmVuZGVyT3JkZXI7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbGxpZGVyO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW1wb3J0Q2Fwc3VsZUNvbGxpZGVyKFxuICAgIGRlc3RpbmF0aW9uOiBUSFJFRS5PYmplY3QzRCxcbiAgICBwYXJhbXM6IHtcbiAgICAgIG9mZnNldDogVEhSRUUuVmVjdG9yMztcbiAgICAgIHJhZGl1czogbnVtYmVyO1xuICAgICAgdGFpbDogVEhSRUUuVmVjdG9yMztcbiAgICAgIGluc2lkZTogYm9vbGVhbjtcbiAgICB9LFxuICApOiBWUk1TcHJpbmdCb25lQ29sbGlkZXIge1xuICAgIGNvbnN0IHNoYXBlID0gbmV3IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlQ2Fwc3VsZShwYXJhbXMpO1xuXG4gICAgY29uc3QgY29sbGlkZXIgPSBuZXcgVlJNU3ByaW5nQm9uZUNvbGxpZGVyKHNoYXBlKTtcblxuICAgIGRlc3RpbmF0aW9uLmFkZChjb2xsaWRlcik7XG5cbiAgICBpZiAodGhpcy5jb2xsaWRlckhlbHBlclJvb3QpIHtcbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBWUk1TcHJpbmdCb25lQ29sbGlkZXJIZWxwZXIoY29sbGlkZXIpO1xuICAgICAgdGhpcy5jb2xsaWRlckhlbHBlclJvb3QuYWRkKGhlbHBlcik7XG4gICAgICBoZWxwZXIucmVuZGVyT3JkZXIgPSB0aGlzLmNvbGxpZGVySGVscGVyUm9vdC5yZW5kZXJPcmRlcjtcbiAgICB9XG5cbiAgICByZXR1cm4gY29sbGlkZXI7XG4gIH1cblxuICBwcml2YXRlIF9pbXBvcnRQbGFuZUNvbGxpZGVyKFxuICAgIGRlc3RpbmF0aW9uOiBUSFJFRS5PYmplY3QzRCxcbiAgICBwYXJhbXM6IHtcbiAgICAgIG9mZnNldDogVEhSRUUuVmVjdG9yMztcbiAgICAgIG5vcm1hbDogVEhSRUUuVmVjdG9yMztcbiAgICB9LFxuICApOiBWUk1TcHJpbmdCb25lQ29sbGlkZXIge1xuICAgIGNvbnN0IHNoYXBlID0gbmV3IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlUGxhbmUocGFyYW1zKTtcblxuICAgIGNvbnN0IGNvbGxpZGVyID0gbmV3IFZSTVNwcmluZ0JvbmVDb2xsaWRlcihzaGFwZSk7XG5cbiAgICBkZXN0aW5hdGlvbi5hZGQoY29sbGlkZXIpO1xuXG4gICAgaWYgKHRoaXMuY29sbGlkZXJIZWxwZXJSb290KSB7XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgVlJNU3ByaW5nQm9uZUNvbGxpZGVySGVscGVyKGNvbGxpZGVyKTtcbiAgICAgIHRoaXMuY29sbGlkZXJIZWxwZXJSb290LmFkZChoZWxwZXIpO1xuICAgICAgaGVscGVyLnJlbmRlck9yZGVyID0gdGhpcy5jb2xsaWRlckhlbHBlclJvb3QucmVuZGVyT3JkZXI7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbGxpZGVyO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW1wb3J0TGltaXRDb25lKFxuICAgIGpvaW50OiBWUk1TcHJpbmdCb25lSm9pbnQsXG4gICAgcGFyYW1zOiB7XG4gICAgICBhbmdsZTogbnVtYmVyO1xuICAgICAgcm90YXRpb24/OiBUSFJFRS5RdWF0ZXJuaW9uO1xuICAgIH0sXG4gICk6IFZSTVNwcmluZ0JvbmVMaW1pdENvbmUge1xuICAgIGNvbnN0IGxpbWl0ID0gbmV3IFZSTVNwcmluZ0JvbmVMaW1pdENvbmUocGFyYW1zKTtcblxuICAgIGlmICh0aGlzLmxpbWl0SGVscGVyUm9vdCkge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IFZSTVNwcmluZ0JvbmVMaW1pdEhlbHBlcihsaW1pdCwgam9pbnQpO1xuICAgICAgdGhpcy5saW1pdEhlbHBlclJvb3QuYWRkKGhlbHBlcik7XG4gICAgICBoZWxwZXIucmVuZGVyT3JkZXIgPSB0aGlzLmxpbWl0SGVscGVyUm9vdC5yZW5kZXJPcmRlcjtcbiAgICB9XG5cbiAgICByZXR1cm4gbGltaXQ7XG4gIH1cblxuICBwcml2YXRlIF9pbXBvcnRMaW1pdEhpbmdlKFxuICAgIGpvaW50OiBWUk1TcHJpbmdCb25lSm9pbnQsXG4gICAgcGFyYW1zOiB7XG4gICAgICBhbmdsZTogbnVtYmVyO1xuICAgICAgcm90YXRpb24/OiBUSFJFRS5RdWF0ZXJuaW9uO1xuICAgIH0sXG4gICk6IFZSTVNwcmluZ0JvbmVMaW1pdEhpbmdlIHtcbiAgICBjb25zdCBsaW1pdCA9IG5ldyBWUk1TcHJpbmdCb25lTGltaXRIaW5nZShwYXJhbXMpO1xuXG4gICAgaWYgKHRoaXMubGltaXRIZWxwZXJSb290KSB7XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgVlJNU3ByaW5nQm9uZUxpbWl0SGVscGVyKGxpbWl0LCBqb2ludCk7XG4gICAgICB0aGlzLmxpbWl0SGVscGVyUm9vdC5hZGQoaGVscGVyKTtcbiAgICAgIGhlbHBlci5yZW5kZXJPcmRlciA9IHRoaXMubGltaXRIZWxwZXJSb290LnJlbmRlck9yZGVyO1xuICAgIH1cblxuICAgIHJldHVybiBsaW1pdDtcbiAgfVxuXG4gIHByaXZhdGUgX2ltcG9ydExpbWl0U3BoZXJpY2FsKFxuICAgIGpvaW50OiBWUk1TcHJpbmdCb25lSm9pbnQsXG4gICAgcGFyYW1zOiB7XG4gICAgICBwaXRjaDogbnVtYmVyO1xuICAgICAgeWF3OiBudW1iZXI7XG4gICAgICByb3RhdGlvbj86IFRIUkVFLlF1YXRlcm5pb247XG4gICAgfSxcbiAgKTogVlJNU3ByaW5nQm9uZUxpbWl0U3BoZXJpY2FsIHtcbiAgICBjb25zdCBsaW1pdCA9IG5ldyBWUk1TcHJpbmdCb25lTGltaXRTcGhlcmljYWwocGFyYW1zKTtcblxuICAgIGlmICh0aGlzLmxpbWl0SGVscGVyUm9vdCkge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IFZSTVNwcmluZ0JvbmVMaW1pdEhlbHBlcihsaW1pdCwgam9pbnQpO1xuICAgICAgdGhpcy5saW1pdEhlbHBlclJvb3QuYWRkKGhlbHBlcik7XG4gICAgICBoZWxwZXIucmVuZGVyT3JkZXIgPSB0aGlzLmxpbWl0SGVscGVyUm9vdC5yZW5kZXJPcmRlcjtcbiAgICB9XG5cbiAgICByZXR1cm4gbGltaXQ7XG4gIH1cblxuICBwcml2YXRlIF90cnlJbXBvcnRMaW1pdEZyb21TY2hlbWEoXG4gICAgam9pbnQ6IFZSTVNwcmluZ0JvbmVKb2ludCxcbiAgICBzY2hlbWFKb2ludDogVjFTcHJpbmdCb25lU2NoZW1hLlNwcmluZ0JvbmVKb2ludCxcbiAgKTogVlJNU3ByaW5nQm9uZUxpbWl0IHwgdW5kZWZpbmVkIHtcbiAgICBpZiAoIXRoaXMudXNlTGltaXRzKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGNvbnN0IHNjaGVtYUxpbWl0OiBTcHJpbmdCb25lTGltaXRTY2hlbWEuVlJNQ1NwcmluZ0JvbmVMaW1pdCB8IHVuZGVmaW5lZCA9XG4gICAgICBzY2hlbWFKb2ludC5leHRlbnNpb25zPy5bRVhURU5TSU9OX05BTUVfTElNSVRdO1xuXG4gICAgaWYgKHNjaGVtYUxpbWl0ICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IHNwZWNWZXJzaW9uTGltaXQgPSBzY2hlbWFMaW1pdC5zcGVjVmVyc2lvbjtcbiAgICAgIGlmICghUE9TU0lCTEVfU1BFQ19WRVJTSU9OU19MSU1JVC5oYXMoc3BlY1ZlcnNpb25MaW1pdCkpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIGBWUk1TcHJpbmdCb25lTG9hZGVyUGx1Z2luOiBVbmtub3duICR7RVhURU5TSU9OX05BTUVfTElNSVR9IHNwZWNWZXJzaW9uIFwiJHtzcGVjVmVyc2lvbkxpbWl0fVwiLiBJZ25vcmluZyB0aGUgbGltaXRgLFxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHNwZWNWZXJzaW9uTGltaXQgPT09ICcxLjAtZHJhZnQnKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgYFZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW46IFVzaW5nIGEgZHJhZnQgc3BlYyB2ZXJzaW9uIG9mICR7RVhURU5TSU9OX05BTUVfTElNSVR9OiAxLjAtZHJhZnQuIFNvbWUgYmVoYXZpb3JzIG1heSBiZSBkaWZmZXJlbnQuIENvbnNpZGVyIHVwZGF0aW5nIHRoZSBtb2RlbCBmaWxlLmAsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNjaGVtYUxpbWl0TGltaXQgPSBzY2hlbWFMaW1pdC5saW1pdCE7XG4gICAgICAgIGlmIChzY2hlbWFMaW1pdExpbWl0LmNvbmUpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5faW1wb3J0TGltaXRDb25lKGpvaW50LCB7XG4gICAgICAgICAgICBhbmdsZTogc2NoZW1hTGltaXRMaW1pdC5jb25lLmFuZ2xlLFxuICAgICAgICAgICAgcm90YXRpb246IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCkuZnJvbUFycmF5KHNjaGVtYUxpbWl0TGltaXQuY29uZS5yb3RhdGlvbiA/PyBbMC4wLCAwLjAsIDAuMCwgMS4wXSksXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoc2NoZW1hTGltaXRMaW1pdC5oaW5nZSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLl9pbXBvcnRMaW1pdEhpbmdlKGpvaW50LCB7XG4gICAgICAgICAgICBhbmdsZTogc2NoZW1hTGltaXRMaW1pdC5oaW5nZS5hbmdsZSxcbiAgICAgICAgICAgIHJvdGF0aW9uOiBuZXcgVEhSRUUuUXVhdGVybmlvbigpLmZyb21BcnJheShzY2hlbWFMaW1pdExpbWl0LmhpbmdlLnJvdGF0aW9uID8/IFswLjAsIDAuMCwgMC4wLCAxLjBdKSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChzY2hlbWFMaW1pdExpbWl0LnNwaGVyaWNhbCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLl9pbXBvcnRMaW1pdFNwaGVyaWNhbChqb2ludCwge1xuICAgICAgICAgICAgcGl0Y2g6IHNjaGVtYUxpbWl0TGltaXQuc3BoZXJpY2FsLnBpdGNoLFxuICAgICAgICAgICAgeWF3OiBzY2hlbWFMaW1pdExpbWl0LnNwaGVyaWNhbC55YXcsXG4gICAgICAgICAgICByb3RhdGlvbjogbmV3IFRIUkVFLlF1YXRlcm5pb24oKS5mcm9tQXJyYXkoc2NoZW1hTGltaXRMaW1pdC5zcGhlcmljYWwucm90YXRpb24gPz8gWzAuMCwgMC4wLCAwLjAsIDEuMF0pLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUud2FybignVlJNU3ByaW5nQm9uZUxvYWRlclBsdWdpbjogVW5rbm93biBsaW1pdCB0eXBlLiBJZ25vcmluZyB0aGUgbGltaXQnKTtcbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCAiaW1wb3J0IHR5cGUgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiB0cmF2ZXJzZUFuY2VzdG9yc0Zyb21Sb290KG9iamVjdDogVEhSRUUuT2JqZWN0M0QsIGNhbGxiYWNrOiAob2JqZWN0OiBUSFJFRS5PYmplY3QzRCkgPT4gdm9pZCk6IHZvaWQge1xuICBjb25zdCBhbmNlc3RvcnM6IFRIUkVFLk9iamVjdDNEW10gPSBbXTtcblxuICBsZXQgaGVhZDogVEhSRUUuT2JqZWN0M0QgfCBudWxsID0gb2JqZWN0O1xuICB3aGlsZSAoaGVhZCAhPT0gbnVsbCkge1xuICAgIGFuY2VzdG9ycy51bnNoaWZ0KGhlYWQpO1xuICAgIGhlYWQgPSBoZWFkLnBhcmVudDtcbiAgfVxuXG4gIGFuY2VzdG9ycy5mb3JFYWNoKChhbmNlc3RvcikgPT4ge1xuICAgIGNhbGxiYWNrKGFuY2VzdG9yKTtcbiAgfSk7XG59XG4iLCAiaW1wb3J0IHR5cGUgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbi8qKlxuICogVHJhdmVyc2UgY2hpbGRyZW4gb2YgZ2l2ZW4gb2JqZWN0IGFuZCBleGVjdXRlIGdpdmVuIGNhbGxiYWNrLlxuICogVGhlIGdpdmVuIG9iamVjdCBpdHNlbGYgd29udCBiZSBnaXZlbiB0byB0aGUgY2FsbGJhY2suXG4gKiBJZiB0aGUgcmV0dXJuIHZhbHVlIG9mIHRoZSBjYWxsYmFjayBpcyBgdHJ1ZWAsIGl0IHdpbGwgaGFsdCB0aGUgdHJhdmVyc2FsIG9mIGl0cyBjaGlsZHJlbi5cbiAqIEBwYXJhbSBvYmplY3QgQSByb290IG9iamVjdFxuICogQHBhcmFtIGNhbGxiYWNrIEEgY2FsbGJhY2sgZnVuY3Rpb24gY2FsbGVkIGZvciBlYWNoIGNoaWxkcmVuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0cmF2ZXJzZUNoaWxkcmVuVW50aWxDb25kaXRpb25NZXQoXG4gIG9iamVjdDogVEhSRUUuT2JqZWN0M0QsXG4gIGNhbGxiYWNrOiAob2JqZWN0OiBUSFJFRS5PYmplY3QzRCkgPT4gYm9vbGVhbixcbik6IHZvaWQge1xuICBvYmplY3QuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSBjYWxsYmFjayhjaGlsZCk7XG4gICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgIHRyYXZlcnNlQ2hpbGRyZW5VbnRpbENvbmRpdGlvbk1ldChjaGlsZCwgY2FsbGJhY2spO1xuICAgIH1cbiAgfSk7XG59XG4iLCAiaW1wb3J0IHR5cGUgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbi8qKlxuICogRmluZHMgdGhlIGxvd2VzdCBjb21tb24gYW5jZXN0b3JzIG9mIHRoZSBnaXZlbiBvYmplY3RzLCBpZiBpdCBleGlzdHMuXG4gKiBAcGFyYW0gb2JqZWN0cyBUaGUgb2JqZWN0cyB0byBmaW5kIHRoZSBsb3dlc3QgY29tbW9uIGFuY2VzdG9yIGZvci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxvd2VzdENvbW1vbkFuY2VzdG9yKG9iamVjdHM6IFNldDxUSFJFRS5PYmplY3QzRD4pOiBUSFJFRS5PYmplY3QzRCB8IG51bGwge1xuICBjb25zdCBzaGFyZWRBbmNlc3RvcnMgPSBuZXcgTWFwPFRIUkVFLk9iamVjdDNELCBudW1iZXI+KCk7XG4gIGZvciAoY29uc3Qgb2JqZWN0IG9mIG9iamVjdHMpIHtcbiAgICBsZXQgY3VycmVudDogVEhSRUUuT2JqZWN0M0QgfCBudWxsID0gb2JqZWN0O1xuICAgIGRvIHtcbiAgICAgIGNvbnN0IG5ld1ZhbHVlID0gKHNoYXJlZEFuY2VzdG9ycy5nZXQoY3VycmVudCkgPz8gMCkgKyAxO1xuICAgICAgaWYgKG5ld1ZhbHVlID09PSBvYmplY3RzLnNpemUpIHtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnQ7XG4gICAgICB9XG4gICAgICBzaGFyZWRBbmNlc3RvcnMuc2V0KGN1cnJlbnQsIG5ld1ZhbHVlKTtcbiAgICAgIGN1cnJlbnQgPSBjdXJyZW50LnBhcmVudDtcbiAgICB9IHdoaWxlIChjdXJyZW50ICE9PSBudWxsKTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cbiIsICJpbXBvcnQgdHlwZSAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB0eXBlIHsgVlJNU3ByaW5nQm9uZUpvaW50IH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lSm9pbnQuanMnO1xuaW1wb3J0IHsgdHJhdmVyc2VBbmNlc3RvcnNGcm9tUm9vdCB9IGZyb20gJy4vdXRpbHMvdHJhdmVyc2VBbmNlc3RvcnNGcm9tUm9vdC5qcyc7XG5pbXBvcnQgdHlwZSB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlciB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyLmpzJztcbmltcG9ydCB0eXBlIHsgVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXAgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwLmpzJztcbmltcG9ydCB7IHRyYXZlcnNlQ2hpbGRyZW5VbnRpbENvbmRpdGlvbk1ldCB9IGZyb20gJy4vdXRpbHMvdHJhdmVyc2VDaGlsZHJlblVudGlsQ29uZGl0aW9uTWV0LmpzJztcbmltcG9ydCB7IGxvd2VzdENvbW1vbkFuY2VzdG9yIH0gZnJvbSAnLi91dGlscy9sb3dlc3RDb21tb25BbmNlc3Rvci5qcyc7XG5cbmV4cG9ydCBjbGFzcyBWUk1TcHJpbmdCb25lTWFuYWdlciB7XG4gIHByaXZhdGUgX2pvaW50cyA9IG5ldyBTZXQ8VlJNU3ByaW5nQm9uZUpvaW50PigpO1xuICBwcml2YXRlIF9zb3J0ZWRKb2ludHM6IEFycmF5PFZSTVNwcmluZ0JvbmVKb2ludD4gPSBbXTtcbiAgcHJpdmF0ZSBfaGFzV2FybmVkQ2lyY3VsYXJEZXBlbmRlbmN5ID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEFuIG9yZGVyZWQgbGlzdCBvZiBhbmNlc3RvcnMgb2YgYWxsIHRoZSBTcHJpbmdCb25lIGpvaW50cy4gQmVmb3JlIHRoZVxuICAgKiBTcHJpbmdCb25lIGpvaW50cyBjYW4gYmUgdXBkYXRlZCwgdGhlIHdvcmxkIG1hdHJpY2VzIG9mIHRoZXNlIGFuY2VzdG9yc1xuICAgKiBtdXN0IGJlIGNhbGN1bGF0ZWQuIFRoZSBmaXJzdCBlbGVtZW50IGlzIHRoZSBsb3dlc3QgY29tbW9uIGFuY2VzdG9yLCBmb3JcbiAgICogd2hpY2ggbm90IG9ubHkgaXRzIHdvcmxkIG1hdHJpeCBidXQgaXRzIGFuY2VzdG9ycycgd29ybGQgbWF0cmljZXMgYXJlXG4gICAqIHVwZGF0ZWQgYXMgd2VsbC5cbiAgICovXG4gIHByaXZhdGUgX2FuY2VzdG9yczogVEhSRUUuT2JqZWN0M0RbXSA9IFtdO1xuXG4gIHB1YmxpYyBnZXQgam9pbnRzKCk6IFNldDxWUk1TcHJpbmdCb25lSm9pbnQ+IHtcbiAgICByZXR1cm4gdGhpcy5fam9pbnRzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFVzZSB7QGxpbmsgam9pbnRzfSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIGdldCBzcHJpbmdCb25lcygpOiBTZXQ8VlJNU3ByaW5nQm9uZUpvaW50PiB7XG4gICAgY29uc29sZS53YXJuKCdWUk1TcHJpbmdCb25lTWFuYWdlcjogc3ByaW5nQm9uZXMgaXMgZGVwcmVjYXRlZC4gdXNlIGpvaW50cyBpbnN0ZWFkLicpO1xuXG4gICAgcmV0dXJuIHRoaXMuX2pvaW50cztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgY29sbGlkZXJHcm91cHMoKTogVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXBbXSB7XG4gICAgY29uc3Qgc2V0ID0gbmV3IFNldDxWUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cD4oKTtcbiAgICB0aGlzLl9qb2ludHMuZm9yRWFjaCgoc3ByaW5nQm9uZSkgPT4ge1xuICAgICAgc3ByaW5nQm9uZS5jb2xsaWRlckdyb3Vwcy5mb3JFYWNoKChjb2xsaWRlckdyb3VwKSA9PiB7XG4gICAgICAgIHNldC5hZGQoY29sbGlkZXJHcm91cCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShzZXQpO1xuICB9XG5cbiAgcHVibGljIGdldCBjb2xsaWRlcnMoKTogVlJNU3ByaW5nQm9uZUNvbGxpZGVyW10ge1xuICAgIGNvbnN0IHNldCA9IG5ldyBTZXQ8VlJNU3ByaW5nQm9uZUNvbGxpZGVyPigpO1xuICAgIHRoaXMuY29sbGlkZXJHcm91cHMuZm9yRWFjaCgoY29sbGlkZXJHcm91cCkgPT4ge1xuICAgICAgY29sbGlkZXJHcm91cC5jb2xsaWRlcnMuZm9yRWFjaCgoY29sbGlkZXIpID0+IHtcbiAgICAgICAgc2V0LmFkZChjb2xsaWRlcik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShzZXQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfb2JqZWN0U3ByaW5nQm9uZXNNYXAgPSBuZXcgTWFwPFRIUkVFLk9iamVjdDNELCBTZXQ8VlJNU3ByaW5nQm9uZUpvaW50Pj4oKTtcbiAgcHJpdmF0ZSBfaXNTb3J0ZWRKb2ludHNEaXJ0eSA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX3JlbGV2YW50Q2hpbGRyZW5VcGRhdGVkID0gdGhpcy5fcmVsZXZhbnRDaGlsZHJlblVwZGF0ZWQuYmluZCh0aGlzKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRKb2ludChqb2ludDogVlJNU3ByaW5nQm9uZUpvaW50KTogdm9pZCB7XG4gICAgdGhpcy5fam9pbnRzLmFkZChqb2ludCk7XG5cbiAgICBsZXQgb2JqZWN0U2V0ID0gdGhpcy5fb2JqZWN0U3ByaW5nQm9uZXNNYXAuZ2V0KGpvaW50LmJvbmUpO1xuICAgIGlmIChvYmplY3RTZXQgPT0gbnVsbCkge1xuICAgICAgb2JqZWN0U2V0ID0gbmV3IFNldDxWUk1TcHJpbmdCb25lSm9pbnQ+KCk7XG4gICAgICB0aGlzLl9vYmplY3RTcHJpbmdCb25lc01hcC5zZXQoam9pbnQuYm9uZSwgb2JqZWN0U2V0KTtcbiAgICB9XG4gICAgb2JqZWN0U2V0LmFkZChqb2ludCk7XG5cbiAgICB0aGlzLl9pc1NvcnRlZEpvaW50c0RpcnR5ID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBVc2Uge0BsaW5rIGFkZEpvaW50fSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIGFkZFNwcmluZ0JvbmUoam9pbnQ6IFZSTVNwcmluZ0JvbmVKb2ludCk6IHZvaWQge1xuICAgIGNvbnNvbGUud2FybignVlJNU3ByaW5nQm9uZU1hbmFnZXI6IGFkZFNwcmluZ0JvbmUoKSBpcyBkZXByZWNhdGVkLiB1c2UgYWRkSm9pbnQoKSBpbnN0ZWFkLicpO1xuXG4gICAgdGhpcy5hZGRKb2ludChqb2ludCk7XG4gIH1cblxuICBwdWJsaWMgZGVsZXRlSm9pbnQoam9pbnQ6IFZSTVNwcmluZ0JvbmVKb2ludCk6IHZvaWQge1xuICAgIHRoaXMuX2pvaW50cy5kZWxldGUoam9pbnQpO1xuXG4gICAgY29uc3Qgb2JqZWN0U2V0ID0gdGhpcy5fb2JqZWN0U3ByaW5nQm9uZXNNYXAuZ2V0KGpvaW50LmJvbmUpITtcbiAgICBvYmplY3RTZXQuZGVsZXRlKGpvaW50KTtcblxuICAgIHRoaXMuX2lzU29ydGVkSm9pbnRzRGlydHkgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFVzZSB7QGxpbmsgZGVsZXRlSm9pbnR9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgZGVsZXRlU3ByaW5nQm9uZShqb2ludDogVlJNU3ByaW5nQm9uZUpvaW50KTogdm9pZCB7XG4gICAgY29uc29sZS53YXJuKCdWUk1TcHJpbmdCb25lTWFuYWdlcjogZGVsZXRlU3ByaW5nQm9uZSgpIGlzIGRlcHJlY2F0ZWQuIHVzZSBkZWxldGVKb2ludCgpIGluc3RlYWQuJyk7XG5cbiAgICB0aGlzLmRlbGV0ZUpvaW50KGpvaW50KTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRJbml0U3RhdGUoKTogdm9pZCB7XG4gICAgdGhpcy5fc29ydEpvaW50cygpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9zb3J0ZWRKb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHNwcmluZ0JvbmUgPSB0aGlzLl9zb3J0ZWRKb2ludHNbaV07XG4gICAgICBzcHJpbmdCb25lLmJvbmUudXBkYXRlTWF0cml4KCk7XG4gICAgICBzcHJpbmdCb25lLmJvbmUudXBkYXRlV29ybGRNYXRyaXgoZmFsc2UsIGZhbHNlKTtcbiAgICAgIHNwcmluZ0JvbmUuc2V0SW5pdFN0YXRlKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMuX3NvcnRKb2ludHMoKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fc29ydGVkSm9pbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBzcHJpbmdCb25lID0gdGhpcy5fc29ydGVkSm9pbnRzW2ldO1xuICAgICAgc3ByaW5nQm9uZS5ib25lLnVwZGF0ZU1hdHJpeCgpO1xuICAgICAgc3ByaW5nQm9uZS5ib25lLnVwZGF0ZVdvcmxkTWF0cml4KGZhbHNlLCBmYWxzZSk7XG4gICAgICBzcHJpbmdCb25lLnJlc2V0KCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHVwZGF0ZShkZWx0YTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fc29ydEpvaW50cygpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9hbmNlc3RvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuX2FuY2VzdG9yc1tpXS51cGRhdGVXb3JsZE1hdHJpeChpID09PSAwLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9zb3J0ZWRKb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIC8vIHVwZGF0ZSB0aGUgc3ByaW5nYm9uZVxuICAgICAgY29uc3Qgc3ByaW5nQm9uZSA9IHRoaXMuX3NvcnRlZEpvaW50c1tpXTtcbiAgICAgIHNwcmluZ0JvbmUuYm9uZS51cGRhdGVNYXRyaXgoKTtcbiAgICAgIHNwcmluZ0JvbmUuYm9uZS51cGRhdGVXb3JsZE1hdHJpeChmYWxzZSwgZmFsc2UpO1xuICAgICAgc3ByaW5nQm9uZS51cGRhdGUoZGVsdGEpO1xuXG4gICAgICAvLyB1cGRhdGUgY2hpbGRyZW4gd29ybGQgbWF0cmljZXNcbiAgICAgIC8vIGl0IGlzIHJlcXVpcmVkIHdoZW4gdGhlIHNwcmluZyBib25lIGNoYWluIGlzIHNwYXJzZVxuICAgICAgdHJhdmVyc2VDaGlsZHJlblVudGlsQ29uZGl0aW9uTWV0KHNwcmluZ0JvbmUuYm9uZSwgdGhpcy5fcmVsZXZhbnRDaGlsZHJlblVwZGF0ZWQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTb3J0cyB0aGUgam9pbnRzIGVuc3VyaW5nIHRoZXkgYXJlIHVwZGF0ZWQgaW4gdGhlIGNvcnJlY3Qgb3JkZXIgdGFraW5nIGRlcGVuZGVuY2llcyBpbnRvIGFjY291bnQuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIHVwZGF0ZXMge0BsaW5rIF9zb3J0ZWRKb2ludHN9IGFuZCB7QGxpbmsgX2FuY2VzdG9yc30uXG4gICAqIE1ha2Ugc3VyZSB0byBjYWxsIHRoaXMgYmVmb3JlIHVzaW5nIHRoZW0uXG4gICAqL1xuICBwcml2YXRlIF9zb3J0Sm9pbnRzKCkge1xuICAgIGlmICghdGhpcy5faXNTb3J0ZWRKb2ludHNEaXJ0eSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHNwcmluZ0JvbmVPcmRlcjogQXJyYXk8VlJNU3ByaW5nQm9uZUpvaW50PiA9IFtdO1xuICAgIGNvbnN0IHNwcmluZ0JvbmVzVHJpZWQgPSBuZXcgU2V0PFZSTVNwcmluZ0JvbmVKb2ludD4oKTtcbiAgICBjb25zdCBzcHJpbmdCb25lc0RvbmUgPSBuZXcgU2V0PFZSTVNwcmluZ0JvbmVKb2ludD4oKTtcbiAgICBjb25zdCBhbmNlc3RvcnMgPSBuZXcgU2V0PFRIUkVFLk9iamVjdDNEPigpO1xuXG4gICAgZm9yIChjb25zdCBzcHJpbmdCb25lIG9mIHRoaXMuX2pvaW50cykge1xuICAgICAgdGhpcy5faW5zZXJ0Sm9pbnRTb3J0KHNwcmluZ0JvbmUsIHNwcmluZ0JvbmVzVHJpZWQsIHNwcmluZ0JvbmVzRG9uZSwgc3ByaW5nQm9uZU9yZGVyLCBhbmNlc3RvcnMpO1xuICAgIH1cbiAgICB0aGlzLl9zb3J0ZWRKb2ludHMgPSBzcHJpbmdCb25lT3JkZXI7XG5cbiAgICBjb25zdCBsY2EgPSBsb3dlc3RDb21tb25BbmNlc3RvcihhbmNlc3RvcnMpO1xuICAgIHRoaXMuX2FuY2VzdG9ycyA9IFtdO1xuICAgIGlmIChsY2EpIHtcbiAgICAgIHRoaXMuX2FuY2VzdG9ycy5wdXNoKGxjYSk7XG4gICAgICB0cmF2ZXJzZUNoaWxkcmVuVW50aWxDb25kaXRpb25NZXQobGNhLCAob2JqZWN0OiBUSFJFRS5PYmplY3QzRCkgPT4ge1xuICAgICAgICAvLyBpZiB0aGUgb2JqZWN0IGhhcyBhdHRhY2hlZCBzcHJpbmdib25lLCBoYWx0IHRoZSB0cmF2ZXJzYWxcbiAgICAgICAgaWYgKCh0aGlzLl9vYmplY3RTcHJpbmdCb25lc01hcC5nZXQob2JqZWN0KT8uc2l6ZSA/PyAwKSA+IDApIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9hbmNlc3RvcnMucHVzaChvYmplY3QpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLl9pc1NvcnRlZEpvaW50c0RpcnR5ID0gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIF9pbnNlcnRKb2ludFNvcnQoXG4gICAgc3ByaW5nQm9uZTogVlJNU3ByaW5nQm9uZUpvaW50LFxuICAgIHNwcmluZ0JvbmVzVHJpZWQ6IFNldDxWUk1TcHJpbmdCb25lSm9pbnQ+LFxuICAgIHNwcmluZ0JvbmVzRG9uZTogU2V0PFZSTVNwcmluZ0JvbmVKb2ludD4sXG4gICAgc3ByaW5nQm9uZU9yZGVyOiBBcnJheTxWUk1TcHJpbmdCb25lSm9pbnQ+LFxuICAgIGFuY2VzdG9yczogU2V0PFRIUkVFLk9iamVjdDNEPixcbiAgKSB7XG4gICAgaWYgKHNwcmluZ0JvbmVzRG9uZS5oYXMoc3ByaW5nQm9uZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoc3ByaW5nQm9uZXNUcmllZC5oYXMoc3ByaW5nQm9uZSkpIHtcbiAgICAgIGlmICghdGhpcy5faGFzV2FybmVkQ2lyY3VsYXJEZXBlbmRlbmN5KSB7XG4gICAgICAgIGNvbnNvbGUud2FybignVlJNU3ByaW5nQm9uZU1hbmFnZXI6IENpcmN1bGFyIGRlcGVuZGVuY3kgZGV0ZWN0ZWQnKTtcbiAgICAgICAgdGhpcy5faGFzV2FybmVkQ2lyY3VsYXJEZXBlbmRlbmN5ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzcHJpbmdCb25lc1RyaWVkLmFkZChzcHJpbmdCb25lKTtcblxuICAgIGNvbnN0IGRlcE9iamVjdHMgPSBzcHJpbmdCb25lLmRlcGVuZGVuY2llcztcbiAgICBmb3IgKGNvbnN0IGRlcE9iamVjdCBvZiBkZXBPYmplY3RzKSB7XG4gICAgICBsZXQgZW5jb3VudGVyZWRTcHJpbmdCb25lID0gZmFsc2U7XG4gICAgICBsZXQgYW5jZXN0b3I6IFRIUkVFLk9iamVjdDNEIHwgbnVsbCA9IG51bGw7XG4gICAgICB0cmF2ZXJzZUFuY2VzdG9yc0Zyb21Sb290KGRlcE9iamVjdCwgKGRlcE9iamVjdEFuY2VzdG9yKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iamVjdFNldCA9IHRoaXMuX29iamVjdFNwcmluZ0JvbmVzTWFwLmdldChkZXBPYmplY3RBbmNlc3Rvcik7XG4gICAgICAgIGlmIChvYmplY3RTZXQpIHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGRlcFNwcmluZ0JvbmUgb2Ygb2JqZWN0U2V0KSB7XG4gICAgICAgICAgICBlbmNvdW50ZXJlZFNwcmluZ0JvbmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5faW5zZXJ0Sm9pbnRTb3J0KGRlcFNwcmluZ0JvbmUsIHNwcmluZ0JvbmVzVHJpZWQsIHNwcmluZ0JvbmVzRG9uZSwgc3ByaW5nQm9uZU9yZGVyLCBhbmNlc3RvcnMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICghZW5jb3VudGVyZWRTcHJpbmdCb25lKSB7XG4gICAgICAgICAgLy8gVGhpcyBvYmplY3QgaXMgYW4gYW5jZXN0b3Igb2YgYSBzcHJpbmcgYm9uZSwgYnV0IGlzIE5PVCBhIHNwYXJzZSBub2RlIGluIGJldHdlZW4gc3ByaW5nIGJvbmVzLlxuICAgICAgICAgIGFuY2VzdG9yID0gZGVwT2JqZWN0QW5jZXN0b3I7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaWYgKGFuY2VzdG9yKSB7XG4gICAgICAgIGFuY2VzdG9ycy5hZGQoYW5jZXN0b3IpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHNwcmluZ0JvbmVPcmRlci5wdXNoKHNwcmluZ0JvbmUpO1xuXG4gICAgc3ByaW5nQm9uZXNEb25lLmFkZChzcHJpbmdCb25lKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbGV2YW50Q2hpbGRyZW5VcGRhdGVkKG9iamVjdDogVEhSRUUuT2JqZWN0M0QpIHtcbiAgICAvLyBpZiB0aGUgb2JqZWN0IGhhcyBhdHRhY2hlZCBzcHJpbmdib25lLCBoYWx0IHRoZSB0cmF2ZXJzYWxcbiAgICBpZiAoKHRoaXMuX29iamVjdFNwcmluZ0JvbmVzTWFwLmdldChvYmplY3QpPy5zaXplID8/IDApID4gMCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gb3RoZXJ3aXNlIHVwZGF0ZSBpdHMgd29ybGQgbWF0cml4XG4gICAgb2JqZWN0LnVwZGF0ZVdvcmxkTWF0cml4KGZhbHNlLCBmYWxzZSk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxZQUFZQSxZQUFXOzs7QUNBdkIsWUFBWSxXQUFXOzs7QUNLaEIsSUFBZSw2QkFBZixNQUEwQztBQTJCakQ7OztBRDdCQSxJQUFNLE9BQU8sSUFBVSxjQUFRO0FBQy9CLElBQU0sT0FBTyxJQUFVLGNBQVE7QUFFeEIsSUFBTSxvQ0FBTixjQUFnRCwyQkFBMkI7QUFBQSxFQUNoRixJQUFXLE9BQWtCO0FBQzNCLFdBQU87QUFBQSxFQUNUO0FBQUEsRUFzQk8sWUFBWSxRQUE4RjtBQS9Cbkg7QUFnQ0ksVUFBTTtBQUVOLFNBQUssVUFBUyxzQ0FBUSxXQUFSLFlBQWtCLElBQVUsY0FBUSxHQUFLLEdBQUssQ0FBRztBQUMvRCxTQUFLLFFBQU8sc0NBQVEsU0FBUixZQUFnQixJQUFVLGNBQVEsR0FBSyxHQUFLLENBQUc7QUFDM0QsU0FBSyxVQUFTLHNDQUFRLFdBQVIsWUFB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QUFPO0FBQUEsUUFDVDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGO0FBMWtCYSwyQkFDWSxpQkFBaUI7QUFEbkMsSUFBTSw0QkFBTjsiLAogICJuYW1lcyI6IFsiVEhSRUUiLCAiVEhSRUUiLCAiX3YzQSIsICJUSFJFRSIsICJfdjNBIiwgIlRIUkVFIiwgIl92M0EiLCAiVEhSRUUiLCAiVEhSRUUiLCAiX3YzQSIsICJUSFJFRSIsICJUSFJFRSIsICJfdjNBIiwgIlRIUkVFIiwgIlRIUkVFIiwgIlRIUkVFIiwgIlRIUkVFIiwgIlRIUkVFIiwgIlNJTkdVTEFSSVRZX0VQU0lMT04iLCAiVEhSRUUiLCAiQVJDX1NFR01FTlRTIiwgIlRIUkVFIiwgIlNJTkdVTEFSSVRZX0VQU0lMT04iLCAiVEhSRUUiLCAiQVJDX1NFR01FTlRTIiwgIlRIUkVFIiwgIlRIUkVFIiwgIlRIUkVFIiwgIlRIUkVFIiwgIlRIUkVFIiwgIl92M0EiLCAiX3YzQiIsICJUSFJFRSIsICJfYSIsICJfYiIsICJfYyIsICJfZCIsICJfZSJdCn0K
