/*!
 * @pixiv/three-vrm-node-constraint v3.4.5
 * Node constraint module for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2026 pixiv Inc.
 * @pixiv/three-vrm-node-constraint is distributed under MIT License
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
  VRMAimConstraint: () => VRMAimConstraint,
  VRMNodeConstraint: () => VRMNodeConstraint,
  VRMNodeConstraintHelper: () => VRMNodeConstraintHelper,
  VRMNodeConstraintLoaderPlugin: () => VRMNodeConstraintLoaderPlugin,
  VRMNodeConstraintManager: () => VRMNodeConstraintManager,
  VRMRollConstraint: () => VRMRollConstraint,
  VRMRotationConstraint: () => VRMRotationConstraint
});
module.exports = __toCommonJS(src_exports);

// src/helpers/VRMNodeConstraintHelper.ts
var THREE = __toESM(require("three"), 1);
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
var THREE3 = __toESM(require("three"), 1);

// src/utils/decomposePosition.ts
function decomposePosition(matrix, target) {
  return target.set(matrix.elements[12], matrix.elements[13], matrix.elements[14]);
}

// src/utils/decomposeRotation.ts
var THREE2 = __toESM(require("three"), 1);
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
var THREE4 = __toESM(require("three"), 1);
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
var THREE5 = __toESM(require("three"), 1);
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIiwgIi4uL3NyYy9oZWxwZXJzL1ZSTU5vZGVDb25zdHJhaW50SGVscGVyLnRzIiwgIi4uL3NyYy9WUk1BaW1Db25zdHJhaW50LnRzIiwgIi4uL3NyYy91dGlscy9kZWNvbXBvc2VQb3NpdGlvbi50cyIsICIuLi9zcmMvdXRpbHMvZGVjb21wb3NlUm90YXRpb24udHMiLCAiLi4vc3JjL3V0aWxzL3F1YXRJbnZlcnRDb21wYXQudHMiLCAiLi4vc3JjL1ZSTU5vZGVDb25zdHJhaW50LnRzIiwgIi4uL3NyYy91dGlscy90cmF2ZXJzZUFuY2VzdG9yc0Zyb21Sb290LnRzIiwgIi4uL3NyYy9WUk1Ob2RlQ29uc3RyYWludE1hbmFnZXIudHMiLCAiLi4vc3JjL1ZSTVJvdGF0aW9uQ29uc3RyYWludC50cyIsICIuLi9zcmMvVlJNUm9sbENvbnN0cmFpbnQudHMiLCAiLi4vc3JjL1ZSTU5vZGVDb25zdHJhaW50TG9hZGVyUGx1Z2luLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgKiBmcm9tICcuL2hlbHBlcnMnO1xuXG5leHBvcnQgeyBWUk1BaW1Db25zdHJhaW50IH0gZnJvbSAnLi9WUk1BaW1Db25zdHJhaW50JztcbmV4cG9ydCB7IFZSTU5vZGVDb25zdHJhaW50IH0gZnJvbSAnLi9WUk1Ob2RlQ29uc3RyYWludCc7XG5leHBvcnQgeyBWUk1Ob2RlQ29uc3RyYWludExvYWRlclBsdWdpbiB9IGZyb20gJy4vVlJNTm9kZUNvbnN0cmFpbnRMb2FkZXJQbHVnaW4nO1xuZXhwb3J0IHsgVlJNTm9kZUNvbnN0cmFpbnRNYW5hZ2VyIH0gZnJvbSAnLi9WUk1Ob2RlQ29uc3RyYWludE1hbmFnZXInO1xuZXhwb3J0IHsgVlJNUm9sbENvbnN0cmFpbnQgfSBmcm9tICcuL1ZSTVJvbGxDb25zdHJhaW50JztcbmV4cG9ydCB7IFZSTVJvdGF0aW9uQ29uc3RyYWludCB9IGZyb20gJy4vVlJNUm90YXRpb25Db25zdHJhaW50JztcbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1Ob2RlQ29uc3RyYWludCB9IGZyb20gJy4uL1ZSTU5vZGVDb25zdHJhaW50JztcblxuY29uc3QgX3YzQSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbmV4cG9ydCBjbGFzcyBWUk1Ob2RlQ29uc3RyYWludEhlbHBlciBleHRlbmRzIFRIUkVFLkdyb3VwIHtcbiAgcHVibGljIHJlYWRvbmx5IGNvbnN0cmFpbnQ6IFZSTU5vZGVDb25zdHJhaW50O1xuICBwcml2YXRlIF9saW5lOiBUSFJFRS5MaW5lO1xuICBwcml2YXRlIF9hdHRyUG9zaXRpb246IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZTtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoY29uc3RyYWludDogVlJNTm9kZUNvbnN0cmFpbnQpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5fYXR0clBvc2l0aW9uID0gbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShuZXcgRmxvYXQzMkFycmF5KFswLCAwLCAwLCAwLCAwLCAwXSksIDMpO1xuICAgIHRoaXMuX2F0dHJQb3NpdGlvbi5zZXRVc2FnZShUSFJFRS5EeW5hbWljRHJhd1VzYWdlKTtcblxuICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IFRIUkVFLkJ1ZmZlckdlb21ldHJ5KCk7XG4gICAgZ2VvbWV0cnkuc2V0QXR0cmlidXRlKCdwb3NpdGlvbicsIHRoaXMuX2F0dHJQb3NpdGlvbik7XG5cbiAgICBjb25zdCBtYXRlcmlhbCA9IG5ldyBUSFJFRS5MaW5lQmFzaWNNYXRlcmlhbCh7XG4gICAgICBjb2xvcjogMHhmZjAwZmYsXG4gICAgICBkZXB0aFRlc3Q6IGZhbHNlLFxuICAgICAgZGVwdGhXcml0ZTogZmFsc2UsXG4gICAgfSk7XG5cbiAgICB0aGlzLl9saW5lID0gbmV3IFRIUkVFLkxpbmUoZ2VvbWV0cnksIG1hdGVyaWFsKTtcbiAgICB0aGlzLmFkZCh0aGlzLl9saW5lKTtcblxuICAgIHRoaXMuY29uc3RyYWludCA9IGNvbnN0cmFpbnQ7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlTWF0cml4V29ybGQoZm9yY2U/OiBib29sZWFuKTogdm9pZCB7XG4gICAgX3YzQS5zZXRGcm9tTWF0cml4UG9zaXRpb24odGhpcy5jb25zdHJhaW50LmRlc3RpbmF0aW9uLm1hdHJpeFdvcmxkKTtcbiAgICB0aGlzLl9hdHRyUG9zaXRpb24uc2V0WFlaKDAsIF92M0EueCwgX3YzQS55LCBfdjNBLnopO1xuXG4gICAgaWYgKHRoaXMuY29uc3RyYWludC5zb3VyY2UpIHtcbiAgICAgIF92M0Euc2V0RnJvbU1hdHJpeFBvc2l0aW9uKHRoaXMuY29uc3RyYWludC5zb3VyY2UubWF0cml4V29ybGQpO1xuICAgIH1cbiAgICB0aGlzLl9hdHRyUG9zaXRpb24uc2V0WFlaKDEsIF92M0EueCwgX3YzQS55LCBfdjNBLnopO1xuXG4gICAgdGhpcy5fYXR0clBvc2l0aW9uLm5lZWRzVXBkYXRlID0gdHJ1ZTtcblxuICAgIHN1cGVyLnVwZGF0ZU1hdHJpeFdvcmxkKGZvcmNlKTtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IGRlY29tcG9zZVBvc2l0aW9uIH0gZnJvbSAnLi91dGlscy9kZWNvbXBvc2VQb3NpdGlvbic7XG5pbXBvcnQgeyBkZWNvbXBvc2VSb3RhdGlvbiB9IGZyb20gJy4vdXRpbHMvZGVjb21wb3NlUm90YXRpb24nO1xuaW1wb3J0IHsgcXVhdEludmVydENvbXBhdCB9IGZyb20gJy4vdXRpbHMvcXVhdEludmVydENvbXBhdCc7XG5pbXBvcnQgeyBWUk1Ob2RlQ29uc3RyYWludCB9IGZyb20gJy4vVlJNTm9kZUNvbnN0cmFpbnQnO1xuXG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF92M0IgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3YzQyA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfcXVhdEEgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuY29uc3QgX3F1YXRCID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbmNvbnN0IF9xdWF0QyA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5cbi8qKlxuICogQSBjb25zdHJhaW50IHRoYXQgbWFrZXMgaXQgbG9vayBhdCBhIHNvdXJjZSBvYmplY3QuXG4gKlxuICogU2VlOiBodHRwczovL2dpdGh1Yi5jb20vdnJtLWMvdnJtLXNwZWNpZmljYXRpb24vdHJlZS9tYXN0ZXIvc3BlY2lmaWNhdGlvbi9WUk1DX25vZGVfY29uc3RyYWludC0xLjBfYmV0YSNyb2xsLWNvbnN0cmFpbnRcbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUFpbUNvbnN0cmFpbnQgZXh0ZW5kcyBWUk1Ob2RlQ29uc3RyYWludCB7XG4gIC8qKlxuICAgKiBUaGUgYWltIGF4aXMgb2YgdGhlIGNvbnN0cmFpbnQuXG4gICAqL1xuICBwdWJsaWMgZ2V0IGFpbUF4aXMoKTogJ1Bvc2l0aXZlWCcgfCAnTmVnYXRpdmVYJyB8ICdQb3NpdGl2ZVknIHwgJ05lZ2F0aXZlWScgfCAnUG9zaXRpdmVaJyB8ICdOZWdhdGl2ZVonIHtcbiAgICByZXR1cm4gdGhpcy5fYWltQXhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgYWltIGF4aXMgb2YgdGhlIGNvbnN0cmFpbnQuXG4gICAqL1xuICBwdWJsaWMgc2V0IGFpbUF4aXMoYWltQXhpczogJ1Bvc2l0aXZlWCcgfCAnTmVnYXRpdmVYJyB8ICdQb3NpdGl2ZVknIHwgJ05lZ2F0aXZlWScgfCAnUG9zaXRpdmVaJyB8ICdOZWdhdGl2ZVonKSB7XG4gICAgdGhpcy5fYWltQXhpcyA9IGFpbUF4aXM7XG4gICAgdGhpcy5fdjNBaW1BeGlzLnNldChcbiAgICAgIGFpbUF4aXMgPT09ICdQb3NpdGl2ZVgnID8gMS4wIDogYWltQXhpcyA9PT0gJ05lZ2F0aXZlWCcgPyAtMS4wIDogMC4wLFxuICAgICAgYWltQXhpcyA9PT0gJ1Bvc2l0aXZlWScgPyAxLjAgOiBhaW1BeGlzID09PSAnTmVnYXRpdmVZJyA/IC0xLjAgOiAwLjAsXG4gICAgICBhaW1BeGlzID09PSAnUG9zaXRpdmVaJyA/IDEuMCA6IGFpbUF4aXMgPT09ICdOZWdhdGl2ZVonID8gLTEuMCA6IDAuMCxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBhaW0gYXhpcyBvZiB0aGUgY29uc3RyYWludC5cbiAgICovXG4gIHByaXZhdGUgX2FpbUF4aXM6ICdQb3NpdGl2ZVgnIHwgJ05lZ2F0aXZlWCcgfCAnUG9zaXRpdmVZJyB8ICdOZWdhdGl2ZVknIHwgJ1Bvc2l0aXZlWicgfCAnTmVnYXRpdmVaJztcblxuICAvKipcbiAgICogVGhlIHtAbGluayBfYWltQXhpc30gYnV0IGluIGFuIGFjdHVhbCBWZWN0b3IzIGZvcm0uXG4gICAqL1xuICBwcml2YXRlIF92M0FpbUF4aXM6IFRIUkVFLlZlY3RvcjM7XG5cbiAgLyoqXG4gICAqIFRoZSByZXN0IHF1YXRlcm5pb24gb2YgdGhlIHtAbGluayBkZXN0aW5hdGlvbn0uXG4gICAqL1xuICBwcml2YXRlIF9kc3RSZXN0UXVhdDogVEhSRUUuUXVhdGVybmlvbjtcblxuICBwdWJsaWMgZ2V0IGRlcGVuZGVuY2llcygpOiBTZXQ8VEhSRUUuT2JqZWN0M0Q+IHtcbiAgICBjb25zdCBzZXQgPSBuZXcgU2V0PFRIUkVFLk9iamVjdDNEPihbdGhpcy5zb3VyY2VdKTtcblxuICAgIGlmICh0aGlzLmRlc3RpbmF0aW9uLnBhcmVudCkge1xuICAgICAgc2V0LmFkZCh0aGlzLmRlc3RpbmF0aW9uLnBhcmVudCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNldDtcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogVEhSRUUuT2JqZWN0M0QsIHNvdXJjZTogVEhSRUUuT2JqZWN0M0QpIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbiwgc291cmNlKTtcblxuICAgIHRoaXMuX2FpbUF4aXMgPSAnUG9zaXRpdmVYJztcbiAgICB0aGlzLl92M0FpbUF4aXMgPSBuZXcgVEhSRUUuVmVjdG9yMygxLCAwLCAwKTtcblxuICAgIHRoaXMuX2RzdFJlc3RRdWF0ID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRJbml0U3RhdGUoKTogdm9pZCB7XG4gICAgdGhpcy5fZHN0UmVzdFF1YXQuY29weSh0aGlzLmRlc3RpbmF0aW9uLnF1YXRlcm5pb24pO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICAvLyB1cGRhdGUgd29ybGQgbWF0cml4IG9mIGRlc3RpbmF0aW9uIGFuZCBzb3VyY2UgbWFudWFsbHlcbiAgICB0aGlzLmRlc3RpbmF0aW9uLnVwZGF0ZVdvcmxkTWF0cml4KHRydWUsIGZhbHNlKTtcbiAgICB0aGlzLnNvdXJjZS51cGRhdGVXb3JsZE1hdHJpeCh0cnVlLCBmYWxzZSk7XG5cbiAgICAvLyBnZXQgd29ybGQgcXVhdGVybmlvbiBvZiB0aGUgcGFyZW50IG9mIHRoZSBkZXN0aW5hdGlvblxuICAgIGNvbnN0IGRzdFBhcmVudFdvcmxkUXVhdCA9IF9xdWF0QS5pZGVudGl0eSgpO1xuICAgIGNvbnN0IGludkRzdFBhcmVudFdvcmxkUXVhdCA9IF9xdWF0Qi5pZGVudGl0eSgpO1xuICAgIGlmICh0aGlzLmRlc3RpbmF0aW9uLnBhcmVudCkge1xuICAgICAgZGVjb21wb3NlUm90YXRpb24odGhpcy5kZXN0aW5hdGlvbi5wYXJlbnQubWF0cml4V29ybGQsIGRzdFBhcmVudFdvcmxkUXVhdCk7XG4gICAgICBxdWF0SW52ZXJ0Q29tcGF0KGludkRzdFBhcmVudFdvcmxkUXVhdC5jb3B5KGRzdFBhcmVudFdvcmxkUXVhdCkpO1xuICAgIH1cblxuICAgIC8vIGNhbGN1bGF0ZSBmcm9tLXRvIHZlY3RvcnMgaW4gd29ybGQgY29vcmRcbiAgICBjb25zdCBhMCA9IF92M0EuY29weSh0aGlzLl92M0FpbUF4aXMpLmFwcGx5UXVhdGVybmlvbih0aGlzLl9kc3RSZXN0UXVhdCkuYXBwbHlRdWF0ZXJuaW9uKGRzdFBhcmVudFdvcmxkUXVhdCk7XG4gICAgY29uc3QgYTEgPSBkZWNvbXBvc2VQb3NpdGlvbih0aGlzLnNvdXJjZS5tYXRyaXhXb3JsZCwgX3YzQilcbiAgICAgIC5zdWIoZGVjb21wb3NlUG9zaXRpb24odGhpcy5kZXN0aW5hdGlvbi5tYXRyaXhXb3JsZCwgX3YzQykpXG4gICAgICAubm9ybWFsaXplKCk7XG5cbiAgICAvLyBjcmVhdGUgYSBmcm9tLXRvIHF1YXRlcm5pb24sIGNvbnZlcnQgdG8gZGVzdGluYXRpb24gbG9jYWwgY29vcmQsIHRoZW4gbXVsdGlwbHkgcmVzdCBxdWF0ZXJuaW9uXG4gICAgY29uc3QgdGFyZ2V0UXVhdCA9IF9xdWF0Q1xuICAgICAgLnNldEZyb21Vbml0VmVjdG9ycyhhMCwgYTEpXG4gICAgICAucHJlbXVsdGlwbHkoaW52RHN0UGFyZW50V29ybGRRdWF0KVxuICAgICAgLm11bHRpcGx5KGRzdFBhcmVudFdvcmxkUXVhdClcbiAgICAgIC5tdWx0aXBseSh0aGlzLl9kc3RSZXN0UXVhdCk7XG5cbiAgICAvLyBibGVuZCB3aXRoIHRoZSByZXN0IHF1YXRlcm5pb24gdXNpbmcgd2VpZ2h0XG4gICAgdGhpcy5kZXN0aW5hdGlvbi5xdWF0ZXJuaW9uLmNvcHkodGhpcy5fZHN0UmVzdFF1YXQpLnNsZXJwKHRhcmdldFF1YXQsIHRoaXMud2VpZ2h0KTtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGRlY29tcG9zZVBvc2l0aW9uPFQgZXh0ZW5kcyBUSFJFRS5WZWN0b3IzPihtYXRyaXg6IFRIUkVFLk1hdHJpeDQsIHRhcmdldDogVCk6IFQge1xuICByZXR1cm4gdGFyZ2V0LnNldChtYXRyaXguZWxlbWVudHNbMTJdLCBtYXRyaXguZWxlbWVudHNbMTNdLCBtYXRyaXguZWxlbWVudHNbMTRdKTtcbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3YzQiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWNvbXBvc2VSb3RhdGlvbjxUIGV4dGVuZHMgVEhSRUUuUXVhdGVybmlvbj4obWF0cml4OiBUSFJFRS5NYXRyaXg0LCB0YXJnZXQ6IFQpOiBUIHtcbiAgbWF0cml4LmRlY29tcG9zZShfdjNBLCB0YXJnZXQsIF92M0IpO1xuICByZXR1cm4gdGFyZ2V0O1xufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBBIGNvbXBhdCBmdW5jdGlvbiBmb3IgYFF1YXRlcm5pb24uaW52ZXJ0KClgIC8gYFF1YXRlcm5pb24uaW52ZXJzZSgpYC5cbiAqIGBRdWF0ZXJuaW9uLmludmVydCgpYCBpcyBpbnRyb2R1Y2VkIGluIHIxMjMgYW5kIGBRdWF0ZXJuaW9uLmludmVyc2UoKWAgZW1pdHMgYSB3YXJuaW5nLlxuICogV2UgYXJlIGdvaW5nIHRvIHVzZSB0aGlzIGNvbXBhdCBmb3IgYSB3aGlsZS5cbiAqIEBwYXJhbSB0YXJnZXQgQSB0YXJnZXQgcXVhdGVybmlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gcXVhdEludmVydENvbXBhdDxUIGV4dGVuZHMgVEhSRUUuUXVhdGVybmlvbj4odGFyZ2V0OiBUKTogVCB7XG4gIGlmICgodGFyZ2V0IGFzIGFueSkuaW52ZXJ0KSB7XG4gICAgdGFyZ2V0LmludmVydCgpO1xuICB9IGVsc2Uge1xuICAgICh0YXJnZXQgYXMgYW55KS5pbnZlcnNlKCk7XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBBIGJhc2UgY2xhc3Mgb2YgVlJNIGNvbnN0cmFpbnQgY2xhc3Nlcy5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFZSTU5vZGVDb25zdHJhaW50IHtcbiAgLyoqXG4gICAqIFRoZSBvYmplY3QgYmVpbmcgY29uc3RyYWluZWQgYnkgdGhlIHtAbGluayBzb3VyY2V9LlxuICAgKi9cbiAgcHVibGljIGRlc3RpbmF0aW9uOiBUSFJFRS5PYmplY3QzRDtcblxuICAvKipcbiAgICogVGhlIG9iamVjdCBjb25zdHJhaW5zIHRoZSB7QGxpbmsgZGVzdGluYXRpb259LlxuICAgKi9cbiAgcHVibGljIHNvdXJjZTogVEhSRUUuT2JqZWN0M0Q7XG5cbiAgLyoqXG4gICAqIFRoZSB3ZWlnaHQgb2YgdGhlIGNvbnN0cmFpbnQuXG4gICAqL1xuICBwdWJsaWMgd2VpZ2h0OiBudW1iZXI7XG5cbiAgcHVibGljIGFic3RyYWN0IGdldCBkZXBlbmRlbmNpZXMoKTogU2V0PFRIUkVFLk9iamVjdDNEPjtcblxuICAvKipcbiAgICogQHBhcmFtIGRlc3RpbmF0aW9uIFRoZSBkZXN0aW5hdGlvbiBvYmplY3RcbiAgICogQHBhcmFtIHNvdXJjZSBUaGUgc291cmNlIG9iamVjdFxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBUSFJFRS5PYmplY3QzRCwgc291cmNlOiBUSFJFRS5PYmplY3QzRCkge1xuICAgIHRoaXMuZGVzdGluYXRpb24gPSBkZXN0aW5hdGlvbjtcbiAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcblxuICAgIHRoaXMud2VpZ2h0ID0gMS4wO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBpbml0aWFsIHN0YXRlIG9mIHRoZSBjb25zdHJhaW50LlxuICAgKi9cbiAgcHVibGljIGFic3RyYWN0IHNldEluaXRTdGF0ZSgpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBVcGRhdGUgYW5kIGFwcGx5IHRoZSBjb25zdHJhaW50LlxuICAgKi9cbiAgcHVibGljIGFic3RyYWN0IHVwZGF0ZSgpOiB2b2lkO1xufVxuIiwgImltcG9ydCB0eXBlICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIFRyYXZlcnNlIGFuY2VzdG9ycyBvZiBnaXZlbiBvYmplY3QgYW5kIGNhbGwgZ2l2ZW4gY2FsbGJhY2sgZnJvbSByb290IHNpZGUuXG4gKiBJdCB3aWxsIGluY2x1ZGUgdGhlIGdpdmVuIG9iamVjdCBpdHNlbGYuXG4gKlxuICogQHBhcmFtIG9iamVjdCBUaGUgb2JqZWN0IHlvdSB3YW50IHRvIHRyYXZlcnNlXG4gKiBAcGFyYW0gY2FsbGJhY2sgVGhlIGNhbGwgYmFjayBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgY2FsbGVkIGZvciBlYWNoIGFuY2VzdG9yc1xuICovXG5leHBvcnQgZnVuY3Rpb24gdHJhdmVyc2VBbmNlc3RvcnNGcm9tUm9vdChvYmplY3Q6IFRIUkVFLk9iamVjdDNELCBjYWxsYmFjazogKG9iamVjdDogVEhSRUUuT2JqZWN0M0QpID0+IHZvaWQpOiB2b2lkIHtcbiAgY29uc3QgYW5jZXN0b3JzOiBUSFJFRS5PYmplY3QzRFtdID0gW29iamVjdF07XG5cbiAgbGV0IGhlYWQ6IFRIUkVFLk9iamVjdDNEIHwgbnVsbCA9IG9iamVjdC5wYXJlbnQ7XG4gIHdoaWxlIChoZWFkICE9PSBudWxsKSB7XG4gICAgYW5jZXN0b3JzLnVuc2hpZnQoaGVhZCk7XG4gICAgaGVhZCA9IGhlYWQucGFyZW50O1xuICB9XG5cbiAgYW5jZXN0b3JzLmZvckVhY2goKGFuY2VzdG9yKSA9PiB7XG4gICAgY2FsbGJhY2soYW5jZXN0b3IpO1xuICB9KTtcbn1cbiIsICJpbXBvcnQgdHlwZSAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB0eXBlIHsgVlJNTm9kZUNvbnN0cmFpbnQgfSBmcm9tICcuL1ZSTU5vZGVDb25zdHJhaW50JztcbmltcG9ydCB7IHRyYXZlcnNlQW5jZXN0b3JzRnJvbVJvb3QgfSBmcm9tICcuL3V0aWxzL3RyYXZlcnNlQW5jZXN0b3JzRnJvbVJvb3QnO1xuXG5leHBvcnQgY2xhc3MgVlJNTm9kZUNvbnN0cmFpbnRNYW5hZ2VyIHtcbiAgcHJpdmF0ZSBfY29uc3RyYWludHMgPSBuZXcgU2V0PFZSTU5vZGVDb25zdHJhaW50PigpO1xuICBwdWJsaWMgZ2V0IGNvbnN0cmFpbnRzKCk6IFNldDxWUk1Ob2RlQ29uc3RyYWludD4ge1xuICAgIHJldHVybiB0aGlzLl9jb25zdHJhaW50cztcbiAgfVxuXG4gIHByaXZhdGUgX29iamVjdENvbnN0cmFpbnRzTWFwID0gbmV3IE1hcDxUSFJFRS5PYmplY3QzRCwgU2V0PFZSTU5vZGVDb25zdHJhaW50Pj4oKTtcblxuICBwdWJsaWMgYWRkQ29uc3RyYWludChjb25zdHJhaW50OiBWUk1Ob2RlQ29uc3RyYWludCk6IHZvaWQge1xuICAgIHRoaXMuX2NvbnN0cmFpbnRzLmFkZChjb25zdHJhaW50KTtcblxuICAgIGxldCBvYmplY3RTZXQgPSB0aGlzLl9vYmplY3RDb25zdHJhaW50c01hcC5nZXQoY29uc3RyYWludC5kZXN0aW5hdGlvbik7XG4gICAgaWYgKG9iamVjdFNldCA9PSBudWxsKSB7XG4gICAgICBvYmplY3RTZXQgPSBuZXcgU2V0PFZSTU5vZGVDb25zdHJhaW50PigpO1xuICAgICAgdGhpcy5fb2JqZWN0Q29uc3RyYWludHNNYXAuc2V0KGNvbnN0cmFpbnQuZGVzdGluYXRpb24sIG9iamVjdFNldCk7XG4gICAgfVxuICAgIG9iamVjdFNldC5hZGQoY29uc3RyYWludCk7XG4gIH1cblxuICBwdWJsaWMgZGVsZXRlQ29uc3RyYWludChjb25zdHJhaW50OiBWUk1Ob2RlQ29uc3RyYWludCk6IHZvaWQge1xuICAgIHRoaXMuX2NvbnN0cmFpbnRzLmRlbGV0ZShjb25zdHJhaW50KTtcblxuICAgIGNvbnN0IG9iamVjdFNldCA9IHRoaXMuX29iamVjdENvbnN0cmFpbnRzTWFwLmdldChjb25zdHJhaW50LmRlc3RpbmF0aW9uKSE7XG4gICAgb2JqZWN0U2V0LmRlbGV0ZShjb25zdHJhaW50KTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRJbml0U3RhdGUoKTogdm9pZCB7XG4gICAgY29uc3QgY29uc3RyYWludHNUcmllZCA9IG5ldyBTZXQ8VlJNTm9kZUNvbnN0cmFpbnQ+KCk7XG4gICAgY29uc3QgY29uc3RyYWludHNEb25lID0gbmV3IFNldDxWUk1Ob2RlQ29uc3RyYWludD4oKTtcblxuICAgIGZvciAoY29uc3QgY29uc3RyYWludCBvZiB0aGlzLl9jb25zdHJhaW50cykge1xuICAgICAgdGhpcy5fcHJvY2Vzc0NvbnN0cmFpbnQoY29uc3RyYWludCwgY29uc3RyYWludHNUcmllZCwgY29uc3RyYWludHNEb25lLCAoY29uc3RyYWludCkgPT4gY29uc3RyYWludC5zZXRJbml0U3RhdGUoKSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBjb25zdCBjb25zdHJhaW50c1RyaWVkID0gbmV3IFNldDxWUk1Ob2RlQ29uc3RyYWludD4oKTtcbiAgICBjb25zdCBjb25zdHJhaW50c0RvbmUgPSBuZXcgU2V0PFZSTU5vZGVDb25zdHJhaW50PigpO1xuXG4gICAgZm9yIChjb25zdCBjb25zdHJhaW50IG9mIHRoaXMuX2NvbnN0cmFpbnRzKSB7XG4gICAgICB0aGlzLl9wcm9jZXNzQ29uc3RyYWludChjb25zdHJhaW50LCBjb25zdHJhaW50c1RyaWVkLCBjb25zdHJhaW50c0RvbmUsIChjb25zdHJhaW50KSA9PiBjb25zdHJhaW50LnVwZGF0ZSgpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIGEgY29uc3RyYWludC5cbiAgICogSWYgdGhlcmUgYXJlIG90aGVyIGNvbnN0cmFpbnRzIHRoYXQgYXJlIGRlcGVuZGFudCwgaXQgd2lsbCB0cnkgdG8gdXBkYXRlIHRoZW0gcmVjdXJzaXZlbHkuXG4gICAqIEl0IG1pZ2h0IHRocm93IGFuIGVycm9yIGlmIHRoZXJlIGFyZSBjaXJjdWxhciBkZXBlbmRlbmNpZXMuXG4gICAqXG4gICAqIEludGVuZGVkIHRvIGJlIHVzZWQgaW4ge0BsaW5rIHVwZGF0ZX0gYW5kIHtAbGluayBfcHJvY2Vzc0NvbnN0cmFpbnR9IGl0c2VsZiByZWN1cnNpdmVseS5cbiAgICpcbiAgICogQHBhcmFtIGNvbnN0cmFpbnQgQSBjb25zdHJhaW50IHlvdSB3YW50IHRvIHVwZGF0ZVxuICAgKiBAcGFyYW0gY29uc3RyYWludHNUcmllZCBTZXQgb2YgY29uc3RyYWludHMgdGhhdCBhcmUgYWxyZWFkeSB0cmllZCB0byBiZSB1cGRhdGVkXG4gICAqIEBwYXJhbSBjb25zdHJhaW50c0RvbmUgU2V0IG9mIGNvbnN0cmFpbnRzIHRoYXQgYXJlIGFscmVhZHkgdXAgdG8gZGF0ZVxuICAgKi9cbiAgcHJpdmF0ZSBfcHJvY2Vzc0NvbnN0cmFpbnQoXG4gICAgY29uc3RyYWludDogVlJNTm9kZUNvbnN0cmFpbnQsXG4gICAgY29uc3RyYWludHNUcmllZDogU2V0PFZSTU5vZGVDb25zdHJhaW50PixcbiAgICBjb25zdHJhaW50c0RvbmU6IFNldDxWUk1Ob2RlQ29uc3RyYWludD4sXG4gICAgY2FsbGJhY2s6IChjb25zdHJhaW50OiBWUk1Ob2RlQ29uc3RyYWludCkgPT4gdm9pZCxcbiAgKTogdm9pZCB7XG4gICAgaWYgKGNvbnN0cmFpbnRzRG9uZS5oYXMoY29uc3RyYWludCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoY29uc3RyYWludHNUcmllZC5oYXMoY29uc3RyYWludCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVlJNTm9kZUNvbnN0cmFpbnRNYW5hZ2VyOiBDaXJjdWxhciBkZXBlbmRlbmN5IGRldGVjdGVkIHdoaWxlIHVwZGF0aW5nIGNvbnN0cmFpbnRzJyk7XG4gICAgfVxuICAgIGNvbnN0cmFpbnRzVHJpZWQuYWRkKGNvbnN0cmFpbnQpO1xuXG4gICAgY29uc3QgZGVwT2JqZWN0cyA9IGNvbnN0cmFpbnQuZGVwZW5kZW5jaWVzO1xuICAgIGZvciAoY29uc3QgZGVwT2JqZWN0IG9mIGRlcE9iamVjdHMpIHtcbiAgICAgIHRyYXZlcnNlQW5jZXN0b3JzRnJvbVJvb3QoZGVwT2JqZWN0LCAoZGVwT2JqZWN0QW5jZXN0b3IpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqZWN0U2V0ID0gdGhpcy5fb2JqZWN0Q29uc3RyYWludHNNYXAuZ2V0KGRlcE9iamVjdEFuY2VzdG9yKTtcbiAgICAgICAgaWYgKG9iamVjdFNldCkge1xuICAgICAgICAgIGZvciAoY29uc3QgZGVwQ29uc3RyYWludCBvZiBvYmplY3RTZXQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Byb2Nlc3NDb25zdHJhaW50KGRlcENvbnN0cmFpbnQsIGNvbnN0cmFpbnRzVHJpZWQsIGNvbnN0cmFpbnRzRG9uZSwgY2FsbGJhY2spO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2FsbGJhY2soY29uc3RyYWludCk7XG5cbiAgICBjb25zdHJhaW50c0RvbmUuYWRkKGNvbnN0cmFpbnQpO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgcXVhdEludmVydENvbXBhdCB9IGZyb20gJy4vdXRpbHMvcXVhdEludmVydENvbXBhdCc7XG5pbXBvcnQgeyBWUk1Ob2RlQ29uc3RyYWludCB9IGZyb20gJy4vVlJNTm9kZUNvbnN0cmFpbnQnO1xuXG5jb25zdCBfcXVhdEEgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuY29uc3QgX3F1YXRCID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblxuLyoqXG4gKiBBIGNvbnN0cmFpbnQgdGhhdCB0cmFuc2ZlcnMgYSByb3RhdGlvbiBhcm91bmQgb25lIGF4aXMgb2YgYSBzb3VyY2UuXG4gKlxuICogU2VlOiBodHRwczovL2dpdGh1Yi5jb20vdnJtLWMvdnJtLXNwZWNpZmljYXRpb24vdHJlZS9tYXN0ZXIvc3BlY2lmaWNhdGlvbi9WUk1DX25vZGVfY29uc3RyYWludC0xLjBfYmV0YSNyb2xsLWNvbnN0cmFpbnRcbiAqL1xuZXhwb3J0IGNsYXNzIFZSTVJvdGF0aW9uQ29uc3RyYWludCBleHRlbmRzIFZSTU5vZGVDb25zdHJhaW50IHtcbiAgLyoqXG4gICAqIFRoZSByZXN0IHF1YXRlcm5pb24gb2YgdGhlIHtAbGluayBkZXN0aW5hdGlvbn0uXG4gICAqL1xuICBwcml2YXRlIF9kc3RSZXN0UXVhdDogVEhSRUUuUXVhdGVybmlvbjtcblxuICAvKipcbiAgICogVGhlIGludmVyc2Ugb2YgdGhlIHJlc3QgcXVhdGVybmlvbiBvZiB0aGUge0BsaW5rIHNvdXJjZX0uXG4gICAqL1xuICBwcml2YXRlIF9pbnZTcmNSZXN0UXVhdDogVEhSRUUuUXVhdGVybmlvbjtcblxuICBwdWJsaWMgZ2V0IGRlcGVuZGVuY2llcygpOiBTZXQ8VEhSRUUuT2JqZWN0M0Q+IHtcbiAgICByZXR1cm4gbmV3IFNldChbdGhpcy5zb3VyY2VdKTtcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogVEhSRUUuT2JqZWN0M0QsIHNvdXJjZTogVEhSRUUuT2JqZWN0M0QpIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbiwgc291cmNlKTtcblxuICAgIHRoaXMuX2RzdFJlc3RRdWF0ID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbiAgICB0aGlzLl9pbnZTcmNSZXN0UXVhdCA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG4gIH1cblxuICBwdWJsaWMgc2V0SW5pdFN0YXRlKCk6IHZvaWQge1xuICAgIHRoaXMuX2RzdFJlc3RRdWF0LmNvcHkodGhpcy5kZXN0aW5hdGlvbi5xdWF0ZXJuaW9uKTtcbiAgICBxdWF0SW52ZXJ0Q29tcGF0KHRoaXMuX2ludlNyY1Jlc3RRdWF0LmNvcHkodGhpcy5zb3VyY2UucXVhdGVybmlvbikpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICAvLyBjYWxjdWxhdGUgdGhlIGRlbHRhIHJvdGF0aW9uIGZyb20gdGhlIHJlc3QgYWJvdXQgdGhlIHNvdXJjZVxuICAgIGNvbnN0IHNyY0RlbHRhUXVhdCA9IF9xdWF0QS5jb3B5KHRoaXMuX2ludlNyY1Jlc3RRdWF0KS5tdWx0aXBseSh0aGlzLnNvdXJjZS5xdWF0ZXJuaW9uKTtcblxuICAgIC8vIG11bHRpcGx5IHRoZSBkZWx0YSB0byB0aGUgcmVzdCBvZiB0aGUgZGVzdGluYXRpb25cbiAgICBjb25zdCB0YXJnZXRRdWF0ID0gX3F1YXRCLmNvcHkodGhpcy5fZHN0UmVzdFF1YXQpLm11bHRpcGx5KHNyY0RlbHRhUXVhdCk7XG5cbiAgICAvLyBibGVuZCB3aXRoIHRoZSByZXN0IHF1YXRlcm5pb24gdXNpbmcgd2VpZ2h0XG4gICAgdGhpcy5kZXN0aW5hdGlvbi5xdWF0ZXJuaW9uLmNvcHkodGhpcy5fZHN0UmVzdFF1YXQpLnNsZXJwKHRhcmdldFF1YXQsIHRoaXMud2VpZ2h0KTtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IHF1YXRJbnZlcnRDb21wYXQgfSBmcm9tICcuL3V0aWxzL3F1YXRJbnZlcnRDb21wYXQnO1xuaW1wb3J0IHsgVlJNTm9kZUNvbnN0cmFpbnQgfSBmcm9tICcuL1ZSTU5vZGVDb25zdHJhaW50JztcblxuY29uc3QgX3YzQSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfcXVhdEEgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuY29uc3QgX3F1YXRCID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblxuLyoqXG4gKiBBIGNvbnN0cmFpbnQgdGhhdCB0cmFuc2ZlcnMgYSByb3RhdGlvbiBhcm91bmQgb25lIGF4aXMgb2YgYSBzb3VyY2UuXG4gKlxuICogU2VlOiBodHRwczovL2dpdGh1Yi5jb20vdnJtLWMvdnJtLXNwZWNpZmljYXRpb24vdHJlZS9tYXN0ZXIvc3BlY2lmaWNhdGlvbi9WUk1DX25vZGVfY29uc3RyYWludC0xLjBfYmV0YSNyb2xsLWNvbnN0cmFpbnRcbiAqL1xuZXhwb3J0IGNsYXNzIFZSTVJvbGxDb25zdHJhaW50IGV4dGVuZHMgVlJNTm9kZUNvbnN0cmFpbnQge1xuICAvKipcbiAgICogVGhlIHJvbGwgYXhpcyBvZiB0aGUgY29uc3RyYWludC5cbiAgICovXG4gIHB1YmxpYyBnZXQgcm9sbEF4aXMoKTogJ1gnIHwgJ1knIHwgJ1onIHtcbiAgICByZXR1cm4gdGhpcy5fcm9sbEF4aXM7XG4gIH1cblxuICAvKipcbiAgICogVGhlIHJvbGwgYXhpcyBvZiB0aGUgY29uc3RyYWludC5cbiAgICovXG4gIHB1YmxpYyBzZXQgcm9sbEF4aXMocm9sbEF4aXM6ICdYJyB8ICdZJyB8ICdaJykge1xuICAgIHRoaXMuX3JvbGxBeGlzID0gcm9sbEF4aXM7XG4gICAgdGhpcy5fdjNSb2xsQXhpcy5zZXQocm9sbEF4aXMgPT09ICdYJyA/IDEuMCA6IDAuMCwgcm9sbEF4aXMgPT09ICdZJyA/IDEuMCA6IDAuMCwgcm9sbEF4aXMgPT09ICdaJyA/IDEuMCA6IDAuMCk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIHJvbGwgYXhpcyBvZiB0aGUgY29uc3RyYWludC5cbiAgICovXG4gIHByaXZhdGUgX3JvbGxBeGlzOiAnWCcgfCAnWScgfCAnWic7XG5cbiAgLyoqXG4gICAqIFRoZSB7QGxpbmsgX3JvbGxBeGlzfSBidXQgaW4gYW4gYWN0dWFsIFZlY3RvcjMgZm9ybS5cbiAgICovXG4gIHByaXZhdGUgX3YzUm9sbEF4aXM6IFRIUkVFLlZlY3RvcjM7XG5cbiAgLyoqXG4gICAqIFRoZSByZXN0IHF1YXRlcm5pb24gb2YgdGhlIHtAbGluayBkZXN0aW5hdGlvbn0uXG4gICAqL1xuICBwcml2YXRlIF9kc3RSZXN0UXVhdDogVEhSRUUuUXVhdGVybmlvbjtcblxuICAvKipcbiAgICogVGhlIGludmVyc2Ugb2YgdGhlIHJlc3QgcXVhdGVybmlvbiBvZiB0aGUge0BsaW5rIGRlc3RpbmF0aW9ufS5cbiAgICovXG4gIHByaXZhdGUgX2ludkRzdFJlc3RRdWF0OiBUSFJFRS5RdWF0ZXJuaW9uO1xuXG4gIC8qKlxuICAgKiBgc3JjUmVzdFF1YXQuaW52ZXJ0KCkgKiBkc3RSZXN0UXVhdGAuXG4gICAqL1xuICBwcml2YXRlIF9pbnZTcmNSZXN0UXVhdE11bERzdFJlc3RRdWF0OiBUSFJFRS5RdWF0ZXJuaW9uO1xuXG4gIHB1YmxpYyBnZXQgZGVwZW5kZW5jaWVzKCk6IFNldDxUSFJFRS5PYmplY3QzRD4ge1xuICAgIHJldHVybiBuZXcgU2V0KFt0aGlzLnNvdXJjZV0pO1xuICB9XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBUSFJFRS5PYmplY3QzRCwgc291cmNlOiBUSFJFRS5PYmplY3QzRCkge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uLCBzb3VyY2UpO1xuXG4gICAgdGhpcy5fcm9sbEF4aXMgPSAnWCc7XG4gICAgdGhpcy5fdjNSb2xsQXhpcyA9IG5ldyBUSFJFRS5WZWN0b3IzKDEsIDAsIDApO1xuXG4gICAgdGhpcy5fZHN0UmVzdFF1YXQgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuICAgIHRoaXMuX2ludkRzdFJlc3RRdWF0ID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbiAgICB0aGlzLl9pbnZTcmNSZXN0UXVhdE11bERzdFJlc3RRdWF0ID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRJbml0U3RhdGUoKTogdm9pZCB7XG4gICAgdGhpcy5fZHN0UmVzdFF1YXQuY29weSh0aGlzLmRlc3RpbmF0aW9uLnF1YXRlcm5pb24pO1xuICAgIHF1YXRJbnZlcnRDb21wYXQodGhpcy5faW52RHN0UmVzdFF1YXQuY29weSh0aGlzLl9kc3RSZXN0UXVhdCkpO1xuICAgIHF1YXRJbnZlcnRDb21wYXQodGhpcy5faW52U3JjUmVzdFF1YXRNdWxEc3RSZXN0UXVhdC5jb3B5KHRoaXMuc291cmNlLnF1YXRlcm5pb24pKS5tdWx0aXBseSh0aGlzLl9kc3RSZXN0UXVhdCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIC8vIGNhbGN1bGF0ZSB0aGUgZGVsdGEgcm90YXRpb24gZnJvbSB0aGUgcmVzdCBhYm91dCB0aGUgc291cmNlLCB0aGVuIGNvbnZlcnQgdG8gdGhlIGRlc3RpbmF0aW9uIGxvY2FsIGNvb3JkXG4gICAgLyoqXG4gICAgICogV2hhdCB0aGUgcXVhdERlbHRhIGlzIGludGVuZGVkIHRvIGJlOlxuICAgICAqXG4gICAgICogYGBgdHNcbiAgICAgKiBjb25zdCBxdWF0U3JjRGVsdGEgPSBfcXVhdEFcbiAgICAgKiAgIC5jb3B5KCB0aGlzLl9pbnZTcmNSZXN0UXVhdCApXG4gICAgICogICAubXVsdGlwbHkoIHRoaXMuc291cmNlLnF1YXRlcm5pb24gKTtcbiAgICAgKiBjb25zdCBxdWF0U3JjRGVsdGFJblBhcmVudCA9IF9xdWF0QlxuICAgICAqICAgLmNvcHkoIHRoaXMuX3NyY1Jlc3RRdWF0IClcbiAgICAgKiAgIC5tdWx0aXBseSggcXVhdFNyY0RlbHRhIClcbiAgICAgKiAgIC5tdWx0aXBseSggdGhpcy5faW52U3JjUmVzdFF1YXQgKTtcbiAgICAgKiBjb25zdCBxdWF0U3JjRGVsdGFJbkRzdCA9IF9xdWF0QVxuICAgICAqICAgLmNvcHkoIHRoaXMuX2ludkRzdFJlc3RRdWF0IClcbiAgICAgKiAgIC5tdWx0aXBseSggcXVhdFNyY0RlbHRhSW5QYXJlbnQgKVxuICAgICAqICAgLm11bHRpcGx5KCB0aGlzLl9kc3RSZXN0UXVhdCApO1xuICAgICAqIGBgYFxuICAgICAqL1xuICAgIGNvbnN0IHF1YXREZWx0YSA9IF9xdWF0QVxuICAgICAgLmNvcHkodGhpcy5faW52RHN0UmVzdFF1YXQpXG4gICAgICAubXVsdGlwbHkodGhpcy5zb3VyY2UucXVhdGVybmlvbilcbiAgICAgIC5tdWx0aXBseSh0aGlzLl9pbnZTcmNSZXN0UXVhdE11bERzdFJlc3RRdWF0KTtcblxuICAgIC8vIGNyZWF0ZSBhIGZyb20tdG8gcXVhdGVybmlvblxuICAgIGNvbnN0IG4xID0gX3YzQS5jb3B5KHRoaXMuX3YzUm9sbEF4aXMpLmFwcGx5UXVhdGVybmlvbihxdWF0RGVsdGEpO1xuXG4gICAgLyoqXG4gICAgICogV2hhdCB0aGUgcXVhdEZyb21UbyBpcyBpbnRlbmRlZCB0byBiZTpcbiAgICAgKlxuICAgICAqIGBgYHRzXG4gICAgICogY29uc3QgcXVhdEZyb21UbyA9IF9xdWF0Qi5zZXRGcm9tVW5pdFZlY3RvcnMoIHRoaXMuX3YzUm9sbEF4aXMsIG4xICkuaW52ZXJzZSgpO1xuICAgICAqIGBgYFxuICAgICAqL1xuICAgIGNvbnN0IHF1YXRGcm9tVG8gPSBfcXVhdEIuc2V0RnJvbVVuaXRWZWN0b3JzKG4xLCB0aGlzLl92M1JvbGxBeGlzKTtcblxuICAgIC8vIHF1YXRGcm9tVG8gKiBxdWF0RGVsdGEgPT0gcm9sbCBleHRyYWN0ZWQgZnJvbSBxdWF0RGVsdGFcbiAgICBjb25zdCB0YXJnZXRRdWF0ID0gcXVhdEZyb21Uby5wcmVtdWx0aXBseSh0aGlzLl9kc3RSZXN0UXVhdCkubXVsdGlwbHkocXVhdERlbHRhKTtcblxuICAgIC8vIGJsZW5kIHdpdGggdGhlIHJlc3QgcXVhdGVybmlvbiB1c2luZyB3ZWlnaHRcbiAgICB0aGlzLmRlc3RpbmF0aW9uLnF1YXRlcm5pb24uY29weSh0aGlzLl9kc3RSZXN0UXVhdCkuc2xlcnAodGFyZ2V0UXVhdCwgdGhpcy53ZWlnaHQpO1xuICB9XG59XG4iLCAiaW1wb3J0IHR5cGUgKiBhcyBDb25zdHJhaW50U2NoZW1hIGZyb20gJ0BwaXhpdi90eXBlcy12cm1jLW5vZGUtY29uc3RyYWludC0xLjAnO1xuaW1wb3J0IHR5cGUgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgdHlwZSB7IEdMVEYsIEdMVEZMb2FkZXJQbHVnaW4sIEdMVEZQYXJzZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyLmpzJztcbmltcG9ydCB7IFZSTU5vZGVDb25zdHJhaW50SGVscGVyIH0gZnJvbSAnLi9oZWxwZXJzJztcbmltcG9ydCB0eXBlIHsgVlJNTm9kZUNvbnN0cmFpbnRMb2FkZXJQbHVnaW5PcHRpb25zIH0gZnJvbSAnLi9WUk1Ob2RlQ29uc3RyYWludExvYWRlclBsdWdpbk9wdGlvbnMnO1xuaW1wb3J0IHsgVlJNTm9kZUNvbnN0cmFpbnRNYW5hZ2VyIH0gZnJvbSAnLi9WUk1Ob2RlQ29uc3RyYWludE1hbmFnZXInO1xuaW1wb3J0IHsgVlJNUm90YXRpb25Db25zdHJhaW50IH0gZnJvbSAnLi9WUk1Sb3RhdGlvbkNvbnN0cmFpbnQnO1xuaW1wb3J0IHsgR0xURiBhcyBHTFRGU2NoZW1hIH0gZnJvbSAnQGdsdGYtdHJhbnNmb3JtL2NvcmUnO1xuaW1wb3J0IHsgVlJNQWltQ29uc3RyYWludCB9IGZyb20gJy4vVlJNQWltQ29uc3RyYWludCc7XG5pbXBvcnQgeyBWUk1Sb2xsQ29uc3RyYWludCB9IGZyb20gJy4vVlJNUm9sbENvbnN0cmFpbnQnO1xuXG4vKipcbiAqIFBvc3NpYmxlIHNwZWMgdmVyc2lvbnMgaXQgcmVjb2duaXplcy5cbiAqL1xuY29uc3QgUE9TU0lCTEVfU1BFQ19WRVJTSU9OUyA9IG5ldyBTZXQoWycxLjAnLCAnMS4wLWJldGEnXSk7XG5cbmV4cG9ydCBjbGFzcyBWUk1Ob2RlQ29uc3RyYWludExvYWRlclBsdWdpbiBpbXBsZW1lbnRzIEdMVEZMb2FkZXJQbHVnaW4ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEVYVEVOU0lPTl9OQU1FID0gJ1ZSTUNfbm9kZV9jb25zdHJhaW50JztcblxuICAvKipcbiAgICogU3BlY2lmeSBhbiBPYmplY3QzRCB0byBhZGQge0BsaW5rIFZSTU5vZGVDb25zdHJhaW50SGVscGVyfSBzLlxuICAgKiBJZiBub3Qgc3BlY2lmaWVkLCBoZWxwZXIgd2lsbCBub3QgYmUgY3JlYXRlZC5cbiAgICogSWYgYHJlbmRlck9yZGVyYCBpcyBzZXQgdG8gdGhlIHJvb3QsIGhlbHBlcnMgd2lsbCBjb3B5IHRoZSBzYW1lIGByZW5kZXJPcmRlcmAgLlxuICAgKi9cbiAgcHVibGljIGhlbHBlclJvb3Q/OiBUSFJFRS5PYmplY3QzRDtcblxuICBwdWJsaWMgcmVhZG9ubHkgcGFyc2VyOiBHTFRGUGFyc2VyO1xuXG4gIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBWUk1Ob2RlQ29uc3RyYWludExvYWRlclBsdWdpbi5FWFRFTlNJT05fTkFNRTtcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJzZXI6IEdMVEZQYXJzZXIsIG9wdGlvbnM/OiBWUk1Ob2RlQ29uc3RyYWludExvYWRlclBsdWdpbk9wdGlvbnMpIHtcbiAgICB0aGlzLnBhcnNlciA9IHBhcnNlcjtcblxuICAgIHRoaXMuaGVscGVyUm9vdCA9IG9wdGlvbnM/LmhlbHBlclJvb3Q7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgYWZ0ZXJSb290KGdsdGY6IEdMVEYpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBnbHRmLnVzZXJEYXRhLnZybU5vZGVDb25zdHJhaW50TWFuYWdlciA9IGF3YWl0IHRoaXMuX2ltcG9ydChnbHRmKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbXBvcnQgY29uc3RyYWludHMgZnJvbSBhIEdMVEYgYW5kIHJldHVybnMgYSB7QGxpbmsgVlJNTm9kZUNvbnN0cmFpbnRNYW5hZ2VyfS5cbiAgICogSXQgbWlnaHQgcmV0dXJuIGBudWxsYCBpbnN0ZWFkIHdoZW4gaXQgZG9lcyBub3QgbmVlZCB0byBiZSBjcmVhdGVkIG9yIHNvbWV0aGluZyBnbyB3cm9uZy5cbiAgICpcbiAgICogQHBhcmFtIGdsdGYgQSBwYXJzZWQgcmVzdWx0IG9mIEdMVEYgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gICAqL1xuICBwcm90ZWN0ZWQgYXN5bmMgX2ltcG9ydChnbHRmOiBHTFRGKTogUHJvbWlzZTxWUk1Ob2RlQ29uc3RyYWludE1hbmFnZXIgfCBudWxsPiB7XG4gICAgY29uc3QganNvbiA9IHRoaXMucGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAgIC8vIGVhcmx5IGFib3J0IGlmIGl0IGRvZXNuJ3QgdXNlIGNvbnN0cmFpbnRzXG4gICAgY29uc3QgaXNDb25zdHJhaW50c1VzZWQgPSBqc29uLmV4dGVuc2lvbnNVc2VkPy5pbmRleE9mKFZSTU5vZGVDb25zdHJhaW50TG9hZGVyUGx1Z2luLkVYVEVOU0lPTl9OQU1FKSAhPT0gLTE7XG4gICAgaWYgKCFpc0NvbnN0cmFpbnRzVXNlZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgbWFuYWdlciA9IG5ldyBWUk1Ob2RlQ29uc3RyYWludE1hbmFnZXIoKTtcbiAgICBjb25zdCB0aHJlZU5vZGVzOiBUSFJFRS5PYmplY3QzRFtdID0gYXdhaXQgdGhpcy5wYXJzZXIuZ2V0RGVwZW5kZW5jaWVzKCdub2RlJyk7XG5cbiAgICAvLyBpbXBvcnQgY29uc3RyYWludHMgZm9yIGVhY2ggbm9kZXNcbiAgICB0aHJlZU5vZGVzLmZvckVhY2goKG5vZGUsIG5vZGVJbmRleCkgPT4ge1xuICAgICAgY29uc3Qgc2NoZW1hTm9kZSA9IGpzb24ubm9kZXMhW25vZGVJbmRleF07XG5cbiAgICAgIC8vIGNoZWNrIGlmIHRoZSBleHRlbnNpb24gdXNlcyB0aGUgZXh0ZW5zaW9uXG4gICAgICBjb25zdCBleHRlbnNpb24gPSBzY2hlbWFOb2RlPy5leHRlbnNpb25zPy5bVlJNTm9kZUNvbnN0cmFpbnRMb2FkZXJQbHVnaW4uRVhURU5TSU9OX05BTUVdIGFzXG4gICAgICAgIHwgQ29uc3RyYWludFNjaGVtYS5WUk1DTm9kZUNvbnN0cmFpbnRcbiAgICAgICAgfCB1bmRlZmluZWQ7XG5cbiAgICAgIGlmIChleHRlbnNpb24gPT0gbnVsbCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNwZWNWZXJzaW9uID0gZXh0ZW5zaW9uLnNwZWNWZXJzaW9uO1xuICAgICAgaWYgKCFQT1NTSUJMRV9TUEVDX1ZFUlNJT05TLmhhcyhzcGVjVmVyc2lvbikpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIGBWUk1Ob2RlQ29uc3RyYWludExvYWRlclBsdWdpbjogVW5rbm93biAke1ZSTU5vZGVDb25zdHJhaW50TG9hZGVyUGx1Z2luLkVYVEVOU0lPTl9OQU1FfSBzcGVjVmVyc2lvbiBcIiR7c3BlY1ZlcnNpb259XCJgLFxuICAgICAgICApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNvbnN0cmFpbnREZWYgPSBleHRlbnNpb24uY29uc3RyYWludDtcblxuICAgICAgLy8gaW1wb3J0IGNvbnN0cmFpbnRzXG4gICAgICBpZiAoY29uc3RyYWludERlZi5yb2xsICE9IG51bGwpIHtcbiAgICAgICAgY29uc3QgY29uc3RyYWludCA9IHRoaXMuX2ltcG9ydFJvbGxDb25zdHJhaW50KG5vZGUsIHRocmVlTm9kZXMsIGNvbnN0cmFpbnREZWYucm9sbCk7XG4gICAgICAgIG1hbmFnZXIuYWRkQ29uc3RyYWludChjb25zdHJhaW50KTtcbiAgICAgIH0gZWxzZSBpZiAoY29uc3RyYWludERlZi5haW0gIT0gbnVsbCkge1xuICAgICAgICBjb25zdCBjb25zdHJhaW50ID0gdGhpcy5faW1wb3J0QWltQ29uc3RyYWludChub2RlLCB0aHJlZU5vZGVzLCBjb25zdHJhaW50RGVmLmFpbSk7XG4gICAgICAgIG1hbmFnZXIuYWRkQ29uc3RyYWludChjb25zdHJhaW50KTtcbiAgICAgIH0gZWxzZSBpZiAoY29uc3RyYWludERlZi5yb3RhdGlvbiAhPSBudWxsKSB7XG4gICAgICAgIGNvbnN0IGNvbnN0cmFpbnQgPSB0aGlzLl9pbXBvcnRSb3RhdGlvbkNvbnN0cmFpbnQobm9kZSwgdGhyZWVOb2RlcywgY29uc3RyYWludERlZi5yb3RhdGlvbik7XG4gICAgICAgIG1hbmFnZXIuYWRkQ29uc3RyYWludChjb25zdHJhaW50KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIGluaXQgY29uc3RyYWludHNcbiAgICBnbHRmLnNjZW5lLnVwZGF0ZU1hdHJpeFdvcmxkKCk7XG4gICAgbWFuYWdlci5zZXRJbml0U3RhdGUoKTtcblxuICAgIHJldHVybiBtYW5hZ2VyO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9pbXBvcnRSb2xsQ29uc3RyYWludChcbiAgICBkZXN0aW5hdGlvbjogVEhSRUUuT2JqZWN0M0QsXG4gICAgbm9kZXM6IFRIUkVFLk9iamVjdDNEW10sXG4gICAgcm9sbENvbnN0cmFpbnREZWY6IENvbnN0cmFpbnRTY2hlbWEuUm9sbENvbnN0cmFpbnQsXG4gICk6IFZSTVJvbGxDb25zdHJhaW50IHtcbiAgICBjb25zdCB7IHNvdXJjZTogc291cmNlSW5kZXgsIHJvbGxBeGlzLCB3ZWlnaHQgfSA9IHJvbGxDb25zdHJhaW50RGVmO1xuICAgIGNvbnN0IHNvdXJjZSA9IG5vZGVzW3NvdXJjZUluZGV4XTtcbiAgICBjb25zdCBjb25zdHJhaW50ID0gbmV3IFZSTVJvbGxDb25zdHJhaW50KGRlc3RpbmF0aW9uLCBzb3VyY2UpO1xuXG4gICAgaWYgKHJvbGxBeGlzICE9IG51bGwpIHtcbiAgICAgIGNvbnN0cmFpbnQucm9sbEF4aXMgPSByb2xsQXhpcztcbiAgICB9XG4gICAgaWYgKHdlaWdodCAhPSBudWxsKSB7XG4gICAgICBjb25zdHJhaW50LndlaWdodCA9IHdlaWdodDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5oZWxwZXJSb290KSB7XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgVlJNTm9kZUNvbnN0cmFpbnRIZWxwZXIoY29uc3RyYWludCk7XG4gICAgICB0aGlzLmhlbHBlclJvb3QuYWRkKGhlbHBlcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbnN0cmFpbnQ7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2ltcG9ydEFpbUNvbnN0cmFpbnQoXG4gICAgZGVzdGluYXRpb246IFRIUkVFLk9iamVjdDNELFxuICAgIG5vZGVzOiBUSFJFRS5PYmplY3QzRFtdLFxuICAgIGFpbUNvbnN0cmFpbnREZWY6IENvbnN0cmFpbnRTY2hlbWEuQWltQ29uc3RyYWludCxcbiAgKTogVlJNQWltQ29uc3RyYWludCB7XG4gICAgY29uc3QgeyBzb3VyY2U6IHNvdXJjZUluZGV4LCBhaW1BeGlzLCB3ZWlnaHQgfSA9IGFpbUNvbnN0cmFpbnREZWY7XG4gICAgY29uc3Qgc291cmNlID0gbm9kZXNbc291cmNlSW5kZXhdO1xuICAgIGNvbnN0IGNvbnN0cmFpbnQgPSBuZXcgVlJNQWltQ29uc3RyYWludChkZXN0aW5hdGlvbiwgc291cmNlKTtcblxuICAgIGlmIChhaW1BeGlzICE9IG51bGwpIHtcbiAgICAgIGNvbnN0cmFpbnQuYWltQXhpcyA9IGFpbUF4aXM7XG4gICAgfVxuICAgIGlmICh3ZWlnaHQgIT0gbnVsbCkge1xuICAgICAgY29uc3RyYWludC53ZWlnaHQgPSB3ZWlnaHQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaGVscGVyUm9vdCkge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IFZSTU5vZGVDb25zdHJhaW50SGVscGVyKGNvbnN0cmFpbnQpO1xuICAgICAgdGhpcy5oZWxwZXJSb290LmFkZChoZWxwZXIpO1xuICAgIH1cblxuICAgIHJldHVybiBjb25zdHJhaW50O1xuICB9XG5cbiAgcHJvdGVjdGVkIF9pbXBvcnRSb3RhdGlvbkNvbnN0cmFpbnQoXG4gICAgZGVzdGluYXRpb246IFRIUkVFLk9iamVjdDNELFxuICAgIG5vZGVzOiBUSFJFRS5PYmplY3QzRFtdLFxuICAgIHJvdGF0aW9uQ29uc3RyYWludERlZjogQ29uc3RyYWludFNjaGVtYS5Sb3RhdGlvbkNvbnN0cmFpbnQsXG4gICk6IFZSTVJvdGF0aW9uQ29uc3RyYWludCB7XG4gICAgY29uc3QgeyBzb3VyY2U6IHNvdXJjZUluZGV4LCB3ZWlnaHQgfSA9IHJvdGF0aW9uQ29uc3RyYWludERlZjtcbiAgICBjb25zdCBzb3VyY2UgPSBub2Rlc1tzb3VyY2VJbmRleF07XG4gICAgY29uc3QgY29uc3RyYWludCA9IG5ldyBWUk1Sb3RhdGlvbkNvbnN0cmFpbnQoZGVzdGluYXRpb24sIHNvdXJjZSk7XG5cbiAgICBpZiAod2VpZ2h0ICE9IG51bGwpIHtcbiAgICAgIGNvbnN0cmFpbnQud2VpZ2h0ID0gd2VpZ2h0O1xuICAgIH1cblxuICAgIGlmICh0aGlzLmhlbHBlclJvb3QpIHtcbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBWUk1Ob2RlQ29uc3RyYWludEhlbHBlcihjb25zdHJhaW50KTtcbiAgICAgIHRoaXMuaGVscGVyUm9vdC5hZGQoaGVscGVyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29uc3RyYWludDtcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7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QUFNO0FBQUEsSUFDNUI7QUFFQSxXQUFPO0FBQUEsRUFDVDtBQUFBLEVBRVUsMEJBQ1IsYUFDQSxPQUNBLHVCQUN1QjtBQUN2QixVQUFNLEVBQUUsUUFBUSxhQUFhLE9BQU8sSUFBSTtBQUN4QyxVQUFNLFNBQVMsTUFBTSxXQUFXO0FBQ2hDLFVBQU0sYUFBYSxJQUFJLHNCQUFzQixhQUFhLE1BQU07QUFFaEUsUUFBSSxVQUFVLE1BQU07QUFDbEIsaUJBQVcsU0FBUztBQUFBLElBQ3RCO0FBRUEsUUFBSSxLQUFLLFlBQVk7QUFDbkIsWUFBTSxTQUFTLElBQUksd0JBQXdCLFVBQVU7QUFDckQsV0FBSyxXQUFXLElBQUksTUFBTTtBQUFBLElBQzVCO0FBRUEsV0FBTztBQUFBLEVBQ1Q7QUFDRjtBQTNKYSwrQkFDWSxpQkFBaUI7QUFEbkMsSUFBTSxnQ0FBTjsiLAogICJuYW1lcyI6IFsiVEhSRUUiLCAiVEhSRUUiLCAiX3YzQSIsICJfdjNBIiwgIl92M0IiLCAiY29uc3RyYWludCIsICJUSFJFRSIsICJfcXVhdEEiLCAiX3F1YXRCIiwgIlRIUkVFIiwgIl92M0EiLCAiX3F1YXRBIiwgIl9xdWF0QiIsICJfYSJdCn0K
