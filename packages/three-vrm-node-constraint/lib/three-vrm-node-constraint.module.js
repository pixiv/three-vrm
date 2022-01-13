/*!
 * @pixiv/three-vrm-node-constraint v1.0.0-beta.7
 * Node constraint module for @pixiv/three-vrm
 *
 * Copyright (c) 2020-2021 pixiv Inc.
 * @pixiv/three-vrm-node-constraint is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
import * as THREE from 'three';

const _v3A$2 = new THREE.Vector3();
class VRMNodeConstraintHelper extends THREE.Group {
    constructor(constraint) {
        super();
        this._attrPosition = new THREE.BufferAttribute(new Float32Array([0, 0, 0, 0, 0, 0]), 3);
        this._attrPosition.setUsage(THREE.DynamicDrawUsage);
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', this._attrPosition);
        const material = new THREE.LineBasicMaterial({
            color: 0xff00ff,
            depthTest: false,
            depthWrite: false,
        });
        this._line = new THREE.Line(geometry, material);
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

const _v3A$1 = new THREE.Vector3();
const _v3B = new THREE.Vector3();
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

const _v3Dir = new THREE.Vector3();
const _v3PlaneX = new THREE.Vector3();
const _v3PlaneY = new THREE.Vector3();
const _quatA$2 = new THREE.Quaternion();
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

const _matA$3 = new THREE.Matrix4();
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
        this._inverseCache = new THREE.Matrix4();
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

const _matWorldToModel = new THREE.Matrix4();
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

const QUAT_IDENTITY$2 = new THREE.Quaternion(0, 0, 0, 1);
const _quatA$1 = new THREE.Quaternion();
const _quatB$1 = new THREE.Quaternion();
const _matA$2 = new THREE.Matrix4();
const _v3GetRotationPos = new THREE.Vector3();
const _v3GetRotationDir = new THREE.Vector3();
class VRMAimConstraint extends VRMNodeConstraint {
    constructor() {
        super(...arguments);
        /**
         * Represents the aim vector used for reference of aim rotation.
         * It must be normalized.
         */
        this.aimVector = new THREE.Vector3(0.0, 0.0, 1.0);
        /**
         * Represents the up vector used for calculation of aim rotation.
         * It must be normalized.
         */
        this.upVector = new THREE.Vector3(0.0, 1.0, 0.0);
        this.freezeAxes = [true, true];
        this._quatInitAim = new THREE.Quaternion();
        this._quatInvInitAim = new THREE.Quaternion();
        this._quatInitDst = new THREE.Quaternion();
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

const _matA$1 = new THREE.Matrix4();
class VRMPositionConstraint extends VRMNodeConstraint {
    constructor() {
        super(...arguments);
        this.freezeAxes = [true, true, true];
        this._v3InitDst = new THREE.Vector3();
        this._v3InitSrc = new THREE.Vector3();
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

const QUAT_IDENTITY$1 = new THREE.Quaternion(0, 0, 0, 1);
const _v3A = new THREE.Vector3();
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

const QUAT_IDENTITY = new THREE.Quaternion(0, 0, 0, 1);
const _matA = new THREE.Matrix4();
const _quatA = new THREE.Quaternion();
const _quatB = new THREE.Quaternion();
class VRMRotationConstraint extends VRMNodeConstraint {
    constructor() {
        super(...arguments);
        this.freezeAxes = [true, true, true];
        this._quatInitSrc = new THREE.Quaternion();
        this._quatInvInitSrc = new THREE.Quaternion();
        this._quatInitDst = new THREE.Quaternion();
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

export { VRMAimConstraint, VRMNodeConstraint, VRMNodeConstraintHelper, VRMNodeConstraintLoaderPlugin, VRMNodeConstraintManager, VRMNodeConstraintObjectSpace, VRMPositionConstraint, VRMRotationConstraint };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyZWUtdnJtLW5vZGUtY29uc3RyYWludC5tb2R1bGUuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9oZWxwZXJzL1ZSTU5vZGVDb25zdHJhaW50SGVscGVyLnRzIiwiLi4vc3JjL3V0aWxzL2RlY29tcG9zZVBvc2l0aW9uLnRzIiwiLi4vc3JjL3V0aWxzL2RlY29tcG9zZVJvdGF0aW9uLnRzIiwiLi4vc3JjL3V0aWxzL3F1YXRJbnZlcnRDb21wYXQudHMiLCIuLi9zcmMvdXRpbHMvc2V0QWltUXVhdGVybmlvbi50cyIsIi4uL3NyYy91dGlscy9tYXQ0SW52ZXJ0Q29tcGF0LnRzIiwiLi4vc3JjL3V0aWxzL01hdHJpeDRJbnZlcnNlQ2FjaGUudHMiLCIuLi9zcmMvVlJNTm9kZUNvbnN0cmFpbnQudHMiLCIuLi9zcmMvVlJNQWltQ29uc3RyYWludC50cyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCIuLi9zcmMvdXRpbHMvdHJhdmVyc2VBbmNlc3RvcnNGcm9tUm9vdC50cyIsIi4uL3NyYy9WUk1Ob2RlQ29uc3RyYWludE1hbmFnZXIudHMiLCIuLi9zcmMvdXRpbHMvdmVjdG9yM0ZyZWV6ZUF4ZXMudHMiLCIuLi9zcmMvVlJNUG9zaXRpb25Db25zdHJhaW50LnRzIiwiLi4vc3JjL3V0aWxzL3F1YXRlcm5pb25GcmVlemVBeGVzLnRzIiwiLi4vc3JjL1ZSTVJvdGF0aW9uQ29uc3RyYWludC50cyIsIi4uL3NyYy9WUk1Ob2RlQ29uc3RyYWludExvYWRlclBsdWdpbi50cyIsIi4uL3NyYy9WUk1Ob2RlQ29uc3RyYWludE9iamVjdFNwYWNlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTU5vZGVDb25zdHJhaW50IH0gZnJvbSAnLi4vVlJNTm9kZUNvbnN0cmFpbnQnO1xuXG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuZXhwb3J0IGNsYXNzIFZSTU5vZGVDb25zdHJhaW50SGVscGVyIGV4dGVuZHMgVEhSRUUuR3JvdXAge1xuICBwdWJsaWMgcmVhZG9ubHkgY29uc3RyYWludDogVlJNTm9kZUNvbnN0cmFpbnQ7XG4gIHByaXZhdGUgX2xpbmU6IFRIUkVFLkxpbmU7XG4gIHByaXZhdGUgX2F0dHJQb3NpdGlvbjogVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb25zdHJhaW50OiBWUk1Ob2RlQ29uc3RyYWludCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLl9hdHRyUG9zaXRpb24gPSBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKG5ldyBGbG9hdDMyQXJyYXkoWzAsIDAsIDAsIDAsIDAsIDBdKSwgMyk7XG4gICAgdGhpcy5fYXR0clBvc2l0aW9uLnNldFVzYWdlKFRIUkVFLkR5bmFtaWNEcmF3VXNhZ2UpO1xuXG4gICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuQnVmZmVyR2VvbWV0cnkoKTtcbiAgICBnZW9tZXRyeS5zZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJywgdGhpcy5fYXR0clBvc2l0aW9uKTtcblxuICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLkxpbmVCYXNpY01hdGVyaWFsKHtcbiAgICAgIGNvbG9yOiAweGZmMDBmZixcbiAgICAgIGRlcHRoVGVzdDogZmFsc2UsXG4gICAgICBkZXB0aFdyaXRlOiBmYWxzZSxcbiAgICB9KTtcblxuICAgIHRoaXMuX2xpbmUgPSBuZXcgVEhSRUUuTGluZShnZW9tZXRyeSwgbWF0ZXJpYWwpO1xuICAgIHRoaXMuYWRkKHRoaXMuX2xpbmUpO1xuXG4gICAgdGhpcy5jb25zdHJhaW50ID0gY29uc3RyYWludDtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVNYXRyaXhXb3JsZChmb3JjZT86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBfdjNBLnNldEZyb21NYXRyaXhQb3NpdGlvbih0aGlzLmNvbnN0cmFpbnQub2JqZWN0Lm1hdHJpeFdvcmxkKTtcbiAgICB0aGlzLl9hdHRyUG9zaXRpb24uc2V0WFlaKDAsIF92M0EueCwgX3YzQS55LCBfdjNBLnopO1xuXG4gICAgaWYgKHRoaXMuY29uc3RyYWludC5zb3VyY2UpIHtcbiAgICAgIF92M0Euc2V0RnJvbU1hdHJpeFBvc2l0aW9uKHRoaXMuY29uc3RyYWludC5zb3VyY2UubWF0cml4V29ybGQpO1xuICAgIH1cbiAgICB0aGlzLl9hdHRyUG9zaXRpb24uc2V0WFlaKDEsIF92M0EueCwgX3YzQS55LCBfdjNBLnopO1xuXG4gICAgdGhpcy5fYXR0clBvc2l0aW9uLm5lZWRzVXBkYXRlID0gdHJ1ZTtcblxuICAgIHN1cGVyLnVwZGF0ZU1hdHJpeFdvcmxkKGZvcmNlKTtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG5leHBvcnQgZnVuY3Rpb24gZGVjb21wb3NlUG9zaXRpb248VCBleHRlbmRzIFRIUkVFLlZlY3RvcjM+KG1hdHJpeDogVEhSRUUuTWF0cml4NCwgdGFyZ2V0OiBUKTogVCB7XG4gIHJldHVybiB0YXJnZXQuc2V0KG1hdHJpeC5lbGVtZW50c1sxMl0sIG1hdHJpeC5lbGVtZW50c1sxM10sIG1hdHJpeC5lbGVtZW50c1sxNF0pO1xufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF92M0IgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5leHBvcnQgZnVuY3Rpb24gZGVjb21wb3NlUm90YXRpb248VCBleHRlbmRzIFRIUkVFLlF1YXRlcm5pb24+KG1hdHJpeDogVEhSRUUuTWF0cml4NCwgdGFyZ2V0OiBUKTogVCB7XG4gIG1hdHJpeC5kZWNvbXBvc2UoX3YzQSwgdGFyZ2V0LCBfdjNCKTtcbiAgcmV0dXJuIHRhcmdldDtcbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBBIGNvbXBhdCBmdW5jdGlvbiBmb3IgYFF1YXRlcm5pb24uaW52ZXJ0KClgIC8gYFF1YXRlcm5pb24uaW52ZXJzZSgpYC5cbiAqIGBRdWF0ZXJuaW9uLmludmVydCgpYCBpcyBpbnRyb2R1Y2VkIGluIHIxMjMgYW5kIGBRdWF0ZXJuaW9uLmludmVyc2UoKWAgZW1pdHMgYSB3YXJuaW5nLlxuICogV2UgYXJlIGdvaW5nIHRvIHVzZSB0aGlzIGNvbXBhdCBmb3IgYSB3aGlsZS5cbiAqIEBwYXJhbSB0YXJnZXQgQSB0YXJnZXQgcXVhdGVybmlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gcXVhdEludmVydENvbXBhdDxUIGV4dGVuZHMgVEhSRUUuUXVhdGVybmlvbj4odGFyZ2V0OiBUKTogVCB7XG4gIGlmICgodGFyZ2V0IGFzIGFueSkuaW52ZXJ0KSB7XG4gICAgdGFyZ2V0LmludmVydCgpO1xuICB9IGVsc2Uge1xuICAgICh0YXJnZXQgYXMgYW55KS5pbnZlcnNlKCk7XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG5jb25zdCBfdjNEaXIgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3YzUGxhbmVYID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF92M1BsYW5lWSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfcXVhdEEgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXG4vKipcbiAqIFJldHVybiBhIHF1YXRlcm5pb24gdGhhdCByZXByZXNlbnRzIGEgcm90YXRpb24gb2YgYWltIHZlY3Rvci5cbiAqIEBwYXJhbSB0YXJnZXQgVGFyZ2V0IHF1YXRlcm5pb25cbiAqIEBwYXJhbSBmcm9tIEEgdmVjdG9yIHJlcHJlc2VudHMgZXllIHBvc2l0aW9uIG9mIHRoZSBhaW0gcXVhdGVybmlvbi5cbiAqIEBwYXJhbSB0byBBIHZlY3RvciByZXByZXNlbnRzIHRhcmdldCBwb3NpdGlvbiBvZiB0aGUgYWltIHF1YXRlcm5pb24uXG4gKiBAcGFyYW0gYWltIEEgcmVmZXJlbmNlIHZlY3RvciBvZiB0aGUgYWltIHZlY3Rvci4gTXVzdCBiZSBub3JtYWxpemVkXG4gKiBAcGFyYW0gdXAgQW4gdXAgdmVjdG9yLiBNdXN0IGJlIG5vcm1hbGl6ZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldEFpbVF1YXRlcm5pb248VCBleHRlbmRzIFRIUkVFLlF1YXRlcm5pb24+KFxuICB0YXJnZXQ6IFQsXG4gIGZyb206IFRIUkVFLlZlY3RvcjMsXG4gIHRvOiBUSFJFRS5WZWN0b3IzLFxuICBhaW06IFRIUkVFLlZlY3RvcjMsXG4gIHVwOiBUSFJFRS5WZWN0b3IzLFxuICBmcmVlemVBeGVzOiBbYm9vbGVhbiwgYm9vbGVhbl0sXG4pOiBUIHtcbiAgLy8gdGhpcyBpcyB0aGUgdGFyZ2V0IHJvdGF0aW9uXG4gIF92M0Rpci5jb3B5KHRvKS5zdWIoZnJvbSkubm9ybWFsaXplKCk7XG5cbiAgLy8gY2FsY3VsYXRlIHRoZSBkaWZmIG9mIHRoZXRhXG4gIGNvbnN0IHRoZXRhQWltID0gTWF0aC5hc2luKHVwLmRvdChhaW0pKTtcbiAgY29uc3QgdGhldGFEaXIgPSBNYXRoLmFzaW4odXAuZG90KF92M0RpcikpO1xuXG4gIC8vIGNyZWF0ZSBhIHBsYW5lIHRoYXQgaXMgZGV0ZXJtaW5lZCBieSB1cCB2ZWN0b3IgYW5kIGFpbSB2ZWN0b3JcbiAgX3YzUGxhbmVYLmNyb3NzVmVjdG9ycyh1cCwgYWltKS5ub3JtYWxpemUoKTtcbiAgX3YzUGxhbmVZLmNyb3NzVmVjdG9ycyhfdjNQbGFuZVgsIHVwKTsgLy8gZ3VhcmFudGVlZCB0byBiZSBub3JtYWxpemVkXG5cbiAgLy8gY2FsY3VsYXRlIHRoZSBkaWZmIG9mIHBoaVxuICAvLyB0aGUgcGhpIG9mIHRoZSBhaW0gdmVjdG9yIGlzIGFscmVhZHkgZ3VhcmFudGVlZCB0byBiZSB6ZXJvLCBzaW5jZSB0aGUgcGxhbmUgaXMgYWxyZWFkeSBtYWRlIG9mIHRoZSBhaW0gdmVjdG9yXG4gIGNvbnN0IHBoaURpciA9IE1hdGguYXRhbjIoX3YzUGxhbmVYLmRvdChfdjNEaXIpLCBfdjNQbGFuZVkuZG90KF92M0RpcikpO1xuXG4gIC8vIG1hZGUgYSBxdWF0ZXJuaW9uIG91dCBvZiBjYWxjdWxhdGVkIHBoaSBhbmQgdGhldGFcbiAgdGFyZ2V0LnNldEZyb21BeGlzQW5nbGUodXAsIGZyZWV6ZUF4ZXNbMF0gPyBwaGlEaXIgOiAwLjApO1xuICBfcXVhdEEuc2V0RnJvbUF4aXNBbmdsZShfdjNQbGFuZVgsIGZyZWV6ZUF4ZXNbMV0gPyB0aGV0YUFpbSAtIHRoZXRhRGlyIDogMC4wKTtcbiAgdGFyZ2V0Lm11bHRpcGx5KF9xdWF0QSk7XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuY29uc3QgX21hdEEgPSBuZXcgVEhSRUUuTWF0cml4NCgpO1xuXG4vKipcbiAqIEEgY29tcGF0IGZ1bmN0aW9uIGZvciBgTWF0cml4NC5pbnZlcnQoKWAgLyBgTWF0cml4NC5nZXRJbnZlcnNlKClgLlxuICogYE1hdHJpeDQuaW52ZXJ0KClgIGlzIGludHJvZHVjZWQgaW4gcjEyMyBhbmQgYE1hdHJpeDQuZ2V0SW52ZXJzZSgpYCBlbWl0cyBhIHdhcm5pbmcuXG4gKiBXZSBhcmUgZ29pbmcgdG8gdXNlIHRoaXMgY29tcGF0IGZvciBhIHdoaWxlLlxuICogQHBhcmFtIHRhcmdldCBBIHRhcmdldCBtYXRyaXhcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hdDRJbnZlcnRDb21wYXQ8VCBleHRlbmRzIFRIUkVFLk1hdHJpeDQ+KHRhcmdldDogVCk6IFQge1xuICBpZiAoKHRhcmdldCBhcyBhbnkpLmludmVydCkge1xuICAgIHRhcmdldC5pbnZlcnQoKTtcbiAgfSBlbHNlIHtcbiAgICAodGFyZ2V0IGFzIGFueSkuZ2V0SW52ZXJzZShfbWF0QS5jb3B5KHRhcmdldCkpO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IG1hdDRJbnZlcnRDb21wYXQgfSBmcm9tICcuL21hdDRJbnZlcnRDb21wYXQnO1xuXG5leHBvcnQgY2xhc3MgTWF0cml4NEludmVyc2VDYWNoZSB7XG4gIC8qKlxuICAgKiBUaGUgdGFyZ2V0IG1hdHJpeC5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBtYXRyaXg6IFRIUkVFLk1hdHJpeDQ7XG5cbiAgLyoqXG4gICAqIEEgY2FjaGUgb2YgaW52ZXJzZSBvZiBjdXJyZW50IG1hdHJpeC5cbiAgICovXG4gIHByaXZhdGUgcmVhZG9ubHkgX2ludmVyc2VDYWNoZSA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG5cbiAgLyoqXG4gICAqIEEgZmxhZyB0aGF0IG1ha2VzIGl0IHdhbnQgdG8gcmVjYWxjdWxhdGUgaXRzIHtAbGluayBfaW52ZXJzZUNhY2hlfS5cbiAgICogV2lsbCBiZSBzZXQgYHRydWVgIHdoZW4gYGVsZW1lbnRzYCBhcmUgbXV0YXRlZCBhbmQgYmUgdXNlZCBpbiBgZ2V0SW52ZXJzZWAuXG4gICAqL1xuICBwcml2YXRlIF9zaG91bGRVcGRhdGVJbnZlcnNlID0gdHJ1ZTtcblxuICAvKipcbiAgICogVGhlIG9yaWdpbmFsIG9mIGBtYXRyaXguZWxlbWVudHNgXG4gICAqL1xuICBwcml2YXRlIHJlYWRvbmx5IF9vcmlnaW5hbEVsZW1lbnRzOiBudW1iZXJbXTtcblxuICAvKipcbiAgICogSW52ZXJzZSBvZiBnaXZlbiBtYXRyaXguXG4gICAqIE5vdGUgdGhhdCBpdCB3aWxsIHJldHVybiBpdHMgaW50ZXJuYWwgcHJpdmF0ZSBpbnN0YW5jZS5cbiAgICogTWFrZSBzdXJlIGNvcHlpbmcgdGhpcyBiZWZvcmUgbXV0YXRlIHRoaXMuXG4gICAqL1xuICBwdWJsaWMgZ2V0IGludmVyc2UoKTogVEhSRUUuTWF0cml4NCB7XG4gICAgaWYgKHRoaXMuX3Nob3VsZFVwZGF0ZUludmVyc2UpIHtcbiAgICAgIHRoaXMuX2ludmVyc2VDYWNoZS5jb3B5KHRoaXMubWF0cml4KTtcbiAgICAgIG1hdDRJbnZlcnRDb21wYXQodGhpcy5faW52ZXJzZUNhY2hlKTtcbiAgICAgIHRoaXMuX3Nob3VsZFVwZGF0ZUludmVyc2UgPSBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5faW52ZXJzZUNhY2hlO1xuICB9XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKG1hdHJpeDogVEhSRUUuTWF0cml4NCkge1xuICAgIHRoaXMubWF0cml4ID0gbWF0cml4O1xuXG4gICAgY29uc3QgaGFuZGxlcjogUHJveHlIYW5kbGVyPG51bWJlcltdPiA9IHtcbiAgICAgIHNldDogKG9iaiwgcHJvcDogbnVtYmVyLCBuZXdWYWwpID0+IHtcbiAgICAgICAgdGhpcy5fc2hvdWxkVXBkYXRlSW52ZXJzZSA9IHRydWU7XG4gICAgICAgIG9ialtwcm9wXSA9IG5ld1ZhbDtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIHRoaXMuX29yaWdpbmFsRWxlbWVudHMgPSBtYXRyaXguZWxlbWVudHM7XG4gICAgbWF0cml4LmVsZW1lbnRzID0gbmV3IFByb3h5KG1hdHJpeC5lbGVtZW50cywgaGFuZGxlcik7XG4gIH1cblxuICBwdWJsaWMgcmV2ZXJ0KCk6IHZvaWQge1xuICAgIHRoaXMubWF0cml4LmVsZW1lbnRzID0gdGhpcy5fb3JpZ2luYWxFbGVtZW50cztcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgTWF0cml4NEludmVyc2VDYWNoZSB9IGZyb20gJy4vdXRpbHMvTWF0cml4NEludmVyc2VDYWNoZSc7XG5cbmNvbnN0IF9tYXRXb3JsZFRvTW9kZWwgPSBuZXcgVEhSRUUuTWF0cml4NCgpO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVlJNTm9kZUNvbnN0cmFpbnQge1xuICBwdWJsaWMgd2VpZ2h0ID0gMS4wO1xuXG4gIHB1YmxpYyByZWFkb25seSBvYmplY3Q6IFRIUkVFLk9iamVjdDNEO1xuXG4gIC8qKlxuICAgKiBXaGVuIHtAbGluayBzb3VyY2VTcGFjZX0gLyB7QGxpbmsgZGVzdGluYXRpb25TcGFjZX0gaXMgbW9kZWwgc3BhY2UsIHRoZXNlIHRyYW5zZm9ybXMgd2lsbCBiZSBjYXVjdWxhdGVkIHJlbGF0aXZlbHkgZnJvbSB0aGlzIG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBtb2RlbFJvb3Q6IFRIUkVFLk9iamVjdDNEO1xuXG4gIHByb3RlY3RlZCBfc291cmNlPzogVEhSRUUuT2JqZWN0M0QgfCBudWxsO1xuICBwdWJsaWMgZ2V0IHNvdXJjZSgpOiBUSFJFRS5PYmplY3QzRCB8IG51bGwgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9zb3VyY2U7XG4gIH1cblxuICBwdWJsaWMgc291cmNlU3BhY2UgPSAnbW9kZWwnO1xuICBwdWJsaWMgZGVzdGluYXRpb25TcGFjZSA9ICdtb2RlbCc7XG5cbiAgcHVibGljIGdldCBkZXBlbmRlbmNpZXMoKTogU2V0PFRIUkVFLk9iamVjdDNEPiB7XG4gICAgY29uc3QgZGVwcyA9IG5ldyBTZXQ8VEhSRUUuT2JqZWN0M0Q+KCk7XG4gICAgdGhpcy5fc291cmNlICYmIGRlcHMuYWRkKHRoaXMuX3NvdXJjZSk7XG4gICAgaWYgKHRoaXMuZGVzdGluYXRpb25TcGFjZSA9PT0gJ21vZGVsJyAmJiB0aGlzLm9iamVjdC5wYXJlbnQpIHtcbiAgICAgIGRlcHMuYWRkKHRoaXMub2JqZWN0LnBhcmVudCk7XG4gICAgfVxuICAgIHJldHVybiBkZXBzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdFxuICAgKiBAcGFyYW0gbW9kZWxSb290IFdoZW4ge0BsaW5rIHNvdXJjZVNwYWNlfSAvIHtAbGluayBkZXN0aW5hdGlvblNwYWNlfSBpcyBtb2RlbCBzcGFjZSwgdGhlc2UgdHJhbnNmb3JtcyB3aWxsIGJlIGNhdWN1bGF0ZWQgcmVsYXRpdmVseSBmcm9tIHRoaXMgb2JqZWN0XG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3Iob2JqZWN0OiBUSFJFRS5PYmplY3QzRCwgbW9kZWxSb290OiBUSFJFRS5PYmplY3QzRCkge1xuICAgIHRoaXMub2JqZWN0ID0gb2JqZWN0O1xuXG4gICAgdGhpcy5tb2RlbFJvb3QgPSBtb2RlbFJvb3Q7XG4gIH1cblxuICBwdWJsaWMgc2V0U291cmNlKHNvdXJjZTogVEhSRUUuT2JqZWN0M0QgfCBudWxsKTogdm9pZCB7XG4gICAgdGhpcy5fc291cmNlID0gc291cmNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgb2JqZWN0IG1hdHJpeCBvZiB0aGUgcGFyZW50LCBpbiBtb2RlbCBzcGFjZS5cbiAgICogQHBhcmFtIHRhcmdldCBUYXJnZXQgbWF0cml4XG4gICAqL1xuICBwcm90ZWN0ZWQgX2dldFBhcmVudE1hdHJpeEluTW9kZWxTcGFjZTxUIGV4dGVuZHMgVEhSRUUuTWF0cml4ND4odGFyZ2V0OiBUKTogVCB7XG4gICAgaWYgKCF0aGlzLm9iamVjdC5wYXJlbnQpIHtcbiAgICAgIHRhcmdldC5pZGVudGl0eSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9iamVjdC5wYXJlbnQudXBkYXRlV29ybGRNYXRyaXgoZmFsc2UsIGZhbHNlKTtcbiAgICAgIHRhcmdldC5jb3B5KHRoaXMub2JqZWN0LnBhcmVudC5tYXRyaXhXb3JsZCk7XG5cbiAgICAgIHRoaXMuX2dldE1hdHJpeFdvcmxkVG9Nb2RlbChfbWF0V29ybGRUb01vZGVsKTtcbiAgICAgIHRhcmdldC5wcmVtdWx0aXBseShfbWF0V29ybGRUb01vZGVsKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgb2JqZWN0IG1hdHJpeCBvZiB0aGUgb2JqZWN0LCB0YWtpbmcgZGVzaXJlZCBvYmplY3Qgc3BhY2UgaW50byBhY2NvdW50LlxuICAgKiBJbnRlbmRlZCB0byBiZSB1c2VkIHRvIGFic29yYiBiZXR3ZWVuIGRpZmZlcmVudCBzcGFjZXMuXG4gICAqIEBwYXJhbSB0YXJnZXQgVGFyZ2V0IG1hdHJpeFxuICAgKi9cbiAgcHJvdGVjdGVkIF9nZXREZXN0aW5hdGlvbk1hdHJpeDxUIGV4dGVuZHMgVEhSRUUuTWF0cml4ND4odGFyZ2V0OiBUKTogVCB7XG4gICAgaWYgKHRoaXMuZGVzdGluYXRpb25TcGFjZSA9PT0gJ2xvY2FsJykge1xuICAgICAgdGhpcy5vYmplY3QudXBkYXRlTWF0cml4KCk7XG4gICAgICB0YXJnZXQuY29weSh0aGlzLm9iamVjdC5tYXRyaXgpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5kZXN0aW5hdGlvblNwYWNlID09PSAnbW9kZWwnKSB7XG4gICAgICB0aGlzLm9iamVjdC51cGRhdGVXb3JsZE1hdHJpeChmYWxzZSwgZmFsc2UpO1xuICAgICAgdGFyZ2V0LmNvcHkodGhpcy5vYmplY3QubWF0cml4V29ybGQpO1xuXG4gICAgICB0aGlzLl9nZXRNYXRyaXhXb3JsZFRvTW9kZWwoX21hdFdvcmxkVG9Nb2RlbCk7XG4gICAgICB0YXJnZXQucHJlbXVsdGlwbHkoX21hdFdvcmxkVG9Nb2RlbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVlJNTm9kZUNvbnN0cmFpbnQ6IFVua25vd24gZGVzdGluYXRpb25TcGFjZSAke3RoaXMuZGVzdGluYXRpb25TcGFjZX0gZGV0ZWN0ZWRgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgb2JqZWN0IG1hdHJpeCBvZiB0aGUgc291cmNlLCB0YWtpbmcgZGVzaXJlZCBvYmplY3Qgc3BhY2UgaW50byBhY2NvdW50LlxuICAgKiBJbnRlbmRlZCB0byBiZSB1c2VkIHRvIGFic29yYiBiZXR3ZWVuIGRpZmZlcmVudCBzcGFjZXMuXG4gICAqIEBwYXJhbSB0YXJnZXQgVGFyZ2V0IG1hdHJpeFxuICAgKi9cbiAgcHJvdGVjdGVkIF9nZXRTb3VyY2VNYXRyaXg8VCBleHRlbmRzIFRIUkVFLk1hdHJpeDQ+KHRhcmdldDogVCk6IFQge1xuICAgIGlmICghdGhpcy5fc291cmNlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZXJlIGlzIG5vIHNvdXJjZSBzcGVjaWZpZWQnKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zb3VyY2VTcGFjZSA9PT0gJ2xvY2FsJykge1xuICAgICAgdGhpcy5fc291cmNlLnVwZGF0ZU1hdHJpeCgpO1xuICAgICAgdGFyZ2V0LmNvcHkodGhpcy5fc291cmNlLm1hdHJpeCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnNvdXJjZVNwYWNlID09PSAnbW9kZWwnKSB7XG4gICAgICB0aGlzLl9zb3VyY2UudXBkYXRlV29ybGRNYXRyaXgoZmFsc2UsIGZhbHNlKTtcbiAgICAgIHRhcmdldC5jb3B5KHRoaXMuX3NvdXJjZS5tYXRyaXhXb3JsZCk7XG5cbiAgICAgIHRoaXMuX2dldE1hdHJpeFdvcmxkVG9Nb2RlbChfbWF0V29ybGRUb01vZGVsKTtcbiAgICAgIHRhcmdldC5wcmVtdWx0aXBseShfbWF0V29ybGRUb01vZGVsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBWUk1Ob2RlQ29uc3RyYWludDogVW5rbm93biBzb3VyY2VTcGFjZSAke3RoaXMuc291cmNlU3BhY2V9IGRldGVjdGVkYCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBtYXRyaXggdGhhdCBjb252ZXJ0cyB3b3JsZCBzcGFjZSBpbnRvIG1vZGVsIHNwYWNlLlxuICAgKiBAcGFyYW0gdGFyZ2V0IFRhcmdldCBtYXRyaXhcbiAgICovXG4gIHByaXZhdGUgX2dldE1hdHJpeFdvcmxkVG9Nb2RlbDxUIGV4dGVuZHMgVEhSRUUuTWF0cml4ND4odGFyZ2V0OiBUKTogVCB7XG4gICAgbGV0IGludmVyc2VDYWNoZVByb3h5ID0gdGhpcy5tb2RlbFJvb3QudXNlckRhdGEuaW52ZXJzZUNhY2hlUHJveHkgYXMgTWF0cml4NEludmVyc2VDYWNoZSB8IHVuZGVmaW5lZDtcbiAgICBpZiAoIWludmVyc2VDYWNoZVByb3h5KSB7XG4gICAgICBpbnZlcnNlQ2FjaGVQcm94eSA9IHRoaXMubW9kZWxSb290LnVzZXJEYXRhLmludmVyc2VDYWNoZVByb3h5ID0gbmV3IE1hdHJpeDRJbnZlcnNlQ2FjaGUodGhpcy5tb2RlbFJvb3QubWF0cml4KTtcbiAgICB9XG5cbiAgICB0YXJnZXQuY29weShpbnZlcnNlQ2FjaGVQcm94eS5pbnZlcnNlKTtcbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgcHVibGljIGFic3RyYWN0IHNldEluaXRTdGF0ZSgpOiB2b2lkO1xuICBwdWJsaWMgYWJzdHJhY3QgdXBkYXRlKCk6IHZvaWQ7XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBkZWNvbXBvc2VQb3NpdGlvbiB9IGZyb20gJy4vdXRpbHMvZGVjb21wb3NlUG9zaXRpb24nO1xuaW1wb3J0IHsgZGVjb21wb3NlUm90YXRpb24gfSBmcm9tICcuL3V0aWxzL2RlY29tcG9zZVJvdGF0aW9uJztcbmltcG9ydCB7IHF1YXRJbnZlcnRDb21wYXQgfSBmcm9tICcuL3V0aWxzL3F1YXRJbnZlcnRDb21wYXQnO1xuaW1wb3J0IHsgc2V0QWltUXVhdGVybmlvbiB9IGZyb20gJy4vdXRpbHMvc2V0QWltUXVhdGVybmlvbic7XG5pbXBvcnQgeyBWUk1Ob2RlQ29uc3RyYWludCB9IGZyb20gJy4vVlJNTm9kZUNvbnN0cmFpbnQnO1xuXG5jb25zdCBRVUFUX0lERU5USVRZID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oMCwgMCwgMCwgMSk7XG5cbmNvbnN0IF9xdWF0QSA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5jb25zdCBfcXVhdEIgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuY29uc3QgX21hdEEgPSBuZXcgVEhSRUUuTWF0cml4NCgpO1xuY29uc3QgX3YzR2V0Um90YXRpb25Qb3MgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3YzR2V0Um90YXRpb25EaXIgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5leHBvcnQgY2xhc3MgVlJNQWltQ29uc3RyYWludCBleHRlbmRzIFZSTU5vZGVDb25zdHJhaW50IHtcbiAgLyoqXG4gICAqIFJlcHJlc2VudHMgdGhlIGFpbSB2ZWN0b3IgdXNlZCBmb3IgcmVmZXJlbmNlIG9mIGFpbSByb3RhdGlvbi5cbiAgICogSXQgbXVzdCBiZSBub3JtYWxpemVkLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGFpbVZlY3RvciA9IG5ldyBUSFJFRS5WZWN0b3IzKDAuMCwgMC4wLCAxLjApO1xuXG4gIC8qKlxuICAgKiBSZXByZXNlbnRzIHRoZSB1cCB2ZWN0b3IgdXNlZCBmb3IgY2FsY3VsYXRpb24gb2YgYWltIHJvdGF0aW9uLlxuICAgKiBJdCBtdXN0IGJlIG5vcm1hbGl6ZWQuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgdXBWZWN0b3IgPSBuZXcgVEhSRUUuVmVjdG9yMygwLjAsIDEuMCwgMC4wKTtcblxuICBwdWJsaWMgZnJlZXplQXhlczogW2Jvb2xlYW4sIGJvb2xlYW5dID0gW3RydWUsIHRydWVdO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgX3F1YXRJbml0QWltID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbiAgcHJpdmF0ZSByZWFkb25seSBfcXVhdEludkluaXRBaW0gPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuICBwcml2YXRlIHJlYWRvbmx5IF9xdWF0SW5pdERzdCA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5cbiAgcHVibGljIHNldEluaXRTdGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9nZXREZXN0aW5hdGlvbk1hdHJpeChfbWF0QSk7XG4gICAgZGVjb21wb3NlUm90YXRpb24oX21hdEEsIHRoaXMuX3F1YXRJbml0RHN0KTtcblxuICAgIHRoaXMuX2dldEFpbVF1YXQodGhpcy5fcXVhdEluaXRBaW0pO1xuICAgIHF1YXRJbnZlcnRDb21wYXQodGhpcy5fcXVhdEludkluaXRBaW0uY29weSh0aGlzLl9xdWF0SW5pdEFpbSkpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kZXN0aW5hdGlvblNwYWNlID09PSAnbG9jYWwnKSB7XG4gICAgICAvLyByZXNldCByb3RhdGlvblxuICAgICAgdGhpcy5vYmplY3QucXVhdGVybmlvbi5jb3B5KFFVQVRfSURFTlRJVFkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBiYWNrIHRvIHRoZSBpbml0aWFsIHJvdGF0aW9uIGluIHdvcmxkIHNwYWNlXG4gICAgICB0aGlzLl9nZXRQYXJlbnRNYXRyaXhJbk1vZGVsU3BhY2UoX21hdEEpO1xuICAgICAgZGVjb21wb3NlUm90YXRpb24oX21hdEEsIF9xdWF0QSk7XG4gICAgICBxdWF0SW52ZXJ0Q29tcGF0KHRoaXMub2JqZWN0LnF1YXRlcm5pb24uY29weShfcXVhdEEpKTtcbiAgICB9XG5cbiAgICAvLyBhaW0gdG93YXJkIHRoZSB0YXJnZXRcbiAgICB0aGlzLl9nZXRBaW1EaWZmUXVhdChfcXVhdEIpO1xuICAgIHRoaXMub2JqZWN0LnF1YXRlcm5pb24ubXVsdGlwbHkoX3F1YXRCKTtcblxuICAgIC8vIGFwcGx5IHRoZSBpbml0aWFsIHJvdGF0aW9uXG4gICAgdGhpcy5vYmplY3QucXVhdGVybmlvbi5tdWx0aXBseSh0aGlzLl9xdWF0SW5pdERzdCk7XG5cbiAgICAvLyBkb25lXG4gICAgdGhpcy5vYmplY3QudXBkYXRlTWF0cml4KCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGEgcXVhdGVybmlvbiB0aGF0IHJlcHJlc2VudHMgYSBkaWZmIGZyb20gdGhlIGluaXRpYWwgLT4gY3VycmVudCBvcmllbnRhdGlvbiBvZiB0aGUgYWltIGRpcmVjdGlvbi5cbiAgICogSXQncyBhd2FyZSBvZiBpdHMge0BsaW5rIHNvdXJjZVNwYWNlfSwge0BsaW5rIGZyZWV6ZUF4ZXN9LCBhbmQge0BsaW5rIHdlaWdodH0uXG4gICAqIEBwYXJhbSB0YXJnZXQgVGFyZ2V0IHF1YXRlcm5pb25cbiAgICovXG4gIHByaXZhdGUgX2dldEFpbURpZmZRdWF0PFQgZXh0ZW5kcyBUSFJFRS5RdWF0ZXJuaW9uPih0YXJnZXQ6IFQpOiBUIHtcbiAgICB0aGlzLl9nZXRBaW1RdWF0KHRhcmdldCk7XG4gICAgdGFyZ2V0Lm11bHRpcGx5KHRoaXMuX3F1YXRJbnZJbml0QWltKTtcblxuICAgIHRhcmdldC5zbGVycChRVUFUX0lERU5USVRZLCAxLjAgLSB0aGlzLndlaWdodCk7XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhIGN1cnJlbnQgb3JpZW50YXRpb24gb2YgdGhlIGFpbSBkaXJlY3Rpb24uXG4gICAqIEl0J3MgYXdhcmUgb2YgaXRzIHtAbGluayBzb3VyY2VTcGFjZX0gYW5kIHtAbGluayBmcmVlemVBeGVzfS5cbiAgICogQHBhcmFtIHRhcmdldCBUYXJnZXQgcXVhdGVybmlvblxuICAgKi9cbiAgcHJpdmF0ZSBfZ2V0QWltUXVhdDxUIGV4dGVuZHMgVEhSRUUuUXVhdGVybmlvbj4odGFyZ2V0OiBUKTogVCB7XG4gICAgcmV0dXJuIHNldEFpbVF1YXRlcm5pb24oXG4gICAgICB0YXJnZXQsXG4gICAgICB0aGlzLl9nZXREZXN0aW5hdGlvblBvc2l0aW9uKF92M0dldFJvdGF0aW9uUG9zKSxcbiAgICAgIHRoaXMuX2dldFNvdXJjZVBvc2l0aW9uKF92M0dldFJvdGF0aW9uRGlyKSxcbiAgICAgIHRoaXMuYWltVmVjdG9yLFxuICAgICAgdGhpcy51cFZlY3RvcixcbiAgICAgIHRoaXMuZnJlZXplQXhlcyxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgY3VycmVudCBwb3NpdGlvbiBvZiB0aGUgb2JqZWN0LlxuICAgKiBJdCdzIGF3YXJlIG9mIGl0cyB7QGxpbmsgc291cmNlU3BhY2V9LlxuICAgKiBAcGFyYW0gdGFyZ2V0IFRhcmdldCBxdWF0ZXJuaW9uXG4gICAqL1xuICBwcml2YXRlIF9nZXREZXN0aW5hdGlvblBvc2l0aW9uPFQgZXh0ZW5kcyBUSFJFRS5WZWN0b3IzPih0YXJnZXQ6IFQpOiBUIHtcbiAgICB0YXJnZXQuc2V0KDAuMCwgMC4wLCAwLjApO1xuXG4gICAgdGhpcy5fZ2V0RGVzdGluYXRpb25NYXRyaXgoX21hdEEpO1xuICAgIGRlY29tcG9zZVBvc2l0aW9uKF9tYXRBLCB0YXJnZXQpO1xuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGN1cnJlbnQgcG9zaXRpb24gb2YgdGhlIHNvdXJjZS5cbiAgICogSXQncyBhd2FyZSBvZiBpdHMge0BsaW5rIHNvdXJjZVNwYWNlfS5cbiAgICogQHBhcmFtIHRhcmdldCBUYXJnZXQgcXVhdGVybmlvblxuICAgKi9cbiAgcHJpdmF0ZSBfZ2V0U291cmNlUG9zaXRpb248VCBleHRlbmRzIFRIUkVFLlZlY3RvcjM+KHRhcmdldDogVCk6IFQge1xuICAgIHRhcmdldC5zZXQoMC4wLCAwLjAsIDAuMCk7XG5cbiAgICBpZiAodGhpcy5fc291cmNlKSB7XG4gICAgICB0aGlzLl9nZXRTb3VyY2VNYXRyaXgoX21hdEEpO1xuICAgICAgZGVjb21wb3NlUG9zaXRpb24oX21hdEEsIHRhcmdldCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxufVxuIiwiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19jcmVhdGVCaW5kaW5nID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9KTtcclxufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBvW2syXSA9IG1ba107XHJcbn0pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBvKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIHApKSBfX2NyZWF0ZUJpbmRpbmcobywgbSwgcCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XHJcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICByZXR1cm4gcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXkodG8sIGZyb20pIHtcclxuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IGZyb20ubGVuZ3RoLCBqID0gdG8ubGVuZ3RoOyBpIDwgaWw7IGkrKywgaisrKVxyXG4gICAgICAgIHRvW2pdID0gZnJvbVtpXTtcclxuICAgIHJldHVybiB0bztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xyXG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xyXG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgcHJpdmF0ZU1hcCkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIGdldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwcml2YXRlTWFwLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBwcml2YXRlTWFwLCB2YWx1ZSkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIHNldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHByaXZhdGVNYXAuc2V0KHJlY2VpdmVyLCB2YWx1ZSk7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuIiwiaW1wb3J0IHR5cGUgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiB0cmF2ZXJzZUFuY2VzdG9yc0Zyb21Sb290KG9iamVjdDogVEhSRUUuT2JqZWN0M0QsIGNhbGxiYWNrOiAob2JqZWN0OiBUSFJFRS5PYmplY3QzRCkgPT4gdm9pZCk6IHZvaWQge1xuICBjb25zdCBhbmNlc3RvcnM6IFRIUkVFLk9iamVjdDNEW10gPSBbXTtcblxuICBsZXQgaGVhZDogVEhSRUUuT2JqZWN0M0QgfCBudWxsID0gb2JqZWN0O1xuICB3aGlsZSAoaGVhZCAhPT0gbnVsbCkge1xuICAgIGFuY2VzdG9ycy51bnNoaWZ0KGhlYWQpO1xuICAgIGhlYWQgPSBoZWFkLnBhcmVudDtcbiAgfVxuXG4gIGFuY2VzdG9ycy5mb3JFYWNoKChhbmNlc3RvcikgPT4ge1xuICAgIGNhbGxiYWNrKGFuY2VzdG9yKTtcbiAgfSk7XG59XG4iLCJpbXBvcnQgdHlwZSAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB0eXBlIHsgVlJNTm9kZUNvbnN0cmFpbnQgfSBmcm9tICcuL1ZSTU5vZGVDb25zdHJhaW50JztcbmltcG9ydCB7IHRyYXZlcnNlQW5jZXN0b3JzRnJvbVJvb3QgfSBmcm9tICcuL3V0aWxzL3RyYXZlcnNlQW5jZXN0b3JzRnJvbVJvb3QnO1xuXG5leHBvcnQgY2xhc3MgVlJNTm9kZUNvbnN0cmFpbnRNYW5hZ2VyIHtcbiAgcHJpdmF0ZSBfY29uc3RyYWludHMgPSBuZXcgU2V0PFZSTU5vZGVDb25zdHJhaW50PigpO1xuICBwdWJsaWMgZ2V0IGNvbnN0cmFpbnRzKCk6IFNldDxWUk1Ob2RlQ29uc3RyYWludD4ge1xuICAgIHJldHVybiB0aGlzLl9jb25zdHJhaW50cztcbiAgfVxuXG4gIHByaXZhdGUgX29iamVjdENvbnN0cmFpbnRzTWFwID0gbmV3IE1hcDxUSFJFRS5PYmplY3QzRCwgU2V0PFZSTU5vZGVDb25zdHJhaW50Pj4oKTtcblxuICBwdWJsaWMgYWRkQ29uc3RyYWludChjb25zdHJhaW50OiBWUk1Ob2RlQ29uc3RyYWludCk6IHZvaWQge1xuICAgIHRoaXMuX2NvbnN0cmFpbnRzLmFkZChjb25zdHJhaW50KTtcblxuICAgIGxldCBvYmplY3RTZXQgPSB0aGlzLl9vYmplY3RDb25zdHJhaW50c01hcC5nZXQoY29uc3RyYWludC5vYmplY3QpO1xuICAgIGlmIChvYmplY3RTZXQgPT0gbnVsbCkge1xuICAgICAgb2JqZWN0U2V0ID0gbmV3IFNldDxWUk1Ob2RlQ29uc3RyYWludD4oKTtcbiAgICAgIHRoaXMuX29iamVjdENvbnN0cmFpbnRzTWFwLnNldChjb25zdHJhaW50Lm9iamVjdCwgb2JqZWN0U2V0KTtcbiAgICB9XG4gICAgb2JqZWN0U2V0LmFkZChjb25zdHJhaW50KTtcbiAgfVxuXG4gIHB1YmxpYyBkZWxldGVDb25zdHJhaW50KGNvbnN0cmFpbnQ6IFZSTU5vZGVDb25zdHJhaW50KTogdm9pZCB7XG4gICAgdGhpcy5fY29uc3RyYWludHMuZGVsZXRlKGNvbnN0cmFpbnQpO1xuXG4gICAgY29uc3Qgb2JqZWN0U2V0ID0gdGhpcy5fb2JqZWN0Q29uc3RyYWludHNNYXAuZ2V0KGNvbnN0cmFpbnQub2JqZWN0KSE7XG4gICAgb2JqZWN0U2V0LmRlbGV0ZShjb25zdHJhaW50KTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRJbml0U3RhdGUoKTogdm9pZCB7XG4gICAgY29uc3QgY29uc3RyYWludHNUcmllZCA9IG5ldyBTZXQ8VlJNTm9kZUNvbnN0cmFpbnQ+KCk7XG4gICAgY29uc3QgY29uc3RyYWludHNEb25lID0gbmV3IFNldDxWUk1Ob2RlQ29uc3RyYWludD4oKTtcblxuICAgIGZvciAoY29uc3QgY29uc3RyYWludCBvZiB0aGlzLl9jb25zdHJhaW50cykge1xuICAgICAgdGhpcy5fcHJvY2Vzc0NvbnN0cmFpbnQoY29uc3RyYWludCwgY29uc3RyYWludHNUcmllZCwgY29uc3RyYWludHNEb25lLCAoY29uc3RyYWludCkgPT4gY29uc3RyYWludC5zZXRJbml0U3RhdGUoKSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBjb25zdCBjb25zdHJhaW50c1RyaWVkID0gbmV3IFNldDxWUk1Ob2RlQ29uc3RyYWludD4oKTtcbiAgICBjb25zdCBjb25zdHJhaW50c0RvbmUgPSBuZXcgU2V0PFZSTU5vZGVDb25zdHJhaW50PigpO1xuXG4gICAgZm9yIChjb25zdCBjb25zdHJhaW50IG9mIHRoaXMuX2NvbnN0cmFpbnRzKSB7XG4gICAgICB0aGlzLl9wcm9jZXNzQ29uc3RyYWludChjb25zdHJhaW50LCBjb25zdHJhaW50c1RyaWVkLCBjb25zdHJhaW50c0RvbmUsIChjb25zdHJhaW50KSA9PiBjb25zdHJhaW50LnVwZGF0ZSgpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIGEgY29uc3RyYWludC5cbiAgICogSWYgdGhlcmUgYXJlIG90aGVyIGNvbnN0cmFpbnRzIHRoYXQgYXJlIGRlcGVuZGFudCwgaXQgd2lsbCB0cnkgdG8gdXBkYXRlIHRoZW0gcmVjdXJzaXZlbHkuXG4gICAqIEl0IG1pZ2h0IHRocm93IGFuIGVycm9yIGlmIHRoZXJlIGFyZSBjaXJjdWxhciBkZXBlbmRlbmNpZXMuXG4gICAqXG4gICAqIEludGVuZGVkIHRvIGJlIHVzZWQgaW4ge0BsaW5rIHVwZGF0ZX0gYW5kIHtAbGluayBfcHJvY2Vzc0NvbnN0cmFpbnR9IGl0c2VsZiByZWN1cnNpdmVseS5cbiAgICpcbiAgICogQHBhcmFtIGNvbnN0cmFpbnQgQSBjb25zdHJhaW50IHlvdSB3YW50IHRvIHVwZGF0ZVxuICAgKiBAcGFyYW0gY29uc3RyYWludHNUcmllZCBTZXQgb2YgY29uc3RyYWludHMgdGhhdCBhcmUgYWxyZWFkeSB0cmllZCB0byBiZSB1cGRhdGVkXG4gICAqIEBwYXJhbSBjb25zdHJhaW50c0RvbmUgU2V0IG9mIGNvbnN0cmFpbnRzIHRoYXQgYXJlIGFscmVhZHkgdXAgdG8gZGF0ZVxuICAgKi9cbiAgcHJpdmF0ZSBfcHJvY2Vzc0NvbnN0cmFpbnQoXG4gICAgY29uc3RyYWludDogVlJNTm9kZUNvbnN0cmFpbnQsXG4gICAgY29uc3RyYWludHNUcmllZDogU2V0PFZSTU5vZGVDb25zdHJhaW50PixcbiAgICBjb25zdHJhaW50c0RvbmU6IFNldDxWUk1Ob2RlQ29uc3RyYWludD4sXG4gICAgY2FsbGJhY2s6IChjb25zdHJhaW50OiBWUk1Ob2RlQ29uc3RyYWludCkgPT4gdm9pZCxcbiAgKTogdm9pZCB7XG4gICAgaWYgKGNvbnN0cmFpbnRzRG9uZS5oYXMoY29uc3RyYWludCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoY29uc3RyYWludHNUcmllZC5oYXMoY29uc3RyYWludCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVlJNQ29uc3RyYWludE1hbmFnZXI6IENpcmN1bGFyIGRlcGVuZGVuY3kgZGV0ZWN0ZWQgd2hpbGUgdXBkYXRpbmcgY29uc3RyYWludHMnKTtcbiAgICB9XG4gICAgY29uc3RyYWludHNUcmllZC5hZGQoY29uc3RyYWludCk7XG5cbiAgICBjb25zdCBkZXBPYmplY3RzID0gY29uc3RyYWludC5kZXBlbmRlbmNpZXM7XG4gICAgZm9yIChjb25zdCBkZXBPYmplY3Qgb2YgZGVwT2JqZWN0cykge1xuICAgICAgdHJhdmVyc2VBbmNlc3RvcnNGcm9tUm9vdChkZXBPYmplY3QsIChkZXBPYmplY3RBbmNlc3RvcikgPT4ge1xuICAgICAgICBjb25zdCBvYmplY3RTZXQgPSB0aGlzLl9vYmplY3RDb25zdHJhaW50c01hcC5nZXQoZGVwT2JqZWN0QW5jZXN0b3IpO1xuICAgICAgICBpZiAob2JqZWN0U2V0KSB7XG4gICAgICAgICAgZm9yIChjb25zdCBkZXBDb25zdHJhaW50IG9mIG9iamVjdFNldCkge1xuICAgICAgICAgICAgdGhpcy5fcHJvY2Vzc0NvbnN0cmFpbnQoZGVwQ29uc3RyYWludCwgY29uc3RyYWludHNUcmllZCwgY29uc3RyYWludHNEb25lLCBjYWxsYmFjayk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjYWxsYmFjayhjb25zdHJhaW50KTtcblxuICAgIGNvbnN0cmFpbnRzRG9uZS5hZGQoY29uc3RyYWludCk7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuZXhwb3J0IGZ1bmN0aW9uIHZlY3RvcjNGcmVlemVBeGVzPFQgZXh0ZW5kcyBUSFJFRS5WZWN0b3IzPih0YXJnZXQ6IFQsIGZyZWV6ZTogW2Jvb2xlYW4sIGJvb2xlYW4sIGJvb2xlYW5dKTogVCB7XG4gIGlmIChmcmVlemVbMF0gJiYgZnJlZXplWzFdICYmIGZyZWV6ZVsyXSkge1xuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cbiAgaWYgKCFmcmVlemVbMF0gJiYgIWZyZWV6ZVsxXSAmJiAhZnJlZXplWzJdKSB7XG4gICAgcmV0dXJuIHRhcmdldC5zZXQoMC4wLCAwLjAsIDAuMCk7XG4gIH1cblxuICBpZiAoIWZyZWV6ZVswXSkge1xuICAgIHRhcmdldC54ICo9IDAuMDtcbiAgfVxuICBpZiAoIWZyZWV6ZVsxXSkge1xuICAgIHRhcmdldC55ICo9IDAuMDtcbiAgfVxuICBpZiAoIWZyZWV6ZVsyXSkge1xuICAgIHRhcmdldC56ICo9IDAuMDtcbiAgfVxuICByZXR1cm4gdGFyZ2V0O1xufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgZGVjb21wb3NlUG9zaXRpb24gfSBmcm9tICcuL3V0aWxzL2RlY29tcG9zZVBvc2l0aW9uJztcbmltcG9ydCB7IG1hdDRJbnZlcnRDb21wYXQgfSBmcm9tICcuL3V0aWxzL21hdDRJbnZlcnRDb21wYXQnO1xuaW1wb3J0IHsgdmVjdG9yM0ZyZWV6ZUF4ZXMgfSBmcm9tICcuL3V0aWxzL3ZlY3RvcjNGcmVlemVBeGVzJztcbmltcG9ydCB7IFZSTU5vZGVDb25zdHJhaW50IH0gZnJvbSAnLi9WUk1Ob2RlQ29uc3RyYWludCc7XG5cbmNvbnN0IF9tYXRBID0gbmV3IFRIUkVFLk1hdHJpeDQoKTtcblxuZXhwb3J0IGNsYXNzIFZSTVBvc2l0aW9uQ29uc3RyYWludCBleHRlbmRzIFZSTU5vZGVDb25zdHJhaW50IHtcbiAgcHVibGljIGZyZWV6ZUF4ZXM6IFtib29sZWFuLCBib29sZWFuLCBib29sZWFuXSA9IFt0cnVlLCB0cnVlLCB0cnVlXTtcblxuICBwcml2YXRlIF92M0luaXREc3QgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuICBwcml2YXRlIF92M0luaXRTcmMgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4gIHB1YmxpYyBzZXRJbml0U3RhdGUoKTogdm9pZCB7XG4gICAgdGhpcy5fdjNJbml0RHN0LmNvcHkodGhpcy5vYmplY3QucG9zaXRpb24pO1xuXG4gICAgdGhpcy5fZ2V0U291cmNlUG9zaXRpb24odGhpcy5fdjNJbml0U3JjKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgdGhpcy5fZ2V0U291cmNlRGlmZlBvc2l0aW9uKHRoaXMub2JqZWN0LnBvc2l0aW9uKTtcblxuICAgIGlmICh0aGlzLmRlc3RpbmF0aW9uU3BhY2UgPT09ICdtb2RlbCcpIHtcbiAgICAgIG1hdDRJbnZlcnRDb21wYXQodGhpcy5fZ2V0UGFyZW50TWF0cml4SW5Nb2RlbFNwYWNlKF9tYXRBKSk7XG5cbiAgICAgIC8vIHJlbW92ZSB0cmFuc2xhdGlvblxuICAgICAgX21hdEEuZWxlbWVudHNbMTJdID0gMDtcbiAgICAgIF9tYXRBLmVsZW1lbnRzWzEzXSA9IDA7XG4gICAgICBfbWF0QS5lbGVtZW50c1sxNF0gPSAwO1xuXG4gICAgICB0aGlzLm9iamVjdC5wb3NpdGlvbi5hcHBseU1hdHJpeDQoX21hdEEpO1xuICAgIH1cblxuICAgIHRoaXMub2JqZWN0LnBvc2l0aW9uLmFkZCh0aGlzLl92M0luaXREc3QpO1xuXG4gICAgdGhpcy5vYmplY3QudXBkYXRlTWF0cml4KCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGEgdmVjdG9yIHRoYXQgcmVwcmVzZW50cyBhIGRpZmYgZnJvbSB0aGUgaW5pdGlhbCAtPiBjdXJyZW50IHBvc2l0aW9uIG9mIHRoZSBzb3VyY2UuXG4gICAqIEl0J3MgYXdhcmUgb2YgaXRzIHtAbGluayBzb3VyY2VTcGFjZX0sIHtAbGluayBmcmVlemVBeGVzfSwgYW5kIHtAbGluayB3ZWlnaHR9LlxuICAgKiBAcGFyYW0gdGFyZ2V0IFRhcmdldCBxdWF0ZXJuaW9uXG4gICAqL1xuICBwcml2YXRlIF9nZXRTb3VyY2VEaWZmUG9zaXRpb248VCBleHRlbmRzIFRIUkVFLlZlY3RvcjM+KHRhcmdldDogVCk6IFQge1xuICAgIHRoaXMuX2dldFNvdXJjZVBvc2l0aW9uKHRhcmdldCk7XG4gICAgdGFyZ2V0LnN1Yih0aGlzLl92M0luaXRTcmMpO1xuXG4gICAgdmVjdG9yM0ZyZWV6ZUF4ZXModGFyZ2V0LCB0aGlzLmZyZWV6ZUF4ZXMpO1xuXG4gICAgdGFyZ2V0Lm11bHRpcGx5U2NhbGFyKHRoaXMud2VpZ2h0KTtcblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBjdXJyZW50IHBvc2l0aW9uIG9mIHRoZSBzb3VyY2UuXG4gICAqIEl0J3MgYXdhcmUgb2YgaXRzIHtAbGluayBzb3VyY2VTcGFjZX0uXG4gICAqIEBwYXJhbSB0YXJnZXQgVGFyZ2V0IHF1YXRlcm5pb25cbiAgICovXG4gIHByaXZhdGUgX2dldFNvdXJjZVBvc2l0aW9uPFQgZXh0ZW5kcyBUSFJFRS5WZWN0b3IzPih0YXJnZXQ6IFQpOiBUIHtcbiAgICB0YXJnZXQuc2V0KDAuMCwgMC4wLCAwLjApO1xuXG4gICAgaWYgKHRoaXMuX3NvdXJjZSkge1xuICAgICAgdGhpcy5fZ2V0U291cmNlTWF0cml4KF9tYXRBKTtcbiAgICAgIGRlY29tcG9zZVBvc2l0aW9uKF9tYXRBLCB0YXJnZXQpO1xuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuY29uc3QgUVVBVF9JREVOVElUWSA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKDAsIDAsIDAsIDEpO1xuXG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuLyoqXG4gKiBDb21wdXRlIGFuIGV4cG9uZW50aWFsIG9mIGEgcXVhdGVybmlvbi4gRGVzdHJ1Y3RpdmUuXG4gKiBAcGFyYW0gdGFyZ2V0IEEgcXVhdGVybmlvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHF1YXRFeHA8VCBleHRlbmRzIFRIUkVFLlF1YXRlcm5pb24+KHRhcmdldDogVCk6IFQge1xuICBfdjNBLnNldCh0YXJnZXQueCwgdGFyZ2V0LnksIHRhcmdldC56KTtcbiAgY29uc3Qgdk5vcm0gPSBfdjNBLmxlbmd0aCgpO1xuXG4gIGNvbnN0IG0gPSBNYXRoLmV4cCh0YXJnZXQudyk7XG4gIGNvbnN0IHMgPSB2Tm9ybSA8IE51bWJlci5FUFNJTE9OID8gMC4wIDogKG0gKiBNYXRoLnNpbih2Tm9ybSkpIC8gdk5vcm07XG5cbiAgdGFyZ2V0LnNldChzICogdGFyZ2V0LngsIHMgKiB0YXJnZXQueSwgcyAqIHRhcmdldC56LCBtICogTWF0aC5jb3Modk5vcm0pKTtcblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG4vKipcbiAqIENvbXB1dGUgYSBsb2dhcml0aG0gb2YgYSBxdWF0ZXJuaW9uLiBEZXN0cnVjdGl2ZS5cbiAqIEBwYXJhbSB0YXJnZXQgQSBxdWF0ZXJuaW9uLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcXVhdExvZzxUIGV4dGVuZHMgVEhSRUUuUXVhdGVybmlvbj4odGFyZ2V0OiBUKTogVCB7XG4gIF92M0Euc2V0KHRhcmdldC54LCB0YXJnZXQueSwgdGFyZ2V0LnopO1xuICBjb25zdCB2Tm9ybSA9IF92M0EubGVuZ3RoKCk7XG5cbiAgY29uc3QgdCA9IHZOb3JtIDwgTnVtYmVyLkVQU0lMT04gPyAwLjAgOiBNYXRoLmF0YW4yKHZOb3JtLCB0YXJnZXQudykgLyB2Tm9ybTtcblxuICB0YXJnZXQuc2V0KHQgKiB0YXJnZXQueCwgdCAqIHRhcmdldC55LCB0ICogdGFyZ2V0LnosIDAuNSAqIE1hdGgubG9nKHRhcmdldC5sZW5ndGhTcSgpKSk7XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHF1YXRlcm5pb25GcmVlemVBeGVzPFQgZXh0ZW5kcyBUSFJFRS5RdWF0ZXJuaW9uPih0YXJnZXQ6IFQsIGZyZWV6ZTogW2Jvb2xlYW4sIGJvb2xlYW4sIGJvb2xlYW5dKTogVCB7XG4gIGlmIChmcmVlemVbMF0gJiYgZnJlZXplWzFdICYmIGZyZWV6ZVsyXSkge1xuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cbiAgaWYgKCFmcmVlemVbMF0gJiYgIWZyZWV6ZVsxXSAmJiAhZnJlZXplWzJdKSB7XG4gICAgcmV0dXJuIHRhcmdldC5jb3B5KFFVQVRfSURFTlRJVFkpO1xuICB9XG5cbiAgcXVhdExvZyh0YXJnZXQpO1xuXG4gIGlmICghZnJlZXplWzBdKSB7XG4gICAgdGFyZ2V0LnggKj0gMC4wO1xuICB9XG4gIGlmICghZnJlZXplWzFdKSB7XG4gICAgdGFyZ2V0LnkgKj0gMC4wO1xuICB9XG4gIGlmICghZnJlZXplWzJdKSB7XG4gICAgdGFyZ2V0LnogKj0gMC4wO1xuICB9XG5cbiAgcmV0dXJuIHF1YXRFeHAodGFyZ2V0KTtcbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IGRlY29tcG9zZVJvdGF0aW9uIH0gZnJvbSAnLi91dGlscy9kZWNvbXBvc2VSb3RhdGlvbic7XG5pbXBvcnQgeyBxdWF0ZXJuaW9uRnJlZXplQXhlcyB9IGZyb20gJy4vdXRpbHMvcXVhdGVybmlvbkZyZWV6ZUF4ZXMnO1xuaW1wb3J0IHsgcXVhdEludmVydENvbXBhdCB9IGZyb20gJy4vdXRpbHMvcXVhdEludmVydENvbXBhdCc7XG5pbXBvcnQgeyBWUk1Ob2RlQ29uc3RyYWludCB9IGZyb20gJy4vVlJNTm9kZUNvbnN0cmFpbnQnO1xuXG5jb25zdCBRVUFUX0lERU5USVRZID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oMCwgMCwgMCwgMSk7XG5cbmNvbnN0IF9tYXRBID0gbmV3IFRIUkVFLk1hdHJpeDQoKTtcbmNvbnN0IF9xdWF0QSA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5jb25zdCBfcXVhdEIgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXG5leHBvcnQgY2xhc3MgVlJNUm90YXRpb25Db25zdHJhaW50IGV4dGVuZHMgVlJNTm9kZUNvbnN0cmFpbnQge1xuICBwdWJsaWMgZnJlZXplQXhlczogW2Jvb2xlYW4sIGJvb2xlYW4sIGJvb2xlYW5dID0gW3RydWUsIHRydWUsIHRydWVdO1xuXG4gIHByaXZhdGUgX3F1YXRJbml0U3JjID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbiAgcHJpdmF0ZSBfcXVhdEludkluaXRTcmMgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuICBwcml2YXRlIF9xdWF0SW5pdERzdCA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5cbiAgcHVibGljIHNldEluaXRTdGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9xdWF0SW5pdERzdC5jb3B5KHRoaXMub2JqZWN0LnF1YXRlcm5pb24pO1xuXG4gICAgdGhpcy5fZ2V0U291cmNlUXVhdCh0aGlzLl9xdWF0SW5pdFNyYyk7XG4gICAgcXVhdEludmVydENvbXBhdCh0aGlzLl9xdWF0SW52SW5pdFNyYy5jb3B5KHRoaXMuX3F1YXRJbml0U3JjKSk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRlc3RpbmF0aW9uU3BhY2UgPT09ICdsb2NhbCcpIHtcbiAgICAgIHRoaXMub2JqZWN0LnF1YXRlcm5pb24uY29weSh0aGlzLl9xdWF0SW5pdERzdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2dldFBhcmVudE1hdHJpeEluTW9kZWxTcGFjZShfbWF0QSk7XG4gICAgICBkZWNvbXBvc2VSb3RhdGlvbihfbWF0QSwgX3F1YXRBKTtcbiAgICAgIHF1YXRJbnZlcnRDb21wYXQodGhpcy5vYmplY3QucXVhdGVybmlvbi5jb3B5KF9xdWF0QSkpO1xuICAgIH1cblxuICAgIHRoaXMuX2dldFNvdXJjZURpZmZRdWF0KF9xdWF0Qik7XG4gICAgdGhpcy5vYmplY3QucXVhdGVybmlvbi5tdWx0aXBseShfcXVhdEIpO1xuXG4gICAgaWYgKHRoaXMuZGVzdGluYXRpb25TcGFjZSA9PT0gJ21vZGVsJykge1xuICAgICAgdGhpcy5vYmplY3QucXVhdGVybmlvbi5tdWx0aXBseShfcXVhdEEpO1xuICAgICAgdGhpcy5vYmplY3QucXVhdGVybmlvbi5tdWx0aXBseSh0aGlzLl9xdWF0SW5pdERzdCk7XG4gICAgfVxuXG4gICAgdGhpcy5vYmplY3QudXBkYXRlTWF0cml4KCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGEgcXVhdGVybmlvbiB0aGF0IHJlcHJlc2VudHMgYSBkaWZmIGZyb20gdGhlIGluaXRpYWwgLT4gY3VycmVudCBvcmllbnRhdGlvbiBvZiB0aGUgc291cmNlLlxuICAgKiBJdCdzIGF3YXJlIG9mIGl0cyB7QGxpbmsgc291cmNlU3BhY2V9LCB7QGxpbmsgZnJlZXplQXhlc30sIGFuZCB7QGxpbmsgd2VpZ2h0fS5cbiAgICogQHBhcmFtIHRhcmdldCBUYXJnZXQgcXVhdGVybmlvblxuICAgKi9cbiAgcHJpdmF0ZSBfZ2V0U291cmNlRGlmZlF1YXQ8VCBleHRlbmRzIFRIUkVFLlF1YXRlcm5pb24+KHRhcmdldDogVCk6IFQge1xuICAgIHRoaXMuX2dldFNvdXJjZVF1YXQodGFyZ2V0KTtcbiAgICBpZiAodGhpcy5zb3VyY2VTcGFjZSA9PT0gJ2xvY2FsJykge1xuICAgICAgdGFyZ2V0LnByZW11bHRpcGx5KHRoaXMuX3F1YXRJbnZJbml0U3JjKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGFyZ2V0Lm11bHRpcGx5KHRoaXMuX3F1YXRJbnZJbml0U3JjKTtcbiAgICB9XG5cbiAgICBxdWF0ZXJuaW9uRnJlZXplQXhlcyh0YXJnZXQsIHRoaXMuZnJlZXplQXhlcyk7XG5cbiAgICB0YXJnZXQuc2xlcnAoUVVBVF9JREVOVElUWSwgMS4wIC0gdGhpcy53ZWlnaHQpO1xuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGN1cnJlbnQgb3JpZW50YXRpb24gb2YgdGhlIHNvdXJjZS5cbiAgICogSXQncyBhd2FyZSBvZiBpdHMge0BsaW5rIHNvdXJjZVNwYWNlfS5cbiAgICogQHBhcmFtIHRhcmdldCBUYXJnZXQgcXVhdGVybmlvblxuICAgKi9cbiAgcHJpdmF0ZSBfZ2V0U291cmNlUXVhdDxUIGV4dGVuZHMgVEhSRUUuUXVhdGVybmlvbj4odGFyZ2V0OiBUKTogVCB7XG4gICAgdGFyZ2V0LmNvcHkoUVVBVF9JREVOVElUWSk7XG5cbiAgICBpZiAodGhpcy5fc291cmNlKSB7XG4gICAgICB0aGlzLl9nZXRTb3VyY2VNYXRyaXgoX21hdEEpO1xuICAgICAgZGVjb21wb3NlUm90YXRpb24oX21hdEEsIHRhcmdldCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxufVxuIiwiaW1wb3J0IHR5cGUgKiBhcyBDb25zdHJhaW50U2NoZW1hIGZyb20gJ0BwaXhpdi90eXBlcy12cm1jLW5vZGUtY29uc3RyYWludC0xLjAnO1xuaW1wb3J0IHR5cGUgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgdHlwZSB7IEdMVEYsIEdMVEZMb2FkZXJQbHVnaW4sIEdMVEZQYXJzZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyJztcbmltcG9ydCB7IFZSTU5vZGVDb25zdHJhaW50SGVscGVyIH0gZnJvbSAnLi9oZWxwZXJzJztcbmltcG9ydCB7IFZSTUFpbUNvbnN0cmFpbnQgfSBmcm9tICcuL1ZSTUFpbUNvbnN0cmFpbnQnO1xuaW1wb3J0IHR5cGUgeyBWUk1Ob2RlQ29uc3RyYWludExvYWRlclBsdWdpbk9wdGlvbnMgfSBmcm9tICcuL1ZSTU5vZGVDb25zdHJhaW50TG9hZGVyUGx1Z2luT3B0aW9ucyc7XG5pbXBvcnQgeyBWUk1Ob2RlQ29uc3RyYWludE1hbmFnZXIgfSBmcm9tICcuL1ZSTU5vZGVDb25zdHJhaW50TWFuYWdlcic7XG5pbXBvcnQgeyBWUk1Qb3NpdGlvbkNvbnN0cmFpbnQgfSBmcm9tICcuL1ZSTVBvc2l0aW9uQ29uc3RyYWludCc7XG5pbXBvcnQgeyBWUk1Sb3RhdGlvbkNvbnN0cmFpbnQgfSBmcm9tICcuL1ZSTVJvdGF0aW9uQ29uc3RyYWludCc7XG5cbmV4cG9ydCBjbGFzcyBWUk1Ob2RlQ29uc3RyYWludExvYWRlclBsdWdpbiBpbXBsZW1lbnRzIEdMVEZMb2FkZXJQbHVnaW4ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEVYVEVOU0lPTl9OQU1FID0gJ1ZSTUNfbm9kZV9jb25zdHJhaW50JztcblxuICAvKipcbiAgICogU3BlY2lmeSBhbiBPYmplY3QzRCB0byBhZGQge0BsaW5rIFZSTU5vZGVDb25zdHJhaW50SGVscGVyfSBzLlxuICAgKiBJZiBub3Qgc3BlY2lmaWVkLCBoZWxwZXIgd2lsbCBub3QgYmUgY3JlYXRlZC5cbiAgICogSWYgYHJlbmRlck9yZGVyYCBpcyBzZXQgdG8gdGhlIHJvb3QsIGhlbHBlcnMgd2lsbCBjb3B5IHRoZSBzYW1lIGByZW5kZXJPcmRlcmAgLlxuICAgKi9cbiAgcHVibGljIGhlbHBlclJvb3Q/OiBUSFJFRS5PYmplY3QzRDtcblxuICBwdWJsaWMgcmVhZG9ubHkgcGFyc2VyOiBHTFRGUGFyc2VyO1xuXG4gIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBWUk1Ob2RlQ29uc3RyYWludExvYWRlclBsdWdpbi5FWFRFTlNJT05fTkFNRTtcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJzZXI6IEdMVEZQYXJzZXIsIG9wdGlvbnM/OiBWUk1Ob2RlQ29uc3RyYWludExvYWRlclBsdWdpbk9wdGlvbnMpIHtcbiAgICB0aGlzLnBhcnNlciA9IHBhcnNlcjtcblxuICAgIHRoaXMuaGVscGVyUm9vdCA9IG9wdGlvbnM/LmhlbHBlclJvb3Q7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgYWZ0ZXJSb290KGdsdGY6IEdMVEYpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBnbHRmLnVzZXJEYXRhLnZybU5vZGVDb25zdHJhaW50TWFuYWdlciA9IGF3YWl0IHRoaXMuX2ltcG9ydChnbHRmKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbXBvcnQgY29uc3RyYWludHMgZnJvbSBhIEdMVEYgYW5kIHJldHVybnMgYSB7QGxpbmsgVlJNTm9kZUNvbnN0cmFpbnRNYW5hZ2VyfS5cbiAgICogSXQgbWlnaHQgcmV0dXJuIGBudWxsYCBpbnN0ZWFkIHdoZW4gaXQgZG9lcyBub3QgbmVlZCB0byBiZSBjcmVhdGVkIG9yIHNvbWV0aGluZyBnbyB3cm9uZy5cbiAgICpcbiAgICogQHBhcmFtIGdsdGYgQSBwYXJzZWQgcmVzdWx0IG9mIEdMVEYgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gICAqL1xuICBwcm90ZWN0ZWQgYXN5bmMgX2ltcG9ydChnbHRmOiBHTFRGKTogUHJvbWlzZTxWUk1Ob2RlQ29uc3RyYWludE1hbmFnZXIgfCBudWxsPiB7XG4gICAgLy8gZWFybHkgYWJvcnQgaWYgaXQgZG9lc24ndCB1c2UgY29uc3RyYWludHNcbiAgICBjb25zdCBpc0NvbnN0cmFpbnRzVXNlZCA9XG4gICAgICB0aGlzLnBhcnNlci5qc29uLmV4dGVuc2lvbnNVc2VkPy5pbmRleE9mKFZSTU5vZGVDb25zdHJhaW50TG9hZGVyUGx1Z2luLkVYVEVOU0lPTl9OQU1FKSAhPT0gLTE7XG4gICAgaWYgKCFpc0NvbnN0cmFpbnRzVXNlZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgbWFuYWdlciA9IG5ldyBWUk1Ob2RlQ29uc3RyYWludE1hbmFnZXIoKTtcbiAgICBjb25zdCB0aHJlZU5vZGVzOiBUSFJFRS5PYmplY3QzRFtdID0gYXdhaXQgdGhpcy5wYXJzZXIuZ2V0RGVwZW5kZW5jaWVzKCdub2RlJyk7XG5cbiAgICAvLyBpbXBvcnQgY29uc3RyYWludHMgZm9yIGVhY2ggbm9kZXNcbiAgICB0aHJlZU5vZGVzLmZvckVhY2goKG5vZGUsIG5vZGVJbmRleCkgPT4ge1xuICAgICAgY29uc3Qgc2NoZW1hTm9kZSA9IHRoaXMucGFyc2VyLmpzb24ubm9kZXNbbm9kZUluZGV4XTtcblxuICAgICAgLy8gY2hlY2sgaWYgdGhlIGV4dGVuc2lvbiB1c2VzIHRoZSBleHRlbnNpb25cbiAgICAgIGNvbnN0IGV4dGVuc2lvbjogQ29uc3RyYWludFNjaGVtYS5WUk1DTm9kZUNvbnN0cmFpbnQgfCB1bmRlZmluZWQgPVxuICAgICAgICBzY2hlbWFOb2RlPy5leHRlbnNpb25zPy5bVlJNTm9kZUNvbnN0cmFpbnRMb2FkZXJQbHVnaW4uRVhURU5TSU9OX05BTUVdO1xuXG4gICAgICBpZiAoZXh0ZW5zaW9uID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzcGVjVmVyc2lvbiA9IGV4dGVuc2lvbi5zcGVjVmVyc2lvbjtcbiAgICAgIGlmIChzcGVjVmVyc2lvbiAhPT0gJzEuMC1kcmFmdCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBpbXBvcnQgY29uc3RyYWludHNcbiAgICAgIGlmIChleHRlbnNpb24/LnBvc2l0aW9uKSB7XG4gICAgICAgIGNvbnN0IGNvbnN0cmFpbnQgPSB0aGlzLl9pbXBvcnRQb3NpdGlvbkNvbnN0cmFpbnQobm9kZSwgdGhyZWVOb2RlcywgZ2x0Zi5zY2VuZSwgZXh0ZW5zaW9uLnBvc2l0aW9uKTtcbiAgICAgICAgbWFuYWdlci5hZGRDb25zdHJhaW50KGNvbnN0cmFpbnQpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZXh0ZW5zaW9uPy5yb3RhdGlvbikge1xuICAgICAgICBjb25zdCBjb25zdHJhaW50ID0gdGhpcy5faW1wb3J0Um90YXRpb25Db25zdHJhaW50KG5vZGUsIHRocmVlTm9kZXMsIGdsdGYuc2NlbmUsIGV4dGVuc2lvbi5yb3RhdGlvbik7XG4gICAgICAgIG1hbmFnZXIuYWRkQ29uc3RyYWludChjb25zdHJhaW50KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGV4dGVuc2lvbj8uYWltKSB7XG4gICAgICAgIGNvbnN0IGNvbnN0cmFpbnQgPSB0aGlzLl9pbXBvcnRBaW1Db25zdHJhaW50KG5vZGUsIHRocmVlTm9kZXMsIGdsdGYuc2NlbmUsIGV4dGVuc2lvbi5haW0pO1xuICAgICAgICBtYW5hZ2VyLmFkZENvbnN0cmFpbnQoY29uc3RyYWludCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBpbml0IGNvbnN0cmFpbnRzXG4gICAgZ2x0Zi5zY2VuZS51cGRhdGVNYXRyaXhXb3JsZCgpO1xuICAgIG1hbmFnZXIuc2V0SW5pdFN0YXRlKCk7XG5cbiAgICByZXR1cm4gbWFuYWdlcjtcbiAgfVxuXG4gIHByb3RlY3RlZCBfaW1wb3J0UG9zaXRpb25Db25zdHJhaW50KFxuICAgIGRlc3RpbmF0aW9uOiBUSFJFRS5PYmplY3QzRCxcbiAgICBub2RlczogVEhSRUUuT2JqZWN0M0RbXSxcbiAgICBtb2RlbFJvb3Q6IFRIUkVFLk9iamVjdDNELFxuICAgIHBvc2l0aW9uOiBDb25zdHJhaW50U2NoZW1hLlBvc2l0aW9uQ29uc3RyYWludCxcbiAgKTogVlJNUG9zaXRpb25Db25zdHJhaW50IHtcbiAgICBjb25zdCB7IHNvdXJjZSwgc291cmNlU3BhY2UsIGRlc3RpbmF0aW9uU3BhY2UsIHdlaWdodCwgZnJlZXplQXhlcyB9ID0gcG9zaXRpb247XG4gICAgY29uc3QgY29uc3RyYWludCA9IG5ldyBWUk1Qb3NpdGlvbkNvbnN0cmFpbnQoZGVzdGluYXRpb24sIG1vZGVsUm9vdCk7XG5cbiAgICBjb25zdHJhaW50LnNldFNvdXJjZShub2Rlc1tzb3VyY2VdKTtcblxuICAgIGlmIChzb3VyY2VTcGFjZSkge1xuICAgICAgY29uc3RyYWludC5zb3VyY2VTcGFjZSA9IHNvdXJjZVNwYWNlO1xuICAgIH1cbiAgICBpZiAoZGVzdGluYXRpb25TcGFjZSkge1xuICAgICAgY29uc3RyYWludC5kZXN0aW5hdGlvblNwYWNlID0gZGVzdGluYXRpb25TcGFjZTtcbiAgICB9XG4gICAgaWYgKHdlaWdodCkge1xuICAgICAgY29uc3RyYWludC53ZWlnaHQgPSB3ZWlnaHQ7XG4gICAgfVxuICAgIGlmIChmcmVlemVBeGVzKSB7XG4gICAgICBjb25zdHJhaW50LmZyZWV6ZUF4ZXMgPSBmcmVlemVBeGVzO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmhlbHBlclJvb3QpIHtcbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBWUk1Ob2RlQ29uc3RyYWludEhlbHBlcihjb25zdHJhaW50KTtcbiAgICAgIHRoaXMuaGVscGVyUm9vdC5hZGQoaGVscGVyKTtcbiAgICAgIGhlbHBlci5yZW5kZXJPcmRlciA9IHRoaXMuaGVscGVyUm9vdC5yZW5kZXJPcmRlcjtcbiAgICB9XG5cbiAgICByZXR1cm4gY29uc3RyYWludDtcbiAgfVxuXG4gIHByb3RlY3RlZCBfaW1wb3J0Um90YXRpb25Db25zdHJhaW50KFxuICAgIGRlc3RpbmF0aW9uOiBUSFJFRS5PYmplY3QzRCxcbiAgICBub2RlczogVEhSRUUuT2JqZWN0M0RbXSxcbiAgICBtb2RlbFJvb3Q6IFRIUkVFLk9iamVjdDNELFxuICAgIHJvdGF0aW9uOiBDb25zdHJhaW50U2NoZW1hLlJvdGF0aW9uQ29uc3RyYWludCxcbiAgKTogVlJNUm90YXRpb25Db25zdHJhaW50IHtcbiAgICBjb25zdCB7IHNvdXJjZSwgc291cmNlU3BhY2UsIGRlc3RpbmF0aW9uU3BhY2UsIHdlaWdodCwgZnJlZXplQXhlcyB9ID0gcm90YXRpb247XG4gICAgY29uc3QgY29uc3RyYWludCA9IG5ldyBWUk1Sb3RhdGlvbkNvbnN0cmFpbnQoZGVzdGluYXRpb24sIG1vZGVsUm9vdCk7XG5cbiAgICBjb25zdHJhaW50LnNldFNvdXJjZShub2Rlc1tzb3VyY2VdKTtcblxuICAgIGlmIChzb3VyY2VTcGFjZSkge1xuICAgICAgY29uc3RyYWludC5zb3VyY2VTcGFjZSA9IHNvdXJjZVNwYWNlO1xuICAgIH1cbiAgICBpZiAoZGVzdGluYXRpb25TcGFjZSkge1xuICAgICAgY29uc3RyYWludC5kZXN0aW5hdGlvblNwYWNlID0gZGVzdGluYXRpb25TcGFjZTtcbiAgICB9XG4gICAgaWYgKHdlaWdodCkge1xuICAgICAgY29uc3RyYWludC53ZWlnaHQgPSB3ZWlnaHQ7XG4gICAgfVxuICAgIGlmIChmcmVlemVBeGVzKSB7XG4gICAgICBjb25zdHJhaW50LmZyZWV6ZUF4ZXMgPSBmcmVlemVBeGVzO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmhlbHBlclJvb3QpIHtcbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBWUk1Ob2RlQ29uc3RyYWludEhlbHBlcihjb25zdHJhaW50KTtcbiAgICAgIHRoaXMuaGVscGVyUm9vdC5hZGQoaGVscGVyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29uc3RyYWludDtcbiAgfVxuXG4gIHByb3RlY3RlZCBfaW1wb3J0QWltQ29uc3RyYWludChcbiAgICBkZXN0aW5hdGlvbjogVEhSRUUuT2JqZWN0M0QsXG4gICAgbm9kZXM6IFRIUkVFLk9iamVjdDNEW10sXG4gICAgbW9kZWxSb290OiBUSFJFRS5PYmplY3QzRCxcbiAgICBhaW06IENvbnN0cmFpbnRTY2hlbWEuQWltQ29uc3RyYWludCxcbiAgKTogVlJNQWltQ29uc3RyYWludCB7XG4gICAgY29uc3QgeyBzb3VyY2UsIGFpbVZlY3RvciwgdXBWZWN0b3IsIHNvdXJjZVNwYWNlLCBkZXN0aW5hdGlvblNwYWNlLCB3ZWlnaHQsIGZyZWV6ZUF4ZXMgfSA9IGFpbTtcbiAgICBjb25zdCBjb25zdHJhaW50ID0gbmV3IFZSTUFpbUNvbnN0cmFpbnQoZGVzdGluYXRpb24sIG1vZGVsUm9vdCk7XG5cbiAgICBjb25zdHJhaW50LnNldFNvdXJjZShub2Rlc1tzb3VyY2VdKTtcblxuICAgIGlmIChhaW1WZWN0b3IpIHtcbiAgICAgIGNvbnN0cmFpbnQuYWltVmVjdG9yLmZyb21BcnJheShhaW1WZWN0b3IpLm5vcm1hbGl6ZSgpO1xuICAgIH1cbiAgICBpZiAodXBWZWN0b3IpIHtcbiAgICAgIGNvbnN0cmFpbnQudXBWZWN0b3IuZnJvbUFycmF5KHVwVmVjdG9yKS5ub3JtYWxpemUoKTtcbiAgICB9XG4gICAgaWYgKHNvdXJjZVNwYWNlKSB7XG4gICAgICBjb25zdHJhaW50LnNvdXJjZVNwYWNlID0gc291cmNlU3BhY2U7XG4gICAgfVxuICAgIGlmIChkZXN0aW5hdGlvblNwYWNlKSB7XG4gICAgICBjb25zdHJhaW50LmRlc3RpbmF0aW9uU3BhY2UgPSBkZXN0aW5hdGlvblNwYWNlO1xuICAgIH1cbiAgICBpZiAod2VpZ2h0KSB7XG4gICAgICBjb25zdHJhaW50LndlaWdodCA9IHdlaWdodDtcbiAgICB9XG4gICAgaWYgKGZyZWV6ZUF4ZXMpIHtcbiAgICAgIGNvbnN0cmFpbnQuZnJlZXplQXhlcyA9IGZyZWV6ZUF4ZXM7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaGVscGVyUm9vdCkge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IFZSTU5vZGVDb25zdHJhaW50SGVscGVyKGNvbnN0cmFpbnQpO1xuICAgICAgdGhpcy5oZWxwZXJSb290LmFkZChoZWxwZXIpO1xuICAgIH1cblxuICAgIHJldHVybiBjb25zdHJhaW50O1xuICB9XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cblxuZXhwb3J0IGNvbnN0IFZSTU5vZGVDb25zdHJhaW50T2JqZWN0U3BhY2UgPSB7XG4gIExvY2FsOiAnbG9jYWwnLFxuICBNb2RlbDogJ21vZGVsJyxcbn0gYXMgY29uc3Q7XG5cbmV4cG9ydCB0eXBlIFZSTU5vZGVDb25zdHJhaW50T2JqZWN0U3BhY2UgPSB0eXBlb2YgVlJNTm9kZUNvbnN0cmFpbnRPYmplY3RTcGFjZVtrZXlvZiB0eXBlb2YgVlJNTm9kZUNvbnN0cmFpbnRPYmplY3RTcGFjZV07XG4iXSwibmFtZXMiOlsiX3YzQSIsIl9xdWF0QSIsIl9tYXRBIiwiUVVBVF9JREVOVElUWSIsIl9xdWF0QiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUdBLE1BQU1BLE1BQUksR0FBRyxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztNQUVwQix1QkFBd0IsU0FBUSxLQUFLLENBQUMsS0FBSztJQUt0RCxZQUFtQixVQUE2QjtRQUM5QyxLQUFLLEVBQUUsQ0FBQztRQUVSLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLElBQUksWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3hGLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRXBELE1BQU0sUUFB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
