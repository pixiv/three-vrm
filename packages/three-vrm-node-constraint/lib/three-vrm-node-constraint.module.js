/*!
 * @pixiv/three-vrm-node-constraint v1.0.9
 * Node constraint module for @pixiv/three-vrm
 *
 * Copyright (c) 2020-2023 pixiv Inc.
 * @pixiv/three-vrm-node-constraint is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
import * as THREE from 'three';

const _v3A$3 = new THREE.Vector3();
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
        _v3A$3.setFromMatrixPosition(this.constraint.destination.matrixWorld);
        this._attrPosition.setXYZ(0, _v3A$3.x, _v3A$3.y, _v3A$3.z);
        if (this.constraint.source) {
            _v3A$3.setFromMatrixPosition(this.constraint.source.matrixWorld);
        }
        this._attrPosition.setXYZ(1, _v3A$3.x, _v3A$3.y, _v3A$3.z);
        this._attrPosition.needsUpdate = true;
        super.updateMatrixWorld(force);
    }
}

function decomposePosition(matrix, target) {
    return target.set(matrix.elements[12], matrix.elements[13], matrix.elements[14]);
}

const _v3A$2 = new THREE.Vector3();
const _v3B$1 = new THREE.Vector3();
function decomposeRotation(matrix, target) {
    matrix.decompose(_v3A$2, target, _v3B$1);
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

/**
 * A base class of VRM constraint classes.
 */
class VRMNodeConstraint {
    /**
     * @param destination The destination object
     * @param source The source object
     */
    constructor(destination, source) {
        this.destination = destination;
        this.source = source;
        this.weight = 1.0;
    }
}

const _v3A$1 = new THREE.Vector3();
const _v3B = new THREE.Vector3();
const _v3C = new THREE.Vector3();
const _quatA$2 = new THREE.Quaternion();
const _quatB$2 = new THREE.Quaternion();
const _quatC = new THREE.Quaternion();
/**
 * A constraint that makes it look at a source object.
 *
 * See: https://github.com/vrm-c/vrm-specification/tree/master/specification/VRMC_node_constraint-1.0_beta#roll-constraint
 */
class VRMAimConstraint extends VRMNodeConstraint {
    constructor(destination, source) {
        super(destination, source);
        this._aimAxis = 'PositiveX';
        this._v3AimAxis = new THREE.Vector3(1, 0, 0);
        this._dstRestQuat = new THREE.Quaternion();
    }
    /**
     * The aim axis of the constraint.
     */
    get aimAxis() {
        return this._aimAxis;
    }
    /**
     * The aim axis of the constraint.
     */
    set aimAxis(aimAxis) {
        this._aimAxis = aimAxis;
        this._v3AimAxis.set(aimAxis === 'PositiveX' ? 1.0 : aimAxis === 'NegativeX' ? -1.0 : 0.0, aimAxis === 'PositiveY' ? 1.0 : aimAxis === 'NegativeY' ? -1.0 : 0.0, aimAxis === 'PositiveZ' ? 1.0 : aimAxis === 'NegativeZ' ? -1.0 : 0.0);
    }
    get dependencies() {
        const set = new Set([this.source]);
        if (this.destination.parent) {
            set.add(this.destination.parent);
        }
        return set;
    }
    setInitState() {
        this._dstRestQuat.copy(this.destination.quaternion);
    }
    update() {
        // update world matrix of destination and source manually
        this.destination.updateWorldMatrix(true, false);
        this.source.updateWorldMatrix(true, false);
        // get world quaternion of the parent of the destination
        const dstParentWorldQuat = _quatA$2.identity();
        const invDstParentWorldQuat = _quatB$2.identity();
        if (this.destination.parent) {
            decomposeRotation(this.destination.parent.matrixWorld, dstParentWorldQuat);
            quatInvertCompat(invDstParentWorldQuat.copy(dstParentWorldQuat));
        }
        // calculate from-to vectors in world coord
        const a0 = _v3A$1.copy(this._v3AimAxis).applyQuaternion(this._dstRestQuat).applyQuaternion(dstParentWorldQuat);
        const a1 = decomposePosition(this.source.matrixWorld, _v3B)
            .sub(decomposePosition(this.destination.matrixWorld, _v3C))
            .normalize();
        // create a from-to quaternion, convert to destination local coord, then multiply rest quaternion
        const targetQuat = _quatC
            .setFromUnitVectors(a0, a1)
            .premultiply(invDstParentWorldQuat)
            .multiply(dstParentWorldQuat)
            .multiply(this._dstRestQuat);
        // blend with the rest quaternion using weight
        this.destination.quaternion.copy(this._dstRestQuat).slerp(targetQuat, this.weight);
    }
}

/******************************************************************************
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

/**
 * Traverse ancestors of given object and call given callback from root side.
 * It will include the given object itself.
 *
 * @param object The object you want to traverse
 * @param callback The call back function that will be called for each ancestors
 */
function traverseAncestorsFromRoot(object, callback) {
    const ancestors = [object];
    let head = object.parent;
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
        let objectSet = this._objectConstraintsMap.get(constraint.destination);
        if (objectSet == null) {
            objectSet = new Set();
            this._objectConstraintsMap.set(constraint.destination, objectSet);
        }
        objectSet.add(constraint);
    }
    deleteConstraint(constraint) {
        this._constraints.delete(constraint);
        const objectSet = this._objectConstraintsMap.get(constraint.destination);
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
            throw new Error('VRMNodeConstraintManager: Circular dependency detected while updating constraints');
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

const _quatA$1 = new THREE.Quaternion();
const _quatB$1 = new THREE.Quaternion();
/**
 * A constraint that transfers a rotation around one axis of a source.
 *
 * See: https://github.com/vrm-c/vrm-specification/tree/master/specification/VRMC_node_constraint-1.0_beta#roll-constraint
 */
class VRMRotationConstraint extends VRMNodeConstraint {
    constructor(destination, source) {
        super(destination, source);
        this._dstRestQuat = new THREE.Quaternion();
        this._invSrcRestQuat = new THREE.Quaternion();
    }
    get dependencies() {
        return new Set([this.source]);
    }
    setInitState() {
        this._dstRestQuat.copy(this.destination.quaternion);
        quatInvertCompat(this._invSrcRestQuat.copy(this.source.quaternion));
    }
    update() {
        // calculate the delta rotation from the rest about the source
        const srcDeltaQuat = _quatA$1.copy(this._invSrcRestQuat).multiply(this.source.quaternion);
        // multiply the delta to the rest of the destination
        const targetQuat = _quatB$1.copy(this._dstRestQuat).multiply(srcDeltaQuat);
        // blend with the rest quaternion using weight
        this.destination.quaternion.copy(this._dstRestQuat).slerp(targetQuat, this.weight);
    }
}

const _v3A = new THREE.Vector3();
const _quatA = new THREE.Quaternion();
const _quatB = new THREE.Quaternion();
/**
 * A constraint that transfers a rotation around one axis of a source.
 *
 * See: https://github.com/vrm-c/vrm-specification/tree/master/specification/VRMC_node_constraint-1.0_beta#roll-constraint
 */
class VRMRollConstraint extends VRMNodeConstraint {
    constructor(destination, source) {
        super(destination, source);
        this._rollAxis = 'X';
        this._v3RollAxis = new THREE.Vector3(1, 0, 0);
        this._dstRestQuat = new THREE.Quaternion();
        this._invDstRestQuat = new THREE.Quaternion();
        this._invSrcRestQuatMulDstRestQuat = new THREE.Quaternion();
    }
    /**
     * The roll axis of the constraint.
     */
    get rollAxis() {
        return this._rollAxis;
    }
    /**
     * The roll axis of the constraint.
     */
    set rollAxis(rollAxis) {
        this._rollAxis = rollAxis;
        this._v3RollAxis.set(rollAxis === 'X' ? 1.0 : 0.0, rollAxis === 'Y' ? 1.0 : 0.0, rollAxis === 'Z' ? 1.0 : 0.0);
    }
    get dependencies() {
        return new Set([this.source]);
    }
    setInitState() {
        this._dstRestQuat.copy(this.destination.quaternion);
        quatInvertCompat(this._invDstRestQuat.copy(this._dstRestQuat));
        quatInvertCompat(this._invSrcRestQuatMulDstRestQuat.copy(this.source.quaternion)).multiply(this._dstRestQuat);
    }
    update() {
        // calculate the delta rotation from the rest about the source, then convert to the destination local coord
        /**
         * What the quatDelta is intended to be:
         *
         * ```ts
         * const quatSrcDelta = _quatA
         *   .copy( this._invSrcRestQuat )
         *   .multiply( this.source.quaternion );
         * const quatSrcDeltaInParent = _quatB
         *   .copy( this._srcRestQuat )
         *   .multiply( quatSrcDelta )
         *   .multiply( this._invSrcRestQuat );
         * const quatSrcDeltaInDst = _quatA
         *   .copy( this._invDstRestQuat )
         *   .multiply( quatSrcDeltaInParent )
         *   .multiply( this._dstRestQuat );
         * ```
         */
        const quatDelta = _quatA
            .copy(this._invDstRestQuat)
            .multiply(this.source.quaternion)
            .multiply(this._invSrcRestQuatMulDstRestQuat);
        // create a from-to quaternion
        const n1 = _v3A.copy(this._v3RollAxis).applyQuaternion(quatDelta);
        /**
         * What the quatFromTo is intended to be:
         *
         * ```ts
         * const quatFromTo = _quatB.setFromUnitVectors( this._v3RollAxis, n1 ).inverse();
         * ```
         */
        const quatFromTo = _quatB.setFromUnitVectors(n1, this._v3RollAxis);
        // quatFromTo * quatDelta == roll extracted from quatDelta
        const targetQuat = quatFromTo.premultiply(this._dstRestQuat).multiply(quatDelta);
        // blend with the rest quaternion using weight
        this.destination.quaternion.copy(this._dstRestQuat).slerp(targetQuat, this.weight);
    }
}

/**
 * Possible spec versions it recognizes.
 */
const POSSIBLE_SPEC_VERSIONS = new Set(['1.0', '1.0-beta']);
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
            const json = this.parser.json;
            // early abort if it doesn't use constraints
            const isConstraintsUsed = ((_a = json.extensionsUsed) === null || _a === void 0 ? void 0 : _a.indexOf(VRMNodeConstraintLoaderPlugin.EXTENSION_NAME)) !== -1;
            if (!isConstraintsUsed) {
                return null;
            }
            const manager = new VRMNodeConstraintManager();
            const threeNodes = yield this.parser.getDependencies('node');
            // import constraints for each nodes
            threeNodes.forEach((node, nodeIndex) => {
                var _a;
                const schemaNode = json.nodes[nodeIndex];
                // check if the extension uses the extension
                const extension = (_a = schemaNode === null || schemaNode === void 0 ? void 0 : schemaNode.extensions) === null || _a === void 0 ? void 0 : _a[VRMNodeConstraintLoaderPlugin.EXTENSION_NAME];
                if (extension == null) {
                    return;
                }
                const specVersion = extension.specVersion;
                if (!POSSIBLE_SPEC_VERSIONS.has(specVersion)) {
                    console.warn(`VRMNodeConstraintLoaderPlugin: Unknown ${VRMNodeConstraintLoaderPlugin.EXTENSION_NAME} specVersion "${specVersion}"`);
                    return;
                }
                const constraintDef = extension.constraint;
                // import constraints
                if (constraintDef.roll != null) {
                    const constraint = this._importRollConstraint(node, threeNodes, constraintDef.roll);
                    manager.addConstraint(constraint);
                }
                else if (constraintDef.aim != null) {
                    const constraint = this._importAimConstraint(node, threeNodes, constraintDef.aim);
                    manager.addConstraint(constraint);
                }
                else if (constraintDef.rotation != null) {
                    const constraint = this._importRotationConstraint(node, threeNodes, constraintDef.rotation);
                    manager.addConstraint(constraint);
                }
            });
            // init constraints
            gltf.scene.updateMatrixWorld();
            manager.setInitState();
            return manager;
        });
    }
    _importRollConstraint(destination, nodes, rollConstraintDef) {
        const { source: sourceIndex, rollAxis, weight } = rollConstraintDef;
        const source = nodes[sourceIndex];
        const constraint = new VRMRollConstraint(destination, source);
        if (rollAxis != null) {
            constraint.rollAxis = rollAxis;
        }
        if (weight != null) {
            constraint.weight = weight;
        }
        if (this.helperRoot) {
            const helper = new VRMNodeConstraintHelper(constraint);
            this.helperRoot.add(helper);
        }
        return constraint;
    }
    _importAimConstraint(destination, nodes, aimConstraintDef) {
        const { source: sourceIndex, aimAxis, weight } = aimConstraintDef;
        const source = nodes[sourceIndex];
        const constraint = new VRMAimConstraint(destination, source);
        if (aimAxis != null) {
            constraint.aimAxis = aimAxis;
        }
        if (weight != null) {
            constraint.weight = weight;
        }
        if (this.helperRoot) {
            const helper = new VRMNodeConstraintHelper(constraint);
            this.helperRoot.add(helper);
        }
        return constraint;
    }
    _importRotationConstraint(destination, nodes, rotationConstraintDef) {
        const { source: sourceIndex, weight } = rotationConstraintDef;
        const source = nodes[sourceIndex];
        const constraint = new VRMRotationConstraint(destination, source);
        if (weight != null) {
            constraint.weight = weight;
        }
        if (this.helperRoot) {
            const helper = new VRMNodeConstraintHelper(constraint);
            this.helperRoot.add(helper);
        }
        return constraint;
    }
}
VRMNodeConstraintLoaderPlugin.EXTENSION_NAME = 'VRMC_node_constraint';

export { VRMAimConstraint, VRMNodeConstraint, VRMNodeConstraintHelper, VRMNodeConstraintLoaderPlugin, VRMNodeConstraintManager, VRMRollConstraint, VRMRotationConstraint };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyZWUtdnJtLW5vZGUtY29uc3RyYWludC5tb2R1bGUuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9oZWxwZXJzL1ZSTU5vZGVDb25zdHJhaW50SGVscGVyLnRzIiwiLi4vc3JjL3V0aWxzL2RlY29tcG9zZVBvc2l0aW9uLnRzIiwiLi4vc3JjL3V0aWxzL2RlY29tcG9zZVJvdGF0aW9uLnRzIiwiLi4vc3JjL3V0aWxzL3F1YXRJbnZlcnRDb21wYXQudHMiLCIuLi9zcmMvVlJNTm9kZUNvbnN0cmFpbnQudHMiLCIuLi9zcmMvVlJNQWltQ29uc3RyYWludC50cyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCIuLi9zcmMvdXRpbHMvdHJhdmVyc2VBbmNlc3RvcnNGcm9tUm9vdC50cyIsIi4uL3NyYy9WUk1Ob2RlQ29uc3RyYWludE1hbmFnZXIudHMiLCIuLi9zcmMvVlJNUm90YXRpb25Db25zdHJhaW50LnRzIiwiLi4vc3JjL1ZSTVJvbGxDb25zdHJhaW50LnRzIiwiLi4vc3JjL1ZSTU5vZGVDb25zdHJhaW50TG9hZGVyUGx1Z2luLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTU5vZGVDb25zdHJhaW50IH0gZnJvbSAnLi4vVlJNTm9kZUNvbnN0cmFpbnQnO1xuXG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuZXhwb3J0IGNsYXNzIFZSTU5vZGVDb25zdHJhaW50SGVscGVyIGV4dGVuZHMgVEhSRUUuR3JvdXAge1xuICBwdWJsaWMgcmVhZG9ubHkgY29uc3RyYWludDogVlJNTm9kZUNvbnN0cmFpbnQ7XG4gIHByaXZhdGUgX2xpbmU6IFRIUkVFLkxpbmU7XG4gIHByaXZhdGUgX2F0dHJQb3NpdGlvbjogVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb25zdHJhaW50OiBWUk1Ob2RlQ29uc3RyYWludCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLl9hdHRyUG9zaXRpb24gPSBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKG5ldyBGbG9hdDMyQXJyYXkoWzAsIDAsIDAsIDAsIDAsIDBdKSwgMyk7XG4gICAgdGhpcy5fYXR0clBvc2l0aW9uLnNldFVzYWdlKFRIUkVFLkR5bmFtaWNEcmF3VXNhZ2UpO1xuXG4gICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuQnVmZmVyR2VvbWV0cnkoKTtcbiAgICBnZW9tZXRyeS5zZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJywgdGhpcy5fYXR0clBvc2l0aW9uKTtcblxuICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLkxpbmVCYXNpY01hdGVyaWFsKHtcbiAgICAgIGNvbG9yOiAweGZmMDBmZixcbiAgICAgIGRlcHRoVGVzdDogZmFsc2UsXG4gICAgICBkZXB0aFdyaXRlOiBmYWxzZSxcbiAgICB9KTtcblxuICAgIHRoaXMuX2xpbmUgPSBuZXcgVEhSRUUuTGluZShnZW9tZXRyeSwgbWF0ZXJpYWwpO1xuICAgIHRoaXMuYWRkKHRoaXMuX2xpbmUpO1xuXG4gICAgdGhpcy5jb25zdHJhaW50ID0gY29uc3RyYWludDtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVNYXRyaXhXb3JsZChmb3JjZT86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBfdjNBLnNldEZyb21NYXRyaXhQb3NpdGlvbih0aGlzLmNvbnN0cmFpbnQuZGVzdGluYXRpb24ubWF0cml4V29ybGQpO1xuICAgIHRoaXMuX2F0dHJQb3NpdGlvbi5zZXRYWVooMCwgX3YzQS54LCBfdjNBLnksIF92M0Eueik7XG5cbiAgICBpZiAodGhpcy5jb25zdHJhaW50LnNvdXJjZSkge1xuICAgICAgX3YzQS5zZXRGcm9tTWF0cml4UG9zaXRpb24odGhpcy5jb25zdHJhaW50LnNvdXJjZS5tYXRyaXhXb3JsZCk7XG4gICAgfVxuICAgIHRoaXMuX2F0dHJQb3NpdGlvbi5zZXRYWVooMSwgX3YzQS54LCBfdjNBLnksIF92M0Eueik7XG5cbiAgICB0aGlzLl9hdHRyUG9zaXRpb24ubmVlZHNVcGRhdGUgPSB0cnVlO1xuXG4gICAgc3VwZXIudXBkYXRlTWF0cml4V29ybGQoZm9yY2UpO1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWNvbXBvc2VQb3NpdGlvbjxUIGV4dGVuZHMgVEhSRUUuVmVjdG9yMz4obWF0cml4OiBUSFJFRS5NYXRyaXg0LCB0YXJnZXQ6IFQpOiBUIHtcbiAgcmV0dXJuIHRhcmdldC5zZXQobWF0cml4LmVsZW1lbnRzWzEyXSwgbWF0cml4LmVsZW1lbnRzWzEzXSwgbWF0cml4LmVsZW1lbnRzWzE0XSk7XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3YzQiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWNvbXBvc2VSb3RhdGlvbjxUIGV4dGVuZHMgVEhSRUUuUXVhdGVybmlvbj4obWF0cml4OiBUSFJFRS5NYXRyaXg0LCB0YXJnZXQ6IFQpOiBUIHtcbiAgbWF0cml4LmRlY29tcG9zZShfdjNBLCB0YXJnZXQsIF92M0IpO1xuICByZXR1cm4gdGFyZ2V0O1xufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIEEgY29tcGF0IGZ1bmN0aW9uIGZvciBgUXVhdGVybmlvbi5pbnZlcnQoKWAgLyBgUXVhdGVybmlvbi5pbnZlcnNlKClgLlxuICogYFF1YXRlcm5pb24uaW52ZXJ0KClgIGlzIGludHJvZHVjZWQgaW4gcjEyMyBhbmQgYFF1YXRlcm5pb24uaW52ZXJzZSgpYCBlbWl0cyBhIHdhcm5pbmcuXG4gKiBXZSBhcmUgZ29pbmcgdG8gdXNlIHRoaXMgY29tcGF0IGZvciBhIHdoaWxlLlxuICogQHBhcmFtIHRhcmdldCBBIHRhcmdldCBxdWF0ZXJuaW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBxdWF0SW52ZXJ0Q29tcGF0PFQgZXh0ZW5kcyBUSFJFRS5RdWF0ZXJuaW9uPih0YXJnZXQ6IFQpOiBUIHtcbiAgaWYgKCh0YXJnZXQgYXMgYW55KS5pbnZlcnQpIHtcbiAgICB0YXJnZXQuaW52ZXJ0KCk7XG4gIH0gZWxzZSB7XG4gICAgKHRhcmdldCBhcyBhbnkpLmludmVyc2UoKTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbi8qKlxuICogQSBiYXNlIGNsYXNzIG9mIFZSTSBjb25zdHJhaW50IGNsYXNzZXMuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBWUk1Ob2RlQ29uc3RyYWludCB7XG4gIC8qKlxuICAgKiBUaGUgb2JqZWN0IGJlaW5nIGNvbnN0cmFpbmVkIGJ5IHRoZSB7QGxpbmsgc291cmNlfS5cbiAgICovXG4gIHB1YmxpYyBkZXN0aW5hdGlvbjogVEhSRUUuT2JqZWN0M0Q7XG5cbiAgLyoqXG4gICAqIFRoZSBvYmplY3QgY29uc3RyYWlucyB0aGUge0BsaW5rIGRlc3RpbmF0aW9ufS5cbiAgICovXG4gIHB1YmxpYyBzb3VyY2U6IFRIUkVFLk9iamVjdDNEO1xuXG4gIC8qKlxuICAgKiBUaGUgd2VpZ2h0IG9mIHRoZSBjb25zdHJhaW50LlxuICAgKi9cbiAgcHVibGljIHdlaWdodDogbnVtYmVyO1xuXG4gIHB1YmxpYyBhYnN0cmFjdCBnZXQgZGVwZW5kZW5jaWVzKCk6IFNldDxUSFJFRS5PYmplY3QzRD47XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBkZXN0aW5hdGlvbiBUaGUgZGVzdGluYXRpb24gb2JqZWN0XG4gICAqIEBwYXJhbSBzb3VyY2UgVGhlIHNvdXJjZSBvYmplY3RcbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogVEhSRUUuT2JqZWN0M0QsIHNvdXJjZTogVEhSRUUuT2JqZWN0M0QpIHtcbiAgICB0aGlzLmRlc3RpbmF0aW9uID0gZGVzdGluYXRpb247XG4gICAgdGhpcy5zb3VyY2UgPSBzb3VyY2U7XG5cbiAgICB0aGlzLndlaWdodCA9IDEuMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgaW5pdGlhbCBzdGF0ZSBvZiB0aGUgY29uc3RyYWludC5cbiAgICovXG4gIHB1YmxpYyBhYnN0cmFjdCBzZXRJbml0U3RhdGUoKTogdm9pZDtcblxuICAvKipcbiAgICogVXBkYXRlIGFuZCBhcHBseSB0aGUgY29uc3RyYWludC5cbiAgICovXG4gIHB1YmxpYyBhYnN0cmFjdCB1cGRhdGUoKTogdm9pZDtcbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IGRlY29tcG9zZVBvc2l0aW9uIH0gZnJvbSAnLi91dGlscy9kZWNvbXBvc2VQb3NpdGlvbic7XG5pbXBvcnQgeyBkZWNvbXBvc2VSb3RhdGlvbiB9IGZyb20gJy4vdXRpbHMvZGVjb21wb3NlUm90YXRpb24nO1xuaW1wb3J0IHsgcXVhdEludmVydENvbXBhdCB9IGZyb20gJy4vdXRpbHMvcXVhdEludmVydENvbXBhdCc7XG5pbXBvcnQgeyBWUk1Ob2RlQ29uc3RyYWludCB9IGZyb20gJy4vVlJNTm9kZUNvbnN0cmFpbnQnO1xuXG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF92M0IgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3YzQyA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfcXVhdEEgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuY29uc3QgX3F1YXRCID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbmNvbnN0IF9xdWF0QyA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5cbi8qKlxuICogQSBjb25zdHJhaW50IHRoYXQgbWFrZXMgaXQgbG9vayBhdCBhIHNvdXJjZSBvYmplY3QuXG4gKlxuICogU2VlOiBodHRwczovL2dpdGh1Yi5jb20vdnJtLWMvdnJtLXNwZWNpZmljYXRpb24vdHJlZS9tYXN0ZXIvc3BlY2lmaWNhdGlvbi9WUk1DX25vZGVfY29uc3RyYWludC0xLjBfYmV0YSNyb2xsLWNvbnN0cmFpbnRcbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUFpbUNvbnN0cmFpbnQgZXh0ZW5kcyBWUk1Ob2RlQ29uc3RyYWludCB7XG4gIC8qKlxuICAgKiBUaGUgYWltIGF4aXMgb2YgdGhlIGNvbnN0cmFpbnQuXG4gICAqL1xuICBwdWJsaWMgZ2V0IGFpbUF4aXMoKTogJ1Bvc2l0aXZlWCcgfCAnTmVnYXRpdmVYJyB8ICdQb3NpdGl2ZVknIHwgJ05lZ2F0aXZlWScgfCAnUG9zaXRpdmVaJyB8ICdOZWdhdGl2ZVonIHtcbiAgICByZXR1cm4gdGhpcy5fYWltQXhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgYWltIGF4aXMgb2YgdGhlIGNvbnN0cmFpbnQuXG4gICAqL1xuICBwdWJsaWMgc2V0IGFpbUF4aXMoYWltQXhpczogJ1Bvc2l0aXZlWCcgfCAnTmVnYXRpdmVYJyB8ICdQb3NpdGl2ZVknIHwgJ05lZ2F0aXZlWScgfCAnUG9zaXRpdmVaJyB8ICdOZWdhdGl2ZVonKSB7XG4gICAgdGhpcy5fYWltQXhpcyA9IGFpbUF4aXM7XG4gICAgdGhpcy5fdjNBaW1BeGlzLnNldChcbiAgICAgIGFpbUF4aXMgPT09ICdQb3NpdGl2ZVgnID8gMS4wIDogYWltQXhpcyA9PT0gJ05lZ2F0aXZlWCcgPyAtMS4wIDogMC4wLFxuICAgICAgYWltQXhpcyA9PT0gJ1Bvc2l0aXZlWScgPyAxLjAgOiBhaW1BeGlzID09PSAnTmVnYXRpdmVZJyA/IC0xLjAgOiAwLjAsXG4gICAgICBhaW1BeGlzID09PSAnUG9zaXRpdmVaJyA/IDEuMCA6IGFpbUF4aXMgPT09ICdOZWdhdGl2ZVonID8gLTEuMCA6IDAuMCxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBhaW0gYXhpcyBvZiB0aGUgY29uc3RyYWludC5cbiAgICovXG4gIHByaXZhdGUgX2FpbUF4aXM6ICdQb3NpdGl2ZVgnIHwgJ05lZ2F0aXZlWCcgfCAnUG9zaXRpdmVZJyB8ICdOZWdhdGl2ZVknIHwgJ1Bvc2l0aXZlWicgfCAnTmVnYXRpdmVaJztcblxuICAvKipcbiAgICogVGhlIHtAbGluayBfYWltQXhpc30gYnV0IGluIGFuIGFjdHVhbCBWZWN0b3IzIGZvcm0uXG4gICAqL1xuICBwcml2YXRlIF92M0FpbUF4aXM6IFRIUkVFLlZlY3RvcjM7XG5cbiAgLyoqXG4gICAqIFRoZSByZXN0IHF1YXRlcm5pb24gb2YgdGhlIHtAbGluayBkZXN0aW5hdGlvbn0uXG4gICAqL1xuICBwcml2YXRlIF9kc3RSZXN0UXVhdDogVEhSRUUuUXVhdGVybmlvbjtcblxuICBwdWJsaWMgZ2V0IGRlcGVuZGVuY2llcygpOiBTZXQ8VEhSRUUuT2JqZWN0M0Q8VEhSRUUuRXZlbnQ+PiB7XG4gICAgY29uc3Qgc2V0ID0gbmV3IFNldDxUSFJFRS5PYmplY3QzRD4oW3RoaXMuc291cmNlXSk7XG5cbiAgICBpZiAodGhpcy5kZXN0aW5hdGlvbi5wYXJlbnQpIHtcbiAgICAgIHNldC5hZGQodGhpcy5kZXN0aW5hdGlvbi5wYXJlbnQpO1xuICAgIH1cblxuICAgIHJldHVybiBzZXQ7XG4gIH1cblxuICBwdWJsaWMgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFRIUkVFLk9iamVjdDNELCBzb3VyY2U6IFRIUkVFLk9iamVjdDNEKSB7XG4gICAgc3VwZXIoZGVzdGluYXRpb24sIHNvdXJjZSk7XG5cbiAgICB0aGlzLl9haW1BeGlzID0gJ1Bvc2l0aXZlWCc7XG4gICAgdGhpcy5fdjNBaW1BeGlzID0gbmV3IFRIUkVFLlZlY3RvcjMoMSwgMCwgMCk7XG5cbiAgICB0aGlzLl9kc3RSZXN0UXVhdCA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG4gIH1cblxuICBwdWJsaWMgc2V0SW5pdFN0YXRlKCk6IHZvaWQge1xuICAgIHRoaXMuX2RzdFJlc3RRdWF0LmNvcHkodGhpcy5kZXN0aW5hdGlvbi5xdWF0ZXJuaW9uKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgLy8gdXBkYXRlIHdvcmxkIG1hdHJpeCBvZiBkZXN0aW5hdGlvbiBhbmQgc291cmNlIG1hbnVhbGx5XG4gICAgdGhpcy5kZXN0aW5hdGlvbi51cGRhdGVXb3JsZE1hdHJpeCh0cnVlLCBmYWxzZSk7XG4gICAgdGhpcy5zb3VyY2UudXBkYXRlV29ybGRNYXRyaXgodHJ1ZSwgZmFsc2UpO1xuXG4gICAgLy8gZ2V0IHdvcmxkIHF1YXRlcm5pb24gb2YgdGhlIHBhcmVudCBvZiB0aGUgZGVzdGluYXRpb25cbiAgICBjb25zdCBkc3RQYXJlbnRXb3JsZFF1YXQgPSBfcXVhdEEuaWRlbnRpdHkoKTtcbiAgICBjb25zdCBpbnZEc3RQYXJlbnRXb3JsZFF1YXQgPSBfcXVhdEIuaWRlbnRpdHkoKTtcbiAgICBpZiAodGhpcy5kZXN0aW5hdGlvbi5wYXJlbnQpIHtcbiAgICAgIGRlY29tcG9zZVJvdGF0aW9uKHRoaXMuZGVzdGluYXRpb24ucGFyZW50Lm1hdHJpeFdvcmxkLCBkc3RQYXJlbnRXb3JsZFF1YXQpO1xuICAgICAgcXVhdEludmVydENvbXBhdChpbnZEc3RQYXJlbnRXb3JsZFF1YXQuY29weShkc3RQYXJlbnRXb3JsZFF1YXQpKTtcbiAgICB9XG5cbiAgICAvLyBjYWxjdWxhdGUgZnJvbS10byB2ZWN0b3JzIGluIHdvcmxkIGNvb3JkXG4gICAgY29uc3QgYTAgPSBfdjNBLmNvcHkodGhpcy5fdjNBaW1BeGlzKS5hcHBseVF1YXRlcm5pb24odGhpcy5fZHN0UmVzdFF1YXQpLmFwcGx5UXVhdGVybmlvbihkc3RQYXJlbnRXb3JsZFF1YXQpO1xuICAgIGNvbnN0IGExID0gZGVjb21wb3NlUG9zaXRpb24odGhpcy5zb3VyY2UubWF0cml4V29ybGQsIF92M0IpXG4gICAgICAuc3ViKGRlY29tcG9zZVBvc2l0aW9uKHRoaXMuZGVzdGluYXRpb24ubWF0cml4V29ybGQsIF92M0MpKVxuICAgICAgLm5vcm1hbGl6ZSgpO1xuXG4gICAgLy8gY3JlYXRlIGEgZnJvbS10byBxdWF0ZXJuaW9uLCBjb252ZXJ0IHRvIGRlc3RpbmF0aW9uIGxvY2FsIGNvb3JkLCB0aGVuIG11bHRpcGx5IHJlc3QgcXVhdGVybmlvblxuICAgIGNvbnN0IHRhcmdldFF1YXQgPSBfcXVhdENcbiAgICAgIC5zZXRGcm9tVW5pdFZlY3RvcnMoYTAsIGExKVxuICAgICAgLnByZW11bHRpcGx5KGludkRzdFBhcmVudFdvcmxkUXVhdClcbiAgICAgIC5tdWx0aXBseShkc3RQYXJlbnRXb3JsZFF1YXQpXG4gICAgICAubXVsdGlwbHkodGhpcy5fZHN0UmVzdFF1YXQpO1xuXG4gICAgLy8gYmxlbmQgd2l0aCB0aGUgcmVzdCBxdWF0ZXJuaW9uIHVzaW5nIHdlaWdodFxuICAgIHRoaXMuZGVzdGluYXRpb24ucXVhdGVybmlvbi5jb3B5KHRoaXMuX2RzdFJlc3RRdWF0KS5zbGVycCh0YXJnZXRRdWF0LCB0aGlzLndlaWdodCk7XG4gIH1cbn1cbiIsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXHJcblxyXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxyXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcclxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cclxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcclxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19lc0RlY29yYXRlKGN0b3IsIGRlc2NyaXB0b3JJbiwgZGVjb3JhdG9ycywgY29udGV4dEluLCBpbml0aWFsaXplcnMsIGV4dHJhSW5pdGlhbGl6ZXJzKSB7XHJcbiAgICBmdW5jdGlvbiBhY2NlcHQoZikgeyBpZiAoZiAhPT0gdm9pZCAwICYmIHR5cGVvZiBmICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJGdW5jdGlvbiBleHBlY3RlZFwiKTsgcmV0dXJuIGY7IH1cclxuICAgIHZhciBraW5kID0gY29udGV4dEluLmtpbmQsIGtleSA9IGtpbmQgPT09IFwiZ2V0dGVyXCIgPyBcImdldFwiIDoga2luZCA9PT0gXCJzZXR0ZXJcIiA/IFwic2V0XCIgOiBcInZhbHVlXCI7XHJcbiAgICB2YXIgdGFyZ2V0ID0gIWRlc2NyaXB0b3JJbiAmJiBjdG9yID8gY29udGV4dEluW1wic3RhdGljXCJdID8gY3RvciA6IGN0b3IucHJvdG90eXBlIDogbnVsbDtcclxuICAgIHZhciBkZXNjcmlwdG9yID0gZGVzY3JpcHRvckluIHx8ICh0YXJnZXQgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgY29udGV4dEluLm5hbWUpIDoge30pO1xyXG4gICAgdmFyIF8sIGRvbmUgPSBmYWxzZTtcclxuICAgIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgdmFyIGNvbnRleHQgPSB7fTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIGNvbnRleHRJbikgY29udGV4dFtwXSA9IHAgPT09IFwiYWNjZXNzXCIgPyB7fSA6IGNvbnRleHRJbltwXTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIGNvbnRleHRJbi5hY2Nlc3MpIGNvbnRleHQuYWNjZXNzW3BdID0gY29udGV4dEluLmFjY2Vzc1twXTtcclxuICAgICAgICBjb250ZXh0LmFkZEluaXRpYWxpemVyID0gZnVuY3Rpb24gKGYpIHsgaWYgKGRvbmUpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgYWRkIGluaXRpYWxpemVycyBhZnRlciBkZWNvcmF0aW9uIGhhcyBjb21wbGV0ZWRcIik7IGV4dHJhSW5pdGlhbGl6ZXJzLnB1c2goYWNjZXB0KGYgfHwgbnVsbCkpOyB9O1xyXG4gICAgICAgIHZhciByZXN1bHQgPSAoMCwgZGVjb3JhdG9yc1tpXSkoa2luZCA9PT0gXCJhY2Nlc3NvclwiID8geyBnZXQ6IGRlc2NyaXB0b3IuZ2V0LCBzZXQ6IGRlc2NyaXB0b3Iuc2V0IH0gOiBkZXNjcmlwdG9yW2tleV0sIGNvbnRleHQpO1xyXG4gICAgICAgIGlmIChraW5kID09PSBcImFjY2Vzc29yXCIpIHtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdm9pZCAwKSBjb250aW51ZTtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gbnVsbCB8fCB0eXBlb2YgcmVzdWx0ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IGV4cGVjdGVkXCIpO1xyXG4gICAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuZ2V0KSkgZGVzY3JpcHRvci5nZXQgPSBfO1xyXG4gICAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuc2V0KSkgZGVzY3JpcHRvci5zZXQgPSBfO1xyXG4gICAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuaW5pdCkpIGluaXRpYWxpemVycy5wdXNoKF8pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChfID0gYWNjZXB0KHJlc3VsdCkpIHtcclxuICAgICAgICAgICAgaWYgKGtpbmQgPT09IFwiZmllbGRcIikgaW5pdGlhbGl6ZXJzLnB1c2goXyk7XHJcbiAgICAgICAgICAgIGVsc2UgZGVzY3JpcHRvcltrZXldID0gXztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAodGFyZ2V0KSBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBjb250ZXh0SW4ubmFtZSwgZGVzY3JpcHRvcik7XHJcbiAgICBkb25lID0gdHJ1ZTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3J1bkluaXRpYWxpemVycyh0aGlzQXJnLCBpbml0aWFsaXplcnMsIHZhbHVlKSB7XHJcbiAgICB2YXIgdXNlVmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID4gMjtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5pdGlhbGl6ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFsdWUgPSB1c2VWYWx1ZSA/IGluaXRpYWxpemVyc1tpXS5jYWxsKHRoaXNBcmcsIHZhbHVlKSA6IGluaXRpYWxpemVyc1tpXS5jYWxsKHRoaXNBcmcpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVzZVZhbHVlID8gdmFsdWUgOiB2b2lkIDA7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wcm9wS2V5KHgpIHtcclxuICAgIHJldHVybiB0eXBlb2YgeCA9PT0gXCJzeW1ib2xcIiA/IHggOiBcIlwiLmNvbmNhdCh4KTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NldEZ1bmN0aW9uTmFtZShmLCBuYW1lLCBwcmVmaXgpIHtcclxuICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gXCJzeW1ib2xcIikgbmFtZSA9IG5hbWUuZGVzY3JpcHRpb24gPyBcIltcIi5jb25jYXQobmFtZS5kZXNjcmlwdGlvbiwgXCJdXCIpIDogXCJcIjtcclxuICAgIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoZiwgXCJuYW1lXCIsIHsgY29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogcHJlZml4ID8gXCJcIi5jb25jYXQocHJlZml4LCBcIiBcIiwgbmFtZSkgOiBuYW1lIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChnICYmIChnID0gMCwgb3BbMF0gJiYgKF8gPSAwKSksIF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2NyZWF0ZUJpbmRpbmcgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xyXG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcclxuICAgICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcclxufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBvW2syXSA9IG1ba107XHJcbn0pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBvKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIHApKSBfX2NyZWF0ZUJpbmRpbmcobywgbSwgcCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XHJcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICByZXR1cm4gcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXkodG8sIGZyb20sIHBhY2spIHtcclxuICAgIGlmIChwYWNrIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIGZvciAodmFyIGkgPSAwLCBsID0gZnJvbS5sZW5ndGgsIGFyOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGFyIHx8ICEoaSBpbiBmcm9tKSkge1xyXG4gICAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xyXG4gICAgICAgICAgICBhcltpXSA9IGZyb21baV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRvLmNvbmNhdChhciB8fCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogZmFsc2UgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XHJcbn0pIDogZnVuY3Rpb24obywgdikge1xyXG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XHJcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHJlY2VpdmVyLCBzdGF0ZSwga2luZCwgZikge1xyXG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgZ2V0dGVyXCIpO1xyXG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgcmVhZCBwcml2YXRlIG1lbWJlciBmcm9tIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4ga2luZCA9PT0gXCJtXCIgPyBmIDoga2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIpIDogZiA/IGYudmFsdWUgOiBzdGF0ZS5nZXQocmVjZWl2ZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgc3RhdGUsIHZhbHVlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJtXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIG1ldGhvZCBpcyBub3Qgd3JpdGFibGVcIik7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBzZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB3cml0ZSBwcml2YXRlIG1lbWJlciB0byBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xyXG4gICAgcmV0dXJuIChraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlciwgdmFsdWUpIDogZiA/IGYudmFsdWUgPSB2YWx1ZSA6IHN0YXRlLnNldChyZWNlaXZlciwgdmFsdWUpKSwgdmFsdWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkSW4oc3RhdGUsIHJlY2VpdmVyKSB7XHJcbiAgICBpZiAocmVjZWl2ZXIgPT09IG51bGwgfHwgKHR5cGVvZiByZWNlaXZlciAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgcmVjZWl2ZXIgIT09IFwiZnVuY3Rpb25cIikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgdXNlICdpbicgb3BlcmF0b3Igb24gbm9uLW9iamVjdFwiKTtcclxuICAgIHJldHVybiB0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyID09PSBzdGF0ZSA6IHN0YXRlLmhhcyhyZWNlaXZlcik7XHJcbn1cclxuIiwiaW1wb3J0IHR5cGUgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbi8qKlxuICogVHJhdmVyc2UgYW5jZXN0b3JzIG9mIGdpdmVuIG9iamVjdCBhbmQgY2FsbCBnaXZlbiBjYWxsYmFjayBmcm9tIHJvb3Qgc2lkZS5cbiAqIEl0IHdpbGwgaW5jbHVkZSB0aGUgZ2l2ZW4gb2JqZWN0IGl0c2VsZi5cbiAqXG4gKiBAcGFyYW0gb2JqZWN0IFRoZSBvYmplY3QgeW91IHdhbnQgdG8gdHJhdmVyc2VcbiAqIEBwYXJhbSBjYWxsYmFjayBUaGUgY2FsbCBiYWNrIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSBjYWxsZWQgZm9yIGVhY2ggYW5jZXN0b3JzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0cmF2ZXJzZUFuY2VzdG9yc0Zyb21Sb290KG9iamVjdDogVEhSRUUuT2JqZWN0M0QsIGNhbGxiYWNrOiAob2JqZWN0OiBUSFJFRS5PYmplY3QzRCkgPT4gdm9pZCk6IHZvaWQge1xuICBjb25zdCBhbmNlc3RvcnM6IFRIUkVFLk9iamVjdDNEW10gPSBbb2JqZWN0XTtcblxuICBsZXQgaGVhZDogVEhSRUUuT2JqZWN0M0QgfCBudWxsID0gb2JqZWN0LnBhcmVudDtcbiAgd2hpbGUgKGhlYWQgIT09IG51bGwpIHtcbiAgICBhbmNlc3RvcnMudW5zaGlmdChoZWFkKTtcbiAgICBoZWFkID0gaGVhZC5wYXJlbnQ7XG4gIH1cblxuICBhbmNlc3RvcnMuZm9yRWFjaCgoYW5jZXN0b3IpID0+IHtcbiAgICBjYWxsYmFjayhhbmNlc3Rvcik7XG4gIH0pO1xufVxuIiwiaW1wb3J0IHR5cGUgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgdHlwZSB7IFZSTU5vZGVDb25zdHJhaW50IH0gZnJvbSAnLi9WUk1Ob2RlQ29uc3RyYWludCc7XG5pbXBvcnQgeyB0cmF2ZXJzZUFuY2VzdG9yc0Zyb21Sb290IH0gZnJvbSAnLi91dGlscy90cmF2ZXJzZUFuY2VzdG9yc0Zyb21Sb290JztcblxuZXhwb3J0IGNsYXNzIFZSTU5vZGVDb25zdHJhaW50TWFuYWdlciB7XG4gIHByaXZhdGUgX2NvbnN0cmFpbnRzID0gbmV3IFNldDxWUk1Ob2RlQ29uc3RyYWludD4oKTtcbiAgcHVibGljIGdldCBjb25zdHJhaW50cygpOiBTZXQ8VlJNTm9kZUNvbnN0cmFpbnQ+IHtcbiAgICByZXR1cm4gdGhpcy5fY29uc3RyYWludHM7XG4gIH1cblxuICBwcml2YXRlIF9vYmplY3RDb25zdHJhaW50c01hcCA9IG5ldyBNYXA8VEhSRUUuT2JqZWN0M0QsIFNldDxWUk1Ob2RlQ29uc3RyYWludD4+KCk7XG5cbiAgcHVibGljIGFkZENvbnN0cmFpbnQoY29uc3RyYWludDogVlJNTm9kZUNvbnN0cmFpbnQpOiB2b2lkIHtcbiAgICB0aGlzLl9jb25zdHJhaW50cy5hZGQoY29uc3RyYWludCk7XG5cbiAgICBsZXQgb2JqZWN0U2V0ID0gdGhpcy5fb2JqZWN0Q29uc3RyYWludHNNYXAuZ2V0KGNvbnN0cmFpbnQuZGVzdGluYXRpb24pO1xuICAgIGlmIChvYmplY3RTZXQgPT0gbnVsbCkge1xuICAgICAgb2JqZWN0U2V0ID0gbmV3IFNldDxWUk1Ob2RlQ29uc3RyYWludD4oKTtcbiAgICAgIHRoaXMuX29iamVjdENvbnN0cmFpbnRzTWFwLnNldChjb25zdHJhaW50LmRlc3RpbmF0aW9uLCBvYmplY3RTZXQpO1xuICAgIH1cbiAgICBvYmplY3RTZXQuYWRkKGNvbnN0cmFpbnQpO1xuICB9XG5cbiAgcHVibGljIGRlbGV0ZUNvbnN0cmFpbnQoY29uc3RyYWludDogVlJNTm9kZUNvbnN0cmFpbnQpOiB2b2lkIHtcbiAgICB0aGlzLl9jb25zdHJhaW50cy5kZWxldGUoY29uc3RyYWludCk7XG5cbiAgICBjb25zdCBvYmplY3RTZXQgPSB0aGlzLl9vYmplY3RDb25zdHJhaW50c01hcC5nZXQoY29uc3RyYWludC5kZXN0aW5hdGlvbikhO1xuICAgIG9iamVjdFNldC5kZWxldGUoY29uc3RyYWludCk7XG4gIH1cblxuICBwdWJsaWMgc2V0SW5pdFN0YXRlKCk6IHZvaWQge1xuICAgIGNvbnN0IGNvbnN0cmFpbnRzVHJpZWQgPSBuZXcgU2V0PFZSTU5vZGVDb25zdHJhaW50PigpO1xuICAgIGNvbnN0IGNvbnN0cmFpbnRzRG9uZSA9IG5ldyBTZXQ8VlJNTm9kZUNvbnN0cmFpbnQ+KCk7XG5cbiAgICBmb3IgKGNvbnN0IGNvbnN0cmFpbnQgb2YgdGhpcy5fY29uc3RyYWludHMpIHtcbiAgICAgIHRoaXMuX3Byb2Nlc3NDb25zdHJhaW50KGNvbnN0cmFpbnQsIGNvbnN0cmFpbnRzVHJpZWQsIGNvbnN0cmFpbnRzRG9uZSwgKGNvbnN0cmFpbnQpID0+IGNvbnN0cmFpbnQuc2V0SW5pdFN0YXRlKCkpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgY29uc3QgY29uc3RyYWludHNUcmllZCA9IG5ldyBTZXQ8VlJNTm9kZUNvbnN0cmFpbnQ+KCk7XG4gICAgY29uc3QgY29uc3RyYWludHNEb25lID0gbmV3IFNldDxWUk1Ob2RlQ29uc3RyYWludD4oKTtcblxuICAgIGZvciAoY29uc3QgY29uc3RyYWludCBvZiB0aGlzLl9jb25zdHJhaW50cykge1xuICAgICAgdGhpcy5fcHJvY2Vzc0NvbnN0cmFpbnQoY29uc3RyYWludCwgY29uc3RyYWludHNUcmllZCwgY29uc3RyYWludHNEb25lLCAoY29uc3RyYWludCkgPT4gY29uc3RyYWludC51cGRhdGUoKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBhIGNvbnN0cmFpbnQuXG4gICAqIElmIHRoZXJlIGFyZSBvdGhlciBjb25zdHJhaW50cyB0aGF0IGFyZSBkZXBlbmRhbnQsIGl0IHdpbGwgdHJ5IHRvIHVwZGF0ZSB0aGVtIHJlY3Vyc2l2ZWx5LlxuICAgKiBJdCBtaWdodCB0aHJvdyBhbiBlcnJvciBpZiB0aGVyZSBhcmUgY2lyY3VsYXIgZGVwZW5kZW5jaWVzLlxuICAgKlxuICAgKiBJbnRlbmRlZCB0byBiZSB1c2VkIGluIHtAbGluayB1cGRhdGV9IGFuZCB7QGxpbmsgX3Byb2Nlc3NDb25zdHJhaW50fSBpdHNlbGYgcmVjdXJzaXZlbHkuXG4gICAqXG4gICAqIEBwYXJhbSBjb25zdHJhaW50IEEgY29uc3RyYWludCB5b3Ugd2FudCB0byB1cGRhdGVcbiAgICogQHBhcmFtIGNvbnN0cmFpbnRzVHJpZWQgU2V0IG9mIGNvbnN0cmFpbnRzIHRoYXQgYXJlIGFscmVhZHkgdHJpZWQgdG8gYmUgdXBkYXRlZFxuICAgKiBAcGFyYW0gY29uc3RyYWludHNEb25lIFNldCBvZiBjb25zdHJhaW50cyB0aGF0IGFyZSBhbHJlYWR5IHVwIHRvIGRhdGVcbiAgICovXG4gIHByaXZhdGUgX3Byb2Nlc3NDb25zdHJhaW50KFxuICAgIGNvbnN0cmFpbnQ6IFZSTU5vZGVDb25zdHJhaW50LFxuICAgIGNvbnN0cmFpbnRzVHJpZWQ6IFNldDxWUk1Ob2RlQ29uc3RyYWludD4sXG4gICAgY29uc3RyYWludHNEb25lOiBTZXQ8VlJNTm9kZUNvbnN0cmFpbnQ+LFxuICAgIGNhbGxiYWNrOiAoY29uc3RyYWludDogVlJNTm9kZUNvbnN0cmFpbnQpID0+IHZvaWQsXG4gICk6IHZvaWQge1xuICAgIGlmIChjb25zdHJhaW50c0RvbmUuaGFzKGNvbnN0cmFpbnQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGNvbnN0cmFpbnRzVHJpZWQuaGFzKGNvbnN0cmFpbnQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZSTU5vZGVDb25zdHJhaW50TWFuYWdlcjogQ2lyY3VsYXIgZGVwZW5kZW5jeSBkZXRlY3RlZCB3aGlsZSB1cGRhdGluZyBjb25zdHJhaW50cycpO1xuICAgIH1cbiAgICBjb25zdHJhaW50c1RyaWVkLmFkZChjb25zdHJhaW50KTtcblxuICAgIGNvbnN0IGRlcE9iamVjdHMgPSBjb25zdHJhaW50LmRlcGVuZGVuY2llcztcbiAgICBmb3IgKGNvbnN0IGRlcE9iamVjdCBvZiBkZXBPYmplY3RzKSB7XG4gICAgICB0cmF2ZXJzZUFuY2VzdG9yc0Zyb21Sb290KGRlcE9iamVjdCwgKGRlcE9iamVjdEFuY2VzdG9yKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iamVjdFNldCA9IHRoaXMuX29iamVjdENvbnN0cmFpbnRzTWFwLmdldChkZXBPYmplY3RBbmNlc3Rvcik7XG4gICAgICAgIGlmIChvYmplY3RTZXQpIHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGRlcENvbnN0cmFpbnQgb2Ygb2JqZWN0U2V0KSB7XG4gICAgICAgICAgICB0aGlzLl9wcm9jZXNzQ29uc3RyYWludChkZXBDb25zdHJhaW50LCBjb25zdHJhaW50c1RyaWVkLCBjb25zdHJhaW50c0RvbmUsIGNhbGxiYWNrKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNhbGxiYWNrKGNvbnN0cmFpbnQpO1xuXG4gICAgY29uc3RyYWludHNEb25lLmFkZChjb25zdHJhaW50KTtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgcXVhdEludmVydENvbXBhdCB9IGZyb20gJy4vdXRpbHMvcXVhdEludmVydENvbXBhdCc7XG5pbXBvcnQgeyBWUk1Ob2RlQ29uc3RyYWludCB9IGZyb20gJy4vVlJNTm9kZUNvbnN0cmFpbnQnO1xuXG5jb25zdCBfcXVhdEEgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuY29uc3QgX3F1YXRCID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblxuLyoqXG4gKiBBIGNvbnN0cmFpbnQgdGhhdCB0cmFuc2ZlcnMgYSByb3RhdGlvbiBhcm91bmQgb25lIGF4aXMgb2YgYSBzb3VyY2UuXG4gKlxuICogU2VlOiBodHRwczovL2dpdGh1Yi5jb20vdnJtLWMvdnJtLXNwZWNpZmljYXRpb24vdHJlZS9tYXN0ZXIvc3BlY2lmaWNhdGlvbi9WUk1DX25vZGVfY29uc3RyYWludC0xLjBfYmV0YSNyb2xsLWNvbnN0cmFpbnRcbiAqL1xuZXhwb3J0IGNsYXNzIFZSTVJvdGF0aW9uQ29uc3RyYWludCBleHRlbmRzIFZSTU5vZGVDb25zdHJhaW50IHtcbiAgLyoqXG4gICAqIFRoZSByZXN0IHF1YXRlcm5pb24gb2YgdGhlIHtAbGluayBkZXN0aW5hdGlvbn0uXG4gICAqL1xuICBwcml2YXRlIF9kc3RSZXN0UXVhdDogVEhSRUUuUXVhdGVybmlvbjtcblxuICAvKipcbiAgICogVGhlIGludmVyc2Ugb2YgdGhlIHJlc3QgcXVhdGVybmlvbiBvZiB0aGUge0BsaW5rIHNvdXJjZX0uXG4gICAqL1xuICBwcml2YXRlIF9pbnZTcmNSZXN0UXVhdDogVEhSRUUuUXVhdGVybmlvbjtcblxuICBwdWJsaWMgZ2V0IGRlcGVuZGVuY2llcygpOiBTZXQ8VEhSRUUuT2JqZWN0M0Q8VEhSRUUuRXZlbnQ+PiB7XG4gICAgcmV0dXJuIG5ldyBTZXQoW3RoaXMuc291cmNlXSk7XG4gIH1cblxuICBwdWJsaWMgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFRIUkVFLk9iamVjdDNELCBzb3VyY2U6IFRIUkVFLk9iamVjdDNEKSB7XG4gICAgc3VwZXIoZGVzdGluYXRpb24sIHNvdXJjZSk7XG5cbiAgICB0aGlzLl9kc3RSZXN0UXVhdCA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG4gICAgdGhpcy5faW52U3JjUmVzdFF1YXQgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuICB9XG5cbiAgcHVibGljIHNldEluaXRTdGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9kc3RSZXN0UXVhdC5jb3B5KHRoaXMuZGVzdGluYXRpb24ucXVhdGVybmlvbik7XG4gICAgcXVhdEludmVydENvbXBhdCh0aGlzLl9pbnZTcmNSZXN0UXVhdC5jb3B5KHRoaXMuc291cmNlLnF1YXRlcm5pb24pKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgLy8gY2FsY3VsYXRlIHRoZSBkZWx0YSByb3RhdGlvbiBmcm9tIHRoZSByZXN0IGFib3V0IHRoZSBzb3VyY2VcbiAgICBjb25zdCBzcmNEZWx0YVF1YXQgPSBfcXVhdEEuY29weSh0aGlzLl9pbnZTcmNSZXN0UXVhdCkubXVsdGlwbHkodGhpcy5zb3VyY2UucXVhdGVybmlvbik7XG5cbiAgICAvLyBtdWx0aXBseSB0aGUgZGVsdGEgdG8gdGhlIHJlc3Qgb2YgdGhlIGRlc3RpbmF0aW9uXG4gICAgY29uc3QgdGFyZ2V0UXVhdCA9IF9xdWF0Qi5jb3B5KHRoaXMuX2RzdFJlc3RRdWF0KS5tdWx0aXBseShzcmNEZWx0YVF1YXQpO1xuXG4gICAgLy8gYmxlbmQgd2l0aCB0aGUgcmVzdCBxdWF0ZXJuaW9uIHVzaW5nIHdlaWdodFxuICAgIHRoaXMuZGVzdGluYXRpb24ucXVhdGVybmlvbi5jb3B5KHRoaXMuX2RzdFJlc3RRdWF0KS5zbGVycCh0YXJnZXRRdWF0LCB0aGlzLndlaWdodCk7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IHF1YXRJbnZlcnRDb21wYXQgfSBmcm9tICcuL3V0aWxzL3F1YXRJbnZlcnRDb21wYXQnO1xuaW1wb3J0IHsgVlJNTm9kZUNvbnN0cmFpbnQgfSBmcm9tICcuL1ZSTU5vZGVDb25zdHJhaW50JztcblxuY29uc3QgX3YzQSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfcXVhdEEgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuY29uc3QgX3F1YXRCID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblxuLyoqXG4gKiBBIGNvbnN0cmFpbnQgdGhhdCB0cmFuc2ZlcnMgYSByb3RhdGlvbiBhcm91bmQgb25lIGF4aXMgb2YgYSBzb3VyY2UuXG4gKlxuICogU2VlOiBodHRwczovL2dpdGh1Yi5jb20vdnJtLWMvdnJtLXNwZWNpZmljYXRpb24vdHJlZS9tYXN0ZXIvc3BlY2lmaWNhdGlvbi9WUk1DX25vZGVfY29uc3RyYWludC0xLjBfYmV0YSNyb2xsLWNvbnN0cmFpbnRcbiAqL1xuZXhwb3J0IGNsYXNzIFZSTVJvbGxDb25zdHJhaW50IGV4dGVuZHMgVlJNTm9kZUNvbnN0cmFpbnQge1xuICAvKipcbiAgICogVGhlIHJvbGwgYXhpcyBvZiB0aGUgY29uc3RyYWludC5cbiAgICovXG4gIHB1YmxpYyBnZXQgcm9sbEF4aXMoKTogJ1gnIHwgJ1knIHwgJ1onIHtcbiAgICByZXR1cm4gdGhpcy5fcm9sbEF4aXM7XG4gIH1cblxuICAvKipcbiAgICogVGhlIHJvbGwgYXhpcyBvZiB0aGUgY29uc3RyYWludC5cbiAgICovXG4gIHB1YmxpYyBzZXQgcm9sbEF4aXMocm9sbEF4aXM6ICdYJyB8ICdZJyB8ICdaJykge1xuICAgIHRoaXMuX3JvbGxBeGlzID0gcm9sbEF4aXM7XG4gICAgdGhpcy5fdjNSb2xsQXhpcy5zZXQocm9sbEF4aXMgPT09ICdYJyA/IDEuMCA6IDAuMCwgcm9sbEF4aXMgPT09ICdZJyA/IDEuMCA6IDAuMCwgcm9sbEF4aXMgPT09ICdaJyA/IDEuMCA6IDAuMCk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIHJvbGwgYXhpcyBvZiB0aGUgY29uc3RyYWludC5cbiAgICovXG4gIHByaXZhdGUgX3JvbGxBeGlzOiAnWCcgfCAnWScgfCAnWic7XG5cbiAgLyoqXG4gICAqIFRoZSB7QGxpbmsgX3JvbGxBeGlzfSBidXQgaW4gYW4gYWN0dWFsIFZlY3RvcjMgZm9ybS5cbiAgICovXG4gIHByaXZhdGUgX3YzUm9sbEF4aXM6IFRIUkVFLlZlY3RvcjM7XG5cbiAgLyoqXG4gICAqIFRoZSByZXN0IHF1YXRlcm5pb24gb2YgdGhlIHtAbGluayBkZXN0aW5hdGlvbn0uXG4gICAqL1xuICBwcml2YXRlIF9kc3RSZXN0UXVhdDogVEhSRUUuUXVhdGVybmlvbjtcblxuICAvKipcbiAgICogVGhlIGludmVyc2Ugb2YgdGhlIHJlc3QgcXVhdGVybmlvbiBvZiB0aGUge0BsaW5rIGRlc3RpbmF0aW9ufS5cbiAgICovXG4gIHByaXZhdGUgX2ludkRzdFJlc3RRdWF0OiBUSFJFRS5RdWF0ZXJuaW9uO1xuXG4gIC8qKlxuICAgKiBgc3JjUmVzdFF1YXQuaW52ZXJ0KCkgKiBkc3RSZXN0UXVhdGAuXG4gICAqL1xuICBwcml2YXRlIF9pbnZTcmNSZXN0UXVhdE11bERzdFJlc3RRdWF0OiBUSFJFRS5RdWF0ZXJuaW9uO1xuXG4gIHB1YmxpYyBnZXQgZGVwZW5kZW5jaWVzKCk6IFNldDxUSFJFRS5PYmplY3QzRDxUSFJFRS5FdmVudD4+IHtcbiAgICByZXR1cm4gbmV3IFNldChbdGhpcy5zb3VyY2VdKTtcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogVEhSRUUuT2JqZWN0M0QsIHNvdXJjZTogVEhSRUUuT2JqZWN0M0QpIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbiwgc291cmNlKTtcblxuICAgIHRoaXMuX3JvbGxBeGlzID0gJ1gnO1xuICAgIHRoaXMuX3YzUm9sbEF4aXMgPSBuZXcgVEhSRUUuVmVjdG9yMygxLCAwLCAwKTtcblxuICAgIHRoaXMuX2RzdFJlc3RRdWF0ID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbiAgICB0aGlzLl9pbnZEc3RSZXN0UXVhdCA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG4gICAgdGhpcy5faW52U3JjUmVzdFF1YXRNdWxEc3RSZXN0UXVhdCA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG4gIH1cblxuICBwdWJsaWMgc2V0SW5pdFN0YXRlKCk6IHZvaWQge1xuICAgIHRoaXMuX2RzdFJlc3RRdWF0LmNvcHkodGhpcy5kZXN0aW5hdGlvbi5xdWF0ZXJuaW9uKTtcbiAgICBxdWF0SW52ZXJ0Q29tcGF0KHRoaXMuX2ludkRzdFJlc3RRdWF0LmNvcHkodGhpcy5fZHN0UmVzdFF1YXQpKTtcbiAgICBxdWF0SW52ZXJ0Q29tcGF0KHRoaXMuX2ludlNyY1Jlc3RRdWF0TXVsRHN0UmVzdFF1YXQuY29weSh0aGlzLnNvdXJjZS5xdWF0ZXJuaW9uKSkubXVsdGlwbHkodGhpcy5fZHN0UmVzdFF1YXQpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICAvLyBjYWxjdWxhdGUgdGhlIGRlbHRhIHJvdGF0aW9uIGZyb20gdGhlIHJlc3QgYWJvdXQgdGhlIHNvdXJjZSwgdGhlbiBjb252ZXJ0IHRvIHRoZSBkZXN0aW5hdGlvbiBsb2NhbCBjb29yZFxuICAgIC8qKlxuICAgICAqIFdoYXQgdGhlIHF1YXREZWx0YSBpcyBpbnRlbmRlZCB0byBiZTpcbiAgICAgKlxuICAgICAqIGBgYHRzXG4gICAgICogY29uc3QgcXVhdFNyY0RlbHRhID0gX3F1YXRBXG4gICAgICogICAuY29weSggdGhpcy5faW52U3JjUmVzdFF1YXQgKVxuICAgICAqICAgLm11bHRpcGx5KCB0aGlzLnNvdXJjZS5xdWF0ZXJuaW9uICk7XG4gICAgICogY29uc3QgcXVhdFNyY0RlbHRhSW5QYXJlbnQgPSBfcXVhdEJcbiAgICAgKiAgIC5jb3B5KCB0aGlzLl9zcmNSZXN0UXVhdCApXG4gICAgICogICAubXVsdGlwbHkoIHF1YXRTcmNEZWx0YSApXG4gICAgICogICAubXVsdGlwbHkoIHRoaXMuX2ludlNyY1Jlc3RRdWF0ICk7XG4gICAgICogY29uc3QgcXVhdFNyY0RlbHRhSW5Ec3QgPSBfcXVhdEFcbiAgICAgKiAgIC5jb3B5KCB0aGlzLl9pbnZEc3RSZXN0UXVhdCApXG4gICAgICogICAubXVsdGlwbHkoIHF1YXRTcmNEZWx0YUluUGFyZW50IClcbiAgICAgKiAgIC5tdWx0aXBseSggdGhpcy5fZHN0UmVzdFF1YXQgKTtcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBjb25zdCBxdWF0RGVsdGEgPSBfcXVhdEFcbiAgICAgIC5jb3B5KHRoaXMuX2ludkRzdFJlc3RRdWF0KVxuICAgICAgLm11bHRpcGx5KHRoaXMuc291cmNlLnF1YXRlcm5pb24pXG4gICAgICAubXVsdGlwbHkodGhpcy5faW52U3JjUmVzdFF1YXRNdWxEc3RSZXN0UXVhdCk7XG5cbiAgICAvLyBjcmVhdGUgYSBmcm9tLXRvIHF1YXRlcm5pb25cbiAgICBjb25zdCBuMSA9IF92M0EuY29weSh0aGlzLl92M1JvbGxBeGlzKS5hcHBseVF1YXRlcm5pb24ocXVhdERlbHRhKTtcblxuICAgIC8qKlxuICAgICAqIFdoYXQgdGhlIHF1YXRGcm9tVG8gaXMgaW50ZW5kZWQgdG8gYmU6XG4gICAgICpcbiAgICAgKiBgYGB0c1xuICAgICAqIGNvbnN0IHF1YXRGcm9tVG8gPSBfcXVhdEIuc2V0RnJvbVVuaXRWZWN0b3JzKCB0aGlzLl92M1JvbGxBeGlzLCBuMSApLmludmVyc2UoKTtcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBjb25zdCBxdWF0RnJvbVRvID0gX3F1YXRCLnNldEZyb21Vbml0VmVjdG9ycyhuMSwgdGhpcy5fdjNSb2xsQXhpcyk7XG5cbiAgICAvLyBxdWF0RnJvbVRvICogcXVhdERlbHRhID09IHJvbGwgZXh0cmFjdGVkIGZyb20gcXVhdERlbHRhXG4gICAgY29uc3QgdGFyZ2V0UXVhdCA9IHF1YXRGcm9tVG8ucHJlbXVsdGlwbHkodGhpcy5fZHN0UmVzdFF1YXQpLm11bHRpcGx5KHF1YXREZWx0YSk7XG5cbiAgICAvLyBibGVuZCB3aXRoIHRoZSByZXN0IHF1YXRlcm5pb24gdXNpbmcgd2VpZ2h0XG4gICAgdGhpcy5kZXN0aW5hdGlvbi5xdWF0ZXJuaW9uLmNvcHkodGhpcy5fZHN0UmVzdFF1YXQpLnNsZXJwKHRhcmdldFF1YXQsIHRoaXMud2VpZ2h0KTtcbiAgfVxufVxuIiwiaW1wb3J0IHR5cGUgKiBhcyBDb25zdHJhaW50U2NoZW1hIGZyb20gJ0BwaXhpdi90eXBlcy12cm1jLW5vZGUtY29uc3RyYWludC0xLjAnO1xuaW1wb3J0IHR5cGUgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgdHlwZSB7IEdMVEYsIEdMVEZMb2FkZXJQbHVnaW4sIEdMVEZQYXJzZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyLmpzJztcbmltcG9ydCB7IFZSTU5vZGVDb25zdHJhaW50SGVscGVyIH0gZnJvbSAnLi9oZWxwZXJzJztcbmltcG9ydCB0eXBlIHsgVlJNTm9kZUNvbnN0cmFpbnRMb2FkZXJQbHVnaW5PcHRpb25zIH0gZnJvbSAnLi9WUk1Ob2RlQ29uc3RyYWludExvYWRlclBsdWdpbk9wdGlvbnMnO1xuaW1wb3J0IHsgVlJNTm9kZUNvbnN0cmFpbnRNYW5hZ2VyIH0gZnJvbSAnLi9WUk1Ob2RlQ29uc3RyYWludE1hbmFnZXInO1xuaW1wb3J0IHsgVlJNUm90YXRpb25Db25zdHJhaW50IH0gZnJvbSAnLi9WUk1Sb3RhdGlvbkNvbnN0cmFpbnQnO1xuaW1wb3J0IHsgR0xURiBhcyBHTFRGU2NoZW1hIH0gZnJvbSAnQGdsdGYtdHJhbnNmb3JtL2NvcmUnO1xuaW1wb3J0IHsgVlJNQWltQ29uc3RyYWludCB9IGZyb20gJy4vVlJNQWltQ29uc3RyYWludCc7XG5pbXBvcnQgeyBWUk1Sb2xsQ29uc3RyYWludCB9IGZyb20gJy4vVlJNUm9sbENvbnN0cmFpbnQnO1xuXG4vKipcbiAqIFBvc3NpYmxlIHNwZWMgdmVyc2lvbnMgaXQgcmVjb2duaXplcy5cbiAqL1xuY29uc3QgUE9TU0lCTEVfU1BFQ19WRVJTSU9OUyA9IG5ldyBTZXQoWycxLjAnLCAnMS4wLWJldGEnXSk7XG5cbmV4cG9ydCBjbGFzcyBWUk1Ob2RlQ29uc3RyYWludExvYWRlclBsdWdpbiBpbXBsZW1lbnRzIEdMVEZMb2FkZXJQbHVnaW4ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEVYVEVOU0lPTl9OQU1FID0gJ1ZSTUNfbm9kZV9jb25zdHJhaW50JztcblxuICAvKipcbiAgICogU3BlY2lmeSBhbiBPYmplY3QzRCB0byBhZGQge0BsaW5rIFZSTU5vZGVDb25zdHJhaW50SGVscGVyfSBzLlxuICAgKiBJZiBub3Qgc3BlY2lmaWVkLCBoZWxwZXIgd2lsbCBub3QgYmUgY3JlYXRlZC5cbiAgICogSWYgYHJlbmRlck9yZGVyYCBpcyBzZXQgdG8gdGhlIHJvb3QsIGhlbHBlcnMgd2lsbCBjb3B5IHRoZSBzYW1lIGByZW5kZXJPcmRlcmAgLlxuICAgKi9cbiAgcHVibGljIGhlbHBlclJvb3Q/OiBUSFJFRS5PYmplY3QzRDtcblxuICBwdWJsaWMgcmVhZG9ubHkgcGFyc2VyOiBHTFRGUGFyc2VyO1xuXG4gIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBWUk1Ob2RlQ29uc3RyYWludExvYWRlclBsdWdpbi5FWFRFTlNJT05fTkFNRTtcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJzZXI6IEdMVEZQYXJzZXIsIG9wdGlvbnM/OiBWUk1Ob2RlQ29uc3RyYWludExvYWRlclBsdWdpbk9wdGlvbnMpIHtcbiAgICB0aGlzLnBhcnNlciA9IHBhcnNlcjtcblxuICAgIHRoaXMuaGVscGVyUm9vdCA9IG9wdGlvbnM/LmhlbHBlclJvb3Q7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgYWZ0ZXJSb290KGdsdGY6IEdMVEYpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBnbHRmLnVzZXJEYXRhLnZybU5vZGVDb25zdHJhaW50TWFuYWdlciA9IGF3YWl0IHRoaXMuX2ltcG9ydChnbHRmKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbXBvcnQgY29uc3RyYWludHMgZnJvbSBhIEdMVEYgYW5kIHJldHVybnMgYSB7QGxpbmsgVlJNTm9kZUNvbnN0cmFpbnRNYW5hZ2VyfS5cbiAgICogSXQgbWlnaHQgcmV0dXJuIGBudWxsYCBpbnN0ZWFkIHdoZW4gaXQgZG9lcyBub3QgbmVlZCB0byBiZSBjcmVhdGVkIG9yIHNvbWV0aGluZyBnbyB3cm9uZy5cbiAgICpcbiAgICogQHBhcmFtIGdsdGYgQSBwYXJzZWQgcmVzdWx0IG9mIEdMVEYgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gICAqL1xuICBwcm90ZWN0ZWQgYXN5bmMgX2ltcG9ydChnbHRmOiBHTFRGKTogUHJvbWlzZTxWUk1Ob2RlQ29uc3RyYWludE1hbmFnZXIgfCBudWxsPiB7XG4gICAgY29uc3QganNvbiA9IHRoaXMucGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAgIC8vIGVhcmx5IGFib3J0IGlmIGl0IGRvZXNuJ3QgdXNlIGNvbnN0cmFpbnRzXG4gICAgY29uc3QgaXNDb25zdHJhaW50c1VzZWQgPSBqc29uLmV4dGVuc2lvbnNVc2VkPy5pbmRleE9mKFZSTU5vZGVDb25zdHJhaW50TG9hZGVyUGx1Z2luLkVYVEVOU0lPTl9OQU1FKSAhPT0gLTE7XG4gICAgaWYgKCFpc0NvbnN0cmFpbnRzVXNlZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgbWFuYWdlciA9IG5ldyBWUk1Ob2RlQ29uc3RyYWludE1hbmFnZXIoKTtcbiAgICBjb25zdCB0aHJlZU5vZGVzOiBUSFJFRS5PYmplY3QzRFtdID0gYXdhaXQgdGhpcy5wYXJzZXIuZ2V0RGVwZW5kZW5jaWVzKCdub2RlJyk7XG5cbiAgICAvLyBpbXBvcnQgY29uc3RyYWludHMgZm9yIGVhY2ggbm9kZXNcbiAgICB0aHJlZU5vZGVzLmZvckVhY2goKG5vZGUsIG5vZGVJbmRleCkgPT4ge1xuICAgICAgY29uc3Qgc2NoZW1hTm9kZSA9IGpzb24ubm9kZXMhW25vZGVJbmRleF07XG5cbiAgICAgIC8vIGNoZWNrIGlmIHRoZSBleHRlbnNpb24gdXNlcyB0aGUgZXh0ZW5zaW9uXG4gICAgICBjb25zdCBleHRlbnNpb24gPSBzY2hlbWFOb2RlPy5leHRlbnNpb25zPy5bVlJNTm9kZUNvbnN0cmFpbnRMb2FkZXJQbHVnaW4uRVhURU5TSU9OX05BTUVdIGFzXG4gICAgICAgIHwgQ29uc3RyYWludFNjaGVtYS5WUk1DTm9kZUNvbnN0cmFpbnRcbiAgICAgICAgfCB1bmRlZmluZWQ7XG5cbiAgICAgIGlmIChleHRlbnNpb24gPT0gbnVsbCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNwZWNWZXJzaW9uID0gZXh0ZW5zaW9uLnNwZWNWZXJzaW9uO1xuICAgICAgaWYgKCFQT1NTSUJMRV9TUEVDX1ZFUlNJT05TLmhhcyhzcGVjVmVyc2lvbikpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIGBWUk1Ob2RlQ29uc3RyYWludExvYWRlclBsdWdpbjogVW5rbm93biAke1ZSTU5vZGVDb25zdHJhaW50TG9hZGVyUGx1Z2luLkVYVEVOU0lPTl9OQU1FfSBzcGVjVmVyc2lvbiBcIiR7c3BlY1ZlcnNpb259XCJgLFxuICAgICAgICApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNvbnN0cmFpbnREZWYgPSBleHRlbnNpb24uY29uc3RyYWludDtcblxuICAgICAgLy8gaW1wb3J0IGNvbnN0cmFpbnRzXG4gICAgICBpZiAoY29uc3RyYWludERlZi5yb2xsICE9IG51bGwpIHtcbiAgICAgICAgY29uc3QgY29uc3RyYWludCA9IHRoaXMuX2ltcG9ydFJvbGxDb25zdHJhaW50KG5vZGUsIHRocmVlTm9kZXMsIGNvbnN0cmFpbnREZWYucm9sbCk7XG4gICAgICAgIG1hbmFnZXIuYWRkQ29uc3RyYWludChjb25zdHJhaW50KTtcbiAgICAgIH0gZWxzZSBpZiAoY29uc3RyYWludERlZi5haW0gIT0gbnVsbCkge1xuICAgICAgICBjb25zdCBjb25zdHJhaW50ID0gdGhpcy5faW1wb3J0QWltQ29uc3RyYWludChub2RlLCB0aHJlZU5vZGVzLCBjb25zdHJhaW50RGVmLmFpbSk7XG4gICAgICAgIG1hbmFnZXIuYWRkQ29uc3RyYWludChjb25zdHJhaW50KTtcbiAgICAgIH0gZWxzZSBpZiAoY29uc3RyYWludERlZi5yb3RhdGlvbiAhPSBudWxsKSB7XG4gICAgICAgIGNvbnN0IGNvbnN0cmFpbnQgPSB0aGlzLl9pbXBvcnRSb3RhdGlvbkNvbnN0cmFpbnQobm9kZSwgdGhyZWVOb2RlcywgY29uc3RyYWludERlZi5yb3RhdGlvbik7XG4gICAgICAgIG1hbmFnZXIuYWRkQ29uc3RyYWludChjb25zdHJhaW50KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIGluaXQgY29uc3RyYWludHNcbiAgICBnbHRmLnNjZW5lLnVwZGF0ZU1hdHJpeFdvcmxkKCk7XG4gICAgbWFuYWdlci5zZXRJbml0U3RhdGUoKTtcblxuICAgIHJldHVybiBtYW5hZ2VyO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9pbXBvcnRSb2xsQ29uc3RyYWludChcbiAgICBkZXN0aW5hdGlvbjogVEhSRUUuT2JqZWN0M0QsXG4gICAgbm9kZXM6IFRIUkVFLk9iamVjdDNEW10sXG4gICAgcm9sbENvbnN0cmFpbnREZWY6IENvbnN0cmFpbnRTY2hlbWEuUm9sbENvbnN0cmFpbnQsXG4gICk6IFZSTVJvbGxDb25zdHJhaW50IHtcbiAgICBjb25zdCB7IHNvdXJjZTogc291cmNlSW5kZXgsIHJvbGxBeGlzLCB3ZWlnaHQgfSA9IHJvbGxDb25zdHJhaW50RGVmO1xuICAgIGNvbnN0IHNvdXJjZSA9IG5vZGVzW3NvdXJjZUluZGV4XTtcbiAgICBjb25zdCBjb25zdHJhaW50ID0gbmV3IFZSTVJvbGxDb25zdHJhaW50KGRlc3RpbmF0aW9uLCBzb3VyY2UpO1xuXG4gICAgaWYgKHJvbGxBeGlzICE9IG51bGwpIHtcbiAgICAgIGNvbnN0cmFpbnQucm9sbEF4aXMgPSByb2xsQXhpcztcbiAgICB9XG4gICAgaWYgKHdlaWdodCAhPSBudWxsKSB7XG4gICAgICBjb25zdHJhaW50LndlaWdodCA9IHdlaWdodDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5oZWxwZXJSb290KSB7XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgVlJNTm9kZUNvbnN0cmFpbnRIZWxwZXIoY29uc3RyYWludCk7XG4gICAgICB0aGlzLmhlbHBlclJvb3QuYWRkKGhlbHBlcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbnN0cmFpbnQ7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2ltcG9ydEFpbUNvbnN0cmFpbnQoXG4gICAgZGVzdGluYXRpb246IFRIUkVFLk9iamVjdDNELFxuICAgIG5vZGVzOiBUSFJFRS5PYmplY3QzRFtdLFxuICAgIGFpbUNvbnN0cmFpbnREZWY6IENvbnN0cmFpbnRTY2hlbWEuQWltQ29uc3RyYWludCxcbiAgKTogVlJNQWltQ29uc3RyYWludCB7XG4gICAgY29uc3QgeyBzb3VyY2U6IHNvdXJjZUluZGV4LCBhaW1BeGlzLCB3ZWlnaHQgfSA9IGFpbUNvbnN0cmFpbnREZWY7XG4gICAgY29uc3Qgc291cmNlID0gbm9kZXNbc291cmNlSW5kZXhdO1xuICAgIGNvbnN0IGNvbnN0cmFpbnQgPSBuZXcgVlJNQWltQ29uc3RyYWludChkZXN0aW5hdGlvbiwgc291cmNlKTtcblxuICAgIGlmIChhaW1BeGlzICE9IG51bGwpIHtcbiAgICAgIGNvbnN0cmFpbnQuYWltQXhpcyA9IGFpbUF4aXM7XG4gICAgfVxuICAgIGlmICh3ZWlnaHQgIT0gbnVsbCkge1xuICAgICAgY29uc3RyYWludC53ZWlnaHQgPSB3ZWlnaHQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaGVscGVyUm9vdCkge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IFZSTU5vZGVDb25zdHJhaW50SGVscGVyKGNvbnN0cmFpbnQpO1xuICAgICAgdGhpcy5oZWxwZXJSb290LmFkZChoZWxwZXIpO1xuICAgIH1cblxuICAgIHJldHVybiBjb25zdHJhaW50O1xuICB9XG5cbiAgcHJvdGVjdGVkIF9pbXBvcnRSb3RhdGlvbkNvbnN0cmFpbnQoXG4gICAgZGVzdGluYXRpb246IFRIUkVFLk9iamVjdDNELFxuICAgIG5vZGVzOiBUSFJFRS5PYmplY3QzRFtdLFxuICAgIHJvdGF0aW9uQ29uc3RyYWludERlZjogQ29uc3RyYWludFNjaGVtYS5Sb3RhdGlvbkNvbnN0cmFpbnQsXG4gICk6IFZSTVJvdGF0aW9uQ29uc3RyYWludCB7XG4gICAgY29uc3QgeyBzb3VyY2U6IHNvdXJjZUluZGV4LCB3ZWlnaHQgfSA9IHJvdGF0aW9uQ29uc3RyYWludERlZjtcbiAgICBjb25zdCBzb3VyY2UgPSBub2Rlc1tzb3VyY2VJbmRleF07XG4gICAgY29uc3QgY29uc3RyYWludCA9IG5ldyBWUk1Sb3RhdGlvbkNvbnN0cmFpbnQoZGVzdGluYXRpb24sIHNvdXJjZSk7XG5cbiAgICBpZiAod2VpZ2h0ICE9IG51bGwpIHtcbiAgICAgIGNvbnN0cmFpbnQud2VpZ2h0ID0gd2VpZ2h0O1xuICAgIH1cblxuICAgIGlmICh0aGlzLmhlbHBlclJvb3QpIHtcbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBWUk1Ob2RlQ29uc3RyYWludEhlbHBlcihjb25zdHJhaW50KTtcbiAgICAgIHRoaXMuaGVscGVyUm9vdC5hZGQoaGVscGVyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29uc3RyYWludDtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIl92M0EiLCJfdjNCIiwiX3F1YXRBIiwiX3F1YXRCIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBR0EsTUFBTUEsTUFBSSxHQUFHLElBQUksS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBRXBCLE1BQUEsdUJBQXdCLFNBQVEsS0FBSyxDQUFDLEtBQUssQ0FBQTtB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
