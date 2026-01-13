/*!
 * @pixiv/three-vrm-springbone v3.4.5
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

// src/VRMSpringBoneCollider.ts
import * as THREE10 from "three";
var VRMSpringBoneCollider = class extends THREE10.Object3D {
  constructor(shape) {
    super();
    /**
     * World space matrix for the collider shape used in collision calculations.
     */
    this.colliderMatrix = new THREE10.Matrix4();
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
import * as THREE13 from "three";

// src/utils/Matrix4InverseCache.ts
import * as THREE12 from "three";

// src/utils/mat4InvertCompat.ts
import * as THREE11 from "three";
var _matA = new THREE11.Matrix4();
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
    this._inverseCache = new THREE12.Matrix4();
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
var IDENTITY_MATRIX4 = new THREE13.Matrix4();
var _v3A7 = new THREE13.Vector3();
var _v3B2 = new THREE13.Vector3();
var _worldSpacePosition = new THREE13.Vector3();
var _nextTail = new THREE13.Vector3();
var _matA2 = new THREE13.Matrix4();
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
    this._currentTail = new THREE13.Vector3();
    /**
     * Previous position of child tail, in center unit. Will be used for verlet integration.
     */
    this._prevTail = new THREE13.Vector3();
    /**
     * Initial axis of the bone, in local unit.
     */
    this._boneAxis = new THREE13.Vector3();
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
    this._initialLocalMatrix = new THREE13.Matrix4();
    /**
     * Initial state of the rotation of the bone.
     */
    this._initialLocalRotation = new THREE13.Quaternion();
    /**
     * Initial state of the position of its child.
     */
    this._initialLocalChildPosition = new THREE13.Vector3();
    var _a, _b, _c, _d, _e, _f;
    this.bone = bone;
    this.bone.matrixAutoUpdate = false;
    this.child = child;
    this.settings = {
      hitRadius: (_a = settings.hitRadius) != null ? _a : 0,
      stiffness: (_b = settings.stiffness) != null ? _b : 1,
      gravityPower: (_c = settings.gravityPower) != null ? _c : 0,
      gravityDir: (_e = (_d = settings.gravityDir) == null ? void 0 : _d.clone()) != null ? _e : new THREE13.Vector3(0, -1, 0),
      dragForce: (_f = settings.dragForce) != null ? _f : 0.4
    };
    this.colliderGroups = colliderGroups;
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
    if (delta <= 0) return;
    this._calcWorldSpaceBoneLength();
    const worldSpaceBoneAxis = _v3B2.copy(this._boneAxis).transformDirection(this._initialLocalMatrix).transformDirection(this._parentMatrixWorld);
    _nextTail.copy(this._currentTail).add(_v3A7.subVectors(this._currentTail, this._prevTail).multiplyScalar(1 - this.settings.dragForce)).applyMatrix4(this._getMatrixCenterToWorld()).addScaledVector(worldSpaceBoneAxis, this.settings.stiffness * delta).addScaledVector(this.settings.gravityDir, this.settings.gravityPower * delta);
    _worldSpacePosition.setFromMatrixPosition(this.bone.matrixWorld);
    _nextTail.sub(_worldSpacePosition).normalize().multiplyScalar(this._worldSpaceBoneLength).add(_worldSpacePosition);
    this._collision(_nextTail);
    this._prevTail.copy(this._currentTail);
    this._currentTail.copy(_nextTail).applyMatrix4(this._getMatrixWorldToCenter());
    const worldSpaceInitialMatrixInv = _matA2.multiplyMatrices(this._parentMatrixWorld, this._initialLocalMatrix).invert();
    this.bone.quaternion.setFromUnitVectors(this._boneAxis, _v3A7.copy(_nextTail).applyMatrix4(worldSpaceInitialMatrixInv).normalize()).premultiply(this._initialLocalRotation);
    this.bone.updateMatrix();
    this.bone.matrixWorld.multiplyMatrices(this._parentMatrixWorld, this.bone.matrix);
  }
  /**
   * Do collision math against every colliders attached to this bone.
   *
   * @param tail The tail you want to process
   */
  _collision(tail) {
    for (let cg = 0; cg < this.colliderGroups.length; cg++) {
      for (let c = 0; c < this.colliderGroups[cg].colliders.length; c++) {
        const collider = this.colliderGroups[cg].colliders[c];
        const dist = collider.shape.calculateCollision(collider.colliderMatrix, tail, this.settings.hitRadius, _v3A7);
        if (dist < 0) {
          tail.addScaledVector(_v3A7, -dist);
          tail.sub(_worldSpacePosition);
          const length = tail.length();
          tail.multiplyScalar(this._worldSpaceBoneLength / length).add(_worldSpacePosition);
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
import * as THREE14 from "three";

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
var POSSIBLE_SPEC_VERSIONS = /* @__PURE__ */ new Set(["1.0", "1.0-beta"]);
var POSSIBLE_SPEC_VERSIONS_EXTENDED_COLLIDERS = /* @__PURE__ */ new Set(["1.0"]);
var _VRMSpringBoneLoaderPlugin = class _VRMSpringBoneLoaderPlugin {
  get name() {
    return _VRMSpringBoneLoaderPlugin.EXTENSION_NAME;
  }
  constructor(parser, options) {
    var _a;
    this.parser = parser;
    this.jointHelperRoot = options == null ? void 0 : options.jointHelperRoot;
    this.colliderHelperRoot = options == null ? void 0 : options.colliderHelperRoot;
    this.useExtendedColliders = (_a = options == null ? void 0 : options.useExtendedColliders) != null ? _a : true;
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
            `VRMSpringBoneLoaderPlugin: The collider #${iCollider} attempted to use the node #${schemaCollider.node} but not found`
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
                offset: new THREE14.Vector3().fromArray((_b2 = schemaExShape.sphere.offset) != null ? _b2 : [0, 0, 0]),
                radius: (_c2 = schemaExShape.sphere.radius) != null ? _c2 : 0,
                inside: (_d2 = schemaExShape.sphere.inside) != null ? _d2 : false
              });
            } else if (schemaExShape.capsule) {
              return this._importCapsuleCollider(node, {
                offset: new THREE14.Vector3().fromArray((_e2 = schemaExShape.capsule.offset) != null ? _e2 : [0, 0, 0]),
                radius: (_f = schemaExShape.capsule.radius) != null ? _f : 0,
                tail: new THREE14.Vector3().fromArray((_g = schemaExShape.capsule.tail) != null ? _g : [0, 0, 0]),
                inside: (_h = schemaExShape.capsule.inside) != null ? _h : false
              });
            } else if (schemaExShape.plane) {
              return this._importPlaneCollider(node, {
                offset: new THREE14.Vector3().fromArray((_i = schemaExShape.plane.offset) != null ? _i : [0, 0, 0]),
                normal: new THREE14.Vector3().fromArray((_j = schemaExShape.plane.normal) != null ? _j : [0, 0, 1])
              });
            }
          }
        }
        if (schemaShape.sphere) {
          return this._importSphereCollider(node, {
            offset: new THREE14.Vector3().fromArray((_k = schemaShape.sphere.offset) != null ? _k : [0, 0, 0]),
            radius: (_l = schemaShape.sphere.radius) != null ? _l : 0,
            inside: false
          });
        } else if (schemaShape.capsule) {
          return this._importCapsuleCollider(node, {
            offset: new THREE14.Vector3().fromArray((_m = schemaShape.capsule.offset) != null ? _m : [0, 0, 0]),
            radius: (_n = schemaShape.capsule.radius) != null ? _n : 0,
            tail: new THREE14.Vector3().fromArray((_o = schemaShape.capsule.tail) != null ? _o : [0, 0, 0]),
            inside: false
          });
        }
        throw new Error(`VRMSpringBoneLoaderPlugin: The collider #${iCollider} has no valid shape`);
      });
      const colliderGroups = (_d = extension.colliderGroups) == null ? void 0 : _d.map(
        (schemaColliderGroup, iColliderGroup) => {
          var _a2;
          const cols = ((_a2 = schemaColliderGroup.colliders) != null ? _a2 : []).flatMap((iCollider) => {
            const col = colliders == null ? void 0 : colliders[iCollider];
            if (col == null) {
              console.warn(
                `VRMSpringBoneLoaderPlugin: The colliderGroup #${iColliderGroup} attempted to use a collider #${iCollider} but not found`
              );
              return [];
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
              gravityDir: prevSchemaJoint.gravityDir != null ? new THREE14.Vector3().fromArray(prevSchemaJoint.gravityDir) : void 0
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
            const offset = new THREE14.Vector3(0, 0, 0);
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
          const gravityDir = new THREE14.Vector3();
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
  VRMSpringBoneLoaderPlugin,
  VRMSpringBoneManager
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2hlbHBlcnMvVlJNU3ByaW5nQm9uZUNvbGxpZGVySGVscGVyLnRzIiwgIi4uL3NyYy9WUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZUNhcHN1bGUudHMiLCAiLi4vc3JjL1ZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlLnRzIiwgIi4uL3NyYy9WUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZVBsYW5lLnRzIiwgIi4uL3NyYy9WUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZVNwaGVyZS50cyIsICIuLi9zcmMvaGVscGVycy91dGlscy9Db2xsaWRlclNoYXBlQ2Fwc3VsZUJ1ZmZlckdlb21ldHJ5LnRzIiwgIi4uL3NyYy9oZWxwZXJzL3V0aWxzL0NvbGxpZGVyU2hhcGVQbGFuZUJ1ZmZlckdlb21ldHJ5LnRzIiwgIi4uL3NyYy9oZWxwZXJzL3V0aWxzL0NvbGxpZGVyU2hhcGVTcGhlcmVCdWZmZXJHZW9tZXRyeS50cyIsICIuLi9zcmMvaGVscGVycy9WUk1TcHJpbmdCb25lSm9pbnRIZWxwZXIudHMiLCAiLi4vc3JjL2hlbHBlcnMvdXRpbHMvU3ByaW5nQm9uZUJ1ZmZlckdlb21ldHJ5LnRzIiwgIi4uL3NyYy9WUk1TcHJpbmdCb25lQ29sbGlkZXIudHMiLCAiLi4vc3JjL1ZSTVNwcmluZ0JvbmVKb2ludC50cyIsICIuLi9zcmMvdXRpbHMvTWF0cml4NEludmVyc2VDYWNoZS50cyIsICIuLi9zcmMvdXRpbHMvbWF0NEludmVydENvbXBhdC50cyIsICIuLi9zcmMvVlJNU3ByaW5nQm9uZUxvYWRlclBsdWdpbi50cyIsICIuLi9zcmMvdXRpbHMvdHJhdmVyc2VBbmNlc3RvcnNGcm9tUm9vdC50cyIsICIuLi9zcmMvdXRpbHMvdHJhdmVyc2VDaGlsZHJlblVudGlsQ29uZGl0aW9uTWV0LnRzIiwgIi4uL3NyYy91dGlscy9sb3dlc3RDb21tb25BbmNlc3Rvci50cyIsICIuLi9zcmMvVlJNU3ByaW5nQm9uZU1hbmFnZXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlciB9IGZyb20gJy4uL1ZSTVNwcmluZ0JvbmVDb2xsaWRlcic7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZUNhcHN1bGUgfSBmcm9tICcuLi9WUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZUNhcHN1bGUnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVQbGFuZSB9IGZyb20gJy4uL1ZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlUGxhbmUnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVTcGhlcmUgfSBmcm9tICcuLi9WUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZVNwaGVyZSc7XG5pbXBvcnQgeyBDb2xsaWRlclNoYXBlQnVmZmVyR2VvbWV0cnkgfSBmcm9tICcuL3V0aWxzL0NvbGxpZGVyU2hhcGVCdWZmZXJHZW9tZXRyeSc7XG5pbXBvcnQgeyBDb2xsaWRlclNoYXBlQ2Fwc3VsZUJ1ZmZlckdlb21ldHJ5IH0gZnJvbSAnLi91dGlscy9Db2xsaWRlclNoYXBlQ2Fwc3VsZUJ1ZmZlckdlb21ldHJ5JztcbmltcG9ydCB7IENvbGxpZGVyU2hhcGVQbGFuZUJ1ZmZlckdlb21ldHJ5IH0gZnJvbSAnLi91dGlscy9Db2xsaWRlclNoYXBlUGxhbmVCdWZmZXJHZW9tZXRyeSc7XG5pbXBvcnQgeyBDb2xsaWRlclNoYXBlU3BoZXJlQnVmZmVyR2VvbWV0cnkgfSBmcm9tICcuL3V0aWxzL0NvbGxpZGVyU2hhcGVTcGhlcmVCdWZmZXJHZW9tZXRyeSc7XG5cbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5leHBvcnQgY2xhc3MgVlJNU3ByaW5nQm9uZUNvbGxpZGVySGVscGVyIGV4dGVuZHMgVEhSRUUuR3JvdXAge1xuICBwdWJsaWMgcmVhZG9ubHkgY29sbGlkZXI6IFZSTVNwcmluZ0JvbmVDb2xsaWRlcjtcbiAgcHJpdmF0ZSByZWFkb25seSBfZ2VvbWV0cnk6IENvbGxpZGVyU2hhcGVCdWZmZXJHZW9tZXRyeTtcbiAgcHJpdmF0ZSByZWFkb25seSBfbGluZTogVEhSRUUuTGluZVNlZ21lbnRzO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb2xsaWRlcjogVlJNU3ByaW5nQm9uZUNvbGxpZGVyKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLm1hdHJpeEF1dG9VcGRhdGUgPSBmYWxzZTtcblxuICAgIHRoaXMuY29sbGlkZXIgPSBjb2xsaWRlcjtcblxuICAgIGlmICh0aGlzLmNvbGxpZGVyLnNoYXBlIGluc3RhbmNlb2YgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVTcGhlcmUpIHtcbiAgICAgIHRoaXMuX2dlb21ldHJ5ID0gbmV3IENvbGxpZGVyU2hhcGVTcGhlcmVCdWZmZXJHZW9tZXRyeSh0aGlzLmNvbGxpZGVyLnNoYXBlKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY29sbGlkZXIuc2hhcGUgaW5zdGFuY2VvZiBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZUNhcHN1bGUpIHtcbiAgICAgIHRoaXMuX2dlb21ldHJ5ID0gbmV3IENvbGxpZGVyU2hhcGVDYXBzdWxlQnVmZmVyR2VvbWV0cnkodGhpcy5jb2xsaWRlci5zaGFwZSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNvbGxpZGVyLnNoYXBlIGluc3RhbmNlb2YgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVQbGFuZSkge1xuICAgICAgdGhpcy5fZ2VvbWV0cnkgPSBuZXcgQ29sbGlkZXJTaGFwZVBsYW5lQnVmZmVyR2VvbWV0cnkodGhpcy5jb2xsaWRlci5zaGFwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVlJNU3ByaW5nQm9uZUNvbGxpZGVySGVscGVyOiBVbmtub3duIGNvbGxpZGVyIHNoYXBlIHR5cGUgZGV0ZWN0ZWQnKTtcbiAgICB9XG5cbiAgICBjb25zdCBtYXRlcmlhbCA9IG5ldyBUSFJFRS5MaW5lQmFzaWNNYXRlcmlhbCh7XG4gICAgICBjb2xvcjogMHhmZjAwZmYsXG4gICAgICBkZXB0aFRlc3Q6IGZhbHNlLFxuICAgICAgZGVwdGhXcml0ZTogZmFsc2UsXG4gICAgfSk7XG5cbiAgICB0aGlzLl9saW5lID0gbmV3IFRIUkVFLkxpbmVTZWdtZW50cyh0aGlzLl9nZW9tZXRyeSwgbWF0ZXJpYWwpO1xuICAgIHRoaXMuYWRkKHRoaXMuX2xpbmUpO1xuICB9XG5cbiAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5fZ2VvbWV0cnkuZGlzcG9zZSgpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZU1hdHJpeFdvcmxkKGZvcmNlOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5jb2xsaWRlci51cGRhdGVXb3JsZE1hdHJpeCh0cnVlLCBmYWxzZSk7XG5cbiAgICB0aGlzLm1hdHJpeC5jb3B5KHRoaXMuY29sbGlkZXIubWF0cml4V29ybGQpO1xuXG4gICAgY29uc3QgbWF0cml4V29ybGRFbGVtZW50cyA9IHRoaXMubWF0cml4LmVsZW1lbnRzO1xuICAgIHRoaXMuX2dlb21ldHJ5LndvcmxkU2NhbGUgPSBfdjNBXG4gICAgICAuc2V0KG1hdHJpeFdvcmxkRWxlbWVudHNbMF0sIG1hdHJpeFdvcmxkRWxlbWVudHNbMV0sIG1hdHJpeFdvcmxkRWxlbWVudHNbMl0pXG4gICAgICAubGVuZ3RoKCk7IC8vIGNhbGN1bGF0ZSBzY2FsZSBvZiB4IGNvbXBvbmVudFxuXG4gICAgdGhpcy5fZ2VvbWV0cnkudXBkYXRlKCk7XG5cbiAgICBzdXBlci51cGRhdGVNYXRyaXhXb3JsZChmb3JjZSk7XG4gIH1cbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZSB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGUnO1xuXG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF92M0IgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5leHBvcnQgY2xhc3MgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVDYXBzdWxlIGV4dGVuZHMgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGUge1xuICBwdWJsaWMgZ2V0IHR5cGUoKTogJ2NhcHN1bGUnIHtcbiAgICByZXR1cm4gJ2NhcHN1bGUnO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBvZmZzZXQgb2YgdGhlIGNhcHN1bGUgaGVhZCBmcm9tIHRoZSBvcmlnaW4gaW4gbG9jYWwgc3BhY2UuXG4gICAqL1xuICBwdWJsaWMgb2Zmc2V0OiBUSFJFRS5WZWN0b3IzO1xuXG4gIC8qKlxuICAgKiBUaGUgb2Zmc2V0IG9mIHRoZSBjYXBzdWxlIHRhaWwgZnJvbSB0aGUgb3JpZ2luIGluIGxvY2FsIHNwYWNlLlxuICAgKi9cbiAgcHVibGljIHRhaWw6IFRIUkVFLlZlY3RvcjM7XG5cbiAgLyoqXG4gICAqIFRoZSByYWRpdXMgb2YgdGhlIGNhcHN1bGUuXG4gICAqL1xuICBwdWJsaWMgcmFkaXVzOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIElmIHRydWUsIHRoZSBjb2xsaWRlciBwcmV2ZW50cyBzcHJpbmcgYm9uZXMgZnJvbSBnb2luZyBvdXRzaWRlIG9mIHRoZSBjYXBzdWxlIGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgaW5zaWRlOiBib29sZWFuO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJhbXM/OiB7IHJhZGl1cz86IG51bWJlcjsgb2Zmc2V0PzogVEhSRUUuVmVjdG9yMzsgdGFpbD86IFRIUkVFLlZlY3RvcjM7IGluc2lkZT86IGJvb2xlYW4gfSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLm9mZnNldCA9IHBhcmFtcz8ub2Zmc2V0ID8/IG5ldyBUSFJFRS5WZWN0b3IzKDAuMCwgMC4wLCAwLjApO1xuICAgIHRoaXMudGFpbCA9IHBhcmFtcz8udGFpbCA/PyBuZXcgVEhSRUUuVmVjdG9yMygwLjAsIDAuMCwgMC4wKTtcbiAgICB0aGlzLnJhZGl1cyA9IHBhcmFtcz8ucmFkaXVzID8/IDAuMDtcbiAgICB0aGlzLmluc2lkZSA9IHBhcmFtcz8uaW5zaWRlID8/IGZhbHNlO1xuICB9XG5cbiAgcHVibGljIGNhbGN1bGF0ZUNvbGxpc2lvbihcbiAgICBjb2xsaWRlck1hdHJpeDogVEhSRUUuTWF0cml4NCxcbiAgICBvYmplY3RQb3NpdGlvbjogVEhSRUUuVmVjdG9yMyxcbiAgICBvYmplY3RSYWRpdXM6IG51bWJlcixcbiAgICB0YXJnZXQ6IFRIUkVFLlZlY3RvcjMsXG4gICk6IG51bWJlciB7XG4gICAgX3YzQS5zZXRGcm9tTWF0cml4UG9zaXRpb24oY29sbGlkZXJNYXRyaXgpOyAvLyB0cmFuc2Zvcm1lZCBoZWFkXG4gICAgX3YzQi5zdWJWZWN0b3JzKHRoaXMudGFpbCwgdGhpcy5vZmZzZXQpLmFwcGx5TWF0cml4NChjb2xsaWRlck1hdHJpeCk7IC8vIHRyYW5zZm9ybWVkIHRhaWxcbiAgICBfdjNCLnN1YihfdjNBKTsgLy8gZnJvbSBoZWFkIHRvIHRhaWxcbiAgICBjb25zdCBsZW5ndGhTcUNhcHN1bGUgPSBfdjNCLmxlbmd0aFNxKCk7XG5cbiAgICB0YXJnZXQuY29weShvYmplY3RQb3NpdGlvbikuc3ViKF92M0EpOyAvLyBmcm9tIGhlYWQgdG8gb2JqZWN0XG4gICAgY29uc3QgZG90ID0gX3YzQi5kb3QodGFyZ2V0KTsgLy8gZG90IHByb2R1Y3Qgb2Ygb2Zmc2V0VG9UYWlsIGFuZCBvZmZzZXRUb09iamVjdFxuXG4gICAgaWYgKGRvdCA8PSAwLjApIHtcbiAgICAgIC8vIGlmIG9iamVjdCBpcyBuZWFyIGZyb20gdGhlIGhlYWRcbiAgICAgIC8vIGRvIG5vdGhpbmcsIHVzZSB0aGUgY3VycmVudCB2YWx1ZSBkaXJlY3RseVxuICAgIH0gZWxzZSBpZiAobGVuZ3RoU3FDYXBzdWxlIDw9IGRvdCkge1xuICAgICAgLy8gaWYgb2JqZWN0IGlzIG5lYXIgZnJvbSB0aGUgdGFpbFxuICAgICAgdGFyZ2V0LnN1YihfdjNCKTsgLy8gZnJvbSB0YWlsIHRvIG9iamVjdFxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpZiBvYmplY3QgaXMgYmV0d2VlbiB0d28gZW5kc1xuICAgICAgX3YzQi5tdWx0aXBseVNjYWxhcihkb3QgLyBsZW5ndGhTcUNhcHN1bGUpOyAvLyBmcm9tIGhlYWQgdG8gdGhlIG5lYXJlc3QgcG9pbnQgb2YgdGhlIHNoYWZ0XG4gICAgICB0YXJnZXQuc3ViKF92M0IpOyAvLyBmcm9tIHRoZSBzaGFmdCBwb2ludCB0byBvYmplY3RcbiAgICB9XG5cbiAgICBjb25zdCBsZW5ndGggPSB0YXJnZXQubGVuZ3RoKCk7XG4gICAgY29uc3QgZGlzdGFuY2UgPSB0aGlzLmluc2lkZSA/IHRoaXMucmFkaXVzIC0gb2JqZWN0UmFkaXVzIC0gbGVuZ3RoIDogbGVuZ3RoIC0gb2JqZWN0UmFkaXVzIC0gdGhpcy5yYWRpdXM7XG5cbiAgICBpZiAoZGlzdGFuY2UgPCAwKSB7XG4gICAgICB0YXJnZXQubXVsdGlwbHlTY2FsYXIoMSAvIGxlbmd0aCk7IC8vIGNvbnZlcnQgdGhlIGRlbHRhIHRvIHRoZSBkaXJlY3Rpb25cbiAgICAgIGlmICh0aGlzLmluc2lkZSkge1xuICAgICAgICB0YXJnZXQubmVnYXRlKCk7IC8vIGlmIGluc2lkZSwgcmV2ZXJzZSB0aGUgZGlyZWN0aW9uXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpc3RhbmNlO1xuICB9XG59XG4iLCAiaW1wb3J0IHR5cGUgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHNoYXBlIG9mIGEgY29sbGlkZXIuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZSB7XG4gIC8qKlxuICAgKiBUaGUgdHlwZSBvZiB0aGUgc2hhcGUuXG4gICAqL1xuICBwdWJsaWMgYWJzdHJhY3QgZ2V0IHR5cGUoKTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgb2Zmc2V0IHRvIHRoZSBzaGFwZS5cbiAgICovXG4gIHB1YmxpYyBvZmZzZXQ/OiBUSFJFRS5WZWN0b3IzO1xuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgYSBkaXN0YW5jZSBhbmQgYSBkaXJlY3Rpb24gZnJvbSB0aGUgY29sbGlkZXIgdG8gYSB0YXJnZXQgb2JqZWN0LlxuICAgKiBJdCdzIGhpdCBpZiB0aGUgZGlzdGFuY2UgaXMgbmVnYXRpdmUuXG4gICAqIFRoZSBkaXJlY3Rpb24gd2lsbCBiZSBjb250YWluZWQgaW4gdGhlIGdpdmVuIHRhcmdldCB2ZWN0b3IuXG4gICAqXG4gICAqIEBwYXJhbSBjb2xsaWRlck1hdHJpeCBBIG1hdHJpeCByZXByZXNlbnRzIHRoZSB0cmFuc2Zvcm0gb2YgdGhlIGNvbGxpZGVyXG4gICAqIEBwYXJhbSBvYmplY3RQb3NpdGlvbiBBIHZlY3RvciByZXByZXNlbnRzIHRoZSBwb3NpdGlvbiBvZiB0aGUgdGFyZ2V0IG9iamVjdFxuICAgKiBAcGFyYW0gb2JqZWN0UmFkaXVzIFRoZSByYWRpdXMgb2YgdGhlIG9iamVjdFxuICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSByZXN1bHQgZGlyZWN0aW9uIHdpbGwgYmUgY29udGFpbmVkIGluIHRoaXMgdmVjdG9yXG4gICAqL1xuICBwdWJsaWMgYWJzdHJhY3QgY2FsY3VsYXRlQ29sbGlzaW9uKFxuICAgIGNvbGxpZGVyTWF0cml4OiBUSFJFRS5NYXRyaXg0LFxuICAgIG9iamVjdFBvc2l0aW9uOiBUSFJFRS5WZWN0b3IzLFxuICAgIG9iamVjdFJhZGl1czogbnVtYmVyLFxuICAgIHRhcmdldDogVEhSRUUuVmVjdG9yMyxcbiAgKTogbnVtYmVyO1xufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZSc7XG5cbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX21hdDNBID0gbmV3IFRIUkVFLk1hdHJpeDMoKTtcblxuZXhwb3J0IGNsYXNzIFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlUGxhbmUgZXh0ZW5kcyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZSB7XG4gIHB1YmxpYyBnZXQgdHlwZSgpOiAncGxhbmUnIHtcbiAgICByZXR1cm4gJ3BsYW5lJztcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgb2Zmc2V0IG9mIHRoZSBwbGFuZSBmcm9tIHRoZSBvcmlnaW4gaW4gbG9jYWwgc3BhY2UuXG4gICAqL1xuICBwdWJsaWMgb2Zmc2V0OiBUSFJFRS5WZWN0b3IzO1xuXG4gIC8qKlxuICAgKiBUaGUgbm9ybWFsIG9mIHRoZSBwbGFuZSBpbiBsb2NhbCBzcGFjZS4gTXVzdCBiZSBub3JtYWxpemVkLlxuICAgKi9cbiAgcHVibGljIG5vcm1hbDogVEhSRUUuVmVjdG9yMztcblxuICBwdWJsaWMgY29uc3RydWN0b3IocGFyYW1zPzogeyBvZmZzZXQ/OiBUSFJFRS5WZWN0b3IzOyBub3JtYWw/OiBUSFJFRS5WZWN0b3IzIH0pIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5vZmZzZXQgPSBwYXJhbXM/Lm9mZnNldCA/PyBuZXcgVEhSRUUuVmVjdG9yMygwLjAsIDAuMCwgMC4wKTtcbiAgICB0aGlzLm5vcm1hbCA9IHBhcmFtcz8ubm9ybWFsID8/IG5ldyBUSFJFRS5WZWN0b3IzKDAuMCwgMC4wLCAxLjApO1xuICB9XG5cbiAgcHVibGljIGNhbGN1bGF0ZUNvbGxpc2lvbihcbiAgICBjb2xsaWRlck1hdHJpeDogVEhSRUUuTWF0cml4NCxcbiAgICBvYmplY3RQb3NpdGlvbjogVEhSRUUuVmVjdG9yMyxcbiAgICBvYmplY3RSYWRpdXM6IG51bWJlcixcbiAgICB0YXJnZXQ6IFRIUkVFLlZlY3RvcjMsXG4gICk6IG51bWJlciB7XG4gICAgdGFyZ2V0LnNldEZyb21NYXRyaXhQb3NpdGlvbihjb2xsaWRlck1hdHJpeCk7IC8vIHRyYW5zZm9ybWVkIG9mZnNldFxuICAgIHRhcmdldC5uZWdhdGUoKS5hZGQob2JqZWN0UG9zaXRpb24pOyAvLyBhIHZlY3RvciBmcm9tIGNvbGxpZGVyIGNlbnRlciB0byBvYmplY3QgcG9zaXRpb25cblxuICAgIF9tYXQzQS5nZXROb3JtYWxNYXRyaXgoY29sbGlkZXJNYXRyaXgpOyAvLyBjb252ZXJ0IHRoZSBjb2xsaWRlciBtYXRyaXggdG8gdGhlIG5vcm1hbCBtYXRyaXhcbiAgICBfdjNBLmNvcHkodGhpcy5ub3JtYWwpLmFwcGx5Tm9ybWFsTWF0cml4KF9tYXQzQSkubm9ybWFsaXplKCk7IC8vIHRyYW5zZm9ybWVkIG5vcm1hbFxuICAgIGNvbnN0IGRpc3RhbmNlID0gdGFyZ2V0LmRvdChfdjNBKSAtIG9iamVjdFJhZGl1cztcblxuICAgIHRhcmdldC5jb3B5KF92M0EpOyAvLyBjb252ZXJ0IHRoZSBkZWx0YSB0byB0aGUgZGlyZWN0aW9uXG5cbiAgICByZXR1cm4gZGlzdGFuY2U7XG4gIH1cbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZSB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGUnO1xuXG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuZXhwb3J0IGNsYXNzIFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlU3BoZXJlIGV4dGVuZHMgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGUge1xuICBwdWJsaWMgZ2V0IHR5cGUoKTogJ3NwaGVyZScge1xuICAgIHJldHVybiAnc3BoZXJlJztcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgb2Zmc2V0IG9mIHRoZSBzcGhlcmUgZnJvbSB0aGUgb3JpZ2luIGluIGxvY2FsIHNwYWNlLlxuICAgKi9cbiAgcHVibGljIG9mZnNldDogVEhSRUUuVmVjdG9yMztcblxuICAvKipcbiAgICogVGhlIHJhZGl1cy5cbiAgICovXG4gIHB1YmxpYyByYWRpdXM6IG51bWJlcjtcblxuICAvKipcbiAgICogSWYgdHJ1ZSwgdGhlIGNvbGxpZGVyIHByZXZlbnRzIHNwcmluZyBib25lcyBmcm9tIGdvaW5nIG91dHNpZGUgb2YgdGhlIHNwaGVyZSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIGluc2lkZTogYm9vbGVhbjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IocGFyYW1zPzogeyByYWRpdXM/OiBudW1iZXI7IG9mZnNldD86IFRIUkVFLlZlY3RvcjM7IGluc2lkZT86IGJvb2xlYW4gfSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLm9mZnNldCA9IHBhcmFtcz8ub2Zmc2V0ID8/IG5ldyBUSFJFRS5WZWN0b3IzKDAuMCwgMC4wLCAwLjApO1xuICAgIHRoaXMucmFkaXVzID0gcGFyYW1zPy5yYWRpdXMgPz8gMC4wO1xuICAgIHRoaXMuaW5zaWRlID0gcGFyYW1zPy5pbnNpZGUgPz8gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgY2FsY3VsYXRlQ29sbGlzaW9uKFxuICAgIGNvbGxpZGVyTWF0cml4OiBUSFJFRS5NYXRyaXg0LFxuICAgIG9iamVjdFBvc2l0aW9uOiBUSFJFRS5WZWN0b3IzLFxuICAgIG9iamVjdFJhZGl1czogbnVtYmVyLFxuICAgIHRhcmdldDogVEhSRUUuVmVjdG9yMyxcbiAgKTogbnVtYmVyIHtcbiAgICB0YXJnZXQuc3ViVmVjdG9ycyhvYmplY3RQb3NpdGlvbiwgX3YzQS5zZXRGcm9tTWF0cml4UG9zaXRpb24oY29sbGlkZXJNYXRyaXgpKTtcblxuICAgIGNvbnN0IGxlbmd0aCA9IHRhcmdldC5sZW5ndGgoKTtcbiAgICBjb25zdCBkaXN0YW5jZSA9IHRoaXMuaW5zaWRlID8gdGhpcy5yYWRpdXMgLSBvYmplY3RSYWRpdXMgLSBsZW5ndGggOiBsZW5ndGggLSBvYmplY3RSYWRpdXMgLSB0aGlzLnJhZGl1cztcblxuICAgIGlmIChkaXN0YW5jZSA8IDApIHtcbiAgICAgIHRhcmdldC5tdWx0aXBseVNjYWxhcigxIC8gbGVuZ3RoKTsgLy8gY29udmVydCB0aGUgZGVsdGEgdG8gdGhlIGRpcmVjdGlvblxuICAgICAgaWYgKHRoaXMuaW5zaWRlKSB7XG4gICAgICAgIHRhcmdldC5uZWdhdGUoKTsgLy8gaWYgaW5zaWRlLCByZXZlcnNlIHRoZSBkaXJlY3Rpb25cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGlzdGFuY2U7XG4gIH1cbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZUNhcHN1bGUgfSBmcm9tICcuLi8uLi9WUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZUNhcHN1bGUnO1xuaW1wb3J0IHsgQ29sbGlkZXJTaGFwZUJ1ZmZlckdlb21ldHJ5IH0gZnJvbSAnLi9Db2xsaWRlclNoYXBlQnVmZmVyR2VvbWV0cnknO1xuXG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuZXhwb3J0IGNsYXNzIENvbGxpZGVyU2hhcGVDYXBzdWxlQnVmZmVyR2VvbWV0cnkgZXh0ZW5kcyBUSFJFRS5CdWZmZXJHZW9tZXRyeSBpbXBsZW1lbnRzIENvbGxpZGVyU2hhcGVCdWZmZXJHZW9tZXRyeSB7XG4gIHB1YmxpYyB3b3JsZFNjYWxlID0gMS4wO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgX2F0dHJQb3M6IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZTtcbiAgcHJpdmF0ZSByZWFkb25seSBfYXR0ckluZGV4OiBUSFJFRS5CdWZmZXJBdHRyaWJ1dGU7XG4gIHByaXZhdGUgcmVhZG9ubHkgX3NoYXBlOiBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZUNhcHN1bGU7XG4gIHByaXZhdGUgX2N1cnJlbnRSYWRpdXMgPSAwO1xuICBwcml2YXRlIHJlYWRvbmx5IF9jdXJyZW50T2Zmc2V0ID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbiAgcHJpdmF0ZSByZWFkb25seSBfY3VycmVudFRhaWwgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihzaGFwZTogVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVDYXBzdWxlKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuX3NoYXBlID0gc2hhcGU7XG5cbiAgICB0aGlzLl9hdHRyUG9zID0gbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShuZXcgRmxvYXQzMkFycmF5KDM5NiksIDMpO1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKCdwb3NpdGlvbicsIHRoaXMuX2F0dHJQb3MpO1xuXG4gICAgdGhpcy5fYXR0ckluZGV4ID0gbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShuZXcgVWludDE2QXJyYXkoMjY0KSwgMSk7XG4gICAgdGhpcy5zZXRJbmRleCh0aGlzLl9hdHRySW5kZXgpO1xuXG4gICAgdGhpcy5fYnVpbGRJbmRleCgpO1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIGxldCBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IGZhbHNlO1xuXG4gICAgY29uc3QgcmFkaXVzID0gdGhpcy5fc2hhcGUucmFkaXVzIC8gdGhpcy53b3JsZFNjYWxlO1xuICAgIGlmICh0aGlzLl9jdXJyZW50UmFkaXVzICE9PSByYWRpdXMpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRSYWRpdXMgPSByYWRpdXM7XG4gICAgICBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9jdXJyZW50T2Zmc2V0LmVxdWFscyh0aGlzLl9zaGFwZS5vZmZzZXQpKSB7XG4gICAgICB0aGlzLl9jdXJyZW50T2Zmc2V0LmNvcHkodGhpcy5fc2hhcGUub2Zmc2V0KTtcbiAgICAgIHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBjb25zdCB0YWlsID0gX3YzQS5jb3B5KHRoaXMuX3NoYXBlLnRhaWwpLmRpdmlkZVNjYWxhcih0aGlzLndvcmxkU2NhbGUpO1xuICAgIGlmICh0aGlzLl9jdXJyZW50VGFpbC5kaXN0YW5jZVRvU3F1YXJlZCh0YWlsKSA+IDFlLTEwKSB7XG4gICAgICB0aGlzLl9jdXJyZW50VGFpbC5jb3B5KHRhaWwpO1xuICAgICAgc2hvdWxkVXBkYXRlR2VvbWV0cnkgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmIChzaG91bGRVcGRhdGVHZW9tZXRyeSkge1xuICAgICAgdGhpcy5fYnVpbGRQb3NpdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2J1aWxkUG9zaXRpb24oKTogdm9pZCB7XG4gICAgX3YzQS5jb3B5KHRoaXMuX2N1cnJlbnRUYWlsKS5zdWIodGhpcy5fY3VycmVudE9mZnNldCk7XG4gICAgY29uc3QgbCA9IF92M0EubGVuZ3RoKCkgLyB0aGlzLl9jdXJyZW50UmFkaXVzO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gMTY7IGkrKykge1xuICAgICAgY29uc3QgdCA9IChpIC8gMTYuMCkgKiBNYXRoLlBJO1xuXG4gICAgICB0aGlzLl9hdHRyUG9zLnNldFhZWihpLCAtTWF0aC5zaW4odCksIC1NYXRoLmNvcyh0KSwgMC4wKTtcbiAgICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKDE3ICsgaSwgbCArIE1hdGguc2luKHQpLCBNYXRoLmNvcyh0KSwgMC4wKTtcbiAgICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKDM0ICsgaSwgLU1hdGguc2luKHQpLCAwLjAsIC1NYXRoLmNvcyh0KSk7XG4gICAgICB0aGlzLl9hdHRyUG9zLnNldFhZWig1MSArIGksIGwgKyBNYXRoLnNpbih0KSwgMC4wLCBNYXRoLmNvcyh0KSk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzMjsgaSsrKSB7XG4gICAgICBjb25zdCB0ID0gKGkgLyAxNi4wKSAqIE1hdGguUEk7XG4gICAgICB0aGlzLl9hdHRyUG9zLnNldFhZWig2OCArIGksIDAuMCwgTWF0aC5zaW4odCksIE1hdGguY29zKHQpKTtcbiAgICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKDEwMCArIGksIGwsIE1hdGguc2luKHQpLCBNYXRoLmNvcyh0KSk7XG4gICAgfVxuXG4gICAgY29uc3QgdGhldGEgPSBNYXRoLmF0YW4yKF92M0EueSwgTWF0aC5zcXJ0KF92M0EueCAqIF92M0EueCArIF92M0EueiAqIF92M0EueikpO1xuICAgIGNvbnN0IHBoaSA9IC1NYXRoLmF0YW4yKF92M0EueiwgX3YzQS54KTtcblxuICAgIHRoaXMucm90YXRlWih0aGV0YSk7XG4gICAgdGhpcy5yb3RhdGVZKHBoaSk7XG4gICAgdGhpcy5zY2FsZSh0aGlzLl9jdXJyZW50UmFkaXVzLCB0aGlzLl9jdXJyZW50UmFkaXVzLCB0aGlzLl9jdXJyZW50UmFkaXVzKTtcbiAgICB0aGlzLnRyYW5zbGF0ZSh0aGlzLl9jdXJyZW50T2Zmc2V0LngsIHRoaXMuX2N1cnJlbnRPZmZzZXQueSwgdGhpcy5fY3VycmVudE9mZnNldC56KTtcblxuICAgIHRoaXMuX2F0dHJQb3MubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRJbmRleCgpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM0OyBpKyspIHtcbiAgICAgIGNvbnN0IGkxID0gKGkgKyAxKSAlIDM0O1xuXG4gICAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoaSAqIDIsIGksIGkxKTtcbiAgICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWSg2OCArIGkgKiAyLCAzNCArIGksIDM0ICsgaTEpO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzI7IGkrKykge1xuICAgICAgY29uc3QgaTEgPSAoaSArIDEpICUgMzI7XG5cbiAgICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWSgxMzYgKyBpICogMiwgNjggKyBpLCA2OCArIGkxKTtcbiAgICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWSgyMDAgKyBpICogMiwgMTAwICsgaSwgMTAwICsgaTEpO1xuICAgIH1cblxuICAgIHRoaXMuX2F0dHJJbmRleC5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZVBsYW5lIH0gZnJvbSAnLi4vLi4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVQbGFuZSc7XG5pbXBvcnQgeyBDb2xsaWRlclNoYXBlQnVmZmVyR2VvbWV0cnkgfSBmcm9tICcuL0NvbGxpZGVyU2hhcGVCdWZmZXJHZW9tZXRyeSc7XG5cbmV4cG9ydCBjbGFzcyBDb2xsaWRlclNoYXBlUGxhbmVCdWZmZXJHZW9tZXRyeSBleHRlbmRzIFRIUkVFLkJ1ZmZlckdlb21ldHJ5IGltcGxlbWVudHMgQ29sbGlkZXJTaGFwZUJ1ZmZlckdlb21ldHJ5IHtcbiAgcHVibGljIHdvcmxkU2NhbGUgPSAxLjA7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBfYXR0clBvczogVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xuICBwcml2YXRlIHJlYWRvbmx5IF9hdHRySW5kZXg6IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZTtcbiAgcHJpdmF0ZSByZWFkb25seSBfc2hhcGU6IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlUGxhbmU7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2N1cnJlbnRPZmZzZXQgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuICBwcml2YXRlIHJlYWRvbmx5IF9jdXJyZW50Tm9ybWFsID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuICBwdWJsaWMgY29uc3RydWN0b3Ioc2hhcGU6IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlUGxhbmUpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5fc2hhcGUgPSBzaGFwZTtcblxuICAgIHRoaXMuX2F0dHJQb3MgPSBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKG5ldyBGbG9hdDMyQXJyYXkoNiAqIDMpLCAzKTtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgncG9zaXRpb24nLCB0aGlzLl9hdHRyUG9zKTtcblxuICAgIHRoaXMuX2F0dHJJbmRleCA9IG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUobmV3IFVpbnQxNkFycmF5KDEwKSwgMSk7XG4gICAgdGhpcy5zZXRJbmRleCh0aGlzLl9hdHRySW5kZXgpO1xuXG4gICAgdGhpcy5fYnVpbGRJbmRleCgpO1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIGxldCBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IGZhbHNlO1xuXG4gICAgaWYgKCF0aGlzLl9jdXJyZW50T2Zmc2V0LmVxdWFscyh0aGlzLl9zaGFwZS5vZmZzZXQpKSB7XG4gICAgICB0aGlzLl9jdXJyZW50T2Zmc2V0LmNvcHkodGhpcy5fc2hhcGUub2Zmc2V0KTtcbiAgICAgIHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX2N1cnJlbnROb3JtYWwuZXF1YWxzKHRoaXMuX3NoYXBlLm5vcm1hbCkpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnROb3JtYWwuY29weSh0aGlzLl9zaGFwZS5ub3JtYWwpO1xuICAgICAgc2hvdWxkVXBkYXRlR2VvbWV0cnkgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmIChzaG91bGRVcGRhdGVHZW9tZXRyeSkge1xuICAgICAgdGhpcy5fYnVpbGRQb3NpdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2J1aWxkUG9zaXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5fYXR0clBvcy5zZXRYWVooMCwgLTAuNSwgLTAuNSwgMCk7XG4gICAgdGhpcy5fYXR0clBvcy5zZXRYWVooMSwgMC41LCAtMC41LCAwKTtcbiAgICB0aGlzLl9hdHRyUG9zLnNldFhZWigyLCAwLjUsIDAuNSwgMCk7XG4gICAgdGhpcy5fYXR0clBvcy5zZXRYWVooMywgLTAuNSwgMC41LCAwKTtcbiAgICB0aGlzLl9hdHRyUG9zLnNldFhZWig0LCAwLCAwLCAwKTtcbiAgICB0aGlzLl9hdHRyUG9zLnNldFhZWig1LCAwLCAwLCAwLjI1KTtcblxuICAgIHRoaXMudHJhbnNsYXRlKHRoaXMuX2N1cnJlbnRPZmZzZXQueCwgdGhpcy5fY3VycmVudE9mZnNldC55LCB0aGlzLl9jdXJyZW50T2Zmc2V0LnopO1xuICAgIHRoaXMubG9va0F0KHRoaXMuX2N1cnJlbnROb3JtYWwpO1xuXG4gICAgdGhpcy5fYXR0clBvcy5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIF9idWlsZEluZGV4KCk6IHZvaWQge1xuICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWSgwLCAwLCAxKTtcbiAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoMiwgMSwgMik7XG4gICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKDQsIDIsIDMpO1xuICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWSg2LCAzLCAwKTtcbiAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoOCwgNCwgNSk7XG5cbiAgICB0aGlzLl9hdHRySW5kZXgubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVTcGhlcmUgfSBmcm9tICcuLi8uLi9WUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZVNwaGVyZSc7XG5pbXBvcnQgeyBDb2xsaWRlclNoYXBlQnVmZmVyR2VvbWV0cnkgfSBmcm9tICcuL0NvbGxpZGVyU2hhcGVCdWZmZXJHZW9tZXRyeSc7XG5cbmV4cG9ydCBjbGFzcyBDb2xsaWRlclNoYXBlU3BoZXJlQnVmZmVyR2VvbWV0cnkgZXh0ZW5kcyBUSFJFRS5CdWZmZXJHZW9tZXRyeSBpbXBsZW1lbnRzIENvbGxpZGVyU2hhcGVCdWZmZXJHZW9tZXRyeSB7XG4gIHB1YmxpYyB3b3JsZFNjYWxlID0gMS4wO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgX2F0dHJQb3M6IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZTtcbiAgcHJpdmF0ZSByZWFkb25seSBfYXR0ckluZGV4OiBUSFJFRS5CdWZmZXJBdHRyaWJ1dGU7XG4gIHByaXZhdGUgcmVhZG9ubHkgX3NoYXBlOiBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZVNwaGVyZTtcbiAgcHJpdmF0ZSBfY3VycmVudFJhZGl1cyA9IDA7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2N1cnJlbnRPZmZzZXQgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihzaGFwZTogVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVTcGhlcmUpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5fc2hhcGUgPSBzaGFwZTtcblxuICAgIHRoaXMuX2F0dHJQb3MgPSBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKG5ldyBGbG9hdDMyQXJyYXkoMzIgKiAzICogMyksIDMpO1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKCdwb3NpdGlvbicsIHRoaXMuX2F0dHJQb3MpO1xuXG4gICAgdGhpcy5fYXR0ckluZGV4ID0gbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShuZXcgVWludDE2QXJyYXkoNjQgKiAzKSwgMSk7XG4gICAgdGhpcy5zZXRJbmRleCh0aGlzLl9hdHRySW5kZXgpO1xuXG4gICAgdGhpcy5fYnVpbGRJbmRleCgpO1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIGxldCBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IGZhbHNlO1xuXG4gICAgY29uc3QgcmFkaXVzID0gdGhpcy5fc2hhcGUucmFkaXVzIC8gdGhpcy53b3JsZFNjYWxlO1xuICAgIGlmICh0aGlzLl9jdXJyZW50UmFkaXVzICE9PSByYWRpdXMpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRSYWRpdXMgPSByYWRpdXM7XG4gICAgICBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9jdXJyZW50T2Zmc2V0LmVxdWFscyh0aGlzLl9zaGFwZS5vZmZzZXQpKSB7XG4gICAgICB0aGlzLl9jdXJyZW50T2Zmc2V0LmNvcHkodGhpcy5fc2hhcGUub2Zmc2V0KTtcbiAgICAgIHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoc2hvdWxkVXBkYXRlR2VvbWV0cnkpIHtcbiAgICAgIHRoaXMuX2J1aWxkUG9zaXRpb24oKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9idWlsZFBvc2l0aW9uKCk6IHZvaWQge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzI7IGkrKykge1xuICAgICAgY29uc3QgdCA9IChpIC8gMTYuMCkgKiBNYXRoLlBJO1xuXG4gICAgICB0aGlzLl9hdHRyUG9zLnNldFhZWihpLCBNYXRoLmNvcyh0KSwgTWF0aC5zaW4odCksIDAuMCk7XG4gICAgICB0aGlzLl9hdHRyUG9zLnNldFhZWigzMiArIGksIDAuMCwgTWF0aC5jb3ModCksIE1hdGguc2luKHQpKTtcbiAgICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKDY0ICsgaSwgTWF0aC5zaW4odCksIDAuMCwgTWF0aC5jb3ModCkpO1xuICAgIH1cblxuICAgIHRoaXMuc2NhbGUodGhpcy5fY3VycmVudFJhZGl1cywgdGhpcy5fY3VycmVudFJhZGl1cywgdGhpcy5fY3VycmVudFJhZGl1cyk7XG4gICAgdGhpcy50cmFuc2xhdGUodGhpcy5fY3VycmVudE9mZnNldC54LCB0aGlzLl9jdXJyZW50T2Zmc2V0LnksIHRoaXMuX2N1cnJlbnRPZmZzZXQueik7XG5cbiAgICB0aGlzLl9hdHRyUG9zLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX2J1aWxkSW5kZXgoKTogdm9pZCB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzMjsgaSsrKSB7XG4gICAgICBjb25zdCBpMSA9IChpICsgMSkgJSAzMjtcblxuICAgICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKGkgKiAyLCBpLCBpMSk7XG4gICAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoNjQgKyBpICogMiwgMzIgKyBpLCAzMiArIGkxKTtcbiAgICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWSgxMjggKyBpICogMiwgNjQgKyBpLCA2NCArIGkxKTtcbiAgICB9XG5cbiAgICB0aGlzLl9hdHRySW5kZXgubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUpvaW50IH0gZnJvbSAnLi4vVlJNU3ByaW5nQm9uZUpvaW50JztcbmltcG9ydCB7IFNwcmluZ0JvbmVCdWZmZXJHZW9tZXRyeSB9IGZyb20gJy4vdXRpbHMvU3ByaW5nQm9uZUJ1ZmZlckdlb21ldHJ5JztcblxuY29uc3QgX3YzQSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbmV4cG9ydCBjbGFzcyBWUk1TcHJpbmdCb25lSm9pbnRIZWxwZXIgZXh0ZW5kcyBUSFJFRS5Hcm91cCB7XG4gIHB1YmxpYyByZWFkb25seSBzcHJpbmdCb25lOiBWUk1TcHJpbmdCb25lSm9pbnQ7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2dlb21ldHJ5OiBTcHJpbmdCb25lQnVmZmVyR2VvbWV0cnk7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2xpbmU6IFRIUkVFLkxpbmVTZWdtZW50cztcblxuICBwdWJsaWMgY29uc3RydWN0b3Ioc3ByaW5nQm9uZTogVlJNU3ByaW5nQm9uZUpvaW50KSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLm1hdHJpeEF1dG9VcGRhdGUgPSBmYWxzZTtcblxuICAgIHRoaXMuc3ByaW5nQm9uZSA9IHNwcmluZ0JvbmU7XG5cbiAgICB0aGlzLl9nZW9tZXRyeSA9IG5ldyBTcHJpbmdCb25lQnVmZmVyR2VvbWV0cnkodGhpcy5zcHJpbmdCb25lKTtcblxuICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLkxpbmVCYXNpY01hdGVyaWFsKHtcbiAgICAgIGNvbG9yOiAweGZmZmYwMCxcbiAgICAgIGRlcHRoVGVzdDogZmFsc2UsXG4gICAgICBkZXB0aFdyaXRlOiBmYWxzZSxcbiAgICB9KTtcblxuICAgIHRoaXMuX2xpbmUgPSBuZXcgVEhSRUUuTGluZVNlZ21lbnRzKHRoaXMuX2dlb21ldHJ5LCBtYXRlcmlhbCk7XG4gICAgdGhpcy5hZGQodGhpcy5fbGluZSk7XG4gIH1cblxuICBwdWJsaWMgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9nZW9tZXRyeS5kaXNwb3NlKCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlTWF0cml4V29ybGQoZm9yY2U6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLnNwcmluZ0JvbmUuYm9uZS51cGRhdGVXb3JsZE1hdHJpeCh0cnVlLCBmYWxzZSk7XG5cbiAgICB0aGlzLm1hdHJpeC5jb3B5KHRoaXMuc3ByaW5nQm9uZS5ib25lLm1hdHJpeFdvcmxkKTtcblxuICAgIGNvbnN0IG1hdHJpeFdvcmxkRWxlbWVudHMgPSB0aGlzLm1hdHJpeC5lbGVtZW50cztcbiAgICB0aGlzLl9nZW9tZXRyeS53b3JsZFNjYWxlID0gX3YzQVxuICAgICAgLnNldChtYXRyaXhXb3JsZEVsZW1lbnRzWzBdLCBtYXRyaXhXb3JsZEVsZW1lbnRzWzFdLCBtYXRyaXhXb3JsZEVsZW1lbnRzWzJdKVxuICAgICAgLmxlbmd0aCgpOyAvLyBjYWxjdWxhdGUgc2NhbGUgb2YgeCBjb21wb25lbnRcblxuICAgIHRoaXMuX2dlb21ldHJ5LnVwZGF0ZSgpO1xuXG4gICAgc3VwZXIudXBkYXRlTWF0cml4V29ybGQoZm9yY2UpO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUpvaW50IH0gZnJvbSAnLi4vLi4vVlJNU3ByaW5nQm9uZUpvaW50JztcblxuZXhwb3J0IGNsYXNzIFNwcmluZ0JvbmVCdWZmZXJHZW9tZXRyeSBleHRlbmRzIFRIUkVFLkJ1ZmZlckdlb21ldHJ5IHtcbiAgcHVibGljIHdvcmxkU2NhbGUgPSAxLjA7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBfYXR0clBvczogVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xuICBwcml2YXRlIHJlYWRvbmx5IF9hdHRySW5kZXg6IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZTtcbiAgcHJpdmF0ZSByZWFkb25seSBfc3ByaW5nQm9uZTogVlJNU3ByaW5nQm9uZUpvaW50O1xuICBwcml2YXRlIF9jdXJyZW50UmFkaXVzID0gMDtcbiAgcHJpdmF0ZSByZWFkb25seSBfY3VycmVudFRhaWwgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihzcHJpbmdCb25lOiBWUk1TcHJpbmdCb25lSm9pbnQpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5fc3ByaW5nQm9uZSA9IHNwcmluZ0JvbmU7XG5cbiAgICB0aGlzLl9hdHRyUG9zID0gbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShuZXcgRmxvYXQzMkFycmF5KDI5NCksIDMpO1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKCdwb3NpdGlvbicsIHRoaXMuX2F0dHJQb3MpO1xuXG4gICAgdGhpcy5fYXR0ckluZGV4ID0gbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShuZXcgVWludDE2QXJyYXkoMTk0KSwgMSk7XG4gICAgdGhpcy5zZXRJbmRleCh0aGlzLl9hdHRySW5kZXgpO1xuXG4gICAgdGhpcy5fYnVpbGRJbmRleCgpO1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIGxldCBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IGZhbHNlO1xuXG4gICAgY29uc3QgcmFkaXVzID0gdGhpcy5fc3ByaW5nQm9uZS5zZXR0aW5ncy5oaXRSYWRpdXMgLyB0aGlzLndvcmxkU2NhbGU7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRSYWRpdXMgIT09IHJhZGl1cykge1xuICAgICAgdGhpcy5fY3VycmVudFJhZGl1cyA9IHJhZGl1cztcbiAgICAgIHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX2N1cnJlbnRUYWlsLmVxdWFscyh0aGlzLl9zcHJpbmdCb25lLmluaXRpYWxMb2NhbENoaWxkUG9zaXRpb24pKSB7XG4gICAgICB0aGlzLl9jdXJyZW50VGFpbC5jb3B5KHRoaXMuX3NwcmluZ0JvbmUuaW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbik7XG4gICAgICBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHNob3VsZFVwZGF0ZUdlb21ldHJ5KSB7XG4gICAgICB0aGlzLl9idWlsZFBvc2l0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRQb3NpdGlvbigpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDMyOyBpKyspIHtcbiAgICAgIGNvbnN0IHQgPSAoaSAvIDE2LjApICogTWF0aC5QSTtcblxuICAgICAgdGhpcy5fYXR0clBvcy5zZXRYWVooaSwgTWF0aC5jb3ModCksIE1hdGguc2luKHQpLCAwLjApO1xuICAgICAgdGhpcy5fYXR0clBvcy5zZXRYWVooMzIgKyBpLCAwLjAsIE1hdGguY29zKHQpLCBNYXRoLnNpbih0KSk7XG4gICAgICB0aGlzLl9hdHRyUG9zLnNldFhZWig2NCArIGksIE1hdGguc2luKHQpLCAwLjAsIE1hdGguY29zKHQpKTtcbiAgICB9XG5cbiAgICB0aGlzLnNjYWxlKHRoaXMuX2N1cnJlbnRSYWRpdXMsIHRoaXMuX2N1cnJlbnRSYWRpdXMsIHRoaXMuX2N1cnJlbnRSYWRpdXMpO1xuICAgIHRoaXMudHJhbnNsYXRlKHRoaXMuX2N1cnJlbnRUYWlsLngsIHRoaXMuX2N1cnJlbnRUYWlsLnksIHRoaXMuX2N1cnJlbnRUYWlsLnopO1xuXG4gICAgdGhpcy5fYXR0clBvcy5zZXRYWVooOTYsIDAsIDAsIDApO1xuICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKDk3LCB0aGlzLl9jdXJyZW50VGFpbC54LCB0aGlzLl9jdXJyZW50VGFpbC55LCB0aGlzLl9jdXJyZW50VGFpbC56KTtcblxuICAgIHRoaXMuX2F0dHJQb3MubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRJbmRleCgpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDMyOyBpKyspIHtcbiAgICAgIGNvbnN0IGkxID0gKGkgKyAxKSAlIDMyO1xuXG4gICAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoaSAqIDIsIGksIGkxKTtcbiAgICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWSg2NCArIGkgKiAyLCAzMiArIGksIDMyICsgaTEpO1xuICAgICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKDEyOCArIGkgKiAyLCA2NCArIGksIDY0ICsgaTEpO1xuICAgIH1cbiAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoMTkyLCA5NiwgOTcpO1xuXG4gICAgdGhpcy5fYXR0ckluZGV4Lm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB0eXBlIHsgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGUgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgY29sbGlkZXIgb2YgYSBzcHJpbmcgYm9uZS5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTVNwcmluZ0JvbmVDb2xsaWRlciBleHRlbmRzIFRIUkVFLk9iamVjdDNEIHtcbiAgLyoqXG4gICAqIFRoZSBzaGFwZSBvZiB0aGUgY29sbGlkZXIuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgc2hhcGU6IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlO1xuXG4gIC8qKlxuICAgKiBXb3JsZCBzcGFjZSBtYXRyaXggZm9yIHRoZSBjb2xsaWRlciBzaGFwZSB1c2VkIGluIGNvbGxpc2lvbiBjYWxjdWxhdGlvbnMuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgY29sbGlkZXJNYXRyaXggPSBuZXcgVEhSRUUuTWF0cml4NCgpO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihzaGFwZTogVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGUpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5zaGFwZSA9IHNoYXBlO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZVdvcmxkTWF0cml4KHVwZGF0ZVBhcmVudHM6IGJvb2xlYW4sIHVwZGF0ZUNoaWxkcmVuOiBib29sZWFuKTogdm9pZCB7XG4gICAgc3VwZXIudXBkYXRlV29ybGRNYXRyaXgodXBkYXRlUGFyZW50cywgdXBkYXRlQ2hpbGRyZW4pO1xuXG4gICAgdXBkYXRlQ29sbGlkZXJNYXRyaXgodGhpcy5jb2xsaWRlck1hdHJpeCwgdGhpcy5tYXRyaXhXb3JsZCwgdGhpcy5zaGFwZS5vZmZzZXQpO1xuICB9XG59XG5cbi8qKlxuICogQ29tcHV0ZXMgdGhlIGNvbGxpZGVyTWF0cml4IGJhc2VkIG9uIGFuIG9mZnNldCBhbmQgYSB3b3JsZCBtYXRyaXguXG4gKiBFcXVpdmFsZW50IHRvIHRoZSBmb2xsb3dpbmcgY29kZSB3aGVuIG1hdHJpeFdvcmxkIGlzIGFuIGFmZmluZSBtYXRyaXg6XG4gKiBgYGBqc1xuICogb3V0Lm1ha2VUcmFuc2xhdGlvbihvZmZzZXQpLnByZW11bHRpcGx5KG1hdHJpeFdvcmxkKVxuICogYGBgXG4gKlxuICogQHBhcmFtIGNvbGxpZGVyTWF0cml4IFRoZSB0YXJnZXQgbWF0cml4IHRvIHN0b3JlIHRoZSByZXN1bHQgaW4uXG4gKiBAcGFyYW0gbWF0cml4V29ybGQgVGhlIHdvcmxkIG1hdHJpeCBmbyB0aGUgY29sbGlkZXIgb2JqZWN0LlxuICogQHBhcmFtIG9mZnNldCBPcHRpb25hbCBvZmZzZXQgdG8gdGhlIGNvbGxpZGVyIHNoYXBlLlxuICovXG5mdW5jdGlvbiB1cGRhdGVDb2xsaWRlck1hdHJpeChjb2xsaWRlck1hdHJpeDogVEhSRUUuTWF0cml4NCwgbWF0cml4V29ybGQ6IFRIUkVFLk1hdHJpeDQsIG9mZnNldD86IFRIUkVFLlZlY3RvcjMpIHtcbiAgY29uc3QgbWUgPSBtYXRyaXhXb3JsZC5lbGVtZW50cztcblxuICBjb2xsaWRlck1hdHJpeC5jb3B5KG1hdHJpeFdvcmxkKTtcblxuICBpZiAob2Zmc2V0KSB7XG4gICAgY29sbGlkZXJNYXRyaXguZWxlbWVudHNbMTJdID0gbWVbMF0gKiBvZmZzZXQueCArIG1lWzRdICogb2Zmc2V0LnkgKyBtZVs4XSAqIG9mZnNldC56ICsgbWVbMTJdO1xuICAgIGNvbGxpZGVyTWF0cml4LmVsZW1lbnRzWzEzXSA9IG1lWzFdICogb2Zmc2V0LnggKyBtZVs1XSAqIG9mZnNldC55ICsgbWVbOV0gKiBvZmZzZXQueiArIG1lWzEzXTtcbiAgICBjb2xsaWRlck1hdHJpeC5lbGVtZW50c1sxNF0gPSBtZVsyXSAqIG9mZnNldC54ICsgbWVbNl0gKiBvZmZzZXQueSArIG1lWzEwXSAqIG9mZnNldC56ICsgbWVbMTRdO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgTWF0cml4NEludmVyc2VDYWNoZSB9IGZyb20gJy4vdXRpbHMvTWF0cml4NEludmVyc2VDYWNoZSc7XG5pbXBvcnQgdHlwZSB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cCc7XG5pbXBvcnQgdHlwZSB7IFZSTVNwcmluZ0JvbmVKb2ludFNldHRpbmdzIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lSm9pbnRTZXR0aW5ncyc7XG5pbXBvcnQgdHlwZSB7IFZSTVNwcmluZ0JvbmVNYW5hZ2VyIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lTWFuYWdlcic7XG5cbi8vIGJhc2VkIG9uXG4vLyBodHRwOi8vcm9ja2V0anVtcC5za3IuanAvdW5pdHkzZC8xMDkvXG4vLyBodHRwczovL2dpdGh1Yi5jb20vZHdhbmdvL1VuaVZSTS9ibG9iL21hc3Rlci9TY3JpcHRzL1NwcmluZ0JvbmUvVlJNU3ByaW5nQm9uZS5jc1xuXG5jb25zdCBJREVOVElUWV9NQVRSSVg0ID0gbmV3IFRIUkVFLk1hdHJpeDQoKTtcblxuLy8gXHU4QTA4XHU3Qjk3XHU0RTJEXHUzMDZFXHU0RTAwXHU2NjQyXHU0RkREXHU1QjU4XHU3NTI4XHU1OTA5XHU2NTcwXHVGRjA4XHU0RTAwXHU1RUE2XHUzMEE0XHUzMEYzXHUzMEI5XHUzMEJGXHUzMEYzXHUzMEI5XHUzMDkyXHU0RjVDXHUzMDYzXHUzMDVGXHUzMDg5XHUzMDQyXHUzMDY4XHUzMDZGXHU0RjdGXHUzMDQ0XHU1NkRFXHUzMDU5XHVGRjA5XG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF92M0IgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4vKipcbiAqIEEgdGVtcG9yYXJ5IHZhcmlhYmxlIHdoaWNoIGlzIHVzZWQgaW4gYHVwZGF0ZWBcbiAqL1xuY29uc3QgX3dvcmxkU3BhY2VQb3NpdGlvbiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbi8qKlxuICogQSB0ZW1wb3JhcnkgdmFyaWFibGUgd2hpY2ggaXMgdXNlZCBpbiBgdXBkYXRlYFxuICovXG5jb25zdCBfbmV4dFRhaWwgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5jb25zdCBfbWF0QSA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG5cbi8qKlxuICogQSBjbGFzcyByZXByZXNlbnRzIGEgc2luZ2xlIGpvaW50IG9mIGEgc3ByaW5nIGJvbmUuXG4gKiBJdCBzaG91bGQgYmUgbWFuYWdlZCBieSBhIHtAbGluayBWUk1TcHJpbmdCb25lTWFuYWdlcn0uXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1TcHJpbmdCb25lSm9pbnQge1xuICAvKipcbiAgICogU2V0dGluZ3Mgb2YgdGhlIGJvbmUuXG4gICAqL1xuICBwdWJsaWMgc2V0dGluZ3M6IFZSTVNwcmluZ0JvbmVKb2ludFNldHRpbmdzO1xuXG4gIC8qKlxuICAgKiBDb2xsaWRlciBncm91cHMgYXR0YWNoZWQgdG8gdGhpcyBib25lLlxuICAgKi9cbiAgcHVibGljIGNvbGxpZGVyR3JvdXBzOiBWUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cFtdO1xuXG4gIC8qKlxuICAgKiBBbiBPYmplY3QzRCBhdHRhY2hlZCB0byB0aGlzIGJvbmUuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgYm9uZTogVEhSRUUuT2JqZWN0M0Q7XG5cbiAgLyoqXG4gICAqIEFuIE9iamVjdDNEIHRoYXQgd2lsbCBiZSB1c2VkIGFzIGEgdGFpbCBvZiB0aGlzIHNwcmluZyBib25lLlxuICAgKiBJdCBjYW4gYmUgbnVsbCB3aGVuIHRoZSBzcHJpbmcgYm9uZSBpcyBpbXBvcnRlZCBmcm9tIFZSTSAwLjAuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgY2hpbGQ6IFRIUkVFLk9iamVjdDNEIHwgbnVsbDtcblxuICAvKipcbiAgICogQ3VycmVudCBwb3NpdGlvbiBvZiBjaGlsZCB0YWlsLCBpbiBjZW50ZXIgdW5pdC4gV2lsbCBiZSB1c2VkIGZvciB2ZXJsZXQgaW50ZWdyYXRpb24uXG4gICAqL1xuICBwcml2YXRlIF9jdXJyZW50VGFpbCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbiAgLyoqXG4gICAqIFByZXZpb3VzIHBvc2l0aW9uIG9mIGNoaWxkIHRhaWwsIGluIGNlbnRlciB1bml0LiBXaWxsIGJlIHVzZWQgZm9yIHZlcmxldCBpbnRlZ3JhdGlvbi5cbiAgICovXG4gIHByaXZhdGUgX3ByZXZUYWlsID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuICAvKipcbiAgICogSW5pdGlhbCBheGlzIG9mIHRoZSBib25lLCBpbiBsb2NhbCB1bml0LlxuICAgKi9cbiAgcHJpdmF0ZSBfYm9uZUF4aXMgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4gIC8qKlxuICAgKiBMZW5ndGggb2YgdGhlIGJvbmUgaW4gd29ybGQgdW5pdC5cbiAgICogV2lsbCBiZSB1c2VkIGZvciBub3JtYWxpemF0aW9uIGluIHVwZGF0ZSBsb29wLCB3aWxsIGJlIHVwZGF0ZWQgYnkge0BsaW5rIF9jYWxjV29ybGRTcGFjZUJvbmVMZW5ndGh9LlxuICAgKlxuICAgKiBJdCdzIHNhbWUgYXMgbG9jYWwgdW5pdCBsZW5ndGggdW5sZXNzIHRoZXJlIGFyZSBzY2FsZSB0cmFuc2Zvcm1hdGlvbnMgaW4gdGhlIHdvcmxkIHNwYWNlLlxuICAgKi9cbiAgcHJpdmF0ZSBfd29ybGRTcGFjZUJvbmVMZW5ndGggPSAwLjA7XG5cbiAgLyoqXG4gICAqIFNldCBvZiBkZXBlbmRlbmNpZXMgdGhhdCBuZWVkIHRvIGJlIHVwZGF0ZWQgYmVmb3JlIHRoaXMgam9pbnQuXG4gICAqL1xuICBwdWJsaWMgZ2V0IGRlcGVuZGVuY2llcygpOiBTZXQ8VEhSRUUuT2JqZWN0M0Q+IHtcbiAgICBjb25zdCBzZXQgPSBuZXcgU2V0PFRIUkVFLk9iamVjdDNEPigpO1xuXG4gICAgY29uc3QgcGFyZW50ID0gdGhpcy5ib25lLnBhcmVudDtcbiAgICBpZiAocGFyZW50KSB7XG4gICAgICBzZXQuYWRkKHBhcmVudCk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgY2cgPSAwOyBjZyA8IHRoaXMuY29sbGlkZXJHcm91cHMubGVuZ3RoOyBjZysrKSB7XG4gICAgICBmb3IgKGxldCBjID0gMDsgYyA8IHRoaXMuY29sbGlkZXJHcm91cHNbY2ddLmNvbGxpZGVycy5sZW5ndGg7IGMrKykge1xuICAgICAgICBzZXQuYWRkKHRoaXMuY29sbGlkZXJHcm91cHNbY2ddLmNvbGxpZGVyc1tjXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNldDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIHNwcmluZ2JvbmUgd2lsbCBiZSBjYWxjdWxhdGVkIGJhc2VkIG9uIHRoZSBzcGFjZSByZWxhdGl2ZSBmcm9tIHRoaXMgb2JqZWN0LlxuICAgKiBJZiB0aGlzIGlzIGBudWxsYCwgc3ByaW5nYm9uZSB3aWxsIGJlIGNhbGN1bGF0ZWQgaW4gd29ybGQgc3BhY2UuXG4gICAqL1xuICBwcml2YXRlIF9jZW50ZXI6IFRIUkVFLk9iamVjdDNEIHwgbnVsbCA9IG51bGw7XG4gIHB1YmxpYyBnZXQgY2VudGVyKCk6IFRIUkVFLk9iamVjdDNEIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX2NlbnRlcjtcbiAgfVxuICBwdWJsaWMgc2V0IGNlbnRlcihjZW50ZXI6IFRIUkVFLk9iamVjdDNEIHwgbnVsbCkge1xuICAgIC8vIHVuaW5zdGFsbCBpbnZlcnNlIGNhY2hlXG4gICAgaWYgKHRoaXMuX2NlbnRlcj8udXNlckRhdGEuaW52ZXJzZUNhY2hlUHJveHkpIHtcbiAgICAgICh0aGlzLl9jZW50ZXIudXNlckRhdGEuaW52ZXJzZUNhY2hlUHJveHkgYXMgTWF0cml4NEludmVyc2VDYWNoZSkucmV2ZXJ0KCk7XG4gICAgICBkZWxldGUgdGhpcy5fY2VudGVyLnVzZXJEYXRhLmludmVyc2VDYWNoZVByb3h5O1xuICAgIH1cblxuICAgIC8vIGNoYW5nZSB0aGUgY2VudGVyXG4gICAgdGhpcy5fY2VudGVyID0gY2VudGVyO1xuXG4gICAgLy8gaW5zdGFsbCBpbnZlcnNlIGNhY2hlXG4gICAgaWYgKHRoaXMuX2NlbnRlcikge1xuICAgICAgaWYgKCF0aGlzLl9jZW50ZXIudXNlckRhdGEuaW52ZXJzZUNhY2hlUHJveHkpIHtcbiAgICAgICAgdGhpcy5fY2VudGVyLnVzZXJEYXRhLmludmVyc2VDYWNoZVByb3h5ID0gbmV3IE1hdHJpeDRJbnZlcnNlQ2FjaGUodGhpcy5fY2VudGVyLm1hdHJpeFdvcmxkKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbCBzdGF0ZSBvZiB0aGUgbG9jYWwgbWF0cml4IG9mIHRoZSBib25lLlxuICAgKi9cbiAgcHJpdmF0ZSBfaW5pdGlhbExvY2FsTWF0cml4ID0gbmV3IFRIUkVFLk1hdHJpeDQoKTtcblxuICAvKipcbiAgICogSW5pdGlhbCBzdGF0ZSBvZiB0aGUgcm90YXRpb24gb2YgdGhlIGJvbmUuXG4gICAqL1xuICBwcml2YXRlIF9pbml0aWFsTG9jYWxSb3RhdGlvbiA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5cbiAgLyoqXG4gICAqIEluaXRpYWwgc3RhdGUgb2YgdGhlIHBvc2l0aW9uIG9mIGl0cyBjaGlsZC5cbiAgICovXG4gIHByaXZhdGUgX2luaXRpYWxMb2NhbENoaWxkUG9zaXRpb24gPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuICBwdWJsaWMgZ2V0IGluaXRpYWxMb2NhbENoaWxkUG9zaXRpb24oKTogVEhSRUUuVmVjdG9yMyB7XG4gICAgcmV0dXJuIHRoaXMuX2luaXRpYWxMb2NhbENoaWxkUG9zaXRpb247XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgd29ybGQgbWF0cml4IG9mIGl0cyBwYXJlbnQgb2JqZWN0LlxuICAgKiBOb3RlIHRoYXQgaXQgcmV0dXJucyBhIHJlZmVyZW5jZSB0byB0aGUgbWF0cml4LiBEb24ndCBtdXRhdGUgdGhpcyBkaXJlY3RseSFcbiAgICovXG4gIHByaXZhdGUgZ2V0IF9wYXJlbnRNYXRyaXhXb3JsZCgpOiBUSFJFRS5NYXRyaXg0IHtcbiAgICByZXR1cm4gdGhpcy5ib25lLnBhcmVudCA/IHRoaXMuYm9uZS5wYXJlbnQubWF0cml4V29ybGQgOiBJREVOVElUWV9NQVRSSVg0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBWUk1TcHJpbmdCb25lLlxuICAgKlxuICAgKiBAcGFyYW0gYm9uZSBBbiBPYmplY3QzRCB0aGF0IHdpbGwgYmUgYXR0YWNoZWQgdG8gdGhpcyBib25lXG4gICAqIEBwYXJhbSBjaGlsZCBBbiBPYmplY3QzRCB0aGF0IHdpbGwgYmUgdXNlZCBhcyBhIHRhaWwgb2YgdGhpcyBzcHJpbmcgYm9uZS4gSXQgY2FuIGJlIG51bGwgd2hlbiB0aGUgc3ByaW5nIGJvbmUgaXMgaW1wb3J0ZWQgZnJvbSBWUk0gMC4wXG4gICAqIEBwYXJhbSBzZXR0aW5ncyBTZXZlcmFsIHBhcmFtZXRlcnMgcmVsYXRlZCB0byBiZWhhdmlvciBvZiB0aGUgc3ByaW5nIGJvbmVcbiAgICogQHBhcmFtIGNvbGxpZGVyR3JvdXBzIENvbGxpZGVyIGdyb3VwcyB0aGF0IHdpbGwgYmUgY29sbGlkZWQgd2l0aCB0aGlzIHNwcmluZyBib25lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBib25lOiBUSFJFRS5PYmplY3QzRCxcbiAgICBjaGlsZDogVEhSRUUuT2JqZWN0M0QgfCBudWxsLFxuICAgIHNldHRpbmdzOiBQYXJ0aWFsPFZSTVNwcmluZ0JvbmVKb2ludFNldHRpbmdzPiA9IHt9LFxuICAgIGNvbGxpZGVyR3JvdXBzOiBWUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cFtdID0gW10sXG4gICkge1xuICAgIHRoaXMuYm9uZSA9IGJvbmU7IC8vIHVuaVZSTVx1MzA2N1x1MzA2RSBwYXJlbnRcbiAgICB0aGlzLmJvbmUubWF0cml4QXV0b1VwZGF0ZSA9IGZhbHNlOyAvLyB1cGRhdGVcdTMwNkJcdTMwODhcdTMwOEFcdThBMDhcdTdCOTdcdTMwNTVcdTMwOENcdTMwOEJcdTMwNkVcdTMwNjd0aHJlZS5qc1x1NTE4NVx1MzA2N1x1MzA2RVx1ODFFQVx1NTJENVx1NTFFNlx1NzQwNlx1MzA2Rlx1NEUwRFx1ODk4MVxuXG4gICAgdGhpcy5jaGlsZCA9IGNoaWxkO1xuXG4gICAgdGhpcy5zZXR0aW5ncyA9IHtcbiAgICAgIGhpdFJhZGl1czogc2V0dGluZ3MuaGl0UmFkaXVzID8/IDAuMCxcbiAgICAgIHN0aWZmbmVzczogc2V0dGluZ3Muc3RpZmZuZXNzID8/IDEuMCxcbiAgICAgIGdyYXZpdHlQb3dlcjogc2V0dGluZ3MuZ3Jhdml0eVBvd2VyID8/IDAuMCxcbiAgICAgIGdyYXZpdHlEaXI6IHNldHRpbmdzLmdyYXZpdHlEaXI/LmNsb25lKCkgPz8gbmV3IFRIUkVFLlZlY3RvcjMoMC4wLCAtMS4wLCAwLjApLFxuICAgICAgZHJhZ0ZvcmNlOiBzZXR0aW5ncy5kcmFnRm9yY2UgPz8gMC40LFxuICAgIH07XG5cbiAgICB0aGlzLmNvbGxpZGVyR3JvdXBzID0gY29sbGlkZXJHcm91cHM7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBpbml0aWFsIHN0YXRlIG9mIHRoaXMgc3ByaW5nIGJvbmUuXG4gICAqIFlvdSBtaWdodCB3YW50IHRvIGNhbGwge0BsaW5rIFZSTVNwcmluZ0JvbmVNYW5hZ2VyLnNldEluaXRTdGF0ZX0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBzZXRJbml0U3RhdGUoKTogdm9pZCB7XG4gICAgLy8gcmVtZW1iZXIgaW5pdGlhbCBwb3NpdGlvbiBvZiBpdHNlbGZcbiAgICB0aGlzLl9pbml0aWFsTG9jYWxNYXRyaXguY29weSh0aGlzLmJvbmUubWF0cml4KTtcbiAgICB0aGlzLl9pbml0aWFsTG9jYWxSb3RhdGlvbi5jb3B5KHRoaXMuYm9uZS5xdWF0ZXJuaW9uKTtcblxuICAgIC8vIHNlZSBpbml0aWFsIHBvc2l0aW9uIG9mIGl0cyBsb2NhbCBjaGlsZFxuICAgIGlmICh0aGlzLmNoaWxkKSB7XG4gICAgICB0aGlzLl9pbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uLmNvcHkodGhpcy5jaGlsZC5wb3NpdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHZybTAgcmVxdWlyZXMgYSA3Y20gZml4ZWQgYm9uZSBsZW5ndGggZm9yIHRoZSBmaW5hbCBub2RlIGluIGEgY2hhaW5cbiAgICAgIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL3ZybS1jL3ZybS1zcGVjaWZpY2F0aW9uL3RyZWUvbWFzdGVyL3NwZWNpZmljYXRpb24vVlJNQ19zcHJpbmdCb25lLTEuMCNhYm91dC1zcHJpbmctY29uZmlndXJhdGlvblxuICAgICAgdGhpcy5faW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbi5jb3B5KHRoaXMuYm9uZS5wb3NpdGlvbikubm9ybWFsaXplKCkubXVsdGlwbHlTY2FsYXIoMC4wNyk7XG4gICAgfVxuXG4gICAgLy8gY29weSB0aGUgY2hpbGQgcG9zaXRpb24gdG8gdGFpbHNcbiAgICBjb25zdCBtYXRyaXhXb3JsZFRvQ2VudGVyID0gdGhpcy5fZ2V0TWF0cml4V29ybGRUb0NlbnRlcigpO1xuICAgIHRoaXMuYm9uZS5sb2NhbFRvV29ybGQodGhpcy5fY3VycmVudFRhaWwuY29weSh0aGlzLl9pbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uKSkuYXBwbHlNYXRyaXg0KG1hdHJpeFdvcmxkVG9DZW50ZXIpO1xuICAgIHRoaXMuX3ByZXZUYWlsLmNvcHkodGhpcy5fY3VycmVudFRhaWwpO1xuXG4gICAgLy8gc2V0IGluaXRpYWwgc3RhdGVzIHRoYXQgYXJlIHJlbGF0ZWQgdG8gbG9jYWwgY2hpbGQgcG9zaXRpb25cbiAgICB0aGlzLl9ib25lQXhpcy5jb3B5KHRoaXMuX2luaXRpYWxMb2NhbENoaWxkUG9zaXRpb24pLm5vcm1hbGl6ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoZSBzdGF0ZSBvZiB0aGlzIGJvbmUuXG4gICAqIFlvdSBtaWdodCB3YW50IHRvIGNhbGwge0BsaW5rIFZSTVNwcmluZ0JvbmVNYW5hZ2VyLnJlc2V0fSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMuYm9uZS5xdWF0ZXJuaW9uLmNvcHkodGhpcy5faW5pdGlhbExvY2FsUm90YXRpb24pO1xuXG4gICAgLy8gV2UgbmVlZCB0byB1cGRhdGUgaXRzIG1hdHJpeFdvcmxkIG1hbnVhbGx5LCBzaW5jZSB3ZSB0d2Vha2VkIHRoZSBib25lIGJ5IG91ciBoYW5kXG4gICAgdGhpcy5ib25lLnVwZGF0ZU1hdHJpeCgpO1xuICAgIHRoaXMuYm9uZS5tYXRyaXhXb3JsZC5tdWx0aXBseU1hdHJpY2VzKHRoaXMuX3BhcmVudE1hdHJpeFdvcmxkLCB0aGlzLmJvbmUubWF0cml4KTtcblxuICAgIC8vIEFwcGx5IHVwZGF0ZWQgcG9zaXRpb24gdG8gdGFpbCBzdGF0ZXNcbiAgICBjb25zdCBtYXRyaXhXb3JsZFRvQ2VudGVyID0gdGhpcy5fZ2V0TWF0cml4V29ybGRUb0NlbnRlcigpO1xuICAgIHRoaXMuYm9uZS5sb2NhbFRvV29ybGQodGhpcy5fY3VycmVudFRhaWwuY29weSh0aGlzLl9pbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uKSkuYXBwbHlNYXRyaXg0KG1hdHJpeFdvcmxkVG9DZW50ZXIpO1xuICAgIHRoaXMuX3ByZXZUYWlsLmNvcHkodGhpcy5fY3VycmVudFRhaWwpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgc3RhdGUgb2YgdGhpcyBib25lLlxuICAgKiBZb3UgbWlnaHQgd2FudCB0byBjYWxsIHtAbGluayBWUk1TcHJpbmdCb25lTWFuYWdlci51cGRhdGV9IGluc3RlYWQuXG4gICAqXG4gICAqIEBwYXJhbSBkZWx0YSBkZWx0YVRpbWVcbiAgICovXG4gIHB1YmxpYyB1cGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChkZWx0YSA8PSAwKSByZXR1cm47XG5cbiAgICAvLyBVcGRhdGUgdGhlIF93b3JsZFNwYWNlQm9uZUxlbmd0aFxuICAgIHRoaXMuX2NhbGNXb3JsZFNwYWNlQm9uZUxlbmd0aCgpO1xuXG4gICAgLy8gR2V0IGJvbmVBeGlzIGluIHdvcmxkIHNwYWNlXG4gICAgY29uc3Qgd29ybGRTcGFjZUJvbmVBeGlzID0gX3YzQlxuICAgICAgLmNvcHkodGhpcy5fYm9uZUF4aXMpXG4gICAgICAudHJhbnNmb3JtRGlyZWN0aW9uKHRoaXMuX2luaXRpYWxMb2NhbE1hdHJpeClcbiAgICAgIC50cmFuc2Zvcm1EaXJlY3Rpb24odGhpcy5fcGFyZW50TWF0cml4V29ybGQpO1xuXG4gICAgLy8gdmVybGV0XHU3QTREXHU1MjA2XHUzMDY3XHU2QjIxXHUzMDZFXHU0RjREXHU3RjZFXHUzMDkyXHU4QTA4XHU3Qjk3XG4gICAgX25leHRUYWlsXG4gICAgICAvLyBEZXRlcm1pbmUgaW5lcnRpYSBpbiBjZW50ZXIgc3BhY2VcbiAgICAgIC5jb3B5KHRoaXMuX2N1cnJlbnRUYWlsKVxuICAgICAgLmFkZChfdjNBLnN1YlZlY3RvcnModGhpcy5fY3VycmVudFRhaWwsIHRoaXMuX3ByZXZUYWlsKS5tdWx0aXBseVNjYWxhcigxIC0gdGhpcy5zZXR0aW5ncy5kcmFnRm9yY2UpKSAvLyBcdTUyNERcdTMwRDVcdTMwRUNcdTMwRkNcdTMwRTBcdTMwNkVcdTc5RkJcdTUyRDVcdTMwOTJcdTdEOTlcdTdEOUFcdTMwNTlcdTMwOEIoXHU2RTFCXHU4ODcwXHUzMDgyXHUzMDQyXHUzMDhCXHUzMDg4KVxuICAgICAgLy8gQ29udmVydCBjZW50ZXIgc3BhY2UgdG8gd29ybGQgc3BhY2VcbiAgICAgIC5hcHBseU1hdHJpeDQodGhpcy5fZ2V0TWF0cml4Q2VudGVyVG9Xb3JsZCgpKSAvLyB0YWlsXHUzMDkyd29ybGQgc3BhY2VcdTMwNkJcdTYyM0JcdTMwNTlcbiAgICAgIC8vIEFwcGx5IHN0aWZmbmVzcyBhbmQgZ3Jhdml0eSBpbiB3b3JsZCBzcGFjZVxuICAgICAgLmFkZFNjYWxlZFZlY3Rvcih3b3JsZFNwYWNlQm9uZUF4aXMsIHRoaXMuc2V0dGluZ3Muc3RpZmZuZXNzICogZGVsdGEpIC8vIFx1ODlBQVx1MzA2RVx1NTZERVx1OEVFMlx1MzA2Qlx1MzA4OFx1MzA4Qlx1NUI1MFx1MzBEQ1x1MzBGQ1x1MzBGM1x1MzA2RVx1NzlGQlx1NTJENVx1NzZFRVx1NkExOVxuICAgICAgLmFkZFNjYWxlZFZlY3Rvcih0aGlzLnNldHRpbmdzLmdyYXZpdHlEaXIsIHRoaXMuc2V0dGluZ3MuZ3Jhdml0eVBvd2VyICogZGVsdGEpOyAvLyBcdTU5MTZcdTUyOUJcdTMwNkJcdTMwODhcdTMwOEJcdTc5RkJcdTUyRDVcdTkxQ0ZcblxuICAgIC8vIG5vcm1hbGl6ZSBib25lIGxlbmd0aFxuICAgIF93b3JsZFNwYWNlUG9zaXRpb24uc2V0RnJvbU1hdHJpeFBvc2l0aW9uKHRoaXMuYm9uZS5tYXRyaXhXb3JsZCk7XG4gICAgX25leHRUYWlsLnN1Yihfd29ybGRTcGFjZVBvc2l0aW9uKS5ub3JtYWxpemUoKS5tdWx0aXBseVNjYWxhcih0aGlzLl93b3JsZFNwYWNlQm9uZUxlbmd0aCkuYWRkKF93b3JsZFNwYWNlUG9zaXRpb24pO1xuXG4gICAgLy8gQ29sbGlzaW9uXHUzMDY3XHU3OUZCXHU1MkQ1XG4gICAgdGhpcy5fY29sbGlzaW9uKF9uZXh0VGFpbCk7XG5cbiAgICAvLyB1cGRhdGUgcHJldlRhaWwgYW5kIGN1cnJlbnRUYWlsXG4gICAgdGhpcy5fcHJldlRhaWwuY29weSh0aGlzLl9jdXJyZW50VGFpbCk7XG4gICAgdGhpcy5fY3VycmVudFRhaWwuY29weShfbmV4dFRhaWwpLmFwcGx5TWF0cml4NCh0aGlzLl9nZXRNYXRyaXhXb3JsZFRvQ2VudGVyKCkpO1xuXG4gICAgLy8gQXBwbHkgcm90YXRpb24sIGNvbnZlcnQgdmVjdG9yMyB0aGluZyBpbnRvIGFjdHVhbCBxdWF0ZXJuaW9uXG4gICAgLy8gT3JpZ2luYWwgVW5pVlJNIGlzIGRvaW5nIGNlbnRlciB1bml0IGNhbGN1bHVzIGF0IGhlcmUgYnV0IHdlJ3JlIGdvbm5hIGRvIHRoaXMgb24gbG9jYWwgdW5pdFxuICAgIGNvbnN0IHdvcmxkU3BhY2VJbml0aWFsTWF0cml4SW52ID0gX21hdEFcbiAgICAgIC5tdWx0aXBseU1hdHJpY2VzKHRoaXMuX3BhcmVudE1hdHJpeFdvcmxkLCB0aGlzLl9pbml0aWFsTG9jYWxNYXRyaXgpXG4gICAgICAuaW52ZXJ0KCk7XG4gICAgdGhpcy5ib25lLnF1YXRlcm5pb25cbiAgICAgIC5zZXRGcm9tVW5pdFZlY3RvcnModGhpcy5fYm9uZUF4aXMsIF92M0EuY29weShfbmV4dFRhaWwpLmFwcGx5TWF0cml4NCh3b3JsZFNwYWNlSW5pdGlhbE1hdHJpeEludikubm9ybWFsaXplKCkpXG4gICAgICAucHJlbXVsdGlwbHkodGhpcy5faW5pdGlhbExvY2FsUm90YXRpb24pO1xuXG4gICAgLy8gV2UgbmVlZCB0byB1cGRhdGUgaXRzIG1hdHJpeFdvcmxkIG1hbnVhbGx5LCBzaW5jZSB3ZSB0d2Vha2VkIHRoZSBib25lIGJ5IG91ciBoYW5kXG4gICAgdGhpcy5ib25lLnVwZGF0ZU1hdHJpeCgpO1xuICAgIHRoaXMuYm9uZS5tYXRyaXhXb3JsZC5tdWx0aXBseU1hdHJpY2VzKHRoaXMuX3BhcmVudE1hdHJpeFdvcmxkLCB0aGlzLmJvbmUubWF0cml4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEbyBjb2xsaXNpb24gbWF0aCBhZ2FpbnN0IGV2ZXJ5IGNvbGxpZGVycyBhdHRhY2hlZCB0byB0aGlzIGJvbmUuXG4gICAqXG4gICAqIEBwYXJhbSB0YWlsIFRoZSB0YWlsIHlvdSB3YW50IHRvIHByb2Nlc3NcbiAgICovXG4gIHByaXZhdGUgX2NvbGxpc2lvbih0YWlsOiBUSFJFRS5WZWN0b3IzKTogdm9pZCB7XG4gICAgZm9yIChsZXQgY2cgPSAwOyBjZyA8IHRoaXMuY29sbGlkZXJHcm91cHMubGVuZ3RoOyBjZysrKSB7XG4gICAgICBmb3IgKGxldCBjID0gMDsgYyA8IHRoaXMuY29sbGlkZXJHcm91cHNbY2ddLmNvbGxpZGVycy5sZW5ndGg7IGMrKykge1xuICAgICAgICBjb25zdCBjb2xsaWRlciA9IHRoaXMuY29sbGlkZXJHcm91cHNbY2ddLmNvbGxpZGVyc1tjXTtcbiAgICAgICAgY29uc3QgZGlzdCA9IGNvbGxpZGVyLnNoYXBlLmNhbGN1bGF0ZUNvbGxpc2lvbihjb2xsaWRlci5jb2xsaWRlck1hdHJpeCwgdGFpbCwgdGhpcy5zZXR0aW5ncy5oaXRSYWRpdXMsIF92M0EpO1xuXG4gICAgICAgIGlmIChkaXN0IDwgMC4wKSB7XG4gICAgICAgICAgLy8gaGl0XG4gICAgICAgICAgdGFpbC5hZGRTY2FsZWRWZWN0b3IoX3YzQSwgLWRpc3QpO1xuXG4gICAgICAgICAgLy8gbm9ybWFsaXplIGJvbmUgbGVuZ3RoXG4gICAgICAgICAgdGFpbC5zdWIoX3dvcmxkU3BhY2VQb3NpdGlvbik7XG4gICAgICAgICAgY29uc3QgbGVuZ3RoID0gdGFpbC5sZW5ndGgoKTtcbiAgICAgICAgICB0YWlsLm11bHRpcGx5U2NhbGFyKHRoaXMuX3dvcmxkU3BhY2VCb25lTGVuZ3RoIC8gbGVuZ3RoKS5hZGQoX3dvcmxkU3BhY2VQb3NpdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlIHRoZSB7QGxpbmsgX3dvcmxkU3BhY2VCb25lTGVuZ3RofS5cbiAgICogSW50ZW5kZWQgdG8gYmUgdXNlZCBpbiB7QGxpbmsgdXBkYXRlfS5cbiAgICovXG4gIHByaXZhdGUgX2NhbGNXb3JsZFNwYWNlQm9uZUxlbmd0aCgpOiB2b2lkIHtcbiAgICBfdjNBLnNldEZyb21NYXRyaXhQb3NpdGlvbih0aGlzLmJvbmUubWF0cml4V29ybGQpOyAvLyBnZXQgd29ybGQgcG9zaXRpb24gb2YgdGhpcy5ib25lXG5cbiAgICBpZiAodGhpcy5jaGlsZCkge1xuICAgICAgX3YzQi5zZXRGcm9tTWF0cml4UG9zaXRpb24odGhpcy5jaGlsZC5tYXRyaXhXb3JsZCk7IC8vIGdldCB3b3JsZCBwb3NpdGlvbiBvZiB0aGlzLmNoaWxkXG4gICAgfSBlbHNlIHtcbiAgICAgIF92M0IuY29weSh0aGlzLl9pbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uKTtcbiAgICAgIF92M0IuYXBwbHlNYXRyaXg0KHRoaXMuYm9uZS5tYXRyaXhXb3JsZCk7XG4gICAgfVxuXG4gICAgdGhpcy5fd29ybGRTcGFjZUJvbmVMZW5ndGggPSBfdjNBLnN1YihfdjNCKS5sZW5ndGgoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBtYXRyaXggdGhhdCBjb252ZXJ0cyBjZW50ZXIgc3BhY2UgaW50byB3b3JsZCBzcGFjZS5cbiAgICovXG4gIHByaXZhdGUgX2dldE1hdHJpeENlbnRlclRvV29ybGQoKTogVEhSRUUuTWF0cml4NCB7XG4gICAgcmV0dXJuIHRoaXMuX2NlbnRlciA/IHRoaXMuX2NlbnRlci5tYXRyaXhXb3JsZCA6IElERU5USVRZX01BVFJJWDQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbWF0cml4IHRoYXQgY29udmVydHMgd29ybGQgc3BhY2UgaW50byBjZW50ZXIgc3BhY2UuXG4gICAqL1xuICBwcml2YXRlIF9nZXRNYXRyaXhXb3JsZFRvQ2VudGVyKCk6IFRIUkVFLk1hdHJpeDQge1xuICAgIHJldHVybiB0aGlzLl9jZW50ZXIgPyAodGhpcy5fY2VudGVyLnVzZXJEYXRhLmludmVyc2VDYWNoZVByb3h5IGFzIE1hdHJpeDRJbnZlcnNlQ2FjaGUpLmludmVyc2UgOiBJREVOVElUWV9NQVRSSVg0O1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgbWF0NEludmVydENvbXBhdCB9IGZyb20gJy4vbWF0NEludmVydENvbXBhdCc7XG5cbmV4cG9ydCBjbGFzcyBNYXRyaXg0SW52ZXJzZUNhY2hlIHtcbiAgLyoqXG4gICAqIFRoZSB0YXJnZXQgbWF0cml4LlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IG1hdHJpeDogVEhSRUUuTWF0cml4NDtcblxuICAvKipcbiAgICogQSBjYWNoZSBvZiBpbnZlcnNlIG9mIGN1cnJlbnQgbWF0cml4LlxuICAgKi9cbiAgcHJpdmF0ZSByZWFkb25seSBfaW52ZXJzZUNhY2hlID0gbmV3IFRIUkVFLk1hdHJpeDQoKTtcblxuICAvKipcbiAgICogQSBmbGFnIHRoYXQgbWFrZXMgaXQgd2FudCB0byByZWNhbGN1bGF0ZSBpdHMge0BsaW5rIF9pbnZlcnNlQ2FjaGV9LlxuICAgKiBXaWxsIGJlIHNldCBgdHJ1ZWAgd2hlbiBgZWxlbWVudHNgIGFyZSBtdXRhdGVkIGFuZCBiZSB1c2VkIGluIGBnZXRJbnZlcnNlYC5cbiAgICovXG4gIHByaXZhdGUgX3Nob3VsZFVwZGF0ZUludmVyc2UgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBUaGUgb3JpZ2luYWwgb2YgYG1hdHJpeC5lbGVtZW50c2BcbiAgICovXG4gIHByaXZhdGUgcmVhZG9ubHkgX29yaWdpbmFsRWxlbWVudHM6IFRIUkVFLk1hdHJpeDRUdXBsZTtcblxuICAvKipcbiAgICogSW52ZXJzZSBvZiBnaXZlbiBtYXRyaXguXG4gICAqIE5vdGUgdGhhdCBpdCB3aWxsIHJldHVybiBpdHMgaW50ZXJuYWwgcHJpdmF0ZSBpbnN0YW5jZS5cbiAgICogTWFrZSBzdXJlIGNvcHlpbmcgdGhpcyBiZWZvcmUgbXV0YXRlIHRoaXMuXG4gICAqL1xuICBwdWJsaWMgZ2V0IGludmVyc2UoKTogVEhSRUUuTWF0cml4NCB7XG4gICAgaWYgKHRoaXMuX3Nob3VsZFVwZGF0ZUludmVyc2UpIHtcbiAgICAgIG1hdDRJbnZlcnRDb21wYXQodGhpcy5faW52ZXJzZUNhY2hlLmNvcHkodGhpcy5tYXRyaXgpKTtcbiAgICAgIHRoaXMuX3Nob3VsZFVwZGF0ZUludmVyc2UgPSBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5faW52ZXJzZUNhY2hlO1xuICB9XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKG1hdHJpeDogVEhSRUUuTWF0cml4NCkge1xuICAgIHRoaXMubWF0cml4ID0gbWF0cml4O1xuXG4gICAgY29uc3QgaGFuZGxlcjogUHJveHlIYW5kbGVyPG51bWJlcltdPiA9IHtcbiAgICAgIHNldDogKG9iaiwgcHJvcDogYW55LCBuZXdWYWwpID0+IHtcbiAgICAgICAgdGhpcy5fc2hvdWxkVXBkYXRlSW52ZXJzZSA9IHRydWU7XG4gICAgICAgIG9ialtwcm9wXSA9IG5ld1ZhbDtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIHRoaXMuX29yaWdpbmFsRWxlbWVudHMgPSBtYXRyaXguZWxlbWVudHM7XG4gICAgbWF0cml4LmVsZW1lbnRzID0gbmV3IFByb3h5PFRIUkVFLk1hdHJpeDRUdXBsZT4obWF0cml4LmVsZW1lbnRzLCBoYW5kbGVyKTtcbiAgfVxuXG4gIHB1YmxpYyByZXZlcnQoKTogdm9pZCB7XG4gICAgdGhpcy5tYXRyaXguZWxlbWVudHMgPSB0aGlzLl9vcmlnaW5hbEVsZW1lbnRzO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG5jb25zdCBfbWF0QSA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG5cbi8qKlxuICogQSBjb21wYXQgZnVuY3Rpb24gZm9yIGBNYXRyaXg0LmludmVydCgpYCAvIGBNYXRyaXg0LmdldEludmVyc2UoKWAuXG4gKiBgTWF0cml4NC5pbnZlcnQoKWAgaXMgaW50cm9kdWNlZCBpbiByMTIzIGFuZCBgTWF0cml4NC5nZXRJbnZlcnNlKClgIGVtaXRzIGEgd2FybmluZy5cbiAqIFdlIGFyZSBnb2luZyB0byB1c2UgdGhpcyBjb21wYXQgZm9yIGEgd2hpbGUuXG4gKiBAcGFyYW0gdGFyZ2V0IEEgdGFyZ2V0IG1hdHJpeFxuICovXG5leHBvcnQgZnVuY3Rpb24gbWF0NEludmVydENvbXBhdDxUIGV4dGVuZHMgVEhSRUUuTWF0cml4ND4odGFyZ2V0OiBUKTogVCB7XG4gIGlmICgodGFyZ2V0IGFzIGFueSkuaW52ZXJ0KSB7XG4gICAgdGFyZ2V0LmludmVydCgpO1xuICB9IGVsc2Uge1xuICAgICh0YXJnZXQgYXMgYW55KS5nZXRJbnZlcnNlKF9tYXRBLmNvcHkodGFyZ2V0KSk7XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuIiwgImltcG9ydCB0eXBlICogYXMgVjBWUk0gZnJvbSAnQHBpeGl2L3R5cGVzLXZybS0wLjAnO1xuaW1wb3J0IHR5cGUgKiBhcyBWMVNwcmluZ0JvbmVTY2hlbWEgZnJvbSAnQHBpeGl2L3R5cGVzLXZybWMtc3ByaW5nYm9uZS0xLjAnO1xuaW1wb3J0IHR5cGUgKiBhcyBTcHJpbmdCb25lRXh0ZW5kZWRDb2xsaWRlclNjaGVtYSBmcm9tICdAcGl4aXYvdHlwZXMtdnJtYy1zcHJpbmdib25lLWV4dGVuZGVkLWNvbGxpZGVyLTEuMCc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgdHlwZSB7IEdMVEYsIEdMVEZMb2FkZXJQbHVnaW4sIEdMVEZQYXJzZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyLmpzJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlckhlbHBlciwgVlJNU3ByaW5nQm9uZUpvaW50SGVscGVyIH0gZnJvbSAnLi9oZWxwZXJzJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlciB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyJztcbmltcG9ydCB0eXBlIHsgVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXAgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlQ2Fwc3VsZSB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVDYXBzdWxlJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlU3BoZXJlIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZVNwaGVyZSc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lSm9pbnQgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVKb2ludCc7XG5pbXBvcnQgdHlwZSB7IFZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW5PcHRpb25zIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lTG9hZGVyUGx1Z2luT3B0aW9ucyc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lTWFuYWdlciB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZU1hbmFnZXInO1xuaW1wb3J0IHR5cGUgeyBWUk1TcHJpbmdCb25lSm9pbnRTZXR0aW5ncyB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUpvaW50U2V0dGluZ3MnO1xuaW1wb3J0IHsgR0xURiBhcyBHTFRGU2NoZW1hIH0gZnJvbSAnQGdsdGYtdHJhbnNmb3JtL2NvcmUnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVQbGFuZSB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVQbGFuZSc7XG5cbmNvbnN0IEVYVEVOU0lPTl9OQU1FX0VYVEVOREVEX0NPTExJREVSID0gJ1ZSTUNfc3ByaW5nQm9uZV9leHRlbmRlZF9jb2xsaWRlcic7XG5cbi8qKlxuICogUG9zc2libGUgc3BlYyB2ZXJzaW9ucyBpdCByZWNvZ25pemVzLlxuICovXG5jb25zdCBQT1NTSUJMRV9TUEVDX1ZFUlNJT05TID0gbmV3IFNldChbJzEuMCcsICcxLjAtYmV0YSddKTtcblxuLyoqXG4gKiBQb3NzaWJsZSBzcGVjIHZlcnNpb25zIG9mIGBWUk1DX3NwcmluZ0JvbmVfZXh0ZW5kZWRfY29sbGlkZXJgIGl0IHJlY29nbml6ZXMuXG4gKi9cbmNvbnN0IFBPU1NJQkxFX1NQRUNfVkVSU0lPTlNfRVhURU5ERURfQ09MTElERVJTID0gbmV3IFNldChbJzEuMCddKTtcblxuZXhwb3J0IGNsYXNzIFZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW4gaW1wbGVtZW50cyBHTFRGTG9hZGVyUGx1Z2luIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBFWFRFTlNJT05fTkFNRSA9ICdWUk1DX3NwcmluZ0JvbmUnO1xuXG4gIC8qKlxuICAgKiBTcGVjaWZ5IGFuIE9iamVjdDNEIHRvIGFkZCB7QGxpbmsgVlJNU3ByaW5nQm9uZUpvaW50SGVscGVyfSBzLlxuICAgKiBJZiBub3Qgc3BlY2lmaWVkLCBoZWxwZXIgd2lsbCBub3QgYmUgY3JlYXRlZC5cbiAgICogSWYgYHJlbmRlck9yZGVyYCBpcyBzZXQgdG8gdGhlIHJvb3QsIGhlbHBlcnMgd2lsbCBjb3B5IHRoZSBzYW1lIGByZW5kZXJPcmRlcmAgLlxuICAgKi9cbiAgcHVibGljIGpvaW50SGVscGVyUm9vdD86IFRIUkVFLk9iamVjdDNEO1xuXG4gIC8qKlxuICAgKiBTcGVjaWZ5IGFuIE9iamVjdDNEIHRvIGFkZCB7QGxpbmsgVlJNU3ByaW5nQm9uZUpvaW50SGVscGVyfSBzLlxuICAgKiBJZiBub3Qgc3BlY2lmaWVkLCBoZWxwZXIgd2lsbCBub3QgYmUgY3JlYXRlZC5cbiAgICogSWYgYHJlbmRlck9yZGVyYCBpcyBzZXQgdG8gdGhlIHJvb3QsIGhlbHBlcnMgd2lsbCBjb3B5IHRoZSBzYW1lIGByZW5kZXJPcmRlcmAgLlxuICAgKi9cbiAgcHVibGljIGNvbGxpZGVySGVscGVyUm9vdD86IFRIUkVFLk9iamVjdDNEO1xuXG4gIC8qKlxuICAgKiBJZiB0cnVlLCBsb2FkIGNvbGxpZGVycyBkZWZpbmVkIGluIGBWUk1DX3NwcmluZ0JvbmVfZXh0ZW5kZWRfY29sbGlkZXJgLlxuICAgKiBTZXQgdG8gYGZhbHNlYCB0byBkaXNhYmxlIGxvYWRpbmcgZXh0ZW5kZWQgY29sbGlkZXJzIGFuZCB1c2UgdGhlIGZhbGxiYWNrIGJlaGF2aW9yLlxuICAgKiBgdHJ1ZWAgYnkgZGVmYXVsdC5cbiAgICovXG4gIHB1YmxpYyB1c2VFeHRlbmRlZENvbGxpZGVyczogYm9vbGVhbjtcblxuICBwdWJsaWMgcmVhZG9ubHkgcGFyc2VyOiBHTFRGUGFyc2VyO1xuXG4gIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBWUk1TcHJpbmdCb25lTG9hZGVyUGx1Z2luLkVYVEVOU0lPTl9OQU1FO1xuICB9XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBhcnNlcjogR0xURlBhcnNlciwgb3B0aW9ucz86IFZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW5PcHRpb25zKSB7XG4gICAgdGhpcy5wYXJzZXIgPSBwYXJzZXI7XG5cbiAgICB0aGlzLmpvaW50SGVscGVyUm9vdCA9IG9wdGlvbnM/LmpvaW50SGVscGVyUm9vdDtcbiAgICB0aGlzLmNvbGxpZGVySGVscGVyUm9vdCA9IG9wdGlvbnM/LmNvbGxpZGVySGVscGVyUm9vdDtcbiAgICB0aGlzLnVzZUV4dGVuZGVkQ29sbGlkZXJzID0gb3B0aW9ucz8udXNlRXh0ZW5kZWRDb2xsaWRlcnMgPz8gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBhZnRlclJvb3QoZ2x0ZjogR0xURik6IFByb21pc2U8dm9pZD4ge1xuICAgIGdsdGYudXNlckRhdGEudnJtU3ByaW5nQm9uZU1hbmFnZXIgPSBhd2FpdCB0aGlzLl9pbXBvcnQoZ2x0Zik7XG4gIH1cblxuICAvKipcbiAgICogSW1wb3J0IHNwcmluZyBib25lcyBmcm9tIGEgR0xURiBhbmQgcmV0dXJuIGEge0BsaW5rIFZSTVNwcmluZ0JvbmVNYW5hZ2VyfS5cbiAgICogSXQgbWlnaHQgcmV0dXJuIGBudWxsYCBpbnN0ZWFkIHdoZW4gaXQgZG9lcyBub3QgbmVlZCB0byBiZSBjcmVhdGVkIG9yIHNvbWV0aGluZyBnbyB3cm9uZy5cbiAgICpcbiAgICogQHBhcmFtIGdsdGYgQSBwYXJzZWQgcmVzdWx0IG9mIEdMVEYgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gICAqL1xuICBwcml2YXRlIGFzeW5jIF9pbXBvcnQoZ2x0ZjogR0xURik6IFByb21pc2U8VlJNU3ByaW5nQm9uZU1hbmFnZXIgfCBudWxsPiB7XG4gICAgY29uc3QgdjFSZXN1bHQgPSBhd2FpdCB0aGlzLl92MUltcG9ydChnbHRmKTtcbiAgICBpZiAodjFSZXN1bHQgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHYxUmVzdWx0O1xuICAgIH1cblxuICAgIGNvbnN0IHYwUmVzdWx0ID0gYXdhaXQgdGhpcy5fdjBJbXBvcnQoZ2x0Zik7XG4gICAgaWYgKHYwUmVzdWx0ICE9IG51bGwpIHtcbiAgICAgIHJldHVybiB2MFJlc3VsdDtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX3YxSW1wb3J0KGdsdGY6IEdMVEYpOiBQcm9taXNlPFZSTVNwcmluZ0JvbmVNYW5hZ2VyIHwgbnVsbD4ge1xuICAgIGNvbnN0IGpzb24gPSBnbHRmLnBhcnNlci5qc29uIGFzIEdMVEZTY2hlbWEuSUdMVEY7XG5cbiAgICAvLyBlYXJseSBhYm9ydCBpZiBpdCBkb2Vzbid0IHVzZSBzcHJpbmcgYm9uZXNcbiAgICBjb25zdCBpc1NwcmluZ0JvbmVVc2VkID0ganNvbi5leHRlbnNpb25zVXNlZD8uaW5kZXhPZihWUk1TcHJpbmdCb25lTG9hZGVyUGx1Z2luLkVYVEVOU0lPTl9OQU1FKSAhPT0gLTE7XG4gICAgaWYgKCFpc1NwcmluZ0JvbmVVc2VkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBtYW5hZ2VyID0gbmV3IFZSTVNwcmluZ0JvbmVNYW5hZ2VyKCk7XG5cbiAgICBjb25zdCB0aHJlZU5vZGVzOiBUSFJFRS5PYmplY3QzRFtdID0gYXdhaXQgZ2x0Zi5wYXJzZXIuZ2V0RGVwZW5kZW5jaWVzKCdub2RlJyk7XG5cbiAgICBjb25zdCBleHRlbnNpb24gPSBqc29uLmV4dGVuc2lvbnM/LltWUk1TcHJpbmdCb25lTG9hZGVyUGx1Z2luLkVYVEVOU0lPTl9OQU1FXSBhc1xuICAgICAgfCBWMVNwcmluZ0JvbmVTY2hlbWEuVlJNQ1NwcmluZ0JvbmVcbiAgICAgIHwgdW5kZWZpbmVkO1xuICAgIGlmICghZXh0ZW5zaW9uKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzcGVjVmVyc2lvbiA9IGV4dGVuc2lvbi5zcGVjVmVyc2lvbjtcbiAgICBpZiAoIVBPU1NJQkxFX1NQRUNfVkVSU0lPTlMuaGFzKHNwZWNWZXJzaW9uKSkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBgVlJNU3ByaW5nQm9uZUxvYWRlclBsdWdpbjogVW5rbm93biAke1ZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW4uRVhURU5TSU9OX05BTUV9IHNwZWNWZXJzaW9uIFwiJHtzcGVjVmVyc2lvbn1cImAsXG4gICAgICApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgY29sbGlkZXJzID0gZXh0ZW5zaW9uLmNvbGxpZGVycz8ubWFwKChzY2hlbWFDb2xsaWRlciwgaUNvbGxpZGVyKSA9PiB7XG4gICAgICBjb25zdCBub2RlID0gdGhyZWVOb2Rlc1tzY2hlbWFDb2xsaWRlci5ub2RlIV07XG5cbiAgICAgIC8vIFNvbWUgbW9kZWxzIHB1dCBgLTFgIHRvIHRoZSBub2RlIGluZGV4IG9mIGNvbGxpZGVyc1xuICAgICAgaWYgKG5vZGUgPT0gbnVsbCkge1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgYFZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW46IFRoZSBjb2xsaWRlciAjJHtpQ29sbGlkZXJ9IGF0dGVtcHRlZCB0byB1c2UgdGhlIG5vZGUgIyR7c2NoZW1hQ29sbGlkZXIubm9kZX0gYnV0IG5vdCBmb3VuZGAsXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzY2hlbWFTaGFwZSA9IHNjaGVtYUNvbGxpZGVyLnNoYXBlITtcblxuICAgICAgLy8gVE9ETzogc2VwYXJhdGUgaW50byBzZXZlcmFsIGZ1bmN0aW9uc1xuXG4gICAgICBjb25zdCBzY2hlbWFFeENvbGxpZGVyOiBTcHJpbmdCb25lRXh0ZW5kZWRDb2xsaWRlclNjaGVtYS5WUk1DU3ByaW5nQm9uZUV4dGVuZGVkQ29sbGlkZXIgfCB1bmRlZmluZWQgPVxuICAgICAgICBzY2hlbWFDb2xsaWRlci5leHRlbnNpb25zPy5bRVhURU5TSU9OX05BTUVfRVhURU5ERURfQ09MTElERVJdO1xuXG4gICAgICBpZiAodGhpcy51c2VFeHRlbmRlZENvbGxpZGVycyAmJiBzY2hlbWFFeENvbGxpZGVyICE9IG51bGwpIHtcbiAgICAgICAgY29uc3Qgc3BlY1ZlcnNpb25FeENvbGxpZGVyID0gc2NoZW1hRXhDb2xsaWRlci5zcGVjVmVyc2lvbjtcbiAgICAgICAgaWYgKCFQT1NTSUJMRV9TUEVDX1ZFUlNJT05TX0VYVEVOREVEX0NPTExJREVSUy5oYXMoc3BlY1ZlcnNpb25FeENvbGxpZGVyKSkge1xuICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgIGBWUk1TcHJpbmdCb25lTG9hZGVyUGx1Z2luOiBVbmtub3duICR7RVhURU5TSU9OX05BTUVfRVhURU5ERURfQ09MTElERVJ9IHNwZWNWZXJzaW9uIFwiJHtzcGVjVmVyc2lvbkV4Q29sbGlkZXJ9XCIuIEZhbGxiYWNraW5nIHRvIHRoZSAke1ZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW4uRVhURU5TSU9OX05BTUV9IGRlZmluaXRpb25gLFxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3Qgc2NoZW1hRXhTaGFwZSA9IHNjaGVtYUV4Q29sbGlkZXIuc2hhcGUhO1xuICAgICAgICAgIGlmIChzY2hlbWFFeFNoYXBlLnNwaGVyZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2ltcG9ydFNwaGVyZUNvbGxpZGVyKG5vZGUsIHtcbiAgICAgICAgICAgICAgb2Zmc2V0OiBuZXcgVEhSRUUuVmVjdG9yMygpLmZyb21BcnJheShzY2hlbWFFeFNoYXBlLnNwaGVyZS5vZmZzZXQgPz8gWzAuMCwgMC4wLCAwLjBdKSxcbiAgICAgICAgICAgICAgcmFkaXVzOiBzY2hlbWFFeFNoYXBlLnNwaGVyZS5yYWRpdXMgPz8gMC4wLFxuICAgICAgICAgICAgICBpbnNpZGU6IHNjaGVtYUV4U2hhcGUuc3BoZXJlLmluc2lkZSA/PyBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc2NoZW1hRXhTaGFwZS5jYXBzdWxlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faW1wb3J0Q2Fwc3VsZUNvbGxpZGVyKG5vZGUsIHtcbiAgICAgICAgICAgICAgb2Zmc2V0OiBuZXcgVEhSRUUuVmVjdG9yMygpLmZyb21BcnJheShzY2hlbWFFeFNoYXBlLmNhcHN1bGUub2Zmc2V0ID8/IFswLjAsIDAuMCwgMC4wXSksXG4gICAgICAgICAgICAgIHJhZGl1czogc2NoZW1hRXhTaGFwZS5jYXBzdWxlLnJhZGl1cyA/PyAwLjAsXG4gICAgICAgICAgICAgIHRhaWw6IG5ldyBUSFJFRS5WZWN0b3IzKCkuZnJvbUFycmF5KHNjaGVtYUV4U2hhcGUuY2Fwc3VsZS50YWlsID8/IFswLjAsIDAuMCwgMC4wXSksXG4gICAgICAgICAgICAgIGluc2lkZTogc2NoZW1hRXhTaGFwZS5jYXBzdWxlLmluc2lkZSA/PyBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc2NoZW1hRXhTaGFwZS5wbGFuZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2ltcG9ydFBsYW5lQ29sbGlkZXIobm9kZSwge1xuICAgICAgICAgICAgICBvZmZzZXQ6IG5ldyBUSFJFRS5WZWN0b3IzKCkuZnJvbUFycmF5KHNjaGVtYUV4U2hhcGUucGxhbmUub2Zmc2V0ID8/IFswLjAsIDAuMCwgMC4wXSksXG4gICAgICAgICAgICAgIG5vcm1hbDogbmV3IFRIUkVFLlZlY3RvcjMoKS5mcm9tQXJyYXkoc2NoZW1hRXhTaGFwZS5wbGFuZS5ub3JtYWwgPz8gWzAuMCwgMC4wLCAxLjBdKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc2NoZW1hU2hhcGUuc3BoZXJlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbXBvcnRTcGhlcmVDb2xsaWRlcihub2RlLCB7XG4gICAgICAgICAgb2Zmc2V0OiBuZXcgVEhSRUUuVmVjdG9yMygpLmZyb21BcnJheShzY2hlbWFTaGFwZS5zcGhlcmUub2Zmc2V0ID8/IFswLjAsIDAuMCwgMC4wXSksXG4gICAgICAgICAgcmFkaXVzOiBzY2hlbWFTaGFwZS5zcGhlcmUucmFkaXVzID8/IDAuMCxcbiAgICAgICAgICBpbnNpZGU6IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoc2NoZW1hU2hhcGUuY2Fwc3VsZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5faW1wb3J0Q2Fwc3VsZUNvbGxpZGVyKG5vZGUsIHtcbiAgICAgICAgICBvZmZzZXQ6IG5ldyBUSFJFRS5WZWN0b3IzKCkuZnJvbUFycmF5KHNjaGVtYVNoYXBlLmNhcHN1bGUub2Zmc2V0ID8/IFswLjAsIDAuMCwgMC4wXSksXG4gICAgICAgICAgcmFkaXVzOiBzY2hlbWFTaGFwZS5jYXBzdWxlLnJhZGl1cyA/PyAwLjAsXG4gICAgICAgICAgdGFpbDogbmV3IFRIUkVFLlZlY3RvcjMoKS5mcm9tQXJyYXkoc2NoZW1hU2hhcGUuY2Fwc3VsZS50YWlsID8/IFswLjAsIDAuMCwgMC4wXSksXG4gICAgICAgICAgaW5zaWRlOiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHRocm93IG5ldyBFcnJvcihgVlJNU3ByaW5nQm9uZUxvYWRlclBsdWdpbjogVGhlIGNvbGxpZGVyICMke2lDb2xsaWRlcn0gaGFzIG5vIHZhbGlkIHNoYXBlYCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBjb2xsaWRlckdyb3VwcyA9IGV4dGVuc2lvbi5jb2xsaWRlckdyb3Vwcz8ubWFwKFxuICAgICAgKHNjaGVtYUNvbGxpZGVyR3JvdXAsIGlDb2xsaWRlckdyb3VwKTogVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXAgPT4ge1xuICAgICAgICBjb25zdCBjb2xzID0gKHNjaGVtYUNvbGxpZGVyR3JvdXAuY29sbGlkZXJzID8/IFtdKS5mbGF0TWFwKChpQ29sbGlkZXIpID0+IHtcbiAgICAgICAgICBjb25zdCBjb2wgPSBjb2xsaWRlcnM/LltpQ29sbGlkZXJdO1xuXG4gICAgICAgICAgaWYgKGNvbCA9PSBudWxsKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICAgIGBWUk1TcHJpbmdCb25lTG9hZGVyUGx1Z2luOiBUaGUgY29sbGlkZXJHcm91cCAjJHtpQ29sbGlkZXJHcm91cH0gYXR0ZW1wdGVkIHRvIHVzZSBhIGNvbGxpZGVyICMke2lDb2xsaWRlcn0gYnV0IG5vdCBmb3VuZGAsXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBjb2w7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgY29sbGlkZXJzOiBjb2xzLFxuICAgICAgICAgIG5hbWU6IHNjaGVtYUNvbGxpZGVyR3JvdXAubmFtZSxcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgKTtcblxuICAgIGV4dGVuc2lvbi5zcHJpbmdzPy5mb3JFYWNoKChzY2hlbWFTcHJpbmcsIGlTcHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IHNjaGVtYUpvaW50cyA9IHNjaGVtYVNwcmluZy5qb2ludHM7XG5cbiAgICAgIC8vIHByZXBhcmUgY29sbGlkZXJzXG4gICAgICBjb25zdCBjb2xsaWRlckdyb3Vwc0ZvclNwcmluZyA9IHNjaGVtYVNwcmluZy5jb2xsaWRlckdyb3Vwcz8ubWFwKChpQ29sbGlkZXJHcm91cCkgPT4ge1xuICAgICAgICBjb25zdCBncm91cCA9IGNvbGxpZGVyR3JvdXBzPy5baUNvbGxpZGVyR3JvdXBdO1xuXG4gICAgICAgIGlmIChncm91cCA9PSBudWxsKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgYFZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW46IFRoZSBzcHJpbmcgIyR7aVNwcmluZ30gYXR0ZW1wdGVkIHRvIHVzZSBhIGNvbGxpZGVyR3JvdXAgJHtpQ29sbGlkZXJHcm91cH0gYnV0IG5vdCBmb3VuZGAsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBncm91cDtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBjZW50ZXIgPSBzY2hlbWFTcHJpbmcuY2VudGVyICE9IG51bGwgPyB0aHJlZU5vZGVzW3NjaGVtYVNwcmluZy5jZW50ZXJdIDogdW5kZWZpbmVkO1xuXG4gICAgICBsZXQgcHJldlNjaGVtYUpvaW50OiBWMVNwcmluZ0JvbmVTY2hlbWEuU3ByaW5nQm9uZUpvaW50IHwgdW5kZWZpbmVkO1xuICAgICAgc2NoZW1hSm9pbnRzLmZvckVhY2goKHNjaGVtYUpvaW50KSA9PiB7XG4gICAgICAgIGlmIChwcmV2U2NoZW1hSm9pbnQpIHtcbiAgICAgICAgICAvLyBwcmVwYXJlIG5vZGVcbiAgICAgICAgICBjb25zdCBub2RlSW5kZXggPSBwcmV2U2NoZW1hSm9pbnQubm9kZTtcbiAgICAgICAgICBjb25zdCBub2RlID0gdGhyZWVOb2Rlc1tub2RlSW5kZXhdO1xuICAgICAgICAgIGNvbnN0IGNoaWxkSW5kZXggPSBzY2hlbWFKb2ludC5ub2RlO1xuICAgICAgICAgIGNvbnN0IGNoaWxkID0gdGhyZWVOb2Rlc1tjaGlsZEluZGV4XTtcblxuICAgICAgICAgIC8vIHByZXBhcmUgc2V0dGluZ1xuICAgICAgICAgIGNvbnN0IHNldHRpbmc6IFBhcnRpYWw8VlJNU3ByaW5nQm9uZUpvaW50U2V0dGluZ3M+ID0ge1xuICAgICAgICAgICAgaGl0UmFkaXVzOiBwcmV2U2NoZW1hSm9pbnQuaGl0UmFkaXVzLFxuICAgICAgICAgICAgZHJhZ0ZvcmNlOiBwcmV2U2NoZW1hSm9pbnQuZHJhZ0ZvcmNlLFxuICAgICAgICAgICAgZ3Jhdml0eVBvd2VyOiBwcmV2U2NoZW1hSm9pbnQuZ3Jhdml0eVBvd2VyLFxuICAgICAgICAgICAgc3RpZmZuZXNzOiBwcmV2U2NoZW1hSm9pbnQuc3RpZmZuZXNzLFxuICAgICAgICAgICAgZ3Jhdml0eURpcjpcbiAgICAgICAgICAgICAgcHJldlNjaGVtYUpvaW50LmdyYXZpdHlEaXIgIT0gbnVsbFxuICAgICAgICAgICAgICAgID8gbmV3IFRIUkVFLlZlY3RvcjMoKS5mcm9tQXJyYXkocHJldlNjaGVtYUpvaW50LmdyYXZpdHlEaXIpXG4gICAgICAgICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIC8vIGNyZWF0ZSBzcHJpbmcgYm9uZXNcbiAgICAgICAgICBjb25zdCBqb2ludCA9IHRoaXMuX2ltcG9ydEpvaW50KG5vZGUsIGNoaWxkLCBzZXR0aW5nLCBjb2xsaWRlckdyb3Vwc0ZvclNwcmluZyk7XG4gICAgICAgICAgaWYgKGNlbnRlcikge1xuICAgICAgICAgICAgam9pbnQuY2VudGVyID0gY2VudGVyO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIG1hbmFnZXIuYWRkSm9pbnQoam9pbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJldlNjaGVtYUpvaW50ID0gc2NoZW1hSm9pbnQ7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIGluaXQgc3ByaW5nIGJvbmVzXG4gICAgbWFuYWdlci5zZXRJbml0U3RhdGUoKTtcblxuICAgIHJldHVybiBtYW5hZ2VyO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfdjBJbXBvcnQoZ2x0ZjogR0xURik6IFByb21pc2U8VlJNU3ByaW5nQm9uZU1hbmFnZXIgfCBudWxsPiB7XG4gICAgY29uc3QganNvbiA9IGdsdGYucGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAgIC8vIGVhcmx5IGFib3J0IGlmIGl0IGRvZXNuJ3QgdXNlIHZybVxuICAgIGNvbnN0IGlzVlJNVXNlZCA9IGpzb24uZXh0ZW5zaW9uc1VzZWQ/LmluZGV4T2YoJ1ZSTScpICE9PSAtMTtcbiAgICBpZiAoIWlzVlJNVXNlZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gZWFybHkgYWJvcnQgaWYgaXQgZG9lc24ndCBoYXZlIGJvbmUgZ3JvdXBzXG4gICAgY29uc3QgZXh0ZW5zaW9uID0ganNvbi5leHRlbnNpb25zPy5bJ1ZSTSddIGFzIFYwVlJNLlZSTSB8IHVuZGVmaW5lZDtcbiAgICBjb25zdCBzY2hlbWFTZWNvbmRhcnlBbmltYXRpb24gPSBleHRlbnNpb24/LnNlY29uZGFyeUFuaW1hdGlvbjtcbiAgICBpZiAoIXNjaGVtYVNlY29uZGFyeUFuaW1hdGlvbikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc2NoZW1hQm9uZUdyb3VwcyA9IHNjaGVtYVNlY29uZGFyeUFuaW1hdGlvbj8uYm9uZUdyb3VwcztcbiAgICBpZiAoIXNjaGVtYUJvbmVHcm91cHMpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IG1hbmFnZXIgPSBuZXcgVlJNU3ByaW5nQm9uZU1hbmFnZXIoKTtcblxuICAgIGNvbnN0IHRocmVlTm9kZXM6IFRIUkVFLk9iamVjdDNEW10gPSBhd2FpdCBnbHRmLnBhcnNlci5nZXREZXBlbmRlbmNpZXMoJ25vZGUnKTtcblxuICAgIGNvbnN0IGNvbGxpZGVyR3JvdXBzID0gc2NoZW1hU2Vjb25kYXJ5QW5pbWF0aW9uLmNvbGxpZGVyR3JvdXBzPy5tYXAoXG4gICAgICAoc2NoZW1hQ29sbGlkZXJHcm91cCk6IFZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwID0+IHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IHRocmVlTm9kZXNbc2NoZW1hQ29sbGlkZXJHcm91cC5ub2RlIV07XG4gICAgICAgIGNvbnN0IGNvbGxpZGVycyA9IChzY2hlbWFDb2xsaWRlckdyb3VwLmNvbGxpZGVycyA/PyBbXSkubWFwKChzY2hlbWFDb2xsaWRlciwgaUNvbGxpZGVyKSA9PiB7XG4gICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gbmV3IFRIUkVFLlZlY3RvcjMoMC4wLCAwLjAsIDAuMCk7XG4gICAgICAgICAgaWYgKHNjaGVtYUNvbGxpZGVyLm9mZnNldCkge1xuICAgICAgICAgICAgb2Zmc2V0LnNldChcbiAgICAgICAgICAgICAgc2NoZW1hQ29sbGlkZXIub2Zmc2V0LnggPz8gMC4wLFxuICAgICAgICAgICAgICBzY2hlbWFDb2xsaWRlci5vZmZzZXQueSA/PyAwLjAsXG4gICAgICAgICAgICAgIHNjaGVtYUNvbGxpZGVyLm9mZnNldC56ID8gLXNjaGVtYUNvbGxpZGVyLm9mZnNldC56IDogMC4wLCAvLyB6IGlzIG9wcG9zaXRlIGluIFZSTTAuMFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gdGhpcy5faW1wb3J0U3BoZXJlQ29sbGlkZXIobm9kZSwge1xuICAgICAgICAgICAgb2Zmc2V0LFxuICAgICAgICAgICAgcmFkaXVzOiBzY2hlbWFDb2xsaWRlci5yYWRpdXMgPz8gMC4wLFxuICAgICAgICAgICAgaW5zaWRlOiBmYWxzZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHsgY29sbGlkZXJzIH07XG4gICAgICB9LFxuICAgICk7XG5cbiAgICAvLyBpbXBvcnQgc3ByaW5nIGJvbmVzIGZvciBlYWNoIHNwcmluZyBib25lIGdyb3Vwc1xuICAgIHNjaGVtYUJvbmVHcm91cHM/LmZvckVhY2goKHNjaGVtYUJvbmVHcm91cCwgaUJvbmVHcm91cCkgPT4ge1xuICAgICAgY29uc3Qgcm9vdEluZGljZXMgPSBzY2hlbWFCb25lR3JvdXAuYm9uZXM7XG4gICAgICBpZiAoIXJvb3RJbmRpY2VzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcm9vdEluZGljZXMuZm9yRWFjaCgocm9vdEluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IHJvb3QgPSB0aHJlZU5vZGVzW3Jvb3RJbmRleF07XG5cbiAgICAgICAgLy8gcHJlcGFyZSBzZXR0aW5nXG4gICAgICAgIGNvbnN0IGdyYXZpdHlEaXIgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuICAgICAgICBpZiAoc2NoZW1hQm9uZUdyb3VwLmdyYXZpdHlEaXIpIHtcbiAgICAgICAgICBncmF2aXR5RGlyLnNldChcbiAgICAgICAgICAgIHNjaGVtYUJvbmVHcm91cC5ncmF2aXR5RGlyLnggPz8gMC4wLFxuICAgICAgICAgICAgc2NoZW1hQm9uZUdyb3VwLmdyYXZpdHlEaXIueSA/PyAwLjAsXG4gICAgICAgICAgICBzY2hlbWFCb25lR3JvdXAuZ3Jhdml0eURpci56ID8/IDAuMCxcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGdyYXZpdHlEaXIuc2V0KDAuMCwgLTEuMCwgMC4wKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNlbnRlciA9IHNjaGVtYUJvbmVHcm91cC5jZW50ZXIgIT0gbnVsbCA/IHRocmVlTm9kZXNbc2NoZW1hQm9uZUdyb3VwLmNlbnRlcl0gOiB1bmRlZmluZWQ7XG5cbiAgICAgICAgY29uc3Qgc2V0dGluZzogUGFydGlhbDxWUk1TcHJpbmdCb25lSm9pbnRTZXR0aW5ncz4gPSB7XG4gICAgICAgICAgaGl0UmFkaXVzOiBzY2hlbWFCb25lR3JvdXAuaGl0UmFkaXVzLFxuICAgICAgICAgIGRyYWdGb3JjZTogc2NoZW1hQm9uZUdyb3VwLmRyYWdGb3JjZSxcbiAgICAgICAgICBncmF2aXR5UG93ZXI6IHNjaGVtYUJvbmVHcm91cC5ncmF2aXR5UG93ZXIsXG4gICAgICAgICAgc3RpZmZuZXNzOiBzY2hlbWFCb25lR3JvdXAuc3RpZmZpbmVzcyxcbiAgICAgICAgICBncmF2aXR5RGlyLFxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIHByZXBhcmUgY29sbGlkZXJzXG4gICAgICAgIGNvbnN0IGNvbGxpZGVyR3JvdXBzRm9yU3ByaW5nID0gc2NoZW1hQm9uZUdyb3VwLmNvbGxpZGVyR3JvdXBzPy5tYXAoKGlDb2xsaWRlckdyb3VwKSA9PiB7XG4gICAgICAgICAgY29uc3QgZ3JvdXAgPSBjb2xsaWRlckdyb3Vwcz8uW2lDb2xsaWRlckdyb3VwXTtcblxuICAgICAgICAgIGlmIChncm91cCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgIGBWUk1TcHJpbmdCb25lTG9hZGVyUGx1Z2luOiBUaGUgc3ByaW5nICMke2lCb25lR3JvdXB9IGF0dGVtcHRlZCB0byB1c2UgYSBjb2xsaWRlckdyb3VwICR7aUNvbGxpZGVyR3JvdXB9IGJ1dCBub3QgZm91bmRgLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gZ3JvdXA7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGNyZWF0ZSBzcHJpbmcgYm9uZXNcbiAgICAgICAgcm9vdC50cmF2ZXJzZSgobm9kZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNoaWxkOiBUSFJFRS5PYmplY3QzRCB8IG51bGwgPSBub2RlLmNoaWxkcmVuWzBdID8/IG51bGw7XG5cbiAgICAgICAgICBjb25zdCBqb2ludCA9IHRoaXMuX2ltcG9ydEpvaW50KG5vZGUsIGNoaWxkLCBzZXR0aW5nLCBjb2xsaWRlckdyb3Vwc0ZvclNwcmluZyk7XG4gICAgICAgICAgaWYgKGNlbnRlcikge1xuICAgICAgICAgICAgam9pbnQuY2VudGVyID0gY2VudGVyO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIG1hbmFnZXIuYWRkSm9pbnQoam9pbnQpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gaW5pdCBzcHJpbmcgYm9uZXNcbiAgICBnbHRmLnNjZW5lLnVwZGF0ZU1hdHJpeFdvcmxkKCk7XG4gICAgbWFuYWdlci5zZXRJbml0U3RhdGUoKTtcblxuICAgIHJldHVybiBtYW5hZ2VyO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW1wb3J0Sm9pbnQoXG4gICAgbm9kZTogVEhSRUUuT2JqZWN0M0QsXG4gICAgY2hpbGQ6IFRIUkVFLk9iamVjdDNELFxuICAgIHNldHRpbmc/OiBQYXJ0aWFsPFZSTVNwcmluZ0JvbmVKb2ludFNldHRpbmdzPixcbiAgICBjb2xsaWRlckdyb3Vwc0ZvclNwcmluZz86IFZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwW10sXG4gICk6IFZSTVNwcmluZ0JvbmVKb2ludCB7XG4gICAgY29uc3Qgc3ByaW5nQm9uZSA9IG5ldyBWUk1TcHJpbmdCb25lSm9pbnQobm9kZSwgY2hpbGQsIHNldHRpbmcsIGNvbGxpZGVyR3JvdXBzRm9yU3ByaW5nKTtcblxuICAgIGlmICh0aGlzLmpvaW50SGVscGVyUm9vdCkge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IFZSTVNwcmluZ0JvbmVKb2ludEhlbHBlcihzcHJpbmdCb25lKTtcbiAgICAgIHRoaXMuam9pbnRIZWxwZXJSb290LmFkZChoZWxwZXIpO1xuICAgICAgaGVscGVyLnJlbmRlck9yZGVyID0gdGhpcy5qb2ludEhlbHBlclJvb3QucmVuZGVyT3JkZXI7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNwcmluZ0JvbmU7XG4gIH1cblxuICBwcml2YXRlIF9pbXBvcnRTcGhlcmVDb2xsaWRlcihcbiAgICBkZXN0aW5hdGlvbjogVEhSRUUuT2JqZWN0M0QsXG4gICAgcGFyYW1zOiB7XG4gICAgICBvZmZzZXQ6IFRIUkVFLlZlY3RvcjM7XG4gICAgICByYWRpdXM6IG51bWJlcjtcbiAgICAgIGluc2lkZTogYm9vbGVhbjtcbiAgICB9LFxuICApOiBWUk1TcHJpbmdCb25lQ29sbGlkZXIge1xuICAgIGNvbnN0IHNoYXBlID0gbmV3IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlU3BoZXJlKHBhcmFtcyk7XG5cbiAgICBjb25zdCBjb2xsaWRlciA9IG5ldyBWUk1TcHJpbmdCb25lQ29sbGlkZXIoc2hhcGUpO1xuXG4gICAgZGVzdGluYXRpb24uYWRkKGNvbGxpZGVyKTtcblxuICAgIGlmICh0aGlzLmNvbGxpZGVySGVscGVyUm9vdCkge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IFZSTVNwcmluZ0JvbmVDb2xsaWRlckhlbHBlcihjb2xsaWRlcik7XG4gICAgICB0aGlzLmNvbGxpZGVySGVscGVyUm9vdC5hZGQoaGVscGVyKTtcbiAgICAgIGhlbHBlci5yZW5kZXJPcmRlciA9IHRoaXMuY29sbGlkZXJIZWxwZXJSb290LnJlbmRlck9yZGVyO1xuICAgIH1cblxuICAgIHJldHVybiBjb2xsaWRlcjtcbiAgfVxuXG4gIHByaXZhdGUgX2ltcG9ydENhcHN1bGVDb2xsaWRlcihcbiAgICBkZXN0aW5hdGlvbjogVEhSRUUuT2JqZWN0M0QsXG4gICAgcGFyYW1zOiB7XG4gICAgICBvZmZzZXQ6IFRIUkVFLlZlY3RvcjM7XG4gICAgICByYWRpdXM6IG51bWJlcjtcbiAgICAgIHRhaWw6IFRIUkVFLlZlY3RvcjM7XG4gICAgICBpbnNpZGU6IGJvb2xlYW47XG4gICAgfSxcbiAgKTogVlJNU3ByaW5nQm9uZUNvbGxpZGVyIHtcbiAgICBjb25zdCBzaGFwZSA9IG5ldyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZUNhcHN1bGUocGFyYW1zKTtcblxuICAgIGNvbnN0IGNvbGxpZGVyID0gbmV3IFZSTVNwcmluZ0JvbmVDb2xsaWRlcihzaGFwZSk7XG5cbiAgICBkZXN0aW5hdGlvbi5hZGQoY29sbGlkZXIpO1xuXG4gICAgaWYgKHRoaXMuY29sbGlkZXJIZWxwZXJSb290KSB7XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgVlJNU3ByaW5nQm9uZUNvbGxpZGVySGVscGVyKGNvbGxpZGVyKTtcbiAgICAgIHRoaXMuY29sbGlkZXJIZWxwZXJSb290LmFkZChoZWxwZXIpO1xuICAgICAgaGVscGVyLnJlbmRlck9yZGVyID0gdGhpcy5jb2xsaWRlckhlbHBlclJvb3QucmVuZGVyT3JkZXI7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbGxpZGVyO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW1wb3J0UGxhbmVDb2xsaWRlcihcbiAgICBkZXN0aW5hdGlvbjogVEhSRUUuT2JqZWN0M0QsXG4gICAgcGFyYW1zOiB7XG4gICAgICBvZmZzZXQ6IFRIUkVFLlZlY3RvcjM7XG4gICAgICBub3JtYWw6IFRIUkVFLlZlY3RvcjM7XG4gICAgfSxcbiAgKTogVlJNU3ByaW5nQm9uZUNvbGxpZGVyIHtcbiAgICBjb25zdCBzaGFwZSA9IG5ldyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZVBsYW5lKHBhcmFtcyk7XG5cbiAgICBjb25zdCBjb2xsaWRlciA9IG5ldyBWUk1TcHJpbmdCb25lQ29sbGlkZXIoc2hhcGUpO1xuXG4gICAgZGVzdGluYXRpb24uYWRkKGNvbGxpZGVyKTtcblxuICAgIGlmICh0aGlzLmNvbGxpZGVySGVscGVyUm9vdCkge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IFZSTVNwcmluZ0JvbmVDb2xsaWRlckhlbHBlcihjb2xsaWRlcik7XG4gICAgICB0aGlzLmNvbGxpZGVySGVscGVyUm9vdC5hZGQoaGVscGVyKTtcbiAgICAgIGhlbHBlci5yZW5kZXJPcmRlciA9IHRoaXMuY29sbGlkZXJIZWxwZXJSb290LnJlbmRlck9yZGVyO1xuICAgIH1cblxuICAgIHJldHVybiBjb2xsaWRlcjtcbiAgfVxufVxuIiwgImltcG9ydCB0eXBlICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG5leHBvcnQgZnVuY3Rpb24gdHJhdmVyc2VBbmNlc3RvcnNGcm9tUm9vdChvYmplY3Q6IFRIUkVFLk9iamVjdDNELCBjYWxsYmFjazogKG9iamVjdDogVEhSRUUuT2JqZWN0M0QpID0+IHZvaWQpOiB2b2lkIHtcbiAgY29uc3QgYW5jZXN0b3JzOiBUSFJFRS5PYmplY3QzRFtdID0gW107XG5cbiAgbGV0IGhlYWQ6IFRIUkVFLk9iamVjdDNEIHwgbnVsbCA9IG9iamVjdDtcbiAgd2hpbGUgKGhlYWQgIT09IG51bGwpIHtcbiAgICBhbmNlc3RvcnMudW5zaGlmdChoZWFkKTtcbiAgICBoZWFkID0gaGVhZC5wYXJlbnQ7XG4gIH1cblxuICBhbmNlc3RvcnMuZm9yRWFjaCgoYW5jZXN0b3IpID0+IHtcbiAgICBjYWxsYmFjayhhbmNlc3Rvcik7XG4gIH0pO1xufVxuIiwgImltcG9ydCB0eXBlICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIFRyYXZlcnNlIGNoaWxkcmVuIG9mIGdpdmVuIG9iamVjdCBhbmQgZXhlY3V0ZSBnaXZlbiBjYWxsYmFjay5cbiAqIFRoZSBnaXZlbiBvYmplY3QgaXRzZWxmIHdvbnQgYmUgZ2l2ZW4gdG8gdGhlIGNhbGxiYWNrLlxuICogSWYgdGhlIHJldHVybiB2YWx1ZSBvZiB0aGUgY2FsbGJhY2sgaXMgYHRydWVgLCBpdCB3aWxsIGhhbHQgdGhlIHRyYXZlcnNhbCBvZiBpdHMgY2hpbGRyZW4uXG4gKiBAcGFyYW0gb2JqZWN0IEEgcm9vdCBvYmplY3RcbiAqIEBwYXJhbSBjYWxsYmFjayBBIGNhbGxiYWNrIGZ1bmN0aW9uIGNhbGxlZCBmb3IgZWFjaCBjaGlsZHJlblxuICovXG5leHBvcnQgZnVuY3Rpb24gdHJhdmVyc2VDaGlsZHJlblVudGlsQ29uZGl0aW9uTWV0KFxuICBvYmplY3Q6IFRIUkVFLk9iamVjdDNELFxuICBjYWxsYmFjazogKG9iamVjdDogVEhSRUUuT2JqZWN0M0QpID0+IGJvb2xlYW4sXG4pOiB2b2lkIHtcbiAgb2JqZWN0LmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gY2FsbGJhY2soY2hpbGQpO1xuICAgIGlmICghcmVzdWx0KSB7XG4gICAgICB0cmF2ZXJzZUNoaWxkcmVuVW50aWxDb25kaXRpb25NZXQoY2hpbGQsIGNhbGxiYWNrKTtcbiAgICB9XG4gIH0pO1xufVxuIiwgImltcG9ydCB0eXBlICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIEZpbmRzIHRoZSBsb3dlc3QgY29tbW9uIGFuY2VzdG9ycyBvZiB0aGUgZ2l2ZW4gb2JqZWN0cywgaWYgaXQgZXhpc3RzLlxuICogQHBhcmFtIG9iamVjdHMgVGhlIG9iamVjdHMgdG8gZmluZCB0aGUgbG93ZXN0IGNvbW1vbiBhbmNlc3RvciBmb3IuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsb3dlc3RDb21tb25BbmNlc3RvcihvYmplY3RzOiBTZXQ8VEhSRUUuT2JqZWN0M0Q+KTogVEhSRUUuT2JqZWN0M0QgfCBudWxsIHtcbiAgY29uc3Qgc2hhcmVkQW5jZXN0b3JzID0gbmV3IE1hcDxUSFJFRS5PYmplY3QzRCwgbnVtYmVyPigpO1xuICBmb3IgKGNvbnN0IG9iamVjdCBvZiBvYmplY3RzKSB7XG4gICAgbGV0IGN1cnJlbnQ6IFRIUkVFLk9iamVjdDNEIHwgbnVsbCA9IG9iamVjdDtcbiAgICBkbyB7XG4gICAgICBjb25zdCBuZXdWYWx1ZSA9IChzaGFyZWRBbmNlc3RvcnMuZ2V0KGN1cnJlbnQpID8/IDApICsgMTtcbiAgICAgIGlmIChuZXdWYWx1ZSA9PT0gb2JqZWN0cy5zaXplKSB7XG4gICAgICAgIHJldHVybiBjdXJyZW50O1xuICAgICAgfVxuICAgICAgc2hhcmVkQW5jZXN0b3JzLnNldChjdXJyZW50LCBuZXdWYWx1ZSk7XG4gICAgICBjdXJyZW50ID0gY3VycmVudC5wYXJlbnQ7XG4gICAgfSB3aGlsZSAoY3VycmVudCAhPT0gbnVsbCk7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG4iLCAiaW1wb3J0IHR5cGUgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgdHlwZSB7IFZSTVNwcmluZ0JvbmVKb2ludCB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUpvaW50LmpzJztcbmltcG9ydCB7IHRyYXZlcnNlQW5jZXN0b3JzRnJvbVJvb3QgfSBmcm9tICcuL3V0aWxzL3RyYXZlcnNlQW5jZXN0b3JzRnJvbVJvb3QuanMnO1xuaW1wb3J0IHR5cGUgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXIgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVDb2xsaWRlci5qcyc7XG5pbXBvcnQgdHlwZSB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cC5qcyc7XG5pbXBvcnQgeyB0cmF2ZXJzZUNoaWxkcmVuVW50aWxDb25kaXRpb25NZXQgfSBmcm9tICcuL3V0aWxzL3RyYXZlcnNlQ2hpbGRyZW5VbnRpbENvbmRpdGlvbk1ldC5qcyc7XG5pbXBvcnQgeyBsb3dlc3RDb21tb25BbmNlc3RvciB9IGZyb20gJy4vdXRpbHMvbG93ZXN0Q29tbW9uQW5jZXN0b3IuanMnO1xuXG5leHBvcnQgY2xhc3MgVlJNU3ByaW5nQm9uZU1hbmFnZXIge1xuICBwcml2YXRlIF9qb2ludHMgPSBuZXcgU2V0PFZSTVNwcmluZ0JvbmVKb2ludD4oKTtcbiAgcHJpdmF0ZSBfc29ydGVkSm9pbnRzOiBBcnJheTxWUk1TcHJpbmdCb25lSm9pbnQ+ID0gW107XG4gIHByaXZhdGUgX2hhc1dhcm5lZENpcmN1bGFyRGVwZW5kZW5jeSA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBBbiBvcmRlcmVkIGxpc3Qgb2YgYW5jZXN0b3JzIG9mIGFsbCB0aGUgU3ByaW5nQm9uZSBqb2ludHMuIEJlZm9yZSB0aGVcbiAgICogU3ByaW5nQm9uZSBqb2ludHMgY2FuIGJlIHVwZGF0ZWQsIHRoZSB3b3JsZCBtYXRyaWNlcyBvZiB0aGVzZSBhbmNlc3RvcnNcbiAgICogbXVzdCBiZSBjYWxjdWxhdGVkLiBUaGUgZmlyc3QgZWxlbWVudCBpcyB0aGUgbG93ZXN0IGNvbW1vbiBhbmNlc3RvciwgZm9yXG4gICAqIHdoaWNoIG5vdCBvbmx5IGl0cyB3b3JsZCBtYXRyaXggYnV0IGl0cyBhbmNlc3RvcnMnIHdvcmxkIG1hdHJpY2VzIGFyZVxuICAgKiB1cGRhdGVkIGFzIHdlbGwuXG4gICAqL1xuICBwcml2YXRlIF9hbmNlc3RvcnM6IFRIUkVFLk9iamVjdDNEW10gPSBbXTtcblxuICBwdWJsaWMgZ2V0IGpvaW50cygpOiBTZXQ8VlJNU3ByaW5nQm9uZUpvaW50PiB7XG4gICAgcmV0dXJuIHRoaXMuX2pvaW50cztcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBVc2Uge0BsaW5rIGpvaW50c30gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBnZXQgc3ByaW5nQm9uZXMoKTogU2V0PFZSTVNwcmluZ0JvbmVKb2ludD4ge1xuICAgIGNvbnNvbGUud2FybignVlJNU3ByaW5nQm9uZU1hbmFnZXI6IHNwcmluZ0JvbmVzIGlzIGRlcHJlY2F0ZWQuIHVzZSBqb2ludHMgaW5zdGVhZC4nKTtcblxuICAgIHJldHVybiB0aGlzLl9qb2ludHM7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGNvbGxpZGVyR3JvdXBzKCk6IFZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwW10ge1xuICAgIGNvbnN0IHNldCA9IG5ldyBTZXQ8VlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXA+KCk7XG4gICAgdGhpcy5fam9pbnRzLmZvckVhY2goKHNwcmluZ0JvbmUpID0+IHtcbiAgICAgIHNwcmluZ0JvbmUuY29sbGlkZXJHcm91cHMuZm9yRWFjaCgoY29sbGlkZXJHcm91cCkgPT4ge1xuICAgICAgICBzZXQuYWRkKGNvbGxpZGVyR3JvdXApO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oc2V0KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgY29sbGlkZXJzKCk6IFZSTVNwcmluZ0JvbmVDb2xsaWRlcltdIHtcbiAgICBjb25zdCBzZXQgPSBuZXcgU2V0PFZSTVNwcmluZ0JvbmVDb2xsaWRlcj4oKTtcbiAgICB0aGlzLmNvbGxpZGVyR3JvdXBzLmZvckVhY2goKGNvbGxpZGVyR3JvdXApID0+IHtcbiAgICAgIGNvbGxpZGVyR3JvdXAuY29sbGlkZXJzLmZvckVhY2goKGNvbGxpZGVyKSA9PiB7XG4gICAgICAgIHNldC5hZGQoY29sbGlkZXIpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oc2V0KTtcbiAgfVxuXG4gIHByaXZhdGUgX29iamVjdFNwcmluZ0JvbmVzTWFwID0gbmV3IE1hcDxUSFJFRS5PYmplY3QzRCwgU2V0PFZSTVNwcmluZ0JvbmVKb2ludD4+KCk7XG4gIHByaXZhdGUgX2lzU29ydGVkSm9pbnRzRGlydHkgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9yZWxldmFudENoaWxkcmVuVXBkYXRlZCA9IHRoaXMuX3JlbGV2YW50Q2hpbGRyZW5VcGRhdGVkLmJpbmQodGhpcyk7XG4gIH1cblxuICBwdWJsaWMgYWRkSm9pbnQoam9pbnQ6IFZSTVNwcmluZ0JvbmVKb2ludCk6IHZvaWQge1xuICAgIHRoaXMuX2pvaW50cy5hZGQoam9pbnQpO1xuXG4gICAgbGV0IG9iamVjdFNldCA9IHRoaXMuX29iamVjdFNwcmluZ0JvbmVzTWFwLmdldChqb2ludC5ib25lKTtcbiAgICBpZiAob2JqZWN0U2V0ID09IG51bGwpIHtcbiAgICAgIG9iamVjdFNldCA9IG5ldyBTZXQ8VlJNU3ByaW5nQm9uZUpvaW50PigpO1xuICAgICAgdGhpcy5fb2JqZWN0U3ByaW5nQm9uZXNNYXAuc2V0KGpvaW50LmJvbmUsIG9iamVjdFNldCk7XG4gICAgfVxuICAgIG9iamVjdFNldC5hZGQoam9pbnQpO1xuXG4gICAgdGhpcy5faXNTb3J0ZWRKb2ludHNEaXJ0eSA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVXNlIHtAbGluayBhZGRKb2ludH0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBhZGRTcHJpbmdCb25lKGpvaW50OiBWUk1TcHJpbmdCb25lSm9pbnQpOiB2b2lkIHtcbiAgICBjb25zb2xlLndhcm4oJ1ZSTVNwcmluZ0JvbmVNYW5hZ2VyOiBhZGRTcHJpbmdCb25lKCkgaXMgZGVwcmVjYXRlZC4gdXNlIGFkZEpvaW50KCkgaW5zdGVhZC4nKTtcblxuICAgIHRoaXMuYWRkSm9pbnQoam9pbnQpO1xuICB9XG5cbiAgcHVibGljIGRlbGV0ZUpvaW50KGpvaW50OiBWUk1TcHJpbmdCb25lSm9pbnQpOiB2b2lkIHtcbiAgICB0aGlzLl9qb2ludHMuZGVsZXRlKGpvaW50KTtcblxuICAgIGNvbnN0IG9iamVjdFNldCA9IHRoaXMuX29iamVjdFNwcmluZ0JvbmVzTWFwLmdldChqb2ludC5ib25lKSE7XG4gICAgb2JqZWN0U2V0LmRlbGV0ZShqb2ludCk7XG5cbiAgICB0aGlzLl9pc1NvcnRlZEpvaW50c0RpcnR5ID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBVc2Uge0BsaW5rIGRlbGV0ZUpvaW50fSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIGRlbGV0ZVNwcmluZ0JvbmUoam9pbnQ6IFZSTVNwcmluZ0JvbmVKb2ludCk6IHZvaWQge1xuICAgIGNvbnNvbGUud2FybignVlJNU3ByaW5nQm9uZU1hbmFnZXI6IGRlbGV0ZVNwcmluZ0JvbmUoKSBpcyBkZXByZWNhdGVkLiB1c2UgZGVsZXRlSm9pbnQoKSBpbnN0ZWFkLicpO1xuXG4gICAgdGhpcy5kZWxldGVKb2ludChqb2ludCk7XG4gIH1cblxuICBwdWJsaWMgc2V0SW5pdFN0YXRlKCk6IHZvaWQge1xuICAgIHRoaXMuX3NvcnRKb2ludHMoKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fc29ydGVkSm9pbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBzcHJpbmdCb25lID0gdGhpcy5fc29ydGVkSm9pbnRzW2ldO1xuICAgICAgc3ByaW5nQm9uZS5ib25lLnVwZGF0ZU1hdHJpeCgpO1xuICAgICAgc3ByaW5nQm9uZS5ib25lLnVwZGF0ZVdvcmxkTWF0cml4KGZhbHNlLCBmYWxzZSk7XG4gICAgICBzcHJpbmdCb25lLnNldEluaXRTdGF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLl9zb3J0Sm9pbnRzKCk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3NvcnRlZEpvaW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgc3ByaW5nQm9uZSA9IHRoaXMuX3NvcnRlZEpvaW50c1tpXTtcbiAgICAgIHNwcmluZ0JvbmUuYm9uZS51cGRhdGVNYXRyaXgoKTtcbiAgICAgIHNwcmluZ0JvbmUuYm9uZS51cGRhdGVXb3JsZE1hdHJpeChmYWxzZSwgZmFsc2UpO1xuICAgICAgc3ByaW5nQm9uZS5yZXNldCgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX3NvcnRKb2ludHMoKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fYW5jZXN0b3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLl9hbmNlc3RvcnNbaV0udXBkYXRlV29ybGRNYXRyaXgoaSA9PT0gMCwgZmFsc2UpO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fc29ydGVkSm9pbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAvLyB1cGRhdGUgdGhlIHNwcmluZ2JvbmVcbiAgICAgIGNvbnN0IHNwcmluZ0JvbmUgPSB0aGlzLl9zb3J0ZWRKb2ludHNbaV07XG4gICAgICBzcHJpbmdCb25lLmJvbmUudXBkYXRlTWF0cml4KCk7XG4gICAgICBzcHJpbmdCb25lLmJvbmUudXBkYXRlV29ybGRNYXRyaXgoZmFsc2UsIGZhbHNlKTtcbiAgICAgIHNwcmluZ0JvbmUudXBkYXRlKGRlbHRhKTtcblxuICAgICAgLy8gdXBkYXRlIGNoaWxkcmVuIHdvcmxkIG1hdHJpY2VzXG4gICAgICAvLyBpdCBpcyByZXF1aXJlZCB3aGVuIHRoZSBzcHJpbmcgYm9uZSBjaGFpbiBpcyBzcGFyc2VcbiAgICAgIHRyYXZlcnNlQ2hpbGRyZW5VbnRpbENvbmRpdGlvbk1ldChzcHJpbmdCb25lLmJvbmUsIHRoaXMuX3JlbGV2YW50Q2hpbGRyZW5VcGRhdGVkKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU29ydHMgdGhlIGpvaW50cyBlbnN1cmluZyB0aGV5IGFyZSB1cGRhdGVkIGluIHRoZSBjb3JyZWN0IG9yZGVyIHRha2luZyBkZXBlbmRlbmNpZXMgaW50byBhY2NvdW50LlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCB1cGRhdGVzIHtAbGluayBfc29ydGVkSm9pbnRzfSBhbmQge0BsaW5rIF9hbmNlc3RvcnN9LlxuICAgKiBNYWtlIHN1cmUgdG8gY2FsbCB0aGlzIGJlZm9yZSB1c2luZyB0aGVtLlxuICAgKi9cbiAgcHJpdmF0ZSBfc29ydEpvaW50cygpIHtcbiAgICBpZiAoIXRoaXMuX2lzU29ydGVkSm9pbnRzRGlydHkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBzcHJpbmdCb25lT3JkZXI6IEFycmF5PFZSTVNwcmluZ0JvbmVKb2ludD4gPSBbXTtcbiAgICBjb25zdCBzcHJpbmdCb25lc1RyaWVkID0gbmV3IFNldDxWUk1TcHJpbmdCb25lSm9pbnQ+KCk7XG4gICAgY29uc3Qgc3ByaW5nQm9uZXNEb25lID0gbmV3IFNldDxWUk1TcHJpbmdCb25lSm9pbnQ+KCk7XG4gICAgY29uc3QgYW5jZXN0b3JzID0gbmV3IFNldDxUSFJFRS5PYmplY3QzRD4oKTtcblxuICAgIGZvciAoY29uc3Qgc3ByaW5nQm9uZSBvZiB0aGlzLl9qb2ludHMpIHtcbiAgICAgIHRoaXMuX2luc2VydEpvaW50U29ydChzcHJpbmdCb25lLCBzcHJpbmdCb25lc1RyaWVkLCBzcHJpbmdCb25lc0RvbmUsIHNwcmluZ0JvbmVPcmRlciwgYW5jZXN0b3JzKTtcbiAgICB9XG4gICAgdGhpcy5fc29ydGVkSm9pbnRzID0gc3ByaW5nQm9uZU9yZGVyO1xuXG4gICAgY29uc3QgbGNhID0gbG93ZXN0Q29tbW9uQW5jZXN0b3IoYW5jZXN0b3JzKTtcbiAgICB0aGlzLl9hbmNlc3RvcnMgPSBbXTtcbiAgICBpZiAobGNhKSB7XG4gICAgICB0aGlzLl9hbmNlc3RvcnMucHVzaChsY2EpO1xuICAgICAgdHJhdmVyc2VDaGlsZHJlblVudGlsQ29uZGl0aW9uTWV0KGxjYSwgKG9iamVjdDogVEhSRUUuT2JqZWN0M0QpID0+IHtcbiAgICAgICAgLy8gaWYgdGhlIG9iamVjdCBoYXMgYXR0YWNoZWQgc3ByaW5nYm9uZSwgaGFsdCB0aGUgdHJhdmVyc2FsXG4gICAgICAgIGlmICgodGhpcy5fb2JqZWN0U3ByaW5nQm9uZXNNYXAuZ2V0KG9iamVjdCk/LnNpemUgPz8gMCkgPiAwKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fYW5jZXN0b3JzLnB1c2gob2JqZWN0KTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5faXNTb3J0ZWRKb2ludHNEaXJ0eSA9IGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5zZXJ0Sm9pbnRTb3J0KFxuICAgIHNwcmluZ0JvbmU6IFZSTVNwcmluZ0JvbmVKb2ludCxcbiAgICBzcHJpbmdCb25lc1RyaWVkOiBTZXQ8VlJNU3ByaW5nQm9uZUpvaW50PixcbiAgICBzcHJpbmdCb25lc0RvbmU6IFNldDxWUk1TcHJpbmdCb25lSm9pbnQ+LFxuICAgIHNwcmluZ0JvbmVPcmRlcjogQXJyYXk8VlJNU3ByaW5nQm9uZUpvaW50PixcbiAgICBhbmNlc3RvcnM6IFNldDxUSFJFRS5PYmplY3QzRD4sXG4gICkge1xuICAgIGlmIChzcHJpbmdCb25lc0RvbmUuaGFzKHNwcmluZ0JvbmUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHNwcmluZ0JvbmVzVHJpZWQuaGFzKHNwcmluZ0JvbmUpKSB7XG4gICAgICBpZiAoIXRoaXMuX2hhc1dhcm5lZENpcmN1bGFyRGVwZW5kZW5jeSkge1xuICAgICAgICBjb25zb2xlLndhcm4oJ1ZSTVNwcmluZ0JvbmVNYW5hZ2VyOiBDaXJjdWxhciBkZXBlbmRlbmN5IGRldGVjdGVkJyk7XG4gICAgICAgIHRoaXMuX2hhc1dhcm5lZENpcmN1bGFyRGVwZW5kZW5jeSA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc3ByaW5nQm9uZXNUcmllZC5hZGQoc3ByaW5nQm9uZSk7XG5cbiAgICBjb25zdCBkZXBPYmplY3RzID0gc3ByaW5nQm9uZS5kZXBlbmRlbmNpZXM7XG4gICAgZm9yIChjb25zdCBkZXBPYmplY3Qgb2YgZGVwT2JqZWN0cykge1xuICAgICAgbGV0IGVuY291bnRlcmVkU3ByaW5nQm9uZSA9IGZhbHNlO1xuICAgICAgbGV0IGFuY2VzdG9yOiBUSFJFRS5PYmplY3QzRCB8IG51bGwgPSBudWxsO1xuICAgICAgdHJhdmVyc2VBbmNlc3RvcnNGcm9tUm9vdChkZXBPYmplY3QsIChkZXBPYmplY3RBbmNlc3RvcikgPT4ge1xuICAgICAgICBjb25zdCBvYmplY3RTZXQgPSB0aGlzLl9vYmplY3RTcHJpbmdCb25lc01hcC5nZXQoZGVwT2JqZWN0QW5jZXN0b3IpO1xuICAgICAgICBpZiAob2JqZWN0U2V0KSB7XG4gICAgICAgICAgZm9yIChjb25zdCBkZXBTcHJpbmdCb25lIG9mIG9iamVjdFNldCkge1xuICAgICAgICAgICAgZW5jb3VudGVyZWRTcHJpbmdCb25lID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX2luc2VydEpvaW50U29ydChkZXBTcHJpbmdCb25lLCBzcHJpbmdCb25lc1RyaWVkLCBzcHJpbmdCb25lc0RvbmUsIHNwcmluZ0JvbmVPcmRlciwgYW5jZXN0b3JzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoIWVuY291bnRlcmVkU3ByaW5nQm9uZSkge1xuICAgICAgICAgIC8vIFRoaXMgb2JqZWN0IGlzIGFuIGFuY2VzdG9yIG9mIGEgc3ByaW5nIGJvbmUsIGJ1dCBpcyBOT1QgYSBzcGFyc2Ugbm9kZSBpbiBiZXR3ZWVuIHNwcmluZyBib25lcy5cbiAgICAgICAgICBhbmNlc3RvciA9IGRlcE9iamVjdEFuY2VzdG9yO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmIChhbmNlc3Rvcikge1xuICAgICAgICBhbmNlc3RvcnMuYWRkKGFuY2VzdG9yKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzcHJpbmdCb25lT3JkZXIucHVzaChzcHJpbmdCb25lKTtcblxuICAgIHNwcmluZ0JvbmVzRG9uZS5hZGQoc3ByaW5nQm9uZSk7XG4gIH1cblxuICBwcml2YXRlIF9yZWxldmFudENoaWxkcmVuVXBkYXRlZChvYmplY3Q6IFRIUkVFLk9iamVjdDNEKSB7XG4gICAgLy8gaWYgdGhlIG9iamVjdCBoYXMgYXR0YWNoZWQgc3ByaW5nYm9uZSwgaGFsdCB0aGUgdHJhdmVyc2FsXG4gICAgaWYgKCh0aGlzLl9vYmplY3RTcHJpbmdCb25lc01hcC5nZXQob2JqZWN0KT8uc2l6ZSA/PyAwKSA+IDApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIG90aGVyd2lzZSB1cGRhdGUgaXRzIHdvcmxkIG1hdHJpeFxuICAgIG9iamVjdC51cGRhdGVXb3JsZE1hdHJpeChmYWxzZSwgZmFsc2UpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsWUFBWUEsWUFBVzs7O0FDQXZCLFlBQVksV0FBVzs7O0FDS2hCLElBQWUsNkJBQWYsTUFBMEM7QUEyQmpEOzs7QUQ3QkEsSUFBTSxPQUFPLElBQVUsY0FBUTtBQUMvQixJQUFNLE9BQU8sSUFBVSxjQUFRO0FBRXhCLElBQU0sb0NBQU4sY0FBZ0QsMkJBQTJCO0FBQUEsRUFDaEYsSUFBVyxPQUFrQjtBQUMzQixXQUFPO0FBQUEsRUFDVDtBQUFBLEVBc0JPLFlBQVksUUFBOEY7QUEvQm5IO0FBZ0NJLFVBQU07QUFFTixTQUFLLFVBQVMsc0NBQVEsV0FBUixZQUFrQixJQUFVLGNBQVEsR0FBSyxHQUFLLENBQUc7QUFDL0QsU0FBSyxRQUFPLHNDQUFRLFNBQVIsWUFBZ0IsSUFBVSxjQUFRLEdBQUssR0FBSyxDQUFHO0FBQzNELFNBQUssVUFBUyxzQ0FBUSxXQUFSLFlBQWtCO0FBQ2hDLFNBQUssVUFBUyxzQ0FBUSxXQUFSLFlBQWtCO0FBQUEsRUFDbEM7QUFBQSxFQUVPLG1CQUNMLGdCQUNBLGdCQUNBLGNBQ0EsUUFDUTtBQUNSLFNBQUssc0JBQXNCLGNBQWM7QUFDekMsU0FBSyxXQUFXLEtBQUssTUFBTSxLQUFLLE1BQU0sRUFBRSxhQUFhLGNBQWM7QUFDbkUsU0FBSyxJQUFJLElBQUk7QUFDYixVQUFNLGtCQUFrQixLQUFLLFNBQVM7QUFFdEMsV0FBTyxLQUFLLGNBQWMsRUFBRSxJQUFJLElBQUk7QUFDcEMsVUFBTSxNQUFNLEtBQUssSUFBSSxNQUFNO0FBRTNCLFFBQUksT0FBTyxHQUFLO0FBQUEsSUFHaEIsV0FBVyxtQkFBbUIsS0FBSztBQUVqQyxhQUFPLElBQUksSUFBSTtBQUFBLElBQ2pCLE9BQU87QUFFTCxXQUFLLGVBQWUsTUFBTSxlQUFlO0FBQ3pDLGFBQU8sSUFBSSxJQUFJO0FBQUEsSUFDakI7QUFFQSxVQUFNLFNBQVMsT0FBTyxPQUFPO0FBQzdCLFVBQU0sV0FBVyxLQUFLLFNBQVMsS0FBSyxTQUFTLGVBQWUsU0FBUyxTQUFTLGVBQWUsS0FBSztBQUVsRyxRQUFJLFdBQVcsR0FBRztBQUNoQixhQUFPLGVBQWUsSUFBSSxNQUFNO0FBQ2hDLFVBQUksS0FBSyxRQUFRO0FBQ2YsZUFBTyxPQUFPO0FBQUEsTUFDaEI7QUFBQSxJQUNGO0FBRUEsV0FBTztBQUFBLEVBQ1Q7QUFDRjs7O0FFOUVBLFlBQVlDLFlBQVc7QUFHdkIsSUFBTUMsUUFBTyxJQUFVLGVBQVE7QUFDL0IsSUFBTSxTQUFTLElBQVUsZUFBUTtBQUUxQixJQUFNLGtDQUFOLGNBQThDLDJCQUEyQjtBQUFBLEVBQzlFLElBQVcsT0FBZ0I7QUFDekIsV0FBTztBQUFBLEVBQ1Q7QUFBQSxFQVlPLFlBQVksUUFBNkQ7QUFyQmxGO0FBc0JJLFVBQU07QUFFTixTQUFLLFVBQVMsc0NBQVEsV0FBUixZQUFrQixJQUFVLGVBQVEsR0FBSyxHQUFLLENBQUc7QUFDL0QsU0FBSyxVQUFTLHNDQUFRLFdBQVIsWUFBa0IsSUFBVSxlQUFRLEdBQUssR0FBSyxDQUFHO0FBQUEsRUFDakU7QUFBQSxFQUVPLG1CQUNMLGdCQUNBLGdCQUNBLGNBQ0EsUUFDUTtBQUNSLFdBQU8sc0JBQXNCLGNBQWM7QUFDM0MsV0FBTyxPQUFPLEVBQUUsSUFBSSxjQUFjO0FBRWxDLFdBQU8sZ0JBQWdCLGNBQWM7QUFDckMsSUFBQUEsTUFBSyxLQUFLLEtBQUssTUFBTSxFQUFFLGtCQUFrQixNQUFNLEVBQUUsVUFBVTtBQUMzRCxVQUFNLFdBQVcsT0FBTyxJQUFJQSxLQUFJLElBQUk7QUFFcEMsV0FBTyxLQUFLQSxLQUFJO0FBRWhCLFdBQU87QUFBQSxFQUNUO0FBQ0Y7OztBQzdDQSxZQUFZQyxZQUFXO0FBR3ZCLElBQU1DLFFBQU8sSUFBVSxlQUFRO0FBRXhCLElBQU0sbUNBQU4sY0FBK0MsMkJBQTJCO0FBQUEsRUFDL0UsSUFBVyxPQUFpQjtBQUMxQixXQUFPO0FBQUEsRUFDVDtBQUFBLEVBaUJPLFlBQVksUUFBd0U7QUF6QjdGO0FBMEJJLFVBQU07QUFFTixTQUFLLFVBQVMsc0NBQVEsV0FBUixZQUFrQixJQUFVLGVBQVEsR0FBSyxHQUFLLENBQUc7QUFDL0QsU0FBSyxVQUFTLHNDQUFRLFdBQVIsWUFBa0I7QUFDaEMsU0FBSyxVQUFTLHNDQUFRLFdBQVIsWUFBa0I7QUFBQSxFQUNsQztBQUFBLEVBRU8sbUJBQ0wsZ0JBQ0EsZ0JBQ0EsY0FDQSxRQUNRO0FBQ1IsV0FBTyxXQUFXLGdCQUFnQkEsTUFBSyxzQkFBc0IsY0FBYyxDQUFDO0FBRTVFLFVBQU0sU0FBUyxPQUFPLE9BQU87QUFDN0IsVUFBTSxXQUFXLEtBQUssU0FBUyxLQUFLLFNBQVMsZUFBZSxTQUFTLFNBQVMsZUFBZSxLQUFLO0FBRWxHLFFBQUksV0FBVyxHQUFHO0FBQ2hCLGFBQU8sZUFBZSxJQUFJLE1BQU07QUFDaEMsVUFBSSxLQUFLLFFBQVE7QUFDZixlQUFPLE9BQU87QUFBQSxNQUNoQjtBQUFBLElBQ0Y7QUFFQSxXQUFPO0FBQUEsRUFDVDtBQUNGOzs7QUNyREEsWUFBWUMsWUFBVztBQUl2QixJQUFNQyxRQUFPLElBQVUsZUFBUTtBQUV4QixJQUFNLHFDQUFOLGNBQXVELHNCQUFzRDtBQUFBLEVBVTNHLFlBQVksT0FBMEM7QUFDM0QsVUFBTTtBQVZSLFNBQU8sYUFBYTtBQUtwQixTQUFRLGlCQUFpQjtBQUN6QixTQUFpQixpQkFBaUIsSUFBVSxlQUFRO0FBQ3BELFNBQWlCLGVBQWUsSUFBVSxlQUFRO0FBS2hELFNBQUssU0FBUztBQUVkLFNBQUssV0FBVyxJQUFVLHVCQUFnQixJQUFJLGFBQWEsR0FBRyxHQUFHLENBQUM7QUFDbEUsU0FBSyxhQUFhLFlBQVksS0FBSyxRQUFRO0FBRTNDLFNBQUssYUFBYSxJQUFVLHVCQUFnQixJQUFJLFlBQVksR0FBRyxHQUFHLENBQUM7QUFDbkUsU0FBSyxTQUFTLEtBQUssVUFBVTtBQUU3QixTQUFLLFlBQVk7QUFDakIsU0FBSyxPQUFPO0FBQUEsRUFDZDtBQUFBLEVBRU8sU0FBZTtBQUNwQixRQUFJLHVCQUF1QjtBQUUzQixVQUFNLFNBQVMsS0FBSyxPQUFPLFNBQVMsS0FBSztBQUN6QyxRQUFJLEtBQUssbUJBQW1CLFFBQVE7QUFDbEMsV0FBSyxpQkFBaUI7QUFDdEIsNkJBQXVCO0FBQUEsSUFDekI7QUFFQSxRQUFJLENBQUMsS0FBSyxlQUFlLE9BQU8sS0FBSyxPQUFPLE1BQU0sR0FBRztBQUNuRCxXQUFLLGVBQWUsS0FBSyxLQUFLLE9BQU8sTUFBTTtBQUMzQyw2QkFBdUI7QUFBQSxJQUN6QjtBQUVBLFVBQU0sT0FBT0EsTUFBSyxLQUFLLEtBQUssT0FBTyxJQUFJLEVBQUUsYUFBYSxLQUFLLFVBQVU7QUFDckUsUUFBSSxLQUFLLGFBQWEsa0JBQWtCLElBQUksSUFBSSxPQUFPO0FBQ3JELFdBQUssYUFBYSxLQUFLLElBQUk7QUFDM0IsNkJBQXVCO0FBQUEsSUFDekI7QUFFQSxRQUFJLHNCQUFzQjtBQUN4QixXQUFLLGVBQWU7QUFBQSxJQUN0QjtBQUFBLEVBQ0Y7QUFBQSxFQUVRLGlCQUF1QjtBQUM3QixJQUFBQSxNQUFLLEtBQUssS0FBSyxZQUFZLEVBQUUsSUFBSSxLQUFLLGNBQWM7QUFDcEQsVUFBTSxJQUFJQSxNQUFLLE9BQU8sSUFBSSxLQUFLO0FBRS9CLGFBQVMsSUFBSSxHQUFHLEtBQUssSUFBSSxLQUFLO0FBQzVCLFlBQU0sSUFBSyxJQUFJLEtBQVEsS0FBSztBQUU1QixXQUFLLFNBQVMsT0FBTyxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBRztBQUN2RCxXQUFLLFNBQVMsT0FBTyxLQUFLLEdBQUcsSUFBSSxLQUFLLElBQUksQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBRztBQUM5RCxXQUFLLFNBQVMsT0FBTyxLQUFLLEdBQUcsQ0FBQyxLQUFLLElBQUksQ0FBQyxHQUFHLEdBQUssQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO0FBQzVELFdBQUssU0FBUyxPQUFPLEtBQUssR0FBRyxJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcsR0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDO0FBQUEsSUFDaEU7QUFFQSxhQUFTLElBQUksR0FBRyxJQUFJLElBQUksS0FBSztBQUMzQixZQUFNLElBQUssSUFBSSxLQUFRLEtBQUs7QUFDNUIsV0FBSyxTQUFTLE9BQU8sS0FBSyxHQUFHLEdBQUssS0FBSyxJQUFJLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxDQUFDO0FBQzFELFdBQUssU0FBUyxPQUFPLE1BQU0sR0FBRyxHQUFHLEtBQUssSUFBSSxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsQ0FBQztBQUFBLElBQzNEO0FBRUEsVUFBTSxRQUFRLEtBQUssTUFBTUEsTUFBSyxHQUFHLEtBQUssS0FBS0EsTUFBSyxJQUFJQSxNQUFLLElBQUlBLE1BQUssSUFBSUEsTUFBSyxDQUFDLENBQUM7QUFDN0UsVUFBTSxNQUFNLENBQUMsS0FBSyxNQUFNQSxNQUFLLEdBQUdBLE1BQUssQ0FBQztBQUV0QyxTQUFLLFFBQVEsS0FBSztBQUNsQixTQUFLLFFBQVEsR0FBRztBQUNoQixTQUFLLE1BQU0sS0FBSyxnQkFBZ0IsS0FBSyxnQkFBZ0IsS0FBSyxjQUFjO0FBQ3hFLFNBQUssVUFBVSxLQUFLLGVBQWUsR0FBRyxLQUFLLGVBQWUsR0FBRyxLQUFLLGVBQWUsQ0FBQztBQUVsRixTQUFLLFNBQVMsY0FBYztBQUFBLEVBQzlCO0FBQUEsRUFFUSxjQUFvQjtBQUMxQixhQUFTLElBQUksR0FBRyxJQUFJLElBQUksS0FBSztBQUMzQixZQUFNLE1BQU0sSUFBSSxLQUFLO0FBRXJCLFdBQUssV0FBVyxNQUFNLElBQUksR0FBRyxHQUFHLEVBQUU7QUFDbEMsV0FBSyxXQUFXLE1BQU0sS0FBSyxJQUFJLEdBQUcsS0FBSyxHQUFHLEtBQUssRUFBRTtBQUFBLElBQ25EO0FBRUEsYUFBUyxJQUFJLEdBQUcsSUFBSSxJQUFJLEtBQUs7QUFDM0IsWUFBTSxNQUFNLElBQUksS0FBSztBQUVyQixXQUFLLFdBQVcsTUFBTSxNQUFNLElBQUksR0FBRyxLQUFLLEdBQUcsS0FBSyxFQUFFO0FBQ2xELFdBQUssV0FBVyxNQUFNLE1BQU0sSUFBSSxHQUFHLE1BQU0sR0FBRyxNQUFNLEVBQUU7QUFBQSxJQUN0RDtBQUVBLFNBQUssV0FBVyxjQUFjO0FBQUEsRUFDaEM7QUFDRjs7O0FDdkdBLFlBQVlDLFlBQVc7QUFJaEIsSUFBTSxtQ0FBTixjQUFxRCxzQkFBc0Q7QUFBQSxFQVN6RyxZQUFZLE9BQXdDO0FBQ3pELFVBQU07QUFUUixTQUFPLGFBQWE7QUFLcEIsU0FBaUIsaUJBQWlCLElBQVUsZUFBUTtBQUNwRCxTQUFpQixpQkFBaUIsSUFBVSxlQUFRO0FBS2xELFNBQUssU0FBUztBQUVkLFNBQUssV0FBVyxJQUFVLHVCQUFnQixJQUFJLGFBQWEsSUFBSSxDQUFDLEdBQUcsQ0FBQztBQUNwRSxTQUFLLGFBQWEsWUFBWSxLQUFLLFFBQVE7QUFFM0MsU0FBSyxhQUFhLElBQVUsdUJBQWdCLElBQUksWUFBWSxFQUFFLEdBQUcsQ0FBQztBQUNsRSxTQUFLLFNBQVMsS0FBSyxVQUFVO0FBRTdCLFNBQUssWUFBWTtBQUNqQixTQUFLLE9BQU87QUFBQSxFQUNkO0FBQUEsRUFFTyxTQUFlO0FBQ3BCLFFBQUksdUJBQXVCO0FBRTNCLFFBQUksQ0FBQyxLQUFLLGVBQWUsT0FBTyxLQUFLLE9BQU8sTUFBTSxHQUFHO0FBQ25ELFdBQUssZUFBZSxLQUFLLEtBQUssT0FBTyxNQUFNO0FBQzNDLDZCQUF1QjtBQUFBLElBQ3pCO0FBRUEsUUFBSSxDQUFDLEtBQUssZUFBZSxPQUFPLEtBQUssT0FBTyxNQUFNLEdBQUc7QUFDbkQsV0FBSyxlQUFlLEtBQUssS0FBSyxPQUFPLE1BQU07QUFDM0MsNkJBQXVCO0FBQUEsSUFDekI7QUFFQSxRQUFJLHNCQUFzQjtBQUN4QixXQUFLLGVBQWU7QUFBQSxJQUN0QjtBQUFBLEVBQ0Y7QUFBQSxFQUVRLGlCQUF1QjtBQUM3QixTQUFLLFNBQVMsT0FBTyxHQUFHLE1BQU0sTUFBTSxDQUFDO0FBQ3JDLFNBQUssU0FBUyxPQUFPLEdBQUcsS0FBSyxNQUFNLENBQUM7QUFDcEMsU0FBSyxTQUFTLE9BQU8sR0FBRyxLQUFLLEtBQUssQ0FBQztBQUNuQyxTQUFLLFNBQVMsT0FBTyxHQUFHLE1BQU0sS0FBSyxDQUFDO0FBQ3BDLFNBQUssU0FBUyxPQUFPLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFDL0IsU0FBSyxTQUFTLE9BQU8sR0FBRyxHQUFHLEdBQUcsSUFBSTtBQUVsQyxTQUFLLFVBQVUsS0FBSyxlQUFlLEdBQUcsS0FBSyxlQUFlLEdBQUcsS0FBSyxlQUFlLENBQUM7QUFDbEYsU0FBSyxPQUFPLEtBQUssY0FBYztBQUUvQixTQUFLLFNBQVMsY0FBYztBQUFBLEVBQzlCO0FBQUEsRUFFUSxjQUFvQjtBQUMxQixTQUFLLFdBQVcsTUFBTSxHQUFHLEdBQUcsQ0FBQztBQUM3QixTQUFLLFdBQVcsTUFBTSxHQUFHLEdBQUcsQ0FBQztBQUM3QixTQUFLLFdBQVcsTUFBTSxHQUFHLEdBQUcsQ0FBQztBQUM3QixTQUFLLFdBQVcsTUFBTSxHQUFHLEdBQUcsQ0FBQztBQUM3QixTQUFLLFdBQVcsTUFBTSxHQUFHLEdBQUcsQ0FBQztBQUU3QixTQUFLLFdBQVcsY0FBYztBQUFBLEVBQ2hDO0FBQ0Y7OztBQ3JFQSxZQUFZQyxZQUFXO0FBSWhCLElBQU0sb0NBQU4sY0FBc0Qsc0JBQXNEO0FBQUEsRUFTMUcsWUFBWSxPQUF5QztBQUMxRCxVQUFNO0FBVFIsU0FBTyxhQUFhO0FBS3BCLFNBQVEsaUJBQWlCO0FBQ3pCLFNBQWlCLGlCQUFpQixJQUFVLGVBQVE7QUFLbEQsU0FBSyxTQUFTO0FBRWQsU0FBSyxXQUFXLElBQVUsdUJBQWdCLElBQUksYUFBYSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUM7QUFDekUsU0FBSyxhQUFhLFlBQVksS0FBSyxRQUFRO0FBRTNDLFNBQUssYUFBYSxJQUFVLHVCQUFnQixJQUFJLFlBQVksS0FBSyxDQUFDLEdBQUcsQ0FBQztBQUN0RSxTQUFLLFNBQVMsS0FBSyxVQUFVO0FBRTdCLFNBQUssWUFBWTtBQUNqQixTQUFLLE9BQU87QUFBQSxFQUNkO0FBQUEsRUFFTyxTQUFlO0FBQ3BCLFFBQUksdUJBQXVCO0FBRTNCLFVBQU0sU0FBUyxLQUFLLE9BQU8sU0FBUyxLQUFLO0FBQ3pDLFFBQUksS0FBSyxtQkFBbUIsUUFBUTtBQUNsQyxXQUFLLGlCQUFpQjtBQUN0Qiw2QkFBdUI7QUFBQSxJQUN6QjtBQUVBLFFBQUksQ0FBQyxLQUFLLGVBQWUsT0FBTyxLQUFLLE9BQU8sTUFBTSxHQUFHO0FBQ25ELFdBQUssZUFBZSxLQUFLLEtBQUssT0FBTyxNQUFNO0FBQzNDLDZCQUF1QjtBQUFBLElBQ3pCO0FBRUEsUUFBSSxzQkFBc0I7QUFDeEIsV0FBSyxlQUFlO0FBQUEsSUFDdEI7QUFBQSxFQUNGO0FBQUEsRUFFUSxpQkFBdUI7QUFDN0IsYUFBUyxJQUFJLEdBQUcsSUFBSSxJQUFJLEtBQUs7QUFDM0IsWUFBTSxJQUFLLElBQUksS0FBUSxLQUFLO0FBRTVCLFdBQUssU0FBUyxPQUFPLEdBQUcsS0FBSyxJQUFJLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUc7QUFDckQsV0FBSyxTQUFTLE9BQU8sS0FBSyxHQUFHLEdBQUssS0FBSyxJQUFJLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxDQUFDO0FBQzFELFdBQUssU0FBUyxPQUFPLEtBQUssR0FBRyxLQUFLLElBQUksQ0FBQyxHQUFHLEdBQUssS0FBSyxJQUFJLENBQUMsQ0FBQztBQUFBLElBQzVEO0FBRUEsU0FBSyxNQUFNLEtBQUssZ0JBQWdCLEtBQUssZ0JBQWdCLEtBQUssY0FBYztBQUN4RSxTQUFLLFVBQVUsS0FBSyxlQUFlLEdBQUcsS0FBSyxlQUFlLEdBQUcsS0FBSyxlQUFlLENBQUM7QUFFbEYsU0FBSyxTQUFTLGNBQWM7QUFBQSxFQUM5QjtBQUFBLEVBRVEsY0FBb0I7QUFDMUIsYUFBUyxJQUFJLEdBQUcsSUFBSSxJQUFJLEtBQUs7QUFDM0IsWUFBTSxNQUFNLElBQUksS0FBSztBQUVyQixXQUFLLFdBQVcsTUFBTSxJQUFJLEdBQUcsR0FBRyxFQUFFO0FBQ2xDLFdBQUssV0FBVyxNQUFNLEtBQUssSUFBSSxHQUFHLEtBQUssR0FBRyxLQUFLLEVBQUU7QUFDakQsV0FBSyxXQUFXLE1BQU0sTUFBTSxJQUFJLEdBQUcsS0FBSyxHQUFHLEtBQUssRUFBRTtBQUFBLElBQ3BEO0FBRUEsU0FBSyxXQUFXLGNBQWM7QUFBQSxFQUNoQztBQUNGOzs7QVAvREEsSUFBTUMsUUFBTyxJQUFVLGVBQVE7QUFFeEIsSUFBTSw4QkFBTixjQUFnRCxhQUFNO0FBQUEsRUFLcEQsWUFBWSxVQUFpQztBQUNsRCxVQUFNO0FBQ04sU0FBSyxtQkFBbUI7QUFFeEIsU0FBSyxXQUFXO0FBRWhCLFFBQUksS0FBSyxTQUFTLGlCQUFpQixrQ0FBa0M7QUFDbkUsV0FBSyxZQUFZLElBQUksa0NBQWtDLEtBQUssU0FBUyxLQUFLO0FBQUEsSUFDNUUsV0FBVyxLQUFLLFNBQVMsaUJBQWlCLG1DQUFtQztBQUMzRSxXQUFLLFlBQVksSUFBSSxtQ0FBbUMsS0FBSyxTQUFTLEtBQUs7QUFBQSxJQUM3RSxXQUFXLEtBQUssU0FBUyxpQkFBaUIsaUNBQWlDO0FBQ3pFLFdBQUssWUFBWSxJQUFJLGlDQUFpQyxLQUFLLFNBQVMsS0FBSztBQUFBLElBQzNFLE9BQU87QUFDTCxZQUFNLElBQUksTUFBTSxtRUFBbUU7QUFBQSxJQUNyRjtBQUVBLFVBQU0sV0FBVyxJQUFVLHlCQUFrQjtBQUFBLE1BQzNDLE9BQU87QUFBQSxNQUNQLFdBQVc7QUFBQSxNQUNYLFlBQVk7QUFBQSxJQUNkLENBQUM7QUFFRCxTQUFLLFFBQVEsSUFBVSxvQkFBYSxLQUFLLFdBQVcsUUFBUTtBQUM1RCxTQUFLLElBQUksS0FBSyxLQUFLO0FBQUEsRUFDckI7QUFBQSxFQUVPLFVBQWdCO0FBQ3JCLFNBQUssVUFBVSxRQUFRO0FBQUEsRUFDekI7QUFBQSxFQUVPLGtCQUFrQixPQUFzQjtBQUM3QyxTQUFLLFNBQVMsa0JBQWtCLE1BQU0sS0FBSztBQUUzQyxTQUFLLE9BQU8sS0FBSyxLQUFLLFNBQVMsV0FBVztBQUUxQyxVQUFNLHNCQUFzQixLQUFLLE9BQU87QUFDeEMsU0FBSyxVQUFVLGFBQWFBLE1BQ3pCLElBQUksb0JBQW9CLENBQUMsR0FBRyxvQkFBb0IsQ0FBQyxHQUFHLG9CQUFvQixDQUFDLENBQUMsRUFDMUUsT0FBTztBQUVWLFNBQUssVUFBVSxPQUFPO0FBRXRCLFVBQU0sa0JBQWtCLEtBQUs7QUFBQSxFQUMvQjtBQUNGOzs7QVE3REEsWUFBWUMsWUFBVzs7O0FDQXZCLFlBQVlDLFlBQVc7QUFHaEIsSUFBTSwyQkFBTixjQUE2QyxzQkFBZTtBQUFBLEVBUzFELFlBQVksWUFBZ0M7QUFDakQsVUFBTTtBQVRSLFNBQU8sYUFBYTtBQUtwQixTQUFRLGlCQUFpQjtBQUN6QixTQUFpQixlQUFlLElBQVUsZUFBUTtBQUtoRCxTQUFLLGNBQWM7QUFFbkIsU0FBSyxXQUFXLElBQVUsdUJBQWdCLElBQUksYUFBYSxHQUFHLEdBQUcsQ0FBQztBQUNsRSxTQUFLLGFBQWEsWUFBWSxLQUFLLFFBQVE7QUFFM0MsU0FBSyxhQUFhLElBQVUsdUJBQWdCLElBQUksWUFBWSxHQUFHLEdBQUcsQ0FBQztBQUNuRSxTQUFLLFNBQVMsS0FBSyxVQUFVO0FBRTdCLFNBQUssWUFBWTtBQUNqQixTQUFLLE9BQU87QUFBQSxFQUNkO0FBQUEsRUFFTyxTQUFlO0FBQ3BCLFFBQUksdUJBQXVCO0FBRTNCLFVBQU0sU0FBUyxLQUFLLFlBQVksU0FBUyxZQUFZLEtBQUs7QUFDMUQsUUFBSSxLQUFLLG1CQUFtQixRQUFRO0FBQ2xDLFdBQUssaUJBQWlCO0FBQ3RCLDZCQUF1QjtBQUFBLElBQ3pCO0FBRUEsUUFBSSxDQUFDLEtBQUssYUFBYSxPQUFPLEtBQUssWUFBWSx5QkFBeUIsR0FBRztBQUN6RSxXQUFLLGFBQWEsS0FBSyxLQUFLLFlBQVkseUJBQXlCO0FBQ2pFLDZCQUF1QjtBQUFBLElBQ3pCO0FBRUEsUUFBSSxzQkFBc0I7QUFDeEIsV0FBSyxlQUFlO0FBQUEsSUFDdEI7QUFBQSxFQUNGO0FBQUEsRUFFUSxpQkFBdUI7QUFDN0IsYUFBUyxJQUFJLEdBQUcsSUFBSSxJQUFJLEtBQUs7QUFDM0IsWUFBTSxJQUFLLElBQUksS0FBUSxLQUFLO0FBRTVCLFdBQUssU0FBUyxPQUFPLEdBQUcsS0FBSyxJQUFJLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUc7QUFDckQsV0FBSyxTQUFTLE9BQU8sS0FBSyxHQUFHLEdBQUssS0FBSyxJQUFJLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxDQUFDO0FBQzFELFdBQUssU0FBUyxPQUFPLEtBQUssR0FBRyxLQUFLLElBQUksQ0FBQyxHQUFHLEdBQUssS0FBSyxJQUFJLENBQUMsQ0FBQztBQUFBLElBQzVEO0FBRUEsU0FBSyxNQUFNLEtBQUssZ0JBQWdCLEtBQUssZ0JBQWdCLEtBQUssY0FBYztBQUN4RSxTQUFLLFVBQVUsS0FBSyxhQUFhLEdBQUcsS0FBSyxhQUFhLEdBQUcsS0FBSyxhQUFhLENBQUM7QUFFNUUsU0FBSyxTQUFTLE9BQU8sSUFBSSxHQUFHLEdBQUcsQ0FBQztBQUNoQyxTQUFLLFNBQVMsT0FBTyxJQUFJLEtBQUssYUFBYSxHQUFHLEtBQUssYUFBYSxHQUFHLEtBQUssYUFBYSxDQUFDO0FBRXRGLFNBQUssU0FBUyxjQUFjO0FBQUEsRUFDOUI7QUFBQSxFQUVRLGNBQW9CO0FBQzFCLGFBQVMsSUFBSSxHQUFHLElBQUksSUFBSSxLQUFLO0FBQzNCLFlBQU0sTUFBTSxJQUFJLEtBQUs7QUFFckIsV0FBSyxXQUFXLE1BQU0sSUFBSSxHQUFHLEdBQUcsRUFBRTtBQUNsQyxXQUFLLFdBQVcsTUFBTSxLQUFLLElBQUksR0FBRyxLQUFLLEdBQUcsS0FBSyxFQUFFO0FBQ2pELFdBQUssV0FBVyxNQUFNLE1BQU0sSUFBSSxHQUFHLEtBQUssR0FBRyxLQUFLLEVBQUU7QUFBQSxJQUNwRDtBQUNBLFNBQUssV0FBVyxNQUFNLEtBQUssSUFBSSxFQUFFO0FBRWpDLFNBQUssV0FBVyxjQUFjO0FBQUEsRUFDaEM7QUFDRjs7O0FEeEVBLElBQU1DLFFBQU8sSUFBVSxlQUFRO0FBRXhCLElBQU0sMkJBQU4sY0FBNkMsYUFBTTtBQUFBLEVBS2pELFlBQVksWUFBZ0M7QUFDakQsVUFBTTtBQUNOLFNBQUssbUJBQW1CO0FBRXhCLFNBQUssYUFBYTtBQUVsQixTQUFLLFlBQVksSUFBSSx5QkFBeUIsS0FBSyxVQUFVO0FBRTdELFVBQU0sV0FBVyxJQUFVLHlCQUFrQjtBQUFBLE1BQzNDLE9BQU87QUFBQSxNQUNQLFdBQVc7QUFBQSxNQUNYLFlBQVk7QUFBQSxJQUNkLENBQUM7QUFFRCxTQUFLLFFBQVEsSUFBVSxvQkFBYSxLQUFLLFdBQVcsUUFBUTtBQUM1RCxTQUFLLElBQUksS0FBSyxLQUFLO0FBQUEsRUFDckI7QUFBQSxFQUVPLFVBQWdCO0FBQ3JCLFNBQUssVUFBVSxRQUFRO0FBQUEsRUFDekI7QUFBQSxFQUVPLGtCQUFrQixPQUFzQjtBQUM3QyxTQUFLLFdBQVcsS0FBSyxrQkFBa0IsTUFBTSxLQUFLO0FBRWxELFNBQUssT0FBTyxLQUFLLEtBQUssV0FBVyxLQUFLLFdBQVc7QUFFakQsVUFBTSxzQkFBc0IsS0FBSyxPQUFPO0FBQ3hDLFNBQUssVUFBVSxhQUFhQSxNQUN6QixJQUFJLG9CQUFvQixDQUFDLEdBQUcsb0JBQW9CLENBQUMsR0FBRyxvQkFBb0IsQ0FBQyxDQUFDLEVBQzFFLE9BQU87QUFFVixTQUFLLFVBQVUsT0FBTztBQUV0QixVQUFNLGtCQUFrQixLQUFLO0FBQUEsRUFDL0I7QUFDRjs7O0FFL0NBLFlBQVlDLGFBQVc7QUFNaEIsSUFBTSx3QkFBTixjQUEwQyxpQkFBUztBQUFBLEVBV2pELFlBQVksT0FBbUM7QUFDcEQsVUFBTTtBQUhSO0FBQUE7QUFBQTtBQUFBLFNBQWdCLGlCQUFpQixJQUFVLGdCQUFRO0FBS2pELFNBQUssUUFBUTtBQUFBLEVBQ2Y7QUFBQSxFQUVPLGtCQUFrQixlQUF3QixnQkFBK0I7QUFDOUUsVUFBTSxrQkFBa0IsZUFBZSxjQUFjO0FBRXJELHlCQUFxQixLQUFLLGdCQUFnQixLQUFLLGFBQWEsS0FBSyxNQUFNLE1BQU07QUFBQSxFQUMvRTtBQUNGO0FBYUEsU0FBUyxxQkFBcUIsZ0JBQStCLGFBQTRCLFFBQXdCO0FBQy9HLFFBQU0sS0FBSyxZQUFZO0FBRXZCLGlCQUFlLEtBQUssV0FBVztBQUUvQixNQUFJLFFBQVE7QUFDVixtQkFBZSxTQUFTLEVBQUUsSUFBSSxHQUFHLENBQUMsSUFBSSxPQUFPLElBQUksR0FBRyxDQUFDLElBQUksT0FBTyxJQUFJLEdBQUcsQ0FBQyxJQUFJLE9BQU8sSUFBSSxHQUFHLEVBQUU7QUFDNUYsbUJBQWUsU0FBUyxFQUFFLElBQUksR0FBRyxDQUFDLElBQUksT0FBTyxJQUFJLEdBQUcsQ0FBQyxJQUFJLE9BQU8sSUFBSSxHQUFHLENBQUMsSUFBSSxPQUFPLElBQUksR0FBRyxFQUFFO0FBQzVGLG1CQUFlLFNBQVMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxJQUFJLE9BQU8sSUFBSSxHQUFHLENBQUMsSUFBSSxPQUFPLElBQUksR0FBRyxFQUFFLElBQUksT0FBTyxJQUFJLEdBQUcsRUFBRTtBQUFBLEVBQy9GO0FBQ0Y7OztBQ25EQSxZQUFZQyxhQUFXOzs7QUNBdkIsWUFBWUMsYUFBVzs7O0FDQXZCLFlBQVlDLGFBQVc7QUFFdkIsSUFBTSxRQUFRLElBQVUsZ0JBQVE7QUFRekIsU0FBUyxpQkFBMEMsUUFBYztBQUN0RSxNQUFLLE9BQWUsUUFBUTtBQUMxQixXQUFPLE9BQU87QUFBQSxFQUNoQixPQUFPO0FBQ0wsSUFBQyxPQUFlLFdBQVcsTUFBTSxLQUFLLE1BQU0sQ0FBQztBQUFBLEVBQy9DO0FBRUEsU0FBTztBQUNUOzs7QURmTyxJQUFNLHNCQUFOLE1BQTBCO0FBQUEsRUFvQ3hCLFlBQVksUUFBdUI7QUEzQjFDO0FBQUE7QUFBQTtBQUFBLFNBQWlCLGdCQUFnQixJQUFVLGdCQUFRO0FBTW5EO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FBUSx1QkFBdUI7QUFzQjdCLFNBQUssU0FBUztBQUVkLFVBQU0sVUFBa0M7QUFBQSxNQUN0QyxLQUFLLENBQUMsS0FBSyxNQUFXLFdBQVc7QUFDL0IsYUFBSyx1QkFBdUI7QUFDNUIsWUFBSSxJQUFJLElBQUk7QUFFWixlQUFPO0FBQUEsTUFDVDtBQUFBLElBQ0Y7QUFFQSxTQUFLLG9CQUFvQixPQUFPO0FBQ2hDLFdBQU8sV0FBVyxJQUFJLE1BQTBCLE9BQU8sVUFBVSxPQUFPO0FBQUEsRUFDMUU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUF2QkEsSUFBVyxVQUF5QjtBQUNsQyxRQUFJLEtBQUssc0JBQXNCO0FBQzdCLHVCQUFpQixLQUFLLGNBQWMsS0FBSyxLQUFLLE1BQU0sQ0FBQztBQUNyRCxXQUFLLHVCQUF1QjtBQUFBLElBQzlCO0FBRUEsV0FBTyxLQUFLO0FBQUEsRUFDZDtBQUFBLEVBa0JPLFNBQWU7QUFDcEIsU0FBSyxPQUFPLFdBQVcsS0FBSztBQUFBLEVBQzlCO0FBQ0Y7OztBRGhEQSxJQUFNLG1CQUFtQixJQUFVLGdCQUFRO0FBRzNDLElBQU1DLFFBQU8sSUFBVSxnQkFBUTtBQUMvQixJQUFNQyxRQUFPLElBQVUsZ0JBQVE7QUFLL0IsSUFBTSxzQkFBc0IsSUFBVSxnQkFBUTtBQUs5QyxJQUFNLFlBQVksSUFBVSxnQkFBUTtBQUVwQyxJQUFNQyxTQUFRLElBQVUsZ0JBQVE7QUFNekIsSUFBTSxxQkFBTixNQUF5QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQTZIOUIsWUFDRSxNQUNBLE9BQ0EsV0FBZ0QsQ0FBQyxHQUNqRCxpQkFBK0MsQ0FBQyxHQUNoRDtBQXpHRjtBQUFBO0FBQUE7QUFBQSxTQUFRLGVBQWUsSUFBVSxnQkFBUTtBQUt6QztBQUFBO0FBQUE7QUFBQSxTQUFRLFlBQVksSUFBVSxnQkFBUTtBQUt0QztBQUFBO0FBQUE7QUFBQSxTQUFRLFlBQVksSUFBVSxnQkFBUTtBQVF0QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUFRLHdCQUF3QjtBQTBCaEM7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUFRLFVBQWlDO0FBeUJ6QztBQUFBO0FBQUE7QUFBQSxTQUFRLHNCQUFzQixJQUFVLGdCQUFRO0FBS2hEO0FBQUE7QUFBQTtBQUFBLFNBQVEsd0JBQXdCLElBQVUsbUJBQVc7QUFLckQ7QUFBQTtBQUFBO0FBQUEsU0FBUSw2QkFBNkIsSUFBVSxnQkFBUTtBQXhJekQ7QUFtS0ksU0FBSyxPQUFPO0FBQ1osU0FBSyxLQUFLLG1CQUFtQjtBQUU3QixTQUFLLFFBQVE7QUFFYixTQUFLLFdBQVc7QUFBQSxNQUNkLFlBQVcsY0FBUyxjQUFULFlBQXNCO0FBQUEsTUFDakMsWUFBVyxjQUFTLGNBQVQsWUFBc0I7QUFBQSxNQUNqQyxlQUFjLGNBQVMsaUJBQVQsWUFBeUI7QUFBQSxNQUN2QyxhQUFZLG9CQUFTLGVBQVQsbUJBQXFCLFlBQXJCLFlBQWdDLElBQVUsZ0JBQVEsR0FBSyxJQUFNLENBQUc7QUFBQSxNQUM1RSxZQUFXLGNBQVMsY0FBVCxZQUFzQjtBQUFBLElBQ25DO0FBRUEsU0FBSyxpQkFBaUI7QUFBQSxFQUN4QjtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBakdBLElBQVcsZUFBb0M7QUFDN0MsVUFBTSxNQUFNLG9CQUFJLElBQW9CO0FBRXBDLFVBQU0sU0FBUyxLQUFLLEtBQUs7QUFDekIsUUFBSSxRQUFRO0FBQ1YsVUFBSSxJQUFJLE1BQU07QUFBQSxJQUNoQjtBQUVBLGFBQVMsS0FBSyxHQUFHLEtBQUssS0FBSyxlQUFlLFFBQVEsTUFBTTtBQUN0RCxlQUFTLElBQUksR0FBRyxJQUFJLEtBQUssZUFBZSxFQUFFLEVBQUUsVUFBVSxRQUFRLEtBQUs7QUFDakUsWUFBSSxJQUFJLEtBQUssZUFBZSxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFBQSxNQUM5QztBQUFBLElBQ0Y7QUFFQSxXQUFPO0FBQUEsRUFDVDtBQUFBLEVBT0EsSUFBVyxTQUFnQztBQUN6QyxXQUFPLEtBQUs7QUFBQSxFQUNkO0FBQUEsRUFDQSxJQUFXLE9BQU8sUUFBK0I7QUF6R25EO0FBMkdJLFNBQUksVUFBSyxZQUFMLG1CQUFjLFNBQVMsbUJBQW1CO0FBQzVDLE1BQUMsS0FBSyxRQUFRLFNBQVMsa0JBQTBDLE9BQU87QUFDeEUsYUFBTyxLQUFLLFFBQVEsU0FBUztBQUFBLElBQy9CO0FBR0EsU0FBSyxVQUFVO0FBR2YsUUFBSSxLQUFLLFNBQVM7QUFDaEIsVUFBSSxDQUFDLEtBQUssUUFBUSxTQUFTLG1CQUFtQjtBQUM1QyxhQUFLLFFBQVEsU0FBUyxvQkFBb0IsSUFBSSxvQkFBb0IsS0FBSyxRQUFRLFdBQVc7QUFBQSxNQUM1RjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFnQkEsSUFBVyw0QkFBMkM7QUFDcEQsV0FBTyxLQUFLO0FBQUEsRUFDZDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFNQSxJQUFZLHFCQUFvQztBQUM5QyxXQUFPLEtBQUssS0FBSyxTQUFTLEtBQUssS0FBSyxPQUFPLGNBQWM7QUFBQSxFQUMzRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFvQ08sZUFBcUI7QUFFMUIsU0FBSyxvQkFBb0IsS0FBSyxLQUFLLEtBQUssTUFBTTtBQUM5QyxTQUFLLHNCQUFzQixLQUFLLEtBQUssS0FBSyxVQUFVO0FBR3BELFFBQUksS0FBSyxPQUFPO0FBQ2QsV0FBSywyQkFBMkIsS0FBSyxLQUFLLE1BQU0sUUFBUTtBQUFBLElBQzFELE9BQU87QUFHTCxXQUFLLDJCQUEyQixLQUFLLEtBQUssS0FBSyxRQUFRLEVBQUUsVUFBVSxFQUFFLGVBQWUsSUFBSTtBQUFBLElBQzFGO0FBR0EsVUFBTSxzQkFBc0IsS0FBSyx3QkFBd0I7QUFDekQsU0FBSyxLQUFLLGFBQWEsS0FBSyxhQUFhLEtBQUssS0FBSywwQkFBMEIsQ0FBQyxFQUFFLGFBQWEsbUJBQW1CO0FBQ2hILFNBQUssVUFBVSxLQUFLLEtBQUssWUFBWTtBQUdyQyxTQUFLLFVBQVUsS0FBSyxLQUFLLDBCQUEwQixFQUFFLFVBQVU7QUFBQSxFQUNqRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFNTyxRQUFjO0FBQ25CLFNBQUssS0FBSyxXQUFXLEtBQUssS0FBSyxxQkFBcUI7QUFHcEQsU0FBSyxLQUFLLGFBQWE7QUFDdkIsU0FBSyxLQUFLLFlBQVksaUJBQWlCLEtBQUssb0JBQW9CLEtBQUssS0FBSyxNQUFNO0FBR2hGLFVBQU0sc0JBQXNCLEtBQUssd0JBQXdCO0FBQ3pELFNBQUssS0FBSyxhQUFhLEtBQUssYUFBYSxLQUFLLEtBQUssMEJBQTBCLENBQUMsRUFBRSxhQUFhLG1CQUFtQjtBQUNoSCxTQUFLLFVBQVUsS0FBSyxLQUFLLFlBQVk7QUFBQSxFQUN2QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBUU8sT0FBTyxPQUFxQjtBQUNqQyxRQUFJLFNBQVMsRUFBRztBQUdoQixTQUFLLDBCQUEwQjtBQUcvQixVQUFNLHFCQUFxQkQsTUFDeEIsS0FBSyxLQUFLLFNBQVMsRUFDbkIsbUJBQW1CLEtBQUssbUJBQW1CLEVBQzNDLG1CQUFtQixLQUFLLGtCQUFrQjtBQUc3QyxjQUVHLEtBQUssS0FBSyxZQUFZLEVBQ3RCLElBQUlELE1BQUssV0FBVyxLQUFLLGNBQWMsS0FBSyxTQUFTLEVBQUUsZUFBZSxJQUFJLEtBQUssU0FBUyxTQUFTLENBQUMsRUFFbEcsYUFBYSxLQUFLLHdCQUF3QixDQUFDLEVBRTNDLGdCQUFnQixvQkFBb0IsS0FBSyxTQUFTLFlBQVksS0FBSyxFQUNuRSxnQkFBZ0IsS0FBSyxTQUFTLFlBQVksS0FBSyxTQUFTLGVBQWUsS0FBSztBQUcvRSx3QkFBb0Isc0JBQXNCLEtBQUssS0FBSyxXQUFXO0FBQy9ELGNBQVUsSUFBSSxtQkFBbUIsRUFBRSxVQUFVLEVBQUUsZUFBZSxLQUFLLHFCQUFxQixFQUFFLElBQUksbUJBQW1CO0FBR2pILFNBQUssV0FBVyxTQUFTO0FBR3pCLFNBQUssVUFBVSxLQUFLLEtBQUssWUFBWTtBQUNyQyxTQUFLLGFBQWEsS0FBSyxTQUFTLEVBQUUsYUFBYSxLQUFLLHdCQUF3QixDQUFDO0FBSTdFLFVBQU0sNkJBQTZCRSxPQUNoQyxpQkFBaUIsS0FBSyxvQkFBb0IsS0FBSyxtQkFBbUIsRUFDbEUsT0FBTztBQUNWLFNBQUssS0FBSyxXQUNQLG1CQUFtQixLQUFLLFdBQVdGLE1BQUssS0FBSyxTQUFTLEVBQUUsYUFBYSwwQkFBMEIsRUFBRSxVQUFVLENBQUMsRUFDNUcsWUFBWSxLQUFLLHFCQUFxQjtBQUd6QyxTQUFLLEtBQUssYUFBYTtBQUN2QixTQUFLLEtBQUssWUFBWSxpQkFBaUIsS0FBSyxvQkFBb0IsS0FBSyxLQUFLLE1BQU07QUFBQSxFQUNsRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQU9RLFdBQVcsTUFBMkI7QUFDNUMsYUFBUyxLQUFLLEdBQUcsS0FBSyxLQUFLLGVBQWUsUUFBUSxNQUFNO0FBQ3RELGVBQVMsSUFBSSxHQUFHLElBQUksS0FBSyxlQUFlLEVBQUUsRUFBRSxVQUFVLFFBQVEsS0FBSztBQUNqRSxjQUFNLFdBQVcsS0FBSyxlQUFlLEVBQUUsRUFBRSxVQUFVLENBQUM7QUFDcEQsY0FBTSxPQUFPLFNBQVMsTUFBTSxtQkFBbUIsU0FBUyxnQkFBZ0IsTUFBTSxLQUFLLFNBQVMsV0FBV0EsS0FBSTtBQUUzRyxZQUFJLE9BQU8sR0FBSztBQUVkLGVBQUssZ0JBQWdCQSxPQUFNLENBQUMsSUFBSTtBQUdoQyxlQUFLLElBQUksbUJBQW1CO0FBQzVCLGdCQUFNLFNBQVMsS0FBSyxPQUFPO0FBQzNCLGVBQUssZUFBZSxLQUFLLHdCQUF3QixNQUFNLEVBQUUsSUFBSSxtQkFBbUI7QUFBQSxRQUNsRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFNUSw0QkFBa0M7QUFDeEMsSUFBQUEsTUFBSyxzQkFBc0IsS0FBSyxLQUFLLFdBQVc7QUFFaEQsUUFBSSxLQUFLLE9BQU87QUFDZCxNQUFBQyxNQUFLLHNCQUFzQixLQUFLLE1BQU0sV0FBVztBQUFBLElBQ25ELE9BQU87QUFDTCxNQUFBQSxNQUFLLEtBQUssS0FBSywwQkFBMEI7QUFDekMsTUFBQUEsTUFBSyxhQUFhLEtBQUssS0FBSyxXQUFXO0FBQUEsSUFDekM7QUFFQSxTQUFLLHdCQUF3QkQsTUFBSyxJQUFJQyxLQUFJLEVBQUUsT0FBTztBQUFBLEVBQ3JEO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFLUSwwQkFBeUM7QUFDL0MsV0FBTyxLQUFLLFVBQVUsS0FBSyxRQUFRLGNBQWM7QUFBQSxFQUNuRDtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBS1EsMEJBQXlDO0FBQy9DLFdBQU8sS0FBSyxVQUFXLEtBQUssUUFBUSxTQUFTLGtCQUEwQyxVQUFVO0FBQUEsRUFDbkc7QUFDRjs7O0FHeFVBLFlBQVlFLGFBQVc7OztBQ0RoQixTQUFTLDBCQUEwQixRQUF3QixVQUFrRDtBQUNsSCxRQUFNLFlBQThCLENBQUM7QUFFckMsTUFBSSxPQUE4QjtBQUNsQyxTQUFPLFNBQVMsTUFBTTtBQUNwQixjQUFVLFFBQVEsSUFBSTtBQUN0QixXQUFPLEtBQUs7QUFBQSxFQUNkO0FBRUEsWUFBVSxRQUFRLENBQUMsYUFBYTtBQUM5QixhQUFTLFFBQVE7QUFBQSxFQUNuQixDQUFDO0FBQ0g7OztBQ0xPLFNBQVMsa0NBQ2QsUUFDQSxVQUNNO0FBQ04sU0FBTyxTQUFTLFFBQVEsQ0FBQyxVQUFVO0FBQ2pDLFVBQU0sU0FBUyxTQUFTLEtBQUs7QUFDN0IsUUFBSSxDQUFDLFFBQVE7QUFDWCx3Q0FBa0MsT0FBTyxRQUFRO0FBQUEsSUFDbkQ7QUFBQSxFQUNGLENBQUM7QUFDSDs7O0FDYk8sU0FBUyxxQkFBcUIsU0FBcUQ7QUFOMUY7QUFPRSxRQUFNLGtCQUFrQixvQkFBSSxJQUE0QjtBQUN4RCxhQUFXLFVBQVUsU0FBUztBQUM1QixRQUFJLFVBQWlDO0FBQ3JDLE9BQUc7QUFDRCxZQUFNLGFBQVkscUJBQWdCLElBQUksT0FBTyxNQUEzQixZQUFnQyxLQUFLO0FBQ3ZELFVBQUksYUFBYSxRQUFRLE1BQU07QUFDN0IsZUFBTztBQUFBLE1BQ1Q7QUFDQSxzQkFBZ0IsSUFBSSxTQUFTLFFBQVE7QUFDckMsZ0JBQVUsUUFBUTtBQUFBLElBQ3BCLFNBQVMsWUFBWTtBQUFBLEVBQ3ZCO0FBQ0EsU0FBTztBQUNUOzs7QUNaTyxJQUFNLHVCQUFOLE1BQTJCO0FBQUEsRUFrRGhDLGNBQWM7QUFqRGQsU0FBUSxVQUFVLG9CQUFJLElBQXdCO0FBQzlDLFNBQVEsZ0JBQTJDLENBQUM7QUFDcEQsU0FBUSwrQkFBK0I7QUFTdkM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUFRLGFBQStCLENBQUM7QUFtQ3hDLFNBQVEsd0JBQXdCLG9CQUFJLElBQTZDO0FBQ2pGLFNBQVEsdUJBQXVCO0FBRzdCLFNBQUssMkJBQTJCLEtBQUsseUJBQXlCLEtBQUssSUFBSTtBQUFBLEVBQ3pFO0FBQUEsRUF0Q0EsSUFBVyxTQUFrQztBQUMzQyxXQUFPLEtBQUs7QUFBQSxFQUNkO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFLQSxJQUFXLGNBQXVDO0FBQ2hELFlBQVEsS0FBSyxzRUFBc0U7QUFFbkYsV0FBTyxLQUFLO0FBQUEsRUFDZDtBQUFBLEVBRUEsSUFBVyxpQkFBK0M7QUFDeEQsVUFBTSxNQUFNLG9CQUFJLElBQWdDO0FBQ2hELFNBQUssUUFBUSxRQUFRLENBQUMsZUFBZTtBQUNuQyxpQkFBVyxlQUFlLFFBQVEsQ0FBQyxrQkFBa0I7QUFDbkQsWUFBSSxJQUFJLGFBQWE7QUFBQSxNQUN2QixDQUFDO0FBQUEsSUFDSCxDQUFDO0FBQ0QsV0FBTyxNQUFNLEtBQUssR0FBRztBQUFBLEVBQ3ZCO0FBQUEsRUFFQSxJQUFXLFlBQXFDO0FBQzlDLFVBQU0sTUFBTSxvQkFBSSxJQUEyQjtBQUMzQyxTQUFLLGVBQWUsUUFBUSxDQUFDLGtCQUFrQjtBQUM3QyxvQkFBYyxVQUFVLFFBQVEsQ0FBQyxhQUFhO0FBQzVDLFlBQUksSUFBSSxRQUFRO0FBQUEsTUFDbEIsQ0FBQztBQUFBLElBQ0gsQ0FBQztBQUNELFdBQU8sTUFBTSxLQUFLLEdBQUc7QUFBQSxFQUN2QjtBQUFBLEVBU08sU0FBUyxPQUFpQztBQUMvQyxTQUFLLFFBQVEsSUFBSSxLQUFLO0FBRXRCLFFBQUksWUFBWSxLQUFLLHNCQUFzQixJQUFJLE1BQU0sSUFBSTtBQUN6RCxRQUFJLGFBQWEsTUFBTTtBQUNyQixrQkFBWSxvQkFBSSxJQUF3QjtBQUN4QyxXQUFLLHNCQUFzQixJQUFJLE1BQU0sTUFBTSxTQUFTO0FBQUEsSUFDdEQ7QUFDQSxjQUFVLElBQUksS0FBSztBQUVuQixTQUFLLHVCQUF1QjtBQUFBLEVBQzlCO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFLTyxjQUFjLE9BQWlDO0FBQ3BELFlBQVEsS0FBSyw4RUFBOEU7QUFFM0YsU0FBSyxTQUFTLEtBQUs7QUFBQSxFQUNyQjtBQUFBLEVBRU8sWUFBWSxPQUFpQztBQUNsRCxTQUFLLFFBQVEsT0FBTyxLQUFLO0FBRXpCLFVBQU0sWUFBWSxLQUFLLHNCQUFzQixJQUFJLE1BQU0sSUFBSTtBQUMzRCxjQUFVLE9BQU8sS0FBSztBQUV0QixTQUFLLHVCQUF1QjtBQUFBLEVBQzlCO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFLTyxpQkFBaUIsT0FBaUM7QUFDdkQsWUFBUSxLQUFLLG9GQUFvRjtBQUVqRyxTQUFLLFlBQVksS0FBSztBQUFBLEVBQ3hCO0FBQUEsRUFFTyxlQUFxQjtBQUMxQixTQUFLLFlBQVk7QUFFakIsYUFBUyxJQUFJLEdBQUcsSUFBSSxLQUFLLGNBQWMsUUFBUSxLQUFLO0FBQ2xELFlBQU0sYUFBYSxLQUFLLGNBQWMsQ0FBQztBQUN2QyxpQkFBVyxLQUFLLGFBQWE7QUFDN0IsaUJBQVcsS0FBSyxrQkFBa0IsT0FBTyxLQUFLO0FBQzlDLGlCQUFXLGFBQWE7QUFBQSxJQUMxQjtBQUFBLEVBQ0Y7QUFBQSxFQUVPLFFBQWM7QUFDbkIsU0FBSyxZQUFZO0FBRWpCLGFBQVMsSUFBSSxHQUFHLElBQUksS0FBSyxjQUFjLFFBQVEsS0FBSztBQUNsRCxZQUFNLGFBQWEsS0FBSyxjQUFjLENBQUM7QUFDdkMsaUJBQVcsS0FBSyxhQUFhO0FBQzdCLGlCQUFXLEtBQUssa0JBQWtCLE9BQU8sS0FBSztBQUM5QyxpQkFBVyxNQUFNO0FBQUEsSUFDbkI7QUFBQSxFQUNGO0FBQUEsRUFFTyxPQUFPLE9BQXFCO0FBQ2pDLFNBQUssWUFBWTtBQUVqQixhQUFTLElBQUksR0FBRyxJQUFJLEtBQUssV0FBVyxRQUFRLEtBQUs7QUFDL0MsV0FBSyxXQUFXLENBQUMsRUFBRSxrQkFBa0IsTUFBTSxHQUFHLEtBQUs7QUFBQSxJQUNyRDtBQUVBLGFBQVMsSUFBSSxHQUFHLElBQUksS0FBSyxjQUFjLFFBQVEsS0FBSztBQUVsRCxZQUFNLGFBQWEsS0FBSyxjQUFjLENBQUM7QUFDdkMsaUJBQVcsS0FBSyxhQUFhO0FBQzdCLGlCQUFXLEtBQUssa0JBQWtCLE9BQU8sS0FBSztBQUM5QyxpQkFBVyxPQUFPLEtBQUs7QUFJdkIsd0NBQWtDLFdBQVcsTUFBTSxLQUFLLHdCQUF3QjtBQUFBLElBQ2xGO0FBQUEsRUFDRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBUVEsY0FBYztBQUNwQixRQUFJLENBQUMsS0FBSyxzQkFBc0I7QUFDOUI7QUFBQSxJQUNGO0FBRUEsVUFBTSxrQkFBNkMsQ0FBQztBQUNwRCxVQUFNLG1CQUFtQixvQkFBSSxJQUF3QjtBQUNyRCxVQUFNLGtCQUFrQixvQkFBSSxJQUF3QjtBQUNwRCxVQUFNLFlBQVksb0JBQUksSUFBb0I7QUFFMUMsZUFBVyxjQUFjLEtBQUssU0FBUztBQUNyQyxXQUFLLGlCQUFpQixZQUFZLGtCQUFrQixpQkFBaUIsaUJBQWlCLFNBQVM7QUFBQSxJQUNqRztBQUNBLFNBQUssZ0JBQWdCO0FBRXJCLFVBQU0sTUFBTSxxQkFBcUIsU0FBUztBQUMxQyxTQUFLLGFBQWEsQ0FBQztBQUNuQixRQUFJLEtBQUs7QUFDUCxXQUFLLFdBQVcsS0FBSyxHQUFHO0FBQ3hCLHdDQUFrQyxLQUFLLENBQUMsV0FBMkI7QUF6S3pFO0FBMktRLGNBQUssZ0JBQUssc0JBQXNCLElBQUksTUFBTSxNQUFyQyxtQkFBd0MsU0FBeEMsWUFBZ0QsS0FBSyxHQUFHO0FBQzNELGlCQUFPO0FBQUEsUUFDVDtBQUNBLGFBQUssV0FBVyxLQUFLLE1BQU07QUFDM0IsZUFBTztBQUFBLE1BQ1QsQ0FBQztBQUFBLElBQ0g7QUFFQSxTQUFLLHVCQUF1QjtBQUFBLEVBQzlCO0FBQUEsRUFFUSxpQkFDTixZQUNBLGtCQUNBLGlCQUNBLGlCQUNBLFdBQ0E7QUFDQSxRQUFJLGdCQUFnQixJQUFJLFVBQVUsR0FBRztBQUNuQztBQUFBLElBQ0Y7QUFFQSxRQUFJLGlCQUFpQixJQUFJLFVBQVUsR0FBRztBQUNwQyxVQUFJLENBQUMsS0FBSyw4QkFBOEI7QUFDdEMsZ0JBQVEsS0FBSyxvREFBb0Q7QUFDakUsYUFBSywrQkFBK0I7QUFBQSxNQUN0QztBQUNBO0FBQUEsSUFDRjtBQUVBLHFCQUFpQixJQUFJLFVBQVU7QUFFL0IsVUFBTSxhQUFhLFdBQVc7QUFDOUIsZUFBVyxhQUFhLFlBQVk7QUFDbEMsVUFBSSx3QkFBd0I7QUFDNUIsVUFBSSxXQUFrQztBQUN0QyxnQ0FBMEIsV0FBVyxDQUFDLHNCQUFzQjtBQUMxRCxjQUFNLFlBQVksS0FBSyxzQkFBc0IsSUFBSSxpQkFBaUI7QUFDbEUsWUFBSSxXQUFXO0FBQ2IscUJBQVcsaUJBQWlCLFdBQVc7QUFDckMsb0NBQXdCO0FBQ3hCLGlCQUFLLGlCQUFpQixlQUFlLGtCQUFrQixpQkFBaUIsaUJBQWlCLFNBQVM7QUFBQSxVQUNwRztBQUFBLFFBQ0YsV0FBVyxDQUFDLHVCQUF1QjtBQUVqQyxxQkFBVztBQUFBLFFBQ2I7QUFBQSxNQUNGLENBQUM7QUFDRCxVQUFJLFVBQVU7QUFDWixrQkFBVSxJQUFJLFFBQVE7QUFBQSxNQUN4QjtBQUFBLElBQ0Y7QUFFQSxvQkFBZ0IsS0FBSyxVQUFVO0FBRS9CLG9CQUFnQixJQUFJLFVBQVU7QUFBQSxFQUNoQztBQUFBLEVBRVEseUJBQXlCLFFBQXdCO0FBck8zRDtBQXVPSSxVQUFLLGdCQUFLLHNCQUFzQixJQUFJLE1BQU0sTUFBckMsbUJBQXdDLFNBQXhDLFlBQWdELEtBQUssR0FBRztBQUMzRCxhQUFPO0FBQUEsSUFDVDtBQUdBLFdBQU8sa0JBQWtCLE9BQU8sS0FBSztBQUNyQyxXQUFPO0FBQUEsRUFDVDtBQUNGOzs7QUo5TkEsSUFBTSxtQ0FBbUM7QUFLekMsSUFBTSx5QkFBeUIsb0JBQUksSUFBSSxDQUFDLE9BQU8sVUFBVSxDQUFDO0FBSzFELElBQU0sNENBQTRDLG9CQUFJLElBQUksQ0FBQyxLQUFLLENBQUM7QUFFMUQsSUFBTSw2QkFBTixNQUFNLDJCQUFzRDtBQUFBLEVBMEJqRSxJQUFXLE9BQWU7QUFDeEIsV0FBTywyQkFBMEI7QUFBQSxFQUNuQztBQUFBLEVBRU8sWUFBWSxRQUFvQixTQUE0QztBQTNEckY7QUE0REksU0FBSyxTQUFTO0FBRWQsU0FBSyxrQkFBa0IsbUNBQVM7QUFDaEMsU0FBSyxxQkFBcUIsbUNBQVM7QUFDbkMsU0FBSyx3QkFBdUIsd0NBQVMseUJBQVQsWUFBaUM7QUFBQSxFQUMvRDtBQUFBLEVBRWEsVUFBVSxNQUEyQjtBQUFBO0FBQ2hELFdBQUssU0FBUyx1QkFBdUIsTUFBTSxLQUFLLFFBQVEsSUFBSTtBQUFBLElBQzlEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQVFjLFFBQVEsTUFBa0Q7QUFBQTtBQUN0RSxZQUFNLFdBQVcsTUFBTSxLQUFLLFVBQVUsSUFBSTtBQUMxQyxVQUFJLFlBQVksTUFBTTtBQUNwQixlQUFPO0FBQUEsTUFDVDtBQUVBLFlBQU0sV0FBVyxNQUFNLEtBQUssVUFBVSxJQUFJO0FBQzFDLFVBQUksWUFBWSxNQUFNO0FBQ3BCLGVBQU87QUFBQSxNQUNUO0FBRUEsYUFBTztBQUFBLElBQ1Q7QUFBQTtBQUFBLEVBRWMsVUFBVSxNQUFrRDtBQUFBO0FBM0Y1RTtBQTRGSSxZQUFNLE9BQU8sS0FBSyxPQUFPO0FBR3pCLFlBQU0scUJBQW1CLFVBQUssbUJBQUwsbUJBQXFCLFFBQVEsMkJBQTBCLHFCQUFvQjtBQUNwRyxVQUFJLENBQUMsa0JBQWtCO0FBQ3JCLGVBQU87QUFBQSxNQUNUO0FBRUEsWUFBTSxVQUFVLElBQUkscUJBQXFCO0FBRXpDLFlBQU0sYUFBK0IsTUFBTSxLQUFLLE9BQU8sZ0JBQWdCLE1BQU07QUFFN0UsWUFBTSxhQUFZLFVBQUssZUFBTCxtQkFBa0IsMkJBQTBCO0FBRzlELFVBQUksQ0FBQyxXQUFXO0FBQ2QsZUFBTztBQUFBLE1BQ1Q7QUFFQSxZQUFNLGNBQWMsVUFBVTtBQUM5QixVQUFJLENBQUMsdUJBQXVCLElBQUksV0FBVyxHQUFHO0FBQzVDLGdCQUFRO0FBQUEsVUFDTixzQ0FBc0MsMkJBQTBCLGNBQWMsaUJBQWlCLFdBQVc7QUFBQSxRQUM1RztBQUNBLGVBQU87QUFBQSxNQUNUO0FBRUEsWUFBTSxhQUFZLGVBQVUsY0FBVixtQkFBcUIsSUFBSSxDQUFDLGdCQUFnQixjQUFjO0FBdkg5RSxZQUFBQyxLQUFBQyxLQUFBQyxLQUFBQyxLQUFBQyxLQUFBO0FBd0hNLGNBQU0sT0FBTyxXQUFXLGVBQWUsSUFBSztBQUc1QyxZQUFJLFFBQVEsTUFBTTtBQUNoQixrQkFBUTtBQUFBLFlBQ04sNENBQTRDLFNBQVMsK0JBQStCLGVBQWUsSUFBSTtBQUFBLFVBQ3pHO0FBQ0EsaUJBQU87QUFBQSxRQUNUO0FBRUEsY0FBTSxjQUFjLGVBQWU7QUFJbkMsY0FBTSxvQkFDSkosTUFBQSxlQUFlLGVBQWYsZ0JBQUFBLElBQTRCO0FBRTlCLFlBQUksS0FBSyx3QkFBd0Isb0JBQW9CLE1BQU07QUFDekQsZ0JBQU0sd0JBQXdCLGlCQUFpQjtBQUMvQyxjQUFJLENBQUMsMENBQTBDLElBQUkscUJBQXFCLEdBQUc7QUFDekUsb0JBQVE7QUFBQSxjQUNOLHNDQUFzQyxnQ0FBZ0MsaUJBQWlCLHFCQUFxQix5QkFBeUIsMkJBQTBCLGNBQWM7QUFBQSxZQUMvSztBQUFBLFVBQ0YsT0FBTztBQUNMLGtCQUFNLGdCQUFnQixpQkFBaUI7QUFDdkMsZ0JBQUksY0FBYyxRQUFRO0FBQ3hCLHFCQUFPLEtBQUssc0JBQXNCLE1BQU07QUFBQSxnQkFDdEMsUUFBUSxJQUFVLGdCQUFRLEVBQUUsV0FBVUMsTUFBQSxjQUFjLE9BQU8sV0FBckIsT0FBQUEsTUFBK0IsQ0FBQyxHQUFLLEdBQUssQ0FBRyxDQUFDO0FBQUEsZ0JBQ3BGLFNBQVFDLE1BQUEsY0FBYyxPQUFPLFdBQXJCLE9BQUFBLE1BQStCO0FBQUEsZ0JBQ3ZDLFNBQVFDLE1BQUEsY0FBYyxPQUFPLFdBQXJCLE9BQUFBLE1BQStCO0FBQUEsY0FDekMsQ0FBQztBQUFBLFlBQ0gsV0FBVyxjQUFjLFNBQVM7QUFDaEMscUJBQU8sS0FBSyx1QkFBdUIsTUFBTTtBQUFBLGdCQUN2QyxRQUFRLElBQVUsZ0JBQVEsRUFBRSxXQUFVQyxNQUFBLGNBQWMsUUFBUSxXQUF0QixPQUFBQSxNQUFnQyxDQUFDLEdBQUssR0FBSyxDQUFHLENBQUM7QUFBQSxnQkFDckYsU0FBUSxtQkFBYyxRQUFRLFdBQXRCLFlBQWdDO0FBQUEsZ0JBQ3hDLE1BQU0sSUFBVSxnQkFBUSxFQUFFLFdBQVUsbUJBQWMsUUFBUSxTQUF0QixZQUE4QixDQUFDLEdBQUssR0FBSyxDQUFHLENBQUM7QUFBQSxnQkFDakYsU0FBUSxtQkFBYyxRQUFRLFdBQXRCLFlBQWdDO0FBQUEsY0FDMUMsQ0FBQztBQUFBLFlBQ0gsV0FBVyxjQUFjLE9BQU87QUFDOUIscUJBQU8sS0FBSyxxQkFBcUIsTUFBTTtBQUFBLGdCQUNyQyxRQUFRLElBQVUsZ0JBQVEsRUFBRSxXQUFVLG1CQUFjLE1BQU0sV0FBcEIsWUFBOEIsQ0FBQyxHQUFLLEdBQUssQ0FBRyxDQUFDO0FBQUEsZ0JBQ25GLFFBQVEsSUFBVSxnQkFBUSxFQUFFLFdBQVUsbUJBQWMsTUFBTSxXQUFwQixZQUE4QixDQUFDLEdBQUssR0FBSyxDQUFHLENBQUM7QUFBQSxjQUNyRixDQUFDO0FBQUEsWUFDSDtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBRUEsWUFBSSxZQUFZLFFBQVE7QUFDdEIsaUJBQU8sS0FBSyxzQkFBc0IsTUFBTTtBQUFBLFlBQ3RDLFFBQVEsSUFBVSxnQkFBUSxFQUFFLFdBQVUsaUJBQVksT0FBTyxXQUFuQixZQUE2QixDQUFDLEdBQUssR0FBSyxDQUFHLENBQUM7QUFBQSxZQUNsRixTQUFRLGlCQUFZLE9BQU8sV0FBbkIsWUFBNkI7QUFBQSxZQUNyQyxRQUFRO0FBQUEsVUFDVixDQUFDO0FBQUEsUUFDSCxXQUFXLFlBQVksU0FBUztBQUM5QixpQkFBTyxLQUFLLHVCQUF1QixNQUFNO0FBQUEsWUFDdkMsUUFBUSxJQUFVLGdCQUFRLEVBQUUsV0FBVSxpQkFBWSxRQUFRLFdBQXBCLFlBQThCLENBQUMsR0FBSyxHQUFLLENBQUcsQ0FBQztBQUFBLFlBQ25GLFNBQVEsaUJBQVksUUFBUSxXQUFwQixZQUE4QjtBQUFBLFlBQ3RDLE1BQU0sSUFBVSxnQkFBUSxFQUFFLFdBQVUsaUJBQVksUUFBUSxTQUFwQixZQUE0QixDQUFDLEdBQUssR0FBSyxDQUFHLENBQUM7QUFBQSxZQUMvRSxRQUFRO0FBQUEsVUFDVixDQUFDO0FBQUEsUUFDSDtBQUVBLGNBQU0sSUFBSSxNQUFNLDRDQUE0QyxTQUFTLHFCQUFxQjtBQUFBLE1BQzVGO0FBRUEsWUFBTSxrQkFBaUIsZUFBVSxtQkFBVixtQkFBMEI7QUFBQSxRQUMvQyxDQUFDLHFCQUFxQixtQkFBK0M7QUExTDNFLGNBQUFKO0FBMkxRLGdCQUFNLFNBQVFBLE1BQUEsb0JBQW9CLGNBQXBCLE9BQUFBLE1BQWlDLENBQUMsR0FBRyxRQUFRLENBQUMsY0FBYztBQUN4RSxrQkFBTSxNQUFNLHVDQUFZO0FBRXhCLGdCQUFJLE9BQU8sTUFBTTtBQUNmLHNCQUFRO0FBQUEsZ0JBQ04saURBQWlELGNBQWMsaUNBQWlDLFNBQVM7QUFBQSxjQUMzRztBQUNBLHFCQUFPLENBQUM7QUFBQSxZQUNWO0FBRUEsbUJBQU87QUFBQSxVQUNULENBQUM7QUFFRCxpQkFBTztBQUFBLFlBQ0wsV0FBVztBQUFBLFlBQ1gsTUFBTSxvQkFBb0I7QUFBQSxVQUM1QjtBQUFBLFFBQ0Y7QUFBQTtBQUdGLHNCQUFVLFlBQVYsbUJBQW1CLFFBQVEsQ0FBQyxjQUFjLFlBQVk7QUEvTTFELFlBQUFBO0FBZ05NLGNBQU0sZUFBZSxhQUFhO0FBR2xDLGNBQU0sMkJBQTBCQSxNQUFBLGFBQWEsbUJBQWIsZ0JBQUFBLElBQTZCLElBQUksQ0FBQyxtQkFBbUI7QUFDbkYsZ0JBQU0sUUFBUSxpREFBaUI7QUFFL0IsY0FBSSxTQUFTLE1BQU07QUFDakIsa0JBQU0sSUFBSTtBQUFBLGNBQ1IsMENBQTBDLE9BQU8scUNBQXFDLGNBQWM7QUFBQSxZQUN0RztBQUFBLFVBQ0Y7QUFFQSxpQkFBTztBQUFBLFFBQ1Q7QUFFQSxjQUFNLFNBQVMsYUFBYSxVQUFVLE9BQU8sV0FBVyxhQUFhLE1BQU0sSUFBSTtBQUUvRSxZQUFJO0FBQ0oscUJBQWEsUUFBUSxDQUFDLGdCQUFnQjtBQUNwQyxjQUFJLGlCQUFpQjtBQUVuQixrQkFBTSxZQUFZLGdCQUFnQjtBQUNsQyxrQkFBTSxPQUFPLFdBQVcsU0FBUztBQUNqQyxrQkFBTSxhQUFhLFlBQVk7QUFDL0Isa0JBQU0sUUFBUSxXQUFXLFVBQVU7QUFHbkMsa0JBQU0sVUFBK0M7QUFBQSxjQUNuRCxXQUFXLGdCQUFnQjtBQUFBLGNBQzNCLFdBQVcsZ0JBQWdCO0FBQUEsY0FDM0IsY0FBYyxnQkFBZ0I7QUFBQSxjQUM5QixXQUFXLGdCQUFnQjtBQUFBLGNBQzNCLFlBQ0UsZ0JBQWdCLGNBQWMsT0FDMUIsSUFBVSxnQkFBUSxFQUFFLFVBQVUsZ0JBQWdCLFVBQVUsSUFDeEQ7QUFBQSxZQUNSO0FBR0Esa0JBQU0sUUFBUSxLQUFLLGFBQWEsTUFBTSxPQUFPLFNBQVMsdUJBQXVCO0FBQzdFLGdCQUFJLFFBQVE7QUFDVixvQkFBTSxTQUFTO0FBQUEsWUFDakI7QUFFQSxvQkFBUSxTQUFTLEtBQUs7QUFBQSxVQUN4QjtBQUVBLDRCQUFrQjtBQUFBLFFBQ3BCLENBQUM7QUFBQSxNQUNIO0FBR0EsY0FBUSxhQUFhO0FBRXJCLGFBQU87QUFBQSxJQUNUO0FBQUE7QUFBQSxFQUVjLFVBQVUsTUFBa0Q7QUFBQTtBQXpRNUU7QUEwUUksWUFBTSxPQUFPLEtBQUssT0FBTztBQUd6QixZQUFNLGNBQVksVUFBSyxtQkFBTCxtQkFBcUIsUUFBUSxZQUFXO0FBQzFELFVBQUksQ0FBQyxXQUFXO0FBQ2QsZUFBTztBQUFBLE1BQ1Q7QUFHQSxZQUFNLGFBQVksVUFBSyxlQUFMLG1CQUFrQjtBQUNwQyxZQUFNLDJCQUEyQix1Q0FBVztBQUM1QyxVQUFJLENBQUMsMEJBQTBCO0FBQzdCLGVBQU87QUFBQSxNQUNUO0FBRUEsWUFBTSxtQkFBbUIscUVBQTBCO0FBQ25ELFVBQUksQ0FBQyxrQkFBa0I7QUFDckIsZUFBTztBQUFBLE1BQ1Q7QUFFQSxZQUFNLFVBQVUsSUFBSSxxQkFBcUI7QUFFekMsWUFBTSxhQUErQixNQUFNLEtBQUssT0FBTyxnQkFBZ0IsTUFBTTtBQUU3RSxZQUFNLGtCQUFpQiw4QkFBeUIsbUJBQXpCLG1CQUF5QztBQUFBLFFBQzlELENBQUMsd0JBQW9EO0FBblMzRCxjQUFBQTtBQW9TUSxnQkFBTSxPQUFPLFdBQVcsb0JBQW9CLElBQUs7QUFDakQsZ0JBQU0sY0FBYUEsTUFBQSxvQkFBb0IsY0FBcEIsT0FBQUEsTUFBaUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsY0FBYztBQXJTbkcsZ0JBQUFBLEtBQUFDLEtBQUFDO0FBc1NVLGtCQUFNLFNBQVMsSUFBVSxnQkFBUSxHQUFLLEdBQUssQ0FBRztBQUM5QyxnQkFBSSxlQUFlLFFBQVE7QUFDekIscUJBQU87QUFBQSxpQkFDTEYsTUFBQSxlQUFlLE9BQU8sTUFBdEIsT0FBQUEsTUFBMkI7QUFBQSxpQkFDM0JDLE1BQUEsZUFBZSxPQUFPLE1BQXRCLE9BQUFBLE1BQTJCO0FBQUEsZ0JBQzNCLGVBQWUsT0FBTyxJQUFJLENBQUMsZUFBZSxPQUFPLElBQUk7QUFBQTtBQUFBLGNBQ3ZEO0FBQUEsWUFDRjtBQUVBLG1CQUFPLEtBQUssc0JBQXNCLE1BQU07QUFBQSxjQUN0QztBQUFBLGNBQ0EsU0FBUUMsTUFBQSxlQUFlLFdBQWYsT0FBQUEsTUFBeUI7QUFBQSxjQUNqQyxRQUFRO0FBQUEsWUFDVixDQUFDO0FBQUEsVUFDSCxDQUFDO0FBRUQsaUJBQU8sRUFBRSxVQUFVO0FBQUEsUUFDckI7QUFBQTtBQUlGLDJEQUFrQixRQUFRLENBQUMsaUJBQWlCLGVBQWU7QUFDekQsY0FBTSxjQUFjLGdCQUFnQjtBQUNwQyxZQUFJLENBQUMsYUFBYTtBQUNoQjtBQUFBLFFBQ0Y7QUFFQSxvQkFBWSxRQUFRLENBQUMsY0FBYztBQWpVekMsY0FBQUYsS0FBQUMsS0FBQUMsS0FBQTtBQWtVUSxnQkFBTSxPQUFPLFdBQVcsU0FBUztBQUdqQyxnQkFBTSxhQUFhLElBQVUsZ0JBQVE7QUFDckMsY0FBSSxnQkFBZ0IsWUFBWTtBQUM5Qix1QkFBVztBQUFBLGVBQ1RGLE1BQUEsZ0JBQWdCLFdBQVcsTUFBM0IsT0FBQUEsTUFBZ0M7QUFBQSxlQUNoQ0MsTUFBQSxnQkFBZ0IsV0FBVyxNQUEzQixPQUFBQSxNQUFnQztBQUFBLGVBQ2hDQyxNQUFBLGdCQUFnQixXQUFXLE1BQTNCLE9BQUFBLE1BQWdDO0FBQUEsWUFDbEM7QUFBQSxVQUNGLE9BQU87QUFDTCx1QkFBVyxJQUFJLEdBQUssSUFBTSxDQUFHO0FBQUEsVUFDL0I7QUFFQSxnQkFBTSxTQUFTLGdCQUFnQixVQUFVLE9BQU8sV0FBVyxnQkFBZ0IsTUFBTSxJQUFJO0FBRXJGLGdCQUFNLFVBQStDO0FBQUEsWUFDbkQsV0FBVyxnQkFBZ0I7QUFBQSxZQUMzQixXQUFXLGdCQUFnQjtBQUFBLFlBQzNCLGNBQWMsZ0JBQWdCO0FBQUEsWUFDOUIsV0FBVyxnQkFBZ0I7QUFBQSxZQUMzQjtBQUFBLFVBQ0Y7QUFHQSxnQkFBTSwyQkFBMEIscUJBQWdCLG1CQUFoQixtQkFBZ0MsSUFBSSxDQUFDLG1CQUFtQjtBQUN0RixrQkFBTSxRQUFRLGlEQUFpQjtBQUUvQixnQkFBSSxTQUFTLE1BQU07QUFDakIsb0JBQU0sSUFBSTtBQUFBLGdCQUNSLDBDQUEwQyxVQUFVLHFDQUFxQyxjQUFjO0FBQUEsY0FDekc7QUFBQSxZQUNGO0FBRUEsbUJBQU87QUFBQSxVQUNUO0FBR0EsZUFBSyxTQUFTLENBQUMsU0FBUztBQXhXaEMsZ0JBQUFGO0FBeVdVLGtCQUFNLFNBQStCQSxNQUFBLEtBQUssU0FBUyxDQUFDLE1BQWYsT0FBQUEsTUFBb0I7QUFFekQsa0JBQU0sUUFBUSxLQUFLLGFBQWEsTUFBTSxPQUFPLFNBQVMsdUJBQXVCO0FBQzdFLGdCQUFJLFFBQVE7QUFDVixvQkFBTSxTQUFTO0FBQUEsWUFDakI7QUFFQSxvQkFBUSxTQUFTLEtBQUs7QUFBQSxVQUN4QixDQUFDO0FBQUEsUUFDSCxDQUFDO0FBQUEsTUFDSDtBQUdBLFdBQUssTUFBTSxrQkFBa0I7QUFDN0IsY0FBUSxhQUFhO0FBRXJCLGFBQU87QUFBQSxJQUNUO0FBQUE7QUFBQSxFQUVRLGFBQ04sTUFDQSxPQUNBLFNBQ0EseUJBQ29CO0FBQ3BCLFVBQU0sYUFBYSxJQUFJLG1CQUFtQixNQUFNLE9BQU8sU0FBUyx1QkFBdUI7QUFFdkYsUUFBSSxLQUFLLGlCQUFpQjtBQUN4QixZQUFNLFNBQVMsSUFBSSx5QkFBeUIsVUFBVTtBQUN0RCxXQUFLLGdCQUFnQixJQUFJLE1BQU07QUFDL0IsYUFBTyxjQUFjLEtBQUssZ0JBQWdCO0FBQUEsSUFDNUM7QUFFQSxXQUFPO0FBQUEsRUFDVDtBQUFBLEVBRVEsc0JBQ04sYUFDQSxRQUt1QjtBQUN2QixVQUFNLFFBQVEsSUFBSSxpQ0FBaUMsTUFBTTtBQUV6RCxVQUFNLFdBQVcsSUFBSSxzQkFBc0IsS0FBSztBQUVoRCxnQkFBWSxJQUFJLFFBQVE7QUFFeEIsUUFBSSxLQUFLLG9CQUFvQjtBQUMzQixZQUFNLFNBQVMsSUFBSSw0QkFBNEIsUUFBUTtBQUN2RCxXQUFLLG1CQUFtQixJQUFJLE1BQU07QUFDbEMsYUFBTyxjQUFjLEtBQUssbUJBQW1CO0FBQUEsSUFDL0M7QUFFQSxXQUFPO0FBQUEsRUFDVDtBQUFBLEVBRVEsdUJBQ04sYUFDQSxRQU11QjtBQUN2QixVQUFNLFFBQVEsSUFBSSxrQ0FBa0MsTUFBTTtBQUUxRCxVQUFNLFdBQVcsSUFBSSxzQkFBc0IsS0FBSztBQUVoRCxnQkFBWSxJQUFJLFFBQVE7QUFFeEIsUUFBSSxLQUFLLG9CQUFvQjtBQUMzQixZQUFNLFNBQVMsSUFBSSw0QkFBNEIsUUFBUTtBQUN2RCxXQUFLLG1CQUFtQixJQUFJLE1BQU07QUFDbEMsYUFBTyxjQUFjLEtBQUssbUJBQW1CO0FBQUEsSUFDL0M7QUFFQSxXQUFPO0FBQUEsRUFDVDtBQUFBLEVBRVEscUJBQ04sYUFDQSxRQUl1QjtBQUN2QixVQUFNLFFBQVEsSUFBSSxnQ0FBZ0MsTUFBTTtBQUV4RCxVQUFNLFdBQVcsSUFBSSxzQkFBc0IsS0FBSztBQUVoRCxnQkFBWSxJQUFJLFFBQVE7QUFFeEIsUUFBSSxLQUFLLG9CQUFvQjtBQUMzQixZQUFNLFNBQVMsSUFBSSw0QkFBNEIsUUFBUTtBQUN2RCxXQUFLLG1CQUFtQixJQUFJLE1BQU07QUFDbEMsYUFBTyxjQUFjLEtBQUssbUJBQW1CO0FBQUEsSUFDL0M7QUFFQSxXQUFPO0FBQUEsRUFDVDtBQUNGO0FBcGJhLDJCQUNZLGlCQUFpQjtBQURuQyxJQUFNLDRCQUFOOyIsCiAgIm5hbWVzIjogWyJUSFJFRSIsICJUSFJFRSIsICJfdjNBIiwgIlRIUkVFIiwgIl92M0EiLCAiVEhSRUUiLCAiX3YzQSIsICJUSFJFRSIsICJUSFJFRSIsICJfdjNBIiwgIlRIUkVFIiwgIlRIUkVFIiwgIl92M0EiLCAiVEhSRUUiLCAiVEhSRUUiLCAiVEhSRUUiLCAiVEhSRUUiLCAiX3YzQSIsICJfdjNCIiwgIl9tYXRBIiwgIlRIUkVFIiwgIl9hIiwgIl9iIiwgIl9jIiwgIl9kIiwgIl9lIl0KfQo=
