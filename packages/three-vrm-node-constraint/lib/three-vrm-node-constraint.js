/*!
 * @pixiv/three-vrm-node-constraint v1.0.0-beta.7
 * Node constraint module for @pixiv/three-vrm
 *
 * Copyright (c) 2020-2021 pixiv Inc.
 * @pixiv/three-vrm-node-constraint is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three')) :
    typeof define === 'function' && define.amd ? define(['exports', 'three'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.THREE_VRM_NODE_CONSTRAINT = {}, global.THREE));
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

    const _v3A$2 = new THREE__namespace.Vector3();
    class VRMNodeConstraintHelper extends THREE__namespace.Group {
        constructor(constraint) {
            super();
            this._attrPosition = new THREE__namespace.BufferAttribute(new Float32Array([0, 0, 0, 0, 0, 0]), 3);
            this._attrPosition.setUsage(THREE__namespace.DynamicDrawUsage);
            const geometry = new THREE__namespace.BufferGeometry();
            geometry.setAttribute('position', this._attrPosition);
            const material = new THREE__namespace.LineBasicMaterial({
                color: 0xff00ff,
                depthTest: false,
                depthWrite: false,
            });
            this._line = new THREE__namespace.Line(geometry, material);
            this.add(this._line);
            this.constraint = constraint;
        }
        updateMatrixWorld(force) {
            _v3A$2.setFromMatrixPosition(this.constraint.object.matrixWorld);
            this._attrPosition.setXYZ(0, _v3A$2.x, _v3A$2.y, _v3A$2.z);
            if (this.constraint.source) {
                _v3A$2.setFromMatrixPosition(this.constraint.source.matrixWorld);
            }
            this._attrPosition.setXYZ(1, _v3A$2.x, _v3A$2.y, _v3A$2.z);
            this._attrPosition.needsUpdate = true;
            super.updateMatrixWorld(force);
        }
    }

    function decomposePosition(matrix, target) {
        return target.set(matrix.elements[12], matrix.elements[13], matrix.elements[14]);
    }

    const _v3A$1 = new THREE__namespace.Vector3();
    const _v3B = new THREE__namespace.Vector3();
    function decomposeRotation(matrix, target) {
        matrix.decompose(_v3A$1, target, _v3B);
        return target;
    }

    /**
     * A compat function for `Quaternion.invert()` / `Quaternion.inverse()`.
     * `Quaternion.invert()` is introduced in r123 and `Quaternion.inverse()` emits a warning.
     * We are going to use this compat for a while.
     * @param target A target quaternion
     */
    function quatInvertCompat(target) {
        if (target.invert) {
            target.invert();
        }
        else {
            target.inverse();
        }
        return target;
    }

    const _v3Dir = new THREE__namespace.Vector3();
    const _v3PlaneX = new THREE__namespace.Vector3();
    const _v3PlaneY = new THREE__namespace.Vector3();
    const _quatA$2 = new THREE__namespace.Quaternion();
    /**
     * Return a quaternion that represents a rotation of aim vector.
     * @param target Target quaternion
     * @param from A vector represents eye position of the aim quaternion.
     * @param to A vector represents target position of the aim quaternion.
     * @param aim A reference vector of the aim vector. Must be normalized
     * @param up An up vector. Must be normalized
     */
    function setAimQuaternion(target, from, to, aim, up, freezeAxes) {
        // this is the target rotation
        _v3Dir.copy(to).sub(from).normalize();
        // calculate the diff of theta
        const thetaAim = Math.asin(up.dot(aim));
        const thetaDir = Math.asin(up.dot(_v3Dir));
        // create a plane that is determined by up vector and aim vector
        _v3PlaneX.crossVectors(up, aim).normalize();
        _v3PlaneY.crossVectors(_v3PlaneX, up); // guaranteed to be normalized
        // calculate the diff of phi
        // the phi of the aim vector is already guaranteed to be zero, since the plane is already made of the aim vector
        const phiDir = Math.atan2(_v3PlaneX.dot(_v3Dir), _v3PlaneY.dot(_v3Dir));
        // made a quaternion out of calculated phi and theta
        target.setFromAxisAngle(up, freezeAxes[0] ? phiDir : 0.0);
        _quatA$2.setFromAxisAngle(_v3PlaneX, freezeAxes[1] ? thetaAim - thetaDir : 0.0);
        target.multiply(_quatA$2);
        return target;
    }

    const _matA$3 = new THREE__namespace.Matrix4();
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
            target.getInverse(_matA$3.copy(target));
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

    const _matWorldToModel = new THREE__namespace.Matrix4();
    class VRMNodeConstraint {
        /**
         * @param object The destination object
         * @param modelRoot When {@link sourceSpace} / {@link destinationSpace} is model space, these transforms will be cauculated relatively from this object
         */
        constructor(object, modelRoot) {
            this.weight = 1.0;
            this.sourceSpace = 'model';
            this.destinationSpace = 'model';
            this.object = object;
            this.modelRoot = modelRoot;
        }
        get source() {
            return this._source;
        }
        get dependencies() {
            const deps = new Set();
            this._source && deps.add(this._source);
            if (this.destinationSpace === 'model' && this.object.parent) {
                deps.add(this.object.parent);
            }
            return deps;
        }
        setSource(source) {
            this._source = source;
        }
        /**
         * Get the object matrix of the parent, in model space.
         * @param target Target matrix
         */
        _getParentMatrixInModelSpace(target) {
            if (!this.object.parent) {
                target.identity();
            }
            else {
                this.object.parent.updateWorldMatrix(false, false);
                target.copy(this.object.parent.matrixWorld);
                this._getMatrixWorldToModel(_matWorldToModel);
                target.premultiply(_matWorldToModel);
            }
            return target;
        }
        /**
         * Get the object matrix of the object, taking desired object space into account.
         * Intended to be used to absorb between different spaces.
         * @param target Target matrix
         */
        _getDestinationMatrix(target) {
            if (this.destinationSpace === 'local') {
                this.object.updateMatrix();
                target.copy(this.object.matrix);
            }
            else if (this.destinationSpace === 'model') {
                this.object.updateWorldMatrix(false, false);
                target.copy(this.object.matrixWorld);
                this._getMatrixWorldToModel(_matWorldToModel);
                target.premultiply(_matWorldToModel);
            }
            else {
                throw new Error(`VRMNodeConstraint: Unknown destinationSpace ${this.destinationSpace} detected`);
            }
            return target;
        }
        /**
         * Get the object matrix of the source, taking desired object space into account.
         * Intended to be used to absorb between different spaces.
         * @param target Target matrix
         */
        _getSourceMatrix(target) {
            if (!this._source) {
                throw new Error('There is no source specified');
            }
            if (this.sourceSpace === 'local') {
                this._source.updateMatrix();
                target.copy(this._source.matrix);
            }
            else if (this.sourceSpace === 'model') {
                this._source.updateWorldMatrix(false, false);
                target.copy(this._source.matrixWorld);
                this._getMatrixWorldToModel(_matWorldToModel);
                target.premultiply(_matWorldToModel);
            }
            else {
                throw new Error(`VRMNodeConstraint: Unknown sourceSpace ${this.sourceSpace} detected`);
            }
            return target;
        }
        /**
         * Create a matrix that converts world space into model space.
         * @param target Target matrix
         */
        _getMatrixWorldToModel(target) {
            let inverseCacheProxy = this.modelRoot.userData.inverseCacheProxy;
            if (!inverseCacheProxy) {
                inverseCacheProxy = this.modelRoot.userData.inverseCacheProxy = new Matrix4InverseCache(this.modelRoot.matrix);
            }
            target.copy(inverseCacheProxy.inverse);
            return target;
        }
    }

    const QUAT_IDENTITY$2 = new THREE__namespace.Quaternion(0, 0, 0, 1);
    const _quatA$1 = new THREE__namespace.Quaternion();
    const _quatB$1 = new THREE__namespace.Quaternion();
    const _matA$2 = new THREE__namespace.Matrix4();
    const _v3GetRotationPos = new THREE__namespace.Vector3();
    const _v3GetRotationDir = new THREE__namespace.Vector3();
    class VRMAimConstraint extends VRMNodeConstraint {
        constructor() {
            super(...arguments);
            /**
             * Represents the aim vector used for reference of aim rotation.
             * It must be normalized.
             */
            this.aimVector = new THREE__namespace.Vector3(0.0, 0.0, 1.0);
            /**
             * Represents the up vector used for calculation of aim rotation.
             * It must be normalized.
             */
            this.upVector = new THREE__namespace.Vector3(0.0, 1.0, 0.0);
            this.freezeAxes = [true, true];
            this._quatInitAim = new THREE__namespace.Quaternion();
            this._quatInvInitAim = new THREE__namespace.Quaternion();
            this._quatInitDst = new THREE__namespace.Quaternion();
        }
        setInitState() {
            this._getDestinationMatrix(_matA$2);
            decomposeRotation(_matA$2, this._quatInitDst);
            this._getAimQuat(this._quatInitAim);
            quatInvertCompat(this._quatInvInitAim.copy(this._quatInitAim));
        }
        update() {
            if (this.destinationSpace === 'local') {
                // reset rotation
                this.object.quaternion.copy(QUAT_IDENTITY$2);
            }
            else {
                // back to the initial rotation in world space
                this._getParentMatrixInModelSpace(_matA$2);
                decomposeRotation(_matA$2, _quatA$1);
                quatInvertCompat(this.object.quaternion.copy(_quatA$1));
            }
            // aim toward the target
            this._getAimDiffQuat(_quatB$1);
            this.object.quaternion.multiply(_quatB$1);
            // apply the initial rotation
            this.object.quaternion.multiply(this._quatInitDst);
            // done
            this.object.updateMatrix();
        }
        /**
         * Return a quaternion that represents a diff from the initial -> current orientation of the aim direction.
         * It's aware of its {@link sourceSpace}, {@link freezeAxes}, and {@link weight}.
         * @param target Target quaternion
         */
        _getAimDiffQuat(target) {
            this._getAimQuat(target);
            target.multiply(this._quatInvInitAim);
            target.slerp(QUAT_IDENTITY$2, 1.0 - this.weight);
            return target;
        }
        /**
         * Return a current orientation of the aim direction.
         * It's aware of its {@link sourceSpace} and {@link freezeAxes}.
         * @param target Target quaternion
         */
        _getAimQuat(target) {
            return setAimQuaternion(target, this._getDestinationPosition(_v3GetRotationPos), this._getSourcePosition(_v3GetRotationDir), this.aimVector, this.upVector, this.freezeAxes);
        }
        /**
         * Return the current position of the object.
         * It's aware of its {@link sourceSpace}.
         * @param target Target quaternion
         */
        _getDestinationPosition(target) {
            target.set(0.0, 0.0, 0.0);
            this._getDestinationMatrix(_matA$2);
            decomposePosition(_matA$2, target);
            return target;
        }
        /**
         * Return the current position of the source.
         * It's aware of its {@link sourceSpace}.
         * @param target Target quaternion
         */
        _getSourcePosition(target) {
            target.set(0.0, 0.0, 0.0);
            if (this._source) {
                this._getSourceMatrix(_matA$2);
                decomposePosition(_matA$2, target);
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

    class VRMNodeConstraintManager {
        constructor() {
            this._constraints = new Set();
            this._objectConstraintsMap = new Map();
        }
        get constraints() {
            return this._constraints;
        }
        addConstraint(constraint) {
            this._constraints.add(constraint);
            let objectSet = this._objectConstraintsMap.get(constraint.object);
            if (objectSet == null) {
                objectSet = new Set();
                this._objectConstraintsMap.set(constraint.object, objectSet);
            }
            objectSet.add(constraint);
        }
        deleteConstraint(constraint) {
            this._constraints.delete(constraint);
            const objectSet = this._objectConstraintsMap.get(constraint.object);
            objectSet.delete(constraint);
        }
        setInitState() {
            const constraintsTried = new Set();
            const constraintsDone = new Set();
            for (const constraint of this._constraints) {
                this._processConstraint(constraint, constraintsTried, constraintsDone, (constraint) => constraint.setInitState());
            }
        }
        update() {
            const constraintsTried = new Set();
            const constraintsDone = new Set();
            for (const constraint of this._constraints) {
                this._processConstraint(constraint, constraintsTried, constraintsDone, (constraint) => constraint.update());
            }
        }
        /**
         * Update a constraint.
         * If there are other constraints that are dependant, it will try to update them recursively.
         * It might throw an error if there are circular dependencies.
         *
         * Intended to be used in {@link update} and {@link _processConstraint} itself recursively.
         *
         * @param constraint A constraint you want to update
         * @param constraintsTried Set of constraints that are already tried to be updated
         * @param constraintsDone Set of constraints that are already up to date
         */
        _processConstraint(constraint, constraintsTried, constraintsDone, callback) {
            if (constraintsDone.has(constraint)) {
                return;
            }
            if (constraintsTried.has(constraint)) {
                throw new Error('VRMConstraintManager: Circular dependency detected while updating constraints');
            }
            constraintsTried.add(constraint);
            const depObjects = constraint.dependencies;
            for (const depObject of depObjects) {
                traverseAncestorsFromRoot(depObject, (depObjectAncestor) => {
                    const objectSet = this._objectConstraintsMap.get(depObjectAncestor);
                    if (objectSet) {
                        for (const depConstraint of objectSet) {
                            this._processConstraint(depConstraint, constraintsTried, constraintsDone, callback);
                        }
                    }
                });
            }
            callback(constraint);
            constraintsDone.add(constraint);
        }
    }

    function vector3FreezeAxes(target, freeze) {
        if (freeze[0] && freeze[1] && freeze[2]) {
            return target;
        }
        if (!freeze[0] && !freeze[1] && !freeze[2]) {
            return target.set(0.0, 0.0, 0.0);
        }
        if (!freeze[0]) {
            target.x *= 0.0;
        }
        if (!freeze[1]) {
            target.y *= 0.0;
        }
        if (!freeze[2]) {
            target.z *= 0.0;
        }
        return target;
    }

    const _matA$1 = new THREE__namespace.Matrix4();
    class VRMPositionConstraint extends VRMNodeConstraint {
        constructor() {
            super(...arguments);
            this.freezeAxes = [true, true, true];
            this._v3InitDst = new THREE__namespace.Vector3();
            this._v3InitSrc = new THREE__namespace.Vector3();
        }
        setInitState() {
            this._v3InitDst.copy(this.object.position);
            this._getSourcePosition(this._v3InitSrc);
        }
        update() {
            this._getSourceDiffPosition(this.object.position);
            if (this.destinationSpace === 'model') {
                mat4InvertCompat(this._getParentMatrixInModelSpace(_matA$1));
                // remove translation
                _matA$1.elements[12] = 0;
                _matA$1.elements[13] = 0;
                _matA$1.elements[14] = 0;
                this.object.position.applyMatrix4(_matA$1);
            }
            this.object.position.add(this._v3InitDst);
            this.object.updateMatrix();
        }
        /**
         * Return a vector that represents a diff from the initial -> current position of the source.
         * It's aware of its {@link sourceSpace}, {@link freezeAxes}, and {@link weight}.
         * @param target Target quaternion
         */
        _getSourceDiffPosition(target) {
            this._getSourcePosition(target);
            target.sub(this._v3InitSrc);
            vector3FreezeAxes(target, this.freezeAxes);
            target.multiplyScalar(this.weight);
            return target;
        }
        /**
         * Return the current position of the source.
         * It's aware of its {@link sourceSpace}.
         * @param target Target quaternion
         */
        _getSourcePosition(target) {
            target.set(0.0, 0.0, 0.0);
            if (this._source) {
                this._getSourceMatrix(_matA$1);
                decomposePosition(_matA$1, target);
            }
            return target;
        }
    }

    const QUAT_IDENTITY$1 = new THREE__namespace.Quaternion(0, 0, 0, 1);
    const _v3A = new THREE__namespace.Vector3();
    /**
     * Compute an exponential of a quaternion. Destructive.
     * @param target A quaternion.
     */
    function quatExp(target) {
        _v3A.set(target.x, target.y, target.z);
        const vNorm = _v3A.length();
        const m = Math.exp(target.w);
        const s = vNorm < Number.EPSILON ? 0.0 : (m * Math.sin(vNorm)) / vNorm;
        target.set(s * target.x, s * target.y, s * target.z, m * Math.cos(vNorm));
        return target;
    }
    /**
     * Compute a logarithm of a quaternion. Destructive.
     * @param target A quaternion.
     */
    function quatLog(target) {
        _v3A.set(target.x, target.y, target.z);
        const vNorm = _v3A.length();
        const t = vNorm < Number.EPSILON ? 0.0 : Math.atan2(vNorm, target.w) / vNorm;
        target.set(t * target.x, t * target.y, t * target.z, 0.5 * Math.log(target.lengthSq()));
        return target;
    }
    function quaternionFreezeAxes(target, freeze) {
        if (freeze[0] && freeze[1] && freeze[2]) {
            return target;
        }
        if (!freeze[0] && !freeze[1] && !freeze[2]) {
            return target.copy(QUAT_IDENTITY$1);
        }
        quatLog(target);
        if (!freeze[0]) {
            target.x *= 0.0;
        }
        if (!freeze[1]) {
            target.y *= 0.0;
        }
        if (!freeze[2]) {
            target.z *= 0.0;
        }
        return quatExp(target);
    }

    const QUAT_IDENTITY = new THREE__namespace.Quaternion(0, 0, 0, 1);
    const _matA = new THREE__namespace.Matrix4();
    const _quatA = new THREE__namespace.Quaternion();
    const _quatB = new THREE__namespace.Quaternion();
    class VRMRotationConstraint extends VRMNodeConstraint {
        constructor() {
            super(...arguments);
            this.freezeAxes = [true, true, true];
            this._quatInitSrc = new THREE__namespace.Quaternion();
            this._quatInvInitSrc = new THREE__namespace.Quaternion();
            this._quatInitDst = new THREE__namespace.Quaternion();
        }
        setInitState() {
            this._quatInitDst.copy(this.object.quaternion);
            this._getSourceQuat(this._quatInitSrc);
            quatInvertCompat(this._quatInvInitSrc.copy(this._quatInitSrc));
        }
        update() {
            if (this.destinationSpace === 'local') {
                this.object.quaternion.copy(this._quatInitDst);
            }
            else {
                this._getParentMatrixInModelSpace(_matA);
                decomposeRotation(_matA, _quatA);
                quatInvertCompat(this.object.quaternion.copy(_quatA));
            }
            this._getSourceDiffQuat(_quatB);
            this.object.quaternion.multiply(_quatB);
            if (this.destinationSpace === 'model') {
                this.object.quaternion.multiply(_quatA);
                this.object.quaternion.multiply(this._quatInitDst);
            }
            this.object.updateMatrix();
        }
        /**
         * Return a quaternion that represents a diff from the initial -> current orientation of the source.
         * It's aware of its {@link sourceSpace}, {@link freezeAxes}, and {@link weight}.
         * @param target Target quaternion
         */
        _getSourceDiffQuat(target) {
            this._getSourceQuat(target);
            if (this.sourceSpace === 'local') {
                target.premultiply(this._quatInvInitSrc);
            }
            else {
                target.multiply(this._quatInvInitSrc);
            }
            quaternionFreezeAxes(target, this.freezeAxes);
            target.slerp(QUAT_IDENTITY, 1.0 - this.weight);
            return target;
        }
        /**
         * Return the current orientation of the source.
         * It's aware of its {@link sourceSpace}.
         * @param target Target quaternion
         */
        _getSourceQuat(target) {
            target.copy(QUAT_IDENTITY);
            if (this._source) {
                this._getSourceMatrix(_matA);
                decomposeRotation(_matA, target);
            }
            return target;
        }
    }

    class VRMNodeConstraintLoaderPlugin {
        constructor(parser, options) {
            this.parser = parser;
            this.helperRoot = options === null || options === void 0 ? void 0 : options.helperRoot;
        }
        get name() {
            return VRMNodeConstraintLoaderPlugin.EXTENSION_NAME;
        }
        afterRoot(gltf) {
            return __awaiter(this, void 0, void 0, function* () {
                gltf.userData.vrmNodeConstraintManager = yield this._import(gltf);
            });
        }
        /**
         * Import constraints from a GLTF and returns a {@link VRMNodeConstraintManager}.
         * It might return `null` instead when it does not need to be created or something go wrong.
         *
         * @param gltf A parsed result of GLTF taken from GLTFLoader
         */
        _import(gltf) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                // early abort if it doesn't use constraints
                const isConstraintsUsed = ((_a = this.parser.json.extensionsUsed) === null || _a === void 0 ? void 0 : _a.indexOf(VRMNodeConstraintLoaderPlugin.EXTENSION_NAME)) !== -1;
                if (!isConstraintsUsed) {
                    return null;
                }
                const manager = new VRMNodeConstraintManager();
                const threeNodes = yield this.parser.getDependencies('node');
                // import constraints for each nodes
                threeNodes.forEach((node, nodeIndex) => {
                    var _a;
                    const schemaNode = this.parser.json.nodes[nodeIndex];
                    // check if the extension uses the extension
                    const extension = (_a = schemaNode === null || schemaNode === void 0 ? void 0 : schemaNode.extensions) === null || _a === void 0 ? void 0 : _a[VRMNodeConstraintLoaderPlugin.EXTENSION_NAME];
                    if (extension == null) {
                        return;
                    }
                    const specVersion = extension.specVersion;
                    if (specVersion !== '1.0-draft') {
                        return;
                    }
                    // import constraints
                    if (extension === null || extension === void 0 ? void 0 : extension.position) {
                        const constraint = this._importPositionConstraint(node, threeNodes, gltf.scene, extension.position);
                        manager.addConstraint(constraint);
                    }
                    if (extension === null || extension === void 0 ? void 0 : extension.rotation) {
                        const constraint = this._importRotationConstraint(node, threeNodes, gltf.scene, extension.rotation);
                        manager.addConstraint(constraint);
                    }
                    if (extension === null || extension === void 0 ? void 0 : extension.aim) {
                        const constraint = this._importAimConstraint(node, threeNodes, gltf.scene, extension.aim);
                        manager.addConstraint(constraint);
                    }
                });
                // init constraints
                gltf.scene.updateMatrixWorld();
                manager.setInitState();
                return manager;
            });
        }
        _importPositionConstraint(destination, nodes, modelRoot, position) {
            const { source, sourceSpace, destinationSpace, weight, freezeAxes } = position;
            const constraint = new VRMPositionConstraint(destination, modelRoot);
            constraint.setSource(nodes[source]);
            if (sourceSpace) {
                constraint.sourceSpace = sourceSpace;
            }
            if (destinationSpace) {
                constraint.destinationSpace = destinationSpace;
            }
            if (weight) {
                constraint.weight = weight;
            }
            if (freezeAxes) {
                constraint.freezeAxes = freezeAxes;
            }
            if (this.helperRoot) {
                const helper = new VRMNodeConstraintHelper(constraint);
                this.helperRoot.add(helper);
                helper.renderOrder = this.helperRoot.renderOrder;
            }
            return constraint;
        }
        _importRotationConstraint(destination, nodes, modelRoot, rotation) {
            const { source, sourceSpace, destinationSpace, weight, freezeAxes } = rotation;
            const constraint = new VRMRotationConstraint(destination, modelRoot);
            constraint.setSource(nodes[source]);
            if (sourceSpace) {
                constraint.sourceSpace = sourceSpace;
            }
            if (destinationSpace) {
                constraint.destinationSpace = destinationSpace;
            }
            if (weight) {
                constraint.weight = weight;
            }
            if (freezeAxes) {
                constraint.freezeAxes = freezeAxes;
            }
            if (this.helperRoot) {
                const helper = new VRMNodeConstraintHelper(constraint);
                this.helperRoot.add(helper);
            }
            return constraint;
        }
        _importAimConstraint(destination, nodes, modelRoot, aim) {
            const { source, aimVector, upVector, sourceSpace, destinationSpace, weight, freezeAxes } = aim;
            const constraint = new VRMAimConstraint(destination, modelRoot);
            constraint.setSource(nodes[source]);
            if (aimVector) {
                constraint.aimVector.fromArray(aimVector).normalize();
            }
            if (upVector) {
                constraint.upVector.fromArray(upVector).normalize();
            }
            if (sourceSpace) {
                constraint.sourceSpace = sourceSpace;
            }
            if (destinationSpace) {
                constraint.destinationSpace = destinationSpace;
            }
            if (weight) {
                constraint.weight = weight;
            }
            if (freezeAxes) {
                constraint.freezeAxes = freezeAxes;
            }
            if (this.helperRoot) {
                const helper = new VRMNodeConstraintHelper(constraint);
                this.helperRoot.add(helper);
            }
            return constraint;
        }
    }
    VRMNodeConstraintLoaderPlugin.EXTENSION_NAME = 'VRMC_node_constraint';

    /* eslint-disable @typescript-eslint/naming-convention */
    const VRMNodeConstraintObjectSpace = {
        Local: 'local',
        Model: 'model',
    };

    exports.VRMAimConstraint = VRMAimConstraint;
    exports.VRMNodeConstraint = VRMNodeConstraint;
    exports.VRMNodeConstraintHelper = VRMNodeConstraintHelper;
    exports.VRMNodeConstraintLoaderPlugin = VRMNodeConstraintLoaderPlugin;
    exports.VRMNodeConstraintManager = VRMNodeConstraintManager;
    exports.VRMNodeConstraintObjectSpace = VRMNodeConstraintObjectSpace;
    exports.VRMPositionConstraint = VRMPositionConstraint;
    exports.VRMRotationConstraint = VRMRotationConstraint;

    Object.defineProperty(exports, '__esModule', { value: true });

    Object.assign(THREE, exports);

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyZWUtdnJtLW5vZGUtY29uc3RyYWludC5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL2hlbHBlcnMvVlJNTm9kZUNvbnN0cmFpbnRIZWxwZXIudHMiLCIuLi9zcmMvdXRpbHMvZGVjb21wb3NlUG9zaXRpb24udHMiLCIuLi9zcmMvdXRpbHMvZGVjb21wb3NlUm90YXRpb24udHMiLCIuLi9zcmMvdXRpbHMvcXVhdEludmVydENvbXBhdC50cyIsIi4uL3NyYy91dGlscy9zZXRBaW1RdWF0ZXJuaW9uLnRzIiwiLi4vc3JjL3V0aWxzL21hdDRJbnZlcnRDb21wYXQudHMiLCIuLi9zcmMvdXRpbHMvTWF0cml4NEludmVyc2VDYWNoZS50cyIsIi4uL3NyYy9WUk1Ob2RlQ29uc3RyYWludC50cyIsIi4uL3NyYy9WUk1BaW1Db25zdHJhaW50LnRzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIi4uL3NyYy91dGlscy90cmF2ZXJzZUFuY2VzdG9yc0Zyb21Sb290LnRzIiwiLi4vc3JjL1ZSTU5vZGVDb25zdHJhaW50TWFuYWdlci50cyIsIi4uL3NyYy91dGlscy92ZWN0b3IzRnJlZXplQXhlcy50cyIsIi4uL3NyYy9WUk1Qb3NpdGlvbkNvbnN0cmFpbnQudHMiLCIuLi9zcmMvdXRpbHMvcXVhdGVybmlvbkZyZWV6ZUF4ZXMudHMiLCIuLi9zcmMvVlJNUm90YXRpb25Db25zdHJhaW50LnRzIiwiLi4vc3JjL1ZSTU5vZGVDb25zdHJhaW50TG9hZGVyUGx1Z2luLnRzIiwiLi4vc3JjL1ZSTU5vZGVDb25zdHJhaW50T2JqZWN0U3BhY2UudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNTm9kZUNvbnN0cmFpbnQgfSBmcm9tICcuLi9WUk1Ob2RlQ29uc3RyYWludCc7XG5cbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5leHBvcnQgY2xhc3MgVlJNTm9kZUNvbnN0cmFpbnRIZWxwZXIgZXh0ZW5kcyBUSFJFRS5Hcm91cCB7XG4gIHB1YmxpYyByZWFkb25seSBjb25zdHJhaW50OiBWUk1Ob2RlQ29uc3RyYWludDtcbiAgcHJpdmF0ZSBfbGluZTogVEhSRUUuTGluZTtcbiAgcHJpdmF0ZSBfYXR0clBvc2l0aW9uOiBUSFJFRS5CdWZmZXJBdHRyaWJ1dGU7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGNvbnN0cmFpbnQ6IFZSTU5vZGVDb25zdHJhaW50KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuX2F0dHJQb3NpdGlvbiA9IG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUobmV3IEZsb2F0MzJBcnJheShbMCwgMCwgMCwgMCwgMCwgMF0pLCAzKTtcbiAgICB0aGlzLl9hdHRyUG9zaXRpb24uc2V0VXNhZ2UoVEhSRUUuRHluYW1pY0RyYXdVc2FnZSk7XG5cbiAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeSgpO1xuICAgIGdlb21ldHJ5LnNldEF0dHJpYnV0ZSgncG9zaXRpb24nLCB0aGlzLl9hdHRyUG9zaXRpb24pO1xuXG4gICAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTGluZUJhc2ljTWF0ZXJpYWwoe1xuICAgICAgY29sb3I6IDB4ZmYwMGZmLFxuICAgICAgZGVwdGhUZXN0OiBmYWxzZSxcbiAgICAgIGRlcHRoV3JpdGU6IGZhbHNlLFxuICAgIH0pO1xuXG4gICAgdGhpcy5fbGluZSA9IG5ldyBUSFJFRS5MaW5lKGdlb21ldHJ5LCBtYXRlcmlhbCk7XG4gICAgdGhpcy5hZGQodGhpcy5fbGluZSk7XG5cbiAgICB0aGlzLmNvbnN0cmFpbnQgPSBjb25zdHJhaW50O1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZU1hdHJpeFdvcmxkKGZvcmNlPzogYm9vbGVhbik6IHZvaWQge1xuICAgIF92M0Euc2V0RnJvbU1hdHJpeFBvc2l0aW9uKHRoaXMuY29uc3RyYWludC5vYmplY3QubWF0cml4V29ybGQpO1xuICAgIHRoaXMuX2F0dHJQb3NpdGlvbi5zZXRYWVooMCwgX3YzQS54LCBfdjNBLnksIF92M0Eueik7XG5cbiAgICBpZiAodGhpcy5jb25zdHJhaW50LnNvdXJjZSkge1xuICAgICAgX3YzQS5zZXRGcm9tTWF0cml4UG9zaXRpb24odGhpcy5jb25zdHJhaW50LnNvdXJjZS5tYXRyaXhXb3JsZCk7XG4gICAgfVxuICAgIHRoaXMuX2F0dHJQb3NpdGlvbi5zZXRYWVooMSwgX3YzQS54LCBfdjNBLnksIF92M0Eueik7XG5cbiAgICB0aGlzLl9hdHRyUG9zaXRpb24ubmVlZHNVcGRhdGUgPSB0cnVlO1xuXG4gICAgc3VwZXIudXBkYXRlTWF0cml4V29ybGQoZm9yY2UpO1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWNvbXBvc2VQb3NpdGlvbjxUIGV4dGVuZHMgVEhSRUUuVmVjdG9yMz4obWF0cml4OiBUSFJFRS5NYXRyaXg0LCB0YXJnZXQ6IFQpOiBUIHtcbiAgcmV0dXJuIHRhcmdldC5zZXQobWF0cml4LmVsZW1lbnRzWzEyXSwgbWF0cml4LmVsZW1lbnRzWzEzXSwgbWF0cml4LmVsZW1lbnRzWzE0XSk7XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3YzQiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWNvbXBvc2VSb3RhdGlvbjxUIGV4dGVuZHMgVEhSRUUuUXVhdGVybmlvbj4obWF0cml4OiBUSFJFRS5NYXRyaXg0LCB0YXJnZXQ6IFQpOiBUIHtcbiAgbWF0cml4LmRlY29tcG9zZShfdjNBLCB0YXJnZXQsIF92M0IpO1xuICByZXR1cm4gdGFyZ2V0O1xufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIEEgY29tcGF0IGZ1bmN0aW9uIGZvciBgUXVhdGVybmlvbi5pbnZlcnQoKWAgLyBgUXVhdGVybmlvbi5pbnZlcnNlKClgLlxuICogYFF1YXRlcm5pb24uaW52ZXJ0KClgIGlzIGludHJvZHVjZWQgaW4gcjEyMyBhbmQgYFF1YXRlcm5pb24uaW52ZXJzZSgpYCBlbWl0cyBhIHdhcm5pbmcuXG4gKiBXZSBhcmUgZ29pbmcgdG8gdXNlIHRoaXMgY29tcGF0IGZvciBhIHdoaWxlLlxuICogQHBhcmFtIHRhcmdldCBBIHRhcmdldCBxdWF0ZXJuaW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBxdWF0SW52ZXJ0Q29tcGF0PFQgZXh0ZW5kcyBUSFJFRS5RdWF0ZXJuaW9uPih0YXJnZXQ6IFQpOiBUIHtcbiAgaWYgKCh0YXJnZXQgYXMgYW55KS5pbnZlcnQpIHtcbiAgICB0YXJnZXQuaW52ZXJ0KCk7XG4gIH0gZWxzZSB7XG4gICAgKHRhcmdldCBhcyBhbnkpLmludmVyc2UoKTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbmNvbnN0IF92M0RpciA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfdjNQbGFuZVggPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3YzUGxhbmVZID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF9xdWF0QSA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5cbi8qKlxuICogUmV0dXJuIGEgcXVhdGVybmlvbiB0aGF0IHJlcHJlc2VudHMgYSByb3RhdGlvbiBvZiBhaW0gdmVjdG9yLlxuICogQHBhcmFtIHRhcmdldCBUYXJnZXQgcXVhdGVybmlvblxuICogQHBhcmFtIGZyb20gQSB2ZWN0b3IgcmVwcmVzZW50cyBleWUgcG9zaXRpb24gb2YgdGhlIGFpbSBxdWF0ZXJuaW9uLlxuICogQHBhcmFtIHRvIEEgdmVjdG9yIHJlcHJlc2VudHMgdGFyZ2V0IHBvc2l0aW9uIG9mIHRoZSBhaW0gcXVhdGVybmlvbi5cbiAqIEBwYXJhbSBhaW0gQSByZWZlcmVuY2UgdmVjdG9yIG9mIHRoZSBhaW0gdmVjdG9yLiBNdXN0IGJlIG5vcm1hbGl6ZWRcbiAqIEBwYXJhbSB1cCBBbiB1cCB2ZWN0b3IuIE11c3QgYmUgbm9ybWFsaXplZFxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0QWltUXVhdGVybmlvbjxUIGV4dGVuZHMgVEhSRUUuUXVhdGVybmlvbj4oXG4gIHRhcmdldDogVCxcbiAgZnJvbTogVEhSRUUuVmVjdG9yMyxcbiAgdG86IFRIUkVFLlZlY3RvcjMsXG4gIGFpbTogVEhSRUUuVmVjdG9yMyxcbiAgdXA6IFRIUkVFLlZlY3RvcjMsXG4gIGZyZWV6ZUF4ZXM6IFtib29sZWFuLCBib29sZWFuXSxcbik6IFQge1xuICAvLyB0aGlzIGlzIHRoZSB0YXJnZXQgcm90YXRpb25cbiAgX3YzRGlyLmNvcHkodG8pLnN1Yihmcm9tKS5ub3JtYWxpemUoKTtcblxuICAvLyBjYWxjdWxhdGUgdGhlIGRpZmYgb2YgdGhldGFcbiAgY29uc3QgdGhldGFBaW0gPSBNYXRoLmFzaW4odXAuZG90KGFpbSkpO1xuICBjb25zdCB0aGV0YURpciA9IE1hdGguYXNpbih1cC5kb3QoX3YzRGlyKSk7XG5cbiAgLy8gY3JlYXRlIGEgcGxhbmUgdGhhdCBpcyBkZXRlcm1pbmVkIGJ5IHVwIHZlY3RvciBhbmQgYWltIHZlY3RvclxuICBfdjNQbGFuZVguY3Jvc3NWZWN0b3JzKHVwLCBhaW0pLm5vcm1hbGl6ZSgpO1xuICBfdjNQbGFuZVkuY3Jvc3NWZWN0b3JzKF92M1BsYW5lWCwgdXApOyAvLyBndWFyYW50ZWVkIHRvIGJlIG5vcm1hbGl6ZWRcblxuICAvLyBjYWxjdWxhdGUgdGhlIGRpZmYgb2YgcGhpXG4gIC8vIHRoZSBwaGkgb2YgdGhlIGFpbSB2ZWN0b3IgaXMgYWxyZWFkeSBndWFyYW50ZWVkIHRvIGJlIHplcm8sIHNpbmNlIHRoZSBwbGFuZSBpcyBhbHJlYWR5IG1hZGUgb2YgdGhlIGFpbSB2ZWN0b3JcbiAgY29uc3QgcGhpRGlyID0gTWF0aC5hdGFuMihfdjNQbGFuZVguZG90KF92M0RpciksIF92M1BsYW5lWS5kb3QoX3YzRGlyKSk7XG5cbiAgLy8gbWFkZSBhIHF1YXRlcm5pb24gb3V0IG9mIGNhbGN1bGF0ZWQgcGhpIGFuZCB0aGV0YVxuICB0YXJnZXQuc2V0RnJvbUF4aXNBbmdsZSh1cCwgZnJlZXplQXhlc1swXSA/IHBoaURpciA6IDAuMCk7XG4gIF9xdWF0QS5zZXRGcm9tQXhpc0FuZ2xlKF92M1BsYW5lWCwgZnJlZXplQXhlc1sxXSA/IHRoZXRhQWltIC0gdGhldGFEaXIgOiAwLjApO1xuICB0YXJnZXQubXVsdGlwbHkoX3F1YXRBKTtcblxuICByZXR1cm4gdGFyZ2V0O1xufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG5jb25zdCBfbWF0QSA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG5cbi8qKlxuICogQSBjb21wYXQgZnVuY3Rpb24gZm9yIGBNYXRyaXg0LmludmVydCgpYCAvIGBNYXRyaXg0LmdldEludmVyc2UoKWAuXG4gKiBgTWF0cml4NC5pbnZlcnQoKWAgaXMgaW50cm9kdWNlZCBpbiByMTIzIGFuZCBgTWF0cml4NC5nZXRJbnZlcnNlKClgIGVtaXRzIGEgd2FybmluZy5cbiAqIFdlIGFyZSBnb2luZyB0byB1c2UgdGhpcyBjb21wYXQgZm9yIGEgd2hpbGUuXG4gKiBAcGFyYW0gdGFyZ2V0IEEgdGFyZ2V0IG1hdHJpeFxuICovXG5leHBvcnQgZnVuY3Rpb24gbWF0NEludmVydENvbXBhdDxUIGV4dGVuZHMgVEhSRUUuTWF0cml4ND4odGFyZ2V0OiBUKTogVCB7XG4gIGlmICgodGFyZ2V0IGFzIGFueSkuaW52ZXJ0KSB7XG4gICAgdGFyZ2V0LmludmVydCgpO1xuICB9IGVsc2Uge1xuICAgICh0YXJnZXQgYXMgYW55KS5nZXRJbnZlcnNlKF9tYXRBLmNvcHkodGFyZ2V0KSk7XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgbWF0NEludmVydENvbXBhdCB9IGZyb20gJy4vbWF0NEludmVydENvbXBhdCc7XG5cbmV4cG9ydCBjbGFzcyBNYXRyaXg0SW52ZXJzZUNhY2hlIHtcbiAgLyoqXG4gICAqIFRoZSB0YXJnZXQgbWF0cml4LlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IG1hdHJpeDogVEhSRUUuTWF0cml4NDtcblxuICAvKipcbiAgICogQSBjYWNoZSBvZiBpbnZlcnNlIG9mIGN1cnJlbnQgbWF0cml4LlxuICAgKi9cbiAgcHJpdmF0ZSByZWFkb25seSBfaW52ZXJzZUNhY2hlID0gbmV3IFRIUkVFLk1hdHJpeDQoKTtcblxuICAvKipcbiAgICogQSBmbGFnIHRoYXQgbWFrZXMgaXQgd2FudCB0byByZWNhbGN1bGF0ZSBpdHMge0BsaW5rIF9pbnZlcnNlQ2FjaGV9LlxuICAgKiBXaWxsIGJlIHNldCBgdHJ1ZWAgd2hlbiBgZWxlbWVudHNgIGFyZSBtdXRhdGVkIGFuZCBiZSB1c2VkIGluIGBnZXRJbnZlcnNlYC5cbiAgICovXG4gIHByaXZhdGUgX3Nob3VsZFVwZGF0ZUludmVyc2UgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBUaGUgb3JpZ2luYWwgb2YgYG1hdHJpeC5lbGVtZW50c2BcbiAgICovXG4gIHByaXZhdGUgcmVhZG9ubHkgX29yaWdpbmFsRWxlbWVudHM6IG51bWJlcltdO1xuXG4gIC8qKlxuICAgKiBJbnZlcnNlIG9mIGdpdmVuIG1hdHJpeC5cbiAgICogTm90ZSB0aGF0IGl0IHdpbGwgcmV0dXJuIGl0cyBpbnRlcm5hbCBwcml2YXRlIGluc3RhbmNlLlxuICAgKiBNYWtlIHN1cmUgY29weWluZyB0aGlzIGJlZm9yZSBtdXRhdGUgdGhpcy5cbiAgICovXG4gIHB1YmxpYyBnZXQgaW52ZXJzZSgpOiBUSFJFRS5NYXRyaXg0IHtcbiAgICBpZiAodGhpcy5fc2hvdWxkVXBkYXRlSW52ZXJzZSkge1xuICAgICAgdGhpcy5faW52ZXJzZUNhY2hlLmNvcHkodGhpcy5tYXRyaXgpO1xuICAgICAgbWF0NEludmVydENvbXBhdCh0aGlzLl9pbnZlcnNlQ2FjaGUpO1xuICAgICAgdGhpcy5fc2hvdWxkVXBkYXRlSW52ZXJzZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9pbnZlcnNlQ2FjaGU7XG4gIH1cblxuICBwdWJsaWMgY29uc3RydWN0b3IobWF0cml4OiBUSFJFRS5NYXRyaXg0KSB7XG4gICAgdGhpcy5tYXRyaXggPSBtYXRyaXg7XG5cbiAgICBjb25zdCBoYW5kbGVyOiBQcm94eUhhbmRsZXI8bnVtYmVyW10+ID0ge1xuICAgICAgc2V0OiAob2JqLCBwcm9wOiBudW1iZXIsIG5ld1ZhbCkgPT4ge1xuICAgICAgICB0aGlzLl9zaG91bGRVcGRhdGVJbnZlcnNlID0gdHJ1ZTtcbiAgICAgICAgb2JqW3Byb3BdID0gbmV3VmFsO1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSxcbiAgICB9O1xuXG4gICAgdGhpcy5fb3JpZ2luYWxFbGVtZW50cyA9IG1hdHJpeC5lbGVtZW50cztcbiAgICBtYXRyaXguZWxlbWVudHMgPSBuZXcgUHJveHkobWF0cml4LmVsZW1lbnRzLCBoYW5kbGVyKTtcbiAgfVxuXG4gIHB1YmxpYyByZXZlcnQoKTogdm9pZCB7XG4gICAgdGhpcy5tYXRyaXguZWxlbWVudHMgPSB0aGlzLl9vcmlnaW5hbEVsZW1lbnRzO1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBNYXRyaXg0SW52ZXJzZUNhY2hlIH0gZnJvbSAnLi91dGlscy9NYXRyaXg0SW52ZXJzZUNhY2hlJztcblxuY29uc3QgX21hdFdvcmxkVG9Nb2RlbCA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBWUk1Ob2RlQ29uc3RyYWludCB7XG4gIHB1YmxpYyB3ZWlnaHQgPSAxLjA7XG5cbiAgcHVibGljIHJlYWRvbmx5IG9iamVjdDogVEhSRUUuT2JqZWN0M0Q7XG5cbiAgLyoqXG4gICAqIFdoZW4ge0BsaW5rIHNvdXJjZVNwYWNlfSAvIHtAbGluayBkZXN0aW5hdGlvblNwYWNlfSBpcyBtb2RlbCBzcGFjZSwgdGhlc2UgdHJhbnNmb3JtcyB3aWxsIGJlIGNhdWN1bGF0ZWQgcmVsYXRpdmVseSBmcm9tIHRoaXMgb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IG1vZGVsUm9vdDogVEhSRUUuT2JqZWN0M0Q7XG5cbiAgcHJvdGVjdGVkIF9zb3VyY2U/OiBUSFJFRS5PYmplY3QzRCB8IG51bGw7XG4gIHB1YmxpYyBnZXQgc291cmNlKCk6IFRIUkVFLk9iamVjdDNEIHwgbnVsbCB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX3NvdXJjZTtcbiAgfVxuXG4gIHB1YmxpYyBzb3VyY2VTcGFjZSA9ICdtb2RlbCc7XG4gIHB1YmxpYyBkZXN0aW5hdGlvblNwYWNlID0gJ21vZGVsJztcblxuICBwdWJsaWMgZ2V0IGRlcGVuZGVuY2llcygpOiBTZXQ8VEhSRUUuT2JqZWN0M0Q+IHtcbiAgICBjb25zdCBkZXBzID0gbmV3IFNldDxUSFJFRS5PYmplY3QzRD4oKTtcbiAgICB0aGlzLl9zb3VyY2UgJiYgZGVwcy5hZGQodGhpcy5fc291cmNlKTtcbiAgICBpZiAodGhpcy5kZXN0aW5hdGlvblNwYWNlID09PSAnbW9kZWwnICYmIHRoaXMub2JqZWN0LnBhcmVudCkge1xuICAgICAgZGVwcy5hZGQodGhpcy5vYmplY3QucGFyZW50KTtcbiAgICB9XG4gICAgcmV0dXJuIGRlcHM7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0XG4gICAqIEBwYXJhbSBtb2RlbFJvb3QgV2hlbiB7QGxpbmsgc291cmNlU3BhY2V9IC8ge0BsaW5rIGRlc3RpbmF0aW9uU3BhY2V9IGlzIG1vZGVsIHNwYWNlLCB0aGVzZSB0cmFuc2Zvcm1zIHdpbGwgYmUgY2F1Y3VsYXRlZCByZWxhdGl2ZWx5IGZyb20gdGhpcyBvYmplY3RcbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihvYmplY3Q6IFRIUkVFLk9iamVjdDNELCBtb2RlbFJvb3Q6IFRIUkVFLk9iamVjdDNEKSB7XG4gICAgdGhpcy5vYmplY3QgPSBvYmplY3Q7XG5cbiAgICB0aGlzLm1vZGVsUm9vdCA9IG1vZGVsUm9vdDtcbiAgfVxuXG4gIHB1YmxpYyBzZXRTb3VyY2Uoc291cmNlOiBUSFJFRS5PYmplY3QzRCB8IG51bGwpOiB2b2lkIHtcbiAgICB0aGlzLl9zb3VyY2UgPSBzb3VyY2U7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBvYmplY3QgbWF0cml4IG9mIHRoZSBwYXJlbnQsIGluIG1vZGVsIHNwYWNlLlxuICAgKiBAcGFyYW0gdGFyZ2V0IFRhcmdldCBtYXRyaXhcbiAgICovXG4gIHByb3RlY3RlZCBfZ2V0UGFyZW50TWF0cml4SW5Nb2RlbFNwYWNlPFQgZXh0ZW5kcyBUSFJFRS5NYXRyaXg0Pih0YXJnZXQ6IFQpOiBUIHtcbiAgICBpZiAoIXRoaXMub2JqZWN0LnBhcmVudCkge1xuICAgICAgdGFyZ2V0LmlkZW50aXR5KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub2JqZWN0LnBhcmVudC51cGRhdGVXb3JsZE1hdHJpeChmYWxzZSwgZmFsc2UpO1xuICAgICAgdGFyZ2V0LmNvcHkodGhpcy5vYmplY3QucGFyZW50Lm1hdHJpeFdvcmxkKTtcblxuICAgICAgdGhpcy5fZ2V0TWF0cml4V29ybGRUb01vZGVsKF9tYXRXb3JsZFRvTW9kZWwpO1xuICAgICAgdGFyZ2V0LnByZW11bHRpcGx5KF9tYXRXb3JsZFRvTW9kZWwpO1xuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBvYmplY3QgbWF0cml4IG9mIHRoZSBvYmplY3QsIHRha2luZyBkZXNpcmVkIG9iamVjdCBzcGFjZSBpbnRvIGFjY291bnQuXG4gICAqIEludGVuZGVkIHRvIGJlIHVzZWQgdG8gYWJzb3JiIGJldHdlZW4gZGlmZmVyZW50IHNwYWNlcy5cbiAgICogQHBhcmFtIHRhcmdldCBUYXJnZXQgbWF0cml4XG4gICAqL1xuICBwcm90ZWN0ZWQgX2dldERlc3RpbmF0aW9uTWF0cml4PFQgZXh0ZW5kcyBUSFJFRS5NYXRyaXg0Pih0YXJnZXQ6IFQpOiBUIHtcbiAgICBpZiAodGhpcy5kZXN0aW5hdGlvblNwYWNlID09PSAnbG9jYWwnKSB7XG4gICAgICB0aGlzLm9iamVjdC51cGRhdGVNYXRyaXgoKTtcbiAgICAgIHRhcmdldC5jb3B5KHRoaXMub2JqZWN0Lm1hdHJpeCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmRlc3RpbmF0aW9uU3BhY2UgPT09ICdtb2RlbCcpIHtcbiAgICAgIHRoaXMub2JqZWN0LnVwZGF0ZVdvcmxkTWF0cml4KGZhbHNlLCBmYWxzZSk7XG4gICAgICB0YXJnZXQuY29weSh0aGlzLm9iamVjdC5tYXRyaXhXb3JsZCk7XG5cbiAgICAgIHRoaXMuX2dldE1hdHJpeFdvcmxkVG9Nb2RlbChfbWF0V29ybGRUb01vZGVsKTtcbiAgICAgIHRhcmdldC5wcmVtdWx0aXBseShfbWF0V29ybGRUb01vZGVsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBWUk1Ob2RlQ29uc3RyYWludDogVW5rbm93biBkZXN0aW5hdGlvblNwYWNlICR7dGhpcy5kZXN0aW5hdGlvblNwYWNlfSBkZXRlY3RlZGApO1xuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBvYmplY3QgbWF0cml4IG9mIHRoZSBzb3VyY2UsIHRha2luZyBkZXNpcmVkIG9iamVjdCBzcGFjZSBpbnRvIGFjY291bnQuXG4gICAqIEludGVuZGVkIHRvIGJlIHVzZWQgdG8gYWJzb3JiIGJldHdlZW4gZGlmZmVyZW50IHNwYWNlcy5cbiAgICogQHBhcmFtIHRhcmdldCBUYXJnZXQgbWF0cml4XG4gICAqL1xuICBwcm90ZWN0ZWQgX2dldFNvdXJjZU1hdHJpeDxUIGV4dGVuZHMgVEhSRUUuTWF0cml4ND4odGFyZ2V0OiBUKTogVCB7XG4gICAgaWYgKCF0aGlzLl9zb3VyY2UpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlcmUgaXMgbm8gc291cmNlIHNwZWNpZmllZCcpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnNvdXJjZVNwYWNlID09PSAnbG9jYWwnKSB7XG4gICAgICB0aGlzLl9zb3VyY2UudXBkYXRlTWF0cml4KCk7XG4gICAgICB0YXJnZXQuY29weSh0aGlzLl9zb3VyY2UubWF0cml4KTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc291cmNlU3BhY2UgPT09ICdtb2RlbCcpIHtcbiAgICAgIHRoaXMuX3NvdXJjZS51cGRhdGVXb3JsZE1hdHJpeChmYWxzZSwgZmFsc2UpO1xuICAgICAgdGFyZ2V0LmNvcHkodGhpcy5fc291cmNlLm1hdHJpeFdvcmxkKTtcblxuICAgICAgdGhpcy5fZ2V0TWF0cml4V29ybGRUb01vZGVsKF9tYXRXb3JsZFRvTW9kZWwpO1xuICAgICAgdGFyZ2V0LnByZW11bHRpcGx5KF9tYXRXb3JsZFRvTW9kZWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFZSTU5vZGVDb25zdHJhaW50OiBVbmtub3duIHNvdXJjZVNwYWNlICR7dGhpcy5zb3VyY2VTcGFjZX0gZGV0ZWN0ZWRgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG1hdHJpeCB0aGF0IGNvbnZlcnRzIHdvcmxkIHNwYWNlIGludG8gbW9kZWwgc3BhY2UuXG4gICAqIEBwYXJhbSB0YXJnZXQgVGFyZ2V0IG1hdHJpeFxuICAgKi9cbiAgcHJpdmF0ZSBfZ2V0TWF0cml4V29ybGRUb01vZGVsPFQgZXh0ZW5kcyBUSFJFRS5NYXRyaXg0Pih0YXJnZXQ6IFQpOiBUIHtcbiAgICBsZXQgaW52ZXJzZUNhY2hlUHJveHkgPSB0aGlzLm1vZGVsUm9vdC51c2VyRGF0YS5pbnZlcnNlQ2FjaGVQcm94eSBhcyBNYXRyaXg0SW52ZXJzZUNhY2hlIHwgdW5kZWZpbmVkO1xuICAgIGlmICghaW52ZXJzZUNhY2hlUHJveHkpIHtcbiAgICAgIGludmVyc2VDYWNoZVByb3h5ID0gdGhpcy5tb2RlbFJvb3QudXNlckRhdGEuaW52ZXJzZUNhY2hlUHJveHkgPSBuZXcgTWF0cml4NEludmVyc2VDYWNoZSh0aGlzLm1vZGVsUm9vdC5tYXRyaXgpO1xuICAgIH1cblxuICAgIHRhcmdldC5jb3B5KGludmVyc2VDYWNoZVByb3h5LmludmVyc2UpO1xuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICBwdWJsaWMgYWJzdHJhY3Qgc2V0SW5pdFN0YXRlKCk6IHZvaWQ7XG4gIHB1YmxpYyBhYnN0cmFjdCB1cGRhdGUoKTogdm9pZDtcbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IGRlY29tcG9zZVBvc2l0aW9uIH0gZnJvbSAnLi91dGlscy9kZWNvbXBvc2VQb3NpdGlvbic7XG5pbXBvcnQgeyBkZWNvbXBvc2VSb3RhdGlvbiB9IGZyb20gJy4vdXRpbHMvZGVjb21wb3NlUm90YXRpb24nO1xuaW1wb3J0IHsgcXVhdEludmVydENvbXBhdCB9IGZyb20gJy4vdXRpbHMvcXVhdEludmVydENvbXBhdCc7XG5pbXBvcnQgeyBzZXRBaW1RdWF0ZXJuaW9uIH0gZnJvbSAnLi91dGlscy9zZXRBaW1RdWF0ZXJuaW9uJztcbmltcG9ydCB7IFZSTU5vZGVDb25zdHJhaW50IH0gZnJvbSAnLi9WUk1Ob2RlQ29uc3RyYWludCc7XG5cbmNvbnN0IFFVQVRfSURFTlRJVFkgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigwLCAwLCAwLCAxKTtcblxuY29uc3QgX3F1YXRBID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbmNvbnN0IF9xdWF0QiA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5jb25zdCBfbWF0QSA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG5jb25zdCBfdjNHZXRSb3RhdGlvblBvcyA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfdjNHZXRSb3RhdGlvbkRpciA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbmV4cG9ydCBjbGFzcyBWUk1BaW1Db25zdHJhaW50IGV4dGVuZHMgVlJNTm9kZUNvbnN0cmFpbnQge1xuICAvKipcbiAgICogUmVwcmVzZW50cyB0aGUgYWltIHZlY3RvciB1c2VkIGZvciByZWZlcmVuY2Ugb2YgYWltIHJvdGF0aW9uLlxuICAgKiBJdCBtdXN0IGJlIG5vcm1hbGl6ZWQuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgYWltVmVjdG9yID0gbmV3IFRIUkVFLlZlY3RvcjMoMC4wLCAwLjAsIDEuMCk7XG5cbiAgLyoqXG4gICAqIFJlcHJlc2VudHMgdGhlIHVwIHZlY3RvciB1c2VkIGZvciBjYWxjdWxhdGlvbiBvZiBhaW0gcm90YXRpb24uXG4gICAqIEl0IG11c3QgYmUgbm9ybWFsaXplZC5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSB1cFZlY3RvciA9IG5ldyBUSFJFRS5WZWN0b3IzKDAuMCwgMS4wLCAwLjApO1xuXG4gIHB1YmxpYyBmcmVlemVBeGVzOiBbYm9vbGVhbiwgYm9vbGVhbl0gPSBbdHJ1ZSwgdHJ1ZV07XG5cbiAgcHJpdmF0ZSByZWFkb25seSBfcXVhdEluaXRBaW0gPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuICBwcml2YXRlIHJlYWRvbmx5IF9xdWF0SW52SW5pdEFpbSA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG4gIHByaXZhdGUgcmVhZG9ubHkgX3F1YXRJbml0RHN0ID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblxuICBwdWJsaWMgc2V0SW5pdFN0YXRlKCk6IHZvaWQge1xuICAgIHRoaXMuX2dldERlc3RpbmF0aW9uTWF0cml4KF9tYXRBKTtcbiAgICBkZWNvbXBvc2VSb3RhdGlvbihfbWF0QSwgdGhpcy5fcXVhdEluaXREc3QpO1xuXG4gICAgdGhpcy5fZ2V0QWltUXVhdCh0aGlzLl9xdWF0SW5pdEFpbSk7XG4gICAgcXVhdEludmVydENvbXBhdCh0aGlzLl9xdWF0SW52SW5pdEFpbS5jb3B5KHRoaXMuX3F1YXRJbml0QWltKSk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRlc3RpbmF0aW9uU3BhY2UgPT09ICdsb2NhbCcpIHtcbiAgICAgIC8vIHJlc2V0IHJvdGF0aW9uXG4gICAgICB0aGlzLm9iamVjdC5xdWF0ZXJuaW9uLmNvcHkoUVVBVF9JREVOVElUWSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGJhY2sgdG8gdGhlIGluaXRpYWwgcm90YXRpb24gaW4gd29ybGQgc3BhY2VcbiAgICAgIHRoaXMuX2dldFBhcmVudE1hdHJpeEluTW9kZWxTcGFjZShfbWF0QSk7XG4gICAgICBkZWNvbXBvc2VSb3RhdGlvbihfbWF0QSwgX3F1YXRBKTtcbiAgICAgIHF1YXRJbnZlcnRDb21wYXQodGhpcy5vYmplY3QucXVhdGVybmlvbi5jb3B5KF9xdWF0QSkpO1xuICAgIH1cblxuICAgIC8vIGFpbSB0b3dhcmQgdGhlIHRhcmdldFxuICAgIHRoaXMuX2dldEFpbURpZmZRdWF0KF9xdWF0Qik7XG4gICAgdGhpcy5vYmplY3QucXVhdGVybmlvbi5tdWx0aXBseShfcXVhdEIpO1xuXG4gICAgLy8gYXBwbHkgdGhlIGluaXRpYWwgcm90YXRpb25cbiAgICB0aGlzLm9iamVjdC5xdWF0ZXJuaW9uLm11bHRpcGx5KHRoaXMuX3F1YXRJbml0RHN0KTtcblxuICAgIC8vIGRvbmVcbiAgICB0aGlzLm9iamVjdC51cGRhdGVNYXRyaXgoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYSBxdWF0ZXJuaW9uIHRoYXQgcmVwcmVzZW50cyBhIGRpZmYgZnJvbSB0aGUgaW5pdGlhbCAtPiBjdXJyZW50IG9yaWVudGF0aW9uIG9mIHRoZSBhaW0gZGlyZWN0aW9uLlxuICAgKiBJdCdzIGF3YXJlIG9mIGl0cyB7QGxpbmsgc291cmNlU3BhY2V9LCB7QGxpbmsgZnJlZXplQXhlc30sIGFuZCB7QGxpbmsgd2VpZ2h0fS5cbiAgICogQHBhcmFtIHRhcmdldCBUYXJnZXQgcXVhdGVybmlvblxuICAgKi9cbiAgcHJpdmF0ZSBfZ2V0QWltRGlmZlF1YXQ8VCBleHRlbmRzIFRIUkVFLlF1YXRlcm5pb24+KHRhcmdldDogVCk6IFQge1xuICAgIHRoaXMuX2dldEFpbVF1YXQodGFyZ2V0KTtcbiAgICB0YXJnZXQubXVsdGlwbHkodGhpcy5fcXVhdEludkluaXRBaW0pO1xuXG4gICAgdGFyZ2V0LnNsZXJwKFFVQVRfSURFTlRJVFksIDEuMCAtIHRoaXMud2VpZ2h0KTtcblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGEgY3VycmVudCBvcmllbnRhdGlvbiBvZiB0aGUgYWltIGRpcmVjdGlvbi5cbiAgICogSXQncyBhd2FyZSBvZiBpdHMge0BsaW5rIHNvdXJjZVNwYWNlfSBhbmQge0BsaW5rIGZyZWV6ZUF4ZXN9LlxuICAgKiBAcGFyYW0gdGFyZ2V0IFRhcmdldCBxdWF0ZXJuaW9uXG4gICAqL1xuICBwcml2YXRlIF9nZXRBaW1RdWF0PFQgZXh0ZW5kcyBUSFJFRS5RdWF0ZXJuaW9uPih0YXJnZXQ6IFQpOiBUIHtcbiAgICByZXR1cm4gc2V0QWltUXVhdGVybmlvbihcbiAgICAgIHRhcmdldCxcbiAgICAgIHRoaXMuX2dldERlc3RpbmF0aW9uUG9zaXRpb24oX3YzR2V0Um90YXRpb25Qb3MpLFxuICAgICAgdGhpcy5fZ2V0U291cmNlUG9zaXRpb24oX3YzR2V0Um90YXRpb25EaXIpLFxuICAgICAgdGhpcy5haW1WZWN0b3IsXG4gICAgICB0aGlzLnVwVmVjdG9yLFxuICAgICAgdGhpcy5mcmVlemVBeGVzLFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBjdXJyZW50IHBvc2l0aW9uIG9mIHRoZSBvYmplY3QuXG4gICAqIEl0J3MgYXdhcmUgb2YgaXRzIHtAbGluayBzb3VyY2VTcGFjZX0uXG4gICAqIEBwYXJhbSB0YXJnZXQgVGFyZ2V0IHF1YXRlcm5pb25cbiAgICovXG4gIHByaXZhdGUgX2dldERlc3RpbmF0aW9uUG9zaXRpb248VCBleHRlbmRzIFRIUkVFLlZlY3RvcjM+KHRhcmdldDogVCk6IFQge1xuICAgIHRhcmdldC5zZXQoMC4wLCAwLjAsIDAuMCk7XG5cbiAgICB0aGlzLl9nZXREZXN0aW5hdGlvbk1hdHJpeChfbWF0QSk7XG4gICAgZGVjb21wb3NlUG9zaXRpb24oX21hdEEsIHRhcmdldCk7XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgY3VycmVudCBwb3NpdGlvbiBvZiB0aGUgc291cmNlLlxuICAgKiBJdCdzIGF3YXJlIG9mIGl0cyB7QGxpbmsgc291cmNlU3BhY2V9LlxuICAgKiBAcGFyYW0gdGFyZ2V0IFRhcmdldCBxdWF0ZXJuaW9uXG4gICAqL1xuICBwcml2YXRlIF9nZXRTb3VyY2VQb3NpdGlvbjxUIGV4dGVuZHMgVEhSRUUuVmVjdG9yMz4odGFyZ2V0OiBUKTogVCB7XG4gICAgdGFyZ2V0LnNldCgwLjAsIDAuMCwgMC4wKTtcblxuICAgIGlmICh0aGlzLl9zb3VyY2UpIHtcbiAgICAgIHRoaXMuX2dldFNvdXJjZU1hdHJpeChfbWF0QSk7XG4gICAgICBkZWNvbXBvc2VQb3NpdGlvbihfbWF0QSwgdGFyZ2V0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG59XG4iLCIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXHJcblxyXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxyXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcclxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cclxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcclxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2NyZWF0ZUJpbmRpbmcgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH0pO1xyXG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIG8pIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCkpIF9fY3JlYXRlQmluZGluZyhvLCBtLCBwKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcclxuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgIHJldHVybiByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheSh0bywgZnJvbSkge1xyXG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gZnJvbS5sZW5ndGgsIGogPSB0by5sZW5ndGg7IGkgPCBpbDsgaSsrLCBqKyspXHJcbiAgICAgICAgdG9bal0gPSBmcm9tW2ldO1xyXG4gICAgcmV0dXJuIHRvO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XHJcbn0pIDogZnVuY3Rpb24obywgdikge1xyXG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XHJcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHJlY2VpdmVyLCBwcml2YXRlTWFwKSB7XHJcbiAgICBpZiAoIXByaXZhdGVNYXAuaGFzKHJlY2VpdmVyKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJhdHRlbXB0ZWQgdG8gZ2V0IHByaXZhdGUgZmllbGQgb24gbm9uLWluc3RhbmNlXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHByaXZhdGVNYXAuZ2V0KHJlY2VpdmVyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRTZXQocmVjZWl2ZXIsIHByaXZhdGVNYXAsIHZhbHVlKSB7XHJcbiAgICBpZiAoIXByaXZhdGVNYXAuaGFzKHJlY2VpdmVyKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJhdHRlbXB0ZWQgdG8gc2V0IHByaXZhdGUgZmllbGQgb24gbm9uLWluc3RhbmNlXCIpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZU1hcC5zZXQocmVjZWl2ZXIsIHZhbHVlKTtcclxuICAgIHJldHVybiB2YWx1ZTtcclxufVxyXG4iLCJpbXBvcnQgdHlwZSAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuZXhwb3J0IGZ1bmN0aW9uIHRyYXZlcnNlQW5jZXN0b3JzRnJvbVJvb3Qob2JqZWN0OiBUSFJFRS5PYmplY3QzRCwgY2FsbGJhY2s6IChvYmplY3Q6IFRIUkVFLk9iamVjdDNEKSA9PiB2b2lkKTogdm9pZCB7XG4gIGNvbnN0IGFuY2VzdG9yczogVEhSRUUuT2JqZWN0M0RbXSA9IFtdO1xuXG4gIGxldCBoZWFkOiBUSFJFRS5PYmplY3QzRCB8IG51bGwgPSBvYmplY3Q7XG4gIHdoaWxlIChoZWFkICE9PSBudWxsKSB7XG4gICAgYW5jZXN0b3JzLnVuc2hpZnQoaGVhZCk7XG4gICAgaGVhZCA9IGhlYWQucGFyZW50O1xuICB9XG5cbiAgYW5jZXN0b3JzLmZvckVhY2goKGFuY2VzdG9yKSA9PiB7XG4gICAgY2FsbGJhY2soYW5jZXN0b3IpO1xuICB9KTtcbn1cbiIsImltcG9ydCB0eXBlICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHR5cGUgeyBWUk1Ob2RlQ29uc3RyYWludCB9IGZyb20gJy4vVlJNTm9kZUNvbnN0cmFpbnQnO1xuaW1wb3J0IHsgdHJhdmVyc2VBbmNlc3RvcnNGcm9tUm9vdCB9IGZyb20gJy4vdXRpbHMvdHJhdmVyc2VBbmNlc3RvcnNGcm9tUm9vdCc7XG5cbmV4cG9ydCBjbGFzcyBWUk1Ob2RlQ29uc3RyYWludE1hbmFnZXIge1xuICBwcml2YXRlIF9jb25zdHJhaW50cyA9IG5ldyBTZXQ8VlJNTm9kZUNvbnN0cmFpbnQ+KCk7XG4gIHB1YmxpYyBnZXQgY29uc3RyYWludHMoKTogU2V0PFZSTU5vZGVDb25zdHJhaW50PiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnN0cmFpbnRzO1xuICB9XG5cbiAgcHJpdmF0ZSBfb2JqZWN0Q29uc3RyYWludHNNYXAgPSBuZXcgTWFwPFRIUkVFLk9iamVjdDNELCBTZXQ8VlJNTm9kZUNvbnN0cmFpbnQ+PigpO1xuXG4gIHB1YmxpYyBhZGRDb25zdHJhaW50KGNvbnN0cmFpbnQ6IFZSTU5vZGVDb25zdHJhaW50KTogdm9pZCB7XG4gICAgdGhpcy5fY29uc3RyYWludHMuYWRkKGNvbnN0cmFpbnQpO1xuXG4gICAgbGV0IG9iamVjdFNldCA9IHRoaXMuX29iamVjdENvbnN0cmFpbnRzTWFwLmdldChjb25zdHJhaW50Lm9iamVjdCk7XG4gICAgaWYgKG9iamVjdFNldCA9PSBudWxsKSB7XG4gICAgICBvYmplY3RTZXQgPSBuZXcgU2V0PFZSTU5vZGVDb25zdHJhaW50PigpO1xuICAgICAgdGhpcy5fb2JqZWN0Q29uc3RyYWludHNNYXAuc2V0KGNvbnN0cmFpbnQub2JqZWN0LCBvYmplY3RTZXQpO1xuICAgIH1cbiAgICBvYmplY3RTZXQuYWRkKGNvbnN0cmFpbnQpO1xuICB9XG5cbiAgcHVibGljIGRlbGV0ZUNvbnN0cmFpbnQoY29uc3RyYWludDogVlJNTm9kZUNvbnN0cmFpbnQpOiB2b2lkIHtcbiAgICB0aGlzLl9jb25zdHJhaW50cy5kZWxldGUoY29uc3RyYWludCk7XG5cbiAgICBjb25zdCBvYmplY3RTZXQgPSB0aGlzLl9vYmplY3RDb25zdHJhaW50c01hcC5nZXQoY29uc3RyYWludC5vYmplY3QpITtcbiAgICBvYmplY3RTZXQuZGVsZXRlKGNvbnN0cmFpbnQpO1xuICB9XG5cbiAgcHVibGljIHNldEluaXRTdGF0ZSgpOiB2b2lkIHtcbiAgICBjb25zdCBjb25zdHJhaW50c1RyaWVkID0gbmV3IFNldDxWUk1Ob2RlQ29uc3RyYWludD4oKTtcbiAgICBjb25zdCBjb25zdHJhaW50c0RvbmUgPSBuZXcgU2V0PFZSTU5vZGVDb25zdHJhaW50PigpO1xuXG4gICAgZm9yIChjb25zdCBjb25zdHJhaW50IG9mIHRoaXMuX2NvbnN0cmFpbnRzKSB7XG4gICAgICB0aGlzLl9wcm9jZXNzQ29uc3RyYWludChjb25zdHJhaW50LCBjb25zdHJhaW50c1RyaWVkLCBjb25zdHJhaW50c0RvbmUsIChjb25zdHJhaW50KSA9PiBjb25zdHJhaW50LnNldEluaXRTdGF0ZSgpKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIGNvbnN0IGNvbnN0cmFpbnRzVHJpZWQgPSBuZXcgU2V0PFZSTU5vZGVDb25zdHJhaW50PigpO1xuICAgIGNvbnN0IGNvbnN0cmFpbnRzRG9uZSA9IG5ldyBTZXQ8VlJNTm9kZUNvbnN0cmFpbnQ+KCk7XG5cbiAgICBmb3IgKGNvbnN0IGNvbnN0cmFpbnQgb2YgdGhpcy5fY29uc3RyYWludHMpIHtcbiAgICAgIHRoaXMuX3Byb2Nlc3NDb25zdHJhaW50KGNvbnN0cmFpbnQsIGNvbnN0cmFpbnRzVHJpZWQsIGNvbnN0cmFpbnRzRG9uZSwgKGNvbnN0cmFpbnQpID0+IGNvbnN0cmFpbnQudXBkYXRlKCkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgYSBjb25zdHJhaW50LlxuICAgKiBJZiB0aGVyZSBhcmUgb3RoZXIgY29uc3RyYWludHMgdGhhdCBhcmUgZGVwZW5kYW50LCBpdCB3aWxsIHRyeSB0byB1cGRhdGUgdGhlbSByZWN1cnNpdmVseS5cbiAgICogSXQgbWlnaHQgdGhyb3cgYW4gZXJyb3IgaWYgdGhlcmUgYXJlIGNpcmN1bGFyIGRlcGVuZGVuY2llcy5cbiAgICpcbiAgICogSW50ZW5kZWQgdG8gYmUgdXNlZCBpbiB7QGxpbmsgdXBkYXRlfSBhbmQge0BsaW5rIF9wcm9jZXNzQ29uc3RyYWludH0gaXRzZWxmIHJlY3Vyc2l2ZWx5LlxuICAgKlxuICAgKiBAcGFyYW0gY29uc3RyYWludCBBIGNvbnN0cmFpbnQgeW91IHdhbnQgdG8gdXBkYXRlXG4gICAqIEBwYXJhbSBjb25zdHJhaW50c1RyaWVkIFNldCBvZiBjb25zdHJhaW50cyB0aGF0IGFyZSBhbHJlYWR5IHRyaWVkIHRvIGJlIHVwZGF0ZWRcbiAgICogQHBhcmFtIGNvbnN0cmFpbnRzRG9uZSBTZXQgb2YgY29uc3RyYWludHMgdGhhdCBhcmUgYWxyZWFkeSB1cCB0byBkYXRlXG4gICAqL1xuICBwcml2YXRlIF9wcm9jZXNzQ29uc3RyYWludChcbiAgICBjb25zdHJhaW50OiBWUk1Ob2RlQ29uc3RyYWludCxcbiAgICBjb25zdHJhaW50c1RyaWVkOiBTZXQ8VlJNTm9kZUNvbnN0cmFpbnQ+LFxuICAgIGNvbnN0cmFpbnRzRG9uZTogU2V0PFZSTU5vZGVDb25zdHJhaW50PixcbiAgICBjYWxsYmFjazogKGNvbnN0cmFpbnQ6IFZSTU5vZGVDb25zdHJhaW50KSA9PiB2b2lkLFxuICApOiB2b2lkIHtcbiAgICBpZiAoY29uc3RyYWludHNEb25lLmhhcyhjb25zdHJhaW50KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChjb25zdHJhaW50c1RyaWVkLmhhcyhjb25zdHJhaW50KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdWUk1Db25zdHJhaW50TWFuYWdlcjogQ2lyY3VsYXIgZGVwZW5kZW5jeSBkZXRlY3RlZCB3aGlsZSB1cGRhdGluZyBjb25zdHJhaW50cycpO1xuICAgIH1cbiAgICBjb25zdHJhaW50c1RyaWVkLmFkZChjb25zdHJhaW50KTtcblxuICAgIGNvbnN0IGRlcE9iamVjdHMgPSBjb25zdHJhaW50LmRlcGVuZGVuY2llcztcbiAgICBmb3IgKGNvbnN0IGRlcE9iamVjdCBvZiBkZXBPYmplY3RzKSB7XG4gICAgICB0cmF2ZXJzZUFuY2VzdG9yc0Zyb21Sb290KGRlcE9iamVjdCwgKGRlcE9iamVjdEFuY2VzdG9yKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iamVjdFNldCA9IHRoaXMuX29iamVjdENvbnN0cmFpbnRzTWFwLmdldChkZXBPYmplY3RBbmNlc3Rvcik7XG4gICAgICAgIGlmIChvYmplY3RTZXQpIHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGRlcENvbnN0cmFpbnQgb2Ygb2JqZWN0U2V0KSB7XG4gICAgICAgICAgICB0aGlzLl9wcm9jZXNzQ29uc3RyYWludChkZXBDb25zdHJhaW50LCBjb25zdHJhaW50c1RyaWVkLCBjb25zdHJhaW50c0RvbmUsIGNhbGxiYWNrKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNhbGxiYWNrKGNvbnN0cmFpbnQpO1xuXG4gICAgY29uc3RyYWludHNEb25lLmFkZChjb25zdHJhaW50KTtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG5leHBvcnQgZnVuY3Rpb24gdmVjdG9yM0ZyZWV6ZUF4ZXM8VCBleHRlbmRzIFRIUkVFLlZlY3RvcjM+KHRhcmdldDogVCwgZnJlZXplOiBbYm9vbGVhbiwgYm9vbGVhbiwgYm9vbGVhbl0pOiBUIHtcbiAgaWYgKGZyZWV6ZVswXSAmJiBmcmVlemVbMV0gJiYgZnJlZXplWzJdKSB7XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuICBpZiAoIWZyZWV6ZVswXSAmJiAhZnJlZXplWzFdICYmICFmcmVlemVbMl0pIHtcbiAgICByZXR1cm4gdGFyZ2V0LnNldCgwLjAsIDAuMCwgMC4wKTtcbiAgfVxuXG4gIGlmICghZnJlZXplWzBdKSB7XG4gICAgdGFyZ2V0LnggKj0gMC4wO1xuICB9XG4gIGlmICghZnJlZXplWzFdKSB7XG4gICAgdGFyZ2V0LnkgKj0gMC4wO1xuICB9XG4gIGlmICghZnJlZXplWzJdKSB7XG4gICAgdGFyZ2V0LnogKj0gMC4wO1xuICB9XG4gIHJldHVybiB0YXJnZXQ7XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBkZWNvbXBvc2VQb3NpdGlvbiB9IGZyb20gJy4vdXRpbHMvZGVjb21wb3NlUG9zaXRpb24nO1xuaW1wb3J0IHsgbWF0NEludmVydENvbXBhdCB9IGZyb20gJy4vdXRpbHMvbWF0NEludmVydENvbXBhdCc7XG5pbXBvcnQgeyB2ZWN0b3IzRnJlZXplQXhlcyB9IGZyb20gJy4vdXRpbHMvdmVjdG9yM0ZyZWV6ZUF4ZXMnO1xuaW1wb3J0IHsgVlJNTm9kZUNvbnN0cmFpbnQgfSBmcm9tICcuL1ZSTU5vZGVDb25zdHJhaW50JztcblxuY29uc3QgX21hdEEgPSBuZXcgVEhSRUUuTWF0cml4NCgpO1xuXG5leHBvcnQgY2xhc3MgVlJNUG9zaXRpb25Db25zdHJhaW50IGV4dGVuZHMgVlJNTm9kZUNvbnN0cmFpbnQge1xuICBwdWJsaWMgZnJlZXplQXhlczogW2Jvb2xlYW4sIGJvb2xlYW4sIGJvb2xlYW5dID0gW3RydWUsIHRydWUsIHRydWVdO1xuXG4gIHByaXZhdGUgX3YzSW5pdERzdCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG4gIHByaXZhdGUgX3YzSW5pdFNyYyA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbiAgcHVibGljIHNldEluaXRTdGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLl92M0luaXREc3QuY29weSh0aGlzLm9iamVjdC5wb3NpdGlvbik7XG5cbiAgICB0aGlzLl9nZXRTb3VyY2VQb3NpdGlvbih0aGlzLl92M0luaXRTcmMpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9nZXRTb3VyY2VEaWZmUG9zaXRpb24odGhpcy5vYmplY3QucG9zaXRpb24pO1xuXG4gICAgaWYgKHRoaXMuZGVzdGluYXRpb25TcGFjZSA9PT0gJ21vZGVsJykge1xuICAgICAgbWF0NEludmVydENvbXBhdCh0aGlzLl9nZXRQYXJlbnRNYXRyaXhJbk1vZGVsU3BhY2UoX21hdEEpKTtcblxuICAgICAgLy8gcmVtb3ZlIHRyYW5zbGF0aW9uXG4gICAgICBfbWF0QS5lbGVtZW50c1sxMl0gPSAwO1xuICAgICAgX21hdEEuZWxlbWVudHNbMTNdID0gMDtcbiAgICAgIF9tYXRBLmVsZW1lbnRzWzE0XSA9IDA7XG5cbiAgICAgIHRoaXMub2JqZWN0LnBvc2l0aW9uLmFwcGx5TWF0cml4NChfbWF0QSk7XG4gICAgfVxuXG4gICAgdGhpcy5vYmplY3QucG9zaXRpb24uYWRkKHRoaXMuX3YzSW5pdERzdCk7XG5cbiAgICB0aGlzLm9iamVjdC51cGRhdGVNYXRyaXgoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYSB2ZWN0b3IgdGhhdCByZXByZXNlbnRzIGEgZGlmZiBmcm9tIHRoZSBpbml0aWFsIC0+IGN1cnJlbnQgcG9zaXRpb24gb2YgdGhlIHNvdXJjZS5cbiAgICogSXQncyBhd2FyZSBvZiBpdHMge0BsaW5rIHNvdXJjZVNwYWNlfSwge0BsaW5rIGZyZWV6ZUF4ZXN9LCBhbmQge0BsaW5rIHdlaWdodH0uXG4gICAqIEBwYXJhbSB0YXJnZXQgVGFyZ2V0IHF1YXRlcm5pb25cbiAgICovXG4gIHByaXZhdGUgX2dldFNvdXJjZURpZmZQb3NpdGlvbjxUIGV4dGVuZHMgVEhSRUUuVmVjdG9yMz4odGFyZ2V0OiBUKTogVCB7XG4gICAgdGhpcy5fZ2V0U291cmNlUG9zaXRpb24odGFyZ2V0KTtcbiAgICB0YXJnZXQuc3ViKHRoaXMuX3YzSW5pdFNyYyk7XG5cbiAgICB2ZWN0b3IzRnJlZXplQXhlcyh0YXJnZXQsIHRoaXMuZnJlZXplQXhlcyk7XG5cbiAgICB0YXJnZXQubXVsdGlwbHlTY2FsYXIodGhpcy53ZWlnaHQpO1xuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGN1cnJlbnQgcG9zaXRpb24gb2YgdGhlIHNvdXJjZS5cbiAgICogSXQncyBhd2FyZSBvZiBpdHMge0BsaW5rIHNvdXJjZVNwYWNlfS5cbiAgICogQHBhcmFtIHRhcmdldCBUYXJnZXQgcXVhdGVybmlvblxuICAgKi9cbiAgcHJpdmF0ZSBfZ2V0U291cmNlUG9zaXRpb248VCBleHRlbmRzIFRIUkVFLlZlY3RvcjM+KHRhcmdldDogVCk6IFQge1xuICAgIHRhcmdldC5zZXQoMC4wLCAwLjAsIDAuMCk7XG5cbiAgICBpZiAodGhpcy5fc291cmNlKSB7XG4gICAgICB0aGlzLl9nZXRTb3VyY2VNYXRyaXgoX21hdEEpO1xuICAgICAgZGVjb21wb3NlUG9zaXRpb24oX21hdEEsIHRhcmdldCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG5jb25zdCBRVUFUX0lERU5USVRZID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oMCwgMCwgMCwgMSk7XG5cbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4vKipcbiAqIENvbXB1dGUgYW4gZXhwb25lbnRpYWwgb2YgYSBxdWF0ZXJuaW9uLiBEZXN0cnVjdGl2ZS5cbiAqIEBwYXJhbSB0YXJnZXQgQSBxdWF0ZXJuaW9uLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcXVhdEV4cDxUIGV4dGVuZHMgVEhSRUUuUXVhdGVybmlvbj4odGFyZ2V0OiBUKTogVCB7XG4gIF92M0Euc2V0KHRhcmdldC54LCB0YXJnZXQueSwgdGFyZ2V0LnopO1xuICBjb25zdCB2Tm9ybSA9IF92M0EubGVuZ3RoKCk7XG5cbiAgY29uc3QgbSA9IE1hdGguZXhwKHRhcmdldC53KTtcbiAgY29uc3QgcyA9IHZOb3JtIDwgTnVtYmVyLkVQU0lMT04gPyAwLjAgOiAobSAqIE1hdGguc2luKHZOb3JtKSkgLyB2Tm9ybTtcblxuICB0YXJnZXQuc2V0KHMgKiB0YXJnZXQueCwgcyAqIHRhcmdldC55LCBzICogdGFyZ2V0LnosIG0gKiBNYXRoLmNvcyh2Tm9ybSkpO1xuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbi8qKlxuICogQ29tcHV0ZSBhIGxvZ2FyaXRobSBvZiBhIHF1YXRlcm5pb24uIERlc3RydWN0aXZlLlxuICogQHBhcmFtIHRhcmdldCBBIHF1YXRlcm5pb24uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBxdWF0TG9nPFQgZXh0ZW5kcyBUSFJFRS5RdWF0ZXJuaW9uPih0YXJnZXQ6IFQpOiBUIHtcbiAgX3YzQS5zZXQodGFyZ2V0LngsIHRhcmdldC55LCB0YXJnZXQueik7XG4gIGNvbnN0IHZOb3JtID0gX3YzQS5sZW5ndGgoKTtcblxuICBjb25zdCB0ID0gdk5vcm0gPCBOdW1iZXIuRVBTSUxPTiA/IDAuMCA6IE1hdGguYXRhbjIodk5vcm0sIHRhcmdldC53KSAvIHZOb3JtO1xuXG4gIHRhcmdldC5zZXQodCAqIHRhcmdldC54LCB0ICogdGFyZ2V0LnksIHQgKiB0YXJnZXQueiwgMC41ICogTWF0aC5sb2codGFyZ2V0Lmxlbmd0aFNxKCkpKTtcblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcXVhdGVybmlvbkZyZWV6ZUF4ZXM8VCBleHRlbmRzIFRIUkVFLlF1YXRlcm5pb24+KHRhcmdldDogVCwgZnJlZXplOiBbYm9vbGVhbiwgYm9vbGVhbiwgYm9vbGVhbl0pOiBUIHtcbiAgaWYgKGZyZWV6ZVswXSAmJiBmcmVlemVbMV0gJiYgZnJlZXplWzJdKSB7XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuICBpZiAoIWZyZWV6ZVswXSAmJiAhZnJlZXplWzFdICYmICFmcmVlemVbMl0pIHtcbiAgICByZXR1cm4gdGFyZ2V0LmNvcHkoUVVBVF9JREVOVElUWSk7XG4gIH1cblxuICBxdWF0TG9nKHRhcmdldCk7XG5cbiAgaWYgKCFmcmVlemVbMF0pIHtcbiAgICB0YXJnZXQueCAqPSAwLjA7XG4gIH1cbiAgaWYgKCFmcmVlemVbMV0pIHtcbiAgICB0YXJnZXQueSAqPSAwLjA7XG4gIH1cbiAgaWYgKCFmcmVlemVbMl0pIHtcbiAgICB0YXJnZXQueiAqPSAwLjA7XG4gIH1cblxuICByZXR1cm4gcXVhdEV4cCh0YXJnZXQpO1xufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgZGVjb21wb3NlUm90YXRpb24gfSBmcm9tICcuL3V0aWxzL2RlY29tcG9zZVJvdGF0aW9uJztcbmltcG9ydCB7IHF1YXRlcm5pb25GcmVlemVBeGVzIH0gZnJvbSAnLi91dGlscy9xdWF0ZXJuaW9uRnJlZXplQXhlcyc7XG5pbXBvcnQgeyBxdWF0SW52ZXJ0Q29tcGF0IH0gZnJvbSAnLi91dGlscy9xdWF0SW52ZXJ0Q29tcGF0JztcbmltcG9ydCB7IFZSTU5vZGVDb25zdHJhaW50IH0gZnJvbSAnLi9WUk1Ob2RlQ29uc3RyYWludCc7XG5cbmNvbnN0IFFVQVRfSURFTlRJVFkgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigwLCAwLCAwLCAxKTtcblxuY29uc3QgX21hdEEgPSBuZXcgVEhSRUUuTWF0cml4NCgpO1xuY29uc3QgX3F1YXRBID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbmNvbnN0IF9xdWF0QiA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5cbmV4cG9ydCBjbGFzcyBWUk1Sb3RhdGlvbkNvbnN0cmFpbnQgZXh0ZW5kcyBWUk1Ob2RlQ29uc3RyYWludCB7XG4gIHB1YmxpYyBmcmVlemVBeGVzOiBbYm9vbGVhbiwgYm9vbGVhbiwgYm9vbGVhbl0gPSBbdHJ1ZSwgdHJ1ZSwgdHJ1ZV07XG5cbiAgcHJpdmF0ZSBfcXVhdEluaXRTcmMgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuICBwcml2YXRlIF9xdWF0SW52SW5pdFNyYyA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG4gIHByaXZhdGUgX3F1YXRJbml0RHN0ID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblxuICBwdWJsaWMgc2V0SW5pdFN0YXRlKCk6IHZvaWQge1xuICAgIHRoaXMuX3F1YXRJbml0RHN0LmNvcHkodGhpcy5vYmplY3QucXVhdGVybmlvbik7XG5cbiAgICB0aGlzLl9nZXRTb3VyY2VRdWF0KHRoaXMuX3F1YXRJbml0U3JjKTtcbiAgICBxdWF0SW52ZXJ0Q29tcGF0KHRoaXMuX3F1YXRJbnZJbml0U3JjLmNvcHkodGhpcy5fcXVhdEluaXRTcmMpKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGVzdGluYXRpb25TcGFjZSA9PT0gJ2xvY2FsJykge1xuICAgICAgdGhpcy5vYmplY3QucXVhdGVybmlvbi5jb3B5KHRoaXMuX3F1YXRJbml0RHN0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZ2V0UGFyZW50TWF0cml4SW5Nb2RlbFNwYWNlKF9tYXRBKTtcbiAgICAgIGRlY29tcG9zZVJvdGF0aW9uKF9tYXRBLCBfcXVhdEEpO1xuICAgICAgcXVhdEludmVydENvbXBhdCh0aGlzLm9iamVjdC5xdWF0ZXJuaW9uLmNvcHkoX3F1YXRBKSk7XG4gICAgfVxuXG4gICAgdGhpcy5fZ2V0U291cmNlRGlmZlF1YXQoX3F1YXRCKTtcbiAgICB0aGlzLm9iamVjdC5xdWF0ZXJuaW9uLm11bHRpcGx5KF9xdWF0Qik7XG5cbiAgICBpZiAodGhpcy5kZXN0aW5hdGlvblNwYWNlID09PSAnbW9kZWwnKSB7XG4gICAgICB0aGlzLm9iamVjdC5xdWF0ZXJuaW9uLm11bHRpcGx5KF9xdWF0QSk7XG4gICAgICB0aGlzLm9iamVjdC5xdWF0ZXJuaW9uLm11bHRpcGx5KHRoaXMuX3F1YXRJbml0RHN0KTtcbiAgICB9XG5cbiAgICB0aGlzLm9iamVjdC51cGRhdGVNYXRyaXgoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYSBxdWF0ZXJuaW9uIHRoYXQgcmVwcmVzZW50cyBhIGRpZmYgZnJvbSB0aGUgaW5pdGlhbCAtPiBjdXJyZW50IG9yaWVudGF0aW9uIG9mIHRoZSBzb3VyY2UuXG4gICAqIEl0J3MgYXdhcmUgb2YgaXRzIHtAbGluayBzb3VyY2VTcGFjZX0sIHtAbGluayBmcmVlemVBeGVzfSwgYW5kIHtAbGluayB3ZWlnaHR9LlxuICAgKiBAcGFyYW0gdGFyZ2V0IFRhcmdldCBxdWF0ZXJuaW9uXG4gICAqL1xuICBwcml2YXRlIF9nZXRTb3VyY2VEaWZmUXVhdDxUIGV4dGVuZHMgVEhSRUUuUXVhdGVybmlvbj4odGFyZ2V0OiBUKTogVCB7XG4gICAgdGhpcy5fZ2V0U291cmNlUXVhdCh0YXJnZXQpO1xuICAgIGlmICh0aGlzLnNvdXJjZVNwYWNlID09PSAnbG9jYWwnKSB7XG4gICAgICB0YXJnZXQucHJlbXVsdGlwbHkodGhpcy5fcXVhdEludkluaXRTcmMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0YXJnZXQubXVsdGlwbHkodGhpcy5fcXVhdEludkluaXRTcmMpO1xuICAgIH1cblxuICAgIHF1YXRlcm5pb25GcmVlemVBeGVzKHRhcmdldCwgdGhpcy5mcmVlemVBeGVzKTtcblxuICAgIHRhcmdldC5zbGVycChRVUFUX0lERU5USVRZLCAxLjAgLSB0aGlzLndlaWdodCk7XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgY3VycmVudCBvcmllbnRhdGlvbiBvZiB0aGUgc291cmNlLlxuICAgKiBJdCdzIGF3YXJlIG9mIGl0cyB7QGxpbmsgc291cmNlU3BhY2V9LlxuICAgKiBAcGFyYW0gdGFyZ2V0IFRhcmdldCBxdWF0ZXJuaW9uXG4gICAqL1xuICBwcml2YXRlIF9nZXRTb3VyY2VRdWF0PFQgZXh0ZW5kcyBUSFJFRS5RdWF0ZXJuaW9uPih0YXJnZXQ6IFQpOiBUIHtcbiAgICB0YXJnZXQuY29weShRVUFUX0lERU5USVRZKTtcblxuICAgIGlmICh0aGlzLl9zb3VyY2UpIHtcbiAgICAgIHRoaXMuX2dldFNvdXJjZU1hdHJpeChfbWF0QSk7XG4gICAgICBkZWNvbXBvc2VSb3RhdGlvbihfbWF0QSwgdGFyZ2V0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG59XG4iLCJpbXBvcnQgdHlwZSAqIGFzIENvbnN0cmFpbnRTY2hlbWEgZnJvbSAnQHBpeGl2L3R5cGVzLXZybWMtbm9kZS1jb25zdHJhaW50LTEuMCc7XG5pbXBvcnQgdHlwZSAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB0eXBlIHsgR0xURiwgR0xURkxvYWRlclBsdWdpbiwgR0xURlBhcnNlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXInO1xuaW1wb3J0IHsgVlJNTm9kZUNvbnN0cmFpbnRIZWxwZXIgfSBmcm9tICcuL2hlbHBlcnMnO1xuaW1wb3J0IHsgVlJNQWltQ29uc3RyYWludCB9IGZyb20gJy4vVlJNQWltQ29uc3RyYWludCc7XG5pbXBvcnQgdHlwZSB7IFZSTU5vZGVDb25zdHJhaW50TG9hZGVyUGx1Z2luT3B0aW9ucyB9IGZyb20gJy4vVlJNTm9kZUNvbnN0cmFpbnRMb2FkZXJQbHVnaW5PcHRpb25zJztcbmltcG9ydCB7IFZSTU5vZGVDb25zdHJhaW50TWFuYWdlciB9IGZyb20gJy4vVlJNTm9kZUNvbnN0cmFpbnRNYW5hZ2VyJztcbmltcG9ydCB7IFZSTVBvc2l0aW9uQ29uc3RyYWludCB9IGZyb20gJy4vVlJNUG9zaXRpb25Db25zdHJhaW50JztcbmltcG9ydCB7IFZSTVJvdGF0aW9uQ29uc3RyYWludCB9IGZyb20gJy4vVlJNUm90YXRpb25Db25zdHJhaW50JztcblxuZXhwb3J0IGNsYXNzIFZSTU5vZGVDb25zdHJhaW50TG9hZGVyUGx1Z2luIGltcGxlbWVudHMgR0xURkxvYWRlclBsdWdpbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgRVhURU5TSU9OX05BTUUgPSAnVlJNQ19ub2RlX2NvbnN0cmFpbnQnO1xuXG4gIC8qKlxuICAgKiBTcGVjaWZ5IGFuIE9iamVjdDNEIHRvIGFkZCB7QGxpbmsgVlJNTm9kZUNvbnN0cmFpbnRIZWxwZXJ9IHMuXG4gICAqIElmIG5vdCBzcGVjaWZpZWQsIGhlbHBlciB3aWxsIG5vdCBiZSBjcmVhdGVkLlxuICAgKiBJZiBgcmVuZGVyT3JkZXJgIGlzIHNldCB0byB0aGUgcm9vdCwgaGVscGVycyB3aWxsIGNvcHkgdGhlIHNhbWUgYHJlbmRlck9yZGVyYCAuXG4gICAqL1xuICBwdWJsaWMgaGVscGVyUm9vdD86IFRIUkVFLk9iamVjdDNEO1xuXG4gIHB1YmxpYyByZWFkb25seSBwYXJzZXI6IEdMVEZQYXJzZXI7XG5cbiAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFZSTU5vZGVDb25zdHJhaW50TG9hZGVyUGx1Z2luLkVYVEVOU0lPTl9OQU1FO1xuICB9XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBhcnNlcjogR0xURlBhcnNlciwgb3B0aW9ucz86IFZSTU5vZGVDb25zdHJhaW50TG9hZGVyUGx1Z2luT3B0aW9ucykge1xuICAgIHRoaXMucGFyc2VyID0gcGFyc2VyO1xuXG4gICAgdGhpcy5oZWxwZXJSb290ID0gb3B0aW9ucz8uaGVscGVyUm9vdDtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBhZnRlclJvb3QoZ2x0ZjogR0xURik6IFByb21pc2U8dm9pZD4ge1xuICAgIGdsdGYudXNlckRhdGEudnJtTm9kZUNvbnN0cmFpbnRNYW5hZ2VyID0gYXdhaXQgdGhpcy5faW1wb3J0KGdsdGYpO1xuICB9XG5cbiAgLyoqXG4gICAqIEltcG9ydCBjb25zdHJhaW50cyBmcm9tIGEgR0xURiBhbmQgcmV0dXJucyBhIHtAbGluayBWUk1Ob2RlQ29uc3RyYWludE1hbmFnZXJ9LlxuICAgKiBJdCBtaWdodCByZXR1cm4gYG51bGxgIGluc3RlYWQgd2hlbiBpdCBkb2VzIG5vdCBuZWVkIHRvIGJlIGNyZWF0ZWQgb3Igc29tZXRoaW5nIGdvIHdyb25nLlxuICAgKlxuICAgKiBAcGFyYW0gZ2x0ZiBBIHBhcnNlZCByZXN1bHQgb2YgR0xURiB0YWtlbiBmcm9tIEdMVEZMb2FkZXJcbiAgICovXG4gIHByb3RlY3RlZCBhc3luYyBfaW1wb3J0KGdsdGY6IEdMVEYpOiBQcm9taXNlPFZSTU5vZGVDb25zdHJhaW50TWFuYWdlciB8IG51bGw+IHtcbiAgICAvLyBlYXJseSBhYm9ydCBpZiBpdCBkb2Vzbid0IHVzZSBjb25zdHJhaW50c1xuICAgIGNvbnN0IGlzQ29uc3RyYWludHNVc2VkID1cbiAgICAgIHRoaXMucGFyc2VyLmpzb24uZXh0ZW5zaW9uc1VzZWQ/LmluZGV4T2YoVlJNTm9kZUNvbnN0cmFpbnRMb2FkZXJQbHVnaW4uRVhURU5TSU9OX05BTUUpICE9PSAtMTtcbiAgICBpZiAoIWlzQ29uc3RyYWludHNVc2VkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBtYW5hZ2VyID0gbmV3IFZSTU5vZGVDb25zdHJhaW50TWFuYWdlcigpO1xuICAgIGNvbnN0IHRocmVlTm9kZXM6IFRIUkVFLk9iamVjdDNEW10gPSBhd2FpdCB0aGlzLnBhcnNlci5nZXREZXBlbmRlbmNpZXMoJ25vZGUnKTtcblxuICAgIC8vIGltcG9ydCBjb25zdHJhaW50cyBmb3IgZWFjaCBub2Rlc1xuICAgIHRocmVlTm9kZXMuZm9yRWFjaCgobm9kZSwgbm9kZUluZGV4KSA9PiB7XG4gICAgICBjb25zdCBzY2hlbWFOb2RlID0gdGhpcy5wYXJzZXIuanNvbi5ub2Rlc1tub2RlSW5kZXhdO1xuXG4gICAgICAvLyBjaGVjayBpZiB0aGUgZXh0ZW5zaW9uIHVzZXMgdGhlIGV4dGVuc2lvblxuICAgICAgY29uc3QgZXh0ZW5zaW9uOiBDb25zdHJhaW50U2NoZW1hLlZSTUNOb2RlQ29uc3RyYWludCB8IHVuZGVmaW5lZCA9XG4gICAgICAgIHNjaGVtYU5vZGU/LmV4dGVuc2lvbnM/LltWUk1Ob2RlQ29uc3RyYWludExvYWRlclBsdWdpbi5FWFRFTlNJT05fTkFNRV07XG5cbiAgICAgIGlmIChleHRlbnNpb24gPT0gbnVsbCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNwZWNWZXJzaW9uID0gZXh0ZW5zaW9uLnNwZWNWZXJzaW9uO1xuICAgICAgaWYgKHNwZWNWZXJzaW9uICE9PSAnMS4wLWRyYWZ0Jykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIGltcG9ydCBjb25zdHJhaW50c1xuICAgICAgaWYgKGV4dGVuc2lvbj8ucG9zaXRpb24pIHtcbiAgICAgICAgY29uc3QgY29uc3RyYWludCA9IHRoaXMuX2ltcG9ydFBvc2l0aW9uQ29uc3RyYWludChub2RlLCB0aHJlZU5vZGVzLCBnbHRmLnNjZW5lLCBleHRlbnNpb24ucG9zaXRpb24pO1xuICAgICAgICBtYW5hZ2VyLmFkZENvbnN0cmFpbnQoY29uc3RyYWludCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChleHRlbnNpb24/LnJvdGF0aW9uKSB7XG4gICAgICAgIGNvbnN0IGNvbnN0cmFpbnQgPSB0aGlzLl9pbXBvcnRSb3RhdGlvbkNvbnN0cmFpbnQobm9kZSwgdGhyZWVOb2RlcywgZ2x0Zi5zY2VuZSwgZXh0ZW5zaW9uLnJvdGF0aW9uKTtcbiAgICAgICAgbWFuYWdlci5hZGRDb25zdHJhaW50KGNvbnN0cmFpbnQpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZXh0ZW5zaW9uPy5haW0pIHtcbiAgICAgICAgY29uc3QgY29uc3RyYWludCA9IHRoaXMuX2ltcG9ydEFpbUNvbnN0cmFpbnQobm9kZSwgdGhyZWVOb2RlcywgZ2x0Zi5zY2VuZSwgZXh0ZW5zaW9uLmFpbSk7XG4gICAgICAgIG1hbmFnZXIuYWRkQ29uc3RyYWludChjb25zdHJhaW50KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIGluaXQgY29uc3RyYWludHNcbiAgICBnbHRmLnNjZW5lLnVwZGF0ZU1hdHJpeFdvcmxkKCk7XG4gICAgbWFuYWdlci5zZXRJbml0U3RhdGUoKTtcblxuICAgIHJldHVybiBtYW5hZ2VyO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9pbXBvcnRQb3NpdGlvbkNvbnN0cmFpbnQoXG4gICAgZGVzdGluYXRpb246IFRIUkVFLk9iamVjdDNELFxuICAgIG5vZGVzOiBUSFJFRS5PYmplY3QzRFtdLFxuICAgIG1vZGVsUm9vdDogVEhSRUUuT2JqZWN0M0QsXG4gICAgcG9zaXRpb246IENvbnN0cmFpbnRTY2hlbWEuUG9zaXRpb25Db25zdHJhaW50LFxuICApOiBWUk1Qb3NpdGlvbkNvbnN0cmFpbnQge1xuICAgIGNvbnN0IHsgc291cmNlLCBzb3VyY2VTcGFjZSwgZGVzdGluYXRpb25TcGFjZSwgd2VpZ2h0LCBmcmVlemVBeGVzIH0gPSBwb3NpdGlvbjtcbiAgICBjb25zdCBjb25zdHJhaW50ID0gbmV3IFZSTVBvc2l0aW9uQ29uc3RyYWludChkZXN0aW5hdGlvbiwgbW9kZWxSb290KTtcblxuICAgIGNvbnN0cmFpbnQuc2V0U291cmNlKG5vZGVzW3NvdXJjZV0pO1xuXG4gICAgaWYgKHNvdXJjZVNwYWNlKSB7XG4gICAgICBjb25zdHJhaW50LnNvdXJjZVNwYWNlID0gc291cmNlU3BhY2U7XG4gICAgfVxuICAgIGlmIChkZXN0aW5hdGlvblNwYWNlKSB7XG4gICAgICBjb25zdHJhaW50LmRlc3RpbmF0aW9uU3BhY2UgPSBkZXN0aW5hdGlvblNwYWNlO1xuICAgIH1cbiAgICBpZiAod2VpZ2h0KSB7XG4gICAgICBjb25zdHJhaW50LndlaWdodCA9IHdlaWdodDtcbiAgICB9XG4gICAgaWYgKGZyZWV6ZUF4ZXMpIHtcbiAgICAgIGNvbnN0cmFpbnQuZnJlZXplQXhlcyA9IGZyZWV6ZUF4ZXM7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaGVscGVyUm9vdCkge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IFZSTU5vZGVDb25zdHJhaW50SGVscGVyKGNvbnN0cmFpbnQpO1xuICAgICAgdGhpcy5oZWxwZXJSb290LmFkZChoZWxwZXIpO1xuICAgICAgaGVscGVyLnJlbmRlck9yZGVyID0gdGhpcy5oZWxwZXJSb290LnJlbmRlck9yZGVyO1xuICAgIH1cblxuICAgIHJldHVybiBjb25zdHJhaW50O1xuICB9XG5cbiAgcHJvdGVjdGVkIF9pbXBvcnRSb3RhdGlvbkNvbnN0cmFpbnQoXG4gICAgZGVzdGluYXRpb246IFRIUkVFLk9iamVjdDNELFxuICAgIG5vZGVzOiBUSFJFRS5PYmplY3QzRFtdLFxuICAgIG1vZGVsUm9vdDogVEhSRUUuT2JqZWN0M0QsXG4gICAgcm90YXRpb246IENvbnN0cmFpbnRTY2hlbWEuUm90YXRpb25Db25zdHJhaW50LFxuICApOiBWUk1Sb3RhdGlvbkNvbnN0cmFpbnQge1xuICAgIGNvbnN0IHsgc291cmNlLCBzb3VyY2VTcGFjZSwgZGVzdGluYXRpb25TcGFjZSwgd2VpZ2h0LCBmcmVlemVBeGVzIH0gPSByb3RhdGlvbjtcbiAgICBjb25zdCBjb25zdHJhaW50ID0gbmV3IFZSTVJvdGF0aW9uQ29uc3RyYWludChkZXN0aW5hdGlvbiwgbW9kZWxSb290KTtcblxuICAgIGNvbnN0cmFpbnQuc2V0U291cmNlKG5vZGVzW3NvdXJjZV0pO1xuXG4gICAgaWYgKHNvdXJjZVNwYWNlKSB7XG4gICAgICBjb25zdHJhaW50LnNvdXJjZVNwYWNlID0gc291cmNlU3BhY2U7XG4gICAgfVxuICAgIGlmIChkZXN0aW5hdGlvblNwYWNlKSB7XG4gICAgICBjb25zdHJhaW50LmRlc3RpbmF0aW9uU3BhY2UgPSBkZXN0aW5hdGlvblNwYWNlO1xuICAgIH1cbiAgICBpZiAod2VpZ2h0KSB7XG4gICAgICBjb25zdHJhaW50LndlaWdodCA9IHdlaWdodDtcbiAgICB9XG4gICAgaWYgKGZyZWV6ZUF4ZXMpIHtcbiAgICAgIGNvbnN0cmFpbnQuZnJlZXplQXhlcyA9IGZyZWV6ZUF4ZXM7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaGVscGVyUm9vdCkge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IFZSTU5vZGVDb25zdHJhaW50SGVscGVyKGNvbnN0cmFpbnQpO1xuICAgICAgdGhpcy5oZWxwZXJSb290LmFkZChoZWxwZXIpO1xuICAgIH1cblxuICAgIHJldHVybiBjb25zdHJhaW50O1xuICB9XG5cbiAgcHJvdGVjdGVkIF9pbXBvcnRBaW1Db25zdHJhaW50KFxuICAgIGRlc3RpbmF0aW9uOiBUSFJFRS5PYmplY3QzRCxcbiAgICBub2RlczogVEhSRUUuT2JqZWN0M0RbXSxcbiAgICBtb2RlbFJvb3Q6IFRIUkVFLk9iamVjdDNELFxuICAgIGFpbTogQ29uc3RyYWludFNjaGVtYS5BaW1Db25zdHJhaW50LFxuICApOiBWUk1BaW1Db25zdHJhaW50IHtcbiAgICBjb25zdCB7IHNvdXJjZSwgYWltVmVjdG9yLCB1cFZlY3Rvciwgc291cmNlU3BhY2UsIGRlc3RpbmF0aW9uU3BhY2UsIHdlaWdodCwgZnJlZXplQXhlcyB9ID0gYWltO1xuICAgIGNvbnN0IGNvbnN0cmFpbnQgPSBuZXcgVlJNQWltQ29uc3RyYWludChkZXN0aW5hdGlvbiwgbW9kZWxSb290KTtcblxuICAgIGNvbnN0cmFpbnQuc2V0U291cmNlKG5vZGVzW3NvdXJjZV0pO1xuXG4gICAgaWYgKGFpbVZlY3Rvcikge1xuICAgICAgY29uc3RyYWludC5haW1WZWN0b3IuZnJvbUFycmF5KGFpbVZlY3Rvcikubm9ybWFsaXplKCk7XG4gICAgfVxuICAgIGlmICh1cFZlY3Rvcikge1xuICAgICAgY29uc3RyYWludC51cFZlY3Rvci5mcm9tQXJyYXkodXBWZWN0b3IpLm5vcm1hbGl6ZSgpO1xuICAgIH1cbiAgICBpZiAoc291cmNlU3BhY2UpIHtcbiAgICAgIGNvbnN0cmFpbnQuc291cmNlU3BhY2UgPSBzb3VyY2VTcGFjZTtcbiAgICB9XG4gICAgaWYgKGRlc3RpbmF0aW9uU3BhY2UpIHtcbiAgICAgIGNvbnN0cmFpbnQuZGVzdGluYXRpb25TcGFjZSA9IGRlc3RpbmF0aW9uU3BhY2U7XG4gICAgfVxuICAgIGlmICh3ZWlnaHQpIHtcbiAgICAgIGNvbnN0cmFpbnQud2VpZ2h0ID0gd2VpZ2h0O1xuICAgIH1cbiAgICBpZiAoZnJlZXplQXhlcykge1xuICAgICAgY29uc3RyYWludC5mcmVlemVBeGVzID0gZnJlZXplQXhlcztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5oZWxwZXJSb290KSB7XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgVlJNTm9kZUNvbnN0cmFpbnRIZWxwZXIoY29uc3RyYWludCk7XG4gICAgICB0aGlzLmhlbHBlclJvb3QuYWRkKGhlbHBlcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbnN0cmFpbnQ7XG4gIH1cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiAqL1xuXG5leHBvcnQgY29uc3QgVlJNTm9kZUNvbnN0cmFpbnRPYmplY3RTcGFjZSA9IHtcbiAgTG9jYWw6ICdsb2NhbCcsXG4gIE1vZGVsOiAnbW9kZWwnLFxufSBhcyBjb25zdDtcblxuZXhwb3J0IHR5cGUgVlJNTm9kZUNvbnN0cmFpbnRPYmplY3RTcGFjZSA9IHR5cGVvZiBWUk1Ob2RlQ29uc3RyYWludE9iamVjdFNwYWNlW2tleW9mIHR5cGVvZiBWUk1Ob2RlQ29uc3RyYWludE9iamVjdFNwYWNlXTtcbiJdLCJuYW1lcyI6WyJfdjNBIiwiVEhSRUUiLCJfcXVhdEEiLCJfbWF0QSIsIlFVQVRfSURFTlRJVFkiLCJfcXVhdEIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUdBLE1BQU1BLE1BQUksR0FBRyxJQUFJQyxnQkFBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1VBRXBCLHVCQUF3QixTQUFRQSxnQkFBSyxDQUFDLEtBQUs7UUFLdEQsWUFBbUIsVUFBNkI7WUFDOUMsS0FBSyxFQUFFLENBQUM7WUFFUixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUlBLGdCQUFLLENBQUMsZUFBZSxDQUFDLElBQUksWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3hGLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDQSxnQkFBSyxD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
