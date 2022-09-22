/*!
 * @pixiv/three-vrm-node-constraint v1.0.0
 * Node constraint module for @pixiv/three-vrm
 *
 * Copyright (c) 2020-2021 pixiv Inc.
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyZWUtdnJtLW5vZGUtY29uc3RyYWludC5tb2R1bGUuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9oZWxwZXJzL1ZSTU5vZGVDb25zdHJhaW50SGVscGVyLnRzIiwiLi4vc3JjL3V0aWxzL2RlY29tcG9zZVBvc2l0aW9uLnRzIiwiLi4vc3JjL3V0aWxzL2RlY29tcG9zZVJvdGF0aW9uLnRzIiwiLi4vc3JjL3V0aWxzL3F1YXRJbnZlcnRDb21wYXQudHMiLCIuLi9zcmMvVlJNTm9kZUNvbnN0cmFpbnQudHMiLCIuLi9zcmMvVlJNQWltQ29uc3RyYWludC50cyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCIuLi9zcmMvdXRpbHMvdHJhdmVyc2VBbmNlc3RvcnNGcm9tUm9vdC50cyIsIi4uL3NyYy9WUk1Ob2RlQ29uc3RyYWludE1hbmFnZXIudHMiLCIuLi9zcmMvVlJNUm90YXRpb25Db25zdHJhaW50LnRzIiwiLi4vc3JjL1ZSTVJvbGxDb25zdHJhaW50LnRzIiwiLi4vc3JjL1ZSTU5vZGVDb25zdHJhaW50TG9hZGVyUGx1Z2luLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTU5vZGVDb25zdHJhaW50IH0gZnJvbSAnLi4vVlJNTm9kZUNvbnN0cmFpbnQnO1xuXG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuZXhwb3J0IGNsYXNzIFZSTU5vZGVDb25zdHJhaW50SGVscGVyIGV4dGVuZHMgVEhSRUUuR3JvdXAge1xuICBwdWJsaWMgcmVhZG9ubHkgY29uc3RyYWludDogVlJNTm9kZUNvbnN0cmFpbnQ7XG4gIHByaXZhdGUgX2xpbmU6IFRIUkVFLkxpbmU7XG4gIHByaXZhdGUgX2F0dHJQb3NpdGlvbjogVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb25zdHJhaW50OiBWUk1Ob2RlQ29uc3RyYWludCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLl9hdHRyUG9zaXRpb24gPSBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKG5ldyBGbG9hdDMyQXJyYXkoWzAsIDAsIDAsIDAsIDAsIDBdKSwgMyk7XG4gICAgdGhpcy5fYXR0clBvc2l0aW9uLnNldFVzYWdlKFRIUkVFLkR5bmFtaWNEcmF3VXNhZ2UpO1xuXG4gICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuQnVmZmVyR2VvbWV0cnkoKTtcbiAgICBnZW9tZXRyeS5zZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJywgdGhpcy5fYXR0clBvc2l0aW9uKTtcblxuICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLkxpbmVCYXNpY01hdGVyaWFsKHtcbiAgICAgIGNvbG9yOiAweGZmMDBmZixcbiAgICAgIGRlcHRoVGVzdDogZmFsc2UsXG4gICAgICBkZXB0aFdyaXRlOiBmYWxzZSxcbiAgICB9KTtcblxuICAgIHRoaXMuX2xpbmUgPSBuZXcgVEhSRUUuTGluZShnZW9tZXRyeSwgbWF0ZXJpYWwpO1xuICAgIHRoaXMuYWRkKHRoaXMuX2xpbmUpO1xuXG4gICAgdGhpcy5jb25zdHJhaW50ID0gY29uc3RyYWludDtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVNYXRyaXhXb3JsZChmb3JjZT86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBfdjNBLnNldEZyb21NYXRyaXhQb3NpdGlvbih0aGlzLmNvbnN0cmFpbnQuZGVzdGluYXRpb24ubWF0cml4V29ybGQpO1xuICAgIHRoaXMuX2F0dHJQb3NpdGlvbi5zZXRYWVooMCwgX3YzQS54LCBfdjNBLnksIF92M0Eueik7XG5cbiAgICBpZiAodGhpcy5jb25zdHJhaW50LnNvdXJjZSkge1xuICAgICAgX3YzQS5zZXRGcm9tTWF0cml4UG9zaXRpb24odGhpcy5jb25zdHJhaW50LnNvdXJjZS5tYXRyaXhXb3JsZCk7XG4gICAgfVxuICAgIHRoaXMuX2F0dHJQb3NpdGlvbi5zZXRYWVooMSwgX3YzQS54LCBfdjNBLnksIF92M0Eueik7XG5cbiAgICB0aGlzLl9hdHRyUG9zaXRpb24ubmVlZHNVcGRhdGUgPSB0cnVlO1xuXG4gICAgc3VwZXIudXBkYXRlTWF0cml4V29ybGQoZm9yY2UpO1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWNvbXBvc2VQb3NpdGlvbjxUIGV4dGVuZHMgVEhSRUUuVmVjdG9yMz4obWF0cml4OiBUSFJFRS5NYXRyaXg0LCB0YXJnZXQ6IFQpOiBUIHtcbiAgcmV0dXJuIHRhcmdldC5zZXQobWF0cml4LmVsZW1lbnRzWzEyXSwgbWF0cml4LmVsZW1lbnRzWzEzXSwgbWF0cml4LmVsZW1lbnRzWzE0XSk7XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3YzQiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWNvbXBvc2VSb3RhdGlvbjxUIGV4dGVuZHMgVEhSRUUuUXVhdGVybmlvbj4obWF0cml4OiBUSFJFRS5NYXRyaXg0LCB0YXJnZXQ6IFQpOiBUIHtcbiAgbWF0cml4LmRlY29tcG9zZShfdjNBLCB0YXJnZXQsIF92M0IpO1xuICByZXR1cm4gdGFyZ2V0O1xufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIEEgY29tcGF0IGZ1bmN0aW9uIGZvciBgUXVhdGVybmlvbi5pbnZlcnQoKWAgLyBgUXVhdGVybmlvbi5pbnZlcnNlKClgLlxuICogYFF1YXRlcm5pb24uaW52ZXJ0KClgIGlzIGludHJvZHVjZWQgaW4gcjEyMyBhbmQgYFF1YXRlcm5pb24uaW52ZXJzZSgpYCBlbWl0cyBhIHdhcm5pbmcuXG4gKiBXZSBhcmUgZ29pbmcgdG8gdXNlIHRoaXMgY29tcGF0IGZvciBhIHdoaWxlLlxuICogQHBhcmFtIHRhcmdldCBBIHRhcmdldCBxdWF0ZXJuaW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBxdWF0SW52ZXJ0Q29tcGF0PFQgZXh0ZW5kcyBUSFJFRS5RdWF0ZXJuaW9uPih0YXJnZXQ6IFQpOiBUIHtcbiAgaWYgKCh0YXJnZXQgYXMgYW55KS5pbnZlcnQpIHtcbiAgICB0YXJnZXQuaW52ZXJ0KCk7XG4gIH0gZWxzZSB7XG4gICAgKHRhcmdldCBhcyBhbnkpLmludmVyc2UoKTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbi8qKlxuICogQSBiYXNlIGNsYXNzIG9mIFZSTSBjb25zdHJhaW50IGNsYXNzZXMuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBWUk1Ob2RlQ29uc3RyYWludCB7XG4gIC8qKlxuICAgKiBUaGUgb2JqZWN0IGJlaW5nIGNvbnN0cmFpbmVkIGJ5IHRoZSB7QGxpbmsgc291cmNlfS5cbiAgICovXG4gIHB1YmxpYyBkZXN0aW5hdGlvbjogVEhSRUUuT2JqZWN0M0Q7XG5cbiAgLyoqXG4gICAqIFRoZSBvYmplY3QgY29uc3RyYWlucyB0aGUge0BsaW5rIGRlc3RpbmF0aW9ufS5cbiAgICovXG4gIHB1YmxpYyBzb3VyY2U6IFRIUkVFLk9iamVjdDNEO1xuXG4gIC8qKlxuICAgKiBUaGUgd2VpZ2h0IG9mIHRoZSBjb25zdHJhaW50LlxuICAgKi9cbiAgcHVibGljIHdlaWdodDogbnVtYmVyO1xuXG4gIHB1YmxpYyBhYnN0cmFjdCBnZXQgZGVwZW5kZW5jaWVzKCk6IFNldDxUSFJFRS5PYmplY3QzRD47XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBkZXN0aW5hdGlvbiBUaGUgZGVzdGluYXRpb24gb2JqZWN0XG4gICAqIEBwYXJhbSBzb3VyY2UgVGhlIHNvdXJjZSBvYmplY3RcbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogVEhSRUUuT2JqZWN0M0QsIHNvdXJjZTogVEhSRUUuT2JqZWN0M0QpIHtcbiAgICB0aGlzLmRlc3RpbmF0aW9uID0gZGVzdGluYXRpb247XG4gICAgdGhpcy5zb3VyY2UgPSBzb3VyY2U7XG5cbiAgICB0aGlzLndlaWdodCA9IDEuMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgaW5pdGlhbCBzdGF0ZSBvZiB0aGUgY29uc3RyYWludC5cbiAgICovXG4gIHB1YmxpYyBhYnN0cmFjdCBzZXRJbml0U3RhdGUoKTogdm9pZDtcblxuICAvKipcbiAgICogVXBkYXRlIGFuZCBhcHBseSB0aGUgY29uc3RyYWludC5cbiAgICovXG4gIHB1YmxpYyBhYnN0cmFjdCB1cGRhdGUoKTogdm9pZDtcbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IGRlY29tcG9zZVBvc2l0aW9uIH0gZnJvbSAnLi91dGlscy9kZWNvbXBvc2VQb3NpdGlvbic7XG5pbXBvcnQgeyBkZWNvbXBvc2VSb3RhdGlvbiB9IGZyb20gJy4vdXRpbHMvZGVjb21wb3NlUm90YXRpb24nO1xuaW1wb3J0IHsgcXVhdEludmVydENvbXBhdCB9IGZyb20gJy4vdXRpbHMvcXVhdEludmVydENvbXBhdCc7XG5pbXBvcnQgeyBWUk1Ob2RlQ29uc3RyYWludCB9IGZyb20gJy4vVlJNTm9kZUNvbnN0cmFpbnQnO1xuXG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF92M0IgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3YzQyA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfcXVhdEEgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuY29uc3QgX3F1YXRCID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbmNvbnN0IF9xdWF0QyA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5cbi8qKlxuICogQSBjb25zdHJhaW50IHRoYXQgbWFrZXMgaXQgbG9vayBhdCBhIHNvdXJjZSBvYmplY3QuXG4gKlxuICogU2VlOiBodHRwczovL2dpdGh1Yi5jb20vdnJtLWMvdnJtLXNwZWNpZmljYXRpb24vdHJlZS9tYXN0ZXIvc3BlY2lmaWNhdGlvbi9WUk1DX25vZGVfY29uc3RyYWludC0xLjBfYmV0YSNyb2xsLWNvbnN0cmFpbnRcbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUFpbUNvbnN0cmFpbnQgZXh0ZW5kcyBWUk1Ob2RlQ29uc3RyYWludCB7XG4gIC8qKlxuICAgKiBUaGUgYWltIGF4aXMgb2YgdGhlIGNvbnN0cmFpbnQuXG4gICAqL1xuICBwdWJsaWMgZ2V0IGFpbUF4aXMoKTogJ1Bvc2l0aXZlWCcgfCAnTmVnYXRpdmVYJyB8ICdQb3NpdGl2ZVknIHwgJ05lZ2F0aXZlWScgfCAnUG9zaXRpdmVaJyB8ICdOZWdhdGl2ZVonIHtcbiAgICByZXR1cm4gdGhpcy5fYWltQXhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgYWltIGF4aXMgb2YgdGhlIGNvbnN0cmFpbnQuXG4gICAqL1xuICBwdWJsaWMgc2V0IGFpbUF4aXMoYWltQXhpczogJ1Bvc2l0aXZlWCcgfCAnTmVnYXRpdmVYJyB8ICdQb3NpdGl2ZVknIHwgJ05lZ2F0aXZlWScgfCAnUG9zaXRpdmVaJyB8ICdOZWdhdGl2ZVonKSB7XG4gICAgdGhpcy5fYWltQXhpcyA9IGFpbUF4aXM7XG4gICAgdGhpcy5fdjNBaW1BeGlzLnNldChcbiAgICAgIGFpbUF4aXMgPT09ICdQb3NpdGl2ZVgnID8gMS4wIDogYWltQXhpcyA9PT0gJ05lZ2F0aXZlWCcgPyAtMS4wIDogMC4wLFxuICAgICAgYWltQXhpcyA9PT0gJ1Bvc2l0aXZlWScgPyAxLjAgOiBhaW1BeGlzID09PSAnTmVnYXRpdmVZJyA/IC0xLjAgOiAwLjAsXG4gICAgICBhaW1BeGlzID09PSAnUG9zaXRpdmVaJyA/IDEuMCA6IGFpbUF4aXMgPT09ICdOZWdhdGl2ZVonID8gLTEuMCA6IDAuMCxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBhaW0gYXhpcyBvZiB0aGUgY29uc3RyYWludC5cbiAgICovXG4gIHByaXZhdGUgX2FpbUF4aXM6ICdQb3NpdGl2ZVgnIHwgJ05lZ2F0aXZlWCcgfCAnUG9zaXRpdmVZJyB8ICdOZWdhdGl2ZVknIHwgJ1Bvc2l0aXZlWicgfCAnTmVnYXRpdmVaJztcblxuICAvKipcbiAgICogVGhlIHtAbGluayBfYWltQXhpc30gYnV0IGluIGFuIGFjdHVhbCBWZWN0b3IzIGZvcm0uXG4gICAqL1xuICBwcml2YXRlIF92M0FpbUF4aXM6IFRIUkVFLlZlY3RvcjM7XG5cbiAgLyoqXG4gICAqIFRoZSByZXN0IHF1YXRlcm5pb24gb2YgdGhlIHtAbGluayBkZXN0aW5hdGlvbn0uXG4gICAqL1xuICBwcml2YXRlIF9kc3RSZXN0UXVhdDogVEhSRUUuUXVhdGVybmlvbjtcblxuICBwdWJsaWMgZ2V0IGRlcGVuZGVuY2llcygpOiBTZXQ8VEhSRUUuT2JqZWN0M0Q8VEhSRUUuRXZlbnQ+PiB7XG4gICAgY29uc3Qgc2V0ID0gbmV3IFNldDxUSFJFRS5PYmplY3QzRD4oW3RoaXMuc291cmNlXSk7XG5cbiAgICBpZiAodGhpcy5kZXN0aW5hdGlvbi5wYXJlbnQpIHtcbiAgICAgIHNldC5hZGQodGhpcy5kZXN0aW5hdGlvbi5wYXJlbnQpO1xuICAgIH1cblxuICAgIHJldHVybiBzZXQ7XG4gIH1cblxuICBwdWJsaWMgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFRIUkVFLk9iamVjdDNELCBzb3VyY2U6IFRIUkVFLk9iamVjdDNEKSB7XG4gICAgc3VwZXIoZGVzdGluYXRpb24sIHNvdXJjZSk7XG5cbiAgICB0aGlzLl9haW1BeGlzID0gJ1Bvc2l0aXZlWCc7XG4gICAgdGhpcy5fdjNBaW1BeGlzID0gbmV3IFRIUkVFLlZlY3RvcjMoMSwgMCwgMCk7XG5cbiAgICB0aGlzLl9kc3RSZXN0UXVhdCA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG4gIH1cblxuICBwdWJsaWMgc2V0SW5pdFN0YXRlKCk6IHZvaWQge1xuICAgIHRoaXMuX2RzdFJlc3RRdWF0LmNvcHkodGhpcy5kZXN0aW5hdGlvbi5xdWF0ZXJuaW9uKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgLy8gdXBkYXRlIHdvcmxkIG1hdHJpeCBvZiBkZXN0aW5hdGlvbiBhbmQgc291cmNlIG1hbnVhbGx5XG4gICAgdGhpcy5kZXN0aW5hdGlvbi51cGRhdGVXb3JsZE1hdHJpeCh0cnVlLCBmYWxzZSk7XG4gICAgdGhpcy5zb3VyY2UudXBkYXRlV29ybGRNYXRyaXgodHJ1ZSwgZmFsc2UpO1xuXG4gICAgLy8gZ2V0IHdvcmxkIHF1YXRlcm5pb24gb2YgdGhlIHBhcmVudCBvZiB0aGUgZGVzdGluYXRpb25cbiAgICBjb25zdCBkc3RQYXJlbnRXb3JsZFF1YXQgPSBfcXVhdEEuaWRlbnRpdHkoKTtcbiAgICBjb25zdCBpbnZEc3RQYXJlbnRXb3JsZFF1YXQgPSBfcXVhdEIuaWRlbnRpdHkoKTtcbiAgICBpZiAodGhpcy5kZXN0aW5hdGlvbi5wYXJlbnQpIHtcbiAgICAgIGRlY29tcG9zZVJvdGF0aW9uKHRoaXMuZGVzdGluYXRpb24ucGFyZW50Lm1hdHJpeFdvcmxkLCBkc3RQYXJlbnRXb3JsZFF1YXQpO1xuICAgICAgcXVhdEludmVydENvbXBhdChpbnZEc3RQYXJlbnRXb3JsZFF1YXQuY29weShkc3RQYXJlbnRXb3JsZFF1YXQpKTtcbiAgICB9XG5cbiAgICAvLyBjYWxjdWxhdGUgZnJvbS10byB2ZWN0b3JzIGluIHdvcmxkIGNvb3JkXG4gICAgY29uc3QgYTAgPSBfdjNBLmNvcHkodGhpcy5fdjNBaW1BeGlzKS5hcHBseVF1YXRlcm5pb24odGhpcy5fZHN0UmVzdFF1YXQpLmFwcGx5UXVhdGVybmlvbihkc3RQYXJlbnRXb3JsZFF1YXQpO1xuICAgIGNvbnN0IGExID0gZGVjb21wb3NlUG9zaXRpb24odGhpcy5zb3VyY2UubWF0cml4V29ybGQsIF92M0IpXG4gICAgICAuc3ViKGRlY29tcG9zZVBvc2l0aW9uKHRoaXMuZGVzdGluYXRpb24ubWF0cml4V29ybGQsIF92M0MpKVxuICAgICAgLm5vcm1hbGl6ZSgpO1xuXG4gICAgLy8gY3JlYXRlIGEgZnJvbS10byBxdWF0ZXJuaW9uLCBjb252ZXJ0IHRvIGRlc3RpbmF0aW9uIGxvY2FsIGNvb3JkLCB0aGVuIG11bHRpcGx5IHJlc3QgcXVhdGVybmlvblxuICAgIGNvbnN0IHRhcmdldFF1YXQgPSBfcXVhdENcbiAgICAgIC5zZXRGcm9tVW5pdFZlY3RvcnMoYTAsIGExKVxuICAgICAgLnByZW11bHRpcGx5KGludkRzdFBhcmVudFdvcmxkUXVhdClcbiAgICAgIC5tdWx0aXBseShkc3RQYXJlbnRXb3JsZFF1YXQpXG4gICAgICAubXVsdGlwbHkodGhpcy5fZHN0UmVzdFF1YXQpO1xuXG4gICAgLy8gYmxlbmQgd2l0aCB0aGUgcmVzdCBxdWF0ZXJuaW9uIHVzaW5nIHdlaWdodFxuICAgIHRoaXMuZGVzdGluYXRpb24ucXVhdGVybmlvbi5jb3B5KHRoaXMuX2RzdFJlc3RRdWF0KS5zbGVycCh0YXJnZXRRdWF0LCB0aGlzLndlaWdodCk7XG4gIH1cbn1cbiIsIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XHJcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgb1trMl0gPSBtW2tdO1xyXG59KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgbykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKSkgX19jcmVhdGVCaW5kaW5nKG8sIG0sIHApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5KHRvLCBmcm9tKSB7XHJcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBmcm9tLmxlbmd0aCwgaiA9IHRvLmxlbmd0aDsgaSA8IGlsOyBpKyssIGorKylcclxuICAgICAgICB0b1tqXSA9IGZyb21baV07XHJcbiAgICByZXR1cm4gdG87XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcclxufSkgOiBmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcclxuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHByaXZhdGVNYXApIHtcclxuICAgIGlmICghcHJpdmF0ZU1hcC5oYXMocmVjZWl2ZXIpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImF0dGVtcHRlZCB0byBnZXQgcHJpdmF0ZSBmaWVsZCBvbiBub24taW5zdGFuY2VcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcHJpdmF0ZU1hcC5nZXQocmVjZWl2ZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgcHJpdmF0ZU1hcCwgdmFsdWUpIHtcclxuICAgIGlmICghcHJpdmF0ZU1hcC5oYXMocmVjZWl2ZXIpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImF0dGVtcHRlZCB0byBzZXQgcHJpdmF0ZSBmaWVsZCBvbiBub24taW5zdGFuY2VcIik7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlTWFwLnNldChyZWNlaXZlciwgdmFsdWUpO1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59XHJcbiIsImltcG9ydCB0eXBlICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIFRyYXZlcnNlIGFuY2VzdG9ycyBvZiBnaXZlbiBvYmplY3QgYW5kIGNhbGwgZ2l2ZW4gY2FsbGJhY2sgZnJvbSByb290IHNpZGUuXG4gKiBJdCB3aWxsIGluY2x1ZGUgdGhlIGdpdmVuIG9iamVjdCBpdHNlbGYuXG4gKlxuICogQHBhcmFtIG9iamVjdCBUaGUgb2JqZWN0IHlvdSB3YW50IHRvIHRyYXZlcnNlXG4gKiBAcGFyYW0gY2FsbGJhY2sgVGhlIGNhbGwgYmFjayBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgY2FsbGVkIGZvciBlYWNoIGFuY2VzdG9yc1xuICovXG5leHBvcnQgZnVuY3Rpb24gdHJhdmVyc2VBbmNlc3RvcnNGcm9tUm9vdChvYmplY3Q6IFRIUkVFLk9iamVjdDNELCBjYWxsYmFjazogKG9iamVjdDogVEhSRUUuT2JqZWN0M0QpID0+IHZvaWQpOiB2b2lkIHtcbiAgY29uc3QgYW5jZXN0b3JzOiBUSFJFRS5PYmplY3QzRFtdID0gW29iamVjdF07XG5cbiAgbGV0IGhlYWQ6IFRIUkVFLk9iamVjdDNEIHwgbnVsbCA9IG9iamVjdC5wYXJlbnQ7XG4gIHdoaWxlIChoZWFkICE9PSBudWxsKSB7XG4gICAgYW5jZXN0b3JzLnVuc2hpZnQoaGVhZCk7XG4gICAgaGVhZCA9IGhlYWQucGFyZW50O1xuICB9XG5cbiAgYW5jZXN0b3JzLmZvckVhY2goKGFuY2VzdG9yKSA9PiB7XG4gICAgY2FsbGJhY2soYW5jZXN0b3IpO1xuICB9KTtcbn1cbiIsImltcG9ydCB0eXBlICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHR5cGUgeyBWUk1Ob2RlQ29uc3RyYWludCB9IGZyb20gJy4vVlJNTm9kZUNvbnN0cmFpbnQnO1xuaW1wb3J0IHsgdHJhdmVyc2VBbmNlc3RvcnNGcm9tUm9vdCB9IGZyb20gJy4vdXRpbHMvdHJhdmVyc2VBbmNlc3RvcnNGcm9tUm9vdCc7XG5cbmV4cG9ydCBjbGFzcyBWUk1Ob2RlQ29uc3RyYWludE1hbmFnZXIge1xuICBwcml2YXRlIF9jb25zdHJhaW50cyA9IG5ldyBTZXQ8VlJNTm9kZUNvbnN0cmFpbnQ+KCk7XG4gIHB1YmxpYyBnZXQgY29uc3RyYWludHMoKTogU2V0PFZSTU5vZGVDb25zdHJhaW50PiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnN0cmFpbnRzO1xuICB9XG5cbiAgcHJpdmF0ZSBfb2JqZWN0Q29uc3RyYWludHNNYXAgPSBuZXcgTWFwPFRIUkVFLk9iamVjdDNELCBTZXQ8VlJNTm9kZUNvbnN0cmFpbnQ+PigpO1xuXG4gIHB1YmxpYyBhZGRDb25zdHJhaW50KGNvbnN0cmFpbnQ6IFZSTU5vZGVDb25zdHJhaW50KTogdm9pZCB7XG4gICAgdGhpcy5fY29uc3RyYWludHMuYWRkKGNvbnN0cmFpbnQpO1xuXG4gICAgbGV0IG9iamVjdFNldCA9IHRoaXMuX29iamVjdENvbnN0cmFpbnRzTWFwLmdldChjb25zdHJhaW50LmRlc3RpbmF0aW9uKTtcbiAgICBpZiAob2JqZWN0U2V0ID09IG51bGwpIHtcbiAgICAgIG9iamVjdFNldCA9IG5ldyBTZXQ8VlJNTm9kZUNvbnN0cmFpbnQ+KCk7XG4gICAgICB0aGlzLl9vYmplY3RDb25zdHJhaW50c01hcC5zZXQoY29uc3RyYWludC5kZXN0aW5hdGlvbiwgb2JqZWN0U2V0KTtcbiAgICB9XG4gICAgb2JqZWN0U2V0LmFkZChjb25zdHJhaW50KTtcbiAgfVxuXG4gIHB1YmxpYyBkZWxldGVDb25zdHJhaW50KGNvbnN0cmFpbnQ6IFZSTU5vZGVDb25zdHJhaW50KTogdm9pZCB7XG4gICAgdGhpcy5fY29uc3RyYWludHMuZGVsZXRlKGNvbnN0cmFpbnQpO1xuXG4gICAgY29uc3Qgb2JqZWN0U2V0ID0gdGhpcy5fb2JqZWN0Q29uc3RyYWludHNNYXAuZ2V0KGNvbnN0cmFpbnQuZGVzdGluYXRpb24pITtcbiAgICBvYmplY3RTZXQuZGVsZXRlKGNvbnN0cmFpbnQpO1xuICB9XG5cbiAgcHVibGljIHNldEluaXRTdGF0ZSgpOiB2b2lkIHtcbiAgICBjb25zdCBjb25zdHJhaW50c1RyaWVkID0gbmV3IFNldDxWUk1Ob2RlQ29uc3RyYWludD4oKTtcbiAgICBjb25zdCBjb25zdHJhaW50c0RvbmUgPSBuZXcgU2V0PFZSTU5vZGVDb25zdHJhaW50PigpO1xuXG4gICAgZm9yIChjb25zdCBjb25zdHJhaW50IG9mIHRoaXMuX2NvbnN0cmFpbnRzKSB7XG4gICAgICB0aGlzLl9wcm9jZXNzQ29uc3RyYWludChjb25zdHJhaW50LCBjb25zdHJhaW50c1RyaWVkLCBjb25zdHJhaW50c0RvbmUsIChjb25zdHJhaW50KSA9PiBjb25zdHJhaW50LnNldEluaXRTdGF0ZSgpKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIGNvbnN0IGNvbnN0cmFpbnRzVHJpZWQgPSBuZXcgU2V0PFZSTU5vZGVDb25zdHJhaW50PigpO1xuICAgIGNvbnN0IGNvbnN0cmFpbnRzRG9uZSA9IG5ldyBTZXQ8VlJNTm9kZUNvbnN0cmFpbnQ+KCk7XG5cbiAgICBmb3IgKGNvbnN0IGNvbnN0cmFpbnQgb2YgdGhpcy5fY29uc3RyYWludHMpIHtcbiAgICAgIHRoaXMuX3Byb2Nlc3NDb25zdHJhaW50KGNvbnN0cmFpbnQsIGNvbnN0cmFpbnRzVHJpZWQsIGNvbnN0cmFpbnRzRG9uZSwgKGNvbnN0cmFpbnQpID0+IGNvbnN0cmFpbnQudXBkYXRlKCkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgYSBjb25zdHJhaW50LlxuICAgKiBJZiB0aGVyZSBhcmUgb3RoZXIgY29uc3RyYWludHMgdGhhdCBhcmUgZGVwZW5kYW50LCBpdCB3aWxsIHRyeSB0byB1cGRhdGUgdGhlbSByZWN1cnNpdmVseS5cbiAgICogSXQgbWlnaHQgdGhyb3cgYW4gZXJyb3IgaWYgdGhlcmUgYXJlIGNpcmN1bGFyIGRlcGVuZGVuY2llcy5cbiAgICpcbiAgICogSW50ZW5kZWQgdG8gYmUgdXNlZCBpbiB7QGxpbmsgdXBkYXRlfSBhbmQge0BsaW5rIF9wcm9jZXNzQ29uc3RyYWludH0gaXRzZWxmIHJlY3Vyc2l2ZWx5LlxuICAgKlxuICAgKiBAcGFyYW0gY29uc3RyYWludCBBIGNvbnN0cmFpbnQgeW91IHdhbnQgdG8gdXBkYXRlXG4gICAqIEBwYXJhbSBjb25zdHJhaW50c1RyaWVkIFNldCBvZiBjb25zdHJhaW50cyB0aGF0IGFyZSBhbHJlYWR5IHRyaWVkIHRvIGJlIHVwZGF0ZWRcbiAgICogQHBhcmFtIGNvbnN0cmFpbnRzRG9uZSBTZXQgb2YgY29uc3RyYWludHMgdGhhdCBhcmUgYWxyZWFkeSB1cCB0byBkYXRlXG4gICAqL1xuICBwcml2YXRlIF9wcm9jZXNzQ29uc3RyYWludChcbiAgICBjb25zdHJhaW50OiBWUk1Ob2RlQ29uc3RyYWludCxcbiAgICBjb25zdHJhaW50c1RyaWVkOiBTZXQ8VlJNTm9kZUNvbnN0cmFpbnQ+LFxuICAgIGNvbnN0cmFpbnRzRG9uZTogU2V0PFZSTU5vZGVDb25zdHJhaW50PixcbiAgICBjYWxsYmFjazogKGNvbnN0cmFpbnQ6IFZSTU5vZGVDb25zdHJhaW50KSA9PiB2b2lkLFxuICApOiB2b2lkIHtcbiAgICBpZiAoY29uc3RyYWludHNEb25lLmhhcyhjb25zdHJhaW50KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChjb25zdHJhaW50c1RyaWVkLmhhcyhjb25zdHJhaW50KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdWUk1Ob2RlQ29uc3RyYWludE1hbmFnZXI6IENpcmN1bGFyIGRlcGVuZGVuY3kgZGV0ZWN0ZWQgd2hpbGUgdXBkYXRpbmcgY29uc3RyYWludHMnKTtcbiAgICB9XG4gICAgY29uc3RyYWludHNUcmllZC5hZGQoY29uc3RyYWludCk7XG5cbiAgICBjb25zdCBkZXBPYmplY3RzID0gY29uc3RyYWludC5kZXBlbmRlbmNpZXM7XG4gICAgZm9yIChjb25zdCBkZXBPYmplY3Qgb2YgZGVwT2JqZWN0cykge1xuICAgICAgdHJhdmVyc2VBbmNlc3RvcnNGcm9tUm9vdChkZXBPYmplY3QsIChkZXBPYmplY3RBbmNlc3RvcikgPT4ge1xuICAgICAgICBjb25zdCBvYmplY3RTZXQgPSB0aGlzLl9vYmplY3RDb25zdHJhaW50c01hcC5nZXQoZGVwT2JqZWN0QW5jZXN0b3IpO1xuICAgICAgICBpZiAob2JqZWN0U2V0KSB7XG4gICAgICAgICAgZm9yIChjb25zdCBkZXBDb25zdHJhaW50IG9mIG9iamVjdFNldCkge1xuICAgICAgICAgICAgdGhpcy5fcHJvY2Vzc0NvbnN0cmFpbnQoZGVwQ29uc3RyYWludCwgY29uc3RyYWludHNUcmllZCwgY29uc3RyYWludHNEb25lLCBjYWxsYmFjayk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjYWxsYmFjayhjb25zdHJhaW50KTtcblxuICAgIGNvbnN0cmFpbnRzRG9uZS5hZGQoY29uc3RyYWludCk7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IHF1YXRJbnZlcnRDb21wYXQgfSBmcm9tICcuL3V0aWxzL3F1YXRJbnZlcnRDb21wYXQnO1xuaW1wb3J0IHsgVlJNTm9kZUNvbnN0cmFpbnQgfSBmcm9tICcuL1ZSTU5vZGVDb25zdHJhaW50JztcblxuY29uc3QgX3F1YXRBID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbmNvbnN0IF9xdWF0QiA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5cbi8qKlxuICogQSBjb25zdHJhaW50IHRoYXQgdHJhbnNmZXJzIGEgcm90YXRpb24gYXJvdW5kIG9uZSBheGlzIG9mIGEgc291cmNlLlxuICpcbiAqIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL3ZybS1jL3ZybS1zcGVjaWZpY2F0aW9uL3RyZWUvbWFzdGVyL3NwZWNpZmljYXRpb24vVlJNQ19ub2RlX2NvbnN0cmFpbnQtMS4wX2JldGEjcm9sbC1jb25zdHJhaW50XG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1Sb3RhdGlvbkNvbnN0cmFpbnQgZXh0ZW5kcyBWUk1Ob2RlQ29uc3RyYWludCB7XG4gIC8qKlxuICAgKiBUaGUgcmVzdCBxdWF0ZXJuaW9uIG9mIHRoZSB7QGxpbmsgZGVzdGluYXRpb259LlxuICAgKi9cbiAgcHJpdmF0ZSBfZHN0UmVzdFF1YXQ6IFRIUkVFLlF1YXRlcm5pb247XG5cbiAgLyoqXG4gICAqIFRoZSBpbnZlcnNlIG9mIHRoZSByZXN0IHF1YXRlcm5pb24gb2YgdGhlIHtAbGluayBzb3VyY2V9LlxuICAgKi9cbiAgcHJpdmF0ZSBfaW52U3JjUmVzdFF1YXQ6IFRIUkVFLlF1YXRlcm5pb247XG5cbiAgcHVibGljIGdldCBkZXBlbmRlbmNpZXMoKTogU2V0PFRIUkVFLk9iamVjdDNEPFRIUkVFLkV2ZW50Pj4ge1xuICAgIHJldHVybiBuZXcgU2V0KFt0aGlzLnNvdXJjZV0pO1xuICB9XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBUSFJFRS5PYmplY3QzRCwgc291cmNlOiBUSFJFRS5PYmplY3QzRCkge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uLCBzb3VyY2UpO1xuXG4gICAgdGhpcy5fZHN0UmVzdFF1YXQgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuICAgIHRoaXMuX2ludlNyY1Jlc3RRdWF0ID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRJbml0U3RhdGUoKTogdm9pZCB7XG4gICAgdGhpcy5fZHN0UmVzdFF1YXQuY29weSh0aGlzLmRlc3RpbmF0aW9uLnF1YXRlcm5pb24pO1xuICAgIHF1YXRJbnZlcnRDb21wYXQodGhpcy5faW52U3JjUmVzdFF1YXQuY29weSh0aGlzLnNvdXJjZS5xdWF0ZXJuaW9uKSk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIC8vIGNhbGN1bGF0ZSB0aGUgZGVsdGEgcm90YXRpb24gZnJvbSB0aGUgcmVzdCBhYm91dCB0aGUgc291cmNlXG4gICAgY29uc3Qgc3JjRGVsdGFRdWF0ID0gX3F1YXRBLmNvcHkodGhpcy5faW52U3JjUmVzdFF1YXQpLm11bHRpcGx5KHRoaXMuc291cmNlLnF1YXRlcm5pb24pO1xuXG4gICAgLy8gbXVsdGlwbHkgdGhlIGRlbHRhIHRvIHRoZSByZXN0IG9mIHRoZSBkZXN0aW5hdGlvblxuICAgIGNvbnN0IHRhcmdldFF1YXQgPSBfcXVhdEIuY29weSh0aGlzLl9kc3RSZXN0UXVhdCkubXVsdGlwbHkoc3JjRGVsdGFRdWF0KTtcblxuICAgIC8vIGJsZW5kIHdpdGggdGhlIHJlc3QgcXVhdGVybmlvbiB1c2luZyB3ZWlnaHRcbiAgICB0aGlzLmRlc3RpbmF0aW9uLnF1YXRlcm5pb24uY29weSh0aGlzLl9kc3RSZXN0UXVhdCkuc2xlcnAodGFyZ2V0UXVhdCwgdGhpcy53ZWlnaHQpO1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBxdWF0SW52ZXJ0Q29tcGF0IH0gZnJvbSAnLi91dGlscy9xdWF0SW52ZXJ0Q29tcGF0JztcbmltcG9ydCB7IFZSTU5vZGVDb25zdHJhaW50IH0gZnJvbSAnLi9WUk1Ob2RlQ29uc3RyYWludCc7XG5cbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3F1YXRBID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbmNvbnN0IF9xdWF0QiA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5cbi8qKlxuICogQSBjb25zdHJhaW50IHRoYXQgdHJhbnNmZXJzIGEgcm90YXRpb24gYXJvdW5kIG9uZSBheGlzIG9mIGEgc291cmNlLlxuICpcbiAqIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL3ZybS1jL3ZybS1zcGVjaWZpY2F0aW9uL3RyZWUvbWFzdGVyL3NwZWNpZmljYXRpb24vVlJNQ19ub2RlX2NvbnN0cmFpbnQtMS4wX2JldGEjcm9sbC1jb25zdHJhaW50XG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1Sb2xsQ29uc3RyYWludCBleHRlbmRzIFZSTU5vZGVDb25zdHJhaW50IHtcbiAgLyoqXG4gICAqIFRoZSByb2xsIGF4aXMgb2YgdGhlIGNvbnN0cmFpbnQuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJvbGxBeGlzKCk6ICdYJyB8ICdZJyB8ICdaJyB7XG4gICAgcmV0dXJuIHRoaXMuX3JvbGxBeGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSByb2xsIGF4aXMgb2YgdGhlIGNvbnN0cmFpbnQuXG4gICAqL1xuICBwdWJsaWMgc2V0IHJvbGxBeGlzKHJvbGxBeGlzOiAnWCcgfCAnWScgfCAnWicpIHtcbiAgICB0aGlzLl9yb2xsQXhpcyA9IHJvbGxBeGlzO1xuICAgIHRoaXMuX3YzUm9sbEF4aXMuc2V0KHJvbGxBeGlzID09PSAnWCcgPyAxLjAgOiAwLjAsIHJvbGxBeGlzID09PSAnWScgPyAxLjAgOiAwLjAsIHJvbGxBeGlzID09PSAnWicgPyAxLjAgOiAwLjApO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSByb2xsIGF4aXMgb2YgdGhlIGNvbnN0cmFpbnQuXG4gICAqL1xuICBwcml2YXRlIF9yb2xsQXhpczogJ1gnIHwgJ1knIHwgJ1onO1xuXG4gIC8qKlxuICAgKiBUaGUge0BsaW5rIF9yb2xsQXhpc30gYnV0IGluIGFuIGFjdHVhbCBWZWN0b3IzIGZvcm0uXG4gICAqL1xuICBwcml2YXRlIF92M1JvbGxBeGlzOiBUSFJFRS5WZWN0b3IzO1xuXG4gIC8qKlxuICAgKiBUaGUgcmVzdCBxdWF0ZXJuaW9uIG9mIHRoZSB7QGxpbmsgZGVzdGluYXRpb259LlxuICAgKi9cbiAgcHJpdmF0ZSBfZHN0UmVzdFF1YXQ6IFRIUkVFLlF1YXRlcm5pb247XG5cbiAgLyoqXG4gICAqIFRoZSBpbnZlcnNlIG9mIHRoZSByZXN0IHF1YXRlcm5pb24gb2YgdGhlIHtAbGluayBkZXN0aW5hdGlvbn0uXG4gICAqL1xuICBwcml2YXRlIF9pbnZEc3RSZXN0UXVhdDogVEhSRUUuUXVhdGVybmlvbjtcblxuICAvKipcbiAgICogYHNyY1Jlc3RRdWF0LmludmVydCgpICogZHN0UmVzdFF1YXRgLlxuICAgKi9cbiAgcHJpdmF0ZSBfaW52U3JjUmVzdFF1YXRNdWxEc3RSZXN0UXVhdDogVEhSRUUuUXVhdGVybmlvbjtcblxuICBwdWJsaWMgZ2V0IGRlcGVuZGVuY2llcygpOiBTZXQ8VEhSRUUuT2JqZWN0M0Q8VEhSRUUuRXZlbnQ+PiB7XG4gICAgcmV0dXJuIG5ldyBTZXQoW3RoaXMuc291cmNlXSk7XG4gIH1cblxuICBwdWJsaWMgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFRIUkVFLk9iamVjdDNELCBzb3VyY2U6IFRIUkVFLk9iamVjdDNEKSB7XG4gICAgc3VwZXIoZGVzdGluYXRpb24sIHNvdXJjZSk7XG5cbiAgICB0aGlzLl9yb2xsQXhpcyA9ICdYJztcbiAgICB0aGlzLl92M1JvbGxBeGlzID0gbmV3IFRIUkVFLlZlY3RvcjMoMSwgMCwgMCk7XG5cbiAgICB0aGlzLl9kc3RSZXN0UXVhdCA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG4gICAgdGhpcy5faW52RHN0UmVzdFF1YXQgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuICAgIHRoaXMuX2ludlNyY1Jlc3RRdWF0TXVsRHN0UmVzdFF1YXQgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuICB9XG5cbiAgcHVibGljIHNldEluaXRTdGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9kc3RSZXN0UXVhdC5jb3B5KHRoaXMuZGVzdGluYXRpb24ucXVhdGVybmlvbik7XG4gICAgcXVhdEludmVydENvbXBhdCh0aGlzLl9pbnZEc3RSZXN0UXVhdC5jb3B5KHRoaXMuX2RzdFJlc3RRdWF0KSk7XG4gICAgcXVhdEludmVydENvbXBhdCh0aGlzLl9pbnZTcmNSZXN0UXVhdE11bERzdFJlc3RRdWF0LmNvcHkodGhpcy5zb3VyY2UucXVhdGVybmlvbikpLm11bHRpcGx5KHRoaXMuX2RzdFJlc3RRdWF0KTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgLy8gY2FsY3VsYXRlIHRoZSBkZWx0YSByb3RhdGlvbiBmcm9tIHRoZSByZXN0IGFib3V0IHRoZSBzb3VyY2UsIHRoZW4gY29udmVydCB0byB0aGUgZGVzdGluYXRpb24gbG9jYWwgY29vcmRcbiAgICAvKipcbiAgICAgKiBXaGF0IHRoZSBxdWF0RGVsdGEgaXMgaW50ZW5kZWQgdG8gYmU6XG4gICAgICpcbiAgICAgKiBgYGB0c1xuICAgICAqIGNvbnN0IHF1YXRTcmNEZWx0YSA9IF9xdWF0QVxuICAgICAqICAgLmNvcHkoIHRoaXMuX2ludlNyY1Jlc3RRdWF0IClcbiAgICAgKiAgIC5tdWx0aXBseSggdGhpcy5zb3VyY2UucXVhdGVybmlvbiApO1xuICAgICAqIGNvbnN0IHF1YXRTcmNEZWx0YUluUGFyZW50ID0gX3F1YXRCXG4gICAgICogICAuY29weSggdGhpcy5fc3JjUmVzdFF1YXQgKVxuICAgICAqICAgLm11bHRpcGx5KCBxdWF0U3JjRGVsdGEgKVxuICAgICAqICAgLm11bHRpcGx5KCB0aGlzLl9pbnZTcmNSZXN0UXVhdCApO1xuICAgICAqIGNvbnN0IHF1YXRTcmNEZWx0YUluRHN0ID0gX3F1YXRBXG4gICAgICogICAuY29weSggdGhpcy5faW52RHN0UmVzdFF1YXQgKVxuICAgICAqICAgLm11bHRpcGx5KCBxdWF0U3JjRGVsdGFJblBhcmVudCApXG4gICAgICogICAubXVsdGlwbHkoIHRoaXMuX2RzdFJlc3RRdWF0ICk7XG4gICAgICogYGBgXG4gICAgICovXG4gICAgY29uc3QgcXVhdERlbHRhID0gX3F1YXRBXG4gICAgICAuY29weSh0aGlzLl9pbnZEc3RSZXN0UXVhdClcbiAgICAgIC5tdWx0aXBseSh0aGlzLnNvdXJjZS5xdWF0ZXJuaW9uKVxuICAgICAgLm11bHRpcGx5KHRoaXMuX2ludlNyY1Jlc3RRdWF0TXVsRHN0UmVzdFF1YXQpO1xuXG4gICAgLy8gY3JlYXRlIGEgZnJvbS10byBxdWF0ZXJuaW9uXG4gICAgY29uc3QgbjEgPSBfdjNBLmNvcHkodGhpcy5fdjNSb2xsQXhpcykuYXBwbHlRdWF0ZXJuaW9uKHF1YXREZWx0YSk7XG5cbiAgICAvKipcbiAgICAgKiBXaGF0IHRoZSBxdWF0RnJvbVRvIGlzIGludGVuZGVkIHRvIGJlOlxuICAgICAqXG4gICAgICogYGBgdHNcbiAgICAgKiBjb25zdCBxdWF0RnJvbVRvID0gX3F1YXRCLnNldEZyb21Vbml0VmVjdG9ycyggdGhpcy5fdjNSb2xsQXhpcywgbjEgKS5pbnZlcnNlKCk7XG4gICAgICogYGBgXG4gICAgICovXG4gICAgY29uc3QgcXVhdEZyb21UbyA9IF9xdWF0Qi5zZXRGcm9tVW5pdFZlY3RvcnMobjEsIHRoaXMuX3YzUm9sbEF4aXMpO1xuXG4gICAgLy8gcXVhdEZyb21UbyAqIHF1YXREZWx0YSA9PSByb2xsIGV4dHJhY3RlZCBmcm9tIHF1YXREZWx0YVxuICAgIGNvbnN0IHRhcmdldFF1YXQgPSBxdWF0RnJvbVRvLnByZW11bHRpcGx5KHRoaXMuX2RzdFJlc3RRdWF0KS5tdWx0aXBseShxdWF0RGVsdGEpO1xuXG4gICAgLy8gYmxlbmQgd2l0aCB0aGUgcmVzdCBxdWF0ZXJuaW9uIHVzaW5nIHdlaWdodFxuICAgIHRoaXMuZGVzdGluYXRpb24ucXVhdGVybmlvbi5jb3B5KHRoaXMuX2RzdFJlc3RRdWF0KS5zbGVycCh0YXJnZXRRdWF0LCB0aGlzLndlaWdodCk7XG4gIH1cbn1cbiIsImltcG9ydCB0eXBlICogYXMgQ29uc3RyYWludFNjaGVtYSBmcm9tICdAcGl4aXYvdHlwZXMtdnJtYy1ub2RlLWNvbnN0cmFpbnQtMS4wJztcbmltcG9ydCB0eXBlICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHR5cGUgeyBHTFRGLCBHTFRGTG9hZGVyUGx1Z2luLCBHTFRGUGFyc2VyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlci5qcyc7XG5pbXBvcnQgeyBWUk1Ob2RlQ29uc3RyYWludEhlbHBlciB9IGZyb20gJy4vaGVscGVycyc7XG5pbXBvcnQgdHlwZSB7IFZSTU5vZGVDb25zdHJhaW50TG9hZGVyUGx1Z2luT3B0aW9ucyB9IGZyb20gJy4vVlJNTm9kZUNvbnN0cmFpbnRMb2FkZXJQbHVnaW5PcHRpb25zJztcbmltcG9ydCB7IFZSTU5vZGVDb25zdHJhaW50TWFuYWdlciB9IGZyb20gJy4vVlJNTm9kZUNvbnN0cmFpbnRNYW5hZ2VyJztcbmltcG9ydCB7IFZSTVJvdGF0aW9uQ29uc3RyYWludCB9IGZyb20gJy4vVlJNUm90YXRpb25Db25zdHJhaW50JztcbmltcG9ydCB7IEdMVEYgYXMgR0xURlNjaGVtYSB9IGZyb20gJ0BnbHRmLXRyYW5zZm9ybS9jb3JlJztcbmltcG9ydCB7IFZSTUFpbUNvbnN0cmFpbnQgfSBmcm9tICcuL1ZSTUFpbUNvbnN0cmFpbnQnO1xuaW1wb3J0IHsgVlJNUm9sbENvbnN0cmFpbnQgfSBmcm9tICcuL1ZSTVJvbGxDb25zdHJhaW50JztcblxuLyoqXG4gKiBQb3NzaWJsZSBzcGVjIHZlcnNpb25zIGl0IHJlY29nbml6ZXMuXG4gKi9cbmNvbnN0IFBPU1NJQkxFX1NQRUNfVkVSU0lPTlMgPSBuZXcgU2V0KFsnMS4wJywgJzEuMC1iZXRhJ10pO1xuXG5leHBvcnQgY2xhc3MgVlJNTm9kZUNvbnN0cmFpbnRMb2FkZXJQbHVnaW4gaW1wbGVtZW50cyBHTFRGTG9hZGVyUGx1Z2luIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBFWFRFTlNJT05fTkFNRSA9ICdWUk1DX25vZGVfY29uc3RyYWludCc7XG5cbiAgLyoqXG4gICAqIFNwZWNpZnkgYW4gT2JqZWN0M0QgdG8gYWRkIHtAbGluayBWUk1Ob2RlQ29uc3RyYWludEhlbHBlcn0gcy5cbiAgICogSWYgbm90IHNwZWNpZmllZCwgaGVscGVyIHdpbGwgbm90IGJlIGNyZWF0ZWQuXG4gICAqIElmIGByZW5kZXJPcmRlcmAgaXMgc2V0IHRvIHRoZSByb290LCBoZWxwZXJzIHdpbGwgY29weSB0aGUgc2FtZSBgcmVuZGVyT3JkZXJgIC5cbiAgICovXG4gIHB1YmxpYyBoZWxwZXJSb290PzogVEhSRUUuT2JqZWN0M0Q7XG5cbiAgcHVibGljIHJlYWRvbmx5IHBhcnNlcjogR0xURlBhcnNlcjtcblxuICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gVlJNTm9kZUNvbnN0cmFpbnRMb2FkZXJQbHVnaW4uRVhURU5TSU9OX05BTUU7XG4gIH1cblxuICBwdWJsaWMgY29uc3RydWN0b3IocGFyc2VyOiBHTFRGUGFyc2VyLCBvcHRpb25zPzogVlJNTm9kZUNvbnN0cmFpbnRMb2FkZXJQbHVnaW5PcHRpb25zKSB7XG4gICAgdGhpcy5wYXJzZXIgPSBwYXJzZXI7XG5cbiAgICB0aGlzLmhlbHBlclJvb3QgPSBvcHRpb25zPy5oZWxwZXJSb290O1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGFmdGVyUm9vdChnbHRmOiBHTFRGKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgZ2x0Zi51c2VyRGF0YS52cm1Ob2RlQ29uc3RyYWludE1hbmFnZXIgPSBhd2FpdCB0aGlzLl9pbXBvcnQoZ2x0Zik7XG4gIH1cblxuICAvKipcbiAgICogSW1wb3J0IGNvbnN0cmFpbnRzIGZyb20gYSBHTFRGIGFuZCByZXR1cm5zIGEge0BsaW5rIFZSTU5vZGVDb25zdHJhaW50TWFuYWdlcn0uXG4gICAqIEl0IG1pZ2h0IHJldHVybiBgbnVsbGAgaW5zdGVhZCB3aGVuIGl0IGRvZXMgbm90IG5lZWQgdG8gYmUgY3JlYXRlZCBvciBzb21ldGhpbmcgZ28gd3JvbmcuXG4gICAqXG4gICAqIEBwYXJhbSBnbHRmIEEgcGFyc2VkIHJlc3VsdCBvZiBHTFRGIHRha2VuIGZyb20gR0xURkxvYWRlclxuICAgKi9cbiAgcHJvdGVjdGVkIGFzeW5jIF9pbXBvcnQoZ2x0ZjogR0xURik6IFByb21pc2U8VlJNTm9kZUNvbnN0cmFpbnRNYW5hZ2VyIHwgbnVsbD4ge1xuICAgIGNvbnN0IGpzb24gPSB0aGlzLnBhcnNlci5qc29uIGFzIEdMVEZTY2hlbWEuSUdMVEY7XG5cbiAgICAvLyBlYXJseSBhYm9ydCBpZiBpdCBkb2Vzbid0IHVzZSBjb25zdHJhaW50c1xuICAgIGNvbnN0IGlzQ29uc3RyYWludHNVc2VkID0ganNvbi5leHRlbnNpb25zVXNlZD8uaW5kZXhPZihWUk1Ob2RlQ29uc3RyYWludExvYWRlclBsdWdpbi5FWFRFTlNJT05fTkFNRSkgIT09IC0xO1xuICAgIGlmICghaXNDb25zdHJhaW50c1VzZWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IG1hbmFnZXIgPSBuZXcgVlJNTm9kZUNvbnN0cmFpbnRNYW5hZ2VyKCk7XG4gICAgY29uc3QgdGhyZWVOb2RlczogVEhSRUUuT2JqZWN0M0RbXSA9IGF3YWl0IHRoaXMucGFyc2VyLmdldERlcGVuZGVuY2llcygnbm9kZScpO1xuXG4gICAgLy8gaW1wb3J0IGNvbnN0cmFpbnRzIGZvciBlYWNoIG5vZGVzXG4gICAgdGhyZWVOb2Rlcy5mb3JFYWNoKChub2RlLCBub2RlSW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IHNjaGVtYU5vZGUgPSBqc29uLm5vZGVzIVtub2RlSW5kZXhdO1xuXG4gICAgICAvLyBjaGVjayBpZiB0aGUgZXh0ZW5zaW9uIHVzZXMgdGhlIGV4dGVuc2lvblxuICAgICAgY29uc3QgZXh0ZW5zaW9uID0gc2NoZW1hTm9kZT8uZXh0ZW5zaW9ucz8uW1ZSTU5vZGVDb25zdHJhaW50TG9hZGVyUGx1Z2luLkVYVEVOU0lPTl9OQU1FXSBhc1xuICAgICAgICB8IENvbnN0cmFpbnRTY2hlbWEuVlJNQ05vZGVDb25zdHJhaW50XG4gICAgICAgIHwgdW5kZWZpbmVkO1xuXG4gICAgICBpZiAoZXh0ZW5zaW9uID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzcGVjVmVyc2lvbiA9IGV4dGVuc2lvbi5zcGVjVmVyc2lvbjtcbiAgICAgIGlmICghUE9TU0lCTEVfU1BFQ19WRVJTSU9OUy5oYXMoc3BlY1ZlcnNpb24pKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICBgVlJNTm9kZUNvbnN0cmFpbnRMb2FkZXJQbHVnaW46IFVua25vd24gJHtWUk1Ob2RlQ29uc3RyYWludExvYWRlclBsdWdpbi5FWFRFTlNJT05fTkFNRX0gc3BlY1ZlcnNpb24gXCIke3NwZWNWZXJzaW9ufVwiYCxcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjb25zdHJhaW50RGVmID0gZXh0ZW5zaW9uLmNvbnN0cmFpbnQ7XG5cbiAgICAgIC8vIGltcG9ydCBjb25zdHJhaW50c1xuICAgICAgaWYgKGNvbnN0cmFpbnREZWYucm9sbCAhPSBudWxsKSB7XG4gICAgICAgIGNvbnN0IGNvbnN0cmFpbnQgPSB0aGlzLl9pbXBvcnRSb2xsQ29uc3RyYWludChub2RlLCB0aHJlZU5vZGVzLCBjb25zdHJhaW50RGVmLnJvbGwpO1xuICAgICAgICBtYW5hZ2VyLmFkZENvbnN0cmFpbnQoY29uc3RyYWludCk7XG4gICAgICB9IGVsc2UgaWYgKGNvbnN0cmFpbnREZWYuYWltICE9IG51bGwpIHtcbiAgICAgICAgY29uc3QgY29uc3RyYWludCA9IHRoaXMuX2ltcG9ydEFpbUNvbnN0cmFpbnQobm9kZSwgdGhyZWVOb2RlcywgY29uc3RyYWludERlZi5haW0pO1xuICAgICAgICBtYW5hZ2VyLmFkZENvbnN0cmFpbnQoY29uc3RyYWludCk7XG4gICAgICB9IGVsc2UgaWYgKGNvbnN0cmFpbnREZWYucm90YXRpb24gIT0gbnVsbCkge1xuICAgICAgICBjb25zdCBjb25zdHJhaW50ID0gdGhpcy5faW1wb3J0Um90YXRpb25Db25zdHJhaW50KG5vZGUsIHRocmVlTm9kZXMsIGNvbnN0cmFpbnREZWYucm90YXRpb24pO1xuICAgICAgICBtYW5hZ2VyLmFkZENvbnN0cmFpbnQoY29uc3RyYWludCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBpbml0IGNvbnN0cmFpbnRzXG4gICAgZ2x0Zi5zY2VuZS51cGRhdGVNYXRyaXhXb3JsZCgpO1xuICAgIG1hbmFnZXIuc2V0SW5pdFN0YXRlKCk7XG5cbiAgICByZXR1cm4gbWFuYWdlcjtcbiAgfVxuXG4gIHByb3RlY3RlZCBfaW1wb3J0Um9sbENvbnN0cmFpbnQoXG4gICAgZGVzdGluYXRpb246IFRIUkVFLk9iamVjdDNELFxuICAgIG5vZGVzOiBUSFJFRS5PYmplY3QzRFtdLFxuICAgIHJvbGxDb25zdHJhaW50RGVmOiBDb25zdHJhaW50U2NoZW1hLlJvbGxDb25zdHJhaW50LFxuICApOiBWUk1Sb2xsQ29uc3RyYWludCB7XG4gICAgY29uc3QgeyBzb3VyY2U6IHNvdXJjZUluZGV4LCByb2xsQXhpcywgd2VpZ2h0IH0gPSByb2xsQ29uc3RyYWludERlZjtcbiAgICBjb25zdCBzb3VyY2UgPSBub2Rlc1tzb3VyY2VJbmRleF07XG4gICAgY29uc3QgY29uc3RyYWludCA9IG5ldyBWUk1Sb2xsQ29uc3RyYWludChkZXN0aW5hdGlvbiwgc291cmNlKTtcblxuICAgIGlmIChyb2xsQXhpcyAhPSBudWxsKSB7XG4gICAgICBjb25zdHJhaW50LnJvbGxBeGlzID0gcm9sbEF4aXM7XG4gICAgfVxuICAgIGlmICh3ZWlnaHQgIT0gbnVsbCkge1xuICAgICAgY29uc3RyYWludC53ZWlnaHQgPSB3ZWlnaHQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaGVscGVyUm9vdCkge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IFZSTU5vZGVDb25zdHJhaW50SGVscGVyKGNvbnN0cmFpbnQpO1xuICAgICAgdGhpcy5oZWxwZXJSb290LmFkZChoZWxwZXIpO1xuICAgIH1cblxuICAgIHJldHVybiBjb25zdHJhaW50O1xuICB9XG5cbiAgcHJvdGVjdGVkIF9pbXBvcnRBaW1Db25zdHJhaW50KFxuICAgIGRlc3RpbmF0aW9uOiBUSFJFRS5PYmplY3QzRCxcbiAgICBub2RlczogVEhSRUUuT2JqZWN0M0RbXSxcbiAgICBhaW1Db25zdHJhaW50RGVmOiBDb25zdHJhaW50U2NoZW1hLkFpbUNvbnN0cmFpbnQsXG4gICk6IFZSTUFpbUNvbnN0cmFpbnQge1xuICAgIGNvbnN0IHsgc291cmNlOiBzb3VyY2VJbmRleCwgYWltQXhpcywgd2VpZ2h0IH0gPSBhaW1Db25zdHJhaW50RGVmO1xuICAgIGNvbnN0IHNvdXJjZSA9IG5vZGVzW3NvdXJjZUluZGV4XTtcbiAgICBjb25zdCBjb25zdHJhaW50ID0gbmV3IFZSTUFpbUNvbnN0cmFpbnQoZGVzdGluYXRpb24sIHNvdXJjZSk7XG5cbiAgICBpZiAoYWltQXhpcyAhPSBudWxsKSB7XG4gICAgICBjb25zdHJhaW50LmFpbUF4aXMgPSBhaW1BeGlzO1xuICAgIH1cbiAgICBpZiAod2VpZ2h0ICE9IG51bGwpIHtcbiAgICAgIGNvbnN0cmFpbnQud2VpZ2h0ID0gd2VpZ2h0O1xuICAgIH1cblxuICAgIGlmICh0aGlzLmhlbHBlclJvb3QpIHtcbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBWUk1Ob2RlQ29uc3RyYWludEhlbHBlcihjb25zdHJhaW50KTtcbiAgICAgIHRoaXMuaGVscGVyUm9vdC5hZGQoaGVscGVyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29uc3RyYWludDtcbiAgfVxuXG4gIHByb3RlY3RlZCBfaW1wb3J0Um90YXRpb25Db25zdHJhaW50KFxuICAgIGRlc3RpbmF0aW9uOiBUSFJFRS5PYmplY3QzRCxcbiAgICBub2RlczogVEhSRUUuT2JqZWN0M0RbXSxcbiAgICByb3RhdGlvbkNvbnN0cmFpbnREZWY6IENvbnN0cmFpbnRTY2hlbWEuUm90YXRpb25Db25zdHJhaW50LFxuICApOiBWUk1Sb3RhdGlvbkNvbnN0cmFpbnQge1xuICAgIGNvbnN0IHsgc291cmNlOiBzb3VyY2VJbmRleCwgd2VpZ2h0IH0gPSByb3RhdGlvbkNvbnN0cmFpbnREZWY7XG4gICAgY29uc3Qgc291cmNlID0gbm9kZXNbc291cmNlSW5kZXhdO1xuICAgIGNvbnN0IGNvbnN0cmFpbnQgPSBuZXcgVlJNUm90YXRpb25Db25zdHJhaW50KGRlc3RpbmF0aW9uLCBzb3VyY2UpO1xuXG4gICAgaWYgKHdlaWdodCAhPSBudWxsKSB7XG4gICAgICBjb25zdHJhaW50LndlaWdodCA9IHdlaWdodDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5oZWxwZXJSb290KSB7XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgVlJNTm9kZUNvbnN0cmFpbnRIZWxwZXIoY29uc3RyYWludCk7XG4gICAgICB0aGlzLmhlbHBlclJvb3QuYWRkKGhlbHBlcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbnN0cmFpbnQ7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJfdjNBIiwiX3YzQiIsIl9xdWF0QSIsIl9xdWF0QiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUdBLE1BQU1BLE1BQUksR0FBRyxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztNQUVwQix1QkFBd0IsU0FBUSxLQUFLLENBQUMsS0FBSztJQUt0RCxZQUFtQixVQUE2QjtRQUM5QyxLQUFLLEVBQUUsQ0FBQztRQUVSLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLElBQUksWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3hGLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRXBELE1BQU0sUUFBUSxHQUFHLElB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
