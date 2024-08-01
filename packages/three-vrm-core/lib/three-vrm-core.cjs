/*!
 * @pixiv/three-vrm-core v3.0.0-beta.2
 * The implementation of core features of VRM, for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2024 pixiv Inc.
 * @pixiv/three-vrm-core is distributed under MIT License
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
  VRMLookAt: () => VRMLookAt,
  VRMLookAtBoneApplier: () => VRMLookAtBoneApplier,
  VRMLookAtExpressionApplier: () => VRMLookAtExpressionApplier,
  VRMLookAtHelper: () => VRMLookAtHelper,
  VRMLookAtLoaderPlugin: () => VRMLookAtLoaderPlugin,
  VRMLookAtRangeMap: () => VRMLookAtRangeMap,
  VRMLookAtTypeName: () => VRMLookAtTypeName,
  VRMMetaLoaderPlugin: () => VRMMetaLoaderPlugin,
  VRMRequiredHumanBoneName: () => VRMRequiredHumanBoneName
});
module.exports = __toCommonJS(src_exports);

// src/expressions/VRMExpression.ts
var THREE = __toESM(require("three"), 1);
var VRMExpression = class extends THREE.Object3D {
  constructor(expressionName) {
    super();
    /**
     * The current weight of the expression.
     */
    this.weight = 0;
    /**
     * Interpret values greater than 0.5 as 1.0, ortherwise 0.0.
     */
    this.isBinary = false;
    /**
     * Specify how the expression overrides blink expressions.
     */
    this.overrideBlink = "none";
    /**
     * Specify how the expression overrides lookAt expressions.
     */
    this.overrideLookAt = "none";
    /**
     * Specify how the expression overrides mouth expressions.
     */
    this.overrideMouth = "none";
    this._binds = [];
    this.name = `VRMExpression_${expressionName}`;
    this.expressionName = expressionName;
    this.type = "VRMExpression";
    this.visible = false;
  }
  /**
   * A value represents how much it should override blink expressions.
   * `0.0` == no override at all, `1.0` == completely block the expressions.
   */
  get overrideBlinkAmount() {
    if (this.overrideBlink === "block") {
      return 0 < this.weight ? 1 : 0;
    } else if (this.overrideBlink === "blend") {
      return this.weight;
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
      return 0 < this.weight ? 1 : 0;
    } else if (this.overrideLookAt === "blend") {
      return this.weight;
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
      return 0 < this.weight ? 1 : 0;
    } else if (this.overrideMouth === "blend") {
      return this.weight;
    } else {
      return 0;
    }
  }
  addBind(bind) {
    this._binds.push(bind);
  }
  /**
   * Apply weight to every assigned blend shapes.
   * Should be called every frame.
   */
  applyWeight(options) {
    var _a;
    let actualWeight = this.isBinary ? this.weight <= 0.5 ? 0 : 1 : this.weight;
    actualWeight *= (_a = options == null ? void 0 : options.multiplier) != null ? _a : 1;
    this._binds.forEach((bind) => bind.applyWeight(actualWeight));
  }
  /**
   * Clear previously assigned blend shapes.
   */
  clearAppliedWeight() {
    this._binds.forEach((bind) => bind.clearAppliedWeight());
  }
};

// src/expressions/VRMExpressionLoaderPlugin.ts
var THREE4 = __toESM(require("three"), 1);

// src/utils/gltfExtractPrimitivesFromNode.ts
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
  return __async(this, null, function* () {
    const node = yield gltf.parser.getDependency("node", nodeIndex);
    return extractPrimitivesInternal(gltf, nodeIndex, node);
  });
}
function gltfExtractPrimitivesFromNodes(gltf) {
  return __async(this, null, function* () {
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

// src/expressions/VRMExpressionPresetName.ts
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

// src/utils/saturate.ts
function saturate(value) {
  return Math.max(Math.min(value, 1), 0);
}

// src/expressions/VRMExpressionManager.ts
var VRMExpressionManager = class _VRMExpressionManager {
  /**
   * Create a new {@link VRMExpressionManager}.
   */
  constructor() {
    /**
     * A set of name or preset name of expressions that will be overridden by {@link VRMExpression.overrideBlink}.
     */
    this.blinkExpressionNames = ["blink", "blinkLeft", "blinkRight"];
    /**
     * A set of name or preset name of expressions that will be overridden by {@link VRMExpression.overrideLookAt}.
     */
    this.lookAtExpressionNames = ["lookLeft", "lookRight", "lookUp", "lookDown"];
    /**
     * A set of name or preset name of expressions that will be overridden by {@link VRMExpression.overrideMouth}.
     */
    this.mouthExpressionNames = ["aa", "ee", "ih", "oh", "ou"];
    /**
     * A set of {@link VRMExpression}.
     * When you want to register expressions, use {@link registerExpression}
     */
    this._expressions = [];
    /**
     * A map from name to expression.
     */
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

// src/expressions/VRMExpressionMaterialColorType.ts
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

// src/expressions/VRMExpressionMaterialColorBind.ts
var THREE2 = __toESM(require("three"), 1);
var _color = new THREE2.Color();
var _VRMExpressionMaterialColorBind = class _VRMExpressionMaterialColorBind {
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
    return (_b = (_a = Object.entries(_VRMExpressionMaterialColorBind._propertyNameMapMap).find(([distinguisher]) => {
      return this.material[distinguisher] === true;
    })) == null ? void 0 : _a[1]) != null ? _b : null;
  }
};
/**
 * Mapping of property names from VRMC/materialColorBinds.type to three.js/Material.
 * The first element stands for color channels, the second element stands for the alpha channel.
 * The second element can be null if the target property doesn't exist.
 */
// TODO: We might want to use the `satisfies` operator once we bump TS to 4.9 or higher
// See: https://github.com/pixiv/three-vrm/pull/1323#discussion_r1374020035
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

// src/expressions/VRMExpressionMorphTargetBind.ts
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

// src/expressions/VRMExpressionTextureTransformBind.ts
var THREE3 = __toESM(require("three"), 1);
var _v2 = new THREE3.Vector2();
var _VRMExpressionTextureTransformBind = class _VRMExpressionTextureTransformBind {
  constructor({
    material,
    scale,
    offset
  }) {
    var _a, _b;
    this.material = material;
    this.scale = scale;
    this.offset = offset;
    const propertyNames = (_a = Object.entries(_VRMExpressionTextureTransformBind._propertyNamesMap).find(
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

// src/expressions/VRMExpressionLoaderPlugin.ts
var POSSIBLE_SPEC_VERSIONS = /* @__PURE__ */ new Set(["1.0", "1.0-beta"]);
var _VRMExpressionLoaderPlugin = class _VRMExpressionLoaderPlugin {
  get name() {
    return "VRMExpressionLoaderPlugin";
  }
  constructor(parser) {
    this.parser = parser;
  }
  afterRoot(gltf) {
    return __async(this, null, function* () {
      gltf.userData.vrmExpressionManager = yield this._import(gltf);
    });
  }
  /**
   * Import a {@link VRMExpressionManager} from a VRM.
   *
   * @param gltf A parsed result of GLTF taken from GLTFLoader
   */
  _import(gltf) {
    return __async(this, null, function* () {
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
    return __async(this, null, function* () {
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
        Array.from(nameSchemaExpressionMap.entries()).map((_0) => __async(this, [_0], function* ([name, schemaExpression]) {
          var _a2, _b2, _c, _d, _e, _f, _g;
          const expression = new VRMExpression(name);
          gltf.scene.add(expression);
          expression.isBinary = (_a2 = schemaExpression.isBinary) != null ? _a2 : false;
          expression.overrideBlink = (_b2 = schemaExpression.overrideBlink) != null ? _b2 : "none";
          expression.overrideLookAt = (_c = schemaExpression.overrideLookAt) != null ? _c : "none";
          expression.overrideMouth = (_d = schemaExpression.overrideMouth) != null ? _d : "none";
          (_e = schemaExpression.morphTargetBinds) == null ? void 0 : _e.forEach((bind) => __async(this, null, function* () {
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
                gltfMaterials.push(material);
              }
            });
            (_f = schemaExpression.materialColorBinds) == null ? void 0 : _f.forEach((bind) => __async(this, null, function* () {
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
            (_g = schemaExpression.textureTransformBinds) == null ? void 0 : _g.forEach((bind) => __async(this, null, function* () {
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
    return __async(this, null, function* () {
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
        schemaBlendShapeGroups.map((schemaGroup) => __async(this, null, function* () {
          var _a2;
          const v0PresetName = schemaGroup.presetName;
          const v1PresetName = v0PresetName != null && _VRMExpressionLoaderPlugin.v0v1PresetNameMap[v0PresetName] || null;
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
            schemaGroup.binds.forEach((bind) => __async(this, null, function* () {
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
              const morphTargetIndex = bind.index;
              yield Promise.all(
                nodesUsingMesh.map((nodeIndex) => __async(this, null, function* () {
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

// src/expressions/VRMExpressionOverrideType.ts
var VRMExpressionOverrideType = {
  None: "none",
  Block: "block",
  Blend: "blend"
};

// src/firstPerson/VRMFirstPerson.ts
var THREE5 = __toESM(require("three"), 1);
var _VRMFirstPerson = class _VRMFirstPerson {
  /**
   * Create a new VRMFirstPerson object.
   *
   * @param humanoid A {@link VRMHumanoid}
   * @param meshAnnotations A renderer settings. See the description of [[RendererFirstPersonFlags]] for more info
   */
  constructor(humanoid, meshAnnotations) {
    this._firstPersonOnlyLayer = _VRMFirstPerson.DEFAULT_FIRSTPERSON_ONLY_LAYER;
    this._thirdPersonOnlyLayer = _VRMFirstPerson.DEFAULT_THIRDPERSON_ONLY_LAYER;
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
    return new _VRMFirstPerson(this.humanoid, this.meshAnnotations).copy(this);
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
    firstPersonOnlyLayer = _VRMFirstPerson.DEFAULT_FIRSTPERSON_ONLY_LAYER,
    thirdPersonOnlyLayer = _VRMFirstPerson.DEFAULT_THIRDPERSON_ONLY_LAYER
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
/**
 * A default camera layer for `FirstPersonOnly` layer.
 *
 * @see [[getFirstPersonOnlyLayer]]
 */
_VRMFirstPerson.DEFAULT_FIRSTPERSON_ONLY_LAYER = 9;
/**
 * A default camera layer for `ThirdPersonOnly` layer.
 *
 * @see [[getThirdPersonOnlyLayer]]
 */
_VRMFirstPerson.DEFAULT_THIRDPERSON_ONLY_LAYER = 10;
var VRMFirstPerson = _VRMFirstPerson;

// src/firstPerson/VRMFirstPersonLoaderPlugin.ts
var POSSIBLE_SPEC_VERSIONS2 = /* @__PURE__ */ new Set(["1.0", "1.0-beta"]);
var VRMFirstPersonLoaderPlugin = class {
  get name() {
    return "VRMFirstPersonLoaderPlugin";
  }
  constructor(parser) {
    this.parser = parser;
  }
  afterRoot(gltf) {
    return __async(this, null, function* () {
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
    return __async(this, null, function* () {
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
    return __async(this, null, function* () {
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
      if (!schemaFirstPerson) {
        return null;
      }
      const meshAnnotations = [];
      const nodePrimitivesMap = yield gltfExtractPrimitivesFromNodes(gltf);
      Array.from(nodePrimitivesMap.entries()).forEach(([nodeIndex, primitives]) => {
        var _a2;
        const annotation = schemaFirstPerson.meshAnnotations ? schemaFirstPerson.meshAnnotations.find((a) => a.node === nodeIndex) : void 0;
        meshAnnotations.push({
          meshes: primitives,
          type: (_a2 = annotation == null ? void 0 : annotation.type) != null ? _a2 : "both"
        });
      });
      return new VRMFirstPerson(humanoid, meshAnnotations);
    });
  }
  _v0Import(gltf, humanoid) {
    return __async(this, null, function* () {
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
    } else if (flag === "Auto") {
      return "auto";
    } else {
      return "both";
    }
  }
};

// src/firstPerson/VRMFirstPersonMeshAnnotationType.ts
var VRMFirstPersonMeshAnnotationType = {
  Auto: "auto",
  Both: "both",
  ThirdPersonOnly: "thirdPersonOnly",
  FirstPersonOnly: "firstPersonOnly"
};

// src/humanoid/helpers/VRMHumanoidHelper.ts
var THREE6 = __toESM(require("three"), 1);
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

// src/humanoid/VRMHumanBoneList.ts
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

// src/humanoid/VRMHumanBoneName.ts
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

// src/humanoid/VRMHumanBoneParentMap.ts
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

// src/humanoid/VRMRig.ts
var THREE7 = __toESM(require("three"), 1);

// src/utils/quatInvertCompat.ts
function quatInvertCompat(target) {
  if (target.invert) {
    target.invert();
  } else {
    target.inverse();
  }
  return target;
}

// src/humanoid/VRMRig.ts
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
   * @param poseObject A [[VRMPose]] that represents a single pose
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

// src/humanoid/VRMHumanoidRig.ts
var THREE8 = __toESM(require("three"), 1);
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

// src/humanoid/VRMHumanoid.ts
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

// src/humanoid/VRMRequiredHumanBoneName.ts
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

// src/humanoid/VRMHumanoidLoaderPlugin.ts
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
    return __async(this, null, function* () {
      gltf.userData.vrmHumanoid = yield this._import(gltf);
    });
  }
  /**
   * Import a {@link VRMHumanoid} from a VRM.
   *
   * @param gltf A parsed result of GLTF taken from GLTFLoader
   */
  _import(gltf) {
    return __async(this, null, function* () {
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
    return __async(this, null, function* () {
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
          Object.entries(schemaHumanoid.humanBones).map((_0) => __async(this, [_0], function* ([boneNameString, schemaHumanBone]) {
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
    return __async(this, null, function* () {
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
          schemaHumanoid.humanBones.map((bone) => __async(this, null, function* () {
            const boneName = bone.bone;
            const index = bone.node;
            if (boneName == null || index == null) {
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

// src/lookAt/helpers/VRMLookAtHelper.ts
var THREE11 = __toESM(require("three"), 1);

// src/lookAt/helpers/utils/FanBufferGeometry.ts
var THREE9 = __toESM(require("three"), 1);
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

// src/lookAt/helpers/utils/LineAndSphereBufferGeometry.ts
var THREE10 = __toESM(require("three"), 1);
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

// src/lookAt/helpers/VRMLookAtHelper.ts
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

// src/lookAt/VRMLookAt.ts
var THREE13 = __toESM(require("three"), 1);

// src/utils/getWorldQuaternionLite.ts
var THREE12 = __toESM(require("three"), 1);
var _position = new THREE12.Vector3();
var _scale = new THREE12.Vector3();
function getWorldQuaternionLite(object, out) {
  object.matrixWorld.decompose(_position, out, _scale);
  return out;
}

// src/lookAt/utils/calcAzimuthAltitude.ts
function calcAzimuthAltitude(vector) {
  return [Math.atan2(-vector.z, vector.x), Math.atan2(vector.y, Math.sqrt(vector.x * vector.x + vector.z * vector.z))];
}

// src/lookAt/utils/sanitizeAngle.ts
function sanitizeAngle(angle) {
  const roundTurn = Math.round(angle / 2 / Math.PI);
  return angle - 2 * Math.PI * roundTurn;
}

// src/lookAt/VRMLookAt.ts
var VEC3_POSITIVE_Z = new THREE13.Vector3(0, 0, 1);
var _v3A5 = new THREE13.Vector3();
var _v3B3 = new THREE13.Vector3();
var _v3C = new THREE13.Vector3();
var _quatA5 = new THREE13.Quaternion();
var _quatB2 = new THREE13.Quaternion();
var _quatC = new THREE13.Quaternion();
var _quatD = new THREE13.Quaternion();
var _eulerA = new THREE13.Euler();
var _VRMLookAt = class _VRMLookAt {
  /**
   * Create a new {@link VRMLookAt}.
   *
   * @param humanoid A {@link VRMHumanoid}
   * @param applier A {@link VRMLookAtApplier}
   */
  constructor(humanoid, applier) {
    // yaw-pitch-roll
    /**
     * The origin of LookAt. Position offset from the head bone.
     */
    this.offsetFromHeadBone = new THREE13.Vector3();
    /**
     * If this is true, the LookAt will be updated automatically by calling {@link update}, towarding the direction to the {@link target}.
     * `true` by default.
     *
     * See also: {@link target}
     */
    this.autoUpdate = true;
    /**
     * The front direction of the face.
     * Intended to be used for VRM 0.0 compat (VRM 0.0 models are facing Z- instead of Z+).
     * You usually don't want to touch this.
     */
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
    return new _VRMLookAt(this.humanoid, this.applier).copy(this);
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

// src/lookAt/VRMLookAtBoneApplier.ts
var THREE14 = __toESM(require("three"), 1);
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
/**
 * Represent its type of applier.
 */
VRMLookAtBoneApplier.type = "bone";

// src/lookAt/VRMLookAtExpressionApplier.ts
var THREE15 = __toESM(require("three"), 1);
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
/**
 * Represent its type of applier.
 */
VRMLookAtExpressionApplier.type = "expression";

// src/lookAt/VRMLookAtRangeMap.ts
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

// src/lookAt/VRMLookAtLoaderPlugin.ts
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
    return __async(this, null, function* () {
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
    return __async(this, null, function* () {
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
    return __async(this, null, function* () {
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
    return __async(this, null, function* () {
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

// src/lookAt/VRMLookAtTypeName.ts
var VRMLookAtTypeName = {
  Bone: "bone",
  Expression: "expression"
};

// src/meta/VRMMetaLoaderPlugin.ts
var THREE16 = __toESM(require("three"), 1);

// src/utils/resolveURL.ts
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

// src/meta/VRMMetaLoaderPlugin.ts
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
    return __async(this, null, function* () {
      gltf.userData.vrmMeta = yield this._import(gltf);
    });
  }
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
    return __async(this, null, function* () {
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
    return __async(this, null, function* () {
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

// src/VRMCore.ts
var VRMCore = class {
  /**
   * Create a new VRM instance.
   *
   * @param params [[VRMParameters]] that represents components of the VRM
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

// src/VRMCoreLoaderPlugin.ts
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
    return __async(this, null, function* () {
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIiwgIi4uL3NyYy9leHByZXNzaW9ucy9WUk1FeHByZXNzaW9uLnRzIiwgIi4uL3NyYy9leHByZXNzaW9ucy9WUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luLnRzIiwgIi4uL3NyYy91dGlscy9nbHRmRXh0cmFjdFByaW1pdGl2ZXNGcm9tTm9kZS50cyIsICIuLi9zcmMvZXhwcmVzc2lvbnMvVlJNRXhwcmVzc2lvblByZXNldE5hbWUudHMiLCAiLi4vc3JjL3V0aWxzL3NhdHVyYXRlLnRzIiwgIi4uL3NyYy9leHByZXNzaW9ucy9WUk1FeHByZXNzaW9uTWFuYWdlci50cyIsICIuLi9zcmMvZXhwcmVzc2lvbnMvVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JUeXBlLnRzIiwgIi4uL3NyYy9leHByZXNzaW9ucy9WUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvckJpbmQudHMiLCAiLi4vc3JjL2V4cHJlc3Npb25zL1ZSTUV4cHJlc3Npb25Nb3JwaFRhcmdldEJpbmQudHMiLCAiLi4vc3JjL2V4cHJlc3Npb25zL1ZSTUV4cHJlc3Npb25UZXh0dXJlVHJhbnNmb3JtQmluZC50cyIsICIuLi9zcmMvZXhwcmVzc2lvbnMvVlJNRXhwcmVzc2lvbk92ZXJyaWRlVHlwZS50cyIsICIuLi9zcmMvZmlyc3RQZXJzb24vVlJNRmlyc3RQZXJzb24udHMiLCAiLi4vc3JjL2ZpcnN0UGVyc29uL1ZSTUZpcnN0UGVyc29uTG9hZGVyUGx1Z2luLnRzIiwgIi4uL3NyYy9maXJzdFBlcnNvbi9WUk1GaXJzdFBlcnNvbk1lc2hBbm5vdGF0aW9uVHlwZS50cyIsICIuLi9zcmMvaHVtYW5vaWQvaGVscGVycy9WUk1IdW1hbm9pZEhlbHBlci50cyIsICIuLi9zcmMvaHVtYW5vaWQvVlJNSHVtYW5Cb25lTGlzdC50cyIsICIuLi9zcmMvaHVtYW5vaWQvVlJNSHVtYW5Cb25lTmFtZS50cyIsICIuLi9zcmMvaHVtYW5vaWQvVlJNSHVtYW5Cb25lUGFyZW50TWFwLnRzIiwgIi4uL3NyYy9odW1hbm9pZC9WUk1SaWcudHMiLCAiLi4vc3JjL3V0aWxzL3F1YXRJbnZlcnRDb21wYXQudHMiLCAiLi4vc3JjL2h1bWFub2lkL1ZSTUh1bWFub2lkUmlnLnRzIiwgIi4uL3NyYy9odW1hbm9pZC9WUk1IdW1hbm9pZC50cyIsICIuLi9zcmMvaHVtYW5vaWQvVlJNUmVxdWlyZWRIdW1hbkJvbmVOYW1lLnRzIiwgIi4uL3NyYy9odW1hbm9pZC9WUk1IdW1hbm9pZExvYWRlclBsdWdpbi50cyIsICIuLi9zcmMvbG9va0F0L2hlbHBlcnMvVlJNTG9va0F0SGVscGVyLnRzIiwgIi4uL3NyYy9sb29rQXQvaGVscGVycy91dGlscy9GYW5CdWZmZXJHZW9tZXRyeS50cyIsICIuLi9zcmMvbG9va0F0L2hlbHBlcnMvdXRpbHMvTGluZUFuZFNwaGVyZUJ1ZmZlckdlb21ldHJ5LnRzIiwgIi4uL3NyYy9sb29rQXQvVlJNTG9va0F0LnRzIiwgIi4uL3NyYy91dGlscy9nZXRXb3JsZFF1YXRlcm5pb25MaXRlLnRzIiwgIi4uL3NyYy9sb29rQXQvdXRpbHMvY2FsY0F6aW11dGhBbHRpdHVkZS50cyIsICIuLi9zcmMvbG9va0F0L3V0aWxzL3Nhbml0aXplQW5nbGUudHMiLCAiLi4vc3JjL2xvb2tBdC9WUk1Mb29rQXRCb25lQXBwbGllci50cyIsICIuLi9zcmMvbG9va0F0L1ZSTUxvb2tBdEV4cHJlc3Npb25BcHBsaWVyLnRzIiwgIi4uL3NyYy9sb29rQXQvVlJNTG9va0F0UmFuZ2VNYXAudHMiLCAiLi4vc3JjL2xvb2tBdC9WUk1Mb29rQXRMb2FkZXJQbHVnaW4udHMiLCAiLi4vc3JjL2xvb2tBdC9WUk1Mb29rQXRUeXBlTmFtZS50cyIsICIuLi9zcmMvbWV0YS9WUk1NZXRhTG9hZGVyUGx1Z2luLnRzIiwgIi4uL3NyYy91dGlscy9yZXNvbHZlVVJMLnRzIiwgIi4uL3NyYy9WUk1Db3JlLnRzIiwgIi4uL3NyYy9WUk1Db3JlTG9hZGVyUGx1Z2luLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgKiBmcm9tICcuL2V4cHJlc3Npb25zJztcbmV4cG9ydCAqIGZyb20gJy4vZmlyc3RQZXJzb24nO1xuZXhwb3J0ICogZnJvbSAnLi9odW1hbm9pZCc7XG5leHBvcnQgKiBmcm9tICcuL2xvb2tBdCc7XG5leHBvcnQgKiBmcm9tICcuL21ldGEnO1xuXG5leHBvcnQgeyBWUk1Db3JlIH0gZnJvbSAnLi9WUk1Db3JlJztcbmV4cG9ydCB7IFZSTUNvcmVMb2FkZXJQbHVnaW4gfSBmcm9tICcuL1ZSTUNvcmVMb2FkZXJQbHVnaW4nO1xuZXhwb3J0IHR5cGUgeyBWUk1Db3JlTG9hZGVyUGx1Z2luT3B0aW9ucyB9IGZyb20gJy4vVlJNQ29yZUxvYWRlclBsdWdpbk9wdGlvbnMnO1xuZXhwb3J0IHR5cGUgeyBWUk1Db3JlUGFyYW1ldGVycyB9IGZyb20gJy4vVlJNQ29yZVBhcmFtZXRlcnMnO1xuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTUV4cHJlc3Npb25CaW5kIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uQmluZCc7XG5pbXBvcnQgdHlwZSB7IFZSTUV4cHJlc3Npb25PdmVycmlkZVR5cGUgfSBmcm9tICcuL1ZSTUV4cHJlc3Npb25PdmVycmlkZVR5cGUnO1xuXG4vLyBhbmltYXRpb25NaXhlciBcdTMwNkVcdTc2RTNcdTg5OTZcdTVCRkVcdThDNjFcdTMwNkZcdTMwMDFTY2VuZSBcdTMwNkVcdTRFMkRcdTMwNkJcdTUxNjVcdTMwNjNcdTMwNjZcdTMwNDRcdTMwOEJcdTVGQzVcdTg5ODFcdTMwNENcdTMwNDJcdTMwOEJcdTMwMDJcbi8vIFx1MzA1RFx1MzA2RVx1MzA1Rlx1MzA4MVx1MzAwMVx1ODg2OFx1NzkzQVx1MzBBQVx1MzBENlx1MzBCOFx1MzBBN1x1MzBBRlx1MzBDOFx1MzA2N1x1MzA2Rlx1MzA2QVx1MzA0NFx1MzA1MVx1MzA4Q1x1MzA2OVx1MzAwMU9iamVjdDNEIFx1MzA5Mlx1N0Q5OVx1NjI3Rlx1MzA1N1x1MzA2NiBTY2VuZSBcdTMwNkJcdTYyOTVcdTUxNjVcdTMwNjdcdTMwNERcdTMwOEJcdTMwODhcdTMwNDZcdTMwNkJcdTMwNTlcdTMwOEJcdTMwMDJcbmV4cG9ydCBjbGFzcyBWUk1FeHByZXNzaW9uIGV4dGVuZHMgVEhSRUUuT2JqZWN0M0Qge1xuICAvKipcbiAgICogTmFtZSBvZiB0aGlzIGV4cHJlc3Npb24uXG4gICAqIERpc3Rpbmd1aXNoZWQgd2l0aCBgbmFtZWAgc2luY2UgYG5hbWVgIHdpbGwgYmUgY29uZmxpY3RlZCB3aXRoIE9iamVjdDNELlxuICAgKi9cbiAgcHVibGljIGV4cHJlc3Npb25OYW1lOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50IHdlaWdodCBvZiB0aGUgZXhwcmVzc2lvbi5cbiAgICovXG4gIHB1YmxpYyB3ZWlnaHQgPSAwLjA7XG5cbiAgLyoqXG4gICAqIEludGVycHJldCB2YWx1ZXMgZ3JlYXRlciB0aGFuIDAuNSBhcyAxLjAsIG9ydGhlcndpc2UgMC4wLlxuICAgKi9cbiAgcHVibGljIGlzQmluYXJ5ID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFNwZWNpZnkgaG93IHRoZSBleHByZXNzaW9uIG92ZXJyaWRlcyBibGluayBleHByZXNzaW9ucy5cbiAgICovXG4gIHB1YmxpYyBvdmVycmlkZUJsaW5rOiBWUk1FeHByZXNzaW9uT3ZlcnJpZGVUeXBlID0gJ25vbmUnO1xuXG4gIC8qKlxuICAgKiBTcGVjaWZ5IGhvdyB0aGUgZXhwcmVzc2lvbiBvdmVycmlkZXMgbG9va0F0IGV4cHJlc3Npb25zLlxuICAgKi9cbiAgcHVibGljIG92ZXJyaWRlTG9va0F0OiBWUk1FeHByZXNzaW9uT3ZlcnJpZGVUeXBlID0gJ25vbmUnO1xuXG4gIC8qKlxuICAgKiBTcGVjaWZ5IGhvdyB0aGUgZXhwcmVzc2lvbiBvdmVycmlkZXMgbW91dGggZXhwcmVzc2lvbnMuXG4gICAqL1xuICBwdWJsaWMgb3ZlcnJpZGVNb3V0aDogVlJNRXhwcmVzc2lvbk92ZXJyaWRlVHlwZSA9ICdub25lJztcblxuICBwcml2YXRlIF9iaW5kczogVlJNRXhwcmVzc2lvbkJpbmRbXSA9IFtdO1xuXG4gIG92ZXJyaWRlIHJlYWRvbmx5IHR5cGU6IHN0cmluZyB8ICdWUk1FeHByZXNzaW9uJztcblxuICAvKipcbiAgICogQSB2YWx1ZSByZXByZXNlbnRzIGhvdyBtdWNoIGl0IHNob3VsZCBvdmVycmlkZSBibGluayBleHByZXNzaW9ucy5cbiAgICogYDAuMGAgPT0gbm8gb3ZlcnJpZGUgYXQgYWxsLCBgMS4wYCA9PSBjb21wbGV0ZWx5IGJsb2NrIHRoZSBleHByZXNzaW9ucy5cbiAgICovXG4gIHB1YmxpYyBnZXQgb3ZlcnJpZGVCbGlua0Ftb3VudCgpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLm92ZXJyaWRlQmxpbmsgPT09ICdibG9jaycpIHtcbiAgICAgIHJldHVybiAwLjAgPCB0aGlzLndlaWdodCA/IDEuMCA6IDAuMDtcbiAgICB9IGVsc2UgaWYgKHRoaXMub3ZlcnJpZGVCbGluayA9PT0gJ2JsZW5kJykge1xuICAgICAgcmV0dXJuIHRoaXMud2VpZ2h0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gMC4wO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBIHZhbHVlIHJlcHJlc2VudHMgaG93IG11Y2ggaXQgc2hvdWxkIG92ZXJyaWRlIGxvb2tBdCBleHByZXNzaW9ucy5cbiAgICogYDAuMGAgPT0gbm8gb3ZlcnJpZGUgYXQgYWxsLCBgMS4wYCA9PSBjb21wbGV0ZWx5IGJsb2NrIHRoZSBleHByZXNzaW9ucy5cbiAgICovXG4gIHB1YmxpYyBnZXQgb3ZlcnJpZGVMb29rQXRBbW91bnQoKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5vdmVycmlkZUxvb2tBdCA9PT0gJ2Jsb2NrJykge1xuICAgICAgcmV0dXJuIDAuMCA8IHRoaXMud2VpZ2h0ID8gMS4wIDogMC4wO1xuICAgIH0gZWxzZSBpZiAodGhpcy5vdmVycmlkZUxvb2tBdCA9PT0gJ2JsZW5kJykge1xuICAgICAgcmV0dXJuIHRoaXMud2VpZ2h0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gMC4wO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBIHZhbHVlIHJlcHJlc2VudHMgaG93IG11Y2ggaXQgc2hvdWxkIG92ZXJyaWRlIG1vdXRoIGV4cHJlc3Npb25zLlxuICAgKiBgMC4wYCA9PSBubyBvdmVycmlkZSBhdCBhbGwsIGAxLjBgID09IGNvbXBsZXRlbHkgYmxvY2sgdGhlIGV4cHJlc3Npb25zLlxuICAgKi9cbiAgcHVibGljIGdldCBvdmVycmlkZU1vdXRoQW1vdW50KCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMub3ZlcnJpZGVNb3V0aCA9PT0gJ2Jsb2NrJykge1xuICAgICAgcmV0dXJuIDAuMCA8IHRoaXMud2VpZ2h0ID8gMS4wIDogMC4wO1xuICAgIH0gZWxzZSBpZiAodGhpcy5vdmVycmlkZU1vdXRoID09PSAnYmxlbmQnKSB7XG4gICAgICByZXR1cm4gdGhpcy53ZWlnaHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAwLjA7XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IoZXhwcmVzc2lvbk5hbWU6IHN0cmluZykge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLm5hbWUgPSBgVlJNRXhwcmVzc2lvbl8ke2V4cHJlc3Npb25OYW1lfWA7XG4gICAgdGhpcy5leHByZXNzaW9uTmFtZSA9IGV4cHJlc3Npb25OYW1lO1xuXG4gICAgLy8gdHJhdmVyc2UgXHU2NjQyXHUzMDZFXHU2NTUxXHU2RTA4XHU2MjRCXHU2QkI1XHUzMDY4XHUzMDU3XHUzMDY2IE9iamVjdDNEIFx1MzA2N1x1MzA2Rlx1MzA2QVx1MzA0NFx1MzA1M1x1MzA2OFx1MzA5Mlx1NjYwRVx1NzkzQVx1MzA1N1x1MzA2Nlx1MzA0QVx1MzA0RlxuICAgIHRoaXMudHlwZSA9ICdWUk1FeHByZXNzaW9uJztcblxuICAgIC8vIFx1ODg2OFx1NzkzQVx1NzZFRVx1NzY4NFx1MzA2RVx1MzBBQVx1MzBENlx1MzBCOFx1MzBBN1x1MzBBRlx1MzBDOFx1MzA2N1x1MzA2Rlx1MzA2QVx1MzA0NFx1MzA2RVx1MzA2N1x1MzAwMVx1OENBMFx1ODM3N1x1OEVGRFx1NkUxQlx1MzA2RVx1MzA1Rlx1MzA4MVx1MzA2QiB2aXNpYmxlIFx1MzA5MiBmYWxzZSBcdTMwNkJcdTMwNTdcdTMwNjZcdTMwNEFcdTMwNEZcdTMwMDJcbiAgICAvLyBcdTMwNTNcdTMwOENcdTMwNkJcdTMwODhcdTMwOEFcdTMwMDFcdTMwNTNcdTMwNkVcdTMwQTRcdTMwRjNcdTMwQjlcdTMwQkZcdTMwRjNcdTMwQjlcdTMwNkJcdTVCRkVcdTMwNTlcdTMwOEJcdTZCQ0VcdTMwRDVcdTMwRUNcdTMwRkNcdTMwRTBcdTMwNkUgbWF0cml4IFx1ODFFQVx1NTJENVx1OEEwOFx1N0I5N1x1MzA5Mlx1NzcwMVx1NzU2NVx1MzA2N1x1MzA0RFx1MzA4Qlx1MzAwMlxuICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xuICB9XG5cbiAgcHVibGljIGFkZEJpbmQoYmluZDogVlJNRXhwcmVzc2lvbkJpbmQpOiB2b2lkIHtcbiAgICB0aGlzLl9iaW5kcy5wdXNoKGJpbmQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHdlaWdodCB0byBldmVyeSBhc3NpZ25lZCBibGVuZCBzaGFwZXMuXG4gICAqIFNob3VsZCBiZSBjYWxsZWQgZXZlcnkgZnJhbWUuXG4gICAqL1xuICBwdWJsaWMgYXBwbHlXZWlnaHQob3B0aW9ucz86IHtcbiAgICAvKipcbiAgICAgKiBNdWx0aXBsaWVzIGEgdmFsdWUgdG8gaXRzIHdlaWdodCB0byBhcHBseS5cbiAgICAgKiBJbnRlbmRlZCB0byBiZSB1c2VkIGZvciBvdmVycmlkaW5nIGFuIGV4cHJlc3Npb24gd2VpZ2h0IGJ5IGFub3RoZXIgZXhwcmVzc2lvbi5cbiAgICAgKiBTZWUgYWxzbzoge0BsaW5rIG92ZXJyaWRlQmxpbmt9LCB7QGxpbmsgb3ZlcnJpZGVMb29rQXR9LCB7QGxpbmsgb3ZlcnJpZGVNb3V0aH1cbiAgICAgKi9cbiAgICBtdWx0aXBsaWVyPzogbnVtYmVyO1xuICB9KTogdm9pZCB7XG4gICAgbGV0IGFjdHVhbFdlaWdodCA9IHRoaXMuaXNCaW5hcnkgPyAodGhpcy53ZWlnaHQgPD0gMC41ID8gMC4wIDogMS4wKSA6IHRoaXMud2VpZ2h0O1xuICAgIGFjdHVhbFdlaWdodCAqPSBvcHRpb25zPy5tdWx0aXBsaWVyID8/IDEuMDtcblxuICAgIHRoaXMuX2JpbmRzLmZvckVhY2goKGJpbmQpID0+IGJpbmQuYXBwbHlXZWlnaHQoYWN0dWFsV2VpZ2h0KSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXIgcHJldmlvdXNseSBhc3NpZ25lZCBibGVuZCBzaGFwZXMuXG4gICAqL1xuICBwdWJsaWMgY2xlYXJBcHBsaWVkV2VpZ2h0KCk6IHZvaWQge1xuICAgIHRoaXMuX2JpbmRzLmZvckVhY2goKGJpbmQpID0+IGJpbmQuY2xlYXJBcHBsaWVkV2VpZ2h0KCkpO1xuICB9XG59XG4iLCAiaW1wb3J0IHR5cGUgKiBhcyBWMFZSTSBmcm9tICdAcGl4aXYvdHlwZXMtdnJtLTAuMCc7XG5pbXBvcnQgdHlwZSAqIGFzIFYxVlJNU2NoZW1hIGZyb20gJ0BwaXhpdi90eXBlcy12cm1jLXZybS0xLjAnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgR0xURiwgR0xURkxvYWRlclBsdWdpbiwgR0xURlBhcnNlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXIuanMnO1xuaW1wb3J0IHsgZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGUgfSBmcm9tICcuLi91dGlscy9nbHRmRXh0cmFjdFByaW1pdGl2ZXNGcm9tTm9kZSc7XG5pbXBvcnQgeyBWUk1FeHByZXNzaW9uIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uJztcbmltcG9ydCB7IFZSTUV4cHJlc3Npb25NYW5hZ2VyIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uTWFuYWdlcic7XG5pbXBvcnQgeyB2MEV4cHJlc3Npb25NYXRlcmlhbENvbG9yTWFwIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGUnO1xuaW1wb3J0IHsgVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JCaW5kIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvckJpbmQnO1xuaW1wb3J0IHsgVlJNRXhwcmVzc2lvbk1vcnBoVGFyZ2V0QmluZCB9IGZyb20gJy4vVlJNRXhwcmVzc2lvbk1vcnBoVGFyZ2V0QmluZCc7XG5pbXBvcnQgeyBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSB9IGZyb20gJy4vVlJNRXhwcmVzc2lvblByZXNldE5hbWUnO1xuaW1wb3J0IHsgVlJNRXhwcmVzc2lvblRleHR1cmVUcmFuc2Zvcm1CaW5kIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uVGV4dHVyZVRyYW5zZm9ybUJpbmQnO1xuaW1wb3J0IHsgR0xURiBhcyBHTFRGU2NoZW1hIH0gZnJvbSAnQGdsdGYtdHJhbnNmb3JtL2NvcmUnO1xuXG4vKipcbiAqIFBvc3NpYmxlIHNwZWMgdmVyc2lvbnMgaXQgcmVjb2duaXplcy5cbiAqL1xuY29uc3QgUE9TU0lCTEVfU1BFQ19WRVJTSU9OUyA9IG5ldyBTZXQoWycxLjAnLCAnMS4wLWJldGEnXSk7XG5cbi8qKlxuICogQSBwbHVnaW4gb2YgR0xURkxvYWRlciB0aGF0IGltcG9ydHMgYSB7QGxpbmsgVlJNRXhwcmVzc2lvbk1hbmFnZXJ9IGZyb20gYSBWUk0gZXh0ZW5zaW9uIG9mIGEgR0xURi5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUV4cHJlc3Npb25Mb2FkZXJQbHVnaW4gaW1wbGVtZW50cyBHTFRGTG9hZGVyUGx1Z2luIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSB2MHYxUHJlc2V0TmFtZU1hcDogeyBbdjBOYW1lIGluIFYwVlJNLkJsZW5kU2hhcGVQcmVzZXROYW1lXT86IFZSTUV4cHJlc3Npb25QcmVzZXROYW1lIH0gPSB7XG4gICAgYTogJ2FhJyxcbiAgICBlOiAnZWUnLFxuICAgIGk6ICdpaCcsXG4gICAgbzogJ29oJyxcbiAgICB1OiAnb3UnLFxuICAgIGJsaW5rOiAnYmxpbmsnLFxuICAgIGpveTogJ2hhcHB5JyxcbiAgICBhbmdyeTogJ2FuZ3J5JyxcbiAgICBzb3Jyb3c6ICdzYWQnLFxuICAgIGZ1bjogJ3JlbGF4ZWQnLFxuICAgIGxvb2t1cDogJ2xvb2tVcCcsXG4gICAgbG9va2Rvd246ICdsb29rRG93bicsXG4gICAgbG9va2xlZnQ6ICdsb29rTGVmdCcsXG4gICAgbG9va3JpZ2h0OiAnbG9va1JpZ2h0JyxcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXG4gICAgYmxpbmtfbDogJ2JsaW5rTGVmdCcsXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxuICAgIGJsaW5rX3I6ICdibGlua1JpZ2h0JyxcbiAgICBuZXV0cmFsOiAnbmV1dHJhbCcsXG4gIH07XG5cbiAgcHVibGljIHJlYWRvbmx5IHBhcnNlcjogR0xURlBhcnNlcjtcblxuICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICAvLyBXZSBzaG91bGQgdXNlIHRoZSBleHRlbnNpb24gbmFtZSBpbnN0ZWFkIGJ1dCB3ZSBoYXZlIG11bHRpcGxlIHBsdWdpbnMgZm9yIGFuIGV4dGVuc2lvbi4uLlxuICAgIHJldHVybiAnVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbic7XG4gIH1cblxuICBwdWJsaWMgY29uc3RydWN0b3IocGFyc2VyOiBHTFRGUGFyc2VyKSB7XG4gICAgdGhpcy5wYXJzZXIgPSBwYXJzZXI7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgYWZ0ZXJSb290KGdsdGY6IEdMVEYpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBnbHRmLnVzZXJEYXRhLnZybUV4cHJlc3Npb25NYW5hZ2VyID0gYXdhaXQgdGhpcy5faW1wb3J0KGdsdGYpO1xuICB9XG5cbiAgLyoqXG4gICAqIEltcG9ydCBhIHtAbGluayBWUk1FeHByZXNzaW9uTWFuYWdlcn0gZnJvbSBhIFZSTS5cbiAgICpcbiAgICogQHBhcmFtIGdsdGYgQSBwYXJzZWQgcmVzdWx0IG9mIEdMVEYgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gICAqL1xuICBwcml2YXRlIGFzeW5jIF9pbXBvcnQoZ2x0ZjogR0xURik6IFByb21pc2U8VlJNRXhwcmVzc2lvbk1hbmFnZXIgfCBudWxsPiB7XG4gICAgY29uc3QgdjFSZXN1bHQgPSBhd2FpdCB0aGlzLl92MUltcG9ydChnbHRmKTtcbiAgICBpZiAodjFSZXN1bHQpIHtcbiAgICAgIHJldHVybiB2MVJlc3VsdDtcbiAgICB9XG5cbiAgICBjb25zdCB2MFJlc3VsdCA9IGF3YWl0IHRoaXMuX3YwSW1wb3J0KGdsdGYpO1xuICAgIGlmICh2MFJlc3VsdCkge1xuICAgICAgcmV0dXJuIHYwUmVzdWx0O1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfdjFJbXBvcnQoZ2x0ZjogR0xURik6IFByb21pc2U8VlJNRXhwcmVzc2lvbk1hbmFnZXIgfCBudWxsPiB7XG4gICAgY29uc3QganNvbiA9IHRoaXMucGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAgIC8vIGVhcmx5IGFib3J0IGlmIGl0IGRvZXNuJ3QgdXNlIHZybVxuICAgIGNvbnN0IGlzVlJNVXNlZCA9IGpzb24uZXh0ZW5zaW9uc1VzZWQ/LmluZGV4T2YoJ1ZSTUNfdnJtJykgIT09IC0xO1xuICAgIGlmICghaXNWUk1Vc2VkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBleHRlbnNpb24gPSBqc29uLmV4dGVuc2lvbnM/LlsnVlJNQ192cm0nXSBhcyBWMVZSTVNjaGVtYS5WUk1DVlJNIHwgdW5kZWZpbmVkO1xuICAgIGlmICghZXh0ZW5zaW9uKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzcGVjVmVyc2lvbiA9IGV4dGVuc2lvbi5zcGVjVmVyc2lvbjtcbiAgICBpZiAoIVBPU1NJQkxFX1NQRUNfVkVSU0lPTlMuaGFzKHNwZWNWZXJzaW9uKSkge1xuICAgICAgY29uc29sZS53YXJuKGBWUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luOiBVbmtub3duIFZSTUNfdnJtIHNwZWNWZXJzaW9uIFwiJHtzcGVjVmVyc2lvbn1cImApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc2NoZW1hRXhwcmVzc2lvbnMgPSBleHRlbnNpb24uZXhwcmVzc2lvbnM7XG4gICAgaWYgKCFzY2hlbWFFeHByZXNzaW9ucykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gbGlzdCBleHByZXNzaW9uc1xuICAgIGNvbnN0IHByZXNldE5hbWVTZXQgPSBuZXcgU2V0PHN0cmluZz4oT2JqZWN0LnZhbHVlcyhWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSkpO1xuICAgIGNvbnN0IG5hbWVTY2hlbWFFeHByZXNzaW9uTWFwID0gbmV3IE1hcDxzdHJpbmcsIFYxVlJNU2NoZW1hLkV4cHJlc3Npb24+KCk7XG5cbiAgICBpZiAoc2NoZW1hRXhwcmVzc2lvbnMucHJlc2V0ICE9IG51bGwpIHtcbiAgICAgIE9iamVjdC5lbnRyaWVzKHNjaGVtYUV4cHJlc3Npb25zLnByZXNldCkuZm9yRWFjaCgoW25hbWUsIHNjaGVtYUV4cHJlc3Npb25dKSA9PiB7XG4gICAgICAgIGlmIChzY2hlbWFFeHByZXNzaW9uID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gLy8gdHlwZXNjcmlwdFxuXG4gICAgICAgIGlmICghcHJlc2V0TmFtZVNldC5oYXMobmFtZSkpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oYFZSTUV4cHJlc3Npb25Mb2FkZXJQbHVnaW46IFVua25vd24gcHJlc2V0IG5hbWUgXCIke25hbWV9XCIgZGV0ZWN0ZWQuIElnbm9yaW5nIHRoZSBleHByZXNzaW9uYCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbmFtZVNjaGVtYUV4cHJlc3Npb25NYXAuc2V0KG5hbWUsIHNjaGVtYUV4cHJlc3Npb24pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHNjaGVtYUV4cHJlc3Npb25zLmN1c3RvbSAhPSBudWxsKSB7XG4gICAgICBPYmplY3QuZW50cmllcyhzY2hlbWFFeHByZXNzaW9ucy5jdXN0b20pLmZvckVhY2goKFtuYW1lLCBzY2hlbWFFeHByZXNzaW9uXSkgPT4ge1xuICAgICAgICBpZiAocHJlc2V0TmFtZVNldC5oYXMobmFtZSkpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICBgVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbjogQ3VzdG9tIGV4cHJlc3Npb24gY2Fubm90IGhhdmUgcHJlc2V0IG5hbWUgXCIke25hbWV9XCIuIElnbm9yaW5nIHRoZSBleHByZXNzaW9uYCxcbiAgICAgICAgICApO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIG5hbWVTY2hlbWFFeHByZXNzaW9uTWFwLnNldChuYW1lLCBzY2hlbWFFeHByZXNzaW9uKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIHByZXBhcmUgbWFuYWdlclxuICAgIGNvbnN0IG1hbmFnZXIgPSBuZXcgVlJNRXhwcmVzc2lvbk1hbmFnZXIoKTtcblxuICAgIC8vIGxvYWQgZXhwcmVzc2lvbnNcbiAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIEFycmF5LmZyb20obmFtZVNjaGVtYUV4cHJlc3Npb25NYXAuZW50cmllcygpKS5tYXAoYXN5bmMgKFtuYW1lLCBzY2hlbWFFeHByZXNzaW9uXSkgPT4ge1xuICAgICAgICBjb25zdCBleHByZXNzaW9uID0gbmV3IFZSTUV4cHJlc3Npb24obmFtZSk7XG4gICAgICAgIGdsdGYuc2NlbmUuYWRkKGV4cHJlc3Npb24pO1xuXG4gICAgICAgIGV4cHJlc3Npb24uaXNCaW5hcnkgPSBzY2hlbWFFeHByZXNzaW9uLmlzQmluYXJ5ID8/IGZhbHNlO1xuICAgICAgICBleHByZXNzaW9uLm92ZXJyaWRlQmxpbmsgPSBzY2hlbWFFeHByZXNzaW9uLm92ZXJyaWRlQmxpbmsgPz8gJ25vbmUnO1xuICAgICAgICBleHByZXNzaW9uLm92ZXJyaWRlTG9va0F0ID0gc2NoZW1hRXhwcmVzc2lvbi5vdmVycmlkZUxvb2tBdCA/PyAnbm9uZSc7XG4gICAgICAgIGV4cHJlc3Npb24ub3ZlcnJpZGVNb3V0aCA9IHNjaGVtYUV4cHJlc3Npb24ub3ZlcnJpZGVNb3V0aCA/PyAnbm9uZSc7XG5cbiAgICAgICAgc2NoZW1hRXhwcmVzc2lvbi5tb3JwaFRhcmdldEJpbmRzPy5mb3JFYWNoKGFzeW5jIChiaW5kKSA9PiB7XG4gICAgICAgICAgaWYgKGJpbmQubm9kZSA9PT0gdW5kZWZpbmVkIHx8IGJpbmQuaW5kZXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHByaW1pdGl2ZXMgPSAoYXdhaXQgZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGUoZ2x0ZiwgYmluZC5ub2RlKSkhO1xuICAgICAgICAgIGNvbnN0IG1vcnBoVGFyZ2V0SW5kZXggPSBiaW5kLmluZGV4O1xuXG4gICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIG1lc2ggaGFzIHRoZSB0YXJnZXQgbW9ycGggdGFyZ2V0XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgIXByaW1pdGl2ZXMuZXZlcnkoXG4gICAgICAgICAgICAgIChwcmltaXRpdmUpID0+XG4gICAgICAgICAgICAgICAgQXJyYXkuaXNBcnJheShwcmltaXRpdmUubW9ycGhUYXJnZXRJbmZsdWVuY2VzKSAmJlxuICAgICAgICAgICAgICAgIG1vcnBoVGFyZ2V0SW5kZXggPCBwcmltaXRpdmUubW9ycGhUYXJnZXRJbmZsdWVuY2VzLmxlbmd0aCxcbiAgICAgICAgICAgIClcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgICAgYFZSTUV4cHJlc3Npb25Mb2FkZXJQbHVnaW46ICR7c2NoZW1hRXhwcmVzc2lvbi5uYW1lfSBhdHRlbXB0cyB0byBpbmRleCBtb3JwaCAjJHttb3JwaFRhcmdldEluZGV4fSBidXQgbm90IGZvdW5kLmAsXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGV4cHJlc3Npb24uYWRkQmluZChcbiAgICAgICAgICAgIG5ldyBWUk1FeHByZXNzaW9uTW9ycGhUYXJnZXRCaW5kKHtcbiAgICAgICAgICAgICAgcHJpbWl0aXZlcyxcbiAgICAgICAgICAgICAgaW5kZXg6IG1vcnBoVGFyZ2V0SW5kZXgsXG4gICAgICAgICAgICAgIHdlaWdodDogYmluZC53ZWlnaHQgPz8gMS4wLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHNjaGVtYUV4cHJlc3Npb24ubWF0ZXJpYWxDb2xvckJpbmRzIHx8IHNjaGVtYUV4cHJlc3Npb24udGV4dHVyZVRyYW5zZm9ybUJpbmRzKSB7XG4gICAgICAgICAgLy8gbGlzdCB1cCBldmVyeSBtYXRlcmlhbCBpbiBgZ2x0Zi5zY2VuZWBcbiAgICAgICAgICBjb25zdCBnbHRmTWF0ZXJpYWxzOiBUSFJFRS5NYXRlcmlhbFtdID0gW107XG4gICAgICAgICAgZ2x0Zi5zY2VuZS50cmF2ZXJzZSgob2JqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtYXRlcmlhbCA9IChvYmplY3QgYXMgYW55KS5tYXRlcmlhbCBhcyBUSFJFRS5NYXRlcmlhbCB8IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGlmIChtYXRlcmlhbCkge1xuICAgICAgICAgICAgICBnbHRmTWF0ZXJpYWxzLnB1c2gobWF0ZXJpYWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgc2NoZW1hRXhwcmVzc2lvbi5tYXRlcmlhbENvbG9yQmluZHM/LmZvckVhY2goYXN5bmMgKGJpbmQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1hdGVyaWFscyA9IGdsdGZNYXRlcmlhbHMuZmlsdGVyKChtYXRlcmlhbCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBtYXRlcmlhbEluZGV4ID0gdGhpcy5wYXJzZXIuYXNzb2NpYXRpb25zLmdldChtYXRlcmlhbCk/Lm1hdGVyaWFscztcbiAgICAgICAgICAgICAgcmV0dXJuIGJpbmQubWF0ZXJpYWwgPT09IG1hdGVyaWFsSW5kZXg7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbWF0ZXJpYWxzLmZvckVhY2goKG1hdGVyaWFsKSA9PiB7XG4gICAgICAgICAgICAgIGV4cHJlc3Npb24uYWRkQmluZChcbiAgICAgICAgICAgICAgICBuZXcgVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JCaW5kKHtcbiAgICAgICAgICAgICAgICAgIG1hdGVyaWFsLFxuICAgICAgICAgICAgICAgICAgdHlwZTogYmluZC50eXBlLFxuICAgICAgICAgICAgICAgICAgdGFyZ2V0VmFsdWU6IG5ldyBUSFJFRS5Db2xvcigpLmZyb21BcnJheShiaW5kLnRhcmdldFZhbHVlKSxcbiAgICAgICAgICAgICAgICAgIHRhcmdldEFscGhhOiBiaW5kLnRhcmdldFZhbHVlWzNdLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBzY2hlbWFFeHByZXNzaW9uLnRleHR1cmVUcmFuc2Zvcm1CaW5kcz8uZm9yRWFjaChhc3luYyAoYmluZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWxzID0gZ2x0Zk1hdGVyaWFscy5maWx0ZXIoKG1hdGVyaWFsKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IG1hdGVyaWFsSW5kZXggPSB0aGlzLnBhcnNlci5hc3NvY2lhdGlvbnMuZ2V0KG1hdGVyaWFsKT8ubWF0ZXJpYWxzO1xuICAgICAgICAgICAgICByZXR1cm4gYmluZC5tYXRlcmlhbCA9PT0gbWF0ZXJpYWxJbmRleDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBtYXRlcmlhbHMuZm9yRWFjaCgobWF0ZXJpYWwpID0+IHtcbiAgICAgICAgICAgICAgZXhwcmVzc2lvbi5hZGRCaW5kKFxuICAgICAgICAgICAgICAgIG5ldyBWUk1FeHByZXNzaW9uVGV4dHVyZVRyYW5zZm9ybUJpbmQoe1xuICAgICAgICAgICAgICAgICAgbWF0ZXJpYWwsXG4gICAgICAgICAgICAgICAgICBvZmZzZXQ6IG5ldyBUSFJFRS5WZWN0b3IyKCkuZnJvbUFycmF5KGJpbmQub2Zmc2V0ID8/IFswLjAsIDAuMF0pLFxuICAgICAgICAgICAgICAgICAgc2NhbGU6IG5ldyBUSFJFRS5WZWN0b3IyKCkuZnJvbUFycmF5KGJpbmQuc2NhbGUgPz8gWzEuMCwgMS4wXSksXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIG1hbmFnZXIucmVnaXN0ZXJFeHByZXNzaW9uKGV4cHJlc3Npb24pO1xuICAgICAgfSksXG4gICAgKTtcblxuICAgIHJldHVybiBtYW5hZ2VyO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfdjBJbXBvcnQoZ2x0ZjogR0xURik6IFByb21pc2U8VlJNRXhwcmVzc2lvbk1hbmFnZXIgfCBudWxsPiB7XG4gICAgY29uc3QganNvbiA9IHRoaXMucGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAgIC8vIGVhcmx5IGFib3J0IGlmIGl0IGRvZXNuJ3QgdXNlIHZybVxuICAgIGNvbnN0IHZybUV4dCA9IGpzb24uZXh0ZW5zaW9ucz8uVlJNIGFzIFYwVlJNLlZSTSB8IHVuZGVmaW5lZDtcbiAgICBpZiAoIXZybUV4dCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc2NoZW1hQmxlbmRTaGFwZSA9IHZybUV4dC5ibGVuZFNoYXBlTWFzdGVyO1xuICAgIGlmICghc2NoZW1hQmxlbmRTaGFwZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgbWFuYWdlciA9IG5ldyBWUk1FeHByZXNzaW9uTWFuYWdlcigpO1xuXG4gICAgY29uc3Qgc2NoZW1hQmxlbmRTaGFwZUdyb3VwcyA9IHNjaGVtYUJsZW5kU2hhcGUuYmxlbmRTaGFwZUdyb3VwcztcbiAgICBpZiAoIXNjaGVtYUJsZW5kU2hhcGVHcm91cHMpIHtcbiAgICAgIHJldHVybiBtYW5hZ2VyO1xuICAgIH1cblxuICAgIGNvbnN0IGJsZW5kU2hhcGVOYW1lU2V0ID0gbmV3IFNldDxzdHJpbmc+KCk7XG5cbiAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIHNjaGVtYUJsZW5kU2hhcGVHcm91cHMubWFwKGFzeW5jIChzY2hlbWFHcm91cCkgPT4ge1xuICAgICAgICBjb25zdCB2MFByZXNldE5hbWUgPSBzY2hlbWFHcm91cC5wcmVzZXROYW1lO1xuICAgICAgICBjb25zdCB2MVByZXNldE5hbWUgPVxuICAgICAgICAgICh2MFByZXNldE5hbWUgIT0gbnVsbCAmJiBWUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luLnYwdjFQcmVzZXROYW1lTWFwW3YwUHJlc2V0TmFtZV0pIHx8IG51bGw7XG4gICAgICAgIGNvbnN0IG5hbWUgPSB2MVByZXNldE5hbWUgPz8gc2NoZW1hR3JvdXAubmFtZTtcblxuICAgICAgICBpZiAobmFtZSA9PSBudWxsKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKCdWUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luOiBPbmUgb2YgY3VzdG9tIGV4cHJlc3Npb25zIGhhcyBubyBuYW1lLiBJZ25vcmluZyB0aGUgZXhwcmVzc2lvbicpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGR1cGxpY2F0aW9uIGNoZWNrXG4gICAgICAgIGlmIChibGVuZFNoYXBlTmFtZVNldC5oYXMobmFtZSkpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICBgVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbjogQW4gZXhwcmVzc2lvbiBwcmVzZXQgJHt2MFByZXNldE5hbWV9IGhhcyBkdXBsaWNhdGVkIGVudHJpZXMuIElnbm9yaW5nIHRoZSBleHByZXNzaW9uYCxcbiAgICAgICAgICApO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGJsZW5kU2hhcGVOYW1lU2V0LmFkZChuYW1lKTtcblxuICAgICAgICBjb25zdCBleHByZXNzaW9uID0gbmV3IFZSTUV4cHJlc3Npb24obmFtZSk7XG4gICAgICAgIGdsdGYuc2NlbmUuYWRkKGV4cHJlc3Npb24pO1xuXG4gICAgICAgIGV4cHJlc3Npb24uaXNCaW5hcnkgPSBzY2hlbWFHcm91cC5pc0JpbmFyeSA/PyBmYWxzZTtcbiAgICAgICAgLy8gdjAgZG9lc24ndCBoYXZlIGlnbm9yZSBwcm9wZXJ0aWVzXG5cbiAgICAgICAgLy8gQmluZCBtb3JwaFRhcmdldFxuICAgICAgICBpZiAoc2NoZW1hR3JvdXAuYmluZHMpIHtcbiAgICAgICAgICBzY2hlbWFHcm91cC5iaW5kcy5mb3JFYWNoKGFzeW5jIChiaW5kKSA9PiB7XG4gICAgICAgICAgICBpZiAoYmluZC5tZXNoID09PSB1bmRlZmluZWQgfHwgYmluZC5pbmRleCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3Qgbm9kZXNVc2luZ01lc2g6IG51bWJlcltdID0gW107XG4gICAgICAgICAgICBqc29uLm5vZGVzPy5mb3JFYWNoKChub2RlLCBpKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChub2RlLm1lc2ggPT09IGJpbmQubWVzaCkge1xuICAgICAgICAgICAgICAgIG5vZGVzVXNpbmdNZXNoLnB1c2goaSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjb25zdCBtb3JwaFRhcmdldEluZGV4ID0gYmluZC5pbmRleDtcblxuICAgICAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgICAgICAgIG5vZGVzVXNpbmdNZXNoLm1hcChhc3luYyAobm9kZUluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJpbWl0aXZlcyA9IChhd2FpdCBnbHRmRXh0cmFjdFByaW1pdGl2ZXNGcm9tTm9kZShnbHRmLCBub2RlSW5kZXgpKSE7XG5cbiAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgbWVzaCBoYXMgdGhlIHRhcmdldCBtb3JwaCB0YXJnZXRcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAhcHJpbWl0aXZlcy5ldmVyeShcbiAgICAgICAgICAgICAgICAgICAgKHByaW1pdGl2ZSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICBBcnJheS5pc0FycmF5KHByaW1pdGl2ZS5tb3JwaFRhcmdldEluZmx1ZW5jZXMpICYmXG4gICAgICAgICAgICAgICAgICAgICAgbW9ycGhUYXJnZXRJbmRleCA8IHByaW1pdGl2ZS5tb3JwaFRhcmdldEluZmx1ZW5jZXMubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgICAgICAgICBgVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbjogJHtzY2hlbWFHcm91cC5uYW1lfSBhdHRlbXB0cyB0byBpbmRleCAke21vcnBoVGFyZ2V0SW5kZXh9dGggbW9ycGggYnV0IG5vdCBmb3VuZC5gLFxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBleHByZXNzaW9uLmFkZEJpbmQoXG4gICAgICAgICAgICAgICAgICBuZXcgVlJNRXhwcmVzc2lvbk1vcnBoVGFyZ2V0QmluZCh7XG4gICAgICAgICAgICAgICAgICAgIHByaW1pdGl2ZXMsXG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiBtb3JwaFRhcmdldEluZGV4LFxuICAgICAgICAgICAgICAgICAgICB3ZWlnaHQ6IDAuMDEgKiAoYmluZC53ZWlnaHQgPz8gMTAwKSwgLy8gbmFycm93aW5nIHRoZSByYW5nZSBmcm9tIFsgMC4wIC0gMTAwLjAgXSB0byBbIDAuMCAtIDEuMCBdXG4gICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCaW5kIE1hdGVyaWFsQ29sb3IgYW5kIFRleHR1cmVUcmFuc2Zvcm1cbiAgICAgICAgY29uc3QgbWF0ZXJpYWxWYWx1ZXMgPSBzY2hlbWFHcm91cC5tYXRlcmlhbFZhbHVlcztcbiAgICAgICAgaWYgKG1hdGVyaWFsVmFsdWVzICYmIG1hdGVyaWFsVmFsdWVzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgIG1hdGVyaWFsVmFsdWVzLmZvckVhY2goKG1hdGVyaWFsVmFsdWUpID0+IHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgbWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbE5hbWUgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICBtYXRlcmlhbFZhbHVlLnByb3BlcnR5TmFtZSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgIG1hdGVyaWFsVmFsdWUudGFyZ2V0VmFsdWUgPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBcdTMwQTJcdTMwRDBcdTMwQkZcdTMwRkNcdTMwNkVcdTMwQUFcdTMwRDZcdTMwQjhcdTMwQTdcdTMwQUZcdTMwQzhcdTMwNkJcdThBMkRcdTVCOUFcdTMwNTVcdTMwOENcdTMwNjZcdTMwNDRcdTMwOEJcdTMwREVcdTMwQzZcdTMwRUFcdTMwQTJcdTMwRUJcdTMwNkVcdTUxODVcdTMwNEJcdTMwODlcbiAgICAgICAgICAgICAqIG1hdGVyaWFsVmFsdWVcdTMwNjdcdTYzMDdcdTVCOUFcdTMwNTVcdTMwOENcdTMwNjZcdTMwNDRcdTMwOEJcdTMwREVcdTMwQzZcdTMwRUFcdTMwQTJcdTMwRUJcdTMwOTJcdTk2QzZcdTMwODFcdTMwOEJcdTMwMDJcbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBcdTcyNzlcdTVCOUFcdTMwNkJcdTMwNkZcdTU0MERcdTUyNERcdTMwOTJcdTRGN0ZcdTc1MjhcdTMwNTlcdTMwOEJcdTMwMDJcbiAgICAgICAgICAgICAqIFx1MzBBMlx1MzBBNlx1MzBDOFx1MzBFOVx1MzBBNFx1MzBGM1x1NjNDRlx1NzUzQlx1NzUyOFx1MzA2RVx1MzBERVx1MzBDNlx1MzBFQVx1MzBBMlx1MzBFQlx1MzA4Mlx1NTQwQ1x1NjY0Mlx1MzA2Qlx1OTZDNlx1MzA4MVx1MzA4Qlx1MzAwMlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBjb25zdCBtYXRlcmlhbHM6IFRIUkVFLk1hdGVyaWFsW10gPSBbXTtcbiAgICAgICAgICAgIGdsdGYuc2NlbmUudHJhdmVyc2UoKG9iamVjdCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoKG9iamVjdCBhcyBhbnkpLm1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWw6IFRIUkVFLk1hdGVyaWFsW10gfCBUSFJFRS5NYXRlcmlhbCA9IChvYmplY3QgYXMgYW55KS5tYXRlcmlhbDtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShtYXRlcmlhbCkpIHtcbiAgICAgICAgICAgICAgICAgIG1hdGVyaWFscy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAuLi5tYXRlcmlhbC5maWx0ZXIoXG4gICAgICAgICAgICAgICAgICAgICAgKG10bCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIChtdGwubmFtZSA9PT0gbWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbE5hbWUhIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG10bC5uYW1lID09PSBtYXRlcmlhbFZhbHVlLm1hdGVyaWFsTmFtZSEgKyAnIChPdXRsaW5lKScpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbHMuaW5kZXhPZihtdGwpID09PSAtMSxcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChtYXRlcmlhbC5uYW1lID09PSBtYXRlcmlhbFZhbHVlLm1hdGVyaWFsTmFtZSAmJiBtYXRlcmlhbHMuaW5kZXhPZihtYXRlcmlhbCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICBtYXRlcmlhbHMucHVzaChtYXRlcmlhbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWxQcm9wZXJ0eU5hbWUgPSBtYXRlcmlhbFZhbHVlLnByb3BlcnR5TmFtZTtcbiAgICAgICAgICAgIG1hdGVyaWFscy5mb3JFYWNoKChtYXRlcmlhbCkgPT4ge1xuICAgICAgICAgICAgICAvLyBUZXh0dXJlVHJhbnNmb3JtQmluZFxuICAgICAgICAgICAgICBpZiAobWF0ZXJpYWxQcm9wZXJ0eU5hbWUgPT09ICdfTWFpblRleF9TVCcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzY2FsZSA9IG5ldyBUSFJFRS5WZWN0b3IyKG1hdGVyaWFsVmFsdWUudGFyZ2V0VmFsdWUhWzBdLCBtYXRlcmlhbFZhbHVlLnRhcmdldFZhbHVlIVsxXSk7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gbmV3IFRIUkVFLlZlY3RvcjIobWF0ZXJpYWxWYWx1ZS50YXJnZXRWYWx1ZSFbMl0sIG1hdGVyaWFsVmFsdWUudGFyZ2V0VmFsdWUhWzNdKTtcblxuICAgICAgICAgICAgICAgIG9mZnNldC55ID0gMS4wIC0gb2Zmc2V0LnkgLSBzY2FsZS55O1xuXG4gICAgICAgICAgICAgICAgZXhwcmVzc2lvbi5hZGRCaW5kKFxuICAgICAgICAgICAgICAgICAgbmV3IFZSTUV4cHJlc3Npb25UZXh0dXJlVHJhbnNmb3JtQmluZCh7XG4gICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsLFxuICAgICAgICAgICAgICAgICAgICBzY2FsZSxcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0LFxuICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIC8vIE1hdGVyaWFsQ29sb3JCaW5kXG4gICAgICAgICAgICAgIGNvbnN0IG1hdGVyaWFsQ29sb3JUeXBlID0gdjBFeHByZXNzaW9uTWF0ZXJpYWxDb2xvck1hcFttYXRlcmlhbFByb3BlcnR5TmFtZV07XG4gICAgICAgICAgICAgIGlmIChtYXRlcmlhbENvbG9yVHlwZSkge1xuICAgICAgICAgICAgICAgIGV4cHJlc3Npb24uYWRkQmluZChcbiAgICAgICAgICAgICAgICAgIG5ldyBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvckJpbmQoe1xuICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbCxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogbWF0ZXJpYWxDb2xvclR5cGUsXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFZhbHVlOiBuZXcgVEhSRUUuQ29sb3IoKS5mcm9tQXJyYXkobWF0ZXJpYWxWYWx1ZS50YXJnZXRWYWx1ZSEpLFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRBbHBoYTogbWF0ZXJpYWxWYWx1ZS50YXJnZXRWYWx1ZSFbM10sXG4gICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgY29uc29sZS53YXJuKG1hdGVyaWFsUHJvcGVydHlOYW1lICsgJyBpcyBub3Qgc3VwcG9ydGVkJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIG1hbmFnZXIucmVnaXN0ZXJFeHByZXNzaW9uKGV4cHJlc3Npb24pO1xuICAgICAgfSksXG4gICAgKTtcblxuICAgIHJldHVybiBtYW5hZ2VyO1xuICB9XG59XG4iLCAiaW1wb3J0IHR5cGUgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgdHlwZSB7IEdMVEYgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyLmpzJztcbmltcG9ydCB7IEdMVEYgYXMgR0xURlNjaGVtYSB9IGZyb20gJ0BnbHRmLXRyYW5zZm9ybS9jb3JlJztcblxuZnVuY3Rpb24gZXh0cmFjdFByaW1pdGl2ZXNJbnRlcm5hbChnbHRmOiBHTFRGLCBub2RlSW5kZXg6IG51bWJlciwgbm9kZTogVEhSRUUuT2JqZWN0M0QpOiBUSFJFRS5NZXNoW10gfCBudWxsIHtcbiAgY29uc3QganNvbiA9IGdsdGYucGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAvKipcbiAgICogTGV0J3MgbGlzdCB1cCBldmVyeSBwb3NzaWJsZSBwYXR0ZXJucyB0aGF0IHBhcnNlZCBnbHRmIG5vZGVzIHdpdGggYSBtZXNoIGNhbiBoYXZlLCwsXG4gICAqXG4gICAqIFwiKlwiIGluZGljYXRlcyB0aGF0IHRob3NlIG1lc2hlcyBzaG91bGQgYmUgbGlzdGVkIHVwIHVzaW5nIHRoaXMgZnVuY3Rpb25cbiAgICpcbiAgICogIyMjIEEgbm9kZSB3aXRoIGEgKG1lc2gsIGEgc2lnbmxlIHByaW1pdGl2ZSlcbiAgICpcbiAgICogLSBgVEhSRUUuTWVzaGA6IFRoZSBvbmx5IHByaW1pdGl2ZSBvZiB0aGUgbWVzaCAqXG4gICAqXG4gICAqICMjIyBBIG5vZGUgd2l0aCBhIChtZXNoLCBtdWx0aXBsZSBwcmltaXRpdmVzKVxuICAgKlxuICAgKiAtIGBUSFJFRS5Hcm91cGA6IFRoZSByb290IG9mIHRoZSBtZXNoXG4gICAqICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoICpcbiAgICogICAtIGBUSFJFRS5NZXNoYDogQSBwcmltaXRpdmUgb2YgdGhlIG1lc2ggKDIpICpcbiAgICpcbiAgICogIyMjIEEgbm9kZSB3aXRoIGEgKG1lc2gsIG11bHRpcGxlIHByaW1pdGl2ZXMpIEFORCAoYSBjaGlsZCB3aXRoIGEgbWVzaCwgYSBzaW5nbGUgcHJpbWl0aXZlKVxuICAgKlxuICAgKiAtIGBUSFJFRS5Hcm91cGA6IFRoZSByb290IG9mIHRoZSBtZXNoXG4gICAqICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoICpcbiAgICogICAtIGBUSFJFRS5NZXNoYDogQSBwcmltaXRpdmUgb2YgdGhlIG1lc2ggKDIpICpcbiAgICogICAtIGBUSFJFRS5NZXNoYDogQSBwcmltaXRpdmUgb2YgYSBNRVNIIE9GIFRIRSBDSElMRFxuICAgKlxuICAgKiAjIyMgQSBub2RlIHdpdGggYSAobWVzaCwgbXVsdGlwbGUgcHJpbWl0aXZlcykgQU5EIChhIGNoaWxkIHdpdGggYSBtZXNoLCBtdWx0aXBsZSBwcmltaXRpdmVzKVxuICAgKlxuICAgKiAtIGBUSFJFRS5Hcm91cGA6IFRoZSByb290IG9mIHRoZSBtZXNoXG4gICAqICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoICpcbiAgICogICAtIGBUSFJFRS5NZXNoYDogQSBwcmltaXRpdmUgb2YgdGhlIG1lc2ggKDIpICpcbiAgICogICAtIGBUSFJFRS5Hcm91cGA6IFRoZSByb290IG9mIGEgTUVTSCBPRiBUSEUgQ0hJTERcbiAgICogICAgIC0gYFRIUkVFLk1lc2hgOiBBIHByaW1pdGl2ZSBvZiB0aGUgbWVzaCBvZiB0aGUgY2hpbGRcbiAgICogICAgIC0gYFRIUkVFLk1lc2hgOiBBIHByaW1pdGl2ZSBvZiB0aGUgbWVzaCBvZiB0aGUgY2hpbGQgKDIpXG4gICAqXG4gICAqICMjIyBBIG5vZGUgd2l0aCBhIChtZXNoLCBtdWx0aXBsZSBwcmltaXRpdmVzKSBCVVQgdGhlIG5vZGUgaXMgYSBib25lXG4gICAqXG4gICAqIC0gYFRIUkVFLkJvbmVgOiBUaGUgcm9vdCBvZiB0aGUgbm9kZSwgYXMgYSBib25lXG4gICAqICAgLSBgVEhSRUUuR3JvdXBgOiBUaGUgcm9vdCBvZiB0aGUgbWVzaFxuICAgKiAgICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoICpcbiAgICogICAgIC0gYFRIUkVFLk1lc2hgOiBBIHByaW1pdGl2ZSBvZiB0aGUgbWVzaCAoMikgKlxuICAgKlxuICAgKiAjIyMgQSBub2RlIHdpdGggYSAobWVzaCwgbXVsdGlwbGUgcHJpbWl0aXZlcykgQU5EIChhIGNoaWxkIHdpdGggYSBtZXNoLCBtdWx0aXBsZSBwcmltaXRpdmVzKSBCVVQgdGhlIG5vZGUgaXMgYSBib25lXG4gICAqXG4gICAqIC0gYFRIUkVFLkJvbmVgOiBUaGUgcm9vdCBvZiB0aGUgbm9kZSwgYXMgYSBib25lXG4gICAqICAgLSBgVEhSRUUuR3JvdXBgOiBUaGUgcm9vdCBvZiB0aGUgbWVzaFxuICAgKiAgICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoICpcbiAgICogICAgIC0gYFRIUkVFLk1lc2hgOiBBIHByaW1pdGl2ZSBvZiB0aGUgbWVzaCAoMikgKlxuICAgKiAgIC0gYFRIUkVFLkdyb3VwYDogVGhlIHJvb3Qgb2YgYSBNRVNIIE9GIFRIRSBDSElMRFxuICAgKiAgICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoIG9mIHRoZSBjaGlsZFxuICAgKiAgICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoIG9mIHRoZSBjaGlsZCAoMilcbiAgICpcbiAgICogLi4uSSB3aWxsIHRha2UgYSBzdHJhdGVneSB0aGF0IHRyYXZlcnNlcyB0aGUgcm9vdCBvZiB0aGUgbm9kZSBhbmQgdGFrZSBmaXJzdCAocHJpbWl0aXZlQ291bnQpIG1lc2hlcy5cbiAgICovXG5cbiAgLy8gTWFrZSBzdXJlIHRoYXQgdGhlIG5vZGUgaGFzIGEgbWVzaFxuICBjb25zdCBzY2hlbWFOb2RlID0ganNvbi5ub2Rlcz8uW25vZGVJbmRleF07XG4gIGlmIChzY2hlbWFOb2RlID09IG51bGwpIHtcbiAgICBjb25zb2xlLndhcm4oYGV4dHJhY3RQcmltaXRpdmVzSW50ZXJuYWw6IEF0dGVtcHQgdG8gdXNlIG5vZGVzWyR7bm9kZUluZGV4fV0gb2YgZ2xURiBidXQgdGhlIG5vZGUgZG9lc24ndCBleGlzdGApO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3QgbWVzaEluZGV4ID0gc2NoZW1hTm9kZS5tZXNoO1xuICBpZiAobWVzaEluZGV4ID09IG51bGwpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIEhvdyBtYW55IHByaW1pdGl2ZXMgdGhlIG1lc2ggaGFzP1xuICBjb25zdCBzY2hlbWFNZXNoID0ganNvbi5tZXNoZXM/LlttZXNoSW5kZXhdO1xuICBpZiAoc2NoZW1hTWVzaCA9PSBudWxsKSB7XG4gICAgY29uc29sZS53YXJuKGBleHRyYWN0UHJpbWl0aXZlc0ludGVybmFsOiBBdHRlbXB0IHRvIHVzZSBtZXNoZXNbJHttZXNoSW5kZXh9XSBvZiBnbFRGIGJ1dCB0aGUgbWVzaCBkb2Vzbid0IGV4aXN0YCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCBwcmltaXRpdmVDb3VudCA9IHNjaGVtYU1lc2gucHJpbWl0aXZlcy5sZW5ndGg7XG5cbiAgLy8gVHJhdmVyc2UgdGhlIG5vZGUgYW5kIHRha2UgZmlyc3QgKHByaW1pdGl2ZUNvdW50KSBtZXNoZXNcbiAgY29uc3QgcHJpbWl0aXZlczogVEhSRUUuTWVzaFtdID0gW107XG4gIG5vZGUudHJhdmVyc2UoKG9iamVjdCkgPT4ge1xuICAgIGlmIChwcmltaXRpdmVzLmxlbmd0aCA8IHByaW1pdGl2ZUNvdW50KSB7XG4gICAgICBpZiAoKG9iamVjdCBhcyBhbnkpLmlzTWVzaCkge1xuICAgICAgICBwcmltaXRpdmVzLnB1c2gob2JqZWN0IGFzIFRIUkVFLk1lc2gpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHByaW1pdGl2ZXM7XG59XG5cbi8qKlxuICogRXh0cmFjdCBwcmltaXRpdmVzICggYFRIUkVFLk1lc2hbXWAgKSBvZiBhIG5vZGUgZnJvbSBhIGxvYWRlZCBHTFRGLlxuICogVGhlIG1haW4gcHVycG9zZSBvZiB0aGlzIGZ1bmN0aW9uIGlzIHRvIGRpc3Rpbmd1aXNoIHByaW1pdGl2ZXMgYW5kIGNoaWxkcmVuIGZyb20gYSBub2RlIHRoYXQgaGFzIGJvdGggbWVzaGVzIGFuZCBjaGlsZHJlbi5cbiAqXG4gKiBJdCB1dGlsaXplcyB0aGUgYmVoYXZpb3IgdGhhdCBHTFRGTG9hZGVyIGFkZHMgbWVzaCBwcmltaXRpdmVzIHRvIHRoZSBub2RlIG9iamVjdCAoIGBUSFJFRS5Hcm91cGAgKSBmaXJzdCB0aGVuIGFkZHMgaXRzIGNoaWxkcmVuLlxuICpcbiAqIEBwYXJhbSBnbHRmIEEgR0xURiBvYmplY3QgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gKiBAcGFyYW0gbm9kZUluZGV4IFRoZSBpbmRleCBvZiB0aGUgbm9kZVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGUoZ2x0ZjogR0xURiwgbm9kZUluZGV4OiBudW1iZXIpOiBQcm9taXNlPFRIUkVFLk1lc2hbXSB8IG51bGw+IHtcbiAgY29uc3Qgbm9kZTogVEhSRUUuT2JqZWN0M0QgPSBhd2FpdCBnbHRmLnBhcnNlci5nZXREZXBlbmRlbmN5KCdub2RlJywgbm9kZUluZGV4KTtcbiAgcmV0dXJuIGV4dHJhY3RQcmltaXRpdmVzSW50ZXJuYWwoZ2x0Ziwgbm9kZUluZGV4LCBub2RlKTtcbn1cblxuLyoqXG4gKiBFeHRyYWN0IHByaW1pdGl2ZXMgKCBgVEhSRUUuTWVzaFtdYCApIG9mIG5vZGVzIGZyb20gYSBsb2FkZWQgR0xURi5cbiAqIFNlZSB7QGxpbmsgZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGV9IGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogSXQgcmV0dXJucyBhIG1hcCBmcm9tIG5vZGUgaW5kZXggdG8gZXh0cmFjdGlvbiByZXN1bHQuXG4gKiBJZiBhIG5vZGUgZG9lcyBub3QgaGF2ZSBhIG1lc2gsIHRoZSBlbnRyeSBmb3IgdGhlIG5vZGUgd2lsbCBub3QgYmUgcHV0IGluIHRoZSByZXR1cm5pbmcgbWFwLlxuICpcbiAqIEBwYXJhbSBnbHRmIEEgR0xURiBvYmplY3QgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnbHRmRXh0cmFjdFByaW1pdGl2ZXNGcm9tTm9kZXMoZ2x0ZjogR0xURik6IFByb21pc2U8TWFwPG51bWJlciwgVEhSRUUuTWVzaFtdPj4ge1xuICBjb25zdCBub2RlczogVEhSRUUuT2JqZWN0M0RbXSA9IGF3YWl0IGdsdGYucGFyc2VyLmdldERlcGVuZGVuY2llcygnbm9kZScpO1xuICBjb25zdCBtYXAgPSBuZXcgTWFwPG51bWJlciwgVEhSRUUuTWVzaFtdPigpO1xuXG4gIG5vZGVzLmZvckVhY2goKG5vZGUsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gZXh0cmFjdFByaW1pdGl2ZXNJbnRlcm5hbChnbHRmLCBpbmRleCwgbm9kZSk7XG4gICAgaWYgKHJlc3VsdCAhPSBudWxsKSB7XG4gICAgICBtYXAuc2V0KGluZGV4LCByZXN1bHQpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIG1hcDtcbn1cbiIsICIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cblxuZXhwb3J0IGNvbnN0IFZSTUV4cHJlc3Npb25QcmVzZXROYW1lID0ge1xuICBBYTogJ2FhJyxcbiAgSWg6ICdpaCcsXG4gIE91OiAnb3UnLFxuICBFZTogJ2VlJyxcbiAgT2g6ICdvaCcsXG4gIEJsaW5rOiAnYmxpbmsnLFxuICBIYXBweTogJ2hhcHB5JyxcbiAgQW5ncnk6ICdhbmdyeScsXG4gIFNhZDogJ3NhZCcsXG4gIFJlbGF4ZWQ6ICdyZWxheGVkJyxcbiAgTG9va1VwOiAnbG9va1VwJyxcbiAgU3VycHJpc2VkOiAnc3VycHJpc2VkJyxcbiAgTG9va0Rvd246ICdsb29rRG93bicsXG4gIExvb2tMZWZ0OiAnbG9va0xlZnQnLFxuICBMb29rUmlnaHQ6ICdsb29rUmlnaHQnLFxuICBCbGlua0xlZnQ6ICdibGlua0xlZnQnLFxuICBCbGlua1JpZ2h0OiAnYmxpbmtSaWdodCcsXG4gIE5ldXRyYWw6ICduZXV0cmFsJyxcbn0gYXMgY29uc3Q7XG5cbmV4cG9ydCB0eXBlIFZSTUV4cHJlc3Npb25QcmVzZXROYW1lID0gdHlwZW9mIFZSTUV4cHJlc3Npb25QcmVzZXROYW1lW2tleW9mIHR5cGVvZiBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZV07XG4iLCAiLyoqXG4gKiBDbGFtcCB0aGUgaW5wdXQgdmFsdWUgd2l0aGluIFswLjAgLSAxLjBdLlxuICpcbiAqIEBwYXJhbSB2YWx1ZSBUaGUgaW5wdXQgdmFsdWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNhdHVyYXRlKHZhbHVlOiBudW1iZXIpOiBudW1iZXIge1xuICByZXR1cm4gTWF0aC5tYXgoTWF0aC5taW4odmFsdWUsIDEuMCksIDAuMCk7XG59XG4iLCAiaW1wb3J0IHsgVlJNRXhwcmVzc2lvblByZXNldE5hbWUgfSBmcm9tICcuL1ZSTUV4cHJlc3Npb25QcmVzZXROYW1lJztcbmltcG9ydCB7IHNhdHVyYXRlIH0gZnJvbSAnLi4vdXRpbHMvc2F0dXJhdGUnO1xuaW1wb3J0IHR5cGUgeyBWUk1FeHByZXNzaW9uIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uJztcblxuZXhwb3J0IGNsYXNzIFZSTUV4cHJlc3Npb25NYW5hZ2VyIHtcbiAgLyoqXG4gICAqIEEgc2V0IG9mIG5hbWUgb3IgcHJlc2V0IG5hbWUgb2YgZXhwcmVzc2lvbnMgdGhhdCB3aWxsIGJlIG92ZXJyaWRkZW4gYnkge0BsaW5rIFZSTUV4cHJlc3Npb24ub3ZlcnJpZGVCbGlua30uXG4gICAqL1xuICBwdWJsaWMgYmxpbmtFeHByZXNzaW9uTmFtZXMgPSBbJ2JsaW5rJywgJ2JsaW5rTGVmdCcsICdibGlua1JpZ2h0J107XG5cbiAgLyoqXG4gICAqIEEgc2V0IG9mIG5hbWUgb3IgcHJlc2V0IG5hbWUgb2YgZXhwcmVzc2lvbnMgdGhhdCB3aWxsIGJlIG92ZXJyaWRkZW4gYnkge0BsaW5rIFZSTUV4cHJlc3Npb24ub3ZlcnJpZGVMb29rQXR9LlxuICAgKi9cbiAgcHVibGljIGxvb2tBdEV4cHJlc3Npb25OYW1lcyA9IFsnbG9va0xlZnQnLCAnbG9va1JpZ2h0JywgJ2xvb2tVcCcsICdsb29rRG93biddO1xuXG4gIC8qKlxuICAgKiBBIHNldCBvZiBuYW1lIG9yIHByZXNldCBuYW1lIG9mIGV4cHJlc3Npb25zIHRoYXQgd2lsbCBiZSBvdmVycmlkZGVuIGJ5IHtAbGluayBWUk1FeHByZXNzaW9uLm92ZXJyaWRlTW91dGh9LlxuICAgKi9cbiAgcHVibGljIG1vdXRoRXhwcmVzc2lvbk5hbWVzID0gWydhYScsICdlZScsICdpaCcsICdvaCcsICdvdSddO1xuXG4gIC8qKlxuICAgKiBBIHNldCBvZiB7QGxpbmsgVlJNRXhwcmVzc2lvbn0uXG4gICAqIFdoZW4geW91IHdhbnQgdG8gcmVnaXN0ZXIgZXhwcmVzc2lvbnMsIHVzZSB7QGxpbmsgcmVnaXN0ZXJFeHByZXNzaW9ufVxuICAgKi9cbiAgcHJpdmF0ZSBfZXhwcmVzc2lvbnM6IFZSTUV4cHJlc3Npb25bXSA9IFtdO1xuICBwdWJsaWMgZ2V0IGV4cHJlc3Npb25zKCk6IFZSTUV4cHJlc3Npb25bXSB7XG4gICAgcmV0dXJuIHRoaXMuX2V4cHJlc3Npb25zLmNvbmNhdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgbWFwIGZyb20gbmFtZSB0byBleHByZXNzaW9uLlxuICAgKi9cbiAgcHJpdmF0ZSBfZXhwcmVzc2lvbk1hcDogeyBbbmFtZTogc3RyaW5nXTogVlJNRXhwcmVzc2lvbiB9ID0ge307XG4gIHB1YmxpYyBnZXQgZXhwcmVzc2lvbk1hcCgpOiB7IFtuYW1lOiBzdHJpbmddOiBWUk1FeHByZXNzaW9uIH0ge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB0aGlzLl9leHByZXNzaW9uTWFwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIG1hcCBmcm9tIG5hbWUgdG8gZXhwcmVzc2lvbiwgYnV0IGV4Y2x1ZGluZyBjdXN0b20gZXhwcmVzc2lvbnMuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHByZXNldEV4cHJlc3Npb25NYXAoKTogeyBbbmFtZSBpbiBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZV0/OiBWUk1FeHByZXNzaW9uIH0ge1xuICAgIGNvbnN0IHJlc3VsdDogeyBbbmFtZSBpbiBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZV0/OiBWUk1FeHByZXNzaW9uIH0gPSB7fTtcblxuICAgIGNvbnN0IHByZXNldE5hbWVTZXQgPSBuZXcgU2V0PHN0cmluZz4oT2JqZWN0LnZhbHVlcyhWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSkpO1xuXG4gICAgT2JqZWN0LmVudHJpZXModGhpcy5fZXhwcmVzc2lvbk1hcCkuZm9yRWFjaCgoW25hbWUsIGV4cHJlc3Npb25dKSA9PiB7XG4gICAgICBpZiAocHJlc2V0TmFtZVNldC5oYXMobmFtZSkpIHtcbiAgICAgICAgcmVzdWx0W25hbWUgYXMgVlJNRXhwcmVzc2lvblByZXNldE5hbWVdID0gZXhwcmVzc2lvbjtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQSBtYXAgZnJvbSBuYW1lIHRvIGV4cHJlc3Npb24sIGJ1dCBleGNsdWRpbmcgcHJlc2V0IGV4cHJlc3Npb25zLlxuICAgKi9cbiAgcHVibGljIGdldCBjdXN0b21FeHByZXNzaW9uTWFwKCk6IHsgW25hbWU6IHN0cmluZ106IFZSTUV4cHJlc3Npb24gfSB7XG4gICAgY29uc3QgcmVzdWx0OiB7IFtuYW1lOiBzdHJpbmddOiBWUk1FeHByZXNzaW9uIH0gPSB7fTtcblxuICAgIGNvbnN0IHByZXNldE5hbWVTZXQgPSBuZXcgU2V0PHN0cmluZz4oT2JqZWN0LnZhbHVlcyhWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSkpO1xuXG4gICAgT2JqZWN0LmVudHJpZXModGhpcy5fZXhwcmVzc2lvbk1hcCkuZm9yRWFjaCgoW25hbWUsIGV4cHJlc3Npb25dKSA9PiB7XG4gICAgICBpZiAoIXByZXNldE5hbWVTZXQuaGFzKG5hbWUpKSB7XG4gICAgICAgIHJlc3VsdFtuYW1lXSA9IGV4cHJlc3Npb247XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyB7QGxpbmsgVlJNRXhwcmVzc2lvbk1hbmFnZXJ9LlxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vIGRvIG5vdGhpbmdcbiAgfVxuXG4gIC8qKlxuICAgKiBDb3B5IHRoZSBnaXZlbiB7QGxpbmsgVlJNRXhwcmVzc2lvbk1hbmFnZXJ9IGludG8gdGhpcyBvbmUuXG4gICAqIEBwYXJhbSBzb3VyY2UgVGhlIHtAbGluayBWUk1FeHByZXNzaW9uTWFuYWdlcn0geW91IHdhbnQgdG8gY29weVxuICAgKiBAcmV0dXJucyB0aGlzXG4gICAqL1xuICBwdWJsaWMgY29weShzb3VyY2U6IFZSTUV4cHJlc3Npb25NYW5hZ2VyKTogdGhpcyB7XG4gICAgLy8gZmlyc3QgdW5yZWdpc3RlciBhbGwgdGhlIGV4cHJlc3Npb24gaXQgaGFzXG4gICAgY29uc3QgZXhwcmVzc2lvbnMgPSB0aGlzLl9leHByZXNzaW9ucy5jb25jYXQoKTtcbiAgICBleHByZXNzaW9ucy5mb3JFYWNoKChleHByZXNzaW9uKSA9PiB7XG4gICAgICB0aGlzLnVucmVnaXN0ZXJFeHByZXNzaW9uKGV4cHJlc3Npb24pO1xuICAgIH0pO1xuXG4gICAgLy8gdGhlbiByZWdpc3RlciBhbGwgdGhlIGV4cHJlc3Npb24gb2YgdGhlIHNvdXJjZVxuICAgIHNvdXJjZS5fZXhwcmVzc2lvbnMuZm9yRWFjaCgoZXhwcmVzc2lvbikgPT4ge1xuICAgICAgdGhpcy5yZWdpc3RlckV4cHJlc3Npb24oZXhwcmVzc2lvbik7XG4gICAgfSk7XG5cbiAgICAvLyBjb3B5IHJlbWFpbmluZyBtZW1iZXJzXG4gICAgdGhpcy5ibGlua0V4cHJlc3Npb25OYW1lcyA9IHNvdXJjZS5ibGlua0V4cHJlc3Npb25OYW1lcy5jb25jYXQoKTtcbiAgICB0aGlzLmxvb2tBdEV4cHJlc3Npb25OYW1lcyA9IHNvdXJjZS5sb29rQXRFeHByZXNzaW9uTmFtZXMuY29uY2F0KCk7XG4gICAgdGhpcy5tb3V0aEV4cHJlc3Npb25OYW1lcyA9IHNvdXJjZS5tb3V0aEV4cHJlc3Npb25OYW1lcy5jb25jYXQoKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBjbG9uZSBvZiB0aGlzIHtAbGluayBWUk1FeHByZXNzaW9uTWFuYWdlcn0uXG4gICAqIEByZXR1cm5zIENvcGllZCB7QGxpbmsgVlJNRXhwcmVzc2lvbk1hbmFnZXJ9XG4gICAqL1xuICBwdWJsaWMgY2xvbmUoKTogVlJNRXhwcmVzc2lvbk1hbmFnZXIge1xuICAgIHJldHVybiBuZXcgVlJNRXhwcmVzc2lvbk1hbmFnZXIoKS5jb3B5KHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhIHJlZ2lzdGVyZWQgZXhwcmVzc2lvbi5cbiAgICogSWYgaXQgY2Fubm90IGZpbmQgYW4gZXhwcmVzc2lvbiwgaXQgd2lsbCByZXR1cm4gYG51bGxgIGluc3RlYWQuXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb3IgcHJlc2V0IG5hbWUgb2YgdGhlIGV4cHJlc3Npb25cbiAgICovXG4gIHB1YmxpYyBnZXRFeHByZXNzaW9uKG5hbWU6IFZSTUV4cHJlc3Npb25QcmVzZXROYW1lIHwgc3RyaW5nKTogVlJNRXhwcmVzc2lvbiB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl9leHByZXNzaW9uTWFwW25hbWVdID8/IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXIgYW4gZXhwcmVzc2lvbi5cbiAgICpcbiAgICogQHBhcmFtIGV4cHJlc3Npb24ge0BsaW5rIFZSTUV4cHJlc3Npb259IHRoYXQgZGVzY3JpYmVzIHRoZSBleHByZXNzaW9uXG4gICAqL1xuICBwdWJsaWMgcmVnaXN0ZXJFeHByZXNzaW9uKGV4cHJlc3Npb246IFZSTUV4cHJlc3Npb24pOiB2b2lkIHtcbiAgICB0aGlzLl9leHByZXNzaW9ucy5wdXNoKGV4cHJlc3Npb24pO1xuICAgIHRoaXMuX2V4cHJlc3Npb25NYXBbZXhwcmVzc2lvbi5leHByZXNzaW9uTmFtZV0gPSBleHByZXNzaW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIFVucmVnaXN0ZXIgYW4gZXhwcmVzc2lvbi5cbiAgICpcbiAgICogQHBhcmFtIGV4cHJlc3Npb24gVGhlIGV4cHJlc3Npb24geW91IHdhbnQgdG8gdW5yZWdpc3RlclxuICAgKi9cbiAgcHVibGljIHVucmVnaXN0ZXJFeHByZXNzaW9uKGV4cHJlc3Npb246IFZSTUV4cHJlc3Npb24pOiB2b2lkIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuX2V4cHJlc3Npb25zLmluZGV4T2YoZXhwcmVzc2lvbik7XG4gICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgY29uc29sZS53YXJuKCdWUk1FeHByZXNzaW9uTWFuYWdlcjogVGhlIHNwZWNpZmllZCBleHByZXNzaW9ucyBpcyBub3QgcmVnaXN0ZXJlZCcpO1xuICAgIH1cblxuICAgIHRoaXMuX2V4cHJlc3Npb25zLnNwbGljZShpbmRleCwgMSk7XG4gICAgZGVsZXRlIHRoaXMuX2V4cHJlc3Npb25NYXBbZXhwcmVzc2lvbi5leHByZXNzaW9uTmFtZV07XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBjdXJyZW50IHdlaWdodCBvZiB0aGUgc3BlY2lmaWVkIGV4cHJlc3Npb24uXG4gICAqIElmIGl0IGRvZXNuJ3QgaGF2ZSBhbiBleHByZXNzaW9uIG9mIGdpdmVuIG5hbWUsIGl0IHdpbGwgcmV0dXJuIGBudWxsYCBpbnN0ZWFkLlxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBleHByZXNzaW9uXG4gICAqL1xuICBwdWJsaWMgZ2V0VmFsdWUobmFtZTogVlJNRXhwcmVzc2lvblByZXNldE5hbWUgfCBzdHJpbmcpOiBudW1iZXIgfCBudWxsIHtcbiAgICBjb25zdCBleHByZXNzaW9uID0gdGhpcy5nZXRFeHByZXNzaW9uKG5hbWUpO1xuICAgIHJldHVybiBleHByZXNzaW9uPy53ZWlnaHQgPz8gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgYSB3ZWlnaHQgdG8gdGhlIHNwZWNpZmllZCBleHByZXNzaW9uLlxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBleHByZXNzaW9uXG4gICAqIEBwYXJhbSB3ZWlnaHQgV2VpZ2h0XG4gICAqL1xuICBwdWJsaWMgc2V0VmFsdWUobmFtZTogVlJNRXhwcmVzc2lvblByZXNldE5hbWUgfCBzdHJpbmcsIHdlaWdodDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgZXhwcmVzc2lvbiA9IHRoaXMuZ2V0RXhwcmVzc2lvbihuYW1lKTtcbiAgICBpZiAoZXhwcmVzc2lvbikge1xuICAgICAgZXhwcmVzc2lvbi53ZWlnaHQgPSBzYXR1cmF0ZSh3ZWlnaHQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB3ZWlnaHRzIG9mIGFsbCBleHByZXNzaW9ucyB0byBgMC4wYC5cbiAgICovXG4gIHB1YmxpYyByZXNldFZhbHVlcygpOiB2b2lkIHtcbiAgICB0aGlzLl9leHByZXNzaW9ucy5mb3JFYWNoKChleHByZXNzaW9uKSA9PiB7XG4gICAgICBleHByZXNzaW9uLndlaWdodCA9IDAuMDtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSB0cmFjayBuYW1lIG9mIHNwZWNpZmllZCBleHByZXNzaW9uLlxuICAgKiBUaGlzIHRyYWNrIG5hbWUgaXMgbmVlZGVkIHRvIG1hbmlwdWxhdGUgaXRzIGV4cHJlc3Npb24gdmlhIGtleWZyYW1lIGFuaW1hdGlvbnMuXG4gICAqXG4gICAqIEBleGFtcGxlIE1hbmlwdWxhdGUgYW4gZXhwcmVzc2lvbiB1c2luZyBrZXlmcmFtZSBhbmltYXRpb25cbiAgICogYGBganNcbiAgICogY29uc3QgdHJhY2tOYW1lID0gdnJtLmV4cHJlc3Npb25NYW5hZ2VyLmdldEV4cHJlc3Npb25UcmFja05hbWUoICdibGluaycgKTtcbiAgICogY29uc3QgdHJhY2sgPSBuZXcgVEhSRUUuTnVtYmVyS2V5ZnJhbWVUcmFjayhcbiAgICogICBuYW1lLFxuICAgKiAgIFsgMC4wLCAwLjUsIDEuMCBdLCAvLyB0aW1lc1xuICAgKiAgIFsgMC4wLCAxLjAsIDAuMCBdIC8vIHZhbHVlc1xuICAgKiApO1xuICAgKlxuICAgKiBjb25zdCBjbGlwID0gbmV3IFRIUkVFLkFuaW1hdGlvbkNsaXAoXG4gICAqICAgJ2JsaW5rJywgLy8gbmFtZVxuICAgKiAgIDEuMCwgLy8gZHVyYXRpb25cbiAgICogICBbIHRyYWNrIF0gLy8gdHJhY2tzXG4gICAqICk7XG4gICAqXG4gICAqIGNvbnN0IG1peGVyID0gbmV3IFRIUkVFLkFuaW1hdGlvbk1peGVyKCB2cm0uc2NlbmUgKTtcbiAgICogY29uc3QgYWN0aW9uID0gbWl4ZXIuY2xpcEFjdGlvbiggY2xpcCApO1xuICAgKiBhY3Rpb24ucGxheSgpO1xuICAgKiBgYGBcbiAgICpcbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgZXhwcmVzc2lvblxuICAgKi9cbiAgcHVibGljIGdldEV4cHJlc3Npb25UcmFja05hbWUobmFtZTogVlJNRXhwcmVzc2lvblByZXNldE5hbWUgfCBzdHJpbmcpOiBzdHJpbmcgfCBudWxsIHtcbiAgICBjb25zdCBleHByZXNzaW9uID0gdGhpcy5nZXRFeHByZXNzaW9uKG5hbWUpO1xuICAgIHJldHVybiBleHByZXNzaW9uID8gYCR7ZXhwcmVzc2lvbi5uYW1lfS53ZWlnaHRgIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgZXZlcnkgZXhwcmVzc2lvbnMuXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIC8vIHNlZSBob3cgbXVjaCB3ZSBzaG91bGQgb3ZlcnJpZGUgY2VydGFpbiBleHByZXNzaW9uc1xuICAgIGNvbnN0IHdlaWdodE11bHRpcGxpZXJzID0gdGhpcy5fY2FsY3VsYXRlV2VpZ2h0TXVsdGlwbGllcnMoKTtcblxuICAgIC8vIHJlc2V0IGV4cHJlc3Npb24gYmluZHMgZmlyc3RcbiAgICB0aGlzLl9leHByZXNzaW9ucy5mb3JFYWNoKChleHByZXNzaW9uKSA9PiB7XG4gICAgICBleHByZXNzaW9uLmNsZWFyQXBwbGllZFdlaWdodCgpO1xuICAgIH0pO1xuXG4gICAgLy8gdGhlbiBhcHBseSBiaW5kc1xuICAgIHRoaXMuX2V4cHJlc3Npb25zLmZvckVhY2goKGV4cHJlc3Npb24pID0+IHtcbiAgICAgIGxldCBtdWx0aXBsaWVyID0gMS4wO1xuICAgICAgY29uc3QgbmFtZSA9IGV4cHJlc3Npb24uZXhwcmVzc2lvbk5hbWU7XG5cbiAgICAgIGlmICh0aGlzLmJsaW5rRXhwcmVzc2lvbk5hbWVzLmluZGV4T2YobmFtZSkgIT09IC0xKSB7XG4gICAgICAgIG11bHRpcGxpZXIgKj0gd2VpZ2h0TXVsdGlwbGllcnMuYmxpbms7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmxvb2tBdEV4cHJlc3Npb25OYW1lcy5pbmRleE9mKG5hbWUpICE9PSAtMSkge1xuICAgICAgICBtdWx0aXBsaWVyICo9IHdlaWdodE11bHRpcGxpZXJzLmxvb2tBdDtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMubW91dGhFeHByZXNzaW9uTmFtZXMuaW5kZXhPZihuYW1lKSAhPT0gLTEpIHtcbiAgICAgICAgbXVsdGlwbGllciAqPSB3ZWlnaHRNdWx0aXBsaWVycy5tb3V0aDtcbiAgICAgIH1cblxuICAgICAgZXhwcmVzc2lvbi5hcHBseVdlaWdodCh7IG11bHRpcGxpZXIgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlIHN1bSBvZiBvdmVycmlkZSBhbW91bnRzIHRvIHNlZSBob3cgbXVjaCB3ZSBzaG91bGQgbXVsdGlwbHkgd2VpZ2h0cyBvZiBjZXJ0YWluIGV4cHJlc3Npb25zLlxuICAgKi9cbiAgcHJpdmF0ZSBfY2FsY3VsYXRlV2VpZ2h0TXVsdGlwbGllcnMoKToge1xuICAgIGJsaW5rOiBudW1iZXI7XG4gICAgbG9va0F0OiBudW1iZXI7XG4gICAgbW91dGg6IG51bWJlcjtcbiAgfSB7XG4gICAgbGV0IGJsaW5rID0gMS4wO1xuICAgIGxldCBsb29rQXQgPSAxLjA7XG4gICAgbGV0IG1vdXRoID0gMS4wO1xuXG4gICAgdGhpcy5fZXhwcmVzc2lvbnMuZm9yRWFjaCgoZXhwcmVzc2lvbikgPT4ge1xuICAgICAgYmxpbmsgLT0gZXhwcmVzc2lvbi5vdmVycmlkZUJsaW5rQW1vdW50O1xuICAgICAgbG9va0F0IC09IGV4cHJlc3Npb24ub3ZlcnJpZGVMb29rQXRBbW91bnQ7XG4gICAgICBtb3V0aCAtPSBleHByZXNzaW9uLm92ZXJyaWRlTW91dGhBbW91bnQ7XG4gICAgfSk7XG5cbiAgICBibGluayA9IE1hdGgubWF4KDAuMCwgYmxpbmspO1xuICAgIGxvb2tBdCA9IE1hdGgubWF4KDAuMCwgbG9va0F0KTtcbiAgICBtb3V0aCA9IE1hdGgubWF4KDAuMCwgbW91dGgpO1xuXG4gICAgcmV0dXJuIHsgYmxpbmssIGxvb2tBdCwgbW91dGggfTtcbiAgfVxufVxuIiwgIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiAqL1xuXG5leHBvcnQgY29uc3QgVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JUeXBlID0ge1xuICBDb2xvcjogJ2NvbG9yJyxcbiAgRW1pc3Npb25Db2xvcjogJ2VtaXNzaW9uQ29sb3InLFxuICBTaGFkZUNvbG9yOiAnc2hhZGVDb2xvcicsXG4gIE1hdGNhcENvbG9yOiAnbWF0Y2FwQ29sb3InLFxuICBSaW1Db2xvcjogJ3JpbUNvbG9yJyxcbiAgT3V0bGluZUNvbG9yOiAnb3V0bGluZUNvbG9yJyxcbn0gYXMgY29uc3Q7XG5cbmV4cG9ydCB0eXBlIFZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yVHlwZSA9XG4gIHR5cGVvZiBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGVba2V5b2YgdHlwZW9mIFZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yVHlwZV07XG5cbmV4cG9ydCBjb25zdCB2MEV4cHJlc3Npb25NYXRlcmlhbENvbG9yTWFwOiB7IFtrZXk6IHN0cmluZ106IFZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yVHlwZSB8IHVuZGVmaW5lZCB9ID0ge1xuICBfQ29sb3I6IFZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yVHlwZS5Db2xvcixcbiAgX0VtaXNzaW9uQ29sb3I6IFZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yVHlwZS5FbWlzc2lvbkNvbG9yLFxuICBfU2hhZGVDb2xvcjogVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JUeXBlLlNoYWRlQ29sb3IsXG4gIF9SaW1Db2xvcjogVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JUeXBlLlJpbUNvbG9yLFxuICBfT3V0bGluZUNvbG9yOiBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGUuT3V0bGluZUNvbG9yLFxufTtcbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgdHlwZSB7IFZSTUV4cHJlc3Npb25CaW5kIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uQmluZCc7XG5pbXBvcnQgdHlwZSB7IFZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yVHlwZSB9IGZyb20gJy4vVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JUeXBlJztcblxuY29uc3QgX2NvbG9yID0gbmV3IFRIUkVFLkNvbG9yKCk7XG5cbmludGVyZmFjZSBDb2xvckJpbmRTdGF0ZSB7XG4gIHByb3BlcnR5TmFtZTogc3RyaW5nO1xuICBpbml0aWFsVmFsdWU6IFRIUkVFLkNvbG9yO1xuICBkZWx0YVZhbHVlOiBUSFJFRS5Db2xvcjtcbn1cblxuaW50ZXJmYWNlIEFscGhhQmluZFN0YXRlIHtcbiAgcHJvcGVydHlOYW1lOiBzdHJpbmc7XG4gIGluaXRpYWxWYWx1ZTogbnVtYmVyO1xuICBkZWx0YVZhbHVlOiBudW1iZXI7XG59XG5cbmludGVyZmFjZSBCaW5kU3RhdGUge1xuICBjb2xvcjogQ29sb3JCaW5kU3RhdGUgfCBudWxsO1xuICBhbHBoYTogQWxwaGFCaW5kU3RhdGUgfCBudWxsO1xufVxuXG4vKipcbiAqIEEgYmluZCBvZiBleHByZXNzaW9uIGluZmx1ZW5jZXMgdG8gYSBtYXRlcmlhbCBjb2xvci5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yQmluZCBpbXBsZW1lbnRzIFZSTUV4cHJlc3Npb25CaW5kIHtcbiAgLyoqXG4gICAqIE1hcHBpbmcgb2YgcHJvcGVydHkgbmFtZXMgZnJvbSBWUk1DL21hdGVyaWFsQ29sb3JCaW5kcy50eXBlIHRvIHRocmVlLmpzL01hdGVyaWFsLlxuICAgKiBUaGUgZmlyc3QgZWxlbWVudCBzdGFuZHMgZm9yIGNvbG9yIGNoYW5uZWxzLCB0aGUgc2Vjb25kIGVsZW1lbnQgc3RhbmRzIGZvciB0aGUgYWxwaGEgY2hhbm5lbC5cbiAgICogVGhlIHNlY29uZCBlbGVtZW50IGNhbiBiZSBudWxsIGlmIHRoZSB0YXJnZXQgcHJvcGVydHkgZG9lc24ndCBleGlzdC5cbiAgICovXG4gIC8vIFRPRE86IFdlIG1pZ2h0IHdhbnQgdG8gdXNlIHRoZSBgc2F0aXNmaWVzYCBvcGVyYXRvciBvbmNlIHdlIGJ1bXAgVFMgdG8gNC45IG9yIGhpZ2hlclxuICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9waXhpdi90aHJlZS12cm0vcHVsbC8xMzIzI2Rpc2N1c3Npb25fcjEzNzQwMjAwMzVcbiAgcHJpdmF0ZSBzdGF0aWMgX3Byb3BlcnR5TmFtZU1hcE1hcDoge1xuICAgIFtkaXN0aW5ndWlzaGVyOiBzdHJpbmddOiB7IFt0eXBlIGluIFZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yVHlwZV0/OiByZWFkb25seSBbc3RyaW5nLCBzdHJpbmcgfCBudWxsXSB9O1xuICB9ID0ge1xuICAgIGlzTWVzaFN0YW5kYXJkTWF0ZXJpYWw6IHtcbiAgICAgIGNvbG9yOiBbJ2NvbG9yJywgJ29wYWNpdHknXSxcbiAgICAgIGVtaXNzaW9uQ29sb3I6IFsnZW1pc3NpdmUnLCBudWxsXSxcbiAgICB9LFxuICAgIGlzTWVzaEJhc2ljTWF0ZXJpYWw6IHtcbiAgICAgIGNvbG9yOiBbJ2NvbG9yJywgJ29wYWNpdHknXSxcbiAgICB9LFxuICAgIGlzTVRvb25NYXRlcmlhbDoge1xuICAgICAgY29sb3I6IFsnY29sb3InLCAnb3BhY2l0eSddLFxuICAgICAgZW1pc3Npb25Db2xvcjogWydlbWlzc2l2ZScsIG51bGxdLFxuICAgICAgb3V0bGluZUNvbG9yOiBbJ291dGxpbmVDb2xvckZhY3RvcicsIG51bGxdLFxuICAgICAgbWF0Y2FwQ29sb3I6IFsnbWF0Y2FwRmFjdG9yJywgbnVsbF0sXG4gICAgICByaW1Db2xvcjogWydwYXJhbWV0cmljUmltQ29sb3JGYWN0b3InLCBudWxsXSxcbiAgICAgIHNoYWRlQ29sb3I6IFsnc2hhZGVDb2xvckZhY3RvcicsIG51bGxdLFxuICAgIH0sXG4gIH07XG5cbiAgLyoqXG4gICAqIFRoZSB0YXJnZXQgbWF0ZXJpYWwuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgbWF0ZXJpYWw6IFRIUkVFLk1hdGVyaWFsO1xuXG4gIC8qKlxuICAgKiBUaGUgdHlwZSBvZiB0aGUgdGFyZ2V0IHByb3BlcnR5IG9mIHRoZSBtYXRlcmlhbC5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSB0eXBlOiBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGU7XG5cbiAgLyoqXG4gICAqIFRoZSB0YXJnZXQgY29sb3IuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgdGFyZ2V0VmFsdWU6IFRIUkVFLkNvbG9yO1xuXG4gIC8qKlxuICAgKiBUaGUgdGFyZ2V0IGFscGhhLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IHRhcmdldEFscGhhOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEl0cyBiaW5kaW5nIHN0YXRlLlxuICAgKiBJZiBpdCBjYW5ub3QgZmluZCB0aGUgdGFyZ2V0IHByb3BlcnR5IGluIHRoZSBjb25zdHJ1Y3RvciwgZWFjaCBwcm9wZXJ0eSB3aWxsIGJlIG51bGwgaW5zdGVhZC5cbiAgICovXG4gIHByaXZhdGUgX3N0YXRlOiBCaW5kU3RhdGU7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHtcbiAgICBtYXRlcmlhbCxcbiAgICB0eXBlLFxuICAgIHRhcmdldFZhbHVlLFxuICAgIHRhcmdldEFscGhhLFxuICB9OiB7XG4gICAgLyoqXG4gICAgICogVGhlIHRhcmdldCBtYXRlcmlhbC5cbiAgICAgKi9cbiAgICBtYXRlcmlhbDogVEhSRUUuTWF0ZXJpYWw7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgdHlwZSBvZiB0aGUgdGFyZ2V0IHByb3BlcnR5IG9mIHRoZSBtYXRlcmlhbC5cbiAgICAgKi9cbiAgICB0eXBlOiBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGU7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgdGFyZ2V0IGNvbG9yLlxuICAgICAqL1xuICAgIHRhcmdldFZhbHVlOiBUSFJFRS5Db2xvcjtcblxuICAgIC8qKlxuICAgICAqIFRoZSB0YXJnZXQgYWxwaGEuXG4gICAgICovXG4gICAgdGFyZ2V0QWxwaGE/OiBudW1iZXI7XG4gIH0pIHtcbiAgICB0aGlzLm1hdGVyaWFsID0gbWF0ZXJpYWw7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLnRhcmdldFZhbHVlID0gdGFyZ2V0VmFsdWU7XG4gICAgdGhpcy50YXJnZXRBbHBoYSA9IHRhcmdldEFscGhhID8/IDEuMDtcblxuICAgIC8vIGluaXQgYmluZCBzdGF0ZVxuICAgIGNvbnN0IGNvbG9yID0gdGhpcy5faW5pdENvbG9yQmluZFN0YXRlKCk7XG4gICAgY29uc3QgYWxwaGEgPSB0aGlzLl9pbml0QWxwaGFCaW5kU3RhdGUoKTtcbiAgICB0aGlzLl9zdGF0ZSA9IHsgY29sb3IsIGFscGhhIH07XG4gIH1cblxuICBwdWJsaWMgYXBwbHlXZWlnaHQod2VpZ2h0OiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCB7IGNvbG9yLCBhbHBoYSB9ID0gdGhpcy5fc3RhdGU7XG5cbiAgICBpZiAoY29sb3IgIT0gbnVsbCkge1xuICAgICAgY29uc3QgeyBwcm9wZXJ0eU5hbWUsIGRlbHRhVmFsdWUgfSA9IGNvbG9yO1xuXG4gICAgICBjb25zdCB0YXJnZXQgPSAodGhpcy5tYXRlcmlhbCBhcyBhbnkpW3Byb3BlcnR5TmFtZV0gYXMgVEhSRUUuQ29sb3I7XG4gICAgICBpZiAodGFyZ2V0ICE9IHVuZGVmaW5lZCkge1xuICAgICAgICB0YXJnZXQuYWRkKF9jb2xvci5jb3B5KGRlbHRhVmFsdWUpLm11bHRpcGx5U2NhbGFyKHdlaWdodCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChhbHBoYSAhPSBudWxsKSB7XG4gICAgICBjb25zdCB7IHByb3BlcnR5TmFtZSwgZGVsdGFWYWx1ZSB9ID0gYWxwaGE7XG5cbiAgICAgIGNvbnN0IHRhcmdldCA9ICh0aGlzLm1hdGVyaWFsIGFzIGFueSlbcHJvcGVydHlOYW1lXSBhcyBudW1iZXI7XG4gICAgICBpZiAodGFyZ2V0ICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAoKHRoaXMubWF0ZXJpYWwgYXMgYW55KVtwcm9wZXJ0eU5hbWVdIGFzIG51bWJlcikgKz0gZGVsdGFWYWx1ZSAqIHdlaWdodDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY2xlYXJBcHBsaWVkV2VpZ2h0KCk6IHZvaWQge1xuICAgIGNvbnN0IHsgY29sb3IsIGFscGhhIH0gPSB0aGlzLl9zdGF0ZTtcblxuICAgIGlmIChjb2xvciAhPSBudWxsKSB7XG4gICAgICBjb25zdCB7IHByb3BlcnR5TmFtZSwgaW5pdGlhbFZhbHVlIH0gPSBjb2xvcjtcblxuICAgICAgY29uc3QgdGFyZ2V0ID0gKHRoaXMubWF0ZXJpYWwgYXMgYW55KVtwcm9wZXJ0eU5hbWVdIGFzIFRIUkVFLkNvbG9yO1xuICAgICAgaWYgKHRhcmdldCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGFyZ2V0LmNvcHkoaW5pdGlhbFZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoYWxwaGEgIT0gbnVsbCkge1xuICAgICAgY29uc3QgeyBwcm9wZXJ0eU5hbWUsIGluaXRpYWxWYWx1ZSB9ID0gYWxwaGE7XG5cbiAgICAgIGNvbnN0IHRhcmdldCA9ICh0aGlzLm1hdGVyaWFsIGFzIGFueSlbcHJvcGVydHlOYW1lXSBhcyBudW1iZXI7XG4gICAgICBpZiAodGFyZ2V0ICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAoKHRoaXMubWF0ZXJpYWwgYXMgYW55KVtwcm9wZXJ0eU5hbWVdIGFzIG51bWJlcikgPSBpbml0aWFsVmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdENvbG9yQmluZFN0YXRlKCk6IENvbG9yQmluZFN0YXRlIHwgbnVsbCB7XG4gICAgY29uc3QgeyBtYXRlcmlhbCwgdHlwZSwgdGFyZ2V0VmFsdWUgfSA9IHRoaXM7XG5cbiAgICBjb25zdCBwcm9wZXJ0eU5hbWVNYXAgPSB0aGlzLl9nZXRQcm9wZXJ0eU5hbWVNYXAoKTtcbiAgICBjb25zdCBwcm9wZXJ0eU5hbWUgPSBwcm9wZXJ0eU5hbWVNYXA/Llt0eXBlXT8uWzBdID8/IG51bGw7XG5cbiAgICBpZiAocHJvcGVydHlOYW1lID09IG51bGwpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgYFRyaWVkIHRvIGFkZCBhIG1hdGVyaWFsIGNvbG9yIGJpbmQgdG8gdGhlIG1hdGVyaWFsICR7XG4gICAgICAgICAgbWF0ZXJpYWwubmFtZSA/PyAnKG5vIG5hbWUpJ1xuICAgICAgICB9LCB0aGUgdHlwZSAke3R5cGV9IGJ1dCB0aGUgbWF0ZXJpYWwgb3IgdGhlIHR5cGUgaXMgbm90IHN1cHBvcnRlZC5gLFxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgdGFyZ2V0ID0gKG1hdGVyaWFsIGFzIGFueSlbcHJvcGVydHlOYW1lXSBhcyBUSFJFRS5Db2xvcjtcblxuICAgIGNvbnN0IGluaXRpYWxWYWx1ZSA9IHRhcmdldC5jbG9uZSgpO1xuXG4gICAgLy8gXHU4Q0EwXHUzMDZFXHU1MDI0XHUzMDkyXHU0RkREXHU2MzAxXHUzMDU5XHUzMDhCXHUzMDVGXHUzMDgxXHUzMDZCQ29sb3Iuc3ViXHUzMDkyXHU0RjdGXHUzMDhGXHUzMDVBXHUzMDZCXHU1REVFXHU1MjA2XHUzMDkyXHU4QTA4XHU3Qjk3XHUzMDU5XHUzMDhCXG4gICAgY29uc3QgZGVsdGFWYWx1ZSA9IG5ldyBUSFJFRS5Db2xvcihcbiAgICAgIHRhcmdldFZhbHVlLnIgLSBpbml0aWFsVmFsdWUucixcbiAgICAgIHRhcmdldFZhbHVlLmcgLSBpbml0aWFsVmFsdWUuZyxcbiAgICAgIHRhcmdldFZhbHVlLmIgLSBpbml0aWFsVmFsdWUuYixcbiAgICApO1xuXG4gICAgcmV0dXJuIHsgcHJvcGVydHlOYW1lLCBpbml0aWFsVmFsdWUsIGRlbHRhVmFsdWUgfTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRBbHBoYUJpbmRTdGF0ZSgpOiBBbHBoYUJpbmRTdGF0ZSB8IG51bGwge1xuICAgIGNvbnN0IHsgbWF0ZXJpYWwsIHR5cGUsIHRhcmdldEFscGhhIH0gPSB0aGlzO1xuXG4gICAgY29uc3QgcHJvcGVydHlOYW1lTWFwID0gdGhpcy5fZ2V0UHJvcGVydHlOYW1lTWFwKCk7XG4gICAgY29uc3QgcHJvcGVydHlOYW1lID0gcHJvcGVydHlOYW1lTWFwPy5bdHlwZV0/LlsxXSA/PyBudWxsO1xuXG4gICAgaWYgKHByb3BlcnR5TmFtZSA9PSBudWxsICYmIHRhcmdldEFscGhhICE9PSAxLjApIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgYFRyaWVkIHRvIGFkZCBhIG1hdGVyaWFsIGFscGhhIGJpbmQgdG8gdGhlIG1hdGVyaWFsICR7XG4gICAgICAgICAgbWF0ZXJpYWwubmFtZSA/PyAnKG5vIG5hbWUpJ1xuICAgICAgICB9LCB0aGUgdHlwZSAke3R5cGV9IGJ1dCB0aGUgbWF0ZXJpYWwgb3IgdGhlIHR5cGUgZG9lcyBub3Qgc3VwcG9ydCBhbHBoYS5gLFxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgaWYgKHByb3BlcnR5TmFtZSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBpbml0aWFsVmFsdWUgPSAobWF0ZXJpYWwgYXMgYW55KVtwcm9wZXJ0eU5hbWVdIGFzIG51bWJlcjtcblxuICAgIGNvbnN0IGRlbHRhVmFsdWUgPSB0YXJnZXRBbHBoYSAtIGluaXRpYWxWYWx1ZTtcblxuICAgIHJldHVybiB7IHByb3BlcnR5TmFtZSwgaW5pdGlhbFZhbHVlLCBkZWx0YVZhbHVlIH07XG4gIH1cblxuICBwcml2YXRlIF9nZXRQcm9wZXJ0eU5hbWVNYXAoKTpcbiAgICB8IHsgW3R5cGUgaW4gVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JUeXBlXT86IHJlYWRvbmx5IFtzdHJpbmcsIHN0cmluZyB8IG51bGxdIH1cbiAgICB8IG51bGwge1xuICAgIHJldHVybiAoXG4gICAgICBPYmplY3QuZW50cmllcyhWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvckJpbmQuX3Byb3BlcnR5TmFtZU1hcE1hcCkuZmluZCgoW2Rpc3Rpbmd1aXNoZXJdKSA9PiB7XG4gICAgICAgIHJldHVybiAodGhpcy5tYXRlcmlhbCBhcyBhbnkpW2Rpc3Rpbmd1aXNoZXJdID09PSB0cnVlO1xuICAgICAgfSk/LlsxXSA/PyBudWxsXG4gICAgKTtcbiAgfVxufVxuIiwgImltcG9ydCB0eXBlICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHR5cGUgeyBWUk1FeHByZXNzaW9uQmluZCB9IGZyb20gJy4vVlJNRXhwcmVzc2lvbkJpbmQnO1xuXG4vKipcbiAqIEEgYmluZCBvZiB7QGxpbmsgVlJNRXhwcmVzc2lvbn0gaW5mbHVlbmNlcyB0byBtb3JwaCB0YXJnZXRzLlxuICovXG5leHBvcnQgY2xhc3MgVlJNRXhwcmVzc2lvbk1vcnBoVGFyZ2V0QmluZCBpbXBsZW1lbnRzIFZSTUV4cHJlc3Npb25CaW5kIHtcbiAgLyoqXG4gICAqIFRoZSBtZXNoIHByaW1pdGl2ZXMgdGhhdCBhdHRhY2hlZCB0byB0YXJnZXQgbWVzaC5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBwcmltaXRpdmVzOiBUSFJFRS5NZXNoW107XG5cbiAgLyoqXG4gICAqIFRoZSBpbmRleCBvZiB0aGUgbW9ycGggdGFyZ2V0IGluIHRoZSBtZXNoLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGluZGV4OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSB3ZWlnaHQgdmFsdWUgb2YgdGFyZ2V0IG1vcnBoIHRhcmdldC4gUmFuZ2luZyBpbiBbMC4wIC0gMS4wXS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSB3ZWlnaHQ6IG51bWJlcjtcblxuICBwdWJsaWMgY29uc3RydWN0b3Ioe1xuICAgIHByaW1pdGl2ZXMsXG4gICAgaW5kZXgsXG4gICAgd2VpZ2h0LFxuICB9OiB7XG4gICAgLyoqXG4gICAgICogVGhlIG1lc2ggcHJpbWl0aXZlcyB0aGF0IGF0dGFjaGVkIHRvIHRhcmdldCBtZXNoLlxuICAgICAqL1xuICAgIHByaW1pdGl2ZXM6IFRIUkVFLk1lc2hbXTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBpbmRleCBvZiB0aGUgbW9ycGggdGFyZ2V0IGluIHRoZSBtZXNoLlxuICAgICAqL1xuICAgIGluZGV4OiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgd2VpZ2h0IHZhbHVlIG9mIHRhcmdldCBtb3JwaCB0YXJnZXQuIFJhbmdpbmcgaW4gWzAuMCAtIDEuMF0uXG4gICAgICovXG4gICAgd2VpZ2h0OiBudW1iZXI7XG4gIH0pIHtcbiAgICB0aGlzLnByaW1pdGl2ZXMgPSBwcmltaXRpdmVzO1xuICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICB0aGlzLndlaWdodCA9IHdlaWdodDtcbiAgfVxuXG4gIHB1YmxpYyBhcHBseVdlaWdodCh3ZWlnaHQ6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMucHJpbWl0aXZlcy5mb3JFYWNoKChtZXNoKSA9PiB7XG4gICAgICBpZiAobWVzaC5tb3JwaFRhcmdldEluZmx1ZW5jZXM/Llt0aGlzLmluZGV4XSAhPSBudWxsKSB7XG4gICAgICAgIG1lc2gubW9ycGhUYXJnZXRJbmZsdWVuY2VzW3RoaXMuaW5kZXhdICs9IHRoaXMud2VpZ2h0ICogd2VpZ2h0O1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGNsZWFyQXBwbGllZFdlaWdodCgpOiB2b2lkIHtcbiAgICB0aGlzLnByaW1pdGl2ZXMuZm9yRWFjaCgobWVzaCkgPT4ge1xuICAgICAgaWYgKG1lc2gubW9ycGhUYXJnZXRJbmZsdWVuY2VzPy5bdGhpcy5pbmRleF0gIT0gbnVsbCkge1xuICAgICAgICBtZXNoLm1vcnBoVGFyZ2V0SW5mbHVlbmNlc1t0aGlzLmluZGV4XSA9IDAuMDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB0eXBlIHsgVlJNRXhwcmVzc2lvbkJpbmQgfSBmcm9tICcuL1ZSTUV4cHJlc3Npb25CaW5kJztcblxuY29uc3QgX3YyID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblxuLyoqXG4gKiBBIGJpbmQgb2YgZXhwcmVzc2lvbiBpbmZsdWVuY2VzIHRvIHRleHR1cmUgdHJhbnNmb3Jtcy5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUV4cHJlc3Npb25UZXh0dXJlVHJhbnNmb3JtQmluZCBpbXBsZW1lbnRzIFZSTUV4cHJlc3Npb25CaW5kIHtcbiAgcHJpdmF0ZSBzdGF0aWMgX3Byb3BlcnR5TmFtZXNNYXA6IHsgW2Rpc3Rpbmd1aXNoZXI6IHN0cmluZ106IHN0cmluZ1tdIH0gPSB7XG4gICAgaXNNZXNoU3RhbmRhcmRNYXRlcmlhbDogW1xuICAgICAgJ21hcCcsXG4gICAgICAnZW1pc3NpdmVNYXAnLFxuICAgICAgJ2J1bXBNYXAnLFxuICAgICAgJ25vcm1hbE1hcCcsXG4gICAgICAnZGlzcGxhY2VtZW50TWFwJyxcbiAgICAgICdyb3VnaG5lc3NNYXAnLFxuICAgICAgJ21ldGFsbmVzc01hcCcsXG4gICAgICAnYWxwaGFNYXAnLFxuICAgIF0sXG4gICAgaXNNZXNoQmFzaWNNYXRlcmlhbDogWydtYXAnLCAnc3BlY3VsYXJNYXAnLCAnYWxwaGFNYXAnXSxcbiAgICBpc01Ub29uTWF0ZXJpYWw6IFtcbiAgICAgICdtYXAnLFxuICAgICAgJ25vcm1hbE1hcCcsXG4gICAgICAnZW1pc3NpdmVNYXAnLFxuICAgICAgJ3NoYWRlTXVsdGlwbHlUZXh0dXJlJyxcbiAgICAgICdyaW1NdWx0aXBseVRleHR1cmUnLFxuICAgICAgJ291dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZScsXG4gICAgICAndXZBbmltYXRpb25NYXNrVGV4dHVyZScsXG4gICAgXSxcbiAgfTtcblxuICAvKipcbiAgICogVGhlIHRhcmdldCBtYXRlcmlhbC5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBtYXRlcmlhbDogVEhSRUUuTWF0ZXJpYWw7XG5cbiAgLyoqXG4gICAqIFRoZSB1diBzY2FsZSBvZiB0aGUgdGV4dHVyZS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBzY2FsZTogVEhSRUUuVmVjdG9yMjtcblxuICAvKipcbiAgICogVGhlIHV2IG9mZnNldCBvZiB0aGUgdGV4dHVyZS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBvZmZzZXQ6IFRIUkVFLlZlY3RvcjI7XG5cbiAgLyoqXG4gICAqIFRoZSBsaXN0IG9mIHRleHR1cmUgbmFtZXMgYW5kIGl0cyBzdGF0ZSB0aGF0IHNob3VsZCBiZSB0cmFuc2Zvcm1lZCBieSB0aGlzIGJpbmQuXG4gICAqL1xuICBwcml2YXRlIF9wcm9wZXJ0aWVzOiB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGluaXRpYWxPZmZzZXQ6IFRIUkVFLlZlY3RvcjI7XG4gICAgaW5pdGlhbFNjYWxlOiBUSFJFRS5WZWN0b3IyO1xuICAgIGRlbHRhT2Zmc2V0OiBUSFJFRS5WZWN0b3IyO1xuICAgIGRlbHRhU2NhbGU6IFRIUkVFLlZlY3RvcjI7XG4gIH1bXTtcblxuICBwdWJsaWMgY29uc3RydWN0b3Ioe1xuICAgIG1hdGVyaWFsLFxuICAgIHNjYWxlLFxuICAgIG9mZnNldCxcbiAgfToge1xuICAgIC8qKlxuICAgICAqIFRoZSB0YXJnZXQgbWF0ZXJpYWwuXG4gICAgICovXG4gICAgbWF0ZXJpYWw6IFRIUkVFLk1hdGVyaWFsO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHV2IHNjYWxlIG9mIHRoZSB0ZXh0dXJlLlxuICAgICAqL1xuICAgIHNjYWxlOiBUSFJFRS5WZWN0b3IyO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHV2IG9mZnNldCBvZiB0aGUgdGV4dHVyZS5cbiAgICAgKi9cbiAgICBvZmZzZXQ6IFRIUkVFLlZlY3RvcjI7XG4gIH0pIHtcbiAgICB0aGlzLm1hdGVyaWFsID0gbWF0ZXJpYWw7XG4gICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgIHRoaXMub2Zmc2V0ID0gb2Zmc2V0O1xuXG4gICAgY29uc3QgcHJvcGVydHlOYW1lcyA9IE9iamVjdC5lbnRyaWVzKFZSTUV4cHJlc3Npb25UZXh0dXJlVHJhbnNmb3JtQmluZC5fcHJvcGVydHlOYW1lc01hcCkuZmluZChcbiAgICAgIChbZGlzdGluZ3Vpc2hlcl0pID0+IHtcbiAgICAgICAgcmV0dXJuIChtYXRlcmlhbCBhcyBhbnkpW2Rpc3Rpbmd1aXNoZXJdID09PSB0cnVlO1xuICAgICAgfSxcbiAgICApPy5bMV07XG5cbiAgICBpZiAocHJvcGVydHlOYW1lcyA9PSBudWxsKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIGBUcmllZCB0byBhZGQgYSB0ZXh0dXJlIHRyYW5zZm9ybSBiaW5kIHRvIHRoZSBtYXRlcmlhbCAke1xuICAgICAgICAgIG1hdGVyaWFsLm5hbWUgPz8gJyhubyBuYW1lKSdcbiAgICAgICAgfSBidXQgdGhlIG1hdGVyaWFsIGlzIG5vdCBzdXBwb3J0ZWQuYCxcbiAgICAgICk7XG5cbiAgICAgIHRoaXMuX3Byb3BlcnRpZXMgPSBbXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcHJvcGVydGllcyA9IFtdO1xuXG4gICAgICBwcm9wZXJ0eU5hbWVzLmZvckVhY2goKHByb3BlcnR5TmFtZSkgPT4ge1xuICAgICAgICBjb25zdCB0ZXh0dXJlID0gKChtYXRlcmlhbCBhcyBhbnkpW3Byb3BlcnR5TmFtZV0gYXMgVEhSRUUuVGV4dHVyZSB8IHVuZGVmaW5lZCk/LmNsb25lKCk7XG4gICAgICAgIGlmICghdGV4dHVyZSkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgKG1hdGVyaWFsIGFzIGFueSlbcHJvcGVydHlOYW1lXSA9IHRleHR1cmU7IC8vIGJlY2F1c2UgdGhlIHRleHR1cmUgaXMgY2xvbmVkXG5cbiAgICAgICAgY29uc3QgaW5pdGlhbE9mZnNldCA9IHRleHR1cmUub2Zmc2V0LmNsb25lKCk7XG4gICAgICAgIGNvbnN0IGluaXRpYWxTY2FsZSA9IHRleHR1cmUucmVwZWF0LmNsb25lKCk7XG4gICAgICAgIGNvbnN0IGRlbHRhT2Zmc2V0ID0gb2Zmc2V0LmNsb25lKCkuc3ViKGluaXRpYWxPZmZzZXQpO1xuICAgICAgICBjb25zdCBkZWx0YVNjYWxlID0gc2NhbGUuY2xvbmUoKS5zdWIoaW5pdGlhbFNjYWxlKTtcblxuICAgICAgICB0aGlzLl9wcm9wZXJ0aWVzLnB1c2goe1xuICAgICAgICAgIG5hbWU6IHByb3BlcnR5TmFtZSxcbiAgICAgICAgICBpbml0aWFsT2Zmc2V0LFxuICAgICAgICAgIGRlbHRhT2Zmc2V0LFxuICAgICAgICAgIGluaXRpYWxTY2FsZSxcbiAgICAgICAgICBkZWx0YVNjYWxlLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhcHBseVdlaWdodCh3ZWlnaHQ6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX3Byb3BlcnRpZXMuZm9yRWFjaCgocHJvcGVydHkpID0+IHtcbiAgICAgIGNvbnN0IHRhcmdldCA9ICh0aGlzLm1hdGVyaWFsIGFzIGFueSlbcHJvcGVydHkubmFtZV0gYXMgVEhSRUUuVGV4dHVyZTtcbiAgICAgIGlmICh0YXJnZXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9IC8vIFRPRE86IHdlIHNob3VsZCBraWNrIHRoaXMgYXQgYGFkZE1hdGVyaWFsVmFsdWVgXG5cbiAgICAgIHRhcmdldC5vZmZzZXQuYWRkKF92Mi5jb3B5KHByb3BlcnR5LmRlbHRhT2Zmc2V0KS5tdWx0aXBseVNjYWxhcih3ZWlnaHQpKTtcbiAgICAgIHRhcmdldC5yZXBlYXQuYWRkKF92Mi5jb3B5KHByb3BlcnR5LmRlbHRhU2NhbGUpLm11bHRpcGx5U2NhbGFyKHdlaWdodCkpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGNsZWFyQXBwbGllZFdlaWdodCgpOiB2b2lkIHtcbiAgICB0aGlzLl9wcm9wZXJ0aWVzLmZvckVhY2goKHByb3BlcnR5KSA9PiB7XG4gICAgICBjb25zdCB0YXJnZXQgPSAodGhpcy5tYXRlcmlhbCBhcyBhbnkpW3Byb3BlcnR5Lm5hbWVdIGFzIFRIUkVFLlRleHR1cmU7XG4gICAgICBpZiAodGFyZ2V0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSAvLyBUT0RPOiB3ZSBzaG91bGQga2ljayB0aGlzIGF0IGBhZGRNYXRlcmlhbFZhbHVlYFxuXG4gICAgICB0YXJnZXQub2Zmc2V0LmNvcHkocHJvcGVydHkuaW5pdGlhbE9mZnNldCk7XG4gICAgICB0YXJnZXQucmVwZWF0LmNvcHkocHJvcGVydHkuaW5pdGlhbFNjYWxlKTtcbiAgICB9KTtcbiAgfVxufVxuIiwgIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiAqL1xuXG5leHBvcnQgY29uc3QgVlJNRXhwcmVzc2lvbk92ZXJyaWRlVHlwZSA9IHtcbiAgTm9uZTogJ25vbmUnLFxuICBCbG9jazogJ2Jsb2NrJyxcbiAgQmxlbmQ6ICdibGVuZCcsXG59IGFzIGNvbnN0O1xuXG5leHBvcnQgdHlwZSBWUk1FeHByZXNzaW9uT3ZlcnJpZGVUeXBlID0gdHlwZW9mIFZSTUV4cHJlc3Npb25PdmVycmlkZVR5cGVba2V5b2YgdHlwZW9mIFZSTUV4cHJlc3Npb25PdmVycmlkZVR5cGVdO1xuIiwgImltcG9ydCB0eXBlIHsgVlJNRmlyc3RQZXJzb25NZXNoQW5ub3RhdGlvbiB9IGZyb20gJy4vVlJNRmlyc3RQZXJzb25NZXNoQW5ub3RhdGlvbic7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgdHlwZSB7IFZSTUh1bWFub2lkIH0gZnJvbSAnLi4vaHVtYW5vaWQnO1xuXG5leHBvcnQgY2xhc3MgVlJNRmlyc3RQZXJzb24ge1xuICAvKipcbiAgICogQSBkZWZhdWx0IGNhbWVyYSBsYXllciBmb3IgYEZpcnN0UGVyc29uT25seWAgbGF5ZXIuXG4gICAqXG4gICAqIEBzZWUgW1tnZXRGaXJzdFBlcnNvbk9ubHlMYXllcl1dXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IERFRkFVTFRfRklSU1RQRVJTT05fT05MWV9MQVlFUiA9IDk7XG5cbiAgLyoqXG4gICAqIEEgZGVmYXVsdCBjYW1lcmEgbGF5ZXIgZm9yIGBUaGlyZFBlcnNvbk9ubHlgIGxheWVyLlxuICAgKlxuICAgKiBAc2VlIFtbZ2V0VGhpcmRQZXJzb25Pbmx5TGF5ZXJdXVxuICAgKi9cbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBERUZBVUxUX1RISVJEUEVSU09OX09OTFlfTEFZRVIgPSAxMDtcblxuICAvKipcbiAgICogSXRzIGFzc29jaWF0ZWQge0BsaW5rIFZSTUh1bWFub2lkfS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBodW1hbm9pZDogVlJNSHVtYW5vaWQ7XG4gIHB1YmxpYyBtZXNoQW5ub3RhdGlvbnM6IFZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb25bXTtcblxuICBwcml2YXRlIF9maXJzdFBlcnNvbk9ubHlMYXllciA9IFZSTUZpcnN0UGVyc29uLkRFRkFVTFRfRklSU1RQRVJTT05fT05MWV9MQVlFUjtcbiAgcHJpdmF0ZSBfdGhpcmRQZXJzb25Pbmx5TGF5ZXIgPSBWUk1GaXJzdFBlcnNvbi5ERUZBVUxUX1RISVJEUEVSU09OX09OTFlfTEFZRVI7XG5cbiAgcHJpdmF0ZSBfaW5pdGlhbGl6ZWRMYXllcnMgPSBmYWxzZTtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IFZSTUZpcnN0UGVyc29uIG9iamVjdC5cbiAgICpcbiAgICogQHBhcmFtIGh1bWFub2lkIEEge0BsaW5rIFZSTUh1bWFub2lkfVxuICAgKiBAcGFyYW0gbWVzaEFubm90YXRpb25zIEEgcmVuZGVyZXIgc2V0dGluZ3MuIFNlZSB0aGUgZGVzY3JpcHRpb24gb2YgW1tSZW5kZXJlckZpcnN0UGVyc29uRmxhZ3NdXSBmb3IgbW9yZSBpbmZvXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoaHVtYW5vaWQ6IFZSTUh1bWFub2lkLCBtZXNoQW5ub3RhdGlvbnM6IFZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb25bXSkge1xuICAgIHRoaXMuaHVtYW5vaWQgPSBodW1hbm9pZDtcbiAgICB0aGlzLm1lc2hBbm5vdGF0aW9ucyA9IG1lc2hBbm5vdGF0aW9ucztcbiAgfVxuXG4gIC8qKlxuICAgKiBDb3B5IHRoZSBnaXZlbiB7QGxpbmsgVlJNRmlyc3RQZXJzb259IGludG8gdGhpcyBvbmUuXG4gICAqIHtAbGluayBodW1hbm9pZH0gbXVzdCBiZSBzYW1lIGFzIHRoZSBzb3VyY2Ugb25lLlxuICAgKiBAcGFyYW0gc291cmNlIFRoZSB7QGxpbmsgVlJNRmlyc3RQZXJzb259IHlvdSB3YW50IHRvIGNvcHlcbiAgICogQHJldHVybnMgdGhpc1xuICAgKi9cbiAgcHVibGljIGNvcHkoc291cmNlOiBWUk1GaXJzdFBlcnNvbik6IHRoaXMge1xuICAgIGlmICh0aGlzLmh1bWFub2lkICE9PSBzb3VyY2UuaHVtYW5vaWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVlJNRmlyc3RQZXJzb246IGh1bWFub2lkIG11c3QgYmUgc2FtZSBpbiBvcmRlciB0byBjb3B5Jyk7XG4gICAgfVxuXG4gICAgdGhpcy5tZXNoQW5ub3RhdGlvbnMgPSBzb3VyY2UubWVzaEFubm90YXRpb25zLm1hcCgoYW5ub3RhdGlvbikgPT4gKHtcbiAgICAgIG1lc2hlczogYW5ub3RhdGlvbi5tZXNoZXMuY29uY2F0KCksXG4gICAgICB0eXBlOiBhbm5vdGF0aW9uLnR5cGUsXG4gICAgfSkpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGNsb25lIG9mIHRoaXMge0BsaW5rIFZSTUZpcnN0UGVyc29ufS5cbiAgICogQHJldHVybnMgQ29waWVkIHtAbGluayBWUk1GaXJzdFBlcnNvbn1cbiAgICovXG4gIHB1YmxpYyBjbG9uZSgpOiBWUk1GaXJzdFBlcnNvbiB7XG4gICAgcmV0dXJuIG5ldyBWUk1GaXJzdFBlcnNvbih0aGlzLmh1bWFub2lkLCB0aGlzLm1lc2hBbm5vdGF0aW9ucykuY29weSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIGNhbWVyYSBsYXllciByZXByZXNlbnRzIGBGaXJzdFBlcnNvbk9ubHlgIGxheWVyLlxuICAgKiBOb3RlIHRoYXQgKip5b3UgbXVzdCBjYWxsIHtAbGluayBzZXR1cH0gZmlyc3QgYmVmb3JlIHlvdSB1c2UgdGhlIGxheWVyIGZlYXR1cmUqKiBvciBpdCBkb2VzIG5vdCB3b3JrIHByb3Blcmx5LlxuICAgKlxuICAgKiBUaGUgdmFsdWUgaXMge0BsaW5rIERFRkFVTFRfRklSU1RQRVJTT05fT05MWV9MQVlFUn0gYnkgZGVmYXVsdCBidXQgeW91IGNhbiBjaGFuZ2UgdGhlIGxheWVyIGJ5IHNwZWNpZnlpbmcgdmlhIHtAbGluayBzZXR1cH0gaWYgeW91IHByZWZlci5cbiAgICpcbiAgICogQHNlZSBodHRwczovL3ZybS5kZXYvZW4vdW5pdnJtL2FwaS91bml2cm1fdXNlX2ZpcnN0cGVyc29uL1xuICAgKiBAc2VlIGh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy8jYXBpL2VuL2NvcmUvTGF5ZXJzXG4gICAqL1xuICBwdWJsaWMgZ2V0IGZpcnN0UGVyc29uT25seUxheWVyKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpcnN0UGVyc29uT25seUxheWVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgY2FtZXJhIGxheWVyIHJlcHJlc2VudHMgYFRoaXJkUGVyc29uT25seWAgbGF5ZXIuXG4gICAqIE5vdGUgdGhhdCAqKnlvdSBtdXN0IGNhbGwge0BsaW5rIHNldHVwfSBmaXJzdCBiZWZvcmUgeW91IHVzZSB0aGUgbGF5ZXIgZmVhdHVyZSoqIG9yIGl0IGRvZXMgbm90IHdvcmsgcHJvcGVybHkuXG4gICAqXG4gICAqIFRoZSB2YWx1ZSBpcyB7QGxpbmsgREVGQVVMVF9USElSRFBFUlNPTl9PTkxZX0xBWUVSfSBieSBkZWZhdWx0IGJ1dCB5b3UgY2FuIGNoYW5nZSB0aGUgbGF5ZXIgYnkgc3BlY2lmeWluZyB2aWEge0BsaW5rIHNldHVwfSBpZiB5b3UgcHJlZmVyLlxuICAgKlxuICAgKiBAc2VlIGh0dHBzOi8vdnJtLmRldi9lbi91bml2cm0vYXBpL3VuaXZybV91c2VfZmlyc3RwZXJzb24vXG4gICAqIEBzZWUgaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzLyNhcGkvZW4vY29yZS9MYXllcnNcbiAgICovXG4gIHB1YmxpYyBnZXQgdGhpcmRQZXJzb25Pbmx5TGF5ZXIoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fdGhpcmRQZXJzb25Pbmx5TGF5ZXI7XG4gIH1cblxuICAvKipcbiAgICogSW4gdGhpcyBtZXRob2QsIGl0IGFzc2lnbnMgbGF5ZXJzIGZvciBldmVyeSBtZXNoZXMgYmFzZWQgb24gbWVzaCBhbm5vdGF0aW9ucy5cbiAgICogWW91IG11c3QgY2FsbCB0aGlzIG1ldGhvZCBmaXJzdCBiZWZvcmUgeW91IHVzZSB0aGUgbGF5ZXIgZmVhdHVyZS5cbiAgICpcbiAgICogVGhpcyBpcyBhbiBlcXVpdmFsZW50IG9mIFtWUk1GaXJzdFBlcnNvbi5TZXR1cF0oaHR0cHM6Ly9naXRodWIuY29tL3ZybS1jL1VuaVZSTS9ibG9iLzczYTViZDhmY2RkYWEyYTdhODczNTA5OWE5N2U2M2M5ZGIzZTVlYTAvQXNzZXRzL1ZSTS9SdW50aW1lL0ZpcnN0UGVyc29uL1ZSTUZpcnN0UGVyc29uLmNzI0wyOTUtTDI5OSkgb2YgdGhlIFVuaVZSTS5cbiAgICpcbiAgICogVGhlIGBjYW1lcmFMYXllcmAgcGFyYW1ldGVyIHNwZWNpZmllcyB3aGljaCBsYXllciB3aWxsIGJlIGFzc2lnbmVkIGZvciBgRmlyc3RQZXJzb25Pbmx5YCAvIGBUaGlyZFBlcnNvbk9ubHlgLlxuICAgKiBJbiBVbmlWUk0sIHdlIHNwZWNpZmllZCB0aG9zZSBieSBuYW1pbmcgZWFjaCBkZXNpcmVkIGxheWVyIGFzIGBGSVJTVFBFUlNPTl9PTkxZX0xBWUVSYCAvIGBUSElSRFBFUlNPTl9PTkxZX0xBWUVSYFxuICAgKiBidXQgd2UgYXJlIGdvaW5nIHRvIHNwZWNpZnkgdGhlc2UgbGF5ZXJzIGF0IGhlcmUgc2luY2Ugd2UgYXJlIHVuYWJsZSB0byBuYW1lIGxheWVycyBpbiBUaHJlZS5qcy5cbiAgICpcbiAgICogQHBhcmFtIGNhbWVyYUxheWVyIFNwZWNpZnkgd2hpY2ggbGF5ZXIgd2lsbCBiZSBmb3IgYEZpcnN0UGVyc29uT25seWAgLyBgVGhpcmRQZXJzb25Pbmx5YC5cbiAgICovXG4gIHB1YmxpYyBzZXR1cCh7XG4gICAgZmlyc3RQZXJzb25Pbmx5TGF5ZXIgPSBWUk1GaXJzdFBlcnNvbi5ERUZBVUxUX0ZJUlNUUEVSU09OX09OTFlfTEFZRVIsXG4gICAgdGhpcmRQZXJzb25Pbmx5TGF5ZXIgPSBWUk1GaXJzdFBlcnNvbi5ERUZBVUxUX1RISVJEUEVSU09OX09OTFlfTEFZRVIsXG4gIH0gPSB7fSk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9pbml0aWFsaXplZExheWVycykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9maXJzdFBlcnNvbk9ubHlMYXllciA9IGZpcnN0UGVyc29uT25seUxheWVyO1xuICAgIHRoaXMuX3RoaXJkUGVyc29uT25seUxheWVyID0gdGhpcmRQZXJzb25Pbmx5TGF5ZXI7XG5cbiAgICB0aGlzLm1lc2hBbm5vdGF0aW9ucy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpdGVtLm1lc2hlcy5mb3JFYWNoKChtZXNoKSA9PiB7XG4gICAgICAgIGlmIChpdGVtLnR5cGUgPT09ICdmaXJzdFBlcnNvbk9ubHknKSB7XG4gICAgICAgICAgbWVzaC5sYXllcnMuc2V0KHRoaXMuX2ZpcnN0UGVyc29uT25seUxheWVyKTtcbiAgICAgICAgICBtZXNoLnRyYXZlcnNlKChjaGlsZCkgPT4gY2hpbGQubGF5ZXJzLnNldCh0aGlzLl9maXJzdFBlcnNvbk9ubHlMYXllcikpO1xuICAgICAgICB9IGVsc2UgaWYgKGl0ZW0udHlwZSA9PT0gJ3RoaXJkUGVyc29uT25seScpIHtcbiAgICAgICAgICBtZXNoLmxheWVycy5zZXQodGhpcy5fdGhpcmRQZXJzb25Pbmx5TGF5ZXIpO1xuICAgICAgICAgIG1lc2gudHJhdmVyc2UoKGNoaWxkKSA9PiBjaGlsZC5sYXllcnMuc2V0KHRoaXMuX3RoaXJkUGVyc29uT25seUxheWVyKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXRlbS50eXBlID09PSAnYXV0bycpIHtcbiAgICAgICAgICB0aGlzLl9jcmVhdGVIZWFkbGVzc01vZGVsKG1lc2gpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMuX2luaXRpYWxpemVkTGF5ZXJzID0gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX2V4Y2x1ZGVUcmlhbmdsZXModHJpYW5nbGVzOiBudW1iZXJbXSwgYndzOiBudW1iZXJbXVtdLCBza2luSW5kZXg6IG51bWJlcltdW10sIGV4Y2x1ZGU6IG51bWJlcltdKTogbnVtYmVyIHtcbiAgICBsZXQgY291bnQgPSAwO1xuICAgIGlmIChid3MgIT0gbnVsbCAmJiBid3MubGVuZ3RoID4gMCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cmlhbmdsZXMubGVuZ3RoOyBpICs9IDMpIHtcbiAgICAgICAgY29uc3QgYSA9IHRyaWFuZ2xlc1tpXTtcbiAgICAgICAgY29uc3QgYiA9IHRyaWFuZ2xlc1tpICsgMV07XG4gICAgICAgIGNvbnN0IGMgPSB0cmlhbmdsZXNbaSArIDJdO1xuICAgICAgICBjb25zdCBidzAgPSBid3NbYV07XG4gICAgICAgIGNvbnN0IHNraW4wID0gc2tpbkluZGV4W2FdO1xuXG4gICAgICAgIGlmIChidzBbMF0gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjBbMF0pKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJ3MFsxXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMFsxXSkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoYncwWzJdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4wWzJdKSkgY29udGludWU7XG4gICAgICAgIGlmIChidzBbM10gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjBbM10pKSBjb250aW51ZTtcblxuICAgICAgICBjb25zdCBidzEgPSBid3NbYl07XG4gICAgICAgIGNvbnN0IHNraW4xID0gc2tpbkluZGV4W2JdO1xuICAgICAgICBpZiAoYncxWzBdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4xWzBdKSkgY29udGludWU7XG4gICAgICAgIGlmIChidzFbMV0gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjFbMV0pKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJ3MVsyXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMVsyXSkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoYncxWzNdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4xWzNdKSkgY29udGludWU7XG5cbiAgICAgICAgY29uc3QgYncyID0gYndzW2NdO1xuICAgICAgICBjb25zdCBza2luMiA9IHNraW5JbmRleFtjXTtcbiAgICAgICAgaWYgKGJ3MlswXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMlswXSkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoYncyWzFdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4yWzFdKSkgY29udGludWU7XG4gICAgICAgIGlmIChidzJbMl0gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjJbMl0pKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJ3MlszXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMlszXSkpIGNvbnRpbnVlO1xuXG4gICAgICAgIHRyaWFuZ2xlc1tjb3VudCsrXSA9IGE7XG4gICAgICAgIHRyaWFuZ2xlc1tjb3VudCsrXSA9IGI7XG4gICAgICAgIHRyaWFuZ2xlc1tjb3VudCsrXSA9IGM7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb3VudDtcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZUVyYXNlZE1lc2goc3JjOiBUSFJFRS5Ta2lubmVkTWVzaCwgZXJhc2luZ0JvbmVzSW5kZXg6IG51bWJlcltdKTogVEhSRUUuU2tpbm5lZE1lc2gge1xuICAgIGNvbnN0IGRzdCA9IG5ldyBUSFJFRS5Ta2lubmVkTWVzaChzcmMuZ2VvbWV0cnkuY2xvbmUoKSwgc3JjLm1hdGVyaWFsKTtcbiAgICBkc3QubmFtZSA9IGAke3NyYy5uYW1lfShlcmFzZSlgO1xuICAgIGRzdC5mcnVzdHVtQ3VsbGVkID0gc3JjLmZydXN0dW1DdWxsZWQ7XG4gICAgZHN0LmxheWVycy5zZXQodGhpcy5fZmlyc3RQZXJzb25Pbmx5TGF5ZXIpO1xuXG4gICAgY29uc3QgZ2VvbWV0cnkgPSBkc3QuZ2VvbWV0cnk7XG5cbiAgICBjb25zdCBza2luSW5kZXhBdHRyID0gZ2VvbWV0cnkuZ2V0QXR0cmlidXRlKCdza2luSW5kZXgnKTtcbiAgICBjb25zdCBza2luSW5kZXhBdHRyQXJyYXkgPSBza2luSW5kZXhBdHRyIGluc3RhbmNlb2YgVEhSRUUuR0xCdWZmZXJBdHRyaWJ1dGUgPyBbXSA6IHNraW5JbmRleEF0dHIuYXJyYXk7XG4gICAgY29uc3Qgc2tpbkluZGV4ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBza2luSW5kZXhBdHRyQXJyYXkubGVuZ3RoOyBpICs9IDQpIHtcbiAgICAgIHNraW5JbmRleC5wdXNoKFtcbiAgICAgICAgc2tpbkluZGV4QXR0ckFycmF5W2ldLFxuICAgICAgICBza2luSW5kZXhBdHRyQXJyYXlbaSArIDFdLFxuICAgICAgICBza2luSW5kZXhBdHRyQXJyYXlbaSArIDJdLFxuICAgICAgICBza2luSW5kZXhBdHRyQXJyYXlbaSArIDNdLFxuICAgICAgXSk7XG4gICAgfVxuXG4gICAgY29uc3Qgc2tpbldlaWdodEF0dHIgPSBnZW9tZXRyeS5nZXRBdHRyaWJ1dGUoJ3NraW5XZWlnaHQnKTtcbiAgICBjb25zdCBza2luV2VpZ2h0QXR0ckFycmF5ID0gc2tpbldlaWdodEF0dHIgaW5zdGFuY2VvZiBUSFJFRS5HTEJ1ZmZlckF0dHJpYnV0ZSA/IFtdIDogc2tpbldlaWdodEF0dHIuYXJyYXk7XG4gICAgY29uc3Qgc2tpbldlaWdodCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2tpbldlaWdodEF0dHJBcnJheS5sZW5ndGg7IGkgKz0gNCkge1xuICAgICAgc2tpbldlaWdodC5wdXNoKFtcbiAgICAgICAgc2tpbldlaWdodEF0dHJBcnJheVtpXSxcbiAgICAgICAgc2tpbldlaWdodEF0dHJBcnJheVtpICsgMV0sXG4gICAgICAgIHNraW5XZWlnaHRBdHRyQXJyYXlbaSArIDJdLFxuICAgICAgICBza2luV2VpZ2h0QXR0ckFycmF5W2kgKyAzXSxcbiAgICAgIF0pO1xuICAgIH1cblxuICAgIGNvbnN0IGluZGV4ID0gZ2VvbWV0cnkuZ2V0SW5kZXgoKTtcbiAgICBpZiAoIWluZGV4KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgZ2VvbWV0cnkgZG9lc24ndCBoYXZlIGFuIGluZGV4IGJ1ZmZlclwiKTtcbiAgICB9XG4gICAgY29uc3Qgb2xkVHJpYW5nbGVzID0gQXJyYXkuZnJvbShpbmRleC5hcnJheSk7XG5cbiAgICBjb25zdCBjb3VudCA9IHRoaXMuX2V4Y2x1ZGVUcmlhbmdsZXMob2xkVHJpYW5nbGVzLCBza2luV2VpZ2h0LCBza2luSW5kZXgsIGVyYXNpbmdCb25lc0luZGV4KTtcbiAgICBjb25zdCBuZXdUcmlhbmdsZTogbnVtYmVyW10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgIG5ld1RyaWFuZ2xlW2ldID0gb2xkVHJpYW5nbGVzW2ldO1xuICAgIH1cbiAgICBnZW9tZXRyeS5zZXRJbmRleChuZXdUcmlhbmdsZSk7XG5cbiAgICAvLyBtdG9vbiBtYXRlcmlhbCBpbmNsdWRlcyBvbkJlZm9yZVJlbmRlci4gdGhpcyBpcyB1bnN1cHBvcnRlZCBhdCBTa2lubmVkTWVzaCNjbG9uZVxuICAgIGlmIChzcmMub25CZWZvcmVSZW5kZXIpIHtcbiAgICAgIGRzdC5vbkJlZm9yZVJlbmRlciA9IHNyYy5vbkJlZm9yZVJlbmRlcjtcbiAgICB9XG4gICAgZHN0LmJpbmQobmV3IFRIUkVFLlNrZWxldG9uKHNyYy5za2VsZXRvbi5ib25lcywgc3JjLnNrZWxldG9uLmJvbmVJbnZlcnNlcyksIG5ldyBUSFJFRS5NYXRyaXg0KCkpO1xuICAgIHJldHVybiBkc3Q7XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVIZWFkbGVzc01vZGVsRm9yU2tpbm5lZE1lc2gocGFyZW50OiBUSFJFRS5PYmplY3QzRCwgbWVzaDogVEhSRUUuU2tpbm5lZE1lc2gpOiB2b2lkIHtcbiAgICBjb25zdCBlcmFzZUJvbmVJbmRleGVzOiBudW1iZXJbXSA9IFtdO1xuICAgIG1lc2guc2tlbGV0b24uYm9uZXMuZm9yRWFjaCgoYm9uZSwgaW5kZXgpID0+IHtcbiAgICAgIGlmICh0aGlzLl9pc0VyYXNlVGFyZ2V0KGJvbmUpKSBlcmFzZUJvbmVJbmRleGVzLnB1c2goaW5kZXgpO1xuICAgIH0pO1xuXG4gICAgLy8gVW5saWtlIFVuaVZSTSB3ZSBkb24ndCBjb3B5IG1lc2ggaWYgbm8gaW52aXNpYmxlIGJvbmUgd2FzIGZvdW5kXG4gICAgaWYgKCFlcmFzZUJvbmVJbmRleGVzLmxlbmd0aCkge1xuICAgICAgbWVzaC5sYXllcnMuZW5hYmxlKHRoaXMuX3RoaXJkUGVyc29uT25seUxheWVyKTtcbiAgICAgIG1lc2gubGF5ZXJzLmVuYWJsZSh0aGlzLl9maXJzdFBlcnNvbk9ubHlMYXllcik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG1lc2gubGF5ZXJzLnNldCh0aGlzLl90aGlyZFBlcnNvbk9ubHlMYXllcik7XG4gICAgY29uc3QgbmV3TWVzaCA9IHRoaXMuX2NyZWF0ZUVyYXNlZE1lc2gobWVzaCwgZXJhc2VCb25lSW5kZXhlcyk7XG4gICAgcGFyZW50LmFkZChuZXdNZXNoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZUhlYWRsZXNzTW9kZWwobm9kZTogVEhSRUUuT2JqZWN0M0QpOiB2b2lkIHtcbiAgICBpZiAobm9kZS50eXBlID09PSAnR3JvdXAnKSB7XG4gICAgICBub2RlLmxheWVycy5zZXQodGhpcy5fdGhpcmRQZXJzb25Pbmx5TGF5ZXIpO1xuICAgICAgaWYgKHRoaXMuX2lzRXJhc2VUYXJnZXQobm9kZSkpIHtcbiAgICAgICAgbm9kZS50cmF2ZXJzZSgoY2hpbGQpID0+IGNoaWxkLmxheWVycy5zZXQodGhpcy5fdGhpcmRQZXJzb25Pbmx5TGF5ZXIpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHBhcmVudCA9IG5ldyBUSFJFRS5Hcm91cCgpO1xuICAgICAgICBwYXJlbnQubmFtZSA9IGBfaGVhZGxlc3NfJHtub2RlLm5hbWV9YDtcbiAgICAgICAgcGFyZW50LmxheWVycy5zZXQodGhpcy5fZmlyc3RQZXJzb25Pbmx5TGF5ZXIpO1xuICAgICAgICBub2RlLnBhcmVudCEuYWRkKHBhcmVudCk7XG4gICAgICAgIG5vZGUuY2hpbGRyZW5cbiAgICAgICAgICAuZmlsdGVyKChjaGlsZCkgPT4gY2hpbGQudHlwZSA9PT0gJ1NraW5uZWRNZXNoJylcbiAgICAgICAgICAuZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNraW5uZWRNZXNoID0gY2hpbGQgYXMgVEhSRUUuU2tpbm5lZE1lc2g7XG4gICAgICAgICAgICB0aGlzLl9jcmVhdGVIZWFkbGVzc01vZGVsRm9yU2tpbm5lZE1lc2gocGFyZW50LCBza2lubmVkTWVzaCk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChub2RlLnR5cGUgPT09ICdTa2lubmVkTWVzaCcpIHtcbiAgICAgIGNvbnN0IHNraW5uZWRNZXNoID0gbm9kZSBhcyBUSFJFRS5Ta2lubmVkTWVzaDtcbiAgICAgIHRoaXMuX2NyZWF0ZUhlYWRsZXNzTW9kZWxGb3JTa2lubmVkTWVzaChub2RlLnBhcmVudCEsIHNraW5uZWRNZXNoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuX2lzRXJhc2VUYXJnZXQobm9kZSkpIHtcbiAgICAgICAgbm9kZS5sYXllcnMuc2V0KHRoaXMuX3RoaXJkUGVyc29uT25seUxheWVyKTtcbiAgICAgICAgbm9kZS50cmF2ZXJzZSgoY2hpbGQpID0+IGNoaWxkLmxheWVycy5zZXQodGhpcy5fdGhpcmRQZXJzb25Pbmx5TGF5ZXIpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9pc0VyYXNlVGFyZ2V0KGJvbmU6IFRIUkVFLk9iamVjdDNEKTogYm9vbGVhbiB7XG4gICAgaWYgKGJvbmUgPT09IHRoaXMuaHVtYW5vaWQuZ2V0UmF3Qm9uZU5vZGUoJ2hlYWQnKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIGlmICghYm9uZS5wYXJlbnQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuX2lzRXJhc2VUYXJnZXQoYm9uZS5wYXJlbnQpO1xuICAgIH1cbiAgfVxufVxuIiwgImltcG9ydCB0eXBlICogYXMgVjBWUk0gZnJvbSAnQHBpeGl2L3R5cGVzLXZybS0wLjAnO1xuaW1wb3J0IHR5cGUgKiBhcyBWMVZSTVNjaGVtYSBmcm9tICdAcGl4aXYvdHlwZXMtdnJtYy12cm0tMS4wJztcbmltcG9ydCB0eXBlIHsgR0xURiwgR0xURkxvYWRlclBsdWdpbiwgR0xURlBhcnNlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXIuanMnO1xuaW1wb3J0IHR5cGUgeyBWUk1IdW1hbm9pZCB9IGZyb20gJy4uL2h1bWFub2lkL1ZSTUh1bWFub2lkJztcbmltcG9ydCB7IGdsdGZFeHRyYWN0UHJpbWl0aXZlc0Zyb21Ob2RlcyB9IGZyb20gJy4uL3V0aWxzL2dsdGZFeHRyYWN0UHJpbWl0aXZlc0Zyb21Ob2RlJztcbmltcG9ydCB7IFZSTUZpcnN0UGVyc29uIH0gZnJvbSAnLi9WUk1GaXJzdFBlcnNvbic7XG5pbXBvcnQgdHlwZSB7IFZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb24gfSBmcm9tICcuL1ZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb24nO1xuaW1wb3J0IHR5cGUgeyBWUk1GaXJzdFBlcnNvbk1lc2hBbm5vdGF0aW9uVHlwZSB9IGZyb20gJy4vVlJNRmlyc3RQZXJzb25NZXNoQW5ub3RhdGlvblR5cGUnO1xuaW1wb3J0IHsgR0xURiBhcyBHTFRGU2NoZW1hIH0gZnJvbSAnQGdsdGYtdHJhbnNmb3JtL2NvcmUnO1xuXG4vKipcbiAqIFBvc3NpYmxlIHNwZWMgdmVyc2lvbnMgaXQgcmVjb2duaXplcy5cbiAqL1xuY29uc3QgUE9TU0lCTEVfU1BFQ19WRVJTSU9OUyA9IG5ldyBTZXQoWycxLjAnLCAnMS4wLWJldGEnXSk7XG5cbi8qKlxuICogQSBwbHVnaW4gb2YgR0xURkxvYWRlciB0aGF0IGltcG9ydHMgYSB7QGxpbmsgVlJNRmlyc3RQZXJzb259IGZyb20gYSBWUk0gZXh0ZW5zaW9uIG9mIGEgR0xURi5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUZpcnN0UGVyc29uTG9hZGVyUGx1Z2luIGltcGxlbWVudHMgR0xURkxvYWRlclBsdWdpbiB7XG4gIHB1YmxpYyByZWFkb25seSBwYXJzZXI6IEdMVEZQYXJzZXI7XG5cbiAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7XG4gICAgLy8gV2Ugc2hvdWxkIHVzZSB0aGUgZXh0ZW5zaW9uIG5hbWUgaW5zdGVhZCBidXQgd2UgaGF2ZSBtdWx0aXBsZSBwbHVnaW5zIGZvciBhbiBleHRlbnNpb24uLi5cbiAgICByZXR1cm4gJ1ZSTUZpcnN0UGVyc29uTG9hZGVyUGx1Z2luJztcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJzZXI6IEdMVEZQYXJzZXIpIHtcbiAgICB0aGlzLnBhcnNlciA9IHBhcnNlcjtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBhZnRlclJvb3QoZ2x0ZjogR0xURik6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHZybUh1bWFub2lkID0gZ2x0Zi51c2VyRGF0YS52cm1IdW1hbm9pZCBhcyBWUk1IdW1hbm9pZCB8IHVuZGVmaW5lZDtcblxuICAgIC8vIGV4cGxpY2l0bHkgZGlzdGluZ3Vpc2ggbnVsbCBhbmQgdW5kZWZpbmVkXG4gICAgLy8gc2luY2UgdnJtSHVtYW5vaWQgbWlnaHQgYmUgbnVsbCBhcyBhIHJlc3VsdFxuICAgIGlmICh2cm1IdW1hbm9pZCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAodnJtSHVtYW5vaWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnVlJNRmlyc3RQZXJzb25Mb2FkZXJQbHVnaW46IHZybUh1bWFub2lkIGlzIHVuZGVmaW5lZC4gVlJNSHVtYW5vaWRMb2FkZXJQbHVnaW4gaGF2ZSB0byBiZSB1c2VkIGZpcnN0JyxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgZ2x0Zi51c2VyRGF0YS52cm1GaXJzdFBlcnNvbiA9IGF3YWl0IHRoaXMuX2ltcG9ydChnbHRmLCB2cm1IdW1hbm9pZCk7XG4gIH1cblxuICAvKipcbiAgICogSW1wb3J0IGEge0BsaW5rIFZSTUZpcnN0UGVyc29ufSBmcm9tIGEgVlJNLlxuICAgKlxuICAgKiBAcGFyYW0gZ2x0ZiBBIHBhcnNlZCByZXN1bHQgb2YgR0xURiB0YWtlbiBmcm9tIEdMVEZMb2FkZXJcbiAgICogQHBhcmFtIGh1bWFub2lkIEEge0BsaW5rIFZSTUh1bWFub2lkfSBpbnN0YW5jZSB0aGF0IHJlcHJlc2VudHMgdGhlIFZSTVxuICAgKi9cblxuICBwcml2YXRlIGFzeW5jIF9pbXBvcnQoZ2x0ZjogR0xURiwgaHVtYW5vaWQ6IFZSTUh1bWFub2lkIHwgbnVsbCk6IFByb21pc2U8VlJNRmlyc3RQZXJzb24gfCBudWxsPiB7XG4gICAgaWYgKGh1bWFub2lkID09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHYxUmVzdWx0ID0gYXdhaXQgdGhpcy5fdjFJbXBvcnQoZ2x0ZiwgaHVtYW5vaWQpO1xuICAgIGlmICh2MVJlc3VsdCkge1xuICAgICAgcmV0dXJuIHYxUmVzdWx0O1xuICAgIH1cblxuICAgIGNvbnN0IHYwUmVzdWx0ID0gYXdhaXQgdGhpcy5fdjBJbXBvcnQoZ2x0ZiwgaHVtYW5vaWQpO1xuICAgIGlmICh2MFJlc3VsdCkge1xuICAgICAgcmV0dXJuIHYwUmVzdWx0O1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfdjFJbXBvcnQoZ2x0ZjogR0xURiwgaHVtYW5vaWQ6IFZSTUh1bWFub2lkKTogUHJvbWlzZTxWUk1GaXJzdFBlcnNvbiB8IG51bGw+IHtcbiAgICBjb25zdCBqc29uID0gdGhpcy5wYXJzZXIuanNvbiBhcyBHTFRGU2NoZW1hLklHTFRGO1xuXG4gICAgLy8gZWFybHkgYWJvcnQgaWYgaXQgZG9lc24ndCB1c2UgdnJtXG4gICAgY29uc3QgaXNWUk1Vc2VkID0ganNvbi5leHRlbnNpb25zVXNlZD8uaW5kZXhPZignVlJNQ192cm0nKSAhPT0gLTE7XG4gICAgaWYgKCFpc1ZSTVVzZWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGV4dGVuc2lvbiA9IGpzb24uZXh0ZW5zaW9ucz8uWydWUk1DX3ZybSddIGFzIFYxVlJNU2NoZW1hLlZSTUNWUk0gfCB1bmRlZmluZWQ7XG4gICAgaWYgKCFleHRlbnNpb24pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNwZWNWZXJzaW9uID0gZXh0ZW5zaW9uLnNwZWNWZXJzaW9uO1xuICAgIGlmICghUE9TU0lCTEVfU1BFQ19WRVJTSU9OUy5oYXMoc3BlY1ZlcnNpb24pKSB7XG4gICAgICBjb25zb2xlLndhcm4oYFZSTUZpcnN0UGVyc29uTG9hZGVyUGx1Z2luOiBVbmtub3duIFZSTUNfdnJtIHNwZWNWZXJzaW9uIFwiJHtzcGVjVmVyc2lvbn1cImApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc2NoZW1hRmlyc3RQZXJzb24gPSBleHRlbnNpb24uZmlyc3RQZXJzb247XG4gICAgaWYgKCFzY2hlbWFGaXJzdFBlcnNvbikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgbWVzaEFubm90YXRpb25zOiBWUk1GaXJzdFBlcnNvbk1lc2hBbm5vdGF0aW9uW10gPSBbXTtcbiAgICBjb25zdCBub2RlUHJpbWl0aXZlc01hcCA9IGF3YWl0IGdsdGZFeHRyYWN0UHJpbWl0aXZlc0Zyb21Ob2RlcyhnbHRmKTtcbiAgICBBcnJheS5mcm9tKG5vZGVQcmltaXRpdmVzTWFwLmVudHJpZXMoKSkuZm9yRWFjaCgoW25vZGVJbmRleCwgcHJpbWl0aXZlc10pID0+IHtcbiAgICAgIGNvbnN0IGFubm90YXRpb24gPSBzY2hlbWFGaXJzdFBlcnNvbi5tZXNoQW5ub3RhdGlvbnNcbiAgICAgICAgPyBzY2hlbWFGaXJzdFBlcnNvbi5tZXNoQW5ub3RhdGlvbnMuZmluZCgoYSkgPT4gYS5ub2RlID09PSBub2RlSW5kZXgpXG4gICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgICBtZXNoQW5ub3RhdGlvbnMucHVzaCh7XG4gICAgICAgIG1lc2hlczogcHJpbWl0aXZlcyxcbiAgICAgICAgdHlwZTogYW5ub3RhdGlvbj8udHlwZSA/PyAnYm90aCcsXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHJldHVybiBuZXcgVlJNRmlyc3RQZXJzb24oaHVtYW5vaWQsIG1lc2hBbm5vdGF0aW9ucyk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF92MEltcG9ydChnbHRmOiBHTFRGLCBodW1hbm9pZDogVlJNSHVtYW5vaWQpOiBQcm9taXNlPFZSTUZpcnN0UGVyc29uIHwgbnVsbD4ge1xuICAgIGNvbnN0IGpzb24gPSB0aGlzLnBhcnNlci5qc29uIGFzIEdMVEZTY2hlbWEuSUdMVEY7XG5cbiAgICBjb25zdCB2cm1FeHQgPSBqc29uLmV4dGVuc2lvbnM/LlZSTSBhcyBWMFZSTS5WUk0gfCB1bmRlZmluZWQ7XG4gICAgaWYgKCF2cm1FeHQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNjaGVtYUZpcnN0UGVyc29uOiBWMFZSTS5GaXJzdFBlcnNvbiB8IHVuZGVmaW5lZCA9IHZybUV4dC5maXJzdFBlcnNvbjtcbiAgICBpZiAoIXNjaGVtYUZpcnN0UGVyc29uKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBtZXNoQW5ub3RhdGlvbnM6IFZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb25bXSA9IFtdO1xuICAgIGNvbnN0IG5vZGVQcmltaXRpdmVzTWFwID0gYXdhaXQgZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGVzKGdsdGYpO1xuXG4gICAgQXJyYXkuZnJvbShub2RlUHJpbWl0aXZlc01hcC5lbnRyaWVzKCkpLmZvckVhY2goKFtub2RlSW5kZXgsIHByaW1pdGl2ZXNdKSA9PiB7XG4gICAgICBjb25zdCBzY2hlbWFOb2RlID0ganNvbi5ub2RlcyFbbm9kZUluZGV4XTtcblxuICAgICAgY29uc3QgZmxhZyA9IHNjaGVtYUZpcnN0UGVyc29uLm1lc2hBbm5vdGF0aW9uc1xuICAgICAgICA/IHNjaGVtYUZpcnN0UGVyc29uLm1lc2hBbm5vdGF0aW9ucy5maW5kKChhKSA9PiBhLm1lc2ggPT09IHNjaGVtYU5vZGUubWVzaClcbiAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICAgIG1lc2hBbm5vdGF0aW9ucy5wdXNoKHtcbiAgICAgICAgbWVzaGVzOiBwcmltaXRpdmVzLFxuICAgICAgICB0eXBlOiB0aGlzLl9jb252ZXJ0VjBGbGFnVG9WMVR5cGUoZmxhZz8uZmlyc3RQZXJzb25GbGFnKSxcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5ldyBWUk1GaXJzdFBlcnNvbihodW1hbm9pZCwgbWVzaEFubm90YXRpb25zKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbnZlcnRWMEZsYWdUb1YxVHlwZShmbGFnOiBzdHJpbmcgfCB1bmRlZmluZWQpOiBWUk1GaXJzdFBlcnNvbk1lc2hBbm5vdGF0aW9uVHlwZSB7XG4gICAgaWYgKGZsYWcgPT09ICdGaXJzdFBlcnNvbk9ubHknKSB7XG4gICAgICByZXR1cm4gJ2ZpcnN0UGVyc29uT25seSc7XG4gICAgfSBlbHNlIGlmIChmbGFnID09PSAnVGhpcmRQZXJzb25Pbmx5Jykge1xuICAgICAgcmV0dXJuICd0aGlyZFBlcnNvbk9ubHknO1xuICAgIH0gZWxzZSBpZiAoZmxhZyA9PT0gJ0F1dG8nKSB7XG4gICAgICByZXR1cm4gJ2F1dG8nO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJ2JvdGgnO1xuICAgIH1cbiAgfVxufVxuIiwgIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiAqL1xuXG5leHBvcnQgY29uc3QgVlJNRmlyc3RQZXJzb25NZXNoQW5ub3RhdGlvblR5cGUgPSB7XG4gIEF1dG86ICdhdXRvJyxcbiAgQm90aDogJ2JvdGgnLFxuICBUaGlyZFBlcnNvbk9ubHk6ICd0aGlyZFBlcnNvbk9ubHknLFxuICBGaXJzdFBlcnNvbk9ubHk6ICdmaXJzdFBlcnNvbk9ubHknLFxufSBhcyBjb25zdDtcblxuZXhwb3J0IHR5cGUgVlJNRmlyc3RQZXJzb25NZXNoQW5ub3RhdGlvblR5cGUgPVxuICB0eXBlb2YgVlJNRmlyc3RQZXJzb25NZXNoQW5ub3RhdGlvblR5cGVba2V5b2YgdHlwZW9mIFZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb25UeXBlXTtcbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1IdW1hbkJvbmUgfSBmcm9tICcuLi9WUk1IdW1hbkJvbmUnO1xuaW1wb3J0IHsgVlJNSHVtYW5vaWQgfSBmcm9tICcuLi9WUk1IdW1hbm9pZCc7XG5cbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3YzQiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfcXVhdEEgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXG5leHBvcnQgY2xhc3MgVlJNSHVtYW5vaWRIZWxwZXIgZXh0ZW5kcyBUSFJFRS5Hcm91cCB7XG4gIHB1YmxpYyByZWFkb25seSB2cm1IdW1hbm9pZDogVlJNSHVtYW5vaWQ7XG4gIHByaXZhdGUgX2JvbmVBeGVzTWFwOiBNYXA8VlJNSHVtYW5Cb25lLCBUSFJFRS5BeGVzSGVscGVyPjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoaHVtYW5vaWQ6IFZSTUh1bWFub2lkKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMudnJtSHVtYW5vaWQgPSBodW1hbm9pZDtcblxuICAgIHRoaXMuX2JvbmVBeGVzTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgT2JqZWN0LnZhbHVlcyhodW1hbm9pZC5odW1hbkJvbmVzKS5mb3JFYWNoKChib25lKSA9PiB7XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgVEhSRUUuQXhlc0hlbHBlcigxLjApO1xuXG4gICAgICBoZWxwZXIubWF0cml4QXV0b1VwZGF0ZSA9IGZhbHNlO1xuXG4gICAgICAoaGVscGVyLm1hdGVyaWFsIGFzIFRIUkVFLk1hdGVyaWFsKS5kZXB0aFRlc3QgPSBmYWxzZTtcbiAgICAgIChoZWxwZXIubWF0ZXJpYWwgYXMgVEhSRUUuTWF0ZXJpYWwpLmRlcHRoV3JpdGUgPSBmYWxzZTtcblxuICAgICAgdGhpcy5hZGQoaGVscGVyKTtcblxuICAgICAgdGhpcy5fYm9uZUF4ZXNNYXAuc2V0KGJvbmUsIGhlbHBlcik7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICBBcnJheS5mcm9tKHRoaXMuX2JvbmVBeGVzTWFwLnZhbHVlcygpKS5mb3JFYWNoKChheGVzKSA9PiB7XG4gICAgICBheGVzLmdlb21ldHJ5LmRpc3Bvc2UoKTtcbiAgICAgIChheGVzLm1hdGVyaWFsIGFzIFRIUkVFLk1hdGVyaWFsKS5kaXNwb3NlKCk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlTWF0cml4V29ybGQoZm9yY2U6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBBcnJheS5mcm9tKHRoaXMuX2JvbmVBeGVzTWFwLmVudHJpZXMoKSkuZm9yRWFjaCgoW2JvbmUsIGF4ZXNdKSA9PiB7XG4gICAgICBib25lLm5vZGUudXBkYXRlV29ybGRNYXRyaXgodHJ1ZSwgZmFsc2UpO1xuXG4gICAgICBib25lLm5vZGUubWF0cml4V29ybGQuZGVjb21wb3NlKF92M0EsIF9xdWF0QSwgX3YzQik7XG5cbiAgICAgIGNvbnN0IHNjYWxlID0gX3YzQS5zZXQoMC4xLCAwLjEsIDAuMSkuZGl2aWRlKF92M0IpO1xuICAgICAgYXhlcy5tYXRyaXguY29weShib25lLm5vZGUubWF0cml4V29ybGQpLnNjYWxlKHNjYWxlKTtcbiAgICB9KTtcblxuICAgIHN1cGVyLnVwZGF0ZU1hdHJpeFdvcmxkKGZvcmNlKTtcbiAgfVxufVxuIiwgIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiAqL1xuXG5pbXBvcnQgeyBWUk1IdW1hbkJvbmVOYW1lIH0gZnJvbSAnLi9WUk1IdW1hbkJvbmVOYW1lJztcblxuLyoqXG4gKiBUaGUgbGlzdCBvZiB7QGxpbmsgVlJNSHVtYW5Cb25lTmFtZX0uIERlcGVuZGVuY3kgYXdhcmUuXG4gKi9cbmV4cG9ydCBjb25zdCBWUk1IdW1hbkJvbmVMaXN0OiBWUk1IdW1hbkJvbmVOYW1lW10gPSBbXG4gICdoaXBzJyxcbiAgJ3NwaW5lJyxcbiAgJ2NoZXN0JyxcbiAgJ3VwcGVyQ2hlc3QnLFxuICAnbmVjaycsXG5cbiAgJ2hlYWQnLFxuICAnbGVmdEV5ZScsXG4gICdyaWdodEV5ZScsXG4gICdqYXcnLFxuXG4gICdsZWZ0VXBwZXJMZWcnLFxuICAnbGVmdExvd2VyTGVnJyxcbiAgJ2xlZnRGb290JyxcbiAgJ2xlZnRUb2VzJyxcblxuICAncmlnaHRVcHBlckxlZycsXG4gICdyaWdodExvd2VyTGVnJyxcbiAgJ3JpZ2h0Rm9vdCcsXG4gICdyaWdodFRvZXMnLFxuXG4gICdsZWZ0U2hvdWxkZXInLFxuICAnbGVmdFVwcGVyQXJtJyxcbiAgJ2xlZnRMb3dlckFybScsXG4gICdsZWZ0SGFuZCcsXG5cbiAgJ3JpZ2h0U2hvdWxkZXInLFxuICAncmlnaHRVcHBlckFybScsXG4gICdyaWdodExvd2VyQXJtJyxcbiAgJ3JpZ2h0SGFuZCcsXG5cbiAgJ2xlZnRUaHVtYk1ldGFjYXJwYWwnLFxuICAnbGVmdFRodW1iUHJveGltYWwnLFxuICAnbGVmdFRodW1iRGlzdGFsJyxcbiAgJ2xlZnRJbmRleFByb3hpbWFsJyxcbiAgJ2xlZnRJbmRleEludGVybWVkaWF0ZScsXG4gICdsZWZ0SW5kZXhEaXN0YWwnLFxuICAnbGVmdE1pZGRsZVByb3hpbWFsJyxcbiAgJ2xlZnRNaWRkbGVJbnRlcm1lZGlhdGUnLFxuICAnbGVmdE1pZGRsZURpc3RhbCcsXG4gICdsZWZ0UmluZ1Byb3hpbWFsJyxcbiAgJ2xlZnRSaW5nSW50ZXJtZWRpYXRlJyxcbiAgJ2xlZnRSaW5nRGlzdGFsJyxcbiAgJ2xlZnRMaXR0bGVQcm94aW1hbCcsXG4gICdsZWZ0TGl0dGxlSW50ZXJtZWRpYXRlJyxcbiAgJ2xlZnRMaXR0bGVEaXN0YWwnLFxuXG4gICdyaWdodFRodW1iTWV0YWNhcnBhbCcsXG4gICdyaWdodFRodW1iUHJveGltYWwnLFxuICAncmlnaHRUaHVtYkRpc3RhbCcsXG4gICdyaWdodEluZGV4UHJveGltYWwnLFxuICAncmlnaHRJbmRleEludGVybWVkaWF0ZScsXG4gICdyaWdodEluZGV4RGlzdGFsJyxcbiAgJ3JpZ2h0TWlkZGxlUHJveGltYWwnLFxuICAncmlnaHRNaWRkbGVJbnRlcm1lZGlhdGUnLFxuICAncmlnaHRNaWRkbGVEaXN0YWwnLFxuICAncmlnaHRSaW5nUHJveGltYWwnLFxuICAncmlnaHRSaW5nSW50ZXJtZWRpYXRlJyxcbiAgJ3JpZ2h0UmluZ0Rpc3RhbCcsXG4gICdyaWdodExpdHRsZVByb3hpbWFsJyxcbiAgJ3JpZ2h0TGl0dGxlSW50ZXJtZWRpYXRlJyxcbiAgJ3JpZ2h0TGl0dGxlRGlzdGFsJyxcbl07XG4iLCAiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uICovXG5cbi8qKlxuICogVGhlIG5hbWVzIG9mIHtAbGluayBWUk1IdW1hbm9pZH0gYm9uZSBuYW1lcy5cbiAqXG4gKiBSZWY6IGh0dHBzOi8vZ2l0aHViLmNvbS92cm0tYy92cm0tc3BlY2lmaWNhdGlvbi9ibG9iL21hc3Rlci9zcGVjaWZpY2F0aW9uL1ZSTUNfdnJtLTEuMC9odW1hbm9pZC5tZFxuICovXG5leHBvcnQgY29uc3QgVlJNSHVtYW5Cb25lTmFtZSA9IHtcbiAgSGlwczogJ2hpcHMnLFxuICBTcGluZTogJ3NwaW5lJyxcbiAgQ2hlc3Q6ICdjaGVzdCcsXG4gIFVwcGVyQ2hlc3Q6ICd1cHBlckNoZXN0JyxcbiAgTmVjazogJ25lY2snLFxuXG4gIEhlYWQ6ICdoZWFkJyxcbiAgTGVmdEV5ZTogJ2xlZnRFeWUnLFxuICBSaWdodEV5ZTogJ3JpZ2h0RXllJyxcbiAgSmF3OiAnamF3JyxcblxuICBMZWZ0VXBwZXJMZWc6ICdsZWZ0VXBwZXJMZWcnLFxuICBMZWZ0TG93ZXJMZWc6ICdsZWZ0TG93ZXJMZWcnLFxuICBMZWZ0Rm9vdDogJ2xlZnRGb290JyxcbiAgTGVmdFRvZXM6ICdsZWZ0VG9lcycsXG5cbiAgUmlnaHRVcHBlckxlZzogJ3JpZ2h0VXBwZXJMZWcnLFxuICBSaWdodExvd2VyTGVnOiAncmlnaHRMb3dlckxlZycsXG4gIFJpZ2h0Rm9vdDogJ3JpZ2h0Rm9vdCcsXG4gIFJpZ2h0VG9lczogJ3JpZ2h0VG9lcycsXG5cbiAgTGVmdFNob3VsZGVyOiAnbGVmdFNob3VsZGVyJyxcbiAgTGVmdFVwcGVyQXJtOiAnbGVmdFVwcGVyQXJtJyxcbiAgTGVmdExvd2VyQXJtOiAnbGVmdExvd2VyQXJtJyxcbiAgTGVmdEhhbmQ6ICdsZWZ0SGFuZCcsXG5cbiAgUmlnaHRTaG91bGRlcjogJ3JpZ2h0U2hvdWxkZXInLFxuICBSaWdodFVwcGVyQXJtOiAncmlnaHRVcHBlckFybScsXG4gIFJpZ2h0TG93ZXJBcm06ICdyaWdodExvd2VyQXJtJyxcbiAgUmlnaHRIYW5kOiAncmlnaHRIYW5kJyxcblxuICBMZWZ0VGh1bWJNZXRhY2FycGFsOiAnbGVmdFRodW1iTWV0YWNhcnBhbCcsXG4gIExlZnRUaHVtYlByb3hpbWFsOiAnbGVmdFRodW1iUHJveGltYWwnLFxuICBMZWZ0VGh1bWJEaXN0YWw6ICdsZWZ0VGh1bWJEaXN0YWwnLFxuICBMZWZ0SW5kZXhQcm94aW1hbDogJ2xlZnRJbmRleFByb3hpbWFsJyxcbiAgTGVmdEluZGV4SW50ZXJtZWRpYXRlOiAnbGVmdEluZGV4SW50ZXJtZWRpYXRlJyxcbiAgTGVmdEluZGV4RGlzdGFsOiAnbGVmdEluZGV4RGlzdGFsJyxcbiAgTGVmdE1pZGRsZVByb3hpbWFsOiAnbGVmdE1pZGRsZVByb3hpbWFsJyxcbiAgTGVmdE1pZGRsZUludGVybWVkaWF0ZTogJ2xlZnRNaWRkbGVJbnRlcm1lZGlhdGUnLFxuICBMZWZ0TWlkZGxlRGlzdGFsOiAnbGVmdE1pZGRsZURpc3RhbCcsXG4gIExlZnRSaW5nUHJveGltYWw6ICdsZWZ0UmluZ1Byb3hpbWFsJyxcbiAgTGVmdFJpbmdJbnRlcm1lZGlhdGU6ICdsZWZ0UmluZ0ludGVybWVkaWF0ZScsXG4gIExlZnRSaW5nRGlzdGFsOiAnbGVmdFJpbmdEaXN0YWwnLFxuICBMZWZ0TGl0dGxlUHJveGltYWw6ICdsZWZ0TGl0dGxlUHJveGltYWwnLFxuICBMZWZ0TGl0dGxlSW50ZXJtZWRpYXRlOiAnbGVmdExpdHRsZUludGVybWVkaWF0ZScsXG4gIExlZnRMaXR0bGVEaXN0YWw6ICdsZWZ0TGl0dGxlRGlzdGFsJyxcblxuICBSaWdodFRodW1iTWV0YWNhcnBhbDogJ3JpZ2h0VGh1bWJNZXRhY2FycGFsJyxcbiAgUmlnaHRUaHVtYlByb3hpbWFsOiAncmlnaHRUaHVtYlByb3hpbWFsJyxcbiAgUmlnaHRUaHVtYkRpc3RhbDogJ3JpZ2h0VGh1bWJEaXN0YWwnLFxuICBSaWdodEluZGV4UHJveGltYWw6ICdyaWdodEluZGV4UHJveGltYWwnLFxuICBSaWdodEluZGV4SW50ZXJtZWRpYXRlOiAncmlnaHRJbmRleEludGVybWVkaWF0ZScsXG4gIFJpZ2h0SW5kZXhEaXN0YWw6ICdyaWdodEluZGV4RGlzdGFsJyxcbiAgUmlnaHRNaWRkbGVQcm94aW1hbDogJ3JpZ2h0TWlkZGxlUHJveGltYWwnLFxuICBSaWdodE1pZGRsZUludGVybWVkaWF0ZTogJ3JpZ2h0TWlkZGxlSW50ZXJtZWRpYXRlJyxcbiAgUmlnaHRNaWRkbGVEaXN0YWw6ICdyaWdodE1pZGRsZURpc3RhbCcsXG4gIFJpZ2h0UmluZ1Byb3hpbWFsOiAncmlnaHRSaW5nUHJveGltYWwnLFxuICBSaWdodFJpbmdJbnRlcm1lZGlhdGU6ICdyaWdodFJpbmdJbnRlcm1lZGlhdGUnLFxuICBSaWdodFJpbmdEaXN0YWw6ICdyaWdodFJpbmdEaXN0YWwnLFxuICBSaWdodExpdHRsZVByb3hpbWFsOiAncmlnaHRMaXR0bGVQcm94aW1hbCcsXG4gIFJpZ2h0TGl0dGxlSW50ZXJtZWRpYXRlOiAncmlnaHRMaXR0bGVJbnRlcm1lZGlhdGUnLFxuICBSaWdodExpdHRsZURpc3RhbDogJ3JpZ2h0TGl0dGxlRGlzdGFsJyxcbn0gYXMgY29uc3Q7XG5cbmV4cG9ydCB0eXBlIFZSTUh1bWFuQm9uZU5hbWUgPSB0eXBlb2YgVlJNSHVtYW5Cb25lTmFtZVtrZXlvZiB0eXBlb2YgVlJNSHVtYW5Cb25lTmFtZV07XG4iLCAiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uICovXG5cbmltcG9ydCB7IFZSTUh1bWFuQm9uZU5hbWUgfSBmcm9tICcuL1ZSTUh1bWFuQm9uZU5hbWUnO1xuXG4vKipcbiAqIEFuIG9iamVjdCB0aGF0IG1hcHMgZnJvbSB7QGxpbmsgVlJNSHVtYW5Cb25lTmFtZX0gdG8gaXRzIHBhcmVudCB7QGxpbmsgVlJNSHVtYW5Cb25lTmFtZX0uXG4gKlxuICogUmVmOiBodHRwczovL2dpdGh1Yi5jb20vdnJtLWMvdnJtLXNwZWNpZmljYXRpb24vYmxvYi9tYXN0ZXIvc3BlY2lmaWNhdGlvbi9WUk1DX3ZybS0xLjAvaHVtYW5vaWQubWRcbiAqL1xuZXhwb3J0IGNvbnN0IFZSTUh1bWFuQm9uZVBhcmVudE1hcDogeyBbYm9uZSBpbiBWUk1IdW1hbkJvbmVOYW1lXTogVlJNSHVtYW5Cb25lTmFtZSB8IG51bGwgfSA9IHtcbiAgaGlwczogbnVsbCxcbiAgc3BpbmU6ICdoaXBzJyxcbiAgY2hlc3Q6ICdzcGluZScsXG4gIHVwcGVyQ2hlc3Q6ICdjaGVzdCcsXG4gIG5lY2s6ICd1cHBlckNoZXN0JyxcblxuICBoZWFkOiAnbmVjaycsXG4gIGxlZnRFeWU6ICdoZWFkJyxcbiAgcmlnaHRFeWU6ICdoZWFkJyxcbiAgamF3OiAnaGVhZCcsXG5cbiAgbGVmdFVwcGVyTGVnOiAnaGlwcycsXG4gIGxlZnRMb3dlckxlZzogJ2xlZnRVcHBlckxlZycsXG4gIGxlZnRGb290OiAnbGVmdExvd2VyTGVnJyxcbiAgbGVmdFRvZXM6ICdsZWZ0Rm9vdCcsXG5cbiAgcmlnaHRVcHBlckxlZzogJ2hpcHMnLFxuICByaWdodExvd2VyTGVnOiAncmlnaHRVcHBlckxlZycsXG4gIHJpZ2h0Rm9vdDogJ3JpZ2h0TG93ZXJMZWcnLFxuICByaWdodFRvZXM6ICdyaWdodEZvb3QnLFxuXG4gIGxlZnRTaG91bGRlcjogJ3VwcGVyQ2hlc3QnLFxuICBsZWZ0VXBwZXJBcm06ICdsZWZ0U2hvdWxkZXInLFxuICBsZWZ0TG93ZXJBcm06ICdsZWZ0VXBwZXJBcm0nLFxuICBsZWZ0SGFuZDogJ2xlZnRMb3dlckFybScsXG5cbiAgcmlnaHRTaG91bGRlcjogJ3VwcGVyQ2hlc3QnLFxuICByaWdodFVwcGVyQXJtOiAncmlnaHRTaG91bGRlcicsXG4gIHJpZ2h0TG93ZXJBcm06ICdyaWdodFVwcGVyQXJtJyxcbiAgcmlnaHRIYW5kOiAncmlnaHRMb3dlckFybScsXG5cbiAgbGVmdFRodW1iTWV0YWNhcnBhbDogJ2xlZnRIYW5kJyxcbiAgbGVmdFRodW1iUHJveGltYWw6ICdsZWZ0VGh1bWJNZXRhY2FycGFsJyxcbiAgbGVmdFRodW1iRGlzdGFsOiAnbGVmdFRodW1iUHJveGltYWwnLFxuICBsZWZ0SW5kZXhQcm94aW1hbDogJ2xlZnRIYW5kJyxcbiAgbGVmdEluZGV4SW50ZXJtZWRpYXRlOiAnbGVmdEluZGV4UHJveGltYWwnLFxuICBsZWZ0SW5kZXhEaXN0YWw6ICdsZWZ0SW5kZXhJbnRlcm1lZGlhdGUnLFxuICBsZWZ0TWlkZGxlUHJveGltYWw6ICdsZWZ0SGFuZCcsXG4gIGxlZnRNaWRkbGVJbnRlcm1lZGlhdGU6ICdsZWZ0TWlkZGxlUHJveGltYWwnLFxuICBsZWZ0TWlkZGxlRGlzdGFsOiAnbGVmdE1pZGRsZUludGVybWVkaWF0ZScsXG4gIGxlZnRSaW5nUHJveGltYWw6ICdsZWZ0SGFuZCcsXG4gIGxlZnRSaW5nSW50ZXJtZWRpYXRlOiAnbGVmdFJpbmdQcm94aW1hbCcsXG4gIGxlZnRSaW5nRGlzdGFsOiAnbGVmdFJpbmdJbnRlcm1lZGlhdGUnLFxuICBsZWZ0TGl0dGxlUHJveGltYWw6ICdsZWZ0SGFuZCcsXG4gIGxlZnRMaXR0bGVJbnRlcm1lZGlhdGU6ICdsZWZ0TGl0dGxlUHJveGltYWwnLFxuICBsZWZ0TGl0dGxlRGlzdGFsOiAnbGVmdExpdHRsZUludGVybWVkaWF0ZScsXG5cbiAgcmlnaHRUaHVtYk1ldGFjYXJwYWw6ICdyaWdodEhhbmQnLFxuICByaWdodFRodW1iUHJveGltYWw6ICdyaWdodFRodW1iTWV0YWNhcnBhbCcsXG4gIHJpZ2h0VGh1bWJEaXN0YWw6ICdyaWdodFRodW1iUHJveGltYWwnLFxuICByaWdodEluZGV4UHJveGltYWw6ICdyaWdodEhhbmQnLFxuICByaWdodEluZGV4SW50ZXJtZWRpYXRlOiAncmlnaHRJbmRleFByb3hpbWFsJyxcbiAgcmlnaHRJbmRleERpc3RhbDogJ3JpZ2h0SW5kZXhJbnRlcm1lZGlhdGUnLFxuICByaWdodE1pZGRsZVByb3hpbWFsOiAncmlnaHRIYW5kJyxcbiAgcmlnaHRNaWRkbGVJbnRlcm1lZGlhdGU6ICdyaWdodE1pZGRsZVByb3hpbWFsJyxcbiAgcmlnaHRNaWRkbGVEaXN0YWw6ICdyaWdodE1pZGRsZUludGVybWVkaWF0ZScsXG4gIHJpZ2h0UmluZ1Byb3hpbWFsOiAncmlnaHRIYW5kJyxcbiAgcmlnaHRSaW5nSW50ZXJtZWRpYXRlOiAncmlnaHRSaW5nUHJveGltYWwnLFxuICByaWdodFJpbmdEaXN0YWw6ICdyaWdodFJpbmdJbnRlcm1lZGlhdGUnLFxuICByaWdodExpdHRsZVByb3hpbWFsOiAncmlnaHRIYW5kJyxcbiAgcmlnaHRMaXR0bGVJbnRlcm1lZGlhdGU6ICdyaWdodExpdHRsZVByb3hpbWFsJyxcbiAgcmlnaHRMaXR0bGVEaXN0YWw6ICdyaWdodExpdHRsZUludGVybWVkaWF0ZScsXG59O1xuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IHF1YXRJbnZlcnRDb21wYXQgfSBmcm9tICcuLi91dGlscy9xdWF0SW52ZXJ0Q29tcGF0JztcbmltcG9ydCB0eXBlIHsgVlJNSHVtYW5Cb25lIH0gZnJvbSAnLi9WUk1IdW1hbkJvbmUnO1xuaW1wb3J0IHR5cGUgeyBWUk1IdW1hbkJvbmVzIH0gZnJvbSAnLi9WUk1IdW1hbkJvbmVzJztcbmltcG9ydCB0eXBlIHsgVlJNSHVtYW5Cb25lTmFtZSB9IGZyb20gJy4vVlJNSHVtYW5Cb25lTmFtZSc7XG5pbXBvcnQgdHlwZSB7IFZSTVBvc2UgfSBmcm9tICcuL1ZSTVBvc2UnO1xuXG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF9xdWF0QSA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5cbi8qKlxuICogQSBjbGFzcyByZXByZXNlbnRzIHRoZSBSaWcgb2YgYSBWUk0uXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1SaWcge1xuICAvKipcbiAgICogQSB7QGxpbmsgVlJNSHVtYW5Cb25lc30gdGhhdCBjb250YWlucyBhbGwgdGhlIGh1bWFuIGJvbmVzIG9mIHRoZSBWUk0uXG4gICAqIFlvdSBtaWdodCB3YW50IHRvIGdldCB0aGVzZSBib25lcyB1c2luZyB7QGxpbmsgVlJNSHVtYW5vaWQuZ2V0Qm9uZX0uXG4gICAqL1xuICBwdWJsaWMgaHVtYW5Cb25lczogVlJNSHVtYW5Cb25lcztcblxuICAvKipcbiAgICogQSB7QGxpbmsgVlJNUG9zZX0gdGhhdCBpcyBpdHMgZGVmYXVsdCBzdGF0ZS5cbiAgICogTm90ZSB0aGF0IGl0J3Mgbm90IGNvbXBhdGlibGUgd2l0aCB7QGxpbmsgc2V0UG9zZX0gYW5kIHtAbGluayBnZXRQb3NlfSwgc2luY2UgaXQgY29udGFpbnMgbm9uLXJlbGF0aXZlIHZhbHVlcyBvZiBlYWNoIGxvY2FsIHRyYW5zZm9ybXMuXG4gICAqL1xuICBwdWJsaWMgcmVzdFBvc2U6IFZSTVBvc2U7XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyB7QGxpbmsgVlJNSHVtYW5vaWR9LlxuICAgKiBAcGFyYW0gaHVtYW5Cb25lcyBBIHtAbGluayBWUk1IdW1hbkJvbmVzfSBjb250YWlucyBhbGwgdGhlIGJvbmVzIG9mIHRoZSBuZXcgaHVtYW5vaWRcbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihodW1hbkJvbmVzOiBWUk1IdW1hbkJvbmVzKSB7XG4gICAgdGhpcy5odW1hbkJvbmVzID0gaHVtYW5Cb25lcztcblxuICAgIHRoaXMucmVzdFBvc2UgPSB0aGlzLmdldEFic29sdXRlUG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgY3VycmVudCBhYnNvbHV0ZSBwb3NlIG9mIHRoaXMgaHVtYW5vaWQgYXMgYSB7QGxpbmsgVlJNUG9zZX0uXG4gICAqIE5vdGUgdGhhdCB0aGUgb3V0cHV0IHJlc3VsdCB3aWxsIGNvbnRhaW4gaW5pdGlhbCBzdGF0ZSBvZiB0aGUgVlJNIGFuZCBub3QgY29tcGF0aWJsZSBiZXR3ZWVuIGRpZmZlcmVudCBtb2RlbHMuXG4gICAqIFlvdSBtaWdodCB3YW50IHRvIHVzZSB7QGxpbmsgZ2V0UG9zZX0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBnZXRBYnNvbHV0ZVBvc2UoKTogVlJNUG9zZSB7XG4gICAgY29uc3QgcG9zZSA9IHt9IGFzIFZSTVBvc2U7XG5cbiAgICBPYmplY3Qua2V5cyh0aGlzLmh1bWFuQm9uZXMpLmZvckVhY2goKHZybUJvbmVOYW1lU3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCB2cm1Cb25lTmFtZSA9IHZybUJvbmVOYW1lU3RyaW5nIGFzIFZSTUh1bWFuQm9uZU5hbWU7XG4gICAgICBjb25zdCBub2RlID0gdGhpcy5nZXRCb25lTm9kZSh2cm1Cb25lTmFtZSk7XG5cbiAgICAgIC8vIElnbm9yZSB3aGVuIHRoZXJlIGFyZSBubyBib25lIG9uIHRoZSBWUk1IdW1hbm9pZFxuICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gR2V0IHRoZSBwb3NpdGlvbiAvIHJvdGF0aW9uIGZyb20gdGhlIG5vZGVcbiAgICAgIF92M0EuY29weShub2RlLnBvc2l0aW9uKTtcbiAgICAgIF9xdWF0QS5jb3B5KG5vZGUucXVhdGVybmlvbik7XG5cbiAgICAgIC8vIENvbnZlcnQgdG8gcmF3IGFycmF5c1xuICAgICAgcG9zZVt2cm1Cb25lTmFtZV0gPSB7XG4gICAgICAgIHBvc2l0aW9uOiBfdjNBLnRvQXJyYXkoKSBhcyBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl0sXG4gICAgICAgIHJvdGF0aW9uOiBfcXVhdEEudG9BcnJheSgpIGFzIFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdLFxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIHJldHVybiBwb3NlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgY3VycmVudCBwb3NlIG9mIHRoaXMgaHVtYW5vaWQgYXMgYSB7QGxpbmsgVlJNUG9zZX0uXG4gICAqXG4gICAqIEVhY2ggdHJhbnNmb3JtIGlzIGEgbG9jYWwgdHJhbnNmb3JtIHJlbGF0aXZlIGZyb20gcmVzdCBwb3NlIChULXBvc2UpLlxuICAgKi9cbiAgcHVibGljIGdldFBvc2UoKTogVlJNUG9zZSB7XG4gICAgY29uc3QgcG9zZSA9IHt9IGFzIFZSTVBvc2U7XG5cbiAgICBPYmplY3Qua2V5cyh0aGlzLmh1bWFuQm9uZXMpLmZvckVhY2goKGJvbmVOYW1lU3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCBib25lTmFtZSA9IGJvbmVOYW1lU3RyaW5nIGFzIFZSTUh1bWFuQm9uZU5hbWU7XG4gICAgICBjb25zdCBub2RlID0gdGhpcy5nZXRCb25lTm9kZShib25lTmFtZSk7XG5cbiAgICAgIC8vIElnbm9yZSB3aGVuIHRoZXJlIGFyZSBubyBib25lIG9uIHRoZSBWUk1IdW1hbm9pZFxuICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gVGFrZSBhIGRpZmYgZnJvbSByZXN0UG9zZVxuICAgICAgX3YzQS5zZXQoMCwgMCwgMCk7XG4gICAgICBfcXVhdEEuaWRlbnRpdHkoKTtcblxuICAgICAgY29uc3QgcmVzdFN0YXRlID0gdGhpcy5yZXN0UG9zZVtib25lTmFtZV07XG4gICAgICBpZiAocmVzdFN0YXRlPy5wb3NpdGlvbikge1xuICAgICAgICBfdjNBLmZyb21BcnJheShyZXN0U3RhdGUucG9zaXRpb24pLm5lZ2F0ZSgpO1xuICAgICAgfVxuICAgICAgaWYgKHJlc3RTdGF0ZT8ucm90YXRpb24pIHtcbiAgICAgICAgcXVhdEludmVydENvbXBhdChfcXVhdEEuZnJvbUFycmF5KHJlc3RTdGF0ZS5yb3RhdGlvbikpO1xuICAgICAgfVxuXG4gICAgICAvLyBHZXQgdGhlIHBvc2l0aW9uIC8gcm90YXRpb24gZnJvbSB0aGUgbm9kZVxuICAgICAgX3YzQS5hZGQobm9kZS5wb3NpdGlvbik7XG4gICAgICBfcXVhdEEucHJlbXVsdGlwbHkobm9kZS5xdWF0ZXJuaW9uKTtcblxuICAgICAgLy8gQ29udmVydCB0byByYXcgYXJyYXlzXG4gICAgICBwb3NlW2JvbmVOYW1lXSA9IHtcbiAgICAgICAgcG9zaXRpb246IF92M0EudG9BcnJheSgpIGFzIFtudW1iZXIsIG51bWJlciwgbnVtYmVyXSxcbiAgICAgICAgcm90YXRpb246IF9xdWF0QS50b0FycmF5KCkgYXMgW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl0sXG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHBvc2U7XG4gIH1cblxuICAvKipcbiAgICogTGV0IHRoZSBodW1hbm9pZCBkbyBhIHNwZWNpZmllZCBwb3NlLlxuICAgKlxuICAgKiBFYWNoIHRyYW5zZm9ybSBoYXZlIHRvIGJlIGEgbG9jYWwgdHJhbnNmb3JtIHJlbGF0aXZlIGZyb20gcmVzdCBwb3NlIChULXBvc2UpLlxuICAgKiBZb3UgY2FuIHBhc3Mgd2hhdCB5b3UgZ290IGZyb20ge0BsaW5rIGdldFBvc2V9LlxuICAgKlxuICAgKiBAcGFyYW0gcG9zZU9iamVjdCBBIFtbVlJNUG9zZV1dIHRoYXQgcmVwcmVzZW50cyBhIHNpbmdsZSBwb3NlXG4gICAqL1xuICBwdWJsaWMgc2V0UG9zZShwb3NlT2JqZWN0OiBWUk1Qb3NlKTogdm9pZCB7XG4gICAgT2JqZWN0LmVudHJpZXMocG9zZU9iamVjdCkuZm9yRWFjaCgoW2JvbmVOYW1lU3RyaW5nLCBzdGF0ZV0pID0+IHtcbiAgICAgIGNvbnN0IGJvbmVOYW1lID0gYm9uZU5hbWVTdHJpbmcgYXMgVlJNSHVtYW5Cb25lTmFtZTtcbiAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLmdldEJvbmVOb2RlKGJvbmVOYW1lKTtcblxuICAgICAgLy8gSWdub3JlIHdoZW4gdGhlcmUgYXJlIG5vIGJvbmUgdGhhdCBpcyBkZWZpbmVkIGluIHRoZSBwb3NlIG9uIHRoZSBWUk1IdW1hbm9pZFxuICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVzdFN0YXRlID0gdGhpcy5yZXN0UG9zZVtib25lTmFtZV07XG4gICAgICBpZiAoIXJlc3RTdGF0ZSkge1xuICAgICAgICAvLyBJdCdzIHZlcnkgdW5saWtlbHkuIFBvc3NpYmx5IGEgYnVnXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gQXBwbHkgdGhlIHN0YXRlIHRvIHRoZSBhY3R1YWwgYm9uZVxuICAgICAgaWYgKHN0YXRlPy5wb3NpdGlvbikge1xuICAgICAgICBub2RlLnBvc2l0aW9uLmZyb21BcnJheShzdGF0ZS5wb3NpdGlvbik7XG5cbiAgICAgICAgaWYgKHJlc3RTdGF0ZS5wb3NpdGlvbikge1xuICAgICAgICAgIG5vZGUucG9zaXRpb24uYWRkKF92M0EuZnJvbUFycmF5KHJlc3RTdGF0ZS5wb3NpdGlvbikpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZT8ucm90YXRpb24pIHtcbiAgICAgICAgbm9kZS5xdWF0ZXJuaW9uLmZyb21BcnJheShzdGF0ZS5yb3RhdGlvbik7XG5cbiAgICAgICAgaWYgKHJlc3RTdGF0ZS5yb3RhdGlvbikge1xuICAgICAgICAgIG5vZGUucXVhdGVybmlvbi5tdWx0aXBseShfcXVhdEEuZnJvbUFycmF5KHJlc3RTdGF0ZS5yb3RhdGlvbikpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhlIGh1bWFub2lkIHRvIGl0cyByZXN0IHBvc2UuXG4gICAqL1xuICBwdWJsaWMgcmVzZXRQb3NlKCk6IHZvaWQge1xuICAgIE9iamVjdC5lbnRyaWVzKHRoaXMucmVzdFBvc2UpLmZvckVhY2goKFtib25lTmFtZSwgcmVzdF0pID0+IHtcbiAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLmdldEJvbmVOb2RlKGJvbmVOYW1lIGFzIFZSTUh1bWFuQm9uZU5hbWUpO1xuXG4gICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVzdD8ucG9zaXRpb24pIHtcbiAgICAgICAgbm9kZS5wb3NpdGlvbi5mcm9tQXJyYXkocmVzdC5wb3NpdGlvbik7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZXN0Py5yb3RhdGlvbikge1xuICAgICAgICBub2RlLnF1YXRlcm5pb24uZnJvbUFycmF5KHJlc3Qucm90YXRpb24pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhIGJvbmUgYm91bmQgdG8gYSBzcGVjaWZpZWQge0BsaW5rIFZSTUh1bWFuQm9uZU5hbWV9LCBhcyBhIHtAbGluayBWUk1IdW1hbkJvbmV9LlxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBib25lIHlvdSB3YW50XG4gICAqL1xuICBwdWJsaWMgZ2V0Qm9uZShuYW1lOiBWUk1IdW1hbkJvbmVOYW1lKTogVlJNSHVtYW5Cb25lIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5odW1hbkJvbmVzW25hbWVdID8/IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYSBib25lIGJvdW5kIHRvIGEgc3BlY2lmaWVkIHtAbGluayBWUk1IdW1hbkJvbmVOYW1lfSwgYXMgYSBgVEhSRUUuT2JqZWN0M0RgLlxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBib25lIHlvdSB3YW50XG4gICAqL1xuICBwdWJsaWMgZ2V0Qm9uZU5vZGUobmFtZTogVlJNSHVtYW5Cb25lTmFtZSk6IFRIUkVFLk9iamVjdDNEIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuaHVtYW5Cb25lc1tuYW1lXT8ubm9kZSA/PyBudWxsO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIEEgY29tcGF0IGZ1bmN0aW9uIGZvciBgUXVhdGVybmlvbi5pbnZlcnQoKWAgLyBgUXVhdGVybmlvbi5pbnZlcnNlKClgLlxuICogYFF1YXRlcm5pb24uaW52ZXJ0KClgIGlzIGludHJvZHVjZWQgaW4gcjEyMyBhbmQgYFF1YXRlcm5pb24uaW52ZXJzZSgpYCBlbWl0cyBhIHdhcm5pbmcuXG4gKiBXZSBhcmUgZ29pbmcgdG8gdXNlIHRoaXMgY29tcGF0IGZvciBhIHdoaWxlLlxuICogQHBhcmFtIHRhcmdldCBBIHRhcmdldCBxdWF0ZXJuaW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBxdWF0SW52ZXJ0Q29tcGF0PFQgZXh0ZW5kcyBUSFJFRS5RdWF0ZXJuaW9uPih0YXJnZXQ6IFQpOiBUIHtcbiAgaWYgKCh0YXJnZXQgYXMgYW55KS5pbnZlcnQpIHtcbiAgICB0YXJnZXQuaW52ZXJ0KCk7XG4gIH0gZWxzZSB7XG4gICAgKHRhcmdldCBhcyBhbnkpLmludmVyc2UoKTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNSHVtYW5Cb25lTmFtZSwgVlJNSHVtYW5Cb25lcyB9IGZyb20gJy4nO1xuaW1wb3J0IHsgVlJNSHVtYW5Cb25lTGlzdCB9IGZyb20gJy4vVlJNSHVtYW5Cb25lTGlzdCc7XG5pbXBvcnQgeyBWUk1IdW1hbkJvbmVQYXJlbnRNYXAgfSBmcm9tICcuL1ZSTUh1bWFuQm9uZVBhcmVudE1hcCc7XG5pbXBvcnQgeyBWUk1SaWcgfSBmcm9tICcuL1ZSTVJpZyc7XG5cbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3F1YXRBID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbmNvbnN0IF9ib25lV29ybGRQb3MgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4vKipcbiAqIEEgY2xhc3MgcmVwcmVzZW50cyB0aGUgbm9ybWFsaXplZCBSaWcgb2YgYSBWUk0uXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1IdW1hbm9pZFJpZyBleHRlbmRzIFZSTVJpZyB7XG4gIHByb3RlY3RlZCBzdGF0aWMgX3NldHVwVHJhbnNmb3Jtcyhtb2RlbFJpZzogVlJNUmlnKToge1xuICAgIHJpZ0JvbmVzOiBWUk1IdW1hbkJvbmVzO1xuICAgIHJvb3Q6IFRIUkVFLk9iamVjdDNEO1xuICAgIHBhcmVudFdvcmxkUm90YXRpb25zOiB7IFtib25lTmFtZSBpbiBWUk1IdW1hbkJvbmVOYW1lXT86IFRIUkVFLlF1YXRlcm5pb24gfTtcbiAgICBib25lUm90YXRpb25zOiB7IFtib25lTmFtZSBpbiBWUk1IdW1hbkJvbmVOYW1lXT86IFRIUkVFLlF1YXRlcm5pb24gfTtcbiAgfSB7XG4gICAgY29uc3Qgcm9vdCA9IG5ldyBUSFJFRS5PYmplY3QzRCgpO1xuICAgIHJvb3QubmFtZSA9ICdWUk1IdW1hbm9pZFJpZyc7XG5cbiAgICAvLyBzdG9yZSBib25lV29ybGRQb3NpdGlvbnMsIGJvbmVXb3JsZFJvdGF0aW9ucywgYW5kIHBhcmVudFdvcmxkUm90YXRpb25zXG4gICAgY29uc3QgYm9uZVdvcmxkUG9zaXRpb25zOiB7IFtib25lTmFtZSBpbiBWUk1IdW1hbkJvbmVOYW1lXT86IFRIUkVFLlZlY3RvcjMgfSA9IHt9O1xuICAgIGNvbnN0IGJvbmVXb3JsZFJvdGF0aW9uczogeyBbYm9uZU5hbWUgaW4gVlJNSHVtYW5Cb25lTmFtZV0/OiBUSFJFRS5RdWF0ZXJuaW9uIH0gPSB7fTtcbiAgICBjb25zdCBib25lUm90YXRpb25zOiB7IFtib25lTmFtZSBpbiBWUk1IdW1hbkJvbmVOYW1lXT86IFRIUkVFLlF1YXRlcm5pb24gfSA9IHt9O1xuICAgIGNvbnN0IHBhcmVudFdvcmxkUm90YXRpb25zOiB7IFtib25lTmFtZSBpbiBWUk1IdW1hbkJvbmVOYW1lXT86IFRIUkVFLlF1YXRlcm5pb24gfSA9IHt9O1xuXG4gICAgVlJNSHVtYW5Cb25lTGlzdC5mb3JFYWNoKChib25lTmFtZSkgPT4ge1xuICAgICAgY29uc3QgYm9uZU5vZGUgPSBtb2RlbFJpZy5nZXRCb25lTm9kZShib25lTmFtZSk7XG5cbiAgICAgIGlmIChib25lTm9kZSkge1xuICAgICAgICBjb25zdCBib25lV29ybGRQb3NpdGlvbiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG4gICAgICAgIGNvbnN0IGJvbmVXb3JsZFJvdGF0aW9uID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblxuICAgICAgICBib25lTm9kZS51cGRhdGVXb3JsZE1hdHJpeCh0cnVlLCBmYWxzZSk7XG4gICAgICAgIGJvbmVOb2RlLm1hdHJpeFdvcmxkLmRlY29tcG9zZShib25lV29ybGRQb3NpdGlvbiwgYm9uZVdvcmxkUm90YXRpb24sIF92M0EpO1xuXG4gICAgICAgIGJvbmVXb3JsZFBvc2l0aW9uc1tib25lTmFtZV0gPSBib25lV29ybGRQb3NpdGlvbjtcbiAgICAgICAgYm9uZVdvcmxkUm90YXRpb25zW2JvbmVOYW1lXSA9IGJvbmVXb3JsZFJvdGF0aW9uO1xuICAgICAgICBib25lUm90YXRpb25zW2JvbmVOYW1lXSA9IGJvbmVOb2RlLnF1YXRlcm5pb24uY2xvbmUoKTtcblxuICAgICAgICBjb25zdCBwYXJlbnRXb3JsZFJvdGF0aW9uID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbiAgICAgICAgYm9uZU5vZGUucGFyZW50Py5tYXRyaXhXb3JsZC5kZWNvbXBvc2UoX3YzQSwgcGFyZW50V29ybGRSb3RhdGlvbiwgX3YzQSk7XG4gICAgICAgIHBhcmVudFdvcmxkUm90YXRpb25zW2JvbmVOYW1lXSA9IHBhcmVudFdvcmxkUm90YXRpb247XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBidWlsZCByaWcgaGllcmFyY2h5ICsgc3RvcmUgcGFyZW50V29ybGRSb3RhdGlvbnNcbiAgICBjb25zdCByaWdCb25lczogUGFydGlhbDxWUk1IdW1hbkJvbmVzPiA9IHt9O1xuICAgIFZSTUh1bWFuQm9uZUxpc3QuZm9yRWFjaCgoYm9uZU5hbWUpID0+IHtcbiAgICAgIGNvbnN0IGJvbmVOb2RlID0gbW9kZWxSaWcuZ2V0Qm9uZU5vZGUoYm9uZU5hbWUpO1xuXG4gICAgICBpZiAoYm9uZU5vZGUpIHtcbiAgICAgICAgY29uc3QgYm9uZVdvcmxkUG9zaXRpb24gPSBib25lV29ybGRQb3NpdGlvbnNbYm9uZU5hbWVdIGFzIFRIUkVFLlZlY3RvcjM7XG5cbiAgICAgICAgLy8gc2VlIHRoZSBuZWFyZXN0IHBhcmVudCBwb3NpdGlvblxuICAgICAgICBsZXQgY3VycmVudEJvbmVOYW1lOiBWUk1IdW1hbkJvbmVOYW1lIHwgbnVsbCA9IGJvbmVOYW1lO1xuICAgICAgICBsZXQgcGFyZW50Qm9uZVdvcmxkUG9zaXRpb246IFRIUkVFLlZlY3RvcjMgfCB1bmRlZmluZWQ7XG4gICAgICAgIHdoaWxlIChwYXJlbnRCb25lV29ybGRQb3NpdGlvbiA9PSBudWxsKSB7XG4gICAgICAgICAgY3VycmVudEJvbmVOYW1lID0gVlJNSHVtYW5Cb25lUGFyZW50TWFwW2N1cnJlbnRCb25lTmFtZV07XG4gICAgICAgICAgaWYgKGN1cnJlbnRCb25lTmFtZSA9PSBudWxsKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgcGFyZW50Qm9uZVdvcmxkUG9zaXRpb24gPSBib25lV29ybGRQb3NpdGlvbnNbY3VycmVudEJvbmVOYW1lXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFkZCB0byBoaWVyYXJjaHlcbiAgICAgICAgY29uc3QgcmlnQm9uZU5vZGUgPSBuZXcgVEhSRUUuT2JqZWN0M0QoKTtcbiAgICAgICAgcmlnQm9uZU5vZGUubmFtZSA9ICdOb3JtYWxpemVkXycgKyBib25lTm9kZS5uYW1lO1xuXG4gICAgICAgIGNvbnN0IHBhcmVudFJpZ0JvbmVOb2RlID0gKGN1cnJlbnRCb25lTmFtZSA/IHJpZ0JvbmVzW2N1cnJlbnRCb25lTmFtZV0/Lm5vZGUgOiByb290KSBhcyBUSFJFRS5PYmplY3QzRDtcblxuICAgICAgICBwYXJlbnRSaWdCb25lTm9kZS5hZGQocmlnQm9uZU5vZGUpO1xuICAgICAgICByaWdCb25lTm9kZS5wb3NpdGlvbi5jb3B5KGJvbmVXb3JsZFBvc2l0aW9uKTtcbiAgICAgICAgaWYgKHBhcmVudEJvbmVXb3JsZFBvc2l0aW9uKSB7XG4gICAgICAgICAgcmlnQm9uZU5vZGUucG9zaXRpb24uc3ViKHBhcmVudEJvbmVXb3JsZFBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJpZ0JvbmVzW2JvbmVOYW1lXSA9IHsgbm9kZTogcmlnQm9uZU5vZGUgfTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiB7XG4gICAgICByaWdCb25lczogcmlnQm9uZXMgYXMgVlJNSHVtYW5Cb25lcyxcbiAgICAgIHJvb3QsXG4gICAgICBwYXJlbnRXb3JsZFJvdGF0aW9ucyxcbiAgICAgIGJvbmVSb3RhdGlvbnMsXG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyByZWFkb25seSBvcmlnaW5hbDogVlJNUmlnO1xuICBwdWJsaWMgcmVhZG9ubHkgcm9vdDogVEhSRUUuT2JqZWN0M0Q7XG4gIHByb3RlY3RlZCByZWFkb25seSBfcGFyZW50V29ybGRSb3RhdGlvbnM6IHsgW2JvbmVOYW1lIGluIFZSTUh1bWFuQm9uZU5hbWVdPzogVEhSRUUuUXVhdGVybmlvbiB9O1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2JvbmVSb3RhdGlvbnM6IHsgW2JvbmVOYW1lIGluIFZSTUh1bWFuQm9uZU5hbWVdPzogVEhSRUUuUXVhdGVybmlvbiB9O1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihodW1hbm9pZDogVlJNUmlnKSB7XG4gICAgY29uc3QgeyByaWdCb25lcywgcm9vdCwgcGFyZW50V29ybGRSb3RhdGlvbnMsIGJvbmVSb3RhdGlvbnMgfSA9IFZSTUh1bWFub2lkUmlnLl9zZXR1cFRyYW5zZm9ybXMoaHVtYW5vaWQpO1xuXG4gICAgc3VwZXIocmlnQm9uZXMpO1xuXG4gICAgdGhpcy5vcmlnaW5hbCA9IGh1bWFub2lkO1xuICAgIHRoaXMucm9vdCA9IHJvb3Q7XG4gICAgdGhpcy5fcGFyZW50V29ybGRSb3RhdGlvbnMgPSBwYXJlbnRXb3JsZFJvdGF0aW9ucztcbiAgICB0aGlzLl9ib25lUm90YXRpb25zID0gYm9uZVJvdGF0aW9ucztcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhpcyBodW1hbm9pZCByaWcuXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIFZSTUh1bWFuQm9uZUxpc3QuZm9yRWFjaCgoYm9uZU5hbWUpID0+IHtcbiAgICAgIGNvbnN0IGJvbmVOb2RlID0gdGhpcy5vcmlnaW5hbC5nZXRCb25lTm9kZShib25lTmFtZSk7XG5cbiAgICAgIGlmIChib25lTm9kZSAhPSBudWxsKSB7XG4gICAgICAgIGNvbnN0IHJpZ0JvbmVOb2RlID0gdGhpcy5nZXRCb25lTm9kZShib25lTmFtZSkhO1xuICAgICAgICBjb25zdCBwYXJlbnRXb3JsZFJvdGF0aW9uID0gdGhpcy5fcGFyZW50V29ybGRSb3RhdGlvbnNbYm9uZU5hbWVdITtcbiAgICAgICAgY29uc3QgaW52UGFyZW50V29ybGRSb3RhdGlvbiA9IF9xdWF0QS5jb3B5KHBhcmVudFdvcmxkUm90YXRpb24pLmludmVydCgpO1xuICAgICAgICBjb25zdCBib25lUm90YXRpb24gPSB0aGlzLl9ib25lUm90YXRpb25zW2JvbmVOYW1lXSE7XG5cbiAgICAgICAgYm9uZU5vZGUucXVhdGVybmlvblxuICAgICAgICAgIC5jb3B5KHJpZ0JvbmVOb2RlLnF1YXRlcm5pb24pXG4gICAgICAgICAgLm11bHRpcGx5KHBhcmVudFdvcmxkUm90YXRpb24pXG4gICAgICAgICAgLnByZW11bHRpcGx5KGludlBhcmVudFdvcmxkUm90YXRpb24pXG4gICAgICAgICAgLm11bHRpcGx5KGJvbmVSb3RhdGlvbik7XG5cbiAgICAgICAgLy8gTW92ZSB0aGUgbWFzcyBjZW50ZXIgb2YgdGhlIFZSTVxuICAgICAgICBpZiAoYm9uZU5hbWUgPT09ICdoaXBzJykge1xuICAgICAgICAgIGNvbnN0IGJvbmVXb3JsZFBvc2l0aW9uID0gcmlnQm9uZU5vZGUuZ2V0V29ybGRQb3NpdGlvbihfYm9uZVdvcmxkUG9zKTtcbiAgICAgICAgICBib25lTm9kZS5wYXJlbnQhLnVwZGF0ZVdvcmxkTWF0cml4KHRydWUsIGZhbHNlKTtcbiAgICAgICAgICBjb25zdCBwYXJlbnRXb3JsZE1hdHJpeCA9IGJvbmVOb2RlLnBhcmVudCEubWF0cml4V29ybGQ7XG4gICAgICAgICAgY29uc3QgbG9jYWxQb3NpdGlvbiA9IGJvbmVXb3JsZFBvc2l0aW9uLmFwcGx5TWF0cml4NChwYXJlbnRXb3JsZE1hdHJpeC5pbnZlcnQoKSk7XG4gICAgICAgICAgYm9uZU5vZGUucG9zaXRpb24uY29weShsb2NhbFBvc2l0aW9uKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHR5cGUgeyBWUk1IdW1hbkJvbmUgfSBmcm9tICcuL1ZSTUh1bWFuQm9uZSc7XG5pbXBvcnQgdHlwZSB7IFZSTUh1bWFuQm9uZXMgfSBmcm9tICcuL1ZSTUh1bWFuQm9uZXMnO1xuaW1wb3J0IHR5cGUgeyBWUk1IdW1hbkJvbmVOYW1lIH0gZnJvbSAnLi9WUk1IdW1hbkJvbmVOYW1lJztcbmltcG9ydCB0eXBlIHsgVlJNUG9zZSB9IGZyb20gJy4vVlJNUG9zZSc7XG5pbXBvcnQgeyBWUk1SaWcgfSBmcm9tICcuL1ZSTVJpZyc7XG5pbXBvcnQgeyBWUk1IdW1hbm9pZFJpZyB9IGZyb20gJy4vVlJNSHVtYW5vaWRSaWcnO1xuXG4vKipcbiAqIEEgY2xhc3MgcmVwcmVzZW50cyBhIGh1bWFub2lkIG9mIGEgVlJNLlxuICovXG5leHBvcnQgY2xhc3MgVlJNSHVtYW5vaWQge1xuICAvKipcbiAgICogV2hldGhlciBpdCBjb3BpZXMgcG9zZSBmcm9tIG5vcm1hbGl6ZWRIdW1hbkJvbmVzIHRvIHJhd0h1bWFuQm9uZXMgb24ge0BsaW5rIHVwZGF0ZX0uXG4gICAqIGB0cnVlYCBieSBkZWZhdWx0LlxuICAgKlxuICAgKiBAZGVmYXVsdCB0cnVlXG4gICAqL1xuICBwdWJsaWMgYXV0b1VwZGF0ZUh1bWFuQm9uZXM6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEEgcmF3IHJpZyBvZiB0aGUgVlJNLlxuICAgKi9cbiAgcHJpdmF0ZSBfcmF3SHVtYW5Cb25lczogVlJNUmlnOyAvLyBUT0RPOiBSZW5hbWVcblxuICAvKipcbiAgICogQSBub3JtYWxpemVkIHJpZyBvZiB0aGUgVlJNLlxuICAgKi9cbiAgcHJpdmF0ZSBfbm9ybWFsaXplZEh1bWFuQm9uZXM6IFZSTUh1bWFub2lkUmlnOyAvLyBUT0RPOiBSZW5hbWVcblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgRGVwcmVjYXRlZC4gVXNlIGVpdGhlciB7QGxpbmsgcmF3UmVzdFBvc2V9IG9yIHtAbGluayBub3JtYWxpemVkUmVzdFBvc2V9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJlc3RQb3NlKCk6IFZSTVBvc2Uge1xuICAgIGNvbnNvbGUud2FybignVlJNSHVtYW5vaWQ6IHJlc3RQb3NlIGlzIGRlcHJlY2F0ZWQuIFVzZSBlaXRoZXIgcmF3UmVzdFBvc2Ugb3Igbm9ybWFsaXplZFJlc3RQb3NlIGluc3RlYWQuJyk7XG5cbiAgICByZXR1cm4gdGhpcy5yYXdSZXN0UG9zZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIHtAbGluayBWUk1Qb3NlfSBvZiBpdHMgcmF3IGh1bWFuIGJvbmVzIHRoYXQgaXMgaXRzIGRlZmF1bHQgc3RhdGUuXG4gICAqIE5vdGUgdGhhdCBpdCdzIG5vdCBjb21wYXRpYmxlIHdpdGgge0BsaW5rIHNldFJhd1Bvc2V9IGFuZCB7QGxpbmsgZ2V0UmF3UG9zZX0sIHNpbmNlIGl0IGNvbnRhaW5zIG5vbi1yZWxhdGl2ZSB2YWx1ZXMgb2YgZWFjaCBsb2NhbCB0cmFuc2Zvcm1zLlxuICAgKi9cbiAgcHVibGljIGdldCByYXdSZXN0UG9zZSgpOiBWUk1Qb3NlIHtcbiAgICByZXR1cm4gdGhpcy5fcmF3SHVtYW5Cb25lcy5yZXN0UG9zZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIHtAbGluayBWUk1Qb3NlfSBvZiBpdHMgbm9ybWFsaXplZCBodW1hbiBib25lcyB0aGF0IGlzIGl0cyBkZWZhdWx0IHN0YXRlLlxuICAgKiBOb3RlIHRoYXQgaXQncyBub3QgY29tcGF0aWJsZSB3aXRoIHtAbGluayBzZXROb3JtYWxpemVkUG9zZX0gYW5kIHtAbGluayBnZXROb3JtYWxpemVkUG9zZX0sIHNpbmNlIGl0IGNvbnRhaW5zIG5vbi1yZWxhdGl2ZSB2YWx1ZXMgb2YgZWFjaCBsb2NhbCB0cmFuc2Zvcm1zLlxuICAgKi9cbiAgcHVibGljIGdldCBub3JtYWxpemVkUmVzdFBvc2UoKTogVlJNUG9zZSB7XG4gICAgcmV0dXJuIHRoaXMuX25vcm1hbGl6ZWRIdW1hbkJvbmVzLnJlc3RQb3NlO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgbWFwIGZyb20ge0BsaW5rIFZSTUh1bWFuQm9uZU5hbWV9IHRvIHJhdyB7QGxpbmsgVlJNSHVtYW5Cb25lfXMuXG4gICAqL1xuICBwdWJsaWMgZ2V0IGh1bWFuQm9uZXMoKTogVlJNSHVtYW5Cb25lcyB7XG4gICAgLy8gYW4gYWxpYXMgb2YgYHJhd0h1bWFuQm9uZXNgXG4gICAgcmV0dXJuIHRoaXMuX3Jhd0h1bWFuQm9uZXMuaHVtYW5Cb25lcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBIG1hcCBmcm9tIHtAbGluayBWUk1IdW1hbkJvbmVOYW1lfSB0byByYXcge0BsaW5rIFZSTUh1bWFuQm9uZX1zLlxuICAgKi9cbiAgcHVibGljIGdldCByYXdIdW1hbkJvbmVzKCk6IFZSTUh1bWFuQm9uZXMge1xuICAgIHJldHVybiB0aGlzLl9yYXdIdW1hbkJvbmVzLmh1bWFuQm9uZXM7XG4gIH1cblxuICAvKipcbiAgICogQSBtYXAgZnJvbSB7QGxpbmsgVlJNSHVtYW5Cb25lTmFtZX0gdG8gbm9ybWFsaXplZCB7QGxpbmsgVlJNSHVtYW5Cb25lfXMuXG4gICAqL1xuICBwdWJsaWMgZ2V0IG5vcm1hbGl6ZWRIdW1hbkJvbmVzKCk6IFZSTUh1bWFuQm9uZXMge1xuICAgIHJldHVybiB0aGlzLl9ub3JtYWxpemVkSHVtYW5Cb25lcy5odW1hbkJvbmVzO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSByb290IG9mIG5vcm1hbGl6ZWQge0BsaW5rIFZSTUh1bWFuQm9uZX1zLlxuICAgKi9cbiAgcHVibGljIGdldCBub3JtYWxpemVkSHVtYW5Cb25lc1Jvb3QoKTogVEhSRUUuT2JqZWN0M0Qge1xuICAgIHJldHVybiB0aGlzLl9ub3JtYWxpemVkSHVtYW5Cb25lcy5yb290O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyB7QGxpbmsgVlJNSHVtYW5vaWR9LlxuICAgKiBAcGFyYW0gaHVtYW5Cb25lcyBBIHtAbGluayBWUk1IdW1hbkJvbmVzfSBjb250YWlucyBhbGwgdGhlIGJvbmVzIG9mIHRoZSBuZXcgaHVtYW5vaWRcbiAgICogQHBhcmFtIGF1dG9VcGRhdGVIdW1hbkJvbmVzIFdoZXRoZXIgaXQgY29waWVzIHBvc2UgZnJvbSBub3JtYWxpemVkSHVtYW5Cb25lcyB0byByYXdIdW1hbkJvbmVzIG9uIHtAbGluayB1cGRhdGV9LiBgdHJ1ZWAgYnkgZGVmYXVsdC5cbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihodW1hbkJvbmVzOiBWUk1IdW1hbkJvbmVzLCBvcHRpb25zPzogeyBhdXRvVXBkYXRlSHVtYW5Cb25lcz86IGJvb2xlYW4gfSkge1xuICAgIHRoaXMuYXV0b1VwZGF0ZUh1bWFuQm9uZXMgPSBvcHRpb25zPy5hdXRvVXBkYXRlSHVtYW5Cb25lcyA/PyB0cnVlO1xuICAgIHRoaXMuX3Jhd0h1bWFuQm9uZXMgPSBuZXcgVlJNUmlnKGh1bWFuQm9uZXMpO1xuICAgIHRoaXMuX25vcm1hbGl6ZWRIdW1hbkJvbmVzID0gbmV3IFZSTUh1bWFub2lkUmlnKHRoaXMuX3Jhd0h1bWFuQm9uZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvcHkgdGhlIGdpdmVuIHtAbGluayBWUk1IdW1hbm9pZH0gaW50byB0aGlzIG9uZS5cbiAgICogQHBhcmFtIHNvdXJjZSBUaGUge0BsaW5rIFZSTUh1bWFub2lkfSB5b3Ugd2FudCB0byBjb3B5XG4gICAqIEByZXR1cm5zIHRoaXNcbiAgICovXG4gIHB1YmxpYyBjb3B5KHNvdXJjZTogVlJNSHVtYW5vaWQpOiB0aGlzIHtcbiAgICB0aGlzLmF1dG9VcGRhdGVIdW1hbkJvbmVzID0gc291cmNlLmF1dG9VcGRhdGVIdW1hbkJvbmVzO1xuICAgIHRoaXMuX3Jhd0h1bWFuQm9uZXMgPSBuZXcgVlJNUmlnKHNvdXJjZS5odW1hbkJvbmVzKTtcbiAgICB0aGlzLl9ub3JtYWxpemVkSHVtYW5Cb25lcyA9IG5ldyBWUk1IdW1hbm9pZFJpZyh0aGlzLl9yYXdIdW1hbkJvbmVzKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBjbG9uZSBvZiB0aGlzIHtAbGluayBWUk1IdW1hbm9pZH0uXG4gICAqIEByZXR1cm5zIENvcGllZCB7QGxpbmsgVlJNSHVtYW5vaWR9XG4gICAqL1xuICBwdWJsaWMgY2xvbmUoKTogVlJNSHVtYW5vaWQge1xuICAgIHJldHVybiBuZXcgVlJNSHVtYW5vaWQodGhpcy5odW1hbkJvbmVzLCB7IGF1dG9VcGRhdGVIdW1hbkJvbmVzOiB0aGlzLmF1dG9VcGRhdGVIdW1hbkJvbmVzIH0pLmNvcHkodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgRGVwcmVjYXRlZC4gVXNlIGVpdGhlciB7QGxpbmsgZ2V0UmF3QWJzb2x1dGVQb3NlfSBvciB7QGxpbmsgZ2V0Tm9ybWFsaXplZEFic29sdXRlUG9zZX0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBnZXRBYnNvbHV0ZVBvc2UoKTogVlJNUG9zZSB7XG4gICAgY29uc29sZS53YXJuKFxuICAgICAgJ1ZSTUh1bWFub2lkOiBnZXRBYnNvbHV0ZVBvc2UoKSBpcyBkZXByZWNhdGVkLiBVc2UgZWl0aGVyIGdldFJhd0Fic29sdXRlUG9zZSgpIG9yIGdldE5vcm1hbGl6ZWRBYnNvbHV0ZVBvc2UoKSBpbnN0ZWFkLicsXG4gICAgKTtcblxuICAgIHJldHVybiB0aGlzLmdldFJhd0Fic29sdXRlUG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgY3VycmVudCBhYnNvbHV0ZSBwb3NlIG9mIHRoaXMgcmF3IGh1bWFuIGJvbmVzIGFzIGEge0BsaW5rIFZSTVBvc2V9LlxuICAgKiBOb3RlIHRoYXQgdGhlIG91dHB1dCByZXN1bHQgd2lsbCBjb250YWluIGluaXRpYWwgc3RhdGUgb2YgdGhlIFZSTSBhbmQgbm90IGNvbXBhdGlibGUgYmV0d2VlbiBkaWZmZXJlbnQgbW9kZWxzLlxuICAgKiBZb3UgbWlnaHQgd2FudCB0byB1c2Uge0BsaW5rIGdldFJhd1Bvc2V9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgZ2V0UmF3QWJzb2x1dGVQb3NlKCk6IFZSTVBvc2Uge1xuICAgIHJldHVybiB0aGlzLl9yYXdIdW1hbkJvbmVzLmdldEFic29sdXRlUG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgY3VycmVudCBhYnNvbHV0ZSBwb3NlIG9mIHRoaXMgbm9ybWFsaXplZCBodW1hbiBib25lcyBhcyBhIHtAbGluayBWUk1Qb3NlfS5cbiAgICogTm90ZSB0aGF0IHRoZSBvdXRwdXQgcmVzdWx0IHdpbGwgY29udGFpbiBpbml0aWFsIHN0YXRlIG9mIHRoZSBWUk0gYW5kIG5vdCBjb21wYXRpYmxlIGJldHdlZW4gZGlmZmVyZW50IG1vZGVscy5cbiAgICogWW91IG1pZ2h0IHdhbnQgdG8gdXNlIHtAbGluayBnZXROb3JtYWxpemVkUG9zZX0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBnZXROb3JtYWxpemVkQWJzb2x1dGVQb3NlKCk6IFZSTVBvc2Uge1xuICAgIHJldHVybiB0aGlzLl9ub3JtYWxpemVkSHVtYW5Cb25lcy5nZXRBYnNvbHV0ZVBvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBEZXByZWNhdGVkLiBVc2UgZWl0aGVyIHtAbGluayBnZXRSYXdQb3NlfSBvciB7QGxpbmsgZ2V0Tm9ybWFsaXplZFBvc2V9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgZ2V0UG9zZSgpOiBWUk1Qb3NlIHtcbiAgICBjb25zb2xlLndhcm4oJ1ZSTUh1bWFub2lkOiBnZXRQb3NlKCkgaXMgZGVwcmVjYXRlZC4gVXNlIGVpdGhlciBnZXRSYXdQb3NlKCkgb3IgZ2V0Tm9ybWFsaXplZFBvc2UoKSBpbnN0ZWFkLicpO1xuXG4gICAgcmV0dXJuIHRoaXMuZ2V0UmF3UG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgY3VycmVudCBwb3NlIG9mIHJhdyBodW1hbiBib25lcyBhcyBhIHtAbGluayBWUk1Qb3NlfS5cbiAgICpcbiAgICogRWFjaCB0cmFuc2Zvcm0gaXMgYSBsb2NhbCB0cmFuc2Zvcm0gcmVsYXRpdmUgZnJvbSByZXN0IHBvc2UgKFQtcG9zZSkuXG4gICAqL1xuICBwdWJsaWMgZ2V0UmF3UG9zZSgpOiBWUk1Qb3NlIHtcbiAgICByZXR1cm4gdGhpcy5fcmF3SHVtYW5Cb25lcy5nZXRQb3NlKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBjdXJyZW50IHBvc2Ugb2Ygbm9ybWFsaXplZCBodW1hbiBib25lcyBhcyBhIHtAbGluayBWUk1Qb3NlfS5cbiAgICpcbiAgICogRWFjaCB0cmFuc2Zvcm0gaXMgYSBsb2NhbCB0cmFuc2Zvcm0gcmVsYXRpdmUgZnJvbSByZXN0IHBvc2UgKFQtcG9zZSkuXG4gICAqL1xuICBwdWJsaWMgZ2V0Tm9ybWFsaXplZFBvc2UoKTogVlJNUG9zZSB7XG4gICAgcmV0dXJuIHRoaXMuX25vcm1hbGl6ZWRIdW1hbkJvbmVzLmdldFBvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBEZXByZWNhdGVkLiBVc2UgZWl0aGVyIHtAbGluayBzZXRSYXdQb3NlfSBvciB7QGxpbmsgc2V0Tm9ybWFsaXplZFBvc2V9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgc2V0UG9zZShwb3NlT2JqZWN0OiBWUk1Qb3NlKTogdm9pZCB7XG4gICAgY29uc29sZS53YXJuKCdWUk1IdW1hbm9pZDogc2V0UG9zZSgpIGlzIGRlcHJlY2F0ZWQuIFVzZSBlaXRoZXIgc2V0UmF3UG9zZSgpIG9yIHNldE5vcm1hbGl6ZWRQb3NlKCkgaW5zdGVhZC4nKTtcblxuICAgIHJldHVybiB0aGlzLnNldFJhd1Bvc2UocG9zZU9iamVjdCk7XG4gIH1cblxuICAvKipcbiAgICogTGV0IHRoZSByYXcgaHVtYW4gYm9uZXMgZG8gYSBzcGVjaWZpZWQgcG9zZS5cbiAgICpcbiAgICogRWFjaCB0cmFuc2Zvcm0gaGF2ZSB0byBiZSBhIGxvY2FsIHRyYW5zZm9ybSByZWxhdGl2ZSBmcm9tIHJlc3QgcG9zZSAoVC1wb3NlKS5cbiAgICogWW91IGNhbiBwYXNzIHdoYXQgeW91IGdvdCBmcm9tIHtAbGluayBnZXRSYXdQb3NlfS5cbiAgICpcbiAgICogSWYgeW91IGFyZSB1c2luZyB7QGxpbmsgYXV0b1VwZGF0ZUh1bWFuQm9uZXN9LCB5b3UgbWlnaHQgd2FudCB0byB1c2Uge0BsaW5rIHNldE5vcm1hbGl6ZWRQb3NlfSBpbnN0ZWFkLlxuICAgKlxuICAgKiBAcGFyYW0gcG9zZU9iamVjdCBBIHtAbGluayBWUk1Qb3NlfSB0aGF0IHJlcHJlc2VudHMgYSBzaW5nbGUgcG9zZVxuICAgKi9cbiAgcHVibGljIHNldFJhd1Bvc2UocG9zZU9iamVjdDogVlJNUG9zZSk6IHZvaWQge1xuICAgIHJldHVybiB0aGlzLl9yYXdIdW1hbkJvbmVzLnNldFBvc2UocG9zZU9iamVjdCk7XG4gIH1cblxuICAvKipcbiAgICogTGV0IHRoZSBub3JtYWxpemVkIGh1bWFuIGJvbmVzIGRvIGEgc3BlY2lmaWVkIHBvc2UuXG4gICAqXG4gICAqIEVhY2ggdHJhbnNmb3JtIGhhdmUgdG8gYmUgYSBsb2NhbCB0cmFuc2Zvcm0gcmVsYXRpdmUgZnJvbSByZXN0IHBvc2UgKFQtcG9zZSkuXG4gICAqIFlvdSBjYW4gcGFzcyB3aGF0IHlvdSBnb3QgZnJvbSB7QGxpbmsgZ2V0Tm9ybWFsaXplZFBvc2V9LlxuICAgKlxuICAgKiBAcGFyYW0gcG9zZU9iamVjdCBBIHtAbGluayBWUk1Qb3NlfSB0aGF0IHJlcHJlc2VudHMgYSBzaW5nbGUgcG9zZVxuICAgKi9cbiAgcHVibGljIHNldE5vcm1hbGl6ZWRQb3NlKHBvc2VPYmplY3Q6IFZSTVBvc2UpOiB2b2lkIHtcbiAgICByZXR1cm4gdGhpcy5fbm9ybWFsaXplZEh1bWFuQm9uZXMuc2V0UG9zZShwb3NlT2JqZWN0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBEZXByZWNhdGVkLiBVc2UgZWl0aGVyIHtAbGluayByZXNldFJhd1Bvc2V9IG9yIHtAbGluayByZXNldE5vcm1hbGl6ZWRQb3NlfSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIHJlc2V0UG9zZSgpOiB2b2lkIHtcbiAgICBjb25zb2xlLndhcm4oJ1ZSTUh1bWFub2lkOiByZXNldFBvc2UoKSBpcyBkZXByZWNhdGVkLiBVc2UgZWl0aGVyIHJlc2V0UmF3UG9zZSgpIG9yIHJlc2V0Tm9ybWFsaXplZFBvc2UoKSBpbnN0ZWFkLicpO1xuXG4gICAgcmV0dXJuIHRoaXMucmVzZXRSYXdQb3NlKCk7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhlIHJhdyBodW1hbm9pZCB0byBpdHMgcmVzdCBwb3NlLlxuICAgKlxuICAgKiBJZiB5b3UgYXJlIHVzaW5nIHtAbGluayBhdXRvVXBkYXRlSHVtYW5Cb25lc30sIHlvdSBtaWdodCB3YW50IHRvIHVzZSB7QGxpbmsgcmVzZXROb3JtYWxpemVkUG9zZX0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyByZXNldFJhd1Bvc2UoKTogdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMuX3Jhd0h1bWFuQm9uZXMucmVzZXRQb3NlKCk7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhlIG5vcm1hbGl6ZWQgaHVtYW5vaWQgdG8gaXRzIHJlc3QgcG9zZS5cbiAgICovXG4gIHB1YmxpYyByZXNldE5vcm1hbGl6ZWRQb3NlKCk6IHZvaWQge1xuICAgIHJldHVybiB0aGlzLl9ub3JtYWxpemVkSHVtYW5Cb25lcy5yZXNldFBvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBEZXByZWNhdGVkLiBVc2UgZWl0aGVyIHtAbGluayBnZXRSYXdCb25lfSBvciB7QGxpbmsgZ2V0Tm9ybWFsaXplZEJvbmV9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgZ2V0Qm9uZShuYW1lOiBWUk1IdW1hbkJvbmVOYW1lKTogVlJNSHVtYW5Cb25lIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zb2xlLndhcm4oJ1ZSTUh1bWFub2lkOiBnZXRCb25lKCkgaXMgZGVwcmVjYXRlZC4gVXNlIGVpdGhlciBnZXRSYXdCb25lKCkgb3IgZ2V0Tm9ybWFsaXplZEJvbmUoKSBpbnN0ZWFkLicpO1xuXG4gICAgcmV0dXJuIHRoaXMuZ2V0UmF3Qm9uZShuYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYSByYXcge0BsaW5rIFZSTUh1bWFuQm9uZX0gYm91bmQgdG8gYSBzcGVjaWZpZWQge0BsaW5rIFZSTUh1bWFuQm9uZU5hbWV9LlxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBib25lIHlvdSB3YW50XG4gICAqL1xuICBwdWJsaWMgZ2V0UmF3Qm9uZShuYW1lOiBWUk1IdW1hbkJvbmVOYW1lKTogVlJNSHVtYW5Cb25lIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fcmF3SHVtYW5Cb25lcy5nZXRCb25lKG5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhIG5vcm1hbGl6ZWQge0BsaW5rIFZSTUh1bWFuQm9uZX0gYm91bmQgdG8gYSBzcGVjaWZpZWQge0BsaW5rIFZSTUh1bWFuQm9uZU5hbWV9LlxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBib25lIHlvdSB3YW50XG4gICAqL1xuICBwdWJsaWMgZ2V0Tm9ybWFsaXplZEJvbmUobmFtZTogVlJNSHVtYW5Cb25lTmFtZSk6IFZSTUh1bWFuQm9uZSB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX25vcm1hbGl6ZWRIdW1hbkJvbmVzLmdldEJvbmUobmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgRGVwcmVjYXRlZC4gVXNlIGVpdGhlciB7QGxpbmsgZ2V0UmF3Qm9uZU5vZGV9IG9yIHtAbGluayBnZXROb3JtYWxpemVkQm9uZU5vZGV9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgZ2V0Qm9uZU5vZGUobmFtZTogVlJNSHVtYW5Cb25lTmFtZSk6IFRIUkVFLk9iamVjdDNEIHwgbnVsbCB7XG4gICAgY29uc29sZS53YXJuKFxuICAgICAgJ1ZSTUh1bWFub2lkOiBnZXRCb25lTm9kZSgpIGlzIGRlcHJlY2F0ZWQuIFVzZSBlaXRoZXIgZ2V0UmF3Qm9uZU5vZGUoKSBvciBnZXROb3JtYWxpemVkQm9uZU5vZGUoKSBpbnN0ZWFkLicsXG4gICAgKTtcblxuICAgIHJldHVybiB0aGlzLmdldFJhd0JvbmVOb2RlKG5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhIHJhdyBib25lIGFzIGEgYFRIUkVFLk9iamVjdDNEYCBib3VuZCB0byBhIHNwZWNpZmllZCB7QGxpbmsgVlJNSHVtYW5Cb25lTmFtZX0uXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGJvbmUgeW91IHdhbnRcbiAgICovXG4gIHB1YmxpYyBnZXRSYXdCb25lTm9kZShuYW1lOiBWUk1IdW1hbkJvbmVOYW1lKTogVEhSRUUuT2JqZWN0M0QgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fcmF3SHVtYW5Cb25lcy5nZXRCb25lTm9kZShuYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYSBub3JtYWxpemVkIGJvbmUgYXMgYSBgVEhSRUUuT2JqZWN0M0RgIGJvdW5kIHRvIGEgc3BlY2lmaWVkIHtAbGluayBWUk1IdW1hbkJvbmVOYW1lfS5cbiAgICpcbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgYm9uZSB5b3Ugd2FudFxuICAgKi9cbiAgcHVibGljIGdldE5vcm1hbGl6ZWRCb25lTm9kZShuYW1lOiBWUk1IdW1hbkJvbmVOYW1lKTogVEhSRUUuT2JqZWN0M0QgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fbm9ybWFsaXplZEh1bWFuQm9uZXMuZ2V0Qm9uZU5vZGUobmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSBodW1hbm9pZCBjb21wb25lbnQuXG4gICAqXG4gICAqIElmIHtAbGluayBhdXRvVXBkYXRlSHVtYW5Cb25lc30gaXMgYHRydWVgLCBpdCB0cmFuc2ZlcnMgdGhlIHBvc2Ugb2Ygbm9ybWFsaXplZCBodW1hbiBib25lcyB0byByYXcgaHVtYW4gYm9uZXMuXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmF1dG9VcGRhdGVIdW1hbkJvbmVzKSB7XG4gICAgICB0aGlzLl9ub3JtYWxpemVkSHVtYW5Cb25lcy51cGRhdGUoKTtcbiAgICB9XG4gIH1cbn1cbiIsICIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cblxuZXhwb3J0IGNvbnN0IFZSTVJlcXVpcmVkSHVtYW5Cb25lTmFtZSA9IHtcbiAgSGlwczogJ2hpcHMnLFxuICBTcGluZTogJ3NwaW5lJyxcbiAgSGVhZDogJ2hlYWQnLFxuICBMZWZ0VXBwZXJMZWc6ICdsZWZ0VXBwZXJMZWcnLFxuICBMZWZ0TG93ZXJMZWc6ICdsZWZ0TG93ZXJMZWcnLFxuICBMZWZ0Rm9vdDogJ2xlZnRGb290JyxcbiAgUmlnaHRVcHBlckxlZzogJ3JpZ2h0VXBwZXJMZWcnLFxuICBSaWdodExvd2VyTGVnOiAncmlnaHRMb3dlckxlZycsXG4gIFJpZ2h0Rm9vdDogJ3JpZ2h0Rm9vdCcsXG4gIExlZnRVcHBlckFybTogJ2xlZnRVcHBlckFybScsXG4gIExlZnRMb3dlckFybTogJ2xlZnRMb3dlckFybScsXG4gIExlZnRIYW5kOiAnbGVmdEhhbmQnLFxuICBSaWdodFVwcGVyQXJtOiAncmlnaHRVcHBlckFybScsXG4gIFJpZ2h0TG93ZXJBcm06ICdyaWdodExvd2VyQXJtJyxcbiAgUmlnaHRIYW5kOiAncmlnaHRIYW5kJyxcbn0gYXMgY29uc3Q7XG5cbmV4cG9ydCB0eXBlIFZSTVJlcXVpcmVkSHVtYW5Cb25lTmFtZSA9IHR5cGVvZiBWUk1SZXF1aXJlZEh1bWFuQm9uZU5hbWVba2V5b2YgdHlwZW9mIFZSTVJlcXVpcmVkSHVtYW5Cb25lTmFtZV07XG4iLCAiaW1wb3J0IHR5cGUgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgdHlwZSAqIGFzIFYwVlJNIGZyb20gJ0BwaXhpdi90eXBlcy12cm0tMC4wJztcbmltcG9ydCB0eXBlICogYXMgVjFWUk1TY2hlbWEgZnJvbSAnQHBpeGl2L3R5cGVzLXZybWMtdnJtLTEuMCc7XG5pbXBvcnQgdHlwZSB7IEdMVEYsIEdMVEZMb2FkZXJQbHVnaW4sIEdMVEZQYXJzZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyLmpzJztcbmltcG9ydCB7IFZSTUh1bWFub2lkIH0gZnJvbSAnLi9WUk1IdW1hbm9pZCc7XG5pbXBvcnQgdHlwZSB7IFZSTUh1bWFuQm9uZXMgfSBmcm9tICcuL1ZSTUh1bWFuQm9uZXMnO1xuaW1wb3J0IHsgVlJNUmVxdWlyZWRIdW1hbkJvbmVOYW1lIH0gZnJvbSAnLi9WUk1SZXF1aXJlZEh1bWFuQm9uZU5hbWUnO1xuaW1wb3J0IHsgR0xURiBhcyBHTFRGU2NoZW1hIH0gZnJvbSAnQGdsdGYtdHJhbnNmb3JtL2NvcmUnO1xuaW1wb3J0IHsgVlJNSHVtYW5vaWRIZWxwZXIgfSBmcm9tICcuL2hlbHBlcnMvVlJNSHVtYW5vaWRIZWxwZXInO1xuaW1wb3J0IHsgVlJNSHVtYW5vaWRMb2FkZXJQbHVnaW5PcHRpb25zIH0gZnJvbSAnLi9WUk1IdW1hbm9pZExvYWRlclBsdWdpbk9wdGlvbnMnO1xuXG4vKipcbiAqIFBvc3NpYmxlIHNwZWMgdmVyc2lvbnMgaXQgcmVjb2duaXplcy5cbiAqL1xuY29uc3QgUE9TU0lCTEVfU1BFQ19WRVJTSU9OUyA9IG5ldyBTZXQoWycxLjAnLCAnMS4wLWJldGEnXSk7XG5cbi8qKlxuICogQSBtYXAgZnJvbSBvbGQgdGh1bWIgYm9uZSBuYW1lcyB0byBuZXcgdGh1bWIgYm9uZSBuYW1lc1xuICovXG5jb25zdCB0aHVtYkJvbmVOYW1lTWFwOiB7IFtrZXk6IHN0cmluZ106IFYxVlJNU2NoZW1hLkh1bWFub2lkSHVtYW5Cb25lTmFtZSB8IHVuZGVmaW5lZCB9ID0ge1xuICBsZWZ0VGh1bWJQcm94aW1hbDogJ2xlZnRUaHVtYk1ldGFjYXJwYWwnLFxuICBsZWZ0VGh1bWJJbnRlcm1lZGlhdGU6ICdsZWZ0VGh1bWJQcm94aW1hbCcsXG4gIHJpZ2h0VGh1bWJQcm94aW1hbDogJ3JpZ2h0VGh1bWJNZXRhY2FycGFsJyxcbiAgcmlnaHRUaHVtYkludGVybWVkaWF0ZTogJ3JpZ2h0VGh1bWJQcm94aW1hbCcsXG59O1xuXG4vKipcbiAqIEEgcGx1Z2luIG9mIEdMVEZMb2FkZXIgdGhhdCBpbXBvcnRzIGEge0BsaW5rIFZSTUh1bWFub2lkfSBmcm9tIGEgVlJNIGV4dGVuc2lvbiBvZiBhIEdMVEYuXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1IdW1hbm9pZExvYWRlclBsdWdpbiBpbXBsZW1lbnRzIEdMVEZMb2FkZXJQbHVnaW4ge1xuICAvKipcbiAgICogU3BlY2lmeSBhbiBPYmplY3QzRCB0byBhZGQge0BsaW5rIFZSTUh1bWFub2lkSGVscGVyfS5cbiAgICogSWYgbm90IHNwZWNpZmllZCwgaGVscGVyIHdpbGwgbm90IGJlIGNyZWF0ZWQuXG4gICAqIElmIGByZW5kZXJPcmRlcmAgaXMgc2V0IHRvIHRoZSByb290LCB0aGUgaGVscGVyIHdpbGwgY29weSB0aGUgc2FtZSBgcmVuZGVyT3JkZXJgIC5cbiAgICovXG4gIHB1YmxpYyBoZWxwZXJSb290PzogVEhSRUUuT2JqZWN0M0Q7XG5cbiAgcHVibGljIGF1dG9VcGRhdGVIdW1hbkJvbmVzPzogYm9vbGVhbjtcblxuICBwdWJsaWMgcmVhZG9ubHkgcGFyc2VyOiBHTFRGUGFyc2VyO1xuXG4gIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xuICAgIC8vIFdlIHNob3VsZCB1c2UgdGhlIGV4dGVuc2lvbiBuYW1lIGluc3RlYWQgYnV0IHdlIGhhdmUgbXVsdGlwbGUgcGx1Z2lucyBmb3IgYW4gZXh0ZW5zaW9uLi4uXG4gICAgcmV0dXJuICdWUk1IdW1hbm9pZExvYWRlclBsdWdpbic7XG4gIH1cblxuICBwdWJsaWMgY29uc3RydWN0b3IocGFyc2VyOiBHTFRGUGFyc2VyLCBvcHRpb25zPzogVlJNSHVtYW5vaWRMb2FkZXJQbHVnaW5PcHRpb25zKSB7XG4gICAgdGhpcy5wYXJzZXIgPSBwYXJzZXI7XG5cbiAgICB0aGlzLmhlbHBlclJvb3QgPSBvcHRpb25zPy5oZWxwZXJSb290O1xuICAgIHRoaXMuYXV0b1VwZGF0ZUh1bWFuQm9uZXMgPSBvcHRpb25zPy5hdXRvVXBkYXRlSHVtYW5Cb25lcztcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBhZnRlclJvb3QoZ2x0ZjogR0xURik6IFByb21pc2U8dm9pZD4ge1xuICAgIGdsdGYudXNlckRhdGEudnJtSHVtYW5vaWQgPSBhd2FpdCB0aGlzLl9pbXBvcnQoZ2x0Zik7XG4gIH1cblxuICAvKipcbiAgICogSW1wb3J0IGEge0BsaW5rIFZSTUh1bWFub2lkfSBmcm9tIGEgVlJNLlxuICAgKlxuICAgKiBAcGFyYW0gZ2x0ZiBBIHBhcnNlZCByZXN1bHQgb2YgR0xURiB0YWtlbiBmcm9tIEdMVEZMb2FkZXJcbiAgICovXG4gIHByaXZhdGUgYXN5bmMgX2ltcG9ydChnbHRmOiBHTFRGKTogUHJvbWlzZTxWUk1IdW1hbm9pZCB8IG51bGw+IHtcbiAgICBjb25zdCB2MVJlc3VsdCA9IGF3YWl0IHRoaXMuX3YxSW1wb3J0KGdsdGYpO1xuICAgIGlmICh2MVJlc3VsdCkge1xuICAgICAgcmV0dXJuIHYxUmVzdWx0O1xuICAgIH1cblxuICAgIGNvbnN0IHYwUmVzdWx0ID0gYXdhaXQgdGhpcy5fdjBJbXBvcnQoZ2x0Zik7XG4gICAgaWYgKHYwUmVzdWx0KSB7XG4gICAgICByZXR1cm4gdjBSZXN1bHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF92MUltcG9ydChnbHRmOiBHTFRGKTogUHJvbWlzZTxWUk1IdW1hbm9pZCB8IG51bGw+IHtcbiAgICBjb25zdCBqc29uID0gdGhpcy5wYXJzZXIuanNvbiBhcyBHTFRGU2NoZW1hLklHTFRGO1xuXG4gICAgLy8gZWFybHkgYWJvcnQgaWYgaXQgZG9lc24ndCB1c2UgdnJtXG4gICAgY29uc3QgaXNWUk1Vc2VkID0ganNvbi5leHRlbnNpb25zVXNlZD8uaW5kZXhPZignVlJNQ192cm0nKSAhPT0gLTE7XG4gICAgaWYgKCFpc1ZSTVVzZWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGV4dGVuc2lvbiA9IGpzb24uZXh0ZW5zaW9ucz8uWydWUk1DX3ZybSddIGFzIFYxVlJNU2NoZW1hLlZSTUNWUk0gfCB1bmRlZmluZWQ7XG4gICAgaWYgKCFleHRlbnNpb24pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNwZWNWZXJzaW9uID0gZXh0ZW5zaW9uLnNwZWNWZXJzaW9uO1xuICAgIGlmICghUE9TU0lCTEVfU1BFQ19WRVJTSU9OUy5oYXMoc3BlY1ZlcnNpb24pKSB7XG4gICAgICBjb25zb2xlLndhcm4oYFZSTUh1bWFub2lkTG9hZGVyUGx1Z2luOiBVbmtub3duIFZSTUNfdnJtIHNwZWNWZXJzaW9uIFwiJHtzcGVjVmVyc2lvbn1cImApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc2NoZW1hSHVtYW5vaWQgPSBleHRlbnNpb24uaHVtYW5vaWQ7XG4gICAgaWYgKCFzY2hlbWFIdW1hbm9pZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY29tcGF0OiAxLjAtYmV0YSB0aHVtYiBib25lIG5hbWVzXG4gICAgICpcbiAgICAgKiBgdHJ1ZWAgaWYgYGxlZnRUaHVtYkludGVybWVkaWF0ZWAgb3IgYHJpZ2h0VGh1bWJJbnRlcm1lZGlhdGVgIGV4aXN0c1xuICAgICAqL1xuICAgIGNvbnN0IGV4aXN0c1ByZXZpb3VzVGh1bWJOYW1lID1cbiAgICAgIChzY2hlbWFIdW1hbm9pZC5odW1hbkJvbmVzIGFzIGFueSkubGVmdFRodW1iSW50ZXJtZWRpYXRlICE9IG51bGwgfHxcbiAgICAgIChzY2hlbWFIdW1hbm9pZC5odW1hbkJvbmVzIGFzIGFueSkucmlnaHRUaHVtYkludGVybWVkaWF0ZSAhPSBudWxsO1xuXG4gICAgY29uc3QgaHVtYW5Cb25lczogUGFydGlhbDxWUk1IdW1hbkJvbmVzPiA9IHt9O1xuICAgIGlmIChzY2hlbWFIdW1hbm9pZC5odW1hbkJvbmVzICE9IG51bGwpIHtcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICBPYmplY3QuZW50cmllcyhzY2hlbWFIdW1hbm9pZC5odW1hbkJvbmVzKS5tYXAoYXN5bmMgKFtib25lTmFtZVN0cmluZywgc2NoZW1hSHVtYW5Cb25lXSkgPT4ge1xuICAgICAgICAgIGxldCBib25lTmFtZSA9IGJvbmVOYW1lU3RyaW5nIGFzIFYxVlJNU2NoZW1hLkh1bWFub2lkSHVtYW5Cb25lTmFtZTtcbiAgICAgICAgICBjb25zdCBpbmRleCA9IHNjaGVtYUh1bWFuQm9uZS5ub2RlO1xuXG4gICAgICAgICAgLy8gY29tcGF0OiAxLjAtYmV0YSBwcmV2aW91cyB0aHVtYiBib25lIG5hbWVzXG4gICAgICAgICAgaWYgKGV4aXN0c1ByZXZpb3VzVGh1bWJOYW1lKSB7XG4gICAgICAgICAgICBjb25zdCB0aHVtYkJvbmVOYW1lID0gdGh1bWJCb25lTmFtZU1hcFtib25lTmFtZV07XG4gICAgICAgICAgICBpZiAodGh1bWJCb25lTmFtZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgIGJvbmVOYW1lID0gdGh1bWJCb25lTmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBub2RlID0gYXdhaXQgdGhpcy5wYXJzZXIuZ2V0RGVwZW5kZW5jeSgnbm9kZScsIGluZGV4KTtcblxuICAgICAgICAgIC8vIGlmIHRoZSBzcGVjaWZpZWQgbm9kZSBkb2VzIG5vdCBleGlzdCwgZW1pdCBhIHdhcm5pbmdcbiAgICAgICAgICBpZiAobm9kZSA9PSBudWxsKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYEEgZ2xURiBub2RlIGJvdW5kIHRvIHRoZSBodW1hbm9pZCBib25lICR7Ym9uZU5hbWV9IChpbmRleCA9ICR7aW5kZXh9KSBkb2VzIG5vdCBleGlzdGApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIHNldCB0byB0aGUgYGh1bWFuQm9uZXNgXG4gICAgICAgICAgaHVtYW5Cb25lc1tib25lTmFtZV0gPSB7IG5vZGUgfTtcbiAgICAgICAgfSksXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IGh1bWFub2lkID0gbmV3IFZSTUh1bWFub2lkKHRoaXMuX2Vuc3VyZVJlcXVpcmVkQm9uZXNFeGlzdChodW1hbkJvbmVzKSwge1xuICAgICAgYXV0b1VwZGF0ZUh1bWFuQm9uZXM6IHRoaXMuYXV0b1VwZGF0ZUh1bWFuQm9uZXMsXG4gICAgfSk7XG4gICAgZ2x0Zi5zY2VuZS5hZGQoaHVtYW5vaWQubm9ybWFsaXplZEh1bWFuQm9uZXNSb290KTtcblxuICAgIGlmICh0aGlzLmhlbHBlclJvb3QpIHtcbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBWUk1IdW1hbm9pZEhlbHBlcihodW1hbm9pZCk7XG4gICAgICB0aGlzLmhlbHBlclJvb3QuYWRkKGhlbHBlcik7XG4gICAgICBoZWxwZXIucmVuZGVyT3JkZXIgPSB0aGlzLmhlbHBlclJvb3QucmVuZGVyT3JkZXI7XG4gICAgfVxuXG4gICAgcmV0dXJuIGh1bWFub2lkO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfdjBJbXBvcnQoZ2x0ZjogR0xURik6IFByb21pc2U8VlJNSHVtYW5vaWQgfCBudWxsPiB7XG4gICAgY29uc3QganNvbiA9IHRoaXMucGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAgIGNvbnN0IHZybUV4dCA9IGpzb24uZXh0ZW5zaW9ucz8uVlJNIGFzIFYwVlJNLlZSTSB8IHVuZGVmaW5lZDtcbiAgICBpZiAoIXZybUV4dCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc2NoZW1hSHVtYW5vaWQ6IFYwVlJNLkh1bWFub2lkIHwgdW5kZWZpbmVkID0gdnJtRXh0Lmh1bWFub2lkO1xuICAgIGlmICghc2NoZW1hSHVtYW5vaWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGh1bWFuQm9uZXM6IFBhcnRpYWw8VlJNSHVtYW5Cb25lcz4gPSB7fTtcbiAgICBpZiAoc2NoZW1hSHVtYW5vaWQuaHVtYW5Cb25lcyAhPSBudWxsKSB7XG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgc2NoZW1hSHVtYW5vaWQuaHVtYW5Cb25lcy5tYXAoYXN5bmMgKGJvbmUpID0+IHtcbiAgICAgICAgICBjb25zdCBib25lTmFtZSA9IGJvbmUuYm9uZTtcbiAgICAgICAgICBjb25zdCBpbmRleCA9IGJvbmUubm9kZTtcblxuICAgICAgICAgIGlmIChib25lTmFtZSA9PSBudWxsIHx8IGluZGV4ID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBub2RlID0gYXdhaXQgdGhpcy5wYXJzZXIuZ2V0RGVwZW5kZW5jeSgnbm9kZScsIGluZGV4KTtcblxuICAgICAgICAgIC8vIGlmIHRoZSBzcGVjaWZpZWQgbm9kZSBkb2VzIG5vdCBleGlzdCwgZW1pdCBhIHdhcm5pbmdcbiAgICAgICAgICBpZiAobm9kZSA9PSBudWxsKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYEEgZ2xURiBub2RlIGJvdW5kIHRvIHRoZSBodW1hbm9pZCBib25lICR7Ym9uZU5hbWV9IChpbmRleCA9ICR7aW5kZXh9KSBkb2VzIG5vdCBleGlzdGApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIG1hcCB0byBuZXcgYm9uZSBuYW1lXG4gICAgICAgICAgY29uc3QgdGh1bWJCb25lTmFtZSA9IHRodW1iQm9uZU5hbWVNYXBbYm9uZU5hbWVdO1xuICAgICAgICAgIGNvbnN0IG5ld0JvbmVOYW1lID0gKHRodW1iQm9uZU5hbWUgPz8gYm9uZU5hbWUpIGFzIFYxVlJNU2NoZW1hLkh1bWFub2lkSHVtYW5Cb25lTmFtZTtcblxuICAgICAgICAgIC8vIHYwIFZSTXMgbWlnaHQgaGF2ZSBhIG11bHRpcGxlIG5vZGVzIGF0dGFjaGVkIHRvIGEgc2luZ2xlIGJvbmUuLi5cbiAgICAgICAgICAvLyBzbyBpZiB0aGVyZSBhbHJlYWR5IGlzIGFuIGVudHJ5IGluIHRoZSBgaHVtYW5Cb25lc2AsIHNob3cgYSB3YXJuaW5nIGFuZCBpZ25vcmUgaXRcbiAgICAgICAgICBpZiAoaHVtYW5Cb25lc1tuZXdCb25lTmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgICBgTXVsdGlwbGUgYm9uZSBlbnRyaWVzIGZvciAke25ld0JvbmVOYW1lfSBkZXRlY3RlZCAoaW5kZXggPSAke2luZGV4fSksIGlnbm9yaW5nIGR1cGxpY2F0ZWQgZW50cmllcy5gLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBzZXQgdG8gdGhlIGBodW1hbkJvbmVzYFxuICAgICAgICAgIGh1bWFuQm9uZXNbbmV3Qm9uZU5hbWVdID0geyBub2RlIH07XG4gICAgICAgIH0pLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBodW1hbm9pZCA9IG5ldyBWUk1IdW1hbm9pZCh0aGlzLl9lbnN1cmVSZXF1aXJlZEJvbmVzRXhpc3QoaHVtYW5Cb25lcyksIHtcbiAgICAgIGF1dG9VcGRhdGVIdW1hbkJvbmVzOiB0aGlzLmF1dG9VcGRhdGVIdW1hbkJvbmVzLFxuICAgIH0pO1xuICAgIGdsdGYuc2NlbmUuYWRkKGh1bWFub2lkLm5vcm1hbGl6ZWRIdW1hbkJvbmVzUm9vdCk7XG5cbiAgICBpZiAodGhpcy5oZWxwZXJSb290KSB7XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgVlJNSHVtYW5vaWRIZWxwZXIoaHVtYW5vaWQpO1xuICAgICAgdGhpcy5oZWxwZXJSb290LmFkZChoZWxwZXIpO1xuICAgICAgaGVscGVyLnJlbmRlck9yZGVyID0gdGhpcy5oZWxwZXJSb290LnJlbmRlck9yZGVyO1xuICAgIH1cblxuICAgIHJldHVybiBodW1hbm9pZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbnN1cmUgcmVxdWlyZWQgYm9uZXMgZXhpc3QgaW4gZ2l2ZW4gaHVtYW4gYm9uZXMuXG4gICAqIEBwYXJhbSBodW1hbkJvbmVzIEh1bWFuIGJvbmVzXG4gICAqIEByZXR1cm5zIEh1bWFuIGJvbmVzLCBubyBsb25nZXIgcGFydGlhbCFcbiAgICovXG4gIHByaXZhdGUgX2Vuc3VyZVJlcXVpcmVkQm9uZXNFeGlzdChodW1hbkJvbmVzOiBQYXJ0aWFsPFZSTUh1bWFuQm9uZXM+KTogVlJNSHVtYW5Cb25lcyB7XG4gICAgLy8gZW5zdXJlIHJlcXVpcmVkIGJvbmVzIGV4aXN0XG4gICAgY29uc3QgbWlzc2luZ1JlcXVpcmVkQm9uZXMgPSBPYmplY3QudmFsdWVzKFZSTVJlcXVpcmVkSHVtYW5Cb25lTmFtZSkuZmlsdGVyKFxuICAgICAgKHJlcXVpcmVkQm9uZU5hbWUpID0+IGh1bWFuQm9uZXNbcmVxdWlyZWRCb25lTmFtZV0gPT0gbnVsbCxcbiAgICApO1xuXG4gICAgLy8gdGhyb3cgYW4gZXJyb3IgaWYgdGhlcmUgYXJlIG1pc3NpbmcgYm9uZXNcbiAgICBpZiAobWlzc2luZ1JlcXVpcmVkQm9uZXMubGVuZ3RoID4gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgVlJNSHVtYW5vaWRMb2FkZXJQbHVnaW46IFRoZXNlIGh1bWFub2lkIGJvbmVzIGFyZSByZXF1aXJlZCBidXQgbm90IGV4aXN0OiAke21pc3NpbmdSZXF1aXJlZEJvbmVzLmpvaW4oJywgJyl9YCxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGh1bWFuQm9uZXMgYXMgVlJNSHVtYW5Cb25lcztcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTUxvb2tBdCB9IGZyb20gJy4uL1ZSTUxvb2tBdCc7XG5pbXBvcnQgeyBGYW5CdWZmZXJHZW9tZXRyeSB9IGZyb20gJy4vdXRpbHMvRmFuQnVmZmVyR2VvbWV0cnknO1xuaW1wb3J0IHsgTGluZUFuZFNwaGVyZUJ1ZmZlckdlb21ldHJ5IH0gZnJvbSAnLi91dGlscy9MaW5lQW5kU3BoZXJlQnVmZmVyR2VvbWV0cnknO1xuXG5jb25zdCBfcXVhdEEgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuY29uc3QgX3F1YXRCID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3YzQiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbmNvbnN0IFNRUlRfMl9PVkVSXzIgPSBNYXRoLnNxcnQoMi4wKSAvIDIuMDtcbmNvbnN0IFFVQVRfWFlfQ1c5MCA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKDAsIDAsIC1TUVJUXzJfT1ZFUl8yLCBTUVJUXzJfT1ZFUl8yKTtcbmNvbnN0IFZFQzNfUE9TSVRJVkVfWSA9IG5ldyBUSFJFRS5WZWN0b3IzKDAuMCwgMS4wLCAwLjApO1xuXG5leHBvcnQgY2xhc3MgVlJNTG9va0F0SGVscGVyIGV4dGVuZHMgVEhSRUUuR3JvdXAge1xuICBwdWJsaWMgcmVhZG9ubHkgdnJtTG9va0F0OiBWUk1Mb29rQXQ7XG4gIHByaXZhdGUgcmVhZG9ubHkgX21lc2hZYXc6IFRIUkVFLk1lc2g8RmFuQnVmZmVyR2VvbWV0cnksIFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsPjtcbiAgcHJpdmF0ZSByZWFkb25seSBfbWVzaFBpdGNoOiBUSFJFRS5NZXNoPEZhbkJ1ZmZlckdlb21ldHJ5LCBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbD47XG4gIHByaXZhdGUgcmVhZG9ubHkgX2xpbmVUYXJnZXQ6IFRIUkVFLkxpbmVTZWdtZW50czxMaW5lQW5kU3BoZXJlQnVmZmVyR2VvbWV0cnksIFRIUkVFLkxpbmVCYXNpY01hdGVyaWFsPjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IobG9va0F0OiBWUk1Mb29rQXQpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMubWF0cml4QXV0b1VwZGF0ZSA9IGZhbHNlO1xuXG4gICAgdGhpcy52cm1Mb29rQXQgPSBsb29rQXQ7XG5cbiAgICB7XG4gICAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyBGYW5CdWZmZXJHZW9tZXRyeSgpO1xuICAgICAgZ2VvbWV0cnkucmFkaXVzID0gMC41O1xuXG4gICAgICBjb25zdCBtYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gICAgICAgIGNvbG9yOiAweDAwZmYwMCxcbiAgICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgICAgIG9wYWNpdHk6IDAuNSxcbiAgICAgICAgc2lkZTogVEhSRUUuRG91YmxlU2lkZSxcbiAgICAgICAgZGVwdGhUZXN0OiBmYWxzZSxcbiAgICAgICAgZGVwdGhXcml0ZTogZmFsc2UsXG4gICAgICB9KTtcblxuICAgICAgdGhpcy5fbWVzaFBpdGNoID0gbmV3IFRIUkVFLk1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKTtcbiAgICAgIHRoaXMuYWRkKHRoaXMuX21lc2hQaXRjaCk7XG4gICAgfVxuXG4gICAge1xuICAgICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgRmFuQnVmZmVyR2VvbWV0cnkoKTtcbiAgICAgIGdlb21ldHJ5LnJhZGl1cyA9IDAuNTtcblxuICAgICAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICAgICAgICBjb2xvcjogMHhmZjAwMDAsXG4gICAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgICAgICBvcGFjaXR5OiAwLjUsXG4gICAgICAgIHNpZGU6IFRIUkVFLkRvdWJsZVNpZGUsXG4gICAgICAgIGRlcHRoVGVzdDogZmFsc2UsXG4gICAgICAgIGRlcHRoV3JpdGU6IGZhbHNlLFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuX21lc2hZYXcgPSBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpO1xuICAgICAgdGhpcy5hZGQodGhpcy5fbWVzaFlhdyk7XG4gICAgfVxuXG4gICAge1xuICAgICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgTGluZUFuZFNwaGVyZUJ1ZmZlckdlb21ldHJ5KCk7XG4gICAgICBnZW9tZXRyeS5yYWRpdXMgPSAwLjE7XG5cbiAgICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLkxpbmVCYXNpY01hdGVyaWFsKHtcbiAgICAgICAgY29sb3I6IDB4ZmZmZmZmLFxuICAgICAgICBkZXB0aFRlc3Q6IGZhbHNlLFxuICAgICAgICBkZXB0aFdyaXRlOiBmYWxzZSxcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLl9saW5lVGFyZ2V0ID0gbmV3IFRIUkVFLkxpbmVTZWdtZW50cyhnZW9tZXRyeSwgbWF0ZXJpYWwpO1xuICAgICAgdGhpcy5fbGluZVRhcmdldC5mcnVzdHVtQ3VsbGVkID0gZmFsc2U7XG4gICAgICB0aGlzLmFkZCh0aGlzLl9saW5lVGFyZ2V0KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9tZXNoWWF3Lmdlb21ldHJ5LmRpc3Bvc2UoKTtcbiAgICB0aGlzLl9tZXNoWWF3Lm1hdGVyaWFsLmRpc3Bvc2UoKTtcblxuICAgIHRoaXMuX21lc2hQaXRjaC5nZW9tZXRyeS5kaXNwb3NlKCk7XG4gICAgdGhpcy5fbWVzaFBpdGNoLm1hdGVyaWFsLmRpc3Bvc2UoKTtcblxuICAgIHRoaXMuX2xpbmVUYXJnZXQuZ2VvbWV0cnkuZGlzcG9zZSgpO1xuICAgIHRoaXMuX2xpbmVUYXJnZXQubWF0ZXJpYWwuZGlzcG9zZSgpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZU1hdHJpeFdvcmxkKGZvcmNlOiBib29sZWFuKTogdm9pZCB7XG4gICAgLy8gdXBkYXRlIGdlb21ldHJpZXNcbiAgICBjb25zdCB5YXcgPSBUSFJFRS5NYXRoVXRpbHMuREVHMlJBRCAqIHRoaXMudnJtTG9va0F0LnlhdztcbiAgICB0aGlzLl9tZXNoWWF3Lmdlb21ldHJ5LnRoZXRhID0geWF3O1xuICAgIHRoaXMuX21lc2hZYXcuZ2VvbWV0cnkudXBkYXRlKCk7XG5cbiAgICBjb25zdCBwaXRjaCA9IFRIUkVFLk1hdGhVdGlscy5ERUcyUkFEICogdGhpcy52cm1Mb29rQXQucGl0Y2g7XG4gICAgdGhpcy5fbWVzaFBpdGNoLmdlb21ldHJ5LnRoZXRhID0gcGl0Y2g7XG4gICAgdGhpcy5fbWVzaFBpdGNoLmdlb21ldHJ5LnVwZGF0ZSgpO1xuXG4gICAgLy8gZ2V0IHdvcmxkIHBvc2l0aW9uIGFuZCBxdWF0ZXJuaW9uXG4gICAgdGhpcy52cm1Mb29rQXQuZ2V0TG9va0F0V29ybGRQb3NpdGlvbihfdjNBKTtcbiAgICB0aGlzLnZybUxvb2tBdC5nZXRMb29rQXRXb3JsZFF1YXRlcm5pb24oX3F1YXRBKTtcblxuICAgIC8vIGNhbGN1bGF0ZSByb3RhdGlvbiB1c2luZyBmYWNlRnJvbnRcbiAgICBfcXVhdEEubXVsdGlwbHkodGhpcy52cm1Mb29rQXQuZ2V0RmFjZUZyb250UXVhdGVybmlvbihfcXVhdEIpKTtcblxuICAgIC8vIHNldCB0cmFuc2Zvcm0gdG8gbWVzaGVzXG4gICAgdGhpcy5fbWVzaFlhdy5wb3NpdGlvbi5jb3B5KF92M0EpO1xuICAgIHRoaXMuX21lc2hZYXcucXVhdGVybmlvbi5jb3B5KF9xdWF0QSk7XG5cbiAgICB0aGlzLl9tZXNoUGl0Y2gucG9zaXRpb24uY29weShfdjNBKTtcbiAgICB0aGlzLl9tZXNoUGl0Y2gucXVhdGVybmlvbi5jb3B5KF9xdWF0QSk7XG4gICAgdGhpcy5fbWVzaFBpdGNoLnF1YXRlcm5pb24ubXVsdGlwbHkoX3F1YXRCLnNldEZyb21BeGlzQW5nbGUoVkVDM19QT1NJVElWRV9ZLCB5YXcpKTtcbiAgICB0aGlzLl9tZXNoUGl0Y2gucXVhdGVybmlvbi5tdWx0aXBseShRVUFUX1hZX0NXOTApO1xuXG4gICAgLy8gdXBkYXRlIHRhcmdldCBsaW5lIGFuZCBzcGhlcmVcbiAgICBjb25zdCB7IHRhcmdldCwgYXV0b1VwZGF0ZSB9ID0gdGhpcy52cm1Mb29rQXQ7XG4gICAgaWYgKHRhcmdldCAhPSBudWxsICYmIGF1dG9VcGRhdGUpIHtcbiAgICAgIHRhcmdldC5nZXRXb3JsZFBvc2l0aW9uKF92M0IpLnN1YihfdjNBKTtcbiAgICAgIHRoaXMuX2xpbmVUYXJnZXQuZ2VvbWV0cnkudGFpbC5jb3B5KF92M0IpO1xuICAgICAgdGhpcy5fbGluZVRhcmdldC5nZW9tZXRyeS51cGRhdGUoKTtcbiAgICAgIHRoaXMuX2xpbmVUYXJnZXQucG9zaXRpb24uY29weShfdjNBKTtcbiAgICB9XG5cbiAgICAvLyBhcHBseSB0cmFuc2Zvcm0gdG8gbWVzaGVzXG4gICAgc3VwZXIudXBkYXRlTWF0cml4V29ybGQoZm9yY2UpO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG5leHBvcnQgY2xhc3MgRmFuQnVmZmVyR2VvbWV0cnkgZXh0ZW5kcyBUSFJFRS5CdWZmZXJHZW9tZXRyeSB7XG4gIHB1YmxpYyB0aGV0YTogbnVtYmVyO1xuICBwdWJsaWMgcmFkaXVzOiBudW1iZXI7XG4gIHByaXZhdGUgX2N1cnJlbnRUaGV0YSA9IDA7XG4gIHByaXZhdGUgX2N1cnJlbnRSYWRpdXMgPSAwO1xuICBwcml2YXRlIHJlYWRvbmx5IF9hdHRyUG9zOiBUSFJFRS5CdWZmZXJBdHRyaWJ1dGU7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2F0dHJJbmRleDogVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy50aGV0YSA9IDAuMDtcbiAgICB0aGlzLnJhZGl1cyA9IDAuMDtcbiAgICB0aGlzLl9jdXJyZW50VGhldGEgPSAwLjA7XG4gICAgdGhpcy5fY3VycmVudFJhZGl1cyA9IDAuMDtcblxuICAgIHRoaXMuX2F0dHJQb3MgPSBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKG5ldyBGbG9hdDMyQXJyYXkoNjUgKiAzKSwgMyk7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJywgdGhpcy5fYXR0clBvcyk7XG5cbiAgICB0aGlzLl9hdHRySW5kZXggPSBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKG5ldyBVaW50MTZBcnJheSgzICogNjMpLCAxKTtcbiAgICB0aGlzLnNldEluZGV4KHRoaXMuX2F0dHJJbmRleCk7XG5cbiAgICB0aGlzLl9idWlsZEluZGV4KCk7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgbGV0IHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gZmFsc2U7XG5cbiAgICBpZiAodGhpcy5fY3VycmVudFRoZXRhICE9PSB0aGlzLnRoZXRhKSB7XG4gICAgICB0aGlzLl9jdXJyZW50VGhldGEgPSB0aGlzLnRoZXRhO1xuICAgICAgc2hvdWxkVXBkYXRlR2VvbWV0cnkgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9jdXJyZW50UmFkaXVzICE9PSB0aGlzLnJhZGl1cykge1xuICAgICAgdGhpcy5fY3VycmVudFJhZGl1cyA9IHRoaXMucmFkaXVzO1xuICAgICAgc2hvdWxkVXBkYXRlR2VvbWV0cnkgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmIChzaG91bGRVcGRhdGVHZW9tZXRyeSkge1xuICAgICAgdGhpcy5fYnVpbGRQb3NpdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2J1aWxkUG9zaXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5fYXR0clBvcy5zZXRYWVooMCwgMC4wLCAwLjAsIDAuMCk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY0OyBpKyspIHtcbiAgICAgIGNvbnN0IHQgPSAoaSAvIDYzLjApICogdGhpcy5fY3VycmVudFRoZXRhO1xuXG4gICAgICB0aGlzLl9hdHRyUG9zLnNldFhZWihpICsgMSwgdGhpcy5fY3VycmVudFJhZGl1cyAqIE1hdGguc2luKHQpLCAwLjAsIHRoaXMuX2N1cnJlbnRSYWRpdXMgKiBNYXRoLmNvcyh0KSk7XG4gICAgfVxuXG4gICAgdGhpcy5fYXR0clBvcy5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIF9idWlsZEluZGV4KCk6IHZvaWQge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNjM7IGkrKykge1xuICAgICAgdGhpcy5fYXR0ckluZGV4LnNldFhZWihpICogMywgMCwgaSArIDEsIGkgKyAyKTtcbiAgICB9XG5cbiAgICB0aGlzLl9hdHRySW5kZXgubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG5leHBvcnQgY2xhc3MgTGluZUFuZFNwaGVyZUJ1ZmZlckdlb21ldHJ5IGV4dGVuZHMgVEhSRUUuQnVmZmVyR2VvbWV0cnkge1xuICBwdWJsaWMgcmFkaXVzOiBudW1iZXI7XG4gIHB1YmxpYyB0YWlsOiBUSFJFRS5WZWN0b3IzO1xuICBwcml2YXRlIF9jdXJyZW50UmFkaXVzOiBudW1iZXI7XG4gIHByaXZhdGUgX2N1cnJlbnRUYWlsOiBUSFJFRS5WZWN0b3IzO1xuICBwcml2YXRlIHJlYWRvbmx5IF9hdHRyUG9zOiBUSFJFRS5CdWZmZXJBdHRyaWJ1dGU7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2F0dHJJbmRleDogVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5yYWRpdXMgPSAwLjA7XG4gICAgdGhpcy5fY3VycmVudFJhZGl1cyA9IDAuMDtcblxuICAgIHRoaXMudGFpbCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG4gICAgdGhpcy5fY3VycmVudFRhaWwgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4gICAgdGhpcy5fYXR0clBvcyA9IG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUobmV3IEZsb2F0MzJBcnJheSgyOTQpLCAzKTtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgncG9zaXRpb24nLCB0aGlzLl9hdHRyUG9zKTtcblxuICAgIHRoaXMuX2F0dHJJbmRleCA9IG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUobmV3IFVpbnQxNkFycmF5KDE5NCksIDEpO1xuICAgIHRoaXMuc2V0SW5kZXgodGhpcy5fYXR0ckluZGV4KTtcblxuICAgIHRoaXMuX2J1aWxkSW5kZXgoKTtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBsZXQgc2hvdWxkVXBkYXRlR2VvbWV0cnkgPSBmYWxzZTtcblxuICAgIGlmICh0aGlzLl9jdXJyZW50UmFkaXVzICE9PSB0aGlzLnJhZGl1cykge1xuICAgICAgdGhpcy5fY3VycmVudFJhZGl1cyA9IHRoaXMucmFkaXVzO1xuICAgICAgc2hvdWxkVXBkYXRlR2VvbWV0cnkgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fY3VycmVudFRhaWwuZXF1YWxzKHRoaXMudGFpbCkpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRUYWlsLmNvcHkodGhpcy50YWlsKTtcbiAgICAgIHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoc2hvdWxkVXBkYXRlR2VvbWV0cnkpIHtcbiAgICAgIHRoaXMuX2J1aWxkUG9zaXRpb24oKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9idWlsZFBvc2l0aW9uKCk6IHZvaWQge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzI7IGkrKykge1xuICAgICAgY29uc3QgdCA9IChpIC8gMTYuMCkgKiBNYXRoLlBJO1xuXG4gICAgICB0aGlzLl9hdHRyUG9zLnNldFhZWihpLCBNYXRoLmNvcyh0KSwgTWF0aC5zaW4odCksIDAuMCk7XG4gICAgICB0aGlzLl9hdHRyUG9zLnNldFhZWigzMiArIGksIDAuMCwgTWF0aC5jb3ModCksIE1hdGguc2luKHQpKTtcbiAgICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKDY0ICsgaSwgTWF0aC5zaW4odCksIDAuMCwgTWF0aC5jb3ModCkpO1xuICAgIH1cblxuICAgIHRoaXMuc2NhbGUodGhpcy5fY3VycmVudFJhZGl1cywgdGhpcy5fY3VycmVudFJhZGl1cywgdGhpcy5fY3VycmVudFJhZGl1cyk7XG4gICAgdGhpcy50cmFuc2xhdGUodGhpcy5fY3VycmVudFRhaWwueCwgdGhpcy5fY3VycmVudFRhaWwueSwgdGhpcy5fY3VycmVudFRhaWwueik7XG5cbiAgICB0aGlzLl9hdHRyUG9zLnNldFhZWig5NiwgMCwgMCwgMCk7XG4gICAgdGhpcy5fYXR0clBvcy5zZXRYWVooOTcsIHRoaXMuX2N1cnJlbnRUYWlsLngsIHRoaXMuX2N1cnJlbnRUYWlsLnksIHRoaXMuX2N1cnJlbnRUYWlsLnopO1xuXG4gICAgdGhpcy5fYXR0clBvcy5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIF9idWlsZEluZGV4KCk6IHZvaWQge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzI7IGkrKykge1xuICAgICAgY29uc3QgaTEgPSAoaSArIDEpICUgMzI7XG5cbiAgICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWShpICogMiwgaSwgaTEpO1xuICAgICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKDY0ICsgaSAqIDIsIDMyICsgaSwgMzIgKyBpMSk7XG4gICAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoMTI4ICsgaSAqIDIsIDY0ICsgaSwgNjQgKyBpMSk7XG4gICAgfVxuICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWSgxOTIsIDk2LCA5Nyk7XG5cbiAgICB0aGlzLl9hdHRySW5kZXgubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNSHVtYW5vaWQgfSBmcm9tICcuLi9odW1hbm9pZCc7XG5pbXBvcnQgeyBnZXRXb3JsZFF1YXRlcm5pb25MaXRlIH0gZnJvbSAnLi4vdXRpbHMvZ2V0V29ybGRRdWF0ZXJuaW9uTGl0ZSc7XG5pbXBvcnQgeyBxdWF0SW52ZXJ0Q29tcGF0IH0gZnJvbSAnLi4vdXRpbHMvcXVhdEludmVydENvbXBhdCc7XG5pbXBvcnQgeyBjYWxjQXppbXV0aEFsdGl0dWRlIH0gZnJvbSAnLi91dGlscy9jYWxjQXppbXV0aEFsdGl0dWRlJztcbmltcG9ydCB0eXBlIHsgVlJNTG9va0F0QXBwbGllciB9IGZyb20gJy4vVlJNTG9va0F0QXBwbGllcic7XG5pbXBvcnQgeyBzYW5pdGl6ZUFuZ2xlIH0gZnJvbSAnLi91dGlscy9zYW5pdGl6ZUFuZ2xlJztcblxuY29uc3QgVkVDM19QT1NJVElWRV9aID0gbmV3IFRIUkVFLlZlY3RvcjMoMC4wLCAwLjAsIDEuMCk7XG5cbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3YzQiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfdjNDID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF9xdWF0QSA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5jb25zdCBfcXVhdEIgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuY29uc3QgX3F1YXRDID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbmNvbnN0IF9xdWF0RCA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5jb25zdCBfZXVsZXJBID0gbmV3IFRIUkVFLkV1bGVyKCk7XG5cbi8qKlxuICogQSBjbGFzcyBjb250cm9scyBleWUgZ2F6ZSBtb3ZlbWVudHMgb2YgYSBWUk0uXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1Mb29rQXQge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEVVTEVSX09SREVSID0gJ1lYWic7IC8vIHlhdy1waXRjaC1yb2xsXG5cbiAgLyoqXG4gICAqIFRoZSBvcmlnaW4gb2YgTG9va0F0LiBQb3NpdGlvbiBvZmZzZXQgZnJvbSB0aGUgaGVhZCBib25lLlxuICAgKi9cbiAgcHVibGljIG9mZnNldEZyb21IZWFkQm9uZSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbiAgLyoqXG4gICAqIEl0cyBhc3NvY2lhdGVkIHtAbGluayBWUk1IdW1hbm9pZH0uXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgaHVtYW5vaWQ6IFZSTUh1bWFub2lkO1xuXG4gIC8qKlxuICAgKiBUaGUge0BsaW5rIFZSTUxvb2tBdEFwcGxpZXJ9IG9mIHRoZSBMb29rQXQuXG4gICAqL1xuICBwdWJsaWMgYXBwbGllcjogVlJNTG9va0F0QXBwbGllcjtcblxuICAvKipcbiAgICogSWYgdGhpcyBpcyB0cnVlLCB0aGUgTG9va0F0IHdpbGwgYmUgdXBkYXRlZCBhdXRvbWF0aWNhbGx5IGJ5IGNhbGxpbmcge0BsaW5rIHVwZGF0ZX0sIHRvd2FyZGluZyB0aGUgZGlyZWN0aW9uIHRvIHRoZSB7QGxpbmsgdGFyZ2V0fS5cbiAgICogYHRydWVgIGJ5IGRlZmF1bHQuXG4gICAqXG4gICAqIFNlZSBhbHNvOiB7QGxpbmsgdGFyZ2V0fVxuICAgKi9cbiAgcHVibGljIGF1dG9VcGRhdGUgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBUaGUgdGFyZ2V0IG9iamVjdCBvZiB0aGUgTG9va0F0LlxuICAgKiBOb3RlIHRoYXQgaXQgZG9lcyBub3QgbWFrZSBhbnkgc2Vuc2UgaWYge0BsaW5rIGF1dG9VcGRhdGV9IGlzIGRpc2FibGVkLlxuICAgKlxuICAgKiBTZWUgYWxzbzoge0BsaW5rIGF1dG9VcGRhdGV9XG4gICAqL1xuICBwdWJsaWMgdGFyZ2V0PzogVEhSRUUuT2JqZWN0M0QgfCBudWxsO1xuXG4gIC8qKlxuICAgKiBUaGUgZnJvbnQgZGlyZWN0aW9uIG9mIHRoZSBmYWNlLlxuICAgKiBJbnRlbmRlZCB0byBiZSB1c2VkIGZvciBWUk0gMC4wIGNvbXBhdCAoVlJNIDAuMCBtb2RlbHMgYXJlIGZhY2luZyBaLSBpbnN0ZWFkIG9mIForKS5cbiAgICogWW91IHVzdWFsbHkgZG9uJ3Qgd2FudCB0byB0b3VjaCB0aGlzLlxuICAgKi9cbiAgcHVibGljIGZhY2VGcm9udCA9IG5ldyBUSFJFRS5WZWN0b3IzKDAuMCwgMC4wLCAxLjApO1xuXG4gIC8qKlxuICAgKiBJdHMgY3VycmVudCBhbmdsZSBhcm91bmQgWSBheGlzLCBpbiBkZWdyZWUuXG4gICAqL1xuICBwcm90ZWN0ZWQgX3lhdzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBJdHMgY3VycmVudCBhbmdsZSBhcm91bmQgWSBheGlzLCBpbiBkZWdyZWUuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHlhdygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl95YXc7XG4gIH1cblxuICAvKipcbiAgICogSXRzIGN1cnJlbnQgYW5nbGUgYXJvdW5kIFkgYXhpcywgaW4gZGVncmVlLlxuICAgKi9cbiAgcHVibGljIHNldCB5YXcodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX3lhdyA9IHZhbHVlO1xuICAgIHRoaXMuX25lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdHMgY3VycmVudCBhbmdsZSBhcm91bmQgWCBheGlzLCBpbiBkZWdyZWUuXG4gICAqL1xuICBwcm90ZWN0ZWQgX3BpdGNoOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEl0cyBjdXJyZW50IGFuZ2xlIGFyb3VuZCBYIGF4aXMsIGluIGRlZ3JlZS5cbiAgICovXG4gIHB1YmxpYyBnZXQgcGl0Y2goKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fcGl0Y2g7XG4gIH1cblxuICAvKipcbiAgICogSXRzIGN1cnJlbnQgYW5nbGUgYXJvdW5kIFggYXhpcywgaW4gZGVncmVlLlxuICAgKi9cbiAgcHVibGljIHNldCBwaXRjaCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fcGl0Y2ggPSB2YWx1ZTtcbiAgICB0aGlzLl9uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogU3BlY2lmaWVzIHRoYXQgYW5nbGVzIG5lZWQgdG8gYmUgYXBwbGllZCB0byBpdHMgW0BsaW5rIGFwcGxpZXJdLlxuICAgKi9cbiAgcHJvdGVjdGVkIF9uZWVkc1VwZGF0ZTogYm9vbGVhbjtcblxuICAvKipcbiAgICogV29ybGQgcm90YXRpb24gb2YgdGhlIGhlYWQgaW4gaXRzIHJlc3QgcG9zZS5cbiAgICovXG4gIHByaXZhdGUgX3Jlc3RIZWFkV29ybGRRdWF0ZXJuaW9uOiBUSFJFRS5RdWF0ZXJuaW9uO1xuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBVc2Uge0BsaW5rIGdldEV1bGVyfSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIGdldCBldWxlcigpOiBUSFJFRS5FdWxlciB7XG4gICAgY29uc29sZS53YXJuKCdWUk1Mb29rQXQ6IGV1bGVyIGlzIGRlcHJlY2F0ZWQuIHVzZSBnZXRFdWxlcigpIGluc3RlYWQuJyk7XG5cbiAgICByZXR1cm4gdGhpcy5nZXRFdWxlcihuZXcgVEhSRUUuRXVsZXIoKSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IHtAbGluayBWUk1Mb29rQXR9LlxuICAgKlxuICAgKiBAcGFyYW0gaHVtYW5vaWQgQSB7QGxpbmsgVlJNSHVtYW5vaWR9XG4gICAqIEBwYXJhbSBhcHBsaWVyIEEge0BsaW5rIFZSTUxvb2tBdEFwcGxpZXJ9XG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoaHVtYW5vaWQ6IFZSTUh1bWFub2lkLCBhcHBsaWVyOiBWUk1Mb29rQXRBcHBsaWVyKSB7XG4gICAgdGhpcy5odW1hbm9pZCA9IGh1bWFub2lkO1xuICAgIHRoaXMuYXBwbGllciA9IGFwcGxpZXI7XG5cbiAgICB0aGlzLl95YXcgPSAwLjA7XG4gICAgdGhpcy5fcGl0Y2ggPSAwLjA7XG4gICAgdGhpcy5fbmVlZHNVcGRhdGUgPSB0cnVlO1xuXG4gICAgdGhpcy5fcmVzdEhlYWRXb3JsZFF1YXRlcm5pb24gPSB0aGlzLmdldExvb2tBdFdvcmxkUXVhdGVybmlvbihuZXcgVEhSRUUuUXVhdGVybmlvbigpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgaXRzIHlhdy1waXRjaCBhbmdsZXMgYXMgYW4gYEV1bGVyYC5cbiAgICogRG9lcyBOT1QgY29uc2lkZXIge0BsaW5rIGZhY2VGcm9udH07IGl0IHJldHVybnMgYEV1bGVyKDAsIDAsIDA7IFwiWVhaXCIpYCBieSBkZWZhdWx0IHJlZ2FyZGxlc3Mgb2YgdGhlIGZhY2VGcm9udCB2YWx1ZS5cbiAgICpcbiAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IGV1bGVyXG4gICAqL1xuICBwdWJsaWMgZ2V0RXVsZXIodGFyZ2V0OiBUSFJFRS5FdWxlcik6IFRIUkVFLkV1bGVyIHtcbiAgICByZXR1cm4gdGFyZ2V0LnNldChUSFJFRS5NYXRoVXRpbHMuREVHMlJBRCAqIHRoaXMuX3BpdGNoLCBUSFJFRS5NYXRoVXRpbHMuREVHMlJBRCAqIHRoaXMuX3lhdywgMC4wLCAnWVhaJyk7XG4gIH1cblxuICAvKipcbiAgICogQ29weSB0aGUgZ2l2ZW4ge0BsaW5rIFZSTUxvb2tBdH0gaW50byB0aGlzIG9uZS5cbiAgICoge0BsaW5rIGh1bWFub2lkfSBtdXN0IGJlIHNhbWUgYXMgdGhlIHNvdXJjZSBvbmUuXG4gICAqIHtAbGluayBhcHBsaWVyfSB3aWxsIHJlZmVyZW5jZSB0aGUgc2FtZSBpbnN0YW5jZSBhcyB0aGUgc291cmNlIG9uZS5cbiAgICogQHBhcmFtIHNvdXJjZSBUaGUge0BsaW5rIFZSTUxvb2tBdH0geW91IHdhbnQgdG8gY29weVxuICAgKiBAcmV0dXJucyB0aGlzXG4gICAqL1xuICBwdWJsaWMgY29weShzb3VyY2U6IFZSTUxvb2tBdCk6IHRoaXMge1xuICAgIGlmICh0aGlzLmh1bWFub2lkICE9PSBzb3VyY2UuaHVtYW5vaWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVlJNTG9va0F0OiBodW1hbm9pZCBtdXN0IGJlIHNhbWUgaW4gb3JkZXIgdG8gY29weScpO1xuICAgIH1cblxuICAgIHRoaXMub2Zmc2V0RnJvbUhlYWRCb25lLmNvcHkoc291cmNlLm9mZnNldEZyb21IZWFkQm9uZSk7XG4gICAgdGhpcy5hcHBsaWVyID0gc291cmNlLmFwcGxpZXI7XG4gICAgdGhpcy5hdXRvVXBkYXRlID0gc291cmNlLmF1dG9VcGRhdGU7XG4gICAgdGhpcy50YXJnZXQgPSBzb3VyY2UudGFyZ2V0O1xuICAgIHRoaXMuZmFjZUZyb250LmNvcHkoc291cmNlLmZhY2VGcm9udCk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgY2xvbmUgb2YgdGhpcyB7QGxpbmsgVlJNTG9va0F0fS5cbiAgICogTm90ZSB0aGF0IHtAbGluayBodW1hbm9pZH0gYW5kIHtAbGluayBhcHBsaWVyfSB3aWxsIHJlZmVyZW5jZSB0aGUgc2FtZSBpbnN0YW5jZSBhcyB0aGlzIG9uZS5cbiAgICogQHJldHVybnMgQ29waWVkIHtAbGluayBWUk1Mb29rQXR9XG4gICAqL1xuICBwdWJsaWMgY2xvbmUoKTogVlJNTG9va0F0IHtcbiAgICByZXR1cm4gbmV3IFZSTUxvb2tBdCh0aGlzLmh1bWFub2lkLCB0aGlzLmFwcGxpZXIpLmNvcHkodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhlIGxvb2tBdCBkaXJlY3Rpb24gKHlhdyBhbmQgcGl0Y2gpIHRvIHRoZSBpbml0aWFsIGRpcmVjdGlvbi5cbiAgICovXG4gIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLl95YXcgPSAwLjA7XG4gICAgdGhpcy5fcGl0Y2ggPSAwLjA7XG4gICAgdGhpcy5fbmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBpdHMgbG9va0F0IHBvc2l0aW9uIGluIHdvcmxkIGNvb3JkaW5hdGUuXG4gICAqXG4gICAqIEBwYXJhbSB0YXJnZXQgQSB0YXJnZXQgYFRIUkVFLlZlY3RvcjNgXG4gICAqL1xuICBwdWJsaWMgZ2V0TG9va0F0V29ybGRQb3NpdGlvbih0YXJnZXQ6IFRIUkVFLlZlY3RvcjMpOiBUSFJFRS5WZWN0b3IzIHtcbiAgICBjb25zdCBoZWFkID0gdGhpcy5odW1hbm9pZC5nZXRSYXdCb25lTm9kZSgnaGVhZCcpITtcblxuICAgIHJldHVybiB0YXJnZXQuY29weSh0aGlzLm9mZnNldEZyb21IZWFkQm9uZSkuYXBwbHlNYXRyaXg0KGhlYWQubWF0cml4V29ybGQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBpdHMgbG9va0F0IHJvdGF0aW9uIGluIHdvcmxkIGNvb3JkaW5hdGUuXG4gICAqIERvZXMgTk9UIGNvbnNpZGVyIHtAbGluayBmYWNlRnJvbnR9LlxuICAgKlxuICAgKiBAcGFyYW0gdGFyZ2V0IEEgdGFyZ2V0IGBUSFJFRS5RdWF0ZXJuaW9uYFxuICAgKi9cbiAgcHVibGljIGdldExvb2tBdFdvcmxkUXVhdGVybmlvbih0YXJnZXQ6IFRIUkVFLlF1YXRlcm5pb24pOiBUSFJFRS5RdWF0ZXJuaW9uIHtcbiAgICBjb25zdCBoZWFkID0gdGhpcy5odW1hbm9pZC5nZXRSYXdCb25lTm9kZSgnaGVhZCcpITtcblxuICAgIHJldHVybiBnZXRXb3JsZFF1YXRlcm5pb25MaXRlKGhlYWQsIHRhcmdldCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgcXVhdGVybmlvbiB0aGF0IHJvdGF0ZXMgdGhlICtaIHVuaXQgdmVjdG9yIG9mIHRoZSBodW1hbm9pZCBIZWFkIHRvIHRoZSB7QGxpbmsgZmFjZUZyb250fSBkaXJlY3Rpb24uXG4gICAqXG4gICAqIEBwYXJhbSB0YXJnZXQgQSB0YXJnZXQgYFRIUkVFLlF1YXRlcm5pb25gXG4gICAqL1xuICBwdWJsaWMgZ2V0RmFjZUZyb250UXVhdGVybmlvbih0YXJnZXQ6IFRIUkVFLlF1YXRlcm5pb24pOiBUSFJFRS5RdWF0ZXJuaW9uIHtcbiAgICBpZiAodGhpcy5mYWNlRnJvbnQuZGlzdGFuY2VUb1NxdWFyZWQoVkVDM19QT1NJVElWRV9aKSA8IDAuMDEpIHtcbiAgICAgIHJldHVybiB0YXJnZXQuY29weSh0aGlzLl9yZXN0SGVhZFdvcmxkUXVhdGVybmlvbikuaW52ZXJ0KCk7XG4gICAgfVxuXG4gICAgY29uc3QgW2ZhY2VGcm9udEF6aW11dGgsIGZhY2VGcm9udEFsdGl0dWRlXSA9IGNhbGNBemltdXRoQWx0aXR1ZGUodGhpcy5mYWNlRnJvbnQpO1xuICAgIF9ldWxlckEuc2V0KDAuMCwgMC41ICogTWF0aC5QSSArIGZhY2VGcm9udEF6aW11dGgsIGZhY2VGcm9udEFsdGl0dWRlLCAnWVpYJyk7XG5cbiAgICByZXR1cm4gdGFyZ2V0LnNldEZyb21FdWxlcihfZXVsZXJBKS5wcmVtdWx0aXBseShfcXVhdEQuY29weSh0aGlzLl9yZXN0SGVhZFdvcmxkUXVhdGVybmlvbikuaW52ZXJ0KCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBpdHMgTG9va0F0IGRpcmVjdGlvbiBpbiB3b3JsZCBjb29yZGluYXRlLlxuICAgKlxuICAgKiBAcGFyYW0gdGFyZ2V0IEEgdGFyZ2V0IGBUSFJFRS5WZWN0b3IzYFxuICAgKi9cbiAgcHVibGljIGdldExvb2tBdFdvcmxkRGlyZWN0aW9uKHRhcmdldDogVEhSRUUuVmVjdG9yMyk6IFRIUkVFLlZlY3RvcjMge1xuICAgIHRoaXMuZ2V0TG9va0F0V29ybGRRdWF0ZXJuaW9uKF9xdWF0Qik7XG4gICAgdGhpcy5nZXRGYWNlRnJvbnRRdWF0ZXJuaW9uKF9xdWF0Qyk7XG5cbiAgICByZXR1cm4gdGFyZ2V0XG4gICAgICAuY29weShWRUMzX1BPU0lUSVZFX1opXG4gICAgICAuYXBwbHlRdWF0ZXJuaW9uKF9xdWF0QilcbiAgICAgIC5hcHBseVF1YXRlcm5pb24oX3F1YXRDKVxuICAgICAgLmFwcGx5RXVsZXIodGhpcy5nZXRFdWxlcihfZXVsZXJBKSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGl0cyBsb29rQXQgdGFyZ2V0IHBvc2l0aW9uLlxuICAgKlxuICAgKiBOb3RlIHRoYXQgaXRzIHJlc3VsdCB3aWxsIGJlIGluc3RhbnRseSBvdmVyd3JpdHRlbiBpZiB7QGxpbmsgVlJNTG9va0F0SGVhZC5hdXRvVXBkYXRlfSBpcyBlbmFibGVkLlxuICAgKlxuICAgKiBJZiB5b3Ugd2FudCB0byB0cmFjayBhbiBvYmplY3QgY29udGludW91c2x5LCB5b3UgbWlnaHQgd2FudCB0byB1c2Uge0BsaW5rIHRhcmdldH0gaW5zdGVhZC5cbiAgICpcbiAgICogQHBhcmFtIHBvc2l0aW9uIEEgdGFyZ2V0IHBvc2l0aW9uLCBpbiB3b3JsZCBzcGFjZVxuICAgKi9cbiAgcHVibGljIGxvb2tBdChwb3NpdGlvbjogVEhSRUUuVmVjdG9yMyk6IHZvaWQge1xuICAgIC8vIExvb2sgYXQgZGlyZWN0aW9uIGluIGxvY2FsIGNvb3JkaW5hdGVcbiAgICBjb25zdCBoZWFkUm90RGlmZkludiA9IF9xdWF0QVxuICAgICAgLmNvcHkodGhpcy5fcmVzdEhlYWRXb3JsZFF1YXRlcm5pb24pXG4gICAgICAubXVsdGlwbHkocXVhdEludmVydENvbXBhdCh0aGlzLmdldExvb2tBdFdvcmxkUXVhdGVybmlvbihfcXVhdEIpKSk7XG4gICAgY29uc3QgaGVhZFBvcyA9IHRoaXMuZ2V0TG9va0F0V29ybGRQb3NpdGlvbihfdjNCKTtcbiAgICBjb25zdCBsb29rQXREaXIgPSBfdjNDLmNvcHkocG9zaXRpb24pLnN1YihoZWFkUG9zKS5hcHBseVF1YXRlcm5pb24oaGVhZFJvdERpZmZJbnYpLm5vcm1hbGl6ZSgpO1xuXG4gICAgLy8gY2FsY3VsYXRlIGFuZ2xlc1xuICAgIGNvbnN0IFthemltdXRoRnJvbSwgYWx0aXR1ZGVGcm9tXSA9IGNhbGNBemltdXRoQWx0aXR1ZGUodGhpcy5mYWNlRnJvbnQpO1xuICAgIGNvbnN0IFthemltdXRoVG8sIGFsdGl0dWRlVG9dID0gY2FsY0F6aW11dGhBbHRpdHVkZShsb29rQXREaXIpO1xuICAgIGNvbnN0IHlhdyA9IHNhbml0aXplQW5nbGUoYXppbXV0aFRvIC0gYXppbXV0aEZyb20pO1xuICAgIGNvbnN0IHBpdGNoID0gc2FuaXRpemVBbmdsZShhbHRpdHVkZUZyb20gLSBhbHRpdHVkZVRvKTsgLy8gc3Bpbm5pbmcgKDEsIDAsIDApIENDVyBhcm91bmQgWiBheGlzIG1ha2VzIHRoZSB2ZWN0b3IgbG9vayB1cCwgd2hpbGUgc3Bpbm5pbmcgKDAsIDAsIDEpIENDVyBhcm91bmQgWCBheGlzIG1ha2VzIHRoZSB2ZWN0b3IgbG9vayBkb3duXG5cbiAgICAvLyBhcHBseSBhbmdsZXNcbiAgICB0aGlzLl95YXcgPSBUSFJFRS5NYXRoVXRpbHMuUkFEMkRFRyAqIHlhdztcbiAgICB0aGlzLl9waXRjaCA9IFRIUkVFLk1hdGhVdGlscy5SQUQyREVHICogcGl0Y2g7XG5cbiAgICB0aGlzLl9uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSBWUk1Mb29rQXRIZWFkLlxuICAgKiBJZiB7QGxpbmsgYXV0b1VwZGF0ZX0gaXMgZW5hYmxlZCwgdGhpcyB3aWxsIG1ha2UgaXQgbG9vayBhdCB0aGUge0BsaW5rIHRhcmdldH0uXG4gICAqXG4gICAqIEBwYXJhbSBkZWx0YSBkZWx0YVRpbWUsIGl0IGlzbid0IHVzZWQgdGhvdWdoLiBZb3UgY2FuIHVzZSB0aGUgcGFyYW1ldGVyIGlmIHlvdSB3YW50IHRvIHVzZSB0aGlzIGluIHlvdXIgb3duIGV4dGVuZGVkIHtAbGluayBWUk1Mb29rQXR9LlxuICAgKi9cbiAgcHVibGljIHVwZGF0ZShkZWx0YTogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudGFyZ2V0ICE9IG51bGwgJiYgdGhpcy5hdXRvVXBkYXRlKSB7XG4gICAgICB0aGlzLmxvb2tBdCh0aGlzLnRhcmdldC5nZXRXb3JsZFBvc2l0aW9uKF92M0EpKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fbmVlZHNVcGRhdGUpIHtcbiAgICAgIHRoaXMuX25lZWRzVXBkYXRlID0gZmFsc2U7XG5cbiAgICAgIHRoaXMuYXBwbGllci5hcHBseVlhd1BpdGNoKHRoaXMuX3lhdywgdGhpcy5fcGl0Y2gpO1xuICAgIH1cbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuY29uc3QgX3Bvc2l0aW9uID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF9zY2FsZSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbi8qKlxuICogQSByZXBsYWNlbWVudCBvZiBgT2JqZWN0M0QuZ2V0V29ybGRRdWF0ZXJuaW9uYC5cbiAqIEV4dHJhY3QgdGhlIHdvcmxkIHF1YXRlcm5pb24gb2YgYW4gb2JqZWN0IGZyb20gaXRzIHdvcmxkIHNwYWNlIG1hdHJpeCwgd2l0aG91dCBjYWxsaW5nIGBPYmplY3QzRC51cGRhdGVXb3JsZE1hdHJpeGAuXG4gKiBVc2UgdGhpcyB3aGVuIHlvdSdyZSBzdXJlIHRoYXQgdGhlIHdvcmxkIG1hdHJpeCBpcyB1cC10by1kYXRlLlxuICpcbiAqIEBwYXJhbSBvYmplY3QgVGhlIG9iamVjdFxuICogQHBhcmFtIG91dCBBIHRhcmdldCBxdWF0ZXJuaW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRXb3JsZFF1YXRlcm5pb25MaXRlKG9iamVjdDogVEhSRUUuT2JqZWN0M0QsIG91dDogVEhSRUUuUXVhdGVybmlvbik6IFRIUkVFLlF1YXRlcm5pb24ge1xuICBvYmplY3QubWF0cml4V29ybGQuZGVjb21wb3NlKF9wb3NpdGlvbiwgb3V0LCBfc2NhbGUpO1xuICByZXR1cm4gb3V0O1xufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBDYWxjdWxhdGUgYXppbXV0aCAvIGFsdGl0dWRlIGFuZ2xlcyBmcm9tIGEgdmVjdG9yLlxuICpcbiAqIFRoaXMgcmV0dXJucyBhIGRpZmZlcmVuY2Ugb2YgYW5nbGVzIGZyb20gKDEsIDAsIDApLlxuICogQXppbXV0aCByZXByZXNlbnRzIGFuIGFuZ2xlIGFyb3VuZCBZIGF4aXMuXG4gKiBBbHRpdHVkZSByZXByZXNlbnRzIGFuIGFuZ2xlIGFyb3VuZCBaIGF4aXMuXG4gKiBJdCBpcyByb3RhdGVkIGluIGludHJpbnNpYyBZLVogb3JkZXIuXG4gKlxuICogQHBhcmFtIHZlY3RvciBUaGUgdmVjdG9yXG4gKiBAcmV0dXJucyBBIHR1cGxlIGNvbnRhaW5zIHR3byBhbmdsZXMsIGBbIGF6aW11dGgsIGFsdGl0dWRlIF1gXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYWxjQXppbXV0aEFsdGl0dWRlKHZlY3RvcjogVEhSRUUuVmVjdG9yMyk6IFthemltdXRoOiBudW1iZXIsIGFsdGl0dWRlOiBudW1iZXJdIHtcbiAgcmV0dXJuIFtNYXRoLmF0YW4yKC12ZWN0b3IueiwgdmVjdG9yLngpLCBNYXRoLmF0YW4yKHZlY3Rvci55LCBNYXRoLnNxcnQodmVjdG9yLnggKiB2ZWN0b3IueCArIHZlY3Rvci56ICogdmVjdG9yLnopKV07XG59XG4iLCAiLyoqXG4gKiBNYWtlIHN1cmUgdGhlIGFuZ2xlIGlzIHdpdGhpbiAtUEkgdG8gUEkuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYGpzXG4gKiBzYW5pdGl6ZUFuZ2xlKDEuNSAqIE1hdGguUEkpIC8vIC0wLjUgKiBQSVxuICogYGBgXG4gKlxuICogQHBhcmFtIGFuZ2xlIEFuIGlucHV0IGFuZ2xlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzYW5pdGl6ZUFuZ2xlKGFuZ2xlOiBudW1iZXIpOiBudW1iZXIge1xuICBjb25zdCByb3VuZFR1cm4gPSBNYXRoLnJvdW5kKGFuZ2xlIC8gMi4wIC8gTWF0aC5QSSk7XG4gIHJldHVybiBhbmdsZSAtIDIuMCAqIE1hdGguUEkgKiByb3VuZFR1cm47XG59XG4iLCAiaW1wb3J0IHsgVlJNSHVtYW5vaWQgfSBmcm9tICcuLi9odW1hbm9pZCc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgdHlwZSB7IFZSTUxvb2tBdEFwcGxpZXIgfSBmcm9tICcuL1ZSTUxvb2tBdEFwcGxpZXInO1xuaW1wb3J0IHsgVlJNTG9va0F0UmFuZ2VNYXAgfSBmcm9tICcuL1ZSTUxvb2tBdFJhbmdlTWFwJztcbmltcG9ydCB7IGNhbGNBemltdXRoQWx0aXR1ZGUgfSBmcm9tICcuL3V0aWxzL2NhbGNBemltdXRoQWx0aXR1ZGUnO1xuaW1wb3J0IHsgZ2V0V29ybGRRdWF0ZXJuaW9uTGl0ZSB9IGZyb20gJy4uL3V0aWxzL2dldFdvcmxkUXVhdGVybmlvbkxpdGUnO1xuXG5jb25zdCBWRUMzX1BPU0lUSVZFX1ogPSBuZXcgVEhSRUUuVmVjdG9yMygwLjAsIDAuMCwgMS4wKTtcblxuY29uc3QgX3F1YXRBID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbmNvbnN0IF9xdWF0QiA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5jb25zdCBfZXVsZXJBID0gbmV3IFRIUkVFLkV1bGVyKDAuMCwgMC4wLCAwLjAsICdZWFonKTtcblxuLyoqXG4gKiBBIGNsYXNzIHRoYXQgYXBwbGllcyBleWUgZ2F6ZSBkaXJlY3Rpb25zIHRvIGEgVlJNLlxuICogSXQgd2lsbCBiZSB1c2VkIGJ5IHtAbGluayBWUk1Mb29rQXR9LlxuICovXG5leHBvcnQgY2xhc3MgVlJNTG9va0F0Qm9uZUFwcGxpZXIgaW1wbGVtZW50cyBWUk1Mb29rQXRBcHBsaWVyIHtcbiAgLyoqXG4gICAqIFJlcHJlc2VudCBpdHMgdHlwZSBvZiBhcHBsaWVyLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyByZWFkb25seSB0eXBlID0gJ2JvbmUnO1xuXG4gIC8qKlxuICAgKiBJdHMgYXNzb2NpYXRlZCB7QGxpbmsgVlJNSHVtYW5vaWR9LlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGh1bWFub2lkOiBWUk1IdW1hbm9pZDtcblxuICAvKipcbiAgICogQSB7QGxpbmsgVlJNTG9va0F0UmFuZ2VNYXB9IGZvciBob3Jpem9udGFsIGlud2FyZCBtb3ZlbWVudC4gVGhlIGxlZnQgZXllIG1vdmVzIHJpZ2h0LiBUaGUgcmlnaHQgZXllIG1vdmVzIGxlZnQuXG4gICAqL1xuICBwdWJsaWMgcmFuZ2VNYXBIb3Jpem9udGFsSW5uZXI6IFZSTUxvb2tBdFJhbmdlTWFwO1xuXG4gIC8qKlxuICAgKiBBIHtAbGluayBWUk1Mb29rQXRSYW5nZU1hcH0gZm9yIGhvcml6b250YWwgb3V0d2FyZCBtb3ZlbWVudC4gVGhlIGxlZnQgZXllIG1vdmVzIGxlZnQuIFRoZSByaWdodCBleWUgbW92ZXMgcmlnaHQuXG4gICAqL1xuICBwdWJsaWMgcmFuZ2VNYXBIb3Jpem9udGFsT3V0ZXI6IFZSTUxvb2tBdFJhbmdlTWFwO1xuXG4gIC8qKlxuICAgKiBBIHtAbGluayBWUk1Mb29rQXRSYW5nZU1hcH0gZm9yIHZlcnRpY2FsIGRvd253YXJkIG1vdmVtZW50LiBCb3RoIGV5ZXMgbW92ZSB1cHdhcmRzLlxuICAgKi9cbiAgcHVibGljIHJhbmdlTWFwVmVydGljYWxEb3duOiBWUk1Mb29rQXRSYW5nZU1hcDtcblxuICAvKipcbiAgICogQSB7QGxpbmsgVlJNTG9va0F0UmFuZ2VNYXB9IGZvciB2ZXJ0aWNhbCB1cHdhcmQgbW92ZW1lbnQuIEJvdGggZXllcyBtb3ZlIGRvd253YXJkcy5cbiAgICovXG4gIHB1YmxpYyByYW5nZU1hcFZlcnRpY2FsVXA6IFZSTUxvb2tBdFJhbmdlTWFwO1xuXG4gIC8qKlxuICAgKiBUaGUgZnJvbnQgZGlyZWN0aW9uIG9mIHRoZSBmYWNlLlxuICAgKiBJbnRlbmRlZCB0byBiZSB1c2VkIGZvciBWUk0gMC4wIGNvbXBhdCAoVlJNIDAuMCBtb2RlbHMgYXJlIGZhY2luZyBaLSBpbnN0ZWFkIG9mIForKS5cbiAgICogWW91IHVzdWFsbHkgZG9uJ3Qgd2FudCB0byB0b3VjaCB0aGlzLlxuICAgKi9cbiAgcHVibGljIGZhY2VGcm9udDogVEhSRUUuVmVjdG9yMztcblxuICAvKipcbiAgICogVGhlIHJlc3QgcXVhdGVybmlvbiBvZiBMZWZ0RXllIGJvbmUuXG4gICAqL1xuICBwcml2YXRlIF9yZXN0UXVhdExlZnRFeWU6IFRIUkVFLlF1YXRlcm5pb247XG5cbiAgLyoqXG4gICAqIFRoZSByZXN0IHF1YXRlcm5pb24gb2YgUmlnaHRFeWUgYm9uZS5cbiAgICovXG4gIHByaXZhdGUgX3Jlc3RRdWF0UmlnaHRFeWU6IFRIUkVFLlF1YXRlcm5pb247XG5cbiAgLyoqXG4gICAqIFRoZSB3b3JsZC1zcGFjZSByZXN0IHF1YXRlcm5pb24gb2YgdGhlIHBhcmVudCBvZiB0aGUgaHVtYW5vaWQgTGVmdEV5ZS5cbiAgICovXG4gIHByaXZhdGUgX3Jlc3RMZWZ0RXllUGFyZW50V29ybGRRdWF0OiBUSFJFRS5RdWF0ZXJuaW9uO1xuXG4gIC8qKlxuICAgKiBUaGUgd29ybGQtc3BhY2UgcmVzdCBxdWF0ZXJuaW9uIG9mIHRoZSBwYXJlbnQgb2YgdGhlIGh1bWFub2lkIFJpZ2h0RXllLlxuICAgKi9cbiAgcHJpdmF0ZSBfcmVzdFJpZ2h0RXllUGFyZW50V29ybGRRdWF0OiBUSFJFRS5RdWF0ZXJuaW9uO1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcge0BsaW5rIFZSTUxvb2tBdEJvbmVBcHBsaWVyfS5cbiAgICpcbiAgICogQHBhcmFtIGh1bWFub2lkIEEge0BsaW5rIFZSTUh1bWFub2lkfVxuICAgKiBAcGFyYW0gcmFuZ2VNYXBIb3Jpem9udGFsSW5uZXIgQSB7QGxpbmsgVlJNTG9va0F0UmFuZ2VNYXB9IHVzZWQgZm9yIGlubmVyIHRyYW5zdmVyc2UgZGlyZWN0aW9uXG4gICAqIEBwYXJhbSByYW5nZU1hcEhvcml6b250YWxPdXRlciBBIHtAbGluayBWUk1Mb29rQXRSYW5nZU1hcH0gdXNlZCBmb3Igb3V0ZXIgdHJhbnN2ZXJzZSBkaXJlY3Rpb25cbiAgICogQHBhcmFtIHJhbmdlTWFwVmVydGljYWxEb3duIEEge0BsaW5rIFZSTUxvb2tBdFJhbmdlTWFwfSB1c2VkIGZvciBkb3duIGRpcmVjdGlvblxuICAgKiBAcGFyYW0gcmFuZ2VNYXBWZXJ0aWNhbFVwIEEge0BsaW5rIFZSTUxvb2tBdFJhbmdlTWFwfSB1c2VkIGZvciB1cCBkaXJlY3Rpb25cbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICBodW1hbm9pZDogVlJNSHVtYW5vaWQsXG4gICAgcmFuZ2VNYXBIb3Jpem9udGFsSW5uZXI6IFZSTUxvb2tBdFJhbmdlTWFwLFxuICAgIHJhbmdlTWFwSG9yaXpvbnRhbE91dGVyOiBWUk1Mb29rQXRSYW5nZU1hcCxcbiAgICByYW5nZU1hcFZlcnRpY2FsRG93bjogVlJNTG9va0F0UmFuZ2VNYXAsXG4gICAgcmFuZ2VNYXBWZXJ0aWNhbFVwOiBWUk1Mb29rQXRSYW5nZU1hcCxcbiAgKSB7XG4gICAgdGhpcy5odW1hbm9pZCA9IGh1bWFub2lkO1xuXG4gICAgdGhpcy5yYW5nZU1hcEhvcml6b250YWxJbm5lciA9IHJhbmdlTWFwSG9yaXpvbnRhbElubmVyO1xuICAgIHRoaXMucmFuZ2VNYXBIb3Jpem9udGFsT3V0ZXIgPSByYW5nZU1hcEhvcml6b250YWxPdXRlcjtcbiAgICB0aGlzLnJhbmdlTWFwVmVydGljYWxEb3duID0gcmFuZ2VNYXBWZXJ0aWNhbERvd247XG4gICAgdGhpcy5yYW5nZU1hcFZlcnRpY2FsVXAgPSByYW5nZU1hcFZlcnRpY2FsVXA7XG5cbiAgICB0aGlzLmZhY2VGcm9udCA9IG5ldyBUSFJFRS5WZWN0b3IzKDAuMCwgMC4wLCAxLjApO1xuXG4gICAgLy8gc2V0IHJlc3QgcXVhdGVybmlvbnNcbiAgICB0aGlzLl9yZXN0UXVhdExlZnRFeWUgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuICAgIHRoaXMuX3Jlc3RRdWF0UmlnaHRFeWUgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuICAgIHRoaXMuX3Jlc3RMZWZ0RXllUGFyZW50V29ybGRRdWF0ID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbiAgICB0aGlzLl9yZXN0UmlnaHRFeWVQYXJlbnRXb3JsZFF1YXQgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXG4gICAgY29uc3QgbGVmdEV5ZSA9IHRoaXMuaHVtYW5vaWQuZ2V0UmF3Qm9uZU5vZGUoJ2xlZnRFeWUnKTtcbiAgICBjb25zdCByaWdodEV5ZSA9IHRoaXMuaHVtYW5vaWQuZ2V0UmF3Qm9uZU5vZGUoJ3JpZ2h0RXllJyk7XG5cbiAgICBpZiAobGVmdEV5ZSkge1xuICAgICAgdGhpcy5fcmVzdFF1YXRMZWZ0RXllLmNvcHkobGVmdEV5ZS5xdWF0ZXJuaW9uKTtcbiAgICAgIGdldFdvcmxkUXVhdGVybmlvbkxpdGUobGVmdEV5ZS5wYXJlbnQhLCB0aGlzLl9yZXN0TGVmdEV5ZVBhcmVudFdvcmxkUXVhdCk7XG4gICAgfVxuXG4gICAgaWYgKHJpZ2h0RXllKSB7XG4gICAgICB0aGlzLl9yZXN0UXVhdFJpZ2h0RXllLmNvcHkocmlnaHRFeWUucXVhdGVybmlvbik7XG4gICAgICBnZXRXb3JsZFF1YXRlcm5pb25MaXRlKHJpZ2h0RXllLnBhcmVudCEsIHRoaXMuX3Jlc3RSaWdodEV5ZVBhcmVudFdvcmxkUXVhdCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoZSBpbnB1dCBhbmdsZSB0byBpdHMgYXNzb2NpYXRlZCBWUk0gbW9kZWwuXG4gICAqXG4gICAqIEBwYXJhbSB5YXcgUm90YXRpb24gYXJvdW5kIFkgYXhpcywgaW4gZGVncmVlXG4gICAqIEBwYXJhbSBwaXRjaCBSb3RhdGlvbiBhcm91bmQgWCBheGlzLCBpbiBkZWdyZWVcbiAgICovXG4gIHB1YmxpYyBhcHBseVlhd1BpdGNoKHlhdzogbnVtYmVyLCBwaXRjaDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgbGVmdEV5ZSA9IHRoaXMuaHVtYW5vaWQuZ2V0UmF3Qm9uZU5vZGUoJ2xlZnRFeWUnKTtcbiAgICBjb25zdCByaWdodEV5ZSA9IHRoaXMuaHVtYW5vaWQuZ2V0UmF3Qm9uZU5vZGUoJ3JpZ2h0RXllJyk7XG4gICAgY29uc3QgbGVmdEV5ZU5vcm1hbGl6ZWQgPSB0aGlzLmh1bWFub2lkLmdldE5vcm1hbGl6ZWRCb25lTm9kZSgnbGVmdEV5ZScpO1xuICAgIGNvbnN0IHJpZ2h0RXllTm9ybWFsaXplZCA9IHRoaXMuaHVtYW5vaWQuZ2V0Tm9ybWFsaXplZEJvbmVOb2RlKCdyaWdodEV5ZScpO1xuICAgIC8vIGxlZnRcbiAgICBpZiAobGVmdEV5ZSkge1xuICAgICAgaWYgKHBpdGNoIDwgMC4wKSB7XG4gICAgICAgIF9ldWxlckEueCA9IC1USFJFRS5NYXRoVXRpbHMuREVHMlJBRCAqIHRoaXMucmFuZ2VNYXBWZXJ0aWNhbERvd24ubWFwKC1waXRjaCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfZXVsZXJBLnggPSBUSFJFRS5NYXRoVXRpbHMuREVHMlJBRCAqIHRoaXMucmFuZ2VNYXBWZXJ0aWNhbFVwLm1hcChwaXRjaCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh5YXcgPCAwLjApIHtcbiAgICAgICAgX2V1bGVyQS55ID0gLVRIUkVFLk1hdGhVdGlscy5ERUcyUkFEICogdGhpcy5yYW5nZU1hcEhvcml6b250YWxJbm5lci5tYXAoLXlhdyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfZXVsZXJBLnkgPSBUSFJFRS5NYXRoVXRpbHMuREVHMlJBRCAqIHRoaXMucmFuZ2VNYXBIb3Jpem9udGFsT3V0ZXIubWFwKHlhdyk7XG4gICAgICB9XG5cbiAgICAgIF9xdWF0QS5zZXRGcm9tRXVsZXIoX2V1bGVyQSk7XG4gICAgICB0aGlzLl9nZXRXb3JsZEZhY2VGcm9udFF1YXQoX3F1YXRCKTtcblxuICAgICAgLy8gX3F1YXRCICogX3F1YXRBICogX3F1YXRCXi0xXG4gICAgICAvLyB3aGVyZSBfcXVhdEEgaXMgTG9va0F0IHJvdGF0aW9uXG4gICAgICAvLyBhbmQgX3F1YXRCIGlzIHdvcmxkRmFjZUZyb250UXVhdFxuICAgICAgbGVmdEV5ZU5vcm1hbGl6ZWQhLnF1YXRlcm5pb24uY29weShfcXVhdEIpLm11bHRpcGx5KF9xdWF0QSkubXVsdGlwbHkoX3F1YXRCLmludmVydCgpKTtcblxuICAgICAgX3F1YXRBLmNvcHkodGhpcy5fcmVzdExlZnRFeWVQYXJlbnRXb3JsZFF1YXQpO1xuXG4gICAgICAvLyBfcXVhdEFeLTEgKiBsZWZ0RXllTm9ybWFsaXplZC5xdWF0ZXJuaW9uICogX3F1YXRBICogcmVzdFF1YXRMZWZ0RXllXG4gICAgICAvLyB3aGVyZSBfcXVhdEEgaXMgcmVzdExlZnRFeWVQYXJlbnRXb3JsZFF1YXRcbiAgICAgIGxlZnRFeWUucXVhdGVybmlvblxuICAgICAgICAuY29weShsZWZ0RXllTm9ybWFsaXplZCEucXVhdGVybmlvbilcbiAgICAgICAgLm11bHRpcGx5KF9xdWF0QSlcbiAgICAgICAgLnByZW11bHRpcGx5KF9xdWF0QS5pbnZlcnQoKSlcbiAgICAgICAgLm11bHRpcGx5KHRoaXMuX3Jlc3RRdWF0TGVmdEV5ZSk7XG4gICAgfVxuXG4gICAgLy8gcmlnaHRcbiAgICBpZiAocmlnaHRFeWUpIHtcbiAgICAgIGlmIChwaXRjaCA8IDAuMCkge1xuICAgICAgICBfZXVsZXJBLnggPSAtVEhSRUUuTWF0aFV0aWxzLkRFRzJSQUQgKiB0aGlzLnJhbmdlTWFwVmVydGljYWxEb3duLm1hcCgtcGl0Y2gpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX2V1bGVyQS54ID0gVEhSRUUuTWF0aFV0aWxzLkRFRzJSQUQgKiB0aGlzLnJhbmdlTWFwVmVydGljYWxVcC5tYXAocGl0Y2gpO1xuICAgICAgfVxuXG4gICAgICBpZiAoeWF3IDwgMC4wKSB7XG4gICAgICAgIF9ldWxlckEueSA9IC1USFJFRS5NYXRoVXRpbHMuREVHMlJBRCAqIHRoaXMucmFuZ2VNYXBIb3Jpem9udGFsT3V0ZXIubWFwKC15YXcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX2V1bGVyQS55ID0gVEhSRUUuTWF0aFV0aWxzLkRFRzJSQUQgKiB0aGlzLnJhbmdlTWFwSG9yaXpvbnRhbElubmVyLm1hcCh5YXcpO1xuICAgICAgfVxuXG4gICAgICBfcXVhdEEuc2V0RnJvbUV1bGVyKF9ldWxlckEpO1xuICAgICAgdGhpcy5fZ2V0V29ybGRGYWNlRnJvbnRRdWF0KF9xdWF0Qik7XG5cbiAgICAgIC8vIF9xdWF0QiAqIF9xdWF0QSAqIF9xdWF0Ql4tMVxuICAgICAgLy8gd2hlcmUgX3F1YXRBIGlzIExvb2tBdCByb3RhdGlvblxuICAgICAgLy8gYW5kIF9xdWF0QiBpcyB3b3JsZEZhY2VGcm9udFF1YXRcbiAgICAgIHJpZ2h0RXllTm9ybWFsaXplZCEucXVhdGVybmlvbi5jb3B5KF9xdWF0QikubXVsdGlwbHkoX3F1YXRBKS5tdWx0aXBseShfcXVhdEIuaW52ZXJ0KCkpO1xuXG4gICAgICBfcXVhdEEuY29weSh0aGlzLl9yZXN0UmlnaHRFeWVQYXJlbnRXb3JsZFF1YXQpO1xuXG4gICAgICAvLyBfcXVhdEFeLTEgKiByaWdodEV5ZU5vcm1hbGl6ZWQucXVhdGVybmlvbiAqIF9xdWF0QSAqIHJlc3RRdWF0UmlnaHRFeWVcbiAgICAgIC8vIHdoZXJlIF9xdWF0QSBpcyByZXN0UmlnaHRFeWVQYXJlbnRXb3JsZFF1YXRcbiAgICAgIHJpZ2h0RXllLnF1YXRlcm5pb25cbiAgICAgICAgLmNvcHkocmlnaHRFeWVOb3JtYWxpemVkIS5xdWF0ZXJuaW9uKVxuICAgICAgICAubXVsdGlwbHkoX3F1YXRBKVxuICAgICAgICAucHJlbXVsdGlwbHkoX3F1YXRBLmludmVydCgpKVxuICAgICAgICAubXVsdGlwbHkodGhpcy5fcmVzdFF1YXRSaWdodEV5ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFVzZSB7QGxpbmsgYXBwbHlZYXdQaXRjaH0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBsb29rQXQoZXVsZXI6IFRIUkVFLkV1bGVyKTogdm9pZCB7XG4gICAgY29uc29sZS53YXJuKCdWUk1Mb29rQXRCb25lQXBwbGllcjogbG9va0F0KCkgaXMgZGVwcmVjYXRlZC4gdXNlIGFwcGx5KCkgaW5zdGVhZC4nKTtcblxuICAgIGNvbnN0IHlhdyA9IFRIUkVFLk1hdGhVdGlscy5SQUQyREVHICogZXVsZXIueTtcbiAgICBjb25zdCBwaXRjaCA9IFRIUkVFLk1hdGhVdGlscy5SQUQyREVHICogZXVsZXIueDtcblxuICAgIHRoaXMuYXBwbHlZYXdQaXRjaCh5YXcsIHBpdGNoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBxdWF0ZXJuaW9uIHRoYXQgcm90YXRlcyB0aGUgd29ybGQtc3BhY2UgK1ogdW5pdCB2ZWN0b3IgdG8gdGhlIHtAbGluayBmYWNlRnJvbnR9IGRpcmVjdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHRhcmdldCBBIHRhcmdldCBgVEhSRUUuUXVhdGVybmlvbmBcbiAgICovXG4gIHByaXZhdGUgX2dldFdvcmxkRmFjZUZyb250UXVhdCh0YXJnZXQ6IFRIUkVFLlF1YXRlcm5pb24pOiBUSFJFRS5RdWF0ZXJuaW9uIHtcbiAgICBpZiAodGhpcy5mYWNlRnJvbnQuZGlzdGFuY2VUb1NxdWFyZWQoVkVDM19QT1NJVElWRV9aKSA8IDAuMDEpIHtcbiAgICAgIHJldHVybiB0YXJnZXQuaWRlbnRpdHkoKTtcbiAgICB9XG5cbiAgICBjb25zdCBbZmFjZUZyb250QXppbXV0aCwgZmFjZUZyb250QWx0aXR1ZGVdID0gY2FsY0F6aW11dGhBbHRpdHVkZSh0aGlzLmZhY2VGcm9udCk7XG4gICAgX2V1bGVyQS5zZXQoMC4wLCAwLjUgKiBNYXRoLlBJICsgZmFjZUZyb250QXppbXV0aCwgZmFjZUZyb250QWx0aXR1ZGUsICdZWlgnKTtcblxuICAgIHJldHVybiB0YXJnZXQuc2V0RnJvbUV1bGVyKF9ldWxlckEpO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgVlJNRXhwcmVzc2lvbk1hbmFnZXIgfSBmcm9tICcuLi9leHByZXNzaW9ucyc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgdHlwZSB7IFZSTUxvb2tBdEFwcGxpZXIgfSBmcm9tICcuL1ZSTUxvb2tBdEFwcGxpZXInO1xuaW1wb3J0IHsgVlJNTG9va0F0UmFuZ2VNYXAgfSBmcm9tICcuL1ZSTUxvb2tBdFJhbmdlTWFwJztcblxuLyoqXG4gKiBBIGNsYXNzIHRoYXQgYXBwbGllcyBleWUgZ2F6ZSBkaXJlY3Rpb25zIHRvIGEgVlJNLlxuICogSXQgd2lsbCBiZSB1c2VkIGJ5IHtAbGluayBWUk1Mb29rQXR9LlxuICovXG5leHBvcnQgY2xhc3MgVlJNTG9va0F0RXhwcmVzc2lvbkFwcGxpZXIgaW1wbGVtZW50cyBWUk1Mb29rQXRBcHBsaWVyIHtcbiAgLyoqXG4gICAqIFJlcHJlc2VudCBpdHMgdHlwZSBvZiBhcHBsaWVyLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyByZWFkb25seSB0eXBlID0gJ2V4cHJlc3Npb24nO1xuXG4gIC8qKlxuICAgKiBJdHMgYXNzb2NpYXRlZCB7QGxpbmsgVlJNRXhwcmVzc2lvbk1hbmFnZXJ9LlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGV4cHJlc3Npb25zOiBWUk1FeHByZXNzaW9uTWFuYWdlcjtcblxuICAvKipcbiAgICogSXQgd29uJ3QgYmUgdXNlZCBpbiBleHByZXNzaW9uIGFwcGxpZXIuXG4gICAqIFNlZSBhbHNvOiB7QGxpbmsgcmFuZ2VNYXBIb3Jpem9udGFsT3V0ZXJ9XG4gICAqL1xuICBwdWJsaWMgcmFuZ2VNYXBIb3Jpem9udGFsSW5uZXI6IFZSTUxvb2tBdFJhbmdlTWFwO1xuXG4gIC8qKlxuICAgKiBBIHtAbGluayBWUk1Mb29rQXRSYW5nZU1hcH0gZm9yIGhvcml6b250YWwgbW92ZW1lbnQuIEJvdGggZXllcyBtb3ZlIGxlZnQgb3IgcmlnaHQuXG4gICAqL1xuICBwdWJsaWMgcmFuZ2VNYXBIb3Jpem9udGFsT3V0ZXI6IFZSTUxvb2tBdFJhbmdlTWFwO1xuXG4gIC8qKlxuICAgKiBBIHtAbGluayBWUk1Mb29rQXRSYW5nZU1hcH0gZm9yIHZlcnRpY2FsIGRvd253YXJkIG1vdmVtZW50LiBCb3RoIGV5ZXMgbW92ZSB1cHdhcmRzLlxuICAgKi9cbiAgcHVibGljIHJhbmdlTWFwVmVydGljYWxEb3duOiBWUk1Mb29rQXRSYW5nZU1hcDtcblxuICAvKipcbiAgICogQSB7QGxpbmsgVlJNTG9va0F0UmFuZ2VNYXB9IGZvciB2ZXJ0aWNhbCB1cHdhcmQgbW92ZW1lbnQuIEJvdGggZXllcyBtb3ZlIGRvd253YXJkcy5cbiAgICovXG4gIHB1YmxpYyByYW5nZU1hcFZlcnRpY2FsVXA6IFZSTUxvb2tBdFJhbmdlTWFwO1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcge0BsaW5rIFZSTUxvb2tBdEV4cHJlc3Npb25BcHBsaWVyfS5cbiAgICpcbiAgICogQHBhcmFtIGV4cHJlc3Npb25zIEEge0BsaW5rIFZSTUV4cHJlc3Npb25NYW5hZ2VyfVxuICAgKiBAcGFyYW0gcmFuZ2VNYXBIb3Jpem9udGFsSW5uZXIgQSB7QGxpbmsgVlJNTG9va0F0UmFuZ2VNYXB9IHVzZWQgZm9yIGlubmVyIHRyYW5zdmVyc2UgZGlyZWN0aW9uXG4gICAqIEBwYXJhbSByYW5nZU1hcEhvcml6b250YWxPdXRlciBBIHtAbGluayBWUk1Mb29rQXRSYW5nZU1hcH0gdXNlZCBmb3Igb3V0ZXIgdHJhbnN2ZXJzZSBkaXJlY3Rpb25cbiAgICogQHBhcmFtIHJhbmdlTWFwVmVydGljYWxEb3duIEEge0BsaW5rIFZSTUxvb2tBdFJhbmdlTWFwfSB1c2VkIGZvciBkb3duIGRpcmVjdGlvblxuICAgKiBAcGFyYW0gcmFuZ2VNYXBWZXJ0aWNhbFVwIEEge0BsaW5rIFZSTUxvb2tBdFJhbmdlTWFwfSB1c2VkIGZvciB1cCBkaXJlY3Rpb25cbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICBleHByZXNzaW9uczogVlJNRXhwcmVzc2lvbk1hbmFnZXIsXG4gICAgcmFuZ2VNYXBIb3Jpem9udGFsSW5uZXI6IFZSTUxvb2tBdFJhbmdlTWFwLFxuICAgIHJhbmdlTWFwSG9yaXpvbnRhbE91dGVyOiBWUk1Mb29rQXRSYW5nZU1hcCxcbiAgICByYW5nZU1hcFZlcnRpY2FsRG93bjogVlJNTG9va0F0UmFuZ2VNYXAsXG4gICAgcmFuZ2VNYXBWZXJ0aWNhbFVwOiBWUk1Mb29rQXRSYW5nZU1hcCxcbiAgKSB7XG4gICAgdGhpcy5leHByZXNzaW9ucyA9IGV4cHJlc3Npb25zO1xuXG4gICAgdGhpcy5yYW5nZU1hcEhvcml6b250YWxJbm5lciA9IHJhbmdlTWFwSG9yaXpvbnRhbElubmVyO1xuICAgIHRoaXMucmFuZ2VNYXBIb3Jpem9udGFsT3V0ZXIgPSByYW5nZU1hcEhvcml6b250YWxPdXRlcjtcbiAgICB0aGlzLnJhbmdlTWFwVmVydGljYWxEb3duID0gcmFuZ2VNYXBWZXJ0aWNhbERvd247XG4gICAgdGhpcy5yYW5nZU1hcFZlcnRpY2FsVXAgPSByYW5nZU1hcFZlcnRpY2FsVXA7XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgdGhlIGlucHV0IGFuZ2xlIHRvIGl0cyBhc3NvY2lhdGVkIFZSTSBtb2RlbC5cbiAgICpcbiAgICogQHBhcmFtIHlhdyBSb3RhdGlvbiBhcm91bmQgWSBheGlzLCBpbiBkZWdyZWVcbiAgICogQHBhcmFtIHBpdGNoIFJvdGF0aW9uIGFyb3VuZCBYIGF4aXMsIGluIGRlZ3JlZVxuICAgKi9cbiAgcHVibGljIGFwcGx5WWF3UGl0Y2goeWF3OiBudW1iZXIsIHBpdGNoOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAocGl0Y2ggPCAwLjApIHtcbiAgICAgIHRoaXMuZXhwcmVzc2lvbnMuc2V0VmFsdWUoJ2xvb2tEb3duJywgMC4wKTtcbiAgICAgIHRoaXMuZXhwcmVzc2lvbnMuc2V0VmFsdWUoJ2xvb2tVcCcsIHRoaXMucmFuZ2VNYXBWZXJ0aWNhbFVwLm1hcCgtcGl0Y2gpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5leHByZXNzaW9ucy5zZXRWYWx1ZSgnbG9va1VwJywgMC4wKTtcbiAgICAgIHRoaXMuZXhwcmVzc2lvbnMuc2V0VmFsdWUoJ2xvb2tEb3duJywgdGhpcy5yYW5nZU1hcFZlcnRpY2FsRG93bi5tYXAocGl0Y2gpKTtcbiAgICB9XG5cbiAgICBpZiAoeWF3IDwgMC4wKSB7XG4gICAgICB0aGlzLmV4cHJlc3Npb25zLnNldFZhbHVlKCdsb29rTGVmdCcsIDAuMCk7XG4gICAgICB0aGlzLmV4cHJlc3Npb25zLnNldFZhbHVlKCdsb29rUmlnaHQnLCB0aGlzLnJhbmdlTWFwSG9yaXpvbnRhbE91dGVyLm1hcCgteWF3KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZXhwcmVzc2lvbnMuc2V0VmFsdWUoJ2xvb2tSaWdodCcsIDAuMCk7XG4gICAgICB0aGlzLmV4cHJlc3Npb25zLnNldFZhbHVlKCdsb29rTGVmdCcsIHRoaXMucmFuZ2VNYXBIb3Jpem9udGFsT3V0ZXIubWFwKHlhdykpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBVc2Uge0BsaW5rIGFwcGx5WWF3UGl0Y2h9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgbG9va0F0KGV1bGVyOiBUSFJFRS5FdWxlcik6IHZvaWQge1xuICAgIGNvbnNvbGUud2FybignVlJNTG9va0F0Qm9uZUFwcGxpZXI6IGxvb2tBdCgpIGlzIGRlcHJlY2F0ZWQuIHVzZSBhcHBseSgpIGluc3RlYWQuJyk7XG5cbiAgICBjb25zdCB5YXcgPSBUSFJFRS5NYXRoVXRpbHMuUkFEMkRFRyAqIGV1bGVyLnk7XG4gICAgY29uc3QgcGl0Y2ggPSBUSFJFRS5NYXRoVXRpbHMuUkFEMkRFRyAqIGV1bGVyLng7XG5cbiAgICB0aGlzLmFwcGx5WWF3UGl0Y2goeWF3LCBwaXRjaCk7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBzYXR1cmF0ZSB9IGZyb20gJy4uL3V0aWxzL3NhdHVyYXRlJztcblxuZXhwb3J0IGNsYXNzIFZSTUxvb2tBdFJhbmdlTWFwIHtcbiAgLyoqXG4gICAqIExpbWl0cyB0aGUgbWF4aW11bSBhbmdsZSBvZiB0aGUgaW5wdXQgYW5nbGUgb2YgdGhlIExvb2tBdCB2ZWN0b3IgZnJvbSB0aGUgZnJvbnQgb2YgdGhlIGhlYWQgKHRoZSBwb3NpdGl2ZSB6IGF4aXMpLlxuICAgKi9cbiAgcHVibGljIGlucHV0TWF4VmFsdWU6IG51bWJlcjtcblxuICAvKipcbiAgICogUmVwcmVzZW50cyBhbiBhbmdsZSAoaW4gZGVncmVlcykgZm9yIGJvbmUgdHlwZSBvZiBMb29rQXQgYXBwbGllcnMsIG9yIGEgd2VpZ2h0IGZvciBleHByZXNzaW9uIHR5cGUgb2YgTG9va0F0IGFwcGxpZXJzLlxuICAgKiBUaGUgaW5wdXQgdmFsdWUgd2lsbCB0YWtlIGAxLjBgIHdoZW4gdGhlIGlucHV0IGFuZ2xlIGVxdWFscyAob3IgZ3JlYXRlcikgdG8ge0BsaW5rIGlucHV0TWF4VmFsdWV9LlxuICAgKi9cbiAgcHVibGljIG91dHB1dFNjYWxlOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyB7QGxpbmsgVlJNTG9va0F0UmFuZ2VNYXB9LlxuICAgKlxuICAgKiBAcGFyYW0gaW5wdXRNYXhWYWx1ZSBUaGUge0BsaW5rIGlucHV0TWF4VmFsdWV9IG9mIHRoZSBtYXBcbiAgICogQHBhcmFtIG91dHB1dFNjYWxlIFRoZSB7QGxpbmsgb3V0cHV0U2NhbGV9IG9mIHRoZSBtYXBcbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihpbnB1dE1heFZhbHVlOiBudW1iZXIsIG91dHB1dFNjYWxlOiBudW1iZXIpIHtcbiAgICB0aGlzLmlucHV0TWF4VmFsdWUgPSBpbnB1dE1heFZhbHVlO1xuICAgIHRoaXMub3V0cHV0U2NhbGUgPSBvdXRwdXRTY2FsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFdmFsdWF0ZSBhbiBpbnB1dCB2YWx1ZSBhbmQgb3V0cHV0IGEgbWFwcGVkIHZhbHVlLlxuICAgKiBAcGFyYW0gc3JjIFRoZSBpbnB1dCB2YWx1ZVxuICAgKi9cbiAgcHVibGljIG1hcChzcmM6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMub3V0cHV0U2NhbGUgKiBzYXR1cmF0ZShzcmMgLyB0aGlzLmlucHV0TWF4VmFsdWUpO1xuICB9XG59XG4iLCAiaW1wb3J0IHR5cGUgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgdHlwZSAqIGFzIFYwVlJNIGZyb20gJ0BwaXhpdi90eXBlcy12cm0tMC4wJztcbmltcG9ydCB0eXBlICogYXMgVjFWUk1TY2hlbWEgZnJvbSAnQHBpeGl2L3R5cGVzLXZybWMtdnJtLTEuMCc7XG5pbXBvcnQgdHlwZSB7IEdMVEYsIEdMVEZMb2FkZXJQbHVnaW4sIEdMVEZQYXJzZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyLmpzJztcbmltcG9ydCB0eXBlIHsgVlJNRXhwcmVzc2lvbk1hbmFnZXIgfSBmcm9tICcuLi9leHByZXNzaW9ucy9WUk1FeHByZXNzaW9uTWFuYWdlcic7XG5pbXBvcnQgdHlwZSB7IFZSTUh1bWFub2lkIH0gZnJvbSAnLi4vaHVtYW5vaWQvVlJNSHVtYW5vaWQnO1xuaW1wb3J0IHsgVlJNTG9va0F0SGVscGVyIH0gZnJvbSAnLi9oZWxwZXJzL1ZSTUxvb2tBdEhlbHBlcic7XG5pbXBvcnQgeyBWUk1Mb29rQXQgfSBmcm9tICcuL1ZSTUxvb2tBdCc7XG5pbXBvcnQgdHlwZSB7IFZSTUxvb2tBdEFwcGxpZXIgfSBmcm9tICcuL1ZSTUxvb2tBdEFwcGxpZXInO1xuaW1wb3J0IHsgVlJNTG9va0F0Qm9uZUFwcGxpZXIgfSBmcm9tICcuL1ZSTUxvb2tBdEJvbmVBcHBsaWVyJztcbmltcG9ydCB7IFZSTUxvb2tBdEV4cHJlc3Npb25BcHBsaWVyIH0gZnJvbSAnLi9WUk1Mb29rQXRFeHByZXNzaW9uQXBwbGllcic7XG5pbXBvcnQgdHlwZSB7IFZSTUxvb2tBdExvYWRlclBsdWdpbk9wdGlvbnMgfSBmcm9tICcuL1ZSTUxvb2tBdExvYWRlclBsdWdpbk9wdGlvbnMnO1xuaW1wb3J0IHsgVlJNTG9va0F0UmFuZ2VNYXAgfSBmcm9tICcuL1ZSTUxvb2tBdFJhbmdlTWFwJztcbmltcG9ydCB7IEdMVEYgYXMgR0xURlNjaGVtYSB9IGZyb20gJ0BnbHRmLXRyYW5zZm9ybS9jb3JlJztcblxuLyoqXG4gKiBQb3NzaWJsZSBzcGVjIHZlcnNpb25zIGl0IHJlY29nbml6ZXMuXG4gKi9cbmNvbnN0IFBPU1NJQkxFX1NQRUNfVkVSU0lPTlMgPSBuZXcgU2V0KFsnMS4wJywgJzEuMC1iZXRhJ10pO1xuXG4vKipcbiAqIFRoZSBtaW5pbXVtIHBlcm1pdHRlZCB2YWx1ZSBmb3Ige0BsaW5rIFYxVlJNU2NoZW1hLkxvb2tBdFJhbmdlTWFwLmlucHV0TWF4VmFsdWV9LlxuICogSWYgdGhlIGdpdmVuIHZhbHVlIGlzIHNtYWxsZXIgdGhhbiB0aGlzLCB0aGUgbG9hZGVyIHNob3dzIGEgd2FybmluZyBhbmQgY2xhbXBzIHVwIHRoZSB2YWx1ZS5cbiAqL1xuY29uc3QgSU5QVVRfTUFYX1ZBTFVFX01JTklNVU0gPSAwLjAxO1xuXG4vKipcbiAqIEEgcGx1Z2luIG9mIEdMVEZMb2FkZXIgdGhhdCBpbXBvcnRzIGEge0BsaW5rIFZSTUxvb2tBdH0gZnJvbSBhIFZSTSBleHRlbnNpb24gb2YgYSBHTFRGLlxuICovXG5leHBvcnQgY2xhc3MgVlJNTG9va0F0TG9hZGVyUGx1Z2luIGltcGxlbWVudHMgR0xURkxvYWRlclBsdWdpbiB7XG4gIC8qKlxuICAgKiBTcGVjaWZ5IGFuIE9iamVjdDNEIHRvIGFkZCB7QGxpbmsgVlJNTG9va0F0SGVscGVyfSBzLlxuICAgKiBJZiBub3Qgc3BlY2lmaWVkLCBoZWxwZXIgd2lsbCBub3QgYmUgY3JlYXRlZC5cbiAgICogSWYgYHJlbmRlck9yZGVyYCBpcyBzZXQgdG8gdGhlIHJvb3QsIGhlbHBlcnMgd2lsbCBjb3B5IHRoZSBzYW1lIGByZW5kZXJPcmRlcmAgLlxuICAgKi9cbiAgcHVibGljIGhlbHBlclJvb3Q/OiBUSFJFRS5PYmplY3QzRDtcblxuICBwdWJsaWMgcmVhZG9ubHkgcGFyc2VyOiBHTFRGUGFyc2VyO1xuXG4gIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xuICAgIC8vIFdlIHNob3VsZCB1c2UgdGhlIGV4dGVuc2lvbiBuYW1lIGluc3RlYWQgYnV0IHdlIGhhdmUgbXVsdGlwbGUgcGx1Z2lucyBmb3IgYW4gZXh0ZW5zaW9uLi4uXG4gICAgcmV0dXJuICdWUk1Mb29rQXRMb2FkZXJQbHVnaW4nO1xuICB9XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBhcnNlcjogR0xURlBhcnNlciwgb3B0aW9ucz86IFZSTUxvb2tBdExvYWRlclBsdWdpbk9wdGlvbnMpIHtcbiAgICB0aGlzLnBhcnNlciA9IHBhcnNlcjtcblxuICAgIHRoaXMuaGVscGVyUm9vdCA9IG9wdGlvbnM/LmhlbHBlclJvb3Q7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgYWZ0ZXJSb290KGdsdGY6IEdMVEYpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB2cm1IdW1hbm9pZCA9IGdsdGYudXNlckRhdGEudnJtSHVtYW5vaWQgYXMgVlJNSHVtYW5vaWQgfCB1bmRlZmluZWQ7XG5cbiAgICAvLyBleHBsaWNpdGx5IGRpc3Rpbmd1aXNoIG51bGwgYW5kIHVuZGVmaW5lZFxuICAgIC8vIHNpbmNlIHZybUh1bWFub2lkIG1pZ2h0IGJlIG51bGwgYXMgYSByZXN1bHRcbiAgICBpZiAodnJtSHVtYW5vaWQgPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKHZybUh1bWFub2lkID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVlJNTG9va0F0TG9hZGVyUGx1Z2luOiB2cm1IdW1hbm9pZCBpcyB1bmRlZmluZWQuIFZSTUh1bWFub2lkTG9hZGVyUGx1Z2luIGhhdmUgdG8gYmUgdXNlZCBmaXJzdCcpO1xuICAgIH1cblxuICAgIGNvbnN0IHZybUV4cHJlc3Npb25NYW5hZ2VyID0gZ2x0Zi51c2VyRGF0YS52cm1FeHByZXNzaW9uTWFuYWdlciBhcyBWUk1FeHByZXNzaW9uTWFuYWdlciB8IHVuZGVmaW5lZDtcblxuICAgIGlmICh2cm1FeHByZXNzaW9uTWFuYWdlciA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAodnJtRXhwcmVzc2lvbk1hbmFnZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnVlJNTG9va0F0TG9hZGVyUGx1Z2luOiB2cm1FeHByZXNzaW9uTWFuYWdlciBpcyB1bmRlZmluZWQuIFZSTUV4cHJlc3Npb25Mb2FkZXJQbHVnaW4gaGF2ZSB0byBiZSB1c2VkIGZpcnN0JyxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgZ2x0Zi51c2VyRGF0YS52cm1Mb29rQXQgPSBhd2FpdCB0aGlzLl9pbXBvcnQoZ2x0ZiwgdnJtSHVtYW5vaWQsIHZybUV4cHJlc3Npb25NYW5hZ2VyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbXBvcnQgYSB7QGxpbmsgVlJNTG9va0F0fSBmcm9tIGEgVlJNLlxuICAgKlxuICAgKiBAcGFyYW0gZ2x0ZiBBIHBhcnNlZCByZXN1bHQgb2YgR0xURiB0YWtlbiBmcm9tIEdMVEZMb2FkZXJcbiAgICogQHBhcmFtIGh1bWFub2lkIEEge0BsaW5rIFZSTUh1bWFub2lkfSBpbnN0YW5jZSB0aGF0IHJlcHJlc2VudHMgdGhlIFZSTVxuICAgKiBAcGFyYW0gZXhwcmVzc2lvbnMgQSB7QGxpbmsgVlJNRXhwcmVzc2lvbk1hbmFnZXJ9IGluc3RhbmNlIHRoYXQgcmVwcmVzZW50cyB0aGUgVlJNXG4gICAqL1xuICBwcml2YXRlIGFzeW5jIF9pbXBvcnQoXG4gICAgZ2x0ZjogR0xURixcbiAgICBodW1hbm9pZDogVlJNSHVtYW5vaWQgfCBudWxsLFxuICAgIGV4cHJlc3Npb25zOiBWUk1FeHByZXNzaW9uTWFuYWdlciB8IG51bGwsXG4gICk6IFByb21pc2U8VlJNTG9va0F0IHwgbnVsbD4ge1xuICAgIGlmIChodW1hbm9pZCA9PSBudWxsIHx8IGV4cHJlc3Npb25zID09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHYxUmVzdWx0ID0gYXdhaXQgdGhpcy5fdjFJbXBvcnQoZ2x0ZiwgaHVtYW5vaWQsIGV4cHJlc3Npb25zKTtcbiAgICBpZiAodjFSZXN1bHQpIHtcbiAgICAgIHJldHVybiB2MVJlc3VsdDtcbiAgICB9XG5cbiAgICBjb25zdCB2MFJlc3VsdCA9IGF3YWl0IHRoaXMuX3YwSW1wb3J0KGdsdGYsIGh1bWFub2lkLCBleHByZXNzaW9ucyk7XG4gICAgaWYgKHYwUmVzdWx0KSB7XG4gICAgICByZXR1cm4gdjBSZXN1bHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF92MUltcG9ydChcbiAgICBnbHRmOiBHTFRGLFxuICAgIGh1bWFub2lkOiBWUk1IdW1hbm9pZCxcbiAgICBleHByZXNzaW9uczogVlJNRXhwcmVzc2lvbk1hbmFnZXIsXG4gICk6IFByb21pc2U8VlJNTG9va0F0IHwgbnVsbD4ge1xuICAgIGNvbnN0IGpzb24gPSB0aGlzLnBhcnNlci5qc29uIGFzIEdMVEZTY2hlbWEuSUdMVEY7XG5cbiAgICAvLyBlYXJseSBhYm9ydCBpZiBpdCBkb2Vzbid0IHVzZSB2cm1cbiAgICBjb25zdCBpc1ZSTVVzZWQgPSBqc29uLmV4dGVuc2lvbnNVc2VkPy5pbmRleE9mKCdWUk1DX3ZybScpICE9PSAtMTtcbiAgICBpZiAoIWlzVlJNVXNlZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgZXh0ZW5zaW9uID0ganNvbi5leHRlbnNpb25zPy5bJ1ZSTUNfdnJtJ10gYXMgVjFWUk1TY2hlbWEuVlJNQ1ZSTSB8IHVuZGVmaW5lZDtcbiAgICBpZiAoIWV4dGVuc2lvbikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc3BlY1ZlcnNpb24gPSBleHRlbnNpb24uc3BlY1ZlcnNpb247XG4gICAgaWYgKCFQT1NTSUJMRV9TUEVDX1ZFUlNJT05TLmhhcyhzcGVjVmVyc2lvbikpIHtcbiAgICAgIGNvbnNvbGUud2FybihgVlJNTG9va0F0TG9hZGVyUGx1Z2luOiBVbmtub3duIFZSTUNfdnJtIHNwZWNWZXJzaW9uIFwiJHtzcGVjVmVyc2lvbn1cImApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc2NoZW1hTG9va0F0ID0gZXh0ZW5zaW9uLmxvb2tBdDtcbiAgICBpZiAoIXNjaGVtYUxvb2tBdCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgZGVmYXVsdE91dHB1dFNjYWxlID0gc2NoZW1hTG9va0F0LnR5cGUgPT09ICdleHByZXNzaW9uJyA/IDEuMCA6IDEwLjA7XG5cbiAgICBjb25zdCBtYXBISSA9IHRoaXMuX3YxSW1wb3J0UmFuZ2VNYXAoc2NoZW1hTG9va0F0LnJhbmdlTWFwSG9yaXpvbnRhbElubmVyLCBkZWZhdWx0T3V0cHV0U2NhbGUpO1xuICAgIGNvbnN0IG1hcEhPID0gdGhpcy5fdjFJbXBvcnRSYW5nZU1hcChzY2hlbWFMb29rQXQucmFuZ2VNYXBIb3Jpem9udGFsT3V0ZXIsIGRlZmF1bHRPdXRwdXRTY2FsZSk7XG4gICAgY29uc3QgbWFwVkQgPSB0aGlzLl92MUltcG9ydFJhbmdlTWFwKHNjaGVtYUxvb2tBdC5yYW5nZU1hcFZlcnRpY2FsRG93biwgZGVmYXVsdE91dHB1dFNjYWxlKTtcbiAgICBjb25zdCBtYXBWVSA9IHRoaXMuX3YxSW1wb3J0UmFuZ2VNYXAoc2NoZW1hTG9va0F0LnJhbmdlTWFwVmVydGljYWxVcCwgZGVmYXVsdE91dHB1dFNjYWxlKTtcblxuICAgIGxldCBhcHBsaWVyO1xuXG4gICAgaWYgKHNjaGVtYUxvb2tBdC50eXBlID09PSAnZXhwcmVzc2lvbicpIHtcbiAgICAgIGFwcGxpZXIgPSBuZXcgVlJNTG9va0F0RXhwcmVzc2lvbkFwcGxpZXIoZXhwcmVzc2lvbnMsIG1hcEhJLCBtYXBITywgbWFwVkQsIG1hcFZVKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBwbGllciA9IG5ldyBWUk1Mb29rQXRCb25lQXBwbGllcihodW1hbm9pZCwgbWFwSEksIG1hcEhPLCBtYXBWRCwgbWFwVlUpO1xuICAgIH1cblxuICAgIGNvbnN0IGxvb2tBdCA9IHRoaXMuX2ltcG9ydExvb2tBdChodW1hbm9pZCwgYXBwbGllcik7XG5cbiAgICBsb29rQXQub2Zmc2V0RnJvbUhlYWRCb25lLmZyb21BcnJheShzY2hlbWFMb29rQXQub2Zmc2V0RnJvbUhlYWRCb25lID8/IFswLjAsIDAuMDYsIDAuMF0pO1xuXG4gICAgcmV0dXJuIGxvb2tBdDtcbiAgfVxuXG4gIHByaXZhdGUgX3YxSW1wb3J0UmFuZ2VNYXAoXG4gICAgc2NoZW1hUmFuZ2VNYXA6IFYxVlJNU2NoZW1hLkxvb2tBdFJhbmdlTWFwIHwgdW5kZWZpbmVkLFxuICAgIGRlZmF1bHRPdXRwdXRTY2FsZTogbnVtYmVyLFxuICApOiBWUk1Mb29rQXRSYW5nZU1hcCB7XG4gICAgbGV0IGlucHV0TWF4VmFsdWUgPSBzY2hlbWFSYW5nZU1hcD8uaW5wdXRNYXhWYWx1ZSA/PyA5MC4wO1xuICAgIGNvbnN0IG91dHB1dFNjYWxlID0gc2NoZW1hUmFuZ2VNYXA/Lm91dHB1dFNjYWxlID8/IGRlZmF1bHRPdXRwdXRTY2FsZTtcblxuICAgIC8vIEl0IG1pZ2h0IGNhdXNlIE5hTiB3aGVuIGBpbnB1dE1heFZhbHVlYCBpcyB0b28gc21hbGxcbiAgICAvLyB3aGljaCBtYWtlcyB0aGUgbWVzaCBvZiB0aGUgaGVhZCBkaXNhcHBlYXJcbiAgICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9waXhpdi90aHJlZS12cm0vaXNzdWVzLzEyMDFcbiAgICBpZiAoaW5wdXRNYXhWYWx1ZSA8IElOUFVUX01BWF9WQUxVRV9NSU5JTVVNKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICdWUk1Mb29rQXRMb2FkZXJQbHVnaW46IGlucHV0TWF4VmFsdWUgb2YgYSByYW5nZSBtYXAgaXMgdG9vIHNtYWxsLiBDb25zaWRlciByZXZpZXdpbmcgdGhlIHJhbmdlIG1hcCEnLFxuICAgICAgKTtcbiAgICAgIGlucHV0TWF4VmFsdWUgPSBJTlBVVF9NQVhfVkFMVUVfTUlOSU1VTTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFZSTUxvb2tBdFJhbmdlTWFwKGlucHV0TWF4VmFsdWUsIG91dHB1dFNjYWxlKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX3YwSW1wb3J0KFxuICAgIGdsdGY6IEdMVEYsXG4gICAgaHVtYW5vaWQ6IFZSTUh1bWFub2lkLFxuICAgIGV4cHJlc3Npb25zOiBWUk1FeHByZXNzaW9uTWFuYWdlcixcbiAgKTogUHJvbWlzZTxWUk1Mb29rQXQgfCBudWxsPiB7XG4gICAgY29uc3QganNvbiA9IHRoaXMucGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAgIC8vIGVhcmx5IGFib3J0IGlmIGl0IGRvZXNuJ3QgdXNlIHZybVxuICAgIGNvbnN0IHZybUV4dCA9IGpzb24uZXh0ZW5zaW9ucz8uVlJNIGFzIFYwVlJNLlZSTSB8IHVuZGVmaW5lZDtcbiAgICBpZiAoIXZybUV4dCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc2NoZW1hRmlyc3RQZXJzb24gPSB2cm1FeHQuZmlyc3RQZXJzb247XG4gICAgaWYgKCFzY2hlbWFGaXJzdFBlcnNvbikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgZGVmYXVsdE91dHB1dFNjYWxlID0gc2NoZW1hRmlyc3RQZXJzb24ubG9va0F0VHlwZU5hbWUgPT09ICdCbGVuZFNoYXBlJyA/IDEuMCA6IDEwLjA7XG5cbiAgICBjb25zdCBtYXBISSA9IHRoaXMuX3YwSW1wb3J0RGVncmVlTWFwKHNjaGVtYUZpcnN0UGVyc29uLmxvb2tBdEhvcml6b250YWxJbm5lciwgZGVmYXVsdE91dHB1dFNjYWxlKTtcbiAgICBjb25zdCBtYXBITyA9IHRoaXMuX3YwSW1wb3J0RGVncmVlTWFwKHNjaGVtYUZpcnN0UGVyc29uLmxvb2tBdEhvcml6b250YWxPdXRlciwgZGVmYXVsdE91dHB1dFNjYWxlKTtcbiAgICBjb25zdCBtYXBWRCA9IHRoaXMuX3YwSW1wb3J0RGVncmVlTWFwKHNjaGVtYUZpcnN0UGVyc29uLmxvb2tBdFZlcnRpY2FsRG93biwgZGVmYXVsdE91dHB1dFNjYWxlKTtcbiAgICBjb25zdCBtYXBWVSA9IHRoaXMuX3YwSW1wb3J0RGVncmVlTWFwKHNjaGVtYUZpcnN0UGVyc29uLmxvb2tBdFZlcnRpY2FsVXAsIGRlZmF1bHRPdXRwdXRTY2FsZSk7XG5cbiAgICBsZXQgYXBwbGllcjtcblxuICAgIGlmIChzY2hlbWFGaXJzdFBlcnNvbi5sb29rQXRUeXBlTmFtZSA9PT0gJ0JsZW5kU2hhcGUnKSB7XG4gICAgICBhcHBsaWVyID0gbmV3IFZSTUxvb2tBdEV4cHJlc3Npb25BcHBsaWVyKGV4cHJlc3Npb25zLCBtYXBISSwgbWFwSE8sIG1hcFZELCBtYXBWVSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwcGxpZXIgPSBuZXcgVlJNTG9va0F0Qm9uZUFwcGxpZXIoaHVtYW5vaWQsIG1hcEhJLCBtYXBITywgbWFwVkQsIG1hcFZVKTtcbiAgICB9XG5cbiAgICBjb25zdCBsb29rQXQgPSB0aGlzLl9pbXBvcnRMb29rQXQoaHVtYW5vaWQsIGFwcGxpZXIpO1xuXG4gICAgaWYgKHNjaGVtYUZpcnN0UGVyc29uLmZpcnN0UGVyc29uQm9uZU9mZnNldCkge1xuICAgICAgbG9va0F0Lm9mZnNldEZyb21IZWFkQm9uZS5zZXQoXG4gICAgICAgIHNjaGVtYUZpcnN0UGVyc29uLmZpcnN0UGVyc29uQm9uZU9mZnNldC54ID8/IDAuMCxcbiAgICAgICAgc2NoZW1hRmlyc3RQZXJzb24uZmlyc3RQZXJzb25Cb25lT2Zmc2V0LnkgPz8gMC4wNixcbiAgICAgICAgLShzY2hlbWFGaXJzdFBlcnNvbi5maXJzdFBlcnNvbkJvbmVPZmZzZXQueiA/PyAwLjApLFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9va0F0Lm9mZnNldEZyb21IZWFkQm9uZS5zZXQoMC4wLCAwLjA2LCAwLjApO1xuICAgIH1cblxuICAgIC8vIFZSTSAwLjAgYXJlIGZhY2luZyBaLSBpbnN0ZWFkIG9mIForXG4gICAgbG9va0F0LmZhY2VGcm9udC5zZXQoMC4wLCAwLjAsIC0xLjApO1xuXG4gICAgaWYgKGFwcGxpZXIgaW5zdGFuY2VvZiBWUk1Mb29rQXRCb25lQXBwbGllcikge1xuICAgICAgYXBwbGllci5mYWNlRnJvbnQuc2V0KDAuMCwgMC4wLCAtMS4wKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbG9va0F0O1xuICB9XG5cbiAgcHJpdmF0ZSBfdjBJbXBvcnREZWdyZWVNYXAoXG4gICAgc2NoZW1hRGVncmVlTWFwOiBWMFZSTS5GaXJzdFBlcnNvbkRlZ3JlZU1hcCB8IHVuZGVmaW5lZCxcbiAgICBkZWZhdWx0T3V0cHV0U2NhbGU6IG51bWJlcixcbiAgKTogVlJNTG9va0F0UmFuZ2VNYXAge1xuICAgIGNvbnN0IGN1cnZlID0gc2NoZW1hRGVncmVlTWFwPy5jdXJ2ZTtcbiAgICBpZiAoSlNPTi5zdHJpbmdpZnkoY3VydmUpICE9PSAnWzAsMCwwLDEsMSwxLDEsMF0nKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0N1cnZlcyBvZiBMb29rQXREZWdyZWVNYXAgZGVmaW5lZCBpbiBWUk0gMC4wIGFyZSBub3Qgc3VwcG9ydGVkJyk7XG4gICAgfVxuXG4gICAgbGV0IHhSYW5nZSA9IHNjaGVtYURlZ3JlZU1hcD8ueFJhbmdlID8/IDkwLjA7XG4gICAgY29uc3QgeVJhbmdlID0gc2NoZW1hRGVncmVlTWFwPy55UmFuZ2UgPz8gZGVmYXVsdE91dHB1dFNjYWxlO1xuXG4gICAgLy8gSXQgbWlnaHQgY2F1c2UgTmFOIHdoZW4gYHhSYW5nZWAgaXMgdG9vIHNtYWxsXG4gICAgLy8gd2hpY2ggbWFrZXMgdGhlIG1lc2ggb2YgdGhlIGhlYWQgZGlzYXBwZWFyXG4gICAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vcGl4aXYvdGhyZWUtdnJtL2lzc3Vlcy8xMjAxXG4gICAgaWYgKHhSYW5nZSA8IElOUFVUX01BWF9WQUxVRV9NSU5JTVVNKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1ZSTUxvb2tBdExvYWRlclBsdWdpbjogeFJhbmdlIG9mIGEgZGVncmVlIG1hcCBpcyB0b28gc21hbGwuIENvbnNpZGVyIHJldmlld2luZyB0aGUgZGVncmVlIG1hcCEnKTtcbiAgICAgIHhSYW5nZSA9IElOUFVUX01BWF9WQUxVRV9NSU5JTVVNO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgVlJNTG9va0F0UmFuZ2VNYXAoeFJhbmdlLCB5UmFuZ2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW1wb3J0TG9va0F0KGh1bWFub2lkOiBWUk1IdW1hbm9pZCwgYXBwbGllcjogVlJNTG9va0F0QXBwbGllcik6IFZSTUxvb2tBdCB7XG4gICAgY29uc3QgbG9va0F0ID0gbmV3IFZSTUxvb2tBdChodW1hbm9pZCwgYXBwbGllcik7XG5cbiAgICBpZiAodGhpcy5oZWxwZXJSb290KSB7XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgVlJNTG9va0F0SGVscGVyKGxvb2tBdCk7XG4gICAgICB0aGlzLmhlbHBlclJvb3QuYWRkKGhlbHBlcik7XG4gICAgICBoZWxwZXIucmVuZGVyT3JkZXIgPSB0aGlzLmhlbHBlclJvb3QucmVuZGVyT3JkZXI7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxvb2tBdDtcbiAgfVxufVxuIiwgIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiAqL1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSB0eXBlIG9mIGFwcGxpZXIuXG4gKi9cbmV4cG9ydCBjb25zdCBWUk1Mb29rQXRUeXBlTmFtZSA9IHtcbiAgQm9uZTogJ2JvbmUnLFxuICBFeHByZXNzaW9uOiAnZXhwcmVzc2lvbicsXG59O1xuXG5leHBvcnQgdHlwZSBWUk1Mb29rQXRUeXBlTmFtZSA9IHR5cGVvZiBWUk1Mb29rQXRUeXBlTmFtZVtrZXlvZiB0eXBlb2YgVlJNTG9va0F0VHlwZU5hbWVdO1xuIiwgImltcG9ydCB0eXBlIHsgR0xURiwgR0xURkxvYWRlclBsdWdpbiwgR0xURlBhcnNlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXIuanMnO1xuaW1wb3J0IHR5cGUgeyBWUk0wTWV0YSB9IGZyb20gJy4vVlJNME1ldGEnO1xuaW1wb3J0IHR5cGUgeyBWUk0xTWV0YSB9IGZyb20gJy4vVlJNMU1ldGEnO1xuaW1wb3J0IHR5cGUgeyBWUk1NZXRhIH0gZnJvbSAnLi9WUk1NZXRhJztcbmltcG9ydCB0eXBlIHsgVlJNTWV0YUxvYWRlclBsdWdpbk9wdGlvbnMgfSBmcm9tICcuL1ZSTU1ldGFMb2FkZXJQbHVnaW5PcHRpb25zJztcbmltcG9ydCB0eXBlICogYXMgVjBWUk0gZnJvbSAnQHBpeGl2L3R5cGVzLXZybS0wLjAnO1xuaW1wb3J0IHR5cGUgKiBhcyBWMVZSTVNjaGVtYSBmcm9tICdAcGl4aXYvdHlwZXMtdnJtYy12cm0tMS4wJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IHJlc29sdmVVUkwgfSBmcm9tICcuLi91dGlscy9yZXNvbHZlVVJMJztcbmltcG9ydCB7IEdMVEYgYXMgR0xURlNjaGVtYSB9IGZyb20gJ0BnbHRmLXRyYW5zZm9ybS9jb3JlJztcblxuLyoqXG4gKiBQb3NzaWJsZSBzcGVjIHZlcnNpb25zIGl0IHJlY29nbml6ZXMuXG4gKi9cbmNvbnN0IFBPU1NJQkxFX1NQRUNfVkVSU0lPTlMgPSBuZXcgU2V0KFsnMS4wJywgJzEuMC1iZXRhJ10pO1xuXG4vKipcbiAqIEEgcGx1Z2luIG9mIEdMVEZMb2FkZXIgdGhhdCBpbXBvcnRzIGEge0BsaW5rIFZSTTFNZXRhfSBmcm9tIGEgVlJNIGV4dGVuc2lvbiBvZiBhIEdMVEYuXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1NZXRhTG9hZGVyUGx1Z2luIGltcGxlbWVudHMgR0xURkxvYWRlclBsdWdpbiB7XG4gIHB1YmxpYyByZWFkb25seSBwYXJzZXI6IEdMVEZQYXJzZXI7XG5cbiAgLyoqXG4gICAqIElmIGBmYWxzZWAsIGl0IHdvbid0IGxvYWQgaXRzIHRodW1ibmFpbCBpbWFnZSAoe0BsaW5rIFZSTTFNZXRhLnRodW1ibmFpbEltYWdlfSkuXG4gICAqIGBmYWxzZWAgYnkgZGVmYXVsdC5cbiAgICovXG4gIHB1YmxpYyBuZWVkVGh1bWJuYWlsSW1hZ2U6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEEgbGlzdCBvZiBsaWNlbnNlIHVybHMuXG4gICAqIFRoaXMgbWV0YSBsb2FkZXIgd2lsbCBhY2NlcHQgdGhlc2UgYGxpY2Vuc2VVcmxgcy5cbiAgICogT3RoZXJ3aXNlIGl0IHdvbid0IGJlIGxvYWRlZC5cbiAgICovXG4gIHB1YmxpYyBhY2NlcHRMaWNlbnNlVXJsczogc3RyaW5nW107XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgaXQgc2hvdWxkIGFjY2VwdCBWUk0wLjAgbWV0YSBvciBub3QuXG4gICAqIE5vdGUgdGhhdCBpdCBtaWdodCBsb2FkIHtAbGluayBWUk0wTWV0YX0gaW5zdGVhZCBvZiB7QGxpbmsgVlJNMU1ldGF9IHdoZW4gdGhpcyBpcyBgdHJ1ZWAuXG4gICAqIGB0cnVlYCBieSBkZWZhdWx0LlxuICAgKi9cbiAgcHVibGljIGFjY2VwdFYwTWV0YTogYm9vbGVhbjtcblxuICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICAvLyBXZSBzaG91bGQgdXNlIHRoZSBleHRlbnNpb24gbmFtZSBpbnN0ZWFkIGJ1dCB3ZSBoYXZlIG11bHRpcGxlIHBsdWdpbnMgZm9yIGFuIGV4dGVuc2lvbi4uLlxuICAgIHJldHVybiAnVlJNTWV0YUxvYWRlclBsdWdpbic7XG4gIH1cblxuICBwdWJsaWMgY29uc3RydWN0b3IocGFyc2VyOiBHTFRGUGFyc2VyLCBvcHRpb25zPzogVlJNTWV0YUxvYWRlclBsdWdpbk9wdGlvbnMpIHtcbiAgICB0aGlzLnBhcnNlciA9IHBhcnNlcjtcblxuICAgIHRoaXMubmVlZFRodW1ibmFpbEltYWdlID0gb3B0aW9ucz8ubmVlZFRodW1ibmFpbEltYWdlID8/IGZhbHNlO1xuICAgIHRoaXMuYWNjZXB0TGljZW5zZVVybHMgPSBvcHRpb25zPy5hY2NlcHRMaWNlbnNlVXJscyA/PyBbJ2h0dHBzOi8vdnJtLmRldi9saWNlbnNlcy8xLjAvJ107XG4gICAgdGhpcy5hY2NlcHRWME1ldGEgPSBvcHRpb25zPy5hY2NlcHRWME1ldGEgPz8gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBhZnRlclJvb3QoZ2x0ZjogR0xURik6IFByb21pc2U8dm9pZD4ge1xuICAgIGdsdGYudXNlckRhdGEudnJtTWV0YSA9IGF3YWl0IHRoaXMuX2ltcG9ydChnbHRmKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX2ltcG9ydChnbHRmOiBHTFRGKTogUHJvbWlzZTxWUk1NZXRhIHwgbnVsbD4ge1xuICAgIGNvbnN0IHYxUmVzdWx0ID0gYXdhaXQgdGhpcy5fdjFJbXBvcnQoZ2x0Zik7XG4gICAgaWYgKHYxUmVzdWx0ICE9IG51bGwpIHtcbiAgICAgIHJldHVybiB2MVJlc3VsdDtcbiAgICB9XG5cbiAgICBjb25zdCB2MFJlc3VsdCA9IGF3YWl0IHRoaXMuX3YwSW1wb3J0KGdsdGYpO1xuICAgIGlmICh2MFJlc3VsdCAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gdjBSZXN1bHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF92MUltcG9ydChnbHRmOiBHTFRGKTogUHJvbWlzZTxWUk0xTWV0YSB8IG51bGw+IHtcbiAgICBjb25zdCBqc29uID0gdGhpcy5wYXJzZXIuanNvbiBhcyBHTFRGU2NoZW1hLklHTFRGO1xuXG4gICAgLy8gZWFybHkgYWJvcnQgaWYgaXQgZG9lc24ndCB1c2UgdnJtXG4gICAgY29uc3QgaXNWUk1Vc2VkID0ganNvbi5leHRlbnNpb25zVXNlZD8uaW5kZXhPZignVlJNQ192cm0nKSAhPT0gLTE7XG4gICAgaWYgKCFpc1ZSTVVzZWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGV4dGVuc2lvbiA9IGpzb24uZXh0ZW5zaW9ucz8uWydWUk1DX3ZybSddIGFzIFYxVlJNU2NoZW1hLlZSTUNWUk0gfCB1bmRlZmluZWQ7XG4gICAgaWYgKGV4dGVuc2lvbiA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzcGVjVmVyc2lvbiA9IGV4dGVuc2lvbi5zcGVjVmVyc2lvbjtcbiAgICBpZiAoIVBPU1NJQkxFX1NQRUNfVkVSU0lPTlMuaGFzKHNwZWNWZXJzaW9uKSkge1xuICAgICAgY29uc29sZS53YXJuKGBWUk1NZXRhTG9hZGVyUGx1Z2luOiBVbmtub3duIFZSTUNfdnJtIHNwZWNWZXJzaW9uIFwiJHtzcGVjVmVyc2lvbn1cImApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc2NoZW1hTWV0YSA9IGV4dGVuc2lvbi5tZXRhO1xuICAgIGlmICghc2NoZW1hTWV0YSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gdGhyb3cgYW4gZXJyb3IgaWYgYWNjZXB0VjBNZXRhIGlzIGZhbHNlXG4gICAgY29uc3QgbGljZW5zZVVybCA9IHNjaGVtYU1ldGEubGljZW5zZVVybDtcbiAgICBjb25zdCBhY2NlcHRMaWNlbnNlVXJsc1NldCA9IG5ldyBTZXQodGhpcy5hY2NlcHRMaWNlbnNlVXJscyk7XG4gICAgaWYgKCFhY2NlcHRMaWNlbnNlVXJsc1NldC5oYXMobGljZW5zZVVybCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVlJNTWV0YUxvYWRlclBsdWdpbjogVGhlIGxpY2Vuc2UgdXJsIFwiJHtsaWNlbnNlVXJsfVwiIGlzIG5vdCBhY2NlcHRlZGApO1xuICAgIH1cblxuICAgIGxldCB0aHVtYm5haWxJbWFnZTogSFRNTEltYWdlRWxlbWVudCB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgICBpZiAodGhpcy5uZWVkVGh1bWJuYWlsSW1hZ2UgJiYgc2NoZW1hTWV0YS50aHVtYm5haWxJbWFnZSAhPSBudWxsKSB7XG4gICAgICB0aHVtYm5haWxJbWFnZSA9IChhd2FpdCB0aGlzLl9leHRyYWN0R0xURkltYWdlKHNjaGVtYU1ldGEudGh1bWJuYWlsSW1hZ2UpKSA/PyB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIG1ldGFWZXJzaW9uOiAnMScsXG4gICAgICBuYW1lOiBzY2hlbWFNZXRhLm5hbWUsXG4gICAgICB2ZXJzaW9uOiBzY2hlbWFNZXRhLnZlcnNpb24sXG4gICAgICBhdXRob3JzOiBzY2hlbWFNZXRhLmF1dGhvcnMsXG4gICAgICBjb3B5cmlnaHRJbmZvcm1hdGlvbjogc2NoZW1hTWV0YS5jb3B5cmlnaHRJbmZvcm1hdGlvbixcbiAgICAgIGNvbnRhY3RJbmZvcm1hdGlvbjogc2NoZW1hTWV0YS5jb250YWN0SW5mb3JtYXRpb24sXG4gICAgICByZWZlcmVuY2VzOiBzY2hlbWFNZXRhLnJlZmVyZW5jZXMsXG4gICAgICB0aGlyZFBhcnR5TGljZW5zZXM6IHNjaGVtYU1ldGEudGhpcmRQYXJ0eUxpY2Vuc2VzLFxuICAgICAgdGh1bWJuYWlsSW1hZ2UsXG4gICAgICBsaWNlbnNlVXJsOiBzY2hlbWFNZXRhLmxpY2Vuc2VVcmwsXG4gICAgICBhdmF0YXJQZXJtaXNzaW9uOiBzY2hlbWFNZXRhLmF2YXRhclBlcm1pc3Npb24sXG4gICAgICBhbGxvd0V4Y2Vzc2l2ZWx5VmlvbGVudFVzYWdlOiBzY2hlbWFNZXRhLmFsbG93RXhjZXNzaXZlbHlWaW9sZW50VXNhZ2UsXG4gICAgICBhbGxvd0V4Y2Vzc2l2ZWx5U2V4dWFsVXNhZ2U6IHNjaGVtYU1ldGEuYWxsb3dFeGNlc3NpdmVseVNleHVhbFVzYWdlLFxuICAgICAgY29tbWVyY2lhbFVzYWdlOiBzY2hlbWFNZXRhLmNvbW1lcmNpYWxVc2FnZSxcbiAgICAgIGFsbG93UG9saXRpY2FsT3JSZWxpZ2lvdXNVc2FnZTogc2NoZW1hTWV0YS5hbGxvd1BvbGl0aWNhbE9yUmVsaWdpb3VzVXNhZ2UsXG4gICAgICBhbGxvd0FudGlzb2NpYWxPckhhdGVVc2FnZTogc2NoZW1hTWV0YS5hbGxvd0FudGlzb2NpYWxPckhhdGVVc2FnZSxcbiAgICAgIGNyZWRpdE5vdGF0aW9uOiBzY2hlbWFNZXRhLmNyZWRpdE5vdGF0aW9uLFxuICAgICAgYWxsb3dSZWRpc3RyaWJ1dGlvbjogc2NoZW1hTWV0YS5hbGxvd1JlZGlzdHJpYnV0aW9uLFxuICAgICAgbW9kaWZpY2F0aW9uOiBzY2hlbWFNZXRhLm1vZGlmaWNhdGlvbixcbiAgICAgIG90aGVyTGljZW5zZVVybDogc2NoZW1hTWV0YS5vdGhlckxpY2Vuc2VVcmwsXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX3YwSW1wb3J0KGdsdGY6IEdMVEYpOiBQcm9taXNlPFZSTTBNZXRhIHwgbnVsbD4ge1xuICAgIGNvbnN0IGpzb24gPSB0aGlzLnBhcnNlci5qc29uIGFzIEdMVEZTY2hlbWEuSUdMVEY7XG5cbiAgICAvLyBlYXJseSBhYm9ydCBpZiBpdCBkb2Vzbid0IHVzZSB2cm1cbiAgICBjb25zdCB2cm1FeHQgPSBqc29uLmV4dGVuc2lvbnM/LlZSTSBhcyBWMFZSTS5WUk0gfCB1bmRlZmluZWQ7XG4gICAgaWYgKCF2cm1FeHQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNjaGVtYU1ldGEgPSB2cm1FeHQubWV0YTtcbiAgICBpZiAoIXNjaGVtYU1ldGEpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIHRocm93IGFuIGVycm9yIGlmIGFjY2VwdFYwTWV0YSBpcyBmYWxzZVxuICAgIGlmICghdGhpcy5hY2NlcHRWME1ldGEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVlJNTWV0YUxvYWRlclBsdWdpbjogQXR0ZW1wdGVkIHRvIGxvYWQgVlJNMC4wIG1ldGEgYnV0IGFjY2VwdFYwTWV0YSBpcyBmYWxzZScpO1xuICAgIH1cblxuICAgIC8vIGxvYWQgdGh1bWJuYWlsIHRleHR1cmVcbiAgICBsZXQgdGV4dHVyZTogVEhSRUUuVGV4dHVyZSB8IG51bGwgfCB1bmRlZmluZWQ7XG4gICAgaWYgKHRoaXMubmVlZFRodW1ibmFpbEltYWdlICYmIHNjaGVtYU1ldGEudGV4dHVyZSAhPSBudWxsICYmIHNjaGVtYU1ldGEudGV4dHVyZSAhPT0gLTEpIHtcbiAgICAgIHRleHR1cmUgPSBhd2FpdCB0aGlzLnBhcnNlci5nZXREZXBlbmRlbmN5KCd0ZXh0dXJlJywgc2NoZW1hTWV0YS50ZXh0dXJlKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgbWV0YVZlcnNpb246ICcwJyxcbiAgICAgIGFsbG93ZWRVc2VyTmFtZTogc2NoZW1hTWV0YS5hbGxvd2VkVXNlck5hbWUsXG4gICAgICBhdXRob3I6IHNjaGVtYU1ldGEuYXV0aG9yLFxuICAgICAgY29tbWVyY2lhbFVzc2FnZU5hbWU6IHNjaGVtYU1ldGEuY29tbWVyY2lhbFVzc2FnZU5hbWUsXG4gICAgICBjb250YWN0SW5mb3JtYXRpb246IHNjaGVtYU1ldGEuY29udGFjdEluZm9ybWF0aW9uLFxuICAgICAgbGljZW5zZU5hbWU6IHNjaGVtYU1ldGEubGljZW5zZU5hbWUsXG4gICAgICBvdGhlckxpY2Vuc2VVcmw6IHNjaGVtYU1ldGEub3RoZXJMaWNlbnNlVXJsLFxuICAgICAgb3RoZXJQZXJtaXNzaW9uVXJsOiBzY2hlbWFNZXRhLm90aGVyUGVybWlzc2lvblVybCxcbiAgICAgIHJlZmVyZW5jZTogc2NoZW1hTWV0YS5yZWZlcmVuY2UsXG4gICAgICBzZXh1YWxVc3NhZ2VOYW1lOiBzY2hlbWFNZXRhLnNleHVhbFVzc2FnZU5hbWUsXG4gICAgICB0ZXh0dXJlOiB0ZXh0dXJlID8/IHVuZGVmaW5lZCxcbiAgICAgIHRpdGxlOiBzY2hlbWFNZXRhLnRpdGxlLFxuICAgICAgdmVyc2lvbjogc2NoZW1hTWV0YS52ZXJzaW9uLFxuICAgICAgdmlvbGVudFVzc2FnZU5hbWU6IHNjaGVtYU1ldGEudmlvbGVudFVzc2FnZU5hbWUsXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX2V4dHJhY3RHTFRGSW1hZ2UoaW5kZXg6IG51bWJlcik6IFByb21pc2U8SFRNTEltYWdlRWxlbWVudCB8IG51bGw+IHtcbiAgICBjb25zdCBqc29uID0gdGhpcy5wYXJzZXIuanNvbiBhcyBHTFRGU2NoZW1hLklHTFRGO1xuXG4gICAgY29uc3Qgc291cmNlID0ganNvbi5pbWFnZXM/LltpbmRleF07XG5cbiAgICBpZiAoc291cmNlID09IG51bGwpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgYFZSTU1ldGFMb2FkZXJQbHVnaW46IEF0dGVtcHQgdG8gdXNlIGltYWdlc1ske2luZGV4fV0gb2YgZ2xURiBhcyBhIHRodW1ibmFpbCBidXQgdGhlIGltYWdlIGRvZXNuJ3QgZXhpc3RgLFxuICAgICAgKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIFJlZjogaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9ibG9iL3IxMjQvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlci5qcyNMMjQ2N1xuXG4gICAgLy8gYHNvdXJjZS51cmlgIG1pZ2h0IGJlIGEgcmVmZXJlbmNlIHRvIGEgZmlsZVxuICAgIGxldCBzb3VyY2VVUkk6IHN0cmluZyB8IHVuZGVmaW5lZCA9IHNvdXJjZS51cmk7XG5cbiAgICAvLyBMb2FkIHRoZSBiaW5hcnkgYXMgYSBibG9iXG4gICAgaWYgKHNvdXJjZS5idWZmZXJWaWV3ICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGJ1ZmZlclZpZXcgPSBhd2FpdCB0aGlzLnBhcnNlci5nZXREZXBlbmRlbmN5KCdidWZmZXJWaWV3Jywgc291cmNlLmJ1ZmZlclZpZXcpO1xuICAgICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtidWZmZXJWaWV3XSwgeyB0eXBlOiBzb3VyY2UubWltZVR5cGUgfSk7XG4gICAgICBzb3VyY2VVUkkgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgIH1cblxuICAgIGlmIChzb3VyY2VVUkkgPT0gbnVsbCkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBgVlJNTWV0YUxvYWRlclBsdWdpbjogQXR0ZW1wdCB0byB1c2UgaW1hZ2VzWyR7aW5kZXh9XSBvZiBnbFRGIGFzIGEgdGh1bWJuYWlsIGJ1dCB0aGUgaW1hZ2UgY291bGRuJ3QgbG9hZCBwcm9wZXJseWAsXG4gICAgICApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgbG9hZGVyID0gbmV3IFRIUkVFLkltYWdlTG9hZGVyKCk7XG4gICAgcmV0dXJuIGF3YWl0IGxvYWRlci5sb2FkQXN5bmMocmVzb2x2ZVVSTChzb3VyY2VVUkksICh0aGlzLnBhcnNlciBhcyBhbnkpLm9wdGlvbnMucGF0aCkpLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICBjb25zb2xlLndhcm4oJ1ZSTU1ldGFMb2FkZXJQbHVnaW46IEZhaWxlZCB0byBsb2FkIGEgdGh1bWJuYWlsIGltYWdlJyk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9KTtcbiAgfVxufVxuIiwgIi8qKlxuICogWW9pbmtlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvYmxvYi9tYXN0ZXIvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlci5qc1xuICovXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZVVSTCh1cmw6IHN0cmluZywgcGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgLy8gSW52YWxpZCBVUkxcbiAgaWYgKHR5cGVvZiB1cmwgIT09ICdzdHJpbmcnIHx8IHVybCA9PT0gJycpIHJldHVybiAnJztcblxuICAvLyBIb3N0IFJlbGF0aXZlIFVSTFxuICBpZiAoL15odHRwcz86XFwvXFwvL2kudGVzdChwYXRoKSAmJiAvXlxcLy8udGVzdCh1cmwpKSB7XG4gICAgcGF0aCA9IHBhdGgucmVwbGFjZSgvKF5odHRwcz86XFwvXFwvW14vXSspLiovaSwgJyQxJyk7XG4gIH1cblxuICAvLyBBYnNvbHV0ZSBVUkwgaHR0cDovLyxodHRwczovLywvL1xuICBpZiAoL14oaHR0cHM/Oik/XFwvXFwvL2kudGVzdCh1cmwpKSByZXR1cm4gdXJsO1xuXG4gIC8vIERhdGEgVVJJXG4gIGlmICgvXmRhdGE6LiosLiokL2kudGVzdCh1cmwpKSByZXR1cm4gdXJsO1xuXG4gIC8vIEJsb2IgVVJMXG4gIGlmICgvXmJsb2I6LiokL2kudGVzdCh1cmwpKSByZXR1cm4gdXJsO1xuXG4gIC8vIFJlbGF0aXZlIFVSTFxuICByZXR1cm4gcGF0aCArIHVybDtcbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1FeHByZXNzaW9uTWFuYWdlciB9IGZyb20gJy4vZXhwcmVzc2lvbnMvVlJNRXhwcmVzc2lvbk1hbmFnZXInO1xuaW1wb3J0IHsgVlJNRmlyc3RQZXJzb24gfSBmcm9tICcuL2ZpcnN0UGVyc29uL1ZSTUZpcnN0UGVyc29uJztcbmltcG9ydCB7IFZSTUh1bWFub2lkIH0gZnJvbSAnLi9odW1hbm9pZC9WUk1IdW1hbm9pZCc7XG5pbXBvcnQgeyBWUk1Mb29rQXQgfSBmcm9tICcuL2xvb2tBdC9WUk1Mb29rQXQnO1xuaW1wb3J0IHsgVlJNTWV0YSB9IGZyb20gJy4vbWV0YS9WUk1NZXRhJztcbmltcG9ydCB7IFZSTUNvcmVQYXJhbWV0ZXJzIH0gZnJvbSAnLi9WUk1Db3JlUGFyYW1ldGVycyc7XG5cbi8qKlxuICogQSBjbGFzcyB0aGF0IHJlcHJlc2VudHMgYSBzaW5nbGUgVlJNIG1vZGVsLlxuICogVGhpcyBjbGFzcyBvbmx5IGluY2x1ZGVzIGNvcmUgc3BlYyBvZiB0aGUgVlJNIChgVlJNQ192cm1gKS5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUNvcmUge1xuICAvKipcbiAgICogYFRIUkVFLkdyb3VwYCB0aGF0IGNvbnRhaW5zIHRoZSBlbnRpcmUgVlJNLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IHNjZW5lOiBUSFJFRS5Hcm91cDtcblxuICAvKipcbiAgICogQ29udGFpbnMgbWV0YSBmaWVsZHMgb2YgdGhlIFZSTS5cbiAgICogWW91IG1pZ2h0IHdhbnQgdG8gcmVmZXIgdGhlc2UgbGljZW5zZSBmaWVsZHMgYmVmb3JlIHVzZSB5b3VyIFZSTXMuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgbWV0YTogVlJNTWV0YTtcblxuICAvKipcbiAgICogQ29udGFpbnMge0BsaW5rIFZSTUh1bWFub2lkfSBvZiB0aGUgVlJNLlxuICAgKiBZb3UgY2FuIGNvbnRyb2wgZWFjaCBib25lcyB1c2luZyB7QGxpbmsgVlJNSHVtYW5vaWQuZ2V0Tm9ybWFsaXplZEJvbmVOb2RlfSBvciB7QGxpbmsgVlJNSHVtYW5vaWQuZ2V0UmF3Qm9uZU5vZGV9LlxuICAgKlxuICAgKiBAVE9ETyBBZGQgYSBsaW5rIHRvIFZSTSBzcGVjXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgaHVtYW5vaWQ6IFZSTUh1bWFub2lkO1xuXG4gIC8qKlxuICAgKiBDb250YWlucyB7QGxpbmsgVlJNRXhwcmVzc2lvbk1hbmFnZXJ9IG9mIHRoZSBWUk0uXG4gICAqIFlvdSBtaWdodCB3YW50IHRvIGNvbnRyb2wgdGhlc2UgZmFjaWFsIGV4cHJlc3Npb25zIHZpYSB7QGxpbmsgVlJNRXhwcmVzc2lvbk1hbmFnZXIuc2V0VmFsdWV9LlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGV4cHJlc3Npb25NYW5hZ2VyPzogVlJNRXhwcmVzc2lvbk1hbmFnZXI7XG5cbiAgLyoqXG4gICAqIENvbnRhaW5zIHtAbGluayBWUk1GaXJzdFBlcnNvbn0gb2YgdGhlIFZSTS5cbiAgICogVlJNRmlyc3RQZXJzb24gaXMgbW9zdGx5IHVzZWQgZm9yIG1lc2ggY3VsbGluZyBmb3IgZmlyc3QgcGVyc29uIHZpZXcuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgZmlyc3RQZXJzb24/OiBWUk1GaXJzdFBlcnNvbjtcblxuICAvKipcbiAgICogQ29udGFpbnMge0BsaW5rIFZSTUxvb2tBdH0gb2YgdGhlIFZSTS5cbiAgICogWW91IG1pZ2h0IHdhbnQgdG8gdXNlIHtAbGluayBWUk1Mb29rQXQudGFyZ2V0fSB0byBjb250cm9sIHRoZSBleWUgZGlyZWN0aW9uIG9mIHlvdXIgVlJNcy5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBsb29rQXQ/OiBWUk1Mb29rQXQ7XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBWUk0gaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSBwYXJhbXMgW1tWUk1QYXJhbWV0ZXJzXV0gdGhhdCByZXByZXNlbnRzIGNvbXBvbmVudHMgb2YgdGhlIFZSTVxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBhcmFtczogVlJNQ29yZVBhcmFtZXRlcnMpIHtcbiAgICB0aGlzLnNjZW5lID0gcGFyYW1zLnNjZW5lO1xuICAgIHRoaXMubWV0YSA9IHBhcmFtcy5tZXRhO1xuICAgIHRoaXMuaHVtYW5vaWQgPSBwYXJhbXMuaHVtYW5vaWQ7XG4gICAgdGhpcy5leHByZXNzaW9uTWFuYWdlciA9IHBhcmFtcy5leHByZXNzaW9uTWFuYWdlcjtcbiAgICB0aGlzLmZpcnN0UGVyc29uID0gcGFyYW1zLmZpcnN0UGVyc29uO1xuICAgIHRoaXMubG9va0F0ID0gcGFyYW1zLmxvb2tBdDtcbiAgfVxuXG4gIC8qKlxuICAgKiAqKllvdSBuZWVkIHRvIGNhbGwgdGhpcyBvbiB5b3VyIHVwZGF0ZSBsb29wLioqXG4gICAqXG4gICAqIFRoaXMgZnVuY3Rpb24gdXBkYXRlcyBldmVyeSBWUk0gY29tcG9uZW50cy5cbiAgICpcbiAgICogQHBhcmFtIGRlbHRhIGRlbHRhVGltZVxuICAgKi9cbiAgcHVibGljIHVwZGF0ZShkZWx0YTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5odW1hbm9pZC51cGRhdGUoKTtcblxuICAgIGlmICh0aGlzLmxvb2tBdCkge1xuICAgICAgdGhpcy5sb29rQXQudXBkYXRlKGRlbHRhKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5leHByZXNzaW9uTWFuYWdlcikge1xuICAgICAgdGhpcy5leHByZXNzaW9uTWFuYWdlci51cGRhdGUoKTtcbiAgICB9XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBHTFRGLCBHTFRGTG9hZGVyUGx1Z2luLCBHTFRGUGFyc2VyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlci5qcyc7XG5pbXBvcnQgeyBWUk1Db3JlTG9hZGVyUGx1Z2luT3B0aW9ucyB9IGZyb20gJy4vVlJNQ29yZUxvYWRlclBsdWdpbk9wdGlvbnMnO1xuaW1wb3J0IHsgVlJNQ29yZSB9IGZyb20gJy4vVlJNQ29yZSc7XG5pbXBvcnQgeyBWUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luIH0gZnJvbSAnLi9leHByZXNzaW9ucy9WUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luJztcbmltcG9ydCB7IFZSTUZpcnN0UGVyc29uTG9hZGVyUGx1Z2luIH0gZnJvbSAnLi9maXJzdFBlcnNvbi9WUk1GaXJzdFBlcnNvbkxvYWRlclBsdWdpbic7XG5pbXBvcnQgeyBWUk1IdW1hbm9pZExvYWRlclBsdWdpbiB9IGZyb20gJy4vaHVtYW5vaWQvVlJNSHVtYW5vaWRMb2FkZXJQbHVnaW4nO1xuaW1wb3J0IHsgVlJNTWV0YUxvYWRlclBsdWdpbiB9IGZyb20gJy4vbWV0YS9WUk1NZXRhTG9hZGVyUGx1Z2luJztcbmltcG9ydCB7IFZSTUxvb2tBdExvYWRlclBsdWdpbiB9IGZyb20gJy4vbG9va0F0L1ZSTUxvb2tBdExvYWRlclBsdWdpbic7XG5pbXBvcnQgdHlwZSB7IFZSTUh1bWFub2lkIH0gZnJvbSAnLi9odW1hbm9pZCc7XG5pbXBvcnQgdHlwZSB7IFZSTU1ldGEgfSBmcm9tICcuL21ldGEnO1xuXG5leHBvcnQgY2xhc3MgVlJNQ29yZUxvYWRlclBsdWdpbiBpbXBsZW1lbnRzIEdMVEZMb2FkZXJQbHVnaW4ge1xuICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICAvLyBXZSBzaG91bGQgdXNlIHRoZSBleHRlbnNpb24gbmFtZSBpbnN0ZWFkIGJ1dCB3ZSBoYXZlIG11bHRpcGxlIHBsdWdpbnMgZm9yIGFuIGV4dGVuc2lvbi4uLlxuICAgIHJldHVybiAnVlJNQ192cm0nO1xuICB9XG5cbiAgcHVibGljIHJlYWRvbmx5IHBhcnNlcjogR0xURlBhcnNlcjtcblxuICBwdWJsaWMgcmVhZG9ubHkgZXhwcmVzc2lvblBsdWdpbjogVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbjtcbiAgcHVibGljIHJlYWRvbmx5IGZpcnN0UGVyc29uUGx1Z2luOiBWUk1GaXJzdFBlcnNvbkxvYWRlclBsdWdpbjtcbiAgcHVibGljIHJlYWRvbmx5IGh1bWFub2lkUGx1Z2luOiBWUk1IdW1hbm9pZExvYWRlclBsdWdpbjtcbiAgcHVibGljIHJlYWRvbmx5IGxvb2tBdFBsdWdpbjogVlJNTG9va0F0TG9hZGVyUGx1Z2luO1xuICBwdWJsaWMgcmVhZG9ubHkgbWV0YVBsdWdpbjogVlJNTWV0YUxvYWRlclBsdWdpbjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IocGFyc2VyOiBHTFRGUGFyc2VyLCBvcHRpb25zPzogVlJNQ29yZUxvYWRlclBsdWdpbk9wdGlvbnMpIHtcbiAgICB0aGlzLnBhcnNlciA9IHBhcnNlcjtcblxuICAgIGNvbnN0IGhlbHBlclJvb3QgPSBvcHRpb25zPy5oZWxwZXJSb290O1xuICAgIGNvbnN0IGF1dG9VcGRhdGVIdW1hbkJvbmVzID0gb3B0aW9ucz8uYXV0b1VwZGF0ZUh1bWFuQm9uZXM7XG5cbiAgICB0aGlzLmV4cHJlc3Npb25QbHVnaW4gPSBvcHRpb25zPy5leHByZXNzaW9uUGx1Z2luID8/IG5ldyBWUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luKHBhcnNlcik7XG4gICAgdGhpcy5maXJzdFBlcnNvblBsdWdpbiA9IG9wdGlvbnM/LmZpcnN0UGVyc29uUGx1Z2luID8/IG5ldyBWUk1GaXJzdFBlcnNvbkxvYWRlclBsdWdpbihwYXJzZXIpO1xuICAgIHRoaXMuaHVtYW5vaWRQbHVnaW4gPVxuICAgICAgb3B0aW9ucz8uaHVtYW5vaWRQbHVnaW4gPz8gbmV3IFZSTUh1bWFub2lkTG9hZGVyUGx1Z2luKHBhcnNlciwgeyBoZWxwZXJSb290LCBhdXRvVXBkYXRlSHVtYW5Cb25lcyB9KTtcbiAgICB0aGlzLmxvb2tBdFBsdWdpbiA9IG9wdGlvbnM/Lmxvb2tBdFBsdWdpbiA/PyBuZXcgVlJNTG9va0F0TG9hZGVyUGx1Z2luKHBhcnNlciwgeyBoZWxwZXJSb290IH0pO1xuICAgIHRoaXMubWV0YVBsdWdpbiA9IG9wdGlvbnM/Lm1ldGFQbHVnaW4gPz8gbmV3IFZSTU1ldGFMb2FkZXJQbHVnaW4ocGFyc2VyKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBhZnRlclJvb3QoZ2x0ZjogR0xURik6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMubWV0YVBsdWdpbi5hZnRlclJvb3QoZ2x0Zik7XG4gICAgYXdhaXQgdGhpcy5odW1hbm9pZFBsdWdpbi5hZnRlclJvb3QoZ2x0Zik7XG4gICAgYXdhaXQgdGhpcy5leHByZXNzaW9uUGx1Z2luLmFmdGVyUm9vdChnbHRmKTtcbiAgICBhd2FpdCB0aGlzLmxvb2tBdFBsdWdpbi5hZnRlclJvb3QoZ2x0Zik7XG4gICAgYXdhaXQgdGhpcy5maXJzdFBlcnNvblBsdWdpbi5hZnRlclJvb3QoZ2x0Zik7XG5cbiAgICBjb25zdCBtZXRhID0gZ2x0Zi51c2VyRGF0YS52cm1NZXRhIGFzIFZSTU1ldGEgfCBudWxsO1xuICAgIGNvbnN0IGh1bWFub2lkID0gZ2x0Zi51c2VyRGF0YS52cm1IdW1hbm9pZCBhcyBWUk1IdW1hbm9pZCB8IG51bGw7XG5cbiAgICAvLyBtZXRhIGFuZCBodW1hbm9pZCBhcmUgcmVxdWlyZWQgdG8gYmUgYSBWUk0uXG4gICAgLy8gRG9uJ3QgY3JlYXRlIFZSTSBpZiB0aGV5IGFyZSBudWxsXG4gICAgaWYgKG1ldGEgJiYgaHVtYW5vaWQpIHtcbiAgICAgIGNvbnN0IHZybUNvcmUgPSBuZXcgVlJNQ29yZSh7XG4gICAgICAgIHNjZW5lOiBnbHRmLnNjZW5lLFxuICAgICAgICBleHByZXNzaW9uTWFuYWdlcjogZ2x0Zi51c2VyRGF0YS52cm1FeHByZXNzaW9uTWFuYWdlcixcbiAgICAgICAgZmlyc3RQZXJzb246IGdsdGYudXNlckRhdGEudnJtRmlyc3RQZXJzb24sXG4gICAgICAgIGh1bWFub2lkLFxuICAgICAgICBsb29rQXQ6IGdsdGYudXNlckRhdGEudnJtTG9va0F0LFxuICAgICAgICBtZXRhLFxuICAgICAgfSk7XG5cbiAgICAgIGdsdGYudXNlckRhdGEudnJtQ29yZSA9IHZybUNvcmU7XG4gICAgfVxuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUNBQSxZQUF1QjtBQU1oQixJQUFNLGdCQUFOLGNBQWtD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QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFFQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBRUE7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUVBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFFQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBRUE7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUVBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUVBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRjs7O0FDL0RPLElBQU0sbUJBQW1CO0FBQUEsRUFDOUIsTUFBTTtBQUFBLEVBQ04sT0FBTztBQUFBLEVBQ1AsT0FBTztBQUFBLEVBQ1AsWUFBWTtBQUFBLEVBQ1osTUFBTTtBQUFBLEVBRU4sTUFBTTtBQUFBLEVBQ04sU0FBUztBQUFBLEVBQ1QsVUFBVTtBQUFBLEVBQ1YsS0FBSztBQUFBLEVBRUwsY0FBYztBQUFBLEVBQ2QsY0FBYztBQUFBLEVBQ2QsVUFBVTtBQUFBLEVBQ1YsVUFBVTtBQUFBLEVBRVYsZUFBZTtBQUFBLEVBQ2YsZUFBZTtBQUFBLEVBQ2YsV0FBVztBQUFBLEVBQ1gsV0FBVztBQUFBLEVBRVgsY0FBYztBQUFBLEVBQ2QsY0FBYztBQUFBLEVBQ2QsY0FBYztBQUFBLEVBQ2QsVUFBVTtBQUFBLEVBRVYsZUFBZTtBQUFB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QixVQUFVLElBQUk7QUFFM0MsWUFBTSxPQUFPLEtBQUssU0FBUztBQUMzQixZQUFNLFdBQVcsS0FBSyxTQUFTO0FBSS9CLFVBQUksUUFBUSxVQUFVO0FBQ3BCLGNBQU0sVUFBVSxJQUFJLFFBQVE7QUFBQSxVQUMxQixPQUFPLEtBQUs7QUFBQSxVQUNaLG1CQUFtQixLQUFLLFNBQVM7QUFBQSxVQUNqQyxhQUFhLEtBQUssU0FBUztBQUFBLFVBQzNCO0FBQUEsVUFDQSxRQUFRLEtBQUssU0FBUztBQUFBLFVBQ3RCO0FBQUEsUUFDRixDQUFDO0FBRUQsYUFBSyxTQUFTLFVBQVU7QUFBQSxNQUMxQjtBQUFBLElBQ0Y7QUFBQTtBQUNGOyIsCiAgIm5hbWVzIjogWyJUSFJFRSIsICJUSFJFRSIsICJUSFJFRSIsICJfYSIsICJfYSIsICJfYiIsICJUSFJFRSIsICJQT1NTSUJMRV9TUEVDX1ZFUlNJT05TIiwgIl9hIiwgIlRIUkVFIiwgIlRIUkVFIiwgIl92M0EiLCAiX3F1YXRBIiwgIlRIUkVFIiwgIl92M0EiLCAiX3F1YXRBIiwgIlBPU1NJQkxFX1NQRUNfVkVSU0lPTlMiLCAiVEhSRUUiLCAiVEhSRUUiLCAiVEhSRUUiLCAiX3F1YXRBIiwgIl92M0EiLCAiX3YzQiIsICJUSFJFRSIsICJUSFJFRSIsICJfdjNBIiwgIl92M0IiLCAiX3F1YXRBIiwgIl9xdWF0QiIsICJUSFJFRSIsICJWRUMzX1BPU0lUSVZFX1oiLCAiX3F1YXRBIiwgIl9xdWF0QiIsICJfZXVsZXJBIiwgIlRIUkVFIiwgIlBPU1NJQkxFX1NQRUNfVkVSU0lPTlMiLCAiVEhSRUUiLCAiUE9TU0lCTEVfU1BFQ19WRVJTSU9OUyJdCn0K
