/*!
 * @pixiv/three-vrm-springbone v1.0.0
 * Spring bone module for @pixiv/three-vrm
 *
 * Copyright (c) 2020-2021 pixiv Inc.
 * @pixiv/three-vrm-springbone is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three')) :
    typeof define === 'function' && define.amd ? define(['exports', 'three'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.THREE_VRM_SPRINGBONE = {}, global.THREE));
}(this, (function (exports, THREE) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }

    var THREE__namespace = /*#__PURE__*/_interopNamespace(THREE);

    /**
     * Represents a shape of a collider.
     */
    class VRMSpringBoneColliderShape {
    }

    const _v3A$1 = new THREE__namespace.Vector3();
    const _v3B$1 = new THREE__namespace.Vector3();
    class VRMSpringBoneColliderShapeCapsule extends VRMSpringBoneColliderShape {
        constructor(params) {
            var _a, _b, _c;
            super();
            this.offset = (_a = params === null || params === void 0 ? void 0 : params.offset) !== null && _a !== void 0 ? _a : new THREE__namespace.Vector3(0.0, 0.0, 0.0);
            this.tail = (_b = params === null || params === void 0 ? void 0 : params.tail) !== null && _b !== void 0 ? _b : new THREE__namespace.Vector3(0.0, 0.0, 0.0);
            this.radius = (_c = params === null || params === void 0 ? void 0 : params.radius) !== null && _c !== void 0 ? _c : 0.0;
        }
        get type() {
            return 'capsule';
        }
        calculateCollision(colliderMatrix, objectPosition, objectRadius, target) {
            _v3A$1.copy(this.offset).applyMatrix4(colliderMatrix); // transformed head
            _v3B$1.copy(this.tail).applyMatrix4(colliderMatrix); // transformed tail
            _v3B$1.sub(_v3A$1); // from head to tail
            const lengthSqCapsule = _v3B$1.lengthSq();
            target.copy(objectPosition).sub(_v3A$1); // from head to object
            const dot = _v3B$1.dot(target); // dot product of offsetToTail and offsetToObject
            if (dot <= 0.0) ;
            else if (lengthSqCapsule <= dot) {
                // if object is near from the tail
                target.sub(_v3B$1); // from tail to object
            }
            else {
                // if object is between two ends
                _v3B$1.multiplyScalar(dot / lengthSqCapsule); // from head to the nearest point of the shaft
                target.sub(_v3B$1); // from the shaft point to object
            }
            const radius = objectRadius + this.radius;
            const distance = target.length() - radius;
            target.normalize();
            return distance;
        }
    }

    class VRMSpringBoneColliderShapeSphere extends VRMSpringBoneColliderShape {
        constructor(params) {
            var _a, _b;
            super();
            this.offset = (_a = params === null || params === void 0 ? void 0 : params.offset) !== null && _a !== void 0 ? _a : new THREE__namespace.Vector3(0.0, 0.0, 0.0);
            this.radius = (_b = params === null || params === void 0 ? void 0 : params.radius) !== null && _b !== void 0 ? _b : 0.0;
        }
        get type() {
            return 'sphere';
        }
        calculateCollision(colliderMatrix, objectPosition, objectRadius, target) {
            target.copy(this.offset).applyMatrix4(colliderMatrix); // transformed offset
            target.negate().add(objectPosition); // a vector from collider center to object position
            const radius = objectRadius + this.radius;
            const distance = target.length() - radius;
            target.normalize();
            return distance;
        }
    }

    const _vecA = new THREE__namespace.Vector3();
    class ColliderShapeCapsuleBufferGeometry extends THREE__namespace.BufferGeometry {
        constructor(shape) {
            super();
            this._currentRadius = 0;
            this._currentOffset = new THREE__namespace.Vector3();
            this._currentTail = new THREE__namespace.Vector3();
            this._shape = shape;
            this._attrPos = new THREE__namespace.BufferAttribute(new Float32Array(396), 3);
            this.setAttribute('position', this._attrPos);
            this._attrIndex = new THREE__namespace.BufferAttribute(new Uint16Array(264), 1);
            this.setIndex(this._attrIndex);
            this._buildIndex();
            this.update();
        }
        update() {
            let shouldUpdateGeometry = false;
            if (this._currentRadius !== this._shape.radius) {
                this._currentRadius = this._shape.radius;
                shouldUpdateGeometry = true;
            }
            if (!this._currentOffset.equals(this._shape.offset)) {
                this._currentOffset.copy(this._shape.offset);
                shouldUpdateGeometry = true;
            }
            if (!this._currentTail.equals(this._shape.tail)) {
                this._currentTail.copy(this._shape.tail);
                shouldUpdateGeometry = true;
            }
            if (shouldUpdateGeometry) {
                this._buildPosition();
            }
        }
        _buildPosition() {
            _vecA.copy(this._currentTail).sub(this._currentOffset);
            const l = _vecA.length() / this._currentRadius;
            for (let i = 0; i <= 16; i++) {
                const t = (i / 16.0) * Math.PI;
                this._attrPos.setXYZ(i, -Math.sin(t), -Math.cos(t), 0.0);
                this._attrPos.setXYZ(17 + i, l + Math.sin(t), Math.cos(t), 0.0);
                this._attrPos.setXYZ(34 + i, -Math.sin(t), 0.0, -Math.cos(t));
                this._attrPos.setXYZ(51 + i, l + Math.sin(t), 0.0, Math.cos(t));
            }
            for (let i = 0; i < 32; i++) {
                const t = (i / 16.0) * Math.PI;
                this._attrPos.setXYZ(68 + i, 0.0, Math.sin(t), Math.cos(t));
                this._attrPos.setXYZ(100 + i, l, Math.sin(t), Math.cos(t));
            }
            const theta = Math.atan2(_vecA.y, Math.sqrt(_vecA.x * _vecA.x + _vecA.z * _vecA.z));
            const phi = -Math.atan2(_vecA.z, _vecA.x);
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
    }

    class ColliderShapeSphereBufferGeometry extends THREE__namespace.BufferGeometry {
        constructor(shape) {
            super();
            this._currentRadius = 0;
            this._currentOffset = new THREE__namespace.Vector3();
            this._shape = shape;
            this._attrPos = new THREE__namespace.BufferAttribute(new Float32Array(32 * 3 * 3), 3);
            this.setAttribute('position', this._attrPos);
            this._attrIndex = new THREE__namespace.BufferAttribute(new Uint16Array(64 * 3), 1);
            this.setIndex(this._attrIndex);
            this._buildIndex();
            this.update();
        }
        update() {
            let shouldUpdateGeometry = false;
            if (this._currentRadius !== this._shape.radius) {
                this._currentRadius = this._shape.radius;
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
                const t = (i / 16.0) * Math.PI;
                this._attrPos.setXYZ(i, Math.cos(t), Math.sin(t), 0.0);
                this._attrPos.setXYZ(32 + i, 0.0, Math.cos(t), Math.sin(t));
                this._attrPos.setXYZ(64 + i, Math.sin(t), 0.0, Math.cos(t));
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
    }

    class VRMSpringBoneColliderHelper extends THREE__namespace.Group {
        constructor(collider) {
            super();
            this.matrixAutoUpdate = false;
            this.collider = collider;
            if (this.collider.shape instanceof VRMSpringBoneColliderShapeSphere) {
                this._geometry = new ColliderShapeSphereBufferGeometry(this.collider.shape);
            }
            else if (this.collider.shape instanceof VRMSpringBoneColliderShapeCapsule) {
                this._geometry = new ColliderShapeCapsuleBufferGeometry(this.collider.shape);
            }
            else {
                throw new Error('VRMSpringBoneColliderHelper: Unknown collider shape type detected');
            }
            const material = new THREE__namespace.LineBasicMaterial({
                color: 0xff00ff,
                depthTest: false,
                depthWrite: false,
            });
            this._line = new THREE__namespace.LineSegments(this._geometry, material);
            this.add(this._line);
        }
        dispose() {
            this._geometry.dispose();
        }
        updateMatrixWorld(force) {
            this.collider.updateWorldMatrix(true, false);
            this.matrix.copy(this.collider.matrixWorld);
            this._geometry.update();
            super.updateMatrixWorld(force);
        }
    }

    class SpringBoneBufferGeometry extends THREE__namespace.BufferGeometry {
        constructor(springBone) {
            super();
            this._currentRadius = 0;
            this._currentTail = new THREE__namespace.Vector3();
            this._springBone = springBone;
            this._attrPos = new THREE__namespace.BufferAttribute(new Float32Array(294), 3);
            this.setAttribute('position', this._attrPos);
            this._attrIndex = new THREE__namespace.BufferAttribute(new Uint16Array(194), 1);
            this.setIndex(this._attrIndex);
            this._buildIndex();
            this.update();
        }
        update() {
            let shouldUpdateGeometry = false;
            if (this._currentRadius !== this._springBone.settings.hitRadius) {
                this._currentRadius = this._springBone.settings.hitRadius;
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
                const t = (i / 16.0) * Math.PI;
                this._attrPos.setXYZ(i, Math.cos(t), Math.sin(t), 0.0);
                this._attrPos.setXYZ(32 + i, 0.0, Math.cos(t), Math.sin(t));
                this._attrPos.setXYZ(64 + i, Math.sin(t), 0.0, Math.cos(t));
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
    }

    class VRMSpringBoneJointHelper extends THREE__namespace.Group {
        constructor(springBone) {
            super();
            this.matrixAutoUpdate = false;
            this.springBone = springBone;
            this._geometry = new SpringBoneBufferGeometry(this.springBone);
            const material = new THREE__namespace.LineBasicMaterial({
                color: 0xffff00,
                depthTest: false,
                depthWrite: false,
            });
            this._line = new THREE__namespace.LineSegments(this._geometry, material);
            this.add(this._line);
        }
        dispose() {
            this._geometry.dispose();
        }
        updateMatrixWorld(force) {
            this.springBone.bone.updateWorldMatrix(true, false);
            this.matrix.copy(this.springBone.bone.matrixWorld);
            this._geometry.update();
            super.updateMatrixWorld(force);
        }
    }

    /**
     * Represents a collider of a VRM.
     */
    class VRMSpringBoneCollider extends THREE__namespace.Object3D {
        constructor(shape) {
            super();
            this.shape = shape;
        }
    }

    const _matA$1 = new THREE__namespace.Matrix4();
    /**
     * A compat function for `Matrix4.invert()` / `Matrix4.getInverse()`.
     * `Matrix4.invert()` is introduced in r123 and `Matrix4.getInverse()` emits a warning.
     * We are going to use this compat for a while.
     * @param target A target matrix
     */
    function mat4InvertCompat(target) {
        if (target.invert) {
            target.invert();
        }
        else {
            target.getInverse(_matA$1.copy(target));
        }
        return target;
    }

    class Matrix4InverseCache {
        constructor(matrix) {
            /**
             * A cache of inverse of current matrix.
             */
            this._inverseCache = new THREE__namespace.Matrix4();
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
                },
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
                this._inverseCache.copy(this.matrix);
                mat4InvertCompat(this._inverseCache);
                this._shouldUpdateInverse = false;
            }
            return this._inverseCache;
        }
        revert() {
            this.matrix.elements = this._originalElements;
        }
    }

    // based on
    // http://rocketjump.skr.jp/unity3d/109/
    // https://github.com/dwango/UniVRM/blob/master/Scripts/SpringBone/VRMSpringBone.cs
    const IDENTITY_MATRIX4 = new THREE__namespace.Matrix4();
    // 計算中の一時保存用変数（一度インスタンスを作ったらあとは使い回す）
    const _v3A = new THREE__namespace.Vector3();
    const _v3B = new THREE__namespace.Vector3();
    const _v3C = new THREE__namespace.Vector3();
    /**
     * A temporary variable which is used in `update`
     */
    const _worldSpacePosition = new THREE__namespace.Vector3();
    /**
     * A temporary variable which is used in `update`
     */
    const _centerSpacePosition = new THREE__namespace.Vector3();
    /**
     * A temporary variable which is used in `update`
     */
    const _nextTail = new THREE__namespace.Vector3();
    const _quatA = new THREE__namespace.Quaternion();
    const _matA = new THREE__namespace.Matrix4();
    const _matB = new THREE__namespace.Matrix4();
    /**
     * A class represents a single joint of a spring bone.
     * It should be managed by a [[VRMSpringBoneManager]].
     */
    class VRMSpringBoneJoint {
        /**
         * Create a new VRMSpringBone.
         *
         * @param bone An Object3D that will be attached to this bone
         * @param child An Object3D that will be used as a tail of this spring bone. It can be null when the spring bone is imported from VRM 0.0
         * @param settings Several parameters related to behavior of the spring bone
         * @param colliderGroups Collider groups that will be collided with this spring bone
         */
        constructor(bone, child, settings = {}, colliderGroups = []) {
            var _a, _b, _c, _d, _e, _f;
            /**
             * Current position of child tail, in center unit. Will be used for verlet integration.
             */
            this._currentTail = new THREE__namespace.Vector3();
            /**
             * Previous position of child tail, in center unit. Will be used for verlet integration.
             */
            this._prevTail = new THREE__namespace.Vector3();
            /**
             * Initial axis of the bone, in local unit.
             */
            this._boneAxis = new THREE__namespace.Vector3();
            /**
             * Length of the bone in world unit. Will be used for normalization in update loop.
             * It's same as local unit length unless there are scale transformations in the world space.
             */
            this._worldSpaceBoneLength = 0.0;
            /**
             * This springbone will be calculated based on the space relative from this object.
             * If this is `null`, springbone will be calculated in world space.
             */
            this._center = null;
            /**
             * Initial state of the local matrix of the bone.
             */
            this._initialLocalMatrix = new THREE__namespace.Matrix4();
            /**
             * Initial state of the rotation of the bone.
             */
            this._initialLocalRotation = new THREE__namespace.Quaternion();
            /**
             * Initial state of the position of its child.
             */
            this._initialLocalChildPosition = new THREE__namespace.Vector3();
            this.bone = bone; // uniVRMでの parent
            this.bone.matrixAutoUpdate = false; // updateにより計算されるのでthree.js内での自動処理は不要
            this.child = child;
            this.settings = {
                hitRadius: (_a = settings.hitRadius) !== null && _a !== void 0 ? _a : 0.0,
                stiffness: (_b = settings.stiffness) !== null && _b !== void 0 ? _b : 1.0,
                gravityPower: (_c = settings.gravityPower) !== null && _c !== void 0 ? _c : 0.0,
                gravityDir: (_e = (_d = settings.gravityDir) === null || _d === void 0 ? void 0 : _d.clone()) !== null && _e !== void 0 ? _e : new THREE__namespace.Vector3(0.0, -1.0, 0.0),
                dragForce: (_f = settings.dragForce) !== null && _f !== void 0 ? _f : 0.4,
            };
            this.colliderGroups = colliderGroups;
        }
        get center() {
            return this._center;
        }
        set center(center) {
            var _a;
            // uninstall inverse cache
            if ((_a = this._center) === null || _a === void 0 ? void 0 : _a.userData.inverseCacheProxy) {
                this._center.userData.inverseCacheProxy.revert();
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
            // remember initial position of itself
            this._initialLocalMatrix.copy(this.bone.matrix);
            this._initialLocalRotation.copy(this.bone.quaternion);
            // see initial position of its local child
            if (this.child) {
                this._initialLocalChildPosition.copy(this.child.position);
            }
            else {
                // vrm0 requires a 7cm fixed bone length for the final node in a chain
                // See: https://github.com/vrm-c/vrm-specification/tree/master/specification/VRMC_springBone-1.0#about-spring-configuration
                this._initialLocalChildPosition.copy(this.bone.position).normalize().multiplyScalar(0.07);
            }
            // copy the child position to tails
            this.bone.localToWorld(this._currentTail.copy(this._initialLocalChildPosition));
            this._prevTail.copy(this._currentTail);
            // set initial states that are related to local child position
            this._boneAxis.copy(this._initialLocalChildPosition).normalize();
            this._worldSpaceBoneLength = _v3A
                .copy(this._initialLocalChildPosition)
                .applyMatrix4(this.bone.matrixWorld)
                .sub(_v3B.setFromMatrixPosition(this.bone.matrixWorld))
                .length();
        }
        /**
         * Reset the state of this bone.
         * You might want to call [[VRMSpringBoneManager.reset]] instead.
         */
        reset() {
            this.bone.quaternion.copy(this._initialLocalRotation);
            // We need to update its matrixWorld manually, since we tweaked the bone by our hand
            this.bone.updateMatrix();
            this.bone.matrixWorld.multiplyMatrices(this._parentMatrixWorld, this.bone.matrix);
            // Apply updated position to tail states
            const matrixWorldToCenter = this._getMatrixWorldToCenter(_matA);
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
            if (delta <= 0)
                return;
            // Get bone position in center space
            _worldSpacePosition.setFromMatrixPosition(this.bone.matrixWorld);
            let matrixWorldToCenter = this._getMatrixWorldToCenter(_matA);
            _centerSpacePosition.copy(_worldSpacePosition).applyMatrix4(matrixWorldToCenter);
            const quatWorldToCenter = _quatA.setFromRotationMatrix(matrixWorldToCenter);
            // Get parent matrix in center space
            const centerSpaceParentMatrix = _matB.copy(matrixWorldToCenter).multiply(this._parentMatrixWorld);
            // Get boneAxis in center space
            const centerSpaceBoneAxis = _v3B
                .copy(this._boneAxis)
                .applyMatrix4(this._initialLocalMatrix)
                .applyMatrix4(centerSpaceParentMatrix)
                .sub(_centerSpacePosition)
                .normalize();
            // gravity in center space
            const centerSpaceGravity = _v3C.copy(this.settings.gravityDir).applyQuaternion(quatWorldToCenter).normalize();
            const matrixCenterToWorld = this._getMatrixCenterToWorld(_matA);
            // verlet積分で次の位置を計算
            _nextTail
                .copy(this._currentTail)
                .add(_v3A
                .copy(this._currentTail)
                .sub(this._prevTail)
                .multiplyScalar(1 - this.settings.dragForce)) // 前フレームの移動を継続する(減衰もあるよ)
                .add(_v3A.copy(centerSpaceBoneAxis).multiplyScalar(this.settings.stiffness * delta)) // 親の回転による子ボーンの移動目標
                .add(_v3A.copy(centerSpaceGravity).multiplyScalar(this.settings.gravityPower * delta)) // 外力による移動量
                .applyMatrix4(matrixCenterToWorld); // tailをworld spaceに戻す
            // normalize bone length
            _nextTail.sub(_worldSpacePosition).normalize().multiplyScalar(this._worldSpaceBoneLength).add(_worldSpacePosition);
            // Collisionで移動
            this._collision(_nextTail);
            // update prevTail and currentTail
            matrixWorldToCenter = this._getMatrixWorldToCenter(_matA);
            this._prevTail.copy(this._currentTail);
            this._currentTail.copy(_v3A.copy(_nextTail).applyMatrix4(matrixWorldToCenter));
            // Apply rotation, convert vector3 thing into actual quaternion
            // Original UniVRM is doing center unit calculus at here but we're gonna do this on local unit
            const worldSpaceInitialMatrixInv = mat4InvertCompat(_matA.copy(this._parentMatrixWorld).multiply(this._initialLocalMatrix));
            const applyRotation = _quatA.setFromUnitVectors(this._boneAxis, _v3A.copy(_nextTail).applyMatrix4(worldSpaceInitialMatrixInv).normalize());
            this.bone.quaternion.copy(this._initialLocalRotation).multiply(applyRotation);
            // We need to update its matrixWorld manually, since we tweaked the bone by our hand
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
                    const dist = collider.shape.calculateCollision(collider.matrixWorld, tail, this.settings.hitRadius, _v3A);
                    if (dist < 0.0) {
                        // hit
                        tail.add(_v3A.multiplyScalar(-dist));
                        // normalize bone length
                        tail.sub(_worldSpacePosition).normalize().multiplyScalar(this._worldSpaceBoneLength).add(_worldSpacePosition);
                    }
                });
            });
        }
        /**
         * Create a matrix that converts center space into world space.
         * @param target Target matrix
         */
        _getMatrixCenterToWorld(target) {
            if (this._center) {
                target.copy(this._center.matrixWorld);
            }
            else {
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
            }
            else {
                target.identity();
            }
            return target;
        }
    }

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

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

    /**
     * Traverse children of given object and execute given callback.
     * The given object itself wont be given to the callback.
     * If the return value of the callback is `true`, it will halt the traversal of its children.
     * @param object A root object
     * @param callback A callback function called for each children
     */
    function traverseChildrenUntilConditionMet(object, callback) {
        object.children.forEach((child) => {
            const result = callback(child);
            if (!result) {
                traverseChildrenUntilConditionMet(child, callback);
            }
        });
    }

    class VRMSpringBoneManager {
        constructor() {
            this._joints = new Set();
            this._objectSpringBonesMap = new Map();
        }
        get joints() {
            return this._joints;
        }
        /**
         * @deprecated Use {@link joints} instead.
         */
        get springBones() {
            console.warn('VRMSpringBoneManager: springBones is deprecated. use joints instead.');
            return this._joints;
        }
        get colliderGroups() {
            const set = new Set();
            this._joints.forEach((springBone) => {
                springBone.colliderGroups.forEach((colliderGroup) => {
                    set.add(colliderGroup);
                });
            });
            return Array.from(set);
        }
        get colliders() {
            const set = new Set();
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
                objectSet = new Set();
                this._objectSpringBonesMap.set(joint.bone, objectSet);
            }
            objectSet.add(joint);
        }
        /**
         * @deprecated Use {@link addJoint} instead.
         */
        addSpringBone(joint) {
            console.warn('VRMSpringBoneManager: addSpringBone() is deprecated. use addJoint() instead.');
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
            console.warn('VRMSpringBoneManager: deleteSpringBone() is deprecated. use deleteJoint() instead.');
            this.deleteJoint(joint);
        }
        setInitState() {
            const springBonesTried = new Set();
            const springBonesDone = new Set();
            const objectUpdated = new Set();
            for (const springBone of this._joints) {
                this._processSpringBone(springBone, springBonesTried, springBonesDone, objectUpdated, (springBone) => springBone.setInitState());
            }
        }
        reset() {
            const springBonesTried = new Set();
            const springBonesDone = new Set();
            const objectUpdated = new Set();
            for (const springBone of this._joints) {
                this._processSpringBone(springBone, springBonesTried, springBonesDone, objectUpdated, (springBone) => springBone.reset());
            }
        }
        update(delta) {
            const springBonesTried = new Set();
            const springBonesDone = new Set();
            const objectUpdated = new Set();
            for (const springBone of this._joints) {
                // update the springbone
                this._processSpringBone(springBone, springBonesTried, springBonesDone, objectUpdated, (springBone) => springBone.update(delta));
                // update children world matrices
                // it is required when the spring bone chain is sparse
                traverseChildrenUntilConditionMet(springBone.bone, (object) => {
                    var _a, _b;
                    // if the object has attached springbone, halt the traversal
                    if (((_b = (_a = this._objectSpringBonesMap.get(object)) === null || _a === void 0 ? void 0 : _a.size) !== null && _b !== void 0 ? _b : 0) > 0) {
                        return true;
                    }
                    // otherwise update its world matrix
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
                throw new Error('VRMSpringBoneManager: Circular dependency detected while updating springbones');
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
                    }
                    else if (!objectUpdated.has(depObjectAncestor)) {
                        // update matrix of non-springbone
                        depObjectAncestor.updateWorldMatrix(false, false);
                        objectUpdated.add(depObjectAncestor);
                    }
                });
            }
            // update my matrix
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
            const set = new Set();
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
    }

    /**
     * Possible spec versions it recognizes.
     */
    const POSSIBLE_SPEC_VERSIONS = new Set(['1.0', '1.0-beta']);
    class VRMSpringBoneLoaderPlugin {
        constructor(parser, options) {
            this.parser = parser;
            this.jointHelperRoot = options === null || options === void 0 ? void 0 : options.jointHelperRoot;
            this.colliderHelperRoot = options === null || options === void 0 ? void 0 : options.colliderHelperRoot;
        }
        get name() {
            return VRMSpringBoneLoaderPlugin.EXTENSION_NAME;
        }
        afterRoot(gltf) {
            return __awaiter(this, void 0, void 0, function* () {
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
            return __awaiter(this, void 0, void 0, function* () {
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
            var _a, _b, _c, _d, _e;
            return __awaiter(this, void 0, void 0, function* () {
                const json = gltf.parser.json;
                // early abort if it doesn't use spring bones
                const isSpringBoneUsed = ((_a = json.extensionsUsed) === null || _a === void 0 ? void 0 : _a.indexOf(VRMSpringBoneLoaderPlugin.EXTENSION_NAME)) !== -1;
                if (!isSpringBoneUsed) {
                    return null;
                }
                const manager = new VRMSpringBoneManager();
                const threeNodes = yield gltf.parser.getDependencies('node');
                const extension = (_b = json.extensions) === null || _b === void 0 ? void 0 : _b[VRMSpringBoneLoaderPlugin.EXTENSION_NAME];
                if (!extension) {
                    return null;
                }
                const specVersion = extension.specVersion;
                if (!POSSIBLE_SPEC_VERSIONS.has(specVersion)) {
                    console.warn(`VRMSpringBoneLoaderPlugin: Unknown ${VRMSpringBoneLoaderPlugin.EXTENSION_NAME} specVersion "${specVersion}"`);
                    return null;
                }
                const colliders = (_c = extension.colliders) === null || _c === void 0 ? void 0 : _c.map((schemaCollider, iCollider) => {
                    var _a, _b, _c, _d, _e;
                    const node = threeNodes[schemaCollider.node];
                    const schemaShape = schemaCollider.shape;
                    if (schemaShape.sphere) {
                        return this._importSphereCollider(node, {
                            offset: new THREE__namespace.Vector3().fromArray((_a = schemaShape.sphere.offset) !== null && _a !== void 0 ? _a : [0.0, 0.0, 0.0]),
                            radius: (_b = schemaShape.sphere.radius) !== null && _b !== void 0 ? _b : 0.0,
                        });
                    }
                    else if (schemaShape.capsule) {
                        return this._importCapsuleCollider(node, {
                            offset: new THREE__namespace.Vector3().fromArray((_c = schemaShape.capsule.offset) !== null && _c !== void 0 ? _c : [0.0, 0.0, 0.0]),
                            radius: (_d = schemaShape.capsule.radius) !== null && _d !== void 0 ? _d : 0.0,
                            tail: new THREE__namespace.Vector3().fromArray((_e = schemaShape.capsule.tail) !== null && _e !== void 0 ? _e : [0.0, 0.0, 0.0]),
                        });
                    }
                    throw new Error(`VRMSpringBoneLoaderPlugin: The collider #${iCollider} has no valid shape`);
                });
                const colliderGroups = (_d = extension.colliderGroups) === null || _d === void 0 ? void 0 : _d.map((schemaColliderGroup, iColliderGroup) => {
                    var _a;
                    const cols = ((_a = schemaColliderGroup.colliders) !== null && _a !== void 0 ? _a : []).map((iCollider) => {
                        const col = colliders === null || colliders === void 0 ? void 0 : colliders[iCollider];
                        if (col == null) {
                            throw new Error(`VRMSpringBoneLoaderPlugin: The colliderGroup #${iColliderGroup} attempted to use a collider #${iCollider} but not found`);
                        }
                        return col;
                    });
                    return {
                        colliders: cols,
                        name: schemaColliderGroup.name,
                    };
                });
                (_e = extension.springs) === null || _e === void 0 ? void 0 : _e.forEach((schemaSpring, iSpring) => {
                    var _a;
                    const schemaJoints = schemaSpring.joints;
                    // prepare colliders
                    const colliderGroupsForSpring = (_a = schemaSpring.colliderGroups) === null || _a === void 0 ? void 0 : _a.map((iColliderGroup) => {
                        const group = colliderGroups === null || colliderGroups === void 0 ? void 0 : colliderGroups[iColliderGroup];
                        if (group == null) {
                            throw new Error(`VRMSpringBoneLoaderPlugin: The spring #${iSpring} attempted to use a colliderGroup ${iColliderGroup} but not found`);
                        }
                        return group;
                    });
                    const center = schemaSpring.center != null ? threeNodes[schemaSpring.center] : undefined;
                    let prevSchemaJoint;
                    schemaJoints.forEach((schemaJoint) => {
                        if (prevSchemaJoint) {
                            // prepare node
                            const nodeIndex = prevSchemaJoint.node;
                            const node = threeNodes[nodeIndex];
                            const childIndex = schemaJoint.node;
                            const child = threeNodes[childIndex];
                            // prepare setting
                            const setting = {
                                hitRadius: prevSchemaJoint.hitRadius,
                                dragForce: prevSchemaJoint.dragForce,
                                gravityPower: prevSchemaJoint.gravityPower,
                                stiffness: prevSchemaJoint.stiffness,
                                gravityDir: prevSchemaJoint.gravityDir != null
                                    ? new THREE__namespace.Vector3().fromArray(prevSchemaJoint.gravityDir)
                                    : undefined,
                            };
                            // create spring bones
                            const joint = this._importJoint(node, child, setting, colliderGroupsForSpring);
                            if (center) {
                                joint.center = center;
                            }
                            manager.addJoint(joint);
                        }
                        prevSchemaJoint = schemaJoint;
                    });
                });
                // init spring bones
                manager.setInitState();
                return manager;
            });
        }
        _v0Import(gltf) {
            var _a, _b, _c;
            return __awaiter(this, void 0, void 0, function* () {
                const json = gltf.parser.json;
                // early abort if it doesn't use vrm
                const isVRMUsed = ((_a = json.extensionsUsed) === null || _a === void 0 ? void 0 : _a.indexOf('VRM')) !== -1;
                if (!isVRMUsed) {
                    return null;
                }
                // early abort if it doesn't have bone groups
                const extension = (_b = json.extensions) === null || _b === void 0 ? void 0 : _b['VRM'];
                const schemaSecondaryAnimation = extension === null || extension === void 0 ? void 0 : extension.secondaryAnimation;
                if (!schemaSecondaryAnimation) {
                    return null;
                }
                const schemaBoneGroups = schemaSecondaryAnimation === null || schemaSecondaryAnimation === void 0 ? void 0 : schemaSecondaryAnimation.boneGroups;
                if (!schemaBoneGroups) {
                    return null;
                }
                const manager = new VRMSpringBoneManager();
                const threeNodes = yield gltf.parser.getDependencies('node');
                const colliderGroups = (_c = schemaSecondaryAnimation.colliderGroups) === null || _c === void 0 ? void 0 : _c.map((schemaColliderGroup) => {
                    var _a;
                    const node = threeNodes[schemaColliderGroup.node];
                    const colliders = ((_a = schemaColliderGroup.colliders) !== null && _a !== void 0 ? _a : []).map((schemaCollider, iCollider) => {
                        var _a, _b, _c;
                        const offset = new THREE__namespace.Vector3(0.0, 0.0, 0.0);
                        if (schemaCollider.offset) {
                            offset.set((_a = schemaCollider.offset.x) !== null && _a !== void 0 ? _a : 0.0, (_b = schemaCollider.offset.y) !== null && _b !== void 0 ? _b : 0.0, schemaCollider.offset.z ? -schemaCollider.offset.z : 0.0);
                        }
                        return this._importSphereCollider(node, {
                            offset,
                            radius: (_c = schemaCollider.radius) !== null && _c !== void 0 ? _c : 0.0,
                        });
                    });
                    return { colliders };
                });
                // import spring bones for each spring bone groups
                schemaBoneGroups === null || schemaBoneGroups === void 0 ? void 0 : schemaBoneGroups.forEach((schemaBoneGroup, iBoneGroup) => {
                    const rootIndices = schemaBoneGroup.bones;
                    if (!rootIndices) {
                        return;
                    }
                    rootIndices.forEach((rootIndex) => {
                        var _a, _b, _c, _d;
                        const root = threeNodes[rootIndex];
                        // prepare setting
                        const gravityDir = new THREE__namespace.Vector3();
                        if (schemaBoneGroup.gravityDir) {
                            gravityDir.set((_a = schemaBoneGroup.gravityDir.x) !== null && _a !== void 0 ? _a : 0.0, (_b = schemaBoneGroup.gravityDir.y) !== null && _b !== void 0 ? _b : 0.0, (_c = schemaBoneGroup.gravityDir.z) !== null && _c !== void 0 ? _c : 0.0);
                        }
                        else {
                            gravityDir.set(0.0, -1.0, 0.0);
                        }
                        const center = schemaBoneGroup.center != null ? threeNodes[schemaBoneGroup.center] : undefined;
                        const setting = {
                            hitRadius: schemaBoneGroup.hitRadius,
                            dragForce: schemaBoneGroup.dragForce,
                            gravityPower: schemaBoneGroup.gravityPower,
                            stiffness: schemaBoneGroup.stiffiness,
                            gravityDir,
                        };
                        // prepare colliders
                        const colliderGroupsForSpring = (_d = schemaBoneGroup.colliderGroups) === null || _d === void 0 ? void 0 : _d.map((iColliderGroup) => {
                            const group = colliderGroups === null || colliderGroups === void 0 ? void 0 : colliderGroups[iColliderGroup];
                            if (group == null) {
                                throw new Error(`VRMSpringBoneLoaderPlugin: The spring #${iBoneGroup} attempted to use a colliderGroup ${iColliderGroup} but not found`);
                            }
                            return group;
                        });
                        // create spring bones
                        root.traverse((node) => {
                            var _a;
                            const child = (_a = node.children[0]) !== null && _a !== void 0 ? _a : null;
                            const joint = this._importJoint(node, child, setting, colliderGroupsForSpring);
                            if (center) {
                                joint.center = center;
                            }
                            manager.addJoint(joint);
                        });
                    });
                });
                // init spring bones
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
    }
    VRMSpringBoneLoaderPlugin.EXTENSION_NAME = 'VRMC_springBone';

    exports.VRMSpringBoneCollider = VRMSpringBoneCollider;
    exports.VRMSpringBoneColliderHelper = VRMSpringBoneColliderHelper;
    exports.VRMSpringBoneColliderShape = VRMSpringBoneColliderShape;
    exports.VRMSpringBoneColliderShapeCapsule = VRMSpringBoneColliderShapeCapsule;
    exports.VRMSpringBoneColliderShapeSphere = VRMSpringBoneColliderShapeSphere;
    exports.VRMSpringBoneJoint = VRMSpringBoneJoint;
    exports.VRMSpringBoneJointHelper = VRMSpringBoneJointHelper;
    exports.VRMSpringBoneLoaderPlugin = VRMSpringBoneLoaderPlugin;
    exports.VRMSpringBoneManager = VRMSpringBoneManager;

    Object.defineProperty(exports, '__esModule', { value: true });

    Object.assign(THREE, exports);

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyZWUtdnJtLXNwcmluZ2JvbmUuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9WUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZS50cyIsIi4uL3NyYy9WUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZUNhcHN1bGUudHMiLCIuLi9zcmMvVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVTcGhlcmUudHMiLCIuLi9zcmMvaGVscGVycy91dGlscy9Db2xsaWRlclNoYXBlQ2Fwc3VsZUJ1ZmZlckdlb21ldHJ5LnRzIiwiLi4vc3JjL2hlbHBlcnMvdXRpbHMvQ29sbGlkZXJTaGFwZVNwaGVyZUJ1ZmZlckdlb21ldHJ5LnRzIiwiLi4vc3JjL2hlbHBlcnMvVlJNU3ByaW5nQm9uZUNvbGxpZGVySGVscGVyLnRzIiwiLi4vc3JjL2hlbHBlcnMvdXRpbHMvU3ByaW5nQm9uZUJ1ZmZlckdlb21ldHJ5LnRzIiwiLi4vc3JjL2hlbHBlcnMvVlJNU3ByaW5nQm9uZUpvaW50SGVscGVyLnRzIiwiLi4vc3JjL1ZSTVNwcmluZ0JvbmVDb2xsaWRlci50cyIsIi4uL3NyYy91dGlscy9tYXQ0SW52ZXJ0Q29tcGF0LnRzIiwiLi4vc3JjL3V0aWxzL01hdHJpeDRJbnZlcnNlQ2FjaGUudHMiLCIuLi9zcmMvVlJNU3ByaW5nQm9uZUpvaW50LnRzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIi4uL3NyYy91dGlscy90cmF2ZXJzZUFuY2VzdG9yc0Zyb21Sb290LnRzIiwiLi4vc3JjL3V0aWxzL3RyYXZlcnNlQ2hpbGRyZW5VbnRpbENvbmRpdGlvbk1ldC50cyIsIi4uL3NyYy9WUk1TcHJpbmdCb25lTWFuYWdlci50cyIsIi4uL3NyYy9WUk1TcHJpbmdCb25lTG9hZGVyUGx1Z2luLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogUmVwcmVzZW50cyBhIHNoYXBlIG9mIGEgY29sbGlkZXIuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZSB7XG4gIC8qKlxuICAgKiBUaGUgdHlwZSBvZiB0aGUgc2hhcGUuXG4gICAqL1xuICBwdWJsaWMgYWJzdHJhY3QgZ2V0IHR5cGUoKTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgYSBkaXN0YW5jZSBhbmQgYSBkaXJlY3Rpb24gZnJvbSB0aGUgY29sbGlkZXIgdG8gYSB0YXJnZXQgb2JqZWN0LlxuICAgKiBJdCdzIGhpdCBpZiB0aGUgZGlzdGFuY2UgaXMgbmVnYXRpdmUuXG4gICAqIFRoZSBkaXJlY3Rpb24gd2lsbCBiZSBjb250YWluZWQgaW4gdGhlIGdpdmVuIHRhcmdldCB2ZWN0b3IuXG4gICAqXG4gICAqIEBwYXJhbSBjb2xsaWRlck1hdHJpeCBBIG1hdHJpeCByZXByZXNlbnRzIHRoZSB0cmFuc2Zvcm0gb2YgdGhlIGNvbGxpZGVyXG4gICAqIEBwYXJhbSBvYmplY3RQb3NpdGlvbiBBIHZlY3RvciByZXByZXNlbnRzIHRoZSBwb3NpdGlvbiBvZiB0aGUgdGFyZ2V0IG9iamVjdFxuICAgKiBAcGFyYW0gb2JqZWN0UmFkaXVzIFRoZSByYWRpdXMgb2YgdGhlIG9iamVjdFxuICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSByZXN1bHQgZGlyZWN0aW9uIHdpbGwgYmUgY29udGFpbmVkIGluIHRoaXMgdmVjdG9yXG4gICAqL1xuICBwdWJsaWMgYWJzdHJhY3QgY2FsY3VsYXRlQ29sbGlzaW9uKFxuICAgIGNvbGxpZGVyTWF0cml4OiBUSFJFRS5NYXRyaXg0LFxuICAgIG9iamVjdFBvc2l0aW9uOiBUSFJFRS5WZWN0b3IzLFxuICAgIG9iamVjdFJhZGl1czogbnVtYmVyLFxuICAgIHRhcmdldDogVEhSRUUuVmVjdG9yMyxcbiAgKTogbnVtYmVyO1xufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGUgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlJztcblxuY29uc3QgX3YzQSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfdjNCID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuZXhwb3J0IGNsYXNzIFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlQ2Fwc3VsZSBleHRlbmRzIFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlIHtcbiAgcHVibGljIGdldCB0eXBlKCk6ICdjYXBzdWxlJyB7XG4gICAgcmV0dXJuICdjYXBzdWxlJztcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgb2Zmc2V0IG9mIHRoZSBoZWFkIGZyb20gdGhlIG9yaWdpbi5cbiAgICovXG4gIHB1YmxpYyBvZmZzZXQ6IFRIUkVFLlZlY3RvcjM7XG5cbiAgLyoqXG4gICAqIFRoZSBvZmZzZXQgb2YgdGhlIHRhaWwgZnJvbSB0aGUgb3JpZ2luLlxuICAgKi9cbiAgcHVibGljIHRhaWw6IFRIUkVFLlZlY3RvcjM7XG5cbiAgLyoqXG4gICAqIFRoZSByYWRpdXMuXG4gICAqL1xuICBwdWJsaWMgcmFkaXVzOiBudW1iZXI7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBhcmFtcz86IHsgcmFkaXVzPzogbnVtYmVyOyBvZmZzZXQ/OiBUSFJFRS5WZWN0b3IzOyB0YWlsPzogVEhSRUUuVmVjdG9yMyB9KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMub2Zmc2V0ID0gcGFyYW1zPy5vZmZzZXQgPz8gbmV3IFRIUkVFLlZlY3RvcjMoMC4wLCAwLjAsIDAuMCk7XG4gICAgdGhpcy50YWlsID0gcGFyYW1zPy50YWlsID8/IG5ldyBUSFJFRS5WZWN0b3IzKDAuMCwgMC4wLCAwLjApO1xuICAgIHRoaXMucmFkaXVzID0gcGFyYW1zPy5yYWRpdXMgPz8gMC4wO1xuICB9XG5cbiAgcHVibGljIGNhbGN1bGF0ZUNvbGxpc2lvbihcbiAgICBjb2xsaWRlck1hdHJpeDogVEhSRUUuTWF0cml4NCxcbiAgICBvYmplY3RQb3NpdGlvbjogVEhSRUUuVmVjdG9yMyxcbiAgICBvYmplY3RSYWRpdXM6IG51bWJlcixcbiAgICB0YXJnZXQ6IFRIUkVFLlZlY3RvcjMsXG4gICk6IG51bWJlciB7XG4gICAgX3YzQS5jb3B5KHRoaXMub2Zmc2V0KS5hcHBseU1hdHJpeDQoY29sbGlkZXJNYXRyaXgpOyAvLyB0cmFuc2Zvcm1lZCBoZWFkXG4gICAgX3YzQi5jb3B5KHRoaXMudGFpbCkuYXBwbHlNYXRyaXg0KGNvbGxpZGVyTWF0cml4KTsgLy8gdHJhbnNmb3JtZWQgdGFpbFxuICAgIF92M0Iuc3ViKF92M0EpOyAvLyBmcm9tIGhlYWQgdG8gdGFpbFxuICAgIGNvbnN0IGxlbmd0aFNxQ2Fwc3VsZSA9IF92M0IubGVuZ3RoU3EoKTtcblxuICAgIHRhcmdldC5jb3B5KG9iamVjdFBvc2l0aW9uKS5zdWIoX3YzQSk7IC8vIGZyb20gaGVhZCB0byBvYmplY3RcbiAgICBjb25zdCBkb3QgPSBfdjNCLmRvdCh0YXJnZXQpOyAvLyBkb3QgcHJvZHVjdCBvZiBvZmZzZXRUb1RhaWwgYW5kIG9mZnNldFRvT2JqZWN0XG5cbiAgICBpZiAoZG90IDw9IDAuMCkge1xuICAgICAgLy8gaWYgb2JqZWN0IGlzIG5lYXIgZnJvbSB0aGUgaGVhZFxuICAgICAgLy8gZG8gbm90aGluZywgdXNlIHRoZSBjdXJyZW50IHZhbHVlIGRpcmVjdGx5XG4gICAgfSBlbHNlIGlmIChsZW5ndGhTcUNhcHN1bGUgPD0gZG90KSB7XG4gICAgICAvLyBpZiBvYmplY3QgaXMgbmVhciBmcm9tIHRoZSB0YWlsXG4gICAgICB0YXJnZXQuc3ViKF92M0IpOyAvLyBmcm9tIHRhaWwgdG8gb2JqZWN0XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGlmIG9iamVjdCBpcyBiZXR3ZWVuIHR3byBlbmRzXG4gICAgICBfdjNCLm11bHRpcGx5U2NhbGFyKGRvdCAvIGxlbmd0aFNxQ2Fwc3VsZSk7IC8vIGZyb20gaGVhZCB0byB0aGUgbmVhcmVzdCBwb2ludCBvZiB0aGUgc2hhZnRcbiAgICAgIHRhcmdldC5zdWIoX3YzQik7IC8vIGZyb20gdGhlIHNoYWZ0IHBvaW50IHRvIG9iamVjdFxuICAgIH1cblxuICAgIGNvbnN0IHJhZGl1cyA9IG9iamVjdFJhZGl1cyArIHRoaXMucmFkaXVzO1xuICAgIGNvbnN0IGRpc3RhbmNlID0gdGFyZ2V0Lmxlbmd0aCgpIC0gcmFkaXVzO1xuICAgIHRhcmdldC5ub3JtYWxpemUoKTtcbiAgICByZXR1cm4gZGlzdGFuY2U7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZSc7XG5cbmV4cG9ydCBjbGFzcyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZVNwaGVyZSBleHRlbmRzIFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlIHtcbiAgcHVibGljIGdldCB0eXBlKCk6ICdzcGhlcmUnIHtcbiAgICByZXR1cm4gJ3NwaGVyZSc7XG4gIH1cblxuICAvKipcbiAgICogVGhlIG9mZnNldCBmcm9tIHRoZSBvcmlnaW4uXG4gICAqL1xuICBwdWJsaWMgb2Zmc2V0OiBUSFJFRS5WZWN0b3IzO1xuXG4gIC8qKlxuICAgKiBUaGUgcmFkaXVzLlxuICAgKi9cbiAgcHVibGljIHJhZGl1czogbnVtYmVyO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJhbXM/OiB7IHJhZGl1cz86IG51bWJlcjsgb2Zmc2V0PzogVEhSRUUuVmVjdG9yMyB9KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMub2Zmc2V0ID0gcGFyYW1zPy5vZmZzZXQgPz8gbmV3IFRIUkVFLlZlY3RvcjMoMC4wLCAwLjAsIDAuMCk7XG4gICAgdGhpcy5yYWRpdXMgPSBwYXJhbXM/LnJhZGl1cyA/PyAwLjA7XG4gIH1cblxuICBwdWJsaWMgY2FsY3VsYXRlQ29sbGlzaW9uKFxuICAgIGNvbGxpZGVyTWF0cml4OiBUSFJFRS5NYXRyaXg0LFxuICAgIG9iamVjdFBvc2l0aW9uOiBUSFJFRS5WZWN0b3IzLFxuICAgIG9iamVjdFJhZGl1czogbnVtYmVyLFxuICAgIHRhcmdldDogVEhSRUUuVmVjdG9yMyxcbiAgKTogbnVtYmVyIHtcbiAgICB0YXJnZXQuY29weSh0aGlzLm9mZnNldCkuYXBwbHlNYXRyaXg0KGNvbGxpZGVyTWF0cml4KTsgLy8gdHJhbnNmb3JtZWQgb2Zmc2V0XG4gICAgdGFyZ2V0Lm5lZ2F0ZSgpLmFkZChvYmplY3RQb3NpdGlvbik7IC8vIGEgdmVjdG9yIGZyb20gY29sbGlkZXIgY2VudGVyIHRvIG9iamVjdCBwb3NpdGlvblxuICAgIGNvbnN0IHJhZGl1cyA9IG9iamVjdFJhZGl1cyArIHRoaXMucmFkaXVzO1xuICAgIGNvbnN0IGRpc3RhbmNlID0gdGFyZ2V0Lmxlbmd0aCgpIC0gcmFkaXVzO1xuICAgIHRhcmdldC5ub3JtYWxpemUoKTtcbiAgICByZXR1cm4gZGlzdGFuY2U7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlQ2Fwc3VsZSB9IGZyb20gJy4uLy4uL1ZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlQ2Fwc3VsZSc7XG5pbXBvcnQgeyBDb2xsaWRlclNoYXBlQnVmZmVyR2VvbWV0cnkgfSBmcm9tICcuL0NvbGxpZGVyU2hhcGVCdWZmZXJHZW9tZXRyeSc7XG5cbmNvbnN0IF92ZWNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuZXhwb3J0IGNsYXNzIENvbGxpZGVyU2hhcGVDYXBzdWxlQnVmZmVyR2VvbWV0cnkgZXh0ZW5kcyBUSFJFRS5CdWZmZXJHZW9tZXRyeSBpbXBsZW1lbnRzIENvbGxpZGVyU2hhcGVCdWZmZXJHZW9tZXRyeSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2F0dHJQb3M6IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZTtcbiAgcHJpdmF0ZSByZWFkb25seSBfYXR0ckluZGV4OiBUSFJFRS5CdWZmZXJBdHRyaWJ1dGU7XG4gIHByaXZhdGUgcmVhZG9ubHkgX3NoYXBlOiBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZUNhcHN1bGU7XG4gIHByaXZhdGUgX2N1cnJlbnRSYWRpdXMgPSAwO1xuICBwcml2YXRlIHJlYWRvbmx5IF9jdXJyZW50T2Zmc2V0ID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbiAgcHJpdmF0ZSByZWFkb25seSBfY3VycmVudFRhaWwgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihzaGFwZTogVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVDYXBzdWxlKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuX3NoYXBlID0gc2hhcGU7XG5cbiAgICB0aGlzLl9hdHRyUG9zID0gbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShuZXcgRmxvYXQzMkFycmF5KDM5NiksIDMpO1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKCdwb3NpdGlvbicsIHRoaXMuX2F0dHJQb3MpO1xuXG4gICAgdGhpcy5fYXR0ckluZGV4ID0gbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShuZXcgVWludDE2QXJyYXkoMjY0KSwgMSk7XG4gICAgdGhpcy5zZXRJbmRleCh0aGlzLl9hdHRySW5kZXgpO1xuXG4gICAgdGhpcy5fYnVpbGRJbmRleCgpO1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIGxldCBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IGZhbHNlO1xuXG4gICAgaWYgKHRoaXMuX2N1cnJlbnRSYWRpdXMgIT09IHRoaXMuX3NoYXBlLnJhZGl1cykge1xuICAgICAgdGhpcy5fY3VycmVudFJhZGl1cyA9IHRoaXMuX3NoYXBlLnJhZGl1cztcbiAgICAgIHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX2N1cnJlbnRPZmZzZXQuZXF1YWxzKHRoaXMuX3NoYXBlLm9mZnNldCkpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRPZmZzZXQuY29weSh0aGlzLl9zaGFwZS5vZmZzZXQpO1xuICAgICAgc2hvdWxkVXBkYXRlR2VvbWV0cnkgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fY3VycmVudFRhaWwuZXF1YWxzKHRoaXMuX3NoYXBlLnRhaWwpKSB7XG4gICAgICB0aGlzLl9jdXJyZW50VGFpbC5jb3B5KHRoaXMuX3NoYXBlLnRhaWwpO1xuICAgICAgc2hvdWxkVXBkYXRlR2VvbWV0cnkgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmIChzaG91bGRVcGRhdGVHZW9tZXRyeSkge1xuICAgICAgdGhpcy5fYnVpbGRQb3NpdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2J1aWxkUG9zaXRpb24oKTogdm9pZCB7XG4gICAgX3ZlY0EuY29weSh0aGlzLl9jdXJyZW50VGFpbCkuc3ViKHRoaXMuX2N1cnJlbnRPZmZzZXQpO1xuICAgIGNvbnN0IGwgPSBfdmVjQS5sZW5ndGgoKSAvIHRoaXMuX2N1cnJlbnRSYWRpdXM7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSAxNjsgaSsrKSB7XG4gICAgICBjb25zdCB0ID0gKGkgLyAxNi4wKSAqIE1hdGguUEk7XG5cbiAgICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKGksIC1NYXRoLnNpbih0KSwgLU1hdGguY29zKHQpLCAwLjApO1xuICAgICAgdGhpcy5fYXR0clBvcy5zZXRYWVooMTcgKyBpLCBsICsgTWF0aC5zaW4odCksIE1hdGguY29zKHQpLCAwLjApO1xuICAgICAgdGhpcy5fYXR0clBvcy5zZXRYWVooMzQgKyBpLCAtTWF0aC5zaW4odCksIDAuMCwgLU1hdGguY29zKHQpKTtcbiAgICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKDUxICsgaSwgbCArIE1hdGguc2luKHQpLCAwLjAsIE1hdGguY29zKHQpKTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDMyOyBpKyspIHtcbiAgICAgIGNvbnN0IHQgPSAoaSAvIDE2LjApICogTWF0aC5QSTtcbiAgICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKDY4ICsgaSwgMC4wLCBNYXRoLnNpbih0KSwgTWF0aC5jb3ModCkpO1xuICAgICAgdGhpcy5fYXR0clBvcy5zZXRYWVooMTAwICsgaSwgbCwgTWF0aC5zaW4odCksIE1hdGguY29zKHQpKTtcbiAgICB9XG5cbiAgICBjb25zdCB0aGV0YSA9IE1hdGguYXRhbjIoX3ZlY0EueSwgTWF0aC5zcXJ0KF92ZWNBLnggKiBfdmVjQS54ICsgX3ZlY0EueiAqIF92ZWNBLnopKTtcbiAgICBjb25zdCBwaGkgPSAtTWF0aC5hdGFuMihfdmVjQS56LCBfdmVjQS54KTtcblxuICAgIHRoaXMucm90YXRlWih0aGV0YSk7XG4gICAgdGhpcy5yb3RhdGVZKHBoaSk7XG4gICAgdGhpcy5zY2FsZSh0aGlzLl9jdXJyZW50UmFkaXVzLCB0aGlzLl9jdXJyZW50UmFkaXVzLCB0aGlzLl9jdXJyZW50UmFkaXVzKTtcbiAgICB0aGlzLnRyYW5zbGF0ZSh0aGlzLl9jdXJyZW50T2Zmc2V0LngsIHRoaXMuX2N1cnJlbnRPZmZzZXQueSwgdGhpcy5fY3VycmVudE9mZnNldC56KTtcblxuICAgIHRoaXMuX2F0dHJQb3MubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRJbmRleCgpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM0OyBpKyspIHtcbiAgICAgIGNvbnN0IGkxID0gKGkgKyAxKSAlIDM0O1xuXG4gICAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoaSAqIDIsIGksIGkxKTtcbiAgICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWSg2OCArIGkgKiAyLCAzNCArIGksIDM0ICsgaTEpO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzI7IGkrKykge1xuICAgICAgY29uc3QgaTEgPSAoaSArIDEpICUgMzI7XG5cbiAgICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWSgxMzYgKyBpICogMiwgNjggKyBpLCA2OCArIGkxKTtcbiAgICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWSgyMDAgKyBpICogMiwgMTAwICsgaSwgMTAwICsgaTEpO1xuICAgIH1cblxuICAgIHRoaXMuX2F0dHJJbmRleC5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlU3BoZXJlIH0gZnJvbSAnLi4vLi4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVTcGhlcmUnO1xuaW1wb3J0IHsgQ29sbGlkZXJTaGFwZUJ1ZmZlckdlb21ldHJ5IH0gZnJvbSAnLi9Db2xsaWRlclNoYXBlQnVmZmVyR2VvbWV0cnknO1xuXG5leHBvcnQgY2xhc3MgQ29sbGlkZXJTaGFwZVNwaGVyZUJ1ZmZlckdlb21ldHJ5IGV4dGVuZHMgVEhSRUUuQnVmZmVyR2VvbWV0cnkgaW1wbGVtZW50cyBDb2xsaWRlclNoYXBlQnVmZmVyR2VvbWV0cnkge1xuICBwcml2YXRlIHJlYWRvbmx5IF9hdHRyUG9zOiBUSFJFRS5CdWZmZXJBdHRyaWJ1dGU7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2F0dHJJbmRleDogVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xuICBwcml2YXRlIHJlYWRvbmx5IF9zaGFwZTogVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVTcGhlcmU7XG4gIHByaXZhdGUgX2N1cnJlbnRSYWRpdXMgPSAwO1xuICBwcml2YXRlIHJlYWRvbmx5IF9jdXJyZW50T2Zmc2V0ID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuICBwdWJsaWMgY29uc3RydWN0b3Ioc2hhcGU6IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlU3BoZXJlKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuX3NoYXBlID0gc2hhcGU7XG5cbiAgICB0aGlzLl9hdHRyUG9zID0gbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShuZXcgRmxvYXQzMkFycmF5KDMyICogMyAqIDMpLCAzKTtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgncG9zaXRpb24nLCB0aGlzLl9hdHRyUG9zKTtcblxuICAgIHRoaXMuX2F0dHJJbmRleCA9IG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUobmV3IFVpbnQxNkFycmF5KDY0ICogMyksIDEpO1xuICAgIHRoaXMuc2V0SW5kZXgodGhpcy5fYXR0ckluZGV4KTtcblxuICAgIHRoaXMuX2J1aWxkSW5kZXgoKTtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBsZXQgc2hvdWxkVXBkYXRlR2VvbWV0cnkgPSBmYWxzZTtcblxuICAgIGlmICh0aGlzLl9jdXJyZW50UmFkaXVzICE9PSB0aGlzLl9zaGFwZS5yYWRpdXMpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRSYWRpdXMgPSB0aGlzLl9zaGFwZS5yYWRpdXM7XG4gICAgICBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9jdXJyZW50T2Zmc2V0LmVxdWFscyh0aGlzLl9zaGFwZS5vZmZzZXQpKSB7XG4gICAgICB0aGlzLl9jdXJyZW50T2Zmc2V0LmNvcHkodGhpcy5fc2hhcGUub2Zmc2V0KTtcbiAgICAgIHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoc2hvdWxkVXBkYXRlR2VvbWV0cnkpIHtcbiAgICAgIHRoaXMuX2J1aWxkUG9zaXRpb24oKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9idWlsZFBvc2l0aW9uKCk6IHZvaWQge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzI7IGkrKykge1xuICAgICAgY29uc3QgdCA9IChpIC8gMTYuMCkgKiBNYXRoLlBJO1xuXG4gICAgICB0aGlzLl9hdHRyUG9zLnNldFhZWihpLCBNYXRoLmNvcyh0KSwgTWF0aC5zaW4odCksIDAuMCk7XG4gICAgICB0aGlzLl9hdHRyUG9zLnNldFhZWigzMiArIGksIDAuMCwgTWF0aC5jb3ModCksIE1hdGguc2luKHQpKTtcbiAgICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKDY0ICsgaSwgTWF0aC5zaW4odCksIDAuMCwgTWF0aC5jb3ModCkpO1xuICAgIH1cblxuICAgIHRoaXMuc2NhbGUodGhpcy5fY3VycmVudFJhZGl1cywgdGhpcy5fY3VycmVudFJhZGl1cywgdGhpcy5fY3VycmVudFJhZGl1cyk7XG4gICAgdGhpcy50cmFuc2xhdGUodGhpcy5fY3VycmVudE9mZnNldC54LCB0aGlzLl9jdXJyZW50T2Zmc2V0LnksIHRoaXMuX2N1cnJlbnRPZmZzZXQueik7XG5cbiAgICB0aGlzLl9hdHRyUG9zLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX2J1aWxkSW5kZXgoKTogdm9pZCB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzMjsgaSsrKSB7XG4gICAgICBjb25zdCBpMSA9IChpICsgMSkgJSAzMjtcblxuICAgICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKGkgKiAyLCBpLCBpMSk7XG4gICAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoNjQgKyBpICogMiwgMzIgKyBpLCAzMiArIGkxKTtcbiAgICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWSgxMjggKyBpICogMiwgNjQgKyBpLCA2NCArIGkxKTtcbiAgICB9XG5cbiAgICB0aGlzLl9hdHRySW5kZXgubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXIgfSBmcm9tICcuLi9WUk1TcHJpbmdCb25lQ29sbGlkZXInO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVDYXBzdWxlIH0gZnJvbSAnLi4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVDYXBzdWxlJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlU3BoZXJlIH0gZnJvbSAnLi4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVTcGhlcmUnO1xuaW1wb3J0IHsgQ29sbGlkZXJTaGFwZUJ1ZmZlckdlb21ldHJ5IH0gZnJvbSAnLi91dGlscy9Db2xsaWRlclNoYXBlQnVmZmVyR2VvbWV0cnknO1xuaW1wb3J0IHsgQ29sbGlkZXJTaGFwZUNhcHN1bGVCdWZmZXJHZW9tZXRyeSB9IGZyb20gJy4vdXRpbHMvQ29sbGlkZXJTaGFwZUNhcHN1bGVCdWZmZXJHZW9tZXRyeSc7XG5pbXBvcnQgeyBDb2xsaWRlclNoYXBlU3BoZXJlQnVmZmVyR2VvbWV0cnkgfSBmcm9tICcuL3V0aWxzL0NvbGxpZGVyU2hhcGVTcGhlcmVCdWZmZXJHZW9tZXRyeSc7XG5cbmV4cG9ydCBjbGFzcyBWUk1TcHJpbmdCb25lQ29sbGlkZXJIZWxwZXIgZXh0ZW5kcyBUSFJFRS5Hcm91cCB7XG4gIHB1YmxpYyByZWFkb25seSBjb2xsaWRlcjogVlJNU3ByaW5nQm9uZUNvbGxpZGVyO1xuICBwcml2YXRlIHJlYWRvbmx5IF9nZW9tZXRyeTogQ29sbGlkZXJTaGFwZUJ1ZmZlckdlb21ldHJ5O1xuICBwcml2YXRlIHJlYWRvbmx5IF9saW5lOiBUSFJFRS5MaW5lU2VnbWVudHM7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGNvbGxpZGVyOiBWUk1TcHJpbmdCb25lQ29sbGlkZXIpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMubWF0cml4QXV0b1VwZGF0ZSA9IGZhbHNlO1xuXG4gICAgdGhpcy5jb2xsaWRlciA9IGNvbGxpZGVyO1xuXG4gICAgaWYgKHRoaXMuY29sbGlkZXIuc2hhcGUgaW5zdGFuY2VvZiBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZVNwaGVyZSkge1xuICAgICAgdGhpcy5fZ2VvbWV0cnkgPSBuZXcgQ29sbGlkZXJTaGFwZVNwaGVyZUJ1ZmZlckdlb21ldHJ5KHRoaXMuY29sbGlkZXIuc2hhcGUpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jb2xsaWRlci5zaGFwZSBpbnN0YW5jZW9mIFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlQ2Fwc3VsZSkge1xuICAgICAgdGhpcy5fZ2VvbWV0cnkgPSBuZXcgQ29sbGlkZXJTaGFwZUNhcHN1bGVCdWZmZXJHZW9tZXRyeSh0aGlzLmNvbGxpZGVyLnNoYXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdWUk1TcHJpbmdCb25lQ29sbGlkZXJIZWxwZXI6IFVua25vd24gY29sbGlkZXIgc2hhcGUgdHlwZSBkZXRlY3RlZCcpO1xuICAgIH1cblxuICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLkxpbmVCYXNpY01hdGVyaWFsKHtcbiAgICAgIGNvbG9yOiAweGZmMDBmZixcbiAgICAgIGRlcHRoVGVzdDogZmFsc2UsXG4gICAgICBkZXB0aFdyaXRlOiBmYWxzZSxcbiAgICB9KTtcblxuICAgIHRoaXMuX2xpbmUgPSBuZXcgVEhSRUUuTGluZVNlZ21lbnRzKHRoaXMuX2dlb21ldHJ5LCBtYXRlcmlhbCk7XG4gICAgdGhpcy5hZGQodGhpcy5fbGluZSk7XG4gIH1cblxuICBwdWJsaWMgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9nZW9tZXRyeS5kaXNwb3NlKCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlTWF0cml4V29ybGQoZm9yY2U6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmNvbGxpZGVyLnVwZGF0ZVdvcmxkTWF0cml4KHRydWUsIGZhbHNlKTtcblxuICAgIHRoaXMubWF0cml4LmNvcHkodGhpcy5jb2xsaWRlci5tYXRyaXhXb3JsZCk7XG5cbiAgICB0aGlzLl9nZW9tZXRyeS51cGRhdGUoKTtcblxuICAgIHN1cGVyLnVwZGF0ZU1hdHJpeFdvcmxkKGZvcmNlKTtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUpvaW50IH0gZnJvbSAnLi4vLi4vVlJNU3ByaW5nQm9uZUpvaW50JztcblxuZXhwb3J0IGNsYXNzIFNwcmluZ0JvbmVCdWZmZXJHZW9tZXRyeSBleHRlbmRzIFRIUkVFLkJ1ZmZlckdlb21ldHJ5IHtcbiAgcHJpdmF0ZSByZWFkb25seSBfYXR0clBvczogVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xuICBwcml2YXRlIHJlYWRvbmx5IF9hdHRySW5kZXg6IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZTtcbiAgcHJpdmF0ZSByZWFkb25seSBfc3ByaW5nQm9uZTogVlJNU3ByaW5nQm9uZUpvaW50O1xuICBwcml2YXRlIF9jdXJyZW50UmFkaXVzID0gMDtcbiAgcHJpdmF0ZSByZWFkb25seSBfY3VycmVudFRhaWwgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihzcHJpbmdCb25lOiBWUk1TcHJpbmdCb25lSm9pbnQpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5fc3ByaW5nQm9uZSA9IHNwcmluZ0JvbmU7XG5cbiAgICB0aGlzLl9hdHRyUG9zID0gbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShuZXcgRmxvYXQzMkFycmF5KDI5NCksIDMpO1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKCdwb3NpdGlvbicsIHRoaXMuX2F0dHJQb3MpO1xuXG4gICAgdGhpcy5fYXR0ckluZGV4ID0gbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShuZXcgVWludDE2QXJyYXkoMTk0KSwgMSk7XG4gICAgdGhpcy5zZXRJbmRleCh0aGlzLl9hdHRySW5kZXgpO1xuXG4gICAgdGhpcy5fYnVpbGRJbmRleCgpO1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIGxldCBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IGZhbHNlO1xuXG4gICAgaWYgKHRoaXMuX2N1cnJlbnRSYWRpdXMgIT09IHRoaXMuX3NwcmluZ0JvbmUuc2V0dGluZ3MuaGl0UmFkaXVzKSB7XG4gICAgICB0aGlzLl9jdXJyZW50UmFkaXVzID0gdGhpcy5fc3ByaW5nQm9uZS5zZXR0aW5ncy5oaXRSYWRpdXM7XG4gICAgICBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9jdXJyZW50VGFpbC5lcXVhbHModGhpcy5fc3ByaW5nQm9uZS5pbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uKSkge1xuICAgICAgdGhpcy5fY3VycmVudFRhaWwuY29weSh0aGlzLl9zcHJpbmdCb25lLmluaXRpYWxMb2NhbENoaWxkUG9zaXRpb24pO1xuICAgICAgc2hvdWxkVXBkYXRlR2VvbWV0cnkgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmIChzaG91bGRVcGRhdGVHZW9tZXRyeSkge1xuICAgICAgdGhpcy5fYnVpbGRQb3NpdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2J1aWxkUG9zaXRpb24oKTogdm9pZCB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzMjsgaSsrKSB7XG4gICAgICBjb25zdCB0ID0gKGkgLyAxNi4wKSAqIE1hdGguUEk7XG5cbiAgICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKGksIE1hdGguY29zKHQpLCBNYXRoLnNpbih0KSwgMC4wKTtcbiAgICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKDMyICsgaSwgMC4wLCBNYXRoLmNvcyh0KSwgTWF0aC5zaW4odCkpO1xuICAgICAgdGhpcy5fYXR0clBvcy5zZXRYWVooNjQgKyBpLCBNYXRoLnNpbih0KSwgMC4wLCBNYXRoLmNvcyh0KSk7XG4gICAgfVxuXG4gICAgdGhpcy5zY2FsZSh0aGlzLl9jdXJyZW50UmFkaXVzLCB0aGlzLl9jdXJyZW50UmFkaXVzLCB0aGlzLl9jdXJyZW50UmFkaXVzKTtcbiAgICB0aGlzLnRyYW5zbGF0ZSh0aGlzLl9jdXJyZW50VGFpbC54LCB0aGlzLl9jdXJyZW50VGFpbC55LCB0aGlzLl9jdXJyZW50VGFpbC56KTtcblxuICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKDk2LCAwLCAwLCAwKTtcbiAgICB0aGlzLl9hdHRyUG9zLnNldFhZWig5NywgdGhpcy5fY3VycmVudFRhaWwueCwgdGhpcy5fY3VycmVudFRhaWwueSwgdGhpcy5fY3VycmVudFRhaWwueik7XG5cbiAgICB0aGlzLl9hdHRyUG9zLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX2J1aWxkSW5kZXgoKTogdm9pZCB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzMjsgaSsrKSB7XG4gICAgICBjb25zdCBpMSA9IChpICsgMSkgJSAzMjtcblxuICAgICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKGkgKiAyLCBpLCBpMSk7XG4gICAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoNjQgKyBpICogMiwgMzIgKyBpLCAzMiArIGkxKTtcbiAgICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWSgxMjggKyBpICogMiwgNjQgKyBpLCA2NCArIGkxKTtcbiAgICB9XG4gICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKDE5MiwgOTYsIDk3KTtcblxuICAgIHRoaXMuX2F0dHJJbmRleC5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVKb2ludCB9IGZyb20gJy4uL1ZSTVNwcmluZ0JvbmVKb2ludCc7XG5pbXBvcnQgeyBTcHJpbmdCb25lQnVmZmVyR2VvbWV0cnkgfSBmcm9tICcuL3V0aWxzL1NwcmluZ0JvbmVCdWZmZXJHZW9tZXRyeSc7XG5cbmV4cG9ydCBjbGFzcyBWUk1TcHJpbmdCb25lSm9pbnRIZWxwZXIgZXh0ZW5kcyBUSFJFRS5Hcm91cCB7XG4gIHB1YmxpYyByZWFkb25seSBzcHJpbmdCb25lOiBWUk1TcHJpbmdCb25lSm9pbnQ7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2dlb21ldHJ5OiBTcHJpbmdCb25lQnVmZmVyR2VvbWV0cnk7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2xpbmU6IFRIUkVFLkxpbmVTZWdtZW50cztcblxuICBwdWJsaWMgY29uc3RydWN0b3Ioc3ByaW5nQm9uZTogVlJNU3ByaW5nQm9uZUpvaW50KSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLm1hdHJpeEF1dG9VcGRhdGUgPSBmYWxzZTtcblxuICAgIHRoaXMuc3ByaW5nQm9uZSA9IHNwcmluZ0JvbmU7XG5cbiAgICB0aGlzLl9nZW9tZXRyeSA9IG5ldyBTcHJpbmdCb25lQnVmZmVyR2VvbWV0cnkodGhpcy5zcHJpbmdCb25lKTtcblxuICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLkxpbmVCYXNpY01hdGVyaWFsKHtcbiAgICAgIGNvbG9yOiAweGZmZmYwMCxcbiAgICAgIGRlcHRoVGVzdDogZmFsc2UsXG4gICAgICBkZXB0aFdyaXRlOiBmYWxzZSxcbiAgICB9KTtcblxuICAgIHRoaXMuX2xpbmUgPSBuZXcgVEhSRUUuTGluZVNlZ21lbnRzKHRoaXMuX2dlb21ldHJ5LCBtYXRlcmlhbCk7XG4gICAgdGhpcy5hZGQodGhpcy5fbGluZSk7XG4gIH1cblxuICBwdWJsaWMgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9nZW9tZXRyeS5kaXNwb3NlKCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlTWF0cml4V29ybGQoZm9yY2U6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLnNwcmluZ0JvbmUuYm9uZS51cGRhdGVXb3JsZE1hdHJpeCh0cnVlLCBmYWxzZSk7XG5cbiAgICB0aGlzLm1hdHJpeC5jb3B5KHRoaXMuc3ByaW5nQm9uZS5ib25lLm1hdHJpeFdvcmxkKTtcblxuICAgIHRoaXMuX2dlb21ldHJ5LnVwZGF0ZSgpO1xuXG4gICAgc3VwZXIudXBkYXRlTWF0cml4V29ybGQoZm9yY2UpO1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgdHlwZSB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZSc7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGNvbGxpZGVyIG9mIGEgVlJNLlxuICovXG5leHBvcnQgY2xhc3MgVlJNU3ByaW5nQm9uZUNvbGxpZGVyIGV4dGVuZHMgVEhSRUUuT2JqZWN0M0Qge1xuICAvKipcbiAgICogVGhlIHNoYXBlIG9mIHRoZSBjb2xsaWRlci5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBzaGFwZTogVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGU7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHNoYXBlOiBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnNoYXBlID0gc2hhcGU7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuY29uc3QgX21hdEEgPSBuZXcgVEhSRUUuTWF0cml4NCgpO1xuXG4vKipcbiAqIEEgY29tcGF0IGZ1bmN0aW9uIGZvciBgTWF0cml4NC5pbnZlcnQoKWAgLyBgTWF0cml4NC5nZXRJbnZlcnNlKClgLlxuICogYE1hdHJpeDQuaW52ZXJ0KClgIGlzIGludHJvZHVjZWQgaW4gcjEyMyBhbmQgYE1hdHJpeDQuZ2V0SW52ZXJzZSgpYCBlbWl0cyBhIHdhcm5pbmcuXG4gKiBXZSBhcmUgZ29pbmcgdG8gdXNlIHRoaXMgY29tcGF0IGZvciBhIHdoaWxlLlxuICogQHBhcmFtIHRhcmdldCBBIHRhcmdldCBtYXRyaXhcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hdDRJbnZlcnRDb21wYXQ8VCBleHRlbmRzIFRIUkVFLk1hdHJpeDQ+KHRhcmdldDogVCk6IFQge1xuICBpZiAoKHRhcmdldCBhcyBhbnkpLmludmVydCkge1xuICAgIHRhcmdldC5pbnZlcnQoKTtcbiAgfSBlbHNlIHtcbiAgICAodGFyZ2V0IGFzIGFueSkuZ2V0SW52ZXJzZShfbWF0QS5jb3B5KHRhcmdldCkpO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IG1hdDRJbnZlcnRDb21wYXQgfSBmcm9tICcuL21hdDRJbnZlcnRDb21wYXQnO1xuXG5leHBvcnQgY2xhc3MgTWF0cml4NEludmVyc2VDYWNoZSB7XG4gIC8qKlxuICAgKiBUaGUgdGFyZ2V0IG1hdHJpeC5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBtYXRyaXg6IFRIUkVFLk1hdHJpeDQ7XG5cbiAgLyoqXG4gICAqIEEgY2FjaGUgb2YgaW52ZXJzZSBvZiBjdXJyZW50IG1hdHJpeC5cbiAgICovXG4gIHByaXZhdGUgcmVhZG9ubHkgX2ludmVyc2VDYWNoZSA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG5cbiAgLyoqXG4gICAqIEEgZmxhZyB0aGF0IG1ha2VzIGl0IHdhbnQgdG8gcmVjYWxjdWxhdGUgaXRzIHtAbGluayBfaW52ZXJzZUNhY2hlfS5cbiAgICogV2lsbCBiZSBzZXQgYHRydWVgIHdoZW4gYGVsZW1lbnRzYCBhcmUgbXV0YXRlZCBhbmQgYmUgdXNlZCBpbiBgZ2V0SW52ZXJzZWAuXG4gICAqL1xuICBwcml2YXRlIF9zaG91bGRVcGRhdGVJbnZlcnNlID0gdHJ1ZTtcblxuICAvKipcbiAgICogVGhlIG9yaWdpbmFsIG9mIGBtYXRyaXguZWxlbWVudHNgXG4gICAqL1xuICBwcml2YXRlIHJlYWRvbmx5IF9vcmlnaW5hbEVsZW1lbnRzOiBudW1iZXJbXTtcblxuICAvKipcbiAgICogSW52ZXJzZSBvZiBnaXZlbiBtYXRyaXguXG4gICAqIE5vdGUgdGhhdCBpdCB3aWxsIHJldHVybiBpdHMgaW50ZXJuYWwgcHJpdmF0ZSBpbnN0YW5jZS5cbiAgICogTWFrZSBzdXJlIGNvcHlpbmcgdGhpcyBiZWZvcmUgbXV0YXRlIHRoaXMuXG4gICAqL1xuICBwdWJsaWMgZ2V0IGludmVyc2UoKTogVEhSRUUuTWF0cml4NCB7XG4gICAgaWYgKHRoaXMuX3Nob3VsZFVwZGF0ZUludmVyc2UpIHtcbiAgICAgIHRoaXMuX2ludmVyc2VDYWNoZS5jb3B5KHRoaXMubWF0cml4KTtcbiAgICAgIG1hdDRJbnZlcnRDb21wYXQodGhpcy5faW52ZXJzZUNhY2hlKTtcbiAgICAgIHRoaXMuX3Nob3VsZFVwZGF0ZUludmVyc2UgPSBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5faW52ZXJzZUNhY2hlO1xuICB9XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKG1hdHJpeDogVEhSRUUuTWF0cml4NCkge1xuICAgIHRoaXMubWF0cml4ID0gbWF0cml4O1xuXG4gICAgY29uc3QgaGFuZGxlcjogUHJveHlIYW5kbGVyPG51bWJlcltdPiA9IHtcbiAgICAgIHNldDogKG9iaiwgcHJvcDogbnVtYmVyLCBuZXdWYWwpID0+IHtcbiAgICAgICAgdGhpcy5fc2hvdWxkVXBkYXRlSW52ZXJzZSA9IHRydWU7XG4gICAgICAgIG9ialtwcm9wXSA9IG5ld1ZhbDtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIHRoaXMuX29yaWdpbmFsRWxlbWVudHMgPSBtYXRyaXguZWxlbWVudHM7XG4gICAgbWF0cml4LmVsZW1lbnRzID0gbmV3IFByb3h5KG1hdHJpeC5lbGVtZW50cywgaGFuZGxlcik7XG4gIH1cblxuICBwdWJsaWMgcmV2ZXJ0KCk6IHZvaWQge1xuICAgIHRoaXMubWF0cml4LmVsZW1lbnRzID0gdGhpcy5fb3JpZ2luYWxFbGVtZW50cztcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgbWF0NEludmVydENvbXBhdCB9IGZyb20gJy4vdXRpbHMvbWF0NEludmVydENvbXBhdCc7XG5pbXBvcnQgeyBNYXRyaXg0SW52ZXJzZUNhY2hlIH0gZnJvbSAnLi91dGlscy9NYXRyaXg0SW52ZXJzZUNhY2hlJztcbmltcG9ydCB0eXBlIHsgVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXAgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwJztcbmltcG9ydCB0eXBlIHsgVlJNU3ByaW5nQm9uZUpvaW50U2V0dGluZ3MgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVKb2ludFNldHRpbmdzJztcblxuLy8gYmFzZWQgb25cbi8vIGh0dHA6Ly9yb2NrZXRqdW1wLnNrci5qcC91bml0eTNkLzEwOS9cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9kd2FuZ28vVW5pVlJNL2Jsb2IvbWFzdGVyL1NjcmlwdHMvU3ByaW5nQm9uZS9WUk1TcHJpbmdCb25lLmNzXG5cbmNvbnN0IElERU5USVRZX01BVFJJWDQgPSBuZXcgVEhSRUUuTWF0cml4NCgpO1xuXG4vLyDoqIjnrpfkuK3jga7kuIDmmYLkv53lrZjnlKjlpInmlbDvvIjkuIDluqbjgqTjg7Pjgrnjgr/jg7PjgrnjgpLkvZzjgaPjgZ/jgonjgYLjgajjga/kvb/jgYTlm57jgZnvvIlcbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3YzQiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfdjNDID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuLyoqXG4gKiBBIHRlbXBvcmFyeSB2YXJpYWJsZSB3aGljaCBpcyB1c2VkIGluIGB1cGRhdGVgXG4gKi9cbmNvbnN0IF93b3JsZFNwYWNlUG9zaXRpb24gPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4vKipcbiAqIEEgdGVtcG9yYXJ5IHZhcmlhYmxlIHdoaWNoIGlzIHVzZWQgaW4gYHVwZGF0ZWBcbiAqL1xuY29uc3QgX2NlbnRlclNwYWNlUG9zaXRpb24gPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4vKipcbiAqIEEgdGVtcG9yYXJ5IHZhcmlhYmxlIHdoaWNoIGlzIHVzZWQgaW4gYHVwZGF0ZWBcbiAqL1xuY29uc3QgX25leHRUYWlsID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuY29uc3QgX3F1YXRBID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbmNvbnN0IF9tYXRBID0gbmV3IFRIUkVFLk1hdHJpeDQoKTtcbmNvbnN0IF9tYXRCID0gbmV3IFRIUkVFLk1hdHJpeDQoKTtcblxuLyoqXG4gKiBBIGNsYXNzIHJlcHJlc2VudHMgYSBzaW5nbGUgam9pbnQgb2YgYSBzcHJpbmcgYm9uZS5cbiAqIEl0IHNob3VsZCBiZSBtYW5hZ2VkIGJ5IGEgW1tWUk1TcHJpbmdCb25lTWFuYWdlcl1dLlxuICovXG5leHBvcnQgY2xhc3MgVlJNU3ByaW5nQm9uZUpvaW50IHtcbiAgLyoqXG4gICAqIFNldHRpbmdzIG9mIHRoZSBib25lLlxuICAgKi9cbiAgcHVibGljIHNldHRpbmdzOiBWUk1TcHJpbmdCb25lSm9pbnRTZXR0aW5ncztcblxuICAvKipcbiAgICogQ29sbGlkZXIgZ3JvdXBzIGF0dGFjaGVkIHRvIHRoaXMgYm9uZS5cbiAgICovXG4gIHB1YmxpYyBjb2xsaWRlckdyb3VwczogVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXBbXTtcblxuICAvKipcbiAgICogQW4gT2JqZWN0M0QgYXR0YWNoZWQgdG8gdGhpcyBib25lLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGJvbmU6IFRIUkVFLk9iamVjdDNEO1xuXG4gIC8qKlxuICAgKiBBbiBPYmplY3QzRCB0aGF0IHdpbGwgYmUgdXNlZCBhcyBhIHRhaWwgb2YgdGhpcyBzcHJpbmcgYm9uZS5cbiAgICogSXQgY2FuIGJlIG51bGwgd2hlbiB0aGUgc3ByaW5nIGJvbmUgaXMgaW1wb3J0ZWQgZnJvbSBWUk0gMC4wLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGNoaWxkOiBUSFJFRS5PYmplY3QzRCB8IG51bGw7XG5cbiAgLyoqXG4gICAqIEN1cnJlbnQgcG9zaXRpb24gb2YgY2hpbGQgdGFpbCwgaW4gY2VudGVyIHVuaXQuIFdpbGwgYmUgdXNlZCBmb3IgdmVybGV0IGludGVncmF0aW9uLlxuICAgKi9cbiAgcHJpdmF0ZSBfY3VycmVudFRhaWwgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4gIC8qKlxuICAgKiBQcmV2aW91cyBwb3NpdGlvbiBvZiBjaGlsZCB0YWlsLCBpbiBjZW50ZXIgdW5pdC4gV2lsbCBiZSB1c2VkIGZvciB2ZXJsZXQgaW50ZWdyYXRpb24uXG4gICAqL1xuICBwcml2YXRlIF9wcmV2VGFpbCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbiAgLyoqXG4gICAqIEluaXRpYWwgYXhpcyBvZiB0aGUgYm9uZSwgaW4gbG9jYWwgdW5pdC5cbiAgICovXG4gIHByaXZhdGUgX2JvbmVBeGlzID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuICAvKipcbiAgICogTGVuZ3RoIG9mIHRoZSBib25lIGluIHdvcmxkIHVuaXQuIFdpbGwgYmUgdXNlZCBmb3Igbm9ybWFsaXphdGlvbiBpbiB1cGRhdGUgbG9vcC5cbiAgICogSXQncyBzYW1lIGFzIGxvY2FsIHVuaXQgbGVuZ3RoIHVubGVzcyB0aGVyZSBhcmUgc2NhbGUgdHJhbnNmb3JtYXRpb25zIGluIHRoZSB3b3JsZCBzcGFjZS5cbiAgICovXG4gIHByaXZhdGUgX3dvcmxkU3BhY2VCb25lTGVuZ3RoID0gMC4wO1xuXG4gIC8qKlxuICAgKiBUaGlzIHNwcmluZ2JvbmUgd2lsbCBiZSBjYWxjdWxhdGVkIGJhc2VkIG9uIHRoZSBzcGFjZSByZWxhdGl2ZSBmcm9tIHRoaXMgb2JqZWN0LlxuICAgKiBJZiB0aGlzIGlzIGBudWxsYCwgc3ByaW5nYm9uZSB3aWxsIGJlIGNhbGN1bGF0ZWQgaW4gd29ybGQgc3BhY2UuXG4gICAqL1xuICBwcml2YXRlIF9jZW50ZXI6IFRIUkVFLk9iamVjdDNEIHwgbnVsbCA9IG51bGw7XG4gIHB1YmxpYyBnZXQgY2VudGVyKCk6IFRIUkVFLk9iamVjdDNEIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX2NlbnRlcjtcbiAgfVxuICBwdWJsaWMgc2V0IGNlbnRlcihjZW50ZXI6IFRIUkVFLk9iamVjdDNEIHwgbnVsbCkge1xuICAgIC8vIHVuaW5zdGFsbCBpbnZlcnNlIGNhY2hlXG4gICAgaWYgKHRoaXMuX2NlbnRlcj8udXNlckRhdGEuaW52ZXJzZUNhY2hlUHJveHkpIHtcbiAgICAgICh0aGlzLl9jZW50ZXIudXNlckRhdGEuaW52ZXJzZUNhY2hlUHJveHkgYXMgTWF0cml4NEludmVyc2VDYWNoZSkucmV2ZXJ0KCk7XG4gICAgICBkZWxldGUgdGhpcy5fY2VudGVyLnVzZXJEYXRhLmludmVyc2VDYWNoZVByb3h5O1xuICAgIH1cblxuICAgIC8vIGNoYW5nZSB0aGUgY2VudGVyXG4gICAgdGhpcy5fY2VudGVyID0gY2VudGVyO1xuXG4gICAgLy8gaW5zdGFsbCBpbnZlcnNlIGNhY2hlXG4gICAgaWYgKHRoaXMuX2NlbnRlcikge1xuICAgICAgaWYgKCF0aGlzLl9jZW50ZXIudXNlckRhdGEuaW52ZXJzZUNhY2hlUHJveHkpIHtcbiAgICAgICAgdGhpcy5fY2VudGVyLnVzZXJEYXRhLmludmVyc2VDYWNoZVByb3h5ID0gbmV3IE1hdHJpeDRJbnZlcnNlQ2FjaGUodGhpcy5fY2VudGVyLm1hdHJpeFdvcmxkKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbCBzdGF0ZSBvZiB0aGUgbG9jYWwgbWF0cml4IG9mIHRoZSBib25lLlxuICAgKi9cbiAgcHJpdmF0ZSBfaW5pdGlhbExvY2FsTWF0cml4ID0gbmV3IFRIUkVFLk1hdHJpeDQoKTtcblxuICAvKipcbiAgICogSW5pdGlhbCBzdGF0ZSBvZiB0aGUgcm90YXRpb24gb2YgdGhlIGJvbmUuXG4gICAqL1xuICBwcml2YXRlIF9pbml0aWFsTG9jYWxSb3RhdGlvbiA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5cbiAgLyoqXG4gICAqIEluaXRpYWwgc3RhdGUgb2YgdGhlIHBvc2l0aW9uIG9mIGl0cyBjaGlsZC5cbiAgICovXG4gIHByaXZhdGUgX2luaXRpYWxMb2NhbENoaWxkUG9zaXRpb24gPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuICBwdWJsaWMgZ2V0IGluaXRpYWxMb2NhbENoaWxkUG9zaXRpb24oKTogVEhSRUUuVmVjdG9yMyB7XG4gICAgcmV0dXJuIHRoaXMuX2luaXRpYWxMb2NhbENoaWxkUG9zaXRpb247XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgd29ybGQgbWF0cml4IG9mIGl0cyBwYXJlbnQgb2JqZWN0LlxuICAgKiBOb3RlIHRoYXQgaXQgcmV0dXJucyBhIHJlZmVyZW5jZSB0byB0aGUgbWF0cml4LiBEb24ndCBtdXRhdGUgdGhpcyBkaXJlY3RseSFcbiAgICovXG4gIHByaXZhdGUgZ2V0IF9wYXJlbnRNYXRyaXhXb3JsZCgpOiBUSFJFRS5NYXRyaXg0IHtcbiAgICByZXR1cm4gdGhpcy5ib25lLnBhcmVudCA/IHRoaXMuYm9uZS5wYXJlbnQubWF0cml4V29ybGQgOiBJREVOVElUWV9NQVRSSVg0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBWUk1TcHJpbmdCb25lLlxuICAgKlxuICAgKiBAcGFyYW0gYm9uZSBBbiBPYmplY3QzRCB0aGF0IHdpbGwgYmUgYXR0YWNoZWQgdG8gdGhpcyBib25lXG4gICAqIEBwYXJhbSBjaGlsZCBBbiBPYmplY3QzRCB0aGF0IHdpbGwgYmUgdXNlZCBhcyBhIHRhaWwgb2YgdGhpcyBzcHJpbmcgYm9uZS4gSXQgY2FuIGJlIG51bGwgd2hlbiB0aGUgc3ByaW5nIGJvbmUgaXMgaW1wb3J0ZWQgZnJvbSBWUk0gMC4wXG4gICAqIEBwYXJhbSBzZXR0aW5ncyBTZXZlcmFsIHBhcmFtZXRlcnMgcmVsYXRlZCB0byBiZWhhdmlvciBvZiB0aGUgc3ByaW5nIGJvbmVcbiAgICogQHBhcmFtIGNvbGxpZGVyR3JvdXBzIENvbGxpZGVyIGdyb3VwcyB0aGF0IHdpbGwgYmUgY29sbGlkZWQgd2l0aCB0aGlzIHNwcmluZyBib25lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBib25lOiBUSFJFRS5PYmplY3QzRCxcbiAgICBjaGlsZDogVEhSRUUuT2JqZWN0M0QgfCBudWxsLFxuICAgIHNldHRpbmdzOiBQYXJ0aWFsPFZSTVNwcmluZ0JvbmVKb2ludFNldHRpbmdzPiA9IHt9LFxuICAgIGNvbGxpZGVyR3JvdXBzOiBWUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cFtdID0gW10sXG4gICkge1xuICAgIHRoaXMuYm9uZSA9IGJvbmU7IC8vIHVuaVZSTeOBp+OBriBwYXJlbnRcbiAgICB0aGlzLmJvbmUubWF0cml4QXV0b1VwZGF0ZSA9IGZhbHNlOyAvLyB1cGRhdGXjgavjgojjgoroqIjnrpfjgZXjgozjgovjga7jgad0aHJlZS5qc+WGheOBp+OBruiHquWLleWHpueQhuOBr+S4jeimgVxuXG4gICAgdGhpcy5jaGlsZCA9IGNoaWxkO1xuXG4gICAgdGhpcy5zZXR0aW5ncyA9IHtcbiAgICAgIGhpdFJhZGl1czogc2V0dGluZ3MuaGl0UmFkaXVzID8/IDAuMCxcbiAgICAgIHN0aWZmbmVzczogc2V0dGluZ3Muc3RpZmZuZXNzID8/IDEuMCxcbiAgICAgIGdyYXZpdHlQb3dlcjogc2V0dGluZ3MuZ3Jhdml0eVBvd2VyID8/IDAuMCxcbiAgICAgIGdyYXZpdHlEaXI6IHNldHRpbmdzLmdyYXZpdHlEaXI/LmNsb25lKCkgPz8gbmV3IFRIUkVFLlZlY3RvcjMoMC4wLCAtMS4wLCAwLjApLFxuICAgICAgZHJhZ0ZvcmNlOiBzZXR0aW5ncy5kcmFnRm9yY2UgPz8gMC40LFxuICAgIH07XG5cbiAgICB0aGlzLmNvbGxpZGVyR3JvdXBzID0gY29sbGlkZXJHcm91cHM7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBpbml0aWFsIHN0YXRlIG9mIHRoaXMgc3ByaW5nIGJvbmUuXG4gICAqIFlvdSBtaWdodCB3YW50IHRvIGNhbGwge0BsaW5rIFZSTVNwcmluZ0JvbmVNYW5hZ2VyLnNldEluaXRTdGF0ZX0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBzZXRJbml0U3RhdGUoKTogdm9pZCB7XG4gICAgLy8gcmVtZW1iZXIgaW5pdGlhbCBwb3NpdGlvbiBvZiBpdHNlbGZcbiAgICB0aGlzLl9pbml0aWFsTG9jYWxNYXRyaXguY29weSh0aGlzLmJvbmUubWF0cml4KTtcbiAgICB0aGlzLl9pbml0aWFsTG9jYWxSb3RhdGlvbi5jb3B5KHRoaXMuYm9uZS5xdWF0ZXJuaW9uKTtcblxuICAgIC8vIHNlZSBpbml0aWFsIHBvc2l0aW9uIG9mIGl0cyBsb2NhbCBjaGlsZFxuICAgIGlmICh0aGlzLmNoaWxkKSB7XG4gICAgICB0aGlzLl9pbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uLmNvcHkodGhpcy5jaGlsZC5wb3NpdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHZybTAgcmVxdWlyZXMgYSA3Y20gZml4ZWQgYm9uZSBsZW5ndGggZm9yIHRoZSBmaW5hbCBub2RlIGluIGEgY2hhaW5cbiAgICAgIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL3ZybS1jL3ZybS1zcGVjaWZpY2F0aW9uL3RyZWUvbWFzdGVyL3NwZWNpZmljYXRpb24vVlJNQ19zcHJpbmdCb25lLTEuMCNhYm91dC1zcHJpbmctY29uZmlndXJhdGlvblxuICAgICAgdGhpcy5faW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbi5jb3B5KHRoaXMuYm9uZS5wb3NpdGlvbikubm9ybWFsaXplKCkubXVsdGlwbHlTY2FsYXIoMC4wNyk7XG4gICAgfVxuXG4gICAgLy8gY29weSB0aGUgY2hpbGQgcG9zaXRpb24gdG8gdGFpbHNcbiAgICB0aGlzLmJvbmUubG9jYWxUb1dvcmxkKHRoaXMuX2N1cnJlbnRUYWlsLmNvcHkodGhpcy5faW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbikpO1xuICAgIHRoaXMuX3ByZXZUYWlsLmNvcHkodGhpcy5fY3VycmVudFRhaWwpO1xuXG4gICAgLy8gc2V0IGluaXRpYWwgc3RhdGVzIHRoYXQgYXJlIHJlbGF0ZWQgdG8gbG9jYWwgY2hpbGQgcG9zaXRpb25cbiAgICB0aGlzLl9ib25lQXhpcy5jb3B5KHRoaXMuX2luaXRpYWxMb2NhbENoaWxkUG9zaXRpb24pLm5vcm1hbGl6ZSgpO1xuICAgIHRoaXMuX3dvcmxkU3BhY2VCb25lTGVuZ3RoID0gX3YzQVxuICAgICAgLmNvcHkodGhpcy5faW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbilcbiAgICAgIC5hcHBseU1hdHJpeDQodGhpcy5ib25lLm1hdHJpeFdvcmxkKVxuICAgICAgLnN1YihfdjNCLnNldEZyb21NYXRyaXhQb3NpdGlvbih0aGlzLmJvbmUubWF0cml4V29ybGQpKVxuICAgICAgLmxlbmd0aCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoZSBzdGF0ZSBvZiB0aGlzIGJvbmUuXG4gICAqIFlvdSBtaWdodCB3YW50IHRvIGNhbGwgW1tWUk1TcHJpbmdCb25lTWFuYWdlci5yZXNldF1dIGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy5ib25lLnF1YXRlcm5pb24uY29weSh0aGlzLl9pbml0aWFsTG9jYWxSb3RhdGlvbik7XG5cbiAgICAvLyBXZSBuZWVkIHRvIHVwZGF0ZSBpdHMgbWF0cml4V29ybGQgbWFudWFsbHksIHNpbmNlIHdlIHR3ZWFrZWQgdGhlIGJvbmUgYnkgb3VyIGhhbmRcbiAgICB0aGlzLmJvbmUudXBkYXRlTWF0cml4KCk7XG4gICAgdGhpcy5ib25lLm1hdHJpeFdvcmxkLm11bHRpcGx5TWF0cmljZXModGhpcy5fcGFyZW50TWF0cml4V29ybGQsIHRoaXMuYm9uZS5tYXRyaXgpO1xuXG4gICAgLy8gQXBwbHkgdXBkYXRlZCBwb3NpdGlvbiB0byB0YWlsIHN0YXRlc1xuICAgIGNvbnN0IG1hdHJpeFdvcmxkVG9DZW50ZXIgPSB0aGlzLl9nZXRNYXRyaXhXb3JsZFRvQ2VudGVyKF9tYXRBKTtcbiAgICB0aGlzLmJvbmUubG9jYWxUb1dvcmxkKHRoaXMuX2N1cnJlbnRUYWlsLmNvcHkodGhpcy5faW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbikpLmFwcGx5TWF0cml4NChtYXRyaXhXb3JsZFRvQ2VudGVyKTtcbiAgICB0aGlzLl9wcmV2VGFpbC5jb3B5KHRoaXMuX2N1cnJlbnRUYWlsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIHN0YXRlIG9mIHRoaXMgYm9uZS5cbiAgICogWW91IG1pZ2h0IHdhbnQgdG8gY2FsbCBbW1ZSTVNwcmluZ0JvbmVNYW5hZ2VyLnVwZGF0ZV1dIGluc3RlYWQuXG4gICAqXG4gICAqIEBwYXJhbSBkZWx0YSBkZWx0YVRpbWVcbiAgICovXG4gIHB1YmxpYyB1cGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChkZWx0YSA8PSAwKSByZXR1cm47XG5cbiAgICAvLyBHZXQgYm9uZSBwb3NpdGlvbiBpbiBjZW50ZXIgc3BhY2VcbiAgICBfd29ybGRTcGFjZVBvc2l0aW9uLnNldEZyb21NYXRyaXhQb3NpdGlvbih0aGlzLmJvbmUubWF0cml4V29ybGQpO1xuICAgIGxldCBtYXRyaXhXb3JsZFRvQ2VudGVyID0gdGhpcy5fZ2V0TWF0cml4V29ybGRUb0NlbnRlcihfbWF0QSk7XG4gICAgX2NlbnRlclNwYWNlUG9zaXRpb24uY29weShfd29ybGRTcGFjZVBvc2l0aW9uKS5hcHBseU1hdHJpeDQobWF0cml4V29ybGRUb0NlbnRlcik7XG4gICAgY29uc3QgcXVhdFdvcmxkVG9DZW50ZXIgPSBfcXVhdEEuc2V0RnJvbVJvdGF0aW9uTWF0cml4KG1hdHJpeFdvcmxkVG9DZW50ZXIpO1xuXG4gICAgLy8gR2V0IHBhcmVudCBtYXRyaXggaW4gY2VudGVyIHNwYWNlXG4gICAgY29uc3QgY2VudGVyU3BhY2VQYXJlbnRNYXRyaXggPSBfbWF0Qi5jb3B5KG1hdHJpeFdvcmxkVG9DZW50ZXIpLm11bHRpcGx5KHRoaXMuX3BhcmVudE1hdHJpeFdvcmxkKTtcblxuICAgIC8vIEdldCBib25lQXhpcyBpbiBjZW50ZXIgc3BhY2VcbiAgICBjb25zdCBjZW50ZXJTcGFjZUJvbmVBeGlzID0gX3YzQlxuICAgICAgLmNvcHkodGhpcy5fYm9uZUF4aXMpXG4gICAgICAuYXBwbHlNYXRyaXg0KHRoaXMuX2luaXRpYWxMb2NhbE1hdHJpeClcbiAgICAgIC5hcHBseU1hdHJpeDQoY2VudGVyU3BhY2VQYXJlbnRNYXRyaXgpXG4gICAgICAuc3ViKF9jZW50ZXJTcGFjZVBvc2l0aW9uKVxuICAgICAgLm5vcm1hbGl6ZSgpO1xuXG4gICAgLy8gZ3Jhdml0eSBpbiBjZW50ZXIgc3BhY2VcbiAgICBjb25zdCBjZW50ZXJTcGFjZUdyYXZpdHkgPSBfdjNDLmNvcHkodGhpcy5zZXR0aW5ncy5ncmF2aXR5RGlyKS5hcHBseVF1YXRlcm5pb24ocXVhdFdvcmxkVG9DZW50ZXIpLm5vcm1hbGl6ZSgpO1xuXG4gICAgY29uc3QgbWF0cml4Q2VudGVyVG9Xb3JsZCA9IHRoaXMuX2dldE1hdHJpeENlbnRlclRvV29ybGQoX21hdEEpO1xuXG4gICAgLy8gdmVybGV056mN5YiG44Gn5qyh44Gu5L2N572u44KS6KiI566XXG4gICAgX25leHRUYWlsXG4gICAgICAuY29weSh0aGlzLl9jdXJyZW50VGFpbClcbiAgICAgIC5hZGQoXG4gICAgICAgIF92M0FcbiAgICAgICAgICAuY29weSh0aGlzLl9jdXJyZW50VGFpbClcbiAgICAgICAgICAuc3ViKHRoaXMuX3ByZXZUYWlsKVxuICAgICAgICAgIC5tdWx0aXBseVNjYWxhcigxIC0gdGhpcy5zZXR0aW5ncy5kcmFnRm9yY2UpLFxuICAgICAgKSAvLyDliY3jg5Xjg6zjg7zjg6Djga7np7vli5XjgpLntpnntprjgZnjgoso5rib6KGw44KC44GC44KL44KIKVxuICAgICAgLmFkZChfdjNBLmNvcHkoY2VudGVyU3BhY2VCb25lQXhpcykubXVsdGlwbHlTY2FsYXIodGhpcy5zZXR0aW5ncy5zdGlmZm5lc3MgKiBkZWx0YSkpIC8vIOimquOBruWbnui7ouOBq+OCiOOCi+WtkOODnOODvOODs+OBruenu+WLleebruaomVxuICAgICAgLmFkZChfdjNBLmNvcHkoY2VudGVyU3BhY2VHcmF2aXR5KS5tdWx0aXBseVNjYWxhcih0aGlzLnNldHRpbmdzLmdyYXZpdHlQb3dlciAqIGRlbHRhKSkgLy8g5aSW5Yqb44Gr44KI44KL56e75YuV6YePXG4gICAgICAuYXBwbHlNYXRyaXg0KG1hdHJpeENlbnRlclRvV29ybGQpOyAvLyB0YWls44KSd29ybGQgc3BhY2XjgavmiLvjgZlcblxuICAgIC8vIG5vcm1hbGl6ZSBib25lIGxlbmd0aFxuICAgIF9uZXh0VGFpbC5zdWIoX3dvcmxkU3BhY2VQb3NpdGlvbikubm9ybWFsaXplKCkubXVsdGlwbHlTY2FsYXIodGhpcy5fd29ybGRTcGFjZUJvbmVMZW5ndGgpLmFkZChfd29ybGRTcGFjZVBvc2l0aW9uKTtcblxuICAgIC8vIENvbGxpc2lvbuOBp+enu+WLlVxuICAgIHRoaXMuX2NvbGxpc2lvbihfbmV4dFRhaWwpO1xuXG4gICAgLy8gdXBkYXRlIHByZXZUYWlsIGFuZCBjdXJyZW50VGFpbFxuICAgIG1hdHJpeFdvcmxkVG9DZW50ZXIgPSB0aGlzLl9nZXRNYXRyaXhXb3JsZFRvQ2VudGVyKF9tYXRBKTtcblxuICAgIHRoaXMuX3ByZXZUYWlsLmNvcHkodGhpcy5fY3VycmVudFRhaWwpO1xuICAgIHRoaXMuX2N1cnJlbnRUYWlsLmNvcHkoX3YzQS5jb3B5KF9uZXh0VGFpbCkuYXBwbHlNYXRyaXg0KG1hdHJpeFdvcmxkVG9DZW50ZXIpKTtcblxuICAgIC8vIEFwcGx5IHJvdGF0aW9uLCBjb252ZXJ0IHZlY3RvcjMgdGhpbmcgaW50byBhY3R1YWwgcXVhdGVybmlvblxuICAgIC8vIE9yaWdpbmFsIFVuaVZSTSBpcyBkb2luZyBjZW50ZXIgdW5pdCBjYWxjdWx1cyBhdCBoZXJlIGJ1dCB3ZSdyZSBnb25uYSBkbyB0aGlzIG9uIGxvY2FsIHVuaXRcbiAgICBjb25zdCB3b3JsZFNwYWNlSW5pdGlhbE1hdHJpeEludiA9IG1hdDRJbnZlcnRDb21wYXQoXG4gICAgICBfbWF0QS5jb3B5KHRoaXMuX3BhcmVudE1hdHJpeFdvcmxkKS5tdWx0aXBseSh0aGlzLl9pbml0aWFsTG9jYWxNYXRyaXgpLFxuICAgICk7XG4gICAgY29uc3QgYXBwbHlSb3RhdGlvbiA9IF9xdWF0QS5zZXRGcm9tVW5pdFZlY3RvcnMoXG4gICAgICB0aGlzLl9ib25lQXhpcyxcbiAgICAgIF92M0EuY29weShfbmV4dFRhaWwpLmFwcGx5TWF0cml4NCh3b3JsZFNwYWNlSW5pdGlhbE1hdHJpeEludikubm9ybWFsaXplKCksXG4gICAgKTtcblxuICAgIHRoaXMuYm9uZS5xdWF0ZXJuaW9uLmNvcHkodGhpcy5faW5pdGlhbExvY2FsUm90YXRpb24pLm11bHRpcGx5KGFwcGx5Um90YXRpb24pO1xuXG4gICAgLy8gV2UgbmVlZCB0byB1cGRhdGUgaXRzIG1hdHJpeFdvcmxkIG1hbnVhbGx5LCBzaW5jZSB3ZSB0d2Vha2VkIHRoZSBib25lIGJ5IG91ciBoYW5kXG4gICAgdGhpcy5ib25lLnVwZGF0ZU1hdHJpeCgpO1xuICAgIHRoaXMuYm9uZS5tYXRyaXhXb3JsZC5tdWx0aXBseU1hdHJpY2VzKHRoaXMuX3BhcmVudE1hdHJpeFdvcmxkLCB0aGlzLmJvbmUubWF0cml4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEbyBjb2xsaXNpb24gbWF0aCBhZ2FpbnN0IGV2ZXJ5IGNvbGxpZGVycyBhdHRhY2hlZCB0byB0aGlzIGJvbmUuXG4gICAqXG4gICAqIEBwYXJhbSB0YWlsIFRoZSB0YWlsIHlvdSB3YW50IHRvIHByb2Nlc3NcbiAgICovXG4gIHByaXZhdGUgX2NvbGxpc2lvbih0YWlsOiBUSFJFRS5WZWN0b3IzKTogdm9pZCB7XG4gICAgdGhpcy5jb2xsaWRlckdyb3Vwcy5mb3JFYWNoKChjb2xsaWRlckdyb3VwKSA9PiB7XG4gICAgICBjb2xsaWRlckdyb3VwLmNvbGxpZGVycy5mb3JFYWNoKChjb2xsaWRlcikgPT4ge1xuICAgICAgICBjb25zdCBkaXN0ID0gY29sbGlkZXIuc2hhcGUuY2FsY3VsYXRlQ29sbGlzaW9uKGNvbGxpZGVyLm1hdHJpeFdvcmxkLCB0YWlsLCB0aGlzLnNldHRpbmdzLmhpdFJhZGl1cywgX3YzQSk7XG5cbiAgICAgICAgaWYgKGRpc3QgPCAwLjApIHtcbiAgICAgICAgICAvLyBoaXRcbiAgICAgICAgICB0YWlsLmFkZChfdjNBLm11bHRpcGx5U2NhbGFyKC1kaXN0KSk7XG5cbiAgICAgICAgICAvLyBub3JtYWxpemUgYm9uZSBsZW5ndGhcbiAgICAgICAgICB0YWlsLnN1Yihfd29ybGRTcGFjZVBvc2l0aW9uKS5ub3JtYWxpemUoKS5tdWx0aXBseVNjYWxhcih0aGlzLl93b3JsZFNwYWNlQm9uZUxlbmd0aCkuYWRkKF93b3JsZFNwYWNlUG9zaXRpb24pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBtYXRyaXggdGhhdCBjb252ZXJ0cyBjZW50ZXIgc3BhY2UgaW50byB3b3JsZCBzcGFjZS5cbiAgICogQHBhcmFtIHRhcmdldCBUYXJnZXQgbWF0cml4XG4gICAqL1xuICBwcml2YXRlIF9nZXRNYXRyaXhDZW50ZXJUb1dvcmxkKHRhcmdldDogVEhSRUUuTWF0cml4NCk6IFRIUkVFLk1hdHJpeDQge1xuICAgIGlmICh0aGlzLl9jZW50ZXIpIHtcbiAgICAgIHRhcmdldC5jb3B5KHRoaXMuX2NlbnRlci5tYXRyaXhXb3JsZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhcmdldC5pZGVudGl0eSgpO1xuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbWF0cml4IHRoYXQgY29udmVydHMgd29ybGQgc3BhY2UgaW50byBjZW50ZXIgc3BhY2UuXG4gICAqIEBwYXJhbSB0YXJnZXQgVGFyZ2V0IG1hdHJpeFxuICAgKi9cbiAgcHJpdmF0ZSBfZ2V0TWF0cml4V29ybGRUb0NlbnRlcih0YXJnZXQ6IFRIUkVFLk1hdHJpeDQpOiBUSFJFRS5NYXRyaXg0IHtcbiAgICBpZiAodGhpcy5fY2VudGVyKSB7XG4gICAgICB0YXJnZXQuY29weSgodGhpcy5fY2VudGVyLnVzZXJEYXRhLmludmVyc2VDYWNoZVByb3h5IGFzIE1hdHJpeDRJbnZlcnNlQ2FjaGUpLmludmVyc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0YXJnZXQuaWRlbnRpdHkoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG59XG4iLCIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXHJcblxyXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxyXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcclxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cclxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcclxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2NyZWF0ZUJpbmRpbmcgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH0pO1xyXG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIG8pIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCkpIF9fY3JlYXRlQmluZGluZyhvLCBtLCBwKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcclxuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgIHJldHVybiByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheSh0bywgZnJvbSkge1xyXG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gZnJvbS5sZW5ndGgsIGogPSB0by5sZW5ndGg7IGkgPCBpbDsgaSsrLCBqKyspXHJcbiAgICAgICAgdG9bal0gPSBmcm9tW2ldO1xyXG4gICAgcmV0dXJuIHRvO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XHJcbn0pIDogZnVuY3Rpb24obywgdikge1xyXG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XHJcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHJlY2VpdmVyLCBwcml2YXRlTWFwKSB7XHJcbiAgICBpZiAoIXByaXZhdGVNYXAuaGFzKHJlY2VpdmVyKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJhdHRlbXB0ZWQgdG8gZ2V0IHByaXZhdGUgZmllbGQgb24gbm9uLWluc3RhbmNlXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHByaXZhdGVNYXAuZ2V0KHJlY2VpdmVyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRTZXQocmVjZWl2ZXIsIHByaXZhdGVNYXAsIHZhbHVlKSB7XHJcbiAgICBpZiAoIXByaXZhdGVNYXAuaGFzKHJlY2VpdmVyKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJhdHRlbXB0ZWQgdG8gc2V0IHByaXZhdGUgZmllbGQgb24gbm9uLWluc3RhbmNlXCIpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZU1hcC5zZXQocmVjZWl2ZXIsIHZhbHVlKTtcclxuICAgIHJldHVybiB2YWx1ZTtcclxufVxyXG4iLCJpbXBvcnQgdHlwZSAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuZXhwb3J0IGZ1bmN0aW9uIHRyYXZlcnNlQW5jZXN0b3JzRnJvbVJvb3Qob2JqZWN0OiBUSFJFRS5PYmplY3QzRCwgY2FsbGJhY2s6IChvYmplY3Q6IFRIUkVFLk9iamVjdDNEKSA9PiB2b2lkKTogdm9pZCB7XG4gIGNvbnN0IGFuY2VzdG9yczogVEhSRUUuT2JqZWN0M0RbXSA9IFtdO1xuXG4gIGxldCBoZWFkOiBUSFJFRS5PYmplY3QzRCB8IG51bGwgPSBvYmplY3Q7XG4gIHdoaWxlIChoZWFkICE9PSBudWxsKSB7XG4gICAgYW5jZXN0b3JzLnVuc2hpZnQoaGVhZCk7XG4gICAgaGVhZCA9IGhlYWQucGFyZW50O1xuICB9XG5cbiAgYW5jZXN0b3JzLmZvckVhY2goKGFuY2VzdG9yKSA9PiB7XG4gICAgY2FsbGJhY2soYW5jZXN0b3IpO1xuICB9KTtcbn1cbiIsIi8qKlxuICogVHJhdmVyc2UgY2hpbGRyZW4gb2YgZ2l2ZW4gb2JqZWN0IGFuZCBleGVjdXRlIGdpdmVuIGNhbGxiYWNrLlxuICogVGhlIGdpdmVuIG9iamVjdCBpdHNlbGYgd29udCBiZSBnaXZlbiB0byB0aGUgY2FsbGJhY2suXG4gKiBJZiB0aGUgcmV0dXJuIHZhbHVlIG9mIHRoZSBjYWxsYmFjayBpcyBgdHJ1ZWAsIGl0IHdpbGwgaGFsdCB0aGUgdHJhdmVyc2FsIG9mIGl0cyBjaGlsZHJlbi5cbiAqIEBwYXJhbSBvYmplY3QgQSByb290IG9iamVjdFxuICogQHBhcmFtIGNhbGxiYWNrIEEgY2FsbGJhY2sgZnVuY3Rpb24gY2FsbGVkIGZvciBlYWNoIGNoaWxkcmVuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0cmF2ZXJzZUNoaWxkcmVuVW50aWxDb25kaXRpb25NZXQoXG4gIG9iamVjdDogVEhSRUUuT2JqZWN0M0QsXG4gIGNhbGxiYWNrOiAob2JqZWN0OiBUSFJFRS5PYmplY3QzRCkgPT4gYm9vbGVhbixcbik6IHZvaWQge1xuICBvYmplY3QuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSBjYWxsYmFjayhjaGlsZCk7XG4gICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgIHRyYXZlcnNlQ2hpbGRyZW5VbnRpbENvbmRpdGlvbk1ldChjaGlsZCwgY2FsbGJhY2spO1xuICAgIH1cbiAgfSk7XG59XG4iLCJpbXBvcnQgdHlwZSAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB0eXBlIHsgVlJNU3ByaW5nQm9uZUpvaW50IH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lSm9pbnQnO1xuaW1wb3J0IHsgdHJhdmVyc2VBbmNlc3RvcnNGcm9tUm9vdCB9IGZyb20gJy4vdXRpbHMvdHJhdmVyc2VBbmNlc3RvcnNGcm9tUm9vdCc7XG5pbXBvcnQgdHlwZSB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlciB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyJztcbmltcG9ydCB0eXBlIHsgVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXAgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwJztcbmltcG9ydCB7IHRyYXZlcnNlQ2hpbGRyZW5VbnRpbENvbmRpdGlvbk1ldCB9IGZyb20gJy4vdXRpbHMvdHJhdmVyc2VDaGlsZHJlblVudGlsQ29uZGl0aW9uTWV0JztcblxuZXhwb3J0IGNsYXNzIFZSTVNwcmluZ0JvbmVNYW5hZ2VyIHtcbiAgcHJpdmF0ZSBfam9pbnRzID0gbmV3IFNldDxWUk1TcHJpbmdCb25lSm9pbnQ+KCk7XG4gIHB1YmxpYyBnZXQgam9pbnRzKCk6IFNldDxWUk1TcHJpbmdCb25lSm9pbnQ+IHtcbiAgICByZXR1cm4gdGhpcy5fam9pbnRzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFVzZSB7QGxpbmsgam9pbnRzfSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIGdldCBzcHJpbmdCb25lcygpOiBTZXQ8VlJNU3ByaW5nQm9uZUpvaW50PiB7XG4gICAgY29uc29sZS53YXJuKCdWUk1TcHJpbmdCb25lTWFuYWdlcjogc3ByaW5nQm9uZXMgaXMgZGVwcmVjYXRlZC4gdXNlIGpvaW50cyBpbnN0ZWFkLicpO1xuXG4gICAgcmV0dXJuIHRoaXMuX2pvaW50cztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgY29sbGlkZXJHcm91cHMoKTogVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXBbXSB7XG4gICAgY29uc3Qgc2V0ID0gbmV3IFNldDxWUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cD4oKTtcbiAgICB0aGlzLl9qb2ludHMuZm9yRWFjaCgoc3ByaW5nQm9uZSkgPT4ge1xuICAgICAgc3ByaW5nQm9uZS5jb2xsaWRlckdyb3Vwcy5mb3JFYWNoKChjb2xsaWRlckdyb3VwKSA9PiB7XG4gICAgICAgIHNldC5hZGQoY29sbGlkZXJHcm91cCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShzZXQpO1xuICB9XG5cbiAgcHVibGljIGdldCBjb2xsaWRlcnMoKTogVlJNU3ByaW5nQm9uZUNvbGxpZGVyW10ge1xuICAgIGNvbnN0IHNldCA9IG5ldyBTZXQ8VlJNU3ByaW5nQm9uZUNvbGxpZGVyPigpO1xuICAgIHRoaXMuY29sbGlkZXJHcm91cHMuZm9yRWFjaCgoY29sbGlkZXJHcm91cCkgPT4ge1xuICAgICAgY29sbGlkZXJHcm91cC5jb2xsaWRlcnMuZm9yRWFjaCgoY29sbGlkZXIpID0+IHtcbiAgICAgICAgc2V0LmFkZChjb2xsaWRlcik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShzZXQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfb2JqZWN0U3ByaW5nQm9uZXNNYXAgPSBuZXcgTWFwPFRIUkVFLk9iamVjdDNELCBTZXQ8VlJNU3ByaW5nQm9uZUpvaW50Pj4oKTtcblxuICBwdWJsaWMgYWRkSm9pbnQoam9pbnQ6IFZSTVNwcmluZ0JvbmVKb2ludCk6IHZvaWQge1xuICAgIHRoaXMuX2pvaW50cy5hZGQoam9pbnQpO1xuXG4gICAgbGV0IG9iamVjdFNldCA9IHRoaXMuX29iamVjdFNwcmluZ0JvbmVzTWFwLmdldChqb2ludC5ib25lKTtcbiAgICBpZiAob2JqZWN0U2V0ID09IG51bGwpIHtcbiAgICAgIG9iamVjdFNldCA9IG5ldyBTZXQ8VlJNU3ByaW5nQm9uZUpvaW50PigpO1xuICAgICAgdGhpcy5fb2JqZWN0U3ByaW5nQm9uZXNNYXAuc2V0KGpvaW50LmJvbmUsIG9iamVjdFNldCk7XG4gICAgfVxuICAgIG9iamVjdFNldC5hZGQoam9pbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFVzZSB7QGxpbmsgYWRkSm9pbnR9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgYWRkU3ByaW5nQm9uZShqb2ludDogVlJNU3ByaW5nQm9uZUpvaW50KTogdm9pZCB7XG4gICAgY29uc29sZS53YXJuKCdWUk1TcHJpbmdCb25lTWFuYWdlcjogYWRkU3ByaW5nQm9uZSgpIGlzIGRlcHJlY2F0ZWQuIHVzZSBhZGRKb2ludCgpIGluc3RlYWQuJyk7XG5cbiAgICB0aGlzLmFkZEpvaW50KGpvaW50KTtcbiAgfVxuXG4gIHB1YmxpYyBkZWxldGVKb2ludChqb2ludDogVlJNU3ByaW5nQm9uZUpvaW50KTogdm9pZCB7XG4gICAgdGhpcy5fam9pbnRzLmRlbGV0ZShqb2ludCk7XG5cbiAgICBjb25zdCBvYmplY3RTZXQgPSB0aGlzLl9vYmplY3RTcHJpbmdCb25lc01hcC5nZXQoam9pbnQuYm9uZSkhO1xuICAgIG9iamVjdFNldC5kZWxldGUoam9pbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFVzZSB7QGxpbmsgZGVsZXRlSm9pbnR9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgZGVsZXRlU3ByaW5nQm9uZShqb2ludDogVlJNU3ByaW5nQm9uZUpvaW50KTogdm9pZCB7XG4gICAgY29uc29sZS53YXJuKCdWUk1TcHJpbmdCb25lTWFuYWdlcjogZGVsZXRlU3ByaW5nQm9uZSgpIGlzIGRlcHJlY2F0ZWQuIHVzZSBkZWxldGVKb2ludCgpIGluc3RlYWQuJyk7XG5cbiAgICB0aGlzLmRlbGV0ZUpvaW50KGpvaW50KTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRJbml0U3RhdGUoKTogdm9pZCB7XG4gICAgY29uc3Qgc3ByaW5nQm9uZXNUcmllZCA9IG5ldyBTZXQ8VlJNU3ByaW5nQm9uZUpvaW50PigpO1xuICAgIGNvbnN0IHNwcmluZ0JvbmVzRG9uZSA9IG5ldyBTZXQ8VlJNU3ByaW5nQm9uZUpvaW50PigpO1xuICAgIGNvbnN0IG9iamVjdFVwZGF0ZWQgPSBuZXcgU2V0PFRIUkVFLk9iamVjdDNEPigpO1xuXG4gICAgZm9yIChjb25zdCBzcHJpbmdCb25lIG9mIHRoaXMuX2pvaW50cykge1xuICAgICAgdGhpcy5fcHJvY2Vzc1NwcmluZ0JvbmUoc3ByaW5nQm9uZSwgc3ByaW5nQm9uZXNUcmllZCwgc3ByaW5nQm9uZXNEb25lLCBvYmplY3RVcGRhdGVkLCAoc3ByaW5nQm9uZSkgPT5cbiAgICAgICAgc3ByaW5nQm9uZS5zZXRJbml0U3RhdGUoKSxcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xuICAgIGNvbnN0IHNwcmluZ0JvbmVzVHJpZWQgPSBuZXcgU2V0PFZSTVNwcmluZ0JvbmVKb2ludD4oKTtcbiAgICBjb25zdCBzcHJpbmdCb25lc0RvbmUgPSBuZXcgU2V0PFZSTVNwcmluZ0JvbmVKb2ludD4oKTtcbiAgICBjb25zdCBvYmplY3RVcGRhdGVkID0gbmV3IFNldDxUSFJFRS5PYmplY3QzRD4oKTtcblxuICAgIGZvciAoY29uc3Qgc3ByaW5nQm9uZSBvZiB0aGlzLl9qb2ludHMpIHtcbiAgICAgIHRoaXMuX3Byb2Nlc3NTcHJpbmdCb25lKHNwcmluZ0JvbmUsIHNwcmluZ0JvbmVzVHJpZWQsIHNwcmluZ0JvbmVzRG9uZSwgb2JqZWN0VXBkYXRlZCwgKHNwcmluZ0JvbmUpID0+XG4gICAgICAgIHNwcmluZ0JvbmUucmVzZXQoKSxcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHVwZGF0ZShkZWx0YTogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3Qgc3ByaW5nQm9uZXNUcmllZCA9IG5ldyBTZXQ8VlJNU3ByaW5nQm9uZUpvaW50PigpO1xuICAgIGNvbnN0IHNwcmluZ0JvbmVzRG9uZSA9IG5ldyBTZXQ8VlJNU3ByaW5nQm9uZUpvaW50PigpO1xuICAgIGNvbnN0IG9iamVjdFVwZGF0ZWQgPSBuZXcgU2V0PFRIUkVFLk9iamVjdDNEPigpO1xuXG4gICAgZm9yIChjb25zdCBzcHJpbmdCb25lIG9mIHRoaXMuX2pvaW50cykge1xuICAgICAgLy8gdXBkYXRlIHRoZSBzcHJpbmdib25lXG4gICAgICB0aGlzLl9wcm9jZXNzU3ByaW5nQm9uZShzcHJpbmdCb25lLCBzcHJpbmdCb25lc1RyaWVkLCBzcHJpbmdCb25lc0RvbmUsIG9iamVjdFVwZGF0ZWQsIChzcHJpbmdCb25lKSA9PlxuICAgICAgICBzcHJpbmdCb25lLnVwZGF0ZShkZWx0YSksXG4gICAgICApO1xuXG4gICAgICAvLyB1cGRhdGUgY2hpbGRyZW4gd29ybGQgbWF0cmljZXNcbiAgICAgIC8vIGl0IGlzIHJlcXVpcmVkIHdoZW4gdGhlIHNwcmluZyBib25lIGNoYWluIGlzIHNwYXJzZVxuICAgICAgdHJhdmVyc2VDaGlsZHJlblVudGlsQ29uZGl0aW9uTWV0KHNwcmluZ0JvbmUuYm9uZSwgKG9iamVjdCkgPT4ge1xuICAgICAgICAvLyBpZiB0aGUgb2JqZWN0IGhhcyBhdHRhY2hlZCBzcHJpbmdib25lLCBoYWx0IHRoZSB0cmF2ZXJzYWxcbiAgICAgICAgaWYgKCh0aGlzLl9vYmplY3RTcHJpbmdCb25lc01hcC5nZXQob2JqZWN0KT8uc2l6ZSA/PyAwKSA+IDApIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG90aGVyd2lzZSB1cGRhdGUgaXRzIHdvcmxkIG1hdHJpeFxuICAgICAgICBvYmplY3QudXBkYXRlV29ybGRNYXRyaXgoZmFsc2UsIGZhbHNlKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBhIHNwcmluZyBib25lLlxuICAgKiBJZiB0aGVyZSBhcmUgb3RoZXIgc3ByaW5nIGJvbmUgdGhhdCBhcmUgZGVwZW5kYW50LCBpdCB3aWxsIHRyeSB0byB1cGRhdGUgdGhlbSByZWN1cnNpdmVseS5cbiAgICogSXQgdXBkYXRlcyBtYXRyaXhXb3JsZCBvZiBhbGwgYW5jZXN0b3JzIGFuZCBteXNlbGYuXG4gICAqIEl0IG1pZ2h0IHRocm93IGFuIGVycm9yIGlmIHRoZXJlIGFyZSBjaXJjdWxhciBkZXBlbmRlbmNpZXMuXG4gICAqXG4gICAqIEludGVuZGVkIHRvIGJlIHVzZWQgaW4ge0BsaW5rIHVwZGF0ZX0gYW5kIHtAbGluayBfcHJvY2Vzc1NwcmluZ0JvbmV9IGl0c2VsZiByZWN1cnNpdmVseS5cbiAgICpcbiAgICogQHBhcmFtIHNwcmluZ0JvbmUgQSBzcHJpbmdCb25lIHlvdSB3YW50IHRvIHVwZGF0ZVxuICAgKiBAcGFyYW0gc3ByaW5nQm9uZXNUcmllZCBTZXQgb2Ygc3ByaW5nQm9uZXMgdGhhdCBhcmUgYWxyZWFkeSB0cmllZCB0byBiZSB1cGRhdGVkXG4gICAqIEBwYXJhbSBzcHJpbmdCb25lc0RvbmUgU2V0IG9mIHNwcmluZ0JvbmVzIHRoYXQgYXJlIGFscmVhZHkgdXAgdG8gZGF0ZVxuICAgKiBAcGFyYW0gb2JqZWN0VXBkYXRlZCBTZXQgb2Ygb2JqZWN0M0Qgd2hvc2UgbWF0cml4V29ybGQgaXMgdXBkYXRlZFxuICAgKi9cbiAgcHJpdmF0ZSBfcHJvY2Vzc1NwcmluZ0JvbmUoXG4gICAgc3ByaW5nQm9uZTogVlJNU3ByaW5nQm9uZUpvaW50LFxuICAgIHNwcmluZ0JvbmVzVHJpZWQ6IFNldDxWUk1TcHJpbmdCb25lSm9pbnQ+LFxuICAgIHNwcmluZ0JvbmVzRG9uZTogU2V0PFZSTVNwcmluZ0JvbmVKb2ludD4sXG4gICAgb2JqZWN0VXBkYXRlZDogU2V0PFRIUkVFLk9iamVjdDNEPixcbiAgICBjYWxsYmFjazogKHNwcmluZ0JvbmU6IFZSTVNwcmluZ0JvbmVKb2ludCkgPT4gdm9pZCxcbiAgKTogdm9pZCB7XG4gICAgaWYgKHNwcmluZ0JvbmVzRG9uZS5oYXMoc3ByaW5nQm9uZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoc3ByaW5nQm9uZXNUcmllZC5oYXMoc3ByaW5nQm9uZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVlJNU3ByaW5nQm9uZU1hbmFnZXI6IENpcmN1bGFyIGRlcGVuZGVuY3kgZGV0ZWN0ZWQgd2hpbGUgdXBkYXRpbmcgc3ByaW5nYm9uZXMnKTtcbiAgICB9XG4gICAgc3ByaW5nQm9uZXNUcmllZC5hZGQoc3ByaW5nQm9uZSk7XG5cbiAgICBjb25zdCBkZXBPYmplY3RzID0gdGhpcy5fZ2V0RGVwZW5kZW5jaWVzKHNwcmluZ0JvbmUpO1xuICAgIGZvciAoY29uc3QgZGVwT2JqZWN0IG9mIGRlcE9iamVjdHMpIHtcbiAgICAgIHRyYXZlcnNlQW5jZXN0b3JzRnJvbVJvb3QoZGVwT2JqZWN0LCAoZGVwT2JqZWN0QW5jZXN0b3IpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqZWN0U2V0ID0gdGhpcy5fb2JqZWN0U3ByaW5nQm9uZXNNYXAuZ2V0KGRlcE9iamVjdEFuY2VzdG9yKTtcbiAgICAgICAgaWYgKG9iamVjdFNldCkge1xuICAgICAgICAgIGZvciAoY29uc3QgZGVwU3ByaW5nQm9uZSBvZiBvYmplY3RTZXQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Byb2Nlc3NTcHJpbmdCb25lKGRlcFNwcmluZ0JvbmUsIHNwcmluZ0JvbmVzVHJpZWQsIHNwcmluZ0JvbmVzRG9uZSwgb2JqZWN0VXBkYXRlZCwgY2FsbGJhY2spO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICghb2JqZWN0VXBkYXRlZC5oYXMoZGVwT2JqZWN0QW5jZXN0b3IpKSB7XG4gICAgICAgICAgLy8gdXBkYXRlIG1hdHJpeCBvZiBub24tc3ByaW5nYm9uZVxuICAgICAgICAgIGRlcE9iamVjdEFuY2VzdG9yLnVwZGF0ZVdvcmxkTWF0cml4KGZhbHNlLCBmYWxzZSk7XG4gICAgICAgICAgb2JqZWN0VXBkYXRlZC5hZGQoZGVwT2JqZWN0QW5jZXN0b3IpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgbXkgbWF0cml4XG4gICAgc3ByaW5nQm9uZS5ib25lLnVwZGF0ZU1hdHJpeCgpO1xuICAgIHNwcmluZ0JvbmUuYm9uZS51cGRhdGVXb3JsZE1hdHJpeChmYWxzZSwgZmFsc2UpO1xuXG4gICAgY2FsbGJhY2soc3ByaW5nQm9uZSk7XG5cbiAgICBvYmplY3RVcGRhdGVkLmFkZChzcHJpbmdCb25lLmJvbmUpO1xuXG4gICAgc3ByaW5nQm9uZXNEb25lLmFkZChzcHJpbmdCb25lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYSBzZXQgb2Ygb2JqZWN0cyB0aGF0IGFyZSBkZXBlbmRhbnQgb2YgZ2l2ZW4gc3ByaW5nIGJvbmUuXG4gICAqIEBwYXJhbSBzcHJpbmdCb25lIEEgc3ByaW5nIGJvbmVcbiAgICogQHJldHVybiBBIHNldCBvZiBvYmplY3RzIHRoYXQgYXJlIGRlcGVuZGFudCBvZiBnaXZlbiBzcHJpbmcgYm9uZVxuICAgKi9cbiAgcHJpdmF0ZSBfZ2V0RGVwZW5kZW5jaWVzKHNwcmluZ0JvbmU6IFZSTVNwcmluZ0JvbmVKb2ludCk6IFNldDxUSFJFRS5PYmplY3QzRD4ge1xuICAgIGNvbnN0IHNldCA9IG5ldyBTZXQ8VEhSRUUuT2JqZWN0M0Q+KCk7XG5cbiAgICBjb25zdCBwYXJlbnQgPSBzcHJpbmdCb25lLmJvbmUucGFyZW50O1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgIHNldC5hZGQocGFyZW50KTtcbiAgICB9XG5cbiAgICBzcHJpbmdCb25lLmNvbGxpZGVyR3JvdXBzLmZvckVhY2goKGNvbGxpZGVyR3JvdXApID0+IHtcbiAgICAgIGNvbGxpZGVyR3JvdXAuY29sbGlkZXJzLmZvckVhY2goKGNvbGxpZGVyKSA9PiB7XG4gICAgICAgIHNldC5hZGQoY29sbGlkZXIpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc2V0O1xuICB9XG59XG4iLCJpbXBvcnQgdHlwZSAqIGFzIFYwVlJNIGZyb20gJ0BwaXhpdi90eXBlcy12cm0tMC4wJztcbmltcG9ydCB0eXBlICogYXMgVjFTcHJpbmdCb25lU2NoZW1hIGZyb20gJ0BwaXhpdi90eXBlcy12cm1jLXNwcmluZ2JvbmUtMS4wJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB0eXBlIHsgR0xURiwgR0xURkxvYWRlclBsdWdpbiwgR0xURlBhcnNlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXIuanMnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUNvbGxpZGVySGVscGVyLCBWUk1TcHJpbmdCb25lSm9pbnRIZWxwZXIgfSBmcm9tICcuL2hlbHBlcnMnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUNvbGxpZGVyIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lQ29sbGlkZXInO1xuaW1wb3J0IHR5cGUgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cCB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXAnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVDYXBzdWxlIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZUNhcHN1bGUnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVTcGhlcmUgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlU3BoZXJlJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVKb2ludCB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUpvaW50JztcbmltcG9ydCB0eXBlIHsgVlJNU3ByaW5nQm9uZUxvYWRlclBsdWdpbk9wdGlvbnMgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW5PcHRpb25zJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVNYW5hZ2VyIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lTWFuYWdlcic7XG5pbXBvcnQgdHlwZSB7IFZSTVNwcmluZ0JvbmVKb2ludFNldHRpbmdzIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lSm9pbnRTZXR0aW5ncyc7XG5pbXBvcnQgeyBHTFRGIGFzIEdMVEZTY2hlbWEgfSBmcm9tICdAZ2x0Zi10cmFuc2Zvcm0vY29yZSc7XG5cbi8qKlxuICogUG9zc2libGUgc3BlYyB2ZXJzaW9ucyBpdCByZWNvZ25pemVzLlxuICovXG5jb25zdCBQT1NTSUJMRV9TUEVDX1ZFUlNJT05TID0gbmV3IFNldChbJzEuMCcsICcxLjAtYmV0YSddKTtcblxuZXhwb3J0IGNsYXNzIFZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW4gaW1wbGVtZW50cyBHTFRGTG9hZGVyUGx1Z2luIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBFWFRFTlNJT05fTkFNRSA9ICdWUk1DX3NwcmluZ0JvbmUnO1xuXG4gIC8qKlxuICAgKiBTcGVjaWZ5IGFuIE9iamVjdDNEIHRvIGFkZCB7QGxpbmsgVlJNU3ByaW5nQm9uZUpvaW50SGVscGVyfSBzLlxuICAgKiBJZiBub3Qgc3BlY2lmaWVkLCBoZWxwZXIgd2lsbCBub3QgYmUgY3JlYXRlZC5cbiAgICogSWYgYHJlbmRlck9yZGVyYCBpcyBzZXQgdG8gdGhlIHJvb3QsIGhlbHBlcnMgd2lsbCBjb3B5IHRoZSBzYW1lIGByZW5kZXJPcmRlcmAgLlxuICAgKi9cbiAgcHVibGljIGpvaW50SGVscGVyUm9vdD86IFRIUkVFLk9iamVjdDNEO1xuXG4gIC8qKlxuICAgKiBTcGVjaWZ5IGFuIE9iamVjdDNEIHRvIGFkZCB7QGxpbmsgVlJNU3ByaW5nQm9uZUpvaW50SGVscGVyfSBzLlxuICAgKiBJZiBub3Qgc3BlY2lmaWVkLCBoZWxwZXIgd2lsbCBub3QgYmUgY3JlYXRlZC5cbiAgICogSWYgYHJlbmRlck9yZGVyYCBpcyBzZXQgdG8gdGhlIHJvb3QsIGhlbHBlcnMgd2lsbCBjb3B5IHRoZSBzYW1lIGByZW5kZXJPcmRlcmAgLlxuICAgKi9cbiAgcHVibGljIGNvbGxpZGVySGVscGVyUm9vdD86IFRIUkVFLk9iamVjdDNEO1xuXG4gIHB1YmxpYyByZWFkb25seSBwYXJzZXI6IEdMVEZQYXJzZXI7XG5cbiAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW4uRVhURU5TSU9OX05BTUU7XG4gIH1cblxuICBwdWJsaWMgY29uc3RydWN0b3IocGFyc2VyOiBHTFRGUGFyc2VyLCBvcHRpb25zPzogVlJNU3ByaW5nQm9uZUxvYWRlclBsdWdpbk9wdGlvbnMpIHtcbiAgICB0aGlzLnBhcnNlciA9IHBhcnNlcjtcblxuICAgIHRoaXMuam9pbnRIZWxwZXJSb290ID0gb3B0aW9ucz8uam9pbnRIZWxwZXJSb290O1xuICAgIHRoaXMuY29sbGlkZXJIZWxwZXJSb290ID0gb3B0aW9ucz8uY29sbGlkZXJIZWxwZXJSb290O1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGFmdGVyUm9vdChnbHRmOiBHTFRGKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgZ2x0Zi51c2VyRGF0YS52cm1TcHJpbmdCb25lTWFuYWdlciA9IGF3YWl0IHRoaXMuX2ltcG9ydChnbHRmKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbXBvcnQgc3ByaW5nIGJvbmVzIGZyb20gYSBHTFRGIGFuZCByZXR1cm4gYSB7QGxpbmsgVlJNU3ByaW5nQm9uZU1hbmFnZXJ9LlxuICAgKiBJdCBtaWdodCByZXR1cm4gYG51bGxgIGluc3RlYWQgd2hlbiBpdCBkb2VzIG5vdCBuZWVkIHRvIGJlIGNyZWF0ZWQgb3Igc29tZXRoaW5nIGdvIHdyb25nLlxuICAgKlxuICAgKiBAcGFyYW0gZ2x0ZiBBIHBhcnNlZCByZXN1bHQgb2YgR0xURiB0YWtlbiBmcm9tIEdMVEZMb2FkZXJcbiAgICovXG4gIHByaXZhdGUgYXN5bmMgX2ltcG9ydChnbHRmOiBHTFRGKTogUHJvbWlzZTxWUk1TcHJpbmdCb25lTWFuYWdlciB8IG51bGw+IHtcbiAgICBjb25zdCB2MVJlc3VsdCA9IGF3YWl0IHRoaXMuX3YxSW1wb3J0KGdsdGYpO1xuICAgIGlmICh2MVJlc3VsdCAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gdjFSZXN1bHQ7XG4gICAgfVxuXG4gICAgY29uc3QgdjBSZXN1bHQgPSBhd2FpdCB0aGlzLl92MEltcG9ydChnbHRmKTtcbiAgICBpZiAodjBSZXN1bHQgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHYwUmVzdWx0O1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfdjFJbXBvcnQoZ2x0ZjogR0xURik6IFByb21pc2U8VlJNU3ByaW5nQm9uZU1hbmFnZXIgfCBudWxsPiB7XG4gICAgY29uc3QganNvbiA9IGdsdGYucGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAgIC8vIGVhcmx5IGFib3J0IGlmIGl0IGRvZXNuJ3QgdXNlIHNwcmluZyBib25lc1xuICAgIGNvbnN0IGlzU3ByaW5nQm9uZVVzZWQgPSBqc29uLmV4dGVuc2lvbnNVc2VkPy5pbmRleE9mKFZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW4uRVhURU5TSU9OX05BTUUpICE9PSAtMTtcbiAgICBpZiAoIWlzU3ByaW5nQm9uZVVzZWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IG1hbmFnZXIgPSBuZXcgVlJNU3ByaW5nQm9uZU1hbmFnZXIoKTtcblxuICAgIGNvbnN0IHRocmVlTm9kZXM6IFRIUkVFLk9iamVjdDNEW10gPSBhd2FpdCBnbHRmLnBhcnNlci5nZXREZXBlbmRlbmNpZXMoJ25vZGUnKTtcblxuICAgIGNvbnN0IGV4dGVuc2lvbiA9IGpzb24uZXh0ZW5zaW9ucz8uW1ZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW4uRVhURU5TSU9OX05BTUVdIGFzXG4gICAgICB8IFYxU3ByaW5nQm9uZVNjaGVtYS5WUk1DU3ByaW5nQm9uZVxuICAgICAgfCB1bmRlZmluZWQ7XG4gICAgaWYgKCFleHRlbnNpb24pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNwZWNWZXJzaW9uID0gZXh0ZW5zaW9uLnNwZWNWZXJzaW9uO1xuICAgIGlmICghUE9TU0lCTEVfU1BFQ19WRVJTSU9OUy5oYXMoc3BlY1ZlcnNpb24pKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIGBWUk1TcHJpbmdCb25lTG9hZGVyUGx1Z2luOiBVbmtub3duICR7VlJNU3ByaW5nQm9uZUxvYWRlclBsdWdpbi5FWFRFTlNJT05fTkFNRX0gc3BlY1ZlcnNpb24gXCIke3NwZWNWZXJzaW9ufVwiYCxcbiAgICAgICk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBjb2xsaWRlcnMgPSBleHRlbnNpb24uY29sbGlkZXJzPy5tYXAoKHNjaGVtYUNvbGxpZGVyLCBpQ29sbGlkZXIpID0+IHtcbiAgICAgIGNvbnN0IG5vZGUgPSB0aHJlZU5vZGVzW3NjaGVtYUNvbGxpZGVyLm5vZGUhXTtcbiAgICAgIGNvbnN0IHNjaGVtYVNoYXBlID0gc2NoZW1hQ29sbGlkZXIuc2hhcGUhO1xuXG4gICAgICBpZiAoc2NoZW1hU2hhcGUuc3BoZXJlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbXBvcnRTcGhlcmVDb2xsaWRlcihub2RlLCB7XG4gICAgICAgICAgb2Zmc2V0OiBuZXcgVEhSRUUuVmVjdG9yMygpLmZyb21BcnJheShzY2hlbWFTaGFwZS5zcGhlcmUub2Zmc2V0ID8/IFswLjAsIDAuMCwgMC4wXSksXG4gICAgICAgICAgcmFkaXVzOiBzY2hlbWFTaGFwZS5zcGhlcmUucmFkaXVzID8/IDAuMCxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKHNjaGVtYVNoYXBlLmNhcHN1bGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ltcG9ydENhcHN1bGVDb2xsaWRlcihub2RlLCB7XG4gICAgICAgICAgb2Zmc2V0OiBuZXcgVEhSRUUuVmVjdG9yMygpLmZyb21BcnJheShzY2hlbWFTaGFwZS5jYXBzdWxlLm9mZnNldCA/PyBbMC4wLCAwLjAsIDAuMF0pLFxuICAgICAgICAgIHJhZGl1czogc2NoZW1hU2hhcGUuY2Fwc3VsZS5yYWRpdXMgPz8gMC4wLFxuICAgICAgICAgIHRhaWw6IG5ldyBUSFJFRS5WZWN0b3IzKCkuZnJvbUFycmF5KHNjaGVtYVNoYXBlLmNhcHN1bGUudGFpbCA/PyBbMC4wLCAwLjAsIDAuMF0pLFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBWUk1TcHJpbmdCb25lTG9hZGVyUGx1Z2luOiBUaGUgY29sbGlkZXIgIyR7aUNvbGxpZGVyfSBoYXMgbm8gdmFsaWQgc2hhcGVgKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGNvbGxpZGVyR3JvdXBzID0gZXh0ZW5zaW9uLmNvbGxpZGVyR3JvdXBzPy5tYXAoXG4gICAgICAoc2NoZW1hQ29sbGlkZXJHcm91cCwgaUNvbGxpZGVyR3JvdXApOiBWUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cCA9PiB7XG4gICAgICAgIGNvbnN0IGNvbHMgPSAoc2NoZW1hQ29sbGlkZXJHcm91cC5jb2xsaWRlcnMgPz8gW10pLm1hcCgoaUNvbGxpZGVyKSA9PiB7XG4gICAgICAgICAgY29uc3QgY29sID0gY29sbGlkZXJzPy5baUNvbGxpZGVyXTtcblxuICAgICAgICAgIGlmIChjb2wgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICBgVlJNU3ByaW5nQm9uZUxvYWRlclBsdWdpbjogVGhlIGNvbGxpZGVyR3JvdXAgIyR7aUNvbGxpZGVyR3JvdXB9IGF0dGVtcHRlZCB0byB1c2UgYSBjb2xsaWRlciAjJHtpQ29sbGlkZXJ9IGJ1dCBub3QgZm91bmRgLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gY29sO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGNvbGxpZGVyczogY29scyxcbiAgICAgICAgICBuYW1lOiBzY2hlbWFDb2xsaWRlckdyb3VwLm5hbWUsXG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICk7XG5cbiAgICBleHRlbnNpb24uc3ByaW5ncz8uZm9yRWFjaCgoc2NoZW1hU3ByaW5nLCBpU3ByaW5nKSA9PiB7XG4gICAgICBjb25zdCBzY2hlbWFKb2ludHMgPSBzY2hlbWFTcHJpbmcuam9pbnRzO1xuXG4gICAgICAvLyBwcmVwYXJlIGNvbGxpZGVyc1xuICAgICAgY29uc3QgY29sbGlkZXJHcm91cHNGb3JTcHJpbmcgPSBzY2hlbWFTcHJpbmcuY29sbGlkZXJHcm91cHM/Lm1hcCgoaUNvbGxpZGVyR3JvdXApID0+IHtcbiAgICAgICAgY29uc3QgZ3JvdXAgPSBjb2xsaWRlckdyb3Vwcz8uW2lDb2xsaWRlckdyb3VwXTtcblxuICAgICAgICBpZiAoZ3JvdXAgPT0gbnVsbCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgIGBWUk1TcHJpbmdCb25lTG9hZGVyUGx1Z2luOiBUaGUgc3ByaW5nICMke2lTcHJpbmd9IGF0dGVtcHRlZCB0byB1c2UgYSBjb2xsaWRlckdyb3VwICR7aUNvbGxpZGVyR3JvdXB9IGJ1dCBub3QgZm91bmRgLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZ3JvdXA7XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgY2VudGVyID0gc2NoZW1hU3ByaW5nLmNlbnRlciAhPSBudWxsID8gdGhyZWVOb2Rlc1tzY2hlbWFTcHJpbmcuY2VudGVyXSA6IHVuZGVmaW5lZDtcblxuICAgICAgbGV0IHByZXZTY2hlbWFKb2ludDogVjFTcHJpbmdCb25lU2NoZW1hLlNwcmluZ0JvbmVKb2ludCB8IHVuZGVmaW5lZDtcbiAgICAgIHNjaGVtYUpvaW50cy5mb3JFYWNoKChzY2hlbWFKb2ludCkgPT4ge1xuICAgICAgICBpZiAocHJldlNjaGVtYUpvaW50KSB7XG4gICAgICAgICAgLy8gcHJlcGFyZSBub2RlXG4gICAgICAgICAgY29uc3Qgbm9kZUluZGV4ID0gcHJldlNjaGVtYUpvaW50Lm5vZGU7XG4gICAgICAgICAgY29uc3Qgbm9kZSA9IHRocmVlTm9kZXNbbm9kZUluZGV4XTtcbiAgICAgICAgICBjb25zdCBjaGlsZEluZGV4ID0gc2NoZW1hSm9pbnQubm9kZTtcbiAgICAgICAgICBjb25zdCBjaGlsZCA9IHRocmVlTm9kZXNbY2hpbGRJbmRleF07XG5cbiAgICAgICAgICAvLyBwcmVwYXJlIHNldHRpbmdcbiAgICAgICAgICBjb25zdCBzZXR0aW5nOiBQYXJ0aWFsPFZSTVNwcmluZ0JvbmVKb2ludFNldHRpbmdzPiA9IHtcbiAgICAgICAgICAgIGhpdFJhZGl1czogcHJldlNjaGVtYUpvaW50LmhpdFJhZGl1cyxcbiAgICAgICAgICAgIGRyYWdGb3JjZTogcHJldlNjaGVtYUpvaW50LmRyYWdGb3JjZSxcbiAgICAgICAgICAgIGdyYXZpdHlQb3dlcjogcHJldlNjaGVtYUpvaW50LmdyYXZpdHlQb3dlcixcbiAgICAgICAgICAgIHN0aWZmbmVzczogcHJldlNjaGVtYUpvaW50LnN0aWZmbmVzcyxcbiAgICAgICAgICAgIGdyYXZpdHlEaXI6XG4gICAgICAgICAgICAgIHByZXZTY2hlbWFKb2ludC5ncmF2aXR5RGlyICE9IG51bGxcbiAgICAgICAgICAgICAgICA/IG5ldyBUSFJFRS5WZWN0b3IzKCkuZnJvbUFycmF5KHByZXZTY2hlbWFKb2ludC5ncmF2aXR5RGlyKVxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgICAgIH07XG5cbiAgICAgICAgICAvLyBjcmVhdGUgc3ByaW5nIGJvbmVzXG4gICAgICAgICAgY29uc3Qgam9pbnQgPSB0aGlzLl9pbXBvcnRKb2ludChub2RlLCBjaGlsZCwgc2V0dGluZywgY29sbGlkZXJHcm91cHNGb3JTcHJpbmcpO1xuICAgICAgICAgIGlmIChjZW50ZXIpIHtcbiAgICAgICAgICAgIGpvaW50LmNlbnRlciA9IGNlbnRlcjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBtYW5hZ2VyLmFkZEpvaW50KGpvaW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByZXZTY2hlbWFKb2ludCA9IHNjaGVtYUpvaW50O1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBpbml0IHNwcmluZyBib25lc1xuICAgIG1hbmFnZXIuc2V0SW5pdFN0YXRlKCk7XG5cbiAgICByZXR1cm4gbWFuYWdlcjtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX3YwSW1wb3J0KGdsdGY6IEdMVEYpOiBQcm9taXNlPFZSTVNwcmluZ0JvbmVNYW5hZ2VyIHwgbnVsbD4ge1xuICAgIGNvbnN0IGpzb24gPSBnbHRmLnBhcnNlci5qc29uIGFzIEdMVEZTY2hlbWEuSUdMVEY7XG5cbiAgICAvLyBlYXJseSBhYm9ydCBpZiBpdCBkb2Vzbid0IHVzZSB2cm1cbiAgICBjb25zdCBpc1ZSTVVzZWQgPSBqc29uLmV4dGVuc2lvbnNVc2VkPy5pbmRleE9mKCdWUk0nKSAhPT0gLTE7XG4gICAgaWYgKCFpc1ZSTVVzZWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIGVhcmx5IGFib3J0IGlmIGl0IGRvZXNuJ3QgaGF2ZSBib25lIGdyb3Vwc1xuICAgIGNvbnN0IGV4dGVuc2lvbiA9IGpzb24uZXh0ZW5zaW9ucz8uWydWUk0nXSBhcyBWMFZSTS5WUk0gfCB1bmRlZmluZWQ7XG4gICAgY29uc3Qgc2NoZW1hU2Vjb25kYXJ5QW5pbWF0aW9uID0gZXh0ZW5zaW9uPy5zZWNvbmRhcnlBbmltYXRpb247XG4gICAgaWYgKCFzY2hlbWFTZWNvbmRhcnlBbmltYXRpb24pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNjaGVtYUJvbmVHcm91cHMgPSBzY2hlbWFTZWNvbmRhcnlBbmltYXRpb24/LmJvbmVHcm91cHM7XG4gICAgaWYgKCFzY2hlbWFCb25lR3JvdXBzKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBtYW5hZ2VyID0gbmV3IFZSTVNwcmluZ0JvbmVNYW5hZ2VyKCk7XG5cbiAgICBjb25zdCB0aHJlZU5vZGVzOiBUSFJFRS5PYmplY3QzRFtdID0gYXdhaXQgZ2x0Zi5wYXJzZXIuZ2V0RGVwZW5kZW5jaWVzKCdub2RlJyk7XG5cbiAgICBjb25zdCBjb2xsaWRlckdyb3VwcyA9IHNjaGVtYVNlY29uZGFyeUFuaW1hdGlvbi5jb2xsaWRlckdyb3Vwcz8ubWFwKFxuICAgICAgKHNjaGVtYUNvbGxpZGVyR3JvdXApOiBWUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cCA9PiB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSB0aHJlZU5vZGVzW3NjaGVtYUNvbGxpZGVyR3JvdXAubm9kZSFdO1xuICAgICAgICBjb25zdCBjb2xsaWRlcnMgPSAoc2NoZW1hQ29sbGlkZXJHcm91cC5jb2xsaWRlcnMgPz8gW10pLm1hcCgoc2NoZW1hQ29sbGlkZXIsIGlDb2xsaWRlcikgPT4ge1xuICAgICAgICAgIGNvbnN0IG9mZnNldCA9IG5ldyBUSFJFRS5WZWN0b3IzKDAuMCwgMC4wLCAwLjApO1xuICAgICAgICAgIGlmIChzY2hlbWFDb2xsaWRlci5vZmZzZXQpIHtcbiAgICAgICAgICAgIG9mZnNldC5zZXQoXG4gICAgICAgICAgICAgIHNjaGVtYUNvbGxpZGVyLm9mZnNldC54ID8/IDAuMCxcbiAgICAgICAgICAgICAgc2NoZW1hQ29sbGlkZXIub2Zmc2V0LnkgPz8gMC4wLFxuICAgICAgICAgICAgICBzY2hlbWFDb2xsaWRlci5vZmZzZXQueiA/IC1zY2hlbWFDb2xsaWRlci5vZmZzZXQueiA6IDAuMCwgLy8geiBpcyBvcHBvc2l0ZSBpbiBWUk0wLjBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2ltcG9ydFNwaGVyZUNvbGxpZGVyKG5vZGUsIHtcbiAgICAgICAgICAgIG9mZnNldCxcbiAgICAgICAgICAgIHJhZGl1czogc2NoZW1hQ29sbGlkZXIucmFkaXVzID8/IDAuMCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHsgY29sbGlkZXJzIH07XG4gICAgICB9LFxuICAgICk7XG5cbiAgICAvLyBpbXBvcnQgc3ByaW5nIGJvbmVzIGZvciBlYWNoIHNwcmluZyBib25lIGdyb3Vwc1xuICAgIHNjaGVtYUJvbmVHcm91cHM/LmZvckVhY2goKHNjaGVtYUJvbmVHcm91cCwgaUJvbmVHcm91cCkgPT4ge1xuICAgICAgY29uc3Qgcm9vdEluZGljZXMgPSBzY2hlbWFCb25lR3JvdXAuYm9uZXM7XG4gICAgICBpZiAoIXJvb3RJbmRpY2VzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcm9vdEluZGljZXMuZm9yRWFjaCgocm9vdEluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IHJvb3QgPSB0aHJlZU5vZGVzW3Jvb3RJbmRleF07XG5cbiAgICAgICAgLy8gcHJlcGFyZSBzZXR0aW5nXG4gICAgICAgIGNvbnN0IGdyYXZpdHlEaXIgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuICAgICAgICBpZiAoc2NoZW1hQm9uZUdyb3VwLmdyYXZpdHlEaXIpIHtcbiAgICAgICAgICBncmF2aXR5RGlyLnNldChcbiAgICAgICAgICAgIHNjaGVtYUJvbmVHcm91cC5ncmF2aXR5RGlyLnggPz8gMC4wLFxuICAgICAgICAgICAgc2NoZW1hQm9uZUdyb3VwLmdyYXZpdHlEaXIueSA/PyAwLjAsXG4gICAgICAgICAgICBzY2hlbWFCb25lR3JvdXAuZ3Jhdml0eURpci56ID8/IDAuMCxcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGdyYXZpdHlEaXIuc2V0KDAuMCwgLTEuMCwgMC4wKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNlbnRlciA9IHNjaGVtYUJvbmVHcm91cC5jZW50ZXIgIT0gbnVsbCA/IHRocmVlTm9kZXNbc2NoZW1hQm9uZUdyb3VwLmNlbnRlcl0gOiB1bmRlZmluZWQ7XG5cbiAgICAgICAgY29uc3Qgc2V0dGluZzogUGFydGlhbDxWUk1TcHJpbmdCb25lSm9pbnRTZXR0aW5ncz4gPSB7XG4gICAgICAgICAgaGl0UmFkaXVzOiBzY2hlbWFCb25lR3JvdXAuaGl0UmFkaXVzLFxuICAgICAgICAgIGRyYWdGb3JjZTogc2NoZW1hQm9uZUdyb3VwLmRyYWdGb3JjZSxcbiAgICAgICAgICBncmF2aXR5UG93ZXI6IHNjaGVtYUJvbmVHcm91cC5ncmF2aXR5UG93ZXIsXG4gICAgICAgICAgc3RpZmZuZXNzOiBzY2hlbWFCb25lR3JvdXAuc3RpZmZpbmVzcyxcbiAgICAgICAgICBncmF2aXR5RGlyLFxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIHByZXBhcmUgY29sbGlkZXJzXG4gICAgICAgIGNvbnN0IGNvbGxpZGVyR3JvdXBzRm9yU3ByaW5nID0gc2NoZW1hQm9uZUdyb3VwLmNvbGxpZGVyR3JvdXBzPy5tYXAoKGlDb2xsaWRlckdyb3VwKSA9PiB7XG4gICAgICAgICAgY29uc3QgZ3JvdXAgPSBjb2xsaWRlckdyb3Vwcz8uW2lDb2xsaWRlckdyb3VwXTtcblxuICAgICAgICAgIGlmIChncm91cCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgIGBWUk1TcHJpbmdCb25lTG9hZGVyUGx1Z2luOiBUaGUgc3ByaW5nICMke2lCb25lR3JvdXB9IGF0dGVtcHRlZCB0byB1c2UgYSBjb2xsaWRlckdyb3VwICR7aUNvbGxpZGVyR3JvdXB9IGJ1dCBub3QgZm91bmRgLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gZ3JvdXA7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGNyZWF0ZSBzcHJpbmcgYm9uZXNcbiAgICAgICAgcm9vdC50cmF2ZXJzZSgobm9kZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNoaWxkOiBUSFJFRS5PYmplY3QzRCB8IG51bGwgPSBub2RlLmNoaWxkcmVuWzBdID8/IG51bGw7XG5cbiAgICAgICAgICBjb25zdCBqb2ludCA9IHRoaXMuX2ltcG9ydEpvaW50KG5vZGUsIGNoaWxkLCBzZXR0aW5nLCBjb2xsaWRlckdyb3Vwc0ZvclNwcmluZyk7XG4gICAgICAgICAgaWYgKGNlbnRlcikge1xuICAgICAgICAgICAgam9pbnQuY2VudGVyID0gY2VudGVyO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIG1hbmFnZXIuYWRkSm9pbnQoam9pbnQpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gaW5pdCBzcHJpbmcgYm9uZXNcbiAgICBnbHRmLnNjZW5lLnVwZGF0ZU1hdHJpeFdvcmxkKCk7XG4gICAgbWFuYWdlci5zZXRJbml0U3RhdGUoKTtcblxuICAgIHJldHVybiBtYW5hZ2VyO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW1wb3J0Sm9pbnQoXG4gICAgbm9kZTogVEhSRUUuT2JqZWN0M0QsXG4gICAgY2hpbGQ6IFRIUkVFLk9iamVjdDNELFxuICAgIHNldHRpbmc/OiBQYXJ0aWFsPFZSTVNwcmluZ0JvbmVKb2ludFNldHRpbmdzPixcbiAgICBjb2xsaWRlckdyb3Vwc0ZvclNwcmluZz86IFZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwW10sXG4gICk6IFZSTVNwcmluZ0JvbmVKb2ludCB7XG4gICAgY29uc3Qgc3ByaW5nQm9uZSA9IG5ldyBWUk1TcHJpbmdCb25lSm9pbnQobm9kZSwgY2hpbGQsIHNldHRpbmcsIGNvbGxpZGVyR3JvdXBzRm9yU3ByaW5nKTtcblxuICAgIGlmICh0aGlzLmpvaW50SGVscGVyUm9vdCkge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IFZSTVNwcmluZ0JvbmVKb2ludEhlbHBlcihzcHJpbmdCb25lKTtcbiAgICAgIHRoaXMuam9pbnRIZWxwZXJSb290LmFkZChoZWxwZXIpO1xuICAgICAgaGVscGVyLnJlbmRlck9yZGVyID0gdGhpcy5qb2ludEhlbHBlclJvb3QucmVuZGVyT3JkZXI7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNwcmluZ0JvbmU7XG4gIH1cblxuICBwcml2YXRlIF9pbXBvcnRTcGhlcmVDb2xsaWRlcihcbiAgICBkZXN0aW5hdGlvbjogVEhSRUUuT2JqZWN0M0QsXG4gICAgcGFyYW1zOiB7XG4gICAgICBvZmZzZXQ6IFRIUkVFLlZlY3RvcjM7XG4gICAgICByYWRpdXM6IG51bWJlcjtcbiAgICB9LFxuICApOiBWUk1TcHJpbmdCb25lQ29sbGlkZXIge1xuICAgIGNvbnN0IHsgb2Zmc2V0LCByYWRpdXMgfSA9IHBhcmFtcztcblxuICAgIGNvbnN0IHNoYXBlID0gbmV3IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlU3BoZXJlKHsgb2Zmc2V0LCByYWRpdXMgfSk7XG5cbiAgICBjb25zdCBjb2xsaWRlciA9IG5ldyBWUk1TcHJpbmdCb25lQ29sbGlkZXIoc2hhcGUpO1xuXG4gICAgZGVzdGluYXRpb24uYWRkKGNvbGxpZGVyKTtcblxuICAgIGlmICh0aGlzLmNvbGxpZGVySGVscGVyUm9vdCkge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IFZSTVNwcmluZ0JvbmVDb2xsaWRlckhlbHBlcihjb2xsaWRlcik7XG4gICAgICB0aGlzLmNvbGxpZGVySGVscGVyUm9vdC5hZGQoaGVscGVyKTtcbiAgICAgIGhlbHBlci5yZW5kZXJPcmRlciA9IHRoaXMuY29sbGlkZXJIZWxwZXJSb290LnJlbmRlck9yZGVyO1xuICAgIH1cblxuICAgIHJldHVybiBjb2xsaWRlcjtcbiAgfVxuXG4gIHByaXZhdGUgX2ltcG9ydENhcHN1bGVDb2xsaWRlcihcbiAgICBkZXN0aW5hdGlvbjogVEhSRUUuT2JqZWN0M0QsXG4gICAgcGFyYW1zOiB7XG4gICAgICBvZmZzZXQ6IFRIUkVFLlZlY3RvcjM7XG4gICAgICByYWRpdXM6IG51bWJlcjtcbiAgICAgIHRhaWw6IFRIUkVFLlZlY3RvcjM7XG4gICAgfSxcbiAgKTogVlJNU3ByaW5nQm9uZUNvbGxpZGVyIHtcbiAgICBjb25zdCB7IG9mZnNldCwgcmFkaXVzLCB0YWlsIH0gPSBwYXJhbXM7XG5cbiAgICBjb25zdCBzaGFwZSA9IG5ldyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZUNhcHN1bGUoeyBvZmZzZXQsIHJhZGl1cywgdGFpbCB9KTtcblxuICAgIGNvbnN0IGNvbGxpZGVyID0gbmV3IFZSTVNwcmluZ0JvbmVDb2xsaWRlcihzaGFwZSk7XG5cbiAgICBkZXN0aW5hdGlvbi5hZGQoY29sbGlkZXIpO1xuXG4gICAgaWYgKHRoaXMuY29sbGlkZXJIZWxwZXJSb290KSB7XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgVlJNU3ByaW5nQm9uZUNvbGxpZGVySGVscGVyKGNvbGxpZGVyKTtcbiAgICAgIHRoaXMuY29sbGlkZXJIZWxwZXJSb290LmFkZChoZWxwZXIpO1xuICAgICAgaGVscGVyLnJlbmRlck9yZGVyID0gdGhpcy5jb2xsaWRlckhlbHBlclJvb3QucmVuZGVyT3JkZXI7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbGxpZGVyO1xuICB9XG59XG4iXSwibmFtZXMiOlsiX3YzQSIsIlRIUkVFIiwiX3YzQiIsIl9tYXRBIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQTs7O1VBR3NCLDBCQUEwQjs7O0lDQWhELE1BQU1BLE1BQUksR0FBRyxJQUFJQyxnQkFBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2pDLE1BQU1DLE1BQUksR0FBRyxJQUFJRCxnQkFBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1VBRXBCLGlDQUFrQyxTQUFRLDBCQUEwQjtRQW9CL0UsWUFBbUIsTUFBMEU7O1lBQzNGLEtBQUssRUFBRSxDQUFDO1lBRVIsSUFBSSxDQUFDLE1BQU0sU0FBRyxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsTUFBTSxtQ0FBSSxJQUFJQSxnQkFBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ2pFLElBQUksQ0FBQyxJQUFJLFNBQUcsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLElBQUksbUNBQUksSUFBSUEsZ0JBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUM3RCxJQUFJLENBQUMsTUFBTSxTQUFHLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxNQUFNLG1DQUFJLEdBQUcsQ0FBQztTQUNyQztRQXpCRCxJQUFXLElBQUk7WUFDYixPQUFPLFNBQVMsQ0FBQztTQUNsQjtRQXlC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
