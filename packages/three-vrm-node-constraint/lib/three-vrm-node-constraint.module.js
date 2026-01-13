/*!
 * @pixiv/three-vrm-node-constraint v3.4.5
 * Node constraint module for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2026 pixiv Inc.
 * @pixiv/three-vrm-node-constraint is distributed under MIT License
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

// src/helpers/VRMNodeConstraintHelper.ts
import * as THREE from "three";
var _v3A = new THREE.Vector3();
var VRMNodeConstraintHelper = class extends THREE.Group {
  constructor(constraint) {
    super();
    this._attrPosition = new THREE.BufferAttribute(new Float32Array([0, 0, 0, 0, 0, 0]), 3);
    this._attrPosition.setUsage(THREE.DynamicDrawUsage);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", this._attrPosition);
    const material = new THREE.LineBasicMaterial({
      color: 16711935,
      depthTest: false,
      depthWrite: false
    });
    this._line = new THREE.Line(geometry, material);
    this.add(this._line);
    this.constraint = constraint;
  }
  updateMatrixWorld(force) {
    _v3A.setFromMatrixPosition(this.constraint.destination.matrixWorld);
    this._attrPosition.setXYZ(0, _v3A.x, _v3A.y, _v3A.z);
    if (this.constraint.source) {
      _v3A.setFromMatrixPosition(this.constraint.source.matrixWorld);
    }
    this._attrPosition.setXYZ(1, _v3A.x, _v3A.y, _v3A.z);
    this._attrPosition.needsUpdate = true;
    super.updateMatrixWorld(force);
  }
};

// src/VRMAimConstraint.ts
import * as THREE3 from "three";

// src/utils/decomposePosition.ts
function decomposePosition(matrix, target) {
  return target.set(matrix.elements[12], matrix.elements[13], matrix.elements[14]);
}

// src/utils/decomposeRotation.ts
import * as THREE2 from "three";
var _v3A2 = new THREE2.Vector3();
var _v3B = new THREE2.Vector3();
function decomposeRotation(matrix, target) {
  matrix.decompose(_v3A2, target, _v3B);
  return target;
}

// src/utils/quatInvertCompat.ts
function quatInvertCompat(target) {
  if (target.invert) {
    target.invert();
  } else {
    target.inverse();
  }
  return target;
}

// src/VRMNodeConstraint.ts
var VRMNodeConstraint = class {
  /**
   * @param destination The destination object
   * @param source The source object
   */
  constructor(destination, source) {
    this.destination = destination;
    this.source = source;
    this.weight = 1;
  }
};

// src/VRMAimConstraint.ts
var _v3A3 = new THREE3.Vector3();
var _v3B2 = new THREE3.Vector3();
var _v3C = new THREE3.Vector3();
var _quatA = new THREE3.Quaternion();
var _quatB = new THREE3.Quaternion();
var _quatC = new THREE3.Quaternion();
var VRMAimConstraint = class extends VRMNodeConstraint {
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
    this._v3AimAxis.set(
      aimAxis === "PositiveX" ? 1 : aimAxis === "NegativeX" ? -1 : 0,
      aimAxis === "PositiveY" ? 1 : aimAxis === "NegativeY" ? -1 : 0,
      aimAxis === "PositiveZ" ? 1 : aimAxis === "NegativeZ" ? -1 : 0
    );
  }
  get dependencies() {
    const set = /* @__PURE__ */ new Set([this.source]);
    if (this.destination.parent) {
      set.add(this.destination.parent);
    }
    return set;
  }
  constructor(destination, source) {
    super(destination, source);
    this._aimAxis = "PositiveX";
    this._v3AimAxis = new THREE3.Vector3(1, 0, 0);
    this._dstRestQuat = new THREE3.Quaternion();
  }
  setInitState() {
    this._dstRestQuat.copy(this.destination.quaternion);
  }
  update() {
    this.destination.updateWorldMatrix(true, false);
    this.source.updateWorldMatrix(true, false);
    const dstParentWorldQuat = _quatA.identity();
    const invDstParentWorldQuat = _quatB.identity();
    if (this.destination.parent) {
      decomposeRotation(this.destination.parent.matrixWorld, dstParentWorldQuat);
      quatInvertCompat(invDstParentWorldQuat.copy(dstParentWorldQuat));
    }
    const a0 = _v3A3.copy(this._v3AimAxis).applyQuaternion(this._dstRestQuat).applyQuaternion(dstParentWorldQuat);
    const a1 = decomposePosition(this.source.matrixWorld, _v3B2).sub(decomposePosition(this.destination.matrixWorld, _v3C)).normalize();
    const targetQuat = _quatC.setFromUnitVectors(a0, a1).premultiply(invDstParentWorldQuat).multiply(dstParentWorldQuat).multiply(this._dstRestQuat);
    this.destination.quaternion.copy(this._dstRestQuat).slerp(targetQuat, this.weight);
  }
};

// src/utils/traverseAncestorsFromRoot.ts
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

// src/VRMNodeConstraintManager.ts
var VRMNodeConstraintManager = class {
  constructor() {
    this._constraints = /* @__PURE__ */ new Set();
    this._objectConstraintsMap = /* @__PURE__ */ new Map();
  }
  get constraints() {
    return this._constraints;
  }
  addConstraint(constraint) {
    this._constraints.add(constraint);
    let objectSet = this._objectConstraintsMap.get(constraint.destination);
    if (objectSet == null) {
      objectSet = /* @__PURE__ */ new Set();
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
    const constraintsTried = /* @__PURE__ */ new Set();
    const constraintsDone = /* @__PURE__ */ new Set();
    for (const constraint of this._constraints) {
      this._processConstraint(constraint, constraintsTried, constraintsDone, (constraint2) => constraint2.setInitState());
    }
  }
  update() {
    const constraintsTried = /* @__PURE__ */ new Set();
    const constraintsDone = /* @__PURE__ */ new Set();
    for (const constraint of this._constraints) {
      this._processConstraint(constraint, constraintsTried, constraintsDone, (constraint2) => constraint2.update());
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
      throw new Error("VRMNodeConstraintManager: Circular dependency detected while updating constraints");
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
};

// src/VRMRotationConstraint.ts
import * as THREE4 from "three";
var _quatA2 = new THREE4.Quaternion();
var _quatB2 = new THREE4.Quaternion();
var VRMRotationConstraint = class extends VRMNodeConstraint {
  get dependencies() {
    return /* @__PURE__ */ new Set([this.source]);
  }
  constructor(destination, source) {
    super(destination, source);
    this._dstRestQuat = new THREE4.Quaternion();
    this._invSrcRestQuat = new THREE4.Quaternion();
  }
  setInitState() {
    this._dstRestQuat.copy(this.destination.quaternion);
    quatInvertCompat(this._invSrcRestQuat.copy(this.source.quaternion));
  }
  update() {
    const srcDeltaQuat = _quatA2.copy(this._invSrcRestQuat).multiply(this.source.quaternion);
    const targetQuat = _quatB2.copy(this._dstRestQuat).multiply(srcDeltaQuat);
    this.destination.quaternion.copy(this._dstRestQuat).slerp(targetQuat, this.weight);
  }
};

// src/VRMRollConstraint.ts
import * as THREE5 from "three";
var _v3A4 = new THREE5.Vector3();
var _quatA3 = new THREE5.Quaternion();
var _quatB3 = new THREE5.Quaternion();
var VRMRollConstraint = class extends VRMNodeConstraint {
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
    this._v3RollAxis.set(rollAxis === "X" ? 1 : 0, rollAxis === "Y" ? 1 : 0, rollAxis === "Z" ? 1 : 0);
  }
  get dependencies() {
    return /* @__PURE__ */ new Set([this.source]);
  }
  constructor(destination, source) {
    super(destination, source);
    this._rollAxis = "X";
    this._v3RollAxis = new THREE5.Vector3(1, 0, 0);
    this._dstRestQuat = new THREE5.Quaternion();
    this._invDstRestQuat = new THREE5.Quaternion();
    this._invSrcRestQuatMulDstRestQuat = new THREE5.Quaternion();
  }
  setInitState() {
    this._dstRestQuat.copy(this.destination.quaternion);
    quatInvertCompat(this._invDstRestQuat.copy(this._dstRestQuat));
    quatInvertCompat(this._invSrcRestQuatMulDstRestQuat.copy(this.source.quaternion)).multiply(this._dstRestQuat);
  }
  update() {
    const quatDelta = _quatA3.copy(this._invDstRestQuat).multiply(this.source.quaternion).multiply(this._invSrcRestQuatMulDstRestQuat);
    const n1 = _v3A4.copy(this._v3RollAxis).applyQuaternion(quatDelta);
    const quatFromTo = _quatB3.setFromUnitVectors(n1, this._v3RollAxis);
    const targetQuat = quatFromTo.premultiply(this._dstRestQuat).multiply(quatDelta);
    this.destination.quaternion.copy(this._dstRestQuat).slerp(targetQuat, this.weight);
  }
};

// src/VRMNodeConstraintLoaderPlugin.ts
var POSSIBLE_SPEC_VERSIONS = /* @__PURE__ */ new Set(["1.0", "1.0-beta"]);
var _VRMNodeConstraintLoaderPlugin = class _VRMNodeConstraintLoaderPlugin {
  get name() {
    return _VRMNodeConstraintLoaderPlugin.EXTENSION_NAME;
  }
  constructor(parser, options) {
    this.parser = parser;
    this.helperRoot = options == null ? void 0 : options.helperRoot;
  }
  afterRoot(gltf) {
    return __async(this, null, function* () {
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
    return __async(this, null, function* () {
      var _a;
      const json = this.parser.json;
      const isConstraintsUsed = ((_a = json.extensionsUsed) == null ? void 0 : _a.indexOf(_VRMNodeConstraintLoaderPlugin.EXTENSION_NAME)) !== -1;
      if (!isConstraintsUsed) {
        return null;
      }
      const manager = new VRMNodeConstraintManager();
      const threeNodes = yield this.parser.getDependencies("node");
      threeNodes.forEach((node, nodeIndex) => {
        var _a2;
        const schemaNode = json.nodes[nodeIndex];
        const extension = (_a2 = schemaNode == null ? void 0 : schemaNode.extensions) == null ? void 0 : _a2[_VRMNodeConstraintLoaderPlugin.EXTENSION_NAME];
        if (extension == null) {
          return;
        }
        const specVersion = extension.specVersion;
        if (!POSSIBLE_SPEC_VERSIONS.has(specVersion)) {
          console.warn(
            `VRMNodeConstraintLoaderPlugin: Unknown ${_VRMNodeConstraintLoaderPlugin.EXTENSION_NAME} specVersion "${specVersion}"`
          );
          return;
        }
        const constraintDef = extension.constraint;
        if (constraintDef.roll != null) {
          const constraint = this._importRollConstraint(node, threeNodes, constraintDef.roll);
          manager.addConstraint(constraint);
        } else if (constraintDef.aim != null) {
          const constraint = this._importAimConstraint(node, threeNodes, constraintDef.aim);
          manager.addConstraint(constraint);
        } else if (constraintDef.rotation != null) {
          const constraint = this._importRotationConstraint(node, threeNodes, constraintDef.rotation);
          manager.addConstraint(constraint);
        }
      });
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
};
_VRMNodeConstraintLoaderPlugin.EXTENSION_NAME = "VRMC_node_constraint";
var VRMNodeConstraintLoaderPlugin = _VRMNodeConstraintLoaderPlugin;
export {
  VRMAimConstraint,
  VRMNodeConstraint,
  VRMNodeConstraintHelper,
  VRMNodeConstraintLoaderPlugin,
  VRMNodeConstraintManager,
  VRMRollConstraint,
  VRMRotationConstraint
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2hlbHBlcnMvVlJNTm9kZUNvbnN0cmFpbnRIZWxwZXIudHMiLCAiLi4vc3JjL1ZSTUFpbUNvbnN0cmFpbnQudHMiLCAiLi4vc3JjL3V0aWxzL2RlY29tcG9zZVBvc2l0aW9uLnRzIiwgIi4uL3NyYy91dGlscy9kZWNvbXBvc2VSb3RhdGlvbi50cyIsICIuLi9zcmMvdXRpbHMvcXVhdEludmVydENvbXBhdC50cyIsICIuLi9zcmMvVlJNTm9kZUNvbnN0cmFpbnQudHMiLCAiLi4vc3JjL3V0aWxzL3RyYXZlcnNlQW5jZXN0b3JzRnJvbVJvb3QudHMiLCAiLi4vc3JjL1ZSTU5vZGVDb25zdHJhaW50TWFuYWdlci50cyIsICIuLi9zcmMvVlJNUm90YXRpb25Db25zdHJhaW50LnRzIiwgIi4uL3NyYy9WUk1Sb2xsQ29uc3RyYWludC50cyIsICIuLi9zcmMvVlJNTm9kZUNvbnN0cmFpbnRMb2FkZXJQbHVnaW4udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTU5vZGVDb25zdHJhaW50IH0gZnJvbSAnLi4vVlJNTm9kZUNvbnN0cmFpbnQnO1xuXG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuZXhwb3J0IGNsYXNzIFZSTU5vZGVDb25zdHJhaW50SGVscGVyIGV4dGVuZHMgVEhSRUUuR3JvdXAge1xuICBwdWJsaWMgcmVhZG9ubHkgY29uc3RyYWludDogVlJNTm9kZUNvbnN0cmFpbnQ7XG4gIHByaXZhdGUgX2xpbmU6IFRIUkVFLkxpbmU7XG4gIHByaXZhdGUgX2F0dHJQb3NpdGlvbjogVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb25zdHJhaW50OiBWUk1Ob2RlQ29uc3RyYWludCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLl9hdHRyUG9zaXRpb24gPSBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKG5ldyBGbG9hdDMyQXJyYXkoWzAsIDAsIDAsIDAsIDAsIDBdKSwgMyk7XG4gICAgdGhpcy5fYXR0clBvc2l0aW9uLnNldFVzYWdlKFRIUkVFLkR5bmFtaWNEcmF3VXNhZ2UpO1xuXG4gICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuQnVmZmVyR2VvbWV0cnkoKTtcbiAgICBnZW9tZXRyeS5zZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJywgdGhpcy5fYXR0clBvc2l0aW9uKTtcblxuICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLkxpbmVCYXNpY01hdGVyaWFsKHtcbiAgICAgIGNvbG9yOiAweGZmMDBmZixcbiAgICAgIGRlcHRoVGVzdDogZmFsc2UsXG4gICAgICBkZXB0aFdyaXRlOiBmYWxzZSxcbiAgICB9KTtcblxuICAgIHRoaXMuX2xpbmUgPSBuZXcgVEhSRUUuTGluZShnZW9tZXRyeSwgbWF0ZXJpYWwpO1xuICAgIHRoaXMuYWRkKHRoaXMuX2xpbmUpO1xuXG4gICAgdGhpcy5jb25zdHJhaW50ID0gY29uc3RyYWludDtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVNYXRyaXhXb3JsZChmb3JjZT86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBfdjNBLnNldEZyb21NYXRyaXhQb3NpdGlvbih0aGlzLmNvbnN0cmFpbnQuZGVzdGluYXRpb24ubWF0cml4V29ybGQpO1xuICAgIHRoaXMuX2F0dHJQb3NpdGlvbi5zZXRYWVooMCwgX3YzQS54LCBfdjNBLnksIF92M0Eueik7XG5cbiAgICBpZiAodGhpcy5jb25zdHJhaW50LnNvdXJjZSkge1xuICAgICAgX3YzQS5zZXRGcm9tTWF0cml4UG9zaXRpb24odGhpcy5jb25zdHJhaW50LnNvdXJjZS5tYXRyaXhXb3JsZCk7XG4gICAgfVxuICAgIHRoaXMuX2F0dHJQb3NpdGlvbi5zZXRYWVooMSwgX3YzQS54LCBfdjNBLnksIF92M0Eueik7XG5cbiAgICB0aGlzLl9hdHRyUG9zaXRpb24ubmVlZHNVcGRhdGUgPSB0cnVlO1xuXG4gICAgc3VwZXIudXBkYXRlTWF0cml4V29ybGQoZm9yY2UpO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgZGVjb21wb3NlUG9zaXRpb24gfSBmcm9tICcuL3V0aWxzL2RlY29tcG9zZVBvc2l0aW9uJztcbmltcG9ydCB7IGRlY29tcG9zZVJvdGF0aW9uIH0gZnJvbSAnLi91dGlscy9kZWNvbXBvc2VSb3RhdGlvbic7XG5pbXBvcnQgeyBxdWF0SW52ZXJ0Q29tcGF0IH0gZnJvbSAnLi91dGlscy9xdWF0SW52ZXJ0Q29tcGF0JztcbmltcG9ydCB7IFZSTU5vZGVDb25zdHJhaW50IH0gZnJvbSAnLi9WUk1Ob2RlQ29uc3RyYWludCc7XG5cbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3YzQiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfdjNDID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF9xdWF0QSA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5jb25zdCBfcXVhdEIgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuY29uc3QgX3F1YXRDID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblxuLyoqXG4gKiBBIGNvbnN0cmFpbnQgdGhhdCBtYWtlcyBpdCBsb29rIGF0IGEgc291cmNlIG9iamVjdC5cbiAqXG4gKiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS92cm0tYy92cm0tc3BlY2lmaWNhdGlvbi90cmVlL21hc3Rlci9zcGVjaWZpY2F0aW9uL1ZSTUNfbm9kZV9jb25zdHJhaW50LTEuMF9iZXRhI3JvbGwtY29uc3RyYWludFxuICovXG5leHBvcnQgY2xhc3MgVlJNQWltQ29uc3RyYWludCBleHRlbmRzIFZSTU5vZGVDb25zdHJhaW50IHtcbiAgLyoqXG4gICAqIFRoZSBhaW0gYXhpcyBvZiB0aGUgY29uc3RyYWludC5cbiAgICovXG4gIHB1YmxpYyBnZXQgYWltQXhpcygpOiAnUG9zaXRpdmVYJyB8ICdOZWdhdGl2ZVgnIHwgJ1Bvc2l0aXZlWScgfCAnTmVnYXRpdmVZJyB8ICdQb3NpdGl2ZVonIHwgJ05lZ2F0aXZlWicge1xuICAgIHJldHVybiB0aGlzLl9haW1BeGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBhaW0gYXhpcyBvZiB0aGUgY29uc3RyYWludC5cbiAgICovXG4gIHB1YmxpYyBzZXQgYWltQXhpcyhhaW1BeGlzOiAnUG9zaXRpdmVYJyB8ICdOZWdhdGl2ZVgnIHwgJ1Bvc2l0aXZlWScgfCAnTmVnYXRpdmVZJyB8ICdQb3NpdGl2ZVonIHwgJ05lZ2F0aXZlWicpIHtcbiAgICB0aGlzLl9haW1BeGlzID0gYWltQXhpcztcbiAgICB0aGlzLl92M0FpbUF4aXMuc2V0KFxuICAgICAgYWltQXhpcyA9PT0gJ1Bvc2l0aXZlWCcgPyAxLjAgOiBhaW1BeGlzID09PSAnTmVnYXRpdmVYJyA/IC0xLjAgOiAwLjAsXG4gICAgICBhaW1BeGlzID09PSAnUG9zaXRpdmVZJyA/IDEuMCA6IGFpbUF4aXMgPT09ICdOZWdhdGl2ZVknID8gLTEuMCA6IDAuMCxcbiAgICAgIGFpbUF4aXMgPT09ICdQb3NpdGl2ZVonID8gMS4wIDogYWltQXhpcyA9PT0gJ05lZ2F0aXZlWicgPyAtMS4wIDogMC4wLFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGFpbSBheGlzIG9mIHRoZSBjb25zdHJhaW50LlxuICAgKi9cbiAgcHJpdmF0ZSBfYWltQXhpczogJ1Bvc2l0aXZlWCcgfCAnTmVnYXRpdmVYJyB8ICdQb3NpdGl2ZVknIHwgJ05lZ2F0aXZlWScgfCAnUG9zaXRpdmVaJyB8ICdOZWdhdGl2ZVonO1xuXG4gIC8qKlxuICAgKiBUaGUge0BsaW5rIF9haW1BeGlzfSBidXQgaW4gYW4gYWN0dWFsIFZlY3RvcjMgZm9ybS5cbiAgICovXG4gIHByaXZhdGUgX3YzQWltQXhpczogVEhSRUUuVmVjdG9yMztcblxuICAvKipcbiAgICogVGhlIHJlc3QgcXVhdGVybmlvbiBvZiB0aGUge0BsaW5rIGRlc3RpbmF0aW9ufS5cbiAgICovXG4gIHByaXZhdGUgX2RzdFJlc3RRdWF0OiBUSFJFRS5RdWF0ZXJuaW9uO1xuXG4gIHB1YmxpYyBnZXQgZGVwZW5kZW5jaWVzKCk6IFNldDxUSFJFRS5PYmplY3QzRD4ge1xuICAgIGNvbnN0IHNldCA9IG5ldyBTZXQ8VEhSRUUuT2JqZWN0M0Q+KFt0aGlzLnNvdXJjZV0pO1xuXG4gICAgaWYgKHRoaXMuZGVzdGluYXRpb24ucGFyZW50KSB7XG4gICAgICBzZXQuYWRkKHRoaXMuZGVzdGluYXRpb24ucGFyZW50KTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2V0O1xuICB9XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBUSFJFRS5PYmplY3QzRCwgc291cmNlOiBUSFJFRS5PYmplY3QzRCkge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uLCBzb3VyY2UpO1xuXG4gICAgdGhpcy5fYWltQXhpcyA9ICdQb3NpdGl2ZVgnO1xuICAgIHRoaXMuX3YzQWltQXhpcyA9IG5ldyBUSFJFRS5WZWN0b3IzKDEsIDAsIDApO1xuXG4gICAgdGhpcy5fZHN0UmVzdFF1YXQgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuICB9XG5cbiAgcHVibGljIHNldEluaXRTdGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9kc3RSZXN0UXVhdC5jb3B5KHRoaXMuZGVzdGluYXRpb24ucXVhdGVybmlvbik7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIC8vIHVwZGF0ZSB3b3JsZCBtYXRyaXggb2YgZGVzdGluYXRpb24gYW5kIHNvdXJjZSBtYW51YWxseVxuICAgIHRoaXMuZGVzdGluYXRpb24udXBkYXRlV29ybGRNYXRyaXgodHJ1ZSwgZmFsc2UpO1xuICAgIHRoaXMuc291cmNlLnVwZGF0ZVdvcmxkTWF0cml4KHRydWUsIGZhbHNlKTtcblxuICAgIC8vIGdldCB3b3JsZCBxdWF0ZXJuaW9uIG9mIHRoZSBwYXJlbnQgb2YgdGhlIGRlc3RpbmF0aW9uXG4gICAgY29uc3QgZHN0UGFyZW50V29ybGRRdWF0ID0gX3F1YXRBLmlkZW50aXR5KCk7XG4gICAgY29uc3QgaW52RHN0UGFyZW50V29ybGRRdWF0ID0gX3F1YXRCLmlkZW50aXR5KCk7XG4gICAgaWYgKHRoaXMuZGVzdGluYXRpb24ucGFyZW50KSB7XG4gICAgICBkZWNvbXBvc2VSb3RhdGlvbih0aGlzLmRlc3RpbmF0aW9uLnBhcmVudC5tYXRyaXhXb3JsZCwgZHN0UGFyZW50V29ybGRRdWF0KTtcbiAgICAgIHF1YXRJbnZlcnRDb21wYXQoaW52RHN0UGFyZW50V29ybGRRdWF0LmNvcHkoZHN0UGFyZW50V29ybGRRdWF0KSk7XG4gICAgfVxuXG4gICAgLy8gY2FsY3VsYXRlIGZyb20tdG8gdmVjdG9ycyBpbiB3b3JsZCBjb29yZFxuICAgIGNvbnN0IGEwID0gX3YzQS5jb3B5KHRoaXMuX3YzQWltQXhpcykuYXBwbHlRdWF0ZXJuaW9uKHRoaXMuX2RzdFJlc3RRdWF0KS5hcHBseVF1YXRlcm5pb24oZHN0UGFyZW50V29ybGRRdWF0KTtcbiAgICBjb25zdCBhMSA9IGRlY29tcG9zZVBvc2l0aW9uKHRoaXMuc291cmNlLm1hdHJpeFdvcmxkLCBfdjNCKVxuICAgICAgLnN1YihkZWNvbXBvc2VQb3NpdGlvbih0aGlzLmRlc3RpbmF0aW9uLm1hdHJpeFdvcmxkLCBfdjNDKSlcbiAgICAgIC5ub3JtYWxpemUoKTtcblxuICAgIC8vIGNyZWF0ZSBhIGZyb20tdG8gcXVhdGVybmlvbiwgY29udmVydCB0byBkZXN0aW5hdGlvbiBsb2NhbCBjb29yZCwgdGhlbiBtdWx0aXBseSByZXN0IHF1YXRlcm5pb25cbiAgICBjb25zdCB0YXJnZXRRdWF0ID0gX3F1YXRDXG4gICAgICAuc2V0RnJvbVVuaXRWZWN0b3JzKGEwLCBhMSlcbiAgICAgIC5wcmVtdWx0aXBseShpbnZEc3RQYXJlbnRXb3JsZFF1YXQpXG4gICAgICAubXVsdGlwbHkoZHN0UGFyZW50V29ybGRRdWF0KVxuICAgICAgLm11bHRpcGx5KHRoaXMuX2RzdFJlc3RRdWF0KTtcblxuICAgIC8vIGJsZW5kIHdpdGggdGhlIHJlc3QgcXVhdGVybmlvbiB1c2luZyB3ZWlnaHRcbiAgICB0aGlzLmRlc3RpbmF0aW9uLnF1YXRlcm5pb24uY29weSh0aGlzLl9kc3RSZXN0UXVhdCkuc2xlcnAodGFyZ2V0UXVhdCwgdGhpcy53ZWlnaHQpO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG5leHBvcnQgZnVuY3Rpb24gZGVjb21wb3NlUG9zaXRpb248VCBleHRlbmRzIFRIUkVFLlZlY3RvcjM+KG1hdHJpeDogVEhSRUUuTWF0cml4NCwgdGFyZ2V0OiBUKTogVCB7XG4gIHJldHVybiB0YXJnZXQuc2V0KG1hdHJpeC5lbGVtZW50c1sxMl0sIG1hdHJpeC5lbGVtZW50c1sxM10sIG1hdHJpeC5lbGVtZW50c1sxNF0pO1xufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuY29uc3QgX3YzQSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfdjNCID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGRlY29tcG9zZVJvdGF0aW9uPFQgZXh0ZW5kcyBUSFJFRS5RdWF0ZXJuaW9uPihtYXRyaXg6IFRIUkVFLk1hdHJpeDQsIHRhcmdldDogVCk6IFQge1xuICBtYXRyaXguZGVjb21wb3NlKF92M0EsIHRhcmdldCwgX3YzQik7XG4gIHJldHVybiB0YXJnZXQ7XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIEEgY29tcGF0IGZ1bmN0aW9uIGZvciBgUXVhdGVybmlvbi5pbnZlcnQoKWAgLyBgUXVhdGVybmlvbi5pbnZlcnNlKClgLlxuICogYFF1YXRlcm5pb24uaW52ZXJ0KClgIGlzIGludHJvZHVjZWQgaW4gcjEyMyBhbmQgYFF1YXRlcm5pb24uaW52ZXJzZSgpYCBlbWl0cyBhIHdhcm5pbmcuXG4gKiBXZSBhcmUgZ29pbmcgdG8gdXNlIHRoaXMgY29tcGF0IGZvciBhIHdoaWxlLlxuICogQHBhcmFtIHRhcmdldCBBIHRhcmdldCBxdWF0ZXJuaW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBxdWF0SW52ZXJ0Q29tcGF0PFQgZXh0ZW5kcyBUSFJFRS5RdWF0ZXJuaW9uPih0YXJnZXQ6IFQpOiBUIHtcbiAgaWYgKCh0YXJnZXQgYXMgYW55KS5pbnZlcnQpIHtcbiAgICB0YXJnZXQuaW52ZXJ0KCk7XG4gIH0gZWxzZSB7XG4gICAgKHRhcmdldCBhcyBhbnkpLmludmVyc2UoKTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIEEgYmFzZSBjbGFzcyBvZiBWUk0gY29uc3RyYWludCBjbGFzc2VzLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVlJNTm9kZUNvbnN0cmFpbnQge1xuICAvKipcbiAgICogVGhlIG9iamVjdCBiZWluZyBjb25zdHJhaW5lZCBieSB0aGUge0BsaW5rIHNvdXJjZX0uXG4gICAqL1xuICBwdWJsaWMgZGVzdGluYXRpb246IFRIUkVFLk9iamVjdDNEO1xuXG4gIC8qKlxuICAgKiBUaGUgb2JqZWN0IGNvbnN0cmFpbnMgdGhlIHtAbGluayBkZXN0aW5hdGlvbn0uXG4gICAqL1xuICBwdWJsaWMgc291cmNlOiBUSFJFRS5PYmplY3QzRDtcblxuICAvKipcbiAgICogVGhlIHdlaWdodCBvZiB0aGUgY29uc3RyYWludC5cbiAgICovXG4gIHB1YmxpYyB3ZWlnaHQ6IG51bWJlcjtcblxuICBwdWJsaWMgYWJzdHJhY3QgZ2V0IGRlcGVuZGVuY2llcygpOiBTZXQ8VEhSRUUuT2JqZWN0M0Q+O1xuXG4gIC8qKlxuICAgKiBAcGFyYW0gZGVzdGluYXRpb24gVGhlIGRlc3RpbmF0aW9uIG9iamVjdFxuICAgKiBAcGFyYW0gc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0XG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFRIUkVFLk9iamVjdDNELCBzb3VyY2U6IFRIUkVFLk9iamVjdDNEKSB7XG4gICAgdGhpcy5kZXN0aW5hdGlvbiA9IGRlc3RpbmF0aW9uO1xuICAgIHRoaXMuc291cmNlID0gc291cmNlO1xuXG4gICAgdGhpcy53ZWlnaHQgPSAxLjA7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGluaXRpYWwgc3RhdGUgb2YgdGhlIGNvbnN0cmFpbnQuXG4gICAqL1xuICBwdWJsaWMgYWJzdHJhY3Qgc2V0SW5pdFN0YXRlKCk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBhbmQgYXBwbHkgdGhlIGNvbnN0cmFpbnQuXG4gICAqL1xuICBwdWJsaWMgYWJzdHJhY3QgdXBkYXRlKCk6IHZvaWQ7XG59XG4iLCAiaW1wb3J0IHR5cGUgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbi8qKlxuICogVHJhdmVyc2UgYW5jZXN0b3JzIG9mIGdpdmVuIG9iamVjdCBhbmQgY2FsbCBnaXZlbiBjYWxsYmFjayBmcm9tIHJvb3Qgc2lkZS5cbiAqIEl0IHdpbGwgaW5jbHVkZSB0aGUgZ2l2ZW4gb2JqZWN0IGl0c2VsZi5cbiAqXG4gKiBAcGFyYW0gb2JqZWN0IFRoZSBvYmplY3QgeW91IHdhbnQgdG8gdHJhdmVyc2VcbiAqIEBwYXJhbSBjYWxsYmFjayBUaGUgY2FsbCBiYWNrIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSBjYWxsZWQgZm9yIGVhY2ggYW5jZXN0b3JzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0cmF2ZXJzZUFuY2VzdG9yc0Zyb21Sb290KG9iamVjdDogVEhSRUUuT2JqZWN0M0QsIGNhbGxiYWNrOiAob2JqZWN0OiBUSFJFRS5PYmplY3QzRCkgPT4gdm9pZCk6IHZvaWQge1xuICBjb25zdCBhbmNlc3RvcnM6IFRIUkVFLk9iamVjdDNEW10gPSBbb2JqZWN0XTtcblxuICBsZXQgaGVhZDogVEhSRUUuT2JqZWN0M0QgfCBudWxsID0gb2JqZWN0LnBhcmVudDtcbiAgd2hpbGUgKGhlYWQgIT09IG51bGwpIHtcbiAgICBhbmNlc3RvcnMudW5zaGlmdChoZWFkKTtcbiAgICBoZWFkID0gaGVhZC5wYXJlbnQ7XG4gIH1cblxuICBhbmNlc3RvcnMuZm9yRWFjaCgoYW5jZXN0b3IpID0+IHtcbiAgICBjYWxsYmFjayhhbmNlc3Rvcik7XG4gIH0pO1xufVxuIiwgImltcG9ydCB0eXBlICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHR5cGUgeyBWUk1Ob2RlQ29uc3RyYWludCB9IGZyb20gJy4vVlJNTm9kZUNvbnN0cmFpbnQnO1xuaW1wb3J0IHsgdHJhdmVyc2VBbmNlc3RvcnNGcm9tUm9vdCB9IGZyb20gJy4vdXRpbHMvdHJhdmVyc2VBbmNlc3RvcnNGcm9tUm9vdCc7XG5cbmV4cG9ydCBjbGFzcyBWUk1Ob2RlQ29uc3RyYWludE1hbmFnZXIge1xuICBwcml2YXRlIF9jb25zdHJhaW50cyA9IG5ldyBTZXQ8VlJNTm9kZUNvbnN0cmFpbnQ+KCk7XG4gIHB1YmxpYyBnZXQgY29uc3RyYWludHMoKTogU2V0PFZSTU5vZGVDb25zdHJhaW50PiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnN0cmFpbnRzO1xuICB9XG5cbiAgcHJpdmF0ZSBfb2JqZWN0Q29uc3RyYWludHNNYXAgPSBuZXcgTWFwPFRIUkVFLk9iamVjdDNELCBTZXQ8VlJNTm9kZUNvbnN0cmFpbnQ+PigpO1xuXG4gIHB1YmxpYyBhZGRDb25zdHJhaW50KGNvbnN0cmFpbnQ6IFZSTU5vZGVDb25zdHJhaW50KTogdm9pZCB7XG4gICAgdGhpcy5fY29uc3RyYWludHMuYWRkKGNvbnN0cmFpbnQpO1xuXG4gICAgbGV0IG9iamVjdFNldCA9IHRoaXMuX29iamVjdENvbnN0cmFpbnRzTWFwLmdldChjb25zdHJhaW50LmRlc3RpbmF0aW9uKTtcbiAgICBpZiAob2JqZWN0U2V0ID09IG51bGwpIHtcbiAgICAgIG9iamVjdFNldCA9IG5ldyBTZXQ8VlJNTm9kZUNvbnN0cmFpbnQ+KCk7XG4gICAgICB0aGlzLl9vYmplY3RDb25zdHJhaW50c01hcC5zZXQoY29uc3RyYWludC5kZXN0aW5hdGlvbiwgb2JqZWN0U2V0KTtcbiAgICB9XG4gICAgb2JqZWN0U2V0LmFkZChjb25zdHJhaW50KTtcbiAgfVxuXG4gIHB1YmxpYyBkZWxldGVDb25zdHJhaW50KGNvbnN0cmFpbnQ6IFZSTU5vZGVDb25zdHJhaW50KTogdm9pZCB7XG4gICAgdGhpcy5fY29uc3RyYWludHMuZGVsZXRlKGNvbnN0cmFpbnQpO1xuXG4gICAgY29uc3Qgb2JqZWN0U2V0ID0gdGhpcy5fb2JqZWN0Q29uc3RyYWludHNNYXAuZ2V0KGNvbnN0cmFpbnQuZGVzdGluYXRpb24pITtcbiAgICBvYmplY3RTZXQuZGVsZXRlKGNvbnN0cmFpbnQpO1xuICB9XG5cbiAgcHVibGljIHNldEluaXRTdGF0ZSgpOiB2b2lkIHtcbiAgICBjb25zdCBjb25zdHJhaW50c1RyaWVkID0gbmV3IFNldDxWUk1Ob2RlQ29uc3RyYWludD4oKTtcbiAgICBjb25zdCBjb25zdHJhaW50c0RvbmUgPSBuZXcgU2V0PFZSTU5vZGVDb25zdHJhaW50PigpO1xuXG4gICAgZm9yIChjb25zdCBjb25zdHJhaW50IG9mIHRoaXMuX2NvbnN0cmFpbnRzKSB7XG4gICAgICB0aGlzLl9wcm9jZXNzQ29uc3RyYWludChjb25zdHJhaW50LCBjb25zdHJhaW50c1RyaWVkLCBjb25zdHJhaW50c0RvbmUsIChjb25zdHJhaW50KSA9PiBjb25zdHJhaW50LnNldEluaXRTdGF0ZSgpKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIGNvbnN0IGNvbnN0cmFpbnRzVHJpZWQgPSBuZXcgU2V0PFZSTU5vZGVDb25zdHJhaW50PigpO1xuICAgIGNvbnN0IGNvbnN0cmFpbnRzRG9uZSA9IG5ldyBTZXQ8VlJNTm9kZUNvbnN0cmFpbnQ+KCk7XG5cbiAgICBmb3IgKGNvbnN0IGNvbnN0cmFpbnQgb2YgdGhpcy5fY29uc3RyYWludHMpIHtcbiAgICAgIHRoaXMuX3Byb2Nlc3NDb25zdHJhaW50KGNvbnN0cmFpbnQsIGNvbnN0cmFpbnRzVHJpZWQsIGNvbnN0cmFpbnRzRG9uZSwgKGNvbnN0cmFpbnQpID0+IGNvbnN0cmFpbnQudXBkYXRlKCkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgYSBjb25zdHJhaW50LlxuICAgKiBJZiB0aGVyZSBhcmUgb3RoZXIgY29uc3RyYWludHMgdGhhdCBhcmUgZGVwZW5kYW50LCBpdCB3aWxsIHRyeSB0byB1cGRhdGUgdGhlbSByZWN1cnNpdmVseS5cbiAgICogSXQgbWlnaHQgdGhyb3cgYW4gZXJyb3IgaWYgdGhlcmUgYXJlIGNpcmN1bGFyIGRlcGVuZGVuY2llcy5cbiAgICpcbiAgICogSW50ZW5kZWQgdG8gYmUgdXNlZCBpbiB7QGxpbmsgdXBkYXRlfSBhbmQge0BsaW5rIF9wcm9jZXNzQ29uc3RyYWludH0gaXRzZWxmIHJlY3Vyc2l2ZWx5LlxuICAgKlxuICAgKiBAcGFyYW0gY29uc3RyYWludCBBIGNvbnN0cmFpbnQgeW91IHdhbnQgdG8gdXBkYXRlXG4gICAqIEBwYXJhbSBjb25zdHJhaW50c1RyaWVkIFNldCBvZiBjb25zdHJhaW50cyB0aGF0IGFyZSBhbHJlYWR5IHRyaWVkIHRvIGJlIHVwZGF0ZWRcbiAgICogQHBhcmFtIGNvbnN0cmFpbnRzRG9uZSBTZXQgb2YgY29uc3RyYWludHMgdGhhdCBhcmUgYWxyZWFkeSB1cCB0byBkYXRlXG4gICAqL1xuICBwcml2YXRlIF9wcm9jZXNzQ29uc3RyYWludChcbiAgICBjb25zdHJhaW50OiBWUk1Ob2RlQ29uc3RyYWludCxcbiAgICBjb25zdHJhaW50c1RyaWVkOiBTZXQ8VlJNTm9kZUNvbnN0cmFpbnQ+LFxuICAgIGNvbnN0cmFpbnRzRG9uZTogU2V0PFZSTU5vZGVDb25zdHJhaW50PixcbiAgICBjYWxsYmFjazogKGNvbnN0cmFpbnQ6IFZSTU5vZGVDb25zdHJhaW50KSA9PiB2b2lkLFxuICApOiB2b2lkIHtcbiAgICBpZiAoY29uc3RyYWludHNEb25lLmhhcyhjb25zdHJhaW50KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChjb25zdHJhaW50c1RyaWVkLmhhcyhjb25zdHJhaW50KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdWUk1Ob2RlQ29uc3RyYWludE1hbmFnZXI6IENpcmN1bGFyIGRlcGVuZGVuY3kgZGV0ZWN0ZWQgd2hpbGUgdXBkYXRpbmcgY29uc3RyYWludHMnKTtcbiAgICB9XG4gICAgY29uc3RyYWludHNUcmllZC5hZGQoY29uc3RyYWludCk7XG5cbiAgICBjb25zdCBkZXBPYmplY3RzID0gY29uc3RyYWludC5kZXBlbmRlbmNpZXM7XG4gICAgZm9yIChjb25zdCBkZXBPYmplY3Qgb2YgZGVwT2JqZWN0cykge1xuICAgICAgdHJhdmVyc2VBbmNlc3RvcnNGcm9tUm9vdChkZXBPYmplY3QsIChkZXBPYmplY3RBbmNlc3RvcikgPT4ge1xuICAgICAgICBjb25zdCBvYmplY3RTZXQgPSB0aGlzLl9vYmplY3RDb25zdHJhaW50c01hcC5nZXQoZGVwT2JqZWN0QW5jZXN0b3IpO1xuICAgICAgICBpZiAob2JqZWN0U2V0KSB7XG4gICAgICAgICAgZm9yIChjb25zdCBkZXBDb25zdHJhaW50IG9mIG9iamVjdFNldCkge1xuICAgICAgICAgICAgdGhpcy5fcHJvY2Vzc0NvbnN0cmFpbnQoZGVwQ29uc3RyYWludCwgY29uc3RyYWludHNUcmllZCwgY29uc3RyYWludHNEb25lLCBjYWxsYmFjayk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjYWxsYmFjayhjb25zdHJhaW50KTtcblxuICAgIGNvbnN0cmFpbnRzRG9uZS5hZGQoY29uc3RyYWludCk7XG4gIH1cbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBxdWF0SW52ZXJ0Q29tcGF0IH0gZnJvbSAnLi91dGlscy9xdWF0SW52ZXJ0Q29tcGF0JztcbmltcG9ydCB7IFZSTU5vZGVDb25zdHJhaW50IH0gZnJvbSAnLi9WUk1Ob2RlQ29uc3RyYWludCc7XG5cbmNvbnN0IF9xdWF0QSA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5jb25zdCBfcXVhdEIgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXG4vKipcbiAqIEEgY29uc3RyYWludCB0aGF0IHRyYW5zZmVycyBhIHJvdGF0aW9uIGFyb3VuZCBvbmUgYXhpcyBvZiBhIHNvdXJjZS5cbiAqXG4gKiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS92cm0tYy92cm0tc3BlY2lmaWNhdGlvbi90cmVlL21hc3Rlci9zcGVjaWZpY2F0aW9uL1ZSTUNfbm9kZV9jb25zdHJhaW50LTEuMF9iZXRhI3JvbGwtY29uc3RyYWludFxuICovXG5leHBvcnQgY2xhc3MgVlJNUm90YXRpb25Db25zdHJhaW50IGV4dGVuZHMgVlJNTm9kZUNvbnN0cmFpbnQge1xuICAvKipcbiAgICogVGhlIHJlc3QgcXVhdGVybmlvbiBvZiB0aGUge0BsaW5rIGRlc3RpbmF0aW9ufS5cbiAgICovXG4gIHByaXZhdGUgX2RzdFJlc3RRdWF0OiBUSFJFRS5RdWF0ZXJuaW9uO1xuXG4gIC8qKlxuICAgKiBUaGUgaW52ZXJzZSBvZiB0aGUgcmVzdCBxdWF0ZXJuaW9uIG9mIHRoZSB7QGxpbmsgc291cmNlfS5cbiAgICovXG4gIHByaXZhdGUgX2ludlNyY1Jlc3RRdWF0OiBUSFJFRS5RdWF0ZXJuaW9uO1xuXG4gIHB1YmxpYyBnZXQgZGVwZW5kZW5jaWVzKCk6IFNldDxUSFJFRS5PYmplY3QzRD4ge1xuICAgIHJldHVybiBuZXcgU2V0KFt0aGlzLnNvdXJjZV0pO1xuICB9XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBUSFJFRS5PYmplY3QzRCwgc291cmNlOiBUSFJFRS5PYmplY3QzRCkge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uLCBzb3VyY2UpO1xuXG4gICAgdGhpcy5fZHN0UmVzdFF1YXQgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuICAgIHRoaXMuX2ludlNyY1Jlc3RRdWF0ID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRJbml0U3RhdGUoKTogdm9pZCB7XG4gICAgdGhpcy5fZHN0UmVzdFF1YXQuY29weSh0aGlzLmRlc3RpbmF0aW9uLnF1YXRlcm5pb24pO1xuICAgIHF1YXRJbnZlcnRDb21wYXQodGhpcy5faW52U3JjUmVzdFF1YXQuY29weSh0aGlzLnNvdXJjZS5xdWF0ZXJuaW9uKSk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIC8vIGNhbGN1bGF0ZSB0aGUgZGVsdGEgcm90YXRpb24gZnJvbSB0aGUgcmVzdCBhYm91dCB0aGUgc291cmNlXG4gICAgY29uc3Qgc3JjRGVsdGFRdWF0ID0gX3F1YXRBLmNvcHkodGhpcy5faW52U3JjUmVzdFF1YXQpLm11bHRpcGx5KHRoaXMuc291cmNlLnF1YXRlcm5pb24pO1xuXG4gICAgLy8gbXVsdGlwbHkgdGhlIGRlbHRhIHRvIHRoZSByZXN0IG9mIHRoZSBkZXN0aW5hdGlvblxuICAgIGNvbnN0IHRhcmdldFF1YXQgPSBfcXVhdEIuY29weSh0aGlzLl9kc3RSZXN0UXVhdCkubXVsdGlwbHkoc3JjRGVsdGFRdWF0KTtcblxuICAgIC8vIGJsZW5kIHdpdGggdGhlIHJlc3QgcXVhdGVybmlvbiB1c2luZyB3ZWlnaHRcbiAgICB0aGlzLmRlc3RpbmF0aW9uLnF1YXRlcm5pb24uY29weSh0aGlzLl9kc3RSZXN0UXVhdCkuc2xlcnAodGFyZ2V0UXVhdCwgdGhpcy53ZWlnaHQpO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgcXVhdEludmVydENvbXBhdCB9IGZyb20gJy4vdXRpbHMvcXVhdEludmVydENvbXBhdCc7XG5pbXBvcnQgeyBWUk1Ob2RlQ29uc3RyYWludCB9IGZyb20gJy4vVlJNTm9kZUNvbnN0cmFpbnQnO1xuXG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF9xdWF0QSA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5jb25zdCBfcXVhdEIgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXG4vKipcbiAqIEEgY29uc3RyYWludCB0aGF0IHRyYW5zZmVycyBhIHJvdGF0aW9uIGFyb3VuZCBvbmUgYXhpcyBvZiBhIHNvdXJjZS5cbiAqXG4gKiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS92cm0tYy92cm0tc3BlY2lmaWNhdGlvbi90cmVlL21hc3Rlci9zcGVjaWZpY2F0aW9uL1ZSTUNfbm9kZV9jb25zdHJhaW50LTEuMF9iZXRhI3JvbGwtY29uc3RyYWludFxuICovXG5leHBvcnQgY2xhc3MgVlJNUm9sbENvbnN0cmFpbnQgZXh0ZW5kcyBWUk1Ob2RlQ29uc3RyYWludCB7XG4gIC8qKlxuICAgKiBUaGUgcm9sbCBheGlzIG9mIHRoZSBjb25zdHJhaW50LlxuICAgKi9cbiAgcHVibGljIGdldCByb2xsQXhpcygpOiAnWCcgfCAnWScgfCAnWicge1xuICAgIHJldHVybiB0aGlzLl9yb2xsQXhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgcm9sbCBheGlzIG9mIHRoZSBjb25zdHJhaW50LlxuICAgKi9cbiAgcHVibGljIHNldCByb2xsQXhpcyhyb2xsQXhpczogJ1gnIHwgJ1knIHwgJ1onKSB7XG4gICAgdGhpcy5fcm9sbEF4aXMgPSByb2xsQXhpcztcbiAgICB0aGlzLl92M1JvbGxBeGlzLnNldChyb2xsQXhpcyA9PT0gJ1gnID8gMS4wIDogMC4wLCByb2xsQXhpcyA9PT0gJ1knID8gMS4wIDogMC4wLCByb2xsQXhpcyA9PT0gJ1onID8gMS4wIDogMC4wKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgcm9sbCBheGlzIG9mIHRoZSBjb25zdHJhaW50LlxuICAgKi9cbiAgcHJpdmF0ZSBfcm9sbEF4aXM6ICdYJyB8ICdZJyB8ICdaJztcblxuICAvKipcbiAgICogVGhlIHtAbGluayBfcm9sbEF4aXN9IGJ1dCBpbiBhbiBhY3R1YWwgVmVjdG9yMyBmb3JtLlxuICAgKi9cbiAgcHJpdmF0ZSBfdjNSb2xsQXhpczogVEhSRUUuVmVjdG9yMztcblxuICAvKipcbiAgICogVGhlIHJlc3QgcXVhdGVybmlvbiBvZiB0aGUge0BsaW5rIGRlc3RpbmF0aW9ufS5cbiAgICovXG4gIHByaXZhdGUgX2RzdFJlc3RRdWF0OiBUSFJFRS5RdWF0ZXJuaW9uO1xuXG4gIC8qKlxuICAgKiBUaGUgaW52ZXJzZSBvZiB0aGUgcmVzdCBxdWF0ZXJuaW9uIG9mIHRoZSB7QGxpbmsgZGVzdGluYXRpb259LlxuICAgKi9cbiAgcHJpdmF0ZSBfaW52RHN0UmVzdFF1YXQ6IFRIUkVFLlF1YXRlcm5pb247XG5cbiAgLyoqXG4gICAqIGBzcmNSZXN0UXVhdC5pbnZlcnQoKSAqIGRzdFJlc3RRdWF0YC5cbiAgICovXG4gIHByaXZhdGUgX2ludlNyY1Jlc3RRdWF0TXVsRHN0UmVzdFF1YXQ6IFRIUkVFLlF1YXRlcm5pb247XG5cbiAgcHVibGljIGdldCBkZXBlbmRlbmNpZXMoKTogU2V0PFRIUkVFLk9iamVjdDNEPiB7XG4gICAgcmV0dXJuIG5ldyBTZXQoW3RoaXMuc291cmNlXSk7XG4gIH1cblxuICBwdWJsaWMgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFRIUkVFLk9iamVjdDNELCBzb3VyY2U6IFRIUkVFLk9iamVjdDNEKSB7XG4gICAgc3VwZXIoZGVzdGluYXRpb24sIHNvdXJjZSk7XG5cbiAgICB0aGlzLl9yb2xsQXhpcyA9ICdYJztcbiAgICB0aGlzLl92M1JvbGxBeGlzID0gbmV3IFRIUkVFLlZlY3RvcjMoMSwgMCwgMCk7XG5cbiAgICB0aGlzLl9kc3RSZXN0UXVhdCA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG4gICAgdGhpcy5faW52RHN0UmVzdFF1YXQgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuICAgIHRoaXMuX2ludlNyY1Jlc3RRdWF0TXVsRHN0UmVzdFF1YXQgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuICB9XG5cbiAgcHVibGljIHNldEluaXRTdGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9kc3RSZXN0UXVhdC5jb3B5KHRoaXMuZGVzdGluYXRpb24ucXVhdGVybmlvbik7XG4gICAgcXVhdEludmVydENvbXBhdCh0aGlzLl9pbnZEc3RSZXN0UXVhdC5jb3B5KHRoaXMuX2RzdFJlc3RRdWF0KSk7XG4gICAgcXVhdEludmVydENvbXBhdCh0aGlzLl9pbnZTcmNSZXN0UXVhdE11bERzdFJlc3RRdWF0LmNvcHkodGhpcy5zb3VyY2UucXVhdGVybmlvbikpLm11bHRpcGx5KHRoaXMuX2RzdFJlc3RRdWF0KTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgLy8gY2FsY3VsYXRlIHRoZSBkZWx0YSByb3RhdGlvbiBmcm9tIHRoZSByZXN0IGFib3V0IHRoZSBzb3VyY2UsIHRoZW4gY29udmVydCB0byB0aGUgZGVzdGluYXRpb24gbG9jYWwgY29vcmRcbiAgICAvKipcbiAgICAgKiBXaGF0IHRoZSBxdWF0RGVsdGEgaXMgaW50ZW5kZWQgdG8gYmU6XG4gICAgICpcbiAgICAgKiBgYGB0c1xuICAgICAqIGNvbnN0IHF1YXRTcmNEZWx0YSA9IF9xdWF0QVxuICAgICAqICAgLmNvcHkoIHRoaXMuX2ludlNyY1Jlc3RRdWF0IClcbiAgICAgKiAgIC5tdWx0aXBseSggdGhpcy5zb3VyY2UucXVhdGVybmlvbiApO1xuICAgICAqIGNvbnN0IHF1YXRTcmNEZWx0YUluUGFyZW50ID0gX3F1YXRCXG4gICAgICogICAuY29weSggdGhpcy5fc3JjUmVzdFF1YXQgKVxuICAgICAqICAgLm11bHRpcGx5KCBxdWF0U3JjRGVsdGEgKVxuICAgICAqICAgLm11bHRpcGx5KCB0aGlzLl9pbnZTcmNSZXN0UXVhdCApO1xuICAgICAqIGNvbnN0IHF1YXRTcmNEZWx0YUluRHN0ID0gX3F1YXRBXG4gICAgICogICAuY29weSggdGhpcy5faW52RHN0UmVzdFF1YXQgKVxuICAgICAqICAgLm11bHRpcGx5KCBxdWF0U3JjRGVsdGFJblBhcmVudCApXG4gICAgICogICAubXVsdGlwbHkoIHRoaXMuX2RzdFJlc3RRdWF0ICk7XG4gICAgICogYGBgXG4gICAgICovXG4gICAgY29uc3QgcXVhdERlbHRhID0gX3F1YXRBXG4gICAgICAuY29weSh0aGlzLl9pbnZEc3RSZXN0UXVhdClcbiAgICAgIC5tdWx0aXBseSh0aGlzLnNvdXJjZS5xdWF0ZXJuaW9uKVxuICAgICAgLm11bHRpcGx5KHRoaXMuX2ludlNyY1Jlc3RRdWF0TXVsRHN0UmVzdFF1YXQpO1xuXG4gICAgLy8gY3JlYXRlIGEgZnJvbS10byBxdWF0ZXJuaW9uXG4gICAgY29uc3QgbjEgPSBfdjNBLmNvcHkodGhpcy5fdjNSb2xsQXhpcykuYXBwbHlRdWF0ZXJuaW9uKHF1YXREZWx0YSk7XG5cbiAgICAvKipcbiAgICAgKiBXaGF0IHRoZSBxdWF0RnJvbVRvIGlzIGludGVuZGVkIHRvIGJlOlxuICAgICAqXG4gICAgICogYGBgdHNcbiAgICAgKiBjb25zdCBxdWF0RnJvbVRvID0gX3F1YXRCLnNldEZyb21Vbml0VmVjdG9ycyggdGhpcy5fdjNSb2xsQXhpcywgbjEgKS5pbnZlcnNlKCk7XG4gICAgICogYGBgXG4gICAgICovXG4gICAgY29uc3QgcXVhdEZyb21UbyA9IF9xdWF0Qi5zZXRGcm9tVW5pdFZlY3RvcnMobjEsIHRoaXMuX3YzUm9sbEF4aXMpO1xuXG4gICAgLy8gcXVhdEZyb21UbyAqIHF1YXREZWx0YSA9PSByb2xsIGV4dHJhY3RlZCBmcm9tIHF1YXREZWx0YVxuICAgIGNvbnN0IHRhcmdldFF1YXQgPSBxdWF0RnJvbVRvLnByZW11bHRpcGx5KHRoaXMuX2RzdFJlc3RRdWF0KS5tdWx0aXBseShxdWF0RGVsdGEpO1xuXG4gICAgLy8gYmxlbmQgd2l0aCB0aGUgcmVzdCBxdWF0ZXJuaW9uIHVzaW5nIHdlaWdodFxuICAgIHRoaXMuZGVzdGluYXRpb24ucXVhdGVybmlvbi5jb3B5KHRoaXMuX2RzdFJlc3RRdWF0KS5zbGVycCh0YXJnZXRRdWF0LCB0aGlzLndlaWdodCk7XG4gIH1cbn1cbiIsICJpbXBvcnQgdHlwZSAqIGFzIENvbnN0cmFpbnRTY2hlbWEgZnJvbSAnQHBpeGl2L3R5cGVzLXZybWMtbm9kZS1jb25zdHJhaW50LTEuMCc7XG5pbXBvcnQgdHlwZSAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB0eXBlIHsgR0xURiwgR0xURkxvYWRlclBsdWdpbiwgR0xURlBhcnNlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXIuanMnO1xuaW1wb3J0IHsgVlJNTm9kZUNvbnN0cmFpbnRIZWxwZXIgfSBmcm9tICcuL2hlbHBlcnMnO1xuaW1wb3J0IHR5cGUgeyBWUk1Ob2RlQ29uc3RyYWludExvYWRlclBsdWdpbk9wdGlvbnMgfSBmcm9tICcuL1ZSTU5vZGVDb25zdHJhaW50TG9hZGVyUGx1Z2luT3B0aW9ucyc7XG5pbXBvcnQgeyBWUk1Ob2RlQ29uc3RyYWludE1hbmFnZXIgfSBmcm9tICcuL1ZSTU5vZGVDb25zdHJhaW50TWFuYWdlcic7XG5pbXBvcnQgeyBWUk1Sb3RhdGlvbkNvbnN0cmFpbnQgfSBmcm9tICcuL1ZSTVJvdGF0aW9uQ29uc3RyYWludCc7XG5pbXBvcnQgeyBHTFRGIGFzIEdMVEZTY2hlbWEgfSBmcm9tICdAZ2x0Zi10cmFuc2Zvcm0vY29yZSc7XG5pbXBvcnQgeyBWUk1BaW1Db25zdHJhaW50IH0gZnJvbSAnLi9WUk1BaW1Db25zdHJhaW50JztcbmltcG9ydCB7IFZSTVJvbGxDb25zdHJhaW50IH0gZnJvbSAnLi9WUk1Sb2xsQ29uc3RyYWludCc7XG5cbi8qKlxuICogUG9zc2libGUgc3BlYyB2ZXJzaW9ucyBpdCByZWNvZ25pemVzLlxuICovXG5jb25zdCBQT1NTSUJMRV9TUEVDX1ZFUlNJT05TID0gbmV3IFNldChbJzEuMCcsICcxLjAtYmV0YSddKTtcblxuZXhwb3J0IGNsYXNzIFZSTU5vZGVDb25zdHJhaW50TG9hZGVyUGx1Z2luIGltcGxlbWVudHMgR0xURkxvYWRlclBsdWdpbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgRVhURU5TSU9OX05BTUUgPSAnVlJNQ19ub2RlX2NvbnN0cmFpbnQnO1xuXG4gIC8qKlxuICAgKiBTcGVjaWZ5IGFuIE9iamVjdDNEIHRvIGFkZCB7QGxpbmsgVlJNTm9kZUNvbnN0cmFpbnRIZWxwZXJ9IHMuXG4gICAqIElmIG5vdCBzcGVjaWZpZWQsIGhlbHBlciB3aWxsIG5vdCBiZSBjcmVhdGVkLlxuICAgKiBJZiBgcmVuZGVyT3JkZXJgIGlzIHNldCB0byB0aGUgcm9vdCwgaGVscGVycyB3aWxsIGNvcHkgdGhlIHNhbWUgYHJlbmRlck9yZGVyYCAuXG4gICAqL1xuICBwdWJsaWMgaGVscGVyUm9vdD86IFRIUkVFLk9iamVjdDNEO1xuXG4gIHB1YmxpYyByZWFkb25seSBwYXJzZXI6IEdMVEZQYXJzZXI7XG5cbiAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFZSTU5vZGVDb25zdHJhaW50TG9hZGVyUGx1Z2luLkVYVEVOU0lPTl9OQU1FO1xuICB9XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBhcnNlcjogR0xURlBhcnNlciwgb3B0aW9ucz86IFZSTU5vZGVDb25zdHJhaW50TG9hZGVyUGx1Z2luT3B0aW9ucykge1xuICAgIHRoaXMucGFyc2VyID0gcGFyc2VyO1xuXG4gICAgdGhpcy5oZWxwZXJSb290ID0gb3B0aW9ucz8uaGVscGVyUm9vdDtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBhZnRlclJvb3QoZ2x0ZjogR0xURik6IFByb21pc2U8dm9pZD4ge1xuICAgIGdsdGYudXNlckRhdGEudnJtTm9kZUNvbnN0cmFpbnRNYW5hZ2VyID0gYXdhaXQgdGhpcy5faW1wb3J0KGdsdGYpO1xuICB9XG5cbiAgLyoqXG4gICAqIEltcG9ydCBjb25zdHJhaW50cyBmcm9tIGEgR0xURiBhbmQgcmV0dXJucyBhIHtAbGluayBWUk1Ob2RlQ29uc3RyYWludE1hbmFnZXJ9LlxuICAgKiBJdCBtaWdodCByZXR1cm4gYG51bGxgIGluc3RlYWQgd2hlbiBpdCBkb2VzIG5vdCBuZWVkIHRvIGJlIGNyZWF0ZWQgb3Igc29tZXRoaW5nIGdvIHdyb25nLlxuICAgKlxuICAgKiBAcGFyYW0gZ2x0ZiBBIHBhcnNlZCByZXN1bHQgb2YgR0xURiB0YWtlbiBmcm9tIEdMVEZMb2FkZXJcbiAgICovXG4gIHByb3RlY3RlZCBhc3luYyBfaW1wb3J0KGdsdGY6IEdMVEYpOiBQcm9taXNlPFZSTU5vZGVDb25zdHJhaW50TWFuYWdlciB8IG51bGw+IHtcbiAgICBjb25zdCBqc29uID0gdGhpcy5wYXJzZXIuanNvbiBhcyBHTFRGU2NoZW1hLklHTFRGO1xuXG4gICAgLy8gZWFybHkgYWJvcnQgaWYgaXQgZG9lc24ndCB1c2UgY29uc3RyYWludHNcbiAgICBjb25zdCBpc0NvbnN0cmFpbnRzVXNlZCA9IGpzb24uZXh0ZW5zaW9uc1VzZWQ/LmluZGV4T2YoVlJNTm9kZUNvbnN0cmFpbnRMb2FkZXJQbHVnaW4uRVhURU5TSU9OX05BTUUpICE9PSAtMTtcbiAgICBpZiAoIWlzQ29uc3RyYWludHNVc2VkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBtYW5hZ2VyID0gbmV3IFZSTU5vZGVDb25zdHJhaW50TWFuYWdlcigpO1xuICAgIGNvbnN0IHRocmVlTm9kZXM6IFRIUkVFLk9iamVjdDNEW10gPSBhd2FpdCB0aGlzLnBhcnNlci5nZXREZXBlbmRlbmNpZXMoJ25vZGUnKTtcblxuICAgIC8vIGltcG9ydCBjb25zdHJhaW50cyBmb3IgZWFjaCBub2Rlc1xuICAgIHRocmVlTm9kZXMuZm9yRWFjaCgobm9kZSwgbm9kZUluZGV4KSA9PiB7XG4gICAgICBjb25zdCBzY2hlbWFOb2RlID0ganNvbi5ub2RlcyFbbm9kZUluZGV4XTtcblxuICAgICAgLy8gY2hlY2sgaWYgdGhlIGV4dGVuc2lvbiB1c2VzIHRoZSBleHRlbnNpb25cbiAgICAgIGNvbnN0IGV4dGVuc2lvbiA9IHNjaGVtYU5vZGU/LmV4dGVuc2lvbnM/LltWUk1Ob2RlQ29uc3RyYWludExvYWRlclBsdWdpbi5FWFRFTlNJT05fTkFNRV0gYXNcbiAgICAgICAgfCBDb25zdHJhaW50U2NoZW1hLlZSTUNOb2RlQ29uc3RyYWludFxuICAgICAgICB8IHVuZGVmaW5lZDtcblxuICAgICAgaWYgKGV4dGVuc2lvbiA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc3BlY1ZlcnNpb24gPSBleHRlbnNpb24uc3BlY1ZlcnNpb247XG4gICAgICBpZiAoIVBPU1NJQkxFX1NQRUNfVkVSU0lPTlMuaGFzKHNwZWNWZXJzaW9uKSkge1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgYFZSTU5vZGVDb25zdHJhaW50TG9hZGVyUGx1Z2luOiBVbmtub3duICR7VlJNTm9kZUNvbnN0cmFpbnRMb2FkZXJQbHVnaW4uRVhURU5TSU9OX05BTUV9IHNwZWNWZXJzaW9uIFwiJHtzcGVjVmVyc2lvbn1cImAsXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY29uc3RyYWludERlZiA9IGV4dGVuc2lvbi5jb25zdHJhaW50O1xuXG4gICAgICAvLyBpbXBvcnQgY29uc3RyYWludHNcbiAgICAgIGlmIChjb25zdHJhaW50RGVmLnJvbGwgIT0gbnVsbCkge1xuICAgICAgICBjb25zdCBjb25zdHJhaW50ID0gdGhpcy5faW1wb3J0Um9sbENvbnN0cmFpbnQobm9kZSwgdGhyZWVOb2RlcywgY29uc3RyYWludERlZi5yb2xsKTtcbiAgICAgICAgbWFuYWdlci5hZGRDb25zdHJhaW50KGNvbnN0cmFpbnQpO1xuICAgICAgfSBlbHNlIGlmIChjb25zdHJhaW50RGVmLmFpbSAhPSBudWxsKSB7XG4gICAgICAgIGNvbnN0IGNvbnN0cmFpbnQgPSB0aGlzLl9pbXBvcnRBaW1Db25zdHJhaW50KG5vZGUsIHRocmVlTm9kZXMsIGNvbnN0cmFpbnREZWYuYWltKTtcbiAgICAgICAgbWFuYWdlci5hZGRDb25zdHJhaW50KGNvbnN0cmFpbnQpO1xuICAgICAgfSBlbHNlIGlmIChjb25zdHJhaW50RGVmLnJvdGF0aW9uICE9IG51bGwpIHtcbiAgICAgICAgY29uc3QgY29uc3RyYWludCA9IHRoaXMuX2ltcG9ydFJvdGF0aW9uQ29uc3RyYWludChub2RlLCB0aHJlZU5vZGVzLCBjb25zdHJhaW50RGVmLnJvdGF0aW9uKTtcbiAgICAgICAgbWFuYWdlci5hZGRDb25zdHJhaW50KGNvbnN0cmFpbnQpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gaW5pdCBjb25zdHJhaW50c1xuICAgIGdsdGYuc2NlbmUudXBkYXRlTWF0cml4V29ybGQoKTtcbiAgICBtYW5hZ2VyLnNldEluaXRTdGF0ZSgpO1xuXG4gICAgcmV0dXJuIG1hbmFnZXI7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2ltcG9ydFJvbGxDb25zdHJhaW50KFxuICAgIGRlc3RpbmF0aW9uOiBUSFJFRS5PYmplY3QzRCxcbiAgICBub2RlczogVEhSRUUuT2JqZWN0M0RbXSxcbiAgICByb2xsQ29uc3RyYWludERlZjogQ29uc3RyYWludFNjaGVtYS5Sb2xsQ29uc3RyYWludCxcbiAgKTogVlJNUm9sbENvbnN0cmFpbnQge1xuICAgIGNvbnN0IHsgc291cmNlOiBzb3VyY2VJbmRleCwgcm9sbEF4aXMsIHdlaWdodCB9ID0gcm9sbENvbnN0cmFpbnREZWY7XG4gICAgY29uc3Qgc291cmNlID0gbm9kZXNbc291cmNlSW5kZXhdO1xuICAgIGNvbnN0IGNvbnN0cmFpbnQgPSBuZXcgVlJNUm9sbENvbnN0cmFpbnQoZGVzdGluYXRpb24sIHNvdXJjZSk7XG5cbiAgICBpZiAocm9sbEF4aXMgIT0gbnVsbCkge1xuICAgICAgY29uc3RyYWludC5yb2xsQXhpcyA9IHJvbGxBeGlzO1xuICAgIH1cbiAgICBpZiAod2VpZ2h0ICE9IG51bGwpIHtcbiAgICAgIGNvbnN0cmFpbnQud2VpZ2h0ID0gd2VpZ2h0O1xuICAgIH1cblxuICAgIGlmICh0aGlzLmhlbHBlclJvb3QpIHtcbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBWUk1Ob2RlQ29uc3RyYWludEhlbHBlcihjb25zdHJhaW50KTtcbiAgICAgIHRoaXMuaGVscGVyUm9vdC5hZGQoaGVscGVyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29uc3RyYWludDtcbiAgfVxuXG4gIHByb3RlY3RlZCBfaW1wb3J0QWltQ29uc3RyYWludChcbiAgICBkZXN0aW5hdGlvbjogVEhSRUUuT2JqZWN0M0QsXG4gICAgbm9kZXM6IFRIUkVFLk9iamVjdDNEW10sXG4gICAgYWltQ29uc3RyYWludERlZjogQ29uc3RyYWludFNjaGVtYS5BaW1Db25zdHJhaW50LFxuICApOiBWUk1BaW1Db25zdHJhaW50IHtcbiAgICBjb25zdCB7IHNvdXJjZTogc291cmNlSW5kZXgsIGFpbUF4aXMsIHdlaWdodCB9ID0gYWltQ29uc3RyYWludERlZjtcbiAgICBjb25zdCBzb3VyY2UgPSBub2Rlc1tzb3VyY2VJbmRleF07XG4gICAgY29uc3QgY29uc3RyYWludCA9IG5ldyBWUk1BaW1Db25zdHJhaW50KGRlc3RpbmF0aW9uLCBzb3VyY2UpO1xuXG4gICAgaWYgKGFpbUF4aXMgIT0gbnVsbCkge1xuICAgICAgY29uc3RyYWludC5haW1BeGlzID0gYWltQXhpcztcbiAgICB9XG4gICAgaWYgKHdlaWdodCAhPSBudWxsKSB7XG4gICAgICBjb25zdHJhaW50LndlaWdodCA9IHdlaWdodDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5oZWxwZXJSb290KSB7XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgVlJNTm9kZUNvbnN0cmFpbnRIZWxwZXIoY29uc3RyYWludCk7XG4gICAgICB0aGlzLmhlbHBlclJvb3QuYWRkKGhlbHBlcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbnN0cmFpbnQ7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2ltcG9ydFJvdGF0aW9uQ29uc3RyYWludChcbiAgICBkZXN0aW5hdGlvbjogVEhSRUUuT2JqZWN0M0QsXG4gICAgbm9kZXM6IFRIUkVFLk9iamVjdDNEW10sXG4gICAgcm90YXRpb25Db25zdHJhaW50RGVmOiBDb25zdHJhaW50U2NoZW1hLlJvdGF0aW9uQ29uc3RyYWludCxcbiAgKTogVlJNUm90YXRpb25Db25zdHJhaW50IHtcbiAgICBjb25zdCB7IHNvdXJjZTogc291cmNlSW5kZXgsIHdlaWdodCB9ID0gcm90YXRpb25Db25zdHJhaW50RGVmO1xuICAgIGNvbnN0IHNvdXJjZSA9IG5vZGVzW3NvdXJjZUluZGV4XTtcbiAgICBjb25zdCBjb25zdHJhaW50ID0gbmV3IFZSTVJvdGF0aW9uQ29uc3RyYWludChkZXN0aW5hdGlvbiwgc291cmNlKTtcblxuICAgIGlmICh3ZWlnaHQgIT0gbnVsbCkge1xuICAgICAgY29uc3RyYWludC53ZWlnaHQgPSB3ZWlnaHQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaGVscGVyUm9vdCkge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IFZSTU5vZGVDb25zdHJhaW50SGVscGVyKGNvbnN0cmFpbnQpO1xuICAgICAgdGhpcy5oZWxwZXJSb290LmFkZChoZWxwZXIpO1xuICAgIH1cblxuICAgIHJldHVybiBjb25zdHJhaW50O1xuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxZQUFZLFdBQVc7QUFHdkIsSUFBTSxPQUFPLElBQVUsY0FBUTtBQUV4QixJQUFNLDBCQUFOLGNBQTRDLFlBQU07QUFBQSxFQUtoRCxZQUFZLFlBQStCO0FBQ2hELFVBQU07QUFFTixTQUFLLGdCQUFnQixJQUFVLHNCQUFnQixJQUFJLGFBQWEsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztBQUN0RixTQUFLLGNBQWMsU0FBZSxzQkFBZ0I7QUFFbEQsVUFBTSxXQUFXLElBQVUscUJBQWU7QUFDMUMsYUFBUyxhQUFhLFlBQVksS0FBSyxhQUFhO0FBRXBELFVBQU0sV0FBVyxJQUFVLHdCQUFrQjtBQUFBLE1BQzNDLE9BQU87QUFBQSxNQUNQLFdBQVc7QUFBQSxNQUNYLFlBQVk7QUFBQSxJQUNkLENBQUM7QUFFRCxTQUFLLFFBQVEsSUFBVSxXQUFLLFVBQVUsUUFBUTtBQUM5QyxTQUFLLElBQUksS0FBSyxLQUFLO0FB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QVU7QUFDckQsV0FBSyxXQUFXLElBQUksTUFBTTtBQUFBLElBQzVCO0FBRUEsV0FBTztBQUFBLEVBQ1Q7QUFBQSxFQUVVLHFCQUNSLGFBQ0EsT0FDQSxrQkFDa0I7QUFDbEIsVUFBTSxFQUFFLFFBQVEsYUFBYSxTQUFTLE9BQU8sSUFBSTtBQUNqRCxVQUFNLFNBQVMsTUFBTSxXQUFXO0FBQ2hDLFVBQU0sYUFBYSxJQUFJLGlCQUFpQixhQUFhLE1BQU07QUFFM0QsUUFBSSxXQUFXLE1BQU07QUFDbkIsaUJBQVcsVUFBVTtBQUFBLElBQ3ZCO0FBQ0EsUUFBSSxVQUFVLE1BQU07QUFDbEIsaUJBQVcsU0FBUztBQUFBLElBQ3RCO0FBRUEsUUFBSSxLQUFLLFlBQVk7QUFDbkIsWUFBTSxTQUFTLElBQUksd0JBQXdCLFVBQVU7QUFDckQsV0FBSyxXQUFXLElBQUksTUFBTTtBQUFBLElBQzVCO0FBRUEsV0FBTztBQUFBLEVBQ1Q7QUFBQSxFQUVVLDBCQUNSLGFBQ0EsT0FDQSx1QkFDdUI7QUFDdkIsVUFBTSxFQUFFLFFBQVEsYUFBYSxPQUFPLElBQUk7QUFDeEMsVUFBTSxTQUFTLE1BQU0sV0FBVztBQUNoQyxVQUFNLGFBQWEsSUFBSSxzQkFBc0IsYUFBYSxNQUFNO0FBRWhFLFFBQUksVUFBVSxNQUFNO0FBQ2xCLGlCQUFXLFNBQVM7QUFBQSxJQUN0QjtBQUVBLFFBQUksS0FBSyxZQUFZO0FBQ25CLFlBQU0sU0FBUyxJQUFJLHdCQUF3QixVQUFVO0FBQ3JELFdBQUssV0FBVyxJQUFJLE1BQU07QUFBQSxJQUM1QjtBQUVBLFdBQU87QUFBQSxFQUNUO0FBQ0Y7QUEzSmEsK0JBQ1ksaUJBQWlCO0FBRG5DLElBQU0sZ0NBQU47IiwKICAibmFtZXMiOiBbIlRIUkVFIiwgIlRIUkVFIiwgIl92M0EiLCAiX3YzQSIsICJfdjNCIiwgImNvbnN0cmFpbnQiLCAiVEhSRUUiLCAiX3F1YXRBIiwgIl9xdWF0QiIsICJUSFJFRSIsICJfdjNBIiwgIl9xdWF0QSIsICJfcXVhdEIiLCAiX2EiXQp9Cg==
