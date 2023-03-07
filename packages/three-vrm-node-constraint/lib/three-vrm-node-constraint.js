/*!
 * @pixiv/three-vrm-node-constraint v1.0.9
 * Node constraint module for @pixiv/three-vrm
 *
 * Copyright (c) 2020-2023 pixiv Inc.
 * @pixiv/three-vrm-node-constraint is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three')) :
    typeof define === 'function' && define.amd ? define(['exports', 'three'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.THREE_VRM_NODE_CONSTRAINT = {}, global.THREE));
})(this, (function (exports, THREE) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var THREE__namespace = /*#__PURE__*/_interopNamespace(THREE);

    const _v3A$3 = new THREE__namespace.Vector3();
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

    const _v3A$2 = new THREE__namespace.Vector3();
    const _v3B$1 = new THREE__namespace.Vector3();
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

    const _v3A$1 = new THREE__namespace.Vector3();
    const _v3B = new THREE__namespace.Vector3();
    const _v3C = new THREE__namespace.Vector3();
    const _quatA$2 = new THREE__namespace.Quaternion();
    const _quatB$2 = new THREE__namespace.Quaternion();
    const _quatC = new THREE__namespace.Quaternion();
    /**
     * A constraint that makes it look at a source object.
     *
     * See: https://github.com/vrm-c/vrm-specification/tree/master/specification/VRMC_node_constraint-1.0_beta#roll-constraint
     */
    class VRMAimConstraint extends VRMNodeConstraint {
        constructor(destination, source) {
            super(destination, source);
            this._aimAxis = 'PositiveX';
            this._v3AimAxis = new THREE__namespace.Vector3(1, 0, 0);
            this._dstRestQuat = new THREE__namespace.Quaternion();
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

    const _quatA$1 = new THREE__namespace.Quaternion();
    const _quatB$1 = new THREE__namespace.Quaternion();
    /**
     * A constraint that transfers a rotation around one axis of a source.
     *
     * See: https://github.com/vrm-c/vrm-specification/tree/master/specification/VRMC_node_constraint-1.0_beta#roll-constraint
     */
    class VRMRotationConstraint extends VRMNodeConstraint {
        constructor(destination, source) {
            super(destination, source);
            this._dstRestQuat = new THREE__namespace.Quaternion();
            this._invSrcRestQuat = new THREE__namespace.Quaternion();
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

    const _v3A = new THREE__namespace.Vector3();
    const _quatA = new THREE__namespace.Quaternion();
    const _quatB = new THREE__namespace.Quaternion();
    /**
     * A constraint that transfers a rotation around one axis of a source.
     *
     * See: https://github.com/vrm-c/vrm-specification/tree/master/specification/VRMC_node_constraint-1.0_beta#roll-constraint
     */
    class VRMRollConstraint extends VRMNodeConstraint {
        constructor(destination, source) {
            super(destination, source);
            this._rollAxis = 'X';
            this._v3RollAxis = new THREE__namespace.Vector3(1, 0, 0);
            this._dstRestQuat = new THREE__namespace.Quaternion();
            this._invDstRestQuat = new THREE__namespace.Quaternion();
            this._invSrcRestQuatMulDstRestQuat = new THREE__namespace.Quaternion();
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

    exports.VRMAimConstraint = VRMAimConstraint;
    exports.VRMNodeConstraint = VRMNodeConstraint;
    exports.VRMNodeConstraintHelper = VRMNodeConstraintHelper;
    exports.VRMNodeConstraintLoaderPlugin = VRMNodeConstraintLoaderPlugin;
    exports.VRMNodeConstraintManager = VRMNodeConstraintManager;
    exports.VRMRollConstraint = VRMRollConstraint;
    exports.VRMRotationConstraint = VRMRotationConstraint;

    Object.defineProperty(exports, '__esModule', { value: true });

    Object.assign(THREE, exports);

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyZWUtdnJtLW5vZGUtY29uc3RyYWludC5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL2hlbHBlcnMvVlJNTm9kZUNvbnN0cmFpbnRIZWxwZXIudHMiLCIuLi9zcmMvdXRpbHMvZGVjb21wb3NlUG9zaXRpb24udHMiLCIuLi9zcmMvdXRpbHMvZGVjb21wb3NlUm90YXRpb24udHMiLCIuLi9zcmMvdXRpbHMvcXVhdEludmVydENvbXBhdC50cyIsIi4uL3NyYy9WUk1Ob2RlQ29uc3RyYWludC50cyIsIi4uL3NyYy9WUk1BaW1Db25zdHJhaW50LnRzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIi4uL3NyYy91dGlscy90cmF2ZXJzZUFuY2VzdG9yc0Zyb21Sb290LnRzIiwiLi4vc3JjL1ZSTU5vZGVDb25zdHJhaW50TWFuYWdlci50cyIsIi4uL3NyYy9WUk1Sb3RhdGlvbkNvbnN0cmFpbnQudHMiLCIuLi9zcmMvVlJNUm9sbENvbnN0cmFpbnQudHMiLCIuLi9zcmMvVlJNTm9kZUNvbnN0cmFpbnRMb2FkZXJQbHVnaW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNTm9kZUNvbnN0cmFpbnQgfSBmcm9tICcuLi9WUk1Ob2RlQ29uc3RyYWludCc7XG5cbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5leHBvcnQgY2xhc3MgVlJNTm9kZUNvbnN0cmFpbnRIZWxwZXIgZXh0ZW5kcyBUSFJFRS5Hcm91cCB7XG4gIHB1YmxpYyByZWFkb25seSBjb25zdHJhaW50OiBWUk1Ob2RlQ29uc3RyYWludDtcbiAgcHJpdmF0ZSBfbGluZTogVEhSRUUuTGluZTtcbiAgcHJpdmF0ZSBfYXR0clBvc2l0aW9uOiBUSFJFRS5CdWZmZXJBdHRyaWJ1dGU7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGNvbnN0cmFpbnQ6IFZSTU5vZGVDb25zdHJhaW50KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuX2F0dHJQb3NpdGlvbiA9IG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUobmV3IEZsb2F0MzJBcnJheShbMCwgMCwgMCwgMCwgMCwgMF0pLCAzKTtcbiAgICB0aGlzLl9hdHRyUG9zaXRpb24uc2V0VXNhZ2UoVEhSRUUuRHluYW1pY0RyYXdVc2FnZSk7XG5cbiAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeSgpO1xuICAgIGdlb21ldHJ5LnNldEF0dHJpYnV0ZSgncG9zaXRpb24nLCB0aGlzLl9hdHRyUG9zaXRpb24pO1xuXG4gICAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTGluZUJhc2ljTWF0ZXJpYWwoe1xuICAgICAgY29sb3I6IDB4ZmYwMGZmLFxuICAgICAgZGVwdGhUZXN0OiBmYWxzZSxcbiAgICAgIGRlcHRoV3JpdGU6IGZhbHNlLFxuICAgIH0pO1xuXG4gICAgdGhpcy5fbGluZSA9IG5ldyBUSFJFRS5MaW5lKGdlb21ldHJ5LCBtYXRlcmlhbCk7XG4gICAgdGhpcy5hZGQodGhpcy5fbGluZSk7XG5cbiAgICB0aGlzLmNvbnN0cmFpbnQgPSBjb25zdHJhaW50O1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZU1hdHJpeFdvcmxkKGZvcmNlPzogYm9vbGVhbik6IHZvaWQge1xuICAgIF92M0Euc2V0RnJvbU1hdHJpeFBvc2l0aW9uKHRoaXMuY29uc3RyYWludC5kZXN0aW5hdGlvbi5tYXRyaXhXb3JsZCk7XG4gICAgdGhpcy5fYXR0clBvc2l0aW9uLnNldFhZWigwLCBfdjNBLngsIF92M0EueSwgX3YzQS56KTtcblxuICAgIGlmICh0aGlzLmNvbnN0cmFpbnQuc291cmNlKSB7XG4gICAgICBfdjNBLnNldEZyb21NYXRyaXhQb3NpdGlvbih0aGlzLmNvbnN0cmFpbnQuc291cmNlLm1hdHJpeFdvcmxkKTtcbiAgICB9XG4gICAgdGhpcy5fYXR0clBvc2l0aW9uLnNldFhZWigxLCBfdjNBLngsIF92M0EueSwgX3YzQS56KTtcblxuICAgIHRoaXMuX2F0dHJQb3NpdGlvbi5uZWVkc1VwZGF0ZSA9IHRydWU7XG5cbiAgICBzdXBlci51cGRhdGVNYXRyaXhXb3JsZChmb3JjZSk7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGRlY29tcG9zZVBvc2l0aW9uPFQgZXh0ZW5kcyBUSFJFRS5WZWN0b3IzPihtYXRyaXg6IFRIUkVFLk1hdHJpeDQsIHRhcmdldDogVCk6IFQge1xuICByZXR1cm4gdGFyZ2V0LnNldChtYXRyaXguZWxlbWVudHNbMTJdLCBtYXRyaXguZWxlbWVudHNbMTNdLCBtYXRyaXguZWxlbWVudHNbMTRdKTtcbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuY29uc3QgX3YzQSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfdjNCID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGRlY29tcG9zZVJvdGF0aW9uPFQgZXh0ZW5kcyBUSFJFRS5RdWF0ZXJuaW9uPihtYXRyaXg6IFRIUkVFLk1hdHJpeDQsIHRhcmdldDogVCk6IFQge1xuICBtYXRyaXguZGVjb21wb3NlKF92M0EsIHRhcmdldCwgX3YzQik7XG4gIHJldHVybiB0YXJnZXQ7XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbi8qKlxuICogQSBjb21wYXQgZnVuY3Rpb24gZm9yIGBRdWF0ZXJuaW9uLmludmVydCgpYCAvIGBRdWF0ZXJuaW9uLmludmVyc2UoKWAuXG4gKiBgUXVhdGVybmlvbi5pbnZlcnQoKWAgaXMgaW50cm9kdWNlZCBpbiByMTIzIGFuZCBgUXVhdGVybmlvbi5pbnZlcnNlKClgIGVtaXRzIGEgd2FybmluZy5cbiAqIFdlIGFyZSBnb2luZyB0byB1c2UgdGhpcyBjb21wYXQgZm9yIGEgd2hpbGUuXG4gKiBAcGFyYW0gdGFyZ2V0IEEgdGFyZ2V0IHF1YXRlcm5pb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHF1YXRJbnZlcnRDb21wYXQ8VCBleHRlbmRzIFRIUkVFLlF1YXRlcm5pb24+KHRhcmdldDogVCk6IFQge1xuICBpZiAoKHRhcmdldCBhcyBhbnkpLmludmVydCkge1xuICAgIHRhcmdldC5pbnZlcnQoKTtcbiAgfSBlbHNlIHtcbiAgICAodGFyZ2V0IGFzIGFueSkuaW52ZXJzZSgpO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBBIGJhc2UgY2xhc3Mgb2YgVlJNIGNvbnN0cmFpbnQgY2xhc3Nlcy5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFZSTU5vZGVDb25zdHJhaW50IHtcbiAgLyoqXG4gICAqIFRoZSBvYmplY3QgYmVpbmcgY29uc3RyYWluZWQgYnkgdGhlIHtAbGluayBzb3VyY2V9LlxuICAgKi9cbiAgcHVibGljIGRlc3RpbmF0aW9uOiBUSFJFRS5PYmplY3QzRDtcblxuICAvKipcbiAgICogVGhlIG9iamVjdCBjb25zdHJhaW5zIHRoZSB7QGxpbmsgZGVzdGluYXRpb259LlxuICAgKi9cbiAgcHVibGljIHNvdXJjZTogVEhSRUUuT2JqZWN0M0Q7XG5cbiAgLyoqXG4gICAqIFRoZSB3ZWlnaHQgb2YgdGhlIGNvbnN0cmFpbnQuXG4gICAqL1xuICBwdWJsaWMgd2VpZ2h0OiBudW1iZXI7XG5cbiAgcHVibGljIGFic3RyYWN0IGdldCBkZXBlbmRlbmNpZXMoKTogU2V0PFRIUkVFLk9iamVjdDNEPjtcblxuICAvKipcbiAgICogQHBhcmFtIGRlc3RpbmF0aW9uIFRoZSBkZXN0aW5hdGlvbiBvYmplY3RcbiAgICogQHBhcmFtIHNvdXJjZSBUaGUgc291cmNlIG9iamVjdFxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBUSFJFRS5PYmplY3QzRCwgc291cmNlOiBUSFJFRS5PYmplY3QzRCkge1xuICAgIHRoaXMuZGVzdGluYXRpb24gPSBkZXN0aW5hdGlvbjtcbiAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcblxuICAgIHRoaXMud2VpZ2h0ID0gMS4wO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBpbml0aWFsIHN0YXRlIG9mIHRoZSBjb25zdHJhaW50LlxuICAgKi9cbiAgcHVibGljIGFic3RyYWN0IHNldEluaXRTdGF0ZSgpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBVcGRhdGUgYW5kIGFwcGx5IHRoZSBjb25zdHJhaW50LlxuICAgKi9cbiAgcHVibGljIGFic3RyYWN0IHVwZGF0ZSgpOiB2b2lkO1xufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgZGVjb21wb3NlUG9zaXRpb24gfSBmcm9tICcuL3V0aWxzL2RlY29tcG9zZVBvc2l0aW9uJztcbmltcG9ydCB7IGRlY29tcG9zZVJvdGF0aW9uIH0gZnJvbSAnLi91dGlscy9kZWNvbXBvc2VSb3RhdGlvbic7XG5pbXBvcnQgeyBxdWF0SW52ZXJ0Q29tcGF0IH0gZnJvbSAnLi91dGlscy9xdWF0SW52ZXJ0Q29tcGF0JztcbmltcG9ydCB7IFZSTU5vZGVDb25zdHJhaW50IH0gZnJvbSAnLi9WUk1Ob2RlQ29uc3RyYWludCc7XG5cbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3YzQiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfdjNDID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF9xdWF0QSA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5jb25zdCBfcXVhdEIgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuY29uc3QgX3F1YXRDID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblxuLyoqXG4gKiBBIGNvbnN0cmFpbnQgdGhhdCBtYWtlcyBpdCBsb29rIGF0IGEgc291cmNlIG9iamVjdC5cbiAqXG4gKiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS92cm0tYy92cm0tc3BlY2lmaWNhdGlvbi90cmVlL21hc3Rlci9zcGVjaWZpY2F0aW9uL1ZSTUNfbm9kZV9jb25zdHJhaW50LTEuMF9iZXRhI3JvbGwtY29uc3RyYWludFxuICovXG5leHBvcnQgY2xhc3MgVlJNQWltQ29uc3RyYWludCBleHRlbmRzIFZSTU5vZGVDb25zdHJhaW50IHtcbiAgLyoqXG4gICAqIFRoZSBhaW0gYXhpcyBvZiB0aGUgY29uc3RyYWludC5cbiAgICovXG4gIHB1YmxpYyBnZXQgYWltQXhpcygpOiAnUG9zaXRpdmVYJyB8ICdOZWdhdGl2ZVgnIHwgJ1Bvc2l0aXZlWScgfCAnTmVnYXRpdmVZJyB8ICdQb3NpdGl2ZVonIHwgJ05lZ2F0aXZlWicge1xuICAgIHJldHVybiB0aGlzLl9haW1BeGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBhaW0gYXhpcyBvZiB0aGUgY29uc3RyYWludC5cbiAgICovXG4gIHB1YmxpYyBzZXQgYWltQXhpcyhhaW1BeGlzOiAnUG9zaXRpdmVYJyB8ICdOZWdhdGl2ZVgnIHwgJ1Bvc2l0aXZlWScgfCAnTmVnYXRpdmVZJyB8ICdQb3NpdGl2ZVonIHwgJ05lZ2F0aXZlWicpIHtcbiAgICB0aGlzLl9haW1BeGlzID0gYWltQXhpcztcbiAgICB0aGlzLl92M0FpbUF4aXMuc2V0KFxuICAgICAgYWltQXhpcyA9PT0gJ1Bvc2l0aXZlWCcgPyAxLjAgOiBhaW1BeGlzID09PSAnTmVnYXRpdmVYJyA/IC0xLjAgOiAwLjAsXG4gICAgICBhaW1BeGlzID09PSAnUG9zaXRpdmVZJyA/IDEuMCA6IGFpbUF4aXMgPT09ICdOZWdhdGl2ZVknID8gLTEuMCA6IDAuMCxcbiAgICAgIGFpbUF4aXMgPT09ICdQb3NpdGl2ZVonID8gMS4wIDogYWltQXhpcyA9PT0gJ05lZ2F0aXZlWicgPyAtMS4wIDogMC4wLFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGFpbSBheGlzIG9mIHRoZSBjb25zdHJhaW50LlxuICAgKi9cbiAgcHJpdmF0ZSBfYWltQXhpczogJ1Bvc2l0aXZlWCcgfCAnTmVnYXRpdmVYJyB8ICdQb3NpdGl2ZVknIHwgJ05lZ2F0aXZlWScgfCAnUG9zaXRpdmVaJyB8ICdOZWdhdGl2ZVonO1xuXG4gIC8qKlxuICAgKiBUaGUge0BsaW5rIF9haW1BeGlzfSBidXQgaW4gYW4gYWN0dWFsIFZlY3RvcjMgZm9ybS5cbiAgICovXG4gIHByaXZhdGUgX3YzQWltQXhpczogVEhSRUUuVmVjdG9yMztcblxuICAvKipcbiAgICogVGhlIHJlc3QgcXVhdGVybmlvbiBvZiB0aGUge0BsaW5rIGRlc3RpbmF0aW9ufS5cbiAgICovXG4gIHByaXZhdGUgX2RzdFJlc3RRdWF0OiBUSFJFRS5RdWF0ZXJuaW9uO1xuXG4gIHB1YmxpYyBnZXQgZGVwZW5kZW5jaWVzKCk6IFNldDxUSFJFRS5PYmplY3QzRDxUSFJFRS5FdmVudD4+IHtcbiAgICBjb25zdCBzZXQgPSBuZXcgU2V0PFRIUkVFLk9iamVjdDNEPihbdGhpcy5zb3VyY2VdKTtcblxuICAgIGlmICh0aGlzLmRlc3RpbmF0aW9uLnBhcmVudCkge1xuICAgICAgc2V0LmFkZCh0aGlzLmRlc3RpbmF0aW9uLnBhcmVudCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNldDtcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogVEhSRUUuT2JqZWN0M0QsIHNvdXJjZTogVEhSRUUuT2JqZWN0M0QpIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbiwgc291cmNlKTtcblxuICAgIHRoaXMuX2FpbUF4aXMgPSAnUG9zaXRpdmVYJztcbiAgICB0aGlzLl92M0FpbUF4aXMgPSBuZXcgVEhSRUUuVmVjdG9yMygxLCAwLCAwKTtcblxuICAgIHRoaXMuX2RzdFJlc3RRdWF0ID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRJbml0U3RhdGUoKTogdm9pZCB7XG4gICAgdGhpcy5fZHN0UmVzdFF1YXQuY29weSh0aGlzLmRlc3RpbmF0aW9uLnF1YXRlcm5pb24pO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICAvLyB1cGRhdGUgd29ybGQgbWF0cml4IG9mIGRlc3RpbmF0aW9uIGFuZCBzb3VyY2UgbWFudWFsbHlcbiAgICB0aGlzLmRlc3RpbmF0aW9uLnVwZGF0ZVdvcmxkTWF0cml4KHRydWUsIGZhbHNlKTtcbiAgICB0aGlzLnNvdXJjZS51cGRhdGVXb3JsZE1hdHJpeCh0cnVlLCBmYWxzZSk7XG5cbiAgICAvLyBnZXQgd29ybGQgcXVhdGVybmlvbiBvZiB0aGUgcGFyZW50IG9mIHRoZSBkZXN0aW5hdGlvblxuICAgIGNvbnN0IGRzdFBhcmVudFdvcmxkUXVhdCA9IF9xdWF0QS5pZGVudGl0eSgpO1xuICAgIGNvbnN0IGludkRzdFBhcmVudFdvcmxkUXVhdCA9IF9xdWF0Qi5pZGVudGl0eSgpO1xuICAgIGlmICh0aGlzLmRlc3RpbmF0aW9uLnBhcmVudCkge1xuICAgICAgZGVjb21wb3NlUm90YXRpb24odGhpcy5kZXN0aW5hdGlvbi5wYXJlbnQubWF0cml4V29ybGQsIGRzdFBhcmVudFdvcmxkUXVhdCk7XG4gICAgICBxdWF0SW52ZXJ0Q29tcGF0KGludkRzdFBhcmVudFdvcmxkUXVhdC5jb3B5KGRzdFBhcmVudFdvcmxkUXVhdCkpO1xuICAgIH1cblxuICAgIC8vIGNhbGN1bGF0ZSBmcm9tLXRvIHZlY3RvcnMgaW4gd29ybGQgY29vcmRcbiAgICBjb25zdCBhMCA9IF92M0EuY29weSh0aGlzLl92M0FpbUF4aXMpLmFwcGx5UXVhdGVybmlvbih0aGlzLl9kc3RSZXN0UXVhdCkuYXBwbHlRdWF0ZXJuaW9uKGRzdFBhcmVudFdvcmxkUXVhdCk7XG4gICAgY29uc3QgYTEgPSBkZWNvbXBvc2VQb3NpdGlvbih0aGlzLnNvdXJjZS5tYXRyaXhXb3JsZCwgX3YzQilcbiAgICAgIC5zdWIoZGVjb21wb3NlUG9zaXRpb24odGhpcy5kZXN0aW5hdGlvbi5tYXRyaXhXb3JsZCwgX3YzQykpXG4gICAgICAubm9ybWFsaXplKCk7XG5cbiAgICAvLyBjcmVhdGUgYSBmcm9tLXRvIHF1YXRlcm5pb24sIGNvbnZlcnQgdG8gZGVzdGluYXRpb24gbG9jYWwgY29vcmQsIHRoZW4gbXVsdGlwbHkgcmVzdCBxdWF0ZXJuaW9uXG4gICAgY29uc3QgdGFyZ2V0UXVhdCA9IF9xdWF0Q1xuICAgICAgLnNldEZyb21Vbml0VmVjdG9ycyhhMCwgYTEpXG4gICAgICAucHJlbXVsdGlwbHkoaW52RHN0UGFyZW50V29ybGRRdWF0KVxuICAgICAgLm11bHRpcGx5KGRzdFBhcmVudFdvcmxkUXVhdClcbiAgICAgIC5tdWx0aXBseSh0aGlzLl9kc3RSZXN0UXVhdCk7XG5cbiAgICAvLyBibGVuZCB3aXRoIHRoZSByZXN0IHF1YXRlcm5pb24gdXNpbmcgd2VpZ2h0XG4gICAgdGhpcy5kZXN0aW5hdGlvbi5xdWF0ZXJuaW9uLmNvcHkodGhpcy5fZHN0UmVzdFF1YXQpLnNsZXJwKHRhcmdldFF1YXQsIHRoaXMud2VpZ2h0KTtcbiAgfVxufVxuIiwiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2VzRGVjb3JhdGUoY3RvciwgZGVzY3JpcHRvckluLCBkZWNvcmF0b3JzLCBjb250ZXh0SW4sIGluaXRpYWxpemVycywgZXh0cmFJbml0aWFsaXplcnMpIHtcclxuICAgIGZ1bmN0aW9uIGFjY2VwdChmKSB7IGlmIChmICE9PSB2b2lkIDAgJiYgdHlwZW9mIGYgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkZ1bmN0aW9uIGV4cGVjdGVkXCIpOyByZXR1cm4gZjsgfVxyXG4gICAgdmFyIGtpbmQgPSBjb250ZXh0SW4ua2luZCwga2V5ID0ga2luZCA9PT0gXCJnZXR0ZXJcIiA/IFwiZ2V0XCIgOiBraW5kID09PSBcInNldHRlclwiID8gXCJzZXRcIiA6IFwidmFsdWVcIjtcclxuICAgIHZhciB0YXJnZXQgPSAhZGVzY3JpcHRvckluICYmIGN0b3IgPyBjb250ZXh0SW5bXCJzdGF0aWNcIl0gPyBjdG9yIDogY3Rvci5wcm90b3R5cGUgOiBudWxsO1xyXG4gICAgdmFyIGRlc2NyaXB0b3IgPSBkZXNjcmlwdG9ySW4gfHwgKHRhcmdldCA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBjb250ZXh0SW4ubmFtZSkgOiB7fSk7XHJcbiAgICB2YXIgXywgZG9uZSA9IGZhbHNlO1xyXG4gICAgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICB2YXIgY29udGV4dCA9IHt9O1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gY29udGV4dEluKSBjb250ZXh0W3BdID0gcCA9PT0gXCJhY2Nlc3NcIiA/IHt9IDogY29udGV4dEluW3BdO1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gY29udGV4dEluLmFjY2VzcykgY29udGV4dC5hY2Nlc3NbcF0gPSBjb250ZXh0SW4uYWNjZXNzW3BdO1xyXG4gICAgICAgIGNvbnRleHQuYWRkSW5pdGlhbGl6ZXIgPSBmdW5jdGlvbiAoZikgeyBpZiAoZG9uZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBhZGQgaW5pdGlhbGl6ZXJzIGFmdGVyIGRlY29yYXRpb24gaGFzIGNvbXBsZXRlZFwiKTsgZXh0cmFJbml0aWFsaXplcnMucHVzaChhY2NlcHQoZiB8fCBudWxsKSk7IH07XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9ICgwLCBkZWNvcmF0b3JzW2ldKShraW5kID09PSBcImFjY2Vzc29yXCIgPyB7IGdldDogZGVzY3JpcHRvci5nZXQsIHNldDogZGVzY3JpcHRvci5zZXQgfSA6IGRlc2NyaXB0b3Jba2V5XSwgY29udGV4dCk7XHJcbiAgICAgICAgaWYgKGtpbmQgPT09IFwiYWNjZXNzb3JcIikge1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSB2b2lkIDApIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsIHx8IHR5cGVvZiByZXN1bHQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3QgZXhwZWN0ZWRcIik7XHJcbiAgICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5nZXQpKSBkZXNjcmlwdG9yLmdldCA9IF87XHJcbiAgICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5zZXQpKSBkZXNjcmlwdG9yLnNldCA9IF87XHJcbiAgICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5pbml0KSkgaW5pdGlhbGl6ZXJzLnB1c2goXyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKF8gPSBhY2NlcHQocmVzdWx0KSkge1xyXG4gICAgICAgICAgICBpZiAoa2luZCA9PT0gXCJmaWVsZFwiKSBpbml0aWFsaXplcnMucHVzaChfKTtcclxuICAgICAgICAgICAgZWxzZSBkZXNjcmlwdG9yW2tleV0gPSBfO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICh0YXJnZXQpIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGNvbnRleHRJbi5uYW1lLCBkZXNjcmlwdG9yKTtcclxuICAgIGRvbmUgPSB0cnVlO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcnVuSW5pdGlhbGl6ZXJzKHRoaXNBcmcsIGluaXRpYWxpemVycywgdmFsdWUpIHtcclxuICAgIHZhciB1c2VWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbml0aWFsaXplcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YWx1ZSA9IHVzZVZhbHVlID8gaW5pdGlhbGl6ZXJzW2ldLmNhbGwodGhpc0FyZywgdmFsdWUpIDogaW5pdGlhbGl6ZXJzW2ldLmNhbGwodGhpc0FyZyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdXNlVmFsdWUgPyB2YWx1ZSA6IHZvaWQgMDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Byb3BLZXkoeCkge1xyXG4gICAgcmV0dXJuIHR5cGVvZiB4ID09PSBcInN5bWJvbFwiID8geCA6IFwiXCIuY29uY2F0KHgpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc2V0RnVuY3Rpb25OYW1lKGYsIG5hbWUsIHByZWZpeCkge1xyXG4gICAgaWYgKHR5cGVvZiBuYW1lID09PSBcInN5bWJvbFwiKSBuYW1lID0gbmFtZS5kZXNjcmlwdGlvbiA/IFwiW1wiLmNvbmNhdChuYW1lLmRlc2NyaXB0aW9uLCBcIl1cIikgOiBcIlwiO1xyXG4gICAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmLCBcIm5hbWVcIiwgeyBjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiBwcmVmaXggPyBcIlwiLmNvbmNhdChwcmVmaXgsIFwiIFwiLCBuYW1lKSA6IG5hbWUgfSk7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XHJcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xyXG4gICAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xyXG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIG8pIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCkpIF9fY3JlYXRlQmluZGluZyhvLCBtLCBwKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcclxuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgIHJldHVybiByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheSh0bywgZnJvbSwgcGFjaykge1xyXG4gICAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XHJcbiAgICAgICAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XHJcbiAgICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBmYWxzZSB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcclxufSkgOiBmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcclxuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcIm1cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgbWV0aG9kIGlzIG5vdCB3cml0YWJsZVwiKTtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4gKGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgOiBmID8gZi52YWx1ZSA9IHZhbHVlIDogc3RhdGUuc2V0KHJlY2VpdmVyLCB2YWx1ZSkpLCB2YWx1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRJbihzdGF0ZSwgcmVjZWl2ZXIpIHtcclxuICAgIGlmIChyZWNlaXZlciA9PT0gbnVsbCB8fCAodHlwZW9mIHJlY2VpdmVyICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiByZWNlaXZlciAhPT0gXCJmdW5jdGlvblwiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB1c2UgJ2luJyBvcGVyYXRvciBvbiBub24tb2JqZWN0XCIpO1xyXG4gICAgcmV0dXJuIHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgPT09IHN0YXRlIDogc3RhdGUuaGFzKHJlY2VpdmVyKTtcclxufVxyXG4iLCJpbXBvcnQgdHlwZSAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBUcmF2ZXJzZSBhbmNlc3RvcnMgb2YgZ2l2ZW4gb2JqZWN0IGFuZCBjYWxsIGdpdmVuIGNhbGxiYWNrIGZyb20gcm9vdCBzaWRlLlxuICogSXQgd2lsbCBpbmNsdWRlIHRoZSBnaXZlbiBvYmplY3QgaXRzZWxmLlxuICpcbiAqIEBwYXJhbSBvYmplY3QgVGhlIG9iamVjdCB5b3Ugd2FudCB0byB0cmF2ZXJzZVxuICogQHBhcmFtIGNhbGxiYWNrIFRoZSBjYWxsIGJhY2sgZnVuY3Rpb24gdGhhdCB3aWxsIGJlIGNhbGxlZCBmb3IgZWFjaCBhbmNlc3RvcnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRyYXZlcnNlQW5jZXN0b3JzRnJvbVJvb3Qob2JqZWN0OiBUSFJFRS5PYmplY3QzRCwgY2FsbGJhY2s6IChvYmplY3Q6IFRIUkVFLk9iamVjdDNEKSA9PiB2b2lkKTogdm9pZCB7XG4gIGNvbnN0IGFuY2VzdG9yczogVEhSRUUuT2JqZWN0M0RbXSA9IFtvYmplY3RdO1xuXG4gIGxldCBoZWFkOiBUSFJFRS5PYmplY3QzRCB8IG51bGwgPSBvYmplY3QucGFyZW50O1xuICB3aGlsZSAoaGVhZCAhPT0gbnVsbCkge1xuICAgIGFuY2VzdG9ycy51bnNoaWZ0KGhlYWQpO1xuICAgIGhlYWQgPSBoZWFkLnBhcmVudDtcbiAgfVxuXG4gIGFuY2VzdG9ycy5mb3JFYWNoKChhbmNlc3RvcikgPT4ge1xuICAgIGNhbGxiYWNrKGFuY2VzdG9yKTtcbiAgfSk7XG59XG4iLCJpbXBvcnQgdHlwZSAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB0eXBlIHsgVlJNTm9kZUNvbnN0cmFpbnQgfSBmcm9tICcuL1ZSTU5vZGVDb25zdHJhaW50JztcbmltcG9ydCB7IHRyYXZlcnNlQW5jZXN0b3JzRnJvbVJvb3QgfSBmcm9tICcuL3V0aWxzL3RyYXZlcnNlQW5jZXN0b3JzRnJvbVJvb3QnO1xuXG5leHBvcnQgY2xhc3MgVlJNTm9kZUNvbnN0cmFpbnRNYW5hZ2VyIHtcbiAgcHJpdmF0ZSBfY29uc3RyYWludHMgPSBuZXcgU2V0PFZSTU5vZGVDb25zdHJhaW50PigpO1xuICBwdWJsaWMgZ2V0IGNvbnN0cmFpbnRzKCk6IFNldDxWUk1Ob2RlQ29uc3RyYWludD4ge1xuICAgIHJldHVybiB0aGlzLl9jb25zdHJhaW50cztcbiAgfVxuXG4gIHByaXZhdGUgX29iamVjdENvbnN0cmFpbnRzTWFwID0gbmV3IE1hcDxUSFJFRS5PYmplY3QzRCwgU2V0PFZSTU5vZGVDb25zdHJhaW50Pj4oKTtcblxuICBwdWJsaWMgYWRkQ29uc3RyYWludChjb25zdHJhaW50OiBWUk1Ob2RlQ29uc3RyYWludCk6IHZvaWQge1xuICAgIHRoaXMuX2NvbnN0cmFpbnRzLmFkZChjb25zdHJhaW50KTtcblxuICAgIGxldCBvYmplY3RTZXQgPSB0aGlzLl9vYmplY3RDb25zdHJhaW50c01hcC5nZXQoY29uc3RyYWludC5kZXN0aW5hdGlvbik7XG4gICAgaWYgKG9iamVjdFNldCA9PSBudWxsKSB7XG4gICAgICBvYmplY3RTZXQgPSBuZXcgU2V0PFZSTU5vZGVDb25zdHJhaW50PigpO1xuICAgICAgdGhpcy5fb2JqZWN0Q29uc3RyYWludHNNYXAuc2V0KGNvbnN0cmFpbnQuZGVzdGluYXRpb24sIG9iamVjdFNldCk7XG4gICAgfVxuICAgIG9iamVjdFNldC5hZGQoY29uc3RyYWludCk7XG4gIH1cblxuICBwdWJsaWMgZGVsZXRlQ29uc3RyYWludChjb25zdHJhaW50OiBWUk1Ob2RlQ29uc3RyYWludCk6IHZvaWQge1xuICAgIHRoaXMuX2NvbnN0cmFpbnRzLmRlbGV0ZShjb25zdHJhaW50KTtcblxuICAgIGNvbnN0IG9iamVjdFNldCA9IHRoaXMuX29iamVjdENvbnN0cmFpbnRzTWFwLmdldChjb25zdHJhaW50LmRlc3RpbmF0aW9uKSE7XG4gICAgb2JqZWN0U2V0LmRlbGV0ZShjb25zdHJhaW50KTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRJbml0U3RhdGUoKTogdm9pZCB7XG4gICAgY29uc3QgY29uc3RyYWludHNUcmllZCA9IG5ldyBTZXQ8VlJNTm9kZUNvbnN0cmFpbnQ+KCk7XG4gICAgY29uc3QgY29uc3RyYWludHNEb25lID0gbmV3IFNldDxWUk1Ob2RlQ29uc3RyYWludD4oKTtcblxuICAgIGZvciAoY29uc3QgY29uc3RyYWludCBvZiB0aGlzLl9jb25zdHJhaW50cykge1xuICAgICAgdGhpcy5fcHJvY2Vzc0NvbnN0cmFpbnQoY29uc3RyYWludCwgY29uc3RyYWludHNUcmllZCwgY29uc3RyYWludHNEb25lLCAoY29uc3RyYWludCkgPT4gY29uc3RyYWludC5zZXRJbml0U3RhdGUoKSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBjb25zdCBjb25zdHJhaW50c1RyaWVkID0gbmV3IFNldDxWUk1Ob2RlQ29uc3RyYWludD4oKTtcbiAgICBjb25zdCBjb25zdHJhaW50c0RvbmUgPSBuZXcgU2V0PFZSTU5vZGVDb25zdHJhaW50PigpO1xuXG4gICAgZm9yIChjb25zdCBjb25zdHJhaW50IG9mIHRoaXMuX2NvbnN0cmFpbnRzKSB7XG4gICAgICB0aGlzLl9wcm9jZXNzQ29uc3RyYWludChjb25zdHJhaW50LCBjb25zdHJhaW50c1RyaWVkLCBjb25zdHJhaW50c0RvbmUsIChjb25zdHJhaW50KSA9PiBjb25zdHJhaW50LnVwZGF0ZSgpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIGEgY29uc3RyYWludC5cbiAgICogSWYgdGhlcmUgYXJlIG90aGVyIGNvbnN0cmFpbnRzIHRoYXQgYXJlIGRlcGVuZGFudCwgaXQgd2lsbCB0cnkgdG8gdXBkYXRlIHRoZW0gcmVjdXJzaXZlbHkuXG4gICAqIEl0IG1pZ2h0IHRocm93IGFuIGVycm9yIGlmIHRoZXJlIGFyZSBjaXJjdWxhciBkZXBlbmRlbmNpZXMuXG4gICAqXG4gICAqIEludGVuZGVkIHRvIGJlIHVzZWQgaW4ge0BsaW5rIHVwZGF0ZX0gYW5kIHtAbGluayBfcHJvY2Vzc0NvbnN0cmFpbnR9IGl0c2VsZiByZWN1cnNpdmVseS5cbiAgICpcbiAgICogQHBhcmFtIGNvbnN0cmFpbnQgQSBjb25zdHJhaW50IHlvdSB3YW50IHRvIHVwZGF0ZVxuICAgKiBAcGFyYW0gY29uc3RyYWludHNUcmllZCBTZXQgb2YgY29uc3RyYWludHMgdGhhdCBhcmUgYWxyZWFkeSB0cmllZCB0byBiZSB1cGRhdGVkXG4gICAqIEBwYXJhbSBjb25zdHJhaW50c0RvbmUgU2V0IG9mIGNvbnN0cmFpbnRzIHRoYXQgYXJlIGFscmVhZHkgdXAgdG8gZGF0ZVxuICAgKi9cbiAgcHJpdmF0ZSBfcHJvY2Vzc0NvbnN0cmFpbnQoXG4gICAgY29uc3RyYWludDogVlJNTm9kZUNvbnN0cmFpbnQsXG4gICAgY29uc3RyYWludHNUcmllZDogU2V0PFZSTU5vZGVDb25zdHJhaW50PixcbiAgICBjb25zdHJhaW50c0RvbmU6IFNldDxWUk1Ob2RlQ29uc3RyYWludD4sXG4gICAgY2FsbGJhY2s6IChjb25zdHJhaW50OiBWUk1Ob2RlQ29uc3RyYWludCkgPT4gdm9pZCxcbiAgKTogdm9pZCB7XG4gICAgaWYgKGNvbnN0cmFpbnRzRG9uZS5oYXMoY29uc3RyYWludCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoY29uc3RyYWludHNUcmllZC5oYXMoY29uc3RyYWludCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVlJNTm9kZUNvbnN0cmFpbnRNYW5hZ2VyOiBDaXJjdWxhciBkZXBlbmRlbmN5IGRldGVjdGVkIHdoaWxlIHVwZGF0aW5nIGNvbnN0cmFpbnRzJyk7XG4gICAgfVxuICAgIGNvbnN0cmFpbnRzVHJpZWQuYWRkKGNvbnN0cmFpbnQpO1xuXG4gICAgY29uc3QgZGVwT2JqZWN0cyA9IGNvbnN0cmFpbnQuZGVwZW5kZW5jaWVzO1xuICAgIGZvciAoY29uc3QgZGVwT2JqZWN0IG9mIGRlcE9iamVjdHMpIHtcbiAgICAgIHRyYXZlcnNlQW5jZXN0b3JzRnJvbVJvb3QoZGVwT2JqZWN0LCAoZGVwT2JqZWN0QW5jZXN0b3IpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqZWN0U2V0ID0gdGhpcy5fb2JqZWN0Q29uc3RyYWludHNNYXAuZ2V0KGRlcE9iamVjdEFuY2VzdG9yKTtcbiAgICAgICAgaWYgKG9iamVjdFNldCkge1xuICAgICAgICAgIGZvciAoY29uc3QgZGVwQ29uc3RyYWludCBvZiBvYmplY3RTZXQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Byb2Nlc3NDb25zdHJhaW50KGRlcENvbnN0cmFpbnQsIGNvbnN0cmFpbnRzVHJpZWQsIGNvbnN0cmFpbnRzRG9uZSwgY2FsbGJhY2spO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2FsbGJhY2soY29uc3RyYWludCk7XG5cbiAgICBjb25zdHJhaW50c0RvbmUuYWRkKGNvbnN0cmFpbnQpO1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBxdWF0SW52ZXJ0Q29tcGF0IH0gZnJvbSAnLi91dGlscy9xdWF0SW52ZXJ0Q29tcGF0JztcbmltcG9ydCB7IFZSTU5vZGVDb25zdHJhaW50IH0gZnJvbSAnLi9WUk1Ob2RlQ29uc3RyYWludCc7XG5cbmNvbnN0IF9xdWF0QSA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5jb25zdCBfcXVhdEIgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXG4vKipcbiAqIEEgY29uc3RyYWludCB0aGF0IHRyYW5zZmVycyBhIHJvdGF0aW9uIGFyb3VuZCBvbmUgYXhpcyBvZiBhIHNvdXJjZS5cbiAqXG4gKiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS92cm0tYy92cm0tc3BlY2lmaWNhdGlvbi90cmVlL21hc3Rlci9zcGVjaWZpY2F0aW9uL1ZSTUNfbm9kZV9jb25zdHJhaW50LTEuMF9iZXRhI3JvbGwtY29uc3RyYWludFxuICovXG5leHBvcnQgY2xhc3MgVlJNUm90YXRpb25Db25zdHJhaW50IGV4dGVuZHMgVlJNTm9kZUNvbnN0cmFpbnQge1xuICAvKipcbiAgICogVGhlIHJlc3QgcXVhdGVybmlvbiBvZiB0aGUge0BsaW5rIGRlc3RpbmF0aW9ufS5cbiAgICovXG4gIHByaXZhdGUgX2RzdFJlc3RRdWF0OiBUSFJFRS5RdWF0ZXJuaW9uO1xuXG4gIC8qKlxuICAgKiBUaGUgaW52ZXJzZSBvZiB0aGUgcmVzdCBxdWF0ZXJuaW9uIG9mIHRoZSB7QGxpbmsgc291cmNlfS5cbiAgICovXG4gIHByaXZhdGUgX2ludlNyY1Jlc3RRdWF0OiBUSFJFRS5RdWF0ZXJuaW9uO1xuXG4gIHB1YmxpYyBnZXQgZGVwZW5kZW5jaWVzKCk6IFNldDxUSFJFRS5PYmplY3QzRDxUSFJFRS5FdmVudD4+IHtcbiAgICByZXR1cm4gbmV3IFNldChbdGhpcy5zb3VyY2VdKTtcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogVEhSRUUuT2JqZWN0M0QsIHNvdXJjZTogVEhSRUUuT2JqZWN0M0QpIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbiwgc291cmNlKTtcblxuICAgIHRoaXMuX2RzdFJlc3RRdWF0ID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbiAgICB0aGlzLl9pbnZTcmNSZXN0UXVhdCA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG4gIH1cblxuICBwdWJsaWMgc2V0SW5pdFN0YXRlKCk6IHZvaWQge1xuICAgIHRoaXMuX2RzdFJlc3RRdWF0LmNvcHkodGhpcy5kZXN0aW5hdGlvbi5xdWF0ZXJuaW9uKTtcbiAgICBxdWF0SW52ZXJ0Q29tcGF0KHRoaXMuX2ludlNyY1Jlc3RRdWF0LmNvcHkodGhpcy5zb3VyY2UucXVhdGVybmlvbikpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICAvLyBjYWxjdWxhdGUgdGhlIGRlbHRhIHJvdGF0aW9uIGZyb20gdGhlIHJlc3QgYWJvdXQgdGhlIHNvdXJjZVxuICAgIGNvbnN0IHNyY0RlbHRhUXVhdCA9IF9xdWF0QS5jb3B5KHRoaXMuX2ludlNyY1Jlc3RRdWF0KS5tdWx0aXBseSh0aGlzLnNvdXJjZS5xdWF0ZXJuaW9uKTtcblxuICAgIC8vIG11bHRpcGx5IHRoZSBkZWx0YSB0byB0aGUgcmVzdCBvZiB0aGUgZGVzdGluYXRpb25cbiAgICBjb25zdCB0YXJnZXRRdWF0ID0gX3F1YXRCLmNvcHkodGhpcy5fZHN0UmVzdFF1YXQpLm11bHRpcGx5KHNyY0RlbHRhUXVhdCk7XG5cbiAgICAvLyBibGVuZCB3aXRoIHRoZSByZXN0IHF1YXRlcm5pb24gdXNpbmcgd2VpZ2h0XG4gICAgdGhpcy5kZXN0aW5hdGlvbi5xdWF0ZXJuaW9uLmNvcHkodGhpcy5fZHN0UmVzdFF1YXQpLnNsZXJwKHRhcmdldFF1YXQsIHRoaXMud2VpZ2h0KTtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgcXVhdEludmVydENvbXBhdCB9IGZyb20gJy4vdXRpbHMvcXVhdEludmVydENvbXBhdCc7XG5pbXBvcnQgeyBWUk1Ob2RlQ29uc3RyYWludCB9IGZyb20gJy4vVlJNTm9kZUNvbnN0cmFpbnQnO1xuXG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF9xdWF0QSA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5jb25zdCBfcXVhdEIgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXG4vKipcbiAqIEEgY29uc3RyYWludCB0aGF0IHRyYW5zZmVycyBhIHJvdGF0aW9uIGFyb3VuZCBvbmUgYXhpcyBvZiBhIHNvdXJjZS5cbiAqXG4gKiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS92cm0tYy92cm0tc3BlY2lmaWNhdGlvbi90cmVlL21hc3Rlci9zcGVjaWZpY2F0aW9uL1ZSTUNfbm9kZV9jb25zdHJhaW50LTEuMF9iZXRhI3JvbGwtY29uc3RyYWludFxuICovXG5leHBvcnQgY2xhc3MgVlJNUm9sbENvbnN0cmFpbnQgZXh0ZW5kcyBWUk1Ob2RlQ29uc3RyYWludCB7XG4gIC8qKlxuICAgKiBUaGUgcm9sbCBheGlzIG9mIHRoZSBjb25zdHJhaW50LlxuICAgKi9cbiAgcHVibGljIGdldCByb2xsQXhpcygpOiAnWCcgfCAnWScgfCAnWicge1xuICAgIHJldHVybiB0aGlzLl9yb2xsQXhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgcm9sbCBheGlzIG9mIHRoZSBjb25zdHJhaW50LlxuICAgKi9cbiAgcHVibGljIHNldCByb2xsQXhpcyhyb2xsQXhpczogJ1gnIHwgJ1knIHwgJ1onKSB7XG4gICAgdGhpcy5fcm9sbEF4aXMgPSByb2xsQXhpcztcbiAgICB0aGlzLl92M1JvbGxBeGlzLnNldChyb2xsQXhpcyA9PT0gJ1gnID8gMS4wIDogMC4wLCByb2xsQXhpcyA9PT0gJ1knID8gMS4wIDogMC4wLCByb2xsQXhpcyA9PT0gJ1onID8gMS4wIDogMC4wKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgcm9sbCBheGlzIG9mIHRoZSBjb25zdHJhaW50LlxuICAgKi9cbiAgcHJpdmF0ZSBfcm9sbEF4aXM6ICdYJyB8ICdZJyB8ICdaJztcblxuICAvKipcbiAgICogVGhlIHtAbGluayBfcm9sbEF4aXN9IGJ1dCBpbiBhbiBhY3R1YWwgVmVjdG9yMyBmb3JtLlxuICAgKi9cbiAgcHJpdmF0ZSBfdjNSb2xsQXhpczogVEhSRUUuVmVjdG9yMztcblxuICAvKipcbiAgICogVGhlIHJlc3QgcXVhdGVybmlvbiBvZiB0aGUge0BsaW5rIGRlc3RpbmF0aW9ufS5cbiAgICovXG4gIHByaXZhdGUgX2RzdFJlc3RRdWF0OiBUSFJFRS5RdWF0ZXJuaW9uO1xuXG4gIC8qKlxuICAgKiBUaGUgaW52ZXJzZSBvZiB0aGUgcmVzdCBxdWF0ZXJuaW9uIG9mIHRoZSB7QGxpbmsgZGVzdGluYXRpb259LlxuICAgKi9cbiAgcHJpdmF0ZSBfaW52RHN0UmVzdFF1YXQ6IFRIUkVFLlF1YXRlcm5pb247XG5cbiAgLyoqXG4gICAqIGBzcmNSZXN0UXVhdC5pbnZlcnQoKSAqIGRzdFJlc3RRdWF0YC5cbiAgICovXG4gIHByaXZhdGUgX2ludlNyY1Jlc3RRdWF0TXVsRHN0UmVzdFF1YXQ6IFRIUkVFLlF1YXRlcm5pb247XG5cbiAgcHVibGljIGdldCBkZXBlbmRlbmNpZXMoKTogU2V0PFRIUkVFLk9iamVjdDNEPFRIUkVFLkV2ZW50Pj4ge1xuICAgIHJldHVybiBuZXcgU2V0KFt0aGlzLnNvdXJjZV0pO1xuICB9XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBUSFJFRS5PYmplY3QzRCwgc291cmNlOiBUSFJFRS5PYmplY3QzRCkge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uLCBzb3VyY2UpO1xuXG4gICAgdGhpcy5fcm9sbEF4aXMgPSAnWCc7XG4gICAgdGhpcy5fdjNSb2xsQXhpcyA9IG5ldyBUSFJFRS5WZWN0b3IzKDEsIDAsIDApO1xuXG4gICAgdGhpcy5fZHN0UmVzdFF1YXQgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuICAgIHRoaXMuX2ludkRzdFJlc3RRdWF0ID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbiAgICB0aGlzLl9pbnZTcmNSZXN0UXVhdE11bERzdFJlc3RRdWF0ID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRJbml0U3RhdGUoKTogdm9pZCB7XG4gICAgdGhpcy5fZHN0UmVzdFF1YXQuY29weSh0aGlzLmRlc3RpbmF0aW9uLnF1YXRlcm5pb24pO1xuICAgIHF1YXRJbnZlcnRDb21wYXQodGhpcy5faW52RHN0UmVzdFF1YXQuY29weSh0aGlzLl9kc3RSZXN0UXVhdCkpO1xuICAgIHF1YXRJbnZlcnRDb21wYXQodGhpcy5faW52U3JjUmVzdFF1YXRNdWxEc3RSZXN0UXVhdC5jb3B5KHRoaXMuc291cmNlLnF1YXRlcm5pb24pKS5tdWx0aXBseSh0aGlzLl9kc3RSZXN0UXVhdCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIC8vIGNhbGN1bGF0ZSB0aGUgZGVsdGEgcm90YXRpb24gZnJvbSB0aGUgcmVzdCBhYm91dCB0aGUgc291cmNlLCB0aGVuIGNvbnZlcnQgdG8gdGhlIGRlc3RpbmF0aW9uIGxvY2FsIGNvb3JkXG4gICAgLyoqXG4gICAgICogV2hhdCB0aGUgcXVhdERlbHRhIGlzIGludGVuZGVkIHRvIGJlOlxuICAgICAqXG4gICAgICogYGBgdHNcbiAgICAgKiBjb25zdCBxdWF0U3JjRGVsdGEgPSBfcXVhdEFcbiAgICAgKiAgIC5jb3B5KCB0aGlzLl9pbnZTcmNSZXN0UXVhdCApXG4gICAgICogICAubXVsdGlwbHkoIHRoaXMuc291cmNlLnF1YXRlcm5pb24gKTtcbiAgICAgKiBjb25zdCBxdWF0U3JjRGVsdGFJblBhcmVudCA9IF9xdWF0QlxuICAgICAqICAgLmNvcHkoIHRoaXMuX3NyY1Jlc3RRdWF0IClcbiAgICAgKiAgIC5tdWx0aXBseSggcXVhdFNyY0RlbHRhIClcbiAgICAgKiAgIC5tdWx0aXBseSggdGhpcy5faW52U3JjUmVzdFF1YXQgKTtcbiAgICAgKiBjb25zdCBxdWF0U3JjRGVsdGFJbkRzdCA9IF9xdWF0QVxuICAgICAqICAgLmNvcHkoIHRoaXMuX2ludkRzdFJlc3RRdWF0IClcbiAgICAgKiAgIC5tdWx0aXBseSggcXVhdFNyY0RlbHRhSW5QYXJlbnQgKVxuICAgICAqICAgLm11bHRpcGx5KCB0aGlzLl9kc3RSZXN0UXVhdCApO1xuICAgICAqIGBgYFxuICAgICAqL1xuICAgIGNvbnN0IHF1YXREZWx0YSA9IF9xdWF0QVxuICAgICAgLmNvcHkodGhpcy5faW52RHN0UmVzdFF1YXQpXG4gICAgICAubXVsdGlwbHkodGhpcy5zb3VyY2UucXVhdGVybmlvbilcbiAgICAgIC5tdWx0aXBseSh0aGlzLl9pbnZTcmNSZXN0UXVhdE11bERzdFJlc3RRdWF0KTtcblxuICAgIC8vIGNyZWF0ZSBhIGZyb20tdG8gcXVhdGVybmlvblxuICAgIGNvbnN0IG4xID0gX3YzQS5jb3B5KHRoaXMuX3YzUm9sbEF4aXMpLmFwcGx5UXVhdGVybmlvbihxdWF0RGVsdGEpO1xuXG4gICAgLyoqXG4gICAgICogV2hhdCB0aGUgcXVhdEZyb21UbyBpcyBpbnRlbmRlZCB0byBiZTpcbiAgICAgKlxuICAgICAqIGBgYHRzXG4gICAgICogY29uc3QgcXVhdEZyb21UbyA9IF9xdWF0Qi5zZXRGcm9tVW5pdFZlY3RvcnMoIHRoaXMuX3YzUm9sbEF4aXMsIG4xICkuaW52ZXJzZSgpO1xuICAgICAqIGBgYFxuICAgICAqL1xuICAgIGNvbnN0IHF1YXRGcm9tVG8gPSBfcXVhdEIuc2V0RnJvbVVuaXRWZWN0b3JzKG4xLCB0aGlzLl92M1JvbGxBeGlzKTtcblxuICAgIC8vIHF1YXRGcm9tVG8gKiBxdWF0RGVsdGEgPT0gcm9sbCBleHRyYWN0ZWQgZnJvbSBxdWF0RGVsdGFcbiAgICBjb25zdCB0YXJnZXRRdWF0ID0gcXVhdEZyb21Uby5wcmVtdWx0aXBseSh0aGlzLl9kc3RSZXN0UXVhdCkubXVsdGlwbHkocXVhdERlbHRhKTtcblxuICAgIC8vIGJsZW5kIHdpdGggdGhlIHJlc3QgcXVhdGVybmlvbiB1c2luZyB3ZWlnaHRcbiAgICB0aGlzLmRlc3RpbmF0aW9uLnF1YXRlcm5pb24uY29weSh0aGlzLl9kc3RSZXN0UXVhdCkuc2xlcnAodGFyZ2V0UXVhdCwgdGhpcy53ZWlnaHQpO1xuICB9XG59XG4iLCJpbXBvcnQgdHlwZSAqIGFzIENvbnN0cmFpbnRTY2hlbWEgZnJvbSAnQHBpeGl2L3R5cGVzLXZybWMtbm9kZS1jb25zdHJhaW50LTEuMCc7XG5pbXBvcnQgdHlwZSAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB0eXBlIHsgR0xURiwgR0xURkxvYWRlclBsdWdpbiwgR0xURlBhcnNlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXIuanMnO1xuaW1wb3J0IHsgVlJNTm9kZUNvbnN0cmFpbnRIZWxwZXIgfSBmcm9tICcuL2hlbHBlcnMnO1xuaW1wb3J0IHR5cGUgeyBWUk1Ob2RlQ29uc3RyYWludExvYWRlclBsdWdpbk9wdGlvbnMgfSBmcm9tICcuL1ZSTU5vZGVDb25zdHJhaW50TG9hZGVyUGx1Z2luT3B0aW9ucyc7XG5pbXBvcnQgeyBWUk1Ob2RlQ29uc3RyYWludE1hbmFnZXIgfSBmcm9tICcuL1ZSTU5vZGVDb25zdHJhaW50TWFuYWdlcic7XG5pbXBvcnQgeyBWUk1Sb3RhdGlvbkNvbnN0cmFpbnQgfSBmcm9tICcuL1ZSTVJvdGF0aW9uQ29uc3RyYWludCc7XG5pbXBvcnQgeyBHTFRGIGFzIEdMVEZTY2hlbWEgfSBmcm9tICdAZ2x0Zi10cmFuc2Zvcm0vY29yZSc7XG5pbXBvcnQgeyBWUk1BaW1Db25zdHJhaW50IH0gZnJvbSAnLi9WUk1BaW1Db25zdHJhaW50JztcbmltcG9ydCB7IFZSTVJvbGxDb25zdHJhaW50IH0gZnJvbSAnLi9WUk1Sb2xsQ29uc3RyYWludCc7XG5cbi8qKlxuICogUG9zc2libGUgc3BlYyB2ZXJzaW9ucyBpdCByZWNvZ25pemVzLlxuICovXG5jb25zdCBQT1NTSUJMRV9TUEVDX1ZFUlNJT05TID0gbmV3IFNldChbJzEuMCcsICcxLjAtYmV0YSddKTtcblxuZXhwb3J0IGNsYXNzIFZSTU5vZGVDb25zdHJhaW50TG9hZGVyUGx1Z2luIGltcGxlbWVudHMgR0xURkxvYWRlclBsdWdpbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgRVhURU5TSU9OX05BTUUgPSAnVlJNQ19ub2RlX2NvbnN0cmFpbnQnO1xuXG4gIC8qKlxuICAgKiBTcGVjaWZ5IGFuIE9iamVjdDNEIHRvIGFkZCB7QGxpbmsgVlJNTm9kZUNvbnN0cmFpbnRIZWxwZXJ9IHMuXG4gICAqIElmIG5vdCBzcGVjaWZpZWQsIGhlbHBlciB3aWxsIG5vdCBiZSBjcmVhdGVkLlxuICAgKiBJZiBgcmVuZGVyT3JkZXJgIGlzIHNldCB0byB0aGUgcm9vdCwgaGVscGVycyB3aWxsIGNvcHkgdGhlIHNhbWUgYHJlbmRlck9yZGVyYCAuXG4gICAqL1xuICBwdWJsaWMgaGVscGVyUm9vdD86IFRIUkVFLk9iamVjdDNEO1xuXG4gIHB1YmxpYyByZWFkb25seSBwYXJzZXI6IEdMVEZQYXJzZXI7XG5cbiAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFZSTU5vZGVDb25zdHJhaW50TG9hZGVyUGx1Z2luLkVYVEVOU0lPTl9OQU1FO1xuICB9XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBhcnNlcjogR0xURlBhcnNlciwgb3B0aW9ucz86IFZSTU5vZGVDb25zdHJhaW50TG9hZGVyUGx1Z2luT3B0aW9ucykge1xuICAgIHRoaXMucGFyc2VyID0gcGFyc2VyO1xuXG4gICAgdGhpcy5oZWxwZXJSb290ID0gb3B0aW9ucz8uaGVscGVyUm9vdDtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBhZnRlclJvb3QoZ2x0ZjogR0xURik6IFByb21pc2U8dm9pZD4ge1xuICAgIGdsdGYudXNlckRhdGEudnJtTm9kZUNvbnN0cmFpbnRNYW5hZ2VyID0gYXdhaXQgdGhpcy5faW1wb3J0KGdsdGYpO1xuICB9XG5cbiAgLyoqXG4gICAqIEltcG9ydCBjb25zdHJhaW50cyBmcm9tIGEgR0xURiBhbmQgcmV0dXJucyBhIHtAbGluayBWUk1Ob2RlQ29uc3RyYWludE1hbmFnZXJ9LlxuICAgKiBJdCBtaWdodCByZXR1cm4gYG51bGxgIGluc3RlYWQgd2hlbiBpdCBkb2VzIG5vdCBuZWVkIHRvIGJlIGNyZWF0ZWQgb3Igc29tZXRoaW5nIGdvIHdyb25nLlxuICAgKlxuICAgKiBAcGFyYW0gZ2x0ZiBBIHBhcnNlZCByZXN1bHQgb2YgR0xURiB0YWtlbiBmcm9tIEdMVEZMb2FkZXJcbiAgICovXG4gIHByb3RlY3RlZCBhc3luYyBfaW1wb3J0KGdsdGY6IEdMVEYpOiBQcm9taXNlPFZSTU5vZGVDb25zdHJhaW50TWFuYWdlciB8IG51bGw+IHtcbiAgICBjb25zdCBqc29uID0gdGhpcy5wYXJzZXIuanNvbiBhcyBHTFRGU2NoZW1hLklHTFRGO1xuXG4gICAgLy8gZWFybHkgYWJvcnQgaWYgaXQgZG9lc24ndCB1c2UgY29uc3RyYWludHNcbiAgICBjb25zdCBpc0NvbnN0cmFpbnRzVXNlZCA9IGpzb24uZXh0ZW5zaW9uc1VzZWQ/LmluZGV4T2YoVlJNTm9kZUNvbnN0cmFpbnRMb2FkZXJQbHVnaW4uRVhURU5TSU9OX05BTUUpICE9PSAtMTtcbiAgICBpZiAoIWlzQ29uc3RyYWludHNVc2VkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBtYW5hZ2VyID0gbmV3IFZSTU5vZGVDb25zdHJhaW50TWFuYWdlcigpO1xuICAgIGNvbnN0IHRocmVlTm9kZXM6IFRIUkVFLk9iamVjdDNEW10gPSBhd2FpdCB0aGlzLnBhcnNlci5nZXREZXBlbmRlbmNpZXMoJ25vZGUnKTtcblxuICAgIC8vIGltcG9ydCBjb25zdHJhaW50cyBmb3IgZWFjaCBub2Rlc1xuICAgIHRocmVlTm9kZXMuZm9yRWFjaCgobm9kZSwgbm9kZUluZGV4KSA9PiB7XG4gICAgICBjb25zdCBzY2hlbWFOb2RlID0ganNvbi5ub2RlcyFbbm9kZUluZGV4XTtcblxuICAgICAgLy8gY2hlY2sgaWYgdGhlIGV4dGVuc2lvbiB1c2VzIHRoZSBleHRlbnNpb25cbiAgICAgIGNvbnN0IGV4dGVuc2lvbiA9IHNjaGVtYU5vZGU/LmV4dGVuc2lvbnM/LltWUk1Ob2RlQ29uc3RyYWludExvYWRlclBsdWdpbi5FWFRFTlNJT05fTkFNRV0gYXNcbiAgICAgICAgfCBDb25zdHJhaW50U2NoZW1hLlZSTUNOb2RlQ29uc3RyYWludFxuICAgICAgICB8IHVuZGVmaW5lZDtcblxuICAgICAgaWYgKGV4dGVuc2lvbiA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc3BlY1ZlcnNpb24gPSBleHRlbnNpb24uc3BlY1ZlcnNpb247XG4gICAgICBpZiAoIVBPU1NJQkxFX1NQRUNfVkVSU0lPTlMuaGFzKHNwZWNWZXJzaW9uKSkge1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgYFZSTU5vZGVDb25zdHJhaW50TG9hZGVyUGx1Z2luOiBVbmtub3duICR7VlJNTm9kZUNvbnN0cmFpbnRMb2FkZXJQbHVnaW4uRVhURU5TSU9OX05BTUV9IHNwZWNWZXJzaW9uIFwiJHtzcGVjVmVyc2lvbn1cImAsXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY29uc3RyYWludERlZiA9IGV4dGVuc2lvbi5jb25zdHJhaW50O1xuXG4gICAgICAvLyBpbXBvcnQgY29uc3RyYWludHNcbiAgICAgIGlmIChjb25zdHJhaW50RGVmLnJvbGwgIT0gbnVsbCkge1xuICAgICAgICBjb25zdCBjb25zdHJhaW50ID0gdGhpcy5faW1wb3J0Um9sbENvbnN0cmFpbnQobm9kZSwgdGhyZWVOb2RlcywgY29uc3RyYWludERlZi5yb2xsKTtcbiAgICAgICAgbWFuYWdlci5hZGRDb25zdHJhaW50KGNvbnN0cmFpbnQpO1xuICAgICAgfSBlbHNlIGlmIChjb25zdHJhaW50RGVmLmFpbSAhPSBudWxsKSB7XG4gICAgICAgIGNvbnN0IGNvbnN0cmFpbnQgPSB0aGlzLl9pbXBvcnRBaW1Db25zdHJhaW50KG5vZGUsIHRocmVlTm9kZXMsIGNvbnN0cmFpbnREZWYuYWltKTtcbiAgICAgICAgbWFuYWdlci5hZGRDb25zdHJhaW50KGNvbnN0cmFpbnQpO1xuICAgICAgfSBlbHNlIGlmIChjb25zdHJhaW50RGVmLnJvdGF0aW9uICE9IG51bGwpIHtcbiAgICAgICAgY29uc3QgY29uc3RyYWludCA9IHRoaXMuX2ltcG9ydFJvdGF0aW9uQ29uc3RyYWludChub2RlLCB0aHJlZU5vZGVzLCBjb25zdHJhaW50RGVmLnJvdGF0aW9uKTtcbiAgICAgICAgbWFuYWdlci5hZGRDb25zdHJhaW50KGNvbnN0cmFpbnQpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gaW5pdCBjb25zdHJhaW50c1xuICAgIGdsdGYuc2NlbmUudXBkYXRlTWF0cml4V29ybGQoKTtcbiAgICBtYW5hZ2VyLnNldEluaXRTdGF0ZSgpO1xuXG4gICAgcmV0dXJuIG1hbmFnZXI7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2ltcG9ydFJvbGxDb25zdHJhaW50KFxuICAgIGRlc3RpbmF0aW9uOiBUSFJFRS5PYmplY3QzRCxcbiAgICBub2RlczogVEhSRUUuT2JqZWN0M0RbXSxcbiAgICByb2xsQ29uc3RyYWludERlZjogQ29uc3RyYWludFNjaGVtYS5Sb2xsQ29uc3RyYWludCxcbiAgKTogVlJNUm9sbENvbnN0cmFpbnQge1xuICAgIGNvbnN0IHsgc291cmNlOiBzb3VyY2VJbmRleCwgcm9sbEF4aXMsIHdlaWdodCB9ID0gcm9sbENvbnN0cmFpbnREZWY7XG4gICAgY29uc3Qgc291cmNlID0gbm9kZXNbc291cmNlSW5kZXhdO1xuICAgIGNvbnN0IGNvbnN0cmFpbnQgPSBuZXcgVlJNUm9sbENvbnN0cmFpbnQoZGVzdGluYXRpb24sIHNvdXJjZSk7XG5cbiAgICBpZiAocm9sbEF4aXMgIT0gbnVsbCkge1xuICAgICAgY29uc3RyYWludC5yb2xsQXhpcyA9IHJvbGxBeGlzO1xuICAgIH1cbiAgICBpZiAod2VpZ2h0ICE9IG51bGwpIHtcbiAgICAgIGNvbnN0cmFpbnQud2VpZ2h0ID0gd2VpZ2h0O1xuICAgIH1cblxuICAgIGlmICh0aGlzLmhlbHBlclJvb3QpIHtcbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBWUk1Ob2RlQ29uc3RyYWludEhlbHBlcihjb25zdHJhaW50KTtcbiAgICAgIHRoaXMuaGVscGVyUm9vdC5hZGQoaGVscGVyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29uc3RyYWludDtcbiAgfVxuXG4gIHByb3RlY3RlZCBfaW1wb3J0QWltQ29uc3RyYWludChcbiAgICBkZXN0aW5hdGlvbjogVEhSRUUuT2JqZWN0M0QsXG4gICAgbm9kZXM6IFRIUkVFLk9iamVjdDNEW10sXG4gICAgYWltQ29uc3RyYWludERlZjogQ29uc3RyYWludFNjaGVtYS5BaW1Db25zdHJhaW50LFxuICApOiBWUk1BaW1Db25zdHJhaW50IHtcbiAgICBjb25zdCB7IHNvdXJjZTogc291cmNlSW5kZXgsIGFpbUF4aXMsIHdlaWdodCB9ID0gYWltQ29uc3RyYWludERlZjtcbiAgICBjb25zdCBzb3VyY2UgPSBub2Rlc1tzb3VyY2VJbmRleF07XG4gICAgY29uc3QgY29uc3RyYWludCA9IG5ldyBWUk1BaW1Db25zdHJhaW50KGRlc3RpbmF0aW9uLCBzb3VyY2UpO1xuXG4gICAgaWYgKGFpbUF4aXMgIT0gbnVsbCkge1xuICAgICAgY29uc3RyYWludC5haW1BeGlzID0gYWltQXhpcztcbiAgICB9XG4gICAgaWYgKHdlaWdodCAhPSBudWxsKSB7XG4gICAgICBjb25zdHJhaW50LndlaWdodCA9IHdlaWdodDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5oZWxwZXJSb290KSB7XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgVlJNTm9kZUNvbnN0cmFpbnRIZWxwZXIoY29uc3RyYWludCk7XG4gICAgICB0aGlzLmhlbHBlclJvb3QuYWRkKGhlbHBlcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbnN0cmFpbnQ7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2ltcG9ydFJvdGF0aW9uQ29uc3RyYWludChcbiAgICBkZXN0aW5hdGlvbjogVEhSRUUuT2JqZWN0M0QsXG4gICAgbm9kZXM6IFRIUkVFLk9iamVjdDNEW10sXG4gICAgcm90YXRpb25Db25zdHJhaW50RGVmOiBDb25zdHJhaW50U2NoZW1hLlJvdGF0aW9uQ29uc3RyYWludCxcbiAgKTogVlJNUm90YXRpb25Db25zdHJhaW50IHtcbiAgICBjb25zdCB7IHNvdXJjZTogc291cmNlSW5kZXgsIHdlaWdodCB9ID0gcm90YXRpb25Db25zdHJhaW50RGVmO1xuICAgIGNvbnN0IHNvdXJjZSA9IG5vZGVzW3NvdXJjZUluZGV4XTtcbiAgICBjb25zdCBjb25zdHJhaW50ID0gbmV3IFZSTVJvdGF0aW9uQ29uc3RyYWludChkZXN0aW5hdGlvbiwgc291cmNlKTtcblxuICAgIGlmICh3ZWlnaHQgIT0gbnVsbCkge1xuICAgICAgY29uc3RyYWludC53ZWlnaHQgPSB3ZWlnaHQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaGVscGVyUm9vdCkge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IFZSTU5vZGVDb25zdHJhaW50SGVscGVyKGNvbnN0cmFpbnQpO1xuICAgICAgdGhpcy5oZWxwZXJSb290LmFkZChoZWxwZXIpO1xuICAgIH1cblxuICAgIHJldHVybiBjb25zdHJhaW50O1xuICB9XG59XG4iXSwibmFtZXMiOlsiX3YzQSIsIlRIUkVFIiwiX3YzQiIsIl9xdWF0QSIsIl9xdWF0QiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUdBLE1BQU1BLE1BQUksR0FBRyxJQUFJQyxnQkFBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBRXBCLE1BQUEsdUJBQXdC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
