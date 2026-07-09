/*!
 * @pixiv/three-vrm v3.5.5
 * VRM file loader for three.js.
 *
 * Copyright (c) 2019-2026 pixiv Inc.
 * @pixiv/three-vrm is distributed under MIT License
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
  MToonMaterial: () => MToonMaterial,
  MToonMaterialDebugMode: () => MToonMaterialDebugMode,
  MToonMaterialLoaderPlugin: () => MToonMaterialLoaderPlugin,
  MToonMaterialOutlineWidthMode: () => MToonMaterialOutlineWidthMode,
  VRM: () => VRM,
  VRMAimConstraint: () => VRMAimConstraint,
  VRMCore: () => VRMCore,
  VRMCoreLoaderPlugin: () => VRMCoreLoaderPlugin,
  VRMExpression: () => VRMExpression,
  VRMExpressionLoaderPlugin: () => VRMExpressionLoaderPlugin,
  VRMExpressionManager: () => VRMExpressionManager,
  VRMExpressionMaterialColorBind: () => VRMExpressionMaterialColorBind,
  VRMExpressionMaterialColorType: () => VRMExpressionMaterialColorType,
  VRMExpressionMorphTargetBind: () => VRMExpressionMorphTargetBind,
  VRMExpressionOverrideType: () => VRMExpressionOverrideType,
  VRMExpressionPresetName: () => VRMExpressionPresetName,
  VRMExpressionTextureTransformBind: () => VRMExpressionTextureTransformBind,
  VRMFirstPerson: () => VRMFirstPerson,
  VRMFirstPersonLoaderPlugin: () => VRMFirstPersonLoaderPlugin,
  VRMFirstPersonMeshAnnotationType: () => VRMFirstPersonMeshAnnotationType,
  VRMHumanBoneList: () => VRMHumanBoneList,
  VRMHumanBoneName: () => VRMHumanBoneName,
  VRMHumanBoneParentMap: () => VRMHumanBoneParentMap,
  VRMHumanoid: () => VRMHumanoid,
  VRMHumanoidHelper: () => VRMHumanoidHelper,
  VRMHumanoidLoaderPlugin: () => VRMHumanoidLoaderPlugin,
  VRMLoaderPlugin: () => VRMLoaderPlugin,
  VRMLookAt: () => VRMLookAt,
  VRMLookAtBoneApplier: () => VRMLookAtBoneApplier,
  VRMLookAtExpressionApplier: () => VRMLookAtExpressionApplier,
  VRMLookAtHelper: () => VRMLookAtHelper,
  VRMLookAtLoaderPlugin: () => VRMLookAtLoaderPlugin,
  VRMLookAtRangeMap: () => VRMLookAtRangeMap,
  VRMLookAtTypeName: () => VRMLookAtTypeName,
  VRMMetaLoaderPlugin: () => VRMMetaLoaderPlugin,
  VRMNodeConstraint: () => VRMNodeConstraint,
  VRMNodeConstraintHelper: () => VRMNodeConstraintHelper,
  VRMNodeConstraintLoaderPlugin: () => VRMNodeConstraintLoaderPlugin,
  VRMNodeConstraintManager: () => VRMNodeConstraintManager,
  VRMRequiredHumanBoneName: () => VRMRequiredHumanBoneName,
  VRMRollConstraint: () => VRMRollConstraint,
  VRMRotationConstraint: () => VRMRotationConstraint,
  VRMSpringBoneCollider: () => VRMSpringBoneCollider,
  VRMSpringBoneColliderHelper: () => VRMSpringBoneColliderHelper,
  VRMSpringBoneColliderShape: () => VRMSpringBoneColliderShape,
  VRMSpringBoneColliderShapeCapsule: () => VRMSpringBoneColliderShapeCapsule,
  VRMSpringBoneColliderShapePlane: () => VRMSpringBoneColliderShapePlane,
  VRMSpringBoneColliderShapeSphere: () => VRMSpringBoneColliderShapeSphere,
  VRMSpringBoneJoint: () => VRMSpringBoneJoint,
  VRMSpringBoneJointHelper: () => VRMSpringBoneJointHelper,
  VRMSpringBoneLoaderPlugin: () => VRMSpringBoneLoaderPlugin,
  VRMSpringBoneManager: () => VRMSpringBoneManager,
  VRMUtils: () => VRMUtils
});
module.exports = __toCommonJS(src_exports);

// ../three-vrm-core/lib/three-vrm-core.module.js
var THREE = __toESM(require("three"), 1);
var THREE4 = __toESM(require("three"), 1);
var THREE2 = __toESM(require("three"), 1);
var THREE3 = __toESM(require("three"), 1);
var THREE5 = __toESM(require("three"), 1);
var THREE6 = __toESM(require("three"), 1);
var THREE7 = __toESM(require("three"), 1);
var THREE8 = __toESM(require("three"), 1);
var THREE11 = __toESM(require("three"), 1);
var THREE9 = __toESM(require("three"), 1);
var THREE10 = __toESM(require("three"), 1);
var THREE13 = __toESM(require("three"), 1);
var THREE12 = __toESM(require("three"), 1);
var THREE14 = __toESM(require("three"), 1);
var THREE15 = __toESM(require("three"), 1);
var THREE16 = __toESM(require("three"), 1);
var __async2 = (__this, __arguments, generator) => {
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
var VRMExpression = class extends THREE.Object3D {
  constructor(expressionName) {
    super();
    this.weight = 0;
    this.isBinary = false;
    this.overrideBlink = "none";
    this.overrideLookAt = "none";
    this.overrideMouth = "none";
    this._binds = [];
    this.name = `VRMExpression_${expressionName}`;
    this.expressionName = expressionName;
    this.type = "VRMExpression";
    this.visible = false;
  }
  /**
   * Binds that this expression influences.
   */
  get binds() {
    return this._binds;
  }
  /**
   * A value represents how much it should override blink expressions.
   * `0.0` == no override at all, `1.0` == completely block the expressions.
   */
  get overrideBlinkAmount() {
    if (this.overrideBlink === "block") {
      return 0 < this.outputWeight ? 1 : 0;
    } else if (this.overrideBlink === "blend") {
      return this.outputWeight;
    } else {
      return 0;
    }
  }
  /**
   * A value represents how much it should override lookAt expressions.
   * `0.0` == no override at all, `1.0` == completely block the expressions.
   */
  get overrideLookAtAmount() {
    if (this.overrideLookAt === "block") {
      return 0 < this.outputWeight ? 1 : 0;
    } else if (this.overrideLookAt === "blend") {
      return this.outputWeight;
    } else {
      return 0;
    }
  }
  /**
   * A value represents how much it should override mouth expressions.
   * `0.0` == no override at all, `1.0` == completely block the expressions.
   */
  get overrideMouthAmount() {
    if (this.overrideMouth === "block") {
      return 0 < this.outputWeight ? 1 : 0;
    } else if (this.overrideMouth === "blend") {
      return this.outputWeight;
    } else {
      return 0;
    }
  }
  /**
   * An output weight of this expression, considering the {@link isBinary}.
   */
  get outputWeight() {
    if (this.isBinary) {
      return this.weight > 0.5 ? 1 : 0;
    }
    return this.weight;
  }
  /**
   * Add an expression bind to the expression.
   *
   * @param bind A bind to add
   */
  addBind(bind) {
    this._binds.push(bind);
  }
  /**
   * Delete an expression bind from the expression.
   *
   * @param bind A bind to delete
   */
  deleteBind(bind) {
    const index = this._binds.indexOf(bind);
    if (index >= 0) {
      this._binds.splice(index, 1);
    }
  }
  /**
   * Apply weight to every assigned blend shapes.
   * Should be called every frame.
   */
  applyWeight(options) {
    var _a;
    let actualWeight = this.outputWeight;
    actualWeight *= (_a = options == null ? void 0 : options.multiplier) != null ? _a : 1;
    if (this.isBinary && actualWeight < 1) {
      actualWeight = 0;
    }
    this._binds.forEach((bind) => bind.applyWeight(actualWeight));
  }
  /**
   * Clear previously assigned blend shapes.
   */
  clearAppliedWeight() {
    this._binds.forEach((bind) => bind.clearAppliedWeight());
  }
};
function extractPrimitivesInternal(gltf, nodeIndex, node) {
  var _a, _b;
  const json = gltf.parser.json;
  const schemaNode = (_a = json.nodes) == null ? void 0 : _a[nodeIndex];
  if (schemaNode == null) {
    console.warn(`extractPrimitivesInternal: Attempt to use nodes[${nodeIndex}] of glTF but the node doesn't exist`);
    return null;
  }
  const meshIndex = schemaNode.mesh;
  if (meshIndex == null) {
    return null;
  }
  const schemaMesh = (_b = json.meshes) == null ? void 0 : _b[meshIndex];
  if (schemaMesh == null) {
    console.warn(`extractPrimitivesInternal: Attempt to use meshes[${meshIndex}] of glTF but the mesh doesn't exist`);
    return null;
  }
  const primitiveCount = schemaMesh.primitives.length;
  const primitives = [];
  node.traverse((object) => {
    if (primitives.length < primitiveCount) {
      if (object.isMesh) {
        primitives.push(object);
      }
    }
  });
  return primitives;
}
function gltfExtractPrimitivesFromNode(gltf, nodeIndex) {
  return __async2(this, null, function* () {
    const node = yield gltf.parser.getDependency("node", nodeIndex);
    return extractPrimitivesInternal(gltf, nodeIndex, node);
  });
}
function gltfExtractPrimitivesFromNodes(gltf) {
  return __async2(this, null, function* () {
    const nodes = yield gltf.parser.getDependencies("node");
    const map = /* @__PURE__ */ new Map();
    nodes.forEach((node, index) => {
      const result = extractPrimitivesInternal(gltf, index, node);
      if (result != null) {
        map.set(index, result);
      }
    });
    return map;
  });
}
var VRMExpressionPresetName = {
  Aa: "aa",
  Ih: "ih",
  Ou: "ou",
  Ee: "ee",
  Oh: "oh",
  Blink: "blink",
  Happy: "happy",
  Angry: "angry",
  Sad: "sad",
  Relaxed: "relaxed",
  LookUp: "lookUp",
  Surprised: "surprised",
  LookDown: "lookDown",
  LookLeft: "lookLeft",
  LookRight: "lookRight",
  BlinkLeft: "blinkLeft",
  BlinkRight: "blinkRight",
  Neutral: "neutral"
};
function saturate(value) {
  return Math.max(Math.min(value, 1), 0);
}
var VRMExpressionManager = class _VRMExpressionManager {
  /**
   * Create a new {@link VRMExpressionManager}.
   */
  constructor() {
    this.blinkExpressionNames = ["blink", "blinkLeft", "blinkRight"];
    this.lookAtExpressionNames = ["lookLeft", "lookRight", "lookUp", "lookDown"];
    this.mouthExpressionNames = ["aa", "ee", "ih", "oh", "ou"];
    this._expressions = [];
    this._expressionMap = {};
  }
  get expressions() {
    return this._expressions.concat();
  }
  get expressionMap() {
    return Object.assign({}, this._expressionMap);
  }
  /**
   * A map from name to expression, but excluding custom expressions.
   */
  get presetExpressionMap() {
    const result = {};
    const presetNameSet = new Set(Object.values(VRMExpressionPresetName));
    Object.entries(this._expressionMap).forEach(([name, expression]) => {
      if (presetNameSet.has(name)) {
        result[name] = expression;
      }
    });
    return result;
  }
  /**
   * A map from name to expression, but excluding preset expressions.
   */
  get customExpressionMap() {
    const result = {};
    const presetNameSet = new Set(Object.values(VRMExpressionPresetName));
    Object.entries(this._expressionMap).forEach(([name, expression]) => {
      if (!presetNameSet.has(name)) {
        result[name] = expression;
      }
    });
    return result;
  }
  /**
   * Copy the given {@link VRMExpressionManager} into this one.
   * @param source The {@link VRMExpressionManager} you want to copy
   * @returns this
   */
  copy(source) {
    const expressions = this._expressions.concat();
    expressions.forEach((expression) => {
      this.unregisterExpression(expression);
    });
    source._expressions.forEach((expression) => {
      this.registerExpression(expression);
    });
    this.blinkExpressionNames = source.blinkExpressionNames.concat();
    this.lookAtExpressionNames = source.lookAtExpressionNames.concat();
    this.mouthExpressionNames = source.mouthExpressionNames.concat();
    return this;
  }
  /**
   * Returns a clone of this {@link VRMExpressionManager}.
   * @returns Copied {@link VRMExpressionManager}
   */
  clone() {
    return new _VRMExpressionManager().copy(this);
  }
  /**
   * Return a registered expression.
   * If it cannot find an expression, it will return `null` instead.
   *
   * @param name Name or preset name of the expression
   */
  getExpression(name) {
    var _a;
    return (_a = this._expressionMap[name]) != null ? _a : null;
  }
  /**
   * Register an expression.
   *
   * @param expression {@link VRMExpression} that describes the expression
   */
  registerExpression(expression) {
    this._expressions.push(expression);
    this._expressionMap[expression.expressionName] = expression;
  }
  /**
   * Unregister an expression.
   *
   * @param expression The expression you want to unregister
   */
  unregisterExpression(expression) {
    const index = this._expressions.indexOf(expression);
    if (index === -1) {
      console.warn("VRMExpressionManager: The specified expressions is not registered");
    }
    this._expressions.splice(index, 1);
    delete this._expressionMap[expression.expressionName];
  }
  /**
   * Get the current weight of the specified expression.
   * If it doesn't have an expression of given name, it will return `null` instead.
   *
   * @param name Name of the expression
   */
  getValue(name) {
    var _a;
    const expression = this.getExpression(name);
    return (_a = expression == null ? void 0 : expression.weight) != null ? _a : null;
  }
  /**
   * Set a weight to the specified expression.
   *
   * @param name Name of the expression
   * @param weight Weight
   */
  setValue(name, weight) {
    const expression = this.getExpression(name);
    if (expression) {
      expression.weight = saturate(weight);
    }
  }
  /**
   * Reset weights of all expressions to `0.0`.
   */
  resetValues() {
    this._expressions.forEach((expression) => {
      expression.weight = 0;
    });
  }
  /**
   * Get a track name of specified expression.
   * This track name is needed to manipulate its expression via keyframe animations.
   *
   * @example Manipulate an expression using keyframe animation
   * ```js
   * const trackName = vrm.expressionManager.getExpressionTrackName( 'blink' );
   * const track = new THREE.NumberKeyframeTrack(
   *   name,
   *   [ 0.0, 0.5, 1.0 ], // times
   *   [ 0.0, 1.0, 0.0 ] // values
   * );
   *
   * const clip = new THREE.AnimationClip(
   *   'blink', // name
   *   1.0, // duration
   *   [ track ] // tracks
   * );
   *
   * const mixer = new THREE.AnimationMixer( vrm.scene );
   * const action = mixer.clipAction( clip );
   * action.play();
   * ```
   *
   * @param name Name of the expression
   */
  getExpressionTrackName(name) {
    const expression = this.getExpression(name);
    return expression ? `${expression.name}.weight` : null;
  }
  /**
   * Update every expressions.
   */
  update() {
    const weightMultipliers = this._calculateWeightMultipliers();
    this._expressions.forEach((expression) => {
      expression.clearAppliedWeight();
    });
    this._expressions.forEach((expression) => {
      let multiplier = 1;
      const name = expression.expressionName;
      if (this.blinkExpressionNames.indexOf(name) !== -1) {
        multiplier *= weightMultipliers.blink;
      }
      if (this.lookAtExpressionNames.indexOf(name) !== -1) {
        multiplier *= weightMultipliers.lookAt;
      }
      if (this.mouthExpressionNames.indexOf(name) !== -1) {
        multiplier *= weightMultipliers.mouth;
      }
      expression.applyWeight({ multiplier });
    });
  }
  /**
   * Calculate sum of override amounts to see how much we should multiply weights of certain expressions.
   */
  _calculateWeightMultipliers() {
    let blink = 1;
    let lookAt = 1;
    let mouth = 1;
    this._expressions.forEach((expression) => {
      blink -= expression.overrideBlinkAmount;
      lookAt -= expression.overrideLookAtAmount;
      mouth -= expression.overrideMouthAmount;
    });
    blink = Math.max(0, blink);
    lookAt = Math.max(0, lookAt);
    mouth = Math.max(0, mouth);
    return { blink, lookAt, mouth };
  }
};
var VRMExpressionMaterialColorType = {
  Color: "color",
  EmissionColor: "emissionColor",
  ShadeColor: "shadeColor",
  MatcapColor: "matcapColor",
  RimColor: "rimColor",
  OutlineColor: "outlineColor"
};
var v0ExpressionMaterialColorMap = {
  _Color: VRMExpressionMaterialColorType.Color,
  _EmissionColor: VRMExpressionMaterialColorType.EmissionColor,
  _ShadeColor: VRMExpressionMaterialColorType.ShadeColor,
  _RimColor: VRMExpressionMaterialColorType.RimColor,
  _OutlineColor: VRMExpressionMaterialColorType.OutlineColor
};
var _color = new THREE2.Color();
var _VRMExpressionMaterialColorBind = class _VRMExpressionMaterialColorBind2 {
  constructor({
    material,
    type,
    targetValue,
    targetAlpha
  }) {
    this.material = material;
    this.type = type;
    this.targetValue = targetValue;
    this.targetAlpha = targetAlpha != null ? targetAlpha : 1;
    const color = this._initColorBindState();
    const alpha = this._initAlphaBindState();
    this._state = { color, alpha };
  }
  applyWeight(weight) {
    const { color, alpha } = this._state;
    if (color != null) {
      const { propertyName, deltaValue } = color;
      const target = this.material[propertyName];
      if (target != void 0) {
        target.add(_color.copy(deltaValue).multiplyScalar(weight));
      }
    }
    if (alpha != null) {
      const { propertyName, deltaValue } = alpha;
      const target = this.material[propertyName];
      if (target != void 0) {
        this.material[propertyName] += deltaValue * weight;
      }
    }
  }
  clearAppliedWeight() {
    const { color, alpha } = this._state;
    if (color != null) {
      const { propertyName, initialValue } = color;
      const target = this.material[propertyName];
      if (target != void 0) {
        target.copy(initialValue);
      }
    }
    if (alpha != null) {
      const { propertyName, initialValue } = alpha;
      const target = this.material[propertyName];
      if (target != void 0) {
        this.material[propertyName] = initialValue;
      }
    }
  }
  _initColorBindState() {
    var _a, _b, _c;
    const { material, type, targetValue } = this;
    const propertyNameMap = this._getPropertyNameMap();
    const propertyName = (_b = (_a = propertyNameMap == null ? void 0 : propertyNameMap[type]) == null ? void 0 : _a[0]) != null ? _b : null;
    if (propertyName == null) {
      console.warn(
        `Tried to add a material color bind to the material ${(_c = material.name) != null ? _c : "(no name)"}, the type ${type} but the material or the type is not supported.`
      );
      return null;
    }
    const target = material[propertyName];
    const initialValue = target.clone();
    const deltaValue = new THREE2.Color(
      targetValue.r - initialValue.r,
      targetValue.g - initialValue.g,
      targetValue.b - initialValue.b
    );
    return { propertyName, initialValue, deltaValue };
  }
  _initAlphaBindState() {
    var _a, _b, _c;
    const { material, type, targetAlpha } = this;
    const propertyNameMap = this._getPropertyNameMap();
    const propertyName = (_b = (_a = propertyNameMap == null ? void 0 : propertyNameMap[type]) == null ? void 0 : _a[1]) != null ? _b : null;
    if (propertyName == null && targetAlpha !== 1) {
      console.warn(
        `Tried to add a material alpha bind to the material ${(_c = material.name) != null ? _c : "(no name)"}, the type ${type} but the material or the type does not support alpha.`
      );
      return null;
    }
    if (propertyName == null) {
      return null;
    }
    const initialValue = material[propertyName];
    const deltaValue = targetAlpha - initialValue;
    return { propertyName, initialValue, deltaValue };
  }
  _getPropertyNameMap() {
    var _a, _b;
    return (_b = (_a = Object.entries(_VRMExpressionMaterialColorBind2._propertyNameMapMap).find(([distinguisher]) => {
      return this.material[distinguisher] === true;
    })) == null ? void 0 : _a[1]) != null ? _b : null;
  }
};
_VRMExpressionMaterialColorBind._propertyNameMapMap = {
  isMeshStandardMaterial: {
    color: ["color", "opacity"],
    emissionColor: ["emissive", null]
  },
  isMeshBasicMaterial: {
    color: ["color", "opacity"]
  },
  isMToonMaterial: {
    color: ["color", "opacity"],
    emissionColor: ["emissive", null],
    outlineColor: ["outlineColorFactor", null],
    matcapColor: ["matcapFactor", null],
    rimColor: ["parametricRimColorFactor", null],
    shadeColor: ["shadeColorFactor", null]
  }
};
var VRMExpressionMaterialColorBind = _VRMExpressionMaterialColorBind;
var VRMExpressionMorphTargetBind = class {
  constructor({
    primitives,
    index,
    weight
  }) {
    this.primitives = primitives;
    this.index = index;
    this.weight = weight;
  }
  applyWeight(weight) {
    this.primitives.forEach((mesh) => {
      var _a;
      if (((_a = mesh.morphTargetInfluences) == null ? void 0 : _a[this.index]) != null) {
        mesh.morphTargetInfluences[this.index] += this.weight * weight;
      }
    });
  }
  clearAppliedWeight() {
    this.primitives.forEach((mesh) => {
      var _a;
      if (((_a = mesh.morphTargetInfluences) == null ? void 0 : _a[this.index]) != null) {
        mesh.morphTargetInfluences[this.index] = 0;
      }
    });
  }
};
var _v2 = new THREE3.Vector2();
var _VRMExpressionTextureTransformBind = class _VRMExpressionTextureTransformBind2 {
  constructor({
    material,
    scale,
    offset
  }) {
    var _a, _b;
    this.material = material;
    this.scale = scale;
    this.offset = offset;
    const propertyNames = (_a = Object.entries(_VRMExpressionTextureTransformBind2._propertyNamesMap).find(
      ([distinguisher]) => {
        return material[distinguisher] === true;
      }
    )) == null ? void 0 : _a[1];
    if (propertyNames == null) {
      console.warn(
        `Tried to add a texture transform bind to the material ${(_b = material.name) != null ? _b : "(no name)"} but the material is not supported.`
      );
      this._properties = [];
    } else {
      this._properties = [];
      propertyNames.forEach((propertyName) => {
        var _a2;
        const texture = (_a2 = material[propertyName]) == null ? void 0 : _a2.clone();
        if (!texture) {
          return null;
        }
        material[propertyName] = texture;
        const initialOffset = texture.offset.clone();
        const initialScale = texture.repeat.clone();
        const deltaOffset = offset.clone().sub(initialOffset);
        const deltaScale = scale.clone().sub(initialScale);
        this._properties.push({
          name: propertyName,
          initialOffset,
          deltaOffset,
          initialScale,
          deltaScale
        });
      });
    }
  }
  applyWeight(weight) {
    this._properties.forEach((property) => {
      const target = this.material[property.name];
      if (target === void 0) {
        return;
      }
      target.offset.add(_v2.copy(property.deltaOffset).multiplyScalar(weight));
      target.repeat.add(_v2.copy(property.deltaScale).multiplyScalar(weight));
    });
  }
  clearAppliedWeight() {
    this._properties.forEach((property) => {
      const target = this.material[property.name];
      if (target === void 0) {
        return;
      }
      target.offset.copy(property.initialOffset);
      target.repeat.copy(property.initialScale);
    });
  }
};
_VRMExpressionTextureTransformBind._propertyNamesMap = {
  isMeshStandardMaterial: [
    "map",
    "emissiveMap",
    "bumpMap",
    "normalMap",
    "displacementMap",
    "roughnessMap",
    "metalnessMap",
    "alphaMap"
  ],
  isMeshBasicMaterial: ["map", "specularMap", "alphaMap"],
  isMToonMaterial: [
    "map",
    "normalMap",
    "emissiveMap",
    "shadeMultiplyTexture",
    "rimMultiplyTexture",
    "outlineWidthMultiplyTexture",
    "uvAnimationMaskTexture"
  ]
};
var VRMExpressionTextureTransformBind = _VRMExpressionTextureTransformBind;
var POSSIBLE_SPEC_VERSIONS = /* @__PURE__ */ new Set(["1.0", "1.0-beta"]);
var _VRMExpressionLoaderPlugin = class _VRMExpressionLoaderPlugin2 {
  get name() {
    return "VRMExpressionLoaderPlugin";
  }
  constructor(parser) {
    this.parser = parser;
  }
  afterRoot(gltf) {
    return __async2(this, null, function* () {
      gltf.userData.vrmExpressionManager = yield this._import(gltf);
    });
  }
  /**
   * Import a {@link VRMExpressionManager} from a VRM.
   *
   * @param gltf A parsed result of GLTF taken from GLTFLoader
   */
  _import(gltf) {
    return __async2(this, null, function* () {
      const v1Result = yield this._v1Import(gltf);
      if (v1Result) {
        return v1Result;
      }
      const v0Result = yield this._v0Import(gltf);
      if (v0Result) {
        return v0Result;
      }
      return null;
    });
  }
  _v1Import(gltf) {
    return __async2(this, null, function* () {
      var _a, _b;
      const json = this.parser.json;
      const isVRMUsed = ((_a = json.extensionsUsed) == null ? void 0 : _a.indexOf("VRMC_vrm")) !== -1;
      if (!isVRMUsed) {
        return null;
      }
      const extension = (_b = json.extensions) == null ? void 0 : _b["VRMC_vrm"];
      if (!extension) {
        return null;
      }
      const specVersion = extension.specVersion;
      if (!POSSIBLE_SPEC_VERSIONS.has(specVersion)) {
        console.warn(`VRMExpressionLoaderPlugin: Unknown VRMC_vrm specVersion "${specVersion}"`);
        return null;
      }
      const schemaExpressions = extension.expressions;
      if (!schemaExpressions) {
        return null;
      }
      const presetNameSet = new Set(Object.values(VRMExpressionPresetName));
      const nameSchemaExpressionMap = /* @__PURE__ */ new Map();
      if (schemaExpressions.preset != null) {
        Object.entries(schemaExpressions.preset).forEach(([name, schemaExpression]) => {
          if (schemaExpression == null) {
            return;
          }
          if (!presetNameSet.has(name)) {
            console.warn(`VRMExpressionLoaderPlugin: Unknown preset name "${name}" detected. Ignoring the expression`);
            return;
          }
          nameSchemaExpressionMap.set(name, schemaExpression);
        });
      }
      if (schemaExpressions.custom != null) {
        Object.entries(schemaExpressions.custom).forEach(([name, schemaExpression]) => {
          if (presetNameSet.has(name)) {
            console.warn(
              `VRMExpressionLoaderPlugin: Custom expression cannot have preset name "${name}". Ignoring the expression`
            );
            return;
          }
          nameSchemaExpressionMap.set(name, schemaExpression);
        });
      }
      const manager = new VRMExpressionManager();
      yield Promise.all(
        Array.from(nameSchemaExpressionMap.entries()).map((_0) => __async2(this, [_0], function* ([name, schemaExpression]) {
          var _a2, _b2, _c, _d, _e, _f, _g;
          const expression = new VRMExpression(name);
          gltf.scene.add(expression);
          expression.isBinary = (_a2 = schemaExpression.isBinary) != null ? _a2 : false;
          expression.overrideBlink = (_b2 = schemaExpression.overrideBlink) != null ? _b2 : "none";
          expression.overrideLookAt = (_c = schemaExpression.overrideLookAt) != null ? _c : "none";
          expression.overrideMouth = (_d = schemaExpression.overrideMouth) != null ? _d : "none";
          (_e = schemaExpression.morphTargetBinds) == null ? void 0 : _e.forEach((bind) => __async2(this, null, function* () {
            var _a3;
            if (bind.node === void 0 || bind.index === void 0) {
              return;
            }
            const primitives = yield gltfExtractPrimitivesFromNode(gltf, bind.node);
            const morphTargetIndex = bind.index;
            if (!primitives.every(
              (primitive) => Array.isArray(primitive.morphTargetInfluences) && morphTargetIndex < primitive.morphTargetInfluences.length
            )) {
              console.warn(
                `VRMExpressionLoaderPlugin: ${schemaExpression.name} attempts to index morph #${morphTargetIndex} but not found.`
              );
              return;
            }
            expression.addBind(
              new VRMExpressionMorphTargetBind({
                primitives,
                index: morphTargetIndex,
                weight: (_a3 = bind.weight) != null ? _a3 : 1
              })
            );
          }));
          if (schemaExpression.materialColorBinds || schemaExpression.textureTransformBinds) {
            const gltfMaterials = [];
            gltf.scene.traverse((object) => {
              const material = object.material;
              if (material) {
                if (Array.isArray(material)) {
                  gltfMaterials.push(...material);
                } else {
                  gltfMaterials.push(material);
                }
              }
            });
            (_f = schemaExpression.materialColorBinds) == null ? void 0 : _f.forEach((bind) => __async2(this, null, function* () {
              const materials = gltfMaterials.filter((material) => {
                var _a3;
                const materialIndex = (_a3 = this.parser.associations.get(material)) == null ? void 0 : _a3.materials;
                return bind.material === materialIndex;
              });
              materials.forEach((material) => {
                expression.addBind(
                  new VRMExpressionMaterialColorBind({
                    material,
                    type: bind.type,
                    targetValue: new THREE4.Color().fromArray(bind.targetValue),
                    targetAlpha: bind.targetValue[3]
                  })
                );
              });
            }));
            (_g = schemaExpression.textureTransformBinds) == null ? void 0 : _g.forEach((bind) => __async2(this, null, function* () {
              const materials = gltfMaterials.filter((material) => {
                var _a3;
                const materialIndex = (_a3 = this.parser.associations.get(material)) == null ? void 0 : _a3.materials;
                return bind.material === materialIndex;
              });
              materials.forEach((material) => {
                var _a3, _b3;
                expression.addBind(
                  new VRMExpressionTextureTransformBind({
                    material,
                    offset: new THREE4.Vector2().fromArray((_a3 = bind.offset) != null ? _a3 : [0, 0]),
                    scale: new THREE4.Vector2().fromArray((_b3 = bind.scale) != null ? _b3 : [1, 1])
                  })
                );
              });
            }));
          }
          manager.registerExpression(expression);
        }))
      );
      return manager;
    });
  }
  _v0Import(gltf) {
    return __async2(this, null, function* () {
      var _a;
      const json = this.parser.json;
      const vrmExt = (_a = json.extensions) == null ? void 0 : _a.VRM;
      if (!vrmExt) {
        return null;
      }
      const schemaBlendShape = vrmExt.blendShapeMaster;
      if (!schemaBlendShape) {
        return null;
      }
      const manager = new VRMExpressionManager();
      const schemaBlendShapeGroups = schemaBlendShape.blendShapeGroups;
      if (!schemaBlendShapeGroups) {
        return manager;
      }
      const blendShapeNameSet = /* @__PURE__ */ new Set();
      yield Promise.all(
        schemaBlendShapeGroups.map((schemaGroup) => __async2(this, null, function* () {
          var _a2;
          const v0PresetName = schemaGroup.presetName;
          const v1PresetName = v0PresetName != null && _VRMExpressionLoaderPlugin2.v0v1PresetNameMap[v0PresetName] || null;
          const name = v1PresetName != null ? v1PresetName : schemaGroup.name;
          if (name == null) {
            console.warn("VRMExpressionLoaderPlugin: One of custom expressions has no name. Ignoring the expression");
            return;
          }
          if (blendShapeNameSet.has(name)) {
            console.warn(
              `VRMExpressionLoaderPlugin: An expression preset ${v0PresetName} has duplicated entries. Ignoring the expression`
            );
            return;
          }
          blendShapeNameSet.add(name);
          const expression = new VRMExpression(name);
          gltf.scene.add(expression);
          expression.isBinary = (_a2 = schemaGroup.isBinary) != null ? _a2 : false;
          if (schemaGroup.binds) {
            schemaGroup.binds.forEach((bind) => __async2(this, null, function* () {
              var _a3;
              if (bind.mesh === void 0 || bind.index === void 0) {
                return;
              }
              const nodesUsingMesh = [];
              (_a3 = json.nodes) == null ? void 0 : _a3.forEach((node, i) => {
                if (node.mesh === bind.mesh) {
                  nodesUsingMesh.push(i);
                }
              });
              if (nodesUsingMesh.length === 0) {
                console.warn(
                  `VRMExpressionLoaderPlugin: ${schemaGroup.name} attempts to bind a morph target to the mesh #${bind.mesh} but the mesh is not found or not used in the scene. Ignoring the bind.`
                );
                return;
              }
              const morphTargetIndex = bind.index;
              yield Promise.all(
                nodesUsingMesh.map((nodeIndex) => __async2(this, null, function* () {
                  var _a4;
                  const primitives = yield gltfExtractPrimitivesFromNode(gltf, nodeIndex);
                  if (!primitives.every(
                    (primitive) => Array.isArray(primitive.morphTargetInfluences) && morphTargetIndex < primitive.morphTargetInfluences.length
                  )) {
                    console.warn(
                      `VRMExpressionLoaderPlugin: ${schemaGroup.name} attempts to index ${morphTargetIndex}th morph but not found.`
                    );
                    return;
                  }
                  expression.addBind(
                    new VRMExpressionMorphTargetBind({
                      primitives,
                      index: morphTargetIndex,
                      weight: 0.01 * ((_a4 = bind.weight) != null ? _a4 : 100)
                      // narrowing the range from [ 0.0 - 100.0 ] to [ 0.0 - 1.0 ]
                    })
                  );
                }))
              );
            }));
          }
          const materialValues = schemaGroup.materialValues;
          if (materialValues && materialValues.length !== 0) {
            materialValues.forEach((materialValue) => {
              if (materialValue.materialName === void 0 || materialValue.propertyName === void 0 || materialValue.targetValue === void 0) {
                return;
              }
              const materials = [];
              gltf.scene.traverse((object) => {
                if (object.material) {
                  const material = object.material;
                  if (Array.isArray(material)) {
                    materials.push(
                      ...material.filter(
                        (mtl) => (mtl.name === materialValue.materialName || mtl.name === materialValue.materialName + " (Outline)") && materials.indexOf(mtl) === -1
                      )
                    );
                  } else if (material.name === materialValue.materialName && materials.indexOf(material) === -1) {
                    materials.push(material);
                  }
                }
              });
              const materialPropertyName = materialValue.propertyName;
              materials.forEach((material) => {
                if (materialPropertyName === "_MainTex_ST") {
                  const scale = new THREE4.Vector2(materialValue.targetValue[0], materialValue.targetValue[1]);
                  const offset = new THREE4.Vector2(materialValue.targetValue[2], materialValue.targetValue[3]);
                  offset.y = 1 - offset.y - scale.y;
                  expression.addBind(
                    new VRMExpressionTextureTransformBind({
                      material,
                      scale,
                      offset
                    })
                  );
                  return;
                }
                const materialColorType = v0ExpressionMaterialColorMap[materialPropertyName];
                if (materialColorType) {
                  expression.addBind(
                    new VRMExpressionMaterialColorBind({
                      material,
                      type: materialColorType,
                      targetValue: new THREE4.Color().fromArray(materialValue.targetValue),
                      targetAlpha: materialValue.targetValue[3]
                    })
                  );
                  return;
                }
                console.warn(materialPropertyName + " is not supported");
              });
            });
          }
          manager.registerExpression(expression);
        }))
      );
      return manager;
    });
  }
};
_VRMExpressionLoaderPlugin.v0v1PresetNameMap = {
  a: "aa",
  e: "ee",
  i: "ih",
  o: "oh",
  u: "ou",
  blink: "blink",
  joy: "happy",
  angry: "angry",
  sorrow: "sad",
  fun: "relaxed",
  lookup: "lookUp",
  lookdown: "lookDown",
  lookleft: "lookLeft",
  lookright: "lookRight",
  // eslint-disable-next-line @typescript-eslint/naming-convention
  blink_l: "blinkLeft",
  // eslint-disable-next-line @typescript-eslint/naming-convention
  blink_r: "blinkRight",
  neutral: "neutral"
};
var VRMExpressionLoaderPlugin = _VRMExpressionLoaderPlugin;
var VRMExpressionOverrideType = {
  None: "none",
  Block: "block",
  Blend: "blend"
};
var _VRMFirstPerson = class _VRMFirstPerson2 {
  /**
   * Create a new VRMFirstPerson object.
   *
   * @param humanoid A {@link VRMHumanoid}
   * @param meshAnnotations A {@link VRMFirstPersonMeshAnnotation}
   */
  constructor(humanoid, meshAnnotations) {
    this._firstPersonOnlyLayer = _VRMFirstPerson2.DEFAULT_FIRSTPERSON_ONLY_LAYER;
    this._thirdPersonOnlyLayer = _VRMFirstPerson2.DEFAULT_THIRDPERSON_ONLY_LAYER;
    this._initializedLayers = false;
    this.humanoid = humanoid;
    this.meshAnnotations = meshAnnotations;
  }
  /**
   * Copy the given {@link VRMFirstPerson} into this one.
   * {@link humanoid} must be same as the source one.
   * @param source The {@link VRMFirstPerson} you want to copy
   * @returns this
   */
  copy(source) {
    if (this.humanoid !== source.humanoid) {
      throw new Error("VRMFirstPerson: humanoid must be same in order to copy");
    }
    this.meshAnnotations = source.meshAnnotations.map((annotation) => ({
      meshes: annotation.meshes.concat(),
      type: annotation.type
    }));
    return this;
  }
  /**
   * Returns a clone of this {@link VRMFirstPerson}.
   * @returns Copied {@link VRMFirstPerson}
   */
  clone() {
    return new _VRMFirstPerson2(this.humanoid, this.meshAnnotations).copy(this);
  }
  /**
   * A camera layer represents `FirstPersonOnly` layer.
   * Note that **you must call {@link setup} first before you use the layer feature** or it does not work properly.
   *
   * The value is {@link DEFAULT_FIRSTPERSON_ONLY_LAYER} by default but you can change the layer by specifying via {@link setup} if you prefer.
   *
   * @see https://vrm.dev/en/univrm/api/univrm_use_firstperson/
   * @see https://threejs.org/docs/#api/en/core/Layers
   */
  get firstPersonOnlyLayer() {
    return this._firstPersonOnlyLayer;
  }
  /**
   * A camera layer represents `ThirdPersonOnly` layer.
   * Note that **you must call {@link setup} first before you use the layer feature** or it does not work properly.
   *
   * The value is {@link DEFAULT_THIRDPERSON_ONLY_LAYER} by default but you can change the layer by specifying via {@link setup} if you prefer.
   *
   * @see https://vrm.dev/en/univrm/api/univrm_use_firstperson/
   * @see https://threejs.org/docs/#api/en/core/Layers
   */
  get thirdPersonOnlyLayer() {
    return this._thirdPersonOnlyLayer;
  }
  /**
   * In this method, it assigns layers for every meshes based on mesh annotations.
   * You must call this method first before you use the layer feature.
   *
   * This is an equivalent of [VRMFirstPerson.Setup](https://github.com/vrm-c/UniVRM/blob/73a5bd8fcddaa2a7a8735099a97e63c9db3e5ea0/Assets/VRM/Runtime/FirstPerson/VRMFirstPerson.cs#L295-L299) of the UniVRM.
   *
   * The `cameraLayer` parameter specifies which layer will be assigned for `FirstPersonOnly` / `ThirdPersonOnly`.
   * In UniVRM, we specified those by naming each desired layer as `FIRSTPERSON_ONLY_LAYER` / `THIRDPERSON_ONLY_LAYER`
   * but we are going to specify these layers at here since we are unable to name layers in Three.js.
   *
   * @param cameraLayer Specify which layer will be for `FirstPersonOnly` / `ThirdPersonOnly`.
   */
  setup({
    firstPersonOnlyLayer = _VRMFirstPerson2.DEFAULT_FIRSTPERSON_ONLY_LAYER,
    thirdPersonOnlyLayer = _VRMFirstPerson2.DEFAULT_THIRDPERSON_ONLY_LAYER
  } = {}) {
    if (this._initializedLayers) {
      return;
    }
    this._firstPersonOnlyLayer = firstPersonOnlyLayer;
    this._thirdPersonOnlyLayer = thirdPersonOnlyLayer;
    this.meshAnnotations.forEach((item) => {
      item.meshes.forEach((mesh) => {
        if (item.type === "firstPersonOnly") {
          mesh.layers.set(this._firstPersonOnlyLayer);
          mesh.traverse((child) => child.layers.set(this._firstPersonOnlyLayer));
        } else if (item.type === "thirdPersonOnly") {
          mesh.layers.set(this._thirdPersonOnlyLayer);
          mesh.traverse((child) => child.layers.set(this._thirdPersonOnlyLayer));
        } else if (item.type === "auto") {
          this._createHeadlessModel(mesh);
        }
      });
    });
    this._initializedLayers = true;
  }
  _excludeTriangles(triangles, bws, skinIndex, exclude) {
    let count = 0;
    if (bws != null && bws.length > 0) {
      for (let i = 0; i < triangles.length; i += 3) {
        const a = triangles[i];
        const b = triangles[i + 1];
        const c = triangles[i + 2];
        const bw0 = bws[a];
        const skin0 = skinIndex[a];
        if (bw0[0] > 0 && exclude.includes(skin0[0])) continue;
        if (bw0[1] > 0 && exclude.includes(skin0[1])) continue;
        if (bw0[2] > 0 && exclude.includes(skin0[2])) continue;
        if (bw0[3] > 0 && exclude.includes(skin0[3])) continue;
        const bw1 = bws[b];
        const skin1 = skinIndex[b];
        if (bw1[0] > 0 && exclude.includes(skin1[0])) continue;
        if (bw1[1] > 0 && exclude.includes(skin1[1])) continue;
        if (bw1[2] > 0 && exclude.includes(skin1[2])) continue;
        if (bw1[3] > 0 && exclude.includes(skin1[3])) continue;
        const bw2 = bws[c];
        const skin2 = skinIndex[c];
        if (bw2[0] > 0 && exclude.includes(skin2[0])) continue;
        if (bw2[1] > 0 && exclude.includes(skin2[1])) continue;
        if (bw2[2] > 0 && exclude.includes(skin2[2])) continue;
        if (bw2[3] > 0 && exclude.includes(skin2[3])) continue;
        triangles[count++] = a;
        triangles[count++] = b;
        triangles[count++] = c;
      }
    }
    return count;
  }
  _createErasedMesh(src, erasingBonesIndex) {
    const dst = new THREE5.SkinnedMesh(src.geometry.clone(), src.material);
    dst.name = `${src.name}(erase)`;
    dst.frustumCulled = src.frustumCulled;
    dst.layers.set(this._firstPersonOnlyLayer);
    const geometry = dst.geometry;
    const skinIndexAttr = geometry.getAttribute("skinIndex");
    const skinIndexAttrArray = skinIndexAttr instanceof THREE5.GLBufferAttribute ? [] : skinIndexAttr.array;
    const skinIndex = [];
    for (let i = 0; i < skinIndexAttrArray.length; i += 4) {
      skinIndex.push([
        skinIndexAttrArray[i],
        skinIndexAttrArray[i + 1],
        skinIndexAttrArray[i + 2],
        skinIndexAttrArray[i + 3]
      ]);
    }
    const skinWeightAttr = geometry.getAttribute("skinWeight");
    const skinWeightAttrArray = skinWeightAttr instanceof THREE5.GLBufferAttribute ? [] : skinWeightAttr.array;
    const skinWeight = [];
    for (let i = 0; i < skinWeightAttrArray.length; i += 4) {
      skinWeight.push([
        skinWeightAttrArray[i],
        skinWeightAttrArray[i + 1],
        skinWeightAttrArray[i + 2],
        skinWeightAttrArray[i + 3]
      ]);
    }
    const index = geometry.getIndex();
    if (!index) {
      throw new Error("The geometry doesn't have an index buffer");
    }
    const oldTriangles = Array.from(index.array);
    const count = this._excludeTriangles(oldTriangles, skinWeight, skinIndex, erasingBonesIndex);
    const newTriangle = [];
    for (let i = 0; i < count; i++) {
      newTriangle[i] = oldTriangles[i];
    }
    geometry.setIndex(newTriangle);
    if (src.onBeforeRender) {
      dst.onBeforeRender = src.onBeforeRender;
    }
    dst.bind(new THREE5.Skeleton(src.skeleton.bones, src.skeleton.boneInverses), new THREE5.Matrix4());
    return dst;
  }
  _createHeadlessModelForSkinnedMesh(parent, mesh) {
    const eraseBoneIndexes = [];
    mesh.skeleton.bones.forEach((bone, index) => {
      if (this._isEraseTarget(bone)) eraseBoneIndexes.push(index);
    });
    if (!eraseBoneIndexes.length) {
      mesh.layers.enable(this._thirdPersonOnlyLayer);
      mesh.layers.enable(this._firstPersonOnlyLayer);
      return;
    }
    mesh.layers.set(this._thirdPersonOnlyLayer);
    const newMesh = this._createErasedMesh(mesh, eraseBoneIndexes);
    parent.add(newMesh);
  }
  _createHeadlessModel(node) {
    if (node.type === "Group") {
      node.layers.set(this._thirdPersonOnlyLayer);
      if (this._isEraseTarget(node)) {
        node.traverse((child) => child.layers.set(this._thirdPersonOnlyLayer));
      } else {
        const parent = new THREE5.Group();
        parent.name = `_headless_${node.name}`;
        parent.layers.set(this._firstPersonOnlyLayer);
        node.parent.add(parent);
        node.children.filter((child) => child.type === "SkinnedMesh").forEach((child) => {
          const skinnedMesh = child;
          this._createHeadlessModelForSkinnedMesh(parent, skinnedMesh);
        });
      }
    } else if (node.type === "SkinnedMesh") {
      const skinnedMesh = node;
      this._createHeadlessModelForSkinnedMesh(node.parent, skinnedMesh);
    } else {
      if (this._isEraseTarget(node)) {
        node.layers.set(this._thirdPersonOnlyLayer);
        node.traverse((child) => child.layers.set(this._thirdPersonOnlyLayer));
      }
    }
  }
  _isEraseTarget(bone) {
    if (bone === this.humanoid.getRawBoneNode("head")) {
      return true;
    } else if (!bone.parent) {
      return false;
    } else {
      return this._isEraseTarget(bone.parent);
    }
  }
};
_VRMFirstPerson.DEFAULT_FIRSTPERSON_ONLY_LAYER = 9;
_VRMFirstPerson.DEFAULT_THIRDPERSON_ONLY_LAYER = 10;
var VRMFirstPerson = _VRMFirstPerson;
var POSSIBLE_SPEC_VERSIONS2 = /* @__PURE__ */ new Set(["1.0", "1.0-beta"]);
var VRMFirstPersonLoaderPlugin = class {
  get name() {
    return "VRMFirstPersonLoaderPlugin";
  }
  constructor(parser) {
    this.parser = parser;
  }
  afterRoot(gltf) {
    return __async2(this, null, function* () {
      const vrmHumanoid = gltf.userData.vrmHumanoid;
      if (vrmHumanoid === null) {
        return;
      } else if (vrmHumanoid === void 0) {
        throw new Error(
          "VRMFirstPersonLoaderPlugin: vrmHumanoid is undefined. VRMHumanoidLoaderPlugin have to be used first"
        );
      }
      gltf.userData.vrmFirstPerson = yield this._import(gltf, vrmHumanoid);
    });
  }
  /**
   * Import a {@link VRMFirstPerson} from a VRM.
   *
   * @param gltf A parsed result of GLTF taken from GLTFLoader
   * @param humanoid A {@link VRMHumanoid} instance that represents the VRM
   */
  _import(gltf, humanoid) {
    return __async2(this, null, function* () {
      if (humanoid == null) {
        return null;
      }
      const v1Result = yield this._v1Import(gltf, humanoid);
      if (v1Result) {
        return v1Result;
      }
      const v0Result = yield this._v0Import(gltf, humanoid);
      if (v0Result) {
        return v0Result;
      }
      return null;
    });
  }
  _v1Import(gltf, humanoid) {
    return __async2(this, null, function* () {
      var _a, _b;
      const json = this.parser.json;
      const isVRMUsed = ((_a = json.extensionsUsed) == null ? void 0 : _a.indexOf("VRMC_vrm")) !== -1;
      if (!isVRMUsed) {
        return null;
      }
      const extension = (_b = json.extensions) == null ? void 0 : _b["VRMC_vrm"];
      if (!extension) {
        return null;
      }
      const specVersion = extension.specVersion;
      if (!POSSIBLE_SPEC_VERSIONS2.has(specVersion)) {
        console.warn(`VRMFirstPersonLoaderPlugin: Unknown VRMC_vrm specVersion "${specVersion}"`);
        return null;
      }
      const schemaFirstPerson = extension.firstPerson;
      const meshAnnotations = [];
      const nodePrimitivesMap = yield gltfExtractPrimitivesFromNodes(gltf);
      Array.from(nodePrimitivesMap.entries()).forEach(([nodeIndex, primitives]) => {
        var _a2, _b2;
        const annotation = (_a2 = schemaFirstPerson == null ? void 0 : schemaFirstPerson.meshAnnotations) == null ? void 0 : _a2.find((a) => a.node === nodeIndex);
        meshAnnotations.push({
          meshes: primitives,
          type: (_b2 = annotation == null ? void 0 : annotation.type) != null ? _b2 : "auto"
        });
      });
      return new VRMFirstPerson(humanoid, meshAnnotations);
    });
  }
  _v0Import(gltf, humanoid) {
    return __async2(this, null, function* () {
      var _a;
      const json = this.parser.json;
      const vrmExt = (_a = json.extensions) == null ? void 0 : _a.VRM;
      if (!vrmExt) {
        return null;
      }
      const schemaFirstPerson = vrmExt.firstPerson;
      if (!schemaFirstPerson) {
        return null;
      }
      const meshAnnotations = [];
      const nodePrimitivesMap = yield gltfExtractPrimitivesFromNodes(gltf);
      Array.from(nodePrimitivesMap.entries()).forEach(([nodeIndex, primitives]) => {
        const schemaNode = json.nodes[nodeIndex];
        const flag = schemaFirstPerson.meshAnnotations ? schemaFirstPerson.meshAnnotations.find((a) => a.mesh === schemaNode.mesh) : void 0;
        meshAnnotations.push({
          meshes: primitives,
          type: this._convertV0FlagToV1Type(flag == null ? void 0 : flag.firstPersonFlag)
        });
      });
      return new VRMFirstPerson(humanoid, meshAnnotations);
    });
  }
  _convertV0FlagToV1Type(flag) {
    if (flag === "FirstPersonOnly") {
      return "firstPersonOnly";
    } else if (flag === "ThirdPersonOnly") {
      return "thirdPersonOnly";
    } else if (flag === "Both") {
      return "both";
    } else {
      return "auto";
    }
  }
};
var VRMFirstPersonMeshAnnotationType = {
  Auto: "auto",
  Both: "both",
  ThirdPersonOnly: "thirdPersonOnly",
  FirstPersonOnly: "firstPersonOnly"
};
var _v3A = new THREE6.Vector3();
var _v3B = new THREE6.Vector3();
var _quatA = new THREE6.Quaternion();
var VRMHumanoidHelper = class extends THREE6.Group {
  constructor(humanoid) {
    super();
    this.vrmHumanoid = humanoid;
    this._boneAxesMap = /* @__PURE__ */ new Map();
    Object.values(humanoid.humanBones).forEach((bone) => {
      const helper = new THREE6.AxesHelper(1);
      helper.matrixAutoUpdate = false;
      helper.material.depthTest = false;
      helper.material.depthWrite = false;
      this.add(helper);
      this._boneAxesMap.set(bone, helper);
    });
  }
  dispose() {
    Array.from(this._boneAxesMap.values()).forEach((axes) => {
      axes.geometry.dispose();
      axes.material.dispose();
    });
  }
  updateMatrixWorld(force) {
    Array.from(this._boneAxesMap.entries()).forEach(([bone, axes]) => {
      bone.node.updateWorldMatrix(true, false);
      bone.node.matrixWorld.decompose(_v3A, _quatA, _v3B);
      const scale = _v3A.set(0.1, 0.1, 0.1).divide(_v3B);
      axes.matrix.copy(bone.node.matrixWorld).scale(scale);
    });
    super.updateMatrixWorld(force);
  }
};
var VRMHumanBoneList = [
  "hips",
  "spine",
  "chest",
  "upperChest",
  "neck",
  "head",
  "leftEye",
  "rightEye",
  "jaw",
  "leftUpperLeg",
  "leftLowerLeg",
  "leftFoot",
  "leftToes",
  "rightUpperLeg",
  "rightLowerLeg",
  "rightFoot",
  "rightToes",
  "leftShoulder",
  "leftUpperArm",
  "leftLowerArm",
  "leftHand",
  "rightShoulder",
  "rightUpperArm",
  "rightLowerArm",
  "rightHand",
  "leftThumbMetacarpal",
  "leftThumbProximal",
  "leftThumbDistal",
  "leftIndexProximal",
  "leftIndexIntermediate",
  "leftIndexDistal",
  "leftMiddleProximal",
  "leftMiddleIntermediate",
  "leftMiddleDistal",
  "leftRingProximal",
  "leftRingIntermediate",
  "leftRingDistal",
  "leftLittleProximal",
  "leftLittleIntermediate",
  "leftLittleDistal",
  "rightThumbMetacarpal",
  "rightThumbProximal",
  "rightThumbDistal",
  "rightIndexProximal",
  "rightIndexIntermediate",
  "rightIndexDistal",
  "rightMiddleProximal",
  "rightMiddleIntermediate",
  "rightMiddleDistal",
  "rightRingProximal",
  "rightRingIntermediate",
  "rightRingDistal",
  "rightLittleProximal",
  "rightLittleIntermediate",
  "rightLittleDistal"
];
var VRMHumanBoneName = {
  Hips: "hips",
  Spine: "spine",
  Chest: "chest",
  UpperChest: "upperChest",
  Neck: "neck",
  Head: "head",
  LeftEye: "leftEye",
  RightEye: "rightEye",
  Jaw: "jaw",
  LeftUpperLeg: "leftUpperLeg",
  LeftLowerLeg: "leftLowerLeg",
  LeftFoot: "leftFoot",
  LeftToes: "leftToes",
  RightUpperLeg: "rightUpperLeg",
  RightLowerLeg: "rightLowerLeg",
  RightFoot: "rightFoot",
  RightToes: "rightToes",
  LeftShoulder: "leftShoulder",
  LeftUpperArm: "leftUpperArm",
  LeftLowerArm: "leftLowerArm",
  LeftHand: "leftHand",
  RightShoulder: "rightShoulder",
  RightUpperArm: "rightUpperArm",
  RightLowerArm: "rightLowerArm",
  RightHand: "rightHand",
  LeftThumbMetacarpal: "leftThumbMetacarpal",
  LeftThumbProximal: "leftThumbProximal",
  LeftThumbDistal: "leftThumbDistal",
  LeftIndexProximal: "leftIndexProximal",
  LeftIndexIntermediate: "leftIndexIntermediate",
  LeftIndexDistal: "leftIndexDistal",
  LeftMiddleProximal: "leftMiddleProximal",
  LeftMiddleIntermediate: "leftMiddleIntermediate",
  LeftMiddleDistal: "leftMiddleDistal",
  LeftRingProximal: "leftRingProximal",
  LeftRingIntermediate: "leftRingIntermediate",
  LeftRingDistal: "leftRingDistal",
  LeftLittleProximal: "leftLittleProximal",
  LeftLittleIntermediate: "leftLittleIntermediate",
  LeftLittleDistal: "leftLittleDistal",
  RightThumbMetacarpal: "rightThumbMetacarpal",
  RightThumbProximal: "rightThumbProximal",
  RightThumbDistal: "rightThumbDistal",
  RightIndexProximal: "rightIndexProximal",
  RightIndexIntermediate: "rightIndexIntermediate",
  RightIndexDistal: "rightIndexDistal",
  RightMiddleProximal: "rightMiddleProximal",
  RightMiddleIntermediate: "rightMiddleIntermediate",
  RightMiddleDistal: "rightMiddleDistal",
  RightRingProximal: "rightRingProximal",
  RightRingIntermediate: "rightRingIntermediate",
  RightRingDistal: "rightRingDistal",
  RightLittleProximal: "rightLittleProximal",
  RightLittleIntermediate: "rightLittleIntermediate",
  RightLittleDistal: "rightLittleDistal"
};
var VRMHumanBoneParentMap = {
  hips: null,
  spine: "hips",
  chest: "spine",
  upperChest: "chest",
  neck: "upperChest",
  head: "neck",
  leftEye: "head",
  rightEye: "head",
  jaw: "head",
  leftUpperLeg: "hips",
  leftLowerLeg: "leftUpperLeg",
  leftFoot: "leftLowerLeg",
  leftToes: "leftFoot",
  rightUpperLeg: "hips",
  rightLowerLeg: "rightUpperLeg",
  rightFoot: "rightLowerLeg",
  rightToes: "rightFoot",
  leftShoulder: "upperChest",
  leftUpperArm: "leftShoulder",
  leftLowerArm: "leftUpperArm",
  leftHand: "leftLowerArm",
  rightShoulder: "upperChest",
  rightUpperArm: "rightShoulder",
  rightLowerArm: "rightUpperArm",
  rightHand: "rightLowerArm",
  leftThumbMetacarpal: "leftHand",
  leftThumbProximal: "leftThumbMetacarpal",
  leftThumbDistal: "leftThumbProximal",
  leftIndexProximal: "leftHand",
  leftIndexIntermediate: "leftIndexProximal",
  leftIndexDistal: "leftIndexIntermediate",
  leftMiddleProximal: "leftHand",
  leftMiddleIntermediate: "leftMiddleProximal",
  leftMiddleDistal: "leftMiddleIntermediate",
  leftRingProximal: "leftHand",
  leftRingIntermediate: "leftRingProximal",
  leftRingDistal: "leftRingIntermediate",
  leftLittleProximal: "leftHand",
  leftLittleIntermediate: "leftLittleProximal",
  leftLittleDistal: "leftLittleIntermediate",
  rightThumbMetacarpal: "rightHand",
  rightThumbProximal: "rightThumbMetacarpal",
  rightThumbDistal: "rightThumbProximal",
  rightIndexProximal: "rightHand",
  rightIndexIntermediate: "rightIndexProximal",
  rightIndexDistal: "rightIndexIntermediate",
  rightMiddleProximal: "rightHand",
  rightMiddleIntermediate: "rightMiddleProximal",
  rightMiddleDistal: "rightMiddleIntermediate",
  rightRingProximal: "rightHand",
  rightRingIntermediate: "rightRingProximal",
  rightRingDistal: "rightRingIntermediate",
  rightLittleProximal: "rightHand",
  rightLittleIntermediate: "rightLittleProximal",
  rightLittleDistal: "rightLittleIntermediate"
};
function quatInvertCompat(target) {
  if (target.invert) {
    target.invert();
  } else {
    target.inverse();
  }
  return target;
}
var _v3A2 = new THREE7.Vector3();
var _quatA2 = new THREE7.Quaternion();
var VRMRig = class {
  /**
   * Create a new {@link VRMHumanoid}.
   * @param humanBones A {@link VRMHumanBones} contains all the bones of the new humanoid
   */
  constructor(humanBones) {
    this.humanBones = humanBones;
    this.restPose = this.getAbsolutePose();
  }
  /**
   * Return the current absolute pose of this humanoid as a {@link VRMPose}.
   * Note that the output result will contain initial state of the VRM and not compatible between different models.
   * You might want to use {@link getPose} instead.
   */
  getAbsolutePose() {
    const pose = {};
    Object.keys(this.humanBones).forEach((vrmBoneNameString) => {
      const vrmBoneName = vrmBoneNameString;
      const node = this.getBoneNode(vrmBoneName);
      if (!node) {
        return;
      }
      _v3A2.copy(node.position);
      _quatA2.copy(node.quaternion);
      pose[vrmBoneName] = {
        position: _v3A2.toArray(),
        rotation: _quatA2.toArray()
      };
    });
    return pose;
  }
  /**
   * Return the current pose of this humanoid as a {@link VRMPose}.
   *
   * Each transform is a local transform relative from rest pose (T-pose).
   */
  getPose() {
    const pose = {};
    Object.keys(this.humanBones).forEach((boneNameString) => {
      const boneName = boneNameString;
      const node = this.getBoneNode(boneName);
      if (!node) {
        return;
      }
      _v3A2.set(0, 0, 0);
      _quatA2.identity();
      const restState = this.restPose[boneName];
      if (restState == null ? void 0 : restState.position) {
        _v3A2.fromArray(restState.position).negate();
      }
      if (restState == null ? void 0 : restState.rotation) {
        quatInvertCompat(_quatA2.fromArray(restState.rotation));
      }
      _v3A2.add(node.position);
      _quatA2.premultiply(node.quaternion);
      pose[boneName] = {
        position: _v3A2.toArray(),
        rotation: _quatA2.toArray()
      };
    });
    return pose;
  }
  /**
   * Let the humanoid do a specified pose.
   *
   * Each transform have to be a local transform relative from rest pose (T-pose).
   * You can pass what you got from {@link getPose}.
   *
   * @param poseObject A {@link VRMPose} that represents a single pose
   */
  setPose(poseObject) {
    Object.entries(poseObject).forEach(([boneNameString, state]) => {
      const boneName = boneNameString;
      const node = this.getBoneNode(boneName);
      if (!node) {
        return;
      }
      const restState = this.restPose[boneName];
      if (!restState) {
        return;
      }
      if (state == null ? void 0 : state.position) {
        node.position.fromArray(state.position);
        if (restState.position) {
          node.position.add(_v3A2.fromArray(restState.position));
        }
      }
      if (state == null ? void 0 : state.rotation) {
        node.quaternion.fromArray(state.rotation);
        if (restState.rotation) {
          node.quaternion.multiply(_quatA2.fromArray(restState.rotation));
        }
      }
    });
  }
  /**
   * Reset the humanoid to its rest pose.
   */
  resetPose() {
    Object.entries(this.restPose).forEach(([boneName, rest]) => {
      const node = this.getBoneNode(boneName);
      if (!node) {
        return;
      }
      if (rest == null ? void 0 : rest.position) {
        node.position.fromArray(rest.position);
      }
      if (rest == null ? void 0 : rest.rotation) {
        node.quaternion.fromArray(rest.rotation);
      }
    });
  }
  /**
   * Return a bone bound to a specified {@link VRMHumanBoneName}, as a {@link VRMHumanBone}.
   *
   * @param name Name of the bone you want
   */
  getBone(name) {
    var _a;
    return (_a = this.humanBones[name]) != null ? _a : void 0;
  }
  /**
   * Return a bone bound to a specified {@link VRMHumanBoneName}, as a `THREE.Object3D`.
   *
   * @param name Name of the bone you want
   */
  getBoneNode(name) {
    var _a, _b;
    return (_b = (_a = this.humanBones[name]) == null ? void 0 : _a.node) != null ? _b : null;
  }
};
var _v3A3 = new THREE8.Vector3();
var _quatA3 = new THREE8.Quaternion();
var _boneWorldPos = new THREE8.Vector3();
var VRMHumanoidRig = class _VRMHumanoidRig extends VRMRig {
  static _setupTransforms(modelRig) {
    const root = new THREE8.Object3D();
    root.name = "VRMHumanoidRig";
    const boneWorldPositions = {};
    const boneWorldRotations = {};
    const boneRotations = {};
    const parentWorldRotations = {};
    VRMHumanBoneList.forEach((boneName) => {
      var _a;
      const boneNode = modelRig.getBoneNode(boneName);
      if (boneNode) {
        const boneWorldPosition = new THREE8.Vector3();
        const boneWorldRotation = new THREE8.Quaternion();
        boneNode.updateWorldMatrix(true, false);
        boneNode.matrixWorld.decompose(boneWorldPosition, boneWorldRotation, _v3A3);
        boneWorldPositions[boneName] = boneWorldPosition;
        boneWorldRotations[boneName] = boneWorldRotation;
        boneRotations[boneName] = boneNode.quaternion.clone();
        const parentWorldRotation = new THREE8.Quaternion();
        (_a = boneNode.parent) == null ? void 0 : _a.matrixWorld.decompose(_v3A3, parentWorldRotation, _v3A3);
        parentWorldRotations[boneName] = parentWorldRotation;
      }
    });
    const rigBones = {};
    VRMHumanBoneList.forEach((boneName) => {
      var _a;
      const boneNode = modelRig.getBoneNode(boneName);
      if (boneNode) {
        const boneWorldPosition = boneWorldPositions[boneName];
        let currentBoneName = boneName;
        let parentBoneWorldPosition;
        while (parentBoneWorldPosition == null) {
          currentBoneName = VRMHumanBoneParentMap[currentBoneName];
          if (currentBoneName == null) {
            break;
          }
          parentBoneWorldPosition = boneWorldPositions[currentBoneName];
        }
        const rigBoneNode = new THREE8.Object3D();
        rigBoneNode.name = "Normalized_" + boneNode.name;
        const parentRigBoneNode = currentBoneName ? (_a = rigBones[currentBoneName]) == null ? void 0 : _a.node : root;
        parentRigBoneNode.add(rigBoneNode);
        rigBoneNode.position.copy(boneWorldPosition);
        if (parentBoneWorldPosition) {
          rigBoneNode.position.sub(parentBoneWorldPosition);
        }
        rigBones[boneName] = { node: rigBoneNode };
      }
    });
    return {
      rigBones,
      root,
      parentWorldRotations,
      boneRotations
    };
  }
  constructor(humanoid) {
    const { rigBones, root, parentWorldRotations, boneRotations } = _VRMHumanoidRig._setupTransforms(humanoid);
    super(rigBones);
    this.original = humanoid;
    this.root = root;
    this._parentWorldRotations = parentWorldRotations;
    this._boneRotations = boneRotations;
  }
  /**
   * Update this humanoid rig.
   */
  update() {
    VRMHumanBoneList.forEach((boneName) => {
      const boneNode = this.original.getBoneNode(boneName);
      if (boneNode != null) {
        const rigBoneNode = this.getBoneNode(boneName);
        const parentWorldRotation = this._parentWorldRotations[boneName];
        const invParentWorldRotation = _quatA3.copy(parentWorldRotation).invert();
        const boneRotation = this._boneRotations[boneName];
        boneNode.quaternion.copy(rigBoneNode.quaternion).multiply(parentWorldRotation).premultiply(invParentWorldRotation).multiply(boneRotation);
        if (boneName === "hips") {
          const boneWorldPosition = rigBoneNode.getWorldPosition(_boneWorldPos);
          boneNode.parent.updateWorldMatrix(true, false);
          const parentWorldMatrix = boneNode.parent.matrixWorld;
          const localPosition = boneWorldPosition.applyMatrix4(parentWorldMatrix.invert());
          boneNode.position.copy(localPosition);
        }
      }
    });
  }
};
var VRMHumanoid = class _VRMHumanoid {
  // TODO: Rename
  /**
   * @deprecated Deprecated. Use either {@link rawRestPose} or {@link normalizedRestPose} instead.
   */
  get restPose() {
    console.warn("VRMHumanoid: restPose is deprecated. Use either rawRestPose or normalizedRestPose instead.");
    return this.rawRestPose;
  }
  /**
   * A {@link VRMPose} of its raw human bones that is its default state.
   * Note that it's not compatible with {@link setRawPose} and {@link getRawPose}, since it contains non-relative values of each local transforms.
   */
  get rawRestPose() {
    return this._rawHumanBones.restPose;
  }
  /**
   * A {@link VRMPose} of its normalized human bones that is its default state.
   * Note that it's not compatible with {@link setNormalizedPose} and {@link getNormalizedPose}, since it contains non-relative values of each local transforms.
   */
  get normalizedRestPose() {
    return this._normalizedHumanBones.restPose;
  }
  /**
   * A map from {@link VRMHumanBoneName} to raw {@link VRMHumanBone}s.
   */
  get humanBones() {
    return this._rawHumanBones.humanBones;
  }
  /**
   * A map from {@link VRMHumanBoneName} to raw {@link VRMHumanBone}s.
   */
  get rawHumanBones() {
    return this._rawHumanBones.humanBones;
  }
  /**
   * A map from {@link VRMHumanBoneName} to normalized {@link VRMHumanBone}s.
   */
  get normalizedHumanBones() {
    return this._normalizedHumanBones.humanBones;
  }
  /**
   * The root of normalized {@link VRMHumanBone}s.
   */
  get normalizedHumanBonesRoot() {
    return this._normalizedHumanBones.root;
  }
  /**
   * Create a new {@link VRMHumanoid}.
   * @param humanBones A {@link VRMHumanBones} contains all the bones of the new humanoid
   * @param autoUpdateHumanBones Whether it copies pose from normalizedHumanBones to rawHumanBones on {@link update}. `true` by default.
   */
  constructor(humanBones, options) {
    var _a;
    this.autoUpdateHumanBones = (_a = options == null ? void 0 : options.autoUpdateHumanBones) != null ? _a : true;
    this._rawHumanBones = new VRMRig(humanBones);
    this._normalizedHumanBones = new VRMHumanoidRig(this._rawHumanBones);
  }
  /**
   * Copy the given {@link VRMHumanoid} into this one.
   * @param source The {@link VRMHumanoid} you want to copy
   * @returns this
   */
  copy(source) {
    this.autoUpdateHumanBones = source.autoUpdateHumanBones;
    this._rawHumanBones = new VRMRig(source.humanBones);
    this._normalizedHumanBones = new VRMHumanoidRig(this._rawHumanBones);
    return this;
  }
  /**
   * Returns a clone of this {@link VRMHumanoid}.
   * @returns Copied {@link VRMHumanoid}
   */
  clone() {
    return new _VRMHumanoid(this.humanBones, { autoUpdateHumanBones: this.autoUpdateHumanBones }).copy(this);
  }
  /**
   * @deprecated Deprecated. Use either {@link getRawAbsolutePose} or {@link getNormalizedAbsolutePose} instead.
   */
  getAbsolutePose() {
    console.warn(
      "VRMHumanoid: getAbsolutePose() is deprecated. Use either getRawAbsolutePose() or getNormalizedAbsolutePose() instead."
    );
    return this.getRawAbsolutePose();
  }
  /**
   * Return the current absolute pose of this raw human bones as a {@link VRMPose}.
   * Note that the output result will contain initial state of the VRM and not compatible between different models.
   * You might want to use {@link getRawPose} instead.
   */
  getRawAbsolutePose() {
    return this._rawHumanBones.getAbsolutePose();
  }
  /**
   * Return the current absolute pose of this normalized human bones as a {@link VRMPose}.
   * Note that the output result will contain initial state of the VRM and not compatible between different models.
   * You might want to use {@link getNormalizedPose} instead.
   */
  getNormalizedAbsolutePose() {
    return this._normalizedHumanBones.getAbsolutePose();
  }
  /**
   * @deprecated Deprecated. Use either {@link getRawPose} or {@link getNormalizedPose} instead.
   */
  getPose() {
    console.warn("VRMHumanoid: getPose() is deprecated. Use either getRawPose() or getNormalizedPose() instead.");
    return this.getRawPose();
  }
  /**
   * Return the current pose of raw human bones as a {@link VRMPose}.
   *
   * Each transform is a local transform relative from rest pose (T-pose).
   */
  getRawPose() {
    return this._rawHumanBones.getPose();
  }
  /**
   * Return the current pose of normalized human bones as a {@link VRMPose}.
   *
   * Each transform is a local transform relative from rest pose (T-pose).
   */
  getNormalizedPose() {
    return this._normalizedHumanBones.getPose();
  }
  /**
   * @deprecated Deprecated. Use either {@link setRawPose} or {@link setNormalizedPose} instead.
   */
  setPose(poseObject) {
    console.warn("VRMHumanoid: setPose() is deprecated. Use either setRawPose() or setNormalizedPose() instead.");
    return this.setRawPose(poseObject);
  }
  /**
   * Let the raw human bones do a specified pose.
   *
   * Each transform have to be a local transform relative from rest pose (T-pose).
   * You can pass what you got from {@link getRawPose}.
   *
   * If you are using {@link autoUpdateHumanBones}, you might want to use {@link setNormalizedPose} instead.
   *
   * @param poseObject A {@link VRMPose} that represents a single pose
   */
  setRawPose(poseObject) {
    return this._rawHumanBones.setPose(poseObject);
  }
  /**
   * Let the normalized human bones do a specified pose.
   *
   * Each transform have to be a local transform relative from rest pose (T-pose).
   * You can pass what you got from {@link getNormalizedPose}.
   *
   * @param poseObject A {@link VRMPose} that represents a single pose
   */
  setNormalizedPose(poseObject) {
    return this._normalizedHumanBones.setPose(poseObject);
  }
  /**
   * @deprecated Deprecated. Use either {@link resetRawPose} or {@link resetNormalizedPose} instead.
   */
  resetPose() {
    console.warn("VRMHumanoid: resetPose() is deprecated. Use either resetRawPose() or resetNormalizedPose() instead.");
    return this.resetRawPose();
  }
  /**
   * Reset the raw humanoid to its rest pose.
   *
   * If you are using {@link autoUpdateHumanBones}, you might want to use {@link resetNormalizedPose} instead.
   */
  resetRawPose() {
    return this._rawHumanBones.resetPose();
  }
  /**
   * Reset the normalized humanoid to its rest pose.
   */
  resetNormalizedPose() {
    return this._normalizedHumanBones.resetPose();
  }
  /**
   * @deprecated Deprecated. Use either {@link getRawBone} or {@link getNormalizedBone} instead.
   */
  getBone(name) {
    console.warn("VRMHumanoid: getBone() is deprecated. Use either getRawBone() or getNormalizedBone() instead.");
    return this.getRawBone(name);
  }
  /**
   * Return a raw {@link VRMHumanBone} bound to a specified {@link VRMHumanBoneName}.
   *
   * @param name Name of the bone you want
   */
  getRawBone(name) {
    return this._rawHumanBones.getBone(name);
  }
  /**
   * Return a normalized {@link VRMHumanBone} bound to a specified {@link VRMHumanBoneName}.
   *
   * @param name Name of the bone you want
   */
  getNormalizedBone(name) {
    return this._normalizedHumanBones.getBone(name);
  }
  /**
   * @deprecated Deprecated. Use either {@link getRawBoneNode} or {@link getNormalizedBoneNode} instead.
   */
  getBoneNode(name) {
    console.warn(
      "VRMHumanoid: getBoneNode() is deprecated. Use either getRawBoneNode() or getNormalizedBoneNode() instead."
    );
    return this.getRawBoneNode(name);
  }
  /**
   * Return a raw bone as a `THREE.Object3D` bound to a specified {@link VRMHumanBoneName}.
   *
   * @param name Name of the bone you want
   */
  getRawBoneNode(name) {
    return this._rawHumanBones.getBoneNode(name);
  }
  /**
   * Return a normalized bone as a `THREE.Object3D` bound to a specified {@link VRMHumanBoneName}.
   *
   * @param name Name of the bone you want
   */
  getNormalizedBoneNode(name) {
    return this._normalizedHumanBones.getBoneNode(name);
  }
  /**
   * Update the humanoid component.
   *
   * If {@link autoUpdateHumanBones} is `true`, it transfers the pose of normalized human bones to raw human bones.
   */
  update() {
    if (this.autoUpdateHumanBones) {
      this._normalizedHumanBones.update();
    }
  }
};
var VRMRequiredHumanBoneName = {
  Hips: "hips",
  Spine: "spine",
  Head: "head",
  LeftUpperLeg: "leftUpperLeg",
  LeftLowerLeg: "leftLowerLeg",
  LeftFoot: "leftFoot",
  RightUpperLeg: "rightUpperLeg",
  RightLowerLeg: "rightLowerLeg",
  RightFoot: "rightFoot",
  LeftUpperArm: "leftUpperArm",
  LeftLowerArm: "leftLowerArm",
  LeftHand: "leftHand",
  RightUpperArm: "rightUpperArm",
  RightLowerArm: "rightLowerArm",
  RightHand: "rightHand"
};
var POSSIBLE_SPEC_VERSIONS3 = /* @__PURE__ */ new Set(["1.0", "1.0-beta"]);
var thumbBoneNameMap = {
  leftThumbProximal: "leftThumbMetacarpal",
  leftThumbIntermediate: "leftThumbProximal",
  rightThumbProximal: "rightThumbMetacarpal",
  rightThumbIntermediate: "rightThumbProximal"
};
var VRMHumanoidLoaderPlugin = class {
  get name() {
    return "VRMHumanoidLoaderPlugin";
  }
  constructor(parser, options) {
    this.parser = parser;
    this.helperRoot = options == null ? void 0 : options.helperRoot;
    this.autoUpdateHumanBones = options == null ? void 0 : options.autoUpdateHumanBones;
  }
  afterRoot(gltf) {
    return __async2(this, null, function* () {
      gltf.userData.vrmHumanoid = yield this._import(gltf);
    });
  }
  /**
   * Import a {@link VRMHumanoid} from a VRM.
   *
   * @param gltf A parsed result of GLTF taken from GLTFLoader
   */
  _import(gltf) {
    return __async2(this, null, function* () {
      const v1Result = yield this._v1Import(gltf);
      if (v1Result) {
        return v1Result;
      }
      const v0Result = yield this._v0Import(gltf);
      if (v0Result) {
        return v0Result;
      }
      return null;
    });
  }
  _v1Import(gltf) {
    return __async2(this, null, function* () {
      var _a, _b;
      const json = this.parser.json;
      const isVRMUsed = ((_a = json.extensionsUsed) == null ? void 0 : _a.indexOf("VRMC_vrm")) !== -1;
      if (!isVRMUsed) {
        return null;
      }
      const extension = (_b = json.extensions) == null ? void 0 : _b["VRMC_vrm"];
      if (!extension) {
        return null;
      }
      const specVersion = extension.specVersion;
      if (!POSSIBLE_SPEC_VERSIONS3.has(specVersion)) {
        console.warn(`VRMHumanoidLoaderPlugin: Unknown VRMC_vrm specVersion "${specVersion}"`);
        return null;
      }
      const schemaHumanoid = extension.humanoid;
      if (!schemaHumanoid) {
        return null;
      }
      const existsPreviousThumbName = schemaHumanoid.humanBones.leftThumbIntermediate != null || schemaHumanoid.humanBones.rightThumbIntermediate != null;
      const humanBones = {};
      if (schemaHumanoid.humanBones != null) {
        yield Promise.all(
          Object.entries(schemaHumanoid.humanBones).map((_0) => __async2(this, [_0], function* ([boneNameString, schemaHumanBone]) {
            let boneName = boneNameString;
            const index = schemaHumanBone.node;
            if (existsPreviousThumbName) {
              const thumbBoneName = thumbBoneNameMap[boneName];
              if (thumbBoneName != null) {
                boneName = thumbBoneName;
              }
            }
            const node = yield this.parser.getDependency("node", index);
            if (node == null) {
              console.warn(`A glTF node bound to the humanoid bone ${boneName} (index = ${index}) does not exist`);
              return;
            }
            humanBones[boneName] = { node };
          }))
        );
      }
      const humanoid = new VRMHumanoid(this._ensureRequiredBonesExist(humanBones), {
        autoUpdateHumanBones: this.autoUpdateHumanBones
      });
      gltf.scene.add(humanoid.normalizedHumanBonesRoot);
      if (this.helperRoot) {
        const helper = new VRMHumanoidHelper(humanoid);
        this.helperRoot.add(helper);
        helper.renderOrder = this.helperRoot.renderOrder;
      }
      return humanoid;
    });
  }
  _v0Import(gltf) {
    return __async2(this, null, function* () {
      var _a;
      const json = this.parser.json;
      const vrmExt = (_a = json.extensions) == null ? void 0 : _a.VRM;
      if (!vrmExt) {
        return null;
      }
      const schemaHumanoid = vrmExt.humanoid;
      if (!schemaHumanoid) {
        return null;
      }
      const humanBones = {};
      if (schemaHumanoid.humanBones != null) {
        yield Promise.all(
          schemaHumanoid.humanBones.map((bone) => __async2(this, null, function* () {
            const boneName = bone.bone;
            const index = bone.node;
            if (boneName == null || index == null) {
              return;
            }
            if (index < 0) {
              console.warn(
                `A glTF node index for the humanoid bone ${boneName} is negative (${index}), ignoring this bone.`
              );
              return;
            }
            const node = yield this.parser.getDependency("node", index);
            if (node == null) {
              console.warn(`A glTF node bound to the humanoid bone ${boneName} (index = ${index}) does not exist`);
              return;
            }
            const thumbBoneName = thumbBoneNameMap[boneName];
            const newBoneName = thumbBoneName != null ? thumbBoneName : boneName;
            if (humanBones[newBoneName] != null) {
              console.warn(
                `Multiple bone entries for ${newBoneName} detected (index = ${index}), ignoring duplicated entries.`
              );
              return;
            }
            humanBones[newBoneName] = { node };
          }))
        );
      }
      const humanoid = new VRMHumanoid(this._ensureRequiredBonesExist(humanBones), {
        autoUpdateHumanBones: this.autoUpdateHumanBones
      });
      gltf.scene.add(humanoid.normalizedHumanBonesRoot);
      if (this.helperRoot) {
        const helper = new VRMHumanoidHelper(humanoid);
        this.helperRoot.add(helper);
        helper.renderOrder = this.helperRoot.renderOrder;
      }
      return humanoid;
    });
  }
  /**
   * Ensure required bones exist in given human bones.
   * @param humanBones Human bones
   * @returns Human bones, no longer partial!
   */
  _ensureRequiredBonesExist(humanBones) {
    const missingRequiredBones = Object.values(VRMRequiredHumanBoneName).filter(
      (requiredBoneName) => humanBones[requiredBoneName] == null
    );
    if (missingRequiredBones.length > 0) {
      throw new Error(
        `VRMHumanoidLoaderPlugin: These humanoid bones are required but not exist: ${missingRequiredBones.join(", ")}`
      );
    }
    return humanBones;
  }
};
var FanBufferGeometry = class extends THREE9.BufferGeometry {
  constructor() {
    super();
    this._currentTheta = 0;
    this._currentRadius = 0;
    this.theta = 0;
    this.radius = 0;
    this._currentTheta = 0;
    this._currentRadius = 0;
    this._attrPos = new THREE9.BufferAttribute(new Float32Array(65 * 3), 3);
    this.setAttribute("position", this._attrPos);
    this._attrIndex = new THREE9.BufferAttribute(new Uint16Array(3 * 63), 1);
    this.setIndex(this._attrIndex);
    this._buildIndex();
    this.update();
  }
  update() {
    let shouldUpdateGeometry = false;
    if (this._currentTheta !== this.theta) {
      this._currentTheta = this.theta;
      shouldUpdateGeometry = true;
    }
    if (this._currentRadius !== this.radius) {
      this._currentRadius = this.radius;
      shouldUpdateGeometry = true;
    }
    if (shouldUpdateGeometry) {
      this._buildPosition();
    }
  }
  _buildPosition() {
    this._attrPos.setXYZ(0, 0, 0, 0);
    for (let i = 0; i < 64; i++) {
      const t = i / 63 * this._currentTheta;
      this._attrPos.setXYZ(i + 1, this._currentRadius * Math.sin(t), 0, this._currentRadius * Math.cos(t));
    }
    this._attrPos.needsUpdate = true;
  }
  _buildIndex() {
    for (let i = 0; i < 63; i++) {
      this._attrIndex.setXYZ(i * 3, 0, i + 1, i + 2);
    }
    this._attrIndex.needsUpdate = true;
  }
};
var LineAndSphereBufferGeometry = class extends THREE10.BufferGeometry {
  constructor() {
    super();
    this.radius = 0;
    this._currentRadius = 0;
    this.tail = new THREE10.Vector3();
    this._currentTail = new THREE10.Vector3();
    this._attrPos = new THREE10.BufferAttribute(new Float32Array(294), 3);
    this.setAttribute("position", this._attrPos);
    this._attrIndex = new THREE10.BufferAttribute(new Uint16Array(194), 1);
    this.setIndex(this._attrIndex);
    this._buildIndex();
    this.update();
  }
  update() {
    let shouldUpdateGeometry = false;
    if (this._currentRadius !== this.radius) {
      this._currentRadius = this.radius;
      shouldUpdateGeometry = true;
    }
    if (!this._currentTail.equals(this.tail)) {
      this._currentTail.copy(this.tail);
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
var _quatA4 = new THREE11.Quaternion();
var _quatB = new THREE11.Quaternion();
var _v3A4 = new THREE11.Vector3();
var _v3B2 = new THREE11.Vector3();
var SQRT_2_OVER_2 = Math.sqrt(2) / 2;
var QUAT_XY_CW90 = new THREE11.Quaternion(0, 0, -SQRT_2_OVER_2, SQRT_2_OVER_2);
var VEC3_POSITIVE_Y = new THREE11.Vector3(0, 1, 0);
var VRMLookAtHelper = class extends THREE11.Group {
  constructor(lookAt) {
    super();
    this.matrixAutoUpdate = false;
    this.vrmLookAt = lookAt;
    {
      const geometry = new FanBufferGeometry();
      geometry.radius = 0.5;
      const material = new THREE11.MeshBasicMaterial({
        color: 65280,
        transparent: true,
        opacity: 0.5,
        side: THREE11.DoubleSide,
        depthTest: false,
        depthWrite: false
      });
      this._meshPitch = new THREE11.Mesh(geometry, material);
      this.add(this._meshPitch);
    }
    {
      const geometry = new FanBufferGeometry();
      geometry.radius = 0.5;
      const material = new THREE11.MeshBasicMaterial({
        color: 16711680,
        transparent: true,
        opacity: 0.5,
        side: THREE11.DoubleSide,
        depthTest: false,
        depthWrite: false
      });
      this._meshYaw = new THREE11.Mesh(geometry, material);
      this.add(this._meshYaw);
    }
    {
      const geometry = new LineAndSphereBufferGeometry();
      geometry.radius = 0.1;
      const material = new THREE11.LineBasicMaterial({
        color: 16777215,
        depthTest: false,
        depthWrite: false
      });
      this._lineTarget = new THREE11.LineSegments(geometry, material);
      this._lineTarget.frustumCulled = false;
      this.add(this._lineTarget);
    }
  }
  dispose() {
    this._meshYaw.geometry.dispose();
    this._meshYaw.material.dispose();
    this._meshPitch.geometry.dispose();
    this._meshPitch.material.dispose();
    this._lineTarget.geometry.dispose();
    this._lineTarget.material.dispose();
  }
  updateMatrixWorld(force) {
    const yaw = THREE11.MathUtils.DEG2RAD * this.vrmLookAt.yaw;
    this._meshYaw.geometry.theta = yaw;
    this._meshYaw.geometry.update();
    const pitch = THREE11.MathUtils.DEG2RAD * this.vrmLookAt.pitch;
    this._meshPitch.geometry.theta = pitch;
    this._meshPitch.geometry.update();
    this.vrmLookAt.getLookAtWorldPosition(_v3A4);
    this.vrmLookAt.getLookAtWorldQuaternion(_quatA4);
    _quatA4.multiply(this.vrmLookAt.getFaceFrontQuaternion(_quatB));
    this._meshYaw.position.copy(_v3A4);
    this._meshYaw.quaternion.copy(_quatA4);
    this._meshPitch.position.copy(_v3A4);
    this._meshPitch.quaternion.copy(_quatA4);
    this._meshPitch.quaternion.multiply(_quatB.setFromAxisAngle(VEC3_POSITIVE_Y, yaw));
    this._meshPitch.quaternion.multiply(QUAT_XY_CW90);
    const { target, autoUpdate } = this.vrmLookAt;
    if (target != null && autoUpdate) {
      target.getWorldPosition(_v3B2).sub(_v3A4);
      this._lineTarget.geometry.tail.copy(_v3B2);
      this._lineTarget.geometry.update();
      this._lineTarget.position.copy(_v3A4);
    }
    super.updateMatrixWorld(force);
  }
};
var _position = new THREE12.Vector3();
var _scale = new THREE12.Vector3();
function getWorldQuaternionLite(object, out) {
  object.matrixWorld.decompose(_position, out, _scale);
  return out;
}
function calcAzimuthAltitude(vector) {
  return [Math.atan2(-vector.z, vector.x), Math.atan2(vector.y, Math.sqrt(vector.x * vector.x + vector.z * vector.z))];
}
function sanitizeAngle(angle) {
  const roundTurn = Math.round(angle / 2 / Math.PI);
  return angle - 2 * Math.PI * roundTurn;
}
var VEC3_POSITIVE_Z = new THREE13.Vector3(0, 0, 1);
var _v3A5 = new THREE13.Vector3();
var _v3B3 = new THREE13.Vector3();
var _v3C = new THREE13.Vector3();
var _quatA5 = new THREE13.Quaternion();
var _quatB2 = new THREE13.Quaternion();
var _quatC = new THREE13.Quaternion();
var _quatD = new THREE13.Quaternion();
var _eulerA = new THREE13.Euler();
var _VRMLookAt = class _VRMLookAt2 {
  /**
   * Create a new {@link VRMLookAt}.
   *
   * @param humanoid A {@link VRMHumanoid}
   * @param applier A {@link VRMLookAtApplier}
   */
  constructor(humanoid, applier) {
    this.offsetFromHeadBone = new THREE13.Vector3();
    this.autoUpdate = true;
    this.faceFront = new THREE13.Vector3(0, 0, 1);
    this.humanoid = humanoid;
    this.applier = applier;
    this._yaw = 0;
    this._pitch = 0;
    this._needsUpdate = true;
    this._restHeadWorldQuaternion = this.getLookAtWorldQuaternion(new THREE13.Quaternion());
  }
  /**
   * Its current angle around Y axis, in degree.
   */
  get yaw() {
    return this._yaw;
  }
  /**
   * Its current angle around Y axis, in degree.
   */
  set yaw(value) {
    this._yaw = value;
    this._needsUpdate = true;
  }
  /**
   * Its current angle around X axis, in degree.
   */
  get pitch() {
    return this._pitch;
  }
  /**
   * Its current angle around X axis, in degree.
   */
  set pitch(value) {
    this._pitch = value;
    this._needsUpdate = true;
  }
  /**
   * @deprecated Use {@link getEuler} instead.
   */
  get euler() {
    console.warn("VRMLookAt: euler is deprecated. use getEuler() instead.");
    return this.getEuler(new THREE13.Euler());
  }
  /**
   * Get its yaw-pitch angles as an `Euler`.
   * Does NOT consider {@link faceFront}; it returns `Euler(0, 0, 0; "YXZ")` by default regardless of the faceFront value.
   *
   * @param target The target euler
   */
  getEuler(target) {
    return target.set(THREE13.MathUtils.DEG2RAD * this._pitch, THREE13.MathUtils.DEG2RAD * this._yaw, 0, "YXZ");
  }
  /**
   * Copy the given {@link VRMLookAt} into this one.
   * {@link humanoid} must be same as the source one.
   * {@link applier} will reference the same instance as the source one.
   * @param source The {@link VRMLookAt} you want to copy
   * @returns this
   */
  copy(source) {
    if (this.humanoid !== source.humanoid) {
      throw new Error("VRMLookAt: humanoid must be same in order to copy");
    }
    this.offsetFromHeadBone.copy(source.offsetFromHeadBone);
    this.applier = source.applier;
    this.autoUpdate = source.autoUpdate;
    this.target = source.target;
    this.faceFront.copy(source.faceFront);
    return this;
  }
  /**
   * Returns a clone of this {@link VRMLookAt}.
   * Note that {@link humanoid} and {@link applier} will reference the same instance as this one.
   * @returns Copied {@link VRMLookAt}
   */
  clone() {
    return new _VRMLookAt2(this.humanoid, this.applier).copy(this);
  }
  /**
   * Reset the lookAt direction (yaw and pitch) to the initial direction.
   */
  reset() {
    this._yaw = 0;
    this._pitch = 0;
    this._needsUpdate = true;
  }
  /**
   * Get its lookAt position in world coordinate.
   *
   * @param target A target `THREE.Vector3`
   */
  getLookAtWorldPosition(target) {
    const head = this.humanoid.getRawBoneNode("head");
    return target.copy(this.offsetFromHeadBone).applyMatrix4(head.matrixWorld);
  }
  /**
   * Get its lookAt rotation in world coordinate.
   * Does NOT consider {@link faceFront}.
   *
   * @param target A target `THREE.Quaternion`
   */
  getLookAtWorldQuaternion(target) {
    const head = this.humanoid.getRawBoneNode("head");
    return getWorldQuaternionLite(head, target);
  }
  /**
   * Get a quaternion that rotates the +Z unit vector of the humanoid Head to the {@link faceFront} direction.
   *
   * @param target A target `THREE.Quaternion`
   */
  getFaceFrontQuaternion(target) {
    if (this.faceFront.distanceToSquared(VEC3_POSITIVE_Z) < 0.01) {
      return target.copy(this._restHeadWorldQuaternion).invert();
    }
    const [faceFrontAzimuth, faceFrontAltitude] = calcAzimuthAltitude(this.faceFront);
    _eulerA.set(0, 0.5 * Math.PI + faceFrontAzimuth, faceFrontAltitude, "YZX");
    return target.setFromEuler(_eulerA).premultiply(_quatD.copy(this._restHeadWorldQuaternion).invert());
  }
  /**
   * Get its LookAt direction in world coordinate.
   *
   * @param target A target `THREE.Vector3`
   */
  getLookAtWorldDirection(target) {
    this.getLookAtWorldQuaternion(_quatB2);
    this.getFaceFrontQuaternion(_quatC);
    return target.copy(VEC3_POSITIVE_Z).applyQuaternion(_quatB2).applyQuaternion(_quatC).applyEuler(this.getEuler(_eulerA));
  }
  /**
   * Set its lookAt target position.
   *
   * Note that its result will be instantly overwritten if {@link VRMLookAtHead.autoUpdate} is enabled.
   *
   * If you want to track an object continuously, you might want to use {@link target} instead.
   *
   * @param position A target position, in world space
   */
  lookAt(position) {
    const headRotDiffInv = _quatA5.copy(this._restHeadWorldQuaternion).multiply(quatInvertCompat(this.getLookAtWorldQuaternion(_quatB2)));
    const headPos = this.getLookAtWorldPosition(_v3B3);
    const lookAtDir = _v3C.copy(position).sub(headPos).applyQuaternion(headRotDiffInv).normalize();
    const [azimuthFrom, altitudeFrom] = calcAzimuthAltitude(this.faceFront);
    const [azimuthTo, altitudeTo] = calcAzimuthAltitude(lookAtDir);
    const yaw = sanitizeAngle(azimuthTo - azimuthFrom);
    const pitch = sanitizeAngle(altitudeFrom - altitudeTo);
    this._yaw = THREE13.MathUtils.RAD2DEG * yaw;
    this._pitch = THREE13.MathUtils.RAD2DEG * pitch;
    this._needsUpdate = true;
  }
  /**
   * Update the VRMLookAtHead.
   * If {@link autoUpdate} is enabled, this will make it look at the {@link target}.
   *
   * @param delta deltaTime, it isn't used though. You can use the parameter if you want to use this in your own extended {@link VRMLookAt}.
   */
  update(delta) {
    if (this.target != null && this.autoUpdate) {
      this.lookAt(this.target.getWorldPosition(_v3A5));
    }
    if (this._needsUpdate) {
      this._needsUpdate = false;
      this.applier.applyYawPitch(this._yaw, this._pitch);
    }
  }
};
_VRMLookAt.EULER_ORDER = "YXZ";
var VRMLookAt = _VRMLookAt;
var VEC3_POSITIVE_Z2 = new THREE14.Vector3(0, 0, 1);
var _quatA6 = new THREE14.Quaternion();
var _quatB3 = new THREE14.Quaternion();
var _eulerA2 = new THREE14.Euler(0, 0, 0, "YXZ");
var VRMLookAtBoneApplier = class {
  /**
   * Create a new {@link VRMLookAtBoneApplier}.
   *
   * @param humanoid A {@link VRMHumanoid}
   * @param rangeMapHorizontalInner A {@link VRMLookAtRangeMap} used for inner transverse direction
   * @param rangeMapHorizontalOuter A {@link VRMLookAtRangeMap} used for outer transverse direction
   * @param rangeMapVerticalDown A {@link VRMLookAtRangeMap} used for down direction
   * @param rangeMapVerticalUp A {@link VRMLookAtRangeMap} used for up direction
   */
  constructor(humanoid, rangeMapHorizontalInner, rangeMapHorizontalOuter, rangeMapVerticalDown, rangeMapVerticalUp) {
    this.humanoid = humanoid;
    this.rangeMapHorizontalInner = rangeMapHorizontalInner;
    this.rangeMapHorizontalOuter = rangeMapHorizontalOuter;
    this.rangeMapVerticalDown = rangeMapVerticalDown;
    this.rangeMapVerticalUp = rangeMapVerticalUp;
    this.faceFront = new THREE14.Vector3(0, 0, 1);
    this._restQuatLeftEye = new THREE14.Quaternion();
    this._restQuatRightEye = new THREE14.Quaternion();
    this._restLeftEyeParentWorldQuat = new THREE14.Quaternion();
    this._restRightEyeParentWorldQuat = new THREE14.Quaternion();
    const leftEye = this.humanoid.getRawBoneNode("leftEye");
    const rightEye = this.humanoid.getRawBoneNode("rightEye");
    if (leftEye) {
      this._restQuatLeftEye.copy(leftEye.quaternion);
      getWorldQuaternionLite(leftEye.parent, this._restLeftEyeParentWorldQuat);
    }
    if (rightEye) {
      this._restQuatRightEye.copy(rightEye.quaternion);
      getWorldQuaternionLite(rightEye.parent, this._restRightEyeParentWorldQuat);
    }
  }
  /**
   * Apply the input angle to its associated VRM model.
   *
   * @param yaw Rotation around Y axis, in degree
   * @param pitch Rotation around X axis, in degree
   */
  applyYawPitch(yaw, pitch) {
    const leftEye = this.humanoid.getRawBoneNode("leftEye");
    const rightEye = this.humanoid.getRawBoneNode("rightEye");
    const leftEyeNormalized = this.humanoid.getNormalizedBoneNode("leftEye");
    const rightEyeNormalized = this.humanoid.getNormalizedBoneNode("rightEye");
    if (leftEye) {
      if (pitch < 0) {
        _eulerA2.x = -THREE14.MathUtils.DEG2RAD * this.rangeMapVerticalDown.map(-pitch);
      } else {
        _eulerA2.x = THREE14.MathUtils.DEG2RAD * this.rangeMapVerticalUp.map(pitch);
      }
      if (yaw < 0) {
        _eulerA2.y = -THREE14.MathUtils.DEG2RAD * this.rangeMapHorizontalInner.map(-yaw);
      } else {
        _eulerA2.y = THREE14.MathUtils.DEG2RAD * this.rangeMapHorizontalOuter.map(yaw);
      }
      _quatA6.setFromEuler(_eulerA2);
      this._getWorldFaceFrontQuat(_quatB3);
      leftEyeNormalized.quaternion.copy(_quatB3).multiply(_quatA6).multiply(_quatB3.invert());
      _quatA6.copy(this._restLeftEyeParentWorldQuat);
      leftEye.quaternion.copy(leftEyeNormalized.quaternion).multiply(_quatA6).premultiply(_quatA6.invert()).multiply(this._restQuatLeftEye);
    }
    if (rightEye) {
      if (pitch < 0) {
        _eulerA2.x = -THREE14.MathUtils.DEG2RAD * this.rangeMapVerticalDown.map(-pitch);
      } else {
        _eulerA2.x = THREE14.MathUtils.DEG2RAD * this.rangeMapVerticalUp.map(pitch);
      }
      if (yaw < 0) {
        _eulerA2.y = -THREE14.MathUtils.DEG2RAD * this.rangeMapHorizontalOuter.map(-yaw);
      } else {
        _eulerA2.y = THREE14.MathUtils.DEG2RAD * this.rangeMapHorizontalInner.map(yaw);
      }
      _quatA6.setFromEuler(_eulerA2);
      this._getWorldFaceFrontQuat(_quatB3);
      rightEyeNormalized.quaternion.copy(_quatB3).multiply(_quatA6).multiply(_quatB3.invert());
      _quatA6.copy(this._restRightEyeParentWorldQuat);
      rightEye.quaternion.copy(rightEyeNormalized.quaternion).multiply(_quatA6).premultiply(_quatA6.invert()).multiply(this._restQuatRightEye);
    }
  }
  /**
   * @deprecated Use {@link applyYawPitch} instead.
   */
  lookAt(euler) {
    console.warn("VRMLookAtBoneApplier: lookAt() is deprecated. use apply() instead.");
    const yaw = THREE14.MathUtils.RAD2DEG * euler.y;
    const pitch = THREE14.MathUtils.RAD2DEG * euler.x;
    this.applyYawPitch(yaw, pitch);
  }
  /**
   * Get a quaternion that rotates the world-space +Z unit vector to the {@link faceFront} direction.
   *
   * @param target A target `THREE.Quaternion`
   */
  _getWorldFaceFrontQuat(target) {
    if (this.faceFront.distanceToSquared(VEC3_POSITIVE_Z2) < 0.01) {
      return target.identity();
    }
    const [faceFrontAzimuth, faceFrontAltitude] = calcAzimuthAltitude(this.faceFront);
    _eulerA2.set(0, 0.5 * Math.PI + faceFrontAzimuth, faceFrontAltitude, "YZX");
    return target.setFromEuler(_eulerA2);
  }
};
VRMLookAtBoneApplier.type = "bone";
var VRMLookAtExpressionApplier = class {
  /**
   * Create a new {@link VRMLookAtExpressionApplier}.
   *
   * @param expressions A {@link VRMExpressionManager}
   * @param rangeMapHorizontalInner A {@link VRMLookAtRangeMap} used for inner transverse direction
   * @param rangeMapHorizontalOuter A {@link VRMLookAtRangeMap} used for outer transverse direction
   * @param rangeMapVerticalDown A {@link VRMLookAtRangeMap} used for down direction
   * @param rangeMapVerticalUp A {@link VRMLookAtRangeMap} used for up direction
   */
  constructor(expressions, rangeMapHorizontalInner, rangeMapHorizontalOuter, rangeMapVerticalDown, rangeMapVerticalUp) {
    this.expressions = expressions;
    this.rangeMapHorizontalInner = rangeMapHorizontalInner;
    this.rangeMapHorizontalOuter = rangeMapHorizontalOuter;
    this.rangeMapVerticalDown = rangeMapVerticalDown;
    this.rangeMapVerticalUp = rangeMapVerticalUp;
  }
  /**
   * Apply the input angle to its associated VRM model.
   *
   * @param yaw Rotation around Y axis, in degree
   * @param pitch Rotation around X axis, in degree
   */
  applyYawPitch(yaw, pitch) {
    if (pitch < 0) {
      this.expressions.setValue("lookDown", 0);
      this.expressions.setValue("lookUp", this.rangeMapVerticalUp.map(-pitch));
    } else {
      this.expressions.setValue("lookUp", 0);
      this.expressions.setValue("lookDown", this.rangeMapVerticalDown.map(pitch));
    }
    if (yaw < 0) {
      this.expressions.setValue("lookLeft", 0);
      this.expressions.setValue("lookRight", this.rangeMapHorizontalOuter.map(-yaw));
    } else {
      this.expressions.setValue("lookRight", 0);
      this.expressions.setValue("lookLeft", this.rangeMapHorizontalOuter.map(yaw));
    }
  }
  /**
   * @deprecated Use {@link applyYawPitch} instead.
   */
  lookAt(euler) {
    console.warn("VRMLookAtBoneApplier: lookAt() is deprecated. use apply() instead.");
    const yaw = THREE15.MathUtils.RAD2DEG * euler.y;
    const pitch = THREE15.MathUtils.RAD2DEG * euler.x;
    this.applyYawPitch(yaw, pitch);
  }
};
VRMLookAtExpressionApplier.type = "expression";
var VRMLookAtRangeMap = class {
  /**
   * Create a new {@link VRMLookAtRangeMap}.
   *
   * @param inputMaxValue The {@link inputMaxValue} of the map
   * @param outputScale The {@link outputScale} of the map
   */
  constructor(inputMaxValue, outputScale) {
    this.inputMaxValue = inputMaxValue;
    this.outputScale = outputScale;
  }
  /**
   * Evaluate an input value and output a mapped value.
   * @param src The input value
   */
  map(src) {
    return this.outputScale * saturate(src / this.inputMaxValue);
  }
};
var POSSIBLE_SPEC_VERSIONS4 = /* @__PURE__ */ new Set(["1.0", "1.0-beta"]);
var INPUT_MAX_VALUE_MINIMUM = 0.01;
var VRMLookAtLoaderPlugin = class {
  get name() {
    return "VRMLookAtLoaderPlugin";
  }
  constructor(parser, options) {
    this.parser = parser;
    this.helperRoot = options == null ? void 0 : options.helperRoot;
  }
  afterRoot(gltf) {
    return __async2(this, null, function* () {
      const vrmHumanoid = gltf.userData.vrmHumanoid;
      if (vrmHumanoid === null) {
        return;
      } else if (vrmHumanoid === void 0) {
        throw new Error("VRMLookAtLoaderPlugin: vrmHumanoid is undefined. VRMHumanoidLoaderPlugin have to be used first");
      }
      const vrmExpressionManager = gltf.userData.vrmExpressionManager;
      if (vrmExpressionManager === null) {
        return;
      } else if (vrmExpressionManager === void 0) {
        throw new Error(
          "VRMLookAtLoaderPlugin: vrmExpressionManager is undefined. VRMExpressionLoaderPlugin have to be used first"
        );
      }
      gltf.userData.vrmLookAt = yield this._import(gltf, vrmHumanoid, vrmExpressionManager);
    });
  }
  /**
   * Import a {@link VRMLookAt} from a VRM.
   *
   * @param gltf A parsed result of GLTF taken from GLTFLoader
   * @param humanoid A {@link VRMHumanoid} instance that represents the VRM
   * @param expressions A {@link VRMExpressionManager} instance that represents the VRM
   */
  _import(gltf, humanoid, expressions) {
    return __async2(this, null, function* () {
      if (humanoid == null || expressions == null) {
        return null;
      }
      const v1Result = yield this._v1Import(gltf, humanoid, expressions);
      if (v1Result) {
        return v1Result;
      }
      const v0Result = yield this._v0Import(gltf, humanoid, expressions);
      if (v0Result) {
        return v0Result;
      }
      return null;
    });
  }
  _v1Import(gltf, humanoid, expressions) {
    return __async2(this, null, function* () {
      var _a, _b, _c;
      const json = this.parser.json;
      const isVRMUsed = ((_a = json.extensionsUsed) == null ? void 0 : _a.indexOf("VRMC_vrm")) !== -1;
      if (!isVRMUsed) {
        return null;
      }
      const extension = (_b = json.extensions) == null ? void 0 : _b["VRMC_vrm"];
      if (!extension) {
        return null;
      }
      const specVersion = extension.specVersion;
      if (!POSSIBLE_SPEC_VERSIONS4.has(specVersion)) {
        console.warn(`VRMLookAtLoaderPlugin: Unknown VRMC_vrm specVersion "${specVersion}"`);
        return null;
      }
      const schemaLookAt = extension.lookAt;
      if (!schemaLookAt) {
        return null;
      }
      const defaultOutputScale = schemaLookAt.type === "expression" ? 1 : 10;
      const mapHI = this._v1ImportRangeMap(schemaLookAt.rangeMapHorizontalInner, defaultOutputScale);
      const mapHO = this._v1ImportRangeMap(schemaLookAt.rangeMapHorizontalOuter, defaultOutputScale);
      const mapVD = this._v1ImportRangeMap(schemaLookAt.rangeMapVerticalDown, defaultOutputScale);
      const mapVU = this._v1ImportRangeMap(schemaLookAt.rangeMapVerticalUp, defaultOutputScale);
      let applier;
      if (schemaLookAt.type === "expression") {
        applier = new VRMLookAtExpressionApplier(expressions, mapHI, mapHO, mapVD, mapVU);
      } else {
        applier = new VRMLookAtBoneApplier(humanoid, mapHI, mapHO, mapVD, mapVU);
      }
      const lookAt = this._importLookAt(humanoid, applier);
      lookAt.offsetFromHeadBone.fromArray((_c = schemaLookAt.offsetFromHeadBone) != null ? _c : [0, 0.06, 0]);
      return lookAt;
    });
  }
  _v1ImportRangeMap(schemaRangeMap, defaultOutputScale) {
    var _a, _b;
    let inputMaxValue = (_a = schemaRangeMap == null ? void 0 : schemaRangeMap.inputMaxValue) != null ? _a : 90;
    const outputScale = (_b = schemaRangeMap == null ? void 0 : schemaRangeMap.outputScale) != null ? _b : defaultOutputScale;
    if (inputMaxValue < INPUT_MAX_VALUE_MINIMUM) {
      console.warn(
        "VRMLookAtLoaderPlugin: inputMaxValue of a range map is too small. Consider reviewing the range map!"
      );
      inputMaxValue = INPUT_MAX_VALUE_MINIMUM;
    }
    return new VRMLookAtRangeMap(inputMaxValue, outputScale);
  }
  _v0Import(gltf, humanoid, expressions) {
    return __async2(this, null, function* () {
      var _a, _b, _c, _d;
      const json = this.parser.json;
      const vrmExt = (_a = json.extensions) == null ? void 0 : _a.VRM;
      if (!vrmExt) {
        return null;
      }
      const schemaFirstPerson = vrmExt.firstPerson;
      if (!schemaFirstPerson) {
        return null;
      }
      const defaultOutputScale = schemaFirstPerson.lookAtTypeName === "BlendShape" ? 1 : 10;
      const mapHI = this._v0ImportDegreeMap(schemaFirstPerson.lookAtHorizontalInner, defaultOutputScale);
      const mapHO = this._v0ImportDegreeMap(schemaFirstPerson.lookAtHorizontalOuter, defaultOutputScale);
      const mapVD = this._v0ImportDegreeMap(schemaFirstPerson.lookAtVerticalDown, defaultOutputScale);
      const mapVU = this._v0ImportDegreeMap(schemaFirstPerson.lookAtVerticalUp, defaultOutputScale);
      let applier;
      if (schemaFirstPerson.lookAtTypeName === "BlendShape") {
        applier = new VRMLookAtExpressionApplier(expressions, mapHI, mapHO, mapVD, mapVU);
      } else {
        applier = new VRMLookAtBoneApplier(humanoid, mapHI, mapHO, mapVD, mapVU);
      }
      const lookAt = this._importLookAt(humanoid, applier);
      if (schemaFirstPerson.firstPersonBoneOffset) {
        lookAt.offsetFromHeadBone.set(
          (_b = schemaFirstPerson.firstPersonBoneOffset.x) != null ? _b : 0,
          (_c = schemaFirstPerson.firstPersonBoneOffset.y) != null ? _c : 0.06,
          -((_d = schemaFirstPerson.firstPersonBoneOffset.z) != null ? _d : 0)
        );
      } else {
        lookAt.offsetFromHeadBone.set(0, 0.06, 0);
      }
      lookAt.faceFront.set(0, 0, -1);
      if (applier instanceof VRMLookAtBoneApplier) {
        applier.faceFront.set(0, 0, -1);
      }
      return lookAt;
    });
  }
  _v0ImportDegreeMap(schemaDegreeMap, defaultOutputScale) {
    var _a, _b;
    const curve = schemaDegreeMap == null ? void 0 : schemaDegreeMap.curve;
    if (JSON.stringify(curve) !== "[0,0,0,1,1,1,1,0]") {
      console.warn("Curves of LookAtDegreeMap defined in VRM 0.0 are not supported");
    }
    let xRange = (_a = schemaDegreeMap == null ? void 0 : schemaDegreeMap.xRange) != null ? _a : 90;
    const yRange = (_b = schemaDegreeMap == null ? void 0 : schemaDegreeMap.yRange) != null ? _b : defaultOutputScale;
    if (xRange < INPUT_MAX_VALUE_MINIMUM) {
      console.warn("VRMLookAtLoaderPlugin: xRange of a degree map is too small. Consider reviewing the degree map!");
      xRange = INPUT_MAX_VALUE_MINIMUM;
    }
    return new VRMLookAtRangeMap(xRange, yRange);
  }
  _importLookAt(humanoid, applier) {
    const lookAt = new VRMLookAt(humanoid, applier);
    if (this.helperRoot) {
      const helper = new VRMLookAtHelper(lookAt);
      this.helperRoot.add(helper);
      helper.renderOrder = this.helperRoot.renderOrder;
    }
    return lookAt;
  }
};
var VRMLookAtTypeName = {
  Bone: "bone",
  Expression: "expression"
};
function resolveURL(url, path) {
  if (typeof url !== "string" || url === "") return "";
  if (/^https?:\/\//i.test(path) && /^\//.test(url)) {
    path = path.replace(/(^https?:\/\/[^/]+).*/i, "$1");
  }
  if (/^(https?:)?\/\//i.test(url)) return url;
  if (/^data:.*,.*$/i.test(url)) return url;
  if (/^blob:.*$/i.test(url)) return url;
  return path + url;
}
var POSSIBLE_SPEC_VERSIONS5 = /* @__PURE__ */ new Set(["1.0", "1.0-beta"]);
var VRMMetaLoaderPlugin = class {
  get name() {
    return "VRMMetaLoaderPlugin";
  }
  constructor(parser, options) {
    var _a, _b, _c;
    this.parser = parser;
    this.needThumbnailImage = (_a = options == null ? void 0 : options.needThumbnailImage) != null ? _a : false;
    this.acceptLicenseUrls = (_b = options == null ? void 0 : options.acceptLicenseUrls) != null ? _b : ["https://vrm.dev/licenses/1.0/"];
    this.acceptV0Meta = (_c = options == null ? void 0 : options.acceptV0Meta) != null ? _c : true;
  }
  afterRoot(gltf) {
    return __async2(this, null, function* () {
      gltf.userData.vrmMeta = yield this._import(gltf);
    });
  }
  _import(gltf) {
    return __async2(this, null, function* () {
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
    return __async2(this, null, function* () {
      var _a, _b, _c;
      const json = this.parser.json;
      const isVRMUsed = ((_a = json.extensionsUsed) == null ? void 0 : _a.indexOf("VRMC_vrm")) !== -1;
      if (!isVRMUsed) {
        return null;
      }
      const extension = (_b = json.extensions) == null ? void 0 : _b["VRMC_vrm"];
      if (extension == null) {
        return null;
      }
      const specVersion = extension.specVersion;
      if (!POSSIBLE_SPEC_VERSIONS5.has(specVersion)) {
        console.warn(`VRMMetaLoaderPlugin: Unknown VRMC_vrm specVersion "${specVersion}"`);
        return null;
      }
      const schemaMeta = extension.meta;
      if (!schemaMeta) {
        return null;
      }
      const licenseUrl = schemaMeta.licenseUrl;
      const acceptLicenseUrlsSet = new Set(this.acceptLicenseUrls);
      if (!acceptLicenseUrlsSet.has(licenseUrl)) {
        throw new Error(`VRMMetaLoaderPlugin: The license url "${licenseUrl}" is not accepted`);
      }
      let thumbnailImage = void 0;
      if (this.needThumbnailImage && schemaMeta.thumbnailImage != null) {
        thumbnailImage = (_c = yield this._extractGLTFImage(schemaMeta.thumbnailImage)) != null ? _c : void 0;
      }
      return {
        metaVersion: "1",
        name: schemaMeta.name,
        version: schemaMeta.version,
        authors: schemaMeta.authors,
        copyrightInformation: schemaMeta.copyrightInformation,
        contactInformation: schemaMeta.contactInformation,
        references: schemaMeta.references,
        thirdPartyLicenses: schemaMeta.thirdPartyLicenses,
        thumbnailImage,
        licenseUrl: schemaMeta.licenseUrl,
        avatarPermission: schemaMeta.avatarPermission,
        allowExcessivelyViolentUsage: schemaMeta.allowExcessivelyViolentUsage,
        allowExcessivelySexualUsage: schemaMeta.allowExcessivelySexualUsage,
        commercialUsage: schemaMeta.commercialUsage,
        allowPoliticalOrReligiousUsage: schemaMeta.allowPoliticalOrReligiousUsage,
        allowAntisocialOrHateUsage: schemaMeta.allowAntisocialOrHateUsage,
        creditNotation: schemaMeta.creditNotation,
        allowRedistribution: schemaMeta.allowRedistribution,
        modification: schemaMeta.modification,
        otherLicenseUrl: schemaMeta.otherLicenseUrl
      };
    });
  }
  _v0Import(gltf) {
    return __async2(this, null, function* () {
      var _a;
      const json = this.parser.json;
      const vrmExt = (_a = json.extensions) == null ? void 0 : _a.VRM;
      if (!vrmExt) {
        return null;
      }
      const schemaMeta = vrmExt.meta;
      if (!schemaMeta) {
        return null;
      }
      if (!this.acceptV0Meta) {
        throw new Error("VRMMetaLoaderPlugin: Attempted to load VRM0.0 meta but acceptV0Meta is false");
      }
      let texture;
      if (this.needThumbnailImage && schemaMeta.texture != null && schemaMeta.texture !== -1) {
        texture = yield this.parser.getDependency("texture", schemaMeta.texture);
      }
      return {
        metaVersion: "0",
        allowedUserName: schemaMeta.allowedUserName,
        author: schemaMeta.author,
        commercialUssageName: schemaMeta.commercialUssageName,
        contactInformation: schemaMeta.contactInformation,
        licenseName: schemaMeta.licenseName,
        otherLicenseUrl: schemaMeta.otherLicenseUrl,
        otherPermissionUrl: schemaMeta.otherPermissionUrl,
        reference: schemaMeta.reference,
        sexualUssageName: schemaMeta.sexualUssageName,
        texture: texture != null ? texture : void 0,
        title: schemaMeta.title,
        version: schemaMeta.version,
        violentUssageName: schemaMeta.violentUssageName
      };
    });
  }
  _extractGLTFImage(index) {
    return __async2(this, null, function* () {
      var _a;
      const json = this.parser.json;
      const source = (_a = json.images) == null ? void 0 : _a[index];
      if (source == null) {
        console.warn(
          `VRMMetaLoaderPlugin: Attempt to use images[${index}] of glTF as a thumbnail but the image doesn't exist`
        );
        return null;
      }
      let sourceURI = source.uri;
      if (source.bufferView != null) {
        const bufferView = yield this.parser.getDependency("bufferView", source.bufferView);
        const blob = new Blob([bufferView], { type: source.mimeType });
        sourceURI = URL.createObjectURL(blob);
      }
      if (sourceURI == null) {
        console.warn(
          `VRMMetaLoaderPlugin: Attempt to use images[${index}] of glTF as a thumbnail but the image couldn't load properly`
        );
        return null;
      }
      const loader = new THREE16.ImageLoader();
      return yield loader.loadAsync(resolveURL(sourceURI, this.parser.options.path)).catch((error) => {
        console.error(error);
        console.warn("VRMMetaLoaderPlugin: Failed to load a thumbnail image");
        return null;
      });
    });
  }
};
var VRMCore = class {
  /**
   * Create a new VRM instance.
   *
   * @param params {@link VRMParameters} that represents components of the VRM
   */
  constructor(params) {
    this.scene = params.scene;
    this.meta = params.meta;
    this.humanoid = params.humanoid;
    this.expressionManager = params.expressionManager;
    this.firstPerson = params.firstPerson;
    this.lookAt = params.lookAt;
  }
  /**
   * **You need to call this on your update loop.**
   *
   * This function updates every VRM components.
   *
   * @param delta deltaTime
   */
  update(delta) {
    this.humanoid.update();
    if (this.lookAt) {
      this.lookAt.update(delta);
    }
    if (this.expressionManager) {
      this.expressionManager.update();
    }
  }
};
var VRMCoreLoaderPlugin = class {
  get name() {
    return "VRMC_vrm";
  }
  constructor(parser, options) {
    var _a, _b, _c, _d, _e;
    this.parser = parser;
    const helperRoot = options == null ? void 0 : options.helperRoot;
    const autoUpdateHumanBones = options == null ? void 0 : options.autoUpdateHumanBones;
    this.expressionPlugin = (_a = options == null ? void 0 : options.expressionPlugin) != null ? _a : new VRMExpressionLoaderPlugin(parser);
    this.firstPersonPlugin = (_b = options == null ? void 0 : options.firstPersonPlugin) != null ? _b : new VRMFirstPersonLoaderPlugin(parser);
    this.humanoidPlugin = (_c = options == null ? void 0 : options.humanoidPlugin) != null ? _c : new VRMHumanoidLoaderPlugin(parser, { helperRoot, autoUpdateHumanBones });
    this.lookAtPlugin = (_d = options == null ? void 0 : options.lookAtPlugin) != null ? _d : new VRMLookAtLoaderPlugin(parser, { helperRoot });
    this.metaPlugin = (_e = options == null ? void 0 : options.metaPlugin) != null ? _e : new VRMMetaLoaderPlugin(parser);
  }
  afterRoot(gltf) {
    return __async2(this, null, function* () {
      yield this.metaPlugin.afterRoot(gltf);
      yield this.humanoidPlugin.afterRoot(gltf);
      yield this.expressionPlugin.afterRoot(gltf);
      yield this.lookAtPlugin.afterRoot(gltf);
      yield this.firstPersonPlugin.afterRoot(gltf);
      const meta = gltf.userData.vrmMeta;
      const humanoid = gltf.userData.vrmHumanoid;
      if (meta && humanoid) {
        const vrmCore = new VRMCore({
          scene: gltf.scene,
          expressionManager: gltf.userData.vrmExpressionManager,
          firstPerson: gltf.userData.vrmFirstPerson,
          humanoid,
          lookAt: gltf.userData.vrmLookAt,
          meta
        });
        gltf.userData.vrmCore = vrmCore;
      }
    });
  }
};

// src/VRM.ts
var VRM = class extends VRMCore {
  /**
   * Create a new VRM instance.
   *
   * @param params {@link VRMParameters} that represents components of the VRM
   */
  constructor(params) {
    super(params);
    this.materials = params.materials;
    this.springBoneManager = params.springBoneManager;
    this.nodeConstraintManager = params.nodeConstraintManager;
  }
  /**
   * **You need to call this on your update loop.**
   *
   * This function updates every VRM components.
   *
   * @param delta deltaTime
   */
  update(delta) {
    super.update(delta);
    if (this.nodeConstraintManager) {
      this.nodeConstraintManager.update();
    }
    if (this.springBoneManager) {
      this.springBoneManager.update(delta);
    }
    if (this.materials) {
      this.materials.forEach((material) => {
        if (material.update) {
          material.update(delta);
        }
      });
    }
  }
};

// ../three-vrm-materials-mtoon/lib/three-vrm-materials-mtoon.module.js
var THREE52 = __toESM(require("three"), 1);
var THREE22 = __toESM(require("three"), 1);
var THREE17 = __toESM(require("three"), 1);
var THREE42 = __toESM(require("three"), 1);
var THREE32 = __toESM(require("three"), 1);
var __defProp2 = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp2.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __async3 = (__this, __arguments, generator) => {
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
var colorSpaceEncodingMap = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "": 3e3,
  srgb: 3001
};
function setTextureColorSpace(texture, colorSpace) {
  if (parseInt(THREE17.REVISION, 10) >= 152) {
    texture.colorSpace = colorSpace;
  } else {
    texture.encoding = colorSpaceEncodingMap[colorSpace];
  }
}
var GLTFMToonMaterialParamsAssignHelper = class {
  get pending() {
    return Promise.all(this._pendings);
  }
  constructor(parser, materialParams) {
    this._parser = parser;
    this._materialParams = materialParams;
    this._pendings = [];
  }
  assignPrimitive(key, value) {
    if (value != null) {
      this._materialParams[key] = value;
    }
  }
  assignColor(key, value, convertSRGBToLinear) {
    if (value != null) {
      const color = new THREE22.Color().fromArray(value);
      if (convertSRGBToLinear) {
        color.convertSRGBToLinear();
      }
      this._materialParams[key] = color;
    }
  }
  assignTexture(key, schemaTexture, isColorTexture) {
    return __async3(this, null, function* () {
      const promise = (() => __async3(this, null, function* () {
        if (schemaTexture != null) {
          const texture = yield this._parser.assignTexture(this._materialParams, key, schemaTexture);
          if (texture == null) {
            console.warn(
              "GLTFMToonMaterialParamsAssignHelper: Failed to load texture. The rendering result may be wrong"
            );
            return;
          }
          if (isColorTexture) {
            setTextureColorSpace(texture, "srgb");
          }
        }
      }))();
      this._pendings.push(promise);
      return promise;
    });
  }
  assignTextureByIndex(key, textureIndex, isColorTexture) {
    return __async3(this, null, function* () {
      return this.assignTexture(key, textureIndex != null ? { index: textureIndex } : void 0, isColorTexture);
    });
  }
};
var mtoon_default = "// #define PHONG\n\nvarying vec3 vViewPosition;\n\n#ifndef FLAT_SHADED\n  varying vec3 vNormal;\n#endif\n\n#include <common>\n\n// #include <uv_pars_vertex>\n#ifdef MTOON_USE_UV\n  varying vec2 vUv;\n\n  // COMPAT: pre-r151 uses a common uvTransform\n  #if THREE_VRM_THREE_REVISION < 151\n    uniform mat3 uvTransform;\n  #endif\n#endif\n\n// #include <uv2_pars_vertex>\n// COMAPT: pre-r151 uses uv2 for lightMap and aoMap\n#if THREE_VRM_THREE_REVISION < 151\n  #if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n    attribute vec2 uv2;\n    varying vec2 vUv2;\n    uniform mat3 uv2Transform;\n  #endif\n#endif\n\n// #include <displacementmap_pars_vertex>\n// #include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\n#ifdef USE_OUTLINEWIDTHMULTIPLYTEXTURE\n  uniform sampler2D outlineWidthMultiplyTexture;\n  uniform mat3 outlineWidthMultiplyTextureUvTransform;\n#endif\n\nuniform float outlineWidthFactor;\n\nvoid main() {\n\n  // #include <uv_vertex>\n  #ifdef MTOON_USE_UV\n    // COMPAT: pre-r151 uses a common uvTransform\n    #if THREE_VRM_THREE_REVISION >= 151\n      vUv = uv;\n    #else\n      vUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n    #endif\n  #endif\n\n  // #include <uv2_vertex>\n  // COMAPT: pre-r151 uses uv2 for lightMap and aoMap\n  #if THREE_VRM_THREE_REVISION < 151\n    #if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n      vUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;\n    #endif\n  #endif\n\n  #include <color_vertex>\n\n  #include <beginnormal_vertex>\n  #include <morphnormal_vertex>\n  #include <skinbase_vertex>\n  #include <skinnormal_vertex>\n\n  // we need this to compute the outline properly\n  objectNormal = normalize( objectNormal );\n\n  #include <defaultnormal_vertex>\n\n  #ifndef FLAT_SHADED // Normal computed with derivatives when FLAT_SHADED\n    vNormal = normalize( transformedNormal );\n  #endif\n\n  #include <begin_vertex>\n\n  #include <morphtarget_vertex>\n  #include <skinning_vertex>\n  // #include <displacementmap_vertex>\n  #include <project_vertex>\n  #include <logdepthbuf_vertex>\n  #include <clipping_planes_vertex>\n\n  vViewPosition = - mvPosition.xyz;\n\n  #ifdef OUTLINE\n    float worldNormalLength = length( transformedNormal );\n    vec3 outlineOffset = outlineWidthFactor * worldNormalLength * objectNormal;\n\n    #ifdef USE_OUTLINEWIDTHMULTIPLYTEXTURE\n      vec2 outlineWidthMultiplyTextureUv = ( outlineWidthMultiplyTextureUvTransform * vec3( vUv, 1 ) ).xy;\n      float outlineTex = texture2D( outlineWidthMultiplyTexture, outlineWidthMultiplyTextureUv ).g;\n      outlineOffset *= outlineTex;\n    #endif\n\n    #ifdef OUTLINE_WIDTH_SCREEN\n      outlineOffset *= vViewPosition.z / projectionMatrix[ 1 ].y;\n    #endif\n\n    gl_Position = projectionMatrix * modelViewMatrix * vec4( outlineOffset + transformed, 1.0 );\n\n    gl_Position.z += 1E-6 * gl_Position.w; // anti-artifact magic\n  #endif\n\n  #include <worldpos_vertex>\n  // #include <envmap_vertex>\n  #include <shadowmap_vertex>\n  #include <fog_vertex>\n\n}";
var mtoon_default2 = "// #define PHONG\n\nuniform vec3 litFactor;\n\nuniform float opacity;\n\nuniform vec3 shadeColorFactor;\n#ifdef USE_SHADEMULTIPLYTEXTURE\n  uniform sampler2D shadeMultiplyTexture;\n  uniform mat3 shadeMultiplyTextureUvTransform;\n#endif\n\nuniform float shadingShiftFactor;\nuniform float shadingToonyFactor;\n\n#ifdef USE_SHADINGSHIFTTEXTURE\n  uniform sampler2D shadingShiftTexture;\n  uniform mat3 shadingShiftTextureUvTransform;\n  uniform float shadingShiftTextureScale;\n#endif\n\nuniform float giEqualizationFactor;\n\nuniform vec3 parametricRimColorFactor;\n#ifdef USE_RIMMULTIPLYTEXTURE\n  uniform sampler2D rimMultiplyTexture;\n  uniform mat3 rimMultiplyTextureUvTransform;\n#endif\nuniform float rimLightingMixFactor;\nuniform float parametricRimFresnelPowerFactor;\nuniform float parametricRimLiftFactor;\n\n#ifdef USE_MATCAPTEXTURE\n  uniform vec3 matcapFactor;\n  uniform sampler2D matcapTexture;\n  uniform mat3 matcapTextureUvTransform;\n#endif\n\nuniform vec3 emissive;\nuniform float emissiveIntensity;\n\nuniform vec3 outlineColorFactor;\nuniform float outlineLightingMixFactor;\n\n#ifdef USE_UVANIMATIONMASKTEXTURE\n  uniform sampler2D uvAnimationMaskTexture;\n  uniform mat3 uvAnimationMaskTextureUvTransform;\n#endif\n\nuniform float uvAnimationScrollXOffset;\nuniform float uvAnimationScrollYOffset;\nuniform float uvAnimationRotationPhase;\n\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n\n// #include <uv_pars_fragment>\n#if ( defined( MTOON_USE_UV ) && !defined( MTOON_UVS_VERTEX_ONLY ) )\n  varying vec2 vUv;\n#endif\n\n// #include <uv2_pars_fragment>\n// COMAPT: pre-r151 uses uv2 for lightMap and aoMap\n#if THREE_VRM_THREE_REVISION < 151\n  #if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n    varying vec2 vUv2;\n  #endif\n#endif\n\n#include <map_pars_fragment>\n\n#ifdef USE_MAP\n  uniform mat3 mapUvTransform;\n#endif\n\n// #include <alphamap_pars_fragment>\n\n#include <alphatest_pars_fragment>\n\n#include <aomap_pars_fragment>\n// #include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n\n#ifdef USE_EMISSIVEMAP\n  uniform mat3 emissiveMapUvTransform;\n#endif\n\n// #include <envmap_common_pars_fragment>\n// #include <envmap_pars_fragment>\n// #include <cube_uv_reflection_fragment>\n#include <fog_pars_fragment>\n\n// #include <bsdfs>\n// COMPAT: pre-r151 doesn't have BRDF_Lambert in <common>\n#if THREE_VRM_THREE_REVISION < 151\n  vec3 BRDF_Lambert( const in vec3 diffuseColor ) {\n    return RECIPROCAL_PI * diffuseColor;\n  }\n#endif\n\n#include <lights_pars_begin>\n\n#include <normal_pars_fragment>\n\n// #include <lights_phong_pars_fragment>\nvarying vec3 vViewPosition;\n\nstruct MToonMaterial {\n  vec3 diffuseColor;\n  vec3 shadeColor;\n  float shadingShift;\n};\n\nfloat linearstep( float a, float b, float t ) {\n  return clamp( ( t - a ) / ( b - a ), 0.0, 1.0 );\n}\n\n/**\n * Convert NdotL into toon shading factor using shadingShift and shadingToony\n */\nfloat getShading(\n  const in float dotNL,\n  const in float shadow,\n  const in float shadingShift\n) {\n  float shading = dotNL;\n  shading = shading + shadingShift;\n  shading = linearstep( -1.0 + shadingToonyFactor, 1.0 - shadingToonyFactor, shading );\n  shading *= shadow;\n  return shading;\n}\n\n/**\n * Mix diffuseColor and shadeColor using shading factor and light color\n */\nvec3 getDiffuse(\n  const in MToonMaterial material,\n  const in float shading,\n  in vec3 lightColor\n) {\n  #ifdef DEBUG_LITSHADERATE\n    return vec3( BRDF_Lambert( shading * lightColor ) );\n  #endif\n\n  vec3 col = lightColor * BRDF_Lambert( mix( material.shadeColor, material.diffuseColor, shading ) );\n\n  // The \"comment out if you want to PBR absolutely\" line\n  #ifdef V0_COMPAT_SHADE\n    col = min( col, material.diffuseColor );\n  #endif\n\n  return col;\n}\n\n// COMPAT: pre-r156 uses a struct GeometricContext\n#if THREE_VRM_THREE_REVISION >= 157\n  void RE_Direct_MToon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in MToonMaterial material, const in float shadow, inout ReflectedLight reflectedLight ) {\n    float dotNL = clamp( dot( geometryNormal, directLight.direction ), -1.0, 1.0 );\n    vec3 irradiance = directLight.color;\n\n    // directSpecular will be used for rim lighting, not an actual specular\n    reflectedLight.directSpecular += irradiance;\n\n    irradiance *= dotNL;\n\n    float shading = getShading( dotNL, shadow, material.shadingShift );\n\n    // toon shaded diffuse\n    reflectedLight.directDiffuse += getDiffuse( material, shading, directLight.color );\n  }\n\n  void RE_IndirectDiffuse_MToon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in MToonMaterial material, inout ReflectedLight reflectedLight ) {\n    // indirect diffuse will use diffuseColor, no shadeColor involved\n    reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n\n    // directSpecular will be used for rim lighting, not an actual specular\n    reflectedLight.directSpecular += irradiance;\n  }\n#else\n  void RE_Direct_MToon( const in IncidentLight directLight, const in GeometricContext geometry, const in MToonMaterial material, const in float shadow, inout ReflectedLight reflectedLight ) {\n    float dotNL = clamp( dot( geometry.normal, directLight.direction ), -1.0, 1.0 );\n    vec3 irradiance = directLight.color;\n\n    // directSpecular will be used for rim lighting, not an actual specular\n    reflectedLight.directSpecular += irradiance;\n\n    irradiance *= dotNL;\n\n    float shading = getShading( dotNL, shadow, material.shadingShift );\n\n    // toon shaded diffuse\n    reflectedLight.directDiffuse += getDiffuse( material, shading, directLight.color );\n  }\n\n  void RE_IndirectDiffuse_MToon( const in vec3 irradiance, const in GeometricContext geometry, const in MToonMaterial material, inout ReflectedLight reflectedLight ) {\n    // indirect diffuse will use diffuseColor, no shadeColor involved\n    reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n\n    // directSpecular will be used for rim lighting, not an actual specular\n    reflectedLight.directSpecular += irradiance;\n  }\n#endif\n\n#define RE_Direct RE_Direct_MToon\n#define RE_IndirectDiffuse RE_IndirectDiffuse_MToon\n#define Material_LightProbeLOD( material ) (0)\n\n#include <shadowmap_pars_fragment>\n// #include <bumpmap_pars_fragment>\n\n// #include <normalmap_pars_fragment>\n#ifdef USE_NORMALMAP\n\n  uniform sampler2D normalMap;\n  uniform mat3 normalMapUvTransform;\n  uniform vec2 normalScale;\n\n#endif\n\n// COMPAT: pre-r151\n// USE_NORMALMAP_OBJECTSPACE used to be OBJECTSPACE_NORMALMAP in pre-r151\n#if defined( USE_NORMALMAP_OBJECTSPACE ) || defined( OBJECTSPACE_NORMALMAP )\n\n  uniform mat3 normalMatrix;\n\n#endif\n\n// COMPAT: pre-r151\n// USE_NORMALMAP_TANGENTSPACE used to be TANGENTSPACE_NORMALMAP in pre-r151\n#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( TANGENTSPACE_NORMALMAP ) )\n\n  // Per-Pixel Tangent Space Normal Mapping\n  // http://hacksoflife.blogspot.ch/2009/11/per-pixel-tangent-space-normal-mapping.html\n\n  // three-vrm specific change: it requires `uv` as an input in order to support uv scrolls\n\n  // Temporary compat against shader change @ Three.js r126, r151\n  #if THREE_VRM_THREE_REVISION >= 151\n\n    mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {\n\n      vec3 q0 = dFdx( eye_pos.xyz );\n      vec3 q1 = dFdy( eye_pos.xyz );\n      vec2 st0 = dFdx( uv.st );\n      vec2 st1 = dFdy( uv.st );\n\n      vec3 N = surf_norm;\n\n      vec3 q1perp = cross( q1, N );\n      vec3 q0perp = cross( N, q0 );\n\n      vec3 T = q1perp * st0.x + q0perp * st1.x;\n      vec3 B = q1perp * st0.y + q0perp * st1.y;\n\n      float det = max( dot( T, T ), dot( B, B ) );\n      float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );\n\n      return mat3( T * scale, B * scale, N );\n\n    }\n\n  #else\n\n    vec3 perturbNormal2Arb( vec2 uv, vec3 eye_pos, vec3 surf_norm, vec3 mapN, float faceDirection ) {\n\n      vec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );\n      vec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );\n      vec2 st0 = dFdx( uv.st );\n      vec2 st1 = dFdy( uv.st );\n\n      vec3 N = normalize( surf_norm );\n\n      vec3 q1perp = cross( q1, N );\n      vec3 q0perp = cross( N, q0 );\n\n      vec3 T = q1perp * st0.x + q0perp * st1.x;\n      vec3 B = q1perp * st0.y + q0perp * st1.y;\n\n      // three-vrm specific change: Workaround for the issue that happens when delta of uv = 0.0\n      // TODO: Is this still required? Or shall I make a PR about it?\n      if ( length( T ) == 0.0 || length( B ) == 0.0 ) {\n        return surf_norm;\n      }\n\n      float det = max( dot( T, T ), dot( B, B ) );\n      float scale = ( det == 0.0 ) ? 0.0 : faceDirection * inversesqrt( det );\n\n      return normalize( T * ( mapN.x * scale ) + B * ( mapN.y * scale ) + N * mapN.z );\n\n    }\n\n  #endif\n\n#endif\n\n// #include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\n// == post correction ==========================================================\nvoid postCorrection() {\n  #include <tonemapping_fragment>\n  #include <colorspace_fragment>\n  #include <fog_fragment>\n  #include <premultiplied_alpha_fragment>\n  #include <dithering_fragment>\n}\n\n// == main procedure ===========================================================\nvoid main() {\n  #include <clipping_planes_fragment>\n\n  vec2 uv = vec2(0.5, 0.5);\n\n  #if ( defined( MTOON_USE_UV ) && !defined( MTOON_UVS_VERTEX_ONLY ) )\n    uv = vUv;\n\n    float uvAnimMask = 1.0;\n    #ifdef USE_UVANIMATIONMASKTEXTURE\n      vec2 uvAnimationMaskTextureUv = ( uvAnimationMaskTextureUvTransform * vec3( uv, 1 ) ).xy;\n      uvAnimMask = texture2D( uvAnimationMaskTexture, uvAnimationMaskTextureUv ).b;\n    #endif\n\n    float uvRotCos = cos( uvAnimationRotationPhase * uvAnimMask );\n    float uvRotSin = sin( uvAnimationRotationPhase * uvAnimMask );\n    uv = mat2( uvRotCos, -uvRotSin, uvRotSin, uvRotCos ) * ( uv - 0.5 ) + 0.5;\n    uv = uv + vec2( uvAnimationScrollXOffset, uvAnimationScrollYOffset ) * uvAnimMask;\n  #endif\n\n  #ifdef DEBUG_UV\n    gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );\n    #if ( defined( MTOON_USE_UV ) && !defined( MTOON_UVS_VERTEX_ONLY ) )\n      gl_FragColor = vec4( uv, 0.0, 1.0 );\n    #endif\n    return;\n  #endif\n\n  vec4 diffuseColor = vec4( litFactor, opacity );\n  ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n  vec3 totalEmissiveRadiance = emissive * emissiveIntensity;\n\n  #include <logdepthbuf_fragment>\n\n  // #include <map_fragment>\n  #ifdef USE_MAP\n    vec2 mapUv = ( mapUvTransform * vec3( uv, 1 ) ).xy;\n    vec4 sampledDiffuseColor = texture2D( map, mapUv );\n    #ifdef DECODE_VIDEO_TEXTURE\n      sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );\n    #endif\n    diffuseColor *= sampledDiffuseColor;\n  #endif\n\n  // #include <color_fragment>\n  #if ( defined( USE_COLOR ) && !defined( IGNORE_VERTEX_COLOR ) )\n    diffuseColor.rgb *= vColor;\n  #endif\n\n  // #include <alphamap_fragment>\n\n  #include <alphatest_fragment>\n\n  // #include <specularmap_fragment>\n\n  // #include <normal_fragment_begin>\n  float faceDirection = gl_FrontFacing ? 1.0 : -1.0;\n\n  #ifdef FLAT_SHADED\n\n    vec3 fdx = dFdx( vViewPosition );\n    vec3 fdy = dFdy( vViewPosition );\n    vec3 normal = normalize( cross( fdx, fdy ) );\n\n  #else\n\n    vec3 normal = normalize( vNormal );\n\n    #ifdef DOUBLE_SIDED\n\n      normal *= faceDirection;\n\n    #endif\n\n  #endif\n\n  #ifdef USE_NORMALMAP\n\n    vec2 normalMapUv = ( normalMapUvTransform * vec3( uv, 1 ) ).xy;\n\n  #endif\n\n  #ifdef USE_NORMALMAP_TANGENTSPACE\n\n    #ifdef USE_TANGENT\n\n      mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );\n\n    #else\n\n      mat3 tbn = getTangentFrame( - vViewPosition, normal, normalMapUv );\n\n    #endif\n\n    #if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )\n\n      tbn[0] *= faceDirection;\n      tbn[1] *= faceDirection;\n\n    #endif\n\n  #endif\n\n  #ifdef USE_CLEARCOAT_NORMALMAP\n\n    #ifdef USE_TANGENT\n\n      mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );\n\n    #else\n\n      mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );\n\n    #endif\n\n    #if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )\n\n      tbn2[0] *= faceDirection;\n      tbn2[1] *= faceDirection;\n\n    #endif\n\n  #endif\n\n  // non perturbed normal for clearcoat among others\n\n  vec3 nonPerturbedNormal = normal;\n\n  #ifdef OUTLINE\n    normal *= -1.0;\n  #endif\n\n  // #include <normal_fragment_maps>\n\n  // COMPAT: pre-r151\n  // USE_NORMALMAP_OBJECTSPACE used to be OBJECTSPACE_NORMALMAP in pre-r151\n  #if defined( USE_NORMALMAP_OBJECTSPACE ) || defined( OBJECTSPACE_NORMALMAP )\n\n    normal = texture2D( normalMap, normalMapUv ).xyz * 2.0 - 1.0; // overrides both flatShading and attribute normals\n\n    #ifdef FLIP_SIDED\n\n      normal = - normal;\n\n    #endif\n\n    #ifdef DOUBLE_SIDED\n\n      normal = normal * faceDirection;\n\n    #endif\n\n    normal = normalize( normalMatrix * normal );\n\n  // COMPAT: pre-r151\n  // USE_NORMALMAP_TANGENTSPACE used to be TANGENTSPACE_NORMALMAP in pre-r151\n  #elif defined( USE_NORMALMAP_TANGENTSPACE ) || defined( TANGENTSPACE_NORMALMAP )\n\n    vec3 mapN = texture2D( normalMap, normalMapUv ).xyz * 2.0 - 1.0;\n    mapN.xy *= normalScale;\n\n    // COMPAT: pre-r151\n    #if THREE_VRM_THREE_REVISION >= 151 || defined( USE_TANGENT )\n\n      normal = normalize( tbn * mapN );\n\n    #else\n\n      normal = perturbNormal2Arb( uv, -vViewPosition, normal, mapN, faceDirection );\n\n    #endif\n\n  #endif\n\n  // #include <emissivemap_fragment>\n  #ifdef USE_EMISSIVEMAP\n    vec2 emissiveMapUv = ( emissiveMapUvTransform * vec3( uv, 1 ) ).xy;\n    totalEmissiveRadiance *= texture2D( emissiveMap, emissiveMapUv ).rgb;\n  #endif\n\n  #ifdef DEBUG_NORMAL\n    gl_FragColor = vec4( 0.5 + 0.5 * normal, 1.0 );\n    return;\n  #endif\n\n  // -- MToon: lighting --------------------------------------------------------\n  // accumulation\n  // #include <lights_phong_fragment>\n  MToonMaterial material;\n\n  material.diffuseColor = diffuseColor.rgb;\n\n  material.shadeColor = shadeColorFactor;\n  #ifdef USE_SHADEMULTIPLYTEXTURE\n    vec2 shadeMultiplyTextureUv = ( shadeMultiplyTextureUvTransform * vec3( uv, 1 ) ).xy;\n    material.shadeColor *= texture2D( shadeMultiplyTexture, shadeMultiplyTextureUv ).rgb;\n  #endif\n\n  #if ( defined( USE_COLOR ) && !defined( IGNORE_VERTEX_COLOR ) )\n    material.shadeColor.rgb *= vColor;\n  #endif\n\n  material.shadingShift = shadingShiftFactor;\n  #ifdef USE_SHADINGSHIFTTEXTURE\n    vec2 shadingShiftTextureUv = ( shadingShiftTextureUvTransform * vec3( uv, 1 ) ).xy;\n    material.shadingShift += texture2D( shadingShiftTexture, shadingShiftTextureUv ).r * shadingShiftTextureScale;\n  #endif\n\n  // #include <lights_fragment_begin>\n\n  // MToon Specific changes:\n  // Since we want to take shadows into account of shading instead of irradiance,\n  // we had to modify the codes that multiplies the results of shadowmap into color of direct lights.\n\n  // COMPAT: pre-r156 uses a struct GeometricContext\n  #if THREE_VRM_THREE_REVISION >= 157\n    vec3 geometryPosition = - vViewPosition;\n    vec3 geometryNormal = normal;\n    vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );\n\n    vec3 geometryClearcoatNormal;\n\n    #ifdef USE_CLEARCOAT\n\n      geometryClearcoatNormal = clearcoatNormal;\n\n    #endif\n  #else\n    GeometricContext geometry;\n\n    geometry.position = - vViewPosition;\n    geometry.normal = normal;\n    geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );\n\n    #ifdef USE_CLEARCOAT\n\n      geometry.clearcoatNormal = clearcoatNormal;\n\n    #endif\n  #endif\n\n  IncidentLight directLight;\n\n  // since these variables will be used in unrolled loop, we have to define in prior\n  float shadow;\n\n  #if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\n    PointLight pointLight;\n    #if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0\n    PointLightShadow pointLightShadow;\n    #endif\n\n    #pragma unroll_loop_start\n    for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\n      pointLight = pointLights[ i ];\n\n      // COMPAT: pre-r156 uses a struct GeometricContext\n      #if THREE_VRM_THREE_REVISION >= 157\n        getPointLightInfo( pointLight, geometryPosition, directLight );\n      #else\n        getPointLightInfo( pointLight, geometry, directLight );\n      #endif\n\n      shadow = 1.0;\n      #if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )\n      pointLightShadow = pointLightShadows[ i ];\n      // COMPAT: pre-r166\n      // r166 introduced shadowIntensity\n      #if THREE_VRM_THREE_REVISION >= 166\n        shadow = all( bvec2( directLight.visible, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;\n      #else\n        shadow = all( bvec2( directLight.visible, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;\n      #endif\n      #endif\n\n      // COMPAT: pre-r156 uses a struct GeometricContext\n      #if THREE_VRM_THREE_REVISION >= 157\n        RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, shadow, reflectedLight );\n      #else\n        RE_Direct( directLight, geometry, material, shadow, reflectedLight );\n      #endif\n\n    }\n    #pragma unroll_loop_end\n\n  #endif\n\n  #if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\n    SpotLight spotLight;\n    // COMPAT: pre-r144 uses NUM_SPOT_LIGHT_SHADOWS, r144+ uses NUM_SPOT_LIGHT_COORDS\n    #if THREE_VRM_THREE_REVISION >= 144\n      #if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_COORDS > 0\n      SpotLightShadow spotLightShadow;\n      #endif\n    #elif defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0\n    SpotLightShadow spotLightShadow;\n    #endif\n\n    #pragma unroll_loop_start\n    for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\n      spotLight = spotLights[ i ];\n\n      // COMPAT: pre-r156 uses a struct GeometricContext\n      #if THREE_VRM_THREE_REVISION >= 157\n        getSpotLightInfo( spotLight, geometryPosition, directLight );\n      #else\n        getSpotLightInfo( spotLight, geometry, directLight );\n      #endif\n\n      shadow = 1.0;\n      // COMPAT: pre-r144 uses NUM_SPOT_LIGHT_SHADOWS and vSpotShadowCoord, r144+ uses NUM_SPOT_LIGHT_COORDS and vSpotLightCoord\n      // COMPAT: pre-r166 does not have shadowIntensity, r166+ has shadowIntensity\n      #if THREE_VRM_THREE_REVISION >= 166\n        #if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_COORDS )\n        spotLightShadow = spotLightShadows[ i ];\n        shadow = all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;\n        #endif\n      #elif THREE_VRM_THREE_REVISION >= 144\n        #if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_COORDS )\n        spotLightShadow = spotLightShadows[ i ];\n        shadow = all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;\n        #endif\n      #elif defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n      spotLightShadow = spotLightShadows[ i ];\n      shadow = all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n      #endif\n\n      // COMPAT: pre-r156 uses a struct GeometricContext\n      #if THREE_VRM_THREE_REVISION >= 157\n        RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, shadow, reflectedLight );\n      #else\n        RE_Direct( directLight, geometry, material, shadow, reflectedLight );\n      #endif\n\n    }\n    #pragma unroll_loop_end\n\n  #endif\n\n  #if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\n    DirectionalLight directionalLight;\n    #if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0\n    DirectionalLightShadow directionalLightShadow;\n    #endif\n\n    #pragma unroll_loop_start\n    for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\n      directionalLight = directionalLights[ i ];\n\n      // COMPAT: pre-r156 uses a struct GeometricContext\n      #if THREE_VRM_THREE_REVISION >= 157\n        getDirectionalLightInfo( directionalLight, directLight );\n      #else\n        getDirectionalLightInfo( directionalLight, geometry, directLight );\n      #endif\n\n      shadow = 1.0;\n      #if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )\n      directionalLightShadow = directionalLightShadows[ i ];\n      // COMPAT: pre-r166\n      // r166 introduced shadowIntensity\n      #if THREE_VRM_THREE_REVISION >= 166\n        shadow = all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n      #else\n        shadow = all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n      #endif\n      #endif\n\n      // COMPAT: pre-r156 uses a struct GeometricContext\n      #if THREE_VRM_THREE_REVISION >= 157\n        RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, shadow, reflectedLight );\n      #else\n        RE_Direct( directLight, geometry, material, shadow, reflectedLight );\n      #endif\n\n    }\n    #pragma unroll_loop_end\n\n  #endif\n\n  // #if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n\n  //   RectAreaLight rectAreaLight;\n\n  //   #pragma unroll_loop_start\n  //   for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\n  //     rectAreaLight = rectAreaLights[ i ];\n  //     RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );\n\n  //   }\n  //   #pragma unroll_loop_end\n\n  // #endif\n\n  #if defined( RE_IndirectDiffuse )\n\n    vec3 iblIrradiance = vec3( 0.0 );\n\n    vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\n    // COMPAT: pre-r156 uses a struct GeometricContext\n    // COMPAT: pre-r156 doesn't have a define USE_LIGHT_PROBES\n    #if THREE_VRM_THREE_REVISION >= 157\n      #if defined( USE_LIGHT_PROBES )\n        irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );\n      #endif\n    #else\n      irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );\n    #endif\n\n    #if ( NUM_HEMI_LIGHTS > 0 )\n\n      #pragma unroll_loop_start\n      for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\n        // COMPAT: pre-r156 uses a struct GeometricContext\n        #if THREE_VRM_THREE_REVISION >= 157\n          irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );\n        #else\n          irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );\n        #endif\n\n      }\n      #pragma unroll_loop_end\n\n    #endif\n\n  #endif\n\n  // #if defined( RE_IndirectSpecular )\n\n  //   vec3 radiance = vec3( 0.0 );\n  //   vec3 clearcoatRadiance = vec3( 0.0 );\n\n  // #endif\n\n  #include <lights_fragment_maps>\n  #include <lights_fragment_end>\n\n  // modulation\n  #include <aomap_fragment>\n\n  vec3 col = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;\n\n  #ifdef DEBUG_LITSHADERATE\n    gl_FragColor = vec4( col, diffuseColor.a );\n    postCorrection();\n    return;\n  #endif\n\n  // -- MToon: rim lighting -----------------------------------------\n  vec3 viewDir = normalize( vViewPosition );\n\n  #ifndef PHYSICALLY_CORRECT_LIGHTS\n    reflectedLight.directSpecular /= PI;\n  #endif\n  vec3 rimMix = mix( vec3( 1.0 ), reflectedLight.directSpecular, rimLightingMixFactor );\n\n  vec3 rim = parametricRimColorFactor * pow( saturate( 1.0 - dot( viewDir, normal ) + parametricRimLiftFactor ), parametricRimFresnelPowerFactor );\n\n  #ifdef USE_MATCAPTEXTURE\n    {\n      vec3 x = normalize( vec3( viewDir.z, 0.0, -viewDir.x ) );\n      vec3 y = cross( viewDir, x ); // guaranteed to be normalized\n      vec2 sphereUv = 0.5 + 0.5 * vec2( dot( x, normal ), -dot( y, normal ) );\n      sphereUv = ( matcapTextureUvTransform * vec3( sphereUv, 1 ) ).xy;\n      vec3 matcap = texture2D( matcapTexture, sphereUv ).rgb;\n      rim += matcapFactor * matcap;\n    }\n  #endif\n\n  #ifdef USE_RIMMULTIPLYTEXTURE\n    vec2 rimMultiplyTextureUv = ( rimMultiplyTextureUvTransform * vec3( uv, 1 ) ).xy;\n    rim *= texture2D( rimMultiplyTexture, rimMultiplyTextureUv ).rgb;\n  #endif\n\n  col += rimMix * rim;\n\n  // -- MToon: Emission --------------------------------------------------------\n  col += totalEmissiveRadiance;\n\n  // #include <envmap_fragment>\n\n  // -- Almost done! -----------------------------------------------------------\n  #if defined( OUTLINE )\n    col = outlineColorFactor.rgb * mix( vec3( 1.0 ), col, outlineLightingMixFactor );\n  #endif\n\n  #ifdef OPAQUE\n    diffuseColor.a = 1.0;\n  #endif\n\n  gl_FragColor = vec4( col, diffuseColor.a );\n  postCorrection();\n}\n";
var MToonMaterialDebugMode = {
  /**
   * Render normally.
   */
  None: "none",
  /**
   * Visualize normals of the surface.
   */
  Normal: "normal",
  /**
   * Visualize lit/shade of the surface.
   */
  LitShadeRate: "litShadeRate",
  /**
   * Visualize UV of the surface.
   */
  UV: "uv"
};
var MToonMaterialOutlineWidthMode = {
  None: "none",
  WorldCoordinates: "worldCoordinates",
  ScreenCoordinates: "screenCoordinates"
};
var encodingColorSpaceMap = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  3e3: "",
  // eslint-disable-next-line @typescript-eslint/naming-convention
  3001: "srgb"
};
function getTextureColorSpace(texture) {
  if (parseInt(THREE32.REVISION, 10) >= 152) {
    return texture.colorSpace;
  } else {
    return encodingColorSpaceMap[texture.encoding];
  }
}
var MToonMaterial = class extends THREE42.ShaderMaterial {
  constructor(parameters = {}) {
    var _a;
    super({ vertexShader: mtoon_default, fragmentShader: mtoon_default2 });
    this.uvAnimationScrollXSpeedFactor = 0;
    this.uvAnimationScrollYSpeedFactor = 0;
    this.uvAnimationRotationSpeedFactor = 0;
    this.fog = true;
    this.normalMapType = THREE42.TangentSpaceNormalMap;
    this._ignoreVertexColor = true;
    this._v0CompatShade = false;
    this._debugMode = MToonMaterialDebugMode.None;
    this._outlineWidthMode = MToonMaterialOutlineWidthMode.None;
    this._isOutline = false;
    if (parameters.transparentWithZWrite) {
      parameters.depthWrite = true;
    }
    delete parameters.transparentWithZWrite;
    parameters.fog = true;
    parameters.lights = true;
    parameters.clipping = true;
    this.uniforms = THREE42.UniformsUtils.merge([
      THREE42.UniformsLib.common,
      // map
      THREE42.UniformsLib.normalmap,
      // normalMap
      THREE42.UniformsLib.emissivemap,
      // emissiveMap
      THREE42.UniformsLib.fog,
      THREE42.UniformsLib.lights,
      {
        litFactor: { value: new THREE42.Color(1, 1, 1) },
        mapUvTransform: { value: new THREE42.Matrix3() },
        colorAlpha: { value: 1 },
        normalMapUvTransform: { value: new THREE42.Matrix3() },
        shadeColorFactor: { value: new THREE42.Color(0, 0, 0) },
        shadeMultiplyTexture: { value: null },
        shadeMultiplyTextureUvTransform: { value: new THREE42.Matrix3() },
        shadingShiftFactor: { value: 0 },
        shadingShiftTexture: { value: null },
        shadingShiftTextureUvTransform: { value: new THREE42.Matrix3() },
        shadingShiftTextureScale: { value: 1 },
        shadingToonyFactor: { value: 0.9 },
        giEqualizationFactor: { value: 0.9 },
        matcapFactor: { value: new THREE42.Color(1, 1, 1) },
        matcapTexture: { value: null },
        matcapTextureUvTransform: { value: new THREE42.Matrix3() },
        parametricRimColorFactor: { value: new THREE42.Color(0, 0, 0) },
        rimMultiplyTexture: { value: null },
        rimMultiplyTextureUvTransform: { value: new THREE42.Matrix3() },
        rimLightingMixFactor: { value: 1 },
        parametricRimFresnelPowerFactor: { value: 5 },
        parametricRimLiftFactor: { value: 0 },
        emissive: { value: new THREE42.Color(0, 0, 0) },
        emissiveIntensity: { value: 1 },
        emissiveMapUvTransform: { value: new THREE42.Matrix3() },
        outlineWidthMultiplyTexture: { value: null },
        outlineWidthMultiplyTextureUvTransform: { value: new THREE42.Matrix3() },
        outlineWidthFactor: { value: 0 },
        outlineColorFactor: { value: new THREE42.Color(0, 0, 0) },
        outlineLightingMixFactor: { value: 1 },
        uvAnimationMaskTexture: { value: null },
        uvAnimationMaskTextureUvTransform: { value: new THREE42.Matrix3() },
        uvAnimationScrollXOffset: { value: 0 },
        uvAnimationScrollYOffset: { value: 0 },
        uvAnimationRotationPhase: { value: 0 }
      },
      (_a = parameters.uniforms) != null ? _a : {}
    ]);
    this.setValues(parameters);
    this._uploadUniformsWorkaround();
    this.customProgramCacheKey = () => [
      ...Object.entries(this._generateDefines()).map(([token, macro]) => `${token}:${macro}`),
      this.matcapTexture ? `matcapTextureColorSpace:${getTextureColorSpace(this.matcapTexture)}` : "",
      this.shadeMultiplyTexture ? `shadeMultiplyTextureColorSpace:${getTextureColorSpace(this.shadeMultiplyTexture)}` : "",
      this.rimMultiplyTexture ? `rimMultiplyTextureColorSpace:${getTextureColorSpace(this.rimMultiplyTexture)}` : ""
    ].join(",");
    this.onBeforeCompile = (shader) => {
      const threeRevision = parseInt(THREE42.REVISION, 10);
      const defines = Object.entries(__spreadValues(__spreadValues({}, this._generateDefines()), this.defines)).filter(([token, macro]) => !!macro).map(([token, macro]) => `#define ${token} ${macro}`).join("\n") + "\n";
      shader.vertexShader = defines + shader.vertexShader;
      shader.fragmentShader = defines + shader.fragmentShader;
      if (threeRevision < 154) {
        shader.fragmentShader = shader.fragmentShader.replace(
          "#include <colorspace_fragment>",
          "#include <encodings_fragment>"
        );
      }
    };
  }
  get color() {
    return this.uniforms.litFactor.value;
  }
  set color(value) {
    this.uniforms.litFactor.value = value;
  }
  get map() {
    return this.uniforms.map.value;
  }
  set map(value) {
    this.uniforms.map.value = value;
  }
  get normalMap() {
    return this.uniforms.normalMap.value;
  }
  set normalMap(value) {
    this.uniforms.normalMap.value = value;
  }
  get normalScale() {
    return this.uniforms.normalScale.value;
  }
  set normalScale(value) {
    this.uniforms.normalScale.value = value;
  }
  get emissive() {
    return this.uniforms.emissive.value;
  }
  set emissive(value) {
    this.uniforms.emissive.value = value;
  }
  get emissiveIntensity() {
    return this.uniforms.emissiveIntensity.value;
  }
  set emissiveIntensity(value) {
    this.uniforms.emissiveIntensity.value = value;
  }
  get emissiveMap() {
    return this.uniforms.emissiveMap.value;
  }
  set emissiveMap(value) {
    this.uniforms.emissiveMap.value = value;
  }
  get shadeColorFactor() {
    return this.uniforms.shadeColorFactor.value;
  }
  set shadeColorFactor(value) {
    this.uniforms.shadeColorFactor.value = value;
  }
  get shadeMultiplyTexture() {
    return this.uniforms.shadeMultiplyTexture.value;
  }
  set shadeMultiplyTexture(value) {
    this.uniforms.shadeMultiplyTexture.value = value;
  }
  get shadingShiftFactor() {
    return this.uniforms.shadingShiftFactor.value;
  }
  set shadingShiftFactor(value) {
    this.uniforms.shadingShiftFactor.value = value;
  }
  get shadingShiftTexture() {
    return this.uniforms.shadingShiftTexture.value;
  }
  set shadingShiftTexture(value) {
    this.uniforms.shadingShiftTexture.value = value;
  }
  get shadingShiftTextureScale() {
    return this.uniforms.shadingShiftTextureScale.value;
  }
  set shadingShiftTextureScale(value) {
    this.uniforms.shadingShiftTextureScale.value = value;
  }
  get shadingToonyFactor() {
    return this.uniforms.shadingToonyFactor.value;
  }
  set shadingToonyFactor(value) {
    this.uniforms.shadingToonyFactor.value = value;
  }
  get giEqualizationFactor() {
    return this.uniforms.giEqualizationFactor.value;
  }
  set giEqualizationFactor(value) {
    this.uniforms.giEqualizationFactor.value = value;
  }
  get matcapFactor() {
    return this.uniforms.matcapFactor.value;
  }
  set matcapFactor(value) {
    this.uniforms.matcapFactor.value = value;
  }
  get matcapTexture() {
    return this.uniforms.matcapTexture.value;
  }
  set matcapTexture(value) {
    this.uniforms.matcapTexture.value = value;
  }
  get parametricRimColorFactor() {
    return this.uniforms.parametricRimColorFactor.value;
  }
  set parametricRimColorFactor(value) {
    this.uniforms.parametricRimColorFactor.value = value;
  }
  get rimMultiplyTexture() {
    return this.uniforms.rimMultiplyTexture.value;
  }
  set rimMultiplyTexture(value) {
    this.uniforms.rimMultiplyTexture.value = value;
  }
  get rimLightingMixFactor() {
    return this.uniforms.rimLightingMixFactor.value;
  }
  set rimLightingMixFactor(value) {
    this.uniforms.rimLightingMixFactor.value = value;
  }
  get parametricRimFresnelPowerFactor() {
    return this.uniforms.parametricRimFresnelPowerFactor.value;
  }
  set parametricRimFresnelPowerFactor(value) {
    this.uniforms.parametricRimFresnelPowerFactor.value = value;
  }
  get parametricRimLiftFactor() {
    return this.uniforms.parametricRimLiftFactor.value;
  }
  set parametricRimLiftFactor(value) {
    this.uniforms.parametricRimLiftFactor.value = value;
  }
  get outlineWidthMultiplyTexture() {
    return this.uniforms.outlineWidthMultiplyTexture.value;
  }
  set outlineWidthMultiplyTexture(value) {
    this.uniforms.outlineWidthMultiplyTexture.value = value;
  }
  get outlineWidthFactor() {
    return this.uniforms.outlineWidthFactor.value;
  }
  set outlineWidthFactor(value) {
    this.uniforms.outlineWidthFactor.value = value;
  }
  get outlineColorFactor() {
    return this.uniforms.outlineColorFactor.value;
  }
  set outlineColorFactor(value) {
    this.uniforms.outlineColorFactor.value = value;
  }
  get outlineLightingMixFactor() {
    return this.uniforms.outlineLightingMixFactor.value;
  }
  set outlineLightingMixFactor(value) {
    this.uniforms.outlineLightingMixFactor.value = value;
  }
  get uvAnimationMaskTexture() {
    return this.uniforms.uvAnimationMaskTexture.value;
  }
  set uvAnimationMaskTexture(value) {
    this.uniforms.uvAnimationMaskTexture.value = value;
  }
  get uvAnimationScrollXOffset() {
    return this.uniforms.uvAnimationScrollXOffset.value;
  }
  set uvAnimationScrollXOffset(value) {
    this.uniforms.uvAnimationScrollXOffset.value = value;
  }
  get uvAnimationScrollYOffset() {
    return this.uniforms.uvAnimationScrollYOffset.value;
  }
  set uvAnimationScrollYOffset(value) {
    this.uniforms.uvAnimationScrollYOffset.value = value;
  }
  get uvAnimationRotationPhase() {
    return this.uniforms.uvAnimationRotationPhase.value;
  }
  set uvAnimationRotationPhase(value) {
    this.uniforms.uvAnimationRotationPhase.value = value;
  }
  /**
   * When this is `true`, vertex colors will be ignored.
   * `true` by default.
   */
  get ignoreVertexColor() {
    return this._ignoreVertexColor;
  }
  set ignoreVertexColor(value) {
    this._ignoreVertexColor = value;
    this.needsUpdate = true;
  }
  /**
   * There is a line of the shader called "comment out if you want to PBR absolutely" in VRM0.0 MToon.
   * When this is true, the material enables the line to make it compatible with the legacy rendering of VRM.
   * Usually not recommended to turn this on.
   * `false` by default.
   */
  get v0CompatShade() {
    return this._v0CompatShade;
  }
  /**
   * There is a line of the shader called "comment out if you want to PBR absolutely" in VRM0.0 MToon.
   * When this is true, the material enables the line to make it compatible with the legacy rendering of VRM.
   * Usually not recommended to turn this on.
   * `false` by default.
   */
  set v0CompatShade(v) {
    this._v0CompatShade = v;
    this.needsUpdate = true;
  }
  /**
   * Debug mode for the material.
   * You can visualize several components for diagnosis using debug mode.
   *
   * See: {@link MToonMaterialDebugMode}
   */
  get debugMode() {
    return this._debugMode;
  }
  /**
   * Debug mode for the material.
   * You can visualize several components for diagnosis using debug mode.
   *
   * See: {@link MToonMaterialDebugMode}
   */
  set debugMode(m) {
    this._debugMode = m;
    this.needsUpdate = true;
  }
  get outlineWidthMode() {
    return this._outlineWidthMode;
  }
  set outlineWidthMode(m) {
    this._outlineWidthMode = m;
    this.needsUpdate = true;
  }
  get isOutline() {
    return this._isOutline;
  }
  set isOutline(b) {
    this._isOutline = b;
    this.needsUpdate = true;
  }
  /**
   * Readonly boolean that indicates this is a {@link MToonMaterial}.
   */
  get isMToonMaterial() {
    return true;
  }
  /**
   * Update this material.
   *
   * @param delta deltaTime since last update
   */
  update(delta) {
    this._uploadUniformsWorkaround();
    this._updateUVAnimation(delta);
  }
  copy(source) {
    super.copy(source);
    this.map = source.map;
    this.normalMap = source.normalMap;
    this.emissiveMap = source.emissiveMap;
    this.shadeMultiplyTexture = source.shadeMultiplyTexture;
    this.shadingShiftTexture = source.shadingShiftTexture;
    this.matcapTexture = source.matcapTexture;
    this.rimMultiplyTexture = source.rimMultiplyTexture;
    this.outlineWidthMultiplyTexture = source.outlineWidthMultiplyTexture;
    this.uvAnimationMaskTexture = source.uvAnimationMaskTexture;
    this.normalMapType = source.normalMapType;
    this.uvAnimationScrollXSpeedFactor = source.uvAnimationScrollXSpeedFactor;
    this.uvAnimationScrollYSpeedFactor = source.uvAnimationScrollYSpeedFactor;
    this.uvAnimationRotationSpeedFactor = source.uvAnimationRotationSpeedFactor;
    this.ignoreVertexColor = source.ignoreVertexColor;
    this.v0CompatShade = source.v0CompatShade;
    this.debugMode = source.debugMode;
    this.outlineWidthMode = source.outlineWidthMode;
    this.isOutline = source.isOutline;
    this.needsUpdate = true;
    return this;
  }
  /**
   * Update UV animation state.
   * Intended to be called via {@link update}.
   * @param delta deltaTime
   */
  _updateUVAnimation(delta) {
    this.uniforms.uvAnimationScrollXOffset.value += delta * this.uvAnimationScrollXSpeedFactor;
    this.uniforms.uvAnimationScrollYOffset.value += delta * this.uvAnimationScrollYSpeedFactor;
    this.uniforms.uvAnimationRotationPhase.value += delta * this.uvAnimationRotationSpeedFactor;
    this.uniforms.alphaTest.value = this.alphaTest;
    this.uniformsNeedUpdate = true;
  }
  /**
   * Upload uniforms that need to upload but doesn't automatically because of reasons.
   * Intended to be called via {@link constructor} and {@link update}.
   */
  _uploadUniformsWorkaround() {
    this.uniforms.opacity.value = this.opacity;
    this._updateTextureMatrix(this.uniforms.map, this.uniforms.mapUvTransform);
    this._updateTextureMatrix(this.uniforms.normalMap, this.uniforms.normalMapUvTransform);
    this._updateTextureMatrix(this.uniforms.emissiveMap, this.uniforms.emissiveMapUvTransform);
    this._updateTextureMatrix(this.uniforms.shadeMultiplyTexture, this.uniforms.shadeMultiplyTextureUvTransform);
    this._updateTextureMatrix(this.uniforms.shadingShiftTexture, this.uniforms.shadingShiftTextureUvTransform);
    this._updateTextureMatrix(this.uniforms.matcapTexture, this.uniforms.matcapTextureUvTransform);
    this._updateTextureMatrix(this.uniforms.rimMultiplyTexture, this.uniforms.rimMultiplyTextureUvTransform);
    this._updateTextureMatrix(
      this.uniforms.outlineWidthMultiplyTexture,
      this.uniforms.outlineWidthMultiplyTextureUvTransform
    );
    this._updateTextureMatrix(this.uniforms.uvAnimationMaskTexture, this.uniforms.uvAnimationMaskTextureUvTransform);
    this.uniformsNeedUpdate = true;
  }
  /**
   * Returns a map object of preprocessor token and macro of the shader program.
   */
  _generateDefines() {
    const threeRevision = parseInt(THREE42.REVISION, 10);
    const useUvInVert = this.outlineWidthMultiplyTexture !== null;
    const useUvInFrag = this.map !== null || this.normalMap !== null || this.emissiveMap !== null || this.shadeMultiplyTexture !== null || this.shadingShiftTexture !== null || this.rimMultiplyTexture !== null || this.uvAnimationMaskTexture !== null;
    return {
      // Temporary compat against shader change @ Three.js r126
      // See: #21205, #21307, #21299
      THREE_VRM_THREE_REVISION: threeRevision,
      OUTLINE: this._isOutline,
      MTOON_USE_UV: useUvInVert || useUvInFrag,
      // we can't use `USE_UV` , it will be redefined in WebGLProgram.js
      MTOON_UVS_VERTEX_ONLY: useUvInVert && !useUvInFrag,
      V0_COMPAT_SHADE: this._v0CompatShade,
      USE_SHADEMULTIPLYTEXTURE: this.shadeMultiplyTexture !== null,
      USE_SHADINGSHIFTTEXTURE: this.shadingShiftTexture !== null,
      USE_MATCAPTEXTURE: this.matcapTexture !== null,
      USE_RIMMULTIPLYTEXTURE: this.rimMultiplyTexture !== null,
      USE_OUTLINEWIDTHMULTIPLYTEXTURE: this._isOutline && this.outlineWidthMultiplyTexture !== null,
      USE_UVANIMATIONMASKTEXTURE: this.uvAnimationMaskTexture !== null,
      IGNORE_VERTEX_COLOR: this._ignoreVertexColor === true,
      DEBUG_NORMAL: this._debugMode === "normal",
      DEBUG_LITSHADERATE: this._debugMode === "litShadeRate",
      DEBUG_UV: this._debugMode === "uv",
      OUTLINE_WIDTH_SCREEN: this._isOutline && this._outlineWidthMode === MToonMaterialOutlineWidthMode.ScreenCoordinates
    };
  }
  _updateTextureMatrix(src, dst) {
    if (src.value) {
      if (src.value.matrixAutoUpdate) {
        src.value.updateMatrix();
      }
      dst.value.copy(src.value.matrix);
    }
  }
};
var POSSIBLE_SPEC_VERSIONS6 = /* @__PURE__ */ new Set(["1.0", "1.0-beta"]);
var _MToonMaterialLoaderPlugin = class _MToonMaterialLoaderPlugin2 {
  get name() {
    return _MToonMaterialLoaderPlugin2.EXTENSION_NAME;
  }
  constructor(parser, options = {}) {
    var _a, _b, _c, _d;
    this.parser = parser;
    this.materialType = (_a = options.materialType) != null ? _a : MToonMaterial;
    this.renderOrderOffset = (_b = options.renderOrderOffset) != null ? _b : 0;
    this.v0CompatShade = (_c = options.v0CompatShade) != null ? _c : false;
    this.debugMode = (_d = options.debugMode) != null ? _d : "none";
    this._mToonMaterialSet = /* @__PURE__ */ new Set();
  }
  beforeRoot() {
    return __async3(this, null, function* () {
      this._removeUnlitExtensionIfMToonExists();
    });
  }
  afterRoot(gltf) {
    return __async3(this, null, function* () {
      gltf.userData.vrmMToonMaterials = Array.from(this._mToonMaterialSet);
    });
  }
  getMaterialType(materialIndex) {
    const v1Extension = this._getMToonExtension(materialIndex);
    if (v1Extension) {
      return this.materialType;
    }
    return null;
  }
  extendMaterialParams(materialIndex, materialParams) {
    const extension = this._getMToonExtension(materialIndex);
    if (extension) {
      return this._extendMaterialParams(extension, materialParams);
    }
    return null;
  }
  loadMesh(meshIndex) {
    return __async3(this, null, function* () {
      var _a;
      const parser = this.parser;
      const json = parser.json;
      const meshDef = (_a = json.meshes) == null ? void 0 : _a[meshIndex];
      if (meshDef == null) {
        throw new Error(
          `MToonMaterialLoaderPlugin: Attempt to use meshes[${meshIndex}] of glTF but the mesh doesn't exist`
        );
      }
      const primitivesDef = meshDef.primitives;
      const meshOrGroup = yield parser.loadMesh(meshIndex);
      if (primitivesDef.length === 1) {
        const mesh = meshOrGroup;
        const materialIndex = primitivesDef[0].material;
        if (materialIndex != null) {
          this._setupPrimitive(mesh, materialIndex);
        }
      } else {
        const group = meshOrGroup;
        for (let i = 0; i < primitivesDef.length; i++) {
          const mesh = group.children[i];
          const materialIndex = primitivesDef[i].material;
          if (materialIndex != null) {
            this._setupPrimitive(mesh, materialIndex);
          }
        }
      }
      return meshOrGroup;
    });
  }
  /**
   * Delete use of `KHR_materials_unlit` from its `materials` if the material is using MToon.
   *
   * Since GLTFLoader have so many hardcoded procedure related to `KHR_materials_unlit`
   * we have to delete the extension before we start to parse the glTF.
   */
  _removeUnlitExtensionIfMToonExists() {
    const parser = this.parser;
    const json = parser.json;
    const materialDefs = json.materials;
    materialDefs == null ? void 0 : materialDefs.map((materialDef, iMaterial) => {
      var _a;
      const extension = this._getMToonExtension(iMaterial);
      if (extension && ((_a = materialDef.extensions) == null ? void 0 : _a["KHR_materials_unlit"])) {
        delete materialDef.extensions["KHR_materials_unlit"];
      }
    });
  }
  _getMToonExtension(materialIndex) {
    var _a, _b;
    const parser = this.parser;
    const json = parser.json;
    const materialDef = (_a = json.materials) == null ? void 0 : _a[materialIndex];
    if (materialDef == null) {
      console.warn(
        `MToonMaterialLoaderPlugin: Attempt to use materials[${materialIndex}] of glTF but the material doesn't exist`
      );
      return void 0;
    }
    const extension = (_b = materialDef.extensions) == null ? void 0 : _b[_MToonMaterialLoaderPlugin2.EXTENSION_NAME];
    if (extension == null) {
      return void 0;
    }
    const specVersion = extension.specVersion;
    if (!POSSIBLE_SPEC_VERSIONS6.has(specVersion)) {
      console.warn(
        `MToonMaterialLoaderPlugin: Unknown ${_MToonMaterialLoaderPlugin2.EXTENSION_NAME} specVersion "${specVersion}"`
      );
      return void 0;
    }
    return extension;
  }
  _extendMaterialParams(extension, materialParams) {
    return __async3(this, null, function* () {
      var _a;
      delete materialParams.metalness;
      delete materialParams.roughness;
      const assignHelper = new GLTFMToonMaterialParamsAssignHelper(this.parser, materialParams);
      assignHelper.assignPrimitive("transparentWithZWrite", extension.transparentWithZWrite);
      assignHelper.assignColor("shadeColorFactor", extension.shadeColorFactor);
      assignHelper.assignTexture("shadeMultiplyTexture", extension.shadeMultiplyTexture, true);
      assignHelper.assignPrimitive("shadingShiftFactor", extension.shadingShiftFactor);
      assignHelper.assignTexture("shadingShiftTexture", extension.shadingShiftTexture, true);
      assignHelper.assignPrimitive("shadingShiftTextureScale", (_a = extension.shadingShiftTexture) == null ? void 0 : _a.scale);
      assignHelper.assignPrimitive("shadingToonyFactor", extension.shadingToonyFactor);
      assignHelper.assignPrimitive("giEqualizationFactor", extension.giEqualizationFactor);
      assignHelper.assignColor("matcapFactor", extension.matcapFactor);
      assignHelper.assignTexture("matcapTexture", extension.matcapTexture, true);
      assignHelper.assignColor("parametricRimColorFactor", extension.parametricRimColorFactor);
      assignHelper.assignTexture("rimMultiplyTexture", extension.rimMultiplyTexture, true);
      assignHelper.assignPrimitive("rimLightingMixFactor", extension.rimLightingMixFactor);
      assignHelper.assignPrimitive("parametricRimFresnelPowerFactor", extension.parametricRimFresnelPowerFactor);
      assignHelper.assignPrimitive("parametricRimLiftFactor", extension.parametricRimLiftFactor);
      assignHelper.assignPrimitive("outlineWidthMode", extension.outlineWidthMode);
      assignHelper.assignPrimitive("outlineWidthFactor", extension.outlineWidthFactor);
      assignHelper.assignTexture("outlineWidthMultiplyTexture", extension.outlineWidthMultiplyTexture, false);
      assignHelper.assignColor("outlineColorFactor", extension.outlineColorFactor);
      assignHelper.assignPrimitive("outlineLightingMixFactor", extension.outlineLightingMixFactor);
      assignHelper.assignTexture("uvAnimationMaskTexture", extension.uvAnimationMaskTexture, false);
      assignHelper.assignPrimitive("uvAnimationScrollXSpeedFactor", extension.uvAnimationScrollXSpeedFactor);
      assignHelper.assignPrimitive("uvAnimationScrollYSpeedFactor", extension.uvAnimationScrollYSpeedFactor);
      assignHelper.assignPrimitive("uvAnimationRotationSpeedFactor", extension.uvAnimationRotationSpeedFactor);
      assignHelper.assignPrimitive("v0CompatShade", this.v0CompatShade);
      assignHelper.assignPrimitive("debugMode", this.debugMode);
      yield assignHelper.pending;
    });
  }
  /**
   * This will do two processes that is required to render MToon properly.
   *
   * - Set render order
   * - Generate outline
   *
   * @param mesh A target GLTF primitive
   * @param materialIndex The material index of the primitive
   */
  _setupPrimitive(mesh, materialIndex) {
    const extension = this._getMToonExtension(materialIndex);
    if (extension) {
      const renderOrder = this._parseRenderOrder(extension);
      mesh.renderOrder = renderOrder + this.renderOrderOffset;
      this._generateOutline(mesh);
      this._addToMaterialSet(mesh);
      return;
    }
  }
  /**
   * Check whether the material should generate outline or not.
   * @param surfaceMaterial The material to check
   * @returns True if the material should generate outline
   */
  _shouldGenerateOutline(surfaceMaterial) {
    return typeof surfaceMaterial.outlineWidthMode === "string" && surfaceMaterial.outlineWidthMode !== "none" && typeof surfaceMaterial.outlineWidthFactor === "number" && surfaceMaterial.outlineWidthFactor > 0;
  }
  /**
   * Generate outline for the given mesh, if it needs.
   *
   * @param mesh The target mesh
   */
  _generateOutline(mesh) {
    const surfaceMaterial = mesh.material;
    if (!(surfaceMaterial instanceof THREE52.Material)) {
      return;
    }
    if (!this._shouldGenerateOutline(surfaceMaterial)) {
      return;
    }
    mesh.material = [surfaceMaterial];
    const outlineMaterial = surfaceMaterial.clone();
    outlineMaterial.name += " (Outline)";
    outlineMaterial.isOutline = true;
    outlineMaterial.side = THREE52.BackSide;
    mesh.material.push(outlineMaterial);
    const geometry = mesh.geometry;
    const primitiveVertices = geometry.index ? geometry.index.count : geometry.attributes.position.count / 3;
    geometry.addGroup(0, primitiveVertices, 0);
    geometry.addGroup(0, primitiveVertices, 1);
  }
  _addToMaterialSet(mesh) {
    const materialOrMaterials = mesh.material;
    const materialSet = /* @__PURE__ */ new Set();
    if (Array.isArray(materialOrMaterials)) {
      materialOrMaterials.forEach((material) => materialSet.add(material));
    } else {
      materialSet.add(materialOrMaterials);
    }
    for (const material of materialSet) {
      this._mToonMaterialSet.add(material);
    }
  }
  _parseRenderOrder(extension) {
    var _a;
    const enabledZWrite = extension.transparentWithZWrite;
    return (enabledZWrite ? 0 : 19) + ((_a = extension.renderQueueOffsetNumber) != null ? _a : 0);
  }
};
_MToonMaterialLoaderPlugin.EXTENSION_NAME = "VRMC_materials_mtoon";
var MToonMaterialLoaderPlugin = _MToonMaterialLoaderPlugin;

// ../three-vrm-materials-hdr-emissive-multiplier/lib/three-vrm-materials-hdr-emissive-multiplier.module.js
var __async4 = (__this, __arguments, generator) => {
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
var _VRMMaterialsHDREmissiveMultiplierLoaderPlugin = class _VRMMaterialsHDREmissiveMultiplierLoaderPlugin2 {
  get name() {
    return _VRMMaterialsHDREmissiveMultiplierLoaderPlugin2.EXTENSION_NAME;
  }
  constructor(parser) {
    this.parser = parser;
  }
  extendMaterialParams(materialIndex, materialParams) {
    return __async4(this, null, function* () {
      const extension = this._getHDREmissiveMultiplierExtension(materialIndex);
      if (extension == null) {
        return;
      }
      console.warn(
        "VRMMaterialsHDREmissiveMultiplierLoaderPlugin: `VRMC_materials_hdr_emissiveMultiplier` is archived. Use `KHR_materials_emissive_strength` instead."
      );
      const emissiveMultiplier = extension.emissiveMultiplier;
      materialParams.emissiveIntensity = emissiveMultiplier;
    });
  }
  _getHDREmissiveMultiplierExtension(materialIndex) {
    var _a, _b;
    const parser = this.parser;
    const json = parser.json;
    const materialDef = (_a = json.materials) == null ? void 0 : _a[materialIndex];
    if (materialDef == null) {
      console.warn(
        `VRMMaterialsHDREmissiveMultiplierLoaderPlugin: Attempt to use materials[${materialIndex}] of glTF but the material doesn't exist`
      );
      return void 0;
    }
    const extension = (_b = materialDef.extensions) == null ? void 0 : _b[_VRMMaterialsHDREmissiveMultiplierLoaderPlugin2.EXTENSION_NAME];
    if (extension == null) {
      return void 0;
    }
    return extension;
  }
};
_VRMMaterialsHDREmissiveMultiplierLoaderPlugin.EXTENSION_NAME = "VRMC_materials_hdr_emissiveMultiplier";
var VRMMaterialsHDREmissiveMultiplierLoaderPlugin = _VRMMaterialsHDREmissiveMultiplierLoaderPlugin;

// ../three-vrm-materials-v0compat/lib/three-vrm-materials-v0compat.module.js
var THREE18 = __toESM(require("three"), 1);
var __defProp3 = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols2 = Object.getOwnPropertySymbols;
var __hasOwnProp3 = Object.prototype.hasOwnProperty;
var __propIsEnum2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp3.call(b, prop))
      __defNormalProp2(a, prop, b[prop]);
  if (__getOwnPropSymbols2)
    for (var prop of __getOwnPropSymbols2(b)) {
      if (__propIsEnum2.call(b, prop))
        __defNormalProp2(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __async5 = (__this, __arguments, generator) => {
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
function gammaEOTF(e) {
  return Math.pow(e, 2.2);
}
var VRMMaterialsV0CompatPlugin = class {
  get name() {
    return "VRMMaterialsV0CompatPlugin";
  }
  constructor(parser) {
    var _a;
    this.parser = parser;
    this._renderQueueMapTransparent = /* @__PURE__ */ new Map();
    this._renderQueueMapTransparentZWrite = /* @__PURE__ */ new Map();
    const json = this.parser.json;
    json.extensionsUsed = (_a = json.extensionsUsed) != null ? _a : [];
    if (json.extensionsUsed.indexOf("KHR_texture_transform") === -1) {
      json.extensionsUsed.push("KHR_texture_transform");
    }
  }
  beforeRoot() {
    return __async5(this, null, function* () {
      var _a;
      const json = this.parser.json;
      const v0VRMExtension = (_a = json.extensions) == null ? void 0 : _a["VRM"];
      const v0MaterialProperties = v0VRMExtension == null ? void 0 : v0VRMExtension.materialProperties;
      if (!v0MaterialProperties) {
        return;
      }
      this._populateRenderQueueMap(v0MaterialProperties);
      v0MaterialProperties.forEach((materialProperties, materialIndex) => {
        var _a2, _b;
        const materialDef = (_a2 = json.materials) == null ? void 0 : _a2[materialIndex];
        if (materialDef == null) {
          console.warn(
            `VRMMaterialsV0CompatPlugin: Attempt to use materials[${materialIndex}] of glTF but the material doesn't exist`
          );
          return;
        }
        if (materialProperties.shader === "VRM/MToon") {
          const material = this._parseV0MToonProperties(materialProperties, materialDef);
          json.materials[materialIndex] = material;
        } else if ((_b = materialProperties.shader) == null ? void 0 : _b.startsWith("VRM/Unlit")) {
          const material = this._parseV0UnlitProperties(materialProperties, materialDef);
          json.materials[materialIndex] = material;
        } else if (materialProperties.shader === "VRM_USE_GLTFSHADER") {
        } else {
          console.warn(`VRMMaterialsV0CompatPlugin: Unknown shader: ${materialProperties.shader}`);
        }
      });
    });
  }
  _parseV0MToonProperties(materialProperties, schemaMaterial) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa;
    const isTransparent = (_b = (_a = materialProperties.keywordMap) == null ? void 0 : _a["_ALPHABLEND_ON"]) != null ? _b : false;
    const enabledZWrite = ((_c = materialProperties.floatProperties) == null ? void 0 : _c["_ZWrite"]) === 1;
    const transparentWithZWrite = enabledZWrite && isTransparent;
    const renderQueueOffsetNumber = this._v0ParseRenderQueue(materialProperties);
    const isCutoff = (_e = (_d = materialProperties.keywordMap) == null ? void 0 : _d["_ALPHATEST_ON"]) != null ? _e : false;
    const alphaMode = isTransparent ? "BLEND" : isCutoff ? "MASK" : "OPAQUE";
    const alphaCutoff = isCutoff ? (_g = (_f = materialProperties.floatProperties) == null ? void 0 : _f["_Cutoff"]) != null ? _g : 0.5 : void 0;
    const cullMode = (_i = (_h = materialProperties.floatProperties) == null ? void 0 : _h["_CullMode"]) != null ? _i : 2;
    const doubleSided = cullMode === 0;
    const textureTransformExt = this._portTextureTransform(materialProperties);
    const baseColorFactor = ((_k = (_j = materialProperties.vectorProperties) == null ? void 0 : _j["_Color"]) != null ? _k : [1, 1, 1, 1]).map(
      (v, i) => i === 3 ? v : gammaEOTF(v)
      // alpha channel is stored in linear
    );
    const baseColorTextureIndex = (_l = materialProperties.textureProperties) == null ? void 0 : _l["_MainTex"];
    const baseColorTexture = baseColorTextureIndex != null ? {
      index: baseColorTextureIndex,
      extensions: __spreadValues2({}, textureTransformExt)
    } : void 0;
    const normalTextureScale = (_n = (_m = materialProperties.floatProperties) == null ? void 0 : _m["_BumpScale"]) != null ? _n : 1;
    const normalTextureIndex = (_o = materialProperties.textureProperties) == null ? void 0 : _o["_BumpMap"];
    const normalTexture = normalTextureIndex != null ? {
      index: normalTextureIndex,
      scale: normalTextureScale,
      extensions: __spreadValues2({}, textureTransformExt)
    } : void 0;
    const emissiveFactor = ((_q = (_p = materialProperties.vectorProperties) == null ? void 0 : _p["_EmissionColor"]) != null ? _q : [0, 0, 0, 1]).map(
      gammaEOTF
    );
    const emissiveTextureIndex = (_r = materialProperties.textureProperties) == null ? void 0 : _r["_EmissionMap"];
    const emissiveTexture = emissiveTextureIndex != null ? {
      index: emissiveTextureIndex,
      extensions: __spreadValues2({}, textureTransformExt)
    } : void 0;
    const shadeColorFactor = ((_t = (_s = materialProperties.vectorProperties) == null ? void 0 : _s["_ShadeColor"]) != null ? _t : [0.97, 0.81, 0.86, 1]).map(
      gammaEOTF
    );
    const shadeMultiplyTextureIndex = (_u = materialProperties.textureProperties) == null ? void 0 : _u["_ShadeTexture"];
    const shadeMultiplyTexture = shadeMultiplyTextureIndex != null ? {
      index: shadeMultiplyTextureIndex,
      extensions: __spreadValues2({}, textureTransformExt)
    } : void 0;
    let shadingShiftFactor = (_w = (_v = materialProperties.floatProperties) == null ? void 0 : _v["_ShadeShift"]) != null ? _w : 0;
    let shadingToonyFactor = (_y = (_x = materialProperties.floatProperties) == null ? void 0 : _x["_ShadeToony"]) != null ? _y : 0.9;
    shadingToonyFactor = THREE18.MathUtils.lerp(shadingToonyFactor, 1, 0.5 + 0.5 * shadingShiftFactor);
    shadingShiftFactor = -shadingShiftFactor - (1 - shadingToonyFactor);
    const giIntensityFactor = (_A = (_z = materialProperties.floatProperties) == null ? void 0 : _z["_IndirectLightIntensity"]) != null ? _A : 0.1;
    const giEqualizationFactor = giIntensityFactor ? 1 - giIntensityFactor : void 0;
    const matcapTextureIndex = (_B = materialProperties.textureProperties) == null ? void 0 : _B["_SphereAdd"];
    const matcapFactor = matcapTextureIndex != null ? [1, 1, 1] : void 0;
    const matcapTexture = matcapTextureIndex != null ? {
      index: matcapTextureIndex
    } : void 0;
    const rimLightingMixFactor = (_D = (_C = materialProperties.floatProperties) == null ? void 0 : _C["_RimLightingMix"]) != null ? _D : 0;
    const rimMultiplyTextureIndex = (_E = materialProperties.textureProperties) == null ? void 0 : _E["_RimTexture"];
    const rimMultiplyTexture = rimMultiplyTextureIndex != null ? {
      index: rimMultiplyTextureIndex,
      extensions: __spreadValues2({}, textureTransformExt)
    } : void 0;
    const parametricRimColorFactor = ((_G = (_F = materialProperties.vectorProperties) == null ? void 0 : _F["_RimColor"]) != null ? _G : [0, 0, 0, 1]).map(
      gammaEOTF
    );
    const parametricRimFresnelPowerFactor = (_I = (_H = materialProperties.floatProperties) == null ? void 0 : _H["_RimFresnelPower"]) != null ? _I : 1;
    const parametricRimLiftFactor = (_K = (_J = materialProperties.floatProperties) == null ? void 0 : _J["_RimLift"]) != null ? _K : 0;
    const outlineWidthMode = ["none", "worldCoordinates", "screenCoordinates"][(_M = (_L = materialProperties.floatProperties) == null ? void 0 : _L["_OutlineWidthMode"]) != null ? _M : 0];
    let outlineWidthFactor = (_O = (_N = materialProperties.floatProperties) == null ? void 0 : _N["_OutlineWidth"]) != null ? _O : 0;
    outlineWidthFactor = 0.01 * outlineWidthFactor;
    const outlineWidthMultiplyTextureIndex = (_P = materialProperties.textureProperties) == null ? void 0 : _P["_OutlineWidthTexture"];
    const outlineWidthMultiplyTexture = outlineWidthMultiplyTextureIndex != null ? {
      index: outlineWidthMultiplyTextureIndex,
      extensions: __spreadValues2({}, textureTransformExt)
    } : void 0;
    const outlineColorFactor = ((_R = (_Q = materialProperties.vectorProperties) == null ? void 0 : _Q["_OutlineColor"]) != null ? _R : [0, 0, 0]).map(
      gammaEOTF
    );
    const outlineColorMode = (_T = (_S = materialProperties.floatProperties) == null ? void 0 : _S["_OutlineColorMode"]) != null ? _T : 0;
    const outlineLightingMixFactor = outlineColorMode === 1 ? (_V = (_U = materialProperties.floatProperties) == null ? void 0 : _U["_OutlineLightingMix"]) != null ? _V : 1 : 0;
    const uvAnimationMaskTextureIndex = (_W = materialProperties.textureProperties) == null ? void 0 : _W["_UvAnimMaskTexture"];
    const uvAnimationMaskTexture = uvAnimationMaskTextureIndex != null ? {
      index: uvAnimationMaskTextureIndex,
      extensions: __spreadValues2({}, textureTransformExt)
    } : void 0;
    const uvAnimationScrollXSpeedFactor = (_Y = (_X = materialProperties.floatProperties) == null ? void 0 : _X["_UvAnimScrollX"]) != null ? _Y : 0;
    let uvAnimationScrollYSpeedFactor = (__ = (_Z = materialProperties.floatProperties) == null ? void 0 : _Z["_UvAnimScrollY"]) != null ? __ : 0;
    if (uvAnimationScrollYSpeedFactor != null) {
      uvAnimationScrollYSpeedFactor = -uvAnimationScrollYSpeedFactor;
    }
    const uvAnimationRotationSpeedFactor = (_aa = (_$ = materialProperties.floatProperties) == null ? void 0 : _$["_UvAnimRotation"]) != null ? _aa : 0;
    const mtoonExtension = {
      specVersion: "1.0",
      transparentWithZWrite,
      renderQueueOffsetNumber,
      shadeColorFactor,
      shadeMultiplyTexture,
      shadingShiftFactor,
      shadingToonyFactor,
      giEqualizationFactor,
      matcapFactor,
      matcapTexture,
      rimLightingMixFactor,
      rimMultiplyTexture,
      parametricRimColorFactor,
      parametricRimFresnelPowerFactor,
      parametricRimLiftFactor,
      outlineWidthMode,
      outlineWidthFactor,
      outlineWidthMultiplyTexture,
      outlineColorFactor,
      outlineLightingMixFactor,
      uvAnimationMaskTexture,
      uvAnimationScrollXSpeedFactor,
      uvAnimationScrollYSpeedFactor,
      uvAnimationRotationSpeedFactor
    };
    return __spreadProps(__spreadValues2({}, schemaMaterial), {
      pbrMetallicRoughness: {
        baseColorFactor,
        baseColorTexture
      },
      normalTexture,
      emissiveTexture,
      emissiveFactor,
      alphaMode,
      alphaCutoff,
      doubleSided,
      extensions: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        VRMC_materials_mtoon: mtoonExtension
      }
    });
  }
  _parseV0UnlitProperties(materialProperties, schemaMaterial) {
    var _a, _b, _c, _d, _e;
    const isTransparentZWrite = materialProperties.shader === "VRM/UnlitTransparentZWrite";
    const isTransparent = materialProperties.shader === "VRM/UnlitTransparent" || isTransparentZWrite;
    const renderQueueOffsetNumber = this._v0ParseRenderQueue(materialProperties);
    const isCutoff = materialProperties.shader === "VRM/UnlitCutout";
    const alphaMode = isTransparent ? "BLEND" : isCutoff ? "MASK" : "OPAQUE";
    const alphaCutoff = isCutoff ? (_b = (_a = materialProperties.floatProperties) == null ? void 0 : _a["_Cutoff"]) != null ? _b : 0.5 : void 0;
    const textureTransformExt = this._portTextureTransform(materialProperties);
    const baseColorFactor = ((_d = (_c = materialProperties.vectorProperties) == null ? void 0 : _c["_Color"]) != null ? _d : [1, 1, 1, 1]).map(gammaEOTF);
    const baseColorTextureIndex = (_e = materialProperties.textureProperties) == null ? void 0 : _e["_MainTex"];
    const baseColorTexture = baseColorTextureIndex != null ? {
      index: baseColorTextureIndex,
      extensions: __spreadValues2({}, textureTransformExt)
    } : void 0;
    const mtoonExtension = {
      specVersion: "1.0",
      transparentWithZWrite: isTransparentZWrite,
      renderQueueOffsetNumber,
      shadeColorFactor: baseColorFactor,
      shadeMultiplyTexture: baseColorTexture
    };
    return __spreadProps(__spreadValues2({}, schemaMaterial), {
      pbrMetallicRoughness: {
        baseColorFactor,
        baseColorTexture
      },
      alphaMode,
      alphaCutoff,
      extensions: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        VRMC_materials_mtoon: mtoonExtension
      }
    });
  }
  /**
   * Create a glTF `KHR_texture_transform` extension from v0 texture transform info.
   */
  _portTextureTransform(materialProperties) {
    var _a, _b, _c, _d, _e;
    const textureTransform = (_a = materialProperties.vectorProperties) == null ? void 0 : _a["_MainTex"];
    if (textureTransform == null) {
      return {};
    }
    const offset = [(_b = textureTransform == null ? void 0 : textureTransform[0]) != null ? _b : 0, (_c = textureTransform == null ? void 0 : textureTransform[1]) != null ? _c : 0];
    const scale = [(_d = textureTransform == null ? void 0 : textureTransform[2]) != null ? _d : 1, (_e = textureTransform == null ? void 0 : textureTransform[3]) != null ? _e : 1];
    offset[1] = 1 - scale[1] - offset[1];
    return {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      KHR_texture_transform: { offset, scale }
    };
  }
  /**
   * Convert v0 render order into v1 render order.
   * This uses a map from v0 render queue to v1 compliant render queue offset which is generated in {@link _populateRenderQueueMap}.
   */
  _v0ParseRenderQueue(materialProperties) {
    var _a, _b;
    const isTransparentZWrite = materialProperties.shader === "VRM/UnlitTransparentZWrite";
    const isTransparent = ((_a = materialProperties.keywordMap) == null ? void 0 : _a["_ALPHABLEND_ON"]) != void 0 || materialProperties.shader === "VRM/UnlitTransparent" || isTransparentZWrite;
    const enabledZWrite = ((_b = materialProperties.floatProperties) == null ? void 0 : _b["_ZWrite"]) === 1 || isTransparentZWrite;
    let offset = 0;
    if (isTransparent) {
      const v0Queue = materialProperties.renderQueue;
      if (v0Queue != null) {
        if (enabledZWrite) {
          offset = this._renderQueueMapTransparentZWrite.get(v0Queue);
        } else {
          offset = this._renderQueueMapTransparent.get(v0Queue);
        }
      }
    }
    return offset;
  }
  /**
   * Create a map which maps v0 render queue to v1 compliant render queue offset.
   * This lists up all render queues the model use and creates a map to new render queue offsets in the same order.
   */
  _populateRenderQueueMap(materialPropertiesList) {
    const renderQueuesTransparent = /* @__PURE__ */ new Set();
    const renderQueuesTransparentZWrite = /* @__PURE__ */ new Set();
    materialPropertiesList.forEach((materialProperties) => {
      var _a, _b;
      const isTransparentZWrite = materialProperties.shader === "VRM/UnlitTransparentZWrite";
      const isTransparent = ((_a = materialProperties.keywordMap) == null ? void 0 : _a["_ALPHABLEND_ON"]) != void 0 || materialProperties.shader === "VRM/UnlitTransparent" || isTransparentZWrite;
      const enabledZWrite = ((_b = materialProperties.floatProperties) == null ? void 0 : _b["_ZWrite"]) === 1 || isTransparentZWrite;
      if (isTransparent) {
        const v0Queue = materialProperties.renderQueue;
        if (v0Queue != null) {
          if (enabledZWrite) {
            renderQueuesTransparentZWrite.add(v0Queue);
          } else {
            renderQueuesTransparent.add(v0Queue);
          }
        }
      }
    });
    if (renderQueuesTransparent.size > 10) {
      console.warn(
        `VRMMaterialsV0CompatPlugin: This VRM uses ${renderQueuesTransparent.size} render queues for Transparent materials while VRM 1.0 only supports up to 10 render queues. The model might not be rendered correctly.`
      );
    }
    if (renderQueuesTransparentZWrite.size > 10) {
      console.warn(
        `VRMMaterialsV0CompatPlugin: This VRM uses ${renderQueuesTransparentZWrite.size} render queues for TransparentZWrite materials while VRM 1.0 only supports up to 10 render queues. The model might not be rendered correctly.`
      );
    }
    Array.from(renderQueuesTransparent).sort().forEach((queue, i) => {
      const newQueueOffset = Math.min(Math.max(i - renderQueuesTransparent.size + 1, -9), 0);
      this._renderQueueMapTransparent.set(queue, newQueueOffset);
    });
    Array.from(renderQueuesTransparentZWrite).sort().forEach((queue, i) => {
      const newQueueOffset = Math.min(Math.max(i, 0), 9);
      this._renderQueueMapTransparentZWrite.set(queue, newQueueOffset);
    });
  }
};

// ../three-vrm-node-constraint/lib/three-vrm-node-constraint.module.js
var THREE19 = __toESM(require("three"), 1);
var THREE33 = __toESM(require("three"), 1);
var THREE23 = __toESM(require("three"), 1);
var THREE43 = __toESM(require("three"), 1);
var THREE53 = __toESM(require("three"), 1);
var __async6 = (__this, __arguments, generator) => {
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
var _v3A6 = new THREE19.Vector3();
var VRMNodeConstraintHelper = class extends THREE19.Group {
  constructor(constraint) {
    super();
    this._attrPosition = new THREE19.BufferAttribute(new Float32Array([0, 0, 0, 0, 0, 0]), 3);
    this._attrPosition.setUsage(THREE19.DynamicDrawUsage);
    const geometry = new THREE19.BufferGeometry();
    geometry.setAttribute("position", this._attrPosition);
    const material = new THREE19.LineBasicMaterial({
      color: 16711935,
      depthTest: false,
      depthWrite: false
    });
    this._line = new THREE19.Line(geometry, material);
    this.add(this._line);
    this.constraint = constraint;
  }
  updateMatrixWorld(force) {
    _v3A6.setFromMatrixPosition(this.constraint.destination.matrixWorld);
    this._attrPosition.setXYZ(0, _v3A6.x, _v3A6.y, _v3A6.z);
    if (this.constraint.source) {
      _v3A6.setFromMatrixPosition(this.constraint.source.matrixWorld);
    }
    this._attrPosition.setXYZ(1, _v3A6.x, _v3A6.y, _v3A6.z);
    this._attrPosition.needsUpdate = true;
    super.updateMatrixWorld(force);
  }
};
function decomposePosition(matrix, target) {
  return target.set(matrix.elements[12], matrix.elements[13], matrix.elements[14]);
}
var _v3A22 = new THREE23.Vector3();
var _v3B4 = new THREE23.Vector3();
function decomposeRotation(matrix, target) {
  matrix.decompose(_v3A22, target, _v3B4);
  return target;
}
function quatInvertCompat2(target) {
  if (target.invert) {
    target.invert();
  } else {
    target.inverse();
  }
  return target;
}
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
var _v3A32 = new THREE33.Vector3();
var _v3B22 = new THREE33.Vector3();
var _v3C2 = new THREE33.Vector3();
var _quatA7 = new THREE33.Quaternion();
var _quatB4 = new THREE33.Quaternion();
var _quatC2 = new THREE33.Quaternion();
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
    this._v3AimAxis = new THREE33.Vector3(1, 0, 0);
    this._dstRestQuat = new THREE33.Quaternion();
  }
  setInitState() {
    this._dstRestQuat.copy(this.destination.quaternion);
  }
  update() {
    this.destination.updateWorldMatrix(true, false);
    this.source.updateWorldMatrix(true, false);
    const dstParentWorldQuat = _quatA7.identity();
    const invDstParentWorldQuat = _quatB4.identity();
    if (this.destination.parent) {
      decomposeRotation(this.destination.parent.matrixWorld, dstParentWorldQuat);
      quatInvertCompat2(invDstParentWorldQuat.copy(dstParentWorldQuat));
    }
    const a0 = _v3A32.copy(this._v3AimAxis).applyQuaternion(this._dstRestQuat).applyQuaternion(dstParentWorldQuat);
    const a1 = decomposePosition(this.source.matrixWorld, _v3B22).sub(decomposePosition(this.destination.matrixWorld, _v3C2)).normalize();
    const targetQuat = _quatC2.setFromUnitVectors(a0, a1).premultiply(invDstParentWorldQuat).multiply(dstParentWorldQuat).multiply(this._dstRestQuat);
    this.destination.quaternion.copy(this._dstRestQuat).slerp(targetQuat, this.weight);
  }
};
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
var _quatA22 = new THREE43.Quaternion();
var _quatB22 = new THREE43.Quaternion();
var VRMRotationConstraint = class extends VRMNodeConstraint {
  get dependencies() {
    return /* @__PURE__ */ new Set([this.source]);
  }
  constructor(destination, source) {
    super(destination, source);
    this._dstRestQuat = new THREE43.Quaternion();
    this._invSrcRestQuat = new THREE43.Quaternion();
  }
  setInitState() {
    this._dstRestQuat.copy(this.destination.quaternion);
    quatInvertCompat2(this._invSrcRestQuat.copy(this.source.quaternion));
  }
  update() {
    const srcDeltaQuat = _quatA22.copy(this._invSrcRestQuat).multiply(this.source.quaternion);
    const targetQuat = _quatB22.copy(this._dstRestQuat).multiply(srcDeltaQuat);
    this.destination.quaternion.copy(this._dstRestQuat).slerp(targetQuat, this.weight);
  }
};
var _v3A42 = new THREE53.Vector3();
var _quatA32 = new THREE53.Quaternion();
var _quatB32 = new THREE53.Quaternion();
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
    this._v3RollAxis = new THREE53.Vector3(1, 0, 0);
    this._dstRestQuat = new THREE53.Quaternion();
    this._invDstRestQuat = new THREE53.Quaternion();
    this._invSrcRestQuatMulDstRestQuat = new THREE53.Quaternion();
  }
  setInitState() {
    this._dstRestQuat.copy(this.destination.quaternion);
    quatInvertCompat2(this._invDstRestQuat.copy(this._dstRestQuat));
    quatInvertCompat2(this._invSrcRestQuatMulDstRestQuat.copy(this.source.quaternion)).multiply(this._dstRestQuat);
  }
  update() {
    const quatDelta = _quatA32.copy(this._invDstRestQuat).multiply(this.source.quaternion).multiply(this._invSrcRestQuatMulDstRestQuat);
    const n1 = _v3A42.copy(this._v3RollAxis).applyQuaternion(quatDelta);
    const quatFromTo = _quatB32.setFromUnitVectors(n1, this._v3RollAxis);
    const targetQuat = quatFromTo.premultiply(this._dstRestQuat).multiply(quatDelta);
    this.destination.quaternion.copy(this._dstRestQuat).slerp(targetQuat, this.weight);
  }
};
var POSSIBLE_SPEC_VERSIONS7 = /* @__PURE__ */ new Set(["1.0", "1.0-beta"]);
var _VRMNodeConstraintLoaderPlugin = class _VRMNodeConstraintLoaderPlugin2 {
  get name() {
    return _VRMNodeConstraintLoaderPlugin2.EXTENSION_NAME;
  }
  constructor(parser, options) {
    this.parser = parser;
    this.helperRoot = options == null ? void 0 : options.helperRoot;
  }
  afterRoot(gltf) {
    return __async6(this, null, function* () {
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
    return __async6(this, null, function* () {
      var _a;
      const json = this.parser.json;
      const isConstraintsUsed = ((_a = json.extensionsUsed) == null ? void 0 : _a.indexOf(_VRMNodeConstraintLoaderPlugin2.EXTENSION_NAME)) !== -1;
      if (!isConstraintsUsed) {
        return null;
      }
      const manager = new VRMNodeConstraintManager();
      const threeNodes = yield this.parser.getDependencies("node");
      threeNodes.forEach((node, nodeIndex) => {
        var _a2;
        const schemaNode = json.nodes[nodeIndex];
        const extension = (_a2 = schemaNode == null ? void 0 : schemaNode.extensions) == null ? void 0 : _a2[_VRMNodeConstraintLoaderPlugin2.EXTENSION_NAME];
        if (extension == null) {
          return;
        }
        const specVersion = extension.specVersion;
        if (!POSSIBLE_SPEC_VERSIONS7.has(specVersion)) {
          console.warn(
            `VRMNodeConstraintLoaderPlugin: Unknown ${_VRMNodeConstraintLoaderPlugin2.EXTENSION_NAME} specVersion "${specVersion}"`
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

// ../three-vrm-springbone/lib/three-vrm-springbone.module.js
var THREE72 = __toESM(require("three"), 1);
var THREE20 = __toESM(require("three"), 1);
var THREE24 = __toESM(require("three"), 1);
var THREE34 = __toESM(require("three"), 1);
var THREE44 = __toESM(require("three"), 1);
var THREE54 = __toESM(require("three"), 1);
var THREE62 = __toESM(require("three"), 1);
var THREE92 = __toESM(require("three"), 1);
var THREE82 = __toESM(require("three"), 1);
var THREE102 = __toESM(require("three"), 1);
var THREE132 = __toESM(require("three"), 1);
var THREE122 = __toESM(require("three"), 1);
var THREE112 = __toESM(require("three"), 1);
var THREE142 = __toESM(require("three"), 1);
var __async7 = (__this, __arguments, generator) => {
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
var VRMSpringBoneColliderShape = class {
};
var _v3A7 = new THREE20.Vector3();
var _v3B5 = new THREE20.Vector3();
var VRMSpringBoneColliderShapeCapsule = class extends VRMSpringBoneColliderShape {
  get type() {
    return "capsule";
  }
  constructor(params) {
    var _a, _b, _c, _d;
    super();
    this.offset = (_a = params == null ? void 0 : params.offset) != null ? _a : new THREE20.Vector3(0, 0, 0);
    this.tail = (_b = params == null ? void 0 : params.tail) != null ? _b : new THREE20.Vector3(0, 0, 0);
    this.radius = (_c = params == null ? void 0 : params.radius) != null ? _c : 0;
    this.inside = (_d = params == null ? void 0 : params.inside) != null ? _d : false;
  }
  calculateCollision(colliderMatrix, objectPosition, objectRadius, target) {
    _v3A7.setFromMatrixPosition(colliderMatrix);
    _v3B5.subVectors(this.tail, this.offset).applyMatrix4(colliderMatrix);
    _v3B5.sub(_v3A7);
    const lengthSqCapsule = _v3B5.lengthSq();
    target.copy(objectPosition).sub(_v3A7);
    const dot = _v3B5.dot(target);
    if (dot <= 0) {
    } else if (lengthSqCapsule <= dot) {
      target.sub(_v3B5);
    } else {
      _v3B5.multiplyScalar(dot / lengthSqCapsule);
      target.sub(_v3B5);
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
var _v3A23 = new THREE24.Vector3();
var _mat3A = new THREE24.Matrix3();
var VRMSpringBoneColliderShapePlane = class extends VRMSpringBoneColliderShape {
  get type() {
    return "plane";
  }
  constructor(params) {
    var _a, _b;
    super();
    this.offset = (_a = params == null ? void 0 : params.offset) != null ? _a : new THREE24.Vector3(0, 0, 0);
    this.normal = (_b = params == null ? void 0 : params.normal) != null ? _b : new THREE24.Vector3(0, 0, 1);
  }
  calculateCollision(colliderMatrix, objectPosition, objectRadius, target) {
    target.setFromMatrixPosition(colliderMatrix);
    target.negate().add(objectPosition);
    _mat3A.getNormalMatrix(colliderMatrix);
    _v3A23.copy(this.normal).applyNormalMatrix(_mat3A).normalize();
    const distance = target.dot(_v3A23) - objectRadius;
    target.copy(_v3A23);
    return distance;
  }
};
var _v3A33 = new THREE34.Vector3();
var VRMSpringBoneColliderShapeSphere = class extends VRMSpringBoneColliderShape {
  get type() {
    return "sphere";
  }
  constructor(params) {
    var _a, _b, _c;
    super();
    this.offset = (_a = params == null ? void 0 : params.offset) != null ? _a : new THREE34.Vector3(0, 0, 0);
    this.radius = (_b = params == null ? void 0 : params.radius) != null ? _b : 0;
    this.inside = (_c = params == null ? void 0 : params.inside) != null ? _c : false;
  }
  calculateCollision(colliderMatrix, objectPosition, objectRadius, target) {
    target.subVectors(objectPosition, _v3A33.setFromMatrixPosition(colliderMatrix));
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
var _v3A43 = new THREE44.Vector3();
var ColliderShapeCapsuleBufferGeometry = class extends THREE44.BufferGeometry {
  constructor(shape) {
    super();
    this.worldScale = 1;
    this._currentRadius = 0;
    this._currentOffset = new THREE44.Vector3();
    this._currentTail = new THREE44.Vector3();
    this._shape = shape;
    this._attrPos = new THREE44.BufferAttribute(new Float32Array(396), 3);
    this.setAttribute("position", this._attrPos);
    this._attrIndex = new THREE44.BufferAttribute(new Uint16Array(264), 1);
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
    const tail = _v3A43.copy(this._shape.tail).divideScalar(this.worldScale);
    if (this._currentTail.distanceToSquared(tail) > 1e-10) {
      this._currentTail.copy(tail);
      shouldUpdateGeometry = true;
    }
    if (shouldUpdateGeometry) {
      this._buildPosition();
    }
  }
  _buildPosition() {
    _v3A43.copy(this._currentTail).sub(this._currentOffset);
    const l = _v3A43.length() / this._currentRadius;
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
    const theta = Math.atan2(_v3A43.y, Math.sqrt(_v3A43.x * _v3A43.x + _v3A43.z * _v3A43.z));
    const phi = -Math.atan2(_v3A43.z, _v3A43.x);
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
var ColliderShapePlaneBufferGeometry = class extends THREE54.BufferGeometry {
  constructor(shape) {
    super();
    this.worldScale = 1;
    this._currentOffset = new THREE54.Vector3();
    this._currentNormal = new THREE54.Vector3();
    this._shape = shape;
    this._attrPos = new THREE54.BufferAttribute(new Float32Array(6 * 3), 3);
    this.setAttribute("position", this._attrPos);
    this._attrIndex = new THREE54.BufferAttribute(new Uint16Array(10), 1);
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
var ColliderShapeSphereBufferGeometry = class extends THREE62.BufferGeometry {
  constructor(shape) {
    super();
    this.worldScale = 1;
    this._currentRadius = 0;
    this._currentOffset = new THREE62.Vector3();
    this._shape = shape;
    this._attrPos = new THREE62.BufferAttribute(new Float32Array(32 * 3 * 3), 3);
    this.setAttribute("position", this._attrPos);
    this._attrIndex = new THREE62.BufferAttribute(new Uint16Array(64 * 3), 1);
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
var _v3A52 = new THREE72.Vector3();
var VRMSpringBoneColliderHelper = class extends THREE72.Group {
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
    const material = new THREE72.LineBasicMaterial({
      color: 16711935,
      depthTest: false,
      depthWrite: false
    });
    this._line = new THREE72.LineSegments(this._geometry, material);
    this.add(this._line);
  }
  dispose() {
    this._geometry.dispose();
  }
  updateMatrixWorld(force) {
    this.collider.updateWorldMatrix(true, false);
    this.matrix.copy(this.collider.matrixWorld);
    const matrixWorldElements = this.matrix.elements;
    this._geometry.worldScale = _v3A52.set(matrixWorldElements[0], matrixWorldElements[1], matrixWorldElements[2]).length();
    this._geometry.update();
    super.updateMatrixWorld(force);
  }
};
var SpringBoneBufferGeometry = class extends THREE82.BufferGeometry {
  constructor(springBone) {
    super();
    this.worldScale = 1;
    this._currentRadius = 0;
    this._currentTail = new THREE82.Vector3();
    this._springBone = springBone;
    this._attrPos = new THREE82.BufferAttribute(new Float32Array(294), 3);
    this.setAttribute("position", this._attrPos);
    this._attrIndex = new THREE82.BufferAttribute(new Uint16Array(194), 1);
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
var _v3A62 = new THREE92.Vector3();
var VRMSpringBoneJointHelper = class extends THREE92.Group {
  constructor(springBone) {
    super();
    this.matrixAutoUpdate = false;
    this.springBone = springBone;
    this._geometry = new SpringBoneBufferGeometry(this.springBone);
    const material = new THREE92.LineBasicMaterial({
      color: 16776960,
      depthTest: false,
      depthWrite: false
    });
    this._line = new THREE92.LineSegments(this._geometry, material);
    this.add(this._line);
  }
  dispose() {
    this._geometry.dispose();
  }
  updateMatrixWorld(force) {
    this.springBone.bone.updateWorldMatrix(true, false);
    this.matrix.copy(this.springBone.bone.matrixWorld);
    const matrixWorldElements = this.matrix.elements;
    this._geometry.worldScale = _v3A62.set(matrixWorldElements[0], matrixWorldElements[1], matrixWorldElements[2]).length();
    this._geometry.update();
    super.updateMatrixWorld(force);
  }
};
var VRMSpringBoneCollider = class extends THREE102.Object3D {
  constructor(shape) {
    super();
    this.colliderMatrix = new THREE102.Matrix4();
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
var _matA = new THREE112.Matrix4();
function mat4InvertCompat(target) {
  if (target.invert) {
    target.invert();
  } else {
    target.getInverse(_matA.copy(target));
  }
  return target;
}
var Matrix4InverseCache = class {
  constructor(matrix) {
    this._inverseCache = new THREE122.Matrix4();
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
var IDENTITY_MATRIX4 = new THREE132.Matrix4();
var _v3A72 = new THREE132.Vector3();
var _v3B23 = new THREE132.Vector3();
var _worldSpacePosition = new THREE132.Vector3();
var _nextTail = new THREE132.Vector3();
var _matA2 = new THREE132.Matrix4();
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
    this._currentTail = new THREE132.Vector3();
    this._prevTail = new THREE132.Vector3();
    this._boneAxis = new THREE132.Vector3();
    this._worldSpaceBoneLength = 0;
    this._center = null;
    this._initialLocalMatrix = new THREE132.Matrix4();
    this._initialLocalRotation = new THREE132.Quaternion();
    this._initialLocalChildPosition = new THREE132.Vector3();
    var _a, _b, _c, _d, _e, _f;
    this.bone = bone;
    this.bone.matrixAutoUpdate = false;
    this.child = child;
    this.settings = {
      hitRadius: (_a = settings.hitRadius) != null ? _a : 0,
      stiffness: (_b = settings.stiffness) != null ? _b : 1,
      gravityPower: (_c = settings.gravityPower) != null ? _c : 0,
      gravityDir: (_e = (_d = settings.gravityDir) == null ? void 0 : _d.clone()) != null ? _e : new THREE132.Vector3(0, -1, 0),
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
    const worldSpaceBoneAxis = _v3B23.copy(this._boneAxis).transformDirection(this._initialLocalMatrix).transformDirection(this._parentMatrixWorld);
    _nextTail.copy(this._currentTail).add(_v3A72.subVectors(this._currentTail, this._prevTail).multiplyScalar(1 - this.settings.dragForce)).applyMatrix4(this._getMatrixCenterToWorld()).addScaledVector(worldSpaceBoneAxis, this.settings.stiffness * delta).addScaledVector(this.settings.gravityDir, this.settings.gravityPower * delta);
    _worldSpacePosition.setFromMatrixPosition(this.bone.matrixWorld);
    _nextTail.sub(_worldSpacePosition).normalize().multiplyScalar(this._worldSpaceBoneLength).add(_worldSpacePosition);
    this._collision(_nextTail);
    this._prevTail.copy(this._currentTail);
    this._currentTail.copy(_nextTail).applyMatrix4(this._getMatrixWorldToCenter());
    const worldSpaceInitialMatrixInv = _matA2.multiplyMatrices(this._parentMatrixWorld, this._initialLocalMatrix).invert();
    this.bone.quaternion.setFromUnitVectors(this._boneAxis, _v3A72.copy(_nextTail).applyMatrix4(worldSpaceInitialMatrixInv).normalize()).premultiply(this._initialLocalRotation);
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
        const dist = collider.shape.calculateCollision(collider.colliderMatrix, tail, this.settings.hitRadius, _v3A72);
        if (dist < 0) {
          tail.addScaledVector(_v3A72, -dist);
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
    _v3A72.setFromMatrixPosition(this.bone.matrixWorld);
    if (this.child) {
      _v3B23.setFromMatrixPosition(this.child.matrixWorld);
    } else {
      _v3B23.copy(this._initialLocalChildPosition);
      _v3B23.applyMatrix4(this.bone.matrixWorld);
    }
    this._worldSpaceBoneLength = _v3A72.sub(_v3B23).length();
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
function traverseAncestorsFromRoot2(object, callback) {
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
function traverseChildrenUntilConditionMet(object, callback) {
  object.children.forEach((child) => {
    const result = callback(child);
    if (!result) {
      traverseChildrenUntilConditionMet(child, callback);
    }
  });
}
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
var VRMSpringBoneManager = class {
  constructor() {
    this._joints = /* @__PURE__ */ new Set();
    this._sortedJoints = [];
    this._hasWarnedCircularDependency = false;
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
      traverseAncestorsFromRoot2(depObject, (depObjectAncestor) => {
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
var EXTENSION_NAME_EXTENDED_COLLIDER = "VRMC_springBone_extended_collider";
var POSSIBLE_SPEC_VERSIONS8 = /* @__PURE__ */ new Set(["1.0", "1.0-beta"]);
var POSSIBLE_SPEC_VERSIONS_EXTENDED_COLLIDERS = /* @__PURE__ */ new Set(["1.0"]);
var _VRMSpringBoneLoaderPlugin = class _VRMSpringBoneLoaderPlugin2 {
  get name() {
    return _VRMSpringBoneLoaderPlugin2.EXTENSION_NAME;
  }
  constructor(parser, options) {
    var _a;
    this.parser = parser;
    this.jointHelperRoot = options == null ? void 0 : options.jointHelperRoot;
    this.colliderHelperRoot = options == null ? void 0 : options.colliderHelperRoot;
    this.useExtendedColliders = (_a = options == null ? void 0 : options.useExtendedColliders) != null ? _a : true;
  }
  afterRoot(gltf) {
    return __async7(this, null, function* () {
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
    return __async7(this, null, function* () {
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
    return __async7(this, null, function* () {
      var _a, _b, _c, _d, _e;
      const json = gltf.parser.json;
      const isSpringBoneUsed = ((_a = json.extensionsUsed) == null ? void 0 : _a.indexOf(_VRMSpringBoneLoaderPlugin2.EXTENSION_NAME)) !== -1;
      if (!isSpringBoneUsed) {
        return null;
      }
      const manager = new VRMSpringBoneManager();
      const threeNodes = yield gltf.parser.getDependencies("node");
      const extension = (_b = json.extensions) == null ? void 0 : _b[_VRMSpringBoneLoaderPlugin2.EXTENSION_NAME];
      if (!extension) {
        return null;
      }
      const specVersion = extension.specVersion;
      if (!POSSIBLE_SPEC_VERSIONS8.has(specVersion)) {
        console.warn(
          `VRMSpringBoneLoaderPlugin: Unknown ${_VRMSpringBoneLoaderPlugin2.EXTENSION_NAME} specVersion "${specVersion}"`
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
              `VRMSpringBoneLoaderPlugin: Unknown ${EXTENSION_NAME_EXTENDED_COLLIDER} specVersion "${specVersionExCollider}". Fallbacking to the ${_VRMSpringBoneLoaderPlugin2.EXTENSION_NAME} definition`
            );
          } else {
            const schemaExShape = schemaExCollider.shape;
            if (schemaExShape.sphere) {
              return this._importSphereCollider(node, {
                offset: new THREE142.Vector3().fromArray((_b2 = schemaExShape.sphere.offset) != null ? _b2 : [0, 0, 0]),
                radius: (_c2 = schemaExShape.sphere.radius) != null ? _c2 : 0,
                inside: (_d2 = schemaExShape.sphere.inside) != null ? _d2 : false
              });
            } else if (schemaExShape.capsule) {
              return this._importCapsuleCollider(node, {
                offset: new THREE142.Vector3().fromArray((_e2 = schemaExShape.capsule.offset) != null ? _e2 : [0, 0, 0]),
                radius: (_f = schemaExShape.capsule.radius) != null ? _f : 0,
                tail: new THREE142.Vector3().fromArray((_g = schemaExShape.capsule.tail) != null ? _g : [0, 0, 0]),
                inside: (_h = schemaExShape.capsule.inside) != null ? _h : false
              });
            } else if (schemaExShape.plane) {
              return this._importPlaneCollider(node, {
                offset: new THREE142.Vector3().fromArray((_i = schemaExShape.plane.offset) != null ? _i : [0, 0, 0]),
                normal: new THREE142.Vector3().fromArray((_j = schemaExShape.plane.normal) != null ? _j : [0, 0, 1])
              });
            }
          }
        }
        if (schemaShape.sphere) {
          return this._importSphereCollider(node, {
            offset: new THREE142.Vector3().fromArray((_k = schemaShape.sphere.offset) != null ? _k : [0, 0, 0]),
            radius: (_l = schemaShape.sphere.radius) != null ? _l : 0,
            inside: false
          });
        } else if (schemaShape.capsule) {
          return this._importCapsuleCollider(node, {
            offset: new THREE142.Vector3().fromArray((_m = schemaShape.capsule.offset) != null ? _m : [0, 0, 0]),
            radius: (_n = schemaShape.capsule.radius) != null ? _n : 0,
            tail: new THREE142.Vector3().fromArray((_o = schemaShape.capsule.tail) != null ? _o : [0, 0, 0]),
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
              gravityDir: prevSchemaJoint.gravityDir != null ? new THREE142.Vector3().fromArray(prevSchemaJoint.gravityDir) : void 0
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
    return __async7(this, null, function* () {
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
            const offset = new THREE142.Vector3(0, 0, 0);
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
          const gravityDir = new THREE142.Vector3();
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
};
_VRMSpringBoneLoaderPlugin.EXTENSION_NAME = "VRMC_springBone";
var VRMSpringBoneLoaderPlugin = _VRMSpringBoneLoaderPlugin;

// src/VRMLoaderPlugin.ts
var VRMLoaderPlugin = class {
  get name() {
    return "VRMLoaderPlugin";
  }
  constructor(parser, options) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
    this.parser = parser;
    const helperRoot = options == null ? void 0 : options.helperRoot;
    const autoUpdateHumanBones = options == null ? void 0 : options.autoUpdateHumanBones;
    this.expressionPlugin = (_a = options == null ? void 0 : options.expressionPlugin) != null ? _a : new VRMExpressionLoaderPlugin(parser);
    this.firstPersonPlugin = (_b = options == null ? void 0 : options.firstPersonPlugin) != null ? _b : new VRMFirstPersonLoaderPlugin(parser);
    this.humanoidPlugin = (_c = options == null ? void 0 : options.humanoidPlugin) != null ? _c : new VRMHumanoidLoaderPlugin(parser, {
      helperRoot,
      autoUpdateHumanBones
    });
    this.lookAtPlugin = (_d = options == null ? void 0 : options.lookAtPlugin) != null ? _d : new VRMLookAtLoaderPlugin(parser, { helperRoot });
    this.metaPlugin = (_e = options == null ? void 0 : options.metaPlugin) != null ? _e : new VRMMetaLoaderPlugin(parser);
    this.mtoonMaterialPlugin = (_f = options == null ? void 0 : options.mtoonMaterialPlugin) != null ? _f : new MToonMaterialLoaderPlugin(parser);
    this.materialsHDREmissiveMultiplierPlugin = (_g = options == null ? void 0 : options.materialsHDREmissiveMultiplierPlugin) != null ? _g : new VRMMaterialsHDREmissiveMultiplierLoaderPlugin(parser);
    this.materialsV0CompatPlugin = (_h = options == null ? void 0 : options.materialsV0CompatPlugin) != null ? _h : new VRMMaterialsV0CompatPlugin(parser);
    this.springBonePlugin = (_i = options == null ? void 0 : options.springBonePlugin) != null ? _i : new VRMSpringBoneLoaderPlugin(parser, {
      colliderHelperRoot: helperRoot,
      jointHelperRoot: helperRoot
    });
    this.nodeConstraintPlugin = (_j = options == null ? void 0 : options.nodeConstraintPlugin) != null ? _j : new VRMNodeConstraintLoaderPlugin(parser, { helperRoot });
  }
  beforeRoot() {
    return __async(this, null, function* () {
      yield this.materialsV0CompatPlugin.beforeRoot();
      yield this.mtoonMaterialPlugin.beforeRoot();
    });
  }
  loadMesh(meshIndex) {
    return __async(this, null, function* () {
      return yield this.mtoonMaterialPlugin.loadMesh(meshIndex);
    });
  }
  getMaterialType(materialIndex) {
    const mtoonType = this.mtoonMaterialPlugin.getMaterialType(materialIndex);
    if (mtoonType != null) {
      return mtoonType;
    }
    return null;
  }
  extendMaterialParams(materialIndex, materialParams) {
    return __async(this, null, function* () {
      yield this.materialsHDREmissiveMultiplierPlugin.extendMaterialParams(materialIndex, materialParams);
      yield this.mtoonMaterialPlugin.extendMaterialParams(materialIndex, materialParams);
    });
  }
  afterRoot(gltf) {
    return __async(this, null, function* () {
      yield this.metaPlugin.afterRoot(gltf);
      yield this.humanoidPlugin.afterRoot(gltf);
      yield this.expressionPlugin.afterRoot(gltf);
      yield this.lookAtPlugin.afterRoot(gltf);
      yield this.firstPersonPlugin.afterRoot(gltf);
      yield this.springBonePlugin.afterRoot(gltf);
      yield this.nodeConstraintPlugin.afterRoot(gltf);
      yield this.mtoonMaterialPlugin.afterRoot(gltf);
      const meta = gltf.userData.vrmMeta;
      const humanoid = gltf.userData.vrmHumanoid;
      if (meta && humanoid) {
        const vrm = new VRM({
          scene: gltf.scene,
          expressionManager: gltf.userData.vrmExpressionManager,
          firstPerson: gltf.userData.vrmFirstPerson,
          humanoid,
          lookAt: gltf.userData.vrmLookAt,
          meta,
          materials: gltf.userData.vrmMToonMaterials,
          springBoneManager: gltf.userData.vrmSpringBoneManager,
          nodeConstraintManager: gltf.userData.vrmNodeConstraintManager
        });
        gltf.userData.vrm = vrm;
      }
    });
  }
};

// src/VRMUtils/combineMorphs.ts
var THREE21 = __toESM(require("three"), 1);
function collectMeshes(scene) {
  const meshes = /* @__PURE__ */ new Set();
  scene.traverse((obj) => {
    if (!obj.isMesh) {
      return;
    }
    const mesh = obj;
    meshes.add(mesh);
  });
  return meshes;
}
function combineMorph(positionAttributes, binds, morphTargetsRelative) {
  if (binds.size === 1) {
    const bind = binds.values().next().value;
    if (bind.weight === 1) {
      return positionAttributes[bind.index];
    }
  }
  const newArray = new Float32Array(positionAttributes[0].count * 3);
  let weightSum = 0;
  if (morphTargetsRelative) {
    weightSum = 1;
  } else {
    for (const bind of binds) {
      weightSum += bind.weight;
    }
  }
  for (const bind of binds) {
    const src = positionAttributes[bind.index];
    const weight = bind.weight / weightSum;
    for (let i = 0; i < src.count; i++) {
      newArray[i * 3 + 0] += src.getX(i) * weight;
      newArray[i * 3 + 1] += src.getY(i) * weight;
      newArray[i * 3 + 2] += src.getZ(i) * weight;
    }
  }
  const newAttribute = new THREE21.BufferAttribute(newArray, 3);
  return newAttribute;
}
function combineMorphs(vrm) {
  var _a;
  const meshes = collectMeshes(vrm.scene);
  const meshNameBindSetMapMap = /* @__PURE__ */ new Map();
  const expressionMap = (_a = vrm.expressionManager) == null ? void 0 : _a.expressionMap;
  if (expressionMap != null) {
    for (const [expressionName, expression] of Object.entries(expressionMap)) {
      const bindsToDeleteSet = /* @__PURE__ */ new Set();
      for (const bind of expression.binds) {
        if (bind instanceof VRMExpressionMorphTargetBind) {
          if (bind.weight !== 0) {
            for (const mesh of bind.primitives) {
              let nameBindSetMap = meshNameBindSetMapMap.get(mesh);
              if (nameBindSetMap == null) {
                nameBindSetMap = /* @__PURE__ */ new Map();
                meshNameBindSetMapMap.set(mesh, nameBindSetMap);
              }
              let bindSet = nameBindSetMap.get(expressionName);
              if (bindSet == null) {
                bindSet = /* @__PURE__ */ new Set();
                nameBindSetMap.set(expressionName, bindSet);
              }
              bindSet.add(bind);
            }
          }
          bindsToDeleteSet.add(bind);
        }
      }
      for (const bind of bindsToDeleteSet) {
        expression.deleteBind(bind);
      }
    }
  }
  for (const mesh of meshes) {
    const nameBindSetMap = meshNameBindSetMapMap.get(mesh);
    if (nameBindSetMap == null) {
      continue;
    }
    const originalMorphAttributes = mesh.geometry.morphAttributes;
    mesh.geometry.morphAttributes = {};
    const geometry = mesh.geometry.clone();
    mesh.geometry = geometry;
    const morphTargetsRelative = geometry.morphTargetsRelative;
    const hasPMorph = originalMorphAttributes.position != null;
    const hasNMorph = originalMorphAttributes.normal != null;
    const morphAttributes = {};
    const morphTargetDictionary = {};
    const morphTargetInfluences = [];
    if (hasPMorph || hasNMorph) {
      if (hasPMorph) {
        morphAttributes.position = [];
      }
      if (hasNMorph) {
        morphAttributes.normal = [];
      }
      let i = 0;
      for (const [name, bindSet] of nameBindSetMap) {
        if (hasPMorph) {
          morphAttributes.position[i] = combineMorph(originalMorphAttributes.position, bindSet, morphTargetsRelative);
        }
        if (hasNMorph) {
          morphAttributes.normal[i] = combineMorph(originalMorphAttributes.normal, bindSet, morphTargetsRelative);
        }
        expressionMap == null ? void 0 : expressionMap[name].addBind(
          new VRMExpressionMorphTargetBind({
            index: i,
            weight: 1,
            primitives: [mesh]
          })
        );
        morphTargetDictionary[name] = i;
        morphTargetInfluences.push(0);
        i++;
      }
    }
    geometry.morphAttributes = morphAttributes;
    mesh.morphTargetDictionary = morphTargetDictionary;
    mesh.morphTargetInfluences = morphTargetInfluences;
  }
}

// src/VRMUtils/combineSkeletons.ts
var THREE27 = __toESM(require("three"), 1);

// src/utils/attributeGetComponentCompat.ts
var THREE25 = __toESM(require("three"), 1);
function attributeGetComponentCompat(attribute, index, component) {
  if (attribute.getComponent) {
    return attribute.getComponent(index, component);
  } else {
    let value = attribute.array[index * attribute.itemSize + component];
    if (attribute.normalized) {
      value = THREE25.MathUtils.denormalize(value, attribute.array);
    }
    return value;
  }
}

// src/utils/attributeSetComponentCompat.ts
var THREE26 = __toESM(require("three"), 1);
function attributeSetComponentCompat(attribute, index, component, value) {
  if (attribute.setComponent) {
    attribute.setComponent(index, component, value);
  } else {
    if (attribute.normalized) {
      value = THREE26.MathUtils.normalize(value, attribute.array);
    }
    attribute.array[index * attribute.itemSize + component] = value;
  }
}

// src/VRMUtils/combineSkeletons.ts
function combineSkeletons(root) {
  var _a;
  const skinnedMeshes = collectSkinnedMeshes(root);
  const geometries = /* @__PURE__ */ new Set();
  for (const mesh of skinnedMeshes) {
    if (geometries.has(mesh.geometry)) {
      mesh.geometry = shallowCloneBufferGeometry(mesh.geometry);
    }
    geometries.add(mesh.geometry);
  }
  const attributeUsedIndexSetMap = /* @__PURE__ */ new Map();
  for (const geometry of geometries) {
    const skinIndexAttr = geometry.getAttribute("skinIndex");
    const skinIndexMap = (_a = attributeUsedIndexSetMap.get(skinIndexAttr)) != null ? _a : /* @__PURE__ */ new Map();
    attributeUsedIndexSetMap.set(skinIndexAttr, skinIndexMap);
    const skinWeightAttr = geometry.getAttribute("skinWeight");
    const usedIndicesSet = listUsedIndices(skinIndexAttr, skinWeightAttr);
    skinIndexMap.set(skinWeightAttr, usedIndicesSet);
  }
  const meshBoneInverseMapMap = /* @__PURE__ */ new Map();
  for (const mesh of skinnedMeshes) {
    const boneInverseMap = listUsedBones(mesh, attributeUsedIndexSetMap);
    meshBoneInverseMapMap.set(mesh, boneInverseMap);
  }
  const groups = [];
  for (const [mesh, boneInverseMap] of meshBoneInverseMapMap) {
    let foundMergeableGroup = false;
    for (const candidate of groups) {
      const isMergeable = boneInverseMapIsMergeable(boneInverseMap, candidate.boneInverseMap);
      if (isMergeable) {
        foundMergeableGroup = true;
        candidate.meshes.add(mesh);
        for (const [bone, boneInverse] of boneInverseMap) {
          candidate.boneInverseMap.set(bone, boneInverse);
        }
        break;
      }
    }
    if (!foundMergeableGroup) {
      groups.push({ boneInverseMap, meshes: /* @__PURE__ */ new Set([mesh]) });
    }
  }
  const cache = /* @__PURE__ */ new Map();
  const skinIndexDispatcher = new ObjectIndexDispatcher();
  const skeletonDispatcher = new ObjectIndexDispatcher();
  const boneDispatcher = new ObjectIndexDispatcher();
  for (const group of groups) {
    const { boneInverseMap, meshes } = group;
    const newBones = Array.from(boneInverseMap.keys());
    const newBoneInverses = Array.from(boneInverseMap.values());
    const newSkeleton = new THREE27.Skeleton(newBones, newBoneInverses);
    const skeletonKey = skeletonDispatcher.getOrCreate(newSkeleton);
    for (const mesh of meshes) {
      const skinIndexAttr = mesh.geometry.getAttribute("skinIndex");
      const skinIndexKey = skinIndexDispatcher.getOrCreate(skinIndexAttr);
      const bones = mesh.skeleton.bones;
      const bonesKey = bones.map((bone) => boneDispatcher.getOrCreate(bone)).join(",");
      const key = `${skinIndexKey};${skeletonKey};${bonesKey}`;
      let newSkinIndexAttr = cache.get(key);
      if (newSkinIndexAttr == null) {
        newSkinIndexAttr = skinIndexAttr.clone();
        remapSkinIndexAttribute(newSkinIndexAttr, bones, newBones);
        cache.set(key, newSkinIndexAttr);
      }
      mesh.geometry.setAttribute("skinIndex", newSkinIndexAttr);
    }
    for (const mesh of meshes) {
      mesh.bind(newSkeleton, new THREE27.Matrix4());
    }
  }
}
function collectSkinnedMeshes(scene) {
  const skinnedMeshes = /* @__PURE__ */ new Set();
  scene.traverse((obj) => {
    if (!obj.isSkinnedMesh) {
      return;
    }
    const skinnedMesh = obj;
    skinnedMeshes.add(skinnedMesh);
  });
  return skinnedMeshes;
}
function listUsedIndices(skinIndexAttr, skinWeightAttr) {
  const usedIndices = /* @__PURE__ */ new Set();
  for (let i = 0; i < skinIndexAttr.count; i++) {
    for (let j = 0; j < skinIndexAttr.itemSize; j++) {
      const index = attributeGetComponentCompat(skinIndexAttr, i, j);
      const weight = attributeGetComponentCompat(skinWeightAttr, i, j);
      if (weight !== 0) {
        usedIndices.add(index);
      }
    }
  }
  return usedIndices;
}
function listUsedBones(mesh, attributeUsedIndexSetMap) {
  const boneInverseMap = /* @__PURE__ */ new Map();
  const skeleton = mesh.skeleton;
  const geometry = mesh.geometry;
  const skinIndexAttr = geometry.getAttribute("skinIndex");
  const skinWeightAttr = geometry.getAttribute("skinWeight");
  const skinIndexMap = attributeUsedIndexSetMap.get(skinIndexAttr);
  const usedIndicesSet = skinIndexMap == null ? void 0 : skinIndexMap.get(skinWeightAttr);
  if (!usedIndicesSet) {
    throw new Error(
      "Unreachable. attributeUsedIndexSetMap does not know the skin index attribute or the skin weight attribute."
    );
  }
  for (const index of usedIndicesSet) {
    boneInverseMap.set(skeleton.bones[index], skeleton.boneInverses[index]);
  }
  return boneInverseMap;
}
function boneInverseMapIsMergeable(toCheck, candidate) {
  for (const [bone, boneInverse] of toCheck.entries()) {
    const candidateBoneInverse = candidate.get(bone);
    if (candidateBoneInverse != null) {
      if (!matrixEquals(boneInverse, candidateBoneInverse)) {
        return false;
      }
    }
  }
  return true;
}
function remapSkinIndexAttribute(attribute, oldBones, newBones) {
  const boneOldIndexMap = /* @__PURE__ */ new Map();
  for (const bone of oldBones) {
    boneOldIndexMap.set(bone, boneOldIndexMap.size);
  }
  const oldToNew = /* @__PURE__ */ new Map();
  for (const [i, bone] of newBones.entries()) {
    const oldIndex = boneOldIndexMap.get(bone);
    oldToNew.set(oldIndex, i);
  }
  for (let i = 0; i < attribute.count; i++) {
    for (let j = 0; j < attribute.itemSize; j++) {
      const oldIndex = attributeGetComponentCompat(attribute, i, j);
      const newIndex = oldToNew.get(oldIndex);
      attributeSetComponentCompat(attribute, i, j, newIndex);
    }
  }
  attribute.needsUpdate = true;
}
function matrixEquals(a, b, tolerance) {
  tolerance = tolerance || 1e-4;
  if (a.elements.length != b.elements.length) {
    return false;
  }
  for (let i = 0, il = a.elements.length; i < il; i++) {
    const delta = Math.abs(a.elements[i] - b.elements[i]);
    if (delta > tolerance) {
      return false;
    }
  }
  return true;
}
var ObjectIndexDispatcher = class {
  constructor() {
    this._objectIndexMap = /* @__PURE__ */ new Map();
    this._index = 0;
  }
  get(obj) {
    return this._objectIndexMap.get(obj);
  }
  getOrCreate(obj) {
    let index = this._objectIndexMap.get(obj);
    if (index == null) {
      index = this._index;
      this._objectIndexMap.set(obj, index);
      this._index++;
    }
    return index;
  }
};
function shallowCloneBufferGeometry(geometry) {
  var _a, _b, _c, _d;
  const clone = new THREE27.BufferGeometry();
  clone.name = geometry.name;
  clone.setIndex(geometry.index);
  for (const [name, attribute] of Object.entries(geometry.attributes)) {
    clone.setAttribute(name, attribute);
  }
  for (const [key, morphAttributes] of Object.entries(geometry.morphAttributes)) {
    const attributeName = key;
    clone.morphAttributes[attributeName] = morphAttributes.concat();
  }
  clone.morphTargetsRelative = geometry.morphTargetsRelative;
  clone.groups = [];
  for (const group of geometry.groups) {
    clone.addGroup(group.start, group.count, group.materialIndex);
  }
  clone.boundingSphere = (_b = (_a = geometry.boundingSphere) == null ? void 0 : _a.clone()) != null ? _b : null;
  clone.boundingBox = (_d = (_c = geometry.boundingBox) == null ? void 0 : _c.clone()) != null ? _d : null;
  clone.drawRange.start = geometry.drawRange.start;
  clone.drawRange.count = geometry.drawRange.count;
  clone.userData = geometry.userData;
  return clone;
}

// src/VRMUtils/deepDispose.ts
function disposeMaterial(material) {
  Object.values(material).forEach((value) => {
    if (value == null ? void 0 : value.isTexture) {
      const texture = value;
      texture.dispose();
    }
  });
  if (material.isShaderMaterial) {
    const uniforms = material.uniforms;
    if (uniforms) {
      Object.values(uniforms).forEach((uniform) => {
        const value = uniform.value;
        if (value == null ? void 0 : value.isTexture) {
          const texture = value;
          texture.dispose();
        }
      });
    }
  }
  material.dispose();
}
function dispose(object3D) {
  const geometry = object3D.geometry;
  if (geometry) {
    geometry.dispose();
  }
  const skeleton = object3D.skeleton;
  if (skeleton) {
    skeleton.dispose();
  }
  const material = object3D.material;
  if (material) {
    if (Array.isArray(material)) {
      material.forEach((material2) => disposeMaterial(material2));
    } else if (material) {
      disposeMaterial(material);
    }
  }
}
function deepDispose(object3D) {
  object3D.traverse(dispose);
}

// src/VRMUtils/removeUnnecessaryJoints.ts
var THREE28 = __toESM(require("three"), 1);
function removeUnnecessaryJoints(root, options) {
  var _a, _b;
  console.warn(
    "VRMUtils.removeUnnecessaryJoints: removeUnnecessaryJoints is deprecated. Use combineSkeletons instead. combineSkeletons contributes more to the performance improvement. This function will be removed in the next major version."
  );
  const experimentalSameBoneCounts = (_a = options == null ? void 0 : options.experimentalSameBoneCounts) != null ? _a : false;
  const skinnedMeshes = [];
  root.traverse((obj) => {
    if (obj.type !== "SkinnedMesh") {
      return;
    }
    skinnedMeshes.push(obj);
  });
  const attributeToBoneIndexMapMap = /* @__PURE__ */ new Map();
  let maxBones = 0;
  for (const mesh of skinnedMeshes) {
    const geometry = mesh.geometry;
    const attribute = geometry.getAttribute("skinIndex");
    if (attributeToBoneIndexMapMap.has(attribute)) {
      continue;
    }
    const oldToNew = /* @__PURE__ */ new Map();
    const newToOld = /* @__PURE__ */ new Map();
    for (let i = 0; i < attribute.count; i++) {
      for (let j = 0; j < attribute.itemSize; j++) {
        const oldIndex = attributeGetComponentCompat(attribute, i, j);
        let newIndex = oldToNew.get(oldIndex);
        if (newIndex == null) {
          newIndex = oldToNew.size;
          oldToNew.set(oldIndex, newIndex);
          newToOld.set(newIndex, oldIndex);
        }
        attributeSetComponentCompat(attribute, i, j, newIndex);
      }
    }
    attribute.needsUpdate = true;
    attributeToBoneIndexMapMap.set(attribute, newToOld);
    maxBones = Math.max(maxBones, oldToNew.size);
  }
  for (const mesh of skinnedMeshes) {
    const geometry = mesh.geometry;
    const attribute = geometry.getAttribute("skinIndex");
    const newToOld = attributeToBoneIndexMapMap.get(attribute);
    const bones = [];
    const boneInverses = [];
    const nBones = experimentalSameBoneCounts ? maxBones : newToOld.size;
    for (let newIndex = 0; newIndex < nBones; newIndex++) {
      const oldIndex = (_b = newToOld.get(newIndex)) != null ? _b : 0;
      bones.push(mesh.skeleton.bones[oldIndex]);
      boneInverses.push(mesh.skeleton.boneInverses[oldIndex]);
    }
    const skeleton = new THREE28.Skeleton(bones, boneInverses);
    mesh.bind(skeleton, new THREE28.Matrix4());
  }
}

// src/VRMUtils/removeUnnecessaryVertices.ts
var THREE29 = __toESM(require("three"), 1);
var import_three = require("three");
function checkIsVertexUsed(attributes, originalIndex) {
  const vertexCount = attributes.position.count;
  const isVertexUsed = new Array(vertexCount);
  let verticesUsed = 0;
  const originalIndexArray = originalIndex.array;
  for (let i = 0; i < originalIndexArray.length; i++) {
    const index = originalIndexArray[i];
    if (!isVertexUsed[index]) {
      isVertexUsed[index] = true;
      verticesUsed++;
    }
  }
  return { isVertexUsed, vertexCount, verticesUsed };
}
function buildIndexMapsFromIsVertexUsed(isVertexUsed) {
  const originalIndexNewIndexMap = [];
  const newIndexOriginalIndexMap = [];
  let indexHead = 0;
  for (let i = 0; i < isVertexUsed.length; i++) {
    if (isVertexUsed[i]) {
      const newIndex = indexHead++;
      originalIndexNewIndexMap[i] = newIndex;
      newIndexOriginalIndexMap[newIndex] = i;
    }
  }
  return { originalIndexNewIndexMap, newIndexOriginalIndexMap };
}
function copyGeometryProperties(source, target) {
  var _a, _b, _c, _d;
  target.name = source.name;
  target.morphTargetsRelative = source.morphTargetsRelative;
  source.groups.forEach((group) => {
    target.addGroup(group.start, group.count, group.materialIndex);
  });
  target.boundingBox = (_b = (_a = source.boundingBox) == null ? void 0 : _a.clone()) != null ? _b : null;
  target.boundingSphere = (_d = (_c = source.boundingSphere) == null ? void 0 : _c.clone()) != null ? _d : null;
  target.setDrawRange(source.drawRange.start, source.drawRange.count);
  target.userData = source.userData;
}
function reorganizeIndexAttribute(newGeometry, originalIndex, originalIndexNewIndexMap) {
  const originalIndexArray = originalIndex.array;
  const newIndexArray = new originalIndexArray.constructor(originalIndexArray.length);
  for (let i = 0; i < originalIndexArray.length; i++) {
    const index = originalIndexArray[i];
    newIndexArray[i] = originalIndexNewIndexMap[index];
  }
  newGeometry.setIndex(new import_three.BufferAttribute(newIndexArray, originalIndex.itemSize, originalIndex.normalized));
}
function remapAttributeArray(originalArray, newIndexOriginalIndexMap, stride) {
  const ArrayCtor = originalArray.constructor;
  const newArray = new ArrayCtor(newIndexOriginalIndexMap.length * stride);
  let isAllZero = true;
  for (let i = 0; i < newIndexOriginalIndexMap.length; i++) {
    const originalIndex = newIndexOriginalIndexMap[i];
    const srcBase = originalIndex * stride;
    const dstBase = i * stride;
    for (let j = 0; j < stride; j++) {
      const v = originalArray[srcBase + j];
      newArray[dstBase + j] = v;
      isAllZero = isAllZero && v === 0;
    }
  }
  return [newArray, isAllZero];
}
function collectGeometryAttributeGroups(attributes) {
  var _a;
  const interleavedBufferAttributeMap = /* @__PURE__ */ new Map();
  const nonInterleavedAttributes = [];
  for (const [attributeName, originalAttribute] of Object.entries(attributes)) {
    if (originalAttribute.isInterleavedBufferAttribute) {
      const interleavedAttribute = originalAttribute;
      const interleavedBuffer = interleavedAttribute.data;
      const group = (_a = interleavedBufferAttributeMap.get(interleavedBuffer)) != null ? _a : [];
      interleavedBufferAttributeMap.set(interleavedBuffer, group);
      group.push([attributeName, interleavedAttribute]);
    } else {
      const attribute = originalAttribute;
      nonInterleavedAttributes.push([attributeName, attribute]);
    }
  }
  return [interleavedBufferAttributeMap, nonInterleavedAttributes];
}
function reorganizeGeometryAttributes(newGeometry, attributes, newIndexOriginalIndexMap) {
  const [interleavedBufferAttributeMap, nonInterleavedAttributes] = collectGeometryAttributeGroups(attributes);
  for (const [interleavedBuffer, attributesInGroup] of interleavedBufferAttributeMap) {
    const originalInterleavedBufferArray = interleavedBuffer.array;
    const { stride } = interleavedBuffer;
    const [newInterleavedArray, _] = remapAttributeArray(
      originalInterleavedBufferArray,
      newIndexOriginalIndexMap,
      stride
    );
    const newInterleavedBuffer = new THREE29.InterleavedBuffer(newInterleavedArray, stride);
    newInterleavedBuffer.setUsage(interleavedBuffer.usage);
    for (const [attributeName, originalAttribute] of attributesInGroup) {
      const { itemSize, offset, normalized } = originalAttribute;
      const newAttribute = new THREE29.InterleavedBufferAttribute(newInterleavedBuffer, itemSize, offset, normalized);
      newGeometry.setAttribute(attributeName, newAttribute);
    }
  }
  for (const [attributeName, originalAttribute] of nonInterleavedAttributes) {
    const originalAttributeArray = originalAttribute.array;
    const { itemSize, normalized } = originalAttribute;
    const [newAttributeArray, _] = remapAttributeArray(originalAttributeArray, newIndexOriginalIndexMap, itemSize);
    newGeometry.setAttribute(attributeName, new import_three.BufferAttribute(newAttributeArray, itemSize, normalized));
  }
}
function collectMorphAttributeGroups(morphAttributes) {
  var _a;
  const interleavedBufferAttributeMap = /* @__PURE__ */ new Map();
  const nonInterleavedAttributes = [];
  for (const [key, attributes] of Object.entries(morphAttributes)) {
    const attributeName = key;
    for (let iMorph = 0; iMorph < attributes.length; iMorph++) {
      const originalAttribute = attributes[iMorph];
      if (originalAttribute.isInterleavedBufferAttribute) {
        const interleavedAttribute = originalAttribute;
        const interleavedBuffer = interleavedAttribute.data;
        const group = (_a = interleavedBufferAttributeMap.get(interleavedBuffer)) != null ? _a : [];
        interleavedBufferAttributeMap.set(interleavedBuffer, group);
        group.push([attributeName, iMorph, interleavedAttribute]);
      } else {
        const attribute = originalAttribute;
        nonInterleavedAttributes.push([attributeName, iMorph, attribute]);
      }
    }
  }
  return [interleavedBufferAttributeMap, nonInterleavedAttributes];
}
function reorganizeMorphAttributes(newGeometry, morphAttributes, newIndexOriginalIndexMap) {
  var _a, _b;
  let allMorphsAreZero = true;
  const [interleavedBufferAttributeMap, nonInterleavedAttributes] = collectMorphAttributeGroups(morphAttributes);
  const newMorphAttributes = {};
  for (const [interleavedBuffer, attributesInGroup] of interleavedBufferAttributeMap) {
    const originalInterleavedBufferArray = interleavedBuffer.array;
    const { stride } = interleavedBuffer;
    const [newInterleavedArray, isAllZero] = remapAttributeArray(
      originalInterleavedBufferArray,
      newIndexOriginalIndexMap,
      stride
    );
    allMorphsAreZero = allMorphsAreZero && isAllZero;
    const newInterleavedBuffer = new THREE29.InterleavedBuffer(newInterleavedArray, stride);
    newInterleavedBuffer.setUsage(interleavedBuffer.usage);
    for (const [attributeName, morphIndex, attribute] of attributesInGroup) {
      const { itemSize, offset, normalized } = attribute;
      const newAttribute = new THREE29.InterleavedBufferAttribute(newInterleavedBuffer, itemSize, offset, normalized);
      (_a = newMorphAttributes[attributeName]) != null ? _a : newMorphAttributes[attributeName] = [];
      newMorphAttributes[attributeName][morphIndex] = newAttribute;
    }
  }
  for (const [attributeName, morphIndex, attribute] of nonInterleavedAttributes) {
    const originalAttribute = attribute;
    const originalAttributeArray = originalAttribute.array;
    const { itemSize, normalized } = originalAttribute;
    const [newAttributeArray, isAllZero] = remapAttributeArray(
      originalAttributeArray,
      newIndexOriginalIndexMap,
      itemSize
    );
    allMorphsAreZero = allMorphsAreZero && isAllZero;
    (_b = newMorphAttributes[attributeName]) != null ? _b : newMorphAttributes[attributeName] = [];
    newMorphAttributes[attributeName][morphIndex] = new import_three.BufferAttribute(newAttributeArray, itemSize, normalized);
  }
  newGeometry.morphAttributes = allMorphsAreZero ? {} : newMorphAttributes;
}
function removeUnnecessaryVertices(root) {
  const geometryMap = /* @__PURE__ */ new Map();
  root.traverse((obj) => {
    if (!obj.isMesh) {
      return;
    }
    const mesh = obj;
    const geometry = mesh.geometry;
    const originalIndex = geometry.index;
    if (originalIndex == null) {
      return;
    }
    const newGeometryAlreadyExisted = geometryMap.get(geometry);
    if (newGeometryAlreadyExisted != null) {
      mesh.geometry = newGeometryAlreadyExisted;
      return;
    }
    const { isVertexUsed, vertexCount, verticesUsed } = checkIsVertexUsed(geometry.attributes, originalIndex);
    if (verticesUsed === vertexCount) {
      return;
    }
    const { originalIndexNewIndexMap, newIndexOriginalIndexMap } = buildIndexMapsFromIsVertexUsed(isVertexUsed);
    const newGeometry = new THREE29.BufferGeometry();
    copyGeometryProperties(geometry, newGeometry);
    geometryMap.set(geometry, newGeometry);
    reorganizeIndexAttribute(newGeometry, originalIndex, originalIndexNewIndexMap);
    reorganizeGeometryAttributes(newGeometry, geometry.attributes, newIndexOriginalIndexMap);
    reorganizeMorphAttributes(newGeometry, geometry.morphAttributes, newIndexOriginalIndexMap);
    mesh.geometry = newGeometry;
  });
  Array.from(geometryMap.keys()).forEach((originalGeometry) => {
    originalGeometry.dispose();
  });
}

// src/VRMUtils/rotateVRM0.ts
function rotateVRM0(vrm) {
  var _a;
  if (((_a = vrm.meta) == null ? void 0 : _a.metaVersion) === "0") {
    vrm.scene.rotation.y = Math.PI;
  }
}

// src/VRMUtils/index.ts
var VRMUtils = class {
  constructor() {
  }
};
VRMUtils.combineMorphs = combineMorphs;
VRMUtils.combineSkeletons = combineSkeletons;
VRMUtils.deepDispose = deepDispose;
VRMUtils.removeUnnecessaryJoints = removeUnnecessaryJoints;
VRMUtils.removeUnnecessaryVertices = removeUnnecessaryVertices;
VRMUtils.rotateVRM0 = rotateVRM0;
/*!
 * @pixiv/three-vrm-core v3.5.5
 * The implementation of core features of VRM, for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2026 pixiv Inc.
 * @pixiv/three-vrm-core is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
/*!
 * @pixiv/three-vrm-materials-mtoon v3.5.5
 * MToon (toon material) module for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2026 pixiv Inc.
 * @pixiv/three-vrm-materials-mtoon is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
/*!
 * @pixiv/three-vrm-materials-hdr-emissive-multiplier v3.5.5
 * Support VRMC_hdr_emissiveMultiplier for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2026 pixiv Inc.
 * @pixiv/three-vrm-materials-hdr-emissive-multiplier is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
/*!
 * @pixiv/three-vrm-materials-v0compat v3.5.5
 * VRM0.0 materials compatibility layer plugin for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2026 pixiv Inc.
 * @pixiv/three-vrm-materials-v0compat is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
/*!
 * @pixiv/three-vrm-node-constraint v3.5.5
 * Node constraint module for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2026 pixiv Inc.
 * @pixiv/three-vrm-node-constraint is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
/*!
 * @pixiv/three-vrm-springbone v3.5.5
 * Spring bone module for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2026 pixiv Inc.
 * @pixiv/three-vrm-springbone is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9leHByZXNzaW9ucy9WUk1FeHByZXNzaW9uLnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9leHByZXNzaW9ucy9WUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luLnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy91dGlscy9nbHRmRXh0cmFjdFByaW1pdGl2ZXNGcm9tTm9kZS50cyIsICIuLi8uLi90aHJlZS12cm0tY29yZS9zcmMvZXhwcmVzc2lvbnMvVlJNRXhwcmVzc2lvblByZXNldE5hbWUudHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL3V0aWxzL3NhdHVyYXRlLnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9leHByZXNzaW9ucy9WUk1FeHByZXNzaW9uTWFuYWdlci50cyIsICIuLi8uLi90aHJlZS12cm0tY29yZS9zcmMvZXhwcmVzc2lvbnMvVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JUeXBlLnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9leHByZXNzaW9ucy9WUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvckJpbmQudHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL2V4cHJlc3Npb25zL1ZSTUV4cHJlc3Npb25Nb3JwaFRhcmdldEJpbmQudHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL2V4cHJlc3Npb25zL1ZSTUV4cHJlc3Npb25UZXh0dXJlVHJhbnNmb3JtQmluZC50cyIsICIuLi8uLi90aHJlZS12cm0tY29yZS9zcmMvZXhwcmVzc2lvbnMvVlJNRXhwcmVzc2lvbk92ZXJyaWRlVHlwZS50cyIsICIuLi8uLi90aHJlZS12cm0tY29yZS9zcmMvZmlyc3RQZXJzb24vVlJNRmlyc3RQZXJzb24udHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL2ZpcnN0UGVyc29uL1ZSTUZpcnN0UGVyc29uTG9hZGVyUGx1Z2luLnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9maXJzdFBlcnNvbi9WUk1GaXJzdFBlcnNvbk1lc2hBbm5vdGF0aW9uVHlwZS50cyIsICIuLi8uLi90aHJlZS12cm0tY29yZS9zcmMvaHVtYW5vaWQvaGVscGVycy9WUk1IdW1hbm9pZEhlbHBlci50cyIsICIuLi8uLi90aHJlZS12cm0tY29yZS9zcmMvaHVtYW5vaWQvVlJNSHVtYW5Cb25lTGlzdC50cyIsICIuLi8uLi90aHJlZS12cm0tY29yZS9zcmMvaHVtYW5vaWQvVlJNSHVtYW5Cb25lTmFtZS50cyIsICIuLi8uLi90aHJlZS12cm0tY29yZS9zcmMvaHVtYW5vaWQvVlJNSHVtYW5Cb25lUGFyZW50TWFwLnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9odW1hbm9pZC9WUk1SaWcudHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL3V0aWxzL3F1YXRJbnZlcnRDb21wYXQudHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL2h1bWFub2lkL1ZSTUh1bWFub2lkUmlnLnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9odW1hbm9pZC9WUk1IdW1hbm9pZC50cyIsICIuLi8uLi90aHJlZS12cm0tY29yZS9zcmMvaHVtYW5vaWQvVlJNUmVxdWlyZWRIdW1hbkJvbmVOYW1lLnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9odW1hbm9pZC9WUk1IdW1hbm9pZExvYWRlclBsdWdpbi50cyIsICIuLi8uLi90aHJlZS12cm0tY29yZS9zcmMvbG9va0F0L2hlbHBlcnMvVlJNTG9va0F0SGVscGVyLnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9sb29rQXQvaGVscGVycy91dGlscy9GYW5CdWZmZXJHZW9tZXRyeS50cyIsICIuLi8uLi90aHJlZS12cm0tY29yZS9zcmMvbG9va0F0L2hlbHBlcnMvdXRpbHMvTGluZUFuZFNwaGVyZUJ1ZmZlckdlb21ldHJ5LnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9sb29rQXQvVlJNTG9va0F0LnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy91dGlscy9nZXRXb3JsZFF1YXRlcm5pb25MaXRlLnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9sb29rQXQvdXRpbHMvY2FsY0F6aW11dGhBbHRpdHVkZS50cyIsICIuLi8uLi90aHJlZS12cm0tY29yZS9zcmMvbG9va0F0L3V0aWxzL3Nhbml0aXplQW5nbGUudHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL2xvb2tBdC9WUk1Mb29rQXRCb25lQXBwbGllci50cyIsICIuLi8uLi90aHJlZS12cm0tY29yZS9zcmMvbG9va0F0L1ZSTUxvb2tBdEV4cHJlc3Npb25BcHBsaWVyLnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9sb29rQXQvVlJNTG9va0F0UmFuZ2VNYXAudHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL2xvb2tBdC9WUk1Mb29rQXRMb2FkZXJQbHVnaW4udHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL2xvb2tBdC9WUk1Mb29rQXRUeXBlTmFtZS50cyIsICIuLi8uLi90aHJlZS12cm0tY29yZS9zcmMvbWV0YS9WUk1NZXRhTG9hZGVyUGx1Z2luLnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy91dGlscy9yZXNvbHZlVVJMLnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9WUk1Db3JlLnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9WUk1Db3JlTG9hZGVyUGx1Z2luLnRzIiwgIi4uL3NyYy9WUk0udHMiLCAiLi4vLi4vdGhyZWUtdnJtLW1hdGVyaWFscy1tdG9vbi9zcmMvTVRvb25NYXRlcmlhbExvYWRlclBsdWdpbi50cyIsICIuLi8uLi90aHJlZS12cm0tbWF0ZXJpYWxzLW10b29uL3NyYy9HTFRGTVRvb25NYXRlcmlhbFBhcmFtc0Fzc2lnbkhlbHBlci50cyIsICIuLi8uLi90aHJlZS12cm0tbWF0ZXJpYWxzLW10b29uL3NyYy91dGlscy9zZXRUZXh0dXJlQ29sb3JTcGFjZS50cyIsICIuLi8uLi90aHJlZS12cm0tbWF0ZXJpYWxzLW10b29uL3NyYy9NVG9vbk1hdGVyaWFsLnRzIiwgIi4uLy4uL3RocmVlLXZybS1tYXRlcmlhbHMtbXRvb24vc3JjL3NoYWRlcnMvbXRvb24udmVydCIsICIuLi8uLi90aHJlZS12cm0tbWF0ZXJpYWxzLW10b29uL3NyYy9zaGFkZXJzL210b29uLmZyYWciLCAiLi4vLi4vdGhyZWUtdnJtLW1hdGVyaWFscy1tdG9vbi9zcmMvTVRvb25NYXRlcmlhbERlYnVnTW9kZS50cyIsICIuLi8uLi90aHJlZS12cm0tbWF0ZXJpYWxzLW10b29uL3NyYy9NVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZS50cyIsICIuLi8uLi90aHJlZS12cm0tbWF0ZXJpYWxzLW10b29uL3NyYy91dGlscy9nZXRUZXh0dXJlQ29sb3JTcGFjZS50cyIsICIuLi8uLi90aHJlZS12cm0tbWF0ZXJpYWxzLWhkci1lbWlzc2l2ZS1tdWx0aXBsaWVyL3NyYy9WUk1NYXRlcmlhbHNIRFJFbWlzc2l2ZU11bHRpcGxpZXJMb2FkZXJQbHVnaW4udHMiLCAiLi4vLi4vdGhyZWUtdnJtLW1hdGVyaWFscy12MGNvbXBhdC9zcmMvVlJNTWF0ZXJpYWxzVjBDb21wYXRQbHVnaW4udHMiLCAiLi4vLi4vdGhyZWUtdnJtLW1hdGVyaWFscy12MGNvbXBhdC9zcmMvdXRpbHMvZ2FtbWFFT1RGLnRzIiwgIi4uLy4uL3RocmVlLXZybS1ub2RlLWNvbnN0cmFpbnQvc3JjL2hlbHBlcnMvVlJNTm9kZUNvbnN0cmFpbnRIZWxwZXIudHMiLCAiLi4vLi4vdGhyZWUtdnJtLW5vZGUtY29uc3RyYWludC9zcmMvVlJNQWltQ29uc3RyYWludC50cyIsICIuLi8uLi90aHJlZS12cm0tbm9kZS1jb25zdHJhaW50L3NyYy91dGlscy9kZWNvbXBvc2VQb3NpdGlvbi50cyIsICIuLi8uLi90aHJlZS12cm0tbm9kZS1jb25zdHJhaW50L3NyYy91dGlscy9kZWNvbXBvc2VSb3RhdGlvbi50cyIsICIuLi8uLi90aHJlZS12cm0tbm9kZS1jb25zdHJhaW50L3NyYy91dGlscy9xdWF0SW52ZXJ0Q29tcGF0LnRzIiwgIi4uLy4uL3RocmVlLXZybS1ub2RlLWNvbnN0cmFpbnQvc3JjL1ZSTU5vZGVDb25zdHJhaW50LnRzIiwgIi4uLy4uL3RocmVlLXZybS1ub2RlLWNvbnN0cmFpbnQvc3JjL3V0aWxzL3RyYXZlcnNlQW5jZXN0b3JzRnJvbVJvb3QudHMiLCAiLi4vLi4vdGhyZWUtdnJtLW5vZGUtY29uc3RyYWludC9zcmMvVlJNTm9kZUNvbnN0cmFpbnRNYW5hZ2VyLnRzIiwgIi4uLy4uL3RocmVlLXZybS1ub2RlLWNvbnN0cmFpbnQvc3JjL1ZSTVJvdGF0aW9uQ29uc3RyYWludC50cyIsICIuLi8uLi90aHJlZS12cm0tbm9kZS1jb25zdHJhaW50L3NyYy9WUk1Sb2xsQ29uc3RyYWludC50cyIsICIuLi8uLi90aHJlZS12cm0tbm9kZS1jb25zdHJhaW50L3NyYy9WUk1Ob2RlQ29uc3RyYWludExvYWRlclBsdWdpbi50cyIsICIuLi8uLi90aHJlZS12cm0tc3ByaW5nYm9uZS9zcmMvaGVscGVycy9WUk1TcHJpbmdCb25lQ29sbGlkZXJIZWxwZXIudHMiLCAiLi4vLi4vdGhyZWUtdnJtLXNwcmluZ2JvbmUvc3JjL1ZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlQ2Fwc3VsZS50cyIsICIuLi8uLi90aHJlZS12cm0tc3ByaW5nYm9uZS9zcmMvVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGUudHMiLCAiLi4vLi4vdGhyZWUtdnJtLXNwcmluZ2JvbmUvc3JjL1ZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlUGxhbmUudHMiLCAiLi4vLi4vdGhyZWUtdnJtLXNwcmluZ2JvbmUvc3JjL1ZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlU3BoZXJlLnRzIiwgIi4uLy4uL3RocmVlLXZybS1zcHJpbmdib25lL3NyYy9oZWxwZXJzL3V0aWxzL0NvbGxpZGVyU2hhcGVDYXBzdWxlQnVmZmVyR2VvbWV0cnkudHMiLCAiLi4vLi4vdGhyZWUtdnJtLXNwcmluZ2JvbmUvc3JjL2hlbHBlcnMvdXRpbHMvQ29sbGlkZXJTaGFwZVBsYW5lQnVmZmVyR2VvbWV0cnkudHMiLCAiLi4vLi4vdGhyZWUtdnJtLXNwcmluZ2JvbmUvc3JjL2hlbHBlcnMvdXRpbHMvQ29sbGlkZXJTaGFwZVNwaGVyZUJ1ZmZlckdlb21ldHJ5LnRzIiwgIi4uLy4uL3RocmVlLXZybS1zcHJpbmdib25lL3NyYy9oZWxwZXJzL1ZSTVNwcmluZ0JvbmVKb2ludEhlbHBlci50cyIsICIuLi8uLi90aHJlZS12cm0tc3ByaW5nYm9uZS9zcmMvaGVscGVycy91dGlscy9TcHJpbmdCb25lQnVmZmVyR2VvbWV0cnkudHMiLCAiLi4vLi4vdGhyZWUtdnJtLXNwcmluZ2JvbmUvc3JjL1ZSTVNwcmluZ0JvbmVDb2xsaWRlci50cyIsICIuLi8uLi90aHJlZS12cm0tc3ByaW5nYm9uZS9zcmMvVlJNU3ByaW5nQm9uZUpvaW50LnRzIiwgIi4uLy4uL3RocmVlLXZybS1zcHJpbmdib25lL3NyYy91dGlscy9NYXRyaXg0SW52ZXJzZUNhY2hlLnRzIiwgIi4uLy4uL3RocmVlLXZybS1zcHJpbmdib25lL3NyYy91dGlscy9tYXQ0SW52ZXJ0Q29tcGF0LnRzIiwgIi4uLy4uL3RocmVlLXZybS1zcHJpbmdib25lL3NyYy9WUk1TcHJpbmdCb25lTG9hZGVyUGx1Z2luLnRzIiwgIi4uLy4uL3RocmVlLXZybS1zcHJpbmdib25lL3NyYy91dGlscy90cmF2ZXJzZUFuY2VzdG9yc0Zyb21Sb290LnRzIiwgIi4uLy4uL3RocmVlLXZybS1zcHJpbmdib25lL3NyYy91dGlscy90cmF2ZXJzZUNoaWxkcmVuVW50aWxDb25kaXRpb25NZXQudHMiLCAiLi4vLi4vdGhyZWUtdnJtLXNwcmluZ2JvbmUvc3JjL3V0aWxzL2xvd2VzdENvbW1vbkFuY2VzdG9yLnRzIiwgIi4uLy4uL3RocmVlLXZybS1zcHJpbmdib25lL3NyYy9WUk1TcHJpbmdCb25lTWFuYWdlci50cyIsICIuLi9zcmMvVlJNTG9hZGVyUGx1Z2luLnRzIiwgIi4uL3NyYy9WUk1VdGlscy9jb21iaW5lTW9ycGhzLnRzIiwgIi4uL3NyYy9WUk1VdGlscy9jb21iaW5lU2tlbGV0b25zLnRzIiwgIi4uL3NyYy91dGlscy9hdHRyaWJ1dGVHZXRDb21wb25lbnRDb21wYXQudHMiLCAiLi4vc3JjL3V0aWxzL2F0dHJpYnV0ZVNldENvbXBvbmVudENvbXBhdC50cyIsICIuLi9zcmMvVlJNVXRpbHMvZGVlcERpc3Bvc2UudHMiLCAiLi4vc3JjL1ZSTVV0aWxzL3JlbW92ZVVubmVjZXNzYXJ5Sm9pbnRzLnRzIiwgIi4uL3NyYy9WUk1VdGlscy9yZW1vdmVVbm5lY2Vzc2FyeVZlcnRpY2VzLnRzIiwgIi4uL3NyYy9WUk1VdGlscy9yb3RhdGVWUk0wLnRzIiwgIi4uL3NyYy9WUk1VdGlscy9pbmRleC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZXhwb3J0IHsgVlJNIH0gZnJvbSAnLi9WUk0nO1xuZXhwb3J0IHsgVlJNTG9hZGVyUGx1Z2luIH0gZnJvbSAnLi9WUk1Mb2FkZXJQbHVnaW4nO1xuZXhwb3J0IHR5cGUgeyBWUk1Mb2FkZXJQbHVnaW5PcHRpb25zIH0gZnJvbSAnLi9WUk1Mb2FkZXJQbHVnaW5PcHRpb25zJztcbmV4cG9ydCB0eXBlIHsgVlJNUGFyYW1ldGVycyB9IGZyb20gJy4vVlJNUGFyYW1ldGVycyc7XG5cbmV4cG9ydCAqIGZyb20gJy4vVlJNVXRpbHMnO1xuXG5leHBvcnQgKiBmcm9tICdAcGl4aXYvdGhyZWUtdnJtLWNvcmUnO1xuZXhwb3J0ICogZnJvbSAnQHBpeGl2L3RocmVlLXZybS1tYXRlcmlhbHMtbXRvb24nO1xuZXhwb3J0ICogZnJvbSAnQHBpeGl2L3RocmVlLXZybS1ub2RlLWNvbnN0cmFpbnQnO1xuZXhwb3J0ICogZnJvbSAnQHBpeGl2L3RocmVlLXZybS1zcHJpbmdib25lJztcbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1FeHByZXNzaW9uQmluZCB9IGZyb20gJy4vVlJNRXhwcmVzc2lvbkJpbmQnO1xuaW1wb3J0IHR5cGUgeyBWUk1FeHByZXNzaW9uT3ZlcnJpZGVUeXBlIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uT3ZlcnJpZGVUeXBlJztcbmltcG9ydCB0eXBlIHsgVlJNRXhwcmVzc2lvbk1hbmFnZXIgfSBmcm9tICcuL1ZSTUV4cHJlc3Npb25NYW5hZ2VyJztcblxuLy8gYW5pbWF0aW9uTWl4ZXIgXHUzMDZFXHU3NkUzXHU4OTk2XHU1QkZFXHU4QzYxXHUzMDZGXHUzMDAxU2NlbmUgXHUzMDZFXHU0RTJEXHUzMDZCXHU1MTY1XHUzMDYzXHUzMDY2XHUzMDQ0XHUzMDhCXHU1RkM1XHU4OTgxXHUzMDRDXHUzMDQyXHUzMDhCXHUzMDAyXG4vLyBcdTMwNURcdTMwNkVcdTMwNUZcdTMwODFcdTMwMDFcdTg4NjhcdTc5M0FcdTMwQUFcdTMwRDZcdTMwQjhcdTMwQTdcdTMwQUZcdTMwQzhcdTMwNjdcdTMwNkZcdTMwNkFcdTMwNDRcdTMwNTFcdTMwOENcdTMwNjlcdTMwMDFPYmplY3QzRCBcdTMwOTJcdTdEOTlcdTYyN0ZcdTMwNTdcdTMwNjYgU2NlbmUgXHUzMDZCXHU2Mjk1XHU1MTY1XHUzMDY3XHUzMDREXHUzMDhCXHUzMDg4XHUzMDQ2XHUzMDZCXHUzMDU5XHUzMDhCXHUzMDAyXG5leHBvcnQgY2xhc3MgVlJNRXhwcmVzc2lvbiBleHRlbmRzIFRIUkVFLk9iamVjdDNEIHtcbiAgLyoqXG4gICAqIE5hbWUgb2YgdGhpcyBleHByZXNzaW9uLlxuICAgKiBEaXN0aW5ndWlzaGVkIHdpdGggYG5hbWVgIHNpbmNlIGBuYW1lYCB3aWxsIGJlIGNvbmZsaWN0ZWQgd2l0aCBPYmplY3QzRC5cbiAgICovXG4gIHB1YmxpYyBleHByZXNzaW9uTmFtZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgY3VycmVudCB3ZWlnaHQgb2YgdGhlIGV4cHJlc3Npb24uXG4gICAqXG4gICAqIFlvdSB1c3VhbGx5IHdhbnQgdG8gc2V0IHRoZSB3ZWlnaHQgdmlhIHtAbGluayBWUk1FeHByZXNzaW9uTWFuYWdlci5zZXRWYWx1ZX0uXG4gICAqXG4gICAqIEl0IG1pZ2h0IGFsc28gYmUgY29udHJvbGxlZCBieSB0aGUgVGhyZWUuanMgYW5pbWF0aW9uIHN5c3RlbS5cbiAgICovXG4gIHB1YmxpYyB3ZWlnaHQgPSAwLjA7XG5cbiAgLyoqXG4gICAqIEludGVycHJldCB2YWx1ZXMgZ3JlYXRlciB0aGFuIDAuNSBhcyAxLjAsIG9ydGhlcndpc2UgMC4wLlxuICAgKi9cbiAgcHVibGljIGlzQmluYXJ5ID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFNwZWNpZnkgaG93IHRoZSBleHByZXNzaW9uIG92ZXJyaWRlcyBibGluayBleHByZXNzaW9ucy5cbiAgICovXG4gIHB1YmxpYyBvdmVycmlkZUJsaW5rOiBWUk1FeHByZXNzaW9uT3ZlcnJpZGVUeXBlID0gJ25vbmUnO1xuXG4gIC8qKlxuICAgKiBTcGVjaWZ5IGhvdyB0aGUgZXhwcmVzc2lvbiBvdmVycmlkZXMgbG9va0F0IGV4cHJlc3Npb25zLlxuICAgKi9cbiAgcHVibGljIG92ZXJyaWRlTG9va0F0OiBWUk1FeHByZXNzaW9uT3ZlcnJpZGVUeXBlID0gJ25vbmUnO1xuXG4gIC8qKlxuICAgKiBTcGVjaWZ5IGhvdyB0aGUgZXhwcmVzc2lvbiBvdmVycmlkZXMgbW91dGggZXhwcmVzc2lvbnMuXG4gICAqL1xuICBwdWJsaWMgb3ZlcnJpZGVNb3V0aDogVlJNRXhwcmVzc2lvbk92ZXJyaWRlVHlwZSA9ICdub25lJztcblxuICAvKipcbiAgICogQmluZHMgdGhhdCB0aGlzIGV4cHJlc3Npb24gaW5mbHVlbmNlcy5cbiAgICovXG4gIHByaXZhdGUgX2JpbmRzOiBWUk1FeHByZXNzaW9uQmluZFtdID0gW107XG5cbiAgLyoqXG4gICAqIEJpbmRzIHRoYXQgdGhpcyBleHByZXNzaW9uIGluZmx1ZW5jZXMuXG4gICAqL1xuICBwdWJsaWMgZ2V0IGJpbmRzKCk6IHJlYWRvbmx5IFZSTUV4cHJlc3Npb25CaW5kW10ge1xuICAgIHJldHVybiB0aGlzLl9iaW5kcztcbiAgfVxuXG4gIG92ZXJyaWRlIHJlYWRvbmx5IHR5cGU6IHN0cmluZyB8ICdWUk1FeHByZXNzaW9uJztcblxuICAvKipcbiAgICogQSB2YWx1ZSByZXByZXNlbnRzIGhvdyBtdWNoIGl0IHNob3VsZCBvdmVycmlkZSBibGluayBleHByZXNzaW9ucy5cbiAgICogYDAuMGAgPT0gbm8gb3ZlcnJpZGUgYXQgYWxsLCBgMS4wYCA9PSBjb21wbGV0ZWx5IGJsb2NrIHRoZSBleHByZXNzaW9ucy5cbiAgICovXG4gIHB1YmxpYyBnZXQgb3ZlcnJpZGVCbGlua0Ftb3VudCgpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLm92ZXJyaWRlQmxpbmsgPT09ICdibG9jaycpIHtcbiAgICAgIHJldHVybiAwLjAgPCB0aGlzLm91dHB1dFdlaWdodCA/IDEuMCA6IDAuMDtcbiAgICB9IGVsc2UgaWYgKHRoaXMub3ZlcnJpZGVCbGluayA9PT0gJ2JsZW5kJykge1xuICAgICAgcmV0dXJuIHRoaXMub3V0cHV0V2VpZ2h0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gMC4wO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBIHZhbHVlIHJlcHJlc2VudHMgaG93IG11Y2ggaXQgc2hvdWxkIG92ZXJyaWRlIGxvb2tBdCBleHByZXNzaW9ucy5cbiAgICogYDAuMGAgPT0gbm8gb3ZlcnJpZGUgYXQgYWxsLCBgMS4wYCA9PSBjb21wbGV0ZWx5IGJsb2NrIHRoZSBleHByZXNzaW9ucy5cbiAgICovXG4gIHB1YmxpYyBnZXQgb3ZlcnJpZGVMb29rQXRBbW91bnQoKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5vdmVycmlkZUxvb2tBdCA9PT0gJ2Jsb2NrJykge1xuICAgICAgcmV0dXJuIDAuMCA8IHRoaXMub3V0cHV0V2VpZ2h0ID8gMS4wIDogMC4wO1xuICAgIH0gZWxzZSBpZiAodGhpcy5vdmVycmlkZUxvb2tBdCA9PT0gJ2JsZW5kJykge1xuICAgICAgcmV0dXJuIHRoaXMub3V0cHV0V2VpZ2h0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gMC4wO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBIHZhbHVlIHJlcHJlc2VudHMgaG93IG11Y2ggaXQgc2hvdWxkIG92ZXJyaWRlIG1vdXRoIGV4cHJlc3Npb25zLlxuICAgKiBgMC4wYCA9PSBubyBvdmVycmlkZSBhdCBhbGwsIGAxLjBgID09IGNvbXBsZXRlbHkgYmxvY2sgdGhlIGV4cHJlc3Npb25zLlxuICAgKi9cbiAgcHVibGljIGdldCBvdmVycmlkZU1vdXRoQW1vdW50KCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMub3ZlcnJpZGVNb3V0aCA9PT0gJ2Jsb2NrJykge1xuICAgICAgcmV0dXJuIDAuMCA8IHRoaXMub3V0cHV0V2VpZ2h0ID8gMS4wIDogMC4wO1xuICAgIH0gZWxzZSBpZiAodGhpcy5vdmVycmlkZU1vdXRoID09PSAnYmxlbmQnKSB7XG4gICAgICByZXR1cm4gdGhpcy5vdXRwdXRXZWlnaHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAwLjA7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFuIG91dHB1dCB3ZWlnaHQgb2YgdGhpcyBleHByZXNzaW9uLCBjb25zaWRlcmluZyB0aGUge0BsaW5rIGlzQmluYXJ5fS5cbiAgICovXG4gIHB1YmxpYyBnZXQgb3V0cHV0V2VpZ2h0KCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMuaXNCaW5hcnkpIHtcbiAgICAgIHJldHVybiB0aGlzLndlaWdodCA+IDAuNSA/IDEuMCA6IDAuMDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy53ZWlnaHQ7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihleHByZXNzaW9uTmFtZTogc3RyaW5nKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMubmFtZSA9IGBWUk1FeHByZXNzaW9uXyR7ZXhwcmVzc2lvbk5hbWV9YDtcbiAgICB0aGlzLmV4cHJlc3Npb25OYW1lID0gZXhwcmVzc2lvbk5hbWU7XG5cbiAgICAvLyB0cmF2ZXJzZSBcdTY2NDJcdTMwNkVcdTY1NTFcdTZFMDhcdTYyNEJcdTZCQjVcdTMwNjhcdTMwNTdcdTMwNjYgT2JqZWN0M0QgXHUzMDY3XHUzMDZGXHUzMDZBXHUzMDQ0XHUzMDUzXHUzMDY4XHUzMDkyXHU2NjBFXHU3OTNBXHUzMDU3XHUzMDY2XHUzMDRBXHUzMDRGXG4gICAgdGhpcy50eXBlID0gJ1ZSTUV4cHJlc3Npb24nO1xuXG4gICAgLy8gXHU4ODY4XHU3OTNBXHU3NkVFXHU3Njg0XHUzMDZFXHUzMEFBXHUzMEQ2XHUzMEI4XHUzMEE3XHUzMEFGXHUzMEM4XHUzMDY3XHUzMDZGXHUzMDZBXHUzMDQ0XHUzMDZFXHUzMDY3XHUzMDAxXHU4Q0EwXHU4Mzc3XHU4RUZEXHU2RTFCXHUzMDZFXHUzMDVGXHUzMDgxXHUzMDZCIHZpc2libGUgXHUzMDkyIGZhbHNlIFx1MzA2Qlx1MzA1N1x1MzA2Nlx1MzA0QVx1MzA0Rlx1MzAwMlxuICAgIC8vIFx1MzA1M1x1MzA4Q1x1MzA2Qlx1MzA4OFx1MzA4QVx1MzAwMVx1MzA1M1x1MzA2RVx1MzBBNFx1MzBGM1x1MzBCOVx1MzBCRlx1MzBGM1x1MzBCOVx1MzA2Qlx1NUJGRVx1MzA1OVx1MzA4Qlx1NkJDRVx1MzBENVx1MzBFQ1x1MzBGQ1x1MzBFMFx1MzA2RSBtYXRyaXggXHU4MUVBXHU1MkQ1XHU4QTA4XHU3Qjk3XHUzMDkyXHU3NzAxXHU3NTY1XHUzMDY3XHUzMDREXHUzMDhCXHUzMDAyXG4gICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGFuIGV4cHJlc3Npb24gYmluZCB0byB0aGUgZXhwcmVzc2lvbi5cbiAgICpcbiAgICogQHBhcmFtIGJpbmQgQSBiaW5kIHRvIGFkZFxuICAgKi9cbiAgcHVibGljIGFkZEJpbmQoYmluZDogVlJNRXhwcmVzc2lvbkJpbmQpOiB2b2lkIHtcbiAgICB0aGlzLl9iaW5kcy5wdXNoKGJpbmQpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZSBhbiBleHByZXNzaW9uIGJpbmQgZnJvbSB0aGUgZXhwcmVzc2lvbi5cbiAgICpcbiAgICogQHBhcmFtIGJpbmQgQSBiaW5kIHRvIGRlbGV0ZVxuICAgKi9cbiAgcHVibGljIGRlbGV0ZUJpbmQoYmluZDogVlJNRXhwcmVzc2lvbkJpbmQpOiB2b2lkIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuX2JpbmRzLmluZGV4T2YoYmluZCk7XG4gICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgIHRoaXMuX2JpbmRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHdlaWdodCB0byBldmVyeSBhc3NpZ25lZCBibGVuZCBzaGFwZXMuXG4gICAqIFNob3VsZCBiZSBjYWxsZWQgZXZlcnkgZnJhbWUuXG4gICAqL1xuICBwdWJsaWMgYXBwbHlXZWlnaHQob3B0aW9ucz86IHtcbiAgICAvKipcbiAgICAgKiBNdWx0aXBsaWVzIGEgdmFsdWUgdG8gaXRzIHdlaWdodCB0byBhcHBseS5cbiAgICAgKiBJbnRlbmRlZCB0byBiZSB1c2VkIGZvciBvdmVycmlkaW5nIGFuIGV4cHJlc3Npb24gd2VpZ2h0IGJ5IGFub3RoZXIgZXhwcmVzc2lvbi5cbiAgICAgKiBTZWUgYWxzbzoge0BsaW5rIG92ZXJyaWRlQmxpbmt9LCB7QGxpbmsgb3ZlcnJpZGVMb29rQXR9LCB7QGxpbmsgb3ZlcnJpZGVNb3V0aH1cbiAgICAgKi9cbiAgICBtdWx0aXBsaWVyPzogbnVtYmVyO1xuICB9KTogdm9pZCB7XG4gICAgbGV0IGFjdHVhbFdlaWdodCA9IHRoaXMub3V0cHV0V2VpZ2h0O1xuICAgIGFjdHVhbFdlaWdodCAqPSBvcHRpb25zPy5tdWx0aXBsaWVyID8/IDEuMDtcblxuICAgIC8vIGlmIHRoZSBleHByZXNzaW9uIGlzIGJpbmFyeSwgdGhlIG92ZXJyaWRlIHZhbHVlIG11c3QgYmUgYWxzbyB0cmVhdGVkIGFzIGJpbmFyeVxuICAgIGlmICh0aGlzLmlzQmluYXJ5ICYmIGFjdHVhbFdlaWdodCA8IDEuMCkge1xuICAgICAgYWN0dWFsV2VpZ2h0ID0gMC4wO1xuICAgIH1cblxuICAgIHRoaXMuX2JpbmRzLmZvckVhY2goKGJpbmQpID0+IGJpbmQuYXBwbHlXZWlnaHQoYWN0dWFsV2VpZ2h0KSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXIgcHJldmlvdXNseSBhc3NpZ25lZCBibGVuZCBzaGFwZXMuXG4gICAqL1xuICBwdWJsaWMgY2xlYXJBcHBsaWVkV2VpZ2h0KCk6IHZvaWQge1xuICAgIHRoaXMuX2JpbmRzLmZvckVhY2goKGJpbmQpID0+IGJpbmQuY2xlYXJBcHBsaWVkV2VpZ2h0KCkpO1xuICB9XG59XG4iLCAiaW1wb3J0IHR5cGUgKiBhcyBWMFZSTSBmcm9tICdAcGl4aXYvdHlwZXMtdnJtLTAuMCc7XG5pbXBvcnQgdHlwZSAqIGFzIFYxVlJNU2NoZW1hIGZyb20gJ0BwaXhpdi90eXBlcy12cm1jLXZybS0xLjAnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgR0xURiwgR0xURkxvYWRlclBsdWdpbiwgR0xURlBhcnNlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXIuanMnO1xuaW1wb3J0IHsgZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGUgfSBmcm9tICcuLi91dGlscy9nbHRmRXh0cmFjdFByaW1pdGl2ZXNGcm9tTm9kZSc7XG5pbXBvcnQgeyBWUk1FeHByZXNzaW9uIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uJztcbmltcG9ydCB7IFZSTUV4cHJlc3Npb25NYW5hZ2VyIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uTWFuYWdlcic7XG5pbXBvcnQgeyB2MEV4cHJlc3Npb25NYXRlcmlhbENvbG9yTWFwIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGUnO1xuaW1wb3J0IHsgVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JCaW5kIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvckJpbmQnO1xuaW1wb3J0IHsgVlJNRXhwcmVzc2lvbk1vcnBoVGFyZ2V0QmluZCB9IGZyb20gJy4vVlJNRXhwcmVzc2lvbk1vcnBoVGFyZ2V0QmluZCc7XG5pbXBvcnQgeyBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSB9IGZyb20gJy4vVlJNRXhwcmVzc2lvblByZXNldE5hbWUnO1xuaW1wb3J0IHsgVlJNRXhwcmVzc2lvblRleHR1cmVUcmFuc2Zvcm1CaW5kIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uVGV4dHVyZVRyYW5zZm9ybUJpbmQnO1xuaW1wb3J0IHsgR0xURiBhcyBHTFRGU2NoZW1hIH0gZnJvbSAnQGdsdGYtdHJhbnNmb3JtL2NvcmUnO1xuXG4vKipcbiAqIFBvc3NpYmxlIHNwZWMgdmVyc2lvbnMgaXQgcmVjb2duaXplcy5cbiAqL1xuY29uc3QgUE9TU0lCTEVfU1BFQ19WRVJTSU9OUyA9IG5ldyBTZXQoWycxLjAnLCAnMS4wLWJldGEnXSk7XG5cbi8qKlxuICogQSBwbHVnaW4gb2YgR0xURkxvYWRlciB0aGF0IGltcG9ydHMgYSB7QGxpbmsgVlJNRXhwcmVzc2lvbk1hbmFnZXJ9IGZyb20gYSBWUk0gZXh0ZW5zaW9uIG9mIGEgR0xURi5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUV4cHJlc3Npb25Mb2FkZXJQbHVnaW4gaW1wbGVtZW50cyBHTFRGTG9hZGVyUGx1Z2luIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSB2MHYxUHJlc2V0TmFtZU1hcDogeyBbdjBOYW1lIGluIFYwVlJNLkJsZW5kU2hhcGVQcmVzZXROYW1lXT86IFZSTUV4cHJlc3Npb25QcmVzZXROYW1lIH0gPSB7XG4gICAgYTogJ2FhJyxcbiAgICBlOiAnZWUnLFxuICAgIGk6ICdpaCcsXG4gICAgbzogJ29oJyxcbiAgICB1OiAnb3UnLFxuICAgIGJsaW5rOiAnYmxpbmsnLFxuICAgIGpveTogJ2hhcHB5JyxcbiAgICBhbmdyeTogJ2FuZ3J5JyxcbiAgICBzb3Jyb3c6ICdzYWQnLFxuICAgIGZ1bjogJ3JlbGF4ZWQnLFxuICAgIGxvb2t1cDogJ2xvb2tVcCcsXG4gICAgbG9va2Rvd246ICdsb29rRG93bicsXG4gICAgbG9va2xlZnQ6ICdsb29rTGVmdCcsXG4gICAgbG9va3JpZ2h0OiAnbG9va1JpZ2h0JyxcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXG4gICAgYmxpbmtfbDogJ2JsaW5rTGVmdCcsXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxuICAgIGJsaW5rX3I6ICdibGlua1JpZ2h0JyxcbiAgICBuZXV0cmFsOiAnbmV1dHJhbCcsXG4gIH07XG5cbiAgcHVibGljIHJlYWRvbmx5IHBhcnNlcjogR0xURlBhcnNlcjtcblxuICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICAvLyBXZSBzaG91bGQgdXNlIHRoZSBleHRlbnNpb24gbmFtZSBpbnN0ZWFkIGJ1dCB3ZSBoYXZlIG11bHRpcGxlIHBsdWdpbnMgZm9yIGFuIGV4dGVuc2lvbi4uLlxuICAgIHJldHVybiAnVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbic7XG4gIH1cblxuICBwdWJsaWMgY29uc3RydWN0b3IocGFyc2VyOiBHTFRGUGFyc2VyKSB7XG4gICAgdGhpcy5wYXJzZXIgPSBwYXJzZXI7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgYWZ0ZXJSb290KGdsdGY6IEdMVEYpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBnbHRmLnVzZXJEYXRhLnZybUV4cHJlc3Npb25NYW5hZ2VyID0gYXdhaXQgdGhpcy5faW1wb3J0KGdsdGYpO1xuICB9XG5cbiAgLyoqXG4gICAqIEltcG9ydCBhIHtAbGluayBWUk1FeHByZXNzaW9uTWFuYWdlcn0gZnJvbSBhIFZSTS5cbiAgICpcbiAgICogQHBhcmFtIGdsdGYgQSBwYXJzZWQgcmVzdWx0IG9mIEdMVEYgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gICAqL1xuICBwcml2YXRlIGFzeW5jIF9pbXBvcnQoZ2x0ZjogR0xURik6IFByb21pc2U8VlJNRXhwcmVzc2lvbk1hbmFnZXIgfCBudWxsPiB7XG4gICAgY29uc3QgdjFSZXN1bHQgPSBhd2FpdCB0aGlzLl92MUltcG9ydChnbHRmKTtcbiAgICBpZiAodjFSZXN1bHQpIHtcbiAgICAgIHJldHVybiB2MVJlc3VsdDtcbiAgICB9XG5cbiAgICBjb25zdCB2MFJlc3VsdCA9IGF3YWl0IHRoaXMuX3YwSW1wb3J0KGdsdGYpO1xuICAgIGlmICh2MFJlc3VsdCkge1xuICAgICAgcmV0dXJuIHYwUmVzdWx0O1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfdjFJbXBvcnQoZ2x0ZjogR0xURik6IFByb21pc2U8VlJNRXhwcmVzc2lvbk1hbmFnZXIgfCBudWxsPiB7XG4gICAgY29uc3QganNvbiA9IHRoaXMucGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAgIC8vIGVhcmx5IGFib3J0IGlmIGl0IGRvZXNuJ3QgdXNlIHZybVxuICAgIGNvbnN0IGlzVlJNVXNlZCA9IGpzb24uZXh0ZW5zaW9uc1VzZWQ/LmluZGV4T2YoJ1ZSTUNfdnJtJykgIT09IC0xO1xuICAgIGlmICghaXNWUk1Vc2VkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBleHRlbnNpb24gPSBqc29uLmV4dGVuc2lvbnM/LlsnVlJNQ192cm0nXSBhcyBWMVZSTVNjaGVtYS5WUk1DVlJNIHwgdW5kZWZpbmVkO1xuICAgIGlmICghZXh0ZW5zaW9uKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzcGVjVmVyc2lvbiA9IGV4dGVuc2lvbi5zcGVjVmVyc2lvbjtcbiAgICBpZiAoIVBPU1NJQkxFX1NQRUNfVkVSU0lPTlMuaGFzKHNwZWNWZXJzaW9uKSkge1xuICAgICAgY29uc29sZS53YXJuKGBWUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luOiBVbmtub3duIFZSTUNfdnJtIHNwZWNWZXJzaW9uIFwiJHtzcGVjVmVyc2lvbn1cImApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc2NoZW1hRXhwcmVzc2lvbnMgPSBleHRlbnNpb24uZXhwcmVzc2lvbnM7XG4gICAgaWYgKCFzY2hlbWFFeHByZXNzaW9ucykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gbGlzdCBleHByZXNzaW9uc1xuICAgIGNvbnN0IHByZXNldE5hbWVTZXQgPSBuZXcgU2V0PHN0cmluZz4oT2JqZWN0LnZhbHVlcyhWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSkpO1xuICAgIGNvbnN0IG5hbWVTY2hlbWFFeHByZXNzaW9uTWFwID0gbmV3IE1hcDxzdHJpbmcsIFYxVlJNU2NoZW1hLkV4cHJlc3Npb24+KCk7XG5cbiAgICBpZiAoc2NoZW1hRXhwcmVzc2lvbnMucHJlc2V0ICE9IG51bGwpIHtcbiAgICAgIE9iamVjdC5lbnRyaWVzKHNjaGVtYUV4cHJlc3Npb25zLnByZXNldCkuZm9yRWFjaCgoW25hbWUsIHNjaGVtYUV4cHJlc3Npb25dKSA9PiB7XG4gICAgICAgIGlmIChzY2hlbWFFeHByZXNzaW9uID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gLy8gdHlwZXNjcmlwdFxuXG4gICAgICAgIGlmICghcHJlc2V0TmFtZVNldC5oYXMobmFtZSkpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oYFZSTUV4cHJlc3Npb25Mb2FkZXJQbHVnaW46IFVua25vd24gcHJlc2V0IG5hbWUgXCIke25hbWV9XCIgZGV0ZWN0ZWQuIElnbm9yaW5nIHRoZSBleHByZXNzaW9uYCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbmFtZVNjaGVtYUV4cHJlc3Npb25NYXAuc2V0KG5hbWUsIHNjaGVtYUV4cHJlc3Npb24pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHNjaGVtYUV4cHJlc3Npb25zLmN1c3RvbSAhPSBudWxsKSB7XG4gICAgICBPYmplY3QuZW50cmllcyhzY2hlbWFFeHByZXNzaW9ucy5jdXN0b20pLmZvckVhY2goKFtuYW1lLCBzY2hlbWFFeHByZXNzaW9uXSkgPT4ge1xuICAgICAgICBpZiAocHJlc2V0TmFtZVNldC5oYXMobmFtZSkpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICBgVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbjogQ3VzdG9tIGV4cHJlc3Npb24gY2Fubm90IGhhdmUgcHJlc2V0IG5hbWUgXCIke25hbWV9XCIuIElnbm9yaW5nIHRoZSBleHByZXNzaW9uYCxcbiAgICAgICAgICApO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIG5hbWVTY2hlbWFFeHByZXNzaW9uTWFwLnNldChuYW1lLCBzY2hlbWFFeHByZXNzaW9uKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIHByZXBhcmUgbWFuYWdlclxuICAgIGNvbnN0IG1hbmFnZXIgPSBuZXcgVlJNRXhwcmVzc2lvbk1hbmFnZXIoKTtcblxuICAgIC8vIGxvYWQgZXhwcmVzc2lvbnNcbiAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIEFycmF5LmZyb20obmFtZVNjaGVtYUV4cHJlc3Npb25NYXAuZW50cmllcygpKS5tYXAoYXN5bmMgKFtuYW1lLCBzY2hlbWFFeHByZXNzaW9uXSkgPT4ge1xuICAgICAgICBjb25zdCBleHByZXNzaW9uID0gbmV3IFZSTUV4cHJlc3Npb24obmFtZSk7XG4gICAgICAgIGdsdGYuc2NlbmUuYWRkKGV4cHJlc3Npb24pO1xuXG4gICAgICAgIGV4cHJlc3Npb24uaXNCaW5hcnkgPSBzY2hlbWFFeHByZXNzaW9uLmlzQmluYXJ5ID8/IGZhbHNlO1xuICAgICAgICBleHByZXNzaW9uLm92ZXJyaWRlQmxpbmsgPSBzY2hlbWFFeHByZXNzaW9uLm92ZXJyaWRlQmxpbmsgPz8gJ25vbmUnO1xuICAgICAgICBleHByZXNzaW9uLm92ZXJyaWRlTG9va0F0ID0gc2NoZW1hRXhwcmVzc2lvbi5vdmVycmlkZUxvb2tBdCA/PyAnbm9uZSc7XG4gICAgICAgIGV4cHJlc3Npb24ub3ZlcnJpZGVNb3V0aCA9IHNjaGVtYUV4cHJlc3Npb24ub3ZlcnJpZGVNb3V0aCA/PyAnbm9uZSc7XG5cbiAgICAgICAgc2NoZW1hRXhwcmVzc2lvbi5tb3JwaFRhcmdldEJpbmRzPy5mb3JFYWNoKGFzeW5jIChiaW5kKSA9PiB7XG4gICAgICAgICAgaWYgKGJpbmQubm9kZSA9PT0gdW5kZWZpbmVkIHx8IGJpbmQuaW5kZXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHByaW1pdGl2ZXMgPSAoYXdhaXQgZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGUoZ2x0ZiwgYmluZC5ub2RlKSkhO1xuICAgICAgICAgIGNvbnN0IG1vcnBoVGFyZ2V0SW5kZXggPSBiaW5kLmluZGV4O1xuXG4gICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIG1lc2ggaGFzIHRoZSB0YXJnZXQgbW9ycGggdGFyZ2V0XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgIXByaW1pdGl2ZXMuZXZlcnkoXG4gICAgICAgICAgICAgIChwcmltaXRpdmUpID0+XG4gICAgICAgICAgICAgICAgQXJyYXkuaXNBcnJheShwcmltaXRpdmUubW9ycGhUYXJnZXRJbmZsdWVuY2VzKSAmJlxuICAgICAgICAgICAgICAgIG1vcnBoVGFyZ2V0SW5kZXggPCBwcmltaXRpdmUubW9ycGhUYXJnZXRJbmZsdWVuY2VzLmxlbmd0aCxcbiAgICAgICAgICAgIClcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgICAgYFZSTUV4cHJlc3Npb25Mb2FkZXJQbHVnaW46ICR7c2NoZW1hRXhwcmVzc2lvbi5uYW1lfSBhdHRlbXB0cyB0byBpbmRleCBtb3JwaCAjJHttb3JwaFRhcmdldEluZGV4fSBidXQgbm90IGZvdW5kLmAsXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGV4cHJlc3Npb24uYWRkQmluZChcbiAgICAgICAgICAgIG5ldyBWUk1FeHByZXNzaW9uTW9ycGhUYXJnZXRCaW5kKHtcbiAgICAgICAgICAgICAgcHJpbWl0aXZlcyxcbiAgICAgICAgICAgICAgaW5kZXg6IG1vcnBoVGFyZ2V0SW5kZXgsXG4gICAgICAgICAgICAgIHdlaWdodDogYmluZC53ZWlnaHQgPz8gMS4wLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHNjaGVtYUV4cHJlc3Npb24ubWF0ZXJpYWxDb2xvckJpbmRzIHx8IHNjaGVtYUV4cHJlc3Npb24udGV4dHVyZVRyYW5zZm9ybUJpbmRzKSB7XG4gICAgICAgICAgLy8gbGlzdCB1cCBldmVyeSBtYXRlcmlhbCBpbiBgZ2x0Zi5zY2VuZWBcbiAgICAgICAgICBjb25zdCBnbHRmTWF0ZXJpYWxzOiBUSFJFRS5NYXRlcmlhbFtdID0gW107XG4gICAgICAgICAgZ2x0Zi5zY2VuZS50cmF2ZXJzZSgob2JqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtYXRlcmlhbCA9IChvYmplY3QgYXMgYW55KS5tYXRlcmlhbCBhcyBUSFJFRS5NYXRlcmlhbCB8IFRIUkVFLk1hdGVyaWFsW10gfCB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAobWF0ZXJpYWwpIHtcbiAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobWF0ZXJpYWwpKSB7XG4gICAgICAgICAgICAgICAgZ2x0Zk1hdGVyaWFscy5wdXNoKC4uLm1hdGVyaWFsKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBnbHRmTWF0ZXJpYWxzLnB1c2gobWF0ZXJpYWwpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBzY2hlbWFFeHByZXNzaW9uLm1hdGVyaWFsQ29sb3JCaW5kcz8uZm9yRWFjaChhc3luYyAoYmluZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWxzID0gZ2x0Zk1hdGVyaWFscy5maWx0ZXIoKG1hdGVyaWFsKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IG1hdGVyaWFsSW5kZXggPSB0aGlzLnBhcnNlci5hc3NvY2lhdGlvbnMuZ2V0KG1hdGVyaWFsKT8ubWF0ZXJpYWxzO1xuICAgICAgICAgICAgICByZXR1cm4gYmluZC5tYXRlcmlhbCA9PT0gbWF0ZXJpYWxJbmRleDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBtYXRlcmlhbHMuZm9yRWFjaCgobWF0ZXJpYWwpID0+IHtcbiAgICAgICAgICAgICAgZXhwcmVzc2lvbi5hZGRCaW5kKFxuICAgICAgICAgICAgICAgIG5ldyBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvckJpbmQoe1xuICAgICAgICAgICAgICAgICAgbWF0ZXJpYWwsXG4gICAgICAgICAgICAgICAgICB0eXBlOiBiaW5kLnR5cGUsXG4gICAgICAgICAgICAgICAgICB0YXJnZXRWYWx1ZTogbmV3IFRIUkVFLkNvbG9yKCkuZnJvbUFycmF5KGJpbmQudGFyZ2V0VmFsdWUpLFxuICAgICAgICAgICAgICAgICAgdGFyZ2V0QWxwaGE6IGJpbmQudGFyZ2V0VmFsdWVbM10sXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHNjaGVtYUV4cHJlc3Npb24udGV4dHVyZVRyYW5zZm9ybUJpbmRzPy5mb3JFYWNoKGFzeW5jIChiaW5kKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtYXRlcmlhbHMgPSBnbHRmTWF0ZXJpYWxzLmZpbHRlcigobWF0ZXJpYWwpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWxJbmRleCA9IHRoaXMucGFyc2VyLmFzc29jaWF0aW9ucy5nZXQobWF0ZXJpYWwpPy5tYXRlcmlhbHM7XG4gICAgICAgICAgICAgIHJldHVybiBiaW5kLm1hdGVyaWFsID09PSBtYXRlcmlhbEluZGV4O1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG1hdGVyaWFscy5mb3JFYWNoKChtYXRlcmlhbCkgPT4ge1xuICAgICAgICAgICAgICBleHByZXNzaW9uLmFkZEJpbmQoXG4gICAgICAgICAgICAgICAgbmV3IFZSTUV4cHJlc3Npb25UZXh0dXJlVHJhbnNmb3JtQmluZCh7XG4gICAgICAgICAgICAgICAgICBtYXRlcmlhbCxcbiAgICAgICAgICAgICAgICAgIG9mZnNldDogbmV3IFRIUkVFLlZlY3RvcjIoKS5mcm9tQXJyYXkoYmluZC5vZmZzZXQgPz8gWzAuMCwgMC4wXSksXG4gICAgICAgICAgICAgICAgICBzY2FsZTogbmV3IFRIUkVFLlZlY3RvcjIoKS5mcm9tQXJyYXkoYmluZC5zY2FsZSA/PyBbMS4wLCAxLjBdKSxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgbWFuYWdlci5yZWdpc3RlckV4cHJlc3Npb24oZXhwcmVzc2lvbik7XG4gICAgICB9KSxcbiAgICApO1xuXG4gICAgcmV0dXJuIG1hbmFnZXI7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF92MEltcG9ydChnbHRmOiBHTFRGKTogUHJvbWlzZTxWUk1FeHByZXNzaW9uTWFuYWdlciB8IG51bGw+IHtcbiAgICBjb25zdCBqc29uID0gdGhpcy5wYXJzZXIuanNvbiBhcyBHTFRGU2NoZW1hLklHTFRGO1xuXG4gICAgLy8gZWFybHkgYWJvcnQgaWYgaXQgZG9lc24ndCB1c2UgdnJtXG4gICAgY29uc3QgdnJtRXh0ID0ganNvbi5leHRlbnNpb25zPy5WUk0gYXMgVjBWUk0uVlJNIHwgdW5kZWZpbmVkO1xuICAgIGlmICghdnJtRXh0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzY2hlbWFCbGVuZFNoYXBlID0gdnJtRXh0LmJsZW5kU2hhcGVNYXN0ZXI7XG4gICAgaWYgKCFzY2hlbWFCbGVuZFNoYXBlKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBtYW5hZ2VyID0gbmV3IFZSTUV4cHJlc3Npb25NYW5hZ2VyKCk7XG5cbiAgICBjb25zdCBzY2hlbWFCbGVuZFNoYXBlR3JvdXBzID0gc2NoZW1hQmxlbmRTaGFwZS5ibGVuZFNoYXBlR3JvdXBzO1xuICAgIGlmICghc2NoZW1hQmxlbmRTaGFwZUdyb3Vwcykge1xuICAgICAgcmV0dXJuIG1hbmFnZXI7XG4gICAgfVxuXG4gICAgY29uc3QgYmxlbmRTaGFwZU5hbWVTZXQgPSBuZXcgU2V0PHN0cmluZz4oKTtcblxuICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgc2NoZW1hQmxlbmRTaGFwZUdyb3Vwcy5tYXAoYXN5bmMgKHNjaGVtYUdyb3VwKSA9PiB7XG4gICAgICAgIGNvbnN0IHYwUHJlc2V0TmFtZSA9IHNjaGVtYUdyb3VwLnByZXNldE5hbWU7XG4gICAgICAgIGNvbnN0IHYxUHJlc2V0TmFtZSA9XG4gICAgICAgICAgKHYwUHJlc2V0TmFtZSAhPSBudWxsICYmIFZSTUV4cHJlc3Npb25Mb2FkZXJQbHVnaW4udjB2MVByZXNldE5hbWVNYXBbdjBQcmVzZXROYW1lXSkgfHwgbnVsbDtcbiAgICAgICAgY29uc3QgbmFtZSA9IHYxUHJlc2V0TmFtZSA/PyBzY2hlbWFHcm91cC5uYW1lO1xuXG4gICAgICAgIGlmIChuYW1lID09IG51bGwpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ1ZSTUV4cHJlc3Npb25Mb2FkZXJQbHVnaW46IE9uZSBvZiBjdXN0b20gZXhwcmVzc2lvbnMgaGFzIG5vIG5hbWUuIElnbm9yaW5nIHRoZSBleHByZXNzaW9uJyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZHVwbGljYXRpb24gY2hlY2tcbiAgICAgICAgaWYgKGJsZW5kU2hhcGVOYW1lU2V0LmhhcyhuYW1lKSkge1xuICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgIGBWUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luOiBBbiBleHByZXNzaW9uIHByZXNldCAke3YwUHJlc2V0TmFtZX0gaGFzIGR1cGxpY2F0ZWQgZW50cmllcy4gSWdub3JpbmcgdGhlIGV4cHJlc3Npb25gLFxuICAgICAgICAgICk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgYmxlbmRTaGFwZU5hbWVTZXQuYWRkKG5hbWUpO1xuXG4gICAgICAgIGNvbnN0IGV4cHJlc3Npb24gPSBuZXcgVlJNRXhwcmVzc2lvbihuYW1lKTtcbiAgICAgICAgZ2x0Zi5zY2VuZS5hZGQoZXhwcmVzc2lvbik7XG5cbiAgICAgICAgZXhwcmVzc2lvbi5pc0JpbmFyeSA9IHNjaGVtYUdyb3VwLmlzQmluYXJ5ID8/IGZhbHNlO1xuICAgICAgICAvLyB2MCBkb2Vzbid0IGhhdmUgaWdub3JlIHByb3BlcnRpZXNcblxuICAgICAgICAvLyBCaW5kIG1vcnBoVGFyZ2V0XG4gICAgICAgIGlmIChzY2hlbWFHcm91cC5iaW5kcykge1xuICAgICAgICAgIHNjaGVtYUdyb3VwLmJpbmRzLmZvckVhY2goYXN5bmMgKGJpbmQpID0+IHtcbiAgICAgICAgICAgIGlmIChiaW5kLm1lc2ggPT09IHVuZGVmaW5lZCB8fCBiaW5kLmluZGV4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBub2Rlc1VzaW5nTWVzaDogbnVtYmVyW10gPSBbXTtcbiAgICAgICAgICAgIGpzb24ubm9kZXM/LmZvckVhY2goKG5vZGUsIGkpID0+IHtcbiAgICAgICAgICAgICAgaWYgKG5vZGUubWVzaCA9PT0gYmluZC5tZXNoKSB7XG4gICAgICAgICAgICAgICAgbm9kZXNVc2luZ01lc2gucHVzaChpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChub2Rlc1VzaW5nTWVzaC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgICAgIGBWUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luOiAke3NjaGVtYUdyb3VwLm5hbWV9IGF0dGVtcHRzIHRvIGJpbmQgYSBtb3JwaCB0YXJnZXQgdG8gdGhlIG1lc2ggIyR7YmluZC5tZXNofSBidXQgdGhlIG1lc2ggaXMgbm90IGZvdW5kIG9yIG5vdCB1c2VkIGluIHRoZSBzY2VuZS4gSWdub3JpbmcgdGhlIGJpbmQuYCxcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBtb3JwaFRhcmdldEluZGV4ID0gYmluZC5pbmRleDtcblxuICAgICAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgICAgICAgIG5vZGVzVXNpbmdNZXNoLm1hcChhc3luYyAobm9kZUluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJpbWl0aXZlcyA9IChhd2FpdCBnbHRmRXh0cmFjdFByaW1pdGl2ZXNGcm9tTm9kZShnbHRmLCBub2RlSW5kZXgpKSE7XG5cbiAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgbWVzaCBoYXMgdGhlIHRhcmdldCBtb3JwaCB0YXJnZXRcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAhcHJpbWl0aXZlcy5ldmVyeShcbiAgICAgICAgICAgICAgICAgICAgKHByaW1pdGl2ZSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICBBcnJheS5pc0FycmF5KHByaW1pdGl2ZS5tb3JwaFRhcmdldEluZmx1ZW5jZXMpICYmXG4gICAgICAgICAgICAgICAgICAgICAgbW9ycGhUYXJnZXRJbmRleCA8IHByaW1pdGl2ZS5tb3JwaFRhcmdldEluZmx1ZW5jZXMubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgICAgICAgICBgVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbjogJHtzY2hlbWFHcm91cC5uYW1lfSBhdHRlbXB0cyB0byBpbmRleCAke21vcnBoVGFyZ2V0SW5kZXh9dGggbW9ycGggYnV0IG5vdCBmb3VuZC5gLFxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBleHByZXNzaW9uLmFkZEJpbmQoXG4gICAgICAgICAgICAgICAgICBuZXcgVlJNRXhwcmVzc2lvbk1vcnBoVGFyZ2V0QmluZCh7XG4gICAgICAgICAgICAgICAgICAgIHByaW1pdGl2ZXMsXG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiBtb3JwaFRhcmdldEluZGV4LFxuICAgICAgICAgICAgICAgICAgICB3ZWlnaHQ6IDAuMDEgKiAoYmluZC53ZWlnaHQgPz8gMTAwKSwgLy8gbmFycm93aW5nIHRoZSByYW5nZSBmcm9tIFsgMC4wIC0gMTAwLjAgXSB0byBbIDAuMCAtIDEuMCBdXG4gICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCaW5kIE1hdGVyaWFsQ29sb3IgYW5kIFRleHR1cmVUcmFuc2Zvcm1cbiAgICAgICAgY29uc3QgbWF0ZXJpYWxWYWx1ZXMgPSBzY2hlbWFHcm91cC5tYXRlcmlhbFZhbHVlcztcbiAgICAgICAgaWYgKG1hdGVyaWFsVmFsdWVzICYmIG1hdGVyaWFsVmFsdWVzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgIG1hdGVyaWFsVmFsdWVzLmZvckVhY2goKG1hdGVyaWFsVmFsdWUpID0+IHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgbWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbE5hbWUgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICBtYXRlcmlhbFZhbHVlLnByb3BlcnR5TmFtZSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgIG1hdGVyaWFsVmFsdWUudGFyZ2V0VmFsdWUgPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBcdTMwQTJcdTMwRDBcdTMwQkZcdTMwRkNcdTMwNkVcdTMwQUFcdTMwRDZcdTMwQjhcdTMwQTdcdTMwQUZcdTMwQzhcdTMwNkJcdThBMkRcdTVCOUFcdTMwNTVcdTMwOENcdTMwNjZcdTMwNDRcdTMwOEJcdTMwREVcdTMwQzZcdTMwRUFcdTMwQTJcdTMwRUJcdTMwNkVcdTUxODVcdTMwNEJcdTMwODlcbiAgICAgICAgICAgICAqIG1hdGVyaWFsVmFsdWVcdTMwNjdcdTYzMDdcdTVCOUFcdTMwNTVcdTMwOENcdTMwNjZcdTMwNDRcdTMwOEJcdTMwREVcdTMwQzZcdTMwRUFcdTMwQTJcdTMwRUJcdTMwOTJcdTk2QzZcdTMwODFcdTMwOEJcdTMwMDJcbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBcdTcyNzlcdTVCOUFcdTMwNkJcdTMwNkZcdTU0MERcdTUyNERcdTMwOTJcdTRGN0ZcdTc1MjhcdTMwNTlcdTMwOEJcdTMwMDJcbiAgICAgICAgICAgICAqIFx1MzBBMlx1MzBBNlx1MzBDOFx1MzBFOVx1MzBBNFx1MzBGM1x1NjNDRlx1NzUzQlx1NzUyOFx1MzA2RVx1MzBERVx1MzBDNlx1MzBFQVx1MzBBMlx1MzBFQlx1MzA4Mlx1NTQwQ1x1NjY0Mlx1MzA2Qlx1OTZDNlx1MzA4MVx1MzA4Qlx1MzAwMlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBjb25zdCBtYXRlcmlhbHM6IFRIUkVFLk1hdGVyaWFsW10gPSBbXTtcbiAgICAgICAgICAgIGdsdGYuc2NlbmUudHJhdmVyc2UoKG9iamVjdCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoKG9iamVjdCBhcyBhbnkpLm1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWw6IFRIUkVFLk1hdGVyaWFsW10gfCBUSFJFRS5NYXRlcmlhbCA9IChvYmplY3QgYXMgYW55KS5tYXRlcmlhbDtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShtYXRlcmlhbCkpIHtcbiAgICAgICAgICAgICAgICAgIG1hdGVyaWFscy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAuLi5tYXRlcmlhbC5maWx0ZXIoXG4gICAgICAgICAgICAgICAgICAgICAgKG10bCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIChtdGwubmFtZSA9PT0gbWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbE5hbWUhIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG10bC5uYW1lID09PSBtYXRlcmlhbFZhbHVlLm1hdGVyaWFsTmFtZSEgKyAnIChPdXRsaW5lKScpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbHMuaW5kZXhPZihtdGwpID09PSAtMSxcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChtYXRlcmlhbC5uYW1lID09PSBtYXRlcmlhbFZhbHVlLm1hdGVyaWFsTmFtZSAmJiBtYXRlcmlhbHMuaW5kZXhPZihtYXRlcmlhbCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICBtYXRlcmlhbHMucHVzaChtYXRlcmlhbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWxQcm9wZXJ0eU5hbWUgPSBtYXRlcmlhbFZhbHVlLnByb3BlcnR5TmFtZTtcbiAgICAgICAgICAgIG1hdGVyaWFscy5mb3JFYWNoKChtYXRlcmlhbCkgPT4ge1xuICAgICAgICAgICAgICAvLyBUZXh0dXJlVHJhbnNmb3JtQmluZFxuICAgICAgICAgICAgICBpZiAobWF0ZXJpYWxQcm9wZXJ0eU5hbWUgPT09ICdfTWFpblRleF9TVCcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzY2FsZSA9IG5ldyBUSFJFRS5WZWN0b3IyKG1hdGVyaWFsVmFsdWUudGFyZ2V0VmFsdWUhWzBdLCBtYXRlcmlhbFZhbHVlLnRhcmdldFZhbHVlIVsxXSk7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gbmV3IFRIUkVFLlZlY3RvcjIobWF0ZXJpYWxWYWx1ZS50YXJnZXRWYWx1ZSFbMl0sIG1hdGVyaWFsVmFsdWUudGFyZ2V0VmFsdWUhWzNdKTtcblxuICAgICAgICAgICAgICAgIG9mZnNldC55ID0gMS4wIC0gb2Zmc2V0LnkgLSBzY2FsZS55O1xuXG4gICAgICAgICAgICAgICAgZXhwcmVzc2lvbi5hZGRCaW5kKFxuICAgICAgICAgICAgICAgICAgbmV3IFZSTUV4cHJlc3Npb25UZXh0dXJlVHJhbnNmb3JtQmluZCh7XG4gICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsLFxuICAgICAgICAgICAgICAgICAgICBzY2FsZSxcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0LFxuICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIC8vIE1hdGVyaWFsQ29sb3JCaW5kXG4gICAgICAgICAgICAgIGNvbnN0IG1hdGVyaWFsQ29sb3JUeXBlID0gdjBFeHByZXNzaW9uTWF0ZXJpYWxDb2xvck1hcFttYXRlcmlhbFByb3BlcnR5TmFtZV07XG4gICAgICAgICAgICAgIGlmIChtYXRlcmlhbENvbG9yVHlwZSkge1xuICAgICAgICAgICAgICAgIGV4cHJlc3Npb24uYWRkQmluZChcbiAgICAgICAgICAgICAgICAgIG5ldyBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvckJpbmQoe1xuICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbCxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogbWF0ZXJpYWxDb2xvclR5cGUsXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFZhbHVlOiBuZXcgVEhSRUUuQ29sb3IoKS5mcm9tQXJyYXkobWF0ZXJpYWxWYWx1ZS50YXJnZXRWYWx1ZSEpLFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRBbHBoYTogbWF0ZXJpYWxWYWx1ZS50YXJnZXRWYWx1ZSFbM10sXG4gICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgY29uc29sZS53YXJuKG1hdGVyaWFsUHJvcGVydHlOYW1lICsgJyBpcyBub3Qgc3VwcG9ydGVkJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIG1hbmFnZXIucmVnaXN0ZXJFeHByZXNzaW9uKGV4cHJlc3Npb24pO1xuICAgICAgfSksXG4gICAgKTtcblxuICAgIHJldHVybiBtYW5hZ2VyO1xuICB9XG59XG4iLCAiaW1wb3J0IHR5cGUgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgdHlwZSB7IEdMVEYgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyLmpzJztcbmltcG9ydCB7IEdMVEYgYXMgR0xURlNjaGVtYSB9IGZyb20gJ0BnbHRmLXRyYW5zZm9ybS9jb3JlJztcblxuZnVuY3Rpb24gZXh0cmFjdFByaW1pdGl2ZXNJbnRlcm5hbChnbHRmOiBHTFRGLCBub2RlSW5kZXg6IG51bWJlciwgbm9kZTogVEhSRUUuT2JqZWN0M0QpOiBUSFJFRS5NZXNoW10gfCBudWxsIHtcbiAgY29uc3QganNvbiA9IGdsdGYucGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAvKipcbiAgICogTGV0J3MgbGlzdCB1cCBldmVyeSBwb3NzaWJsZSBwYXR0ZXJucyB0aGF0IHBhcnNlZCBnbHRmIG5vZGVzIHdpdGggYSBtZXNoIGNhbiBoYXZlLCwsXG4gICAqXG4gICAqIFwiKlwiIGluZGljYXRlcyB0aGF0IHRob3NlIG1lc2hlcyBzaG91bGQgYmUgbGlzdGVkIHVwIHVzaW5nIHRoaXMgZnVuY3Rpb25cbiAgICpcbiAgICogIyMjIEEgbm9kZSB3aXRoIGEgKG1lc2gsIGEgc2lnbmxlIHByaW1pdGl2ZSlcbiAgICpcbiAgICogLSBgVEhSRUUuTWVzaGA6IFRoZSBvbmx5IHByaW1pdGl2ZSBvZiB0aGUgbWVzaCAqXG4gICAqXG4gICAqICMjIyBBIG5vZGUgd2l0aCBhIChtZXNoLCBtdWx0aXBsZSBwcmltaXRpdmVzKVxuICAgKlxuICAgKiAtIGBUSFJFRS5Hcm91cGA6IFRoZSByb290IG9mIHRoZSBtZXNoXG4gICAqICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoICpcbiAgICogICAtIGBUSFJFRS5NZXNoYDogQSBwcmltaXRpdmUgb2YgdGhlIG1lc2ggKDIpICpcbiAgICpcbiAgICogIyMjIEEgbm9kZSB3aXRoIGEgKG1lc2gsIG11bHRpcGxlIHByaW1pdGl2ZXMpIEFORCAoYSBjaGlsZCB3aXRoIGEgbWVzaCwgYSBzaW5nbGUgcHJpbWl0aXZlKVxuICAgKlxuICAgKiAtIGBUSFJFRS5Hcm91cGA6IFRoZSByb290IG9mIHRoZSBtZXNoXG4gICAqICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoICpcbiAgICogICAtIGBUSFJFRS5NZXNoYDogQSBwcmltaXRpdmUgb2YgdGhlIG1lc2ggKDIpICpcbiAgICogICAtIGBUSFJFRS5NZXNoYDogQSBwcmltaXRpdmUgb2YgYSBNRVNIIE9GIFRIRSBDSElMRFxuICAgKlxuICAgKiAjIyMgQSBub2RlIHdpdGggYSAobWVzaCwgbXVsdGlwbGUgcHJpbWl0aXZlcykgQU5EIChhIGNoaWxkIHdpdGggYSBtZXNoLCBtdWx0aXBsZSBwcmltaXRpdmVzKVxuICAgKlxuICAgKiAtIGBUSFJFRS5Hcm91cGA6IFRoZSByb290IG9mIHRoZSBtZXNoXG4gICAqICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoICpcbiAgICogICAtIGBUSFJFRS5NZXNoYDogQSBwcmltaXRpdmUgb2YgdGhlIG1lc2ggKDIpICpcbiAgICogICAtIGBUSFJFRS5Hcm91cGA6IFRoZSByb290IG9mIGEgTUVTSCBPRiBUSEUgQ0hJTERcbiAgICogICAgIC0gYFRIUkVFLk1lc2hgOiBBIHByaW1pdGl2ZSBvZiB0aGUgbWVzaCBvZiB0aGUgY2hpbGRcbiAgICogICAgIC0gYFRIUkVFLk1lc2hgOiBBIHByaW1pdGl2ZSBvZiB0aGUgbWVzaCBvZiB0aGUgY2hpbGQgKDIpXG4gICAqXG4gICAqICMjIyBBIG5vZGUgd2l0aCBhIChtZXNoLCBtdWx0aXBsZSBwcmltaXRpdmVzKSBCVVQgdGhlIG5vZGUgaXMgYSBib25lXG4gICAqXG4gICAqIC0gYFRIUkVFLkJvbmVgOiBUaGUgcm9vdCBvZiB0aGUgbm9kZSwgYXMgYSBib25lXG4gICAqICAgLSBgVEhSRUUuR3JvdXBgOiBUaGUgcm9vdCBvZiB0aGUgbWVzaFxuICAgKiAgICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoICpcbiAgICogICAgIC0gYFRIUkVFLk1lc2hgOiBBIHByaW1pdGl2ZSBvZiB0aGUgbWVzaCAoMikgKlxuICAgKlxuICAgKiAjIyMgQSBub2RlIHdpdGggYSAobWVzaCwgbXVsdGlwbGUgcHJpbWl0aXZlcykgQU5EIChhIGNoaWxkIHdpdGggYSBtZXNoLCBtdWx0aXBsZSBwcmltaXRpdmVzKSBCVVQgdGhlIG5vZGUgaXMgYSBib25lXG4gICAqXG4gICAqIC0gYFRIUkVFLkJvbmVgOiBUaGUgcm9vdCBvZiB0aGUgbm9kZSwgYXMgYSBib25lXG4gICAqICAgLSBgVEhSRUUuR3JvdXBgOiBUaGUgcm9vdCBvZiB0aGUgbWVzaFxuICAgKiAgICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoICpcbiAgICogICAgIC0gYFRIUkVFLk1lc2hgOiBBIHByaW1pdGl2ZSBvZiB0aGUgbWVzaCAoMikgKlxuICAgKiAgIC0gYFRIUkVFLkdyb3VwYDogVGhlIHJvb3Qgb2YgYSBNRVNIIE9GIFRIRSBDSElMRFxuICAgKiAgICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoIG9mIHRoZSBjaGlsZFxuICAgKiAgICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoIG9mIHRoZSBjaGlsZCAoMilcbiAgICpcbiAgICogLi4uSSB3aWxsIHRha2UgYSBzdHJhdGVneSB0aGF0IHRyYXZlcnNlcyB0aGUgcm9vdCBvZiB0aGUgbm9kZSBhbmQgdGFrZSBmaXJzdCAocHJpbWl0aXZlQ291bnQpIG1lc2hlcy5cbiAgICovXG5cbiAgLy8gTWFrZSBzdXJlIHRoYXQgdGhlIG5vZGUgaGFzIGEgbWVzaFxuICBjb25zdCBzY2hlbWFOb2RlID0ganNvbi5ub2Rlcz8uW25vZGVJbmRleF07XG4gIGlmIChzY2hlbWFOb2RlID09IG51bGwpIHtcbiAgICBjb25zb2xlLndhcm4oYGV4dHJhY3RQcmltaXRpdmVzSW50ZXJuYWw6IEF0dGVtcHQgdG8gdXNlIG5vZGVzWyR7bm9kZUluZGV4fV0gb2YgZ2xURiBidXQgdGhlIG5vZGUgZG9lc24ndCBleGlzdGApO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3QgbWVzaEluZGV4ID0gc2NoZW1hTm9kZS5tZXNoO1xuICBpZiAobWVzaEluZGV4ID09IG51bGwpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIEhvdyBtYW55IHByaW1pdGl2ZXMgdGhlIG1lc2ggaGFzP1xuICBjb25zdCBzY2hlbWFNZXNoID0ganNvbi5tZXNoZXM/LlttZXNoSW5kZXhdO1xuICBpZiAoc2NoZW1hTWVzaCA9PSBudWxsKSB7XG4gICAgY29uc29sZS53YXJuKGBleHRyYWN0UHJpbWl0aXZlc0ludGVybmFsOiBBdHRlbXB0IHRvIHVzZSBtZXNoZXNbJHttZXNoSW5kZXh9XSBvZiBnbFRGIGJ1dCB0aGUgbWVzaCBkb2Vzbid0IGV4aXN0YCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCBwcmltaXRpdmVDb3VudCA9IHNjaGVtYU1lc2gucHJpbWl0aXZlcy5sZW5ndGg7XG5cbiAgLy8gVHJhdmVyc2UgdGhlIG5vZGUgYW5kIHRha2UgZmlyc3QgKHByaW1pdGl2ZUNvdW50KSBtZXNoZXNcbiAgY29uc3QgcHJpbWl0aXZlczogVEhSRUUuTWVzaFtdID0gW107XG4gIG5vZGUudHJhdmVyc2UoKG9iamVjdCkgPT4ge1xuICAgIGlmIChwcmltaXRpdmVzLmxlbmd0aCA8IHByaW1pdGl2ZUNvdW50KSB7XG4gICAgICBpZiAoKG9iamVjdCBhcyBhbnkpLmlzTWVzaCkge1xuICAgICAgICBwcmltaXRpdmVzLnB1c2gob2JqZWN0IGFzIFRIUkVFLk1lc2gpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHByaW1pdGl2ZXM7XG59XG5cbi8qKlxuICogRXh0cmFjdCBwcmltaXRpdmVzICggYFRIUkVFLk1lc2hbXWAgKSBvZiBhIG5vZGUgZnJvbSBhIGxvYWRlZCBHTFRGLlxuICogVGhlIG1haW4gcHVycG9zZSBvZiB0aGlzIGZ1bmN0aW9uIGlzIHRvIGRpc3Rpbmd1aXNoIHByaW1pdGl2ZXMgYW5kIGNoaWxkcmVuIGZyb20gYSBub2RlIHRoYXQgaGFzIGJvdGggbWVzaGVzIGFuZCBjaGlsZHJlbi5cbiAqXG4gKiBJdCB1dGlsaXplcyB0aGUgYmVoYXZpb3IgdGhhdCBHTFRGTG9hZGVyIGFkZHMgbWVzaCBwcmltaXRpdmVzIHRvIHRoZSBub2RlIG9iamVjdCAoIGBUSFJFRS5Hcm91cGAgKSBmaXJzdCB0aGVuIGFkZHMgaXRzIGNoaWxkcmVuLlxuICpcbiAqIEBwYXJhbSBnbHRmIEEgR0xURiBvYmplY3QgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gKiBAcGFyYW0gbm9kZUluZGV4IFRoZSBpbmRleCBvZiB0aGUgbm9kZVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGUoZ2x0ZjogR0xURiwgbm9kZUluZGV4OiBudW1iZXIpOiBQcm9taXNlPFRIUkVFLk1lc2hbXSB8IG51bGw+IHtcbiAgY29uc3Qgbm9kZTogVEhSRUUuT2JqZWN0M0QgPSBhd2FpdCBnbHRmLnBhcnNlci5nZXREZXBlbmRlbmN5KCdub2RlJywgbm9kZUluZGV4KTtcbiAgcmV0dXJuIGV4dHJhY3RQcmltaXRpdmVzSW50ZXJuYWwoZ2x0Ziwgbm9kZUluZGV4LCBub2RlKTtcbn1cblxuLyoqXG4gKiBFeHRyYWN0IHByaW1pdGl2ZXMgKCBgVEhSRUUuTWVzaFtdYCApIG9mIG5vZGVzIGZyb20gYSBsb2FkZWQgR0xURi5cbiAqIFNlZSB7QGxpbmsgZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGV9IGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogSXQgcmV0dXJucyBhIG1hcCBmcm9tIG5vZGUgaW5kZXggdG8gZXh0cmFjdGlvbiByZXN1bHQuXG4gKiBJZiBhIG5vZGUgZG9lcyBub3QgaGF2ZSBhIG1lc2gsIHRoZSBlbnRyeSBmb3IgdGhlIG5vZGUgd2lsbCBub3QgYmUgcHV0IGluIHRoZSByZXR1cm5pbmcgbWFwLlxuICpcbiAqIEBwYXJhbSBnbHRmIEEgR0xURiBvYmplY3QgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnbHRmRXh0cmFjdFByaW1pdGl2ZXNGcm9tTm9kZXMoZ2x0ZjogR0xURik6IFByb21pc2U8TWFwPG51bWJlciwgVEhSRUUuTWVzaFtdPj4ge1xuICBjb25zdCBub2RlczogVEhSRUUuT2JqZWN0M0RbXSA9IGF3YWl0IGdsdGYucGFyc2VyLmdldERlcGVuZGVuY2llcygnbm9kZScpO1xuICBjb25zdCBtYXAgPSBuZXcgTWFwPG51bWJlciwgVEhSRUUuTWVzaFtdPigpO1xuXG4gIG5vZGVzLmZvckVhY2goKG5vZGUsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gZXh0cmFjdFByaW1pdGl2ZXNJbnRlcm5hbChnbHRmLCBpbmRleCwgbm9kZSk7XG4gICAgaWYgKHJlc3VsdCAhPSBudWxsKSB7XG4gICAgICBtYXAuc2V0KGluZGV4LCByZXN1bHQpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIG1hcDtcbn1cbiIsICIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cblxuZXhwb3J0IGNvbnN0IFZSTUV4cHJlc3Npb25QcmVzZXROYW1lID0ge1xuICBBYTogJ2FhJyxcbiAgSWg6ICdpaCcsXG4gIE91OiAnb3UnLFxuICBFZTogJ2VlJyxcbiAgT2g6ICdvaCcsXG4gIEJsaW5rOiAnYmxpbmsnLFxuICBIYXBweTogJ2hhcHB5JyxcbiAgQW5ncnk6ICdhbmdyeScsXG4gIFNhZDogJ3NhZCcsXG4gIFJlbGF4ZWQ6ICdyZWxheGVkJyxcbiAgTG9va1VwOiAnbG9va1VwJyxcbiAgU3VycHJpc2VkOiAnc3VycHJpc2VkJyxcbiAgTG9va0Rvd246ICdsb29rRG93bicsXG4gIExvb2tMZWZ0OiAnbG9va0xlZnQnLFxuICBMb29rUmlnaHQ6ICdsb29rUmlnaHQnLFxuICBCbGlua0xlZnQ6ICdibGlua0xlZnQnLFxuICBCbGlua1JpZ2h0OiAnYmxpbmtSaWdodCcsXG4gIE5ldXRyYWw6ICduZXV0cmFsJyxcbn0gYXMgY29uc3Q7XG5cbmV4cG9ydCB0eXBlIFZSTUV4cHJlc3Npb25QcmVzZXROYW1lID0gKHR5cGVvZiBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSlba2V5b2YgdHlwZW9mIFZSTUV4cHJlc3Npb25QcmVzZXROYW1lXTtcbiIsICIvKipcbiAqIENsYW1wIHRoZSBpbnB1dCB2YWx1ZSB3aXRoaW4gWzAuMCAtIDEuMF0uXG4gKlxuICogQHBhcmFtIHZhbHVlIFRoZSBpbnB1dCB2YWx1ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2F0dXJhdGUodmFsdWU6IG51bWJlcik6IG51bWJlciB7XG4gIHJldHVybiBNYXRoLm1heChNYXRoLm1pbih2YWx1ZSwgMS4wKSwgMC4wKTtcbn1cbiIsICJpbXBvcnQgeyBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSB9IGZyb20gJy4vVlJNRXhwcmVzc2lvblByZXNldE5hbWUnO1xuaW1wb3J0IHsgc2F0dXJhdGUgfSBmcm9tICcuLi91dGlscy9zYXR1cmF0ZSc7XG5pbXBvcnQgdHlwZSB7IFZSTUV4cHJlc3Npb24gfSBmcm9tICcuL1ZSTUV4cHJlc3Npb24nO1xuXG5leHBvcnQgY2xhc3MgVlJNRXhwcmVzc2lvbk1hbmFnZXIge1xuICAvKipcbiAgICogQSBzZXQgb2YgbmFtZSBvciBwcmVzZXQgbmFtZSBvZiBleHByZXNzaW9ucyB0aGF0IHdpbGwgYmUgb3ZlcnJpZGRlbiBieSB7QGxpbmsgVlJNRXhwcmVzc2lvbi5vdmVycmlkZUJsaW5rfS5cbiAgICovXG4gIHB1YmxpYyBibGlua0V4cHJlc3Npb25OYW1lcyA9IFsnYmxpbmsnLCAnYmxpbmtMZWZ0JywgJ2JsaW5rUmlnaHQnXTtcblxuICAvKipcbiAgICogQSBzZXQgb2YgbmFtZSBvciBwcmVzZXQgbmFtZSBvZiBleHByZXNzaW9ucyB0aGF0IHdpbGwgYmUgb3ZlcnJpZGRlbiBieSB7QGxpbmsgVlJNRXhwcmVzc2lvbi5vdmVycmlkZUxvb2tBdH0uXG4gICAqL1xuICBwdWJsaWMgbG9va0F0RXhwcmVzc2lvbk5hbWVzID0gWydsb29rTGVmdCcsICdsb29rUmlnaHQnLCAnbG9va1VwJywgJ2xvb2tEb3duJ107XG5cbiAgLyoqXG4gICAqIEEgc2V0IG9mIG5hbWUgb3IgcHJlc2V0IG5hbWUgb2YgZXhwcmVzc2lvbnMgdGhhdCB3aWxsIGJlIG92ZXJyaWRkZW4gYnkge0BsaW5rIFZSTUV4cHJlc3Npb24ub3ZlcnJpZGVNb3V0aH0uXG4gICAqL1xuICBwdWJsaWMgbW91dGhFeHByZXNzaW9uTmFtZXMgPSBbJ2FhJywgJ2VlJywgJ2loJywgJ29oJywgJ291J107XG5cbiAgLyoqXG4gICAqIEEgc2V0IG9mIHtAbGluayBWUk1FeHByZXNzaW9ufS5cbiAgICogV2hlbiB5b3Ugd2FudCB0byByZWdpc3RlciBleHByZXNzaW9ucywgdXNlIHtAbGluayByZWdpc3RlckV4cHJlc3Npb259XG4gICAqL1xuICBwcml2YXRlIF9leHByZXNzaW9uczogVlJNRXhwcmVzc2lvbltdID0gW107XG4gIHB1YmxpYyBnZXQgZXhwcmVzc2lvbnMoKTogVlJNRXhwcmVzc2lvbltdIHtcbiAgICByZXR1cm4gdGhpcy5fZXhwcmVzc2lvbnMuY29uY2F0KCk7XG4gIH1cblxuICAvKipcbiAgICogQSBtYXAgZnJvbSBuYW1lIHRvIGV4cHJlc3Npb24uXG4gICAqL1xuICBwcml2YXRlIF9leHByZXNzaW9uTWFwOiB7IFtuYW1lOiBzdHJpbmddOiBWUk1FeHByZXNzaW9uIH0gPSB7fTtcbiAgcHVibGljIGdldCBleHByZXNzaW9uTWFwKCk6IHsgW25hbWU6IHN0cmluZ106IFZSTUV4cHJlc3Npb24gfSB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHRoaXMuX2V4cHJlc3Npb25NYXApO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgbWFwIGZyb20gbmFtZSB0byBleHByZXNzaW9uLCBidXQgZXhjbHVkaW5nIGN1c3RvbSBleHByZXNzaW9ucy5cbiAgICovXG4gIHB1YmxpYyBnZXQgcHJlc2V0RXhwcmVzc2lvbk1hcCgpOiB7IFtuYW1lIGluIFZSTUV4cHJlc3Npb25QcmVzZXROYW1lXT86IFZSTUV4cHJlc3Npb24gfSB7XG4gICAgY29uc3QgcmVzdWx0OiB7IFtuYW1lIGluIFZSTUV4cHJlc3Npb25QcmVzZXROYW1lXT86IFZSTUV4cHJlc3Npb24gfSA9IHt9O1xuXG4gICAgY29uc3QgcHJlc2V0TmFtZVNldCA9IG5ldyBTZXQ8c3RyaW5nPihPYmplY3QudmFsdWVzKFZSTUV4cHJlc3Npb25QcmVzZXROYW1lKSk7XG5cbiAgICBPYmplY3QuZW50cmllcyh0aGlzLl9leHByZXNzaW9uTWFwKS5mb3JFYWNoKChbbmFtZSwgZXhwcmVzc2lvbl0pID0+IHtcbiAgICAgIGlmIChwcmVzZXROYW1lU2V0LmhhcyhuYW1lKSkge1xuICAgICAgICByZXN1bHRbbmFtZSBhcyBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZV0gPSBleHByZXNzaW9uO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIG1hcCBmcm9tIG5hbWUgdG8gZXhwcmVzc2lvbiwgYnV0IGV4Y2x1ZGluZyBwcmVzZXQgZXhwcmVzc2lvbnMuXG4gICAqL1xuICBwdWJsaWMgZ2V0IGN1c3RvbUV4cHJlc3Npb25NYXAoKTogeyBbbmFtZTogc3RyaW5nXTogVlJNRXhwcmVzc2lvbiB9IHtcbiAgICBjb25zdCByZXN1bHQ6IHsgW25hbWU6IHN0cmluZ106IFZSTUV4cHJlc3Npb24gfSA9IHt9O1xuXG4gICAgY29uc3QgcHJlc2V0TmFtZVNldCA9IG5ldyBTZXQ8c3RyaW5nPihPYmplY3QudmFsdWVzKFZSTUV4cHJlc3Npb25QcmVzZXROYW1lKSk7XG5cbiAgICBPYmplY3QuZW50cmllcyh0aGlzLl9leHByZXNzaW9uTWFwKS5mb3JFYWNoKChbbmFtZSwgZXhwcmVzc2lvbl0pID0+IHtcbiAgICAgIGlmICghcHJlc2V0TmFtZVNldC5oYXMobmFtZSkpIHtcbiAgICAgICAgcmVzdWx0W25hbWVdID0gZXhwcmVzc2lvbjtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IHtAbGluayBWUk1FeHByZXNzaW9uTWFuYWdlcn0uXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gZG8gbm90aGluZ1xuICB9XG5cbiAgLyoqXG4gICAqIENvcHkgdGhlIGdpdmVuIHtAbGluayBWUk1FeHByZXNzaW9uTWFuYWdlcn0gaW50byB0aGlzIG9uZS5cbiAgICogQHBhcmFtIHNvdXJjZSBUaGUge0BsaW5rIFZSTUV4cHJlc3Npb25NYW5hZ2VyfSB5b3Ugd2FudCB0byBjb3B5XG4gICAqIEByZXR1cm5zIHRoaXNcbiAgICovXG4gIHB1YmxpYyBjb3B5KHNvdXJjZTogVlJNRXhwcmVzc2lvbk1hbmFnZXIpOiB0aGlzIHtcbiAgICAvLyBmaXJzdCB1bnJlZ2lzdGVyIGFsbCB0aGUgZXhwcmVzc2lvbiBpdCBoYXNcbiAgICBjb25zdCBleHByZXNzaW9ucyA9IHRoaXMuX2V4cHJlc3Npb25zLmNvbmNhdCgpO1xuICAgIGV4cHJlc3Npb25zLmZvckVhY2goKGV4cHJlc3Npb24pID0+IHtcbiAgICAgIHRoaXMudW5yZWdpc3RlckV4cHJlc3Npb24oZXhwcmVzc2lvbik7XG4gICAgfSk7XG5cbiAgICAvLyB0aGVuIHJlZ2lzdGVyIGFsbCB0aGUgZXhwcmVzc2lvbiBvZiB0aGUgc291cmNlXG4gICAgc291cmNlLl9leHByZXNzaW9ucy5mb3JFYWNoKChleHByZXNzaW9uKSA9PiB7XG4gICAgICB0aGlzLnJlZ2lzdGVyRXhwcmVzc2lvbihleHByZXNzaW9uKTtcbiAgICB9KTtcblxuICAgIC8vIGNvcHkgcmVtYWluaW5nIG1lbWJlcnNcbiAgICB0aGlzLmJsaW5rRXhwcmVzc2lvbk5hbWVzID0gc291cmNlLmJsaW5rRXhwcmVzc2lvbk5hbWVzLmNvbmNhdCgpO1xuICAgIHRoaXMubG9va0F0RXhwcmVzc2lvbk5hbWVzID0gc291cmNlLmxvb2tBdEV4cHJlc3Npb25OYW1lcy5jb25jYXQoKTtcbiAgICB0aGlzLm1vdXRoRXhwcmVzc2lvbk5hbWVzID0gc291cmNlLm1vdXRoRXhwcmVzc2lvbk5hbWVzLmNvbmNhdCgpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGNsb25lIG9mIHRoaXMge0BsaW5rIFZSTUV4cHJlc3Npb25NYW5hZ2VyfS5cbiAgICogQHJldHVybnMgQ29waWVkIHtAbGluayBWUk1FeHByZXNzaW9uTWFuYWdlcn1cbiAgICovXG4gIHB1YmxpYyBjbG9uZSgpOiBWUk1FeHByZXNzaW9uTWFuYWdlciB7XG4gICAgcmV0dXJuIG5ldyBWUk1FeHByZXNzaW9uTWFuYWdlcigpLmNvcHkodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGEgcmVnaXN0ZXJlZCBleHByZXNzaW9uLlxuICAgKiBJZiBpdCBjYW5ub3QgZmluZCBhbiBleHByZXNzaW9uLCBpdCB3aWxsIHJldHVybiBgbnVsbGAgaW5zdGVhZC5cbiAgICpcbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvciBwcmVzZXQgbmFtZSBvZiB0aGUgZXhwcmVzc2lvblxuICAgKi9cbiAgcHVibGljIGdldEV4cHJlc3Npb24obmFtZTogVlJNRXhwcmVzc2lvblByZXNldE5hbWUgfCBzdHJpbmcpOiBWUk1FeHByZXNzaW9uIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX2V4cHJlc3Npb25NYXBbbmFtZV0gPz8gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBhbiBleHByZXNzaW9uLlxuICAgKlxuICAgKiBAcGFyYW0gZXhwcmVzc2lvbiB7QGxpbmsgVlJNRXhwcmVzc2lvbn0gdGhhdCBkZXNjcmliZXMgdGhlIGV4cHJlc3Npb25cbiAgICovXG4gIHB1YmxpYyByZWdpc3RlckV4cHJlc3Npb24oZXhwcmVzc2lvbjogVlJNRXhwcmVzc2lvbik6IHZvaWQge1xuICAgIHRoaXMuX2V4cHJlc3Npb25zLnB1c2goZXhwcmVzc2lvbik7XG4gICAgdGhpcy5fZXhwcmVzc2lvbk1hcFtleHByZXNzaW9uLmV4cHJlc3Npb25OYW1lXSA9IGV4cHJlc3Npb247XG4gIH1cblxuICAvKipcbiAgICogVW5yZWdpc3RlciBhbiBleHByZXNzaW9uLlxuICAgKlxuICAgKiBAcGFyYW0gZXhwcmVzc2lvbiBUaGUgZXhwcmVzc2lvbiB5b3Ugd2FudCB0byB1bnJlZ2lzdGVyXG4gICAqL1xuICBwdWJsaWMgdW5yZWdpc3RlckV4cHJlc3Npb24oZXhwcmVzc2lvbjogVlJNRXhwcmVzc2lvbik6IHZvaWQge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fZXhwcmVzc2lvbnMuaW5kZXhPZihleHByZXNzaW9uKTtcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1ZSTUV4cHJlc3Npb25NYW5hZ2VyOiBUaGUgc3BlY2lmaWVkIGV4cHJlc3Npb25zIGlzIG5vdCByZWdpc3RlcmVkJyk7XG4gICAgfVxuXG4gICAgdGhpcy5fZXhwcmVzc2lvbnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICBkZWxldGUgdGhpcy5fZXhwcmVzc2lvbk1hcFtleHByZXNzaW9uLmV4cHJlc3Npb25OYW1lXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGN1cnJlbnQgd2VpZ2h0IG9mIHRoZSBzcGVjaWZpZWQgZXhwcmVzc2lvbi5cbiAgICogSWYgaXQgZG9lc24ndCBoYXZlIGFuIGV4cHJlc3Npb24gb2YgZ2l2ZW4gbmFtZSwgaXQgd2lsbCByZXR1cm4gYG51bGxgIGluc3RlYWQuXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGV4cHJlc3Npb25cbiAgICovXG4gIHB1YmxpYyBnZXRWYWx1ZShuYW1lOiBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSB8IHN0cmluZyk6IG51bWJlciB8IG51bGwge1xuICAgIGNvbnN0IGV4cHJlc3Npb24gPSB0aGlzLmdldEV4cHJlc3Npb24obmFtZSk7XG4gICAgcmV0dXJuIGV4cHJlc3Npb24/LndlaWdodCA/PyBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBhIHdlaWdodCB0byB0aGUgc3BlY2lmaWVkIGV4cHJlc3Npb24uXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGV4cHJlc3Npb25cbiAgICogQHBhcmFtIHdlaWdodCBXZWlnaHRcbiAgICovXG4gIHB1YmxpYyBzZXRWYWx1ZShuYW1lOiBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSB8IHN0cmluZywgd2VpZ2h0OiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBleHByZXNzaW9uID0gdGhpcy5nZXRFeHByZXNzaW9uKG5hbWUpO1xuICAgIGlmIChleHByZXNzaW9uKSB7XG4gICAgICBleHByZXNzaW9uLndlaWdodCA9IHNhdHVyYXRlKHdlaWdodCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHdlaWdodHMgb2YgYWxsIGV4cHJlc3Npb25zIHRvIGAwLjBgLlxuICAgKi9cbiAgcHVibGljIHJlc2V0VmFsdWVzKCk6IHZvaWQge1xuICAgIHRoaXMuX2V4cHJlc3Npb25zLmZvckVhY2goKGV4cHJlc3Npb24pID0+IHtcbiAgICAgIGV4cHJlc3Npb24ud2VpZ2h0ID0gMC4wO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIHRyYWNrIG5hbWUgb2Ygc3BlY2lmaWVkIGV4cHJlc3Npb24uXG4gICAqIFRoaXMgdHJhY2sgbmFtZSBpcyBuZWVkZWQgdG8gbWFuaXB1bGF0ZSBpdHMgZXhwcmVzc2lvbiB2aWEga2V5ZnJhbWUgYW5pbWF0aW9ucy5cbiAgICpcbiAgICogQGV4YW1wbGUgTWFuaXB1bGF0ZSBhbiBleHByZXNzaW9uIHVzaW5nIGtleWZyYW1lIGFuaW1hdGlvblxuICAgKiBgYGBqc1xuICAgKiBjb25zdCB0cmFja05hbWUgPSB2cm0uZXhwcmVzc2lvbk1hbmFnZXIuZ2V0RXhwcmVzc2lvblRyYWNrTmFtZSggJ2JsaW5rJyApO1xuICAgKiBjb25zdCB0cmFjayA9IG5ldyBUSFJFRS5OdW1iZXJLZXlmcmFtZVRyYWNrKFxuICAgKiAgIG5hbWUsXG4gICAqICAgWyAwLjAsIDAuNSwgMS4wIF0sIC8vIHRpbWVzXG4gICAqICAgWyAwLjAsIDEuMCwgMC4wIF0gLy8gdmFsdWVzXG4gICAqICk7XG4gICAqXG4gICAqIGNvbnN0IGNsaXAgPSBuZXcgVEhSRUUuQW5pbWF0aW9uQ2xpcChcbiAgICogICAnYmxpbmsnLCAvLyBuYW1lXG4gICAqICAgMS4wLCAvLyBkdXJhdGlvblxuICAgKiAgIFsgdHJhY2sgXSAvLyB0cmFja3NcbiAgICogKTtcbiAgICpcbiAgICogY29uc3QgbWl4ZXIgPSBuZXcgVEhSRUUuQW5pbWF0aW9uTWl4ZXIoIHZybS5zY2VuZSApO1xuICAgKiBjb25zdCBhY3Rpb24gPSBtaXhlci5jbGlwQWN0aW9uKCBjbGlwICk7XG4gICAqIGFjdGlvbi5wbGF5KCk7XG4gICAqIGBgYFxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBleHByZXNzaW9uXG4gICAqL1xuICBwdWJsaWMgZ2V0RXhwcmVzc2lvblRyYWNrTmFtZShuYW1lOiBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSB8IHN0cmluZyk6IHN0cmluZyB8IG51bGwge1xuICAgIGNvbnN0IGV4cHJlc3Npb24gPSB0aGlzLmdldEV4cHJlc3Npb24obmFtZSk7XG4gICAgcmV0dXJuIGV4cHJlc3Npb24gPyBgJHtleHByZXNzaW9uLm5hbWV9LndlaWdodGAgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBldmVyeSBleHByZXNzaW9ucy5cbiAgICovXG4gIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgLy8gc2VlIGhvdyBtdWNoIHdlIHNob3VsZCBvdmVycmlkZSBjZXJ0YWluIGV4cHJlc3Npb25zXG4gICAgY29uc3Qgd2VpZ2h0TXVsdGlwbGllcnMgPSB0aGlzLl9jYWxjdWxhdGVXZWlnaHRNdWx0aXBsaWVycygpO1xuXG4gICAgLy8gcmVzZXQgZXhwcmVzc2lvbiBiaW5kcyBmaXJzdFxuICAgIHRoaXMuX2V4cHJlc3Npb25zLmZvckVhY2goKGV4cHJlc3Npb24pID0+IHtcbiAgICAgIGV4cHJlc3Npb24uY2xlYXJBcHBsaWVkV2VpZ2h0KCk7XG4gICAgfSk7XG5cbiAgICAvLyB0aGVuIGFwcGx5IGJpbmRzXG4gICAgdGhpcy5fZXhwcmVzc2lvbnMuZm9yRWFjaCgoZXhwcmVzc2lvbikgPT4ge1xuICAgICAgbGV0IG11bHRpcGxpZXIgPSAxLjA7XG4gICAgICBjb25zdCBuYW1lID0gZXhwcmVzc2lvbi5leHByZXNzaW9uTmFtZTtcblxuICAgICAgaWYgKHRoaXMuYmxpbmtFeHByZXNzaW9uTmFtZXMuaW5kZXhPZihuYW1lKSAhPT0gLTEpIHtcbiAgICAgICAgbXVsdGlwbGllciAqPSB3ZWlnaHRNdWx0aXBsaWVycy5ibGluaztcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMubG9va0F0RXhwcmVzc2lvbk5hbWVzLmluZGV4T2YobmFtZSkgIT09IC0xKSB7XG4gICAgICAgIG11bHRpcGxpZXIgKj0gd2VpZ2h0TXVsdGlwbGllcnMubG9va0F0O1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5tb3V0aEV4cHJlc3Npb25OYW1lcy5pbmRleE9mKG5hbWUpICE9PSAtMSkge1xuICAgICAgICBtdWx0aXBsaWVyICo9IHdlaWdodE11bHRpcGxpZXJzLm1vdXRoO1xuICAgICAgfVxuXG4gICAgICBleHByZXNzaW9uLmFwcGx5V2VpZ2h0KHsgbXVsdGlwbGllciB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgc3VtIG9mIG92ZXJyaWRlIGFtb3VudHMgdG8gc2VlIGhvdyBtdWNoIHdlIHNob3VsZCBtdWx0aXBseSB3ZWlnaHRzIG9mIGNlcnRhaW4gZXhwcmVzc2lvbnMuXG4gICAqL1xuICBwcml2YXRlIF9jYWxjdWxhdGVXZWlnaHRNdWx0aXBsaWVycygpOiB7XG4gICAgYmxpbms6IG51bWJlcjtcbiAgICBsb29rQXQ6IG51bWJlcjtcbiAgICBtb3V0aDogbnVtYmVyO1xuICB9IHtcbiAgICBsZXQgYmxpbmsgPSAxLjA7XG4gICAgbGV0IGxvb2tBdCA9IDEuMDtcbiAgICBsZXQgbW91dGggPSAxLjA7XG5cbiAgICB0aGlzLl9leHByZXNzaW9ucy5mb3JFYWNoKChleHByZXNzaW9uKSA9PiB7XG4gICAgICBibGluayAtPSBleHByZXNzaW9uLm92ZXJyaWRlQmxpbmtBbW91bnQ7XG4gICAgICBsb29rQXQgLT0gZXhwcmVzc2lvbi5vdmVycmlkZUxvb2tBdEFtb3VudDtcbiAgICAgIG1vdXRoIC09IGV4cHJlc3Npb24ub3ZlcnJpZGVNb3V0aEFtb3VudDtcbiAgICB9KTtcblxuICAgIGJsaW5rID0gTWF0aC5tYXgoMC4wLCBibGluayk7XG4gICAgbG9va0F0ID0gTWF0aC5tYXgoMC4wLCBsb29rQXQpO1xuICAgIG1vdXRoID0gTWF0aC5tYXgoMC4wLCBtb3V0aCk7XG5cbiAgICByZXR1cm4geyBibGluaywgbG9va0F0LCBtb3V0aCB9O1xuICB9XG59XG4iLCAiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uICovXG5cbmV4cG9ydCBjb25zdCBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGUgPSB7XG4gIENvbG9yOiAnY29sb3InLFxuICBFbWlzc2lvbkNvbG9yOiAnZW1pc3Npb25Db2xvcicsXG4gIFNoYWRlQ29sb3I6ICdzaGFkZUNvbG9yJyxcbiAgTWF0Y2FwQ29sb3I6ICdtYXRjYXBDb2xvcicsXG4gIFJpbUNvbG9yOiAncmltQ29sb3InLFxuICBPdXRsaW5lQ29sb3I6ICdvdXRsaW5lQ29sb3InLFxufSBhcyBjb25zdDtcblxuZXhwb3J0IHR5cGUgVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JUeXBlID1cbiAgKHR5cGVvZiBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGUpW2tleW9mIHR5cGVvZiBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGVdO1xuXG5leHBvcnQgY29uc3QgdjBFeHByZXNzaW9uTWF0ZXJpYWxDb2xvck1hcDogeyBba2V5OiBzdHJpbmddOiBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGUgfCB1bmRlZmluZWQgfSA9IHtcbiAgX0NvbG9yOiBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGUuQ29sb3IsXG4gIF9FbWlzc2lvbkNvbG9yOiBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGUuRW1pc3Npb25Db2xvcixcbiAgX1NoYWRlQ29sb3I6IFZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yVHlwZS5TaGFkZUNvbG9yLFxuICBfUmltQ29sb3I6IFZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yVHlwZS5SaW1Db2xvcixcbiAgX091dGxpbmVDb2xvcjogVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JUeXBlLk91dGxpbmVDb2xvcixcbn07XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHR5cGUgeyBWUk1FeHByZXNzaW9uQmluZCB9IGZyb20gJy4vVlJNRXhwcmVzc2lvbkJpbmQnO1xuaW1wb3J0IHR5cGUgeyBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGUgfSBmcm9tICcuL1ZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yVHlwZSc7XG5cbmNvbnN0IF9jb2xvciA9IG5ldyBUSFJFRS5Db2xvcigpO1xuXG5pbnRlcmZhY2UgQ29sb3JCaW5kU3RhdGUge1xuICBwcm9wZXJ0eU5hbWU6IHN0cmluZztcbiAgaW5pdGlhbFZhbHVlOiBUSFJFRS5Db2xvcjtcbiAgZGVsdGFWYWx1ZTogVEhSRUUuQ29sb3I7XG59XG5cbmludGVyZmFjZSBBbHBoYUJpbmRTdGF0ZSB7XG4gIHByb3BlcnR5TmFtZTogc3RyaW5nO1xuICBpbml0aWFsVmFsdWU6IG51bWJlcjtcbiAgZGVsdGFWYWx1ZTogbnVtYmVyO1xufVxuXG5pbnRlcmZhY2UgQmluZFN0YXRlIHtcbiAgY29sb3I6IENvbG9yQmluZFN0YXRlIHwgbnVsbDtcbiAgYWxwaGE6IEFscGhhQmluZFN0YXRlIHwgbnVsbDtcbn1cblxuLyoqXG4gKiBBIGJpbmQgb2YgZXhwcmVzc2lvbiBpbmZsdWVuY2VzIHRvIGEgbWF0ZXJpYWwgY29sb3IuXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvckJpbmQgaW1wbGVtZW50cyBWUk1FeHByZXNzaW9uQmluZCB7XG4gIC8qKlxuICAgKiBNYXBwaW5nIG9mIHByb3BlcnR5IG5hbWVzIGZyb20gVlJNQy9tYXRlcmlhbENvbG9yQmluZHMudHlwZSB0byB0aHJlZS5qcy9NYXRlcmlhbC5cbiAgICogVGhlIGZpcnN0IGVsZW1lbnQgc3RhbmRzIGZvciBjb2xvciBjaGFubmVscywgdGhlIHNlY29uZCBlbGVtZW50IHN0YW5kcyBmb3IgdGhlIGFscGhhIGNoYW5uZWwuXG4gICAqIFRoZSBzZWNvbmQgZWxlbWVudCBjYW4gYmUgbnVsbCBpZiB0aGUgdGFyZ2V0IHByb3BlcnR5IGRvZXNuJ3QgZXhpc3QuXG4gICAqL1xuICAvLyBUT0RPOiBXZSBtaWdodCB3YW50IHRvIHVzZSB0aGUgYHNhdGlzZmllc2Agb3BlcmF0b3Igb25jZSB3ZSBidW1wIFRTIHRvIDQuOSBvciBoaWdoZXJcbiAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vcGl4aXYvdGhyZWUtdnJtL3B1bGwvMTMyMyNkaXNjdXNzaW9uX3IxMzc0MDIwMDM1XG4gIHByaXZhdGUgc3RhdGljIF9wcm9wZXJ0eU5hbWVNYXBNYXA6IHtcbiAgICBbZGlzdGluZ3Vpc2hlcjogc3RyaW5nXTogeyBbdHlwZSBpbiBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGVdPzogcmVhZG9ubHkgW3N0cmluZywgc3RyaW5nIHwgbnVsbF0gfTtcbiAgfSA9IHtcbiAgICBpc01lc2hTdGFuZGFyZE1hdGVyaWFsOiB7XG4gICAgICBjb2xvcjogWydjb2xvcicsICdvcGFjaXR5J10sXG4gICAgICBlbWlzc2lvbkNvbG9yOiBbJ2VtaXNzaXZlJywgbnVsbF0sXG4gICAgfSxcbiAgICBpc01lc2hCYXNpY01hdGVyaWFsOiB7XG4gICAgICBjb2xvcjogWydjb2xvcicsICdvcGFjaXR5J10sXG4gICAgfSxcbiAgICBpc01Ub29uTWF0ZXJpYWw6IHtcbiAgICAgIGNvbG9yOiBbJ2NvbG9yJywgJ29wYWNpdHknXSxcbiAgICAgIGVtaXNzaW9uQ29sb3I6IFsnZW1pc3NpdmUnLCBudWxsXSxcbiAgICAgIG91dGxpbmVDb2xvcjogWydvdXRsaW5lQ29sb3JGYWN0b3InLCBudWxsXSxcbiAgICAgIG1hdGNhcENvbG9yOiBbJ21hdGNhcEZhY3RvcicsIG51bGxdLFxuICAgICAgcmltQ29sb3I6IFsncGFyYW1ldHJpY1JpbUNvbG9yRmFjdG9yJywgbnVsbF0sXG4gICAgICBzaGFkZUNvbG9yOiBbJ3NoYWRlQ29sb3JGYWN0b3InLCBudWxsXSxcbiAgICB9LFxuICB9O1xuXG4gIC8qKlxuICAgKiBUaGUgdGFyZ2V0IG1hdGVyaWFsLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IG1hdGVyaWFsOiBUSFJFRS5NYXRlcmlhbDtcblxuICAvKipcbiAgICogVGhlIHR5cGUgb2YgdGhlIHRhcmdldCBwcm9wZXJ0eSBvZiB0aGUgbWF0ZXJpYWwuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZTogVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JUeXBlO1xuXG4gIC8qKlxuICAgKiBUaGUgdGFyZ2V0IGNvbG9yLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IHRhcmdldFZhbHVlOiBUSFJFRS5Db2xvcjtcblxuICAvKipcbiAgICogVGhlIHRhcmdldCBhbHBoYS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSB0YXJnZXRBbHBoYTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBJdHMgYmluZGluZyBzdGF0ZS5cbiAgICogSWYgaXQgY2Fubm90IGZpbmQgdGhlIHRhcmdldCBwcm9wZXJ0eSBpbiB0aGUgY29uc3RydWN0b3IsIGVhY2ggcHJvcGVydHkgd2lsbCBiZSBudWxsIGluc3RlYWQuXG4gICAqL1xuICBwcml2YXRlIF9zdGF0ZTogQmluZFN0YXRlO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcih7XG4gICAgbWF0ZXJpYWwsXG4gICAgdHlwZSxcbiAgICB0YXJnZXRWYWx1ZSxcbiAgICB0YXJnZXRBbHBoYSxcbiAgfToge1xuICAgIC8qKlxuICAgICAqIFRoZSB0YXJnZXQgbWF0ZXJpYWwuXG4gICAgICovXG4gICAgbWF0ZXJpYWw6IFRIUkVFLk1hdGVyaWFsO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHR5cGUgb2YgdGhlIHRhcmdldCBwcm9wZXJ0eSBvZiB0aGUgbWF0ZXJpYWwuXG4gICAgICovXG4gICAgdHlwZTogVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JUeXBlO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHRhcmdldCBjb2xvci5cbiAgICAgKi9cbiAgICB0YXJnZXRWYWx1ZTogVEhSRUUuQ29sb3I7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgdGFyZ2V0IGFscGhhLlxuICAgICAqL1xuICAgIHRhcmdldEFscGhhPzogbnVtYmVyO1xuICB9KSB7XG4gICAgdGhpcy5tYXRlcmlhbCA9IG1hdGVyaWFsO1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy50YXJnZXRWYWx1ZSA9IHRhcmdldFZhbHVlO1xuICAgIHRoaXMudGFyZ2V0QWxwaGEgPSB0YXJnZXRBbHBoYSA/PyAxLjA7XG5cbiAgICAvLyBpbml0IGJpbmQgc3RhdGVcbiAgICBjb25zdCBjb2xvciA9IHRoaXMuX2luaXRDb2xvckJpbmRTdGF0ZSgpO1xuICAgIGNvbnN0IGFscGhhID0gdGhpcy5faW5pdEFscGhhQmluZFN0YXRlKCk7XG4gICAgdGhpcy5fc3RhdGUgPSB7IGNvbG9yLCBhbHBoYSB9O1xuICB9XG5cbiAgcHVibGljIGFwcGx5V2VpZ2h0KHdlaWdodDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgeyBjb2xvciwgYWxwaGEgfSA9IHRoaXMuX3N0YXRlO1xuXG4gICAgaWYgKGNvbG9yICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IHsgcHJvcGVydHlOYW1lLCBkZWx0YVZhbHVlIH0gPSBjb2xvcjtcblxuICAgICAgY29uc3QgdGFyZ2V0ID0gKHRoaXMubWF0ZXJpYWwgYXMgYW55KVtwcm9wZXJ0eU5hbWVdIGFzIFRIUkVFLkNvbG9yO1xuICAgICAgaWYgKHRhcmdldCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGFyZ2V0LmFkZChfY29sb3IuY29weShkZWx0YVZhbHVlKS5tdWx0aXBseVNjYWxhcih3ZWlnaHQpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoYWxwaGEgIT0gbnVsbCkge1xuICAgICAgY29uc3QgeyBwcm9wZXJ0eU5hbWUsIGRlbHRhVmFsdWUgfSA9IGFscGhhO1xuXG4gICAgICBjb25zdCB0YXJnZXQgPSAodGhpcy5tYXRlcmlhbCBhcyBhbnkpW3Byb3BlcnR5TmFtZV0gYXMgbnVtYmVyO1xuICAgICAgaWYgKHRhcmdldCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgKCh0aGlzLm1hdGVyaWFsIGFzIGFueSlbcHJvcGVydHlOYW1lXSBhcyBudW1iZXIpICs9IGRlbHRhVmFsdWUgKiB3ZWlnaHQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNsZWFyQXBwbGllZFdlaWdodCgpOiB2b2lkIHtcbiAgICBjb25zdCB7IGNvbG9yLCBhbHBoYSB9ID0gdGhpcy5fc3RhdGU7XG5cbiAgICBpZiAoY29sb3IgIT0gbnVsbCkge1xuICAgICAgY29uc3QgeyBwcm9wZXJ0eU5hbWUsIGluaXRpYWxWYWx1ZSB9ID0gY29sb3I7XG5cbiAgICAgIGNvbnN0IHRhcmdldCA9ICh0aGlzLm1hdGVyaWFsIGFzIGFueSlbcHJvcGVydHlOYW1lXSBhcyBUSFJFRS5Db2xvcjtcbiAgICAgIGlmICh0YXJnZXQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRhcmdldC5jb3B5KGluaXRpYWxWYWx1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGFscGhhICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IHsgcHJvcGVydHlOYW1lLCBpbml0aWFsVmFsdWUgfSA9IGFscGhhO1xuXG4gICAgICBjb25zdCB0YXJnZXQgPSAodGhpcy5tYXRlcmlhbCBhcyBhbnkpW3Byb3BlcnR5TmFtZV0gYXMgbnVtYmVyO1xuICAgICAgaWYgKHRhcmdldCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgKCh0aGlzLm1hdGVyaWFsIGFzIGFueSlbcHJvcGVydHlOYW1lXSBhcyBudW1iZXIpID0gaW5pdGlhbFZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2luaXRDb2xvckJpbmRTdGF0ZSgpOiBDb2xvckJpbmRTdGF0ZSB8IG51bGwge1xuICAgIGNvbnN0IHsgbWF0ZXJpYWwsIHR5cGUsIHRhcmdldFZhbHVlIH0gPSB0aGlzO1xuXG4gICAgY29uc3QgcHJvcGVydHlOYW1lTWFwID0gdGhpcy5fZ2V0UHJvcGVydHlOYW1lTWFwKCk7XG4gICAgY29uc3QgcHJvcGVydHlOYW1lID0gcHJvcGVydHlOYW1lTWFwPy5bdHlwZV0/LlswXSA/PyBudWxsO1xuXG4gICAgaWYgKHByb3BlcnR5TmFtZSA9PSBudWxsKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIGBUcmllZCB0byBhZGQgYSBtYXRlcmlhbCBjb2xvciBiaW5kIHRvIHRoZSBtYXRlcmlhbCAke1xuICAgICAgICAgIG1hdGVyaWFsLm5hbWUgPz8gJyhubyBuYW1lKSdcbiAgICAgICAgfSwgdGhlIHR5cGUgJHt0eXBlfSBidXQgdGhlIG1hdGVyaWFsIG9yIHRoZSB0eXBlIGlzIG5vdCBzdXBwb3J0ZWQuYCxcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHRhcmdldCA9IChtYXRlcmlhbCBhcyBhbnkpW3Byb3BlcnR5TmFtZV0gYXMgVEhSRUUuQ29sb3I7XG5cbiAgICBjb25zdCBpbml0aWFsVmFsdWUgPSB0YXJnZXQuY2xvbmUoKTtcblxuICAgIC8vIFx1OENBMFx1MzA2RVx1NTAyNFx1MzA5Mlx1NEZERFx1NjMwMVx1MzA1OVx1MzA4Qlx1MzA1Rlx1MzA4MVx1MzA2QkNvbG9yLnN1Ylx1MzA5Mlx1NEY3Rlx1MzA4Rlx1MzA1QVx1MzA2Qlx1NURFRVx1NTIwNlx1MzA5Mlx1OEEwOFx1N0I5N1x1MzA1OVx1MzA4QlxuICAgIGNvbnN0IGRlbHRhVmFsdWUgPSBuZXcgVEhSRUUuQ29sb3IoXG4gICAgICB0YXJnZXRWYWx1ZS5yIC0gaW5pdGlhbFZhbHVlLnIsXG4gICAgICB0YXJnZXRWYWx1ZS5nIC0gaW5pdGlhbFZhbHVlLmcsXG4gICAgICB0YXJnZXRWYWx1ZS5iIC0gaW5pdGlhbFZhbHVlLmIsXG4gICAgKTtcblxuICAgIHJldHVybiB7IHByb3BlcnR5TmFtZSwgaW5pdGlhbFZhbHVlLCBkZWx0YVZhbHVlIH07XG4gIH1cblxuICBwcml2YXRlIF9pbml0QWxwaGFCaW5kU3RhdGUoKTogQWxwaGFCaW5kU3RhdGUgfCBudWxsIHtcbiAgICBjb25zdCB7IG1hdGVyaWFsLCB0eXBlLCB0YXJnZXRBbHBoYSB9ID0gdGhpcztcblxuICAgIGNvbnN0IHByb3BlcnR5TmFtZU1hcCA9IHRoaXMuX2dldFByb3BlcnR5TmFtZU1hcCgpO1xuICAgIGNvbnN0IHByb3BlcnR5TmFtZSA9IHByb3BlcnR5TmFtZU1hcD8uW3R5cGVdPy5bMV0gPz8gbnVsbDtcblxuICAgIGlmIChwcm9wZXJ0eU5hbWUgPT0gbnVsbCAmJiB0YXJnZXRBbHBoYSAhPT0gMS4wKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIGBUcmllZCB0byBhZGQgYSBtYXRlcmlhbCBhbHBoYSBiaW5kIHRvIHRoZSBtYXRlcmlhbCAke1xuICAgICAgICAgIG1hdGVyaWFsLm5hbWUgPz8gJyhubyBuYW1lKSdcbiAgICAgICAgfSwgdGhlIHR5cGUgJHt0eXBlfSBidXQgdGhlIG1hdGVyaWFsIG9yIHRoZSB0eXBlIGRvZXMgbm90IHN1cHBvcnQgYWxwaGEuYCxcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlmIChwcm9wZXJ0eU5hbWUgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgaW5pdGlhbFZhbHVlID0gKG1hdGVyaWFsIGFzIGFueSlbcHJvcGVydHlOYW1lXSBhcyBudW1iZXI7XG5cbiAgICBjb25zdCBkZWx0YVZhbHVlID0gdGFyZ2V0QWxwaGEgLSBpbml0aWFsVmFsdWU7XG5cbiAgICByZXR1cm4geyBwcm9wZXJ0eU5hbWUsIGluaXRpYWxWYWx1ZSwgZGVsdGFWYWx1ZSB9O1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0UHJvcGVydHlOYW1lTWFwKCk6XG4gICAgeyBbdHlwZSBpbiBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGVdPzogcmVhZG9ubHkgW3N0cmluZywgc3RyaW5nIHwgbnVsbF0gfSB8IG51bGwge1xuICAgIHJldHVybiAoXG4gICAgICBPYmplY3QuZW50cmllcyhWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvckJpbmQuX3Byb3BlcnR5TmFtZU1hcE1hcCkuZmluZCgoW2Rpc3Rpbmd1aXNoZXJdKSA9PiB7XG4gICAgICAgIHJldHVybiAodGhpcy5tYXRlcmlhbCBhcyBhbnkpW2Rpc3Rpbmd1aXNoZXJdID09PSB0cnVlO1xuICAgICAgfSk/LlsxXSA/PyBudWxsXG4gICAgKTtcbiAgfVxufVxuIiwgImltcG9ydCB0eXBlICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHR5cGUgeyBWUk1FeHByZXNzaW9uQmluZCB9IGZyb20gJy4vVlJNRXhwcmVzc2lvbkJpbmQnO1xuXG4vKipcbiAqIEEgYmluZCBvZiB7QGxpbmsgVlJNRXhwcmVzc2lvbn0gaW5mbHVlbmNlcyB0byBtb3JwaCB0YXJnZXRzLlxuICovXG5leHBvcnQgY2xhc3MgVlJNRXhwcmVzc2lvbk1vcnBoVGFyZ2V0QmluZCBpbXBsZW1lbnRzIFZSTUV4cHJlc3Npb25CaW5kIHtcbiAgLyoqXG4gICAqIFRoZSBtZXNoIHByaW1pdGl2ZXMgdGhhdCBhdHRhY2hlZCB0byB0YXJnZXQgbWVzaC5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBwcmltaXRpdmVzOiBUSFJFRS5NZXNoW107XG5cbiAgLyoqXG4gICAqIFRoZSBpbmRleCBvZiB0aGUgbW9ycGggdGFyZ2V0IGluIHRoZSBtZXNoLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGluZGV4OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSB3ZWlnaHQgdmFsdWUgb2YgdGFyZ2V0IG1vcnBoIHRhcmdldC4gUmFuZ2luZyBpbiBbMC4wIC0gMS4wXS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSB3ZWlnaHQ6IG51bWJlcjtcblxuICBwdWJsaWMgY29uc3RydWN0b3Ioe1xuICAgIHByaW1pdGl2ZXMsXG4gICAgaW5kZXgsXG4gICAgd2VpZ2h0LFxuICB9OiB7XG4gICAgLyoqXG4gICAgICogVGhlIG1lc2ggcHJpbWl0aXZlcyB0aGF0IGF0dGFjaGVkIHRvIHRhcmdldCBtZXNoLlxuICAgICAqL1xuICAgIHByaW1pdGl2ZXM6IFRIUkVFLk1lc2hbXTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBpbmRleCBvZiB0aGUgbW9ycGggdGFyZ2V0IGluIHRoZSBtZXNoLlxuICAgICAqL1xuICAgIGluZGV4OiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgd2VpZ2h0IHZhbHVlIG9mIHRhcmdldCBtb3JwaCB0YXJnZXQuIFJhbmdpbmcgaW4gWzAuMCAtIDEuMF0uXG4gICAgICovXG4gICAgd2VpZ2h0OiBudW1iZXI7XG4gIH0pIHtcbiAgICB0aGlzLnByaW1pdGl2ZXMgPSBwcmltaXRpdmVzO1xuICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICB0aGlzLndlaWdodCA9IHdlaWdodDtcbiAgfVxuXG4gIHB1YmxpYyBhcHBseVdlaWdodCh3ZWlnaHQ6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMucHJpbWl0aXZlcy5mb3JFYWNoKChtZXNoKSA9PiB7XG4gICAgICBpZiAobWVzaC5tb3JwaFRhcmdldEluZmx1ZW5jZXM/Llt0aGlzLmluZGV4XSAhPSBudWxsKSB7XG4gICAgICAgIG1lc2gubW9ycGhUYXJnZXRJbmZsdWVuY2VzW3RoaXMuaW5kZXhdICs9IHRoaXMud2VpZ2h0ICogd2VpZ2h0O1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGNsZWFyQXBwbGllZFdlaWdodCgpOiB2b2lkIHtcbiAgICB0aGlzLnByaW1pdGl2ZXMuZm9yRWFjaCgobWVzaCkgPT4ge1xuICAgICAgaWYgKG1lc2gubW9ycGhUYXJnZXRJbmZsdWVuY2VzPy5bdGhpcy5pbmRleF0gIT0gbnVsbCkge1xuICAgICAgICBtZXNoLm1vcnBoVGFyZ2V0SW5mbHVlbmNlc1t0aGlzLmluZGV4XSA9IDAuMDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB0eXBlIHsgVlJNRXhwcmVzc2lvbkJpbmQgfSBmcm9tICcuL1ZSTUV4cHJlc3Npb25CaW5kJztcblxuY29uc3QgX3YyID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblxuLyoqXG4gKiBBIGJpbmQgb2YgZXhwcmVzc2lvbiBpbmZsdWVuY2VzIHRvIHRleHR1cmUgdHJhbnNmb3Jtcy5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUV4cHJlc3Npb25UZXh0dXJlVHJhbnNmb3JtQmluZCBpbXBsZW1lbnRzIFZSTUV4cHJlc3Npb25CaW5kIHtcbiAgcHJpdmF0ZSBzdGF0aWMgX3Byb3BlcnR5TmFtZXNNYXA6IHsgW2Rpc3Rpbmd1aXNoZXI6IHN0cmluZ106IHN0cmluZ1tdIH0gPSB7XG4gICAgaXNNZXNoU3RhbmRhcmRNYXRlcmlhbDogW1xuICAgICAgJ21hcCcsXG4gICAgICAnZW1pc3NpdmVNYXAnLFxuICAgICAgJ2J1bXBNYXAnLFxuICAgICAgJ25vcm1hbE1hcCcsXG4gICAgICAnZGlzcGxhY2VtZW50TWFwJyxcbiAgICAgICdyb3VnaG5lc3NNYXAnLFxuICAgICAgJ21ldGFsbmVzc01hcCcsXG4gICAgICAnYWxwaGFNYXAnLFxuICAgIF0sXG4gICAgaXNNZXNoQmFzaWNNYXRlcmlhbDogWydtYXAnLCAnc3BlY3VsYXJNYXAnLCAnYWxwaGFNYXAnXSxcbiAgICBpc01Ub29uTWF0ZXJpYWw6IFtcbiAgICAgICdtYXAnLFxuICAgICAgJ25vcm1hbE1hcCcsXG4gICAgICAnZW1pc3NpdmVNYXAnLFxuICAgICAgJ3NoYWRlTXVsdGlwbHlUZXh0dXJlJyxcbiAgICAgICdyaW1NdWx0aXBseVRleHR1cmUnLFxuICAgICAgJ291dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZScsXG4gICAgICAndXZBbmltYXRpb25NYXNrVGV4dHVyZScsXG4gICAgXSxcbiAgfTtcblxuICAvKipcbiAgICogVGhlIHRhcmdldCBtYXRlcmlhbC5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBtYXRlcmlhbDogVEhSRUUuTWF0ZXJpYWw7XG5cbiAgLyoqXG4gICAqIFRoZSB1diBzY2FsZSBvZiB0aGUgdGV4dHVyZS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBzY2FsZTogVEhSRUUuVmVjdG9yMjtcblxuICAvKipcbiAgICogVGhlIHV2IG9mZnNldCBvZiB0aGUgdGV4dHVyZS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBvZmZzZXQ6IFRIUkVFLlZlY3RvcjI7XG5cbiAgLyoqXG4gICAqIFRoZSBsaXN0IG9mIHRleHR1cmUgbmFtZXMgYW5kIGl0cyBzdGF0ZSB0aGF0IHNob3VsZCBiZSB0cmFuc2Zvcm1lZCBieSB0aGlzIGJpbmQuXG4gICAqL1xuICBwcml2YXRlIF9wcm9wZXJ0aWVzOiB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGluaXRpYWxPZmZzZXQ6IFRIUkVFLlZlY3RvcjI7XG4gICAgaW5pdGlhbFNjYWxlOiBUSFJFRS5WZWN0b3IyO1xuICAgIGRlbHRhT2Zmc2V0OiBUSFJFRS5WZWN0b3IyO1xuICAgIGRlbHRhU2NhbGU6IFRIUkVFLlZlY3RvcjI7XG4gIH1bXTtcblxuICBwdWJsaWMgY29uc3RydWN0b3Ioe1xuICAgIG1hdGVyaWFsLFxuICAgIHNjYWxlLFxuICAgIG9mZnNldCxcbiAgfToge1xuICAgIC8qKlxuICAgICAqIFRoZSB0YXJnZXQgbWF0ZXJpYWwuXG4gICAgICovXG4gICAgbWF0ZXJpYWw6IFRIUkVFLk1hdGVyaWFsO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHV2IHNjYWxlIG9mIHRoZSB0ZXh0dXJlLlxuICAgICAqL1xuICAgIHNjYWxlOiBUSFJFRS5WZWN0b3IyO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHV2IG9mZnNldCBvZiB0aGUgdGV4dHVyZS5cbiAgICAgKi9cbiAgICBvZmZzZXQ6IFRIUkVFLlZlY3RvcjI7XG4gIH0pIHtcbiAgICB0aGlzLm1hdGVyaWFsID0gbWF0ZXJpYWw7XG4gICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgIHRoaXMub2Zmc2V0ID0gb2Zmc2V0O1xuXG4gICAgY29uc3QgcHJvcGVydHlOYW1lcyA9IE9iamVjdC5lbnRyaWVzKFZSTUV4cHJlc3Npb25UZXh0dXJlVHJhbnNmb3JtQmluZC5fcHJvcGVydHlOYW1lc01hcCkuZmluZChcbiAgICAgIChbZGlzdGluZ3Vpc2hlcl0pID0+IHtcbiAgICAgICAgcmV0dXJuIChtYXRlcmlhbCBhcyBhbnkpW2Rpc3Rpbmd1aXNoZXJdID09PSB0cnVlO1xuICAgICAgfSxcbiAgICApPy5bMV07XG5cbiAgICBpZiAocHJvcGVydHlOYW1lcyA9PSBudWxsKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIGBUcmllZCB0byBhZGQgYSB0ZXh0dXJlIHRyYW5zZm9ybSBiaW5kIHRvIHRoZSBtYXRlcmlhbCAke1xuICAgICAgICAgIG1hdGVyaWFsLm5hbWUgPz8gJyhubyBuYW1lKSdcbiAgICAgICAgfSBidXQgdGhlIG1hdGVyaWFsIGlzIG5vdCBzdXBwb3J0ZWQuYCxcbiAgICAgICk7XG5cbiAgICAgIHRoaXMuX3Byb3BlcnRpZXMgPSBbXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcHJvcGVydGllcyA9IFtdO1xuXG4gICAgICBwcm9wZXJ0eU5hbWVzLmZvckVhY2goKHByb3BlcnR5TmFtZSkgPT4ge1xuICAgICAgICBjb25zdCB0ZXh0dXJlID0gKChtYXRlcmlhbCBhcyBhbnkpW3Byb3BlcnR5TmFtZV0gYXMgVEhSRUUuVGV4dHVyZSB8IHVuZGVmaW5lZCk/LmNsb25lKCk7XG4gICAgICAgIGlmICghdGV4dHVyZSkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgKG1hdGVyaWFsIGFzIGFueSlbcHJvcGVydHlOYW1lXSA9IHRleHR1cmU7IC8vIGJlY2F1c2UgdGhlIHRleHR1cmUgaXMgY2xvbmVkXG5cbiAgICAgICAgY29uc3QgaW5pdGlhbE9mZnNldCA9IHRleHR1cmUub2Zmc2V0LmNsb25lKCk7XG4gICAgICAgIGNvbnN0IGluaXRpYWxTY2FsZSA9IHRleHR1cmUucmVwZWF0LmNsb25lKCk7XG4gICAgICAgIGNvbnN0IGRlbHRhT2Zmc2V0ID0gb2Zmc2V0LmNsb25lKCkuc3ViKGluaXRpYWxPZmZzZXQpO1xuICAgICAgICBjb25zdCBkZWx0YVNjYWxlID0gc2NhbGUuY2xvbmUoKS5zdWIoaW5pdGlhbFNjYWxlKTtcblxuICAgICAgICB0aGlzLl9wcm9wZXJ0aWVzLnB1c2goe1xuICAgICAgICAgIG5hbWU6IHByb3BlcnR5TmFtZSxcbiAgICAgICAgICBpbml0aWFsT2Zmc2V0LFxuICAgICAgICAgIGRlbHRhT2Zmc2V0LFxuICAgICAgICAgIGluaXRpYWxTY2FsZSxcbiAgICAgICAgICBkZWx0YVNjYWxlLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhcHBseVdlaWdodCh3ZWlnaHQ6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX3Byb3BlcnRpZXMuZm9yRWFjaCgocHJvcGVydHkpID0+IHtcbiAgICAgIGNvbnN0IHRhcmdldCA9ICh0aGlzLm1hdGVyaWFsIGFzIGFueSlbcHJvcGVydHkubmFtZV0gYXMgVEhSRUUuVGV4dHVyZTtcbiAgICAgIGlmICh0YXJnZXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9IC8vIFRPRE86IHdlIHNob3VsZCBraWNrIHRoaXMgYXQgYGFkZE1hdGVyaWFsVmFsdWVgXG5cbiAgICAgIHRhcmdldC5vZmZzZXQuYWRkKF92Mi5jb3B5KHByb3BlcnR5LmRlbHRhT2Zmc2V0KS5tdWx0aXBseVNjYWxhcih3ZWlnaHQpKTtcbiAgICAgIHRhcmdldC5yZXBlYXQuYWRkKF92Mi5jb3B5KHByb3BlcnR5LmRlbHRhU2NhbGUpLm11bHRpcGx5U2NhbGFyKHdlaWdodCkpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGNsZWFyQXBwbGllZFdlaWdodCgpOiB2b2lkIHtcbiAgICB0aGlzLl9wcm9wZXJ0aWVzLmZvckVhY2goKHByb3BlcnR5KSA9PiB7XG4gICAgICBjb25zdCB0YXJnZXQgPSAodGhpcy5tYXRlcmlhbCBhcyBhbnkpW3Byb3BlcnR5Lm5hbWVdIGFzIFRIUkVFLlRleHR1cmU7XG4gICAgICBpZiAodGFyZ2V0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSAvLyBUT0RPOiB3ZSBzaG91bGQga2ljayB0aGlzIGF0IGBhZGRNYXRlcmlhbFZhbHVlYFxuXG4gICAgICB0YXJnZXQub2Zmc2V0LmNvcHkocHJvcGVydHkuaW5pdGlhbE9mZnNldCk7XG4gICAgICB0YXJnZXQucmVwZWF0LmNvcHkocHJvcGVydHkuaW5pdGlhbFNjYWxlKTtcbiAgICB9KTtcbiAgfVxufVxuIiwgIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiAqL1xuXG5leHBvcnQgY29uc3QgVlJNRXhwcmVzc2lvbk92ZXJyaWRlVHlwZSA9IHtcbiAgTm9uZTogJ25vbmUnLFxuICBCbG9jazogJ2Jsb2NrJyxcbiAgQmxlbmQ6ICdibGVuZCcsXG59IGFzIGNvbnN0O1xuXG5leHBvcnQgdHlwZSBWUk1FeHByZXNzaW9uT3ZlcnJpZGVUeXBlID0gKHR5cGVvZiBWUk1FeHByZXNzaW9uT3ZlcnJpZGVUeXBlKVtrZXlvZiB0eXBlb2YgVlJNRXhwcmVzc2lvbk92ZXJyaWRlVHlwZV07XG4iLCAiaW1wb3J0IHR5cGUgeyBWUk1GaXJzdFBlcnNvbk1lc2hBbm5vdGF0aW9uIH0gZnJvbSAnLi9WUk1GaXJzdFBlcnNvbk1lc2hBbm5vdGF0aW9uJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB0eXBlIHsgVlJNSHVtYW5vaWQgfSBmcm9tICcuLi9odW1hbm9pZCc7XG5cbmV4cG9ydCBjbGFzcyBWUk1GaXJzdFBlcnNvbiB7XG4gIC8qKlxuICAgKiBBIGRlZmF1bHQgY2FtZXJhIGxheWVyIGZvciBgRmlyc3RQZXJzb25Pbmx5YCBsYXllci5cbiAgICpcbiAgICogQHNlZSB7QGxpbmsgZmlyc3RQZXJzb25Pbmx5TGF5ZXJ9XG4gICAqL1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IERFRkFVTFRfRklSU1RQRVJTT05fT05MWV9MQVlFUiA9IDk7XG5cbiAgLyoqXG4gICAqIEEgZGVmYXVsdCBjYW1lcmEgbGF5ZXIgZm9yIGBUaGlyZFBlcnNvbk9ubHlgIGxheWVyLlxuICAgKlxuICAgKiBAc2VlIHtAbGluayB0aGlyZFBlcnNvbk9ubHlMYXllcn1cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgREVGQVVMVF9USElSRFBFUlNPTl9PTkxZX0xBWUVSID0gMTA7XG5cbiAgLyoqXG4gICAqIEl0cyBhc3NvY2lhdGVkIHtAbGluayBWUk1IdW1hbm9pZH0uXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgaHVtYW5vaWQ6IFZSTUh1bWFub2lkO1xuICBwdWJsaWMgbWVzaEFubm90YXRpb25zOiBWUk1GaXJzdFBlcnNvbk1lc2hBbm5vdGF0aW9uW107XG5cbiAgcHJpdmF0ZSBfZmlyc3RQZXJzb25Pbmx5TGF5ZXIgPSBWUk1GaXJzdFBlcnNvbi5ERUZBVUxUX0ZJUlNUUEVSU09OX09OTFlfTEFZRVI7XG4gIHByaXZhdGUgX3RoaXJkUGVyc29uT25seUxheWVyID0gVlJNRmlyc3RQZXJzb24uREVGQVVMVF9USElSRFBFUlNPTl9PTkxZX0xBWUVSO1xuXG4gIHByaXZhdGUgX2luaXRpYWxpemVkTGF5ZXJzID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBWUk1GaXJzdFBlcnNvbiBvYmplY3QuXG4gICAqXG4gICAqIEBwYXJhbSBodW1hbm9pZCBBIHtAbGluayBWUk1IdW1hbm9pZH1cbiAgICogQHBhcmFtIG1lc2hBbm5vdGF0aW9ucyBBIHtAbGluayBWUk1GaXJzdFBlcnNvbk1lc2hBbm5vdGF0aW9ufVxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKGh1bWFub2lkOiBWUk1IdW1hbm9pZCwgbWVzaEFubm90YXRpb25zOiBWUk1GaXJzdFBlcnNvbk1lc2hBbm5vdGF0aW9uW10pIHtcbiAgICB0aGlzLmh1bWFub2lkID0gaHVtYW5vaWQ7XG4gICAgdGhpcy5tZXNoQW5ub3RhdGlvbnMgPSBtZXNoQW5ub3RhdGlvbnM7XG4gIH1cblxuICAvKipcbiAgICogQ29weSB0aGUgZ2l2ZW4ge0BsaW5rIFZSTUZpcnN0UGVyc29ufSBpbnRvIHRoaXMgb25lLlxuICAgKiB7QGxpbmsgaHVtYW5vaWR9IG11c3QgYmUgc2FtZSBhcyB0aGUgc291cmNlIG9uZS5cbiAgICogQHBhcmFtIHNvdXJjZSBUaGUge0BsaW5rIFZSTUZpcnN0UGVyc29ufSB5b3Ugd2FudCB0byBjb3B5XG4gICAqIEByZXR1cm5zIHRoaXNcbiAgICovXG4gIHB1YmxpYyBjb3B5KHNvdXJjZTogVlJNRmlyc3RQZXJzb24pOiB0aGlzIHtcbiAgICBpZiAodGhpcy5odW1hbm9pZCAhPT0gc291cmNlLmh1bWFub2lkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZSTUZpcnN0UGVyc29uOiBodW1hbm9pZCBtdXN0IGJlIHNhbWUgaW4gb3JkZXIgdG8gY29weScpO1xuICAgIH1cblxuICAgIHRoaXMubWVzaEFubm90YXRpb25zID0gc291cmNlLm1lc2hBbm5vdGF0aW9ucy5tYXAoKGFubm90YXRpb24pID0+ICh7XG4gICAgICBtZXNoZXM6IGFubm90YXRpb24ubWVzaGVzLmNvbmNhdCgpLFxuICAgICAgdHlwZTogYW5ub3RhdGlvbi50eXBlLFxuICAgIH0pKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBjbG9uZSBvZiB0aGlzIHtAbGluayBWUk1GaXJzdFBlcnNvbn0uXG4gICAqIEByZXR1cm5zIENvcGllZCB7QGxpbmsgVlJNRmlyc3RQZXJzb259XG4gICAqL1xuICBwdWJsaWMgY2xvbmUoKTogVlJNRmlyc3RQZXJzb24ge1xuICAgIHJldHVybiBuZXcgVlJNRmlyc3RQZXJzb24odGhpcy5odW1hbm9pZCwgdGhpcy5tZXNoQW5ub3RhdGlvbnMpLmNvcHkodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogQSBjYW1lcmEgbGF5ZXIgcmVwcmVzZW50cyBgRmlyc3RQZXJzb25Pbmx5YCBsYXllci5cbiAgICogTm90ZSB0aGF0ICoqeW91IG11c3QgY2FsbCB7QGxpbmsgc2V0dXB9IGZpcnN0IGJlZm9yZSB5b3UgdXNlIHRoZSBsYXllciBmZWF0dXJlKiogb3IgaXQgZG9lcyBub3Qgd29yayBwcm9wZXJseS5cbiAgICpcbiAgICogVGhlIHZhbHVlIGlzIHtAbGluayBERUZBVUxUX0ZJUlNUUEVSU09OX09OTFlfTEFZRVJ9IGJ5IGRlZmF1bHQgYnV0IHlvdSBjYW4gY2hhbmdlIHRoZSBsYXllciBieSBzcGVjaWZ5aW5nIHZpYSB7QGxpbmsgc2V0dXB9IGlmIHlvdSBwcmVmZXIuXG4gICAqXG4gICAqIEBzZWUgaHR0cHM6Ly92cm0uZGV2L2VuL3VuaXZybS9hcGkvdW5pdnJtX3VzZV9maXJzdHBlcnNvbi9cbiAgICogQHNlZSBodHRwczovL3RocmVlanMub3JnL2RvY3MvI2FwaS9lbi9jb3JlL0xheWVyc1xuICAgKi9cbiAgcHVibGljIGdldCBmaXJzdFBlcnNvbk9ubHlMYXllcigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9maXJzdFBlcnNvbk9ubHlMYXllcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIGNhbWVyYSBsYXllciByZXByZXNlbnRzIGBUaGlyZFBlcnNvbk9ubHlgIGxheWVyLlxuICAgKiBOb3RlIHRoYXQgKip5b3UgbXVzdCBjYWxsIHtAbGluayBzZXR1cH0gZmlyc3QgYmVmb3JlIHlvdSB1c2UgdGhlIGxheWVyIGZlYXR1cmUqKiBvciBpdCBkb2VzIG5vdCB3b3JrIHByb3Blcmx5LlxuICAgKlxuICAgKiBUaGUgdmFsdWUgaXMge0BsaW5rIERFRkFVTFRfVEhJUkRQRVJTT05fT05MWV9MQVlFUn0gYnkgZGVmYXVsdCBidXQgeW91IGNhbiBjaGFuZ2UgdGhlIGxheWVyIGJ5IHNwZWNpZnlpbmcgdmlhIHtAbGluayBzZXR1cH0gaWYgeW91IHByZWZlci5cbiAgICpcbiAgICogQHNlZSBodHRwczovL3ZybS5kZXYvZW4vdW5pdnJtL2FwaS91bml2cm1fdXNlX2ZpcnN0cGVyc29uL1xuICAgKiBAc2VlIGh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy8jYXBpL2VuL2NvcmUvTGF5ZXJzXG4gICAqL1xuICBwdWJsaWMgZ2V0IHRoaXJkUGVyc29uT25seUxheWVyKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3RoaXJkUGVyc29uT25seUxheWVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEluIHRoaXMgbWV0aG9kLCBpdCBhc3NpZ25zIGxheWVycyBmb3IgZXZlcnkgbWVzaGVzIGJhc2VkIG9uIG1lc2ggYW5ub3RhdGlvbnMuXG4gICAqIFlvdSBtdXN0IGNhbGwgdGhpcyBtZXRob2QgZmlyc3QgYmVmb3JlIHlvdSB1c2UgdGhlIGxheWVyIGZlYXR1cmUuXG4gICAqXG4gICAqIFRoaXMgaXMgYW4gZXF1aXZhbGVudCBvZiBbVlJNRmlyc3RQZXJzb24uU2V0dXBdKGh0dHBzOi8vZ2l0aHViLmNvbS92cm0tYy9VbmlWUk0vYmxvYi83M2E1YmQ4ZmNkZGFhMmE3YTg3MzUwOTlhOTdlNjNjOWRiM2U1ZWEwL0Fzc2V0cy9WUk0vUnVudGltZS9GaXJzdFBlcnNvbi9WUk1GaXJzdFBlcnNvbi5jcyNMMjk1LUwyOTkpIG9mIHRoZSBVbmlWUk0uXG4gICAqXG4gICAqIFRoZSBgY2FtZXJhTGF5ZXJgIHBhcmFtZXRlciBzcGVjaWZpZXMgd2hpY2ggbGF5ZXIgd2lsbCBiZSBhc3NpZ25lZCBmb3IgYEZpcnN0UGVyc29uT25seWAgLyBgVGhpcmRQZXJzb25Pbmx5YC5cbiAgICogSW4gVW5pVlJNLCB3ZSBzcGVjaWZpZWQgdGhvc2UgYnkgbmFtaW5nIGVhY2ggZGVzaXJlZCBsYXllciBhcyBgRklSU1RQRVJTT05fT05MWV9MQVlFUmAgLyBgVEhJUkRQRVJTT05fT05MWV9MQVlFUmBcbiAgICogYnV0IHdlIGFyZSBnb2luZyB0byBzcGVjaWZ5IHRoZXNlIGxheWVycyBhdCBoZXJlIHNpbmNlIHdlIGFyZSB1bmFibGUgdG8gbmFtZSBsYXllcnMgaW4gVGhyZWUuanMuXG4gICAqXG4gICAqIEBwYXJhbSBjYW1lcmFMYXllciBTcGVjaWZ5IHdoaWNoIGxheWVyIHdpbGwgYmUgZm9yIGBGaXJzdFBlcnNvbk9ubHlgIC8gYFRoaXJkUGVyc29uT25seWAuXG4gICAqL1xuICBwdWJsaWMgc2V0dXAoe1xuICAgIGZpcnN0UGVyc29uT25seUxheWVyID0gVlJNRmlyc3RQZXJzb24uREVGQVVMVF9GSVJTVFBFUlNPTl9PTkxZX0xBWUVSLFxuICAgIHRoaXJkUGVyc29uT25seUxheWVyID0gVlJNRmlyc3RQZXJzb24uREVGQVVMVF9USElSRFBFUlNPTl9PTkxZX0xBWUVSLFxuICB9ID0ge30pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5faW5pdGlhbGl6ZWRMYXllcnMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fZmlyc3RQZXJzb25Pbmx5TGF5ZXIgPSBmaXJzdFBlcnNvbk9ubHlMYXllcjtcbiAgICB0aGlzLl90aGlyZFBlcnNvbk9ubHlMYXllciA9IHRoaXJkUGVyc29uT25seUxheWVyO1xuXG4gICAgdGhpcy5tZXNoQW5ub3RhdGlvbnMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaXRlbS5tZXNoZXMuZm9yRWFjaCgobWVzaCkgPT4ge1xuICAgICAgICBpZiAoaXRlbS50eXBlID09PSAnZmlyc3RQZXJzb25Pbmx5Jykge1xuICAgICAgICAgIG1lc2gubGF5ZXJzLnNldCh0aGlzLl9maXJzdFBlcnNvbk9ubHlMYXllcik7XG4gICAgICAgICAgbWVzaC50cmF2ZXJzZSgoY2hpbGQpID0+IGNoaWxkLmxheWVycy5zZXQodGhpcy5fZmlyc3RQZXJzb25Pbmx5TGF5ZXIpKTtcbiAgICAgICAgfSBlbHNlIGlmIChpdGVtLnR5cGUgPT09ICd0aGlyZFBlcnNvbk9ubHknKSB7XG4gICAgICAgICAgbWVzaC5sYXllcnMuc2V0KHRoaXMuX3RoaXJkUGVyc29uT25seUxheWVyKTtcbiAgICAgICAgICBtZXNoLnRyYXZlcnNlKChjaGlsZCkgPT4gY2hpbGQubGF5ZXJzLnNldCh0aGlzLl90aGlyZFBlcnNvbk9ubHlMYXllcikpO1xuICAgICAgICB9IGVsc2UgaWYgKGl0ZW0udHlwZSA9PT0gJ2F1dG8nKSB7XG4gICAgICAgICAgdGhpcy5fY3JlYXRlSGVhZGxlc3NNb2RlbChtZXNoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9pbml0aWFsaXplZExheWVycyA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIF9leGNsdWRlVHJpYW5nbGVzKHRyaWFuZ2xlczogbnVtYmVyW10sIGJ3czogbnVtYmVyW11bXSwgc2tpbkluZGV4OiBudW1iZXJbXVtdLCBleGNsdWRlOiBudW1iZXJbXSk6IG51bWJlciB7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBpZiAoYndzICE9IG51bGwgJiYgYndzLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJpYW5nbGVzLmxlbmd0aDsgaSArPSAzKSB7XG4gICAgICAgIGNvbnN0IGEgPSB0cmlhbmdsZXNbaV07XG4gICAgICAgIGNvbnN0IGIgPSB0cmlhbmdsZXNbaSArIDFdO1xuICAgICAgICBjb25zdCBjID0gdHJpYW5nbGVzW2kgKyAyXTtcbiAgICAgICAgY29uc3QgYncwID0gYndzW2FdO1xuICAgICAgICBjb25zdCBza2luMCA9IHNraW5JbmRleFthXTtcblxuICAgICAgICBpZiAoYncwWzBdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4wWzBdKSkgY29udGludWU7XG4gICAgICAgIGlmIChidzBbMV0gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjBbMV0pKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJ3MFsyXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMFsyXSkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoYncwWzNdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4wWzNdKSkgY29udGludWU7XG5cbiAgICAgICAgY29uc3QgYncxID0gYndzW2JdO1xuICAgICAgICBjb25zdCBza2luMSA9IHNraW5JbmRleFtiXTtcbiAgICAgICAgaWYgKGJ3MVswXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMVswXSkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoYncxWzFdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4xWzFdKSkgY29udGludWU7XG4gICAgICAgIGlmIChidzFbMl0gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjFbMl0pKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJ3MVszXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMVszXSkpIGNvbnRpbnVlO1xuXG4gICAgICAgIGNvbnN0IGJ3MiA9IGJ3c1tjXTtcbiAgICAgICAgY29uc3Qgc2tpbjIgPSBza2luSW5kZXhbY107XG4gICAgICAgIGlmIChidzJbMF0gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjJbMF0pKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJ3MlsxXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMlsxXSkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoYncyWzJdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4yWzJdKSkgY29udGludWU7XG4gICAgICAgIGlmIChidzJbM10gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjJbM10pKSBjb250aW51ZTtcblxuICAgICAgICB0cmlhbmdsZXNbY291bnQrK10gPSBhO1xuICAgICAgICB0cmlhbmdsZXNbY291bnQrK10gPSBiO1xuICAgICAgICB0cmlhbmdsZXNbY291bnQrK10gPSBjO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY291bnQ7XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVFcmFzZWRNZXNoKHNyYzogVEhSRUUuU2tpbm5lZE1lc2gsIGVyYXNpbmdCb25lc0luZGV4OiBudW1iZXJbXSk6IFRIUkVFLlNraW5uZWRNZXNoIHtcbiAgICBjb25zdCBkc3QgPSBuZXcgVEhSRUUuU2tpbm5lZE1lc2goc3JjLmdlb21ldHJ5LmNsb25lKCksIHNyYy5tYXRlcmlhbCk7XG4gICAgZHN0Lm5hbWUgPSBgJHtzcmMubmFtZX0oZXJhc2UpYDtcbiAgICBkc3QuZnJ1c3R1bUN1bGxlZCA9IHNyYy5mcnVzdHVtQ3VsbGVkO1xuICAgIGRzdC5sYXllcnMuc2V0KHRoaXMuX2ZpcnN0UGVyc29uT25seUxheWVyKTtcblxuICAgIGNvbnN0IGdlb21ldHJ5ID0gZHN0Lmdlb21ldHJ5O1xuXG4gICAgY29uc3Qgc2tpbkluZGV4QXR0ciA9IGdlb21ldHJ5LmdldEF0dHJpYnV0ZSgnc2tpbkluZGV4Jyk7XG4gICAgY29uc3Qgc2tpbkluZGV4QXR0ckFycmF5ID0gc2tpbkluZGV4QXR0ciBpbnN0YW5jZW9mIFRIUkVFLkdMQnVmZmVyQXR0cmlidXRlID8gW10gOiBza2luSW5kZXhBdHRyLmFycmF5O1xuICAgIGNvbnN0IHNraW5JbmRleCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2tpbkluZGV4QXR0ckFycmF5Lmxlbmd0aDsgaSArPSA0KSB7XG4gICAgICBza2luSW5kZXgucHVzaChbXG4gICAgICAgIHNraW5JbmRleEF0dHJBcnJheVtpXSxcbiAgICAgICAgc2tpbkluZGV4QXR0ckFycmF5W2kgKyAxXSxcbiAgICAgICAgc2tpbkluZGV4QXR0ckFycmF5W2kgKyAyXSxcbiAgICAgICAgc2tpbkluZGV4QXR0ckFycmF5W2kgKyAzXSxcbiAgICAgIF0pO1xuICAgIH1cblxuICAgIGNvbnN0IHNraW5XZWlnaHRBdHRyID0gZ2VvbWV0cnkuZ2V0QXR0cmlidXRlKCdza2luV2VpZ2h0Jyk7XG4gICAgY29uc3Qgc2tpbldlaWdodEF0dHJBcnJheSA9IHNraW5XZWlnaHRBdHRyIGluc3RhbmNlb2YgVEhSRUUuR0xCdWZmZXJBdHRyaWJ1dGUgPyBbXSA6IHNraW5XZWlnaHRBdHRyLmFycmF5O1xuICAgIGNvbnN0IHNraW5XZWlnaHQgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNraW5XZWlnaHRBdHRyQXJyYXkubGVuZ3RoOyBpICs9IDQpIHtcbiAgICAgIHNraW5XZWlnaHQucHVzaChbXG4gICAgICAgIHNraW5XZWlnaHRBdHRyQXJyYXlbaV0sXG4gICAgICAgIHNraW5XZWlnaHRBdHRyQXJyYXlbaSArIDFdLFxuICAgICAgICBza2luV2VpZ2h0QXR0ckFycmF5W2kgKyAyXSxcbiAgICAgICAgc2tpbldlaWdodEF0dHJBcnJheVtpICsgM10sXG4gICAgICBdKTtcbiAgICB9XG5cbiAgICBjb25zdCBpbmRleCA9IGdlb21ldHJ5LmdldEluZGV4KCk7XG4gICAgaWYgKCFpbmRleCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIGdlb21ldHJ5IGRvZXNuJ3QgaGF2ZSBhbiBpbmRleCBidWZmZXJcIik7XG4gICAgfVxuICAgIGNvbnN0IG9sZFRyaWFuZ2xlcyA9IEFycmF5LmZyb20oaW5kZXguYXJyYXkpO1xuXG4gICAgY29uc3QgY291bnQgPSB0aGlzLl9leGNsdWRlVHJpYW5nbGVzKG9sZFRyaWFuZ2xlcywgc2tpbldlaWdodCwgc2tpbkluZGV4LCBlcmFzaW5nQm9uZXNJbmRleCk7XG4gICAgY29uc3QgbmV3VHJpYW5nbGU6IG51bWJlcltdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICBuZXdUcmlhbmdsZVtpXSA9IG9sZFRyaWFuZ2xlc1tpXTtcbiAgICB9XG4gICAgZ2VvbWV0cnkuc2V0SW5kZXgobmV3VHJpYW5nbGUpO1xuXG4gICAgLy8gbXRvb24gbWF0ZXJpYWwgaW5jbHVkZXMgb25CZWZvcmVSZW5kZXIuIHRoaXMgaXMgdW5zdXBwb3J0ZWQgYXQgU2tpbm5lZE1lc2gjY2xvbmVcbiAgICBpZiAoc3JjLm9uQmVmb3JlUmVuZGVyKSB7XG4gICAgICBkc3Qub25CZWZvcmVSZW5kZXIgPSBzcmMub25CZWZvcmVSZW5kZXI7XG4gICAgfVxuICAgIGRzdC5iaW5kKG5ldyBUSFJFRS5Ta2VsZXRvbihzcmMuc2tlbGV0b24uYm9uZXMsIHNyYy5za2VsZXRvbi5ib25lSW52ZXJzZXMpLCBuZXcgVEhSRUUuTWF0cml4NCgpKTtcbiAgICByZXR1cm4gZHN0O1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlSGVhZGxlc3NNb2RlbEZvclNraW5uZWRNZXNoKHBhcmVudDogVEhSRUUuT2JqZWN0M0QsIG1lc2g6IFRIUkVFLlNraW5uZWRNZXNoKTogdm9pZCB7XG4gICAgY29uc3QgZXJhc2VCb25lSW5kZXhlczogbnVtYmVyW10gPSBbXTtcbiAgICBtZXNoLnNrZWxldG9uLmJvbmVzLmZvckVhY2goKGJvbmUsIGluZGV4KSA9PiB7XG4gICAgICBpZiAodGhpcy5faXNFcmFzZVRhcmdldChib25lKSkgZXJhc2VCb25lSW5kZXhlcy5wdXNoKGluZGV4KTtcbiAgICB9KTtcblxuICAgIC8vIFVubGlrZSBVbmlWUk0gd2UgZG9uJ3QgY29weSBtZXNoIGlmIG5vIGludmlzaWJsZSBib25lIHdhcyBmb3VuZFxuICAgIGlmICghZXJhc2VCb25lSW5kZXhlcy5sZW5ndGgpIHtcbiAgICAgIG1lc2gubGF5ZXJzLmVuYWJsZSh0aGlzLl90aGlyZFBlcnNvbk9ubHlMYXllcik7XG4gICAgICBtZXNoLmxheWVycy5lbmFibGUodGhpcy5fZmlyc3RQZXJzb25Pbmx5TGF5ZXIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBtZXNoLmxheWVycy5zZXQodGhpcy5fdGhpcmRQZXJzb25Pbmx5TGF5ZXIpO1xuICAgIGNvbnN0IG5ld01lc2ggPSB0aGlzLl9jcmVhdGVFcmFzZWRNZXNoKG1lc2gsIGVyYXNlQm9uZUluZGV4ZXMpO1xuICAgIHBhcmVudC5hZGQobmV3TWVzaCk7XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVIZWFkbGVzc01vZGVsKG5vZGU6IFRIUkVFLk9iamVjdDNEKTogdm9pZCB7XG4gICAgaWYgKG5vZGUudHlwZSA9PT0gJ0dyb3VwJykge1xuICAgICAgbm9kZS5sYXllcnMuc2V0KHRoaXMuX3RoaXJkUGVyc29uT25seUxheWVyKTtcbiAgICAgIGlmICh0aGlzLl9pc0VyYXNlVGFyZ2V0KG5vZGUpKSB7XG4gICAgICAgIG5vZGUudHJhdmVyc2UoKGNoaWxkKSA9PiBjaGlsZC5sYXllcnMuc2V0KHRoaXMuX3RoaXJkUGVyc29uT25seUxheWVyKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBwYXJlbnQgPSBuZXcgVEhSRUUuR3JvdXAoKTtcbiAgICAgICAgcGFyZW50Lm5hbWUgPSBgX2hlYWRsZXNzXyR7bm9kZS5uYW1lfWA7XG4gICAgICAgIHBhcmVudC5sYXllcnMuc2V0KHRoaXMuX2ZpcnN0UGVyc29uT25seUxheWVyKTtcbiAgICAgICAgbm9kZS5wYXJlbnQhLmFkZChwYXJlbnQpO1xuICAgICAgICBub2RlLmNoaWxkcmVuXG4gICAgICAgICAgLmZpbHRlcigoY2hpbGQpID0+IGNoaWxkLnR5cGUgPT09ICdTa2lubmVkTWVzaCcpXG4gICAgICAgICAgLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBza2lubmVkTWVzaCA9IGNoaWxkIGFzIFRIUkVFLlNraW5uZWRNZXNoO1xuICAgICAgICAgICAgdGhpcy5fY3JlYXRlSGVhZGxlc3NNb2RlbEZvclNraW5uZWRNZXNoKHBhcmVudCwgc2tpbm5lZE1lc2gpO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobm9kZS50eXBlID09PSAnU2tpbm5lZE1lc2gnKSB7XG4gICAgICBjb25zdCBza2lubmVkTWVzaCA9IG5vZGUgYXMgVEhSRUUuU2tpbm5lZE1lc2g7XG4gICAgICB0aGlzLl9jcmVhdGVIZWFkbGVzc01vZGVsRm9yU2tpbm5lZE1lc2gobm9kZS5wYXJlbnQhLCBza2lubmVkTWVzaCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLl9pc0VyYXNlVGFyZ2V0KG5vZGUpKSB7XG4gICAgICAgIG5vZGUubGF5ZXJzLnNldCh0aGlzLl90aGlyZFBlcnNvbk9ubHlMYXllcik7XG4gICAgICAgIG5vZGUudHJhdmVyc2UoKGNoaWxkKSA9PiBjaGlsZC5sYXllcnMuc2V0KHRoaXMuX3RoaXJkUGVyc29uT25seUxheWVyKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaXNFcmFzZVRhcmdldChib25lOiBUSFJFRS5PYmplY3QzRCk6IGJvb2xlYW4ge1xuICAgIGlmIChib25lID09PSB0aGlzLmh1bWFub2lkLmdldFJhd0JvbmVOb2RlKCdoZWFkJykpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSBpZiAoIWJvbmUucGFyZW50KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLl9pc0VyYXNlVGFyZ2V0KGJvbmUucGFyZW50KTtcbiAgICB9XG4gIH1cbn1cbiIsICJpbXBvcnQgdHlwZSAqIGFzIFYwVlJNIGZyb20gJ0BwaXhpdi90eXBlcy12cm0tMC4wJztcbmltcG9ydCB0eXBlICogYXMgVjFWUk1TY2hlbWEgZnJvbSAnQHBpeGl2L3R5cGVzLXZybWMtdnJtLTEuMCc7XG5pbXBvcnQgdHlwZSB7IEdMVEYsIEdMVEZMb2FkZXJQbHVnaW4sIEdMVEZQYXJzZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyLmpzJztcbmltcG9ydCB0eXBlIHsgVlJNSHVtYW5vaWQgfSBmcm9tICcuLi9odW1hbm9pZC9WUk1IdW1hbm9pZCc7XG5pbXBvcnQgeyBnbHRmRXh0cmFjdFByaW1pdGl2ZXNGcm9tTm9kZXMgfSBmcm9tICcuLi91dGlscy9nbHRmRXh0cmFjdFByaW1pdGl2ZXNGcm9tTm9kZSc7XG5pbXBvcnQgeyBWUk1GaXJzdFBlcnNvbiB9IGZyb20gJy4vVlJNRmlyc3RQZXJzb24nO1xuaW1wb3J0IHR5cGUgeyBWUk1GaXJzdFBlcnNvbk1lc2hBbm5vdGF0aW9uIH0gZnJvbSAnLi9WUk1GaXJzdFBlcnNvbk1lc2hBbm5vdGF0aW9uJztcbmltcG9ydCB0eXBlIHsgVlJNRmlyc3RQZXJzb25NZXNoQW5ub3RhdGlvblR5cGUgfSBmcm9tICcuL1ZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb25UeXBlJztcbmltcG9ydCB7IEdMVEYgYXMgR0xURlNjaGVtYSB9IGZyb20gJ0BnbHRmLXRyYW5zZm9ybS9jb3JlJztcblxuLyoqXG4gKiBQb3NzaWJsZSBzcGVjIHZlcnNpb25zIGl0IHJlY29nbml6ZXMuXG4gKi9cbmNvbnN0IFBPU1NJQkxFX1NQRUNfVkVSU0lPTlMgPSBuZXcgU2V0KFsnMS4wJywgJzEuMC1iZXRhJ10pO1xuXG4vKipcbiAqIEEgcGx1Z2luIG9mIEdMVEZMb2FkZXIgdGhhdCBpbXBvcnRzIGEge0BsaW5rIFZSTUZpcnN0UGVyc29ufSBmcm9tIGEgVlJNIGV4dGVuc2lvbiBvZiBhIEdMVEYuXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1GaXJzdFBlcnNvbkxvYWRlclBsdWdpbiBpbXBsZW1lbnRzIEdMVEZMb2FkZXJQbHVnaW4ge1xuICBwdWJsaWMgcmVhZG9ubHkgcGFyc2VyOiBHTFRGUGFyc2VyO1xuXG4gIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xuICAgIC8vIFdlIHNob3VsZCB1c2UgdGhlIGV4dGVuc2lvbiBuYW1lIGluc3RlYWQgYnV0IHdlIGhhdmUgbXVsdGlwbGUgcGx1Z2lucyBmb3IgYW4gZXh0ZW5zaW9uLi4uXG4gICAgcmV0dXJuICdWUk1GaXJzdFBlcnNvbkxvYWRlclBsdWdpbic7XG4gIH1cblxuICBwdWJsaWMgY29uc3RydWN0b3IocGFyc2VyOiBHTFRGUGFyc2VyKSB7XG4gICAgdGhpcy5wYXJzZXIgPSBwYXJzZXI7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgYWZ0ZXJSb290KGdsdGY6IEdMVEYpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB2cm1IdW1hbm9pZCA9IGdsdGYudXNlckRhdGEudnJtSHVtYW5vaWQgYXMgVlJNSHVtYW5vaWQgfCB1bmRlZmluZWQ7XG5cbiAgICAvLyBleHBsaWNpdGx5IGRpc3Rpbmd1aXNoIG51bGwgYW5kIHVuZGVmaW5lZFxuICAgIC8vIHNpbmNlIHZybUh1bWFub2lkIG1pZ2h0IGJlIG51bGwgYXMgYSByZXN1bHRcbiAgICBpZiAodnJtSHVtYW5vaWQgPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKHZybUh1bWFub2lkID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1ZSTUZpcnN0UGVyc29uTG9hZGVyUGx1Z2luOiB2cm1IdW1hbm9pZCBpcyB1bmRlZmluZWQuIFZSTUh1bWFub2lkTG9hZGVyUGx1Z2luIGhhdmUgdG8gYmUgdXNlZCBmaXJzdCcsXG4gICAgICApO1xuICAgIH1cblxuICAgIGdsdGYudXNlckRhdGEudnJtRmlyc3RQZXJzb24gPSBhd2FpdCB0aGlzLl9pbXBvcnQoZ2x0ZiwgdnJtSHVtYW5vaWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEltcG9ydCBhIHtAbGluayBWUk1GaXJzdFBlcnNvbn0gZnJvbSBhIFZSTS5cbiAgICpcbiAgICogQHBhcmFtIGdsdGYgQSBwYXJzZWQgcmVzdWx0IG9mIEdMVEYgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gICAqIEBwYXJhbSBodW1hbm9pZCBBIHtAbGluayBWUk1IdW1hbm9pZH0gaW5zdGFuY2UgdGhhdCByZXByZXNlbnRzIHRoZSBWUk1cbiAgICovXG5cbiAgcHJpdmF0ZSBhc3luYyBfaW1wb3J0KGdsdGY6IEdMVEYsIGh1bWFub2lkOiBWUk1IdW1hbm9pZCB8IG51bGwpOiBQcm9taXNlPFZSTUZpcnN0UGVyc29uIHwgbnVsbD4ge1xuICAgIGlmIChodW1hbm9pZCA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCB2MVJlc3VsdCA9IGF3YWl0IHRoaXMuX3YxSW1wb3J0KGdsdGYsIGh1bWFub2lkKTtcbiAgICBpZiAodjFSZXN1bHQpIHtcbiAgICAgIHJldHVybiB2MVJlc3VsdDtcbiAgICB9XG5cbiAgICBjb25zdCB2MFJlc3VsdCA9IGF3YWl0IHRoaXMuX3YwSW1wb3J0KGdsdGYsIGh1bWFub2lkKTtcbiAgICBpZiAodjBSZXN1bHQpIHtcbiAgICAgIHJldHVybiB2MFJlc3VsdDtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX3YxSW1wb3J0KGdsdGY6IEdMVEYsIGh1bWFub2lkOiBWUk1IdW1hbm9pZCk6IFByb21pc2U8VlJNRmlyc3RQZXJzb24gfCBudWxsPiB7XG4gICAgY29uc3QganNvbiA9IHRoaXMucGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAgIC8vIGVhcmx5IGFib3J0IGlmIGl0IGRvZXNuJ3QgdXNlIHZybVxuICAgIGNvbnN0IGlzVlJNVXNlZCA9IGpzb24uZXh0ZW5zaW9uc1VzZWQ/LmluZGV4T2YoJ1ZSTUNfdnJtJykgIT09IC0xO1xuICAgIGlmICghaXNWUk1Vc2VkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBleHRlbnNpb24gPSBqc29uLmV4dGVuc2lvbnM/LlsnVlJNQ192cm0nXSBhcyBWMVZSTVNjaGVtYS5WUk1DVlJNIHwgdW5kZWZpbmVkO1xuICAgIGlmICghZXh0ZW5zaW9uKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzcGVjVmVyc2lvbiA9IGV4dGVuc2lvbi5zcGVjVmVyc2lvbjtcbiAgICBpZiAoIVBPU1NJQkxFX1NQRUNfVkVSU0lPTlMuaGFzKHNwZWNWZXJzaW9uKSkge1xuICAgICAgY29uc29sZS53YXJuKGBWUk1GaXJzdFBlcnNvbkxvYWRlclBsdWdpbjogVW5rbm93biBWUk1DX3ZybSBzcGVjVmVyc2lvbiBcIiR7c3BlY1ZlcnNpb259XCJgKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNjaGVtYUZpcnN0UGVyc29uID0gZXh0ZW5zaW9uLmZpcnN0UGVyc29uO1xuXG4gICAgY29uc3QgbWVzaEFubm90YXRpb25zOiBWUk1GaXJzdFBlcnNvbk1lc2hBbm5vdGF0aW9uW10gPSBbXTtcbiAgICBjb25zdCBub2RlUHJpbWl0aXZlc01hcCA9IGF3YWl0IGdsdGZFeHRyYWN0UHJpbWl0aXZlc0Zyb21Ob2RlcyhnbHRmKTtcbiAgICBBcnJheS5mcm9tKG5vZGVQcmltaXRpdmVzTWFwLmVudHJpZXMoKSkuZm9yRWFjaCgoW25vZGVJbmRleCwgcHJpbWl0aXZlc10pID0+IHtcbiAgICAgIGNvbnN0IGFubm90YXRpb24gPSBzY2hlbWFGaXJzdFBlcnNvbj8ubWVzaEFubm90YXRpb25zPy5maW5kKChhKSA9PiBhLm5vZGUgPT09IG5vZGVJbmRleCk7XG5cbiAgICAgIG1lc2hBbm5vdGF0aW9ucy5wdXNoKHtcbiAgICAgICAgbWVzaGVzOiBwcmltaXRpdmVzLFxuICAgICAgICB0eXBlOiBhbm5vdGF0aW9uPy50eXBlID8/ICdhdXRvJyxcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5ldyBWUk1GaXJzdFBlcnNvbihodW1hbm9pZCwgbWVzaEFubm90YXRpb25zKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX3YwSW1wb3J0KGdsdGY6IEdMVEYsIGh1bWFub2lkOiBWUk1IdW1hbm9pZCk6IFByb21pc2U8VlJNRmlyc3RQZXJzb24gfCBudWxsPiB7XG4gICAgY29uc3QganNvbiA9IHRoaXMucGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAgIGNvbnN0IHZybUV4dCA9IGpzb24uZXh0ZW5zaW9ucz8uVlJNIGFzIFYwVlJNLlZSTSB8IHVuZGVmaW5lZDtcbiAgICBpZiAoIXZybUV4dCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc2NoZW1hRmlyc3RQZXJzb246IFYwVlJNLkZpcnN0UGVyc29uIHwgdW5kZWZpbmVkID0gdnJtRXh0LmZpcnN0UGVyc29uO1xuICAgIGlmICghc2NoZW1hRmlyc3RQZXJzb24pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IG1lc2hBbm5vdGF0aW9uczogVlJNRmlyc3RQZXJzb25NZXNoQW5ub3RhdGlvbltdID0gW107XG4gICAgY29uc3Qgbm9kZVByaW1pdGl2ZXNNYXAgPSBhd2FpdCBnbHRmRXh0cmFjdFByaW1pdGl2ZXNGcm9tTm9kZXMoZ2x0Zik7XG5cbiAgICBBcnJheS5mcm9tKG5vZGVQcmltaXRpdmVzTWFwLmVudHJpZXMoKSkuZm9yRWFjaCgoW25vZGVJbmRleCwgcHJpbWl0aXZlc10pID0+IHtcbiAgICAgIGNvbnN0IHNjaGVtYU5vZGUgPSBqc29uLm5vZGVzIVtub2RlSW5kZXhdO1xuXG4gICAgICBjb25zdCBmbGFnID0gc2NoZW1hRmlyc3RQZXJzb24ubWVzaEFubm90YXRpb25zXG4gICAgICAgID8gc2NoZW1hRmlyc3RQZXJzb24ubWVzaEFubm90YXRpb25zLmZpbmQoKGEpID0+IGEubWVzaCA9PT0gc2NoZW1hTm9kZS5tZXNoKVxuICAgICAgICA6IHVuZGVmaW5lZDtcblxuICAgICAgbWVzaEFubm90YXRpb25zLnB1c2goe1xuICAgICAgICBtZXNoZXM6IHByaW1pdGl2ZXMsXG4gICAgICAgIHR5cGU6IHRoaXMuX2NvbnZlcnRWMEZsYWdUb1YxVHlwZShmbGFnPy5maXJzdFBlcnNvbkZsYWcpLFxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbmV3IFZSTUZpcnN0UGVyc29uKGh1bWFub2lkLCBtZXNoQW5ub3RhdGlvbnMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29udmVydFYwRmxhZ1RvVjFUeXBlKGZsYWc6IHN0cmluZyB8IHVuZGVmaW5lZCk6IFZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb25UeXBlIHtcbiAgICBpZiAoZmxhZyA9PT0gJ0ZpcnN0UGVyc29uT25seScpIHtcbiAgICAgIHJldHVybiAnZmlyc3RQZXJzb25Pbmx5JztcbiAgICB9IGVsc2UgaWYgKGZsYWcgPT09ICdUaGlyZFBlcnNvbk9ubHknKSB7XG4gICAgICByZXR1cm4gJ3RoaXJkUGVyc29uT25seSc7XG4gICAgfSBlbHNlIGlmIChmbGFnID09PSAnQm90aCcpIHtcbiAgICAgIHJldHVybiAnYm90aCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRoZSBkZWZhdWx0IHZhbHVlIGlzICdBdXRvJyBldmVuIGluIFZSTTBcbiAgICAgIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL3ZybS1jL1VuaVZSTS9ibG9iLzA3ZDk4ZTJmMWFiYzUyOGQzODdmODYwZDIyMjRkMDg1NWIwZDBiNTkvQXNzZXRzL1ZSTS9SdW50aW1lL0ZpcnN0UGVyc29uL1ZSTUZpcnN0UGVyc29uLmNzI0wxMTctTDExOVxuICAgICAgcmV0dXJuICdhdXRvJztcbiAgICB9XG4gIH1cbn1cbiIsICIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cblxuZXhwb3J0IGNvbnN0IFZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb25UeXBlID0ge1xuICBBdXRvOiAnYXV0bycsXG4gIEJvdGg6ICdib3RoJyxcbiAgVGhpcmRQZXJzb25Pbmx5OiAndGhpcmRQZXJzb25Pbmx5JyxcbiAgRmlyc3RQZXJzb25Pbmx5OiAnZmlyc3RQZXJzb25Pbmx5Jyxcbn0gYXMgY29uc3Q7XG5cbmV4cG9ydCB0eXBlIFZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb25UeXBlID1cbiAgKHR5cGVvZiBWUk1GaXJzdFBlcnNvbk1lc2hBbm5vdGF0aW9uVHlwZSlba2V5b2YgdHlwZW9mIFZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb25UeXBlXTtcbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1IdW1hbkJvbmUgfSBmcm9tICcuLi9WUk1IdW1hbkJvbmUnO1xuaW1wb3J0IHsgVlJNSHVtYW5vaWQgfSBmcm9tICcuLi9WUk1IdW1hbm9pZCc7XG5cbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3YzQiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfcXVhdEEgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXG5leHBvcnQgY2xhc3MgVlJNSHVtYW5vaWRIZWxwZXIgZXh0ZW5kcyBUSFJFRS5Hcm91cCB7XG4gIHB1YmxpYyByZWFkb25seSB2cm1IdW1hbm9pZDogVlJNSHVtYW5vaWQ7XG4gIHByaXZhdGUgX2JvbmVBeGVzTWFwOiBNYXA8VlJNSHVtYW5Cb25lLCBUSFJFRS5BeGVzSGVscGVyPjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoaHVtYW5vaWQ6IFZSTUh1bWFub2lkKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMudnJtSHVtYW5vaWQgPSBodW1hbm9pZDtcblxuICAgIHRoaXMuX2JvbmVBeGVzTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgT2JqZWN0LnZhbHVlcyhodW1hbm9pZC5odW1hbkJvbmVzKS5mb3JFYWNoKChib25lKSA9PiB7XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgVEhSRUUuQXhlc0hlbHBlcigxLjApO1xuXG4gICAgICBoZWxwZXIubWF0cml4QXV0b1VwZGF0ZSA9IGZhbHNlO1xuXG4gICAgICAoaGVscGVyLm1hdGVyaWFsIGFzIFRIUkVFLk1hdGVyaWFsKS5kZXB0aFRlc3QgPSBmYWxzZTtcbiAgICAgIChoZWxwZXIubWF0ZXJpYWwgYXMgVEhSRUUuTWF0ZXJpYWwpLmRlcHRoV3JpdGUgPSBmYWxzZTtcblxuICAgICAgdGhpcy5hZGQoaGVscGVyKTtcblxuICAgICAgdGhpcy5fYm9uZUF4ZXNNYXAuc2V0KGJvbmUsIGhlbHBlcik7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICBBcnJheS5mcm9tKHRoaXMuX2JvbmVBeGVzTWFwLnZhbHVlcygpKS5mb3JFYWNoKChheGVzKSA9PiB7XG4gICAgICBheGVzLmdlb21ldHJ5LmRpc3Bvc2UoKTtcbiAgICAgIChheGVzLm1hdGVyaWFsIGFzIFRIUkVFLk1hdGVyaWFsKS5kaXNwb3NlKCk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlTWF0cml4V29ybGQoZm9yY2U6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBBcnJheS5mcm9tKHRoaXMuX2JvbmVBeGVzTWFwLmVudHJpZXMoKSkuZm9yRWFjaCgoW2JvbmUsIGF4ZXNdKSA9PiB7XG4gICAgICBib25lLm5vZGUudXBkYXRlV29ybGRNYXRyaXgodHJ1ZSwgZmFsc2UpO1xuXG4gICAgICBib25lLm5vZGUubWF0cml4V29ybGQuZGVjb21wb3NlKF92M0EsIF9xdWF0QSwgX3YzQik7XG5cbiAgICAgIGNvbnN0IHNjYWxlID0gX3YzQS5zZXQoMC4xLCAwLjEsIDAuMSkuZGl2aWRlKF92M0IpO1xuICAgICAgYXhlcy5tYXRyaXguY29weShib25lLm5vZGUubWF0cml4V29ybGQpLnNjYWxlKHNjYWxlKTtcbiAgICB9KTtcblxuICAgIHN1cGVyLnVwZGF0ZU1hdHJpeFdvcmxkKGZvcmNlKTtcbiAgfVxufVxuIiwgIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiAqL1xuXG5pbXBvcnQgeyBWUk1IdW1hbkJvbmVOYW1lIH0gZnJvbSAnLi9WUk1IdW1hbkJvbmVOYW1lJztcblxuLyoqXG4gKiBUaGUgbGlzdCBvZiB7QGxpbmsgVlJNSHVtYW5Cb25lTmFtZX0uIERlcGVuZGVuY3kgYXdhcmUuXG4gKi9cbmV4cG9ydCBjb25zdCBWUk1IdW1hbkJvbmVMaXN0OiBWUk1IdW1hbkJvbmVOYW1lW10gPSBbXG4gICdoaXBzJyxcbiAgJ3NwaW5lJyxcbiAgJ2NoZXN0JyxcbiAgJ3VwcGVyQ2hlc3QnLFxuICAnbmVjaycsXG5cbiAgJ2hlYWQnLFxuICAnbGVmdEV5ZScsXG4gICdyaWdodEV5ZScsXG4gICdqYXcnLFxuXG4gICdsZWZ0VXBwZXJMZWcnLFxuICAnbGVmdExvd2VyTGVnJyxcbiAgJ2xlZnRGb290JyxcbiAgJ2xlZnRUb2VzJyxcblxuICAncmlnaHRVcHBlckxlZycsXG4gICdyaWdodExvd2VyTGVnJyxcbiAgJ3JpZ2h0Rm9vdCcsXG4gICdyaWdodFRvZXMnLFxuXG4gICdsZWZ0U2hvdWxkZXInLFxuICAnbGVmdFVwcGVyQXJtJyxcbiAgJ2xlZnRMb3dlckFybScsXG4gICdsZWZ0SGFuZCcsXG5cbiAgJ3JpZ2h0U2hvdWxkZXInLFxuICAncmlnaHRVcHBlckFybScsXG4gICdyaWdodExvd2VyQXJtJyxcbiAgJ3JpZ2h0SGFuZCcsXG5cbiAgJ2xlZnRUaHVtYk1ldGFjYXJwYWwnLFxuICAnbGVmdFRodW1iUHJveGltYWwnLFxuICAnbGVmdFRodW1iRGlzdGFsJyxcbiAgJ2xlZnRJbmRleFByb3hpbWFsJyxcbiAgJ2xlZnRJbmRleEludGVybWVkaWF0ZScsXG4gICdsZWZ0SW5kZXhEaXN0YWwnLFxuICAnbGVmdE1pZGRsZVByb3hpbWFsJyxcbiAgJ2xlZnRNaWRkbGVJbnRlcm1lZGlhdGUnLFxuICAnbGVmdE1pZGRsZURpc3RhbCcsXG4gICdsZWZ0UmluZ1Byb3hpbWFsJyxcbiAgJ2xlZnRSaW5nSW50ZXJtZWRpYXRlJyxcbiAgJ2xlZnRSaW5nRGlzdGFsJyxcbiAgJ2xlZnRMaXR0bGVQcm94aW1hbCcsXG4gICdsZWZ0TGl0dGxlSW50ZXJtZWRpYXRlJyxcbiAgJ2xlZnRMaXR0bGVEaXN0YWwnLFxuXG4gICdyaWdodFRodW1iTWV0YWNhcnBhbCcsXG4gICdyaWdodFRodW1iUHJveGltYWwnLFxuICAncmlnaHRUaHVtYkRpc3RhbCcsXG4gICdyaWdodEluZGV4UHJveGltYWwnLFxuICAncmlnaHRJbmRleEludGVybWVkaWF0ZScsXG4gICdyaWdodEluZGV4RGlzdGFsJyxcbiAgJ3JpZ2h0TWlkZGxlUHJveGltYWwnLFxuICAncmlnaHRNaWRkbGVJbnRlcm1lZGlhdGUnLFxuICAncmlnaHRNaWRkbGVEaXN0YWwnLFxuICAncmlnaHRSaW5nUHJveGltYWwnLFxuICAncmlnaHRSaW5nSW50ZXJtZWRpYXRlJyxcbiAgJ3JpZ2h0UmluZ0Rpc3RhbCcsXG4gICdyaWdodExpdHRsZVByb3hpbWFsJyxcbiAgJ3JpZ2h0TGl0dGxlSW50ZXJtZWRpYXRlJyxcbiAgJ3JpZ2h0TGl0dGxlRGlzdGFsJyxcbl07XG4iLCAiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uICovXG5cbi8qKlxuICogVGhlIG5hbWVzIG9mIHtAbGluayBWUk1IdW1hbm9pZH0gYm9uZSBuYW1lcy5cbiAqXG4gKiBSZWY6IGh0dHBzOi8vZ2l0aHViLmNvbS92cm0tYy92cm0tc3BlY2lmaWNhdGlvbi9ibG9iL21hc3Rlci9zcGVjaWZpY2F0aW9uL1ZSTUNfdnJtLTEuMC9odW1hbm9pZC5tZFxuICovXG5leHBvcnQgY29uc3QgVlJNSHVtYW5Cb25lTmFtZSA9IHtcbiAgSGlwczogJ2hpcHMnLFxuICBTcGluZTogJ3NwaW5lJyxcbiAgQ2hlc3Q6ICdjaGVzdCcsXG4gIFVwcGVyQ2hlc3Q6ICd1cHBlckNoZXN0JyxcbiAgTmVjazogJ25lY2snLFxuXG4gIEhlYWQ6ICdoZWFkJyxcbiAgTGVmdEV5ZTogJ2xlZnRFeWUnLFxuICBSaWdodEV5ZTogJ3JpZ2h0RXllJyxcbiAgSmF3OiAnamF3JyxcblxuICBMZWZ0VXBwZXJMZWc6ICdsZWZ0VXBwZXJMZWcnLFxuICBMZWZ0TG93ZXJMZWc6ICdsZWZ0TG93ZXJMZWcnLFxuICBMZWZ0Rm9vdDogJ2xlZnRGb290JyxcbiAgTGVmdFRvZXM6ICdsZWZ0VG9lcycsXG5cbiAgUmlnaHRVcHBlckxlZzogJ3JpZ2h0VXBwZXJMZWcnLFxuICBSaWdodExvd2VyTGVnOiAncmlnaHRMb3dlckxlZycsXG4gIFJpZ2h0Rm9vdDogJ3JpZ2h0Rm9vdCcsXG4gIFJpZ2h0VG9lczogJ3JpZ2h0VG9lcycsXG5cbiAgTGVmdFNob3VsZGVyOiAnbGVmdFNob3VsZGVyJyxcbiAgTGVmdFVwcGVyQXJtOiAnbGVmdFVwcGVyQXJtJyxcbiAgTGVmdExvd2VyQXJtOiAnbGVmdExvd2VyQXJtJyxcbiAgTGVmdEhhbmQ6ICdsZWZ0SGFuZCcsXG5cbiAgUmlnaHRTaG91bGRlcjogJ3JpZ2h0U2hvdWxkZXInLFxuICBSaWdodFVwcGVyQXJtOiAncmlnaHRVcHBlckFybScsXG4gIFJpZ2h0TG93ZXJBcm06ICdyaWdodExvd2VyQXJtJyxcbiAgUmlnaHRIYW5kOiAncmlnaHRIYW5kJyxcblxuICBMZWZ0VGh1bWJNZXRhY2FycGFsOiAnbGVmdFRodW1iTWV0YWNhcnBhbCcsXG4gIExlZnRUaHVtYlByb3hpbWFsOiAnbGVmdFRodW1iUHJveGltYWwnLFxuICBMZWZ0VGh1bWJEaXN0YWw6ICdsZWZ0VGh1bWJEaXN0YWwnLFxuICBMZWZ0SW5kZXhQcm94aW1hbDogJ2xlZnRJbmRleFByb3hpbWFsJyxcbiAgTGVmdEluZGV4SW50ZXJtZWRpYXRlOiAnbGVmdEluZGV4SW50ZXJtZWRpYXRlJyxcbiAgTGVmdEluZGV4RGlzdGFsOiAnbGVmdEluZGV4RGlzdGFsJyxcbiAgTGVmdE1pZGRsZVByb3hpbWFsOiAnbGVmdE1pZGRsZVByb3hpbWFsJyxcbiAgTGVmdE1pZGRsZUludGVybWVkaWF0ZTogJ2xlZnRNaWRkbGVJbnRlcm1lZGlhdGUnLFxuICBMZWZ0TWlkZGxlRGlzdGFsOiAnbGVmdE1pZGRsZURpc3RhbCcsXG4gIExlZnRSaW5nUHJveGltYWw6ICdsZWZ0UmluZ1Byb3hpbWFsJyxcbiAgTGVmdFJpbmdJbnRlcm1lZGlhdGU6ICdsZWZ0UmluZ0ludGVybWVkaWF0ZScsXG4gIExlZnRSaW5nRGlzdGFsOiAnbGVmdFJpbmdEaXN0YWwnLFxuICBMZWZ0TGl0dGxlUHJveGltYWw6ICdsZWZ0TGl0dGxlUHJveGltYWwnLFxuICBMZWZ0TGl0dGxlSW50ZXJtZWRpYXRlOiAnbGVmdExpdHRsZUludGVybWVkaWF0ZScsXG4gIExlZnRMaXR0bGVEaXN0YWw6ICdsZWZ0TGl0dGxlRGlzdGFsJyxcblxuICBSaWdodFRodW1iTWV0YWNhcnBhbDogJ3JpZ2h0VGh1bWJNZXRhY2FycGFsJyxcbiAgUmlnaHRUaHVtYlByb3hpbWFsOiAncmlnaHRUaHVtYlByb3hpbWFsJyxcbiAgUmlnaHRUaHVtYkRpc3RhbDogJ3JpZ2h0VGh1bWJEaXN0YWwnLFxuICBSaWdodEluZGV4UHJveGltYWw6ICdyaWdodEluZGV4UHJveGltYWwnLFxuICBSaWdodEluZGV4SW50ZXJtZWRpYXRlOiAncmlnaHRJbmRleEludGVybWVkaWF0ZScsXG4gIFJpZ2h0SW5kZXhEaXN0YWw6ICdyaWdodEluZGV4RGlzdGFsJyxcbiAgUmlnaHRNaWRkbGVQcm94aW1hbDogJ3JpZ2h0TWlkZGxlUHJveGltYWwnLFxuICBSaWdodE1pZGRsZUludGVybWVkaWF0ZTogJ3JpZ2h0TWlkZGxlSW50ZXJtZWRpYXRlJyxcbiAgUmlnaHRNaWRkbGVEaXN0YWw6ICdyaWdodE1pZGRsZURpc3RhbCcsXG4gIFJpZ2h0UmluZ1Byb3hpbWFsOiAncmlnaHRSaW5nUHJveGltYWwnLFxuICBSaWdodFJpbmdJbnRlcm1lZGlhdGU6ICdyaWdodFJpbmdJbnRlcm1lZGlhdGUnLFxuICBSaWdodFJpbmdEaXN0YWw6ICdyaWdodFJpbmdEaXN0YWwnLFxuICBSaWdodExpdHRsZVByb3hpbWFsOiAncmlnaHRMaXR0bGVQcm94aW1hbCcsXG4gIFJpZ2h0TGl0dGxlSW50ZXJtZWRpYXRlOiAncmlnaHRMaXR0bGVJbnRlcm1lZGlhdGUnLFxuICBSaWdodExpdHRsZURpc3RhbDogJ3JpZ2h0TGl0dGxlRGlzdGFsJyxcbn0gYXMgY29uc3Q7XG5cbmV4cG9ydCB0eXBlIFZSTUh1bWFuQm9uZU5hbWUgPSAodHlwZW9mIFZSTUh1bWFuQm9uZU5hbWUpW2tleW9mIHR5cGVvZiBWUk1IdW1hbkJvbmVOYW1lXTtcbiIsICIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cblxuaW1wb3J0IHsgVlJNSHVtYW5Cb25lTmFtZSB9IGZyb20gJy4vVlJNSHVtYW5Cb25lTmFtZSc7XG5cbi8qKlxuICogQW4gb2JqZWN0IHRoYXQgbWFwcyBmcm9tIHtAbGluayBWUk1IdW1hbkJvbmVOYW1lfSB0byBpdHMgcGFyZW50IHtAbGluayBWUk1IdW1hbkJvbmVOYW1lfS5cbiAqXG4gKiBSZWY6IGh0dHBzOi8vZ2l0aHViLmNvbS92cm0tYy92cm0tc3BlY2lmaWNhdGlvbi9ibG9iL21hc3Rlci9zcGVjaWZpY2F0aW9uL1ZSTUNfdnJtLTEuMC9odW1hbm9pZC5tZFxuICovXG5leHBvcnQgY29uc3QgVlJNSHVtYW5Cb25lUGFyZW50TWFwOiB7IFtib25lIGluIFZSTUh1bWFuQm9uZU5hbWVdOiBWUk1IdW1hbkJvbmVOYW1lIHwgbnVsbCB9ID0ge1xuICBoaXBzOiBudWxsLFxuICBzcGluZTogJ2hpcHMnLFxuICBjaGVzdDogJ3NwaW5lJyxcbiAgdXBwZXJDaGVzdDogJ2NoZXN0JyxcbiAgbmVjazogJ3VwcGVyQ2hlc3QnLFxuXG4gIGhlYWQ6ICduZWNrJyxcbiAgbGVmdEV5ZTogJ2hlYWQnLFxuICByaWdodEV5ZTogJ2hlYWQnLFxuICBqYXc6ICdoZWFkJyxcblxuICBsZWZ0VXBwZXJMZWc6ICdoaXBzJyxcbiAgbGVmdExvd2VyTGVnOiAnbGVmdFVwcGVyTGVnJyxcbiAgbGVmdEZvb3Q6ICdsZWZ0TG93ZXJMZWcnLFxuICBsZWZ0VG9lczogJ2xlZnRGb290JyxcblxuICByaWdodFVwcGVyTGVnOiAnaGlwcycsXG4gIHJpZ2h0TG93ZXJMZWc6ICdyaWdodFVwcGVyTGVnJyxcbiAgcmlnaHRGb290OiAncmlnaHRMb3dlckxlZycsXG4gIHJpZ2h0VG9lczogJ3JpZ2h0Rm9vdCcsXG5cbiAgbGVmdFNob3VsZGVyOiAndXBwZXJDaGVzdCcsXG4gIGxlZnRVcHBlckFybTogJ2xlZnRTaG91bGRlcicsXG4gIGxlZnRMb3dlckFybTogJ2xlZnRVcHBlckFybScsXG4gIGxlZnRIYW5kOiAnbGVmdExvd2VyQXJtJyxcblxuICByaWdodFNob3VsZGVyOiAndXBwZXJDaGVzdCcsXG4gIHJpZ2h0VXBwZXJBcm06ICdyaWdodFNob3VsZGVyJyxcbiAgcmlnaHRMb3dlckFybTogJ3JpZ2h0VXBwZXJBcm0nLFxuICByaWdodEhhbmQ6ICdyaWdodExvd2VyQXJtJyxcblxuICBsZWZ0VGh1bWJNZXRhY2FycGFsOiAnbGVmdEhhbmQnLFxuICBsZWZ0VGh1bWJQcm94aW1hbDogJ2xlZnRUaHVtYk1ldGFjYXJwYWwnLFxuICBsZWZ0VGh1bWJEaXN0YWw6ICdsZWZ0VGh1bWJQcm94aW1hbCcsXG4gIGxlZnRJbmRleFByb3hpbWFsOiAnbGVmdEhhbmQnLFxuICBsZWZ0SW5kZXhJbnRlcm1lZGlhdGU6ICdsZWZ0SW5kZXhQcm94aW1hbCcsXG4gIGxlZnRJbmRleERpc3RhbDogJ2xlZnRJbmRleEludGVybWVkaWF0ZScsXG4gIGxlZnRNaWRkbGVQcm94aW1hbDogJ2xlZnRIYW5kJyxcbiAgbGVmdE1pZGRsZUludGVybWVkaWF0ZTogJ2xlZnRNaWRkbGVQcm94aW1hbCcsXG4gIGxlZnRNaWRkbGVEaXN0YWw6ICdsZWZ0TWlkZGxlSW50ZXJtZWRpYXRlJyxcbiAgbGVmdFJpbmdQcm94aW1hbDogJ2xlZnRIYW5kJyxcbiAgbGVmdFJpbmdJbnRlcm1lZGlhdGU6ICdsZWZ0UmluZ1Byb3hpbWFsJyxcbiAgbGVmdFJpbmdEaXN0YWw6ICdsZWZ0UmluZ0ludGVybWVkaWF0ZScsXG4gIGxlZnRMaXR0bGVQcm94aW1hbDogJ2xlZnRIYW5kJyxcbiAgbGVmdExpdHRsZUludGVybWVkaWF0ZTogJ2xlZnRMaXR0bGVQcm94aW1hbCcsXG4gIGxlZnRMaXR0bGVEaXN0YWw6ICdsZWZ0TGl0dGxlSW50ZXJtZWRpYXRlJyxcblxuICByaWdodFRodW1iTWV0YWNhcnBhbDogJ3JpZ2h0SGFuZCcsXG4gIHJpZ2h0VGh1bWJQcm94aW1hbDogJ3JpZ2h0VGh1bWJNZXRhY2FycGFsJyxcbiAgcmlnaHRUaHVtYkRpc3RhbDogJ3JpZ2h0VGh1bWJQcm94aW1hbCcsXG4gIHJpZ2h0SW5kZXhQcm94aW1hbDogJ3JpZ2h0SGFuZCcsXG4gIHJpZ2h0SW5kZXhJbnRlcm1lZGlhdGU6ICdyaWdodEluZGV4UHJveGltYWwnLFxuICByaWdodEluZGV4RGlzdGFsOiAncmlnaHRJbmRleEludGVybWVkaWF0ZScsXG4gIHJpZ2h0TWlkZGxlUHJveGltYWw6ICdyaWdodEhhbmQnLFxuICByaWdodE1pZGRsZUludGVybWVkaWF0ZTogJ3JpZ2h0TWlkZGxlUHJveGltYWwnLFxuICByaWdodE1pZGRsZURpc3RhbDogJ3JpZ2h0TWlkZGxlSW50ZXJtZWRpYXRlJyxcbiAgcmlnaHRSaW5nUHJveGltYWw6ICdyaWdodEhhbmQnLFxuICByaWdodFJpbmdJbnRlcm1lZGlhdGU6ICdyaWdodFJpbmdQcm94aW1hbCcsXG4gIHJpZ2h0UmluZ0Rpc3RhbDogJ3JpZ2h0UmluZ0ludGVybWVkaWF0ZScsXG4gIHJpZ2h0TGl0dGxlUHJveGltYWw6ICdyaWdodEhhbmQnLFxuICByaWdodExpdHRsZUludGVybWVkaWF0ZTogJ3JpZ2h0TGl0dGxlUHJveGltYWwnLFxuICByaWdodExpdHRsZURpc3RhbDogJ3JpZ2h0TGl0dGxlSW50ZXJtZWRpYXRlJyxcbn07XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgcXVhdEludmVydENvbXBhdCB9IGZyb20gJy4uL3V0aWxzL3F1YXRJbnZlcnRDb21wYXQnO1xuaW1wb3J0IHR5cGUgeyBWUk1IdW1hbkJvbmUgfSBmcm9tICcuL1ZSTUh1bWFuQm9uZSc7XG5pbXBvcnQgdHlwZSB7IFZSTUh1bWFuQm9uZXMgfSBmcm9tICcuL1ZSTUh1bWFuQm9uZXMnO1xuaW1wb3J0IHR5cGUgeyBWUk1IdW1hbkJvbmVOYW1lIH0gZnJvbSAnLi9WUk1IdW1hbkJvbmVOYW1lJztcbmltcG9ydCB0eXBlIHsgVlJNUG9zZSB9IGZyb20gJy4vVlJNUG9zZSc7XG5cbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3F1YXRBID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblxuLyoqXG4gKiBBIGNsYXNzIHJlcHJlc2VudHMgdGhlIFJpZyBvZiBhIFZSTS5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTVJpZyB7XG4gIC8qKlxuICAgKiBBIHtAbGluayBWUk1IdW1hbkJvbmVzfSB0aGF0IGNvbnRhaW5zIGFsbCB0aGUgaHVtYW4gYm9uZXMgb2YgdGhlIFZSTS5cbiAgICogWW91IG1pZ2h0IHdhbnQgdG8gZ2V0IHRoZXNlIGJvbmVzIHVzaW5nIHtAbGluayBWUk1IdW1hbm9pZC5nZXRCb25lfS5cbiAgICovXG4gIHB1YmxpYyBodW1hbkJvbmVzOiBWUk1IdW1hbkJvbmVzO1xuXG4gIC8qKlxuICAgKiBBIHtAbGluayBWUk1Qb3NlfSB0aGF0IGlzIGl0cyBkZWZhdWx0IHN0YXRlLlxuICAgKiBOb3RlIHRoYXQgaXQncyBub3QgY29tcGF0aWJsZSB3aXRoIHtAbGluayBzZXRQb3NlfSBhbmQge0BsaW5rIGdldFBvc2V9LCBzaW5jZSBpdCBjb250YWlucyBub24tcmVsYXRpdmUgdmFsdWVzIG9mIGVhY2ggbG9jYWwgdHJhbnNmb3Jtcy5cbiAgICovXG4gIHB1YmxpYyByZXN0UG9zZTogVlJNUG9zZTtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IHtAbGluayBWUk1IdW1hbm9pZH0uXG4gICAqIEBwYXJhbSBodW1hbkJvbmVzIEEge0BsaW5rIFZSTUh1bWFuQm9uZXN9IGNvbnRhaW5zIGFsbCB0aGUgYm9uZXMgb2YgdGhlIG5ldyBodW1hbm9pZFxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKGh1bWFuQm9uZXM6IFZSTUh1bWFuQm9uZXMpIHtcbiAgICB0aGlzLmh1bWFuQm9uZXMgPSBodW1hbkJvbmVzO1xuXG4gICAgdGhpcy5yZXN0UG9zZSA9IHRoaXMuZ2V0QWJzb2x1dGVQb3NlKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBjdXJyZW50IGFic29sdXRlIHBvc2Ugb2YgdGhpcyBodW1hbm9pZCBhcyBhIHtAbGluayBWUk1Qb3NlfS5cbiAgICogTm90ZSB0aGF0IHRoZSBvdXRwdXQgcmVzdWx0IHdpbGwgY29udGFpbiBpbml0aWFsIHN0YXRlIG9mIHRoZSBWUk0gYW5kIG5vdCBjb21wYXRpYmxlIGJldHdlZW4gZGlmZmVyZW50IG1vZGVscy5cbiAgICogWW91IG1pZ2h0IHdhbnQgdG8gdXNlIHtAbGluayBnZXRQb3NlfSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIGdldEFic29sdXRlUG9zZSgpOiBWUk1Qb3NlIHtcbiAgICBjb25zdCBwb3NlID0ge30gYXMgVlJNUG9zZTtcblxuICAgIE9iamVjdC5rZXlzKHRoaXMuaHVtYW5Cb25lcykuZm9yRWFjaCgodnJtQm9uZU5hbWVTdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IHZybUJvbmVOYW1lID0gdnJtQm9uZU5hbWVTdHJpbmcgYXMgVlJNSHVtYW5Cb25lTmFtZTtcbiAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLmdldEJvbmVOb2RlKHZybUJvbmVOYW1lKTtcblxuICAgICAgLy8gSWdub3JlIHdoZW4gdGhlcmUgYXJlIG5vIGJvbmUgb24gdGhlIFZSTUh1bWFub2lkXG4gICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBHZXQgdGhlIHBvc2l0aW9uIC8gcm90YXRpb24gZnJvbSB0aGUgbm9kZVxuICAgICAgX3YzQS5jb3B5KG5vZGUucG9zaXRpb24pO1xuICAgICAgX3F1YXRBLmNvcHkobm9kZS5xdWF0ZXJuaW9uKTtcblxuICAgICAgLy8gQ29udmVydCB0byByYXcgYXJyYXlzXG4gICAgICBwb3NlW3ZybUJvbmVOYW1lXSA9IHtcbiAgICAgICAgcG9zaXRpb246IF92M0EudG9BcnJheSgpIGFzIFtudW1iZXIsIG51bWJlciwgbnVtYmVyXSxcbiAgICAgICAgcm90YXRpb246IF9xdWF0QS50b0FycmF5KCkgYXMgW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl0sXG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHBvc2U7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBjdXJyZW50IHBvc2Ugb2YgdGhpcyBodW1hbm9pZCBhcyBhIHtAbGluayBWUk1Qb3NlfS5cbiAgICpcbiAgICogRWFjaCB0cmFuc2Zvcm0gaXMgYSBsb2NhbCB0cmFuc2Zvcm0gcmVsYXRpdmUgZnJvbSByZXN0IHBvc2UgKFQtcG9zZSkuXG4gICAqL1xuICBwdWJsaWMgZ2V0UG9zZSgpOiBWUk1Qb3NlIHtcbiAgICBjb25zdCBwb3NlID0ge30gYXMgVlJNUG9zZTtcblxuICAgIE9iamVjdC5rZXlzKHRoaXMuaHVtYW5Cb25lcykuZm9yRWFjaCgoYm9uZU5hbWVTdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IGJvbmVOYW1lID0gYm9uZU5hbWVTdHJpbmcgYXMgVlJNSHVtYW5Cb25lTmFtZTtcbiAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLmdldEJvbmVOb2RlKGJvbmVOYW1lKTtcblxuICAgICAgLy8gSWdub3JlIHdoZW4gdGhlcmUgYXJlIG5vIGJvbmUgb24gdGhlIFZSTUh1bWFub2lkXG4gICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBUYWtlIGEgZGlmZiBmcm9tIHJlc3RQb3NlXG4gICAgICBfdjNBLnNldCgwLCAwLCAwKTtcbiAgICAgIF9xdWF0QS5pZGVudGl0eSgpO1xuXG4gICAgICBjb25zdCByZXN0U3RhdGUgPSB0aGlzLnJlc3RQb3NlW2JvbmVOYW1lXTtcbiAgICAgIGlmIChyZXN0U3RhdGU/LnBvc2l0aW9uKSB7XG4gICAgICAgIF92M0EuZnJvbUFycmF5KHJlc3RTdGF0ZS5wb3NpdGlvbikubmVnYXRlKCk7XG4gICAgICB9XG4gICAgICBpZiAocmVzdFN0YXRlPy5yb3RhdGlvbikge1xuICAgICAgICBxdWF0SW52ZXJ0Q29tcGF0KF9xdWF0QS5mcm9tQXJyYXkocmVzdFN0YXRlLnJvdGF0aW9uKSk7XG4gICAgICB9XG5cbiAgICAgIC8vIEdldCB0aGUgcG9zaXRpb24gLyByb3RhdGlvbiBmcm9tIHRoZSBub2RlXG4gICAgICBfdjNBLmFkZChub2RlLnBvc2l0aW9uKTtcbiAgICAgIF9xdWF0QS5wcmVtdWx0aXBseShub2RlLnF1YXRlcm5pb24pO1xuXG4gICAgICAvLyBDb252ZXJ0IHRvIHJhdyBhcnJheXNcbiAgICAgIHBvc2VbYm9uZU5hbWVdID0ge1xuICAgICAgICBwb3NpdGlvbjogX3YzQS50b0FycmF5KCkgYXMgW251bWJlciwgbnVtYmVyLCBudW1iZXJdLFxuICAgICAgICByb3RhdGlvbjogX3F1YXRBLnRvQXJyYXkoKSBhcyBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSxcbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcG9zZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMZXQgdGhlIGh1bWFub2lkIGRvIGEgc3BlY2lmaWVkIHBvc2UuXG4gICAqXG4gICAqIEVhY2ggdHJhbnNmb3JtIGhhdmUgdG8gYmUgYSBsb2NhbCB0cmFuc2Zvcm0gcmVsYXRpdmUgZnJvbSByZXN0IHBvc2UgKFQtcG9zZSkuXG4gICAqIFlvdSBjYW4gcGFzcyB3aGF0IHlvdSBnb3QgZnJvbSB7QGxpbmsgZ2V0UG9zZX0uXG4gICAqXG4gICAqIEBwYXJhbSBwb3NlT2JqZWN0IEEge0BsaW5rIFZSTVBvc2V9IHRoYXQgcmVwcmVzZW50cyBhIHNpbmdsZSBwb3NlXG4gICAqL1xuICBwdWJsaWMgc2V0UG9zZShwb3NlT2JqZWN0OiBWUk1Qb3NlKTogdm9pZCB7XG4gICAgT2JqZWN0LmVudHJpZXMocG9zZU9iamVjdCkuZm9yRWFjaCgoW2JvbmVOYW1lU3RyaW5nLCBzdGF0ZV0pID0+IHtcbiAgICAgIGNvbnN0IGJvbmVOYW1lID0gYm9uZU5hbWVTdHJpbmcgYXMgVlJNSHVtYW5Cb25lTmFtZTtcbiAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLmdldEJvbmVOb2RlKGJvbmVOYW1lKTtcblxuICAgICAgLy8gSWdub3JlIHdoZW4gdGhlcmUgYXJlIG5vIGJvbmUgdGhhdCBpcyBkZWZpbmVkIGluIHRoZSBwb3NlIG9uIHRoZSBWUk1IdW1hbm9pZFxuICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVzdFN0YXRlID0gdGhpcy5yZXN0UG9zZVtib25lTmFtZV07XG4gICAgICBpZiAoIXJlc3RTdGF0ZSkge1xuICAgICAgICAvLyBJdCdzIHZlcnkgdW5saWtlbHkuIFBvc3NpYmx5IGEgYnVnXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gQXBwbHkgdGhlIHN0YXRlIHRvIHRoZSBhY3R1YWwgYm9uZVxuICAgICAgaWYgKHN0YXRlPy5wb3NpdGlvbikge1xuICAgICAgICBub2RlLnBvc2l0aW9uLmZyb21BcnJheShzdGF0ZS5wb3NpdGlvbik7XG5cbiAgICAgICAgaWYgKHJlc3RTdGF0ZS5wb3NpdGlvbikge1xuICAgICAgICAgIG5vZGUucG9zaXRpb24uYWRkKF92M0EuZnJvbUFycmF5KHJlc3RTdGF0ZS5wb3NpdGlvbikpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZT8ucm90YXRpb24pIHtcbiAgICAgICAgbm9kZS5xdWF0ZXJuaW9uLmZyb21BcnJheShzdGF0ZS5yb3RhdGlvbik7XG5cbiAgICAgICAgaWYgKHJlc3RTdGF0ZS5yb3RhdGlvbikge1xuICAgICAgICAgIG5vZGUucXVhdGVybmlvbi5tdWx0aXBseShfcXVhdEEuZnJvbUFycmF5KHJlc3RTdGF0ZS5yb3RhdGlvbikpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhlIGh1bWFub2lkIHRvIGl0cyByZXN0IHBvc2UuXG4gICAqL1xuICBwdWJsaWMgcmVzZXRQb3NlKCk6IHZvaWQge1xuICAgIE9iamVjdC5lbnRyaWVzKHRoaXMucmVzdFBvc2UpLmZvckVhY2goKFtib25lTmFtZSwgcmVzdF0pID0+IHtcbiAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLmdldEJvbmVOb2RlKGJvbmVOYW1lIGFzIFZSTUh1bWFuQm9uZU5hbWUpO1xuXG4gICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVzdD8ucG9zaXRpb24pIHtcbiAgICAgICAgbm9kZS5wb3NpdGlvbi5mcm9tQXJyYXkocmVzdC5wb3NpdGlvbik7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZXN0Py5yb3RhdGlvbikge1xuICAgICAgICBub2RlLnF1YXRlcm5pb24uZnJvbUFycmF5KHJlc3Qucm90YXRpb24pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhIGJvbmUgYm91bmQgdG8gYSBzcGVjaWZpZWQge0BsaW5rIFZSTUh1bWFuQm9uZU5hbWV9LCBhcyBhIHtAbGluayBWUk1IdW1hbkJvbmV9LlxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBib25lIHlvdSB3YW50XG4gICAqL1xuICBwdWJsaWMgZ2V0Qm9uZShuYW1lOiBWUk1IdW1hbkJvbmVOYW1lKTogVlJNSHVtYW5Cb25lIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5odW1hbkJvbmVzW25hbWVdID8/IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYSBib25lIGJvdW5kIHRvIGEgc3BlY2lmaWVkIHtAbGluayBWUk1IdW1hbkJvbmVOYW1lfSwgYXMgYSBgVEhSRUUuT2JqZWN0M0RgLlxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBib25lIHlvdSB3YW50XG4gICAqL1xuICBwdWJsaWMgZ2V0Qm9uZU5vZGUobmFtZTogVlJNSHVtYW5Cb25lTmFtZSk6IFRIUkVFLk9iamVjdDNEIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuaHVtYW5Cb25lc1tuYW1lXT8ubm9kZSA/PyBudWxsO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIEEgY29tcGF0IGZ1bmN0aW9uIGZvciBgUXVhdGVybmlvbi5pbnZlcnQoKWAgLyBgUXVhdGVybmlvbi5pbnZlcnNlKClgLlxuICogYFF1YXRlcm5pb24uaW52ZXJ0KClgIGlzIGludHJvZHVjZWQgaW4gcjEyMyBhbmQgYFF1YXRlcm5pb24uaW52ZXJzZSgpYCBlbWl0cyBhIHdhcm5pbmcuXG4gKiBXZSBhcmUgZ29pbmcgdG8gdXNlIHRoaXMgY29tcGF0IGZvciBhIHdoaWxlLlxuICogQHBhcmFtIHRhcmdldCBBIHRhcmdldCBxdWF0ZXJuaW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBxdWF0SW52ZXJ0Q29tcGF0PFQgZXh0ZW5kcyBUSFJFRS5RdWF0ZXJuaW9uPih0YXJnZXQ6IFQpOiBUIHtcbiAgaWYgKCh0YXJnZXQgYXMgYW55KS5pbnZlcnQpIHtcbiAgICB0YXJnZXQuaW52ZXJ0KCk7XG4gIH0gZWxzZSB7XG4gICAgKHRhcmdldCBhcyBhbnkpLmludmVyc2UoKTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNSHVtYW5Cb25lTmFtZSwgVlJNSHVtYW5Cb25lcyB9IGZyb20gJy4nO1xuaW1wb3J0IHsgVlJNSHVtYW5Cb25lTGlzdCB9IGZyb20gJy4vVlJNSHVtYW5Cb25lTGlzdCc7XG5pbXBvcnQgeyBWUk1IdW1hbkJvbmVQYXJlbnRNYXAgfSBmcm9tICcuL1ZSTUh1bWFuQm9uZVBhcmVudE1hcCc7XG5pbXBvcnQgeyBWUk1SaWcgfSBmcm9tICcuL1ZSTVJpZyc7XG5cbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3F1YXRBID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbmNvbnN0IF9ib25lV29ybGRQb3MgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4vKipcbiAqIEEgY2xhc3MgcmVwcmVzZW50cyB0aGUgbm9ybWFsaXplZCBSaWcgb2YgYSBWUk0uXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1IdW1hbm9pZFJpZyBleHRlbmRzIFZSTVJpZyB7XG4gIHByb3RlY3RlZCBzdGF0aWMgX3NldHVwVHJhbnNmb3Jtcyhtb2RlbFJpZzogVlJNUmlnKToge1xuICAgIHJpZ0JvbmVzOiBWUk1IdW1hbkJvbmVzO1xuICAgIHJvb3Q6IFRIUkVFLk9iamVjdDNEO1xuICAgIHBhcmVudFdvcmxkUm90YXRpb25zOiB7IFtib25lTmFtZSBpbiBWUk1IdW1hbkJvbmVOYW1lXT86IFRIUkVFLlF1YXRlcm5pb24gfTtcbiAgICBib25lUm90YXRpb25zOiB7IFtib25lTmFtZSBpbiBWUk1IdW1hbkJvbmVOYW1lXT86IFRIUkVFLlF1YXRlcm5pb24gfTtcbiAgfSB7XG4gICAgY29uc3Qgcm9vdCA9IG5ldyBUSFJFRS5PYmplY3QzRCgpO1xuICAgIHJvb3QubmFtZSA9ICdWUk1IdW1hbm9pZFJpZyc7XG5cbiAgICAvLyBzdG9yZSBib25lV29ybGRQb3NpdGlvbnMsIGJvbmVXb3JsZFJvdGF0aW9ucywgYW5kIHBhcmVudFdvcmxkUm90YXRpb25zXG4gICAgY29uc3QgYm9uZVdvcmxkUG9zaXRpb25zOiB7IFtib25lTmFtZSBpbiBWUk1IdW1hbkJvbmVOYW1lXT86IFRIUkVFLlZlY3RvcjMgfSA9IHt9O1xuICAgIGNvbnN0IGJvbmVXb3JsZFJvdGF0aW9uczogeyBbYm9uZU5hbWUgaW4gVlJNSHVtYW5Cb25lTmFtZV0/OiBUSFJFRS5RdWF0ZXJuaW9uIH0gPSB7fTtcbiAgICBjb25zdCBib25lUm90YXRpb25zOiB7IFtib25lTmFtZSBpbiBWUk1IdW1hbkJvbmVOYW1lXT86IFRIUkVFLlF1YXRlcm5pb24gfSA9IHt9O1xuICAgIGNvbnN0IHBhcmVudFdvcmxkUm90YXRpb25zOiB7IFtib25lTmFtZSBpbiBWUk1IdW1hbkJvbmVOYW1lXT86IFRIUkVFLlF1YXRlcm5pb24gfSA9IHt9O1xuXG4gICAgVlJNSHVtYW5Cb25lTGlzdC5mb3JFYWNoKChib25lTmFtZSkgPT4ge1xuICAgICAgY29uc3QgYm9uZU5vZGUgPSBtb2RlbFJpZy5nZXRCb25lTm9kZShib25lTmFtZSk7XG5cbiAgICAgIGlmIChib25lTm9kZSkge1xuICAgICAgICBjb25zdCBib25lV29ybGRQb3NpdGlvbiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG4gICAgICAgIGNvbnN0IGJvbmVXb3JsZFJvdGF0aW9uID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblxuICAgICAgICBib25lTm9kZS51cGRhdGVXb3JsZE1hdHJpeCh0cnVlLCBmYWxzZSk7XG4gICAgICAgIGJvbmVOb2RlLm1hdHJpeFdvcmxkLmRlY29tcG9zZShib25lV29ybGRQb3NpdGlvbiwgYm9uZVdvcmxkUm90YXRpb24sIF92M0EpO1xuXG4gICAgICAgIGJvbmVXb3JsZFBvc2l0aW9uc1tib25lTmFtZV0gPSBib25lV29ybGRQb3NpdGlvbjtcbiAgICAgICAgYm9uZVdvcmxkUm90YXRpb25zW2JvbmVOYW1lXSA9IGJvbmVXb3JsZFJvdGF0aW9uO1xuICAgICAgICBib25lUm90YXRpb25zW2JvbmVOYW1lXSA9IGJvbmVOb2RlLnF1YXRlcm5pb24uY2xvbmUoKTtcblxuICAgICAgICBjb25zdCBwYXJlbnRXb3JsZFJvdGF0aW9uID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbiAgICAgICAgYm9uZU5vZGUucGFyZW50Py5tYXRyaXhXb3JsZC5kZWNvbXBvc2UoX3YzQSwgcGFyZW50V29ybGRSb3RhdGlvbiwgX3YzQSk7XG4gICAgICAgIHBhcmVudFdvcmxkUm90YXRpb25zW2JvbmVOYW1lXSA9IHBhcmVudFdvcmxkUm90YXRpb247XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBidWlsZCByaWcgaGllcmFyY2h5ICsgc3RvcmUgcGFyZW50V29ybGRSb3RhdGlvbnNcbiAgICBjb25zdCByaWdCb25lczogUGFydGlhbDxWUk1IdW1hbkJvbmVzPiA9IHt9O1xuICAgIFZSTUh1bWFuQm9uZUxpc3QuZm9yRWFjaCgoYm9uZU5hbWUpID0+IHtcbiAgICAgIGNvbnN0IGJvbmVOb2RlID0gbW9kZWxSaWcuZ2V0Qm9uZU5vZGUoYm9uZU5hbWUpO1xuXG4gICAgICBpZiAoYm9uZU5vZGUpIHtcbiAgICAgICAgY29uc3QgYm9uZVdvcmxkUG9zaXRpb24gPSBib25lV29ybGRQb3NpdGlvbnNbYm9uZU5hbWVdIGFzIFRIUkVFLlZlY3RvcjM7XG5cbiAgICAgICAgLy8gc2VlIHRoZSBuZWFyZXN0IHBhcmVudCBwb3NpdGlvblxuICAgICAgICBsZXQgY3VycmVudEJvbmVOYW1lOiBWUk1IdW1hbkJvbmVOYW1lIHwgbnVsbCA9IGJvbmVOYW1lO1xuICAgICAgICBsZXQgcGFyZW50Qm9uZVdvcmxkUG9zaXRpb246IFRIUkVFLlZlY3RvcjMgfCB1bmRlZmluZWQ7XG4gICAgICAgIHdoaWxlIChwYXJlbnRCb25lV29ybGRQb3NpdGlvbiA9PSBudWxsKSB7XG4gICAgICAgICAgY3VycmVudEJvbmVOYW1lID0gVlJNSHVtYW5Cb25lUGFyZW50TWFwW2N1cnJlbnRCb25lTmFtZV07XG4gICAgICAgICAgaWYgKGN1cnJlbnRCb25lTmFtZSA9PSBudWxsKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgcGFyZW50Qm9uZVdvcmxkUG9zaXRpb24gPSBib25lV29ybGRQb3NpdGlvbnNbY3VycmVudEJvbmVOYW1lXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFkZCB0byBoaWVyYXJjaHlcbiAgICAgICAgY29uc3QgcmlnQm9uZU5vZGUgPSBuZXcgVEhSRUUuT2JqZWN0M0QoKTtcbiAgICAgICAgcmlnQm9uZU5vZGUubmFtZSA9ICdOb3JtYWxpemVkXycgKyBib25lTm9kZS5uYW1lO1xuXG4gICAgICAgIGNvbnN0IHBhcmVudFJpZ0JvbmVOb2RlID0gKGN1cnJlbnRCb25lTmFtZSA/IHJpZ0JvbmVzW2N1cnJlbnRCb25lTmFtZV0/Lm5vZGUgOiByb290KSBhcyBUSFJFRS5PYmplY3QzRDtcblxuICAgICAgICBwYXJlbnRSaWdCb25lTm9kZS5hZGQocmlnQm9uZU5vZGUpO1xuICAgICAgICByaWdCb25lTm9kZS5wb3NpdGlvbi5jb3B5KGJvbmVXb3JsZFBvc2l0aW9uKTtcbiAgICAgICAgaWYgKHBhcmVudEJvbmVXb3JsZFBvc2l0aW9uKSB7XG4gICAgICAgICAgcmlnQm9uZU5vZGUucG9zaXRpb24uc3ViKHBhcmVudEJvbmVXb3JsZFBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJpZ0JvbmVzW2JvbmVOYW1lXSA9IHsgbm9kZTogcmlnQm9uZU5vZGUgfTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiB7XG4gICAgICByaWdCb25lczogcmlnQm9uZXMgYXMgVlJNSHVtYW5Cb25lcyxcbiAgICAgIHJvb3QsXG4gICAgICBwYXJlbnRXb3JsZFJvdGF0aW9ucyxcbiAgICAgIGJvbmVSb3RhdGlvbnMsXG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyByZWFkb25seSBvcmlnaW5hbDogVlJNUmlnO1xuICBwdWJsaWMgcmVhZG9ubHkgcm9vdDogVEhSRUUuT2JqZWN0M0Q7XG4gIHByb3RlY3RlZCByZWFkb25seSBfcGFyZW50V29ybGRSb3RhdGlvbnM6IHsgW2JvbmVOYW1lIGluIFZSTUh1bWFuQm9uZU5hbWVdPzogVEhSRUUuUXVhdGVybmlvbiB9O1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2JvbmVSb3RhdGlvbnM6IHsgW2JvbmVOYW1lIGluIFZSTUh1bWFuQm9uZU5hbWVdPzogVEhSRUUuUXVhdGVybmlvbiB9O1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihodW1hbm9pZDogVlJNUmlnKSB7XG4gICAgY29uc3QgeyByaWdCb25lcywgcm9vdCwgcGFyZW50V29ybGRSb3RhdGlvbnMsIGJvbmVSb3RhdGlvbnMgfSA9IFZSTUh1bWFub2lkUmlnLl9zZXR1cFRyYW5zZm9ybXMoaHVtYW5vaWQpO1xuXG4gICAgc3VwZXIocmlnQm9uZXMpO1xuXG4gICAgdGhpcy5vcmlnaW5hbCA9IGh1bWFub2lkO1xuICAgIHRoaXMucm9vdCA9IHJvb3Q7XG4gICAgdGhpcy5fcGFyZW50V29ybGRSb3RhdGlvbnMgPSBwYXJlbnRXb3JsZFJvdGF0aW9ucztcbiAgICB0aGlzLl9ib25lUm90YXRpb25zID0gYm9uZVJvdGF0aW9ucztcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhpcyBodW1hbm9pZCByaWcuXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIFZSTUh1bWFuQm9uZUxpc3QuZm9yRWFjaCgoYm9uZU5hbWUpID0+IHtcbiAgICAgIGNvbnN0IGJvbmVOb2RlID0gdGhpcy5vcmlnaW5hbC5nZXRCb25lTm9kZShib25lTmFtZSk7XG5cbiAgICAgIGlmIChib25lTm9kZSAhPSBudWxsKSB7XG4gICAgICAgIGNvbnN0IHJpZ0JvbmVOb2RlID0gdGhpcy5nZXRCb25lTm9kZShib25lTmFtZSkhO1xuICAgICAgICBjb25zdCBwYXJlbnRXb3JsZFJvdGF0aW9uID0gdGhpcy5fcGFyZW50V29ybGRSb3RhdGlvbnNbYm9uZU5hbWVdITtcbiAgICAgICAgY29uc3QgaW52UGFyZW50V29ybGRSb3RhdGlvbiA9IF9xdWF0QS5jb3B5KHBhcmVudFdvcmxkUm90YXRpb24pLmludmVydCgpO1xuICAgICAgICBjb25zdCBib25lUm90YXRpb24gPSB0aGlzLl9ib25lUm90YXRpb25zW2JvbmVOYW1lXSE7XG5cbiAgICAgICAgYm9uZU5vZGUucXVhdGVybmlvblxuICAgICAgICAgIC5jb3B5KHJpZ0JvbmVOb2RlLnF1YXRlcm5pb24pXG4gICAgICAgICAgLm11bHRpcGx5KHBhcmVudFdvcmxkUm90YXRpb24pXG4gICAgICAgICAgLnByZW11bHRpcGx5KGludlBhcmVudFdvcmxkUm90YXRpb24pXG4gICAgICAgICAgLm11bHRpcGx5KGJvbmVSb3RhdGlvbik7XG5cbiAgICAgICAgLy8gTW92ZSB0aGUgbWFzcyBjZW50ZXIgb2YgdGhlIFZSTVxuICAgICAgICBpZiAoYm9uZU5hbWUgPT09ICdoaXBzJykge1xuICAgICAgICAgIGNvbnN0IGJvbmVXb3JsZFBvc2l0aW9uID0gcmlnQm9uZU5vZGUuZ2V0V29ybGRQb3NpdGlvbihfYm9uZVdvcmxkUG9zKTtcbiAgICAgICAgICBib25lTm9kZS5wYXJlbnQhLnVwZGF0ZVdvcmxkTWF0cml4KHRydWUsIGZhbHNlKTtcbiAgICAgICAgICBjb25zdCBwYXJlbnRXb3JsZE1hdHJpeCA9IGJvbmVOb2RlLnBhcmVudCEubWF0cml4V29ybGQ7XG4gICAgICAgICAgY29uc3QgbG9jYWxQb3NpdGlvbiA9IGJvbmVXb3JsZFBvc2l0aW9uLmFwcGx5TWF0cml4NChwYXJlbnRXb3JsZE1hdHJpeC5pbnZlcnQoKSk7XG4gICAgICAgICAgYm9uZU5vZGUucG9zaXRpb24uY29weShsb2NhbFBvc2l0aW9uKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHR5cGUgeyBWUk1IdW1hbkJvbmUgfSBmcm9tICcuL1ZSTUh1bWFuQm9uZSc7XG5pbXBvcnQgdHlwZSB7IFZSTUh1bWFuQm9uZXMgfSBmcm9tICcuL1ZSTUh1bWFuQm9uZXMnO1xuaW1wb3J0IHR5cGUgeyBWUk1IdW1hbkJvbmVOYW1lIH0gZnJvbSAnLi9WUk1IdW1hbkJvbmVOYW1lJztcbmltcG9ydCB0eXBlIHsgVlJNUG9zZSB9IGZyb20gJy4vVlJNUG9zZSc7XG5pbXBvcnQgeyBWUk1SaWcgfSBmcm9tICcuL1ZSTVJpZyc7XG5pbXBvcnQgeyBWUk1IdW1hbm9pZFJpZyB9IGZyb20gJy4vVlJNSHVtYW5vaWRSaWcnO1xuXG4vKipcbiAqIEEgY2xhc3MgcmVwcmVzZW50cyBhIGh1bWFub2lkIG9mIGEgVlJNLlxuICovXG5leHBvcnQgY2xhc3MgVlJNSHVtYW5vaWQge1xuICAvKipcbiAgICogV2hldGhlciBpdCBjb3BpZXMgcG9zZSBmcm9tIG5vcm1hbGl6ZWRIdW1hbkJvbmVzIHRvIHJhd0h1bWFuQm9uZXMgb24ge0BsaW5rIHVwZGF0ZX0uXG4gICAqIGB0cnVlYCBieSBkZWZhdWx0LlxuICAgKlxuICAgKiBAZGVmYXVsdCB0cnVlXG4gICAqL1xuICBwdWJsaWMgYXV0b1VwZGF0ZUh1bWFuQm9uZXM6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEEgcmF3IHJpZyBvZiB0aGUgVlJNLlxuICAgKi9cbiAgcHJpdmF0ZSBfcmF3SHVtYW5Cb25lczogVlJNUmlnOyAvLyBUT0RPOiBSZW5hbWVcblxuICAvKipcbiAgICogQSBub3JtYWxpemVkIHJpZyBvZiB0aGUgVlJNLlxuICAgKi9cbiAgcHJpdmF0ZSBfbm9ybWFsaXplZEh1bWFuQm9uZXM6IFZSTUh1bWFub2lkUmlnOyAvLyBUT0RPOiBSZW5hbWVcblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgRGVwcmVjYXRlZC4gVXNlIGVpdGhlciB7QGxpbmsgcmF3UmVzdFBvc2V9IG9yIHtAbGluayBub3JtYWxpemVkUmVzdFBvc2V9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJlc3RQb3NlKCk6IFZSTVBvc2Uge1xuICAgIGNvbnNvbGUud2FybignVlJNSHVtYW5vaWQ6IHJlc3RQb3NlIGlzIGRlcHJlY2F0ZWQuIFVzZSBlaXRoZXIgcmF3UmVzdFBvc2Ugb3Igbm9ybWFsaXplZFJlc3RQb3NlIGluc3RlYWQuJyk7XG5cbiAgICByZXR1cm4gdGhpcy5yYXdSZXN0UG9zZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIHtAbGluayBWUk1Qb3NlfSBvZiBpdHMgcmF3IGh1bWFuIGJvbmVzIHRoYXQgaXMgaXRzIGRlZmF1bHQgc3RhdGUuXG4gICAqIE5vdGUgdGhhdCBpdCdzIG5vdCBjb21wYXRpYmxlIHdpdGgge0BsaW5rIHNldFJhd1Bvc2V9IGFuZCB7QGxpbmsgZ2V0UmF3UG9zZX0sIHNpbmNlIGl0IGNvbnRhaW5zIG5vbi1yZWxhdGl2ZSB2YWx1ZXMgb2YgZWFjaCBsb2NhbCB0cmFuc2Zvcm1zLlxuICAgKi9cbiAgcHVibGljIGdldCByYXdSZXN0UG9zZSgpOiBWUk1Qb3NlIHtcbiAgICByZXR1cm4gdGhpcy5fcmF3SHVtYW5Cb25lcy5yZXN0UG9zZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIHtAbGluayBWUk1Qb3NlfSBvZiBpdHMgbm9ybWFsaXplZCBodW1hbiBib25lcyB0aGF0IGlzIGl0cyBkZWZhdWx0IHN0YXRlLlxuICAgKiBOb3RlIHRoYXQgaXQncyBub3QgY29tcGF0aWJsZSB3aXRoIHtAbGluayBzZXROb3JtYWxpemVkUG9zZX0gYW5kIHtAbGluayBnZXROb3JtYWxpemVkUG9zZX0sIHNpbmNlIGl0IGNvbnRhaW5zIG5vbi1yZWxhdGl2ZSB2YWx1ZXMgb2YgZWFjaCBsb2NhbCB0cmFuc2Zvcm1zLlxuICAgKi9cbiAgcHVibGljIGdldCBub3JtYWxpemVkUmVzdFBvc2UoKTogVlJNUG9zZSB7XG4gICAgcmV0dXJuIHRoaXMuX25vcm1hbGl6ZWRIdW1hbkJvbmVzLnJlc3RQb3NlO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgbWFwIGZyb20ge0BsaW5rIFZSTUh1bWFuQm9uZU5hbWV9IHRvIHJhdyB7QGxpbmsgVlJNSHVtYW5Cb25lfXMuXG4gICAqL1xuICBwdWJsaWMgZ2V0IGh1bWFuQm9uZXMoKTogVlJNSHVtYW5Cb25lcyB7XG4gICAgLy8gYW4gYWxpYXMgb2YgYHJhd0h1bWFuQm9uZXNgXG4gICAgcmV0dXJuIHRoaXMuX3Jhd0h1bWFuQm9uZXMuaHVtYW5Cb25lcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBIG1hcCBmcm9tIHtAbGluayBWUk1IdW1hbkJvbmVOYW1lfSB0byByYXcge0BsaW5rIFZSTUh1bWFuQm9uZX1zLlxuICAgKi9cbiAgcHVibGljIGdldCByYXdIdW1hbkJvbmVzKCk6IFZSTUh1bWFuQm9uZXMge1xuICAgIHJldHVybiB0aGlzLl9yYXdIdW1hbkJvbmVzLmh1bWFuQm9uZXM7XG4gIH1cblxuICAvKipcbiAgICogQSBtYXAgZnJvbSB7QGxpbmsgVlJNSHVtYW5Cb25lTmFtZX0gdG8gbm9ybWFsaXplZCB7QGxpbmsgVlJNSHVtYW5Cb25lfXMuXG4gICAqL1xuICBwdWJsaWMgZ2V0IG5vcm1hbGl6ZWRIdW1hbkJvbmVzKCk6IFZSTUh1bWFuQm9uZXMge1xuICAgIHJldHVybiB0aGlzLl9ub3JtYWxpemVkSHVtYW5Cb25lcy5odW1hbkJvbmVzO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSByb290IG9mIG5vcm1hbGl6ZWQge0BsaW5rIFZSTUh1bWFuQm9uZX1zLlxuICAgKi9cbiAgcHVibGljIGdldCBub3JtYWxpemVkSHVtYW5Cb25lc1Jvb3QoKTogVEhSRUUuT2JqZWN0M0Qge1xuICAgIHJldHVybiB0aGlzLl9ub3JtYWxpemVkSHVtYW5Cb25lcy5yb290O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyB7QGxpbmsgVlJNSHVtYW5vaWR9LlxuICAgKiBAcGFyYW0gaHVtYW5Cb25lcyBBIHtAbGluayBWUk1IdW1hbkJvbmVzfSBjb250YWlucyBhbGwgdGhlIGJvbmVzIG9mIHRoZSBuZXcgaHVtYW5vaWRcbiAgICogQHBhcmFtIGF1dG9VcGRhdGVIdW1hbkJvbmVzIFdoZXRoZXIgaXQgY29waWVzIHBvc2UgZnJvbSBub3JtYWxpemVkSHVtYW5Cb25lcyB0byByYXdIdW1hbkJvbmVzIG9uIHtAbGluayB1cGRhdGV9LiBgdHJ1ZWAgYnkgZGVmYXVsdC5cbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihodW1hbkJvbmVzOiBWUk1IdW1hbkJvbmVzLCBvcHRpb25zPzogeyBhdXRvVXBkYXRlSHVtYW5Cb25lcz86IGJvb2xlYW4gfSkge1xuICAgIHRoaXMuYXV0b1VwZGF0ZUh1bWFuQm9uZXMgPSBvcHRpb25zPy5hdXRvVXBkYXRlSHVtYW5Cb25lcyA/PyB0cnVlO1xuICAgIHRoaXMuX3Jhd0h1bWFuQm9uZXMgPSBuZXcgVlJNUmlnKGh1bWFuQm9uZXMpO1xuICAgIHRoaXMuX25vcm1hbGl6ZWRIdW1hbkJvbmVzID0gbmV3IFZSTUh1bWFub2lkUmlnKHRoaXMuX3Jhd0h1bWFuQm9uZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvcHkgdGhlIGdpdmVuIHtAbGluayBWUk1IdW1hbm9pZH0gaW50byB0aGlzIG9uZS5cbiAgICogQHBhcmFtIHNvdXJjZSBUaGUge0BsaW5rIFZSTUh1bWFub2lkfSB5b3Ugd2FudCB0byBjb3B5XG4gICAqIEByZXR1cm5zIHRoaXNcbiAgICovXG4gIHB1YmxpYyBjb3B5KHNvdXJjZTogVlJNSHVtYW5vaWQpOiB0aGlzIHtcbiAgICB0aGlzLmF1dG9VcGRhdGVIdW1hbkJvbmVzID0gc291cmNlLmF1dG9VcGRhdGVIdW1hbkJvbmVzO1xuICAgIHRoaXMuX3Jhd0h1bWFuQm9uZXMgPSBuZXcgVlJNUmlnKHNvdXJjZS5odW1hbkJvbmVzKTtcbiAgICB0aGlzLl9ub3JtYWxpemVkSHVtYW5Cb25lcyA9IG5ldyBWUk1IdW1hbm9pZFJpZyh0aGlzLl9yYXdIdW1hbkJvbmVzKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBjbG9uZSBvZiB0aGlzIHtAbGluayBWUk1IdW1hbm9pZH0uXG4gICAqIEByZXR1cm5zIENvcGllZCB7QGxpbmsgVlJNSHVtYW5vaWR9XG4gICAqL1xuICBwdWJsaWMgY2xvbmUoKTogVlJNSHVtYW5vaWQge1xuICAgIHJldHVybiBuZXcgVlJNSHVtYW5vaWQodGhpcy5odW1hbkJvbmVzLCB7IGF1dG9VcGRhdGVIdW1hbkJvbmVzOiB0aGlzLmF1dG9VcGRhdGVIdW1hbkJvbmVzIH0pLmNvcHkodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgRGVwcmVjYXRlZC4gVXNlIGVpdGhlciB7QGxpbmsgZ2V0UmF3QWJzb2x1dGVQb3NlfSBvciB7QGxpbmsgZ2V0Tm9ybWFsaXplZEFic29sdXRlUG9zZX0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBnZXRBYnNvbHV0ZVBvc2UoKTogVlJNUG9zZSB7XG4gICAgY29uc29sZS53YXJuKFxuICAgICAgJ1ZSTUh1bWFub2lkOiBnZXRBYnNvbHV0ZVBvc2UoKSBpcyBkZXByZWNhdGVkLiBVc2UgZWl0aGVyIGdldFJhd0Fic29sdXRlUG9zZSgpIG9yIGdldE5vcm1hbGl6ZWRBYnNvbHV0ZVBvc2UoKSBpbnN0ZWFkLicsXG4gICAgKTtcblxuICAgIHJldHVybiB0aGlzLmdldFJhd0Fic29sdXRlUG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgY3VycmVudCBhYnNvbHV0ZSBwb3NlIG9mIHRoaXMgcmF3IGh1bWFuIGJvbmVzIGFzIGEge0BsaW5rIFZSTVBvc2V9LlxuICAgKiBOb3RlIHRoYXQgdGhlIG91dHB1dCByZXN1bHQgd2lsbCBjb250YWluIGluaXRpYWwgc3RhdGUgb2YgdGhlIFZSTSBhbmQgbm90IGNvbXBhdGlibGUgYmV0d2VlbiBkaWZmZXJlbnQgbW9kZWxzLlxuICAgKiBZb3UgbWlnaHQgd2FudCB0byB1c2Uge0BsaW5rIGdldFJhd1Bvc2V9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgZ2V0UmF3QWJzb2x1dGVQb3NlKCk6IFZSTVBvc2Uge1xuICAgIHJldHVybiB0aGlzLl9yYXdIdW1hbkJvbmVzLmdldEFic29sdXRlUG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgY3VycmVudCBhYnNvbHV0ZSBwb3NlIG9mIHRoaXMgbm9ybWFsaXplZCBodW1hbiBib25lcyBhcyBhIHtAbGluayBWUk1Qb3NlfS5cbiAgICogTm90ZSB0aGF0IHRoZSBvdXRwdXQgcmVzdWx0IHdpbGwgY29udGFpbiBpbml0aWFsIHN0YXRlIG9mIHRoZSBWUk0gYW5kIG5vdCBjb21wYXRpYmxlIGJldHdlZW4gZGlmZmVyZW50IG1vZGVscy5cbiAgICogWW91IG1pZ2h0IHdhbnQgdG8gdXNlIHtAbGluayBnZXROb3JtYWxpemVkUG9zZX0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBnZXROb3JtYWxpemVkQWJzb2x1dGVQb3NlKCk6IFZSTVBvc2Uge1xuICAgIHJldHVybiB0aGlzLl9ub3JtYWxpemVkSHVtYW5Cb25lcy5nZXRBYnNvbHV0ZVBvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBEZXByZWNhdGVkLiBVc2UgZWl0aGVyIHtAbGluayBnZXRSYXdQb3NlfSBvciB7QGxpbmsgZ2V0Tm9ybWFsaXplZFBvc2V9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgZ2V0UG9zZSgpOiBWUk1Qb3NlIHtcbiAgICBjb25zb2xlLndhcm4oJ1ZSTUh1bWFub2lkOiBnZXRQb3NlKCkgaXMgZGVwcmVjYXRlZC4gVXNlIGVpdGhlciBnZXRSYXdQb3NlKCkgb3IgZ2V0Tm9ybWFsaXplZFBvc2UoKSBpbnN0ZWFkLicpO1xuXG4gICAgcmV0dXJuIHRoaXMuZ2V0UmF3UG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgY3VycmVudCBwb3NlIG9mIHJhdyBodW1hbiBib25lcyBhcyBhIHtAbGluayBWUk1Qb3NlfS5cbiAgICpcbiAgICogRWFjaCB0cmFuc2Zvcm0gaXMgYSBsb2NhbCB0cmFuc2Zvcm0gcmVsYXRpdmUgZnJvbSByZXN0IHBvc2UgKFQtcG9zZSkuXG4gICAqL1xuICBwdWJsaWMgZ2V0UmF3UG9zZSgpOiBWUk1Qb3NlIHtcbiAgICByZXR1cm4gdGhpcy5fcmF3SHVtYW5Cb25lcy5nZXRQb3NlKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBjdXJyZW50IHBvc2Ugb2Ygbm9ybWFsaXplZCBodW1hbiBib25lcyBhcyBhIHtAbGluayBWUk1Qb3NlfS5cbiAgICpcbiAgICogRWFjaCB0cmFuc2Zvcm0gaXMgYSBsb2NhbCB0cmFuc2Zvcm0gcmVsYXRpdmUgZnJvbSByZXN0IHBvc2UgKFQtcG9zZSkuXG4gICAqL1xuICBwdWJsaWMgZ2V0Tm9ybWFsaXplZFBvc2UoKTogVlJNUG9zZSB7XG4gICAgcmV0dXJuIHRoaXMuX25vcm1hbGl6ZWRIdW1hbkJvbmVzLmdldFBvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBEZXByZWNhdGVkLiBVc2UgZWl0aGVyIHtAbGluayBzZXRSYXdQb3NlfSBvciB7QGxpbmsgc2V0Tm9ybWFsaXplZFBvc2V9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgc2V0UG9zZShwb3NlT2JqZWN0OiBWUk1Qb3NlKTogdm9pZCB7XG4gICAgY29uc29sZS53YXJuKCdWUk1IdW1hbm9pZDogc2V0UG9zZSgpIGlzIGRlcHJlY2F0ZWQuIFVzZSBlaXRoZXIgc2V0UmF3UG9zZSgpIG9yIHNldE5vcm1hbGl6ZWRQb3NlKCkgaW5zdGVhZC4nKTtcblxuICAgIHJldHVybiB0aGlzLnNldFJhd1Bvc2UocG9zZU9iamVjdCk7XG4gIH1cblxuICAvKipcbiAgICogTGV0IHRoZSByYXcgaHVtYW4gYm9uZXMgZG8gYSBzcGVjaWZpZWQgcG9zZS5cbiAgICpcbiAgICogRWFjaCB0cmFuc2Zvcm0gaGF2ZSB0byBiZSBhIGxvY2FsIHRyYW5zZm9ybSByZWxhdGl2ZSBmcm9tIHJlc3QgcG9zZSAoVC1wb3NlKS5cbiAgICogWW91IGNhbiBwYXNzIHdoYXQgeW91IGdvdCBmcm9tIHtAbGluayBnZXRSYXdQb3NlfS5cbiAgICpcbiAgICogSWYgeW91IGFyZSB1c2luZyB7QGxpbmsgYXV0b1VwZGF0ZUh1bWFuQm9uZXN9LCB5b3UgbWlnaHQgd2FudCB0byB1c2Uge0BsaW5rIHNldE5vcm1hbGl6ZWRQb3NlfSBpbnN0ZWFkLlxuICAgKlxuICAgKiBAcGFyYW0gcG9zZU9iamVjdCBBIHtAbGluayBWUk1Qb3NlfSB0aGF0IHJlcHJlc2VudHMgYSBzaW5nbGUgcG9zZVxuICAgKi9cbiAgcHVibGljIHNldFJhd1Bvc2UocG9zZU9iamVjdDogVlJNUG9zZSk6IHZvaWQge1xuICAgIHJldHVybiB0aGlzLl9yYXdIdW1hbkJvbmVzLnNldFBvc2UocG9zZU9iamVjdCk7XG4gIH1cblxuICAvKipcbiAgICogTGV0IHRoZSBub3JtYWxpemVkIGh1bWFuIGJvbmVzIGRvIGEgc3BlY2lmaWVkIHBvc2UuXG4gICAqXG4gICAqIEVhY2ggdHJhbnNmb3JtIGhhdmUgdG8gYmUgYSBsb2NhbCB0cmFuc2Zvcm0gcmVsYXRpdmUgZnJvbSByZXN0IHBvc2UgKFQtcG9zZSkuXG4gICAqIFlvdSBjYW4gcGFzcyB3aGF0IHlvdSBnb3QgZnJvbSB7QGxpbmsgZ2V0Tm9ybWFsaXplZFBvc2V9LlxuICAgKlxuICAgKiBAcGFyYW0gcG9zZU9iamVjdCBBIHtAbGluayBWUk1Qb3NlfSB0aGF0IHJlcHJlc2VudHMgYSBzaW5nbGUgcG9zZVxuICAgKi9cbiAgcHVibGljIHNldE5vcm1hbGl6ZWRQb3NlKHBvc2VPYmplY3Q6IFZSTVBvc2UpOiB2b2lkIHtcbiAgICByZXR1cm4gdGhpcy5fbm9ybWFsaXplZEh1bWFuQm9uZXMuc2V0UG9zZShwb3NlT2JqZWN0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBEZXByZWNhdGVkLiBVc2UgZWl0aGVyIHtAbGluayByZXNldFJhd1Bvc2V9IG9yIHtAbGluayByZXNldE5vcm1hbGl6ZWRQb3NlfSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIHJlc2V0UG9zZSgpOiB2b2lkIHtcbiAgICBjb25zb2xlLndhcm4oJ1ZSTUh1bWFub2lkOiByZXNldFBvc2UoKSBpcyBkZXByZWNhdGVkLiBVc2UgZWl0aGVyIHJlc2V0UmF3UG9zZSgpIG9yIHJlc2V0Tm9ybWFsaXplZFBvc2UoKSBpbnN0ZWFkLicpO1xuXG4gICAgcmV0dXJuIHRoaXMucmVzZXRSYXdQb3NlKCk7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhlIHJhdyBodW1hbm9pZCB0byBpdHMgcmVzdCBwb3NlLlxuICAgKlxuICAgKiBJZiB5b3UgYXJlIHVzaW5nIHtAbGluayBhdXRvVXBkYXRlSHVtYW5Cb25lc30sIHlvdSBtaWdodCB3YW50IHRvIHVzZSB7QGxpbmsgcmVzZXROb3JtYWxpemVkUG9zZX0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyByZXNldFJhd1Bvc2UoKTogdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMuX3Jhd0h1bWFuQm9uZXMucmVzZXRQb3NlKCk7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhlIG5vcm1hbGl6ZWQgaHVtYW5vaWQgdG8gaXRzIHJlc3QgcG9zZS5cbiAgICovXG4gIHB1YmxpYyByZXNldE5vcm1hbGl6ZWRQb3NlKCk6IHZvaWQge1xuICAgIHJldHVybiB0aGlzLl9ub3JtYWxpemVkSHVtYW5Cb25lcy5yZXNldFBvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBEZXByZWNhdGVkLiBVc2UgZWl0aGVyIHtAbGluayBnZXRSYXdCb25lfSBvciB7QGxpbmsgZ2V0Tm9ybWFsaXplZEJvbmV9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgZ2V0Qm9uZShuYW1lOiBWUk1IdW1hbkJvbmVOYW1lKTogVlJNSHVtYW5Cb25lIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zb2xlLndhcm4oJ1ZSTUh1bWFub2lkOiBnZXRCb25lKCkgaXMgZGVwcmVjYXRlZC4gVXNlIGVpdGhlciBnZXRSYXdCb25lKCkgb3IgZ2V0Tm9ybWFsaXplZEJvbmUoKSBpbnN0ZWFkLicpO1xuXG4gICAgcmV0dXJuIHRoaXMuZ2V0UmF3Qm9uZShuYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYSByYXcge0BsaW5rIFZSTUh1bWFuQm9uZX0gYm91bmQgdG8gYSBzcGVjaWZpZWQge0BsaW5rIFZSTUh1bWFuQm9uZU5hbWV9LlxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBib25lIHlvdSB3YW50XG4gICAqL1xuICBwdWJsaWMgZ2V0UmF3Qm9uZShuYW1lOiBWUk1IdW1hbkJvbmVOYW1lKTogVlJNSHVtYW5Cb25lIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fcmF3SHVtYW5Cb25lcy5nZXRCb25lKG5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhIG5vcm1hbGl6ZWQge0BsaW5rIFZSTUh1bWFuQm9uZX0gYm91bmQgdG8gYSBzcGVjaWZpZWQge0BsaW5rIFZSTUh1bWFuQm9uZU5hbWV9LlxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBib25lIHlvdSB3YW50XG4gICAqL1xuICBwdWJsaWMgZ2V0Tm9ybWFsaXplZEJvbmUobmFtZTogVlJNSHVtYW5Cb25lTmFtZSk6IFZSTUh1bWFuQm9uZSB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX25vcm1hbGl6ZWRIdW1hbkJvbmVzLmdldEJvbmUobmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgRGVwcmVjYXRlZC4gVXNlIGVpdGhlciB7QGxpbmsgZ2V0UmF3Qm9uZU5vZGV9IG9yIHtAbGluayBnZXROb3JtYWxpemVkQm9uZU5vZGV9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgZ2V0Qm9uZU5vZGUobmFtZTogVlJNSHVtYW5Cb25lTmFtZSk6IFRIUkVFLk9iamVjdDNEIHwgbnVsbCB7XG4gICAgY29uc29sZS53YXJuKFxuICAgICAgJ1ZSTUh1bWFub2lkOiBnZXRCb25lTm9kZSgpIGlzIGRlcHJlY2F0ZWQuIFVzZSBlaXRoZXIgZ2V0UmF3Qm9uZU5vZGUoKSBvciBnZXROb3JtYWxpemVkQm9uZU5vZGUoKSBpbnN0ZWFkLicsXG4gICAgKTtcblxuICAgIHJldHVybiB0aGlzLmdldFJhd0JvbmVOb2RlKG5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhIHJhdyBib25lIGFzIGEgYFRIUkVFLk9iamVjdDNEYCBib3VuZCB0byBhIHNwZWNpZmllZCB7QGxpbmsgVlJNSHVtYW5Cb25lTmFtZX0uXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGJvbmUgeW91IHdhbnRcbiAgICovXG4gIHB1YmxpYyBnZXRSYXdCb25lTm9kZShuYW1lOiBWUk1IdW1hbkJvbmVOYW1lKTogVEhSRUUuT2JqZWN0M0QgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fcmF3SHVtYW5Cb25lcy5nZXRCb25lTm9kZShuYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYSBub3JtYWxpemVkIGJvbmUgYXMgYSBgVEhSRUUuT2JqZWN0M0RgIGJvdW5kIHRvIGEgc3BlY2lmaWVkIHtAbGluayBWUk1IdW1hbkJvbmVOYW1lfS5cbiAgICpcbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgYm9uZSB5b3Ugd2FudFxuICAgKi9cbiAgcHVibGljIGdldE5vcm1hbGl6ZWRCb25lTm9kZShuYW1lOiBWUk1IdW1hbkJvbmVOYW1lKTogVEhSRUUuT2JqZWN0M0QgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fbm9ybWFsaXplZEh1bWFuQm9uZXMuZ2V0Qm9uZU5vZGUobmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSBodW1hbm9pZCBjb21wb25lbnQuXG4gICAqXG4gICAqIElmIHtAbGluayBhdXRvVXBkYXRlSHVtYW5Cb25lc30gaXMgYHRydWVgLCBpdCB0cmFuc2ZlcnMgdGhlIHBvc2Ugb2Ygbm9ybWFsaXplZCBodW1hbiBib25lcyB0byByYXcgaHVtYW4gYm9uZXMuXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmF1dG9VcGRhdGVIdW1hbkJvbmVzKSB7XG4gICAgICB0aGlzLl9ub3JtYWxpemVkSHVtYW5Cb25lcy51cGRhdGUoKTtcbiAgICB9XG4gIH1cbn1cbiIsICIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cblxuZXhwb3J0IGNvbnN0IFZSTVJlcXVpcmVkSHVtYW5Cb25lTmFtZSA9IHtcbiAgSGlwczogJ2hpcHMnLFxuICBTcGluZTogJ3NwaW5lJyxcbiAgSGVhZDogJ2hlYWQnLFxuICBMZWZ0VXBwZXJMZWc6ICdsZWZ0VXBwZXJMZWcnLFxuICBMZWZ0TG93ZXJMZWc6ICdsZWZ0TG93ZXJMZWcnLFxuICBMZWZ0Rm9vdDogJ2xlZnRGb290JyxcbiAgUmlnaHRVcHBlckxlZzogJ3JpZ2h0VXBwZXJMZWcnLFxuICBSaWdodExvd2VyTGVnOiAncmlnaHRMb3dlckxlZycsXG4gIFJpZ2h0Rm9vdDogJ3JpZ2h0Rm9vdCcsXG4gIExlZnRVcHBlckFybTogJ2xlZnRVcHBlckFybScsXG4gIExlZnRMb3dlckFybTogJ2xlZnRMb3dlckFybScsXG4gIExlZnRIYW5kOiAnbGVmdEhhbmQnLFxuICBSaWdodFVwcGVyQXJtOiAncmlnaHRVcHBlckFybScsXG4gIFJpZ2h0TG93ZXJBcm06ICdyaWdodExvd2VyQXJtJyxcbiAgUmlnaHRIYW5kOiAncmlnaHRIYW5kJyxcbn0gYXMgY29uc3Q7XG5cbmV4cG9ydCB0eXBlIFZSTVJlcXVpcmVkSHVtYW5Cb25lTmFtZSA9ICh0eXBlb2YgVlJNUmVxdWlyZWRIdW1hbkJvbmVOYW1lKVtrZXlvZiB0eXBlb2YgVlJNUmVxdWlyZWRIdW1hbkJvbmVOYW1lXTtcbiIsICJpbXBvcnQgdHlwZSAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB0eXBlICogYXMgVjBWUk0gZnJvbSAnQHBpeGl2L3R5cGVzLXZybS0wLjAnO1xuaW1wb3J0IHR5cGUgKiBhcyBWMVZSTVNjaGVtYSBmcm9tICdAcGl4aXYvdHlwZXMtdnJtYy12cm0tMS4wJztcbmltcG9ydCB0eXBlIHsgR0xURiwgR0xURkxvYWRlclBsdWdpbiwgR0xURlBhcnNlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXIuanMnO1xuaW1wb3J0IHsgVlJNSHVtYW5vaWQgfSBmcm9tICcuL1ZSTUh1bWFub2lkJztcbmltcG9ydCB0eXBlIHsgVlJNSHVtYW5Cb25lcyB9IGZyb20gJy4vVlJNSHVtYW5Cb25lcyc7XG5pbXBvcnQgeyBWUk1SZXF1aXJlZEh1bWFuQm9uZU5hbWUgfSBmcm9tICcuL1ZSTVJlcXVpcmVkSHVtYW5Cb25lTmFtZSc7XG5pbXBvcnQgeyBHTFRGIGFzIEdMVEZTY2hlbWEgfSBmcm9tICdAZ2x0Zi10cmFuc2Zvcm0vY29yZSc7XG5pbXBvcnQgeyBWUk1IdW1hbm9pZEhlbHBlciB9IGZyb20gJy4vaGVscGVycy9WUk1IdW1hbm9pZEhlbHBlcic7XG5pbXBvcnQgeyBWUk1IdW1hbm9pZExvYWRlclBsdWdpbk9wdGlvbnMgfSBmcm9tICcuL1ZSTUh1bWFub2lkTG9hZGVyUGx1Z2luT3B0aW9ucyc7XG5cbi8qKlxuICogUG9zc2libGUgc3BlYyB2ZXJzaW9ucyBpdCByZWNvZ25pemVzLlxuICovXG5jb25zdCBQT1NTSUJMRV9TUEVDX1ZFUlNJT05TID0gbmV3IFNldChbJzEuMCcsICcxLjAtYmV0YSddKTtcblxuLyoqXG4gKiBBIG1hcCBmcm9tIG9sZCB0aHVtYiBib25lIG5hbWVzIHRvIG5ldyB0aHVtYiBib25lIG5hbWVzXG4gKi9cbmNvbnN0IHRodW1iQm9uZU5hbWVNYXA6IHsgW2tleTogc3RyaW5nXTogVjFWUk1TY2hlbWEuSHVtYW5vaWRIdW1hbkJvbmVOYW1lIHwgdW5kZWZpbmVkIH0gPSB7XG4gIGxlZnRUaHVtYlByb3hpbWFsOiAnbGVmdFRodW1iTWV0YWNhcnBhbCcsXG4gIGxlZnRUaHVtYkludGVybWVkaWF0ZTogJ2xlZnRUaHVtYlByb3hpbWFsJyxcbiAgcmlnaHRUaHVtYlByb3hpbWFsOiAncmlnaHRUaHVtYk1ldGFjYXJwYWwnLFxuICByaWdodFRodW1iSW50ZXJtZWRpYXRlOiAncmlnaHRUaHVtYlByb3hpbWFsJyxcbn07XG5cbi8qKlxuICogQSBwbHVnaW4gb2YgR0xURkxvYWRlciB0aGF0IGltcG9ydHMgYSB7QGxpbmsgVlJNSHVtYW5vaWR9IGZyb20gYSBWUk0gZXh0ZW5zaW9uIG9mIGEgR0xURi5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUh1bWFub2lkTG9hZGVyUGx1Z2luIGltcGxlbWVudHMgR0xURkxvYWRlclBsdWdpbiB7XG4gIC8qKlxuICAgKiBTcGVjaWZ5IGFuIE9iamVjdDNEIHRvIGFkZCB7QGxpbmsgVlJNSHVtYW5vaWRIZWxwZXJ9LlxuICAgKiBJZiBub3Qgc3BlY2lmaWVkLCBoZWxwZXIgd2lsbCBub3QgYmUgY3JlYXRlZC5cbiAgICogSWYgYHJlbmRlck9yZGVyYCBpcyBzZXQgdG8gdGhlIHJvb3QsIHRoZSBoZWxwZXIgd2lsbCBjb3B5IHRoZSBzYW1lIGByZW5kZXJPcmRlcmAgLlxuICAgKi9cbiAgcHVibGljIGhlbHBlclJvb3Q/OiBUSFJFRS5PYmplY3QzRDtcblxuICBwdWJsaWMgYXV0b1VwZGF0ZUh1bWFuQm9uZXM/OiBib29sZWFuO1xuXG4gIHB1YmxpYyByZWFkb25seSBwYXJzZXI6IEdMVEZQYXJzZXI7XG5cbiAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7XG4gICAgLy8gV2Ugc2hvdWxkIHVzZSB0aGUgZXh0ZW5zaW9uIG5hbWUgaW5zdGVhZCBidXQgd2UgaGF2ZSBtdWx0aXBsZSBwbHVnaW5zIGZvciBhbiBleHRlbnNpb24uLi5cbiAgICByZXR1cm4gJ1ZSTUh1bWFub2lkTG9hZGVyUGx1Z2luJztcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJzZXI6IEdMVEZQYXJzZXIsIG9wdGlvbnM/OiBWUk1IdW1hbm9pZExvYWRlclBsdWdpbk9wdGlvbnMpIHtcbiAgICB0aGlzLnBhcnNlciA9IHBhcnNlcjtcblxuICAgIHRoaXMuaGVscGVyUm9vdCA9IG9wdGlvbnM/LmhlbHBlclJvb3Q7XG4gICAgdGhpcy5hdXRvVXBkYXRlSHVtYW5Cb25lcyA9IG9wdGlvbnM/LmF1dG9VcGRhdGVIdW1hbkJvbmVzO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGFmdGVyUm9vdChnbHRmOiBHTFRGKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgZ2x0Zi51c2VyRGF0YS52cm1IdW1hbm9pZCA9IGF3YWl0IHRoaXMuX2ltcG9ydChnbHRmKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbXBvcnQgYSB7QGxpbmsgVlJNSHVtYW5vaWR9IGZyb20gYSBWUk0uXG4gICAqXG4gICAqIEBwYXJhbSBnbHRmIEEgcGFyc2VkIHJlc3VsdCBvZiBHTFRGIHRha2VuIGZyb20gR0xURkxvYWRlclxuICAgKi9cbiAgcHJpdmF0ZSBhc3luYyBfaW1wb3J0KGdsdGY6IEdMVEYpOiBQcm9taXNlPFZSTUh1bWFub2lkIHwgbnVsbD4ge1xuICAgIGNvbnN0IHYxUmVzdWx0ID0gYXdhaXQgdGhpcy5fdjFJbXBvcnQoZ2x0Zik7XG4gICAgaWYgKHYxUmVzdWx0KSB7XG4gICAgICByZXR1cm4gdjFSZXN1bHQ7XG4gICAgfVxuXG4gICAgY29uc3QgdjBSZXN1bHQgPSBhd2FpdCB0aGlzLl92MEltcG9ydChnbHRmKTtcbiAgICBpZiAodjBSZXN1bHQpIHtcbiAgICAgIHJldHVybiB2MFJlc3VsdDtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX3YxSW1wb3J0KGdsdGY6IEdMVEYpOiBQcm9taXNlPFZSTUh1bWFub2lkIHwgbnVsbD4ge1xuICAgIGNvbnN0IGpzb24gPSB0aGlzLnBhcnNlci5qc29uIGFzIEdMVEZTY2hlbWEuSUdMVEY7XG5cbiAgICAvLyBlYXJseSBhYm9ydCBpZiBpdCBkb2Vzbid0IHVzZSB2cm1cbiAgICBjb25zdCBpc1ZSTVVzZWQgPSBqc29uLmV4dGVuc2lvbnNVc2VkPy5pbmRleE9mKCdWUk1DX3ZybScpICE9PSAtMTtcbiAgICBpZiAoIWlzVlJNVXNlZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgZXh0ZW5zaW9uID0ganNvbi5leHRlbnNpb25zPy5bJ1ZSTUNfdnJtJ10gYXMgVjFWUk1TY2hlbWEuVlJNQ1ZSTSB8IHVuZGVmaW5lZDtcbiAgICBpZiAoIWV4dGVuc2lvbikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc3BlY1ZlcnNpb24gPSBleHRlbnNpb24uc3BlY1ZlcnNpb247XG4gICAgaWYgKCFQT1NTSUJMRV9TUEVDX1ZFUlNJT05TLmhhcyhzcGVjVmVyc2lvbikpIHtcbiAgICAgIGNvbnNvbGUud2FybihgVlJNSHVtYW5vaWRMb2FkZXJQbHVnaW46IFVua25vd24gVlJNQ192cm0gc3BlY1ZlcnNpb24gXCIke3NwZWNWZXJzaW9ufVwiYCk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzY2hlbWFIdW1hbm9pZCA9IGV4dGVuc2lvbi5odW1hbm9pZDtcbiAgICBpZiAoIXNjaGVtYUh1bWFub2lkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjb21wYXQ6IDEuMC1iZXRhIHRodW1iIGJvbmUgbmFtZXNcbiAgICAgKlxuICAgICAqIGB0cnVlYCBpZiBgbGVmdFRodW1iSW50ZXJtZWRpYXRlYCBvciBgcmlnaHRUaHVtYkludGVybWVkaWF0ZWAgZXhpc3RzXG4gICAgICovXG4gICAgY29uc3QgZXhpc3RzUHJldmlvdXNUaHVtYk5hbWUgPVxuICAgICAgKHNjaGVtYUh1bWFub2lkLmh1bWFuQm9uZXMgYXMgYW55KS5sZWZ0VGh1bWJJbnRlcm1lZGlhdGUgIT0gbnVsbCB8fFxuICAgICAgKHNjaGVtYUh1bWFub2lkLmh1bWFuQm9uZXMgYXMgYW55KS5yaWdodFRodW1iSW50ZXJtZWRpYXRlICE9IG51bGw7XG5cbiAgICBjb25zdCBodW1hbkJvbmVzOiBQYXJ0aWFsPFZSTUh1bWFuQm9uZXM+ID0ge307XG4gICAgaWYgKHNjaGVtYUh1bWFub2lkLmh1bWFuQm9uZXMgIT0gbnVsbCkge1xuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgIE9iamVjdC5lbnRyaWVzKHNjaGVtYUh1bWFub2lkLmh1bWFuQm9uZXMpLm1hcChhc3luYyAoW2JvbmVOYW1lU3RyaW5nLCBzY2hlbWFIdW1hbkJvbmVdKSA9PiB7XG4gICAgICAgICAgbGV0IGJvbmVOYW1lID0gYm9uZU5hbWVTdHJpbmcgYXMgVjFWUk1TY2hlbWEuSHVtYW5vaWRIdW1hbkJvbmVOYW1lO1xuICAgICAgICAgIGNvbnN0IGluZGV4ID0gc2NoZW1hSHVtYW5Cb25lLm5vZGU7XG5cbiAgICAgICAgICAvLyBjb21wYXQ6IDEuMC1iZXRhIHByZXZpb3VzIHRodW1iIGJvbmUgbmFtZXNcbiAgICAgICAgICBpZiAoZXhpc3RzUHJldmlvdXNUaHVtYk5hbWUpIHtcbiAgICAgICAgICAgIGNvbnN0IHRodW1iQm9uZU5hbWUgPSB0aHVtYkJvbmVOYW1lTWFwW2JvbmVOYW1lXTtcbiAgICAgICAgICAgIGlmICh0aHVtYkJvbmVOYW1lICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgYm9uZU5hbWUgPSB0aHVtYkJvbmVOYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IG5vZGUgPSBhd2FpdCB0aGlzLnBhcnNlci5nZXREZXBlbmRlbmN5KCdub2RlJywgaW5kZXgpO1xuXG4gICAgICAgICAgLy8gaWYgdGhlIHNwZWNpZmllZCBub2RlIGRvZXMgbm90IGV4aXN0LCBlbWl0IGEgd2FybmluZ1xuICAgICAgICAgIGlmIChub2RlID09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgQSBnbFRGIG5vZGUgYm91bmQgdG8gdGhlIGh1bWFub2lkIGJvbmUgJHtib25lTmFtZX0gKGluZGV4ID0gJHtpbmRleH0pIGRvZXMgbm90IGV4aXN0YCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gc2V0IHRvIHRoZSBgaHVtYW5Cb25lc2BcbiAgICAgICAgICBodW1hbkJvbmVzW2JvbmVOYW1lXSA9IHsgbm9kZSB9O1xuICAgICAgICB9KSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgaHVtYW5vaWQgPSBuZXcgVlJNSHVtYW5vaWQodGhpcy5fZW5zdXJlUmVxdWlyZWRCb25lc0V4aXN0KGh1bWFuQm9uZXMpLCB7XG4gICAgICBhdXRvVXBkYXRlSHVtYW5Cb25lczogdGhpcy5hdXRvVXBkYXRlSHVtYW5Cb25lcyxcbiAgICB9KTtcbiAgICBnbHRmLnNjZW5lLmFkZChodW1hbm9pZC5ub3JtYWxpemVkSHVtYW5Cb25lc1Jvb3QpO1xuXG4gICAgaWYgKHRoaXMuaGVscGVyUm9vdCkge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IFZSTUh1bWFub2lkSGVscGVyKGh1bWFub2lkKTtcbiAgICAgIHRoaXMuaGVscGVyUm9vdC5hZGQoaGVscGVyKTtcbiAgICAgIGhlbHBlci5yZW5kZXJPcmRlciA9IHRoaXMuaGVscGVyUm9vdC5yZW5kZXJPcmRlcjtcbiAgICB9XG5cbiAgICByZXR1cm4gaHVtYW5vaWQ7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF92MEltcG9ydChnbHRmOiBHTFRGKTogUHJvbWlzZTxWUk1IdW1hbm9pZCB8IG51bGw+IHtcbiAgICBjb25zdCBqc29uID0gdGhpcy5wYXJzZXIuanNvbiBhcyBHTFRGU2NoZW1hLklHTFRGO1xuXG4gICAgY29uc3QgdnJtRXh0ID0ganNvbi5leHRlbnNpb25zPy5WUk0gYXMgVjBWUk0uVlJNIHwgdW5kZWZpbmVkO1xuICAgIGlmICghdnJtRXh0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzY2hlbWFIdW1hbm9pZDogVjBWUk0uSHVtYW5vaWQgfCB1bmRlZmluZWQgPSB2cm1FeHQuaHVtYW5vaWQ7XG4gICAgaWYgKCFzY2hlbWFIdW1hbm9pZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgaHVtYW5Cb25lczogUGFydGlhbDxWUk1IdW1hbkJvbmVzPiA9IHt9O1xuICAgIGlmIChzY2hlbWFIdW1hbm9pZC5odW1hbkJvbmVzICE9IG51bGwpIHtcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICBzY2hlbWFIdW1hbm9pZC5odW1hbkJvbmVzLm1hcChhc3luYyAoYm9uZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGJvbmVOYW1lID0gYm9uZS5ib25lO1xuICAgICAgICAgIGNvbnN0IGluZGV4ID0gYm9uZS5ub2RlO1xuXG4gICAgICAgICAgaWYgKGJvbmVOYW1lID09IG51bGwgfHwgaW5kZXggPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIFZSTTAuMCBjYW4gY29udGFpbiAtMSBhcyBhIG5vZGUgaW5kZXgsIHdoaWNoIGlzIGludmFsaWRcbiAgICAgICAgICAvLyBGb3VuZCBhdCBsZWFzdCBpbiBVbmlWUk0tMC42MS4xXG4gICAgICAgICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgICBgQSBnbFRGIG5vZGUgaW5kZXggZm9yIHRoZSBodW1hbm9pZCBib25lICR7Ym9uZU5hbWV9IGlzIG5lZ2F0aXZlICgke2luZGV4fSksIGlnbm9yaW5nIHRoaXMgYm9uZS5gLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBub2RlID0gYXdhaXQgdGhpcy5wYXJzZXIuZ2V0RGVwZW5kZW5jeSgnbm9kZScsIGluZGV4KTtcblxuICAgICAgICAgIC8vIGlmIHRoZSBzcGVjaWZpZWQgbm9kZSBkb2VzIG5vdCBleGlzdCwgZW1pdCBhIHdhcm5pbmdcbiAgICAgICAgICBpZiAobm9kZSA9PSBudWxsKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYEEgZ2xURiBub2RlIGJvdW5kIHRvIHRoZSBodW1hbm9pZCBib25lICR7Ym9uZU5hbWV9IChpbmRleCA9ICR7aW5kZXh9KSBkb2VzIG5vdCBleGlzdGApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIG1hcCB0byBuZXcgYm9uZSBuYW1lXG4gICAgICAgICAgY29uc3QgdGh1bWJCb25lTmFtZSA9IHRodW1iQm9uZU5hbWVNYXBbYm9uZU5hbWVdO1xuICAgICAgICAgIGNvbnN0IG5ld0JvbmVOYW1lID0gKHRodW1iQm9uZU5hbWUgPz8gYm9uZU5hbWUpIGFzIFYxVlJNU2NoZW1hLkh1bWFub2lkSHVtYW5Cb25lTmFtZTtcblxuICAgICAgICAgIC8vIHYwIFZSTXMgbWlnaHQgaGF2ZSBhIG11bHRpcGxlIG5vZGVzIGF0dGFjaGVkIHRvIGEgc2luZ2xlIGJvbmUuLi5cbiAgICAgICAgICAvLyBzbyBpZiB0aGVyZSBhbHJlYWR5IGlzIGFuIGVudHJ5IGluIHRoZSBgaHVtYW5Cb25lc2AsIHNob3cgYSB3YXJuaW5nIGFuZCBpZ25vcmUgaXRcbiAgICAgICAgICBpZiAoaHVtYW5Cb25lc1tuZXdCb25lTmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgICBgTXVsdGlwbGUgYm9uZSBlbnRyaWVzIGZvciAke25ld0JvbmVOYW1lfSBkZXRlY3RlZCAoaW5kZXggPSAke2luZGV4fSksIGlnbm9yaW5nIGR1cGxpY2F0ZWQgZW50cmllcy5gLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBzZXQgdG8gdGhlIGBodW1hbkJvbmVzYFxuICAgICAgICAgIGh1bWFuQm9uZXNbbmV3Qm9uZU5hbWVdID0geyBub2RlIH07XG4gICAgICAgIH0pLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBodW1hbm9pZCA9IG5ldyBWUk1IdW1hbm9pZCh0aGlzLl9lbnN1cmVSZXF1aXJlZEJvbmVzRXhpc3QoaHVtYW5Cb25lcyksIHtcbiAgICAgIGF1dG9VcGRhdGVIdW1hbkJvbmVzOiB0aGlzLmF1dG9VcGRhdGVIdW1hbkJvbmVzLFxuICAgIH0pO1xuICAgIGdsdGYuc2NlbmUuYWRkKGh1bWFub2lkLm5vcm1hbGl6ZWRIdW1hbkJvbmVzUm9vdCk7XG5cbiAgICBpZiAodGhpcy5oZWxwZXJSb290KSB7XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgVlJNSHVtYW5vaWRIZWxwZXIoaHVtYW5vaWQpO1xuICAgICAgdGhpcy5oZWxwZXJSb290LmFkZChoZWxwZXIpO1xuICAgICAgaGVscGVyLnJlbmRlck9yZGVyID0gdGhpcy5oZWxwZXJSb290LnJlbmRlck9yZGVyO1xuICAgIH1cblxuICAgIHJldHVybiBodW1hbm9pZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbnN1cmUgcmVxdWlyZWQgYm9uZXMgZXhpc3QgaW4gZ2l2ZW4gaHVtYW4gYm9uZXMuXG4gICAqIEBwYXJhbSBodW1hbkJvbmVzIEh1bWFuIGJvbmVzXG4gICAqIEByZXR1cm5zIEh1bWFuIGJvbmVzLCBubyBsb25nZXIgcGFydGlhbCFcbiAgICovXG4gIHByaXZhdGUgX2Vuc3VyZVJlcXVpcmVkQm9uZXNFeGlzdChodW1hbkJvbmVzOiBQYXJ0aWFsPFZSTUh1bWFuQm9uZXM+KTogVlJNSHVtYW5Cb25lcyB7XG4gICAgLy8gZW5zdXJlIHJlcXVpcmVkIGJvbmVzIGV4aXN0XG4gICAgY29uc3QgbWlzc2luZ1JlcXVpcmVkQm9uZXMgPSBPYmplY3QudmFsdWVzKFZSTVJlcXVpcmVkSHVtYW5Cb25lTmFtZSkuZmlsdGVyKFxuICAgICAgKHJlcXVpcmVkQm9uZU5hbWUpID0+IGh1bWFuQm9uZXNbcmVxdWlyZWRCb25lTmFtZV0gPT0gbnVsbCxcbiAgICApO1xuXG4gICAgLy8gdGhyb3cgYW4gZXJyb3IgaWYgdGhlcmUgYXJlIG1pc3NpbmcgYm9uZXNcbiAgICBpZiAobWlzc2luZ1JlcXVpcmVkQm9uZXMubGVuZ3RoID4gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgVlJNSHVtYW5vaWRMb2FkZXJQbHVnaW46IFRoZXNlIGh1bWFub2lkIGJvbmVzIGFyZSByZXF1aXJlZCBidXQgbm90IGV4aXN0OiAke21pc3NpbmdSZXF1aXJlZEJvbmVzLmpvaW4oJywgJyl9YCxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGh1bWFuQm9uZXMgYXMgVlJNSHVtYW5Cb25lcztcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTUxvb2tBdCB9IGZyb20gJy4uL1ZSTUxvb2tBdCc7XG5pbXBvcnQgeyBGYW5CdWZmZXJHZW9tZXRyeSB9IGZyb20gJy4vdXRpbHMvRmFuQnVmZmVyR2VvbWV0cnknO1xuaW1wb3J0IHsgTGluZUFuZFNwaGVyZUJ1ZmZlckdlb21ldHJ5IH0gZnJvbSAnLi91dGlscy9MaW5lQW5kU3BoZXJlQnVmZmVyR2VvbWV0cnknO1xuXG5jb25zdCBfcXVhdEEgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuY29uc3QgX3F1YXRCID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3YzQiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbmNvbnN0IFNRUlRfMl9PVkVSXzIgPSBNYXRoLnNxcnQoMi4wKSAvIDIuMDtcbmNvbnN0IFFVQVRfWFlfQ1c5MCA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKDAsIDAsIC1TUVJUXzJfT1ZFUl8yLCBTUVJUXzJfT1ZFUl8yKTtcbmNvbnN0IFZFQzNfUE9TSVRJVkVfWSA9IG5ldyBUSFJFRS5WZWN0b3IzKDAuMCwgMS4wLCAwLjApO1xuXG5leHBvcnQgY2xhc3MgVlJNTG9va0F0SGVscGVyIGV4dGVuZHMgVEhSRUUuR3JvdXAge1xuICBwdWJsaWMgcmVhZG9ubHkgdnJtTG9va0F0OiBWUk1Mb29rQXQ7XG4gIHByaXZhdGUgcmVhZG9ubHkgX21lc2hZYXc6IFRIUkVFLk1lc2g8RmFuQnVmZmVyR2VvbWV0cnksIFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsPjtcbiAgcHJpdmF0ZSByZWFkb25seSBfbWVzaFBpdGNoOiBUSFJFRS5NZXNoPEZhbkJ1ZmZlckdlb21ldHJ5LCBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbD47XG4gIHByaXZhdGUgcmVhZG9ubHkgX2xpbmVUYXJnZXQ6IFRIUkVFLkxpbmVTZWdtZW50czxMaW5lQW5kU3BoZXJlQnVmZmVyR2VvbWV0cnksIFRIUkVFLkxpbmVCYXNpY01hdGVyaWFsPjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IobG9va0F0OiBWUk1Mb29rQXQpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMubWF0cml4QXV0b1VwZGF0ZSA9IGZhbHNlO1xuXG4gICAgdGhpcy52cm1Mb29rQXQgPSBsb29rQXQ7XG5cbiAgICB7XG4gICAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyBGYW5CdWZmZXJHZW9tZXRyeSgpO1xuICAgICAgZ2VvbWV0cnkucmFkaXVzID0gMC41O1xuXG4gICAgICBjb25zdCBtYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gICAgICAgIGNvbG9yOiAweDAwZmYwMCxcbiAgICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgICAgIG9wYWNpdHk6IDAuNSxcbiAgICAgICAgc2lkZTogVEhSRUUuRG91YmxlU2lkZSxcbiAgICAgICAgZGVwdGhUZXN0OiBmYWxzZSxcbiAgICAgICAgZGVwdGhXcml0ZTogZmFsc2UsXG4gICAgICB9KTtcblxuICAgICAgdGhpcy5fbWVzaFBpdGNoID0gbmV3IFRIUkVFLk1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKTtcbiAgICAgIHRoaXMuYWRkKHRoaXMuX21lc2hQaXRjaCk7XG4gICAgfVxuXG4gICAge1xuICAgICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgRmFuQnVmZmVyR2VvbWV0cnkoKTtcbiAgICAgIGdlb21ldHJ5LnJhZGl1cyA9IDAuNTtcblxuICAgICAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICAgICAgICBjb2xvcjogMHhmZjAwMDAsXG4gICAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgICAgICBvcGFjaXR5OiAwLjUsXG4gICAgICAgIHNpZGU6IFRIUkVFLkRvdWJsZVNpZGUsXG4gICAgICAgIGRlcHRoVGVzdDogZmFsc2UsXG4gICAgICAgIGRlcHRoV3JpdGU6IGZhbHNlLFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuX21lc2hZYXcgPSBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpO1xuICAgICAgdGhpcy5hZGQodGhpcy5fbWVzaFlhdyk7XG4gICAgfVxuXG4gICAge1xuICAgICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgTGluZUFuZFNwaGVyZUJ1ZmZlckdlb21ldHJ5KCk7XG4gICAgICBnZW9tZXRyeS5yYWRpdXMgPSAwLjE7XG5cbiAgICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLkxpbmVCYXNpY01hdGVyaWFsKHtcbiAgICAgICAgY29sb3I6IDB4ZmZmZmZmLFxuICAgICAgICBkZXB0aFRlc3Q6IGZhbHNlLFxuICAgICAgICBkZXB0aFdyaXRlOiBmYWxzZSxcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLl9saW5lVGFyZ2V0ID0gbmV3IFRIUkVFLkxpbmVTZWdtZW50cyhnZW9tZXRyeSwgbWF0ZXJpYWwpO1xuICAgICAgdGhpcy5fbGluZVRhcmdldC5mcnVzdHVtQ3VsbGVkID0gZmFsc2U7XG4gICAgICB0aGlzLmFkZCh0aGlzLl9saW5lVGFyZ2V0KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9tZXNoWWF3Lmdlb21ldHJ5LmRpc3Bvc2UoKTtcbiAgICB0aGlzLl9tZXNoWWF3Lm1hdGVyaWFsLmRpc3Bvc2UoKTtcblxuICAgIHRoaXMuX21lc2hQaXRjaC5nZW9tZXRyeS5kaXNwb3NlKCk7XG4gICAgdGhpcy5fbWVzaFBpdGNoLm1hdGVyaWFsLmRpc3Bvc2UoKTtcblxuICAgIHRoaXMuX2xpbmVUYXJnZXQuZ2VvbWV0cnkuZGlzcG9zZSgpO1xuICAgIHRoaXMuX2xpbmVUYXJnZXQubWF0ZXJpYWwuZGlzcG9zZSgpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZU1hdHJpeFdvcmxkKGZvcmNlOiBib29sZWFuKTogdm9pZCB7XG4gICAgLy8gdXBkYXRlIGdlb21ldHJpZXNcbiAgICBjb25zdCB5YXcgPSBUSFJFRS5NYXRoVXRpbHMuREVHMlJBRCAqIHRoaXMudnJtTG9va0F0LnlhdztcbiAgICB0aGlzLl9tZXNoWWF3Lmdlb21ldHJ5LnRoZXRhID0geWF3O1xuICAgIHRoaXMuX21lc2hZYXcuZ2VvbWV0cnkudXBkYXRlKCk7XG5cbiAgICBjb25zdCBwaXRjaCA9IFRIUkVFLk1hdGhVdGlscy5ERUcyUkFEICogdGhpcy52cm1Mb29rQXQucGl0Y2g7XG4gICAgdGhpcy5fbWVzaFBpdGNoLmdlb21ldHJ5LnRoZXRhID0gcGl0Y2g7XG4gICAgdGhpcy5fbWVzaFBpdGNoLmdlb21ldHJ5LnVwZGF0ZSgpO1xuXG4gICAgLy8gZ2V0IHdvcmxkIHBvc2l0aW9uIGFuZCBxdWF0ZXJuaW9uXG4gICAgdGhpcy52cm1Mb29rQXQuZ2V0TG9va0F0V29ybGRQb3NpdGlvbihfdjNBKTtcbiAgICB0aGlzLnZybUxvb2tBdC5nZXRMb29rQXRXb3JsZFF1YXRlcm5pb24oX3F1YXRBKTtcblxuICAgIC8vIGNhbGN1bGF0ZSByb3RhdGlvbiB1c2luZyBmYWNlRnJvbnRcbiAgICBfcXVhdEEubXVsdGlwbHkodGhpcy52cm1Mb29rQXQuZ2V0RmFjZUZyb250UXVhdGVybmlvbihfcXVhdEIpKTtcblxuICAgIC8vIHNldCB0cmFuc2Zvcm0gdG8gbWVzaGVzXG4gICAgdGhpcy5fbWVzaFlhdy5wb3NpdGlvbi5jb3B5KF92M0EpO1xuICAgIHRoaXMuX21lc2hZYXcucXVhdGVybmlvbi5jb3B5KF9xdWF0QSk7XG5cbiAgICB0aGlzLl9tZXNoUGl0Y2gucG9zaXRpb24uY29weShfdjNBKTtcbiAgICB0aGlzLl9tZXNoUGl0Y2gucXVhdGVybmlvbi5jb3B5KF9xdWF0QSk7XG4gICAgdGhpcy5fbWVzaFBpdGNoLnF1YXRlcm5pb24ubXVsdGlwbHkoX3F1YXRCLnNldEZyb21BeGlzQW5nbGUoVkVDM19QT1NJVElWRV9ZLCB5YXcpKTtcbiAgICB0aGlzLl9tZXNoUGl0Y2gucXVhdGVybmlvbi5tdWx0aXBseShRVUFUX1hZX0NXOTApO1xuXG4gICAgLy8gdXBkYXRlIHRhcmdldCBsaW5lIGFuZCBzcGhlcmVcbiAgICBjb25zdCB7IHRhcmdldCwgYXV0b1VwZGF0ZSB9ID0gdGhpcy52cm1Mb29rQXQ7XG4gICAgaWYgKHRhcmdldCAhPSBudWxsICYmIGF1dG9VcGRhdGUpIHtcbiAgICAgIHRhcmdldC5nZXRXb3JsZFBvc2l0aW9uKF92M0IpLnN1YihfdjNBKTtcbiAgICAgIHRoaXMuX2xpbmVUYXJnZXQuZ2VvbWV0cnkudGFpbC5jb3B5KF92M0IpO1xuICAgICAgdGhpcy5fbGluZVRhcmdldC5nZW9tZXRyeS51cGRhdGUoKTtcbiAgICAgIHRoaXMuX2xpbmVUYXJnZXQucG9zaXRpb24uY29weShfdjNBKTtcbiAgICB9XG5cbiAgICAvLyBhcHBseSB0cmFuc2Zvcm0gdG8gbWVzaGVzXG4gICAgc3VwZXIudXBkYXRlTWF0cml4V29ybGQoZm9yY2UpO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG5leHBvcnQgY2xhc3MgRmFuQnVmZmVyR2VvbWV0cnkgZXh0ZW5kcyBUSFJFRS5CdWZmZXJHZW9tZXRyeSB7XG4gIHB1YmxpYyB0aGV0YTogbnVtYmVyO1xuICBwdWJsaWMgcmFkaXVzOiBudW1iZXI7XG4gIHByaXZhdGUgX2N1cnJlbnRUaGV0YSA9IDA7XG4gIHByaXZhdGUgX2N1cnJlbnRSYWRpdXMgPSAwO1xuICBwcml2YXRlIHJlYWRvbmx5IF9hdHRyUG9zOiBUSFJFRS5CdWZmZXJBdHRyaWJ1dGU7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2F0dHJJbmRleDogVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy50aGV0YSA9IDAuMDtcbiAgICB0aGlzLnJhZGl1cyA9IDAuMDtcbiAgICB0aGlzLl9jdXJyZW50VGhldGEgPSAwLjA7XG4gICAgdGhpcy5fY3VycmVudFJhZGl1cyA9IDAuMDtcblxuICAgIHRoaXMuX2F0dHJQb3MgPSBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKG5ldyBGbG9hdDMyQXJyYXkoNjUgKiAzKSwgMyk7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJywgdGhpcy5fYXR0clBvcyk7XG5cbiAgICB0aGlzLl9hdHRySW5kZXggPSBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKG5ldyBVaW50MTZBcnJheSgzICogNjMpLCAxKTtcbiAgICB0aGlzLnNldEluZGV4KHRoaXMuX2F0dHJJbmRleCk7XG5cbiAgICB0aGlzLl9idWlsZEluZGV4KCk7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgbGV0IHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gZmFsc2U7XG5cbiAgICBpZiAodGhpcy5fY3VycmVudFRoZXRhICE9PSB0aGlzLnRoZXRhKSB7XG4gICAgICB0aGlzLl9jdXJyZW50VGhldGEgPSB0aGlzLnRoZXRhO1xuICAgICAgc2hvdWxkVXBkYXRlR2VvbWV0cnkgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9jdXJyZW50UmFkaXVzICE9PSB0aGlzLnJhZGl1cykge1xuICAgICAgdGhpcy5fY3VycmVudFJhZGl1cyA9IHRoaXMucmFkaXVzO1xuICAgICAgc2hvdWxkVXBkYXRlR2VvbWV0cnkgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmIChzaG91bGRVcGRhdGVHZW9tZXRyeSkge1xuICAgICAgdGhpcy5fYnVpbGRQb3NpdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2J1aWxkUG9zaXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5fYXR0clBvcy5zZXRYWVooMCwgMC4wLCAwLjAsIDAuMCk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY0OyBpKyspIHtcbiAgICAgIGNvbnN0IHQgPSAoaSAvIDYzLjApICogdGhpcy5fY3VycmVudFRoZXRhO1xuXG4gICAgICB0aGlzLl9hdHRyUG9zLnNldFhZWihpICsgMSwgdGhpcy5fY3VycmVudFJhZGl1cyAqIE1hdGguc2luKHQpLCAwLjAsIHRoaXMuX2N1cnJlbnRSYWRpdXMgKiBNYXRoLmNvcyh0KSk7XG4gICAgfVxuXG4gICAgdGhpcy5fYXR0clBvcy5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIF9idWlsZEluZGV4KCk6IHZvaWQge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNjM7IGkrKykge1xuICAgICAgdGhpcy5fYXR0ckluZGV4LnNldFhZWihpICogMywgMCwgaSArIDEsIGkgKyAyKTtcbiAgICB9XG5cbiAgICB0aGlzLl9hdHRySW5kZXgubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG5leHBvcnQgY2xhc3MgTGluZUFuZFNwaGVyZUJ1ZmZlckdlb21ldHJ5IGV4dGVuZHMgVEhSRUUuQnVmZmVyR2VvbWV0cnkge1xuICBwdWJsaWMgcmFkaXVzOiBudW1iZXI7XG4gIHB1YmxpYyB0YWlsOiBUSFJFRS5WZWN0b3IzO1xuICBwcml2YXRlIF9jdXJyZW50UmFkaXVzOiBudW1iZXI7XG4gIHByaXZhdGUgX2N1cnJlbnRUYWlsOiBUSFJFRS5WZWN0b3IzO1xuICBwcml2YXRlIHJlYWRvbmx5IF9hdHRyUG9zOiBUSFJFRS5CdWZmZXJBdHRyaWJ1dGU7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2F0dHJJbmRleDogVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5yYWRpdXMgPSAwLjA7XG4gICAgdGhpcy5fY3VycmVudFJhZGl1cyA9IDAuMDtcblxuICAgIHRoaXMudGFpbCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG4gICAgdGhpcy5fY3VycmVudFRhaWwgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4gICAgdGhpcy5fYXR0clBvcyA9IG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUobmV3IEZsb2F0MzJBcnJheSgyOTQpLCAzKTtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgncG9zaXRpb24nLCB0aGlzLl9hdHRyUG9zKTtcblxuICAgIHRoaXMuX2F0dHJJbmRleCA9IG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUobmV3IFVpbnQxNkFycmF5KDE5NCksIDEpO1xuICAgIHRoaXMuc2V0SW5kZXgodGhpcy5fYXR0ckluZGV4KTtcblxuICAgIHRoaXMuX2J1aWxkSW5kZXgoKTtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBsZXQgc2hvdWxkVXBkYXRlR2VvbWV0cnkgPSBmYWxzZTtcblxuICAgIGlmICh0aGlzLl9jdXJyZW50UmFkaXVzICE9PSB0aGlzLnJhZGl1cykge1xuICAgICAgdGhpcy5fY3VycmVudFJhZGl1cyA9IHRoaXMucmFkaXVzO1xuICAgICAgc2hvdWxkVXBkYXRlR2VvbWV0cnkgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fY3VycmVudFRhaWwuZXF1YWxzKHRoaXMudGFpbCkpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRUYWlsLmNvcHkodGhpcy50YWlsKTtcbiAgICAgIHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoc2hvdWxkVXBkYXRlR2VvbWV0cnkpIHtcbiAgICAgIHRoaXMuX2J1aWxkUG9zaXRpb24oKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9idWlsZFBvc2l0aW9uKCk6IHZvaWQge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzI7IGkrKykge1xuICAgICAgY29uc3QgdCA9IChpIC8gMTYuMCkgKiBNYXRoLlBJO1xuXG4gICAgICB0aGlzLl9hdHRyUG9zLnNldFhZWihpLCBNYXRoLmNvcyh0KSwgTWF0aC5zaW4odCksIDAuMCk7XG4gICAgICB0aGlzLl9hdHRyUG9zLnNldFhZWigzMiArIGksIDAuMCwgTWF0aC5jb3ModCksIE1hdGguc2luKHQpKTtcbiAgICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKDY0ICsgaSwgTWF0aC5zaW4odCksIDAuMCwgTWF0aC5jb3ModCkpO1xuICAgIH1cblxuICAgIHRoaXMuc2NhbGUodGhpcy5fY3VycmVudFJhZGl1cywgdGhpcy5fY3VycmVudFJhZGl1cywgdGhpcy5fY3VycmVudFJhZGl1cyk7XG4gICAgdGhpcy50cmFuc2xhdGUodGhpcy5fY3VycmVudFRhaWwueCwgdGhpcy5fY3VycmVudFRhaWwueSwgdGhpcy5fY3VycmVudFRhaWwueik7XG5cbiAgICB0aGlzLl9hdHRyUG9zLnNldFhZWig5NiwgMCwgMCwgMCk7XG4gICAgdGhpcy5fYXR0clBvcy5zZXRYWVooOTcsIHRoaXMuX2N1cnJlbnRUYWlsLngsIHRoaXMuX2N1cnJlbnRUYWlsLnksIHRoaXMuX2N1cnJlbnRUYWlsLnopO1xuXG4gICAgdGhpcy5fYXR0clBvcy5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIF9idWlsZEluZGV4KCk6IHZvaWQge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzI7IGkrKykge1xuICAgICAgY29uc3QgaTEgPSAoaSArIDEpICUgMzI7XG5cbiAgICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWShpICogMiwgaSwgaTEpO1xuICAgICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKDY0ICsgaSAqIDIsIDMyICsgaSwgMzIgKyBpMSk7XG4gICAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoMTI4ICsgaSAqIDIsIDY0ICsgaSwgNjQgKyBpMSk7XG4gICAgfVxuICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWSgxOTIsIDk2LCA5Nyk7XG5cbiAgICB0aGlzLl9hdHRySW5kZXgubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNSHVtYW5vaWQgfSBmcm9tICcuLi9odW1hbm9pZCc7XG5pbXBvcnQgeyBnZXRXb3JsZFF1YXRlcm5pb25MaXRlIH0gZnJvbSAnLi4vdXRpbHMvZ2V0V29ybGRRdWF0ZXJuaW9uTGl0ZSc7XG5pbXBvcnQgeyBxdWF0SW52ZXJ0Q29tcGF0IH0gZnJvbSAnLi4vdXRpbHMvcXVhdEludmVydENvbXBhdCc7XG5pbXBvcnQgeyBjYWxjQXppbXV0aEFsdGl0dWRlIH0gZnJvbSAnLi91dGlscy9jYWxjQXppbXV0aEFsdGl0dWRlJztcbmltcG9ydCB0eXBlIHsgVlJNTG9va0F0QXBwbGllciB9IGZyb20gJy4vVlJNTG9va0F0QXBwbGllcic7XG5pbXBvcnQgeyBzYW5pdGl6ZUFuZ2xlIH0gZnJvbSAnLi91dGlscy9zYW5pdGl6ZUFuZ2xlJztcblxuY29uc3QgVkVDM19QT1NJVElWRV9aID0gbmV3IFRIUkVFLlZlY3RvcjMoMC4wLCAwLjAsIDEuMCk7XG5cbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3YzQiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfdjNDID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF9xdWF0QSA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5jb25zdCBfcXVhdEIgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuY29uc3QgX3F1YXRDID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbmNvbnN0IF9xdWF0RCA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5jb25zdCBfZXVsZXJBID0gbmV3IFRIUkVFLkV1bGVyKCk7XG5cbi8qKlxuICogQSBjbGFzcyBjb250cm9scyBleWUgZ2F6ZSBtb3ZlbWVudHMgb2YgYSBWUk0uXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1Mb29rQXQge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEVVTEVSX09SREVSID0gJ1lYWic7IC8vIHlhdy1waXRjaC1yb2xsXG5cbiAgLyoqXG4gICAqIFRoZSBvcmlnaW4gb2YgTG9va0F0LiBQb3NpdGlvbiBvZmZzZXQgZnJvbSB0aGUgaGVhZCBib25lLlxuICAgKi9cbiAgcHVibGljIG9mZnNldEZyb21IZWFkQm9uZSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbiAgLyoqXG4gICAqIEl0cyBhc3NvY2lhdGVkIHtAbGluayBWUk1IdW1hbm9pZH0uXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgaHVtYW5vaWQ6IFZSTUh1bWFub2lkO1xuXG4gIC8qKlxuICAgKiBUaGUge0BsaW5rIFZSTUxvb2tBdEFwcGxpZXJ9IG9mIHRoZSBMb29rQXQuXG4gICAqL1xuICBwdWJsaWMgYXBwbGllcjogVlJNTG9va0F0QXBwbGllcjtcblxuICAvKipcbiAgICogSWYgdGhpcyBpcyB0cnVlLCB0aGUgTG9va0F0IHdpbGwgYmUgdXBkYXRlZCBhdXRvbWF0aWNhbGx5IGJ5IGNhbGxpbmcge0BsaW5rIHVwZGF0ZX0sIHRvd2FyZGluZyB0aGUgZGlyZWN0aW9uIHRvIHRoZSB7QGxpbmsgdGFyZ2V0fS5cbiAgICogYHRydWVgIGJ5IGRlZmF1bHQuXG4gICAqXG4gICAqIFNlZSBhbHNvOiB7QGxpbmsgdGFyZ2V0fVxuICAgKi9cbiAgcHVibGljIGF1dG9VcGRhdGUgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBUaGUgdGFyZ2V0IG9iamVjdCBvZiB0aGUgTG9va0F0LlxuICAgKiBOb3RlIHRoYXQgaXQgZG9lcyBub3QgbWFrZSBhbnkgc2Vuc2UgaWYge0BsaW5rIGF1dG9VcGRhdGV9IGlzIGRpc2FibGVkLlxuICAgKlxuICAgKiBTZWUgYWxzbzoge0BsaW5rIGF1dG9VcGRhdGV9XG4gICAqL1xuICBwdWJsaWMgdGFyZ2V0PzogVEhSRUUuT2JqZWN0M0QgfCBudWxsO1xuXG4gIC8qKlxuICAgKiBUaGUgZnJvbnQgZGlyZWN0aW9uIG9mIHRoZSBmYWNlLlxuICAgKiBJbnRlbmRlZCB0byBiZSB1c2VkIGZvciBWUk0gMC4wIGNvbXBhdCAoVlJNIDAuMCBtb2RlbHMgYXJlIGZhY2luZyBaLSBpbnN0ZWFkIG9mIForKS5cbiAgICogWW91IHVzdWFsbHkgZG9uJ3Qgd2FudCB0byB0b3VjaCB0aGlzLlxuICAgKi9cbiAgcHVibGljIGZhY2VGcm9udCA9IG5ldyBUSFJFRS5WZWN0b3IzKDAuMCwgMC4wLCAxLjApO1xuXG4gIC8qKlxuICAgKiBJdHMgY3VycmVudCBhbmdsZSBhcm91bmQgWSBheGlzLCBpbiBkZWdyZWUuXG4gICAqL1xuICBwcm90ZWN0ZWQgX3lhdzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBJdHMgY3VycmVudCBhbmdsZSBhcm91bmQgWSBheGlzLCBpbiBkZWdyZWUuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHlhdygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl95YXc7XG4gIH1cblxuICAvKipcbiAgICogSXRzIGN1cnJlbnQgYW5nbGUgYXJvdW5kIFkgYXhpcywgaW4gZGVncmVlLlxuICAgKi9cbiAgcHVibGljIHNldCB5YXcodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX3lhdyA9IHZhbHVlO1xuICAgIHRoaXMuX25lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdHMgY3VycmVudCBhbmdsZSBhcm91bmQgWCBheGlzLCBpbiBkZWdyZWUuXG4gICAqL1xuICBwcm90ZWN0ZWQgX3BpdGNoOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEl0cyBjdXJyZW50IGFuZ2xlIGFyb3VuZCBYIGF4aXMsIGluIGRlZ3JlZS5cbiAgICovXG4gIHB1YmxpYyBnZXQgcGl0Y2goKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fcGl0Y2g7XG4gIH1cblxuICAvKipcbiAgICogSXRzIGN1cnJlbnQgYW5nbGUgYXJvdW5kIFggYXhpcywgaW4gZGVncmVlLlxuICAgKi9cbiAgcHVibGljIHNldCBwaXRjaCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fcGl0Y2ggPSB2YWx1ZTtcbiAgICB0aGlzLl9uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogU3BlY2lmaWVzIHRoYXQgYW5nbGVzIG5lZWQgdG8gYmUgYXBwbGllZCB0byBpdHMgW0BsaW5rIGFwcGxpZXJdLlxuICAgKi9cbiAgcHJvdGVjdGVkIF9uZWVkc1VwZGF0ZTogYm9vbGVhbjtcblxuICAvKipcbiAgICogV29ybGQgcm90YXRpb24gb2YgdGhlIGhlYWQgaW4gaXRzIHJlc3QgcG9zZS5cbiAgICovXG4gIHByaXZhdGUgX3Jlc3RIZWFkV29ybGRRdWF0ZXJuaW9uOiBUSFJFRS5RdWF0ZXJuaW9uO1xuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBVc2Uge0BsaW5rIGdldEV1bGVyfSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIGdldCBldWxlcigpOiBUSFJFRS5FdWxlciB7XG4gICAgY29uc29sZS53YXJuKCdWUk1Mb29rQXQ6IGV1bGVyIGlzIGRlcHJlY2F0ZWQuIHVzZSBnZXRFdWxlcigpIGluc3RlYWQuJyk7XG5cbiAgICByZXR1cm4gdGhpcy5nZXRFdWxlcihuZXcgVEhSRUUuRXVsZXIoKSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IHtAbGluayBWUk1Mb29rQXR9LlxuICAgKlxuICAgKiBAcGFyYW0gaHVtYW5vaWQgQSB7QGxpbmsgVlJNSHVtYW5vaWR9XG4gICAqIEBwYXJhbSBhcHBsaWVyIEEge0BsaW5rIFZSTUxvb2tBdEFwcGxpZXJ9XG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoaHVtYW5vaWQ6IFZSTUh1bWFub2lkLCBhcHBsaWVyOiBWUk1Mb29rQXRBcHBsaWVyKSB7XG4gICAgdGhpcy5odW1hbm9pZCA9IGh1bWFub2lkO1xuICAgIHRoaXMuYXBwbGllciA9IGFwcGxpZXI7XG5cbiAgICB0aGlzLl95YXcgPSAwLjA7XG4gICAgdGhpcy5fcGl0Y2ggPSAwLjA7XG4gICAgdGhpcy5fbmVlZHNVcGRhdGUgPSB0cnVlO1xuXG4gICAgdGhpcy5fcmVzdEhlYWRXb3JsZFF1YXRlcm5pb24gPSB0aGlzLmdldExvb2tBdFdvcmxkUXVhdGVybmlvbihuZXcgVEhSRUUuUXVhdGVybmlvbigpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgaXRzIHlhdy1waXRjaCBhbmdsZXMgYXMgYW4gYEV1bGVyYC5cbiAgICogRG9lcyBOT1QgY29uc2lkZXIge0BsaW5rIGZhY2VGcm9udH07IGl0IHJldHVybnMgYEV1bGVyKDAsIDAsIDA7IFwiWVhaXCIpYCBieSBkZWZhdWx0IHJlZ2FyZGxlc3Mgb2YgdGhlIGZhY2VGcm9udCB2YWx1ZS5cbiAgICpcbiAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IGV1bGVyXG4gICAqL1xuICBwdWJsaWMgZ2V0RXVsZXIodGFyZ2V0OiBUSFJFRS5FdWxlcik6IFRIUkVFLkV1bGVyIHtcbiAgICByZXR1cm4gdGFyZ2V0LnNldChUSFJFRS5NYXRoVXRpbHMuREVHMlJBRCAqIHRoaXMuX3BpdGNoLCBUSFJFRS5NYXRoVXRpbHMuREVHMlJBRCAqIHRoaXMuX3lhdywgMC4wLCAnWVhaJyk7XG4gIH1cblxuICAvKipcbiAgICogQ29weSB0aGUgZ2l2ZW4ge0BsaW5rIFZSTUxvb2tBdH0gaW50byB0aGlzIG9uZS5cbiAgICoge0BsaW5rIGh1bWFub2lkfSBtdXN0IGJlIHNhbWUgYXMgdGhlIHNvdXJjZSBvbmUuXG4gICAqIHtAbGluayBhcHBsaWVyfSB3aWxsIHJlZmVyZW5jZSB0aGUgc2FtZSBpbnN0YW5jZSBhcyB0aGUgc291cmNlIG9uZS5cbiAgICogQHBhcmFtIHNvdXJjZSBUaGUge0BsaW5rIFZSTUxvb2tBdH0geW91IHdhbnQgdG8gY29weVxuICAgKiBAcmV0dXJucyB0aGlzXG4gICAqL1xuICBwdWJsaWMgY29weShzb3VyY2U6IFZSTUxvb2tBdCk6IHRoaXMge1xuICAgIGlmICh0aGlzLmh1bWFub2lkICE9PSBzb3VyY2UuaHVtYW5vaWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVlJNTG9va0F0OiBodW1hbm9pZCBtdXN0IGJlIHNhbWUgaW4gb3JkZXIgdG8gY29weScpO1xuICAgIH1cblxuICAgIHRoaXMub2Zmc2V0RnJvbUhlYWRCb25lLmNvcHkoc291cmNlLm9mZnNldEZyb21IZWFkQm9uZSk7XG4gICAgdGhpcy5hcHBsaWVyID0gc291cmNlLmFwcGxpZXI7XG4gICAgdGhpcy5hdXRvVXBkYXRlID0gc291cmNlLmF1dG9VcGRhdGU7XG4gICAgdGhpcy50YXJnZXQgPSBzb3VyY2UudGFyZ2V0O1xuICAgIHRoaXMuZmFjZUZyb250LmNvcHkoc291cmNlLmZhY2VGcm9udCk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgY2xvbmUgb2YgdGhpcyB7QGxpbmsgVlJNTG9va0F0fS5cbiAgICogTm90ZSB0aGF0IHtAbGluayBodW1hbm9pZH0gYW5kIHtAbGluayBhcHBsaWVyfSB3aWxsIHJlZmVyZW5jZSB0aGUgc2FtZSBpbnN0YW5jZSBhcyB0aGlzIG9uZS5cbiAgICogQHJldHVybnMgQ29waWVkIHtAbGluayBWUk1Mb29rQXR9XG4gICAqL1xuICBwdWJsaWMgY2xvbmUoKTogVlJNTG9va0F0IHtcbiAgICByZXR1cm4gbmV3IFZSTUxvb2tBdCh0aGlzLmh1bWFub2lkLCB0aGlzLmFwcGxpZXIpLmNvcHkodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhlIGxvb2tBdCBkaXJlY3Rpb24gKHlhdyBhbmQgcGl0Y2gpIHRvIHRoZSBpbml0aWFsIGRpcmVjdGlvbi5cbiAgICovXG4gIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLl95YXcgPSAwLjA7XG4gICAgdGhpcy5fcGl0Y2ggPSAwLjA7XG4gICAgdGhpcy5fbmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBpdHMgbG9va0F0IHBvc2l0aW9uIGluIHdvcmxkIGNvb3JkaW5hdGUuXG4gICAqXG4gICAqIEBwYXJhbSB0YXJnZXQgQSB0YXJnZXQgYFRIUkVFLlZlY3RvcjNgXG4gICAqL1xuICBwdWJsaWMgZ2V0TG9va0F0V29ybGRQb3NpdGlvbih0YXJnZXQ6IFRIUkVFLlZlY3RvcjMpOiBUSFJFRS5WZWN0b3IzIHtcbiAgICBjb25zdCBoZWFkID0gdGhpcy5odW1hbm9pZC5nZXRSYXdCb25lTm9kZSgnaGVhZCcpITtcblxuICAgIHJldHVybiB0YXJnZXQuY29weSh0aGlzLm9mZnNldEZyb21IZWFkQm9uZSkuYXBwbHlNYXRyaXg0KGhlYWQubWF0cml4V29ybGQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBpdHMgbG9va0F0IHJvdGF0aW9uIGluIHdvcmxkIGNvb3JkaW5hdGUuXG4gICAqIERvZXMgTk9UIGNvbnNpZGVyIHtAbGluayBmYWNlRnJvbnR9LlxuICAgKlxuICAgKiBAcGFyYW0gdGFyZ2V0IEEgdGFyZ2V0IGBUSFJFRS5RdWF0ZXJuaW9uYFxuICAgKi9cbiAgcHVibGljIGdldExvb2tBdFdvcmxkUXVhdGVybmlvbih0YXJnZXQ6IFRIUkVFLlF1YXRlcm5pb24pOiBUSFJFRS5RdWF0ZXJuaW9uIHtcbiAgICBjb25zdCBoZWFkID0gdGhpcy5odW1hbm9pZC5nZXRSYXdCb25lTm9kZSgnaGVhZCcpITtcblxuICAgIHJldHVybiBnZXRXb3JsZFF1YXRlcm5pb25MaXRlKGhlYWQsIHRhcmdldCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgcXVhdGVybmlvbiB0aGF0IHJvdGF0ZXMgdGhlICtaIHVuaXQgdmVjdG9yIG9mIHRoZSBodW1hbm9pZCBIZWFkIHRvIHRoZSB7QGxpbmsgZmFjZUZyb250fSBkaXJlY3Rpb24uXG4gICAqXG4gICAqIEBwYXJhbSB0YXJnZXQgQSB0YXJnZXQgYFRIUkVFLlF1YXRlcm5pb25gXG4gICAqL1xuICBwdWJsaWMgZ2V0RmFjZUZyb250UXVhdGVybmlvbih0YXJnZXQ6IFRIUkVFLlF1YXRlcm5pb24pOiBUSFJFRS5RdWF0ZXJuaW9uIHtcbiAgICBpZiAodGhpcy5mYWNlRnJvbnQuZGlzdGFuY2VUb1NxdWFyZWQoVkVDM19QT1NJVElWRV9aKSA8IDAuMDEpIHtcbiAgICAgIHJldHVybiB0YXJnZXQuY29weSh0aGlzLl9yZXN0SGVhZFdvcmxkUXVhdGVybmlvbikuaW52ZXJ0KCk7XG4gICAgfVxuXG4gICAgY29uc3QgW2ZhY2VGcm9udEF6aW11dGgsIGZhY2VGcm9udEFsdGl0dWRlXSA9IGNhbGNBemltdXRoQWx0aXR1ZGUodGhpcy5mYWNlRnJvbnQpO1xuICAgIF9ldWxlckEuc2V0KDAuMCwgMC41ICogTWF0aC5QSSArIGZhY2VGcm9udEF6aW11dGgsIGZhY2VGcm9udEFsdGl0dWRlLCAnWVpYJyk7XG5cbiAgICByZXR1cm4gdGFyZ2V0LnNldEZyb21FdWxlcihfZXVsZXJBKS5wcmVtdWx0aXBseShfcXVhdEQuY29weSh0aGlzLl9yZXN0SGVhZFdvcmxkUXVhdGVybmlvbikuaW52ZXJ0KCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBpdHMgTG9va0F0IGRpcmVjdGlvbiBpbiB3b3JsZCBjb29yZGluYXRlLlxuICAgKlxuICAgKiBAcGFyYW0gdGFyZ2V0IEEgdGFyZ2V0IGBUSFJFRS5WZWN0b3IzYFxuICAgKi9cbiAgcHVibGljIGdldExvb2tBdFdvcmxkRGlyZWN0aW9uKHRhcmdldDogVEhSRUUuVmVjdG9yMyk6IFRIUkVFLlZlY3RvcjMge1xuICAgIHRoaXMuZ2V0TG9va0F0V29ybGRRdWF0ZXJuaW9uKF9xdWF0Qik7XG4gICAgdGhpcy5nZXRGYWNlRnJvbnRRdWF0ZXJuaW9uKF9xdWF0Qyk7XG5cbiAgICByZXR1cm4gdGFyZ2V0XG4gICAgICAuY29weShWRUMzX1BPU0lUSVZFX1opXG4gICAgICAuYXBwbHlRdWF0ZXJuaW9uKF9xdWF0QilcbiAgICAgIC5hcHBseVF1YXRlcm5pb24oX3F1YXRDKVxuICAgICAgLmFwcGx5RXVsZXIodGhpcy5nZXRFdWxlcihfZXVsZXJBKSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGl0cyBsb29rQXQgdGFyZ2V0IHBvc2l0aW9uLlxuICAgKlxuICAgKiBOb3RlIHRoYXQgaXRzIHJlc3VsdCB3aWxsIGJlIGluc3RhbnRseSBvdmVyd3JpdHRlbiBpZiB7QGxpbmsgVlJNTG9va0F0SGVhZC5hdXRvVXBkYXRlfSBpcyBlbmFibGVkLlxuICAgKlxuICAgKiBJZiB5b3Ugd2FudCB0byB0cmFjayBhbiBvYmplY3QgY29udGludW91c2x5LCB5b3UgbWlnaHQgd2FudCB0byB1c2Uge0BsaW5rIHRhcmdldH0gaW5zdGVhZC5cbiAgICpcbiAgICogQHBhcmFtIHBvc2l0aW9uIEEgdGFyZ2V0IHBvc2l0aW9uLCBpbiB3b3JsZCBzcGFjZVxuICAgKi9cbiAgcHVibGljIGxvb2tBdChwb3NpdGlvbjogVEhSRUUuVmVjdG9yMyk6IHZvaWQge1xuICAgIC8vIExvb2sgYXQgZGlyZWN0aW9uIGluIGxvY2FsIGNvb3JkaW5hdGVcbiAgICBjb25zdCBoZWFkUm90RGlmZkludiA9IF9xdWF0QVxuICAgICAgLmNvcHkodGhpcy5fcmVzdEhlYWRXb3JsZFF1YXRlcm5pb24pXG4gICAgICAubXVsdGlwbHkocXVhdEludmVydENvbXBhdCh0aGlzLmdldExvb2tBdFdvcmxkUXVhdGVybmlvbihfcXVhdEIpKSk7XG4gICAgY29uc3QgaGVhZFBvcyA9IHRoaXMuZ2V0TG9va0F0V29ybGRQb3NpdGlvbihfdjNCKTtcbiAgICBjb25zdCBsb29rQXREaXIgPSBfdjNDLmNvcHkocG9zaXRpb24pLnN1YihoZWFkUG9zKS5hcHBseVF1YXRlcm5pb24oaGVhZFJvdERpZmZJbnYpLm5vcm1hbGl6ZSgpO1xuXG4gICAgLy8gY2FsY3VsYXRlIGFuZ2xlc1xuICAgIGNvbnN0IFthemltdXRoRnJvbSwgYWx0aXR1ZGVGcm9tXSA9IGNhbGNBemltdXRoQWx0aXR1ZGUodGhpcy5mYWNlRnJvbnQpO1xuICAgIGNvbnN0IFthemltdXRoVG8sIGFsdGl0dWRlVG9dID0gY2FsY0F6aW11dGhBbHRpdHVkZShsb29rQXREaXIpO1xuICAgIGNvbnN0IHlhdyA9IHNhbml0aXplQW5nbGUoYXppbXV0aFRvIC0gYXppbXV0aEZyb20pO1xuICAgIGNvbnN0IHBpdGNoID0gc2FuaXRpemVBbmdsZShhbHRpdHVkZUZyb20gLSBhbHRpdHVkZVRvKTsgLy8gc3Bpbm5pbmcgKDEsIDAsIDApIENDVyBhcm91bmQgWiBheGlzIG1ha2VzIHRoZSB2ZWN0b3IgbG9vayB1cCwgd2hpbGUgc3Bpbm5pbmcgKDAsIDAsIDEpIENDVyBhcm91bmQgWCBheGlzIG1ha2VzIHRoZSB2ZWN0b3IgbG9vayBkb3duXG5cbiAgICAvLyBhcHBseSBhbmdsZXNcbiAgICB0aGlzLl95YXcgPSBUSFJFRS5NYXRoVXRpbHMuUkFEMkRFRyAqIHlhdztcbiAgICB0aGlzLl9waXRjaCA9IFRIUkVFLk1hdGhVdGlscy5SQUQyREVHICogcGl0Y2g7XG5cbiAgICB0aGlzLl9uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSBWUk1Mb29rQXRIZWFkLlxuICAgKiBJZiB7QGxpbmsgYXV0b1VwZGF0ZX0gaXMgZW5hYmxlZCwgdGhpcyB3aWxsIG1ha2UgaXQgbG9vayBhdCB0aGUge0BsaW5rIHRhcmdldH0uXG4gICAqXG4gICAqIEBwYXJhbSBkZWx0YSBkZWx0YVRpbWUsIGl0IGlzbid0IHVzZWQgdGhvdWdoLiBZb3UgY2FuIHVzZSB0aGUgcGFyYW1ldGVyIGlmIHlvdSB3YW50IHRvIHVzZSB0aGlzIGluIHlvdXIgb3duIGV4dGVuZGVkIHtAbGluayBWUk1Mb29rQXR9LlxuICAgKi9cbiAgcHVibGljIHVwZGF0ZShkZWx0YTogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudGFyZ2V0ICE9IG51bGwgJiYgdGhpcy5hdXRvVXBkYXRlKSB7XG4gICAgICB0aGlzLmxvb2tBdCh0aGlzLnRhcmdldC5nZXRXb3JsZFBvc2l0aW9uKF92M0EpKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fbmVlZHNVcGRhdGUpIHtcbiAgICAgIHRoaXMuX25lZWRzVXBkYXRlID0gZmFsc2U7XG5cbiAgICAgIHRoaXMuYXBwbGllci5hcHBseVlhd1BpdGNoKHRoaXMuX3lhdywgdGhpcy5fcGl0Y2gpO1xuICAgIH1cbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuY29uc3QgX3Bvc2l0aW9uID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF9zY2FsZSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbi8qKlxuICogQSByZXBsYWNlbWVudCBvZiBgT2JqZWN0M0QuZ2V0V29ybGRRdWF0ZXJuaW9uYC5cbiAqIEV4dHJhY3QgdGhlIHdvcmxkIHF1YXRlcm5pb24gb2YgYW4gb2JqZWN0IGZyb20gaXRzIHdvcmxkIHNwYWNlIG1hdHJpeCwgd2l0aG91dCBjYWxsaW5nIGBPYmplY3QzRC51cGRhdGVXb3JsZE1hdHJpeGAuXG4gKiBVc2UgdGhpcyB3aGVuIHlvdSdyZSBzdXJlIHRoYXQgdGhlIHdvcmxkIG1hdHJpeCBpcyB1cC10by1kYXRlLlxuICpcbiAqIEBwYXJhbSBvYmplY3QgVGhlIG9iamVjdFxuICogQHBhcmFtIG91dCBBIHRhcmdldCBxdWF0ZXJuaW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRXb3JsZFF1YXRlcm5pb25MaXRlKG9iamVjdDogVEhSRUUuT2JqZWN0M0QsIG91dDogVEhSRUUuUXVhdGVybmlvbik6IFRIUkVFLlF1YXRlcm5pb24ge1xuICBvYmplY3QubWF0cml4V29ybGQuZGVjb21wb3NlKF9wb3NpdGlvbiwgb3V0LCBfc2NhbGUpO1xuICByZXR1cm4gb3V0O1xufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBDYWxjdWxhdGUgYXppbXV0aCAvIGFsdGl0dWRlIGFuZ2xlcyBmcm9tIGEgdmVjdG9yLlxuICpcbiAqIFRoaXMgcmV0dXJucyBhIGRpZmZlcmVuY2Ugb2YgYW5nbGVzIGZyb20gKDEsIDAsIDApLlxuICogQXppbXV0aCByZXByZXNlbnRzIGFuIGFuZ2xlIGFyb3VuZCBZIGF4aXMuXG4gKiBBbHRpdHVkZSByZXByZXNlbnRzIGFuIGFuZ2xlIGFyb3VuZCBaIGF4aXMuXG4gKiBJdCBpcyByb3RhdGVkIGluIGludHJpbnNpYyBZLVogb3JkZXIuXG4gKlxuICogQHBhcmFtIHZlY3RvciBUaGUgdmVjdG9yXG4gKiBAcmV0dXJucyBBIHR1cGxlIGNvbnRhaW5zIHR3byBhbmdsZXMsIGBbIGF6aW11dGgsIGFsdGl0dWRlIF1gXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYWxjQXppbXV0aEFsdGl0dWRlKHZlY3RvcjogVEhSRUUuVmVjdG9yMyk6IFthemltdXRoOiBudW1iZXIsIGFsdGl0dWRlOiBudW1iZXJdIHtcbiAgcmV0dXJuIFtNYXRoLmF0YW4yKC12ZWN0b3IueiwgdmVjdG9yLngpLCBNYXRoLmF0YW4yKHZlY3Rvci55LCBNYXRoLnNxcnQodmVjdG9yLnggKiB2ZWN0b3IueCArIHZlY3Rvci56ICogdmVjdG9yLnopKV07XG59XG4iLCAiLyoqXG4gKiBNYWtlIHN1cmUgdGhlIGFuZ2xlIGlzIHdpdGhpbiAtUEkgdG8gUEkuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYGpzXG4gKiBzYW5pdGl6ZUFuZ2xlKDEuNSAqIE1hdGguUEkpIC8vIC0wLjUgKiBQSVxuICogYGBgXG4gKlxuICogQHBhcmFtIGFuZ2xlIEFuIGlucHV0IGFuZ2xlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzYW5pdGl6ZUFuZ2xlKGFuZ2xlOiBudW1iZXIpOiBudW1iZXIge1xuICBjb25zdCByb3VuZFR1cm4gPSBNYXRoLnJvdW5kKGFuZ2xlIC8gMi4wIC8gTWF0aC5QSSk7XG4gIHJldHVybiBhbmdsZSAtIDIuMCAqIE1hdGguUEkgKiByb3VuZFR1cm47XG59XG4iLCAiaW1wb3J0IHsgVlJNSHVtYW5vaWQgfSBmcm9tICcuLi9odW1hbm9pZCc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgdHlwZSB7IFZSTUxvb2tBdEFwcGxpZXIgfSBmcm9tICcuL1ZSTUxvb2tBdEFwcGxpZXInO1xuaW1wb3J0IHsgVlJNTG9va0F0UmFuZ2VNYXAgfSBmcm9tICcuL1ZSTUxvb2tBdFJhbmdlTWFwJztcbmltcG9ydCB7IGNhbGNBemltdXRoQWx0aXR1ZGUgfSBmcm9tICcuL3V0aWxzL2NhbGNBemltdXRoQWx0aXR1ZGUnO1xuaW1wb3J0IHsgZ2V0V29ybGRRdWF0ZXJuaW9uTGl0ZSB9IGZyb20gJy4uL3V0aWxzL2dldFdvcmxkUXVhdGVybmlvbkxpdGUnO1xuXG5jb25zdCBWRUMzX1BPU0lUSVZFX1ogPSBuZXcgVEhSRUUuVmVjdG9yMygwLjAsIDAuMCwgMS4wKTtcblxuY29uc3QgX3F1YXRBID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbmNvbnN0IF9xdWF0QiA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5jb25zdCBfZXVsZXJBID0gbmV3IFRIUkVFLkV1bGVyKDAuMCwgMC4wLCAwLjAsICdZWFonKTtcblxuLyoqXG4gKiBBIGNsYXNzIHRoYXQgYXBwbGllcyBleWUgZ2F6ZSBkaXJlY3Rpb25zIHRvIGEgVlJNLlxuICogSXQgd2lsbCBiZSB1c2VkIGJ5IHtAbGluayBWUk1Mb29rQXR9LlxuICovXG5leHBvcnQgY2xhc3MgVlJNTG9va0F0Qm9uZUFwcGxpZXIgaW1wbGVtZW50cyBWUk1Mb29rQXRBcHBsaWVyIHtcbiAgLyoqXG4gICAqIFJlcHJlc2VudCBpdHMgdHlwZSBvZiBhcHBsaWVyLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyByZWFkb25seSB0eXBlID0gJ2JvbmUnO1xuXG4gIC8qKlxuICAgKiBJdHMgYXNzb2NpYXRlZCB7QGxpbmsgVlJNSHVtYW5vaWR9LlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGh1bWFub2lkOiBWUk1IdW1hbm9pZDtcblxuICAvKipcbiAgICogQSB7QGxpbmsgVlJNTG9va0F0UmFuZ2VNYXB9IGZvciBob3Jpem9udGFsIGlud2FyZCBtb3ZlbWVudC4gVGhlIGxlZnQgZXllIG1vdmVzIHJpZ2h0LiBUaGUgcmlnaHQgZXllIG1vdmVzIGxlZnQuXG4gICAqL1xuICBwdWJsaWMgcmFuZ2VNYXBIb3Jpem9udGFsSW5uZXI6IFZSTUxvb2tBdFJhbmdlTWFwO1xuXG4gIC8qKlxuICAgKiBBIHtAbGluayBWUk1Mb29rQXRSYW5nZU1hcH0gZm9yIGhvcml6b250YWwgb3V0d2FyZCBtb3ZlbWVudC4gVGhlIGxlZnQgZXllIG1vdmVzIGxlZnQuIFRoZSByaWdodCBleWUgbW92ZXMgcmlnaHQuXG4gICAqL1xuICBwdWJsaWMgcmFuZ2VNYXBIb3Jpem9udGFsT3V0ZXI6IFZSTUxvb2tBdFJhbmdlTWFwO1xuXG4gIC8qKlxuICAgKiBBIHtAbGluayBWUk1Mb29rQXRSYW5nZU1hcH0gZm9yIHZlcnRpY2FsIGRvd253YXJkIG1vdmVtZW50LiBCb3RoIGV5ZXMgbW92ZSB1cHdhcmRzLlxuICAgKi9cbiAgcHVibGljIHJhbmdlTWFwVmVydGljYWxEb3duOiBWUk1Mb29rQXRSYW5nZU1hcDtcblxuICAvKipcbiAgICogQSB7QGxpbmsgVlJNTG9va0F0UmFuZ2VNYXB9IGZvciB2ZXJ0aWNhbCB1cHdhcmQgbW92ZW1lbnQuIEJvdGggZXllcyBtb3ZlIGRvd253YXJkcy5cbiAgICovXG4gIHB1YmxpYyByYW5nZU1hcFZlcnRpY2FsVXA6IFZSTUxvb2tBdFJhbmdlTWFwO1xuXG4gIC8qKlxuICAgKiBUaGUgZnJvbnQgZGlyZWN0aW9uIG9mIHRoZSBmYWNlLlxuICAgKiBJbnRlbmRlZCB0byBiZSB1c2VkIGZvciBWUk0gMC4wIGNvbXBhdCAoVlJNIDAuMCBtb2RlbHMgYXJlIGZhY2luZyBaLSBpbnN0ZWFkIG9mIForKS5cbiAgICogWW91IHVzdWFsbHkgZG9uJ3Qgd2FudCB0byB0b3VjaCB0aGlzLlxuICAgKi9cbiAgcHVibGljIGZhY2VGcm9udDogVEhSRUUuVmVjdG9yMztcblxuICAvKipcbiAgICogVGhlIHJlc3QgcXVhdGVybmlvbiBvZiBMZWZ0RXllIGJvbmUuXG4gICAqL1xuICBwcml2YXRlIF9yZXN0UXVhdExlZnRFeWU6IFRIUkVFLlF1YXRlcm5pb247XG5cbiAgLyoqXG4gICAqIFRoZSByZXN0IHF1YXRlcm5pb24gb2YgUmlnaHRFeWUgYm9uZS5cbiAgICovXG4gIHByaXZhdGUgX3Jlc3RRdWF0UmlnaHRFeWU6IFRIUkVFLlF1YXRlcm5pb247XG5cbiAgLyoqXG4gICAqIFRoZSB3b3JsZC1zcGFjZSByZXN0IHF1YXRlcm5pb24gb2YgdGhlIHBhcmVudCBvZiB0aGUgaHVtYW5vaWQgTGVmdEV5ZS5cbiAgICovXG4gIHByaXZhdGUgX3Jlc3RMZWZ0RXllUGFyZW50V29ybGRRdWF0OiBUSFJFRS5RdWF0ZXJuaW9uO1xuXG4gIC8qKlxuICAgKiBUaGUgd29ybGQtc3BhY2UgcmVzdCBxdWF0ZXJuaW9uIG9mIHRoZSBwYXJlbnQgb2YgdGhlIGh1bWFub2lkIFJpZ2h0RXllLlxuICAgKi9cbiAgcHJpdmF0ZSBfcmVzdFJpZ2h0RXllUGFyZW50V29ybGRRdWF0OiBUSFJFRS5RdWF0ZXJuaW9uO1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcge0BsaW5rIFZSTUxvb2tBdEJvbmVBcHBsaWVyfS5cbiAgICpcbiAgICogQHBhcmFtIGh1bWFub2lkIEEge0BsaW5rIFZSTUh1bWFub2lkfVxuICAgKiBAcGFyYW0gcmFuZ2VNYXBIb3Jpem9udGFsSW5uZXIgQSB7QGxpbmsgVlJNTG9va0F0UmFuZ2VNYXB9IHVzZWQgZm9yIGlubmVyIHRyYW5zdmVyc2UgZGlyZWN0aW9uXG4gICAqIEBwYXJhbSByYW5nZU1hcEhvcml6b250YWxPdXRlciBBIHtAbGluayBWUk1Mb29rQXRSYW5nZU1hcH0gdXNlZCBmb3Igb3V0ZXIgdHJhbnN2ZXJzZSBkaXJlY3Rpb25cbiAgICogQHBhcmFtIHJhbmdlTWFwVmVydGljYWxEb3duIEEge0BsaW5rIFZSTUxvb2tBdFJhbmdlTWFwfSB1c2VkIGZvciBkb3duIGRpcmVjdGlvblxuICAgKiBAcGFyYW0gcmFuZ2VNYXBWZXJ0aWNhbFVwIEEge0BsaW5rIFZSTUxvb2tBdFJhbmdlTWFwfSB1c2VkIGZvciB1cCBkaXJlY3Rpb25cbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICBodW1hbm9pZDogVlJNSHVtYW5vaWQsXG4gICAgcmFuZ2VNYXBIb3Jpem9udGFsSW5uZXI6IFZSTUxvb2tBdFJhbmdlTWFwLFxuICAgIHJhbmdlTWFwSG9yaXpvbnRhbE91dGVyOiBWUk1Mb29rQXRSYW5nZU1hcCxcbiAgICByYW5nZU1hcFZlcnRpY2FsRG93bjogVlJNTG9va0F0UmFuZ2VNYXAsXG4gICAgcmFuZ2VNYXBWZXJ0aWNhbFVwOiBWUk1Mb29rQXRSYW5nZU1hcCxcbiAgKSB7XG4gICAgdGhpcy5odW1hbm9pZCA9IGh1bWFub2lkO1xuXG4gICAgdGhpcy5yYW5nZU1hcEhvcml6b250YWxJbm5lciA9IHJhbmdlTWFwSG9yaXpvbnRhbElubmVyO1xuICAgIHRoaXMucmFuZ2VNYXBIb3Jpem9udGFsT3V0ZXIgPSByYW5nZU1hcEhvcml6b250YWxPdXRlcjtcbiAgICB0aGlzLnJhbmdlTWFwVmVydGljYWxEb3duID0gcmFuZ2VNYXBWZXJ0aWNhbERvd247XG4gICAgdGhpcy5yYW5nZU1hcFZlcnRpY2FsVXAgPSByYW5nZU1hcFZlcnRpY2FsVXA7XG5cbiAgICB0aGlzLmZhY2VGcm9udCA9IG5ldyBUSFJFRS5WZWN0b3IzKDAuMCwgMC4wLCAxLjApO1xuXG4gICAgLy8gc2V0IHJlc3QgcXVhdGVybmlvbnNcbiAgICB0aGlzLl9yZXN0UXVhdExlZnRFeWUgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuICAgIHRoaXMuX3Jlc3RRdWF0UmlnaHRFeWUgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuICAgIHRoaXMuX3Jlc3RMZWZ0RXllUGFyZW50V29ybGRRdWF0ID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbiAgICB0aGlzLl9yZXN0UmlnaHRFeWVQYXJlbnRXb3JsZFF1YXQgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXG4gICAgY29uc3QgbGVmdEV5ZSA9IHRoaXMuaHVtYW5vaWQuZ2V0UmF3Qm9uZU5vZGUoJ2xlZnRFeWUnKTtcbiAgICBjb25zdCByaWdodEV5ZSA9IHRoaXMuaHVtYW5vaWQuZ2V0UmF3Qm9uZU5vZGUoJ3JpZ2h0RXllJyk7XG5cbiAgICBpZiAobGVmdEV5ZSkge1xuICAgICAgdGhpcy5fcmVzdFF1YXRMZWZ0RXllLmNvcHkobGVmdEV5ZS5xdWF0ZXJuaW9uKTtcbiAgICAgIGdldFdvcmxkUXVhdGVybmlvbkxpdGUobGVmdEV5ZS5wYXJlbnQhLCB0aGlzLl9yZXN0TGVmdEV5ZVBhcmVudFdvcmxkUXVhdCk7XG4gICAgfVxuXG4gICAgaWYgKHJpZ2h0RXllKSB7XG4gICAgICB0aGlzLl9yZXN0UXVhdFJpZ2h0RXllLmNvcHkocmlnaHRFeWUucXVhdGVybmlvbik7XG4gICAgICBnZXRXb3JsZFF1YXRlcm5pb25MaXRlKHJpZ2h0RXllLnBhcmVudCEsIHRoaXMuX3Jlc3RSaWdodEV5ZVBhcmVudFdvcmxkUXVhdCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoZSBpbnB1dCBhbmdsZSB0byBpdHMgYXNzb2NpYXRlZCBWUk0gbW9kZWwuXG4gICAqXG4gICAqIEBwYXJhbSB5YXcgUm90YXRpb24gYXJvdW5kIFkgYXhpcywgaW4gZGVncmVlXG4gICAqIEBwYXJhbSBwaXRjaCBSb3RhdGlvbiBhcm91bmQgWCBheGlzLCBpbiBkZWdyZWVcbiAgICovXG4gIHB1YmxpYyBhcHBseVlhd1BpdGNoKHlhdzogbnVtYmVyLCBwaXRjaDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgbGVmdEV5ZSA9IHRoaXMuaHVtYW5vaWQuZ2V0UmF3Qm9uZU5vZGUoJ2xlZnRFeWUnKTtcbiAgICBjb25zdCByaWdodEV5ZSA9IHRoaXMuaHVtYW5vaWQuZ2V0UmF3Qm9uZU5vZGUoJ3JpZ2h0RXllJyk7XG4gICAgY29uc3QgbGVmdEV5ZU5vcm1hbGl6ZWQgPSB0aGlzLmh1bWFub2lkLmdldE5vcm1hbGl6ZWRCb25lTm9kZSgnbGVmdEV5ZScpO1xuICAgIGNvbnN0IHJpZ2h0RXllTm9ybWFsaXplZCA9IHRoaXMuaHVtYW5vaWQuZ2V0Tm9ybWFsaXplZEJvbmVOb2RlKCdyaWdodEV5ZScpO1xuICAgIC8vIGxlZnRcbiAgICBpZiAobGVmdEV5ZSkge1xuICAgICAgaWYgKHBpdGNoIDwgMC4wKSB7XG4gICAgICAgIF9ldWxlckEueCA9IC1USFJFRS5NYXRoVXRpbHMuREVHMlJBRCAqIHRoaXMucmFuZ2VNYXBWZXJ0aWNhbERvd24ubWFwKC1waXRjaCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfZXVsZXJBLnggPSBUSFJFRS5NYXRoVXRpbHMuREVHMlJBRCAqIHRoaXMucmFuZ2VNYXBWZXJ0aWNhbFVwLm1hcChwaXRjaCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh5YXcgPCAwLjApIHtcbiAgICAgICAgX2V1bGVyQS55ID0gLVRIUkVFLk1hdGhVdGlscy5ERUcyUkFEICogdGhpcy5yYW5nZU1hcEhvcml6b250YWxJbm5lci5tYXAoLXlhdyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfZXVsZXJBLnkgPSBUSFJFRS5NYXRoVXRpbHMuREVHMlJBRCAqIHRoaXMucmFuZ2VNYXBIb3Jpem9udGFsT3V0ZXIubWFwKHlhdyk7XG4gICAgICB9XG5cbiAgICAgIF9xdWF0QS5zZXRGcm9tRXVsZXIoX2V1bGVyQSk7XG4gICAgICB0aGlzLl9nZXRXb3JsZEZhY2VGcm9udFF1YXQoX3F1YXRCKTtcblxuICAgICAgLy8gX3F1YXRCICogX3F1YXRBICogX3F1YXRCXi0xXG4gICAgICAvLyB3aGVyZSBfcXVhdEEgaXMgTG9va0F0IHJvdGF0aW9uXG4gICAgICAvLyBhbmQgX3F1YXRCIGlzIHdvcmxkRmFjZUZyb250UXVhdFxuICAgICAgbGVmdEV5ZU5vcm1hbGl6ZWQhLnF1YXRlcm5pb24uY29weShfcXVhdEIpLm11bHRpcGx5KF9xdWF0QSkubXVsdGlwbHkoX3F1YXRCLmludmVydCgpKTtcblxuICAgICAgX3F1YXRBLmNvcHkodGhpcy5fcmVzdExlZnRFeWVQYXJlbnRXb3JsZFF1YXQpO1xuXG4gICAgICAvLyBfcXVhdEFeLTEgKiBsZWZ0RXllTm9ybWFsaXplZC5xdWF0ZXJuaW9uICogX3F1YXRBICogcmVzdFF1YXRMZWZ0RXllXG4gICAgICAvLyB3aGVyZSBfcXVhdEEgaXMgcmVzdExlZnRFeWVQYXJlbnRXb3JsZFF1YXRcbiAgICAgIGxlZnRFeWUucXVhdGVybmlvblxuICAgICAgICAuY29weShsZWZ0RXllTm9ybWFsaXplZCEucXVhdGVybmlvbilcbiAgICAgICAgLm11bHRpcGx5KF9xdWF0QSlcbiAgICAgICAgLnByZW11bHRpcGx5KF9xdWF0QS5pbnZlcnQoKSlcbiAgICAgICAgLm11bHRpcGx5KHRoaXMuX3Jlc3RRdWF0TGVmdEV5ZSk7XG4gICAgfVxuXG4gICAgLy8gcmlnaHRcbiAgICBpZiAocmlnaHRFeWUpIHtcbiAgICAgIGlmIChwaXRjaCA8IDAuMCkge1xuICAgICAgICBfZXVsZXJBLnggPSAtVEhSRUUuTWF0aFV0aWxzLkRFRzJSQUQgKiB0aGlzLnJhbmdlTWFwVmVydGljYWxEb3duLm1hcCgtcGl0Y2gpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX2V1bGVyQS54ID0gVEhSRUUuTWF0aFV0aWxzLkRFRzJSQUQgKiB0aGlzLnJhbmdlTWFwVmVydGljYWxVcC5tYXAocGl0Y2gpO1xuICAgICAgfVxuXG4gICAgICBpZiAoeWF3IDwgMC4wKSB7XG4gICAgICAgIF9ldWxlckEueSA9IC1USFJFRS5NYXRoVXRpbHMuREVHMlJBRCAqIHRoaXMucmFuZ2VNYXBIb3Jpem9udGFsT3V0ZXIubWFwKC15YXcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX2V1bGVyQS55ID0gVEhSRUUuTWF0aFV0aWxzLkRFRzJSQUQgKiB0aGlzLnJhbmdlTWFwSG9yaXpvbnRhbElubmVyLm1hcCh5YXcpO1xuICAgICAgfVxuXG4gICAgICBfcXVhdEEuc2V0RnJvbUV1bGVyKF9ldWxlckEpO1xuICAgICAgdGhpcy5fZ2V0V29ybGRGYWNlRnJvbnRRdWF0KF9xdWF0Qik7XG5cbiAgICAgIC8vIF9xdWF0QiAqIF9xdWF0QSAqIF9xdWF0Ql4tMVxuICAgICAgLy8gd2hlcmUgX3F1YXRBIGlzIExvb2tBdCByb3RhdGlvblxuICAgICAgLy8gYW5kIF9xdWF0QiBpcyB3b3JsZEZhY2VGcm9udFF1YXRcbiAgICAgIHJpZ2h0RXllTm9ybWFsaXplZCEucXVhdGVybmlvbi5jb3B5KF9xdWF0QikubXVsdGlwbHkoX3F1YXRBKS5tdWx0aXBseShfcXVhdEIuaW52ZXJ0KCkpO1xuXG4gICAgICBfcXVhdEEuY29weSh0aGlzLl9yZXN0UmlnaHRFeWVQYXJlbnRXb3JsZFF1YXQpO1xuXG4gICAgICAvLyBfcXVhdEFeLTEgKiByaWdodEV5ZU5vcm1hbGl6ZWQucXVhdGVybmlvbiAqIF9xdWF0QSAqIHJlc3RRdWF0UmlnaHRFeWVcbiAgICAgIC8vIHdoZXJlIF9xdWF0QSBpcyByZXN0UmlnaHRFeWVQYXJlbnRXb3JsZFF1YXRcbiAgICAgIHJpZ2h0RXllLnF1YXRlcm5pb25cbiAgICAgICAgLmNvcHkocmlnaHRFeWVOb3JtYWxpemVkIS5xdWF0ZXJuaW9uKVxuICAgICAgICAubXVsdGlwbHkoX3F1YXRBKVxuICAgICAgICAucHJlbXVsdGlwbHkoX3F1YXRBLmludmVydCgpKVxuICAgICAgICAubXVsdGlwbHkodGhpcy5fcmVzdFF1YXRSaWdodEV5ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFVzZSB7QGxpbmsgYXBwbHlZYXdQaXRjaH0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBsb29rQXQoZXVsZXI6IFRIUkVFLkV1bGVyKTogdm9pZCB7XG4gICAgY29uc29sZS53YXJuKCdWUk1Mb29rQXRCb25lQXBwbGllcjogbG9va0F0KCkgaXMgZGVwcmVjYXRlZC4gdXNlIGFwcGx5KCkgaW5zdGVhZC4nKTtcblxuICAgIGNvbnN0IHlhdyA9IFRIUkVFLk1hdGhVdGlscy5SQUQyREVHICogZXVsZXIueTtcbiAgICBjb25zdCBwaXRjaCA9IFRIUkVFLk1hdGhVdGlscy5SQUQyREVHICogZXVsZXIueDtcblxuICAgIHRoaXMuYXBwbHlZYXdQaXRjaCh5YXcsIHBpdGNoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBxdWF0ZXJuaW9uIHRoYXQgcm90YXRlcyB0aGUgd29ybGQtc3BhY2UgK1ogdW5pdCB2ZWN0b3IgdG8gdGhlIHtAbGluayBmYWNlRnJvbnR9IGRpcmVjdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHRhcmdldCBBIHRhcmdldCBgVEhSRUUuUXVhdGVybmlvbmBcbiAgICovXG4gIHByaXZhdGUgX2dldFdvcmxkRmFjZUZyb250UXVhdCh0YXJnZXQ6IFRIUkVFLlF1YXRlcm5pb24pOiBUSFJFRS5RdWF0ZXJuaW9uIHtcbiAgICBpZiAodGhpcy5mYWNlRnJvbnQuZGlzdGFuY2VUb1NxdWFyZWQoVkVDM19QT1NJVElWRV9aKSA8IDAuMDEpIHtcbiAgICAgIHJldHVybiB0YXJnZXQuaWRlbnRpdHkoKTtcbiAgICB9XG5cbiAgICBjb25zdCBbZmFjZUZyb250QXppbXV0aCwgZmFjZUZyb250QWx0aXR1ZGVdID0gY2FsY0F6aW11dGhBbHRpdHVkZSh0aGlzLmZhY2VGcm9udCk7XG4gICAgX2V1bGVyQS5zZXQoMC4wLCAwLjUgKiBNYXRoLlBJICsgZmFjZUZyb250QXppbXV0aCwgZmFjZUZyb250QWx0aXR1ZGUsICdZWlgnKTtcblxuICAgIHJldHVybiB0YXJnZXQuc2V0RnJvbUV1bGVyKF9ldWxlckEpO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgVlJNRXhwcmVzc2lvbk1hbmFnZXIgfSBmcm9tICcuLi9leHByZXNzaW9ucyc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgdHlwZSB7IFZSTUxvb2tBdEFwcGxpZXIgfSBmcm9tICcuL1ZSTUxvb2tBdEFwcGxpZXInO1xuaW1wb3J0IHsgVlJNTG9va0F0UmFuZ2VNYXAgfSBmcm9tICcuL1ZSTUxvb2tBdFJhbmdlTWFwJztcblxuLyoqXG4gKiBBIGNsYXNzIHRoYXQgYXBwbGllcyBleWUgZ2F6ZSBkaXJlY3Rpb25zIHRvIGEgVlJNLlxuICogSXQgd2lsbCBiZSB1c2VkIGJ5IHtAbGluayBWUk1Mb29rQXR9LlxuICovXG5leHBvcnQgY2xhc3MgVlJNTG9va0F0RXhwcmVzc2lvbkFwcGxpZXIgaW1wbGVtZW50cyBWUk1Mb29rQXRBcHBsaWVyIHtcbiAgLyoqXG4gICAqIFJlcHJlc2VudCBpdHMgdHlwZSBvZiBhcHBsaWVyLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyByZWFkb25seSB0eXBlID0gJ2V4cHJlc3Npb24nO1xuXG4gIC8qKlxuICAgKiBJdHMgYXNzb2NpYXRlZCB7QGxpbmsgVlJNRXhwcmVzc2lvbk1hbmFnZXJ9LlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGV4cHJlc3Npb25zOiBWUk1FeHByZXNzaW9uTWFuYWdlcjtcblxuICAvKipcbiAgICogSXQgd29uJ3QgYmUgdXNlZCBpbiBleHByZXNzaW9uIGFwcGxpZXIuXG4gICAqIFNlZSBhbHNvOiB7QGxpbmsgcmFuZ2VNYXBIb3Jpem9udGFsT3V0ZXJ9XG4gICAqL1xuICBwdWJsaWMgcmFuZ2VNYXBIb3Jpem9udGFsSW5uZXI6IFZSTUxvb2tBdFJhbmdlTWFwO1xuXG4gIC8qKlxuICAgKiBBIHtAbGluayBWUk1Mb29rQXRSYW5nZU1hcH0gZm9yIGhvcml6b250YWwgbW92ZW1lbnQuIEJvdGggZXllcyBtb3ZlIGxlZnQgb3IgcmlnaHQuXG4gICAqL1xuICBwdWJsaWMgcmFuZ2VNYXBIb3Jpem9udGFsT3V0ZXI6IFZSTUxvb2tBdFJhbmdlTWFwO1xuXG4gIC8qKlxuICAgKiBBIHtAbGluayBWUk1Mb29rQXRSYW5nZU1hcH0gZm9yIHZlcnRpY2FsIGRvd253YXJkIG1vdmVtZW50LiBCb3RoIGV5ZXMgbW92ZSB1cHdhcmRzLlxuICAgKi9cbiAgcHVibGljIHJhbmdlTWFwVmVydGljYWxEb3duOiBWUk1Mb29rQXRSYW5nZU1hcDtcblxuICAvKipcbiAgICogQSB7QGxpbmsgVlJNTG9va0F0UmFuZ2VNYXB9IGZvciB2ZXJ0aWNhbCB1cHdhcmQgbW92ZW1lbnQuIEJvdGggZXllcyBtb3ZlIGRvd253YXJkcy5cbiAgICovXG4gIHB1YmxpYyByYW5nZU1hcFZlcnRpY2FsVXA6IFZSTUxvb2tBdFJhbmdlTWFwO1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcge0BsaW5rIFZSTUxvb2tBdEV4cHJlc3Npb25BcHBsaWVyfS5cbiAgICpcbiAgICogQHBhcmFtIGV4cHJlc3Npb25zIEEge0BsaW5rIFZSTUV4cHJlc3Npb25NYW5hZ2VyfVxuICAgKiBAcGFyYW0gcmFuZ2VNYXBIb3Jpem9udGFsSW5uZXIgQSB7QGxpbmsgVlJNTG9va0F0UmFuZ2VNYXB9IHVzZWQgZm9yIGlubmVyIHRyYW5zdmVyc2UgZGlyZWN0aW9uXG4gICAqIEBwYXJhbSByYW5nZU1hcEhvcml6b250YWxPdXRlciBBIHtAbGluayBWUk1Mb29rQXRSYW5nZU1hcH0gdXNlZCBmb3Igb3V0ZXIgdHJhbnN2ZXJzZSBkaXJlY3Rpb25cbiAgICogQHBhcmFtIHJhbmdlTWFwVmVydGljYWxEb3duIEEge0BsaW5rIFZSTUxvb2tBdFJhbmdlTWFwfSB1c2VkIGZvciBkb3duIGRpcmVjdGlvblxuICAgKiBAcGFyYW0gcmFuZ2VNYXBWZXJ0aWNhbFVwIEEge0BsaW5rIFZSTUxvb2tBdFJhbmdlTWFwfSB1c2VkIGZvciB1cCBkaXJlY3Rpb25cbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICBleHByZXNzaW9uczogVlJNRXhwcmVzc2lvbk1hbmFnZXIsXG4gICAgcmFuZ2VNYXBIb3Jpem9udGFsSW5uZXI6IFZSTUxvb2tBdFJhbmdlTWFwLFxuICAgIHJhbmdlTWFwSG9yaXpvbnRhbE91dGVyOiBWUk1Mb29rQXRSYW5nZU1hcCxcbiAgICByYW5nZU1hcFZlcnRpY2FsRG93bjogVlJNTG9va0F0UmFuZ2VNYXAsXG4gICAgcmFuZ2VNYXBWZXJ0aWNhbFVwOiBWUk1Mb29rQXRSYW5nZU1hcCxcbiAgKSB7XG4gICAgdGhpcy5leHByZXNzaW9ucyA9IGV4cHJlc3Npb25zO1xuXG4gICAgdGhpcy5yYW5nZU1hcEhvcml6b250YWxJbm5lciA9IHJhbmdlTWFwSG9yaXpvbnRhbElubmVyO1xuICAgIHRoaXMucmFuZ2VNYXBIb3Jpem9udGFsT3V0ZXIgPSByYW5nZU1hcEhvcml6b250YWxPdXRlcjtcbiAgICB0aGlzLnJhbmdlTWFwVmVydGljYWxEb3duID0gcmFuZ2VNYXBWZXJ0aWNhbERvd247XG4gICAgdGhpcy5yYW5nZU1hcFZlcnRpY2FsVXAgPSByYW5nZU1hcFZlcnRpY2FsVXA7XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgdGhlIGlucHV0IGFuZ2xlIHRvIGl0cyBhc3NvY2lhdGVkIFZSTSBtb2RlbC5cbiAgICpcbiAgICogQHBhcmFtIHlhdyBSb3RhdGlvbiBhcm91bmQgWSBheGlzLCBpbiBkZWdyZWVcbiAgICogQHBhcmFtIHBpdGNoIFJvdGF0aW9uIGFyb3VuZCBYIGF4aXMsIGluIGRlZ3JlZVxuICAgKi9cbiAgcHVibGljIGFwcGx5WWF3UGl0Y2goeWF3OiBudW1iZXIsIHBpdGNoOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAocGl0Y2ggPCAwLjApIHtcbiAgICAgIHRoaXMuZXhwcmVzc2lvbnMuc2V0VmFsdWUoJ2xvb2tEb3duJywgMC4wKTtcbiAgICAgIHRoaXMuZXhwcmVzc2lvbnMuc2V0VmFsdWUoJ2xvb2tVcCcsIHRoaXMucmFuZ2VNYXBWZXJ0aWNhbFVwLm1hcCgtcGl0Y2gpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5leHByZXNzaW9ucy5zZXRWYWx1ZSgnbG9va1VwJywgMC4wKTtcbiAgICAgIHRoaXMuZXhwcmVzc2lvbnMuc2V0VmFsdWUoJ2xvb2tEb3duJywgdGhpcy5yYW5nZU1hcFZlcnRpY2FsRG93bi5tYXAocGl0Y2gpKTtcbiAgICB9XG5cbiAgICBpZiAoeWF3IDwgMC4wKSB7XG4gICAgICB0aGlzLmV4cHJlc3Npb25zLnNldFZhbHVlKCdsb29rTGVmdCcsIDAuMCk7XG4gICAgICB0aGlzLmV4cHJlc3Npb25zLnNldFZhbHVlKCdsb29rUmlnaHQnLCB0aGlzLnJhbmdlTWFwSG9yaXpvbnRhbE91dGVyLm1hcCgteWF3KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZXhwcmVzc2lvbnMuc2V0VmFsdWUoJ2xvb2tSaWdodCcsIDAuMCk7XG4gICAgICB0aGlzLmV4cHJlc3Npb25zLnNldFZhbHVlKCdsb29rTGVmdCcsIHRoaXMucmFuZ2VNYXBIb3Jpem9udGFsT3V0ZXIubWFwKHlhdykpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBVc2Uge0BsaW5rIGFwcGx5WWF3UGl0Y2h9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgbG9va0F0KGV1bGVyOiBUSFJFRS5FdWxlcik6IHZvaWQge1xuICAgIGNvbnNvbGUud2FybignVlJNTG9va0F0Qm9uZUFwcGxpZXI6IGxvb2tBdCgpIGlzIGRlcHJlY2F0ZWQuIHVzZSBhcHBseSgpIGluc3RlYWQuJyk7XG5cbiAgICBjb25zdCB5YXcgPSBUSFJFRS5NYXRoVXRpbHMuUkFEMkRFRyAqIGV1bGVyLnk7XG4gICAgY29uc3QgcGl0Y2ggPSBUSFJFRS5NYXRoVXRpbHMuUkFEMkRFRyAqIGV1bGVyLng7XG5cbiAgICB0aGlzLmFwcGx5WWF3UGl0Y2goeWF3LCBwaXRjaCk7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBzYXR1cmF0ZSB9IGZyb20gJy4uL3V0aWxzL3NhdHVyYXRlJztcblxuZXhwb3J0IGNsYXNzIFZSTUxvb2tBdFJhbmdlTWFwIHtcbiAgLyoqXG4gICAqIExpbWl0cyB0aGUgbWF4aW11bSBhbmdsZSBvZiB0aGUgaW5wdXQgYW5nbGUgb2YgdGhlIExvb2tBdCB2ZWN0b3IgZnJvbSB0aGUgZnJvbnQgb2YgdGhlIGhlYWQgKHRoZSBwb3NpdGl2ZSB6IGF4aXMpLlxuICAgKi9cbiAgcHVibGljIGlucHV0TWF4VmFsdWU6IG51bWJlcjtcblxuICAvKipcbiAgICogUmVwcmVzZW50cyBhbiBhbmdsZSAoaW4gZGVncmVlcykgZm9yIGJvbmUgdHlwZSBvZiBMb29rQXQgYXBwbGllcnMsIG9yIGEgd2VpZ2h0IGZvciBleHByZXNzaW9uIHR5cGUgb2YgTG9va0F0IGFwcGxpZXJzLlxuICAgKiBUaGUgaW5wdXQgdmFsdWUgd2lsbCB0YWtlIGAxLjBgIHdoZW4gdGhlIGlucHV0IGFuZ2xlIGVxdWFscyAob3IgZ3JlYXRlcikgdG8ge0BsaW5rIGlucHV0TWF4VmFsdWV9LlxuICAgKi9cbiAgcHVibGljIG91dHB1dFNjYWxlOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyB7QGxpbmsgVlJNTG9va0F0UmFuZ2VNYXB9LlxuICAgKlxuICAgKiBAcGFyYW0gaW5wdXRNYXhWYWx1ZSBUaGUge0BsaW5rIGlucHV0TWF4VmFsdWV9IG9mIHRoZSBtYXBcbiAgICogQHBhcmFtIG91dHB1dFNjYWxlIFRoZSB7QGxpbmsgb3V0cHV0U2NhbGV9IG9mIHRoZSBtYXBcbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihpbnB1dE1heFZhbHVlOiBudW1iZXIsIG91dHB1dFNjYWxlOiBudW1iZXIpIHtcbiAgICB0aGlzLmlucHV0TWF4VmFsdWUgPSBpbnB1dE1heFZhbHVlO1xuICAgIHRoaXMub3V0cHV0U2NhbGUgPSBvdXRwdXRTY2FsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFdmFsdWF0ZSBhbiBpbnB1dCB2YWx1ZSBhbmQgb3V0cHV0IGEgbWFwcGVkIHZhbHVlLlxuICAgKiBAcGFyYW0gc3JjIFRoZSBpbnB1dCB2YWx1ZVxuICAgKi9cbiAgcHVibGljIG1hcChzcmM6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMub3V0cHV0U2NhbGUgKiBzYXR1cmF0ZShzcmMgLyB0aGlzLmlucHV0TWF4VmFsdWUpO1xuICB9XG59XG4iLCAiaW1wb3J0IHR5cGUgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgdHlwZSAqIGFzIFYwVlJNIGZyb20gJ0BwaXhpdi90eXBlcy12cm0tMC4wJztcbmltcG9ydCB0eXBlICogYXMgVjFWUk1TY2hlbWEgZnJvbSAnQHBpeGl2L3R5cGVzLXZybWMtdnJtLTEuMCc7XG5pbXBvcnQgdHlwZSB7IEdMVEYsIEdMVEZMb2FkZXJQbHVnaW4sIEdMVEZQYXJzZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyLmpzJztcbmltcG9ydCB0eXBlIHsgVlJNRXhwcmVzc2lvbk1hbmFnZXIgfSBmcm9tICcuLi9leHByZXNzaW9ucy9WUk1FeHByZXNzaW9uTWFuYWdlcic7XG5pbXBvcnQgdHlwZSB7IFZSTUh1bWFub2lkIH0gZnJvbSAnLi4vaHVtYW5vaWQvVlJNSHVtYW5vaWQnO1xuaW1wb3J0IHsgVlJNTG9va0F0SGVscGVyIH0gZnJvbSAnLi9oZWxwZXJzL1ZSTUxvb2tBdEhlbHBlcic7XG5pbXBvcnQgeyBWUk1Mb29rQXQgfSBmcm9tICcuL1ZSTUxvb2tBdCc7XG5pbXBvcnQgdHlwZSB7IFZSTUxvb2tBdEFwcGxpZXIgfSBmcm9tICcuL1ZSTUxvb2tBdEFwcGxpZXInO1xuaW1wb3J0IHsgVlJNTG9va0F0Qm9uZUFwcGxpZXIgfSBmcm9tICcuL1ZSTUxvb2tBdEJvbmVBcHBsaWVyJztcbmltcG9ydCB7IFZSTUxvb2tBdEV4cHJlc3Npb25BcHBsaWVyIH0gZnJvbSAnLi9WUk1Mb29rQXRFeHByZXNzaW9uQXBwbGllcic7XG5pbXBvcnQgdHlwZSB7IFZSTUxvb2tBdExvYWRlclBsdWdpbk9wdGlvbnMgfSBmcm9tICcuL1ZSTUxvb2tBdExvYWRlclBsdWdpbk9wdGlvbnMnO1xuaW1wb3J0IHsgVlJNTG9va0F0UmFuZ2VNYXAgfSBmcm9tICcuL1ZSTUxvb2tBdFJhbmdlTWFwJztcbmltcG9ydCB7IEdMVEYgYXMgR0xURlNjaGVtYSB9IGZyb20gJ0BnbHRmLXRyYW5zZm9ybS9jb3JlJztcblxuLyoqXG4gKiBQb3NzaWJsZSBzcGVjIHZlcnNpb25zIGl0IHJlY29nbml6ZXMuXG4gKi9cbmNvbnN0IFBPU1NJQkxFX1NQRUNfVkVSU0lPTlMgPSBuZXcgU2V0KFsnMS4wJywgJzEuMC1iZXRhJ10pO1xuXG4vKipcbiAqIFRoZSBtaW5pbXVtIHBlcm1pdHRlZCB2YWx1ZSBmb3Ige0BsaW5rIFYxVlJNU2NoZW1hLkxvb2tBdFJhbmdlTWFwLmlucHV0TWF4VmFsdWV9LlxuICogSWYgdGhlIGdpdmVuIHZhbHVlIGlzIHNtYWxsZXIgdGhhbiB0aGlzLCB0aGUgbG9hZGVyIHNob3dzIGEgd2FybmluZyBhbmQgY2xhbXBzIHVwIHRoZSB2YWx1ZS5cbiAqL1xuY29uc3QgSU5QVVRfTUFYX1ZBTFVFX01JTklNVU0gPSAwLjAxO1xuXG4vKipcbiAqIEEgcGx1Z2luIG9mIEdMVEZMb2FkZXIgdGhhdCBpbXBvcnRzIGEge0BsaW5rIFZSTUxvb2tBdH0gZnJvbSBhIFZSTSBleHRlbnNpb24gb2YgYSBHTFRGLlxuICovXG5leHBvcnQgY2xhc3MgVlJNTG9va0F0TG9hZGVyUGx1Z2luIGltcGxlbWVudHMgR0xURkxvYWRlclBsdWdpbiB7XG4gIC8qKlxuICAgKiBTcGVjaWZ5IGFuIE9iamVjdDNEIHRvIGFkZCB7QGxpbmsgVlJNTG9va0F0SGVscGVyfSBzLlxuICAgKiBJZiBub3Qgc3BlY2lmaWVkLCBoZWxwZXIgd2lsbCBub3QgYmUgY3JlYXRlZC5cbiAgICogSWYgYHJlbmRlck9yZGVyYCBpcyBzZXQgdG8gdGhlIHJvb3QsIGhlbHBlcnMgd2lsbCBjb3B5IHRoZSBzYW1lIGByZW5kZXJPcmRlcmAgLlxuICAgKi9cbiAgcHVibGljIGhlbHBlclJvb3Q/OiBUSFJFRS5PYmplY3QzRDtcblxuICBwdWJsaWMgcmVhZG9ubHkgcGFyc2VyOiBHTFRGUGFyc2VyO1xuXG4gIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xuICAgIC8vIFdlIHNob3VsZCB1c2UgdGhlIGV4dGVuc2lvbiBuYW1lIGluc3RlYWQgYnV0IHdlIGhhdmUgbXVsdGlwbGUgcGx1Z2lucyBmb3IgYW4gZXh0ZW5zaW9uLi4uXG4gICAgcmV0dXJuICdWUk1Mb29rQXRMb2FkZXJQbHVnaW4nO1xuICB9XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBhcnNlcjogR0xURlBhcnNlciwgb3B0aW9ucz86IFZSTUxvb2tBdExvYWRlclBsdWdpbk9wdGlvbnMpIHtcbiAgICB0aGlzLnBhcnNlciA9IHBhcnNlcjtcblxuICAgIHRoaXMuaGVscGVyUm9vdCA9IG9wdGlvbnM/LmhlbHBlclJvb3Q7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgYWZ0ZXJSb290KGdsdGY6IEdMVEYpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB2cm1IdW1hbm9pZCA9IGdsdGYudXNlckRhdGEudnJtSHVtYW5vaWQgYXMgVlJNSHVtYW5vaWQgfCB1bmRlZmluZWQ7XG5cbiAgICAvLyBleHBsaWNpdGx5IGRpc3Rpbmd1aXNoIG51bGwgYW5kIHVuZGVmaW5lZFxuICAgIC8vIHNpbmNlIHZybUh1bWFub2lkIG1pZ2h0IGJlIG51bGwgYXMgYSByZXN1bHRcbiAgICBpZiAodnJtSHVtYW5vaWQgPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKHZybUh1bWFub2lkID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVlJNTG9va0F0TG9hZGVyUGx1Z2luOiB2cm1IdW1hbm9pZCBpcyB1bmRlZmluZWQuIFZSTUh1bWFub2lkTG9hZGVyUGx1Z2luIGhhdmUgdG8gYmUgdXNlZCBmaXJzdCcpO1xuICAgIH1cblxuICAgIGNvbnN0IHZybUV4cHJlc3Npb25NYW5hZ2VyID0gZ2x0Zi51c2VyRGF0YS52cm1FeHByZXNzaW9uTWFuYWdlciBhcyBWUk1FeHByZXNzaW9uTWFuYWdlciB8IHVuZGVmaW5lZDtcblxuICAgIGlmICh2cm1FeHByZXNzaW9uTWFuYWdlciA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAodnJtRXhwcmVzc2lvbk1hbmFnZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnVlJNTG9va0F0TG9hZGVyUGx1Z2luOiB2cm1FeHByZXNzaW9uTWFuYWdlciBpcyB1bmRlZmluZWQuIFZSTUV4cHJlc3Npb25Mb2FkZXJQbHVnaW4gaGF2ZSB0byBiZSB1c2VkIGZpcnN0JyxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgZ2x0Zi51c2VyRGF0YS52cm1Mb29rQXQgPSBhd2FpdCB0aGlzLl9pbXBvcnQoZ2x0ZiwgdnJtSHVtYW5vaWQsIHZybUV4cHJlc3Npb25NYW5hZ2VyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbXBvcnQgYSB7QGxpbmsgVlJNTG9va0F0fSBmcm9tIGEgVlJNLlxuICAgKlxuICAgKiBAcGFyYW0gZ2x0ZiBBIHBhcnNlZCByZXN1bHQgb2YgR0xURiB0YWtlbiBmcm9tIEdMVEZMb2FkZXJcbiAgICogQHBhcmFtIGh1bWFub2lkIEEge0BsaW5rIFZSTUh1bWFub2lkfSBpbnN0YW5jZSB0aGF0IHJlcHJlc2VudHMgdGhlIFZSTVxuICAgKiBAcGFyYW0gZXhwcmVzc2lvbnMgQSB7QGxpbmsgVlJNRXhwcmVzc2lvbk1hbmFnZXJ9IGluc3RhbmNlIHRoYXQgcmVwcmVzZW50cyB0aGUgVlJNXG4gICAqL1xuICBwcml2YXRlIGFzeW5jIF9pbXBvcnQoXG4gICAgZ2x0ZjogR0xURixcbiAgICBodW1hbm9pZDogVlJNSHVtYW5vaWQgfCBudWxsLFxuICAgIGV4cHJlc3Npb25zOiBWUk1FeHByZXNzaW9uTWFuYWdlciB8IG51bGwsXG4gICk6IFByb21pc2U8VlJNTG9va0F0IHwgbnVsbD4ge1xuICAgIGlmIChodW1hbm9pZCA9PSBudWxsIHx8IGV4cHJlc3Npb25zID09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHYxUmVzdWx0ID0gYXdhaXQgdGhpcy5fdjFJbXBvcnQoZ2x0ZiwgaHVtYW5vaWQsIGV4cHJlc3Npb25zKTtcbiAgICBpZiAodjFSZXN1bHQpIHtcbiAgICAgIHJldHVybiB2MVJlc3VsdDtcbiAgICB9XG5cbiAgICBjb25zdCB2MFJlc3VsdCA9IGF3YWl0IHRoaXMuX3YwSW1wb3J0KGdsdGYsIGh1bWFub2lkLCBleHByZXNzaW9ucyk7XG4gICAgaWYgKHYwUmVzdWx0KSB7XG4gICAgICByZXR1cm4gdjBSZXN1bHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF92MUltcG9ydChcbiAgICBnbHRmOiBHTFRGLFxuICAgIGh1bWFub2lkOiBWUk1IdW1hbm9pZCxcbiAgICBleHByZXNzaW9uczogVlJNRXhwcmVzc2lvbk1hbmFnZXIsXG4gICk6IFByb21pc2U8VlJNTG9va0F0IHwgbnVsbD4ge1xuICAgIGNvbnN0IGpzb24gPSB0aGlzLnBhcnNlci5qc29uIGFzIEdMVEZTY2hlbWEuSUdMVEY7XG5cbiAgICAvLyBlYXJseSBhYm9ydCBpZiBpdCBkb2Vzbid0IHVzZSB2cm1cbiAgICBjb25zdCBpc1ZSTVVzZWQgPSBqc29uLmV4dGVuc2lvbnNVc2VkPy5pbmRleE9mKCdWUk1DX3ZybScpICE9PSAtMTtcbiAgICBpZiAoIWlzVlJNVXNlZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgZXh0ZW5zaW9uID0ganNvbi5leHRlbnNpb25zPy5bJ1ZSTUNfdnJtJ10gYXMgVjFWUk1TY2hlbWEuVlJNQ1ZSTSB8IHVuZGVmaW5lZDtcbiAgICBpZiAoIWV4dGVuc2lvbikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc3BlY1ZlcnNpb24gPSBleHRlbnNpb24uc3BlY1ZlcnNpb247XG4gICAgaWYgKCFQT1NTSUJMRV9TUEVDX1ZFUlNJT05TLmhhcyhzcGVjVmVyc2lvbikpIHtcbiAgICAgIGNvbnNvbGUud2FybihgVlJNTG9va0F0TG9hZGVyUGx1Z2luOiBVbmtub3duIFZSTUNfdnJtIHNwZWNWZXJzaW9uIFwiJHtzcGVjVmVyc2lvbn1cImApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc2NoZW1hTG9va0F0ID0gZXh0ZW5zaW9uLmxvb2tBdDtcbiAgICBpZiAoIXNjaGVtYUxvb2tBdCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgZGVmYXVsdE91dHB1dFNjYWxlID0gc2NoZW1hTG9va0F0LnR5cGUgPT09ICdleHByZXNzaW9uJyA/IDEuMCA6IDEwLjA7XG5cbiAgICBjb25zdCBtYXBISSA9IHRoaXMuX3YxSW1wb3J0UmFuZ2VNYXAoc2NoZW1hTG9va0F0LnJhbmdlTWFwSG9yaXpvbnRhbElubmVyLCBkZWZhdWx0T3V0cHV0U2NhbGUpO1xuICAgIGNvbnN0IG1hcEhPID0gdGhpcy5fdjFJbXBvcnRSYW5nZU1hcChzY2hlbWFMb29rQXQucmFuZ2VNYXBIb3Jpem9udGFsT3V0ZXIsIGRlZmF1bHRPdXRwdXRTY2FsZSk7XG4gICAgY29uc3QgbWFwVkQgPSB0aGlzLl92MUltcG9ydFJhbmdlTWFwKHNjaGVtYUxvb2tBdC5yYW5nZU1hcFZlcnRpY2FsRG93biwgZGVmYXVsdE91dHB1dFNjYWxlKTtcbiAgICBjb25zdCBtYXBWVSA9IHRoaXMuX3YxSW1wb3J0UmFuZ2VNYXAoc2NoZW1hTG9va0F0LnJhbmdlTWFwVmVydGljYWxVcCwgZGVmYXVsdE91dHB1dFNjYWxlKTtcblxuICAgIGxldCBhcHBsaWVyO1xuXG4gICAgaWYgKHNjaGVtYUxvb2tBdC50eXBlID09PSAnZXhwcmVzc2lvbicpIHtcbiAgICAgIGFwcGxpZXIgPSBuZXcgVlJNTG9va0F0RXhwcmVzc2lvbkFwcGxpZXIoZXhwcmVzc2lvbnMsIG1hcEhJLCBtYXBITywgbWFwVkQsIG1hcFZVKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBwbGllciA9IG5ldyBWUk1Mb29rQXRCb25lQXBwbGllcihodW1hbm9pZCwgbWFwSEksIG1hcEhPLCBtYXBWRCwgbWFwVlUpO1xuICAgIH1cblxuICAgIGNvbnN0IGxvb2tBdCA9IHRoaXMuX2ltcG9ydExvb2tBdChodW1hbm9pZCwgYXBwbGllcik7XG5cbiAgICBsb29rQXQub2Zmc2V0RnJvbUhlYWRCb25lLmZyb21BcnJheShzY2hlbWFMb29rQXQub2Zmc2V0RnJvbUhlYWRCb25lID8/IFswLjAsIDAuMDYsIDAuMF0pO1xuXG4gICAgcmV0dXJuIGxvb2tBdDtcbiAgfVxuXG4gIHByaXZhdGUgX3YxSW1wb3J0UmFuZ2VNYXAoXG4gICAgc2NoZW1hUmFuZ2VNYXA6IFYxVlJNU2NoZW1hLkxvb2tBdFJhbmdlTWFwIHwgdW5kZWZpbmVkLFxuICAgIGRlZmF1bHRPdXRwdXRTY2FsZTogbnVtYmVyLFxuICApOiBWUk1Mb29rQXRSYW5nZU1hcCB7XG4gICAgbGV0IGlucHV0TWF4VmFsdWUgPSBzY2hlbWFSYW5nZU1hcD8uaW5wdXRNYXhWYWx1ZSA/PyA5MC4wO1xuICAgIGNvbnN0IG91dHB1dFNjYWxlID0gc2NoZW1hUmFuZ2VNYXA/Lm91dHB1dFNjYWxlID8/IGRlZmF1bHRPdXRwdXRTY2FsZTtcblxuICAgIC8vIEl0IG1pZ2h0IGNhdXNlIE5hTiB3aGVuIGBpbnB1dE1heFZhbHVlYCBpcyB0b28gc21hbGxcbiAgICAvLyB3aGljaCBtYWtlcyB0aGUgbWVzaCBvZiB0aGUgaGVhZCBkaXNhcHBlYXJcbiAgICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9waXhpdi90aHJlZS12cm0vaXNzdWVzLzEyMDFcbiAgICBpZiAoaW5wdXRNYXhWYWx1ZSA8IElOUFVUX01BWF9WQUxVRV9NSU5JTVVNKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICdWUk1Mb29rQXRMb2FkZXJQbHVnaW46IGlucHV0TWF4VmFsdWUgb2YgYSByYW5nZSBtYXAgaXMgdG9vIHNtYWxsLiBDb25zaWRlciByZXZpZXdpbmcgdGhlIHJhbmdlIG1hcCEnLFxuICAgICAgKTtcbiAgICAgIGlucHV0TWF4VmFsdWUgPSBJTlBVVF9NQVhfVkFMVUVfTUlOSU1VTTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFZSTUxvb2tBdFJhbmdlTWFwKGlucHV0TWF4VmFsdWUsIG91dHB1dFNjYWxlKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX3YwSW1wb3J0KFxuICAgIGdsdGY6IEdMVEYsXG4gICAgaHVtYW5vaWQ6IFZSTUh1bWFub2lkLFxuICAgIGV4cHJlc3Npb25zOiBWUk1FeHByZXNzaW9uTWFuYWdlcixcbiAgKTogUHJvbWlzZTxWUk1Mb29rQXQgfCBudWxsPiB7XG4gICAgY29uc3QganNvbiA9IHRoaXMucGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAgIC8vIGVhcmx5IGFib3J0IGlmIGl0IGRvZXNuJ3QgdXNlIHZybVxuICAgIGNvbnN0IHZybUV4dCA9IGpzb24uZXh0ZW5zaW9ucz8uVlJNIGFzIFYwVlJNLlZSTSB8IHVuZGVmaW5lZDtcbiAgICBpZiAoIXZybUV4dCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc2NoZW1hRmlyc3RQZXJzb24gPSB2cm1FeHQuZmlyc3RQZXJzb247XG4gICAgaWYgKCFzY2hlbWFGaXJzdFBlcnNvbikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgZGVmYXVsdE91dHB1dFNjYWxlID0gc2NoZW1hRmlyc3RQZXJzb24ubG9va0F0VHlwZU5hbWUgPT09ICdCbGVuZFNoYXBlJyA/IDEuMCA6IDEwLjA7XG5cbiAgICBjb25zdCBtYXBISSA9IHRoaXMuX3YwSW1wb3J0RGVncmVlTWFwKHNjaGVtYUZpcnN0UGVyc29uLmxvb2tBdEhvcml6b250YWxJbm5lciwgZGVmYXVsdE91dHB1dFNjYWxlKTtcbiAgICBjb25zdCBtYXBITyA9IHRoaXMuX3YwSW1wb3J0RGVncmVlTWFwKHNjaGVtYUZpcnN0UGVyc29uLmxvb2tBdEhvcml6b250YWxPdXRlciwgZGVmYXVsdE91dHB1dFNjYWxlKTtcbiAgICBjb25zdCBtYXBWRCA9IHRoaXMuX3YwSW1wb3J0RGVncmVlTWFwKHNjaGVtYUZpcnN0UGVyc29uLmxvb2tBdFZlcnRpY2FsRG93biwgZGVmYXVsdE91dHB1dFNjYWxlKTtcbiAgICBjb25zdCBtYXBWVSA9IHRoaXMuX3YwSW1wb3J0RGVncmVlTWFwKHNjaGVtYUZpcnN0UGVyc29uLmxvb2tBdFZlcnRpY2FsVXAsIGRlZmF1bHRPdXRwdXRTY2FsZSk7XG5cbiAgICBsZXQgYXBwbGllcjtcblxuICAgIGlmIChzY2hlbWFGaXJzdFBlcnNvbi5sb29rQXRUeXBlTmFtZSA9PT0gJ0JsZW5kU2hhcGUnKSB7XG4gICAgICBhcHBsaWVyID0gbmV3IFZSTUxvb2tBdEV4cHJlc3Npb25BcHBsaWVyKGV4cHJlc3Npb25zLCBtYXBISSwgbWFwSE8sIG1hcFZELCBtYXBWVSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwcGxpZXIgPSBuZXcgVlJNTG9va0F0Qm9uZUFwcGxpZXIoaHVtYW5vaWQsIG1hcEhJLCBtYXBITywgbWFwVkQsIG1hcFZVKTtcbiAgICB9XG5cbiAgICBjb25zdCBsb29rQXQgPSB0aGlzLl9pbXBvcnRMb29rQXQoaHVtYW5vaWQsIGFwcGxpZXIpO1xuXG4gICAgaWYgKHNjaGVtYUZpcnN0UGVyc29uLmZpcnN0UGVyc29uQm9uZU9mZnNldCkge1xuICAgICAgbG9va0F0Lm9mZnNldEZyb21IZWFkQm9uZS5zZXQoXG4gICAgICAgIHNjaGVtYUZpcnN0UGVyc29uLmZpcnN0UGVyc29uQm9uZU9mZnNldC54ID8/IDAuMCxcbiAgICAgICAgc2NoZW1hRmlyc3RQZXJzb24uZmlyc3RQZXJzb25Cb25lT2Zmc2V0LnkgPz8gMC4wNixcbiAgICAgICAgLShzY2hlbWFGaXJzdFBlcnNvbi5maXJzdFBlcnNvbkJvbmVPZmZzZXQueiA/PyAwLjApLFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9va0F0Lm9mZnNldEZyb21IZWFkQm9uZS5zZXQoMC4wLCAwLjA2LCAwLjApO1xuICAgIH1cblxuICAgIC8vIFZSTSAwLjAgYXJlIGZhY2luZyBaLSBpbnN0ZWFkIG9mIForXG4gICAgbG9va0F0LmZhY2VGcm9udC5zZXQoMC4wLCAwLjAsIC0xLjApO1xuXG4gICAgaWYgKGFwcGxpZXIgaW5zdGFuY2VvZiBWUk1Mb29rQXRCb25lQXBwbGllcikge1xuICAgICAgYXBwbGllci5mYWNlRnJvbnQuc2V0KDAuMCwgMC4wLCAtMS4wKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbG9va0F0O1xuICB9XG5cbiAgcHJpdmF0ZSBfdjBJbXBvcnREZWdyZWVNYXAoXG4gICAgc2NoZW1hRGVncmVlTWFwOiBWMFZSTS5GaXJzdFBlcnNvbkRlZ3JlZU1hcCB8IHVuZGVmaW5lZCxcbiAgICBkZWZhdWx0T3V0cHV0U2NhbGU6IG51bWJlcixcbiAgKTogVlJNTG9va0F0UmFuZ2VNYXAge1xuICAgIGNvbnN0IGN1cnZlID0gc2NoZW1hRGVncmVlTWFwPy5jdXJ2ZTtcbiAgICBpZiAoSlNPTi5zdHJpbmdpZnkoY3VydmUpICE9PSAnWzAsMCwwLDEsMSwxLDEsMF0nKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0N1cnZlcyBvZiBMb29rQXREZWdyZWVNYXAgZGVmaW5lZCBpbiBWUk0gMC4wIGFyZSBub3Qgc3VwcG9ydGVkJyk7XG4gICAgfVxuXG4gICAgbGV0IHhSYW5nZSA9IHNjaGVtYURlZ3JlZU1hcD8ueFJhbmdlID8/IDkwLjA7XG4gICAgY29uc3QgeVJhbmdlID0gc2NoZW1hRGVncmVlTWFwPy55UmFuZ2UgPz8gZGVmYXVsdE91dHB1dFNjYWxlO1xuXG4gICAgLy8gSXQgbWlnaHQgY2F1c2UgTmFOIHdoZW4gYHhSYW5nZWAgaXMgdG9vIHNtYWxsXG4gICAgLy8gd2hpY2ggbWFrZXMgdGhlIG1lc2ggb2YgdGhlIGhlYWQgZGlzYXBwZWFyXG4gICAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vcGl4aXYvdGhyZWUtdnJtL2lzc3Vlcy8xMjAxXG4gICAgaWYgKHhSYW5nZSA8IElOUFVUX01BWF9WQUxVRV9NSU5JTVVNKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1ZSTUxvb2tBdExvYWRlclBsdWdpbjogeFJhbmdlIG9mIGEgZGVncmVlIG1hcCBpcyB0b28gc21hbGwuIENvbnNpZGVyIHJldmlld2luZyB0aGUgZGVncmVlIG1hcCEnKTtcbiAgICAgIHhSYW5nZSA9IElOUFVUX01BWF9WQUxVRV9NSU5JTVVNO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgVlJNTG9va0F0UmFuZ2VNYXAoeFJhbmdlLCB5UmFuZ2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW1wb3J0TG9va0F0KGh1bWFub2lkOiBWUk1IdW1hbm9pZCwgYXBwbGllcjogVlJNTG9va0F0QXBwbGllcik6IFZSTUxvb2tBdCB7XG4gICAgY29uc3QgbG9va0F0ID0gbmV3IFZSTUxvb2tBdChodW1hbm9pZCwgYXBwbGllcik7XG5cbiAgICBpZiAodGhpcy5oZWxwZXJSb290KSB7XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgVlJNTG9va0F0SGVscGVyKGxvb2tBdCk7XG4gICAgICB0aGlzLmhlbHBlclJvb3QuYWRkKGhlbHBlcik7XG4gICAgICBoZWxwZXIucmVuZGVyT3JkZXIgPSB0aGlzLmhlbHBlclJvb3QucmVuZGVyT3JkZXI7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxvb2tBdDtcbiAgfVxufVxuIiwgIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiAqL1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSB0eXBlIG9mIGFwcGxpZXIuXG4gKi9cbmV4cG9ydCBjb25zdCBWUk1Mb29rQXRUeXBlTmFtZSA9IHtcbiAgQm9uZTogJ2JvbmUnLFxuICBFeHByZXNzaW9uOiAnZXhwcmVzc2lvbicsXG59O1xuXG5leHBvcnQgdHlwZSBWUk1Mb29rQXRUeXBlTmFtZSA9ICh0eXBlb2YgVlJNTG9va0F0VHlwZU5hbWUpW2tleW9mIHR5cGVvZiBWUk1Mb29rQXRUeXBlTmFtZV07XG4iLCAiaW1wb3J0IHR5cGUgeyBHTFRGLCBHTFRGTG9hZGVyUGx1Z2luLCBHTFRGUGFyc2VyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlci5qcyc7XG5pbXBvcnQgdHlwZSB7IFZSTTBNZXRhIH0gZnJvbSAnLi9WUk0wTWV0YSc7XG5pbXBvcnQgdHlwZSB7IFZSTTFNZXRhIH0gZnJvbSAnLi9WUk0xTWV0YSc7XG5pbXBvcnQgdHlwZSB7IFZSTU1ldGEgfSBmcm9tICcuL1ZSTU1ldGEnO1xuaW1wb3J0IHR5cGUgeyBWUk1NZXRhTG9hZGVyUGx1Z2luT3B0aW9ucyB9IGZyb20gJy4vVlJNTWV0YUxvYWRlclBsdWdpbk9wdGlvbnMnO1xuaW1wb3J0IHR5cGUgKiBhcyBWMFZSTSBmcm9tICdAcGl4aXYvdHlwZXMtdnJtLTAuMCc7XG5pbXBvcnQgdHlwZSAqIGFzIFYxVlJNU2NoZW1hIGZyb20gJ0BwaXhpdi90eXBlcy12cm1jLXZybS0xLjAnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgcmVzb2x2ZVVSTCB9IGZyb20gJy4uL3V0aWxzL3Jlc29sdmVVUkwnO1xuaW1wb3J0IHsgR0xURiBhcyBHTFRGU2NoZW1hIH0gZnJvbSAnQGdsdGYtdHJhbnNmb3JtL2NvcmUnO1xuXG4vKipcbiAqIFBvc3NpYmxlIHNwZWMgdmVyc2lvbnMgaXQgcmVjb2duaXplcy5cbiAqL1xuY29uc3QgUE9TU0lCTEVfU1BFQ19WRVJTSU9OUyA9IG5ldyBTZXQoWycxLjAnLCAnMS4wLWJldGEnXSk7XG5cbi8qKlxuICogQSBwbHVnaW4gb2YgR0xURkxvYWRlciB0aGF0IGltcG9ydHMgYSB7QGxpbmsgVlJNMU1ldGF9IGZyb20gYSBWUk0gZXh0ZW5zaW9uIG9mIGEgR0xURi5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTU1ldGFMb2FkZXJQbHVnaW4gaW1wbGVtZW50cyBHTFRGTG9hZGVyUGx1Z2luIHtcbiAgcHVibGljIHJlYWRvbmx5IHBhcnNlcjogR0xURlBhcnNlcjtcblxuICAvKipcbiAgICogSWYgYGZhbHNlYCwgaXQgd29uJ3QgbG9hZCBpdHMgdGh1bWJuYWlsIGltYWdlICh7QGxpbmsgVlJNMU1ldGEudGh1bWJuYWlsSW1hZ2V9KS5cbiAgICogYGZhbHNlYCBieSBkZWZhdWx0LlxuICAgKi9cbiAgcHVibGljIG5lZWRUaHVtYm5haWxJbWFnZTogYm9vbGVhbjtcblxuICAvKipcbiAgICogQSBsaXN0IG9mIGxpY2Vuc2UgdXJscy5cbiAgICogVGhpcyBtZXRhIGxvYWRlciB3aWxsIGFjY2VwdCB0aGVzZSBgbGljZW5zZVVybGBzLlxuICAgKiBPdGhlcndpc2UgaXQgd29uJ3QgYmUgbG9hZGVkLlxuICAgKi9cbiAgcHVibGljIGFjY2VwdExpY2Vuc2VVcmxzOiBzdHJpbmdbXTtcblxuICAvKipcbiAgICogV2hldGhlciBpdCBzaG91bGQgYWNjZXB0IFZSTTAuMCBtZXRhIG9yIG5vdC5cbiAgICogTm90ZSB0aGF0IGl0IG1pZ2h0IGxvYWQge0BsaW5rIFZSTTBNZXRhfSBpbnN0ZWFkIG9mIHtAbGluayBWUk0xTWV0YX0gd2hlbiB0aGlzIGlzIGB0cnVlYC5cbiAgICogYHRydWVgIGJ5IGRlZmF1bHQuXG4gICAqL1xuICBwdWJsaWMgYWNjZXB0VjBNZXRhOiBib29sZWFuO1xuXG4gIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xuICAgIC8vIFdlIHNob3VsZCB1c2UgdGhlIGV4dGVuc2lvbiBuYW1lIGluc3RlYWQgYnV0IHdlIGhhdmUgbXVsdGlwbGUgcGx1Z2lucyBmb3IgYW4gZXh0ZW5zaW9uLi4uXG4gICAgcmV0dXJuICdWUk1NZXRhTG9hZGVyUGx1Z2luJztcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJzZXI6IEdMVEZQYXJzZXIsIG9wdGlvbnM/OiBWUk1NZXRhTG9hZGVyUGx1Z2luT3B0aW9ucykge1xuICAgIHRoaXMucGFyc2VyID0gcGFyc2VyO1xuXG4gICAgdGhpcy5uZWVkVGh1bWJuYWlsSW1hZ2UgPSBvcHRpb25zPy5uZWVkVGh1bWJuYWlsSW1hZ2UgPz8gZmFsc2U7XG4gICAgdGhpcy5hY2NlcHRMaWNlbnNlVXJscyA9IG9wdGlvbnM/LmFjY2VwdExpY2Vuc2VVcmxzID8/IFsnaHR0cHM6Ly92cm0uZGV2L2xpY2Vuc2VzLzEuMC8nXTtcbiAgICB0aGlzLmFjY2VwdFYwTWV0YSA9IG9wdGlvbnM/LmFjY2VwdFYwTWV0YSA/PyB0cnVlO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGFmdGVyUm9vdChnbHRmOiBHTFRGKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgZ2x0Zi51c2VyRGF0YS52cm1NZXRhID0gYXdhaXQgdGhpcy5faW1wb3J0KGdsdGYpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfaW1wb3J0KGdsdGY6IEdMVEYpOiBQcm9taXNlPFZSTU1ldGEgfCBudWxsPiB7XG4gICAgY29uc3QgdjFSZXN1bHQgPSBhd2FpdCB0aGlzLl92MUltcG9ydChnbHRmKTtcbiAgICBpZiAodjFSZXN1bHQgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHYxUmVzdWx0O1xuICAgIH1cblxuICAgIGNvbnN0IHYwUmVzdWx0ID0gYXdhaXQgdGhpcy5fdjBJbXBvcnQoZ2x0Zik7XG4gICAgaWYgKHYwUmVzdWx0ICE9IG51bGwpIHtcbiAgICAgIHJldHVybiB2MFJlc3VsdDtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX3YxSW1wb3J0KGdsdGY6IEdMVEYpOiBQcm9taXNlPFZSTTFNZXRhIHwgbnVsbD4ge1xuICAgIGNvbnN0IGpzb24gPSB0aGlzLnBhcnNlci5qc29uIGFzIEdMVEZTY2hlbWEuSUdMVEY7XG5cbiAgICAvLyBlYXJseSBhYm9ydCBpZiBpdCBkb2Vzbid0IHVzZSB2cm1cbiAgICBjb25zdCBpc1ZSTVVzZWQgPSBqc29uLmV4dGVuc2lvbnNVc2VkPy5pbmRleE9mKCdWUk1DX3ZybScpICE9PSAtMTtcbiAgICBpZiAoIWlzVlJNVXNlZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgZXh0ZW5zaW9uID0ganNvbi5leHRlbnNpb25zPy5bJ1ZSTUNfdnJtJ10gYXMgVjFWUk1TY2hlbWEuVlJNQ1ZSTSB8IHVuZGVmaW5lZDtcbiAgICBpZiAoZXh0ZW5zaW9uID09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNwZWNWZXJzaW9uID0gZXh0ZW5zaW9uLnNwZWNWZXJzaW9uO1xuICAgIGlmICghUE9TU0lCTEVfU1BFQ19WRVJTSU9OUy5oYXMoc3BlY1ZlcnNpb24pKSB7XG4gICAgICBjb25zb2xlLndhcm4oYFZSTU1ldGFMb2FkZXJQbHVnaW46IFVua25vd24gVlJNQ192cm0gc3BlY1ZlcnNpb24gXCIke3NwZWNWZXJzaW9ufVwiYCk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzY2hlbWFNZXRhID0gZXh0ZW5zaW9uLm1ldGE7XG4gICAgaWYgKCFzY2hlbWFNZXRhKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyB0aHJvdyBhbiBlcnJvciBpZiBhY2NlcHRWME1ldGEgaXMgZmFsc2VcbiAgICBjb25zdCBsaWNlbnNlVXJsID0gc2NoZW1hTWV0YS5saWNlbnNlVXJsO1xuICAgIGNvbnN0IGFjY2VwdExpY2Vuc2VVcmxzU2V0ID0gbmV3IFNldCh0aGlzLmFjY2VwdExpY2Vuc2VVcmxzKTtcbiAgICBpZiAoIWFjY2VwdExpY2Vuc2VVcmxzU2V0LmhhcyhsaWNlbnNlVXJsKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBWUk1NZXRhTG9hZGVyUGx1Z2luOiBUaGUgbGljZW5zZSB1cmwgXCIke2xpY2Vuc2VVcmx9XCIgaXMgbm90IGFjY2VwdGVkYCk7XG4gICAgfVxuXG4gICAgbGV0IHRodW1ibmFpbEltYWdlOiBIVE1MSW1hZ2VFbGVtZW50IHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICAgIGlmICh0aGlzLm5lZWRUaHVtYm5haWxJbWFnZSAmJiBzY2hlbWFNZXRhLnRodW1ibmFpbEltYWdlICE9IG51bGwpIHtcbiAgICAgIHRodW1ibmFpbEltYWdlID0gKGF3YWl0IHRoaXMuX2V4dHJhY3RHTFRGSW1hZ2Uoc2NoZW1hTWV0YS50aHVtYm5haWxJbWFnZSkpID8/IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgbWV0YVZlcnNpb246ICcxJyxcbiAgICAgIG5hbWU6IHNjaGVtYU1ldGEubmFtZSxcbiAgICAgIHZlcnNpb246IHNjaGVtYU1ldGEudmVyc2lvbixcbiAgICAgIGF1dGhvcnM6IHNjaGVtYU1ldGEuYXV0aG9ycyxcbiAgICAgIGNvcHlyaWdodEluZm9ybWF0aW9uOiBzY2hlbWFNZXRhLmNvcHlyaWdodEluZm9ybWF0aW9uLFxuICAgICAgY29udGFjdEluZm9ybWF0aW9uOiBzY2hlbWFNZXRhLmNvbnRhY3RJbmZvcm1hdGlvbixcbiAgICAgIHJlZmVyZW5jZXM6IHNjaGVtYU1ldGEucmVmZXJlbmNlcyxcbiAgICAgIHRoaXJkUGFydHlMaWNlbnNlczogc2NoZW1hTWV0YS50aGlyZFBhcnR5TGljZW5zZXMsXG4gICAgICB0aHVtYm5haWxJbWFnZSxcbiAgICAgIGxpY2Vuc2VVcmw6IHNjaGVtYU1ldGEubGljZW5zZVVybCxcbiAgICAgIGF2YXRhclBlcm1pc3Npb246IHNjaGVtYU1ldGEuYXZhdGFyUGVybWlzc2lvbixcbiAgICAgIGFsbG93RXhjZXNzaXZlbHlWaW9sZW50VXNhZ2U6IHNjaGVtYU1ldGEuYWxsb3dFeGNlc3NpdmVseVZpb2xlbnRVc2FnZSxcbiAgICAgIGFsbG93RXhjZXNzaXZlbHlTZXh1YWxVc2FnZTogc2NoZW1hTWV0YS5hbGxvd0V4Y2Vzc2l2ZWx5U2V4dWFsVXNhZ2UsXG4gICAgICBjb21tZXJjaWFsVXNhZ2U6IHNjaGVtYU1ldGEuY29tbWVyY2lhbFVzYWdlLFxuICAgICAgYWxsb3dQb2xpdGljYWxPclJlbGlnaW91c1VzYWdlOiBzY2hlbWFNZXRhLmFsbG93UG9saXRpY2FsT3JSZWxpZ2lvdXNVc2FnZSxcbiAgICAgIGFsbG93QW50aXNvY2lhbE9ySGF0ZVVzYWdlOiBzY2hlbWFNZXRhLmFsbG93QW50aXNvY2lhbE9ySGF0ZVVzYWdlLFxuICAgICAgY3JlZGl0Tm90YXRpb246IHNjaGVtYU1ldGEuY3JlZGl0Tm90YXRpb24sXG4gICAgICBhbGxvd1JlZGlzdHJpYnV0aW9uOiBzY2hlbWFNZXRhLmFsbG93UmVkaXN0cmlidXRpb24sXG4gICAgICBtb2RpZmljYXRpb246IHNjaGVtYU1ldGEubW9kaWZpY2F0aW9uLFxuICAgICAgb3RoZXJMaWNlbnNlVXJsOiBzY2hlbWFNZXRhLm90aGVyTGljZW5zZVVybCxcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfdjBJbXBvcnQoZ2x0ZjogR0xURik6IFByb21pc2U8VlJNME1ldGEgfCBudWxsPiB7XG4gICAgY29uc3QganNvbiA9IHRoaXMucGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAgIC8vIGVhcmx5IGFib3J0IGlmIGl0IGRvZXNuJ3QgdXNlIHZybVxuICAgIGNvbnN0IHZybUV4dCA9IGpzb24uZXh0ZW5zaW9ucz8uVlJNIGFzIFYwVlJNLlZSTSB8IHVuZGVmaW5lZDtcbiAgICBpZiAoIXZybUV4dCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc2NoZW1hTWV0YSA9IHZybUV4dC5tZXRhO1xuICAgIGlmICghc2NoZW1hTWV0YSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gdGhyb3cgYW4gZXJyb3IgaWYgYWNjZXB0VjBNZXRhIGlzIGZhbHNlXG4gICAgaWYgKCF0aGlzLmFjY2VwdFYwTWV0YSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdWUk1NZXRhTG9hZGVyUGx1Z2luOiBBdHRlbXB0ZWQgdG8gbG9hZCBWUk0wLjAgbWV0YSBidXQgYWNjZXB0VjBNZXRhIGlzIGZhbHNlJyk7XG4gICAgfVxuXG4gICAgLy8gbG9hZCB0aHVtYm5haWwgdGV4dHVyZVxuICAgIGxldCB0ZXh0dXJlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgICBpZiAodGhpcy5uZWVkVGh1bWJuYWlsSW1hZ2UgJiYgc2NoZW1hTWV0YS50ZXh0dXJlICE9IG51bGwgJiYgc2NoZW1hTWV0YS50ZXh0dXJlICE9PSAtMSkge1xuICAgICAgdGV4dHVyZSA9IGF3YWl0IHRoaXMucGFyc2VyLmdldERlcGVuZGVuY3koJ3RleHR1cmUnLCBzY2hlbWFNZXRhLnRleHR1cmUpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBtZXRhVmVyc2lvbjogJzAnLFxuICAgICAgYWxsb3dlZFVzZXJOYW1lOiBzY2hlbWFNZXRhLmFsbG93ZWRVc2VyTmFtZSxcbiAgICAgIGF1dGhvcjogc2NoZW1hTWV0YS5hdXRob3IsXG4gICAgICBjb21tZXJjaWFsVXNzYWdlTmFtZTogc2NoZW1hTWV0YS5jb21tZXJjaWFsVXNzYWdlTmFtZSxcbiAgICAgIGNvbnRhY3RJbmZvcm1hdGlvbjogc2NoZW1hTWV0YS5jb250YWN0SW5mb3JtYXRpb24sXG4gICAgICBsaWNlbnNlTmFtZTogc2NoZW1hTWV0YS5saWNlbnNlTmFtZSxcbiAgICAgIG90aGVyTGljZW5zZVVybDogc2NoZW1hTWV0YS5vdGhlckxpY2Vuc2VVcmwsXG4gICAgICBvdGhlclBlcm1pc3Npb25Vcmw6IHNjaGVtYU1ldGEub3RoZXJQZXJtaXNzaW9uVXJsLFxuICAgICAgcmVmZXJlbmNlOiBzY2hlbWFNZXRhLnJlZmVyZW5jZSxcbiAgICAgIHNleHVhbFVzc2FnZU5hbWU6IHNjaGVtYU1ldGEuc2V4dWFsVXNzYWdlTmFtZSxcbiAgICAgIHRleHR1cmU6IHRleHR1cmUgPz8gdW5kZWZpbmVkLFxuICAgICAgdGl0bGU6IHNjaGVtYU1ldGEudGl0bGUsXG4gICAgICB2ZXJzaW9uOiBzY2hlbWFNZXRhLnZlcnNpb24sXG4gICAgICB2aW9sZW50VXNzYWdlTmFtZTogc2NoZW1hTWV0YS52aW9sZW50VXNzYWdlTmFtZSxcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfZXh0cmFjdEdMVEZJbWFnZShpbmRleDogbnVtYmVyKTogUHJvbWlzZTxIVE1MSW1hZ2VFbGVtZW50IHwgbnVsbD4ge1xuICAgIGNvbnN0IGpzb24gPSB0aGlzLnBhcnNlci5qc29uIGFzIEdMVEZTY2hlbWEuSUdMVEY7XG5cbiAgICBjb25zdCBzb3VyY2UgPSBqc29uLmltYWdlcz8uW2luZGV4XTtcblxuICAgIGlmIChzb3VyY2UgPT0gbnVsbCkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBgVlJNTWV0YUxvYWRlclBsdWdpbjogQXR0ZW1wdCB0byB1c2UgaW1hZ2VzWyR7aW5kZXh9XSBvZiBnbFRGIGFzIGEgdGh1bWJuYWlsIGJ1dCB0aGUgaW1hZ2UgZG9lc24ndCBleGlzdGAsXG4gICAgICApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gUmVmOiBodHRwczovL2dpdGh1Yi5jb20vbXJkb29iL3RocmVlLmpzL2Jsb2IvcjEyNC9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyLmpzI0wyNDY3XG5cbiAgICAvLyBgc291cmNlLnVyaWAgbWlnaHQgYmUgYSByZWZlcmVuY2UgdG8gYSBmaWxlXG4gICAgbGV0IHNvdXJjZVVSSTogc3RyaW5nIHwgdW5kZWZpbmVkID0gc291cmNlLnVyaTtcblxuICAgIC8vIExvYWQgdGhlIGJpbmFyeSBhcyBhIGJsb2JcbiAgICBpZiAoc291cmNlLmJ1ZmZlclZpZXcgIT0gbnVsbCkge1xuICAgICAgY29uc3QgYnVmZmVyVmlldyA9IGF3YWl0IHRoaXMucGFyc2VyLmdldERlcGVuZGVuY3koJ2J1ZmZlclZpZXcnLCBzb3VyY2UuYnVmZmVyVmlldyk7XG4gICAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW2J1ZmZlclZpZXddLCB7IHR5cGU6IHNvdXJjZS5taW1lVHlwZSB9KTtcbiAgICAgIHNvdXJjZVVSSSA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gICAgfVxuXG4gICAgaWYgKHNvdXJjZVVSSSA9PSBudWxsKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIGBWUk1NZXRhTG9hZGVyUGx1Z2luOiBBdHRlbXB0IHRvIHVzZSBpbWFnZXNbJHtpbmRleH1dIG9mIGdsVEYgYXMgYSB0aHVtYm5haWwgYnV0IHRoZSBpbWFnZSBjb3VsZG4ndCBsb2FkIHByb3Blcmx5YCxcbiAgICAgICk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBsb2FkZXIgPSBuZXcgVEhSRUUuSW1hZ2VMb2FkZXIoKTtcbiAgICByZXR1cm4gYXdhaXQgbG9hZGVyLmxvYWRBc3luYyhyZXNvbHZlVVJMKHNvdXJjZVVSSSwgKHRoaXMucGFyc2VyIGFzIGFueSkub3B0aW9ucy5wYXRoKSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgIGNvbnNvbGUud2FybignVlJNTWV0YUxvYWRlclBsdWdpbjogRmFpbGVkIHRvIGxvYWQgYSB0aHVtYm5haWwgaW1hZ2UnKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0pO1xuICB9XG59XG4iLCAiLyoqXG4gKiBZb2lua2VkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9ibG9iL21hc3Rlci9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyLmpzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlVVJMKHVybDogc3RyaW5nLCBwYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICAvLyBJbnZhbGlkIFVSTFxuICBpZiAodHlwZW9mIHVybCAhPT0gJ3N0cmluZycgfHwgdXJsID09PSAnJykgcmV0dXJuICcnO1xuXG4gIC8vIEhvc3QgUmVsYXRpdmUgVVJMXG4gIGlmICgvXmh0dHBzPzpcXC9cXC8vaS50ZXN0KHBhdGgpICYmIC9eXFwvLy50ZXN0KHVybCkpIHtcbiAgICBwYXRoID0gcGF0aC5yZXBsYWNlKC8oXmh0dHBzPzpcXC9cXC9bXi9dKykuKi9pLCAnJDEnKTtcbiAgfVxuXG4gIC8vIEFic29sdXRlIFVSTCBodHRwOi8vLGh0dHBzOi8vLC8vXG4gIGlmICgvXihodHRwcz86KT9cXC9cXC8vaS50ZXN0KHVybCkpIHJldHVybiB1cmw7XG5cbiAgLy8gRGF0YSBVUklcbiAgaWYgKC9eZGF0YTouKiwuKiQvaS50ZXN0KHVybCkpIHJldHVybiB1cmw7XG5cbiAgLy8gQmxvYiBVUkxcbiAgaWYgKC9eYmxvYjouKiQvaS50ZXN0KHVybCkpIHJldHVybiB1cmw7XG5cbiAgLy8gUmVsYXRpdmUgVVJMXG4gIHJldHVybiBwYXRoICsgdXJsO1xufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTUV4cHJlc3Npb25NYW5hZ2VyIH0gZnJvbSAnLi9leHByZXNzaW9ucy9WUk1FeHByZXNzaW9uTWFuYWdlcic7XG5pbXBvcnQgeyBWUk1GaXJzdFBlcnNvbiB9IGZyb20gJy4vZmlyc3RQZXJzb24vVlJNRmlyc3RQZXJzb24nO1xuaW1wb3J0IHsgVlJNSHVtYW5vaWQgfSBmcm9tICcuL2h1bWFub2lkL1ZSTUh1bWFub2lkJztcbmltcG9ydCB7IFZSTUxvb2tBdCB9IGZyb20gJy4vbG9va0F0L1ZSTUxvb2tBdCc7XG5pbXBvcnQgeyBWUk1NZXRhIH0gZnJvbSAnLi9tZXRhL1ZSTU1ldGEnO1xuaW1wb3J0IHsgVlJNQ29yZVBhcmFtZXRlcnMgfSBmcm9tICcuL1ZSTUNvcmVQYXJhbWV0ZXJzJztcblxuLyoqXG4gKiBBIGNsYXNzIHRoYXQgcmVwcmVzZW50cyBhIHNpbmdsZSBWUk0gbW9kZWwuXG4gKiBUaGlzIGNsYXNzIG9ubHkgaW5jbHVkZXMgY29yZSBzcGVjIG9mIHRoZSBWUk0gKGBWUk1DX3ZybWApLlxuICovXG5leHBvcnQgY2xhc3MgVlJNQ29yZSB7XG4gIC8qKlxuICAgKiBgVEhSRUUuR3JvdXBgIHRoYXQgY29udGFpbnMgdGhlIGVudGlyZSBWUk0uXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgc2NlbmU6IFRIUkVFLkdyb3VwO1xuXG4gIC8qKlxuICAgKiBDb250YWlucyBtZXRhIGZpZWxkcyBvZiB0aGUgVlJNLlxuICAgKiBZb3UgbWlnaHQgd2FudCB0byByZWZlciB0aGVzZSBsaWNlbnNlIGZpZWxkcyBiZWZvcmUgdXNlIHlvdXIgVlJNcy5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBtZXRhOiBWUk1NZXRhO1xuXG4gIC8qKlxuICAgKiBDb250YWlucyB7QGxpbmsgVlJNSHVtYW5vaWR9IG9mIHRoZSBWUk0uXG4gICAqIFlvdSBjYW4gY29udHJvbCBlYWNoIGJvbmVzIHVzaW5nIHtAbGluayBWUk1IdW1hbm9pZC5nZXROb3JtYWxpemVkQm9uZU5vZGV9IG9yIHtAbGluayBWUk1IdW1hbm9pZC5nZXRSYXdCb25lTm9kZX0uXG4gICAqXG4gICAqIEBUT0RPIEFkZCBhIGxpbmsgdG8gVlJNIHNwZWNcbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBodW1hbm9pZDogVlJNSHVtYW5vaWQ7XG5cbiAgLyoqXG4gICAqIENvbnRhaW5zIHtAbGluayBWUk1FeHByZXNzaW9uTWFuYWdlcn0gb2YgdGhlIFZSTS5cbiAgICogWW91IG1pZ2h0IHdhbnQgdG8gY29udHJvbCB0aGVzZSBmYWNpYWwgZXhwcmVzc2lvbnMgdmlhIHtAbGluayBWUk1FeHByZXNzaW9uTWFuYWdlci5zZXRWYWx1ZX0uXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgZXhwcmVzc2lvbk1hbmFnZXI/OiBWUk1FeHByZXNzaW9uTWFuYWdlcjtcblxuICAvKipcbiAgICogQ29udGFpbnMge0BsaW5rIFZSTUZpcnN0UGVyc29ufSBvZiB0aGUgVlJNLlxuICAgKiBWUk1GaXJzdFBlcnNvbiBpcyBtb3N0bHkgdXNlZCBmb3IgbWVzaCBjdWxsaW5nIGZvciBmaXJzdCBwZXJzb24gdmlldy5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBmaXJzdFBlcnNvbj86IFZSTUZpcnN0UGVyc29uO1xuXG4gIC8qKlxuICAgKiBDb250YWlucyB7QGxpbmsgVlJNTG9va0F0fSBvZiB0aGUgVlJNLlxuICAgKiBZb3UgbWlnaHQgd2FudCB0byB1c2Uge0BsaW5rIFZSTUxvb2tBdC50YXJnZXR9IHRvIGNvbnRyb2wgdGhlIGV5ZSBkaXJlY3Rpb24gb2YgeW91ciBWUk1zLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGxvb2tBdD86IFZSTUxvb2tBdDtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IFZSTSBpbnN0YW5jZS5cbiAgICpcbiAgICogQHBhcmFtIHBhcmFtcyB7QGxpbmsgVlJNUGFyYW1ldGVyc30gdGhhdCByZXByZXNlbnRzIGNvbXBvbmVudHMgb2YgdGhlIFZSTVxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBhcmFtczogVlJNQ29yZVBhcmFtZXRlcnMpIHtcbiAgICB0aGlzLnNjZW5lID0gcGFyYW1zLnNjZW5lO1xuICAgIHRoaXMubWV0YSA9IHBhcmFtcy5tZXRhO1xuICAgIHRoaXMuaHVtYW5vaWQgPSBwYXJhbXMuaHVtYW5vaWQ7XG4gICAgdGhpcy5leHByZXNzaW9uTWFuYWdlciA9IHBhcmFtcy5leHByZXNzaW9uTWFuYWdlcjtcbiAgICB0aGlzLmZpcnN0UGVyc29uID0gcGFyYW1zLmZpcnN0UGVyc29uO1xuICAgIHRoaXMubG9va0F0ID0gcGFyYW1zLmxvb2tBdDtcbiAgfVxuXG4gIC8qKlxuICAgKiAqKllvdSBuZWVkIHRvIGNhbGwgdGhpcyBvbiB5b3VyIHVwZGF0ZSBsb29wLioqXG4gICAqXG4gICAqIFRoaXMgZnVuY3Rpb24gdXBkYXRlcyBldmVyeSBWUk0gY29tcG9uZW50cy5cbiAgICpcbiAgICogQHBhcmFtIGRlbHRhIGRlbHRhVGltZVxuICAgKi9cbiAgcHVibGljIHVwZGF0ZShkZWx0YTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5odW1hbm9pZC51cGRhdGUoKTtcblxuICAgIGlmICh0aGlzLmxvb2tBdCkge1xuICAgICAgdGhpcy5sb29rQXQudXBkYXRlKGRlbHRhKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5leHByZXNzaW9uTWFuYWdlcikge1xuICAgICAgdGhpcy5leHByZXNzaW9uTWFuYWdlci51cGRhdGUoKTtcbiAgICB9XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBHTFRGLCBHTFRGTG9hZGVyUGx1Z2luLCBHTFRGUGFyc2VyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlci5qcyc7XG5pbXBvcnQgeyBWUk1Db3JlTG9hZGVyUGx1Z2luT3B0aW9ucyB9IGZyb20gJy4vVlJNQ29yZUxvYWRlclBsdWdpbk9wdGlvbnMnO1xuaW1wb3J0IHsgVlJNQ29yZSB9IGZyb20gJy4vVlJNQ29yZSc7XG5pbXBvcnQgeyBWUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luIH0gZnJvbSAnLi9leHByZXNzaW9ucy9WUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luJztcbmltcG9ydCB7IFZSTUZpcnN0UGVyc29uTG9hZGVyUGx1Z2luIH0gZnJvbSAnLi9maXJzdFBlcnNvbi9WUk1GaXJzdFBlcnNvbkxvYWRlclBsdWdpbic7XG5pbXBvcnQgeyBWUk1IdW1hbm9pZExvYWRlclBsdWdpbiB9IGZyb20gJy4vaHVtYW5vaWQvVlJNSHVtYW5vaWRMb2FkZXJQbHVnaW4nO1xuaW1wb3J0IHsgVlJNTWV0YUxvYWRlclBsdWdpbiB9IGZyb20gJy4vbWV0YS9WUk1NZXRhTG9hZGVyUGx1Z2luJztcbmltcG9ydCB7IFZSTUxvb2tBdExvYWRlclBsdWdpbiB9IGZyb20gJy4vbG9va0F0L1ZSTUxvb2tBdExvYWRlclBsdWdpbic7XG5pbXBvcnQgdHlwZSB7IFZSTUh1bWFub2lkIH0gZnJvbSAnLi9odW1hbm9pZCc7XG5pbXBvcnQgdHlwZSB7IFZSTU1ldGEgfSBmcm9tICcuL21ldGEnO1xuXG5leHBvcnQgY2xhc3MgVlJNQ29yZUxvYWRlclBsdWdpbiBpbXBsZW1lbnRzIEdMVEZMb2FkZXJQbHVnaW4ge1xuICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICAvLyBXZSBzaG91bGQgdXNlIHRoZSBleHRlbnNpb24gbmFtZSBpbnN0ZWFkIGJ1dCB3ZSBoYXZlIG11bHRpcGxlIHBsdWdpbnMgZm9yIGFuIGV4dGVuc2lvbi4uLlxuICAgIHJldHVybiAnVlJNQ192cm0nO1xuICB9XG5cbiAgcHVibGljIHJlYWRvbmx5IHBhcnNlcjogR0xURlBhcnNlcjtcblxuICBwdWJsaWMgcmVhZG9ubHkgZXhwcmVzc2lvblBsdWdpbjogVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbjtcbiAgcHVibGljIHJlYWRvbmx5IGZpcnN0UGVyc29uUGx1Z2luOiBWUk1GaXJzdFBlcnNvbkxvYWRlclBsdWdpbjtcbiAgcHVibGljIHJlYWRvbmx5IGh1bWFub2lkUGx1Z2luOiBWUk1IdW1hbm9pZExvYWRlclBsdWdpbjtcbiAgcHVibGljIHJlYWRvbmx5IGxvb2tBdFBsdWdpbjogVlJNTG9va0F0TG9hZGVyUGx1Z2luO1xuICBwdWJsaWMgcmVhZG9ubHkgbWV0YVBsdWdpbjogVlJNTWV0YUxvYWRlclBsdWdpbjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IocGFyc2VyOiBHTFRGUGFyc2VyLCBvcHRpb25zPzogVlJNQ29yZUxvYWRlclBsdWdpbk9wdGlvbnMpIHtcbiAgICB0aGlzLnBhcnNlciA9IHBhcnNlcjtcblxuICAgIGNvbnN0IGhlbHBlclJvb3QgPSBvcHRpb25zPy5oZWxwZXJSb290O1xuICAgIGNvbnN0IGF1dG9VcGRhdGVIdW1hbkJvbmVzID0gb3B0aW9ucz8uYXV0b1VwZGF0ZUh1bWFuQm9uZXM7XG5cbiAgICB0aGlzLmV4cHJlc3Npb25QbHVnaW4gPSBvcHRpb25zPy5leHByZXNzaW9uUGx1Z2luID8/IG5ldyBWUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luKHBhcnNlcik7XG4gICAgdGhpcy5maXJzdFBlcnNvblBsdWdpbiA9IG9wdGlvbnM/LmZpcnN0UGVyc29uUGx1Z2luID8/IG5ldyBWUk1GaXJzdFBlcnNvbkxvYWRlclBsdWdpbihwYXJzZXIpO1xuICAgIHRoaXMuaHVtYW5vaWRQbHVnaW4gPVxuICAgICAgb3B0aW9ucz8uaHVtYW5vaWRQbHVnaW4gPz8gbmV3IFZSTUh1bWFub2lkTG9hZGVyUGx1Z2luKHBhcnNlciwgeyBoZWxwZXJSb290LCBhdXRvVXBkYXRlSHVtYW5Cb25lcyB9KTtcbiAgICB0aGlzLmxvb2tBdFBsdWdpbiA9IG9wdGlvbnM/Lmxvb2tBdFBsdWdpbiA/PyBuZXcgVlJNTG9va0F0TG9hZGVyUGx1Z2luKHBhcnNlciwgeyBoZWxwZXJSb290IH0pO1xuICAgIHRoaXMubWV0YVBsdWdpbiA9IG9wdGlvbnM/Lm1ldGFQbHVnaW4gPz8gbmV3IFZSTU1ldGFMb2FkZXJQbHVnaW4ocGFyc2VyKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBhZnRlclJvb3QoZ2x0ZjogR0xURik6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMubWV0YVBsdWdpbi5hZnRlclJvb3QoZ2x0Zik7XG4gICAgYXdhaXQgdGhpcy5odW1hbm9pZFBsdWdpbi5hZnRlclJvb3QoZ2x0Zik7XG4gICAgYXdhaXQgdGhpcy5leHByZXNzaW9uUGx1Z2luLmFmdGVyUm9vdChnbHRmKTtcbiAgICBhd2FpdCB0aGlzLmxvb2tBdFBsdWdpbi5hZnRlclJvb3QoZ2x0Zik7XG4gICAgYXdhaXQgdGhpcy5maXJzdFBlcnNvblBsdWdpbi5hZnRlclJvb3QoZ2x0Zik7XG5cbiAgICBjb25zdCBtZXRhID0gZ2x0Zi51c2VyRGF0YS52cm1NZXRhIGFzIFZSTU1ldGEgfCBudWxsO1xuICAgIGNvbnN0IGh1bWFub2lkID0gZ2x0Zi51c2VyRGF0YS52cm1IdW1hbm9pZCBhcyBWUk1IdW1hbm9pZCB8IG51bGw7XG5cbiAgICAvLyBtZXRhIGFuZCBodW1hbm9pZCBhcmUgcmVxdWlyZWQgdG8gYmUgYSBWUk0uXG4gICAgLy8gRG9uJ3QgY3JlYXRlIFZSTSBpZiB0aGV5IGFyZSBudWxsXG4gICAgaWYgKG1ldGEgJiYgaHVtYW5vaWQpIHtcbiAgICAgIGNvbnN0IHZybUNvcmUgPSBuZXcgVlJNQ29yZSh7XG4gICAgICAgIHNjZW5lOiBnbHRmLnNjZW5lLFxuICAgICAgICBleHByZXNzaW9uTWFuYWdlcjogZ2x0Zi51c2VyRGF0YS52cm1FeHByZXNzaW9uTWFuYWdlcixcbiAgICAgICAgZmlyc3RQZXJzb246IGdsdGYudXNlckRhdGEudnJtRmlyc3RQZXJzb24sXG4gICAgICAgIGh1bWFub2lkLFxuICAgICAgICBsb29rQXQ6IGdsdGYudXNlckRhdGEudnJtTG9va0F0LFxuICAgICAgICBtZXRhLFxuICAgICAgfSk7XG5cbiAgICAgIGdsdGYudXNlckRhdGEudnJtQ29yZSA9IHZybUNvcmU7XG4gICAgfVxuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNQ29yZSB9IGZyb20gJ0BwaXhpdi90aHJlZS12cm0tY29yZSc7XG5pbXBvcnQgeyBWUk1Ob2RlQ29uc3RyYWludE1hbmFnZXIgfSBmcm9tICdAcGl4aXYvdGhyZWUtdnJtLW5vZGUtY29uc3RyYWludCc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lTWFuYWdlciB9IGZyb20gJ0BwaXhpdi90aHJlZS12cm0tc3ByaW5nYm9uZSc7XG5pbXBvcnQgeyBWUk1QYXJhbWV0ZXJzIH0gZnJvbSAnLi9WUk1QYXJhbWV0ZXJzJztcblxuLyoqXG4gKiBBIGNsYXNzIHRoYXQgcmVwcmVzZW50cyBhIHNpbmdsZSBWUk0gbW9kZWwuXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk0gZXh0ZW5kcyBWUk1Db3JlIHtcbiAgLyoqXG4gICAqIENvbnRhaW5zIG1hdGVyaWFscyBvZiB0aGUgVlJNLlxuICAgKiBgdXBkYXRlYCBtZXRob2Qgb2YgdGhlc2UgbWF0ZXJpYWxzIHdpbGwgYmUgY2FsbGVkIHZpYSBpdHMge0BsaW5rIFZSTS51cGRhdGV9IG1ldGhvZC5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBtYXRlcmlhbHM/OiBUSFJFRS5NYXRlcmlhbFtdO1xuXG4gIC8qKlxuICAgKiBBIHtAbGluayBWUk1TcHJpbmdCb25lTWFuYWdlcn0gbWFuaXB1bGF0ZXMgYWxsIHNwcmluZyBib25lcyBhdHRhY2hlZCBvbiB0aGUgVlJNLlxuICAgKiBVc3VhbGx5IHlvdSBkb24ndCBoYXZlIHRvIGNhcmUgYWJvdXQgdGhpcyBwcm9wZXJ0eS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBzcHJpbmdCb25lTWFuYWdlcj86IFZSTVNwcmluZ0JvbmVNYW5hZ2VyO1xuXG4gIC8qKlxuICAgKiBBIHtAbGluayBWUk1Ob2RlQ29uc3RyYWludE1hbmFnZXJ9IG1hbmlwdWxhdGVzIGFsbCBjb25zdHJhaW50cyBhdHRhY2hlZCBvbiB0aGUgVlJNLlxuICAgKiBVc3VhbGx5IHlvdSBkb24ndCBoYXZlIHRvIGNhcmUgYWJvdXQgdGhpcyBwcm9wZXJ0eS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBub2RlQ29uc3RyYWludE1hbmFnZXI/OiBWUk1Ob2RlQ29uc3RyYWludE1hbmFnZXI7XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBWUk0gaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSBwYXJhbXMge0BsaW5rIFZSTVBhcmFtZXRlcnN9IHRoYXQgcmVwcmVzZW50cyBjb21wb25lbnRzIG9mIHRoZSBWUk1cbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJhbXM6IFZSTVBhcmFtZXRlcnMpIHtcbiAgICBzdXBlcihwYXJhbXMpO1xuXG4gICAgdGhpcy5tYXRlcmlhbHMgPSBwYXJhbXMubWF0ZXJpYWxzO1xuICAgIHRoaXMuc3ByaW5nQm9uZU1hbmFnZXIgPSBwYXJhbXMuc3ByaW5nQm9uZU1hbmFnZXI7XG4gICAgdGhpcy5ub2RlQ29uc3RyYWludE1hbmFnZXIgPSBwYXJhbXMubm9kZUNvbnN0cmFpbnRNYW5hZ2VyO1xuICB9XG5cbiAgLyoqXG4gICAqICoqWW91IG5lZWQgdG8gY2FsbCB0aGlzIG9uIHlvdXIgdXBkYXRlIGxvb3AuKipcbiAgICpcbiAgICogVGhpcyBmdW5jdGlvbiB1cGRhdGVzIGV2ZXJ5IFZSTSBjb21wb25lbnRzLlxuICAgKlxuICAgKiBAcGFyYW0gZGVsdGEgZGVsdGFUaW1lXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcbiAgICBzdXBlci51cGRhdGUoZGVsdGEpO1xuXG4gICAgaWYgKHRoaXMubm9kZUNvbnN0cmFpbnRNYW5hZ2VyKSB7XG4gICAgICB0aGlzLm5vZGVDb25zdHJhaW50TWFuYWdlci51cGRhdGUoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zcHJpbmdCb25lTWFuYWdlcikge1xuICAgICAgdGhpcy5zcHJpbmdCb25lTWFuYWdlci51cGRhdGUoZGVsdGEpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm1hdGVyaWFscykge1xuICAgICAgdGhpcy5tYXRlcmlhbHMuZm9yRWFjaCgobWF0ZXJpYWw6IGFueSkgPT4ge1xuICAgICAgICBpZiAobWF0ZXJpYWwudXBkYXRlKSB7XG4gICAgICAgICAgbWF0ZXJpYWwudXBkYXRlKGRlbHRhKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0ICogYXMgVjFNVG9vblNjaGVtYSBmcm9tICdAcGl4aXYvdHlwZXMtdnJtYy1tYXRlcmlhbHMtbXRvb24tMS4wJztcbmltcG9ydCB0eXBlIHsgR0xURiwgR0xURkxvYWRlciwgR0xURkxvYWRlclBsdWdpbiwgR0xURlBhcnNlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXIuanMnO1xuaW1wb3J0IHR5cGUgeyBNVG9vbk1hdGVyaWFsUGFyYW1ldGVycyB9IGZyb20gJy4vTVRvb25NYXRlcmlhbFBhcmFtZXRlcnMnO1xuaW1wb3J0IHR5cGUgeyBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZSB9IGZyb20gJy4vTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUnO1xuaW1wb3J0IHsgR0xURk1Ub29uTWF0ZXJpYWxQYXJhbXNBc3NpZ25IZWxwZXIgfSBmcm9tICcuL0dMVEZNVG9vbk1hdGVyaWFsUGFyYW1zQXNzaWduSGVscGVyJztcbmltcG9ydCB0eXBlIHsgTVRvb25NYXRlcmlhbExvYWRlclBsdWdpbk9wdGlvbnMgfSBmcm9tICcuL01Ub29uTWF0ZXJpYWxMb2FkZXJQbHVnaW5PcHRpb25zJztcbmltcG9ydCB0eXBlIHsgTVRvb25NYXRlcmlhbERlYnVnTW9kZSB9IGZyb20gJy4vTVRvb25NYXRlcmlhbERlYnVnTW9kZSc7XG5pbXBvcnQgeyBHTFRGIGFzIEdMVEZTY2hlbWEgfSBmcm9tICdAZ2x0Zi10cmFuc2Zvcm0vY29yZSc7XG5pbXBvcnQgeyBNVG9vbk1hdGVyaWFsIH0gZnJvbSAnLi9NVG9vbk1hdGVyaWFsJztcbmltcG9ydCB0eXBlIHsgTVRvb25Ob2RlTWF0ZXJpYWwgfSBmcm9tICcuL25vZGVzL01Ub29uTm9kZU1hdGVyaWFsJztcblxuLyoqXG4gKiBQb3NzaWJsZSBzcGVjIHZlcnNpb25zIGl0IHJlY29nbml6ZXMuXG4gKi9cbmNvbnN0IFBPU1NJQkxFX1NQRUNfVkVSU0lPTlMgPSBuZXcgU2V0KFsnMS4wJywgJzEuMC1iZXRhJ10pO1xuXG4vKipcbiAqIEEgbG9hZGVyIHBsdWdpbiBvZiB7QGxpbmsgR0xURkxvYWRlcn0gZm9yIHRoZSBleHRlbnNpb24gYFZSTUNfbWF0ZXJpYWxzX210b29uYC5cbiAqXG4gKiBUaGlzIHBsdWdpbiBpcyBmb3IgdXNlcyB3aXRoIFdlYkdMUmVuZGVyZXIgYnkgZGVmYXVsdC5cbiAqIFRvIHVzZSBNVG9vbiBpbiBXZWJHUFVSZW5kZXJlciwgc2V0IHtAbGluayBtYXRlcmlhbFR5cGV9IHRvIHtAbGluayBNVG9vbk5vZGVNYXRlcmlhbH0uXG4gKlxuICogQGV4YW1wbGUgdG8gdXNlIHdpdGggV2ViR1BVUmVuZGVyZXJcbiAqIGBgYGpzXG4gKiBpbXBvcnQgeyBNVG9vbk1hdGVyaWFsTG9hZGVyUGx1Z2luIH0gZnJvbSAnQHBpeGl2L3RocmVlLXZybS1tYXRlcmlhbHMtbXRvb24nO1xuICogaW1wb3J0IHsgTVRvb25Ob2RlTWF0ZXJpYWwgfSBmcm9tICdAcGl4aXYvdGhyZWUtdnJtLW1hdGVyaWFscy1tdG9vbi9ub2Rlcyc7XG4gKlxuICogLy8gLi4uXG4gKlxuICogLy8gUmVnaXN0ZXIgYSBNVG9vbk1hdGVyaWFsTG9hZGVyUGx1Z2luIHdpdGggTVRvb25Ob2RlTWF0ZXJpYWxcbiAqIGxvYWRlci5yZWdpc3RlcigocGFyc2VyKSA9PiB7XG4gKlxuICogICAvLyBjcmVhdGUgYSBXZWJHUFUgY29tcGF0aWJsZSBNVG9vbk1hdGVyaWFsTG9hZGVyUGx1Z2luXG4gKiAgIHJldHVybiBuZXcgTVRvb25NYXRlcmlhbExvYWRlclBsdWdpbihwYXJzZXIsIHtcbiAqXG4gKiAgICAgLy8gc2V0IHRoZSBtYXRlcmlhbCB0eXBlIHRvIE1Ub29uTm9kZU1hdGVyaWFsXG4gKiAgICAgbWF0ZXJpYWxUeXBlOiBNVG9vbk5vZGVNYXRlcmlhbCxcbiAqXG4gKiAgIH0pO1xuICpcbiAqIH0pO1xuICogYGBgXG4gKi9cbmV4cG9ydCBjbGFzcyBNVG9vbk1hdGVyaWFsTG9hZGVyUGx1Z2luIGltcGxlbWVudHMgR0xURkxvYWRlclBsdWdpbiB7XG4gIHB1YmxpYyBzdGF0aWMgRVhURU5TSU9OX05BTUUgPSAnVlJNQ19tYXRlcmlhbHNfbXRvb24nO1xuXG4gIC8qKlxuICAgKiBUaGUgdHlwZSBvZiB0aGUgbWF0ZXJpYWwgdGhhdCB0aGlzIHBsdWdpbiB3aWxsIGdlbmVyYXRlLlxuICAgKlxuICAgKiBJZiB5b3UgYXJlIHVzaW5nIHRoaXMgcGx1Z2luIHdpdGggV2ViR1BVLCBzZXQgdGhpcyB0byB7QGxpbmsgTVRvb25Ob2RlTWF0ZXJpYWx9LlxuICAgKlxuICAgKiBAZGVmYXVsdCBNVG9vbk1hdGVyaWFsXG4gICAqL1xuICBwdWJsaWMgbWF0ZXJpYWxUeXBlOiB0eXBlb2YgVEhSRUUuTWF0ZXJpYWw7XG5cbiAgLyoqXG4gICAqIFRoaXMgdmFsdWUgd2lsbCBiZSBhZGRlZCB0byBgcmVuZGVyT3JkZXJgIG9mIGV2ZXJ5IG1lc2hlcyB3aG8gaGF2ZSBNYXRlcmlhbHNNVG9vbi5cbiAgICogVGhlIGZpbmFsIHJlbmRlck9yZGVyIHdpbGwgYmUgc3VtIG9mIHRoaXMgYHJlbmRlck9yZGVyT2Zmc2V0YCBhbmQgYHJlbmRlclF1ZXVlT2Zmc2V0TnVtYmVyYCBmb3IgZWFjaCBtYXRlcmlhbHMuXG4gICAqXG4gICAqIEBkZWZhdWx0IDBcbiAgICovXG4gIHB1YmxpYyByZW5kZXJPcmRlck9mZnNldDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGVyZSBpcyBhIGxpbmUgb2YgdGhlIHNoYWRlciBjYWxsZWQgXCJjb21tZW50IG91dCBpZiB5b3Ugd2FudCB0byBQQlIgYWJzb2x1dGVseVwiIGluIFZSTTAuMCBNVG9vbi5cbiAgICogV2hlbiB0aGlzIGlzIHRydWUsIHRoZSBtYXRlcmlhbCBlbmFibGVzIHRoZSBsaW5lIHRvIG1ha2UgaXQgY29tcGF0aWJsZSB3aXRoIHRoZSBsZWdhY3kgcmVuZGVyaW5nIG9mIFZSTS5cbiAgICogVXN1YWxseSBub3QgcmVjb21tZW5kZWQgdG8gdHVybiB0aGlzIG9uLlxuICAgKlxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgcHVibGljIHYwQ29tcGF0U2hhZGU6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIERlYnVnIG1vZGUgZm9yIHRoZSBtYXRlcmlhbC5cbiAgICogWW91IGNhbiB2aXN1YWxpemUgc2V2ZXJhbCBjb21wb25lbnRzIGZvciBkaWFnbm9zaXMgdXNpbmcgZGVidWcgbW9kZS5cbiAgICpcbiAgICogU2VlOiB7QGxpbmsgTVRvb25NYXRlcmlhbERlYnVnTW9kZX1cbiAgICpcbiAgICogQGRlZmF1bHQgJ25vbmUnXG4gICAqL1xuICBwdWJsaWMgZGVidWdNb2RlOiBNVG9vbk1hdGVyaWFsRGVidWdNb2RlO1xuXG4gIHB1YmxpYyByZWFkb25seSBwYXJzZXI6IEdMVEZQYXJzZXI7XG5cbiAgLyoqXG4gICAqIExvYWRlZCBtYXRlcmlhbHMgd2lsbCBiZSBzdG9yZWQgaW4gdGhpcyBzZXQuXG4gICAqIFdpbGwgYmUgdHJhbnNmZXJyZWQgaW50byBgZ2x0Zi51c2VyRGF0YS52cm1NVG9vbk1hdGVyaWFsc2AgaW4ge0BsaW5rIGFmdGVyUm9vdH0uXG4gICAqL1xuICBwcml2YXRlIHJlYWRvbmx5IF9tVG9vbk1hdGVyaWFsU2V0OiBTZXQ8VEhSRUUuTWF0ZXJpYWw+O1xuXG4gIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBNVG9vbk1hdGVyaWFsTG9hZGVyUGx1Z2luLkVYVEVOU0lPTl9OQU1FO1xuICB9XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBhcnNlcjogR0xURlBhcnNlciwgb3B0aW9uczogTVRvb25NYXRlcmlhbExvYWRlclBsdWdpbk9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMucGFyc2VyID0gcGFyc2VyO1xuXG4gICAgdGhpcy5tYXRlcmlhbFR5cGUgPSBvcHRpb25zLm1hdGVyaWFsVHlwZSA/PyBNVG9vbk1hdGVyaWFsO1xuICAgIHRoaXMucmVuZGVyT3JkZXJPZmZzZXQgPSBvcHRpb25zLnJlbmRlck9yZGVyT2Zmc2V0ID8/IDA7XG4gICAgdGhpcy52MENvbXBhdFNoYWRlID0gb3B0aW9ucy52MENvbXBhdFNoYWRlID8/IGZhbHNlO1xuICAgIHRoaXMuZGVidWdNb2RlID0gb3B0aW9ucy5kZWJ1Z01vZGUgPz8gJ25vbmUnO1xuXG4gICAgdGhpcy5fbVRvb25NYXRlcmlhbFNldCA9IG5ldyBTZXQoKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBiZWZvcmVSb290KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMuX3JlbW92ZVVubGl0RXh0ZW5zaW9uSWZNVG9vbkV4aXN0cygpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGFmdGVyUm9vdChnbHRmOiBHTFRGKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgZ2x0Zi51c2VyRGF0YS52cm1NVG9vbk1hdGVyaWFscyA9IEFycmF5LmZyb20odGhpcy5fbVRvb25NYXRlcmlhbFNldCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0TWF0ZXJpYWxUeXBlKG1hdGVyaWFsSW5kZXg6IG51bWJlcik6IHR5cGVvZiBUSFJFRS5NYXRlcmlhbCB8IG51bGwge1xuICAgIGNvbnN0IHYxRXh0ZW5zaW9uID0gdGhpcy5fZ2V0TVRvb25FeHRlbnNpb24obWF0ZXJpYWxJbmRleCk7XG4gICAgaWYgKHYxRXh0ZW5zaW9uKSB7XG4gICAgICByZXR1cm4gdGhpcy5tYXRlcmlhbFR5cGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwdWJsaWMgZXh0ZW5kTWF0ZXJpYWxQYXJhbXMobWF0ZXJpYWxJbmRleDogbnVtYmVyLCBtYXRlcmlhbFBhcmFtczogTVRvb25NYXRlcmlhbFBhcmFtZXRlcnMpOiBQcm9taXNlPGFueT4gfCBudWxsIHtcbiAgICBjb25zdCBleHRlbnNpb24gPSB0aGlzLl9nZXRNVG9vbkV4dGVuc2lvbihtYXRlcmlhbEluZGV4KTtcbiAgICBpZiAoZXh0ZW5zaW9uKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZXh0ZW5kTWF0ZXJpYWxQYXJhbXMoZXh0ZW5zaW9uLCBtYXRlcmlhbFBhcmFtcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgbG9hZE1lc2gobWVzaEluZGV4OiBudW1iZXIpOiBQcm9taXNlPFRIUkVFLkdyb3VwIHwgVEhSRUUuTWVzaCB8IFRIUkVFLlNraW5uZWRNZXNoPiB7XG4gICAgY29uc3QgcGFyc2VyID0gdGhpcy5wYXJzZXI7XG4gICAgY29uc3QganNvbiA9IHBhcnNlci5qc29uIGFzIEdMVEZTY2hlbWEuSUdMVEY7XG5cbiAgICBjb25zdCBtZXNoRGVmID0ganNvbi5tZXNoZXM/LlttZXNoSW5kZXhdO1xuXG4gICAgaWYgKG1lc2hEZWYgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgTVRvb25NYXRlcmlhbExvYWRlclBsdWdpbjogQXR0ZW1wdCB0byB1c2UgbWVzaGVzWyR7bWVzaEluZGV4fV0gb2YgZ2xURiBidXQgdGhlIG1lc2ggZG9lc24ndCBleGlzdGAsXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IHByaW1pdGl2ZXNEZWYgPSBtZXNoRGVmLnByaW1pdGl2ZXM7XG5cbiAgICBjb25zdCBtZXNoT3JHcm91cCA9IGF3YWl0IHBhcnNlci5sb2FkTWVzaChtZXNoSW5kZXgpO1xuXG4gICAgaWYgKHByaW1pdGl2ZXNEZWYubGVuZ3RoID09PSAxKSB7XG4gICAgICBjb25zdCBtZXNoID0gbWVzaE9yR3JvdXAgYXMgVEhSRUUuTWVzaDtcbiAgICAgIGNvbnN0IG1hdGVyaWFsSW5kZXggPSBwcmltaXRpdmVzRGVmWzBdLm1hdGVyaWFsO1xuXG4gICAgICBpZiAobWF0ZXJpYWxJbmRleCAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuX3NldHVwUHJpbWl0aXZlKG1lc2gsIG1hdGVyaWFsSW5kZXgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBncm91cCA9IG1lc2hPckdyb3VwIGFzIFRIUkVFLkdyb3VwO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcmltaXRpdmVzRGVmLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IG1lc2ggPSBncm91cC5jaGlsZHJlbltpXSBhcyBUSFJFRS5NZXNoO1xuICAgICAgICBjb25zdCBtYXRlcmlhbEluZGV4ID0gcHJpbWl0aXZlc0RlZltpXS5tYXRlcmlhbDtcblxuICAgICAgICBpZiAobWF0ZXJpYWxJbmRleCAhPSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5fc2V0dXBQcmltaXRpdmUobWVzaCwgbWF0ZXJpYWxJbmRleCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbWVzaE9yR3JvdXA7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlIHVzZSBvZiBgS0hSX21hdGVyaWFsc191bmxpdGAgZnJvbSBpdHMgYG1hdGVyaWFsc2AgaWYgdGhlIG1hdGVyaWFsIGlzIHVzaW5nIE1Ub29uLlxuICAgKlxuICAgKiBTaW5jZSBHTFRGTG9hZGVyIGhhdmUgc28gbWFueSBoYXJkY29kZWQgcHJvY2VkdXJlIHJlbGF0ZWQgdG8gYEtIUl9tYXRlcmlhbHNfdW5saXRgXG4gICAqIHdlIGhhdmUgdG8gZGVsZXRlIHRoZSBleHRlbnNpb24gYmVmb3JlIHdlIHN0YXJ0IHRvIHBhcnNlIHRoZSBnbFRGLlxuICAgKi9cbiAgcHJpdmF0ZSBfcmVtb3ZlVW5saXRFeHRlbnNpb25JZk1Ub29uRXhpc3RzKCk6IHZvaWQge1xuICAgIGNvbnN0IHBhcnNlciA9IHRoaXMucGFyc2VyO1xuICAgIGNvbnN0IGpzb24gPSBwYXJzZXIuanNvbiBhcyBHTFRGU2NoZW1hLklHTFRGO1xuXG4gICAgY29uc3QgbWF0ZXJpYWxEZWZzID0ganNvbi5tYXRlcmlhbHM7XG4gICAgbWF0ZXJpYWxEZWZzPy5tYXAoKG1hdGVyaWFsRGVmLCBpTWF0ZXJpYWwpID0+IHtcbiAgICAgIGNvbnN0IGV4dGVuc2lvbiA9IHRoaXMuX2dldE1Ub29uRXh0ZW5zaW9uKGlNYXRlcmlhbCk7XG5cbiAgICAgIGlmIChleHRlbnNpb24gJiYgbWF0ZXJpYWxEZWYuZXh0ZW5zaW9ucz8uWydLSFJfbWF0ZXJpYWxzX3VubGl0J10pIHtcbiAgICAgICAgZGVsZXRlIG1hdGVyaWFsRGVmLmV4dGVuc2lvbnNbJ0tIUl9tYXRlcmlhbHNfdW5saXQnXTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfZ2V0TVRvb25FeHRlbnNpb24obWF0ZXJpYWxJbmRleDogbnVtYmVyKTogVjFNVG9vblNjaGVtYS5WUk1DTWF0ZXJpYWxzTVRvb24gfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IHBhcnNlciA9IHRoaXMucGFyc2VyO1xuICAgIGNvbnN0IGpzb24gPSBwYXJzZXIuanNvbiBhcyBHTFRGU2NoZW1hLklHTFRGO1xuXG4gICAgY29uc3QgbWF0ZXJpYWxEZWYgPSBqc29uLm1hdGVyaWFscz8uW21hdGVyaWFsSW5kZXhdO1xuXG4gICAgaWYgKG1hdGVyaWFsRGVmID09IG51bGwpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgYE1Ub29uTWF0ZXJpYWxMb2FkZXJQbHVnaW46IEF0dGVtcHQgdG8gdXNlIG1hdGVyaWFsc1ske21hdGVyaWFsSW5kZXh9XSBvZiBnbFRGIGJ1dCB0aGUgbWF0ZXJpYWwgZG9lc24ndCBleGlzdGAsXG4gICAgICApO1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBjb25zdCBleHRlbnNpb24gPSBtYXRlcmlhbERlZi5leHRlbnNpb25zPy5bTVRvb25NYXRlcmlhbExvYWRlclBsdWdpbi5FWFRFTlNJT05fTkFNRV0gYXNcbiAgICAgIFYxTVRvb25TY2hlbWEuVlJNQ01hdGVyaWFsc01Ub29uIHwgdW5kZWZpbmVkO1xuICAgIGlmIChleHRlbnNpb24gPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBjb25zdCBzcGVjVmVyc2lvbiA9IGV4dGVuc2lvbi5zcGVjVmVyc2lvbjtcbiAgICBpZiAoIVBPU1NJQkxFX1NQRUNfVkVSU0lPTlMuaGFzKHNwZWNWZXJzaW9uKSkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBgTVRvb25NYXRlcmlhbExvYWRlclBsdWdpbjogVW5rbm93biAke01Ub29uTWF0ZXJpYWxMb2FkZXJQbHVnaW4uRVhURU5TSU9OX05BTUV9IHNwZWNWZXJzaW9uIFwiJHtzcGVjVmVyc2lvbn1cImAsXG4gICAgICApO1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICByZXR1cm4gZXh0ZW5zaW9uO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfZXh0ZW5kTWF0ZXJpYWxQYXJhbXMoXG4gICAgZXh0ZW5zaW9uOiBWMU1Ub29uU2NoZW1hLlZSTUNNYXRlcmlhbHNNVG9vbixcbiAgICBtYXRlcmlhbFBhcmFtczogTVRvb25NYXRlcmlhbFBhcmFtZXRlcnMsXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIC8vIFJlbW92aW5nIG1hdGVyaWFsIHBhcmFtcyB0aGF0IGlzIG5vdCByZXF1aXJlZCB0byBzdXByZXNzIHdhcm5pbmdzLlxuICAgIGRlbGV0ZSAobWF0ZXJpYWxQYXJhbXMgYXMgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWxQYXJhbWV0ZXJzKS5tZXRhbG5lc3M7XG4gICAgZGVsZXRlIChtYXRlcmlhbFBhcmFtcyBhcyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbFBhcmFtZXRlcnMpLnJvdWdobmVzcztcblxuICAgIGNvbnN0IGFzc2lnbkhlbHBlciA9IG5ldyBHTFRGTVRvb25NYXRlcmlhbFBhcmFtc0Fzc2lnbkhlbHBlcih0aGlzLnBhcnNlciwgbWF0ZXJpYWxQYXJhbXMpO1xuXG4gICAgYXNzaWduSGVscGVyLmFzc2lnblByaW1pdGl2ZSgndHJhbnNwYXJlbnRXaXRoWldyaXRlJywgZXh0ZW5zaW9uLnRyYW5zcGFyZW50V2l0aFpXcml0ZSk7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnbkNvbG9yKCdzaGFkZUNvbG9yRmFjdG9yJywgZXh0ZW5zaW9uLnNoYWRlQ29sb3JGYWN0b3IpO1xuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25UZXh0dXJlKCdzaGFkZU11bHRpcGx5VGV4dHVyZScsIGV4dGVuc2lvbi5zaGFkZU11bHRpcGx5VGV4dHVyZSwgdHJ1ZSk7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnblByaW1pdGl2ZSgnc2hhZGluZ1NoaWZ0RmFjdG9yJywgZXh0ZW5zaW9uLnNoYWRpbmdTaGlmdEZhY3Rvcik7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnblRleHR1cmUoJ3NoYWRpbmdTaGlmdFRleHR1cmUnLCBleHRlbnNpb24uc2hhZGluZ1NoaWZ0VGV4dHVyZSwgdHJ1ZSk7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnblByaW1pdGl2ZSgnc2hhZGluZ1NoaWZ0VGV4dHVyZVNjYWxlJywgZXh0ZW5zaW9uLnNoYWRpbmdTaGlmdFRleHR1cmU/LnNjYWxlKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduUHJpbWl0aXZlKCdzaGFkaW5nVG9vbnlGYWN0b3InLCBleHRlbnNpb24uc2hhZGluZ1Rvb255RmFjdG9yKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduUHJpbWl0aXZlKCdnaUVxdWFsaXphdGlvbkZhY3RvcicsIGV4dGVuc2lvbi5naUVxdWFsaXphdGlvbkZhY3Rvcik7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnbkNvbG9yKCdtYXRjYXBGYWN0b3InLCBleHRlbnNpb24ubWF0Y2FwRmFjdG9yKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduVGV4dHVyZSgnbWF0Y2FwVGV4dHVyZScsIGV4dGVuc2lvbi5tYXRjYXBUZXh0dXJlLCB0cnVlKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduQ29sb3IoJ3BhcmFtZXRyaWNSaW1Db2xvckZhY3RvcicsIGV4dGVuc2lvbi5wYXJhbWV0cmljUmltQ29sb3JGYWN0b3IpO1xuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25UZXh0dXJlKCdyaW1NdWx0aXBseVRleHR1cmUnLCBleHRlbnNpb24ucmltTXVsdGlwbHlUZXh0dXJlLCB0cnVlKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduUHJpbWl0aXZlKCdyaW1MaWdodGluZ01peEZhY3RvcicsIGV4dGVuc2lvbi5yaW1MaWdodGluZ01peEZhY3Rvcik7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnblByaW1pdGl2ZSgncGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlckZhY3RvcicsIGV4dGVuc2lvbi5wYXJhbWV0cmljUmltRnJlc25lbFBvd2VyRmFjdG9yKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduUHJpbWl0aXZlKCdwYXJhbWV0cmljUmltTGlmdEZhY3RvcicsIGV4dGVuc2lvbi5wYXJhbWV0cmljUmltTGlmdEZhY3Rvcik7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnblByaW1pdGl2ZSgnb3V0bGluZVdpZHRoTW9kZScsIGV4dGVuc2lvbi5vdXRsaW5lV2lkdGhNb2RlIGFzIE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduUHJpbWl0aXZlKCdvdXRsaW5lV2lkdGhGYWN0b3InLCBleHRlbnNpb24ub3V0bGluZVdpZHRoRmFjdG9yKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduVGV4dHVyZSgnb3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlJywgZXh0ZW5zaW9uLm91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZSwgZmFsc2UpO1xuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25Db2xvcignb3V0bGluZUNvbG9yRmFjdG9yJywgZXh0ZW5zaW9uLm91dGxpbmVDb2xvckZhY3Rvcik7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnblByaW1pdGl2ZSgnb3V0bGluZUxpZ2h0aW5nTWl4RmFjdG9yJywgZXh0ZW5zaW9uLm91dGxpbmVMaWdodGluZ01peEZhY3Rvcik7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnblRleHR1cmUoJ3V2QW5pbWF0aW9uTWFza1RleHR1cmUnLCBleHRlbnNpb24udXZBbmltYXRpb25NYXNrVGV4dHVyZSwgZmFsc2UpO1xuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25QcmltaXRpdmUoJ3V2QW5pbWF0aW9uU2Nyb2xsWFNwZWVkRmFjdG9yJywgZXh0ZW5zaW9uLnV2QW5pbWF0aW9uU2Nyb2xsWFNwZWVkRmFjdG9yKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduUHJpbWl0aXZlKCd1dkFuaW1hdGlvblNjcm9sbFlTcGVlZEZhY3RvcicsIGV4dGVuc2lvbi51dkFuaW1hdGlvblNjcm9sbFlTcGVlZEZhY3Rvcik7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnblByaW1pdGl2ZSgndXZBbmltYXRpb25Sb3RhdGlvblNwZWVkRmFjdG9yJywgZXh0ZW5zaW9uLnV2QW5pbWF0aW9uUm90YXRpb25TcGVlZEZhY3Rvcik7XG5cbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduUHJpbWl0aXZlKCd2MENvbXBhdFNoYWRlJywgdGhpcy52MENvbXBhdFNoYWRlKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduUHJpbWl0aXZlKCdkZWJ1Z01vZGUnLCB0aGlzLmRlYnVnTW9kZSk7XG5cbiAgICBhd2FpdCBhc3NpZ25IZWxwZXIucGVuZGluZztcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIHdpbGwgZG8gdHdvIHByb2Nlc3NlcyB0aGF0IGlzIHJlcXVpcmVkIHRvIHJlbmRlciBNVG9vbiBwcm9wZXJseS5cbiAgICpcbiAgICogLSBTZXQgcmVuZGVyIG9yZGVyXG4gICAqIC0gR2VuZXJhdGUgb3V0bGluZVxuICAgKlxuICAgKiBAcGFyYW0gbWVzaCBBIHRhcmdldCBHTFRGIHByaW1pdGl2ZVxuICAgKiBAcGFyYW0gbWF0ZXJpYWxJbmRleCBUaGUgbWF0ZXJpYWwgaW5kZXggb2YgdGhlIHByaW1pdGl2ZVxuICAgKi9cbiAgcHJpdmF0ZSBfc2V0dXBQcmltaXRpdmUobWVzaDogVEhSRUUuTWVzaCwgbWF0ZXJpYWxJbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgZXh0ZW5zaW9uID0gdGhpcy5fZ2V0TVRvb25FeHRlbnNpb24obWF0ZXJpYWxJbmRleCk7XG4gICAgaWYgKGV4dGVuc2lvbikge1xuICAgICAgY29uc3QgcmVuZGVyT3JkZXIgPSB0aGlzLl9wYXJzZVJlbmRlck9yZGVyKGV4dGVuc2lvbik7XG4gICAgICBtZXNoLnJlbmRlck9yZGVyID0gcmVuZGVyT3JkZXIgKyB0aGlzLnJlbmRlck9yZGVyT2Zmc2V0O1xuXG4gICAgICB0aGlzLl9nZW5lcmF0ZU91dGxpbmUobWVzaCk7XG5cbiAgICAgIHRoaXMuX2FkZFRvTWF0ZXJpYWxTZXQobWVzaCk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgd2hldGhlciB0aGUgbWF0ZXJpYWwgc2hvdWxkIGdlbmVyYXRlIG91dGxpbmUgb3Igbm90LlxuICAgKiBAcGFyYW0gc3VyZmFjZU1hdGVyaWFsIFRoZSBtYXRlcmlhbCB0byBjaGVja1xuICAgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBtYXRlcmlhbCBzaG91bGQgZ2VuZXJhdGUgb3V0bGluZVxuICAgKi9cbiAgcHJpdmF0ZSBfc2hvdWxkR2VuZXJhdGVPdXRsaW5lKHN1cmZhY2VNYXRlcmlhbDogVEhSRUUuTWF0ZXJpYWwpOiBib29sZWFuIHtcbiAgICAvLyB3ZSBtaWdodCByZWNlaXZlIE1Ub29uTm9kZU1hdGVyaWFsIGFzIHdlbGwgYXMgTVRvb25NYXRlcmlhbFxuICAgIC8vIHNvIHdlJ3JlIGdvbm5hIGR1Y2sgdHlwZSB0byBjaGVjayBpZiBpdCdzIGNvbXBhdGlibGUgd2l0aCBNVG9vbiB0eXBlIG91dGxpbmVzXG4gICAgcmV0dXJuIChcbiAgICAgIHR5cGVvZiAoc3VyZmFjZU1hdGVyaWFsIGFzIGFueSkub3V0bGluZVdpZHRoTW9kZSA9PT0gJ3N0cmluZycgJiZcbiAgICAgIChzdXJmYWNlTWF0ZXJpYWwgYXMgYW55KS5vdXRsaW5lV2lkdGhNb2RlICE9PSAnbm9uZScgJiZcbiAgICAgIHR5cGVvZiAoc3VyZmFjZU1hdGVyaWFsIGFzIGFueSkub3V0bGluZVdpZHRoRmFjdG9yID09PSAnbnVtYmVyJyAmJlxuICAgICAgKHN1cmZhY2VNYXRlcmlhbCBhcyBhbnkpLm91dGxpbmVXaWR0aEZhY3RvciA+IDAuMFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGUgb3V0bGluZSBmb3IgdGhlIGdpdmVuIG1lc2gsIGlmIGl0IG5lZWRzLlxuICAgKlxuICAgKiBAcGFyYW0gbWVzaCBUaGUgdGFyZ2V0IG1lc2hcbiAgICovXG4gIHByaXZhdGUgX2dlbmVyYXRlT3V0bGluZShtZXNoOiBUSFJFRS5NZXNoKTogdm9pZCB7XG4gICAgLy8gT0ssIGl0J3MgdGhlIGhhY2t5IHBhcnQuXG4gICAgLy8gV2UgYXJlIGdvaW5nIHRvIGR1cGxpY2F0ZSB0aGUgTVRvb25NYXRlcmlhbCBmb3Igb3V0bGluZSB1c2UuXG4gICAgLy8gVGhlbiB3ZSBhcmUgZ29pbmcgdG8gY3JlYXRlIHR3byBnZW9tZXRyeSBncm91cHMgYW5kIHJlZmVyIHNhbWUgYnVmZmVyIGJ1dCBkaWZmZXJlbnQgbWF0ZXJpYWwuXG4gICAgLy8gSXQncyBob3cgd2UgZHJhdyB0d28gbWF0ZXJpYWxzIGF0IG9uY2UgdXNpbmcgYSBzaW5nbGUgbWVzaC5cblxuICAgIC8vIG1ha2Ugc3VyZSB0aGUgbWF0ZXJpYWwgaXMgc2luZ2xlXG4gICAgY29uc3Qgc3VyZmFjZU1hdGVyaWFsID0gbWVzaC5tYXRlcmlhbDtcbiAgICBpZiAoIShzdXJmYWNlTWF0ZXJpYWwgaW5zdGFuY2VvZiBUSFJFRS5NYXRlcmlhbCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX3Nob3VsZEdlbmVyYXRlT3V0bGluZShzdXJmYWNlTWF0ZXJpYWwpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gbWFrZSBpdHMgbWF0ZXJpYWwgYW4gYXJyYXlcbiAgICBtZXNoLm1hdGVyaWFsID0gW3N1cmZhY2VNYXRlcmlhbF07IC8vIG1lc2gubWF0ZXJpYWwgaXMgZ3VhcmFudGVlZCB0byBiZSBhIE1hdGVyaWFsIGluIEdMVEZMb2FkZXJcblxuICAgIC8vIGR1cGxpY2F0ZSB0aGUgbWF0ZXJpYWwgZm9yIG91dGxpbmUgdXNlXG4gICAgY29uc3Qgb3V0bGluZU1hdGVyaWFsID0gc3VyZmFjZU1hdGVyaWFsLmNsb25lKCk7XG4gICAgb3V0bGluZU1hdGVyaWFsLm5hbWUgKz0gJyAoT3V0bGluZSknO1xuICAgIChvdXRsaW5lTWF0ZXJpYWwgYXMgYW55KS5pc091dGxpbmUgPSB0cnVlO1xuICAgIG91dGxpbmVNYXRlcmlhbC5zaWRlID0gVEhSRUUuQmFja1NpZGU7XG4gICAgbWVzaC5tYXRlcmlhbC5wdXNoKG91dGxpbmVNYXRlcmlhbCk7XG5cbiAgICAvLyBtYWtlIHR3byBnZW9tZXRyeSBncm91cHMgb3V0IG9mIGEgc2FtZSBidWZmZXJcbiAgICBjb25zdCBnZW9tZXRyeSA9IG1lc2guZ2VvbWV0cnk7IC8vIG1lc2guZ2VvbWV0cnkgaXMgZ3VhcmFudGVlZCB0byBiZSBhIEJ1ZmZlckdlb21ldHJ5IGluIEdMVEZMb2FkZXJcbiAgICBjb25zdCBwcmltaXRpdmVWZXJ0aWNlcyA9IGdlb21ldHJ5LmluZGV4ID8gZ2VvbWV0cnkuaW5kZXguY291bnQgOiBnZW9tZXRyeS5hdHRyaWJ1dGVzLnBvc2l0aW9uLmNvdW50IC8gMztcbiAgICBnZW9tZXRyeS5hZGRHcm91cCgwLCBwcmltaXRpdmVWZXJ0aWNlcywgMCk7XG4gICAgZ2VvbWV0cnkuYWRkR3JvdXAoMCwgcHJpbWl0aXZlVmVydGljZXMsIDEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVG9NYXRlcmlhbFNldChtZXNoOiBUSFJFRS5NZXNoKTogdm9pZCB7XG4gICAgY29uc3QgbWF0ZXJpYWxPck1hdGVyaWFscyA9IG1lc2gubWF0ZXJpYWw7XG4gICAgY29uc3QgbWF0ZXJpYWxTZXQgPSBuZXcgU2V0PFRIUkVFLk1hdGVyaWFsPigpO1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkobWF0ZXJpYWxPck1hdGVyaWFscykpIHtcbiAgICAgIG1hdGVyaWFsT3JNYXRlcmlhbHMuZm9yRWFjaCgobWF0ZXJpYWwpID0+IG1hdGVyaWFsU2V0LmFkZChtYXRlcmlhbCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBtYXRlcmlhbFNldC5hZGQobWF0ZXJpYWxPck1hdGVyaWFscyk7XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBtYXRlcmlhbCBvZiBtYXRlcmlhbFNldCkge1xuICAgICAgdGhpcy5fbVRvb25NYXRlcmlhbFNldC5hZGQobWF0ZXJpYWwpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlUmVuZGVyT3JkZXIoZXh0ZW5zaW9uOiBWMU1Ub29uU2NoZW1hLlZSTUNNYXRlcmlhbHNNVG9vbik6IG51bWJlciB7XG4gICAgLy8gdHJhbnNwYXJlbnRXaXRoWldyaXRlIHJhbmdlcyBmcm9tIDAgdG8gKzlcbiAgICAvLyBtZXJlIHRyYW5zcGFyZW50IHJhbmdlcyBmcm9tIC05IHRvIDBcbiAgICBjb25zdCBlbmFibGVkWldyaXRlID0gZXh0ZW5zaW9uLnRyYW5zcGFyZW50V2l0aFpXcml0ZTtcbiAgICByZXR1cm4gKGVuYWJsZWRaV3JpdGUgPyAwIDogMTkpICsgKGV4dGVuc2lvbi5yZW5kZXJRdWV1ZU9mZnNldE51bWJlciA/PyAwKTtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IEdMVEZQYXJzZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyLmpzJztcbmltcG9ydCB7IE1Ub29uTWF0ZXJpYWxQYXJhbWV0ZXJzIH0gZnJvbSAnLi9NVG9vbk1hdGVyaWFsUGFyYW1ldGVycyc7XG5pbXBvcnQgeyBzZXRUZXh0dXJlQ29sb3JTcGFjZSB9IGZyb20gJy4vdXRpbHMvc2V0VGV4dHVyZUNvbG9yU3BhY2UnO1xuXG4vKipcbiAqIE1hdGVyaWFsUGFyYW1ldGVycyBoYXRlcyBgdW5kZWZpbmVkYC4gVGhpcyBoZWxwZXIgYXV0b21hdGljYWxseSByZWplY3RzIGFzc2lnbiBvZiB0aGVzZSBgdW5kZWZpbmVkYC5cbiAqIEl0IGFsc28gaGFuZGxlcyBhc3luY2hyb25vdXMgcHJvY2VzcyBvZiB0ZXh0dXJlcy5cbiAqIE1ha2Ugc3VyZSBhd2FpdCBmb3Ige0BsaW5rIEdMVEZNVG9vbk1hdGVyaWFsUGFyYW1zQXNzaWduSGVscGVyLnBlbmRpbmd9LlxuICovXG5leHBvcnQgY2xhc3MgR0xURk1Ub29uTWF0ZXJpYWxQYXJhbXNBc3NpZ25IZWxwZXIge1xuICBwcml2YXRlIHJlYWRvbmx5IF9wYXJzZXI6IEdMVEZQYXJzZXI7XG4gIHByaXZhdGUgX21hdGVyaWFsUGFyYW1zOiBNVG9vbk1hdGVyaWFsUGFyYW1ldGVycztcbiAgcHJpdmF0ZSBfcGVuZGluZ3M6IFByb21pc2U8YW55PltdO1xuXG4gIHB1YmxpYyBnZXQgcGVuZGluZygpOiBQcm9taXNlPHVua25vd24+IHtcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwodGhpcy5fcGVuZGluZ3MpO1xuICB9XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBhcnNlcjogR0xURlBhcnNlciwgbWF0ZXJpYWxQYXJhbXM6IE1Ub29uTWF0ZXJpYWxQYXJhbWV0ZXJzKSB7XG4gICAgdGhpcy5fcGFyc2VyID0gcGFyc2VyO1xuICAgIHRoaXMuX21hdGVyaWFsUGFyYW1zID0gbWF0ZXJpYWxQYXJhbXM7XG4gICAgdGhpcy5fcGVuZGluZ3MgPSBbXTtcbiAgfVxuXG4gIHB1YmxpYyBhc3NpZ25QcmltaXRpdmU8VCBleHRlbmRzIGtleW9mIE1Ub29uTWF0ZXJpYWxQYXJhbWV0ZXJzPihrZXk6IFQsIHZhbHVlOiBNVG9vbk1hdGVyaWFsUGFyYW1ldGVyc1tUXSk6IHZvaWQge1xuICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9tYXRlcmlhbFBhcmFtc1trZXldID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFzc2lnbkNvbG9yPFQgZXh0ZW5kcyBrZXlvZiBNVG9vbk1hdGVyaWFsUGFyYW1ldGVycz4oXG4gICAga2V5OiBULFxuICAgIHZhbHVlOiBudW1iZXJbXSB8IHVuZGVmaW5lZCxcbiAgICBjb252ZXJ0U1JHQlRvTGluZWFyPzogYm9vbGVhbixcbiAgKTogdm9pZCB7XG4gICAgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGNvbG9yID0gbmV3IFRIUkVFLkNvbG9yKCkuZnJvbUFycmF5KHZhbHVlKTtcblxuICAgICAgaWYgKGNvbnZlcnRTUkdCVG9MaW5lYXIpIHtcbiAgICAgICAgY29sb3IuY29udmVydFNSR0JUb0xpbmVhcigpO1xuICAgICAgfVxuICAgICAgKHRoaXMuX21hdGVyaWFsUGFyYW1zIGFzIGFueSlba2V5XSA9IGNvbG9yO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBhc3NpZ25UZXh0dXJlPFQgZXh0ZW5kcyBrZXlvZiBNVG9vbk1hdGVyaWFsUGFyYW1ldGVycz4oXG4gICAga2V5OiBULFxuICAgIHNjaGVtYVRleHR1cmU6IHsgaW5kZXg6IG51bWJlciB9IHwgdW5kZWZpbmVkLFxuICAgIGlzQ29sb3JUZXh0dXJlOiBib29sZWFuLFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBwcm9taXNlID0gKGFzeW5jICgpID0+IHtcbiAgICAgIGlmIChzY2hlbWFUZXh0dXJlICE9IG51bGwpIHtcbiAgICAgICAgY29uc3QgdGV4dHVyZSA9IGF3YWl0IHRoaXMuX3BhcnNlci5hc3NpZ25UZXh0dXJlKHRoaXMuX21hdGVyaWFsUGFyYW1zLCBrZXksIHNjaGVtYVRleHR1cmUpO1xuXG4gICAgICAgIC8vIGVhcmx5IGFib3J0IGlmIHRleHR1cmUgZmFpbGVkIHRvIGxvYWRcbiAgICAgICAgaWYgKHRleHR1cmUgPT0gbnVsbCkge1xuICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgICdHTFRGTVRvb25NYXRlcmlhbFBhcmFtc0Fzc2lnbkhlbHBlcjogRmFpbGVkIHRvIGxvYWQgdGV4dHVyZS4gVGhlIHJlbmRlcmluZyByZXN1bHQgbWF5IGJlIHdyb25nJyxcbiAgICAgICAgICApO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0NvbG9yVGV4dHVyZSkge1xuICAgICAgICAgIHNldFRleHR1cmVDb2xvclNwYWNlKHRleHR1cmUsICdzcmdiJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KSgpO1xuXG4gICAgdGhpcy5fcGVuZGluZ3MucHVzaChwcm9taXNlKTtcblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGFzc2lnblRleHR1cmVCeUluZGV4PFQgZXh0ZW5kcyBrZXlvZiBNVG9vbk1hdGVyaWFsUGFyYW1ldGVycz4oXG4gICAga2V5OiBULFxuICAgIHRleHR1cmVJbmRleDogbnVtYmVyIHwgdW5kZWZpbmVkLFxuICAgIGlzQ29sb3JUZXh0dXJlOiBib29sZWFuLFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5hc3NpZ25UZXh0dXJlKGtleSwgdGV4dHVyZUluZGV4ICE9IG51bGwgPyB7IGluZGV4OiB0ZXh0dXJlSW5kZXggfSA6IHVuZGVmaW5lZCwgaXNDb2xvclRleHR1cmUpO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG5jb25zdCBjb2xvclNwYWNlRW5jb2RpbmdNYXA6IFJlY29yZDwnJyB8ICdzcmdiJywgYW55PiA9IHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxuICAnJzogMzAwMCxcbiAgc3JnYjogMzAwMSxcbn07XG5cbi8qKlxuICogQSBjb21wYXQgZnVuY3Rpb24gdG8gc2V0IHRleHR1cmUgY29sb3Igc3BhY2UuXG4gKlxuICogQ09NUEFUOiBwcmUtcjE1MlxuICogU3RhcnRpbmcgZnJvbSBUaHJlZS5qcyByMTUyLCBgdGV4dHVyZS5lbmNvZGluZ2AgaXMgcmVuYW1lZCB0byBgdGV4dHVyZS5jb2xvclNwYWNlYC5cbiAqIFRoaXMgZnVuY3Rpb24gd2lsbCBoYW5kbGUgdGhlIGNvbWFwdC5cbiAqXG4gKiBAcGFyYW0gdGV4dHVyZSBUaGUgdGV4dHVyZSB5b3Ugd2FudCB0byBzZXQgdGhlIGNvbG9yIHNwYWNlIHRvXG4gKiBAcGFyYW0gY29sb3JTcGFjZSBUaGUgY29sb3Igc3BhY2UgeW91IHdhbnQgdG8gc2V0IHRvIHRoZSB0ZXh0dXJlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRUZXh0dXJlQ29sb3JTcGFjZSh0ZXh0dXJlOiBUSFJFRS5UZXh0dXJlLCBjb2xvclNwYWNlOiAnJyB8ICdzcmdiJyk6IHZvaWQge1xuICBpZiAocGFyc2VJbnQoVEhSRUUuUkVWSVNJT04sIDEwKSA+PSAxNTIpIHtcbiAgICB0ZXh0dXJlLmNvbG9yU3BhY2UgPSBjb2xvclNwYWNlO1xuICB9IGVsc2Uge1xuICAgICh0ZXh0dXJlIGFzIGFueSkuZW5jb2RpbmcgPSBjb2xvclNwYWNlRW5jb2RpbmdNYXBbY29sb3JTcGFjZV07XG4gIH1cbn1cbiIsICIvKiB0c2xpbnQ6ZGlzYWJsZTptZW1iZXItb3JkZXJpbmcgKi9cblxuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHZlcnRleFNoYWRlciBmcm9tICcuL3NoYWRlcnMvbXRvb24udmVydCc7XG5pbXBvcnQgZnJhZ21lbnRTaGFkZXIgZnJvbSAnLi9zaGFkZXJzL210b29uLmZyYWcnO1xuaW1wb3J0IHsgTVRvb25NYXRlcmlhbERlYnVnTW9kZSB9IGZyb20gJy4vTVRvb25NYXRlcmlhbERlYnVnTW9kZSc7XG5pbXBvcnQgeyBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZSB9IGZyb20gJy4vTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUnO1xuaW1wb3J0IHR5cGUgeyBNVG9vbk1hdGVyaWFsUGFyYW1ldGVycyB9IGZyb20gJy4vTVRvb25NYXRlcmlhbFBhcmFtZXRlcnMnO1xuaW1wb3J0IHsgZ2V0VGV4dHVyZUNvbG9yU3BhY2UgfSBmcm9tICcuL3V0aWxzL2dldFRleHR1cmVDb2xvclNwYWNlJztcblxuLyoqXG4gKiBNVG9vbiBpcyBhIG1hdGVyaWFsIHNwZWNpZmljYXRpb24gdGhhdCBoYXMgdmFyaW91cyBmZWF0dXJlcy5cbiAqIFRoZSBzcGVjIGFuZCBpbXBsZW1lbnRhdGlvbiBhcmUgb3JpZ2luYWxseSBmb3VuZGVkIGZvciBVbml0eSBlbmdpbmUgYW5kIHRoaXMgaXMgYSBwb3J0IG9mIHRoZSBtYXRlcmlhbC5cbiAqXG4gKiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9TYW50YXJoL01Ub29uXG4gKi9cbmV4cG9ydCBjbGFzcyBNVG9vbk1hdGVyaWFsIGV4dGVuZHMgVEhSRUUuU2hhZGVyTWF0ZXJpYWwge1xuICBwdWJsaWMgdW5pZm9ybXM6IHtcbiAgICBsaXRGYWN0b3I6IFRIUkVFLklVbmlmb3JtPFRIUkVFLkNvbG9yPjtcbiAgICBhbHBoYVRlc3Q6IFRIUkVFLklVbmlmb3JtPG51bWJlcj47XG4gICAgb3BhY2l0eTogVEhSRUUuSVVuaWZvcm08bnVtYmVyPjtcbiAgICBtYXA6IFRIUkVFLklVbmlmb3JtPFRIUkVFLlRleHR1cmUgfCBudWxsPjtcbiAgICBtYXBVdlRyYW5zZm9ybTogVEhSRUUuSVVuaWZvcm08VEhSRUUuTWF0cml4Mz47XG4gICAgbm9ybWFsTWFwOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5UZXh0dXJlIHwgbnVsbD47XG4gICAgbm9ybWFsTWFwVXZUcmFuc2Zvcm06IFRIUkVFLklVbmlmb3JtPFRIUkVFLk1hdHJpeDM+O1xuICAgIG5vcm1hbFNjYWxlOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5WZWN0b3IyPjtcbiAgICBlbWlzc2l2ZTogVEhSRUUuSVVuaWZvcm08VEhSRUUuQ29sb3I+O1xuICAgIGVtaXNzaXZlSW50ZW5zaXR5OiBUSFJFRS5JVW5pZm9ybTxudW1iZXI+O1xuICAgIGVtaXNzaXZlTWFwOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5UZXh0dXJlIHwgbnVsbD47XG4gICAgZW1pc3NpdmVNYXBVdlRyYW5zZm9ybTogVEhSRUUuSVVuaWZvcm08VEhSRUUuTWF0cml4Mz47XG4gICAgc2hhZGVDb2xvckZhY3RvcjogVEhSRUUuSVVuaWZvcm08VEhSRUUuQ29sb3I+O1xuICAgIHNoYWRlTXVsdGlwbHlUZXh0dXJlOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5UZXh0dXJlIHwgbnVsbD47XG4gICAgc2hhZGVNdWx0aXBseVRleHR1cmVVdlRyYW5zZm9ybTogVEhSRUUuSVVuaWZvcm08VEhSRUUuTWF0cml4Mz47XG4gICAgc2hhZGluZ1NoaWZ0RmFjdG9yOiBUSFJFRS5JVW5pZm9ybTxudW1iZXI+O1xuICAgIHNoYWRpbmdTaGlmdFRleHR1cmU6IFRIUkVFLklVbmlmb3JtPFRIUkVFLlRleHR1cmUgfCBudWxsPjtcbiAgICBzaGFkaW5nU2hpZnRUZXh0dXJlVXZUcmFuc2Zvcm06IFRIUkVFLklVbmlmb3JtPFRIUkVFLk1hdHJpeDM+O1xuICAgIHNoYWRpbmdTaGlmdFRleHR1cmVTY2FsZTogVEhSRUUuSVVuaWZvcm08bnVtYmVyPjtcbiAgICBzaGFkaW5nVG9vbnlGYWN0b3I6IFRIUkVFLklVbmlmb3JtPG51bWJlcj47XG4gICAgZ2lFcXVhbGl6YXRpb25GYWN0b3I6IFRIUkVFLklVbmlmb3JtPG51bWJlcj47XG4gICAgbWF0Y2FwRmFjdG9yOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5Db2xvcj47XG4gICAgbWF0Y2FwVGV4dHVyZTogVEhSRUUuSVVuaWZvcm08VEhSRUUuVGV4dHVyZSB8IG51bGw+O1xuICAgIG1hdGNhcFRleHR1cmVVdlRyYW5zZm9ybTogVEhSRUUuSVVuaWZvcm08VEhSRUUuTWF0cml4Mz47XG4gICAgcGFyYW1ldHJpY1JpbUNvbG9yRmFjdG9yOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5Db2xvcj47XG4gICAgcmltTXVsdGlwbHlUZXh0dXJlOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5UZXh0dXJlIHwgbnVsbD47XG4gICAgcmltTXVsdGlwbHlUZXh0dXJlVXZUcmFuc2Zvcm06IFRIUkVFLklVbmlmb3JtPFRIUkVFLk1hdHJpeDM+O1xuICAgIHJpbUxpZ2h0aW5nTWl4RmFjdG9yOiBUSFJFRS5JVW5pZm9ybTxudW1iZXI+O1xuICAgIHBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJGYWN0b3I6IFRIUkVFLklVbmlmb3JtPG51bWJlcj47XG4gICAgcGFyYW1ldHJpY1JpbUxpZnRGYWN0b3I6IFRIUkVFLklVbmlmb3JtPG51bWJlcj47XG4gICAgb3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5UZXh0dXJlIHwgbnVsbD47XG4gICAgb3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlVXZUcmFuc2Zvcm06IFRIUkVFLklVbmlmb3JtPFRIUkVFLk1hdHJpeDM+O1xuICAgIG91dGxpbmVXaWR0aEZhY3RvcjogVEhSRUUuSVVuaWZvcm08bnVtYmVyPjtcbiAgICBvdXRsaW5lQ29sb3JGYWN0b3I6IFRIUkVFLklVbmlmb3JtPFRIUkVFLkNvbG9yPjtcbiAgICBvdXRsaW5lTGlnaHRpbmdNaXhGYWN0b3I6IFRIUkVFLklVbmlmb3JtPG51bWJlcj47XG4gICAgdXZBbmltYXRpb25NYXNrVGV4dHVyZTogVEhSRUUuSVVuaWZvcm08VEhSRUUuVGV4dHVyZSB8IG51bGw+O1xuICAgIHV2QW5pbWF0aW9uTWFza1RleHR1cmVVdlRyYW5zZm9ybTogVEhSRUUuSVVuaWZvcm08VEhSRUUuTWF0cml4Mz47XG4gICAgdXZBbmltYXRpb25TY3JvbGxYT2Zmc2V0OiBUSFJFRS5JVW5pZm9ybTxudW1iZXI+O1xuICAgIHV2QW5pbWF0aW9uU2Nyb2xsWU9mZnNldDogVEhSRUUuSVVuaWZvcm08bnVtYmVyPjtcbiAgICB1dkFuaW1hdGlvblJvdGF0aW9uUGhhc2U6IFRIUkVFLklVbmlmb3JtPG51bWJlcj47XG4gIH07XG5cbiAgcHVibGljIGdldCBjb2xvcigpOiBUSFJFRS5Db2xvciB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMubGl0RmFjdG9yLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgY29sb3IodmFsdWU6IFRIUkVFLkNvbG9yKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5saXRGYWN0b3IudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgbWFwKCk6IFRIUkVFLlRleHR1cmUgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5tYXAudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCBtYXAodmFsdWU6IFRIUkVFLlRleHR1cmUgfCBudWxsKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5tYXAudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgbm9ybWFsTWFwKCk6IFRIUkVFLlRleHR1cmUgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5ub3JtYWxNYXAudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCBub3JtYWxNYXAodmFsdWU6IFRIUkVFLlRleHR1cmUgfCBudWxsKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5ub3JtYWxNYXAudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgbm9ybWFsU2NhbGUoKTogVEhSRUUuVmVjdG9yMiB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMubm9ybWFsU2NhbGUudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCBub3JtYWxTY2FsZSh2YWx1ZTogVEhSRUUuVmVjdG9yMikge1xuICAgIHRoaXMudW5pZm9ybXMubm9ybWFsU2NhbGUudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgZW1pc3NpdmUoKTogVEhSRUUuQ29sb3Ige1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLmVtaXNzaXZlLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgZW1pc3NpdmUodmFsdWU6IFRIUkVFLkNvbG9yKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5lbWlzc2l2ZS52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBlbWlzc2l2ZUludGVuc2l0eSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLmVtaXNzaXZlSW50ZW5zaXR5LnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgZW1pc3NpdmVJbnRlbnNpdHkodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMudW5pZm9ybXMuZW1pc3NpdmVJbnRlbnNpdHkudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgZW1pc3NpdmVNYXAoKTogVEhSRUUuVGV4dHVyZSB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLmVtaXNzaXZlTWFwLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgZW1pc3NpdmVNYXAodmFsdWU6IFRIUkVFLlRleHR1cmUgfCBudWxsKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5lbWlzc2l2ZU1hcC52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBzaGFkZUNvbG9yRmFjdG9yKCk6IFRIUkVFLkNvbG9yIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5zaGFkZUNvbG9yRmFjdG9yLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgc2hhZGVDb2xvckZhY3Rvcih2YWx1ZTogVEhSRUUuQ29sb3IpIHtcbiAgICB0aGlzLnVuaWZvcm1zLnNoYWRlQ29sb3JGYWN0b3IudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc2hhZGVNdWx0aXBseVRleHR1cmUoKTogVEhSRUUuVGV4dHVyZSB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLnNoYWRlTXVsdGlwbHlUZXh0dXJlLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgc2hhZGVNdWx0aXBseVRleHR1cmUodmFsdWU6IFRIUkVFLlRleHR1cmUgfCBudWxsKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5zaGFkZU11bHRpcGx5VGV4dHVyZS52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBzaGFkaW5nU2hpZnRGYWN0b3IoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5zaGFkaW5nU2hpZnRGYWN0b3IudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCBzaGFkaW5nU2hpZnRGYWN0b3IodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMudW5pZm9ybXMuc2hhZGluZ1NoaWZ0RmFjdG9yLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHNoYWRpbmdTaGlmdFRleHR1cmUoKTogVEhSRUUuVGV4dHVyZSB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLnNoYWRpbmdTaGlmdFRleHR1cmUudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCBzaGFkaW5nU2hpZnRUZXh0dXJlKHZhbHVlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCkge1xuICAgIHRoaXMudW5pZm9ybXMuc2hhZGluZ1NoaWZ0VGV4dHVyZS52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBzaGFkaW5nU2hpZnRUZXh0dXJlU2NhbGUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5zaGFkaW5nU2hpZnRUZXh0dXJlU2NhbGUudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCBzaGFkaW5nU2hpZnRUZXh0dXJlU2NhbGUodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMudW5pZm9ybXMuc2hhZGluZ1NoaWZ0VGV4dHVyZVNjYWxlLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHNoYWRpbmdUb29ueUZhY3RvcigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLnNoYWRpbmdUb29ueUZhY3Rvci52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IHNoYWRpbmdUb29ueUZhY3Rvcih2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5zaGFkaW5nVG9vbnlGYWN0b3IudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgZ2lFcXVhbGl6YXRpb25GYWN0b3IoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5naUVxdWFsaXphdGlvbkZhY3Rvci52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IGdpRXF1YWxpemF0aW9uRmFjdG9yKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLnVuaWZvcm1zLmdpRXF1YWxpemF0aW9uRmFjdG9yLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG1hdGNhcEZhY3RvcigpOiBUSFJFRS5Db2xvciB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMubWF0Y2FwRmFjdG9yLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgbWF0Y2FwRmFjdG9yKHZhbHVlOiBUSFJFRS5Db2xvcikge1xuICAgIHRoaXMudW5pZm9ybXMubWF0Y2FwRmFjdG9yLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG1hdGNhcFRleHR1cmUoKTogVEhSRUUuVGV4dHVyZSB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLm1hdGNhcFRleHR1cmUudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCBtYXRjYXBUZXh0dXJlKHZhbHVlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCkge1xuICAgIHRoaXMudW5pZm9ybXMubWF0Y2FwVGV4dHVyZS52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBwYXJhbWV0cmljUmltQ29sb3JGYWN0b3IoKTogVEhSRUUuQ29sb3Ige1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLnBhcmFtZXRyaWNSaW1Db2xvckZhY3Rvci52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IHBhcmFtZXRyaWNSaW1Db2xvckZhY3Rvcih2YWx1ZTogVEhSRUUuQ29sb3IpIHtcbiAgICB0aGlzLnVuaWZvcm1zLnBhcmFtZXRyaWNSaW1Db2xvckZhY3Rvci52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCByaW1NdWx0aXBseVRleHR1cmUoKTogVEhSRUUuVGV4dHVyZSB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLnJpbU11bHRpcGx5VGV4dHVyZS52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IHJpbU11bHRpcGx5VGV4dHVyZSh2YWx1ZTogVEhSRUUuVGV4dHVyZSB8IG51bGwpIHtcbiAgICB0aGlzLnVuaWZvcm1zLnJpbU11bHRpcGx5VGV4dHVyZS52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCByaW1MaWdodGluZ01peEZhY3RvcigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLnJpbUxpZ2h0aW5nTWl4RmFjdG9yLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgcmltTGlnaHRpbmdNaXhGYWN0b3IodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMudW5pZm9ybXMucmltTGlnaHRpbmdNaXhGYWN0b3IudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlckZhY3RvcigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLnBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJGYWN0b3IudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCBwYXJhbWV0cmljUmltRnJlc25lbFBvd2VyRmFjdG9yKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLnVuaWZvcm1zLnBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJGYWN0b3IudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcGFyYW1ldHJpY1JpbUxpZnRGYWN0b3IoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5wYXJhbWV0cmljUmltTGlmdEZhY3Rvci52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IHBhcmFtZXRyaWNSaW1MaWZ0RmFjdG9yKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLnVuaWZvcm1zLnBhcmFtZXRyaWNSaW1MaWZ0RmFjdG9yLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZSgpOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMub3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgb3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlKHZhbHVlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCkge1xuICAgIHRoaXMudW5pZm9ybXMub3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG91dGxpbmVXaWR0aEZhY3RvcigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLm91dGxpbmVXaWR0aEZhY3Rvci52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IG91dGxpbmVXaWR0aEZhY3Rvcih2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5vdXRsaW5lV2lkdGhGYWN0b3IudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgb3V0bGluZUNvbG9yRmFjdG9yKCk6IFRIUkVFLkNvbG9yIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5vdXRsaW5lQ29sb3JGYWN0b3IudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCBvdXRsaW5lQ29sb3JGYWN0b3IodmFsdWU6IFRIUkVFLkNvbG9yKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5vdXRsaW5lQ29sb3JGYWN0b3IudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgb3V0bGluZUxpZ2h0aW5nTWl4RmFjdG9yKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMub3V0bGluZUxpZ2h0aW5nTWl4RmFjdG9yLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgb3V0bGluZUxpZ2h0aW5nTWl4RmFjdG9yKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLnVuaWZvcm1zLm91dGxpbmVMaWdodGluZ01peEZhY3Rvci52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCB1dkFuaW1hdGlvbk1hc2tUZXh0dXJlKCk6IFRIUkVFLlRleHR1cmUgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy51dkFuaW1hdGlvbk1hc2tUZXh0dXJlLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgdXZBbmltYXRpb25NYXNrVGV4dHVyZSh2YWx1ZTogVEhSRUUuVGV4dHVyZSB8IG51bGwpIHtcbiAgICB0aGlzLnVuaWZvcm1zLnV2QW5pbWF0aW9uTWFza1RleHR1cmUudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdXZBbmltYXRpb25TY3JvbGxYT2Zmc2V0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMudXZBbmltYXRpb25TY3JvbGxYT2Zmc2V0LnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgdXZBbmltYXRpb25TY3JvbGxYT2Zmc2V0KHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLnVuaWZvcm1zLnV2QW5pbWF0aW9uU2Nyb2xsWE9mZnNldC52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCB1dkFuaW1hdGlvblNjcm9sbFlPZmZzZXQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy51dkFuaW1hdGlvblNjcm9sbFlPZmZzZXQudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCB1dkFuaW1hdGlvblNjcm9sbFlPZmZzZXQodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMudW5pZm9ybXMudXZBbmltYXRpb25TY3JvbGxZT2Zmc2V0LnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHV2QW5pbWF0aW9uUm90YXRpb25QaGFzZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLnV2QW5pbWF0aW9uUm90YXRpb25QaGFzZS52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IHV2QW5pbWF0aW9uUm90YXRpb25QaGFzZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy51bmlmb3Jtcy51dkFuaW1hdGlvblJvdGF0aW9uUGhhc2UudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyB1dkFuaW1hdGlvblNjcm9sbFhTcGVlZEZhY3RvciA9IDAuMDtcbiAgcHVibGljIHV2QW5pbWF0aW9uU2Nyb2xsWVNwZWVkRmFjdG9yID0gMC4wO1xuICBwdWJsaWMgdXZBbmltYXRpb25Sb3RhdGlvblNwZWVkRmFjdG9yID0gMC4wO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBtYXRlcmlhbCBpcyBhZmZlY3RlZCBieSBmb2cuXG4gICAqIGB0cnVlYCBieSBkZWZhdWx0LlxuICAgKi9cbiAgcHVibGljIGZvZyA9IHRydWU7XG5cbiAgLyoqXG4gICAqIFdpbGwgYmUgcmVhZCBpbiBXZWJHTFByb2dyYW1zXG4gICAqXG4gICAqIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9ibG9iLzRmNTIzNmFjM2Q2ZjQxZDkwNGFhNTg0MDFiNDA1NTRlOGZiZGNiMTUvc3JjL3JlbmRlcmVycy93ZWJnbC9XZWJHTFByb2dyYW1zLmpzI0wxOTAtTDE5MVxuICAgKi9cbiAgcHVibGljIG5vcm1hbE1hcFR5cGUgPSBUSFJFRS5UYW5nZW50U3BhY2VOb3JtYWxNYXA7XG5cbiAgLyoqXG4gICAqIFdoZW4gdGhpcyBpcyBgdHJ1ZWAsIHZlcnRleCBjb2xvcnMgd2lsbCBiZSBpZ25vcmVkLlxuICAgKiBgdHJ1ZWAgYnkgZGVmYXVsdC5cbiAgICovXG4gIHByaXZhdGUgX2lnbm9yZVZlcnRleENvbG9yID0gdHJ1ZTtcblxuICAvKipcbiAgICogV2hlbiB0aGlzIGlzIGB0cnVlYCwgdmVydGV4IGNvbG9ycyB3aWxsIGJlIGlnbm9yZWQuXG4gICAqIGB0cnVlYCBieSBkZWZhdWx0LlxuICAgKi9cbiAgcHVibGljIGdldCBpZ25vcmVWZXJ0ZXhDb2xvcigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faWdub3JlVmVydGV4Q29sb3I7XG4gIH1cbiAgcHVibGljIHNldCBpZ25vcmVWZXJ0ZXhDb2xvcih2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2lnbm9yZVZlcnRleENvbG9yID0gdmFsdWU7XG5cbiAgICB0aGlzLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX3YwQ29tcGF0U2hhZGUgPSBmYWxzZTtcblxuICAvKipcbiAgICogVGhlcmUgaXMgYSBsaW5lIG9mIHRoZSBzaGFkZXIgY2FsbGVkIFwiY29tbWVudCBvdXQgaWYgeW91IHdhbnQgdG8gUEJSIGFic29sdXRlbHlcIiBpbiBWUk0wLjAgTVRvb24uXG4gICAqIFdoZW4gdGhpcyBpcyB0cnVlLCB0aGUgbWF0ZXJpYWwgZW5hYmxlcyB0aGUgbGluZSB0byBtYWtlIGl0IGNvbXBhdGlibGUgd2l0aCB0aGUgbGVnYWN5IHJlbmRlcmluZyBvZiBWUk0uXG4gICAqIFVzdWFsbHkgbm90IHJlY29tbWVuZGVkIHRvIHR1cm4gdGhpcyBvbi5cbiAgICogYGZhbHNlYCBieSBkZWZhdWx0LlxuICAgKi9cbiAgZ2V0IHYwQ29tcGF0U2hhZGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3YwQ29tcGF0U2hhZGU7XG4gIH1cblxuICAvKipcbiAgICogVGhlcmUgaXMgYSBsaW5lIG9mIHRoZSBzaGFkZXIgY2FsbGVkIFwiY29tbWVudCBvdXQgaWYgeW91IHdhbnQgdG8gUEJSIGFic29sdXRlbHlcIiBpbiBWUk0wLjAgTVRvb24uXG4gICAqIFdoZW4gdGhpcyBpcyB0cnVlLCB0aGUgbWF0ZXJpYWwgZW5hYmxlcyB0aGUgbGluZSB0byBtYWtlIGl0IGNvbXBhdGlibGUgd2l0aCB0aGUgbGVnYWN5IHJlbmRlcmluZyBvZiBWUk0uXG4gICAqIFVzdWFsbHkgbm90IHJlY29tbWVuZGVkIHRvIHR1cm4gdGhpcyBvbi5cbiAgICogYGZhbHNlYCBieSBkZWZhdWx0LlxuICAgKi9cbiAgc2V0IHYwQ29tcGF0U2hhZGUodjogYm9vbGVhbikge1xuICAgIHRoaXMuX3YwQ29tcGF0U2hhZGUgPSB2O1xuXG4gICAgdGhpcy5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIF9kZWJ1Z01vZGU6IE1Ub29uTWF0ZXJpYWxEZWJ1Z01vZGUgPSBNVG9vbk1hdGVyaWFsRGVidWdNb2RlLk5vbmU7XG5cbiAgLyoqXG4gICAqIERlYnVnIG1vZGUgZm9yIHRoZSBtYXRlcmlhbC5cbiAgICogWW91IGNhbiB2aXN1YWxpemUgc2V2ZXJhbCBjb21wb25lbnRzIGZvciBkaWFnbm9zaXMgdXNpbmcgZGVidWcgbW9kZS5cbiAgICpcbiAgICogU2VlOiB7QGxpbmsgTVRvb25NYXRlcmlhbERlYnVnTW9kZX1cbiAgICovXG4gIGdldCBkZWJ1Z01vZGUoKTogTVRvb25NYXRlcmlhbERlYnVnTW9kZSB7XG4gICAgcmV0dXJuIHRoaXMuX2RlYnVnTW9kZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWJ1ZyBtb2RlIGZvciB0aGUgbWF0ZXJpYWwuXG4gICAqIFlvdSBjYW4gdmlzdWFsaXplIHNldmVyYWwgY29tcG9uZW50cyBmb3IgZGlhZ25vc2lzIHVzaW5nIGRlYnVnIG1vZGUuXG4gICAqXG4gICAqIFNlZToge0BsaW5rIE1Ub29uTWF0ZXJpYWxEZWJ1Z01vZGV9XG4gICAqL1xuICBzZXQgZGVidWdNb2RlKG06IE1Ub29uTWF0ZXJpYWxEZWJ1Z01vZGUpIHtcbiAgICB0aGlzLl9kZWJ1Z01vZGUgPSBtO1xuXG4gICAgdGhpcy5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIF9vdXRsaW5lV2lkdGhNb2RlOiBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZSA9IE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlLk5vbmU7XG5cbiAgZ2V0IG91dGxpbmVXaWR0aE1vZGUoKTogTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUge1xuICAgIHJldHVybiB0aGlzLl9vdXRsaW5lV2lkdGhNb2RlO1xuICB9XG4gIHNldCBvdXRsaW5lV2lkdGhNb2RlKG06IE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlKSB7XG4gICAgdGhpcy5fb3V0bGluZVdpZHRoTW9kZSA9IG07XG5cbiAgICB0aGlzLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX2lzT3V0bGluZSA9IGZhbHNlO1xuXG4gIGdldCBpc091dGxpbmUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2lzT3V0bGluZTtcbiAgfVxuICBzZXQgaXNPdXRsaW5lKGI6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9pc091dGxpbmUgPSBiO1xuXG4gICAgdGhpcy5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogUmVhZG9ubHkgYm9vbGVhbiB0aGF0IGluZGljYXRlcyB0aGlzIGlzIGEge0BsaW5rIE1Ub29uTWF0ZXJpYWx9LlxuICAgKi9cbiAgcHVibGljIGdldCBpc01Ub29uTWF0ZXJpYWwoKTogdHJ1ZSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwYXJhbWV0ZXJzOiBNVG9vbk1hdGVyaWFsUGFyYW1ldGVycyA9IHt9KSB7XG4gICAgc3VwZXIoeyB2ZXJ0ZXhTaGFkZXIsIGZyYWdtZW50U2hhZGVyIH0pO1xuXG4gICAgLy8gb3ZlcnJpZGUgZGVwdGhXcml0ZSB3aXRoIHRyYW5zcGFyZW50V2l0aFpXcml0ZVxuICAgIGlmIChwYXJhbWV0ZXJzLnRyYW5zcGFyZW50V2l0aFpXcml0ZSkge1xuICAgICAgcGFyYW1ldGVycy5kZXB0aFdyaXRlID0gdHJ1ZTtcbiAgICB9XG4gICAgZGVsZXRlIHBhcmFtZXRlcnMudHJhbnNwYXJlbnRXaXRoWldyaXRlO1xuXG4gICAgLy8gPT0gZW5hYmxpbmcgYnVuY2ggb2Ygc3R1ZmYgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgcGFyYW1ldGVycy5mb2cgPSB0cnVlO1xuICAgIHBhcmFtZXRlcnMubGlnaHRzID0gdHJ1ZTtcbiAgICBwYXJhbWV0ZXJzLmNsaXBwaW5nID0gdHJ1ZTtcblxuICAgIC8vID09IHVuaWZvcm1zID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHRoaXMudW5pZm9ybXMgPSBUSFJFRS5Vbmlmb3Jtc1V0aWxzLm1lcmdlKFtcbiAgICAgIFRIUkVFLlVuaWZvcm1zTGliLmNvbW1vbiwgLy8gbWFwXG4gICAgICBUSFJFRS5Vbmlmb3Jtc0xpYi5ub3JtYWxtYXAsIC8vIG5vcm1hbE1hcFxuICAgICAgVEhSRUUuVW5pZm9ybXNMaWIuZW1pc3NpdmVtYXAsIC8vIGVtaXNzaXZlTWFwXG4gICAgICBUSFJFRS5Vbmlmb3Jtc0xpYi5mb2csXG4gICAgICBUSFJFRS5Vbmlmb3Jtc0xpYi5saWdodHMsXG4gICAgICB7XG4gICAgICAgIGxpdEZhY3RvcjogeyB2YWx1ZTogbmV3IFRIUkVFLkNvbG9yKDEuMCwgMS4wLCAxLjApIH0sXG4gICAgICAgIG1hcFV2VHJhbnNmb3JtOiB7IHZhbHVlOiBuZXcgVEhSRUUuTWF0cml4MygpIH0sXG4gICAgICAgIGNvbG9yQWxwaGE6IHsgdmFsdWU6IDEuMCB9LFxuICAgICAgICBub3JtYWxNYXBVdlRyYW5zZm9ybTogeyB2YWx1ZTogbmV3IFRIUkVFLk1hdHJpeDMoKSB9LFxuICAgICAgICBzaGFkZUNvbG9yRmFjdG9yOiB7IHZhbHVlOiBuZXcgVEhSRUUuQ29sb3IoMC4wLCAwLjAsIDAuMCkgfSxcbiAgICAgICAgc2hhZGVNdWx0aXBseVRleHR1cmU6IHsgdmFsdWU6IG51bGwgfSxcbiAgICAgICAgc2hhZGVNdWx0aXBseVRleHR1cmVVdlRyYW5zZm9ybTogeyB2YWx1ZTogbmV3IFRIUkVFLk1hdHJpeDMoKSB9LFxuICAgICAgICBzaGFkaW5nU2hpZnRGYWN0b3I6IHsgdmFsdWU6IDAuMCB9LFxuICAgICAgICBzaGFkaW5nU2hpZnRUZXh0dXJlOiB7IHZhbHVlOiBudWxsIH0sXG4gICAgICAgIHNoYWRpbmdTaGlmdFRleHR1cmVVdlRyYW5zZm9ybTogeyB2YWx1ZTogbmV3IFRIUkVFLk1hdHJpeDMoKSB9LFxuICAgICAgICBzaGFkaW5nU2hpZnRUZXh0dXJlU2NhbGU6IHsgdmFsdWU6IDEuMCB9LFxuICAgICAgICBzaGFkaW5nVG9vbnlGYWN0b3I6IHsgdmFsdWU6IDAuOSB9LFxuICAgICAgICBnaUVxdWFsaXphdGlvbkZhY3RvcjogeyB2YWx1ZTogMC45IH0sXG4gICAgICAgIG1hdGNhcEZhY3RvcjogeyB2YWx1ZTogbmV3IFRIUkVFLkNvbG9yKDEuMCwgMS4wLCAxLjApIH0sXG4gICAgICAgIG1hdGNhcFRleHR1cmU6IHsgdmFsdWU6IG51bGwgfSxcbiAgICAgICAgbWF0Y2FwVGV4dHVyZVV2VHJhbnNmb3JtOiB7IHZhbHVlOiBuZXcgVEhSRUUuTWF0cml4MygpIH0sXG4gICAgICAgIHBhcmFtZXRyaWNSaW1Db2xvckZhY3RvcjogeyB2YWx1ZTogbmV3IFRIUkVFLkNvbG9yKDAuMCwgMC4wLCAwLjApIH0sXG4gICAgICAgIHJpbU11bHRpcGx5VGV4dHVyZTogeyB2YWx1ZTogbnVsbCB9LFxuICAgICAgICByaW1NdWx0aXBseVRleHR1cmVVdlRyYW5zZm9ybTogeyB2YWx1ZTogbmV3IFRIUkVFLk1hdHJpeDMoKSB9LFxuICAgICAgICByaW1MaWdodGluZ01peEZhY3RvcjogeyB2YWx1ZTogMS4wIH0sXG4gICAgICAgIHBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJGYWN0b3I6IHsgdmFsdWU6IDUuMCB9LFxuICAgICAgICBwYXJhbWV0cmljUmltTGlmdEZhY3RvcjogeyB2YWx1ZTogMC4wIH0sXG4gICAgICAgIGVtaXNzaXZlOiB7IHZhbHVlOiBuZXcgVEhSRUUuQ29sb3IoMC4wLCAwLjAsIDAuMCkgfSxcbiAgICAgICAgZW1pc3NpdmVJbnRlbnNpdHk6IHsgdmFsdWU6IDEuMCB9LFxuICAgICAgICBlbWlzc2l2ZU1hcFV2VHJhbnNmb3JtOiB7IHZhbHVlOiBuZXcgVEhSRUUuTWF0cml4MygpIH0sXG4gICAgICAgIG91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZTogeyB2YWx1ZTogbnVsbCB9LFxuICAgICAgICBvdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmVVdlRyYW5zZm9ybTogeyB2YWx1ZTogbmV3IFRIUkVFLk1hdHJpeDMoKSB9LFxuICAgICAgICBvdXRsaW5lV2lkdGhGYWN0b3I6IHsgdmFsdWU6IDAuMCB9LFxuICAgICAgICBvdXRsaW5lQ29sb3JGYWN0b3I6IHsgdmFsdWU6IG5ldyBUSFJFRS5Db2xvcigwLjAsIDAuMCwgMC4wKSB9LFxuICAgICAgICBvdXRsaW5lTGlnaHRpbmdNaXhGYWN0b3I6IHsgdmFsdWU6IDEuMCB9LFxuICAgICAgICB1dkFuaW1hdGlvbk1hc2tUZXh0dXJlOiB7IHZhbHVlOiBudWxsIH0sXG4gICAgICAgIHV2QW5pbWF0aW9uTWFza1RleHR1cmVVdlRyYW5zZm9ybTogeyB2YWx1ZTogbmV3IFRIUkVFLk1hdHJpeDMoKSB9LFxuICAgICAgICB1dkFuaW1hdGlvblNjcm9sbFhPZmZzZXQ6IHsgdmFsdWU6IDAuMCB9LFxuICAgICAgICB1dkFuaW1hdGlvblNjcm9sbFlPZmZzZXQ6IHsgdmFsdWU6IDAuMCB9LFxuICAgICAgICB1dkFuaW1hdGlvblJvdGF0aW9uUGhhc2U6IHsgdmFsdWU6IDAuMCB9LFxuICAgICAgfSxcbiAgICAgIHBhcmFtZXRlcnMudW5pZm9ybXMgPz8ge30sXG4gICAgXSkgYXMgdHlwZW9mIE1Ub29uTWF0ZXJpYWwucHJvdG90eXBlLnVuaWZvcm1zO1xuXG4gICAgLy8gPT0gZmluYWxseSBjb21waWxlIHRoZSBzaGFkZXIgcHJvZ3JhbSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgdGhpcy5zZXRWYWx1ZXMocGFyYW1ldGVycyk7XG5cbiAgICAvLyA9PSB1cGxvYWQgdW5pZm9ybXMgdGhhdCBuZWVkIHRvIHVwbG9hZCA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICB0aGlzLl91cGxvYWRVbmlmb3Jtc1dvcmthcm91bmQoKTtcblxuICAgIC8vID09IHVwZGF0ZSBzaGFkZXIgc3R1ZmYgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHRoaXMuY3VzdG9tUHJvZ3JhbUNhY2hlS2V5ID0gKCkgPT5cbiAgICAgIFtcbiAgICAgICAgLi4uT2JqZWN0LmVudHJpZXModGhpcy5fZ2VuZXJhdGVEZWZpbmVzKCkpLm1hcCgoW3Rva2VuLCBtYWNyb10pID0+IGAke3Rva2VufToke21hY3JvfWApLFxuICAgICAgICB0aGlzLm1hdGNhcFRleHR1cmUgPyBgbWF0Y2FwVGV4dHVyZUNvbG9yU3BhY2U6JHtnZXRUZXh0dXJlQ29sb3JTcGFjZSh0aGlzLm1hdGNhcFRleHR1cmUpfWAgOiAnJyxcbiAgICAgICAgdGhpcy5zaGFkZU11bHRpcGx5VGV4dHVyZVxuICAgICAgICAgID8gYHNoYWRlTXVsdGlwbHlUZXh0dXJlQ29sb3JTcGFjZToke2dldFRleHR1cmVDb2xvclNwYWNlKHRoaXMuc2hhZGVNdWx0aXBseVRleHR1cmUpfWBcbiAgICAgICAgICA6ICcnLFxuICAgICAgICB0aGlzLnJpbU11bHRpcGx5VGV4dHVyZSA/IGByaW1NdWx0aXBseVRleHR1cmVDb2xvclNwYWNlOiR7Z2V0VGV4dHVyZUNvbG9yU3BhY2UodGhpcy5yaW1NdWx0aXBseVRleHR1cmUpfWAgOiAnJyxcbiAgICAgIF0uam9pbignLCcpO1xuXG4gICAgdGhpcy5vbkJlZm9yZUNvbXBpbGUgPSAoc2hhZGVyKSA9PiB7XG4gICAgICBjb25zdCB0aHJlZVJldmlzaW9uID0gcGFyc2VJbnQoVEhSRUUuUkVWSVNJT04sIDEwKTtcblxuICAgICAgY29uc3QgZGVmaW5lcyA9XG4gICAgICAgIE9iamVjdC5lbnRyaWVzKHsgLi4udGhpcy5fZ2VuZXJhdGVEZWZpbmVzKCksIC4uLnRoaXMuZGVmaW5lcyB9KVxuICAgICAgICAgIC5maWx0ZXIoKFt0b2tlbiwgbWFjcm9dKSA9PiAhIW1hY3JvKVxuICAgICAgICAgIC5tYXAoKFt0b2tlbiwgbWFjcm9dKSA9PiBgI2RlZmluZSAke3Rva2VufSAke21hY3JvfWApXG4gICAgICAgICAgLmpvaW4oJ1xcbicpICsgJ1xcbic7XG5cbiAgICAgIC8vIC0tIGdlbmVyYXRlIHNoYWRlciBjb2RlIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgIHNoYWRlci52ZXJ0ZXhTaGFkZXIgPSBkZWZpbmVzICsgc2hhZGVyLnZlcnRleFNoYWRlcjtcbiAgICAgIHNoYWRlci5mcmFnbWVudFNoYWRlciA9IGRlZmluZXMgKyBzaGFkZXIuZnJhZ21lbnRTaGFkZXI7XG5cbiAgICAgIC8vIC0tIGNvbXBhdCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgLy8gQ09NUEFUOiBwcmUtcjE1NFxuICAgICAgLy8gVGhyZWUuanMgcjE1NCByZW5hbWVzIHRoZSBzaGFkZXIgY2h1bmsgPGNvbG9yc3BhY2VfZnJhZ21lbnQ+IHRvIDxlbmNvZGluZ3NfZnJhZ21lbnQ+XG4gICAgICBpZiAodGhyZWVSZXZpc2lvbiA8IDE1NCkge1xuICAgICAgICBzaGFkZXIuZnJhZ21lbnRTaGFkZXIgPSBzaGFkZXIuZnJhZ21lbnRTaGFkZXIucmVwbGFjZShcbiAgICAgICAgICAnI2luY2x1ZGUgPGNvbG9yc3BhY2VfZnJhZ21lbnQ+JyxcbiAgICAgICAgICAnI2luY2x1ZGUgPGVuY29kaW5nc19mcmFnbWVudD4nLFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoaXMgbWF0ZXJpYWwuXG4gICAqXG4gICAqIEBwYXJhbSBkZWx0YSBkZWx0YVRpbWUgc2luY2UgbGFzdCB1cGRhdGVcbiAgICovXG4gIHB1YmxpYyB1cGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX3VwbG9hZFVuaWZvcm1zV29ya2Fyb3VuZCgpO1xuICAgIHRoaXMuX3VwZGF0ZVVWQW5pbWF0aW9uKGRlbHRhKTtcbiAgfVxuXG4gIHB1YmxpYyBjb3B5KHNvdXJjZTogdGhpcyk6IHRoaXMge1xuICAgIHN1cGVyLmNvcHkoc291cmNlKTtcbiAgICAvLyB1bmlmb3JtcyBhcmUgYWxyZWFkeSBjb3BpZWQgYXQgdGhpcyBtb21lbnRcblxuICAgIC8vIEJlZ2lubmluZyBmcm9tIHIxMzMsIHVuaWZvcm0gdGV4dHVyZXMgd2lsbCBiZSBjbG9uZWQgaW5zdGVhZCBvZiByZWZlcmVuY2VcbiAgICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvYmxvYi9hODgxM2JlMDRhODQ5YmQxNTVmN2NmNmYxYjIzZDhlZTJlMGZiNDhiL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXIuanMjTDMwNDdcbiAgICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvYmxvYi9hODgxM2JlMDRhODQ5YmQxNTVmN2NmNmYxYjIzZDhlZTJlMGZiNDhiL3NyYy9yZW5kZXJlcnMvc2hhZGVycy9Vbmlmb3Jtc1V0aWxzLmpzI0wyMlxuICAgIC8vIFRoaXMgd2lsbCBsZWF2ZSB0aGVpciBgLnZlcnNpb25gIHRvIGJlIGAwYFxuICAgIC8vIGFuZCB0aGVzZSB0ZXh0dXJlcyB3b24ndCBiZSB1cGxvYWRlZCB0byBHUFVcbiAgICAvLyBXZSBhcmUgZ29pbmcgdG8gd29ya2Fyb3VuZCB0aGlzIGluIGhlcmVcbiAgICAvLyBJJ3ZlIG9wZW5lZCBhbiBpc3N1ZSBmb3IgdGhpczogaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9pc3N1ZXMvMjI3MThcbiAgICB0aGlzLm1hcCA9IHNvdXJjZS5tYXA7XG4gICAgdGhpcy5ub3JtYWxNYXAgPSBzb3VyY2Uubm9ybWFsTWFwO1xuICAgIHRoaXMuZW1pc3NpdmVNYXAgPSBzb3VyY2UuZW1pc3NpdmVNYXA7XG4gICAgdGhpcy5zaGFkZU11bHRpcGx5VGV4dHVyZSA9IHNvdXJjZS5zaGFkZU11bHRpcGx5VGV4dHVyZTtcbiAgICB0aGlzLnNoYWRpbmdTaGlmdFRleHR1cmUgPSBzb3VyY2Uuc2hhZGluZ1NoaWZ0VGV4dHVyZTtcbiAgICB0aGlzLm1hdGNhcFRleHR1cmUgPSBzb3VyY2UubWF0Y2FwVGV4dHVyZTtcbiAgICB0aGlzLnJpbU11bHRpcGx5VGV4dHVyZSA9IHNvdXJjZS5yaW1NdWx0aXBseVRleHR1cmU7XG4gICAgdGhpcy5vdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmUgPSBzb3VyY2Uub3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlO1xuICAgIHRoaXMudXZBbmltYXRpb25NYXNrVGV4dHVyZSA9IHNvdXJjZS51dkFuaW1hdGlvbk1hc2tUZXh0dXJlO1xuXG4gICAgLy8gPT0gY29weSBtZW1iZXJzID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgdGhpcy5ub3JtYWxNYXBUeXBlID0gc291cmNlLm5vcm1hbE1hcFR5cGU7XG5cbiAgICB0aGlzLnV2QW5pbWF0aW9uU2Nyb2xsWFNwZWVkRmFjdG9yID0gc291cmNlLnV2QW5pbWF0aW9uU2Nyb2xsWFNwZWVkRmFjdG9yO1xuICAgIHRoaXMudXZBbmltYXRpb25TY3JvbGxZU3BlZWRGYWN0b3IgPSBzb3VyY2UudXZBbmltYXRpb25TY3JvbGxZU3BlZWRGYWN0b3I7XG4gICAgdGhpcy51dkFuaW1hdGlvblJvdGF0aW9uU3BlZWRGYWN0b3IgPSBzb3VyY2UudXZBbmltYXRpb25Sb3RhdGlvblNwZWVkRmFjdG9yO1xuXG4gICAgdGhpcy5pZ25vcmVWZXJ0ZXhDb2xvciA9IHNvdXJjZS5pZ25vcmVWZXJ0ZXhDb2xvcjtcblxuICAgIHRoaXMudjBDb21wYXRTaGFkZSA9IHNvdXJjZS52MENvbXBhdFNoYWRlO1xuICAgIHRoaXMuZGVidWdNb2RlID0gc291cmNlLmRlYnVnTW9kZTtcbiAgICB0aGlzLm91dGxpbmVXaWR0aE1vZGUgPSBzb3VyY2Uub3V0bGluZVdpZHRoTW9kZTtcblxuICAgIHRoaXMuaXNPdXRsaW5lID0gc291cmNlLmlzT3V0bGluZTtcblxuICAgIC8vID09IHVwZGF0ZSBzaGFkZXIgc3R1ZmYgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHRoaXMubmVlZHNVcGRhdGUgPSB0cnVlO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIFVWIGFuaW1hdGlvbiBzdGF0ZS5cbiAgICogSW50ZW5kZWQgdG8gYmUgY2FsbGVkIHZpYSB7QGxpbmsgdXBkYXRlfS5cbiAgICogQHBhcmFtIGRlbHRhIGRlbHRhVGltZVxuICAgKi9cbiAgcHJpdmF0ZSBfdXBkYXRlVVZBbmltYXRpb24oZGVsdGE6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMudW5pZm9ybXMudXZBbmltYXRpb25TY3JvbGxYT2Zmc2V0LnZhbHVlICs9IGRlbHRhICogdGhpcy51dkFuaW1hdGlvblNjcm9sbFhTcGVlZEZhY3RvcjtcbiAgICB0aGlzLnVuaWZvcm1zLnV2QW5pbWF0aW9uU2Nyb2xsWU9mZnNldC52YWx1ZSArPSBkZWx0YSAqIHRoaXMudXZBbmltYXRpb25TY3JvbGxZU3BlZWRGYWN0b3I7XG4gICAgdGhpcy51bmlmb3Jtcy51dkFuaW1hdGlvblJvdGF0aW9uUGhhc2UudmFsdWUgKz0gZGVsdGEgKiB0aGlzLnV2QW5pbWF0aW9uUm90YXRpb25TcGVlZEZhY3RvcjtcbiAgICB0aGlzLnVuaWZvcm1zLmFscGhhVGVzdC52YWx1ZSA9IHRoaXMuYWxwaGFUZXN0O1xuXG4gICAgdGhpcy51bmlmb3Jtc05lZWRVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwbG9hZCB1bmlmb3JtcyB0aGF0IG5lZWQgdG8gdXBsb2FkIGJ1dCBkb2Vzbid0IGF1dG9tYXRpY2FsbHkgYmVjYXVzZSBvZiByZWFzb25zLlxuICAgKiBJbnRlbmRlZCB0byBiZSBjYWxsZWQgdmlhIHtAbGluayBjb25zdHJ1Y3Rvcn0gYW5kIHtAbGluayB1cGRhdGV9LlxuICAgKi9cbiAgcHJpdmF0ZSBfdXBsb2FkVW5pZm9ybXNXb3JrYXJvdW5kKCk6IHZvaWQge1xuICAgIC8vIHdvcmthcm91bmQ6IHNpbmNlIG9wYWNpdHkgaXMgZGVmaW5lZCBhcyBhIHByb3BlcnR5IGluIFRIUkVFLk1hdGVyaWFsXG4gICAgLy8gYW5kIGNhbm5vdCBiZSBvdmVycmlkZGVuIGFzIGFuIGFjY2Vzc29yLFxuICAgIC8vIFdlIGFyZSBnb2luZyB0byB1cGRhdGUgb3BhY2l0eSBoZXJlXG4gICAgdGhpcy51bmlmb3Jtcy5vcGFjaXR5LnZhbHVlID0gdGhpcy5vcGFjaXR5O1xuXG4gICAgLy8gd29ya2Fyb3VuZDogdGV4dHVyZSB0cmFuc2Zvcm1zIGFyZSBub3QgdXBkYXRlZCBhdXRvbWF0aWNhbGx5XG4gICAgdGhpcy5fdXBkYXRlVGV4dHVyZU1hdHJpeCh0aGlzLnVuaWZvcm1zLm1hcCwgdGhpcy51bmlmb3Jtcy5tYXBVdlRyYW5zZm9ybSk7XG4gICAgdGhpcy5fdXBkYXRlVGV4dHVyZU1hdHJpeCh0aGlzLnVuaWZvcm1zLm5vcm1hbE1hcCwgdGhpcy51bmlmb3Jtcy5ub3JtYWxNYXBVdlRyYW5zZm9ybSk7XG4gICAgdGhpcy5fdXBkYXRlVGV4dHVyZU1hdHJpeCh0aGlzLnVuaWZvcm1zLmVtaXNzaXZlTWFwLCB0aGlzLnVuaWZvcm1zLmVtaXNzaXZlTWFwVXZUcmFuc2Zvcm0pO1xuICAgIHRoaXMuX3VwZGF0ZVRleHR1cmVNYXRyaXgodGhpcy51bmlmb3Jtcy5zaGFkZU11bHRpcGx5VGV4dHVyZSwgdGhpcy51bmlmb3Jtcy5zaGFkZU11bHRpcGx5VGV4dHVyZVV2VHJhbnNmb3JtKTtcbiAgICB0aGlzLl91cGRhdGVUZXh0dXJlTWF0cml4KHRoaXMudW5pZm9ybXMuc2hhZGluZ1NoaWZ0VGV4dHVyZSwgdGhpcy51bmlmb3Jtcy5zaGFkaW5nU2hpZnRUZXh0dXJlVXZUcmFuc2Zvcm0pO1xuICAgIHRoaXMuX3VwZGF0ZVRleHR1cmVNYXRyaXgodGhpcy51bmlmb3Jtcy5tYXRjYXBUZXh0dXJlLCB0aGlzLnVuaWZvcm1zLm1hdGNhcFRleHR1cmVVdlRyYW5zZm9ybSk7XG4gICAgdGhpcy5fdXBkYXRlVGV4dHVyZU1hdHJpeCh0aGlzLnVuaWZvcm1zLnJpbU11bHRpcGx5VGV4dHVyZSwgdGhpcy51bmlmb3Jtcy5yaW1NdWx0aXBseVRleHR1cmVVdlRyYW5zZm9ybSk7XG4gICAgdGhpcy5fdXBkYXRlVGV4dHVyZU1hdHJpeChcbiAgICAgIHRoaXMudW5pZm9ybXMub3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlLFxuICAgICAgdGhpcy51bmlmb3Jtcy5vdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmVVdlRyYW5zZm9ybSxcbiAgICApO1xuICAgIHRoaXMuX3VwZGF0ZVRleHR1cmVNYXRyaXgodGhpcy51bmlmb3Jtcy51dkFuaW1hdGlvbk1hc2tUZXh0dXJlLCB0aGlzLnVuaWZvcm1zLnV2QW5pbWF0aW9uTWFza1RleHR1cmVVdlRyYW5zZm9ybSk7XG5cbiAgICB0aGlzLnVuaWZvcm1zTmVlZFVwZGF0ZSA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIG1hcCBvYmplY3Qgb2YgcHJlcHJvY2Vzc29yIHRva2VuIGFuZCBtYWNybyBvZiB0aGUgc2hhZGVyIHByb2dyYW0uXG4gICAqL1xuICBwcml2YXRlIF9nZW5lcmF0ZURlZmluZXMoKTogeyBbdG9rZW46IHN0cmluZ106IGJvb2xlYW4gfCBudW1iZXIgfCBzdHJpbmcgfSB7XG4gICAgY29uc3QgdGhyZWVSZXZpc2lvbiA9IHBhcnNlSW50KFRIUkVFLlJFVklTSU9OLCAxMCk7XG5cbiAgICBjb25zdCB1c2VVdkluVmVydCA9IHRoaXMub3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlICE9PSBudWxsO1xuICAgIGNvbnN0IHVzZVV2SW5GcmFnID1cbiAgICAgIHRoaXMubWFwICE9PSBudWxsIHx8XG4gICAgICB0aGlzLm5vcm1hbE1hcCAhPT0gbnVsbCB8fFxuICAgICAgdGhpcy5lbWlzc2l2ZU1hcCAhPT0gbnVsbCB8fFxuICAgICAgdGhpcy5zaGFkZU11bHRpcGx5VGV4dHVyZSAhPT0gbnVsbCB8fFxuICAgICAgdGhpcy5zaGFkaW5nU2hpZnRUZXh0dXJlICE9PSBudWxsIHx8XG4gICAgICB0aGlzLnJpbU11bHRpcGx5VGV4dHVyZSAhPT0gbnVsbCB8fFxuICAgICAgdGhpcy51dkFuaW1hdGlvbk1hc2tUZXh0dXJlICE9PSBudWxsO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIFRlbXBvcmFyeSBjb21wYXQgYWdhaW5zdCBzaGFkZXIgY2hhbmdlIEAgVGhyZWUuanMgcjEyNlxuICAgICAgLy8gU2VlOiAjMjEyMDUsICMyMTMwNywgIzIxMjk5XG4gICAgICBUSFJFRV9WUk1fVEhSRUVfUkVWSVNJT046IHRocmVlUmV2aXNpb24sXG5cbiAgICAgIE9VVExJTkU6IHRoaXMuX2lzT3V0bGluZSxcbiAgICAgIE1UT09OX1VTRV9VVjogdXNlVXZJblZlcnQgfHwgdXNlVXZJbkZyYWcsIC8vIHdlIGNhbid0IHVzZSBgVVNFX1VWYCAsIGl0IHdpbGwgYmUgcmVkZWZpbmVkIGluIFdlYkdMUHJvZ3JhbS5qc1xuICAgICAgTVRPT05fVVZTX1ZFUlRFWF9PTkxZOiB1c2VVdkluVmVydCAmJiAhdXNlVXZJbkZyYWcsXG4gICAgICBWMF9DT01QQVRfU0hBREU6IHRoaXMuX3YwQ29tcGF0U2hhZGUsXG4gICAgICBVU0VfU0hBREVNVUxUSVBMWVRFWFRVUkU6IHRoaXMuc2hhZGVNdWx0aXBseVRleHR1cmUgIT09IG51bGwsXG4gICAgICBVU0VfU0hBRElOR1NISUZUVEVYVFVSRTogdGhpcy5zaGFkaW5nU2hpZnRUZXh0dXJlICE9PSBudWxsLFxuICAgICAgVVNFX01BVENBUFRFWFRVUkU6IHRoaXMubWF0Y2FwVGV4dHVyZSAhPT0gbnVsbCxcbiAgICAgIFVTRV9SSU1NVUxUSVBMWVRFWFRVUkU6IHRoaXMucmltTXVsdGlwbHlUZXh0dXJlICE9PSBudWxsLFxuICAgICAgVVNFX09VVExJTkVXSURUSE1VTFRJUExZVEVYVFVSRTogdGhpcy5faXNPdXRsaW5lICYmIHRoaXMub3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlICE9PSBudWxsLFxuICAgICAgVVNFX1VWQU5JTUFUSU9OTUFTS1RFWFRVUkU6IHRoaXMudXZBbmltYXRpb25NYXNrVGV4dHVyZSAhPT0gbnVsbCxcbiAgICAgIElHTk9SRV9WRVJURVhfQ09MT1I6IHRoaXMuX2lnbm9yZVZlcnRleENvbG9yID09PSB0cnVlLFxuICAgICAgREVCVUdfTk9STUFMOiB0aGlzLl9kZWJ1Z01vZGUgPT09ICdub3JtYWwnLFxuICAgICAgREVCVUdfTElUU0hBREVSQVRFOiB0aGlzLl9kZWJ1Z01vZGUgPT09ICdsaXRTaGFkZVJhdGUnLFxuICAgICAgREVCVUdfVVY6IHRoaXMuX2RlYnVnTW9kZSA9PT0gJ3V2JyxcbiAgICAgIE9VVExJTkVfV0lEVEhfU0NSRUVOOlxuICAgICAgICB0aGlzLl9pc091dGxpbmUgJiYgdGhpcy5fb3V0bGluZVdpZHRoTW9kZSA9PT0gTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUuU2NyZWVuQ29vcmRpbmF0ZXMsXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZVRleHR1cmVNYXRyaXgoc3JjOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5UZXh0dXJlIHwgbnVsbD4sIGRzdDogVEhSRUUuSVVuaWZvcm08VEhSRUUuTWF0cml4Mz4pOiB2b2lkIHtcbiAgICBpZiAoc3JjLnZhbHVlKSB7XG4gICAgICBpZiAoc3JjLnZhbHVlLm1hdHJpeEF1dG9VcGRhdGUpIHtcbiAgICAgICAgc3JjLnZhbHVlLnVwZGF0ZU1hdHJpeCgpO1xuICAgICAgfVxuXG4gICAgICBkc3QudmFsdWUuY29weShzcmMudmFsdWUubWF0cml4KTtcbiAgICB9XG4gIH1cbn1cbiIsICIvLyAjZGVmaW5lIFBIT05HXG5cbnZhcnlpbmcgdmVjMyB2Vmlld1Bvc2l0aW9uO1xuXG4jaWZuZGVmIEZMQVRfU0hBREVEXG4gIHZhcnlpbmcgdmVjMyB2Tm9ybWFsO1xuI2VuZGlmXG5cbiNpbmNsdWRlIDxjb21tb24+XG5cbi8vICNpbmNsdWRlIDx1dl9wYXJzX3ZlcnRleD5cbiNpZmRlZiBNVE9PTl9VU0VfVVZcbiAgdmFyeWluZyB2ZWMyIHZVdjtcblxuICAvLyBDT01QQVQ6IHByZS1yMTUxIHVzZXMgYSBjb21tb24gdXZUcmFuc2Zvcm1cbiAgI2lmIFRIUkVFX1ZSTV9USFJFRV9SRVZJU0lPTiA8IDE1MVxuICAgIHVuaWZvcm0gbWF0MyB1dlRyYW5zZm9ybTtcbiAgI2VuZGlmXG4jZW5kaWZcblxuLy8gI2luY2x1ZGUgPHV2Ml9wYXJzX3ZlcnRleD5cbi8vIENPTUFQVDogcHJlLXIxNTEgdXNlcyB1djIgZm9yIGxpZ2h0TWFwIGFuZCBhb01hcFxuI2lmIFRIUkVFX1ZSTV9USFJFRV9SRVZJU0lPTiA8IDE1MVxuICAjaWYgZGVmaW5lZCggVVNFX0xJR0hUTUFQICkgfHwgZGVmaW5lZCggVVNFX0FPTUFQIClcbiAgICBhdHRyaWJ1dGUgdmVjMiB1djI7XG4gICAgdmFyeWluZyB2ZWMyIHZVdjI7XG4gICAgdW5pZm9ybSBtYXQzIHV2MlRyYW5zZm9ybTtcbiAgI2VuZGlmXG4jZW5kaWZcblxuLy8gI2luY2x1ZGUgPGRpc3BsYWNlbWVudG1hcF9wYXJzX3ZlcnRleD5cbi8vICNpbmNsdWRlIDxlbnZtYXBfcGFyc192ZXJ0ZXg+XG4jaW5jbHVkZSA8Y29sb3JfcGFyc192ZXJ0ZXg+XG4jaW5jbHVkZSA8Zm9nX3BhcnNfdmVydGV4PlxuI2luY2x1ZGUgPG1vcnBodGFyZ2V0X3BhcnNfdmVydGV4PlxuI2luY2x1ZGUgPHNraW5uaW5nX3BhcnNfdmVydGV4PlxuI2luY2x1ZGUgPHNoYWRvd21hcF9wYXJzX3ZlcnRleD5cbiNpbmNsdWRlIDxsb2dkZXB0aGJ1Zl9wYXJzX3ZlcnRleD5cbiNpbmNsdWRlIDxjbGlwcGluZ19wbGFuZXNfcGFyc192ZXJ0ZXg+XG5cbiNpZmRlZiBVU0VfT1VUTElORVdJRFRITVVMVElQTFlURVhUVVJFXG4gIHVuaWZvcm0gc2FtcGxlcjJEIG91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZTtcbiAgdW5pZm9ybSBtYXQzIG91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZVV2VHJhbnNmb3JtO1xuI2VuZGlmXG5cbnVuaWZvcm0gZmxvYXQgb3V0bGluZVdpZHRoRmFjdG9yO1xuXG52b2lkIG1haW4oKSB7XG5cbiAgLy8gI2luY2x1ZGUgPHV2X3ZlcnRleD5cbiAgI2lmZGVmIE1UT09OX1VTRV9VVlxuICAgIC8vIENPTVBBVDogcHJlLXIxNTEgdXNlcyBhIGNvbW1vbiB1dlRyYW5zZm9ybVxuICAgICNpZiBUSFJFRV9WUk1fVEhSRUVfUkVWSVNJT04gPj0gMTUxXG4gICAgICB2VXYgPSB1djtcbiAgICAjZWxzZVxuICAgICAgdlV2ID0gKCB1dlRyYW5zZm9ybSAqIHZlYzMoIHV2LCAxICkgKS54eTtcbiAgICAjZW5kaWZcbiAgI2VuZGlmXG5cbiAgLy8gI2luY2x1ZGUgPHV2Ml92ZXJ0ZXg+XG4gIC8vIENPTUFQVDogcHJlLXIxNTEgdXNlcyB1djIgZm9yIGxpZ2h0TWFwIGFuZCBhb01hcFxuICAjaWYgVEhSRUVfVlJNX1RIUkVFX1JFVklTSU9OIDwgMTUxXG4gICAgI2lmIGRlZmluZWQoIFVTRV9MSUdIVE1BUCApIHx8IGRlZmluZWQoIFVTRV9BT01BUCApXG4gICAgICB2VXYyID0gKCB1djJUcmFuc2Zvcm0gKiB2ZWMzKCB1djIsIDEgKSApLnh5O1xuICAgICNlbmRpZlxuICAjZW5kaWZcblxuICAjaW5jbHVkZSA8Y29sb3JfdmVydGV4PlxuXG4gICNpbmNsdWRlIDxiZWdpbm5vcm1hbF92ZXJ0ZXg+XG4gICNpbmNsdWRlIDxtb3JwaG5vcm1hbF92ZXJ0ZXg+XG4gICNpbmNsdWRlIDxza2luYmFzZV92ZXJ0ZXg+XG4gICNpbmNsdWRlIDxza2lubm9ybWFsX3ZlcnRleD5cblxuICAvLyB3ZSBuZWVkIHRoaXMgdG8gY29tcHV0ZSB0aGUgb3V0bGluZSBwcm9wZXJseVxuICBvYmplY3ROb3JtYWwgPSBub3JtYWxpemUoIG9iamVjdE5vcm1hbCApO1xuXG4gICNpbmNsdWRlIDxkZWZhdWx0bm9ybWFsX3ZlcnRleD5cblxuICAjaWZuZGVmIEZMQVRfU0hBREVEIC8vIE5vcm1hbCBjb21wdXRlZCB3aXRoIGRlcml2YXRpdmVzIHdoZW4gRkxBVF9TSEFERURcbiAgICB2Tm9ybWFsID0gbm9ybWFsaXplKCB0cmFuc2Zvcm1lZE5vcm1hbCApO1xuICAjZW5kaWZcblxuICAjaW5jbHVkZSA8YmVnaW5fdmVydGV4PlxuXG4gICNpbmNsdWRlIDxtb3JwaHRhcmdldF92ZXJ0ZXg+XG4gICNpbmNsdWRlIDxza2lubmluZ192ZXJ0ZXg+XG4gIC8vICNpbmNsdWRlIDxkaXNwbGFjZW1lbnRtYXBfdmVydGV4PlxuICAjaW5jbHVkZSA8cHJvamVjdF92ZXJ0ZXg+XG4gICNpbmNsdWRlIDxsb2dkZXB0aGJ1Zl92ZXJ0ZXg+XG4gICNpbmNsdWRlIDxjbGlwcGluZ19wbGFuZXNfdmVydGV4PlxuXG4gIHZWaWV3UG9zaXRpb24gPSAtIG12UG9zaXRpb24ueHl6O1xuXG4gICNpZmRlZiBPVVRMSU5FXG4gICAgZmxvYXQgd29ybGROb3JtYWxMZW5ndGggPSBsZW5ndGgoIHRyYW5zZm9ybWVkTm9ybWFsICk7XG4gICAgdmVjMyBvdXRsaW5lT2Zmc2V0ID0gb3V0bGluZVdpZHRoRmFjdG9yICogd29ybGROb3JtYWxMZW5ndGggKiBvYmplY3ROb3JtYWw7XG5cbiAgICAjaWZkZWYgVVNFX09VVExJTkVXSURUSE1VTFRJUExZVEVYVFVSRVxuICAgICAgdmVjMiBvdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmVVdiA9ICggb3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlVXZUcmFuc2Zvcm0gKiB2ZWMzKCB2VXYsIDEgKSApLnh5O1xuICAgICAgZmxvYXQgb3V0bGluZVRleCA9IHRleHR1cmUyRCggb3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlLCBvdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmVVdiApLmc7XG4gICAgICBvdXRsaW5lT2Zmc2V0ICo9IG91dGxpbmVUZXg7XG4gICAgI2VuZGlmXG5cbiAgICAjaWZkZWYgT1VUTElORV9XSURUSF9TQ1JFRU5cbiAgICAgIG91dGxpbmVPZmZzZXQgKj0gdlZpZXdQb3NpdGlvbi56IC8gcHJvamVjdGlvbk1hdHJpeFsgMSBdLnk7XG4gICAgI2VuZGlmXG5cbiAgICBnbF9Qb3NpdGlvbiA9IHByb2plY3Rpb25NYXRyaXggKiBtb2RlbFZpZXdNYXRyaXggKiB2ZWM0KCBvdXRsaW5lT2Zmc2V0ICsgdHJhbnNmb3JtZWQsIDEuMCApO1xuXG4gICAgZ2xfUG9zaXRpb24ueiArPSAxRS02ICogZ2xfUG9zaXRpb24udzsgLy8gYW50aS1hcnRpZmFjdCBtYWdpY1xuICAjZW5kaWZcblxuICAjaW5jbHVkZSA8d29ybGRwb3NfdmVydGV4PlxuICAvLyAjaW5jbHVkZSA8ZW52bWFwX3ZlcnRleD5cbiAgI2luY2x1ZGUgPHNoYWRvd21hcF92ZXJ0ZXg+XG4gICNpbmNsdWRlIDxmb2dfdmVydGV4PlxuXG59IiwgIi8vICNkZWZpbmUgUEhPTkdcblxudW5pZm9ybSB2ZWMzIGxpdEZhY3RvcjtcblxudW5pZm9ybSBmbG9hdCBvcGFjaXR5O1xuXG51bmlmb3JtIHZlYzMgc2hhZGVDb2xvckZhY3RvcjtcbiNpZmRlZiBVU0VfU0hBREVNVUxUSVBMWVRFWFRVUkVcbiAgdW5pZm9ybSBzYW1wbGVyMkQgc2hhZGVNdWx0aXBseVRleHR1cmU7XG4gIHVuaWZvcm0gbWF0MyBzaGFkZU11bHRpcGx5VGV4dHVyZVV2VHJhbnNmb3JtO1xuI2VuZGlmXG5cbnVuaWZvcm0gZmxvYXQgc2hhZGluZ1NoaWZ0RmFjdG9yO1xudW5pZm9ybSBmbG9hdCBzaGFkaW5nVG9vbnlGYWN0b3I7XG5cbiNpZmRlZiBVU0VfU0hBRElOR1NISUZUVEVYVFVSRVxuICB1bmlmb3JtIHNhbXBsZXIyRCBzaGFkaW5nU2hpZnRUZXh0dXJlO1xuICB1bmlmb3JtIG1hdDMgc2hhZGluZ1NoaWZ0VGV4dHVyZVV2VHJhbnNmb3JtO1xuICB1bmlmb3JtIGZsb2F0IHNoYWRpbmdTaGlmdFRleHR1cmVTY2FsZTtcbiNlbmRpZlxuXG51bmlmb3JtIGZsb2F0IGdpRXF1YWxpemF0aW9uRmFjdG9yO1xuXG51bmlmb3JtIHZlYzMgcGFyYW1ldHJpY1JpbUNvbG9yRmFjdG9yO1xuI2lmZGVmIFVTRV9SSU1NVUxUSVBMWVRFWFRVUkVcbiAgdW5pZm9ybSBzYW1wbGVyMkQgcmltTXVsdGlwbHlUZXh0dXJlO1xuICB1bmlmb3JtIG1hdDMgcmltTXVsdGlwbHlUZXh0dXJlVXZUcmFuc2Zvcm07XG4jZW5kaWZcbnVuaWZvcm0gZmxvYXQgcmltTGlnaHRpbmdNaXhGYWN0b3I7XG51bmlmb3JtIGZsb2F0IHBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJGYWN0b3I7XG51bmlmb3JtIGZsb2F0IHBhcmFtZXRyaWNSaW1MaWZ0RmFjdG9yO1xuXG4jaWZkZWYgVVNFX01BVENBUFRFWFRVUkVcbiAgdW5pZm9ybSB2ZWMzIG1hdGNhcEZhY3RvcjtcbiAgdW5pZm9ybSBzYW1wbGVyMkQgbWF0Y2FwVGV4dHVyZTtcbiAgdW5pZm9ybSBtYXQzIG1hdGNhcFRleHR1cmVVdlRyYW5zZm9ybTtcbiNlbmRpZlxuXG51bmlmb3JtIHZlYzMgZW1pc3NpdmU7XG51bmlmb3JtIGZsb2F0IGVtaXNzaXZlSW50ZW5zaXR5O1xuXG51bmlmb3JtIHZlYzMgb3V0bGluZUNvbG9yRmFjdG9yO1xudW5pZm9ybSBmbG9hdCBvdXRsaW5lTGlnaHRpbmdNaXhGYWN0b3I7XG5cbiNpZmRlZiBVU0VfVVZBTklNQVRJT05NQVNLVEVYVFVSRVxuICB1bmlmb3JtIHNhbXBsZXIyRCB1dkFuaW1hdGlvbk1hc2tUZXh0dXJlO1xuICB1bmlmb3JtIG1hdDMgdXZBbmltYXRpb25NYXNrVGV4dHVyZVV2VHJhbnNmb3JtO1xuI2VuZGlmXG5cbnVuaWZvcm0gZmxvYXQgdXZBbmltYXRpb25TY3JvbGxYT2Zmc2V0O1xudW5pZm9ybSBmbG9hdCB1dkFuaW1hdGlvblNjcm9sbFlPZmZzZXQ7XG51bmlmb3JtIGZsb2F0IHV2QW5pbWF0aW9uUm90YXRpb25QaGFzZTtcblxuI2luY2x1ZGUgPGNvbW1vbj5cbiNpbmNsdWRlIDxwYWNraW5nPlxuI2luY2x1ZGUgPGRpdGhlcmluZ19wYXJzX2ZyYWdtZW50PlxuI2luY2x1ZGUgPGNvbG9yX3BhcnNfZnJhZ21lbnQ+XG5cbi8vICNpbmNsdWRlIDx1dl9wYXJzX2ZyYWdtZW50PlxuI2lmICggZGVmaW5lZCggTVRPT05fVVNFX1VWICkgJiYgIWRlZmluZWQoIE1UT09OX1VWU19WRVJURVhfT05MWSApIClcbiAgdmFyeWluZyB2ZWMyIHZVdjtcbiNlbmRpZlxuXG4vLyAjaW5jbHVkZSA8dXYyX3BhcnNfZnJhZ21lbnQ+XG4vLyBDT01BUFQ6IHByZS1yMTUxIHVzZXMgdXYyIGZvciBsaWdodE1hcCBhbmQgYW9NYXBcbiNpZiBUSFJFRV9WUk1fVEhSRUVfUkVWSVNJT04gPCAxNTFcbiAgI2lmIGRlZmluZWQoIFVTRV9MSUdIVE1BUCApIHx8IGRlZmluZWQoIFVTRV9BT01BUCApXG4gICAgdmFyeWluZyB2ZWMyIHZVdjI7XG4gICNlbmRpZlxuI2VuZGlmXG5cbiNpbmNsdWRlIDxtYXBfcGFyc19mcmFnbWVudD5cblxuI2lmZGVmIFVTRV9NQVBcbiAgdW5pZm9ybSBtYXQzIG1hcFV2VHJhbnNmb3JtO1xuI2VuZGlmXG5cbi8vICNpbmNsdWRlIDxhbHBoYW1hcF9wYXJzX2ZyYWdtZW50PlxuXG4jaW5jbHVkZSA8YWxwaGF0ZXN0X3BhcnNfZnJhZ21lbnQ+XG5cbiNpbmNsdWRlIDxhb21hcF9wYXJzX2ZyYWdtZW50PlxuLy8gI2luY2x1ZGUgPGxpZ2h0bWFwX3BhcnNfZnJhZ21lbnQ+XG4jaW5jbHVkZSA8ZW1pc3NpdmVtYXBfcGFyc19mcmFnbWVudD5cblxuI2lmZGVmIFVTRV9FTUlTU0lWRU1BUFxuICB1bmlmb3JtIG1hdDMgZW1pc3NpdmVNYXBVdlRyYW5zZm9ybTtcbiNlbmRpZlxuXG4vLyAjaW5jbHVkZSA8ZW52bWFwX2NvbW1vbl9wYXJzX2ZyYWdtZW50PlxuLy8gI2luY2x1ZGUgPGVudm1hcF9wYXJzX2ZyYWdtZW50PlxuLy8gI2luY2x1ZGUgPGN1YmVfdXZfcmVmbGVjdGlvbl9mcmFnbWVudD5cbiNpbmNsdWRlIDxmb2dfcGFyc19mcmFnbWVudD5cblxuLy8gI2luY2x1ZGUgPGJzZGZzPlxuLy8gQ09NUEFUOiBwcmUtcjE1MSBkb2Vzbid0IGhhdmUgQlJERl9MYW1iZXJ0IGluIDxjb21tb24+XG4jaWYgVEhSRUVfVlJNX1RIUkVFX1JFVklTSU9OIDwgMTUxXG4gIHZlYzMgQlJERl9MYW1iZXJ0KCBjb25zdCBpbiB2ZWMzIGRpZmZ1c2VDb2xvciApIHtcbiAgICByZXR1cm4gUkVDSVBST0NBTF9QSSAqIGRpZmZ1c2VDb2xvcjtcbiAgfVxuI2VuZGlmXG5cbiNpbmNsdWRlIDxsaWdodHNfcGFyc19iZWdpbj5cblxuI2luY2x1ZGUgPG5vcm1hbF9wYXJzX2ZyYWdtZW50PlxuXG4vLyAjaW5jbHVkZSA8bGlnaHRzX3Bob25nX3BhcnNfZnJhZ21lbnQ+XG52YXJ5aW5nIHZlYzMgdlZpZXdQb3NpdGlvbjtcblxuc3RydWN0IE1Ub29uTWF0ZXJpYWwge1xuICB2ZWMzIGRpZmZ1c2VDb2xvcjtcbiAgdmVjMyBzaGFkZUNvbG9yO1xuICBmbG9hdCBzaGFkaW5nU2hpZnQ7XG59O1xuXG5mbG9hdCBsaW5lYXJzdGVwKCBmbG9hdCBhLCBmbG9hdCBiLCBmbG9hdCB0ICkge1xuICByZXR1cm4gY2xhbXAoICggdCAtIGEgKSAvICggYiAtIGEgKSwgMC4wLCAxLjAgKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0IE5kb3RMIGludG8gdG9vbiBzaGFkaW5nIGZhY3RvciB1c2luZyBzaGFkaW5nU2hpZnQgYW5kIHNoYWRpbmdUb29ueVxuICovXG5mbG9hdCBnZXRTaGFkaW5nKFxuICBjb25zdCBpbiBmbG9hdCBkb3ROTCxcbiAgY29uc3QgaW4gZmxvYXQgc2hhZG93LFxuICBjb25zdCBpbiBmbG9hdCBzaGFkaW5nU2hpZnRcbikge1xuICBmbG9hdCBzaGFkaW5nID0gZG90Tkw7XG4gIHNoYWRpbmcgPSBzaGFkaW5nICsgc2hhZGluZ1NoaWZ0O1xuICBzaGFkaW5nID0gbGluZWFyc3RlcCggLTEuMCArIHNoYWRpbmdUb29ueUZhY3RvciwgMS4wIC0gc2hhZGluZ1Rvb255RmFjdG9yLCBzaGFkaW5nICk7XG4gIHNoYWRpbmcgKj0gc2hhZG93O1xuICByZXR1cm4gc2hhZGluZztcbn1cblxuLyoqXG4gKiBNaXggZGlmZnVzZUNvbG9yIGFuZCBzaGFkZUNvbG9yIHVzaW5nIHNoYWRpbmcgZmFjdG9yIGFuZCBsaWdodCBjb2xvclxuICovXG52ZWMzIGdldERpZmZ1c2UoXG4gIGNvbnN0IGluIE1Ub29uTWF0ZXJpYWwgbWF0ZXJpYWwsXG4gIGNvbnN0IGluIGZsb2F0IHNoYWRpbmcsXG4gIGluIHZlYzMgbGlnaHRDb2xvclxuKSB7XG4gICNpZmRlZiBERUJVR19MSVRTSEFERVJBVEVcbiAgICByZXR1cm4gdmVjMyggQlJERl9MYW1iZXJ0KCBzaGFkaW5nICogbGlnaHRDb2xvciApICk7XG4gICNlbmRpZlxuXG4gIHZlYzMgY29sID0gbGlnaHRDb2xvciAqIEJSREZfTGFtYmVydCggbWl4KCBtYXRlcmlhbC5zaGFkZUNvbG9yLCBtYXRlcmlhbC5kaWZmdXNlQ29sb3IsIHNoYWRpbmcgKSApO1xuXG4gIC8vIFRoZSBcImNvbW1lbnQgb3V0IGlmIHlvdSB3YW50IHRvIFBCUiBhYnNvbHV0ZWx5XCIgbGluZVxuICAjaWZkZWYgVjBfQ09NUEFUX1NIQURFXG4gICAgY29sID0gbWluKCBjb2wsIG1hdGVyaWFsLmRpZmZ1c2VDb2xvciApO1xuICAjZW5kaWZcblxuICByZXR1cm4gY29sO1xufVxuXG4vLyBDT01QQVQ6IHByZS1yMTU2IHVzZXMgYSBzdHJ1Y3QgR2VvbWV0cmljQ29udGV4dFxuI2lmIFRIUkVFX1ZSTV9USFJFRV9SRVZJU0lPTiA+PSAxNTdcbiAgdm9pZCBSRV9EaXJlY3RfTVRvb24oIGNvbnN0IGluIEluY2lkZW50TGlnaHQgZGlyZWN0TGlnaHQsIGNvbnN0IGluIHZlYzMgZ2VvbWV0cnlQb3NpdGlvbiwgY29uc3QgaW4gdmVjMyBnZW9tZXRyeU5vcm1hbCwgY29uc3QgaW4gdmVjMyBnZW9tZXRyeVZpZXdEaXIsIGNvbnN0IGluIHZlYzMgZ2VvbWV0cnlDbGVhcmNvYXROb3JtYWwsIGNvbnN0IGluIE1Ub29uTWF0ZXJpYWwgbWF0ZXJpYWwsIGNvbnN0IGluIGZsb2F0IHNoYWRvdywgaW5vdXQgUmVmbGVjdGVkTGlnaHQgcmVmbGVjdGVkTGlnaHQgKSB7XG4gICAgZmxvYXQgZG90TkwgPSBjbGFtcCggZG90KCBnZW9tZXRyeU5vcm1hbCwgZGlyZWN0TGlnaHQuZGlyZWN0aW9uICksIC0xLjAsIDEuMCApO1xuICAgIHZlYzMgaXJyYWRpYW5jZSA9IGRpcmVjdExpZ2h0LmNvbG9yO1xuXG4gICAgLy8gZGlyZWN0U3BlY3VsYXIgd2lsbCBiZSB1c2VkIGZvciByaW0gbGlnaHRpbmcsIG5vdCBhbiBhY3R1YWwgc3BlY3VsYXJcbiAgICByZWZsZWN0ZWRMaWdodC5kaXJlY3RTcGVjdWxhciArPSBpcnJhZGlhbmNlO1xuXG4gICAgaXJyYWRpYW5jZSAqPSBkb3ROTDtcblxuICAgIGZsb2F0IHNoYWRpbmcgPSBnZXRTaGFkaW5nKCBkb3ROTCwgc2hhZG93LCBtYXRlcmlhbC5zaGFkaW5nU2hpZnQgKTtcblxuICAgIC8vIHRvb24gc2hhZGVkIGRpZmZ1c2VcbiAgICByZWZsZWN0ZWRMaWdodC5kaXJlY3REaWZmdXNlICs9IGdldERpZmZ1c2UoIG1hdGVyaWFsLCBzaGFkaW5nLCBkaXJlY3RMaWdodC5jb2xvciApO1xuICB9XG5cbiAgdm9pZCBSRV9JbmRpcmVjdERpZmZ1c2VfTVRvb24oIGNvbnN0IGluIHZlYzMgaXJyYWRpYW5jZSwgY29uc3QgaW4gdmVjMyBnZW9tZXRyeVBvc2l0aW9uLCBjb25zdCBpbiB2ZWMzIGdlb21ldHJ5Tm9ybWFsLCBjb25zdCBpbiB2ZWMzIGdlb21ldHJ5Vmlld0RpciwgY29uc3QgaW4gdmVjMyBnZW9tZXRyeUNsZWFyY29hdE5vcm1hbCwgY29uc3QgaW4gTVRvb25NYXRlcmlhbCBtYXRlcmlhbCwgaW5vdXQgUmVmbGVjdGVkTGlnaHQgcmVmbGVjdGVkTGlnaHQgKSB7XG4gICAgLy8gaW5kaXJlY3QgZGlmZnVzZSB3aWxsIHVzZSBkaWZmdXNlQ29sb3IsIG5vIHNoYWRlQ29sb3IgaW52b2x2ZWRcbiAgICByZWZsZWN0ZWRMaWdodC5pbmRpcmVjdERpZmZ1c2UgKz0gaXJyYWRpYW5jZSAqIEJSREZfTGFtYmVydCggbWF0ZXJpYWwuZGlmZnVzZUNvbG9yICk7XG5cbiAgICAvLyBkaXJlY3RTcGVjdWxhciB3aWxsIGJlIHVzZWQgZm9yIHJpbSBsaWdodGluZywgbm90IGFuIGFjdHVhbCBzcGVjdWxhclxuICAgIHJlZmxlY3RlZExpZ2h0LmRpcmVjdFNwZWN1bGFyICs9IGlycmFkaWFuY2U7XG4gIH1cbiNlbHNlXG4gIHZvaWQgUkVfRGlyZWN0X01Ub29uKCBjb25zdCBpbiBJbmNpZGVudExpZ2h0IGRpcmVjdExpZ2h0LCBjb25zdCBpbiBHZW9tZXRyaWNDb250ZXh0IGdlb21ldHJ5LCBjb25zdCBpbiBNVG9vbk1hdGVyaWFsIG1hdGVyaWFsLCBjb25zdCBpbiBmbG9hdCBzaGFkb3csIGlub3V0IFJlZmxlY3RlZExpZ2h0IHJlZmxlY3RlZExpZ2h0ICkge1xuICAgIGZsb2F0IGRvdE5MID0gY2xhbXAoIGRvdCggZ2VvbWV0cnkubm9ybWFsLCBkaXJlY3RMaWdodC5kaXJlY3Rpb24gKSwgLTEuMCwgMS4wICk7XG4gICAgdmVjMyBpcnJhZGlhbmNlID0gZGlyZWN0TGlnaHQuY29sb3I7XG5cbiAgICAvLyBkaXJlY3RTcGVjdWxhciB3aWxsIGJlIHVzZWQgZm9yIHJpbSBsaWdodGluZywgbm90IGFuIGFjdHVhbCBzcGVjdWxhclxuICAgIHJlZmxlY3RlZExpZ2h0LmRpcmVjdFNwZWN1bGFyICs9IGlycmFkaWFuY2U7XG5cbiAgICBpcnJhZGlhbmNlICo9IGRvdE5MO1xuXG4gICAgZmxvYXQgc2hhZGluZyA9IGdldFNoYWRpbmcoIGRvdE5MLCBzaGFkb3csIG1hdGVyaWFsLnNoYWRpbmdTaGlmdCApO1xuXG4gICAgLy8gdG9vbiBzaGFkZWQgZGlmZnVzZVxuICAgIHJlZmxlY3RlZExpZ2h0LmRpcmVjdERpZmZ1c2UgKz0gZ2V0RGlmZnVzZSggbWF0ZXJpYWwsIHNoYWRpbmcsIGRpcmVjdExpZ2h0LmNvbG9yICk7XG4gIH1cblxuICB2b2lkIFJFX0luZGlyZWN0RGlmZnVzZV9NVG9vbiggY29uc3QgaW4gdmVjMyBpcnJhZGlhbmNlLCBjb25zdCBpbiBHZW9tZXRyaWNDb250ZXh0IGdlb21ldHJ5LCBjb25zdCBpbiBNVG9vbk1hdGVyaWFsIG1hdGVyaWFsLCBpbm91dCBSZWZsZWN0ZWRMaWdodCByZWZsZWN0ZWRMaWdodCApIHtcbiAgICAvLyBpbmRpcmVjdCBkaWZmdXNlIHdpbGwgdXNlIGRpZmZ1c2VDb2xvciwgbm8gc2hhZGVDb2xvciBpbnZvbHZlZFxuICAgIHJlZmxlY3RlZExpZ2h0LmluZGlyZWN0RGlmZnVzZSArPSBpcnJhZGlhbmNlICogQlJERl9MYW1iZXJ0KCBtYXRlcmlhbC5kaWZmdXNlQ29sb3IgKTtcblxuICAgIC8vIGRpcmVjdFNwZWN1bGFyIHdpbGwgYmUgdXNlZCBmb3IgcmltIGxpZ2h0aW5nLCBub3QgYW4gYWN0dWFsIHNwZWN1bGFyXG4gICAgcmVmbGVjdGVkTGlnaHQuZGlyZWN0U3BlY3VsYXIgKz0gaXJyYWRpYW5jZTtcbiAgfVxuI2VuZGlmXG5cbiNkZWZpbmUgUkVfRGlyZWN0IFJFX0RpcmVjdF9NVG9vblxuI2RlZmluZSBSRV9JbmRpcmVjdERpZmZ1c2UgUkVfSW5kaXJlY3REaWZmdXNlX01Ub29uXG4jZGVmaW5lIE1hdGVyaWFsX0xpZ2h0UHJvYmVMT0QoIG1hdGVyaWFsICkgKDApXG5cbiNpbmNsdWRlIDxzaGFkb3dtYXBfcGFyc19mcmFnbWVudD5cbi8vICNpbmNsdWRlIDxidW1wbWFwX3BhcnNfZnJhZ21lbnQ+XG5cbi8vICNpbmNsdWRlIDxub3JtYWxtYXBfcGFyc19mcmFnbWVudD5cbiNpZmRlZiBVU0VfTk9STUFMTUFQXG5cbiAgdW5pZm9ybSBzYW1wbGVyMkQgbm9ybWFsTWFwO1xuICB1bmlmb3JtIG1hdDMgbm9ybWFsTWFwVXZUcmFuc2Zvcm07XG4gIHVuaWZvcm0gdmVjMiBub3JtYWxTY2FsZTtcblxuI2VuZGlmXG5cbi8vIENPTVBBVDogcHJlLXIxNTFcbi8vIFVTRV9OT1JNQUxNQVBfT0JKRUNUU1BBQ0UgdXNlZCB0byBiZSBPQkpFQ1RTUEFDRV9OT1JNQUxNQVAgaW4gcHJlLXIxNTFcbiNpZiBkZWZpbmVkKCBVU0VfTk9STUFMTUFQX09CSkVDVFNQQUNFICkgfHwgZGVmaW5lZCggT0JKRUNUU1BBQ0VfTk9STUFMTUFQIClcblxuICB1bmlmb3JtIG1hdDMgbm9ybWFsTWF0cml4O1xuXG4jZW5kaWZcblxuLy8gQ09NUEFUOiBwcmUtcjE1MVxuLy8gVVNFX05PUk1BTE1BUF9UQU5HRU5UU1BBQ0UgdXNlZCB0byBiZSBUQU5HRU5UU1BBQ0VfTk9STUFMTUFQIGluIHByZS1yMTUxXG4jaWYgISBkZWZpbmVkICggVVNFX1RBTkdFTlQgKSAmJiAoIGRlZmluZWQgKCBVU0VfTk9STUFMTUFQX1RBTkdFTlRTUEFDRSApIHx8IGRlZmluZWQgKCBUQU5HRU5UU1BBQ0VfTk9STUFMTUFQICkgKVxuXG4gIC8vIFBlci1QaXhlbCBUYW5nZW50IFNwYWNlIE5vcm1hbCBNYXBwaW5nXG4gIC8vIGh0dHA6Ly9oYWNrc29mbGlmZS5ibG9nc3BvdC5jaC8yMDA5LzExL3Blci1waXhlbC10YW5nZW50LXNwYWNlLW5vcm1hbC1tYXBwaW5nLmh0bWxcblxuICAvLyB0aHJlZS12cm0gc3BlY2lmaWMgY2hhbmdlOiBpdCByZXF1aXJlcyBgdXZgIGFzIGFuIGlucHV0IGluIG9yZGVyIHRvIHN1cHBvcnQgdXYgc2Nyb2xsc1xuXG4gIC8vIFRlbXBvcmFyeSBjb21wYXQgYWdhaW5zdCBzaGFkZXIgY2hhbmdlIEAgVGhyZWUuanMgcjEyNiwgcjE1MVxuICAjaWYgVEhSRUVfVlJNX1RIUkVFX1JFVklTSU9OID49IDE1MVxuXG4gICAgbWF0MyBnZXRUYW5nZW50RnJhbWUoIHZlYzMgZXllX3BvcywgdmVjMyBzdXJmX25vcm0sIHZlYzIgdXYgKSB7XG5cbiAgICAgIHZlYzMgcTAgPSBkRmR4KCBleWVfcG9zLnh5eiApO1xuICAgICAgdmVjMyBxMSA9IGRGZHkoIGV5ZV9wb3MueHl6ICk7XG4gICAgICB2ZWMyIHN0MCA9IGRGZHgoIHV2LnN0ICk7XG4gICAgICB2ZWMyIHN0MSA9IGRGZHkoIHV2LnN0ICk7XG5cbiAgICAgIHZlYzMgTiA9IHN1cmZfbm9ybTtcblxuICAgICAgdmVjMyBxMXBlcnAgPSBjcm9zcyggcTEsIE4gKTtcbiAgICAgIHZlYzMgcTBwZXJwID0gY3Jvc3MoIE4sIHEwICk7XG5cbiAgICAgIHZlYzMgVCA9IHExcGVycCAqIHN0MC54ICsgcTBwZXJwICogc3QxLng7XG4gICAgICB2ZWMzIEIgPSBxMXBlcnAgKiBzdDAueSArIHEwcGVycCAqIHN0MS55O1xuXG4gICAgICBmbG9hdCBkZXQgPSBtYXgoIGRvdCggVCwgVCApLCBkb3QoIEIsIEIgKSApO1xuICAgICAgZmxvYXQgc2NhbGUgPSAoIGRldCA9PSAwLjAgKSA/IDAuMCA6IGludmVyc2VzcXJ0KCBkZXQgKTtcblxuICAgICAgcmV0dXJuIG1hdDMoIFQgKiBzY2FsZSwgQiAqIHNjYWxlLCBOICk7XG5cbiAgICB9XG5cbiAgI2Vsc2VcblxuICAgIHZlYzMgcGVydHVyYk5vcm1hbDJBcmIoIHZlYzIgdXYsIHZlYzMgZXllX3BvcywgdmVjMyBzdXJmX25vcm0sIHZlYzMgbWFwTiwgZmxvYXQgZmFjZURpcmVjdGlvbiApIHtcblxuICAgICAgdmVjMyBxMCA9IHZlYzMoIGRGZHgoIGV5ZV9wb3MueCApLCBkRmR4KCBleWVfcG9zLnkgKSwgZEZkeCggZXllX3Bvcy56ICkgKTtcbiAgICAgIHZlYzMgcTEgPSB2ZWMzKCBkRmR5KCBleWVfcG9zLnggKSwgZEZkeSggZXllX3Bvcy55ICksIGRGZHkoIGV5ZV9wb3MueiApICk7XG4gICAgICB2ZWMyIHN0MCA9IGRGZHgoIHV2LnN0ICk7XG4gICAgICB2ZWMyIHN0MSA9IGRGZHkoIHV2LnN0ICk7XG5cbiAgICAgIHZlYzMgTiA9IG5vcm1hbGl6ZSggc3VyZl9ub3JtICk7XG5cbiAgICAgIHZlYzMgcTFwZXJwID0gY3Jvc3MoIHExLCBOICk7XG4gICAgICB2ZWMzIHEwcGVycCA9IGNyb3NzKCBOLCBxMCApO1xuXG4gICAgICB2ZWMzIFQgPSBxMXBlcnAgKiBzdDAueCArIHEwcGVycCAqIHN0MS54O1xuICAgICAgdmVjMyBCID0gcTFwZXJwICogc3QwLnkgKyBxMHBlcnAgKiBzdDEueTtcblxuICAgICAgLy8gdGhyZWUtdnJtIHNwZWNpZmljIGNoYW5nZTogV29ya2Fyb3VuZCBmb3IgdGhlIGlzc3VlIHRoYXQgaGFwcGVucyB3aGVuIGRlbHRhIG9mIHV2ID0gMC4wXG4gICAgICAvLyBUT0RPOiBJcyB0aGlzIHN0aWxsIHJlcXVpcmVkPyBPciBzaGFsbCBJIG1ha2UgYSBQUiBhYm91dCBpdD9cbiAgICAgIGlmICggbGVuZ3RoKCBUICkgPT0gMC4wIHx8IGxlbmd0aCggQiApID09IDAuMCApIHtcbiAgICAgICAgcmV0dXJuIHN1cmZfbm9ybTtcbiAgICAgIH1cblxuICAgICAgZmxvYXQgZGV0ID0gbWF4KCBkb3QoIFQsIFQgKSwgZG90KCBCLCBCICkgKTtcbiAgICAgIGZsb2F0IHNjYWxlID0gKCBkZXQgPT0gMC4wICkgPyAwLjAgOiBmYWNlRGlyZWN0aW9uICogaW52ZXJzZXNxcnQoIGRldCApO1xuXG4gICAgICByZXR1cm4gbm9ybWFsaXplKCBUICogKCBtYXBOLnggKiBzY2FsZSApICsgQiAqICggbWFwTi55ICogc2NhbGUgKSArIE4gKiBtYXBOLnogKTtcblxuICAgIH1cblxuICAjZW5kaWZcblxuI2VuZGlmXG5cbi8vICNpbmNsdWRlIDxzcGVjdWxhcm1hcF9wYXJzX2ZyYWdtZW50PlxuI2luY2x1ZGUgPGxvZ2RlcHRoYnVmX3BhcnNfZnJhZ21lbnQ+XG4jaW5jbHVkZSA8Y2xpcHBpbmdfcGxhbmVzX3BhcnNfZnJhZ21lbnQ+XG5cbi8vID09IHBvc3QgY29ycmVjdGlvbiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG52b2lkIHBvc3RDb3JyZWN0aW9uKCkge1xuICAjaW5jbHVkZSA8dG9uZW1hcHBpbmdfZnJhZ21lbnQ+XG4gICNpbmNsdWRlIDxjb2xvcnNwYWNlX2ZyYWdtZW50PlxuICAjaW5jbHVkZSA8Zm9nX2ZyYWdtZW50PlxuICAjaW5jbHVkZSA8cHJlbXVsdGlwbGllZF9hbHBoYV9mcmFnbWVudD5cbiAgI2luY2x1ZGUgPGRpdGhlcmluZ19mcmFnbWVudD5cbn1cblxuLy8gPT0gbWFpbiBwcm9jZWR1cmUgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbnZvaWQgbWFpbigpIHtcbiAgI2luY2x1ZGUgPGNsaXBwaW5nX3BsYW5lc19mcmFnbWVudD5cblxuICB2ZWMyIHV2ID0gdmVjMigwLjUsIDAuNSk7XG5cbiAgI2lmICggZGVmaW5lZCggTVRPT05fVVNFX1VWICkgJiYgIWRlZmluZWQoIE1UT09OX1VWU19WRVJURVhfT05MWSApIClcbiAgICB1diA9IHZVdjtcblxuICAgIGZsb2F0IHV2QW5pbU1hc2sgPSAxLjA7XG4gICAgI2lmZGVmIFVTRV9VVkFOSU1BVElPTk1BU0tURVhUVVJFXG4gICAgICB2ZWMyIHV2QW5pbWF0aW9uTWFza1RleHR1cmVVdiA9ICggdXZBbmltYXRpb25NYXNrVGV4dHVyZVV2VHJhbnNmb3JtICogdmVjMyggdXYsIDEgKSApLnh5O1xuICAgICAgdXZBbmltTWFzayA9IHRleHR1cmUyRCggdXZBbmltYXRpb25NYXNrVGV4dHVyZSwgdXZBbmltYXRpb25NYXNrVGV4dHVyZVV2ICkuYjtcbiAgICAjZW5kaWZcblxuICAgIGZsb2F0IHV2Um90Q29zID0gY29zKCB1dkFuaW1hdGlvblJvdGF0aW9uUGhhc2UgKiB1dkFuaW1NYXNrICk7XG4gICAgZmxvYXQgdXZSb3RTaW4gPSBzaW4oIHV2QW5pbWF0aW9uUm90YXRpb25QaGFzZSAqIHV2QW5pbU1hc2sgKTtcbiAgICB1diA9IG1hdDIoIHV2Um90Q29zLCAtdXZSb3RTaW4sIHV2Um90U2luLCB1dlJvdENvcyApICogKCB1diAtIDAuNSApICsgMC41O1xuICAgIHV2ID0gdXYgKyB2ZWMyKCB1dkFuaW1hdGlvblNjcm9sbFhPZmZzZXQsIHV2QW5pbWF0aW9uU2Nyb2xsWU9mZnNldCApICogdXZBbmltTWFzaztcbiAgI2VuZGlmXG5cbiAgI2lmZGVmIERFQlVHX1VWXG4gICAgZ2xfRnJhZ0NvbG9yID0gdmVjNCggMC4wLCAwLjAsIDAuMCwgMS4wICk7XG4gICAgI2lmICggZGVmaW5lZCggTVRPT05fVVNFX1VWICkgJiYgIWRlZmluZWQoIE1UT09OX1VWU19WRVJURVhfT05MWSApIClcbiAgICAgIGdsX0ZyYWdDb2xvciA9IHZlYzQoIHV2LCAwLjAsIDEuMCApO1xuICAgICNlbmRpZlxuICAgIHJldHVybjtcbiAgI2VuZGlmXG5cbiAgdmVjNCBkaWZmdXNlQ29sb3IgPSB2ZWM0KCBsaXRGYWN0b3IsIG9wYWNpdHkgKTtcbiAgUmVmbGVjdGVkTGlnaHQgcmVmbGVjdGVkTGlnaHQgPSBSZWZsZWN0ZWRMaWdodCggdmVjMyggMC4wICksIHZlYzMoIDAuMCApLCB2ZWMzKCAwLjAgKSwgdmVjMyggMC4wICkgKTtcbiAgdmVjMyB0b3RhbEVtaXNzaXZlUmFkaWFuY2UgPSBlbWlzc2l2ZSAqIGVtaXNzaXZlSW50ZW5zaXR5O1xuXG4gICNpbmNsdWRlIDxsb2dkZXB0aGJ1Zl9mcmFnbWVudD5cblxuICAvLyAjaW5jbHVkZSA8bWFwX2ZyYWdtZW50PlxuICAjaWZkZWYgVVNFX01BUFxuICAgIHZlYzIgbWFwVXYgPSAoIG1hcFV2VHJhbnNmb3JtICogdmVjMyggdXYsIDEgKSApLnh5O1xuICAgIHZlYzQgc2FtcGxlZERpZmZ1c2VDb2xvciA9IHRleHR1cmUyRCggbWFwLCBtYXBVdiApO1xuICAgICNpZmRlZiBERUNPREVfVklERU9fVEVYVFVSRVxuICAgICAgc2FtcGxlZERpZmZ1c2VDb2xvciA9IHZlYzQoIG1peCggcG93KCBzYW1wbGVkRGlmZnVzZUNvbG9yLnJnYiAqIDAuOTQ3ODY3Mjk4NiArIHZlYzMoIDAuMDUyMTMyNzAxNCApLCB2ZWMzKCAyLjQgKSApLCBzYW1wbGVkRGlmZnVzZUNvbG9yLnJnYiAqIDAuMDc3Mzk5MzgwOCwgdmVjMyggbGVzc1RoYW5FcXVhbCggc2FtcGxlZERpZmZ1c2VDb2xvci5yZ2IsIHZlYzMoIDAuMDQwNDUgKSApICkgKSwgc2FtcGxlZERpZmZ1c2VDb2xvci53ICk7XG4gICAgI2VuZGlmXG4gICAgZGlmZnVzZUNvbG9yICo9IHNhbXBsZWREaWZmdXNlQ29sb3I7XG4gICNlbmRpZlxuXG4gIC8vICNpbmNsdWRlIDxjb2xvcl9mcmFnbWVudD5cbiAgI2lmICggZGVmaW5lZCggVVNFX0NPTE9SICkgJiYgIWRlZmluZWQoIElHTk9SRV9WRVJURVhfQ09MT1IgKSApXG4gICAgZGlmZnVzZUNvbG9yLnJnYiAqPSB2Q29sb3I7XG4gICNlbmRpZlxuXG4gIC8vICNpbmNsdWRlIDxhbHBoYW1hcF9mcmFnbWVudD5cblxuICAjaW5jbHVkZSA8YWxwaGF0ZXN0X2ZyYWdtZW50PlxuXG4gIC8vICNpbmNsdWRlIDxzcGVjdWxhcm1hcF9mcmFnbWVudD5cblxuICAvLyAjaW5jbHVkZSA8bm9ybWFsX2ZyYWdtZW50X2JlZ2luPlxuICBmbG9hdCBmYWNlRGlyZWN0aW9uID0gZ2xfRnJvbnRGYWNpbmcgPyAxLjAgOiAtMS4wO1xuXG4gICNpZmRlZiBGTEFUX1NIQURFRFxuXG4gICAgdmVjMyBmZHggPSBkRmR4KCB2Vmlld1Bvc2l0aW9uICk7XG4gICAgdmVjMyBmZHkgPSBkRmR5KCB2Vmlld1Bvc2l0aW9uICk7XG4gICAgdmVjMyBub3JtYWwgPSBub3JtYWxpemUoIGNyb3NzKCBmZHgsIGZkeSApICk7XG5cbiAgI2Vsc2VcblxuICAgIHZlYzMgbm9ybWFsID0gbm9ybWFsaXplKCB2Tm9ybWFsICk7XG5cbiAgICAjaWZkZWYgRE9VQkxFX1NJREVEXG5cbiAgICAgIG5vcm1hbCAqPSBmYWNlRGlyZWN0aW9uO1xuXG4gICAgI2VuZGlmXG5cbiAgI2VuZGlmXG5cbiAgI2lmZGVmIFVTRV9OT1JNQUxNQVBcblxuICAgIHZlYzIgbm9ybWFsTWFwVXYgPSAoIG5vcm1hbE1hcFV2VHJhbnNmb3JtICogdmVjMyggdXYsIDEgKSApLnh5O1xuXG4gICNlbmRpZlxuXG4gICNpZmRlZiBVU0VfTk9STUFMTUFQX1RBTkdFTlRTUEFDRVxuXG4gICAgI2lmZGVmIFVTRV9UQU5HRU5UXG5cbiAgICAgIG1hdDMgdGJuID0gbWF0Myggbm9ybWFsaXplKCB2VGFuZ2VudCApLCBub3JtYWxpemUoIHZCaXRhbmdlbnQgKSwgbm9ybWFsICk7XG5cbiAgICAjZWxzZVxuXG4gICAgICBtYXQzIHRibiA9IGdldFRhbmdlbnRGcmFtZSggLSB2Vmlld1Bvc2l0aW9uLCBub3JtYWwsIG5vcm1hbE1hcFV2ICk7XG5cbiAgICAjZW5kaWZcblxuICAgICNpZiBkZWZpbmVkKCBET1VCTEVfU0lERUQgKSAmJiAhIGRlZmluZWQoIEZMQVRfU0hBREVEIClcblxuICAgICAgdGJuWzBdICo9IGZhY2VEaXJlY3Rpb247XG4gICAgICB0Ym5bMV0gKj0gZmFjZURpcmVjdGlvbjtcblxuICAgICNlbmRpZlxuXG4gICNlbmRpZlxuXG4gICNpZmRlZiBVU0VfQ0xFQVJDT0FUX05PUk1BTE1BUFxuXG4gICAgI2lmZGVmIFVTRV9UQU5HRU5UXG5cbiAgICAgIG1hdDMgdGJuMiA9IG1hdDMoIG5vcm1hbGl6ZSggdlRhbmdlbnQgKSwgbm9ybWFsaXplKCB2Qml0YW5nZW50ICksIG5vcm1hbCApO1xuXG4gICAgI2Vsc2VcblxuICAgICAgbWF0MyB0Ym4yID0gZ2V0VGFuZ2VudEZyYW1lKCAtIHZWaWV3UG9zaXRpb24sIG5vcm1hbCwgdkNsZWFyY29hdE5vcm1hbE1hcFV2ICk7XG5cbiAgICAjZW5kaWZcblxuICAgICNpZiBkZWZpbmVkKCBET1VCTEVfU0lERUQgKSAmJiAhIGRlZmluZWQoIEZMQVRfU0hBREVEIClcblxuICAgICAgdGJuMlswXSAqPSBmYWNlRGlyZWN0aW9uO1xuICAgICAgdGJuMlsxXSAqPSBmYWNlRGlyZWN0aW9uO1xuXG4gICAgI2VuZGlmXG5cbiAgI2VuZGlmXG5cbiAgLy8gbm9uIHBlcnR1cmJlZCBub3JtYWwgZm9yIGNsZWFyY29hdCBhbW9uZyBvdGhlcnNcblxuICB2ZWMzIG5vblBlcnR1cmJlZE5vcm1hbCA9IG5vcm1hbDtcblxuICAjaWZkZWYgT1VUTElORVxuICAgIG5vcm1hbCAqPSAtMS4wO1xuICAjZW5kaWZcblxuICAvLyAjaW5jbHVkZSA8bm9ybWFsX2ZyYWdtZW50X21hcHM+XG5cbiAgLy8gQ09NUEFUOiBwcmUtcjE1MVxuICAvLyBVU0VfTk9STUFMTUFQX09CSkVDVFNQQUNFIHVzZWQgdG8gYmUgT0JKRUNUU1BBQ0VfTk9STUFMTUFQIGluIHByZS1yMTUxXG4gICNpZiBkZWZpbmVkKCBVU0VfTk9STUFMTUFQX09CSkVDVFNQQUNFICkgfHwgZGVmaW5lZCggT0JKRUNUU1BBQ0VfTk9STUFMTUFQIClcblxuICAgIG5vcm1hbCA9IHRleHR1cmUyRCggbm9ybWFsTWFwLCBub3JtYWxNYXBVdiApLnh5eiAqIDIuMCAtIDEuMDsgLy8gb3ZlcnJpZGVzIGJvdGggZmxhdFNoYWRpbmcgYW5kIGF0dHJpYnV0ZSBub3JtYWxzXG5cbiAgICAjaWZkZWYgRkxJUF9TSURFRFxuXG4gICAgICBub3JtYWwgPSAtIG5vcm1hbDtcblxuICAgICNlbmRpZlxuXG4gICAgI2lmZGVmIERPVUJMRV9TSURFRFxuXG4gICAgICBub3JtYWwgPSBub3JtYWwgKiBmYWNlRGlyZWN0aW9uO1xuXG4gICAgI2VuZGlmXG5cbiAgICBub3JtYWwgPSBub3JtYWxpemUoIG5vcm1hbE1hdHJpeCAqIG5vcm1hbCApO1xuXG4gIC8vIENPTVBBVDogcHJlLXIxNTFcbiAgLy8gVVNFX05PUk1BTE1BUF9UQU5HRU5UU1BBQ0UgdXNlZCB0byBiZSBUQU5HRU5UU1BBQ0VfTk9STUFMTUFQIGluIHByZS1yMTUxXG4gICNlbGlmIGRlZmluZWQoIFVTRV9OT1JNQUxNQVBfVEFOR0VOVFNQQUNFICkgfHwgZGVmaW5lZCggVEFOR0VOVFNQQUNFX05PUk1BTE1BUCApXG5cbiAgICB2ZWMzIG1hcE4gPSB0ZXh0dXJlMkQoIG5vcm1hbE1hcCwgbm9ybWFsTWFwVXYgKS54eXogKiAyLjAgLSAxLjA7XG4gICAgbWFwTi54eSAqPSBub3JtYWxTY2FsZTtcblxuICAgIC8vIENPTVBBVDogcHJlLXIxNTFcbiAgICAjaWYgVEhSRUVfVlJNX1RIUkVFX1JFVklTSU9OID49IDE1MSB8fCBkZWZpbmVkKCBVU0VfVEFOR0VOVCApXG5cbiAgICAgIG5vcm1hbCA9IG5vcm1hbGl6ZSggdGJuICogbWFwTiApO1xuXG4gICAgI2Vsc2VcblxuICAgICAgbm9ybWFsID0gcGVydHVyYk5vcm1hbDJBcmIoIHV2LCAtdlZpZXdQb3NpdGlvbiwgbm9ybWFsLCBtYXBOLCBmYWNlRGlyZWN0aW9uICk7XG5cbiAgICAjZW5kaWZcblxuICAjZW5kaWZcblxuICAvLyAjaW5jbHVkZSA8ZW1pc3NpdmVtYXBfZnJhZ21lbnQ+XG4gICNpZmRlZiBVU0VfRU1JU1NJVkVNQVBcbiAgICB2ZWMyIGVtaXNzaXZlTWFwVXYgPSAoIGVtaXNzaXZlTWFwVXZUcmFuc2Zvcm0gKiB2ZWMzKCB1diwgMSApICkueHk7XG4gICAgdG90YWxFbWlzc2l2ZVJhZGlhbmNlICo9IHRleHR1cmUyRCggZW1pc3NpdmVNYXAsIGVtaXNzaXZlTWFwVXYgKS5yZ2I7XG4gICNlbmRpZlxuXG4gICNpZmRlZiBERUJVR19OT1JNQUxcbiAgICBnbF9GcmFnQ29sb3IgPSB2ZWM0KCAwLjUgKyAwLjUgKiBub3JtYWwsIDEuMCApO1xuICAgIHJldHVybjtcbiAgI2VuZGlmXG5cbiAgLy8gLS0gTVRvb246IGxpZ2h0aW5nIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIGFjY3VtdWxhdGlvblxuICAvLyAjaW5jbHVkZSA8bGlnaHRzX3Bob25nX2ZyYWdtZW50PlxuICBNVG9vbk1hdGVyaWFsIG1hdGVyaWFsO1xuXG4gIG1hdGVyaWFsLmRpZmZ1c2VDb2xvciA9IGRpZmZ1c2VDb2xvci5yZ2I7XG5cbiAgbWF0ZXJpYWwuc2hhZGVDb2xvciA9IHNoYWRlQ29sb3JGYWN0b3I7XG4gICNpZmRlZiBVU0VfU0hBREVNVUxUSVBMWVRFWFRVUkVcbiAgICB2ZWMyIHNoYWRlTXVsdGlwbHlUZXh0dXJlVXYgPSAoIHNoYWRlTXVsdGlwbHlUZXh0dXJlVXZUcmFuc2Zvcm0gKiB2ZWMzKCB1diwgMSApICkueHk7XG4gICAgbWF0ZXJpYWwuc2hhZGVDb2xvciAqPSB0ZXh0dXJlMkQoIHNoYWRlTXVsdGlwbHlUZXh0dXJlLCBzaGFkZU11bHRpcGx5VGV4dHVyZVV2ICkucmdiO1xuICAjZW5kaWZcblxuICAjaWYgKCBkZWZpbmVkKCBVU0VfQ09MT1IgKSAmJiAhZGVmaW5lZCggSUdOT1JFX1ZFUlRFWF9DT0xPUiApIClcbiAgICBtYXRlcmlhbC5zaGFkZUNvbG9yLnJnYiAqPSB2Q29sb3I7XG4gICNlbmRpZlxuXG4gIG1hdGVyaWFsLnNoYWRpbmdTaGlmdCA9IHNoYWRpbmdTaGlmdEZhY3RvcjtcbiAgI2lmZGVmIFVTRV9TSEFESU5HU0hJRlRURVhUVVJFXG4gICAgdmVjMiBzaGFkaW5nU2hpZnRUZXh0dXJlVXYgPSAoIHNoYWRpbmdTaGlmdFRleHR1cmVVdlRyYW5zZm9ybSAqIHZlYzMoIHV2LCAxICkgKS54eTtcbiAgICBtYXRlcmlhbC5zaGFkaW5nU2hpZnQgKz0gdGV4dHVyZTJEKCBzaGFkaW5nU2hpZnRUZXh0dXJlLCBzaGFkaW5nU2hpZnRUZXh0dXJlVXYgKS5yICogc2hhZGluZ1NoaWZ0VGV4dHVyZVNjYWxlO1xuICAjZW5kaWZcblxuICAvLyAjaW5jbHVkZSA8bGlnaHRzX2ZyYWdtZW50X2JlZ2luPlxuXG4gIC8vIE1Ub29uIFNwZWNpZmljIGNoYW5nZXM6XG4gIC8vIFNpbmNlIHdlIHdhbnQgdG8gdGFrZSBzaGFkb3dzIGludG8gYWNjb3VudCBvZiBzaGFkaW5nIGluc3RlYWQgb2YgaXJyYWRpYW5jZSxcbiAgLy8gd2UgaGFkIHRvIG1vZGlmeSB0aGUgY29kZXMgdGhhdCBtdWx0aXBsaWVzIHRoZSByZXN1bHRzIG9mIHNoYWRvd21hcCBpbnRvIGNvbG9yIG9mIGRpcmVjdCBsaWdodHMuXG5cbiAgLy8gQ09NUEFUOiBwcmUtcjE1NiB1c2VzIGEgc3RydWN0IEdlb21ldHJpY0NvbnRleHRcbiAgI2lmIFRIUkVFX1ZSTV9USFJFRV9SRVZJU0lPTiA+PSAxNTdcbiAgICB2ZWMzIGdlb21ldHJ5UG9zaXRpb24gPSAtIHZWaWV3UG9zaXRpb247XG4gICAgdmVjMyBnZW9tZXRyeU5vcm1hbCA9IG5vcm1hbDtcbiAgICB2ZWMzIGdlb21ldHJ5Vmlld0RpciA9ICggaXNPcnRob2dyYXBoaWMgKSA/IHZlYzMoIDAsIDAsIDEgKSA6IG5vcm1hbGl6ZSggdlZpZXdQb3NpdGlvbiApO1xuXG4gICAgdmVjMyBnZW9tZXRyeUNsZWFyY29hdE5vcm1hbDtcblxuICAgICNpZmRlZiBVU0VfQ0xFQVJDT0FUXG5cbiAgICAgIGdlb21ldHJ5Q2xlYXJjb2F0Tm9ybWFsID0gY2xlYXJjb2F0Tm9ybWFsO1xuXG4gICAgI2VuZGlmXG4gICNlbHNlXG4gICAgR2VvbWV0cmljQ29udGV4dCBnZW9tZXRyeTtcblxuICAgIGdlb21ldHJ5LnBvc2l0aW9uID0gLSB2Vmlld1Bvc2l0aW9uO1xuICAgIGdlb21ldHJ5Lm5vcm1hbCA9IG5vcm1hbDtcbiAgICBnZW9tZXRyeS52aWV3RGlyID0gKCBpc09ydGhvZ3JhcGhpYyApID8gdmVjMyggMCwgMCwgMSApIDogbm9ybWFsaXplKCB2Vmlld1Bvc2l0aW9uICk7XG5cbiAgICAjaWZkZWYgVVNFX0NMRUFSQ09BVFxuXG4gICAgICBnZW9tZXRyeS5jbGVhcmNvYXROb3JtYWwgPSBjbGVhcmNvYXROb3JtYWw7XG5cbiAgICAjZW5kaWZcbiAgI2VuZGlmXG5cbiAgSW5jaWRlbnRMaWdodCBkaXJlY3RMaWdodDtcblxuICAvLyBzaW5jZSB0aGVzZSB2YXJpYWJsZXMgd2lsbCBiZSB1c2VkIGluIHVucm9sbGVkIGxvb3AsIHdlIGhhdmUgdG8gZGVmaW5lIGluIHByaW9yXG4gIGZsb2F0IHNoYWRvdztcblxuICAjaWYgKCBOVU1fUE9JTlRfTElHSFRTID4gMCApICYmIGRlZmluZWQoIFJFX0RpcmVjdCApXG5cbiAgICBQb2ludExpZ2h0IHBvaW50TGlnaHQ7XG4gICAgI2lmIGRlZmluZWQoIFVTRV9TSEFET1dNQVAgKSAmJiBOVU1fUE9JTlRfTElHSFRfU0hBRE9XUyA+IDBcbiAgICBQb2ludExpZ2h0U2hhZG93IHBvaW50TGlnaHRTaGFkb3c7XG4gICAgI2VuZGlmXG5cbiAgICAjcHJhZ21hIHVucm9sbF9sb29wX3N0YXJ0XG4gICAgZm9yICggaW50IGkgPSAwOyBpIDwgTlVNX1BPSU5UX0xJR0hUUzsgaSArKyApIHtcblxuICAgICAgcG9pbnRMaWdodCA9IHBvaW50TGlnaHRzWyBpIF07XG5cbiAgICAgIC8vIENPTVBBVDogcHJlLXIxNTYgdXNlcyBhIHN0cnVjdCBHZW9tZXRyaWNDb250ZXh0XG4gICAgICAjaWYgVEhSRUVfVlJNX1RIUkVFX1JFVklTSU9OID49IDE1N1xuICAgICAgICBnZXRQb2ludExpZ2h0SW5mbyggcG9pbnRMaWdodCwgZ2VvbWV0cnlQb3NpdGlvbiwgZGlyZWN0TGlnaHQgKTtcbiAgICAgICNlbHNlXG4gICAgICAgIGdldFBvaW50TGlnaHRJbmZvKCBwb2ludExpZ2h0LCBnZW9tZXRyeSwgZGlyZWN0TGlnaHQgKTtcbiAgICAgICNlbmRpZlxuXG4gICAgICBzaGFkb3cgPSAxLjA7XG4gICAgICAjaWYgZGVmaW5lZCggVVNFX1NIQURPV01BUCApICYmICggVU5ST0xMRURfTE9PUF9JTkRFWCA8IE5VTV9QT0lOVF9MSUdIVF9TSEFET1dTIClcbiAgICAgIHBvaW50TGlnaHRTaGFkb3cgPSBwb2ludExpZ2h0U2hhZG93c1sgaSBdO1xuICAgICAgLy8gQ09NUEFUOiBwcmUtcjE2NlxuICAgICAgLy8gcjE2NiBpbnRyb2R1Y2VkIHNoYWRvd0ludGVuc2l0eVxuICAgICAgI2lmIFRIUkVFX1ZSTV9USFJFRV9SRVZJU0lPTiA+PSAxNjZcbiAgICAgICAgc2hhZG93ID0gYWxsKCBidmVjMiggZGlyZWN0TGlnaHQudmlzaWJsZSwgcmVjZWl2ZVNoYWRvdyApICkgPyBnZXRQb2ludFNoYWRvdyggcG9pbnRTaGFkb3dNYXBbIGkgXSwgcG9pbnRMaWdodFNoYWRvdy5zaGFkb3dNYXBTaXplLCBwb2ludExpZ2h0U2hhZG93LnNoYWRvd0ludGVuc2l0eSwgcG9pbnRMaWdodFNoYWRvdy5zaGFkb3dCaWFzLCBwb2ludExpZ2h0U2hhZG93LnNoYWRvd1JhZGl1cywgdlBvaW50U2hhZG93Q29vcmRbIGkgXSwgcG9pbnRMaWdodFNoYWRvdy5zaGFkb3dDYW1lcmFOZWFyLCBwb2ludExpZ2h0U2hhZG93LnNoYWRvd0NhbWVyYUZhciApIDogMS4wO1xuICAgICAgI2Vsc2VcbiAgICAgICAgc2hhZG93ID0gYWxsKCBidmVjMiggZGlyZWN0TGlnaHQudmlzaWJsZSwgcmVjZWl2ZVNoYWRvdyApICkgPyBnZXRQb2ludFNoYWRvdyggcG9pbnRTaGFkb3dNYXBbIGkgXSwgcG9pbnRMaWdodFNoYWRvdy5zaGFkb3dNYXBTaXplLCBwb2ludExpZ2h0U2hhZG93LnNoYWRvd0JpYXMsIHBvaW50TGlnaHRTaGFkb3cuc2hhZG93UmFkaXVzLCB2UG9pbnRTaGFkb3dDb29yZFsgaSBdLCBwb2ludExpZ2h0U2hhZG93LnNoYWRvd0NhbWVyYU5lYXIsIHBvaW50TGlnaHRTaGFkb3cuc2hhZG93Q2FtZXJhRmFyICkgOiAxLjA7XG4gICAgICAjZW5kaWZcbiAgICAgICNlbmRpZlxuXG4gICAgICAvLyBDT01QQVQ6IHByZS1yMTU2IHVzZXMgYSBzdHJ1Y3QgR2VvbWV0cmljQ29udGV4dFxuICAgICAgI2lmIFRIUkVFX1ZSTV9USFJFRV9SRVZJU0lPTiA+PSAxNTdcbiAgICAgICAgUkVfRGlyZWN0KCBkaXJlY3RMaWdodCwgZ2VvbWV0cnlQb3NpdGlvbiwgZ2VvbWV0cnlOb3JtYWwsIGdlb21ldHJ5Vmlld0RpciwgZ2VvbWV0cnlDbGVhcmNvYXROb3JtYWwsIG1hdGVyaWFsLCBzaGFkb3csIHJlZmxlY3RlZExpZ2h0ICk7XG4gICAgICAjZWxzZVxuICAgICAgICBSRV9EaXJlY3QoIGRpcmVjdExpZ2h0LCBnZW9tZXRyeSwgbWF0ZXJpYWwsIHNoYWRvdywgcmVmbGVjdGVkTGlnaHQgKTtcbiAgICAgICNlbmRpZlxuXG4gICAgfVxuICAgICNwcmFnbWEgdW5yb2xsX2xvb3BfZW5kXG5cbiAgI2VuZGlmXG5cbiAgI2lmICggTlVNX1NQT1RfTElHSFRTID4gMCApICYmIGRlZmluZWQoIFJFX0RpcmVjdCApXG5cbiAgICBTcG90TGlnaHQgc3BvdExpZ2h0O1xuICAgIC8vIENPTVBBVDogcHJlLXIxNDQgdXNlcyBOVU1fU1BPVF9MSUdIVF9TSEFET1dTLCByMTQ0KyB1c2VzIE5VTV9TUE9UX0xJR0hUX0NPT1JEU1xuICAgICNpZiBUSFJFRV9WUk1fVEhSRUVfUkVWSVNJT04gPj0gMTQ0XG4gICAgICAjaWYgZGVmaW5lZCggVVNFX1NIQURPV01BUCApICYmIE5VTV9TUE9UX0xJR0hUX0NPT1JEUyA+IDBcbiAgICAgIFNwb3RMaWdodFNoYWRvdyBzcG90TGlnaHRTaGFkb3c7XG4gICAgICAjZW5kaWZcbiAgICAjZWxpZiBkZWZpbmVkKCBVU0VfU0hBRE9XTUFQICkgJiYgTlVNX1NQT1RfTElHSFRfU0hBRE9XUyA+IDBcbiAgICBTcG90TGlnaHRTaGFkb3cgc3BvdExpZ2h0U2hhZG93O1xuICAgICNlbmRpZlxuXG4gICAgI3ByYWdtYSB1bnJvbGxfbG9vcF9zdGFydFxuICAgIGZvciAoIGludCBpID0gMDsgaSA8IE5VTV9TUE9UX0xJR0hUUzsgaSArKyApIHtcblxuICAgICAgc3BvdExpZ2h0ID0gc3BvdExpZ2h0c1sgaSBdO1xuXG4gICAgICAvLyBDT01QQVQ6IHByZS1yMTU2IHVzZXMgYSBzdHJ1Y3QgR2VvbWV0cmljQ29udGV4dFxuICAgICAgI2lmIFRIUkVFX1ZSTV9USFJFRV9SRVZJU0lPTiA+PSAxNTdcbiAgICAgICAgZ2V0U3BvdExpZ2h0SW5mbyggc3BvdExpZ2h0LCBnZW9tZXRyeVBvc2l0aW9uLCBkaXJlY3RMaWdodCApO1xuICAgICAgI2Vsc2VcbiAgICAgICAgZ2V0U3BvdExpZ2h0SW5mbyggc3BvdExpZ2h0LCBnZW9tZXRyeSwgZGlyZWN0TGlnaHQgKTtcbiAgICAgICNlbmRpZlxuXG4gICAgICBzaGFkb3cgPSAxLjA7XG4gICAgICAvLyBDT01QQVQ6IHByZS1yMTQ0IHVzZXMgTlVNX1NQT1RfTElHSFRfU0hBRE9XUyBhbmQgdlNwb3RTaGFkb3dDb29yZCwgcjE0NCsgdXNlcyBOVU1fU1BPVF9MSUdIVF9DT09SRFMgYW5kIHZTcG90TGlnaHRDb29yZFxuICAgICAgLy8gQ09NUEFUOiBwcmUtcjE2NiBkb2VzIG5vdCBoYXZlIHNoYWRvd0ludGVuc2l0eSwgcjE2NisgaGFzIHNoYWRvd0ludGVuc2l0eVxuICAgICAgI2lmIFRIUkVFX1ZSTV9USFJFRV9SRVZJU0lPTiA+PSAxNjZcbiAgICAgICAgI2lmIGRlZmluZWQoIFVTRV9TSEFET1dNQVAgKSAmJiAoIFVOUk9MTEVEX0xPT1BfSU5ERVggPCBOVU1fU1BPVF9MSUdIVF9DT09SRFMgKVxuICAgICAgICBzcG90TGlnaHRTaGFkb3cgPSBzcG90TGlnaHRTaGFkb3dzWyBpIF07XG4gICAgICAgIHNoYWRvdyA9IGFsbCggYnZlYzIoIGRpcmVjdExpZ2h0LnZpc2libGUsIHJlY2VpdmVTaGFkb3cgKSApID8gZ2V0U2hhZG93KCBzcG90U2hhZG93TWFwWyBpIF0sIHNwb3RMaWdodFNoYWRvdy5zaGFkb3dNYXBTaXplLCBzcG90TGlnaHRTaGFkb3cuc2hhZG93SW50ZW5zaXR5LCBzcG90TGlnaHRTaGFkb3cuc2hhZG93Qmlhcywgc3BvdExpZ2h0U2hhZG93LnNoYWRvd1JhZGl1cywgdlNwb3RMaWdodENvb3JkWyBpIF0gKSA6IDEuMDtcbiAgICAgICAgI2VuZGlmXG4gICAgICAjZWxpZiBUSFJFRV9WUk1fVEhSRUVfUkVWSVNJT04gPj0gMTQ0XG4gICAgICAgICNpZiBkZWZpbmVkKCBVU0VfU0hBRE9XTUFQICkgJiYgKCBVTlJPTExFRF9MT09QX0lOREVYIDwgTlVNX1NQT1RfTElHSFRfQ09PUkRTIClcbiAgICAgICAgc3BvdExpZ2h0U2hhZG93ID0gc3BvdExpZ2h0U2hhZG93c1sgaSBdO1xuICAgICAgICBzaGFkb3cgPSBhbGwoIGJ2ZWMyKCBkaXJlY3RMaWdodC52aXNpYmxlLCByZWNlaXZlU2hhZG93ICkgKSA/IGdldFNoYWRvdyggc3BvdFNoYWRvd01hcFsgaSBdLCBzcG90TGlnaHRTaGFkb3cuc2hhZG93TWFwU2l6ZSwgc3BvdExpZ2h0U2hhZG93LnNoYWRvd0JpYXMsIHNwb3RMaWdodFNoYWRvdy5zaGFkb3dSYWRpdXMsIHZTcG90TGlnaHRDb29yZFsgaSBdICkgOiAxLjA7XG4gICAgICAgICNlbmRpZlxuICAgICAgI2VsaWYgZGVmaW5lZCggVVNFX1NIQURPV01BUCApICYmICggVU5ST0xMRURfTE9PUF9JTkRFWCA8IE5VTV9TUE9UX0xJR0hUX1NIQURPV1MgKVxuICAgICAgc3BvdExpZ2h0U2hhZG93ID0gc3BvdExpZ2h0U2hhZG93c1sgaSBdO1xuICAgICAgc2hhZG93ID0gYWxsKCBidmVjMiggZGlyZWN0TGlnaHQudmlzaWJsZSwgcmVjZWl2ZVNoYWRvdyApICkgPyBnZXRTaGFkb3coIHNwb3RTaGFkb3dNYXBbIGkgXSwgc3BvdExpZ2h0U2hhZG93LnNoYWRvd01hcFNpemUsIHNwb3RMaWdodFNoYWRvdy5zaGFkb3dCaWFzLCBzcG90TGlnaHRTaGFkb3cuc2hhZG93UmFkaXVzLCB2U3BvdFNoYWRvd0Nvb3JkWyBpIF0gKSA6IDEuMDtcbiAgICAgICNlbmRpZlxuXG4gICAgICAvLyBDT01QQVQ6IHByZS1yMTU2IHVzZXMgYSBzdHJ1Y3QgR2VvbWV0cmljQ29udGV4dFxuICAgICAgI2lmIFRIUkVFX1ZSTV9USFJFRV9SRVZJU0lPTiA+PSAxNTdcbiAgICAgICAgUkVfRGlyZWN0KCBkaXJlY3RMaWdodCwgZ2VvbWV0cnlQb3NpdGlvbiwgZ2VvbWV0cnlOb3JtYWwsIGdlb21ldHJ5Vmlld0RpciwgZ2VvbWV0cnlDbGVhcmNvYXROb3JtYWwsIG1hdGVyaWFsLCBzaGFkb3csIHJlZmxlY3RlZExpZ2h0ICk7XG4gICAgICAjZWxzZVxuICAgICAgICBSRV9EaXJlY3QoIGRpcmVjdExpZ2h0LCBnZW9tZXRyeSwgbWF0ZXJpYWwsIHNoYWRvdywgcmVmbGVjdGVkTGlnaHQgKTtcbiAgICAgICNlbmRpZlxuXG4gICAgfVxuICAgICNwcmFnbWEgdW5yb2xsX2xvb3BfZW5kXG5cbiAgI2VuZGlmXG5cbiAgI2lmICggTlVNX0RJUl9MSUdIVFMgPiAwICkgJiYgZGVmaW5lZCggUkVfRGlyZWN0IClcblxuICAgIERpcmVjdGlvbmFsTGlnaHQgZGlyZWN0aW9uYWxMaWdodDtcbiAgICAjaWYgZGVmaW5lZCggVVNFX1NIQURPV01BUCApICYmIE5VTV9ESVJfTElHSFRfU0hBRE9XUyA+IDBcbiAgICBEaXJlY3Rpb25hbExpZ2h0U2hhZG93IGRpcmVjdGlvbmFsTGlnaHRTaGFkb3c7XG4gICAgI2VuZGlmXG5cbiAgICAjcHJhZ21hIHVucm9sbF9sb29wX3N0YXJ0XG4gICAgZm9yICggaW50IGkgPSAwOyBpIDwgTlVNX0RJUl9MSUdIVFM7IGkgKysgKSB7XG5cbiAgICAgIGRpcmVjdGlvbmFsTGlnaHQgPSBkaXJlY3Rpb25hbExpZ2h0c1sgaSBdO1xuXG4gICAgICAvLyBDT01QQVQ6IHByZS1yMTU2IHVzZXMgYSBzdHJ1Y3QgR2VvbWV0cmljQ29udGV4dFxuICAgICAgI2lmIFRIUkVFX1ZSTV9USFJFRV9SRVZJU0lPTiA+PSAxNTdcbiAgICAgICAgZ2V0RGlyZWN0aW9uYWxMaWdodEluZm8oIGRpcmVjdGlvbmFsTGlnaHQsIGRpcmVjdExpZ2h0ICk7XG4gICAgICAjZWxzZVxuICAgICAgICBnZXREaXJlY3Rpb25hbExpZ2h0SW5mbyggZGlyZWN0aW9uYWxMaWdodCwgZ2VvbWV0cnksIGRpcmVjdExpZ2h0ICk7XG4gICAgICAjZW5kaWZcblxuICAgICAgc2hhZG93ID0gMS4wO1xuICAgICAgI2lmIGRlZmluZWQoIFVTRV9TSEFET1dNQVAgKSAmJiAoIFVOUk9MTEVEX0xPT1BfSU5ERVggPCBOVU1fRElSX0xJR0hUX1NIQURPV1MgKVxuICAgICAgZGlyZWN0aW9uYWxMaWdodFNoYWRvdyA9IGRpcmVjdGlvbmFsTGlnaHRTaGFkb3dzWyBpIF07XG4gICAgICAvLyBDT01QQVQ6IHByZS1yMTY2XG4gICAgICAvLyByMTY2IGludHJvZHVjZWQgc2hhZG93SW50ZW5zaXR5XG4gICAgICAjaWYgVEhSRUVfVlJNX1RIUkVFX1JFVklTSU9OID49IDE2NlxuICAgICAgICBzaGFkb3cgPSBhbGwoIGJ2ZWMyKCBkaXJlY3RMaWdodC52aXNpYmxlLCByZWNlaXZlU2hhZG93ICkgKSA/IGdldFNoYWRvdyggZGlyZWN0aW9uYWxTaGFkb3dNYXBbIGkgXSwgZGlyZWN0aW9uYWxMaWdodFNoYWRvdy5zaGFkb3dNYXBTaXplLCBkaXJlY3Rpb25hbExpZ2h0U2hhZG93LnNoYWRvd0ludGVuc2l0eSwgZGlyZWN0aW9uYWxMaWdodFNoYWRvdy5zaGFkb3dCaWFzLCBkaXJlY3Rpb25hbExpZ2h0U2hhZG93LnNoYWRvd1JhZGl1cywgdkRpcmVjdGlvbmFsU2hhZG93Q29vcmRbIGkgXSApIDogMS4wO1xuICAgICAgI2Vsc2VcbiAgICAgICAgc2hhZG93ID0gYWxsKCBidmVjMiggZGlyZWN0TGlnaHQudmlzaWJsZSwgcmVjZWl2ZVNoYWRvdyApICkgPyBnZXRTaGFkb3coIGRpcmVjdGlvbmFsU2hhZG93TWFwWyBpIF0sIGRpcmVjdGlvbmFsTGlnaHRTaGFkb3cuc2hhZG93TWFwU2l6ZSwgZGlyZWN0aW9uYWxMaWdodFNoYWRvdy5zaGFkb3dCaWFzLCBkaXJlY3Rpb25hbExpZ2h0U2hhZG93LnNoYWRvd1JhZGl1cywgdkRpcmVjdGlvbmFsU2hhZG93Q29vcmRbIGkgXSApIDogMS4wO1xuICAgICAgI2VuZGlmXG4gICAgICAjZW5kaWZcblxuICAgICAgLy8gQ09NUEFUOiBwcmUtcjE1NiB1c2VzIGEgc3RydWN0IEdlb21ldHJpY0NvbnRleHRcbiAgICAgICNpZiBUSFJFRV9WUk1fVEhSRUVfUkVWSVNJT04gPj0gMTU3XG4gICAgICAgIFJFX0RpcmVjdCggZGlyZWN0TGlnaHQsIGdlb21ldHJ5UG9zaXRpb24sIGdlb21ldHJ5Tm9ybWFsLCBnZW9tZXRyeVZpZXdEaXIsIGdlb21ldHJ5Q2xlYXJjb2F0Tm9ybWFsLCBtYXRlcmlhbCwgc2hhZG93LCByZWZsZWN0ZWRMaWdodCApO1xuICAgICAgI2Vsc2VcbiAgICAgICAgUkVfRGlyZWN0KCBkaXJlY3RMaWdodCwgZ2VvbWV0cnksIG1hdGVyaWFsLCBzaGFkb3csIHJlZmxlY3RlZExpZ2h0ICk7XG4gICAgICAjZW5kaWZcblxuICAgIH1cbiAgICAjcHJhZ21hIHVucm9sbF9sb29wX2VuZFxuXG4gICNlbmRpZlxuXG4gIC8vICNpZiAoIE5VTV9SRUNUX0FSRUFfTElHSFRTID4gMCApICYmIGRlZmluZWQoIFJFX0RpcmVjdF9SZWN0QXJlYSApXG5cbiAgLy8gICBSZWN0QXJlYUxpZ2h0IHJlY3RBcmVhTGlnaHQ7XG5cbiAgLy8gICAjcHJhZ21hIHVucm9sbF9sb29wX3N0YXJ0XG4gIC8vICAgZm9yICggaW50IGkgPSAwOyBpIDwgTlVNX1JFQ1RfQVJFQV9MSUdIVFM7IGkgKysgKSB7XG5cbiAgLy8gICAgIHJlY3RBcmVhTGlnaHQgPSByZWN0QXJlYUxpZ2h0c1sgaSBdO1xuICAvLyAgICAgUkVfRGlyZWN0X1JlY3RBcmVhKCByZWN0QXJlYUxpZ2h0LCBnZW9tZXRyeSwgbWF0ZXJpYWwsIHJlZmxlY3RlZExpZ2h0ICk7XG5cbiAgLy8gICB9XG4gIC8vICAgI3ByYWdtYSB1bnJvbGxfbG9vcF9lbmRcblxuICAvLyAjZW5kaWZcblxuICAjaWYgZGVmaW5lZCggUkVfSW5kaXJlY3REaWZmdXNlIClcblxuICAgIHZlYzMgaWJsSXJyYWRpYW5jZSA9IHZlYzMoIDAuMCApO1xuXG4gICAgdmVjMyBpcnJhZGlhbmNlID0gZ2V0QW1iaWVudExpZ2h0SXJyYWRpYW5jZSggYW1iaWVudExpZ2h0Q29sb3IgKTtcblxuICAgIC8vIENPTVBBVDogcHJlLXIxNTYgdXNlcyBhIHN0cnVjdCBHZW9tZXRyaWNDb250ZXh0XG4gICAgLy8gQ09NUEFUOiBwcmUtcjE1NiBkb2Vzbid0IGhhdmUgYSBkZWZpbmUgVVNFX0xJR0hUX1BST0JFU1xuICAgICNpZiBUSFJFRV9WUk1fVEhSRUVfUkVWSVNJT04gPj0gMTU3XG4gICAgICAjaWYgZGVmaW5lZCggVVNFX0xJR0hUX1BST0JFUyApXG4gICAgICAgIGlycmFkaWFuY2UgKz0gZ2V0TGlnaHRQcm9iZUlycmFkaWFuY2UoIGxpZ2h0UHJvYmUsIGdlb21ldHJ5Tm9ybWFsICk7XG4gICAgICAjZW5kaWZcbiAgICAjZWxzZVxuICAgICAgaXJyYWRpYW5jZSArPSBnZXRMaWdodFByb2JlSXJyYWRpYW5jZSggbGlnaHRQcm9iZSwgZ2VvbWV0cnkubm9ybWFsICk7XG4gICAgI2VuZGlmXG5cbiAgICAjaWYgKCBOVU1fSEVNSV9MSUdIVFMgPiAwIClcblxuICAgICAgI3ByYWdtYSB1bnJvbGxfbG9vcF9zdGFydFxuICAgICAgZm9yICggaW50IGkgPSAwOyBpIDwgTlVNX0hFTUlfTElHSFRTOyBpICsrICkge1xuXG4gICAgICAgIC8vIENPTVBBVDogcHJlLXIxNTYgdXNlcyBhIHN0cnVjdCBHZW9tZXRyaWNDb250ZXh0XG4gICAgICAgICNpZiBUSFJFRV9WUk1fVEhSRUVfUkVWSVNJT04gPj0gMTU3XG4gICAgICAgICAgaXJyYWRpYW5jZSArPSBnZXRIZW1pc3BoZXJlTGlnaHRJcnJhZGlhbmNlKCBoZW1pc3BoZXJlTGlnaHRzWyBpIF0sIGdlb21ldHJ5Tm9ybWFsICk7XG4gICAgICAgICNlbHNlXG4gICAgICAgICAgaXJyYWRpYW5jZSArPSBnZXRIZW1pc3BoZXJlTGlnaHRJcnJhZGlhbmNlKCBoZW1pc3BoZXJlTGlnaHRzWyBpIF0sIGdlb21ldHJ5Lm5vcm1hbCApO1xuICAgICAgICAjZW5kaWZcblxuICAgICAgfVxuICAgICAgI3ByYWdtYSB1bnJvbGxfbG9vcF9lbmRcblxuICAgICNlbmRpZlxuXG4gICNlbmRpZlxuXG4gIC8vICNpZiBkZWZpbmVkKCBSRV9JbmRpcmVjdFNwZWN1bGFyIClcblxuICAvLyAgIHZlYzMgcmFkaWFuY2UgPSB2ZWMzKCAwLjAgKTtcbiAgLy8gICB2ZWMzIGNsZWFyY29hdFJhZGlhbmNlID0gdmVjMyggMC4wICk7XG5cbiAgLy8gI2VuZGlmXG5cbiAgI2luY2x1ZGUgPGxpZ2h0c19mcmFnbWVudF9tYXBzPlxuICAjaW5jbHVkZSA8bGlnaHRzX2ZyYWdtZW50X2VuZD5cblxuICAvLyBtb2R1bGF0aW9uXG4gICNpbmNsdWRlIDxhb21hcF9mcmFnbWVudD5cblxuICB2ZWMzIGNvbCA9IHJlZmxlY3RlZExpZ2h0LmRpcmVjdERpZmZ1c2UgKyByZWZsZWN0ZWRMaWdodC5pbmRpcmVjdERpZmZ1c2U7XG5cbiAgI2lmZGVmIERFQlVHX0xJVFNIQURFUkFURVxuICAgIGdsX0ZyYWdDb2xvciA9IHZlYzQoIGNvbCwgZGlmZnVzZUNvbG9yLmEgKTtcbiAgICBwb3N0Q29ycmVjdGlvbigpO1xuICAgIHJldHVybjtcbiAgI2VuZGlmXG5cbiAgLy8gLS0gTVRvb246IHJpbSBsaWdodGluZyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICB2ZWMzIHZpZXdEaXIgPSBub3JtYWxpemUoIHZWaWV3UG9zaXRpb24gKTtcblxuICAjaWZuZGVmIFBIWVNJQ0FMTFlfQ09SUkVDVF9MSUdIVFNcbiAgICByZWZsZWN0ZWRMaWdodC5kaXJlY3RTcGVjdWxhciAvPSBQSTtcbiAgI2VuZGlmXG4gIHZlYzMgcmltTWl4ID0gbWl4KCB2ZWMzKCAxLjAgKSwgcmVmbGVjdGVkTGlnaHQuZGlyZWN0U3BlY3VsYXIsIHJpbUxpZ2h0aW5nTWl4RmFjdG9yICk7XG5cbiAgdmVjMyByaW0gPSBwYXJhbWV0cmljUmltQ29sb3JGYWN0b3IgKiBwb3coIHNhdHVyYXRlKCAxLjAgLSBkb3QoIHZpZXdEaXIsIG5vcm1hbCApICsgcGFyYW1ldHJpY1JpbUxpZnRGYWN0b3IgKSwgcGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlckZhY3RvciApO1xuXG4gICNpZmRlZiBVU0VfTUFUQ0FQVEVYVFVSRVxuICAgIHtcbiAgICAgIHZlYzMgeCA9IG5vcm1hbGl6ZSggdmVjMyggdmlld0Rpci56LCAwLjAsIC12aWV3RGlyLnggKSApO1xuICAgICAgdmVjMyB5ID0gY3Jvc3MoIHZpZXdEaXIsIHggKTsgLy8gZ3VhcmFudGVlZCB0byBiZSBub3JtYWxpemVkXG4gICAgICB2ZWMyIHNwaGVyZVV2ID0gMC41ICsgMC41ICogdmVjMiggZG90KCB4LCBub3JtYWwgKSwgLWRvdCggeSwgbm9ybWFsICkgKTtcbiAgICAgIHNwaGVyZVV2ID0gKCBtYXRjYXBUZXh0dXJlVXZUcmFuc2Zvcm0gKiB2ZWMzKCBzcGhlcmVVdiwgMSApICkueHk7XG4gICAgICB2ZWMzIG1hdGNhcCA9IHRleHR1cmUyRCggbWF0Y2FwVGV4dHVyZSwgc3BoZXJlVXYgKS5yZ2I7XG4gICAgICByaW0gKz0gbWF0Y2FwRmFjdG9yICogbWF0Y2FwO1xuICAgIH1cbiAgI2VuZGlmXG5cbiAgI2lmZGVmIFVTRV9SSU1NVUxUSVBMWVRFWFRVUkVcbiAgICB2ZWMyIHJpbU11bHRpcGx5VGV4dHVyZVV2ID0gKCByaW1NdWx0aXBseVRleHR1cmVVdlRyYW5zZm9ybSAqIHZlYzMoIHV2LCAxICkgKS54eTtcbiAgICByaW0gKj0gdGV4dHVyZTJEKCByaW1NdWx0aXBseVRleHR1cmUsIHJpbU11bHRpcGx5VGV4dHVyZVV2ICkucmdiO1xuICAjZW5kaWZcblxuICBjb2wgKz0gcmltTWl4ICogcmltO1xuXG4gIC8vIC0tIE1Ub29uOiBFbWlzc2lvbiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBjb2wgKz0gdG90YWxFbWlzc2l2ZVJhZGlhbmNlO1xuXG4gIC8vICNpbmNsdWRlIDxlbnZtYXBfZnJhZ21lbnQ+XG5cbiAgLy8gLS0gQWxtb3N0IGRvbmUhIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICNpZiBkZWZpbmVkKCBPVVRMSU5FIClcbiAgICBjb2wgPSBvdXRsaW5lQ29sb3JGYWN0b3IucmdiICogbWl4KCB2ZWMzKCAxLjAgKSwgY29sLCBvdXRsaW5lTGlnaHRpbmdNaXhGYWN0b3IgKTtcbiAgI2VuZGlmXG5cbiAgI2lmZGVmIE9QQVFVRVxuICAgIGRpZmZ1c2VDb2xvci5hID0gMS4wO1xuICAjZW5kaWZcblxuICBnbF9GcmFnQ29sb3IgPSB2ZWM0KCBjb2wsIGRpZmZ1c2VDb2xvci5hICk7XG4gIHBvc3RDb3JyZWN0aW9uKCk7XG59XG4iLCAiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uICovXG5cbi8qKlxuICogU3BlY2lmaWVycyBvZiBkZWJ1ZyBtb2RlIG9mIHtAbGluayBNVG9vbk1hdGVyaWFsfS5cbiAqXG4gKiBTZWU6IHtAbGluayBNVG9vbk1hdGVyaWFsLmRlYnVnTW9kZX1cbiAqL1xuZXhwb3J0IGNvbnN0IE1Ub29uTWF0ZXJpYWxEZWJ1Z01vZGUgPSB7XG4gIC8qKlxuICAgKiBSZW5kZXIgbm9ybWFsbHkuXG4gICAqL1xuICBOb25lOiAnbm9uZScsXG5cbiAgLyoqXG4gICAqIFZpc3VhbGl6ZSBub3JtYWxzIG9mIHRoZSBzdXJmYWNlLlxuICAgKi9cbiAgTm9ybWFsOiAnbm9ybWFsJyxcblxuICAvKipcbiAgICogVmlzdWFsaXplIGxpdC9zaGFkZSBvZiB0aGUgc3VyZmFjZS5cbiAgICovXG4gIExpdFNoYWRlUmF0ZTogJ2xpdFNoYWRlUmF0ZScsXG5cbiAgLyoqXG4gICAqIFZpc3VhbGl6ZSBVViBvZiB0aGUgc3VyZmFjZS5cbiAgICovXG4gIFVWOiAndXYnLFxufSBhcyBjb25zdDtcblxuZXhwb3J0IHR5cGUgTVRvb25NYXRlcmlhbERlYnVnTW9kZSA9ICh0eXBlb2YgTVRvb25NYXRlcmlhbERlYnVnTW9kZSlba2V5b2YgdHlwZW9mIE1Ub29uTWF0ZXJpYWxEZWJ1Z01vZGVdO1xuIiwgIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiAqL1xuXG5leHBvcnQgY29uc3QgTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUgPSB7XG4gIE5vbmU6ICdub25lJyxcbiAgV29ybGRDb29yZGluYXRlczogJ3dvcmxkQ29vcmRpbmF0ZXMnLFxuICBTY3JlZW5Db29yZGluYXRlczogJ3NjcmVlbkNvb3JkaW5hdGVzJyxcbn0gYXMgY29uc3Q7XG5cbmV4cG9ydCB0eXBlIE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlID1cbiAgKHR5cGVvZiBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZSlba2V5b2YgdHlwZW9mIE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlXTtcbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbmNvbnN0IGVuY29kaW5nQ29sb3JTcGFjZU1hcDogUmVjb3JkPGFueSwgJycgfCAnc3JnYic+ID0ge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXG4gIDMwMDA6ICcnLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXG4gIDMwMDE6ICdzcmdiJyxcbn07XG5cbi8qKlxuICogQSBjb21wYXQgZnVuY3Rpb24gdG8gZ2V0IHRleHR1cmUgY29sb3Igc3BhY2UuXG4gKlxuICogQ09NUEFUOiBwcmUtcjE1MlxuICogU3RhcnRpbmcgZnJvbSBUaHJlZS5qcyByMTUyLCBgdGV4dHVyZS5lbmNvZGluZ2AgaXMgcmVuYW1lZCB0byBgdGV4dHVyZS5jb2xvclNwYWNlYC5cbiAqIFRoaXMgZnVuY3Rpb24gd2lsbCBoYW5kbGUgdGhlIGNvbWFwdC5cbiAqXG4gKiBAcGFyYW0gdGV4dHVyZSBUaGUgdGV4dHVyZSB5b3Ugd2FudCB0byBnZXQgdGhlIGNvbG9yIHNwYWNlIGZyb21cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFRleHR1cmVDb2xvclNwYWNlKHRleHR1cmU6IFRIUkVFLlRleHR1cmUpOiAnJyB8ICdzcmdiJyB7XG4gIGlmIChwYXJzZUludChUSFJFRS5SRVZJU0lPTiwgMTApID49IDE1Mikge1xuICAgIHJldHVybiB0ZXh0dXJlLmNvbG9yU3BhY2UgYXMgJycgfCAnc3JnYic7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGVuY29kaW5nQ29sb3JTcGFjZU1hcFsodGV4dHVyZSBhcyBhbnkpLmVuY29kaW5nXTtcbiAgfVxufVxuIiwgImltcG9ydCB7IEdMVEZMb2FkZXJQbHVnaW4sIEdMVEZQYXJzZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyLmpzJztcbmltcG9ydCAqIGFzIEhEUkVtaXNzaXZlTXVsdGlwbGllclNjaGVtYSBmcm9tICdAcGl4aXYvdHlwZXMtdnJtYy1tYXRlcmlhbHMtaGRyLWVtaXNzaXZlLW11bHRpcGxpZXItMS4wJztcbmltcG9ydCB7IEdMVEYgYXMgR0xURlNjaGVtYSB9IGZyb20gJ0BnbHRmLXRyYW5zZm9ybS9jb3JlJztcblxuZXhwb3J0IGNsYXNzIFZSTU1hdGVyaWFsc0hEUkVtaXNzaXZlTXVsdGlwbGllckxvYWRlclBsdWdpbiBpbXBsZW1lbnRzIEdMVEZMb2FkZXJQbHVnaW4ge1xuICBwdWJsaWMgc3RhdGljIEVYVEVOU0lPTl9OQU1FID0gJ1ZSTUNfbWF0ZXJpYWxzX2hkcl9lbWlzc2l2ZU11bHRpcGxpZXInIGFzIGNvbnN0O1xuXG4gIHB1YmxpYyByZWFkb25seSBwYXJzZXI6IEdMVEZQYXJzZXI7XG5cbiAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFZSTU1hdGVyaWFsc0hEUkVtaXNzaXZlTXVsdGlwbGllckxvYWRlclBsdWdpbi5FWFRFTlNJT05fTkFNRTtcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJzZXI6IEdMVEZQYXJzZXIpIHtcbiAgICB0aGlzLnBhcnNlciA9IHBhcnNlcjtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBleHRlbmRNYXRlcmlhbFBhcmFtcyhtYXRlcmlhbEluZGV4OiBudW1iZXIsIG1hdGVyaWFsUGFyYW1zOiB7IFtrZXk6IHN0cmluZ106IGFueSB9KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgZXh0ZW5zaW9uID0gdGhpcy5fZ2V0SERSRW1pc3NpdmVNdWx0aXBsaWVyRXh0ZW5zaW9uKG1hdGVyaWFsSW5kZXgpO1xuICAgIGlmIChleHRlbnNpb24gPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFRoaXMgZXh0ZW5zaW9uIGlzIGFyY2hpdmVkLiBFbWl0IHdhcm5pbmdcbiAgICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS92cm0tYy92cm0tc3BlY2lmaWNhdGlvbi9wdWxsLzM3NVxuICAgIGNvbnNvbGUud2FybihcbiAgICAgICdWUk1NYXRlcmlhbHNIRFJFbWlzc2l2ZU11bHRpcGxpZXJMb2FkZXJQbHVnaW46IGBWUk1DX21hdGVyaWFsc19oZHJfZW1pc3NpdmVNdWx0aXBsaWVyYCBpcyBhcmNoaXZlZC4gVXNlIGBLSFJfbWF0ZXJpYWxzX2VtaXNzaXZlX3N0cmVuZ3RoYCBpbnN0ZWFkLicsXG4gICAgKTtcblxuICAgIGNvbnN0IGVtaXNzaXZlTXVsdGlwbGllciA9IGV4dGVuc2lvbi5lbWlzc2l2ZU11bHRpcGxpZXI7XG4gICAgbWF0ZXJpYWxQYXJhbXMuZW1pc3NpdmVJbnRlbnNpdHkgPSBlbWlzc2l2ZU11bHRpcGxpZXI7XG4gIH1cblxuICBwcml2YXRlIF9nZXRIRFJFbWlzc2l2ZU11bHRpcGxpZXJFeHRlbnNpb24oXG4gICAgbWF0ZXJpYWxJbmRleDogbnVtYmVyLFxuICApOiBIRFJFbWlzc2l2ZU11bHRpcGxpZXJTY2hlbWEuVlJNQ01hdGVyaWFsc0hEUkVtaXNzaXZlTXVsdGlwbGllciB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgcGFyc2VyID0gdGhpcy5wYXJzZXI7XG4gICAgY29uc3QganNvbiA9IHBhcnNlci5qc29uIGFzIEdMVEZTY2hlbWEuSUdMVEY7XG5cbiAgICBjb25zdCBtYXRlcmlhbERlZiA9IGpzb24ubWF0ZXJpYWxzPy5bbWF0ZXJpYWxJbmRleF07XG5cbiAgICBpZiAobWF0ZXJpYWxEZWYgPT0gbnVsbCkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBgVlJNTWF0ZXJpYWxzSERSRW1pc3NpdmVNdWx0aXBsaWVyTG9hZGVyUGx1Z2luOiBBdHRlbXB0IHRvIHVzZSBtYXRlcmlhbHNbJHttYXRlcmlhbEluZGV4fV0gb2YgZ2xURiBidXQgdGhlIG1hdGVyaWFsIGRvZXNuJ3QgZXhpc3RgLFxuICAgICAgKTtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgY29uc3QgZXh0ZW5zaW9uID0gbWF0ZXJpYWxEZWYuZXh0ZW5zaW9ucz8uW1ZSTU1hdGVyaWFsc0hEUkVtaXNzaXZlTXVsdGlwbGllckxvYWRlclBsdWdpbi5FWFRFTlNJT05fTkFNRV0gYXNcbiAgICAgIEhEUkVtaXNzaXZlTXVsdGlwbGllclNjaGVtYS5WUk1DTWF0ZXJpYWxzSERSRW1pc3NpdmVNdWx0aXBsaWVyIHwgdW5kZWZpbmVkO1xuICAgIGlmIChleHRlbnNpb24gPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICByZXR1cm4gZXh0ZW5zaW9uO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNIGFzIFYwVlJNLCBNYXRlcmlhbCBhcyBWME1hdGVyaWFsIH0gZnJvbSAnQHBpeGl2L3R5cGVzLXZybS0wLjAnO1xuaW1wb3J0ICogYXMgVjFNVG9vblNjaGVtYSBmcm9tICdAcGl4aXYvdHlwZXMtdnJtYy1tYXRlcmlhbHMtbXRvb24tMS4wJztcbmltcG9ydCB0eXBlIHsgR0xURkxvYWRlclBsdWdpbiwgR0xURlBhcnNlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXIuanMnO1xuaW1wb3J0IHsgZ2FtbWFFT1RGIH0gZnJvbSAnLi91dGlscy9nYW1tYUVPVEYnO1xuaW1wb3J0IHsgR0xURiBhcyBHTFRGU2NoZW1hIH0gZnJvbSAnQGdsdGYtdHJhbnNmb3JtL2NvcmUnO1xuXG5leHBvcnQgY2xhc3MgVlJNTWF0ZXJpYWxzVjBDb21wYXRQbHVnaW4gaW1wbGVtZW50cyBHTFRGTG9hZGVyUGx1Z2luIHtcbiAgcHVibGljIHJlYWRvbmx5IHBhcnNlcjogR0xURlBhcnNlcjtcblxuICAvKipcbiAgICogQSBtYXAgZnJvbSB2MCByZW5kZXIgcXVldWUgdG8gdjEgcmVuZGVyIHF1ZXVlIG9mZnNldCwgZm9yIFRyYW5zcGFyZW50IG1hdGVyaWFscy5cbiAgICovXG4gIHByaXZhdGUgcmVhZG9ubHkgX3JlbmRlclF1ZXVlTWFwVHJhbnNwYXJlbnQ6IE1hcDxudW1iZXIsIG51bWJlcj47XG5cbiAgLyoqXG4gICAqIEEgbWFwIGZyb20gdjAgcmVuZGVyIHF1ZXVlIHRvIHYxIHJlbmRlciBxdWV1ZSBvZmZzZXQsIGZvciBUcmFuc3BhcmVudFpXcml0ZSBtYXRlcmlhbHMuXG4gICAqL1xuICBwcml2YXRlIHJlYWRvbmx5IF9yZW5kZXJRdWV1ZU1hcFRyYW5zcGFyZW50WldyaXRlOiBNYXA8bnVtYmVyLCBudW1iZXI+O1xuXG4gIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiAnVlJNTWF0ZXJpYWxzVjBDb21wYXRQbHVnaW4nO1xuICB9XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBhcnNlcjogR0xURlBhcnNlcikge1xuICAgIHRoaXMucGFyc2VyID0gcGFyc2VyO1xuXG4gICAgdGhpcy5fcmVuZGVyUXVldWVNYXBUcmFuc3BhcmVudCA9IG5ldyBNYXAoKTtcbiAgICB0aGlzLl9yZW5kZXJRdWV1ZU1hcFRyYW5zcGFyZW50WldyaXRlID0gbmV3IE1hcCgpO1xuXG4gICAgLy8gV09SS0FST1VORDogQWRkIEtIUl90ZXh0dXJlX3RyYW5zZm9ybSB0byBleHRlbnNpb25zVXNlZFxuICAgIC8vIEl0IGlzIHRvbyBsYXRlIHRvIGFkZCB0aGlzIGluIGJlZm9yZVJvb3RcbiAgICBjb25zdCBqc29uID0gdGhpcy5wYXJzZXIuanNvbiBhcyBHTFRGU2NoZW1hLklHTFRGO1xuXG4gICAganNvbi5leHRlbnNpb25zVXNlZCA9IGpzb24uZXh0ZW5zaW9uc1VzZWQgPz8gW107XG4gICAgaWYgKGpzb24uZXh0ZW5zaW9uc1VzZWQuaW5kZXhPZignS0hSX3RleHR1cmVfdHJhbnNmb3JtJykgPT09IC0xKSB7XG4gICAgICBqc29uLmV4dGVuc2lvbnNVc2VkLnB1c2goJ0tIUl90ZXh0dXJlX3RyYW5zZm9ybScpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBiZWZvcmVSb290KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGpzb24gPSB0aGlzLnBhcnNlci5qc29uIGFzIEdMVEZTY2hlbWEuSUdMVEY7XG5cbiAgICAvLyBlYXJseSBhYm9ydCBpZiBpdCBkb2Vzbid0IHVzZSBWMFZSTVxuICAgIGNvbnN0IHYwVlJNRXh0ZW5zaW9uID0ganNvbi5leHRlbnNpb25zPy5bJ1ZSTSddIGFzIFYwVlJNIHwgdW5kZWZpbmVkO1xuICAgIGNvbnN0IHYwTWF0ZXJpYWxQcm9wZXJ0aWVzID0gdjBWUk1FeHRlbnNpb24/Lm1hdGVyaWFsUHJvcGVydGllcztcbiAgICBpZiAoIXYwTWF0ZXJpYWxQcm9wZXJ0aWVzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gcG9wdWxhdGUgcmVuZGVyIHF1ZXVlIG1hcFxuICAgIHRoaXMuX3BvcHVsYXRlUmVuZGVyUXVldWVNYXAodjBNYXRlcmlhbFByb3BlcnRpZXMpO1xuXG4gICAgLy8gY29udmVydCBWMCBtYXRlcmlhbCBwcm9wZXJ0aWVzIGludG8gVjEgY29tcGF0aWJsZSBmb3JtYXRcbiAgICB2ME1hdGVyaWFsUHJvcGVydGllcy5mb3JFYWNoKChtYXRlcmlhbFByb3BlcnRpZXMsIG1hdGVyaWFsSW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IG1hdGVyaWFsRGVmID0ganNvbi5tYXRlcmlhbHM/LlttYXRlcmlhbEluZGV4XTtcblxuICAgICAgaWYgKG1hdGVyaWFsRGVmID09IG51bGwpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIGBWUk1NYXRlcmlhbHNWMENvbXBhdFBsdWdpbjogQXR0ZW1wdCB0byB1c2UgbWF0ZXJpYWxzWyR7bWF0ZXJpYWxJbmRleH1dIG9mIGdsVEYgYnV0IHRoZSBtYXRlcmlhbCBkb2Vzbid0IGV4aXN0YCxcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAobWF0ZXJpYWxQcm9wZXJ0aWVzLnNoYWRlciA9PT0gJ1ZSTS9NVG9vbicpIHtcbiAgICAgICAgY29uc3QgbWF0ZXJpYWwgPSB0aGlzLl9wYXJzZVYwTVRvb25Qcm9wZXJ0aWVzKG1hdGVyaWFsUHJvcGVydGllcywgbWF0ZXJpYWxEZWYpO1xuICAgICAgICBqc29uLm1hdGVyaWFscyFbbWF0ZXJpYWxJbmRleF0gPSBtYXRlcmlhbDtcbiAgICAgIH0gZWxzZSBpZiAobWF0ZXJpYWxQcm9wZXJ0aWVzLnNoYWRlcj8uc3RhcnRzV2l0aCgnVlJNL1VubGl0JykpIHtcbiAgICAgICAgY29uc3QgbWF0ZXJpYWwgPSB0aGlzLl9wYXJzZVYwVW5saXRQcm9wZXJ0aWVzKG1hdGVyaWFsUHJvcGVydGllcywgbWF0ZXJpYWxEZWYpO1xuICAgICAgICBqc29uLm1hdGVyaWFscyFbbWF0ZXJpYWxJbmRleF0gPSBtYXRlcmlhbDtcbiAgICAgIH0gZWxzZSBpZiAobWF0ZXJpYWxQcm9wZXJ0aWVzLnNoYWRlciA9PT0gJ1ZSTV9VU0VfR0xURlNIQURFUicpIHtcbiAgICAgICAgLy8gYGpzb24ubWF0ZXJpYWxzW21hdGVyaWFsSW5kZXhdYCBzaG91bGQgYmUgYWxyZWFkeSB2YWxpZFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS53YXJuKGBWUk1NYXRlcmlhbHNWMENvbXBhdFBsdWdpbjogVW5rbm93biBzaGFkZXI6ICR7bWF0ZXJpYWxQcm9wZXJ0aWVzLnNoYWRlcn1gKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlVjBNVG9vblByb3BlcnRpZXMoXG4gICAgbWF0ZXJpYWxQcm9wZXJ0aWVzOiBWME1hdGVyaWFsLFxuICAgIHNjaGVtYU1hdGVyaWFsOiBHTFRGU2NoZW1hLklNYXRlcmlhbCxcbiAgKTogR0xURlNjaGVtYS5JTWF0ZXJpYWwge1xuICAgIGNvbnN0IGlzVHJhbnNwYXJlbnQgPSBtYXRlcmlhbFByb3BlcnRpZXMua2V5d29yZE1hcD8uWydfQUxQSEFCTEVORF9PTiddID8/IGZhbHNlO1xuICAgIGNvbnN0IGVuYWJsZWRaV3JpdGUgPSBtYXRlcmlhbFByb3BlcnRpZXMuZmxvYXRQcm9wZXJ0aWVzPy5bJ19aV3JpdGUnXSA9PT0gMTtcbiAgICBjb25zdCB0cmFuc3BhcmVudFdpdGhaV3JpdGUgPSBlbmFibGVkWldyaXRlICYmIGlzVHJhbnNwYXJlbnQ7XG5cbiAgICBjb25zdCByZW5kZXJRdWV1ZU9mZnNldE51bWJlciA9IHRoaXMuX3YwUGFyc2VSZW5kZXJRdWV1ZShtYXRlcmlhbFByb3BlcnRpZXMpO1xuXG4gICAgY29uc3QgaXNDdXRvZmYgPSBtYXRlcmlhbFByb3BlcnRpZXMua2V5d29yZE1hcD8uWydfQUxQSEFURVNUX09OJ10gPz8gZmFsc2U7XG4gICAgY29uc3QgYWxwaGFNb2RlID0gaXNUcmFuc3BhcmVudCA/ICdCTEVORCcgOiBpc0N1dG9mZiA/ICdNQVNLJyA6ICdPUEFRVUUnO1xuICAgIGNvbnN0IGFscGhhQ3V0b2ZmID0gaXNDdXRvZmYgPyAobWF0ZXJpYWxQcm9wZXJ0aWVzLmZsb2F0UHJvcGVydGllcz8uWydfQ3V0b2ZmJ10gPz8gMC41KSA6IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0IGN1bGxNb2RlID0gbWF0ZXJpYWxQcm9wZXJ0aWVzLmZsb2F0UHJvcGVydGllcz8uWydfQ3VsbE1vZGUnXSA/PyAyOyAvLyBlbnVtLCB7IE9mZiwgRnJvbnQsIEJhY2sgfVxuICAgIGNvbnN0IGRvdWJsZVNpZGVkID0gY3VsbE1vZGUgPT09IDA7XG5cbiAgICBjb25zdCB0ZXh0dXJlVHJhbnNmb3JtRXh0ID0gdGhpcy5fcG9ydFRleHR1cmVUcmFuc2Zvcm0obWF0ZXJpYWxQcm9wZXJ0aWVzKTtcblxuICAgIGNvbnN0IGJhc2VDb2xvckZhY3RvciA9IChtYXRlcmlhbFByb3BlcnRpZXMudmVjdG9yUHJvcGVydGllcz8uWydfQ29sb3InXSA/PyBbMS4wLCAxLjAsIDEuMCwgMS4wXSkubWFwKFxuICAgICAgKHY6IG51bWJlciwgaTogbnVtYmVyKSA9PiAoaSA9PT0gMyA/IHYgOiBnYW1tYUVPVEYodikpLCAvLyBhbHBoYSBjaGFubmVsIGlzIHN0b3JlZCBpbiBsaW5lYXJcbiAgICApO1xuICAgIGNvbnN0IGJhc2VDb2xvclRleHR1cmVJbmRleCA9IG1hdGVyaWFsUHJvcGVydGllcy50ZXh0dXJlUHJvcGVydGllcz8uWydfTWFpblRleCddO1xuICAgIGNvbnN0IGJhc2VDb2xvclRleHR1cmUgPVxuICAgICAgYmFzZUNvbG9yVGV4dHVyZUluZGV4ICE9IG51bGxcbiAgICAgICAgPyB7XG4gICAgICAgICAgICBpbmRleDogYmFzZUNvbG9yVGV4dHVyZUluZGV4LFxuICAgICAgICAgICAgZXh0ZW5zaW9uczoge1xuICAgICAgICAgICAgICAuLi50ZXh0dXJlVHJhbnNmb3JtRXh0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9XG4gICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgY29uc3Qgbm9ybWFsVGV4dHVyZVNjYWxlID0gbWF0ZXJpYWxQcm9wZXJ0aWVzLmZsb2F0UHJvcGVydGllcz8uWydfQnVtcFNjYWxlJ10gPz8gMS4wO1xuICAgIGNvbnN0IG5vcm1hbFRleHR1cmVJbmRleCA9IG1hdGVyaWFsUHJvcGVydGllcy50ZXh0dXJlUHJvcGVydGllcz8uWydfQnVtcE1hcCddO1xuICAgIGNvbnN0IG5vcm1hbFRleHR1cmUgPVxuICAgICAgbm9ybWFsVGV4dHVyZUluZGV4ICE9IG51bGxcbiAgICAgICAgPyB7XG4gICAgICAgICAgICBpbmRleDogbm9ybWFsVGV4dHVyZUluZGV4LFxuICAgICAgICAgICAgc2NhbGU6IG5vcm1hbFRleHR1cmVTY2FsZSxcbiAgICAgICAgICAgIGV4dGVuc2lvbnM6IHtcbiAgICAgICAgICAgICAgLi4udGV4dHVyZVRyYW5zZm9ybUV4dCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfVxuICAgICAgICA6IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0IGVtaXNzaXZlRmFjdG9yID0gKG1hdGVyaWFsUHJvcGVydGllcy52ZWN0b3JQcm9wZXJ0aWVzPy5bJ19FbWlzc2lvbkNvbG9yJ10gPz8gWzAuMCwgMC4wLCAwLjAsIDEuMF0pLm1hcChcbiAgICAgIGdhbW1hRU9URixcbiAgICApO1xuICAgIGNvbnN0IGVtaXNzaXZlVGV4dHVyZUluZGV4ID0gbWF0ZXJpYWxQcm9wZXJ0aWVzLnRleHR1cmVQcm9wZXJ0aWVzPy5bJ19FbWlzc2lvbk1hcCddO1xuICAgIGNvbnN0IGVtaXNzaXZlVGV4dHVyZSA9XG4gICAgICBlbWlzc2l2ZVRleHR1cmVJbmRleCAhPSBudWxsXG4gICAgICAgID8ge1xuICAgICAgICAgICAgaW5kZXg6IGVtaXNzaXZlVGV4dHVyZUluZGV4LFxuICAgICAgICAgICAgZXh0ZW5zaW9uczoge1xuICAgICAgICAgICAgICAuLi50ZXh0dXJlVHJhbnNmb3JtRXh0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9XG4gICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgY29uc3Qgc2hhZGVDb2xvckZhY3RvciA9IChtYXRlcmlhbFByb3BlcnRpZXMudmVjdG9yUHJvcGVydGllcz8uWydfU2hhZGVDb2xvciddID8/IFswLjk3LCAwLjgxLCAwLjg2LCAxLjBdKS5tYXAoXG4gICAgICBnYW1tYUVPVEYsXG4gICAgKTtcbiAgICBjb25zdCBzaGFkZU11bHRpcGx5VGV4dHVyZUluZGV4ID0gbWF0ZXJpYWxQcm9wZXJ0aWVzLnRleHR1cmVQcm9wZXJ0aWVzPy5bJ19TaGFkZVRleHR1cmUnXTtcbiAgICBjb25zdCBzaGFkZU11bHRpcGx5VGV4dHVyZSA9XG4gICAgICBzaGFkZU11bHRpcGx5VGV4dHVyZUluZGV4ICE9IG51bGxcbiAgICAgICAgPyB7XG4gICAgICAgICAgICBpbmRleDogc2hhZGVNdWx0aXBseVRleHR1cmVJbmRleCxcbiAgICAgICAgICAgIGV4dGVuc2lvbnM6IHtcbiAgICAgICAgICAgICAgLi4udGV4dHVyZVRyYW5zZm9ybUV4dCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfVxuICAgICAgICA6IHVuZGVmaW5lZDtcblxuICAgIC8vIC8vIGNvbnZlcnQgdjAgc2hhZGUgc2hpZnQgLyBzaGFkZSB0b29ueVxuICAgIGxldCBzaGFkaW5nU2hpZnRGYWN0b3IgPSBtYXRlcmlhbFByb3BlcnRpZXMuZmxvYXRQcm9wZXJ0aWVzPy5bJ19TaGFkZVNoaWZ0J10gPz8gMC4wO1xuICAgIGxldCBzaGFkaW5nVG9vbnlGYWN0b3IgPSBtYXRlcmlhbFByb3BlcnRpZXMuZmxvYXRQcm9wZXJ0aWVzPy5bJ19TaGFkZVRvb255J10gPz8gMC45O1xuICAgIHNoYWRpbmdUb29ueUZhY3RvciA9IFRIUkVFLk1hdGhVdGlscy5sZXJwKHNoYWRpbmdUb29ueUZhY3RvciwgMS4wLCAwLjUgKyAwLjUgKiBzaGFkaW5nU2hpZnRGYWN0b3IpO1xuICAgIHNoYWRpbmdTaGlmdEZhY3RvciA9IC1zaGFkaW5nU2hpZnRGYWN0b3IgLSAoMS4wIC0gc2hhZGluZ1Rvb255RmFjdG9yKTtcblxuICAgIGNvbnN0IGdpSW50ZW5zaXR5RmFjdG9yID0gbWF0ZXJpYWxQcm9wZXJ0aWVzLmZsb2F0UHJvcGVydGllcz8uWydfSW5kaXJlY3RMaWdodEludGVuc2l0eSddID8/IDAuMTtcbiAgICBjb25zdCBnaUVxdWFsaXphdGlvbkZhY3RvciA9IGdpSW50ZW5zaXR5RmFjdG9yID8gMS4wIC0gZ2lJbnRlbnNpdHlGYWN0b3IgOiB1bmRlZmluZWQ7XG5cbiAgICBjb25zdCBtYXRjYXBUZXh0dXJlSW5kZXggPSBtYXRlcmlhbFByb3BlcnRpZXMudGV4dHVyZVByb3BlcnRpZXM/LlsnX1NwaGVyZUFkZCddO1xuICAgIGNvbnN0IG1hdGNhcEZhY3RvciA9IG1hdGNhcFRleHR1cmVJbmRleCAhPSBudWxsID8gWzEuMCwgMS4wLCAxLjBdIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IG1hdGNhcFRleHR1cmUgPVxuICAgICAgbWF0Y2FwVGV4dHVyZUluZGV4ICE9IG51bGxcbiAgICAgICAgPyB7XG4gICAgICAgICAgICBpbmRleDogbWF0Y2FwVGV4dHVyZUluZGV4LFxuICAgICAgICAgIH1cbiAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICBjb25zdCByaW1MaWdodGluZ01peEZhY3RvciA9IG1hdGVyaWFsUHJvcGVydGllcy5mbG9hdFByb3BlcnRpZXM/LlsnX1JpbUxpZ2h0aW5nTWl4J10gPz8gMC4wO1xuICAgIGNvbnN0IHJpbU11bHRpcGx5VGV4dHVyZUluZGV4ID0gbWF0ZXJpYWxQcm9wZXJ0aWVzLnRleHR1cmVQcm9wZXJ0aWVzPy5bJ19SaW1UZXh0dXJlJ107XG4gICAgY29uc3QgcmltTXVsdGlwbHlUZXh0dXJlID1cbiAgICAgIHJpbU11bHRpcGx5VGV4dHVyZUluZGV4ICE9IG51bGxcbiAgICAgICAgPyB7XG4gICAgICAgICAgICBpbmRleDogcmltTXVsdGlwbHlUZXh0dXJlSW5kZXgsXG4gICAgICAgICAgICBleHRlbnNpb25zOiB7XG4gICAgICAgICAgICAgIC4uLnRleHR1cmVUcmFuc2Zvcm1FeHQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH1cbiAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICBjb25zdCBwYXJhbWV0cmljUmltQ29sb3JGYWN0b3IgPSAobWF0ZXJpYWxQcm9wZXJ0aWVzLnZlY3RvclByb3BlcnRpZXM/LlsnX1JpbUNvbG9yJ10gPz8gWzAuMCwgMC4wLCAwLjAsIDEuMF0pLm1hcChcbiAgICAgIGdhbW1hRU9URixcbiAgICApO1xuICAgIGNvbnN0IHBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJGYWN0b3IgPSBtYXRlcmlhbFByb3BlcnRpZXMuZmxvYXRQcm9wZXJ0aWVzPy5bJ19SaW1GcmVzbmVsUG93ZXInXSA/PyAxLjA7XG4gICAgY29uc3QgcGFyYW1ldHJpY1JpbUxpZnRGYWN0b3IgPSBtYXRlcmlhbFByb3BlcnRpZXMuZmxvYXRQcm9wZXJ0aWVzPy5bJ19SaW1MaWZ0J10gPz8gMC4wO1xuXG4gICAgY29uc3Qgb3V0bGluZVdpZHRoTW9kZSA9IFsnbm9uZScsICd3b3JsZENvb3JkaW5hdGVzJywgJ3NjcmVlbkNvb3JkaW5hdGVzJ11bXG4gICAgICBtYXRlcmlhbFByb3BlcnRpZXMuZmxvYXRQcm9wZXJ0aWVzPy5bJ19PdXRsaW5lV2lkdGhNb2RlJ10gPz8gMFxuICAgIF0gYXMgVjFNVG9vblNjaGVtYS5NYXRlcmlhbHNNVG9vbk91dGxpbmVXaWR0aE1vZGU7XG5cbiAgICAvLyAvLyB2MCBvdXRsaW5lV2lkdGhGYWN0b3IgaXMgaW4gY2VudGltZXRlclxuICAgIGxldCBvdXRsaW5lV2lkdGhGYWN0b3IgPSBtYXRlcmlhbFByb3BlcnRpZXMuZmxvYXRQcm9wZXJ0aWVzPy5bJ19PdXRsaW5lV2lkdGgnXSA/PyAwLjA7XG4gICAgb3V0bGluZVdpZHRoRmFjdG9yID0gMC4wMSAqIG91dGxpbmVXaWR0aEZhY3RvcjtcblxuICAgIGNvbnN0IG91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZUluZGV4ID0gbWF0ZXJpYWxQcm9wZXJ0aWVzLnRleHR1cmVQcm9wZXJ0aWVzPy5bJ19PdXRsaW5lV2lkdGhUZXh0dXJlJ107XG4gICAgY29uc3Qgb3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlID1cbiAgICAgIG91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZUluZGV4ICE9IG51bGxcbiAgICAgICAgPyB7XG4gICAgICAgICAgICBpbmRleDogb3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlSW5kZXgsXG4gICAgICAgICAgICBleHRlbnNpb25zOiB7XG4gICAgICAgICAgICAgIC4uLnRleHR1cmVUcmFuc2Zvcm1FeHQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH1cbiAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICBjb25zdCBvdXRsaW5lQ29sb3JGYWN0b3IgPSAobWF0ZXJpYWxQcm9wZXJ0aWVzLnZlY3RvclByb3BlcnRpZXM/LlsnX091dGxpbmVDb2xvciddID8/IFswLjAsIDAuMCwgMC4wXSkubWFwKFxuICAgICAgZ2FtbWFFT1RGLFxuICAgICk7XG4gICAgY29uc3Qgb3V0bGluZUNvbG9yTW9kZSA9IG1hdGVyaWFsUHJvcGVydGllcy5mbG9hdFByb3BlcnRpZXM/LlsnX091dGxpbmVDb2xvck1vZGUnXSA/PyAwOyAvLyBlbnVtLCB7IEZpeGVkLCBNaXhlZCB9XG4gICAgY29uc3Qgb3V0bGluZUxpZ2h0aW5nTWl4RmFjdG9yID1cbiAgICAgIG91dGxpbmVDb2xvck1vZGUgPT09IDEgPyAobWF0ZXJpYWxQcm9wZXJ0aWVzLmZsb2F0UHJvcGVydGllcz8uWydfT3V0bGluZUxpZ2h0aW5nTWl4J10gPz8gMS4wKSA6IDAuMDtcblxuICAgIGNvbnN0IHV2QW5pbWF0aW9uTWFza1RleHR1cmVJbmRleCA9IG1hdGVyaWFsUHJvcGVydGllcy50ZXh0dXJlUHJvcGVydGllcz8uWydfVXZBbmltTWFza1RleHR1cmUnXTtcbiAgICBjb25zdCB1dkFuaW1hdGlvbk1hc2tUZXh0dXJlID1cbiAgICAgIHV2QW5pbWF0aW9uTWFza1RleHR1cmVJbmRleCAhPSBudWxsXG4gICAgICAgID8ge1xuICAgICAgICAgICAgaW5kZXg6IHV2QW5pbWF0aW9uTWFza1RleHR1cmVJbmRleCxcbiAgICAgICAgICAgIGV4dGVuc2lvbnM6IHtcbiAgICAgICAgICAgICAgLi4udGV4dHVyZVRyYW5zZm9ybUV4dCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfVxuICAgICAgICA6IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0IHV2QW5pbWF0aW9uU2Nyb2xsWFNwZWVkRmFjdG9yID0gbWF0ZXJpYWxQcm9wZXJ0aWVzLmZsb2F0UHJvcGVydGllcz8uWydfVXZBbmltU2Nyb2xsWCddID8/IDAuMDtcblxuICAgIC8vIHV2QW5pbWF0aW9uU2Nyb2xsWVNwZWVkRmFjdG9yIHdpbGwgYmUgb3Bwb3NpdGUgYmV0d2VlbiBWMCBhbmQgVjFcbiAgICBsZXQgdXZBbmltYXRpb25TY3JvbGxZU3BlZWRGYWN0b3IgPSBtYXRlcmlhbFByb3BlcnRpZXMuZmxvYXRQcm9wZXJ0aWVzPy5bJ19VdkFuaW1TY3JvbGxZJ10gPz8gMC4wO1xuICAgIGlmICh1dkFuaW1hdGlvblNjcm9sbFlTcGVlZEZhY3RvciAhPSBudWxsKSB7XG4gICAgICB1dkFuaW1hdGlvblNjcm9sbFlTcGVlZEZhY3RvciA9IC11dkFuaW1hdGlvblNjcm9sbFlTcGVlZEZhY3RvcjtcbiAgICB9XG5cbiAgICBjb25zdCB1dkFuaW1hdGlvblJvdGF0aW9uU3BlZWRGYWN0b3IgPSBtYXRlcmlhbFByb3BlcnRpZXMuZmxvYXRQcm9wZXJ0aWVzPy5bJ19VdkFuaW1Sb3RhdGlvbiddID8/IDAuMDtcblxuICAgIGNvbnN0IG10b29uRXh0ZW5zaW9uOiBWMU1Ub29uU2NoZW1hLlZSTUNNYXRlcmlhbHNNVG9vbiA9IHtcbiAgICAgIHNwZWNWZXJzaW9uOiAnMS4wJyxcbiAgICAgIHRyYW5zcGFyZW50V2l0aFpXcml0ZSxcbiAgICAgIHJlbmRlclF1ZXVlT2Zmc2V0TnVtYmVyLFxuICAgICAgc2hhZGVDb2xvckZhY3RvcixcbiAgICAgIHNoYWRlTXVsdGlwbHlUZXh0dXJlLFxuICAgICAgc2hhZGluZ1NoaWZ0RmFjdG9yLFxuICAgICAgc2hhZGluZ1Rvb255RmFjdG9yLFxuICAgICAgZ2lFcXVhbGl6YXRpb25GYWN0b3IsXG4gICAgICBtYXRjYXBGYWN0b3IsXG4gICAgICBtYXRjYXBUZXh0dXJlLFxuICAgICAgcmltTGlnaHRpbmdNaXhGYWN0b3IsXG4gICAgICByaW1NdWx0aXBseVRleHR1cmUsXG4gICAgICBwYXJhbWV0cmljUmltQ29sb3JGYWN0b3IsXG4gICAgICBwYXJhbWV0cmljUmltRnJlc25lbFBvd2VyRmFjdG9yLFxuICAgICAgcGFyYW1ldHJpY1JpbUxpZnRGYWN0b3IsXG4gICAgICBvdXRsaW5lV2lkdGhNb2RlLFxuICAgICAgb3V0bGluZVdpZHRoRmFjdG9yLFxuICAgICAgb3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlLFxuICAgICAgb3V0bGluZUNvbG9yRmFjdG9yLFxuICAgICAgb3V0bGluZUxpZ2h0aW5nTWl4RmFjdG9yLFxuICAgICAgdXZBbmltYXRpb25NYXNrVGV4dHVyZSxcbiAgICAgIHV2QW5pbWF0aW9uU2Nyb2xsWFNwZWVkRmFjdG9yLFxuICAgICAgdXZBbmltYXRpb25TY3JvbGxZU3BlZWRGYWN0b3IsXG4gICAgICB1dkFuaW1hdGlvblJvdGF0aW9uU3BlZWRGYWN0b3IsXG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAuLi5zY2hlbWFNYXRlcmlhbCxcblxuICAgICAgcGJyTWV0YWxsaWNSb3VnaG5lc3M6IHtcbiAgICAgICAgYmFzZUNvbG9yRmFjdG9yLFxuICAgICAgICBiYXNlQ29sb3JUZXh0dXJlLFxuICAgICAgfSxcbiAgICAgIG5vcm1hbFRleHR1cmUsXG4gICAgICBlbWlzc2l2ZVRleHR1cmUsXG4gICAgICBlbWlzc2l2ZUZhY3RvcixcbiAgICAgIGFscGhhTW9kZSxcbiAgICAgIGFscGhhQ3V0b2ZmLFxuICAgICAgZG91YmxlU2lkZWQsXG4gICAgICBleHRlbnNpb25zOiB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cbiAgICAgICAgVlJNQ19tYXRlcmlhbHNfbXRvb246IG10b29uRXh0ZW5zaW9uLFxuICAgICAgfSxcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VWMFVubGl0UHJvcGVydGllcyhcbiAgICBtYXRlcmlhbFByb3BlcnRpZXM6IFYwTWF0ZXJpYWwsXG4gICAgc2NoZW1hTWF0ZXJpYWw6IEdMVEZTY2hlbWEuSU1hdGVyaWFsLFxuICApOiBHTFRGU2NoZW1hLklNYXRlcmlhbCB7XG4gICAgY29uc3QgaXNUcmFuc3BhcmVudFpXcml0ZSA9IG1hdGVyaWFsUHJvcGVydGllcy5zaGFkZXIgPT09ICdWUk0vVW5saXRUcmFuc3BhcmVudFpXcml0ZSc7XG4gICAgY29uc3QgaXNUcmFuc3BhcmVudCA9IG1hdGVyaWFsUHJvcGVydGllcy5zaGFkZXIgPT09ICdWUk0vVW5saXRUcmFuc3BhcmVudCcgfHwgaXNUcmFuc3BhcmVudFpXcml0ZTtcblxuICAgIGNvbnN0IHJlbmRlclF1ZXVlT2Zmc2V0TnVtYmVyID0gdGhpcy5fdjBQYXJzZVJlbmRlclF1ZXVlKG1hdGVyaWFsUHJvcGVydGllcyk7XG5cbiAgICBjb25zdCBpc0N1dG9mZiA9IG1hdGVyaWFsUHJvcGVydGllcy5zaGFkZXIgPT09ICdWUk0vVW5saXRDdXRvdXQnO1xuICAgIGNvbnN0IGFscGhhTW9kZSA9IGlzVHJhbnNwYXJlbnQgPyAnQkxFTkQnIDogaXNDdXRvZmYgPyAnTUFTSycgOiAnT1BBUVVFJztcbiAgICBjb25zdCBhbHBoYUN1dG9mZiA9IGlzQ3V0b2ZmID8gKG1hdGVyaWFsUHJvcGVydGllcy5mbG9hdFByb3BlcnRpZXM/LlsnX0N1dG9mZiddID8/IDAuNSkgOiB1bmRlZmluZWQ7XG5cbiAgICBjb25zdCB0ZXh0dXJlVHJhbnNmb3JtRXh0ID0gdGhpcy5fcG9ydFRleHR1cmVUcmFuc2Zvcm0obWF0ZXJpYWxQcm9wZXJ0aWVzKTtcblxuICAgIGNvbnN0IGJhc2VDb2xvckZhY3RvciA9IChtYXRlcmlhbFByb3BlcnRpZXMudmVjdG9yUHJvcGVydGllcz8uWydfQ29sb3InXSA/PyBbMS4wLCAxLjAsIDEuMCwgMS4wXSkubWFwKGdhbW1hRU9URik7XG4gICAgY29uc3QgYmFzZUNvbG9yVGV4dHVyZUluZGV4ID0gbWF0ZXJpYWxQcm9wZXJ0aWVzLnRleHR1cmVQcm9wZXJ0aWVzPy5bJ19NYWluVGV4J107XG4gICAgY29uc3QgYmFzZUNvbG9yVGV4dHVyZSA9XG4gICAgICBiYXNlQ29sb3JUZXh0dXJlSW5kZXggIT0gbnVsbFxuICAgICAgICA/IHtcbiAgICAgICAgICAgIGluZGV4OiBiYXNlQ29sb3JUZXh0dXJlSW5kZXgsXG4gICAgICAgICAgICBleHRlbnNpb25zOiB7XG4gICAgICAgICAgICAgIC4uLnRleHR1cmVUcmFuc2Zvcm1FeHQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH1cbiAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICAvLyB1c2UgbXRvb24gaW5zdGVhZCBvZiB1bmxpdCwgc2luY2UgdGhlcmUgbWlnaHQgYmUgVlJNMC4wIHNwZWNpZmljIGZlYXR1cmVzIHRoYXQgYXJlIG5vdCBzdXBwb3J0ZWQgYnkgZ2x0ZlxuICAgIGNvbnN0IG10b29uRXh0ZW5zaW9uOiBWMU1Ub29uU2NoZW1hLlZSTUNNYXRlcmlhbHNNVG9vbiA9IHtcbiAgICAgIHNwZWNWZXJzaW9uOiAnMS4wJyxcbiAgICAgIHRyYW5zcGFyZW50V2l0aFpXcml0ZTogaXNUcmFuc3BhcmVudFpXcml0ZSxcbiAgICAgIHJlbmRlclF1ZXVlT2Zmc2V0TnVtYmVyLFxuICAgICAgc2hhZGVDb2xvckZhY3RvcjogYmFzZUNvbG9yRmFjdG9yLFxuICAgICAgc2hhZGVNdWx0aXBseVRleHR1cmU6IGJhc2VDb2xvclRleHR1cmUsXG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAuLi5zY2hlbWFNYXRlcmlhbCxcblxuICAgICAgcGJyTWV0YWxsaWNSb3VnaG5lc3M6IHtcbiAgICAgICAgYmFzZUNvbG9yRmFjdG9yLFxuICAgICAgICBiYXNlQ29sb3JUZXh0dXJlLFxuICAgICAgfSxcbiAgICAgIGFscGhhTW9kZSxcbiAgICAgIGFscGhhQ3V0b2ZmLFxuICAgICAgZXh0ZW5zaW9uczoge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXG4gICAgICAgIFZSTUNfbWF0ZXJpYWxzX210b29uOiBtdG9vbkV4dGVuc2lvbixcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBnbFRGIGBLSFJfdGV4dHVyZV90cmFuc2Zvcm1gIGV4dGVuc2lvbiBmcm9tIHYwIHRleHR1cmUgdHJhbnNmb3JtIGluZm8uXG4gICAqL1xuICBwcml2YXRlIF9wb3J0VGV4dHVyZVRyYW5zZm9ybShtYXRlcmlhbFByb3BlcnRpZXM6IFYwTWF0ZXJpYWwpOiB7IFtuYW1lOiBzdHJpbmddOiBhbnkgfSB7XG4gICAgY29uc3QgdGV4dHVyZVRyYW5zZm9ybSA9IG1hdGVyaWFsUHJvcGVydGllcy52ZWN0b3JQcm9wZXJ0aWVzPy5bJ19NYWluVGV4J107XG4gICAgaWYgKHRleHR1cmVUcmFuc2Zvcm0gPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHt9O1xuICAgIH1cblxuICAgIGNvbnN0IG9mZnNldCA9IFt0ZXh0dXJlVHJhbnNmb3JtPy5bMF0gPz8gMC4wLCB0ZXh0dXJlVHJhbnNmb3JtPy5bMV0gPz8gMC4wXTtcbiAgICBjb25zdCBzY2FsZSA9IFt0ZXh0dXJlVHJhbnNmb3JtPy5bMl0gPz8gMS4wLCB0ZXh0dXJlVHJhbnNmb3JtPy5bM10gPz8gMS4wXTtcblxuICAgIG9mZnNldFsxXSA9IDEuMCAtIHNjYWxlWzFdIC0gb2Zmc2V0WzFdO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cbiAgICAgIEtIUl90ZXh0dXJlX3RyYW5zZm9ybTogeyBvZmZzZXQsIHNjYWxlIH0sXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0IHYwIHJlbmRlciBvcmRlciBpbnRvIHYxIHJlbmRlciBvcmRlci5cbiAgICogVGhpcyB1c2VzIGEgbWFwIGZyb20gdjAgcmVuZGVyIHF1ZXVlIHRvIHYxIGNvbXBsaWFudCByZW5kZXIgcXVldWUgb2Zmc2V0IHdoaWNoIGlzIGdlbmVyYXRlZCBpbiB7QGxpbmsgX3BvcHVsYXRlUmVuZGVyUXVldWVNYXB9LlxuICAgKi9cbiAgcHJpdmF0ZSBfdjBQYXJzZVJlbmRlclF1ZXVlKG1hdGVyaWFsUHJvcGVydGllczogVjBNYXRlcmlhbCk6IG51bWJlciB7XG4gICAgY29uc3QgaXNUcmFuc3BhcmVudFpXcml0ZSA9IG1hdGVyaWFsUHJvcGVydGllcy5zaGFkZXIgPT09ICdWUk0vVW5saXRUcmFuc3BhcmVudFpXcml0ZSc7XG4gICAgY29uc3QgaXNUcmFuc3BhcmVudCA9XG4gICAgICBtYXRlcmlhbFByb3BlcnRpZXMua2V5d29yZE1hcD8uWydfQUxQSEFCTEVORF9PTiddICE9IHVuZGVmaW5lZCB8fFxuICAgICAgbWF0ZXJpYWxQcm9wZXJ0aWVzLnNoYWRlciA9PT0gJ1ZSTS9VbmxpdFRyYW5zcGFyZW50JyB8fFxuICAgICAgaXNUcmFuc3BhcmVudFpXcml0ZTtcbiAgICBjb25zdCBlbmFibGVkWldyaXRlID0gbWF0ZXJpYWxQcm9wZXJ0aWVzLmZsb2F0UHJvcGVydGllcz8uWydfWldyaXRlJ10gPT09IDEgfHwgaXNUcmFuc3BhcmVudFpXcml0ZTtcblxuICAgIGxldCBvZmZzZXQgPSAwO1xuXG4gICAgaWYgKGlzVHJhbnNwYXJlbnQpIHtcbiAgICAgIGNvbnN0IHYwUXVldWUgPSBtYXRlcmlhbFByb3BlcnRpZXMucmVuZGVyUXVldWU7XG5cbiAgICAgIGlmICh2MFF1ZXVlICE9IG51bGwpIHtcbiAgICAgICAgaWYgKGVuYWJsZWRaV3JpdGUpIHtcbiAgICAgICAgICBvZmZzZXQgPSB0aGlzLl9yZW5kZXJRdWV1ZU1hcFRyYW5zcGFyZW50WldyaXRlLmdldCh2MFF1ZXVlKSE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb2Zmc2V0ID0gdGhpcy5fcmVuZGVyUXVldWVNYXBUcmFuc3BhcmVudC5nZXQodjBRdWV1ZSkhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9mZnNldDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBtYXAgd2hpY2ggbWFwcyB2MCByZW5kZXIgcXVldWUgdG8gdjEgY29tcGxpYW50IHJlbmRlciBxdWV1ZSBvZmZzZXQuXG4gICAqIFRoaXMgbGlzdHMgdXAgYWxsIHJlbmRlciBxdWV1ZXMgdGhlIG1vZGVsIHVzZSBhbmQgY3JlYXRlcyBhIG1hcCB0byBuZXcgcmVuZGVyIHF1ZXVlIG9mZnNldHMgaW4gdGhlIHNhbWUgb3JkZXIuXG4gICAqL1xuICBwcml2YXRlIF9wb3B1bGF0ZVJlbmRlclF1ZXVlTWFwKG1hdGVyaWFsUHJvcGVydGllc0xpc3Q6IFYwTWF0ZXJpYWxbXSkge1xuICAgIC8qKlxuICAgICAqIEEgc2V0IG9mIHVzZWQgcmVuZGVyIHF1ZXVlcyBpbiBUcmFuc3BhcmVudCBtYXRlcmlhbHMuXG4gICAgICovXG4gICAgY29uc3QgcmVuZGVyUXVldWVzVHJhbnNwYXJlbnQgPSBuZXcgU2V0PG51bWJlcj4oKTtcblxuICAgIC8qKlxuICAgICAqIEEgc2V0IG9mIHVzZWQgcmVuZGVyIHF1ZXVlcyBpbiBUcmFuc3BhcmVudFpXcml0ZSBtYXRlcmlhbHMuXG4gICAgICovXG4gICAgY29uc3QgcmVuZGVyUXVldWVzVHJhbnNwYXJlbnRaV3JpdGUgPSBuZXcgU2V0PG51bWJlcj4oKTtcblxuICAgIC8vIHBvcHVsYXRlIHRoZSByZW5kZXIgcXVldWUgc2V0XG4gICAgbWF0ZXJpYWxQcm9wZXJ0aWVzTGlzdC5mb3JFYWNoKChtYXRlcmlhbFByb3BlcnRpZXMpID0+IHtcbiAgICAgIGNvbnN0IGlzVHJhbnNwYXJlbnRaV3JpdGUgPSBtYXRlcmlhbFByb3BlcnRpZXMuc2hhZGVyID09PSAnVlJNL1VubGl0VHJhbnNwYXJlbnRaV3JpdGUnO1xuICAgICAgY29uc3QgaXNUcmFuc3BhcmVudCA9XG4gICAgICAgIG1hdGVyaWFsUHJvcGVydGllcy5rZXl3b3JkTWFwPy5bJ19BTFBIQUJMRU5EX09OJ10gIT0gdW5kZWZpbmVkIHx8XG4gICAgICAgIG1hdGVyaWFsUHJvcGVydGllcy5zaGFkZXIgPT09ICdWUk0vVW5saXRUcmFuc3BhcmVudCcgfHxcbiAgICAgICAgaXNUcmFuc3BhcmVudFpXcml0ZTtcbiAgICAgIGNvbnN0IGVuYWJsZWRaV3JpdGUgPSBtYXRlcmlhbFByb3BlcnRpZXMuZmxvYXRQcm9wZXJ0aWVzPy5bJ19aV3JpdGUnXSA9PT0gMSB8fCBpc1RyYW5zcGFyZW50WldyaXRlO1xuXG4gICAgICBpZiAoaXNUcmFuc3BhcmVudCkge1xuICAgICAgICBjb25zdCB2MFF1ZXVlID0gbWF0ZXJpYWxQcm9wZXJ0aWVzLnJlbmRlclF1ZXVlO1xuXG4gICAgICAgIGlmICh2MFF1ZXVlICE9IG51bGwpIHtcbiAgICAgICAgICBpZiAoZW5hYmxlZFpXcml0ZSkge1xuICAgICAgICAgICAgcmVuZGVyUXVldWVzVHJhbnNwYXJlbnRaV3JpdGUuYWRkKHYwUXVldWUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZW5kZXJRdWV1ZXNUcmFuc3BhcmVudC5hZGQodjBRdWV1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBzaG93IGEgd2FybmluZyBpZiB0aGUgbW9kZWwgdXNlcyB2MSBpbmNvbXBhdGlibGUgbnVtYmVyIG9mIHJlbmRlciBxdWV1ZXNcbiAgICBpZiAocmVuZGVyUXVldWVzVHJhbnNwYXJlbnQuc2l6ZSA+IDEwKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIGBWUk1NYXRlcmlhbHNWMENvbXBhdFBsdWdpbjogVGhpcyBWUk0gdXNlcyAke3JlbmRlclF1ZXVlc1RyYW5zcGFyZW50LnNpemV9IHJlbmRlciBxdWV1ZXMgZm9yIFRyYW5zcGFyZW50IG1hdGVyaWFscyB3aGlsZSBWUk0gMS4wIG9ubHkgc3VwcG9ydHMgdXAgdG8gMTAgcmVuZGVyIHF1ZXVlcy4gVGhlIG1vZGVsIG1pZ2h0IG5vdCBiZSByZW5kZXJlZCBjb3JyZWN0bHkuYCxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHJlbmRlclF1ZXVlc1RyYW5zcGFyZW50WldyaXRlLnNpemUgPiAxMCkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBgVlJNTWF0ZXJpYWxzVjBDb21wYXRQbHVnaW46IFRoaXMgVlJNIHVzZXMgJHtyZW5kZXJRdWV1ZXNUcmFuc3BhcmVudFpXcml0ZS5zaXplfSByZW5kZXIgcXVldWVzIGZvciBUcmFuc3BhcmVudFpXcml0ZSBtYXRlcmlhbHMgd2hpbGUgVlJNIDEuMCBvbmx5IHN1cHBvcnRzIHVwIHRvIDEwIHJlbmRlciBxdWV1ZXMuIFRoZSBtb2RlbCBtaWdodCBub3QgYmUgcmVuZGVyZWQgY29ycmVjdGx5LmAsXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIGNyZWF0ZSBhIG1hcCBmcm9tIHYwIHJlbmRlciBxdWV1ZSB0byB2MSByZW5kZXIgcXVldWUgb2Zmc2V0XG4gICAgQXJyYXkuZnJvbShyZW5kZXJRdWV1ZXNUcmFuc3BhcmVudClcbiAgICAgIC5zb3J0KClcbiAgICAgIC5mb3JFYWNoKChxdWV1ZSwgaSkgPT4ge1xuICAgICAgICBjb25zdCBuZXdRdWV1ZU9mZnNldCA9IE1hdGgubWluKE1hdGgubWF4KGkgLSByZW5kZXJRdWV1ZXNUcmFuc3BhcmVudC5zaXplICsgMSwgLTkpLCAwKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyUXVldWVNYXBUcmFuc3BhcmVudC5zZXQocXVldWUsIG5ld1F1ZXVlT2Zmc2V0KTtcbiAgICAgIH0pO1xuXG4gICAgQXJyYXkuZnJvbShyZW5kZXJRdWV1ZXNUcmFuc3BhcmVudFpXcml0ZSlcbiAgICAgIC5zb3J0KClcbiAgICAgIC5mb3JFYWNoKChxdWV1ZSwgaSkgPT4ge1xuICAgICAgICBjb25zdCBuZXdRdWV1ZU9mZnNldCA9IE1hdGgubWluKE1hdGgubWF4KGksIDApLCA5KTtcbiAgICAgICAgdGhpcy5fcmVuZGVyUXVldWVNYXBUcmFuc3BhcmVudFpXcml0ZS5zZXQocXVldWUsIG5ld1F1ZXVlT2Zmc2V0KTtcbiAgICAgIH0pO1xuICB9XG59XG4iLCAiZXhwb3J0IGZ1bmN0aW9uIGdhbW1hRU9URihlOiBudW1iZXIpOiBudW1iZXIge1xuICByZXR1cm4gTWF0aC5wb3coZSwgMi4yKTtcbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1Ob2RlQ29uc3RyYWludCB9IGZyb20gJy4uL1ZSTU5vZGVDb25zdHJhaW50JztcblxuY29uc3QgX3YzQSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbmV4cG9ydCBjbGFzcyBWUk1Ob2RlQ29uc3RyYWludEhlbHBlciBleHRlbmRzIFRIUkVFLkdyb3VwIHtcbiAgcHVibGljIHJlYWRvbmx5IGNvbnN0cmFpbnQ6IFZSTU5vZGVDb25zdHJhaW50O1xuICBwcml2YXRlIF9saW5lOiBUSFJFRS5MaW5lO1xuICBwcml2YXRlIF9hdHRyUG9zaXRpb246IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZTtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoY29uc3RyYWludDogVlJNTm9kZUNvbnN0cmFpbnQpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5fYXR0clBvc2l0aW9uID0gbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShuZXcgRmxvYXQzMkFycmF5KFswLCAwLCAwLCAwLCAwLCAwXSksIDMpO1xuICAgIHRoaXMuX2F0dHJQb3NpdGlvbi5zZXRVc2FnZShUSFJFRS5EeW5hbWljRHJhd1VzYWdlKTtcblxuICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IFRIUkVFLkJ1ZmZlckdlb21ldHJ5KCk7XG4gICAgZ2VvbWV0cnkuc2V0QXR0cmlidXRlKCdwb3NpdGlvbicsIHRoaXMuX2F0dHJQb3NpdGlvbik7XG5cbiAgICBjb25zdCBtYXRlcmlhbCA9IG5ldyBUSFJFRS5MaW5lQmFzaWNNYXRlcmlhbCh7XG4gICAgICBjb2xvcjogMHhmZjAwZmYsXG4gICAgICBkZXB0aFRlc3Q6IGZhbHNlLFxuICAgICAgZGVwdGhXcml0ZTogZmFsc2UsXG4gICAgfSk7XG5cbiAgICB0aGlzLl9saW5lID0gbmV3IFRIUkVFLkxpbmUoZ2VvbWV0cnksIG1hdGVyaWFsKTtcbiAgICB0aGlzLmFkZCh0aGlzLl9saW5lKTtcblxuICAgIHRoaXMuY29uc3RyYWludCA9IGNvbnN0cmFpbnQ7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlTWF0cml4V29ybGQoZm9yY2U/OiBib29sZWFuKTogdm9pZCB7XG4gICAgX3YzQS5zZXRGcm9tTWF0cml4UG9zaXRpb24odGhpcy5jb25zdHJhaW50LmRlc3RpbmF0aW9uLm1hdHJpeFdvcmxkKTtcbiAgICB0aGlzLl9hdHRyUG9zaXRpb24uc2V0WFlaKDAsIF92M0EueCwgX3YzQS55LCBfdjNBLnopO1xuXG4gICAgaWYgKHRoaXMuY29uc3RyYWludC5zb3VyY2UpIHtcbiAgICAgIF92M0Euc2V0RnJvbU1hdHJpeFBvc2l0aW9uKHRoaXMuY29uc3RyYWludC5zb3VyY2UubWF0cml4V29ybGQpO1xuICAgIH1cbiAgICB0aGlzLl9hdHRyUG9zaXRpb24uc2V0WFlaKDEsIF92M0EueCwgX3YzQS55LCBfdjNBLnopO1xuXG4gICAgdGhpcy5fYXR0clBvc2l0aW9uLm5lZWRzVXBkYXRlID0gdHJ1ZTtcblxuICAgIHN1cGVyLnVwZGF0ZU1hdHJpeFdvcmxkKGZvcmNlKTtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IGRlY29tcG9zZVBvc2l0aW9uIH0gZnJvbSAnLi91dGlscy9kZWNvbXBvc2VQb3NpdGlvbic7XG5pbXBvcnQgeyBkZWNvbXBvc2VSb3RhdGlvbiB9IGZyb20gJy4vdXRpbHMvZGVjb21wb3NlUm90YXRpb24nO1xuaW1wb3J0IHsgcXVhdEludmVydENvbXBhdCB9IGZyb20gJy4vdXRpbHMvcXVhdEludmVydENvbXBhdCc7XG5pbXBvcnQgeyBWUk1Ob2RlQ29uc3RyYWludCB9IGZyb20gJy4vVlJNTm9kZUNvbnN0cmFpbnQnO1xuXG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF92M0IgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3YzQyA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfcXVhdEEgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuY29uc3QgX3F1YXRCID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbmNvbnN0IF9xdWF0QyA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5cbi8qKlxuICogQSBjb25zdHJhaW50IHRoYXQgbWFrZXMgaXQgbG9vayBhdCBhIHNvdXJjZSBvYmplY3QuXG4gKlxuICogU2VlOiBodHRwczovL2dpdGh1Yi5jb20vdnJtLWMvdnJtLXNwZWNpZmljYXRpb24vdHJlZS9tYXN0ZXIvc3BlY2lmaWNhdGlvbi9WUk1DX25vZGVfY29uc3RyYWludC0xLjBfYmV0YSNyb2xsLWNvbnN0cmFpbnRcbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUFpbUNvbnN0cmFpbnQgZXh0ZW5kcyBWUk1Ob2RlQ29uc3RyYWludCB7XG4gIC8qKlxuICAgKiBUaGUgYWltIGF4aXMgb2YgdGhlIGNvbnN0cmFpbnQuXG4gICAqL1xuICBwdWJsaWMgZ2V0IGFpbUF4aXMoKTogJ1Bvc2l0aXZlWCcgfCAnTmVnYXRpdmVYJyB8ICdQb3NpdGl2ZVknIHwgJ05lZ2F0aXZlWScgfCAnUG9zaXRpdmVaJyB8ICdOZWdhdGl2ZVonIHtcbiAgICByZXR1cm4gdGhpcy5fYWltQXhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgYWltIGF4aXMgb2YgdGhlIGNvbnN0cmFpbnQuXG4gICAqL1xuICBwdWJsaWMgc2V0IGFpbUF4aXMoYWltQXhpczogJ1Bvc2l0aXZlWCcgfCAnTmVnYXRpdmVYJyB8ICdQb3NpdGl2ZVknIHwgJ05lZ2F0aXZlWScgfCAnUG9zaXRpdmVaJyB8ICdOZWdhdGl2ZVonKSB7XG4gICAgdGhpcy5fYWltQXhpcyA9IGFpbUF4aXM7XG4gICAgdGhpcy5fdjNBaW1BeGlzLnNldChcbiAgICAgIGFpbUF4aXMgPT09ICdQb3NpdGl2ZVgnID8gMS4wIDogYWltQXhpcyA9PT0gJ05lZ2F0aXZlWCcgPyAtMS4wIDogMC4wLFxuICAgICAgYWltQXhpcyA9PT0gJ1Bvc2l0aXZlWScgPyAxLjAgOiBhaW1BeGlzID09PSAnTmVnYXRpdmVZJyA/IC0xLjAgOiAwLjAsXG4gICAgICBhaW1BeGlzID09PSAnUG9zaXRpdmVaJyA/IDEuMCA6IGFpbUF4aXMgPT09ICdOZWdhdGl2ZVonID8gLTEuMCA6IDAuMCxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBhaW0gYXhpcyBvZiB0aGUgY29uc3RyYWludC5cbiAgICovXG4gIHByaXZhdGUgX2FpbUF4aXM6ICdQb3NpdGl2ZVgnIHwgJ05lZ2F0aXZlWCcgfCAnUG9zaXRpdmVZJyB8ICdOZWdhdGl2ZVknIHwgJ1Bvc2l0aXZlWicgfCAnTmVnYXRpdmVaJztcblxuICAvKipcbiAgICogVGhlIHtAbGluayBfYWltQXhpc30gYnV0IGluIGFuIGFjdHVhbCBWZWN0b3IzIGZvcm0uXG4gICAqL1xuICBwcml2YXRlIF92M0FpbUF4aXM6IFRIUkVFLlZlY3RvcjM7XG5cbiAgLyoqXG4gICAqIFRoZSByZXN0IHF1YXRlcm5pb24gb2YgdGhlIHtAbGluayBkZXN0aW5hdGlvbn0uXG4gICAqL1xuICBwcml2YXRlIF9kc3RSZXN0UXVhdDogVEhSRUUuUXVhdGVybmlvbjtcblxuICBwdWJsaWMgZ2V0IGRlcGVuZGVuY2llcygpOiBTZXQ8VEhSRUUuT2JqZWN0M0Q+IHtcbiAgICBjb25zdCBzZXQgPSBuZXcgU2V0PFRIUkVFLk9iamVjdDNEPihbdGhpcy5zb3VyY2VdKTtcblxuICAgIGlmICh0aGlzLmRlc3RpbmF0aW9uLnBhcmVudCkge1xuICAgICAgc2V0LmFkZCh0aGlzLmRlc3RpbmF0aW9uLnBhcmVudCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNldDtcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogVEhSRUUuT2JqZWN0M0QsIHNvdXJjZTogVEhSRUUuT2JqZWN0M0QpIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbiwgc291cmNlKTtcblxuICAgIHRoaXMuX2FpbUF4aXMgPSAnUG9zaXRpdmVYJztcbiAgICB0aGlzLl92M0FpbUF4aXMgPSBuZXcgVEhSRUUuVmVjdG9yMygxLCAwLCAwKTtcblxuICAgIHRoaXMuX2RzdFJlc3RRdWF0ID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRJbml0U3RhdGUoKTogdm9pZCB7XG4gICAgdGhpcy5fZHN0UmVzdFF1YXQuY29weSh0aGlzLmRlc3RpbmF0aW9uLnF1YXRlcm5pb24pO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICAvLyB1cGRhdGUgd29ybGQgbWF0cml4IG9mIGRlc3RpbmF0aW9uIGFuZCBzb3VyY2UgbWFudWFsbHlcbiAgICB0aGlzLmRlc3RpbmF0aW9uLnVwZGF0ZVdvcmxkTWF0cml4KHRydWUsIGZhbHNlKTtcbiAgICB0aGlzLnNvdXJjZS51cGRhdGVXb3JsZE1hdHJpeCh0cnVlLCBmYWxzZSk7XG5cbiAgICAvLyBnZXQgd29ybGQgcXVhdGVybmlvbiBvZiB0aGUgcGFyZW50IG9mIHRoZSBkZXN0aW5hdGlvblxuICAgIGNvbnN0IGRzdFBhcmVudFdvcmxkUXVhdCA9IF9xdWF0QS5pZGVudGl0eSgpO1xuICAgIGNvbnN0IGludkRzdFBhcmVudFdvcmxkUXVhdCA9IF9xdWF0Qi5pZGVudGl0eSgpO1xuICAgIGlmICh0aGlzLmRlc3RpbmF0aW9uLnBhcmVudCkge1xuICAgICAgZGVjb21wb3NlUm90YXRpb24odGhpcy5kZXN0aW5hdGlvbi5wYXJlbnQubWF0cml4V29ybGQsIGRzdFBhcmVudFdvcmxkUXVhdCk7XG4gICAgICBxdWF0SW52ZXJ0Q29tcGF0KGludkRzdFBhcmVudFdvcmxkUXVhdC5jb3B5KGRzdFBhcmVudFdvcmxkUXVhdCkpO1xuICAgIH1cblxuICAgIC8vIGNhbGN1bGF0ZSBmcm9tLXRvIHZlY3RvcnMgaW4gd29ybGQgY29vcmRcbiAgICBjb25zdCBhMCA9IF92M0EuY29weSh0aGlzLl92M0FpbUF4aXMpLmFwcGx5UXVhdGVybmlvbih0aGlzLl9kc3RSZXN0UXVhdCkuYXBwbHlRdWF0ZXJuaW9uKGRzdFBhcmVudFdvcmxkUXVhdCk7XG4gICAgY29uc3QgYTEgPSBkZWNvbXBvc2VQb3NpdGlvbih0aGlzLnNvdXJjZS5tYXRyaXhXb3JsZCwgX3YzQilcbiAgICAgIC5zdWIoZGVjb21wb3NlUG9zaXRpb24odGhpcy5kZXN0aW5hdGlvbi5tYXRyaXhXb3JsZCwgX3YzQykpXG4gICAgICAubm9ybWFsaXplKCk7XG5cbiAgICAvLyBjcmVhdGUgYSBmcm9tLXRvIHF1YXRlcm5pb24sIGNvbnZlcnQgdG8gZGVzdGluYXRpb24gbG9jYWwgY29vcmQsIHRoZW4gbXVsdGlwbHkgcmVzdCBxdWF0ZXJuaW9uXG4gICAgY29uc3QgdGFyZ2V0UXVhdCA9IF9xdWF0Q1xuICAgICAgLnNldEZyb21Vbml0VmVjdG9ycyhhMCwgYTEpXG4gICAgICAucHJlbXVsdGlwbHkoaW52RHN0UGFyZW50V29ybGRRdWF0KVxuICAgICAgLm11bHRpcGx5KGRzdFBhcmVudFdvcmxkUXVhdClcbiAgICAgIC5tdWx0aXBseSh0aGlzLl9kc3RSZXN0UXVhdCk7XG5cbiAgICAvLyBibGVuZCB3aXRoIHRoZSByZXN0IHF1YXRlcm5pb24gdXNpbmcgd2VpZ2h0XG4gICAgdGhpcy5kZXN0aW5hdGlvbi5xdWF0ZXJuaW9uLmNvcHkodGhpcy5fZHN0UmVzdFF1YXQpLnNsZXJwKHRhcmdldFF1YXQsIHRoaXMud2VpZ2h0KTtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGRlY29tcG9zZVBvc2l0aW9uPFQgZXh0ZW5kcyBUSFJFRS5WZWN0b3IzPihtYXRyaXg6IFRIUkVFLk1hdHJpeDQsIHRhcmdldDogVCk6IFQge1xuICByZXR1cm4gdGFyZ2V0LnNldChtYXRyaXguZWxlbWVudHNbMTJdLCBtYXRyaXguZWxlbWVudHNbMTNdLCBtYXRyaXguZWxlbWVudHNbMTRdKTtcbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3YzQiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWNvbXBvc2VSb3RhdGlvbjxUIGV4dGVuZHMgVEhSRUUuUXVhdGVybmlvbj4obWF0cml4OiBUSFJFRS5NYXRyaXg0LCB0YXJnZXQ6IFQpOiBUIHtcbiAgbWF0cml4LmRlY29tcG9zZShfdjNBLCB0YXJnZXQsIF92M0IpO1xuICByZXR1cm4gdGFyZ2V0O1xufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBBIGNvbXBhdCBmdW5jdGlvbiBmb3IgYFF1YXRlcm5pb24uaW52ZXJ0KClgIC8gYFF1YXRlcm5pb24uaW52ZXJzZSgpYC5cbiAqIGBRdWF0ZXJuaW9uLmludmVydCgpYCBpcyBpbnRyb2R1Y2VkIGluIHIxMjMgYW5kIGBRdWF0ZXJuaW9uLmludmVyc2UoKWAgZW1pdHMgYSB3YXJuaW5nLlxuICogV2UgYXJlIGdvaW5nIHRvIHVzZSB0aGlzIGNvbXBhdCBmb3IgYSB3aGlsZS5cbiAqIEBwYXJhbSB0YXJnZXQgQSB0YXJnZXQgcXVhdGVybmlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gcXVhdEludmVydENvbXBhdDxUIGV4dGVuZHMgVEhSRUUuUXVhdGVybmlvbj4odGFyZ2V0OiBUKTogVCB7XG4gIGlmICgodGFyZ2V0IGFzIGFueSkuaW52ZXJ0KSB7XG4gICAgdGFyZ2V0LmludmVydCgpO1xuICB9IGVsc2Uge1xuICAgICh0YXJnZXQgYXMgYW55KS5pbnZlcnNlKCk7XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBBIGJhc2UgY2xhc3Mgb2YgVlJNIGNvbnN0cmFpbnQgY2xhc3Nlcy5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFZSTU5vZGVDb25zdHJhaW50IHtcbiAgLyoqXG4gICAqIFRoZSBvYmplY3QgYmVpbmcgY29uc3RyYWluZWQgYnkgdGhlIHtAbGluayBzb3VyY2V9LlxuICAgKi9cbiAgcHVibGljIGRlc3RpbmF0aW9uOiBUSFJFRS5PYmplY3QzRDtcblxuICAvKipcbiAgICogVGhlIG9iamVjdCBjb25zdHJhaW5zIHRoZSB7QGxpbmsgZGVzdGluYXRpb259LlxuICAgKi9cbiAgcHVibGljIHNvdXJjZTogVEhSRUUuT2JqZWN0M0Q7XG5cbiAgLyoqXG4gICAqIFRoZSB3ZWlnaHQgb2YgdGhlIGNvbnN0cmFpbnQuXG4gICAqL1xuICBwdWJsaWMgd2VpZ2h0OiBudW1iZXI7XG5cbiAgcHVibGljIGFic3RyYWN0IGdldCBkZXBlbmRlbmNpZXMoKTogU2V0PFRIUkVFLk9iamVjdDNEPjtcblxuICAvKipcbiAgICogQHBhcmFtIGRlc3RpbmF0aW9uIFRoZSBkZXN0aW5hdGlvbiBvYmplY3RcbiAgICogQHBhcmFtIHNvdXJjZSBUaGUgc291cmNlIG9iamVjdFxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBUSFJFRS5PYmplY3QzRCwgc291cmNlOiBUSFJFRS5PYmplY3QzRCkge1xuICAgIHRoaXMuZGVzdGluYXRpb24gPSBkZXN0aW5hdGlvbjtcbiAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcblxuICAgIHRoaXMud2VpZ2h0ID0gMS4wO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBpbml0aWFsIHN0YXRlIG9mIHRoZSBjb25zdHJhaW50LlxuICAgKi9cbiAgcHVibGljIGFic3RyYWN0IHNldEluaXRTdGF0ZSgpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBVcGRhdGUgYW5kIGFwcGx5IHRoZSBjb25zdHJhaW50LlxuICAgKi9cbiAgcHVibGljIGFic3RyYWN0IHVwZGF0ZSgpOiB2b2lkO1xufVxuIiwgImltcG9ydCB0eXBlICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIFRyYXZlcnNlIGFuY2VzdG9ycyBvZiBnaXZlbiBvYmplY3QgYW5kIGNhbGwgZ2l2ZW4gY2FsbGJhY2sgZnJvbSByb290IHNpZGUuXG4gKiBJdCB3aWxsIGluY2x1ZGUgdGhlIGdpdmVuIG9iamVjdCBpdHNlbGYuXG4gKlxuICogQHBhcmFtIG9iamVjdCBUaGUgb2JqZWN0IHlvdSB3YW50IHRvIHRyYXZlcnNlXG4gKiBAcGFyYW0gY2FsbGJhY2sgVGhlIGNhbGwgYmFjayBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgY2FsbGVkIGZvciBlYWNoIGFuY2VzdG9yc1xuICovXG5leHBvcnQgZnVuY3Rpb24gdHJhdmVyc2VBbmNlc3RvcnNGcm9tUm9vdChvYmplY3Q6IFRIUkVFLk9iamVjdDNELCBjYWxsYmFjazogKG9iamVjdDogVEhSRUUuT2JqZWN0M0QpID0+IHZvaWQpOiB2b2lkIHtcbiAgY29uc3QgYW5jZXN0b3JzOiBUSFJFRS5PYmplY3QzRFtdID0gW29iamVjdF07XG5cbiAgbGV0IGhlYWQ6IFRIUkVFLk9iamVjdDNEIHwgbnVsbCA9IG9iamVjdC5wYXJlbnQ7XG4gIHdoaWxlIChoZWFkICE9PSBudWxsKSB7XG4gICAgYW5jZXN0b3JzLnVuc2hpZnQoaGVhZCk7XG4gICAgaGVhZCA9IGhlYWQucGFyZW50O1xuICB9XG5cbiAgYW5jZXN0b3JzLmZvckVhY2goKGFuY2VzdG9yKSA9PiB7XG4gICAgY2FsbGJhY2soYW5jZXN0b3IpO1xuICB9KTtcbn1cbiIsICJpbXBvcnQgdHlwZSAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB0eXBlIHsgVlJNTm9kZUNvbnN0cmFpbnQgfSBmcm9tICcuL1ZSTU5vZGVDb25zdHJhaW50JztcbmltcG9ydCB7IHRyYXZlcnNlQW5jZXN0b3JzRnJvbVJvb3QgfSBmcm9tICcuL3V0aWxzL3RyYXZlcnNlQW5jZXN0b3JzRnJvbVJvb3QnO1xuXG5leHBvcnQgY2xhc3MgVlJNTm9kZUNvbnN0cmFpbnRNYW5hZ2VyIHtcbiAgcHJpdmF0ZSBfY29uc3RyYWludHMgPSBuZXcgU2V0PFZSTU5vZGVDb25zdHJhaW50PigpO1xuICBwdWJsaWMgZ2V0IGNvbnN0cmFpbnRzKCk6IFNldDxWUk1Ob2RlQ29uc3RyYWludD4ge1xuICAgIHJldHVybiB0aGlzLl9jb25zdHJhaW50cztcbiAgfVxuXG4gIHByaXZhdGUgX29iamVjdENvbnN0cmFpbnRzTWFwID0gbmV3IE1hcDxUSFJFRS5PYmplY3QzRCwgU2V0PFZSTU5vZGVDb25zdHJhaW50Pj4oKTtcblxuICBwdWJsaWMgYWRkQ29uc3RyYWludChjb25zdHJhaW50OiBWUk1Ob2RlQ29uc3RyYWludCk6IHZvaWQge1xuICAgIHRoaXMuX2NvbnN0cmFpbnRzLmFkZChjb25zdHJhaW50KTtcblxuICAgIGxldCBvYmplY3RTZXQgPSB0aGlzLl9vYmplY3RDb25zdHJhaW50c01hcC5nZXQoY29uc3RyYWludC5kZXN0aW5hdGlvbik7XG4gICAgaWYgKG9iamVjdFNldCA9PSBudWxsKSB7XG4gICAgICBvYmplY3RTZXQgPSBuZXcgU2V0PFZSTU5vZGVDb25zdHJhaW50PigpO1xuICAgICAgdGhpcy5fb2JqZWN0Q29uc3RyYWludHNNYXAuc2V0KGNvbnN0cmFpbnQuZGVzdGluYXRpb24sIG9iamVjdFNldCk7XG4gICAgfVxuICAgIG9iamVjdFNldC5hZGQoY29uc3RyYWludCk7XG4gIH1cblxuICBwdWJsaWMgZGVsZXRlQ29uc3RyYWludChjb25zdHJhaW50OiBWUk1Ob2RlQ29uc3RyYWludCk6IHZvaWQge1xuICAgIHRoaXMuX2NvbnN0cmFpbnRzLmRlbGV0ZShjb25zdHJhaW50KTtcblxuICAgIGNvbnN0IG9iamVjdFNldCA9IHRoaXMuX29iamVjdENvbnN0cmFpbnRzTWFwLmdldChjb25zdHJhaW50LmRlc3RpbmF0aW9uKSE7XG4gICAgb2JqZWN0U2V0LmRlbGV0ZShjb25zdHJhaW50KTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRJbml0U3RhdGUoKTogdm9pZCB7XG4gICAgY29uc3QgY29uc3RyYWludHNUcmllZCA9IG5ldyBTZXQ8VlJNTm9kZUNvbnN0cmFpbnQ+KCk7XG4gICAgY29uc3QgY29uc3RyYWludHNEb25lID0gbmV3IFNldDxWUk1Ob2RlQ29uc3RyYWludD4oKTtcblxuICAgIGZvciAoY29uc3QgY29uc3RyYWludCBvZiB0aGlzLl9jb25zdHJhaW50cykge1xuICAgICAgdGhpcy5fcHJvY2Vzc0NvbnN0cmFpbnQoY29uc3RyYWludCwgY29uc3RyYWludHNUcmllZCwgY29uc3RyYWludHNEb25lLCAoY29uc3RyYWludCkgPT4gY29uc3RyYWludC5zZXRJbml0U3RhdGUoKSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBjb25zdCBjb25zdHJhaW50c1RyaWVkID0gbmV3IFNldDxWUk1Ob2RlQ29uc3RyYWludD4oKTtcbiAgICBjb25zdCBjb25zdHJhaW50c0RvbmUgPSBuZXcgU2V0PFZSTU5vZGVDb25zdHJhaW50PigpO1xuXG4gICAgZm9yIChjb25zdCBjb25zdHJhaW50IG9mIHRoaXMuX2NvbnN0cmFpbnRzKSB7XG4gICAgICB0aGlzLl9wcm9jZXNzQ29uc3RyYWludChjb25zdHJhaW50LCBjb25zdHJhaW50c1RyaWVkLCBjb25zdHJhaW50c0RvbmUsIChjb25zdHJhaW50KSA9PiBjb25zdHJhaW50LnVwZGF0ZSgpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIGEgY29uc3RyYWludC5cbiAgICogSWYgdGhlcmUgYXJlIG90aGVyIGNvbnN0cmFpbnRzIHRoYXQgYXJlIGRlcGVuZGFudCwgaXQgd2lsbCB0cnkgdG8gdXBkYXRlIHRoZW0gcmVjdXJzaXZlbHkuXG4gICAqIEl0IG1pZ2h0IHRocm93IGFuIGVycm9yIGlmIHRoZXJlIGFyZSBjaXJjdWxhciBkZXBlbmRlbmNpZXMuXG4gICAqXG4gICAqIEludGVuZGVkIHRvIGJlIHVzZWQgaW4ge0BsaW5rIHVwZGF0ZX0gYW5kIHtAbGluayBfcHJvY2Vzc0NvbnN0cmFpbnR9IGl0c2VsZiByZWN1cnNpdmVseS5cbiAgICpcbiAgICogQHBhcmFtIGNvbnN0cmFpbnQgQSBjb25zdHJhaW50IHlvdSB3YW50IHRvIHVwZGF0ZVxuICAgKiBAcGFyYW0gY29uc3RyYWludHNUcmllZCBTZXQgb2YgY29uc3RyYWludHMgdGhhdCBhcmUgYWxyZWFkeSB0cmllZCB0byBiZSB1cGRhdGVkXG4gICAqIEBwYXJhbSBjb25zdHJhaW50c0RvbmUgU2V0IG9mIGNvbnN0cmFpbnRzIHRoYXQgYXJlIGFscmVhZHkgdXAgdG8gZGF0ZVxuICAgKi9cbiAgcHJpdmF0ZSBfcHJvY2Vzc0NvbnN0cmFpbnQoXG4gICAgY29uc3RyYWludDogVlJNTm9kZUNvbnN0cmFpbnQsXG4gICAgY29uc3RyYWludHNUcmllZDogU2V0PFZSTU5vZGVDb25zdHJhaW50PixcbiAgICBjb25zdHJhaW50c0RvbmU6IFNldDxWUk1Ob2RlQ29uc3RyYWludD4sXG4gICAgY2FsbGJhY2s6IChjb25zdHJhaW50OiBWUk1Ob2RlQ29uc3RyYWludCkgPT4gdm9pZCxcbiAgKTogdm9pZCB7XG4gICAgaWYgKGNvbnN0cmFpbnRzRG9uZS5oYXMoY29uc3RyYWludCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoY29uc3RyYWludHNUcmllZC5oYXMoY29uc3RyYWludCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVlJNTm9kZUNvbnN0cmFpbnRNYW5hZ2VyOiBDaXJjdWxhciBkZXBlbmRlbmN5IGRldGVjdGVkIHdoaWxlIHVwZGF0aW5nIGNvbnN0cmFpbnRzJyk7XG4gICAgfVxuICAgIGNvbnN0cmFpbnRzVHJpZWQuYWRkKGNvbnN0cmFpbnQpO1xuXG4gICAgY29uc3QgZGVwT2JqZWN0cyA9IGNvbnN0cmFpbnQuZGVwZW5kZW5jaWVzO1xuICAgIGZvciAoY29uc3QgZGVwT2JqZWN0IG9mIGRlcE9iamVjdHMpIHtcbiAgICAgIHRyYXZlcnNlQW5jZXN0b3JzRnJvbVJvb3QoZGVwT2JqZWN0LCAoZGVwT2JqZWN0QW5jZXN0b3IpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqZWN0U2V0ID0gdGhpcy5fb2JqZWN0Q29uc3RyYWludHNNYXAuZ2V0KGRlcE9iamVjdEFuY2VzdG9yKTtcbiAgICAgICAgaWYgKG9iamVjdFNldCkge1xuICAgICAgICAgIGZvciAoY29uc3QgZGVwQ29uc3RyYWludCBvZiBvYmplY3RTZXQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Byb2Nlc3NDb25zdHJhaW50KGRlcENvbnN0cmFpbnQsIGNvbnN0cmFpbnRzVHJpZWQsIGNvbnN0cmFpbnRzRG9uZSwgY2FsbGJhY2spO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2FsbGJhY2soY29uc3RyYWludCk7XG5cbiAgICBjb25zdHJhaW50c0RvbmUuYWRkKGNvbnN0cmFpbnQpO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgcXVhdEludmVydENvbXBhdCB9IGZyb20gJy4vdXRpbHMvcXVhdEludmVydENvbXBhdCc7XG5pbXBvcnQgeyBWUk1Ob2RlQ29uc3RyYWludCB9IGZyb20gJy4vVlJNTm9kZUNvbnN0cmFpbnQnO1xuXG5jb25zdCBfcXVhdEEgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuY29uc3QgX3F1YXRCID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblxuLyoqXG4gKiBBIGNvbnN0cmFpbnQgdGhhdCB0cmFuc2ZlcnMgYSByb3RhdGlvbiBhcm91bmQgb25lIGF4aXMgb2YgYSBzb3VyY2UuXG4gKlxuICogU2VlOiBodHRwczovL2dpdGh1Yi5jb20vdnJtLWMvdnJtLXNwZWNpZmljYXRpb24vdHJlZS9tYXN0ZXIvc3BlY2lmaWNhdGlvbi9WUk1DX25vZGVfY29uc3RyYWludC0xLjBfYmV0YSNyb2xsLWNvbnN0cmFpbnRcbiAqL1xuZXhwb3J0IGNsYXNzIFZSTVJvdGF0aW9uQ29uc3RyYWludCBleHRlbmRzIFZSTU5vZGVDb25zdHJhaW50IHtcbiAgLyoqXG4gICAqIFRoZSByZXN0IHF1YXRlcm5pb24gb2YgdGhlIHtAbGluayBkZXN0aW5hdGlvbn0uXG4gICAqL1xuICBwcml2YXRlIF9kc3RSZXN0UXVhdDogVEhSRUUuUXVhdGVybmlvbjtcblxuICAvKipcbiAgICogVGhlIGludmVyc2Ugb2YgdGhlIHJlc3QgcXVhdGVybmlvbiBvZiB0aGUge0BsaW5rIHNvdXJjZX0uXG4gICAqL1xuICBwcml2YXRlIF9pbnZTcmNSZXN0UXVhdDogVEhSRUUuUXVhdGVybmlvbjtcblxuICBwdWJsaWMgZ2V0IGRlcGVuZGVuY2llcygpOiBTZXQ8VEhSRUUuT2JqZWN0M0Q+IHtcbiAgICByZXR1cm4gbmV3IFNldChbdGhpcy5zb3VyY2VdKTtcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogVEhSRUUuT2JqZWN0M0QsIHNvdXJjZTogVEhSRUUuT2JqZWN0M0QpIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbiwgc291cmNlKTtcblxuICAgIHRoaXMuX2RzdFJlc3RRdWF0ID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbiAgICB0aGlzLl9pbnZTcmNSZXN0UXVhdCA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG4gIH1cblxuICBwdWJsaWMgc2V0SW5pdFN0YXRlKCk6IHZvaWQge1xuICAgIHRoaXMuX2RzdFJlc3RRdWF0LmNvcHkodGhpcy5kZXN0aW5hdGlvbi5xdWF0ZXJuaW9uKTtcbiAgICBxdWF0SW52ZXJ0Q29tcGF0KHRoaXMuX2ludlNyY1Jlc3RRdWF0LmNvcHkodGhpcy5zb3VyY2UucXVhdGVybmlvbikpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICAvLyBjYWxjdWxhdGUgdGhlIGRlbHRhIHJvdGF0aW9uIGZyb20gdGhlIHJlc3QgYWJvdXQgdGhlIHNvdXJjZVxuICAgIGNvbnN0IHNyY0RlbHRhUXVhdCA9IF9xdWF0QS5jb3B5KHRoaXMuX2ludlNyY1Jlc3RRdWF0KS5tdWx0aXBseSh0aGlzLnNvdXJjZS5xdWF0ZXJuaW9uKTtcblxuICAgIC8vIG11bHRpcGx5IHRoZSBkZWx0YSB0byB0aGUgcmVzdCBvZiB0aGUgZGVzdGluYXRpb25cbiAgICBjb25zdCB0YXJnZXRRdWF0ID0gX3F1YXRCLmNvcHkodGhpcy5fZHN0UmVzdFF1YXQpLm11bHRpcGx5KHNyY0RlbHRhUXVhdCk7XG5cbiAgICAvLyBibGVuZCB3aXRoIHRoZSByZXN0IHF1YXRlcm5pb24gdXNpbmcgd2VpZ2h0XG4gICAgdGhpcy5kZXN0aW5hdGlvbi5xdWF0ZXJuaW9uLmNvcHkodGhpcy5fZHN0UmVzdFF1YXQpLnNsZXJwKHRhcmdldFF1YXQsIHRoaXMud2VpZ2h0KTtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IHF1YXRJbnZlcnRDb21wYXQgfSBmcm9tICcuL3V0aWxzL3F1YXRJbnZlcnRDb21wYXQnO1xuaW1wb3J0IHsgVlJNTm9kZUNvbnN0cmFpbnQgfSBmcm9tICcuL1ZSTU5vZGVDb25zdHJhaW50JztcblxuY29uc3QgX3YzQSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfcXVhdEEgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuY29uc3QgX3F1YXRCID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblxuLyoqXG4gKiBBIGNvbnN0cmFpbnQgdGhhdCB0cmFuc2ZlcnMgYSByb3RhdGlvbiBhcm91bmQgb25lIGF4aXMgb2YgYSBzb3VyY2UuXG4gKlxuICogU2VlOiBodHRwczovL2dpdGh1Yi5jb20vdnJtLWMvdnJtLXNwZWNpZmljYXRpb24vdHJlZS9tYXN0ZXIvc3BlY2lmaWNhdGlvbi9WUk1DX25vZGVfY29uc3RyYWludC0xLjBfYmV0YSNyb2xsLWNvbnN0cmFpbnRcbiAqL1xuZXhwb3J0IGNsYXNzIFZSTVJvbGxDb25zdHJhaW50IGV4dGVuZHMgVlJNTm9kZUNvbnN0cmFpbnQge1xuICAvKipcbiAgICogVGhlIHJvbGwgYXhpcyBvZiB0aGUgY29uc3RyYWludC5cbiAgICovXG4gIHB1YmxpYyBnZXQgcm9sbEF4aXMoKTogJ1gnIHwgJ1knIHwgJ1onIHtcbiAgICByZXR1cm4gdGhpcy5fcm9sbEF4aXM7XG4gIH1cblxuICAvKipcbiAgICogVGhlIHJvbGwgYXhpcyBvZiB0aGUgY29uc3RyYWludC5cbiAgICovXG4gIHB1YmxpYyBzZXQgcm9sbEF4aXMocm9sbEF4aXM6ICdYJyB8ICdZJyB8ICdaJykge1xuICAgIHRoaXMuX3JvbGxBeGlzID0gcm9sbEF4aXM7XG4gICAgdGhpcy5fdjNSb2xsQXhpcy5zZXQocm9sbEF4aXMgPT09ICdYJyA/IDEuMCA6IDAuMCwgcm9sbEF4aXMgPT09ICdZJyA/IDEuMCA6IDAuMCwgcm9sbEF4aXMgPT09ICdaJyA/IDEuMCA6IDAuMCk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIHJvbGwgYXhpcyBvZiB0aGUgY29uc3RyYWludC5cbiAgICovXG4gIHByaXZhdGUgX3JvbGxBeGlzOiAnWCcgfCAnWScgfCAnWic7XG5cbiAgLyoqXG4gICAqIFRoZSB7QGxpbmsgX3JvbGxBeGlzfSBidXQgaW4gYW4gYWN0dWFsIFZlY3RvcjMgZm9ybS5cbiAgICovXG4gIHByaXZhdGUgX3YzUm9sbEF4aXM6IFRIUkVFLlZlY3RvcjM7XG5cbiAgLyoqXG4gICAqIFRoZSByZXN0IHF1YXRlcm5pb24gb2YgdGhlIHtAbGluayBkZXN0aW5hdGlvbn0uXG4gICAqL1xuICBwcml2YXRlIF9kc3RSZXN0UXVhdDogVEhSRUUuUXVhdGVybmlvbjtcblxuICAvKipcbiAgICogVGhlIGludmVyc2Ugb2YgdGhlIHJlc3QgcXVhdGVybmlvbiBvZiB0aGUge0BsaW5rIGRlc3RpbmF0aW9ufS5cbiAgICovXG4gIHByaXZhdGUgX2ludkRzdFJlc3RRdWF0OiBUSFJFRS5RdWF0ZXJuaW9uO1xuXG4gIC8qKlxuICAgKiBgc3JjUmVzdFF1YXQuaW52ZXJ0KCkgKiBkc3RSZXN0UXVhdGAuXG4gICAqL1xuICBwcml2YXRlIF9pbnZTcmNSZXN0UXVhdE11bERzdFJlc3RRdWF0OiBUSFJFRS5RdWF0ZXJuaW9uO1xuXG4gIHB1YmxpYyBnZXQgZGVwZW5kZW5jaWVzKCk6IFNldDxUSFJFRS5PYmplY3QzRD4ge1xuICAgIHJldHVybiBuZXcgU2V0KFt0aGlzLnNvdXJjZV0pO1xuICB9XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBUSFJFRS5PYmplY3QzRCwgc291cmNlOiBUSFJFRS5PYmplY3QzRCkge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uLCBzb3VyY2UpO1xuXG4gICAgdGhpcy5fcm9sbEF4aXMgPSAnWCc7XG4gICAgdGhpcy5fdjNSb2xsQXhpcyA9IG5ldyBUSFJFRS5WZWN0b3IzKDEsIDAsIDApO1xuXG4gICAgdGhpcy5fZHN0UmVzdFF1YXQgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuICAgIHRoaXMuX2ludkRzdFJlc3RRdWF0ID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbiAgICB0aGlzLl9pbnZTcmNSZXN0UXVhdE11bERzdFJlc3RRdWF0ID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRJbml0U3RhdGUoKTogdm9pZCB7XG4gICAgdGhpcy5fZHN0UmVzdFF1YXQuY29weSh0aGlzLmRlc3RpbmF0aW9uLnF1YXRlcm5pb24pO1xuICAgIHF1YXRJbnZlcnRDb21wYXQodGhpcy5faW52RHN0UmVzdFF1YXQuY29weSh0aGlzLl9kc3RSZXN0UXVhdCkpO1xuICAgIHF1YXRJbnZlcnRDb21wYXQodGhpcy5faW52U3JjUmVzdFF1YXRNdWxEc3RSZXN0UXVhdC5jb3B5KHRoaXMuc291cmNlLnF1YXRlcm5pb24pKS5tdWx0aXBseSh0aGlzLl9kc3RSZXN0UXVhdCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIC8vIGNhbGN1bGF0ZSB0aGUgZGVsdGEgcm90YXRpb24gZnJvbSB0aGUgcmVzdCBhYm91dCB0aGUgc291cmNlLCB0aGVuIGNvbnZlcnQgdG8gdGhlIGRlc3RpbmF0aW9uIGxvY2FsIGNvb3JkXG4gICAgLyoqXG4gICAgICogV2hhdCB0aGUgcXVhdERlbHRhIGlzIGludGVuZGVkIHRvIGJlOlxuICAgICAqXG4gICAgICogYGBgdHNcbiAgICAgKiBjb25zdCBxdWF0U3JjRGVsdGEgPSBfcXVhdEFcbiAgICAgKiAgIC5jb3B5KCB0aGlzLl9pbnZTcmNSZXN0UXVhdCApXG4gICAgICogICAubXVsdGlwbHkoIHRoaXMuc291cmNlLnF1YXRlcm5pb24gKTtcbiAgICAgKiBjb25zdCBxdWF0U3JjRGVsdGFJblBhcmVudCA9IF9xdWF0QlxuICAgICAqICAgLmNvcHkoIHRoaXMuX3NyY1Jlc3RRdWF0IClcbiAgICAgKiAgIC5tdWx0aXBseSggcXVhdFNyY0RlbHRhIClcbiAgICAgKiAgIC5tdWx0aXBseSggdGhpcy5faW52U3JjUmVzdFF1YXQgKTtcbiAgICAgKiBjb25zdCBxdWF0U3JjRGVsdGFJbkRzdCA9IF9xdWF0QVxuICAgICAqICAgLmNvcHkoIHRoaXMuX2ludkRzdFJlc3RRdWF0IClcbiAgICAgKiAgIC5tdWx0aXBseSggcXVhdFNyY0RlbHRhSW5QYXJlbnQgKVxuICAgICAqICAgLm11bHRpcGx5KCB0aGlzLl9kc3RSZXN0UXVhdCApO1xuICAgICAqIGBgYFxuICAgICAqL1xuICAgIGNvbnN0IHF1YXREZWx0YSA9IF9xdWF0QVxuICAgICAgLmNvcHkodGhpcy5faW52RHN0UmVzdFF1YXQpXG4gICAgICAubXVsdGlwbHkodGhpcy5zb3VyY2UucXVhdGVybmlvbilcbiAgICAgIC5tdWx0aXBseSh0aGlzLl9pbnZTcmNSZXN0UXVhdE11bERzdFJlc3RRdWF0KTtcblxuICAgIC8vIGNyZWF0ZSBhIGZyb20tdG8gcXVhdGVybmlvblxuICAgIGNvbnN0IG4xID0gX3YzQS5jb3B5KHRoaXMuX3YzUm9sbEF4aXMpLmFwcGx5UXVhdGVybmlvbihxdWF0RGVsdGEpO1xuXG4gICAgLyoqXG4gICAgICogV2hhdCB0aGUgcXVhdEZyb21UbyBpcyBpbnRlbmRlZCB0byBiZTpcbiAgICAgKlxuICAgICAqIGBgYHRzXG4gICAgICogY29uc3QgcXVhdEZyb21UbyA9IF9xdWF0Qi5zZXRGcm9tVW5pdFZlY3RvcnMoIHRoaXMuX3YzUm9sbEF4aXMsIG4xICkuaW52ZXJzZSgpO1xuICAgICAqIGBgYFxuICAgICAqL1xuICAgIGNvbnN0IHF1YXRGcm9tVG8gPSBfcXVhdEIuc2V0RnJvbVVuaXRWZWN0b3JzKG4xLCB0aGlzLl92M1JvbGxBeGlzKTtcblxuICAgIC8vIHF1YXRGcm9tVG8gKiBxdWF0RGVsdGEgPT0gcm9sbCBleHRyYWN0ZWQgZnJvbSBxdWF0RGVsdGFcbiAgICBjb25zdCB0YXJnZXRRdWF0ID0gcXVhdEZyb21Uby5wcmVtdWx0aXBseSh0aGlzLl9kc3RSZXN0UXVhdCkubXVsdGlwbHkocXVhdERlbHRhKTtcblxuICAgIC8vIGJsZW5kIHdpdGggdGhlIHJlc3QgcXVhdGVybmlvbiB1c2luZyB3ZWlnaHRcbiAgICB0aGlzLmRlc3RpbmF0aW9uLnF1YXRlcm5pb24uY29weSh0aGlzLl9kc3RSZXN0UXVhdCkuc2xlcnAodGFyZ2V0UXVhdCwgdGhpcy53ZWlnaHQpO1xuICB9XG59XG4iLCAiaW1wb3J0IHR5cGUgKiBhcyBDb25zdHJhaW50U2NoZW1hIGZyb20gJ0BwaXhpdi90eXBlcy12cm1jLW5vZGUtY29uc3RyYWludC0xLjAnO1xuaW1wb3J0IHR5cGUgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgdHlwZSB7IEdMVEYsIEdMVEZMb2FkZXJQbHVnaW4sIEdMVEZQYXJzZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyLmpzJztcbmltcG9ydCB7IFZSTU5vZGVDb25zdHJhaW50SGVscGVyIH0gZnJvbSAnLi9oZWxwZXJzJztcbmltcG9ydCB0eXBlIHsgVlJNTm9kZUNvbnN0cmFpbnRMb2FkZXJQbHVnaW5PcHRpb25zIH0gZnJvbSAnLi9WUk1Ob2RlQ29uc3RyYWludExvYWRlclBsdWdpbk9wdGlvbnMnO1xuaW1wb3J0IHsgVlJNTm9kZUNvbnN0cmFpbnRNYW5hZ2VyIH0gZnJvbSAnLi9WUk1Ob2RlQ29uc3RyYWludE1hbmFnZXInO1xuaW1wb3J0IHsgVlJNUm90YXRpb25Db25zdHJhaW50IH0gZnJvbSAnLi9WUk1Sb3RhdGlvbkNvbnN0cmFpbnQnO1xuaW1wb3J0IHsgR0xURiBhcyBHTFRGU2NoZW1hIH0gZnJvbSAnQGdsdGYtdHJhbnNmb3JtL2NvcmUnO1xuaW1wb3J0IHsgVlJNQWltQ29uc3RyYWludCB9IGZyb20gJy4vVlJNQWltQ29uc3RyYWludCc7XG5pbXBvcnQgeyBWUk1Sb2xsQ29uc3RyYWludCB9IGZyb20gJy4vVlJNUm9sbENvbnN0cmFpbnQnO1xuXG4vKipcbiAqIFBvc3NpYmxlIHNwZWMgdmVyc2lvbnMgaXQgcmVjb2duaXplcy5cbiAqL1xuY29uc3QgUE9TU0lCTEVfU1BFQ19WRVJTSU9OUyA9IG5ldyBTZXQoWycxLjAnLCAnMS4wLWJldGEnXSk7XG5cbmV4cG9ydCBjbGFzcyBWUk1Ob2RlQ29uc3RyYWludExvYWRlclBsdWdpbiBpbXBsZW1lbnRzIEdMVEZMb2FkZXJQbHVnaW4ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEVYVEVOU0lPTl9OQU1FID0gJ1ZSTUNfbm9kZV9jb25zdHJhaW50JztcblxuICAvKipcbiAgICogU3BlY2lmeSBhbiBPYmplY3QzRCB0byBhZGQge0BsaW5rIFZSTU5vZGVDb25zdHJhaW50SGVscGVyfSBzLlxuICAgKiBJZiBub3Qgc3BlY2lmaWVkLCBoZWxwZXIgd2lsbCBub3QgYmUgY3JlYXRlZC5cbiAgICogSWYgYHJlbmRlck9yZGVyYCBpcyBzZXQgdG8gdGhlIHJvb3QsIGhlbHBlcnMgd2lsbCBjb3B5IHRoZSBzYW1lIGByZW5kZXJPcmRlcmAgLlxuICAgKi9cbiAgcHVibGljIGhlbHBlclJvb3Q/OiBUSFJFRS5PYmplY3QzRDtcblxuICBwdWJsaWMgcmVhZG9ubHkgcGFyc2VyOiBHTFRGUGFyc2VyO1xuXG4gIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBWUk1Ob2RlQ29uc3RyYWludExvYWRlclBsdWdpbi5FWFRFTlNJT05fTkFNRTtcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJzZXI6IEdMVEZQYXJzZXIsIG9wdGlvbnM/OiBWUk1Ob2RlQ29uc3RyYWludExvYWRlclBsdWdpbk9wdGlvbnMpIHtcbiAgICB0aGlzLnBhcnNlciA9IHBhcnNlcjtcblxuICAgIHRoaXMuaGVscGVyUm9vdCA9IG9wdGlvbnM/LmhlbHBlclJvb3Q7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgYWZ0ZXJSb290KGdsdGY6IEdMVEYpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBnbHRmLnVzZXJEYXRhLnZybU5vZGVDb25zdHJhaW50TWFuYWdlciA9IGF3YWl0IHRoaXMuX2ltcG9ydChnbHRmKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbXBvcnQgY29uc3RyYWludHMgZnJvbSBhIEdMVEYgYW5kIHJldHVybnMgYSB7QGxpbmsgVlJNTm9kZUNvbnN0cmFpbnRNYW5hZ2VyfS5cbiAgICogSXQgbWlnaHQgcmV0dXJuIGBudWxsYCBpbnN0ZWFkIHdoZW4gaXQgZG9lcyBub3QgbmVlZCB0byBiZSBjcmVhdGVkIG9yIHNvbWV0aGluZyBnbyB3cm9uZy5cbiAgICpcbiAgICogQHBhcmFtIGdsdGYgQSBwYXJzZWQgcmVzdWx0IG9mIEdMVEYgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gICAqL1xuICBwcm90ZWN0ZWQgYXN5bmMgX2ltcG9ydChnbHRmOiBHTFRGKTogUHJvbWlzZTxWUk1Ob2RlQ29uc3RyYWludE1hbmFnZXIgfCBudWxsPiB7XG4gICAgY29uc3QganNvbiA9IHRoaXMucGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAgIC8vIGVhcmx5IGFib3J0IGlmIGl0IGRvZXNuJ3QgdXNlIGNvbnN0cmFpbnRzXG4gICAgY29uc3QgaXNDb25zdHJhaW50c1VzZWQgPSBqc29uLmV4dGVuc2lvbnNVc2VkPy5pbmRleE9mKFZSTU5vZGVDb25zdHJhaW50TG9hZGVyUGx1Z2luLkVYVEVOU0lPTl9OQU1FKSAhPT0gLTE7XG4gICAgaWYgKCFpc0NvbnN0cmFpbnRzVXNlZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgbWFuYWdlciA9IG5ldyBWUk1Ob2RlQ29uc3RyYWludE1hbmFnZXIoKTtcbiAgICBjb25zdCB0aHJlZU5vZGVzOiBUSFJFRS5PYmplY3QzRFtdID0gYXdhaXQgdGhpcy5wYXJzZXIuZ2V0RGVwZW5kZW5jaWVzKCdub2RlJyk7XG5cbiAgICAvLyBpbXBvcnQgY29uc3RyYWludHMgZm9yIGVhY2ggbm9kZXNcbiAgICB0aHJlZU5vZGVzLmZvckVhY2goKG5vZGUsIG5vZGVJbmRleCkgPT4ge1xuICAgICAgY29uc3Qgc2NoZW1hTm9kZSA9IGpzb24ubm9kZXMhW25vZGVJbmRleF07XG5cbiAgICAgIC8vIGNoZWNrIGlmIHRoZSBleHRlbnNpb24gdXNlcyB0aGUgZXh0ZW5zaW9uXG4gICAgICBjb25zdCBleHRlbnNpb24gPSBzY2hlbWFOb2RlPy5leHRlbnNpb25zPy5bVlJNTm9kZUNvbnN0cmFpbnRMb2FkZXJQbHVnaW4uRVhURU5TSU9OX05BTUVdIGFzXG4gICAgICAgIENvbnN0cmFpbnRTY2hlbWEuVlJNQ05vZGVDb25zdHJhaW50IHwgdW5kZWZpbmVkO1xuXG4gICAgICBpZiAoZXh0ZW5zaW9uID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzcGVjVmVyc2lvbiA9IGV4dGVuc2lvbi5zcGVjVmVyc2lvbjtcbiAgICAgIGlmICghUE9TU0lCTEVfU1BFQ19WRVJTSU9OUy5oYXMoc3BlY1ZlcnNpb24pKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICBgVlJNTm9kZUNvbnN0cmFpbnRMb2FkZXJQbHVnaW46IFVua25vd24gJHtWUk1Ob2RlQ29uc3RyYWludExvYWRlclBsdWdpbi5FWFRFTlNJT05fTkFNRX0gc3BlY1ZlcnNpb24gXCIke3NwZWNWZXJzaW9ufVwiYCxcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjb25zdHJhaW50RGVmID0gZXh0ZW5zaW9uLmNvbnN0cmFpbnQ7XG5cbiAgICAgIC8vIGltcG9ydCBjb25zdHJhaW50c1xuICAgICAgaWYgKGNvbnN0cmFpbnREZWYucm9sbCAhPSBudWxsKSB7XG4gICAgICAgIGNvbnN0IGNvbnN0cmFpbnQgPSB0aGlzLl9pbXBvcnRSb2xsQ29uc3RyYWludChub2RlLCB0aHJlZU5vZGVzLCBjb25zdHJhaW50RGVmLnJvbGwpO1xuICAgICAgICBtYW5hZ2VyLmFkZENvbnN0cmFpbnQoY29uc3RyYWludCk7XG4gICAgICB9IGVsc2UgaWYgKGNvbnN0cmFpbnREZWYuYWltICE9IG51bGwpIHtcbiAgICAgICAgY29uc3QgY29uc3RyYWludCA9IHRoaXMuX2ltcG9ydEFpbUNvbnN0cmFpbnQobm9kZSwgdGhyZWVOb2RlcywgY29uc3RyYWludERlZi5haW0pO1xuICAgICAgICBtYW5hZ2VyLmFkZENvbnN0cmFpbnQoY29uc3RyYWludCk7XG4gICAgICB9IGVsc2UgaWYgKGNvbnN0cmFpbnREZWYucm90YXRpb24gIT0gbnVsbCkge1xuICAgICAgICBjb25zdCBjb25zdHJhaW50ID0gdGhpcy5faW1wb3J0Um90YXRpb25Db25zdHJhaW50KG5vZGUsIHRocmVlTm9kZXMsIGNvbnN0cmFpbnREZWYucm90YXRpb24pO1xuICAgICAgICBtYW5hZ2VyLmFkZENvbnN0cmFpbnQoY29uc3RyYWludCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBpbml0IGNvbnN0cmFpbnRzXG4gICAgZ2x0Zi5zY2VuZS51cGRhdGVNYXRyaXhXb3JsZCgpO1xuICAgIG1hbmFnZXIuc2V0SW5pdFN0YXRlKCk7XG5cbiAgICByZXR1cm4gbWFuYWdlcjtcbiAgfVxuXG4gIHByb3RlY3RlZCBfaW1wb3J0Um9sbENvbnN0cmFpbnQoXG4gICAgZGVzdGluYXRpb246IFRIUkVFLk9iamVjdDNELFxuICAgIG5vZGVzOiBUSFJFRS5PYmplY3QzRFtdLFxuICAgIHJvbGxDb25zdHJhaW50RGVmOiBDb25zdHJhaW50U2NoZW1hLlJvbGxDb25zdHJhaW50LFxuICApOiBWUk1Sb2xsQ29uc3RyYWludCB7XG4gICAgY29uc3QgeyBzb3VyY2U6IHNvdXJjZUluZGV4LCByb2xsQXhpcywgd2VpZ2h0IH0gPSByb2xsQ29uc3RyYWludERlZjtcbiAgICBjb25zdCBzb3VyY2UgPSBub2Rlc1tzb3VyY2VJbmRleF07XG4gICAgY29uc3QgY29uc3RyYWludCA9IG5ldyBWUk1Sb2xsQ29uc3RyYWludChkZXN0aW5hdGlvbiwgc291cmNlKTtcblxuICAgIGlmIChyb2xsQXhpcyAhPSBudWxsKSB7XG4gICAgICBjb25zdHJhaW50LnJvbGxBeGlzID0gcm9sbEF4aXM7XG4gICAgfVxuICAgIGlmICh3ZWlnaHQgIT0gbnVsbCkge1xuICAgICAgY29uc3RyYWludC53ZWlnaHQgPSB3ZWlnaHQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaGVscGVyUm9vdCkge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IFZSTU5vZGVDb25zdHJhaW50SGVscGVyKGNvbnN0cmFpbnQpO1xuICAgICAgdGhpcy5oZWxwZXJSb290LmFkZChoZWxwZXIpO1xuICAgIH1cblxuICAgIHJldHVybiBjb25zdHJhaW50O1xuICB9XG5cbiAgcHJvdGVjdGVkIF9pbXBvcnRBaW1Db25zdHJhaW50KFxuICAgIGRlc3RpbmF0aW9uOiBUSFJFRS5PYmplY3QzRCxcbiAgICBub2RlczogVEhSRUUuT2JqZWN0M0RbXSxcbiAgICBhaW1Db25zdHJhaW50RGVmOiBDb25zdHJhaW50U2NoZW1hLkFpbUNvbnN0cmFpbnQsXG4gICk6IFZSTUFpbUNvbnN0cmFpbnQge1xuICAgIGNvbnN0IHsgc291cmNlOiBzb3VyY2VJbmRleCwgYWltQXhpcywgd2VpZ2h0IH0gPSBhaW1Db25zdHJhaW50RGVmO1xuICAgIGNvbnN0IHNvdXJjZSA9IG5vZGVzW3NvdXJjZUluZGV4XTtcbiAgICBjb25zdCBjb25zdHJhaW50ID0gbmV3IFZSTUFpbUNvbnN0cmFpbnQoZGVzdGluYXRpb24sIHNvdXJjZSk7XG5cbiAgICBpZiAoYWltQXhpcyAhPSBudWxsKSB7XG4gICAgICBjb25zdHJhaW50LmFpbUF4aXMgPSBhaW1BeGlzO1xuICAgIH1cbiAgICBpZiAod2VpZ2h0ICE9IG51bGwpIHtcbiAgICAgIGNvbnN0cmFpbnQud2VpZ2h0ID0gd2VpZ2h0O1xuICAgIH1cblxuICAgIGlmICh0aGlzLmhlbHBlclJvb3QpIHtcbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBWUk1Ob2RlQ29uc3RyYWludEhlbHBlcihjb25zdHJhaW50KTtcbiAgICAgIHRoaXMuaGVscGVyUm9vdC5hZGQoaGVscGVyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29uc3RyYWludDtcbiAgfVxuXG4gIHByb3RlY3RlZCBfaW1wb3J0Um90YXRpb25Db25zdHJhaW50KFxuICAgIGRlc3RpbmF0aW9uOiBUSFJFRS5PYmplY3QzRCxcbiAgICBub2RlczogVEhSRUUuT2JqZWN0M0RbXSxcbiAgICByb3RhdGlvbkNvbnN0cmFpbnREZWY6IENvbnN0cmFpbnRTY2hlbWEuUm90YXRpb25Db25zdHJhaW50LFxuICApOiBWUk1Sb3RhdGlvbkNvbnN0cmFpbnQge1xuICAgIGNvbnN0IHsgc291cmNlOiBzb3VyY2VJbmRleCwgd2VpZ2h0IH0gPSByb3RhdGlvbkNvbnN0cmFpbnREZWY7XG4gICAgY29uc3Qgc291cmNlID0gbm9kZXNbc291cmNlSW5kZXhdO1xuICAgIGNvbnN0IGNvbnN0cmFpbnQgPSBuZXcgVlJNUm90YXRpb25Db25zdHJhaW50KGRlc3RpbmF0aW9uLCBzb3VyY2UpO1xuXG4gICAgaWYgKHdlaWdodCAhPSBudWxsKSB7XG4gICAgICBjb25zdHJhaW50LndlaWdodCA9IHdlaWdodDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5oZWxwZXJSb290KSB7XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgVlJNTm9kZUNvbnN0cmFpbnRIZWxwZXIoY29uc3RyYWludCk7XG4gICAgICB0aGlzLmhlbHBlclJvb3QuYWRkKGhlbHBlcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbnN0cmFpbnQ7XG4gIH1cbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXIgfSBmcm9tICcuLi9WUk1TcHJpbmdCb25lQ29sbGlkZXInO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVDYXBzdWxlIH0gZnJvbSAnLi4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVDYXBzdWxlJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlUGxhbmUgfSBmcm9tICcuLi9WUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZVBsYW5lJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlU3BoZXJlIH0gZnJvbSAnLi4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVTcGhlcmUnO1xuaW1wb3J0IHsgQ29sbGlkZXJTaGFwZUJ1ZmZlckdlb21ldHJ5IH0gZnJvbSAnLi91dGlscy9Db2xsaWRlclNoYXBlQnVmZmVyR2VvbWV0cnknO1xuaW1wb3J0IHsgQ29sbGlkZXJTaGFwZUNhcHN1bGVCdWZmZXJHZW9tZXRyeSB9IGZyb20gJy4vdXRpbHMvQ29sbGlkZXJTaGFwZUNhcHN1bGVCdWZmZXJHZW9tZXRyeSc7XG5pbXBvcnQgeyBDb2xsaWRlclNoYXBlUGxhbmVCdWZmZXJHZW9tZXRyeSB9IGZyb20gJy4vdXRpbHMvQ29sbGlkZXJTaGFwZVBsYW5lQnVmZmVyR2VvbWV0cnknO1xuaW1wb3J0IHsgQ29sbGlkZXJTaGFwZVNwaGVyZUJ1ZmZlckdlb21ldHJ5IH0gZnJvbSAnLi91dGlscy9Db2xsaWRlclNoYXBlU3BoZXJlQnVmZmVyR2VvbWV0cnknO1xuXG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuZXhwb3J0IGNsYXNzIFZSTVNwcmluZ0JvbmVDb2xsaWRlckhlbHBlciBleHRlbmRzIFRIUkVFLkdyb3VwIHtcbiAgcHVibGljIHJlYWRvbmx5IGNvbGxpZGVyOiBWUk1TcHJpbmdCb25lQ29sbGlkZXI7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2dlb21ldHJ5OiBDb2xsaWRlclNoYXBlQnVmZmVyR2VvbWV0cnk7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2xpbmU6IFRIUkVFLkxpbmVTZWdtZW50cztcblxuICBwdWJsaWMgY29uc3RydWN0b3IoY29sbGlkZXI6IFZSTVNwcmluZ0JvbmVDb2xsaWRlcikge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5tYXRyaXhBdXRvVXBkYXRlID0gZmFsc2U7XG5cbiAgICB0aGlzLmNvbGxpZGVyID0gY29sbGlkZXI7XG5cbiAgICBpZiAodGhpcy5jb2xsaWRlci5zaGFwZSBpbnN0YW5jZW9mIFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlU3BoZXJlKSB7XG4gICAgICB0aGlzLl9nZW9tZXRyeSA9IG5ldyBDb2xsaWRlclNoYXBlU3BoZXJlQnVmZmVyR2VvbWV0cnkodGhpcy5jb2xsaWRlci5zaGFwZSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNvbGxpZGVyLnNoYXBlIGluc3RhbmNlb2YgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVDYXBzdWxlKSB7XG4gICAgICB0aGlzLl9nZW9tZXRyeSA9IG5ldyBDb2xsaWRlclNoYXBlQ2Fwc3VsZUJ1ZmZlckdlb21ldHJ5KHRoaXMuY29sbGlkZXIuc2hhcGUpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jb2xsaWRlci5zaGFwZSBpbnN0YW5jZW9mIFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlUGxhbmUpIHtcbiAgICAgIHRoaXMuX2dlb21ldHJ5ID0gbmV3IENvbGxpZGVyU2hhcGVQbGFuZUJ1ZmZlckdlb21ldHJ5KHRoaXMuY29sbGlkZXIuc2hhcGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZSTVNwcmluZ0JvbmVDb2xsaWRlckhlbHBlcjogVW5rbm93biBjb2xsaWRlciBzaGFwZSB0eXBlIGRldGVjdGVkJyk7XG4gICAgfVxuXG4gICAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTGluZUJhc2ljTWF0ZXJpYWwoe1xuICAgICAgY29sb3I6IDB4ZmYwMGZmLFxuICAgICAgZGVwdGhUZXN0OiBmYWxzZSxcbiAgICAgIGRlcHRoV3JpdGU6IGZhbHNlLFxuICAgIH0pO1xuXG4gICAgdGhpcy5fbGluZSA9IG5ldyBUSFJFRS5MaW5lU2VnbWVudHModGhpcy5fZ2VvbWV0cnksIG1hdGVyaWFsKTtcbiAgICB0aGlzLmFkZCh0aGlzLl9saW5lKTtcbiAgfVxuXG4gIHB1YmxpYyBkaXNwb3NlKCk6IHZvaWQge1xuICAgIHRoaXMuX2dlb21ldHJ5LmRpc3Bvc2UoKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVNYXRyaXhXb3JsZChmb3JjZTogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuY29sbGlkZXIudXBkYXRlV29ybGRNYXRyaXgodHJ1ZSwgZmFsc2UpO1xuXG4gICAgdGhpcy5tYXRyaXguY29weSh0aGlzLmNvbGxpZGVyLm1hdHJpeFdvcmxkKTtcblxuICAgIGNvbnN0IG1hdHJpeFdvcmxkRWxlbWVudHMgPSB0aGlzLm1hdHJpeC5lbGVtZW50cztcbiAgICB0aGlzLl9nZW9tZXRyeS53b3JsZFNjYWxlID0gX3YzQVxuICAgICAgLnNldChtYXRyaXhXb3JsZEVsZW1lbnRzWzBdLCBtYXRyaXhXb3JsZEVsZW1lbnRzWzFdLCBtYXRyaXhXb3JsZEVsZW1lbnRzWzJdKVxuICAgICAgLmxlbmd0aCgpOyAvLyBjYWxjdWxhdGUgc2NhbGUgb2YgeCBjb21wb25lbnRcblxuICAgIHRoaXMuX2dlb21ldHJ5LnVwZGF0ZSgpO1xuXG4gICAgc3VwZXIudXBkYXRlTWF0cml4V29ybGQoZm9yY2UpO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGUgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlJztcblxuY29uc3QgX3YzQSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfdjNCID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuZXhwb3J0IGNsYXNzIFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlQ2Fwc3VsZSBleHRlbmRzIFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlIHtcbiAgcHVibGljIGdldCB0eXBlKCk6ICdjYXBzdWxlJyB7XG4gICAgcmV0dXJuICdjYXBzdWxlJztcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgb2Zmc2V0IG9mIHRoZSBjYXBzdWxlIGhlYWQgZnJvbSB0aGUgb3JpZ2luIGluIGxvY2FsIHNwYWNlLlxuICAgKi9cbiAgcHVibGljIG9mZnNldDogVEhSRUUuVmVjdG9yMztcblxuICAvKipcbiAgICogVGhlIG9mZnNldCBvZiB0aGUgY2Fwc3VsZSB0YWlsIGZyb20gdGhlIG9yaWdpbiBpbiBsb2NhbCBzcGFjZS5cbiAgICovXG4gIHB1YmxpYyB0YWlsOiBUSFJFRS5WZWN0b3IzO1xuXG4gIC8qKlxuICAgKiBUaGUgcmFkaXVzIG9mIHRoZSBjYXBzdWxlLlxuICAgKi9cbiAgcHVibGljIHJhZGl1czogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBJZiB0cnVlLCB0aGUgY29sbGlkZXIgcHJldmVudHMgc3ByaW5nIGJvbmVzIGZyb20gZ29pbmcgb3V0c2lkZSBvZiB0aGUgY2Fwc3VsZSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIGluc2lkZTogYm9vbGVhbjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IocGFyYW1zPzogeyByYWRpdXM/OiBudW1iZXI7IG9mZnNldD86IFRIUkVFLlZlY3RvcjM7IHRhaWw/OiBUSFJFRS5WZWN0b3IzOyBpbnNpZGU/OiBib29sZWFuIH0pIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5vZmZzZXQgPSBwYXJhbXM/Lm9mZnNldCA/PyBuZXcgVEhSRUUuVmVjdG9yMygwLjAsIDAuMCwgMC4wKTtcbiAgICB0aGlzLnRhaWwgPSBwYXJhbXM/LnRhaWwgPz8gbmV3IFRIUkVFLlZlY3RvcjMoMC4wLCAwLjAsIDAuMCk7XG4gICAgdGhpcy5yYWRpdXMgPSBwYXJhbXM/LnJhZGl1cyA/PyAwLjA7XG4gICAgdGhpcy5pbnNpZGUgPSBwYXJhbXM/Lmluc2lkZSA/PyBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBjYWxjdWxhdGVDb2xsaXNpb24oXG4gICAgY29sbGlkZXJNYXRyaXg6IFRIUkVFLk1hdHJpeDQsXG4gICAgb2JqZWN0UG9zaXRpb246IFRIUkVFLlZlY3RvcjMsXG4gICAgb2JqZWN0UmFkaXVzOiBudW1iZXIsXG4gICAgdGFyZ2V0OiBUSFJFRS5WZWN0b3IzLFxuICApOiBudW1iZXIge1xuICAgIF92M0Euc2V0RnJvbU1hdHJpeFBvc2l0aW9uKGNvbGxpZGVyTWF0cml4KTsgLy8gdHJhbnNmb3JtZWQgaGVhZFxuICAgIF92M0Iuc3ViVmVjdG9ycyh0aGlzLnRhaWwsIHRoaXMub2Zmc2V0KS5hcHBseU1hdHJpeDQoY29sbGlkZXJNYXRyaXgpOyAvLyB0cmFuc2Zvcm1lZCB0YWlsXG4gICAgX3YzQi5zdWIoX3YzQSk7IC8vIGZyb20gaGVhZCB0byB0YWlsXG4gICAgY29uc3QgbGVuZ3RoU3FDYXBzdWxlID0gX3YzQi5sZW5ndGhTcSgpO1xuXG4gICAgdGFyZ2V0LmNvcHkob2JqZWN0UG9zaXRpb24pLnN1YihfdjNBKTsgLy8gZnJvbSBoZWFkIHRvIG9iamVjdFxuICAgIGNvbnN0IGRvdCA9IF92M0IuZG90KHRhcmdldCk7IC8vIGRvdCBwcm9kdWN0IG9mIG9mZnNldFRvVGFpbCBhbmQgb2Zmc2V0VG9PYmplY3RcblxuICAgIGlmIChkb3QgPD0gMC4wKSB7XG4gICAgICAvLyBpZiBvYmplY3QgaXMgbmVhciBmcm9tIHRoZSBoZWFkXG4gICAgICAvLyBkbyBub3RoaW5nLCB1c2UgdGhlIGN1cnJlbnQgdmFsdWUgZGlyZWN0bHlcbiAgICB9IGVsc2UgaWYgKGxlbmd0aFNxQ2Fwc3VsZSA8PSBkb3QpIHtcbiAgICAgIC8vIGlmIG9iamVjdCBpcyBuZWFyIGZyb20gdGhlIHRhaWxcbiAgICAgIHRhcmdldC5zdWIoX3YzQik7IC8vIGZyb20gdGFpbCB0byBvYmplY3RcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaWYgb2JqZWN0IGlzIGJldHdlZW4gdHdvIGVuZHNcbiAgICAgIF92M0IubXVsdGlwbHlTY2FsYXIoZG90IC8gbGVuZ3RoU3FDYXBzdWxlKTsgLy8gZnJvbSBoZWFkIHRvIHRoZSBuZWFyZXN0IHBvaW50IG9mIHRoZSBzaGFmdFxuICAgICAgdGFyZ2V0LnN1YihfdjNCKTsgLy8gZnJvbSB0aGUgc2hhZnQgcG9pbnQgdG8gb2JqZWN0XG4gICAgfVxuXG4gICAgY29uc3QgbGVuZ3RoID0gdGFyZ2V0Lmxlbmd0aCgpO1xuICAgIGNvbnN0IGRpc3RhbmNlID0gdGhpcy5pbnNpZGUgPyB0aGlzLnJhZGl1cyAtIG9iamVjdFJhZGl1cyAtIGxlbmd0aCA6IGxlbmd0aCAtIG9iamVjdFJhZGl1cyAtIHRoaXMucmFkaXVzO1xuXG4gICAgaWYgKGRpc3RhbmNlIDwgMCkge1xuICAgICAgdGFyZ2V0Lm11bHRpcGx5U2NhbGFyKDEgLyBsZW5ndGgpOyAvLyBjb252ZXJ0IHRoZSBkZWx0YSB0byB0aGUgZGlyZWN0aW9uXG4gICAgICBpZiAodGhpcy5pbnNpZGUpIHtcbiAgICAgICAgdGFyZ2V0Lm5lZ2F0ZSgpOyAvLyBpZiBpbnNpZGUsIHJldmVyc2UgdGhlIGRpcmVjdGlvblxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkaXN0YW5jZTtcbiAgfVxufVxuIiwgImltcG9ydCB0eXBlICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBzaGFwZSBvZiBhIGNvbGxpZGVyLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGUge1xuICAvKipcbiAgICogVGhlIHR5cGUgb2YgdGhlIHNoYXBlLlxuICAgKi9cbiAgcHVibGljIGFic3RyYWN0IGdldCB0eXBlKCk6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIG9mZnNldCB0byB0aGUgc2hhcGUuXG4gICAqL1xuICBwdWJsaWMgb2Zmc2V0PzogVEhSRUUuVmVjdG9yMztcblxuICAvKipcbiAgICogQ2FsY3VsYXRlIGEgZGlzdGFuY2UgYW5kIGEgZGlyZWN0aW9uIGZyb20gdGhlIGNvbGxpZGVyIHRvIGEgdGFyZ2V0IG9iamVjdC5cbiAgICogSXQncyBoaXQgaWYgdGhlIGRpc3RhbmNlIGlzIG5lZ2F0aXZlLlxuICAgKiBUaGUgZGlyZWN0aW9uIHdpbGwgYmUgY29udGFpbmVkIGluIHRoZSBnaXZlbiB0YXJnZXQgdmVjdG9yLlxuICAgKlxuICAgKiBAcGFyYW0gY29sbGlkZXJNYXRyaXggQSBtYXRyaXggcmVwcmVzZW50cyB0aGUgdHJhbnNmb3JtIG9mIHRoZSBjb2xsaWRlclxuICAgKiBAcGFyYW0gb2JqZWN0UG9zaXRpb24gQSB2ZWN0b3IgcmVwcmVzZW50cyB0aGUgcG9zaXRpb24gb2YgdGhlIHRhcmdldCBvYmplY3RcbiAgICogQHBhcmFtIG9iamVjdFJhZGl1cyBUaGUgcmFkaXVzIG9mIHRoZSBvYmplY3RcbiAgICogQHBhcmFtIHRhcmdldCBUaGUgcmVzdWx0IGRpcmVjdGlvbiB3aWxsIGJlIGNvbnRhaW5lZCBpbiB0aGlzIHZlY3RvclxuICAgKi9cbiAgcHVibGljIGFic3RyYWN0IGNhbGN1bGF0ZUNvbGxpc2lvbihcbiAgICBjb2xsaWRlck1hdHJpeDogVEhSRUUuTWF0cml4NCxcbiAgICBvYmplY3RQb3NpdGlvbjogVEhSRUUuVmVjdG9yMyxcbiAgICBvYmplY3RSYWRpdXM6IG51bWJlcixcbiAgICB0YXJnZXQ6IFRIUkVFLlZlY3RvcjMsXG4gICk6IG51bWJlcjtcbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZSB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGUnO1xuXG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF9tYXQzQSA9IG5ldyBUSFJFRS5NYXRyaXgzKCk7XG5cbmV4cG9ydCBjbGFzcyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZVBsYW5lIGV4dGVuZHMgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGUge1xuICBwdWJsaWMgZ2V0IHR5cGUoKTogJ3BsYW5lJyB7XG4gICAgcmV0dXJuICdwbGFuZSc7XG4gIH1cblxuICAvKipcbiAgICogVGhlIG9mZnNldCBvZiB0aGUgcGxhbmUgZnJvbSB0aGUgb3JpZ2luIGluIGxvY2FsIHNwYWNlLlxuICAgKi9cbiAgcHVibGljIG9mZnNldDogVEhSRUUuVmVjdG9yMztcblxuICAvKipcbiAgICogVGhlIG5vcm1hbCBvZiB0aGUgcGxhbmUgaW4gbG9jYWwgc3BhY2UuIE11c3QgYmUgbm9ybWFsaXplZC5cbiAgICovXG4gIHB1YmxpYyBub3JtYWw6IFRIUkVFLlZlY3RvcjM7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBhcmFtcz86IHsgb2Zmc2V0PzogVEhSRUUuVmVjdG9yMzsgbm9ybWFsPzogVEhSRUUuVmVjdG9yMyB9KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMub2Zmc2V0ID0gcGFyYW1zPy5vZmZzZXQgPz8gbmV3IFRIUkVFLlZlY3RvcjMoMC4wLCAwLjAsIDAuMCk7XG4gICAgdGhpcy5ub3JtYWwgPSBwYXJhbXM/Lm5vcm1hbCA/PyBuZXcgVEhSRUUuVmVjdG9yMygwLjAsIDAuMCwgMS4wKTtcbiAgfVxuXG4gIHB1YmxpYyBjYWxjdWxhdGVDb2xsaXNpb24oXG4gICAgY29sbGlkZXJNYXRyaXg6IFRIUkVFLk1hdHJpeDQsXG4gICAgb2JqZWN0UG9zaXRpb246IFRIUkVFLlZlY3RvcjMsXG4gICAgb2JqZWN0UmFkaXVzOiBudW1iZXIsXG4gICAgdGFyZ2V0OiBUSFJFRS5WZWN0b3IzLFxuICApOiBudW1iZXIge1xuICAgIHRhcmdldC5zZXRGcm9tTWF0cml4UG9zaXRpb24oY29sbGlkZXJNYXRyaXgpOyAvLyB0cmFuc2Zvcm1lZCBvZmZzZXRcbiAgICB0YXJnZXQubmVnYXRlKCkuYWRkKG9iamVjdFBvc2l0aW9uKTsgLy8gYSB2ZWN0b3IgZnJvbSBjb2xsaWRlciBjZW50ZXIgdG8gb2JqZWN0IHBvc2l0aW9uXG5cbiAgICBfbWF0M0EuZ2V0Tm9ybWFsTWF0cml4KGNvbGxpZGVyTWF0cml4KTsgLy8gY29udmVydCB0aGUgY29sbGlkZXIgbWF0cml4IHRvIHRoZSBub3JtYWwgbWF0cml4XG4gICAgX3YzQS5jb3B5KHRoaXMubm9ybWFsKS5hcHBseU5vcm1hbE1hdHJpeChfbWF0M0EpLm5vcm1hbGl6ZSgpOyAvLyB0cmFuc2Zvcm1lZCBub3JtYWxcbiAgICBjb25zdCBkaXN0YW5jZSA9IHRhcmdldC5kb3QoX3YzQSkgLSBvYmplY3RSYWRpdXM7XG5cbiAgICB0YXJnZXQuY29weShfdjNBKTsgLy8gY29udmVydCB0aGUgZGVsdGEgdG8gdGhlIGRpcmVjdGlvblxuXG4gICAgcmV0dXJuIGRpc3RhbmNlO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGUgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlJztcblxuY29uc3QgX3YzQSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbmV4cG9ydCBjbGFzcyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZVNwaGVyZSBleHRlbmRzIFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlIHtcbiAgcHVibGljIGdldCB0eXBlKCk6ICdzcGhlcmUnIHtcbiAgICByZXR1cm4gJ3NwaGVyZSc7XG4gIH1cblxuICAvKipcbiAgICogVGhlIG9mZnNldCBvZiB0aGUgc3BoZXJlIGZyb20gdGhlIG9yaWdpbiBpbiBsb2NhbCBzcGFjZS5cbiAgICovXG4gIHB1YmxpYyBvZmZzZXQ6IFRIUkVFLlZlY3RvcjM7XG5cbiAgLyoqXG4gICAqIFRoZSByYWRpdXMuXG4gICAqL1xuICBwdWJsaWMgcmFkaXVzOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIElmIHRydWUsIHRoZSBjb2xsaWRlciBwcmV2ZW50cyBzcHJpbmcgYm9uZXMgZnJvbSBnb2luZyBvdXRzaWRlIG9mIHRoZSBzcGhlcmUgaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBpbnNpZGU6IGJvb2xlYW47XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBhcmFtcz86IHsgcmFkaXVzPzogbnVtYmVyOyBvZmZzZXQ/OiBUSFJFRS5WZWN0b3IzOyBpbnNpZGU/OiBib29sZWFuIH0pIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5vZmZzZXQgPSBwYXJhbXM/Lm9mZnNldCA/PyBuZXcgVEhSRUUuVmVjdG9yMygwLjAsIDAuMCwgMC4wKTtcbiAgICB0aGlzLnJhZGl1cyA9IHBhcmFtcz8ucmFkaXVzID8/IDAuMDtcbiAgICB0aGlzLmluc2lkZSA9IHBhcmFtcz8uaW5zaWRlID8/IGZhbHNlO1xuICB9XG5cbiAgcHVibGljIGNhbGN1bGF0ZUNvbGxpc2lvbihcbiAgICBjb2xsaWRlck1hdHJpeDogVEhSRUUuTWF0cml4NCxcbiAgICBvYmplY3RQb3NpdGlvbjogVEhSRUUuVmVjdG9yMyxcbiAgICBvYmplY3RSYWRpdXM6IG51bWJlcixcbiAgICB0YXJnZXQ6IFRIUkVFLlZlY3RvcjMsXG4gICk6IG51bWJlciB7XG4gICAgdGFyZ2V0LnN1YlZlY3RvcnMob2JqZWN0UG9zaXRpb24sIF92M0Euc2V0RnJvbU1hdHJpeFBvc2l0aW9uKGNvbGxpZGVyTWF0cml4KSk7XG5cbiAgICBjb25zdCBsZW5ndGggPSB0YXJnZXQubGVuZ3RoKCk7XG4gICAgY29uc3QgZGlzdGFuY2UgPSB0aGlzLmluc2lkZSA/IHRoaXMucmFkaXVzIC0gb2JqZWN0UmFkaXVzIC0gbGVuZ3RoIDogbGVuZ3RoIC0gb2JqZWN0UmFkaXVzIC0gdGhpcy5yYWRpdXM7XG5cbiAgICBpZiAoZGlzdGFuY2UgPCAwKSB7XG4gICAgICB0YXJnZXQubXVsdGlwbHlTY2FsYXIoMSAvIGxlbmd0aCk7IC8vIGNvbnZlcnQgdGhlIGRlbHRhIHRvIHRoZSBkaXJlY3Rpb25cbiAgICAgIGlmICh0aGlzLmluc2lkZSkge1xuICAgICAgICB0YXJnZXQubmVnYXRlKCk7IC8vIGlmIGluc2lkZSwgcmV2ZXJzZSB0aGUgZGlyZWN0aW9uXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpc3RhbmNlO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVDYXBzdWxlIH0gZnJvbSAnLi4vLi4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVDYXBzdWxlJztcbmltcG9ydCB7IENvbGxpZGVyU2hhcGVCdWZmZXJHZW9tZXRyeSB9IGZyb20gJy4vQ29sbGlkZXJTaGFwZUJ1ZmZlckdlb21ldHJ5JztcblxuY29uc3QgX3YzQSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbmV4cG9ydCBjbGFzcyBDb2xsaWRlclNoYXBlQ2Fwc3VsZUJ1ZmZlckdlb21ldHJ5IGV4dGVuZHMgVEhSRUUuQnVmZmVyR2VvbWV0cnkgaW1wbGVtZW50cyBDb2xsaWRlclNoYXBlQnVmZmVyR2VvbWV0cnkge1xuICBwdWJsaWMgd29ybGRTY2FsZSA9IDEuMDtcblxuICBwcml2YXRlIHJlYWRvbmx5IF9hdHRyUG9zOiBUSFJFRS5CdWZmZXJBdHRyaWJ1dGU7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2F0dHJJbmRleDogVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xuICBwcml2YXRlIHJlYWRvbmx5IF9zaGFwZTogVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVDYXBzdWxlO1xuICBwcml2YXRlIF9jdXJyZW50UmFkaXVzID0gMDtcbiAgcHJpdmF0ZSByZWFkb25seSBfY3VycmVudE9mZnNldCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2N1cnJlbnRUYWlsID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuICBwdWJsaWMgY29uc3RydWN0b3Ioc2hhcGU6IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlQ2Fwc3VsZSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLl9zaGFwZSA9IHNoYXBlO1xuXG4gICAgdGhpcy5fYXR0clBvcyA9IG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUobmV3IEZsb2F0MzJBcnJheSgzOTYpLCAzKTtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgncG9zaXRpb24nLCB0aGlzLl9hdHRyUG9zKTtcblxuICAgIHRoaXMuX2F0dHJJbmRleCA9IG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUobmV3IFVpbnQxNkFycmF5KDI2NCksIDEpO1xuICAgIHRoaXMuc2V0SW5kZXgodGhpcy5fYXR0ckluZGV4KTtcblxuICAgIHRoaXMuX2J1aWxkSW5kZXgoKTtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBsZXQgc2hvdWxkVXBkYXRlR2VvbWV0cnkgPSBmYWxzZTtcblxuICAgIGNvbnN0IHJhZGl1cyA9IHRoaXMuX3NoYXBlLnJhZGl1cyAvIHRoaXMud29ybGRTY2FsZTtcbiAgICBpZiAodGhpcy5fY3VycmVudFJhZGl1cyAhPT0gcmFkaXVzKSB7XG4gICAgICB0aGlzLl9jdXJyZW50UmFkaXVzID0gcmFkaXVzO1xuICAgICAgc2hvdWxkVXBkYXRlR2VvbWV0cnkgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fY3VycmVudE9mZnNldC5lcXVhbHModGhpcy5fc2hhcGUub2Zmc2V0KSkge1xuICAgICAgdGhpcy5fY3VycmVudE9mZnNldC5jb3B5KHRoaXMuX3NoYXBlLm9mZnNldCk7XG4gICAgICBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IHRydWU7XG4gICAgfVxuXG4gICAgY29uc3QgdGFpbCA9IF92M0EuY29weSh0aGlzLl9zaGFwZS50YWlsKS5kaXZpZGVTY2FsYXIodGhpcy53b3JsZFNjYWxlKTtcbiAgICBpZiAodGhpcy5fY3VycmVudFRhaWwuZGlzdGFuY2VUb1NxdWFyZWQodGFpbCkgPiAxZS0xMCkge1xuICAgICAgdGhpcy5fY3VycmVudFRhaWwuY29weSh0YWlsKTtcbiAgICAgIHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoc2hvdWxkVXBkYXRlR2VvbWV0cnkpIHtcbiAgICAgIHRoaXMuX2J1aWxkUG9zaXRpb24oKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9idWlsZFBvc2l0aW9uKCk6IHZvaWQge1xuICAgIF92M0EuY29weSh0aGlzLl9jdXJyZW50VGFpbCkuc3ViKHRoaXMuX2N1cnJlbnRPZmZzZXQpO1xuICAgIGNvbnN0IGwgPSBfdjNBLmxlbmd0aCgpIC8gdGhpcy5fY3VycmVudFJhZGl1cztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IDE2OyBpKyspIHtcbiAgICAgIGNvbnN0IHQgPSAoaSAvIDE2LjApICogTWF0aC5QSTtcblxuICAgICAgdGhpcy5fYXR0clBvcy5zZXRYWVooaSwgLU1hdGguc2luKHQpLCAtTWF0aC5jb3ModCksIDAuMCk7XG4gICAgICB0aGlzLl9hdHRyUG9zLnNldFhZWigxNyArIGksIGwgKyBNYXRoLnNpbih0KSwgTWF0aC5jb3ModCksIDAuMCk7XG4gICAgICB0aGlzLl9hdHRyUG9zLnNldFhZWigzNCArIGksIC1NYXRoLnNpbih0KSwgMC4wLCAtTWF0aC5jb3ModCkpO1xuICAgICAgdGhpcy5fYXR0clBvcy5zZXRYWVooNTEgKyBpLCBsICsgTWF0aC5zaW4odCksIDAuMCwgTWF0aC5jb3ModCkpO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzI7IGkrKykge1xuICAgICAgY29uc3QgdCA9IChpIC8gMTYuMCkgKiBNYXRoLlBJO1xuICAgICAgdGhpcy5fYXR0clBvcy5zZXRYWVooNjggKyBpLCAwLjAsIE1hdGguc2luKHQpLCBNYXRoLmNvcyh0KSk7XG4gICAgICB0aGlzLl9hdHRyUG9zLnNldFhZWigxMDAgKyBpLCBsLCBNYXRoLnNpbih0KSwgTWF0aC5jb3ModCkpO1xuICAgIH1cblxuICAgIGNvbnN0IHRoZXRhID0gTWF0aC5hdGFuMihfdjNBLnksIE1hdGguc3FydChfdjNBLnggKiBfdjNBLnggKyBfdjNBLnogKiBfdjNBLnopKTtcbiAgICBjb25zdCBwaGkgPSAtTWF0aC5hdGFuMihfdjNBLnosIF92M0EueCk7XG5cbiAgICB0aGlzLnJvdGF0ZVoodGhldGEpO1xuICAgIHRoaXMucm90YXRlWShwaGkpO1xuICAgIHRoaXMuc2NhbGUodGhpcy5fY3VycmVudFJhZGl1cywgdGhpcy5fY3VycmVudFJhZGl1cywgdGhpcy5fY3VycmVudFJhZGl1cyk7XG4gICAgdGhpcy50cmFuc2xhdGUodGhpcy5fY3VycmVudE9mZnNldC54LCB0aGlzLl9jdXJyZW50T2Zmc2V0LnksIHRoaXMuX2N1cnJlbnRPZmZzZXQueik7XG5cbiAgICB0aGlzLl9hdHRyUG9zLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX2J1aWxkSW5kZXgoKTogdm9pZCB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzNDsgaSsrKSB7XG4gICAgICBjb25zdCBpMSA9IChpICsgMSkgJSAzNDtcblxuICAgICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKGkgKiAyLCBpLCBpMSk7XG4gICAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoNjggKyBpICogMiwgMzQgKyBpLCAzNCArIGkxKTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDMyOyBpKyspIHtcbiAgICAgIGNvbnN0IGkxID0gKGkgKyAxKSAlIDMyO1xuXG4gICAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoMTM2ICsgaSAqIDIsIDY4ICsgaSwgNjggKyBpMSk7XG4gICAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoMjAwICsgaSAqIDIsIDEwMCArIGksIDEwMCArIGkxKTtcbiAgICB9XG5cbiAgICB0aGlzLl9hdHRySW5kZXgubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVQbGFuZSB9IGZyb20gJy4uLy4uL1ZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlUGxhbmUnO1xuaW1wb3J0IHsgQ29sbGlkZXJTaGFwZUJ1ZmZlckdlb21ldHJ5IH0gZnJvbSAnLi9Db2xsaWRlclNoYXBlQnVmZmVyR2VvbWV0cnknO1xuXG5leHBvcnQgY2xhc3MgQ29sbGlkZXJTaGFwZVBsYW5lQnVmZmVyR2VvbWV0cnkgZXh0ZW5kcyBUSFJFRS5CdWZmZXJHZW9tZXRyeSBpbXBsZW1lbnRzIENvbGxpZGVyU2hhcGVCdWZmZXJHZW9tZXRyeSB7XG4gIHB1YmxpYyB3b3JsZFNjYWxlID0gMS4wO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgX2F0dHJQb3M6IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZTtcbiAgcHJpdmF0ZSByZWFkb25seSBfYXR0ckluZGV4OiBUSFJFRS5CdWZmZXJBdHRyaWJ1dGU7XG4gIHByaXZhdGUgcmVhZG9ubHkgX3NoYXBlOiBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZVBsYW5lO1xuICBwcml2YXRlIHJlYWRvbmx5IF9jdXJyZW50T2Zmc2V0ID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbiAgcHJpdmF0ZSByZWFkb25seSBfY3VycmVudE5vcm1hbCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHNoYXBlOiBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZVBsYW5lKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuX3NoYXBlID0gc2hhcGU7XG5cbiAgICB0aGlzLl9hdHRyUG9zID0gbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShuZXcgRmxvYXQzMkFycmF5KDYgKiAzKSwgMyk7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJywgdGhpcy5fYXR0clBvcyk7XG5cbiAgICB0aGlzLl9hdHRySW5kZXggPSBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKG5ldyBVaW50MTZBcnJheSgxMCksIDEpO1xuICAgIHRoaXMuc2V0SW5kZXgodGhpcy5fYXR0ckluZGV4KTtcblxuICAgIHRoaXMuX2J1aWxkSW5kZXgoKTtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBsZXQgc2hvdWxkVXBkYXRlR2VvbWV0cnkgPSBmYWxzZTtcblxuICAgIGlmICghdGhpcy5fY3VycmVudE9mZnNldC5lcXVhbHModGhpcy5fc2hhcGUub2Zmc2V0KSkge1xuICAgICAgdGhpcy5fY3VycmVudE9mZnNldC5jb3B5KHRoaXMuX3NoYXBlLm9mZnNldCk7XG4gICAgICBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9jdXJyZW50Tm9ybWFsLmVxdWFscyh0aGlzLl9zaGFwZS5ub3JtYWwpKSB7XG4gICAgICB0aGlzLl9jdXJyZW50Tm9ybWFsLmNvcHkodGhpcy5fc2hhcGUubm9ybWFsKTtcbiAgICAgIHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoc2hvdWxkVXBkYXRlR2VvbWV0cnkpIHtcbiAgICAgIHRoaXMuX2J1aWxkUG9zaXRpb24oKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9idWlsZFBvc2l0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKDAsIC0wLjUsIC0wLjUsIDApO1xuICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKDEsIDAuNSwgLTAuNSwgMCk7XG4gICAgdGhpcy5fYXR0clBvcy5zZXRYWVooMiwgMC41LCAwLjUsIDApO1xuICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKDMsIC0wLjUsIDAuNSwgMCk7XG4gICAgdGhpcy5fYXR0clBvcy5zZXRYWVooNCwgMCwgMCwgMCk7XG4gICAgdGhpcy5fYXR0clBvcy5zZXRYWVooNSwgMCwgMCwgMC4yNSk7XG5cbiAgICB0aGlzLnRyYW5zbGF0ZSh0aGlzLl9jdXJyZW50T2Zmc2V0LngsIHRoaXMuX2N1cnJlbnRPZmZzZXQueSwgdGhpcy5fY3VycmVudE9mZnNldC56KTtcbiAgICB0aGlzLmxvb2tBdCh0aGlzLl9jdXJyZW50Tm9ybWFsKTtcblxuICAgIHRoaXMuX2F0dHJQb3MubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRJbmRleCgpOiB2b2lkIHtcbiAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoMCwgMCwgMSk7XG4gICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKDIsIDEsIDIpO1xuICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWSg0LCAyLCAzKTtcbiAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoNiwgMywgMCk7XG4gICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKDgsIDQsIDUpO1xuXG4gICAgdGhpcy5fYXR0ckluZGV4Lm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlU3BoZXJlIH0gZnJvbSAnLi4vLi4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVTcGhlcmUnO1xuaW1wb3J0IHsgQ29sbGlkZXJTaGFwZUJ1ZmZlckdlb21ldHJ5IH0gZnJvbSAnLi9Db2xsaWRlclNoYXBlQnVmZmVyR2VvbWV0cnknO1xuXG5leHBvcnQgY2xhc3MgQ29sbGlkZXJTaGFwZVNwaGVyZUJ1ZmZlckdlb21ldHJ5IGV4dGVuZHMgVEhSRUUuQnVmZmVyR2VvbWV0cnkgaW1wbGVtZW50cyBDb2xsaWRlclNoYXBlQnVmZmVyR2VvbWV0cnkge1xuICBwdWJsaWMgd29ybGRTY2FsZSA9IDEuMDtcblxuICBwcml2YXRlIHJlYWRvbmx5IF9hdHRyUG9zOiBUSFJFRS5CdWZmZXJBdHRyaWJ1dGU7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2F0dHJJbmRleDogVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xuICBwcml2YXRlIHJlYWRvbmx5IF9zaGFwZTogVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVTcGhlcmU7XG4gIHByaXZhdGUgX2N1cnJlbnRSYWRpdXMgPSAwO1xuICBwcml2YXRlIHJlYWRvbmx5IF9jdXJyZW50T2Zmc2V0ID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuICBwdWJsaWMgY29uc3RydWN0b3Ioc2hhcGU6IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlU3BoZXJlKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuX3NoYXBlID0gc2hhcGU7XG5cbiAgICB0aGlzLl9hdHRyUG9zID0gbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShuZXcgRmxvYXQzMkFycmF5KDMyICogMyAqIDMpLCAzKTtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgncG9zaXRpb24nLCB0aGlzLl9hdHRyUG9zKTtcblxuICAgIHRoaXMuX2F0dHJJbmRleCA9IG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUobmV3IFVpbnQxNkFycmF5KDY0ICogMyksIDEpO1xuICAgIHRoaXMuc2V0SW5kZXgodGhpcy5fYXR0ckluZGV4KTtcblxuICAgIHRoaXMuX2J1aWxkSW5kZXgoKTtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBsZXQgc2hvdWxkVXBkYXRlR2VvbWV0cnkgPSBmYWxzZTtcblxuICAgIGNvbnN0IHJhZGl1cyA9IHRoaXMuX3NoYXBlLnJhZGl1cyAvIHRoaXMud29ybGRTY2FsZTtcbiAgICBpZiAodGhpcy5fY3VycmVudFJhZGl1cyAhPT0gcmFkaXVzKSB7XG4gICAgICB0aGlzLl9jdXJyZW50UmFkaXVzID0gcmFkaXVzO1xuICAgICAgc2hvdWxkVXBkYXRlR2VvbWV0cnkgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fY3VycmVudE9mZnNldC5lcXVhbHModGhpcy5fc2hhcGUub2Zmc2V0KSkge1xuICAgICAgdGhpcy5fY3VycmVudE9mZnNldC5jb3B5KHRoaXMuX3NoYXBlLm9mZnNldCk7XG4gICAgICBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHNob3VsZFVwZGF0ZUdlb21ldHJ5KSB7XG4gICAgICB0aGlzLl9idWlsZFBvc2l0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRQb3NpdGlvbigpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDMyOyBpKyspIHtcbiAgICAgIGNvbnN0IHQgPSAoaSAvIDE2LjApICogTWF0aC5QSTtcblxuICAgICAgdGhpcy5fYXR0clBvcy5zZXRYWVooaSwgTWF0aC5jb3ModCksIE1hdGguc2luKHQpLCAwLjApO1xuICAgICAgdGhpcy5fYXR0clBvcy5zZXRYWVooMzIgKyBpLCAwLjAsIE1hdGguY29zKHQpLCBNYXRoLnNpbih0KSk7XG4gICAgICB0aGlzLl9hdHRyUG9zLnNldFhZWig2NCArIGksIE1hdGguc2luKHQpLCAwLjAsIE1hdGguY29zKHQpKTtcbiAgICB9XG5cbiAgICB0aGlzLnNjYWxlKHRoaXMuX2N1cnJlbnRSYWRpdXMsIHRoaXMuX2N1cnJlbnRSYWRpdXMsIHRoaXMuX2N1cnJlbnRSYWRpdXMpO1xuICAgIHRoaXMudHJhbnNsYXRlKHRoaXMuX2N1cnJlbnRPZmZzZXQueCwgdGhpcy5fY3VycmVudE9mZnNldC55LCB0aGlzLl9jdXJyZW50T2Zmc2V0LnopO1xuXG4gICAgdGhpcy5fYXR0clBvcy5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIF9idWlsZEluZGV4KCk6IHZvaWQge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzI7IGkrKykge1xuICAgICAgY29uc3QgaTEgPSAoaSArIDEpICUgMzI7XG5cbiAgICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWShpICogMiwgaSwgaTEpO1xuICAgICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKDY0ICsgaSAqIDIsIDMyICsgaSwgMzIgKyBpMSk7XG4gICAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoMTI4ICsgaSAqIDIsIDY0ICsgaSwgNjQgKyBpMSk7XG4gICAgfVxuXG4gICAgdGhpcy5fYXR0ckluZGV4Lm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVKb2ludCB9IGZyb20gJy4uL1ZSTVNwcmluZ0JvbmVKb2ludCc7XG5pbXBvcnQgeyBTcHJpbmdCb25lQnVmZmVyR2VvbWV0cnkgfSBmcm9tICcuL3V0aWxzL1NwcmluZ0JvbmVCdWZmZXJHZW9tZXRyeSc7XG5cbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5leHBvcnQgY2xhc3MgVlJNU3ByaW5nQm9uZUpvaW50SGVscGVyIGV4dGVuZHMgVEhSRUUuR3JvdXAge1xuICBwdWJsaWMgcmVhZG9ubHkgc3ByaW5nQm9uZTogVlJNU3ByaW5nQm9uZUpvaW50O1xuICBwcml2YXRlIHJlYWRvbmx5IF9nZW9tZXRyeTogU3ByaW5nQm9uZUJ1ZmZlckdlb21ldHJ5O1xuICBwcml2YXRlIHJlYWRvbmx5IF9saW5lOiBUSFJFRS5MaW5lU2VnbWVudHM7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHNwcmluZ0JvbmU6IFZSTVNwcmluZ0JvbmVKb2ludCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5tYXRyaXhBdXRvVXBkYXRlID0gZmFsc2U7XG5cbiAgICB0aGlzLnNwcmluZ0JvbmUgPSBzcHJpbmdCb25lO1xuXG4gICAgdGhpcy5fZ2VvbWV0cnkgPSBuZXcgU3ByaW5nQm9uZUJ1ZmZlckdlb21ldHJ5KHRoaXMuc3ByaW5nQm9uZSk7XG5cbiAgICBjb25zdCBtYXRlcmlhbCA9IG5ldyBUSFJFRS5MaW5lQmFzaWNNYXRlcmlhbCh7XG4gICAgICBjb2xvcjogMHhmZmZmMDAsXG4gICAgICBkZXB0aFRlc3Q6IGZhbHNlLFxuICAgICAgZGVwdGhXcml0ZTogZmFsc2UsXG4gICAgfSk7XG5cbiAgICB0aGlzLl9saW5lID0gbmV3IFRIUkVFLkxpbmVTZWdtZW50cyh0aGlzLl9nZW9tZXRyeSwgbWF0ZXJpYWwpO1xuICAgIHRoaXMuYWRkKHRoaXMuX2xpbmUpO1xuICB9XG5cbiAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5fZ2VvbWV0cnkuZGlzcG9zZSgpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZU1hdHJpeFdvcmxkKGZvcmNlOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5zcHJpbmdCb25lLmJvbmUudXBkYXRlV29ybGRNYXRyaXgodHJ1ZSwgZmFsc2UpO1xuXG4gICAgdGhpcy5tYXRyaXguY29weSh0aGlzLnNwcmluZ0JvbmUuYm9uZS5tYXRyaXhXb3JsZCk7XG5cbiAgICBjb25zdCBtYXRyaXhXb3JsZEVsZW1lbnRzID0gdGhpcy5tYXRyaXguZWxlbWVudHM7XG4gICAgdGhpcy5fZ2VvbWV0cnkud29ybGRTY2FsZSA9IF92M0FcbiAgICAgIC5zZXQobWF0cml4V29ybGRFbGVtZW50c1swXSwgbWF0cml4V29ybGRFbGVtZW50c1sxXSwgbWF0cml4V29ybGRFbGVtZW50c1syXSlcbiAgICAgIC5sZW5ndGgoKTsgLy8gY2FsY3VsYXRlIHNjYWxlIG9mIHggY29tcG9uZW50XG5cbiAgICB0aGlzLl9nZW9tZXRyeS51cGRhdGUoKTtcblxuICAgIHN1cGVyLnVwZGF0ZU1hdHJpeFdvcmxkKGZvcmNlKTtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVKb2ludCB9IGZyb20gJy4uLy4uL1ZSTVNwcmluZ0JvbmVKb2ludCc7XG5cbmV4cG9ydCBjbGFzcyBTcHJpbmdCb25lQnVmZmVyR2VvbWV0cnkgZXh0ZW5kcyBUSFJFRS5CdWZmZXJHZW9tZXRyeSB7XG4gIHB1YmxpYyB3b3JsZFNjYWxlID0gMS4wO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgX2F0dHJQb3M6IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZTtcbiAgcHJpdmF0ZSByZWFkb25seSBfYXR0ckluZGV4OiBUSFJFRS5CdWZmZXJBdHRyaWJ1dGU7XG4gIHByaXZhdGUgcmVhZG9ubHkgX3NwcmluZ0JvbmU6IFZSTVNwcmluZ0JvbmVKb2ludDtcbiAgcHJpdmF0ZSBfY3VycmVudFJhZGl1cyA9IDA7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2N1cnJlbnRUYWlsID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuICBwdWJsaWMgY29uc3RydWN0b3Ioc3ByaW5nQm9uZTogVlJNU3ByaW5nQm9uZUpvaW50KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuX3NwcmluZ0JvbmUgPSBzcHJpbmdCb25lO1xuXG4gICAgdGhpcy5fYXR0clBvcyA9IG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUobmV3IEZsb2F0MzJBcnJheSgyOTQpLCAzKTtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgncG9zaXRpb24nLCB0aGlzLl9hdHRyUG9zKTtcblxuICAgIHRoaXMuX2F0dHJJbmRleCA9IG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUobmV3IFVpbnQxNkFycmF5KDE5NCksIDEpO1xuICAgIHRoaXMuc2V0SW5kZXgodGhpcy5fYXR0ckluZGV4KTtcblxuICAgIHRoaXMuX2J1aWxkSW5kZXgoKTtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBsZXQgc2hvdWxkVXBkYXRlR2VvbWV0cnkgPSBmYWxzZTtcblxuICAgIGNvbnN0IHJhZGl1cyA9IHRoaXMuX3NwcmluZ0JvbmUuc2V0dGluZ3MuaGl0UmFkaXVzIC8gdGhpcy53b3JsZFNjYWxlO1xuICAgIGlmICh0aGlzLl9jdXJyZW50UmFkaXVzICE9PSByYWRpdXMpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRSYWRpdXMgPSByYWRpdXM7XG4gICAgICBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9jdXJyZW50VGFpbC5lcXVhbHModGhpcy5fc3ByaW5nQm9uZS5pbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uKSkge1xuICAgICAgdGhpcy5fY3VycmVudFRhaWwuY29weSh0aGlzLl9zcHJpbmdCb25lLmluaXRpYWxMb2NhbENoaWxkUG9zaXRpb24pO1xuICAgICAgc2hvdWxkVXBkYXRlR2VvbWV0cnkgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmIChzaG91bGRVcGRhdGVHZW9tZXRyeSkge1xuICAgICAgdGhpcy5fYnVpbGRQb3NpdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2J1aWxkUG9zaXRpb24oKTogdm9pZCB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzMjsgaSsrKSB7XG4gICAgICBjb25zdCB0ID0gKGkgLyAxNi4wKSAqIE1hdGguUEk7XG5cbiAgICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKGksIE1hdGguY29zKHQpLCBNYXRoLnNpbih0KSwgMC4wKTtcbiAgICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKDMyICsgaSwgMC4wLCBNYXRoLmNvcyh0KSwgTWF0aC5zaW4odCkpO1xuICAgICAgdGhpcy5fYXR0clBvcy5zZXRYWVooNjQgKyBpLCBNYXRoLnNpbih0KSwgMC4wLCBNYXRoLmNvcyh0KSk7XG4gICAgfVxuXG4gICAgdGhpcy5zY2FsZSh0aGlzLl9jdXJyZW50UmFkaXVzLCB0aGlzLl9jdXJyZW50UmFkaXVzLCB0aGlzLl9jdXJyZW50UmFkaXVzKTtcbiAgICB0aGlzLnRyYW5zbGF0ZSh0aGlzLl9jdXJyZW50VGFpbC54LCB0aGlzLl9jdXJyZW50VGFpbC55LCB0aGlzLl9jdXJyZW50VGFpbC56KTtcblxuICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKDk2LCAwLCAwLCAwKTtcbiAgICB0aGlzLl9hdHRyUG9zLnNldFhZWig5NywgdGhpcy5fY3VycmVudFRhaWwueCwgdGhpcy5fY3VycmVudFRhaWwueSwgdGhpcy5fY3VycmVudFRhaWwueik7XG5cbiAgICB0aGlzLl9hdHRyUG9zLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX2J1aWxkSW5kZXgoKTogdm9pZCB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzMjsgaSsrKSB7XG4gICAgICBjb25zdCBpMSA9IChpICsgMSkgJSAzMjtcblxuICAgICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKGkgKiAyLCBpLCBpMSk7XG4gICAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoNjQgKyBpICogMiwgMzIgKyBpLCAzMiArIGkxKTtcbiAgICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWSgxMjggKyBpICogMiwgNjQgKyBpLCA2NCArIGkxKTtcbiAgICB9XG4gICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKDE5MiwgOTYsIDk3KTtcblxuICAgIHRoaXMuX2F0dHJJbmRleC5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgdHlwZSB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZSc7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGNvbGxpZGVyIG9mIGEgc3ByaW5nIGJvbmUuXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1TcHJpbmdCb25lQ29sbGlkZXIgZXh0ZW5kcyBUSFJFRS5PYmplY3QzRCB7XG4gIC8qKlxuICAgKiBUaGUgc2hhcGUgb2YgdGhlIGNvbGxpZGVyLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IHNoYXBlOiBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZTtcblxuICAvKipcbiAgICogV29ybGQgc3BhY2UgbWF0cml4IGZvciB0aGUgY29sbGlkZXIgc2hhcGUgdXNlZCBpbiBjb2xsaXNpb24gY2FsY3VsYXRpb25zLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGNvbGxpZGVyTWF0cml4ID0gbmV3IFRIUkVFLk1hdHJpeDQoKTtcblxuICBwdWJsaWMgY29uc3RydWN0b3Ioc2hhcGU6IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuc2hhcGUgPSBzaGFwZTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVXb3JsZE1hdHJpeCh1cGRhdGVQYXJlbnRzOiBib29sZWFuLCB1cGRhdGVDaGlsZHJlbjogYm9vbGVhbik6IHZvaWQge1xuICAgIHN1cGVyLnVwZGF0ZVdvcmxkTWF0cml4KHVwZGF0ZVBhcmVudHMsIHVwZGF0ZUNoaWxkcmVuKTtcblxuICAgIHVwZGF0ZUNvbGxpZGVyTWF0cml4KHRoaXMuY29sbGlkZXJNYXRyaXgsIHRoaXMubWF0cml4V29ybGQsIHRoaXMuc2hhcGUub2Zmc2V0KTtcbiAgfVxufVxuXG4vKipcbiAqIENvbXB1dGVzIHRoZSBjb2xsaWRlck1hdHJpeCBiYXNlZCBvbiBhbiBvZmZzZXQgYW5kIGEgd29ybGQgbWF0cml4LlxuICogRXF1aXZhbGVudCB0byB0aGUgZm9sbG93aW5nIGNvZGUgd2hlbiBtYXRyaXhXb3JsZCBpcyBhbiBhZmZpbmUgbWF0cml4OlxuICogYGBganNcbiAqIG91dC5tYWtlVHJhbnNsYXRpb24ob2Zmc2V0KS5wcmVtdWx0aXBseShtYXRyaXhXb3JsZClcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSBjb2xsaWRlck1hdHJpeCBUaGUgdGFyZ2V0IG1hdHJpeCB0byBzdG9yZSB0aGUgcmVzdWx0IGluLlxuICogQHBhcmFtIG1hdHJpeFdvcmxkIFRoZSB3b3JsZCBtYXRyaXggZm8gdGhlIGNvbGxpZGVyIG9iamVjdC5cbiAqIEBwYXJhbSBvZmZzZXQgT3B0aW9uYWwgb2Zmc2V0IHRvIHRoZSBjb2xsaWRlciBzaGFwZS5cbiAqL1xuZnVuY3Rpb24gdXBkYXRlQ29sbGlkZXJNYXRyaXgoY29sbGlkZXJNYXRyaXg6IFRIUkVFLk1hdHJpeDQsIG1hdHJpeFdvcmxkOiBUSFJFRS5NYXRyaXg0LCBvZmZzZXQ/OiBUSFJFRS5WZWN0b3IzKSB7XG4gIGNvbnN0IG1lID0gbWF0cml4V29ybGQuZWxlbWVudHM7XG5cbiAgY29sbGlkZXJNYXRyaXguY29weShtYXRyaXhXb3JsZCk7XG5cbiAgaWYgKG9mZnNldCkge1xuICAgIGNvbGxpZGVyTWF0cml4LmVsZW1lbnRzWzEyXSA9IG1lWzBdICogb2Zmc2V0LnggKyBtZVs0XSAqIG9mZnNldC55ICsgbWVbOF0gKiBvZmZzZXQueiArIG1lWzEyXTtcbiAgICBjb2xsaWRlck1hdHJpeC5lbGVtZW50c1sxM10gPSBtZVsxXSAqIG9mZnNldC54ICsgbWVbNV0gKiBvZmZzZXQueSArIG1lWzldICogb2Zmc2V0LnogKyBtZVsxM107XG4gICAgY29sbGlkZXJNYXRyaXguZWxlbWVudHNbMTRdID0gbWVbMl0gKiBvZmZzZXQueCArIG1lWzZdICogb2Zmc2V0LnkgKyBtZVsxMF0gKiBvZmZzZXQueiArIG1lWzE0XTtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IE1hdHJpeDRJbnZlcnNlQ2FjaGUgfSBmcm9tICcuL3V0aWxzL01hdHJpeDRJbnZlcnNlQ2FjaGUnO1xuaW1wb3J0IHR5cGUgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cCB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXAnO1xuaW1wb3J0IHR5cGUgeyBWUk1TcHJpbmdCb25lSm9pbnRTZXR0aW5ncyB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUpvaW50U2V0dGluZ3MnO1xuaW1wb3J0IHR5cGUgeyBWUk1TcHJpbmdCb25lTWFuYWdlciB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZU1hbmFnZXInO1xuXG4vLyBiYXNlZCBvblxuLy8gaHR0cDovL3JvY2tldGp1bXAuc2tyLmpwL3VuaXR5M2QvMTA5L1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL2R3YW5nby9VbmlWUk0vYmxvYi9tYXN0ZXIvU2NyaXB0cy9TcHJpbmdCb25lL1ZSTVNwcmluZ0JvbmUuY3NcblxuY29uc3QgSURFTlRJVFlfTUFUUklYNCA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG5cbi8vIFx1OEEwOFx1N0I5N1x1NEUyRFx1MzA2RVx1NEUwMFx1NjY0Mlx1NEZERFx1NUI1OFx1NzUyOFx1NTkwOVx1NjU3MFx1RkYwOFx1NEUwMFx1NUVBNlx1MzBBNFx1MzBGM1x1MzBCOVx1MzBCRlx1MzBGM1x1MzBCOVx1MzA5Mlx1NEY1Q1x1MzA2M1x1MzA1Rlx1MzA4OVx1MzA0Mlx1MzA2OFx1MzA2Rlx1NEY3Rlx1MzA0NFx1NTZERVx1MzA1OVx1RkYwOVxuY29uc3QgX3YzQSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfdjNCID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuLyoqXG4gKiBBIHRlbXBvcmFyeSB2YXJpYWJsZSB3aGljaCBpcyB1c2VkIGluIGB1cGRhdGVgXG4gKi9cbmNvbnN0IF93b3JsZFNwYWNlUG9zaXRpb24gPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4vKipcbiAqIEEgdGVtcG9yYXJ5IHZhcmlhYmxlIHdoaWNoIGlzIHVzZWQgaW4gYHVwZGF0ZWBcbiAqL1xuY29uc3QgX25leHRUYWlsID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuY29uc3QgX21hdEEgPSBuZXcgVEhSRUUuTWF0cml4NCgpO1xuXG4vKipcbiAqIEEgY2xhc3MgcmVwcmVzZW50cyBhIHNpbmdsZSBqb2ludCBvZiBhIHNwcmluZyBib25lLlxuICogSXQgc2hvdWxkIGJlIG1hbmFnZWQgYnkgYSB7QGxpbmsgVlJNU3ByaW5nQm9uZU1hbmFnZXJ9LlxuICovXG5leHBvcnQgY2xhc3MgVlJNU3ByaW5nQm9uZUpvaW50IHtcbiAgLyoqXG4gICAqIFNldHRpbmdzIG9mIHRoZSBib25lLlxuICAgKi9cbiAgcHVibGljIHNldHRpbmdzOiBWUk1TcHJpbmdCb25lSm9pbnRTZXR0aW5ncztcblxuICAvKipcbiAgICogQ29sbGlkZXIgZ3JvdXBzIGF0dGFjaGVkIHRvIHRoaXMgYm9uZS5cbiAgICovXG4gIHB1YmxpYyBjb2xsaWRlckdyb3VwczogVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXBbXTtcblxuICAvKipcbiAgICogQW4gT2JqZWN0M0QgYXR0YWNoZWQgdG8gdGhpcyBib25lLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGJvbmU6IFRIUkVFLk9iamVjdDNEO1xuXG4gIC8qKlxuICAgKiBBbiBPYmplY3QzRCB0aGF0IHdpbGwgYmUgdXNlZCBhcyBhIHRhaWwgb2YgdGhpcyBzcHJpbmcgYm9uZS5cbiAgICogSXQgY2FuIGJlIG51bGwgd2hlbiB0aGUgc3ByaW5nIGJvbmUgaXMgaW1wb3J0ZWQgZnJvbSBWUk0gMC4wLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGNoaWxkOiBUSFJFRS5PYmplY3QzRCB8IG51bGw7XG5cbiAgLyoqXG4gICAqIEN1cnJlbnQgcG9zaXRpb24gb2YgY2hpbGQgdGFpbCwgaW4gY2VudGVyIHVuaXQuIFdpbGwgYmUgdXNlZCBmb3IgdmVybGV0IGludGVncmF0aW9uLlxuICAgKi9cbiAgcHJpdmF0ZSBfY3VycmVudFRhaWwgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4gIC8qKlxuICAgKiBQcmV2aW91cyBwb3NpdGlvbiBvZiBjaGlsZCB0YWlsLCBpbiBjZW50ZXIgdW5pdC4gV2lsbCBiZSB1c2VkIGZvciB2ZXJsZXQgaW50ZWdyYXRpb24uXG4gICAqL1xuICBwcml2YXRlIF9wcmV2VGFpbCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbiAgLyoqXG4gICAqIEluaXRpYWwgYXhpcyBvZiB0aGUgYm9uZSwgaW4gbG9jYWwgdW5pdC5cbiAgICovXG4gIHByaXZhdGUgX2JvbmVBeGlzID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuICAvKipcbiAgICogTGVuZ3RoIG9mIHRoZSBib25lIGluIHdvcmxkIHVuaXQuXG4gICAqIFdpbGwgYmUgdXNlZCBmb3Igbm9ybWFsaXphdGlvbiBpbiB1cGRhdGUgbG9vcCwgd2lsbCBiZSB1cGRhdGVkIGJ5IHtAbGluayBfY2FsY1dvcmxkU3BhY2VCb25lTGVuZ3RofS5cbiAgICpcbiAgICogSXQncyBzYW1lIGFzIGxvY2FsIHVuaXQgbGVuZ3RoIHVubGVzcyB0aGVyZSBhcmUgc2NhbGUgdHJhbnNmb3JtYXRpb25zIGluIHRoZSB3b3JsZCBzcGFjZS5cbiAgICovXG4gIHByaXZhdGUgX3dvcmxkU3BhY2VCb25lTGVuZ3RoID0gMC4wO1xuXG4gIC8qKlxuICAgKiBTZXQgb2YgZGVwZW5kZW5jaWVzIHRoYXQgbmVlZCB0byBiZSB1cGRhdGVkIGJlZm9yZSB0aGlzIGpvaW50LlxuICAgKi9cbiAgcHVibGljIGdldCBkZXBlbmRlbmNpZXMoKTogU2V0PFRIUkVFLk9iamVjdDNEPiB7XG4gICAgY29uc3Qgc2V0ID0gbmV3IFNldDxUSFJFRS5PYmplY3QzRD4oKTtcblxuICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuYm9uZS5wYXJlbnQ7XG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgc2V0LmFkZChwYXJlbnQpO1xuICAgIH1cblxuICAgIGZvciAobGV0IGNnID0gMDsgY2cgPCB0aGlzLmNvbGxpZGVyR3JvdXBzLmxlbmd0aDsgY2crKykge1xuICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCB0aGlzLmNvbGxpZGVyR3JvdXBzW2NnXS5jb2xsaWRlcnMubGVuZ3RoOyBjKyspIHtcbiAgICAgICAgc2V0LmFkZCh0aGlzLmNvbGxpZGVyR3JvdXBzW2NnXS5jb2xsaWRlcnNbY10pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzZXQ7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBzcHJpbmdib25lIHdpbGwgYmUgY2FsY3VsYXRlZCBiYXNlZCBvbiB0aGUgc3BhY2UgcmVsYXRpdmUgZnJvbSB0aGlzIG9iamVjdC5cbiAgICogSWYgdGhpcyBpcyBgbnVsbGAsIHNwcmluZ2JvbmUgd2lsbCBiZSBjYWxjdWxhdGVkIGluIHdvcmxkIHNwYWNlLlxuICAgKi9cbiAgcHJpdmF0ZSBfY2VudGVyOiBUSFJFRS5PYmplY3QzRCB8IG51bGwgPSBudWxsO1xuICBwdWJsaWMgZ2V0IGNlbnRlcigpOiBUSFJFRS5PYmplY3QzRCB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl9jZW50ZXI7XG4gIH1cbiAgcHVibGljIHNldCBjZW50ZXIoY2VudGVyOiBUSFJFRS5PYmplY3QzRCB8IG51bGwpIHtcbiAgICAvLyB1bmluc3RhbGwgaW52ZXJzZSBjYWNoZVxuICAgIGlmICh0aGlzLl9jZW50ZXI/LnVzZXJEYXRhLmludmVyc2VDYWNoZVByb3h5KSB7XG4gICAgICAodGhpcy5fY2VudGVyLnVzZXJEYXRhLmludmVyc2VDYWNoZVByb3h5IGFzIE1hdHJpeDRJbnZlcnNlQ2FjaGUpLnJldmVydCgpO1xuICAgICAgZGVsZXRlIHRoaXMuX2NlbnRlci51c2VyRGF0YS5pbnZlcnNlQ2FjaGVQcm94eTtcbiAgICB9XG5cbiAgICAvLyBjaGFuZ2UgdGhlIGNlbnRlclxuICAgIHRoaXMuX2NlbnRlciA9IGNlbnRlcjtcblxuICAgIC8vIGluc3RhbGwgaW52ZXJzZSBjYWNoZVxuICAgIGlmICh0aGlzLl9jZW50ZXIpIHtcbiAgICAgIGlmICghdGhpcy5fY2VudGVyLnVzZXJEYXRhLmludmVyc2VDYWNoZVByb3h5KSB7XG4gICAgICAgIHRoaXMuX2NlbnRlci51c2VyRGF0YS5pbnZlcnNlQ2FjaGVQcm94eSA9IG5ldyBNYXRyaXg0SW52ZXJzZUNhY2hlKHRoaXMuX2NlbnRlci5tYXRyaXhXb3JsZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWwgc3RhdGUgb2YgdGhlIGxvY2FsIG1hdHJpeCBvZiB0aGUgYm9uZS5cbiAgICovXG4gIHByaXZhdGUgX2luaXRpYWxMb2NhbE1hdHJpeCA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG5cbiAgLyoqXG4gICAqIEluaXRpYWwgc3RhdGUgb2YgdGhlIHJvdGF0aW9uIG9mIHRoZSBib25lLlxuICAgKi9cbiAgcHJpdmF0ZSBfaW5pdGlhbExvY2FsUm90YXRpb24gPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXG4gIC8qKlxuICAgKiBJbml0aWFsIHN0YXRlIG9mIHRoZSBwb3NpdGlvbiBvZiBpdHMgY2hpbGQuXG4gICAqL1xuICBwcml2YXRlIF9pbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbiAgcHVibGljIGdldCBpbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uKCk6IFRIUkVFLlZlY3RvcjMge1xuICAgIHJldHVybiB0aGlzLl9pbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHdvcmxkIG1hdHJpeCBvZiBpdHMgcGFyZW50IG9iamVjdC5cbiAgICogTm90ZSB0aGF0IGl0IHJldHVybnMgYSByZWZlcmVuY2UgdG8gdGhlIG1hdHJpeC4gRG9uJ3QgbXV0YXRlIHRoaXMgZGlyZWN0bHkhXG4gICAqL1xuICBwcml2YXRlIGdldCBfcGFyZW50TWF0cml4V29ybGQoKTogVEhSRUUuTWF0cml4NCB7XG4gICAgcmV0dXJuIHRoaXMuYm9uZS5wYXJlbnQgPyB0aGlzLmJvbmUucGFyZW50Lm1hdHJpeFdvcmxkIDogSURFTlRJVFlfTUFUUklYNDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgVlJNU3ByaW5nQm9uZS5cbiAgICpcbiAgICogQHBhcmFtIGJvbmUgQW4gT2JqZWN0M0QgdGhhdCB3aWxsIGJlIGF0dGFjaGVkIHRvIHRoaXMgYm9uZVxuICAgKiBAcGFyYW0gY2hpbGQgQW4gT2JqZWN0M0QgdGhhdCB3aWxsIGJlIHVzZWQgYXMgYSB0YWlsIG9mIHRoaXMgc3ByaW5nIGJvbmUuIEl0IGNhbiBiZSBudWxsIHdoZW4gdGhlIHNwcmluZyBib25lIGlzIGltcG9ydGVkIGZyb20gVlJNIDAuMFxuICAgKiBAcGFyYW0gc2V0dGluZ3MgU2V2ZXJhbCBwYXJhbWV0ZXJzIHJlbGF0ZWQgdG8gYmVoYXZpb3Igb2YgdGhlIHNwcmluZyBib25lXG4gICAqIEBwYXJhbSBjb2xsaWRlckdyb3VwcyBDb2xsaWRlciBncm91cHMgdGhhdCB3aWxsIGJlIGNvbGxpZGVkIHdpdGggdGhpcyBzcHJpbmcgYm9uZVxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgYm9uZTogVEhSRUUuT2JqZWN0M0QsXG4gICAgY2hpbGQ6IFRIUkVFLk9iamVjdDNEIHwgbnVsbCxcbiAgICBzZXR0aW5nczogUGFydGlhbDxWUk1TcHJpbmdCb25lSm9pbnRTZXR0aW5ncz4gPSB7fSxcbiAgICBjb2xsaWRlckdyb3VwczogVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXBbXSA9IFtdLFxuICApIHtcbiAgICB0aGlzLmJvbmUgPSBib25lOyAvLyB1bmlWUk1cdTMwNjdcdTMwNkUgcGFyZW50XG4gICAgdGhpcy5ib25lLm1hdHJpeEF1dG9VcGRhdGUgPSBmYWxzZTsgLy8gdXBkYXRlXHUzMDZCXHUzMDg4XHUzMDhBXHU4QTA4XHU3Qjk3XHUzMDU1XHUzMDhDXHUzMDhCXHUzMDZFXHUzMDY3dGhyZWUuanNcdTUxODVcdTMwNjdcdTMwNkVcdTgxRUFcdTUyRDVcdTUxRTZcdTc0MDZcdTMwNkZcdTRFMERcdTg5ODFcblxuICAgIHRoaXMuY2hpbGQgPSBjaGlsZDtcblxuICAgIHRoaXMuc2V0dGluZ3MgPSB7XG4gICAgICBoaXRSYWRpdXM6IHNldHRpbmdzLmhpdFJhZGl1cyA/PyAwLjAsXG4gICAgICBzdGlmZm5lc3M6IHNldHRpbmdzLnN0aWZmbmVzcyA/PyAxLjAsXG4gICAgICBncmF2aXR5UG93ZXI6IHNldHRpbmdzLmdyYXZpdHlQb3dlciA/PyAwLjAsXG4gICAgICBncmF2aXR5RGlyOiBzZXR0aW5ncy5ncmF2aXR5RGlyPy5jbG9uZSgpID8/IG5ldyBUSFJFRS5WZWN0b3IzKDAuMCwgLTEuMCwgMC4wKSxcbiAgICAgIGRyYWdGb3JjZTogc2V0dGluZ3MuZHJhZ0ZvcmNlID8/IDAuNCxcbiAgICB9O1xuXG4gICAgdGhpcy5jb2xsaWRlckdyb3VwcyA9IGNvbGxpZGVyR3JvdXBzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgaW5pdGlhbCBzdGF0ZSBvZiB0aGlzIHNwcmluZyBib25lLlxuICAgKiBZb3UgbWlnaHQgd2FudCB0byBjYWxsIHtAbGluayBWUk1TcHJpbmdCb25lTWFuYWdlci5zZXRJbml0U3RhdGV9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgc2V0SW5pdFN0YXRlKCk6IHZvaWQge1xuICAgIC8vIHJlbWVtYmVyIGluaXRpYWwgcG9zaXRpb24gb2YgaXRzZWxmXG4gICAgdGhpcy5faW5pdGlhbExvY2FsTWF0cml4LmNvcHkodGhpcy5ib25lLm1hdHJpeCk7XG4gICAgdGhpcy5faW5pdGlhbExvY2FsUm90YXRpb24uY29weSh0aGlzLmJvbmUucXVhdGVybmlvbik7XG5cbiAgICAvLyBzZWUgaW5pdGlhbCBwb3NpdGlvbiBvZiBpdHMgbG9jYWwgY2hpbGRcbiAgICBpZiAodGhpcy5jaGlsZCkge1xuICAgICAgdGhpcy5faW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbi5jb3B5KHRoaXMuY2hpbGQucG9zaXRpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyB2cm0wIHJlcXVpcmVzIGEgN2NtIGZpeGVkIGJvbmUgbGVuZ3RoIGZvciB0aGUgZmluYWwgbm9kZSBpbiBhIGNoYWluXG4gICAgICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS92cm0tYy92cm0tc3BlY2lmaWNhdGlvbi90cmVlL21hc3Rlci9zcGVjaWZpY2F0aW9uL1ZSTUNfc3ByaW5nQm9uZS0xLjAjYWJvdXQtc3ByaW5nLWNvbmZpZ3VyYXRpb25cbiAgICAgIHRoaXMuX2luaXRpYWxMb2NhbENoaWxkUG9zaXRpb24uY29weSh0aGlzLmJvbmUucG9zaXRpb24pLm5vcm1hbGl6ZSgpLm11bHRpcGx5U2NhbGFyKDAuMDcpO1xuICAgIH1cblxuICAgIC8vIGNvcHkgdGhlIGNoaWxkIHBvc2l0aW9uIHRvIHRhaWxzXG4gICAgY29uc3QgbWF0cml4V29ybGRUb0NlbnRlciA9IHRoaXMuX2dldE1hdHJpeFdvcmxkVG9DZW50ZXIoKTtcbiAgICB0aGlzLmJvbmUubG9jYWxUb1dvcmxkKHRoaXMuX2N1cnJlbnRUYWlsLmNvcHkodGhpcy5faW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbikpLmFwcGx5TWF0cml4NChtYXRyaXhXb3JsZFRvQ2VudGVyKTtcbiAgICB0aGlzLl9wcmV2VGFpbC5jb3B5KHRoaXMuX2N1cnJlbnRUYWlsKTtcblxuICAgIC8vIHNldCBpbml0aWFsIHN0YXRlcyB0aGF0IGFyZSByZWxhdGVkIHRvIGxvY2FsIGNoaWxkIHBvc2l0aW9uXG4gICAgdGhpcy5fYm9uZUF4aXMuY29weSh0aGlzLl9pbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uKS5ub3JtYWxpemUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGUgc3RhdGUgb2YgdGhpcyBib25lLlxuICAgKiBZb3UgbWlnaHQgd2FudCB0byBjYWxsIHtAbGluayBWUk1TcHJpbmdCb25lTWFuYWdlci5yZXNldH0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLmJvbmUucXVhdGVybmlvbi5jb3B5KHRoaXMuX2luaXRpYWxMb2NhbFJvdGF0aW9uKTtcblxuICAgIC8vIFdlIG5lZWQgdG8gdXBkYXRlIGl0cyBtYXRyaXhXb3JsZCBtYW51YWxseSwgc2luY2Ugd2UgdHdlYWtlZCB0aGUgYm9uZSBieSBvdXIgaGFuZFxuICAgIHRoaXMuYm9uZS51cGRhdGVNYXRyaXgoKTtcbiAgICB0aGlzLmJvbmUubWF0cml4V29ybGQubXVsdGlwbHlNYXRyaWNlcyh0aGlzLl9wYXJlbnRNYXRyaXhXb3JsZCwgdGhpcy5ib25lLm1hdHJpeCk7XG5cbiAgICAvLyBBcHBseSB1cGRhdGVkIHBvc2l0aW9uIHRvIHRhaWwgc3RhdGVzXG4gICAgY29uc3QgbWF0cml4V29ybGRUb0NlbnRlciA9IHRoaXMuX2dldE1hdHJpeFdvcmxkVG9DZW50ZXIoKTtcbiAgICB0aGlzLmJvbmUubG9jYWxUb1dvcmxkKHRoaXMuX2N1cnJlbnRUYWlsLmNvcHkodGhpcy5faW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbikpLmFwcGx5TWF0cml4NChtYXRyaXhXb3JsZFRvQ2VudGVyKTtcbiAgICB0aGlzLl9wcmV2VGFpbC5jb3B5KHRoaXMuX2N1cnJlbnRUYWlsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIHN0YXRlIG9mIHRoaXMgYm9uZS5cbiAgICogWW91IG1pZ2h0IHdhbnQgdG8gY2FsbCB7QGxpbmsgVlJNU3ByaW5nQm9uZU1hbmFnZXIudXBkYXRlfSBpbnN0ZWFkLlxuICAgKlxuICAgKiBAcGFyYW0gZGVsdGEgZGVsdGFUaW1lXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoZGVsdGEgPD0gMCkgcmV0dXJuO1xuXG4gICAgLy8gVXBkYXRlIHRoZSBfd29ybGRTcGFjZUJvbmVMZW5ndGhcbiAgICB0aGlzLl9jYWxjV29ybGRTcGFjZUJvbmVMZW5ndGgoKTtcblxuICAgIC8vIEdldCBib25lQXhpcyBpbiB3b3JsZCBzcGFjZVxuICAgIGNvbnN0IHdvcmxkU3BhY2VCb25lQXhpcyA9IF92M0JcbiAgICAgIC5jb3B5KHRoaXMuX2JvbmVBeGlzKVxuICAgICAgLnRyYW5zZm9ybURpcmVjdGlvbih0aGlzLl9pbml0aWFsTG9jYWxNYXRyaXgpXG4gICAgICAudHJhbnNmb3JtRGlyZWN0aW9uKHRoaXMuX3BhcmVudE1hdHJpeFdvcmxkKTtcblxuICAgIC8vIHZlcmxldFx1N0E0RFx1NTIwNlx1MzA2N1x1NkIyMVx1MzA2RVx1NEY0RFx1N0Y2RVx1MzA5Mlx1OEEwOFx1N0I5N1xuICAgIF9uZXh0VGFpbFxuICAgICAgLy8gRGV0ZXJtaW5lIGluZXJ0aWEgaW4gY2VudGVyIHNwYWNlXG4gICAgICAuY29weSh0aGlzLl9jdXJyZW50VGFpbClcbiAgICAgIC5hZGQoX3YzQS5zdWJWZWN0b3JzKHRoaXMuX2N1cnJlbnRUYWlsLCB0aGlzLl9wcmV2VGFpbCkubXVsdGlwbHlTY2FsYXIoMSAtIHRoaXMuc2V0dGluZ3MuZHJhZ0ZvcmNlKSkgLy8gXHU1MjREXHUzMEQ1XHUzMEVDXHUzMEZDXHUzMEUwXHUzMDZFXHU3OUZCXHU1MkQ1XHUzMDkyXHU3RDk5XHU3RDlBXHUzMDU5XHUzMDhCKFx1NkUxQlx1ODg3MFx1MzA4Mlx1MzA0Mlx1MzA4Qlx1MzA4OClcbiAgICAgIC8vIENvbnZlcnQgY2VudGVyIHNwYWNlIHRvIHdvcmxkIHNwYWNlXG4gICAgICAuYXBwbHlNYXRyaXg0KHRoaXMuX2dldE1hdHJpeENlbnRlclRvV29ybGQoKSkgLy8gdGFpbFx1MzA5MndvcmxkIHNwYWNlXHUzMDZCXHU2MjNCXHUzMDU5XG4gICAgICAvLyBBcHBseSBzdGlmZm5lc3MgYW5kIGdyYXZpdHkgaW4gd29ybGQgc3BhY2VcbiAgICAgIC5hZGRTY2FsZWRWZWN0b3Iod29ybGRTcGFjZUJvbmVBeGlzLCB0aGlzLnNldHRpbmdzLnN0aWZmbmVzcyAqIGRlbHRhKSAvLyBcdTg5QUFcdTMwNkVcdTU2REVcdThFRTJcdTMwNkJcdTMwODhcdTMwOEJcdTVCNTBcdTMwRENcdTMwRkNcdTMwRjNcdTMwNkVcdTc5RkJcdTUyRDVcdTc2RUVcdTZBMTlcbiAgICAgIC5hZGRTY2FsZWRWZWN0b3IodGhpcy5zZXR0aW5ncy5ncmF2aXR5RGlyLCB0aGlzLnNldHRpbmdzLmdyYXZpdHlQb3dlciAqIGRlbHRhKTsgLy8gXHU1OTE2XHU1MjlCXHUzMDZCXHUzMDg4XHUzMDhCXHU3OUZCXHU1MkQ1XHU5MUNGXG5cbiAgICAvLyBub3JtYWxpemUgYm9uZSBsZW5ndGhcbiAgICBfd29ybGRTcGFjZVBvc2l0aW9uLnNldEZyb21NYXRyaXhQb3NpdGlvbih0aGlzLmJvbmUubWF0cml4V29ybGQpO1xuICAgIF9uZXh0VGFpbC5zdWIoX3dvcmxkU3BhY2VQb3NpdGlvbikubm9ybWFsaXplKCkubXVsdGlwbHlTY2FsYXIodGhpcy5fd29ybGRTcGFjZUJvbmVMZW5ndGgpLmFkZChfd29ybGRTcGFjZVBvc2l0aW9uKTtcblxuICAgIC8vIENvbGxpc2lvblx1MzA2N1x1NzlGQlx1NTJENVxuICAgIHRoaXMuX2NvbGxpc2lvbihfbmV4dFRhaWwpO1xuXG4gICAgLy8gdXBkYXRlIHByZXZUYWlsIGFuZCBjdXJyZW50VGFpbFxuICAgIHRoaXMuX3ByZXZUYWlsLmNvcHkodGhpcy5fY3VycmVudFRhaWwpO1xuICAgIHRoaXMuX2N1cnJlbnRUYWlsLmNvcHkoX25leHRUYWlsKS5hcHBseU1hdHJpeDQodGhpcy5fZ2V0TWF0cml4V29ybGRUb0NlbnRlcigpKTtcblxuICAgIC8vIEFwcGx5IHJvdGF0aW9uLCBjb252ZXJ0IHZlY3RvcjMgdGhpbmcgaW50byBhY3R1YWwgcXVhdGVybmlvblxuICAgIC8vIE9yaWdpbmFsIFVuaVZSTSBpcyBkb2luZyBjZW50ZXIgdW5pdCBjYWxjdWx1cyBhdCBoZXJlIGJ1dCB3ZSdyZSBnb25uYSBkbyB0aGlzIG9uIGxvY2FsIHVuaXRcbiAgICBjb25zdCB3b3JsZFNwYWNlSW5pdGlhbE1hdHJpeEludiA9IF9tYXRBXG4gICAgICAubXVsdGlwbHlNYXRyaWNlcyh0aGlzLl9wYXJlbnRNYXRyaXhXb3JsZCwgdGhpcy5faW5pdGlhbExvY2FsTWF0cml4KVxuICAgICAgLmludmVydCgpO1xuICAgIHRoaXMuYm9uZS5xdWF0ZXJuaW9uXG4gICAgICAuc2V0RnJvbVVuaXRWZWN0b3JzKHRoaXMuX2JvbmVBeGlzLCBfdjNBLmNvcHkoX25leHRUYWlsKS5hcHBseU1hdHJpeDQod29ybGRTcGFjZUluaXRpYWxNYXRyaXhJbnYpLm5vcm1hbGl6ZSgpKVxuICAgICAgLnByZW11bHRpcGx5KHRoaXMuX2luaXRpYWxMb2NhbFJvdGF0aW9uKTtcblxuICAgIC8vIFdlIG5lZWQgdG8gdXBkYXRlIGl0cyBtYXRyaXhXb3JsZCBtYW51YWxseSwgc2luY2Ugd2UgdHdlYWtlZCB0aGUgYm9uZSBieSBvdXIgaGFuZFxuICAgIHRoaXMuYm9uZS51cGRhdGVNYXRyaXgoKTtcbiAgICB0aGlzLmJvbmUubWF0cml4V29ybGQubXVsdGlwbHlNYXRyaWNlcyh0aGlzLl9wYXJlbnRNYXRyaXhXb3JsZCwgdGhpcy5ib25lLm1hdHJpeCk7XG4gIH1cblxuICAvKipcbiAgICogRG8gY29sbGlzaW9uIG1hdGggYWdhaW5zdCBldmVyeSBjb2xsaWRlcnMgYXR0YWNoZWQgdG8gdGhpcyBib25lLlxuICAgKlxuICAgKiBAcGFyYW0gdGFpbCBUaGUgdGFpbCB5b3Ugd2FudCB0byBwcm9jZXNzXG4gICAqL1xuICBwcml2YXRlIF9jb2xsaXNpb24odGFpbDogVEhSRUUuVmVjdG9yMyk6IHZvaWQge1xuICAgIGZvciAobGV0IGNnID0gMDsgY2cgPCB0aGlzLmNvbGxpZGVyR3JvdXBzLmxlbmd0aDsgY2crKykge1xuICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCB0aGlzLmNvbGxpZGVyR3JvdXBzW2NnXS5jb2xsaWRlcnMubGVuZ3RoOyBjKyspIHtcbiAgICAgICAgY29uc3QgY29sbGlkZXIgPSB0aGlzLmNvbGxpZGVyR3JvdXBzW2NnXS5jb2xsaWRlcnNbY107XG4gICAgICAgIGNvbnN0IGRpc3QgPSBjb2xsaWRlci5zaGFwZS5jYWxjdWxhdGVDb2xsaXNpb24oY29sbGlkZXIuY29sbGlkZXJNYXRyaXgsIHRhaWwsIHRoaXMuc2V0dGluZ3MuaGl0UmFkaXVzLCBfdjNBKTtcblxuICAgICAgICBpZiAoZGlzdCA8IDAuMCkge1xuICAgICAgICAgIC8vIGhpdFxuICAgICAgICAgIHRhaWwuYWRkU2NhbGVkVmVjdG9yKF92M0EsIC1kaXN0KTtcblxuICAgICAgICAgIC8vIG5vcm1hbGl6ZSBib25lIGxlbmd0aFxuICAgICAgICAgIHRhaWwuc3ViKF93b3JsZFNwYWNlUG9zaXRpb24pO1xuICAgICAgICAgIGNvbnN0IGxlbmd0aCA9IHRhaWwubGVuZ3RoKCk7XG4gICAgICAgICAgdGFpbC5tdWx0aXBseVNjYWxhcih0aGlzLl93b3JsZFNwYWNlQm9uZUxlbmd0aCAvIGxlbmd0aCkuYWRkKF93b3JsZFNwYWNlUG9zaXRpb24pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSB0aGUge0BsaW5rIF93b3JsZFNwYWNlQm9uZUxlbmd0aH0uXG4gICAqIEludGVuZGVkIHRvIGJlIHVzZWQgaW4ge0BsaW5rIHVwZGF0ZX0uXG4gICAqL1xuICBwcml2YXRlIF9jYWxjV29ybGRTcGFjZUJvbmVMZW5ndGgoKTogdm9pZCB7XG4gICAgX3YzQS5zZXRGcm9tTWF0cml4UG9zaXRpb24odGhpcy5ib25lLm1hdHJpeFdvcmxkKTsgLy8gZ2V0IHdvcmxkIHBvc2l0aW9uIG9mIHRoaXMuYm9uZVxuXG4gICAgaWYgKHRoaXMuY2hpbGQpIHtcbiAgICAgIF92M0Iuc2V0RnJvbU1hdHJpeFBvc2l0aW9uKHRoaXMuY2hpbGQubWF0cml4V29ybGQpOyAvLyBnZXQgd29ybGQgcG9zaXRpb24gb2YgdGhpcy5jaGlsZFxuICAgIH0gZWxzZSB7XG4gICAgICBfdjNCLmNvcHkodGhpcy5faW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbik7XG4gICAgICBfdjNCLmFwcGx5TWF0cml4NCh0aGlzLmJvbmUubWF0cml4V29ybGQpO1xuICAgIH1cblxuICAgIHRoaXMuX3dvcmxkU3BhY2VCb25lTGVuZ3RoID0gX3YzQS5zdWIoX3YzQikubGVuZ3RoKCk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbWF0cml4IHRoYXQgY29udmVydHMgY2VudGVyIHNwYWNlIGludG8gd29ybGQgc3BhY2UuXG4gICAqL1xuICBwcml2YXRlIF9nZXRNYXRyaXhDZW50ZXJUb1dvcmxkKCk6IFRIUkVFLk1hdHJpeDQge1xuICAgIHJldHVybiB0aGlzLl9jZW50ZXIgPyB0aGlzLl9jZW50ZXIubWF0cml4V29ybGQgOiBJREVOVElUWV9NQVRSSVg0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG1hdHJpeCB0aGF0IGNvbnZlcnRzIHdvcmxkIHNwYWNlIGludG8gY2VudGVyIHNwYWNlLlxuICAgKi9cbiAgcHJpdmF0ZSBfZ2V0TWF0cml4V29ybGRUb0NlbnRlcigpOiBUSFJFRS5NYXRyaXg0IHtcbiAgICByZXR1cm4gdGhpcy5fY2VudGVyID8gKHRoaXMuX2NlbnRlci51c2VyRGF0YS5pbnZlcnNlQ2FjaGVQcm94eSBhcyBNYXRyaXg0SW52ZXJzZUNhY2hlKS5pbnZlcnNlIDogSURFTlRJVFlfTUFUUklYNDtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IG1hdDRJbnZlcnRDb21wYXQgfSBmcm9tICcuL21hdDRJbnZlcnRDb21wYXQnO1xuXG5leHBvcnQgY2xhc3MgTWF0cml4NEludmVyc2VDYWNoZSB7XG4gIC8qKlxuICAgKiBUaGUgdGFyZ2V0IG1hdHJpeC5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBtYXRyaXg6IFRIUkVFLk1hdHJpeDQ7XG5cbiAgLyoqXG4gICAqIEEgY2FjaGUgb2YgaW52ZXJzZSBvZiBjdXJyZW50IG1hdHJpeC5cbiAgICovXG4gIHByaXZhdGUgcmVhZG9ubHkgX2ludmVyc2VDYWNoZSA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG5cbiAgLyoqXG4gICAqIEEgZmxhZyB0aGF0IG1ha2VzIGl0IHdhbnQgdG8gcmVjYWxjdWxhdGUgaXRzIHtAbGluayBfaW52ZXJzZUNhY2hlfS5cbiAgICogV2lsbCBiZSBzZXQgYHRydWVgIHdoZW4gYGVsZW1lbnRzYCBhcmUgbXV0YXRlZCBhbmQgYmUgdXNlZCBpbiBgZ2V0SW52ZXJzZWAuXG4gICAqL1xuICBwcml2YXRlIF9zaG91bGRVcGRhdGVJbnZlcnNlID0gdHJ1ZTtcblxuICAvKipcbiAgICogVGhlIG9yaWdpbmFsIG9mIGBtYXRyaXguZWxlbWVudHNgXG4gICAqL1xuICBwcml2YXRlIHJlYWRvbmx5IF9vcmlnaW5hbEVsZW1lbnRzOiBUSFJFRS5NYXRyaXg0VHVwbGU7XG5cbiAgLyoqXG4gICAqIEludmVyc2Ugb2YgZ2l2ZW4gbWF0cml4LlxuICAgKiBOb3RlIHRoYXQgaXQgd2lsbCByZXR1cm4gaXRzIGludGVybmFsIHByaXZhdGUgaW5zdGFuY2UuXG4gICAqIE1ha2Ugc3VyZSBjb3B5aW5nIHRoaXMgYmVmb3JlIG11dGF0ZSB0aGlzLlxuICAgKi9cbiAgcHVibGljIGdldCBpbnZlcnNlKCk6IFRIUkVFLk1hdHJpeDQge1xuICAgIGlmICh0aGlzLl9zaG91bGRVcGRhdGVJbnZlcnNlKSB7XG4gICAgICBtYXQ0SW52ZXJ0Q29tcGF0KHRoaXMuX2ludmVyc2VDYWNoZS5jb3B5KHRoaXMubWF0cml4KSk7XG4gICAgICB0aGlzLl9zaG91bGRVcGRhdGVJbnZlcnNlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX2ludmVyc2VDYWNoZTtcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihtYXRyaXg6IFRIUkVFLk1hdHJpeDQpIHtcbiAgICB0aGlzLm1hdHJpeCA9IG1hdHJpeDtcblxuICAgIGNvbnN0IGhhbmRsZXI6IFByb3h5SGFuZGxlcjxudW1iZXJbXT4gPSB7XG4gICAgICBzZXQ6IChvYmosIHByb3A6IGFueSwgbmV3VmFsKSA9PiB7XG4gICAgICAgIHRoaXMuX3Nob3VsZFVwZGF0ZUludmVyc2UgPSB0cnVlO1xuICAgICAgICBvYmpbcHJvcF0gPSBuZXdWYWw7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9LFxuICAgIH07XG5cbiAgICB0aGlzLl9vcmlnaW5hbEVsZW1lbnRzID0gbWF0cml4LmVsZW1lbnRzO1xuICAgIG1hdHJpeC5lbGVtZW50cyA9IG5ldyBQcm94eTxUSFJFRS5NYXRyaXg0VHVwbGU+KG1hdHJpeC5lbGVtZW50cywgaGFuZGxlcik7XG4gIH1cblxuICBwdWJsaWMgcmV2ZXJ0KCk6IHZvaWQge1xuICAgIHRoaXMubWF0cml4LmVsZW1lbnRzID0gdGhpcy5fb3JpZ2luYWxFbGVtZW50cztcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuY29uc3QgX21hdEEgPSBuZXcgVEhSRUUuTWF0cml4NCgpO1xuXG4vKipcbiAqIEEgY29tcGF0IGZ1bmN0aW9uIGZvciBgTWF0cml4NC5pbnZlcnQoKWAgLyBgTWF0cml4NC5nZXRJbnZlcnNlKClgLlxuICogYE1hdHJpeDQuaW52ZXJ0KClgIGlzIGludHJvZHVjZWQgaW4gcjEyMyBhbmQgYE1hdHJpeDQuZ2V0SW52ZXJzZSgpYCBlbWl0cyBhIHdhcm5pbmcuXG4gKiBXZSBhcmUgZ29pbmcgdG8gdXNlIHRoaXMgY29tcGF0IGZvciBhIHdoaWxlLlxuICogQHBhcmFtIHRhcmdldCBBIHRhcmdldCBtYXRyaXhcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hdDRJbnZlcnRDb21wYXQ8VCBleHRlbmRzIFRIUkVFLk1hdHJpeDQ+KHRhcmdldDogVCk6IFQge1xuICBpZiAoKHRhcmdldCBhcyBhbnkpLmludmVydCkge1xuICAgIHRhcmdldC5pbnZlcnQoKTtcbiAgfSBlbHNlIHtcbiAgICAodGFyZ2V0IGFzIGFueSkuZ2V0SW52ZXJzZShfbWF0QS5jb3B5KHRhcmdldCkpO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cbiIsICJpbXBvcnQgdHlwZSAqIGFzIFYwVlJNIGZyb20gJ0BwaXhpdi90eXBlcy12cm0tMC4wJztcbmltcG9ydCB0eXBlICogYXMgVjFTcHJpbmdCb25lU2NoZW1hIGZyb20gJ0BwaXhpdi90eXBlcy12cm1jLXNwcmluZ2JvbmUtMS4wJztcbmltcG9ydCB0eXBlICogYXMgU3ByaW5nQm9uZUV4dGVuZGVkQ29sbGlkZXJTY2hlbWEgZnJvbSAnQHBpeGl2L3R5cGVzLXZybWMtc3ByaW5nYm9uZS1leHRlbmRlZC1jb2xsaWRlci0xLjAnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHR5cGUgeyBHTFRGLCBHTFRGTG9hZGVyUGx1Z2luLCBHTFRGUGFyc2VyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlci5qcyc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXJIZWxwZXIsIFZSTVNwcmluZ0JvbmVKb2ludEhlbHBlciB9IGZyb20gJy4vaGVscGVycyc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXIgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVDb2xsaWRlcic7XG5pbXBvcnQgdHlwZSB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cCc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZUNhcHN1bGUgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlQ2Fwc3VsZSc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZVNwaGVyZSB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVTcGhlcmUnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUpvaW50IH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lSm9pbnQnO1xuaW1wb3J0IHR5cGUgeyBWUk1TcHJpbmdCb25lTG9hZGVyUGx1Z2luT3B0aW9ucyB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUxvYWRlclBsdWdpbk9wdGlvbnMnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZU1hbmFnZXIgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVNYW5hZ2VyJztcbmltcG9ydCB0eXBlIHsgVlJNU3ByaW5nQm9uZUpvaW50U2V0dGluZ3MgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVKb2ludFNldHRpbmdzJztcbmltcG9ydCB7IEdMVEYgYXMgR0xURlNjaGVtYSB9IGZyb20gJ0BnbHRmLXRyYW5zZm9ybS9jb3JlJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlUGxhbmUgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlUGxhbmUnO1xuXG5jb25zdCBFWFRFTlNJT05fTkFNRV9FWFRFTkRFRF9DT0xMSURFUiA9ICdWUk1DX3NwcmluZ0JvbmVfZXh0ZW5kZWRfY29sbGlkZXInO1xuXG4vKipcbiAqIFBvc3NpYmxlIHNwZWMgdmVyc2lvbnMgaXQgcmVjb2duaXplcy5cbiAqL1xuY29uc3QgUE9TU0lCTEVfU1BFQ19WRVJTSU9OUyA9IG5ldyBTZXQoWycxLjAnLCAnMS4wLWJldGEnXSk7XG5cbi8qKlxuICogUG9zc2libGUgc3BlYyB2ZXJzaW9ucyBvZiBgVlJNQ19zcHJpbmdCb25lX2V4dGVuZGVkX2NvbGxpZGVyYCBpdCByZWNvZ25pemVzLlxuICovXG5jb25zdCBQT1NTSUJMRV9TUEVDX1ZFUlNJT05TX0VYVEVOREVEX0NPTExJREVSUyA9IG5ldyBTZXQoWycxLjAnXSk7XG5cbmV4cG9ydCBjbGFzcyBWUk1TcHJpbmdCb25lTG9hZGVyUGx1Z2luIGltcGxlbWVudHMgR0xURkxvYWRlclBsdWdpbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgRVhURU5TSU9OX05BTUUgPSAnVlJNQ19zcHJpbmdCb25lJztcblxuICAvKipcbiAgICogU3BlY2lmeSBhbiBPYmplY3QzRCB0byBhZGQge0BsaW5rIFZSTVNwcmluZ0JvbmVKb2ludEhlbHBlcn0gcy5cbiAgICogSWYgbm90IHNwZWNpZmllZCwgaGVscGVyIHdpbGwgbm90IGJlIGNyZWF0ZWQuXG4gICAqIElmIGByZW5kZXJPcmRlcmAgaXMgc2V0IHRvIHRoZSByb290LCBoZWxwZXJzIHdpbGwgY29weSB0aGUgc2FtZSBgcmVuZGVyT3JkZXJgIC5cbiAgICovXG4gIHB1YmxpYyBqb2ludEhlbHBlclJvb3Q/OiBUSFJFRS5PYmplY3QzRDtcblxuICAvKipcbiAgICogU3BlY2lmeSBhbiBPYmplY3QzRCB0byBhZGQge0BsaW5rIFZSTVNwcmluZ0JvbmVKb2ludEhlbHBlcn0gcy5cbiAgICogSWYgbm90IHNwZWNpZmllZCwgaGVscGVyIHdpbGwgbm90IGJlIGNyZWF0ZWQuXG4gICAqIElmIGByZW5kZXJPcmRlcmAgaXMgc2V0IHRvIHRoZSByb290LCBoZWxwZXJzIHdpbGwgY29weSB0aGUgc2FtZSBgcmVuZGVyT3JkZXJgIC5cbiAgICovXG4gIHB1YmxpYyBjb2xsaWRlckhlbHBlclJvb3Q/OiBUSFJFRS5PYmplY3QzRDtcblxuICAvKipcbiAgICogSWYgdHJ1ZSwgbG9hZCBjb2xsaWRlcnMgZGVmaW5lZCBpbiBgVlJNQ19zcHJpbmdCb25lX2V4dGVuZGVkX2NvbGxpZGVyYC5cbiAgICogU2V0IHRvIGBmYWxzZWAgdG8gZGlzYWJsZSBsb2FkaW5nIGV4dGVuZGVkIGNvbGxpZGVycyBhbmQgdXNlIHRoZSBmYWxsYmFjayBiZWhhdmlvci5cbiAgICogYHRydWVgIGJ5IGRlZmF1bHQuXG4gICAqL1xuICBwdWJsaWMgdXNlRXh0ZW5kZWRDb2xsaWRlcnM6IGJvb2xlYW47XG5cbiAgcHVibGljIHJlYWRvbmx5IHBhcnNlcjogR0xURlBhcnNlcjtcblxuICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gVlJNU3ByaW5nQm9uZUxvYWRlclBsdWdpbi5FWFRFTlNJT05fTkFNRTtcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJzZXI6IEdMVEZQYXJzZXIsIG9wdGlvbnM/OiBWUk1TcHJpbmdCb25lTG9hZGVyUGx1Z2luT3B0aW9ucykge1xuICAgIHRoaXMucGFyc2VyID0gcGFyc2VyO1xuXG4gICAgdGhpcy5qb2ludEhlbHBlclJvb3QgPSBvcHRpb25zPy5qb2ludEhlbHBlclJvb3Q7XG4gICAgdGhpcy5jb2xsaWRlckhlbHBlclJvb3QgPSBvcHRpb25zPy5jb2xsaWRlckhlbHBlclJvb3Q7XG4gICAgdGhpcy51c2VFeHRlbmRlZENvbGxpZGVycyA9IG9wdGlvbnM/LnVzZUV4dGVuZGVkQ29sbGlkZXJzID8/IHRydWU7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgYWZ0ZXJSb290KGdsdGY6IEdMVEYpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBnbHRmLnVzZXJEYXRhLnZybVNwcmluZ0JvbmVNYW5hZ2VyID0gYXdhaXQgdGhpcy5faW1wb3J0KGdsdGYpO1xuICB9XG5cbiAgLyoqXG4gICAqIEltcG9ydCBzcHJpbmcgYm9uZXMgZnJvbSBhIEdMVEYgYW5kIHJldHVybiBhIHtAbGluayBWUk1TcHJpbmdCb25lTWFuYWdlcn0uXG4gICAqIEl0IG1pZ2h0IHJldHVybiBgbnVsbGAgaW5zdGVhZCB3aGVuIGl0IGRvZXMgbm90IG5lZWQgdG8gYmUgY3JlYXRlZCBvciBzb21ldGhpbmcgZ28gd3JvbmcuXG4gICAqXG4gICAqIEBwYXJhbSBnbHRmIEEgcGFyc2VkIHJlc3VsdCBvZiBHTFRGIHRha2VuIGZyb20gR0xURkxvYWRlclxuICAgKi9cbiAgcHJpdmF0ZSBhc3luYyBfaW1wb3J0KGdsdGY6IEdMVEYpOiBQcm9taXNlPFZSTVNwcmluZ0JvbmVNYW5hZ2VyIHwgbnVsbD4ge1xuICAgIGNvbnN0IHYxUmVzdWx0ID0gYXdhaXQgdGhpcy5fdjFJbXBvcnQoZ2x0Zik7XG4gICAgaWYgKHYxUmVzdWx0ICE9IG51bGwpIHtcbiAgICAgIHJldHVybiB2MVJlc3VsdDtcbiAgICB9XG5cbiAgICBjb25zdCB2MFJlc3VsdCA9IGF3YWl0IHRoaXMuX3YwSW1wb3J0KGdsdGYpO1xuICAgIGlmICh2MFJlc3VsdCAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gdjBSZXN1bHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF92MUltcG9ydChnbHRmOiBHTFRGKTogUHJvbWlzZTxWUk1TcHJpbmdCb25lTWFuYWdlciB8IG51bGw+IHtcbiAgICBjb25zdCBqc29uID0gZ2x0Zi5wYXJzZXIuanNvbiBhcyBHTFRGU2NoZW1hLklHTFRGO1xuXG4gICAgLy8gZWFybHkgYWJvcnQgaWYgaXQgZG9lc24ndCB1c2Ugc3ByaW5nIGJvbmVzXG4gICAgY29uc3QgaXNTcHJpbmdCb25lVXNlZCA9IGpzb24uZXh0ZW5zaW9uc1VzZWQ/LmluZGV4T2YoVlJNU3ByaW5nQm9uZUxvYWRlclBsdWdpbi5FWFRFTlNJT05fTkFNRSkgIT09IC0xO1xuICAgIGlmICghaXNTcHJpbmdCb25lVXNlZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgbWFuYWdlciA9IG5ldyBWUk1TcHJpbmdCb25lTWFuYWdlcigpO1xuXG4gICAgY29uc3QgdGhyZWVOb2RlczogVEhSRUUuT2JqZWN0M0RbXSA9IGF3YWl0IGdsdGYucGFyc2VyLmdldERlcGVuZGVuY2llcygnbm9kZScpO1xuXG4gICAgY29uc3QgZXh0ZW5zaW9uID0ganNvbi5leHRlbnNpb25zPy5bVlJNU3ByaW5nQm9uZUxvYWRlclBsdWdpbi5FWFRFTlNJT05fTkFNRV0gYXNcbiAgICAgIFYxU3ByaW5nQm9uZVNjaGVtYS5WUk1DU3ByaW5nQm9uZSB8IHVuZGVmaW5lZDtcbiAgICBpZiAoIWV4dGVuc2lvbikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc3BlY1ZlcnNpb24gPSBleHRlbnNpb24uc3BlY1ZlcnNpb247XG4gICAgaWYgKCFQT1NTSUJMRV9TUEVDX1ZFUlNJT05TLmhhcyhzcGVjVmVyc2lvbikpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgYFZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW46IFVua25vd24gJHtWUk1TcHJpbmdCb25lTG9hZGVyUGx1Z2luLkVYVEVOU0lPTl9OQU1FfSBzcGVjVmVyc2lvbiBcIiR7c3BlY1ZlcnNpb259XCJgLFxuICAgICAgKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbGxpZGVycyA9IGV4dGVuc2lvbi5jb2xsaWRlcnM/Lm1hcCgoc2NoZW1hQ29sbGlkZXIsIGlDb2xsaWRlcikgPT4ge1xuICAgICAgY29uc3Qgbm9kZSA9IHRocmVlTm9kZXNbc2NoZW1hQ29sbGlkZXIubm9kZSFdO1xuXG4gICAgICAvLyBTb21lIG1vZGVscyBwdXQgYC0xYCB0byB0aGUgbm9kZSBpbmRleCBvZiBjb2xsaWRlcnNcbiAgICAgIGlmIChub2RlID09IG51bGwpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIGBWUk1TcHJpbmdCb25lTG9hZGVyUGx1Z2luOiBUaGUgY29sbGlkZXIgIyR7aUNvbGxpZGVyfSBhdHRlbXB0ZWQgdG8gcmVmZXJlbmNlIGEgbm9kZSAjJHtzY2hlbWFDb2xsaWRlci5ub2RlfSBidXQgbm90IGZvdW5kLiBTa2lwcGluZyB0aGUgY29sbGlkZXJgLFxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc2NoZW1hU2hhcGUgPSBzY2hlbWFDb2xsaWRlci5zaGFwZSE7XG5cbiAgICAgIC8vIFRPRE86IHNlcGFyYXRlIGludG8gc2V2ZXJhbCBmdW5jdGlvbnNcblxuICAgICAgY29uc3Qgc2NoZW1hRXhDb2xsaWRlcjogU3ByaW5nQm9uZUV4dGVuZGVkQ29sbGlkZXJTY2hlbWEuVlJNQ1NwcmluZ0JvbmVFeHRlbmRlZENvbGxpZGVyIHwgdW5kZWZpbmVkID1cbiAgICAgICAgc2NoZW1hQ29sbGlkZXIuZXh0ZW5zaW9ucz8uW0VYVEVOU0lPTl9OQU1FX0VYVEVOREVEX0NPTExJREVSXTtcblxuICAgICAgaWYgKHRoaXMudXNlRXh0ZW5kZWRDb2xsaWRlcnMgJiYgc2NoZW1hRXhDb2xsaWRlciAhPSBudWxsKSB7XG4gICAgICAgIGNvbnN0IHNwZWNWZXJzaW9uRXhDb2xsaWRlciA9IHNjaGVtYUV4Q29sbGlkZXIuc3BlY1ZlcnNpb247XG4gICAgICAgIGlmICghUE9TU0lCTEVfU1BFQ19WRVJTSU9OU19FWFRFTkRFRF9DT0xMSURFUlMuaGFzKHNwZWNWZXJzaW9uRXhDb2xsaWRlcikpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICBgVlJNU3ByaW5nQm9uZUxvYWRlclBsdWdpbjogVW5rbm93biAke0VYVEVOU0lPTl9OQU1FX0VYVEVOREVEX0NPTExJREVSfSBzcGVjVmVyc2lvbiBcIiR7c3BlY1ZlcnNpb25FeENvbGxpZGVyfVwiLiBGYWxsYmFja2luZyB0byB0aGUgJHtWUk1TcHJpbmdCb25lTG9hZGVyUGx1Z2luLkVYVEVOU0lPTl9OQU1FfSBkZWZpbml0aW9uYCxcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHNjaGVtYUV4U2hhcGUgPSBzY2hlbWFFeENvbGxpZGVyLnNoYXBlITtcbiAgICAgICAgICBpZiAoc2NoZW1hRXhTaGFwZS5zcGhlcmUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pbXBvcnRTcGhlcmVDb2xsaWRlcihub2RlLCB7XG4gICAgICAgICAgICAgIG9mZnNldDogbmV3IFRIUkVFLlZlY3RvcjMoKS5mcm9tQXJyYXkoc2NoZW1hRXhTaGFwZS5zcGhlcmUub2Zmc2V0ID8/IFswLjAsIDAuMCwgMC4wXSksXG4gICAgICAgICAgICAgIHJhZGl1czogc2NoZW1hRXhTaGFwZS5zcGhlcmUucmFkaXVzID8/IDAuMCxcbiAgICAgICAgICAgICAgaW5zaWRlOiBzY2hlbWFFeFNoYXBlLnNwaGVyZS5pbnNpZGUgPz8gZmFsc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHNjaGVtYUV4U2hhcGUuY2Fwc3VsZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2ltcG9ydENhcHN1bGVDb2xsaWRlcihub2RlLCB7XG4gICAgICAgICAgICAgIG9mZnNldDogbmV3IFRIUkVFLlZlY3RvcjMoKS5mcm9tQXJyYXkoc2NoZW1hRXhTaGFwZS5jYXBzdWxlLm9mZnNldCA/PyBbMC4wLCAwLjAsIDAuMF0pLFxuICAgICAgICAgICAgICByYWRpdXM6IHNjaGVtYUV4U2hhcGUuY2Fwc3VsZS5yYWRpdXMgPz8gMC4wLFxuICAgICAgICAgICAgICB0YWlsOiBuZXcgVEhSRUUuVmVjdG9yMygpLmZyb21BcnJheShzY2hlbWFFeFNoYXBlLmNhcHN1bGUudGFpbCA/PyBbMC4wLCAwLjAsIDAuMF0pLFxuICAgICAgICAgICAgICBpbnNpZGU6IHNjaGVtYUV4U2hhcGUuY2Fwc3VsZS5pbnNpZGUgPz8gZmFsc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHNjaGVtYUV4U2hhcGUucGxhbmUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pbXBvcnRQbGFuZUNvbGxpZGVyKG5vZGUsIHtcbiAgICAgICAgICAgICAgb2Zmc2V0OiBuZXcgVEhSRUUuVmVjdG9yMygpLmZyb21BcnJheShzY2hlbWFFeFNoYXBlLnBsYW5lLm9mZnNldCA/PyBbMC4wLCAwLjAsIDAuMF0pLFxuICAgICAgICAgICAgICBub3JtYWw6IG5ldyBUSFJFRS5WZWN0b3IzKCkuZnJvbUFycmF5KHNjaGVtYUV4U2hhcGUucGxhbmUubm9ybWFsID8/IFswLjAsIDAuMCwgMS4wXSksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHNjaGVtYVNoYXBlLnNwaGVyZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5faW1wb3J0U3BoZXJlQ29sbGlkZXIobm9kZSwge1xuICAgICAgICAgIG9mZnNldDogbmV3IFRIUkVFLlZlY3RvcjMoKS5mcm9tQXJyYXkoc2NoZW1hU2hhcGUuc3BoZXJlLm9mZnNldCA/PyBbMC4wLCAwLjAsIDAuMF0pLFxuICAgICAgICAgIHJhZGl1czogc2NoZW1hU2hhcGUuc3BoZXJlLnJhZGl1cyA/PyAwLjAsXG4gICAgICAgICAgaW5zaWRlOiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKHNjaGVtYVNoYXBlLmNhcHN1bGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ltcG9ydENhcHN1bGVDb2xsaWRlcihub2RlLCB7XG4gICAgICAgICAgb2Zmc2V0OiBuZXcgVEhSRUUuVmVjdG9yMygpLmZyb21BcnJheShzY2hlbWFTaGFwZS5jYXBzdWxlLm9mZnNldCA/PyBbMC4wLCAwLjAsIDAuMF0pLFxuICAgICAgICAgIHJhZGl1czogc2NoZW1hU2hhcGUuY2Fwc3VsZS5yYWRpdXMgPz8gMC4wLFxuICAgICAgICAgIHRhaWw6IG5ldyBUSFJFRS5WZWN0b3IzKCkuZnJvbUFycmF5KHNjaGVtYVNoYXBlLmNhcHN1bGUudGFpbCA/PyBbMC4wLCAwLjAsIDAuMF0pLFxuICAgICAgICAgIGluc2lkZTogZmFsc2UsXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBjb25zb2xlLndhcm4oYFZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW46IFRoZSBjb2xsaWRlciAjJHtpQ29sbGlkZXJ9IGhhcyBubyB2YWxpZCBzaGFwZS4gU2tpcHBpbmcgdGhlIGNvbGxpZGVyYCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBjb2xsaWRlckdyb3VwcyA9IGV4dGVuc2lvbi5jb2xsaWRlckdyb3Vwcz8ubWFwKFxuICAgICAgKHNjaGVtYUNvbGxpZGVyR3JvdXAsIGlDb2xsaWRlckdyb3VwKTogVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXAgPT4ge1xuICAgICAgICBjb25zdCBjb2xzID0gKHNjaGVtYUNvbGxpZGVyR3JvdXAuY29sbGlkZXJzID8/IFtdKVxuICAgICAgICAgIC5tYXAoKGlDb2xsaWRlcikgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29sID0gY29sbGlkZXJzPy5baUNvbGxpZGVyXTtcblxuICAgICAgICAgICAgaWYgKGNvbCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgICAgICBgVlJNU3ByaW5nQm9uZUxvYWRlclBsdWdpbjogVGhlIGNvbGxpZGVyIGdyb3VwICMke2lDb2xsaWRlckdyb3VwfSBhdHRlbXB0ZWQgdG8gcmVmZXJlbmNlIGEgY29sbGlkZXIgIyR7aUNvbGxpZGVyfSBidXQgbm90IGZvdW5kLiBTa2lwcGluZyB0aGUgY29sbGlkZXJgLFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGNvbDtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5maWx0ZXIoKGNvbCk6IGNvbCBpcyBWUk1TcHJpbmdCb25lQ29sbGlkZXIgPT4gY29sICE9IG51bGwpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgY29sbGlkZXJzOiBjb2xzLFxuICAgICAgICAgIG5hbWU6IHNjaGVtYUNvbGxpZGVyR3JvdXAubmFtZSxcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgKTtcblxuICAgIGV4dGVuc2lvbi5zcHJpbmdzPy5mb3JFYWNoKChzY2hlbWFTcHJpbmcsIGlTcHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IHNjaGVtYUpvaW50cyA9IHNjaGVtYVNwcmluZy5qb2ludHM7XG5cbiAgICAgIC8vIHByZXBhcmUgY29sbGlkZXJzXG4gICAgICBjb25zdCBjb2xsaWRlckdyb3Vwc0ZvclNwcmluZyA9IHNjaGVtYVNwcmluZy5jb2xsaWRlckdyb3Vwc1xuICAgICAgICA/Lm1hcCgoaUNvbGxpZGVyR3JvdXApID0+IHtcbiAgICAgICAgICBjb25zdCBncm91cCA9IGNvbGxpZGVyR3JvdXBzPy5baUNvbGxpZGVyR3JvdXBdO1xuXG4gICAgICAgICAgaWYgKGdyb3VwID09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgICAgYFZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW46IFRoZSBzcHJpbmcgIyR7aVNwcmluZ30gYXR0ZW1wdGVkIHRvIHJlZmVyZW5jZSBhIGNvbGxpZGVyIGdyb3VwICMke2lDb2xsaWRlckdyb3VwfSBidXQgbm90IGZvdW5kLiBTa2lwcGluZyB0aGUgY29sbGlkZXIgZ3JvdXBgLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBncm91cDtcbiAgICAgICAgfSlcbiAgICAgICAgLmZpbHRlcigoZ3JvdXApOiBncm91cCBpcyBWUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cCA9PiBncm91cCAhPSBudWxsKTtcblxuICAgICAgY29uc3QgY2VudGVyID0gc2NoZW1hU3ByaW5nLmNlbnRlciAhPSBudWxsID8gdGhyZWVOb2Rlc1tzY2hlbWFTcHJpbmcuY2VudGVyXSA6IHVuZGVmaW5lZDtcblxuICAgICAgbGV0IHByZXZTY2hlbWFKb2ludDogVjFTcHJpbmdCb25lU2NoZW1hLlNwcmluZ0JvbmVKb2ludCB8IHVuZGVmaW5lZDtcbiAgICAgIHNjaGVtYUpvaW50cy5mb3JFYWNoKChzY2hlbWFKb2ludCkgPT4ge1xuICAgICAgICBpZiAocHJldlNjaGVtYUpvaW50KSB7XG4gICAgICAgICAgLy8gcHJlcGFyZSBub2RlXG4gICAgICAgICAgY29uc3Qgbm9kZUluZGV4ID0gcHJldlNjaGVtYUpvaW50Lm5vZGU7XG4gICAgICAgICAgY29uc3Qgbm9kZSA9IHRocmVlTm9kZXNbbm9kZUluZGV4XTtcbiAgICAgICAgICBjb25zdCBjaGlsZEluZGV4ID0gc2NoZW1hSm9pbnQubm9kZTtcbiAgICAgICAgICBjb25zdCBjaGlsZCA9IHRocmVlTm9kZXNbY2hpbGRJbmRleF07XG5cbiAgICAgICAgICAvLyBwcmVwYXJlIHNldHRpbmdcbiAgICAgICAgICBjb25zdCBzZXR0aW5nOiBQYXJ0aWFsPFZSTVNwcmluZ0JvbmVKb2ludFNldHRpbmdzPiA9IHtcbiAgICAgICAgICAgIGhpdFJhZGl1czogcHJldlNjaGVtYUpvaW50LmhpdFJhZGl1cyxcbiAgICAgICAgICAgIGRyYWdGb3JjZTogcHJldlNjaGVtYUpvaW50LmRyYWdGb3JjZSxcbiAgICAgICAgICAgIGdyYXZpdHlQb3dlcjogcHJldlNjaGVtYUpvaW50LmdyYXZpdHlQb3dlcixcbiAgICAgICAgICAgIHN0aWZmbmVzczogcHJldlNjaGVtYUpvaW50LnN0aWZmbmVzcyxcbiAgICAgICAgICAgIGdyYXZpdHlEaXI6XG4gICAgICAgICAgICAgIHByZXZTY2hlbWFKb2ludC5ncmF2aXR5RGlyICE9IG51bGxcbiAgICAgICAgICAgICAgICA/IG5ldyBUSFJFRS5WZWN0b3IzKCkuZnJvbUFycmF5KHByZXZTY2hlbWFKb2ludC5ncmF2aXR5RGlyKVxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgICAgIH07XG5cbiAgICAgICAgICAvLyBjcmVhdGUgc3ByaW5nIGJvbmVzXG4gICAgICAgICAgY29uc3Qgam9pbnQgPSB0aGlzLl9pbXBvcnRKb2ludChub2RlLCBjaGlsZCwgc2V0dGluZywgY29sbGlkZXJHcm91cHNGb3JTcHJpbmcpO1xuICAgICAgICAgIGlmIChjZW50ZXIpIHtcbiAgICAgICAgICAgIGpvaW50LmNlbnRlciA9IGNlbnRlcjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBtYW5hZ2VyLmFkZEpvaW50KGpvaW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByZXZTY2hlbWFKb2ludCA9IHNjaGVtYUpvaW50O1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBpbml0IHNwcmluZyBib25lc1xuICAgIG1hbmFnZXIuc2V0SW5pdFN0YXRlKCk7XG5cbiAgICByZXR1cm4gbWFuYWdlcjtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX3YwSW1wb3J0KGdsdGY6IEdMVEYpOiBQcm9taXNlPFZSTVNwcmluZ0JvbmVNYW5hZ2VyIHwgbnVsbD4ge1xuICAgIGNvbnN0IGpzb24gPSBnbHRmLnBhcnNlci5qc29uIGFzIEdMVEZTY2hlbWEuSUdMVEY7XG5cbiAgICAvLyBlYXJseSBhYm9ydCBpZiBpdCBkb2Vzbid0IHVzZSB2cm1cbiAgICBjb25zdCBpc1ZSTVVzZWQgPSBqc29uLmV4dGVuc2lvbnNVc2VkPy5pbmRleE9mKCdWUk0nKSAhPT0gLTE7XG4gICAgaWYgKCFpc1ZSTVVzZWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIGVhcmx5IGFib3J0IGlmIGl0IGRvZXNuJ3QgaGF2ZSBib25lIGdyb3Vwc1xuICAgIGNvbnN0IGV4dGVuc2lvbiA9IGpzb24uZXh0ZW5zaW9ucz8uWydWUk0nXSBhcyBWMFZSTS5WUk0gfCB1bmRlZmluZWQ7XG4gICAgY29uc3Qgc2NoZW1hU2Vjb25kYXJ5QW5pbWF0aW9uID0gZXh0ZW5zaW9uPy5zZWNvbmRhcnlBbmltYXRpb247XG4gICAgaWYgKCFzY2hlbWFTZWNvbmRhcnlBbmltYXRpb24pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNjaGVtYUJvbmVHcm91cHMgPSBzY2hlbWFTZWNvbmRhcnlBbmltYXRpb24/LmJvbmVHcm91cHM7XG4gICAgaWYgKCFzY2hlbWFCb25lR3JvdXBzKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBtYW5hZ2VyID0gbmV3IFZSTVNwcmluZ0JvbmVNYW5hZ2VyKCk7XG5cbiAgICBjb25zdCB0aHJlZU5vZGVzOiBUSFJFRS5PYmplY3QzRFtdID0gYXdhaXQgZ2x0Zi5wYXJzZXIuZ2V0RGVwZW5kZW5jaWVzKCdub2RlJyk7XG5cbiAgICBjb25zdCBjb2xsaWRlckdyb3VwcyA9IHNjaGVtYVNlY29uZGFyeUFuaW1hdGlvbi5jb2xsaWRlckdyb3Vwcz8ubWFwKFxuICAgICAgKHNjaGVtYUNvbGxpZGVyR3JvdXAsIGlDb2xsaWRlckdyb3VwKTogVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXAgfCBudWxsID0+IHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IHRocmVlTm9kZXNbc2NoZW1hQ29sbGlkZXJHcm91cC5ub2RlIV07XG4gICAgICAgIGlmIChub2RlID09IG51bGwpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICBgVlJNU3ByaW5nQm9uZUxvYWRlclBsdWdpbjogVGhlIGNvbGxpZGVyIGdyb3VwICMke2lDb2xsaWRlckdyb3VwfSBhdHRlbXB0ZWQgdG8gcmVmZXJlbmNlIGEgbm9kZSAjJHtzY2hlbWFDb2xsaWRlckdyb3VwLm5vZGV9IGJ1dCBub3QgZm91bmQuIFNraXBwaW5nIHRoZSBjb2xsaWRlciBncm91cGAsXG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbGxpZGVycyA9IChzY2hlbWFDb2xsaWRlckdyb3VwLmNvbGxpZGVycyA/PyBbXSkubWFwKChzY2hlbWFDb2xsaWRlciwgaUNvbGxpZGVyKSA9PiB7XG4gICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gbmV3IFRIUkVFLlZlY3RvcjMoMC4wLCAwLjAsIDAuMCk7XG4gICAgICAgICAgaWYgKHNjaGVtYUNvbGxpZGVyLm9mZnNldCkge1xuICAgICAgICAgICAgb2Zmc2V0LnNldChcbiAgICAgICAgICAgICAgc2NoZW1hQ29sbGlkZXIub2Zmc2V0LnggPz8gMC4wLFxuICAgICAgICAgICAgICBzY2hlbWFDb2xsaWRlci5vZmZzZXQueSA/PyAwLjAsXG4gICAgICAgICAgICAgIHNjaGVtYUNvbGxpZGVyLm9mZnNldC56ID8gLXNjaGVtYUNvbGxpZGVyLm9mZnNldC56IDogMC4wLCAvLyB6IGlzIG9wcG9zaXRlIGluIFZSTTAuMFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gdGhpcy5faW1wb3J0U3BoZXJlQ29sbGlkZXIobm9kZSwge1xuICAgICAgICAgICAgb2Zmc2V0LFxuICAgICAgICAgICAgcmFkaXVzOiBzY2hlbWFDb2xsaWRlci5yYWRpdXMgPz8gMC4wLFxuICAgICAgICAgICAgaW5zaWRlOiBmYWxzZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHsgY29sbGlkZXJzIH07XG4gICAgICB9LFxuICAgICk7XG5cbiAgICAvLyBpbXBvcnQgc3ByaW5nIGJvbmVzIGZvciBlYWNoIHNwcmluZyBib25lIGdyb3Vwc1xuICAgIHNjaGVtYUJvbmVHcm91cHM/LmZvckVhY2goKHNjaGVtYUJvbmVHcm91cCwgaUJvbmVHcm91cCkgPT4ge1xuICAgICAgY29uc3Qgcm9vdEluZGljZXMgPSBzY2hlbWFCb25lR3JvdXAuYm9uZXM7XG4gICAgICBpZiAoIXJvb3RJbmRpY2VzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcm9vdEluZGljZXMuZm9yRWFjaCgocm9vdEluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IHJvb3QgPSB0aHJlZU5vZGVzW3Jvb3RJbmRleF07XG4gICAgICAgIGlmIChyb290ID09IG51bGwpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICBgVlJNU3ByaW5nQm9uZUxvYWRlclBsdWdpbjogVGhlIHNwcmluZyBib25lIGdyb3VwICMke2lCb25lR3JvdXB9IGF0dGVtcHRlZCB0byByZWZlcmVuY2UgYSBub2RlICMke3Jvb3RJbmRleH0gYnV0IG5vdCBmb3VuZC4gU2tpcHBpbmcgdGhlIG5vZGVgLFxuICAgICAgICAgICk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcHJlcGFyZSBzZXR0aW5nXG4gICAgICAgIGNvbnN0IGdyYXZpdHlEaXIgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuICAgICAgICBpZiAoc2NoZW1hQm9uZUdyb3VwLmdyYXZpdHlEaXIpIHtcbiAgICAgICAgICBncmF2aXR5RGlyLnNldChcbiAgICAgICAgICAgIHNjaGVtYUJvbmVHcm91cC5ncmF2aXR5RGlyLnggPz8gMC4wLFxuICAgICAgICAgICAgc2NoZW1hQm9uZUdyb3VwLmdyYXZpdHlEaXIueSA/PyAwLjAsXG4gICAgICAgICAgICBzY2hlbWFCb25lR3JvdXAuZ3Jhdml0eURpci56ID8/IDAuMCxcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGdyYXZpdHlEaXIuc2V0KDAuMCwgLTEuMCwgMC4wKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNlbnRlciA9IHNjaGVtYUJvbmVHcm91cC5jZW50ZXIgIT0gbnVsbCA/IHRocmVlTm9kZXNbc2NoZW1hQm9uZUdyb3VwLmNlbnRlcl0gOiB1bmRlZmluZWQ7XG5cbiAgICAgICAgY29uc3Qgc2V0dGluZzogUGFydGlhbDxWUk1TcHJpbmdCb25lSm9pbnRTZXR0aW5ncz4gPSB7XG4gICAgICAgICAgaGl0UmFkaXVzOiBzY2hlbWFCb25lR3JvdXAuaGl0UmFkaXVzLFxuICAgICAgICAgIGRyYWdGb3JjZTogc2NoZW1hQm9uZUdyb3VwLmRyYWdGb3JjZSxcbiAgICAgICAgICBncmF2aXR5UG93ZXI6IHNjaGVtYUJvbmVHcm91cC5ncmF2aXR5UG93ZXIsXG4gICAgICAgICAgc3RpZmZuZXNzOiBzY2hlbWFCb25lR3JvdXAuc3RpZmZpbmVzcyxcbiAgICAgICAgICBncmF2aXR5RGlyLFxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIHByZXBhcmUgY29sbGlkZXJzXG4gICAgICAgIGNvbnN0IGNvbGxpZGVyR3JvdXBzRm9yU3ByaW5nID0gc2NoZW1hQm9uZUdyb3VwLmNvbGxpZGVyR3JvdXBzXG4gICAgICAgICAgPy5tYXAoKGlDb2xsaWRlckdyb3VwKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBncm91cCA9IGNvbGxpZGVyR3JvdXBzPy5baUNvbGxpZGVyR3JvdXBdO1xuXG4gICAgICAgICAgICBpZiAoZ3JvdXAgPT0gbnVsbCkge1xuICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICAgICAgYFZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW46IFRoZSBzcHJpbmcgIyR7aUJvbmVHcm91cH0gYXR0ZW1wdGVkIHRvIHJlZmVyZW5jZSBhIGNvbGxpZGVyIGdyb3VwICMke2lDb2xsaWRlckdyb3VwfSBidXQgbm90IGZvdW5kLiBTa2lwcGluZyB0aGUgY29sbGlkZXIgZ3JvdXBgLFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGdyb3VwO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmZpbHRlcigoZ3JvdXApOiBncm91cCBpcyBWUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cCA9PiBncm91cCAhPSBudWxsKTtcblxuICAgICAgICAvLyBjcmVhdGUgc3ByaW5nIGJvbmVzXG4gICAgICAgIHJvb3QudHJhdmVyc2UoKG5vZGUpID0+IHtcbiAgICAgICAgICBjb25zdCBjaGlsZDogVEhSRUUuT2JqZWN0M0QgfCBudWxsID0gbm9kZS5jaGlsZHJlblswXSA/PyBudWxsO1xuXG4gICAgICAgICAgY29uc3Qgam9pbnQgPSB0aGlzLl9pbXBvcnRKb2ludChub2RlLCBjaGlsZCwgc2V0dGluZywgY29sbGlkZXJHcm91cHNGb3JTcHJpbmcpO1xuICAgICAgICAgIGlmIChjZW50ZXIpIHtcbiAgICAgICAgICAgIGpvaW50LmNlbnRlciA9IGNlbnRlcjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBtYW5hZ2VyLmFkZEpvaW50KGpvaW50KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIGluaXQgc3ByaW5nIGJvbmVzXG4gICAgZ2x0Zi5zY2VuZS51cGRhdGVNYXRyaXhXb3JsZCgpO1xuICAgIG1hbmFnZXIuc2V0SW5pdFN0YXRlKCk7XG5cbiAgICByZXR1cm4gbWFuYWdlcjtcbiAgfVxuXG4gIHByaXZhdGUgX2ltcG9ydEpvaW50KFxuICAgIG5vZGU6IFRIUkVFLk9iamVjdDNELFxuICAgIGNoaWxkOiBUSFJFRS5PYmplY3QzRCxcbiAgICBzZXR0aW5nPzogUGFydGlhbDxWUk1TcHJpbmdCb25lSm9pbnRTZXR0aW5ncz4sXG4gICAgY29sbGlkZXJHcm91cHNGb3JTcHJpbmc/OiBWUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cFtdLFxuICApOiBWUk1TcHJpbmdCb25lSm9pbnQge1xuICAgIGNvbnN0IHNwcmluZ0JvbmUgPSBuZXcgVlJNU3ByaW5nQm9uZUpvaW50KG5vZGUsIGNoaWxkLCBzZXR0aW5nLCBjb2xsaWRlckdyb3Vwc0ZvclNwcmluZyk7XG5cbiAgICBpZiAodGhpcy5qb2ludEhlbHBlclJvb3QpIHtcbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBWUk1TcHJpbmdCb25lSm9pbnRIZWxwZXIoc3ByaW5nQm9uZSk7XG4gICAgICB0aGlzLmpvaW50SGVscGVyUm9vdC5hZGQoaGVscGVyKTtcbiAgICAgIGhlbHBlci5yZW5kZXJPcmRlciA9IHRoaXMuam9pbnRIZWxwZXJSb290LnJlbmRlck9yZGVyO1xuICAgIH1cblxuICAgIHJldHVybiBzcHJpbmdCb25lO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW1wb3J0U3BoZXJlQ29sbGlkZXIoXG4gICAgZGVzdGluYXRpb246IFRIUkVFLk9iamVjdDNELFxuICAgIHBhcmFtczoge1xuICAgICAgb2Zmc2V0OiBUSFJFRS5WZWN0b3IzO1xuICAgICAgcmFkaXVzOiBudW1iZXI7XG4gICAgICBpbnNpZGU6IGJvb2xlYW47XG4gICAgfSxcbiAgKTogVlJNU3ByaW5nQm9uZUNvbGxpZGVyIHtcbiAgICBjb25zdCBzaGFwZSA9IG5ldyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZVNwaGVyZShwYXJhbXMpO1xuXG4gICAgY29uc3QgY29sbGlkZXIgPSBuZXcgVlJNU3ByaW5nQm9uZUNvbGxpZGVyKHNoYXBlKTtcblxuICAgIGRlc3RpbmF0aW9uLmFkZChjb2xsaWRlcik7XG5cbiAgICBpZiAodGhpcy5jb2xsaWRlckhlbHBlclJvb3QpIHtcbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBWUk1TcHJpbmdCb25lQ29sbGlkZXJIZWxwZXIoY29sbGlkZXIpO1xuICAgICAgdGhpcy5jb2xsaWRlckhlbHBlclJvb3QuYWRkKGhlbHBlcik7XG4gICAgICBoZWxwZXIucmVuZGVyT3JkZXIgPSB0aGlzLmNvbGxpZGVySGVscGVyUm9vdC5yZW5kZXJPcmRlcjtcbiAgICB9XG5cbiAgICByZXR1cm4gY29sbGlkZXI7XG4gIH1cblxuICBwcml2YXRlIF9pbXBvcnRDYXBzdWxlQ29sbGlkZXIoXG4gICAgZGVzdGluYXRpb246IFRIUkVFLk9iamVjdDNELFxuICAgIHBhcmFtczoge1xuICAgICAgb2Zmc2V0OiBUSFJFRS5WZWN0b3IzO1xuICAgICAgcmFkaXVzOiBudW1iZXI7XG4gICAgICB0YWlsOiBUSFJFRS5WZWN0b3IzO1xuICAgICAgaW5zaWRlOiBib29sZWFuO1xuICAgIH0sXG4gICk6IFZSTVNwcmluZ0JvbmVDb2xsaWRlciB7XG4gICAgY29uc3Qgc2hhcGUgPSBuZXcgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVDYXBzdWxlKHBhcmFtcyk7XG5cbiAgICBjb25zdCBjb2xsaWRlciA9IG5ldyBWUk1TcHJpbmdCb25lQ29sbGlkZXIoc2hhcGUpO1xuXG4gICAgZGVzdGluYXRpb24uYWRkKGNvbGxpZGVyKTtcblxuICAgIGlmICh0aGlzLmNvbGxpZGVySGVscGVyUm9vdCkge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IFZSTVNwcmluZ0JvbmVDb2xsaWRlckhlbHBlcihjb2xsaWRlcik7XG4gICAgICB0aGlzLmNvbGxpZGVySGVscGVyUm9vdC5hZGQoaGVscGVyKTtcbiAgICAgIGhlbHBlci5yZW5kZXJPcmRlciA9IHRoaXMuY29sbGlkZXJIZWxwZXJSb290LnJlbmRlck9yZGVyO1xuICAgIH1cblxuICAgIHJldHVybiBjb2xsaWRlcjtcbiAgfVxuXG4gIHByaXZhdGUgX2ltcG9ydFBsYW5lQ29sbGlkZXIoXG4gICAgZGVzdGluYXRpb246IFRIUkVFLk9iamVjdDNELFxuICAgIHBhcmFtczoge1xuICAgICAgb2Zmc2V0OiBUSFJFRS5WZWN0b3IzO1xuICAgICAgbm9ybWFsOiBUSFJFRS5WZWN0b3IzO1xuICAgIH0sXG4gICk6IFZSTVNwcmluZ0JvbmVDb2xsaWRlciB7XG4gICAgY29uc3Qgc2hhcGUgPSBuZXcgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVQbGFuZShwYXJhbXMpO1xuXG4gICAgY29uc3QgY29sbGlkZXIgPSBuZXcgVlJNU3ByaW5nQm9uZUNvbGxpZGVyKHNoYXBlKTtcblxuICAgIGRlc3RpbmF0aW9uLmFkZChjb2xsaWRlcik7XG5cbiAgICBpZiAodGhpcy5jb2xsaWRlckhlbHBlclJvb3QpIHtcbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBWUk1TcHJpbmdCb25lQ29sbGlkZXJIZWxwZXIoY29sbGlkZXIpO1xuICAgICAgdGhpcy5jb2xsaWRlckhlbHBlclJvb3QuYWRkKGhlbHBlcik7XG4gICAgICBoZWxwZXIucmVuZGVyT3JkZXIgPSB0aGlzLmNvbGxpZGVySGVscGVyUm9vdC5yZW5kZXJPcmRlcjtcbiAgICB9XG5cbiAgICByZXR1cm4gY29sbGlkZXI7XG4gIH1cbn1cbiIsICJpbXBvcnQgdHlwZSAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuZXhwb3J0IGZ1bmN0aW9uIHRyYXZlcnNlQW5jZXN0b3JzRnJvbVJvb3Qob2JqZWN0OiBUSFJFRS5PYmplY3QzRCwgY2FsbGJhY2s6IChvYmplY3Q6IFRIUkVFLk9iamVjdDNEKSA9PiB2b2lkKTogdm9pZCB7XG4gIGNvbnN0IGFuY2VzdG9yczogVEhSRUUuT2JqZWN0M0RbXSA9IFtdO1xuXG4gIGxldCBoZWFkOiBUSFJFRS5PYmplY3QzRCB8IG51bGwgPSBvYmplY3Q7XG4gIHdoaWxlIChoZWFkICE9PSBudWxsKSB7XG4gICAgYW5jZXN0b3JzLnVuc2hpZnQoaGVhZCk7XG4gICAgaGVhZCA9IGhlYWQucGFyZW50O1xuICB9XG5cbiAgYW5jZXN0b3JzLmZvckVhY2goKGFuY2VzdG9yKSA9PiB7XG4gICAgY2FsbGJhY2soYW5jZXN0b3IpO1xuICB9KTtcbn1cbiIsICJpbXBvcnQgdHlwZSAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBUcmF2ZXJzZSBjaGlsZHJlbiBvZiBnaXZlbiBvYmplY3QgYW5kIGV4ZWN1dGUgZ2l2ZW4gY2FsbGJhY2suXG4gKiBUaGUgZ2l2ZW4gb2JqZWN0IGl0c2VsZiB3b250IGJlIGdpdmVuIHRvIHRoZSBjYWxsYmFjay5cbiAqIElmIHRoZSByZXR1cm4gdmFsdWUgb2YgdGhlIGNhbGxiYWNrIGlzIGB0cnVlYCwgaXQgd2lsbCBoYWx0IHRoZSB0cmF2ZXJzYWwgb2YgaXRzIGNoaWxkcmVuLlxuICogQHBhcmFtIG9iamVjdCBBIHJvb3Qgb2JqZWN0XG4gKiBAcGFyYW0gY2FsbGJhY2sgQSBjYWxsYmFjayBmdW5jdGlvbiBjYWxsZWQgZm9yIGVhY2ggY2hpbGRyZW5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRyYXZlcnNlQ2hpbGRyZW5VbnRpbENvbmRpdGlvbk1ldChcbiAgb2JqZWN0OiBUSFJFRS5PYmplY3QzRCxcbiAgY2FsbGJhY2s6IChvYmplY3Q6IFRIUkVFLk9iamVjdDNEKSA9PiBib29sZWFuLFxuKTogdm9pZCB7XG4gIG9iamVjdC5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IGNhbGxiYWNrKGNoaWxkKTtcbiAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgdHJhdmVyc2VDaGlsZHJlblVudGlsQ29uZGl0aW9uTWV0KGNoaWxkLCBjYWxsYmFjayk7XG4gICAgfVxuICB9KTtcbn1cbiIsICJpbXBvcnQgdHlwZSAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBGaW5kcyB0aGUgbG93ZXN0IGNvbW1vbiBhbmNlc3RvcnMgb2YgdGhlIGdpdmVuIG9iamVjdHMsIGlmIGl0IGV4aXN0cy5cbiAqIEBwYXJhbSBvYmplY3RzIFRoZSBvYmplY3RzIHRvIGZpbmQgdGhlIGxvd2VzdCBjb21tb24gYW5jZXN0b3IgZm9yLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbG93ZXN0Q29tbW9uQW5jZXN0b3Iob2JqZWN0czogU2V0PFRIUkVFLk9iamVjdDNEPik6IFRIUkVFLk9iamVjdDNEIHwgbnVsbCB7XG4gIGNvbnN0IHNoYXJlZEFuY2VzdG9ycyA9IG5ldyBNYXA8VEhSRUUuT2JqZWN0M0QsIG51bWJlcj4oKTtcbiAgZm9yIChjb25zdCBvYmplY3Qgb2Ygb2JqZWN0cykge1xuICAgIGxldCBjdXJyZW50OiBUSFJFRS5PYmplY3QzRCB8IG51bGwgPSBvYmplY3Q7XG4gICAgZG8ge1xuICAgICAgY29uc3QgbmV3VmFsdWUgPSAoc2hhcmVkQW5jZXN0b3JzLmdldChjdXJyZW50KSA/PyAwKSArIDE7XG4gICAgICBpZiAobmV3VmFsdWUgPT09IG9iamVjdHMuc2l6ZSkge1xuICAgICAgICByZXR1cm4gY3VycmVudDtcbiAgICAgIH1cbiAgICAgIHNoYXJlZEFuY2VzdG9ycy5zZXQoY3VycmVudCwgbmV3VmFsdWUpO1xuICAgICAgY3VycmVudCA9IGN1cnJlbnQucGFyZW50O1xuICAgIH0gd2hpbGUgKGN1cnJlbnQgIT09IG51bGwpO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuIiwgImltcG9ydCB0eXBlICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHR5cGUgeyBWUk1TcHJpbmdCb25lSm9pbnQgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVKb2ludC5qcyc7XG5pbXBvcnQgeyB0cmF2ZXJzZUFuY2VzdG9yc0Zyb21Sb290IH0gZnJvbSAnLi91dGlscy90cmF2ZXJzZUFuY2VzdG9yc0Zyb21Sb290LmpzJztcbmltcG9ydCB0eXBlIHsgVlJNU3ByaW5nQm9uZUNvbGxpZGVyIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lQ29sbGlkZXIuanMnO1xuaW1wb3J0IHR5cGUgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cCB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXAuanMnO1xuaW1wb3J0IHsgdHJhdmVyc2VDaGlsZHJlblVudGlsQ29uZGl0aW9uTWV0IH0gZnJvbSAnLi91dGlscy90cmF2ZXJzZUNoaWxkcmVuVW50aWxDb25kaXRpb25NZXQuanMnO1xuaW1wb3J0IHsgbG93ZXN0Q29tbW9uQW5jZXN0b3IgfSBmcm9tICcuL3V0aWxzL2xvd2VzdENvbW1vbkFuY2VzdG9yLmpzJztcblxuZXhwb3J0IGNsYXNzIFZSTVNwcmluZ0JvbmVNYW5hZ2VyIHtcbiAgcHJpdmF0ZSBfam9pbnRzID0gbmV3IFNldDxWUk1TcHJpbmdCb25lSm9pbnQ+KCk7XG4gIHByaXZhdGUgX3NvcnRlZEpvaW50czogQXJyYXk8VlJNU3ByaW5nQm9uZUpvaW50PiA9IFtdO1xuICBwcml2YXRlIF9oYXNXYXJuZWRDaXJjdWxhckRlcGVuZGVuY3kgPSBmYWxzZTtcblxuICAvKipcbiAgICogQW4gb3JkZXJlZCBsaXN0IG9mIGFuY2VzdG9ycyBvZiBhbGwgdGhlIFNwcmluZ0JvbmUgam9pbnRzLiBCZWZvcmUgdGhlXG4gICAqIFNwcmluZ0JvbmUgam9pbnRzIGNhbiBiZSB1cGRhdGVkLCB0aGUgd29ybGQgbWF0cmljZXMgb2YgdGhlc2UgYW5jZXN0b3JzXG4gICAqIG11c3QgYmUgY2FsY3VsYXRlZC4gVGhlIGZpcnN0IGVsZW1lbnQgaXMgdGhlIGxvd2VzdCBjb21tb24gYW5jZXN0b3IsIGZvclxuICAgKiB3aGljaCBub3Qgb25seSBpdHMgd29ybGQgbWF0cml4IGJ1dCBpdHMgYW5jZXN0b3JzJyB3b3JsZCBtYXRyaWNlcyBhcmVcbiAgICogdXBkYXRlZCBhcyB3ZWxsLlxuICAgKi9cbiAgcHJpdmF0ZSBfYW5jZXN0b3JzOiBUSFJFRS5PYmplY3QzRFtdID0gW107XG5cbiAgcHVibGljIGdldCBqb2ludHMoKTogU2V0PFZSTVNwcmluZ0JvbmVKb2ludD4ge1xuICAgIHJldHVybiB0aGlzLl9qb2ludHM7XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVXNlIHtAbGluayBqb2ludHN9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHNwcmluZ0JvbmVzKCk6IFNldDxWUk1TcHJpbmdCb25lSm9pbnQ+IHtcbiAgICBjb25zb2xlLndhcm4oJ1ZSTVNwcmluZ0JvbmVNYW5hZ2VyOiBzcHJpbmdCb25lcyBpcyBkZXByZWNhdGVkLiB1c2Ugam9pbnRzIGluc3RlYWQuJyk7XG5cbiAgICByZXR1cm4gdGhpcy5fam9pbnRzO1xuICB9XG5cbiAgcHVibGljIGdldCBjb2xsaWRlckdyb3VwcygpOiBWUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cFtdIHtcbiAgICBjb25zdCBzZXQgPSBuZXcgU2V0PFZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwPigpO1xuICAgIHRoaXMuX2pvaW50cy5mb3JFYWNoKChzcHJpbmdCb25lKSA9PiB7XG4gICAgICBzcHJpbmdCb25lLmNvbGxpZGVyR3JvdXBzLmZvckVhY2goKGNvbGxpZGVyR3JvdXApID0+IHtcbiAgICAgICAgc2V0LmFkZChjb2xsaWRlckdyb3VwKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBBcnJheS5mcm9tKHNldCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGNvbGxpZGVycygpOiBWUk1TcHJpbmdCb25lQ29sbGlkZXJbXSB7XG4gICAgY29uc3Qgc2V0ID0gbmV3IFNldDxWUk1TcHJpbmdCb25lQ29sbGlkZXI+KCk7XG4gICAgdGhpcy5jb2xsaWRlckdyb3Vwcy5mb3JFYWNoKChjb2xsaWRlckdyb3VwKSA9PiB7XG4gICAgICBjb2xsaWRlckdyb3VwLmNvbGxpZGVycy5mb3JFYWNoKChjb2xsaWRlcikgPT4ge1xuICAgICAgICBzZXQuYWRkKGNvbGxpZGVyKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBBcnJheS5mcm9tKHNldCk7XG4gIH1cblxuICBwcml2YXRlIF9vYmplY3RTcHJpbmdCb25lc01hcCA9IG5ldyBNYXA8VEhSRUUuT2JqZWN0M0QsIFNldDxWUk1TcHJpbmdCb25lSm9pbnQ+PigpO1xuICBwcml2YXRlIF9pc1NvcnRlZEpvaW50c0RpcnR5ID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fcmVsZXZhbnRDaGlsZHJlblVwZGF0ZWQgPSB0aGlzLl9yZWxldmFudENoaWxkcmVuVXBkYXRlZC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgcHVibGljIGFkZEpvaW50KGpvaW50OiBWUk1TcHJpbmdCb25lSm9pbnQpOiB2b2lkIHtcbiAgICB0aGlzLl9qb2ludHMuYWRkKGpvaW50KTtcblxuICAgIGxldCBvYmplY3RTZXQgPSB0aGlzLl9vYmplY3RTcHJpbmdCb25lc01hcC5nZXQoam9pbnQuYm9uZSk7XG4gICAgaWYgKG9iamVjdFNldCA9PSBudWxsKSB7XG4gICAgICBvYmplY3RTZXQgPSBuZXcgU2V0PFZSTVNwcmluZ0JvbmVKb2ludD4oKTtcbiAgICAgIHRoaXMuX29iamVjdFNwcmluZ0JvbmVzTWFwLnNldChqb2ludC5ib25lLCBvYmplY3RTZXQpO1xuICAgIH1cbiAgICBvYmplY3RTZXQuYWRkKGpvaW50KTtcblxuICAgIHRoaXMuX2lzU29ydGVkSm9pbnRzRGlydHkgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFVzZSB7QGxpbmsgYWRkSm9pbnR9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgYWRkU3ByaW5nQm9uZShqb2ludDogVlJNU3ByaW5nQm9uZUpvaW50KTogdm9pZCB7XG4gICAgY29uc29sZS53YXJuKCdWUk1TcHJpbmdCb25lTWFuYWdlcjogYWRkU3ByaW5nQm9uZSgpIGlzIGRlcHJlY2F0ZWQuIHVzZSBhZGRKb2ludCgpIGluc3RlYWQuJyk7XG5cbiAgICB0aGlzLmFkZEpvaW50KGpvaW50KTtcbiAgfVxuXG4gIHB1YmxpYyBkZWxldGVKb2ludChqb2ludDogVlJNU3ByaW5nQm9uZUpvaW50KTogdm9pZCB7XG4gICAgdGhpcy5fam9pbnRzLmRlbGV0ZShqb2ludCk7XG5cbiAgICBjb25zdCBvYmplY3RTZXQgPSB0aGlzLl9vYmplY3RTcHJpbmdCb25lc01hcC5nZXQoam9pbnQuYm9uZSkhO1xuICAgIG9iamVjdFNldC5kZWxldGUoam9pbnQpO1xuXG4gICAgdGhpcy5faXNTb3J0ZWRKb2ludHNEaXJ0eSA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVXNlIHtAbGluayBkZWxldGVKb2ludH0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBkZWxldGVTcHJpbmdCb25lKGpvaW50OiBWUk1TcHJpbmdCb25lSm9pbnQpOiB2b2lkIHtcbiAgICBjb25zb2xlLndhcm4oJ1ZSTVNwcmluZ0JvbmVNYW5hZ2VyOiBkZWxldGVTcHJpbmdCb25lKCkgaXMgZGVwcmVjYXRlZC4gdXNlIGRlbGV0ZUpvaW50KCkgaW5zdGVhZC4nKTtcblxuICAgIHRoaXMuZGVsZXRlSm9pbnQoam9pbnQpO1xuICB9XG5cbiAgcHVibGljIHNldEluaXRTdGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9zb3J0Sm9pbnRzKCk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3NvcnRlZEpvaW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgc3ByaW5nQm9uZSA9IHRoaXMuX3NvcnRlZEpvaW50c1tpXTtcbiAgICAgIHNwcmluZ0JvbmUuYm9uZS51cGRhdGVNYXRyaXgoKTtcbiAgICAgIHNwcmluZ0JvbmUuYm9uZS51cGRhdGVXb3JsZE1hdHJpeChmYWxzZSwgZmFsc2UpO1xuICAgICAgc3ByaW5nQm9uZS5zZXRJbml0U3RhdGUoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy5fc29ydEpvaW50cygpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9zb3J0ZWRKb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHNwcmluZ0JvbmUgPSB0aGlzLl9zb3J0ZWRKb2ludHNbaV07XG4gICAgICBzcHJpbmdCb25lLmJvbmUudXBkYXRlTWF0cml4KCk7XG4gICAgICBzcHJpbmdCb25lLmJvbmUudXBkYXRlV29ybGRNYXRyaXgoZmFsc2UsIGZhbHNlKTtcbiAgICAgIHNwcmluZ0JvbmUucmVzZXQoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9zb3J0Sm9pbnRzKCk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2FuY2VzdG9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5fYW5jZXN0b3JzW2ldLnVwZGF0ZVdvcmxkTWF0cml4KGkgPT09IDAsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3NvcnRlZEpvaW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgLy8gdXBkYXRlIHRoZSBzcHJpbmdib25lXG4gICAgICBjb25zdCBzcHJpbmdCb25lID0gdGhpcy5fc29ydGVkSm9pbnRzW2ldO1xuICAgICAgc3ByaW5nQm9uZS5ib25lLnVwZGF0ZU1hdHJpeCgpO1xuICAgICAgc3ByaW5nQm9uZS5ib25lLnVwZGF0ZVdvcmxkTWF0cml4KGZhbHNlLCBmYWxzZSk7XG4gICAgICBzcHJpbmdCb25lLnVwZGF0ZShkZWx0YSk7XG5cbiAgICAgIC8vIHVwZGF0ZSBjaGlsZHJlbiB3b3JsZCBtYXRyaWNlc1xuICAgICAgLy8gaXQgaXMgcmVxdWlyZWQgd2hlbiB0aGUgc3ByaW5nIGJvbmUgY2hhaW4gaXMgc3BhcnNlXG4gICAgICB0cmF2ZXJzZUNoaWxkcmVuVW50aWxDb25kaXRpb25NZXQoc3ByaW5nQm9uZS5ib25lLCB0aGlzLl9yZWxldmFudENoaWxkcmVuVXBkYXRlZCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNvcnRzIHRoZSBqb2ludHMgZW5zdXJpbmcgdGhleSBhcmUgdXBkYXRlZCBpbiB0aGUgY29ycmVjdCBvcmRlciB0YWtpbmcgZGVwZW5kZW5jaWVzIGludG8gYWNjb3VudC5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgdXBkYXRlcyB7QGxpbmsgX3NvcnRlZEpvaW50c30gYW5kIHtAbGluayBfYW5jZXN0b3JzfS5cbiAgICogTWFrZSBzdXJlIHRvIGNhbGwgdGhpcyBiZWZvcmUgdXNpbmcgdGhlbS5cbiAgICovXG4gIHByaXZhdGUgX3NvcnRKb2ludHMoKSB7XG4gICAgaWYgKCF0aGlzLl9pc1NvcnRlZEpvaW50c0RpcnR5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc3ByaW5nQm9uZU9yZGVyOiBBcnJheTxWUk1TcHJpbmdCb25lSm9pbnQ+ID0gW107XG4gICAgY29uc3Qgc3ByaW5nQm9uZXNUcmllZCA9IG5ldyBTZXQ8VlJNU3ByaW5nQm9uZUpvaW50PigpO1xuICAgIGNvbnN0IHNwcmluZ0JvbmVzRG9uZSA9IG5ldyBTZXQ8VlJNU3ByaW5nQm9uZUpvaW50PigpO1xuICAgIGNvbnN0IGFuY2VzdG9ycyA9IG5ldyBTZXQ8VEhSRUUuT2JqZWN0M0Q+KCk7XG5cbiAgICBmb3IgKGNvbnN0IHNwcmluZ0JvbmUgb2YgdGhpcy5fam9pbnRzKSB7XG4gICAgICB0aGlzLl9pbnNlcnRKb2ludFNvcnQoc3ByaW5nQm9uZSwgc3ByaW5nQm9uZXNUcmllZCwgc3ByaW5nQm9uZXNEb25lLCBzcHJpbmdCb25lT3JkZXIsIGFuY2VzdG9ycyk7XG4gICAgfVxuICAgIHRoaXMuX3NvcnRlZEpvaW50cyA9IHNwcmluZ0JvbmVPcmRlcjtcblxuICAgIGNvbnN0IGxjYSA9IGxvd2VzdENvbW1vbkFuY2VzdG9yKGFuY2VzdG9ycyk7XG4gICAgdGhpcy5fYW5jZXN0b3JzID0gW107XG4gICAgaWYgKGxjYSkge1xuICAgICAgdGhpcy5fYW5jZXN0b3JzLnB1c2gobGNhKTtcbiAgICAgIHRyYXZlcnNlQ2hpbGRyZW5VbnRpbENvbmRpdGlvbk1ldChsY2EsIChvYmplY3Q6IFRIUkVFLk9iamVjdDNEKSA9PiB7XG4gICAgICAgIC8vIGlmIHRoZSBvYmplY3QgaGFzIGF0dGFjaGVkIHNwcmluZ2JvbmUsIGhhbHQgdGhlIHRyYXZlcnNhbFxuICAgICAgICBpZiAoKHRoaXMuX29iamVjdFNwcmluZ0JvbmVzTWFwLmdldChvYmplY3QpPy5zaXplID8/IDApID4gMCkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2FuY2VzdG9ycy5wdXNoKG9iamVjdCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuX2lzU29ydGVkSm9pbnRzRGlydHkgPSBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgX2luc2VydEpvaW50U29ydChcbiAgICBzcHJpbmdCb25lOiBWUk1TcHJpbmdCb25lSm9pbnQsXG4gICAgc3ByaW5nQm9uZXNUcmllZDogU2V0PFZSTVNwcmluZ0JvbmVKb2ludD4sXG4gICAgc3ByaW5nQm9uZXNEb25lOiBTZXQ8VlJNU3ByaW5nQm9uZUpvaW50PixcbiAgICBzcHJpbmdCb25lT3JkZXI6IEFycmF5PFZSTVNwcmluZ0JvbmVKb2ludD4sXG4gICAgYW5jZXN0b3JzOiBTZXQ8VEhSRUUuT2JqZWN0M0Q+LFxuICApIHtcbiAgICBpZiAoc3ByaW5nQm9uZXNEb25lLmhhcyhzcHJpbmdCb25lKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChzcHJpbmdCb25lc1RyaWVkLmhhcyhzcHJpbmdCb25lKSkge1xuICAgICAgaWYgKCF0aGlzLl9oYXNXYXJuZWRDaXJjdWxhckRlcGVuZGVuY3kpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdWUk1TcHJpbmdCb25lTWFuYWdlcjogQ2lyY3VsYXIgZGVwZW5kZW5jeSBkZXRlY3RlZCcpO1xuICAgICAgICB0aGlzLl9oYXNXYXJuZWRDaXJjdWxhckRlcGVuZGVuY3kgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNwcmluZ0JvbmVzVHJpZWQuYWRkKHNwcmluZ0JvbmUpO1xuXG4gICAgY29uc3QgZGVwT2JqZWN0cyA9IHNwcmluZ0JvbmUuZGVwZW5kZW5jaWVzO1xuICAgIGZvciAoY29uc3QgZGVwT2JqZWN0IG9mIGRlcE9iamVjdHMpIHtcbiAgICAgIGxldCBlbmNvdW50ZXJlZFNwcmluZ0JvbmUgPSBmYWxzZTtcbiAgICAgIGxldCBhbmNlc3RvcjogVEhSRUUuT2JqZWN0M0QgfCBudWxsID0gbnVsbDtcbiAgICAgIHRyYXZlcnNlQW5jZXN0b3JzRnJvbVJvb3QoZGVwT2JqZWN0LCAoZGVwT2JqZWN0QW5jZXN0b3IpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqZWN0U2V0ID0gdGhpcy5fb2JqZWN0U3ByaW5nQm9uZXNNYXAuZ2V0KGRlcE9iamVjdEFuY2VzdG9yKTtcbiAgICAgICAgaWYgKG9iamVjdFNldCkge1xuICAgICAgICAgIGZvciAoY29uc3QgZGVwU3ByaW5nQm9uZSBvZiBvYmplY3RTZXQpIHtcbiAgICAgICAgICAgIGVuY291bnRlcmVkU3ByaW5nQm9uZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9pbnNlcnRKb2ludFNvcnQoZGVwU3ByaW5nQm9uZSwgc3ByaW5nQm9uZXNUcmllZCwgc3ByaW5nQm9uZXNEb25lLCBzcHJpbmdCb25lT3JkZXIsIGFuY2VzdG9ycyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKCFlbmNvdW50ZXJlZFNwcmluZ0JvbmUpIHtcbiAgICAgICAgICAvLyBUaGlzIG9iamVjdCBpcyBhbiBhbmNlc3RvciBvZiBhIHNwcmluZyBib25lLCBidXQgaXMgTk9UIGEgc3BhcnNlIG5vZGUgaW4gYmV0d2VlbiBzcHJpbmcgYm9uZXMuXG4gICAgICAgICAgYW5jZXN0b3IgPSBkZXBPYmplY3RBbmNlc3RvcjtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAoYW5jZXN0b3IpIHtcbiAgICAgICAgYW5jZXN0b3JzLmFkZChhbmNlc3Rvcik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc3ByaW5nQm9uZU9yZGVyLnB1c2goc3ByaW5nQm9uZSk7XG5cbiAgICBzcHJpbmdCb25lc0RvbmUuYWRkKHNwcmluZ0JvbmUpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVsZXZhbnRDaGlsZHJlblVwZGF0ZWQob2JqZWN0OiBUSFJFRS5PYmplY3QzRCkge1xuICAgIC8vIGlmIHRoZSBvYmplY3QgaGFzIGF0dGFjaGVkIHNwcmluZ2JvbmUsIGhhbHQgdGhlIHRyYXZlcnNhbFxuICAgIGlmICgodGhpcy5fb2JqZWN0U3ByaW5nQm9uZXNNYXAuZ2V0KG9iamVjdCk/LnNpemUgPz8gMCkgPiAwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBvdGhlcndpc2UgdXBkYXRlIGl0cyB3b3JsZCBtYXRyaXhcbiAgICBvYmplY3QudXBkYXRlV29ybGRNYXRyaXgoZmFsc2UsIGZhbHNlKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBHTFRGLCBHTFRGTG9hZGVyUGx1Z2luLCBHTFRGUGFyc2VyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlci5qcyc7XG5pbXBvcnQge1xuICBWUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luLFxuICBWUk1GaXJzdFBlcnNvbkxvYWRlclBsdWdpbixcbiAgVlJNSHVtYW5vaWQsXG4gIFZSTUh1bWFub2lkTG9hZGVyUGx1Z2luLFxuICBWUk1Mb29rQXRMb2FkZXJQbHVnaW4sXG4gIFZSTU1ldGEsXG4gIFZSTU1ldGFMb2FkZXJQbHVnaW4sXG59IGZyb20gJ0BwaXhpdi90aHJlZS12cm0tY29yZSc7XG5pbXBvcnQgeyBNVG9vbk1hdGVyaWFsTG9hZGVyUGx1Z2luIH0gZnJvbSAnQHBpeGl2L3RocmVlLXZybS1tYXRlcmlhbHMtbXRvb24nO1xuaW1wb3J0IHsgVlJNTWF0ZXJpYWxzSERSRW1pc3NpdmVNdWx0aXBsaWVyTG9hZGVyUGx1Z2luIH0gZnJvbSAnQHBpeGl2L3RocmVlLXZybS1tYXRlcmlhbHMtaGRyLWVtaXNzaXZlLW11bHRpcGxpZXInO1xuaW1wb3J0IHsgVlJNTWF0ZXJpYWxzVjBDb21wYXRQbHVnaW4gfSBmcm9tICdAcGl4aXYvdGhyZWUtdnJtLW1hdGVyaWFscy12MGNvbXBhdCc7XG5pbXBvcnQgeyBWUk1Ob2RlQ29uc3RyYWludExvYWRlclBsdWdpbiB9IGZyb20gJ0BwaXhpdi90aHJlZS12cm0tbm9kZS1jb25zdHJhaW50JztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW4gfSBmcm9tICdAcGl4aXYvdGhyZWUtdnJtLXNwcmluZ2JvbmUnO1xuaW1wb3J0IHsgVlJNTG9hZGVyUGx1Z2luT3B0aW9ucyB9IGZyb20gJy4vVlJNTG9hZGVyUGx1Z2luT3B0aW9ucyc7XG5pbXBvcnQgeyBWUk0gfSBmcm9tICcuL1ZSTSc7XG5cbmV4cG9ydCBjbGFzcyBWUk1Mb2FkZXJQbHVnaW4gaW1wbGVtZW50cyBHTFRGTG9hZGVyUGx1Z2luIHtcbiAgcHVibGljIHJlYWRvbmx5IHBhcnNlcjogR0xURlBhcnNlcjtcblxuICBwdWJsaWMgcmVhZG9ubHkgZXhwcmVzc2lvblBsdWdpbjogVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbjtcbiAgcHVibGljIHJlYWRvbmx5IGZpcnN0UGVyc29uUGx1Z2luOiBWUk1GaXJzdFBlcnNvbkxvYWRlclBsdWdpbjtcbiAgcHVibGljIHJlYWRvbmx5IGh1bWFub2lkUGx1Z2luOiBWUk1IdW1hbm9pZExvYWRlclBsdWdpbjtcbiAgcHVibGljIHJlYWRvbmx5IGxvb2tBdFBsdWdpbjogVlJNTG9va0F0TG9hZGVyUGx1Z2luO1xuICBwdWJsaWMgcmVhZG9ubHkgbWV0YVBsdWdpbjogVlJNTWV0YUxvYWRlclBsdWdpbjtcbiAgcHVibGljIHJlYWRvbmx5IG10b29uTWF0ZXJpYWxQbHVnaW46IE1Ub29uTWF0ZXJpYWxMb2FkZXJQbHVnaW47XG4gIHB1YmxpYyByZWFkb25seSBtYXRlcmlhbHNIRFJFbWlzc2l2ZU11bHRpcGxpZXJQbHVnaW46IFZSTU1hdGVyaWFsc0hEUkVtaXNzaXZlTXVsdGlwbGllckxvYWRlclBsdWdpbjtcbiAgcHVibGljIHJlYWRvbmx5IG1hdGVyaWFsc1YwQ29tcGF0UGx1Z2luOiBWUk1NYXRlcmlhbHNWMENvbXBhdFBsdWdpbjtcbiAgcHVibGljIHJlYWRvbmx5IHNwcmluZ0JvbmVQbHVnaW46IFZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW47XG4gIHB1YmxpYyByZWFkb25seSBub2RlQ29uc3RyYWludFBsdWdpbjogVlJNTm9kZUNvbnN0cmFpbnRMb2FkZXJQbHVnaW47XG5cbiAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICdWUk1Mb2FkZXJQbHVnaW4nO1xuICB9XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBhcnNlcjogR0xURlBhcnNlciwgb3B0aW9ucz86IFZSTUxvYWRlclBsdWdpbk9wdGlvbnMpIHtcbiAgICB0aGlzLnBhcnNlciA9IHBhcnNlcjtcblxuICAgIGNvbnN0IGhlbHBlclJvb3QgPSBvcHRpb25zPy5oZWxwZXJSb290O1xuICAgIGNvbnN0IGF1dG9VcGRhdGVIdW1hbkJvbmVzID0gb3B0aW9ucz8uYXV0b1VwZGF0ZUh1bWFuQm9uZXM7XG5cbiAgICB0aGlzLmV4cHJlc3Npb25QbHVnaW4gPSBvcHRpb25zPy5leHByZXNzaW9uUGx1Z2luID8/IG5ldyBWUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luKHBhcnNlcik7XG4gICAgdGhpcy5maXJzdFBlcnNvblBsdWdpbiA9IG9wdGlvbnM/LmZpcnN0UGVyc29uUGx1Z2luID8/IG5ldyBWUk1GaXJzdFBlcnNvbkxvYWRlclBsdWdpbihwYXJzZXIpO1xuICAgIHRoaXMuaHVtYW5vaWRQbHVnaW4gPVxuICAgICAgb3B0aW9ucz8uaHVtYW5vaWRQbHVnaW4gPz9cbiAgICAgIG5ldyBWUk1IdW1hbm9pZExvYWRlclBsdWdpbihwYXJzZXIsIHtcbiAgICAgICAgaGVscGVyUm9vdCxcbiAgICAgICAgYXV0b1VwZGF0ZUh1bWFuQm9uZXMsXG4gICAgICB9KTtcbiAgICB0aGlzLmxvb2tBdFBsdWdpbiA9IG9wdGlvbnM/Lmxvb2tBdFBsdWdpbiA/PyBuZXcgVlJNTG9va0F0TG9hZGVyUGx1Z2luKHBhcnNlciwgeyBoZWxwZXJSb290IH0pO1xuICAgIHRoaXMubWV0YVBsdWdpbiA9IG9wdGlvbnM/Lm1ldGFQbHVnaW4gPz8gbmV3IFZSTU1ldGFMb2FkZXJQbHVnaW4ocGFyc2VyKTtcbiAgICB0aGlzLm10b29uTWF0ZXJpYWxQbHVnaW4gPSBvcHRpb25zPy5tdG9vbk1hdGVyaWFsUGx1Z2luID8/IG5ldyBNVG9vbk1hdGVyaWFsTG9hZGVyUGx1Z2luKHBhcnNlcik7XG4gICAgdGhpcy5tYXRlcmlhbHNIRFJFbWlzc2l2ZU11bHRpcGxpZXJQbHVnaW4gPVxuICAgICAgb3B0aW9ucz8ubWF0ZXJpYWxzSERSRW1pc3NpdmVNdWx0aXBsaWVyUGx1Z2luID8/IG5ldyBWUk1NYXRlcmlhbHNIRFJFbWlzc2l2ZU11bHRpcGxpZXJMb2FkZXJQbHVnaW4ocGFyc2VyKTtcbiAgICB0aGlzLm1hdGVyaWFsc1YwQ29tcGF0UGx1Z2luID0gb3B0aW9ucz8ubWF0ZXJpYWxzVjBDb21wYXRQbHVnaW4gPz8gbmV3IFZSTU1hdGVyaWFsc1YwQ29tcGF0UGx1Z2luKHBhcnNlcik7XG5cbiAgICB0aGlzLnNwcmluZ0JvbmVQbHVnaW4gPVxuICAgICAgb3B0aW9ucz8uc3ByaW5nQm9uZVBsdWdpbiA/P1xuICAgICAgbmV3IFZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW4ocGFyc2VyLCB7XG4gICAgICAgIGNvbGxpZGVySGVscGVyUm9vdDogaGVscGVyUm9vdCxcbiAgICAgICAgam9pbnRIZWxwZXJSb290OiBoZWxwZXJSb290LFxuICAgICAgfSk7XG5cbiAgICB0aGlzLm5vZGVDb25zdHJhaW50UGx1Z2luID1cbiAgICAgIG9wdGlvbnM/Lm5vZGVDb25zdHJhaW50UGx1Z2luID8/IG5ldyBWUk1Ob2RlQ29uc3RyYWludExvYWRlclBsdWdpbihwYXJzZXIsIHsgaGVscGVyUm9vdCB9KTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBiZWZvcmVSb290KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMubWF0ZXJpYWxzVjBDb21wYXRQbHVnaW4uYmVmb3JlUm9vdCgpO1xuICAgIGF3YWl0IHRoaXMubXRvb25NYXRlcmlhbFBsdWdpbi5iZWZvcmVSb290KCk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgbG9hZE1lc2gobWVzaEluZGV4OiBudW1iZXIpOiBQcm9taXNlPFRIUkVFLkdyb3VwIHwgVEhSRUUuTWVzaCB8IFRIUkVFLlNraW5uZWRNZXNoPiB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMubXRvb25NYXRlcmlhbFBsdWdpbi5sb2FkTWVzaChtZXNoSW5kZXgpO1xuICB9XG5cbiAgcHVibGljIGdldE1hdGVyaWFsVHlwZShtYXRlcmlhbEluZGV4OiBudW1iZXIpOiB0eXBlb2YgVEhSRUUuTWF0ZXJpYWwgfCBudWxsIHtcbiAgICBjb25zdCBtdG9vblR5cGUgPSB0aGlzLm10b29uTWF0ZXJpYWxQbHVnaW4uZ2V0TWF0ZXJpYWxUeXBlKG1hdGVyaWFsSW5kZXgpO1xuICAgIGlmIChtdG9vblR5cGUgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG10b29uVHlwZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBleHRlbmRNYXRlcmlhbFBhcmFtcyhtYXRlcmlhbEluZGV4OiBudW1iZXIsIG1hdGVyaWFsUGFyYW1zOiB7IFtrZXk6IHN0cmluZ106IGFueSB9KTogUHJvbWlzZTxhbnk+IHtcbiAgICBhd2FpdCB0aGlzLm1hdGVyaWFsc0hEUkVtaXNzaXZlTXVsdGlwbGllclBsdWdpbi5leHRlbmRNYXRlcmlhbFBhcmFtcyhtYXRlcmlhbEluZGV4LCBtYXRlcmlhbFBhcmFtcyk7XG4gICAgYXdhaXQgdGhpcy5tdG9vbk1hdGVyaWFsUGx1Z2luLmV4dGVuZE1hdGVyaWFsUGFyYW1zKG1hdGVyaWFsSW5kZXgsIG1hdGVyaWFsUGFyYW1zKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBhZnRlclJvb3QoZ2x0ZjogR0xURik6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMubWV0YVBsdWdpbi5hZnRlclJvb3QoZ2x0Zik7XG4gICAgYXdhaXQgdGhpcy5odW1hbm9pZFBsdWdpbi5hZnRlclJvb3QoZ2x0Zik7XG4gICAgYXdhaXQgdGhpcy5leHByZXNzaW9uUGx1Z2luLmFmdGVyUm9vdChnbHRmKTtcbiAgICBhd2FpdCB0aGlzLmxvb2tBdFBsdWdpbi5hZnRlclJvb3QoZ2x0Zik7XG4gICAgYXdhaXQgdGhpcy5maXJzdFBlcnNvblBsdWdpbi5hZnRlclJvb3QoZ2x0Zik7XG4gICAgYXdhaXQgdGhpcy5zcHJpbmdCb25lUGx1Z2luLmFmdGVyUm9vdChnbHRmKTtcbiAgICBhd2FpdCB0aGlzLm5vZGVDb25zdHJhaW50UGx1Z2luLmFmdGVyUm9vdChnbHRmKTtcbiAgICBhd2FpdCB0aGlzLm10b29uTWF0ZXJpYWxQbHVnaW4uYWZ0ZXJSb290KGdsdGYpO1xuXG4gICAgY29uc3QgbWV0YSA9IGdsdGYudXNlckRhdGEudnJtTWV0YSBhcyBWUk1NZXRhIHwgbnVsbDtcbiAgICBjb25zdCBodW1hbm9pZCA9IGdsdGYudXNlckRhdGEudnJtSHVtYW5vaWQgYXMgVlJNSHVtYW5vaWQgfCBudWxsO1xuXG4gICAgLy8gbWV0YSBhbmQgaHVtYW5vaWQgYXJlIHJlcXVpcmVkIHRvIGJlIGEgVlJNLlxuICAgIC8vIERvbid0IGNyZWF0ZSBWUk0gaWYgdGhleSBhcmUgbnVsbFxuICAgIGlmIChtZXRhICYmIGh1bWFub2lkKSB7XG4gICAgICBjb25zdCB2cm0gPSBuZXcgVlJNKHtcbiAgICAgICAgc2NlbmU6IGdsdGYuc2NlbmUsXG4gICAgICAgIGV4cHJlc3Npb25NYW5hZ2VyOiBnbHRmLnVzZXJEYXRhLnZybUV4cHJlc3Npb25NYW5hZ2VyLFxuICAgICAgICBmaXJzdFBlcnNvbjogZ2x0Zi51c2VyRGF0YS52cm1GaXJzdFBlcnNvbixcbiAgICAgICAgaHVtYW5vaWQsXG4gICAgICAgIGxvb2tBdDogZ2x0Zi51c2VyRGF0YS52cm1Mb29rQXQsXG4gICAgICAgIG1ldGEsXG4gICAgICAgIG1hdGVyaWFsczogZ2x0Zi51c2VyRGF0YS52cm1NVG9vbk1hdGVyaWFscyxcbiAgICAgICAgc3ByaW5nQm9uZU1hbmFnZXI6IGdsdGYudXNlckRhdGEudnJtU3ByaW5nQm9uZU1hbmFnZXIsXG4gICAgICAgIG5vZGVDb25zdHJhaW50TWFuYWdlcjogZ2x0Zi51c2VyRGF0YS52cm1Ob2RlQ29uc3RyYWludE1hbmFnZXIsXG4gICAgICB9KTtcblxuICAgICAgZ2x0Zi51c2VyRGF0YS52cm0gPSB2cm07XG4gICAgfVxuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNQ29yZSwgVlJNRXhwcmVzc2lvbk1vcnBoVGFyZ2V0QmluZCB9IGZyb20gJ0BwaXhpdi90aHJlZS12cm0tY29yZSc7XG5cbi8qKlxuICogVHJhdmVyc2UgYW4gZW50aXJlIHRyZWUgYW5kIGNvbGxlY3QgbWVzaGVzLlxuICovXG5mdW5jdGlvbiBjb2xsZWN0TWVzaGVzKHNjZW5lOiBUSFJFRS5Hcm91cCk6IFNldDxUSFJFRS5NZXNoPiB7XG4gIGNvbnN0IG1lc2hlcyA9IG5ldyBTZXQ8VEhSRUUuTWVzaD4oKTtcblxuICBzY2VuZS50cmF2ZXJzZSgob2JqKSA9PiB7XG4gICAgaWYgKCEob2JqIGFzIGFueSkuaXNNZXNoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbWVzaCA9IG9iaiBhcyBUSFJFRS5NZXNoO1xuICAgIG1lc2hlcy5hZGQobWVzaCk7XG4gIH0pO1xuXG4gIHJldHVybiBtZXNoZXM7XG59XG5cbmZ1bmN0aW9uIGNvbWJpbmVNb3JwaChcbiAgcG9zaXRpb25BdHRyaWJ1dGVzOiAoVEhSRUUuQnVmZmVyQXR0cmlidXRlIHwgVEhSRUUuSW50ZXJsZWF2ZWRCdWZmZXJBdHRyaWJ1dGUpW10sXG4gIGJpbmRzOiBTZXQ8VlJNRXhwcmVzc2lvbk1vcnBoVGFyZ2V0QmluZD4sXG4gIG1vcnBoVGFyZ2V0c1JlbGF0aXZlOiBib29sZWFuLFxuKTogVEhSRUUuQnVmZmVyQXR0cmlidXRlIHwgVEhSRUUuSW50ZXJsZWF2ZWRCdWZmZXJBdHRyaWJ1dGUge1xuICAvLyBpZiB0aGVyZSBpcyBvbmx5IG9uZSBtb3JwaCB0YXJnZXQgYW5kIHRoZSB3ZWlnaHQgaXMgMS4wLCB3ZSBjYW4gdXNlIHRoZSBvcmlnaW5hbCBhcy1pc1xuICBpZiAoYmluZHMuc2l6ZSA9PT0gMSkge1xuICAgIGNvbnN0IGJpbmQgPSBiaW5kcy52YWx1ZXMoKS5uZXh0KCkudmFsdWUhO1xuICAgIGlmIChiaW5kLndlaWdodCA9PT0gMS4wKSB7XG4gICAgICByZXR1cm4gcG9zaXRpb25BdHRyaWJ1dGVzW2JpbmQuaW5kZXhdO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IG5ld0FycmF5ID0gbmV3IEZsb2F0MzJBcnJheShwb3NpdGlvbkF0dHJpYnV0ZXNbMF0uY291bnQgKiAzKTtcbiAgbGV0IHdlaWdodFN1bSA9IDAuMDtcblxuICBpZiAobW9ycGhUYXJnZXRzUmVsYXRpdmUpIHtcbiAgICB3ZWlnaHRTdW0gPSAxLjA7XG4gIH0gZWxzZSB7XG4gICAgZm9yIChjb25zdCBiaW5kIG9mIGJpbmRzKSB7XG4gICAgICB3ZWlnaHRTdW0gKz0gYmluZC53ZWlnaHQ7XG4gICAgfVxuICB9XG5cbiAgZm9yIChjb25zdCBiaW5kIG9mIGJpbmRzKSB7XG4gICAgY29uc3Qgc3JjID0gcG9zaXRpb25BdHRyaWJ1dGVzW2JpbmQuaW5kZXhdO1xuICAgIGNvbnN0IHdlaWdodCA9IGJpbmQud2VpZ2h0IC8gd2VpZ2h0U3VtO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzcmMuY291bnQ7IGkrKykge1xuICAgICAgbmV3QXJyYXlbaSAqIDMgKyAwXSArPSBzcmMuZ2V0WChpKSAqIHdlaWdodDtcbiAgICAgIG5ld0FycmF5W2kgKiAzICsgMV0gKz0gc3JjLmdldFkoaSkgKiB3ZWlnaHQ7XG4gICAgICBuZXdBcnJheVtpICogMyArIDJdICs9IHNyYy5nZXRaKGkpICogd2VpZ2h0O1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IG5ld0F0dHJpYnV0ZSA9IG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUobmV3QXJyYXksIDMpO1xuICByZXR1cm4gbmV3QXR0cmlidXRlO1xufVxuXG4vKipcbiAqIEEgbWFwIGZyb20gZXhwcmVzc2lvbiBuYW1lcyB0byBhIHNldCBvZiBtb3JwaCB0YXJnZXQgYmluZHMuXG4gKi9cbnR5cGUgTmFtZUJpbmRTZXRNYXAgPSBNYXA8c3RyaW5nLCBTZXQ8VlJNRXhwcmVzc2lvbk1vcnBoVGFyZ2V0QmluZD4+O1xuXG4vKipcbiAqIENvbWJpbmUgbW9ycGggdGFyZ2V0cyBieSBWUk0gZXhwcmVzc2lvbnMuXG4gKlxuICogVGhpcyBmdW5jdGlvbiBwcmV2ZW50cyBjcmFzaGVzIGNhdXNlZCBieSB0aGUgbGltaXRhdGlvbiBvZiB0aGUgbnVtYmVyIG9mIG1vcnBoIHRhcmdldHMsIGVzcGVjaWFsbHkgb24gbW9iaWxlIGRldmljZXMuXG4gKlxuICogQHBhcmFtIHZybSBUaGUgVlJNIGluc3RhbmNlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21iaW5lTW9ycGhzKHZybTogVlJNQ29yZSk6IHZvaWQge1xuICBjb25zdCBtZXNoZXMgPSBjb2xsZWN0TWVzaGVzKHZybS5zY2VuZSk7XG5cbiAgLy8gSXRlcmF0ZSBvdmVyIGFsbCBleHByZXNzaW9ucyBhbmQgY2hlY2sgd2hpY2ggbW9ycGggdGFyZ2V0cyBhcmUgdXNlZFxuICBjb25zdCBtZXNoTmFtZUJpbmRTZXRNYXBNYXAgPSBuZXcgTWFwPFRIUkVFLk1lc2gsIE5hbWVCaW5kU2V0TWFwPigpO1xuXG4gIGNvbnN0IGV4cHJlc3Npb25NYXAgPSB2cm0uZXhwcmVzc2lvbk1hbmFnZXI/LmV4cHJlc3Npb25NYXA7XG4gIGlmIChleHByZXNzaW9uTWFwICE9IG51bGwpIHtcbiAgICBmb3IgKGNvbnN0IFtleHByZXNzaW9uTmFtZSwgZXhwcmVzc2lvbl0gb2YgT2JqZWN0LmVudHJpZXMoZXhwcmVzc2lvbk1hcCkpIHtcbiAgICAgIGNvbnN0IGJpbmRzVG9EZWxldGVTZXQgPSBuZXcgU2V0PFZSTUV4cHJlc3Npb25Nb3JwaFRhcmdldEJpbmQ+KCk7XG4gICAgICBmb3IgKGNvbnN0IGJpbmQgb2YgZXhwcmVzc2lvbi5iaW5kcykge1xuICAgICAgICBpZiAoYmluZCBpbnN0YW5jZW9mIFZSTUV4cHJlc3Npb25Nb3JwaFRhcmdldEJpbmQpIHtcbiAgICAgICAgICBpZiAoYmluZC53ZWlnaHQgIT09IDAuMCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBtZXNoIG9mIGJpbmQucHJpbWl0aXZlcykge1xuICAgICAgICAgICAgICBsZXQgbmFtZUJpbmRTZXRNYXAgPSBtZXNoTmFtZUJpbmRTZXRNYXBNYXAuZ2V0KG1lc2gpO1xuICAgICAgICAgICAgICBpZiAobmFtZUJpbmRTZXRNYXAgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIG5hbWVCaW5kU2V0TWFwID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgICAgIG1lc2hOYW1lQmluZFNldE1hcE1hcC5zZXQobWVzaCwgbmFtZUJpbmRTZXRNYXApO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgbGV0IGJpbmRTZXQgPSBuYW1lQmluZFNldE1hcC5nZXQoZXhwcmVzc2lvbk5hbWUpO1xuICAgICAgICAgICAgICBpZiAoYmluZFNldCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgYmluZFNldCA9IG5ldyBTZXQoKTtcbiAgICAgICAgICAgICAgICBuYW1lQmluZFNldE1hcC5zZXQoZXhwcmVzc2lvbk5hbWUsIGJpbmRTZXQpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgYmluZFNldC5hZGQoYmluZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJpbmRzVG9EZWxldGVTZXQuYWRkKGJpbmQpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZvciAoY29uc3QgYmluZCBvZiBiaW5kc1RvRGVsZXRlU2V0KSB7XG4gICAgICAgIGV4cHJlc3Npb24uZGVsZXRlQmluZChiaW5kKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBDb21iaW5lIG1vcnBoc1xuICBmb3IgKGNvbnN0IG1lc2ggb2YgbWVzaGVzKSB7XG4gICAgY29uc3QgbmFtZUJpbmRTZXRNYXAgPSBtZXNoTmFtZUJpbmRTZXRNYXBNYXAuZ2V0KG1lc2gpO1xuICAgIGlmIChuYW1lQmluZFNldE1hcCA9PSBudWxsKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBwcmV2ZW50IGNsb25pbmcgbW9ycGggYXR0cmlidXRlc1xuICAgIGNvbnN0IG9yaWdpbmFsTW9ycGhBdHRyaWJ1dGVzID0gbWVzaC5nZW9tZXRyeS5tb3JwaEF0dHJpYnV0ZXM7XG4gICAgbWVzaC5nZW9tZXRyeS5tb3JwaEF0dHJpYnV0ZXMgPSB7fTtcblxuICAgIGNvbnN0IGdlb21ldHJ5ID0gbWVzaC5nZW9tZXRyeS5jbG9uZSgpO1xuICAgIG1lc2guZ2VvbWV0cnkgPSBnZW9tZXRyeTtcbiAgICBjb25zdCBtb3JwaFRhcmdldHNSZWxhdGl2ZSA9IGdlb21ldHJ5Lm1vcnBoVGFyZ2V0c1JlbGF0aXZlO1xuXG4gICAgY29uc3QgaGFzUE1vcnBoID0gb3JpZ2luYWxNb3JwaEF0dHJpYnV0ZXMucG9zaXRpb24gIT0gbnVsbDtcbiAgICBjb25zdCBoYXNOTW9ycGggPSBvcmlnaW5hbE1vcnBoQXR0cmlidXRlcy5ub3JtYWwgIT0gbnVsbDtcblxuICAgIGNvbnN0IG1vcnBoQXR0cmlidXRlczogdHlwZW9mIG9yaWdpbmFsTW9ycGhBdHRyaWJ1dGVzID0ge307XG4gICAgY29uc3QgbW9ycGhUYXJnZXREaWN0aW9uYXJ5OiB0eXBlb2YgbWVzaC5tb3JwaFRhcmdldERpY3Rpb25hcnkgPSB7fTtcbiAgICBjb25zdCBtb3JwaFRhcmdldEluZmx1ZW5jZXM6IHR5cGVvZiBtZXNoLm1vcnBoVGFyZ2V0SW5mbHVlbmNlcyA9IFtdO1xuXG4gICAgaWYgKGhhc1BNb3JwaCB8fCBoYXNOTW9ycGgpIHtcbiAgICAgIGlmIChoYXNQTW9ycGgpIHtcbiAgICAgICAgbW9ycGhBdHRyaWJ1dGVzLnBvc2l0aW9uID0gW107XG4gICAgICB9XG4gICAgICBpZiAoaGFzTk1vcnBoKSB7XG4gICAgICAgIG1vcnBoQXR0cmlidXRlcy5ub3JtYWwgPSBbXTtcbiAgICAgIH1cblxuICAgICAgbGV0IGkgPSAwO1xuICAgICAgZm9yIChjb25zdCBbbmFtZSwgYmluZFNldF0gb2YgbmFtZUJpbmRTZXRNYXApIHtcbiAgICAgICAgaWYgKGhhc1BNb3JwaCkge1xuICAgICAgICAgIG1vcnBoQXR0cmlidXRlcy5wb3NpdGlvbiFbaV0gPSBjb21iaW5lTW9ycGgob3JpZ2luYWxNb3JwaEF0dHJpYnV0ZXMucG9zaXRpb24hLCBiaW5kU2V0LCBtb3JwaFRhcmdldHNSZWxhdGl2ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhhc05Nb3JwaCkge1xuICAgICAgICAgIG1vcnBoQXR0cmlidXRlcy5ub3JtYWwhW2ldID0gY29tYmluZU1vcnBoKG9yaWdpbmFsTW9ycGhBdHRyaWJ1dGVzLm5vcm1hbCEsIGJpbmRTZXQsIG1vcnBoVGFyZ2V0c1JlbGF0aXZlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGV4cHJlc3Npb25NYXA/LltuYW1lXS5hZGRCaW5kKFxuICAgICAgICAgIG5ldyBWUk1FeHByZXNzaW9uTW9ycGhUYXJnZXRCaW5kKHtcbiAgICAgICAgICAgIGluZGV4OiBpLFxuICAgICAgICAgICAgd2VpZ2h0OiAxLjAsXG4gICAgICAgICAgICBwcmltaXRpdmVzOiBbbWVzaF0sXG4gICAgICAgICAgfSksXG4gICAgICAgICk7XG5cbiAgICAgICAgbW9ycGhUYXJnZXREaWN0aW9uYXJ5W25hbWVdID0gaTtcbiAgICAgICAgbW9ycGhUYXJnZXRJbmZsdWVuY2VzLnB1c2goMC4wKTtcblxuICAgICAgICBpKys7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZ2VvbWV0cnkubW9ycGhBdHRyaWJ1dGVzID0gbW9ycGhBdHRyaWJ1dGVzO1xuICAgIG1lc2gubW9ycGhUYXJnZXREaWN0aW9uYXJ5ID0gbW9ycGhUYXJnZXREaWN0aW9uYXJ5O1xuICAgIG1lc2gubW9ycGhUYXJnZXRJbmZsdWVuY2VzID0gbW9ycGhUYXJnZXRJbmZsdWVuY2VzO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgYXR0cmlidXRlR2V0Q29tcG9uZW50Q29tcGF0IH0gZnJvbSAnLi4vdXRpbHMvYXR0cmlidXRlR2V0Q29tcG9uZW50Q29tcGF0JztcbmltcG9ydCB7IGF0dHJpYnV0ZVNldENvbXBvbmVudENvbXBhdCB9IGZyb20gJy4uL3V0aWxzL2F0dHJpYnV0ZVNldENvbXBvbmVudENvbXBhdCc7XG5cbi8qKlxuICogVHJhdmVyc2VzIHRoZSBnaXZlbiBvYmplY3QgYW5kIGNvbWJpbmVzIHRoZSBza2VsZXRvbnMgb2Ygc2tpbm5lZCBtZXNoZXMuXG4gKlxuICogRWFjaCBmcmFtZSB0aGUgYm9uZSBtYXRyaWNlcyBhcmUgY29tcHV0ZWQgZm9yIGV2ZXJ5IHNrZWxldG9uLiBDb21iaW5pbmcgc2tlbGV0b25zXG4gKiByZWR1Y2VzIHRoZSBudW1iZXIgb2YgY2FsY3VsYXRpb25zIG5lZWRlZCwgaW1wcm92aW5nIHBlcmZvcm1hbmNlLlxuICpcbiAqIEBwYXJhbSByb290IFJvb3Qgb2JqZWN0IHRoYXQgd2lsbCBiZSB0cmF2ZXJzZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbWJpbmVTa2VsZXRvbnMocm9vdDogVEhSRUUuT2JqZWN0M0QpOiB2b2lkIHtcbiAgY29uc3Qgc2tpbm5lZE1lc2hlcyA9IGNvbGxlY3RTa2lubmVkTWVzaGVzKHJvb3QpO1xuXG4gIC8qKiBBIHNldCBvZiBnZW9tZXRyaWVzIGluIHRoZSBnaXZlbiB7QGxpbmsgcm9vdH0uICovXG4gIGNvbnN0IGdlb21ldHJpZXMgPSBuZXcgU2V0PFRIUkVFLkJ1ZmZlckdlb21ldHJ5PigpO1xuICBmb3IgKGNvbnN0IG1lc2ggb2Ygc2tpbm5lZE1lc2hlcykge1xuICAgIC8vIG1lc2hlcyBzb21ldGltZXMgc2hhcmUgdGhlIHNhbWUgZ2VvbWV0cnlcbiAgICAvLyB3ZSBkb24ndCB3YW50IHRvIHRvdWNoIHRoZSBzYW1lIGF0dHJpYnV0ZSB0d2ljZSwgc28gd2UgY2xvbmUgdGhlIGdlb21ldHJpZXNcbiAgICBpZiAoZ2VvbWV0cmllcy5oYXMobWVzaC5nZW9tZXRyeSkpIHtcbiAgICAgIG1lc2guZ2VvbWV0cnkgPSBzaGFsbG93Q2xvbmVCdWZmZXJHZW9tZXRyeShtZXNoLmdlb21ldHJ5KTtcbiAgICB9XG5cbiAgICBnZW9tZXRyaWVzLmFkZChtZXNoLmdlb21ldHJ5KTtcbiAgfVxuXG4gIC8vIExpc3QgYWxsIHVzZWQgc2tpbiBpbmRpY2VzIGZvciBlYWNoIHNraW4gaW5kZXggYXR0cmlidXRlXG4gIC8qKiBBIG1hcDogc2tpbiBpbmRleCBhdHRyaWJ1dGUgLT4gc2tpbiB3ZWlnaHQgYXR0cmlidXRlIC0+IHVzZWQgaW5kZXggc2V0ICovXG4gIGNvbnN0IGF0dHJpYnV0ZVVzZWRJbmRleFNldE1hcCA9IG5ldyBNYXA8XG4gICAgVEhSRUUuQnVmZmVyQXR0cmlidXRlIHwgVEhSRUUuSW50ZXJsZWF2ZWRCdWZmZXJBdHRyaWJ1dGUsXG4gICAgTWFwPFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZSB8IFRIUkVFLkludGVybGVhdmVkQnVmZmVyQXR0cmlidXRlLCBTZXQ8bnVtYmVyPj5cbiAgPigpO1xuXG4gIGZvciAoY29uc3QgZ2VvbWV0cnkgb2YgZ2VvbWV0cmllcykge1xuICAgIGNvbnN0IHNraW5JbmRleEF0dHIgPSBnZW9tZXRyeS5nZXRBdHRyaWJ1dGUoJ3NraW5JbmRleCcpO1xuICAgIGNvbnN0IHNraW5JbmRleE1hcCA9IGF0dHJpYnV0ZVVzZWRJbmRleFNldE1hcC5nZXQoc2tpbkluZGV4QXR0cikgPz8gbmV3IE1hcCgpO1xuICAgIGF0dHJpYnV0ZVVzZWRJbmRleFNldE1hcC5zZXQoc2tpbkluZGV4QXR0ciwgc2tpbkluZGV4TWFwKTtcblxuICAgIGNvbnN0IHNraW5XZWlnaHRBdHRyID0gZ2VvbWV0cnkuZ2V0QXR0cmlidXRlKCdza2luV2VpZ2h0Jyk7XG4gICAgY29uc3QgdXNlZEluZGljZXNTZXQgPSBsaXN0VXNlZEluZGljZXMoc2tpbkluZGV4QXR0ciwgc2tpbldlaWdodEF0dHIpO1xuICAgIHNraW5JbmRleE1hcC5zZXQoc2tpbldlaWdodEF0dHIsIHVzZWRJbmRpY2VzU2V0KTtcbiAgfVxuXG4gIC8vIExpc3QgYWxsIGJvbmVzIGFuZCBib25lSW52ZXJzZXMgZm9yIGVhY2ggbWVzaGVzXG4gIGNvbnN0IG1lc2hCb25lSW52ZXJzZU1hcE1hcCA9IG5ldyBNYXA8VEhSRUUuU2tpbm5lZE1lc2gsIE1hcDxUSFJFRS5Cb25lLCBUSFJFRS5NYXRyaXg0Pj4oKTtcbiAgZm9yIChjb25zdCBtZXNoIG9mIHNraW5uZWRNZXNoZXMpIHtcbiAgICBjb25zdCBib25lSW52ZXJzZU1hcCA9IGxpc3RVc2VkQm9uZXMobWVzaCwgYXR0cmlidXRlVXNlZEluZGV4U2V0TWFwKTtcbiAgICBtZXNoQm9uZUludmVyc2VNYXBNYXAuc2V0KG1lc2gsIGJvbmVJbnZlcnNlTWFwKTtcbiAgfVxuXG4gIC8vIEdyb3VwIG1lc2hlcyBieSBib25lIHNldHNcbiAgY29uc3QgZ3JvdXBzOiB7IGJvbmVJbnZlcnNlTWFwOiBNYXA8VEhSRUUuQm9uZSwgVEhSRUUuTWF0cml4ND47IG1lc2hlczogU2V0PFRIUkVFLlNraW5uZWRNZXNoPiB9W10gPSBbXTtcbiAgZm9yIChjb25zdCBbbWVzaCwgYm9uZUludmVyc2VNYXBdIG9mIG1lc2hCb25lSW52ZXJzZU1hcE1hcCkge1xuICAgIGxldCBmb3VuZE1lcmdlYWJsZUdyb3VwID0gZmFsc2U7XG4gICAgZm9yIChjb25zdCBjYW5kaWRhdGUgb2YgZ3JvdXBzKSB7XG4gICAgICAvLyBjaGVjayBpZiB0aGUgY2FuZGlkYXRlIGdyb3VwIGlzIG1lcmdlYWJsZVxuICAgICAgY29uc3QgaXNNZXJnZWFibGUgPSBib25lSW52ZXJzZU1hcElzTWVyZ2VhYmxlKGJvbmVJbnZlcnNlTWFwLCBjYW5kaWRhdGUuYm9uZUludmVyc2VNYXApO1xuXG4gICAgICAvLyBpZiB3ZSBmb3VuZCBhIG1lcmdlYWJsZSBncm91cCwgYWRkIHRoZSBtZXNoIHRvIHRoZSBncm91cFxuICAgICAgaWYgKGlzTWVyZ2VhYmxlKSB7XG4gICAgICAgIGZvdW5kTWVyZ2VhYmxlR3JvdXAgPSB0cnVlO1xuICAgICAgICBjYW5kaWRhdGUubWVzaGVzLmFkZChtZXNoKTtcblxuICAgICAgICAvLyBhZGQgbGFja2luZyBib25lcyB0byB0aGUgZ3JvdXBcbiAgICAgICAgZm9yIChjb25zdCBbYm9uZSwgYm9uZUludmVyc2VdIG9mIGJvbmVJbnZlcnNlTWFwKSB7XG4gICAgICAgICAgY2FuZGlkYXRlLmJvbmVJbnZlcnNlTWFwLnNldChib25lLCBib25lSW52ZXJzZSk7XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBpZiB3ZSBjb3VsZG4ndCBmaW5kIGEgbWVyZ2VhYmxlIGdyb3VwLCBjcmVhdGUgYSBuZXcgZ3JvdXBcbiAgICBpZiAoIWZvdW5kTWVyZ2VhYmxlR3JvdXApIHtcbiAgICAgIGdyb3Vwcy5wdXNoKHsgYm9uZUludmVyc2VNYXAsIG1lc2hlczogbmV3IFNldChbbWVzaF0pIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIHByZXBhcmUgbmV3IHNrZWxldG9ucyBmb3IgZWFjaCBncm91cCwgYW5kIGJpbmQgdGhlbSB0byB0aGUgbWVzaGVzXG5cbiAgLy8gdGhlIGNvbmRpdGlvbiB0byB1c2UgdGhlIHNhbWUgc2tpbiBpbmRleCBhdHRyaWJ1dGU6XG4gIC8vIC0gdGhlIHNhbWUgc2tpbiBpbmRleCBhdHRyaWJ1dGVcbiAgLy8gLSBhbmQgdGhlIHNrZWxldG9uIGlzIHNhbWVcbiAgLy8gLSBhbmQgdGhlIGJvbmUgc2V0IGlzIHNhbWVcbiAgY29uc3QgY2FjaGUgPSBuZXcgTWFwPHN0cmluZywgVEhSRUUuQnVmZmVyQXR0cmlidXRlIHwgVEhSRUUuSW50ZXJsZWF2ZWRCdWZmZXJBdHRyaWJ1dGU+KCk7XG4gIGNvbnN0IHNraW5JbmRleERpc3BhdGNoZXIgPSBuZXcgT2JqZWN0SW5kZXhEaXNwYXRjaGVyPFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZSB8IFRIUkVFLkludGVybGVhdmVkQnVmZmVyQXR0cmlidXRlPigpO1xuICBjb25zdCBza2VsZXRvbkRpc3BhdGNoZXIgPSBuZXcgT2JqZWN0SW5kZXhEaXNwYXRjaGVyPFRIUkVFLlNrZWxldG9uPigpO1xuICBjb25zdCBib25lRGlzcGF0Y2hlciA9IG5ldyBPYmplY3RJbmRleERpc3BhdGNoZXI8VEhSRUUuQm9uZT4oKTtcblxuICBmb3IgKGNvbnN0IGdyb3VwIG9mIGdyb3Vwcykge1xuICAgIGNvbnN0IHsgYm9uZUludmVyc2VNYXAsIG1lc2hlcyB9ID0gZ3JvdXA7XG5cbiAgICAvLyBjcmVhdGUgYSBuZXcgc2tlbGV0b25cbiAgICBjb25zdCBuZXdCb25lcyA9IEFycmF5LmZyb20oYm9uZUludmVyc2VNYXAua2V5cygpKTtcbiAgICBjb25zdCBuZXdCb25lSW52ZXJzZXMgPSBBcnJheS5mcm9tKGJvbmVJbnZlcnNlTWFwLnZhbHVlcygpKTtcbiAgICBjb25zdCBuZXdTa2VsZXRvbiA9IG5ldyBUSFJFRS5Ta2VsZXRvbihuZXdCb25lcywgbmV3Qm9uZUludmVyc2VzKTtcbiAgICBjb25zdCBza2VsZXRvbktleSA9IHNrZWxldG9uRGlzcGF0Y2hlci5nZXRPckNyZWF0ZShuZXdTa2VsZXRvbik7XG5cbiAgICAvLyByZW1hcCBza2luIGluZGV4IGF0dHJpYnV0ZVxuICAgIGZvciAoY29uc3QgbWVzaCBvZiBtZXNoZXMpIHtcbiAgICAgIGNvbnN0IHNraW5JbmRleEF0dHIgPSBtZXNoLmdlb21ldHJ5LmdldEF0dHJpYnV0ZSgnc2tpbkluZGV4Jyk7XG4gICAgICBjb25zdCBza2luSW5kZXhLZXkgPSBza2luSW5kZXhEaXNwYXRjaGVyLmdldE9yQ3JlYXRlKHNraW5JbmRleEF0dHIpO1xuXG4gICAgICBjb25zdCBib25lcyA9IG1lc2guc2tlbGV0b24uYm9uZXM7XG4gICAgICBjb25zdCBib25lc0tleSA9IGJvbmVzLm1hcCgoYm9uZSkgPT4gYm9uZURpc3BhdGNoZXIuZ2V0T3JDcmVhdGUoYm9uZSkpLmpvaW4oJywnKTtcblxuICAgICAgLy8gY3JlYXRlIGEga2V5IGZyb20gY29uZGl0aW9ucyBhbmQgY2hlY2sgaWYgd2UgYWxyZWFkeSBoYXZlIGEgcmVtYXBwZWQgc2tpbiBpbmRleCBhdHRyaWJ1dGVcbiAgICAgIGNvbnN0IGtleSA9IGAke3NraW5JbmRleEtleX07JHtza2VsZXRvbktleX07JHtib25lc0tleX1gO1xuICAgICAgbGV0IG5ld1NraW5JbmRleEF0dHIgPSBjYWNoZS5nZXQoa2V5KTtcblxuICAgICAgLy8gaWYgd2UgZG9uJ3QgaGF2ZSBhIHJlbWFwcGVkIHNraW4gaW5kZXggYXR0cmlidXRlLCBjcmVhdGUgb25lXG4gICAgICBpZiAobmV3U2tpbkluZGV4QXR0ciA9PSBudWxsKSB7XG4gICAgICAgIG5ld1NraW5JbmRleEF0dHIgPSBza2luSW5kZXhBdHRyLmNsb25lKCk7XG4gICAgICAgIHJlbWFwU2tpbkluZGV4QXR0cmlidXRlKG5ld1NraW5JbmRleEF0dHIsIGJvbmVzLCBuZXdCb25lcyk7XG4gICAgICAgIGNhY2hlLnNldChrZXksIG5ld1NraW5JbmRleEF0dHIpO1xuICAgICAgfVxuXG4gICAgICBtZXNoLmdlb21ldHJ5LnNldEF0dHJpYnV0ZSgnc2tpbkluZGV4JywgbmV3U2tpbkluZGV4QXR0cik7XG4gICAgfVxuXG4gICAgLy8gYmluZCB0aGUgbmV3IHNrZWxldG9uIHRvIHRoZSBtZXNoZXNcbiAgICBmb3IgKGNvbnN0IG1lc2ggb2YgbWVzaGVzKSB7XG4gICAgICBtZXNoLmJpbmQobmV3U2tlbGV0b24sIG5ldyBUSFJFRS5NYXRyaXg0KCkpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFRyYXZlcnNlIGFuIGVudGlyZSB0cmVlIGFuZCBjb2xsZWN0IHNraW5uZWQgbWVzaGVzLlxuICovXG5mdW5jdGlvbiBjb2xsZWN0U2tpbm5lZE1lc2hlcyhzY2VuZTogVEhSRUUuT2JqZWN0M0QpOiBTZXQ8VEhSRUUuU2tpbm5lZE1lc2g+IHtcbiAgY29uc3Qgc2tpbm5lZE1lc2hlcyA9IG5ldyBTZXQ8VEhSRUUuU2tpbm5lZE1lc2g+KCk7XG5cbiAgc2NlbmUudHJhdmVyc2UoKG9iaikgPT4ge1xuICAgIGlmICghKG9iaiBhcyBhbnkpLmlzU2tpbm5lZE1lc2gpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBza2lubmVkTWVzaCA9IG9iaiBhcyBUSFJFRS5Ta2lubmVkTWVzaDtcbiAgICBza2lubmVkTWVzaGVzLmFkZChza2lubmVkTWVzaCk7XG4gIH0pO1xuXG4gIHJldHVybiBza2lubmVkTWVzaGVzO1xufVxuXG4vKipcbiAqIExpc3QgYWxsIHNraW4gaW5kaWNlcyB1c2VkIGJ5IHRoZSBnaXZlbiBnZW9tZXRyeS5cbiAqIElmIHRoZSBza2luIHdlaWdodCBpcyAwLCB0aGUgaW5kZXggd29uJ3QgYmUgY29uc2lkZXJlZCBhcyB1c2VkLlxuICogQHBhcmFtIHNraW5JbmRleEF0dHIgVGhlIHNraW4gaW5kZXggYXR0cmlidXRlIHRvIGxpc3QgdXNlZCBpbmRpY2VzXG4gKiBAcGFyYW0gc2tpbldlaWdodEF0dHIgVGhlIHNraW4gd2VpZ2h0IGF0dHJpYnV0ZSBjb3JyZXNwb25kaW5nIHRvIHRoZSBza2luIGluZGV4IGF0dHJpYnV0ZVxuICovXG5mdW5jdGlvbiBsaXN0VXNlZEluZGljZXMoXG4gIHNraW5JbmRleEF0dHI6IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZSB8IFRIUkVFLkludGVybGVhdmVkQnVmZmVyQXR0cmlidXRlLFxuICBza2luV2VpZ2h0QXR0cjogVEhSRUUuQnVmZmVyQXR0cmlidXRlIHwgVEhSRUUuSW50ZXJsZWF2ZWRCdWZmZXJBdHRyaWJ1dGUsXG4pOiBTZXQ8bnVtYmVyPiB7XG4gIGNvbnN0IHVzZWRJbmRpY2VzID0gbmV3IFNldDxudW1iZXI+KCk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBza2luSW5kZXhBdHRyLmNvdW50OyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNraW5JbmRleEF0dHIuaXRlbVNpemU7IGorKykge1xuICAgICAgY29uc3QgaW5kZXggPSBhdHRyaWJ1dGVHZXRDb21wb25lbnRDb21wYXQoc2tpbkluZGV4QXR0ciwgaSwgaik7XG4gICAgICBjb25zdCB3ZWlnaHQgPSBhdHRyaWJ1dGVHZXRDb21wb25lbnRDb21wYXQoc2tpbldlaWdodEF0dHIsIGksIGopO1xuXG4gICAgICBpZiAod2VpZ2h0ICE9PSAwKSB7XG4gICAgICAgIHVzZWRJbmRpY2VzLmFkZChpbmRleCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHVzZWRJbmRpY2VzO1xufVxuXG4vKipcbiAqIExpc3QgYWxsIGJvbmVzIHVzZWQgYnkgdGhlIGdpdmVuIHNraW5uZWQgbWVzaC5cbiAqIEBwYXJhbSBtZXNoIFRoZSBza2lubmVkIG1lc2ggdG8gbGlzdCB1c2VkIGJvbmVzXG4gKiBAcGFyYW0gYXR0cmlidXRlVXNlZEluZGV4U2V0TWFwIEEgbWFwIGZyb20gc2tpbiBpbmRleCBhdHRyaWJ1dGUgdG8gdGhlIHNldCBvZiB1c2VkIHNraW4gaW5kaWNlc1xuICogQHJldHVybnMgQSBtYXAgZnJvbSB1c2VkIGJvbmUgdG8gdGhlIGNvcnJlc3BvbmRpbmcgYm9uZSBpbnZlcnNlIG1hdHJpeFxuICovXG5mdW5jdGlvbiBsaXN0VXNlZEJvbmVzKFxuICBtZXNoOiBUSFJFRS5Ta2lubmVkTWVzaCxcbiAgYXR0cmlidXRlVXNlZEluZGV4U2V0TWFwOiBNYXA8XG4gICAgVEhSRUUuQnVmZmVyQXR0cmlidXRlIHwgVEhSRUUuSW50ZXJsZWF2ZWRCdWZmZXJBdHRyaWJ1dGUsXG4gICAgTWFwPFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZSB8IFRIUkVFLkludGVybGVhdmVkQnVmZmVyQXR0cmlidXRlLCBTZXQ8bnVtYmVyPj5cbiAgPixcbik6IE1hcDxUSFJFRS5Cb25lLCBUSFJFRS5NYXRyaXg0PiB7XG4gIGNvbnN0IGJvbmVJbnZlcnNlTWFwID0gbmV3IE1hcDxUSFJFRS5Cb25lLCBUSFJFRS5NYXRyaXg0PigpO1xuXG4gIGNvbnN0IHNrZWxldG9uID0gbWVzaC5za2VsZXRvbjtcblxuICBjb25zdCBnZW9tZXRyeSA9IG1lc2guZ2VvbWV0cnk7XG4gIGNvbnN0IHNraW5JbmRleEF0dHIgPSBnZW9tZXRyeS5nZXRBdHRyaWJ1dGUoJ3NraW5JbmRleCcpO1xuICBjb25zdCBza2luV2VpZ2h0QXR0ciA9IGdlb21ldHJ5LmdldEF0dHJpYnV0ZSgnc2tpbldlaWdodCcpO1xuICBjb25zdCBza2luSW5kZXhNYXAgPSBhdHRyaWJ1dGVVc2VkSW5kZXhTZXRNYXAuZ2V0KHNraW5JbmRleEF0dHIpO1xuICBjb25zdCB1c2VkSW5kaWNlc1NldCA9IHNraW5JbmRleE1hcD8uZ2V0KHNraW5XZWlnaHRBdHRyKTtcblxuICBpZiAoIXVzZWRJbmRpY2VzU2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ1VucmVhY2hhYmxlLiBhdHRyaWJ1dGVVc2VkSW5kZXhTZXRNYXAgZG9lcyBub3Qga25vdyB0aGUgc2tpbiBpbmRleCBhdHRyaWJ1dGUgb3IgdGhlIHNraW4gd2VpZ2h0IGF0dHJpYnV0ZS4nLFxuICAgICk7XG4gIH1cblxuICBmb3IgKGNvbnN0IGluZGV4IG9mIHVzZWRJbmRpY2VzU2V0KSB7XG4gICAgYm9uZUludmVyc2VNYXAuc2V0KHNrZWxldG9uLmJvbmVzW2luZGV4XSwgc2tlbGV0b24uYm9uZUludmVyc2VzW2luZGV4XSk7XG4gIH1cblxuICByZXR1cm4gYm9uZUludmVyc2VNYXA7XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgdGhlIGdpdmVuIGJvbmUgaW52ZXJzZSBtYXAgaXMgbWVyZ2VhYmxlIHRvIHRoZSBjYW5kaWRhdGUgYm9uZSBpbnZlcnNlIG1hcC5cbiAqIEBwYXJhbSB0b0NoZWNrIFRoZSBib25lIGludmVyc2UgbWFwIHRvIGNoZWNrXG4gKiBAcGFyYW0gY2FuZGlkYXRlIFRoZSBjYW5kaWRhdGUgYm9uZSBpbnZlcnNlIG1hcFxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgYm9uZSBpbnZlcnNlIG1hcCBpcyBtZXJnZWFibGUgdG8gdGhlIGNhbmRpZGF0ZSBib25lIGludmVyc2UgbWFwXG4gKi9cbmZ1bmN0aW9uIGJvbmVJbnZlcnNlTWFwSXNNZXJnZWFibGUoXG4gIHRvQ2hlY2s6IE1hcDxUSFJFRS5Cb25lLCBUSFJFRS5NYXRyaXg0PixcbiAgY2FuZGlkYXRlOiBNYXA8VEhSRUUuQm9uZSwgVEhSRUUuTWF0cml4ND4sXG4pOiBib29sZWFuIHtcbiAgZm9yIChjb25zdCBbYm9uZSwgYm9uZUludmVyc2VdIG9mIHRvQ2hlY2suZW50cmllcygpKSB7XG4gICAgLy8gaWYgdGhlIGJvbmUgaXMgaW4gdGhlIGNhbmRpZGF0ZSBncm91cCBhbmQgdGhlIGJvbmVJbnZlcnNlIGlzIGRpZmZlcmVudCwgaXQncyBub3QgbWVyZ2VhYmxlXG4gICAgY29uc3QgY2FuZGlkYXRlQm9uZUludmVyc2UgPSBjYW5kaWRhdGUuZ2V0KGJvbmUpO1xuICAgIGlmIChjYW5kaWRhdGVCb25lSW52ZXJzZSAhPSBudWxsKSB7XG4gICAgICBpZiAoIW1hdHJpeEVxdWFscyhib25lSW52ZXJzZSwgY2FuZGlkYXRlQm9uZUludmVyc2UpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLyoqXG4gKiBSZW1hcCB0aGUgc2tpbiBpbmRleCBhdHRyaWJ1dGUgZnJvbSBvbGQgYm9uZXMgdG8gbmV3IGJvbmVzLlxuICogVGhpcyBmdW5jdGlvbiBtb2RpZmllcyB0aGUgZ2l2ZW4gYXR0cmlidXRlIGluIHBsYWNlLlxuICogQHBhcmFtIGF0dHJpYnV0ZSBUaGUgc2tpbiBpbmRleCBhdHRyaWJ1dGUgdG8gcmVtYXBcbiAqIEBwYXJhbSBvbGRCb25lcyBUaGUgYm9uZSBhcnJheSB0aGF0IHRoZSBhdHRyaWJ1dGUgaXMgY3VycmVudGx5IHVzaW5nXG4gKiBAcGFyYW0gbmV3Qm9uZXMgVGhlIGJvbmUgYXJyYXkgdGhhdCB0aGUgYXR0cmlidXRlIHdpbGwgYmUgdXNpbmdcbiAqL1xuZnVuY3Rpb24gcmVtYXBTa2luSW5kZXhBdHRyaWJ1dGUoXG4gIGF0dHJpYnV0ZTogVEhSRUUuQnVmZmVyQXR0cmlidXRlIHwgVEhSRUUuSW50ZXJsZWF2ZWRCdWZmZXJBdHRyaWJ1dGUsXG4gIG9sZEJvbmVzOiBUSFJFRS5Cb25lW10sXG4gIG5ld0JvbmVzOiBUSFJFRS5Cb25lW10sXG4pOiB2b2lkIHtcbiAgLy8gYSBtYXAgZnJvbSBib25lIHRvIG9sZCBpbmRleFxuICBjb25zdCBib25lT2xkSW5kZXhNYXAgPSBuZXcgTWFwPFRIUkVFLkJvbmUsIG51bWJlcj4oKTtcbiAgZm9yIChjb25zdCBib25lIG9mIG9sZEJvbmVzKSB7XG4gICAgYm9uZU9sZEluZGV4TWFwLnNldChib25lLCBib25lT2xkSW5kZXhNYXAuc2l6ZSk7XG4gIH1cblxuICAvLyBhIG1hcCBmcm9tIG9sZCBza2luIGluZGV4IHRvIG5ldyBza2luIGluZGV4XG4gIGNvbnN0IG9sZFRvTmV3ID0gbmV3IE1hcDxudW1iZXIsIG51bWJlcj4oKTtcbiAgZm9yIChjb25zdCBbaSwgYm9uZV0gb2YgbmV3Qm9uZXMuZW50cmllcygpKSB7XG4gICAgY29uc3Qgb2xkSW5kZXggPSBib25lT2xkSW5kZXhNYXAuZ2V0KGJvbmUpITtcbiAgICBvbGRUb05ldy5zZXQob2xkSW5kZXgsIGkpO1xuICB9XG5cbiAgLy8gcmVwbGFjZSB0aGUgc2tpbiBpbmRleCBhdHRyaWJ1dGUgd2l0aCBuZXcgaW5kaWNlc1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGF0dHJpYnV0ZS5jb3VudDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBhdHRyaWJ1dGUuaXRlbVNpemU7IGorKykge1xuICAgICAgY29uc3Qgb2xkSW5kZXggPSBhdHRyaWJ1dGVHZXRDb21wb25lbnRDb21wYXQoYXR0cmlidXRlLCBpLCBqKTtcbiAgICAgIGNvbnN0IG5ld0luZGV4ID0gb2xkVG9OZXcuZ2V0KG9sZEluZGV4KSE7XG4gICAgICBhdHRyaWJ1dGVTZXRDb21wb25lbnRDb21wYXQoYXR0cmlidXRlLCBpLCBqLCBuZXdJbmRleCk7XG4gICAgfVxuICB9XG5cbiAgYXR0cmlidXRlLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbn1cblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9ibG9iL3IxNzAvdGVzdC91bml0L3NyYy9tYXRoL01hdHJpeDQudGVzdHMuanMjTDEyXG5mdW5jdGlvbiBtYXRyaXhFcXVhbHMoYTogVEhSRUUuTWF0cml4NCwgYjogVEhSRUUuTWF0cml4NCwgdG9sZXJhbmNlPzogbnVtYmVyKSB7XG4gIHRvbGVyYW5jZSA9IHRvbGVyYW5jZSB8fCAwLjAwMDE7XG4gIGlmIChhLmVsZW1lbnRzLmxlbmd0aCAhPSBiLmVsZW1lbnRzLmxlbmd0aCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwLCBpbCA9IGEuZWxlbWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgIGNvbnN0IGRlbHRhID0gTWF0aC5hYnMoYS5lbGVtZW50c1tpXSAtIGIuZWxlbWVudHNbaV0pO1xuICAgIGlmIChkZWx0YSA+IHRvbGVyYW5jZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5jbGFzcyBPYmplY3RJbmRleERpc3BhdGNoZXI8VD4ge1xuICBwcml2YXRlIF9vYmplY3RJbmRleE1hcCA9IG5ldyBNYXA8VCwgbnVtYmVyPigpO1xuICBwcml2YXRlIF9pbmRleCA9IDA7XG5cbiAgcHVibGljIGdldChvYmo6IFQpOiBudW1iZXIgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9vYmplY3RJbmRleE1hcC5nZXQob2JqKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRPckNyZWF0ZShvYmo6IFQpOiBudW1iZXIge1xuICAgIGxldCBpbmRleCA9IHRoaXMuX29iamVjdEluZGV4TWFwLmdldChvYmopO1xuICAgIGlmIChpbmRleCA9PSBudWxsKSB7XG4gICAgICBpbmRleCA9IHRoaXMuX2luZGV4O1xuICAgICAgdGhpcy5fb2JqZWN0SW5kZXhNYXAuc2V0KG9iaiwgaW5kZXgpO1xuICAgICAgdGhpcy5faW5kZXgrKztcbiAgICB9XG5cbiAgICByZXR1cm4gaW5kZXg7XG4gIH1cbn1cblxuLyoqXG4gKiBTaGFsbG93IGNsb25lIGEgYnVmZmVyIGdlb21ldHJ5LlxuICogYEJ1ZmZlckdlb21ldHJ5I2Nsb25lYCBkb2VzIGEgZGVlcCBjbG9uZSB0aGF0IGFsc28gY29waWVzIHRoZSBhdHRyaWJ1dGVzLlxuICogV2Ugd2FudCB0byBzaGFsbG93IGNsb25lIHRoZSBnZW9tZXRyeSB0byBhdm9pZCBjb3B5aW5nIHRoZSBhdHRyaWJ1dGVzLlxuICpcbiAqIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9ibG9iL3IxNzUvc3JjL2NvcmUvQnVmZmVyR2VvbWV0cnkuanMjTDEzMzBcbiAqL1xuZnVuY3Rpb24gc2hhbGxvd0Nsb25lQnVmZmVyR2VvbWV0cnkoZ2VvbWV0cnk6IFRIUkVFLkJ1ZmZlckdlb21ldHJ5KTogVEhSRUUuQnVmZmVyR2VvbWV0cnkge1xuICBjb25zdCBjbG9uZSA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeSgpO1xuXG4gIGNsb25lLm5hbWUgPSBnZW9tZXRyeS5uYW1lO1xuXG4gIGNsb25lLnNldEluZGV4KGdlb21ldHJ5LmluZGV4KTtcblxuICBmb3IgKGNvbnN0IFtuYW1lLCBhdHRyaWJ1dGVdIG9mIE9iamVjdC5lbnRyaWVzKGdlb21ldHJ5LmF0dHJpYnV0ZXMpKSB7XG4gICAgY2xvbmUuc2V0QXR0cmlidXRlKG5hbWUsIGF0dHJpYnV0ZSk7XG4gIH1cblxuICBmb3IgKGNvbnN0IFtrZXksIG1vcnBoQXR0cmlidXRlc10gb2YgT2JqZWN0LmVudHJpZXMoZ2VvbWV0cnkubW9ycGhBdHRyaWJ1dGVzKSkge1xuICAgIGNvbnN0IGF0dHJpYnV0ZU5hbWUgPSBrZXkgYXMga2V5b2YgdHlwZW9mIGdlb21ldHJ5Lm1vcnBoQXR0cmlidXRlcztcbiAgICBjbG9uZS5tb3JwaEF0dHJpYnV0ZXNbYXR0cmlidXRlTmFtZV0gPSBtb3JwaEF0dHJpYnV0ZXMuY29uY2F0KCk7XG4gIH1cbiAgY2xvbmUubW9ycGhUYXJnZXRzUmVsYXRpdmUgPSBnZW9tZXRyeS5tb3JwaFRhcmdldHNSZWxhdGl2ZTtcblxuICBjbG9uZS5ncm91cHMgPSBbXTtcbiAgZm9yIChjb25zdCBncm91cCBvZiBnZW9tZXRyeS5ncm91cHMpIHtcbiAgICBjbG9uZS5hZGRHcm91cChncm91cC5zdGFydCwgZ3JvdXAuY291bnQsIGdyb3VwLm1hdGVyaWFsSW5kZXgpO1xuICB9XG5cbiAgY2xvbmUuYm91bmRpbmdTcGhlcmUgPSBnZW9tZXRyeS5ib3VuZGluZ1NwaGVyZT8uY2xvbmUoKSA/PyBudWxsO1xuICBjbG9uZS5ib3VuZGluZ0JveCA9IGdlb21ldHJ5LmJvdW5kaW5nQm94Py5jbG9uZSgpID8/IG51bGw7XG5cbiAgY2xvbmUuZHJhd1JhbmdlLnN0YXJ0ID0gZ2VvbWV0cnkuZHJhd1JhbmdlLnN0YXJ0O1xuICBjbG9uZS5kcmF3UmFuZ2UuY291bnQgPSBnZW9tZXRyeS5kcmF3UmFuZ2UuY291bnQ7XG5cbiAgY2xvbmUudXNlckRhdGEgPSBnZW9tZXRyeS51c2VyRGF0YTtcblxuICByZXR1cm4gY2xvbmU7XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG4vLyBDT01QQVQ6IHByZS1yMTU1XG4vKipcbiAqIEEgY29tcGF0IGZ1bmN0aW9uIGZvciBgQnVmZmVyQXR0cmlidXRlLmdldENvbXBvbmVudCgpYC5cbiAqIGBCdWZmZXJBdHRyaWJ1dGUuZ2V0Q29tcG9uZW50KClgIGlzIGludHJvZHVjZWQgaW4gcjE1NS5cbiAqXG4gKiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvcHVsbC8yNDUxNVxuICovXG5leHBvcnQgZnVuY3Rpb24gYXR0cmlidXRlR2V0Q29tcG9uZW50Q29tcGF0KFxuICBhdHRyaWJ1dGU6IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZSB8IFRIUkVFLkludGVybGVhdmVkQnVmZmVyQXR0cmlidXRlLFxuICBpbmRleDogbnVtYmVyLFxuICBjb21wb25lbnQ6IG51bWJlcixcbik6IG51bWJlciB7XG4gIGlmICgoYXR0cmlidXRlIGFzIGFueSkuZ2V0Q29tcG9uZW50KSB7XG4gICAgcmV0dXJuIChhdHRyaWJ1dGUgYXMgYW55KS5nZXRDb21wb25lbnQoaW5kZXgsIGNvbXBvbmVudCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gUmVmOiBodHRwczovL2dpdGh1Yi5jb20vbXJkb29iL3RocmVlLmpzL3B1bGwvMjQ1MTUvZmlsZXMjZGlmZi1mZDliZDk4MjAyNDJhZDk4ZjcxYjcyNTM1ODM0ZTAyYTQ1MDBlNDc4OGFkNjJlNjE4YTE3MjUzNGI2OWFmMDEzXG4gICAgbGV0IHZhbHVlID0gYXR0cmlidXRlLmFycmF5W2luZGV4ICogYXR0cmlidXRlLml0ZW1TaXplICsgY29tcG9uZW50XTtcbiAgICBpZiAoYXR0cmlidXRlLm5vcm1hbGl6ZWQpIHtcbiAgICAgIHZhbHVlID0gVEhSRUUuTWF0aFV0aWxzLmRlbm9ybWFsaXplKHZhbHVlLCBhdHRyaWJ1dGUuYXJyYXkgYXMgYW55KTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG4vLyBDT01QQVQ6IHByZS1yMTU1XG4vKipcbiAqIEEgY29tcGF0IGZ1bmN0aW9uIGZvciBgQnVmZmVyQXR0cmlidXRlLnNldENvbXBvbmVudCgpYC5cbiAqIGBCdWZmZXJBdHRyaWJ1dGUuc2V0Q29tcG9uZW50KClgIGlzIGludHJvZHVjZWQgaW4gcjE1NS5cbiAqXG4gKiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvcHVsbC8yNDUxNVxuICovXG5leHBvcnQgZnVuY3Rpb24gYXR0cmlidXRlU2V0Q29tcG9uZW50Q29tcGF0KFxuICBhdHRyaWJ1dGU6IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZSB8IFRIUkVFLkludGVybGVhdmVkQnVmZmVyQXR0cmlidXRlLFxuICBpbmRleDogbnVtYmVyLFxuICBjb21wb25lbnQ6IG51bWJlcixcbiAgdmFsdWU6IG51bWJlcixcbik6IHZvaWQge1xuICBpZiAoKGF0dHJpYnV0ZSBhcyBhbnkpLnNldENvbXBvbmVudCkge1xuICAgIChhdHRyaWJ1dGUgYXMgYW55KS5zZXRDb21wb25lbnQoaW5kZXgsIGNvbXBvbmVudCwgdmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIC8vIFJlZjogaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9wdWxsLzI0NTE1L2ZpbGVzI2RpZmYtZmQ5YmQ5ODIwMjQyYWQ5OGY3MWI3MjUzNTgzNGUwMmE0NTAwZTQ3ODhhZDYyZTYxOGExNzI1MzRiNjlhZjAxM1xuICAgIGlmIChhdHRyaWJ1dGUubm9ybWFsaXplZCkge1xuICAgICAgdmFsdWUgPSBUSFJFRS5NYXRoVXRpbHMubm9ybWFsaXplKHZhbHVlLCBhdHRyaWJ1dGUuYXJyYXkgYXMgYW55KTtcbiAgICB9XG4gICAgYXR0cmlidXRlLmFycmF5W2luZGV4ICogYXR0cmlidXRlLml0ZW1TaXplICsgY29tcG9uZW50XSA9IHZhbHVlO1xuICB9XG59XG4iLCAiLy8gU2VlOiBodHRwczovL3RocmVlanMub3JnL2RvY3MvI21hbnVhbC9lbi9pbnRyb2R1Y3Rpb24vSG93LXRvLWRpc3Bvc2Utb2Ytb2JqZWN0c1xuXG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbmZ1bmN0aW9uIGRpc3Bvc2VNYXRlcmlhbChtYXRlcmlhbDogVEhSRUUuTWF0ZXJpYWwpOiB2b2lkIHtcbiAgT2JqZWN0LnZhbHVlcyhtYXRlcmlhbCkuZm9yRWFjaCgodmFsdWUpID0+IHtcbiAgICBpZiAodmFsdWU/LmlzVGV4dHVyZSkge1xuICAgICAgY29uc3QgdGV4dHVyZSA9IHZhbHVlIGFzIFRIUkVFLlRleHR1cmU7XG4gICAgICB0ZXh0dXJlLmRpc3Bvc2UoKTtcbiAgICB9XG4gIH0pO1xuXG4gIGlmICgobWF0ZXJpYWwgYXMgYW55KS5pc1NoYWRlck1hdGVyaWFsKSB7XG4gICAgY29uc3QgdW5pZm9ybXM6IHsgW3VuaWZvcm06IHN0cmluZ106IFRIUkVFLklVbmlmb3JtPGFueT4gfSA9IChtYXRlcmlhbCBhcyBhbnkpLnVuaWZvcm1zO1xuICAgIGlmICh1bmlmb3Jtcykge1xuICAgICAgT2JqZWN0LnZhbHVlcyh1bmlmb3JtcykuZm9yRWFjaCgodW5pZm9ybSkgPT4ge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHVuaWZvcm0udmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZT8uaXNUZXh0dXJlKSB7XG4gICAgICAgICAgY29uc3QgdGV4dHVyZSA9IHZhbHVlIGFzIFRIUkVFLlRleHR1cmU7XG4gICAgICAgICAgdGV4dHVyZS5kaXNwb3NlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG1hdGVyaWFsLmRpc3Bvc2UoKTtcbn1cblxuZnVuY3Rpb24gZGlzcG9zZShvYmplY3QzRDogVEhSRUUuT2JqZWN0M0QpOiB2b2lkIHtcbiAgY29uc3QgZ2VvbWV0cnk6IFRIUkVFLkJ1ZmZlckdlb21ldHJ5IHwgdW5kZWZpbmVkID0gKG9iamVjdDNEIGFzIGFueSkuZ2VvbWV0cnk7XG4gIGlmIChnZW9tZXRyeSkge1xuICAgIGdlb21ldHJ5LmRpc3Bvc2UoKTtcbiAgfVxuXG4gIGNvbnN0IHNrZWxldG9uOiBUSFJFRS5Ta2VsZXRvbiB8IHVuZGVmaW5lZCA9IChvYmplY3QzRCBhcyBhbnkpLnNrZWxldG9uO1xuICBpZiAoc2tlbGV0b24pIHtcbiAgICBza2VsZXRvbi5kaXNwb3NlKCk7XG4gIH1cblxuICBjb25zdCBtYXRlcmlhbDogVEhSRUUuTWF0ZXJpYWwgfCBUSFJFRS5NYXRlcmlhbFtdIHwgdW5kZWZpbmVkID0gKG9iamVjdDNEIGFzIGFueSkubWF0ZXJpYWw7XG4gIGlmIChtYXRlcmlhbCkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KG1hdGVyaWFsKSkge1xuICAgICAgbWF0ZXJpYWwuZm9yRWFjaCgobWF0ZXJpYWw6IFRIUkVFLk1hdGVyaWFsKSA9PiBkaXNwb3NlTWF0ZXJpYWwobWF0ZXJpYWwpKTtcbiAgICB9IGVsc2UgaWYgKG1hdGVyaWFsKSB7XG4gICAgICBkaXNwb3NlTWF0ZXJpYWwobWF0ZXJpYWwpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVlcERpc3Bvc2Uob2JqZWN0M0Q6IFRIUkVFLk9iamVjdDNEKTogdm9pZCB7XG4gIG9iamVjdDNELnRyYXZlcnNlKGRpc3Bvc2UpO1xufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IGF0dHJpYnV0ZUdldENvbXBvbmVudENvbXBhdCB9IGZyb20gJy4uL3V0aWxzL2F0dHJpYnV0ZUdldENvbXBvbmVudENvbXBhdCc7XG5pbXBvcnQgeyBhdHRyaWJ1dGVTZXRDb21wb25lbnRDb21wYXQgfSBmcm9tICcuLi91dGlscy9hdHRyaWJ1dGVTZXRDb21wb25lbnRDb21wYXQnO1xuXG4vKipcbiAqIFRyYXZlcnNlIHRoZSBnaXZlbiBvYmplY3QgYW5kIHJlbW92ZSB1bm5lY2Vzc2FyaWx5IGJvdW5kIGpvaW50cyBmcm9tIGV2ZXJ5IGBUSFJFRS5Ta2lubmVkTWVzaGAuXG4gKlxuICogU29tZSBlbnZpcm9ubWVudHMgbGlrZSBtb2JpbGUgZGV2aWNlcyBoYXZlIGEgbG93ZXIgbGltaXQgb2YgYm9uZXNcbiAqIGFuZCBtaWdodCBiZSB1bmFibGUgdG8gcGVyZm9ybSBtZXNoIHNraW5uaW5nIHdpdGggbWFueSBib25lcy5cbiAqIFRoaXMgZnVuY3Rpb24gbWlnaHQgcmVzb2x2ZSBzdWNoIGFuIGlzc3VlLlxuICpcbiAqIEFsc28sIHRoaXMgZnVuY3Rpb24gbWlnaHQgc2lnbmlmaWNhbnRseSBpbXByb3ZlIHRoZSBwZXJmb3JtYW5jZSBvZiBtZXNoIHNraW5uaW5nLlxuICpcbiAqIEBwYXJhbSByb290IFJvb3Qgb2JqZWN0IHRoYXQgd2lsbCBiZSB0cmF2ZXJzZWRcbiAqXG4gKiBAZGVwcmVjYXRlZCBgcmVtb3ZlVW5uZWNlc3NhcnlKb2ludHNgIGlzIGRlcHJlY2F0ZWQuIFVzZSBgY29tYmluZVNrZWxldG9uc2AgaW5zdGVhZC4gYGNvbWJpbmVTa2VsZXRvbnNgIGNvbnRyaWJ1dGVzIG1vcmUgdG8gdGhlIHBlcmZvcm1hbmNlIGltcHJvdmVtZW50LiBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgbmV4dCBtYWpvciB2ZXJzaW9uLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlVW5uZWNlc3NhcnlKb2ludHMoXG4gIHJvb3Q6IFRIUkVFLk9iamVjdDNELFxuICBvcHRpb25zPzoge1xuICAgIC8qKlxuICAgICAqIElmIGB0cnVlYCwgdGhpcyBmdW5jdGlvbiB3aWxsIGNvbXBlbnNhdGUgc2tlbGV0b25zIHdpdGggZHVtbXkgYm9uZXMgdG8ga2VlcCB0aGUgYm9uZSBjb3VudCBzYW1lIGJldHdlZW4gc2tlbGV0b25zLlxuICAgICAqXG4gICAgICogVGhpcyBvcHRpb24gbWlnaHQgYmUgZWZmZWN0aXZlIGZvciB0aGUgc2hhZGVyIGNvbXBpbGF0aW9uIHBlcmZvcm1hbmNlIHRoYXQgbWF0dGVycyB0byB0aGUgaW5pdGlhbCByZW5kZXJpbmcgdGltZSBpbiBXZWJHUFVSZW5kZXJlcixcbiAgICAgKiBlc3BlY2lhbGx5IHdoZW4gdGhlIG1vZGVsIGxvYWRlZCBoYXMgbWFueSBtYXRlcmlhbHMgYW5kIHRoZSBkZXBlbmRlbnQgYm9uZSBjb3VudCBpcyBkaWZmZXJlbnQgYmV0d2VlbiB0aGVtLlxuICAgICAqXG4gICAgICogQ29uc2lkZXIgdGhpcyBwYXJhbWV0ZXIgYXMgZXhwZXJpbWVudGFsLiBXZSBtaWdodCBtb2RpZnkgb3IgZGVsZXRlIHRoaXMgQVBJIHdpdGhvdXQgbm90aWNlIGluIHRoZSBmdXR1cmUuXG4gICAgICpcbiAgICAgKiBgZmFsc2VgIGJ5IGRlZmF1bHQuXG4gICAgICovXG4gICAgZXhwZXJpbWVudGFsU2FtZUJvbmVDb3VudHM/OiBib29sZWFuO1xuICB9LFxuKTogdm9pZCB7XG4gIGNvbnNvbGUud2FybihcbiAgICAnVlJNVXRpbHMucmVtb3ZlVW5uZWNlc3NhcnlKb2ludHM6IHJlbW92ZVVubmVjZXNzYXJ5Sm9pbnRzIGlzIGRlcHJlY2F0ZWQuIFVzZSBjb21iaW5lU2tlbGV0b25zIGluc3RlYWQuIGNvbWJpbmVTa2VsZXRvbnMgY29udHJpYnV0ZXMgbW9yZSB0byB0aGUgcGVyZm9ybWFuY2UgaW1wcm92ZW1lbnQuIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSByZW1vdmVkIGluIHRoZSBuZXh0IG1ham9yIHZlcnNpb24uJyxcbiAgKTtcblxuICBjb25zdCBleHBlcmltZW50YWxTYW1lQm9uZUNvdW50cyA9IG9wdGlvbnM/LmV4cGVyaW1lbnRhbFNhbWVCb25lQ291bnRzID8/IGZhbHNlO1xuXG4gIC8vIFRyYXZlcnNlIGFuIGVudGlyZSB0cmVlLCBhbmQgY29sbGVjdCBhbGwgc2tpbm5lZCBtZXNoZXNcbiAgY29uc3Qgc2tpbm5lZE1lc2hlczogVEhSRUUuU2tpbm5lZE1lc2hbXSA9IFtdO1xuXG4gIHJvb3QudHJhdmVyc2UoKG9iaikgPT4ge1xuICAgIGlmIChvYmoudHlwZSAhPT0gJ1NraW5uZWRNZXNoJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNraW5uZWRNZXNoZXMucHVzaChvYmogYXMgVEhSRUUuU2tpbm5lZE1lc2gpO1xuICB9KTtcblxuICAvLyBBIG1hcCBmcm9tIG1lc2hlcyB0byBuZXctdG8tb2xkIGJvbmUgaW5kZXggbWFwXG4gIC8vIHNvbWUgbWVzaGVzIG1pZ2h0IHNoYXJlIGEgc2FtZSBza2luSW5kZXggYXR0cmlidXRlLCBhbmQgdGhpcyBtYXAgYWxzbyBwcmV2ZW50cyB0byBjb252ZXJ0IHRoZSBhdHRyaWJ1dGUgdHdpY2VcbiAgY29uc3QgYXR0cmlidXRlVG9Cb25lSW5kZXhNYXBNYXA6IE1hcDxcbiAgICBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUgfCBUSFJFRS5JbnRlcmxlYXZlZEJ1ZmZlckF0dHJpYnV0ZSxcbiAgICBNYXA8bnVtYmVyLCBudW1iZXI+XG4gID4gPSBuZXcgTWFwKCk7XG5cbiAgLy8gQSBtYXhpbXVtIG51bWJlciBvZiBib25lc1xuICBsZXQgbWF4Qm9uZXMgPSAwO1xuXG4gIC8vIEl0ZXJhdGUgb3ZlciBhbGwgc2tpbm5lZCBtZXNoZXMgYW5kIHJlbWFwIGJvbmVzIGZvciBlYWNoIHNraW4gaW5kZXggYXR0cmlidXRlXG4gIGZvciAoY29uc3QgbWVzaCBvZiBza2lubmVkTWVzaGVzKSB7XG4gICAgY29uc3QgZ2VvbWV0cnkgPSBtZXNoLmdlb21ldHJ5O1xuICAgIGNvbnN0IGF0dHJpYnV0ZSA9IGdlb21ldHJ5LmdldEF0dHJpYnV0ZSgnc2tpbkluZGV4Jyk7XG5cbiAgICBpZiAoYXR0cmlidXRlVG9Cb25lSW5kZXhNYXBNYXAuaGFzKGF0dHJpYnV0ZSkpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGNvbnN0IG9sZFRvTmV3ID0gbmV3IE1hcDxudW1iZXIsIG51bWJlcj4oKTsgLy8gbWFwIG9mIG9sZCBib25lIGluZGV4IHZzLiBuZXcgYm9uZSBpbmRleFxuICAgIGNvbnN0IG5ld1RvT2xkID0gbmV3IE1hcDxudW1iZXIsIG51bWJlcj4oKTsgLy8gbWFwIG9mIG5ldyBib25lIGluZGV4IHZzLiBvbGQgYm9uZSBpbmRleFxuXG4gICAgLy8gY3JlYXRlIGEgbmV3IGJvbmUgbWFwXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhdHRyaWJ1dGUuY291bnQ7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBhdHRyaWJ1dGUuaXRlbVNpemU7IGorKykge1xuICAgICAgICBjb25zdCBvbGRJbmRleCA9IGF0dHJpYnV0ZUdldENvbXBvbmVudENvbXBhdChhdHRyaWJ1dGUsIGksIGopO1xuICAgICAgICBsZXQgbmV3SW5kZXggPSBvbGRUb05ldy5nZXQob2xkSW5kZXgpO1xuXG4gICAgICAgIC8vIG5ldyBza2luSW5kZXggYnVmZmVyXG4gICAgICAgIGlmIChuZXdJbmRleCA9PSBudWxsKSB7XG4gICAgICAgICAgbmV3SW5kZXggPSBvbGRUb05ldy5zaXplO1xuICAgICAgICAgIG9sZFRvTmV3LnNldChvbGRJbmRleCwgbmV3SW5kZXgpO1xuICAgICAgICAgIG5ld1RvT2xkLnNldChuZXdJbmRleCwgb2xkSW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXR0cmlidXRlU2V0Q29tcG9uZW50Q29tcGF0KGF0dHJpYnV0ZSwgaSwgaiwgbmV3SW5kZXgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHJlcGxhY2Ugd2l0aCBuZXcgaW5kaWNlc1xuICAgIGF0dHJpYnV0ZS5uZWVkc1VwZGF0ZSA9IHRydWU7XG5cbiAgICAvLyB1cGRhdGUgYm9uZUxpc3RcbiAgICBhdHRyaWJ1dGVUb0JvbmVJbmRleE1hcE1hcC5zZXQoYXR0cmlidXRlLCBuZXdUb09sZCk7XG5cbiAgICAvLyB1cGRhdGUgbWF4IGJvbmVzIGNvdW50XG4gICAgbWF4Qm9uZXMgPSBNYXRoLm1heChtYXhCb25lcywgb2xkVG9OZXcuc2l6ZSk7XG4gIH1cblxuICAvLyBMZXQncyBhY3R1YWxseSBzZXQgdGhlIHNrZWxldG9uc1xuICBmb3IgKGNvbnN0IG1lc2ggb2Ygc2tpbm5lZE1lc2hlcykge1xuICAgIGNvbnN0IGdlb21ldHJ5ID0gbWVzaC5nZW9tZXRyeTtcbiAgICBjb25zdCBhdHRyaWJ1dGUgPSBnZW9tZXRyeS5nZXRBdHRyaWJ1dGUoJ3NraW5JbmRleCcpO1xuICAgIGNvbnN0IG5ld1RvT2xkID0gYXR0cmlidXRlVG9Cb25lSW5kZXhNYXBNYXAuZ2V0KGF0dHJpYnV0ZSkhO1xuXG4gICAgY29uc3QgYm9uZXM6IFRIUkVFLkJvbmVbXSA9IFtdO1xuICAgIGNvbnN0IGJvbmVJbnZlcnNlczogVEhSRUUuTWF0cml4NFtdID0gW107XG5cbiAgICAvLyBpZiBgZXhwZXJpbWVudGFsU2FtZUJvbmVDb3VudHNgIGlzIGB0cnVlYCwgY29tcGVuc2F0ZSBza2VsZXRvbnMgd2l0aCBkdW1teSBib25lcyB0byBrZWVwIHRoZSBib25lIGNvdW50IHNhbWUgYmV0d2VlbiBza2VsZXRvbnNcbiAgICBjb25zdCBuQm9uZXMgPSBleHBlcmltZW50YWxTYW1lQm9uZUNvdW50cyA/IG1heEJvbmVzIDogbmV3VG9PbGQuc2l6ZTtcblxuICAgIGZvciAobGV0IG5ld0luZGV4ID0gMDsgbmV3SW5kZXggPCBuQm9uZXM7IG5ld0luZGV4KyspIHtcbiAgICAgIGNvbnN0IG9sZEluZGV4ID0gbmV3VG9PbGQuZ2V0KG5ld0luZGV4KSA/PyAwO1xuXG4gICAgICBib25lcy5wdXNoKG1lc2guc2tlbGV0b24uYm9uZXNbb2xkSW5kZXhdKTtcbiAgICAgIGJvbmVJbnZlcnNlcy5wdXNoKG1lc2guc2tlbGV0b24uYm9uZUludmVyc2VzW29sZEluZGV4XSk7XG4gICAgfVxuXG4gICAgY29uc3Qgc2tlbGV0b24gPSBuZXcgVEhSRUUuU2tlbGV0b24oYm9uZXMsIGJvbmVJbnZlcnNlcyk7XG4gICAgbWVzaC5iaW5kKHNrZWxldG9uLCBuZXcgVEhSRUUuTWF0cml4NCgpKTtcbiAgICAvLyAgICAgICAgICAgICAgICAgIF5eXl5eXl5eXl5eXl5eXl5eXl4gdHJhbnNmb3JtIG9mIG1lc2hlcyBzaG91bGQgYmUgaWdub3JlZFxuICAgIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL0tocm9ub3NHcm91cC9nbFRGL3RyZWUvbWFzdGVyL3NwZWNpZmljYXRpb24vMi4wI3NraW5zXG4gIH1cbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBCdWZmZXJBdHRyaWJ1dGUgfSBmcm9tICd0aHJlZSc7XG5cbi8qKlxuICogQ2hlY2tzIHdoaWNoIHZlcnRpY2VzIGFyZSB1c2VkIGJ5IHRoZSBpbmRleCBhdHRyaWJ1dGUuXG4gKiBAcGFyYW0gYXR0cmlidXRlcyBHZW9tZXRyeSBhdHRyaWJ1dGVzXG4gKiBAcGFyYW0gb3JpZ2luYWxJbmRleCBPcmlnaW5hbCBpbmRleCBhdHRyaWJ1dGVcbiAqIEByZXR1cm5zIFZlcnRleCB1c2FnZSBtYXAgYW5kIGNvdW50c1xuICovXG5mdW5jdGlvbiBjaGVja0lzVmVydGV4VXNlZChcbiAgYXR0cmlidXRlczogVEhSRUUuQnVmZmVyR2VvbWV0cnlbJ2F0dHJpYnV0ZXMnXSxcbiAgb3JpZ2luYWxJbmRleDogVEhSRUUuQnVmZmVyQXR0cmlidXRlLFxuKToge1xuICBpc1ZlcnRleFVzZWQ6IGJvb2xlYW5bXTtcbiAgdmVydGV4Q291bnQ6IG51bWJlcjtcbiAgdmVydGljZXNVc2VkOiBudW1iZXI7XG59IHtcbiAgLy8gZGV0ZXJtaW5lIHdoaWNoIHZlcnRpY2VzIGFyZSB1c2VkIGluIHRoZSBnZW9tZXRyeVxuICBjb25zdCB2ZXJ0ZXhDb3VudCA9IGF0dHJpYnV0ZXMucG9zaXRpb24uY291bnQ7XG4gIGNvbnN0IGlzVmVydGV4VXNlZCA9IG5ldyBBcnJheSh2ZXJ0ZXhDb3VudCkgYXMgYm9vbGVhbltdO1xuICBsZXQgdmVydGljZXNVc2VkID0gMDtcblxuICBjb25zdCBvcmlnaW5hbEluZGV4QXJyYXkgPSBvcmlnaW5hbEluZGV4LmFycmF5O1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG9yaWdpbmFsSW5kZXhBcnJheS5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGluZGV4ID0gb3JpZ2luYWxJbmRleEFycmF5W2ldO1xuICAgIGlmICghaXNWZXJ0ZXhVc2VkW2luZGV4XSkge1xuICAgICAgaXNWZXJ0ZXhVc2VkW2luZGV4XSA9IHRydWU7XG4gICAgICB2ZXJ0aWNlc1VzZWQrKztcbiAgICB9XG4gIH1cblxuICByZXR1cm4geyBpc1ZlcnRleFVzZWQsIHZlcnRleENvdW50LCB2ZXJ0aWNlc1VzZWQgfTtcbn1cblxuLyoqXG4gKiBCdWlsZHMgaW5kZXggbWFwcyBmcm9tIHRoZSB2ZXJ0ZXggdXNhZ2UgbWFwLlxuICogQHBhcmFtIGlzVmVydGV4VXNlZCBWZXJ0ZXggdXNhZ2UgbWFwXG4gKiBAcmV0dXJucyBJbmRleCBtYXBzXG4gKi9cbmZ1bmN0aW9uIGJ1aWxkSW5kZXhNYXBzRnJvbUlzVmVydGV4VXNlZChpc1ZlcnRleFVzZWQ6IGJvb2xlYW5bXSk6IHtcbiAgb3JpZ2luYWxJbmRleE5ld0luZGV4TWFwOiBudW1iZXJbXTtcbiAgbmV3SW5kZXhPcmlnaW5hbEluZGV4TWFwOiBudW1iZXJbXTtcbn0ge1xuICAvKiogZnJvbSBvcmlnaW5hbCBpbmRleCB0byBuZXcgaW5kZXggKi9cbiAgY29uc3Qgb3JpZ2luYWxJbmRleE5ld0luZGV4TWFwOiBudW1iZXJbXSA9IFtdO1xuXG4gIC8qKiBmcm9tIG5ldyBpbmRleCB0byBvcmlnaW5hbCBpbmRleCAqL1xuICBjb25zdCBuZXdJbmRleE9yaWdpbmFsSW5kZXhNYXA6IG51bWJlcltdID0gW107XG5cbiAgLy8gYXNzaWduIG5ldyBpbmRpY2VzXG4gIGxldCBpbmRleEhlYWQgPSAwO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGlzVmVydGV4VXNlZC5sZW5ndGg7IGkrKykge1xuICAgIGlmIChpc1ZlcnRleFVzZWRbaV0pIHtcbiAgICAgIGNvbnN0IG5ld0luZGV4ID0gaW5kZXhIZWFkKys7XG4gICAgICBvcmlnaW5hbEluZGV4TmV3SW5kZXhNYXBbaV0gPSBuZXdJbmRleDtcbiAgICAgIG5ld0luZGV4T3JpZ2luYWxJbmRleE1hcFtuZXdJbmRleF0gPSBpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7IG9yaWdpbmFsSW5kZXhOZXdJbmRleE1hcCwgbmV3SW5kZXhPcmlnaW5hbEluZGV4TWFwIH07XG59XG5cbi8qKlxuICogQ29waWVzIGdlb21ldHJ5IHByb3BlcnRpZXMgdGhhdCBhcmUgbm90IHBhcnQgb2YgYXR0cmlidXRlcyBvciBpbmRpY2VzLlxuICogQHBhcmFtIHNvdXJjZSBTb3VyY2UgZ2VvbWV0cnlcbiAqIEBwYXJhbSB0YXJnZXQgVGFyZ2V0IGdlb21ldHJ5XG4gKi9cbmZ1bmN0aW9uIGNvcHlHZW9tZXRyeVByb3BlcnRpZXMoc291cmNlOiBUSFJFRS5CdWZmZXJHZW9tZXRyeSwgdGFyZ2V0OiBUSFJFRS5CdWZmZXJHZW9tZXRyeSk6IHZvaWQge1xuICAvLyBSZWY6IGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvYmxvYi8xYTI0MWVmMTAwNDg3NzBkNTZlMDZkNmNkNmE2NGM3NmNjNzIwZjk1L3NyYy9jb3JlL0J1ZmZlckdlb21ldHJ5LmpzI0wxMDExXG4gIHRhcmdldC5uYW1lID0gc291cmNlLm5hbWU7XG5cbiAgdGFyZ2V0Lm1vcnBoVGFyZ2V0c1JlbGF0aXZlID0gc291cmNlLm1vcnBoVGFyZ2V0c1JlbGF0aXZlO1xuXG4gIHNvdXJjZS5ncm91cHMuZm9yRWFjaCgoZ3JvdXApID0+IHtcbiAgICB0YXJnZXQuYWRkR3JvdXAoZ3JvdXAuc3RhcnQsIGdyb3VwLmNvdW50LCBncm91cC5tYXRlcmlhbEluZGV4KTtcbiAgfSk7XG5cbiAgdGFyZ2V0LmJvdW5kaW5nQm94ID0gc291cmNlLmJvdW5kaW5nQm94Py5jbG9uZSgpID8/IG51bGw7XG4gIHRhcmdldC5ib3VuZGluZ1NwaGVyZSA9IHNvdXJjZS5ib3VuZGluZ1NwaGVyZT8uY2xvbmUoKSA/PyBudWxsO1xuXG4gIHRhcmdldC5zZXREcmF3UmFuZ2Uoc291cmNlLmRyYXdSYW5nZS5zdGFydCwgc291cmNlLmRyYXdSYW5nZS5jb3VudCk7XG5cbiAgdGFyZ2V0LnVzZXJEYXRhID0gc291cmNlLnVzZXJEYXRhO1xufVxuXG4vKipcbiAqIFJlYnVpbGRzIGluZGV4IGF0dHJpYnV0ZSBiYXNlZCBvbiB0aGUgb3JpZ2luYWwtdG8tbmV3IGluZGV4IG1hcC5cbiAqIEBwYXJhbSBuZXdHZW9tZXRyeSBOZXcgZ2VvbWV0cnlcbiAqIEBwYXJhbSBvcmlnaW5hbEluZGV4IE9yaWdpbmFsIGluZGV4IGF0dHJpYnV0ZVxuICogQHBhcmFtIG9yaWdpbmFsSW5kZXhOZXdJbmRleE1hcCBNYXAgZnJvbSBvcmlnaW5hbCBpbmRleCB0byBuZXcgaW5kZXhcbiAqL1xuZnVuY3Rpb24gcmVvcmdhbml6ZUluZGV4QXR0cmlidXRlKFxuICBuZXdHZW9tZXRyeTogVEhSRUUuQnVmZmVyR2VvbWV0cnksXG4gIG9yaWdpbmFsSW5kZXg6IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZSxcbiAgb3JpZ2luYWxJbmRleE5ld0luZGV4TWFwOiBudW1iZXJbXSxcbik6IHZvaWQge1xuICBjb25zdCBvcmlnaW5hbEluZGV4QXJyYXkgPSBvcmlnaW5hbEluZGV4LmFycmF5O1xuICBjb25zdCBuZXdJbmRleEFycmF5ID0gbmV3IChvcmlnaW5hbEluZGV4QXJyYXkuY29uc3RydWN0b3IgYXMgYW55KShvcmlnaW5hbEluZGV4QXJyYXkubGVuZ3RoKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IG9yaWdpbmFsSW5kZXhBcnJheS5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGluZGV4ID0gb3JpZ2luYWxJbmRleEFycmF5W2ldO1xuICAgIG5ld0luZGV4QXJyYXlbaV0gPSBvcmlnaW5hbEluZGV4TmV3SW5kZXhNYXBbaW5kZXhdO1xuICB9XG5cbiAgbmV3R2VvbWV0cnkuc2V0SW5kZXgobmV3IEJ1ZmZlckF0dHJpYnV0ZShuZXdJbmRleEFycmF5LCBvcmlnaW5hbEluZGV4Lml0ZW1TaXplLCBvcmlnaW5hbEluZGV4Lm5vcm1hbGl6ZWQpKTtcbn1cblxuLyoqXG4gKiBDb3BpZXMgdHlwZWQgYXJyYXkgZGF0YSBieSByZW1hcHBpbmcgaW5kaWNlcy5cbiAqIEBwYXJhbSBvcmlnaW5hbEFycmF5IFNvdXJjZSBhcnJheVxuICogQHBhcmFtIG5ld0luZGV4T3JpZ2luYWxJbmRleE1hcCBNYXAgZnJvbSBuZXcgaW5kZXggdG8gb3JpZ2luYWwgaW5kZXhcbiAqIEBwYXJhbSBzdHJpZGUgTnVtYmVyIG9mIGNvbXBvbmVudHMgcGVyIHZlcnRleCBpbiB0aGUgYXJyYXlcbiAqIEByZXR1cm5zIE5ldyBhcnJheSB3aXRoIHJlbWFwcGVkIGRhdGFcbiAqL1xuZnVuY3Rpb24gcmVtYXBBdHRyaWJ1dGVBcnJheShcbiAgb3JpZ2luYWxBcnJheTogVEhSRUUuVHlwZWRBcnJheSxcbiAgbmV3SW5kZXhPcmlnaW5hbEluZGV4TWFwOiBudW1iZXJbXSxcbiAgc3RyaWRlOiBudW1iZXIsXG4pOiBbVEhSRUUuVHlwZWRBcnJheSwgaXNBbGxaZXJvOiBib29sZWFuXSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cbiAgY29uc3QgQXJyYXlDdG9yID0gb3JpZ2luYWxBcnJheS5jb25zdHJ1Y3RvciBhcyBUSFJFRS5UeXBlZEFycmF5Q29uc3RydWN0b3I7XG4gIGNvbnN0IG5ld0FycmF5ID0gbmV3IEFycmF5Q3RvcihuZXdJbmRleE9yaWdpbmFsSW5kZXhNYXAubGVuZ3RoICogc3RyaWRlKTtcblxuICBsZXQgaXNBbGxaZXJvID0gdHJ1ZTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld0luZGV4T3JpZ2luYWxJbmRleE1hcC5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IG9yaWdpbmFsSW5kZXggPSBuZXdJbmRleE9yaWdpbmFsSW5kZXhNYXBbaV07XG4gICAgY29uc3Qgc3JjQmFzZSA9IG9yaWdpbmFsSW5kZXggKiBzdHJpZGU7XG4gICAgY29uc3QgZHN0QmFzZSA9IGkgKiBzdHJpZGU7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBzdHJpZGU7IGorKykge1xuICAgICAgY29uc3QgdiA9IG9yaWdpbmFsQXJyYXlbc3JjQmFzZSArIGpdO1xuICAgICAgbmV3QXJyYXlbZHN0QmFzZSArIGpdID0gdjtcbiAgICAgIGlzQWxsWmVybyA9IGlzQWxsWmVybyAmJiB2ID09PSAwO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBbbmV3QXJyYXksIGlzQWxsWmVyb107XG59XG5cbnR5cGUgR2VvbWV0cnlJbnRlcmxlYXZlZEVudHJ5ID0gW25hbWU6IHN0cmluZywgYXR0cmlidXRlOiBUSFJFRS5JbnRlcmxlYXZlZEJ1ZmZlckF0dHJpYnV0ZV07XG50eXBlIEdlb21ldHJ5Tm9uSW50ZXJsZWF2ZWRFbnRyeSA9IFtuYW1lOiBzdHJpbmcsIGF0dHJpYnV0ZTogVEhSRUUuQnVmZmVyQXR0cmlidXRlXTtcblxuLyoqXG4gKiBDb2xsZWN0cyBnZW9tZXRyeSBhdHRyaWJ1dGVzLlxuICogRm9yIGludGVybGVhdmVkIGF0dHJpYnV0ZXMsIGdyb3VwIHRoZW0gaWYgdGhleSBzaGFyZSB0aGUgc2FtZSBJbnRlcmxlYXZlZEJ1ZmZlci5cbiAqIEZvciBub24taW50ZXJsZWF2ZWQgYXR0cmlidXRlcywganVzdCBjb2xsZWN0IHRoZW0gYXMgaXMuXG4gKiBAcGFyYW0gYXR0cmlidXRlcyBPcmlnaW5hbCBnZW9tZXRyeSBhdHRyaWJ1dGVzXG4gKiBAcmV0dXJucyBDb2xsZWN0ZWQgZ2VvbWV0cnkgYXR0cmlidXRlIGdyb3Vwc1xuICovXG5mdW5jdGlvbiBjb2xsZWN0R2VvbWV0cnlBdHRyaWJ1dGVHcm91cHMoXG4gIGF0dHJpYnV0ZXM6IFRIUkVFLkJ1ZmZlckdlb21ldHJ5WydhdHRyaWJ1dGVzJ10sXG4pOiBbXG4gIGludGVybGVhdmVkQnVmZmVyQXR0cmlidXRlTWFwOiBNYXA8VEhSRUUuSW50ZXJsZWF2ZWRCdWZmZXIsIEdlb21ldHJ5SW50ZXJsZWF2ZWRFbnRyeVtdPixcbiAgbm9uSW50ZXJsZWF2ZWRBdHRyaWJ1dGVzOiBHZW9tZXRyeU5vbkludGVybGVhdmVkRW50cnlbXSxcbl0ge1xuICBjb25zdCBpbnRlcmxlYXZlZEJ1ZmZlckF0dHJpYnV0ZU1hcCA9IG5ldyBNYXA8VEhSRUUuSW50ZXJsZWF2ZWRCdWZmZXIsIEdlb21ldHJ5SW50ZXJsZWF2ZWRFbnRyeVtdPigpO1xuICBjb25zdCBub25JbnRlcmxlYXZlZEF0dHJpYnV0ZXM6IEdlb21ldHJ5Tm9uSW50ZXJsZWF2ZWRFbnRyeVtdID0gW107XG5cbiAgZm9yIChjb25zdCBbYXR0cmlidXRlTmFtZSwgb3JpZ2luYWxBdHRyaWJ1dGVdIG9mIE9iamVjdC5lbnRyaWVzKGF0dHJpYnV0ZXMpKSB7XG4gICAgaWYgKChvcmlnaW5hbEF0dHJpYnV0ZSBhcyBhbnkpLmlzSW50ZXJsZWF2ZWRCdWZmZXJBdHRyaWJ1dGUpIHtcbiAgICAgIGNvbnN0IGludGVybGVhdmVkQXR0cmlidXRlID0gb3JpZ2luYWxBdHRyaWJ1dGUgYXMgVEhSRUUuSW50ZXJsZWF2ZWRCdWZmZXJBdHRyaWJ1dGU7XG4gICAgICBjb25zdCBpbnRlcmxlYXZlZEJ1ZmZlciA9IGludGVybGVhdmVkQXR0cmlidXRlLmRhdGE7XG4gICAgICBjb25zdCBncm91cCA9IGludGVybGVhdmVkQnVmZmVyQXR0cmlidXRlTWFwLmdldChpbnRlcmxlYXZlZEJ1ZmZlcikgPz8gW107XG4gICAgICBpbnRlcmxlYXZlZEJ1ZmZlckF0dHJpYnV0ZU1hcC5zZXQoaW50ZXJsZWF2ZWRCdWZmZXIsIGdyb3VwKTtcbiAgICAgIGdyb3VwLnB1c2goW2F0dHJpYnV0ZU5hbWUsIGludGVybGVhdmVkQXR0cmlidXRlXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGF0dHJpYnV0ZSA9IG9yaWdpbmFsQXR0cmlidXRlIGFzIFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZTtcbiAgICAgIG5vbkludGVybGVhdmVkQXR0cmlidXRlcy5wdXNoKFthdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVdKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gW2ludGVybGVhdmVkQnVmZmVyQXR0cmlidXRlTWFwLCBub25JbnRlcmxlYXZlZEF0dHJpYnV0ZXNdO1xufVxuXG4vKipcbiAqIFJlYnVpbGRzIGFsbCBnZW9tZXRyeSBhdHRyaWJ1dGVzIGJhc2VkIG9uIHRoZSBuZXctdG8tb3JpZ2luYWwgaW5kZXggbWFwLlxuICogQHBhcmFtIG5ld0dlb21ldHJ5IE5ldyBnZW9tZXRyeVxuICogQHBhcmFtIGF0dHJpYnV0ZXMgT3JpZ2luYWwgZ2VvbWV0cnkgYXR0cmlidXRlc1xuICogQHBhcmFtIG5ld0luZGV4T3JpZ2luYWxJbmRleE1hcCBNYXAgZnJvbSBuZXcgaW5kZXggdG8gb3JpZ2luYWwgaW5kZXhcbiAqL1xuZnVuY3Rpb24gcmVvcmdhbml6ZUdlb21ldHJ5QXR0cmlidXRlcyhcbiAgbmV3R2VvbWV0cnk6IFRIUkVFLkJ1ZmZlckdlb21ldHJ5LFxuICBhdHRyaWJ1dGVzOiBUSFJFRS5CdWZmZXJHZW9tZXRyeVsnYXR0cmlidXRlcyddLFxuICBuZXdJbmRleE9yaWdpbmFsSW5kZXhNYXA6IG51bWJlcltdLFxuKTogdm9pZCB7XG4gIC8vIGNvbGxlY3QgaW50ZXJsZWF2ZWQgYW5kIG5vbi1pbnRlcmxlYXZlZCBhdHRyaWJ1dGVzXG4gIGNvbnN0IFtpbnRlcmxlYXZlZEJ1ZmZlckF0dHJpYnV0ZU1hcCwgbm9uSW50ZXJsZWF2ZWRBdHRyaWJ1dGVzXSA9IGNvbGxlY3RHZW9tZXRyeUF0dHJpYnV0ZUdyb3VwcyhhdHRyaWJ1dGVzKTtcblxuICAvLyBwcm9jZXNzIGludGVybGVhdmVkIGF0dHJpYnV0ZXNcbiAgZm9yIChjb25zdCBbaW50ZXJsZWF2ZWRCdWZmZXIsIGF0dHJpYnV0ZXNJbkdyb3VwXSBvZiBpbnRlcmxlYXZlZEJ1ZmZlckF0dHJpYnV0ZU1hcCkge1xuICAgIC8vIHJlYnVpbGQgaW50ZXJsZWF2ZWQgYnVmZmVyIGFycmF5XG4gICAgY29uc3Qgb3JpZ2luYWxJbnRlcmxlYXZlZEJ1ZmZlckFycmF5ID0gaW50ZXJsZWF2ZWRCdWZmZXIuYXJyYXk7XG4gICAgY29uc3QgeyBzdHJpZGUgfSA9IGludGVybGVhdmVkQnVmZmVyO1xuICAgIGNvbnN0IFtuZXdJbnRlcmxlYXZlZEFycmF5LCBfXSA9IHJlbWFwQXR0cmlidXRlQXJyYXkoXG4gICAgICBvcmlnaW5hbEludGVybGVhdmVkQnVmZmVyQXJyYXksXG4gICAgICBuZXdJbmRleE9yaWdpbmFsSW5kZXhNYXAsXG4gICAgICBzdHJpZGUsXG4gICAgKTtcblxuICAgIC8vIHJlYnVpbGQgaW50ZXJsZWF2ZWQgYnVmZmVyXG4gICAgY29uc3QgbmV3SW50ZXJsZWF2ZWRCdWZmZXIgPSBuZXcgVEhSRUUuSW50ZXJsZWF2ZWRCdWZmZXIobmV3SW50ZXJsZWF2ZWRBcnJheSwgc3RyaWRlKTtcbiAgICBuZXdJbnRlcmxlYXZlZEJ1ZmZlci5zZXRVc2FnZShpbnRlcmxlYXZlZEJ1ZmZlci51c2FnZSk7XG5cbiAgICAvLyByZWJ1aWxkIGludGVybGVhdmVkIGJ1ZmZlciBhdHRyaWJ1dGVzXG4gICAgZm9yIChjb25zdCBbYXR0cmlidXRlTmFtZSwgb3JpZ2luYWxBdHRyaWJ1dGVdIG9mIGF0dHJpYnV0ZXNJbkdyb3VwKSB7XG4gICAgICBjb25zdCB7IGl0ZW1TaXplLCBvZmZzZXQsIG5vcm1hbGl6ZWQgfSA9IG9yaWdpbmFsQXR0cmlidXRlO1xuICAgICAgY29uc3QgbmV3QXR0cmlidXRlID0gbmV3IFRIUkVFLkludGVybGVhdmVkQnVmZmVyQXR0cmlidXRlKG5ld0ludGVybGVhdmVkQnVmZmVyLCBpdGVtU2l6ZSwgb2Zmc2V0LCBub3JtYWxpemVkKTtcbiAgICAgIG5ld0dlb21ldHJ5LnNldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lLCBuZXdBdHRyaWJ1dGUpO1xuICAgIH1cbiAgfVxuXG4gIC8vIHByb2Nlc3Mgbm9uLWludGVybGVhdmVkIGF0dHJpYnV0ZXNcbiAgZm9yIChjb25zdCBbYXR0cmlidXRlTmFtZSwgb3JpZ2luYWxBdHRyaWJ1dGVdIG9mIG5vbkludGVybGVhdmVkQXR0cmlidXRlcykge1xuICAgIC8vIHJlYnVpbGQgYXR0cmlidXRlIGFycmF5XG4gICAgY29uc3Qgb3JpZ2luYWxBdHRyaWJ1dGVBcnJheSA9IG9yaWdpbmFsQXR0cmlidXRlLmFycmF5O1xuICAgIGNvbnN0IHsgaXRlbVNpemUsIG5vcm1hbGl6ZWQgfSA9IG9yaWdpbmFsQXR0cmlidXRlO1xuICAgIGNvbnN0IFtuZXdBdHRyaWJ1dGVBcnJheSwgX10gPSByZW1hcEF0dHJpYnV0ZUFycmF5KG9yaWdpbmFsQXR0cmlidXRlQXJyYXksIG5ld0luZGV4T3JpZ2luYWxJbmRleE1hcCwgaXRlbVNpemUpO1xuXG4gICAgLy8gcmVidWlsZCBidWZmZXIgYXR0cmlidXRlXG4gICAgbmV3R2VvbWV0cnkuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUsIG5ldyBCdWZmZXJBdHRyaWJ1dGUobmV3QXR0cmlidXRlQXJyYXksIGl0ZW1TaXplLCBub3JtYWxpemVkKSk7XG4gIH1cbn1cblxudHlwZSBNb3JwaEF0dHJpYnV0ZU5hbWUgPSBrZXlvZiBUSFJFRS5CdWZmZXJHZW9tZXRyeVsnbW9ycGhBdHRyaWJ1dGVzJ107XG50eXBlIE1vcnBoSW50ZXJsZWF2ZWRFbnRyeSA9IFtcbiAgbmFtZTogTW9ycGhBdHRyaWJ1dGVOYW1lLFxuICBtb3JwaEluZGV4OiBudW1iZXIsXG4gIGF0dHJpYnV0ZTogVEhSRUUuSW50ZXJsZWF2ZWRCdWZmZXJBdHRyaWJ1dGUsXG5dO1xudHlwZSBNb3JwaE5vbkludGVybGVhdmVkRW50cnkgPSBbbmFtZTogTW9ycGhBdHRyaWJ1dGVOYW1lLCBtb3JwaEluZGV4OiBudW1iZXIsIGF0dHJpYnV0ZTogVEhSRUUuQnVmZmVyQXR0cmlidXRlXTtcblxuLyoqXG4gKiBDb2xsZWN0cyBtb3JwaCBhdHRyaWJ1dGVzLlxuICogRm9yIGludGVybGVhdmVkIGF0dHJpYnV0ZXMsIGdyb3VwIHRoZW0gaWYgdGhleSBzaGFyZSB0aGUgc2FtZSBJbnRlcmxlYXZlZEJ1ZmZlci5cbiAqIEZvciBub24taW50ZXJsZWF2ZWQgYXR0cmlidXRlcywganVzdCBjb2xsZWN0IHRoZW0gYXMgaXMuXG4gKiBAcGFyYW0gbW9ycGhBdHRyaWJ1dGVzIE9yaWdpbmFsIG1vcnBoIGF0dHJpYnV0ZXNcbiAqIEByZXR1cm5zIENvbGxlY3RlZCBtb3JwaCBhdHRyaWJ1dGUgZ3JvdXBzXG4gKi9cbmZ1bmN0aW9uIGNvbGxlY3RNb3JwaEF0dHJpYnV0ZUdyb3VwcyhcbiAgbW9ycGhBdHRyaWJ1dGVzOiBUSFJFRS5CdWZmZXJHZW9tZXRyeVsnbW9ycGhBdHRyaWJ1dGVzJ10sXG4pOiBbXG4gIGludGVybGVhdmVkQnVmZmVyQXR0cmlidXRlTWFwOiBNYXA8VEhSRUUuSW50ZXJsZWF2ZWRCdWZmZXIsIE1vcnBoSW50ZXJsZWF2ZWRFbnRyeVtdPixcbiAgbm9uSW50ZXJsZWF2ZWRBdHRyaWJ1dGVzOiBNb3JwaE5vbkludGVybGVhdmVkRW50cnlbXSxcbl0ge1xuICBjb25zdCBpbnRlcmxlYXZlZEJ1ZmZlckF0dHJpYnV0ZU1hcCA9IG5ldyBNYXA8VEhSRUUuSW50ZXJsZWF2ZWRCdWZmZXIsIE1vcnBoSW50ZXJsZWF2ZWRFbnRyeVtdPigpO1xuICBjb25zdCBub25JbnRlcmxlYXZlZEF0dHJpYnV0ZXM6IE1vcnBoTm9uSW50ZXJsZWF2ZWRFbnRyeVtdID0gW107XG5cbiAgZm9yIChjb25zdCBba2V5LCBhdHRyaWJ1dGVzXSBvZiBPYmplY3QuZW50cmllcyhtb3JwaEF0dHJpYnV0ZXMpKSB7XG4gICAgY29uc3QgYXR0cmlidXRlTmFtZSA9IGtleSBhcyBNb3JwaEF0dHJpYnV0ZU5hbWU7XG4gICAgZm9yIChsZXQgaU1vcnBoID0gMDsgaU1vcnBoIDwgYXR0cmlidXRlcy5sZW5ndGg7IGlNb3JwaCsrKSB7XG4gICAgICBjb25zdCBvcmlnaW5hbEF0dHJpYnV0ZSA9IGF0dHJpYnV0ZXNbaU1vcnBoXSBhcyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUgfCBUSFJFRS5JbnRlcmxlYXZlZEJ1ZmZlckF0dHJpYnV0ZTtcblxuICAgICAgaWYgKChvcmlnaW5hbEF0dHJpYnV0ZSBhcyBhbnkpLmlzSW50ZXJsZWF2ZWRCdWZmZXJBdHRyaWJ1dGUpIHtcbiAgICAgICAgY29uc3QgaW50ZXJsZWF2ZWRBdHRyaWJ1dGUgPSBvcmlnaW5hbEF0dHJpYnV0ZSBhcyBUSFJFRS5JbnRlcmxlYXZlZEJ1ZmZlckF0dHJpYnV0ZTtcbiAgICAgICAgY29uc3QgaW50ZXJsZWF2ZWRCdWZmZXIgPSBpbnRlcmxlYXZlZEF0dHJpYnV0ZS5kYXRhO1xuICAgICAgICBjb25zdCBncm91cCA9IGludGVybGVhdmVkQnVmZmVyQXR0cmlidXRlTWFwLmdldChpbnRlcmxlYXZlZEJ1ZmZlcikgPz8gW107XG4gICAgICAgIGludGVybGVhdmVkQnVmZmVyQXR0cmlidXRlTWFwLnNldChpbnRlcmxlYXZlZEJ1ZmZlciwgZ3JvdXApO1xuICAgICAgICBncm91cC5wdXNoKFthdHRyaWJ1dGVOYW1lLCBpTW9ycGgsIGludGVybGVhdmVkQXR0cmlidXRlXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGUgPSBvcmlnaW5hbEF0dHJpYnV0ZSBhcyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGU7XG4gICAgICAgIG5vbkludGVybGVhdmVkQXR0cmlidXRlcy5wdXNoKFthdHRyaWJ1dGVOYW1lLCBpTW9ycGgsIGF0dHJpYnV0ZV0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBbaW50ZXJsZWF2ZWRCdWZmZXJBdHRyaWJ1dGVNYXAsIG5vbkludGVybGVhdmVkQXR0cmlidXRlc107XG59XG5cbi8qKlxuICogUmVidWlsZHMgbW9ycGggYXR0cmlidXRlcyBiYXNlZCBvbiB0aGUgbmV3LXRvLW9yaWdpbmFsIGluZGV4IG1hcC5cbiAqIElmIGFsbCBtb3JwaCBhdHRyaWJ1dGUgdmFsdWVzIGFyZSB6ZXJvLCBhbGwgbW9ycGggYXR0cmlidXRlcyB3aWxsIGJlIGRpc2NhcmRlZC5cbiAqIEBwYXJhbSBuZXdHZW9tZXRyeSBOZXcgZ2VvbWV0cnlcbiAqIEBwYXJhbSBtb3JwaEF0dHJpYnV0ZXMgT3JpZ2luYWwgbW9ycGggYXR0cmlidXRlc1xuICogQHBhcmFtIG5ld0luZGV4T3JpZ2luYWxJbmRleE1hcCBNYXAgZnJvbSBuZXcgaW5kZXggdG8gb3JpZ2luYWwgaW5kZXhcbiAqL1xuZnVuY3Rpb24gcmVvcmdhbml6ZU1vcnBoQXR0cmlidXRlcyhcbiAgbmV3R2VvbWV0cnk6IFRIUkVFLkJ1ZmZlckdlb21ldHJ5LFxuICBtb3JwaEF0dHJpYnV0ZXM6IFRIUkVFLkJ1ZmZlckdlb21ldHJ5Wydtb3JwaEF0dHJpYnV0ZXMnXSxcbiAgbmV3SW5kZXhPcmlnaW5hbEluZGV4TWFwOiBudW1iZXJbXSxcbik6IHZvaWQge1xuICAvKiogVHJ1ZSBpZiBhbGwgbW9ycGggYXR0cmlidXRlIHZhbHVlcyBhcmUgemVybyAqL1xuICBsZXQgYWxsTW9ycGhzQXJlWmVybyA9IHRydWU7XG5cbiAgLy8gY29sbGVjdCBpbnRlcmxlYXZlZCBhbmQgbm9uLWludGVybGVhdmVkIG1vcnBoIGF0dHJpYnV0ZXNcbiAgY29uc3QgW2ludGVybGVhdmVkQnVmZmVyQXR0cmlidXRlTWFwLCBub25JbnRlcmxlYXZlZEF0dHJpYnV0ZXNdID0gY29sbGVjdE1vcnBoQXR0cmlidXRlR3JvdXBzKG1vcnBoQXR0cmlidXRlcyk7XG5cbiAgY29uc3QgbmV3TW9ycGhBdHRyaWJ1dGVzOiBUSFJFRS5CdWZmZXJHZW9tZXRyeVsnbW9ycGhBdHRyaWJ1dGVzJ10gPSB7fTtcblxuICAvLyBwcm9jZXNzIGludGVybGVhdmVkIG1vcnBoIGF0dHJpYnV0ZXNcbiAgZm9yIChjb25zdCBbaW50ZXJsZWF2ZWRCdWZmZXIsIGF0dHJpYnV0ZXNJbkdyb3VwXSBvZiBpbnRlcmxlYXZlZEJ1ZmZlckF0dHJpYnV0ZU1hcCkge1xuICAgIC8vIHJlYnVpbGQgaW50ZXJsZWF2ZWQgYnVmZmVyIGFycmF5XG4gICAgY29uc3Qgb3JpZ2luYWxJbnRlcmxlYXZlZEJ1ZmZlckFycmF5ID0gaW50ZXJsZWF2ZWRCdWZmZXIuYXJyYXk7XG4gICAgY29uc3QgeyBzdHJpZGUgfSA9IGludGVybGVhdmVkQnVmZmVyO1xuICAgIGNvbnN0IFtuZXdJbnRlcmxlYXZlZEFycmF5LCBpc0FsbFplcm9dID0gcmVtYXBBdHRyaWJ1dGVBcnJheShcbiAgICAgIG9yaWdpbmFsSW50ZXJsZWF2ZWRCdWZmZXJBcnJheSxcbiAgICAgIG5ld0luZGV4T3JpZ2luYWxJbmRleE1hcCxcbiAgICAgIHN0cmlkZSxcbiAgICApO1xuICAgIGFsbE1vcnBoc0FyZVplcm8gPSBhbGxNb3JwaHNBcmVaZXJvICYmIGlzQWxsWmVybztcblxuICAgIC8vIHJlYnVpbGQgaW50ZXJsZWF2ZWQgYnVmZmVyXG4gICAgY29uc3QgbmV3SW50ZXJsZWF2ZWRCdWZmZXIgPSBuZXcgVEhSRUUuSW50ZXJsZWF2ZWRCdWZmZXIobmV3SW50ZXJsZWF2ZWRBcnJheSwgc3RyaWRlKTtcbiAgICBuZXdJbnRlcmxlYXZlZEJ1ZmZlci5zZXRVc2FnZShpbnRlcmxlYXZlZEJ1ZmZlci51c2FnZSk7XG5cbiAgICAvLyByZWJ1aWxkIGludGVybGVhdmVkIGJ1ZmZlciBhdHRyaWJ1dGVzXG4gICAgZm9yIChjb25zdCBbYXR0cmlidXRlTmFtZSwgbW9ycGhJbmRleCwgYXR0cmlidXRlXSBvZiBhdHRyaWJ1dGVzSW5Hcm91cCkge1xuICAgICAgY29uc3QgeyBpdGVtU2l6ZSwgb2Zmc2V0LCBub3JtYWxpemVkIH0gPSBhdHRyaWJ1dGUgYXMgVEhSRUUuSW50ZXJsZWF2ZWRCdWZmZXJBdHRyaWJ1dGU7XG4gICAgICBjb25zdCBuZXdBdHRyaWJ1dGUgPSBuZXcgVEhSRUUuSW50ZXJsZWF2ZWRCdWZmZXJBdHRyaWJ1dGUobmV3SW50ZXJsZWF2ZWRCdWZmZXIsIGl0ZW1TaXplLCBvZmZzZXQsIG5vcm1hbGl6ZWQpO1xuICAgICAgbmV3TW9ycGhBdHRyaWJ1dGVzW2F0dHJpYnV0ZU5hbWVdID8/PSBbXTtcbiAgICAgIG5ld01vcnBoQXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXVttb3JwaEluZGV4XSA9IG5ld0F0dHJpYnV0ZTtcbiAgICB9XG4gIH1cblxuICAvLyBwcm9jZXNzIG5vbi1pbnRlcmxlYXZlZCBtb3JwaCBhdHRyaWJ1dGVzXG4gIGZvciAoY29uc3QgW2F0dHJpYnV0ZU5hbWUsIG1vcnBoSW5kZXgsIGF0dHJpYnV0ZV0gb2Ygbm9uSW50ZXJsZWF2ZWRBdHRyaWJ1dGVzKSB7XG4gICAgY29uc3Qgb3JpZ2luYWxBdHRyaWJ1dGUgPSBhdHRyaWJ1dGUgYXMgVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xuICAgIGNvbnN0IG9yaWdpbmFsQXR0cmlidXRlQXJyYXkgPSBvcmlnaW5hbEF0dHJpYnV0ZS5hcnJheTtcbiAgICBjb25zdCB7IGl0ZW1TaXplLCBub3JtYWxpemVkIH0gPSBvcmlnaW5hbEF0dHJpYnV0ZTtcbiAgICBjb25zdCBbbmV3QXR0cmlidXRlQXJyYXksIGlzQWxsWmVyb10gPSByZW1hcEF0dHJpYnV0ZUFycmF5KFxuICAgICAgb3JpZ2luYWxBdHRyaWJ1dGVBcnJheSxcbiAgICAgIG5ld0luZGV4T3JpZ2luYWxJbmRleE1hcCxcbiAgICAgIGl0ZW1TaXplLFxuICAgICk7XG4gICAgYWxsTW9ycGhzQXJlWmVybyA9IGFsbE1vcnBoc0FyZVplcm8gJiYgaXNBbGxaZXJvO1xuXG4gICAgbmV3TW9ycGhBdHRyaWJ1dGVzW2F0dHJpYnV0ZU5hbWVdID8/PSBbXTtcbiAgICBuZXdNb3JwaEF0dHJpYnV0ZXNbYXR0cmlidXRlTmFtZV1bbW9ycGhJbmRleF0gPSBuZXcgQnVmZmVyQXR0cmlidXRlKG5ld0F0dHJpYnV0ZUFycmF5LCBpdGVtU2l6ZSwgbm9ybWFsaXplZCk7XG4gIH1cblxuICAvLyBkaXNjYXJkIG1vcnBoIGF0dHJpYnV0ZXMgaWYgYWxsIHZhbHVlcyBhcmUgemVyb1xuICBuZXdHZW9tZXRyeS5tb3JwaEF0dHJpYnV0ZXMgPSBhbGxNb3JwaHNBcmVaZXJvID8ge30gOiBuZXdNb3JwaEF0dHJpYnV0ZXM7XG59XG5cbi8qKlxuICogVHJhdmVyc2UgZ2l2ZW4gb2JqZWN0IGFuZCByZW1vdmUgdW5uZWNlc3NhcnkgdmVydGljZXMgZnJvbSBldmVyeSBCdWZmZXJHZW9tZXRyaWVzLlxuICogVGhpcyBvbmx5IHByb2Nlc3NlcyBidWZmZXIgZ2VvbWV0cmllcyB3aXRoIGluZGV4IGJ1ZmZlci5cbiAqXG4gKiBDZXJ0YWluIG1vZGVscyBoYXZlIHZlcnRpY2VzIHRoYXQgYXJlIG5vdCB1c2VkIGJ5IGFueSBmYWNlcy5cbiAqIFRocmVlLmpzIGNyZWF0ZXMgbW9ycGggdGV4dHVyZXMgZm9yIGVhY2ggZ2VvbWV0cmllcyBhbmQgaXQgc29tZXRpbWVzIGNvbnN1bWVzIHVubmVjZXNzYXJ5IGFtb3VudCBvZiBWUkFNIGZvciBjZXJ0YWluIG1vZGVscy5cbiAqIFRoaXMgZnVuY3Rpb24gd2lsbCBvcHRpbWl6ZSBnZW9tZXRyaWVzIHRvIHJlZHVjZSB0aGUgc2l6ZSBvZiBtb3JwaCB0ZXh0dXJlLlxuICogU2VlOiBodHRwczovL2dpdGh1Yi5jb20vbXJkb29iL3RocmVlLmpzL2lzc3Vlcy8yMzA5NVxuICpcbiAqIEBwYXJhbSByb290IFJvb3Qgb2JqZWN0IHRoYXQgd2lsbCBiZSB0cmF2ZXJzZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZVVubmVjZXNzYXJ5VmVydGljZXMocm9vdDogVEhSRUUuT2JqZWN0M0QpOiB2b2lkIHtcbiAgY29uc3QgZ2VvbWV0cnlNYXAgPSBuZXcgTWFwPFRIUkVFLkJ1ZmZlckdlb21ldHJ5LCBUSFJFRS5CdWZmZXJHZW9tZXRyeT4oKTtcblxuICAvLyBUcmF2ZXJzZSBhbiBlbnRpcmUgdHJlZVxuICByb290LnRyYXZlcnNlKChvYmopID0+IHtcbiAgICBpZiAoIShvYmogYXMgYW55KS5pc01lc2gpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBtZXNoID0gb2JqIGFzIFRIUkVFLk1lc2g7XG4gICAgY29uc3QgZ2VvbWV0cnkgPSBtZXNoLmdlb21ldHJ5O1xuXG4gICAgLy8gaWYgdGhlIGdlb21ldHJ5IGRvZXMgbm90IGhhdmUgYW4gaW5kZXggYnVmZmVyIGl0IGRvZXMgbm90IG5lZWQgdG8gYmUgcHJvY2Vzc2VkXG4gICAgY29uc3Qgb3JpZ2luYWxJbmRleCA9IGdlb21ldHJ5LmluZGV4O1xuICAgIGlmIChvcmlnaW5hbEluZGV4ID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBpZiB0aGUgZ2VvbWV0cnkgaGFzIGFscmVhZHkgYmVlbiBwcm9jZXNzZWQsIHJldXNlIGl0XG4gICAgY29uc3QgbmV3R2VvbWV0cnlBbHJlYWR5RXhpc3RlZCA9IGdlb21ldHJ5TWFwLmdldChnZW9tZXRyeSk7XG4gICAgaWYgKG5ld0dlb21ldHJ5QWxyZWFkeUV4aXN0ZWQgIT0gbnVsbCkge1xuICAgICAgbWVzaC5nZW9tZXRyeSA9IG5ld0dlb21ldHJ5QWxyZWFkeUV4aXN0ZWQ7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gY2hlY2sgd2hpY2ggdmVydGljZXMgYXJlIHVzZWRcbiAgICBjb25zdCB7IGlzVmVydGV4VXNlZCwgdmVydGV4Q291bnQsIHZlcnRpY2VzVXNlZCB9ID0gY2hlY2tJc1ZlcnRleFVzZWQoZ2VvbWV0cnkuYXR0cmlidXRlcywgb3JpZ2luYWxJbmRleCk7XG5cbiAgICAvLyBpZiBhbGwgdmVydGljZXMgYXJlIHVzZWQsIGRvIG5vdGhpbmdcbiAgICBpZiAodmVydGljZXNVc2VkID09PSB2ZXJ0ZXhDb3VudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGJ1aWxkIGluZGV4IG1hcHNcbiAgICBjb25zdCB7IG9yaWdpbmFsSW5kZXhOZXdJbmRleE1hcCwgbmV3SW5kZXhPcmlnaW5hbEluZGV4TWFwIH0gPSBidWlsZEluZGV4TWFwc0Zyb21Jc1ZlcnRleFVzZWQoaXNWZXJ0ZXhVc2VkKTtcblxuICAgIC8vIHRoaXMgaXMgdGhlIG5ldyBnZW9tZXRyeSB3ZSB3aWxsIGJ1aWxkXG4gICAgY29uc3QgbmV3R2VvbWV0cnkgPSBuZXcgVEhSRUUuQnVmZmVyR2VvbWV0cnkoKTtcbiAgICBjb3B5R2VvbWV0cnlQcm9wZXJ0aWVzKGdlb21ldHJ5LCBuZXdHZW9tZXRyeSk7XG5cbiAgICAvLyBzZXQgdG8gZ2VvbWV0cnlNYXAgZm9yIGxhdGVyIHJldXNlXG4gICAgZ2VvbWV0cnlNYXAuc2V0KGdlb21ldHJ5LCBuZXdHZW9tZXRyeSk7XG5cbiAgICAvLyByZW9yZ2FuaXplIGluZGljZXMgYW5kIGF0dHJpYnV0ZXNcbiAgICByZW9yZ2FuaXplSW5kZXhBdHRyaWJ1dGUobmV3R2VvbWV0cnksIG9yaWdpbmFsSW5kZXgsIG9yaWdpbmFsSW5kZXhOZXdJbmRleE1hcCk7XG4gICAgcmVvcmdhbml6ZUdlb21ldHJ5QXR0cmlidXRlcyhuZXdHZW9tZXRyeSwgZ2VvbWV0cnkuYXR0cmlidXRlcywgbmV3SW5kZXhPcmlnaW5hbEluZGV4TWFwKTtcbiAgICByZW9yZ2FuaXplTW9ycGhBdHRyaWJ1dGVzKG5ld0dlb21ldHJ5LCBnZW9tZXRyeS5tb3JwaEF0dHJpYnV0ZXMsIG5ld0luZGV4T3JpZ2luYWxJbmRleE1hcCk7XG5cbiAgICAvLyBmaW5hbGx5LCBzZXQgdGhlIG5ldyBnZW9tZXRyeSB0byB0aGUgbWVzaFxuICAgIG1lc2guZ2VvbWV0cnkgPSBuZXdHZW9tZXRyeTtcbiAgfSk7XG5cbiAgQXJyYXkuZnJvbShnZW9tZXRyeU1hcC5rZXlzKCkpLmZvckVhY2goKG9yaWdpbmFsR2VvbWV0cnkpID0+IHtcbiAgICBvcmlnaW5hbEdlb21ldHJ5LmRpc3Bvc2UoKTtcbiAgfSk7XG59XG4iLCAiaW1wb3J0IHsgVlJNIH0gZnJvbSAnLi4vVlJNJztcblxuLyoqXG4gKiBJZiB0aGUgZ2l2ZW4gVlJNIGlzIFZSTTAuMCwgcm90YXRlIHRoZSBgdnJtLnNjZW5lYCBieSAxODAgZGVncmVlcyBhcm91bmQgdGhlIFkgYXhpcy5cbiAqXG4gKiBAcGFyYW0gdnJtIFRoZSB0YXJnZXQgVlJNXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByb3RhdGVWUk0wKHZybTogVlJNKTogdm9pZCB7XG4gIGlmICh2cm0ubWV0YT8ubWV0YVZlcnNpb24gPT09ICcwJykge1xuICAgIHZybS5zY2VuZS5yb3RhdGlvbi55ID0gTWF0aC5QSTtcbiAgfVxufVxuIiwgImltcG9ydCB7IGNvbWJpbmVNb3JwaHMgfSBmcm9tICcuL2NvbWJpbmVNb3JwaHMnO1xuaW1wb3J0IHsgY29tYmluZVNrZWxldG9ucyB9IGZyb20gJy4vY29tYmluZVNrZWxldG9ucyc7XG5pbXBvcnQgeyBkZWVwRGlzcG9zZSB9IGZyb20gJy4vZGVlcERpc3Bvc2UnO1xuaW1wb3J0IHsgcmVtb3ZlVW5uZWNlc3NhcnlKb2ludHMgfSBmcm9tICcuL3JlbW92ZVVubmVjZXNzYXJ5Sm9pbnRzJztcbmltcG9ydCB7IHJlbW92ZVVubmVjZXNzYXJ5VmVydGljZXMgfSBmcm9tICcuL3JlbW92ZVVubmVjZXNzYXJ5VmVydGljZXMnO1xuaW1wb3J0IHsgcm90YXRlVlJNMCB9IGZyb20gJy4vcm90YXRlVlJNMCc7XG5cbmV4cG9ydCBjbGFzcyBWUk1VdGlscyB7XG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gdGhpcyBjbGFzcyBpcyBub3QgbWVhbnQgdG8gYmUgaW5zdGFudGlhdGVkXG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNvbWJpbmVNb3JwaHMgPSBjb21iaW5lTW9ycGhzO1xuICBwdWJsaWMgc3RhdGljIGNvbWJpbmVTa2VsZXRvbnMgPSBjb21iaW5lU2tlbGV0b25zO1xuICBwdWJsaWMgc3RhdGljIGRlZXBEaXNwb3NlID0gZGVlcERpc3Bvc2U7XG4gIHB1YmxpYyBzdGF0aWMgcmVtb3ZlVW5uZWNlc3NhcnlKb2ludHMgPSByZW1vdmVVbm5lY2Vzc2FyeUpvaW50cztcbiAgcHVibGljIHN0YXRpYyByZW1vdmVVbm5lY2Vzc2FyeVZlcnRpY2VzID0gcmVtb3ZlVW5uZWNlc3NhcnlWZXJ0aWNlcztcbiAgcHVibGljIHN0YXRpYyByb3RhdGVWUk0wID0gcm90YXRlVlJNMDtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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U0FBSyxXQUFXO0FBQUEsRUFDbEIsQ0FBQztBQUVELFFBQU0sS0FBSyxZQUFZLEtBQUssQ0FBQyxFQUFFLFFBQVEsQ0FBQyxxQkFBcUI7QUFDM0QscUJBQWlCLFFBQVE7QUFBQSxFQUMzQixDQUFDO0FBQ0g7OztBQ3hZTyxTQUFTLFdBQVcsS0FBZ0I7QUFQM0M7QUFRRSxRQUFJLFNBQUksU0FBSixtQkFBVSxpQkFBZ0IsS0FBSztBQUNqQyxRQUFJLE1BQU0sU0FBUyxJQUFJLEtBQUs7QUFBQSxFQUM5QjtBQUNGOzs7QUNKTyxJQUFNLFdBQU4sTUFBZTtBQUFBLEVBQ1osY0FBYztBQUFBLEVBRXRCO0FBUUY7QUFYYSxTQUtHLGdCQUFnQjtBQUxuQixTQU1HLG1CQUFtQjtBQU50QixTQU9HLGNBQWM7QUFQakIsU0FRRywwQkFBMEI7QUFSN0IsU0FTRyw0QkFBNEI7QUFUL0IsU0FVRyxhQUFhOyIsCiAgIm5hbWVzIjogWyJfX2FzeW5jIiwgIl9WUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvckJpbmQiLCAiX1ZSTUV4cHJlc3Npb25UZXh0dXJlVHJhbnNmb3JtQmluZCIsICJfYSIsICJfVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbiIsICJfYiIsICJfVlJNRmlyc3RQZXJzb24iLCAiUE9TU0lCTEVfU1BFQ19WRVJTSU9OUyIsICJfdjNBIiwgIl9xdWF0QSIsICJfdjNCIiwgIl9xdWF0QiIsICJfVlJNTG9va0F0IiwgIlZFQzNfUE9TSVRJVkVfWiIsICJfZXVsZXJBIiwgIlRIUkVFNSIsICJUSFJFRTIiLCAiVEhSRUUiLCAiVEhSRUU0IiwgIlRIUkVFMyIsICJfX2FzeW5jIiwgIm10b29uX2RlZmF1bHQiLCAiUE9TU0lCTEVfU1BFQ19WRVJTSU9OUyIsICJfTVRvb25NYXRlcmlhbExvYWRlclBsdWdpbiIsICJfVlJNTWF0ZXJpYWxzSERSRW1pc3NpdmVNdWx0aXBsaWVyTG9hZGVyUGx1Z2luIiwgIl9fYXN5bmMiLCAiVEhSRUUiLCAiX19hc3luYyIsICJfYSIsICJfX3NwcmVhZFZhbHVlcyIsICJUSFJFRSIsICJUSFJFRTMiLCAiVEhSRUUyIiwgIlRIUkVFNCIsICJUSFJFRTUiLCAiX3YzQSIsICJfdjNCIiwgInF1YXRJbnZlcnRDb21wYXQiLCAiX3YzQyIsICJfcXVhdEEiLCAiX3F1YXRCIiwgIl9xdWF0QyIsICJjb25zdHJhaW50IiwgIlBPU1NJQkxFX1NQRUNfVkVSU0lPTlMiLCAiX1ZSTU5vZGVDb25zdHJhaW50TG9hZGVyUGx1Z2luIiwgIl9fYXN5bmMiLCAiX2EiLCAiVEhSRUU3IiwgIlRIUkVFIiwgIlRIUkVFMiIsICJUSFJFRTMiLCAiVEhSRUU0IiwgIlRIUkVFNSIsICJUSFJFRTYiLCAiVEhSRUU5IiwgIlRIUkVFOCIsICJUSFJFRTEwIiwgIlRIUkVFMTMiLCAiVEhSRUUxMiIsICJUSFJFRTExIiwgIlRIUkVFMTQiLCAiX3YzQSIsICJfdjNCIiwgIl9tYXRBIiwgInRyYXZlcnNlQW5jZXN0b3JzRnJvbVJvb3QiLCAiUE9TU0lCTEVfU1BFQ19WRVJTSU9OUyIsICJfVlJNU3ByaW5nQm9uZUxvYWRlclBsdWdpbiIsICJfX2FzeW5jIiwgIl9hIiwgIl9iIiwgIl9jIiwgIl9kIiwgIl9lIiwgIlRIUkVFIiwgIlRIUkVFIiwgIlRIUkVFIiwgIlRIUkVFIiwgIm1hdGVyaWFsIiwgIlRIUkVFIiwgIlRIUkVFIl0KfQo=
