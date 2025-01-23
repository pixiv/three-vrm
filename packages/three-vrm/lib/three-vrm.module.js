/*!
 * @pixiv/three-vrm v3.3.4
 * VRM file loader for three.js.
 *
 * Copyright (c) 2019-2025 pixiv Inc.
 * @pixiv/three-vrm is distributed under MIT License
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

// ../three-vrm-core/lib/three-vrm-core.module.js
import * as THREE from "three";
import * as THREE4 from "three";
import * as THREE2 from "three";
import * as THREE3 from "three";
import * as THREE5 from "three";
import * as THREE6 from "three";
import * as THREE7 from "three";
import * as THREE8 from "three";
import * as THREE11 from "three";
import * as THREE9 from "three";
import * as THREE10 from "three";
import * as THREE13 from "three";
import * as THREE12 from "three";
import * as THREE14 from "three";
import * as THREE15 from "three";
import * as THREE16 from "three";
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
   * @param meshAnnotations A renderer settings. See the description of [[RendererFirstPersonFlags]] for more info
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
   * @param params [[VRMParameters]] that represents components of the VRM
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
import * as THREE52 from "three";
import * as THREE22 from "three";
import * as THREE17 from "three";
import * as THREE42 from "three";
import * as THREE32 from "three";
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
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
      this._materialParams[key] = new THREE22.Color().fromArray(value);
      if (convertSRGBToLinear) {
        this._materialParams[key].convertSRGBToLinear();
      }
    }
  }
  assignTexture(key, texture, isColorTexture) {
    return __async3(this, null, function* () {
      const promise = (() => __async3(this, null, function* () {
        if (texture != null) {
          yield this._parser.assignTexture(this._materialParams, key, texture);
          if (isColorTexture) {
            setTextureColorSpace(this._materialParams[key], "srgb");
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
var mtoon_default2 = "// #define PHONG\n\nuniform vec3 litFactor;\n\nuniform float opacity;\n\nuniform vec3 shadeColorFactor;\n#ifdef USE_SHADEMULTIPLYTEXTURE\n  uniform sampler2D shadeMultiplyTexture;\n  uniform mat3 shadeMultiplyTextureUvTransform;\n#endif\n\nuniform float shadingShiftFactor;\nuniform float shadingToonyFactor;\n\n#ifdef USE_SHADINGSHIFTTEXTURE\n  uniform sampler2D shadingShiftTexture;\n  uniform mat3 shadingShiftTextureUvTransform;\n  uniform float shadingShiftTextureScale;\n#endif\n\nuniform float giEqualizationFactor;\n\nuniform vec3 parametricRimColorFactor;\n#ifdef USE_RIMMULTIPLYTEXTURE\n  uniform sampler2D rimMultiplyTexture;\n  uniform mat3 rimMultiplyTextureUvTransform;\n#endif\nuniform float rimLightingMixFactor;\nuniform float parametricRimFresnelPowerFactor;\nuniform float parametricRimLiftFactor;\n\n#ifdef USE_MATCAPTEXTURE\n  uniform vec3 matcapFactor;\n  uniform sampler2D matcapTexture;\n  uniform mat3 matcapTextureUvTransform;\n#endif\n\nuniform vec3 emissive;\nuniform float emissiveIntensity;\n\nuniform vec3 outlineColorFactor;\nuniform float outlineLightingMixFactor;\n\n#ifdef USE_UVANIMATIONMASKTEXTURE\n  uniform sampler2D uvAnimationMaskTexture;\n  uniform mat3 uvAnimationMaskTextureUvTransform;\n#endif\n\nuniform float uvAnimationScrollXOffset;\nuniform float uvAnimationScrollYOffset;\nuniform float uvAnimationRotationPhase;\n\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n\n// #include <uv_pars_fragment>\n#if ( defined( MTOON_USE_UV ) && !defined( MTOON_UVS_VERTEX_ONLY ) )\n  varying vec2 vUv;\n#endif\n\n// #include <uv2_pars_fragment>\n// COMAPT: pre-r151 uses uv2 for lightMap and aoMap\n#if THREE_VRM_THREE_REVISION < 151\n  #if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n    varying vec2 vUv2;\n  #endif\n#endif\n\n#include <map_pars_fragment>\n\n#ifdef USE_MAP\n  uniform mat3 mapUvTransform;\n#endif\n\n// #include <alphamap_pars_fragment>\n\n#include <alphatest_pars_fragment>\n\n#include <aomap_pars_fragment>\n// #include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n\n#ifdef USE_EMISSIVEMAP\n  uniform mat3 emissiveMapUvTransform;\n#endif\n\n// #include <envmap_common_pars_fragment>\n// #include <envmap_pars_fragment>\n// #include <cube_uv_reflection_fragment>\n#include <fog_pars_fragment>\n\n// #include <bsdfs>\n// COMPAT: pre-r151 doesn't have BRDF_Lambert in <common>\n#if THREE_VRM_THREE_REVISION < 151\n  vec3 BRDF_Lambert( const in vec3 diffuseColor ) {\n    return RECIPROCAL_PI * diffuseColor;\n  }\n#endif\n\n#include <lights_pars_begin>\n\n#include <normal_pars_fragment>\n\n// #include <lights_phong_pars_fragment>\nvarying vec3 vViewPosition;\n\nstruct MToonMaterial {\n  vec3 diffuseColor;\n  vec3 shadeColor;\n  float shadingShift;\n};\n\nfloat linearstep( float a, float b, float t ) {\n  return clamp( ( t - a ) / ( b - a ), 0.0, 1.0 );\n}\n\n/**\n * Convert NdotL into toon shading factor using shadingShift and shadingToony\n */\nfloat getShading(\n  const in float dotNL,\n  const in float shadow,\n  const in float shadingShift\n) {\n  float shading = dotNL;\n  shading = shading + shadingShift;\n  shading = linearstep( -1.0 + shadingToonyFactor, 1.0 - shadingToonyFactor, shading );\n  shading *= shadow;\n  return shading;\n}\n\n/**\n * Mix diffuseColor and shadeColor using shading factor and light color\n */\nvec3 getDiffuse(\n  const in MToonMaterial material,\n  const in float shading,\n  in vec3 lightColor\n) {\n  #ifdef DEBUG_LITSHADERATE\n    return vec3( BRDF_Lambert( shading * lightColor ) );\n  #endif\n\n  vec3 col = lightColor * BRDF_Lambert( mix( material.shadeColor, material.diffuseColor, shading ) );\n\n  // The \"comment out if you want to PBR absolutely\" line\n  #ifdef V0_COMPAT_SHADE\n    col = min( col, material.diffuseColor );\n  #endif\n\n  return col;\n}\n\n// COMPAT: pre-r156 uses a struct GeometricContext\n#if THREE_VRM_THREE_REVISION >= 157\n  void RE_Direct_MToon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in MToonMaterial material, const in float shadow, inout ReflectedLight reflectedLight ) {\n    float dotNL = clamp( dot( geometryNormal, directLight.direction ), -1.0, 1.0 );\n    vec3 irradiance = directLight.color;\n\n    // directSpecular will be used for rim lighting, not an actual specular\n    reflectedLight.directSpecular += irradiance;\n\n    irradiance *= dotNL;\n\n    float shading = getShading( dotNL, shadow, material.shadingShift );\n\n    // toon shaded diffuse\n    reflectedLight.directDiffuse += getDiffuse( material, shading, directLight.color );\n  }\n\n  void RE_IndirectDiffuse_MToon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in MToonMaterial material, inout ReflectedLight reflectedLight ) {\n    // indirect diffuse will use diffuseColor, no shadeColor involved\n    reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n\n    // directSpecular will be used for rim lighting, not an actual specular\n    reflectedLight.directSpecular += irradiance;\n  }\n#else\n  void RE_Direct_MToon( const in IncidentLight directLight, const in GeometricContext geometry, const in MToonMaterial material, const in float shadow, inout ReflectedLight reflectedLight ) {\n    float dotNL = clamp( dot( geometry.normal, directLight.direction ), -1.0, 1.0 );\n    vec3 irradiance = directLight.color;\n\n    // directSpecular will be used for rim lighting, not an actual specular\n    reflectedLight.directSpecular += irradiance;\n\n    irradiance *= dotNL;\n\n    float shading = getShading( dotNL, shadow, material.shadingShift );\n\n    // toon shaded diffuse\n    reflectedLight.directDiffuse += getDiffuse( material, shading, directLight.color );\n  }\n\n  void RE_IndirectDiffuse_MToon( const in vec3 irradiance, const in GeometricContext geometry, const in MToonMaterial material, inout ReflectedLight reflectedLight ) {\n    // indirect diffuse will use diffuseColor, no shadeColor involved\n    reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n\n    // directSpecular will be used for rim lighting, not an actual specular\n    reflectedLight.directSpecular += irradiance;\n  }\n#endif\n\n#define RE_Direct RE_Direct_MToon\n#define RE_IndirectDiffuse RE_IndirectDiffuse_MToon\n#define Material_LightProbeLOD( material ) (0)\n\n#include <shadowmap_pars_fragment>\n// #include <bumpmap_pars_fragment>\n\n// #include <normalmap_pars_fragment>\n#ifdef USE_NORMALMAP\n\n  uniform sampler2D normalMap;\n  uniform mat3 normalMapUvTransform;\n  uniform vec2 normalScale;\n\n#endif\n\n// COMPAT: pre-r151\n// USE_NORMALMAP_OBJECTSPACE used to be OBJECTSPACE_NORMALMAP in pre-r151\n#if defined( USE_NORMALMAP_OBJECTSPACE ) || defined( OBJECTSPACE_NORMALMAP )\n\n  uniform mat3 normalMatrix;\n\n#endif\n\n// COMPAT: pre-r151\n// USE_NORMALMAP_TANGENTSPACE used to be TANGENTSPACE_NORMALMAP in pre-r151\n#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( TANGENTSPACE_NORMALMAP ) )\n\n  // Per-Pixel Tangent Space Normal Mapping\n  // http://hacksoflife.blogspot.ch/2009/11/per-pixel-tangent-space-normal-mapping.html\n\n  // three-vrm specific change: it requires `uv` as an input in order to support uv scrolls\n\n  // Temporary compat against shader change @ Three.js r126, r151\n  #if THREE_VRM_THREE_REVISION >= 151\n\n    mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {\n\n      vec3 q0 = dFdx( eye_pos.xyz );\n      vec3 q1 = dFdy( eye_pos.xyz );\n      vec2 st0 = dFdx( uv.st );\n      vec2 st1 = dFdy( uv.st );\n\n      vec3 N = surf_norm;\n\n      vec3 q1perp = cross( q1, N );\n      vec3 q0perp = cross( N, q0 );\n\n      vec3 T = q1perp * st0.x + q0perp * st1.x;\n      vec3 B = q1perp * st0.y + q0perp * st1.y;\n\n      float det = max( dot( T, T ), dot( B, B ) );\n      float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );\n\n      return mat3( T * scale, B * scale, N );\n\n    }\n\n  #else\n\n    vec3 perturbNormal2Arb( vec2 uv, vec3 eye_pos, vec3 surf_norm, vec3 mapN, float faceDirection ) {\n\n      vec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );\n      vec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );\n      vec2 st0 = dFdx( uv.st );\n      vec2 st1 = dFdy( uv.st );\n\n      vec3 N = normalize( surf_norm );\n\n      vec3 q1perp = cross( q1, N );\n      vec3 q0perp = cross( N, q0 );\n\n      vec3 T = q1perp * st0.x + q0perp * st1.x;\n      vec3 B = q1perp * st0.y + q0perp * st1.y;\n\n      // three-vrm specific change: Workaround for the issue that happens when delta of uv = 0.0\n      // TODO: Is this still required? Or shall I make a PR about it?\n      if ( length( T ) == 0.0 || length( B ) == 0.0 ) {\n        return surf_norm;\n      }\n\n      float det = max( dot( T, T ), dot( B, B ) );\n      float scale = ( det == 0.0 ) ? 0.0 : faceDirection * inversesqrt( det );\n\n      return normalize( T * ( mapN.x * scale ) + B * ( mapN.y * scale ) + N * mapN.z );\n\n    }\n\n  #endif\n\n#endif\n\n// #include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\n// == post correction ==========================================================\nvoid postCorrection() {\n  #include <tonemapping_fragment>\n  #include <colorspace_fragment>\n  #include <fog_fragment>\n  #include <premultiplied_alpha_fragment>\n  #include <dithering_fragment>\n}\n\n// == main procedure ===========================================================\nvoid main() {\n  #include <clipping_planes_fragment>\n\n  vec2 uv = vec2(0.5, 0.5);\n\n  #if ( defined( MTOON_USE_UV ) && !defined( MTOON_UVS_VERTEX_ONLY ) )\n    uv = vUv;\n\n    float uvAnimMask = 1.0;\n    #ifdef USE_UVANIMATIONMASKTEXTURE\n      vec2 uvAnimationMaskTextureUv = ( uvAnimationMaskTextureUvTransform * vec3( uv, 1 ) ).xy;\n      uvAnimMask = texture2D( uvAnimationMaskTexture, uvAnimationMaskTextureUv ).b;\n    #endif\n\n    float uvRotCos = cos( uvAnimationRotationPhase * uvAnimMask );\n    float uvRotSin = sin( uvAnimationRotationPhase * uvAnimMask );\n    uv = mat2( uvRotCos, -uvRotSin, uvRotSin, uvRotCos ) * ( uv - 0.5 ) + 0.5;\n    uv = uv + vec2( uvAnimationScrollXOffset, uvAnimationScrollYOffset ) * uvAnimMask;\n  #endif\n\n  #ifdef DEBUG_UV\n    gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );\n    #if ( defined( MTOON_USE_UV ) && !defined( MTOON_UVS_VERTEX_ONLY ) )\n      gl_FragColor = vec4( uv, 0.0, 1.0 );\n    #endif\n    return;\n  #endif\n\n  vec4 diffuseColor = vec4( litFactor, opacity );\n  ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n  vec3 totalEmissiveRadiance = emissive * emissiveIntensity;\n\n  #include <logdepthbuf_fragment>\n\n  // #include <map_fragment>\n  #ifdef USE_MAP\n    vec2 mapUv = ( mapUvTransform * vec3( uv, 1 ) ).xy;\n    vec4 sampledDiffuseColor = texture2D( map, mapUv );\n    #ifdef DECODE_VIDEO_TEXTURE\n      sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );\n    #endif\n    diffuseColor *= sampledDiffuseColor;\n  #endif\n\n  // #include <color_fragment>\n  #if ( defined( USE_COLOR ) && !defined( IGNORE_VERTEX_COLOR ) )\n    diffuseColor.rgb *= vColor;\n  #endif\n\n  // #include <alphamap_fragment>\n\n  #include <alphatest_fragment>\n\n  // #include <specularmap_fragment>\n\n  // #include <normal_fragment_begin>\n  float faceDirection = gl_FrontFacing ? 1.0 : -1.0;\n\n  #ifdef FLAT_SHADED\n\n    vec3 fdx = dFdx( vViewPosition );\n    vec3 fdy = dFdy( vViewPosition );\n    vec3 normal = normalize( cross( fdx, fdy ) );\n\n  #else\n\n    vec3 normal = normalize( vNormal );\n\n    #ifdef DOUBLE_SIDED\n\n      normal *= faceDirection;\n\n    #endif\n\n  #endif\n\n  #ifdef USE_NORMALMAP\n\n    vec2 normalMapUv = ( normalMapUvTransform * vec3( uv, 1 ) ).xy;\n\n  #endif\n\n  #ifdef USE_NORMALMAP_TANGENTSPACE\n\n    #ifdef USE_TANGENT\n\n      mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );\n\n    #else\n\n      mat3 tbn = getTangentFrame( - vViewPosition, normal, normalMapUv );\n\n    #endif\n\n    #if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )\n\n      tbn[0] *= faceDirection;\n      tbn[1] *= faceDirection;\n\n    #endif\n\n  #endif\n\n  #ifdef USE_CLEARCOAT_NORMALMAP\n\n    #ifdef USE_TANGENT\n\n      mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );\n\n    #else\n\n      mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );\n\n    #endif\n\n    #if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )\n\n      tbn2[0] *= faceDirection;\n      tbn2[1] *= faceDirection;\n\n    #endif\n\n  #endif\n\n  // non perturbed normal for clearcoat among others\n\n  vec3 nonPerturbedNormal = normal;\n\n  #ifdef OUTLINE\n    normal *= -1.0;\n  #endif\n\n  // #include <normal_fragment_maps>\n\n  // COMPAT: pre-r151\n  // USE_NORMALMAP_OBJECTSPACE used to be OBJECTSPACE_NORMALMAP in pre-r151\n  #if defined( USE_NORMALMAP_OBJECTSPACE ) || defined( OBJECTSPACE_NORMALMAP )\n\n    normal = texture2D( normalMap, normalMapUv ).xyz * 2.0 - 1.0; // overrides both flatShading and attribute normals\n\n    #ifdef FLIP_SIDED\n\n      normal = - normal;\n\n    #endif\n\n    #ifdef DOUBLE_SIDED\n\n      normal = normal * faceDirection;\n\n    #endif\n\n    normal = normalize( normalMatrix * normal );\n\n  // COMPAT: pre-r151\n  // USE_NORMALMAP_TANGENTSPACE used to be TANGENTSPACE_NORMALMAP in pre-r151\n  #elif defined( USE_NORMALMAP_TANGENTSPACE ) || defined( TANGENTSPACE_NORMALMAP )\n\n    vec3 mapN = texture2D( normalMap, normalMapUv ).xyz * 2.0 - 1.0;\n    mapN.xy *= normalScale;\n\n    // COMPAT: pre-r151\n    #if THREE_VRM_THREE_REVISION >= 151 || defined( USE_TANGENT )\n\n      normal = normalize( tbn * mapN );\n\n    #else\n\n      normal = perturbNormal2Arb( uv, -vViewPosition, normal, mapN, faceDirection );\n\n    #endif\n\n  #endif\n\n  // #include <emissivemap_fragment>\n  #ifdef USE_EMISSIVEMAP\n    vec2 emissiveMapUv = ( emissiveMapUvTransform * vec3( uv, 1 ) ).xy;\n    totalEmissiveRadiance *= texture2D( emissiveMap, emissiveMapUv ).rgb;\n  #endif\n\n  #ifdef DEBUG_NORMAL\n    gl_FragColor = vec4( 0.5 + 0.5 * normal, 1.0 );\n    return;\n  #endif\n\n  // -- MToon: lighting --------------------------------------------------------\n  // accumulation\n  // #include <lights_phong_fragment>\n  MToonMaterial material;\n\n  material.diffuseColor = diffuseColor.rgb;\n\n  material.shadeColor = shadeColorFactor;\n  #ifdef USE_SHADEMULTIPLYTEXTURE\n    vec2 shadeMultiplyTextureUv = ( shadeMultiplyTextureUvTransform * vec3( uv, 1 ) ).xy;\n    material.shadeColor *= texture2D( shadeMultiplyTexture, shadeMultiplyTextureUv ).rgb;\n  #endif\n\n  #if ( defined( USE_COLOR ) && !defined( IGNORE_VERTEX_COLOR ) )\n    material.shadeColor.rgb *= vColor;\n  #endif\n\n  material.shadingShift = shadingShiftFactor;\n  #ifdef USE_SHADINGSHIFTTEXTURE\n    vec2 shadingShiftTextureUv = ( shadingShiftTextureUvTransform * vec3( uv, 1 ) ).xy;\n    material.shadingShift += texture2D( shadingShiftTexture, shadingShiftTextureUv ).r * shadingShiftTextureScale;\n  #endif\n\n  // #include <lights_fragment_begin>\n\n  // MToon Specific changes:\n  // Since we want to take shadows into account of shading instead of irradiance,\n  // we had to modify the codes that multiplies the results of shadowmap into color of direct lights.\n\n  // COMPAT: pre-r156 uses a struct GeometricContext\n  #if THREE_VRM_THREE_REVISION >= 157\n    vec3 geometryPosition = - vViewPosition;\n    vec3 geometryNormal = normal;\n    vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );\n\n    vec3 geometryClearcoatNormal;\n\n    #ifdef USE_CLEARCOAT\n\n      geometryClearcoatNormal = clearcoatNormal;\n\n    #endif\n  #else\n    GeometricContext geometry;\n\n    geometry.position = - vViewPosition;\n    geometry.normal = normal;\n    geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );\n\n    #ifdef USE_CLEARCOAT\n\n      geometry.clearcoatNormal = clearcoatNormal;\n\n    #endif\n  #endif\n\n  IncidentLight directLight;\n\n  // since these variables will be used in unrolled loop, we have to define in prior\n  float shadow;\n\n  #if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\n    PointLight pointLight;\n    #if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0\n    PointLightShadow pointLightShadow;\n    #endif\n\n    #pragma unroll_loop_start\n    for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\n      pointLight = pointLights[ i ];\n\n      // COMPAT: pre-r156 uses a struct GeometricContext\n      #if THREE_VRM_THREE_REVISION >= 157\n        getPointLightInfo( pointLight, geometryPosition, directLight );\n      #else\n        getPointLightInfo( pointLight, geometry, directLight );\n      #endif\n\n      shadow = 1.0;\n      #if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )\n      pointLightShadow = pointLightShadows[ i ];\n      // COMPAT: pre-r166\n      // r166 introduced shadowIntensity\n      #if THREE_VRM_THREE_REVISION >= 166\n        shadow = all( bvec2( directLight.visible, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;\n      #else\n        shadow = all( bvec2( directLight.visible, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;\n      #endif\n      #endif\n\n      // COMPAT: pre-r156 uses a struct GeometricContext\n      #if THREE_VRM_THREE_REVISION >= 157\n        RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, shadow, reflectedLight );\n      #else\n        RE_Direct( directLight, geometry, material, shadow, reflectedLight );\n      #endif\n\n    }\n    #pragma unroll_loop_end\n\n  #endif\n\n  #if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\n    SpotLight spotLight;\n    #if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0\n    SpotLightShadow spotLightShadow;\n    #endif\n\n    #pragma unroll_loop_start\n    for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\n      spotLight = spotLights[ i ];\n\n      // COMPAT: pre-r156 uses a struct GeometricContext\n      #if THREE_VRM_THREE_REVISION >= 157\n        getSpotLightInfo( spotLight, geometryPosition, directLight );\n      #else\n        getSpotLightInfo( spotLight, geometry, directLight );\n      #endif\n\n      shadow = 1.0;\n      #if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n      spotLightShadow = spotLightShadows[ i ];\n      // COMPAT: pre-r166\n      // r166 introduced shadowIntensity\n      #if THREE_VRM_THREE_REVISION >= 166\n        shadow = all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n      #else\n        shadow = all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n      #endif\n      #endif\n\n      // COMPAT: pre-r156 uses a struct GeometricContext\n      #if THREE_VRM_THREE_REVISION >= 157\n        RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, shadow, reflectedLight );\n      #else\n        RE_Direct( directLight, geometry, material, shadow, reflectedLight );\n      #endif\n\n    }\n    #pragma unroll_loop_end\n\n  #endif\n\n  #if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\n    DirectionalLight directionalLight;\n    #if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0\n    DirectionalLightShadow directionalLightShadow;\n    #endif\n\n    #pragma unroll_loop_start\n    for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\n      directionalLight = directionalLights[ i ];\n\n      // COMPAT: pre-r156 uses a struct GeometricContext\n      #if THREE_VRM_THREE_REVISION >= 157\n        getDirectionalLightInfo( directionalLight, directLight );\n      #else\n        getDirectionalLightInfo( directionalLight, geometry, directLight );\n      #endif\n\n      shadow = 1.0;\n      #if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )\n      directionalLightShadow = directionalLightShadows[ i ];\n      // COMPAT: pre-r166\n      // r166 introduced shadowIntensity\n      #if THREE_VRM_THREE_REVISION >= 166\n        shadow = all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n      #else\n        shadow = all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n      #endif\n      #endif\n\n      // COMPAT: pre-r156 uses a struct GeometricContext\n      #if THREE_VRM_THREE_REVISION >= 157\n        RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, shadow, reflectedLight );\n      #else\n        RE_Direct( directLight, geometry, material, shadow, reflectedLight );\n      #endif\n\n    }\n    #pragma unroll_loop_end\n\n  #endif\n\n  // #if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n\n  //   RectAreaLight rectAreaLight;\n\n  //   #pragma unroll_loop_start\n  //   for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\n  //     rectAreaLight = rectAreaLights[ i ];\n  //     RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );\n\n  //   }\n  //   #pragma unroll_loop_end\n\n  // #endif\n\n  #if defined( RE_IndirectDiffuse )\n\n    vec3 iblIrradiance = vec3( 0.0 );\n\n    vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\n    // COMPAT: pre-r156 uses a struct GeometricContext\n    // COMPAT: pre-r156 doesn't have a define USE_LIGHT_PROBES\n    #if THREE_VRM_THREE_REVISION >= 157\n      #if defined( USE_LIGHT_PROBES )\n        irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );\n      #endif\n    #else\n      irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );\n    #endif\n\n    #if ( NUM_HEMI_LIGHTS > 0 )\n\n      #pragma unroll_loop_start\n      for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\n        // COMPAT: pre-r156 uses a struct GeometricContext\n        #if THREE_VRM_THREE_REVISION >= 157\n          irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );\n        #else\n          irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );\n        #endif\n\n      }\n      #pragma unroll_loop_end\n\n    #endif\n\n  #endif\n\n  // #if defined( RE_IndirectSpecular )\n\n  //   vec3 radiance = vec3( 0.0 );\n  //   vec3 clearcoatRadiance = vec3( 0.0 );\n\n  // #endif\n\n  #include <lights_fragment_maps>\n  #include <lights_fragment_end>\n\n  // modulation\n  #include <aomap_fragment>\n\n  vec3 col = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;\n\n  #ifdef DEBUG_LITSHADERATE\n    gl_FragColor = vec4( col, diffuseColor.a );\n    postCorrection();\n    return;\n  #endif\n\n  // -- MToon: rim lighting -----------------------------------------\n  vec3 viewDir = normalize( vViewPosition );\n\n  #ifndef PHYSICALLY_CORRECT_LIGHTS\n    reflectedLight.directSpecular /= PI;\n  #endif\n  vec3 rimMix = mix( vec3( 1.0 ), reflectedLight.directSpecular, 1.0 );\n\n  vec3 rim = parametricRimColorFactor * pow( saturate( 1.0 - dot( viewDir, normal ) + parametricRimLiftFactor ), parametricRimFresnelPowerFactor );\n\n  #ifdef USE_MATCAPTEXTURE\n    {\n      vec3 x = normalize( vec3( viewDir.z, 0.0, -viewDir.x ) );\n      vec3 y = cross( viewDir, x ); // guaranteed to be normalized\n      vec2 sphereUv = 0.5 + 0.5 * vec2( dot( x, normal ), -dot( y, normal ) );\n      sphereUv = ( matcapTextureUvTransform * vec3( sphereUv, 1 ) ).xy;\n      vec3 matcap = texture2D( matcapTexture, sphereUv ).rgb;\n      rim += matcapFactor * matcap;\n    }\n  #endif\n\n  #ifdef USE_RIMMULTIPLYTEXTURE\n    vec2 rimMultiplyTextureUv = ( rimMultiplyTextureUvTransform * vec3( uv, 1 ) ).xy;\n    rim *= texture2D( rimMultiplyTexture, rimMultiplyTextureUv ).rgb;\n  #endif\n\n  col += rimMix * rim;\n\n  // -- MToon: Emission --------------------------------------------------------\n  col += totalEmissiveRadiance;\n\n  // #include <envmap_fragment>\n\n  // -- Almost done! -----------------------------------------------------------\n  #if defined( OUTLINE )\n    col = outlineColorFactor.rgb * mix( vec3( 1.0 ), col, outlineLightingMixFactor );\n  #endif\n\n  #ifdef OPAQUE\n    diffuseColor.a = 1.0;\n  #endif\n\n  gl_FragColor = vec4( col, diffuseColor.a );\n  postCorrection();\n}\n";
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
   * Readonly boolean that indicates this is a [[MToonMaterial]].
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
import * as THREE18 from "three";
var __defProp2 = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols2 = Object.getOwnPropertySymbols;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __propIsEnum2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp2.call(b, prop))
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
import * as THREE19 from "three";
import * as THREE33 from "three";
import * as THREE23 from "three";
import * as THREE43 from "three";
import * as THREE53 from "three";
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
import * as THREE72 from "three";
import * as THREE20 from "three";
import * as THREE24 from "three";
import * as THREE34 from "three";
import * as THREE44 from "three";
import * as THREE54 from "three";
import * as THREE62 from "three";
import * as THREE92 from "three";
import * as THREE82 from "three";
import * as THREE102 from "three";
import * as THREE132 from "three";
import * as THREE122 from "three";
import * as THREE112 from "three";
import * as THREE142 from "three";
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
   * You might want to call [[VRMSpringBoneManager.reset]] instead.
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
   * You might want to call [[VRMSpringBoneManager.update]] instead.
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
            `VRMSpringBoneLoaderPlugin: The collider #${iCollider} attempted to use the node #${schemaCollider.node} but not found`
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
        throw new Error(`VRMSpringBoneLoaderPlugin: The collider #${iCollider} has no valid shape`);
      });
      const colliderGroups = (_d = extension.colliderGroups) == null ? void 0 : _d.map(
        (schemaColliderGroup, iColliderGroup) => {
          var _a2;
          const cols = ((_a2 = schemaColliderGroup.colliders) != null ? _a2 : []).flatMap((iCollider) => {
            const col = colliders == null ? void 0 : colliders[iCollider];
            if (col == null) {
              console.warn(
                `VRMSpringBoneLoaderPlugin: The colliderGroup #${iColliderGroup} attempted to use a collider #${iCollider} but not found`
              );
              return [];
            }
            return col;
          });
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
            throw new Error(
              `VRMSpringBoneLoaderPlugin: The spring #${iSpring} attempted to use a colliderGroup ${iColliderGroup} but not found`
            );
          }
          return group;
        });
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
        (schemaColliderGroup) => {
          var _a2;
          const node = threeNodes[schemaColliderGroup.node];
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
              throw new Error(
                `VRMSpringBoneLoaderPlugin: The spring #${iBoneGroup} attempted to use a colliderGroup ${iColliderGroup} but not found`
              );
            }
            return group;
          });
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
import * as THREE21 from "three";
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
import * as THREE25 from "three";
function combineSkeletons(root) {
  var _a;
  const skinnedMeshes = collectSkinnedMeshes(root);
  const attributeUsedIndexSetMap = /* @__PURE__ */ new Map();
  for (const mesh of skinnedMeshes) {
    const geometry = mesh.geometry;
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
    const newSkeleton = new THREE25.Skeleton(newBones, newBoneInverses);
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
      mesh.bind(newSkeleton, new THREE25.Matrix4());
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
      const index = skinIndexAttr.getComponent(i, j);
      const weight = skinWeightAttr.getComponent(i, j);
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
      const oldIndex = attribute.getComponent(i, j);
      const newIndex = oldToNew.get(oldIndex);
      attribute.setComponent(i, j, newIndex);
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
import * as THREE26 from "three";
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
        const oldIndex = attribute.getComponent(i, j);
        let newIndex = oldToNew.get(oldIndex);
        if (newIndex == null) {
          newIndex = oldToNew.size;
          oldToNew.set(oldIndex, newIndex);
          newToOld.set(newIndex, oldIndex);
        }
        attribute.setComponent(i, j, newIndex);
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
    const skeleton = new THREE26.Skeleton(bones, boneInverses);
    mesh.bind(skeleton, new THREE26.Matrix4());
  }
}

// src/VRMUtils/removeUnnecessaryVertices.ts
import * as THREE27 from "three";
import { BufferAttribute as BufferAttribute9 } from "three";
function removeUnnecessaryVertices(root) {
  const geometryMap = /* @__PURE__ */ new Map();
  root.traverse((obj) => {
    var _a, _b, _c, _d;
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
    const vertexCount = Object.values(geometry.attributes)[0].count;
    const vertexInUse = new Array(vertexCount);
    let verticesUsed = 0;
    const originalIndexArray = originalIndex.array;
    for (let i = 0; i < originalIndexArray.length; i++) {
      const index = originalIndexArray[i];
      if (!vertexInUse[index]) {
        vertexInUse[index] = true;
        verticesUsed++;
      }
    }
    if (verticesUsed === vertexCount) {
      return;
    }
    const originalIndexNewIndexMap = [];
    const newIndexOriginalIndexMap = [];
    let indexHead = 0;
    for (let i = 0; i < vertexInUse.length; i++) {
      if (vertexInUse[i]) {
        const newIndex = indexHead++;
        originalIndexNewIndexMap[i] = newIndex;
        newIndexOriginalIndexMap[newIndex] = i;
      }
    }
    const newGeometry = new THREE27.BufferGeometry();
    newGeometry.name = geometry.name;
    newGeometry.morphTargetsRelative = geometry.morphTargetsRelative;
    geometry.groups.forEach((group) => {
      newGeometry.addGroup(group.start, group.count, group.materialIndex);
    });
    newGeometry.boundingBox = (_b = (_a = geometry.boundingBox) == null ? void 0 : _a.clone()) != null ? _b : null;
    newGeometry.boundingSphere = (_d = (_c = geometry.boundingSphere) == null ? void 0 : _c.clone()) != null ? _d : null;
    newGeometry.setDrawRange(geometry.drawRange.start, geometry.drawRange.count);
    newGeometry.userData = geometry.userData;
    geometryMap.set(geometry, newGeometry);
    {
      const originalIndexArray2 = originalIndex.array;
      const newIndexArray = new originalIndexArray2.constructor(originalIndexArray2.length);
      for (let i = 0; i < originalIndexArray2.length; i++) {
        const originalIndex2 = originalIndexArray2[i];
        const newIndex = originalIndexNewIndexMap[originalIndex2];
        newIndexArray[i] = newIndex;
      }
      newGeometry.setIndex(new BufferAttribute9(newIndexArray, 1, false));
    }
    Object.keys(geometry.attributes).forEach((attributeName) => {
      const originalAttribute = geometry.attributes[attributeName];
      if (originalAttribute.isInterleavedBufferAttribute) {
        throw new Error("removeUnnecessaryVertices: InterleavedBufferAttribute is not supported");
      }
      const originalAttributeArray = originalAttribute.array;
      const { itemSize, normalized } = originalAttribute;
      const newAttributeArray = new originalAttributeArray.constructor(
        newIndexOriginalIndexMap.length * itemSize
      );
      newIndexOriginalIndexMap.forEach((originalIndex2, i) => {
        for (let j = 0; j < itemSize; j++) {
          newAttributeArray[i * itemSize + j] = originalAttributeArray[originalIndex2 * itemSize + j];
        }
      });
      newGeometry.setAttribute(attributeName, new BufferAttribute9(newAttributeArray, itemSize, normalized));
    });
    let isNullMorph = true;
    Object.keys(geometry.morphAttributes).forEach((attributeName) => {
      newGeometry.morphAttributes[attributeName] = [];
      const morphs = geometry.morphAttributes[attributeName];
      for (let iMorph = 0; iMorph < morphs.length; iMorph++) {
        const originalAttribute = morphs[iMorph];
        if (originalAttribute.isInterleavedBufferAttribute) {
          throw new Error("removeUnnecessaryVertices: InterleavedBufferAttribute is not supported");
        }
        const originalAttributeArray = originalAttribute.array;
        const { itemSize, normalized } = originalAttribute;
        const newAttributeArray = new originalAttributeArray.constructor(
          newIndexOriginalIndexMap.length * itemSize
        );
        newIndexOriginalIndexMap.forEach((originalIndex2, i) => {
          for (let j = 0; j < itemSize; j++) {
            newAttributeArray[i * itemSize + j] = originalAttributeArray[originalIndex2 * itemSize + j];
          }
        });
        isNullMorph = isNullMorph && newAttributeArray.every((v) => v === 0);
        newGeometry.morphAttributes[attributeName][iMorph] = new BufferAttribute9(
          newAttributeArray,
          itemSize,
          normalized
        );
      }
    });
    if (isNullMorph) {
      newGeometry.morphAttributes = {};
    }
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
export {
  MToonMaterial,
  MToonMaterialDebugMode,
  MToonMaterialLoaderPlugin,
  MToonMaterialOutlineWidthMode,
  VRM,
  VRMAimConstraint,
  VRMCore,
  VRMCoreLoaderPlugin,
  VRMExpression,
  VRMExpressionLoaderPlugin,
  VRMExpressionManager,
  VRMExpressionMaterialColorBind,
  VRMExpressionMaterialColorType,
  VRMExpressionMorphTargetBind,
  VRMExpressionOverrideType,
  VRMExpressionPresetName,
  VRMExpressionTextureTransformBind,
  VRMFirstPerson,
  VRMFirstPersonLoaderPlugin,
  VRMFirstPersonMeshAnnotationType,
  VRMHumanBoneList,
  VRMHumanBoneName,
  VRMHumanBoneParentMap,
  VRMHumanoid,
  VRMHumanoidHelper,
  VRMHumanoidLoaderPlugin,
  VRMLoaderPlugin,
  VRMLookAt,
  VRMLookAtBoneApplier,
  VRMLookAtExpressionApplier,
  VRMLookAtHelper,
  VRMLookAtLoaderPlugin,
  VRMLookAtRangeMap,
  VRMLookAtTypeName,
  VRMMetaLoaderPlugin,
  VRMNodeConstraint,
  VRMNodeConstraintHelper,
  VRMNodeConstraintLoaderPlugin,
  VRMNodeConstraintManager,
  VRMRequiredHumanBoneName,
  VRMRollConstraint,
  VRMRotationConstraint,
  VRMSpringBoneCollider,
  VRMSpringBoneColliderHelper,
  VRMSpringBoneColliderShape,
  VRMSpringBoneColliderShapeCapsule,
  VRMSpringBoneColliderShapePlane,
  VRMSpringBoneColliderShapeSphere,
  VRMSpringBoneJoint,
  VRMSpringBoneJointHelper,
  VRMSpringBoneLoaderPlugin,
  VRMSpringBoneManager,
  VRMUtils
};
/*!
 * @pixiv/three-vrm-core v3.3.4
 * The implementation of core features of VRM, for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2025 pixiv Inc.
 * @pixiv/three-vrm-core is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
/*!
 * @pixiv/three-vrm-materials-mtoon v3.3.4
 * MToon (toon material) module for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2025 pixiv Inc.
 * @pixiv/three-vrm-materials-mtoon is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
/*!
 * @pixiv/three-vrm-materials-hdr-emissive-multiplier v3.3.4
 * Support VRMC_hdr_emissiveMultiplier for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2025 pixiv Inc.
 * @pixiv/three-vrm-materials-hdr-emissive-multiplier is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
/*!
 * @pixiv/three-vrm-materials-v0compat v3.3.4
 * VRM0.0 materials compatibility layer plugin for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2025 pixiv Inc.
 * @pixiv/three-vrm-materials-v0compat is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
/*!
 * @pixiv/three-vrm-node-constraint v3.3.4
 * Node constraint module for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2025 pixiv Inc.
 * @pixiv/three-vrm-node-constraint is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
/*!
 * @pixiv/three-vrm-springbone v3.3.4
 * Spring bone module for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2025 pixiv Inc.
 * @pixiv/three-vrm-springbone is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL2V4cHJlc3Npb25zL1ZSTUV4cHJlc3Npb24udHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL2V4cHJlc3Npb25zL1ZSTUV4cHJlc3Npb25Mb2FkZXJQbHVnaW4udHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL3V0aWxzL2dsdGZFeHRyYWN0UHJpbWl0aXZlc0Zyb21Ob2RlLnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9leHByZXNzaW9ucy9WUk1FeHByZXNzaW9uUHJlc2V0TmFtZS50cyIsICIuLi8uLi90aHJlZS12cm0tY29yZS9zcmMvdXRpbHMvc2F0dXJhdGUudHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL2V4cHJlc3Npb25zL1ZSTUV4cHJlc3Npb25NYW5hZ2VyLnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9leHByZXNzaW9ucy9WUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGUudHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL2V4cHJlc3Npb25zL1ZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yQmluZC50cyIsICIuLi8uLi90aHJlZS12cm0tY29yZS9zcmMvZXhwcmVzc2lvbnMvVlJNRXhwcmVzc2lvbk1vcnBoVGFyZ2V0QmluZC50cyIsICIuLi8uLi90aHJlZS12cm0tY29yZS9zcmMvZXhwcmVzc2lvbnMvVlJNRXhwcmVzc2lvblRleHR1cmVUcmFuc2Zvcm1CaW5kLnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9leHByZXNzaW9ucy9WUk1FeHByZXNzaW9uT3ZlcnJpZGVUeXBlLnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9maXJzdFBlcnNvbi9WUk1GaXJzdFBlcnNvbi50cyIsICIuLi8uLi90aHJlZS12cm0tY29yZS9zcmMvZmlyc3RQZXJzb24vVlJNRmlyc3RQZXJzb25Mb2FkZXJQbHVnaW4udHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL2ZpcnN0UGVyc29uL1ZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb25UeXBlLnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9odW1hbm9pZC9oZWxwZXJzL1ZSTUh1bWFub2lkSGVscGVyLnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9odW1hbm9pZC9WUk1IdW1hbkJvbmVMaXN0LnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9odW1hbm9pZC9WUk1IdW1hbkJvbmVOYW1lLnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9odW1hbm9pZC9WUk1IdW1hbkJvbmVQYXJlbnRNYXAudHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL2h1bWFub2lkL1ZSTVJpZy50cyIsICIuLi8uLi90aHJlZS12cm0tY29yZS9zcmMvdXRpbHMvcXVhdEludmVydENvbXBhdC50cyIsICIuLi8uLi90aHJlZS12cm0tY29yZS9zcmMvaHVtYW5vaWQvVlJNSHVtYW5vaWRSaWcudHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL2h1bWFub2lkL1ZSTUh1bWFub2lkLnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9odW1hbm9pZC9WUk1SZXF1aXJlZEh1bWFuQm9uZU5hbWUudHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL2h1bWFub2lkL1ZSTUh1bWFub2lkTG9hZGVyUGx1Z2luLnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9sb29rQXQvaGVscGVycy9WUk1Mb29rQXRIZWxwZXIudHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL2xvb2tBdC9oZWxwZXJzL3V0aWxzL0ZhbkJ1ZmZlckdlb21ldHJ5LnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9sb29rQXQvaGVscGVycy91dGlscy9MaW5lQW5kU3BoZXJlQnVmZmVyR2VvbWV0cnkudHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL2xvb2tBdC9WUk1Mb29rQXQudHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL3V0aWxzL2dldFdvcmxkUXVhdGVybmlvbkxpdGUudHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL2xvb2tBdC91dGlscy9jYWxjQXppbXV0aEFsdGl0dWRlLnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9sb29rQXQvdXRpbHMvc2FuaXRpemVBbmdsZS50cyIsICIuLi8uLi90aHJlZS12cm0tY29yZS9zcmMvbG9va0F0L1ZSTUxvb2tBdEJvbmVBcHBsaWVyLnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9sb29rQXQvVlJNTG9va0F0RXhwcmVzc2lvbkFwcGxpZXIudHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL2xvb2tBdC9WUk1Mb29rQXRSYW5nZU1hcC50cyIsICIuLi8uLi90aHJlZS12cm0tY29yZS9zcmMvbG9va0F0L1ZSTUxvb2tBdExvYWRlclBsdWdpbi50cyIsICIuLi8uLi90aHJlZS12cm0tY29yZS9zcmMvbG9va0F0L1ZSTUxvb2tBdFR5cGVOYW1lLnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9tZXRhL1ZSTU1ldGFMb2FkZXJQbHVnaW4udHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL3V0aWxzL3Jlc29sdmVVUkwudHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL1ZSTUNvcmUudHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL1ZSTUNvcmVMb2FkZXJQbHVnaW4udHMiLCAiLi4vc3JjL1ZSTS50cyIsICIuLi8uLi90aHJlZS12cm0tbWF0ZXJpYWxzLW10b29uL3NyYy9NVG9vbk1hdGVyaWFsTG9hZGVyUGx1Z2luLnRzIiwgIi4uLy4uL3RocmVlLXZybS1tYXRlcmlhbHMtbXRvb24vc3JjL0dMVEZNVG9vbk1hdGVyaWFsUGFyYW1zQXNzaWduSGVscGVyLnRzIiwgIi4uLy4uL3RocmVlLXZybS1tYXRlcmlhbHMtbXRvb24vc3JjL3V0aWxzL3NldFRleHR1cmVDb2xvclNwYWNlLnRzIiwgIi4uLy4uL3RocmVlLXZybS1tYXRlcmlhbHMtbXRvb24vc3JjL01Ub29uTWF0ZXJpYWwudHMiLCAiLi4vLi4vdGhyZWUtdnJtLW1hdGVyaWFscy1tdG9vbi9zcmMvc2hhZGVycy9tdG9vbi52ZXJ0IiwgIi4uLy4uL3RocmVlLXZybS1tYXRlcmlhbHMtbXRvb24vc3JjL3NoYWRlcnMvbXRvb24uZnJhZyIsICIuLi8uLi90aHJlZS12cm0tbWF0ZXJpYWxzLW10b29uL3NyYy9NVG9vbk1hdGVyaWFsRGVidWdNb2RlLnRzIiwgIi4uLy4uL3RocmVlLXZybS1tYXRlcmlhbHMtbXRvb24vc3JjL01Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlLnRzIiwgIi4uLy4uL3RocmVlLXZybS1tYXRlcmlhbHMtbXRvb24vc3JjL3V0aWxzL2dldFRleHR1cmVDb2xvclNwYWNlLnRzIiwgIi4uLy4uL3RocmVlLXZybS1tYXRlcmlhbHMtaGRyLWVtaXNzaXZlLW11bHRpcGxpZXIvc3JjL1ZSTU1hdGVyaWFsc0hEUkVtaXNzaXZlTXVsdGlwbGllckxvYWRlclBsdWdpbi50cyIsICIuLi8uLi90aHJlZS12cm0tbWF0ZXJpYWxzLXYwY29tcGF0L3NyYy9WUk1NYXRlcmlhbHNWMENvbXBhdFBsdWdpbi50cyIsICIuLi8uLi90aHJlZS12cm0tbWF0ZXJpYWxzLXYwY29tcGF0L3NyYy91dGlscy9nYW1tYUVPVEYudHMiLCAiLi4vLi4vdGhyZWUtdnJtLW5vZGUtY29uc3RyYWludC9zcmMvaGVscGVycy9WUk1Ob2RlQ29uc3RyYWludEhlbHBlci50cyIsICIuLi8uLi90aHJlZS12cm0tbm9kZS1jb25zdHJhaW50L3NyYy9WUk1BaW1Db25zdHJhaW50LnRzIiwgIi4uLy4uL3RocmVlLXZybS1ub2RlLWNvbnN0cmFpbnQvc3JjL3V0aWxzL2RlY29tcG9zZVBvc2l0aW9uLnRzIiwgIi4uLy4uL3RocmVlLXZybS1ub2RlLWNvbnN0cmFpbnQvc3JjL3V0aWxzL2RlY29tcG9zZVJvdGF0aW9uLnRzIiwgIi4uLy4uL3RocmVlLXZybS1ub2RlLWNvbnN0cmFpbnQvc3JjL3V0aWxzL3F1YXRJbnZlcnRDb21wYXQudHMiLCAiLi4vLi4vdGhyZWUtdnJtLW5vZGUtY29uc3RyYWludC9zcmMvVlJNTm9kZUNvbnN0cmFpbnQudHMiLCAiLi4vLi4vdGhyZWUtdnJtLW5vZGUtY29uc3RyYWludC9zcmMvdXRpbHMvdHJhdmVyc2VBbmNlc3RvcnNGcm9tUm9vdC50cyIsICIuLi8uLi90aHJlZS12cm0tbm9kZS1jb25zdHJhaW50L3NyYy9WUk1Ob2RlQ29uc3RyYWludE1hbmFnZXIudHMiLCAiLi4vLi4vdGhyZWUtdnJtLW5vZGUtY29uc3RyYWludC9zcmMvVlJNUm90YXRpb25Db25zdHJhaW50LnRzIiwgIi4uLy4uL3RocmVlLXZybS1ub2RlLWNvbnN0cmFpbnQvc3JjL1ZSTVJvbGxDb25zdHJhaW50LnRzIiwgIi4uLy4uL3RocmVlLXZybS1ub2RlLWNvbnN0cmFpbnQvc3JjL1ZSTU5vZGVDb25zdHJhaW50TG9hZGVyUGx1Z2luLnRzIiwgIi4uLy4uL3RocmVlLXZybS1zcHJpbmdib25lL3NyYy9oZWxwZXJzL1ZSTVNwcmluZ0JvbmVDb2xsaWRlckhlbHBlci50cyIsICIuLi8uLi90aHJlZS12cm0tc3ByaW5nYm9uZS9zcmMvVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVDYXBzdWxlLnRzIiwgIi4uLy4uL3RocmVlLXZybS1zcHJpbmdib25lL3NyYy9WUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZS50cyIsICIuLi8uLi90aHJlZS12cm0tc3ByaW5nYm9uZS9zcmMvVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVQbGFuZS50cyIsICIuLi8uLi90aHJlZS12cm0tc3ByaW5nYm9uZS9zcmMvVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVTcGhlcmUudHMiLCAiLi4vLi4vdGhyZWUtdnJtLXNwcmluZ2JvbmUvc3JjL2hlbHBlcnMvdXRpbHMvQ29sbGlkZXJTaGFwZUNhcHN1bGVCdWZmZXJHZW9tZXRyeS50cyIsICIuLi8uLi90aHJlZS12cm0tc3ByaW5nYm9uZS9zcmMvaGVscGVycy91dGlscy9Db2xsaWRlclNoYXBlUGxhbmVCdWZmZXJHZW9tZXRyeS50cyIsICIuLi8uLi90aHJlZS12cm0tc3ByaW5nYm9uZS9zcmMvaGVscGVycy91dGlscy9Db2xsaWRlclNoYXBlU3BoZXJlQnVmZmVyR2VvbWV0cnkudHMiLCAiLi4vLi4vdGhyZWUtdnJtLXNwcmluZ2JvbmUvc3JjL2hlbHBlcnMvVlJNU3ByaW5nQm9uZUpvaW50SGVscGVyLnRzIiwgIi4uLy4uL3RocmVlLXZybS1zcHJpbmdib25lL3NyYy9oZWxwZXJzL3V0aWxzL1NwcmluZ0JvbmVCdWZmZXJHZW9tZXRyeS50cyIsICIuLi8uLi90aHJlZS12cm0tc3ByaW5nYm9uZS9zcmMvVlJNU3ByaW5nQm9uZUNvbGxpZGVyLnRzIiwgIi4uLy4uL3RocmVlLXZybS1zcHJpbmdib25lL3NyYy9WUk1TcHJpbmdCb25lSm9pbnQudHMiLCAiLi4vLi4vdGhyZWUtdnJtLXNwcmluZ2JvbmUvc3JjL3V0aWxzL01hdHJpeDRJbnZlcnNlQ2FjaGUudHMiLCAiLi4vLi4vdGhyZWUtdnJtLXNwcmluZ2JvbmUvc3JjL3V0aWxzL21hdDRJbnZlcnRDb21wYXQudHMiLCAiLi4vLi4vdGhyZWUtdnJtLXNwcmluZ2JvbmUvc3JjL1ZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW4udHMiLCAiLi4vLi4vdGhyZWUtdnJtLXNwcmluZ2JvbmUvc3JjL3V0aWxzL3RyYXZlcnNlQW5jZXN0b3JzRnJvbVJvb3QudHMiLCAiLi4vLi4vdGhyZWUtdnJtLXNwcmluZ2JvbmUvc3JjL3V0aWxzL3RyYXZlcnNlQ2hpbGRyZW5VbnRpbENvbmRpdGlvbk1ldC50cyIsICIuLi8uLi90aHJlZS12cm0tc3ByaW5nYm9uZS9zcmMvdXRpbHMvbG93ZXN0Q29tbW9uQW5jZXN0b3IudHMiLCAiLi4vLi4vdGhyZWUtdnJtLXNwcmluZ2JvbmUvc3JjL1ZSTVNwcmluZ0JvbmVNYW5hZ2VyLnRzIiwgIi4uL3NyYy9WUk1Mb2FkZXJQbHVnaW4udHMiLCAiLi4vc3JjL1ZSTVV0aWxzL2NvbWJpbmVNb3JwaHMudHMiLCAiLi4vc3JjL1ZSTVV0aWxzL2NvbWJpbmVTa2VsZXRvbnMudHMiLCAiLi4vc3JjL1ZSTVV0aWxzL2RlZXBEaXNwb3NlLnRzIiwgIi4uL3NyYy9WUk1VdGlscy9yZW1vdmVVbm5lY2Vzc2FyeUpvaW50cy50cyIsICIuLi9zcmMvVlJNVXRpbHMvcmVtb3ZlVW5uZWNlc3NhcnlWZXJ0aWNlcy50cyIsICIuLi9zcmMvVlJNVXRpbHMvcm90YXRlVlJNMC50cyIsICIuLi9zcmMvVlJNVXRpbHMvaW5kZXgudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTUV4cHJlc3Npb25CaW5kIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uQmluZCc7XG5pbXBvcnQgdHlwZSB7IFZSTUV4cHJlc3Npb25PdmVycmlkZVR5cGUgfSBmcm9tICcuL1ZSTUV4cHJlc3Npb25PdmVycmlkZVR5cGUnO1xuaW1wb3J0IHR5cGUgeyBWUk1FeHByZXNzaW9uTWFuYWdlciB9IGZyb20gJy4vVlJNRXhwcmVzc2lvbk1hbmFnZXInO1xuXG4vLyBhbmltYXRpb25NaXhlciBcdTMwNkVcdTc2RTNcdTg5OTZcdTVCRkVcdThDNjFcdTMwNkZcdTMwMDFTY2VuZSBcdTMwNkVcdTRFMkRcdTMwNkJcdTUxNjVcdTMwNjNcdTMwNjZcdTMwNDRcdTMwOEJcdTVGQzVcdTg5ODFcdTMwNENcdTMwNDJcdTMwOEJcdTMwMDJcbi8vIFx1MzA1RFx1MzA2RVx1MzA1Rlx1MzA4MVx1MzAwMVx1ODg2OFx1NzkzQVx1MzBBQVx1MzBENlx1MzBCOFx1MzBBN1x1MzBBRlx1MzBDOFx1MzA2N1x1MzA2Rlx1MzA2QVx1MzA0NFx1MzA1MVx1MzA4Q1x1MzA2OVx1MzAwMU9iamVjdDNEIFx1MzA5Mlx1N0Q5OVx1NjI3Rlx1MzA1N1x1MzA2NiBTY2VuZSBcdTMwNkJcdTYyOTVcdTUxNjVcdTMwNjdcdTMwNERcdTMwOEJcdTMwODhcdTMwNDZcdTMwNkJcdTMwNTlcdTMwOEJcdTMwMDJcbmV4cG9ydCBjbGFzcyBWUk1FeHByZXNzaW9uIGV4dGVuZHMgVEhSRUUuT2JqZWN0M0Qge1xuICAvKipcbiAgICogTmFtZSBvZiB0aGlzIGV4cHJlc3Npb24uXG4gICAqIERpc3Rpbmd1aXNoZWQgd2l0aCBgbmFtZWAgc2luY2UgYG5hbWVgIHdpbGwgYmUgY29uZmxpY3RlZCB3aXRoIE9iamVjdDNELlxuICAgKi9cbiAgcHVibGljIGV4cHJlc3Npb25OYW1lOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50IHdlaWdodCBvZiB0aGUgZXhwcmVzc2lvbi5cbiAgICpcbiAgICogWW91IHVzdWFsbHkgd2FudCB0byBzZXQgdGhlIHdlaWdodCB2aWEge0BsaW5rIFZSTUV4cHJlc3Npb25NYW5hZ2VyLnNldFZhbHVlfS5cbiAgICpcbiAgICogSXQgbWlnaHQgYWxzbyBiZSBjb250cm9sbGVkIGJ5IHRoZSBUaHJlZS5qcyBhbmltYXRpb24gc3lzdGVtLlxuICAgKi9cbiAgcHVibGljIHdlaWdodCA9IDAuMDtcblxuICAvKipcbiAgICogSW50ZXJwcmV0IHZhbHVlcyBncmVhdGVyIHRoYW4gMC41IGFzIDEuMCwgb3J0aGVyd2lzZSAwLjAuXG4gICAqL1xuICBwdWJsaWMgaXNCaW5hcnkgPSBmYWxzZTtcblxuICAvKipcbiAgICogU3BlY2lmeSBob3cgdGhlIGV4cHJlc3Npb24gb3ZlcnJpZGVzIGJsaW5rIGV4cHJlc3Npb25zLlxuICAgKi9cbiAgcHVibGljIG92ZXJyaWRlQmxpbms6IFZSTUV4cHJlc3Npb25PdmVycmlkZVR5cGUgPSAnbm9uZSc7XG5cbiAgLyoqXG4gICAqIFNwZWNpZnkgaG93IHRoZSBleHByZXNzaW9uIG92ZXJyaWRlcyBsb29rQXQgZXhwcmVzc2lvbnMuXG4gICAqL1xuICBwdWJsaWMgb3ZlcnJpZGVMb29rQXQ6IFZSTUV4cHJlc3Npb25PdmVycmlkZVR5cGUgPSAnbm9uZSc7XG5cbiAgLyoqXG4gICAqIFNwZWNpZnkgaG93IHRoZSBleHByZXNzaW9uIG92ZXJyaWRlcyBtb3V0aCBleHByZXNzaW9ucy5cbiAgICovXG4gIHB1YmxpYyBvdmVycmlkZU1vdXRoOiBWUk1FeHByZXNzaW9uT3ZlcnJpZGVUeXBlID0gJ25vbmUnO1xuXG4gIC8qKlxuICAgKiBCaW5kcyB0aGF0IHRoaXMgZXhwcmVzc2lvbiBpbmZsdWVuY2VzLlxuICAgKi9cbiAgcHJpdmF0ZSBfYmluZHM6IFZSTUV4cHJlc3Npb25CaW5kW10gPSBbXTtcblxuICAvKipcbiAgICogQmluZHMgdGhhdCB0aGlzIGV4cHJlc3Npb24gaW5mbHVlbmNlcy5cbiAgICovXG4gIHB1YmxpYyBnZXQgYmluZHMoKTogcmVhZG9ubHkgVlJNRXhwcmVzc2lvbkJpbmRbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2JpbmRzO1xuICB9XG5cbiAgb3ZlcnJpZGUgcmVhZG9ubHkgdHlwZTogc3RyaW5nIHwgJ1ZSTUV4cHJlc3Npb24nO1xuXG4gIC8qKlxuICAgKiBBIHZhbHVlIHJlcHJlc2VudHMgaG93IG11Y2ggaXQgc2hvdWxkIG92ZXJyaWRlIGJsaW5rIGV4cHJlc3Npb25zLlxuICAgKiBgMC4wYCA9PSBubyBvdmVycmlkZSBhdCBhbGwsIGAxLjBgID09IGNvbXBsZXRlbHkgYmxvY2sgdGhlIGV4cHJlc3Npb25zLlxuICAgKi9cbiAgcHVibGljIGdldCBvdmVycmlkZUJsaW5rQW1vdW50KCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMub3ZlcnJpZGVCbGluayA9PT0gJ2Jsb2NrJykge1xuICAgICAgcmV0dXJuIDAuMCA8IHRoaXMub3V0cHV0V2VpZ2h0ID8gMS4wIDogMC4wO1xuICAgIH0gZWxzZSBpZiAodGhpcy5vdmVycmlkZUJsaW5rID09PSAnYmxlbmQnKSB7XG4gICAgICByZXR1cm4gdGhpcy5vdXRwdXRXZWlnaHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAwLjA7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEEgdmFsdWUgcmVwcmVzZW50cyBob3cgbXVjaCBpdCBzaG91bGQgb3ZlcnJpZGUgbG9va0F0IGV4cHJlc3Npb25zLlxuICAgKiBgMC4wYCA9PSBubyBvdmVycmlkZSBhdCBhbGwsIGAxLjBgID09IGNvbXBsZXRlbHkgYmxvY2sgdGhlIGV4cHJlc3Npb25zLlxuICAgKi9cbiAgcHVibGljIGdldCBvdmVycmlkZUxvb2tBdEFtb3VudCgpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLm92ZXJyaWRlTG9va0F0ID09PSAnYmxvY2snKSB7XG4gICAgICByZXR1cm4gMC4wIDwgdGhpcy5vdXRwdXRXZWlnaHQgPyAxLjAgOiAwLjA7XG4gICAgfSBlbHNlIGlmICh0aGlzLm92ZXJyaWRlTG9va0F0ID09PSAnYmxlbmQnKSB7XG4gICAgICByZXR1cm4gdGhpcy5vdXRwdXRXZWlnaHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAwLjA7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEEgdmFsdWUgcmVwcmVzZW50cyBob3cgbXVjaCBpdCBzaG91bGQgb3ZlcnJpZGUgbW91dGggZXhwcmVzc2lvbnMuXG4gICAqIGAwLjBgID09IG5vIG92ZXJyaWRlIGF0IGFsbCwgYDEuMGAgPT0gY29tcGxldGVseSBibG9jayB0aGUgZXhwcmVzc2lvbnMuXG4gICAqL1xuICBwdWJsaWMgZ2V0IG92ZXJyaWRlTW91dGhBbW91bnQoKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5vdmVycmlkZU1vdXRoID09PSAnYmxvY2snKSB7XG4gICAgICByZXR1cm4gMC4wIDwgdGhpcy5vdXRwdXRXZWlnaHQgPyAxLjAgOiAwLjA7XG4gICAgfSBlbHNlIGlmICh0aGlzLm92ZXJyaWRlTW91dGggPT09ICdibGVuZCcpIHtcbiAgICAgIHJldHVybiB0aGlzLm91dHB1dFdlaWdodDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIDAuMDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQW4gb3V0cHV0IHdlaWdodCBvZiB0aGlzIGV4cHJlc3Npb24sIGNvbnNpZGVyaW5nIHRoZSB7QGxpbmsgaXNCaW5hcnl9LlxuICAgKi9cbiAgcHVibGljIGdldCBvdXRwdXRXZWlnaHQoKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5pc0JpbmFyeSkge1xuICAgICAgcmV0dXJuIHRoaXMud2VpZ2h0ID4gMC41ID8gMS4wIDogMC4wO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLndlaWdodDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGV4cHJlc3Npb25OYW1lOiBzdHJpbmcpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5uYW1lID0gYFZSTUV4cHJlc3Npb25fJHtleHByZXNzaW9uTmFtZX1gO1xuICAgIHRoaXMuZXhwcmVzc2lvbk5hbWUgPSBleHByZXNzaW9uTmFtZTtcblxuICAgIC8vIHRyYXZlcnNlIFx1NjY0Mlx1MzA2RVx1NjU1MVx1NkUwOFx1NjI0Qlx1NkJCNVx1MzA2OFx1MzA1N1x1MzA2NiBPYmplY3QzRCBcdTMwNjdcdTMwNkZcdTMwNkFcdTMwNDRcdTMwNTNcdTMwNjhcdTMwOTJcdTY2MEVcdTc5M0FcdTMwNTdcdTMwNjZcdTMwNEFcdTMwNEZcbiAgICB0aGlzLnR5cGUgPSAnVlJNRXhwcmVzc2lvbic7XG5cbiAgICAvLyBcdTg4NjhcdTc5M0FcdTc2RUVcdTc2ODRcdTMwNkVcdTMwQUFcdTMwRDZcdTMwQjhcdTMwQTdcdTMwQUZcdTMwQzhcdTMwNjdcdTMwNkZcdTMwNkFcdTMwNDRcdTMwNkVcdTMwNjdcdTMwMDFcdThDQTBcdTgzNzdcdThFRkRcdTZFMUJcdTMwNkVcdTMwNUZcdTMwODFcdTMwNkIgdmlzaWJsZSBcdTMwOTIgZmFsc2UgXHUzMDZCXHUzMDU3XHUzMDY2XHUzMDRBXHUzMDRGXHUzMDAyXG4gICAgLy8gXHUzMDUzXHUzMDhDXHUzMDZCXHUzMDg4XHUzMDhBXHUzMDAxXHUzMDUzXHUzMDZFXHUzMEE0XHUzMEYzXHUzMEI5XHUzMEJGXHUzMEYzXHUzMEI5XHUzMDZCXHU1QkZFXHUzMDU5XHUzMDhCXHU2QkNFXHUzMEQ1XHUzMEVDXHUzMEZDXHUzMEUwXHUzMDZFIG1hdHJpeCBcdTgxRUFcdTUyRDVcdThBMDhcdTdCOTdcdTMwOTJcdTc3MDFcdTc1NjVcdTMwNjdcdTMwNERcdTMwOEJcdTMwMDJcbiAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYW4gZXhwcmVzc2lvbiBiaW5kIHRvIHRoZSBleHByZXNzaW9uLlxuICAgKlxuICAgKiBAcGFyYW0gYmluZCBBIGJpbmQgdG8gYWRkXG4gICAqL1xuICBwdWJsaWMgYWRkQmluZChiaW5kOiBWUk1FeHByZXNzaW9uQmluZCk6IHZvaWQge1xuICAgIHRoaXMuX2JpbmRzLnB1c2goYmluZCk7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlIGFuIGV4cHJlc3Npb24gYmluZCBmcm9tIHRoZSBleHByZXNzaW9uLlxuICAgKlxuICAgKiBAcGFyYW0gYmluZCBBIGJpbmQgdG8gZGVsZXRlXG4gICAqL1xuICBwdWJsaWMgZGVsZXRlQmluZChiaW5kOiBWUk1FeHByZXNzaW9uQmluZCk6IHZvaWQge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fYmluZHMuaW5kZXhPZihiaW5kKTtcbiAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgdGhpcy5fYmluZHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgd2VpZ2h0IHRvIGV2ZXJ5IGFzc2lnbmVkIGJsZW5kIHNoYXBlcy5cbiAgICogU2hvdWxkIGJlIGNhbGxlZCBldmVyeSBmcmFtZS5cbiAgICovXG4gIHB1YmxpYyBhcHBseVdlaWdodChvcHRpb25zPzoge1xuICAgIC8qKlxuICAgICAqIE11bHRpcGxpZXMgYSB2YWx1ZSB0byBpdHMgd2VpZ2h0IHRvIGFwcGx5LlxuICAgICAqIEludGVuZGVkIHRvIGJlIHVzZWQgZm9yIG92ZXJyaWRpbmcgYW4gZXhwcmVzc2lvbiB3ZWlnaHQgYnkgYW5vdGhlciBleHByZXNzaW9uLlxuICAgICAqIFNlZSBhbHNvOiB7QGxpbmsgb3ZlcnJpZGVCbGlua30sIHtAbGluayBvdmVycmlkZUxvb2tBdH0sIHtAbGluayBvdmVycmlkZU1vdXRofVxuICAgICAqL1xuICAgIG11bHRpcGxpZXI/OiBudW1iZXI7XG4gIH0pOiB2b2lkIHtcbiAgICBsZXQgYWN0dWFsV2VpZ2h0ID0gdGhpcy5vdXRwdXRXZWlnaHQ7XG4gICAgYWN0dWFsV2VpZ2h0ICo9IG9wdGlvbnM/Lm11bHRpcGxpZXIgPz8gMS4wO1xuXG4gICAgLy8gaWYgdGhlIGV4cHJlc3Npb24gaXMgYmluYXJ5LCB0aGUgb3ZlcnJpZGUgdmFsdWUgbXVzdCBiZSBhbHNvIHRyZWF0ZWQgYXMgYmluYXJ5XG4gICAgaWYgKHRoaXMuaXNCaW5hcnkgJiYgYWN0dWFsV2VpZ2h0IDwgMS4wKSB7XG4gICAgICBhY3R1YWxXZWlnaHQgPSAwLjA7XG4gICAgfVxuXG4gICAgdGhpcy5fYmluZHMuZm9yRWFjaCgoYmluZCkgPT4gYmluZC5hcHBseVdlaWdodChhY3R1YWxXZWlnaHQpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciBwcmV2aW91c2x5IGFzc2lnbmVkIGJsZW5kIHNoYXBlcy5cbiAgICovXG4gIHB1YmxpYyBjbGVhckFwcGxpZWRXZWlnaHQoKTogdm9pZCB7XG4gICAgdGhpcy5fYmluZHMuZm9yRWFjaCgoYmluZCkgPT4gYmluZC5jbGVhckFwcGxpZWRXZWlnaHQoKSk7XG4gIH1cbn1cbiIsICJpbXBvcnQgdHlwZSAqIGFzIFYwVlJNIGZyb20gJ0BwaXhpdi90eXBlcy12cm0tMC4wJztcbmltcG9ydCB0eXBlICogYXMgVjFWUk1TY2hlbWEgZnJvbSAnQHBpeGl2L3R5cGVzLXZybWMtdnJtLTEuMCc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBHTFRGLCBHTFRGTG9hZGVyUGx1Z2luLCBHTFRGUGFyc2VyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlci5qcyc7XG5pbXBvcnQgeyBnbHRmRXh0cmFjdFByaW1pdGl2ZXNGcm9tTm9kZSB9IGZyb20gJy4uL3V0aWxzL2dsdGZFeHRyYWN0UHJpbWl0aXZlc0Zyb21Ob2RlJztcbmltcG9ydCB7IFZSTUV4cHJlc3Npb24gfSBmcm9tICcuL1ZSTUV4cHJlc3Npb24nO1xuaW1wb3J0IHsgVlJNRXhwcmVzc2lvbk1hbmFnZXIgfSBmcm9tICcuL1ZSTUV4cHJlc3Npb25NYW5hZ2VyJztcbmltcG9ydCB7IHYwRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JNYXAgfSBmcm9tICcuL1ZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yVHlwZSc7XG5pbXBvcnQgeyBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvckJpbmQgfSBmcm9tICcuL1ZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yQmluZCc7XG5pbXBvcnQgeyBWUk1FeHByZXNzaW9uTW9ycGhUYXJnZXRCaW5kIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uTW9ycGhUYXJnZXRCaW5kJztcbmltcG9ydCB7IFZSTUV4cHJlc3Npb25QcmVzZXROYW1lIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uUHJlc2V0TmFtZSc7XG5pbXBvcnQgeyBWUk1FeHByZXNzaW9uVGV4dHVyZVRyYW5zZm9ybUJpbmQgfSBmcm9tICcuL1ZSTUV4cHJlc3Npb25UZXh0dXJlVHJhbnNmb3JtQmluZCc7XG5pbXBvcnQgeyBHTFRGIGFzIEdMVEZTY2hlbWEgfSBmcm9tICdAZ2x0Zi10cmFuc2Zvcm0vY29yZSc7XG5cbi8qKlxuICogUG9zc2libGUgc3BlYyB2ZXJzaW9ucyBpdCByZWNvZ25pemVzLlxuICovXG5jb25zdCBQT1NTSUJMRV9TUEVDX1ZFUlNJT05TID0gbmV3IFNldChbJzEuMCcsICcxLjAtYmV0YSddKTtcblxuLyoqXG4gKiBBIHBsdWdpbiBvZiBHTFRGTG9hZGVyIHRoYXQgaW1wb3J0cyBhIHtAbGluayBWUk1FeHByZXNzaW9uTWFuYWdlcn0gZnJvbSBhIFZSTSBleHRlbnNpb24gb2YgYSBHTFRGLlxuICovXG5leHBvcnQgY2xhc3MgVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbiBpbXBsZW1lbnRzIEdMVEZMb2FkZXJQbHVnaW4ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IHYwdjFQcmVzZXROYW1lTWFwOiB7IFt2ME5hbWUgaW4gVjBWUk0uQmxlbmRTaGFwZVByZXNldE5hbWVdPzogVlJNRXhwcmVzc2lvblByZXNldE5hbWUgfSA9IHtcbiAgICBhOiAnYWEnLFxuICAgIGU6ICdlZScsXG4gICAgaTogJ2loJyxcbiAgICBvOiAnb2gnLFxuICAgIHU6ICdvdScsXG4gICAgYmxpbms6ICdibGluaycsXG4gICAgam95OiAnaGFwcHknLFxuICAgIGFuZ3J5OiAnYW5ncnknLFxuICAgIHNvcnJvdzogJ3NhZCcsXG4gICAgZnVuOiAncmVsYXhlZCcsXG4gICAgbG9va3VwOiAnbG9va1VwJyxcbiAgICBsb29rZG93bjogJ2xvb2tEb3duJyxcbiAgICBsb29rbGVmdDogJ2xvb2tMZWZ0JyxcbiAgICBsb29rcmlnaHQ6ICdsb29rUmlnaHQnLFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cbiAgICBibGlua19sOiAnYmxpbmtMZWZ0JyxcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXG4gICAgYmxpbmtfcjogJ2JsaW5rUmlnaHQnLFxuICAgIG5ldXRyYWw6ICduZXV0cmFsJyxcbiAgfTtcblxuICBwdWJsaWMgcmVhZG9ubHkgcGFyc2VyOiBHTFRGUGFyc2VyO1xuXG4gIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xuICAgIC8vIFdlIHNob3VsZCB1c2UgdGhlIGV4dGVuc2lvbiBuYW1lIGluc3RlYWQgYnV0IHdlIGhhdmUgbXVsdGlwbGUgcGx1Z2lucyBmb3IgYW4gZXh0ZW5zaW9uLi4uXG4gICAgcmV0dXJuICdWUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luJztcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJzZXI6IEdMVEZQYXJzZXIpIHtcbiAgICB0aGlzLnBhcnNlciA9IHBhcnNlcjtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBhZnRlclJvb3QoZ2x0ZjogR0xURik6IFByb21pc2U8dm9pZD4ge1xuICAgIGdsdGYudXNlckRhdGEudnJtRXhwcmVzc2lvbk1hbmFnZXIgPSBhd2FpdCB0aGlzLl9pbXBvcnQoZ2x0Zik7XG4gIH1cblxuICAvKipcbiAgICogSW1wb3J0IGEge0BsaW5rIFZSTUV4cHJlc3Npb25NYW5hZ2VyfSBmcm9tIGEgVlJNLlxuICAgKlxuICAgKiBAcGFyYW0gZ2x0ZiBBIHBhcnNlZCByZXN1bHQgb2YgR0xURiB0YWtlbiBmcm9tIEdMVEZMb2FkZXJcbiAgICovXG4gIHByaXZhdGUgYXN5bmMgX2ltcG9ydChnbHRmOiBHTFRGKTogUHJvbWlzZTxWUk1FeHByZXNzaW9uTWFuYWdlciB8IG51bGw+IHtcbiAgICBjb25zdCB2MVJlc3VsdCA9IGF3YWl0IHRoaXMuX3YxSW1wb3J0KGdsdGYpO1xuICAgIGlmICh2MVJlc3VsdCkge1xuICAgICAgcmV0dXJuIHYxUmVzdWx0O1xuICAgIH1cblxuICAgIGNvbnN0IHYwUmVzdWx0ID0gYXdhaXQgdGhpcy5fdjBJbXBvcnQoZ2x0Zik7XG4gICAgaWYgKHYwUmVzdWx0KSB7XG4gICAgICByZXR1cm4gdjBSZXN1bHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF92MUltcG9ydChnbHRmOiBHTFRGKTogUHJvbWlzZTxWUk1FeHByZXNzaW9uTWFuYWdlciB8IG51bGw+IHtcbiAgICBjb25zdCBqc29uID0gdGhpcy5wYXJzZXIuanNvbiBhcyBHTFRGU2NoZW1hLklHTFRGO1xuXG4gICAgLy8gZWFybHkgYWJvcnQgaWYgaXQgZG9lc24ndCB1c2UgdnJtXG4gICAgY29uc3QgaXNWUk1Vc2VkID0ganNvbi5leHRlbnNpb25zVXNlZD8uaW5kZXhPZignVlJNQ192cm0nKSAhPT0gLTE7XG4gICAgaWYgKCFpc1ZSTVVzZWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGV4dGVuc2lvbiA9IGpzb24uZXh0ZW5zaW9ucz8uWydWUk1DX3ZybSddIGFzIFYxVlJNU2NoZW1hLlZSTUNWUk0gfCB1bmRlZmluZWQ7XG4gICAgaWYgKCFleHRlbnNpb24pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNwZWNWZXJzaW9uID0gZXh0ZW5zaW9uLnNwZWNWZXJzaW9uO1xuICAgIGlmICghUE9TU0lCTEVfU1BFQ19WRVJTSU9OUy5oYXMoc3BlY1ZlcnNpb24pKSB7XG4gICAgICBjb25zb2xlLndhcm4oYFZSTUV4cHJlc3Npb25Mb2FkZXJQbHVnaW46IFVua25vd24gVlJNQ192cm0gc3BlY1ZlcnNpb24gXCIke3NwZWNWZXJzaW9ufVwiYCk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzY2hlbWFFeHByZXNzaW9ucyA9IGV4dGVuc2lvbi5leHByZXNzaW9ucztcbiAgICBpZiAoIXNjaGVtYUV4cHJlc3Npb25zKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBsaXN0IGV4cHJlc3Npb25zXG4gICAgY29uc3QgcHJlc2V0TmFtZVNldCA9IG5ldyBTZXQ8c3RyaW5nPihPYmplY3QudmFsdWVzKFZSTUV4cHJlc3Npb25QcmVzZXROYW1lKSk7XG4gICAgY29uc3QgbmFtZVNjaGVtYUV4cHJlc3Npb25NYXAgPSBuZXcgTWFwPHN0cmluZywgVjFWUk1TY2hlbWEuRXhwcmVzc2lvbj4oKTtcblxuICAgIGlmIChzY2hlbWFFeHByZXNzaW9ucy5wcmVzZXQgIT0gbnVsbCkge1xuICAgICAgT2JqZWN0LmVudHJpZXMoc2NoZW1hRXhwcmVzc2lvbnMucHJlc2V0KS5mb3JFYWNoKChbbmFtZSwgc2NoZW1hRXhwcmVzc2lvbl0pID0+IHtcbiAgICAgICAgaWYgKHNjaGVtYUV4cHJlc3Npb24gPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSAvLyB0eXBlc2NyaXB0XG5cbiAgICAgICAgaWYgKCFwcmVzZXROYW1lU2V0LmhhcyhuYW1lKSkge1xuICAgICAgICAgIGNvbnNvbGUud2FybihgVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbjogVW5rbm93biBwcmVzZXQgbmFtZSBcIiR7bmFtZX1cIiBkZXRlY3RlZC4gSWdub3JpbmcgdGhlIGV4cHJlc3Npb25gKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBuYW1lU2NoZW1hRXhwcmVzc2lvbk1hcC5zZXQobmFtZSwgc2NoZW1hRXhwcmVzc2lvbik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoc2NoZW1hRXhwcmVzc2lvbnMuY3VzdG9tICE9IG51bGwpIHtcbiAgICAgIE9iamVjdC5lbnRyaWVzKHNjaGVtYUV4cHJlc3Npb25zLmN1c3RvbSkuZm9yRWFjaCgoW25hbWUsIHNjaGVtYUV4cHJlc3Npb25dKSA9PiB7XG4gICAgICAgIGlmIChwcmVzZXROYW1lU2V0LmhhcyhuYW1lKSkge1xuICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgIGBWUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luOiBDdXN0b20gZXhwcmVzc2lvbiBjYW5ub3QgaGF2ZSBwcmVzZXQgbmFtZSBcIiR7bmFtZX1cIi4gSWdub3JpbmcgdGhlIGV4cHJlc3Npb25gLFxuICAgICAgICAgICk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbmFtZVNjaGVtYUV4cHJlc3Npb25NYXAuc2V0KG5hbWUsIHNjaGVtYUV4cHJlc3Npb24pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gcHJlcGFyZSBtYW5hZ2VyXG4gICAgY29uc3QgbWFuYWdlciA9IG5ldyBWUk1FeHByZXNzaW9uTWFuYWdlcigpO1xuXG4gICAgLy8gbG9hZCBleHByZXNzaW9uc1xuICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgQXJyYXkuZnJvbShuYW1lU2NoZW1hRXhwcmVzc2lvbk1hcC5lbnRyaWVzKCkpLm1hcChhc3luYyAoW25hbWUsIHNjaGVtYUV4cHJlc3Npb25dKSA9PiB7XG4gICAgICAgIGNvbnN0IGV4cHJlc3Npb24gPSBuZXcgVlJNRXhwcmVzc2lvbihuYW1lKTtcbiAgICAgICAgZ2x0Zi5zY2VuZS5hZGQoZXhwcmVzc2lvbik7XG5cbiAgICAgICAgZXhwcmVzc2lvbi5pc0JpbmFyeSA9IHNjaGVtYUV4cHJlc3Npb24uaXNCaW5hcnkgPz8gZmFsc2U7XG4gICAgICAgIGV4cHJlc3Npb24ub3ZlcnJpZGVCbGluayA9IHNjaGVtYUV4cHJlc3Npb24ub3ZlcnJpZGVCbGluayA/PyAnbm9uZSc7XG4gICAgICAgIGV4cHJlc3Npb24ub3ZlcnJpZGVMb29rQXQgPSBzY2hlbWFFeHByZXNzaW9uLm92ZXJyaWRlTG9va0F0ID8/ICdub25lJztcbiAgICAgICAgZXhwcmVzc2lvbi5vdmVycmlkZU1vdXRoID0gc2NoZW1hRXhwcmVzc2lvbi5vdmVycmlkZU1vdXRoID8/ICdub25lJztcblxuICAgICAgICBzY2hlbWFFeHByZXNzaW9uLm1vcnBoVGFyZ2V0QmluZHM/LmZvckVhY2goYXN5bmMgKGJpbmQpID0+IHtcbiAgICAgICAgICBpZiAoYmluZC5ub2RlID09PSB1bmRlZmluZWQgfHwgYmluZC5pbmRleCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgcHJpbWl0aXZlcyA9IChhd2FpdCBnbHRmRXh0cmFjdFByaW1pdGl2ZXNGcm9tTm9kZShnbHRmLCBiaW5kLm5vZGUpKSE7XG4gICAgICAgICAgY29uc3QgbW9ycGhUYXJnZXRJbmRleCA9IGJpbmQuaW5kZXg7XG5cbiAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgbWVzaCBoYXMgdGhlIHRhcmdldCBtb3JwaCB0YXJnZXRcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAhcHJpbWl0aXZlcy5ldmVyeShcbiAgICAgICAgICAgICAgKHByaW1pdGl2ZSkgPT5cbiAgICAgICAgICAgICAgICBBcnJheS5pc0FycmF5KHByaW1pdGl2ZS5tb3JwaFRhcmdldEluZmx1ZW5jZXMpICYmXG4gICAgICAgICAgICAgICAgbW9ycGhUYXJnZXRJbmRleCA8IHByaW1pdGl2ZS5tb3JwaFRhcmdldEluZmx1ZW5jZXMubGVuZ3RoLFxuICAgICAgICAgICAgKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgICBgVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbjogJHtzY2hlbWFFeHByZXNzaW9uLm5hbWV9IGF0dGVtcHRzIHRvIGluZGV4IG1vcnBoICMke21vcnBoVGFyZ2V0SW5kZXh9IGJ1dCBub3QgZm91bmQuYCxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZXhwcmVzc2lvbi5hZGRCaW5kKFxuICAgICAgICAgICAgbmV3IFZSTUV4cHJlc3Npb25Nb3JwaFRhcmdldEJpbmQoe1xuICAgICAgICAgICAgICBwcmltaXRpdmVzLFxuICAgICAgICAgICAgICBpbmRleDogbW9ycGhUYXJnZXRJbmRleCxcbiAgICAgICAgICAgICAgd2VpZ2h0OiBiaW5kLndlaWdodCA/PyAxLjAsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoc2NoZW1hRXhwcmVzc2lvbi5tYXRlcmlhbENvbG9yQmluZHMgfHwgc2NoZW1hRXhwcmVzc2lvbi50ZXh0dXJlVHJhbnNmb3JtQmluZHMpIHtcbiAgICAgICAgICAvLyBsaXN0IHVwIGV2ZXJ5IG1hdGVyaWFsIGluIGBnbHRmLnNjZW5lYFxuICAgICAgICAgIGNvbnN0IGdsdGZNYXRlcmlhbHM6IFRIUkVFLk1hdGVyaWFsW10gPSBbXTtcbiAgICAgICAgICBnbHRmLnNjZW5lLnRyYXZlcnNlKChvYmplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1hdGVyaWFsID0gKG9iamVjdCBhcyBhbnkpLm1hdGVyaWFsIGFzIFRIUkVFLk1hdGVyaWFsIHwgVEhSRUUuTWF0ZXJpYWxbXSB8IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGlmIChtYXRlcmlhbCkge1xuICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShtYXRlcmlhbCkpIHtcbiAgICAgICAgICAgICAgICBnbHRmTWF0ZXJpYWxzLnB1c2goLi4ubWF0ZXJpYWwpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGdsdGZNYXRlcmlhbHMucHVzaChtYXRlcmlhbCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHNjaGVtYUV4cHJlc3Npb24ubWF0ZXJpYWxDb2xvckJpbmRzPy5mb3JFYWNoKGFzeW5jIChiaW5kKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtYXRlcmlhbHMgPSBnbHRmTWF0ZXJpYWxzLmZpbHRlcigobWF0ZXJpYWwpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWxJbmRleCA9IHRoaXMucGFyc2VyLmFzc29jaWF0aW9ucy5nZXQobWF0ZXJpYWwpPy5tYXRlcmlhbHM7XG4gICAgICAgICAgICAgIHJldHVybiBiaW5kLm1hdGVyaWFsID09PSBtYXRlcmlhbEluZGV4O1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG1hdGVyaWFscy5mb3JFYWNoKChtYXRlcmlhbCkgPT4ge1xuICAgICAgICAgICAgICBleHByZXNzaW9uLmFkZEJpbmQoXG4gICAgICAgICAgICAgICAgbmV3IFZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yQmluZCh7XG4gICAgICAgICAgICAgICAgICBtYXRlcmlhbCxcbiAgICAgICAgICAgICAgICAgIHR5cGU6IGJpbmQudHlwZSxcbiAgICAgICAgICAgICAgICAgIHRhcmdldFZhbHVlOiBuZXcgVEhSRUUuQ29sb3IoKS5mcm9tQXJyYXkoYmluZC50YXJnZXRWYWx1ZSksXG4gICAgICAgICAgICAgICAgICB0YXJnZXRBbHBoYTogYmluZC50YXJnZXRWYWx1ZVszXSxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgc2NoZW1hRXhwcmVzc2lvbi50ZXh0dXJlVHJhbnNmb3JtQmluZHM/LmZvckVhY2goYXN5bmMgKGJpbmQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1hdGVyaWFscyA9IGdsdGZNYXRlcmlhbHMuZmlsdGVyKChtYXRlcmlhbCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBtYXRlcmlhbEluZGV4ID0gdGhpcy5wYXJzZXIuYXNzb2NpYXRpb25zLmdldChtYXRlcmlhbCk/Lm1hdGVyaWFscztcbiAgICAgICAgICAgICAgcmV0dXJuIGJpbmQubWF0ZXJpYWwgPT09IG1hdGVyaWFsSW5kZXg7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbWF0ZXJpYWxzLmZvckVhY2goKG1hdGVyaWFsKSA9PiB7XG4gICAgICAgICAgICAgIGV4cHJlc3Npb24uYWRkQmluZChcbiAgICAgICAgICAgICAgICBuZXcgVlJNRXhwcmVzc2lvblRleHR1cmVUcmFuc2Zvcm1CaW5kKHtcbiAgICAgICAgICAgICAgICAgIG1hdGVyaWFsLFxuICAgICAgICAgICAgICAgICAgb2Zmc2V0OiBuZXcgVEhSRUUuVmVjdG9yMigpLmZyb21BcnJheShiaW5kLm9mZnNldCA/PyBbMC4wLCAwLjBdKSxcbiAgICAgICAgICAgICAgICAgIHNjYWxlOiBuZXcgVEhSRUUuVmVjdG9yMigpLmZyb21BcnJheShiaW5kLnNjYWxlID8/IFsxLjAsIDEuMF0pLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBtYW5hZ2VyLnJlZ2lzdGVyRXhwcmVzc2lvbihleHByZXNzaW9uKTtcbiAgICAgIH0pLFxuICAgICk7XG5cbiAgICByZXR1cm4gbWFuYWdlcjtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX3YwSW1wb3J0KGdsdGY6IEdMVEYpOiBQcm9taXNlPFZSTUV4cHJlc3Npb25NYW5hZ2VyIHwgbnVsbD4ge1xuICAgIGNvbnN0IGpzb24gPSB0aGlzLnBhcnNlci5qc29uIGFzIEdMVEZTY2hlbWEuSUdMVEY7XG5cbiAgICAvLyBlYXJseSBhYm9ydCBpZiBpdCBkb2Vzbid0IHVzZSB2cm1cbiAgICBjb25zdCB2cm1FeHQgPSBqc29uLmV4dGVuc2lvbnM/LlZSTSBhcyBWMFZSTS5WUk0gfCB1bmRlZmluZWQ7XG4gICAgaWYgKCF2cm1FeHQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNjaGVtYUJsZW5kU2hhcGUgPSB2cm1FeHQuYmxlbmRTaGFwZU1hc3RlcjtcbiAgICBpZiAoIXNjaGVtYUJsZW5kU2hhcGUpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IG1hbmFnZXIgPSBuZXcgVlJNRXhwcmVzc2lvbk1hbmFnZXIoKTtcblxuICAgIGNvbnN0IHNjaGVtYUJsZW5kU2hhcGVHcm91cHMgPSBzY2hlbWFCbGVuZFNoYXBlLmJsZW5kU2hhcGVHcm91cHM7XG4gICAgaWYgKCFzY2hlbWFCbGVuZFNoYXBlR3JvdXBzKSB7XG4gICAgICByZXR1cm4gbWFuYWdlcjtcbiAgICB9XG5cbiAgICBjb25zdCBibGVuZFNoYXBlTmFtZVNldCA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICBzY2hlbWFCbGVuZFNoYXBlR3JvdXBzLm1hcChhc3luYyAoc2NoZW1hR3JvdXApID0+IHtcbiAgICAgICAgY29uc3QgdjBQcmVzZXROYW1lID0gc2NoZW1hR3JvdXAucHJlc2V0TmFtZTtcbiAgICAgICAgY29uc3QgdjFQcmVzZXROYW1lID1cbiAgICAgICAgICAodjBQcmVzZXROYW1lICE9IG51bGwgJiYgVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbi52MHYxUHJlc2V0TmFtZU1hcFt2MFByZXNldE5hbWVdKSB8fCBudWxsO1xuICAgICAgICBjb25zdCBuYW1lID0gdjFQcmVzZXROYW1lID8/IHNjaGVtYUdyb3VwLm5hbWU7XG5cbiAgICAgICAgaWYgKG5hbWUgPT0gbnVsbCkge1xuICAgICAgICAgIGNvbnNvbGUud2FybignVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbjogT25lIG9mIGN1c3RvbSBleHByZXNzaW9ucyBoYXMgbm8gbmFtZS4gSWdub3JpbmcgdGhlIGV4cHJlc3Npb24nKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkdXBsaWNhdGlvbiBjaGVja1xuICAgICAgICBpZiAoYmxlbmRTaGFwZU5hbWVTZXQuaGFzKG5hbWUpKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgYFZSTUV4cHJlc3Npb25Mb2FkZXJQbHVnaW46IEFuIGV4cHJlc3Npb24gcHJlc2V0ICR7djBQcmVzZXROYW1lfSBoYXMgZHVwbGljYXRlZCBlbnRyaWVzLiBJZ25vcmluZyB0aGUgZXhwcmVzc2lvbmAsXG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBibGVuZFNoYXBlTmFtZVNldC5hZGQobmFtZSk7XG5cbiAgICAgICAgY29uc3QgZXhwcmVzc2lvbiA9IG5ldyBWUk1FeHByZXNzaW9uKG5hbWUpO1xuICAgICAgICBnbHRmLnNjZW5lLmFkZChleHByZXNzaW9uKTtcblxuICAgICAgICBleHByZXNzaW9uLmlzQmluYXJ5ID0gc2NoZW1hR3JvdXAuaXNCaW5hcnkgPz8gZmFsc2U7XG4gICAgICAgIC8vIHYwIGRvZXNuJ3QgaGF2ZSBpZ25vcmUgcHJvcGVydGllc1xuXG4gICAgICAgIC8vIEJpbmQgbW9ycGhUYXJnZXRcbiAgICAgICAgaWYgKHNjaGVtYUdyb3VwLmJpbmRzKSB7XG4gICAgICAgICAgc2NoZW1hR3JvdXAuYmluZHMuZm9yRWFjaChhc3luYyAoYmluZCkgPT4ge1xuICAgICAgICAgICAgaWYgKGJpbmQubWVzaCA9PT0gdW5kZWZpbmVkIHx8IGJpbmQuaW5kZXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG5vZGVzVXNpbmdNZXNoOiBudW1iZXJbXSA9IFtdO1xuICAgICAgICAgICAganNvbi5ub2Rlcz8uZm9yRWFjaCgobm9kZSwgaSkgPT4ge1xuICAgICAgICAgICAgICBpZiAobm9kZS5tZXNoID09PSBiaW5kLm1lc2gpIHtcbiAgICAgICAgICAgICAgICBub2Rlc1VzaW5nTWVzaC5wdXNoKGkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY29uc3QgbW9ycGhUYXJnZXRJbmRleCA9IGJpbmQuaW5kZXg7XG5cbiAgICAgICAgICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICAgICAgICBub2Rlc1VzaW5nTWVzaC5tYXAoYXN5bmMgKG5vZGVJbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHByaW1pdGl2ZXMgPSAoYXdhaXQgZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGUoZ2x0Ziwgbm9kZUluZGV4KSkhO1xuXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIG1lc2ggaGFzIHRoZSB0YXJnZXQgbW9ycGggdGFyZ2V0XG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgIXByaW1pdGl2ZXMuZXZlcnkoXG4gICAgICAgICAgICAgICAgICAgIChwcmltaXRpdmUpID0+XG4gICAgICAgICAgICAgICAgICAgICAgQXJyYXkuaXNBcnJheShwcmltaXRpdmUubW9ycGhUYXJnZXRJbmZsdWVuY2VzKSAmJlxuICAgICAgICAgICAgICAgICAgICAgIG1vcnBoVGFyZ2V0SW5kZXggPCBwcmltaXRpdmUubW9ycGhUYXJnZXRJbmZsdWVuY2VzLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgICAgICAgICAgYFZSTUV4cHJlc3Npb25Mb2FkZXJQbHVnaW46ICR7c2NoZW1hR3JvdXAubmFtZX0gYXR0ZW1wdHMgdG8gaW5kZXggJHttb3JwaFRhcmdldEluZGV4fXRoIG1vcnBoIGJ1dCBub3QgZm91bmQuYCxcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZXhwcmVzc2lvbi5hZGRCaW5kKFxuICAgICAgICAgICAgICAgICAgbmV3IFZSTUV4cHJlc3Npb25Nb3JwaFRhcmdldEJpbmQoe1xuICAgICAgICAgICAgICAgICAgICBwcmltaXRpdmVzLFxuICAgICAgICAgICAgICAgICAgICBpbmRleDogbW9ycGhUYXJnZXRJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgd2VpZ2h0OiAwLjAxICogKGJpbmQud2VpZ2h0ID8/IDEwMCksIC8vIG5hcnJvd2luZyB0aGUgcmFuZ2UgZnJvbSBbIDAuMCAtIDEwMC4wIF0gdG8gWyAwLjAgLSAxLjAgXVxuICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQmluZCBNYXRlcmlhbENvbG9yIGFuZCBUZXh0dXJlVHJhbnNmb3JtXG4gICAgICAgIGNvbnN0IG1hdGVyaWFsVmFsdWVzID0gc2NoZW1hR3JvdXAubWF0ZXJpYWxWYWx1ZXM7XG4gICAgICAgIGlmIChtYXRlcmlhbFZhbHVlcyAmJiBtYXRlcmlhbFZhbHVlcy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICBtYXRlcmlhbFZhbHVlcy5mb3JFYWNoKChtYXRlcmlhbFZhbHVlKSA9PiB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIG1hdGVyaWFsVmFsdWUubWF0ZXJpYWxOYW1lID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgbWF0ZXJpYWxWYWx1ZS5wcm9wZXJ0eU5hbWUgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICBtYXRlcmlhbFZhbHVlLnRhcmdldFZhbHVlID09PSB1bmRlZmluZWRcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogXHUzMEEyXHUzMEQwXHUzMEJGXHUzMEZDXHUzMDZFXHUzMEFBXHUzMEQ2XHUzMEI4XHUzMEE3XHUzMEFGXHUzMEM4XHUzMDZCXHU4QTJEXHU1QjlBXHUzMDU1XHUzMDhDXHUzMDY2XHUzMDQ0XHUzMDhCXHUzMERFXHUzMEM2XHUzMEVBXHUzMEEyXHUzMEVCXHUzMDZFXHU1MTg1XHUzMDRCXHUzMDg5XG4gICAgICAgICAgICAgKiBtYXRlcmlhbFZhbHVlXHUzMDY3XHU2MzA3XHU1QjlBXHUzMDU1XHUzMDhDXHUzMDY2XHUzMDQ0XHUzMDhCXHUzMERFXHUzMEM2XHUzMEVBXHUzMEEyXHUzMEVCXHUzMDkyXHU5NkM2XHUzMDgxXHUzMDhCXHUzMDAyXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogXHU3Mjc5XHU1QjlBXHUzMDZCXHUzMDZGXHU1NDBEXHU1MjREXHUzMDkyXHU0RjdGXHU3NTI4XHUzMDU5XHUzMDhCXHUzMDAyXG4gICAgICAgICAgICAgKiBcdTMwQTJcdTMwQTZcdTMwQzhcdTMwRTlcdTMwQTRcdTMwRjNcdTYzQ0ZcdTc1M0JcdTc1MjhcdTMwNkVcdTMwREVcdTMwQzZcdTMwRUFcdTMwQTJcdTMwRUJcdTMwODJcdTU0MENcdTY2NDJcdTMwNkJcdTk2QzZcdTMwODFcdTMwOEJcdTMwMDJcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWxzOiBUSFJFRS5NYXRlcmlhbFtdID0gW107XG4gICAgICAgICAgICBnbHRmLnNjZW5lLnRyYXZlcnNlKChvYmplY3QpID0+IHtcbiAgICAgICAgICAgICAgaWYgKChvYmplY3QgYXMgYW55KS5tYXRlcmlhbCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1hdGVyaWFsOiBUSFJFRS5NYXRlcmlhbFtdIHwgVEhSRUUuTWF0ZXJpYWwgPSAob2JqZWN0IGFzIGFueSkubWF0ZXJpYWw7XG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobWF0ZXJpYWwpKSB7XG4gICAgICAgICAgICAgICAgICBtYXRlcmlhbHMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgLi4ubWF0ZXJpYWwuZmlsdGVyKFxuICAgICAgICAgICAgICAgICAgICAgIChtdGwpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAobXRsLm5hbWUgPT09IG1hdGVyaWFsVmFsdWUubWF0ZXJpYWxOYW1lISB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICBtdGwubmFtZSA9PT0gbWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbE5hbWUhICsgJyAoT3V0bGluZSknKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgbWF0ZXJpYWxzLmluZGV4T2YobXRsKSA9PT0gLTEsXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0ZXJpYWwubmFtZSA9PT0gbWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbE5hbWUgJiYgbWF0ZXJpYWxzLmluZGV4T2YobWF0ZXJpYWwpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgbWF0ZXJpYWxzLnB1c2gobWF0ZXJpYWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNvbnN0IG1hdGVyaWFsUHJvcGVydHlOYW1lID0gbWF0ZXJpYWxWYWx1ZS5wcm9wZXJ0eU5hbWU7XG4gICAgICAgICAgICBtYXRlcmlhbHMuZm9yRWFjaCgobWF0ZXJpYWwpID0+IHtcbiAgICAgICAgICAgICAgLy8gVGV4dHVyZVRyYW5zZm9ybUJpbmRcbiAgICAgICAgICAgICAgaWYgKG1hdGVyaWFsUHJvcGVydHlOYW1lID09PSAnX01haW5UZXhfU1QnKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2NhbGUgPSBuZXcgVEhSRUUuVmVjdG9yMihtYXRlcmlhbFZhbHVlLnRhcmdldFZhbHVlIVswXSwgbWF0ZXJpYWxWYWx1ZS50YXJnZXRWYWx1ZSFbMV0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IG9mZnNldCA9IG5ldyBUSFJFRS5WZWN0b3IyKG1hdGVyaWFsVmFsdWUudGFyZ2V0VmFsdWUhWzJdLCBtYXRlcmlhbFZhbHVlLnRhcmdldFZhbHVlIVszXSk7XG5cbiAgICAgICAgICAgICAgICBvZmZzZXQueSA9IDEuMCAtIG9mZnNldC55IC0gc2NhbGUueTtcblxuICAgICAgICAgICAgICAgIGV4cHJlc3Npb24uYWRkQmluZChcbiAgICAgICAgICAgICAgICAgIG5ldyBWUk1FeHByZXNzaW9uVGV4dHVyZVRyYW5zZm9ybUJpbmQoe1xuICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbCxcbiAgICAgICAgICAgICAgICAgICAgc2NhbGUsXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldCxcbiAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAvLyBNYXRlcmlhbENvbG9yQmluZFxuICAgICAgICAgICAgICBjb25zdCBtYXRlcmlhbENvbG9yVHlwZSA9IHYwRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JNYXBbbWF0ZXJpYWxQcm9wZXJ0eU5hbWVdO1xuICAgICAgICAgICAgICBpZiAobWF0ZXJpYWxDb2xvclR5cGUpIHtcbiAgICAgICAgICAgICAgICBleHByZXNzaW9uLmFkZEJpbmQoXG4gICAgICAgICAgICAgICAgICBuZXcgVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JCaW5kKHtcbiAgICAgICAgICAgICAgICAgICAgbWF0ZXJpYWwsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IG1hdGVyaWFsQ29sb3JUeXBlLFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRWYWx1ZTogbmV3IFRIUkVFLkNvbG9yKCkuZnJvbUFycmF5KG1hdGVyaWFsVmFsdWUudGFyZ2V0VmFsdWUhKSxcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0QWxwaGE6IG1hdGVyaWFsVmFsdWUudGFyZ2V0VmFsdWUhWzNdLFxuICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGNvbnNvbGUud2FybihtYXRlcmlhbFByb3BlcnR5TmFtZSArICcgaXMgbm90IHN1cHBvcnRlZCcpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBtYW5hZ2VyLnJlZ2lzdGVyRXhwcmVzc2lvbihleHByZXNzaW9uKTtcbiAgICAgIH0pLFxuICAgICk7XG5cbiAgICByZXR1cm4gbWFuYWdlcjtcbiAgfVxufVxuIiwgImltcG9ydCB0eXBlICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHR5cGUgeyBHTFRGIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlci5qcyc7XG5pbXBvcnQgeyBHTFRGIGFzIEdMVEZTY2hlbWEgfSBmcm9tICdAZ2x0Zi10cmFuc2Zvcm0vY29yZSc7XG5cbmZ1bmN0aW9uIGV4dHJhY3RQcmltaXRpdmVzSW50ZXJuYWwoZ2x0ZjogR0xURiwgbm9kZUluZGV4OiBudW1iZXIsIG5vZGU6IFRIUkVFLk9iamVjdDNEKTogVEhSRUUuTWVzaFtdIHwgbnVsbCB7XG4gIGNvbnN0IGpzb24gPSBnbHRmLnBhcnNlci5qc29uIGFzIEdMVEZTY2hlbWEuSUdMVEY7XG5cbiAgLyoqXG4gICAqIExldCdzIGxpc3QgdXAgZXZlcnkgcG9zc2libGUgcGF0dGVybnMgdGhhdCBwYXJzZWQgZ2x0ZiBub2RlcyB3aXRoIGEgbWVzaCBjYW4gaGF2ZSwsLFxuICAgKlxuICAgKiBcIipcIiBpbmRpY2F0ZXMgdGhhdCB0aG9zZSBtZXNoZXMgc2hvdWxkIGJlIGxpc3RlZCB1cCB1c2luZyB0aGlzIGZ1bmN0aW9uXG4gICAqXG4gICAqICMjIyBBIG5vZGUgd2l0aCBhIChtZXNoLCBhIHNpZ25sZSBwcmltaXRpdmUpXG4gICAqXG4gICAqIC0gYFRIUkVFLk1lc2hgOiBUaGUgb25seSBwcmltaXRpdmUgb2YgdGhlIG1lc2ggKlxuICAgKlxuICAgKiAjIyMgQSBub2RlIHdpdGggYSAobWVzaCwgbXVsdGlwbGUgcHJpbWl0aXZlcylcbiAgICpcbiAgICogLSBgVEhSRUUuR3JvdXBgOiBUaGUgcm9vdCBvZiB0aGUgbWVzaFxuICAgKiAgIC0gYFRIUkVFLk1lc2hgOiBBIHByaW1pdGl2ZSBvZiB0aGUgbWVzaCAqXG4gICAqICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoICgyKSAqXG4gICAqXG4gICAqICMjIyBBIG5vZGUgd2l0aCBhIChtZXNoLCBtdWx0aXBsZSBwcmltaXRpdmVzKSBBTkQgKGEgY2hpbGQgd2l0aCBhIG1lc2gsIGEgc2luZ2xlIHByaW1pdGl2ZSlcbiAgICpcbiAgICogLSBgVEhSRUUuR3JvdXBgOiBUaGUgcm9vdCBvZiB0aGUgbWVzaFxuICAgKiAgIC0gYFRIUkVFLk1lc2hgOiBBIHByaW1pdGl2ZSBvZiB0aGUgbWVzaCAqXG4gICAqICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoICgyKSAqXG4gICAqICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIGEgTUVTSCBPRiBUSEUgQ0hJTERcbiAgICpcbiAgICogIyMjIEEgbm9kZSB3aXRoIGEgKG1lc2gsIG11bHRpcGxlIHByaW1pdGl2ZXMpIEFORCAoYSBjaGlsZCB3aXRoIGEgbWVzaCwgbXVsdGlwbGUgcHJpbWl0aXZlcylcbiAgICpcbiAgICogLSBgVEhSRUUuR3JvdXBgOiBUaGUgcm9vdCBvZiB0aGUgbWVzaFxuICAgKiAgIC0gYFRIUkVFLk1lc2hgOiBBIHByaW1pdGl2ZSBvZiB0aGUgbWVzaCAqXG4gICAqICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoICgyKSAqXG4gICAqICAgLSBgVEhSRUUuR3JvdXBgOiBUaGUgcm9vdCBvZiBhIE1FU0ggT0YgVEhFIENISUxEXG4gICAqICAgICAtIGBUSFJFRS5NZXNoYDogQSBwcmltaXRpdmUgb2YgdGhlIG1lc2ggb2YgdGhlIGNoaWxkXG4gICAqICAgICAtIGBUSFJFRS5NZXNoYDogQSBwcmltaXRpdmUgb2YgdGhlIG1lc2ggb2YgdGhlIGNoaWxkICgyKVxuICAgKlxuICAgKiAjIyMgQSBub2RlIHdpdGggYSAobWVzaCwgbXVsdGlwbGUgcHJpbWl0aXZlcykgQlVUIHRoZSBub2RlIGlzIGEgYm9uZVxuICAgKlxuICAgKiAtIGBUSFJFRS5Cb25lYDogVGhlIHJvb3Qgb2YgdGhlIG5vZGUsIGFzIGEgYm9uZVxuICAgKiAgIC0gYFRIUkVFLkdyb3VwYDogVGhlIHJvb3Qgb2YgdGhlIG1lc2hcbiAgICogICAgIC0gYFRIUkVFLk1lc2hgOiBBIHByaW1pdGl2ZSBvZiB0aGUgbWVzaCAqXG4gICAqICAgICAtIGBUSFJFRS5NZXNoYDogQSBwcmltaXRpdmUgb2YgdGhlIG1lc2ggKDIpICpcbiAgICpcbiAgICogIyMjIEEgbm9kZSB3aXRoIGEgKG1lc2gsIG11bHRpcGxlIHByaW1pdGl2ZXMpIEFORCAoYSBjaGlsZCB3aXRoIGEgbWVzaCwgbXVsdGlwbGUgcHJpbWl0aXZlcykgQlVUIHRoZSBub2RlIGlzIGEgYm9uZVxuICAgKlxuICAgKiAtIGBUSFJFRS5Cb25lYDogVGhlIHJvb3Qgb2YgdGhlIG5vZGUsIGFzIGEgYm9uZVxuICAgKiAgIC0gYFRIUkVFLkdyb3VwYDogVGhlIHJvb3Qgb2YgdGhlIG1lc2hcbiAgICogICAgIC0gYFRIUkVFLk1lc2hgOiBBIHByaW1pdGl2ZSBvZiB0aGUgbWVzaCAqXG4gICAqICAgICAtIGBUSFJFRS5NZXNoYDogQSBwcmltaXRpdmUgb2YgdGhlIG1lc2ggKDIpICpcbiAgICogICAtIGBUSFJFRS5Hcm91cGA6IFRoZSByb290IG9mIGEgTUVTSCBPRiBUSEUgQ0hJTERcbiAgICogICAgIC0gYFRIUkVFLk1lc2hgOiBBIHByaW1pdGl2ZSBvZiB0aGUgbWVzaCBvZiB0aGUgY2hpbGRcbiAgICogICAgIC0gYFRIUkVFLk1lc2hgOiBBIHByaW1pdGl2ZSBvZiB0aGUgbWVzaCBvZiB0aGUgY2hpbGQgKDIpXG4gICAqXG4gICAqIC4uLkkgd2lsbCB0YWtlIGEgc3RyYXRlZ3kgdGhhdCB0cmF2ZXJzZXMgdGhlIHJvb3Qgb2YgdGhlIG5vZGUgYW5kIHRha2UgZmlyc3QgKHByaW1pdGl2ZUNvdW50KSBtZXNoZXMuXG4gICAqL1xuXG4gIC8vIE1ha2Ugc3VyZSB0aGF0IHRoZSBub2RlIGhhcyBhIG1lc2hcbiAgY29uc3Qgc2NoZW1hTm9kZSA9IGpzb24ubm9kZXM/Lltub2RlSW5kZXhdO1xuICBpZiAoc2NoZW1hTm9kZSA9PSBudWxsKSB7XG4gICAgY29uc29sZS53YXJuKGBleHRyYWN0UHJpbWl0aXZlc0ludGVybmFsOiBBdHRlbXB0IHRvIHVzZSBub2Rlc1ske25vZGVJbmRleH1dIG9mIGdsVEYgYnV0IHRoZSBub2RlIGRvZXNuJ3QgZXhpc3RgKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IG1lc2hJbmRleCA9IHNjaGVtYU5vZGUubWVzaDtcbiAgaWYgKG1lc2hJbmRleCA9PSBudWxsKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBIb3cgbWFueSBwcmltaXRpdmVzIHRoZSBtZXNoIGhhcz9cbiAgY29uc3Qgc2NoZW1hTWVzaCA9IGpzb24ubWVzaGVzPy5bbWVzaEluZGV4XTtcbiAgaWYgKHNjaGVtYU1lc2ggPT0gbnVsbCkge1xuICAgIGNvbnNvbGUud2FybihgZXh0cmFjdFByaW1pdGl2ZXNJbnRlcm5hbDogQXR0ZW1wdCB0byB1c2UgbWVzaGVzWyR7bWVzaEluZGV4fV0gb2YgZ2xURiBidXQgdGhlIG1lc2ggZG9lc24ndCBleGlzdGApO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3QgcHJpbWl0aXZlQ291bnQgPSBzY2hlbWFNZXNoLnByaW1pdGl2ZXMubGVuZ3RoO1xuXG4gIC8vIFRyYXZlcnNlIHRoZSBub2RlIGFuZCB0YWtlIGZpcnN0IChwcmltaXRpdmVDb3VudCkgbWVzaGVzXG4gIGNvbnN0IHByaW1pdGl2ZXM6IFRIUkVFLk1lc2hbXSA9IFtdO1xuICBub2RlLnRyYXZlcnNlKChvYmplY3QpID0+IHtcbiAgICBpZiAocHJpbWl0aXZlcy5sZW5ndGggPCBwcmltaXRpdmVDb3VudCkge1xuICAgICAgaWYgKChvYmplY3QgYXMgYW55KS5pc01lc2gpIHtcbiAgICAgICAgcHJpbWl0aXZlcy5wdXNoKG9iamVjdCBhcyBUSFJFRS5NZXNoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBwcmltaXRpdmVzO1xufVxuXG4vKipcbiAqIEV4dHJhY3QgcHJpbWl0aXZlcyAoIGBUSFJFRS5NZXNoW11gICkgb2YgYSBub2RlIGZyb20gYSBsb2FkZWQgR0xURi5cbiAqIFRoZSBtYWluIHB1cnBvc2Ugb2YgdGhpcyBmdW5jdGlvbiBpcyB0byBkaXN0aW5ndWlzaCBwcmltaXRpdmVzIGFuZCBjaGlsZHJlbiBmcm9tIGEgbm9kZSB0aGF0IGhhcyBib3RoIG1lc2hlcyBhbmQgY2hpbGRyZW4uXG4gKlxuICogSXQgdXRpbGl6ZXMgdGhlIGJlaGF2aW9yIHRoYXQgR0xURkxvYWRlciBhZGRzIG1lc2ggcHJpbWl0aXZlcyB0byB0aGUgbm9kZSBvYmplY3QgKCBgVEhSRUUuR3JvdXBgICkgZmlyc3QgdGhlbiBhZGRzIGl0cyBjaGlsZHJlbi5cbiAqXG4gKiBAcGFyYW0gZ2x0ZiBBIEdMVEYgb2JqZWN0IHRha2VuIGZyb20gR0xURkxvYWRlclxuICogQHBhcmFtIG5vZGVJbmRleCBUaGUgaW5kZXggb2YgdGhlIG5vZGVcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdsdGZFeHRyYWN0UHJpbWl0aXZlc0Zyb21Ob2RlKGdsdGY6IEdMVEYsIG5vZGVJbmRleDogbnVtYmVyKTogUHJvbWlzZTxUSFJFRS5NZXNoW10gfCBudWxsPiB7XG4gIGNvbnN0IG5vZGU6IFRIUkVFLk9iamVjdDNEID0gYXdhaXQgZ2x0Zi5wYXJzZXIuZ2V0RGVwZW5kZW5jeSgnbm9kZScsIG5vZGVJbmRleCk7XG4gIHJldHVybiBleHRyYWN0UHJpbWl0aXZlc0ludGVybmFsKGdsdGYsIG5vZGVJbmRleCwgbm9kZSk7XG59XG5cbi8qKlxuICogRXh0cmFjdCBwcmltaXRpdmVzICggYFRIUkVFLk1lc2hbXWAgKSBvZiBub2RlcyBmcm9tIGEgbG9hZGVkIEdMVEYuXG4gKiBTZWUge0BsaW5rIGdsdGZFeHRyYWN0UHJpbWl0aXZlc0Zyb21Ob2RlfSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEl0IHJldHVybnMgYSBtYXAgZnJvbSBub2RlIGluZGV4IHRvIGV4dHJhY3Rpb24gcmVzdWx0LlxuICogSWYgYSBub2RlIGRvZXMgbm90IGhhdmUgYSBtZXNoLCB0aGUgZW50cnkgZm9yIHRoZSBub2RlIHdpbGwgbm90IGJlIHB1dCBpbiB0aGUgcmV0dXJuaW5nIG1hcC5cbiAqXG4gKiBAcGFyYW0gZ2x0ZiBBIEdMVEYgb2JqZWN0IHRha2VuIGZyb20gR0xURkxvYWRlclxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGVzKGdsdGY6IEdMVEYpOiBQcm9taXNlPE1hcDxudW1iZXIsIFRIUkVFLk1lc2hbXT4+IHtcbiAgY29uc3Qgbm9kZXM6IFRIUkVFLk9iamVjdDNEW10gPSBhd2FpdCBnbHRmLnBhcnNlci5nZXREZXBlbmRlbmNpZXMoJ25vZGUnKTtcbiAgY29uc3QgbWFwID0gbmV3IE1hcDxudW1iZXIsIFRIUkVFLk1lc2hbXT4oKTtcblxuICBub2Rlcy5mb3JFYWNoKChub2RlLCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IGV4dHJhY3RQcmltaXRpdmVzSW50ZXJuYWwoZ2x0ZiwgaW5kZXgsIG5vZGUpO1xuICAgIGlmIChyZXN1bHQgIT0gbnVsbCkge1xuICAgICAgbWFwLnNldChpbmRleCwgcmVzdWx0KTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBtYXA7XG59XG4iLCAiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uICovXG5cbmV4cG9ydCBjb25zdCBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSA9IHtcbiAgQWE6ICdhYScsXG4gIEloOiAnaWgnLFxuICBPdTogJ291JyxcbiAgRWU6ICdlZScsXG4gIE9oOiAnb2gnLFxuICBCbGluazogJ2JsaW5rJyxcbiAgSGFwcHk6ICdoYXBweScsXG4gIEFuZ3J5OiAnYW5ncnknLFxuICBTYWQ6ICdzYWQnLFxuICBSZWxheGVkOiAncmVsYXhlZCcsXG4gIExvb2tVcDogJ2xvb2tVcCcsXG4gIFN1cnByaXNlZDogJ3N1cnByaXNlZCcsXG4gIExvb2tEb3duOiAnbG9va0Rvd24nLFxuICBMb29rTGVmdDogJ2xvb2tMZWZ0JyxcbiAgTG9va1JpZ2h0OiAnbG9va1JpZ2h0JyxcbiAgQmxpbmtMZWZ0OiAnYmxpbmtMZWZ0JyxcbiAgQmxpbmtSaWdodDogJ2JsaW5rUmlnaHQnLFxuICBOZXV0cmFsOiAnbmV1dHJhbCcsXG59IGFzIGNvbnN0O1xuXG5leHBvcnQgdHlwZSBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSA9ICh0eXBlb2YgVlJNRXhwcmVzc2lvblByZXNldE5hbWUpW2tleW9mIHR5cGVvZiBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZV07XG4iLCAiLyoqXG4gKiBDbGFtcCB0aGUgaW5wdXQgdmFsdWUgd2l0aGluIFswLjAgLSAxLjBdLlxuICpcbiAqIEBwYXJhbSB2YWx1ZSBUaGUgaW5wdXQgdmFsdWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNhdHVyYXRlKHZhbHVlOiBudW1iZXIpOiBudW1iZXIge1xuICByZXR1cm4gTWF0aC5tYXgoTWF0aC5taW4odmFsdWUsIDEuMCksIDAuMCk7XG59XG4iLCAiaW1wb3J0IHsgVlJNRXhwcmVzc2lvblByZXNldE5hbWUgfSBmcm9tICcuL1ZSTUV4cHJlc3Npb25QcmVzZXROYW1lJztcbmltcG9ydCB7IHNhdHVyYXRlIH0gZnJvbSAnLi4vdXRpbHMvc2F0dXJhdGUnO1xuaW1wb3J0IHR5cGUgeyBWUk1FeHByZXNzaW9uIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uJztcblxuZXhwb3J0IGNsYXNzIFZSTUV4cHJlc3Npb25NYW5hZ2VyIHtcbiAgLyoqXG4gICAqIEEgc2V0IG9mIG5hbWUgb3IgcHJlc2V0IG5hbWUgb2YgZXhwcmVzc2lvbnMgdGhhdCB3aWxsIGJlIG92ZXJyaWRkZW4gYnkge0BsaW5rIFZSTUV4cHJlc3Npb24ub3ZlcnJpZGVCbGlua30uXG4gICAqL1xuICBwdWJsaWMgYmxpbmtFeHByZXNzaW9uTmFtZXMgPSBbJ2JsaW5rJywgJ2JsaW5rTGVmdCcsICdibGlua1JpZ2h0J107XG5cbiAgLyoqXG4gICAqIEEgc2V0IG9mIG5hbWUgb3IgcHJlc2V0IG5hbWUgb2YgZXhwcmVzc2lvbnMgdGhhdCB3aWxsIGJlIG92ZXJyaWRkZW4gYnkge0BsaW5rIFZSTUV4cHJlc3Npb24ub3ZlcnJpZGVMb29rQXR9LlxuICAgKi9cbiAgcHVibGljIGxvb2tBdEV4cHJlc3Npb25OYW1lcyA9IFsnbG9va0xlZnQnLCAnbG9va1JpZ2h0JywgJ2xvb2tVcCcsICdsb29rRG93biddO1xuXG4gIC8qKlxuICAgKiBBIHNldCBvZiBuYW1lIG9yIHByZXNldCBuYW1lIG9mIGV4cHJlc3Npb25zIHRoYXQgd2lsbCBiZSBvdmVycmlkZGVuIGJ5IHtAbGluayBWUk1FeHByZXNzaW9uLm92ZXJyaWRlTW91dGh9LlxuICAgKi9cbiAgcHVibGljIG1vdXRoRXhwcmVzc2lvbk5hbWVzID0gWydhYScsICdlZScsICdpaCcsICdvaCcsICdvdSddO1xuXG4gIC8qKlxuICAgKiBBIHNldCBvZiB7QGxpbmsgVlJNRXhwcmVzc2lvbn0uXG4gICAqIFdoZW4geW91IHdhbnQgdG8gcmVnaXN0ZXIgZXhwcmVzc2lvbnMsIHVzZSB7QGxpbmsgcmVnaXN0ZXJFeHByZXNzaW9ufVxuICAgKi9cbiAgcHJpdmF0ZSBfZXhwcmVzc2lvbnM6IFZSTUV4cHJlc3Npb25bXSA9IFtdO1xuICBwdWJsaWMgZ2V0IGV4cHJlc3Npb25zKCk6IFZSTUV4cHJlc3Npb25bXSB7XG4gICAgcmV0dXJuIHRoaXMuX2V4cHJlc3Npb25zLmNvbmNhdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgbWFwIGZyb20gbmFtZSB0byBleHByZXNzaW9uLlxuICAgKi9cbiAgcHJpdmF0ZSBfZXhwcmVzc2lvbk1hcDogeyBbbmFtZTogc3RyaW5nXTogVlJNRXhwcmVzc2lvbiB9ID0ge307XG4gIHB1YmxpYyBnZXQgZXhwcmVzc2lvbk1hcCgpOiB7IFtuYW1lOiBzdHJpbmddOiBWUk1FeHByZXNzaW9uIH0ge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB0aGlzLl9leHByZXNzaW9uTWFwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIG1hcCBmcm9tIG5hbWUgdG8gZXhwcmVzc2lvbiwgYnV0IGV4Y2x1ZGluZyBjdXN0b20gZXhwcmVzc2lvbnMuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHByZXNldEV4cHJlc3Npb25NYXAoKTogeyBbbmFtZSBpbiBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZV0/OiBWUk1FeHByZXNzaW9uIH0ge1xuICAgIGNvbnN0IHJlc3VsdDogeyBbbmFtZSBpbiBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZV0/OiBWUk1FeHByZXNzaW9uIH0gPSB7fTtcblxuICAgIGNvbnN0IHByZXNldE5hbWVTZXQgPSBuZXcgU2V0PHN0cmluZz4oT2JqZWN0LnZhbHVlcyhWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSkpO1xuXG4gICAgT2JqZWN0LmVudHJpZXModGhpcy5fZXhwcmVzc2lvbk1hcCkuZm9yRWFjaCgoW25hbWUsIGV4cHJlc3Npb25dKSA9PiB7XG4gICAgICBpZiAocHJlc2V0TmFtZVNldC5oYXMobmFtZSkpIHtcbiAgICAgICAgcmVzdWx0W25hbWUgYXMgVlJNRXhwcmVzc2lvblByZXNldE5hbWVdID0gZXhwcmVzc2lvbjtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQSBtYXAgZnJvbSBuYW1lIHRvIGV4cHJlc3Npb24sIGJ1dCBleGNsdWRpbmcgcHJlc2V0IGV4cHJlc3Npb25zLlxuICAgKi9cbiAgcHVibGljIGdldCBjdXN0b21FeHByZXNzaW9uTWFwKCk6IHsgW25hbWU6IHN0cmluZ106IFZSTUV4cHJlc3Npb24gfSB7XG4gICAgY29uc3QgcmVzdWx0OiB7IFtuYW1lOiBzdHJpbmddOiBWUk1FeHByZXNzaW9uIH0gPSB7fTtcblxuICAgIGNvbnN0IHByZXNldE5hbWVTZXQgPSBuZXcgU2V0PHN0cmluZz4oT2JqZWN0LnZhbHVlcyhWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSkpO1xuXG4gICAgT2JqZWN0LmVudHJpZXModGhpcy5fZXhwcmVzc2lvbk1hcCkuZm9yRWFjaCgoW25hbWUsIGV4cHJlc3Npb25dKSA9PiB7XG4gICAgICBpZiAoIXByZXNldE5hbWVTZXQuaGFzKG5hbWUpKSB7XG4gICAgICAgIHJlc3VsdFtuYW1lXSA9IGV4cHJlc3Npb247XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyB7QGxpbmsgVlJNRXhwcmVzc2lvbk1hbmFnZXJ9LlxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vIGRvIG5vdGhpbmdcbiAgfVxuXG4gIC8qKlxuICAgKiBDb3B5IHRoZSBnaXZlbiB7QGxpbmsgVlJNRXhwcmVzc2lvbk1hbmFnZXJ9IGludG8gdGhpcyBvbmUuXG4gICAqIEBwYXJhbSBzb3VyY2UgVGhlIHtAbGluayBWUk1FeHByZXNzaW9uTWFuYWdlcn0geW91IHdhbnQgdG8gY29weVxuICAgKiBAcmV0dXJucyB0aGlzXG4gICAqL1xuICBwdWJsaWMgY29weShzb3VyY2U6IFZSTUV4cHJlc3Npb25NYW5hZ2VyKTogdGhpcyB7XG4gICAgLy8gZmlyc3QgdW5yZWdpc3RlciBhbGwgdGhlIGV4cHJlc3Npb24gaXQgaGFzXG4gICAgY29uc3QgZXhwcmVzc2lvbnMgPSB0aGlzLl9leHByZXNzaW9ucy5jb25jYXQoKTtcbiAgICBleHByZXNzaW9ucy5mb3JFYWNoKChleHByZXNzaW9uKSA9PiB7XG4gICAgICB0aGlzLnVucmVnaXN0ZXJFeHByZXNzaW9uKGV4cHJlc3Npb24pO1xuICAgIH0pO1xuXG4gICAgLy8gdGhlbiByZWdpc3RlciBhbGwgdGhlIGV4cHJlc3Npb24gb2YgdGhlIHNvdXJjZVxuICAgIHNvdXJjZS5fZXhwcmVzc2lvbnMuZm9yRWFjaCgoZXhwcmVzc2lvbikgPT4ge1xuICAgICAgdGhpcy5yZWdpc3RlckV4cHJlc3Npb24oZXhwcmVzc2lvbik7XG4gICAgfSk7XG5cbiAgICAvLyBjb3B5IHJlbWFpbmluZyBtZW1iZXJzXG4gICAgdGhpcy5ibGlua0V4cHJlc3Npb25OYW1lcyA9IHNvdXJjZS5ibGlua0V4cHJlc3Npb25OYW1lcy5jb25jYXQoKTtcbiAgICB0aGlzLmxvb2tBdEV4cHJlc3Npb25OYW1lcyA9IHNvdXJjZS5sb29rQXRFeHByZXNzaW9uTmFtZXMuY29uY2F0KCk7XG4gICAgdGhpcy5tb3V0aEV4cHJlc3Npb25OYW1lcyA9IHNvdXJjZS5tb3V0aEV4cHJlc3Npb25OYW1lcy5jb25jYXQoKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBjbG9uZSBvZiB0aGlzIHtAbGluayBWUk1FeHByZXNzaW9uTWFuYWdlcn0uXG4gICAqIEByZXR1cm5zIENvcGllZCB7QGxpbmsgVlJNRXhwcmVzc2lvbk1hbmFnZXJ9XG4gICAqL1xuICBwdWJsaWMgY2xvbmUoKTogVlJNRXhwcmVzc2lvbk1hbmFnZXIge1xuICAgIHJldHVybiBuZXcgVlJNRXhwcmVzc2lvbk1hbmFnZXIoKS5jb3B5KHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhIHJlZ2lzdGVyZWQgZXhwcmVzc2lvbi5cbiAgICogSWYgaXQgY2Fubm90IGZpbmQgYW4gZXhwcmVzc2lvbiwgaXQgd2lsbCByZXR1cm4gYG51bGxgIGluc3RlYWQuXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb3IgcHJlc2V0IG5hbWUgb2YgdGhlIGV4cHJlc3Npb25cbiAgICovXG4gIHB1YmxpYyBnZXRFeHByZXNzaW9uKG5hbWU6IFZSTUV4cHJlc3Npb25QcmVzZXROYW1lIHwgc3RyaW5nKTogVlJNRXhwcmVzc2lvbiB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl9leHByZXNzaW9uTWFwW25hbWVdID8/IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXIgYW4gZXhwcmVzc2lvbi5cbiAgICpcbiAgICogQHBhcmFtIGV4cHJlc3Npb24ge0BsaW5rIFZSTUV4cHJlc3Npb259IHRoYXQgZGVzY3JpYmVzIHRoZSBleHByZXNzaW9uXG4gICAqL1xuICBwdWJsaWMgcmVnaXN0ZXJFeHByZXNzaW9uKGV4cHJlc3Npb246IFZSTUV4cHJlc3Npb24pOiB2b2lkIHtcbiAgICB0aGlzLl9leHByZXNzaW9ucy5wdXNoKGV4cHJlc3Npb24pO1xuICAgIHRoaXMuX2V4cHJlc3Npb25NYXBbZXhwcmVzc2lvbi5leHByZXNzaW9uTmFtZV0gPSBleHByZXNzaW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIFVucmVnaXN0ZXIgYW4gZXhwcmVzc2lvbi5cbiAgICpcbiAgICogQHBhcmFtIGV4cHJlc3Npb24gVGhlIGV4cHJlc3Npb24geW91IHdhbnQgdG8gdW5yZWdpc3RlclxuICAgKi9cbiAgcHVibGljIHVucmVnaXN0ZXJFeHByZXNzaW9uKGV4cHJlc3Npb246IFZSTUV4cHJlc3Npb24pOiB2b2lkIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuX2V4cHJlc3Npb25zLmluZGV4T2YoZXhwcmVzc2lvbik7XG4gICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgY29uc29sZS53YXJuKCdWUk1FeHByZXNzaW9uTWFuYWdlcjogVGhlIHNwZWNpZmllZCBleHByZXNzaW9ucyBpcyBub3QgcmVnaXN0ZXJlZCcpO1xuICAgIH1cblxuICAgIHRoaXMuX2V4cHJlc3Npb25zLnNwbGljZShpbmRleCwgMSk7XG4gICAgZGVsZXRlIHRoaXMuX2V4cHJlc3Npb25NYXBbZXhwcmVzc2lvbi5leHByZXNzaW9uTmFtZV07XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBjdXJyZW50IHdlaWdodCBvZiB0aGUgc3BlY2lmaWVkIGV4cHJlc3Npb24uXG4gICAqIElmIGl0IGRvZXNuJ3QgaGF2ZSBhbiBleHByZXNzaW9uIG9mIGdpdmVuIG5hbWUsIGl0IHdpbGwgcmV0dXJuIGBudWxsYCBpbnN0ZWFkLlxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBleHByZXNzaW9uXG4gICAqL1xuICBwdWJsaWMgZ2V0VmFsdWUobmFtZTogVlJNRXhwcmVzc2lvblByZXNldE5hbWUgfCBzdHJpbmcpOiBudW1iZXIgfCBudWxsIHtcbiAgICBjb25zdCBleHByZXNzaW9uID0gdGhpcy5nZXRFeHByZXNzaW9uKG5hbWUpO1xuICAgIHJldHVybiBleHByZXNzaW9uPy53ZWlnaHQgPz8gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgYSB3ZWlnaHQgdG8gdGhlIHNwZWNpZmllZCBleHByZXNzaW9uLlxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBleHByZXNzaW9uXG4gICAqIEBwYXJhbSB3ZWlnaHQgV2VpZ2h0XG4gICAqL1xuICBwdWJsaWMgc2V0VmFsdWUobmFtZTogVlJNRXhwcmVzc2lvblByZXNldE5hbWUgfCBzdHJpbmcsIHdlaWdodDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgZXhwcmVzc2lvbiA9IHRoaXMuZ2V0RXhwcmVzc2lvbihuYW1lKTtcbiAgICBpZiAoZXhwcmVzc2lvbikge1xuICAgICAgZXhwcmVzc2lvbi53ZWlnaHQgPSBzYXR1cmF0ZSh3ZWlnaHQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB3ZWlnaHRzIG9mIGFsbCBleHByZXNzaW9ucyB0byBgMC4wYC5cbiAgICovXG4gIHB1YmxpYyByZXNldFZhbHVlcygpOiB2b2lkIHtcbiAgICB0aGlzLl9leHByZXNzaW9ucy5mb3JFYWNoKChleHByZXNzaW9uKSA9PiB7XG4gICAgICBleHByZXNzaW9uLndlaWdodCA9IDAuMDtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSB0cmFjayBuYW1lIG9mIHNwZWNpZmllZCBleHByZXNzaW9uLlxuICAgKiBUaGlzIHRyYWNrIG5hbWUgaXMgbmVlZGVkIHRvIG1hbmlwdWxhdGUgaXRzIGV4cHJlc3Npb24gdmlhIGtleWZyYW1lIGFuaW1hdGlvbnMuXG4gICAqXG4gICAqIEBleGFtcGxlIE1hbmlwdWxhdGUgYW4gZXhwcmVzc2lvbiB1c2luZyBrZXlmcmFtZSBhbmltYXRpb25cbiAgICogYGBganNcbiAgICogY29uc3QgdHJhY2tOYW1lID0gdnJtLmV4cHJlc3Npb25NYW5hZ2VyLmdldEV4cHJlc3Npb25UcmFja05hbWUoICdibGluaycgKTtcbiAgICogY29uc3QgdHJhY2sgPSBuZXcgVEhSRUUuTnVtYmVyS2V5ZnJhbWVUcmFjayhcbiAgICogICBuYW1lLFxuICAgKiAgIFsgMC4wLCAwLjUsIDEuMCBdLCAvLyB0aW1lc1xuICAgKiAgIFsgMC4wLCAxLjAsIDAuMCBdIC8vIHZhbHVlc1xuICAgKiApO1xuICAgKlxuICAgKiBjb25zdCBjbGlwID0gbmV3IFRIUkVFLkFuaW1hdGlvbkNsaXAoXG4gICAqICAgJ2JsaW5rJywgLy8gbmFtZVxuICAgKiAgIDEuMCwgLy8gZHVyYXRpb25cbiAgICogICBbIHRyYWNrIF0gLy8gdHJhY2tzXG4gICAqICk7XG4gICAqXG4gICAqIGNvbnN0IG1peGVyID0gbmV3IFRIUkVFLkFuaW1hdGlvbk1peGVyKCB2cm0uc2NlbmUgKTtcbiAgICogY29uc3QgYWN0aW9uID0gbWl4ZXIuY2xpcEFjdGlvbiggY2xpcCApO1xuICAgKiBhY3Rpb24ucGxheSgpO1xuICAgKiBgYGBcbiAgICpcbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgZXhwcmVzc2lvblxuICAgKi9cbiAgcHVibGljIGdldEV4cHJlc3Npb25UcmFja05hbWUobmFtZTogVlJNRXhwcmVzc2lvblByZXNldE5hbWUgfCBzdHJpbmcpOiBzdHJpbmcgfCBudWxsIHtcbiAgICBjb25zdCBleHByZXNzaW9uID0gdGhpcy5nZXRFeHByZXNzaW9uKG5hbWUpO1xuICAgIHJldHVybiBleHByZXNzaW9uID8gYCR7ZXhwcmVzc2lvbi5uYW1lfS53ZWlnaHRgIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgZXZlcnkgZXhwcmVzc2lvbnMuXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIC8vIHNlZSBob3cgbXVjaCB3ZSBzaG91bGQgb3ZlcnJpZGUgY2VydGFpbiBleHByZXNzaW9uc1xuICAgIGNvbnN0IHdlaWdodE11bHRpcGxpZXJzID0gdGhpcy5fY2FsY3VsYXRlV2VpZ2h0TXVsdGlwbGllcnMoKTtcblxuICAgIC8vIHJlc2V0IGV4cHJlc3Npb24gYmluZHMgZmlyc3RcbiAgICB0aGlzLl9leHByZXNzaW9ucy5mb3JFYWNoKChleHByZXNzaW9uKSA9PiB7XG4gICAgICBleHByZXNzaW9uLmNsZWFyQXBwbGllZFdlaWdodCgpO1xuICAgIH0pO1xuXG4gICAgLy8gdGhlbiBhcHBseSBiaW5kc1xuICAgIHRoaXMuX2V4cHJlc3Npb25zLmZvckVhY2goKGV4cHJlc3Npb24pID0+IHtcbiAgICAgIGxldCBtdWx0aXBsaWVyID0gMS4wO1xuICAgICAgY29uc3QgbmFtZSA9IGV4cHJlc3Npb24uZXhwcmVzc2lvbk5hbWU7XG5cbiAgICAgIGlmICh0aGlzLmJsaW5rRXhwcmVzc2lvbk5hbWVzLmluZGV4T2YobmFtZSkgIT09IC0xKSB7XG4gICAgICAgIG11bHRpcGxpZXIgKj0gd2VpZ2h0TXVsdGlwbGllcnMuYmxpbms7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmxvb2tBdEV4cHJlc3Npb25OYW1lcy5pbmRleE9mKG5hbWUpICE9PSAtMSkge1xuICAgICAgICBtdWx0aXBsaWVyICo9IHdlaWdodE11bHRpcGxpZXJzLmxvb2tBdDtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMubW91dGhFeHByZXNzaW9uTmFtZXMuaW5kZXhPZihuYW1lKSAhPT0gLTEpIHtcbiAgICAgICAgbXVsdGlwbGllciAqPSB3ZWlnaHRNdWx0aXBsaWVycy5tb3V0aDtcbiAgICAgIH1cblxuICAgICAgZXhwcmVzc2lvbi5hcHBseVdlaWdodCh7IG11bHRpcGxpZXIgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlIHN1bSBvZiBvdmVycmlkZSBhbW91bnRzIHRvIHNlZSBob3cgbXVjaCB3ZSBzaG91bGQgbXVsdGlwbHkgd2VpZ2h0cyBvZiBjZXJ0YWluIGV4cHJlc3Npb25zLlxuICAgKi9cbiAgcHJpdmF0ZSBfY2FsY3VsYXRlV2VpZ2h0TXVsdGlwbGllcnMoKToge1xuICAgIGJsaW5rOiBudW1iZXI7XG4gICAgbG9va0F0OiBudW1iZXI7XG4gICAgbW91dGg6IG51bWJlcjtcbiAgfSB7XG4gICAgbGV0IGJsaW5rID0gMS4wO1xuICAgIGxldCBsb29rQXQgPSAxLjA7XG4gICAgbGV0IG1vdXRoID0gMS4wO1xuXG4gICAgdGhpcy5fZXhwcmVzc2lvbnMuZm9yRWFjaCgoZXhwcmVzc2lvbikgPT4ge1xuICAgICAgYmxpbmsgLT0gZXhwcmVzc2lvbi5vdmVycmlkZUJsaW5rQW1vdW50O1xuICAgICAgbG9va0F0IC09IGV4cHJlc3Npb24ub3ZlcnJpZGVMb29rQXRBbW91bnQ7XG4gICAgICBtb3V0aCAtPSBleHByZXNzaW9uLm92ZXJyaWRlTW91dGhBbW91bnQ7XG4gICAgfSk7XG5cbiAgICBibGluayA9IE1hdGgubWF4KDAuMCwgYmxpbmspO1xuICAgIGxvb2tBdCA9IE1hdGgubWF4KDAuMCwgbG9va0F0KTtcbiAgICBtb3V0aCA9IE1hdGgubWF4KDAuMCwgbW91dGgpO1xuXG4gICAgcmV0dXJuIHsgYmxpbmssIGxvb2tBdCwgbW91dGggfTtcbiAgfVxufVxuIiwgIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiAqL1xuXG5leHBvcnQgY29uc3QgVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JUeXBlID0ge1xuICBDb2xvcjogJ2NvbG9yJyxcbiAgRW1pc3Npb25Db2xvcjogJ2VtaXNzaW9uQ29sb3InLFxuICBTaGFkZUNvbG9yOiAnc2hhZGVDb2xvcicsXG4gIE1hdGNhcENvbG9yOiAnbWF0Y2FwQ29sb3InLFxuICBSaW1Db2xvcjogJ3JpbUNvbG9yJyxcbiAgT3V0bGluZUNvbG9yOiAnb3V0bGluZUNvbG9yJyxcbn0gYXMgY29uc3Q7XG5cbmV4cG9ydCB0eXBlIFZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yVHlwZSA9XG4gICh0eXBlb2YgVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JUeXBlKVtrZXlvZiB0eXBlb2YgVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JUeXBlXTtcblxuZXhwb3J0IGNvbnN0IHYwRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JNYXA6IHsgW2tleTogc3RyaW5nXTogVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JUeXBlIHwgdW5kZWZpbmVkIH0gPSB7XG4gIF9Db2xvcjogVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JUeXBlLkNvbG9yLFxuICBfRW1pc3Npb25Db2xvcjogVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JUeXBlLkVtaXNzaW9uQ29sb3IsXG4gIF9TaGFkZUNvbG9yOiBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGUuU2hhZGVDb2xvcixcbiAgX1JpbUNvbG9yOiBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGUuUmltQ29sb3IsXG4gIF9PdXRsaW5lQ29sb3I6IFZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yVHlwZS5PdXRsaW5lQ29sb3IsXG59O1xuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB0eXBlIHsgVlJNRXhwcmVzc2lvbkJpbmQgfSBmcm9tICcuL1ZSTUV4cHJlc3Npb25CaW5kJztcbmltcG9ydCB0eXBlIHsgVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JUeXBlIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGUnO1xuXG5jb25zdCBfY29sb3IgPSBuZXcgVEhSRUUuQ29sb3IoKTtcblxuaW50ZXJmYWNlIENvbG9yQmluZFN0YXRlIHtcbiAgcHJvcGVydHlOYW1lOiBzdHJpbmc7XG4gIGluaXRpYWxWYWx1ZTogVEhSRUUuQ29sb3I7XG4gIGRlbHRhVmFsdWU6IFRIUkVFLkNvbG9yO1xufVxuXG5pbnRlcmZhY2UgQWxwaGFCaW5kU3RhdGUge1xuICBwcm9wZXJ0eU5hbWU6IHN0cmluZztcbiAgaW5pdGlhbFZhbHVlOiBudW1iZXI7XG4gIGRlbHRhVmFsdWU6IG51bWJlcjtcbn1cblxuaW50ZXJmYWNlIEJpbmRTdGF0ZSB7XG4gIGNvbG9yOiBDb2xvckJpbmRTdGF0ZSB8IG51bGw7XG4gIGFscGhhOiBBbHBoYUJpbmRTdGF0ZSB8IG51bGw7XG59XG5cbi8qKlxuICogQSBiaW5kIG9mIGV4cHJlc3Npb24gaW5mbHVlbmNlcyB0byBhIG1hdGVyaWFsIGNvbG9yLlxuICovXG5leHBvcnQgY2xhc3MgVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JCaW5kIGltcGxlbWVudHMgVlJNRXhwcmVzc2lvbkJpbmQge1xuICAvKipcbiAgICogTWFwcGluZyBvZiBwcm9wZXJ0eSBuYW1lcyBmcm9tIFZSTUMvbWF0ZXJpYWxDb2xvckJpbmRzLnR5cGUgdG8gdGhyZWUuanMvTWF0ZXJpYWwuXG4gICAqIFRoZSBmaXJzdCBlbGVtZW50IHN0YW5kcyBmb3IgY29sb3IgY2hhbm5lbHMsIHRoZSBzZWNvbmQgZWxlbWVudCBzdGFuZHMgZm9yIHRoZSBhbHBoYSBjaGFubmVsLlxuICAgKiBUaGUgc2Vjb25kIGVsZW1lbnQgY2FuIGJlIG51bGwgaWYgdGhlIHRhcmdldCBwcm9wZXJ0eSBkb2Vzbid0IGV4aXN0LlxuICAgKi9cbiAgLy8gVE9ETzogV2UgbWlnaHQgd2FudCB0byB1c2UgdGhlIGBzYXRpc2ZpZXNgIG9wZXJhdG9yIG9uY2Ugd2UgYnVtcCBUUyB0byA0Ljkgb3IgaGlnaGVyXG4gIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL3BpeGl2L3RocmVlLXZybS9wdWxsLzEzMjMjZGlzY3Vzc2lvbl9yMTM3NDAyMDAzNVxuICBwcml2YXRlIHN0YXRpYyBfcHJvcGVydHlOYW1lTWFwTWFwOiB7XG4gICAgW2Rpc3Rpbmd1aXNoZXI6IHN0cmluZ106IHsgW3R5cGUgaW4gVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JUeXBlXT86IHJlYWRvbmx5IFtzdHJpbmcsIHN0cmluZyB8IG51bGxdIH07XG4gIH0gPSB7XG4gICAgaXNNZXNoU3RhbmRhcmRNYXRlcmlhbDoge1xuICAgICAgY29sb3I6IFsnY29sb3InLCAnb3BhY2l0eSddLFxuICAgICAgZW1pc3Npb25Db2xvcjogWydlbWlzc2l2ZScsIG51bGxdLFxuICAgIH0sXG4gICAgaXNNZXNoQmFzaWNNYXRlcmlhbDoge1xuICAgICAgY29sb3I6IFsnY29sb3InLCAnb3BhY2l0eSddLFxuICAgIH0sXG4gICAgaXNNVG9vbk1hdGVyaWFsOiB7XG4gICAgICBjb2xvcjogWydjb2xvcicsICdvcGFjaXR5J10sXG4gICAgICBlbWlzc2lvbkNvbG9yOiBbJ2VtaXNzaXZlJywgbnVsbF0sXG4gICAgICBvdXRsaW5lQ29sb3I6IFsnb3V0bGluZUNvbG9yRmFjdG9yJywgbnVsbF0sXG4gICAgICBtYXRjYXBDb2xvcjogWydtYXRjYXBGYWN0b3InLCBudWxsXSxcbiAgICAgIHJpbUNvbG9yOiBbJ3BhcmFtZXRyaWNSaW1Db2xvckZhY3RvcicsIG51bGxdLFxuICAgICAgc2hhZGVDb2xvcjogWydzaGFkZUNvbG9yRmFjdG9yJywgbnVsbF0sXG4gICAgfSxcbiAgfTtcblxuICAvKipcbiAgICogVGhlIHRhcmdldCBtYXRlcmlhbC5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBtYXRlcmlhbDogVEhSRUUuTWF0ZXJpYWw7XG5cbiAgLyoqXG4gICAqIFRoZSB0eXBlIG9mIHRoZSB0YXJnZXQgcHJvcGVydHkgb2YgdGhlIG1hdGVyaWFsLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IHR5cGU6IFZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yVHlwZTtcblxuICAvKipcbiAgICogVGhlIHRhcmdldCBjb2xvci5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSB0YXJnZXRWYWx1ZTogVEhSRUUuQ29sb3I7XG5cbiAgLyoqXG4gICAqIFRoZSB0YXJnZXQgYWxwaGEuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgdGFyZ2V0QWxwaGE6IG51bWJlcjtcblxuICAvKipcbiAgICogSXRzIGJpbmRpbmcgc3RhdGUuXG4gICAqIElmIGl0IGNhbm5vdCBmaW5kIHRoZSB0YXJnZXQgcHJvcGVydHkgaW4gdGhlIGNvbnN0cnVjdG9yLCBlYWNoIHByb3BlcnR5IHdpbGwgYmUgbnVsbCBpbnN0ZWFkLlxuICAgKi9cbiAgcHJpdmF0ZSBfc3RhdGU6IEJpbmRTdGF0ZTtcblxuICBwdWJsaWMgY29uc3RydWN0b3Ioe1xuICAgIG1hdGVyaWFsLFxuICAgIHR5cGUsXG4gICAgdGFyZ2V0VmFsdWUsXG4gICAgdGFyZ2V0QWxwaGEsXG4gIH06IHtcbiAgICAvKipcbiAgICAgKiBUaGUgdGFyZ2V0IG1hdGVyaWFsLlxuICAgICAqL1xuICAgIG1hdGVyaWFsOiBUSFJFRS5NYXRlcmlhbDtcblxuICAgIC8qKlxuICAgICAqIFRoZSB0eXBlIG9mIHRoZSB0YXJnZXQgcHJvcGVydHkgb2YgdGhlIG1hdGVyaWFsLlxuICAgICAqL1xuICAgIHR5cGU6IFZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yVHlwZTtcblxuICAgIC8qKlxuICAgICAqIFRoZSB0YXJnZXQgY29sb3IuXG4gICAgICovXG4gICAgdGFyZ2V0VmFsdWU6IFRIUkVFLkNvbG9yO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHRhcmdldCBhbHBoYS5cbiAgICAgKi9cbiAgICB0YXJnZXRBbHBoYT86IG51bWJlcjtcbiAgfSkge1xuICAgIHRoaXMubWF0ZXJpYWwgPSBtYXRlcmlhbDtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMudGFyZ2V0VmFsdWUgPSB0YXJnZXRWYWx1ZTtcbiAgICB0aGlzLnRhcmdldEFscGhhID0gdGFyZ2V0QWxwaGEgPz8gMS4wO1xuXG4gICAgLy8gaW5pdCBiaW5kIHN0YXRlXG4gICAgY29uc3QgY29sb3IgPSB0aGlzLl9pbml0Q29sb3JCaW5kU3RhdGUoKTtcbiAgICBjb25zdCBhbHBoYSA9IHRoaXMuX2luaXRBbHBoYUJpbmRTdGF0ZSgpO1xuICAgIHRoaXMuX3N0YXRlID0geyBjb2xvciwgYWxwaGEgfTtcbiAgfVxuXG4gIHB1YmxpYyBhcHBseVdlaWdodCh3ZWlnaHQ6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IHsgY29sb3IsIGFscGhhIH0gPSB0aGlzLl9zdGF0ZTtcblxuICAgIGlmIChjb2xvciAhPSBudWxsKSB7XG4gICAgICBjb25zdCB7IHByb3BlcnR5TmFtZSwgZGVsdGFWYWx1ZSB9ID0gY29sb3I7XG5cbiAgICAgIGNvbnN0IHRhcmdldCA9ICh0aGlzLm1hdGVyaWFsIGFzIGFueSlbcHJvcGVydHlOYW1lXSBhcyBUSFJFRS5Db2xvcjtcbiAgICAgIGlmICh0YXJnZXQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRhcmdldC5hZGQoX2NvbG9yLmNvcHkoZGVsdGFWYWx1ZSkubXVsdGlwbHlTY2FsYXIod2VpZ2h0KSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGFscGhhICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IHsgcHJvcGVydHlOYW1lLCBkZWx0YVZhbHVlIH0gPSBhbHBoYTtcblxuICAgICAgY29uc3QgdGFyZ2V0ID0gKHRoaXMubWF0ZXJpYWwgYXMgYW55KVtwcm9wZXJ0eU5hbWVdIGFzIG51bWJlcjtcbiAgICAgIGlmICh0YXJnZXQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICgodGhpcy5tYXRlcmlhbCBhcyBhbnkpW3Byb3BlcnR5TmFtZV0gYXMgbnVtYmVyKSArPSBkZWx0YVZhbHVlICogd2VpZ2h0O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBjbGVhckFwcGxpZWRXZWlnaHQoKTogdm9pZCB7XG4gICAgY29uc3QgeyBjb2xvciwgYWxwaGEgfSA9IHRoaXMuX3N0YXRlO1xuXG4gICAgaWYgKGNvbG9yICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IHsgcHJvcGVydHlOYW1lLCBpbml0aWFsVmFsdWUgfSA9IGNvbG9yO1xuXG4gICAgICBjb25zdCB0YXJnZXQgPSAodGhpcy5tYXRlcmlhbCBhcyBhbnkpW3Byb3BlcnR5TmFtZV0gYXMgVEhSRUUuQ29sb3I7XG4gICAgICBpZiAodGFyZ2V0ICE9IHVuZGVmaW5lZCkge1xuICAgICAgICB0YXJnZXQuY29weShpbml0aWFsVmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChhbHBoYSAhPSBudWxsKSB7XG4gICAgICBjb25zdCB7IHByb3BlcnR5TmFtZSwgaW5pdGlhbFZhbHVlIH0gPSBhbHBoYTtcblxuICAgICAgY29uc3QgdGFyZ2V0ID0gKHRoaXMubWF0ZXJpYWwgYXMgYW55KVtwcm9wZXJ0eU5hbWVdIGFzIG51bWJlcjtcbiAgICAgIGlmICh0YXJnZXQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICgodGhpcy5tYXRlcmlhbCBhcyBhbnkpW3Byb3BlcnR5TmFtZV0gYXMgbnVtYmVyKSA9IGluaXRpYWxWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9pbml0Q29sb3JCaW5kU3RhdGUoKTogQ29sb3JCaW5kU3RhdGUgfCBudWxsIHtcbiAgICBjb25zdCB7IG1hdGVyaWFsLCB0eXBlLCB0YXJnZXRWYWx1ZSB9ID0gdGhpcztcblxuICAgIGNvbnN0IHByb3BlcnR5TmFtZU1hcCA9IHRoaXMuX2dldFByb3BlcnR5TmFtZU1hcCgpO1xuICAgIGNvbnN0IHByb3BlcnR5TmFtZSA9IHByb3BlcnR5TmFtZU1hcD8uW3R5cGVdPy5bMF0gPz8gbnVsbDtcblxuICAgIGlmIChwcm9wZXJ0eU5hbWUgPT0gbnVsbCkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBgVHJpZWQgdG8gYWRkIGEgbWF0ZXJpYWwgY29sb3IgYmluZCB0byB0aGUgbWF0ZXJpYWwgJHtcbiAgICAgICAgICBtYXRlcmlhbC5uYW1lID8/ICcobm8gbmFtZSknXG4gICAgICAgIH0sIHRoZSB0eXBlICR7dHlwZX0gYnV0IHRoZSBtYXRlcmlhbCBvciB0aGUgdHlwZSBpcyBub3Qgc3VwcG9ydGVkLmAsXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCB0YXJnZXQgPSAobWF0ZXJpYWwgYXMgYW55KVtwcm9wZXJ0eU5hbWVdIGFzIFRIUkVFLkNvbG9yO1xuXG4gICAgY29uc3QgaW5pdGlhbFZhbHVlID0gdGFyZ2V0LmNsb25lKCk7XG5cbiAgICAvLyBcdThDQTBcdTMwNkVcdTUwMjRcdTMwOTJcdTRGRERcdTYzMDFcdTMwNTlcdTMwOEJcdTMwNUZcdTMwODFcdTMwNkJDb2xvci5zdWJcdTMwOTJcdTRGN0ZcdTMwOEZcdTMwNUFcdTMwNkJcdTVERUVcdTUyMDZcdTMwOTJcdThBMDhcdTdCOTdcdTMwNTlcdTMwOEJcbiAgICBjb25zdCBkZWx0YVZhbHVlID0gbmV3IFRIUkVFLkNvbG9yKFxuICAgICAgdGFyZ2V0VmFsdWUuciAtIGluaXRpYWxWYWx1ZS5yLFxuICAgICAgdGFyZ2V0VmFsdWUuZyAtIGluaXRpYWxWYWx1ZS5nLFxuICAgICAgdGFyZ2V0VmFsdWUuYiAtIGluaXRpYWxWYWx1ZS5iLFxuICAgICk7XG5cbiAgICByZXR1cm4geyBwcm9wZXJ0eU5hbWUsIGluaXRpYWxWYWx1ZSwgZGVsdGFWYWx1ZSB9O1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEFscGhhQmluZFN0YXRlKCk6IEFscGhhQmluZFN0YXRlIHwgbnVsbCB7XG4gICAgY29uc3QgeyBtYXRlcmlhbCwgdHlwZSwgdGFyZ2V0QWxwaGEgfSA9IHRoaXM7XG5cbiAgICBjb25zdCBwcm9wZXJ0eU5hbWVNYXAgPSB0aGlzLl9nZXRQcm9wZXJ0eU5hbWVNYXAoKTtcbiAgICBjb25zdCBwcm9wZXJ0eU5hbWUgPSBwcm9wZXJ0eU5hbWVNYXA/Llt0eXBlXT8uWzFdID8/IG51bGw7XG5cbiAgICBpZiAocHJvcGVydHlOYW1lID09IG51bGwgJiYgdGFyZ2V0QWxwaGEgIT09IDEuMCkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBgVHJpZWQgdG8gYWRkIGEgbWF0ZXJpYWwgYWxwaGEgYmluZCB0byB0aGUgbWF0ZXJpYWwgJHtcbiAgICAgICAgICBtYXRlcmlhbC5uYW1lID8/ICcobm8gbmFtZSknXG4gICAgICAgIH0sIHRoZSB0eXBlICR7dHlwZX0gYnV0IHRoZSBtYXRlcmlhbCBvciB0aGUgdHlwZSBkb2VzIG5vdCBzdXBwb3J0IGFscGhhLmAsXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAocHJvcGVydHlOYW1lID09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGluaXRpYWxWYWx1ZSA9IChtYXRlcmlhbCBhcyBhbnkpW3Byb3BlcnR5TmFtZV0gYXMgbnVtYmVyO1xuXG4gICAgY29uc3QgZGVsdGFWYWx1ZSA9IHRhcmdldEFscGhhIC0gaW5pdGlhbFZhbHVlO1xuXG4gICAgcmV0dXJuIHsgcHJvcGVydHlOYW1lLCBpbml0aWFsVmFsdWUsIGRlbHRhVmFsdWUgfTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldFByb3BlcnR5TmFtZU1hcCgpOlxuICAgIHwgeyBbdHlwZSBpbiBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGVdPzogcmVhZG9ubHkgW3N0cmluZywgc3RyaW5nIHwgbnVsbF0gfVxuICAgIHwgbnVsbCB7XG4gICAgcmV0dXJuIChcbiAgICAgIE9iamVjdC5lbnRyaWVzKFZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yQmluZC5fcHJvcGVydHlOYW1lTWFwTWFwKS5maW5kKChbZGlzdGluZ3Vpc2hlcl0pID0+IHtcbiAgICAgICAgcmV0dXJuICh0aGlzLm1hdGVyaWFsIGFzIGFueSlbZGlzdGluZ3Vpc2hlcl0gPT09IHRydWU7XG4gICAgICB9KT8uWzFdID8/IG51bGxcbiAgICApO1xuICB9XG59XG4iLCAiaW1wb3J0IHR5cGUgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgdHlwZSB7IFZSTUV4cHJlc3Npb25CaW5kIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uQmluZCc7XG5cbi8qKlxuICogQSBiaW5kIG9mIHtAbGluayBWUk1FeHByZXNzaW9ufSBpbmZsdWVuY2VzIHRvIG1vcnBoIHRhcmdldHMuXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1FeHByZXNzaW9uTW9ycGhUYXJnZXRCaW5kIGltcGxlbWVudHMgVlJNRXhwcmVzc2lvbkJpbmQge1xuICAvKipcbiAgICogVGhlIG1lc2ggcHJpbWl0aXZlcyB0aGF0IGF0dGFjaGVkIHRvIHRhcmdldCBtZXNoLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IHByaW1pdGl2ZXM6IFRIUkVFLk1lc2hbXTtcblxuICAvKipcbiAgICogVGhlIGluZGV4IG9mIHRoZSBtb3JwaCB0YXJnZXQgaW4gdGhlIG1lc2guXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgaW5kZXg6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIHdlaWdodCB2YWx1ZSBvZiB0YXJnZXQgbW9ycGggdGFyZ2V0LiBSYW5naW5nIGluIFswLjAgLSAxLjBdLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IHdlaWdodDogbnVtYmVyO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcih7XG4gICAgcHJpbWl0aXZlcyxcbiAgICBpbmRleCxcbiAgICB3ZWlnaHQsXG4gIH06IHtcbiAgICAvKipcbiAgICAgKiBUaGUgbWVzaCBwcmltaXRpdmVzIHRoYXQgYXR0YWNoZWQgdG8gdGFyZ2V0IG1lc2guXG4gICAgICovXG4gICAgcHJpbWl0aXZlczogVEhSRUUuTWVzaFtdO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGluZGV4IG9mIHRoZSBtb3JwaCB0YXJnZXQgaW4gdGhlIG1lc2guXG4gICAgICovXG4gICAgaW5kZXg6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIFRoZSB3ZWlnaHQgdmFsdWUgb2YgdGFyZ2V0IG1vcnBoIHRhcmdldC4gUmFuZ2luZyBpbiBbMC4wIC0gMS4wXS5cbiAgICAgKi9cbiAgICB3ZWlnaHQ6IG51bWJlcjtcbiAgfSkge1xuICAgIHRoaXMucHJpbWl0aXZlcyA9IHByaW1pdGl2ZXM7XG4gICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgIHRoaXMud2VpZ2h0ID0gd2VpZ2h0O1xuICB9XG5cbiAgcHVibGljIGFwcGx5V2VpZ2h0KHdlaWdodDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5wcmltaXRpdmVzLmZvckVhY2goKG1lc2gpID0+IHtcbiAgICAgIGlmIChtZXNoLm1vcnBoVGFyZ2V0SW5mbHVlbmNlcz8uW3RoaXMuaW5kZXhdICE9IG51bGwpIHtcbiAgICAgICAgbWVzaC5tb3JwaFRhcmdldEluZmx1ZW5jZXNbdGhpcy5pbmRleF0gKz0gdGhpcy53ZWlnaHQgKiB3ZWlnaHQ7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgY2xlYXJBcHBsaWVkV2VpZ2h0KCk6IHZvaWQge1xuICAgIHRoaXMucHJpbWl0aXZlcy5mb3JFYWNoKChtZXNoKSA9PiB7XG4gICAgICBpZiAobWVzaC5tb3JwaFRhcmdldEluZmx1ZW5jZXM/Llt0aGlzLmluZGV4XSAhPSBudWxsKSB7XG4gICAgICAgIG1lc2gubW9ycGhUYXJnZXRJbmZsdWVuY2VzW3RoaXMuaW5kZXhdID0gMC4wO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHR5cGUgeyBWUk1FeHByZXNzaW9uQmluZCB9IGZyb20gJy4vVlJNRXhwcmVzc2lvbkJpbmQnO1xuXG5jb25zdCBfdjIgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXG4vKipcbiAqIEEgYmluZCBvZiBleHByZXNzaW9uIGluZmx1ZW5jZXMgdG8gdGV4dHVyZSB0cmFuc2Zvcm1zLlxuICovXG5leHBvcnQgY2xhc3MgVlJNRXhwcmVzc2lvblRleHR1cmVUcmFuc2Zvcm1CaW5kIGltcGxlbWVudHMgVlJNRXhwcmVzc2lvbkJpbmQge1xuICBwcml2YXRlIHN0YXRpYyBfcHJvcGVydHlOYW1lc01hcDogeyBbZGlzdGluZ3Vpc2hlcjogc3RyaW5nXTogc3RyaW5nW10gfSA9IHtcbiAgICBpc01lc2hTdGFuZGFyZE1hdGVyaWFsOiBbXG4gICAgICAnbWFwJyxcbiAgICAgICdlbWlzc2l2ZU1hcCcsXG4gICAgICAnYnVtcE1hcCcsXG4gICAgICAnbm9ybWFsTWFwJyxcbiAgICAgICdkaXNwbGFjZW1lbnRNYXAnLFxuICAgICAgJ3JvdWdobmVzc01hcCcsXG4gICAgICAnbWV0YWxuZXNzTWFwJyxcbiAgICAgICdhbHBoYU1hcCcsXG4gICAgXSxcbiAgICBpc01lc2hCYXNpY01hdGVyaWFsOiBbJ21hcCcsICdzcGVjdWxhck1hcCcsICdhbHBoYU1hcCddLFxuICAgIGlzTVRvb25NYXRlcmlhbDogW1xuICAgICAgJ21hcCcsXG4gICAgICAnbm9ybWFsTWFwJyxcbiAgICAgICdlbWlzc2l2ZU1hcCcsXG4gICAgICAnc2hhZGVNdWx0aXBseVRleHR1cmUnLFxuICAgICAgJ3JpbU11bHRpcGx5VGV4dHVyZScsXG4gICAgICAnb3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlJyxcbiAgICAgICd1dkFuaW1hdGlvbk1hc2tUZXh0dXJlJyxcbiAgICBdLFxuICB9O1xuXG4gIC8qKlxuICAgKiBUaGUgdGFyZ2V0IG1hdGVyaWFsLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IG1hdGVyaWFsOiBUSFJFRS5NYXRlcmlhbDtcblxuICAvKipcbiAgICogVGhlIHV2IHNjYWxlIG9mIHRoZSB0ZXh0dXJlLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IHNjYWxlOiBUSFJFRS5WZWN0b3IyO1xuXG4gIC8qKlxuICAgKiBUaGUgdXYgb2Zmc2V0IG9mIHRoZSB0ZXh0dXJlLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IG9mZnNldDogVEhSRUUuVmVjdG9yMjtcblxuICAvKipcbiAgICogVGhlIGxpc3Qgb2YgdGV4dHVyZSBuYW1lcyBhbmQgaXRzIHN0YXRlIHRoYXQgc2hvdWxkIGJlIHRyYW5zZm9ybWVkIGJ5IHRoaXMgYmluZC5cbiAgICovXG4gIHByaXZhdGUgX3Byb3BlcnRpZXM6IHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgaW5pdGlhbE9mZnNldDogVEhSRUUuVmVjdG9yMjtcbiAgICBpbml0aWFsU2NhbGU6IFRIUkVFLlZlY3RvcjI7XG4gICAgZGVsdGFPZmZzZXQ6IFRIUkVFLlZlY3RvcjI7XG4gICAgZGVsdGFTY2FsZTogVEhSRUUuVmVjdG9yMjtcbiAgfVtdO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcih7XG4gICAgbWF0ZXJpYWwsXG4gICAgc2NhbGUsXG4gICAgb2Zmc2V0LFxuICB9OiB7XG4gICAgLyoqXG4gICAgICogVGhlIHRhcmdldCBtYXRlcmlhbC5cbiAgICAgKi9cbiAgICBtYXRlcmlhbDogVEhSRUUuTWF0ZXJpYWw7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgdXYgc2NhbGUgb2YgdGhlIHRleHR1cmUuXG4gICAgICovXG4gICAgc2NhbGU6IFRIUkVFLlZlY3RvcjI7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgdXYgb2Zmc2V0IG9mIHRoZSB0ZXh0dXJlLlxuICAgICAqL1xuICAgIG9mZnNldDogVEhSRUUuVmVjdG9yMjtcbiAgfSkge1xuICAgIHRoaXMubWF0ZXJpYWwgPSBtYXRlcmlhbDtcbiAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG4gICAgdGhpcy5vZmZzZXQgPSBvZmZzZXQ7XG5cbiAgICBjb25zdCBwcm9wZXJ0eU5hbWVzID0gT2JqZWN0LmVudHJpZXMoVlJNRXhwcmVzc2lvblRleHR1cmVUcmFuc2Zvcm1CaW5kLl9wcm9wZXJ0eU5hbWVzTWFwKS5maW5kKFxuICAgICAgKFtkaXN0aW5ndWlzaGVyXSkgPT4ge1xuICAgICAgICByZXR1cm4gKG1hdGVyaWFsIGFzIGFueSlbZGlzdGluZ3Vpc2hlcl0gPT09IHRydWU7XG4gICAgICB9LFxuICAgICk/LlsxXTtcblxuICAgIGlmIChwcm9wZXJ0eU5hbWVzID09IG51bGwpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgYFRyaWVkIHRvIGFkZCBhIHRleHR1cmUgdHJhbnNmb3JtIGJpbmQgdG8gdGhlIG1hdGVyaWFsICR7XG4gICAgICAgICAgbWF0ZXJpYWwubmFtZSA/PyAnKG5vIG5hbWUpJ1xuICAgICAgICB9IGJ1dCB0aGUgbWF0ZXJpYWwgaXMgbm90IHN1cHBvcnRlZC5gLFxuICAgICAgKTtcblxuICAgICAgdGhpcy5fcHJvcGVydGllcyA9IFtdO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9wcm9wZXJ0aWVzID0gW107XG5cbiAgICAgIHByb3BlcnR5TmFtZXMuZm9yRWFjaCgocHJvcGVydHlOYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IHRleHR1cmUgPSAoKG1hdGVyaWFsIGFzIGFueSlbcHJvcGVydHlOYW1lXSBhcyBUSFJFRS5UZXh0dXJlIHwgdW5kZWZpbmVkKT8uY2xvbmUoKTtcbiAgICAgICAgaWYgKCF0ZXh0dXJlKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAobWF0ZXJpYWwgYXMgYW55KVtwcm9wZXJ0eU5hbWVdID0gdGV4dHVyZTsgLy8gYmVjYXVzZSB0aGUgdGV4dHVyZSBpcyBjbG9uZWRcblxuICAgICAgICBjb25zdCBpbml0aWFsT2Zmc2V0ID0gdGV4dHVyZS5vZmZzZXQuY2xvbmUoKTtcbiAgICAgICAgY29uc3QgaW5pdGlhbFNjYWxlID0gdGV4dHVyZS5yZXBlYXQuY2xvbmUoKTtcbiAgICAgICAgY29uc3QgZGVsdGFPZmZzZXQgPSBvZmZzZXQuY2xvbmUoKS5zdWIoaW5pdGlhbE9mZnNldCk7XG4gICAgICAgIGNvbnN0IGRlbHRhU2NhbGUgPSBzY2FsZS5jbG9uZSgpLnN1Yihpbml0aWFsU2NhbGUpO1xuXG4gICAgICAgIHRoaXMuX3Byb3BlcnRpZXMucHVzaCh7XG4gICAgICAgICAgbmFtZTogcHJvcGVydHlOYW1lLFxuICAgICAgICAgIGluaXRpYWxPZmZzZXQsXG4gICAgICAgICAgZGVsdGFPZmZzZXQsXG4gICAgICAgICAgaW5pdGlhbFNjYWxlLFxuICAgICAgICAgIGRlbHRhU2NhbGUsXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFwcGx5V2VpZ2h0KHdlaWdodDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fcHJvcGVydGllcy5mb3JFYWNoKChwcm9wZXJ0eSkgPT4ge1xuICAgICAgY29uc3QgdGFyZ2V0ID0gKHRoaXMubWF0ZXJpYWwgYXMgYW55KVtwcm9wZXJ0eS5uYW1lXSBhcyBUSFJFRS5UZXh0dXJlO1xuICAgICAgaWYgKHRhcmdldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gLy8gVE9ETzogd2Ugc2hvdWxkIGtpY2sgdGhpcyBhdCBgYWRkTWF0ZXJpYWxWYWx1ZWBcblxuICAgICAgdGFyZ2V0Lm9mZnNldC5hZGQoX3YyLmNvcHkocHJvcGVydHkuZGVsdGFPZmZzZXQpLm11bHRpcGx5U2NhbGFyKHdlaWdodCkpO1xuICAgICAgdGFyZ2V0LnJlcGVhdC5hZGQoX3YyLmNvcHkocHJvcGVydHkuZGVsdGFTY2FsZSkubXVsdGlwbHlTY2FsYXIod2VpZ2h0KSk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgY2xlYXJBcHBsaWVkV2VpZ2h0KCk6IHZvaWQge1xuICAgIHRoaXMuX3Byb3BlcnRpZXMuZm9yRWFjaCgocHJvcGVydHkpID0+IHtcbiAgICAgIGNvbnN0IHRhcmdldCA9ICh0aGlzLm1hdGVyaWFsIGFzIGFueSlbcHJvcGVydHkubmFtZV0gYXMgVEhSRUUuVGV4dHVyZTtcbiAgICAgIGlmICh0YXJnZXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9IC8vIFRPRE86IHdlIHNob3VsZCBraWNrIHRoaXMgYXQgYGFkZE1hdGVyaWFsVmFsdWVgXG5cbiAgICAgIHRhcmdldC5vZmZzZXQuY29weShwcm9wZXJ0eS5pbml0aWFsT2Zmc2V0KTtcbiAgICAgIHRhcmdldC5yZXBlYXQuY29weShwcm9wZXJ0eS5pbml0aWFsU2NhbGUpO1xuICAgIH0pO1xuICB9XG59XG4iLCAiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uICovXG5cbmV4cG9ydCBjb25zdCBWUk1FeHByZXNzaW9uT3ZlcnJpZGVUeXBlID0ge1xuICBOb25lOiAnbm9uZScsXG4gIEJsb2NrOiAnYmxvY2snLFxuICBCbGVuZDogJ2JsZW5kJyxcbn0gYXMgY29uc3Q7XG5cbmV4cG9ydCB0eXBlIFZSTUV4cHJlc3Npb25PdmVycmlkZVR5cGUgPSAodHlwZW9mIFZSTUV4cHJlc3Npb25PdmVycmlkZVR5cGUpW2tleW9mIHR5cGVvZiBWUk1FeHByZXNzaW9uT3ZlcnJpZGVUeXBlXTtcbiIsICJpbXBvcnQgdHlwZSB7IFZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb24gfSBmcm9tICcuL1ZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb24nO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHR5cGUgeyBWUk1IdW1hbm9pZCB9IGZyb20gJy4uL2h1bWFub2lkJztcblxuZXhwb3J0IGNsYXNzIFZSTUZpcnN0UGVyc29uIHtcbiAgLyoqXG4gICAqIEEgZGVmYXVsdCBjYW1lcmEgbGF5ZXIgZm9yIGBGaXJzdFBlcnNvbk9ubHlgIGxheWVyLlxuICAgKlxuICAgKiBAc2VlIFtbZ2V0Rmlyc3RQZXJzb25Pbmx5TGF5ZXJdXVxuICAgKi9cbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBERUZBVUxUX0ZJUlNUUEVSU09OX09OTFlfTEFZRVIgPSA5O1xuXG4gIC8qKlxuICAgKiBBIGRlZmF1bHQgY2FtZXJhIGxheWVyIGZvciBgVGhpcmRQZXJzb25Pbmx5YCBsYXllci5cbiAgICpcbiAgICogQHNlZSBbW2dldFRoaXJkUGVyc29uT25seUxheWVyXV1cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgREVGQVVMVF9USElSRFBFUlNPTl9PTkxZX0xBWUVSID0gMTA7XG5cbiAgLyoqXG4gICAqIEl0cyBhc3NvY2lhdGVkIHtAbGluayBWUk1IdW1hbm9pZH0uXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgaHVtYW5vaWQ6IFZSTUh1bWFub2lkO1xuICBwdWJsaWMgbWVzaEFubm90YXRpb25zOiBWUk1GaXJzdFBlcnNvbk1lc2hBbm5vdGF0aW9uW107XG5cbiAgcHJpdmF0ZSBfZmlyc3RQZXJzb25Pbmx5TGF5ZXIgPSBWUk1GaXJzdFBlcnNvbi5ERUZBVUxUX0ZJUlNUUEVSU09OX09OTFlfTEFZRVI7XG4gIHByaXZhdGUgX3RoaXJkUGVyc29uT25seUxheWVyID0gVlJNRmlyc3RQZXJzb24uREVGQVVMVF9USElSRFBFUlNPTl9PTkxZX0xBWUVSO1xuXG4gIHByaXZhdGUgX2luaXRpYWxpemVkTGF5ZXJzID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBWUk1GaXJzdFBlcnNvbiBvYmplY3QuXG4gICAqXG4gICAqIEBwYXJhbSBodW1hbm9pZCBBIHtAbGluayBWUk1IdW1hbm9pZH1cbiAgICogQHBhcmFtIG1lc2hBbm5vdGF0aW9ucyBBIHJlbmRlcmVyIHNldHRpbmdzLiBTZWUgdGhlIGRlc2NyaXB0aW9uIG9mIFtbUmVuZGVyZXJGaXJzdFBlcnNvbkZsYWdzXV0gZm9yIG1vcmUgaW5mb1xuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKGh1bWFub2lkOiBWUk1IdW1hbm9pZCwgbWVzaEFubm90YXRpb25zOiBWUk1GaXJzdFBlcnNvbk1lc2hBbm5vdGF0aW9uW10pIHtcbiAgICB0aGlzLmh1bWFub2lkID0gaHVtYW5vaWQ7XG4gICAgdGhpcy5tZXNoQW5ub3RhdGlvbnMgPSBtZXNoQW5ub3RhdGlvbnM7XG4gIH1cblxuICAvKipcbiAgICogQ29weSB0aGUgZ2l2ZW4ge0BsaW5rIFZSTUZpcnN0UGVyc29ufSBpbnRvIHRoaXMgb25lLlxuICAgKiB7QGxpbmsgaHVtYW5vaWR9IG11c3QgYmUgc2FtZSBhcyB0aGUgc291cmNlIG9uZS5cbiAgICogQHBhcmFtIHNvdXJjZSBUaGUge0BsaW5rIFZSTUZpcnN0UGVyc29ufSB5b3Ugd2FudCB0byBjb3B5XG4gICAqIEByZXR1cm5zIHRoaXNcbiAgICovXG4gIHB1YmxpYyBjb3B5KHNvdXJjZTogVlJNRmlyc3RQZXJzb24pOiB0aGlzIHtcbiAgICBpZiAodGhpcy5odW1hbm9pZCAhPT0gc291cmNlLmh1bWFub2lkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZSTUZpcnN0UGVyc29uOiBodW1hbm9pZCBtdXN0IGJlIHNhbWUgaW4gb3JkZXIgdG8gY29weScpO1xuICAgIH1cblxuICAgIHRoaXMubWVzaEFubm90YXRpb25zID0gc291cmNlLm1lc2hBbm5vdGF0aW9ucy5tYXAoKGFubm90YXRpb24pID0+ICh7XG4gICAgICBtZXNoZXM6IGFubm90YXRpb24ubWVzaGVzLmNvbmNhdCgpLFxuICAgICAgdHlwZTogYW5ub3RhdGlvbi50eXBlLFxuICAgIH0pKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBjbG9uZSBvZiB0aGlzIHtAbGluayBWUk1GaXJzdFBlcnNvbn0uXG4gICAqIEByZXR1cm5zIENvcGllZCB7QGxpbmsgVlJNRmlyc3RQZXJzb259XG4gICAqL1xuICBwdWJsaWMgY2xvbmUoKTogVlJNRmlyc3RQZXJzb24ge1xuICAgIHJldHVybiBuZXcgVlJNRmlyc3RQZXJzb24odGhpcy5odW1hbm9pZCwgdGhpcy5tZXNoQW5ub3RhdGlvbnMpLmNvcHkodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogQSBjYW1lcmEgbGF5ZXIgcmVwcmVzZW50cyBgRmlyc3RQZXJzb25Pbmx5YCBsYXllci5cbiAgICogTm90ZSB0aGF0ICoqeW91IG11c3QgY2FsbCB7QGxpbmsgc2V0dXB9IGZpcnN0IGJlZm9yZSB5b3UgdXNlIHRoZSBsYXllciBmZWF0dXJlKiogb3IgaXQgZG9lcyBub3Qgd29yayBwcm9wZXJseS5cbiAgICpcbiAgICogVGhlIHZhbHVlIGlzIHtAbGluayBERUZBVUxUX0ZJUlNUUEVSU09OX09OTFlfTEFZRVJ9IGJ5IGRlZmF1bHQgYnV0IHlvdSBjYW4gY2hhbmdlIHRoZSBsYXllciBieSBzcGVjaWZ5aW5nIHZpYSB7QGxpbmsgc2V0dXB9IGlmIHlvdSBwcmVmZXIuXG4gICAqXG4gICAqIEBzZWUgaHR0cHM6Ly92cm0uZGV2L2VuL3VuaXZybS9hcGkvdW5pdnJtX3VzZV9maXJzdHBlcnNvbi9cbiAgICogQHNlZSBodHRwczovL3RocmVlanMub3JnL2RvY3MvI2FwaS9lbi9jb3JlL0xheWVyc1xuICAgKi9cbiAgcHVibGljIGdldCBmaXJzdFBlcnNvbk9ubHlMYXllcigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9maXJzdFBlcnNvbk9ubHlMYXllcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIGNhbWVyYSBsYXllciByZXByZXNlbnRzIGBUaGlyZFBlcnNvbk9ubHlgIGxheWVyLlxuICAgKiBOb3RlIHRoYXQgKip5b3UgbXVzdCBjYWxsIHtAbGluayBzZXR1cH0gZmlyc3QgYmVmb3JlIHlvdSB1c2UgdGhlIGxheWVyIGZlYXR1cmUqKiBvciBpdCBkb2VzIG5vdCB3b3JrIHByb3Blcmx5LlxuICAgKlxuICAgKiBUaGUgdmFsdWUgaXMge0BsaW5rIERFRkFVTFRfVEhJUkRQRVJTT05fT05MWV9MQVlFUn0gYnkgZGVmYXVsdCBidXQgeW91IGNhbiBjaGFuZ2UgdGhlIGxheWVyIGJ5IHNwZWNpZnlpbmcgdmlhIHtAbGluayBzZXR1cH0gaWYgeW91IHByZWZlci5cbiAgICpcbiAgICogQHNlZSBodHRwczovL3ZybS5kZXYvZW4vdW5pdnJtL2FwaS91bml2cm1fdXNlX2ZpcnN0cGVyc29uL1xuICAgKiBAc2VlIGh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy8jYXBpL2VuL2NvcmUvTGF5ZXJzXG4gICAqL1xuICBwdWJsaWMgZ2V0IHRoaXJkUGVyc29uT25seUxheWVyKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3RoaXJkUGVyc29uT25seUxheWVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEluIHRoaXMgbWV0aG9kLCBpdCBhc3NpZ25zIGxheWVycyBmb3IgZXZlcnkgbWVzaGVzIGJhc2VkIG9uIG1lc2ggYW5ub3RhdGlvbnMuXG4gICAqIFlvdSBtdXN0IGNhbGwgdGhpcyBtZXRob2QgZmlyc3QgYmVmb3JlIHlvdSB1c2UgdGhlIGxheWVyIGZlYXR1cmUuXG4gICAqXG4gICAqIFRoaXMgaXMgYW4gZXF1aXZhbGVudCBvZiBbVlJNRmlyc3RQZXJzb24uU2V0dXBdKGh0dHBzOi8vZ2l0aHViLmNvbS92cm0tYy9VbmlWUk0vYmxvYi83M2E1YmQ4ZmNkZGFhMmE3YTg3MzUwOTlhOTdlNjNjOWRiM2U1ZWEwL0Fzc2V0cy9WUk0vUnVudGltZS9GaXJzdFBlcnNvbi9WUk1GaXJzdFBlcnNvbi5jcyNMMjk1LUwyOTkpIG9mIHRoZSBVbmlWUk0uXG4gICAqXG4gICAqIFRoZSBgY2FtZXJhTGF5ZXJgIHBhcmFtZXRlciBzcGVjaWZpZXMgd2hpY2ggbGF5ZXIgd2lsbCBiZSBhc3NpZ25lZCBmb3IgYEZpcnN0UGVyc29uT25seWAgLyBgVGhpcmRQZXJzb25Pbmx5YC5cbiAgICogSW4gVW5pVlJNLCB3ZSBzcGVjaWZpZWQgdGhvc2UgYnkgbmFtaW5nIGVhY2ggZGVzaXJlZCBsYXllciBhcyBgRklSU1RQRVJTT05fT05MWV9MQVlFUmAgLyBgVEhJUkRQRVJTT05fT05MWV9MQVlFUmBcbiAgICogYnV0IHdlIGFyZSBnb2luZyB0byBzcGVjaWZ5IHRoZXNlIGxheWVycyBhdCBoZXJlIHNpbmNlIHdlIGFyZSB1bmFibGUgdG8gbmFtZSBsYXllcnMgaW4gVGhyZWUuanMuXG4gICAqXG4gICAqIEBwYXJhbSBjYW1lcmFMYXllciBTcGVjaWZ5IHdoaWNoIGxheWVyIHdpbGwgYmUgZm9yIGBGaXJzdFBlcnNvbk9ubHlgIC8gYFRoaXJkUGVyc29uT25seWAuXG4gICAqL1xuICBwdWJsaWMgc2V0dXAoe1xuICAgIGZpcnN0UGVyc29uT25seUxheWVyID0gVlJNRmlyc3RQZXJzb24uREVGQVVMVF9GSVJTVFBFUlNPTl9PTkxZX0xBWUVSLFxuICAgIHRoaXJkUGVyc29uT25seUxheWVyID0gVlJNRmlyc3RQZXJzb24uREVGQVVMVF9USElSRFBFUlNPTl9PTkxZX0xBWUVSLFxuICB9ID0ge30pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5faW5pdGlhbGl6ZWRMYXllcnMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fZmlyc3RQZXJzb25Pbmx5TGF5ZXIgPSBmaXJzdFBlcnNvbk9ubHlMYXllcjtcbiAgICB0aGlzLl90aGlyZFBlcnNvbk9ubHlMYXllciA9IHRoaXJkUGVyc29uT25seUxheWVyO1xuXG4gICAgdGhpcy5tZXNoQW5ub3RhdGlvbnMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaXRlbS5tZXNoZXMuZm9yRWFjaCgobWVzaCkgPT4ge1xuICAgICAgICBpZiAoaXRlbS50eXBlID09PSAnZmlyc3RQZXJzb25Pbmx5Jykge1xuICAgICAgICAgIG1lc2gubGF5ZXJzLnNldCh0aGlzLl9maXJzdFBlcnNvbk9ubHlMYXllcik7XG4gICAgICAgICAgbWVzaC50cmF2ZXJzZSgoY2hpbGQpID0+IGNoaWxkLmxheWVycy5zZXQodGhpcy5fZmlyc3RQZXJzb25Pbmx5TGF5ZXIpKTtcbiAgICAgICAgfSBlbHNlIGlmIChpdGVtLnR5cGUgPT09ICd0aGlyZFBlcnNvbk9ubHknKSB7XG4gICAgICAgICAgbWVzaC5sYXllcnMuc2V0KHRoaXMuX3RoaXJkUGVyc29uT25seUxheWVyKTtcbiAgICAgICAgICBtZXNoLnRyYXZlcnNlKChjaGlsZCkgPT4gY2hpbGQubGF5ZXJzLnNldCh0aGlzLl90aGlyZFBlcnNvbk9ubHlMYXllcikpO1xuICAgICAgICB9IGVsc2UgaWYgKGl0ZW0udHlwZSA9PT0gJ2F1dG8nKSB7XG4gICAgICAgICAgdGhpcy5fY3JlYXRlSGVhZGxlc3NNb2RlbChtZXNoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9pbml0aWFsaXplZExheWVycyA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIF9leGNsdWRlVHJpYW5nbGVzKHRyaWFuZ2xlczogbnVtYmVyW10sIGJ3czogbnVtYmVyW11bXSwgc2tpbkluZGV4OiBudW1iZXJbXVtdLCBleGNsdWRlOiBudW1iZXJbXSk6IG51bWJlciB7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBpZiAoYndzICE9IG51bGwgJiYgYndzLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJpYW5nbGVzLmxlbmd0aDsgaSArPSAzKSB7XG4gICAgICAgIGNvbnN0IGEgPSB0cmlhbmdsZXNbaV07XG4gICAgICAgIGNvbnN0IGIgPSB0cmlhbmdsZXNbaSArIDFdO1xuICAgICAgICBjb25zdCBjID0gdHJpYW5nbGVzW2kgKyAyXTtcbiAgICAgICAgY29uc3QgYncwID0gYndzW2FdO1xuICAgICAgICBjb25zdCBza2luMCA9IHNraW5JbmRleFthXTtcblxuICAgICAgICBpZiAoYncwWzBdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4wWzBdKSkgY29udGludWU7XG4gICAgICAgIGlmIChidzBbMV0gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjBbMV0pKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJ3MFsyXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMFsyXSkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoYncwWzNdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4wWzNdKSkgY29udGludWU7XG5cbiAgICAgICAgY29uc3QgYncxID0gYndzW2JdO1xuICAgICAgICBjb25zdCBza2luMSA9IHNraW5JbmRleFtiXTtcbiAgICAgICAgaWYgKGJ3MVswXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMVswXSkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoYncxWzFdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4xWzFdKSkgY29udGludWU7XG4gICAgICAgIGlmIChidzFbMl0gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjFbMl0pKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJ3MVszXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMVszXSkpIGNvbnRpbnVlO1xuXG4gICAgICAgIGNvbnN0IGJ3MiA9IGJ3c1tjXTtcbiAgICAgICAgY29uc3Qgc2tpbjIgPSBza2luSW5kZXhbY107XG4gICAgICAgIGlmIChidzJbMF0gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjJbMF0pKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJ3MlsxXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMlsxXSkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoYncyWzJdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4yWzJdKSkgY29udGludWU7XG4gICAgICAgIGlmIChidzJbM10gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjJbM10pKSBjb250aW51ZTtcblxuICAgICAgICB0cmlhbmdsZXNbY291bnQrK10gPSBhO1xuICAgICAgICB0cmlhbmdsZXNbY291bnQrK10gPSBiO1xuICAgICAgICB0cmlhbmdsZXNbY291bnQrK10gPSBjO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY291bnQ7XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVFcmFzZWRNZXNoKHNyYzogVEhSRUUuU2tpbm5lZE1lc2gsIGVyYXNpbmdCb25lc0luZGV4OiBudW1iZXJbXSk6IFRIUkVFLlNraW5uZWRNZXNoIHtcbiAgICBjb25zdCBkc3QgPSBuZXcgVEhSRUUuU2tpbm5lZE1lc2goc3JjLmdlb21ldHJ5LmNsb25lKCksIHNyYy5tYXRlcmlhbCk7XG4gICAgZHN0Lm5hbWUgPSBgJHtzcmMubmFtZX0oZXJhc2UpYDtcbiAgICBkc3QuZnJ1c3R1bUN1bGxlZCA9IHNyYy5mcnVzdHVtQ3VsbGVkO1xuICAgIGRzdC5sYXllcnMuc2V0KHRoaXMuX2ZpcnN0UGVyc29uT25seUxheWVyKTtcblxuICAgIGNvbnN0IGdlb21ldHJ5ID0gZHN0Lmdlb21ldHJ5O1xuXG4gICAgY29uc3Qgc2tpbkluZGV4QXR0ciA9IGdlb21ldHJ5LmdldEF0dHJpYnV0ZSgnc2tpbkluZGV4Jyk7XG4gICAgY29uc3Qgc2tpbkluZGV4QXR0ckFycmF5ID0gc2tpbkluZGV4QXR0ciBpbnN0YW5jZW9mIFRIUkVFLkdMQnVmZmVyQXR0cmlidXRlID8gW10gOiBza2luSW5kZXhBdHRyLmFycmF5O1xuICAgIGNvbnN0IHNraW5JbmRleCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2tpbkluZGV4QXR0ckFycmF5Lmxlbmd0aDsgaSArPSA0KSB7XG4gICAgICBza2luSW5kZXgucHVzaChbXG4gICAgICAgIHNraW5JbmRleEF0dHJBcnJheVtpXSxcbiAgICAgICAgc2tpbkluZGV4QXR0ckFycmF5W2kgKyAxXSxcbiAgICAgICAgc2tpbkluZGV4QXR0ckFycmF5W2kgKyAyXSxcbiAgICAgICAgc2tpbkluZGV4QXR0ckFycmF5W2kgKyAzXSxcbiAgICAgIF0pO1xuICAgIH1cblxuICAgIGNvbnN0IHNraW5XZWlnaHRBdHRyID0gZ2VvbWV0cnkuZ2V0QXR0cmlidXRlKCdza2luV2VpZ2h0Jyk7XG4gICAgY29uc3Qgc2tpbldlaWdodEF0dHJBcnJheSA9IHNraW5XZWlnaHRBdHRyIGluc3RhbmNlb2YgVEhSRUUuR0xCdWZmZXJBdHRyaWJ1dGUgPyBbXSA6IHNraW5XZWlnaHRBdHRyLmFycmF5O1xuICAgIGNvbnN0IHNraW5XZWlnaHQgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNraW5XZWlnaHRBdHRyQXJyYXkubGVuZ3RoOyBpICs9IDQpIHtcbiAgICAgIHNraW5XZWlnaHQucHVzaChbXG4gICAgICAgIHNraW5XZWlnaHRBdHRyQXJyYXlbaV0sXG4gICAgICAgIHNraW5XZWlnaHRBdHRyQXJyYXlbaSArIDFdLFxuICAgICAgICBza2luV2VpZ2h0QXR0ckFycmF5W2kgKyAyXSxcbiAgICAgICAgc2tpbldlaWdodEF0dHJBcnJheVtpICsgM10sXG4gICAgICBdKTtcbiAgICB9XG5cbiAgICBjb25zdCBpbmRleCA9IGdlb21ldHJ5LmdldEluZGV4KCk7XG4gICAgaWYgKCFpbmRleCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIGdlb21ldHJ5IGRvZXNuJ3QgaGF2ZSBhbiBpbmRleCBidWZmZXJcIik7XG4gICAgfVxuICAgIGNvbnN0IG9sZFRyaWFuZ2xlcyA9IEFycmF5LmZyb20oaW5kZXguYXJyYXkpO1xuXG4gICAgY29uc3QgY291bnQgPSB0aGlzLl9leGNsdWRlVHJpYW5nbGVzKG9sZFRyaWFuZ2xlcywgc2tpbldlaWdodCwgc2tpbkluZGV4LCBlcmFzaW5nQm9uZXNJbmRleCk7XG4gICAgY29uc3QgbmV3VHJpYW5nbGU6IG51bWJlcltdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICBuZXdUcmlhbmdsZVtpXSA9IG9sZFRyaWFuZ2xlc1tpXTtcbiAgICB9XG4gICAgZ2VvbWV0cnkuc2V0SW5kZXgobmV3VHJpYW5nbGUpO1xuXG4gICAgLy8gbXRvb24gbWF0ZXJpYWwgaW5jbHVkZXMgb25CZWZvcmVSZW5kZXIuIHRoaXMgaXMgdW5zdXBwb3J0ZWQgYXQgU2tpbm5lZE1lc2gjY2xvbmVcbiAgICBpZiAoc3JjLm9uQmVmb3JlUmVuZGVyKSB7XG4gICAgICBkc3Qub25CZWZvcmVSZW5kZXIgPSBzcmMub25CZWZvcmVSZW5kZXI7XG4gICAgfVxuICAgIGRzdC5iaW5kKG5ldyBUSFJFRS5Ta2VsZXRvbihzcmMuc2tlbGV0b24uYm9uZXMsIHNyYy5za2VsZXRvbi5ib25lSW52ZXJzZXMpLCBuZXcgVEhSRUUuTWF0cml4NCgpKTtcbiAgICByZXR1cm4gZHN0O1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlSGVhZGxlc3NNb2RlbEZvclNraW5uZWRNZXNoKHBhcmVudDogVEhSRUUuT2JqZWN0M0QsIG1lc2g6IFRIUkVFLlNraW5uZWRNZXNoKTogdm9pZCB7XG4gICAgY29uc3QgZXJhc2VCb25lSW5kZXhlczogbnVtYmVyW10gPSBbXTtcbiAgICBtZXNoLnNrZWxldG9uLmJvbmVzLmZvckVhY2goKGJvbmUsIGluZGV4KSA9PiB7XG4gICAgICBpZiAodGhpcy5faXNFcmFzZVRhcmdldChib25lKSkgZXJhc2VCb25lSW5kZXhlcy5wdXNoKGluZGV4KTtcbiAgICB9KTtcblxuICAgIC8vIFVubGlrZSBVbmlWUk0gd2UgZG9uJ3QgY29weSBtZXNoIGlmIG5vIGludmlzaWJsZSBib25lIHdhcyBmb3VuZFxuICAgIGlmICghZXJhc2VCb25lSW5kZXhlcy5sZW5ndGgpIHtcbiAgICAgIG1lc2gubGF5ZXJzLmVuYWJsZSh0aGlzLl90aGlyZFBlcnNvbk9ubHlMYXllcik7XG4gICAgICBtZXNoLmxheWVycy5lbmFibGUodGhpcy5fZmlyc3RQZXJzb25Pbmx5TGF5ZXIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBtZXNoLmxheWVycy5zZXQodGhpcy5fdGhpcmRQZXJzb25Pbmx5TGF5ZXIpO1xuICAgIGNvbnN0IG5ld01lc2ggPSB0aGlzLl9jcmVhdGVFcmFzZWRNZXNoKG1lc2gsIGVyYXNlQm9uZUluZGV4ZXMpO1xuICAgIHBhcmVudC5hZGQobmV3TWVzaCk7XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVIZWFkbGVzc01vZGVsKG5vZGU6IFRIUkVFLk9iamVjdDNEKTogdm9pZCB7XG4gICAgaWYgKG5vZGUudHlwZSA9PT0gJ0dyb3VwJykge1xuICAgICAgbm9kZS5sYXllcnMuc2V0KHRoaXMuX3RoaXJkUGVyc29uT25seUxheWVyKTtcbiAgICAgIGlmICh0aGlzLl9pc0VyYXNlVGFyZ2V0KG5vZGUpKSB7XG4gICAgICAgIG5vZGUudHJhdmVyc2UoKGNoaWxkKSA9PiBjaGlsZC5sYXllcnMuc2V0KHRoaXMuX3RoaXJkUGVyc29uT25seUxheWVyKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBwYXJlbnQgPSBuZXcgVEhSRUUuR3JvdXAoKTtcbiAgICAgICAgcGFyZW50Lm5hbWUgPSBgX2hlYWRsZXNzXyR7bm9kZS5uYW1lfWA7XG4gICAgICAgIHBhcmVudC5sYXllcnMuc2V0KHRoaXMuX2ZpcnN0UGVyc29uT25seUxheWVyKTtcbiAgICAgICAgbm9kZS5wYXJlbnQhLmFkZChwYXJlbnQpO1xuICAgICAgICBub2RlLmNoaWxkcmVuXG4gICAgICAgICAgLmZpbHRlcigoY2hpbGQpID0+IGNoaWxkLnR5cGUgPT09ICdTa2lubmVkTWVzaCcpXG4gICAgICAgICAgLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBza2lubmVkTWVzaCA9IGNoaWxkIGFzIFRIUkVFLlNraW5uZWRNZXNoO1xuICAgICAgICAgICAgdGhpcy5fY3JlYXRlSGVhZGxlc3NNb2RlbEZvclNraW5uZWRNZXNoKHBhcmVudCwgc2tpbm5lZE1lc2gpO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobm9kZS50eXBlID09PSAnU2tpbm5lZE1lc2gnKSB7XG4gICAgICBjb25zdCBza2lubmVkTWVzaCA9IG5vZGUgYXMgVEhSRUUuU2tpbm5lZE1lc2g7XG4gICAgICB0aGlzLl9jcmVhdGVIZWFkbGVzc01vZGVsRm9yU2tpbm5lZE1lc2gobm9kZS5wYXJlbnQhLCBza2lubmVkTWVzaCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLl9pc0VyYXNlVGFyZ2V0KG5vZGUpKSB7XG4gICAgICAgIG5vZGUubGF5ZXJzLnNldCh0aGlzLl90aGlyZFBlcnNvbk9ubHlMYXllcik7XG4gICAgICAgIG5vZGUudHJhdmVyc2UoKGNoaWxkKSA9PiBjaGlsZC5sYXllcnMuc2V0KHRoaXMuX3RoaXJkUGVyc29uT25seUxheWVyKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaXNFcmFzZVRhcmdldChib25lOiBUSFJFRS5PYmplY3QzRCk6IGJvb2xlYW4ge1xuICAgIGlmIChib25lID09PSB0aGlzLmh1bWFub2lkLmdldFJhd0JvbmVOb2RlKCdoZWFkJykpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSBpZiAoIWJvbmUucGFyZW50KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLl9pc0VyYXNlVGFyZ2V0KGJvbmUucGFyZW50KTtcbiAgICB9XG4gIH1cbn1cbiIsICJpbXBvcnQgdHlwZSAqIGFzIFYwVlJNIGZyb20gJ0BwaXhpdi90eXBlcy12cm0tMC4wJztcbmltcG9ydCB0eXBlICogYXMgVjFWUk1TY2hlbWEgZnJvbSAnQHBpeGl2L3R5cGVzLXZybWMtdnJtLTEuMCc7XG5pbXBvcnQgdHlwZSB7IEdMVEYsIEdMVEZMb2FkZXJQbHVnaW4sIEdMVEZQYXJzZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyLmpzJztcbmltcG9ydCB0eXBlIHsgVlJNSHVtYW5vaWQgfSBmcm9tICcuLi9odW1hbm9pZC9WUk1IdW1hbm9pZCc7XG5pbXBvcnQgeyBnbHRmRXh0cmFjdFByaW1pdGl2ZXNGcm9tTm9kZXMgfSBmcm9tICcuLi91dGlscy9nbHRmRXh0cmFjdFByaW1pdGl2ZXNGcm9tTm9kZSc7XG5pbXBvcnQgeyBWUk1GaXJzdFBlcnNvbiB9IGZyb20gJy4vVlJNRmlyc3RQZXJzb24nO1xuaW1wb3J0IHR5cGUgeyBWUk1GaXJzdFBlcnNvbk1lc2hBbm5vdGF0aW9uIH0gZnJvbSAnLi9WUk1GaXJzdFBlcnNvbk1lc2hBbm5vdGF0aW9uJztcbmltcG9ydCB0eXBlIHsgVlJNRmlyc3RQZXJzb25NZXNoQW5ub3RhdGlvblR5cGUgfSBmcm9tICcuL1ZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb25UeXBlJztcbmltcG9ydCB7IEdMVEYgYXMgR0xURlNjaGVtYSB9IGZyb20gJ0BnbHRmLXRyYW5zZm9ybS9jb3JlJztcblxuLyoqXG4gKiBQb3NzaWJsZSBzcGVjIHZlcnNpb25zIGl0IHJlY29nbml6ZXMuXG4gKi9cbmNvbnN0IFBPU1NJQkxFX1NQRUNfVkVSU0lPTlMgPSBuZXcgU2V0KFsnMS4wJywgJzEuMC1iZXRhJ10pO1xuXG4vKipcbiAqIEEgcGx1Z2luIG9mIEdMVEZMb2FkZXIgdGhhdCBpbXBvcnRzIGEge0BsaW5rIFZSTUZpcnN0UGVyc29ufSBmcm9tIGEgVlJNIGV4dGVuc2lvbiBvZiBhIEdMVEYuXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1GaXJzdFBlcnNvbkxvYWRlclBsdWdpbiBpbXBsZW1lbnRzIEdMVEZMb2FkZXJQbHVnaW4ge1xuICBwdWJsaWMgcmVhZG9ubHkgcGFyc2VyOiBHTFRGUGFyc2VyO1xuXG4gIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xuICAgIC8vIFdlIHNob3VsZCB1c2UgdGhlIGV4dGVuc2lvbiBuYW1lIGluc3RlYWQgYnV0IHdlIGhhdmUgbXVsdGlwbGUgcGx1Z2lucyBmb3IgYW4gZXh0ZW5zaW9uLi4uXG4gICAgcmV0dXJuICdWUk1GaXJzdFBlcnNvbkxvYWRlclBsdWdpbic7XG4gIH1cblxuICBwdWJsaWMgY29uc3RydWN0b3IocGFyc2VyOiBHTFRGUGFyc2VyKSB7XG4gICAgdGhpcy5wYXJzZXIgPSBwYXJzZXI7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgYWZ0ZXJSb290KGdsdGY6IEdMVEYpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB2cm1IdW1hbm9pZCA9IGdsdGYudXNlckRhdGEudnJtSHVtYW5vaWQgYXMgVlJNSHVtYW5vaWQgfCB1bmRlZmluZWQ7XG5cbiAgICAvLyBleHBsaWNpdGx5IGRpc3Rpbmd1aXNoIG51bGwgYW5kIHVuZGVmaW5lZFxuICAgIC8vIHNpbmNlIHZybUh1bWFub2lkIG1pZ2h0IGJlIG51bGwgYXMgYSByZXN1bHRcbiAgICBpZiAodnJtSHVtYW5vaWQgPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKHZybUh1bWFub2lkID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1ZSTUZpcnN0UGVyc29uTG9hZGVyUGx1Z2luOiB2cm1IdW1hbm9pZCBpcyB1bmRlZmluZWQuIFZSTUh1bWFub2lkTG9hZGVyUGx1Z2luIGhhdmUgdG8gYmUgdXNlZCBmaXJzdCcsXG4gICAgICApO1xuICAgIH1cblxuICAgIGdsdGYudXNlckRhdGEudnJtRmlyc3RQZXJzb24gPSBhd2FpdCB0aGlzLl9pbXBvcnQoZ2x0ZiwgdnJtSHVtYW5vaWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEltcG9ydCBhIHtAbGluayBWUk1GaXJzdFBlcnNvbn0gZnJvbSBhIFZSTS5cbiAgICpcbiAgICogQHBhcmFtIGdsdGYgQSBwYXJzZWQgcmVzdWx0IG9mIEdMVEYgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gICAqIEBwYXJhbSBodW1hbm9pZCBBIHtAbGluayBWUk1IdW1hbm9pZH0gaW5zdGFuY2UgdGhhdCByZXByZXNlbnRzIHRoZSBWUk1cbiAgICovXG5cbiAgcHJpdmF0ZSBhc3luYyBfaW1wb3J0KGdsdGY6IEdMVEYsIGh1bWFub2lkOiBWUk1IdW1hbm9pZCB8IG51bGwpOiBQcm9taXNlPFZSTUZpcnN0UGVyc29uIHwgbnVsbD4ge1xuICAgIGlmIChodW1hbm9pZCA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCB2MVJlc3VsdCA9IGF3YWl0IHRoaXMuX3YxSW1wb3J0KGdsdGYsIGh1bWFub2lkKTtcbiAgICBpZiAodjFSZXN1bHQpIHtcbiAgICAgIHJldHVybiB2MVJlc3VsdDtcbiAgICB9XG5cbiAgICBjb25zdCB2MFJlc3VsdCA9IGF3YWl0IHRoaXMuX3YwSW1wb3J0KGdsdGYsIGh1bWFub2lkKTtcbiAgICBpZiAodjBSZXN1bHQpIHtcbiAgICAgIHJldHVybiB2MFJlc3VsdDtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX3YxSW1wb3J0KGdsdGY6IEdMVEYsIGh1bWFub2lkOiBWUk1IdW1hbm9pZCk6IFByb21pc2U8VlJNRmlyc3RQZXJzb24gfCBudWxsPiB7XG4gICAgY29uc3QganNvbiA9IHRoaXMucGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAgIC8vIGVhcmx5IGFib3J0IGlmIGl0IGRvZXNuJ3QgdXNlIHZybVxuICAgIGNvbnN0IGlzVlJNVXNlZCA9IGpzb24uZXh0ZW5zaW9uc1VzZWQ/LmluZGV4T2YoJ1ZSTUNfdnJtJykgIT09IC0xO1xuICAgIGlmICghaXNWUk1Vc2VkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBleHRlbnNpb24gPSBqc29uLmV4dGVuc2lvbnM/LlsnVlJNQ192cm0nXSBhcyBWMVZSTVNjaGVtYS5WUk1DVlJNIHwgdW5kZWZpbmVkO1xuICAgIGlmICghZXh0ZW5zaW9uKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzcGVjVmVyc2lvbiA9IGV4dGVuc2lvbi5zcGVjVmVyc2lvbjtcbiAgICBpZiAoIVBPU1NJQkxFX1NQRUNfVkVSU0lPTlMuaGFzKHNwZWNWZXJzaW9uKSkge1xuICAgICAgY29uc29sZS53YXJuKGBWUk1GaXJzdFBlcnNvbkxvYWRlclBsdWdpbjogVW5rbm93biBWUk1DX3ZybSBzcGVjVmVyc2lvbiBcIiR7c3BlY1ZlcnNpb259XCJgKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNjaGVtYUZpcnN0UGVyc29uID0gZXh0ZW5zaW9uLmZpcnN0UGVyc29uO1xuXG4gICAgY29uc3QgbWVzaEFubm90YXRpb25zOiBWUk1GaXJzdFBlcnNvbk1lc2hBbm5vdGF0aW9uW10gPSBbXTtcbiAgICBjb25zdCBub2RlUHJpbWl0aXZlc01hcCA9IGF3YWl0IGdsdGZFeHRyYWN0UHJpbWl0aXZlc0Zyb21Ob2RlcyhnbHRmKTtcbiAgICBBcnJheS5mcm9tKG5vZGVQcmltaXRpdmVzTWFwLmVudHJpZXMoKSkuZm9yRWFjaCgoW25vZGVJbmRleCwgcHJpbWl0aXZlc10pID0+IHtcbiAgICAgIGNvbnN0IGFubm90YXRpb24gPSBzY2hlbWFGaXJzdFBlcnNvbj8ubWVzaEFubm90YXRpb25zPy5maW5kKChhKSA9PiBhLm5vZGUgPT09IG5vZGVJbmRleCk7XG5cbiAgICAgIG1lc2hBbm5vdGF0aW9ucy5wdXNoKHtcbiAgICAgICAgbWVzaGVzOiBwcmltaXRpdmVzLFxuICAgICAgICB0eXBlOiBhbm5vdGF0aW9uPy50eXBlID8/ICdhdXRvJyxcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5ldyBWUk1GaXJzdFBlcnNvbihodW1hbm9pZCwgbWVzaEFubm90YXRpb25zKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX3YwSW1wb3J0KGdsdGY6IEdMVEYsIGh1bWFub2lkOiBWUk1IdW1hbm9pZCk6IFByb21pc2U8VlJNRmlyc3RQZXJzb24gfCBudWxsPiB7XG4gICAgY29uc3QganNvbiA9IHRoaXMucGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAgIGNvbnN0IHZybUV4dCA9IGpzb24uZXh0ZW5zaW9ucz8uVlJNIGFzIFYwVlJNLlZSTSB8IHVuZGVmaW5lZDtcbiAgICBpZiAoIXZybUV4dCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc2NoZW1hRmlyc3RQZXJzb246IFYwVlJNLkZpcnN0UGVyc29uIHwgdW5kZWZpbmVkID0gdnJtRXh0LmZpcnN0UGVyc29uO1xuICAgIGlmICghc2NoZW1hRmlyc3RQZXJzb24pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IG1lc2hBbm5vdGF0aW9uczogVlJNRmlyc3RQZXJzb25NZXNoQW5ub3RhdGlvbltdID0gW107XG4gICAgY29uc3Qgbm9kZVByaW1pdGl2ZXNNYXAgPSBhd2FpdCBnbHRmRXh0cmFjdFByaW1pdGl2ZXNGcm9tTm9kZXMoZ2x0Zik7XG5cbiAgICBBcnJheS5mcm9tKG5vZGVQcmltaXRpdmVzTWFwLmVudHJpZXMoKSkuZm9yRWFjaCgoW25vZGVJbmRleCwgcHJpbWl0aXZlc10pID0+IHtcbiAgICAgIGNvbnN0IHNjaGVtYU5vZGUgPSBqc29uLm5vZGVzIVtub2RlSW5kZXhdO1xuXG4gICAgICBjb25zdCBmbGFnID0gc2NoZW1hRmlyc3RQZXJzb24ubWVzaEFubm90YXRpb25zXG4gICAgICAgID8gc2NoZW1hRmlyc3RQZXJzb24ubWVzaEFubm90YXRpb25zLmZpbmQoKGEpID0+IGEubWVzaCA9PT0gc2NoZW1hTm9kZS5tZXNoKVxuICAgICAgICA6IHVuZGVmaW5lZDtcblxuICAgICAgbWVzaEFubm90YXRpb25zLnB1c2goe1xuICAgICAgICBtZXNoZXM6IHByaW1pdGl2ZXMsXG4gICAgICAgIHR5cGU6IHRoaXMuX2NvbnZlcnRWMEZsYWdUb1YxVHlwZShmbGFnPy5maXJzdFBlcnNvbkZsYWcpLFxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbmV3IFZSTUZpcnN0UGVyc29uKGh1bWFub2lkLCBtZXNoQW5ub3RhdGlvbnMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29udmVydFYwRmxhZ1RvVjFUeXBlKGZsYWc6IHN0cmluZyB8IHVuZGVmaW5lZCk6IFZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb25UeXBlIHtcbiAgICBpZiAoZmxhZyA9PT0gJ0ZpcnN0UGVyc29uT25seScpIHtcbiAgICAgIHJldHVybiAnZmlyc3RQZXJzb25Pbmx5JztcbiAgICB9IGVsc2UgaWYgKGZsYWcgPT09ICdUaGlyZFBlcnNvbk9ubHknKSB7XG4gICAgICByZXR1cm4gJ3RoaXJkUGVyc29uT25seSc7XG4gICAgfSBlbHNlIGlmIChmbGFnID09PSAnQm90aCcpIHtcbiAgICAgIHJldHVybiAnYm90aCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRoZSBkZWZhdWx0IHZhbHVlIGlzICdBdXRvJyBldmVuIGluIFZSTTBcbiAgICAgIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL3ZybS1jL1VuaVZSTS9ibG9iLzA3ZDk4ZTJmMWFiYzUyOGQzODdmODYwZDIyMjRkMDg1NWIwZDBiNTkvQXNzZXRzL1ZSTS9SdW50aW1lL0ZpcnN0UGVyc29uL1ZSTUZpcnN0UGVyc29uLmNzI0wxMTctTDExOVxuICAgICAgcmV0dXJuICdhdXRvJztcbiAgICB9XG4gIH1cbn1cbiIsICIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cblxuZXhwb3J0IGNvbnN0IFZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb25UeXBlID0ge1xuICBBdXRvOiAnYXV0bycsXG4gIEJvdGg6ICdib3RoJyxcbiAgVGhpcmRQZXJzb25Pbmx5OiAndGhpcmRQZXJzb25Pbmx5JyxcbiAgRmlyc3RQZXJzb25Pbmx5OiAnZmlyc3RQZXJzb25Pbmx5Jyxcbn0gYXMgY29uc3Q7XG5cbmV4cG9ydCB0eXBlIFZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb25UeXBlID1cbiAgKHR5cGVvZiBWUk1GaXJzdFBlcnNvbk1lc2hBbm5vdGF0aW9uVHlwZSlba2V5b2YgdHlwZW9mIFZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb25UeXBlXTtcbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1IdW1hbkJvbmUgfSBmcm9tICcuLi9WUk1IdW1hbkJvbmUnO1xuaW1wb3J0IHsgVlJNSHVtYW5vaWQgfSBmcm9tICcuLi9WUk1IdW1hbm9pZCc7XG5cbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3YzQiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfcXVhdEEgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXG5leHBvcnQgY2xhc3MgVlJNSHVtYW5vaWRIZWxwZXIgZXh0ZW5kcyBUSFJFRS5Hcm91cCB7XG4gIHB1YmxpYyByZWFkb25seSB2cm1IdW1hbm9pZDogVlJNSHVtYW5vaWQ7XG4gIHByaXZhdGUgX2JvbmVBeGVzTWFwOiBNYXA8VlJNSHVtYW5Cb25lLCBUSFJFRS5BeGVzSGVscGVyPjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoaHVtYW5vaWQ6IFZSTUh1bWFub2lkKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMudnJtSHVtYW5vaWQgPSBodW1hbm9pZDtcblxuICAgIHRoaXMuX2JvbmVBeGVzTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgT2JqZWN0LnZhbHVlcyhodW1hbm9pZC5odW1hbkJvbmVzKS5mb3JFYWNoKChib25lKSA9PiB7XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgVEhSRUUuQXhlc0hlbHBlcigxLjApO1xuXG4gICAgICBoZWxwZXIubWF0cml4QXV0b1VwZGF0ZSA9IGZhbHNlO1xuXG4gICAgICAoaGVscGVyLm1hdGVyaWFsIGFzIFRIUkVFLk1hdGVyaWFsKS5kZXB0aFRlc3QgPSBmYWxzZTtcbiAgICAgIChoZWxwZXIubWF0ZXJpYWwgYXMgVEhSRUUuTWF0ZXJpYWwpLmRlcHRoV3JpdGUgPSBmYWxzZTtcblxuICAgICAgdGhpcy5hZGQoaGVscGVyKTtcblxuICAgICAgdGhpcy5fYm9uZUF4ZXNNYXAuc2V0KGJvbmUsIGhlbHBlcik7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICBBcnJheS5mcm9tKHRoaXMuX2JvbmVBeGVzTWFwLnZhbHVlcygpKS5mb3JFYWNoKChheGVzKSA9PiB7XG4gICAgICBheGVzLmdlb21ldHJ5LmRpc3Bvc2UoKTtcbiAgICAgIChheGVzLm1hdGVyaWFsIGFzIFRIUkVFLk1hdGVyaWFsKS5kaXNwb3NlKCk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlTWF0cml4V29ybGQoZm9yY2U6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBBcnJheS5mcm9tKHRoaXMuX2JvbmVBeGVzTWFwLmVudHJpZXMoKSkuZm9yRWFjaCgoW2JvbmUsIGF4ZXNdKSA9PiB7XG4gICAgICBib25lLm5vZGUudXBkYXRlV29ybGRNYXRyaXgodHJ1ZSwgZmFsc2UpO1xuXG4gICAgICBib25lLm5vZGUubWF0cml4V29ybGQuZGVjb21wb3NlKF92M0EsIF9xdWF0QSwgX3YzQik7XG5cbiAgICAgIGNvbnN0IHNjYWxlID0gX3YzQS5zZXQoMC4xLCAwLjEsIDAuMSkuZGl2aWRlKF92M0IpO1xuICAgICAgYXhlcy5tYXRyaXguY29weShib25lLm5vZGUubWF0cml4V29ybGQpLnNjYWxlKHNjYWxlKTtcbiAgICB9KTtcblxuICAgIHN1cGVyLnVwZGF0ZU1hdHJpeFdvcmxkKGZvcmNlKTtcbiAgfVxufVxuIiwgIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiAqL1xuXG5pbXBvcnQgeyBWUk1IdW1hbkJvbmVOYW1lIH0gZnJvbSAnLi9WUk1IdW1hbkJvbmVOYW1lJztcblxuLyoqXG4gKiBUaGUgbGlzdCBvZiB7QGxpbmsgVlJNSHVtYW5Cb25lTmFtZX0uIERlcGVuZGVuY3kgYXdhcmUuXG4gKi9cbmV4cG9ydCBjb25zdCBWUk1IdW1hbkJvbmVMaXN0OiBWUk1IdW1hbkJvbmVOYW1lW10gPSBbXG4gICdoaXBzJyxcbiAgJ3NwaW5lJyxcbiAgJ2NoZXN0JyxcbiAgJ3VwcGVyQ2hlc3QnLFxuICAnbmVjaycsXG5cbiAgJ2hlYWQnLFxuICAnbGVmdEV5ZScsXG4gICdyaWdodEV5ZScsXG4gICdqYXcnLFxuXG4gICdsZWZ0VXBwZXJMZWcnLFxuICAnbGVmdExvd2VyTGVnJyxcbiAgJ2xlZnRGb290JyxcbiAgJ2xlZnRUb2VzJyxcblxuICAncmlnaHRVcHBlckxlZycsXG4gICdyaWdodExvd2VyTGVnJyxcbiAgJ3JpZ2h0Rm9vdCcsXG4gICdyaWdodFRvZXMnLFxuXG4gICdsZWZ0U2hvdWxkZXInLFxuICAnbGVmdFVwcGVyQXJtJyxcbiAgJ2xlZnRMb3dlckFybScsXG4gICdsZWZ0SGFuZCcsXG5cbiAgJ3JpZ2h0U2hvdWxkZXInLFxuICAncmlnaHRVcHBlckFybScsXG4gICdyaWdodExvd2VyQXJtJyxcbiAgJ3JpZ2h0SGFuZCcsXG5cbiAgJ2xlZnRUaHVtYk1ldGFjYXJwYWwnLFxuICAnbGVmdFRodW1iUHJveGltYWwnLFxuICAnbGVmdFRodW1iRGlzdGFsJyxcbiAgJ2xlZnRJbmRleFByb3hpbWFsJyxcbiAgJ2xlZnRJbmRleEludGVybWVkaWF0ZScsXG4gICdsZWZ0SW5kZXhEaXN0YWwnLFxuICAnbGVmdE1pZGRsZVByb3hpbWFsJyxcbiAgJ2xlZnRNaWRkbGVJbnRlcm1lZGlhdGUnLFxuICAnbGVmdE1pZGRsZURpc3RhbCcsXG4gICdsZWZ0UmluZ1Byb3hpbWFsJyxcbiAgJ2xlZnRSaW5nSW50ZXJtZWRpYXRlJyxcbiAgJ2xlZnRSaW5nRGlzdGFsJyxcbiAgJ2xlZnRMaXR0bGVQcm94aW1hbCcsXG4gICdsZWZ0TGl0dGxlSW50ZXJtZWRpYXRlJyxcbiAgJ2xlZnRMaXR0bGVEaXN0YWwnLFxuXG4gICdyaWdodFRodW1iTWV0YWNhcnBhbCcsXG4gICdyaWdodFRodW1iUHJveGltYWwnLFxuICAncmlnaHRUaHVtYkRpc3RhbCcsXG4gICdyaWdodEluZGV4UHJveGltYWwnLFxuICAncmlnaHRJbmRleEludGVybWVkaWF0ZScsXG4gICdyaWdodEluZGV4RGlzdGFsJyxcbiAgJ3JpZ2h0TWlkZGxlUHJveGltYWwnLFxuICAncmlnaHRNaWRkbGVJbnRlcm1lZGlhdGUnLFxuICAncmlnaHRNaWRkbGVEaXN0YWwnLFxuICAncmlnaHRSaW5nUHJveGltYWwnLFxuICAncmlnaHRSaW5nSW50ZXJtZWRpYXRlJyxcbiAgJ3JpZ2h0UmluZ0Rpc3RhbCcsXG4gICdyaWdodExpdHRsZVByb3hpbWFsJyxcbiAgJ3JpZ2h0TGl0dGxlSW50ZXJtZWRpYXRlJyxcbiAgJ3JpZ2h0TGl0dGxlRGlzdGFsJyxcbl07XG4iLCAiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uICovXG5cbi8qKlxuICogVGhlIG5hbWVzIG9mIHtAbGluayBWUk1IdW1hbm9pZH0gYm9uZSBuYW1lcy5cbiAqXG4gKiBSZWY6IGh0dHBzOi8vZ2l0aHViLmNvbS92cm0tYy92cm0tc3BlY2lmaWNhdGlvbi9ibG9iL21hc3Rlci9zcGVjaWZpY2F0aW9uL1ZSTUNfdnJtLTEuMC9odW1hbm9pZC5tZFxuICovXG5leHBvcnQgY29uc3QgVlJNSHVtYW5Cb25lTmFtZSA9IHtcbiAgSGlwczogJ2hpcHMnLFxuICBTcGluZTogJ3NwaW5lJyxcbiAgQ2hlc3Q6ICdjaGVzdCcsXG4gIFVwcGVyQ2hlc3Q6ICd1cHBlckNoZXN0JyxcbiAgTmVjazogJ25lY2snLFxuXG4gIEhlYWQ6ICdoZWFkJyxcbiAgTGVmdEV5ZTogJ2xlZnRFeWUnLFxuICBSaWdodEV5ZTogJ3JpZ2h0RXllJyxcbiAgSmF3OiAnamF3JyxcblxuICBMZWZ0VXBwZXJMZWc6ICdsZWZ0VXBwZXJMZWcnLFxuICBMZWZ0TG93ZXJMZWc6ICdsZWZ0TG93ZXJMZWcnLFxuICBMZWZ0Rm9vdDogJ2xlZnRGb290JyxcbiAgTGVmdFRvZXM6ICdsZWZ0VG9lcycsXG5cbiAgUmlnaHRVcHBlckxlZzogJ3JpZ2h0VXBwZXJMZWcnLFxuICBSaWdodExvd2VyTGVnOiAncmlnaHRMb3dlckxlZycsXG4gIFJpZ2h0Rm9vdDogJ3JpZ2h0Rm9vdCcsXG4gIFJpZ2h0VG9lczogJ3JpZ2h0VG9lcycsXG5cbiAgTGVmdFNob3VsZGVyOiAnbGVmdFNob3VsZGVyJyxcbiAgTGVmdFVwcGVyQXJtOiAnbGVmdFVwcGVyQXJtJyxcbiAgTGVmdExvd2VyQXJtOiAnbGVmdExvd2VyQXJtJyxcbiAgTGVmdEhhbmQ6ICdsZWZ0SGFuZCcsXG5cbiAgUmlnaHRTaG91bGRlcjogJ3JpZ2h0U2hvdWxkZXInLFxuICBSaWdodFVwcGVyQXJtOiAncmlnaHRVcHBlckFybScsXG4gIFJpZ2h0TG93ZXJBcm06ICdyaWdodExvd2VyQXJtJyxcbiAgUmlnaHRIYW5kOiAncmlnaHRIYW5kJyxcblxuICBMZWZ0VGh1bWJNZXRhY2FycGFsOiAnbGVmdFRodW1iTWV0YWNhcnBhbCcsXG4gIExlZnRUaHVtYlByb3hpbWFsOiAnbGVmdFRodW1iUHJveGltYWwnLFxuICBMZWZ0VGh1bWJEaXN0YWw6ICdsZWZ0VGh1bWJEaXN0YWwnLFxuICBMZWZ0SW5kZXhQcm94aW1hbDogJ2xlZnRJbmRleFByb3hpbWFsJyxcbiAgTGVmdEluZGV4SW50ZXJtZWRpYXRlOiAnbGVmdEluZGV4SW50ZXJtZWRpYXRlJyxcbiAgTGVmdEluZGV4RGlzdGFsOiAnbGVmdEluZGV4RGlzdGFsJyxcbiAgTGVmdE1pZGRsZVByb3hpbWFsOiAnbGVmdE1pZGRsZVByb3hpbWFsJyxcbiAgTGVmdE1pZGRsZUludGVybWVkaWF0ZTogJ2xlZnRNaWRkbGVJbnRlcm1lZGlhdGUnLFxuICBMZWZ0TWlkZGxlRGlzdGFsOiAnbGVmdE1pZGRsZURpc3RhbCcsXG4gIExlZnRSaW5nUHJveGltYWw6ICdsZWZ0UmluZ1Byb3hpbWFsJyxcbiAgTGVmdFJpbmdJbnRlcm1lZGlhdGU6ICdsZWZ0UmluZ0ludGVybWVkaWF0ZScsXG4gIExlZnRSaW5nRGlzdGFsOiAnbGVmdFJpbmdEaXN0YWwnLFxuICBMZWZ0TGl0dGxlUHJveGltYWw6ICdsZWZ0TGl0dGxlUHJveGltYWwnLFxuICBMZWZ0TGl0dGxlSW50ZXJtZWRpYXRlOiAnbGVmdExpdHRsZUludGVybWVkaWF0ZScsXG4gIExlZnRMaXR0bGVEaXN0YWw6ICdsZWZ0TGl0dGxlRGlzdGFsJyxcblxuICBSaWdodFRodW1iTWV0YWNhcnBhbDogJ3JpZ2h0VGh1bWJNZXRhY2FycGFsJyxcbiAgUmlnaHRUaHVtYlByb3hpbWFsOiAncmlnaHRUaHVtYlByb3hpbWFsJyxcbiAgUmlnaHRUaHVtYkRpc3RhbDogJ3JpZ2h0VGh1bWJEaXN0YWwnLFxuICBSaWdodEluZGV4UHJveGltYWw6ICdyaWdodEluZGV4UHJveGltYWwnLFxuICBSaWdodEluZGV4SW50ZXJtZWRpYXRlOiAncmlnaHRJbmRleEludGVybWVkaWF0ZScsXG4gIFJpZ2h0SW5kZXhEaXN0YWw6ICdyaWdodEluZGV4RGlzdGFsJyxcbiAgUmlnaHRNaWRkbGVQcm94aW1hbDogJ3JpZ2h0TWlkZGxlUHJveGltYWwnLFxuICBSaWdodE1pZGRsZUludGVybWVkaWF0ZTogJ3JpZ2h0TWlkZGxlSW50ZXJtZWRpYXRlJyxcbiAgUmlnaHRNaWRkbGVEaXN0YWw6ICdyaWdodE1pZGRsZURpc3RhbCcsXG4gIFJpZ2h0UmluZ1Byb3hpbWFsOiAncmlnaHRSaW5nUHJveGltYWwnLFxuICBSaWdodFJpbmdJbnRlcm1lZGlhdGU6ICdyaWdodFJpbmdJbnRlcm1lZGlhdGUnLFxuICBSaWdodFJpbmdEaXN0YWw6ICdyaWdodFJpbmdEaXN0YWwnLFxuICBSaWdodExpdHRsZVByb3hpbWFsOiAncmlnaHRMaXR0bGVQcm94aW1hbCcsXG4gIFJpZ2h0TGl0dGxlSW50ZXJtZWRpYXRlOiAncmlnaHRMaXR0bGVJbnRlcm1lZGlhdGUnLFxuICBSaWdodExpdHRsZURpc3RhbDogJ3JpZ2h0TGl0dGxlRGlzdGFsJyxcbn0gYXMgY29uc3Q7XG5cbmV4cG9ydCB0eXBlIFZSTUh1bWFuQm9uZU5hbWUgPSAodHlwZW9mIFZSTUh1bWFuQm9uZU5hbWUpW2tleW9mIHR5cGVvZiBWUk1IdW1hbkJvbmVOYW1lXTtcbiIsICIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cblxuaW1wb3J0IHsgVlJNSHVtYW5Cb25lTmFtZSB9IGZyb20gJy4vVlJNSHVtYW5Cb25lTmFtZSc7XG5cbi8qKlxuICogQW4gb2JqZWN0IHRoYXQgbWFwcyBmcm9tIHtAbGluayBWUk1IdW1hbkJvbmVOYW1lfSB0byBpdHMgcGFyZW50IHtAbGluayBWUk1IdW1hbkJvbmVOYW1lfS5cbiAqXG4gKiBSZWY6IGh0dHBzOi8vZ2l0aHViLmNvbS92cm0tYy92cm0tc3BlY2lmaWNhdGlvbi9ibG9iL21hc3Rlci9zcGVjaWZpY2F0aW9uL1ZSTUNfdnJtLTEuMC9odW1hbm9pZC5tZFxuICovXG5leHBvcnQgY29uc3QgVlJNSHVtYW5Cb25lUGFyZW50TWFwOiB7IFtib25lIGluIFZSTUh1bWFuQm9uZU5hbWVdOiBWUk1IdW1hbkJvbmVOYW1lIHwgbnVsbCB9ID0ge1xuICBoaXBzOiBudWxsLFxuICBzcGluZTogJ2hpcHMnLFxuICBjaGVzdDogJ3NwaW5lJyxcbiAgdXBwZXJDaGVzdDogJ2NoZXN0JyxcbiAgbmVjazogJ3VwcGVyQ2hlc3QnLFxuXG4gIGhlYWQ6ICduZWNrJyxcbiAgbGVmdEV5ZTogJ2hlYWQnLFxuICByaWdodEV5ZTogJ2hlYWQnLFxuICBqYXc6ICdoZWFkJyxcblxuICBsZWZ0VXBwZXJMZWc6ICdoaXBzJyxcbiAgbGVmdExvd2VyTGVnOiAnbGVmdFVwcGVyTGVnJyxcbiAgbGVmdEZvb3Q6ICdsZWZ0TG93ZXJMZWcnLFxuICBsZWZ0VG9lczogJ2xlZnRGb290JyxcblxuICByaWdodFVwcGVyTGVnOiAnaGlwcycsXG4gIHJpZ2h0TG93ZXJMZWc6ICdyaWdodFVwcGVyTGVnJyxcbiAgcmlnaHRGb290OiAncmlnaHRMb3dlckxlZycsXG4gIHJpZ2h0VG9lczogJ3JpZ2h0Rm9vdCcsXG5cbiAgbGVmdFNob3VsZGVyOiAndXBwZXJDaGVzdCcsXG4gIGxlZnRVcHBlckFybTogJ2xlZnRTaG91bGRlcicsXG4gIGxlZnRMb3dlckFybTogJ2xlZnRVcHBlckFybScsXG4gIGxlZnRIYW5kOiAnbGVmdExvd2VyQXJtJyxcblxuICByaWdodFNob3VsZGVyOiAndXBwZXJDaGVzdCcsXG4gIHJpZ2h0VXBwZXJBcm06ICdyaWdodFNob3VsZGVyJyxcbiAgcmlnaHRMb3dlckFybTogJ3JpZ2h0VXBwZXJBcm0nLFxuICByaWdodEhhbmQ6ICdyaWdodExvd2VyQXJtJyxcblxuICBsZWZ0VGh1bWJNZXRhY2FycGFsOiAnbGVmdEhhbmQnLFxuICBsZWZ0VGh1bWJQcm94aW1hbDogJ2xlZnRUaHVtYk1ldGFjYXJwYWwnLFxuICBsZWZ0VGh1bWJEaXN0YWw6ICdsZWZ0VGh1bWJQcm94aW1hbCcsXG4gIGxlZnRJbmRleFByb3hpbWFsOiAnbGVmdEhhbmQnLFxuICBsZWZ0SW5kZXhJbnRlcm1lZGlhdGU6ICdsZWZ0SW5kZXhQcm94aW1hbCcsXG4gIGxlZnRJbmRleERpc3RhbDogJ2xlZnRJbmRleEludGVybWVkaWF0ZScsXG4gIGxlZnRNaWRkbGVQcm94aW1hbDogJ2xlZnRIYW5kJyxcbiAgbGVmdE1pZGRsZUludGVybWVkaWF0ZTogJ2xlZnRNaWRkbGVQcm94aW1hbCcsXG4gIGxlZnRNaWRkbGVEaXN0YWw6ICdsZWZ0TWlkZGxlSW50ZXJtZWRpYXRlJyxcbiAgbGVmdFJpbmdQcm94aW1hbDogJ2xlZnRIYW5kJyxcbiAgbGVmdFJpbmdJbnRlcm1lZGlhdGU6ICdsZWZ0UmluZ1Byb3hpbWFsJyxcbiAgbGVmdFJpbmdEaXN0YWw6ICdsZWZ0UmluZ0ludGVybWVkaWF0ZScsXG4gIGxlZnRMaXR0bGVQcm94aW1hbDogJ2xlZnRIYW5kJyxcbiAgbGVmdExpdHRsZUludGVybWVkaWF0ZTogJ2xlZnRMaXR0bGVQcm94aW1hbCcsXG4gIGxlZnRMaXR0bGVEaXN0YWw6ICdsZWZ0TGl0dGxlSW50ZXJtZWRpYXRlJyxcblxuICByaWdodFRodW1iTWV0YWNhcnBhbDogJ3JpZ2h0SGFuZCcsXG4gIHJpZ2h0VGh1bWJQcm94aW1hbDogJ3JpZ2h0VGh1bWJNZXRhY2FycGFsJyxcbiAgcmlnaHRUaHVtYkRpc3RhbDogJ3JpZ2h0VGh1bWJQcm94aW1hbCcsXG4gIHJpZ2h0SW5kZXhQcm94aW1hbDogJ3JpZ2h0SGFuZCcsXG4gIHJpZ2h0SW5kZXhJbnRlcm1lZGlhdGU6ICdyaWdodEluZGV4UHJveGltYWwnLFxuICByaWdodEluZGV4RGlzdGFsOiAncmlnaHRJbmRleEludGVybWVkaWF0ZScsXG4gIHJpZ2h0TWlkZGxlUHJveGltYWw6ICdyaWdodEhhbmQnLFxuICByaWdodE1pZGRsZUludGVybWVkaWF0ZTogJ3JpZ2h0TWlkZGxlUHJveGltYWwnLFxuICByaWdodE1pZGRsZURpc3RhbDogJ3JpZ2h0TWlkZGxlSW50ZXJtZWRpYXRlJyxcbiAgcmlnaHRSaW5nUHJveGltYWw6ICdyaWdodEhhbmQnLFxuICByaWdodFJpbmdJbnRlcm1lZGlhdGU6ICdyaWdodFJpbmdQcm94aW1hbCcsXG4gIHJpZ2h0UmluZ0Rpc3RhbDogJ3JpZ2h0UmluZ0ludGVybWVkaWF0ZScsXG4gIHJpZ2h0TGl0dGxlUHJveGltYWw6ICdyaWdodEhhbmQnLFxuICByaWdodExpdHRsZUludGVybWVkaWF0ZTogJ3JpZ2h0TGl0dGxlUHJveGltYWwnLFxuICByaWdodExpdHRsZURpc3RhbDogJ3JpZ2h0TGl0dGxlSW50ZXJtZWRpYXRlJyxcbn07XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgcXVhdEludmVydENvbXBhdCB9IGZyb20gJy4uL3V0aWxzL3F1YXRJbnZlcnRDb21wYXQnO1xuaW1wb3J0IHR5cGUgeyBWUk1IdW1hbkJvbmUgfSBmcm9tICcuL1ZSTUh1bWFuQm9uZSc7XG5pbXBvcnQgdHlwZSB7IFZSTUh1bWFuQm9uZXMgfSBmcm9tICcuL1ZSTUh1bWFuQm9uZXMnO1xuaW1wb3J0IHR5cGUgeyBWUk1IdW1hbkJvbmVOYW1lIH0gZnJvbSAnLi9WUk1IdW1hbkJvbmVOYW1lJztcbmltcG9ydCB0eXBlIHsgVlJNUG9zZSB9IGZyb20gJy4vVlJNUG9zZSc7XG5cbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3F1YXRBID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblxuLyoqXG4gKiBBIGNsYXNzIHJlcHJlc2VudHMgdGhlIFJpZyBvZiBhIFZSTS5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTVJpZyB7XG4gIC8qKlxuICAgKiBBIHtAbGluayBWUk1IdW1hbkJvbmVzfSB0aGF0IGNvbnRhaW5zIGFsbCB0aGUgaHVtYW4gYm9uZXMgb2YgdGhlIFZSTS5cbiAgICogWW91IG1pZ2h0IHdhbnQgdG8gZ2V0IHRoZXNlIGJvbmVzIHVzaW5nIHtAbGluayBWUk1IdW1hbm9pZC5nZXRCb25lfS5cbiAgICovXG4gIHB1YmxpYyBodW1hbkJvbmVzOiBWUk1IdW1hbkJvbmVzO1xuXG4gIC8qKlxuICAgKiBBIHtAbGluayBWUk1Qb3NlfSB0aGF0IGlzIGl0cyBkZWZhdWx0IHN0YXRlLlxuICAgKiBOb3RlIHRoYXQgaXQncyBub3QgY29tcGF0aWJsZSB3aXRoIHtAbGluayBzZXRQb3NlfSBhbmQge0BsaW5rIGdldFBvc2V9LCBzaW5jZSBpdCBjb250YWlucyBub24tcmVsYXRpdmUgdmFsdWVzIG9mIGVhY2ggbG9jYWwgdHJhbnNmb3Jtcy5cbiAgICovXG4gIHB1YmxpYyByZXN0UG9zZTogVlJNUG9zZTtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IHtAbGluayBWUk1IdW1hbm9pZH0uXG4gICAqIEBwYXJhbSBodW1hbkJvbmVzIEEge0BsaW5rIFZSTUh1bWFuQm9uZXN9IGNvbnRhaW5zIGFsbCB0aGUgYm9uZXMgb2YgdGhlIG5ldyBodW1hbm9pZFxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKGh1bWFuQm9uZXM6IFZSTUh1bWFuQm9uZXMpIHtcbiAgICB0aGlzLmh1bWFuQm9uZXMgPSBodW1hbkJvbmVzO1xuXG4gICAgdGhpcy5yZXN0UG9zZSA9IHRoaXMuZ2V0QWJzb2x1dGVQb3NlKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBjdXJyZW50IGFic29sdXRlIHBvc2Ugb2YgdGhpcyBodW1hbm9pZCBhcyBhIHtAbGluayBWUk1Qb3NlfS5cbiAgICogTm90ZSB0aGF0IHRoZSBvdXRwdXQgcmVzdWx0IHdpbGwgY29udGFpbiBpbml0aWFsIHN0YXRlIG9mIHRoZSBWUk0gYW5kIG5vdCBjb21wYXRpYmxlIGJldHdlZW4gZGlmZmVyZW50IG1vZGVscy5cbiAgICogWW91IG1pZ2h0IHdhbnQgdG8gdXNlIHtAbGluayBnZXRQb3NlfSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIGdldEFic29sdXRlUG9zZSgpOiBWUk1Qb3NlIHtcbiAgICBjb25zdCBwb3NlID0ge30gYXMgVlJNUG9zZTtcblxuICAgIE9iamVjdC5rZXlzKHRoaXMuaHVtYW5Cb25lcykuZm9yRWFjaCgodnJtQm9uZU5hbWVTdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IHZybUJvbmVOYW1lID0gdnJtQm9uZU5hbWVTdHJpbmcgYXMgVlJNSHVtYW5Cb25lTmFtZTtcbiAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLmdldEJvbmVOb2RlKHZybUJvbmVOYW1lKTtcblxuICAgICAgLy8gSWdub3JlIHdoZW4gdGhlcmUgYXJlIG5vIGJvbmUgb24gdGhlIFZSTUh1bWFub2lkXG4gICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBHZXQgdGhlIHBvc2l0aW9uIC8gcm90YXRpb24gZnJvbSB0aGUgbm9kZVxuICAgICAgX3YzQS5jb3B5KG5vZGUucG9zaXRpb24pO1xuICAgICAgX3F1YXRBLmNvcHkobm9kZS5xdWF0ZXJuaW9uKTtcblxuICAgICAgLy8gQ29udmVydCB0byByYXcgYXJyYXlzXG4gICAgICBwb3NlW3ZybUJvbmVOYW1lXSA9IHtcbiAgICAgICAgcG9zaXRpb246IF92M0EudG9BcnJheSgpIGFzIFtudW1iZXIsIG51bWJlciwgbnVtYmVyXSxcbiAgICAgICAgcm90YXRpb246IF9xdWF0QS50b0FycmF5KCkgYXMgW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl0sXG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHBvc2U7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBjdXJyZW50IHBvc2Ugb2YgdGhpcyBodW1hbm9pZCBhcyBhIHtAbGluayBWUk1Qb3NlfS5cbiAgICpcbiAgICogRWFjaCB0cmFuc2Zvcm0gaXMgYSBsb2NhbCB0cmFuc2Zvcm0gcmVsYXRpdmUgZnJvbSByZXN0IHBvc2UgKFQtcG9zZSkuXG4gICAqL1xuICBwdWJsaWMgZ2V0UG9zZSgpOiBWUk1Qb3NlIHtcbiAgICBjb25zdCBwb3NlID0ge30gYXMgVlJNUG9zZTtcblxuICAgIE9iamVjdC5rZXlzKHRoaXMuaHVtYW5Cb25lcykuZm9yRWFjaCgoYm9uZU5hbWVTdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IGJvbmVOYW1lID0gYm9uZU5hbWVTdHJpbmcgYXMgVlJNSHVtYW5Cb25lTmFtZTtcbiAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLmdldEJvbmVOb2RlKGJvbmVOYW1lKTtcblxuICAgICAgLy8gSWdub3JlIHdoZW4gdGhlcmUgYXJlIG5vIGJvbmUgb24gdGhlIFZSTUh1bWFub2lkXG4gICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBUYWtlIGEgZGlmZiBmcm9tIHJlc3RQb3NlXG4gICAgICBfdjNBLnNldCgwLCAwLCAwKTtcbiAgICAgIF9xdWF0QS5pZGVudGl0eSgpO1xuXG4gICAgICBjb25zdCByZXN0U3RhdGUgPSB0aGlzLnJlc3RQb3NlW2JvbmVOYW1lXTtcbiAgICAgIGlmIChyZXN0U3RhdGU/LnBvc2l0aW9uKSB7XG4gICAgICAgIF92M0EuZnJvbUFycmF5KHJlc3RTdGF0ZS5wb3NpdGlvbikubmVnYXRlKCk7XG4gICAgICB9XG4gICAgICBpZiAocmVzdFN0YXRlPy5yb3RhdGlvbikge1xuICAgICAgICBxdWF0SW52ZXJ0Q29tcGF0KF9xdWF0QS5mcm9tQXJyYXkocmVzdFN0YXRlLnJvdGF0aW9uKSk7XG4gICAgICB9XG5cbiAgICAgIC8vIEdldCB0aGUgcG9zaXRpb24gLyByb3RhdGlvbiBmcm9tIHRoZSBub2RlXG4gICAgICBfdjNBLmFkZChub2RlLnBvc2l0aW9uKTtcbiAgICAgIF9xdWF0QS5wcmVtdWx0aXBseShub2RlLnF1YXRlcm5pb24pO1xuXG4gICAgICAvLyBDb252ZXJ0IHRvIHJhdyBhcnJheXNcbiAgICAgIHBvc2VbYm9uZU5hbWVdID0ge1xuICAgICAgICBwb3NpdGlvbjogX3YzQS50b0FycmF5KCkgYXMgW251bWJlciwgbnVtYmVyLCBudW1iZXJdLFxuICAgICAgICByb3RhdGlvbjogX3F1YXRBLnRvQXJyYXkoKSBhcyBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSxcbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcG9zZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMZXQgdGhlIGh1bWFub2lkIGRvIGEgc3BlY2lmaWVkIHBvc2UuXG4gICAqXG4gICAqIEVhY2ggdHJhbnNmb3JtIGhhdmUgdG8gYmUgYSBsb2NhbCB0cmFuc2Zvcm0gcmVsYXRpdmUgZnJvbSByZXN0IHBvc2UgKFQtcG9zZSkuXG4gICAqIFlvdSBjYW4gcGFzcyB3aGF0IHlvdSBnb3QgZnJvbSB7QGxpbmsgZ2V0UG9zZX0uXG4gICAqXG4gICAqIEBwYXJhbSBwb3NlT2JqZWN0IEEgW1tWUk1Qb3NlXV0gdGhhdCByZXByZXNlbnRzIGEgc2luZ2xlIHBvc2VcbiAgICovXG4gIHB1YmxpYyBzZXRQb3NlKHBvc2VPYmplY3Q6IFZSTVBvc2UpOiB2b2lkIHtcbiAgICBPYmplY3QuZW50cmllcyhwb3NlT2JqZWN0KS5mb3JFYWNoKChbYm9uZU5hbWVTdHJpbmcsIHN0YXRlXSkgPT4ge1xuICAgICAgY29uc3QgYm9uZU5hbWUgPSBib25lTmFtZVN0cmluZyBhcyBWUk1IdW1hbkJvbmVOYW1lO1xuICAgICAgY29uc3Qgbm9kZSA9IHRoaXMuZ2V0Qm9uZU5vZGUoYm9uZU5hbWUpO1xuXG4gICAgICAvLyBJZ25vcmUgd2hlbiB0aGVyZSBhcmUgbm8gYm9uZSB0aGF0IGlzIGRlZmluZWQgaW4gdGhlIHBvc2Ugb24gdGhlIFZSTUh1bWFub2lkXG4gICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByZXN0U3RhdGUgPSB0aGlzLnJlc3RQb3NlW2JvbmVOYW1lXTtcbiAgICAgIGlmICghcmVzdFN0YXRlKSB7XG4gICAgICAgIC8vIEl0J3MgdmVyeSB1bmxpa2VseS4gUG9zc2libHkgYSBidWdcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBBcHBseSB0aGUgc3RhdGUgdG8gdGhlIGFjdHVhbCBib25lXG4gICAgICBpZiAoc3RhdGU/LnBvc2l0aW9uKSB7XG4gICAgICAgIG5vZGUucG9zaXRpb24uZnJvbUFycmF5KHN0YXRlLnBvc2l0aW9uKTtcblxuICAgICAgICBpZiAocmVzdFN0YXRlLnBvc2l0aW9uKSB7XG4gICAgICAgICAgbm9kZS5wb3NpdGlvbi5hZGQoX3YzQS5mcm9tQXJyYXkocmVzdFN0YXRlLnBvc2l0aW9uKSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlPy5yb3RhdGlvbikge1xuICAgICAgICBub2RlLnF1YXRlcm5pb24uZnJvbUFycmF5KHN0YXRlLnJvdGF0aW9uKTtcblxuICAgICAgICBpZiAocmVzdFN0YXRlLnJvdGF0aW9uKSB7XG4gICAgICAgICAgbm9kZS5xdWF0ZXJuaW9uLm11bHRpcGx5KF9xdWF0QS5mcm9tQXJyYXkocmVzdFN0YXRlLnJvdGF0aW9uKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGUgaHVtYW5vaWQgdG8gaXRzIHJlc3QgcG9zZS5cbiAgICovXG4gIHB1YmxpYyByZXNldFBvc2UoKTogdm9pZCB7XG4gICAgT2JqZWN0LmVudHJpZXModGhpcy5yZXN0UG9zZSkuZm9yRWFjaCgoW2JvbmVOYW1lLCByZXN0XSkgPT4ge1xuICAgICAgY29uc3Qgbm9kZSA9IHRoaXMuZ2V0Qm9uZU5vZGUoYm9uZU5hbWUgYXMgVlJNSHVtYW5Cb25lTmFtZSk7XG5cbiAgICAgIGlmICghbm9kZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChyZXN0Py5wb3NpdGlvbikge1xuICAgICAgICBub2RlLnBvc2l0aW9uLmZyb21BcnJheShyZXN0LnBvc2l0aW9uKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHJlc3Q/LnJvdGF0aW9uKSB7XG4gICAgICAgIG5vZGUucXVhdGVybmlvbi5mcm9tQXJyYXkocmVzdC5yb3RhdGlvbik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGEgYm9uZSBib3VuZCB0byBhIHNwZWNpZmllZCB7QGxpbmsgVlJNSHVtYW5Cb25lTmFtZX0sIGFzIGEge0BsaW5rIFZSTUh1bWFuQm9uZX0uXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGJvbmUgeW91IHdhbnRcbiAgICovXG4gIHB1YmxpYyBnZXRCb25lKG5hbWU6IFZSTUh1bWFuQm9uZU5hbWUpOiBWUk1IdW1hbkJvbmUgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLmh1bWFuQm9uZXNbbmFtZV0gPz8gdW5kZWZpbmVkO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhIGJvbmUgYm91bmQgdG8gYSBzcGVjaWZpZWQge0BsaW5rIFZSTUh1bWFuQm9uZU5hbWV9LCBhcyBhIGBUSFJFRS5PYmplY3QzRGAuXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGJvbmUgeW91IHdhbnRcbiAgICovXG4gIHB1YmxpYyBnZXRCb25lTm9kZShuYW1lOiBWUk1IdW1hbkJvbmVOYW1lKTogVEhSRUUuT2JqZWN0M0QgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5odW1hbkJvbmVzW25hbWVdPy5ub2RlID8/IG51bGw7XG4gIH1cbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbi8qKlxuICogQSBjb21wYXQgZnVuY3Rpb24gZm9yIGBRdWF0ZXJuaW9uLmludmVydCgpYCAvIGBRdWF0ZXJuaW9uLmludmVyc2UoKWAuXG4gKiBgUXVhdGVybmlvbi5pbnZlcnQoKWAgaXMgaW50cm9kdWNlZCBpbiByMTIzIGFuZCBgUXVhdGVybmlvbi5pbnZlcnNlKClgIGVtaXRzIGEgd2FybmluZy5cbiAqIFdlIGFyZSBnb2luZyB0byB1c2UgdGhpcyBjb21wYXQgZm9yIGEgd2hpbGUuXG4gKiBAcGFyYW0gdGFyZ2V0IEEgdGFyZ2V0IHF1YXRlcm5pb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHF1YXRJbnZlcnRDb21wYXQ8VCBleHRlbmRzIFRIUkVFLlF1YXRlcm5pb24+KHRhcmdldDogVCk6IFQge1xuICBpZiAoKHRhcmdldCBhcyBhbnkpLmludmVydCkge1xuICAgIHRhcmdldC5pbnZlcnQoKTtcbiAgfSBlbHNlIHtcbiAgICAodGFyZ2V0IGFzIGFueSkuaW52ZXJzZSgpO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1IdW1hbkJvbmVOYW1lLCBWUk1IdW1hbkJvbmVzIH0gZnJvbSAnLic7XG5pbXBvcnQgeyBWUk1IdW1hbkJvbmVMaXN0IH0gZnJvbSAnLi9WUk1IdW1hbkJvbmVMaXN0JztcbmltcG9ydCB7IFZSTUh1bWFuQm9uZVBhcmVudE1hcCB9IGZyb20gJy4vVlJNSHVtYW5Cb25lUGFyZW50TWFwJztcbmltcG9ydCB7IFZSTVJpZyB9IGZyb20gJy4vVlJNUmlnJztcblxuY29uc3QgX3YzQSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfcXVhdEEgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuY29uc3QgX2JvbmVXb3JsZFBvcyA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbi8qKlxuICogQSBjbGFzcyByZXByZXNlbnRzIHRoZSBub3JtYWxpemVkIFJpZyBvZiBhIFZSTS5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUh1bWFub2lkUmlnIGV4dGVuZHMgVlJNUmlnIHtcbiAgcHJvdGVjdGVkIHN0YXRpYyBfc2V0dXBUcmFuc2Zvcm1zKG1vZGVsUmlnOiBWUk1SaWcpOiB7XG4gICAgcmlnQm9uZXM6IFZSTUh1bWFuQm9uZXM7XG4gICAgcm9vdDogVEhSRUUuT2JqZWN0M0Q7XG4gICAgcGFyZW50V29ybGRSb3RhdGlvbnM6IHsgW2JvbmVOYW1lIGluIFZSTUh1bWFuQm9uZU5hbWVdPzogVEhSRUUuUXVhdGVybmlvbiB9O1xuICAgIGJvbmVSb3RhdGlvbnM6IHsgW2JvbmVOYW1lIGluIFZSTUh1bWFuQm9uZU5hbWVdPzogVEhSRUUuUXVhdGVybmlvbiB9O1xuICB9IHtcbiAgICBjb25zdCByb290ID0gbmV3IFRIUkVFLk9iamVjdDNEKCk7XG4gICAgcm9vdC5uYW1lID0gJ1ZSTUh1bWFub2lkUmlnJztcblxuICAgIC8vIHN0b3JlIGJvbmVXb3JsZFBvc2l0aW9ucywgYm9uZVdvcmxkUm90YXRpb25zLCBhbmQgcGFyZW50V29ybGRSb3RhdGlvbnNcbiAgICBjb25zdCBib25lV29ybGRQb3NpdGlvbnM6IHsgW2JvbmVOYW1lIGluIFZSTUh1bWFuQm9uZU5hbWVdPzogVEhSRUUuVmVjdG9yMyB9ID0ge307XG4gICAgY29uc3QgYm9uZVdvcmxkUm90YXRpb25zOiB7IFtib25lTmFtZSBpbiBWUk1IdW1hbkJvbmVOYW1lXT86IFRIUkVFLlF1YXRlcm5pb24gfSA9IHt9O1xuICAgIGNvbnN0IGJvbmVSb3RhdGlvbnM6IHsgW2JvbmVOYW1lIGluIFZSTUh1bWFuQm9uZU5hbWVdPzogVEhSRUUuUXVhdGVybmlvbiB9ID0ge307XG4gICAgY29uc3QgcGFyZW50V29ybGRSb3RhdGlvbnM6IHsgW2JvbmVOYW1lIGluIFZSTUh1bWFuQm9uZU5hbWVdPzogVEhSRUUuUXVhdGVybmlvbiB9ID0ge307XG5cbiAgICBWUk1IdW1hbkJvbmVMaXN0LmZvckVhY2goKGJvbmVOYW1lKSA9PiB7XG4gICAgICBjb25zdCBib25lTm9kZSA9IG1vZGVsUmlnLmdldEJvbmVOb2RlKGJvbmVOYW1lKTtcblxuICAgICAgaWYgKGJvbmVOb2RlKSB7XG4gICAgICAgIGNvbnN0IGJvbmVXb3JsZFBvc2l0aW9uID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbiAgICAgICAgY29uc3QgYm9uZVdvcmxkUm90YXRpb24gPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXG4gICAgICAgIGJvbmVOb2RlLnVwZGF0ZVdvcmxkTWF0cml4KHRydWUsIGZhbHNlKTtcbiAgICAgICAgYm9uZU5vZGUubWF0cml4V29ybGQuZGVjb21wb3NlKGJvbmVXb3JsZFBvc2l0aW9uLCBib25lV29ybGRSb3RhdGlvbiwgX3YzQSk7XG5cbiAgICAgICAgYm9uZVdvcmxkUG9zaXRpb25zW2JvbmVOYW1lXSA9IGJvbmVXb3JsZFBvc2l0aW9uO1xuICAgICAgICBib25lV29ybGRSb3RhdGlvbnNbYm9uZU5hbWVdID0gYm9uZVdvcmxkUm90YXRpb247XG4gICAgICAgIGJvbmVSb3RhdGlvbnNbYm9uZU5hbWVdID0gYm9uZU5vZGUucXVhdGVybmlvbi5jbG9uZSgpO1xuXG4gICAgICAgIGNvbnN0IHBhcmVudFdvcmxkUm90YXRpb24gPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuICAgICAgICBib25lTm9kZS5wYXJlbnQ/Lm1hdHJpeFdvcmxkLmRlY29tcG9zZShfdjNBLCBwYXJlbnRXb3JsZFJvdGF0aW9uLCBfdjNBKTtcbiAgICAgICAgcGFyZW50V29ybGRSb3RhdGlvbnNbYm9uZU5hbWVdID0gcGFyZW50V29ybGRSb3RhdGlvbjtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIGJ1aWxkIHJpZyBoaWVyYXJjaHkgKyBzdG9yZSBwYXJlbnRXb3JsZFJvdGF0aW9uc1xuICAgIGNvbnN0IHJpZ0JvbmVzOiBQYXJ0aWFsPFZSTUh1bWFuQm9uZXM+ID0ge307XG4gICAgVlJNSHVtYW5Cb25lTGlzdC5mb3JFYWNoKChib25lTmFtZSkgPT4ge1xuICAgICAgY29uc3QgYm9uZU5vZGUgPSBtb2RlbFJpZy5nZXRCb25lTm9kZShib25lTmFtZSk7XG5cbiAgICAgIGlmIChib25lTm9kZSkge1xuICAgICAgICBjb25zdCBib25lV29ybGRQb3NpdGlvbiA9IGJvbmVXb3JsZFBvc2l0aW9uc1tib25lTmFtZV0gYXMgVEhSRUUuVmVjdG9yMztcblxuICAgICAgICAvLyBzZWUgdGhlIG5lYXJlc3QgcGFyZW50IHBvc2l0aW9uXG4gICAgICAgIGxldCBjdXJyZW50Qm9uZU5hbWU6IFZSTUh1bWFuQm9uZU5hbWUgfCBudWxsID0gYm9uZU5hbWU7XG4gICAgICAgIGxldCBwYXJlbnRCb25lV29ybGRQb3NpdGlvbjogVEhSRUUuVmVjdG9yMyB8IHVuZGVmaW5lZDtcbiAgICAgICAgd2hpbGUgKHBhcmVudEJvbmVXb3JsZFBvc2l0aW9uID09IG51bGwpIHtcbiAgICAgICAgICBjdXJyZW50Qm9uZU5hbWUgPSBWUk1IdW1hbkJvbmVQYXJlbnRNYXBbY3VycmVudEJvbmVOYW1lXTtcbiAgICAgICAgICBpZiAoY3VycmVudEJvbmVOYW1lID09IG51bGwpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBwYXJlbnRCb25lV29ybGRQb3NpdGlvbiA9IGJvbmVXb3JsZFBvc2l0aW9uc1tjdXJyZW50Qm9uZU5hbWVdO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYWRkIHRvIGhpZXJhcmNoeVxuICAgICAgICBjb25zdCByaWdCb25lTm9kZSA9IG5ldyBUSFJFRS5PYmplY3QzRCgpO1xuICAgICAgICByaWdCb25lTm9kZS5uYW1lID0gJ05vcm1hbGl6ZWRfJyArIGJvbmVOb2RlLm5hbWU7XG5cbiAgICAgICAgY29uc3QgcGFyZW50UmlnQm9uZU5vZGUgPSAoY3VycmVudEJvbmVOYW1lID8gcmlnQm9uZXNbY3VycmVudEJvbmVOYW1lXT8ubm9kZSA6IHJvb3QpIGFzIFRIUkVFLk9iamVjdDNEO1xuXG4gICAgICAgIHBhcmVudFJpZ0JvbmVOb2RlLmFkZChyaWdCb25lTm9kZSk7XG4gICAgICAgIHJpZ0JvbmVOb2RlLnBvc2l0aW9uLmNvcHkoYm9uZVdvcmxkUG9zaXRpb24pO1xuICAgICAgICBpZiAocGFyZW50Qm9uZVdvcmxkUG9zaXRpb24pIHtcbiAgICAgICAgICByaWdCb25lTm9kZS5wb3NpdGlvbi5zdWIocGFyZW50Qm9uZVdvcmxkUG9zaXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmlnQm9uZXNbYm9uZU5hbWVdID0geyBub2RlOiByaWdCb25lTm9kZSB9O1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHJpZ0JvbmVzOiByaWdCb25lcyBhcyBWUk1IdW1hbkJvbmVzLFxuICAgICAgcm9vdCxcbiAgICAgIHBhcmVudFdvcmxkUm90YXRpb25zLFxuICAgICAgYm9uZVJvdGF0aW9ucyxcbiAgICB9O1xuICB9XG5cbiAgcHVibGljIHJlYWRvbmx5IG9yaWdpbmFsOiBWUk1SaWc7XG4gIHB1YmxpYyByZWFkb25seSByb290OiBUSFJFRS5PYmplY3QzRDtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9wYXJlbnRXb3JsZFJvdGF0aW9uczogeyBbYm9uZU5hbWUgaW4gVlJNSHVtYW5Cb25lTmFtZV0/OiBUSFJFRS5RdWF0ZXJuaW9uIH07XG4gIHByb3RlY3RlZCByZWFkb25seSBfYm9uZVJvdGF0aW9uczogeyBbYm9uZU5hbWUgaW4gVlJNSHVtYW5Cb25lTmFtZV0/OiBUSFJFRS5RdWF0ZXJuaW9uIH07XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGh1bWFub2lkOiBWUk1SaWcpIHtcbiAgICBjb25zdCB7IHJpZ0JvbmVzLCByb290LCBwYXJlbnRXb3JsZFJvdGF0aW9ucywgYm9uZVJvdGF0aW9ucyB9ID0gVlJNSHVtYW5vaWRSaWcuX3NldHVwVHJhbnNmb3JtcyhodW1hbm9pZCk7XG5cbiAgICBzdXBlcihyaWdCb25lcyk7XG5cbiAgICB0aGlzLm9yaWdpbmFsID0gaHVtYW5vaWQ7XG4gICAgdGhpcy5yb290ID0gcm9vdDtcbiAgICB0aGlzLl9wYXJlbnRXb3JsZFJvdGF0aW9ucyA9IHBhcmVudFdvcmxkUm90YXRpb25zO1xuICAgIHRoaXMuX2JvbmVSb3RhdGlvbnMgPSBib25lUm90YXRpb25zO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGlzIGh1bWFub2lkIHJpZy5cbiAgICovXG4gIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgVlJNSHVtYW5Cb25lTGlzdC5mb3JFYWNoKChib25lTmFtZSkgPT4ge1xuICAgICAgY29uc3QgYm9uZU5vZGUgPSB0aGlzLm9yaWdpbmFsLmdldEJvbmVOb2RlKGJvbmVOYW1lKTtcblxuICAgICAgaWYgKGJvbmVOb2RlICE9IG51bGwpIHtcbiAgICAgICAgY29uc3QgcmlnQm9uZU5vZGUgPSB0aGlzLmdldEJvbmVOb2RlKGJvbmVOYW1lKSE7XG4gICAgICAgIGNvbnN0IHBhcmVudFdvcmxkUm90YXRpb24gPSB0aGlzLl9wYXJlbnRXb3JsZFJvdGF0aW9uc1tib25lTmFtZV0hO1xuICAgICAgICBjb25zdCBpbnZQYXJlbnRXb3JsZFJvdGF0aW9uID0gX3F1YXRBLmNvcHkocGFyZW50V29ybGRSb3RhdGlvbikuaW52ZXJ0KCk7XG4gICAgICAgIGNvbnN0IGJvbmVSb3RhdGlvbiA9IHRoaXMuX2JvbmVSb3RhdGlvbnNbYm9uZU5hbWVdITtcblxuICAgICAgICBib25lTm9kZS5xdWF0ZXJuaW9uXG4gICAgICAgICAgLmNvcHkocmlnQm9uZU5vZGUucXVhdGVybmlvbilcbiAgICAgICAgICAubXVsdGlwbHkocGFyZW50V29ybGRSb3RhdGlvbilcbiAgICAgICAgICAucHJlbXVsdGlwbHkoaW52UGFyZW50V29ybGRSb3RhdGlvbilcbiAgICAgICAgICAubXVsdGlwbHkoYm9uZVJvdGF0aW9uKTtcblxuICAgICAgICAvLyBNb3ZlIHRoZSBtYXNzIGNlbnRlciBvZiB0aGUgVlJNXG4gICAgICAgIGlmIChib25lTmFtZSA9PT0gJ2hpcHMnKSB7XG4gICAgICAgICAgY29uc3QgYm9uZVdvcmxkUG9zaXRpb24gPSByaWdCb25lTm9kZS5nZXRXb3JsZFBvc2l0aW9uKF9ib25lV29ybGRQb3MpO1xuICAgICAgICAgIGJvbmVOb2RlLnBhcmVudCEudXBkYXRlV29ybGRNYXRyaXgodHJ1ZSwgZmFsc2UpO1xuICAgICAgICAgIGNvbnN0IHBhcmVudFdvcmxkTWF0cml4ID0gYm9uZU5vZGUucGFyZW50IS5tYXRyaXhXb3JsZDtcbiAgICAgICAgICBjb25zdCBsb2NhbFBvc2l0aW9uID0gYm9uZVdvcmxkUG9zaXRpb24uYXBwbHlNYXRyaXg0KHBhcmVudFdvcmxkTWF0cml4LmludmVydCgpKTtcbiAgICAgICAgICBib25lTm9kZS5wb3NpdGlvbi5jb3B5KGxvY2FsUG9zaXRpb24pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgdHlwZSB7IFZSTUh1bWFuQm9uZSB9IGZyb20gJy4vVlJNSHVtYW5Cb25lJztcbmltcG9ydCB0eXBlIHsgVlJNSHVtYW5Cb25lcyB9IGZyb20gJy4vVlJNSHVtYW5Cb25lcyc7XG5pbXBvcnQgdHlwZSB7IFZSTUh1bWFuQm9uZU5hbWUgfSBmcm9tICcuL1ZSTUh1bWFuQm9uZU5hbWUnO1xuaW1wb3J0IHR5cGUgeyBWUk1Qb3NlIH0gZnJvbSAnLi9WUk1Qb3NlJztcbmltcG9ydCB7IFZSTVJpZyB9IGZyb20gJy4vVlJNUmlnJztcbmltcG9ydCB7IFZSTUh1bWFub2lkUmlnIH0gZnJvbSAnLi9WUk1IdW1hbm9pZFJpZyc7XG5cbi8qKlxuICogQSBjbGFzcyByZXByZXNlbnRzIGEgaHVtYW5vaWQgb2YgYSBWUk0uXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1IdW1hbm9pZCB7XG4gIC8qKlxuICAgKiBXaGV0aGVyIGl0IGNvcGllcyBwb3NlIGZyb20gbm9ybWFsaXplZEh1bWFuQm9uZXMgdG8gcmF3SHVtYW5Cb25lcyBvbiB7QGxpbmsgdXBkYXRlfS5cbiAgICogYHRydWVgIGJ5IGRlZmF1bHQuXG4gICAqXG4gICAqIEBkZWZhdWx0IHRydWVcbiAgICovXG4gIHB1YmxpYyBhdXRvVXBkYXRlSHVtYW5Cb25lczogYm9vbGVhbjtcblxuICAvKipcbiAgICogQSByYXcgcmlnIG9mIHRoZSBWUk0uXG4gICAqL1xuICBwcml2YXRlIF9yYXdIdW1hbkJvbmVzOiBWUk1SaWc7IC8vIFRPRE86IFJlbmFtZVxuXG4gIC8qKlxuICAgKiBBIG5vcm1hbGl6ZWQgcmlnIG9mIHRoZSBWUk0uXG4gICAqL1xuICBwcml2YXRlIF9ub3JtYWxpemVkSHVtYW5Cb25lczogVlJNSHVtYW5vaWRSaWc7IC8vIFRPRE86IFJlbmFtZVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBEZXByZWNhdGVkLiBVc2UgZWl0aGVyIHtAbGluayByYXdSZXN0UG9zZX0gb3Ige0BsaW5rIG5vcm1hbGl6ZWRSZXN0UG9zZX0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBnZXQgcmVzdFBvc2UoKTogVlJNUG9zZSB7XG4gICAgY29uc29sZS53YXJuKCdWUk1IdW1hbm9pZDogcmVzdFBvc2UgaXMgZGVwcmVjYXRlZC4gVXNlIGVpdGhlciByYXdSZXN0UG9zZSBvciBub3JtYWxpemVkUmVzdFBvc2UgaW5zdGVhZC4nKTtcblxuICAgIHJldHVybiB0aGlzLnJhd1Jlc3RQb3NlO1xuICB9XG5cbiAgLyoqXG4gICAqIEEge0BsaW5rIFZSTVBvc2V9IG9mIGl0cyByYXcgaHVtYW4gYm9uZXMgdGhhdCBpcyBpdHMgZGVmYXVsdCBzdGF0ZS5cbiAgICogTm90ZSB0aGF0IGl0J3Mgbm90IGNvbXBhdGlibGUgd2l0aCB7QGxpbmsgc2V0UmF3UG9zZX0gYW5kIHtAbGluayBnZXRSYXdQb3NlfSwgc2luY2UgaXQgY29udGFpbnMgbm9uLXJlbGF0aXZlIHZhbHVlcyBvZiBlYWNoIGxvY2FsIHRyYW5zZm9ybXMuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJhd1Jlc3RQb3NlKCk6IFZSTVBvc2Uge1xuICAgIHJldHVybiB0aGlzLl9yYXdIdW1hbkJvbmVzLnJlc3RQb3NlO1xuICB9XG5cbiAgLyoqXG4gICAqIEEge0BsaW5rIFZSTVBvc2V9IG9mIGl0cyBub3JtYWxpemVkIGh1bWFuIGJvbmVzIHRoYXQgaXMgaXRzIGRlZmF1bHQgc3RhdGUuXG4gICAqIE5vdGUgdGhhdCBpdCdzIG5vdCBjb21wYXRpYmxlIHdpdGgge0BsaW5rIHNldE5vcm1hbGl6ZWRQb3NlfSBhbmQge0BsaW5rIGdldE5vcm1hbGl6ZWRQb3NlfSwgc2luY2UgaXQgY29udGFpbnMgbm9uLXJlbGF0aXZlIHZhbHVlcyBvZiBlYWNoIGxvY2FsIHRyYW5zZm9ybXMuXG4gICAqL1xuICBwdWJsaWMgZ2V0IG5vcm1hbGl6ZWRSZXN0UG9zZSgpOiBWUk1Qb3NlIHtcbiAgICByZXR1cm4gdGhpcy5fbm9ybWFsaXplZEh1bWFuQm9uZXMucmVzdFBvc2U7XG4gIH1cblxuICAvKipcbiAgICogQSBtYXAgZnJvbSB7QGxpbmsgVlJNSHVtYW5Cb25lTmFtZX0gdG8gcmF3IHtAbGluayBWUk1IdW1hbkJvbmV9cy5cbiAgICovXG4gIHB1YmxpYyBnZXQgaHVtYW5Cb25lcygpOiBWUk1IdW1hbkJvbmVzIHtcbiAgICAvLyBhbiBhbGlhcyBvZiBgcmF3SHVtYW5Cb25lc2BcbiAgICByZXR1cm4gdGhpcy5fcmF3SHVtYW5Cb25lcy5odW1hbkJvbmVzO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgbWFwIGZyb20ge0BsaW5rIFZSTUh1bWFuQm9uZU5hbWV9IHRvIHJhdyB7QGxpbmsgVlJNSHVtYW5Cb25lfXMuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJhd0h1bWFuQm9uZXMoKTogVlJNSHVtYW5Cb25lcyB7XG4gICAgcmV0dXJuIHRoaXMuX3Jhd0h1bWFuQm9uZXMuaHVtYW5Cb25lcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBIG1hcCBmcm9tIHtAbGluayBWUk1IdW1hbkJvbmVOYW1lfSB0byBub3JtYWxpemVkIHtAbGluayBWUk1IdW1hbkJvbmV9cy5cbiAgICovXG4gIHB1YmxpYyBnZXQgbm9ybWFsaXplZEh1bWFuQm9uZXMoKTogVlJNSHVtYW5Cb25lcyB7XG4gICAgcmV0dXJuIHRoaXMuX25vcm1hbGl6ZWRIdW1hbkJvbmVzLmh1bWFuQm9uZXM7XG4gIH1cblxuICAvKipcbiAgICogVGhlIHJvb3Qgb2Ygbm9ybWFsaXplZCB7QGxpbmsgVlJNSHVtYW5Cb25lfXMuXG4gICAqL1xuICBwdWJsaWMgZ2V0IG5vcm1hbGl6ZWRIdW1hbkJvbmVzUm9vdCgpOiBUSFJFRS5PYmplY3QzRCB7XG4gICAgcmV0dXJuIHRoaXMuX25vcm1hbGl6ZWRIdW1hbkJvbmVzLnJvb3Q7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IHtAbGluayBWUk1IdW1hbm9pZH0uXG4gICAqIEBwYXJhbSBodW1hbkJvbmVzIEEge0BsaW5rIFZSTUh1bWFuQm9uZXN9IGNvbnRhaW5zIGFsbCB0aGUgYm9uZXMgb2YgdGhlIG5ldyBodW1hbm9pZFxuICAgKiBAcGFyYW0gYXV0b1VwZGF0ZUh1bWFuQm9uZXMgV2hldGhlciBpdCBjb3BpZXMgcG9zZSBmcm9tIG5vcm1hbGl6ZWRIdW1hbkJvbmVzIHRvIHJhd0h1bWFuQm9uZXMgb24ge0BsaW5rIHVwZGF0ZX0uIGB0cnVlYCBieSBkZWZhdWx0LlxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKGh1bWFuQm9uZXM6IFZSTUh1bWFuQm9uZXMsIG9wdGlvbnM/OiB7IGF1dG9VcGRhdGVIdW1hbkJvbmVzPzogYm9vbGVhbiB9KSB7XG4gICAgdGhpcy5hdXRvVXBkYXRlSHVtYW5Cb25lcyA9IG9wdGlvbnM/LmF1dG9VcGRhdGVIdW1hbkJvbmVzID8/IHRydWU7XG4gICAgdGhpcy5fcmF3SHVtYW5Cb25lcyA9IG5ldyBWUk1SaWcoaHVtYW5Cb25lcyk7XG4gICAgdGhpcy5fbm9ybWFsaXplZEh1bWFuQm9uZXMgPSBuZXcgVlJNSHVtYW5vaWRSaWcodGhpcy5fcmF3SHVtYW5Cb25lcyk7XG4gIH1cblxuICAvKipcbiAgICogQ29weSB0aGUgZ2l2ZW4ge0BsaW5rIFZSTUh1bWFub2lkfSBpbnRvIHRoaXMgb25lLlxuICAgKiBAcGFyYW0gc291cmNlIFRoZSB7QGxpbmsgVlJNSHVtYW5vaWR9IHlvdSB3YW50IHRvIGNvcHlcbiAgICogQHJldHVybnMgdGhpc1xuICAgKi9cbiAgcHVibGljIGNvcHkoc291cmNlOiBWUk1IdW1hbm9pZCk6IHRoaXMge1xuICAgIHRoaXMuYXV0b1VwZGF0ZUh1bWFuQm9uZXMgPSBzb3VyY2UuYXV0b1VwZGF0ZUh1bWFuQm9uZXM7XG4gICAgdGhpcy5fcmF3SHVtYW5Cb25lcyA9IG5ldyBWUk1SaWcoc291cmNlLmh1bWFuQm9uZXMpO1xuICAgIHRoaXMuX25vcm1hbGl6ZWRIdW1hbkJvbmVzID0gbmV3IFZSTUh1bWFub2lkUmlnKHRoaXMuX3Jhd0h1bWFuQm9uZXMpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGNsb25lIG9mIHRoaXMge0BsaW5rIFZSTUh1bWFub2lkfS5cbiAgICogQHJldHVybnMgQ29waWVkIHtAbGluayBWUk1IdW1hbm9pZH1cbiAgICovXG4gIHB1YmxpYyBjbG9uZSgpOiBWUk1IdW1hbm9pZCB7XG4gICAgcmV0dXJuIG5ldyBWUk1IdW1hbm9pZCh0aGlzLmh1bWFuQm9uZXMsIHsgYXV0b1VwZGF0ZUh1bWFuQm9uZXM6IHRoaXMuYXV0b1VwZGF0ZUh1bWFuQm9uZXMgfSkuY29weSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBEZXByZWNhdGVkLiBVc2UgZWl0aGVyIHtAbGluayBnZXRSYXdBYnNvbHV0ZVBvc2V9IG9yIHtAbGluayBnZXROb3JtYWxpemVkQWJzb2x1dGVQb3NlfSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIGdldEFic29sdXRlUG9zZSgpOiBWUk1Qb3NlIHtcbiAgICBjb25zb2xlLndhcm4oXG4gICAgICAnVlJNSHVtYW5vaWQ6IGdldEFic29sdXRlUG9zZSgpIGlzIGRlcHJlY2F0ZWQuIFVzZSBlaXRoZXIgZ2V0UmF3QWJzb2x1dGVQb3NlKCkgb3IgZ2V0Tm9ybWFsaXplZEFic29sdXRlUG9zZSgpIGluc3RlYWQuJyxcbiAgICApO1xuXG4gICAgcmV0dXJuIHRoaXMuZ2V0UmF3QWJzb2x1dGVQb3NlKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBjdXJyZW50IGFic29sdXRlIHBvc2Ugb2YgdGhpcyByYXcgaHVtYW4gYm9uZXMgYXMgYSB7QGxpbmsgVlJNUG9zZX0uXG4gICAqIE5vdGUgdGhhdCB0aGUgb3V0cHV0IHJlc3VsdCB3aWxsIGNvbnRhaW4gaW5pdGlhbCBzdGF0ZSBvZiB0aGUgVlJNIGFuZCBub3QgY29tcGF0aWJsZSBiZXR3ZWVuIGRpZmZlcmVudCBtb2RlbHMuXG4gICAqIFlvdSBtaWdodCB3YW50IHRvIHVzZSB7QGxpbmsgZ2V0UmF3UG9zZX0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBnZXRSYXdBYnNvbHV0ZVBvc2UoKTogVlJNUG9zZSB7XG4gICAgcmV0dXJuIHRoaXMuX3Jhd0h1bWFuQm9uZXMuZ2V0QWJzb2x1dGVQb3NlKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBjdXJyZW50IGFic29sdXRlIHBvc2Ugb2YgdGhpcyBub3JtYWxpemVkIGh1bWFuIGJvbmVzIGFzIGEge0BsaW5rIFZSTVBvc2V9LlxuICAgKiBOb3RlIHRoYXQgdGhlIG91dHB1dCByZXN1bHQgd2lsbCBjb250YWluIGluaXRpYWwgc3RhdGUgb2YgdGhlIFZSTSBhbmQgbm90IGNvbXBhdGlibGUgYmV0d2VlbiBkaWZmZXJlbnQgbW9kZWxzLlxuICAgKiBZb3UgbWlnaHQgd2FudCB0byB1c2Uge0BsaW5rIGdldE5vcm1hbGl6ZWRQb3NlfSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIGdldE5vcm1hbGl6ZWRBYnNvbHV0ZVBvc2UoKTogVlJNUG9zZSB7XG4gICAgcmV0dXJuIHRoaXMuX25vcm1hbGl6ZWRIdW1hbkJvbmVzLmdldEFic29sdXRlUG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIERlcHJlY2F0ZWQuIFVzZSBlaXRoZXIge0BsaW5rIGdldFJhd1Bvc2V9IG9yIHtAbGluayBnZXROb3JtYWxpemVkUG9zZX0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBnZXRQb3NlKCk6IFZSTVBvc2Uge1xuICAgIGNvbnNvbGUud2FybignVlJNSHVtYW5vaWQ6IGdldFBvc2UoKSBpcyBkZXByZWNhdGVkLiBVc2UgZWl0aGVyIGdldFJhd1Bvc2UoKSBvciBnZXROb3JtYWxpemVkUG9zZSgpIGluc3RlYWQuJyk7XG5cbiAgICByZXR1cm4gdGhpcy5nZXRSYXdQb3NlKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBjdXJyZW50IHBvc2Ugb2YgcmF3IGh1bWFuIGJvbmVzIGFzIGEge0BsaW5rIFZSTVBvc2V9LlxuICAgKlxuICAgKiBFYWNoIHRyYW5zZm9ybSBpcyBhIGxvY2FsIHRyYW5zZm9ybSByZWxhdGl2ZSBmcm9tIHJlc3QgcG9zZSAoVC1wb3NlKS5cbiAgICovXG4gIHB1YmxpYyBnZXRSYXdQb3NlKCk6IFZSTVBvc2Uge1xuICAgIHJldHVybiB0aGlzLl9yYXdIdW1hbkJvbmVzLmdldFBvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGN1cnJlbnQgcG9zZSBvZiBub3JtYWxpemVkIGh1bWFuIGJvbmVzIGFzIGEge0BsaW5rIFZSTVBvc2V9LlxuICAgKlxuICAgKiBFYWNoIHRyYW5zZm9ybSBpcyBhIGxvY2FsIHRyYW5zZm9ybSByZWxhdGl2ZSBmcm9tIHJlc3QgcG9zZSAoVC1wb3NlKS5cbiAgICovXG4gIHB1YmxpYyBnZXROb3JtYWxpemVkUG9zZSgpOiBWUk1Qb3NlIHtcbiAgICByZXR1cm4gdGhpcy5fbm9ybWFsaXplZEh1bWFuQm9uZXMuZ2V0UG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIERlcHJlY2F0ZWQuIFVzZSBlaXRoZXIge0BsaW5rIHNldFJhd1Bvc2V9IG9yIHtAbGluayBzZXROb3JtYWxpemVkUG9zZX0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBzZXRQb3NlKHBvc2VPYmplY3Q6IFZSTVBvc2UpOiB2b2lkIHtcbiAgICBjb25zb2xlLndhcm4oJ1ZSTUh1bWFub2lkOiBzZXRQb3NlKCkgaXMgZGVwcmVjYXRlZC4gVXNlIGVpdGhlciBzZXRSYXdQb3NlKCkgb3Igc2V0Tm9ybWFsaXplZFBvc2UoKSBpbnN0ZWFkLicpO1xuXG4gICAgcmV0dXJuIHRoaXMuc2V0UmF3UG9zZShwb3NlT2JqZWN0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMZXQgdGhlIHJhdyBodW1hbiBib25lcyBkbyBhIHNwZWNpZmllZCBwb3NlLlxuICAgKlxuICAgKiBFYWNoIHRyYW5zZm9ybSBoYXZlIHRvIGJlIGEgbG9jYWwgdHJhbnNmb3JtIHJlbGF0aXZlIGZyb20gcmVzdCBwb3NlIChULXBvc2UpLlxuICAgKiBZb3UgY2FuIHBhc3Mgd2hhdCB5b3UgZ290IGZyb20ge0BsaW5rIGdldFJhd1Bvc2V9LlxuICAgKlxuICAgKiBJZiB5b3UgYXJlIHVzaW5nIHtAbGluayBhdXRvVXBkYXRlSHVtYW5Cb25lc30sIHlvdSBtaWdodCB3YW50IHRvIHVzZSB7QGxpbmsgc2V0Tm9ybWFsaXplZFBvc2V9IGluc3RlYWQuXG4gICAqXG4gICAqIEBwYXJhbSBwb3NlT2JqZWN0IEEge0BsaW5rIFZSTVBvc2V9IHRoYXQgcmVwcmVzZW50cyBhIHNpbmdsZSBwb3NlXG4gICAqL1xuICBwdWJsaWMgc2V0UmF3UG9zZShwb3NlT2JqZWN0OiBWUk1Qb3NlKTogdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMuX3Jhd0h1bWFuQm9uZXMuc2V0UG9zZShwb3NlT2JqZWN0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMZXQgdGhlIG5vcm1hbGl6ZWQgaHVtYW4gYm9uZXMgZG8gYSBzcGVjaWZpZWQgcG9zZS5cbiAgICpcbiAgICogRWFjaCB0cmFuc2Zvcm0gaGF2ZSB0byBiZSBhIGxvY2FsIHRyYW5zZm9ybSByZWxhdGl2ZSBmcm9tIHJlc3QgcG9zZSAoVC1wb3NlKS5cbiAgICogWW91IGNhbiBwYXNzIHdoYXQgeW91IGdvdCBmcm9tIHtAbGluayBnZXROb3JtYWxpemVkUG9zZX0uXG4gICAqXG4gICAqIEBwYXJhbSBwb3NlT2JqZWN0IEEge0BsaW5rIFZSTVBvc2V9IHRoYXQgcmVwcmVzZW50cyBhIHNpbmdsZSBwb3NlXG4gICAqL1xuICBwdWJsaWMgc2V0Tm9ybWFsaXplZFBvc2UocG9zZU9iamVjdDogVlJNUG9zZSk6IHZvaWQge1xuICAgIHJldHVybiB0aGlzLl9ub3JtYWxpemVkSHVtYW5Cb25lcy5zZXRQb3NlKHBvc2VPYmplY3QpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIERlcHJlY2F0ZWQuIFVzZSBlaXRoZXIge0BsaW5rIHJlc2V0UmF3UG9zZX0gb3Ige0BsaW5rIHJlc2V0Tm9ybWFsaXplZFBvc2V9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgcmVzZXRQb3NlKCk6IHZvaWQge1xuICAgIGNvbnNvbGUud2FybignVlJNSHVtYW5vaWQ6IHJlc2V0UG9zZSgpIGlzIGRlcHJlY2F0ZWQuIFVzZSBlaXRoZXIgcmVzZXRSYXdQb3NlKCkgb3IgcmVzZXROb3JtYWxpemVkUG9zZSgpIGluc3RlYWQuJyk7XG5cbiAgICByZXR1cm4gdGhpcy5yZXNldFJhd1Bvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGUgcmF3IGh1bWFub2lkIHRvIGl0cyByZXN0IHBvc2UuXG4gICAqXG4gICAqIElmIHlvdSBhcmUgdXNpbmcge0BsaW5rIGF1dG9VcGRhdGVIdW1hbkJvbmVzfSwgeW91IG1pZ2h0IHdhbnQgdG8gdXNlIHtAbGluayByZXNldE5vcm1hbGl6ZWRQb3NlfSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIHJlc2V0UmF3UG9zZSgpOiB2b2lkIHtcbiAgICByZXR1cm4gdGhpcy5fcmF3SHVtYW5Cb25lcy5yZXNldFBvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGUgbm9ybWFsaXplZCBodW1hbm9pZCB0byBpdHMgcmVzdCBwb3NlLlxuICAgKi9cbiAgcHVibGljIHJlc2V0Tm9ybWFsaXplZFBvc2UoKTogdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMuX25vcm1hbGl6ZWRIdW1hbkJvbmVzLnJlc2V0UG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIERlcHJlY2F0ZWQuIFVzZSBlaXRoZXIge0BsaW5rIGdldFJhd0JvbmV9IG9yIHtAbGluayBnZXROb3JtYWxpemVkQm9uZX0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBnZXRCb25lKG5hbWU6IFZSTUh1bWFuQm9uZU5hbWUpOiBWUk1IdW1hbkJvbmUgfCB1bmRlZmluZWQge1xuICAgIGNvbnNvbGUud2FybignVlJNSHVtYW5vaWQ6IGdldEJvbmUoKSBpcyBkZXByZWNhdGVkLiBVc2UgZWl0aGVyIGdldFJhd0JvbmUoKSBvciBnZXROb3JtYWxpemVkQm9uZSgpIGluc3RlYWQuJyk7XG5cbiAgICByZXR1cm4gdGhpcy5nZXRSYXdCb25lKG5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhIHJhdyB7QGxpbmsgVlJNSHVtYW5Cb25lfSBib3VuZCB0byBhIHNwZWNpZmllZCB7QGxpbmsgVlJNSHVtYW5Cb25lTmFtZX0uXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGJvbmUgeW91IHdhbnRcbiAgICovXG4gIHB1YmxpYyBnZXRSYXdCb25lKG5hbWU6IFZSTUh1bWFuQm9uZU5hbWUpOiBWUk1IdW1hbkJvbmUgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9yYXdIdW1hbkJvbmVzLmdldEJvbmUobmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGEgbm9ybWFsaXplZCB7QGxpbmsgVlJNSHVtYW5Cb25lfSBib3VuZCB0byBhIHNwZWNpZmllZCB7QGxpbmsgVlJNSHVtYW5Cb25lTmFtZX0uXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGJvbmUgeW91IHdhbnRcbiAgICovXG4gIHB1YmxpYyBnZXROb3JtYWxpemVkQm9uZShuYW1lOiBWUk1IdW1hbkJvbmVOYW1lKTogVlJNSHVtYW5Cb25lIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fbm9ybWFsaXplZEh1bWFuQm9uZXMuZ2V0Qm9uZShuYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBEZXByZWNhdGVkLiBVc2UgZWl0aGVyIHtAbGluayBnZXRSYXdCb25lTm9kZX0gb3Ige0BsaW5rIGdldE5vcm1hbGl6ZWRCb25lTm9kZX0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBnZXRCb25lTm9kZShuYW1lOiBWUk1IdW1hbkJvbmVOYW1lKTogVEhSRUUuT2JqZWN0M0QgfCBudWxsIHtcbiAgICBjb25zb2xlLndhcm4oXG4gICAgICAnVlJNSHVtYW5vaWQ6IGdldEJvbmVOb2RlKCkgaXMgZGVwcmVjYXRlZC4gVXNlIGVpdGhlciBnZXRSYXdCb25lTm9kZSgpIG9yIGdldE5vcm1hbGl6ZWRCb25lTm9kZSgpIGluc3RlYWQuJyxcbiAgICApO1xuXG4gICAgcmV0dXJuIHRoaXMuZ2V0UmF3Qm9uZU5vZGUobmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGEgcmF3IGJvbmUgYXMgYSBgVEhSRUUuT2JqZWN0M0RgIGJvdW5kIHRvIGEgc3BlY2lmaWVkIHtAbGluayBWUk1IdW1hbkJvbmVOYW1lfS5cbiAgICpcbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgYm9uZSB5b3Ugd2FudFxuICAgKi9cbiAgcHVibGljIGdldFJhd0JvbmVOb2RlKG5hbWU6IFZSTUh1bWFuQm9uZU5hbWUpOiBUSFJFRS5PYmplY3QzRCB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl9yYXdIdW1hbkJvbmVzLmdldEJvbmVOb2RlKG5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhIG5vcm1hbGl6ZWQgYm9uZSBhcyBhIGBUSFJFRS5PYmplY3QzRGAgYm91bmQgdG8gYSBzcGVjaWZpZWQge0BsaW5rIFZSTUh1bWFuQm9uZU5hbWV9LlxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBib25lIHlvdSB3YW50XG4gICAqL1xuICBwdWJsaWMgZ2V0Tm9ybWFsaXplZEJvbmVOb2RlKG5hbWU6IFZSTUh1bWFuQm9uZU5hbWUpOiBUSFJFRS5PYmplY3QzRCB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl9ub3JtYWxpemVkSHVtYW5Cb25lcy5nZXRCb25lTm9kZShuYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIGh1bWFub2lkIGNvbXBvbmVudC5cbiAgICpcbiAgICogSWYge0BsaW5rIGF1dG9VcGRhdGVIdW1hbkJvbmVzfSBpcyBgdHJ1ZWAsIGl0IHRyYW5zZmVycyB0aGUgcG9zZSBvZiBub3JtYWxpemVkIGh1bWFuIGJvbmVzIHRvIHJhdyBodW1hbiBib25lcy5cbiAgICovXG4gIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYXV0b1VwZGF0ZUh1bWFuQm9uZXMpIHtcbiAgICAgIHRoaXMuX25vcm1hbGl6ZWRIdW1hbkJvbmVzLnVwZGF0ZSgpO1xuICAgIH1cbiAgfVxufVxuIiwgIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiAqL1xuXG5leHBvcnQgY29uc3QgVlJNUmVxdWlyZWRIdW1hbkJvbmVOYW1lID0ge1xuICBIaXBzOiAnaGlwcycsXG4gIFNwaW5lOiAnc3BpbmUnLFxuICBIZWFkOiAnaGVhZCcsXG4gIExlZnRVcHBlckxlZzogJ2xlZnRVcHBlckxlZycsXG4gIExlZnRMb3dlckxlZzogJ2xlZnRMb3dlckxlZycsXG4gIExlZnRGb290OiAnbGVmdEZvb3QnLFxuICBSaWdodFVwcGVyTGVnOiAncmlnaHRVcHBlckxlZycsXG4gIFJpZ2h0TG93ZXJMZWc6ICdyaWdodExvd2VyTGVnJyxcbiAgUmlnaHRGb290OiAncmlnaHRGb290JyxcbiAgTGVmdFVwcGVyQXJtOiAnbGVmdFVwcGVyQXJtJyxcbiAgTGVmdExvd2VyQXJtOiAnbGVmdExvd2VyQXJtJyxcbiAgTGVmdEhhbmQ6ICdsZWZ0SGFuZCcsXG4gIFJpZ2h0VXBwZXJBcm06ICdyaWdodFVwcGVyQXJtJyxcbiAgUmlnaHRMb3dlckFybTogJ3JpZ2h0TG93ZXJBcm0nLFxuICBSaWdodEhhbmQ6ICdyaWdodEhhbmQnLFxufSBhcyBjb25zdDtcblxuZXhwb3J0IHR5cGUgVlJNUmVxdWlyZWRIdW1hbkJvbmVOYW1lID0gKHR5cGVvZiBWUk1SZXF1aXJlZEh1bWFuQm9uZU5hbWUpW2tleW9mIHR5cGVvZiBWUk1SZXF1aXJlZEh1bWFuQm9uZU5hbWVdO1xuIiwgImltcG9ydCB0eXBlICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHR5cGUgKiBhcyBWMFZSTSBmcm9tICdAcGl4aXYvdHlwZXMtdnJtLTAuMCc7XG5pbXBvcnQgdHlwZSAqIGFzIFYxVlJNU2NoZW1hIGZyb20gJ0BwaXhpdi90eXBlcy12cm1jLXZybS0xLjAnO1xuaW1wb3J0IHR5cGUgeyBHTFRGLCBHTFRGTG9hZGVyUGx1Z2luLCBHTFRGUGFyc2VyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlci5qcyc7XG5pbXBvcnQgeyBWUk1IdW1hbm9pZCB9IGZyb20gJy4vVlJNSHVtYW5vaWQnO1xuaW1wb3J0IHR5cGUgeyBWUk1IdW1hbkJvbmVzIH0gZnJvbSAnLi9WUk1IdW1hbkJvbmVzJztcbmltcG9ydCB7IFZSTVJlcXVpcmVkSHVtYW5Cb25lTmFtZSB9IGZyb20gJy4vVlJNUmVxdWlyZWRIdW1hbkJvbmVOYW1lJztcbmltcG9ydCB7IEdMVEYgYXMgR0xURlNjaGVtYSB9IGZyb20gJ0BnbHRmLXRyYW5zZm9ybS9jb3JlJztcbmltcG9ydCB7IFZSTUh1bWFub2lkSGVscGVyIH0gZnJvbSAnLi9oZWxwZXJzL1ZSTUh1bWFub2lkSGVscGVyJztcbmltcG9ydCB7IFZSTUh1bWFub2lkTG9hZGVyUGx1Z2luT3B0aW9ucyB9IGZyb20gJy4vVlJNSHVtYW5vaWRMb2FkZXJQbHVnaW5PcHRpb25zJztcblxuLyoqXG4gKiBQb3NzaWJsZSBzcGVjIHZlcnNpb25zIGl0IHJlY29nbml6ZXMuXG4gKi9cbmNvbnN0IFBPU1NJQkxFX1NQRUNfVkVSU0lPTlMgPSBuZXcgU2V0KFsnMS4wJywgJzEuMC1iZXRhJ10pO1xuXG4vKipcbiAqIEEgbWFwIGZyb20gb2xkIHRodW1iIGJvbmUgbmFtZXMgdG8gbmV3IHRodW1iIGJvbmUgbmFtZXNcbiAqL1xuY29uc3QgdGh1bWJCb25lTmFtZU1hcDogeyBba2V5OiBzdHJpbmddOiBWMVZSTVNjaGVtYS5IdW1hbm9pZEh1bWFuQm9uZU5hbWUgfCB1bmRlZmluZWQgfSA9IHtcbiAgbGVmdFRodW1iUHJveGltYWw6ICdsZWZ0VGh1bWJNZXRhY2FycGFsJyxcbiAgbGVmdFRodW1iSW50ZXJtZWRpYXRlOiAnbGVmdFRodW1iUHJveGltYWwnLFxuICByaWdodFRodW1iUHJveGltYWw6ICdyaWdodFRodW1iTWV0YWNhcnBhbCcsXG4gIHJpZ2h0VGh1bWJJbnRlcm1lZGlhdGU6ICdyaWdodFRodW1iUHJveGltYWwnLFxufTtcblxuLyoqXG4gKiBBIHBsdWdpbiBvZiBHTFRGTG9hZGVyIHRoYXQgaW1wb3J0cyBhIHtAbGluayBWUk1IdW1hbm9pZH0gZnJvbSBhIFZSTSBleHRlbnNpb24gb2YgYSBHTFRGLlxuICovXG5leHBvcnQgY2xhc3MgVlJNSHVtYW5vaWRMb2FkZXJQbHVnaW4gaW1wbGVtZW50cyBHTFRGTG9hZGVyUGx1Z2luIHtcbiAgLyoqXG4gICAqIFNwZWNpZnkgYW4gT2JqZWN0M0QgdG8gYWRkIHtAbGluayBWUk1IdW1hbm9pZEhlbHBlcn0uXG4gICAqIElmIG5vdCBzcGVjaWZpZWQsIGhlbHBlciB3aWxsIG5vdCBiZSBjcmVhdGVkLlxuICAgKiBJZiBgcmVuZGVyT3JkZXJgIGlzIHNldCB0byB0aGUgcm9vdCwgdGhlIGhlbHBlciB3aWxsIGNvcHkgdGhlIHNhbWUgYHJlbmRlck9yZGVyYCAuXG4gICAqL1xuICBwdWJsaWMgaGVscGVyUm9vdD86IFRIUkVFLk9iamVjdDNEO1xuXG4gIHB1YmxpYyBhdXRvVXBkYXRlSHVtYW5Cb25lcz86IGJvb2xlYW47XG5cbiAgcHVibGljIHJlYWRvbmx5IHBhcnNlcjogR0xURlBhcnNlcjtcblxuICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICAvLyBXZSBzaG91bGQgdXNlIHRoZSBleHRlbnNpb24gbmFtZSBpbnN0ZWFkIGJ1dCB3ZSBoYXZlIG11bHRpcGxlIHBsdWdpbnMgZm9yIGFuIGV4dGVuc2lvbi4uLlxuICAgIHJldHVybiAnVlJNSHVtYW5vaWRMb2FkZXJQbHVnaW4nO1xuICB9XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBhcnNlcjogR0xURlBhcnNlciwgb3B0aW9ucz86IFZSTUh1bWFub2lkTG9hZGVyUGx1Z2luT3B0aW9ucykge1xuICAgIHRoaXMucGFyc2VyID0gcGFyc2VyO1xuXG4gICAgdGhpcy5oZWxwZXJSb290ID0gb3B0aW9ucz8uaGVscGVyUm9vdDtcbiAgICB0aGlzLmF1dG9VcGRhdGVIdW1hbkJvbmVzID0gb3B0aW9ucz8uYXV0b1VwZGF0ZUh1bWFuQm9uZXM7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgYWZ0ZXJSb290KGdsdGY6IEdMVEYpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBnbHRmLnVzZXJEYXRhLnZybUh1bWFub2lkID0gYXdhaXQgdGhpcy5faW1wb3J0KGdsdGYpO1xuICB9XG5cbiAgLyoqXG4gICAqIEltcG9ydCBhIHtAbGluayBWUk1IdW1hbm9pZH0gZnJvbSBhIFZSTS5cbiAgICpcbiAgICogQHBhcmFtIGdsdGYgQSBwYXJzZWQgcmVzdWx0IG9mIEdMVEYgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gICAqL1xuICBwcml2YXRlIGFzeW5jIF9pbXBvcnQoZ2x0ZjogR0xURik6IFByb21pc2U8VlJNSHVtYW5vaWQgfCBudWxsPiB7XG4gICAgY29uc3QgdjFSZXN1bHQgPSBhd2FpdCB0aGlzLl92MUltcG9ydChnbHRmKTtcbiAgICBpZiAodjFSZXN1bHQpIHtcbiAgICAgIHJldHVybiB2MVJlc3VsdDtcbiAgICB9XG5cbiAgICBjb25zdCB2MFJlc3VsdCA9IGF3YWl0IHRoaXMuX3YwSW1wb3J0KGdsdGYpO1xuICAgIGlmICh2MFJlc3VsdCkge1xuICAgICAgcmV0dXJuIHYwUmVzdWx0O1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfdjFJbXBvcnQoZ2x0ZjogR0xURik6IFByb21pc2U8VlJNSHVtYW5vaWQgfCBudWxsPiB7XG4gICAgY29uc3QganNvbiA9IHRoaXMucGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAgIC8vIGVhcmx5IGFib3J0IGlmIGl0IGRvZXNuJ3QgdXNlIHZybVxuICAgIGNvbnN0IGlzVlJNVXNlZCA9IGpzb24uZXh0ZW5zaW9uc1VzZWQ/LmluZGV4T2YoJ1ZSTUNfdnJtJykgIT09IC0xO1xuICAgIGlmICghaXNWUk1Vc2VkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBleHRlbnNpb24gPSBqc29uLmV4dGVuc2lvbnM/LlsnVlJNQ192cm0nXSBhcyBWMVZSTVNjaGVtYS5WUk1DVlJNIHwgdW5kZWZpbmVkO1xuICAgIGlmICghZXh0ZW5zaW9uKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzcGVjVmVyc2lvbiA9IGV4dGVuc2lvbi5zcGVjVmVyc2lvbjtcbiAgICBpZiAoIVBPU1NJQkxFX1NQRUNfVkVSU0lPTlMuaGFzKHNwZWNWZXJzaW9uKSkge1xuICAgICAgY29uc29sZS53YXJuKGBWUk1IdW1hbm9pZExvYWRlclBsdWdpbjogVW5rbm93biBWUk1DX3ZybSBzcGVjVmVyc2lvbiBcIiR7c3BlY1ZlcnNpb259XCJgKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNjaGVtYUh1bWFub2lkID0gZXh0ZW5zaW9uLmh1bWFub2lkO1xuICAgIGlmICghc2NoZW1hSHVtYW5vaWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNvbXBhdDogMS4wLWJldGEgdGh1bWIgYm9uZSBuYW1lc1xuICAgICAqXG4gICAgICogYHRydWVgIGlmIGBsZWZ0VGh1bWJJbnRlcm1lZGlhdGVgIG9yIGByaWdodFRodW1iSW50ZXJtZWRpYXRlYCBleGlzdHNcbiAgICAgKi9cbiAgICBjb25zdCBleGlzdHNQcmV2aW91c1RodW1iTmFtZSA9XG4gICAgICAoc2NoZW1hSHVtYW5vaWQuaHVtYW5Cb25lcyBhcyBhbnkpLmxlZnRUaHVtYkludGVybWVkaWF0ZSAhPSBudWxsIHx8XG4gICAgICAoc2NoZW1hSHVtYW5vaWQuaHVtYW5Cb25lcyBhcyBhbnkpLnJpZ2h0VGh1bWJJbnRlcm1lZGlhdGUgIT0gbnVsbDtcblxuICAgIGNvbnN0IGh1bWFuQm9uZXM6IFBhcnRpYWw8VlJNSHVtYW5Cb25lcz4gPSB7fTtcbiAgICBpZiAoc2NoZW1hSHVtYW5vaWQuaHVtYW5Cb25lcyAhPSBudWxsKSB7XG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgT2JqZWN0LmVudHJpZXMoc2NoZW1hSHVtYW5vaWQuaHVtYW5Cb25lcykubWFwKGFzeW5jIChbYm9uZU5hbWVTdHJpbmcsIHNjaGVtYUh1bWFuQm9uZV0pID0+IHtcbiAgICAgICAgICBsZXQgYm9uZU5hbWUgPSBib25lTmFtZVN0cmluZyBhcyBWMVZSTVNjaGVtYS5IdW1hbm9pZEh1bWFuQm9uZU5hbWU7XG4gICAgICAgICAgY29uc3QgaW5kZXggPSBzY2hlbWFIdW1hbkJvbmUubm9kZTtcblxuICAgICAgICAgIC8vIGNvbXBhdDogMS4wLWJldGEgcHJldmlvdXMgdGh1bWIgYm9uZSBuYW1lc1xuICAgICAgICAgIGlmIChleGlzdHNQcmV2aW91c1RodW1iTmFtZSkge1xuICAgICAgICAgICAgY29uc3QgdGh1bWJCb25lTmFtZSA9IHRodW1iQm9uZU5hbWVNYXBbYm9uZU5hbWVdO1xuICAgICAgICAgICAgaWYgKHRodW1iQm9uZU5hbWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICBib25lTmFtZSA9IHRodW1iQm9uZU5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3Qgbm9kZSA9IGF3YWl0IHRoaXMucGFyc2VyLmdldERlcGVuZGVuY3koJ25vZGUnLCBpbmRleCk7XG5cbiAgICAgICAgICAvLyBpZiB0aGUgc3BlY2lmaWVkIG5vZGUgZG9lcyBub3QgZXhpc3QsIGVtaXQgYSB3YXJuaW5nXG4gICAgICAgICAgaWYgKG5vZGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGBBIGdsVEYgbm9kZSBib3VuZCB0byB0aGUgaHVtYW5vaWQgYm9uZSAke2JvbmVOYW1lfSAoaW5kZXggPSAke2luZGV4fSkgZG9lcyBub3QgZXhpc3RgKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBzZXQgdG8gdGhlIGBodW1hbkJvbmVzYFxuICAgICAgICAgIGh1bWFuQm9uZXNbYm9uZU5hbWVdID0geyBub2RlIH07XG4gICAgICAgIH0pLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBodW1hbm9pZCA9IG5ldyBWUk1IdW1hbm9pZCh0aGlzLl9lbnN1cmVSZXF1aXJlZEJvbmVzRXhpc3QoaHVtYW5Cb25lcyksIHtcbiAgICAgIGF1dG9VcGRhdGVIdW1hbkJvbmVzOiB0aGlzLmF1dG9VcGRhdGVIdW1hbkJvbmVzLFxuICAgIH0pO1xuICAgIGdsdGYuc2NlbmUuYWRkKGh1bWFub2lkLm5vcm1hbGl6ZWRIdW1hbkJvbmVzUm9vdCk7XG5cbiAgICBpZiAodGhpcy5oZWxwZXJSb290KSB7XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgVlJNSHVtYW5vaWRIZWxwZXIoaHVtYW5vaWQpO1xuICAgICAgdGhpcy5oZWxwZXJSb290LmFkZChoZWxwZXIpO1xuICAgICAgaGVscGVyLnJlbmRlck9yZGVyID0gdGhpcy5oZWxwZXJSb290LnJlbmRlck9yZGVyO1xuICAgIH1cblxuICAgIHJldHVybiBodW1hbm9pZDtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX3YwSW1wb3J0KGdsdGY6IEdMVEYpOiBQcm9taXNlPFZSTUh1bWFub2lkIHwgbnVsbD4ge1xuICAgIGNvbnN0IGpzb24gPSB0aGlzLnBhcnNlci5qc29uIGFzIEdMVEZTY2hlbWEuSUdMVEY7XG5cbiAgICBjb25zdCB2cm1FeHQgPSBqc29uLmV4dGVuc2lvbnM/LlZSTSBhcyBWMFZSTS5WUk0gfCB1bmRlZmluZWQ7XG4gICAgaWYgKCF2cm1FeHQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNjaGVtYUh1bWFub2lkOiBWMFZSTS5IdW1hbm9pZCB8IHVuZGVmaW5lZCA9IHZybUV4dC5odW1hbm9pZDtcbiAgICBpZiAoIXNjaGVtYUh1bWFub2lkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBodW1hbkJvbmVzOiBQYXJ0aWFsPFZSTUh1bWFuQm9uZXM+ID0ge307XG4gICAgaWYgKHNjaGVtYUh1bWFub2lkLmh1bWFuQm9uZXMgIT0gbnVsbCkge1xuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgIHNjaGVtYUh1bWFub2lkLmh1bWFuQm9uZXMubWFwKGFzeW5jIChib25lKSA9PiB7XG4gICAgICAgICAgY29uc3QgYm9uZU5hbWUgPSBib25lLmJvbmU7XG4gICAgICAgICAgY29uc3QgaW5kZXggPSBib25lLm5vZGU7XG5cbiAgICAgICAgICBpZiAoYm9uZU5hbWUgPT0gbnVsbCB8fCBpbmRleCA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3Qgbm9kZSA9IGF3YWl0IHRoaXMucGFyc2VyLmdldERlcGVuZGVuY3koJ25vZGUnLCBpbmRleCk7XG5cbiAgICAgICAgICAvLyBpZiB0aGUgc3BlY2lmaWVkIG5vZGUgZG9lcyBub3QgZXhpc3QsIGVtaXQgYSB3YXJuaW5nXG4gICAgICAgICAgaWYgKG5vZGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGBBIGdsVEYgbm9kZSBib3VuZCB0byB0aGUgaHVtYW5vaWQgYm9uZSAke2JvbmVOYW1lfSAoaW5kZXggPSAke2luZGV4fSkgZG9lcyBub3QgZXhpc3RgKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBtYXAgdG8gbmV3IGJvbmUgbmFtZVxuICAgICAgICAgIGNvbnN0IHRodW1iQm9uZU5hbWUgPSB0aHVtYkJvbmVOYW1lTWFwW2JvbmVOYW1lXTtcbiAgICAgICAgICBjb25zdCBuZXdCb25lTmFtZSA9ICh0aHVtYkJvbmVOYW1lID8/IGJvbmVOYW1lKSBhcyBWMVZSTVNjaGVtYS5IdW1hbm9pZEh1bWFuQm9uZU5hbWU7XG5cbiAgICAgICAgICAvLyB2MCBWUk1zIG1pZ2h0IGhhdmUgYSBtdWx0aXBsZSBub2RlcyBhdHRhY2hlZCB0byBhIHNpbmdsZSBib25lLi4uXG4gICAgICAgICAgLy8gc28gaWYgdGhlcmUgYWxyZWFkeSBpcyBhbiBlbnRyeSBpbiB0aGUgYGh1bWFuQm9uZXNgLCBzaG93IGEgd2FybmluZyBhbmQgaWdub3JlIGl0XG4gICAgICAgICAgaWYgKGh1bWFuQm9uZXNbbmV3Qm9uZU5hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgICAgYE11bHRpcGxlIGJvbmUgZW50cmllcyBmb3IgJHtuZXdCb25lTmFtZX0gZGV0ZWN0ZWQgKGluZGV4ID0gJHtpbmRleH0pLCBpZ25vcmluZyBkdXBsaWNhdGVkIGVudHJpZXMuYCxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gc2V0IHRvIHRoZSBgaHVtYW5Cb25lc2BcbiAgICAgICAgICBodW1hbkJvbmVzW25ld0JvbmVOYW1lXSA9IHsgbm9kZSB9O1xuICAgICAgICB9KSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgaHVtYW5vaWQgPSBuZXcgVlJNSHVtYW5vaWQodGhpcy5fZW5zdXJlUmVxdWlyZWRCb25lc0V4aXN0KGh1bWFuQm9uZXMpLCB7XG4gICAgICBhdXRvVXBkYXRlSHVtYW5Cb25lczogdGhpcy5hdXRvVXBkYXRlSHVtYW5Cb25lcyxcbiAgICB9KTtcbiAgICBnbHRmLnNjZW5lLmFkZChodW1hbm9pZC5ub3JtYWxpemVkSHVtYW5Cb25lc1Jvb3QpO1xuXG4gICAgaWYgKHRoaXMuaGVscGVyUm9vdCkge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IFZSTUh1bWFub2lkSGVscGVyKGh1bWFub2lkKTtcbiAgICAgIHRoaXMuaGVscGVyUm9vdC5hZGQoaGVscGVyKTtcbiAgICAgIGhlbHBlci5yZW5kZXJPcmRlciA9IHRoaXMuaGVscGVyUm9vdC5yZW5kZXJPcmRlcjtcbiAgICB9XG5cbiAgICByZXR1cm4gaHVtYW5vaWQ7XG4gIH1cblxuICAvKipcbiAgICogRW5zdXJlIHJlcXVpcmVkIGJvbmVzIGV4aXN0IGluIGdpdmVuIGh1bWFuIGJvbmVzLlxuICAgKiBAcGFyYW0gaHVtYW5Cb25lcyBIdW1hbiBib25lc1xuICAgKiBAcmV0dXJucyBIdW1hbiBib25lcywgbm8gbG9uZ2VyIHBhcnRpYWwhXG4gICAqL1xuICBwcml2YXRlIF9lbnN1cmVSZXF1aXJlZEJvbmVzRXhpc3QoaHVtYW5Cb25lczogUGFydGlhbDxWUk1IdW1hbkJvbmVzPik6IFZSTUh1bWFuQm9uZXMge1xuICAgIC8vIGVuc3VyZSByZXF1aXJlZCBib25lcyBleGlzdFxuICAgIGNvbnN0IG1pc3NpbmdSZXF1aXJlZEJvbmVzID0gT2JqZWN0LnZhbHVlcyhWUk1SZXF1aXJlZEh1bWFuQm9uZU5hbWUpLmZpbHRlcihcbiAgICAgIChyZXF1aXJlZEJvbmVOYW1lKSA9PiBodW1hbkJvbmVzW3JlcXVpcmVkQm9uZU5hbWVdID09IG51bGwsXG4gICAgKTtcblxuICAgIC8vIHRocm93IGFuIGVycm9yIGlmIHRoZXJlIGFyZSBtaXNzaW5nIGJvbmVzXG4gICAgaWYgKG1pc3NpbmdSZXF1aXJlZEJvbmVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYFZSTUh1bWFub2lkTG9hZGVyUGx1Z2luOiBUaGVzZSBodW1hbm9pZCBib25lcyBhcmUgcmVxdWlyZWQgYnV0IG5vdCBleGlzdDogJHttaXNzaW5nUmVxdWlyZWRCb25lcy5qb2luKCcsICcpfWAsXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBodW1hbkJvbmVzIGFzIFZSTUh1bWFuQm9uZXM7XG4gIH1cbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1Mb29rQXQgfSBmcm9tICcuLi9WUk1Mb29rQXQnO1xuaW1wb3J0IHsgRmFuQnVmZmVyR2VvbWV0cnkgfSBmcm9tICcuL3V0aWxzL0ZhbkJ1ZmZlckdlb21ldHJ5JztcbmltcG9ydCB7IExpbmVBbmRTcGhlcmVCdWZmZXJHZW9tZXRyeSB9IGZyb20gJy4vdXRpbHMvTGluZUFuZFNwaGVyZUJ1ZmZlckdlb21ldHJ5JztcblxuY29uc3QgX3F1YXRBID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbmNvbnN0IF9xdWF0QiA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF92M0IgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5jb25zdCBTUVJUXzJfT1ZFUl8yID0gTWF0aC5zcXJ0KDIuMCkgLyAyLjA7XG5jb25zdCBRVUFUX1hZX0NXOTAgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigwLCAwLCAtU1FSVF8yX09WRVJfMiwgU1FSVF8yX09WRVJfMik7XG5jb25zdCBWRUMzX1BPU0lUSVZFX1kgPSBuZXcgVEhSRUUuVmVjdG9yMygwLjAsIDEuMCwgMC4wKTtcblxuZXhwb3J0IGNsYXNzIFZSTUxvb2tBdEhlbHBlciBleHRlbmRzIFRIUkVFLkdyb3VwIHtcbiAgcHVibGljIHJlYWRvbmx5IHZybUxvb2tBdDogVlJNTG9va0F0O1xuICBwcml2YXRlIHJlYWRvbmx5IF9tZXNoWWF3OiBUSFJFRS5NZXNoPEZhbkJ1ZmZlckdlb21ldHJ5LCBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbD47XG4gIHByaXZhdGUgcmVhZG9ubHkgX21lc2hQaXRjaDogVEhSRUUuTWVzaDxGYW5CdWZmZXJHZW9tZXRyeSwgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWw+O1xuICBwcml2YXRlIHJlYWRvbmx5IF9saW5lVGFyZ2V0OiBUSFJFRS5MaW5lU2VnbWVudHM8TGluZUFuZFNwaGVyZUJ1ZmZlckdlb21ldHJ5LCBUSFJFRS5MaW5lQmFzaWNNYXRlcmlhbD47XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGxvb2tBdDogVlJNTG9va0F0KSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLm1hdHJpeEF1dG9VcGRhdGUgPSBmYWxzZTtcblxuICAgIHRoaXMudnJtTG9va0F0ID0gbG9va0F0O1xuXG4gICAge1xuICAgICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgRmFuQnVmZmVyR2VvbWV0cnkoKTtcbiAgICAgIGdlb21ldHJ5LnJhZGl1cyA9IDAuNTtcblxuICAgICAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICAgICAgICBjb2xvcjogMHgwMGZmMDAsXG4gICAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgICAgICBvcGFjaXR5OiAwLjUsXG4gICAgICAgIHNpZGU6IFRIUkVFLkRvdWJsZVNpZGUsXG4gICAgICAgIGRlcHRoVGVzdDogZmFsc2UsXG4gICAgICAgIGRlcHRoV3JpdGU6IGZhbHNlLFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuX21lc2hQaXRjaCA9IG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCk7XG4gICAgICB0aGlzLmFkZCh0aGlzLl9tZXNoUGl0Y2gpO1xuICAgIH1cblxuICAgIHtcbiAgICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IEZhbkJ1ZmZlckdlb21ldHJ5KCk7XG4gICAgICBnZW9tZXRyeS5yYWRpdXMgPSAwLjU7XG5cbiAgICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAgICAgICAgY29sb3I6IDB4ZmYwMDAwLFxuICAgICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICAgICAgb3BhY2l0eTogMC41LFxuICAgICAgICBzaWRlOiBUSFJFRS5Eb3VibGVTaWRlLFxuICAgICAgICBkZXB0aFRlc3Q6IGZhbHNlLFxuICAgICAgICBkZXB0aFdyaXRlOiBmYWxzZSxcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLl9tZXNoWWF3ID0gbmV3IFRIUkVFLk1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKTtcbiAgICAgIHRoaXMuYWRkKHRoaXMuX21lc2hZYXcpO1xuICAgIH1cblxuICAgIHtcbiAgICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IExpbmVBbmRTcGhlcmVCdWZmZXJHZW9tZXRyeSgpO1xuICAgICAgZ2VvbWV0cnkucmFkaXVzID0gMC4xO1xuXG4gICAgICBjb25zdCBtYXRlcmlhbCA9IG5ldyBUSFJFRS5MaW5lQmFzaWNNYXRlcmlhbCh7XG4gICAgICAgIGNvbG9yOiAweGZmZmZmZixcbiAgICAgICAgZGVwdGhUZXN0OiBmYWxzZSxcbiAgICAgICAgZGVwdGhXcml0ZTogZmFsc2UsXG4gICAgICB9KTtcblxuICAgICAgdGhpcy5fbGluZVRhcmdldCA9IG5ldyBUSFJFRS5MaW5lU2VnbWVudHMoZ2VvbWV0cnksIG1hdGVyaWFsKTtcbiAgICAgIHRoaXMuX2xpbmVUYXJnZXQuZnJ1c3R1bUN1bGxlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5hZGQodGhpcy5fbGluZVRhcmdldCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5fbWVzaFlhdy5nZW9tZXRyeS5kaXNwb3NlKCk7XG4gICAgdGhpcy5fbWVzaFlhdy5tYXRlcmlhbC5kaXNwb3NlKCk7XG5cbiAgICB0aGlzLl9tZXNoUGl0Y2guZ2VvbWV0cnkuZGlzcG9zZSgpO1xuICAgIHRoaXMuX21lc2hQaXRjaC5tYXRlcmlhbC5kaXNwb3NlKCk7XG5cbiAgICB0aGlzLl9saW5lVGFyZ2V0Lmdlb21ldHJ5LmRpc3Bvc2UoKTtcbiAgICB0aGlzLl9saW5lVGFyZ2V0Lm1hdGVyaWFsLmRpc3Bvc2UoKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVNYXRyaXhXb3JsZChmb3JjZTogYm9vbGVhbik6IHZvaWQge1xuICAgIC8vIHVwZGF0ZSBnZW9tZXRyaWVzXG4gICAgY29uc3QgeWF3ID0gVEhSRUUuTWF0aFV0aWxzLkRFRzJSQUQgKiB0aGlzLnZybUxvb2tBdC55YXc7XG4gICAgdGhpcy5fbWVzaFlhdy5nZW9tZXRyeS50aGV0YSA9IHlhdztcbiAgICB0aGlzLl9tZXNoWWF3Lmdlb21ldHJ5LnVwZGF0ZSgpO1xuXG4gICAgY29uc3QgcGl0Y2ggPSBUSFJFRS5NYXRoVXRpbHMuREVHMlJBRCAqIHRoaXMudnJtTG9va0F0LnBpdGNoO1xuICAgIHRoaXMuX21lc2hQaXRjaC5nZW9tZXRyeS50aGV0YSA9IHBpdGNoO1xuICAgIHRoaXMuX21lc2hQaXRjaC5nZW9tZXRyeS51cGRhdGUoKTtcblxuICAgIC8vIGdldCB3b3JsZCBwb3NpdGlvbiBhbmQgcXVhdGVybmlvblxuICAgIHRoaXMudnJtTG9va0F0LmdldExvb2tBdFdvcmxkUG9zaXRpb24oX3YzQSk7XG4gICAgdGhpcy52cm1Mb29rQXQuZ2V0TG9va0F0V29ybGRRdWF0ZXJuaW9uKF9xdWF0QSk7XG5cbiAgICAvLyBjYWxjdWxhdGUgcm90YXRpb24gdXNpbmcgZmFjZUZyb250XG4gICAgX3F1YXRBLm11bHRpcGx5KHRoaXMudnJtTG9va0F0LmdldEZhY2VGcm9udFF1YXRlcm5pb24oX3F1YXRCKSk7XG5cbiAgICAvLyBzZXQgdHJhbnNmb3JtIHRvIG1lc2hlc1xuICAgIHRoaXMuX21lc2hZYXcucG9zaXRpb24uY29weShfdjNBKTtcbiAgICB0aGlzLl9tZXNoWWF3LnF1YXRlcm5pb24uY29weShfcXVhdEEpO1xuXG4gICAgdGhpcy5fbWVzaFBpdGNoLnBvc2l0aW9uLmNvcHkoX3YzQSk7XG4gICAgdGhpcy5fbWVzaFBpdGNoLnF1YXRlcm5pb24uY29weShfcXVhdEEpO1xuICAgIHRoaXMuX21lc2hQaXRjaC5xdWF0ZXJuaW9uLm11bHRpcGx5KF9xdWF0Qi5zZXRGcm9tQXhpc0FuZ2xlKFZFQzNfUE9TSVRJVkVfWSwgeWF3KSk7XG4gICAgdGhpcy5fbWVzaFBpdGNoLnF1YXRlcm5pb24ubXVsdGlwbHkoUVVBVF9YWV9DVzkwKTtcblxuICAgIC8vIHVwZGF0ZSB0YXJnZXQgbGluZSBhbmQgc3BoZXJlXG4gICAgY29uc3QgeyB0YXJnZXQsIGF1dG9VcGRhdGUgfSA9IHRoaXMudnJtTG9va0F0O1xuICAgIGlmICh0YXJnZXQgIT0gbnVsbCAmJiBhdXRvVXBkYXRlKSB7XG4gICAgICB0YXJnZXQuZ2V0V29ybGRQb3NpdGlvbihfdjNCKS5zdWIoX3YzQSk7XG4gICAgICB0aGlzLl9saW5lVGFyZ2V0Lmdlb21ldHJ5LnRhaWwuY29weShfdjNCKTtcbiAgICAgIHRoaXMuX2xpbmVUYXJnZXQuZ2VvbWV0cnkudXBkYXRlKCk7XG4gICAgICB0aGlzLl9saW5lVGFyZ2V0LnBvc2l0aW9uLmNvcHkoX3YzQSk7XG4gICAgfVxuXG4gICAgLy8gYXBwbHkgdHJhbnNmb3JtIHRvIG1lc2hlc1xuICAgIHN1cGVyLnVwZGF0ZU1hdHJpeFdvcmxkKGZvcmNlKTtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuZXhwb3J0IGNsYXNzIEZhbkJ1ZmZlckdlb21ldHJ5IGV4dGVuZHMgVEhSRUUuQnVmZmVyR2VvbWV0cnkge1xuICBwdWJsaWMgdGhldGE6IG51bWJlcjtcbiAgcHVibGljIHJhZGl1czogbnVtYmVyO1xuICBwcml2YXRlIF9jdXJyZW50VGhldGEgPSAwO1xuICBwcml2YXRlIF9jdXJyZW50UmFkaXVzID0gMDtcbiAgcHJpdmF0ZSByZWFkb25seSBfYXR0clBvczogVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xuICBwcml2YXRlIHJlYWRvbmx5IF9hdHRySW5kZXg6IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZTtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMudGhldGEgPSAwLjA7XG4gICAgdGhpcy5yYWRpdXMgPSAwLjA7XG4gICAgdGhpcy5fY3VycmVudFRoZXRhID0gMC4wO1xuICAgIHRoaXMuX2N1cnJlbnRSYWRpdXMgPSAwLjA7XG5cbiAgICB0aGlzLl9hdHRyUG9zID0gbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShuZXcgRmxvYXQzMkFycmF5KDY1ICogMyksIDMpO1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKCdwb3NpdGlvbicsIHRoaXMuX2F0dHJQb3MpO1xuXG4gICAgdGhpcy5fYXR0ckluZGV4ID0gbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShuZXcgVWludDE2QXJyYXkoMyAqIDYzKSwgMSk7XG4gICAgdGhpcy5zZXRJbmRleCh0aGlzLl9hdHRySW5kZXgpO1xuXG4gICAgdGhpcy5fYnVpbGRJbmRleCgpO1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIGxldCBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IGZhbHNlO1xuXG4gICAgaWYgKHRoaXMuX2N1cnJlbnRUaGV0YSAhPT0gdGhpcy50aGV0YSkge1xuICAgICAgdGhpcy5fY3VycmVudFRoZXRhID0gdGhpcy50aGV0YTtcbiAgICAgIHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fY3VycmVudFJhZGl1cyAhPT0gdGhpcy5yYWRpdXMpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRSYWRpdXMgPSB0aGlzLnJhZGl1cztcbiAgICAgIHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoc2hvdWxkVXBkYXRlR2VvbWV0cnkpIHtcbiAgICAgIHRoaXMuX2J1aWxkUG9zaXRpb24oKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9idWlsZFBvc2l0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKDAsIDAuMCwgMC4wLCAwLjApO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA2NDsgaSsrKSB7XG4gICAgICBjb25zdCB0ID0gKGkgLyA2My4wKSAqIHRoaXMuX2N1cnJlbnRUaGV0YTtcblxuICAgICAgdGhpcy5fYXR0clBvcy5zZXRYWVooaSArIDEsIHRoaXMuX2N1cnJlbnRSYWRpdXMgKiBNYXRoLnNpbih0KSwgMC4wLCB0aGlzLl9jdXJyZW50UmFkaXVzICogTWF0aC5jb3ModCkpO1xuICAgIH1cblxuICAgIHRoaXMuX2F0dHJQb3MubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRJbmRleCgpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDYzOyBpKyspIHtcbiAgICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWVooaSAqIDMsIDAsIGkgKyAxLCBpICsgMik7XG4gICAgfVxuXG4gICAgdGhpcy5fYXR0ckluZGV4Lm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuZXhwb3J0IGNsYXNzIExpbmVBbmRTcGhlcmVCdWZmZXJHZW9tZXRyeSBleHRlbmRzIFRIUkVFLkJ1ZmZlckdlb21ldHJ5IHtcbiAgcHVibGljIHJhZGl1czogbnVtYmVyO1xuICBwdWJsaWMgdGFpbDogVEhSRUUuVmVjdG9yMztcbiAgcHJpdmF0ZSBfY3VycmVudFJhZGl1czogbnVtYmVyO1xuICBwcml2YXRlIF9jdXJyZW50VGFpbDogVEhSRUUuVmVjdG9yMztcbiAgcHJpdmF0ZSByZWFkb25seSBfYXR0clBvczogVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xuICBwcml2YXRlIHJlYWRvbmx5IF9hdHRySW5kZXg6IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZTtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMucmFkaXVzID0gMC4wO1xuICAgIHRoaXMuX2N1cnJlbnRSYWRpdXMgPSAwLjA7XG5cbiAgICB0aGlzLnRhaWwgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuICAgIHRoaXMuX2N1cnJlbnRUYWlsID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuICAgIHRoaXMuX2F0dHJQb3MgPSBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKG5ldyBGbG9hdDMyQXJyYXkoMjk0KSwgMyk7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJywgdGhpcy5fYXR0clBvcyk7XG5cbiAgICB0aGlzLl9hdHRySW5kZXggPSBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKG5ldyBVaW50MTZBcnJheSgxOTQpLCAxKTtcbiAgICB0aGlzLnNldEluZGV4KHRoaXMuX2F0dHJJbmRleCk7XG5cbiAgICB0aGlzLl9idWlsZEluZGV4KCk7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgbGV0IHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gZmFsc2U7XG5cbiAgICBpZiAodGhpcy5fY3VycmVudFJhZGl1cyAhPT0gdGhpcy5yYWRpdXMpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRSYWRpdXMgPSB0aGlzLnJhZGl1cztcbiAgICAgIHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX2N1cnJlbnRUYWlsLmVxdWFscyh0aGlzLnRhaWwpKSB7XG4gICAgICB0aGlzLl9jdXJyZW50VGFpbC5jb3B5KHRoaXMudGFpbCk7XG4gICAgICBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHNob3VsZFVwZGF0ZUdlb21ldHJ5KSB7XG4gICAgICB0aGlzLl9idWlsZFBvc2l0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRQb3NpdGlvbigpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDMyOyBpKyspIHtcbiAgICAgIGNvbnN0IHQgPSAoaSAvIDE2LjApICogTWF0aC5QSTtcblxuICAgICAgdGhpcy5fYXR0clBvcy5zZXRYWVooaSwgTWF0aC5jb3ModCksIE1hdGguc2luKHQpLCAwLjApO1xuICAgICAgdGhpcy5fYXR0clBvcy5zZXRYWVooMzIgKyBpLCAwLjAsIE1hdGguY29zKHQpLCBNYXRoLnNpbih0KSk7XG4gICAgICB0aGlzLl9hdHRyUG9zLnNldFhZWig2NCArIGksIE1hdGguc2luKHQpLCAwLjAsIE1hdGguY29zKHQpKTtcbiAgICB9XG5cbiAgICB0aGlzLnNjYWxlKHRoaXMuX2N1cnJlbnRSYWRpdXMsIHRoaXMuX2N1cnJlbnRSYWRpdXMsIHRoaXMuX2N1cnJlbnRSYWRpdXMpO1xuICAgIHRoaXMudHJhbnNsYXRlKHRoaXMuX2N1cnJlbnRUYWlsLngsIHRoaXMuX2N1cnJlbnRUYWlsLnksIHRoaXMuX2N1cnJlbnRUYWlsLnopO1xuXG4gICAgdGhpcy5fYXR0clBvcy5zZXRYWVooOTYsIDAsIDAsIDApO1xuICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKDk3LCB0aGlzLl9jdXJyZW50VGFpbC54LCB0aGlzLl9jdXJyZW50VGFpbC55LCB0aGlzLl9jdXJyZW50VGFpbC56KTtcblxuICAgIHRoaXMuX2F0dHJQb3MubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRJbmRleCgpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDMyOyBpKyspIHtcbiAgICAgIGNvbnN0IGkxID0gKGkgKyAxKSAlIDMyO1xuXG4gICAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoaSAqIDIsIGksIGkxKTtcbiAgICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWSg2NCArIGkgKiAyLCAzMiArIGksIDMyICsgaTEpO1xuICAgICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKDEyOCArIGkgKiAyLCA2NCArIGksIDY0ICsgaTEpO1xuICAgIH1cbiAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoMTkyLCA5NiwgOTcpO1xuXG4gICAgdGhpcy5fYXR0ckluZGV4Lm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTUh1bWFub2lkIH0gZnJvbSAnLi4vaHVtYW5vaWQnO1xuaW1wb3J0IHsgZ2V0V29ybGRRdWF0ZXJuaW9uTGl0ZSB9IGZyb20gJy4uL3V0aWxzL2dldFdvcmxkUXVhdGVybmlvbkxpdGUnO1xuaW1wb3J0IHsgcXVhdEludmVydENvbXBhdCB9IGZyb20gJy4uL3V0aWxzL3F1YXRJbnZlcnRDb21wYXQnO1xuaW1wb3J0IHsgY2FsY0F6aW11dGhBbHRpdHVkZSB9IGZyb20gJy4vdXRpbHMvY2FsY0F6aW11dGhBbHRpdHVkZSc7XG5pbXBvcnQgdHlwZSB7IFZSTUxvb2tBdEFwcGxpZXIgfSBmcm9tICcuL1ZSTUxvb2tBdEFwcGxpZXInO1xuaW1wb3J0IHsgc2FuaXRpemVBbmdsZSB9IGZyb20gJy4vdXRpbHMvc2FuaXRpemVBbmdsZSc7XG5cbmNvbnN0IFZFQzNfUE9TSVRJVkVfWiA9IG5ldyBUSFJFRS5WZWN0b3IzKDAuMCwgMC4wLCAxLjApO1xuXG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF92M0IgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3YzQyA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfcXVhdEEgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuY29uc3QgX3F1YXRCID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbmNvbnN0IF9xdWF0QyA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5jb25zdCBfcXVhdEQgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuY29uc3QgX2V1bGVyQSA9IG5ldyBUSFJFRS5FdWxlcigpO1xuXG4vKipcbiAqIEEgY2xhc3MgY29udHJvbHMgZXllIGdhemUgbW92ZW1lbnRzIG9mIGEgVlJNLlxuICovXG5leHBvcnQgY2xhc3MgVlJNTG9va0F0IHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBFVUxFUl9PUkRFUiA9ICdZWFonOyAvLyB5YXctcGl0Y2gtcm9sbFxuXG4gIC8qKlxuICAgKiBUaGUgb3JpZ2luIG9mIExvb2tBdC4gUG9zaXRpb24gb2Zmc2V0IGZyb20gdGhlIGhlYWQgYm9uZS5cbiAgICovXG4gIHB1YmxpYyBvZmZzZXRGcm9tSGVhZEJvbmUgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4gIC8qKlxuICAgKiBJdHMgYXNzb2NpYXRlZCB7QGxpbmsgVlJNSHVtYW5vaWR9LlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGh1bWFub2lkOiBWUk1IdW1hbm9pZDtcblxuICAvKipcbiAgICogVGhlIHtAbGluayBWUk1Mb29rQXRBcHBsaWVyfSBvZiB0aGUgTG9va0F0LlxuICAgKi9cbiAgcHVibGljIGFwcGxpZXI6IFZSTUxvb2tBdEFwcGxpZXI7XG5cbiAgLyoqXG4gICAqIElmIHRoaXMgaXMgdHJ1ZSwgdGhlIExvb2tBdCB3aWxsIGJlIHVwZGF0ZWQgYXV0b21hdGljYWxseSBieSBjYWxsaW5nIHtAbGluayB1cGRhdGV9LCB0b3dhcmRpbmcgdGhlIGRpcmVjdGlvbiB0byB0aGUge0BsaW5rIHRhcmdldH0uXG4gICAqIGB0cnVlYCBieSBkZWZhdWx0LlxuICAgKlxuICAgKiBTZWUgYWxzbzoge0BsaW5rIHRhcmdldH1cbiAgICovXG4gIHB1YmxpYyBhdXRvVXBkYXRlID0gdHJ1ZTtcblxuICAvKipcbiAgICogVGhlIHRhcmdldCBvYmplY3Qgb2YgdGhlIExvb2tBdC5cbiAgICogTm90ZSB0aGF0IGl0IGRvZXMgbm90IG1ha2UgYW55IHNlbnNlIGlmIHtAbGluayBhdXRvVXBkYXRlfSBpcyBkaXNhYmxlZC5cbiAgICpcbiAgICogU2VlIGFsc286IHtAbGluayBhdXRvVXBkYXRlfVxuICAgKi9cbiAgcHVibGljIHRhcmdldD86IFRIUkVFLk9iamVjdDNEIHwgbnVsbDtcblxuICAvKipcbiAgICogVGhlIGZyb250IGRpcmVjdGlvbiBvZiB0aGUgZmFjZS5cbiAgICogSW50ZW5kZWQgdG8gYmUgdXNlZCBmb3IgVlJNIDAuMCBjb21wYXQgKFZSTSAwLjAgbW9kZWxzIGFyZSBmYWNpbmcgWi0gaW5zdGVhZCBvZiBaKykuXG4gICAqIFlvdSB1c3VhbGx5IGRvbid0IHdhbnQgdG8gdG91Y2ggdGhpcy5cbiAgICovXG4gIHB1YmxpYyBmYWNlRnJvbnQgPSBuZXcgVEhSRUUuVmVjdG9yMygwLjAsIDAuMCwgMS4wKTtcblxuICAvKipcbiAgICogSXRzIGN1cnJlbnQgYW5nbGUgYXJvdW5kIFkgYXhpcywgaW4gZGVncmVlLlxuICAgKi9cbiAgcHJvdGVjdGVkIF95YXc6IG51bWJlcjtcblxuICAvKipcbiAgICogSXRzIGN1cnJlbnQgYW5nbGUgYXJvdW5kIFkgYXhpcywgaW4gZGVncmVlLlxuICAgKi9cbiAgcHVibGljIGdldCB5YXcoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5feWF3O1xuICB9XG5cbiAgLyoqXG4gICAqIEl0cyBjdXJyZW50IGFuZ2xlIGFyb3VuZCBZIGF4aXMsIGluIGRlZ3JlZS5cbiAgICovXG4gIHB1YmxpYyBzZXQgeWF3KHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl95YXcgPSB2YWx1ZTtcbiAgICB0aGlzLl9uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogSXRzIGN1cnJlbnQgYW5nbGUgYXJvdW5kIFggYXhpcywgaW4gZGVncmVlLlxuICAgKi9cbiAgcHJvdGVjdGVkIF9waXRjaDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBJdHMgY3VycmVudCBhbmdsZSBhcm91bmQgWCBheGlzLCBpbiBkZWdyZWUuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHBpdGNoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3BpdGNoO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0cyBjdXJyZW50IGFuZ2xlIGFyb3VuZCBYIGF4aXMsIGluIGRlZ3JlZS5cbiAgICovXG4gIHB1YmxpYyBzZXQgcGl0Y2godmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX3BpdGNoID0gdmFsdWU7XG4gICAgdGhpcy5fbmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNwZWNpZmllcyB0aGF0IGFuZ2xlcyBuZWVkIHRvIGJlIGFwcGxpZWQgdG8gaXRzIFtAbGluayBhcHBsaWVyXS5cbiAgICovXG4gIHByb3RlY3RlZCBfbmVlZHNVcGRhdGU6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFdvcmxkIHJvdGF0aW9uIG9mIHRoZSBoZWFkIGluIGl0cyByZXN0IHBvc2UuXG4gICAqL1xuICBwcml2YXRlIF9yZXN0SGVhZFdvcmxkUXVhdGVybmlvbjogVEhSRUUuUXVhdGVybmlvbjtcblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVXNlIHtAbGluayBnZXRFdWxlcn0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBnZXQgZXVsZXIoKTogVEhSRUUuRXVsZXIge1xuICAgIGNvbnNvbGUud2FybignVlJNTG9va0F0OiBldWxlciBpcyBkZXByZWNhdGVkLiB1c2UgZ2V0RXVsZXIoKSBpbnN0ZWFkLicpO1xuXG4gICAgcmV0dXJuIHRoaXMuZ2V0RXVsZXIobmV3IFRIUkVFLkV1bGVyKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyB7QGxpbmsgVlJNTG9va0F0fS5cbiAgICpcbiAgICogQHBhcmFtIGh1bWFub2lkIEEge0BsaW5rIFZSTUh1bWFub2lkfVxuICAgKiBAcGFyYW0gYXBwbGllciBBIHtAbGluayBWUk1Mb29rQXRBcHBsaWVyfVxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKGh1bWFub2lkOiBWUk1IdW1hbm9pZCwgYXBwbGllcjogVlJNTG9va0F0QXBwbGllcikge1xuICAgIHRoaXMuaHVtYW5vaWQgPSBodW1hbm9pZDtcbiAgICB0aGlzLmFwcGxpZXIgPSBhcHBsaWVyO1xuXG4gICAgdGhpcy5feWF3ID0gMC4wO1xuICAgIHRoaXMuX3BpdGNoID0gMC4wO1xuICAgIHRoaXMuX25lZWRzVXBkYXRlID0gdHJ1ZTtcblxuICAgIHRoaXMuX3Jlc3RIZWFkV29ybGRRdWF0ZXJuaW9uID0gdGhpcy5nZXRMb29rQXRXb3JsZFF1YXRlcm5pb24obmV3IFRIUkVFLlF1YXRlcm5pb24oKSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGl0cyB5YXctcGl0Y2ggYW5nbGVzIGFzIGFuIGBFdWxlcmAuXG4gICAqIERvZXMgTk9UIGNvbnNpZGVyIHtAbGluayBmYWNlRnJvbnR9OyBpdCByZXR1cm5zIGBFdWxlcigwLCAwLCAwOyBcIllYWlwiKWAgYnkgZGVmYXVsdCByZWdhcmRsZXNzIG9mIHRoZSBmYWNlRnJvbnQgdmFsdWUuXG4gICAqXG4gICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBldWxlclxuICAgKi9cbiAgcHVibGljIGdldEV1bGVyKHRhcmdldDogVEhSRUUuRXVsZXIpOiBUSFJFRS5FdWxlciB7XG4gICAgcmV0dXJuIHRhcmdldC5zZXQoVEhSRUUuTWF0aFV0aWxzLkRFRzJSQUQgKiB0aGlzLl9waXRjaCwgVEhSRUUuTWF0aFV0aWxzLkRFRzJSQUQgKiB0aGlzLl95YXcsIDAuMCwgJ1lYWicpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvcHkgdGhlIGdpdmVuIHtAbGluayBWUk1Mb29rQXR9IGludG8gdGhpcyBvbmUuXG4gICAqIHtAbGluayBodW1hbm9pZH0gbXVzdCBiZSBzYW1lIGFzIHRoZSBzb3VyY2Ugb25lLlxuICAgKiB7QGxpbmsgYXBwbGllcn0gd2lsbCByZWZlcmVuY2UgdGhlIHNhbWUgaW5zdGFuY2UgYXMgdGhlIHNvdXJjZSBvbmUuXG4gICAqIEBwYXJhbSBzb3VyY2UgVGhlIHtAbGluayBWUk1Mb29rQXR9IHlvdSB3YW50IHRvIGNvcHlcbiAgICogQHJldHVybnMgdGhpc1xuICAgKi9cbiAgcHVibGljIGNvcHkoc291cmNlOiBWUk1Mb29rQXQpOiB0aGlzIHtcbiAgICBpZiAodGhpcy5odW1hbm9pZCAhPT0gc291cmNlLmh1bWFub2lkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZSTUxvb2tBdDogaHVtYW5vaWQgbXVzdCBiZSBzYW1lIGluIG9yZGVyIHRvIGNvcHknKTtcbiAgICB9XG5cbiAgICB0aGlzLm9mZnNldEZyb21IZWFkQm9uZS5jb3B5KHNvdXJjZS5vZmZzZXRGcm9tSGVhZEJvbmUpO1xuICAgIHRoaXMuYXBwbGllciA9IHNvdXJjZS5hcHBsaWVyO1xuICAgIHRoaXMuYXV0b1VwZGF0ZSA9IHNvdXJjZS5hdXRvVXBkYXRlO1xuICAgIHRoaXMudGFyZ2V0ID0gc291cmNlLnRhcmdldDtcbiAgICB0aGlzLmZhY2VGcm9udC5jb3B5KHNvdXJjZS5mYWNlRnJvbnQpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGNsb25lIG9mIHRoaXMge0BsaW5rIFZSTUxvb2tBdH0uXG4gICAqIE5vdGUgdGhhdCB7QGxpbmsgaHVtYW5vaWR9IGFuZCB7QGxpbmsgYXBwbGllcn0gd2lsbCByZWZlcmVuY2UgdGhlIHNhbWUgaW5zdGFuY2UgYXMgdGhpcyBvbmUuXG4gICAqIEByZXR1cm5zIENvcGllZCB7QGxpbmsgVlJNTG9va0F0fVxuICAgKi9cbiAgcHVibGljIGNsb25lKCk6IFZSTUxvb2tBdCB7XG4gICAgcmV0dXJuIG5ldyBWUk1Mb29rQXQodGhpcy5odW1hbm9pZCwgdGhpcy5hcHBsaWVyKS5jb3B5KHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoZSBsb29rQXQgZGlyZWN0aW9uICh5YXcgYW5kIHBpdGNoKSB0byB0aGUgaW5pdGlhbCBkaXJlY3Rpb24uXG4gICAqL1xuICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy5feWF3ID0gMC4wO1xuICAgIHRoaXMuX3BpdGNoID0gMC4wO1xuICAgIHRoaXMuX25lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgaXRzIGxvb2tBdCBwb3NpdGlvbiBpbiB3b3JsZCBjb29yZGluYXRlLlxuICAgKlxuICAgKiBAcGFyYW0gdGFyZ2V0IEEgdGFyZ2V0IGBUSFJFRS5WZWN0b3IzYFxuICAgKi9cbiAgcHVibGljIGdldExvb2tBdFdvcmxkUG9zaXRpb24odGFyZ2V0OiBUSFJFRS5WZWN0b3IzKTogVEhSRUUuVmVjdG9yMyB7XG4gICAgY29uc3QgaGVhZCA9IHRoaXMuaHVtYW5vaWQuZ2V0UmF3Qm9uZU5vZGUoJ2hlYWQnKSE7XG5cbiAgICByZXR1cm4gdGFyZ2V0LmNvcHkodGhpcy5vZmZzZXRGcm9tSGVhZEJvbmUpLmFwcGx5TWF0cml4NChoZWFkLm1hdHJpeFdvcmxkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgaXRzIGxvb2tBdCByb3RhdGlvbiBpbiB3b3JsZCBjb29yZGluYXRlLlxuICAgKiBEb2VzIE5PVCBjb25zaWRlciB7QGxpbmsgZmFjZUZyb250fS5cbiAgICpcbiAgICogQHBhcmFtIHRhcmdldCBBIHRhcmdldCBgVEhSRUUuUXVhdGVybmlvbmBcbiAgICovXG4gIHB1YmxpYyBnZXRMb29rQXRXb3JsZFF1YXRlcm5pb24odGFyZ2V0OiBUSFJFRS5RdWF0ZXJuaW9uKTogVEhSRUUuUXVhdGVybmlvbiB7XG4gICAgY29uc3QgaGVhZCA9IHRoaXMuaHVtYW5vaWQuZ2V0UmF3Qm9uZU5vZGUoJ2hlYWQnKSE7XG5cbiAgICByZXR1cm4gZ2V0V29ybGRRdWF0ZXJuaW9uTGl0ZShoZWFkLCB0YXJnZXQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIHF1YXRlcm5pb24gdGhhdCByb3RhdGVzIHRoZSArWiB1bml0IHZlY3RvciBvZiB0aGUgaHVtYW5vaWQgSGVhZCB0byB0aGUge0BsaW5rIGZhY2VGcm9udH0gZGlyZWN0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0gdGFyZ2V0IEEgdGFyZ2V0IGBUSFJFRS5RdWF0ZXJuaW9uYFxuICAgKi9cbiAgcHVibGljIGdldEZhY2VGcm9udFF1YXRlcm5pb24odGFyZ2V0OiBUSFJFRS5RdWF0ZXJuaW9uKTogVEhSRUUuUXVhdGVybmlvbiB7XG4gICAgaWYgKHRoaXMuZmFjZUZyb250LmRpc3RhbmNlVG9TcXVhcmVkKFZFQzNfUE9TSVRJVkVfWikgPCAwLjAxKSB7XG4gICAgICByZXR1cm4gdGFyZ2V0LmNvcHkodGhpcy5fcmVzdEhlYWRXb3JsZFF1YXRlcm5pb24pLmludmVydCgpO1xuICAgIH1cblxuICAgIGNvbnN0IFtmYWNlRnJvbnRBemltdXRoLCBmYWNlRnJvbnRBbHRpdHVkZV0gPSBjYWxjQXppbXV0aEFsdGl0dWRlKHRoaXMuZmFjZUZyb250KTtcbiAgICBfZXVsZXJBLnNldCgwLjAsIDAuNSAqIE1hdGguUEkgKyBmYWNlRnJvbnRBemltdXRoLCBmYWNlRnJvbnRBbHRpdHVkZSwgJ1laWCcpO1xuXG4gICAgcmV0dXJuIHRhcmdldC5zZXRGcm9tRXVsZXIoX2V1bGVyQSkucHJlbXVsdGlwbHkoX3F1YXRELmNvcHkodGhpcy5fcmVzdEhlYWRXb3JsZFF1YXRlcm5pb24pLmludmVydCgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgaXRzIExvb2tBdCBkaXJlY3Rpb24gaW4gd29ybGQgY29vcmRpbmF0ZS5cbiAgICpcbiAgICogQHBhcmFtIHRhcmdldCBBIHRhcmdldCBgVEhSRUUuVmVjdG9yM2BcbiAgICovXG4gIHB1YmxpYyBnZXRMb29rQXRXb3JsZERpcmVjdGlvbih0YXJnZXQ6IFRIUkVFLlZlY3RvcjMpOiBUSFJFRS5WZWN0b3IzIHtcbiAgICB0aGlzLmdldExvb2tBdFdvcmxkUXVhdGVybmlvbihfcXVhdEIpO1xuICAgIHRoaXMuZ2V0RmFjZUZyb250UXVhdGVybmlvbihfcXVhdEMpO1xuXG4gICAgcmV0dXJuIHRhcmdldFxuICAgICAgLmNvcHkoVkVDM19QT1NJVElWRV9aKVxuICAgICAgLmFwcGx5UXVhdGVybmlvbihfcXVhdEIpXG4gICAgICAuYXBwbHlRdWF0ZXJuaW9uKF9xdWF0QylcbiAgICAgIC5hcHBseUV1bGVyKHRoaXMuZ2V0RXVsZXIoX2V1bGVyQSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBpdHMgbG9va0F0IHRhcmdldCBwb3NpdGlvbi5cbiAgICpcbiAgICogTm90ZSB0aGF0IGl0cyByZXN1bHQgd2lsbCBiZSBpbnN0YW50bHkgb3ZlcndyaXR0ZW4gaWYge0BsaW5rIFZSTUxvb2tBdEhlYWQuYXV0b1VwZGF0ZX0gaXMgZW5hYmxlZC5cbiAgICpcbiAgICogSWYgeW91IHdhbnQgdG8gdHJhY2sgYW4gb2JqZWN0IGNvbnRpbnVvdXNseSwgeW91IG1pZ2h0IHdhbnQgdG8gdXNlIHtAbGluayB0YXJnZXR9IGluc3RlYWQuXG4gICAqXG4gICAqIEBwYXJhbSBwb3NpdGlvbiBBIHRhcmdldCBwb3NpdGlvbiwgaW4gd29ybGQgc3BhY2VcbiAgICovXG4gIHB1YmxpYyBsb29rQXQocG9zaXRpb246IFRIUkVFLlZlY3RvcjMpOiB2b2lkIHtcbiAgICAvLyBMb29rIGF0IGRpcmVjdGlvbiBpbiBsb2NhbCBjb29yZGluYXRlXG4gICAgY29uc3QgaGVhZFJvdERpZmZJbnYgPSBfcXVhdEFcbiAgICAgIC5jb3B5KHRoaXMuX3Jlc3RIZWFkV29ybGRRdWF0ZXJuaW9uKVxuICAgICAgLm11bHRpcGx5KHF1YXRJbnZlcnRDb21wYXQodGhpcy5nZXRMb29rQXRXb3JsZFF1YXRlcm5pb24oX3F1YXRCKSkpO1xuICAgIGNvbnN0IGhlYWRQb3MgPSB0aGlzLmdldExvb2tBdFdvcmxkUG9zaXRpb24oX3YzQik7XG4gICAgY29uc3QgbG9va0F0RGlyID0gX3YzQy5jb3B5KHBvc2l0aW9uKS5zdWIoaGVhZFBvcykuYXBwbHlRdWF0ZXJuaW9uKGhlYWRSb3REaWZmSW52KS5ub3JtYWxpemUoKTtcblxuICAgIC8vIGNhbGN1bGF0ZSBhbmdsZXNcbiAgICBjb25zdCBbYXppbXV0aEZyb20sIGFsdGl0dWRlRnJvbV0gPSBjYWxjQXppbXV0aEFsdGl0dWRlKHRoaXMuZmFjZUZyb250KTtcbiAgICBjb25zdCBbYXppbXV0aFRvLCBhbHRpdHVkZVRvXSA9IGNhbGNBemltdXRoQWx0aXR1ZGUobG9va0F0RGlyKTtcbiAgICBjb25zdCB5YXcgPSBzYW5pdGl6ZUFuZ2xlKGF6aW11dGhUbyAtIGF6aW11dGhGcm9tKTtcbiAgICBjb25zdCBwaXRjaCA9IHNhbml0aXplQW5nbGUoYWx0aXR1ZGVGcm9tIC0gYWx0aXR1ZGVUbyk7IC8vIHNwaW5uaW5nICgxLCAwLCAwKSBDQ1cgYXJvdW5kIFogYXhpcyBtYWtlcyB0aGUgdmVjdG9yIGxvb2sgdXAsIHdoaWxlIHNwaW5uaW5nICgwLCAwLCAxKSBDQ1cgYXJvdW5kIFggYXhpcyBtYWtlcyB0aGUgdmVjdG9yIGxvb2sgZG93blxuXG4gICAgLy8gYXBwbHkgYW5nbGVzXG4gICAgdGhpcy5feWF3ID0gVEhSRUUuTWF0aFV0aWxzLlJBRDJERUcgKiB5YXc7XG4gICAgdGhpcy5fcGl0Y2ggPSBUSFJFRS5NYXRoVXRpbHMuUkFEMkRFRyAqIHBpdGNoO1xuXG4gICAgdGhpcy5fbmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgVlJNTG9va0F0SGVhZC5cbiAgICogSWYge0BsaW5rIGF1dG9VcGRhdGV9IGlzIGVuYWJsZWQsIHRoaXMgd2lsbCBtYWtlIGl0IGxvb2sgYXQgdGhlIHtAbGluayB0YXJnZXR9LlxuICAgKlxuICAgKiBAcGFyYW0gZGVsdGEgZGVsdGFUaW1lLCBpdCBpc24ndCB1c2VkIHRob3VnaC4gWW91IGNhbiB1c2UgdGhlIHBhcmFtZXRlciBpZiB5b3Ugd2FudCB0byB1c2UgdGhpcyBpbiB5b3VyIG93biBleHRlbmRlZCB7QGxpbmsgVlJNTG9va0F0fS5cbiAgICovXG4gIHB1YmxpYyB1cGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQge1xuICAgIGlmICh0aGlzLnRhcmdldCAhPSBudWxsICYmIHRoaXMuYXV0b1VwZGF0ZSkge1xuICAgICAgdGhpcy5sb29rQXQodGhpcy50YXJnZXQuZ2V0V29ybGRQb3NpdGlvbihfdjNBKSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX25lZWRzVXBkYXRlKSB7XG4gICAgICB0aGlzLl9uZWVkc1VwZGF0ZSA9IGZhbHNlO1xuXG4gICAgICB0aGlzLmFwcGxpZXIuYXBwbHlZYXdQaXRjaCh0aGlzLl95YXcsIHRoaXMuX3BpdGNoKTtcbiAgICB9XG4gIH1cbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbmNvbnN0IF9wb3NpdGlvbiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfc2NhbGUgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4vKipcbiAqIEEgcmVwbGFjZW1lbnQgb2YgYE9iamVjdDNELmdldFdvcmxkUXVhdGVybmlvbmAuXG4gKiBFeHRyYWN0IHRoZSB3b3JsZCBxdWF0ZXJuaW9uIG9mIGFuIG9iamVjdCBmcm9tIGl0cyB3b3JsZCBzcGFjZSBtYXRyaXgsIHdpdGhvdXQgY2FsbGluZyBgT2JqZWN0M0QudXBkYXRlV29ybGRNYXRyaXhgLlxuICogVXNlIHRoaXMgd2hlbiB5b3UncmUgc3VyZSB0aGF0IHRoZSB3b3JsZCBtYXRyaXggaXMgdXAtdG8tZGF0ZS5cbiAqXG4gKiBAcGFyYW0gb2JqZWN0IFRoZSBvYmplY3RcbiAqIEBwYXJhbSBvdXQgQSB0YXJnZXQgcXVhdGVybmlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0V29ybGRRdWF0ZXJuaW9uTGl0ZShvYmplY3Q6IFRIUkVFLk9iamVjdDNELCBvdXQ6IFRIUkVFLlF1YXRlcm5pb24pOiBUSFJFRS5RdWF0ZXJuaW9uIHtcbiAgb2JqZWN0Lm1hdHJpeFdvcmxkLmRlY29tcG9zZShfcG9zaXRpb24sIG91dCwgX3NjYWxlKTtcbiAgcmV0dXJuIG91dDtcbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbi8qKlxuICogQ2FsY3VsYXRlIGF6aW11dGggLyBhbHRpdHVkZSBhbmdsZXMgZnJvbSBhIHZlY3Rvci5cbiAqXG4gKiBUaGlzIHJldHVybnMgYSBkaWZmZXJlbmNlIG9mIGFuZ2xlcyBmcm9tICgxLCAwLCAwKS5cbiAqIEF6aW11dGggcmVwcmVzZW50cyBhbiBhbmdsZSBhcm91bmQgWSBheGlzLlxuICogQWx0aXR1ZGUgcmVwcmVzZW50cyBhbiBhbmdsZSBhcm91bmQgWiBheGlzLlxuICogSXQgaXMgcm90YXRlZCBpbiBpbnRyaW5zaWMgWS1aIG9yZGVyLlxuICpcbiAqIEBwYXJhbSB2ZWN0b3IgVGhlIHZlY3RvclxuICogQHJldHVybnMgQSB0dXBsZSBjb250YWlucyB0d28gYW5nbGVzLCBgWyBhemltdXRoLCBhbHRpdHVkZSBdYFxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FsY0F6aW11dGhBbHRpdHVkZSh2ZWN0b3I6IFRIUkVFLlZlY3RvcjMpOiBbYXppbXV0aDogbnVtYmVyLCBhbHRpdHVkZTogbnVtYmVyXSB7XG4gIHJldHVybiBbTWF0aC5hdGFuMigtdmVjdG9yLnosIHZlY3Rvci54KSwgTWF0aC5hdGFuMih2ZWN0b3IueSwgTWF0aC5zcXJ0KHZlY3Rvci54ICogdmVjdG9yLnggKyB2ZWN0b3IueiAqIHZlY3Rvci56KSldO1xufVxuIiwgIi8qKlxuICogTWFrZSBzdXJlIHRoZSBhbmdsZSBpcyB3aXRoaW4gLVBJIHRvIFBJLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBqc1xuICogc2FuaXRpemVBbmdsZSgxLjUgKiBNYXRoLlBJKSAvLyAtMC41ICogUElcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSBhbmdsZSBBbiBpbnB1dCBhbmdsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2FuaXRpemVBbmdsZShhbmdsZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgY29uc3Qgcm91bmRUdXJuID0gTWF0aC5yb3VuZChhbmdsZSAvIDIuMCAvIE1hdGguUEkpO1xuICByZXR1cm4gYW5nbGUgLSAyLjAgKiBNYXRoLlBJICogcm91bmRUdXJuO1xufVxuIiwgImltcG9ydCB7IFZSTUh1bWFub2lkIH0gZnJvbSAnLi4vaHVtYW5vaWQnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHR5cGUgeyBWUk1Mb29rQXRBcHBsaWVyIH0gZnJvbSAnLi9WUk1Mb29rQXRBcHBsaWVyJztcbmltcG9ydCB7IFZSTUxvb2tBdFJhbmdlTWFwIH0gZnJvbSAnLi9WUk1Mb29rQXRSYW5nZU1hcCc7XG5pbXBvcnQgeyBjYWxjQXppbXV0aEFsdGl0dWRlIH0gZnJvbSAnLi91dGlscy9jYWxjQXppbXV0aEFsdGl0dWRlJztcbmltcG9ydCB7IGdldFdvcmxkUXVhdGVybmlvbkxpdGUgfSBmcm9tICcuLi91dGlscy9nZXRXb3JsZFF1YXRlcm5pb25MaXRlJztcblxuY29uc3QgVkVDM19QT1NJVElWRV9aID0gbmV3IFRIUkVFLlZlY3RvcjMoMC4wLCAwLjAsIDEuMCk7XG5cbmNvbnN0IF9xdWF0QSA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5jb25zdCBfcXVhdEIgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuY29uc3QgX2V1bGVyQSA9IG5ldyBUSFJFRS5FdWxlcigwLjAsIDAuMCwgMC4wLCAnWVhaJyk7XG5cbi8qKlxuICogQSBjbGFzcyB0aGF0IGFwcGxpZXMgZXllIGdhemUgZGlyZWN0aW9ucyB0byBhIFZSTS5cbiAqIEl0IHdpbGwgYmUgdXNlZCBieSB7QGxpbmsgVlJNTG9va0F0fS5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUxvb2tBdEJvbmVBcHBsaWVyIGltcGxlbWVudHMgVlJNTG9va0F0QXBwbGllciB7XG4gIC8qKlxuICAgKiBSZXByZXNlbnQgaXRzIHR5cGUgb2YgYXBwbGllci5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgdHlwZSA9ICdib25lJztcblxuICAvKipcbiAgICogSXRzIGFzc29jaWF0ZWQge0BsaW5rIFZSTUh1bWFub2lkfS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBodW1hbm9pZDogVlJNSHVtYW5vaWQ7XG5cbiAgLyoqXG4gICAqIEEge0BsaW5rIFZSTUxvb2tBdFJhbmdlTWFwfSBmb3IgaG9yaXpvbnRhbCBpbndhcmQgbW92ZW1lbnQuIFRoZSBsZWZ0IGV5ZSBtb3ZlcyByaWdodC4gVGhlIHJpZ2h0IGV5ZSBtb3ZlcyBsZWZ0LlxuICAgKi9cbiAgcHVibGljIHJhbmdlTWFwSG9yaXpvbnRhbElubmVyOiBWUk1Mb29rQXRSYW5nZU1hcDtcblxuICAvKipcbiAgICogQSB7QGxpbmsgVlJNTG9va0F0UmFuZ2VNYXB9IGZvciBob3Jpem9udGFsIG91dHdhcmQgbW92ZW1lbnQuIFRoZSBsZWZ0IGV5ZSBtb3ZlcyBsZWZ0LiBUaGUgcmlnaHQgZXllIG1vdmVzIHJpZ2h0LlxuICAgKi9cbiAgcHVibGljIHJhbmdlTWFwSG9yaXpvbnRhbE91dGVyOiBWUk1Mb29rQXRSYW5nZU1hcDtcblxuICAvKipcbiAgICogQSB7QGxpbmsgVlJNTG9va0F0UmFuZ2VNYXB9IGZvciB2ZXJ0aWNhbCBkb3dud2FyZCBtb3ZlbWVudC4gQm90aCBleWVzIG1vdmUgdXB3YXJkcy5cbiAgICovXG4gIHB1YmxpYyByYW5nZU1hcFZlcnRpY2FsRG93bjogVlJNTG9va0F0UmFuZ2VNYXA7XG5cbiAgLyoqXG4gICAqIEEge0BsaW5rIFZSTUxvb2tBdFJhbmdlTWFwfSBmb3IgdmVydGljYWwgdXB3YXJkIG1vdmVtZW50LiBCb3RoIGV5ZXMgbW92ZSBkb3dud2FyZHMuXG4gICAqL1xuICBwdWJsaWMgcmFuZ2VNYXBWZXJ0aWNhbFVwOiBWUk1Mb29rQXRSYW5nZU1hcDtcblxuICAvKipcbiAgICogVGhlIGZyb250IGRpcmVjdGlvbiBvZiB0aGUgZmFjZS5cbiAgICogSW50ZW5kZWQgdG8gYmUgdXNlZCBmb3IgVlJNIDAuMCBjb21wYXQgKFZSTSAwLjAgbW9kZWxzIGFyZSBmYWNpbmcgWi0gaW5zdGVhZCBvZiBaKykuXG4gICAqIFlvdSB1c3VhbGx5IGRvbid0IHdhbnQgdG8gdG91Y2ggdGhpcy5cbiAgICovXG4gIHB1YmxpYyBmYWNlRnJvbnQ6IFRIUkVFLlZlY3RvcjM7XG5cbiAgLyoqXG4gICAqIFRoZSByZXN0IHF1YXRlcm5pb24gb2YgTGVmdEV5ZSBib25lLlxuICAgKi9cbiAgcHJpdmF0ZSBfcmVzdFF1YXRMZWZ0RXllOiBUSFJFRS5RdWF0ZXJuaW9uO1xuXG4gIC8qKlxuICAgKiBUaGUgcmVzdCBxdWF0ZXJuaW9uIG9mIFJpZ2h0RXllIGJvbmUuXG4gICAqL1xuICBwcml2YXRlIF9yZXN0UXVhdFJpZ2h0RXllOiBUSFJFRS5RdWF0ZXJuaW9uO1xuXG4gIC8qKlxuICAgKiBUaGUgd29ybGQtc3BhY2UgcmVzdCBxdWF0ZXJuaW9uIG9mIHRoZSBwYXJlbnQgb2YgdGhlIGh1bWFub2lkIExlZnRFeWUuXG4gICAqL1xuICBwcml2YXRlIF9yZXN0TGVmdEV5ZVBhcmVudFdvcmxkUXVhdDogVEhSRUUuUXVhdGVybmlvbjtcblxuICAvKipcbiAgICogVGhlIHdvcmxkLXNwYWNlIHJlc3QgcXVhdGVybmlvbiBvZiB0aGUgcGFyZW50IG9mIHRoZSBodW1hbm9pZCBSaWdodEV5ZS5cbiAgICovXG4gIHByaXZhdGUgX3Jlc3RSaWdodEV5ZVBhcmVudFdvcmxkUXVhdDogVEhSRUUuUXVhdGVybmlvbjtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IHtAbGluayBWUk1Mb29rQXRCb25lQXBwbGllcn0uXG4gICAqXG4gICAqIEBwYXJhbSBodW1hbm9pZCBBIHtAbGluayBWUk1IdW1hbm9pZH1cbiAgICogQHBhcmFtIHJhbmdlTWFwSG9yaXpvbnRhbElubmVyIEEge0BsaW5rIFZSTUxvb2tBdFJhbmdlTWFwfSB1c2VkIGZvciBpbm5lciB0cmFuc3ZlcnNlIGRpcmVjdGlvblxuICAgKiBAcGFyYW0gcmFuZ2VNYXBIb3Jpem9udGFsT3V0ZXIgQSB7QGxpbmsgVlJNTG9va0F0UmFuZ2VNYXB9IHVzZWQgZm9yIG91dGVyIHRyYW5zdmVyc2UgZGlyZWN0aW9uXG4gICAqIEBwYXJhbSByYW5nZU1hcFZlcnRpY2FsRG93biBBIHtAbGluayBWUk1Mb29rQXRSYW5nZU1hcH0gdXNlZCBmb3IgZG93biBkaXJlY3Rpb25cbiAgICogQHBhcmFtIHJhbmdlTWFwVmVydGljYWxVcCBBIHtAbGluayBWUk1Mb29rQXRSYW5nZU1hcH0gdXNlZCBmb3IgdXAgZGlyZWN0aW9uXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgaHVtYW5vaWQ6IFZSTUh1bWFub2lkLFxuICAgIHJhbmdlTWFwSG9yaXpvbnRhbElubmVyOiBWUk1Mb29rQXRSYW5nZU1hcCxcbiAgICByYW5nZU1hcEhvcml6b250YWxPdXRlcjogVlJNTG9va0F0UmFuZ2VNYXAsXG4gICAgcmFuZ2VNYXBWZXJ0aWNhbERvd246IFZSTUxvb2tBdFJhbmdlTWFwLFxuICAgIHJhbmdlTWFwVmVydGljYWxVcDogVlJNTG9va0F0UmFuZ2VNYXAsXG4gICkge1xuICAgIHRoaXMuaHVtYW5vaWQgPSBodW1hbm9pZDtcblxuICAgIHRoaXMucmFuZ2VNYXBIb3Jpem9udGFsSW5uZXIgPSByYW5nZU1hcEhvcml6b250YWxJbm5lcjtcbiAgICB0aGlzLnJhbmdlTWFwSG9yaXpvbnRhbE91dGVyID0gcmFuZ2VNYXBIb3Jpem9udGFsT3V0ZXI7XG4gICAgdGhpcy5yYW5nZU1hcFZlcnRpY2FsRG93biA9IHJhbmdlTWFwVmVydGljYWxEb3duO1xuICAgIHRoaXMucmFuZ2VNYXBWZXJ0aWNhbFVwID0gcmFuZ2VNYXBWZXJ0aWNhbFVwO1xuXG4gICAgdGhpcy5mYWNlRnJvbnQgPSBuZXcgVEhSRUUuVmVjdG9yMygwLjAsIDAuMCwgMS4wKTtcblxuICAgIC8vIHNldCByZXN0IHF1YXRlcm5pb25zXG4gICAgdGhpcy5fcmVzdFF1YXRMZWZ0RXllID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbiAgICB0aGlzLl9yZXN0UXVhdFJpZ2h0RXllID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbiAgICB0aGlzLl9yZXN0TGVmdEV5ZVBhcmVudFdvcmxkUXVhdCA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG4gICAgdGhpcy5fcmVzdFJpZ2h0RXllUGFyZW50V29ybGRRdWF0ID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblxuICAgIGNvbnN0IGxlZnRFeWUgPSB0aGlzLmh1bWFub2lkLmdldFJhd0JvbmVOb2RlKCdsZWZ0RXllJyk7XG4gICAgY29uc3QgcmlnaHRFeWUgPSB0aGlzLmh1bWFub2lkLmdldFJhd0JvbmVOb2RlKCdyaWdodEV5ZScpO1xuXG4gICAgaWYgKGxlZnRFeWUpIHtcbiAgICAgIHRoaXMuX3Jlc3RRdWF0TGVmdEV5ZS5jb3B5KGxlZnRFeWUucXVhdGVybmlvbik7XG4gICAgICBnZXRXb3JsZFF1YXRlcm5pb25MaXRlKGxlZnRFeWUucGFyZW50ISwgdGhpcy5fcmVzdExlZnRFeWVQYXJlbnRXb3JsZFF1YXQpO1xuICAgIH1cblxuICAgIGlmIChyaWdodEV5ZSkge1xuICAgICAgdGhpcy5fcmVzdFF1YXRSaWdodEV5ZS5jb3B5KHJpZ2h0RXllLnF1YXRlcm5pb24pO1xuICAgICAgZ2V0V29ybGRRdWF0ZXJuaW9uTGl0ZShyaWdodEV5ZS5wYXJlbnQhLCB0aGlzLl9yZXN0UmlnaHRFeWVQYXJlbnRXb3JsZFF1YXQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGUgaW5wdXQgYW5nbGUgdG8gaXRzIGFzc29jaWF0ZWQgVlJNIG1vZGVsLlxuICAgKlxuICAgKiBAcGFyYW0geWF3IFJvdGF0aW9uIGFyb3VuZCBZIGF4aXMsIGluIGRlZ3JlZVxuICAgKiBAcGFyYW0gcGl0Y2ggUm90YXRpb24gYXJvdW5kIFggYXhpcywgaW4gZGVncmVlXG4gICAqL1xuICBwdWJsaWMgYXBwbHlZYXdQaXRjaCh5YXc6IG51bWJlciwgcGl0Y2g6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IGxlZnRFeWUgPSB0aGlzLmh1bWFub2lkLmdldFJhd0JvbmVOb2RlKCdsZWZ0RXllJyk7XG4gICAgY29uc3QgcmlnaHRFeWUgPSB0aGlzLmh1bWFub2lkLmdldFJhd0JvbmVOb2RlKCdyaWdodEV5ZScpO1xuICAgIGNvbnN0IGxlZnRFeWVOb3JtYWxpemVkID0gdGhpcy5odW1hbm9pZC5nZXROb3JtYWxpemVkQm9uZU5vZGUoJ2xlZnRFeWUnKTtcbiAgICBjb25zdCByaWdodEV5ZU5vcm1hbGl6ZWQgPSB0aGlzLmh1bWFub2lkLmdldE5vcm1hbGl6ZWRCb25lTm9kZSgncmlnaHRFeWUnKTtcbiAgICAvLyBsZWZ0XG4gICAgaWYgKGxlZnRFeWUpIHtcbiAgICAgIGlmIChwaXRjaCA8IDAuMCkge1xuICAgICAgICBfZXVsZXJBLnggPSAtVEhSRUUuTWF0aFV0aWxzLkRFRzJSQUQgKiB0aGlzLnJhbmdlTWFwVmVydGljYWxEb3duLm1hcCgtcGl0Y2gpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX2V1bGVyQS54ID0gVEhSRUUuTWF0aFV0aWxzLkRFRzJSQUQgKiB0aGlzLnJhbmdlTWFwVmVydGljYWxVcC5tYXAocGl0Y2gpO1xuICAgICAgfVxuXG4gICAgICBpZiAoeWF3IDwgMC4wKSB7XG4gICAgICAgIF9ldWxlckEueSA9IC1USFJFRS5NYXRoVXRpbHMuREVHMlJBRCAqIHRoaXMucmFuZ2VNYXBIb3Jpem9udGFsSW5uZXIubWFwKC15YXcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX2V1bGVyQS55ID0gVEhSRUUuTWF0aFV0aWxzLkRFRzJSQUQgKiB0aGlzLnJhbmdlTWFwSG9yaXpvbnRhbE91dGVyLm1hcCh5YXcpO1xuICAgICAgfVxuXG4gICAgICBfcXVhdEEuc2V0RnJvbUV1bGVyKF9ldWxlckEpO1xuICAgICAgdGhpcy5fZ2V0V29ybGRGYWNlRnJvbnRRdWF0KF9xdWF0Qik7XG5cbiAgICAgIC8vIF9xdWF0QiAqIF9xdWF0QSAqIF9xdWF0Ql4tMVxuICAgICAgLy8gd2hlcmUgX3F1YXRBIGlzIExvb2tBdCByb3RhdGlvblxuICAgICAgLy8gYW5kIF9xdWF0QiBpcyB3b3JsZEZhY2VGcm9udFF1YXRcbiAgICAgIGxlZnRFeWVOb3JtYWxpemVkIS5xdWF0ZXJuaW9uLmNvcHkoX3F1YXRCKS5tdWx0aXBseShfcXVhdEEpLm11bHRpcGx5KF9xdWF0Qi5pbnZlcnQoKSk7XG5cbiAgICAgIF9xdWF0QS5jb3B5KHRoaXMuX3Jlc3RMZWZ0RXllUGFyZW50V29ybGRRdWF0KTtcblxuICAgICAgLy8gX3F1YXRBXi0xICogbGVmdEV5ZU5vcm1hbGl6ZWQucXVhdGVybmlvbiAqIF9xdWF0QSAqIHJlc3RRdWF0TGVmdEV5ZVxuICAgICAgLy8gd2hlcmUgX3F1YXRBIGlzIHJlc3RMZWZ0RXllUGFyZW50V29ybGRRdWF0XG4gICAgICBsZWZ0RXllLnF1YXRlcm5pb25cbiAgICAgICAgLmNvcHkobGVmdEV5ZU5vcm1hbGl6ZWQhLnF1YXRlcm5pb24pXG4gICAgICAgIC5tdWx0aXBseShfcXVhdEEpXG4gICAgICAgIC5wcmVtdWx0aXBseShfcXVhdEEuaW52ZXJ0KCkpXG4gICAgICAgIC5tdWx0aXBseSh0aGlzLl9yZXN0UXVhdExlZnRFeWUpO1xuICAgIH1cblxuICAgIC8vIHJpZ2h0XG4gICAgaWYgKHJpZ2h0RXllKSB7XG4gICAgICBpZiAocGl0Y2ggPCAwLjApIHtcbiAgICAgICAgX2V1bGVyQS54ID0gLVRIUkVFLk1hdGhVdGlscy5ERUcyUkFEICogdGhpcy5yYW5nZU1hcFZlcnRpY2FsRG93bi5tYXAoLXBpdGNoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF9ldWxlckEueCA9IFRIUkVFLk1hdGhVdGlscy5ERUcyUkFEICogdGhpcy5yYW5nZU1hcFZlcnRpY2FsVXAubWFwKHBpdGNoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHlhdyA8IDAuMCkge1xuICAgICAgICBfZXVsZXJBLnkgPSAtVEhSRUUuTWF0aFV0aWxzLkRFRzJSQUQgKiB0aGlzLnJhbmdlTWFwSG9yaXpvbnRhbE91dGVyLm1hcCgteWF3KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF9ldWxlckEueSA9IFRIUkVFLk1hdGhVdGlscy5ERUcyUkFEICogdGhpcy5yYW5nZU1hcEhvcml6b250YWxJbm5lci5tYXAoeWF3KTtcbiAgICAgIH1cblxuICAgICAgX3F1YXRBLnNldEZyb21FdWxlcihfZXVsZXJBKTtcbiAgICAgIHRoaXMuX2dldFdvcmxkRmFjZUZyb250UXVhdChfcXVhdEIpO1xuXG4gICAgICAvLyBfcXVhdEIgKiBfcXVhdEEgKiBfcXVhdEJeLTFcbiAgICAgIC8vIHdoZXJlIF9xdWF0QSBpcyBMb29rQXQgcm90YXRpb25cbiAgICAgIC8vIGFuZCBfcXVhdEIgaXMgd29ybGRGYWNlRnJvbnRRdWF0XG4gICAgICByaWdodEV5ZU5vcm1hbGl6ZWQhLnF1YXRlcm5pb24uY29weShfcXVhdEIpLm11bHRpcGx5KF9xdWF0QSkubXVsdGlwbHkoX3F1YXRCLmludmVydCgpKTtcblxuICAgICAgX3F1YXRBLmNvcHkodGhpcy5fcmVzdFJpZ2h0RXllUGFyZW50V29ybGRRdWF0KTtcblxuICAgICAgLy8gX3F1YXRBXi0xICogcmlnaHRFeWVOb3JtYWxpemVkLnF1YXRlcm5pb24gKiBfcXVhdEEgKiByZXN0UXVhdFJpZ2h0RXllXG4gICAgICAvLyB3aGVyZSBfcXVhdEEgaXMgcmVzdFJpZ2h0RXllUGFyZW50V29ybGRRdWF0XG4gICAgICByaWdodEV5ZS5xdWF0ZXJuaW9uXG4gICAgICAgIC5jb3B5KHJpZ2h0RXllTm9ybWFsaXplZCEucXVhdGVybmlvbilcbiAgICAgICAgLm11bHRpcGx5KF9xdWF0QSlcbiAgICAgICAgLnByZW11bHRpcGx5KF9xdWF0QS5pbnZlcnQoKSlcbiAgICAgICAgLm11bHRpcGx5KHRoaXMuX3Jlc3RRdWF0UmlnaHRFeWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBVc2Uge0BsaW5rIGFwcGx5WWF3UGl0Y2h9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgbG9va0F0KGV1bGVyOiBUSFJFRS5FdWxlcik6IHZvaWQge1xuICAgIGNvbnNvbGUud2FybignVlJNTG9va0F0Qm9uZUFwcGxpZXI6IGxvb2tBdCgpIGlzIGRlcHJlY2F0ZWQuIHVzZSBhcHBseSgpIGluc3RlYWQuJyk7XG5cbiAgICBjb25zdCB5YXcgPSBUSFJFRS5NYXRoVXRpbHMuUkFEMkRFRyAqIGV1bGVyLnk7XG4gICAgY29uc3QgcGl0Y2ggPSBUSFJFRS5NYXRoVXRpbHMuUkFEMkRFRyAqIGV1bGVyLng7XG5cbiAgICB0aGlzLmFwcGx5WWF3UGl0Y2goeWF3LCBwaXRjaCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgcXVhdGVybmlvbiB0aGF0IHJvdGF0ZXMgdGhlIHdvcmxkLXNwYWNlICtaIHVuaXQgdmVjdG9yIHRvIHRoZSB7QGxpbmsgZmFjZUZyb250fSBkaXJlY3Rpb24uXG4gICAqXG4gICAqIEBwYXJhbSB0YXJnZXQgQSB0YXJnZXQgYFRIUkVFLlF1YXRlcm5pb25gXG4gICAqL1xuICBwcml2YXRlIF9nZXRXb3JsZEZhY2VGcm9udFF1YXQodGFyZ2V0OiBUSFJFRS5RdWF0ZXJuaW9uKTogVEhSRUUuUXVhdGVybmlvbiB7XG4gICAgaWYgKHRoaXMuZmFjZUZyb250LmRpc3RhbmNlVG9TcXVhcmVkKFZFQzNfUE9TSVRJVkVfWikgPCAwLjAxKSB7XG4gICAgICByZXR1cm4gdGFyZ2V0LmlkZW50aXR5KCk7XG4gICAgfVxuXG4gICAgY29uc3QgW2ZhY2VGcm9udEF6aW11dGgsIGZhY2VGcm9udEFsdGl0dWRlXSA9IGNhbGNBemltdXRoQWx0aXR1ZGUodGhpcy5mYWNlRnJvbnQpO1xuICAgIF9ldWxlckEuc2V0KDAuMCwgMC41ICogTWF0aC5QSSArIGZhY2VGcm9udEF6aW11dGgsIGZhY2VGcm9udEFsdGl0dWRlLCAnWVpYJyk7XG5cbiAgICByZXR1cm4gdGFyZ2V0LnNldEZyb21FdWxlcihfZXVsZXJBKTtcbiAgfVxufVxuIiwgImltcG9ydCB7IFZSTUV4cHJlc3Npb25NYW5hZ2VyIH0gZnJvbSAnLi4vZXhwcmVzc2lvbnMnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHR5cGUgeyBWUk1Mb29rQXRBcHBsaWVyIH0gZnJvbSAnLi9WUk1Mb29rQXRBcHBsaWVyJztcbmltcG9ydCB7IFZSTUxvb2tBdFJhbmdlTWFwIH0gZnJvbSAnLi9WUk1Mb29rQXRSYW5nZU1hcCc7XG5cbi8qKlxuICogQSBjbGFzcyB0aGF0IGFwcGxpZXMgZXllIGdhemUgZGlyZWN0aW9ucyB0byBhIFZSTS5cbiAqIEl0IHdpbGwgYmUgdXNlZCBieSB7QGxpbmsgVlJNTG9va0F0fS5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUxvb2tBdEV4cHJlc3Npb25BcHBsaWVyIGltcGxlbWVudHMgVlJNTG9va0F0QXBwbGllciB7XG4gIC8qKlxuICAgKiBSZXByZXNlbnQgaXRzIHR5cGUgb2YgYXBwbGllci5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgdHlwZSA9ICdleHByZXNzaW9uJztcblxuICAvKipcbiAgICogSXRzIGFzc29jaWF0ZWQge0BsaW5rIFZSTUV4cHJlc3Npb25NYW5hZ2VyfS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBleHByZXNzaW9uczogVlJNRXhwcmVzc2lvbk1hbmFnZXI7XG5cbiAgLyoqXG4gICAqIEl0IHdvbid0IGJlIHVzZWQgaW4gZXhwcmVzc2lvbiBhcHBsaWVyLlxuICAgKiBTZWUgYWxzbzoge0BsaW5rIHJhbmdlTWFwSG9yaXpvbnRhbE91dGVyfVxuICAgKi9cbiAgcHVibGljIHJhbmdlTWFwSG9yaXpvbnRhbElubmVyOiBWUk1Mb29rQXRSYW5nZU1hcDtcblxuICAvKipcbiAgICogQSB7QGxpbmsgVlJNTG9va0F0UmFuZ2VNYXB9IGZvciBob3Jpem9udGFsIG1vdmVtZW50LiBCb3RoIGV5ZXMgbW92ZSBsZWZ0IG9yIHJpZ2h0LlxuICAgKi9cbiAgcHVibGljIHJhbmdlTWFwSG9yaXpvbnRhbE91dGVyOiBWUk1Mb29rQXRSYW5nZU1hcDtcblxuICAvKipcbiAgICogQSB7QGxpbmsgVlJNTG9va0F0UmFuZ2VNYXB9IGZvciB2ZXJ0aWNhbCBkb3dud2FyZCBtb3ZlbWVudC4gQm90aCBleWVzIG1vdmUgdXB3YXJkcy5cbiAgICovXG4gIHB1YmxpYyByYW5nZU1hcFZlcnRpY2FsRG93bjogVlJNTG9va0F0UmFuZ2VNYXA7XG5cbiAgLyoqXG4gICAqIEEge0BsaW5rIFZSTUxvb2tBdFJhbmdlTWFwfSBmb3IgdmVydGljYWwgdXB3YXJkIG1vdmVtZW50LiBCb3RoIGV5ZXMgbW92ZSBkb3dud2FyZHMuXG4gICAqL1xuICBwdWJsaWMgcmFuZ2VNYXBWZXJ0aWNhbFVwOiBWUk1Mb29rQXRSYW5nZU1hcDtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IHtAbGluayBWUk1Mb29rQXRFeHByZXNzaW9uQXBwbGllcn0uXG4gICAqXG4gICAqIEBwYXJhbSBleHByZXNzaW9ucyBBIHtAbGluayBWUk1FeHByZXNzaW9uTWFuYWdlcn1cbiAgICogQHBhcmFtIHJhbmdlTWFwSG9yaXpvbnRhbElubmVyIEEge0BsaW5rIFZSTUxvb2tBdFJhbmdlTWFwfSB1c2VkIGZvciBpbm5lciB0cmFuc3ZlcnNlIGRpcmVjdGlvblxuICAgKiBAcGFyYW0gcmFuZ2VNYXBIb3Jpem9udGFsT3V0ZXIgQSB7QGxpbmsgVlJNTG9va0F0UmFuZ2VNYXB9IHVzZWQgZm9yIG91dGVyIHRyYW5zdmVyc2UgZGlyZWN0aW9uXG4gICAqIEBwYXJhbSByYW5nZU1hcFZlcnRpY2FsRG93biBBIHtAbGluayBWUk1Mb29rQXRSYW5nZU1hcH0gdXNlZCBmb3IgZG93biBkaXJlY3Rpb25cbiAgICogQHBhcmFtIHJhbmdlTWFwVmVydGljYWxVcCBBIHtAbGluayBWUk1Mb29rQXRSYW5nZU1hcH0gdXNlZCBmb3IgdXAgZGlyZWN0aW9uXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgZXhwcmVzc2lvbnM6IFZSTUV4cHJlc3Npb25NYW5hZ2VyLFxuICAgIHJhbmdlTWFwSG9yaXpvbnRhbElubmVyOiBWUk1Mb29rQXRSYW5nZU1hcCxcbiAgICByYW5nZU1hcEhvcml6b250YWxPdXRlcjogVlJNTG9va0F0UmFuZ2VNYXAsXG4gICAgcmFuZ2VNYXBWZXJ0aWNhbERvd246IFZSTUxvb2tBdFJhbmdlTWFwLFxuICAgIHJhbmdlTWFwVmVydGljYWxVcDogVlJNTG9va0F0UmFuZ2VNYXAsXG4gICkge1xuICAgIHRoaXMuZXhwcmVzc2lvbnMgPSBleHByZXNzaW9ucztcblxuICAgIHRoaXMucmFuZ2VNYXBIb3Jpem9udGFsSW5uZXIgPSByYW5nZU1hcEhvcml6b250YWxJbm5lcjtcbiAgICB0aGlzLnJhbmdlTWFwSG9yaXpvbnRhbE91dGVyID0gcmFuZ2VNYXBIb3Jpem9udGFsT3V0ZXI7XG4gICAgdGhpcy5yYW5nZU1hcFZlcnRpY2FsRG93biA9IHJhbmdlTWFwVmVydGljYWxEb3duO1xuICAgIHRoaXMucmFuZ2VNYXBWZXJ0aWNhbFVwID0gcmFuZ2VNYXBWZXJ0aWNhbFVwO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoZSBpbnB1dCBhbmdsZSB0byBpdHMgYXNzb2NpYXRlZCBWUk0gbW9kZWwuXG4gICAqXG4gICAqIEBwYXJhbSB5YXcgUm90YXRpb24gYXJvdW5kIFkgYXhpcywgaW4gZGVncmVlXG4gICAqIEBwYXJhbSBwaXRjaCBSb3RhdGlvbiBhcm91bmQgWCBheGlzLCBpbiBkZWdyZWVcbiAgICovXG4gIHB1YmxpYyBhcHBseVlhd1BpdGNoKHlhdzogbnVtYmVyLCBwaXRjaDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHBpdGNoIDwgMC4wKSB7XG4gICAgICB0aGlzLmV4cHJlc3Npb25zLnNldFZhbHVlKCdsb29rRG93bicsIDAuMCk7XG4gICAgICB0aGlzLmV4cHJlc3Npb25zLnNldFZhbHVlKCdsb29rVXAnLCB0aGlzLnJhbmdlTWFwVmVydGljYWxVcC5tYXAoLXBpdGNoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZXhwcmVzc2lvbnMuc2V0VmFsdWUoJ2xvb2tVcCcsIDAuMCk7XG4gICAgICB0aGlzLmV4cHJlc3Npb25zLnNldFZhbHVlKCdsb29rRG93bicsIHRoaXMucmFuZ2VNYXBWZXJ0aWNhbERvd24ubWFwKHBpdGNoKSk7XG4gICAgfVxuXG4gICAgaWYgKHlhdyA8IDAuMCkge1xuICAgICAgdGhpcy5leHByZXNzaW9ucy5zZXRWYWx1ZSgnbG9va0xlZnQnLCAwLjApO1xuICAgICAgdGhpcy5leHByZXNzaW9ucy5zZXRWYWx1ZSgnbG9va1JpZ2h0JywgdGhpcy5yYW5nZU1hcEhvcml6b250YWxPdXRlci5tYXAoLXlhdykpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmV4cHJlc3Npb25zLnNldFZhbHVlKCdsb29rUmlnaHQnLCAwLjApO1xuICAgICAgdGhpcy5leHByZXNzaW9ucy5zZXRWYWx1ZSgnbG9va0xlZnQnLCB0aGlzLnJhbmdlTWFwSG9yaXpvbnRhbE91dGVyLm1hcCh5YXcpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVXNlIHtAbGluayBhcHBseVlhd1BpdGNofSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIGxvb2tBdChldWxlcjogVEhSRUUuRXVsZXIpOiB2b2lkIHtcbiAgICBjb25zb2xlLndhcm4oJ1ZSTUxvb2tBdEJvbmVBcHBsaWVyOiBsb29rQXQoKSBpcyBkZXByZWNhdGVkLiB1c2UgYXBwbHkoKSBpbnN0ZWFkLicpO1xuXG4gICAgY29uc3QgeWF3ID0gVEhSRUUuTWF0aFV0aWxzLlJBRDJERUcgKiBldWxlci55O1xuICAgIGNvbnN0IHBpdGNoID0gVEhSRUUuTWF0aFV0aWxzLlJBRDJERUcgKiBldWxlci54O1xuXG4gICAgdGhpcy5hcHBseVlhd1BpdGNoKHlhdywgcGl0Y2gpO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgc2F0dXJhdGUgfSBmcm9tICcuLi91dGlscy9zYXR1cmF0ZSc7XG5cbmV4cG9ydCBjbGFzcyBWUk1Mb29rQXRSYW5nZU1hcCB7XG4gIC8qKlxuICAgKiBMaW1pdHMgdGhlIG1heGltdW0gYW5nbGUgb2YgdGhlIGlucHV0IGFuZ2xlIG9mIHRoZSBMb29rQXQgdmVjdG9yIGZyb20gdGhlIGZyb250IG9mIHRoZSBoZWFkICh0aGUgcG9zaXRpdmUgeiBheGlzKS5cbiAgICovXG4gIHB1YmxpYyBpbnB1dE1heFZhbHVlOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFJlcHJlc2VudHMgYW4gYW5nbGUgKGluIGRlZ3JlZXMpIGZvciBib25lIHR5cGUgb2YgTG9va0F0IGFwcGxpZXJzLCBvciBhIHdlaWdodCBmb3IgZXhwcmVzc2lvbiB0eXBlIG9mIExvb2tBdCBhcHBsaWVycy5cbiAgICogVGhlIGlucHV0IHZhbHVlIHdpbGwgdGFrZSBgMS4wYCB3aGVuIHRoZSBpbnB1dCBhbmdsZSBlcXVhbHMgKG9yIGdyZWF0ZXIpIHRvIHtAbGluayBpbnB1dE1heFZhbHVlfS5cbiAgICovXG4gIHB1YmxpYyBvdXRwdXRTY2FsZTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcge0BsaW5rIFZSTUxvb2tBdFJhbmdlTWFwfS5cbiAgICpcbiAgICogQHBhcmFtIGlucHV0TWF4VmFsdWUgVGhlIHtAbGluayBpbnB1dE1heFZhbHVlfSBvZiB0aGUgbWFwXG4gICAqIEBwYXJhbSBvdXRwdXRTY2FsZSBUaGUge0BsaW5rIG91dHB1dFNjYWxlfSBvZiB0aGUgbWFwXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoaW5wdXRNYXhWYWx1ZTogbnVtYmVyLCBvdXRwdXRTY2FsZTogbnVtYmVyKSB7XG4gICAgdGhpcy5pbnB1dE1heFZhbHVlID0gaW5wdXRNYXhWYWx1ZTtcbiAgICB0aGlzLm91dHB1dFNjYWxlID0gb3V0cHV0U2NhbGU7XG4gIH1cblxuICAvKipcbiAgICogRXZhbHVhdGUgYW4gaW5wdXQgdmFsdWUgYW5kIG91dHB1dCBhIG1hcHBlZCB2YWx1ZS5cbiAgICogQHBhcmFtIHNyYyBUaGUgaW5wdXQgdmFsdWVcbiAgICovXG4gIHB1YmxpYyBtYXAoc3JjOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLm91dHB1dFNjYWxlICogc2F0dXJhdGUoc3JjIC8gdGhpcy5pbnB1dE1heFZhbHVlKTtcbiAgfVxufVxuIiwgImltcG9ydCB0eXBlICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHR5cGUgKiBhcyBWMFZSTSBmcm9tICdAcGl4aXYvdHlwZXMtdnJtLTAuMCc7XG5pbXBvcnQgdHlwZSAqIGFzIFYxVlJNU2NoZW1hIGZyb20gJ0BwaXhpdi90eXBlcy12cm1jLXZybS0xLjAnO1xuaW1wb3J0IHR5cGUgeyBHTFRGLCBHTFRGTG9hZGVyUGx1Z2luLCBHTFRGUGFyc2VyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlci5qcyc7XG5pbXBvcnQgdHlwZSB7IFZSTUV4cHJlc3Npb25NYW5hZ2VyIH0gZnJvbSAnLi4vZXhwcmVzc2lvbnMvVlJNRXhwcmVzc2lvbk1hbmFnZXInO1xuaW1wb3J0IHR5cGUgeyBWUk1IdW1hbm9pZCB9IGZyb20gJy4uL2h1bWFub2lkL1ZSTUh1bWFub2lkJztcbmltcG9ydCB7IFZSTUxvb2tBdEhlbHBlciB9IGZyb20gJy4vaGVscGVycy9WUk1Mb29rQXRIZWxwZXInO1xuaW1wb3J0IHsgVlJNTG9va0F0IH0gZnJvbSAnLi9WUk1Mb29rQXQnO1xuaW1wb3J0IHR5cGUgeyBWUk1Mb29rQXRBcHBsaWVyIH0gZnJvbSAnLi9WUk1Mb29rQXRBcHBsaWVyJztcbmltcG9ydCB7IFZSTUxvb2tBdEJvbmVBcHBsaWVyIH0gZnJvbSAnLi9WUk1Mb29rQXRCb25lQXBwbGllcic7XG5pbXBvcnQgeyBWUk1Mb29rQXRFeHByZXNzaW9uQXBwbGllciB9IGZyb20gJy4vVlJNTG9va0F0RXhwcmVzc2lvbkFwcGxpZXInO1xuaW1wb3J0IHR5cGUgeyBWUk1Mb29rQXRMb2FkZXJQbHVnaW5PcHRpb25zIH0gZnJvbSAnLi9WUk1Mb29rQXRMb2FkZXJQbHVnaW5PcHRpb25zJztcbmltcG9ydCB7IFZSTUxvb2tBdFJhbmdlTWFwIH0gZnJvbSAnLi9WUk1Mb29rQXRSYW5nZU1hcCc7XG5pbXBvcnQgeyBHTFRGIGFzIEdMVEZTY2hlbWEgfSBmcm9tICdAZ2x0Zi10cmFuc2Zvcm0vY29yZSc7XG5cbi8qKlxuICogUG9zc2libGUgc3BlYyB2ZXJzaW9ucyBpdCByZWNvZ25pemVzLlxuICovXG5jb25zdCBQT1NTSUJMRV9TUEVDX1ZFUlNJT05TID0gbmV3IFNldChbJzEuMCcsICcxLjAtYmV0YSddKTtcblxuLyoqXG4gKiBUaGUgbWluaW11bSBwZXJtaXR0ZWQgdmFsdWUgZm9yIHtAbGluayBWMVZSTVNjaGVtYS5Mb29rQXRSYW5nZU1hcC5pbnB1dE1heFZhbHVlfS5cbiAqIElmIHRoZSBnaXZlbiB2YWx1ZSBpcyBzbWFsbGVyIHRoYW4gdGhpcywgdGhlIGxvYWRlciBzaG93cyBhIHdhcm5pbmcgYW5kIGNsYW1wcyB1cCB0aGUgdmFsdWUuXG4gKi9cbmNvbnN0IElOUFVUX01BWF9WQUxVRV9NSU5JTVVNID0gMC4wMTtcblxuLyoqXG4gKiBBIHBsdWdpbiBvZiBHTFRGTG9hZGVyIHRoYXQgaW1wb3J0cyBhIHtAbGluayBWUk1Mb29rQXR9IGZyb20gYSBWUk0gZXh0ZW5zaW9uIG9mIGEgR0xURi5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUxvb2tBdExvYWRlclBsdWdpbiBpbXBsZW1lbnRzIEdMVEZMb2FkZXJQbHVnaW4ge1xuICAvKipcbiAgICogU3BlY2lmeSBhbiBPYmplY3QzRCB0byBhZGQge0BsaW5rIFZSTUxvb2tBdEhlbHBlcn0gcy5cbiAgICogSWYgbm90IHNwZWNpZmllZCwgaGVscGVyIHdpbGwgbm90IGJlIGNyZWF0ZWQuXG4gICAqIElmIGByZW5kZXJPcmRlcmAgaXMgc2V0IHRvIHRoZSByb290LCBoZWxwZXJzIHdpbGwgY29weSB0aGUgc2FtZSBgcmVuZGVyT3JkZXJgIC5cbiAgICovXG4gIHB1YmxpYyBoZWxwZXJSb290PzogVEhSRUUuT2JqZWN0M0Q7XG5cbiAgcHVibGljIHJlYWRvbmx5IHBhcnNlcjogR0xURlBhcnNlcjtcblxuICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICAvLyBXZSBzaG91bGQgdXNlIHRoZSBleHRlbnNpb24gbmFtZSBpbnN0ZWFkIGJ1dCB3ZSBoYXZlIG11bHRpcGxlIHBsdWdpbnMgZm9yIGFuIGV4dGVuc2lvbi4uLlxuICAgIHJldHVybiAnVlJNTG9va0F0TG9hZGVyUGx1Z2luJztcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJzZXI6IEdMVEZQYXJzZXIsIG9wdGlvbnM/OiBWUk1Mb29rQXRMb2FkZXJQbHVnaW5PcHRpb25zKSB7XG4gICAgdGhpcy5wYXJzZXIgPSBwYXJzZXI7XG5cbiAgICB0aGlzLmhlbHBlclJvb3QgPSBvcHRpb25zPy5oZWxwZXJSb290O1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGFmdGVyUm9vdChnbHRmOiBHTFRGKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgdnJtSHVtYW5vaWQgPSBnbHRmLnVzZXJEYXRhLnZybUh1bWFub2lkIGFzIFZSTUh1bWFub2lkIHwgdW5kZWZpbmVkO1xuXG4gICAgLy8gZXhwbGljaXRseSBkaXN0aW5ndWlzaCBudWxsIGFuZCB1bmRlZmluZWRcbiAgICAvLyBzaW5jZSB2cm1IdW1hbm9pZCBtaWdodCBiZSBudWxsIGFzIGEgcmVzdWx0XG4gICAgaWYgKHZybUh1bWFub2lkID09PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIGlmICh2cm1IdW1hbm9pZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZSTUxvb2tBdExvYWRlclBsdWdpbjogdnJtSHVtYW5vaWQgaXMgdW5kZWZpbmVkLiBWUk1IdW1hbm9pZExvYWRlclBsdWdpbiBoYXZlIHRvIGJlIHVzZWQgZmlyc3QnKTtcbiAgICB9XG5cbiAgICBjb25zdCB2cm1FeHByZXNzaW9uTWFuYWdlciA9IGdsdGYudXNlckRhdGEudnJtRXhwcmVzc2lvbk1hbmFnZXIgYXMgVlJNRXhwcmVzc2lvbk1hbmFnZXIgfCB1bmRlZmluZWQ7XG5cbiAgICBpZiAodnJtRXhwcmVzc2lvbk1hbmFnZXIgPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKHZybUV4cHJlc3Npb25NYW5hZ2VyID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1ZSTUxvb2tBdExvYWRlclBsdWdpbjogdnJtRXhwcmVzc2lvbk1hbmFnZXIgaXMgdW5kZWZpbmVkLiBWUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luIGhhdmUgdG8gYmUgdXNlZCBmaXJzdCcsXG4gICAgICApO1xuICAgIH1cblxuICAgIGdsdGYudXNlckRhdGEudnJtTG9va0F0ID0gYXdhaXQgdGhpcy5faW1wb3J0KGdsdGYsIHZybUh1bWFub2lkLCB2cm1FeHByZXNzaW9uTWFuYWdlcik7XG4gIH1cblxuICAvKipcbiAgICogSW1wb3J0IGEge0BsaW5rIFZSTUxvb2tBdH0gZnJvbSBhIFZSTS5cbiAgICpcbiAgICogQHBhcmFtIGdsdGYgQSBwYXJzZWQgcmVzdWx0IG9mIEdMVEYgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gICAqIEBwYXJhbSBodW1hbm9pZCBBIHtAbGluayBWUk1IdW1hbm9pZH0gaW5zdGFuY2UgdGhhdCByZXByZXNlbnRzIHRoZSBWUk1cbiAgICogQHBhcmFtIGV4cHJlc3Npb25zIEEge0BsaW5rIFZSTUV4cHJlc3Npb25NYW5hZ2VyfSBpbnN0YW5jZSB0aGF0IHJlcHJlc2VudHMgdGhlIFZSTVxuICAgKi9cbiAgcHJpdmF0ZSBhc3luYyBfaW1wb3J0KFxuICAgIGdsdGY6IEdMVEYsXG4gICAgaHVtYW5vaWQ6IFZSTUh1bWFub2lkIHwgbnVsbCxcbiAgICBleHByZXNzaW9uczogVlJNRXhwcmVzc2lvbk1hbmFnZXIgfCBudWxsLFxuICApOiBQcm9taXNlPFZSTUxvb2tBdCB8IG51bGw+IHtcbiAgICBpZiAoaHVtYW5vaWQgPT0gbnVsbCB8fCBleHByZXNzaW9ucyA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCB2MVJlc3VsdCA9IGF3YWl0IHRoaXMuX3YxSW1wb3J0KGdsdGYsIGh1bWFub2lkLCBleHByZXNzaW9ucyk7XG4gICAgaWYgKHYxUmVzdWx0KSB7XG4gICAgICByZXR1cm4gdjFSZXN1bHQ7XG4gICAgfVxuXG4gICAgY29uc3QgdjBSZXN1bHQgPSBhd2FpdCB0aGlzLl92MEltcG9ydChnbHRmLCBodW1hbm9pZCwgZXhwcmVzc2lvbnMpO1xuICAgIGlmICh2MFJlc3VsdCkge1xuICAgICAgcmV0dXJuIHYwUmVzdWx0O1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfdjFJbXBvcnQoXG4gICAgZ2x0ZjogR0xURixcbiAgICBodW1hbm9pZDogVlJNSHVtYW5vaWQsXG4gICAgZXhwcmVzc2lvbnM6IFZSTUV4cHJlc3Npb25NYW5hZ2VyLFxuICApOiBQcm9taXNlPFZSTUxvb2tBdCB8IG51bGw+IHtcbiAgICBjb25zdCBqc29uID0gdGhpcy5wYXJzZXIuanNvbiBhcyBHTFRGU2NoZW1hLklHTFRGO1xuXG4gICAgLy8gZWFybHkgYWJvcnQgaWYgaXQgZG9lc24ndCB1c2UgdnJtXG4gICAgY29uc3QgaXNWUk1Vc2VkID0ganNvbi5leHRlbnNpb25zVXNlZD8uaW5kZXhPZignVlJNQ192cm0nKSAhPT0gLTE7XG4gICAgaWYgKCFpc1ZSTVVzZWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGV4dGVuc2lvbiA9IGpzb24uZXh0ZW5zaW9ucz8uWydWUk1DX3ZybSddIGFzIFYxVlJNU2NoZW1hLlZSTUNWUk0gfCB1bmRlZmluZWQ7XG4gICAgaWYgKCFleHRlbnNpb24pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNwZWNWZXJzaW9uID0gZXh0ZW5zaW9uLnNwZWNWZXJzaW9uO1xuICAgIGlmICghUE9TU0lCTEVfU1BFQ19WRVJTSU9OUy5oYXMoc3BlY1ZlcnNpb24pKSB7XG4gICAgICBjb25zb2xlLndhcm4oYFZSTUxvb2tBdExvYWRlclBsdWdpbjogVW5rbm93biBWUk1DX3ZybSBzcGVjVmVyc2lvbiBcIiR7c3BlY1ZlcnNpb259XCJgKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNjaGVtYUxvb2tBdCA9IGV4dGVuc2lvbi5sb29rQXQ7XG4gICAgaWYgKCFzY2hlbWFMb29rQXQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGRlZmF1bHRPdXRwdXRTY2FsZSA9IHNjaGVtYUxvb2tBdC50eXBlID09PSAnZXhwcmVzc2lvbicgPyAxLjAgOiAxMC4wO1xuXG4gICAgY29uc3QgbWFwSEkgPSB0aGlzLl92MUltcG9ydFJhbmdlTWFwKHNjaGVtYUxvb2tBdC5yYW5nZU1hcEhvcml6b250YWxJbm5lciwgZGVmYXVsdE91dHB1dFNjYWxlKTtcbiAgICBjb25zdCBtYXBITyA9IHRoaXMuX3YxSW1wb3J0UmFuZ2VNYXAoc2NoZW1hTG9va0F0LnJhbmdlTWFwSG9yaXpvbnRhbE91dGVyLCBkZWZhdWx0T3V0cHV0U2NhbGUpO1xuICAgIGNvbnN0IG1hcFZEID0gdGhpcy5fdjFJbXBvcnRSYW5nZU1hcChzY2hlbWFMb29rQXQucmFuZ2VNYXBWZXJ0aWNhbERvd24sIGRlZmF1bHRPdXRwdXRTY2FsZSk7XG4gICAgY29uc3QgbWFwVlUgPSB0aGlzLl92MUltcG9ydFJhbmdlTWFwKHNjaGVtYUxvb2tBdC5yYW5nZU1hcFZlcnRpY2FsVXAsIGRlZmF1bHRPdXRwdXRTY2FsZSk7XG5cbiAgICBsZXQgYXBwbGllcjtcblxuICAgIGlmIChzY2hlbWFMb29rQXQudHlwZSA9PT0gJ2V4cHJlc3Npb24nKSB7XG4gICAgICBhcHBsaWVyID0gbmV3IFZSTUxvb2tBdEV4cHJlc3Npb25BcHBsaWVyKGV4cHJlc3Npb25zLCBtYXBISSwgbWFwSE8sIG1hcFZELCBtYXBWVSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwcGxpZXIgPSBuZXcgVlJNTG9va0F0Qm9uZUFwcGxpZXIoaHVtYW5vaWQsIG1hcEhJLCBtYXBITywgbWFwVkQsIG1hcFZVKTtcbiAgICB9XG5cbiAgICBjb25zdCBsb29rQXQgPSB0aGlzLl9pbXBvcnRMb29rQXQoaHVtYW5vaWQsIGFwcGxpZXIpO1xuXG4gICAgbG9va0F0Lm9mZnNldEZyb21IZWFkQm9uZS5mcm9tQXJyYXkoc2NoZW1hTG9va0F0Lm9mZnNldEZyb21IZWFkQm9uZSA/PyBbMC4wLCAwLjA2LCAwLjBdKTtcblxuICAgIHJldHVybiBsb29rQXQ7XG4gIH1cblxuICBwcml2YXRlIF92MUltcG9ydFJhbmdlTWFwKFxuICAgIHNjaGVtYVJhbmdlTWFwOiBWMVZSTVNjaGVtYS5Mb29rQXRSYW5nZU1hcCB8IHVuZGVmaW5lZCxcbiAgICBkZWZhdWx0T3V0cHV0U2NhbGU6IG51bWJlcixcbiAgKTogVlJNTG9va0F0UmFuZ2VNYXAge1xuICAgIGxldCBpbnB1dE1heFZhbHVlID0gc2NoZW1hUmFuZ2VNYXA/LmlucHV0TWF4VmFsdWUgPz8gOTAuMDtcbiAgICBjb25zdCBvdXRwdXRTY2FsZSA9IHNjaGVtYVJhbmdlTWFwPy5vdXRwdXRTY2FsZSA/PyBkZWZhdWx0T3V0cHV0U2NhbGU7XG5cbiAgICAvLyBJdCBtaWdodCBjYXVzZSBOYU4gd2hlbiBgaW5wdXRNYXhWYWx1ZWAgaXMgdG9vIHNtYWxsXG4gICAgLy8gd2hpY2ggbWFrZXMgdGhlIG1lc2ggb2YgdGhlIGhlYWQgZGlzYXBwZWFyXG4gICAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vcGl4aXYvdGhyZWUtdnJtL2lzc3Vlcy8xMjAxXG4gICAgaWYgKGlucHV0TWF4VmFsdWUgPCBJTlBVVF9NQVhfVkFMVUVfTUlOSU1VTSkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAnVlJNTG9va0F0TG9hZGVyUGx1Z2luOiBpbnB1dE1heFZhbHVlIG9mIGEgcmFuZ2UgbWFwIGlzIHRvbyBzbWFsbC4gQ29uc2lkZXIgcmV2aWV3aW5nIHRoZSByYW5nZSBtYXAhJyxcbiAgICAgICk7XG4gICAgICBpbnB1dE1heFZhbHVlID0gSU5QVVRfTUFYX1ZBTFVFX01JTklNVU07XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBWUk1Mb29rQXRSYW5nZU1hcChpbnB1dE1heFZhbHVlLCBvdXRwdXRTY2FsZSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF92MEltcG9ydChcbiAgICBnbHRmOiBHTFRGLFxuICAgIGh1bWFub2lkOiBWUk1IdW1hbm9pZCxcbiAgICBleHByZXNzaW9uczogVlJNRXhwcmVzc2lvbk1hbmFnZXIsXG4gICk6IFByb21pc2U8VlJNTG9va0F0IHwgbnVsbD4ge1xuICAgIGNvbnN0IGpzb24gPSB0aGlzLnBhcnNlci5qc29uIGFzIEdMVEZTY2hlbWEuSUdMVEY7XG5cbiAgICAvLyBlYXJseSBhYm9ydCBpZiBpdCBkb2Vzbid0IHVzZSB2cm1cbiAgICBjb25zdCB2cm1FeHQgPSBqc29uLmV4dGVuc2lvbnM/LlZSTSBhcyBWMFZSTS5WUk0gfCB1bmRlZmluZWQ7XG4gICAgaWYgKCF2cm1FeHQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNjaGVtYUZpcnN0UGVyc29uID0gdnJtRXh0LmZpcnN0UGVyc29uO1xuICAgIGlmICghc2NoZW1hRmlyc3RQZXJzb24pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGRlZmF1bHRPdXRwdXRTY2FsZSA9IHNjaGVtYUZpcnN0UGVyc29uLmxvb2tBdFR5cGVOYW1lID09PSAnQmxlbmRTaGFwZScgPyAxLjAgOiAxMC4wO1xuXG4gICAgY29uc3QgbWFwSEkgPSB0aGlzLl92MEltcG9ydERlZ3JlZU1hcChzY2hlbWFGaXJzdFBlcnNvbi5sb29rQXRIb3Jpem9udGFsSW5uZXIsIGRlZmF1bHRPdXRwdXRTY2FsZSk7XG4gICAgY29uc3QgbWFwSE8gPSB0aGlzLl92MEltcG9ydERlZ3JlZU1hcChzY2hlbWFGaXJzdFBlcnNvbi5sb29rQXRIb3Jpem9udGFsT3V0ZXIsIGRlZmF1bHRPdXRwdXRTY2FsZSk7XG4gICAgY29uc3QgbWFwVkQgPSB0aGlzLl92MEltcG9ydERlZ3JlZU1hcChzY2hlbWFGaXJzdFBlcnNvbi5sb29rQXRWZXJ0aWNhbERvd24sIGRlZmF1bHRPdXRwdXRTY2FsZSk7XG4gICAgY29uc3QgbWFwVlUgPSB0aGlzLl92MEltcG9ydERlZ3JlZU1hcChzY2hlbWFGaXJzdFBlcnNvbi5sb29rQXRWZXJ0aWNhbFVwLCBkZWZhdWx0T3V0cHV0U2NhbGUpO1xuXG4gICAgbGV0IGFwcGxpZXI7XG5cbiAgICBpZiAoc2NoZW1hRmlyc3RQZXJzb24ubG9va0F0VHlwZU5hbWUgPT09ICdCbGVuZFNoYXBlJykge1xuICAgICAgYXBwbGllciA9IG5ldyBWUk1Mb29rQXRFeHByZXNzaW9uQXBwbGllcihleHByZXNzaW9ucywgbWFwSEksIG1hcEhPLCBtYXBWRCwgbWFwVlUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcHBsaWVyID0gbmV3IFZSTUxvb2tBdEJvbmVBcHBsaWVyKGh1bWFub2lkLCBtYXBISSwgbWFwSE8sIG1hcFZELCBtYXBWVSk7XG4gICAgfVxuXG4gICAgY29uc3QgbG9va0F0ID0gdGhpcy5faW1wb3J0TG9va0F0KGh1bWFub2lkLCBhcHBsaWVyKTtcblxuICAgIGlmIChzY2hlbWFGaXJzdFBlcnNvbi5maXJzdFBlcnNvbkJvbmVPZmZzZXQpIHtcbiAgICAgIGxvb2tBdC5vZmZzZXRGcm9tSGVhZEJvbmUuc2V0KFxuICAgICAgICBzY2hlbWFGaXJzdFBlcnNvbi5maXJzdFBlcnNvbkJvbmVPZmZzZXQueCA/PyAwLjAsXG4gICAgICAgIHNjaGVtYUZpcnN0UGVyc29uLmZpcnN0UGVyc29uQm9uZU9mZnNldC55ID8/IDAuMDYsXG4gICAgICAgIC0oc2NoZW1hRmlyc3RQZXJzb24uZmlyc3RQZXJzb25Cb25lT2Zmc2V0LnogPz8gMC4wKSxcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvb2tBdC5vZmZzZXRGcm9tSGVhZEJvbmUuc2V0KDAuMCwgMC4wNiwgMC4wKTtcbiAgICB9XG5cbiAgICAvLyBWUk0gMC4wIGFyZSBmYWNpbmcgWi0gaW5zdGVhZCBvZiBaK1xuICAgIGxvb2tBdC5mYWNlRnJvbnQuc2V0KDAuMCwgMC4wLCAtMS4wKTtcblxuICAgIGlmIChhcHBsaWVyIGluc3RhbmNlb2YgVlJNTG9va0F0Qm9uZUFwcGxpZXIpIHtcbiAgICAgIGFwcGxpZXIuZmFjZUZyb250LnNldCgwLjAsIDAuMCwgLTEuMCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxvb2tBdDtcbiAgfVxuXG4gIHByaXZhdGUgX3YwSW1wb3J0RGVncmVlTWFwKFxuICAgIHNjaGVtYURlZ3JlZU1hcDogVjBWUk0uRmlyc3RQZXJzb25EZWdyZWVNYXAgfCB1bmRlZmluZWQsXG4gICAgZGVmYXVsdE91dHB1dFNjYWxlOiBudW1iZXIsXG4gICk6IFZSTUxvb2tBdFJhbmdlTWFwIHtcbiAgICBjb25zdCBjdXJ2ZSA9IHNjaGVtYURlZ3JlZU1hcD8uY3VydmU7XG4gICAgaWYgKEpTT04uc3RyaW5naWZ5KGN1cnZlKSAhPT0gJ1swLDAsMCwxLDEsMSwxLDBdJykge1xuICAgICAgY29uc29sZS53YXJuKCdDdXJ2ZXMgb2YgTG9va0F0RGVncmVlTWFwIGRlZmluZWQgaW4gVlJNIDAuMCBhcmUgbm90IHN1cHBvcnRlZCcpO1xuICAgIH1cblxuICAgIGxldCB4UmFuZ2UgPSBzY2hlbWFEZWdyZWVNYXA/LnhSYW5nZSA/PyA5MC4wO1xuICAgIGNvbnN0IHlSYW5nZSA9IHNjaGVtYURlZ3JlZU1hcD8ueVJhbmdlID8/IGRlZmF1bHRPdXRwdXRTY2FsZTtcblxuICAgIC8vIEl0IG1pZ2h0IGNhdXNlIE5hTiB3aGVuIGB4UmFuZ2VgIGlzIHRvbyBzbWFsbFxuICAgIC8vIHdoaWNoIG1ha2VzIHRoZSBtZXNoIG9mIHRoZSBoZWFkIGRpc2FwcGVhclxuICAgIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL3BpeGl2L3RocmVlLXZybS9pc3N1ZXMvMTIwMVxuICAgIGlmICh4UmFuZ2UgPCBJTlBVVF9NQVhfVkFMVUVfTUlOSU1VTSkge1xuICAgICAgY29uc29sZS53YXJuKCdWUk1Mb29rQXRMb2FkZXJQbHVnaW46IHhSYW5nZSBvZiBhIGRlZ3JlZSBtYXAgaXMgdG9vIHNtYWxsLiBDb25zaWRlciByZXZpZXdpbmcgdGhlIGRlZ3JlZSBtYXAhJyk7XG4gICAgICB4UmFuZ2UgPSBJTlBVVF9NQVhfVkFMVUVfTUlOSU1VTTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFZSTUxvb2tBdFJhbmdlTWFwKHhSYW5nZSwgeVJhbmdlKTtcbiAgfVxuXG4gIHByaXZhdGUgX2ltcG9ydExvb2tBdChodW1hbm9pZDogVlJNSHVtYW5vaWQsIGFwcGxpZXI6IFZSTUxvb2tBdEFwcGxpZXIpOiBWUk1Mb29rQXQge1xuICAgIGNvbnN0IGxvb2tBdCA9IG5ldyBWUk1Mb29rQXQoaHVtYW5vaWQsIGFwcGxpZXIpO1xuXG4gICAgaWYgKHRoaXMuaGVscGVyUm9vdCkge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IFZSTUxvb2tBdEhlbHBlcihsb29rQXQpO1xuICAgICAgdGhpcy5oZWxwZXJSb290LmFkZChoZWxwZXIpO1xuICAgICAgaGVscGVyLnJlbmRlck9yZGVyID0gdGhpcy5oZWxwZXJSb290LnJlbmRlck9yZGVyO1xuICAgIH1cblxuICAgIHJldHVybiBsb29rQXQ7XG4gIH1cbn1cbiIsICIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgdHlwZSBvZiBhcHBsaWVyLlxuICovXG5leHBvcnQgY29uc3QgVlJNTG9va0F0VHlwZU5hbWUgPSB7XG4gIEJvbmU6ICdib25lJyxcbiAgRXhwcmVzc2lvbjogJ2V4cHJlc3Npb24nLFxufTtcblxuZXhwb3J0IHR5cGUgVlJNTG9va0F0VHlwZU5hbWUgPSAodHlwZW9mIFZSTUxvb2tBdFR5cGVOYW1lKVtrZXlvZiB0eXBlb2YgVlJNTG9va0F0VHlwZU5hbWVdO1xuIiwgImltcG9ydCB0eXBlIHsgR0xURiwgR0xURkxvYWRlclBsdWdpbiwgR0xURlBhcnNlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXIuanMnO1xuaW1wb3J0IHR5cGUgeyBWUk0wTWV0YSB9IGZyb20gJy4vVlJNME1ldGEnO1xuaW1wb3J0IHR5cGUgeyBWUk0xTWV0YSB9IGZyb20gJy4vVlJNMU1ldGEnO1xuaW1wb3J0IHR5cGUgeyBWUk1NZXRhIH0gZnJvbSAnLi9WUk1NZXRhJztcbmltcG9ydCB0eXBlIHsgVlJNTWV0YUxvYWRlclBsdWdpbk9wdGlvbnMgfSBmcm9tICcuL1ZSTU1ldGFMb2FkZXJQbHVnaW5PcHRpb25zJztcbmltcG9ydCB0eXBlICogYXMgVjBWUk0gZnJvbSAnQHBpeGl2L3R5cGVzLXZybS0wLjAnO1xuaW1wb3J0IHR5cGUgKiBhcyBWMVZSTVNjaGVtYSBmcm9tICdAcGl4aXYvdHlwZXMtdnJtYy12cm0tMS4wJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IHJlc29sdmVVUkwgfSBmcm9tICcuLi91dGlscy9yZXNvbHZlVVJMJztcbmltcG9ydCB7IEdMVEYgYXMgR0xURlNjaGVtYSB9IGZyb20gJ0BnbHRmLXRyYW5zZm9ybS9jb3JlJztcblxuLyoqXG4gKiBQb3NzaWJsZSBzcGVjIHZlcnNpb25zIGl0IHJlY29nbml6ZXMuXG4gKi9cbmNvbnN0IFBPU1NJQkxFX1NQRUNfVkVSU0lPTlMgPSBuZXcgU2V0KFsnMS4wJywgJzEuMC1iZXRhJ10pO1xuXG4vKipcbiAqIEEgcGx1Z2luIG9mIEdMVEZMb2FkZXIgdGhhdCBpbXBvcnRzIGEge0BsaW5rIFZSTTFNZXRhfSBmcm9tIGEgVlJNIGV4dGVuc2lvbiBvZiBhIEdMVEYuXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1NZXRhTG9hZGVyUGx1Z2luIGltcGxlbWVudHMgR0xURkxvYWRlclBsdWdpbiB7XG4gIHB1YmxpYyByZWFkb25seSBwYXJzZXI6IEdMVEZQYXJzZXI7XG5cbiAgLyoqXG4gICAqIElmIGBmYWxzZWAsIGl0IHdvbid0IGxvYWQgaXRzIHRodW1ibmFpbCBpbWFnZSAoe0BsaW5rIFZSTTFNZXRhLnRodW1ibmFpbEltYWdlfSkuXG4gICAqIGBmYWxzZWAgYnkgZGVmYXVsdC5cbiAgICovXG4gIHB1YmxpYyBuZWVkVGh1bWJuYWlsSW1hZ2U6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEEgbGlzdCBvZiBsaWNlbnNlIHVybHMuXG4gICAqIFRoaXMgbWV0YSBsb2FkZXIgd2lsbCBhY2NlcHQgdGhlc2UgYGxpY2Vuc2VVcmxgcy5cbiAgICogT3RoZXJ3aXNlIGl0IHdvbid0IGJlIGxvYWRlZC5cbiAgICovXG4gIHB1YmxpYyBhY2NlcHRMaWNlbnNlVXJsczogc3RyaW5nW107XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgaXQgc2hvdWxkIGFjY2VwdCBWUk0wLjAgbWV0YSBvciBub3QuXG4gICAqIE5vdGUgdGhhdCBpdCBtaWdodCBsb2FkIHtAbGluayBWUk0wTWV0YX0gaW5zdGVhZCBvZiB7QGxpbmsgVlJNMU1ldGF9IHdoZW4gdGhpcyBpcyBgdHJ1ZWAuXG4gICAqIGB0cnVlYCBieSBkZWZhdWx0LlxuICAgKi9cbiAgcHVibGljIGFjY2VwdFYwTWV0YTogYm9vbGVhbjtcblxuICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICAvLyBXZSBzaG91bGQgdXNlIHRoZSBleHRlbnNpb24gbmFtZSBpbnN0ZWFkIGJ1dCB3ZSBoYXZlIG11bHRpcGxlIHBsdWdpbnMgZm9yIGFuIGV4dGVuc2lvbi4uLlxuICAgIHJldHVybiAnVlJNTWV0YUxvYWRlclBsdWdpbic7XG4gIH1cblxuICBwdWJsaWMgY29uc3RydWN0b3IocGFyc2VyOiBHTFRGUGFyc2VyLCBvcHRpb25zPzogVlJNTWV0YUxvYWRlclBsdWdpbk9wdGlvbnMpIHtcbiAgICB0aGlzLnBhcnNlciA9IHBhcnNlcjtcblxuICAgIHRoaXMubmVlZFRodW1ibmFpbEltYWdlID0gb3B0aW9ucz8ubmVlZFRodW1ibmFpbEltYWdlID8/IGZhbHNlO1xuICAgIHRoaXMuYWNjZXB0TGljZW5zZVVybHMgPSBvcHRpb25zPy5hY2NlcHRMaWNlbnNlVXJscyA/PyBbJ2h0dHBzOi8vdnJtLmRldi9saWNlbnNlcy8xLjAvJ107XG4gICAgdGhpcy5hY2NlcHRWME1ldGEgPSBvcHRpb25zPy5hY2NlcHRWME1ldGEgPz8gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBhZnRlclJvb3QoZ2x0ZjogR0xURik6IFByb21pc2U8dm9pZD4ge1xuICAgIGdsdGYudXNlckRhdGEudnJtTWV0YSA9IGF3YWl0IHRoaXMuX2ltcG9ydChnbHRmKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX2ltcG9ydChnbHRmOiBHTFRGKTogUHJvbWlzZTxWUk1NZXRhIHwgbnVsbD4ge1xuICAgIGNvbnN0IHYxUmVzdWx0ID0gYXdhaXQgdGhpcy5fdjFJbXBvcnQoZ2x0Zik7XG4gICAgaWYgKHYxUmVzdWx0ICE9IG51bGwpIHtcbiAgICAgIHJldHVybiB2MVJlc3VsdDtcbiAgICB9XG5cbiAgICBjb25zdCB2MFJlc3VsdCA9IGF3YWl0IHRoaXMuX3YwSW1wb3J0KGdsdGYpO1xuICAgIGlmICh2MFJlc3VsdCAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gdjBSZXN1bHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF92MUltcG9ydChnbHRmOiBHTFRGKTogUHJvbWlzZTxWUk0xTWV0YSB8IG51bGw+IHtcbiAgICBjb25zdCBqc29uID0gdGhpcy5wYXJzZXIuanNvbiBhcyBHTFRGU2NoZW1hLklHTFRGO1xuXG4gICAgLy8gZWFybHkgYWJvcnQgaWYgaXQgZG9lc24ndCB1c2UgdnJtXG4gICAgY29uc3QgaXNWUk1Vc2VkID0ganNvbi5leHRlbnNpb25zVXNlZD8uaW5kZXhPZignVlJNQ192cm0nKSAhPT0gLTE7XG4gICAgaWYgKCFpc1ZSTVVzZWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGV4dGVuc2lvbiA9IGpzb24uZXh0ZW5zaW9ucz8uWydWUk1DX3ZybSddIGFzIFYxVlJNU2NoZW1hLlZSTUNWUk0gfCB1bmRlZmluZWQ7XG4gICAgaWYgKGV4dGVuc2lvbiA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzcGVjVmVyc2lvbiA9IGV4dGVuc2lvbi5zcGVjVmVyc2lvbjtcbiAgICBpZiAoIVBPU1NJQkxFX1NQRUNfVkVSU0lPTlMuaGFzKHNwZWNWZXJzaW9uKSkge1xuICAgICAgY29uc29sZS53YXJuKGBWUk1NZXRhTG9hZGVyUGx1Z2luOiBVbmtub3duIFZSTUNfdnJtIHNwZWNWZXJzaW9uIFwiJHtzcGVjVmVyc2lvbn1cImApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc2NoZW1hTWV0YSA9IGV4dGVuc2lvbi5tZXRhO1xuICAgIGlmICghc2NoZW1hTWV0YSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gdGhyb3cgYW4gZXJyb3IgaWYgYWNjZXB0VjBNZXRhIGlzIGZhbHNlXG4gICAgY29uc3QgbGljZW5zZVVybCA9IHNjaGVtYU1ldGEubGljZW5zZVVybDtcbiAgICBjb25zdCBhY2NlcHRMaWNlbnNlVXJsc1NldCA9IG5ldyBTZXQodGhpcy5hY2NlcHRMaWNlbnNlVXJscyk7XG4gICAgaWYgKCFhY2NlcHRMaWNlbnNlVXJsc1NldC5oYXMobGljZW5zZVVybCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVlJNTWV0YUxvYWRlclBsdWdpbjogVGhlIGxpY2Vuc2UgdXJsIFwiJHtsaWNlbnNlVXJsfVwiIGlzIG5vdCBhY2NlcHRlZGApO1xuICAgIH1cblxuICAgIGxldCB0aHVtYm5haWxJbWFnZTogSFRNTEltYWdlRWxlbWVudCB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgICBpZiAodGhpcy5uZWVkVGh1bWJuYWlsSW1hZ2UgJiYgc2NoZW1hTWV0YS50aHVtYm5haWxJbWFnZSAhPSBudWxsKSB7XG4gICAgICB0aHVtYm5haWxJbWFnZSA9IChhd2FpdCB0aGlzLl9leHRyYWN0R0xURkltYWdlKHNjaGVtYU1ldGEudGh1bWJuYWlsSW1hZ2UpKSA/PyB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIG1ldGFWZXJzaW9uOiAnMScsXG4gICAgICBuYW1lOiBzY2hlbWFNZXRhLm5hbWUsXG4gICAgICB2ZXJzaW9uOiBzY2hlbWFNZXRhLnZlcnNpb24sXG4gICAgICBhdXRob3JzOiBzY2hlbWFNZXRhLmF1dGhvcnMsXG4gICAgICBjb3B5cmlnaHRJbmZvcm1hdGlvbjogc2NoZW1hTWV0YS5jb3B5cmlnaHRJbmZvcm1hdGlvbixcbiAgICAgIGNvbnRhY3RJbmZvcm1hdGlvbjogc2NoZW1hTWV0YS5jb250YWN0SW5mb3JtYXRpb24sXG4gICAgICByZWZlcmVuY2VzOiBzY2hlbWFNZXRhLnJlZmVyZW5jZXMsXG4gICAgICB0aGlyZFBhcnR5TGljZW5zZXM6IHNjaGVtYU1ldGEudGhpcmRQYXJ0eUxpY2Vuc2VzLFxuICAgICAgdGh1bWJuYWlsSW1hZ2UsXG4gICAgICBsaWNlbnNlVXJsOiBzY2hlbWFNZXRhLmxpY2Vuc2VVcmwsXG4gICAgICBhdmF0YXJQZXJtaXNzaW9uOiBzY2hlbWFNZXRhLmF2YXRhclBlcm1pc3Npb24sXG4gICAgICBhbGxvd0V4Y2Vzc2l2ZWx5VmlvbGVudFVzYWdlOiBzY2hlbWFNZXRhLmFsbG93RXhjZXNzaXZlbHlWaW9sZW50VXNhZ2UsXG4gICAgICBhbGxvd0V4Y2Vzc2l2ZWx5U2V4dWFsVXNhZ2U6IHNjaGVtYU1ldGEuYWxsb3dFeGNlc3NpdmVseVNleHVhbFVzYWdlLFxuICAgICAgY29tbWVyY2lhbFVzYWdlOiBzY2hlbWFNZXRhLmNvbW1lcmNpYWxVc2FnZSxcbiAgICAgIGFsbG93UG9saXRpY2FsT3JSZWxpZ2lvdXNVc2FnZTogc2NoZW1hTWV0YS5hbGxvd1BvbGl0aWNhbE9yUmVsaWdpb3VzVXNhZ2UsXG4gICAgICBhbGxvd0FudGlzb2NpYWxPckhhdGVVc2FnZTogc2NoZW1hTWV0YS5hbGxvd0FudGlzb2NpYWxPckhhdGVVc2FnZSxcbiAgICAgIGNyZWRpdE5vdGF0aW9uOiBzY2hlbWFNZXRhLmNyZWRpdE5vdGF0aW9uLFxuICAgICAgYWxsb3dSZWRpc3RyaWJ1dGlvbjogc2NoZW1hTWV0YS5hbGxvd1JlZGlzdHJpYnV0aW9uLFxuICAgICAgbW9kaWZpY2F0aW9uOiBzY2hlbWFNZXRhLm1vZGlmaWNhdGlvbixcbiAgICAgIG90aGVyTGljZW5zZVVybDogc2NoZW1hTWV0YS5vdGhlckxpY2Vuc2VVcmwsXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX3YwSW1wb3J0KGdsdGY6IEdMVEYpOiBQcm9taXNlPFZSTTBNZXRhIHwgbnVsbD4ge1xuICAgIGNvbnN0IGpzb24gPSB0aGlzLnBhcnNlci5qc29uIGFzIEdMVEZTY2hlbWEuSUdMVEY7XG5cbiAgICAvLyBlYXJseSBhYm9ydCBpZiBpdCBkb2Vzbid0IHVzZSB2cm1cbiAgICBjb25zdCB2cm1FeHQgPSBqc29uLmV4dGVuc2lvbnM/LlZSTSBhcyBWMFZSTS5WUk0gfCB1bmRlZmluZWQ7XG4gICAgaWYgKCF2cm1FeHQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNjaGVtYU1ldGEgPSB2cm1FeHQubWV0YTtcbiAgICBpZiAoIXNjaGVtYU1ldGEpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIHRocm93IGFuIGVycm9yIGlmIGFjY2VwdFYwTWV0YSBpcyBmYWxzZVxuICAgIGlmICghdGhpcy5hY2NlcHRWME1ldGEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVlJNTWV0YUxvYWRlclBsdWdpbjogQXR0ZW1wdGVkIHRvIGxvYWQgVlJNMC4wIG1ldGEgYnV0IGFjY2VwdFYwTWV0YSBpcyBmYWxzZScpO1xuICAgIH1cblxuICAgIC8vIGxvYWQgdGh1bWJuYWlsIHRleHR1cmVcbiAgICBsZXQgdGV4dHVyZTogVEhSRUUuVGV4dHVyZSB8IG51bGwgfCB1bmRlZmluZWQ7XG4gICAgaWYgKHRoaXMubmVlZFRodW1ibmFpbEltYWdlICYmIHNjaGVtYU1ldGEudGV4dHVyZSAhPSBudWxsICYmIHNjaGVtYU1ldGEudGV4dHVyZSAhPT0gLTEpIHtcbiAgICAgIHRleHR1cmUgPSBhd2FpdCB0aGlzLnBhcnNlci5nZXREZXBlbmRlbmN5KCd0ZXh0dXJlJywgc2NoZW1hTWV0YS50ZXh0dXJlKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgbWV0YVZlcnNpb246ICcwJyxcbiAgICAgIGFsbG93ZWRVc2VyTmFtZTogc2NoZW1hTWV0YS5hbGxvd2VkVXNlck5hbWUsXG4gICAgICBhdXRob3I6IHNjaGVtYU1ldGEuYXV0aG9yLFxuICAgICAgY29tbWVyY2lhbFVzc2FnZU5hbWU6IHNjaGVtYU1ldGEuY29tbWVyY2lhbFVzc2FnZU5hbWUsXG4gICAgICBjb250YWN0SW5mb3JtYXRpb246IHNjaGVtYU1ldGEuY29udGFjdEluZm9ybWF0aW9uLFxuICAgICAgbGljZW5zZU5hbWU6IHNjaGVtYU1ldGEubGljZW5zZU5hbWUsXG4gICAgICBvdGhlckxpY2Vuc2VVcmw6IHNjaGVtYU1ldGEub3RoZXJMaWNlbnNlVXJsLFxuICAgICAgb3RoZXJQZXJtaXNzaW9uVXJsOiBzY2hlbWFNZXRhLm90aGVyUGVybWlzc2lvblVybCxcbiAgICAgIHJlZmVyZW5jZTogc2NoZW1hTWV0YS5yZWZlcmVuY2UsXG4gICAgICBzZXh1YWxVc3NhZ2VOYW1lOiBzY2hlbWFNZXRhLnNleHVhbFVzc2FnZU5hbWUsXG4gICAgICB0ZXh0dXJlOiB0ZXh0dXJlID8/IHVuZGVmaW5lZCxcbiAgICAgIHRpdGxlOiBzY2hlbWFNZXRhLnRpdGxlLFxuICAgICAgdmVyc2lvbjogc2NoZW1hTWV0YS52ZXJzaW9uLFxuICAgICAgdmlvbGVudFVzc2FnZU5hbWU6IHNjaGVtYU1ldGEudmlvbGVudFVzc2FnZU5hbWUsXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX2V4dHJhY3RHTFRGSW1hZ2UoaW5kZXg6IG51bWJlcik6IFByb21pc2U8SFRNTEltYWdlRWxlbWVudCB8IG51bGw+IHtcbiAgICBjb25zdCBqc29uID0gdGhpcy5wYXJzZXIuanNvbiBhcyBHTFRGU2NoZW1hLklHTFRGO1xuXG4gICAgY29uc3Qgc291cmNlID0ganNvbi5pbWFnZXM/LltpbmRleF07XG5cbiAgICBpZiAoc291cmNlID09IG51bGwpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgYFZSTU1ldGFMb2FkZXJQbHVnaW46IEF0dGVtcHQgdG8gdXNlIGltYWdlc1ske2luZGV4fV0gb2YgZ2xURiBhcyBhIHRodW1ibmFpbCBidXQgdGhlIGltYWdlIGRvZXNuJ3QgZXhpc3RgLFxuICAgICAgKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIFJlZjogaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9ibG9iL3IxMjQvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlci5qcyNMMjQ2N1xuXG4gICAgLy8gYHNvdXJjZS51cmlgIG1pZ2h0IGJlIGEgcmVmZXJlbmNlIHRvIGEgZmlsZVxuICAgIGxldCBzb3VyY2VVUkk6IHN0cmluZyB8IHVuZGVmaW5lZCA9IHNvdXJjZS51cmk7XG5cbiAgICAvLyBMb2FkIHRoZSBiaW5hcnkgYXMgYSBibG9iXG4gICAgaWYgKHNvdXJjZS5idWZmZXJWaWV3ICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGJ1ZmZlclZpZXcgPSBhd2FpdCB0aGlzLnBhcnNlci5nZXREZXBlbmRlbmN5KCdidWZmZXJWaWV3Jywgc291cmNlLmJ1ZmZlclZpZXcpO1xuICAgICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtidWZmZXJWaWV3XSwgeyB0eXBlOiBzb3VyY2UubWltZVR5cGUgfSk7XG4gICAgICBzb3VyY2VVUkkgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgIH1cblxuICAgIGlmIChzb3VyY2VVUkkgPT0gbnVsbCkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBgVlJNTWV0YUxvYWRlclBsdWdpbjogQXR0ZW1wdCB0byB1c2UgaW1hZ2VzWyR7aW5kZXh9XSBvZiBnbFRGIGFzIGEgdGh1bWJuYWlsIGJ1dCB0aGUgaW1hZ2UgY291bGRuJ3QgbG9hZCBwcm9wZXJseWAsXG4gICAgICApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgbG9hZGVyID0gbmV3IFRIUkVFLkltYWdlTG9hZGVyKCk7XG4gICAgcmV0dXJuIGF3YWl0IGxvYWRlci5sb2FkQXN5bmMocmVzb2x2ZVVSTChzb3VyY2VVUkksICh0aGlzLnBhcnNlciBhcyBhbnkpLm9wdGlvbnMucGF0aCkpLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICBjb25zb2xlLndhcm4oJ1ZSTU1ldGFMb2FkZXJQbHVnaW46IEZhaWxlZCB0byBsb2FkIGEgdGh1bWJuYWlsIGltYWdlJyk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9KTtcbiAgfVxufVxuIiwgIi8qKlxuICogWW9pbmtlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvYmxvYi9tYXN0ZXIvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlci5qc1xuICovXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZVVSTCh1cmw6IHN0cmluZywgcGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgLy8gSW52YWxpZCBVUkxcbiAgaWYgKHR5cGVvZiB1cmwgIT09ICdzdHJpbmcnIHx8IHVybCA9PT0gJycpIHJldHVybiAnJztcblxuICAvLyBIb3N0IFJlbGF0aXZlIFVSTFxuICBpZiAoL15odHRwcz86XFwvXFwvL2kudGVzdChwYXRoKSAmJiAvXlxcLy8udGVzdCh1cmwpKSB7XG4gICAgcGF0aCA9IHBhdGgucmVwbGFjZSgvKF5odHRwcz86XFwvXFwvW14vXSspLiovaSwgJyQxJyk7XG4gIH1cblxuICAvLyBBYnNvbHV0ZSBVUkwgaHR0cDovLyxodHRwczovLywvL1xuICBpZiAoL14oaHR0cHM/Oik/XFwvXFwvL2kudGVzdCh1cmwpKSByZXR1cm4gdXJsO1xuXG4gIC8vIERhdGEgVVJJXG4gIGlmICgvXmRhdGE6LiosLiokL2kudGVzdCh1cmwpKSByZXR1cm4gdXJsO1xuXG4gIC8vIEJsb2IgVVJMXG4gIGlmICgvXmJsb2I6LiokL2kudGVzdCh1cmwpKSByZXR1cm4gdXJsO1xuXG4gIC8vIFJlbGF0aXZlIFVSTFxuICByZXR1cm4gcGF0aCArIHVybDtcbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1FeHByZXNzaW9uTWFuYWdlciB9IGZyb20gJy4vZXhwcmVzc2lvbnMvVlJNRXhwcmVzc2lvbk1hbmFnZXInO1xuaW1wb3J0IHsgVlJNRmlyc3RQZXJzb24gfSBmcm9tICcuL2ZpcnN0UGVyc29uL1ZSTUZpcnN0UGVyc29uJztcbmltcG9ydCB7IFZSTUh1bWFub2lkIH0gZnJvbSAnLi9odW1hbm9pZC9WUk1IdW1hbm9pZCc7XG5pbXBvcnQgeyBWUk1Mb29rQXQgfSBmcm9tICcuL2xvb2tBdC9WUk1Mb29rQXQnO1xuaW1wb3J0IHsgVlJNTWV0YSB9IGZyb20gJy4vbWV0YS9WUk1NZXRhJztcbmltcG9ydCB7IFZSTUNvcmVQYXJhbWV0ZXJzIH0gZnJvbSAnLi9WUk1Db3JlUGFyYW1ldGVycyc7XG5cbi8qKlxuICogQSBjbGFzcyB0aGF0IHJlcHJlc2VudHMgYSBzaW5nbGUgVlJNIG1vZGVsLlxuICogVGhpcyBjbGFzcyBvbmx5IGluY2x1ZGVzIGNvcmUgc3BlYyBvZiB0aGUgVlJNIChgVlJNQ192cm1gKS5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUNvcmUge1xuICAvKipcbiAgICogYFRIUkVFLkdyb3VwYCB0aGF0IGNvbnRhaW5zIHRoZSBlbnRpcmUgVlJNLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IHNjZW5lOiBUSFJFRS5Hcm91cDtcblxuICAvKipcbiAgICogQ29udGFpbnMgbWV0YSBmaWVsZHMgb2YgdGhlIFZSTS5cbiAgICogWW91IG1pZ2h0IHdhbnQgdG8gcmVmZXIgdGhlc2UgbGljZW5zZSBmaWVsZHMgYmVmb3JlIHVzZSB5b3VyIFZSTXMuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgbWV0YTogVlJNTWV0YTtcblxuICAvKipcbiAgICogQ29udGFpbnMge0BsaW5rIFZSTUh1bWFub2lkfSBvZiB0aGUgVlJNLlxuICAgKiBZb3UgY2FuIGNvbnRyb2wgZWFjaCBib25lcyB1c2luZyB7QGxpbmsgVlJNSHVtYW5vaWQuZ2V0Tm9ybWFsaXplZEJvbmVOb2RlfSBvciB7QGxpbmsgVlJNSHVtYW5vaWQuZ2V0UmF3Qm9uZU5vZGV9LlxuICAgKlxuICAgKiBAVE9ETyBBZGQgYSBsaW5rIHRvIFZSTSBzcGVjXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgaHVtYW5vaWQ6IFZSTUh1bWFub2lkO1xuXG4gIC8qKlxuICAgKiBDb250YWlucyB7QGxpbmsgVlJNRXhwcmVzc2lvbk1hbmFnZXJ9IG9mIHRoZSBWUk0uXG4gICAqIFlvdSBtaWdodCB3YW50IHRvIGNvbnRyb2wgdGhlc2UgZmFjaWFsIGV4cHJlc3Npb25zIHZpYSB7QGxpbmsgVlJNRXhwcmVzc2lvbk1hbmFnZXIuc2V0VmFsdWV9LlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGV4cHJlc3Npb25NYW5hZ2VyPzogVlJNRXhwcmVzc2lvbk1hbmFnZXI7XG5cbiAgLyoqXG4gICAqIENvbnRhaW5zIHtAbGluayBWUk1GaXJzdFBlcnNvbn0gb2YgdGhlIFZSTS5cbiAgICogVlJNRmlyc3RQZXJzb24gaXMgbW9zdGx5IHVzZWQgZm9yIG1lc2ggY3VsbGluZyBmb3IgZmlyc3QgcGVyc29uIHZpZXcuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgZmlyc3RQZXJzb24/OiBWUk1GaXJzdFBlcnNvbjtcblxuICAvKipcbiAgICogQ29udGFpbnMge0BsaW5rIFZSTUxvb2tBdH0gb2YgdGhlIFZSTS5cbiAgICogWW91IG1pZ2h0IHdhbnQgdG8gdXNlIHtAbGluayBWUk1Mb29rQXQudGFyZ2V0fSB0byBjb250cm9sIHRoZSBleWUgZGlyZWN0aW9uIG9mIHlvdXIgVlJNcy5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBsb29rQXQ/OiBWUk1Mb29rQXQ7XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBWUk0gaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSBwYXJhbXMgW1tWUk1QYXJhbWV0ZXJzXV0gdGhhdCByZXByZXNlbnRzIGNvbXBvbmVudHMgb2YgdGhlIFZSTVxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBhcmFtczogVlJNQ29yZVBhcmFtZXRlcnMpIHtcbiAgICB0aGlzLnNjZW5lID0gcGFyYW1zLnNjZW5lO1xuICAgIHRoaXMubWV0YSA9IHBhcmFtcy5tZXRhO1xuICAgIHRoaXMuaHVtYW5vaWQgPSBwYXJhbXMuaHVtYW5vaWQ7XG4gICAgdGhpcy5leHByZXNzaW9uTWFuYWdlciA9IHBhcmFtcy5leHByZXNzaW9uTWFuYWdlcjtcbiAgICB0aGlzLmZpcnN0UGVyc29uID0gcGFyYW1zLmZpcnN0UGVyc29uO1xuICAgIHRoaXMubG9va0F0ID0gcGFyYW1zLmxvb2tBdDtcbiAgfVxuXG4gIC8qKlxuICAgKiAqKllvdSBuZWVkIHRvIGNhbGwgdGhpcyBvbiB5b3VyIHVwZGF0ZSBsb29wLioqXG4gICAqXG4gICAqIFRoaXMgZnVuY3Rpb24gdXBkYXRlcyBldmVyeSBWUk0gY29tcG9uZW50cy5cbiAgICpcbiAgICogQHBhcmFtIGRlbHRhIGRlbHRhVGltZVxuICAgKi9cbiAgcHVibGljIHVwZGF0ZShkZWx0YTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5odW1hbm9pZC51cGRhdGUoKTtcblxuICAgIGlmICh0aGlzLmxvb2tBdCkge1xuICAgICAgdGhpcy5sb29rQXQudXBkYXRlKGRlbHRhKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5leHByZXNzaW9uTWFuYWdlcikge1xuICAgICAgdGhpcy5leHByZXNzaW9uTWFuYWdlci51cGRhdGUoKTtcbiAgICB9XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBHTFRGLCBHTFRGTG9hZGVyUGx1Z2luLCBHTFRGUGFyc2VyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlci5qcyc7XG5pbXBvcnQgeyBWUk1Db3JlTG9hZGVyUGx1Z2luT3B0aW9ucyB9IGZyb20gJy4vVlJNQ29yZUxvYWRlclBsdWdpbk9wdGlvbnMnO1xuaW1wb3J0IHsgVlJNQ29yZSB9IGZyb20gJy4vVlJNQ29yZSc7XG5pbXBvcnQgeyBWUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luIH0gZnJvbSAnLi9leHByZXNzaW9ucy9WUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luJztcbmltcG9ydCB7IFZSTUZpcnN0UGVyc29uTG9hZGVyUGx1Z2luIH0gZnJvbSAnLi9maXJzdFBlcnNvbi9WUk1GaXJzdFBlcnNvbkxvYWRlclBsdWdpbic7XG5pbXBvcnQgeyBWUk1IdW1hbm9pZExvYWRlclBsdWdpbiB9IGZyb20gJy4vaHVtYW5vaWQvVlJNSHVtYW5vaWRMb2FkZXJQbHVnaW4nO1xuaW1wb3J0IHsgVlJNTWV0YUxvYWRlclBsdWdpbiB9IGZyb20gJy4vbWV0YS9WUk1NZXRhTG9hZGVyUGx1Z2luJztcbmltcG9ydCB7IFZSTUxvb2tBdExvYWRlclBsdWdpbiB9IGZyb20gJy4vbG9va0F0L1ZSTUxvb2tBdExvYWRlclBsdWdpbic7XG5pbXBvcnQgdHlwZSB7IFZSTUh1bWFub2lkIH0gZnJvbSAnLi9odW1hbm9pZCc7XG5pbXBvcnQgdHlwZSB7IFZSTU1ldGEgfSBmcm9tICcuL21ldGEnO1xuXG5leHBvcnQgY2xhc3MgVlJNQ29yZUxvYWRlclBsdWdpbiBpbXBsZW1lbnRzIEdMVEZMb2FkZXJQbHVnaW4ge1xuICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICAvLyBXZSBzaG91bGQgdXNlIHRoZSBleHRlbnNpb24gbmFtZSBpbnN0ZWFkIGJ1dCB3ZSBoYXZlIG11bHRpcGxlIHBsdWdpbnMgZm9yIGFuIGV4dGVuc2lvbi4uLlxuICAgIHJldHVybiAnVlJNQ192cm0nO1xuICB9XG5cbiAgcHVibGljIHJlYWRvbmx5IHBhcnNlcjogR0xURlBhcnNlcjtcblxuICBwdWJsaWMgcmVhZG9ubHkgZXhwcmVzc2lvblBsdWdpbjogVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbjtcbiAgcHVibGljIHJlYWRvbmx5IGZpcnN0UGVyc29uUGx1Z2luOiBWUk1GaXJzdFBlcnNvbkxvYWRlclBsdWdpbjtcbiAgcHVibGljIHJlYWRvbmx5IGh1bWFub2lkUGx1Z2luOiBWUk1IdW1hbm9pZExvYWRlclBsdWdpbjtcbiAgcHVibGljIHJlYWRvbmx5IGxvb2tBdFBsdWdpbjogVlJNTG9va0F0TG9hZGVyUGx1Z2luO1xuICBwdWJsaWMgcmVhZG9ubHkgbWV0YVBsdWdpbjogVlJNTWV0YUxvYWRlclBsdWdpbjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IocGFyc2VyOiBHTFRGUGFyc2VyLCBvcHRpb25zPzogVlJNQ29yZUxvYWRlclBsdWdpbk9wdGlvbnMpIHtcbiAgICB0aGlzLnBhcnNlciA9IHBhcnNlcjtcblxuICAgIGNvbnN0IGhlbHBlclJvb3QgPSBvcHRpb25zPy5oZWxwZXJSb290O1xuICAgIGNvbnN0IGF1dG9VcGRhdGVIdW1hbkJvbmVzID0gb3B0aW9ucz8uYXV0b1VwZGF0ZUh1bWFuQm9uZXM7XG5cbiAgICB0aGlzLmV4cHJlc3Npb25QbHVnaW4gPSBvcHRpb25zPy5leHByZXNzaW9uUGx1Z2luID8/IG5ldyBWUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luKHBhcnNlcik7XG4gICAgdGhpcy5maXJzdFBlcnNvblBsdWdpbiA9IG9wdGlvbnM/LmZpcnN0UGVyc29uUGx1Z2luID8/IG5ldyBWUk1GaXJzdFBlcnNvbkxvYWRlclBsdWdpbihwYXJzZXIpO1xuICAgIHRoaXMuaHVtYW5vaWRQbHVnaW4gPVxuICAgICAgb3B0aW9ucz8uaHVtYW5vaWRQbHVnaW4gPz8gbmV3IFZSTUh1bWFub2lkTG9hZGVyUGx1Z2luKHBhcnNlciwgeyBoZWxwZXJSb290LCBhdXRvVXBkYXRlSHVtYW5Cb25lcyB9KTtcbiAgICB0aGlzLmxvb2tBdFBsdWdpbiA9IG9wdGlvbnM/Lmxvb2tBdFBsdWdpbiA/PyBuZXcgVlJNTG9va0F0TG9hZGVyUGx1Z2luKHBhcnNlciwgeyBoZWxwZXJSb290IH0pO1xuICAgIHRoaXMubWV0YVBsdWdpbiA9IG9wdGlvbnM/Lm1ldGFQbHVnaW4gPz8gbmV3IFZSTU1ldGFMb2FkZXJQbHVnaW4ocGFyc2VyKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBhZnRlclJvb3QoZ2x0ZjogR0xURik6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMubWV0YVBsdWdpbi5hZnRlclJvb3QoZ2x0Zik7XG4gICAgYXdhaXQgdGhpcy5odW1hbm9pZFBsdWdpbi5hZnRlclJvb3QoZ2x0Zik7XG4gICAgYXdhaXQgdGhpcy5leHByZXNzaW9uUGx1Z2luLmFmdGVyUm9vdChnbHRmKTtcbiAgICBhd2FpdCB0aGlzLmxvb2tBdFBsdWdpbi5hZnRlclJvb3QoZ2x0Zik7XG4gICAgYXdhaXQgdGhpcy5maXJzdFBlcnNvblBsdWdpbi5hZnRlclJvb3QoZ2x0Zik7XG5cbiAgICBjb25zdCBtZXRhID0gZ2x0Zi51c2VyRGF0YS52cm1NZXRhIGFzIFZSTU1ldGEgfCBudWxsO1xuICAgIGNvbnN0IGh1bWFub2lkID0gZ2x0Zi51c2VyRGF0YS52cm1IdW1hbm9pZCBhcyBWUk1IdW1hbm9pZCB8IG51bGw7XG5cbiAgICAvLyBtZXRhIGFuZCBodW1hbm9pZCBhcmUgcmVxdWlyZWQgdG8gYmUgYSBWUk0uXG4gICAgLy8gRG9uJ3QgY3JlYXRlIFZSTSBpZiB0aGV5IGFyZSBudWxsXG4gICAgaWYgKG1ldGEgJiYgaHVtYW5vaWQpIHtcbiAgICAgIGNvbnN0IHZybUNvcmUgPSBuZXcgVlJNQ29yZSh7XG4gICAgICAgIHNjZW5lOiBnbHRmLnNjZW5lLFxuICAgICAgICBleHByZXNzaW9uTWFuYWdlcjogZ2x0Zi51c2VyRGF0YS52cm1FeHByZXNzaW9uTWFuYWdlcixcbiAgICAgICAgZmlyc3RQZXJzb246IGdsdGYudXNlckRhdGEudnJtRmlyc3RQZXJzb24sXG4gICAgICAgIGh1bWFub2lkLFxuICAgICAgICBsb29rQXQ6IGdsdGYudXNlckRhdGEudnJtTG9va0F0LFxuICAgICAgICBtZXRhLFxuICAgICAgfSk7XG5cbiAgICAgIGdsdGYudXNlckRhdGEudnJtQ29yZSA9IHZybUNvcmU7XG4gICAgfVxuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNQ29yZSB9IGZyb20gJ0BwaXhpdi90aHJlZS12cm0tY29yZSc7XG5pbXBvcnQgeyBWUk1Ob2RlQ29uc3RyYWludE1hbmFnZXIgfSBmcm9tICdAcGl4aXYvdGhyZWUtdnJtLW5vZGUtY29uc3RyYWludCc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lTWFuYWdlciB9IGZyb20gJ0BwaXhpdi90aHJlZS12cm0tc3ByaW5nYm9uZSc7XG5pbXBvcnQgeyBWUk1QYXJhbWV0ZXJzIH0gZnJvbSAnLi9WUk1QYXJhbWV0ZXJzJztcblxuLyoqXG4gKiBBIGNsYXNzIHRoYXQgcmVwcmVzZW50cyBhIHNpbmdsZSBWUk0gbW9kZWwuXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk0gZXh0ZW5kcyBWUk1Db3JlIHtcbiAgLyoqXG4gICAqIENvbnRhaW5zIG1hdGVyaWFscyBvZiB0aGUgVlJNLlxuICAgKiBgdXBkYXRlYCBtZXRob2Qgb2YgdGhlc2UgbWF0ZXJpYWxzIHdpbGwgYmUgY2FsbGVkIHZpYSBpdHMge0BsaW5rIFZSTS51cGRhdGV9IG1ldGhvZC5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBtYXRlcmlhbHM/OiBUSFJFRS5NYXRlcmlhbFtdO1xuXG4gIC8qKlxuICAgKiBBIHtAbGluayBWUk1TcHJpbmdCb25lTWFuYWdlcn0gbWFuaXB1bGF0ZXMgYWxsIHNwcmluZyBib25lcyBhdHRhY2hlZCBvbiB0aGUgVlJNLlxuICAgKiBVc3VhbGx5IHlvdSBkb24ndCBoYXZlIHRvIGNhcmUgYWJvdXQgdGhpcyBwcm9wZXJ0eS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBzcHJpbmdCb25lTWFuYWdlcj86IFZSTVNwcmluZ0JvbmVNYW5hZ2VyO1xuXG4gIC8qKlxuICAgKiBBIHtAbGluayBWUk1Ob2RlQ29uc3RyYWludE1hbmFnZXJ9IG1hbmlwdWxhdGVzIGFsbCBjb25zdHJhaW50cyBhdHRhY2hlZCBvbiB0aGUgVlJNLlxuICAgKiBVc3VhbGx5IHlvdSBkb24ndCBoYXZlIHRvIGNhcmUgYWJvdXQgdGhpcyBwcm9wZXJ0eS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBub2RlQ29uc3RyYWludE1hbmFnZXI/OiBWUk1Ob2RlQ29uc3RyYWludE1hbmFnZXI7XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBWUk0gaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSBwYXJhbXMgW1tWUk1QYXJhbWV0ZXJzXV0gdGhhdCByZXByZXNlbnRzIGNvbXBvbmVudHMgb2YgdGhlIFZSTVxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBhcmFtczogVlJNUGFyYW1ldGVycykge1xuICAgIHN1cGVyKHBhcmFtcyk7XG5cbiAgICB0aGlzLm1hdGVyaWFscyA9IHBhcmFtcy5tYXRlcmlhbHM7XG4gICAgdGhpcy5zcHJpbmdCb25lTWFuYWdlciA9IHBhcmFtcy5zcHJpbmdCb25lTWFuYWdlcjtcbiAgICB0aGlzLm5vZGVDb25zdHJhaW50TWFuYWdlciA9IHBhcmFtcy5ub2RlQ29uc3RyYWludE1hbmFnZXI7XG4gIH1cblxuICAvKipcbiAgICogKipZb3UgbmVlZCB0byBjYWxsIHRoaXMgb24geW91ciB1cGRhdGUgbG9vcC4qKlxuICAgKlxuICAgKiBUaGlzIGZ1bmN0aW9uIHVwZGF0ZXMgZXZlcnkgVlJNIGNvbXBvbmVudHMuXG4gICAqXG4gICAqIEBwYXJhbSBkZWx0YSBkZWx0YVRpbWVcbiAgICovXG4gIHB1YmxpYyB1cGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQge1xuICAgIHN1cGVyLnVwZGF0ZShkZWx0YSk7XG5cbiAgICBpZiAodGhpcy5ub2RlQ29uc3RyYWludE1hbmFnZXIpIHtcbiAgICAgIHRoaXMubm9kZUNvbnN0cmFpbnRNYW5hZ2VyLnVwZGF0ZSgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnNwcmluZ0JvbmVNYW5hZ2VyKSB7XG4gICAgICB0aGlzLnNwcmluZ0JvbmVNYW5hZ2VyLnVwZGF0ZShkZWx0YSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubWF0ZXJpYWxzKSB7XG4gICAgICB0aGlzLm1hdGVyaWFscy5mb3JFYWNoKChtYXRlcmlhbDogYW55KSA9PiB7XG4gICAgICAgIGlmIChtYXRlcmlhbC51cGRhdGUpIHtcbiAgICAgICAgICBtYXRlcmlhbC51cGRhdGUoZGVsdGEpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgKiBhcyBWMU1Ub29uU2NoZW1hIGZyb20gJ0BwaXhpdi90eXBlcy12cm1jLW1hdGVyaWFscy1tdG9vbi0xLjAnO1xuaW1wb3J0IHR5cGUgeyBHTFRGLCBHTFRGTG9hZGVyLCBHTFRGTG9hZGVyUGx1Z2luLCBHTFRGUGFyc2VyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlci5qcyc7XG5pbXBvcnQgdHlwZSB7IE1Ub29uTWF0ZXJpYWxQYXJhbWV0ZXJzIH0gZnJvbSAnLi9NVG9vbk1hdGVyaWFsUGFyYW1ldGVycyc7XG5pbXBvcnQgdHlwZSB7IE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlIH0gZnJvbSAnLi9NVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZSc7XG5pbXBvcnQgeyBHTFRGTVRvb25NYXRlcmlhbFBhcmFtc0Fzc2lnbkhlbHBlciB9IGZyb20gJy4vR0xURk1Ub29uTWF0ZXJpYWxQYXJhbXNBc3NpZ25IZWxwZXInO1xuaW1wb3J0IHR5cGUgeyBNVG9vbk1hdGVyaWFsTG9hZGVyUGx1Z2luT3B0aW9ucyB9IGZyb20gJy4vTVRvb25NYXRlcmlhbExvYWRlclBsdWdpbk9wdGlvbnMnO1xuaW1wb3J0IHR5cGUgeyBNVG9vbk1hdGVyaWFsRGVidWdNb2RlIH0gZnJvbSAnLi9NVG9vbk1hdGVyaWFsRGVidWdNb2RlJztcbmltcG9ydCB7IEdMVEYgYXMgR0xURlNjaGVtYSB9IGZyb20gJ0BnbHRmLXRyYW5zZm9ybS9jb3JlJztcbmltcG9ydCB7IE1Ub29uTWF0ZXJpYWwgfSBmcm9tICcuL01Ub29uTWF0ZXJpYWwnO1xuaW1wb3J0IHR5cGUgeyBNVG9vbk5vZGVNYXRlcmlhbCB9IGZyb20gJy4vbm9kZXMvTVRvb25Ob2RlTWF0ZXJpYWwnO1xuXG4vKipcbiAqIFBvc3NpYmxlIHNwZWMgdmVyc2lvbnMgaXQgcmVjb2duaXplcy5cbiAqL1xuY29uc3QgUE9TU0lCTEVfU1BFQ19WRVJTSU9OUyA9IG5ldyBTZXQoWycxLjAnLCAnMS4wLWJldGEnXSk7XG5cbi8qKlxuICogQSBsb2FkZXIgcGx1Z2luIG9mIHtAbGluayBHTFRGTG9hZGVyfSBmb3IgdGhlIGV4dGVuc2lvbiBgVlJNQ19tYXRlcmlhbHNfbXRvb25gLlxuICpcbiAqIFRoaXMgcGx1Z2luIGlzIGZvciB1c2VzIHdpdGggV2ViR0xSZW5kZXJlciBieSBkZWZhdWx0LlxuICogVG8gdXNlIE1Ub29uIGluIFdlYkdQVVJlbmRlcmVyLCBzZXQge0BsaW5rIG1hdGVyaWFsVHlwZX0gdG8ge0BsaW5rIE1Ub29uTm9kZU1hdGVyaWFsfS5cbiAqXG4gKiBAZXhhbXBsZSB0byB1c2Ugd2l0aCBXZWJHUFVSZW5kZXJlclxuICogYGBganNcbiAqIGltcG9ydCB7IE1Ub29uTWF0ZXJpYWxMb2FkZXJQbHVnaW4gfSBmcm9tICdAcGl4aXYvdGhyZWUtdnJtLW1hdGVyaWFscy1tdG9vbic7XG4gKiBpbXBvcnQgeyBNVG9vbk5vZGVNYXRlcmlhbCB9IGZyb20gJ0BwaXhpdi90aHJlZS12cm0tbWF0ZXJpYWxzLW10b29uL25vZGVzJztcbiAqXG4gKiAvLyAuLi5cbiAqXG4gKiAvLyBSZWdpc3RlciBhIE1Ub29uTWF0ZXJpYWxMb2FkZXJQbHVnaW4gd2l0aCBNVG9vbk5vZGVNYXRlcmlhbFxuICogbG9hZGVyLnJlZ2lzdGVyKChwYXJzZXIpID0+IHtcbiAqXG4gKiAgIC8vIGNyZWF0ZSBhIFdlYkdQVSBjb21wYXRpYmxlIE1Ub29uTWF0ZXJpYWxMb2FkZXJQbHVnaW5cbiAqICAgcmV0dXJuIG5ldyBNVG9vbk1hdGVyaWFsTG9hZGVyUGx1Z2luKHBhcnNlciwge1xuICpcbiAqICAgICAvLyBzZXQgdGhlIG1hdGVyaWFsIHR5cGUgdG8gTVRvb25Ob2RlTWF0ZXJpYWxcbiAqICAgICBtYXRlcmlhbFR5cGU6IE1Ub29uTm9kZU1hdGVyaWFsLFxuICpcbiAqICAgfSk7XG4gKlxuICogfSk7XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGNsYXNzIE1Ub29uTWF0ZXJpYWxMb2FkZXJQbHVnaW4gaW1wbGVtZW50cyBHTFRGTG9hZGVyUGx1Z2luIHtcbiAgcHVibGljIHN0YXRpYyBFWFRFTlNJT05fTkFNRSA9ICdWUk1DX21hdGVyaWFsc19tdG9vbic7XG5cbiAgLyoqXG4gICAqIFRoZSB0eXBlIG9mIHRoZSBtYXRlcmlhbCB0aGF0IHRoaXMgcGx1Z2luIHdpbGwgZ2VuZXJhdGUuXG4gICAqXG4gICAqIElmIHlvdSBhcmUgdXNpbmcgdGhpcyBwbHVnaW4gd2l0aCBXZWJHUFUsIHNldCB0aGlzIHRvIHtAbGluayBNVG9vbk5vZGVNYXRlcmlhbH0uXG4gICAqXG4gICAqIEBkZWZhdWx0IE1Ub29uTWF0ZXJpYWxcbiAgICovXG4gIHB1YmxpYyBtYXRlcmlhbFR5cGU6IHR5cGVvZiBUSFJFRS5NYXRlcmlhbDtcblxuICAvKipcbiAgICogVGhpcyB2YWx1ZSB3aWxsIGJlIGFkZGVkIHRvIGByZW5kZXJPcmRlcmAgb2YgZXZlcnkgbWVzaGVzIHdobyBoYXZlIE1hdGVyaWFsc01Ub29uLlxuICAgKiBUaGUgZmluYWwgcmVuZGVyT3JkZXIgd2lsbCBiZSBzdW0gb2YgdGhpcyBgcmVuZGVyT3JkZXJPZmZzZXRgIGFuZCBgcmVuZGVyUXVldWVPZmZzZXROdW1iZXJgIGZvciBlYWNoIG1hdGVyaWFscy5cbiAgICpcbiAgICogQGRlZmF1bHQgMFxuICAgKi9cbiAgcHVibGljIHJlbmRlck9yZGVyT2Zmc2V0OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZXJlIGlzIGEgbGluZSBvZiB0aGUgc2hhZGVyIGNhbGxlZCBcImNvbW1lbnQgb3V0IGlmIHlvdSB3YW50IHRvIFBCUiBhYnNvbHV0ZWx5XCIgaW4gVlJNMC4wIE1Ub29uLlxuICAgKiBXaGVuIHRoaXMgaXMgdHJ1ZSwgdGhlIG1hdGVyaWFsIGVuYWJsZXMgdGhlIGxpbmUgdG8gbWFrZSBpdCBjb21wYXRpYmxlIHdpdGggdGhlIGxlZ2FjeSByZW5kZXJpbmcgb2YgVlJNLlxuICAgKiBVc3VhbGx5IG5vdCByZWNvbW1lbmRlZCB0byB0dXJuIHRoaXMgb24uXG4gICAqXG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICBwdWJsaWMgdjBDb21wYXRTaGFkZTogYm9vbGVhbjtcblxuICAvKipcbiAgICogRGVidWcgbW9kZSBmb3IgdGhlIG1hdGVyaWFsLlxuICAgKiBZb3UgY2FuIHZpc3VhbGl6ZSBzZXZlcmFsIGNvbXBvbmVudHMgZm9yIGRpYWdub3NpcyB1c2luZyBkZWJ1ZyBtb2RlLlxuICAgKlxuICAgKiBTZWU6IHtAbGluayBNVG9vbk1hdGVyaWFsRGVidWdNb2RlfVxuICAgKlxuICAgKiBAZGVmYXVsdCAnbm9uZSdcbiAgICovXG4gIHB1YmxpYyBkZWJ1Z01vZGU6IE1Ub29uTWF0ZXJpYWxEZWJ1Z01vZGU7XG5cbiAgcHVibGljIHJlYWRvbmx5IHBhcnNlcjogR0xURlBhcnNlcjtcblxuICAvKipcbiAgICogTG9hZGVkIG1hdGVyaWFscyB3aWxsIGJlIHN0b3JlZCBpbiB0aGlzIHNldC5cbiAgICogV2lsbCBiZSB0cmFuc2ZlcnJlZCBpbnRvIGBnbHRmLnVzZXJEYXRhLnZybU1Ub29uTWF0ZXJpYWxzYCBpbiB7QGxpbmsgYWZ0ZXJSb290fS5cbiAgICovXG4gIHByaXZhdGUgcmVhZG9ubHkgX21Ub29uTWF0ZXJpYWxTZXQ6IFNldDxUSFJFRS5NYXRlcmlhbD47XG5cbiAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIE1Ub29uTWF0ZXJpYWxMb2FkZXJQbHVnaW4uRVhURU5TSU9OX05BTUU7XG4gIH1cblxuICBwdWJsaWMgY29uc3RydWN0b3IocGFyc2VyOiBHTFRGUGFyc2VyLCBvcHRpb25zOiBNVG9vbk1hdGVyaWFsTG9hZGVyUGx1Z2luT3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5wYXJzZXIgPSBwYXJzZXI7XG5cbiAgICB0aGlzLm1hdGVyaWFsVHlwZSA9IG9wdGlvbnMubWF0ZXJpYWxUeXBlID8/IE1Ub29uTWF0ZXJpYWw7XG4gICAgdGhpcy5yZW5kZXJPcmRlck9mZnNldCA9IG9wdGlvbnMucmVuZGVyT3JkZXJPZmZzZXQgPz8gMDtcbiAgICB0aGlzLnYwQ29tcGF0U2hhZGUgPSBvcHRpb25zLnYwQ29tcGF0U2hhZGUgPz8gZmFsc2U7XG4gICAgdGhpcy5kZWJ1Z01vZGUgPSBvcHRpb25zLmRlYnVnTW9kZSA/PyAnbm9uZSc7XG5cbiAgICB0aGlzLl9tVG9vbk1hdGVyaWFsU2V0ID0gbmV3IFNldCgpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGJlZm9yZVJvb3QoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5fcmVtb3ZlVW5saXRFeHRlbnNpb25JZk1Ub29uRXhpc3RzKCk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgYWZ0ZXJSb290KGdsdGY6IEdMVEYpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBnbHRmLnVzZXJEYXRhLnZybU1Ub29uTWF0ZXJpYWxzID0gQXJyYXkuZnJvbSh0aGlzLl9tVG9vbk1hdGVyaWFsU2V0KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRNYXRlcmlhbFR5cGUobWF0ZXJpYWxJbmRleDogbnVtYmVyKTogdHlwZW9mIFRIUkVFLk1hdGVyaWFsIHwgbnVsbCB7XG4gICAgY29uc3QgdjFFeHRlbnNpb24gPSB0aGlzLl9nZXRNVG9vbkV4dGVuc2lvbihtYXRlcmlhbEluZGV4KTtcbiAgICBpZiAodjFFeHRlbnNpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLm1hdGVyaWFsVHlwZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBleHRlbmRNYXRlcmlhbFBhcmFtcyhtYXRlcmlhbEluZGV4OiBudW1iZXIsIG1hdGVyaWFsUGFyYW1zOiBNVG9vbk1hdGVyaWFsUGFyYW1ldGVycyk6IFByb21pc2U8YW55PiB8IG51bGwge1xuICAgIGNvbnN0IGV4dGVuc2lvbiA9IHRoaXMuX2dldE1Ub29uRXh0ZW5zaW9uKG1hdGVyaWFsSW5kZXgpO1xuICAgIGlmIChleHRlbnNpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLl9leHRlbmRNYXRlcmlhbFBhcmFtcyhleHRlbnNpb24sIG1hdGVyaWFsUGFyYW1zKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBsb2FkTWVzaChtZXNoSW5kZXg6IG51bWJlcik6IFByb21pc2U8VEhSRUUuR3JvdXAgfCBUSFJFRS5NZXNoIHwgVEhSRUUuU2tpbm5lZE1lc2g+IHtcbiAgICBjb25zdCBwYXJzZXIgPSB0aGlzLnBhcnNlcjtcbiAgICBjb25zdCBqc29uID0gcGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAgIGNvbnN0IG1lc2hEZWYgPSBqc29uLm1lc2hlcz8uW21lc2hJbmRleF07XG5cbiAgICBpZiAobWVzaERlZiA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBNVG9vbk1hdGVyaWFsTG9hZGVyUGx1Z2luOiBBdHRlbXB0IHRvIHVzZSBtZXNoZXNbJHttZXNoSW5kZXh9XSBvZiBnbFRGIGJ1dCB0aGUgbWVzaCBkb2Vzbid0IGV4aXN0YCxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgcHJpbWl0aXZlc0RlZiA9IG1lc2hEZWYucHJpbWl0aXZlcztcblxuICAgIGNvbnN0IG1lc2hPckdyb3VwID0gYXdhaXQgcGFyc2VyLmxvYWRNZXNoKG1lc2hJbmRleCk7XG5cbiAgICBpZiAocHJpbWl0aXZlc0RlZi5sZW5ndGggPT09IDEpIHtcbiAgICAgIGNvbnN0IG1lc2ggPSBtZXNoT3JHcm91cCBhcyBUSFJFRS5NZXNoO1xuICAgICAgY29uc3QgbWF0ZXJpYWxJbmRleCA9IHByaW1pdGl2ZXNEZWZbMF0ubWF0ZXJpYWw7XG5cbiAgICAgIGlmIChtYXRlcmlhbEluZGV4ICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5fc2V0dXBQcmltaXRpdmUobWVzaCwgbWF0ZXJpYWxJbmRleCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGdyb3VwID0gbWVzaE9yR3JvdXAgYXMgVEhSRUUuR3JvdXA7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByaW1pdGl2ZXNEZWYubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgbWVzaCA9IGdyb3VwLmNoaWxkcmVuW2ldIGFzIFRIUkVFLk1lc2g7XG4gICAgICAgIGNvbnN0IG1hdGVyaWFsSW5kZXggPSBwcmltaXRpdmVzRGVmW2ldLm1hdGVyaWFsO1xuXG4gICAgICAgIGlmIChtYXRlcmlhbEluZGV4ICE9IG51bGwpIHtcbiAgICAgICAgICB0aGlzLl9zZXR1cFByaW1pdGl2ZShtZXNoLCBtYXRlcmlhbEluZGV4KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBtZXNoT3JHcm91cDtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgdXNlIG9mIGBLSFJfbWF0ZXJpYWxzX3VubGl0YCBmcm9tIGl0cyBgbWF0ZXJpYWxzYCBpZiB0aGUgbWF0ZXJpYWwgaXMgdXNpbmcgTVRvb24uXG4gICAqXG4gICAqIFNpbmNlIEdMVEZMb2FkZXIgaGF2ZSBzbyBtYW55IGhhcmRjb2RlZCBwcm9jZWR1cmUgcmVsYXRlZCB0byBgS0hSX21hdGVyaWFsc191bmxpdGBcbiAgICogd2UgaGF2ZSB0byBkZWxldGUgdGhlIGV4dGVuc2lvbiBiZWZvcmUgd2Ugc3RhcnQgdG8gcGFyc2UgdGhlIGdsVEYuXG4gICAqL1xuICBwcml2YXRlIF9yZW1vdmVVbmxpdEV4dGVuc2lvbklmTVRvb25FeGlzdHMoKTogdm9pZCB7XG4gICAgY29uc3QgcGFyc2VyID0gdGhpcy5wYXJzZXI7XG4gICAgY29uc3QganNvbiA9IHBhcnNlci5qc29uIGFzIEdMVEZTY2hlbWEuSUdMVEY7XG5cbiAgICBjb25zdCBtYXRlcmlhbERlZnMgPSBqc29uLm1hdGVyaWFscztcbiAgICBtYXRlcmlhbERlZnM/Lm1hcCgobWF0ZXJpYWxEZWYsIGlNYXRlcmlhbCkgPT4ge1xuICAgICAgY29uc3QgZXh0ZW5zaW9uID0gdGhpcy5fZ2V0TVRvb25FeHRlbnNpb24oaU1hdGVyaWFsKTtcblxuICAgICAgaWYgKGV4dGVuc2lvbiAmJiBtYXRlcmlhbERlZi5leHRlbnNpb25zPy5bJ0tIUl9tYXRlcmlhbHNfdW5saXQnXSkge1xuICAgICAgICBkZWxldGUgbWF0ZXJpYWxEZWYuZXh0ZW5zaW9uc1snS0hSX21hdGVyaWFsc191bmxpdCddO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9nZXRNVG9vbkV4dGVuc2lvbihtYXRlcmlhbEluZGV4OiBudW1iZXIpOiBWMU1Ub29uU2NoZW1hLlZSTUNNYXRlcmlhbHNNVG9vbiB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgcGFyc2VyID0gdGhpcy5wYXJzZXI7XG4gICAgY29uc3QganNvbiA9IHBhcnNlci5qc29uIGFzIEdMVEZTY2hlbWEuSUdMVEY7XG5cbiAgICBjb25zdCBtYXRlcmlhbERlZiA9IGpzb24ubWF0ZXJpYWxzPy5bbWF0ZXJpYWxJbmRleF07XG5cbiAgICBpZiAobWF0ZXJpYWxEZWYgPT0gbnVsbCkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBgTVRvb25NYXRlcmlhbExvYWRlclBsdWdpbjogQXR0ZW1wdCB0byB1c2UgbWF0ZXJpYWxzWyR7bWF0ZXJpYWxJbmRleH1dIG9mIGdsVEYgYnV0IHRoZSBtYXRlcmlhbCBkb2Vzbid0IGV4aXN0YCxcbiAgICAgICk7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGNvbnN0IGV4dGVuc2lvbiA9IG1hdGVyaWFsRGVmLmV4dGVuc2lvbnM/LltNVG9vbk1hdGVyaWFsTG9hZGVyUGx1Z2luLkVYVEVOU0lPTl9OQU1FXSBhc1xuICAgICAgfCBWMU1Ub29uU2NoZW1hLlZSTUNNYXRlcmlhbHNNVG9vblxuICAgICAgfCB1bmRlZmluZWQ7XG4gICAgaWYgKGV4dGVuc2lvbiA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGNvbnN0IHNwZWNWZXJzaW9uID0gZXh0ZW5zaW9uLnNwZWNWZXJzaW9uO1xuICAgIGlmICghUE9TU0lCTEVfU1BFQ19WRVJTSU9OUy5oYXMoc3BlY1ZlcnNpb24pKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIGBNVG9vbk1hdGVyaWFsTG9hZGVyUGx1Z2luOiBVbmtub3duICR7TVRvb25NYXRlcmlhbExvYWRlclBsdWdpbi5FWFRFTlNJT05fTkFNRX0gc3BlY1ZlcnNpb24gXCIke3NwZWNWZXJzaW9ufVwiYCxcbiAgICAgICk7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiBleHRlbnNpb247XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF9leHRlbmRNYXRlcmlhbFBhcmFtcyhcbiAgICBleHRlbnNpb246IFYxTVRvb25TY2hlbWEuVlJNQ01hdGVyaWFsc01Ub29uLFxuICAgIG1hdGVyaWFsUGFyYW1zOiBNVG9vbk1hdGVyaWFsUGFyYW1ldGVycyxcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgLy8gUmVtb3ZpbmcgbWF0ZXJpYWwgcGFyYW1zIHRoYXQgaXMgbm90IHJlcXVpcmVkIHRvIHN1cHJlc3Mgd2FybmluZ3MuXG4gICAgZGVsZXRlIChtYXRlcmlhbFBhcmFtcyBhcyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbFBhcmFtZXRlcnMpLm1ldGFsbmVzcztcbiAgICBkZWxldGUgKG1hdGVyaWFsUGFyYW1zIGFzIFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsUGFyYW1ldGVycykucm91Z2huZXNzO1xuXG4gICAgY29uc3QgYXNzaWduSGVscGVyID0gbmV3IEdMVEZNVG9vbk1hdGVyaWFsUGFyYW1zQXNzaWduSGVscGVyKHRoaXMucGFyc2VyLCBtYXRlcmlhbFBhcmFtcyk7XG5cbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduUHJpbWl0aXZlKCd0cmFuc3BhcmVudFdpdGhaV3JpdGUnLCBleHRlbnNpb24udHJhbnNwYXJlbnRXaXRoWldyaXRlKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduQ29sb3IoJ3NoYWRlQ29sb3JGYWN0b3InLCBleHRlbnNpb24uc2hhZGVDb2xvckZhY3Rvcik7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnblRleHR1cmUoJ3NoYWRlTXVsdGlwbHlUZXh0dXJlJywgZXh0ZW5zaW9uLnNoYWRlTXVsdGlwbHlUZXh0dXJlLCB0cnVlKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduUHJpbWl0aXZlKCdzaGFkaW5nU2hpZnRGYWN0b3InLCBleHRlbnNpb24uc2hhZGluZ1NoaWZ0RmFjdG9yKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduVGV4dHVyZSgnc2hhZGluZ1NoaWZ0VGV4dHVyZScsIGV4dGVuc2lvbi5zaGFkaW5nU2hpZnRUZXh0dXJlLCB0cnVlKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduUHJpbWl0aXZlKCdzaGFkaW5nU2hpZnRUZXh0dXJlU2NhbGUnLCBleHRlbnNpb24uc2hhZGluZ1NoaWZ0VGV4dHVyZT8uc2NhbGUpO1xuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25QcmltaXRpdmUoJ3NoYWRpbmdUb29ueUZhY3RvcicsIGV4dGVuc2lvbi5zaGFkaW5nVG9vbnlGYWN0b3IpO1xuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25QcmltaXRpdmUoJ2dpRXF1YWxpemF0aW9uRmFjdG9yJywgZXh0ZW5zaW9uLmdpRXF1YWxpemF0aW9uRmFjdG9yKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduQ29sb3IoJ21hdGNhcEZhY3RvcicsIGV4dGVuc2lvbi5tYXRjYXBGYWN0b3IpO1xuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25UZXh0dXJlKCdtYXRjYXBUZXh0dXJlJywgZXh0ZW5zaW9uLm1hdGNhcFRleHR1cmUsIHRydWUpO1xuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25Db2xvcigncGFyYW1ldHJpY1JpbUNvbG9yRmFjdG9yJywgZXh0ZW5zaW9uLnBhcmFtZXRyaWNSaW1Db2xvckZhY3Rvcik7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnblRleHR1cmUoJ3JpbU11bHRpcGx5VGV4dHVyZScsIGV4dGVuc2lvbi5yaW1NdWx0aXBseVRleHR1cmUsIHRydWUpO1xuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25QcmltaXRpdmUoJ3JpbUxpZ2h0aW5nTWl4RmFjdG9yJywgZXh0ZW5zaW9uLnJpbUxpZ2h0aW5nTWl4RmFjdG9yKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduUHJpbWl0aXZlKCdwYXJhbWV0cmljUmltRnJlc25lbFBvd2VyRmFjdG9yJywgZXh0ZW5zaW9uLnBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJGYWN0b3IpO1xuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25QcmltaXRpdmUoJ3BhcmFtZXRyaWNSaW1MaWZ0RmFjdG9yJywgZXh0ZW5zaW9uLnBhcmFtZXRyaWNSaW1MaWZ0RmFjdG9yKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduUHJpbWl0aXZlKCdvdXRsaW5lV2lkdGhNb2RlJywgZXh0ZW5zaW9uLm91dGxpbmVXaWR0aE1vZGUgYXMgTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUpO1xuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25QcmltaXRpdmUoJ291dGxpbmVXaWR0aEZhY3RvcicsIGV4dGVuc2lvbi5vdXRsaW5lV2lkdGhGYWN0b3IpO1xuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25UZXh0dXJlKCdvdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmUnLCBleHRlbnNpb24ub3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlLCBmYWxzZSk7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnbkNvbG9yKCdvdXRsaW5lQ29sb3JGYWN0b3InLCBleHRlbnNpb24ub3V0bGluZUNvbG9yRmFjdG9yKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduUHJpbWl0aXZlKCdvdXRsaW5lTGlnaHRpbmdNaXhGYWN0b3InLCBleHRlbnNpb24ub3V0bGluZUxpZ2h0aW5nTWl4RmFjdG9yKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduVGV4dHVyZSgndXZBbmltYXRpb25NYXNrVGV4dHVyZScsIGV4dGVuc2lvbi51dkFuaW1hdGlvbk1hc2tUZXh0dXJlLCBmYWxzZSk7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnblByaW1pdGl2ZSgndXZBbmltYXRpb25TY3JvbGxYU3BlZWRGYWN0b3InLCBleHRlbnNpb24udXZBbmltYXRpb25TY3JvbGxYU3BlZWRGYWN0b3IpO1xuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25QcmltaXRpdmUoJ3V2QW5pbWF0aW9uU2Nyb2xsWVNwZWVkRmFjdG9yJywgZXh0ZW5zaW9uLnV2QW5pbWF0aW9uU2Nyb2xsWVNwZWVkRmFjdG9yKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduUHJpbWl0aXZlKCd1dkFuaW1hdGlvblJvdGF0aW9uU3BlZWRGYWN0b3InLCBleHRlbnNpb24udXZBbmltYXRpb25Sb3RhdGlvblNwZWVkRmFjdG9yKTtcblxuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25QcmltaXRpdmUoJ3YwQ29tcGF0U2hhZGUnLCB0aGlzLnYwQ29tcGF0U2hhZGUpO1xuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25QcmltaXRpdmUoJ2RlYnVnTW9kZScsIHRoaXMuZGVidWdNb2RlKTtcblxuICAgIGF3YWl0IGFzc2lnbkhlbHBlci5wZW5kaW5nO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgd2lsbCBkbyB0d28gcHJvY2Vzc2VzIHRoYXQgaXMgcmVxdWlyZWQgdG8gcmVuZGVyIE1Ub29uIHByb3Blcmx5LlxuICAgKlxuICAgKiAtIFNldCByZW5kZXIgb3JkZXJcbiAgICogLSBHZW5lcmF0ZSBvdXRsaW5lXG4gICAqXG4gICAqIEBwYXJhbSBtZXNoIEEgdGFyZ2V0IEdMVEYgcHJpbWl0aXZlXG4gICAqIEBwYXJhbSBtYXRlcmlhbEluZGV4IFRoZSBtYXRlcmlhbCBpbmRleCBvZiB0aGUgcHJpbWl0aXZlXG4gICAqL1xuICBwcml2YXRlIF9zZXR1cFByaW1pdGl2ZShtZXNoOiBUSFJFRS5NZXNoLCBtYXRlcmlhbEluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBleHRlbnNpb24gPSB0aGlzLl9nZXRNVG9vbkV4dGVuc2lvbihtYXRlcmlhbEluZGV4KTtcbiAgICBpZiAoZXh0ZW5zaW9uKSB7XG4gICAgICBjb25zdCByZW5kZXJPcmRlciA9IHRoaXMuX3BhcnNlUmVuZGVyT3JkZXIoZXh0ZW5zaW9uKTtcbiAgICAgIG1lc2gucmVuZGVyT3JkZXIgPSByZW5kZXJPcmRlciArIHRoaXMucmVuZGVyT3JkZXJPZmZzZXQ7XG5cbiAgICAgIHRoaXMuX2dlbmVyYXRlT3V0bGluZShtZXNoKTtcblxuICAgICAgdGhpcy5fYWRkVG9NYXRlcmlhbFNldChtZXNoKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayB3aGV0aGVyIHRoZSBtYXRlcmlhbCBzaG91bGQgZ2VuZXJhdGUgb3V0bGluZSBvciBub3QuXG4gICAqIEBwYXJhbSBzdXJmYWNlTWF0ZXJpYWwgVGhlIG1hdGVyaWFsIHRvIGNoZWNrXG4gICAqIEByZXR1cm5zIFRydWUgaWYgdGhlIG1hdGVyaWFsIHNob3VsZCBnZW5lcmF0ZSBvdXRsaW5lXG4gICAqL1xuICBwcml2YXRlIF9zaG91bGRHZW5lcmF0ZU91dGxpbmUoc3VyZmFjZU1hdGVyaWFsOiBUSFJFRS5NYXRlcmlhbCk6IGJvb2xlYW4ge1xuICAgIC8vIHdlIG1pZ2h0IHJlY2VpdmUgTVRvb25Ob2RlTWF0ZXJpYWwgYXMgd2VsbCBhcyBNVG9vbk1hdGVyaWFsXG4gICAgLy8gc28gd2UncmUgZ29ubmEgZHVjayB0eXBlIHRvIGNoZWNrIGlmIGl0J3MgY29tcGF0aWJsZSB3aXRoIE1Ub29uIHR5cGUgb3V0bGluZXNcbiAgICByZXR1cm4gKFxuICAgICAgdHlwZW9mIChzdXJmYWNlTWF0ZXJpYWwgYXMgYW55KS5vdXRsaW5lV2lkdGhNb2RlID09PSAnc3RyaW5nJyAmJlxuICAgICAgKHN1cmZhY2VNYXRlcmlhbCBhcyBhbnkpLm91dGxpbmVXaWR0aE1vZGUgIT09ICdub25lJyAmJlxuICAgICAgdHlwZW9mIChzdXJmYWNlTWF0ZXJpYWwgYXMgYW55KS5vdXRsaW5lV2lkdGhGYWN0b3IgPT09ICdudW1iZXInICYmXG4gICAgICAoc3VyZmFjZU1hdGVyaWFsIGFzIGFueSkub3V0bGluZVdpZHRoRmFjdG9yID4gMC4wXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZSBvdXRsaW5lIGZvciB0aGUgZ2l2ZW4gbWVzaCwgaWYgaXQgbmVlZHMuXG4gICAqXG4gICAqIEBwYXJhbSBtZXNoIFRoZSB0YXJnZXQgbWVzaFxuICAgKi9cbiAgcHJpdmF0ZSBfZ2VuZXJhdGVPdXRsaW5lKG1lc2g6IFRIUkVFLk1lc2gpOiB2b2lkIHtcbiAgICAvLyBPSywgaXQncyB0aGUgaGFja3kgcGFydC5cbiAgICAvLyBXZSBhcmUgZ29pbmcgdG8gZHVwbGljYXRlIHRoZSBNVG9vbk1hdGVyaWFsIGZvciBvdXRsaW5lIHVzZS5cbiAgICAvLyBUaGVuIHdlIGFyZSBnb2luZyB0byBjcmVhdGUgdHdvIGdlb21ldHJ5IGdyb3VwcyBhbmQgcmVmZXIgc2FtZSBidWZmZXIgYnV0IGRpZmZlcmVudCBtYXRlcmlhbC5cbiAgICAvLyBJdCdzIGhvdyB3ZSBkcmF3IHR3byBtYXRlcmlhbHMgYXQgb25jZSB1c2luZyBhIHNpbmdsZSBtZXNoLlxuXG4gICAgLy8gbWFrZSBzdXJlIHRoZSBtYXRlcmlhbCBpcyBzaW5nbGVcbiAgICBjb25zdCBzdXJmYWNlTWF0ZXJpYWwgPSBtZXNoLm1hdGVyaWFsO1xuICAgIGlmICghKHN1cmZhY2VNYXRlcmlhbCBpbnN0YW5jZW9mIFRIUkVFLk1hdGVyaWFsKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fc2hvdWxkR2VuZXJhdGVPdXRsaW5lKHN1cmZhY2VNYXRlcmlhbCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBtYWtlIGl0cyBtYXRlcmlhbCBhbiBhcnJheVxuICAgIG1lc2gubWF0ZXJpYWwgPSBbc3VyZmFjZU1hdGVyaWFsXTsgLy8gbWVzaC5tYXRlcmlhbCBpcyBndWFyYW50ZWVkIHRvIGJlIGEgTWF0ZXJpYWwgaW4gR0xURkxvYWRlclxuXG4gICAgLy8gZHVwbGljYXRlIHRoZSBtYXRlcmlhbCBmb3Igb3V0bGluZSB1c2VcbiAgICBjb25zdCBvdXRsaW5lTWF0ZXJpYWwgPSBzdXJmYWNlTWF0ZXJpYWwuY2xvbmUoKTtcbiAgICBvdXRsaW5lTWF0ZXJpYWwubmFtZSArPSAnIChPdXRsaW5lKSc7XG4gICAgKG91dGxpbmVNYXRlcmlhbCBhcyBhbnkpLmlzT3V0bGluZSA9IHRydWU7XG4gICAgb3V0bGluZU1hdGVyaWFsLnNpZGUgPSBUSFJFRS5CYWNrU2lkZTtcbiAgICBtZXNoLm1hdGVyaWFsLnB1c2gob3V0bGluZU1hdGVyaWFsKTtcblxuICAgIC8vIG1ha2UgdHdvIGdlb21ldHJ5IGdyb3VwcyBvdXQgb2YgYSBzYW1lIGJ1ZmZlclxuICAgIGNvbnN0IGdlb21ldHJ5ID0gbWVzaC5nZW9tZXRyeTsgLy8gbWVzaC5nZW9tZXRyeSBpcyBndWFyYW50ZWVkIHRvIGJlIGEgQnVmZmVyR2VvbWV0cnkgaW4gR0xURkxvYWRlclxuICAgIGNvbnN0IHByaW1pdGl2ZVZlcnRpY2VzID0gZ2VvbWV0cnkuaW5kZXggPyBnZW9tZXRyeS5pbmRleC5jb3VudCA6IGdlb21ldHJ5LmF0dHJpYnV0ZXMucG9zaXRpb24uY291bnQgLyAzO1xuICAgIGdlb21ldHJ5LmFkZEdyb3VwKDAsIHByaW1pdGl2ZVZlcnRpY2VzLCAwKTtcbiAgICBnZW9tZXRyeS5hZGRHcm91cCgwLCBwcmltaXRpdmVWZXJ0aWNlcywgMSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRUb01hdGVyaWFsU2V0KG1lc2g6IFRIUkVFLk1lc2gpOiB2b2lkIHtcbiAgICBjb25zdCBtYXRlcmlhbE9yTWF0ZXJpYWxzID0gbWVzaC5tYXRlcmlhbDtcbiAgICBjb25zdCBtYXRlcmlhbFNldCA9IG5ldyBTZXQ8VEhSRUUuTWF0ZXJpYWw+KCk7XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShtYXRlcmlhbE9yTWF0ZXJpYWxzKSkge1xuICAgICAgbWF0ZXJpYWxPck1hdGVyaWFscy5mb3JFYWNoKChtYXRlcmlhbCkgPT4gbWF0ZXJpYWxTZXQuYWRkKG1hdGVyaWFsKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1hdGVyaWFsU2V0LmFkZChtYXRlcmlhbE9yTWF0ZXJpYWxzKTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IG1hdGVyaWFsIG9mIG1hdGVyaWFsU2V0KSB7XG4gICAgICB0aGlzLl9tVG9vbk1hdGVyaWFsU2V0LmFkZChtYXRlcmlhbCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VSZW5kZXJPcmRlcihleHRlbnNpb246IFYxTVRvb25TY2hlbWEuVlJNQ01hdGVyaWFsc01Ub29uKTogbnVtYmVyIHtcbiAgICAvLyB0cmFuc3BhcmVudFdpdGhaV3JpdGUgcmFuZ2VzIGZyb20gMCB0byArOVxuICAgIC8vIG1lcmUgdHJhbnNwYXJlbnQgcmFuZ2VzIGZyb20gLTkgdG8gMFxuICAgIGNvbnN0IGVuYWJsZWRaV3JpdGUgPSBleHRlbnNpb24udHJhbnNwYXJlbnRXaXRoWldyaXRlO1xuICAgIHJldHVybiAoZW5hYmxlZFpXcml0ZSA/IDAgOiAxOSkgKyAoZXh0ZW5zaW9uLnJlbmRlclF1ZXVlT2Zmc2V0TnVtYmVyID8/IDApO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgR0xURlBhcnNlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXIuanMnO1xuaW1wb3J0IHsgTVRvb25NYXRlcmlhbFBhcmFtZXRlcnMgfSBmcm9tICcuL01Ub29uTWF0ZXJpYWxQYXJhbWV0ZXJzJztcbmltcG9ydCB7IHNldFRleHR1cmVDb2xvclNwYWNlIH0gZnJvbSAnLi91dGlscy9zZXRUZXh0dXJlQ29sb3JTcGFjZSc7XG5cbi8qKlxuICogTWF0ZXJpYWxQYXJhbWV0ZXJzIGhhdGVzIGB1bmRlZmluZWRgLiBUaGlzIGhlbHBlciBhdXRvbWF0aWNhbGx5IHJlamVjdHMgYXNzaWduIG9mIHRoZXNlIGB1bmRlZmluZWRgLlxuICogSXQgYWxzbyBoYW5kbGVzIGFzeW5jaHJvbm91cyBwcm9jZXNzIG9mIHRleHR1cmVzLlxuICogTWFrZSBzdXJlIGF3YWl0IGZvciB7QGxpbmsgR0xURk1Ub29uTWF0ZXJpYWxQYXJhbXNBc3NpZ25IZWxwZXIucGVuZGluZ30uXG4gKi9cbmV4cG9ydCBjbGFzcyBHTFRGTVRvb25NYXRlcmlhbFBhcmFtc0Fzc2lnbkhlbHBlciB7XG4gIHByaXZhdGUgcmVhZG9ubHkgX3BhcnNlcjogR0xURlBhcnNlcjtcbiAgcHJpdmF0ZSBfbWF0ZXJpYWxQYXJhbXM6IE1Ub29uTWF0ZXJpYWxQYXJhbWV0ZXJzO1xuICBwcml2YXRlIF9wZW5kaW5nczogUHJvbWlzZTxhbnk+W107XG5cbiAgcHVibGljIGdldCBwZW5kaW5nKCk6IFByb21pc2U8dW5rbm93bj4ge1xuICAgIHJldHVybiBQcm9taXNlLmFsbCh0aGlzLl9wZW5kaW5ncyk7XG4gIH1cblxuICBwdWJsaWMgY29uc3RydWN0b3IocGFyc2VyOiBHTFRGUGFyc2VyLCBtYXRlcmlhbFBhcmFtczogTVRvb25NYXRlcmlhbFBhcmFtZXRlcnMpIHtcbiAgICB0aGlzLl9wYXJzZXIgPSBwYXJzZXI7XG4gICAgdGhpcy5fbWF0ZXJpYWxQYXJhbXMgPSBtYXRlcmlhbFBhcmFtcztcbiAgICB0aGlzLl9wZW5kaW5ncyA9IFtdO1xuICB9XG5cbiAgcHVibGljIGFzc2lnblByaW1pdGl2ZTxUIGV4dGVuZHMga2V5b2YgTVRvb25NYXRlcmlhbFBhcmFtZXRlcnM+KGtleTogVCwgdmFsdWU6IE1Ub29uTWF0ZXJpYWxQYXJhbWV0ZXJzW1RdKTogdm9pZCB7XG4gICAgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX21hdGVyaWFsUGFyYW1zW2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXNzaWduQ29sb3I8VCBleHRlbmRzIGtleW9mIE1Ub29uTWF0ZXJpYWxQYXJhbWV0ZXJzPihcbiAgICBrZXk6IFQsXG4gICAgdmFsdWU6IG51bWJlcltdIHwgdW5kZWZpbmVkLFxuICAgIGNvbnZlcnRTUkdCVG9MaW5lYXI/OiBib29sZWFuLFxuICApOiB2b2lkIHtcbiAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fbWF0ZXJpYWxQYXJhbXNba2V5XSA9IG5ldyBUSFJFRS5Db2xvcigpLmZyb21BcnJheSh2YWx1ZSk7XG5cbiAgICAgIGlmIChjb252ZXJ0U1JHQlRvTGluZWFyKSB7XG4gICAgICAgIHRoaXMuX21hdGVyaWFsUGFyYW1zW2tleV0uY29udmVydFNSR0JUb0xpbmVhcigpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBhc3NpZ25UZXh0dXJlPFQgZXh0ZW5kcyBrZXlvZiBNVG9vbk1hdGVyaWFsUGFyYW1ldGVycz4oXG4gICAga2V5OiBULFxuICAgIHRleHR1cmU6IHsgaW5kZXg6IG51bWJlciB9IHwgdW5kZWZpbmVkLFxuICAgIGlzQ29sb3JUZXh0dXJlOiBib29sZWFuLFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBwcm9taXNlID0gKGFzeW5jICgpID0+IHtcbiAgICAgIGlmICh0ZXh0dXJlICE9IG51bGwpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5fcGFyc2VyLmFzc2lnblRleHR1cmUodGhpcy5fbWF0ZXJpYWxQYXJhbXMsIGtleSwgdGV4dHVyZSk7XG5cbiAgICAgICAgaWYgKGlzQ29sb3JUZXh0dXJlKSB7XG4gICAgICAgICAgc2V0VGV4dHVyZUNvbG9yU3BhY2UodGhpcy5fbWF0ZXJpYWxQYXJhbXNba2V5XSwgJ3NyZ2InKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pKCk7XG5cbiAgICB0aGlzLl9wZW5kaW5ncy5wdXNoKHByb21pc2UpO1xuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgYXNzaWduVGV4dHVyZUJ5SW5kZXg8VCBleHRlbmRzIGtleW9mIE1Ub29uTWF0ZXJpYWxQYXJhbWV0ZXJzPihcbiAgICBrZXk6IFQsXG4gICAgdGV4dHVyZUluZGV4OiBudW1iZXIgfCB1bmRlZmluZWQsXG4gICAgaXNDb2xvclRleHR1cmU6IGJvb2xlYW4sXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLmFzc2lnblRleHR1cmUoa2V5LCB0ZXh0dXJlSW5kZXggIT0gbnVsbCA/IHsgaW5kZXg6IHRleHR1cmVJbmRleCB9IDogdW5kZWZpbmVkLCBpc0NvbG9yVGV4dHVyZSk7XG4gIH1cbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbmNvbnN0IGNvbG9yU3BhY2VFbmNvZGluZ01hcDogUmVjb3JkPCcnIHwgJ3NyZ2InLCBhbnk+ID0ge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXG4gICcnOiAzMDAwLFxuICBzcmdiOiAzMDAxLFxufTtcblxuLyoqXG4gKiBBIGNvbXBhdCBmdW5jdGlvbiB0byBzZXQgdGV4dHVyZSBjb2xvciBzcGFjZS5cbiAqXG4gKiBDT01QQVQ6IHByZS1yMTUyXG4gKiBTdGFydGluZyBmcm9tIFRocmVlLmpzIHIxNTIsIGB0ZXh0dXJlLmVuY29kaW5nYCBpcyByZW5hbWVkIHRvIGB0ZXh0dXJlLmNvbG9yU3BhY2VgLlxuICogVGhpcyBmdW5jdGlvbiB3aWxsIGhhbmRsZSB0aGUgY29tYXB0LlxuICpcbiAqIEBwYXJhbSB0ZXh0dXJlIFRoZSB0ZXh0dXJlIHlvdSB3YW50IHRvIHNldCB0aGUgY29sb3Igc3BhY2UgdG9cbiAqIEBwYXJhbSBjb2xvclNwYWNlIFRoZSBjb2xvciBzcGFjZSB5b3Ugd2FudCB0byBzZXQgdG8gdGhlIHRleHR1cmVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldFRleHR1cmVDb2xvclNwYWNlKHRleHR1cmU6IFRIUkVFLlRleHR1cmUsIGNvbG9yU3BhY2U6ICcnIHwgJ3NyZ2InKTogdm9pZCB7XG4gIGlmIChwYXJzZUludChUSFJFRS5SRVZJU0lPTiwgMTApID49IDE1Mikge1xuICAgIHRleHR1cmUuY29sb3JTcGFjZSA9IGNvbG9yU3BhY2U7XG4gIH0gZWxzZSB7XG4gICAgKHRleHR1cmUgYXMgYW55KS5lbmNvZGluZyA9IGNvbG9yU3BhY2VFbmNvZGluZ01hcFtjb2xvclNwYWNlXTtcbiAgfVxufVxuIiwgIi8qIHRzbGludDpkaXNhYmxlOm1lbWJlci1vcmRlcmluZyAqL1xuXG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgdmVydGV4U2hhZGVyIGZyb20gJy4vc2hhZGVycy9tdG9vbi52ZXJ0JztcbmltcG9ydCBmcmFnbWVudFNoYWRlciBmcm9tICcuL3NoYWRlcnMvbXRvb24uZnJhZyc7XG5pbXBvcnQgeyBNVG9vbk1hdGVyaWFsRGVidWdNb2RlIH0gZnJvbSAnLi9NVG9vbk1hdGVyaWFsRGVidWdNb2RlJztcbmltcG9ydCB7IE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlIH0gZnJvbSAnLi9NVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZSc7XG5pbXBvcnQgdHlwZSB7IE1Ub29uTWF0ZXJpYWxQYXJhbWV0ZXJzIH0gZnJvbSAnLi9NVG9vbk1hdGVyaWFsUGFyYW1ldGVycyc7XG5pbXBvcnQgeyBnZXRUZXh0dXJlQ29sb3JTcGFjZSB9IGZyb20gJy4vdXRpbHMvZ2V0VGV4dHVyZUNvbG9yU3BhY2UnO1xuXG4vKipcbiAqIE1Ub29uIGlzIGEgbWF0ZXJpYWwgc3BlY2lmaWNhdGlvbiB0aGF0IGhhcyB2YXJpb3VzIGZlYXR1cmVzLlxuICogVGhlIHNwZWMgYW5kIGltcGxlbWVudGF0aW9uIGFyZSBvcmlnaW5hbGx5IGZvdW5kZWQgZm9yIFVuaXR5IGVuZ2luZSBhbmQgdGhpcyBpcyBhIHBvcnQgb2YgdGhlIG1hdGVyaWFsLlxuICpcbiAqIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL1NhbnRhcmgvTVRvb25cbiAqL1xuZXhwb3J0IGNsYXNzIE1Ub29uTWF0ZXJpYWwgZXh0ZW5kcyBUSFJFRS5TaGFkZXJNYXRlcmlhbCB7XG4gIHB1YmxpYyB1bmlmb3Jtczoge1xuICAgIGxpdEZhY3RvcjogVEhSRUUuSVVuaWZvcm08VEhSRUUuQ29sb3I+O1xuICAgIGFscGhhVGVzdDogVEhSRUUuSVVuaWZvcm08bnVtYmVyPjtcbiAgICBvcGFjaXR5OiBUSFJFRS5JVW5pZm9ybTxudW1iZXI+O1xuICAgIG1hcDogVEhSRUUuSVVuaWZvcm08VEhSRUUuVGV4dHVyZSB8IG51bGw+O1xuICAgIG1hcFV2VHJhbnNmb3JtOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5NYXRyaXgzPjtcbiAgICBub3JtYWxNYXA6IFRIUkVFLklVbmlmb3JtPFRIUkVFLlRleHR1cmUgfCBudWxsPjtcbiAgICBub3JtYWxNYXBVdlRyYW5zZm9ybTogVEhSRUUuSVVuaWZvcm08VEhSRUUuTWF0cml4Mz47XG4gICAgbm9ybWFsU2NhbGU6IFRIUkVFLklVbmlmb3JtPFRIUkVFLlZlY3RvcjI+O1xuICAgIGVtaXNzaXZlOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5Db2xvcj47XG4gICAgZW1pc3NpdmVJbnRlbnNpdHk6IFRIUkVFLklVbmlmb3JtPG51bWJlcj47XG4gICAgZW1pc3NpdmVNYXA6IFRIUkVFLklVbmlmb3JtPFRIUkVFLlRleHR1cmUgfCBudWxsPjtcbiAgICBlbWlzc2l2ZU1hcFV2VHJhbnNmb3JtOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5NYXRyaXgzPjtcbiAgICBzaGFkZUNvbG9yRmFjdG9yOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5Db2xvcj47XG4gICAgc2hhZGVNdWx0aXBseVRleHR1cmU6IFRIUkVFLklVbmlmb3JtPFRIUkVFLlRleHR1cmUgfCBudWxsPjtcbiAgICBzaGFkZU11bHRpcGx5VGV4dHVyZVV2VHJhbnNmb3JtOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5NYXRyaXgzPjtcbiAgICBzaGFkaW5nU2hpZnRGYWN0b3I6IFRIUkVFLklVbmlmb3JtPG51bWJlcj47XG4gICAgc2hhZGluZ1NoaWZ0VGV4dHVyZTogVEhSRUUuSVVuaWZvcm08VEhSRUUuVGV4dHVyZSB8IG51bGw+O1xuICAgIHNoYWRpbmdTaGlmdFRleHR1cmVVdlRyYW5zZm9ybTogVEhSRUUuSVVuaWZvcm08VEhSRUUuTWF0cml4Mz47XG4gICAgc2hhZGluZ1NoaWZ0VGV4dHVyZVNjYWxlOiBUSFJFRS5JVW5pZm9ybTxudW1iZXI+O1xuICAgIHNoYWRpbmdUb29ueUZhY3RvcjogVEhSRUUuSVVuaWZvcm08bnVtYmVyPjtcbiAgICBnaUVxdWFsaXphdGlvbkZhY3RvcjogVEhSRUUuSVVuaWZvcm08bnVtYmVyPjtcbiAgICBtYXRjYXBGYWN0b3I6IFRIUkVFLklVbmlmb3JtPFRIUkVFLkNvbG9yPjtcbiAgICBtYXRjYXBUZXh0dXJlOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5UZXh0dXJlIHwgbnVsbD47XG4gICAgbWF0Y2FwVGV4dHVyZVV2VHJhbnNmb3JtOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5NYXRyaXgzPjtcbiAgICBwYXJhbWV0cmljUmltQ29sb3JGYWN0b3I6IFRIUkVFLklVbmlmb3JtPFRIUkVFLkNvbG9yPjtcbiAgICByaW1NdWx0aXBseVRleHR1cmU6IFRIUkVFLklVbmlmb3JtPFRIUkVFLlRleHR1cmUgfCBudWxsPjtcbiAgICByaW1NdWx0aXBseVRleHR1cmVVdlRyYW5zZm9ybTogVEhSRUUuSVVuaWZvcm08VEhSRUUuTWF0cml4Mz47XG4gICAgcmltTGlnaHRpbmdNaXhGYWN0b3I6IFRIUkVFLklVbmlmb3JtPG51bWJlcj47XG4gICAgcGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlckZhY3RvcjogVEhSRUUuSVVuaWZvcm08bnVtYmVyPjtcbiAgICBwYXJhbWV0cmljUmltTGlmdEZhY3RvcjogVEhSRUUuSVVuaWZvcm08bnVtYmVyPjtcbiAgICBvdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmU6IFRIUkVFLklVbmlmb3JtPFRIUkVFLlRleHR1cmUgfCBudWxsPjtcbiAgICBvdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmVVdlRyYW5zZm9ybTogVEhSRUUuSVVuaWZvcm08VEhSRUUuTWF0cml4Mz47XG4gICAgb3V0bGluZVdpZHRoRmFjdG9yOiBUSFJFRS5JVW5pZm9ybTxudW1iZXI+O1xuICAgIG91dGxpbmVDb2xvckZhY3RvcjogVEhSRUUuSVVuaWZvcm08VEhSRUUuQ29sb3I+O1xuICAgIG91dGxpbmVMaWdodGluZ01peEZhY3RvcjogVEhSRUUuSVVuaWZvcm08bnVtYmVyPjtcbiAgICB1dkFuaW1hdGlvbk1hc2tUZXh0dXJlOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5UZXh0dXJlIHwgbnVsbD47XG4gICAgdXZBbmltYXRpb25NYXNrVGV4dHVyZVV2VHJhbnNmb3JtOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5NYXRyaXgzPjtcbiAgICB1dkFuaW1hdGlvblNjcm9sbFhPZmZzZXQ6IFRIUkVFLklVbmlmb3JtPG51bWJlcj47XG4gICAgdXZBbmltYXRpb25TY3JvbGxZT2Zmc2V0OiBUSFJFRS5JVW5pZm9ybTxudW1iZXI+O1xuICAgIHV2QW5pbWF0aW9uUm90YXRpb25QaGFzZTogVEhSRUUuSVVuaWZvcm08bnVtYmVyPjtcbiAgfTtcblxuICBwdWJsaWMgZ2V0IGNvbG9yKCk6IFRIUkVFLkNvbG9yIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5saXRGYWN0b3IudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCBjb2xvcih2YWx1ZTogVEhSRUUuQ29sb3IpIHtcbiAgICB0aGlzLnVuaWZvcm1zLmxpdEZhY3Rvci52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBtYXAoKTogVEhSRUUuVGV4dHVyZSB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLm1hcC52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IG1hcCh2YWx1ZTogVEhSRUUuVGV4dHVyZSB8IG51bGwpIHtcbiAgICB0aGlzLnVuaWZvcm1zLm1hcC52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBub3JtYWxNYXAoKTogVEhSRUUuVGV4dHVyZSB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLm5vcm1hbE1hcC52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IG5vcm1hbE1hcCh2YWx1ZTogVEhSRUUuVGV4dHVyZSB8IG51bGwpIHtcbiAgICB0aGlzLnVuaWZvcm1zLm5vcm1hbE1hcC52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBub3JtYWxTY2FsZSgpOiBUSFJFRS5WZWN0b3IyIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5ub3JtYWxTY2FsZS52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IG5vcm1hbFNjYWxlKHZhbHVlOiBUSFJFRS5WZWN0b3IyKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5ub3JtYWxTY2FsZS52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBlbWlzc2l2ZSgpOiBUSFJFRS5Db2xvciB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMuZW1pc3NpdmUudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCBlbWlzc2l2ZSh2YWx1ZTogVEhSRUUuQ29sb3IpIHtcbiAgICB0aGlzLnVuaWZvcm1zLmVtaXNzaXZlLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGVtaXNzaXZlSW50ZW5zaXR5KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMuZW1pc3NpdmVJbnRlbnNpdHkudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCBlbWlzc2l2ZUludGVuc2l0eSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5lbWlzc2l2ZUludGVuc2l0eS52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBlbWlzc2l2ZU1hcCgpOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMuZW1pc3NpdmVNYXAudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCBlbWlzc2l2ZU1hcCh2YWx1ZTogVEhSRUUuVGV4dHVyZSB8IG51bGwpIHtcbiAgICB0aGlzLnVuaWZvcm1zLmVtaXNzaXZlTWFwLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHNoYWRlQ29sb3JGYWN0b3IoKTogVEhSRUUuQ29sb3Ige1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLnNoYWRlQ29sb3JGYWN0b3IudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCBzaGFkZUNvbG9yRmFjdG9yKHZhbHVlOiBUSFJFRS5Db2xvcikge1xuICAgIHRoaXMudW5pZm9ybXMuc2hhZGVDb2xvckZhY3Rvci52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBzaGFkZU11bHRpcGx5VGV4dHVyZSgpOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMuc2hhZGVNdWx0aXBseVRleHR1cmUudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCBzaGFkZU11bHRpcGx5VGV4dHVyZSh2YWx1ZTogVEhSRUUuVGV4dHVyZSB8IG51bGwpIHtcbiAgICB0aGlzLnVuaWZvcm1zLnNoYWRlTXVsdGlwbHlUZXh0dXJlLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHNoYWRpbmdTaGlmdEZhY3RvcigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLnNoYWRpbmdTaGlmdEZhY3Rvci52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IHNoYWRpbmdTaGlmdEZhY3Rvcih2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5zaGFkaW5nU2hpZnRGYWN0b3IudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc2hhZGluZ1NoaWZ0VGV4dHVyZSgpOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMuc2hhZGluZ1NoaWZ0VGV4dHVyZS52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IHNoYWRpbmdTaGlmdFRleHR1cmUodmFsdWU6IFRIUkVFLlRleHR1cmUgfCBudWxsKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5zaGFkaW5nU2hpZnRUZXh0dXJlLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHNoYWRpbmdTaGlmdFRleHR1cmVTY2FsZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLnNoYWRpbmdTaGlmdFRleHR1cmVTY2FsZS52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IHNoYWRpbmdTaGlmdFRleHR1cmVTY2FsZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5zaGFkaW5nU2hpZnRUZXh0dXJlU2NhbGUudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc2hhZGluZ1Rvb255RmFjdG9yKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMuc2hhZGluZ1Rvb255RmFjdG9yLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgc2hhZGluZ1Rvb255RmFjdG9yKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLnVuaWZvcm1zLnNoYWRpbmdUb29ueUZhY3Rvci52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBnaUVxdWFsaXphdGlvbkZhY3RvcigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLmdpRXF1YWxpemF0aW9uRmFjdG9yLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgZ2lFcXVhbGl6YXRpb25GYWN0b3IodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMudW5pZm9ybXMuZ2lFcXVhbGl6YXRpb25GYWN0b3IudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgbWF0Y2FwRmFjdG9yKCk6IFRIUkVFLkNvbG9yIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5tYXRjYXBGYWN0b3IudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCBtYXRjYXBGYWN0b3IodmFsdWU6IFRIUkVFLkNvbG9yKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5tYXRjYXBGYWN0b3IudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgbWF0Y2FwVGV4dHVyZSgpOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMubWF0Y2FwVGV4dHVyZS52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IG1hdGNhcFRleHR1cmUodmFsdWU6IFRIUkVFLlRleHR1cmUgfCBudWxsKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5tYXRjYXBUZXh0dXJlLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHBhcmFtZXRyaWNSaW1Db2xvckZhY3RvcigpOiBUSFJFRS5Db2xvciB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMucGFyYW1ldHJpY1JpbUNvbG9yRmFjdG9yLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgcGFyYW1ldHJpY1JpbUNvbG9yRmFjdG9yKHZhbHVlOiBUSFJFRS5Db2xvcikge1xuICAgIHRoaXMudW5pZm9ybXMucGFyYW1ldHJpY1JpbUNvbG9yRmFjdG9yLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHJpbU11bHRpcGx5VGV4dHVyZSgpOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMucmltTXVsdGlwbHlUZXh0dXJlLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgcmltTXVsdGlwbHlUZXh0dXJlKHZhbHVlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCkge1xuICAgIHRoaXMudW5pZm9ybXMucmltTXVsdGlwbHlUZXh0dXJlLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHJpbUxpZ2h0aW5nTWl4RmFjdG9yKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMucmltTGlnaHRpbmdNaXhGYWN0b3IudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCByaW1MaWdodGluZ01peEZhY3Rvcih2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5yaW1MaWdodGluZ01peEZhY3Rvci52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBwYXJhbWV0cmljUmltRnJlc25lbFBvd2VyRmFjdG9yKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMucGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlckZhY3Rvci52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IHBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJGYWN0b3IodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMudW5pZm9ybXMucGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlckZhY3Rvci52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBwYXJhbWV0cmljUmltTGlmdEZhY3RvcigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLnBhcmFtZXRyaWNSaW1MaWZ0RmFjdG9yLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgcGFyYW1ldHJpY1JpbUxpZnRGYWN0b3IodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMudW5pZm9ybXMucGFyYW1ldHJpY1JpbUxpZnRGYWN0b3IudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgb3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlKCk6IFRIUkVFLlRleHR1cmUgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5vdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmUudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCBvdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmUodmFsdWU6IFRIUkVFLlRleHR1cmUgfCBudWxsKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5vdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmUudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgb3V0bGluZVdpZHRoRmFjdG9yKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMub3V0bGluZVdpZHRoRmFjdG9yLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgb3V0bGluZVdpZHRoRmFjdG9yKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLnVuaWZvcm1zLm91dGxpbmVXaWR0aEZhY3Rvci52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBvdXRsaW5lQ29sb3JGYWN0b3IoKTogVEhSRUUuQ29sb3Ige1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLm91dGxpbmVDb2xvckZhY3Rvci52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IG91dGxpbmVDb2xvckZhY3Rvcih2YWx1ZTogVEhSRUUuQ29sb3IpIHtcbiAgICB0aGlzLnVuaWZvcm1zLm91dGxpbmVDb2xvckZhY3Rvci52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBvdXRsaW5lTGlnaHRpbmdNaXhGYWN0b3IoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5vdXRsaW5lTGlnaHRpbmdNaXhGYWN0b3IudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCBvdXRsaW5lTGlnaHRpbmdNaXhGYWN0b3IodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMudW5pZm9ybXMub3V0bGluZUxpZ2h0aW5nTWl4RmFjdG9yLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHV2QW5pbWF0aW9uTWFza1RleHR1cmUoKTogVEhSRUUuVGV4dHVyZSB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLnV2QW5pbWF0aW9uTWFza1RleHR1cmUudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCB1dkFuaW1hdGlvbk1hc2tUZXh0dXJlKHZhbHVlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCkge1xuICAgIHRoaXMudW5pZm9ybXMudXZBbmltYXRpb25NYXNrVGV4dHVyZS52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCB1dkFuaW1hdGlvblNjcm9sbFhPZmZzZXQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy51dkFuaW1hdGlvblNjcm9sbFhPZmZzZXQudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCB1dkFuaW1hdGlvblNjcm9sbFhPZmZzZXQodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMudW5pZm9ybXMudXZBbmltYXRpb25TY3JvbGxYT2Zmc2V0LnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHV2QW5pbWF0aW9uU2Nyb2xsWU9mZnNldCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLnV2QW5pbWF0aW9uU2Nyb2xsWU9mZnNldC52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IHV2QW5pbWF0aW9uU2Nyb2xsWU9mZnNldCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy51bmlmb3Jtcy51dkFuaW1hdGlvblNjcm9sbFlPZmZzZXQudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdXZBbmltYXRpb25Sb3RhdGlvblBoYXNlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMudXZBbmltYXRpb25Sb3RhdGlvblBoYXNlLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgdXZBbmltYXRpb25Sb3RhdGlvblBoYXNlKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLnVuaWZvcm1zLnV2QW5pbWF0aW9uUm90YXRpb25QaGFzZS52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIHV2QW5pbWF0aW9uU2Nyb2xsWFNwZWVkRmFjdG9yID0gMC4wO1xuICBwdWJsaWMgdXZBbmltYXRpb25TY3JvbGxZU3BlZWRGYWN0b3IgPSAwLjA7XG4gIHB1YmxpYyB1dkFuaW1hdGlvblJvdGF0aW9uU3BlZWRGYWN0b3IgPSAwLjA7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIG1hdGVyaWFsIGlzIGFmZmVjdGVkIGJ5IGZvZy5cbiAgICogYHRydWVgIGJ5IGRlZmF1bHQuXG4gICAqL1xuICBwdWJsaWMgZm9nID0gdHJ1ZTtcblxuICAvKipcbiAgICogV2lsbCBiZSByZWFkIGluIFdlYkdMUHJvZ3JhbXNcbiAgICpcbiAgICogU2VlOiBodHRwczovL2dpdGh1Yi5jb20vbXJkb29iL3RocmVlLmpzL2Jsb2IvNGY1MjM2YWMzZDZmNDFkOTA0YWE1ODQwMWI0MDU1NGU4ZmJkY2IxNS9zcmMvcmVuZGVyZXJzL3dlYmdsL1dlYkdMUHJvZ3JhbXMuanMjTDE5MC1MMTkxXG4gICAqL1xuICBwdWJsaWMgbm9ybWFsTWFwVHlwZSA9IFRIUkVFLlRhbmdlbnRTcGFjZU5vcm1hbE1hcDtcblxuICAvKipcbiAgICogV2hlbiB0aGlzIGlzIGB0cnVlYCwgdmVydGV4IGNvbG9ycyB3aWxsIGJlIGlnbm9yZWQuXG4gICAqIGB0cnVlYCBieSBkZWZhdWx0LlxuICAgKi9cbiAgcHJpdmF0ZSBfaWdub3JlVmVydGV4Q29sb3IgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBXaGVuIHRoaXMgaXMgYHRydWVgLCB2ZXJ0ZXggY29sb3JzIHdpbGwgYmUgaWdub3JlZC5cbiAgICogYHRydWVgIGJ5IGRlZmF1bHQuXG4gICAqL1xuICBwdWJsaWMgZ2V0IGlnbm9yZVZlcnRleENvbG9yKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pZ25vcmVWZXJ0ZXhDb2xvcjtcbiAgfVxuICBwdWJsaWMgc2V0IGlnbm9yZVZlcnRleENvbG9yKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5faWdub3JlVmVydGV4Q29sb3IgPSB2YWx1ZTtcblxuICAgIHRoaXMubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfdjBDb21wYXRTaGFkZSA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBUaGVyZSBpcyBhIGxpbmUgb2YgdGhlIHNoYWRlciBjYWxsZWQgXCJjb21tZW50IG91dCBpZiB5b3Ugd2FudCB0byBQQlIgYWJzb2x1dGVseVwiIGluIFZSTTAuMCBNVG9vbi5cbiAgICogV2hlbiB0aGlzIGlzIHRydWUsIHRoZSBtYXRlcmlhbCBlbmFibGVzIHRoZSBsaW5lIHRvIG1ha2UgaXQgY29tcGF0aWJsZSB3aXRoIHRoZSBsZWdhY3kgcmVuZGVyaW5nIG9mIFZSTS5cbiAgICogVXN1YWxseSBub3QgcmVjb21tZW5kZWQgdG8gdHVybiB0aGlzIG9uLlxuICAgKiBgZmFsc2VgIGJ5IGRlZmF1bHQuXG4gICAqL1xuICBnZXQgdjBDb21wYXRTaGFkZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fdjBDb21wYXRTaGFkZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGVyZSBpcyBhIGxpbmUgb2YgdGhlIHNoYWRlciBjYWxsZWQgXCJjb21tZW50IG91dCBpZiB5b3Ugd2FudCB0byBQQlIgYWJzb2x1dGVseVwiIGluIFZSTTAuMCBNVG9vbi5cbiAgICogV2hlbiB0aGlzIGlzIHRydWUsIHRoZSBtYXRlcmlhbCBlbmFibGVzIHRoZSBsaW5lIHRvIG1ha2UgaXQgY29tcGF0aWJsZSB3aXRoIHRoZSBsZWdhY3kgcmVuZGVyaW5nIG9mIFZSTS5cbiAgICogVXN1YWxseSBub3QgcmVjb21tZW5kZWQgdG8gdHVybiB0aGlzIG9uLlxuICAgKiBgZmFsc2VgIGJ5IGRlZmF1bHQuXG4gICAqL1xuICBzZXQgdjBDb21wYXRTaGFkZSh2OiBib29sZWFuKSB7XG4gICAgdGhpcy5fdjBDb21wYXRTaGFkZSA9IHY7XG5cbiAgICB0aGlzLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX2RlYnVnTW9kZTogTVRvb25NYXRlcmlhbERlYnVnTW9kZSA9IE1Ub29uTWF0ZXJpYWxEZWJ1Z01vZGUuTm9uZTtcblxuICAvKipcbiAgICogRGVidWcgbW9kZSBmb3IgdGhlIG1hdGVyaWFsLlxuICAgKiBZb3UgY2FuIHZpc3VhbGl6ZSBzZXZlcmFsIGNvbXBvbmVudHMgZm9yIGRpYWdub3NpcyB1c2luZyBkZWJ1ZyBtb2RlLlxuICAgKlxuICAgKiBTZWU6IHtAbGluayBNVG9vbk1hdGVyaWFsRGVidWdNb2RlfVxuICAgKi9cbiAgZ2V0IGRlYnVnTW9kZSgpOiBNVG9vbk1hdGVyaWFsRGVidWdNb2RlIHtcbiAgICByZXR1cm4gdGhpcy5fZGVidWdNb2RlO1xuICB9XG5cbiAgLyoqXG4gICAqIERlYnVnIG1vZGUgZm9yIHRoZSBtYXRlcmlhbC5cbiAgICogWW91IGNhbiB2aXN1YWxpemUgc2V2ZXJhbCBjb21wb25lbnRzIGZvciBkaWFnbm9zaXMgdXNpbmcgZGVidWcgbW9kZS5cbiAgICpcbiAgICogU2VlOiB7QGxpbmsgTVRvb25NYXRlcmlhbERlYnVnTW9kZX1cbiAgICovXG4gIHNldCBkZWJ1Z01vZGUobTogTVRvb25NYXRlcmlhbERlYnVnTW9kZSkge1xuICAgIHRoaXMuX2RlYnVnTW9kZSA9IG07XG5cbiAgICB0aGlzLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX291dGxpbmVXaWR0aE1vZGU6IE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlID0gTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUuTm9uZTtcblxuICBnZXQgb3V0bGluZVdpZHRoTW9kZSgpOiBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZSB7XG4gICAgcmV0dXJuIHRoaXMuX291dGxpbmVXaWR0aE1vZGU7XG4gIH1cbiAgc2V0IG91dGxpbmVXaWR0aE1vZGUobTogTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUpIHtcbiAgICB0aGlzLl9vdXRsaW5lV2lkdGhNb2RlID0gbTtcblxuICAgIHRoaXMubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfaXNPdXRsaW5lID0gZmFsc2U7XG5cbiAgZ2V0IGlzT3V0bGluZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faXNPdXRsaW5lO1xuICB9XG4gIHNldCBpc091dGxpbmUoYjogYm9vbGVhbikge1xuICAgIHRoaXMuX2lzT3V0bGluZSA9IGI7XG5cbiAgICB0aGlzLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWFkb25seSBib29sZWFuIHRoYXQgaW5kaWNhdGVzIHRoaXMgaXMgYSBbW01Ub29uTWF0ZXJpYWxdXS5cbiAgICovXG4gIHB1YmxpYyBnZXQgaXNNVG9vbk1hdGVyaWFsKCk6IHRydWUge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgY29uc3RydWN0b3IocGFyYW1ldGVyczogTVRvb25NYXRlcmlhbFBhcmFtZXRlcnMgPSB7fSkge1xuICAgIHN1cGVyKHsgdmVydGV4U2hhZGVyLCBmcmFnbWVudFNoYWRlciB9KTtcblxuICAgIC8vIG92ZXJyaWRlIGRlcHRoV3JpdGUgd2l0aCB0cmFuc3BhcmVudFdpdGhaV3JpdGVcbiAgICBpZiAocGFyYW1ldGVycy50cmFuc3BhcmVudFdpdGhaV3JpdGUpIHtcbiAgICAgIHBhcmFtZXRlcnMuZGVwdGhXcml0ZSA9IHRydWU7XG4gICAgfVxuICAgIGRlbGV0ZSBwYXJhbWV0ZXJzLnRyYW5zcGFyZW50V2l0aFpXcml0ZTtcblxuICAgIC8vID09IGVuYWJsaW5nIGJ1bmNoIG9mIHN0dWZmID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHBhcmFtZXRlcnMuZm9nID0gdHJ1ZTtcbiAgICBwYXJhbWV0ZXJzLmxpZ2h0cyA9IHRydWU7XG4gICAgcGFyYW1ldGVycy5jbGlwcGluZyA9IHRydWU7XG5cbiAgICAvLyA9PSB1bmlmb3JtcyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICB0aGlzLnVuaWZvcm1zID0gVEhSRUUuVW5pZm9ybXNVdGlscy5tZXJnZShbXG4gICAgICBUSFJFRS5Vbmlmb3Jtc0xpYi5jb21tb24sIC8vIG1hcFxuICAgICAgVEhSRUUuVW5pZm9ybXNMaWIubm9ybWFsbWFwLCAvLyBub3JtYWxNYXBcbiAgICAgIFRIUkVFLlVuaWZvcm1zTGliLmVtaXNzaXZlbWFwLCAvLyBlbWlzc2l2ZU1hcFxuICAgICAgVEhSRUUuVW5pZm9ybXNMaWIuZm9nLFxuICAgICAgVEhSRUUuVW5pZm9ybXNMaWIubGlnaHRzLFxuICAgICAge1xuICAgICAgICBsaXRGYWN0b3I6IHsgdmFsdWU6IG5ldyBUSFJFRS5Db2xvcigxLjAsIDEuMCwgMS4wKSB9LFxuICAgICAgICBtYXBVdlRyYW5zZm9ybTogeyB2YWx1ZTogbmV3IFRIUkVFLk1hdHJpeDMoKSB9LFxuICAgICAgICBjb2xvckFscGhhOiB7IHZhbHVlOiAxLjAgfSxcbiAgICAgICAgbm9ybWFsTWFwVXZUcmFuc2Zvcm06IHsgdmFsdWU6IG5ldyBUSFJFRS5NYXRyaXgzKCkgfSxcbiAgICAgICAgc2hhZGVDb2xvckZhY3RvcjogeyB2YWx1ZTogbmV3IFRIUkVFLkNvbG9yKDAuMCwgMC4wLCAwLjApIH0sXG4gICAgICAgIHNoYWRlTXVsdGlwbHlUZXh0dXJlOiB7IHZhbHVlOiBudWxsIH0sXG4gICAgICAgIHNoYWRlTXVsdGlwbHlUZXh0dXJlVXZUcmFuc2Zvcm06IHsgdmFsdWU6IG5ldyBUSFJFRS5NYXRyaXgzKCkgfSxcbiAgICAgICAgc2hhZGluZ1NoaWZ0RmFjdG9yOiB7IHZhbHVlOiAwLjAgfSxcbiAgICAgICAgc2hhZGluZ1NoaWZ0VGV4dHVyZTogeyB2YWx1ZTogbnVsbCB9LFxuICAgICAgICBzaGFkaW5nU2hpZnRUZXh0dXJlVXZUcmFuc2Zvcm06IHsgdmFsdWU6IG5ldyBUSFJFRS5NYXRyaXgzKCkgfSxcbiAgICAgICAgc2hhZGluZ1NoaWZ0VGV4dHVyZVNjYWxlOiB7IHZhbHVlOiAxLjAgfSxcbiAgICAgICAgc2hhZGluZ1Rvb255RmFjdG9yOiB7IHZhbHVlOiAwLjkgfSxcbiAgICAgICAgZ2lFcXVhbGl6YXRpb25GYWN0b3I6IHsgdmFsdWU6IDAuOSB9LFxuICAgICAgICBtYXRjYXBGYWN0b3I6IHsgdmFsdWU6IG5ldyBUSFJFRS5Db2xvcigxLjAsIDEuMCwgMS4wKSB9LFxuICAgICAgICBtYXRjYXBUZXh0dXJlOiB7IHZhbHVlOiBudWxsIH0sXG4gICAgICAgIG1hdGNhcFRleHR1cmVVdlRyYW5zZm9ybTogeyB2YWx1ZTogbmV3IFRIUkVFLk1hdHJpeDMoKSB9LFxuICAgICAgICBwYXJhbWV0cmljUmltQ29sb3JGYWN0b3I6IHsgdmFsdWU6IG5ldyBUSFJFRS5Db2xvcigwLjAsIDAuMCwgMC4wKSB9LFxuICAgICAgICByaW1NdWx0aXBseVRleHR1cmU6IHsgdmFsdWU6IG51bGwgfSxcbiAgICAgICAgcmltTXVsdGlwbHlUZXh0dXJlVXZUcmFuc2Zvcm06IHsgdmFsdWU6IG5ldyBUSFJFRS5NYXRyaXgzKCkgfSxcbiAgICAgICAgcmltTGlnaHRpbmdNaXhGYWN0b3I6IHsgdmFsdWU6IDEuMCB9LFxuICAgICAgICBwYXJhbWV0cmljUmltRnJlc25lbFBvd2VyRmFjdG9yOiB7IHZhbHVlOiA1LjAgfSxcbiAgICAgICAgcGFyYW1ldHJpY1JpbUxpZnRGYWN0b3I6IHsgdmFsdWU6IDAuMCB9LFxuICAgICAgICBlbWlzc2l2ZTogeyB2YWx1ZTogbmV3IFRIUkVFLkNvbG9yKDAuMCwgMC4wLCAwLjApIH0sXG4gICAgICAgIGVtaXNzaXZlSW50ZW5zaXR5OiB7IHZhbHVlOiAxLjAgfSxcbiAgICAgICAgZW1pc3NpdmVNYXBVdlRyYW5zZm9ybTogeyB2YWx1ZTogbmV3IFRIUkVFLk1hdHJpeDMoKSB9LFxuICAgICAgICBvdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmU6IHsgdmFsdWU6IG51bGwgfSxcbiAgICAgICAgb3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlVXZUcmFuc2Zvcm06IHsgdmFsdWU6IG5ldyBUSFJFRS5NYXRyaXgzKCkgfSxcbiAgICAgICAgb3V0bGluZVdpZHRoRmFjdG9yOiB7IHZhbHVlOiAwLjAgfSxcbiAgICAgICAgb3V0bGluZUNvbG9yRmFjdG9yOiB7IHZhbHVlOiBuZXcgVEhSRUUuQ29sb3IoMC4wLCAwLjAsIDAuMCkgfSxcbiAgICAgICAgb3V0bGluZUxpZ2h0aW5nTWl4RmFjdG9yOiB7IHZhbHVlOiAxLjAgfSxcbiAgICAgICAgdXZBbmltYXRpb25NYXNrVGV4dHVyZTogeyB2YWx1ZTogbnVsbCB9LFxuICAgICAgICB1dkFuaW1hdGlvbk1hc2tUZXh0dXJlVXZUcmFuc2Zvcm06IHsgdmFsdWU6IG5ldyBUSFJFRS5NYXRyaXgzKCkgfSxcbiAgICAgICAgdXZBbmltYXRpb25TY3JvbGxYT2Zmc2V0OiB7IHZhbHVlOiAwLjAgfSxcbiAgICAgICAgdXZBbmltYXRpb25TY3JvbGxZT2Zmc2V0OiB7IHZhbHVlOiAwLjAgfSxcbiAgICAgICAgdXZBbmltYXRpb25Sb3RhdGlvblBoYXNlOiB7IHZhbHVlOiAwLjAgfSxcbiAgICAgIH0sXG4gICAgICBwYXJhbWV0ZXJzLnVuaWZvcm1zID8/IHt9LFxuICAgIF0pIGFzIHR5cGVvZiBNVG9vbk1hdGVyaWFsLnByb3RvdHlwZS51bmlmb3JtcztcblxuICAgIC8vID09IGZpbmFsbHkgY29tcGlsZSB0aGUgc2hhZGVyIHByb2dyYW0gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHRoaXMuc2V0VmFsdWVzKHBhcmFtZXRlcnMpO1xuXG4gICAgLy8gPT0gdXBsb2FkIHVuaWZvcm1zIHRoYXQgbmVlZCB0byB1cGxvYWQgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgdGhpcy5fdXBsb2FkVW5pZm9ybXNXb3JrYXJvdW5kKCk7XG5cbiAgICAvLyA9PSB1cGRhdGUgc2hhZGVyIHN0dWZmID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICB0aGlzLmN1c3RvbVByb2dyYW1DYWNoZUtleSA9ICgpID0+XG4gICAgICBbXG4gICAgICAgIC4uLk9iamVjdC5lbnRyaWVzKHRoaXMuX2dlbmVyYXRlRGVmaW5lcygpKS5tYXAoKFt0b2tlbiwgbWFjcm9dKSA9PiBgJHt0b2tlbn06JHttYWNyb31gKSxcbiAgICAgICAgdGhpcy5tYXRjYXBUZXh0dXJlID8gYG1hdGNhcFRleHR1cmVDb2xvclNwYWNlOiR7Z2V0VGV4dHVyZUNvbG9yU3BhY2UodGhpcy5tYXRjYXBUZXh0dXJlKX1gIDogJycsXG4gICAgICAgIHRoaXMuc2hhZGVNdWx0aXBseVRleHR1cmVcbiAgICAgICAgICA/IGBzaGFkZU11bHRpcGx5VGV4dHVyZUNvbG9yU3BhY2U6JHtnZXRUZXh0dXJlQ29sb3JTcGFjZSh0aGlzLnNoYWRlTXVsdGlwbHlUZXh0dXJlKX1gXG4gICAgICAgICAgOiAnJyxcbiAgICAgICAgdGhpcy5yaW1NdWx0aXBseVRleHR1cmUgPyBgcmltTXVsdGlwbHlUZXh0dXJlQ29sb3JTcGFjZToke2dldFRleHR1cmVDb2xvclNwYWNlKHRoaXMucmltTXVsdGlwbHlUZXh0dXJlKX1gIDogJycsXG4gICAgICBdLmpvaW4oJywnKTtcblxuICAgIHRoaXMub25CZWZvcmVDb21waWxlID0gKHNoYWRlcikgPT4ge1xuICAgICAgY29uc3QgdGhyZWVSZXZpc2lvbiA9IHBhcnNlSW50KFRIUkVFLlJFVklTSU9OLCAxMCk7XG5cbiAgICAgIGNvbnN0IGRlZmluZXMgPVxuICAgICAgICBPYmplY3QuZW50cmllcyh7IC4uLnRoaXMuX2dlbmVyYXRlRGVmaW5lcygpLCAuLi50aGlzLmRlZmluZXMgfSlcbiAgICAgICAgICAuZmlsdGVyKChbdG9rZW4sIG1hY3JvXSkgPT4gISFtYWNybylcbiAgICAgICAgICAubWFwKChbdG9rZW4sIG1hY3JvXSkgPT4gYCNkZWZpbmUgJHt0b2tlbn0gJHttYWNyb31gKVxuICAgICAgICAgIC5qb2luKCdcXG4nKSArICdcXG4nO1xuXG4gICAgICAvLyAtLSBnZW5lcmF0ZSBzaGFkZXIgY29kZSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICBzaGFkZXIudmVydGV4U2hhZGVyID0gZGVmaW5lcyArIHNoYWRlci52ZXJ0ZXhTaGFkZXI7XG4gICAgICBzaGFkZXIuZnJhZ21lbnRTaGFkZXIgPSBkZWZpbmVzICsgc2hhZGVyLmZyYWdtZW50U2hhZGVyO1xuXG4gICAgICAvLyAtLSBjb21wYXQgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgIC8vIENPTVBBVDogcHJlLXIxNTRcbiAgICAgIC8vIFRocmVlLmpzIHIxNTQgcmVuYW1lcyB0aGUgc2hhZGVyIGNodW5rIDxjb2xvcnNwYWNlX2ZyYWdtZW50PiB0byA8ZW5jb2RpbmdzX2ZyYWdtZW50PlxuICAgICAgaWYgKHRocmVlUmV2aXNpb24gPCAxNTQpIHtcbiAgICAgICAgc2hhZGVyLmZyYWdtZW50U2hhZGVyID0gc2hhZGVyLmZyYWdtZW50U2hhZGVyLnJlcGxhY2UoXG4gICAgICAgICAgJyNpbmNsdWRlIDxjb2xvcnNwYWNlX2ZyYWdtZW50PicsXG4gICAgICAgICAgJyNpbmNsdWRlIDxlbmNvZGluZ3NfZnJhZ21lbnQ+JyxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGlzIG1hdGVyaWFsLlxuICAgKlxuICAgKiBAcGFyYW0gZGVsdGEgZGVsdGFUaW1lIHNpbmNlIGxhc3QgdXBkYXRlXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl91cGxvYWRVbmlmb3Jtc1dvcmthcm91bmQoKTtcbiAgICB0aGlzLl91cGRhdGVVVkFuaW1hdGlvbihkZWx0YSk7XG4gIH1cblxuICBwdWJsaWMgY29weShzb3VyY2U6IHRoaXMpOiB0aGlzIHtcbiAgICBzdXBlci5jb3B5KHNvdXJjZSk7XG4gICAgLy8gdW5pZm9ybXMgYXJlIGFscmVhZHkgY29waWVkIGF0IHRoaXMgbW9tZW50XG5cbiAgICAvLyBCZWdpbm5pbmcgZnJvbSByMTMzLCB1bmlmb3JtIHRleHR1cmVzIHdpbGwgYmUgY2xvbmVkIGluc3RlYWQgb2YgcmVmZXJlbmNlXG4gICAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vbXJkb29iL3RocmVlLmpzL2Jsb2IvYTg4MTNiZTA0YTg0OWJkMTU1ZjdjZjZmMWIyM2Q4ZWUyZTBmYjQ4Yi9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyLmpzI0wzMDQ3XG4gICAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vbXJkb29iL3RocmVlLmpzL2Jsb2IvYTg4MTNiZTA0YTg0OWJkMTU1ZjdjZjZmMWIyM2Q4ZWUyZTBmYjQ4Yi9zcmMvcmVuZGVyZXJzL3NoYWRlcnMvVW5pZm9ybXNVdGlscy5qcyNMMjJcbiAgICAvLyBUaGlzIHdpbGwgbGVhdmUgdGhlaXIgYC52ZXJzaW9uYCB0byBiZSBgMGBcbiAgICAvLyBhbmQgdGhlc2UgdGV4dHVyZXMgd29uJ3QgYmUgdXBsb2FkZWQgdG8gR1BVXG4gICAgLy8gV2UgYXJlIGdvaW5nIHRvIHdvcmthcm91bmQgdGhpcyBpbiBoZXJlXG4gICAgLy8gSSd2ZSBvcGVuZWQgYW4gaXNzdWUgZm9yIHRoaXM6IGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvaXNzdWVzLzIyNzE4XG4gICAgdGhpcy5tYXAgPSBzb3VyY2UubWFwO1xuICAgIHRoaXMubm9ybWFsTWFwID0gc291cmNlLm5vcm1hbE1hcDtcbiAgICB0aGlzLmVtaXNzaXZlTWFwID0gc291cmNlLmVtaXNzaXZlTWFwO1xuICAgIHRoaXMuc2hhZGVNdWx0aXBseVRleHR1cmUgPSBzb3VyY2Uuc2hhZGVNdWx0aXBseVRleHR1cmU7XG4gICAgdGhpcy5zaGFkaW5nU2hpZnRUZXh0dXJlID0gc291cmNlLnNoYWRpbmdTaGlmdFRleHR1cmU7XG4gICAgdGhpcy5tYXRjYXBUZXh0dXJlID0gc291cmNlLm1hdGNhcFRleHR1cmU7XG4gICAgdGhpcy5yaW1NdWx0aXBseVRleHR1cmUgPSBzb3VyY2UucmltTXVsdGlwbHlUZXh0dXJlO1xuICAgIHRoaXMub3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlID0gc291cmNlLm91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZTtcbiAgICB0aGlzLnV2QW5pbWF0aW9uTWFza1RleHR1cmUgPSBzb3VyY2UudXZBbmltYXRpb25NYXNrVGV4dHVyZTtcblxuICAgIC8vID09IGNvcHkgbWVtYmVycyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHRoaXMubm9ybWFsTWFwVHlwZSA9IHNvdXJjZS5ub3JtYWxNYXBUeXBlO1xuXG4gICAgdGhpcy51dkFuaW1hdGlvblNjcm9sbFhTcGVlZEZhY3RvciA9IHNvdXJjZS51dkFuaW1hdGlvblNjcm9sbFhTcGVlZEZhY3RvcjtcbiAgICB0aGlzLnV2QW5pbWF0aW9uU2Nyb2xsWVNwZWVkRmFjdG9yID0gc291cmNlLnV2QW5pbWF0aW9uU2Nyb2xsWVNwZWVkRmFjdG9yO1xuICAgIHRoaXMudXZBbmltYXRpb25Sb3RhdGlvblNwZWVkRmFjdG9yID0gc291cmNlLnV2QW5pbWF0aW9uUm90YXRpb25TcGVlZEZhY3RvcjtcblxuICAgIHRoaXMuaWdub3JlVmVydGV4Q29sb3IgPSBzb3VyY2UuaWdub3JlVmVydGV4Q29sb3I7XG5cbiAgICB0aGlzLnYwQ29tcGF0U2hhZGUgPSBzb3VyY2UudjBDb21wYXRTaGFkZTtcbiAgICB0aGlzLmRlYnVnTW9kZSA9IHNvdXJjZS5kZWJ1Z01vZGU7XG4gICAgdGhpcy5vdXRsaW5lV2lkdGhNb2RlID0gc291cmNlLm91dGxpbmVXaWR0aE1vZGU7XG5cbiAgICB0aGlzLmlzT3V0bGluZSA9IHNvdXJjZS5pc091dGxpbmU7XG5cbiAgICAvLyA9PSB1cGRhdGUgc2hhZGVyIHN0dWZmID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICB0aGlzLm5lZWRzVXBkYXRlID0gdHJ1ZTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBVViBhbmltYXRpb24gc3RhdGUuXG4gICAqIEludGVuZGVkIHRvIGJlIGNhbGxlZCB2aWEge0BsaW5rIHVwZGF0ZX0uXG4gICAqIEBwYXJhbSBkZWx0YSBkZWx0YVRpbWVcbiAgICovXG4gIHByaXZhdGUgX3VwZGF0ZVVWQW5pbWF0aW9uKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnVuaWZvcm1zLnV2QW5pbWF0aW9uU2Nyb2xsWE9mZnNldC52YWx1ZSArPSBkZWx0YSAqIHRoaXMudXZBbmltYXRpb25TY3JvbGxYU3BlZWRGYWN0b3I7XG4gICAgdGhpcy51bmlmb3Jtcy51dkFuaW1hdGlvblNjcm9sbFlPZmZzZXQudmFsdWUgKz0gZGVsdGEgKiB0aGlzLnV2QW5pbWF0aW9uU2Nyb2xsWVNwZWVkRmFjdG9yO1xuICAgIHRoaXMudW5pZm9ybXMudXZBbmltYXRpb25Sb3RhdGlvblBoYXNlLnZhbHVlICs9IGRlbHRhICogdGhpcy51dkFuaW1hdGlvblJvdGF0aW9uU3BlZWRGYWN0b3I7XG4gICAgdGhpcy51bmlmb3Jtcy5hbHBoYVRlc3QudmFsdWUgPSB0aGlzLmFscGhhVGVzdDtcblxuICAgIHRoaXMudW5pZm9ybXNOZWVkVXBkYXRlID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGxvYWQgdW5pZm9ybXMgdGhhdCBuZWVkIHRvIHVwbG9hZCBidXQgZG9lc24ndCBhdXRvbWF0aWNhbGx5IGJlY2F1c2Ugb2YgcmVhc29ucy5cbiAgICogSW50ZW5kZWQgdG8gYmUgY2FsbGVkIHZpYSB7QGxpbmsgY29uc3RydWN0b3J9IGFuZCB7QGxpbmsgdXBkYXRlfS5cbiAgICovXG4gIHByaXZhdGUgX3VwbG9hZFVuaWZvcm1zV29ya2Fyb3VuZCgpOiB2b2lkIHtcbiAgICAvLyB3b3JrYXJvdW5kOiBzaW5jZSBvcGFjaXR5IGlzIGRlZmluZWQgYXMgYSBwcm9wZXJ0eSBpbiBUSFJFRS5NYXRlcmlhbFxuICAgIC8vIGFuZCBjYW5ub3QgYmUgb3ZlcnJpZGRlbiBhcyBhbiBhY2Nlc3NvcixcbiAgICAvLyBXZSBhcmUgZ29pbmcgdG8gdXBkYXRlIG9wYWNpdHkgaGVyZVxuICAgIHRoaXMudW5pZm9ybXMub3BhY2l0eS52YWx1ZSA9IHRoaXMub3BhY2l0eTtcblxuICAgIC8vIHdvcmthcm91bmQ6IHRleHR1cmUgdHJhbnNmb3JtcyBhcmUgbm90IHVwZGF0ZWQgYXV0b21hdGljYWxseVxuICAgIHRoaXMuX3VwZGF0ZVRleHR1cmVNYXRyaXgodGhpcy51bmlmb3Jtcy5tYXAsIHRoaXMudW5pZm9ybXMubWFwVXZUcmFuc2Zvcm0pO1xuICAgIHRoaXMuX3VwZGF0ZVRleHR1cmVNYXRyaXgodGhpcy51bmlmb3Jtcy5ub3JtYWxNYXAsIHRoaXMudW5pZm9ybXMubm9ybWFsTWFwVXZUcmFuc2Zvcm0pO1xuICAgIHRoaXMuX3VwZGF0ZVRleHR1cmVNYXRyaXgodGhpcy51bmlmb3Jtcy5lbWlzc2l2ZU1hcCwgdGhpcy51bmlmb3Jtcy5lbWlzc2l2ZU1hcFV2VHJhbnNmb3JtKTtcbiAgICB0aGlzLl91cGRhdGVUZXh0dXJlTWF0cml4KHRoaXMudW5pZm9ybXMuc2hhZGVNdWx0aXBseVRleHR1cmUsIHRoaXMudW5pZm9ybXMuc2hhZGVNdWx0aXBseVRleHR1cmVVdlRyYW5zZm9ybSk7XG4gICAgdGhpcy5fdXBkYXRlVGV4dHVyZU1hdHJpeCh0aGlzLnVuaWZvcm1zLnNoYWRpbmdTaGlmdFRleHR1cmUsIHRoaXMudW5pZm9ybXMuc2hhZGluZ1NoaWZ0VGV4dHVyZVV2VHJhbnNmb3JtKTtcbiAgICB0aGlzLl91cGRhdGVUZXh0dXJlTWF0cml4KHRoaXMudW5pZm9ybXMubWF0Y2FwVGV4dHVyZSwgdGhpcy51bmlmb3Jtcy5tYXRjYXBUZXh0dXJlVXZUcmFuc2Zvcm0pO1xuICAgIHRoaXMuX3VwZGF0ZVRleHR1cmVNYXRyaXgodGhpcy51bmlmb3Jtcy5yaW1NdWx0aXBseVRleHR1cmUsIHRoaXMudW5pZm9ybXMucmltTXVsdGlwbHlUZXh0dXJlVXZUcmFuc2Zvcm0pO1xuICAgIHRoaXMuX3VwZGF0ZVRleHR1cmVNYXRyaXgoXG4gICAgICB0aGlzLnVuaWZvcm1zLm91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZSxcbiAgICAgIHRoaXMudW5pZm9ybXMub3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlVXZUcmFuc2Zvcm0sXG4gICAgKTtcbiAgICB0aGlzLl91cGRhdGVUZXh0dXJlTWF0cml4KHRoaXMudW5pZm9ybXMudXZBbmltYXRpb25NYXNrVGV4dHVyZSwgdGhpcy51bmlmb3Jtcy51dkFuaW1hdGlvbk1hc2tUZXh0dXJlVXZUcmFuc2Zvcm0pO1xuXG4gICAgdGhpcy51bmlmb3Jtc05lZWRVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBtYXAgb2JqZWN0IG9mIHByZXByb2Nlc3NvciB0b2tlbiBhbmQgbWFjcm8gb2YgdGhlIHNoYWRlciBwcm9ncmFtLlxuICAgKi9cbiAgcHJpdmF0ZSBfZ2VuZXJhdGVEZWZpbmVzKCk6IHsgW3Rva2VuOiBzdHJpbmddOiBib29sZWFuIHwgbnVtYmVyIHwgc3RyaW5nIH0ge1xuICAgIGNvbnN0IHRocmVlUmV2aXNpb24gPSBwYXJzZUludChUSFJFRS5SRVZJU0lPTiwgMTApO1xuXG4gICAgY29uc3QgdXNlVXZJblZlcnQgPSB0aGlzLm91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZSAhPT0gbnVsbDtcbiAgICBjb25zdCB1c2VVdkluRnJhZyA9XG4gICAgICB0aGlzLm1hcCAhPT0gbnVsbCB8fFxuICAgICAgdGhpcy5ub3JtYWxNYXAgIT09IG51bGwgfHxcbiAgICAgIHRoaXMuZW1pc3NpdmVNYXAgIT09IG51bGwgfHxcbiAgICAgIHRoaXMuc2hhZGVNdWx0aXBseVRleHR1cmUgIT09IG51bGwgfHxcbiAgICAgIHRoaXMuc2hhZGluZ1NoaWZ0VGV4dHVyZSAhPT0gbnVsbCB8fFxuICAgICAgdGhpcy5yaW1NdWx0aXBseVRleHR1cmUgIT09IG51bGwgfHxcbiAgICAgIHRoaXMudXZBbmltYXRpb25NYXNrVGV4dHVyZSAhPT0gbnVsbDtcblxuICAgIHJldHVybiB7XG4gICAgICAvLyBUZW1wb3JhcnkgY29tcGF0IGFnYWluc3Qgc2hhZGVyIGNoYW5nZSBAIFRocmVlLmpzIHIxMjZcbiAgICAgIC8vIFNlZTogIzIxMjA1LCAjMjEzMDcsICMyMTI5OVxuICAgICAgVEhSRUVfVlJNX1RIUkVFX1JFVklTSU9OOiB0aHJlZVJldmlzaW9uLFxuXG4gICAgICBPVVRMSU5FOiB0aGlzLl9pc091dGxpbmUsXG4gICAgICBNVE9PTl9VU0VfVVY6IHVzZVV2SW5WZXJ0IHx8IHVzZVV2SW5GcmFnLCAvLyB3ZSBjYW4ndCB1c2UgYFVTRV9VVmAgLCBpdCB3aWxsIGJlIHJlZGVmaW5lZCBpbiBXZWJHTFByb2dyYW0uanNcbiAgICAgIE1UT09OX1VWU19WRVJURVhfT05MWTogdXNlVXZJblZlcnQgJiYgIXVzZVV2SW5GcmFnLFxuICAgICAgVjBfQ09NUEFUX1NIQURFOiB0aGlzLl92MENvbXBhdFNoYWRlLFxuICAgICAgVVNFX1NIQURFTVVMVElQTFlURVhUVVJFOiB0aGlzLnNoYWRlTXVsdGlwbHlUZXh0dXJlICE9PSBudWxsLFxuICAgICAgVVNFX1NIQURJTkdTSElGVFRFWFRVUkU6IHRoaXMuc2hhZGluZ1NoaWZ0VGV4dHVyZSAhPT0gbnVsbCxcbiAgICAgIFVTRV9NQVRDQVBURVhUVVJFOiB0aGlzLm1hdGNhcFRleHR1cmUgIT09IG51bGwsXG4gICAgICBVU0VfUklNTVVMVElQTFlURVhUVVJFOiB0aGlzLnJpbU11bHRpcGx5VGV4dHVyZSAhPT0gbnVsbCxcbiAgICAgIFVTRV9PVVRMSU5FV0lEVEhNVUxUSVBMWVRFWFRVUkU6IHRoaXMuX2lzT3V0bGluZSAmJiB0aGlzLm91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZSAhPT0gbnVsbCxcbiAgICAgIFVTRV9VVkFOSU1BVElPTk1BU0tURVhUVVJFOiB0aGlzLnV2QW5pbWF0aW9uTWFza1RleHR1cmUgIT09IG51bGwsXG4gICAgICBJR05PUkVfVkVSVEVYX0NPTE9SOiB0aGlzLl9pZ25vcmVWZXJ0ZXhDb2xvciA9PT0gdHJ1ZSxcbiAgICAgIERFQlVHX05PUk1BTDogdGhpcy5fZGVidWdNb2RlID09PSAnbm9ybWFsJyxcbiAgICAgIERFQlVHX0xJVFNIQURFUkFURTogdGhpcy5fZGVidWdNb2RlID09PSAnbGl0U2hhZGVSYXRlJyxcbiAgICAgIERFQlVHX1VWOiB0aGlzLl9kZWJ1Z01vZGUgPT09ICd1dicsXG4gICAgICBPVVRMSU5FX1dJRFRIX1NDUkVFTjpcbiAgICAgICAgdGhpcy5faXNPdXRsaW5lICYmIHRoaXMuX291dGxpbmVXaWR0aE1vZGUgPT09IE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlLlNjcmVlbkNvb3JkaW5hdGVzLFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVUZXh0dXJlTWF0cml4KHNyYzogVEhSRUUuSVVuaWZvcm08VEhSRUUuVGV4dHVyZSB8IG51bGw+LCBkc3Q6IFRIUkVFLklVbmlmb3JtPFRIUkVFLk1hdHJpeDM+KTogdm9pZCB7XG4gICAgaWYgKHNyYy52YWx1ZSkge1xuICAgICAgaWYgKHNyYy52YWx1ZS5tYXRyaXhBdXRvVXBkYXRlKSB7XG4gICAgICAgIHNyYy52YWx1ZS51cGRhdGVNYXRyaXgoKTtcbiAgICAgIH1cblxuICAgICAgZHN0LnZhbHVlLmNvcHkoc3JjLnZhbHVlLm1hdHJpeCk7XG4gICAgfVxuICB9XG59XG4iLCAiLy8gI2RlZmluZSBQSE9OR1xuXG52YXJ5aW5nIHZlYzMgdlZpZXdQb3NpdGlvbjtcblxuI2lmbmRlZiBGTEFUX1NIQURFRFxuICB2YXJ5aW5nIHZlYzMgdk5vcm1hbDtcbiNlbmRpZlxuXG4jaW5jbHVkZSA8Y29tbW9uPlxuXG4vLyAjaW5jbHVkZSA8dXZfcGFyc192ZXJ0ZXg+XG4jaWZkZWYgTVRPT05fVVNFX1VWXG4gIHZhcnlpbmcgdmVjMiB2VXY7XG5cbiAgLy8gQ09NUEFUOiBwcmUtcjE1MSB1c2VzIGEgY29tbW9uIHV2VHJhbnNmb3JtXG4gICNpZiBUSFJFRV9WUk1fVEhSRUVfUkVWSVNJT04gPCAxNTFcbiAgICB1bmlmb3JtIG1hdDMgdXZUcmFuc2Zvcm07XG4gICNlbmRpZlxuI2VuZGlmXG5cbi8vICNpbmNsdWRlIDx1djJfcGFyc192ZXJ0ZXg+XG4vLyBDT01BUFQ6IHByZS1yMTUxIHVzZXMgdXYyIGZvciBsaWdodE1hcCBhbmQgYW9NYXBcbiNpZiBUSFJFRV9WUk1fVEhSRUVfUkVWSVNJT04gPCAxNTFcbiAgI2lmIGRlZmluZWQoIFVTRV9MSUdIVE1BUCApIHx8IGRlZmluZWQoIFVTRV9BT01BUCApXG4gICAgYXR0cmlidXRlIHZlYzIgdXYyO1xuICAgIHZhcnlpbmcgdmVjMiB2VXYyO1xuICAgIHVuaWZvcm0gbWF0MyB1djJUcmFuc2Zvcm07XG4gICNlbmRpZlxuI2VuZGlmXG5cbi8vICNpbmNsdWRlIDxkaXNwbGFjZW1lbnRtYXBfcGFyc192ZXJ0ZXg+XG4vLyAjaW5jbHVkZSA8ZW52bWFwX3BhcnNfdmVydGV4PlxuI2luY2x1ZGUgPGNvbG9yX3BhcnNfdmVydGV4PlxuI2luY2x1ZGUgPGZvZ19wYXJzX3ZlcnRleD5cbiNpbmNsdWRlIDxtb3JwaHRhcmdldF9wYXJzX3ZlcnRleD5cbiNpbmNsdWRlIDxza2lubmluZ19wYXJzX3ZlcnRleD5cbiNpbmNsdWRlIDxzaGFkb3dtYXBfcGFyc192ZXJ0ZXg+XG4jaW5jbHVkZSA8bG9nZGVwdGhidWZfcGFyc192ZXJ0ZXg+XG4jaW5jbHVkZSA8Y2xpcHBpbmdfcGxhbmVzX3BhcnNfdmVydGV4PlxuXG4jaWZkZWYgVVNFX09VVExJTkVXSURUSE1VTFRJUExZVEVYVFVSRVxuICB1bmlmb3JtIHNhbXBsZXIyRCBvdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmU7XG4gIHVuaWZvcm0gbWF0MyBvdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmVVdlRyYW5zZm9ybTtcbiNlbmRpZlxuXG51bmlmb3JtIGZsb2F0IG91dGxpbmVXaWR0aEZhY3Rvcjtcblxudm9pZCBtYWluKCkge1xuXG4gIC8vICNpbmNsdWRlIDx1dl92ZXJ0ZXg+XG4gICNpZmRlZiBNVE9PTl9VU0VfVVZcbiAgICAvLyBDT01QQVQ6IHByZS1yMTUxIHVzZXMgYSBjb21tb24gdXZUcmFuc2Zvcm1cbiAgICAjaWYgVEhSRUVfVlJNX1RIUkVFX1JFVklTSU9OID49IDE1MVxuICAgICAgdlV2ID0gdXY7XG4gICAgI2Vsc2VcbiAgICAgIHZVdiA9ICggdXZUcmFuc2Zvcm0gKiB2ZWMzKCB1diwgMSApICkueHk7XG4gICAgI2VuZGlmXG4gICNlbmRpZlxuXG4gIC8vICNpbmNsdWRlIDx1djJfdmVydGV4PlxuICAvLyBDT01BUFQ6IHByZS1yMTUxIHVzZXMgdXYyIGZvciBsaWdodE1hcCBhbmQgYW9NYXBcbiAgI2lmIFRIUkVFX1ZSTV9USFJFRV9SRVZJU0lPTiA8IDE1MVxuICAgICNpZiBkZWZpbmVkKCBVU0VfTElHSFRNQVAgKSB8fCBkZWZpbmVkKCBVU0VfQU9NQVAgKVxuICAgICAgdlV2MiA9ICggdXYyVHJhbnNmb3JtICogdmVjMyggdXYyLCAxICkgKS54eTtcbiAgICAjZW5kaWZcbiAgI2VuZGlmXG5cbiAgI2luY2x1ZGUgPGNvbG9yX3ZlcnRleD5cblxuICAjaW5jbHVkZSA8YmVnaW5ub3JtYWxfdmVydGV4PlxuICAjaW5jbHVkZSA8bW9ycGhub3JtYWxfdmVydGV4PlxuICAjaW5jbHVkZSA8c2tpbmJhc2VfdmVydGV4PlxuICAjaW5jbHVkZSA8c2tpbm5vcm1hbF92ZXJ0ZXg+XG5cbiAgLy8gd2UgbmVlZCB0aGlzIHRvIGNvbXB1dGUgdGhlIG91dGxpbmUgcHJvcGVybHlcbiAgb2JqZWN0Tm9ybWFsID0gbm9ybWFsaXplKCBvYmplY3ROb3JtYWwgKTtcblxuICAjaW5jbHVkZSA8ZGVmYXVsdG5vcm1hbF92ZXJ0ZXg+XG5cbiAgI2lmbmRlZiBGTEFUX1NIQURFRCAvLyBOb3JtYWwgY29tcHV0ZWQgd2l0aCBkZXJpdmF0aXZlcyB3aGVuIEZMQVRfU0hBREVEXG4gICAgdk5vcm1hbCA9IG5vcm1hbGl6ZSggdHJhbnNmb3JtZWROb3JtYWwgKTtcbiAgI2VuZGlmXG5cbiAgI2luY2x1ZGUgPGJlZ2luX3ZlcnRleD5cblxuICAjaW5jbHVkZSA8bW9ycGh0YXJnZXRfdmVydGV4PlxuICAjaW5jbHVkZSA8c2tpbm5pbmdfdmVydGV4PlxuICAvLyAjaW5jbHVkZSA8ZGlzcGxhY2VtZW50bWFwX3ZlcnRleD5cbiAgI2luY2x1ZGUgPHByb2plY3RfdmVydGV4PlxuICAjaW5jbHVkZSA8bG9nZGVwdGhidWZfdmVydGV4PlxuICAjaW5jbHVkZSA8Y2xpcHBpbmdfcGxhbmVzX3ZlcnRleD5cblxuICB2Vmlld1Bvc2l0aW9uID0gLSBtdlBvc2l0aW9uLnh5ejtcblxuICAjaWZkZWYgT1VUTElORVxuICAgIGZsb2F0IHdvcmxkTm9ybWFsTGVuZ3RoID0gbGVuZ3RoKCB0cmFuc2Zvcm1lZE5vcm1hbCApO1xuICAgIHZlYzMgb3V0bGluZU9mZnNldCA9IG91dGxpbmVXaWR0aEZhY3RvciAqIHdvcmxkTm9ybWFsTGVuZ3RoICogb2JqZWN0Tm9ybWFsO1xuXG4gICAgI2lmZGVmIFVTRV9PVVRMSU5FV0lEVEhNVUxUSVBMWVRFWFRVUkVcbiAgICAgIHZlYzIgb3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlVXYgPSAoIG91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZVV2VHJhbnNmb3JtICogdmVjMyggdlV2LCAxICkgKS54eTtcbiAgICAgIGZsb2F0IG91dGxpbmVUZXggPSB0ZXh0dXJlMkQoIG91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZSwgb3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlVXYgKS5nO1xuICAgICAgb3V0bGluZU9mZnNldCAqPSBvdXRsaW5lVGV4O1xuICAgICNlbmRpZlxuXG4gICAgI2lmZGVmIE9VVExJTkVfV0lEVEhfU0NSRUVOXG4gICAgICBvdXRsaW5lT2Zmc2V0ICo9IHZWaWV3UG9zaXRpb24ueiAvIHByb2plY3Rpb25NYXRyaXhbIDEgXS55O1xuICAgICNlbmRpZlxuXG4gICAgZ2xfUG9zaXRpb24gPSBwcm9qZWN0aW9uTWF0cml4ICogbW9kZWxWaWV3TWF0cml4ICogdmVjNCggb3V0bGluZU9mZnNldCArIHRyYW5zZm9ybWVkLCAxLjAgKTtcblxuICAgIGdsX1Bvc2l0aW9uLnogKz0gMUUtNiAqIGdsX1Bvc2l0aW9uLnc7IC8vIGFudGktYXJ0aWZhY3QgbWFnaWNcbiAgI2VuZGlmXG5cbiAgI2luY2x1ZGUgPHdvcmxkcG9zX3ZlcnRleD5cbiAgLy8gI2luY2x1ZGUgPGVudm1hcF92ZXJ0ZXg+XG4gICNpbmNsdWRlIDxzaGFkb3dtYXBfdmVydGV4PlxuICAjaW5jbHVkZSA8Zm9nX3ZlcnRleD5cblxufSIsICIvLyAjZGVmaW5lIFBIT05HXG5cbnVuaWZvcm0gdmVjMyBsaXRGYWN0b3I7XG5cbnVuaWZvcm0gZmxvYXQgb3BhY2l0eTtcblxudW5pZm9ybSB2ZWMzIHNoYWRlQ29sb3JGYWN0b3I7XG4jaWZkZWYgVVNFX1NIQURFTVVMVElQTFlURVhUVVJFXG4gIHVuaWZvcm0gc2FtcGxlcjJEIHNoYWRlTXVsdGlwbHlUZXh0dXJlO1xuICB1bmlmb3JtIG1hdDMgc2hhZGVNdWx0aXBseVRleHR1cmVVdlRyYW5zZm9ybTtcbiNlbmRpZlxuXG51bmlmb3JtIGZsb2F0IHNoYWRpbmdTaGlmdEZhY3RvcjtcbnVuaWZvcm0gZmxvYXQgc2hhZGluZ1Rvb255RmFjdG9yO1xuXG4jaWZkZWYgVVNFX1NIQURJTkdTSElGVFRFWFRVUkVcbiAgdW5pZm9ybSBzYW1wbGVyMkQgc2hhZGluZ1NoaWZ0VGV4dHVyZTtcbiAgdW5pZm9ybSBtYXQzIHNoYWRpbmdTaGlmdFRleHR1cmVVdlRyYW5zZm9ybTtcbiAgdW5pZm9ybSBmbG9hdCBzaGFkaW5nU2hpZnRUZXh0dXJlU2NhbGU7XG4jZW5kaWZcblxudW5pZm9ybSBmbG9hdCBnaUVxdWFsaXphdGlvbkZhY3RvcjtcblxudW5pZm9ybSB2ZWMzIHBhcmFtZXRyaWNSaW1Db2xvckZhY3RvcjtcbiNpZmRlZiBVU0VfUklNTVVMVElQTFlURVhUVVJFXG4gIHVuaWZvcm0gc2FtcGxlcjJEIHJpbU11bHRpcGx5VGV4dHVyZTtcbiAgdW5pZm9ybSBtYXQzIHJpbU11bHRpcGx5VGV4dHVyZVV2VHJhbnNmb3JtO1xuI2VuZGlmXG51bmlmb3JtIGZsb2F0IHJpbUxpZ2h0aW5nTWl4RmFjdG9yO1xudW5pZm9ybSBmbG9hdCBwYXJhbWV0cmljUmltRnJlc25lbFBvd2VyRmFjdG9yO1xudW5pZm9ybSBmbG9hdCBwYXJhbWV0cmljUmltTGlmdEZhY3RvcjtcblxuI2lmZGVmIFVTRV9NQVRDQVBURVhUVVJFXG4gIHVuaWZvcm0gdmVjMyBtYXRjYXBGYWN0b3I7XG4gIHVuaWZvcm0gc2FtcGxlcjJEIG1hdGNhcFRleHR1cmU7XG4gIHVuaWZvcm0gbWF0MyBtYXRjYXBUZXh0dXJlVXZUcmFuc2Zvcm07XG4jZW5kaWZcblxudW5pZm9ybSB2ZWMzIGVtaXNzaXZlO1xudW5pZm9ybSBmbG9hdCBlbWlzc2l2ZUludGVuc2l0eTtcblxudW5pZm9ybSB2ZWMzIG91dGxpbmVDb2xvckZhY3RvcjtcbnVuaWZvcm0gZmxvYXQgb3V0bGluZUxpZ2h0aW5nTWl4RmFjdG9yO1xuXG4jaWZkZWYgVVNFX1VWQU5JTUFUSU9OTUFTS1RFWFRVUkVcbiAgdW5pZm9ybSBzYW1wbGVyMkQgdXZBbmltYXRpb25NYXNrVGV4dHVyZTtcbiAgdW5pZm9ybSBtYXQzIHV2QW5pbWF0aW9uTWFza1RleHR1cmVVdlRyYW5zZm9ybTtcbiNlbmRpZlxuXG51bmlmb3JtIGZsb2F0IHV2QW5pbWF0aW9uU2Nyb2xsWE9mZnNldDtcbnVuaWZvcm0gZmxvYXQgdXZBbmltYXRpb25TY3JvbGxZT2Zmc2V0O1xudW5pZm9ybSBmbG9hdCB1dkFuaW1hdGlvblJvdGF0aW9uUGhhc2U7XG5cbiNpbmNsdWRlIDxjb21tb24+XG4jaW5jbHVkZSA8cGFja2luZz5cbiNpbmNsdWRlIDxkaXRoZXJpbmdfcGFyc19mcmFnbWVudD5cbiNpbmNsdWRlIDxjb2xvcl9wYXJzX2ZyYWdtZW50PlxuXG4vLyAjaW5jbHVkZSA8dXZfcGFyc19mcmFnbWVudD5cbiNpZiAoIGRlZmluZWQoIE1UT09OX1VTRV9VViApICYmICFkZWZpbmVkKCBNVE9PTl9VVlNfVkVSVEVYX09OTFkgKSApXG4gIHZhcnlpbmcgdmVjMiB2VXY7XG4jZW5kaWZcblxuLy8gI2luY2x1ZGUgPHV2Ml9wYXJzX2ZyYWdtZW50PlxuLy8gQ09NQVBUOiBwcmUtcjE1MSB1c2VzIHV2MiBmb3IgbGlnaHRNYXAgYW5kIGFvTWFwXG4jaWYgVEhSRUVfVlJNX1RIUkVFX1JFVklTSU9OIDwgMTUxXG4gICNpZiBkZWZpbmVkKCBVU0VfTElHSFRNQVAgKSB8fCBkZWZpbmVkKCBVU0VfQU9NQVAgKVxuICAgIHZhcnlpbmcgdmVjMiB2VXYyO1xuICAjZW5kaWZcbiNlbmRpZlxuXG4jaW5jbHVkZSA8bWFwX3BhcnNfZnJhZ21lbnQ+XG5cbiNpZmRlZiBVU0VfTUFQXG4gIHVuaWZvcm0gbWF0MyBtYXBVdlRyYW5zZm9ybTtcbiNlbmRpZlxuXG4vLyAjaW5jbHVkZSA8YWxwaGFtYXBfcGFyc19mcmFnbWVudD5cblxuI2luY2x1ZGUgPGFscGhhdGVzdF9wYXJzX2ZyYWdtZW50PlxuXG4jaW5jbHVkZSA8YW9tYXBfcGFyc19mcmFnbWVudD5cbi8vICNpbmNsdWRlIDxsaWdodG1hcF9wYXJzX2ZyYWdtZW50PlxuI2luY2x1ZGUgPGVtaXNzaXZlbWFwX3BhcnNfZnJhZ21lbnQ+XG5cbiNpZmRlZiBVU0VfRU1JU1NJVkVNQVBcbiAgdW5pZm9ybSBtYXQzIGVtaXNzaXZlTWFwVXZUcmFuc2Zvcm07XG4jZW5kaWZcblxuLy8gI2luY2x1ZGUgPGVudm1hcF9jb21tb25fcGFyc19mcmFnbWVudD5cbi8vICNpbmNsdWRlIDxlbnZtYXBfcGFyc19mcmFnbWVudD5cbi8vICNpbmNsdWRlIDxjdWJlX3V2X3JlZmxlY3Rpb25fZnJhZ21lbnQ+XG4jaW5jbHVkZSA8Zm9nX3BhcnNfZnJhZ21lbnQ+XG5cbi8vICNpbmNsdWRlIDxic2Rmcz5cbi8vIENPTVBBVDogcHJlLXIxNTEgZG9lc24ndCBoYXZlIEJSREZfTGFtYmVydCBpbiA8Y29tbW9uPlxuI2lmIFRIUkVFX1ZSTV9USFJFRV9SRVZJU0lPTiA8IDE1MVxuICB2ZWMzIEJSREZfTGFtYmVydCggY29uc3QgaW4gdmVjMyBkaWZmdXNlQ29sb3IgKSB7XG4gICAgcmV0dXJuIFJFQ0lQUk9DQUxfUEkgKiBkaWZmdXNlQ29sb3I7XG4gIH1cbiNlbmRpZlxuXG4jaW5jbHVkZSA8bGlnaHRzX3BhcnNfYmVnaW4+XG5cbiNpbmNsdWRlIDxub3JtYWxfcGFyc19mcmFnbWVudD5cblxuLy8gI2luY2x1ZGUgPGxpZ2h0c19waG9uZ19wYXJzX2ZyYWdtZW50PlxudmFyeWluZyB2ZWMzIHZWaWV3UG9zaXRpb247XG5cbnN0cnVjdCBNVG9vbk1hdGVyaWFsIHtcbiAgdmVjMyBkaWZmdXNlQ29sb3I7XG4gIHZlYzMgc2hhZGVDb2xvcjtcbiAgZmxvYXQgc2hhZGluZ1NoaWZ0O1xufTtcblxuZmxvYXQgbGluZWFyc3RlcCggZmxvYXQgYSwgZmxvYXQgYiwgZmxvYXQgdCApIHtcbiAgcmV0dXJuIGNsYW1wKCAoIHQgLSBhICkgLyAoIGIgLSBhICksIDAuMCwgMS4wICk7XG59XG5cbi8qKlxuICogQ29udmVydCBOZG90TCBpbnRvIHRvb24gc2hhZGluZyBmYWN0b3IgdXNpbmcgc2hhZGluZ1NoaWZ0IGFuZCBzaGFkaW5nVG9vbnlcbiAqL1xuZmxvYXQgZ2V0U2hhZGluZyhcbiAgY29uc3QgaW4gZmxvYXQgZG90TkwsXG4gIGNvbnN0IGluIGZsb2F0IHNoYWRvdyxcbiAgY29uc3QgaW4gZmxvYXQgc2hhZGluZ1NoaWZ0XG4pIHtcbiAgZmxvYXQgc2hhZGluZyA9IGRvdE5MO1xuICBzaGFkaW5nID0gc2hhZGluZyArIHNoYWRpbmdTaGlmdDtcbiAgc2hhZGluZyA9IGxpbmVhcnN0ZXAoIC0xLjAgKyBzaGFkaW5nVG9vbnlGYWN0b3IsIDEuMCAtIHNoYWRpbmdUb29ueUZhY3Rvciwgc2hhZGluZyApO1xuICBzaGFkaW5nICo9IHNoYWRvdztcbiAgcmV0dXJuIHNoYWRpbmc7XG59XG5cbi8qKlxuICogTWl4IGRpZmZ1c2VDb2xvciBhbmQgc2hhZGVDb2xvciB1c2luZyBzaGFkaW5nIGZhY3RvciBhbmQgbGlnaHQgY29sb3JcbiAqL1xudmVjMyBnZXREaWZmdXNlKFxuICBjb25zdCBpbiBNVG9vbk1hdGVyaWFsIG1hdGVyaWFsLFxuICBjb25zdCBpbiBmbG9hdCBzaGFkaW5nLFxuICBpbiB2ZWMzIGxpZ2h0Q29sb3Jcbikge1xuICAjaWZkZWYgREVCVUdfTElUU0hBREVSQVRFXG4gICAgcmV0dXJuIHZlYzMoIEJSREZfTGFtYmVydCggc2hhZGluZyAqIGxpZ2h0Q29sb3IgKSApO1xuICAjZW5kaWZcblxuICB2ZWMzIGNvbCA9IGxpZ2h0Q29sb3IgKiBCUkRGX0xhbWJlcnQoIG1peCggbWF0ZXJpYWwuc2hhZGVDb2xvciwgbWF0ZXJpYWwuZGlmZnVzZUNvbG9yLCBzaGFkaW5nICkgKTtcblxuICAvLyBUaGUgXCJjb21tZW50IG91dCBpZiB5b3Ugd2FudCB0byBQQlIgYWJzb2x1dGVseVwiIGxpbmVcbiAgI2lmZGVmIFYwX0NPTVBBVF9TSEFERVxuICAgIGNvbCA9IG1pbiggY29sLCBtYXRlcmlhbC5kaWZmdXNlQ29sb3IgKTtcbiAgI2VuZGlmXG5cbiAgcmV0dXJuIGNvbDtcbn1cblxuLy8gQ09NUEFUOiBwcmUtcjE1NiB1c2VzIGEgc3RydWN0IEdlb21ldHJpY0NvbnRleHRcbiNpZiBUSFJFRV9WUk1fVEhSRUVfUkVWSVNJT04gPj0gMTU3XG4gIHZvaWQgUkVfRGlyZWN0X01Ub29uKCBjb25zdCBpbiBJbmNpZGVudExpZ2h0IGRpcmVjdExpZ2h0LCBjb25zdCBpbiB2ZWMzIGdlb21ldHJ5UG9zaXRpb24sIGNvbnN0IGluIHZlYzMgZ2VvbWV0cnlOb3JtYWwsIGNvbnN0IGluIHZlYzMgZ2VvbWV0cnlWaWV3RGlyLCBjb25zdCBpbiB2ZWMzIGdlb21ldHJ5Q2xlYXJjb2F0Tm9ybWFsLCBjb25zdCBpbiBNVG9vbk1hdGVyaWFsIG1hdGVyaWFsLCBjb25zdCBpbiBmbG9hdCBzaGFkb3csIGlub3V0IFJlZmxlY3RlZExpZ2h0IHJlZmxlY3RlZExpZ2h0ICkge1xuICAgIGZsb2F0IGRvdE5MID0gY2xhbXAoIGRvdCggZ2VvbWV0cnlOb3JtYWwsIGRpcmVjdExpZ2h0LmRpcmVjdGlvbiApLCAtMS4wLCAxLjAgKTtcbiAgICB2ZWMzIGlycmFkaWFuY2UgPSBkaXJlY3RMaWdodC5jb2xvcjtcblxuICAgIC8vIGRpcmVjdFNwZWN1bGFyIHdpbGwgYmUgdXNlZCBmb3IgcmltIGxpZ2h0aW5nLCBub3QgYW4gYWN0dWFsIHNwZWN1bGFyXG4gICAgcmVmbGVjdGVkTGlnaHQuZGlyZWN0U3BlY3VsYXIgKz0gaXJyYWRpYW5jZTtcblxuICAgIGlycmFkaWFuY2UgKj0gZG90Tkw7XG5cbiAgICBmbG9hdCBzaGFkaW5nID0gZ2V0U2hhZGluZyggZG90TkwsIHNoYWRvdywgbWF0ZXJpYWwuc2hhZGluZ1NoaWZ0ICk7XG5cbiAgICAvLyB0b29uIHNoYWRlZCBkaWZmdXNlXG4gICAgcmVmbGVjdGVkTGlnaHQuZGlyZWN0RGlmZnVzZSArPSBnZXREaWZmdXNlKCBtYXRlcmlhbCwgc2hhZGluZywgZGlyZWN0TGlnaHQuY29sb3IgKTtcbiAgfVxuXG4gIHZvaWQgUkVfSW5kaXJlY3REaWZmdXNlX01Ub29uKCBjb25zdCBpbiB2ZWMzIGlycmFkaWFuY2UsIGNvbnN0IGluIHZlYzMgZ2VvbWV0cnlQb3NpdGlvbiwgY29uc3QgaW4gdmVjMyBnZW9tZXRyeU5vcm1hbCwgY29uc3QgaW4gdmVjMyBnZW9tZXRyeVZpZXdEaXIsIGNvbnN0IGluIHZlYzMgZ2VvbWV0cnlDbGVhcmNvYXROb3JtYWwsIGNvbnN0IGluIE1Ub29uTWF0ZXJpYWwgbWF0ZXJpYWwsIGlub3V0IFJlZmxlY3RlZExpZ2h0IHJlZmxlY3RlZExpZ2h0ICkge1xuICAgIC8vIGluZGlyZWN0IGRpZmZ1c2Ugd2lsbCB1c2UgZGlmZnVzZUNvbG9yLCBubyBzaGFkZUNvbG9yIGludm9sdmVkXG4gICAgcmVmbGVjdGVkTGlnaHQuaW5kaXJlY3REaWZmdXNlICs9IGlycmFkaWFuY2UgKiBCUkRGX0xhbWJlcnQoIG1hdGVyaWFsLmRpZmZ1c2VDb2xvciApO1xuXG4gICAgLy8gZGlyZWN0U3BlY3VsYXIgd2lsbCBiZSB1c2VkIGZvciByaW0gbGlnaHRpbmcsIG5vdCBhbiBhY3R1YWwgc3BlY3VsYXJcbiAgICByZWZsZWN0ZWRMaWdodC5kaXJlY3RTcGVjdWxhciArPSBpcnJhZGlhbmNlO1xuICB9XG4jZWxzZVxuICB2b2lkIFJFX0RpcmVjdF9NVG9vbiggY29uc3QgaW4gSW5jaWRlbnRMaWdodCBkaXJlY3RMaWdodCwgY29uc3QgaW4gR2VvbWV0cmljQ29udGV4dCBnZW9tZXRyeSwgY29uc3QgaW4gTVRvb25NYXRlcmlhbCBtYXRlcmlhbCwgY29uc3QgaW4gZmxvYXQgc2hhZG93LCBpbm91dCBSZWZsZWN0ZWRMaWdodCByZWZsZWN0ZWRMaWdodCApIHtcbiAgICBmbG9hdCBkb3ROTCA9IGNsYW1wKCBkb3QoIGdlb21ldHJ5Lm5vcm1hbCwgZGlyZWN0TGlnaHQuZGlyZWN0aW9uICksIC0xLjAsIDEuMCApO1xuICAgIHZlYzMgaXJyYWRpYW5jZSA9IGRpcmVjdExpZ2h0LmNvbG9yO1xuXG4gICAgLy8gZGlyZWN0U3BlY3VsYXIgd2lsbCBiZSB1c2VkIGZvciByaW0gbGlnaHRpbmcsIG5vdCBhbiBhY3R1YWwgc3BlY3VsYXJcbiAgICByZWZsZWN0ZWRMaWdodC5kaXJlY3RTcGVjdWxhciArPSBpcnJhZGlhbmNlO1xuXG4gICAgaXJyYWRpYW5jZSAqPSBkb3ROTDtcblxuICAgIGZsb2F0IHNoYWRpbmcgPSBnZXRTaGFkaW5nKCBkb3ROTCwgc2hhZG93LCBtYXRlcmlhbC5zaGFkaW5nU2hpZnQgKTtcblxuICAgIC8vIHRvb24gc2hhZGVkIGRpZmZ1c2VcbiAgICByZWZsZWN0ZWRMaWdodC5kaXJlY3REaWZmdXNlICs9IGdldERpZmZ1c2UoIG1hdGVyaWFsLCBzaGFkaW5nLCBkaXJlY3RMaWdodC5jb2xvciApO1xuICB9XG5cbiAgdm9pZCBSRV9JbmRpcmVjdERpZmZ1c2VfTVRvb24oIGNvbnN0IGluIHZlYzMgaXJyYWRpYW5jZSwgY29uc3QgaW4gR2VvbWV0cmljQ29udGV4dCBnZW9tZXRyeSwgY29uc3QgaW4gTVRvb25NYXRlcmlhbCBtYXRlcmlhbCwgaW5vdXQgUmVmbGVjdGVkTGlnaHQgcmVmbGVjdGVkTGlnaHQgKSB7XG4gICAgLy8gaW5kaXJlY3QgZGlmZnVzZSB3aWxsIHVzZSBkaWZmdXNlQ29sb3IsIG5vIHNoYWRlQ29sb3IgaW52b2x2ZWRcbiAgICByZWZsZWN0ZWRMaWdodC5pbmRpcmVjdERpZmZ1c2UgKz0gaXJyYWRpYW5jZSAqIEJSREZfTGFtYmVydCggbWF0ZXJpYWwuZGlmZnVzZUNvbG9yICk7XG5cbiAgICAvLyBkaXJlY3RTcGVjdWxhciB3aWxsIGJlIHVzZWQgZm9yIHJpbSBsaWdodGluZywgbm90IGFuIGFjdHVhbCBzcGVjdWxhclxuICAgIHJlZmxlY3RlZExpZ2h0LmRpcmVjdFNwZWN1bGFyICs9IGlycmFkaWFuY2U7XG4gIH1cbiNlbmRpZlxuXG4jZGVmaW5lIFJFX0RpcmVjdCBSRV9EaXJlY3RfTVRvb25cbiNkZWZpbmUgUkVfSW5kaXJlY3REaWZmdXNlIFJFX0luZGlyZWN0RGlmZnVzZV9NVG9vblxuI2RlZmluZSBNYXRlcmlhbF9MaWdodFByb2JlTE9EKCBtYXRlcmlhbCApICgwKVxuXG4jaW5jbHVkZSA8c2hhZG93bWFwX3BhcnNfZnJhZ21lbnQ+XG4vLyAjaW5jbHVkZSA8YnVtcG1hcF9wYXJzX2ZyYWdtZW50PlxuXG4vLyAjaW5jbHVkZSA8bm9ybWFsbWFwX3BhcnNfZnJhZ21lbnQ+XG4jaWZkZWYgVVNFX05PUk1BTE1BUFxuXG4gIHVuaWZvcm0gc2FtcGxlcjJEIG5vcm1hbE1hcDtcbiAgdW5pZm9ybSBtYXQzIG5vcm1hbE1hcFV2VHJhbnNmb3JtO1xuICB1bmlmb3JtIHZlYzIgbm9ybWFsU2NhbGU7XG5cbiNlbmRpZlxuXG4vLyBDT01QQVQ6IHByZS1yMTUxXG4vLyBVU0VfTk9STUFMTUFQX09CSkVDVFNQQUNFIHVzZWQgdG8gYmUgT0JKRUNUU1BBQ0VfTk9STUFMTUFQIGluIHByZS1yMTUxXG4jaWYgZGVmaW5lZCggVVNFX05PUk1BTE1BUF9PQkpFQ1RTUEFDRSApIHx8IGRlZmluZWQoIE9CSkVDVFNQQUNFX05PUk1BTE1BUCApXG5cbiAgdW5pZm9ybSBtYXQzIG5vcm1hbE1hdHJpeDtcblxuI2VuZGlmXG5cbi8vIENPTVBBVDogcHJlLXIxNTFcbi8vIFVTRV9OT1JNQUxNQVBfVEFOR0VOVFNQQUNFIHVzZWQgdG8gYmUgVEFOR0VOVFNQQUNFX05PUk1BTE1BUCBpbiBwcmUtcjE1MVxuI2lmICEgZGVmaW5lZCAoIFVTRV9UQU5HRU5UICkgJiYgKCBkZWZpbmVkICggVVNFX05PUk1BTE1BUF9UQU5HRU5UU1BBQ0UgKSB8fCBkZWZpbmVkICggVEFOR0VOVFNQQUNFX05PUk1BTE1BUCApIClcblxuICAvLyBQZXItUGl4ZWwgVGFuZ2VudCBTcGFjZSBOb3JtYWwgTWFwcGluZ1xuICAvLyBodHRwOi8vaGFja3NvZmxpZmUuYmxvZ3Nwb3QuY2gvMjAwOS8xMS9wZXItcGl4ZWwtdGFuZ2VudC1zcGFjZS1ub3JtYWwtbWFwcGluZy5odG1sXG5cbiAgLy8gdGhyZWUtdnJtIHNwZWNpZmljIGNoYW5nZTogaXQgcmVxdWlyZXMgYHV2YCBhcyBhbiBpbnB1dCBpbiBvcmRlciB0byBzdXBwb3J0IHV2IHNjcm9sbHNcblxuICAvLyBUZW1wb3JhcnkgY29tcGF0IGFnYWluc3Qgc2hhZGVyIGNoYW5nZSBAIFRocmVlLmpzIHIxMjYsIHIxNTFcbiAgI2lmIFRIUkVFX1ZSTV9USFJFRV9SRVZJU0lPTiA+PSAxNTFcblxuICAgIG1hdDMgZ2V0VGFuZ2VudEZyYW1lKCB2ZWMzIGV5ZV9wb3MsIHZlYzMgc3VyZl9ub3JtLCB2ZWMyIHV2ICkge1xuXG4gICAgICB2ZWMzIHEwID0gZEZkeCggZXllX3Bvcy54eXogKTtcbiAgICAgIHZlYzMgcTEgPSBkRmR5KCBleWVfcG9zLnh5eiApO1xuICAgICAgdmVjMiBzdDAgPSBkRmR4KCB1di5zdCApO1xuICAgICAgdmVjMiBzdDEgPSBkRmR5KCB1di5zdCApO1xuXG4gICAgICB2ZWMzIE4gPSBzdXJmX25vcm07XG5cbiAgICAgIHZlYzMgcTFwZXJwID0gY3Jvc3MoIHExLCBOICk7XG4gICAgICB2ZWMzIHEwcGVycCA9IGNyb3NzKCBOLCBxMCApO1xuXG4gICAgICB2ZWMzIFQgPSBxMXBlcnAgKiBzdDAueCArIHEwcGVycCAqIHN0MS54O1xuICAgICAgdmVjMyBCID0gcTFwZXJwICogc3QwLnkgKyBxMHBlcnAgKiBzdDEueTtcblxuICAgICAgZmxvYXQgZGV0ID0gbWF4KCBkb3QoIFQsIFQgKSwgZG90KCBCLCBCICkgKTtcbiAgICAgIGZsb2F0IHNjYWxlID0gKCBkZXQgPT0gMC4wICkgPyAwLjAgOiBpbnZlcnNlc3FydCggZGV0ICk7XG5cbiAgICAgIHJldHVybiBtYXQzKCBUICogc2NhbGUsIEIgKiBzY2FsZSwgTiApO1xuXG4gICAgfVxuXG4gICNlbHNlXG5cbiAgICB2ZWMzIHBlcnR1cmJOb3JtYWwyQXJiKCB2ZWMyIHV2LCB2ZWMzIGV5ZV9wb3MsIHZlYzMgc3VyZl9ub3JtLCB2ZWMzIG1hcE4sIGZsb2F0IGZhY2VEaXJlY3Rpb24gKSB7XG5cbiAgICAgIHZlYzMgcTAgPSB2ZWMzKCBkRmR4KCBleWVfcG9zLnggKSwgZEZkeCggZXllX3Bvcy55ICksIGRGZHgoIGV5ZV9wb3MueiApICk7XG4gICAgICB2ZWMzIHExID0gdmVjMyggZEZkeSggZXllX3Bvcy54ICksIGRGZHkoIGV5ZV9wb3MueSApLCBkRmR5KCBleWVfcG9zLnogKSApO1xuICAgICAgdmVjMiBzdDAgPSBkRmR4KCB1di5zdCApO1xuICAgICAgdmVjMiBzdDEgPSBkRmR5KCB1di5zdCApO1xuXG4gICAgICB2ZWMzIE4gPSBub3JtYWxpemUoIHN1cmZfbm9ybSApO1xuXG4gICAgICB2ZWMzIHExcGVycCA9IGNyb3NzKCBxMSwgTiApO1xuICAgICAgdmVjMyBxMHBlcnAgPSBjcm9zcyggTiwgcTAgKTtcblxuICAgICAgdmVjMyBUID0gcTFwZXJwICogc3QwLnggKyBxMHBlcnAgKiBzdDEueDtcbiAgICAgIHZlYzMgQiA9IHExcGVycCAqIHN0MC55ICsgcTBwZXJwICogc3QxLnk7XG5cbiAgICAgIC8vIHRocmVlLXZybSBzcGVjaWZpYyBjaGFuZ2U6IFdvcmthcm91bmQgZm9yIHRoZSBpc3N1ZSB0aGF0IGhhcHBlbnMgd2hlbiBkZWx0YSBvZiB1diA9IDAuMFxuICAgICAgLy8gVE9ETzogSXMgdGhpcyBzdGlsbCByZXF1aXJlZD8gT3Igc2hhbGwgSSBtYWtlIGEgUFIgYWJvdXQgaXQ/XG4gICAgICBpZiAoIGxlbmd0aCggVCApID09IDAuMCB8fCBsZW5ndGgoIEIgKSA9PSAwLjAgKSB7XG4gICAgICAgIHJldHVybiBzdXJmX25vcm07XG4gICAgICB9XG5cbiAgICAgIGZsb2F0IGRldCA9IG1heCggZG90KCBULCBUICksIGRvdCggQiwgQiApICk7XG4gICAgICBmbG9hdCBzY2FsZSA9ICggZGV0ID09IDAuMCApID8gMC4wIDogZmFjZURpcmVjdGlvbiAqIGludmVyc2VzcXJ0KCBkZXQgKTtcblxuICAgICAgcmV0dXJuIG5vcm1hbGl6ZSggVCAqICggbWFwTi54ICogc2NhbGUgKSArIEIgKiAoIG1hcE4ueSAqIHNjYWxlICkgKyBOICogbWFwTi56ICk7XG5cbiAgICB9XG5cbiAgI2VuZGlmXG5cbiNlbmRpZlxuXG4vLyAjaW5jbHVkZSA8c3BlY3VsYXJtYXBfcGFyc19mcmFnbWVudD5cbiNpbmNsdWRlIDxsb2dkZXB0aGJ1Zl9wYXJzX2ZyYWdtZW50PlxuI2luY2x1ZGUgPGNsaXBwaW5nX3BsYW5lc19wYXJzX2ZyYWdtZW50PlxuXG4vLyA9PSBwb3N0IGNvcnJlY3Rpb24gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxudm9pZCBwb3N0Q29ycmVjdGlvbigpIHtcbiAgI2luY2x1ZGUgPHRvbmVtYXBwaW5nX2ZyYWdtZW50PlxuICAjaW5jbHVkZSA8Y29sb3JzcGFjZV9mcmFnbWVudD5cbiAgI2luY2x1ZGUgPGZvZ19mcmFnbWVudD5cbiAgI2luY2x1ZGUgPHByZW11bHRpcGxpZWRfYWxwaGFfZnJhZ21lbnQ+XG4gICNpbmNsdWRlIDxkaXRoZXJpbmdfZnJhZ21lbnQ+XG59XG5cbi8vID09IG1haW4gcHJvY2VkdXJlID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG52b2lkIG1haW4oKSB7XG4gICNpbmNsdWRlIDxjbGlwcGluZ19wbGFuZXNfZnJhZ21lbnQ+XG5cbiAgdmVjMiB1diA9IHZlYzIoMC41LCAwLjUpO1xuXG4gICNpZiAoIGRlZmluZWQoIE1UT09OX1VTRV9VViApICYmICFkZWZpbmVkKCBNVE9PTl9VVlNfVkVSVEVYX09OTFkgKSApXG4gICAgdXYgPSB2VXY7XG5cbiAgICBmbG9hdCB1dkFuaW1NYXNrID0gMS4wO1xuICAgICNpZmRlZiBVU0VfVVZBTklNQVRJT05NQVNLVEVYVFVSRVxuICAgICAgdmVjMiB1dkFuaW1hdGlvbk1hc2tUZXh0dXJlVXYgPSAoIHV2QW5pbWF0aW9uTWFza1RleHR1cmVVdlRyYW5zZm9ybSAqIHZlYzMoIHV2LCAxICkgKS54eTtcbiAgICAgIHV2QW5pbU1hc2sgPSB0ZXh0dXJlMkQoIHV2QW5pbWF0aW9uTWFza1RleHR1cmUsIHV2QW5pbWF0aW9uTWFza1RleHR1cmVVdiApLmI7XG4gICAgI2VuZGlmXG5cbiAgICBmbG9hdCB1dlJvdENvcyA9IGNvcyggdXZBbmltYXRpb25Sb3RhdGlvblBoYXNlICogdXZBbmltTWFzayApO1xuICAgIGZsb2F0IHV2Um90U2luID0gc2luKCB1dkFuaW1hdGlvblJvdGF0aW9uUGhhc2UgKiB1dkFuaW1NYXNrICk7XG4gICAgdXYgPSBtYXQyKCB1dlJvdENvcywgLXV2Um90U2luLCB1dlJvdFNpbiwgdXZSb3RDb3MgKSAqICggdXYgLSAwLjUgKSArIDAuNTtcbiAgICB1diA9IHV2ICsgdmVjMiggdXZBbmltYXRpb25TY3JvbGxYT2Zmc2V0LCB1dkFuaW1hdGlvblNjcm9sbFlPZmZzZXQgKSAqIHV2QW5pbU1hc2s7XG4gICNlbmRpZlxuXG4gICNpZmRlZiBERUJVR19VVlxuICAgIGdsX0ZyYWdDb2xvciA9IHZlYzQoIDAuMCwgMC4wLCAwLjAsIDEuMCApO1xuICAgICNpZiAoIGRlZmluZWQoIE1UT09OX1VTRV9VViApICYmICFkZWZpbmVkKCBNVE9PTl9VVlNfVkVSVEVYX09OTFkgKSApXG4gICAgICBnbF9GcmFnQ29sb3IgPSB2ZWM0KCB1diwgMC4wLCAxLjAgKTtcbiAgICAjZW5kaWZcbiAgICByZXR1cm47XG4gICNlbmRpZlxuXG4gIHZlYzQgZGlmZnVzZUNvbG9yID0gdmVjNCggbGl0RmFjdG9yLCBvcGFjaXR5ICk7XG4gIFJlZmxlY3RlZExpZ2h0IHJlZmxlY3RlZExpZ2h0ID0gUmVmbGVjdGVkTGlnaHQoIHZlYzMoIDAuMCApLCB2ZWMzKCAwLjAgKSwgdmVjMyggMC4wICksIHZlYzMoIDAuMCApICk7XG4gIHZlYzMgdG90YWxFbWlzc2l2ZVJhZGlhbmNlID0gZW1pc3NpdmUgKiBlbWlzc2l2ZUludGVuc2l0eTtcblxuICAjaW5jbHVkZSA8bG9nZGVwdGhidWZfZnJhZ21lbnQ+XG5cbiAgLy8gI2luY2x1ZGUgPG1hcF9mcmFnbWVudD5cbiAgI2lmZGVmIFVTRV9NQVBcbiAgICB2ZWMyIG1hcFV2ID0gKCBtYXBVdlRyYW5zZm9ybSAqIHZlYzMoIHV2LCAxICkgKS54eTtcbiAgICB2ZWM0IHNhbXBsZWREaWZmdXNlQ29sb3IgPSB0ZXh0dXJlMkQoIG1hcCwgbWFwVXYgKTtcbiAgICAjaWZkZWYgREVDT0RFX1ZJREVPX1RFWFRVUkVcbiAgICAgIHNhbXBsZWREaWZmdXNlQ29sb3IgPSB2ZWM0KCBtaXgoIHBvdyggc2FtcGxlZERpZmZ1c2VDb2xvci5yZ2IgKiAwLjk0Nzg2NzI5ODYgKyB2ZWMzKCAwLjA1MjEzMjcwMTQgKSwgdmVjMyggMi40ICkgKSwgc2FtcGxlZERpZmZ1c2VDb2xvci5yZ2IgKiAwLjA3NzM5OTM4MDgsIHZlYzMoIGxlc3NUaGFuRXF1YWwoIHNhbXBsZWREaWZmdXNlQ29sb3IucmdiLCB2ZWMzKCAwLjA0MDQ1ICkgKSApICksIHNhbXBsZWREaWZmdXNlQ29sb3IudyApO1xuICAgICNlbmRpZlxuICAgIGRpZmZ1c2VDb2xvciAqPSBzYW1wbGVkRGlmZnVzZUNvbG9yO1xuICAjZW5kaWZcblxuICAvLyAjaW5jbHVkZSA8Y29sb3JfZnJhZ21lbnQ+XG4gICNpZiAoIGRlZmluZWQoIFVTRV9DT0xPUiApICYmICFkZWZpbmVkKCBJR05PUkVfVkVSVEVYX0NPTE9SICkgKVxuICAgIGRpZmZ1c2VDb2xvci5yZ2IgKj0gdkNvbG9yO1xuICAjZW5kaWZcblxuICAvLyAjaW5jbHVkZSA8YWxwaGFtYXBfZnJhZ21lbnQ+XG5cbiAgI2luY2x1ZGUgPGFscGhhdGVzdF9mcmFnbWVudD5cblxuICAvLyAjaW5jbHVkZSA8c3BlY3VsYXJtYXBfZnJhZ21lbnQ+XG5cbiAgLy8gI2luY2x1ZGUgPG5vcm1hbF9mcmFnbWVudF9iZWdpbj5cbiAgZmxvYXQgZmFjZURpcmVjdGlvbiA9IGdsX0Zyb250RmFjaW5nID8gMS4wIDogLTEuMDtcblxuICAjaWZkZWYgRkxBVF9TSEFERURcblxuICAgIHZlYzMgZmR4ID0gZEZkeCggdlZpZXdQb3NpdGlvbiApO1xuICAgIHZlYzMgZmR5ID0gZEZkeSggdlZpZXdQb3NpdGlvbiApO1xuICAgIHZlYzMgbm9ybWFsID0gbm9ybWFsaXplKCBjcm9zcyggZmR4LCBmZHkgKSApO1xuXG4gICNlbHNlXG5cbiAgICB2ZWMzIG5vcm1hbCA9IG5vcm1hbGl6ZSggdk5vcm1hbCApO1xuXG4gICAgI2lmZGVmIERPVUJMRV9TSURFRFxuXG4gICAgICBub3JtYWwgKj0gZmFjZURpcmVjdGlvbjtcblxuICAgICNlbmRpZlxuXG4gICNlbmRpZlxuXG4gICNpZmRlZiBVU0VfTk9STUFMTUFQXG5cbiAgICB2ZWMyIG5vcm1hbE1hcFV2ID0gKCBub3JtYWxNYXBVdlRyYW5zZm9ybSAqIHZlYzMoIHV2LCAxICkgKS54eTtcblxuICAjZW5kaWZcblxuICAjaWZkZWYgVVNFX05PUk1BTE1BUF9UQU5HRU5UU1BBQ0VcblxuICAgICNpZmRlZiBVU0VfVEFOR0VOVFxuXG4gICAgICBtYXQzIHRibiA9IG1hdDMoIG5vcm1hbGl6ZSggdlRhbmdlbnQgKSwgbm9ybWFsaXplKCB2Qml0YW5nZW50ICksIG5vcm1hbCApO1xuXG4gICAgI2Vsc2VcblxuICAgICAgbWF0MyB0Ym4gPSBnZXRUYW5nZW50RnJhbWUoIC0gdlZpZXdQb3NpdGlvbiwgbm9ybWFsLCBub3JtYWxNYXBVdiApO1xuXG4gICAgI2VuZGlmXG5cbiAgICAjaWYgZGVmaW5lZCggRE9VQkxFX1NJREVEICkgJiYgISBkZWZpbmVkKCBGTEFUX1NIQURFRCApXG5cbiAgICAgIHRiblswXSAqPSBmYWNlRGlyZWN0aW9uO1xuICAgICAgdGJuWzFdICo9IGZhY2VEaXJlY3Rpb247XG5cbiAgICAjZW5kaWZcblxuICAjZW5kaWZcblxuICAjaWZkZWYgVVNFX0NMRUFSQ09BVF9OT1JNQUxNQVBcblxuICAgICNpZmRlZiBVU0VfVEFOR0VOVFxuXG4gICAgICBtYXQzIHRibjIgPSBtYXQzKCBub3JtYWxpemUoIHZUYW5nZW50ICksIG5vcm1hbGl6ZSggdkJpdGFuZ2VudCApLCBub3JtYWwgKTtcblxuICAgICNlbHNlXG5cbiAgICAgIG1hdDMgdGJuMiA9IGdldFRhbmdlbnRGcmFtZSggLSB2Vmlld1Bvc2l0aW9uLCBub3JtYWwsIHZDbGVhcmNvYXROb3JtYWxNYXBVdiApO1xuXG4gICAgI2VuZGlmXG5cbiAgICAjaWYgZGVmaW5lZCggRE9VQkxFX1NJREVEICkgJiYgISBkZWZpbmVkKCBGTEFUX1NIQURFRCApXG5cbiAgICAgIHRibjJbMF0gKj0gZmFjZURpcmVjdGlvbjtcbiAgICAgIHRibjJbMV0gKj0gZmFjZURpcmVjdGlvbjtcblxuICAgICNlbmRpZlxuXG4gICNlbmRpZlxuXG4gIC8vIG5vbiBwZXJ0dXJiZWQgbm9ybWFsIGZvciBjbGVhcmNvYXQgYW1vbmcgb3RoZXJzXG5cbiAgdmVjMyBub25QZXJ0dXJiZWROb3JtYWwgPSBub3JtYWw7XG5cbiAgI2lmZGVmIE9VVExJTkVcbiAgICBub3JtYWwgKj0gLTEuMDtcbiAgI2VuZGlmXG5cbiAgLy8gI2luY2x1ZGUgPG5vcm1hbF9mcmFnbWVudF9tYXBzPlxuXG4gIC8vIENPTVBBVDogcHJlLXIxNTFcbiAgLy8gVVNFX05PUk1BTE1BUF9PQkpFQ1RTUEFDRSB1c2VkIHRvIGJlIE9CSkVDVFNQQUNFX05PUk1BTE1BUCBpbiBwcmUtcjE1MVxuICAjaWYgZGVmaW5lZCggVVNFX05PUk1BTE1BUF9PQkpFQ1RTUEFDRSApIHx8IGRlZmluZWQoIE9CSkVDVFNQQUNFX05PUk1BTE1BUCApXG5cbiAgICBub3JtYWwgPSB0ZXh0dXJlMkQoIG5vcm1hbE1hcCwgbm9ybWFsTWFwVXYgKS54eXogKiAyLjAgLSAxLjA7IC8vIG92ZXJyaWRlcyBib3RoIGZsYXRTaGFkaW5nIGFuZCBhdHRyaWJ1dGUgbm9ybWFsc1xuXG4gICAgI2lmZGVmIEZMSVBfU0lERURcblxuICAgICAgbm9ybWFsID0gLSBub3JtYWw7XG5cbiAgICAjZW5kaWZcblxuICAgICNpZmRlZiBET1VCTEVfU0lERURcblxuICAgICAgbm9ybWFsID0gbm9ybWFsICogZmFjZURpcmVjdGlvbjtcblxuICAgICNlbmRpZlxuXG4gICAgbm9ybWFsID0gbm9ybWFsaXplKCBub3JtYWxNYXRyaXggKiBub3JtYWwgKTtcblxuICAvLyBDT01QQVQ6IHByZS1yMTUxXG4gIC8vIFVTRV9OT1JNQUxNQVBfVEFOR0VOVFNQQUNFIHVzZWQgdG8gYmUgVEFOR0VOVFNQQUNFX05PUk1BTE1BUCBpbiBwcmUtcjE1MVxuICAjZWxpZiBkZWZpbmVkKCBVU0VfTk9STUFMTUFQX1RBTkdFTlRTUEFDRSApIHx8IGRlZmluZWQoIFRBTkdFTlRTUEFDRV9OT1JNQUxNQVAgKVxuXG4gICAgdmVjMyBtYXBOID0gdGV4dHVyZTJEKCBub3JtYWxNYXAsIG5vcm1hbE1hcFV2ICkueHl6ICogMi4wIC0gMS4wO1xuICAgIG1hcE4ueHkgKj0gbm9ybWFsU2NhbGU7XG5cbiAgICAvLyBDT01QQVQ6IHByZS1yMTUxXG4gICAgI2lmIFRIUkVFX1ZSTV9USFJFRV9SRVZJU0lPTiA+PSAxNTEgfHwgZGVmaW5lZCggVVNFX1RBTkdFTlQgKVxuXG4gICAgICBub3JtYWwgPSBub3JtYWxpemUoIHRibiAqIG1hcE4gKTtcblxuICAgICNlbHNlXG5cbiAgICAgIG5vcm1hbCA9IHBlcnR1cmJOb3JtYWwyQXJiKCB1diwgLXZWaWV3UG9zaXRpb24sIG5vcm1hbCwgbWFwTiwgZmFjZURpcmVjdGlvbiApO1xuXG4gICAgI2VuZGlmXG5cbiAgI2VuZGlmXG5cbiAgLy8gI2luY2x1ZGUgPGVtaXNzaXZlbWFwX2ZyYWdtZW50PlxuICAjaWZkZWYgVVNFX0VNSVNTSVZFTUFQXG4gICAgdmVjMiBlbWlzc2l2ZU1hcFV2ID0gKCBlbWlzc2l2ZU1hcFV2VHJhbnNmb3JtICogdmVjMyggdXYsIDEgKSApLnh5O1xuICAgIHRvdGFsRW1pc3NpdmVSYWRpYW5jZSAqPSB0ZXh0dXJlMkQoIGVtaXNzaXZlTWFwLCBlbWlzc2l2ZU1hcFV2ICkucmdiO1xuICAjZW5kaWZcblxuICAjaWZkZWYgREVCVUdfTk9STUFMXG4gICAgZ2xfRnJhZ0NvbG9yID0gdmVjNCggMC41ICsgMC41ICogbm9ybWFsLCAxLjAgKTtcbiAgICByZXR1cm47XG4gICNlbmRpZlxuXG4gIC8vIC0tIE1Ub29uOiBsaWdodGluZyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBhY2N1bXVsYXRpb25cbiAgLy8gI2luY2x1ZGUgPGxpZ2h0c19waG9uZ19mcmFnbWVudD5cbiAgTVRvb25NYXRlcmlhbCBtYXRlcmlhbDtcblxuICBtYXRlcmlhbC5kaWZmdXNlQ29sb3IgPSBkaWZmdXNlQ29sb3IucmdiO1xuXG4gIG1hdGVyaWFsLnNoYWRlQ29sb3IgPSBzaGFkZUNvbG9yRmFjdG9yO1xuICAjaWZkZWYgVVNFX1NIQURFTVVMVElQTFlURVhUVVJFXG4gICAgdmVjMiBzaGFkZU11bHRpcGx5VGV4dHVyZVV2ID0gKCBzaGFkZU11bHRpcGx5VGV4dHVyZVV2VHJhbnNmb3JtICogdmVjMyggdXYsIDEgKSApLnh5O1xuICAgIG1hdGVyaWFsLnNoYWRlQ29sb3IgKj0gdGV4dHVyZTJEKCBzaGFkZU11bHRpcGx5VGV4dHVyZSwgc2hhZGVNdWx0aXBseVRleHR1cmVVdiApLnJnYjtcbiAgI2VuZGlmXG5cbiAgI2lmICggZGVmaW5lZCggVVNFX0NPTE9SICkgJiYgIWRlZmluZWQoIElHTk9SRV9WRVJURVhfQ09MT1IgKSApXG4gICAgbWF0ZXJpYWwuc2hhZGVDb2xvci5yZ2IgKj0gdkNvbG9yO1xuICAjZW5kaWZcblxuICBtYXRlcmlhbC5zaGFkaW5nU2hpZnQgPSBzaGFkaW5nU2hpZnRGYWN0b3I7XG4gICNpZmRlZiBVU0VfU0hBRElOR1NISUZUVEVYVFVSRVxuICAgIHZlYzIgc2hhZGluZ1NoaWZ0VGV4dHVyZVV2ID0gKCBzaGFkaW5nU2hpZnRUZXh0dXJlVXZUcmFuc2Zvcm0gKiB2ZWMzKCB1diwgMSApICkueHk7XG4gICAgbWF0ZXJpYWwuc2hhZGluZ1NoaWZ0ICs9IHRleHR1cmUyRCggc2hhZGluZ1NoaWZ0VGV4dHVyZSwgc2hhZGluZ1NoaWZ0VGV4dHVyZVV2ICkuciAqIHNoYWRpbmdTaGlmdFRleHR1cmVTY2FsZTtcbiAgI2VuZGlmXG5cbiAgLy8gI2luY2x1ZGUgPGxpZ2h0c19mcmFnbWVudF9iZWdpbj5cblxuICAvLyBNVG9vbiBTcGVjaWZpYyBjaGFuZ2VzOlxuICAvLyBTaW5jZSB3ZSB3YW50IHRvIHRha2Ugc2hhZG93cyBpbnRvIGFjY291bnQgb2Ygc2hhZGluZyBpbnN0ZWFkIG9mIGlycmFkaWFuY2UsXG4gIC8vIHdlIGhhZCB0byBtb2RpZnkgdGhlIGNvZGVzIHRoYXQgbXVsdGlwbGllcyB0aGUgcmVzdWx0cyBvZiBzaGFkb3dtYXAgaW50byBjb2xvciBvZiBkaXJlY3QgbGlnaHRzLlxuXG4gIC8vIENPTVBBVDogcHJlLXIxNTYgdXNlcyBhIHN0cnVjdCBHZW9tZXRyaWNDb250ZXh0XG4gICNpZiBUSFJFRV9WUk1fVEhSRUVfUkVWSVNJT04gPj0gMTU3XG4gICAgdmVjMyBnZW9tZXRyeVBvc2l0aW9uID0gLSB2Vmlld1Bvc2l0aW9uO1xuICAgIHZlYzMgZ2VvbWV0cnlOb3JtYWwgPSBub3JtYWw7XG4gICAgdmVjMyBnZW9tZXRyeVZpZXdEaXIgPSAoIGlzT3J0aG9ncmFwaGljICkgPyB2ZWMzKCAwLCAwLCAxICkgOiBub3JtYWxpemUoIHZWaWV3UG9zaXRpb24gKTtcblxuICAgIHZlYzMgZ2VvbWV0cnlDbGVhcmNvYXROb3JtYWw7XG5cbiAgICAjaWZkZWYgVVNFX0NMRUFSQ09BVFxuXG4gICAgICBnZW9tZXRyeUNsZWFyY29hdE5vcm1hbCA9IGNsZWFyY29hdE5vcm1hbDtcblxuICAgICNlbmRpZlxuICAjZWxzZVxuICAgIEdlb21ldHJpY0NvbnRleHQgZ2VvbWV0cnk7XG5cbiAgICBnZW9tZXRyeS5wb3NpdGlvbiA9IC0gdlZpZXdQb3NpdGlvbjtcbiAgICBnZW9tZXRyeS5ub3JtYWwgPSBub3JtYWw7XG4gICAgZ2VvbWV0cnkudmlld0RpciA9ICggaXNPcnRob2dyYXBoaWMgKSA/IHZlYzMoIDAsIDAsIDEgKSA6IG5vcm1hbGl6ZSggdlZpZXdQb3NpdGlvbiApO1xuXG4gICAgI2lmZGVmIFVTRV9DTEVBUkNPQVRcblxuICAgICAgZ2VvbWV0cnkuY2xlYXJjb2F0Tm9ybWFsID0gY2xlYXJjb2F0Tm9ybWFsO1xuXG4gICAgI2VuZGlmXG4gICNlbmRpZlxuXG4gIEluY2lkZW50TGlnaHQgZGlyZWN0TGlnaHQ7XG5cbiAgLy8gc2luY2UgdGhlc2UgdmFyaWFibGVzIHdpbGwgYmUgdXNlZCBpbiB1bnJvbGxlZCBsb29wLCB3ZSBoYXZlIHRvIGRlZmluZSBpbiBwcmlvclxuICBmbG9hdCBzaGFkb3c7XG5cbiAgI2lmICggTlVNX1BPSU5UX0xJR0hUUyA+IDAgKSAmJiBkZWZpbmVkKCBSRV9EaXJlY3QgKVxuXG4gICAgUG9pbnRMaWdodCBwb2ludExpZ2h0O1xuICAgICNpZiBkZWZpbmVkKCBVU0VfU0hBRE9XTUFQICkgJiYgTlVNX1BPSU5UX0xJR0hUX1NIQURPV1MgPiAwXG4gICAgUG9pbnRMaWdodFNoYWRvdyBwb2ludExpZ2h0U2hhZG93O1xuICAgICNlbmRpZlxuXG4gICAgI3ByYWdtYSB1bnJvbGxfbG9vcF9zdGFydFxuICAgIGZvciAoIGludCBpID0gMDsgaSA8IE5VTV9QT0lOVF9MSUdIVFM7IGkgKysgKSB7XG5cbiAgICAgIHBvaW50TGlnaHQgPSBwb2ludExpZ2h0c1sgaSBdO1xuXG4gICAgICAvLyBDT01QQVQ6IHByZS1yMTU2IHVzZXMgYSBzdHJ1Y3QgR2VvbWV0cmljQ29udGV4dFxuICAgICAgI2lmIFRIUkVFX1ZSTV9USFJFRV9SRVZJU0lPTiA+PSAxNTdcbiAgICAgICAgZ2V0UG9pbnRMaWdodEluZm8oIHBvaW50TGlnaHQsIGdlb21ldHJ5UG9zaXRpb24sIGRpcmVjdExpZ2h0ICk7XG4gICAgICAjZWxzZVxuICAgICAgICBnZXRQb2ludExpZ2h0SW5mbyggcG9pbnRMaWdodCwgZ2VvbWV0cnksIGRpcmVjdExpZ2h0ICk7XG4gICAgICAjZW5kaWZcblxuICAgICAgc2hhZG93ID0gMS4wO1xuICAgICAgI2lmIGRlZmluZWQoIFVTRV9TSEFET1dNQVAgKSAmJiAoIFVOUk9MTEVEX0xPT1BfSU5ERVggPCBOVU1fUE9JTlRfTElHSFRfU0hBRE9XUyApXG4gICAgICBwb2ludExpZ2h0U2hhZG93ID0gcG9pbnRMaWdodFNoYWRvd3NbIGkgXTtcbiAgICAgIC8vIENPTVBBVDogcHJlLXIxNjZcbiAgICAgIC8vIHIxNjYgaW50cm9kdWNlZCBzaGFkb3dJbnRlbnNpdHlcbiAgICAgICNpZiBUSFJFRV9WUk1fVEhSRUVfUkVWSVNJT04gPj0gMTY2XG4gICAgICAgIHNoYWRvdyA9IGFsbCggYnZlYzIoIGRpcmVjdExpZ2h0LnZpc2libGUsIHJlY2VpdmVTaGFkb3cgKSApID8gZ2V0UG9pbnRTaGFkb3coIHBvaW50U2hhZG93TWFwWyBpIF0sIHBvaW50TGlnaHRTaGFkb3cuc2hhZG93TWFwU2l6ZSwgcG9pbnRMaWdodFNoYWRvdy5zaGFkb3dJbnRlbnNpdHksIHBvaW50TGlnaHRTaGFkb3cuc2hhZG93QmlhcywgcG9pbnRMaWdodFNoYWRvdy5zaGFkb3dSYWRpdXMsIHZQb2ludFNoYWRvd0Nvb3JkWyBpIF0sIHBvaW50TGlnaHRTaGFkb3cuc2hhZG93Q2FtZXJhTmVhciwgcG9pbnRMaWdodFNoYWRvdy5zaGFkb3dDYW1lcmFGYXIgKSA6IDEuMDtcbiAgICAgICNlbHNlXG4gICAgICAgIHNoYWRvdyA9IGFsbCggYnZlYzIoIGRpcmVjdExpZ2h0LnZpc2libGUsIHJlY2VpdmVTaGFkb3cgKSApID8gZ2V0UG9pbnRTaGFkb3coIHBvaW50U2hhZG93TWFwWyBpIF0sIHBvaW50TGlnaHRTaGFkb3cuc2hhZG93TWFwU2l6ZSwgcG9pbnRMaWdodFNoYWRvdy5zaGFkb3dCaWFzLCBwb2ludExpZ2h0U2hhZG93LnNoYWRvd1JhZGl1cywgdlBvaW50U2hhZG93Q29vcmRbIGkgXSwgcG9pbnRMaWdodFNoYWRvdy5zaGFkb3dDYW1lcmFOZWFyLCBwb2ludExpZ2h0U2hhZG93LnNoYWRvd0NhbWVyYUZhciApIDogMS4wO1xuICAgICAgI2VuZGlmXG4gICAgICAjZW5kaWZcblxuICAgICAgLy8gQ09NUEFUOiBwcmUtcjE1NiB1c2VzIGEgc3RydWN0IEdlb21ldHJpY0NvbnRleHRcbiAgICAgICNpZiBUSFJFRV9WUk1fVEhSRUVfUkVWSVNJT04gPj0gMTU3XG4gICAgICAgIFJFX0RpcmVjdCggZGlyZWN0TGlnaHQsIGdlb21ldHJ5UG9zaXRpb24sIGdlb21ldHJ5Tm9ybWFsLCBnZW9tZXRyeVZpZXdEaXIsIGdlb21ldHJ5Q2xlYXJjb2F0Tm9ybWFsLCBtYXRlcmlhbCwgc2hhZG93LCByZWZsZWN0ZWRMaWdodCApO1xuICAgICAgI2Vsc2VcbiAgICAgICAgUkVfRGlyZWN0KCBkaXJlY3RMaWdodCwgZ2VvbWV0cnksIG1hdGVyaWFsLCBzaGFkb3csIHJlZmxlY3RlZExpZ2h0ICk7XG4gICAgICAjZW5kaWZcblxuICAgIH1cbiAgICAjcHJhZ21hIHVucm9sbF9sb29wX2VuZFxuXG4gICNlbmRpZlxuXG4gICNpZiAoIE5VTV9TUE9UX0xJR0hUUyA+IDAgKSAmJiBkZWZpbmVkKCBSRV9EaXJlY3QgKVxuXG4gICAgU3BvdExpZ2h0IHNwb3RMaWdodDtcbiAgICAjaWYgZGVmaW5lZCggVVNFX1NIQURPV01BUCApICYmIE5VTV9TUE9UX0xJR0hUX1NIQURPV1MgPiAwXG4gICAgU3BvdExpZ2h0U2hhZG93IHNwb3RMaWdodFNoYWRvdztcbiAgICAjZW5kaWZcblxuICAgICNwcmFnbWEgdW5yb2xsX2xvb3Bfc3RhcnRcbiAgICBmb3IgKCBpbnQgaSA9IDA7IGkgPCBOVU1fU1BPVF9MSUdIVFM7IGkgKysgKSB7XG5cbiAgICAgIHNwb3RMaWdodCA9IHNwb3RMaWdodHNbIGkgXTtcblxuICAgICAgLy8gQ09NUEFUOiBwcmUtcjE1NiB1c2VzIGEgc3RydWN0IEdlb21ldHJpY0NvbnRleHRcbiAgICAgICNpZiBUSFJFRV9WUk1fVEhSRUVfUkVWSVNJT04gPj0gMTU3XG4gICAgICAgIGdldFNwb3RMaWdodEluZm8oIHNwb3RMaWdodCwgZ2VvbWV0cnlQb3NpdGlvbiwgZGlyZWN0TGlnaHQgKTtcbiAgICAgICNlbHNlXG4gICAgICAgIGdldFNwb3RMaWdodEluZm8oIHNwb3RMaWdodCwgZ2VvbWV0cnksIGRpcmVjdExpZ2h0ICk7XG4gICAgICAjZW5kaWZcblxuICAgICAgc2hhZG93ID0gMS4wO1xuICAgICAgI2lmIGRlZmluZWQoIFVTRV9TSEFET1dNQVAgKSAmJiAoIFVOUk9MTEVEX0xPT1BfSU5ERVggPCBOVU1fU1BPVF9MSUdIVF9TSEFET1dTIClcbiAgICAgIHNwb3RMaWdodFNoYWRvdyA9IHNwb3RMaWdodFNoYWRvd3NbIGkgXTtcbiAgICAgIC8vIENPTVBBVDogcHJlLXIxNjZcbiAgICAgIC8vIHIxNjYgaW50cm9kdWNlZCBzaGFkb3dJbnRlbnNpdHlcbiAgICAgICNpZiBUSFJFRV9WUk1fVEhSRUVfUkVWSVNJT04gPj0gMTY2XG4gICAgICAgIHNoYWRvdyA9IGFsbCggYnZlYzIoIGRpcmVjdExpZ2h0LnZpc2libGUsIHJlY2VpdmVTaGFkb3cgKSApID8gZ2V0U2hhZG93KCBzcG90U2hhZG93TWFwWyBpIF0sIHNwb3RMaWdodFNoYWRvdy5zaGFkb3dNYXBTaXplLCBzcG90TGlnaHRTaGFkb3cuc2hhZG93SW50ZW5zaXR5LCBzcG90TGlnaHRTaGFkb3cuc2hhZG93Qmlhcywgc3BvdExpZ2h0U2hhZG93LnNoYWRvd1JhZGl1cywgdlNwb3RTaGFkb3dDb29yZFsgaSBdICkgOiAxLjA7XG4gICAgICAjZWxzZVxuICAgICAgICBzaGFkb3cgPSBhbGwoIGJ2ZWMyKCBkaXJlY3RMaWdodC52aXNpYmxlLCByZWNlaXZlU2hhZG93ICkgKSA/IGdldFNoYWRvdyggc3BvdFNoYWRvd01hcFsgaSBdLCBzcG90TGlnaHRTaGFkb3cuc2hhZG93TWFwU2l6ZSwgc3BvdExpZ2h0U2hhZG93LnNoYWRvd0JpYXMsIHNwb3RMaWdodFNoYWRvdy5zaGFkb3dSYWRpdXMsIHZTcG90U2hhZG93Q29vcmRbIGkgXSApIDogMS4wO1xuICAgICAgI2VuZGlmXG4gICAgICAjZW5kaWZcblxuICAgICAgLy8gQ09NUEFUOiBwcmUtcjE1NiB1c2VzIGEgc3RydWN0IEdlb21ldHJpY0NvbnRleHRcbiAgICAgICNpZiBUSFJFRV9WUk1fVEhSRUVfUkVWSVNJT04gPj0gMTU3XG4gICAgICAgIFJFX0RpcmVjdCggZGlyZWN0TGlnaHQsIGdlb21ldHJ5UG9zaXRpb24sIGdlb21ldHJ5Tm9ybWFsLCBnZW9tZXRyeVZpZXdEaXIsIGdlb21ldHJ5Q2xlYXJjb2F0Tm9ybWFsLCBtYXRlcmlhbCwgc2hhZG93LCByZWZsZWN0ZWRMaWdodCApO1xuICAgICAgI2Vsc2VcbiAgICAgICAgUkVfRGlyZWN0KCBkaXJlY3RMaWdodCwgZ2VvbWV0cnksIG1hdGVyaWFsLCBzaGFkb3csIHJlZmxlY3RlZExpZ2h0ICk7XG4gICAgICAjZW5kaWZcblxuICAgIH1cbiAgICAjcHJhZ21hIHVucm9sbF9sb29wX2VuZFxuXG4gICNlbmRpZlxuXG4gICNpZiAoIE5VTV9ESVJfTElHSFRTID4gMCApICYmIGRlZmluZWQoIFJFX0RpcmVjdCApXG5cbiAgICBEaXJlY3Rpb25hbExpZ2h0IGRpcmVjdGlvbmFsTGlnaHQ7XG4gICAgI2lmIGRlZmluZWQoIFVTRV9TSEFET1dNQVAgKSAmJiBOVU1fRElSX0xJR0hUX1NIQURPV1MgPiAwXG4gICAgRGlyZWN0aW9uYWxMaWdodFNoYWRvdyBkaXJlY3Rpb25hbExpZ2h0U2hhZG93O1xuICAgICNlbmRpZlxuXG4gICAgI3ByYWdtYSB1bnJvbGxfbG9vcF9zdGFydFxuICAgIGZvciAoIGludCBpID0gMDsgaSA8IE5VTV9ESVJfTElHSFRTOyBpICsrICkge1xuXG4gICAgICBkaXJlY3Rpb25hbExpZ2h0ID0gZGlyZWN0aW9uYWxMaWdodHNbIGkgXTtcblxuICAgICAgLy8gQ09NUEFUOiBwcmUtcjE1NiB1c2VzIGEgc3RydWN0IEdlb21ldHJpY0NvbnRleHRcbiAgICAgICNpZiBUSFJFRV9WUk1fVEhSRUVfUkVWSVNJT04gPj0gMTU3XG4gICAgICAgIGdldERpcmVjdGlvbmFsTGlnaHRJbmZvKCBkaXJlY3Rpb25hbExpZ2h0LCBkaXJlY3RMaWdodCApO1xuICAgICAgI2Vsc2VcbiAgICAgICAgZ2V0RGlyZWN0aW9uYWxMaWdodEluZm8oIGRpcmVjdGlvbmFsTGlnaHQsIGdlb21ldHJ5LCBkaXJlY3RMaWdodCApO1xuICAgICAgI2VuZGlmXG5cbiAgICAgIHNoYWRvdyA9IDEuMDtcbiAgICAgICNpZiBkZWZpbmVkKCBVU0VfU0hBRE9XTUFQICkgJiYgKCBVTlJPTExFRF9MT09QX0lOREVYIDwgTlVNX0RJUl9MSUdIVF9TSEFET1dTIClcbiAgICAgIGRpcmVjdGlvbmFsTGlnaHRTaGFkb3cgPSBkaXJlY3Rpb25hbExpZ2h0U2hhZG93c1sgaSBdO1xuICAgICAgLy8gQ09NUEFUOiBwcmUtcjE2NlxuICAgICAgLy8gcjE2NiBpbnRyb2R1Y2VkIHNoYWRvd0ludGVuc2l0eVxuICAgICAgI2lmIFRIUkVFX1ZSTV9USFJFRV9SRVZJU0lPTiA+PSAxNjZcbiAgICAgICAgc2hhZG93ID0gYWxsKCBidmVjMiggZGlyZWN0TGlnaHQudmlzaWJsZSwgcmVjZWl2ZVNoYWRvdyApICkgPyBnZXRTaGFkb3coIGRpcmVjdGlvbmFsU2hhZG93TWFwWyBpIF0sIGRpcmVjdGlvbmFsTGlnaHRTaGFkb3cuc2hhZG93TWFwU2l6ZSwgZGlyZWN0aW9uYWxMaWdodFNoYWRvdy5zaGFkb3dJbnRlbnNpdHksIGRpcmVjdGlvbmFsTGlnaHRTaGFkb3cuc2hhZG93QmlhcywgZGlyZWN0aW9uYWxMaWdodFNoYWRvdy5zaGFkb3dSYWRpdXMsIHZEaXJlY3Rpb25hbFNoYWRvd0Nvb3JkWyBpIF0gKSA6IDEuMDtcbiAgICAgICNlbHNlXG4gICAgICAgIHNoYWRvdyA9IGFsbCggYnZlYzIoIGRpcmVjdExpZ2h0LnZpc2libGUsIHJlY2VpdmVTaGFkb3cgKSApID8gZ2V0U2hhZG93KCBkaXJlY3Rpb25hbFNoYWRvd01hcFsgaSBdLCBkaXJlY3Rpb25hbExpZ2h0U2hhZG93LnNoYWRvd01hcFNpemUsIGRpcmVjdGlvbmFsTGlnaHRTaGFkb3cuc2hhZG93QmlhcywgZGlyZWN0aW9uYWxMaWdodFNoYWRvdy5zaGFkb3dSYWRpdXMsIHZEaXJlY3Rpb25hbFNoYWRvd0Nvb3JkWyBpIF0gKSA6IDEuMDtcbiAgICAgICNlbmRpZlxuICAgICAgI2VuZGlmXG5cbiAgICAgIC8vIENPTVBBVDogcHJlLXIxNTYgdXNlcyBhIHN0cnVjdCBHZW9tZXRyaWNDb250ZXh0XG4gICAgICAjaWYgVEhSRUVfVlJNX1RIUkVFX1JFVklTSU9OID49IDE1N1xuICAgICAgICBSRV9EaXJlY3QoIGRpcmVjdExpZ2h0LCBnZW9tZXRyeVBvc2l0aW9uLCBnZW9tZXRyeU5vcm1hbCwgZ2VvbWV0cnlWaWV3RGlyLCBnZW9tZXRyeUNsZWFyY29hdE5vcm1hbCwgbWF0ZXJpYWwsIHNoYWRvdywgcmVmbGVjdGVkTGlnaHQgKTtcbiAgICAgICNlbHNlXG4gICAgICAgIFJFX0RpcmVjdCggZGlyZWN0TGlnaHQsIGdlb21ldHJ5LCBtYXRlcmlhbCwgc2hhZG93LCByZWZsZWN0ZWRMaWdodCApO1xuICAgICAgI2VuZGlmXG5cbiAgICB9XG4gICAgI3ByYWdtYSB1bnJvbGxfbG9vcF9lbmRcblxuICAjZW5kaWZcblxuICAvLyAjaWYgKCBOVU1fUkVDVF9BUkVBX0xJR0hUUyA+IDAgKSAmJiBkZWZpbmVkKCBSRV9EaXJlY3RfUmVjdEFyZWEgKVxuXG4gIC8vICAgUmVjdEFyZWFMaWdodCByZWN0QXJlYUxpZ2h0O1xuXG4gIC8vICAgI3ByYWdtYSB1bnJvbGxfbG9vcF9zdGFydFxuICAvLyAgIGZvciAoIGludCBpID0gMDsgaSA8IE5VTV9SRUNUX0FSRUFfTElHSFRTOyBpICsrICkge1xuXG4gIC8vICAgICByZWN0QXJlYUxpZ2h0ID0gcmVjdEFyZWFMaWdodHNbIGkgXTtcbiAgLy8gICAgIFJFX0RpcmVjdF9SZWN0QXJlYSggcmVjdEFyZWFMaWdodCwgZ2VvbWV0cnksIG1hdGVyaWFsLCByZWZsZWN0ZWRMaWdodCApO1xuXG4gIC8vICAgfVxuICAvLyAgICNwcmFnbWEgdW5yb2xsX2xvb3BfZW5kXG5cbiAgLy8gI2VuZGlmXG5cbiAgI2lmIGRlZmluZWQoIFJFX0luZGlyZWN0RGlmZnVzZSApXG5cbiAgICB2ZWMzIGlibElycmFkaWFuY2UgPSB2ZWMzKCAwLjAgKTtcblxuICAgIHZlYzMgaXJyYWRpYW5jZSA9IGdldEFtYmllbnRMaWdodElycmFkaWFuY2UoIGFtYmllbnRMaWdodENvbG9yICk7XG5cbiAgICAvLyBDT01QQVQ6IHByZS1yMTU2IHVzZXMgYSBzdHJ1Y3QgR2VvbWV0cmljQ29udGV4dFxuICAgIC8vIENPTVBBVDogcHJlLXIxNTYgZG9lc24ndCBoYXZlIGEgZGVmaW5lIFVTRV9MSUdIVF9QUk9CRVNcbiAgICAjaWYgVEhSRUVfVlJNX1RIUkVFX1JFVklTSU9OID49IDE1N1xuICAgICAgI2lmIGRlZmluZWQoIFVTRV9MSUdIVF9QUk9CRVMgKVxuICAgICAgICBpcnJhZGlhbmNlICs9IGdldExpZ2h0UHJvYmVJcnJhZGlhbmNlKCBsaWdodFByb2JlLCBnZW9tZXRyeU5vcm1hbCApO1xuICAgICAgI2VuZGlmXG4gICAgI2Vsc2VcbiAgICAgIGlycmFkaWFuY2UgKz0gZ2V0TGlnaHRQcm9iZUlycmFkaWFuY2UoIGxpZ2h0UHJvYmUsIGdlb21ldHJ5Lm5vcm1hbCApO1xuICAgICNlbmRpZlxuXG4gICAgI2lmICggTlVNX0hFTUlfTElHSFRTID4gMCApXG5cbiAgICAgICNwcmFnbWEgdW5yb2xsX2xvb3Bfc3RhcnRcbiAgICAgIGZvciAoIGludCBpID0gMDsgaSA8IE5VTV9IRU1JX0xJR0hUUzsgaSArKyApIHtcblxuICAgICAgICAvLyBDT01QQVQ6IHByZS1yMTU2IHVzZXMgYSBzdHJ1Y3QgR2VvbWV0cmljQ29udGV4dFxuICAgICAgICAjaWYgVEhSRUVfVlJNX1RIUkVFX1JFVklTSU9OID49IDE1N1xuICAgICAgICAgIGlycmFkaWFuY2UgKz0gZ2V0SGVtaXNwaGVyZUxpZ2h0SXJyYWRpYW5jZSggaGVtaXNwaGVyZUxpZ2h0c1sgaSBdLCBnZW9tZXRyeU5vcm1hbCApO1xuICAgICAgICAjZWxzZVxuICAgICAgICAgIGlycmFkaWFuY2UgKz0gZ2V0SGVtaXNwaGVyZUxpZ2h0SXJyYWRpYW5jZSggaGVtaXNwaGVyZUxpZ2h0c1sgaSBdLCBnZW9tZXRyeS5ub3JtYWwgKTtcbiAgICAgICAgI2VuZGlmXG5cbiAgICAgIH1cbiAgICAgICNwcmFnbWEgdW5yb2xsX2xvb3BfZW5kXG5cbiAgICAjZW5kaWZcblxuICAjZW5kaWZcblxuICAvLyAjaWYgZGVmaW5lZCggUkVfSW5kaXJlY3RTcGVjdWxhciApXG5cbiAgLy8gICB2ZWMzIHJhZGlhbmNlID0gdmVjMyggMC4wICk7XG4gIC8vICAgdmVjMyBjbGVhcmNvYXRSYWRpYW5jZSA9IHZlYzMoIDAuMCApO1xuXG4gIC8vICNlbmRpZlxuXG4gICNpbmNsdWRlIDxsaWdodHNfZnJhZ21lbnRfbWFwcz5cbiAgI2luY2x1ZGUgPGxpZ2h0c19mcmFnbWVudF9lbmQ+XG5cbiAgLy8gbW9kdWxhdGlvblxuICAjaW5jbHVkZSA8YW9tYXBfZnJhZ21lbnQ+XG5cbiAgdmVjMyBjb2wgPSByZWZsZWN0ZWRMaWdodC5kaXJlY3REaWZmdXNlICsgcmVmbGVjdGVkTGlnaHQuaW5kaXJlY3REaWZmdXNlO1xuXG4gICNpZmRlZiBERUJVR19MSVRTSEFERVJBVEVcbiAgICBnbF9GcmFnQ29sb3IgPSB2ZWM0KCBjb2wsIGRpZmZ1c2VDb2xvci5hICk7XG4gICAgcG9zdENvcnJlY3Rpb24oKTtcbiAgICByZXR1cm47XG4gICNlbmRpZlxuXG4gIC8vIC0tIE1Ub29uOiByaW0gbGlnaHRpbmcgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgdmVjMyB2aWV3RGlyID0gbm9ybWFsaXplKCB2Vmlld1Bvc2l0aW9uICk7XG5cbiAgI2lmbmRlZiBQSFlTSUNBTExZX0NPUlJFQ1RfTElHSFRTXG4gICAgcmVmbGVjdGVkTGlnaHQuZGlyZWN0U3BlY3VsYXIgLz0gUEk7XG4gICNlbmRpZlxuICB2ZWMzIHJpbU1peCA9IG1peCggdmVjMyggMS4wICksIHJlZmxlY3RlZExpZ2h0LmRpcmVjdFNwZWN1bGFyLCAxLjAgKTtcblxuICB2ZWMzIHJpbSA9IHBhcmFtZXRyaWNSaW1Db2xvckZhY3RvciAqIHBvdyggc2F0dXJhdGUoIDEuMCAtIGRvdCggdmlld0Rpciwgbm9ybWFsICkgKyBwYXJhbWV0cmljUmltTGlmdEZhY3RvciApLCBwYXJhbWV0cmljUmltRnJlc25lbFBvd2VyRmFjdG9yICk7XG5cbiAgI2lmZGVmIFVTRV9NQVRDQVBURVhUVVJFXG4gICAge1xuICAgICAgdmVjMyB4ID0gbm9ybWFsaXplKCB2ZWMzKCB2aWV3RGlyLnosIDAuMCwgLXZpZXdEaXIueCApICk7XG4gICAgICB2ZWMzIHkgPSBjcm9zcyggdmlld0RpciwgeCApOyAvLyBndWFyYW50ZWVkIHRvIGJlIG5vcm1hbGl6ZWRcbiAgICAgIHZlYzIgc3BoZXJlVXYgPSAwLjUgKyAwLjUgKiB2ZWMyKCBkb3QoIHgsIG5vcm1hbCApLCAtZG90KCB5LCBub3JtYWwgKSApO1xuICAgICAgc3BoZXJlVXYgPSAoIG1hdGNhcFRleHR1cmVVdlRyYW5zZm9ybSAqIHZlYzMoIHNwaGVyZVV2LCAxICkgKS54eTtcbiAgICAgIHZlYzMgbWF0Y2FwID0gdGV4dHVyZTJEKCBtYXRjYXBUZXh0dXJlLCBzcGhlcmVVdiApLnJnYjtcbiAgICAgIHJpbSArPSBtYXRjYXBGYWN0b3IgKiBtYXRjYXA7XG4gICAgfVxuICAjZW5kaWZcblxuICAjaWZkZWYgVVNFX1JJTU1VTFRJUExZVEVYVFVSRVxuICAgIHZlYzIgcmltTXVsdGlwbHlUZXh0dXJlVXYgPSAoIHJpbU11bHRpcGx5VGV4dHVyZVV2VHJhbnNmb3JtICogdmVjMyggdXYsIDEgKSApLnh5O1xuICAgIHJpbSAqPSB0ZXh0dXJlMkQoIHJpbU11bHRpcGx5VGV4dHVyZSwgcmltTXVsdGlwbHlUZXh0dXJlVXYgKS5yZ2I7XG4gICNlbmRpZlxuXG4gIGNvbCArPSByaW1NaXggKiByaW07XG5cbiAgLy8gLS0gTVRvb246IEVtaXNzaW9uIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIGNvbCArPSB0b3RhbEVtaXNzaXZlUmFkaWFuY2U7XG5cbiAgLy8gI2luY2x1ZGUgPGVudm1hcF9mcmFnbWVudD5cblxuICAvLyAtLSBBbG1vc3QgZG9uZSEgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgI2lmIGRlZmluZWQoIE9VVExJTkUgKVxuICAgIGNvbCA9IG91dGxpbmVDb2xvckZhY3Rvci5yZ2IgKiBtaXgoIHZlYzMoIDEuMCApLCBjb2wsIG91dGxpbmVMaWdodGluZ01peEZhY3RvciApO1xuICAjZW5kaWZcblxuICAjaWZkZWYgT1BBUVVFXG4gICAgZGlmZnVzZUNvbG9yLmEgPSAxLjA7XG4gICNlbmRpZlxuXG4gIGdsX0ZyYWdDb2xvciA9IHZlYzQoIGNvbCwgZGlmZnVzZUNvbG9yLmEgKTtcbiAgcG9zdENvcnJlY3Rpb24oKTtcbn1cbiIsICIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cblxuLyoqXG4gKiBTcGVjaWZpZXJzIG9mIGRlYnVnIG1vZGUgb2Yge0BsaW5rIE1Ub29uTWF0ZXJpYWx9LlxuICpcbiAqIFNlZToge0BsaW5rIE1Ub29uTWF0ZXJpYWwuZGVidWdNb2RlfVxuICovXG5leHBvcnQgY29uc3QgTVRvb25NYXRlcmlhbERlYnVnTW9kZSA9IHtcbiAgLyoqXG4gICAqIFJlbmRlciBub3JtYWxseS5cbiAgICovXG4gIE5vbmU6ICdub25lJyxcblxuICAvKipcbiAgICogVmlzdWFsaXplIG5vcm1hbHMgb2YgdGhlIHN1cmZhY2UuXG4gICAqL1xuICBOb3JtYWw6ICdub3JtYWwnLFxuXG4gIC8qKlxuICAgKiBWaXN1YWxpemUgbGl0L3NoYWRlIG9mIHRoZSBzdXJmYWNlLlxuICAgKi9cbiAgTGl0U2hhZGVSYXRlOiAnbGl0U2hhZGVSYXRlJyxcblxuICAvKipcbiAgICogVmlzdWFsaXplIFVWIG9mIHRoZSBzdXJmYWNlLlxuICAgKi9cbiAgVVY6ICd1dicsXG59IGFzIGNvbnN0O1xuXG5leHBvcnQgdHlwZSBNVG9vbk1hdGVyaWFsRGVidWdNb2RlID0gKHR5cGVvZiBNVG9vbk1hdGVyaWFsRGVidWdNb2RlKVtrZXlvZiB0eXBlb2YgTVRvb25NYXRlcmlhbERlYnVnTW9kZV07XG4iLCAiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uICovXG5cbmV4cG9ydCBjb25zdCBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZSA9IHtcbiAgTm9uZTogJ25vbmUnLFxuICBXb3JsZENvb3JkaW5hdGVzOiAnd29ybGRDb29yZGluYXRlcycsXG4gIFNjcmVlbkNvb3JkaW5hdGVzOiAnc2NyZWVuQ29vcmRpbmF0ZXMnLFxufSBhcyBjb25zdDtcblxuZXhwb3J0IHR5cGUgTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUgPVxuICAodHlwZW9mIE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlKVtrZXlvZiB0eXBlb2YgTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGVdO1xuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuY29uc3QgZW5jb2RpbmdDb2xvclNwYWNlTWFwOiBSZWNvcmQ8YW55LCAnJyB8ICdzcmdiJz4gPSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cbiAgMzAwMDogJycsXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cbiAgMzAwMTogJ3NyZ2InLFxufTtcblxuLyoqXG4gKiBBIGNvbXBhdCBmdW5jdGlvbiB0byBnZXQgdGV4dHVyZSBjb2xvciBzcGFjZS5cbiAqXG4gKiBDT01QQVQ6IHByZS1yMTUyXG4gKiBTdGFydGluZyBmcm9tIFRocmVlLmpzIHIxNTIsIGB0ZXh0dXJlLmVuY29kaW5nYCBpcyByZW5hbWVkIHRvIGB0ZXh0dXJlLmNvbG9yU3BhY2VgLlxuICogVGhpcyBmdW5jdGlvbiB3aWxsIGhhbmRsZSB0aGUgY29tYXB0LlxuICpcbiAqIEBwYXJhbSB0ZXh0dXJlIFRoZSB0ZXh0dXJlIHlvdSB3YW50IHRvIGdldCB0aGUgY29sb3Igc3BhY2UgZnJvbVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGV4dHVyZUNvbG9yU3BhY2UodGV4dHVyZTogVEhSRUUuVGV4dHVyZSk6ICcnIHwgJ3NyZ2InIHtcbiAgaWYgKHBhcnNlSW50KFRIUkVFLlJFVklTSU9OLCAxMCkgPj0gMTUyKSB7XG4gICAgcmV0dXJuIHRleHR1cmUuY29sb3JTcGFjZSBhcyAnJyB8ICdzcmdiJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZW5jb2RpbmdDb2xvclNwYWNlTWFwWyh0ZXh0dXJlIGFzIGFueSkuZW5jb2RpbmddO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgR0xURkxvYWRlclBsdWdpbiwgR0xURlBhcnNlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXIuanMnO1xuaW1wb3J0ICogYXMgSERSRW1pc3NpdmVNdWx0aXBsaWVyU2NoZW1hIGZyb20gJ0BwaXhpdi90eXBlcy12cm1jLW1hdGVyaWFscy1oZHItZW1pc3NpdmUtbXVsdGlwbGllci0xLjAnO1xuaW1wb3J0IHsgR0xURiBhcyBHTFRGU2NoZW1hIH0gZnJvbSAnQGdsdGYtdHJhbnNmb3JtL2NvcmUnO1xuXG5leHBvcnQgY2xhc3MgVlJNTWF0ZXJpYWxzSERSRW1pc3NpdmVNdWx0aXBsaWVyTG9hZGVyUGx1Z2luIGltcGxlbWVudHMgR0xURkxvYWRlclBsdWdpbiB7XG4gIHB1YmxpYyBzdGF0aWMgRVhURU5TSU9OX05BTUUgPSAnVlJNQ19tYXRlcmlhbHNfaGRyX2VtaXNzaXZlTXVsdGlwbGllcicgYXMgY29uc3Q7XG5cbiAgcHVibGljIHJlYWRvbmx5IHBhcnNlcjogR0xURlBhcnNlcjtcblxuICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gVlJNTWF0ZXJpYWxzSERSRW1pc3NpdmVNdWx0aXBsaWVyTG9hZGVyUGx1Z2luLkVYVEVOU0lPTl9OQU1FO1xuICB9XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBhcnNlcjogR0xURlBhcnNlcikge1xuICAgIHRoaXMucGFyc2VyID0gcGFyc2VyO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGV4dGVuZE1hdGVyaWFsUGFyYW1zKG1hdGVyaWFsSW5kZXg6IG51bWJlciwgbWF0ZXJpYWxQYXJhbXM6IHsgW2tleTogc3RyaW5nXTogYW55IH0pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBleHRlbnNpb24gPSB0aGlzLl9nZXRIRFJFbWlzc2l2ZU11bHRpcGxpZXJFeHRlbnNpb24obWF0ZXJpYWxJbmRleCk7XG4gICAgaWYgKGV4dGVuc2lvbiA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gVGhpcyBleHRlbnNpb24gaXMgYXJjaGl2ZWQuIEVtaXQgd2FybmluZ1xuICAgIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL3ZybS1jL3ZybS1zcGVjaWZpY2F0aW9uL3B1bGwvMzc1XG4gICAgY29uc29sZS53YXJuKFxuICAgICAgJ1ZSTU1hdGVyaWFsc0hEUkVtaXNzaXZlTXVsdGlwbGllckxvYWRlclBsdWdpbjogYFZSTUNfbWF0ZXJpYWxzX2hkcl9lbWlzc2l2ZU11bHRpcGxpZXJgIGlzIGFyY2hpdmVkLiBVc2UgYEtIUl9tYXRlcmlhbHNfZW1pc3NpdmVfc3RyZW5ndGhgIGluc3RlYWQuJyxcbiAgICApO1xuXG4gICAgY29uc3QgZW1pc3NpdmVNdWx0aXBsaWVyID0gZXh0ZW5zaW9uLmVtaXNzaXZlTXVsdGlwbGllcjtcbiAgICBtYXRlcmlhbFBhcmFtcy5lbWlzc2l2ZUludGVuc2l0eSA9IGVtaXNzaXZlTXVsdGlwbGllcjtcbiAgfVxuXG4gIHByaXZhdGUgX2dldEhEUkVtaXNzaXZlTXVsdGlwbGllckV4dGVuc2lvbihcbiAgICBtYXRlcmlhbEluZGV4OiBudW1iZXIsXG4gICk6IEhEUkVtaXNzaXZlTXVsdGlwbGllclNjaGVtYS5WUk1DTWF0ZXJpYWxzSERSRW1pc3NpdmVNdWx0aXBsaWVyIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBwYXJzZXIgPSB0aGlzLnBhcnNlcjtcbiAgICBjb25zdCBqc29uID0gcGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAgIGNvbnN0IG1hdGVyaWFsRGVmID0ganNvbi5tYXRlcmlhbHM/LlttYXRlcmlhbEluZGV4XTtcblxuICAgIGlmIChtYXRlcmlhbERlZiA9PSBudWxsKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIGBWUk1NYXRlcmlhbHNIRFJFbWlzc2l2ZU11bHRpcGxpZXJMb2FkZXJQbHVnaW46IEF0dGVtcHQgdG8gdXNlIG1hdGVyaWFsc1ske21hdGVyaWFsSW5kZXh9XSBvZiBnbFRGIGJ1dCB0aGUgbWF0ZXJpYWwgZG9lc24ndCBleGlzdGAsXG4gICAgICApO1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBjb25zdCBleHRlbnNpb24gPSBtYXRlcmlhbERlZi5leHRlbnNpb25zPy5bVlJNTWF0ZXJpYWxzSERSRW1pc3NpdmVNdWx0aXBsaWVyTG9hZGVyUGx1Z2luLkVYVEVOU0lPTl9OQU1FXSBhc1xuICAgICAgfCBIRFJFbWlzc2l2ZU11bHRpcGxpZXJTY2hlbWEuVlJNQ01hdGVyaWFsc0hEUkVtaXNzaXZlTXVsdGlwbGllclxuICAgICAgfCB1bmRlZmluZWQ7XG4gICAgaWYgKGV4dGVuc2lvbiA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiBleHRlbnNpb247XG4gIH1cbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk0gYXMgVjBWUk0sIE1hdGVyaWFsIGFzIFYwTWF0ZXJpYWwgfSBmcm9tICdAcGl4aXYvdHlwZXMtdnJtLTAuMCc7XG5pbXBvcnQgKiBhcyBWMU1Ub29uU2NoZW1hIGZyb20gJ0BwaXhpdi90eXBlcy12cm1jLW1hdGVyaWFscy1tdG9vbi0xLjAnO1xuaW1wb3J0IHR5cGUgeyBHTFRGTG9hZGVyUGx1Z2luLCBHTFRGUGFyc2VyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlci5qcyc7XG5pbXBvcnQgeyBnYW1tYUVPVEYgfSBmcm9tICcuL3V0aWxzL2dhbW1hRU9URic7XG5pbXBvcnQgeyBHTFRGIGFzIEdMVEZTY2hlbWEgfSBmcm9tICdAZ2x0Zi10cmFuc2Zvcm0vY29yZSc7XG5cbmV4cG9ydCBjbGFzcyBWUk1NYXRlcmlhbHNWMENvbXBhdFBsdWdpbiBpbXBsZW1lbnRzIEdMVEZMb2FkZXJQbHVnaW4ge1xuICBwdWJsaWMgcmVhZG9ubHkgcGFyc2VyOiBHTFRGUGFyc2VyO1xuXG4gIC8qKlxuICAgKiBBIG1hcCBmcm9tIHYwIHJlbmRlciBxdWV1ZSB0byB2MSByZW5kZXIgcXVldWUgb2Zmc2V0LCBmb3IgVHJhbnNwYXJlbnQgbWF0ZXJpYWxzLlxuICAgKi9cbiAgcHJpdmF0ZSByZWFkb25seSBfcmVuZGVyUXVldWVNYXBUcmFuc3BhcmVudDogTWFwPG51bWJlciwgbnVtYmVyPjtcblxuICAvKipcbiAgICogQSBtYXAgZnJvbSB2MCByZW5kZXIgcXVldWUgdG8gdjEgcmVuZGVyIHF1ZXVlIG9mZnNldCwgZm9yIFRyYW5zcGFyZW50WldyaXRlIG1hdGVyaWFscy5cbiAgICovXG4gIHByaXZhdGUgcmVhZG9ubHkgX3JlbmRlclF1ZXVlTWFwVHJhbnNwYXJlbnRaV3JpdGU6IE1hcDxudW1iZXIsIG51bWJlcj47XG5cbiAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICdWUk1NYXRlcmlhbHNWMENvbXBhdFBsdWdpbic7XG4gIH1cblxuICBwdWJsaWMgY29uc3RydWN0b3IocGFyc2VyOiBHTFRGUGFyc2VyKSB7XG4gICAgdGhpcy5wYXJzZXIgPSBwYXJzZXI7XG5cbiAgICB0aGlzLl9yZW5kZXJRdWV1ZU1hcFRyYW5zcGFyZW50ID0gbmV3IE1hcCgpO1xuICAgIHRoaXMuX3JlbmRlclF1ZXVlTWFwVHJhbnNwYXJlbnRaV3JpdGUgPSBuZXcgTWFwKCk7XG5cbiAgICAvLyBXT1JLQVJPVU5EOiBBZGQgS0hSX3RleHR1cmVfdHJhbnNmb3JtIHRvIGV4dGVuc2lvbnNVc2VkXG4gICAgLy8gSXQgaXMgdG9vIGxhdGUgdG8gYWRkIHRoaXMgaW4gYmVmb3JlUm9vdFxuICAgIGNvbnN0IGpzb24gPSB0aGlzLnBhcnNlci5qc29uIGFzIEdMVEZTY2hlbWEuSUdMVEY7XG5cbiAgICBqc29uLmV4dGVuc2lvbnNVc2VkID0ganNvbi5leHRlbnNpb25zVXNlZCA/PyBbXTtcbiAgICBpZiAoanNvbi5leHRlbnNpb25zVXNlZC5pbmRleE9mKCdLSFJfdGV4dHVyZV90cmFuc2Zvcm0nKSA9PT0gLTEpIHtcbiAgICAgIGpzb24uZXh0ZW5zaW9uc1VzZWQucHVzaCgnS0hSX3RleHR1cmVfdHJhbnNmb3JtJyk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGJlZm9yZVJvb3QoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QganNvbiA9IHRoaXMucGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAgIC8vIGVhcmx5IGFib3J0IGlmIGl0IGRvZXNuJ3QgdXNlIFYwVlJNXG4gICAgY29uc3QgdjBWUk1FeHRlbnNpb24gPSBqc29uLmV4dGVuc2lvbnM/LlsnVlJNJ10gYXMgVjBWUk0gfCB1bmRlZmluZWQ7XG4gICAgY29uc3QgdjBNYXRlcmlhbFByb3BlcnRpZXMgPSB2MFZSTUV4dGVuc2lvbj8ubWF0ZXJpYWxQcm9wZXJ0aWVzO1xuICAgIGlmICghdjBNYXRlcmlhbFByb3BlcnRpZXMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBwb3B1bGF0ZSByZW5kZXIgcXVldWUgbWFwXG4gICAgdGhpcy5fcG9wdWxhdGVSZW5kZXJRdWV1ZU1hcCh2ME1hdGVyaWFsUHJvcGVydGllcyk7XG5cbiAgICAvLyBjb252ZXJ0IFYwIG1hdGVyaWFsIHByb3BlcnRpZXMgaW50byBWMSBjb21wYXRpYmxlIGZvcm1hdFxuICAgIHYwTWF0ZXJpYWxQcm9wZXJ0aWVzLmZvckVhY2goKG1hdGVyaWFsUHJvcGVydGllcywgbWF0ZXJpYWxJbmRleCkgPT4ge1xuICAgICAgY29uc3QgbWF0ZXJpYWxEZWYgPSBqc29uLm1hdGVyaWFscz8uW21hdGVyaWFsSW5kZXhdO1xuXG4gICAgICBpZiAobWF0ZXJpYWxEZWYgPT0gbnVsbCkge1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgYFZSTU1hdGVyaWFsc1YwQ29tcGF0UGx1Z2luOiBBdHRlbXB0IHRvIHVzZSBtYXRlcmlhbHNbJHttYXRlcmlhbEluZGV4fV0gb2YgZ2xURiBidXQgdGhlIG1hdGVyaWFsIGRvZXNuJ3QgZXhpc3RgLFxuICAgICAgICApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChtYXRlcmlhbFByb3BlcnRpZXMuc2hhZGVyID09PSAnVlJNL01Ub29uJykge1xuICAgICAgICBjb25zdCBtYXRlcmlhbCA9IHRoaXMuX3BhcnNlVjBNVG9vblByb3BlcnRpZXMobWF0ZXJpYWxQcm9wZXJ0aWVzLCBtYXRlcmlhbERlZik7XG4gICAgICAgIGpzb24ubWF0ZXJpYWxzIVttYXRlcmlhbEluZGV4XSA9IG1hdGVyaWFsO1xuICAgICAgfSBlbHNlIGlmIChtYXRlcmlhbFByb3BlcnRpZXMuc2hhZGVyPy5zdGFydHNXaXRoKCdWUk0vVW5saXQnKSkge1xuICAgICAgICBjb25zdCBtYXRlcmlhbCA9IHRoaXMuX3BhcnNlVjBVbmxpdFByb3BlcnRpZXMobWF0ZXJpYWxQcm9wZXJ0aWVzLCBtYXRlcmlhbERlZik7XG4gICAgICAgIGpzb24ubWF0ZXJpYWxzIVttYXRlcmlhbEluZGV4XSA9IG1hdGVyaWFsO1xuICAgICAgfSBlbHNlIGlmIChtYXRlcmlhbFByb3BlcnRpZXMuc2hhZGVyID09PSAnVlJNX1VTRV9HTFRGU0hBREVSJykge1xuICAgICAgICAvLyBganNvbi5tYXRlcmlhbHNbbWF0ZXJpYWxJbmRleF1gIHNob3VsZCBiZSBhbHJlYWR5IHZhbGlkXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLndhcm4oYFZSTU1hdGVyaWFsc1YwQ29tcGF0UGx1Z2luOiBVbmtub3duIHNoYWRlcjogJHttYXRlcmlhbFByb3BlcnRpZXMuc2hhZGVyfWApO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VWME1Ub29uUHJvcGVydGllcyhcbiAgICBtYXRlcmlhbFByb3BlcnRpZXM6IFYwTWF0ZXJpYWwsXG4gICAgc2NoZW1hTWF0ZXJpYWw6IEdMVEZTY2hlbWEuSU1hdGVyaWFsLFxuICApOiBHTFRGU2NoZW1hLklNYXRlcmlhbCB7XG4gICAgY29uc3QgaXNUcmFuc3BhcmVudCA9IG1hdGVyaWFsUHJvcGVydGllcy5rZXl3b3JkTWFwPy5bJ19BTFBIQUJMRU5EX09OJ10gPz8gZmFsc2U7XG4gICAgY29uc3QgZW5hYmxlZFpXcml0ZSA9IG1hdGVyaWFsUHJvcGVydGllcy5mbG9hdFByb3BlcnRpZXM/LlsnX1pXcml0ZSddID09PSAxO1xuICAgIGNvbnN0IHRyYW5zcGFyZW50V2l0aFpXcml0ZSA9IGVuYWJsZWRaV3JpdGUgJiYgaXNUcmFuc3BhcmVudDtcblxuICAgIGNvbnN0IHJlbmRlclF1ZXVlT2Zmc2V0TnVtYmVyID0gdGhpcy5fdjBQYXJzZVJlbmRlclF1ZXVlKG1hdGVyaWFsUHJvcGVydGllcyk7XG5cbiAgICBjb25zdCBpc0N1dG9mZiA9IG1hdGVyaWFsUHJvcGVydGllcy5rZXl3b3JkTWFwPy5bJ19BTFBIQVRFU1RfT04nXSA/PyBmYWxzZTtcbiAgICBjb25zdCBhbHBoYU1vZGUgPSBpc1RyYW5zcGFyZW50ID8gJ0JMRU5EJyA6IGlzQ3V0b2ZmID8gJ01BU0snIDogJ09QQVFVRSc7XG4gICAgY29uc3QgYWxwaGFDdXRvZmYgPSBpc0N1dG9mZiA/IChtYXRlcmlhbFByb3BlcnRpZXMuZmxvYXRQcm9wZXJ0aWVzPy5bJ19DdXRvZmYnXSA/PyAwLjUpIDogdW5kZWZpbmVkO1xuXG4gICAgY29uc3QgY3VsbE1vZGUgPSBtYXRlcmlhbFByb3BlcnRpZXMuZmxvYXRQcm9wZXJ0aWVzPy5bJ19DdWxsTW9kZSddID8/IDI7IC8vIGVudW0sIHsgT2ZmLCBGcm9udCwgQmFjayB9XG4gICAgY29uc3QgZG91YmxlU2lkZWQgPSBjdWxsTW9kZSA9PT0gMDtcblxuICAgIGNvbnN0IHRleHR1cmVUcmFuc2Zvcm1FeHQgPSB0aGlzLl9wb3J0VGV4dHVyZVRyYW5zZm9ybShtYXRlcmlhbFByb3BlcnRpZXMpO1xuXG4gICAgY29uc3QgYmFzZUNvbG9yRmFjdG9yID0gKG1hdGVyaWFsUHJvcGVydGllcy52ZWN0b3JQcm9wZXJ0aWVzPy5bJ19Db2xvciddID8/IFsxLjAsIDEuMCwgMS4wLCAxLjBdKS5tYXAoXG4gICAgICAodjogbnVtYmVyLCBpOiBudW1iZXIpID0+IChpID09PSAzID8gdiA6IGdhbW1hRU9URih2KSksIC8vIGFscGhhIGNoYW5uZWwgaXMgc3RvcmVkIGluIGxpbmVhclxuICAgICk7XG4gICAgY29uc3QgYmFzZUNvbG9yVGV4dHVyZUluZGV4ID0gbWF0ZXJpYWxQcm9wZXJ0aWVzLnRleHR1cmVQcm9wZXJ0aWVzPy5bJ19NYWluVGV4J107XG4gICAgY29uc3QgYmFzZUNvbG9yVGV4dHVyZSA9XG4gICAgICBiYXNlQ29sb3JUZXh0dXJlSW5kZXggIT0gbnVsbFxuICAgICAgICA/IHtcbiAgICAgICAgICAgIGluZGV4OiBiYXNlQ29sb3JUZXh0dXJlSW5kZXgsXG4gICAgICAgICAgICBleHRlbnNpb25zOiB7XG4gICAgICAgICAgICAgIC4uLnRleHR1cmVUcmFuc2Zvcm1FeHQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH1cbiAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICBjb25zdCBub3JtYWxUZXh0dXJlU2NhbGUgPSBtYXRlcmlhbFByb3BlcnRpZXMuZmxvYXRQcm9wZXJ0aWVzPy5bJ19CdW1wU2NhbGUnXSA/PyAxLjA7XG4gICAgY29uc3Qgbm9ybWFsVGV4dHVyZUluZGV4ID0gbWF0ZXJpYWxQcm9wZXJ0aWVzLnRleHR1cmVQcm9wZXJ0aWVzPy5bJ19CdW1wTWFwJ107XG4gICAgY29uc3Qgbm9ybWFsVGV4dHVyZSA9XG4gICAgICBub3JtYWxUZXh0dXJlSW5kZXggIT0gbnVsbFxuICAgICAgICA/IHtcbiAgICAgICAgICAgIGluZGV4OiBub3JtYWxUZXh0dXJlSW5kZXgsXG4gICAgICAgICAgICBzY2FsZTogbm9ybWFsVGV4dHVyZVNjYWxlLFxuICAgICAgICAgICAgZXh0ZW5zaW9uczoge1xuICAgICAgICAgICAgICAuLi50ZXh0dXJlVHJhbnNmb3JtRXh0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9XG4gICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgY29uc3QgZW1pc3NpdmVGYWN0b3IgPSAobWF0ZXJpYWxQcm9wZXJ0aWVzLnZlY3RvclByb3BlcnRpZXM/LlsnX0VtaXNzaW9uQ29sb3InXSA/PyBbMC4wLCAwLjAsIDAuMCwgMS4wXSkubWFwKFxuICAgICAgZ2FtbWFFT1RGLFxuICAgICk7XG4gICAgY29uc3QgZW1pc3NpdmVUZXh0dXJlSW5kZXggPSBtYXRlcmlhbFByb3BlcnRpZXMudGV4dHVyZVByb3BlcnRpZXM/LlsnX0VtaXNzaW9uTWFwJ107XG4gICAgY29uc3QgZW1pc3NpdmVUZXh0dXJlID1cbiAgICAgIGVtaXNzaXZlVGV4dHVyZUluZGV4ICE9IG51bGxcbiAgICAgICAgPyB7XG4gICAgICAgICAgICBpbmRleDogZW1pc3NpdmVUZXh0dXJlSW5kZXgsXG4gICAgICAgICAgICBleHRlbnNpb25zOiB7XG4gICAgICAgICAgICAgIC4uLnRleHR1cmVUcmFuc2Zvcm1FeHQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH1cbiAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICBjb25zdCBzaGFkZUNvbG9yRmFjdG9yID0gKG1hdGVyaWFsUHJvcGVydGllcy52ZWN0b3JQcm9wZXJ0aWVzPy5bJ19TaGFkZUNvbG9yJ10gPz8gWzAuOTcsIDAuODEsIDAuODYsIDEuMF0pLm1hcChcbiAgICAgIGdhbW1hRU9URixcbiAgICApO1xuICAgIGNvbnN0IHNoYWRlTXVsdGlwbHlUZXh0dXJlSW5kZXggPSBtYXRlcmlhbFByb3BlcnRpZXMudGV4dHVyZVByb3BlcnRpZXM/LlsnX1NoYWRlVGV4dHVyZSddO1xuICAgIGNvbnN0IHNoYWRlTXVsdGlwbHlUZXh0dXJlID1cbiAgICAgIHNoYWRlTXVsdGlwbHlUZXh0dXJlSW5kZXggIT0gbnVsbFxuICAgICAgICA/IHtcbiAgICAgICAgICAgIGluZGV4OiBzaGFkZU11bHRpcGx5VGV4dHVyZUluZGV4LFxuICAgICAgICAgICAgZXh0ZW5zaW9uczoge1xuICAgICAgICAgICAgICAuLi50ZXh0dXJlVHJhbnNmb3JtRXh0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9XG4gICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgLy8gLy8gY29udmVydCB2MCBzaGFkZSBzaGlmdCAvIHNoYWRlIHRvb255XG4gICAgbGV0IHNoYWRpbmdTaGlmdEZhY3RvciA9IG1hdGVyaWFsUHJvcGVydGllcy5mbG9hdFByb3BlcnRpZXM/LlsnX1NoYWRlU2hpZnQnXSA/PyAwLjA7XG4gICAgbGV0IHNoYWRpbmdUb29ueUZhY3RvciA9IG1hdGVyaWFsUHJvcGVydGllcy5mbG9hdFByb3BlcnRpZXM/LlsnX1NoYWRlVG9vbnknXSA/PyAwLjk7XG4gICAgc2hhZGluZ1Rvb255RmFjdG9yID0gVEhSRUUuTWF0aFV0aWxzLmxlcnAoc2hhZGluZ1Rvb255RmFjdG9yLCAxLjAsIDAuNSArIDAuNSAqIHNoYWRpbmdTaGlmdEZhY3Rvcik7XG4gICAgc2hhZGluZ1NoaWZ0RmFjdG9yID0gLXNoYWRpbmdTaGlmdEZhY3RvciAtICgxLjAgLSBzaGFkaW5nVG9vbnlGYWN0b3IpO1xuXG4gICAgY29uc3QgZ2lJbnRlbnNpdHlGYWN0b3IgPSBtYXRlcmlhbFByb3BlcnRpZXMuZmxvYXRQcm9wZXJ0aWVzPy5bJ19JbmRpcmVjdExpZ2h0SW50ZW5zaXR5J10gPz8gMC4xO1xuICAgIGNvbnN0IGdpRXF1YWxpemF0aW9uRmFjdG9yID0gZ2lJbnRlbnNpdHlGYWN0b3IgPyAxLjAgLSBnaUludGVuc2l0eUZhY3RvciA6IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0IG1hdGNhcFRleHR1cmVJbmRleCA9IG1hdGVyaWFsUHJvcGVydGllcy50ZXh0dXJlUHJvcGVydGllcz8uWydfU3BoZXJlQWRkJ107XG4gICAgY29uc3QgbWF0Y2FwRmFjdG9yID0gbWF0Y2FwVGV4dHVyZUluZGV4ICE9IG51bGwgPyBbMS4wLCAxLjAsIDEuMF0gOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgbWF0Y2FwVGV4dHVyZSA9XG4gICAgICBtYXRjYXBUZXh0dXJlSW5kZXggIT0gbnVsbFxuICAgICAgICA/IHtcbiAgICAgICAgICAgIGluZGV4OiBtYXRjYXBUZXh0dXJlSW5kZXgsXG4gICAgICAgICAgfVxuICAgICAgICA6IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0IHJpbUxpZ2h0aW5nTWl4RmFjdG9yID0gbWF0ZXJpYWxQcm9wZXJ0aWVzLmZsb2F0UHJvcGVydGllcz8uWydfUmltTGlnaHRpbmdNaXgnXSA/PyAwLjA7XG4gICAgY29uc3QgcmltTXVsdGlwbHlUZXh0dXJlSW5kZXggPSBtYXRlcmlhbFByb3BlcnRpZXMudGV4dHVyZVByb3BlcnRpZXM/LlsnX1JpbVRleHR1cmUnXTtcbiAgICBjb25zdCByaW1NdWx0aXBseVRleHR1cmUgPVxuICAgICAgcmltTXVsdGlwbHlUZXh0dXJlSW5kZXggIT0gbnVsbFxuICAgICAgICA/IHtcbiAgICAgICAgICAgIGluZGV4OiByaW1NdWx0aXBseVRleHR1cmVJbmRleCxcbiAgICAgICAgICAgIGV4dGVuc2lvbnM6IHtcbiAgICAgICAgICAgICAgLi4udGV4dHVyZVRyYW5zZm9ybUV4dCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfVxuICAgICAgICA6IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0IHBhcmFtZXRyaWNSaW1Db2xvckZhY3RvciA9IChtYXRlcmlhbFByb3BlcnRpZXMudmVjdG9yUHJvcGVydGllcz8uWydfUmltQ29sb3InXSA/PyBbMC4wLCAwLjAsIDAuMCwgMS4wXSkubWFwKFxuICAgICAgZ2FtbWFFT1RGLFxuICAgICk7XG4gICAgY29uc3QgcGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlckZhY3RvciA9IG1hdGVyaWFsUHJvcGVydGllcy5mbG9hdFByb3BlcnRpZXM/LlsnX1JpbUZyZXNuZWxQb3dlciddID8/IDEuMDtcbiAgICBjb25zdCBwYXJhbWV0cmljUmltTGlmdEZhY3RvciA9IG1hdGVyaWFsUHJvcGVydGllcy5mbG9hdFByb3BlcnRpZXM/LlsnX1JpbUxpZnQnXSA/PyAwLjA7XG5cbiAgICBjb25zdCBvdXRsaW5lV2lkdGhNb2RlID0gWydub25lJywgJ3dvcmxkQ29vcmRpbmF0ZXMnLCAnc2NyZWVuQ29vcmRpbmF0ZXMnXVtcbiAgICAgIG1hdGVyaWFsUHJvcGVydGllcy5mbG9hdFByb3BlcnRpZXM/LlsnX091dGxpbmVXaWR0aE1vZGUnXSA/PyAwXG4gICAgXSBhcyBWMU1Ub29uU2NoZW1hLk1hdGVyaWFsc01Ub29uT3V0bGluZVdpZHRoTW9kZTtcblxuICAgIC8vIC8vIHYwIG91dGxpbmVXaWR0aEZhY3RvciBpcyBpbiBjZW50aW1ldGVyXG4gICAgbGV0IG91dGxpbmVXaWR0aEZhY3RvciA9IG1hdGVyaWFsUHJvcGVydGllcy5mbG9hdFByb3BlcnRpZXM/LlsnX091dGxpbmVXaWR0aCddID8/IDAuMDtcbiAgICBvdXRsaW5lV2lkdGhGYWN0b3IgPSAwLjAxICogb3V0bGluZVdpZHRoRmFjdG9yO1xuXG4gICAgY29uc3Qgb3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlSW5kZXggPSBtYXRlcmlhbFByb3BlcnRpZXMudGV4dHVyZVByb3BlcnRpZXM/LlsnX091dGxpbmVXaWR0aFRleHR1cmUnXTtcbiAgICBjb25zdCBvdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmUgPVxuICAgICAgb3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlSW5kZXggIT0gbnVsbFxuICAgICAgICA/IHtcbiAgICAgICAgICAgIGluZGV4OiBvdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmVJbmRleCxcbiAgICAgICAgICAgIGV4dGVuc2lvbnM6IHtcbiAgICAgICAgICAgICAgLi4udGV4dHVyZVRyYW5zZm9ybUV4dCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfVxuICAgICAgICA6IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0IG91dGxpbmVDb2xvckZhY3RvciA9IChtYXRlcmlhbFByb3BlcnRpZXMudmVjdG9yUHJvcGVydGllcz8uWydfT3V0bGluZUNvbG9yJ10gPz8gWzAuMCwgMC4wLCAwLjBdKS5tYXAoXG4gICAgICBnYW1tYUVPVEYsXG4gICAgKTtcbiAgICBjb25zdCBvdXRsaW5lQ29sb3JNb2RlID0gbWF0ZXJpYWxQcm9wZXJ0aWVzLmZsb2F0UHJvcGVydGllcz8uWydfT3V0bGluZUNvbG9yTW9kZSddID8/IDA7IC8vIGVudW0sIHsgRml4ZWQsIE1peGVkIH1cbiAgICBjb25zdCBvdXRsaW5lTGlnaHRpbmdNaXhGYWN0b3IgPVxuICAgICAgb3V0bGluZUNvbG9yTW9kZSA9PT0gMSA/IChtYXRlcmlhbFByb3BlcnRpZXMuZmxvYXRQcm9wZXJ0aWVzPy5bJ19PdXRsaW5lTGlnaHRpbmdNaXgnXSA/PyAxLjApIDogMC4wO1xuXG4gICAgY29uc3QgdXZBbmltYXRpb25NYXNrVGV4dHVyZUluZGV4ID0gbWF0ZXJpYWxQcm9wZXJ0aWVzLnRleHR1cmVQcm9wZXJ0aWVzPy5bJ19VdkFuaW1NYXNrVGV4dHVyZSddO1xuICAgIGNvbnN0IHV2QW5pbWF0aW9uTWFza1RleHR1cmUgPVxuICAgICAgdXZBbmltYXRpb25NYXNrVGV4dHVyZUluZGV4ICE9IG51bGxcbiAgICAgICAgPyB7XG4gICAgICAgICAgICBpbmRleDogdXZBbmltYXRpb25NYXNrVGV4dHVyZUluZGV4LFxuICAgICAgICAgICAgZXh0ZW5zaW9uczoge1xuICAgICAgICAgICAgICAuLi50ZXh0dXJlVHJhbnNmb3JtRXh0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9XG4gICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgY29uc3QgdXZBbmltYXRpb25TY3JvbGxYU3BlZWRGYWN0b3IgPSBtYXRlcmlhbFByb3BlcnRpZXMuZmxvYXRQcm9wZXJ0aWVzPy5bJ19VdkFuaW1TY3JvbGxYJ10gPz8gMC4wO1xuXG4gICAgLy8gdXZBbmltYXRpb25TY3JvbGxZU3BlZWRGYWN0b3Igd2lsbCBiZSBvcHBvc2l0ZSBiZXR3ZWVuIFYwIGFuZCBWMVxuICAgIGxldCB1dkFuaW1hdGlvblNjcm9sbFlTcGVlZEZhY3RvciA9IG1hdGVyaWFsUHJvcGVydGllcy5mbG9hdFByb3BlcnRpZXM/LlsnX1V2QW5pbVNjcm9sbFknXSA/PyAwLjA7XG4gICAgaWYgKHV2QW5pbWF0aW9uU2Nyb2xsWVNwZWVkRmFjdG9yICE9IG51bGwpIHtcbiAgICAgIHV2QW5pbWF0aW9uU2Nyb2xsWVNwZWVkRmFjdG9yID0gLXV2QW5pbWF0aW9uU2Nyb2xsWVNwZWVkRmFjdG9yO1xuICAgIH1cblxuICAgIGNvbnN0IHV2QW5pbWF0aW9uUm90YXRpb25TcGVlZEZhY3RvciA9IG1hdGVyaWFsUHJvcGVydGllcy5mbG9hdFByb3BlcnRpZXM/LlsnX1V2QW5pbVJvdGF0aW9uJ10gPz8gMC4wO1xuXG4gICAgY29uc3QgbXRvb25FeHRlbnNpb246IFYxTVRvb25TY2hlbWEuVlJNQ01hdGVyaWFsc01Ub29uID0ge1xuICAgICAgc3BlY1ZlcnNpb246ICcxLjAnLFxuICAgICAgdHJhbnNwYXJlbnRXaXRoWldyaXRlLFxuICAgICAgcmVuZGVyUXVldWVPZmZzZXROdW1iZXIsXG4gICAgICBzaGFkZUNvbG9yRmFjdG9yLFxuICAgICAgc2hhZGVNdWx0aXBseVRleHR1cmUsXG4gICAgICBzaGFkaW5nU2hpZnRGYWN0b3IsXG4gICAgICBzaGFkaW5nVG9vbnlGYWN0b3IsXG4gICAgICBnaUVxdWFsaXphdGlvbkZhY3RvcixcbiAgICAgIG1hdGNhcEZhY3RvcixcbiAgICAgIG1hdGNhcFRleHR1cmUsXG4gICAgICByaW1MaWdodGluZ01peEZhY3RvcixcbiAgICAgIHJpbU11bHRpcGx5VGV4dHVyZSxcbiAgICAgIHBhcmFtZXRyaWNSaW1Db2xvckZhY3RvcixcbiAgICAgIHBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJGYWN0b3IsXG4gICAgICBwYXJhbWV0cmljUmltTGlmdEZhY3RvcixcbiAgICAgIG91dGxpbmVXaWR0aE1vZGUsXG4gICAgICBvdXRsaW5lV2lkdGhGYWN0b3IsXG4gICAgICBvdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmUsXG4gICAgICBvdXRsaW5lQ29sb3JGYWN0b3IsXG4gICAgICBvdXRsaW5lTGlnaHRpbmdNaXhGYWN0b3IsXG4gICAgICB1dkFuaW1hdGlvbk1hc2tUZXh0dXJlLFxuICAgICAgdXZBbmltYXRpb25TY3JvbGxYU3BlZWRGYWN0b3IsXG4gICAgICB1dkFuaW1hdGlvblNjcm9sbFlTcGVlZEZhY3RvcixcbiAgICAgIHV2QW5pbWF0aW9uUm90YXRpb25TcGVlZEZhY3RvcixcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnNjaGVtYU1hdGVyaWFsLFxuXG4gICAgICBwYnJNZXRhbGxpY1JvdWdobmVzczoge1xuICAgICAgICBiYXNlQ29sb3JGYWN0b3IsXG4gICAgICAgIGJhc2VDb2xvclRleHR1cmUsXG4gICAgICB9LFxuICAgICAgbm9ybWFsVGV4dHVyZSxcbiAgICAgIGVtaXNzaXZlVGV4dHVyZSxcbiAgICAgIGVtaXNzaXZlRmFjdG9yLFxuICAgICAgYWxwaGFNb2RlLFxuICAgICAgYWxwaGFDdXRvZmYsXG4gICAgICBkb3VibGVTaWRlZCxcbiAgICAgIGV4dGVuc2lvbnM6IHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxuICAgICAgICBWUk1DX21hdGVyaWFsc19tdG9vbjogbXRvb25FeHRlbnNpb24sXG4gICAgICB9LFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZVYwVW5saXRQcm9wZXJ0aWVzKFxuICAgIG1hdGVyaWFsUHJvcGVydGllczogVjBNYXRlcmlhbCxcbiAgICBzY2hlbWFNYXRlcmlhbDogR0xURlNjaGVtYS5JTWF0ZXJpYWwsXG4gICk6IEdMVEZTY2hlbWEuSU1hdGVyaWFsIHtcbiAgICBjb25zdCBpc1RyYW5zcGFyZW50WldyaXRlID0gbWF0ZXJpYWxQcm9wZXJ0aWVzLnNoYWRlciA9PT0gJ1ZSTS9VbmxpdFRyYW5zcGFyZW50WldyaXRlJztcbiAgICBjb25zdCBpc1RyYW5zcGFyZW50ID0gbWF0ZXJpYWxQcm9wZXJ0aWVzLnNoYWRlciA9PT0gJ1ZSTS9VbmxpdFRyYW5zcGFyZW50JyB8fCBpc1RyYW5zcGFyZW50WldyaXRlO1xuXG4gICAgY29uc3QgcmVuZGVyUXVldWVPZmZzZXROdW1iZXIgPSB0aGlzLl92MFBhcnNlUmVuZGVyUXVldWUobWF0ZXJpYWxQcm9wZXJ0aWVzKTtcblxuICAgIGNvbnN0IGlzQ3V0b2ZmID0gbWF0ZXJpYWxQcm9wZXJ0aWVzLnNoYWRlciA9PT0gJ1ZSTS9VbmxpdEN1dG91dCc7XG4gICAgY29uc3QgYWxwaGFNb2RlID0gaXNUcmFuc3BhcmVudCA/ICdCTEVORCcgOiBpc0N1dG9mZiA/ICdNQVNLJyA6ICdPUEFRVUUnO1xuICAgIGNvbnN0IGFscGhhQ3V0b2ZmID0gaXNDdXRvZmYgPyAobWF0ZXJpYWxQcm9wZXJ0aWVzLmZsb2F0UHJvcGVydGllcz8uWydfQ3V0b2ZmJ10gPz8gMC41KSA6IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0IHRleHR1cmVUcmFuc2Zvcm1FeHQgPSB0aGlzLl9wb3J0VGV4dHVyZVRyYW5zZm9ybShtYXRlcmlhbFByb3BlcnRpZXMpO1xuXG4gICAgY29uc3QgYmFzZUNvbG9yRmFjdG9yID0gKG1hdGVyaWFsUHJvcGVydGllcy52ZWN0b3JQcm9wZXJ0aWVzPy5bJ19Db2xvciddID8/IFsxLjAsIDEuMCwgMS4wLCAxLjBdKS5tYXAoZ2FtbWFFT1RGKTtcbiAgICBjb25zdCBiYXNlQ29sb3JUZXh0dXJlSW5kZXggPSBtYXRlcmlhbFByb3BlcnRpZXMudGV4dHVyZVByb3BlcnRpZXM/LlsnX01haW5UZXgnXTtcbiAgICBjb25zdCBiYXNlQ29sb3JUZXh0dXJlID1cbiAgICAgIGJhc2VDb2xvclRleHR1cmVJbmRleCAhPSBudWxsXG4gICAgICAgID8ge1xuICAgICAgICAgICAgaW5kZXg6IGJhc2VDb2xvclRleHR1cmVJbmRleCxcbiAgICAgICAgICAgIGV4dGVuc2lvbnM6IHtcbiAgICAgICAgICAgICAgLi4udGV4dHVyZVRyYW5zZm9ybUV4dCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfVxuICAgICAgICA6IHVuZGVmaW5lZDtcblxuICAgIC8vIHVzZSBtdG9vbiBpbnN0ZWFkIG9mIHVubGl0LCBzaW5jZSB0aGVyZSBtaWdodCBiZSBWUk0wLjAgc3BlY2lmaWMgZmVhdHVyZXMgdGhhdCBhcmUgbm90IHN1cHBvcnRlZCBieSBnbHRmXG4gICAgY29uc3QgbXRvb25FeHRlbnNpb246IFYxTVRvb25TY2hlbWEuVlJNQ01hdGVyaWFsc01Ub29uID0ge1xuICAgICAgc3BlY1ZlcnNpb246ICcxLjAnLFxuICAgICAgdHJhbnNwYXJlbnRXaXRoWldyaXRlOiBpc1RyYW5zcGFyZW50WldyaXRlLFxuICAgICAgcmVuZGVyUXVldWVPZmZzZXROdW1iZXIsXG4gICAgICBzaGFkZUNvbG9yRmFjdG9yOiBiYXNlQ29sb3JGYWN0b3IsXG4gICAgICBzaGFkZU11bHRpcGx5VGV4dHVyZTogYmFzZUNvbG9yVGV4dHVyZSxcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnNjaGVtYU1hdGVyaWFsLFxuXG4gICAgICBwYnJNZXRhbGxpY1JvdWdobmVzczoge1xuICAgICAgICBiYXNlQ29sb3JGYWN0b3IsXG4gICAgICAgIGJhc2VDb2xvclRleHR1cmUsXG4gICAgICB9LFxuICAgICAgYWxwaGFNb2RlLFxuICAgICAgYWxwaGFDdXRvZmYsXG4gICAgICBleHRlbnNpb25zOiB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cbiAgICAgICAgVlJNQ19tYXRlcmlhbHNfbXRvb246IG10b29uRXh0ZW5zaW9uLFxuICAgICAgfSxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIGdsVEYgYEtIUl90ZXh0dXJlX3RyYW5zZm9ybWAgZXh0ZW5zaW9uIGZyb20gdjAgdGV4dHVyZSB0cmFuc2Zvcm0gaW5mby5cbiAgICovXG4gIHByaXZhdGUgX3BvcnRUZXh0dXJlVHJhbnNmb3JtKG1hdGVyaWFsUHJvcGVydGllczogVjBNYXRlcmlhbCk6IHsgW25hbWU6IHN0cmluZ106IGFueSB9IHtcbiAgICBjb25zdCB0ZXh0dXJlVHJhbnNmb3JtID0gbWF0ZXJpYWxQcm9wZXJ0aWVzLnZlY3RvclByb3BlcnRpZXM/LlsnX01haW5UZXgnXTtcbiAgICBpZiAodGV4dHVyZVRyYW5zZm9ybSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4ge307XG4gICAgfVxuXG4gICAgY29uc3Qgb2Zmc2V0ID0gW3RleHR1cmVUcmFuc2Zvcm0/LlswXSA/PyAwLjAsIHRleHR1cmVUcmFuc2Zvcm0/LlsxXSA/PyAwLjBdO1xuICAgIGNvbnN0IHNjYWxlID0gW3RleHR1cmVUcmFuc2Zvcm0/LlsyXSA/PyAxLjAsIHRleHR1cmVUcmFuc2Zvcm0/LlszXSA/PyAxLjBdO1xuXG4gICAgb2Zmc2V0WzFdID0gMS4wIC0gc2NhbGVbMV0gLSBvZmZzZXRbMV07XG5cbiAgICByZXR1cm4ge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxuICAgICAgS0hSX3RleHR1cmVfdHJhbnNmb3JtOiB7IG9mZnNldCwgc2NhbGUgfSxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnQgdjAgcmVuZGVyIG9yZGVyIGludG8gdjEgcmVuZGVyIG9yZGVyLlxuICAgKiBUaGlzIHVzZXMgYSBtYXAgZnJvbSB2MCByZW5kZXIgcXVldWUgdG8gdjEgY29tcGxpYW50IHJlbmRlciBxdWV1ZSBvZmZzZXQgd2hpY2ggaXMgZ2VuZXJhdGVkIGluIHtAbGluayBfcG9wdWxhdGVSZW5kZXJRdWV1ZU1hcH0uXG4gICAqL1xuICBwcml2YXRlIF92MFBhcnNlUmVuZGVyUXVldWUobWF0ZXJpYWxQcm9wZXJ0aWVzOiBWME1hdGVyaWFsKTogbnVtYmVyIHtcbiAgICBjb25zdCBpc1RyYW5zcGFyZW50WldyaXRlID0gbWF0ZXJpYWxQcm9wZXJ0aWVzLnNoYWRlciA9PT0gJ1ZSTS9VbmxpdFRyYW5zcGFyZW50WldyaXRlJztcbiAgICBjb25zdCBpc1RyYW5zcGFyZW50ID1cbiAgICAgIG1hdGVyaWFsUHJvcGVydGllcy5rZXl3b3JkTWFwPy5bJ19BTFBIQUJMRU5EX09OJ10gIT0gdW5kZWZpbmVkIHx8XG4gICAgICBtYXRlcmlhbFByb3BlcnRpZXMuc2hhZGVyID09PSAnVlJNL1VubGl0VHJhbnNwYXJlbnQnIHx8XG4gICAgICBpc1RyYW5zcGFyZW50WldyaXRlO1xuICAgIGNvbnN0IGVuYWJsZWRaV3JpdGUgPSBtYXRlcmlhbFByb3BlcnRpZXMuZmxvYXRQcm9wZXJ0aWVzPy5bJ19aV3JpdGUnXSA9PT0gMSB8fCBpc1RyYW5zcGFyZW50WldyaXRlO1xuXG4gICAgbGV0IG9mZnNldCA9IDA7XG5cbiAgICBpZiAoaXNUcmFuc3BhcmVudCkge1xuICAgICAgY29uc3QgdjBRdWV1ZSA9IG1hdGVyaWFsUHJvcGVydGllcy5yZW5kZXJRdWV1ZTtcblxuICAgICAgaWYgKHYwUXVldWUgIT0gbnVsbCkge1xuICAgICAgICBpZiAoZW5hYmxlZFpXcml0ZSkge1xuICAgICAgICAgIG9mZnNldCA9IHRoaXMuX3JlbmRlclF1ZXVlTWFwVHJhbnNwYXJlbnRaV3JpdGUuZ2V0KHYwUXVldWUpITtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvZmZzZXQgPSB0aGlzLl9yZW5kZXJRdWV1ZU1hcFRyYW5zcGFyZW50LmdldCh2MFF1ZXVlKSE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2Zmc2V0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG1hcCB3aGljaCBtYXBzIHYwIHJlbmRlciBxdWV1ZSB0byB2MSBjb21wbGlhbnQgcmVuZGVyIHF1ZXVlIG9mZnNldC5cbiAgICogVGhpcyBsaXN0cyB1cCBhbGwgcmVuZGVyIHF1ZXVlcyB0aGUgbW9kZWwgdXNlIGFuZCBjcmVhdGVzIGEgbWFwIHRvIG5ldyByZW5kZXIgcXVldWUgb2Zmc2V0cyBpbiB0aGUgc2FtZSBvcmRlci5cbiAgICovXG4gIHByaXZhdGUgX3BvcHVsYXRlUmVuZGVyUXVldWVNYXAobWF0ZXJpYWxQcm9wZXJ0aWVzTGlzdDogVjBNYXRlcmlhbFtdKSB7XG4gICAgLyoqXG4gICAgICogQSBzZXQgb2YgdXNlZCByZW5kZXIgcXVldWVzIGluIFRyYW5zcGFyZW50IG1hdGVyaWFscy5cbiAgICAgKi9cbiAgICBjb25zdCByZW5kZXJRdWV1ZXNUcmFuc3BhcmVudCA9IG5ldyBTZXQ8bnVtYmVyPigpO1xuXG4gICAgLyoqXG4gICAgICogQSBzZXQgb2YgdXNlZCByZW5kZXIgcXVldWVzIGluIFRyYW5zcGFyZW50WldyaXRlIG1hdGVyaWFscy5cbiAgICAgKi9cbiAgICBjb25zdCByZW5kZXJRdWV1ZXNUcmFuc3BhcmVudFpXcml0ZSA9IG5ldyBTZXQ8bnVtYmVyPigpO1xuXG4gICAgLy8gcG9wdWxhdGUgdGhlIHJlbmRlciBxdWV1ZSBzZXRcbiAgICBtYXRlcmlhbFByb3BlcnRpZXNMaXN0LmZvckVhY2goKG1hdGVyaWFsUHJvcGVydGllcykgPT4ge1xuICAgICAgY29uc3QgaXNUcmFuc3BhcmVudFpXcml0ZSA9IG1hdGVyaWFsUHJvcGVydGllcy5zaGFkZXIgPT09ICdWUk0vVW5saXRUcmFuc3BhcmVudFpXcml0ZSc7XG4gICAgICBjb25zdCBpc1RyYW5zcGFyZW50ID1cbiAgICAgICAgbWF0ZXJpYWxQcm9wZXJ0aWVzLmtleXdvcmRNYXA/LlsnX0FMUEhBQkxFTkRfT04nXSAhPSB1bmRlZmluZWQgfHxcbiAgICAgICAgbWF0ZXJpYWxQcm9wZXJ0aWVzLnNoYWRlciA9PT0gJ1ZSTS9VbmxpdFRyYW5zcGFyZW50JyB8fFxuICAgICAgICBpc1RyYW5zcGFyZW50WldyaXRlO1xuICAgICAgY29uc3QgZW5hYmxlZFpXcml0ZSA9IG1hdGVyaWFsUHJvcGVydGllcy5mbG9hdFByb3BlcnRpZXM/LlsnX1pXcml0ZSddID09PSAxIHx8IGlzVHJhbnNwYXJlbnRaV3JpdGU7XG5cbiAgICAgIGlmIChpc1RyYW5zcGFyZW50KSB7XG4gICAgICAgIGNvbnN0IHYwUXVldWUgPSBtYXRlcmlhbFByb3BlcnRpZXMucmVuZGVyUXVldWU7XG5cbiAgICAgICAgaWYgKHYwUXVldWUgIT0gbnVsbCkge1xuICAgICAgICAgIGlmIChlbmFibGVkWldyaXRlKSB7XG4gICAgICAgICAgICByZW5kZXJRdWV1ZXNUcmFuc3BhcmVudFpXcml0ZS5hZGQodjBRdWV1ZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlbmRlclF1ZXVlc1RyYW5zcGFyZW50LmFkZCh2MFF1ZXVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIHNob3cgYSB3YXJuaW5nIGlmIHRoZSBtb2RlbCB1c2VzIHYxIGluY29tcGF0aWJsZSBudW1iZXIgb2YgcmVuZGVyIHF1ZXVlc1xuICAgIGlmIChyZW5kZXJRdWV1ZXNUcmFuc3BhcmVudC5zaXplID4gMTApIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgYFZSTU1hdGVyaWFsc1YwQ29tcGF0UGx1Z2luOiBUaGlzIFZSTSB1c2VzICR7cmVuZGVyUXVldWVzVHJhbnNwYXJlbnQuc2l6ZX0gcmVuZGVyIHF1ZXVlcyBmb3IgVHJhbnNwYXJlbnQgbWF0ZXJpYWxzIHdoaWxlIFZSTSAxLjAgb25seSBzdXBwb3J0cyB1cCB0byAxMCByZW5kZXIgcXVldWVzLiBUaGUgbW9kZWwgbWlnaHQgbm90IGJlIHJlbmRlcmVkIGNvcnJlY3RseS5gLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAocmVuZGVyUXVldWVzVHJhbnNwYXJlbnRaV3JpdGUuc2l6ZSA+IDEwKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIGBWUk1NYXRlcmlhbHNWMENvbXBhdFBsdWdpbjogVGhpcyBWUk0gdXNlcyAke3JlbmRlclF1ZXVlc1RyYW5zcGFyZW50WldyaXRlLnNpemV9IHJlbmRlciBxdWV1ZXMgZm9yIFRyYW5zcGFyZW50WldyaXRlIG1hdGVyaWFscyB3aGlsZSBWUk0gMS4wIG9ubHkgc3VwcG9ydHMgdXAgdG8gMTAgcmVuZGVyIHF1ZXVlcy4gVGhlIG1vZGVsIG1pZ2h0IG5vdCBiZSByZW5kZXJlZCBjb3JyZWN0bHkuYCxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gY3JlYXRlIGEgbWFwIGZyb20gdjAgcmVuZGVyIHF1ZXVlIHRvIHYxIHJlbmRlciBxdWV1ZSBvZmZzZXRcbiAgICBBcnJheS5mcm9tKHJlbmRlclF1ZXVlc1RyYW5zcGFyZW50KVxuICAgICAgLnNvcnQoKVxuICAgICAgLmZvckVhY2goKHF1ZXVlLCBpKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld1F1ZXVlT2Zmc2V0ID0gTWF0aC5taW4oTWF0aC5tYXgoaSAtIHJlbmRlclF1ZXVlc1RyYW5zcGFyZW50LnNpemUgKyAxLCAtOSksIDApO1xuICAgICAgICB0aGlzLl9yZW5kZXJRdWV1ZU1hcFRyYW5zcGFyZW50LnNldChxdWV1ZSwgbmV3UXVldWVPZmZzZXQpO1xuICAgICAgfSk7XG5cbiAgICBBcnJheS5mcm9tKHJlbmRlclF1ZXVlc1RyYW5zcGFyZW50WldyaXRlKVxuICAgICAgLnNvcnQoKVxuICAgICAgLmZvckVhY2goKHF1ZXVlLCBpKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld1F1ZXVlT2Zmc2V0ID0gTWF0aC5taW4oTWF0aC5tYXgoaSwgMCksIDkpO1xuICAgICAgICB0aGlzLl9yZW5kZXJRdWV1ZU1hcFRyYW5zcGFyZW50WldyaXRlLnNldChxdWV1ZSwgbmV3UXVldWVPZmZzZXQpO1xuICAgICAgfSk7XG4gIH1cbn1cbiIsICJleHBvcnQgZnVuY3Rpb24gZ2FtbWFFT1RGKGU6IG51bWJlcik6IG51bWJlciB7XG4gIHJldHVybiBNYXRoLnBvdyhlLCAyLjIpO1xufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTU5vZGVDb25zdHJhaW50IH0gZnJvbSAnLi4vVlJNTm9kZUNvbnN0cmFpbnQnO1xuXG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuZXhwb3J0IGNsYXNzIFZSTU5vZGVDb25zdHJhaW50SGVscGVyIGV4dGVuZHMgVEhSRUUuR3JvdXAge1xuICBwdWJsaWMgcmVhZG9ubHkgY29uc3RyYWludDogVlJNTm9kZUNvbnN0cmFpbnQ7XG4gIHByaXZhdGUgX2xpbmU6IFRIUkVFLkxpbmU7XG4gIHByaXZhdGUgX2F0dHJQb3NpdGlvbjogVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb25zdHJhaW50OiBWUk1Ob2RlQ29uc3RyYWludCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLl9hdHRyUG9zaXRpb24gPSBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKG5ldyBGbG9hdDMyQXJyYXkoWzAsIDAsIDAsIDAsIDAsIDBdKSwgMyk7XG4gICAgdGhpcy5fYXR0clBvc2l0aW9uLnNldFVzYWdlKFRIUkVFLkR5bmFtaWNEcmF3VXNhZ2UpO1xuXG4gICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuQnVmZmVyR2VvbWV0cnkoKTtcbiAgICBnZW9tZXRyeS5zZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJywgdGhpcy5fYXR0clBvc2l0aW9uKTtcblxuICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLkxpbmVCYXNpY01hdGVyaWFsKHtcbiAgICAgIGNvbG9yOiAweGZmMDBmZixcbiAgICAgIGRlcHRoVGVzdDogZmFsc2UsXG4gICAgICBkZXB0aFdyaXRlOiBmYWxzZSxcbiAgICB9KTtcblxuICAgIHRoaXMuX2xpbmUgPSBuZXcgVEhSRUUuTGluZShnZW9tZXRyeSwgbWF0ZXJpYWwpO1xuICAgIHRoaXMuYWRkKHRoaXMuX2xpbmUpO1xuXG4gICAgdGhpcy5jb25zdHJhaW50ID0gY29uc3RyYWludDtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVNYXRyaXhXb3JsZChmb3JjZT86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBfdjNBLnNldEZyb21NYXRyaXhQb3NpdGlvbih0aGlzLmNvbnN0cmFpbnQuZGVzdGluYXRpb24ubWF0cml4V29ybGQpO1xuICAgIHRoaXMuX2F0dHJQb3NpdGlvbi5zZXRYWVooMCwgX3YzQS54LCBfdjNBLnksIF92M0Eueik7XG5cbiAgICBpZiAodGhpcy5jb25zdHJhaW50LnNvdXJjZSkge1xuICAgICAgX3YzQS5zZXRGcm9tTWF0cml4UG9zaXRpb24odGhpcy5jb25zdHJhaW50LnNvdXJjZS5tYXRyaXhXb3JsZCk7XG4gICAgfVxuICAgIHRoaXMuX2F0dHJQb3NpdGlvbi5zZXRYWVooMSwgX3YzQS54LCBfdjNBLnksIF92M0Eueik7XG5cbiAgICB0aGlzLl9hdHRyUG9zaXRpb24ubmVlZHNVcGRhdGUgPSB0cnVlO1xuXG4gICAgc3VwZXIudXBkYXRlTWF0cml4V29ybGQoZm9yY2UpO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgZGVjb21wb3NlUG9zaXRpb24gfSBmcm9tICcuL3V0aWxzL2RlY29tcG9zZVBvc2l0aW9uJztcbmltcG9ydCB7IGRlY29tcG9zZVJvdGF0aW9uIH0gZnJvbSAnLi91dGlscy9kZWNvbXBvc2VSb3RhdGlvbic7XG5pbXBvcnQgeyBxdWF0SW52ZXJ0Q29tcGF0IH0gZnJvbSAnLi91dGlscy9xdWF0SW52ZXJ0Q29tcGF0JztcbmltcG9ydCB7IFZSTU5vZGVDb25zdHJhaW50IH0gZnJvbSAnLi9WUk1Ob2RlQ29uc3RyYWludCc7XG5cbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3YzQiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfdjNDID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF9xdWF0QSA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5jb25zdCBfcXVhdEIgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuY29uc3QgX3F1YXRDID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblxuLyoqXG4gKiBBIGNvbnN0cmFpbnQgdGhhdCBtYWtlcyBpdCBsb29rIGF0IGEgc291cmNlIG9iamVjdC5cbiAqXG4gKiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS92cm0tYy92cm0tc3BlY2lmaWNhdGlvbi90cmVlL21hc3Rlci9zcGVjaWZpY2F0aW9uL1ZSTUNfbm9kZV9jb25zdHJhaW50LTEuMF9iZXRhI3JvbGwtY29uc3RyYWludFxuICovXG5leHBvcnQgY2xhc3MgVlJNQWltQ29uc3RyYWludCBleHRlbmRzIFZSTU5vZGVDb25zdHJhaW50IHtcbiAgLyoqXG4gICAqIFRoZSBhaW0gYXhpcyBvZiB0aGUgY29uc3RyYWludC5cbiAgICovXG4gIHB1YmxpYyBnZXQgYWltQXhpcygpOiAnUG9zaXRpdmVYJyB8ICdOZWdhdGl2ZVgnIHwgJ1Bvc2l0aXZlWScgfCAnTmVnYXRpdmVZJyB8ICdQb3NpdGl2ZVonIHwgJ05lZ2F0aXZlWicge1xuICAgIHJldHVybiB0aGlzLl9haW1BeGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBhaW0gYXhpcyBvZiB0aGUgY29uc3RyYWludC5cbiAgICovXG4gIHB1YmxpYyBzZXQgYWltQXhpcyhhaW1BeGlzOiAnUG9zaXRpdmVYJyB8ICdOZWdhdGl2ZVgnIHwgJ1Bvc2l0aXZlWScgfCAnTmVnYXRpdmVZJyB8ICdQb3NpdGl2ZVonIHwgJ05lZ2F0aXZlWicpIHtcbiAgICB0aGlzLl9haW1BeGlzID0gYWltQXhpcztcbiAgICB0aGlzLl92M0FpbUF4aXMuc2V0KFxuICAgICAgYWltQXhpcyA9PT0gJ1Bvc2l0aXZlWCcgPyAxLjAgOiBhaW1BeGlzID09PSAnTmVnYXRpdmVYJyA/IC0xLjAgOiAwLjAsXG4gICAgICBhaW1BeGlzID09PSAnUG9zaXRpdmVZJyA/IDEuMCA6IGFpbUF4aXMgPT09ICdOZWdhdGl2ZVknID8gLTEuMCA6IDAuMCxcbiAgICAgIGFpbUF4aXMgPT09ICdQb3NpdGl2ZVonID8gMS4wIDogYWltQXhpcyA9PT0gJ05lZ2F0aXZlWicgPyAtMS4wIDogMC4wLFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGFpbSBheGlzIG9mIHRoZSBjb25zdHJhaW50LlxuICAgKi9cbiAgcHJpdmF0ZSBfYWltQXhpczogJ1Bvc2l0aXZlWCcgfCAnTmVnYXRpdmVYJyB8ICdQb3NpdGl2ZVknIHwgJ05lZ2F0aXZlWScgfCAnUG9zaXRpdmVaJyB8ICdOZWdhdGl2ZVonO1xuXG4gIC8qKlxuICAgKiBUaGUge0BsaW5rIF9haW1BeGlzfSBidXQgaW4gYW4gYWN0dWFsIFZlY3RvcjMgZm9ybS5cbiAgICovXG4gIHByaXZhdGUgX3YzQWltQXhpczogVEhSRUUuVmVjdG9yMztcblxuICAvKipcbiAgICogVGhlIHJlc3QgcXVhdGVybmlvbiBvZiB0aGUge0BsaW5rIGRlc3RpbmF0aW9ufS5cbiAgICovXG4gIHByaXZhdGUgX2RzdFJlc3RRdWF0OiBUSFJFRS5RdWF0ZXJuaW9uO1xuXG4gIHB1YmxpYyBnZXQgZGVwZW5kZW5jaWVzKCk6IFNldDxUSFJFRS5PYmplY3QzRD4ge1xuICAgIGNvbnN0IHNldCA9IG5ldyBTZXQ8VEhSRUUuT2JqZWN0M0Q+KFt0aGlzLnNvdXJjZV0pO1xuXG4gICAgaWYgKHRoaXMuZGVzdGluYXRpb24ucGFyZW50KSB7XG4gICAgICBzZXQuYWRkKHRoaXMuZGVzdGluYXRpb24ucGFyZW50KTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2V0O1xuICB9XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBUSFJFRS5PYmplY3QzRCwgc291cmNlOiBUSFJFRS5PYmplY3QzRCkge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uLCBzb3VyY2UpO1xuXG4gICAgdGhpcy5fYWltQXhpcyA9ICdQb3NpdGl2ZVgnO1xuICAgIHRoaXMuX3YzQWltQXhpcyA9IG5ldyBUSFJFRS5WZWN0b3IzKDEsIDAsIDApO1xuXG4gICAgdGhpcy5fZHN0UmVzdFF1YXQgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuICB9XG5cbiAgcHVibGljIHNldEluaXRTdGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9kc3RSZXN0UXVhdC5jb3B5KHRoaXMuZGVzdGluYXRpb24ucXVhdGVybmlvbik7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIC8vIHVwZGF0ZSB3b3JsZCBtYXRyaXggb2YgZGVzdGluYXRpb24gYW5kIHNvdXJjZSBtYW51YWxseVxuICAgIHRoaXMuZGVzdGluYXRpb24udXBkYXRlV29ybGRNYXRyaXgodHJ1ZSwgZmFsc2UpO1xuICAgIHRoaXMuc291cmNlLnVwZGF0ZVdvcmxkTWF0cml4KHRydWUsIGZhbHNlKTtcblxuICAgIC8vIGdldCB3b3JsZCBxdWF0ZXJuaW9uIG9mIHRoZSBwYXJlbnQgb2YgdGhlIGRlc3RpbmF0aW9uXG4gICAgY29uc3QgZHN0UGFyZW50V29ybGRRdWF0ID0gX3F1YXRBLmlkZW50aXR5KCk7XG4gICAgY29uc3QgaW52RHN0UGFyZW50V29ybGRRdWF0ID0gX3F1YXRCLmlkZW50aXR5KCk7XG4gICAgaWYgKHRoaXMuZGVzdGluYXRpb24ucGFyZW50KSB7XG4gICAgICBkZWNvbXBvc2VSb3RhdGlvbih0aGlzLmRlc3RpbmF0aW9uLnBhcmVudC5tYXRyaXhXb3JsZCwgZHN0UGFyZW50V29ybGRRdWF0KTtcbiAgICAgIHF1YXRJbnZlcnRDb21wYXQoaW52RHN0UGFyZW50V29ybGRRdWF0LmNvcHkoZHN0UGFyZW50V29ybGRRdWF0KSk7XG4gICAgfVxuXG4gICAgLy8gY2FsY3VsYXRlIGZyb20tdG8gdmVjdG9ycyBpbiB3b3JsZCBjb29yZFxuICAgIGNvbnN0IGEwID0gX3YzQS5jb3B5KHRoaXMuX3YzQWltQXhpcykuYXBwbHlRdWF0ZXJuaW9uKHRoaXMuX2RzdFJlc3RRdWF0KS5hcHBseVF1YXRlcm5pb24oZHN0UGFyZW50V29ybGRRdWF0KTtcbiAgICBjb25zdCBhMSA9IGRlY29tcG9zZVBvc2l0aW9uKHRoaXMuc291cmNlLm1hdHJpeFdvcmxkLCBfdjNCKVxuICAgICAgLnN1YihkZWNvbXBvc2VQb3NpdGlvbih0aGlzLmRlc3RpbmF0aW9uLm1hdHJpeFdvcmxkLCBfdjNDKSlcbiAgICAgIC5ub3JtYWxpemUoKTtcblxuICAgIC8vIGNyZWF0ZSBhIGZyb20tdG8gcXVhdGVybmlvbiwgY29udmVydCB0byBkZXN0aW5hdGlvbiBsb2NhbCBjb29yZCwgdGhlbiBtdWx0aXBseSByZXN0IHF1YXRlcm5pb25cbiAgICBjb25zdCB0YXJnZXRRdWF0ID0gX3F1YXRDXG4gICAgICAuc2V0RnJvbVVuaXRWZWN0b3JzKGEwLCBhMSlcbiAgICAgIC5wcmVtdWx0aXBseShpbnZEc3RQYXJlbnRXb3JsZFF1YXQpXG4gICAgICAubXVsdGlwbHkoZHN0UGFyZW50V29ybGRRdWF0KVxuICAgICAgLm11bHRpcGx5KHRoaXMuX2RzdFJlc3RRdWF0KTtcblxuICAgIC8vIGJsZW5kIHdpdGggdGhlIHJlc3QgcXVhdGVybmlvbiB1c2luZyB3ZWlnaHRcbiAgICB0aGlzLmRlc3RpbmF0aW9uLnF1YXRlcm5pb24uY29weSh0aGlzLl9kc3RSZXN0UXVhdCkuc2xlcnAodGFyZ2V0UXVhdCwgdGhpcy53ZWlnaHQpO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG5leHBvcnQgZnVuY3Rpb24gZGVjb21wb3NlUG9zaXRpb248VCBleHRlbmRzIFRIUkVFLlZlY3RvcjM+KG1hdHJpeDogVEhSRUUuTWF0cml4NCwgdGFyZ2V0OiBUKTogVCB7XG4gIHJldHVybiB0YXJnZXQuc2V0KG1hdHJpeC5lbGVtZW50c1sxMl0sIG1hdHJpeC5lbGVtZW50c1sxM10sIG1hdHJpeC5lbGVtZW50c1sxNF0pO1xufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuY29uc3QgX3YzQSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfdjNCID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGRlY29tcG9zZVJvdGF0aW9uPFQgZXh0ZW5kcyBUSFJFRS5RdWF0ZXJuaW9uPihtYXRyaXg6IFRIUkVFLk1hdHJpeDQsIHRhcmdldDogVCk6IFQge1xuICBtYXRyaXguZGVjb21wb3NlKF92M0EsIHRhcmdldCwgX3YzQik7XG4gIHJldHVybiB0YXJnZXQ7XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIEEgY29tcGF0IGZ1bmN0aW9uIGZvciBgUXVhdGVybmlvbi5pbnZlcnQoKWAgLyBgUXVhdGVybmlvbi5pbnZlcnNlKClgLlxuICogYFF1YXRlcm5pb24uaW52ZXJ0KClgIGlzIGludHJvZHVjZWQgaW4gcjEyMyBhbmQgYFF1YXRlcm5pb24uaW52ZXJzZSgpYCBlbWl0cyBhIHdhcm5pbmcuXG4gKiBXZSBhcmUgZ29pbmcgdG8gdXNlIHRoaXMgY29tcGF0IGZvciBhIHdoaWxlLlxuICogQHBhcmFtIHRhcmdldCBBIHRhcmdldCBxdWF0ZXJuaW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBxdWF0SW52ZXJ0Q29tcGF0PFQgZXh0ZW5kcyBUSFJFRS5RdWF0ZXJuaW9uPih0YXJnZXQ6IFQpOiBUIHtcbiAgaWYgKCh0YXJnZXQgYXMgYW55KS5pbnZlcnQpIHtcbiAgICB0YXJnZXQuaW52ZXJ0KCk7XG4gIH0gZWxzZSB7XG4gICAgKHRhcmdldCBhcyBhbnkpLmludmVyc2UoKTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIEEgYmFzZSBjbGFzcyBvZiBWUk0gY29uc3RyYWludCBjbGFzc2VzLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVlJNTm9kZUNvbnN0cmFpbnQge1xuICAvKipcbiAgICogVGhlIG9iamVjdCBiZWluZyBjb25zdHJhaW5lZCBieSB0aGUge0BsaW5rIHNvdXJjZX0uXG4gICAqL1xuICBwdWJsaWMgZGVzdGluYXRpb246IFRIUkVFLk9iamVjdDNEO1xuXG4gIC8qKlxuICAgKiBUaGUgb2JqZWN0IGNvbnN0cmFpbnMgdGhlIHtAbGluayBkZXN0aW5hdGlvbn0uXG4gICAqL1xuICBwdWJsaWMgc291cmNlOiBUSFJFRS5PYmplY3QzRDtcblxuICAvKipcbiAgICogVGhlIHdlaWdodCBvZiB0aGUgY29uc3RyYWludC5cbiAgICovXG4gIHB1YmxpYyB3ZWlnaHQ6IG51bWJlcjtcblxuICBwdWJsaWMgYWJzdHJhY3QgZ2V0IGRlcGVuZGVuY2llcygpOiBTZXQ8VEhSRUUuT2JqZWN0M0Q+O1xuXG4gIC8qKlxuICAgKiBAcGFyYW0gZGVzdGluYXRpb24gVGhlIGRlc3RpbmF0aW9uIG9iamVjdFxuICAgKiBAcGFyYW0gc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0XG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFRIUkVFLk9iamVjdDNELCBzb3VyY2U6IFRIUkVFLk9iamVjdDNEKSB7XG4gICAgdGhpcy5kZXN0aW5hdGlvbiA9IGRlc3RpbmF0aW9uO1xuICAgIHRoaXMuc291cmNlID0gc291cmNlO1xuXG4gICAgdGhpcy53ZWlnaHQgPSAxLjA7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGluaXRpYWwgc3RhdGUgb2YgdGhlIGNvbnN0cmFpbnQuXG4gICAqL1xuICBwdWJsaWMgYWJzdHJhY3Qgc2V0SW5pdFN0YXRlKCk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBhbmQgYXBwbHkgdGhlIGNvbnN0cmFpbnQuXG4gICAqL1xuICBwdWJsaWMgYWJzdHJhY3QgdXBkYXRlKCk6IHZvaWQ7XG59XG4iLCAiaW1wb3J0IHR5cGUgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbi8qKlxuICogVHJhdmVyc2UgYW5jZXN0b3JzIG9mIGdpdmVuIG9iamVjdCBhbmQgY2FsbCBnaXZlbiBjYWxsYmFjayBmcm9tIHJvb3Qgc2lkZS5cbiAqIEl0IHdpbGwgaW5jbHVkZSB0aGUgZ2l2ZW4gb2JqZWN0IGl0c2VsZi5cbiAqXG4gKiBAcGFyYW0gb2JqZWN0IFRoZSBvYmplY3QgeW91IHdhbnQgdG8gdHJhdmVyc2VcbiAqIEBwYXJhbSBjYWxsYmFjayBUaGUgY2FsbCBiYWNrIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSBjYWxsZWQgZm9yIGVhY2ggYW5jZXN0b3JzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0cmF2ZXJzZUFuY2VzdG9yc0Zyb21Sb290KG9iamVjdDogVEhSRUUuT2JqZWN0M0QsIGNhbGxiYWNrOiAob2JqZWN0OiBUSFJFRS5PYmplY3QzRCkgPT4gdm9pZCk6IHZvaWQge1xuICBjb25zdCBhbmNlc3RvcnM6IFRIUkVFLk9iamVjdDNEW10gPSBbb2JqZWN0XTtcblxuICBsZXQgaGVhZDogVEhSRUUuT2JqZWN0M0QgfCBudWxsID0gb2JqZWN0LnBhcmVudDtcbiAgd2hpbGUgKGhlYWQgIT09IG51bGwpIHtcbiAgICBhbmNlc3RvcnMudW5zaGlmdChoZWFkKTtcbiAgICBoZWFkID0gaGVhZC5wYXJlbnQ7XG4gIH1cblxuICBhbmNlc3RvcnMuZm9yRWFjaCgoYW5jZXN0b3IpID0+IHtcbiAgICBjYWxsYmFjayhhbmNlc3Rvcik7XG4gIH0pO1xufVxuIiwgImltcG9ydCB0eXBlICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHR5cGUgeyBWUk1Ob2RlQ29uc3RyYWludCB9IGZyb20gJy4vVlJNTm9kZUNvbnN0cmFpbnQnO1xuaW1wb3J0IHsgdHJhdmVyc2VBbmNlc3RvcnNGcm9tUm9vdCB9IGZyb20gJy4vdXRpbHMvdHJhdmVyc2VBbmNlc3RvcnNGcm9tUm9vdCc7XG5cbmV4cG9ydCBjbGFzcyBWUk1Ob2RlQ29uc3RyYWludE1hbmFnZXIge1xuICBwcml2YXRlIF9jb25zdHJhaW50cyA9IG5ldyBTZXQ8VlJNTm9kZUNvbnN0cmFpbnQ+KCk7XG4gIHB1YmxpYyBnZXQgY29uc3RyYWludHMoKTogU2V0PFZSTU5vZGVDb25zdHJhaW50PiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnN0cmFpbnRzO1xuICB9XG5cbiAgcHJpdmF0ZSBfb2JqZWN0Q29uc3RyYWludHNNYXAgPSBuZXcgTWFwPFRIUkVFLk9iamVjdDNELCBTZXQ8VlJNTm9kZUNvbnN0cmFpbnQ+PigpO1xuXG4gIHB1YmxpYyBhZGRDb25zdHJhaW50KGNvbnN0cmFpbnQ6IFZSTU5vZGVDb25zdHJhaW50KTogdm9pZCB7XG4gICAgdGhpcy5fY29uc3RyYWludHMuYWRkKGNvbnN0cmFpbnQpO1xuXG4gICAgbGV0IG9iamVjdFNldCA9IHRoaXMuX29iamVjdENvbnN0cmFpbnRzTWFwLmdldChjb25zdHJhaW50LmRlc3RpbmF0aW9uKTtcbiAgICBpZiAob2JqZWN0U2V0ID09IG51bGwpIHtcbiAgICAgIG9iamVjdFNldCA9IG5ldyBTZXQ8VlJNTm9kZUNvbnN0cmFpbnQ+KCk7XG4gICAgICB0aGlzLl9vYmplY3RDb25zdHJhaW50c01hcC5zZXQoY29uc3RyYWludC5kZXN0aW5hdGlvbiwgb2JqZWN0U2V0KTtcbiAgICB9XG4gICAgb2JqZWN0U2V0LmFkZChjb25zdHJhaW50KTtcbiAgfVxuXG4gIHB1YmxpYyBkZWxldGVDb25zdHJhaW50KGNvbnN0cmFpbnQ6IFZSTU5vZGVDb25zdHJhaW50KTogdm9pZCB7XG4gICAgdGhpcy5fY29uc3RyYWludHMuZGVsZXRlKGNvbnN0cmFpbnQpO1xuXG4gICAgY29uc3Qgb2JqZWN0U2V0ID0gdGhpcy5fb2JqZWN0Q29uc3RyYWludHNNYXAuZ2V0KGNvbnN0cmFpbnQuZGVzdGluYXRpb24pITtcbiAgICBvYmplY3RTZXQuZGVsZXRlKGNvbnN0cmFpbnQpO1xuICB9XG5cbiAgcHVibGljIHNldEluaXRTdGF0ZSgpOiB2b2lkIHtcbiAgICBjb25zdCBjb25zdHJhaW50c1RyaWVkID0gbmV3IFNldDxWUk1Ob2RlQ29uc3RyYWludD4oKTtcbiAgICBjb25zdCBjb25zdHJhaW50c0RvbmUgPSBuZXcgU2V0PFZSTU5vZGVDb25zdHJhaW50PigpO1xuXG4gICAgZm9yIChjb25zdCBjb25zdHJhaW50IG9mIHRoaXMuX2NvbnN0cmFpbnRzKSB7XG4gICAgICB0aGlzLl9wcm9jZXNzQ29uc3RyYWludChjb25zdHJhaW50LCBjb25zdHJhaW50c1RyaWVkLCBjb25zdHJhaW50c0RvbmUsIChjb25zdHJhaW50KSA9PiBjb25zdHJhaW50LnNldEluaXRTdGF0ZSgpKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIGNvbnN0IGNvbnN0cmFpbnRzVHJpZWQgPSBuZXcgU2V0PFZSTU5vZGVDb25zdHJhaW50PigpO1xuICAgIGNvbnN0IGNvbnN0cmFpbnRzRG9uZSA9IG5ldyBTZXQ8VlJNTm9kZUNvbnN0cmFpbnQ+KCk7XG5cbiAgICBmb3IgKGNvbnN0IGNvbnN0cmFpbnQgb2YgdGhpcy5fY29uc3RyYWludHMpIHtcbiAgICAgIHRoaXMuX3Byb2Nlc3NDb25zdHJhaW50KGNvbnN0cmFpbnQsIGNvbnN0cmFpbnRzVHJpZWQsIGNvbnN0cmFpbnRzRG9uZSwgKGNvbnN0cmFpbnQpID0+IGNvbnN0cmFpbnQudXBkYXRlKCkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgYSBjb25zdHJhaW50LlxuICAgKiBJZiB0aGVyZSBhcmUgb3RoZXIgY29uc3RyYWludHMgdGhhdCBhcmUgZGVwZW5kYW50LCBpdCB3aWxsIHRyeSB0byB1cGRhdGUgdGhlbSByZWN1cnNpdmVseS5cbiAgICogSXQgbWlnaHQgdGhyb3cgYW4gZXJyb3IgaWYgdGhlcmUgYXJlIGNpcmN1bGFyIGRlcGVuZGVuY2llcy5cbiAgICpcbiAgICogSW50ZW5kZWQgdG8gYmUgdXNlZCBpbiB7QGxpbmsgdXBkYXRlfSBhbmQge0BsaW5rIF9wcm9jZXNzQ29uc3RyYWludH0gaXRzZWxmIHJlY3Vyc2l2ZWx5LlxuICAgKlxuICAgKiBAcGFyYW0gY29uc3RyYWludCBBIGNvbnN0cmFpbnQgeW91IHdhbnQgdG8gdXBkYXRlXG4gICAqIEBwYXJhbSBjb25zdHJhaW50c1RyaWVkIFNldCBvZiBjb25zdHJhaW50cyB0aGF0IGFyZSBhbHJlYWR5IHRyaWVkIHRvIGJlIHVwZGF0ZWRcbiAgICogQHBhcmFtIGNvbnN0cmFpbnRzRG9uZSBTZXQgb2YgY29uc3RyYWludHMgdGhhdCBhcmUgYWxyZWFkeSB1cCB0byBkYXRlXG4gICAqL1xuICBwcml2YXRlIF9wcm9jZXNzQ29uc3RyYWludChcbiAgICBjb25zdHJhaW50OiBWUk1Ob2RlQ29uc3RyYWludCxcbiAgICBjb25zdHJhaW50c1RyaWVkOiBTZXQ8VlJNTm9kZUNvbnN0cmFpbnQ+LFxuICAgIGNvbnN0cmFpbnRzRG9uZTogU2V0PFZSTU5vZGVDb25zdHJhaW50PixcbiAgICBjYWxsYmFjazogKGNvbnN0cmFpbnQ6IFZSTU5vZGVDb25zdHJhaW50KSA9PiB2b2lkLFxuICApOiB2b2lkIHtcbiAgICBpZiAoY29uc3RyYWludHNEb25lLmhhcyhjb25zdHJhaW50KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChjb25zdHJhaW50c1RyaWVkLmhhcyhjb25zdHJhaW50KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdWUk1Ob2RlQ29uc3RyYWludE1hbmFnZXI6IENpcmN1bGFyIGRlcGVuZGVuY3kgZGV0ZWN0ZWQgd2hpbGUgdXBkYXRpbmcgY29uc3RyYWludHMnKTtcbiAgICB9XG4gICAgY29uc3RyYWludHNUcmllZC5hZGQoY29uc3RyYWludCk7XG5cbiAgICBjb25zdCBkZXBPYmplY3RzID0gY29uc3RyYWludC5kZXBlbmRlbmNpZXM7XG4gICAgZm9yIChjb25zdCBkZXBPYmplY3Qgb2YgZGVwT2JqZWN0cykge1xuICAgICAgdHJhdmVyc2VBbmNlc3RvcnNGcm9tUm9vdChkZXBPYmplY3QsIChkZXBPYmplY3RBbmNlc3RvcikgPT4ge1xuICAgICAgICBjb25zdCBvYmplY3RTZXQgPSB0aGlzLl9vYmplY3RDb25zdHJhaW50c01hcC5nZXQoZGVwT2JqZWN0QW5jZXN0b3IpO1xuICAgICAgICBpZiAob2JqZWN0U2V0KSB7XG4gICAgICAgICAgZm9yIChjb25zdCBkZXBDb25zdHJhaW50IG9mIG9iamVjdFNldCkge1xuICAgICAgICAgICAgdGhpcy5fcHJvY2Vzc0NvbnN0cmFpbnQoZGVwQ29uc3RyYWludCwgY29uc3RyYWludHNUcmllZCwgY29uc3RyYWludHNEb25lLCBjYWxsYmFjayk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjYWxsYmFjayhjb25zdHJhaW50KTtcblxuICAgIGNvbnN0cmFpbnRzRG9uZS5hZGQoY29uc3RyYWludCk7XG4gIH1cbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBxdWF0SW52ZXJ0Q29tcGF0IH0gZnJvbSAnLi91dGlscy9xdWF0SW52ZXJ0Q29tcGF0JztcbmltcG9ydCB7IFZSTU5vZGVDb25zdHJhaW50IH0gZnJvbSAnLi9WUk1Ob2RlQ29uc3RyYWludCc7XG5cbmNvbnN0IF9xdWF0QSA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5jb25zdCBfcXVhdEIgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXG4vKipcbiAqIEEgY29uc3RyYWludCB0aGF0IHRyYW5zZmVycyBhIHJvdGF0aW9uIGFyb3VuZCBvbmUgYXhpcyBvZiBhIHNvdXJjZS5cbiAqXG4gKiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS92cm0tYy92cm0tc3BlY2lmaWNhdGlvbi90cmVlL21hc3Rlci9zcGVjaWZpY2F0aW9uL1ZSTUNfbm9kZV9jb25zdHJhaW50LTEuMF9iZXRhI3JvbGwtY29uc3RyYWludFxuICovXG5leHBvcnQgY2xhc3MgVlJNUm90YXRpb25Db25zdHJhaW50IGV4dGVuZHMgVlJNTm9kZUNvbnN0cmFpbnQge1xuICAvKipcbiAgICogVGhlIHJlc3QgcXVhdGVybmlvbiBvZiB0aGUge0BsaW5rIGRlc3RpbmF0aW9ufS5cbiAgICovXG4gIHByaXZhdGUgX2RzdFJlc3RRdWF0OiBUSFJFRS5RdWF0ZXJuaW9uO1xuXG4gIC8qKlxuICAgKiBUaGUgaW52ZXJzZSBvZiB0aGUgcmVzdCBxdWF0ZXJuaW9uIG9mIHRoZSB7QGxpbmsgc291cmNlfS5cbiAgICovXG4gIHByaXZhdGUgX2ludlNyY1Jlc3RRdWF0OiBUSFJFRS5RdWF0ZXJuaW9uO1xuXG4gIHB1YmxpYyBnZXQgZGVwZW5kZW5jaWVzKCk6IFNldDxUSFJFRS5PYmplY3QzRD4ge1xuICAgIHJldHVybiBuZXcgU2V0KFt0aGlzLnNvdXJjZV0pO1xuICB9XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBUSFJFRS5PYmplY3QzRCwgc291cmNlOiBUSFJFRS5PYmplY3QzRCkge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uLCBzb3VyY2UpO1xuXG4gICAgdGhpcy5fZHN0UmVzdFF1YXQgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuICAgIHRoaXMuX2ludlNyY1Jlc3RRdWF0ID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRJbml0U3RhdGUoKTogdm9pZCB7XG4gICAgdGhpcy5fZHN0UmVzdFF1YXQuY29weSh0aGlzLmRlc3RpbmF0aW9uLnF1YXRlcm5pb24pO1xuICAgIHF1YXRJbnZlcnRDb21wYXQodGhpcy5faW52U3JjUmVzdFF1YXQuY29weSh0aGlzLnNvdXJjZS5xdWF0ZXJuaW9uKSk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIC8vIGNhbGN1bGF0ZSB0aGUgZGVsdGEgcm90YXRpb24gZnJvbSB0aGUgcmVzdCBhYm91dCB0aGUgc291cmNlXG4gICAgY29uc3Qgc3JjRGVsdGFRdWF0ID0gX3F1YXRBLmNvcHkodGhpcy5faW52U3JjUmVzdFF1YXQpLm11bHRpcGx5KHRoaXMuc291cmNlLnF1YXRlcm5pb24pO1xuXG4gICAgLy8gbXVsdGlwbHkgdGhlIGRlbHRhIHRvIHRoZSByZXN0IG9mIHRoZSBkZXN0aW5hdGlvblxuICAgIGNvbnN0IHRhcmdldFF1YXQgPSBfcXVhdEIuY29weSh0aGlzLl9kc3RSZXN0UXVhdCkubXVsdGlwbHkoc3JjRGVsdGFRdWF0KTtcblxuICAgIC8vIGJsZW5kIHdpdGggdGhlIHJlc3QgcXVhdGVybmlvbiB1c2luZyB3ZWlnaHRcbiAgICB0aGlzLmRlc3RpbmF0aW9uLnF1YXRlcm5pb24uY29weSh0aGlzLl9kc3RSZXN0UXVhdCkuc2xlcnAodGFyZ2V0UXVhdCwgdGhpcy53ZWlnaHQpO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgcXVhdEludmVydENvbXBhdCB9IGZyb20gJy4vdXRpbHMvcXVhdEludmVydENvbXBhdCc7XG5pbXBvcnQgeyBWUk1Ob2RlQ29uc3RyYWludCB9IGZyb20gJy4vVlJNTm9kZUNvbnN0cmFpbnQnO1xuXG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF9xdWF0QSA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5jb25zdCBfcXVhdEIgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXG4vKipcbiAqIEEgY29uc3RyYWludCB0aGF0IHRyYW5zZmVycyBhIHJvdGF0aW9uIGFyb3VuZCBvbmUgYXhpcyBvZiBhIHNvdXJjZS5cbiAqXG4gKiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS92cm0tYy92cm0tc3BlY2lmaWNhdGlvbi90cmVlL21hc3Rlci9zcGVjaWZpY2F0aW9uL1ZSTUNfbm9kZV9jb25zdHJhaW50LTEuMF9iZXRhI3JvbGwtY29uc3RyYWludFxuICovXG5leHBvcnQgY2xhc3MgVlJNUm9sbENvbnN0cmFpbnQgZXh0ZW5kcyBWUk1Ob2RlQ29uc3RyYWludCB7XG4gIC8qKlxuICAgKiBUaGUgcm9sbCBheGlzIG9mIHRoZSBjb25zdHJhaW50LlxuICAgKi9cbiAgcHVibGljIGdldCByb2xsQXhpcygpOiAnWCcgfCAnWScgfCAnWicge1xuICAgIHJldHVybiB0aGlzLl9yb2xsQXhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgcm9sbCBheGlzIG9mIHRoZSBjb25zdHJhaW50LlxuICAgKi9cbiAgcHVibGljIHNldCByb2xsQXhpcyhyb2xsQXhpczogJ1gnIHwgJ1knIHwgJ1onKSB7XG4gICAgdGhpcy5fcm9sbEF4aXMgPSByb2xsQXhpcztcbiAgICB0aGlzLl92M1JvbGxBeGlzLnNldChyb2xsQXhpcyA9PT0gJ1gnID8gMS4wIDogMC4wLCByb2xsQXhpcyA9PT0gJ1knID8gMS4wIDogMC4wLCByb2xsQXhpcyA9PT0gJ1onID8gMS4wIDogMC4wKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgcm9sbCBheGlzIG9mIHRoZSBjb25zdHJhaW50LlxuICAgKi9cbiAgcHJpdmF0ZSBfcm9sbEF4aXM6ICdYJyB8ICdZJyB8ICdaJztcblxuICAvKipcbiAgICogVGhlIHtAbGluayBfcm9sbEF4aXN9IGJ1dCBpbiBhbiBhY3R1YWwgVmVjdG9yMyBmb3JtLlxuICAgKi9cbiAgcHJpdmF0ZSBfdjNSb2xsQXhpczogVEhSRUUuVmVjdG9yMztcblxuICAvKipcbiAgICogVGhlIHJlc3QgcXVhdGVybmlvbiBvZiB0aGUge0BsaW5rIGRlc3RpbmF0aW9ufS5cbiAgICovXG4gIHByaXZhdGUgX2RzdFJlc3RRdWF0OiBUSFJFRS5RdWF0ZXJuaW9uO1xuXG4gIC8qKlxuICAgKiBUaGUgaW52ZXJzZSBvZiB0aGUgcmVzdCBxdWF0ZXJuaW9uIG9mIHRoZSB7QGxpbmsgZGVzdGluYXRpb259LlxuICAgKi9cbiAgcHJpdmF0ZSBfaW52RHN0UmVzdFF1YXQ6IFRIUkVFLlF1YXRlcm5pb247XG5cbiAgLyoqXG4gICAqIGBzcmNSZXN0UXVhdC5pbnZlcnQoKSAqIGRzdFJlc3RRdWF0YC5cbiAgICovXG4gIHByaXZhdGUgX2ludlNyY1Jlc3RRdWF0TXVsRHN0UmVzdFF1YXQ6IFRIUkVFLlF1YXRlcm5pb247XG5cbiAgcHVibGljIGdldCBkZXBlbmRlbmNpZXMoKTogU2V0PFRIUkVFLk9iamVjdDNEPiB7XG4gICAgcmV0dXJuIG5ldyBTZXQoW3RoaXMuc291cmNlXSk7XG4gIH1cblxuICBwdWJsaWMgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFRIUkVFLk9iamVjdDNELCBzb3VyY2U6IFRIUkVFLk9iamVjdDNEKSB7XG4gICAgc3VwZXIoZGVzdGluYXRpb24sIHNvdXJjZSk7XG5cbiAgICB0aGlzLl9yb2xsQXhpcyA9ICdYJztcbiAgICB0aGlzLl92M1JvbGxBeGlzID0gbmV3IFRIUkVFLlZlY3RvcjMoMSwgMCwgMCk7XG5cbiAgICB0aGlzLl9kc3RSZXN0UXVhdCA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG4gICAgdGhpcy5faW52RHN0UmVzdFF1YXQgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuICAgIHRoaXMuX2ludlNyY1Jlc3RRdWF0TXVsRHN0UmVzdFF1YXQgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuICB9XG5cbiAgcHVibGljIHNldEluaXRTdGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9kc3RSZXN0UXVhdC5jb3B5KHRoaXMuZGVzdGluYXRpb24ucXVhdGVybmlvbik7XG4gICAgcXVhdEludmVydENvbXBhdCh0aGlzLl9pbnZEc3RSZXN0UXVhdC5jb3B5KHRoaXMuX2RzdFJlc3RRdWF0KSk7XG4gICAgcXVhdEludmVydENvbXBhdCh0aGlzLl9pbnZTcmNSZXN0UXVhdE11bERzdFJlc3RRdWF0LmNvcHkodGhpcy5zb3VyY2UucXVhdGVybmlvbikpLm11bHRpcGx5KHRoaXMuX2RzdFJlc3RRdWF0KTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgLy8gY2FsY3VsYXRlIHRoZSBkZWx0YSByb3RhdGlvbiBmcm9tIHRoZSByZXN0IGFib3V0IHRoZSBzb3VyY2UsIHRoZW4gY29udmVydCB0byB0aGUgZGVzdGluYXRpb24gbG9jYWwgY29vcmRcbiAgICAvKipcbiAgICAgKiBXaGF0IHRoZSBxdWF0RGVsdGEgaXMgaW50ZW5kZWQgdG8gYmU6XG4gICAgICpcbiAgICAgKiBgYGB0c1xuICAgICAqIGNvbnN0IHF1YXRTcmNEZWx0YSA9IF9xdWF0QVxuICAgICAqICAgLmNvcHkoIHRoaXMuX2ludlNyY1Jlc3RRdWF0IClcbiAgICAgKiAgIC5tdWx0aXBseSggdGhpcy5zb3VyY2UucXVhdGVybmlvbiApO1xuICAgICAqIGNvbnN0IHF1YXRTcmNEZWx0YUluUGFyZW50ID0gX3F1YXRCXG4gICAgICogICAuY29weSggdGhpcy5fc3JjUmVzdFF1YXQgKVxuICAgICAqICAgLm11bHRpcGx5KCBxdWF0U3JjRGVsdGEgKVxuICAgICAqICAgLm11bHRpcGx5KCB0aGlzLl9pbnZTcmNSZXN0UXVhdCApO1xuICAgICAqIGNvbnN0IHF1YXRTcmNEZWx0YUluRHN0ID0gX3F1YXRBXG4gICAgICogICAuY29weSggdGhpcy5faW52RHN0UmVzdFF1YXQgKVxuICAgICAqICAgLm11bHRpcGx5KCBxdWF0U3JjRGVsdGFJblBhcmVudCApXG4gICAgICogICAubXVsdGlwbHkoIHRoaXMuX2RzdFJlc3RRdWF0ICk7XG4gICAgICogYGBgXG4gICAgICovXG4gICAgY29uc3QgcXVhdERlbHRhID0gX3F1YXRBXG4gICAgICAuY29weSh0aGlzLl9pbnZEc3RSZXN0UXVhdClcbiAgICAgIC5tdWx0aXBseSh0aGlzLnNvdXJjZS5xdWF0ZXJuaW9uKVxuICAgICAgLm11bHRpcGx5KHRoaXMuX2ludlNyY1Jlc3RRdWF0TXVsRHN0UmVzdFF1YXQpO1xuXG4gICAgLy8gY3JlYXRlIGEgZnJvbS10byBxdWF0ZXJuaW9uXG4gICAgY29uc3QgbjEgPSBfdjNBLmNvcHkodGhpcy5fdjNSb2xsQXhpcykuYXBwbHlRdWF0ZXJuaW9uKHF1YXREZWx0YSk7XG5cbiAgICAvKipcbiAgICAgKiBXaGF0IHRoZSBxdWF0RnJvbVRvIGlzIGludGVuZGVkIHRvIGJlOlxuICAgICAqXG4gICAgICogYGBgdHNcbiAgICAgKiBjb25zdCBxdWF0RnJvbVRvID0gX3F1YXRCLnNldEZyb21Vbml0VmVjdG9ycyggdGhpcy5fdjNSb2xsQXhpcywgbjEgKS5pbnZlcnNlKCk7XG4gICAgICogYGBgXG4gICAgICovXG4gICAgY29uc3QgcXVhdEZyb21UbyA9IF9xdWF0Qi5zZXRGcm9tVW5pdFZlY3RvcnMobjEsIHRoaXMuX3YzUm9sbEF4aXMpO1xuXG4gICAgLy8gcXVhdEZyb21UbyAqIHF1YXREZWx0YSA9PSByb2xsIGV4dHJhY3RlZCBmcm9tIHF1YXREZWx0YVxuICAgIGNvbnN0IHRhcmdldFF1YXQgPSBxdWF0RnJvbVRvLnByZW11bHRpcGx5KHRoaXMuX2RzdFJlc3RRdWF0KS5tdWx0aXBseShxdWF0RGVsdGEpO1xuXG4gICAgLy8gYmxlbmQgd2l0aCB0aGUgcmVzdCBxdWF0ZXJuaW9uIHVzaW5nIHdlaWdodFxuICAgIHRoaXMuZGVzdGluYXRpb24ucXVhdGVybmlvbi5jb3B5KHRoaXMuX2RzdFJlc3RRdWF0KS5zbGVycCh0YXJnZXRRdWF0LCB0aGlzLndlaWdodCk7XG4gIH1cbn1cbiIsICJpbXBvcnQgdHlwZSAqIGFzIENvbnN0cmFpbnRTY2hlbWEgZnJvbSAnQHBpeGl2L3R5cGVzLXZybWMtbm9kZS1jb25zdHJhaW50LTEuMCc7XG5pbXBvcnQgdHlwZSAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB0eXBlIHsgR0xURiwgR0xURkxvYWRlclBsdWdpbiwgR0xURlBhcnNlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXIuanMnO1xuaW1wb3J0IHsgVlJNTm9kZUNvbnN0cmFpbnRIZWxwZXIgfSBmcm9tICcuL2hlbHBlcnMnO1xuaW1wb3J0IHR5cGUgeyBWUk1Ob2RlQ29uc3RyYWludExvYWRlclBsdWdpbk9wdGlvbnMgfSBmcm9tICcuL1ZSTU5vZGVDb25zdHJhaW50TG9hZGVyUGx1Z2luT3B0aW9ucyc7XG5pbXBvcnQgeyBWUk1Ob2RlQ29uc3RyYWludE1hbmFnZXIgfSBmcm9tICcuL1ZSTU5vZGVDb25zdHJhaW50TWFuYWdlcic7XG5pbXBvcnQgeyBWUk1Sb3RhdGlvbkNvbnN0cmFpbnQgfSBmcm9tICcuL1ZSTVJvdGF0aW9uQ29uc3RyYWludCc7XG5pbXBvcnQgeyBHTFRGIGFzIEdMVEZTY2hlbWEgfSBmcm9tICdAZ2x0Zi10cmFuc2Zvcm0vY29yZSc7XG5pbXBvcnQgeyBWUk1BaW1Db25zdHJhaW50IH0gZnJvbSAnLi9WUk1BaW1Db25zdHJhaW50JztcbmltcG9ydCB7IFZSTVJvbGxDb25zdHJhaW50IH0gZnJvbSAnLi9WUk1Sb2xsQ29uc3RyYWludCc7XG5cbi8qKlxuICogUG9zc2libGUgc3BlYyB2ZXJzaW9ucyBpdCByZWNvZ25pemVzLlxuICovXG5jb25zdCBQT1NTSUJMRV9TUEVDX1ZFUlNJT05TID0gbmV3IFNldChbJzEuMCcsICcxLjAtYmV0YSddKTtcblxuZXhwb3J0IGNsYXNzIFZSTU5vZGVDb25zdHJhaW50TG9hZGVyUGx1Z2luIGltcGxlbWVudHMgR0xURkxvYWRlclBsdWdpbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgRVhURU5TSU9OX05BTUUgPSAnVlJNQ19ub2RlX2NvbnN0cmFpbnQnO1xuXG4gIC8qKlxuICAgKiBTcGVjaWZ5IGFuIE9iamVjdDNEIHRvIGFkZCB7QGxpbmsgVlJNTm9kZUNvbnN0cmFpbnRIZWxwZXJ9IHMuXG4gICAqIElmIG5vdCBzcGVjaWZpZWQsIGhlbHBlciB3aWxsIG5vdCBiZSBjcmVhdGVkLlxuICAgKiBJZiBgcmVuZGVyT3JkZXJgIGlzIHNldCB0byB0aGUgcm9vdCwgaGVscGVycyB3aWxsIGNvcHkgdGhlIHNhbWUgYHJlbmRlck9yZGVyYCAuXG4gICAqL1xuICBwdWJsaWMgaGVscGVyUm9vdD86IFRIUkVFLk9iamVjdDNEO1xuXG4gIHB1YmxpYyByZWFkb25seSBwYXJzZXI6IEdMVEZQYXJzZXI7XG5cbiAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFZSTU5vZGVDb25zdHJhaW50TG9hZGVyUGx1Z2luLkVYVEVOU0lPTl9OQU1FO1xuICB9XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBhcnNlcjogR0xURlBhcnNlciwgb3B0aW9ucz86IFZSTU5vZGVDb25zdHJhaW50TG9hZGVyUGx1Z2luT3B0aW9ucykge1xuICAgIHRoaXMucGFyc2VyID0gcGFyc2VyO1xuXG4gICAgdGhpcy5oZWxwZXJSb290ID0gb3B0aW9ucz8uaGVscGVyUm9vdDtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBhZnRlclJvb3QoZ2x0ZjogR0xURik6IFByb21pc2U8dm9pZD4ge1xuICAgIGdsdGYudXNlckRhdGEudnJtTm9kZUNvbnN0cmFpbnRNYW5hZ2VyID0gYXdhaXQgdGhpcy5faW1wb3J0KGdsdGYpO1xuICB9XG5cbiAgLyoqXG4gICAqIEltcG9ydCBjb25zdHJhaW50cyBmcm9tIGEgR0xURiBhbmQgcmV0dXJucyBhIHtAbGluayBWUk1Ob2RlQ29uc3RyYWludE1hbmFnZXJ9LlxuICAgKiBJdCBtaWdodCByZXR1cm4gYG51bGxgIGluc3RlYWQgd2hlbiBpdCBkb2VzIG5vdCBuZWVkIHRvIGJlIGNyZWF0ZWQgb3Igc29tZXRoaW5nIGdvIHdyb25nLlxuICAgKlxuICAgKiBAcGFyYW0gZ2x0ZiBBIHBhcnNlZCByZXN1bHQgb2YgR0xURiB0YWtlbiBmcm9tIEdMVEZMb2FkZXJcbiAgICovXG4gIHByb3RlY3RlZCBhc3luYyBfaW1wb3J0KGdsdGY6IEdMVEYpOiBQcm9taXNlPFZSTU5vZGVDb25zdHJhaW50TWFuYWdlciB8IG51bGw+IHtcbiAgICBjb25zdCBqc29uID0gdGhpcy5wYXJzZXIuanNvbiBhcyBHTFRGU2NoZW1hLklHTFRGO1xuXG4gICAgLy8gZWFybHkgYWJvcnQgaWYgaXQgZG9lc24ndCB1c2UgY29uc3RyYWludHNcbiAgICBjb25zdCBpc0NvbnN0cmFpbnRzVXNlZCA9IGpzb24uZXh0ZW5zaW9uc1VzZWQ/LmluZGV4T2YoVlJNTm9kZUNvbnN0cmFpbnRMb2FkZXJQbHVnaW4uRVhURU5TSU9OX05BTUUpICE9PSAtMTtcbiAgICBpZiAoIWlzQ29uc3RyYWludHNVc2VkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBtYW5hZ2VyID0gbmV3IFZSTU5vZGVDb25zdHJhaW50TWFuYWdlcigpO1xuICAgIGNvbnN0IHRocmVlTm9kZXM6IFRIUkVFLk9iamVjdDNEW10gPSBhd2FpdCB0aGlzLnBhcnNlci5nZXREZXBlbmRlbmNpZXMoJ25vZGUnKTtcblxuICAgIC8vIGltcG9ydCBjb25zdHJhaW50cyBmb3IgZWFjaCBub2Rlc1xuICAgIHRocmVlTm9kZXMuZm9yRWFjaCgobm9kZSwgbm9kZUluZGV4KSA9PiB7XG4gICAgICBjb25zdCBzY2hlbWFOb2RlID0ganNvbi5ub2RlcyFbbm9kZUluZGV4XTtcblxuICAgICAgLy8gY2hlY2sgaWYgdGhlIGV4dGVuc2lvbiB1c2VzIHRoZSBleHRlbnNpb25cbiAgICAgIGNvbnN0IGV4dGVuc2lvbiA9IHNjaGVtYU5vZGU/LmV4dGVuc2lvbnM/LltWUk1Ob2RlQ29uc3RyYWludExvYWRlclBsdWdpbi5FWFRFTlNJT05fTkFNRV0gYXNcbiAgICAgICAgfCBDb25zdHJhaW50U2NoZW1hLlZSTUNOb2RlQ29uc3RyYWludFxuICAgICAgICB8IHVuZGVmaW5lZDtcblxuICAgICAgaWYgKGV4dGVuc2lvbiA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc3BlY1ZlcnNpb24gPSBleHRlbnNpb24uc3BlY1ZlcnNpb247XG4gICAgICBpZiAoIVBPU1NJQkxFX1NQRUNfVkVSU0lPTlMuaGFzKHNwZWNWZXJzaW9uKSkge1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgYFZSTU5vZGVDb25zdHJhaW50TG9hZGVyUGx1Z2luOiBVbmtub3duICR7VlJNTm9kZUNvbnN0cmFpbnRMb2FkZXJQbHVnaW4uRVhURU5TSU9OX05BTUV9IHNwZWNWZXJzaW9uIFwiJHtzcGVjVmVyc2lvbn1cImAsXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY29uc3RyYWludERlZiA9IGV4dGVuc2lvbi5jb25zdHJhaW50O1xuXG4gICAgICAvLyBpbXBvcnQgY29uc3RyYWludHNcbiAgICAgIGlmIChjb25zdHJhaW50RGVmLnJvbGwgIT0gbnVsbCkge1xuICAgICAgICBjb25zdCBjb25zdHJhaW50ID0gdGhpcy5faW1wb3J0Um9sbENvbnN0cmFpbnQobm9kZSwgdGhyZWVOb2RlcywgY29uc3RyYWludERlZi5yb2xsKTtcbiAgICAgICAgbWFuYWdlci5hZGRDb25zdHJhaW50KGNvbnN0cmFpbnQpO1xuICAgICAgfSBlbHNlIGlmIChjb25zdHJhaW50RGVmLmFpbSAhPSBudWxsKSB7XG4gICAgICAgIGNvbnN0IGNvbnN0cmFpbnQgPSB0aGlzLl9pbXBvcnRBaW1Db25zdHJhaW50KG5vZGUsIHRocmVlTm9kZXMsIGNvbnN0cmFpbnREZWYuYWltKTtcbiAgICAgICAgbWFuYWdlci5hZGRDb25zdHJhaW50KGNvbnN0cmFpbnQpO1xuICAgICAgfSBlbHNlIGlmIChjb25zdHJhaW50RGVmLnJvdGF0aW9uICE9IG51bGwpIHtcbiAgICAgICAgY29uc3QgY29uc3RyYWludCA9IHRoaXMuX2ltcG9ydFJvdGF0aW9uQ29uc3RyYWludChub2RlLCB0aHJlZU5vZGVzLCBjb25zdHJhaW50RGVmLnJvdGF0aW9uKTtcbiAgICAgICAgbWFuYWdlci5hZGRDb25zdHJhaW50KGNvbnN0cmFpbnQpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gaW5pdCBjb25zdHJhaW50c1xuICAgIGdsdGYuc2NlbmUudXBkYXRlTWF0cml4V29ybGQoKTtcbiAgICBtYW5hZ2VyLnNldEluaXRTdGF0ZSgpO1xuXG4gICAgcmV0dXJuIG1hbmFnZXI7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2ltcG9ydFJvbGxDb25zdHJhaW50KFxuICAgIGRlc3RpbmF0aW9uOiBUSFJFRS5PYmplY3QzRCxcbiAgICBub2RlczogVEhSRUUuT2JqZWN0M0RbXSxcbiAgICByb2xsQ29uc3RyYWludERlZjogQ29uc3RyYWludFNjaGVtYS5Sb2xsQ29uc3RyYWludCxcbiAgKTogVlJNUm9sbENvbnN0cmFpbnQge1xuICAgIGNvbnN0IHsgc291cmNlOiBzb3VyY2VJbmRleCwgcm9sbEF4aXMsIHdlaWdodCB9ID0gcm9sbENvbnN0cmFpbnREZWY7XG4gICAgY29uc3Qgc291cmNlID0gbm9kZXNbc291cmNlSW5kZXhdO1xuICAgIGNvbnN0IGNvbnN0cmFpbnQgPSBuZXcgVlJNUm9sbENvbnN0cmFpbnQoZGVzdGluYXRpb24sIHNvdXJjZSk7XG5cbiAgICBpZiAocm9sbEF4aXMgIT0gbnVsbCkge1xuICAgICAgY29uc3RyYWludC5yb2xsQXhpcyA9IHJvbGxBeGlzO1xuICAgIH1cbiAgICBpZiAod2VpZ2h0ICE9IG51bGwpIHtcbiAgICAgIGNvbnN0cmFpbnQud2VpZ2h0ID0gd2VpZ2h0O1xuICAgIH1cblxuICAgIGlmICh0aGlzLmhlbHBlclJvb3QpIHtcbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBWUk1Ob2RlQ29uc3RyYWludEhlbHBlcihjb25zdHJhaW50KTtcbiAgICAgIHRoaXMuaGVscGVyUm9vdC5hZGQoaGVscGVyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29uc3RyYWludDtcbiAgfVxuXG4gIHByb3RlY3RlZCBfaW1wb3J0QWltQ29uc3RyYWludChcbiAgICBkZXN0aW5hdGlvbjogVEhSRUUuT2JqZWN0M0QsXG4gICAgbm9kZXM6IFRIUkVFLk9iamVjdDNEW10sXG4gICAgYWltQ29uc3RyYWludERlZjogQ29uc3RyYWludFNjaGVtYS5BaW1Db25zdHJhaW50LFxuICApOiBWUk1BaW1Db25zdHJhaW50IHtcbiAgICBjb25zdCB7IHNvdXJjZTogc291cmNlSW5kZXgsIGFpbUF4aXMsIHdlaWdodCB9ID0gYWltQ29uc3RyYWludERlZjtcbiAgICBjb25zdCBzb3VyY2UgPSBub2Rlc1tzb3VyY2VJbmRleF07XG4gICAgY29uc3QgY29uc3RyYWludCA9IG5ldyBWUk1BaW1Db25zdHJhaW50KGRlc3RpbmF0aW9uLCBzb3VyY2UpO1xuXG4gICAgaWYgKGFpbUF4aXMgIT0gbnVsbCkge1xuICAgICAgY29uc3RyYWludC5haW1BeGlzID0gYWltQXhpcztcbiAgICB9XG4gICAgaWYgKHdlaWdodCAhPSBudWxsKSB7XG4gICAgICBjb25zdHJhaW50LndlaWdodCA9IHdlaWdodDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5oZWxwZXJSb290KSB7XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgVlJNTm9kZUNvbnN0cmFpbnRIZWxwZXIoY29uc3RyYWludCk7XG4gICAgICB0aGlzLmhlbHBlclJvb3QuYWRkKGhlbHBlcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbnN0cmFpbnQ7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2ltcG9ydFJvdGF0aW9uQ29uc3RyYWludChcbiAgICBkZXN0aW5hdGlvbjogVEhSRUUuT2JqZWN0M0QsXG4gICAgbm9kZXM6IFRIUkVFLk9iamVjdDNEW10sXG4gICAgcm90YXRpb25Db25zdHJhaW50RGVmOiBDb25zdHJhaW50U2NoZW1hLlJvdGF0aW9uQ29uc3RyYWludCxcbiAgKTogVlJNUm90YXRpb25Db25zdHJhaW50IHtcbiAgICBjb25zdCB7IHNvdXJjZTogc291cmNlSW5kZXgsIHdlaWdodCB9ID0gcm90YXRpb25Db25zdHJhaW50RGVmO1xuICAgIGNvbnN0IHNvdXJjZSA9IG5vZGVzW3NvdXJjZUluZGV4XTtcbiAgICBjb25zdCBjb25zdHJhaW50ID0gbmV3IFZSTVJvdGF0aW9uQ29uc3RyYWludChkZXN0aW5hdGlvbiwgc291cmNlKTtcblxuICAgIGlmICh3ZWlnaHQgIT0gbnVsbCkge1xuICAgICAgY29uc3RyYWludC53ZWlnaHQgPSB3ZWlnaHQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaGVscGVyUm9vdCkge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IFZSTU5vZGVDb25zdHJhaW50SGVscGVyKGNvbnN0cmFpbnQpO1xuICAgICAgdGhpcy5oZWxwZXJSb290LmFkZChoZWxwZXIpO1xuICAgIH1cblxuICAgIHJldHVybiBjb25zdHJhaW50O1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUNvbGxpZGVyIH0gZnJvbSAnLi4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlQ2Fwc3VsZSB9IGZyb20gJy4uL1ZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlQ2Fwc3VsZSc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZVBsYW5lIH0gZnJvbSAnLi4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVQbGFuZSc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZVNwaGVyZSB9IGZyb20gJy4uL1ZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlU3BoZXJlJztcbmltcG9ydCB7IENvbGxpZGVyU2hhcGVCdWZmZXJHZW9tZXRyeSB9IGZyb20gJy4vdXRpbHMvQ29sbGlkZXJTaGFwZUJ1ZmZlckdlb21ldHJ5JztcbmltcG9ydCB7IENvbGxpZGVyU2hhcGVDYXBzdWxlQnVmZmVyR2VvbWV0cnkgfSBmcm9tICcuL3V0aWxzL0NvbGxpZGVyU2hhcGVDYXBzdWxlQnVmZmVyR2VvbWV0cnknO1xuaW1wb3J0IHsgQ29sbGlkZXJTaGFwZVBsYW5lQnVmZmVyR2VvbWV0cnkgfSBmcm9tICcuL3V0aWxzL0NvbGxpZGVyU2hhcGVQbGFuZUJ1ZmZlckdlb21ldHJ5JztcbmltcG9ydCB7IENvbGxpZGVyU2hhcGVTcGhlcmVCdWZmZXJHZW9tZXRyeSB9IGZyb20gJy4vdXRpbHMvQ29sbGlkZXJTaGFwZVNwaGVyZUJ1ZmZlckdlb21ldHJ5JztcblxuY29uc3QgX3YzQSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbmV4cG9ydCBjbGFzcyBWUk1TcHJpbmdCb25lQ29sbGlkZXJIZWxwZXIgZXh0ZW5kcyBUSFJFRS5Hcm91cCB7XG4gIHB1YmxpYyByZWFkb25seSBjb2xsaWRlcjogVlJNU3ByaW5nQm9uZUNvbGxpZGVyO1xuICBwcml2YXRlIHJlYWRvbmx5IF9nZW9tZXRyeTogQ29sbGlkZXJTaGFwZUJ1ZmZlckdlb21ldHJ5O1xuICBwcml2YXRlIHJlYWRvbmx5IF9saW5lOiBUSFJFRS5MaW5lU2VnbWVudHM7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGNvbGxpZGVyOiBWUk1TcHJpbmdCb25lQ29sbGlkZXIpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMubWF0cml4QXV0b1VwZGF0ZSA9IGZhbHNlO1xuXG4gICAgdGhpcy5jb2xsaWRlciA9IGNvbGxpZGVyO1xuXG4gICAgaWYgKHRoaXMuY29sbGlkZXIuc2hhcGUgaW5zdGFuY2VvZiBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZVNwaGVyZSkge1xuICAgICAgdGhpcy5fZ2VvbWV0cnkgPSBuZXcgQ29sbGlkZXJTaGFwZVNwaGVyZUJ1ZmZlckdlb21ldHJ5KHRoaXMuY29sbGlkZXIuc2hhcGUpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jb2xsaWRlci5zaGFwZSBpbnN0YW5jZW9mIFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlQ2Fwc3VsZSkge1xuICAgICAgdGhpcy5fZ2VvbWV0cnkgPSBuZXcgQ29sbGlkZXJTaGFwZUNhcHN1bGVCdWZmZXJHZW9tZXRyeSh0aGlzLmNvbGxpZGVyLnNoYXBlKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY29sbGlkZXIuc2hhcGUgaW5zdGFuY2VvZiBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZVBsYW5lKSB7XG4gICAgICB0aGlzLl9nZW9tZXRyeSA9IG5ldyBDb2xsaWRlclNoYXBlUGxhbmVCdWZmZXJHZW9tZXRyeSh0aGlzLmNvbGxpZGVyLnNoYXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdWUk1TcHJpbmdCb25lQ29sbGlkZXJIZWxwZXI6IFVua25vd24gY29sbGlkZXIgc2hhcGUgdHlwZSBkZXRlY3RlZCcpO1xuICAgIH1cblxuICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLkxpbmVCYXNpY01hdGVyaWFsKHtcbiAgICAgIGNvbG9yOiAweGZmMDBmZixcbiAgICAgIGRlcHRoVGVzdDogZmFsc2UsXG4gICAgICBkZXB0aFdyaXRlOiBmYWxzZSxcbiAgICB9KTtcblxuICAgIHRoaXMuX2xpbmUgPSBuZXcgVEhSRUUuTGluZVNlZ21lbnRzKHRoaXMuX2dlb21ldHJ5LCBtYXRlcmlhbCk7XG4gICAgdGhpcy5hZGQodGhpcy5fbGluZSk7XG4gIH1cblxuICBwdWJsaWMgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9nZW9tZXRyeS5kaXNwb3NlKCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlTWF0cml4V29ybGQoZm9yY2U6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmNvbGxpZGVyLnVwZGF0ZVdvcmxkTWF0cml4KHRydWUsIGZhbHNlKTtcblxuICAgIHRoaXMubWF0cml4LmNvcHkodGhpcy5jb2xsaWRlci5tYXRyaXhXb3JsZCk7XG5cbiAgICBjb25zdCBtYXRyaXhXb3JsZEVsZW1lbnRzID0gdGhpcy5tYXRyaXguZWxlbWVudHM7XG4gICAgdGhpcy5fZ2VvbWV0cnkud29ybGRTY2FsZSA9IF92M0FcbiAgICAgIC5zZXQobWF0cml4V29ybGRFbGVtZW50c1swXSwgbWF0cml4V29ybGRFbGVtZW50c1sxXSwgbWF0cml4V29ybGRFbGVtZW50c1syXSlcbiAgICAgIC5sZW5ndGgoKTsgLy8gY2FsY3VsYXRlIHNjYWxlIG9mIHggY29tcG9uZW50XG5cbiAgICB0aGlzLl9nZW9tZXRyeS51cGRhdGUoKTtcblxuICAgIHN1cGVyLnVwZGF0ZU1hdHJpeFdvcmxkKGZvcmNlKTtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZSc7XG5cbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3YzQiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbmV4cG9ydCBjbGFzcyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZUNhcHN1bGUgZXh0ZW5kcyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZSB7XG4gIHB1YmxpYyBnZXQgdHlwZSgpOiAnY2Fwc3VsZScge1xuICAgIHJldHVybiAnY2Fwc3VsZSc7XG4gIH1cblxuICAvKipcbiAgICogVGhlIG9mZnNldCBvZiB0aGUgY2Fwc3VsZSBoZWFkIGZyb20gdGhlIG9yaWdpbiBpbiBsb2NhbCBzcGFjZS5cbiAgICovXG4gIHB1YmxpYyBvZmZzZXQ6IFRIUkVFLlZlY3RvcjM7XG5cbiAgLyoqXG4gICAqIFRoZSBvZmZzZXQgb2YgdGhlIGNhcHN1bGUgdGFpbCBmcm9tIHRoZSBvcmlnaW4gaW4gbG9jYWwgc3BhY2UuXG4gICAqL1xuICBwdWJsaWMgdGFpbDogVEhSRUUuVmVjdG9yMztcblxuICAvKipcbiAgICogVGhlIHJhZGl1cyBvZiB0aGUgY2Fwc3VsZS5cbiAgICovXG4gIHB1YmxpYyByYWRpdXM6IG51bWJlcjtcblxuICAvKipcbiAgICogSWYgdHJ1ZSwgdGhlIGNvbGxpZGVyIHByZXZlbnRzIHNwcmluZyBib25lcyBmcm9tIGdvaW5nIG91dHNpZGUgb2YgdGhlIGNhcHN1bGUgaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBpbnNpZGU6IGJvb2xlYW47XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBhcmFtcz86IHsgcmFkaXVzPzogbnVtYmVyOyBvZmZzZXQ/OiBUSFJFRS5WZWN0b3IzOyB0YWlsPzogVEhSRUUuVmVjdG9yMzsgaW5zaWRlPzogYm9vbGVhbiB9KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMub2Zmc2V0ID0gcGFyYW1zPy5vZmZzZXQgPz8gbmV3IFRIUkVFLlZlY3RvcjMoMC4wLCAwLjAsIDAuMCk7XG4gICAgdGhpcy50YWlsID0gcGFyYW1zPy50YWlsID8/IG5ldyBUSFJFRS5WZWN0b3IzKDAuMCwgMC4wLCAwLjApO1xuICAgIHRoaXMucmFkaXVzID0gcGFyYW1zPy5yYWRpdXMgPz8gMC4wO1xuICAgIHRoaXMuaW5zaWRlID0gcGFyYW1zPy5pbnNpZGUgPz8gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgY2FsY3VsYXRlQ29sbGlzaW9uKFxuICAgIGNvbGxpZGVyTWF0cml4OiBUSFJFRS5NYXRyaXg0LFxuICAgIG9iamVjdFBvc2l0aW9uOiBUSFJFRS5WZWN0b3IzLFxuICAgIG9iamVjdFJhZGl1czogbnVtYmVyLFxuICAgIHRhcmdldDogVEhSRUUuVmVjdG9yMyxcbiAgKTogbnVtYmVyIHtcbiAgICBfdjNBLnNldEZyb21NYXRyaXhQb3NpdGlvbihjb2xsaWRlck1hdHJpeCk7IC8vIHRyYW5zZm9ybWVkIGhlYWRcbiAgICBfdjNCLnN1YlZlY3RvcnModGhpcy50YWlsLCB0aGlzLm9mZnNldCkuYXBwbHlNYXRyaXg0KGNvbGxpZGVyTWF0cml4KTsgLy8gdHJhbnNmb3JtZWQgdGFpbFxuICAgIF92M0Iuc3ViKF92M0EpOyAvLyBmcm9tIGhlYWQgdG8gdGFpbFxuICAgIGNvbnN0IGxlbmd0aFNxQ2Fwc3VsZSA9IF92M0IubGVuZ3RoU3EoKTtcblxuICAgIHRhcmdldC5jb3B5KG9iamVjdFBvc2l0aW9uKS5zdWIoX3YzQSk7IC8vIGZyb20gaGVhZCB0byBvYmplY3RcbiAgICBjb25zdCBkb3QgPSBfdjNCLmRvdCh0YXJnZXQpOyAvLyBkb3QgcHJvZHVjdCBvZiBvZmZzZXRUb1RhaWwgYW5kIG9mZnNldFRvT2JqZWN0XG5cbiAgICBpZiAoZG90IDw9IDAuMCkge1xuICAgICAgLy8gaWYgb2JqZWN0IGlzIG5lYXIgZnJvbSB0aGUgaGVhZFxuICAgICAgLy8gZG8gbm90aGluZywgdXNlIHRoZSBjdXJyZW50IHZhbHVlIGRpcmVjdGx5XG4gICAgfSBlbHNlIGlmIChsZW5ndGhTcUNhcHN1bGUgPD0gZG90KSB7XG4gICAgICAvLyBpZiBvYmplY3QgaXMgbmVhciBmcm9tIHRoZSB0YWlsXG4gICAgICB0YXJnZXQuc3ViKF92M0IpOyAvLyBmcm9tIHRhaWwgdG8gb2JqZWN0XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGlmIG9iamVjdCBpcyBiZXR3ZWVuIHR3byBlbmRzXG4gICAgICBfdjNCLm11bHRpcGx5U2NhbGFyKGRvdCAvIGxlbmd0aFNxQ2Fwc3VsZSk7IC8vIGZyb20gaGVhZCB0byB0aGUgbmVhcmVzdCBwb2ludCBvZiB0aGUgc2hhZnRcbiAgICAgIHRhcmdldC5zdWIoX3YzQik7IC8vIGZyb20gdGhlIHNoYWZ0IHBvaW50IHRvIG9iamVjdFxuICAgIH1cblxuICAgIGNvbnN0IGxlbmd0aCA9IHRhcmdldC5sZW5ndGgoKTtcbiAgICBjb25zdCBkaXN0YW5jZSA9IHRoaXMuaW5zaWRlID8gdGhpcy5yYWRpdXMgLSBvYmplY3RSYWRpdXMgLSBsZW5ndGggOiBsZW5ndGggLSBvYmplY3RSYWRpdXMgLSB0aGlzLnJhZGl1cztcblxuICAgIGlmIChkaXN0YW5jZSA8IDApIHtcbiAgICAgIHRhcmdldC5tdWx0aXBseVNjYWxhcigxIC8gbGVuZ3RoKTsgLy8gY29udmVydCB0aGUgZGVsdGEgdG8gdGhlIGRpcmVjdGlvblxuICAgICAgaWYgKHRoaXMuaW5zaWRlKSB7XG4gICAgICAgIHRhcmdldC5uZWdhdGUoKTsgLy8gaWYgaW5zaWRlLCByZXZlcnNlIHRoZSBkaXJlY3Rpb25cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGlzdGFuY2U7XG4gIH1cbn1cbiIsICJpbXBvcnQgdHlwZSAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgc2hhcGUgb2YgYSBjb2xsaWRlci5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlIHtcbiAgLyoqXG4gICAqIFRoZSB0eXBlIG9mIHRoZSBzaGFwZS5cbiAgICovXG4gIHB1YmxpYyBhYnN0cmFjdCBnZXQgdHlwZSgpOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBvZmZzZXQgdG8gdGhlIHNoYXBlLlxuICAgKi9cbiAgcHVibGljIG9mZnNldD86IFRIUkVFLlZlY3RvcjM7XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSBhIGRpc3RhbmNlIGFuZCBhIGRpcmVjdGlvbiBmcm9tIHRoZSBjb2xsaWRlciB0byBhIHRhcmdldCBvYmplY3QuXG4gICAqIEl0J3MgaGl0IGlmIHRoZSBkaXN0YW5jZSBpcyBuZWdhdGl2ZS5cbiAgICogVGhlIGRpcmVjdGlvbiB3aWxsIGJlIGNvbnRhaW5lZCBpbiB0aGUgZ2l2ZW4gdGFyZ2V0IHZlY3Rvci5cbiAgICpcbiAgICogQHBhcmFtIGNvbGxpZGVyTWF0cml4IEEgbWF0cml4IHJlcHJlc2VudHMgdGhlIHRyYW5zZm9ybSBvZiB0aGUgY29sbGlkZXJcbiAgICogQHBhcmFtIG9iamVjdFBvc2l0aW9uIEEgdmVjdG9yIHJlcHJlc2VudHMgdGhlIHBvc2l0aW9uIG9mIHRoZSB0YXJnZXQgb2JqZWN0XG4gICAqIEBwYXJhbSBvYmplY3RSYWRpdXMgVGhlIHJhZGl1cyBvZiB0aGUgb2JqZWN0XG4gICAqIEBwYXJhbSB0YXJnZXQgVGhlIHJlc3VsdCBkaXJlY3Rpb24gd2lsbCBiZSBjb250YWluZWQgaW4gdGhpcyB2ZWN0b3JcbiAgICovXG4gIHB1YmxpYyBhYnN0cmFjdCBjYWxjdWxhdGVDb2xsaXNpb24oXG4gICAgY29sbGlkZXJNYXRyaXg6IFRIUkVFLk1hdHJpeDQsXG4gICAgb2JqZWN0UG9zaXRpb246IFRIUkVFLlZlY3RvcjMsXG4gICAgb2JqZWN0UmFkaXVzOiBudW1iZXIsXG4gICAgdGFyZ2V0OiBUSFJFRS5WZWN0b3IzLFxuICApOiBudW1iZXI7XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGUgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlJztcblxuY29uc3QgX3YzQSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfbWF0M0EgPSBuZXcgVEhSRUUuTWF0cml4MygpO1xuXG5leHBvcnQgY2xhc3MgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVQbGFuZSBleHRlbmRzIFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlIHtcbiAgcHVibGljIGdldCB0eXBlKCk6ICdwbGFuZScge1xuICAgIHJldHVybiAncGxhbmUnO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBvZmZzZXQgb2YgdGhlIHBsYW5lIGZyb20gdGhlIG9yaWdpbiBpbiBsb2NhbCBzcGFjZS5cbiAgICovXG4gIHB1YmxpYyBvZmZzZXQ6IFRIUkVFLlZlY3RvcjM7XG5cbiAgLyoqXG4gICAqIFRoZSBub3JtYWwgb2YgdGhlIHBsYW5lIGluIGxvY2FsIHNwYWNlLiBNdXN0IGJlIG5vcm1hbGl6ZWQuXG4gICAqL1xuICBwdWJsaWMgbm9ybWFsOiBUSFJFRS5WZWN0b3IzO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJhbXM/OiB7IG9mZnNldD86IFRIUkVFLlZlY3RvcjM7IG5vcm1hbD86IFRIUkVFLlZlY3RvcjMgfSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLm9mZnNldCA9IHBhcmFtcz8ub2Zmc2V0ID8/IG5ldyBUSFJFRS5WZWN0b3IzKDAuMCwgMC4wLCAwLjApO1xuICAgIHRoaXMubm9ybWFsID0gcGFyYW1zPy5ub3JtYWwgPz8gbmV3IFRIUkVFLlZlY3RvcjMoMC4wLCAwLjAsIDEuMCk7XG4gIH1cblxuICBwdWJsaWMgY2FsY3VsYXRlQ29sbGlzaW9uKFxuICAgIGNvbGxpZGVyTWF0cml4OiBUSFJFRS5NYXRyaXg0LFxuICAgIG9iamVjdFBvc2l0aW9uOiBUSFJFRS5WZWN0b3IzLFxuICAgIG9iamVjdFJhZGl1czogbnVtYmVyLFxuICAgIHRhcmdldDogVEhSRUUuVmVjdG9yMyxcbiAgKTogbnVtYmVyIHtcbiAgICB0YXJnZXQuc2V0RnJvbU1hdHJpeFBvc2l0aW9uKGNvbGxpZGVyTWF0cml4KTsgLy8gdHJhbnNmb3JtZWQgb2Zmc2V0XG4gICAgdGFyZ2V0Lm5lZ2F0ZSgpLmFkZChvYmplY3RQb3NpdGlvbik7IC8vIGEgdmVjdG9yIGZyb20gY29sbGlkZXIgY2VudGVyIHRvIG9iamVjdCBwb3NpdGlvblxuXG4gICAgX21hdDNBLmdldE5vcm1hbE1hdHJpeChjb2xsaWRlck1hdHJpeCk7IC8vIGNvbnZlcnQgdGhlIGNvbGxpZGVyIG1hdHJpeCB0byB0aGUgbm9ybWFsIG1hdHJpeFxuICAgIF92M0EuY29weSh0aGlzLm5vcm1hbCkuYXBwbHlOb3JtYWxNYXRyaXgoX21hdDNBKS5ub3JtYWxpemUoKTsgLy8gdHJhbnNmb3JtZWQgbm9ybWFsXG4gICAgY29uc3QgZGlzdGFuY2UgPSB0YXJnZXQuZG90KF92M0EpIC0gb2JqZWN0UmFkaXVzO1xuXG4gICAgdGFyZ2V0LmNvcHkoX3YzQSk7IC8vIGNvbnZlcnQgdGhlIGRlbHRhIHRvIHRoZSBkaXJlY3Rpb25cblxuICAgIHJldHVybiBkaXN0YW5jZTtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZSc7XG5cbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5leHBvcnQgY2xhc3MgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVTcGhlcmUgZXh0ZW5kcyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZSB7XG4gIHB1YmxpYyBnZXQgdHlwZSgpOiAnc3BoZXJlJyB7XG4gICAgcmV0dXJuICdzcGhlcmUnO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBvZmZzZXQgb2YgdGhlIHNwaGVyZSBmcm9tIHRoZSBvcmlnaW4gaW4gbG9jYWwgc3BhY2UuXG4gICAqL1xuICBwdWJsaWMgb2Zmc2V0OiBUSFJFRS5WZWN0b3IzO1xuXG4gIC8qKlxuICAgKiBUaGUgcmFkaXVzLlxuICAgKi9cbiAgcHVibGljIHJhZGl1czogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBJZiB0cnVlLCB0aGUgY29sbGlkZXIgcHJldmVudHMgc3ByaW5nIGJvbmVzIGZyb20gZ29pbmcgb3V0c2lkZSBvZiB0aGUgc3BoZXJlIGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgaW5zaWRlOiBib29sZWFuO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJhbXM/OiB7IHJhZGl1cz86IG51bWJlcjsgb2Zmc2V0PzogVEhSRUUuVmVjdG9yMzsgaW5zaWRlPzogYm9vbGVhbiB9KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMub2Zmc2V0ID0gcGFyYW1zPy5vZmZzZXQgPz8gbmV3IFRIUkVFLlZlY3RvcjMoMC4wLCAwLjAsIDAuMCk7XG4gICAgdGhpcy5yYWRpdXMgPSBwYXJhbXM/LnJhZGl1cyA/PyAwLjA7XG4gICAgdGhpcy5pbnNpZGUgPSBwYXJhbXM/Lmluc2lkZSA/PyBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBjYWxjdWxhdGVDb2xsaXNpb24oXG4gICAgY29sbGlkZXJNYXRyaXg6IFRIUkVFLk1hdHJpeDQsXG4gICAgb2JqZWN0UG9zaXRpb246IFRIUkVFLlZlY3RvcjMsXG4gICAgb2JqZWN0UmFkaXVzOiBudW1iZXIsXG4gICAgdGFyZ2V0OiBUSFJFRS5WZWN0b3IzLFxuICApOiBudW1iZXIge1xuICAgIHRhcmdldC5zdWJWZWN0b3JzKG9iamVjdFBvc2l0aW9uLCBfdjNBLnNldEZyb21NYXRyaXhQb3NpdGlvbihjb2xsaWRlck1hdHJpeCkpO1xuXG4gICAgY29uc3QgbGVuZ3RoID0gdGFyZ2V0Lmxlbmd0aCgpO1xuICAgIGNvbnN0IGRpc3RhbmNlID0gdGhpcy5pbnNpZGUgPyB0aGlzLnJhZGl1cyAtIG9iamVjdFJhZGl1cyAtIGxlbmd0aCA6IGxlbmd0aCAtIG9iamVjdFJhZGl1cyAtIHRoaXMucmFkaXVzO1xuXG4gICAgaWYgKGRpc3RhbmNlIDwgMCkge1xuICAgICAgdGFyZ2V0Lm11bHRpcGx5U2NhbGFyKDEgLyBsZW5ndGgpOyAvLyBjb252ZXJ0IHRoZSBkZWx0YSB0byB0aGUgZGlyZWN0aW9uXG4gICAgICBpZiAodGhpcy5pbnNpZGUpIHtcbiAgICAgICAgdGFyZ2V0Lm5lZ2F0ZSgpOyAvLyBpZiBpbnNpZGUsIHJldmVyc2UgdGhlIGRpcmVjdGlvblxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkaXN0YW5jZTtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlQ2Fwc3VsZSB9IGZyb20gJy4uLy4uL1ZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlQ2Fwc3VsZSc7XG5pbXBvcnQgeyBDb2xsaWRlclNoYXBlQnVmZmVyR2VvbWV0cnkgfSBmcm9tICcuL0NvbGxpZGVyU2hhcGVCdWZmZXJHZW9tZXRyeSc7XG5cbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5leHBvcnQgY2xhc3MgQ29sbGlkZXJTaGFwZUNhcHN1bGVCdWZmZXJHZW9tZXRyeSBleHRlbmRzIFRIUkVFLkJ1ZmZlckdlb21ldHJ5IGltcGxlbWVudHMgQ29sbGlkZXJTaGFwZUJ1ZmZlckdlb21ldHJ5IHtcbiAgcHVibGljIHdvcmxkU2NhbGUgPSAxLjA7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBfYXR0clBvczogVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xuICBwcml2YXRlIHJlYWRvbmx5IF9hdHRySW5kZXg6IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZTtcbiAgcHJpdmF0ZSByZWFkb25seSBfc2hhcGU6IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlQ2Fwc3VsZTtcbiAgcHJpdmF0ZSBfY3VycmVudFJhZGl1cyA9IDA7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2N1cnJlbnRPZmZzZXQgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuICBwcml2YXRlIHJlYWRvbmx5IF9jdXJyZW50VGFpbCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHNoYXBlOiBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZUNhcHN1bGUpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5fc2hhcGUgPSBzaGFwZTtcblxuICAgIHRoaXMuX2F0dHJQb3MgPSBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKG5ldyBGbG9hdDMyQXJyYXkoMzk2KSwgMyk7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJywgdGhpcy5fYXR0clBvcyk7XG5cbiAgICB0aGlzLl9hdHRySW5kZXggPSBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKG5ldyBVaW50MTZBcnJheSgyNjQpLCAxKTtcbiAgICB0aGlzLnNldEluZGV4KHRoaXMuX2F0dHJJbmRleCk7XG5cbiAgICB0aGlzLl9idWlsZEluZGV4KCk7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgbGV0IHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gZmFsc2U7XG5cbiAgICBjb25zdCByYWRpdXMgPSB0aGlzLl9zaGFwZS5yYWRpdXMgLyB0aGlzLndvcmxkU2NhbGU7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRSYWRpdXMgIT09IHJhZGl1cykge1xuICAgICAgdGhpcy5fY3VycmVudFJhZGl1cyA9IHJhZGl1cztcbiAgICAgIHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX2N1cnJlbnRPZmZzZXQuZXF1YWxzKHRoaXMuX3NoYXBlLm9mZnNldCkpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRPZmZzZXQuY29weSh0aGlzLl9zaGFwZS5vZmZzZXQpO1xuICAgICAgc2hvdWxkVXBkYXRlR2VvbWV0cnkgPSB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0IHRhaWwgPSBfdjNBLmNvcHkodGhpcy5fc2hhcGUudGFpbCkuZGl2aWRlU2NhbGFyKHRoaXMud29ybGRTY2FsZSk7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRUYWlsLmRpc3RhbmNlVG9TcXVhcmVkKHRhaWwpID4gMWUtMTApIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRUYWlsLmNvcHkodGFpbCk7XG4gICAgICBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHNob3VsZFVwZGF0ZUdlb21ldHJ5KSB7XG4gICAgICB0aGlzLl9idWlsZFBvc2l0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRQb3NpdGlvbigpOiB2b2lkIHtcbiAgICBfdjNBLmNvcHkodGhpcy5fY3VycmVudFRhaWwpLnN1Yih0aGlzLl9jdXJyZW50T2Zmc2V0KTtcbiAgICBjb25zdCBsID0gX3YzQS5sZW5ndGgoKSAvIHRoaXMuX2N1cnJlbnRSYWRpdXM7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSAxNjsgaSsrKSB7XG4gICAgICBjb25zdCB0ID0gKGkgLyAxNi4wKSAqIE1hdGguUEk7XG5cbiAgICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKGksIC1NYXRoLnNpbih0KSwgLU1hdGguY29zKHQpLCAwLjApO1xuICAgICAgdGhpcy5fYXR0clBvcy5zZXRYWVooMTcgKyBpLCBsICsgTWF0aC5zaW4odCksIE1hdGguY29zKHQpLCAwLjApO1xuICAgICAgdGhpcy5fYXR0clBvcy5zZXRYWVooMzQgKyBpLCAtTWF0aC5zaW4odCksIDAuMCwgLU1hdGguY29zKHQpKTtcbiAgICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKDUxICsgaSwgbCArIE1hdGguc2luKHQpLCAwLjAsIE1hdGguY29zKHQpKTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDMyOyBpKyspIHtcbiAgICAgIGNvbnN0IHQgPSAoaSAvIDE2LjApICogTWF0aC5QSTtcbiAgICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKDY4ICsgaSwgMC4wLCBNYXRoLnNpbih0KSwgTWF0aC5jb3ModCkpO1xuICAgICAgdGhpcy5fYXR0clBvcy5zZXRYWVooMTAwICsgaSwgbCwgTWF0aC5zaW4odCksIE1hdGguY29zKHQpKTtcbiAgICB9XG5cbiAgICBjb25zdCB0aGV0YSA9IE1hdGguYXRhbjIoX3YzQS55LCBNYXRoLnNxcnQoX3YzQS54ICogX3YzQS54ICsgX3YzQS56ICogX3YzQS56KSk7XG4gICAgY29uc3QgcGhpID0gLU1hdGguYXRhbjIoX3YzQS56LCBfdjNBLngpO1xuXG4gICAgdGhpcy5yb3RhdGVaKHRoZXRhKTtcbiAgICB0aGlzLnJvdGF0ZVkocGhpKTtcbiAgICB0aGlzLnNjYWxlKHRoaXMuX2N1cnJlbnRSYWRpdXMsIHRoaXMuX2N1cnJlbnRSYWRpdXMsIHRoaXMuX2N1cnJlbnRSYWRpdXMpO1xuICAgIHRoaXMudHJhbnNsYXRlKHRoaXMuX2N1cnJlbnRPZmZzZXQueCwgdGhpcy5fY3VycmVudE9mZnNldC55LCB0aGlzLl9jdXJyZW50T2Zmc2V0LnopO1xuXG4gICAgdGhpcy5fYXR0clBvcy5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIF9idWlsZEluZGV4KCk6IHZvaWQge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzQ7IGkrKykge1xuICAgICAgY29uc3QgaTEgPSAoaSArIDEpICUgMzQ7XG5cbiAgICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWShpICogMiwgaSwgaTEpO1xuICAgICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKDY4ICsgaSAqIDIsIDM0ICsgaSwgMzQgKyBpMSk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzMjsgaSsrKSB7XG4gICAgICBjb25zdCBpMSA9IChpICsgMSkgJSAzMjtcblxuICAgICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKDEzNiArIGkgKiAyLCA2OCArIGksIDY4ICsgaTEpO1xuICAgICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKDIwMCArIGkgKiAyLCAxMDAgKyBpLCAxMDAgKyBpMSk7XG4gICAgfVxuXG4gICAgdGhpcy5fYXR0ckluZGV4Lm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlUGxhbmUgfSBmcm9tICcuLi8uLi9WUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZVBsYW5lJztcbmltcG9ydCB7IENvbGxpZGVyU2hhcGVCdWZmZXJHZW9tZXRyeSB9IGZyb20gJy4vQ29sbGlkZXJTaGFwZUJ1ZmZlckdlb21ldHJ5JztcblxuZXhwb3J0IGNsYXNzIENvbGxpZGVyU2hhcGVQbGFuZUJ1ZmZlckdlb21ldHJ5IGV4dGVuZHMgVEhSRUUuQnVmZmVyR2VvbWV0cnkgaW1wbGVtZW50cyBDb2xsaWRlclNoYXBlQnVmZmVyR2VvbWV0cnkge1xuICBwdWJsaWMgd29ybGRTY2FsZSA9IDEuMDtcblxuICBwcml2YXRlIHJlYWRvbmx5IF9hdHRyUG9zOiBUSFJFRS5CdWZmZXJBdHRyaWJ1dGU7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2F0dHJJbmRleDogVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xuICBwcml2YXRlIHJlYWRvbmx5IF9zaGFwZTogVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVQbGFuZTtcbiAgcHJpdmF0ZSByZWFkb25seSBfY3VycmVudE9mZnNldCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2N1cnJlbnROb3JtYWwgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihzaGFwZTogVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVQbGFuZSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLl9zaGFwZSA9IHNoYXBlO1xuXG4gICAgdGhpcy5fYXR0clBvcyA9IG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUobmV3IEZsb2F0MzJBcnJheSg2ICogMyksIDMpO1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKCdwb3NpdGlvbicsIHRoaXMuX2F0dHJQb3MpO1xuXG4gICAgdGhpcy5fYXR0ckluZGV4ID0gbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShuZXcgVWludDE2QXJyYXkoMTApLCAxKTtcbiAgICB0aGlzLnNldEluZGV4KHRoaXMuX2F0dHJJbmRleCk7XG5cbiAgICB0aGlzLl9idWlsZEluZGV4KCk7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgbGV0IHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gZmFsc2U7XG5cbiAgICBpZiAoIXRoaXMuX2N1cnJlbnRPZmZzZXQuZXF1YWxzKHRoaXMuX3NoYXBlLm9mZnNldCkpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRPZmZzZXQuY29weSh0aGlzLl9zaGFwZS5vZmZzZXQpO1xuICAgICAgc2hvdWxkVXBkYXRlR2VvbWV0cnkgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fY3VycmVudE5vcm1hbC5lcXVhbHModGhpcy5fc2hhcGUubm9ybWFsKSkge1xuICAgICAgdGhpcy5fY3VycmVudE5vcm1hbC5jb3B5KHRoaXMuX3NoYXBlLm5vcm1hbCk7XG4gICAgICBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHNob3VsZFVwZGF0ZUdlb21ldHJ5KSB7XG4gICAgICB0aGlzLl9idWlsZFBvc2l0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRQb3NpdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLl9hdHRyUG9zLnNldFhZWigwLCAtMC41LCAtMC41LCAwKTtcbiAgICB0aGlzLl9hdHRyUG9zLnNldFhZWigxLCAwLjUsIC0wLjUsIDApO1xuICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKDIsIDAuNSwgMC41LCAwKTtcbiAgICB0aGlzLl9hdHRyUG9zLnNldFhZWigzLCAtMC41LCAwLjUsIDApO1xuICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKDQsIDAsIDAsIDApO1xuICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKDUsIDAsIDAsIDAuMjUpO1xuXG4gICAgdGhpcy50cmFuc2xhdGUodGhpcy5fY3VycmVudE9mZnNldC54LCB0aGlzLl9jdXJyZW50T2Zmc2V0LnksIHRoaXMuX2N1cnJlbnRPZmZzZXQueik7XG4gICAgdGhpcy5sb29rQXQodGhpcy5fY3VycmVudE5vcm1hbCk7XG5cbiAgICB0aGlzLl9hdHRyUG9zLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX2J1aWxkSW5kZXgoKTogdm9pZCB7XG4gICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKDAsIDAsIDEpO1xuICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWSgyLCAxLCAyKTtcbiAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoNCwgMiwgMyk7XG4gICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKDYsIDMsIDApO1xuICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWSg4LCA0LCA1KTtcblxuICAgIHRoaXMuX2F0dHJJbmRleC5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZVNwaGVyZSB9IGZyb20gJy4uLy4uL1ZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlU3BoZXJlJztcbmltcG9ydCB7IENvbGxpZGVyU2hhcGVCdWZmZXJHZW9tZXRyeSB9IGZyb20gJy4vQ29sbGlkZXJTaGFwZUJ1ZmZlckdlb21ldHJ5JztcblxuZXhwb3J0IGNsYXNzIENvbGxpZGVyU2hhcGVTcGhlcmVCdWZmZXJHZW9tZXRyeSBleHRlbmRzIFRIUkVFLkJ1ZmZlckdlb21ldHJ5IGltcGxlbWVudHMgQ29sbGlkZXJTaGFwZUJ1ZmZlckdlb21ldHJ5IHtcbiAgcHVibGljIHdvcmxkU2NhbGUgPSAxLjA7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBfYXR0clBvczogVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xuICBwcml2YXRlIHJlYWRvbmx5IF9hdHRySW5kZXg6IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZTtcbiAgcHJpdmF0ZSByZWFkb25seSBfc2hhcGU6IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlU3BoZXJlO1xuICBwcml2YXRlIF9jdXJyZW50UmFkaXVzID0gMDtcbiAgcHJpdmF0ZSByZWFkb25seSBfY3VycmVudE9mZnNldCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHNoYXBlOiBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZVNwaGVyZSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLl9zaGFwZSA9IHNoYXBlO1xuXG4gICAgdGhpcy5fYXR0clBvcyA9IG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUobmV3IEZsb2F0MzJBcnJheSgzMiAqIDMgKiAzKSwgMyk7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJywgdGhpcy5fYXR0clBvcyk7XG5cbiAgICB0aGlzLl9hdHRySW5kZXggPSBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKG5ldyBVaW50MTZBcnJheSg2NCAqIDMpLCAxKTtcbiAgICB0aGlzLnNldEluZGV4KHRoaXMuX2F0dHJJbmRleCk7XG5cbiAgICB0aGlzLl9idWlsZEluZGV4KCk7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgbGV0IHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gZmFsc2U7XG5cbiAgICBjb25zdCByYWRpdXMgPSB0aGlzLl9zaGFwZS5yYWRpdXMgLyB0aGlzLndvcmxkU2NhbGU7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRSYWRpdXMgIT09IHJhZGl1cykge1xuICAgICAgdGhpcy5fY3VycmVudFJhZGl1cyA9IHJhZGl1cztcbiAgICAgIHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX2N1cnJlbnRPZmZzZXQuZXF1YWxzKHRoaXMuX3NoYXBlLm9mZnNldCkpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRPZmZzZXQuY29weSh0aGlzLl9zaGFwZS5vZmZzZXQpO1xuICAgICAgc2hvdWxkVXBkYXRlR2VvbWV0cnkgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmIChzaG91bGRVcGRhdGVHZW9tZXRyeSkge1xuICAgICAgdGhpcy5fYnVpbGRQb3NpdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2J1aWxkUG9zaXRpb24oKTogdm9pZCB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzMjsgaSsrKSB7XG4gICAgICBjb25zdCB0ID0gKGkgLyAxNi4wKSAqIE1hdGguUEk7XG5cbiAgICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKGksIE1hdGguY29zKHQpLCBNYXRoLnNpbih0KSwgMC4wKTtcbiAgICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKDMyICsgaSwgMC4wLCBNYXRoLmNvcyh0KSwgTWF0aC5zaW4odCkpO1xuICAgICAgdGhpcy5fYXR0clBvcy5zZXRYWVooNjQgKyBpLCBNYXRoLnNpbih0KSwgMC4wLCBNYXRoLmNvcyh0KSk7XG4gICAgfVxuXG4gICAgdGhpcy5zY2FsZSh0aGlzLl9jdXJyZW50UmFkaXVzLCB0aGlzLl9jdXJyZW50UmFkaXVzLCB0aGlzLl9jdXJyZW50UmFkaXVzKTtcbiAgICB0aGlzLnRyYW5zbGF0ZSh0aGlzLl9jdXJyZW50T2Zmc2V0LngsIHRoaXMuX2N1cnJlbnRPZmZzZXQueSwgdGhpcy5fY3VycmVudE9mZnNldC56KTtcblxuICAgIHRoaXMuX2F0dHJQb3MubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRJbmRleCgpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDMyOyBpKyspIHtcbiAgICAgIGNvbnN0IGkxID0gKGkgKyAxKSAlIDMyO1xuXG4gICAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoaSAqIDIsIGksIGkxKTtcbiAgICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWSg2NCArIGkgKiAyLCAzMiArIGksIDMyICsgaTEpO1xuICAgICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKDEyOCArIGkgKiAyLCA2NCArIGksIDY0ICsgaTEpO1xuICAgIH1cblxuICAgIHRoaXMuX2F0dHJJbmRleC5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lSm9pbnQgfSBmcm9tICcuLi9WUk1TcHJpbmdCb25lSm9pbnQnO1xuaW1wb3J0IHsgU3ByaW5nQm9uZUJ1ZmZlckdlb21ldHJ5IH0gZnJvbSAnLi91dGlscy9TcHJpbmdCb25lQnVmZmVyR2VvbWV0cnknO1xuXG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuZXhwb3J0IGNsYXNzIFZSTVNwcmluZ0JvbmVKb2ludEhlbHBlciBleHRlbmRzIFRIUkVFLkdyb3VwIHtcbiAgcHVibGljIHJlYWRvbmx5IHNwcmluZ0JvbmU6IFZSTVNwcmluZ0JvbmVKb2ludDtcbiAgcHJpdmF0ZSByZWFkb25seSBfZ2VvbWV0cnk6IFNwcmluZ0JvbmVCdWZmZXJHZW9tZXRyeTtcbiAgcHJpdmF0ZSByZWFkb25seSBfbGluZTogVEhSRUUuTGluZVNlZ21lbnRzO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihzcHJpbmdCb25lOiBWUk1TcHJpbmdCb25lSm9pbnQpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMubWF0cml4QXV0b1VwZGF0ZSA9IGZhbHNlO1xuXG4gICAgdGhpcy5zcHJpbmdCb25lID0gc3ByaW5nQm9uZTtcblxuICAgIHRoaXMuX2dlb21ldHJ5ID0gbmV3IFNwcmluZ0JvbmVCdWZmZXJHZW9tZXRyeSh0aGlzLnNwcmluZ0JvbmUpO1xuXG4gICAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTGluZUJhc2ljTWF0ZXJpYWwoe1xuICAgICAgY29sb3I6IDB4ZmZmZjAwLFxuICAgICAgZGVwdGhUZXN0OiBmYWxzZSxcbiAgICAgIGRlcHRoV3JpdGU6IGZhbHNlLFxuICAgIH0pO1xuXG4gICAgdGhpcy5fbGluZSA9IG5ldyBUSFJFRS5MaW5lU2VnbWVudHModGhpcy5fZ2VvbWV0cnksIG1hdGVyaWFsKTtcbiAgICB0aGlzLmFkZCh0aGlzLl9saW5lKTtcbiAgfVxuXG4gIHB1YmxpYyBkaXNwb3NlKCk6IHZvaWQge1xuICAgIHRoaXMuX2dlb21ldHJ5LmRpc3Bvc2UoKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVNYXRyaXhXb3JsZChmb3JjZTogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuc3ByaW5nQm9uZS5ib25lLnVwZGF0ZVdvcmxkTWF0cml4KHRydWUsIGZhbHNlKTtcblxuICAgIHRoaXMubWF0cml4LmNvcHkodGhpcy5zcHJpbmdCb25lLmJvbmUubWF0cml4V29ybGQpO1xuXG4gICAgY29uc3QgbWF0cml4V29ybGRFbGVtZW50cyA9IHRoaXMubWF0cml4LmVsZW1lbnRzO1xuICAgIHRoaXMuX2dlb21ldHJ5LndvcmxkU2NhbGUgPSBfdjNBXG4gICAgICAuc2V0KG1hdHJpeFdvcmxkRWxlbWVudHNbMF0sIG1hdHJpeFdvcmxkRWxlbWVudHNbMV0sIG1hdHJpeFdvcmxkRWxlbWVudHNbMl0pXG4gICAgICAubGVuZ3RoKCk7IC8vIGNhbGN1bGF0ZSBzY2FsZSBvZiB4IGNvbXBvbmVudFxuXG4gICAgdGhpcy5fZ2VvbWV0cnkudXBkYXRlKCk7XG5cbiAgICBzdXBlci51cGRhdGVNYXRyaXhXb3JsZChmb3JjZSk7XG4gIH1cbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lSm9pbnQgfSBmcm9tICcuLi8uLi9WUk1TcHJpbmdCb25lSm9pbnQnO1xuXG5leHBvcnQgY2xhc3MgU3ByaW5nQm9uZUJ1ZmZlckdlb21ldHJ5IGV4dGVuZHMgVEhSRUUuQnVmZmVyR2VvbWV0cnkge1xuICBwdWJsaWMgd29ybGRTY2FsZSA9IDEuMDtcblxuICBwcml2YXRlIHJlYWRvbmx5IF9hdHRyUG9zOiBUSFJFRS5CdWZmZXJBdHRyaWJ1dGU7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2F0dHJJbmRleDogVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xuICBwcml2YXRlIHJlYWRvbmx5IF9zcHJpbmdCb25lOiBWUk1TcHJpbmdCb25lSm9pbnQ7XG4gIHByaXZhdGUgX2N1cnJlbnRSYWRpdXMgPSAwO1xuICBwcml2YXRlIHJlYWRvbmx5IF9jdXJyZW50VGFpbCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHNwcmluZ0JvbmU6IFZSTVNwcmluZ0JvbmVKb2ludCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLl9zcHJpbmdCb25lID0gc3ByaW5nQm9uZTtcblxuICAgIHRoaXMuX2F0dHJQb3MgPSBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKG5ldyBGbG9hdDMyQXJyYXkoMjk0KSwgMyk7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJywgdGhpcy5fYXR0clBvcyk7XG5cbiAgICB0aGlzLl9hdHRySW5kZXggPSBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKG5ldyBVaW50MTZBcnJheSgxOTQpLCAxKTtcbiAgICB0aGlzLnNldEluZGV4KHRoaXMuX2F0dHJJbmRleCk7XG5cbiAgICB0aGlzLl9idWlsZEluZGV4KCk7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgbGV0IHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gZmFsc2U7XG5cbiAgICBjb25zdCByYWRpdXMgPSB0aGlzLl9zcHJpbmdCb25lLnNldHRpbmdzLmhpdFJhZGl1cyAvIHRoaXMud29ybGRTY2FsZTtcbiAgICBpZiAodGhpcy5fY3VycmVudFJhZGl1cyAhPT0gcmFkaXVzKSB7XG4gICAgICB0aGlzLl9jdXJyZW50UmFkaXVzID0gcmFkaXVzO1xuICAgICAgc2hvdWxkVXBkYXRlR2VvbWV0cnkgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fY3VycmVudFRhaWwuZXF1YWxzKHRoaXMuX3NwcmluZ0JvbmUuaW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbikpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRUYWlsLmNvcHkodGhpcy5fc3ByaW5nQm9uZS5pbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uKTtcbiAgICAgIHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoc2hvdWxkVXBkYXRlR2VvbWV0cnkpIHtcbiAgICAgIHRoaXMuX2J1aWxkUG9zaXRpb24oKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9idWlsZFBvc2l0aW9uKCk6IHZvaWQge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzI7IGkrKykge1xuICAgICAgY29uc3QgdCA9IChpIC8gMTYuMCkgKiBNYXRoLlBJO1xuXG4gICAgICB0aGlzLl9hdHRyUG9zLnNldFhZWihpLCBNYXRoLmNvcyh0KSwgTWF0aC5zaW4odCksIDAuMCk7XG4gICAgICB0aGlzLl9hdHRyUG9zLnNldFhZWigzMiArIGksIDAuMCwgTWF0aC5jb3ModCksIE1hdGguc2luKHQpKTtcbiAgICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKDY0ICsgaSwgTWF0aC5zaW4odCksIDAuMCwgTWF0aC5jb3ModCkpO1xuICAgIH1cblxuICAgIHRoaXMuc2NhbGUodGhpcy5fY3VycmVudFJhZGl1cywgdGhpcy5fY3VycmVudFJhZGl1cywgdGhpcy5fY3VycmVudFJhZGl1cyk7XG4gICAgdGhpcy50cmFuc2xhdGUodGhpcy5fY3VycmVudFRhaWwueCwgdGhpcy5fY3VycmVudFRhaWwueSwgdGhpcy5fY3VycmVudFRhaWwueik7XG5cbiAgICB0aGlzLl9hdHRyUG9zLnNldFhZWig5NiwgMCwgMCwgMCk7XG4gICAgdGhpcy5fYXR0clBvcy5zZXRYWVooOTcsIHRoaXMuX2N1cnJlbnRUYWlsLngsIHRoaXMuX2N1cnJlbnRUYWlsLnksIHRoaXMuX2N1cnJlbnRUYWlsLnopO1xuXG4gICAgdGhpcy5fYXR0clBvcy5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIF9idWlsZEluZGV4KCk6IHZvaWQge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzI7IGkrKykge1xuICAgICAgY29uc3QgaTEgPSAoaSArIDEpICUgMzI7XG5cbiAgICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWShpICogMiwgaSwgaTEpO1xuICAgICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKDY0ICsgaSAqIDIsIDMyICsgaSwgMzIgKyBpMSk7XG4gICAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoMTI4ICsgaSAqIDIsIDY0ICsgaSwgNjQgKyBpMSk7XG4gICAgfVxuICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWSgxOTIsIDk2LCA5Nyk7XG5cbiAgICB0aGlzLl9hdHRySW5kZXgubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHR5cGUgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZSB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGUnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBjb2xsaWRlciBvZiBhIFZSTS5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTVNwcmluZ0JvbmVDb2xsaWRlciBleHRlbmRzIFRIUkVFLk9iamVjdDNEIHtcbiAgLyoqXG4gICAqIFRoZSBzaGFwZSBvZiB0aGUgY29sbGlkZXIuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgc2hhcGU6IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlO1xuXG4gIC8qKlxuICAgKiBXb3JsZCBzcGFjZSBtYXRyaXggZm9yIHRoZSBjb2xsaWRlciBzaGFwZSB1c2VkIGluIGNvbGxpc2lvbiBjYWxjdWxhdGlvbnMuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgY29sbGlkZXJNYXRyaXggPSBuZXcgVEhSRUUuTWF0cml4NCgpO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihzaGFwZTogVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGUpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5zaGFwZSA9IHNoYXBlO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZVdvcmxkTWF0cml4KHVwZGF0ZVBhcmVudHM6IGJvb2xlYW4sIHVwZGF0ZUNoaWxkcmVuOiBib29sZWFuKTogdm9pZCB7XG4gICAgc3VwZXIudXBkYXRlV29ybGRNYXRyaXgodXBkYXRlUGFyZW50cywgdXBkYXRlQ2hpbGRyZW4pO1xuXG4gICAgdXBkYXRlQ29sbGlkZXJNYXRyaXgodGhpcy5jb2xsaWRlck1hdHJpeCwgdGhpcy5tYXRyaXhXb3JsZCwgdGhpcy5zaGFwZS5vZmZzZXQpO1xuICB9XG59XG5cbi8qKlxuICogQ29tcHV0ZXMgdGhlIGNvbGxpZGVyTWF0cml4IGJhc2VkIG9uIGFuIG9mZnNldCBhbmQgYSB3b3JsZCBtYXRyaXguXG4gKiBFcXVpdmFsZW50IHRvIHRoZSBmb2xsb3dpbmcgY29kZSB3aGVuIG1hdHJpeFdvcmxkIGlzIGFuIGFmZmluZSBtYXRyaXg6XG4gKiBgYGBqc1xuICogb3V0Lm1ha2VUcmFuc2xhdGlvbihvZmZzZXQpLnByZW11bHRpcGx5KG1hdHJpeFdvcmxkKVxuICogYGBgXG4gKlxuICogQHBhcmFtIGNvbGxpZGVyTWF0cml4IFRoZSB0YXJnZXQgbWF0cml4IHRvIHN0b3JlIHRoZSByZXN1bHQgaW4uXG4gKiBAcGFyYW0gbWF0cml4V29ybGQgVGhlIHdvcmxkIG1hdHJpeCBmbyB0aGUgY29sbGlkZXIgb2JqZWN0LlxuICogQHBhcmFtIG9mZnNldCBPcHRpb25hbCBvZmZzZXQgdG8gdGhlIGNvbGxpZGVyIHNoYXBlLlxuICovXG5mdW5jdGlvbiB1cGRhdGVDb2xsaWRlck1hdHJpeChjb2xsaWRlck1hdHJpeDogVEhSRUUuTWF0cml4NCwgbWF0cml4V29ybGQ6IFRIUkVFLk1hdHJpeDQsIG9mZnNldD86IFRIUkVFLlZlY3RvcjMpIHtcbiAgY29uc3QgbWUgPSBtYXRyaXhXb3JsZC5lbGVtZW50cztcblxuICBjb2xsaWRlck1hdHJpeC5jb3B5KG1hdHJpeFdvcmxkKTtcblxuICBpZiAob2Zmc2V0KSB7XG4gICAgY29sbGlkZXJNYXRyaXguZWxlbWVudHNbMTJdID0gbWVbMF0gKiBvZmZzZXQueCArIG1lWzRdICogb2Zmc2V0LnkgKyBtZVs4XSAqIG9mZnNldC56ICsgbWVbMTJdO1xuICAgIGNvbGxpZGVyTWF0cml4LmVsZW1lbnRzWzEzXSA9IG1lWzFdICogb2Zmc2V0LnggKyBtZVs1XSAqIG9mZnNldC55ICsgbWVbOV0gKiBvZmZzZXQueiArIG1lWzEzXTtcbiAgICBjb2xsaWRlck1hdHJpeC5lbGVtZW50c1sxNF0gPSBtZVsyXSAqIG9mZnNldC54ICsgbWVbNl0gKiBvZmZzZXQueSArIG1lWzEwXSAqIG9mZnNldC56ICsgbWVbMTRdO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgTWF0cml4NEludmVyc2VDYWNoZSB9IGZyb20gJy4vdXRpbHMvTWF0cml4NEludmVyc2VDYWNoZSc7XG5pbXBvcnQgdHlwZSB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cCc7XG5pbXBvcnQgdHlwZSB7IFZSTVNwcmluZ0JvbmVKb2ludFNldHRpbmdzIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lSm9pbnRTZXR0aW5ncyc7XG5cbi8vIGJhc2VkIG9uXG4vLyBodHRwOi8vcm9ja2V0anVtcC5za3IuanAvdW5pdHkzZC8xMDkvXG4vLyBodHRwczovL2dpdGh1Yi5jb20vZHdhbmdvL1VuaVZSTS9ibG9iL21hc3Rlci9TY3JpcHRzL1NwcmluZ0JvbmUvVlJNU3ByaW5nQm9uZS5jc1xuXG5jb25zdCBJREVOVElUWV9NQVRSSVg0ID0gbmV3IFRIUkVFLk1hdHJpeDQoKTtcblxuLy8gXHU4QTA4XHU3Qjk3XHU0RTJEXHUzMDZFXHU0RTAwXHU2NjQyXHU0RkREXHU1QjU4XHU3NTI4XHU1OTA5XHU2NTcwXHVGRjA4XHU0RTAwXHU1RUE2XHUzMEE0XHUzMEYzXHUzMEI5XHUzMEJGXHUzMEYzXHUzMEI5XHUzMDkyXHU0RjVDXHUzMDYzXHUzMDVGXHUzMDg5XHUzMDQyXHUzMDY4XHUzMDZGXHU0RjdGXHUzMDQ0XHU1NkRFXHUzMDU5XHVGRjA5XG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF92M0IgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4vKipcbiAqIEEgdGVtcG9yYXJ5IHZhcmlhYmxlIHdoaWNoIGlzIHVzZWQgaW4gYHVwZGF0ZWBcbiAqL1xuY29uc3QgX3dvcmxkU3BhY2VQb3NpdGlvbiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbi8qKlxuICogQSB0ZW1wb3JhcnkgdmFyaWFibGUgd2hpY2ggaXMgdXNlZCBpbiBgdXBkYXRlYFxuICovXG5jb25zdCBfbmV4dFRhaWwgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5jb25zdCBfbWF0QSA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG5cbi8qKlxuICogQSBjbGFzcyByZXByZXNlbnRzIGEgc2luZ2xlIGpvaW50IG9mIGEgc3ByaW5nIGJvbmUuXG4gKiBJdCBzaG91bGQgYmUgbWFuYWdlZCBieSBhIFtbVlJNU3ByaW5nQm9uZU1hbmFnZXJdXS5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTVNwcmluZ0JvbmVKb2ludCB7XG4gIC8qKlxuICAgKiBTZXR0aW5ncyBvZiB0aGUgYm9uZS5cbiAgICovXG4gIHB1YmxpYyBzZXR0aW5nczogVlJNU3ByaW5nQm9uZUpvaW50U2V0dGluZ3M7XG5cbiAgLyoqXG4gICAqIENvbGxpZGVyIGdyb3VwcyBhdHRhY2hlZCB0byB0aGlzIGJvbmUuXG4gICAqL1xuICBwdWJsaWMgY29sbGlkZXJHcm91cHM6IFZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwW107XG5cbiAgLyoqXG4gICAqIEFuIE9iamVjdDNEIGF0dGFjaGVkIHRvIHRoaXMgYm9uZS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBib25lOiBUSFJFRS5PYmplY3QzRDtcblxuICAvKipcbiAgICogQW4gT2JqZWN0M0QgdGhhdCB3aWxsIGJlIHVzZWQgYXMgYSB0YWlsIG9mIHRoaXMgc3ByaW5nIGJvbmUuXG4gICAqIEl0IGNhbiBiZSBudWxsIHdoZW4gdGhlIHNwcmluZyBib25lIGlzIGltcG9ydGVkIGZyb20gVlJNIDAuMC5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBjaGlsZDogVEhSRUUuT2JqZWN0M0QgfCBudWxsO1xuXG4gIC8qKlxuICAgKiBDdXJyZW50IHBvc2l0aW9uIG9mIGNoaWxkIHRhaWwsIGluIGNlbnRlciB1bml0LiBXaWxsIGJlIHVzZWQgZm9yIHZlcmxldCBpbnRlZ3JhdGlvbi5cbiAgICovXG4gIHByaXZhdGUgX2N1cnJlbnRUYWlsID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuICAvKipcbiAgICogUHJldmlvdXMgcG9zaXRpb24gb2YgY2hpbGQgdGFpbCwgaW4gY2VudGVyIHVuaXQuIFdpbGwgYmUgdXNlZCBmb3IgdmVybGV0IGludGVncmF0aW9uLlxuICAgKi9cbiAgcHJpdmF0ZSBfcHJldlRhaWwgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4gIC8qKlxuICAgKiBJbml0aWFsIGF4aXMgb2YgdGhlIGJvbmUsIGluIGxvY2FsIHVuaXQuXG4gICAqL1xuICBwcml2YXRlIF9ib25lQXhpcyA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbiAgLyoqXG4gICAqIExlbmd0aCBvZiB0aGUgYm9uZSBpbiB3b3JsZCB1bml0LlxuICAgKiBXaWxsIGJlIHVzZWQgZm9yIG5vcm1hbGl6YXRpb24gaW4gdXBkYXRlIGxvb3AsIHdpbGwgYmUgdXBkYXRlZCBieSB7QGxpbmsgX2NhbGNXb3JsZFNwYWNlQm9uZUxlbmd0aH0uXG4gICAqXG4gICAqIEl0J3Mgc2FtZSBhcyBsb2NhbCB1bml0IGxlbmd0aCB1bmxlc3MgdGhlcmUgYXJlIHNjYWxlIHRyYW5zZm9ybWF0aW9ucyBpbiB0aGUgd29ybGQgc3BhY2UuXG4gICAqL1xuICBwcml2YXRlIF93b3JsZFNwYWNlQm9uZUxlbmd0aCA9IDAuMDtcblxuICAvKipcbiAgICogU2V0IG9mIGRlcGVuZGVuY2llcyB0aGF0IG5lZWQgdG8gYmUgdXBkYXRlZCBiZWZvcmUgdGhpcyBqb2ludC5cbiAgICovXG4gIHB1YmxpYyBnZXQgZGVwZW5kZW5jaWVzKCk6IFNldDxUSFJFRS5PYmplY3QzRD4ge1xuICAgIGNvbnN0IHNldCA9IG5ldyBTZXQ8VEhSRUUuT2JqZWN0M0Q+KCk7XG5cbiAgICBjb25zdCBwYXJlbnQgPSB0aGlzLmJvbmUucGFyZW50O1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgIHNldC5hZGQocGFyZW50KTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBjZyA9IDA7IGNnIDwgdGhpcy5jb2xsaWRlckdyb3Vwcy5sZW5ndGg7IGNnKyspIHtcbiAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgdGhpcy5jb2xsaWRlckdyb3Vwc1tjZ10uY29sbGlkZXJzLmxlbmd0aDsgYysrKSB7XG4gICAgICAgIHNldC5hZGQodGhpcy5jb2xsaWRlckdyb3Vwc1tjZ10uY29sbGlkZXJzW2NdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc2V0O1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgc3ByaW5nYm9uZSB3aWxsIGJlIGNhbGN1bGF0ZWQgYmFzZWQgb24gdGhlIHNwYWNlIHJlbGF0aXZlIGZyb20gdGhpcyBvYmplY3QuXG4gICAqIElmIHRoaXMgaXMgYG51bGxgLCBzcHJpbmdib25lIHdpbGwgYmUgY2FsY3VsYXRlZCBpbiB3b3JsZCBzcGFjZS5cbiAgICovXG4gIHByaXZhdGUgX2NlbnRlcjogVEhSRUUuT2JqZWN0M0QgfCBudWxsID0gbnVsbDtcbiAgcHVibGljIGdldCBjZW50ZXIoKTogVEhSRUUuT2JqZWN0M0QgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fY2VudGVyO1xuICB9XG4gIHB1YmxpYyBzZXQgY2VudGVyKGNlbnRlcjogVEhSRUUuT2JqZWN0M0QgfCBudWxsKSB7XG4gICAgLy8gdW5pbnN0YWxsIGludmVyc2UgY2FjaGVcbiAgICBpZiAodGhpcy5fY2VudGVyPy51c2VyRGF0YS5pbnZlcnNlQ2FjaGVQcm94eSkge1xuICAgICAgKHRoaXMuX2NlbnRlci51c2VyRGF0YS5pbnZlcnNlQ2FjaGVQcm94eSBhcyBNYXRyaXg0SW52ZXJzZUNhY2hlKS5yZXZlcnQoKTtcbiAgICAgIGRlbGV0ZSB0aGlzLl9jZW50ZXIudXNlckRhdGEuaW52ZXJzZUNhY2hlUHJveHk7XG4gICAgfVxuXG4gICAgLy8gY2hhbmdlIHRoZSBjZW50ZXJcbiAgICB0aGlzLl9jZW50ZXIgPSBjZW50ZXI7XG5cbiAgICAvLyBpbnN0YWxsIGludmVyc2UgY2FjaGVcbiAgICBpZiAodGhpcy5fY2VudGVyKSB7XG4gICAgICBpZiAoIXRoaXMuX2NlbnRlci51c2VyRGF0YS5pbnZlcnNlQ2FjaGVQcm94eSkge1xuICAgICAgICB0aGlzLl9jZW50ZXIudXNlckRhdGEuaW52ZXJzZUNhY2hlUHJveHkgPSBuZXcgTWF0cml4NEludmVyc2VDYWNoZSh0aGlzLl9jZW50ZXIubWF0cml4V29ybGQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsIHN0YXRlIG9mIHRoZSBsb2NhbCBtYXRyaXggb2YgdGhlIGJvbmUuXG4gICAqL1xuICBwcml2YXRlIF9pbml0aWFsTG9jYWxNYXRyaXggPSBuZXcgVEhSRUUuTWF0cml4NCgpO1xuXG4gIC8qKlxuICAgKiBJbml0aWFsIHN0YXRlIG9mIHRoZSByb3RhdGlvbiBvZiB0aGUgYm9uZS5cbiAgICovXG4gIHByaXZhdGUgX2luaXRpYWxMb2NhbFJvdGF0aW9uID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblxuICAvKipcbiAgICogSW5pdGlhbCBzdGF0ZSBvZiB0aGUgcG9zaXRpb24gb2YgaXRzIGNoaWxkLlxuICAgKi9cbiAgcHJpdmF0ZSBfaW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG4gIHB1YmxpYyBnZXQgaW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbigpOiBUSFJFRS5WZWN0b3IzIHtcbiAgICByZXR1cm4gdGhpcy5faW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB3b3JsZCBtYXRyaXggb2YgaXRzIHBhcmVudCBvYmplY3QuXG4gICAqIE5vdGUgdGhhdCBpdCByZXR1cm5zIGEgcmVmZXJlbmNlIHRvIHRoZSBtYXRyaXguIERvbid0IG11dGF0ZSB0aGlzIGRpcmVjdGx5IVxuICAgKi9cbiAgcHJpdmF0ZSBnZXQgX3BhcmVudE1hdHJpeFdvcmxkKCk6IFRIUkVFLk1hdHJpeDQge1xuICAgIHJldHVybiB0aGlzLmJvbmUucGFyZW50ID8gdGhpcy5ib25lLnBhcmVudC5tYXRyaXhXb3JsZCA6IElERU5USVRZX01BVFJJWDQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IFZSTVNwcmluZ0JvbmUuXG4gICAqXG4gICAqIEBwYXJhbSBib25lIEFuIE9iamVjdDNEIHRoYXQgd2lsbCBiZSBhdHRhY2hlZCB0byB0aGlzIGJvbmVcbiAgICogQHBhcmFtIGNoaWxkIEFuIE9iamVjdDNEIHRoYXQgd2lsbCBiZSB1c2VkIGFzIGEgdGFpbCBvZiB0aGlzIHNwcmluZyBib25lLiBJdCBjYW4gYmUgbnVsbCB3aGVuIHRoZSBzcHJpbmcgYm9uZSBpcyBpbXBvcnRlZCBmcm9tIFZSTSAwLjBcbiAgICogQHBhcmFtIHNldHRpbmdzIFNldmVyYWwgcGFyYW1ldGVycyByZWxhdGVkIHRvIGJlaGF2aW9yIG9mIHRoZSBzcHJpbmcgYm9uZVxuICAgKiBAcGFyYW0gY29sbGlkZXJHcm91cHMgQ29sbGlkZXIgZ3JvdXBzIHRoYXQgd2lsbCBiZSBjb2xsaWRlZCB3aXRoIHRoaXMgc3ByaW5nIGJvbmVcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIGJvbmU6IFRIUkVFLk9iamVjdDNELFxuICAgIGNoaWxkOiBUSFJFRS5PYmplY3QzRCB8IG51bGwsXG4gICAgc2V0dGluZ3M6IFBhcnRpYWw8VlJNU3ByaW5nQm9uZUpvaW50U2V0dGluZ3M+ID0ge30sXG4gICAgY29sbGlkZXJHcm91cHM6IFZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwW10gPSBbXSxcbiAgKSB7XG4gICAgdGhpcy5ib25lID0gYm9uZTsgLy8gdW5pVlJNXHUzMDY3XHUzMDZFIHBhcmVudFxuICAgIHRoaXMuYm9uZS5tYXRyaXhBdXRvVXBkYXRlID0gZmFsc2U7IC8vIHVwZGF0ZVx1MzA2Qlx1MzA4OFx1MzA4QVx1OEEwOFx1N0I5N1x1MzA1NVx1MzA4Q1x1MzA4Qlx1MzA2RVx1MzA2N3RocmVlLmpzXHU1MTg1XHUzMDY3XHUzMDZFXHU4MUVBXHU1MkQ1XHU1MUU2XHU3NDA2XHUzMDZGXHU0RTBEXHU4OTgxXG5cbiAgICB0aGlzLmNoaWxkID0gY2hpbGQ7XG5cbiAgICB0aGlzLnNldHRpbmdzID0ge1xuICAgICAgaGl0UmFkaXVzOiBzZXR0aW5ncy5oaXRSYWRpdXMgPz8gMC4wLFxuICAgICAgc3RpZmZuZXNzOiBzZXR0aW5ncy5zdGlmZm5lc3MgPz8gMS4wLFxuICAgICAgZ3Jhdml0eVBvd2VyOiBzZXR0aW5ncy5ncmF2aXR5UG93ZXIgPz8gMC4wLFxuICAgICAgZ3Jhdml0eURpcjogc2V0dGluZ3MuZ3Jhdml0eURpcj8uY2xvbmUoKSA/PyBuZXcgVEhSRUUuVmVjdG9yMygwLjAsIC0xLjAsIDAuMCksXG4gICAgICBkcmFnRm9yY2U6IHNldHRpbmdzLmRyYWdGb3JjZSA/PyAwLjQsXG4gICAgfTtcblxuICAgIHRoaXMuY29sbGlkZXJHcm91cHMgPSBjb2xsaWRlckdyb3VwcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGluaXRpYWwgc3RhdGUgb2YgdGhpcyBzcHJpbmcgYm9uZS5cbiAgICogWW91IG1pZ2h0IHdhbnQgdG8gY2FsbCB7QGxpbmsgVlJNU3ByaW5nQm9uZU1hbmFnZXIuc2V0SW5pdFN0YXRlfSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIHNldEluaXRTdGF0ZSgpOiB2b2lkIHtcbiAgICAvLyByZW1lbWJlciBpbml0aWFsIHBvc2l0aW9uIG9mIGl0c2VsZlxuICAgIHRoaXMuX2luaXRpYWxMb2NhbE1hdHJpeC5jb3B5KHRoaXMuYm9uZS5tYXRyaXgpO1xuICAgIHRoaXMuX2luaXRpYWxMb2NhbFJvdGF0aW9uLmNvcHkodGhpcy5ib25lLnF1YXRlcm5pb24pO1xuXG4gICAgLy8gc2VlIGluaXRpYWwgcG9zaXRpb24gb2YgaXRzIGxvY2FsIGNoaWxkXG4gICAgaWYgKHRoaXMuY2hpbGQpIHtcbiAgICAgIHRoaXMuX2luaXRpYWxMb2NhbENoaWxkUG9zaXRpb24uY29weSh0aGlzLmNoaWxkLnBvc2l0aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gdnJtMCByZXF1aXJlcyBhIDdjbSBmaXhlZCBib25lIGxlbmd0aCBmb3IgdGhlIGZpbmFsIG5vZGUgaW4gYSBjaGFpblxuICAgICAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vdnJtLWMvdnJtLXNwZWNpZmljYXRpb24vdHJlZS9tYXN0ZXIvc3BlY2lmaWNhdGlvbi9WUk1DX3NwcmluZ0JvbmUtMS4wI2Fib3V0LXNwcmluZy1jb25maWd1cmF0aW9uXG4gICAgICB0aGlzLl9pbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uLmNvcHkodGhpcy5ib25lLnBvc2l0aW9uKS5ub3JtYWxpemUoKS5tdWx0aXBseVNjYWxhcigwLjA3KTtcbiAgICB9XG5cbiAgICAvLyBjb3B5IHRoZSBjaGlsZCBwb3NpdGlvbiB0byB0YWlsc1xuICAgIGNvbnN0IG1hdHJpeFdvcmxkVG9DZW50ZXIgPSB0aGlzLl9nZXRNYXRyaXhXb3JsZFRvQ2VudGVyKCk7XG4gICAgdGhpcy5ib25lLmxvY2FsVG9Xb3JsZCh0aGlzLl9jdXJyZW50VGFpbC5jb3B5KHRoaXMuX2luaXRpYWxMb2NhbENoaWxkUG9zaXRpb24pKS5hcHBseU1hdHJpeDQobWF0cml4V29ybGRUb0NlbnRlcik7XG4gICAgdGhpcy5fcHJldlRhaWwuY29weSh0aGlzLl9jdXJyZW50VGFpbCk7XG5cbiAgICAvLyBzZXQgaW5pdGlhbCBzdGF0ZXMgdGhhdCBhcmUgcmVsYXRlZCB0byBsb2NhbCBjaGlsZCBwb3NpdGlvblxuICAgIHRoaXMuX2JvbmVBeGlzLmNvcHkodGhpcy5faW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbikubm9ybWFsaXplKCk7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhlIHN0YXRlIG9mIHRoaXMgYm9uZS5cbiAgICogWW91IG1pZ2h0IHdhbnQgdG8gY2FsbCBbW1ZSTVNwcmluZ0JvbmVNYW5hZ2VyLnJlc2V0XV0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLmJvbmUucXVhdGVybmlvbi5jb3B5KHRoaXMuX2luaXRpYWxMb2NhbFJvdGF0aW9uKTtcblxuICAgIC8vIFdlIG5lZWQgdG8gdXBkYXRlIGl0cyBtYXRyaXhXb3JsZCBtYW51YWxseSwgc2luY2Ugd2UgdHdlYWtlZCB0aGUgYm9uZSBieSBvdXIgaGFuZFxuICAgIHRoaXMuYm9uZS51cGRhdGVNYXRyaXgoKTtcbiAgICB0aGlzLmJvbmUubWF0cml4V29ybGQubXVsdGlwbHlNYXRyaWNlcyh0aGlzLl9wYXJlbnRNYXRyaXhXb3JsZCwgdGhpcy5ib25lLm1hdHJpeCk7XG5cbiAgICAvLyBBcHBseSB1cGRhdGVkIHBvc2l0aW9uIHRvIHRhaWwgc3RhdGVzXG4gICAgY29uc3QgbWF0cml4V29ybGRUb0NlbnRlciA9IHRoaXMuX2dldE1hdHJpeFdvcmxkVG9DZW50ZXIoKTtcbiAgICB0aGlzLmJvbmUubG9jYWxUb1dvcmxkKHRoaXMuX2N1cnJlbnRUYWlsLmNvcHkodGhpcy5faW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbikpLmFwcGx5TWF0cml4NChtYXRyaXhXb3JsZFRvQ2VudGVyKTtcbiAgICB0aGlzLl9wcmV2VGFpbC5jb3B5KHRoaXMuX2N1cnJlbnRUYWlsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIHN0YXRlIG9mIHRoaXMgYm9uZS5cbiAgICogWW91IG1pZ2h0IHdhbnQgdG8gY2FsbCBbW1ZSTVNwcmluZ0JvbmVNYW5hZ2VyLnVwZGF0ZV1dIGluc3RlYWQuXG4gICAqXG4gICAqIEBwYXJhbSBkZWx0YSBkZWx0YVRpbWVcbiAgICovXG4gIHB1YmxpYyB1cGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChkZWx0YSA8PSAwKSByZXR1cm47XG5cbiAgICAvLyBVcGRhdGUgdGhlIF93b3JsZFNwYWNlQm9uZUxlbmd0aFxuICAgIHRoaXMuX2NhbGNXb3JsZFNwYWNlQm9uZUxlbmd0aCgpO1xuXG4gICAgLy8gR2V0IGJvbmVBeGlzIGluIHdvcmxkIHNwYWNlXG4gICAgY29uc3Qgd29ybGRTcGFjZUJvbmVBeGlzID0gX3YzQlxuICAgICAgLmNvcHkodGhpcy5fYm9uZUF4aXMpXG4gICAgICAudHJhbnNmb3JtRGlyZWN0aW9uKHRoaXMuX2luaXRpYWxMb2NhbE1hdHJpeClcbiAgICAgIC50cmFuc2Zvcm1EaXJlY3Rpb24odGhpcy5fcGFyZW50TWF0cml4V29ybGQpO1xuXG4gICAgLy8gdmVybGV0XHU3QTREXHU1MjA2XHUzMDY3XHU2QjIxXHUzMDZFXHU0RjREXHU3RjZFXHUzMDkyXHU4QTA4XHU3Qjk3XG4gICAgX25leHRUYWlsXG4gICAgICAvLyBEZXRlcm1pbmUgaW5lcnRpYSBpbiBjZW50ZXIgc3BhY2VcbiAgICAgIC5jb3B5KHRoaXMuX2N1cnJlbnRUYWlsKVxuICAgICAgLmFkZChfdjNBLnN1YlZlY3RvcnModGhpcy5fY3VycmVudFRhaWwsIHRoaXMuX3ByZXZUYWlsKS5tdWx0aXBseVNjYWxhcigxIC0gdGhpcy5zZXR0aW5ncy5kcmFnRm9yY2UpKSAvLyBcdTUyNERcdTMwRDVcdTMwRUNcdTMwRkNcdTMwRTBcdTMwNkVcdTc5RkJcdTUyRDVcdTMwOTJcdTdEOTlcdTdEOUFcdTMwNTlcdTMwOEIoXHU2RTFCXHU4ODcwXHUzMDgyXHUzMDQyXHUzMDhCXHUzMDg4KVxuICAgICAgLy8gQ29udmVydCBjZW50ZXIgc3BhY2UgdG8gd29ybGQgc3BhY2VcbiAgICAgIC5hcHBseU1hdHJpeDQodGhpcy5fZ2V0TWF0cml4Q2VudGVyVG9Xb3JsZCgpKSAvLyB0YWlsXHUzMDkyd29ybGQgc3BhY2VcdTMwNkJcdTYyM0JcdTMwNTlcbiAgICAgIC8vIEFwcGx5IHN0aWZmbmVzcyBhbmQgZ3Jhdml0eSBpbiB3b3JsZCBzcGFjZVxuICAgICAgLmFkZFNjYWxlZFZlY3Rvcih3b3JsZFNwYWNlQm9uZUF4aXMsIHRoaXMuc2V0dGluZ3Muc3RpZmZuZXNzICogZGVsdGEpIC8vIFx1ODlBQVx1MzA2RVx1NTZERVx1OEVFMlx1MzA2Qlx1MzA4OFx1MzA4Qlx1NUI1MFx1MzBEQ1x1MzBGQ1x1MzBGM1x1MzA2RVx1NzlGQlx1NTJENVx1NzZFRVx1NkExOVxuICAgICAgLmFkZFNjYWxlZFZlY3Rvcih0aGlzLnNldHRpbmdzLmdyYXZpdHlEaXIsIHRoaXMuc2V0dGluZ3MuZ3Jhdml0eVBvd2VyICogZGVsdGEpOyAvLyBcdTU5MTZcdTUyOUJcdTMwNkJcdTMwODhcdTMwOEJcdTc5RkJcdTUyRDVcdTkxQ0ZcblxuICAgIC8vIG5vcm1hbGl6ZSBib25lIGxlbmd0aFxuICAgIF93b3JsZFNwYWNlUG9zaXRpb24uc2V0RnJvbU1hdHJpeFBvc2l0aW9uKHRoaXMuYm9uZS5tYXRyaXhXb3JsZCk7XG4gICAgX25leHRUYWlsLnN1Yihfd29ybGRTcGFjZVBvc2l0aW9uKS5ub3JtYWxpemUoKS5tdWx0aXBseVNjYWxhcih0aGlzLl93b3JsZFNwYWNlQm9uZUxlbmd0aCkuYWRkKF93b3JsZFNwYWNlUG9zaXRpb24pO1xuXG4gICAgLy8gQ29sbGlzaW9uXHUzMDY3XHU3OUZCXHU1MkQ1XG4gICAgdGhpcy5fY29sbGlzaW9uKF9uZXh0VGFpbCk7XG5cbiAgICAvLyB1cGRhdGUgcHJldlRhaWwgYW5kIGN1cnJlbnRUYWlsXG4gICAgdGhpcy5fcHJldlRhaWwuY29weSh0aGlzLl9jdXJyZW50VGFpbCk7XG4gICAgdGhpcy5fY3VycmVudFRhaWwuY29weShfbmV4dFRhaWwpLmFwcGx5TWF0cml4NCh0aGlzLl9nZXRNYXRyaXhXb3JsZFRvQ2VudGVyKCkpO1xuXG4gICAgLy8gQXBwbHkgcm90YXRpb24sIGNvbnZlcnQgdmVjdG9yMyB0aGluZyBpbnRvIGFjdHVhbCBxdWF0ZXJuaW9uXG4gICAgLy8gT3JpZ2luYWwgVW5pVlJNIGlzIGRvaW5nIGNlbnRlciB1bml0IGNhbGN1bHVzIGF0IGhlcmUgYnV0IHdlJ3JlIGdvbm5hIGRvIHRoaXMgb24gbG9jYWwgdW5pdFxuICAgIGNvbnN0IHdvcmxkU3BhY2VJbml0aWFsTWF0cml4SW52ID0gX21hdEFcbiAgICAgIC5tdWx0aXBseU1hdHJpY2VzKHRoaXMuX3BhcmVudE1hdHJpeFdvcmxkLCB0aGlzLl9pbml0aWFsTG9jYWxNYXRyaXgpXG4gICAgICAuaW52ZXJ0KCk7XG4gICAgdGhpcy5ib25lLnF1YXRlcm5pb25cbiAgICAgIC5zZXRGcm9tVW5pdFZlY3RvcnModGhpcy5fYm9uZUF4aXMsIF92M0EuY29weShfbmV4dFRhaWwpLmFwcGx5TWF0cml4NCh3b3JsZFNwYWNlSW5pdGlhbE1hdHJpeEludikubm9ybWFsaXplKCkpXG4gICAgICAucHJlbXVsdGlwbHkodGhpcy5faW5pdGlhbExvY2FsUm90YXRpb24pO1xuXG4gICAgLy8gV2UgbmVlZCB0byB1cGRhdGUgaXRzIG1hdHJpeFdvcmxkIG1hbnVhbGx5LCBzaW5jZSB3ZSB0d2Vha2VkIHRoZSBib25lIGJ5IG91ciBoYW5kXG4gICAgdGhpcy5ib25lLnVwZGF0ZU1hdHJpeCgpO1xuICAgIHRoaXMuYm9uZS5tYXRyaXhXb3JsZC5tdWx0aXBseU1hdHJpY2VzKHRoaXMuX3BhcmVudE1hdHJpeFdvcmxkLCB0aGlzLmJvbmUubWF0cml4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEbyBjb2xsaXNpb24gbWF0aCBhZ2FpbnN0IGV2ZXJ5IGNvbGxpZGVycyBhdHRhY2hlZCB0byB0aGlzIGJvbmUuXG4gICAqXG4gICAqIEBwYXJhbSB0YWlsIFRoZSB0YWlsIHlvdSB3YW50IHRvIHByb2Nlc3NcbiAgICovXG4gIHByaXZhdGUgX2NvbGxpc2lvbih0YWlsOiBUSFJFRS5WZWN0b3IzKTogdm9pZCB7XG4gICAgZm9yIChsZXQgY2cgPSAwOyBjZyA8IHRoaXMuY29sbGlkZXJHcm91cHMubGVuZ3RoOyBjZysrKSB7XG4gICAgICBmb3IgKGxldCBjID0gMDsgYyA8IHRoaXMuY29sbGlkZXJHcm91cHNbY2ddLmNvbGxpZGVycy5sZW5ndGg7IGMrKykge1xuICAgICAgICBjb25zdCBjb2xsaWRlciA9IHRoaXMuY29sbGlkZXJHcm91cHNbY2ddLmNvbGxpZGVyc1tjXTtcbiAgICAgICAgY29uc3QgZGlzdCA9IGNvbGxpZGVyLnNoYXBlLmNhbGN1bGF0ZUNvbGxpc2lvbihjb2xsaWRlci5jb2xsaWRlck1hdHJpeCwgdGFpbCwgdGhpcy5zZXR0aW5ncy5oaXRSYWRpdXMsIF92M0EpO1xuXG4gICAgICAgIGlmIChkaXN0IDwgMC4wKSB7XG4gICAgICAgICAgLy8gaGl0XG4gICAgICAgICAgdGFpbC5hZGRTY2FsZWRWZWN0b3IoX3YzQSwgLWRpc3QpO1xuXG4gICAgICAgICAgLy8gbm9ybWFsaXplIGJvbmUgbGVuZ3RoXG4gICAgICAgICAgdGFpbC5zdWIoX3dvcmxkU3BhY2VQb3NpdGlvbik7XG4gICAgICAgICAgY29uc3QgbGVuZ3RoID0gdGFpbC5sZW5ndGgoKTtcbiAgICAgICAgICB0YWlsLm11bHRpcGx5U2NhbGFyKHRoaXMuX3dvcmxkU3BhY2VCb25lTGVuZ3RoIC8gbGVuZ3RoKS5hZGQoX3dvcmxkU3BhY2VQb3NpdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlIHRoZSB7QGxpbmsgX3dvcmxkU3BhY2VCb25lTGVuZ3RofS5cbiAgICogSW50ZW5kZWQgdG8gYmUgdXNlZCBpbiB7QGxpbmsgdXBkYXRlfS5cbiAgICovXG4gIHByaXZhdGUgX2NhbGNXb3JsZFNwYWNlQm9uZUxlbmd0aCgpOiB2b2lkIHtcbiAgICBfdjNBLnNldEZyb21NYXRyaXhQb3NpdGlvbih0aGlzLmJvbmUubWF0cml4V29ybGQpOyAvLyBnZXQgd29ybGQgcG9zaXRpb24gb2YgdGhpcy5ib25lXG5cbiAgICBpZiAodGhpcy5jaGlsZCkge1xuICAgICAgX3YzQi5zZXRGcm9tTWF0cml4UG9zaXRpb24odGhpcy5jaGlsZC5tYXRyaXhXb3JsZCk7IC8vIGdldCB3b3JsZCBwb3NpdGlvbiBvZiB0aGlzLmNoaWxkXG4gICAgfSBlbHNlIHtcbiAgICAgIF92M0IuY29weSh0aGlzLl9pbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uKTtcbiAgICAgIF92M0IuYXBwbHlNYXRyaXg0KHRoaXMuYm9uZS5tYXRyaXhXb3JsZCk7XG4gICAgfVxuXG4gICAgdGhpcy5fd29ybGRTcGFjZUJvbmVMZW5ndGggPSBfdjNBLnN1YihfdjNCKS5sZW5ndGgoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBtYXRyaXggdGhhdCBjb252ZXJ0cyBjZW50ZXIgc3BhY2UgaW50byB3b3JsZCBzcGFjZS5cbiAgICovXG4gIHByaXZhdGUgX2dldE1hdHJpeENlbnRlclRvV29ybGQoKTogVEhSRUUuTWF0cml4NCB7XG4gICAgcmV0dXJuIHRoaXMuX2NlbnRlciA/IHRoaXMuX2NlbnRlci5tYXRyaXhXb3JsZCA6IElERU5USVRZX01BVFJJWDQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbWF0cml4IHRoYXQgY29udmVydHMgd29ybGQgc3BhY2UgaW50byBjZW50ZXIgc3BhY2UuXG4gICAqL1xuICBwcml2YXRlIF9nZXRNYXRyaXhXb3JsZFRvQ2VudGVyKCk6IFRIUkVFLk1hdHJpeDQge1xuICAgIHJldHVybiB0aGlzLl9jZW50ZXIgPyAodGhpcy5fY2VudGVyLnVzZXJEYXRhLmludmVyc2VDYWNoZVByb3h5IGFzIE1hdHJpeDRJbnZlcnNlQ2FjaGUpLmludmVyc2UgOiBJREVOVElUWV9NQVRSSVg0O1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgbWF0NEludmVydENvbXBhdCB9IGZyb20gJy4vbWF0NEludmVydENvbXBhdCc7XG5cbmV4cG9ydCBjbGFzcyBNYXRyaXg0SW52ZXJzZUNhY2hlIHtcbiAgLyoqXG4gICAqIFRoZSB0YXJnZXQgbWF0cml4LlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IG1hdHJpeDogVEhSRUUuTWF0cml4NDtcblxuICAvKipcbiAgICogQSBjYWNoZSBvZiBpbnZlcnNlIG9mIGN1cnJlbnQgbWF0cml4LlxuICAgKi9cbiAgcHJpdmF0ZSByZWFkb25seSBfaW52ZXJzZUNhY2hlID0gbmV3IFRIUkVFLk1hdHJpeDQoKTtcblxuICAvKipcbiAgICogQSBmbGFnIHRoYXQgbWFrZXMgaXQgd2FudCB0byByZWNhbGN1bGF0ZSBpdHMge0BsaW5rIF9pbnZlcnNlQ2FjaGV9LlxuICAgKiBXaWxsIGJlIHNldCBgdHJ1ZWAgd2hlbiBgZWxlbWVudHNgIGFyZSBtdXRhdGVkIGFuZCBiZSB1c2VkIGluIGBnZXRJbnZlcnNlYC5cbiAgICovXG4gIHByaXZhdGUgX3Nob3VsZFVwZGF0ZUludmVyc2UgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBUaGUgb3JpZ2luYWwgb2YgYG1hdHJpeC5lbGVtZW50c2BcbiAgICovXG4gIHByaXZhdGUgcmVhZG9ubHkgX29yaWdpbmFsRWxlbWVudHM6IFRIUkVFLk1hdHJpeDRUdXBsZTtcblxuICAvKipcbiAgICogSW52ZXJzZSBvZiBnaXZlbiBtYXRyaXguXG4gICAqIE5vdGUgdGhhdCBpdCB3aWxsIHJldHVybiBpdHMgaW50ZXJuYWwgcHJpdmF0ZSBpbnN0YW5jZS5cbiAgICogTWFrZSBzdXJlIGNvcHlpbmcgdGhpcyBiZWZvcmUgbXV0YXRlIHRoaXMuXG4gICAqL1xuICBwdWJsaWMgZ2V0IGludmVyc2UoKTogVEhSRUUuTWF0cml4NCB7XG4gICAgaWYgKHRoaXMuX3Nob3VsZFVwZGF0ZUludmVyc2UpIHtcbiAgICAgIG1hdDRJbnZlcnRDb21wYXQodGhpcy5faW52ZXJzZUNhY2hlLmNvcHkodGhpcy5tYXRyaXgpKTtcbiAgICAgIHRoaXMuX3Nob3VsZFVwZGF0ZUludmVyc2UgPSBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5faW52ZXJzZUNhY2hlO1xuICB9XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKG1hdHJpeDogVEhSRUUuTWF0cml4NCkge1xuICAgIHRoaXMubWF0cml4ID0gbWF0cml4O1xuXG4gICAgY29uc3QgaGFuZGxlcjogUHJveHlIYW5kbGVyPG51bWJlcltdPiA9IHtcbiAgICAgIHNldDogKG9iaiwgcHJvcDogYW55LCBuZXdWYWwpID0+IHtcbiAgICAgICAgdGhpcy5fc2hvdWxkVXBkYXRlSW52ZXJzZSA9IHRydWU7XG4gICAgICAgIG9ialtwcm9wXSA9IG5ld1ZhbDtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIHRoaXMuX29yaWdpbmFsRWxlbWVudHMgPSBtYXRyaXguZWxlbWVudHM7XG4gICAgbWF0cml4LmVsZW1lbnRzID0gbmV3IFByb3h5PFRIUkVFLk1hdHJpeDRUdXBsZT4obWF0cml4LmVsZW1lbnRzLCBoYW5kbGVyKTtcbiAgfVxuXG4gIHB1YmxpYyByZXZlcnQoKTogdm9pZCB7XG4gICAgdGhpcy5tYXRyaXguZWxlbWVudHMgPSB0aGlzLl9vcmlnaW5hbEVsZW1lbnRzO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG5jb25zdCBfbWF0QSA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG5cbi8qKlxuICogQSBjb21wYXQgZnVuY3Rpb24gZm9yIGBNYXRyaXg0LmludmVydCgpYCAvIGBNYXRyaXg0LmdldEludmVyc2UoKWAuXG4gKiBgTWF0cml4NC5pbnZlcnQoKWAgaXMgaW50cm9kdWNlZCBpbiByMTIzIGFuZCBgTWF0cml4NC5nZXRJbnZlcnNlKClgIGVtaXRzIGEgd2FybmluZy5cbiAqIFdlIGFyZSBnb2luZyB0byB1c2UgdGhpcyBjb21wYXQgZm9yIGEgd2hpbGUuXG4gKiBAcGFyYW0gdGFyZ2V0IEEgdGFyZ2V0IG1hdHJpeFxuICovXG5leHBvcnQgZnVuY3Rpb24gbWF0NEludmVydENvbXBhdDxUIGV4dGVuZHMgVEhSRUUuTWF0cml4ND4odGFyZ2V0OiBUKTogVCB7XG4gIGlmICgodGFyZ2V0IGFzIGFueSkuaW52ZXJ0KSB7XG4gICAgdGFyZ2V0LmludmVydCgpO1xuICB9IGVsc2Uge1xuICAgICh0YXJnZXQgYXMgYW55KS5nZXRJbnZlcnNlKF9tYXRBLmNvcHkodGFyZ2V0KSk7XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuIiwgImltcG9ydCB0eXBlICogYXMgVjBWUk0gZnJvbSAnQHBpeGl2L3R5cGVzLXZybS0wLjAnO1xuaW1wb3J0IHR5cGUgKiBhcyBWMVNwcmluZ0JvbmVTY2hlbWEgZnJvbSAnQHBpeGl2L3R5cGVzLXZybWMtc3ByaW5nYm9uZS0xLjAnO1xuaW1wb3J0IHR5cGUgKiBhcyBTcHJpbmdCb25lRXh0ZW5kZWRDb2xsaWRlclNjaGVtYSBmcm9tICdAcGl4aXYvdHlwZXMtdnJtYy1zcHJpbmdib25lLWV4dGVuZGVkLWNvbGxpZGVyLTEuMCc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgdHlwZSB7IEdMVEYsIEdMVEZMb2FkZXJQbHVnaW4sIEdMVEZQYXJzZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyLmpzJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlckhlbHBlciwgVlJNU3ByaW5nQm9uZUpvaW50SGVscGVyIH0gZnJvbSAnLi9oZWxwZXJzJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlciB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyJztcbmltcG9ydCB0eXBlIHsgVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXAgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlQ2Fwc3VsZSB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVDYXBzdWxlJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlU3BoZXJlIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZVNwaGVyZSc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lSm9pbnQgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVKb2ludCc7XG5pbXBvcnQgdHlwZSB7IFZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW5PcHRpb25zIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lTG9hZGVyUGx1Z2luT3B0aW9ucyc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lTWFuYWdlciB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZU1hbmFnZXInO1xuaW1wb3J0IHR5cGUgeyBWUk1TcHJpbmdCb25lSm9pbnRTZXR0aW5ncyB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUpvaW50U2V0dGluZ3MnO1xuaW1wb3J0IHsgR0xURiBhcyBHTFRGU2NoZW1hIH0gZnJvbSAnQGdsdGYtdHJhbnNmb3JtL2NvcmUnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVQbGFuZSB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVQbGFuZSc7XG5cbmNvbnN0IEVYVEVOU0lPTl9OQU1FX0VYVEVOREVEX0NPTExJREVSID0gJ1ZSTUNfc3ByaW5nQm9uZV9leHRlbmRlZF9jb2xsaWRlcic7XG5cbi8qKlxuICogUG9zc2libGUgc3BlYyB2ZXJzaW9ucyBpdCByZWNvZ25pemVzLlxuICovXG5jb25zdCBQT1NTSUJMRV9TUEVDX1ZFUlNJT05TID0gbmV3IFNldChbJzEuMCcsICcxLjAtYmV0YSddKTtcblxuLyoqXG4gKiBQb3NzaWJsZSBzcGVjIHZlcnNpb25zIG9mIGBWUk1DX3NwcmluZ0JvbmVfZXh0ZW5kZWRfY29sbGlkZXJgIGl0IHJlY29nbml6ZXMuXG4gKi9cbmNvbnN0IFBPU1NJQkxFX1NQRUNfVkVSU0lPTlNfRVhURU5ERURfQ09MTElERVJTID0gbmV3IFNldChbJzEuMCddKTtcblxuZXhwb3J0IGNsYXNzIFZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW4gaW1wbGVtZW50cyBHTFRGTG9hZGVyUGx1Z2luIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBFWFRFTlNJT05fTkFNRSA9ICdWUk1DX3NwcmluZ0JvbmUnO1xuXG4gIC8qKlxuICAgKiBTcGVjaWZ5IGFuIE9iamVjdDNEIHRvIGFkZCB7QGxpbmsgVlJNU3ByaW5nQm9uZUpvaW50SGVscGVyfSBzLlxuICAgKiBJZiBub3Qgc3BlY2lmaWVkLCBoZWxwZXIgd2lsbCBub3QgYmUgY3JlYXRlZC5cbiAgICogSWYgYHJlbmRlck9yZGVyYCBpcyBzZXQgdG8gdGhlIHJvb3QsIGhlbHBlcnMgd2lsbCBjb3B5IHRoZSBzYW1lIGByZW5kZXJPcmRlcmAgLlxuICAgKi9cbiAgcHVibGljIGpvaW50SGVscGVyUm9vdD86IFRIUkVFLk9iamVjdDNEO1xuXG4gIC8qKlxuICAgKiBTcGVjaWZ5IGFuIE9iamVjdDNEIHRvIGFkZCB7QGxpbmsgVlJNU3ByaW5nQm9uZUpvaW50SGVscGVyfSBzLlxuICAgKiBJZiBub3Qgc3BlY2lmaWVkLCBoZWxwZXIgd2lsbCBub3QgYmUgY3JlYXRlZC5cbiAgICogSWYgYHJlbmRlck9yZGVyYCBpcyBzZXQgdG8gdGhlIHJvb3QsIGhlbHBlcnMgd2lsbCBjb3B5IHRoZSBzYW1lIGByZW5kZXJPcmRlcmAgLlxuICAgKi9cbiAgcHVibGljIGNvbGxpZGVySGVscGVyUm9vdD86IFRIUkVFLk9iamVjdDNEO1xuXG4gIC8qKlxuICAgKiBJZiB0cnVlLCBsb2FkIGNvbGxpZGVycyBkZWZpbmVkIGluIGBWUk1DX3NwcmluZ0JvbmVfZXh0ZW5kZWRfY29sbGlkZXJgLlxuICAgKiBTZXQgdG8gYGZhbHNlYCB0byBkaXNhYmxlIGxvYWRpbmcgZXh0ZW5kZWQgY29sbGlkZXJzIGFuZCB1c2UgdGhlIGZhbGxiYWNrIGJlaGF2aW9yLlxuICAgKiBgdHJ1ZWAgYnkgZGVmYXVsdC5cbiAgICovXG4gIHB1YmxpYyB1c2VFeHRlbmRlZENvbGxpZGVyczogYm9vbGVhbjtcblxuICBwdWJsaWMgcmVhZG9ubHkgcGFyc2VyOiBHTFRGUGFyc2VyO1xuXG4gIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBWUk1TcHJpbmdCb25lTG9hZGVyUGx1Z2luLkVYVEVOU0lPTl9OQU1FO1xuICB9XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBhcnNlcjogR0xURlBhcnNlciwgb3B0aW9ucz86IFZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW5PcHRpb25zKSB7XG4gICAgdGhpcy5wYXJzZXIgPSBwYXJzZXI7XG5cbiAgICB0aGlzLmpvaW50SGVscGVyUm9vdCA9IG9wdGlvbnM/LmpvaW50SGVscGVyUm9vdDtcbiAgICB0aGlzLmNvbGxpZGVySGVscGVyUm9vdCA9IG9wdGlvbnM/LmNvbGxpZGVySGVscGVyUm9vdDtcbiAgICB0aGlzLnVzZUV4dGVuZGVkQ29sbGlkZXJzID0gb3B0aW9ucz8udXNlRXh0ZW5kZWRDb2xsaWRlcnMgPz8gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBhZnRlclJvb3QoZ2x0ZjogR0xURik6IFByb21pc2U8dm9pZD4ge1xuICAgIGdsdGYudXNlckRhdGEudnJtU3ByaW5nQm9uZU1hbmFnZXIgPSBhd2FpdCB0aGlzLl9pbXBvcnQoZ2x0Zik7XG4gIH1cblxuICAvKipcbiAgICogSW1wb3J0IHNwcmluZyBib25lcyBmcm9tIGEgR0xURiBhbmQgcmV0dXJuIGEge0BsaW5rIFZSTVNwcmluZ0JvbmVNYW5hZ2VyfS5cbiAgICogSXQgbWlnaHQgcmV0dXJuIGBudWxsYCBpbnN0ZWFkIHdoZW4gaXQgZG9lcyBub3QgbmVlZCB0byBiZSBjcmVhdGVkIG9yIHNvbWV0aGluZyBnbyB3cm9uZy5cbiAgICpcbiAgICogQHBhcmFtIGdsdGYgQSBwYXJzZWQgcmVzdWx0IG9mIEdMVEYgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gICAqL1xuICBwcml2YXRlIGFzeW5jIF9pbXBvcnQoZ2x0ZjogR0xURik6IFByb21pc2U8VlJNU3ByaW5nQm9uZU1hbmFnZXIgfCBudWxsPiB7XG4gICAgY29uc3QgdjFSZXN1bHQgPSBhd2FpdCB0aGlzLl92MUltcG9ydChnbHRmKTtcbiAgICBpZiAodjFSZXN1bHQgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHYxUmVzdWx0O1xuICAgIH1cblxuICAgIGNvbnN0IHYwUmVzdWx0ID0gYXdhaXQgdGhpcy5fdjBJbXBvcnQoZ2x0Zik7XG4gICAgaWYgKHYwUmVzdWx0ICE9IG51bGwpIHtcbiAgICAgIHJldHVybiB2MFJlc3VsdDtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX3YxSW1wb3J0KGdsdGY6IEdMVEYpOiBQcm9taXNlPFZSTVNwcmluZ0JvbmVNYW5hZ2VyIHwgbnVsbD4ge1xuICAgIGNvbnN0IGpzb24gPSBnbHRmLnBhcnNlci5qc29uIGFzIEdMVEZTY2hlbWEuSUdMVEY7XG5cbiAgICAvLyBlYXJseSBhYm9ydCBpZiBpdCBkb2Vzbid0IHVzZSBzcHJpbmcgYm9uZXNcbiAgICBjb25zdCBpc1NwcmluZ0JvbmVVc2VkID0ganNvbi5leHRlbnNpb25zVXNlZD8uaW5kZXhPZihWUk1TcHJpbmdCb25lTG9hZGVyUGx1Z2luLkVYVEVOU0lPTl9OQU1FKSAhPT0gLTE7XG4gICAgaWYgKCFpc1NwcmluZ0JvbmVVc2VkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBtYW5hZ2VyID0gbmV3IFZSTVNwcmluZ0JvbmVNYW5hZ2VyKCk7XG5cbiAgICBjb25zdCB0aHJlZU5vZGVzOiBUSFJFRS5PYmplY3QzRFtdID0gYXdhaXQgZ2x0Zi5wYXJzZXIuZ2V0RGVwZW5kZW5jaWVzKCdub2RlJyk7XG5cbiAgICBjb25zdCBleHRlbnNpb24gPSBqc29uLmV4dGVuc2lvbnM/LltWUk1TcHJpbmdCb25lTG9hZGVyUGx1Z2luLkVYVEVOU0lPTl9OQU1FXSBhc1xuICAgICAgfCBWMVNwcmluZ0JvbmVTY2hlbWEuVlJNQ1NwcmluZ0JvbmVcbiAgICAgIHwgdW5kZWZpbmVkO1xuICAgIGlmICghZXh0ZW5zaW9uKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzcGVjVmVyc2lvbiA9IGV4dGVuc2lvbi5zcGVjVmVyc2lvbjtcbiAgICBpZiAoIVBPU1NJQkxFX1NQRUNfVkVSU0lPTlMuaGFzKHNwZWNWZXJzaW9uKSkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBgVlJNU3ByaW5nQm9uZUxvYWRlclBsdWdpbjogVW5rbm93biAke1ZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW4uRVhURU5TSU9OX05BTUV9IHNwZWNWZXJzaW9uIFwiJHtzcGVjVmVyc2lvbn1cImAsXG4gICAgICApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgY29sbGlkZXJzID0gZXh0ZW5zaW9uLmNvbGxpZGVycz8ubWFwKChzY2hlbWFDb2xsaWRlciwgaUNvbGxpZGVyKSA9PiB7XG4gICAgICBjb25zdCBub2RlID0gdGhyZWVOb2Rlc1tzY2hlbWFDb2xsaWRlci5ub2RlIV07XG5cbiAgICAgIC8vIFNvbWUgbW9kZWxzIHB1dCBgLTFgIHRvIHRoZSBub2RlIGluZGV4IG9mIGNvbGxpZGVyc1xuICAgICAgaWYgKG5vZGUgPT0gbnVsbCkge1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgYFZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW46IFRoZSBjb2xsaWRlciAjJHtpQ29sbGlkZXJ9IGF0dGVtcHRlZCB0byB1c2UgdGhlIG5vZGUgIyR7c2NoZW1hQ29sbGlkZXIubm9kZX0gYnV0IG5vdCBmb3VuZGAsXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzY2hlbWFTaGFwZSA9IHNjaGVtYUNvbGxpZGVyLnNoYXBlITtcblxuICAgICAgLy8gVE9ETzogc2VwYXJhdGUgaW50byBzZXZlcmFsIGZ1bmN0aW9uc1xuXG4gICAgICBjb25zdCBzY2hlbWFFeENvbGxpZGVyOiBTcHJpbmdCb25lRXh0ZW5kZWRDb2xsaWRlclNjaGVtYS5WUk1DU3ByaW5nQm9uZUV4dGVuZGVkQ29sbGlkZXIgfCB1bmRlZmluZWQgPVxuICAgICAgICBzY2hlbWFDb2xsaWRlci5leHRlbnNpb25zPy5bRVhURU5TSU9OX05BTUVfRVhURU5ERURfQ09MTElERVJdO1xuXG4gICAgICBpZiAodGhpcy51c2VFeHRlbmRlZENvbGxpZGVycyAmJiBzY2hlbWFFeENvbGxpZGVyICE9IG51bGwpIHtcbiAgICAgICAgY29uc3Qgc3BlY1ZlcnNpb25FeENvbGxpZGVyID0gc2NoZW1hRXhDb2xsaWRlci5zcGVjVmVyc2lvbjtcbiAgICAgICAgaWYgKCFQT1NTSUJMRV9TUEVDX1ZFUlNJT05TX0VYVEVOREVEX0NPTExJREVSUy5oYXMoc3BlY1ZlcnNpb25FeENvbGxpZGVyKSkge1xuICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgIGBWUk1TcHJpbmdCb25lTG9hZGVyUGx1Z2luOiBVbmtub3duICR7RVhURU5TSU9OX05BTUVfRVhURU5ERURfQ09MTElERVJ9IHNwZWNWZXJzaW9uIFwiJHtzcGVjVmVyc2lvbkV4Q29sbGlkZXJ9XCIuIEZhbGxiYWNraW5nIHRvIHRoZSAke1ZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW4uRVhURU5TSU9OX05BTUV9IGRlZmluaXRpb25gLFxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3Qgc2NoZW1hRXhTaGFwZSA9IHNjaGVtYUV4Q29sbGlkZXIuc2hhcGUhO1xuICAgICAgICAgIGlmIChzY2hlbWFFeFNoYXBlLnNwaGVyZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2ltcG9ydFNwaGVyZUNvbGxpZGVyKG5vZGUsIHtcbiAgICAgICAgICAgICAgb2Zmc2V0OiBuZXcgVEhSRUUuVmVjdG9yMygpLmZyb21BcnJheShzY2hlbWFFeFNoYXBlLnNwaGVyZS5vZmZzZXQgPz8gWzAuMCwgMC4wLCAwLjBdKSxcbiAgICAgICAgICAgICAgcmFkaXVzOiBzY2hlbWFFeFNoYXBlLnNwaGVyZS5yYWRpdXMgPz8gMC4wLFxuICAgICAgICAgICAgICBpbnNpZGU6IHNjaGVtYUV4U2hhcGUuc3BoZXJlLmluc2lkZSA/PyBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc2NoZW1hRXhTaGFwZS5jYXBzdWxlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faW1wb3J0Q2Fwc3VsZUNvbGxpZGVyKG5vZGUsIHtcbiAgICAgICAgICAgICAgb2Zmc2V0OiBuZXcgVEhSRUUuVmVjdG9yMygpLmZyb21BcnJheShzY2hlbWFFeFNoYXBlLmNhcHN1bGUub2Zmc2V0ID8/IFswLjAsIDAuMCwgMC4wXSksXG4gICAgICAgICAgICAgIHJhZGl1czogc2NoZW1hRXhTaGFwZS5jYXBzdWxlLnJhZGl1cyA/PyAwLjAsXG4gICAgICAgICAgICAgIHRhaWw6IG5ldyBUSFJFRS5WZWN0b3IzKCkuZnJvbUFycmF5KHNjaGVtYUV4U2hhcGUuY2Fwc3VsZS50YWlsID8/IFswLjAsIDAuMCwgMC4wXSksXG4gICAgICAgICAgICAgIGluc2lkZTogc2NoZW1hRXhTaGFwZS5jYXBzdWxlLmluc2lkZSA/PyBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc2NoZW1hRXhTaGFwZS5wbGFuZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2ltcG9ydFBsYW5lQ29sbGlkZXIobm9kZSwge1xuICAgICAgICAgICAgICBvZmZzZXQ6IG5ldyBUSFJFRS5WZWN0b3IzKCkuZnJvbUFycmF5KHNjaGVtYUV4U2hhcGUucGxhbmUub2Zmc2V0ID8/IFswLjAsIDAuMCwgMC4wXSksXG4gICAgICAgICAgICAgIG5vcm1hbDogbmV3IFRIUkVFLlZlY3RvcjMoKS5mcm9tQXJyYXkoc2NoZW1hRXhTaGFwZS5wbGFuZS5ub3JtYWwgPz8gWzAuMCwgMC4wLCAxLjBdKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc2NoZW1hU2hhcGUuc3BoZXJlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbXBvcnRTcGhlcmVDb2xsaWRlcihub2RlLCB7XG4gICAgICAgICAgb2Zmc2V0OiBuZXcgVEhSRUUuVmVjdG9yMygpLmZyb21BcnJheShzY2hlbWFTaGFwZS5zcGhlcmUub2Zmc2V0ID8/IFswLjAsIDAuMCwgMC4wXSksXG4gICAgICAgICAgcmFkaXVzOiBzY2hlbWFTaGFwZS5zcGhlcmUucmFkaXVzID8/IDAuMCxcbiAgICAgICAgICBpbnNpZGU6IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoc2NoZW1hU2hhcGUuY2Fwc3VsZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5faW1wb3J0Q2Fwc3VsZUNvbGxpZGVyKG5vZGUsIHtcbiAgICAgICAgICBvZmZzZXQ6IG5ldyBUSFJFRS5WZWN0b3IzKCkuZnJvbUFycmF5KHNjaGVtYVNoYXBlLmNhcHN1bGUub2Zmc2V0ID8/IFswLjAsIDAuMCwgMC4wXSksXG4gICAgICAgICAgcmFkaXVzOiBzY2hlbWFTaGFwZS5jYXBzdWxlLnJhZGl1cyA/PyAwLjAsXG4gICAgICAgICAgdGFpbDogbmV3IFRIUkVFLlZlY3RvcjMoKS5mcm9tQXJyYXkoc2NoZW1hU2hhcGUuY2Fwc3VsZS50YWlsID8/IFswLjAsIDAuMCwgMC4wXSksXG4gICAgICAgICAgaW5zaWRlOiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHRocm93IG5ldyBFcnJvcihgVlJNU3ByaW5nQm9uZUxvYWRlclBsdWdpbjogVGhlIGNvbGxpZGVyICMke2lDb2xsaWRlcn0gaGFzIG5vIHZhbGlkIHNoYXBlYCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBjb2xsaWRlckdyb3VwcyA9IGV4dGVuc2lvbi5jb2xsaWRlckdyb3Vwcz8ubWFwKFxuICAgICAgKHNjaGVtYUNvbGxpZGVyR3JvdXAsIGlDb2xsaWRlckdyb3VwKTogVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXAgPT4ge1xuICAgICAgICBjb25zdCBjb2xzID0gKHNjaGVtYUNvbGxpZGVyR3JvdXAuY29sbGlkZXJzID8/IFtdKS5mbGF0TWFwKChpQ29sbGlkZXIpID0+IHtcbiAgICAgICAgICBjb25zdCBjb2wgPSBjb2xsaWRlcnM/LltpQ29sbGlkZXJdO1xuXG4gICAgICAgICAgaWYgKGNvbCA9PSBudWxsKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICAgIGBWUk1TcHJpbmdCb25lTG9hZGVyUGx1Z2luOiBUaGUgY29sbGlkZXJHcm91cCAjJHtpQ29sbGlkZXJHcm91cH0gYXR0ZW1wdGVkIHRvIHVzZSBhIGNvbGxpZGVyICMke2lDb2xsaWRlcn0gYnV0IG5vdCBmb3VuZGAsXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBjb2w7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgY29sbGlkZXJzOiBjb2xzLFxuICAgICAgICAgIG5hbWU6IHNjaGVtYUNvbGxpZGVyR3JvdXAubmFtZSxcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgKTtcblxuICAgIGV4dGVuc2lvbi5zcHJpbmdzPy5mb3JFYWNoKChzY2hlbWFTcHJpbmcsIGlTcHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IHNjaGVtYUpvaW50cyA9IHNjaGVtYVNwcmluZy5qb2ludHM7XG5cbiAgICAgIC8vIHByZXBhcmUgY29sbGlkZXJzXG4gICAgICBjb25zdCBjb2xsaWRlckdyb3Vwc0ZvclNwcmluZyA9IHNjaGVtYVNwcmluZy5jb2xsaWRlckdyb3Vwcz8ubWFwKChpQ29sbGlkZXJHcm91cCkgPT4ge1xuICAgICAgICBjb25zdCBncm91cCA9IGNvbGxpZGVyR3JvdXBzPy5baUNvbGxpZGVyR3JvdXBdO1xuXG4gICAgICAgIGlmIChncm91cCA9PSBudWxsKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgYFZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW46IFRoZSBzcHJpbmcgIyR7aVNwcmluZ30gYXR0ZW1wdGVkIHRvIHVzZSBhIGNvbGxpZGVyR3JvdXAgJHtpQ29sbGlkZXJHcm91cH0gYnV0IG5vdCBmb3VuZGAsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBncm91cDtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBjZW50ZXIgPSBzY2hlbWFTcHJpbmcuY2VudGVyICE9IG51bGwgPyB0aHJlZU5vZGVzW3NjaGVtYVNwcmluZy5jZW50ZXJdIDogdW5kZWZpbmVkO1xuXG4gICAgICBsZXQgcHJldlNjaGVtYUpvaW50OiBWMVNwcmluZ0JvbmVTY2hlbWEuU3ByaW5nQm9uZUpvaW50IHwgdW5kZWZpbmVkO1xuICAgICAgc2NoZW1hSm9pbnRzLmZvckVhY2goKHNjaGVtYUpvaW50KSA9PiB7XG4gICAgICAgIGlmIChwcmV2U2NoZW1hSm9pbnQpIHtcbiAgICAgICAgICAvLyBwcmVwYXJlIG5vZGVcbiAgICAgICAgICBjb25zdCBub2RlSW5kZXggPSBwcmV2U2NoZW1hSm9pbnQubm9kZTtcbiAgICAgICAgICBjb25zdCBub2RlID0gdGhyZWVOb2Rlc1tub2RlSW5kZXhdO1xuICAgICAgICAgIGNvbnN0IGNoaWxkSW5kZXggPSBzY2hlbWFKb2ludC5ub2RlO1xuICAgICAgICAgIGNvbnN0IGNoaWxkID0gdGhyZWVOb2Rlc1tjaGlsZEluZGV4XTtcblxuICAgICAgICAgIC8vIHByZXBhcmUgc2V0dGluZ1xuICAgICAgICAgIGNvbnN0IHNldHRpbmc6IFBhcnRpYWw8VlJNU3ByaW5nQm9uZUpvaW50U2V0dGluZ3M+ID0ge1xuICAgICAgICAgICAgaGl0UmFkaXVzOiBwcmV2U2NoZW1hSm9pbnQuaGl0UmFkaXVzLFxuICAgICAgICAgICAgZHJhZ0ZvcmNlOiBwcmV2U2NoZW1hSm9pbnQuZHJhZ0ZvcmNlLFxuICAgICAgICAgICAgZ3Jhdml0eVBvd2VyOiBwcmV2U2NoZW1hSm9pbnQuZ3Jhdml0eVBvd2VyLFxuICAgICAgICAgICAgc3RpZmZuZXNzOiBwcmV2U2NoZW1hSm9pbnQuc3RpZmZuZXNzLFxuICAgICAgICAgICAgZ3Jhdml0eURpcjpcbiAgICAgICAgICAgICAgcHJldlNjaGVtYUpvaW50LmdyYXZpdHlEaXIgIT0gbnVsbFxuICAgICAgICAgICAgICAgID8gbmV3IFRIUkVFLlZlY3RvcjMoKS5mcm9tQXJyYXkocHJldlNjaGVtYUpvaW50LmdyYXZpdHlEaXIpXG4gICAgICAgICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIC8vIGNyZWF0ZSBzcHJpbmcgYm9uZXNcbiAgICAgICAgICBjb25zdCBqb2ludCA9IHRoaXMuX2ltcG9ydEpvaW50KG5vZGUsIGNoaWxkLCBzZXR0aW5nLCBjb2xsaWRlckdyb3Vwc0ZvclNwcmluZyk7XG4gICAgICAgICAgaWYgKGNlbnRlcikge1xuICAgICAgICAgICAgam9pbnQuY2VudGVyID0gY2VudGVyO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIG1hbmFnZXIuYWRkSm9pbnQoam9pbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJldlNjaGVtYUpvaW50ID0gc2NoZW1hSm9pbnQ7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIGluaXQgc3ByaW5nIGJvbmVzXG4gICAgbWFuYWdlci5zZXRJbml0U3RhdGUoKTtcblxuICAgIHJldHVybiBtYW5hZ2VyO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfdjBJbXBvcnQoZ2x0ZjogR0xURik6IFByb21pc2U8VlJNU3ByaW5nQm9uZU1hbmFnZXIgfCBudWxsPiB7XG4gICAgY29uc3QganNvbiA9IGdsdGYucGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAgIC8vIGVhcmx5IGFib3J0IGlmIGl0IGRvZXNuJ3QgdXNlIHZybVxuICAgIGNvbnN0IGlzVlJNVXNlZCA9IGpzb24uZXh0ZW5zaW9uc1VzZWQ/LmluZGV4T2YoJ1ZSTScpICE9PSAtMTtcbiAgICBpZiAoIWlzVlJNVXNlZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gZWFybHkgYWJvcnQgaWYgaXQgZG9lc24ndCBoYXZlIGJvbmUgZ3JvdXBzXG4gICAgY29uc3QgZXh0ZW5zaW9uID0ganNvbi5leHRlbnNpb25zPy5bJ1ZSTSddIGFzIFYwVlJNLlZSTSB8IHVuZGVmaW5lZDtcbiAgICBjb25zdCBzY2hlbWFTZWNvbmRhcnlBbmltYXRpb24gPSBleHRlbnNpb24/LnNlY29uZGFyeUFuaW1hdGlvbjtcbiAgICBpZiAoIXNjaGVtYVNlY29uZGFyeUFuaW1hdGlvbikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc2NoZW1hQm9uZUdyb3VwcyA9IHNjaGVtYVNlY29uZGFyeUFuaW1hdGlvbj8uYm9uZUdyb3VwcztcbiAgICBpZiAoIXNjaGVtYUJvbmVHcm91cHMpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IG1hbmFnZXIgPSBuZXcgVlJNU3ByaW5nQm9uZU1hbmFnZXIoKTtcblxuICAgIGNvbnN0IHRocmVlTm9kZXM6IFRIUkVFLk9iamVjdDNEW10gPSBhd2FpdCBnbHRmLnBhcnNlci5nZXREZXBlbmRlbmNpZXMoJ25vZGUnKTtcblxuICAgIGNvbnN0IGNvbGxpZGVyR3JvdXBzID0gc2NoZW1hU2Vjb25kYXJ5QW5pbWF0aW9uLmNvbGxpZGVyR3JvdXBzPy5tYXAoXG4gICAgICAoc2NoZW1hQ29sbGlkZXJHcm91cCk6IFZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwID0+IHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IHRocmVlTm9kZXNbc2NoZW1hQ29sbGlkZXJHcm91cC5ub2RlIV07XG4gICAgICAgIGNvbnN0IGNvbGxpZGVycyA9IChzY2hlbWFDb2xsaWRlckdyb3VwLmNvbGxpZGVycyA/PyBbXSkubWFwKChzY2hlbWFDb2xsaWRlciwgaUNvbGxpZGVyKSA9PiB7XG4gICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gbmV3IFRIUkVFLlZlY3RvcjMoMC4wLCAwLjAsIDAuMCk7XG4gICAgICAgICAgaWYgKHNjaGVtYUNvbGxpZGVyLm9mZnNldCkge1xuICAgICAgICAgICAgb2Zmc2V0LnNldChcbiAgICAgICAgICAgICAgc2NoZW1hQ29sbGlkZXIub2Zmc2V0LnggPz8gMC4wLFxuICAgICAgICAgICAgICBzY2hlbWFDb2xsaWRlci5vZmZzZXQueSA/PyAwLjAsXG4gICAgICAgICAgICAgIHNjaGVtYUNvbGxpZGVyLm9mZnNldC56ID8gLXNjaGVtYUNvbGxpZGVyLm9mZnNldC56IDogMC4wLCAvLyB6IGlzIG9wcG9zaXRlIGluIFZSTTAuMFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gdGhpcy5faW1wb3J0U3BoZXJlQ29sbGlkZXIobm9kZSwge1xuICAgICAgICAgICAgb2Zmc2V0LFxuICAgICAgICAgICAgcmFkaXVzOiBzY2hlbWFDb2xsaWRlci5yYWRpdXMgPz8gMC4wLFxuICAgICAgICAgICAgaW5zaWRlOiBmYWxzZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHsgY29sbGlkZXJzIH07XG4gICAgICB9LFxuICAgICk7XG5cbiAgICAvLyBpbXBvcnQgc3ByaW5nIGJvbmVzIGZvciBlYWNoIHNwcmluZyBib25lIGdyb3Vwc1xuICAgIHNjaGVtYUJvbmVHcm91cHM/LmZvckVhY2goKHNjaGVtYUJvbmVHcm91cCwgaUJvbmVHcm91cCkgPT4ge1xuICAgICAgY29uc3Qgcm9vdEluZGljZXMgPSBzY2hlbWFCb25lR3JvdXAuYm9uZXM7XG4gICAgICBpZiAoIXJvb3RJbmRpY2VzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcm9vdEluZGljZXMuZm9yRWFjaCgocm9vdEluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IHJvb3QgPSB0aHJlZU5vZGVzW3Jvb3RJbmRleF07XG5cbiAgICAgICAgLy8gcHJlcGFyZSBzZXR0aW5nXG4gICAgICAgIGNvbnN0IGdyYXZpdHlEaXIgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuICAgICAgICBpZiAoc2NoZW1hQm9uZUdyb3VwLmdyYXZpdHlEaXIpIHtcbiAgICAgICAgICBncmF2aXR5RGlyLnNldChcbiAgICAgICAgICAgIHNjaGVtYUJvbmVHcm91cC5ncmF2aXR5RGlyLnggPz8gMC4wLFxuICAgICAgICAgICAgc2NoZW1hQm9uZUdyb3VwLmdyYXZpdHlEaXIueSA/PyAwLjAsXG4gICAgICAgICAgICBzY2hlbWFCb25lR3JvdXAuZ3Jhdml0eURpci56ID8/IDAuMCxcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGdyYXZpdHlEaXIuc2V0KDAuMCwgLTEuMCwgMC4wKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNlbnRlciA9IHNjaGVtYUJvbmVHcm91cC5jZW50ZXIgIT0gbnVsbCA/IHRocmVlTm9kZXNbc2NoZW1hQm9uZUdyb3VwLmNlbnRlcl0gOiB1bmRlZmluZWQ7XG5cbiAgICAgICAgY29uc3Qgc2V0dGluZzogUGFydGlhbDxWUk1TcHJpbmdCb25lSm9pbnRTZXR0aW5ncz4gPSB7XG4gICAgICAgICAgaGl0UmFkaXVzOiBzY2hlbWFCb25lR3JvdXAuaGl0UmFkaXVzLFxuICAgICAgICAgIGRyYWdGb3JjZTogc2NoZW1hQm9uZUdyb3VwLmRyYWdGb3JjZSxcbiAgICAgICAgICBncmF2aXR5UG93ZXI6IHNjaGVtYUJvbmVHcm91cC5ncmF2aXR5UG93ZXIsXG4gICAgICAgICAgc3RpZmZuZXNzOiBzY2hlbWFCb25lR3JvdXAuc3RpZmZpbmVzcyxcbiAgICAgICAgICBncmF2aXR5RGlyLFxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIHByZXBhcmUgY29sbGlkZXJzXG4gICAgICAgIGNvbnN0IGNvbGxpZGVyR3JvdXBzRm9yU3ByaW5nID0gc2NoZW1hQm9uZUdyb3VwLmNvbGxpZGVyR3JvdXBzPy5tYXAoKGlDb2xsaWRlckdyb3VwKSA9PiB7XG4gICAgICAgICAgY29uc3QgZ3JvdXAgPSBjb2xsaWRlckdyb3Vwcz8uW2lDb2xsaWRlckdyb3VwXTtcblxuICAgICAgICAgIGlmIChncm91cCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgIGBWUk1TcHJpbmdCb25lTG9hZGVyUGx1Z2luOiBUaGUgc3ByaW5nICMke2lCb25lR3JvdXB9IGF0dGVtcHRlZCB0byB1c2UgYSBjb2xsaWRlckdyb3VwICR7aUNvbGxpZGVyR3JvdXB9IGJ1dCBub3QgZm91bmRgLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gZ3JvdXA7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGNyZWF0ZSBzcHJpbmcgYm9uZXNcbiAgICAgICAgcm9vdC50cmF2ZXJzZSgobm9kZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNoaWxkOiBUSFJFRS5PYmplY3QzRCB8IG51bGwgPSBub2RlLmNoaWxkcmVuWzBdID8/IG51bGw7XG5cbiAgICAgICAgICBjb25zdCBqb2ludCA9IHRoaXMuX2ltcG9ydEpvaW50KG5vZGUsIGNoaWxkLCBzZXR0aW5nLCBjb2xsaWRlckdyb3Vwc0ZvclNwcmluZyk7XG4gICAgICAgICAgaWYgKGNlbnRlcikge1xuICAgICAgICAgICAgam9pbnQuY2VudGVyID0gY2VudGVyO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIG1hbmFnZXIuYWRkSm9pbnQoam9pbnQpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gaW5pdCBzcHJpbmcgYm9uZXNcbiAgICBnbHRmLnNjZW5lLnVwZGF0ZU1hdHJpeFdvcmxkKCk7XG4gICAgbWFuYWdlci5zZXRJbml0U3RhdGUoKTtcblxuICAgIHJldHVybiBtYW5hZ2VyO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW1wb3J0Sm9pbnQoXG4gICAgbm9kZTogVEhSRUUuT2JqZWN0M0QsXG4gICAgY2hpbGQ6IFRIUkVFLk9iamVjdDNELFxuICAgIHNldHRpbmc/OiBQYXJ0aWFsPFZSTVNwcmluZ0JvbmVKb2ludFNldHRpbmdzPixcbiAgICBjb2xsaWRlckdyb3Vwc0ZvclNwcmluZz86IFZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwW10sXG4gICk6IFZSTVNwcmluZ0JvbmVKb2ludCB7XG4gICAgY29uc3Qgc3ByaW5nQm9uZSA9IG5ldyBWUk1TcHJpbmdCb25lSm9pbnQobm9kZSwgY2hpbGQsIHNldHRpbmcsIGNvbGxpZGVyR3JvdXBzRm9yU3ByaW5nKTtcblxuICAgIGlmICh0aGlzLmpvaW50SGVscGVyUm9vdCkge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IFZSTVNwcmluZ0JvbmVKb2ludEhlbHBlcihzcHJpbmdCb25lKTtcbiAgICAgIHRoaXMuam9pbnRIZWxwZXJSb290LmFkZChoZWxwZXIpO1xuICAgICAgaGVscGVyLnJlbmRlck9yZGVyID0gdGhpcy5qb2ludEhlbHBlclJvb3QucmVuZGVyT3JkZXI7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNwcmluZ0JvbmU7XG4gIH1cblxuICBwcml2YXRlIF9pbXBvcnRTcGhlcmVDb2xsaWRlcihcbiAgICBkZXN0aW5hdGlvbjogVEhSRUUuT2JqZWN0M0QsXG4gICAgcGFyYW1zOiB7XG4gICAgICBvZmZzZXQ6IFRIUkVFLlZlY3RvcjM7XG4gICAgICByYWRpdXM6IG51bWJlcjtcbiAgICAgIGluc2lkZTogYm9vbGVhbjtcbiAgICB9LFxuICApOiBWUk1TcHJpbmdCb25lQ29sbGlkZXIge1xuICAgIGNvbnN0IHNoYXBlID0gbmV3IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlU3BoZXJlKHBhcmFtcyk7XG5cbiAgICBjb25zdCBjb2xsaWRlciA9IG5ldyBWUk1TcHJpbmdCb25lQ29sbGlkZXIoc2hhcGUpO1xuXG4gICAgZGVzdGluYXRpb24uYWRkKGNvbGxpZGVyKTtcblxuICAgIGlmICh0aGlzLmNvbGxpZGVySGVscGVyUm9vdCkge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IFZSTVNwcmluZ0JvbmVDb2xsaWRlckhlbHBlcihjb2xsaWRlcik7XG4gICAgICB0aGlzLmNvbGxpZGVySGVscGVyUm9vdC5hZGQoaGVscGVyKTtcbiAgICAgIGhlbHBlci5yZW5kZXJPcmRlciA9IHRoaXMuY29sbGlkZXJIZWxwZXJSb290LnJlbmRlck9yZGVyO1xuICAgIH1cblxuICAgIHJldHVybiBjb2xsaWRlcjtcbiAgfVxuXG4gIHByaXZhdGUgX2ltcG9ydENhcHN1bGVDb2xsaWRlcihcbiAgICBkZXN0aW5hdGlvbjogVEhSRUUuT2JqZWN0M0QsXG4gICAgcGFyYW1zOiB7XG4gICAgICBvZmZzZXQ6IFRIUkVFLlZlY3RvcjM7XG4gICAgICByYWRpdXM6IG51bWJlcjtcbiAgICAgIHRhaWw6IFRIUkVFLlZlY3RvcjM7XG4gICAgICBpbnNpZGU6IGJvb2xlYW47XG4gICAgfSxcbiAgKTogVlJNU3ByaW5nQm9uZUNvbGxpZGVyIHtcbiAgICBjb25zdCBzaGFwZSA9IG5ldyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZUNhcHN1bGUocGFyYW1zKTtcblxuICAgIGNvbnN0IGNvbGxpZGVyID0gbmV3IFZSTVNwcmluZ0JvbmVDb2xsaWRlcihzaGFwZSk7XG5cbiAgICBkZXN0aW5hdGlvbi5hZGQoY29sbGlkZXIpO1xuXG4gICAgaWYgKHRoaXMuY29sbGlkZXJIZWxwZXJSb290KSB7XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgVlJNU3ByaW5nQm9uZUNvbGxpZGVySGVscGVyKGNvbGxpZGVyKTtcbiAgICAgIHRoaXMuY29sbGlkZXJIZWxwZXJSb290LmFkZChoZWxwZXIpO1xuICAgICAgaGVscGVyLnJlbmRlck9yZGVyID0gdGhpcy5jb2xsaWRlckhlbHBlclJvb3QucmVuZGVyT3JkZXI7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbGxpZGVyO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW1wb3J0UGxhbmVDb2xsaWRlcihcbiAgICBkZXN0aW5hdGlvbjogVEhSRUUuT2JqZWN0M0QsXG4gICAgcGFyYW1zOiB7XG4gICAgICBvZmZzZXQ6IFRIUkVFLlZlY3RvcjM7XG4gICAgICBub3JtYWw6IFRIUkVFLlZlY3RvcjM7XG4gICAgfSxcbiAgKTogVlJNU3ByaW5nQm9uZUNvbGxpZGVyIHtcbiAgICBjb25zdCBzaGFwZSA9IG5ldyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZVBsYW5lKHBhcmFtcyk7XG5cbiAgICBjb25zdCBjb2xsaWRlciA9IG5ldyBWUk1TcHJpbmdCb25lQ29sbGlkZXIoc2hhcGUpO1xuXG4gICAgZGVzdGluYXRpb24uYWRkKGNvbGxpZGVyKTtcblxuICAgIGlmICh0aGlzLmNvbGxpZGVySGVscGVyUm9vdCkge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IFZSTVNwcmluZ0JvbmVDb2xsaWRlckhlbHBlcihjb2xsaWRlcik7XG4gICAgICB0aGlzLmNvbGxpZGVySGVscGVyUm9vdC5hZGQoaGVscGVyKTtcbiAgICAgIGhlbHBlci5yZW5kZXJPcmRlciA9IHRoaXMuY29sbGlkZXJIZWxwZXJSb290LnJlbmRlck9yZGVyO1xuICAgIH1cblxuICAgIHJldHVybiBjb2xsaWRlcjtcbiAgfVxufVxuIiwgImltcG9ydCB0eXBlICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG5leHBvcnQgZnVuY3Rpb24gdHJhdmVyc2VBbmNlc3RvcnNGcm9tUm9vdChvYmplY3Q6IFRIUkVFLk9iamVjdDNELCBjYWxsYmFjazogKG9iamVjdDogVEhSRUUuT2JqZWN0M0QpID0+IHZvaWQpOiB2b2lkIHtcbiAgY29uc3QgYW5jZXN0b3JzOiBUSFJFRS5PYmplY3QzRFtdID0gW107XG5cbiAgbGV0IGhlYWQ6IFRIUkVFLk9iamVjdDNEIHwgbnVsbCA9IG9iamVjdDtcbiAgd2hpbGUgKGhlYWQgIT09IG51bGwpIHtcbiAgICBhbmNlc3RvcnMudW5zaGlmdChoZWFkKTtcbiAgICBoZWFkID0gaGVhZC5wYXJlbnQ7XG4gIH1cblxuICBhbmNlc3RvcnMuZm9yRWFjaCgoYW5jZXN0b3IpID0+IHtcbiAgICBjYWxsYmFjayhhbmNlc3Rvcik7XG4gIH0pO1xufVxuIiwgImltcG9ydCB0eXBlICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIFRyYXZlcnNlIGNoaWxkcmVuIG9mIGdpdmVuIG9iamVjdCBhbmQgZXhlY3V0ZSBnaXZlbiBjYWxsYmFjay5cbiAqIFRoZSBnaXZlbiBvYmplY3QgaXRzZWxmIHdvbnQgYmUgZ2l2ZW4gdG8gdGhlIGNhbGxiYWNrLlxuICogSWYgdGhlIHJldHVybiB2YWx1ZSBvZiB0aGUgY2FsbGJhY2sgaXMgYHRydWVgLCBpdCB3aWxsIGhhbHQgdGhlIHRyYXZlcnNhbCBvZiBpdHMgY2hpbGRyZW4uXG4gKiBAcGFyYW0gb2JqZWN0IEEgcm9vdCBvYmplY3RcbiAqIEBwYXJhbSBjYWxsYmFjayBBIGNhbGxiYWNrIGZ1bmN0aW9uIGNhbGxlZCBmb3IgZWFjaCBjaGlsZHJlblxuICovXG5leHBvcnQgZnVuY3Rpb24gdHJhdmVyc2VDaGlsZHJlblVudGlsQ29uZGl0aW9uTWV0KFxuICBvYmplY3Q6IFRIUkVFLk9iamVjdDNELFxuICBjYWxsYmFjazogKG9iamVjdDogVEhSRUUuT2JqZWN0M0QpID0+IGJvb2xlYW4sXG4pOiB2b2lkIHtcbiAgb2JqZWN0LmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gY2FsbGJhY2soY2hpbGQpO1xuICAgIGlmICghcmVzdWx0KSB7XG4gICAgICB0cmF2ZXJzZUNoaWxkcmVuVW50aWxDb25kaXRpb25NZXQoY2hpbGQsIGNhbGxiYWNrKTtcbiAgICB9XG4gIH0pO1xufVxuIiwgImltcG9ydCB0eXBlICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIEZpbmRzIHRoZSBsb3dlc3QgY29tbW9uIGFuY2VzdG9ycyBvZiB0aGUgZ2l2ZW4gb2JqZWN0cywgaWYgaXQgZXhpc3RzLlxuICogQHBhcmFtIG9iamVjdHMgVGhlIG9iamVjdHMgdG8gZmluZCB0aGUgbG93ZXN0IGNvbW1vbiBhbmNlc3RvciBmb3IuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsb3dlc3RDb21tb25BbmNlc3RvcihvYmplY3RzOiBTZXQ8VEhSRUUuT2JqZWN0M0Q+KTogVEhSRUUuT2JqZWN0M0QgfCBudWxsIHtcbiAgY29uc3Qgc2hhcmVkQW5jZXN0b3JzID0gbmV3IE1hcDxUSFJFRS5PYmplY3QzRCwgbnVtYmVyPigpO1xuICBmb3IgKGNvbnN0IG9iamVjdCBvZiBvYmplY3RzKSB7XG4gICAgbGV0IGN1cnJlbnQ6IFRIUkVFLk9iamVjdDNEIHwgbnVsbCA9IG9iamVjdDtcbiAgICBkbyB7XG4gICAgICBjb25zdCBuZXdWYWx1ZSA9IChzaGFyZWRBbmNlc3RvcnMuZ2V0KGN1cnJlbnQpID8/IDApICsgMTtcbiAgICAgIGlmIChuZXdWYWx1ZSA9PT0gb2JqZWN0cy5zaXplKSB7XG4gICAgICAgIHJldHVybiBjdXJyZW50O1xuICAgICAgfVxuICAgICAgc2hhcmVkQW5jZXN0b3JzLnNldChjdXJyZW50LCBuZXdWYWx1ZSk7XG4gICAgICBjdXJyZW50ID0gY3VycmVudC5wYXJlbnQ7XG4gICAgfSB3aGlsZSAoY3VycmVudCAhPT0gbnVsbCk7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG4iLCAiaW1wb3J0IHR5cGUgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgdHlwZSB7IFZSTVNwcmluZ0JvbmVKb2ludCB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUpvaW50LmpzJztcbmltcG9ydCB7IHRyYXZlcnNlQW5jZXN0b3JzRnJvbVJvb3QgfSBmcm9tICcuL3V0aWxzL3RyYXZlcnNlQW5jZXN0b3JzRnJvbVJvb3QuanMnO1xuaW1wb3J0IHR5cGUgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXIgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVDb2xsaWRlci5qcyc7XG5pbXBvcnQgdHlwZSB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cC5qcyc7XG5pbXBvcnQgeyB0cmF2ZXJzZUNoaWxkcmVuVW50aWxDb25kaXRpb25NZXQgfSBmcm9tICcuL3V0aWxzL3RyYXZlcnNlQ2hpbGRyZW5VbnRpbENvbmRpdGlvbk1ldC5qcyc7XG5pbXBvcnQgeyBsb3dlc3RDb21tb25BbmNlc3RvciB9IGZyb20gJy4vdXRpbHMvbG93ZXN0Q29tbW9uQW5jZXN0b3IuanMnO1xuXG5leHBvcnQgY2xhc3MgVlJNU3ByaW5nQm9uZU1hbmFnZXIge1xuICBwcml2YXRlIF9qb2ludHMgPSBuZXcgU2V0PFZSTVNwcmluZ0JvbmVKb2ludD4oKTtcbiAgcHJpdmF0ZSBfc29ydGVkSm9pbnRzOiBBcnJheTxWUk1TcHJpbmdCb25lSm9pbnQ+ID0gW107XG4gIHByaXZhdGUgX2hhc1dhcm5lZENpcmN1bGFyRGVwZW5kZW5jeSA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBBbiBvcmRlcmVkIGxpc3Qgb2YgYW5jZXN0b3JzIG9mIGFsbCB0aGUgU3ByaW5nQm9uZSBqb2ludHMuIEJlZm9yZSB0aGVcbiAgICogU3ByaW5nQm9uZSBqb2ludHMgY2FuIGJlIHVwZGF0ZWQsIHRoZSB3b3JsZCBtYXRyaWNlcyBvZiB0aGVzZSBhbmNlc3RvcnNcbiAgICogbXVzdCBiZSBjYWxjdWxhdGVkLiBUaGUgZmlyc3QgZWxlbWVudCBpcyB0aGUgbG93ZXN0IGNvbW1vbiBhbmNlc3RvciwgZm9yXG4gICAqIHdoaWNoIG5vdCBvbmx5IGl0cyB3b3JsZCBtYXRyaXggYnV0IGl0cyBhbmNlc3RvcnMnIHdvcmxkIG1hdHJpY2VzIGFyZVxuICAgKiB1cGRhdGVkIGFzIHdlbGwuXG4gICAqL1xuICBwcml2YXRlIF9hbmNlc3RvcnM6IFRIUkVFLk9iamVjdDNEW10gPSBbXTtcblxuICBwdWJsaWMgZ2V0IGpvaW50cygpOiBTZXQ8VlJNU3ByaW5nQm9uZUpvaW50PiB7XG4gICAgcmV0dXJuIHRoaXMuX2pvaW50cztcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBVc2Uge0BsaW5rIGpvaW50c30gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBnZXQgc3ByaW5nQm9uZXMoKTogU2V0PFZSTVNwcmluZ0JvbmVKb2ludD4ge1xuICAgIGNvbnNvbGUud2FybignVlJNU3ByaW5nQm9uZU1hbmFnZXI6IHNwcmluZ0JvbmVzIGlzIGRlcHJlY2F0ZWQuIHVzZSBqb2ludHMgaW5zdGVhZC4nKTtcblxuICAgIHJldHVybiB0aGlzLl9qb2ludHM7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGNvbGxpZGVyR3JvdXBzKCk6IFZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwW10ge1xuICAgIGNvbnN0IHNldCA9IG5ldyBTZXQ8VlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXA+KCk7XG4gICAgdGhpcy5fam9pbnRzLmZvckVhY2goKHNwcmluZ0JvbmUpID0+IHtcbiAgICAgIHNwcmluZ0JvbmUuY29sbGlkZXJHcm91cHMuZm9yRWFjaCgoY29sbGlkZXJHcm91cCkgPT4ge1xuICAgICAgICBzZXQuYWRkKGNvbGxpZGVyR3JvdXApO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oc2V0KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgY29sbGlkZXJzKCk6IFZSTVNwcmluZ0JvbmVDb2xsaWRlcltdIHtcbiAgICBjb25zdCBzZXQgPSBuZXcgU2V0PFZSTVNwcmluZ0JvbmVDb2xsaWRlcj4oKTtcbiAgICB0aGlzLmNvbGxpZGVyR3JvdXBzLmZvckVhY2goKGNvbGxpZGVyR3JvdXApID0+IHtcbiAgICAgIGNvbGxpZGVyR3JvdXAuY29sbGlkZXJzLmZvckVhY2goKGNvbGxpZGVyKSA9PiB7XG4gICAgICAgIHNldC5hZGQoY29sbGlkZXIpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oc2V0KTtcbiAgfVxuXG4gIHByaXZhdGUgX29iamVjdFNwcmluZ0JvbmVzTWFwID0gbmV3IE1hcDxUSFJFRS5PYmplY3QzRCwgU2V0PFZSTVNwcmluZ0JvbmVKb2ludD4+KCk7XG4gIHByaXZhdGUgX2lzU29ydGVkSm9pbnRzRGlydHkgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9yZWxldmFudENoaWxkcmVuVXBkYXRlZCA9IHRoaXMuX3JlbGV2YW50Q2hpbGRyZW5VcGRhdGVkLmJpbmQodGhpcyk7XG4gIH1cblxuICBwdWJsaWMgYWRkSm9pbnQoam9pbnQ6IFZSTVNwcmluZ0JvbmVKb2ludCk6IHZvaWQge1xuICAgIHRoaXMuX2pvaW50cy5hZGQoam9pbnQpO1xuXG4gICAgbGV0IG9iamVjdFNldCA9IHRoaXMuX29iamVjdFNwcmluZ0JvbmVzTWFwLmdldChqb2ludC5ib25lKTtcbiAgICBpZiAob2JqZWN0U2V0ID09IG51bGwpIHtcbiAgICAgIG9iamVjdFNldCA9IG5ldyBTZXQ8VlJNU3ByaW5nQm9uZUpvaW50PigpO1xuICAgICAgdGhpcy5fb2JqZWN0U3ByaW5nQm9uZXNNYXAuc2V0KGpvaW50LmJvbmUsIG9iamVjdFNldCk7XG4gICAgfVxuICAgIG9iamVjdFNldC5hZGQoam9pbnQpO1xuXG4gICAgdGhpcy5faXNTb3J0ZWRKb2ludHNEaXJ0eSA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVXNlIHtAbGluayBhZGRKb2ludH0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBhZGRTcHJpbmdCb25lKGpvaW50OiBWUk1TcHJpbmdCb25lSm9pbnQpOiB2b2lkIHtcbiAgICBjb25zb2xlLndhcm4oJ1ZSTVNwcmluZ0JvbmVNYW5hZ2VyOiBhZGRTcHJpbmdCb25lKCkgaXMgZGVwcmVjYXRlZC4gdXNlIGFkZEpvaW50KCkgaW5zdGVhZC4nKTtcblxuICAgIHRoaXMuYWRkSm9pbnQoam9pbnQpO1xuICB9XG5cbiAgcHVibGljIGRlbGV0ZUpvaW50KGpvaW50OiBWUk1TcHJpbmdCb25lSm9pbnQpOiB2b2lkIHtcbiAgICB0aGlzLl9qb2ludHMuZGVsZXRlKGpvaW50KTtcblxuICAgIGNvbnN0IG9iamVjdFNldCA9IHRoaXMuX29iamVjdFNwcmluZ0JvbmVzTWFwLmdldChqb2ludC5ib25lKSE7XG4gICAgb2JqZWN0U2V0LmRlbGV0ZShqb2ludCk7XG5cbiAgICB0aGlzLl9pc1NvcnRlZEpvaW50c0RpcnR5ID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBVc2Uge0BsaW5rIGRlbGV0ZUpvaW50fSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIGRlbGV0ZVNwcmluZ0JvbmUoam9pbnQ6IFZSTVNwcmluZ0JvbmVKb2ludCk6IHZvaWQge1xuICAgIGNvbnNvbGUud2FybignVlJNU3ByaW5nQm9uZU1hbmFnZXI6IGRlbGV0ZVNwcmluZ0JvbmUoKSBpcyBkZXByZWNhdGVkLiB1c2UgZGVsZXRlSm9pbnQoKSBpbnN0ZWFkLicpO1xuXG4gICAgdGhpcy5kZWxldGVKb2ludChqb2ludCk7XG4gIH1cblxuICBwdWJsaWMgc2V0SW5pdFN0YXRlKCk6IHZvaWQge1xuICAgIHRoaXMuX3NvcnRKb2ludHMoKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fc29ydGVkSm9pbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBzcHJpbmdCb25lID0gdGhpcy5fc29ydGVkSm9pbnRzW2ldO1xuICAgICAgc3ByaW5nQm9uZS5ib25lLnVwZGF0ZU1hdHJpeCgpO1xuICAgICAgc3ByaW5nQm9uZS5ib25lLnVwZGF0ZVdvcmxkTWF0cml4KGZhbHNlLCBmYWxzZSk7XG4gICAgICBzcHJpbmdCb25lLnNldEluaXRTdGF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLl9zb3J0Sm9pbnRzKCk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3NvcnRlZEpvaW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgc3ByaW5nQm9uZSA9IHRoaXMuX3NvcnRlZEpvaW50c1tpXTtcbiAgICAgIHNwcmluZ0JvbmUuYm9uZS51cGRhdGVNYXRyaXgoKTtcbiAgICAgIHNwcmluZ0JvbmUuYm9uZS51cGRhdGVXb3JsZE1hdHJpeChmYWxzZSwgZmFsc2UpO1xuICAgICAgc3ByaW5nQm9uZS5yZXNldCgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX3NvcnRKb2ludHMoKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fYW5jZXN0b3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLl9hbmNlc3RvcnNbaV0udXBkYXRlV29ybGRNYXRyaXgoaSA9PT0gMCwgZmFsc2UpO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fc29ydGVkSm9pbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAvLyB1cGRhdGUgdGhlIHNwcmluZ2JvbmVcbiAgICAgIGNvbnN0IHNwcmluZ0JvbmUgPSB0aGlzLl9zb3J0ZWRKb2ludHNbaV07XG4gICAgICBzcHJpbmdCb25lLmJvbmUudXBkYXRlTWF0cml4KCk7XG4gICAgICBzcHJpbmdCb25lLmJvbmUudXBkYXRlV29ybGRNYXRyaXgoZmFsc2UsIGZhbHNlKTtcbiAgICAgIHNwcmluZ0JvbmUudXBkYXRlKGRlbHRhKTtcblxuICAgICAgLy8gdXBkYXRlIGNoaWxkcmVuIHdvcmxkIG1hdHJpY2VzXG4gICAgICAvLyBpdCBpcyByZXF1aXJlZCB3aGVuIHRoZSBzcHJpbmcgYm9uZSBjaGFpbiBpcyBzcGFyc2VcbiAgICAgIHRyYXZlcnNlQ2hpbGRyZW5VbnRpbENvbmRpdGlvbk1ldChzcHJpbmdCb25lLmJvbmUsIHRoaXMuX3JlbGV2YW50Q2hpbGRyZW5VcGRhdGVkKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU29ydHMgdGhlIGpvaW50cyBlbnN1cmluZyB0aGV5IGFyZSB1cGRhdGVkIGluIHRoZSBjb3JyZWN0IG9yZGVyIHRha2luZyBkZXBlbmRlbmNpZXMgaW50byBhY2NvdW50LlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCB1cGRhdGVzIHtAbGluayBfc29ydGVkSm9pbnRzfSBhbmQge0BsaW5rIF9hbmNlc3RvcnN9LlxuICAgKiBNYWtlIHN1cmUgdG8gY2FsbCB0aGlzIGJlZm9yZSB1c2luZyB0aGVtLlxuICAgKi9cbiAgcHJpdmF0ZSBfc29ydEpvaW50cygpIHtcbiAgICBpZiAoIXRoaXMuX2lzU29ydGVkSm9pbnRzRGlydHkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBzcHJpbmdCb25lT3JkZXI6IEFycmF5PFZSTVNwcmluZ0JvbmVKb2ludD4gPSBbXTtcbiAgICBjb25zdCBzcHJpbmdCb25lc1RyaWVkID0gbmV3IFNldDxWUk1TcHJpbmdCb25lSm9pbnQ+KCk7XG4gICAgY29uc3Qgc3ByaW5nQm9uZXNEb25lID0gbmV3IFNldDxWUk1TcHJpbmdCb25lSm9pbnQ+KCk7XG4gICAgY29uc3QgYW5jZXN0b3JzID0gbmV3IFNldDxUSFJFRS5PYmplY3QzRD4oKTtcblxuICAgIGZvciAoY29uc3Qgc3ByaW5nQm9uZSBvZiB0aGlzLl9qb2ludHMpIHtcbiAgICAgIHRoaXMuX2luc2VydEpvaW50U29ydChzcHJpbmdCb25lLCBzcHJpbmdCb25lc1RyaWVkLCBzcHJpbmdCb25lc0RvbmUsIHNwcmluZ0JvbmVPcmRlciwgYW5jZXN0b3JzKTtcbiAgICB9XG4gICAgdGhpcy5fc29ydGVkSm9pbnRzID0gc3ByaW5nQm9uZU9yZGVyO1xuXG4gICAgY29uc3QgbGNhID0gbG93ZXN0Q29tbW9uQW5jZXN0b3IoYW5jZXN0b3JzKTtcbiAgICB0aGlzLl9hbmNlc3RvcnMgPSBbXTtcbiAgICBpZiAobGNhKSB7XG4gICAgICB0aGlzLl9hbmNlc3RvcnMucHVzaChsY2EpO1xuICAgICAgdHJhdmVyc2VDaGlsZHJlblVudGlsQ29uZGl0aW9uTWV0KGxjYSwgKG9iamVjdDogVEhSRUUuT2JqZWN0M0QpID0+IHtcbiAgICAgICAgLy8gaWYgdGhlIG9iamVjdCBoYXMgYXR0YWNoZWQgc3ByaW5nYm9uZSwgaGFsdCB0aGUgdHJhdmVyc2FsXG4gICAgICAgIGlmICgodGhpcy5fb2JqZWN0U3ByaW5nQm9uZXNNYXAuZ2V0KG9iamVjdCk/LnNpemUgPz8gMCkgPiAwKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fYW5jZXN0b3JzLnB1c2gob2JqZWN0KTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5faXNTb3J0ZWRKb2ludHNEaXJ0eSA9IGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5zZXJ0Sm9pbnRTb3J0KFxuICAgIHNwcmluZ0JvbmU6IFZSTVNwcmluZ0JvbmVKb2ludCxcbiAgICBzcHJpbmdCb25lc1RyaWVkOiBTZXQ8VlJNU3ByaW5nQm9uZUpvaW50PixcbiAgICBzcHJpbmdCb25lc0RvbmU6IFNldDxWUk1TcHJpbmdCb25lSm9pbnQ+LFxuICAgIHNwcmluZ0JvbmVPcmRlcjogQXJyYXk8VlJNU3ByaW5nQm9uZUpvaW50PixcbiAgICBhbmNlc3RvcnM6IFNldDxUSFJFRS5PYmplY3QzRD4sXG4gICkge1xuICAgIGlmIChzcHJpbmdCb25lc0RvbmUuaGFzKHNwcmluZ0JvbmUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHNwcmluZ0JvbmVzVHJpZWQuaGFzKHNwcmluZ0JvbmUpKSB7XG4gICAgICBpZiAoIXRoaXMuX2hhc1dhcm5lZENpcmN1bGFyRGVwZW5kZW5jeSkge1xuICAgICAgICBjb25zb2xlLndhcm4oJ1ZSTVNwcmluZ0JvbmVNYW5hZ2VyOiBDaXJjdWxhciBkZXBlbmRlbmN5IGRldGVjdGVkJyk7XG4gICAgICAgIHRoaXMuX2hhc1dhcm5lZENpcmN1bGFyRGVwZW5kZW5jeSA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc3ByaW5nQm9uZXNUcmllZC5hZGQoc3ByaW5nQm9uZSk7XG5cbiAgICBjb25zdCBkZXBPYmplY3RzID0gc3ByaW5nQm9uZS5kZXBlbmRlbmNpZXM7XG4gICAgZm9yIChjb25zdCBkZXBPYmplY3Qgb2YgZGVwT2JqZWN0cykge1xuICAgICAgbGV0IGVuY291bnRlcmVkU3ByaW5nQm9uZSA9IGZhbHNlO1xuICAgICAgbGV0IGFuY2VzdG9yOiBUSFJFRS5PYmplY3QzRCB8IG51bGwgPSBudWxsO1xuICAgICAgdHJhdmVyc2VBbmNlc3RvcnNGcm9tUm9vdChkZXBPYmplY3QsIChkZXBPYmplY3RBbmNlc3RvcikgPT4ge1xuICAgICAgICBjb25zdCBvYmplY3RTZXQgPSB0aGlzLl9vYmplY3RTcHJpbmdCb25lc01hcC5nZXQoZGVwT2JqZWN0QW5jZXN0b3IpO1xuICAgICAgICBpZiAob2JqZWN0U2V0KSB7XG4gICAgICAgICAgZm9yIChjb25zdCBkZXBTcHJpbmdCb25lIG9mIG9iamVjdFNldCkge1xuICAgICAgICAgICAgZW5jb3VudGVyZWRTcHJpbmdCb25lID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX2luc2VydEpvaW50U29ydChkZXBTcHJpbmdCb25lLCBzcHJpbmdCb25lc1RyaWVkLCBzcHJpbmdCb25lc0RvbmUsIHNwcmluZ0JvbmVPcmRlciwgYW5jZXN0b3JzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoIWVuY291bnRlcmVkU3ByaW5nQm9uZSkge1xuICAgICAgICAgIC8vIFRoaXMgb2JqZWN0IGlzIGFuIGFuY2VzdG9yIG9mIGEgc3ByaW5nIGJvbmUsIGJ1dCBpcyBOT1QgYSBzcGFyc2Ugbm9kZSBpbiBiZXR3ZWVuIHNwcmluZyBib25lcy5cbiAgICAgICAgICBhbmNlc3RvciA9IGRlcE9iamVjdEFuY2VzdG9yO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmIChhbmNlc3Rvcikge1xuICAgICAgICBhbmNlc3RvcnMuYWRkKGFuY2VzdG9yKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzcHJpbmdCb25lT3JkZXIucHVzaChzcHJpbmdCb25lKTtcblxuICAgIHNwcmluZ0JvbmVzRG9uZS5hZGQoc3ByaW5nQm9uZSk7XG4gIH1cblxuICBwcml2YXRlIF9yZWxldmFudENoaWxkcmVuVXBkYXRlZChvYmplY3Q6IFRIUkVFLk9iamVjdDNEKSB7XG4gICAgLy8gaWYgdGhlIG9iamVjdCBoYXMgYXR0YWNoZWQgc3ByaW5nYm9uZSwgaGFsdCB0aGUgdHJhdmVyc2FsXG4gICAgaWYgKCh0aGlzLl9vYmplY3RTcHJpbmdCb25lc01hcC5nZXQob2JqZWN0KT8uc2l6ZSA/PyAwKSA+IDApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIG90aGVyd2lzZSB1cGRhdGUgaXRzIHdvcmxkIG1hdHJpeFxuICAgIG9iamVjdC51cGRhdGVXb3JsZE1hdHJpeChmYWxzZSwgZmFsc2UpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IEdMVEYsIEdMVEZMb2FkZXJQbHVnaW4sIEdMVEZQYXJzZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyLmpzJztcbmltcG9ydCB7XG4gIFZSTUV4cHJlc3Npb25Mb2FkZXJQbHVnaW4sXG4gIFZSTUZpcnN0UGVyc29uTG9hZGVyUGx1Z2luLFxuICBWUk1IdW1hbm9pZCxcbiAgVlJNSHVtYW5vaWRMb2FkZXJQbHVnaW4sXG4gIFZSTUxvb2tBdExvYWRlclBsdWdpbixcbiAgVlJNTWV0YSxcbiAgVlJNTWV0YUxvYWRlclBsdWdpbixcbn0gZnJvbSAnQHBpeGl2L3RocmVlLXZybS1jb3JlJztcbmltcG9ydCB7IE1Ub29uTWF0ZXJpYWxMb2FkZXJQbHVnaW4gfSBmcm9tICdAcGl4aXYvdGhyZWUtdnJtLW1hdGVyaWFscy1tdG9vbic7XG5pbXBvcnQgeyBWUk1NYXRlcmlhbHNIRFJFbWlzc2l2ZU11bHRpcGxpZXJMb2FkZXJQbHVnaW4gfSBmcm9tICdAcGl4aXYvdGhyZWUtdnJtLW1hdGVyaWFscy1oZHItZW1pc3NpdmUtbXVsdGlwbGllcic7XG5pbXBvcnQgeyBWUk1NYXRlcmlhbHNWMENvbXBhdFBsdWdpbiB9IGZyb20gJ0BwaXhpdi90aHJlZS12cm0tbWF0ZXJpYWxzLXYwY29tcGF0JztcbmltcG9ydCB7IFZSTU5vZGVDb25zdHJhaW50TG9hZGVyUGx1Z2luIH0gZnJvbSAnQHBpeGl2L3RocmVlLXZybS1ub2RlLWNvbnN0cmFpbnQnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUxvYWRlclBsdWdpbiB9IGZyb20gJ0BwaXhpdi90aHJlZS12cm0tc3ByaW5nYm9uZSc7XG5pbXBvcnQgeyBWUk1Mb2FkZXJQbHVnaW5PcHRpb25zIH0gZnJvbSAnLi9WUk1Mb2FkZXJQbHVnaW5PcHRpb25zJztcbmltcG9ydCB7IFZSTSB9IGZyb20gJy4vVlJNJztcblxuZXhwb3J0IGNsYXNzIFZSTUxvYWRlclBsdWdpbiBpbXBsZW1lbnRzIEdMVEZMb2FkZXJQbHVnaW4ge1xuICBwdWJsaWMgcmVhZG9ubHkgcGFyc2VyOiBHTFRGUGFyc2VyO1xuXG4gIHB1YmxpYyByZWFkb25seSBleHByZXNzaW9uUGx1Z2luOiBWUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luO1xuICBwdWJsaWMgcmVhZG9ubHkgZmlyc3RQZXJzb25QbHVnaW46IFZSTUZpcnN0UGVyc29uTG9hZGVyUGx1Z2luO1xuICBwdWJsaWMgcmVhZG9ubHkgaHVtYW5vaWRQbHVnaW46IFZSTUh1bWFub2lkTG9hZGVyUGx1Z2luO1xuICBwdWJsaWMgcmVhZG9ubHkgbG9va0F0UGx1Z2luOiBWUk1Mb29rQXRMb2FkZXJQbHVnaW47XG4gIHB1YmxpYyByZWFkb25seSBtZXRhUGx1Z2luOiBWUk1NZXRhTG9hZGVyUGx1Z2luO1xuICBwdWJsaWMgcmVhZG9ubHkgbXRvb25NYXRlcmlhbFBsdWdpbjogTVRvb25NYXRlcmlhbExvYWRlclBsdWdpbjtcbiAgcHVibGljIHJlYWRvbmx5IG1hdGVyaWFsc0hEUkVtaXNzaXZlTXVsdGlwbGllclBsdWdpbjogVlJNTWF0ZXJpYWxzSERSRW1pc3NpdmVNdWx0aXBsaWVyTG9hZGVyUGx1Z2luO1xuICBwdWJsaWMgcmVhZG9ubHkgbWF0ZXJpYWxzVjBDb21wYXRQbHVnaW46IFZSTU1hdGVyaWFsc1YwQ29tcGF0UGx1Z2luO1xuICBwdWJsaWMgcmVhZG9ubHkgc3ByaW5nQm9uZVBsdWdpbjogVlJNU3ByaW5nQm9uZUxvYWRlclBsdWdpbjtcbiAgcHVibGljIHJlYWRvbmx5IG5vZGVDb25zdHJhaW50UGx1Z2luOiBWUk1Ob2RlQ29uc3RyYWludExvYWRlclBsdWdpbjtcblxuICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJ1ZSTUxvYWRlclBsdWdpbic7XG4gIH1cblxuICBwdWJsaWMgY29uc3RydWN0b3IocGFyc2VyOiBHTFRGUGFyc2VyLCBvcHRpb25zPzogVlJNTG9hZGVyUGx1Z2luT3B0aW9ucykge1xuICAgIHRoaXMucGFyc2VyID0gcGFyc2VyO1xuXG4gICAgY29uc3QgaGVscGVyUm9vdCA9IG9wdGlvbnM/LmhlbHBlclJvb3Q7XG4gICAgY29uc3QgYXV0b1VwZGF0ZUh1bWFuQm9uZXMgPSBvcHRpb25zPy5hdXRvVXBkYXRlSHVtYW5Cb25lcztcblxuICAgIHRoaXMuZXhwcmVzc2lvblBsdWdpbiA9IG9wdGlvbnM/LmV4cHJlc3Npb25QbHVnaW4gPz8gbmV3IFZSTUV4cHJlc3Npb25Mb2FkZXJQbHVnaW4ocGFyc2VyKTtcbiAgICB0aGlzLmZpcnN0UGVyc29uUGx1Z2luID0gb3B0aW9ucz8uZmlyc3RQZXJzb25QbHVnaW4gPz8gbmV3IFZSTUZpcnN0UGVyc29uTG9hZGVyUGx1Z2luKHBhcnNlcik7XG4gICAgdGhpcy5odW1hbm9pZFBsdWdpbiA9XG4gICAgICBvcHRpb25zPy5odW1hbm9pZFBsdWdpbiA/P1xuICAgICAgbmV3IFZSTUh1bWFub2lkTG9hZGVyUGx1Z2luKHBhcnNlciwge1xuICAgICAgICBoZWxwZXJSb290LFxuICAgICAgICBhdXRvVXBkYXRlSHVtYW5Cb25lcyxcbiAgICAgIH0pO1xuICAgIHRoaXMubG9va0F0UGx1Z2luID0gb3B0aW9ucz8ubG9va0F0UGx1Z2luID8/IG5ldyBWUk1Mb29rQXRMb2FkZXJQbHVnaW4ocGFyc2VyLCB7IGhlbHBlclJvb3QgfSk7XG4gICAgdGhpcy5tZXRhUGx1Z2luID0gb3B0aW9ucz8ubWV0YVBsdWdpbiA/PyBuZXcgVlJNTWV0YUxvYWRlclBsdWdpbihwYXJzZXIpO1xuICAgIHRoaXMubXRvb25NYXRlcmlhbFBsdWdpbiA9IG9wdGlvbnM/Lm10b29uTWF0ZXJpYWxQbHVnaW4gPz8gbmV3IE1Ub29uTWF0ZXJpYWxMb2FkZXJQbHVnaW4ocGFyc2VyKTtcbiAgICB0aGlzLm1hdGVyaWFsc0hEUkVtaXNzaXZlTXVsdGlwbGllclBsdWdpbiA9XG4gICAgICBvcHRpb25zPy5tYXRlcmlhbHNIRFJFbWlzc2l2ZU11bHRpcGxpZXJQbHVnaW4gPz8gbmV3IFZSTU1hdGVyaWFsc0hEUkVtaXNzaXZlTXVsdGlwbGllckxvYWRlclBsdWdpbihwYXJzZXIpO1xuICAgIHRoaXMubWF0ZXJpYWxzVjBDb21wYXRQbHVnaW4gPSBvcHRpb25zPy5tYXRlcmlhbHNWMENvbXBhdFBsdWdpbiA/PyBuZXcgVlJNTWF0ZXJpYWxzVjBDb21wYXRQbHVnaW4ocGFyc2VyKTtcblxuICAgIHRoaXMuc3ByaW5nQm9uZVBsdWdpbiA9XG4gICAgICBvcHRpb25zPy5zcHJpbmdCb25lUGx1Z2luID8/XG4gICAgICBuZXcgVlJNU3ByaW5nQm9uZUxvYWRlclBsdWdpbihwYXJzZXIsIHtcbiAgICAgICAgY29sbGlkZXJIZWxwZXJSb290OiBoZWxwZXJSb290LFxuICAgICAgICBqb2ludEhlbHBlclJvb3Q6IGhlbHBlclJvb3QsXG4gICAgICB9KTtcblxuICAgIHRoaXMubm9kZUNvbnN0cmFpbnRQbHVnaW4gPVxuICAgICAgb3B0aW9ucz8ubm9kZUNvbnN0cmFpbnRQbHVnaW4gPz8gbmV3IFZSTU5vZGVDb25zdHJhaW50TG9hZGVyUGx1Z2luKHBhcnNlciwgeyBoZWxwZXJSb290IH0pO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGJlZm9yZVJvb3QoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5tYXRlcmlhbHNWMENvbXBhdFBsdWdpbi5iZWZvcmVSb290KCk7XG4gICAgYXdhaXQgdGhpcy5tdG9vbk1hdGVyaWFsUGx1Z2luLmJlZm9yZVJvb3QoKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBsb2FkTWVzaChtZXNoSW5kZXg6IG51bWJlcik6IFByb21pc2U8VEhSRUUuR3JvdXAgfCBUSFJFRS5NZXNoIHwgVEhSRUUuU2tpbm5lZE1lc2g+IHtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5tdG9vbk1hdGVyaWFsUGx1Z2luLmxvYWRNZXNoKG1lc2hJbmRleCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0TWF0ZXJpYWxUeXBlKG1hdGVyaWFsSW5kZXg6IG51bWJlcik6IHR5cGVvZiBUSFJFRS5NYXRlcmlhbCB8IG51bGwge1xuICAgIGNvbnN0IG10b29uVHlwZSA9IHRoaXMubXRvb25NYXRlcmlhbFBsdWdpbi5nZXRNYXRlcmlhbFR5cGUobWF0ZXJpYWxJbmRleCk7XG4gICAgaWYgKG10b29uVHlwZSAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gbXRvb25UeXBlO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGV4dGVuZE1hdGVyaWFsUGFyYW1zKG1hdGVyaWFsSW5kZXg6IG51bWJlciwgbWF0ZXJpYWxQYXJhbXM6IHsgW2tleTogc3RyaW5nXTogYW55IH0pOiBQcm9taXNlPGFueT4ge1xuICAgIGF3YWl0IHRoaXMubWF0ZXJpYWxzSERSRW1pc3NpdmVNdWx0aXBsaWVyUGx1Z2luLmV4dGVuZE1hdGVyaWFsUGFyYW1zKG1hdGVyaWFsSW5kZXgsIG1hdGVyaWFsUGFyYW1zKTtcbiAgICBhd2FpdCB0aGlzLm10b29uTWF0ZXJpYWxQbHVnaW4uZXh0ZW5kTWF0ZXJpYWxQYXJhbXMobWF0ZXJpYWxJbmRleCwgbWF0ZXJpYWxQYXJhbXMpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGFmdGVyUm9vdChnbHRmOiBHTFRGKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5tZXRhUGx1Z2luLmFmdGVyUm9vdChnbHRmKTtcbiAgICBhd2FpdCB0aGlzLmh1bWFub2lkUGx1Z2luLmFmdGVyUm9vdChnbHRmKTtcbiAgICBhd2FpdCB0aGlzLmV4cHJlc3Npb25QbHVnaW4uYWZ0ZXJSb290KGdsdGYpO1xuICAgIGF3YWl0IHRoaXMubG9va0F0UGx1Z2luLmFmdGVyUm9vdChnbHRmKTtcbiAgICBhd2FpdCB0aGlzLmZpcnN0UGVyc29uUGx1Z2luLmFmdGVyUm9vdChnbHRmKTtcbiAgICBhd2FpdCB0aGlzLnNwcmluZ0JvbmVQbHVnaW4uYWZ0ZXJSb290KGdsdGYpO1xuICAgIGF3YWl0IHRoaXMubm9kZUNvbnN0cmFpbnRQbHVnaW4uYWZ0ZXJSb290KGdsdGYpO1xuICAgIGF3YWl0IHRoaXMubXRvb25NYXRlcmlhbFBsdWdpbi5hZnRlclJvb3QoZ2x0Zik7XG5cbiAgICBjb25zdCBtZXRhID0gZ2x0Zi51c2VyRGF0YS52cm1NZXRhIGFzIFZSTU1ldGEgfCBudWxsO1xuICAgIGNvbnN0IGh1bWFub2lkID0gZ2x0Zi51c2VyRGF0YS52cm1IdW1hbm9pZCBhcyBWUk1IdW1hbm9pZCB8IG51bGw7XG5cbiAgICAvLyBtZXRhIGFuZCBodW1hbm9pZCBhcmUgcmVxdWlyZWQgdG8gYmUgYSBWUk0uXG4gICAgLy8gRG9uJ3QgY3JlYXRlIFZSTSBpZiB0aGV5IGFyZSBudWxsXG4gICAgaWYgKG1ldGEgJiYgaHVtYW5vaWQpIHtcbiAgICAgIGNvbnN0IHZybSA9IG5ldyBWUk0oe1xuICAgICAgICBzY2VuZTogZ2x0Zi5zY2VuZSxcbiAgICAgICAgZXhwcmVzc2lvbk1hbmFnZXI6IGdsdGYudXNlckRhdGEudnJtRXhwcmVzc2lvbk1hbmFnZXIsXG4gICAgICAgIGZpcnN0UGVyc29uOiBnbHRmLnVzZXJEYXRhLnZybUZpcnN0UGVyc29uLFxuICAgICAgICBodW1hbm9pZCxcbiAgICAgICAgbG9va0F0OiBnbHRmLnVzZXJEYXRhLnZybUxvb2tBdCxcbiAgICAgICAgbWV0YSxcbiAgICAgICAgbWF0ZXJpYWxzOiBnbHRmLnVzZXJEYXRhLnZybU1Ub29uTWF0ZXJpYWxzLFxuICAgICAgICBzcHJpbmdCb25lTWFuYWdlcjogZ2x0Zi51c2VyRGF0YS52cm1TcHJpbmdCb25lTWFuYWdlcixcbiAgICAgICAgbm9kZUNvbnN0cmFpbnRNYW5hZ2VyOiBnbHRmLnVzZXJEYXRhLnZybU5vZGVDb25zdHJhaW50TWFuYWdlcixcbiAgICAgIH0pO1xuXG4gICAgICBnbHRmLnVzZXJEYXRhLnZybSA9IHZybTtcbiAgICB9XG4gIH1cbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1Db3JlLCBWUk1FeHByZXNzaW9uTW9ycGhUYXJnZXRCaW5kIH0gZnJvbSAnQHBpeGl2L3RocmVlLXZybS1jb3JlJztcblxuLyoqXG4gKiBUcmF2ZXJzZSBhbiBlbnRpcmUgdHJlZSBhbmQgY29sbGVjdCBtZXNoZXMuXG4gKi9cbmZ1bmN0aW9uIGNvbGxlY3RNZXNoZXMoc2NlbmU6IFRIUkVFLkdyb3VwKTogU2V0PFRIUkVFLk1lc2g+IHtcbiAgY29uc3QgbWVzaGVzID0gbmV3IFNldDxUSFJFRS5NZXNoPigpO1xuXG4gIHNjZW5lLnRyYXZlcnNlKChvYmopID0+IHtcbiAgICBpZiAoIShvYmogYXMgYW55KS5pc01lc2gpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBtZXNoID0gb2JqIGFzIFRIUkVFLk1lc2g7XG4gICAgbWVzaGVzLmFkZChtZXNoKTtcbiAgfSk7XG5cbiAgcmV0dXJuIG1lc2hlcztcbn1cblxuZnVuY3Rpb24gY29tYmluZU1vcnBoKFxuICBwb3NpdGlvbkF0dHJpYnV0ZXM6IChUSFJFRS5CdWZmZXJBdHRyaWJ1dGUgfCBUSFJFRS5JbnRlcmxlYXZlZEJ1ZmZlckF0dHJpYnV0ZSlbXSxcbiAgYmluZHM6IFNldDxWUk1FeHByZXNzaW9uTW9ycGhUYXJnZXRCaW5kPixcbiAgbW9ycGhUYXJnZXRzUmVsYXRpdmU6IGJvb2xlYW4sXG4pOiBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUgfCBUSFJFRS5JbnRlcmxlYXZlZEJ1ZmZlckF0dHJpYnV0ZSB7XG4gIC8vIGlmIHRoZXJlIGlzIG9ubHkgb25lIG1vcnBoIHRhcmdldCBhbmQgdGhlIHdlaWdodCBpcyAxLjAsIHdlIGNhbiB1c2UgdGhlIG9yaWdpbmFsIGFzLWlzXG4gIGlmIChiaW5kcy5zaXplID09PSAxKSB7XG4gICAgY29uc3QgYmluZCA9IGJpbmRzLnZhbHVlcygpLm5leHQoKS52YWx1ZSE7XG4gICAgaWYgKGJpbmQud2VpZ2h0ID09PSAxLjApIHtcbiAgICAgIHJldHVybiBwb3NpdGlvbkF0dHJpYnV0ZXNbYmluZC5pbmRleF07XG4gICAgfVxuICB9XG5cbiAgY29uc3QgbmV3QXJyYXkgPSBuZXcgRmxvYXQzMkFycmF5KHBvc2l0aW9uQXR0cmlidXRlc1swXS5jb3VudCAqIDMpO1xuICBsZXQgd2VpZ2h0U3VtID0gMC4wO1xuXG4gIGlmIChtb3JwaFRhcmdldHNSZWxhdGl2ZSkge1xuICAgIHdlaWdodFN1bSA9IDEuMDtcbiAgfSBlbHNlIHtcbiAgICBmb3IgKGNvbnN0IGJpbmQgb2YgYmluZHMpIHtcbiAgICAgIHdlaWdodFN1bSArPSBiaW5kLndlaWdodDtcbiAgICB9XG4gIH1cblxuICBmb3IgKGNvbnN0IGJpbmQgb2YgYmluZHMpIHtcbiAgICBjb25zdCBzcmMgPSBwb3NpdGlvbkF0dHJpYnV0ZXNbYmluZC5pbmRleF07XG4gICAgY29uc3Qgd2VpZ2h0ID0gYmluZC53ZWlnaHQgLyB3ZWlnaHRTdW07XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNyYy5jb3VudDsgaSsrKSB7XG4gICAgICBuZXdBcnJheVtpICogMyArIDBdICs9IHNyYy5nZXRYKGkpICogd2VpZ2h0O1xuICAgICAgbmV3QXJyYXlbaSAqIDMgKyAxXSArPSBzcmMuZ2V0WShpKSAqIHdlaWdodDtcbiAgICAgIG5ld0FycmF5W2kgKiAzICsgMl0gKz0gc3JjLmdldFooaSkgKiB3ZWlnaHQ7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgbmV3QXR0cmlidXRlID0gbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShuZXdBcnJheSwgMyk7XG4gIHJldHVybiBuZXdBdHRyaWJ1dGU7XG59XG5cbi8qKlxuICogQSBtYXAgZnJvbSBleHByZXNzaW9uIG5hbWVzIHRvIGEgc2V0IG9mIG1vcnBoIHRhcmdldCBiaW5kcy5cbiAqL1xudHlwZSBOYW1lQmluZFNldE1hcCA9IE1hcDxzdHJpbmcsIFNldDxWUk1FeHByZXNzaW9uTW9ycGhUYXJnZXRCaW5kPj47XG5cbi8qKlxuICogQ29tYmluZSBtb3JwaCB0YXJnZXRzIGJ5IFZSTSBleHByZXNzaW9ucy5cbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIHByZXZlbnRzIGNyYXNoZXMgY2F1c2VkIGJ5IHRoZSBsaW1pdGF0aW9uIG9mIHRoZSBudW1iZXIgb2YgbW9ycGggdGFyZ2V0cywgZXNwZWNpYWxseSBvbiBtb2JpbGUgZGV2aWNlcy5cbiAqXG4gKiBAcGFyYW0gdnJtIFRoZSBWUk0gaW5zdGFuY2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbWJpbmVNb3JwaHModnJtOiBWUk1Db3JlKTogdm9pZCB7XG4gIGNvbnN0IG1lc2hlcyA9IGNvbGxlY3RNZXNoZXModnJtLnNjZW5lKTtcblxuICAvLyBJdGVyYXRlIG92ZXIgYWxsIGV4cHJlc3Npb25zIGFuZCBjaGVjayB3aGljaCBtb3JwaCB0YXJnZXRzIGFyZSB1c2VkXG4gIGNvbnN0IG1lc2hOYW1lQmluZFNldE1hcE1hcCA9IG5ldyBNYXA8VEhSRUUuTWVzaCwgTmFtZUJpbmRTZXRNYXA+KCk7XG5cbiAgY29uc3QgZXhwcmVzc2lvbk1hcCA9IHZybS5leHByZXNzaW9uTWFuYWdlcj8uZXhwcmVzc2lvbk1hcDtcbiAgaWYgKGV4cHJlc3Npb25NYXAgIT0gbnVsbCkge1xuICAgIGZvciAoY29uc3QgW2V4cHJlc3Npb25OYW1lLCBleHByZXNzaW9uXSBvZiBPYmplY3QuZW50cmllcyhleHByZXNzaW9uTWFwKSkge1xuICAgICAgY29uc3QgYmluZHNUb0RlbGV0ZVNldCA9IG5ldyBTZXQ8VlJNRXhwcmVzc2lvbk1vcnBoVGFyZ2V0QmluZD4oKTtcbiAgICAgIGZvciAoY29uc3QgYmluZCBvZiBleHByZXNzaW9uLmJpbmRzKSB7XG4gICAgICAgIGlmIChiaW5kIGluc3RhbmNlb2YgVlJNRXhwcmVzc2lvbk1vcnBoVGFyZ2V0QmluZCkge1xuICAgICAgICAgIGlmIChiaW5kLndlaWdodCAhPT0gMC4wKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG1lc2ggb2YgYmluZC5wcmltaXRpdmVzKSB7XG4gICAgICAgICAgICAgIGxldCBuYW1lQmluZFNldE1hcCA9IG1lc2hOYW1lQmluZFNldE1hcE1hcC5nZXQobWVzaCk7XG4gICAgICAgICAgICAgIGlmIChuYW1lQmluZFNldE1hcCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbmFtZUJpbmRTZXRNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgICAgICAgICAgbWVzaE5hbWVCaW5kU2V0TWFwTWFwLnNldChtZXNoLCBuYW1lQmluZFNldE1hcCk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBsZXQgYmluZFNldCA9IG5hbWVCaW5kU2V0TWFwLmdldChleHByZXNzaW9uTmFtZSk7XG4gICAgICAgICAgICAgIGlmIChiaW5kU2V0ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBiaW5kU2V0ID0gbmV3IFNldCgpO1xuICAgICAgICAgICAgICAgIG5hbWVCaW5kU2V0TWFwLnNldChleHByZXNzaW9uTmFtZSwgYmluZFNldCk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBiaW5kU2V0LmFkZChiaW5kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYmluZHNUb0RlbGV0ZVNldC5hZGQoYmluZCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZm9yIChjb25zdCBiaW5kIG9mIGJpbmRzVG9EZWxldGVTZXQpIHtcbiAgICAgICAgZXhwcmVzc2lvbi5kZWxldGVCaW5kKGJpbmQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIENvbWJpbmUgbW9ycGhzXG4gIGZvciAoY29uc3QgbWVzaCBvZiBtZXNoZXMpIHtcbiAgICBjb25zdCBuYW1lQmluZFNldE1hcCA9IG1lc2hOYW1lQmluZFNldE1hcE1hcC5nZXQobWVzaCk7XG4gICAgaWYgKG5hbWVCaW5kU2V0TWFwID09IG51bGwpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIHByZXZlbnQgY2xvbmluZyBtb3JwaCBhdHRyaWJ1dGVzXG4gICAgY29uc3Qgb3JpZ2luYWxNb3JwaEF0dHJpYnV0ZXMgPSBtZXNoLmdlb21ldHJ5Lm1vcnBoQXR0cmlidXRlcztcbiAgICBtZXNoLmdlb21ldHJ5Lm1vcnBoQXR0cmlidXRlcyA9IHt9O1xuXG4gICAgY29uc3QgZ2VvbWV0cnkgPSBtZXNoLmdlb21ldHJ5LmNsb25lKCk7XG4gICAgbWVzaC5nZW9tZXRyeSA9IGdlb21ldHJ5O1xuICAgIGNvbnN0IG1vcnBoVGFyZ2V0c1JlbGF0aXZlID0gZ2VvbWV0cnkubW9ycGhUYXJnZXRzUmVsYXRpdmU7XG5cbiAgICBjb25zdCBoYXNQTW9ycGggPSBvcmlnaW5hbE1vcnBoQXR0cmlidXRlcy5wb3NpdGlvbiAhPSBudWxsO1xuICAgIGNvbnN0IGhhc05Nb3JwaCA9IG9yaWdpbmFsTW9ycGhBdHRyaWJ1dGVzLm5vcm1hbCAhPSBudWxsO1xuXG4gICAgY29uc3QgbW9ycGhBdHRyaWJ1dGVzOiB0eXBlb2Ygb3JpZ2luYWxNb3JwaEF0dHJpYnV0ZXMgPSB7fTtcbiAgICBjb25zdCBtb3JwaFRhcmdldERpY3Rpb25hcnk6IHR5cGVvZiBtZXNoLm1vcnBoVGFyZ2V0RGljdGlvbmFyeSA9IHt9O1xuICAgIGNvbnN0IG1vcnBoVGFyZ2V0SW5mbHVlbmNlczogdHlwZW9mIG1lc2gubW9ycGhUYXJnZXRJbmZsdWVuY2VzID0gW107XG5cbiAgICBpZiAoaGFzUE1vcnBoIHx8IGhhc05Nb3JwaCkge1xuICAgICAgaWYgKGhhc1BNb3JwaCkge1xuICAgICAgICBtb3JwaEF0dHJpYnV0ZXMucG9zaXRpb24gPSBbXTtcbiAgICAgIH1cbiAgICAgIGlmIChoYXNOTW9ycGgpIHtcbiAgICAgICAgbW9ycGhBdHRyaWJ1dGVzLm5vcm1hbCA9IFtdO1xuICAgICAgfVxuXG4gICAgICBsZXQgaSA9IDA7XG4gICAgICBmb3IgKGNvbnN0IFtuYW1lLCBiaW5kU2V0XSBvZiBuYW1lQmluZFNldE1hcCkge1xuICAgICAgICBpZiAoaGFzUE1vcnBoKSB7XG4gICAgICAgICAgbW9ycGhBdHRyaWJ1dGVzLnBvc2l0aW9uW2ldID0gY29tYmluZU1vcnBoKG9yaWdpbmFsTW9ycGhBdHRyaWJ1dGVzLnBvc2l0aW9uLCBiaW5kU2V0LCBtb3JwaFRhcmdldHNSZWxhdGl2ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhhc05Nb3JwaCkge1xuICAgICAgICAgIG1vcnBoQXR0cmlidXRlcy5ub3JtYWxbaV0gPSBjb21iaW5lTW9ycGgob3JpZ2luYWxNb3JwaEF0dHJpYnV0ZXMubm9ybWFsLCBiaW5kU2V0LCBtb3JwaFRhcmdldHNSZWxhdGl2ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBleHByZXNzaW9uTWFwPy5bbmFtZV0uYWRkQmluZChcbiAgICAgICAgICBuZXcgVlJNRXhwcmVzc2lvbk1vcnBoVGFyZ2V0QmluZCh7XG4gICAgICAgICAgICBpbmRleDogaSxcbiAgICAgICAgICAgIHdlaWdodDogMS4wLFxuICAgICAgICAgICAgcHJpbWl0aXZlczogW21lc2hdLFxuICAgICAgICAgIH0pLFxuICAgICAgICApO1xuXG4gICAgICAgIG1vcnBoVGFyZ2V0RGljdGlvbmFyeVtuYW1lXSA9IGk7XG4gICAgICAgIG1vcnBoVGFyZ2V0SW5mbHVlbmNlcy5wdXNoKDAuMCk7XG5cbiAgICAgICAgaSsrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGdlb21ldHJ5Lm1vcnBoQXR0cmlidXRlcyA9IG1vcnBoQXR0cmlidXRlcztcbiAgICBtZXNoLm1vcnBoVGFyZ2V0RGljdGlvbmFyeSA9IG1vcnBoVGFyZ2V0RGljdGlvbmFyeTtcbiAgICBtZXNoLm1vcnBoVGFyZ2V0SW5mbHVlbmNlcyA9IG1vcnBoVGFyZ2V0SW5mbHVlbmNlcztcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBUcmF2ZXJzZXMgdGhlIGdpdmVuIG9iamVjdCBhbmQgY29tYmluZXMgdGhlIHNrZWxldG9ucyBvZiBza2lubmVkIG1lc2hlcy5cbiAqXG4gKiBFYWNoIGZyYW1lIHRoZSBib25lIG1hdHJpY2VzIGFyZSBjb21wdXRlZCBmb3IgZXZlcnkgc2tlbGV0b24uIENvbWJpbmluZyBza2VsZXRvbnNcbiAqIHJlZHVjZXMgdGhlIG51bWJlciBvZiBjYWxjdWxhdGlvbnMgbmVlZGVkLCBpbXByb3ZpbmcgcGVyZm9ybWFuY2UuXG4gKlxuICogQHBhcmFtIHJvb3QgUm9vdCBvYmplY3QgdGhhdCB3aWxsIGJlIHRyYXZlcnNlZFxuICovXG5leHBvcnQgZnVuY3Rpb24gY29tYmluZVNrZWxldG9ucyhyb290OiBUSFJFRS5PYmplY3QzRCk6IHZvaWQge1xuICBjb25zdCBza2lubmVkTWVzaGVzID0gY29sbGVjdFNraW5uZWRNZXNoZXMocm9vdCk7XG5cbiAgLy8gTGlzdCBhbGwgdXNlZCBza2luIGluZGljZXMgZm9yIGVhY2ggc2tpbiBpbmRleCBhdHRyaWJ1dGVcbiAgLyoqIEEgbWFwOiBza2luIGluZGV4IGF0dHJpYnV0ZSAtPiBza2luIHdlaWdodCBhdHRyaWJ1dGUgLT4gdXNlZCBpbmRleCBzZXQgKi9cbiAgY29uc3QgYXR0cmlidXRlVXNlZEluZGV4U2V0TWFwID0gbmV3IE1hcDxcbiAgICBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUgfCBUSFJFRS5JbnRlcmxlYXZlZEJ1ZmZlckF0dHJpYnV0ZSxcbiAgICBNYXA8VEhSRUUuQnVmZmVyQXR0cmlidXRlIHwgVEhSRUUuSW50ZXJsZWF2ZWRCdWZmZXJBdHRyaWJ1dGUsIFNldDxudW1iZXI+PlxuICA+KCk7XG4gIGZvciAoY29uc3QgbWVzaCBvZiBza2lubmVkTWVzaGVzKSB7XG4gICAgY29uc3QgZ2VvbWV0cnkgPSBtZXNoLmdlb21ldHJ5O1xuXG4gICAgY29uc3Qgc2tpbkluZGV4QXR0ciA9IGdlb21ldHJ5LmdldEF0dHJpYnV0ZSgnc2tpbkluZGV4Jyk7XG4gICAgY29uc3Qgc2tpbkluZGV4TWFwID0gYXR0cmlidXRlVXNlZEluZGV4U2V0TWFwLmdldChza2luSW5kZXhBdHRyKSA/PyBuZXcgTWFwKCk7XG4gICAgYXR0cmlidXRlVXNlZEluZGV4U2V0TWFwLnNldChza2luSW5kZXhBdHRyLCBza2luSW5kZXhNYXApO1xuXG4gICAgY29uc3Qgc2tpbldlaWdodEF0dHIgPSBnZW9tZXRyeS5nZXRBdHRyaWJ1dGUoJ3NraW5XZWlnaHQnKTtcbiAgICBjb25zdCB1c2VkSW5kaWNlc1NldCA9IGxpc3RVc2VkSW5kaWNlcyhza2luSW5kZXhBdHRyLCBza2luV2VpZ2h0QXR0cik7XG4gICAgc2tpbkluZGV4TWFwLnNldChza2luV2VpZ2h0QXR0ciwgdXNlZEluZGljZXNTZXQpO1xuICB9XG5cbiAgLy8gTGlzdCBhbGwgYm9uZXMgYW5kIGJvbmVJbnZlcnNlcyBmb3IgZWFjaCBtZXNoZXNcbiAgY29uc3QgbWVzaEJvbmVJbnZlcnNlTWFwTWFwID0gbmV3IE1hcDxUSFJFRS5Ta2lubmVkTWVzaCwgTWFwPFRIUkVFLkJvbmUsIFRIUkVFLk1hdHJpeDQ+PigpO1xuICBmb3IgKGNvbnN0IG1lc2ggb2Ygc2tpbm5lZE1lc2hlcykge1xuICAgIGNvbnN0IGJvbmVJbnZlcnNlTWFwID0gbGlzdFVzZWRCb25lcyhtZXNoLCBhdHRyaWJ1dGVVc2VkSW5kZXhTZXRNYXApO1xuICAgIG1lc2hCb25lSW52ZXJzZU1hcE1hcC5zZXQobWVzaCwgYm9uZUludmVyc2VNYXApO1xuICB9XG5cbiAgLy8gR3JvdXAgbWVzaGVzIGJ5IGJvbmUgc2V0c1xuICBjb25zdCBncm91cHM6IHsgYm9uZUludmVyc2VNYXA6IE1hcDxUSFJFRS5Cb25lLCBUSFJFRS5NYXRyaXg0PjsgbWVzaGVzOiBTZXQ8VEhSRUUuU2tpbm5lZE1lc2g+IH1bXSA9IFtdO1xuICBmb3IgKGNvbnN0IFttZXNoLCBib25lSW52ZXJzZU1hcF0gb2YgbWVzaEJvbmVJbnZlcnNlTWFwTWFwKSB7XG4gICAgbGV0IGZvdW5kTWVyZ2VhYmxlR3JvdXAgPSBmYWxzZTtcbiAgICBmb3IgKGNvbnN0IGNhbmRpZGF0ZSBvZiBncm91cHMpIHtcbiAgICAgIC8vIGNoZWNrIGlmIHRoZSBjYW5kaWRhdGUgZ3JvdXAgaXMgbWVyZ2VhYmxlXG4gICAgICBjb25zdCBpc01lcmdlYWJsZSA9IGJvbmVJbnZlcnNlTWFwSXNNZXJnZWFibGUoYm9uZUludmVyc2VNYXAsIGNhbmRpZGF0ZS5ib25lSW52ZXJzZU1hcCk7XG5cbiAgICAgIC8vIGlmIHdlIGZvdW5kIGEgbWVyZ2VhYmxlIGdyb3VwLCBhZGQgdGhlIG1lc2ggdG8gdGhlIGdyb3VwXG4gICAgICBpZiAoaXNNZXJnZWFibGUpIHtcbiAgICAgICAgZm91bmRNZXJnZWFibGVHcm91cCA9IHRydWU7XG4gICAgICAgIGNhbmRpZGF0ZS5tZXNoZXMuYWRkKG1lc2gpO1xuXG4gICAgICAgIC8vIGFkZCBsYWNraW5nIGJvbmVzIHRvIHRoZSBncm91cFxuICAgICAgICBmb3IgKGNvbnN0IFtib25lLCBib25lSW52ZXJzZV0gb2YgYm9uZUludmVyc2VNYXApIHtcbiAgICAgICAgICBjYW5kaWRhdGUuYm9uZUludmVyc2VNYXAuc2V0KGJvbmUsIGJvbmVJbnZlcnNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGlmIHdlIGNvdWxkbid0IGZpbmQgYSBtZXJnZWFibGUgZ3JvdXAsIGNyZWF0ZSBhIG5ldyBncm91cFxuICAgIGlmICghZm91bmRNZXJnZWFibGVHcm91cCkge1xuICAgICAgZ3JvdXBzLnB1c2goeyBib25lSW52ZXJzZU1hcCwgbWVzaGVzOiBuZXcgU2V0KFttZXNoXSkgfSk7XG4gICAgfVxuICB9XG5cbiAgLy8gcHJlcGFyZSBuZXcgc2tlbGV0b25zIGZvciBlYWNoIGdyb3VwLCBhbmQgYmluZCB0aGVtIHRvIHRoZSBtZXNoZXNcblxuICAvLyB0aGUgY29uZGl0aW9uIHRvIHVzZSB0aGUgc2FtZSBza2luIGluZGV4IGF0dHJpYnV0ZTpcbiAgLy8gLSB0aGUgc2FtZSBza2luIGluZGV4IGF0dHJpYnV0ZVxuICAvLyAtIGFuZCB0aGUgc2tlbGV0b24gaXMgc2FtZVxuICAvLyAtIGFuZCB0aGUgYm9uZSBzZXQgaXMgc2FtZVxuICBjb25zdCBjYWNoZSA9IG5ldyBNYXA8c3RyaW5nLCBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUgfCBUSFJFRS5JbnRlcmxlYXZlZEJ1ZmZlckF0dHJpYnV0ZT4oKTtcbiAgY29uc3Qgc2tpbkluZGV4RGlzcGF0Y2hlciA9IG5ldyBPYmplY3RJbmRleERpc3BhdGNoZXI8VEhSRUUuQnVmZmVyQXR0cmlidXRlIHwgVEhSRUUuSW50ZXJsZWF2ZWRCdWZmZXJBdHRyaWJ1dGU+KCk7XG4gIGNvbnN0IHNrZWxldG9uRGlzcGF0Y2hlciA9IG5ldyBPYmplY3RJbmRleERpc3BhdGNoZXI8VEhSRUUuU2tlbGV0b24+KCk7XG4gIGNvbnN0IGJvbmVEaXNwYXRjaGVyID0gbmV3IE9iamVjdEluZGV4RGlzcGF0Y2hlcjxUSFJFRS5Cb25lPigpO1xuXG4gIGZvciAoY29uc3QgZ3JvdXAgb2YgZ3JvdXBzKSB7XG4gICAgY29uc3QgeyBib25lSW52ZXJzZU1hcCwgbWVzaGVzIH0gPSBncm91cDtcblxuICAgIC8vIGNyZWF0ZSBhIG5ldyBza2VsZXRvblxuICAgIGNvbnN0IG5ld0JvbmVzID0gQXJyYXkuZnJvbShib25lSW52ZXJzZU1hcC5rZXlzKCkpO1xuICAgIGNvbnN0IG5ld0JvbmVJbnZlcnNlcyA9IEFycmF5LmZyb20oYm9uZUludmVyc2VNYXAudmFsdWVzKCkpO1xuICAgIGNvbnN0IG5ld1NrZWxldG9uID0gbmV3IFRIUkVFLlNrZWxldG9uKG5ld0JvbmVzLCBuZXdCb25lSW52ZXJzZXMpO1xuICAgIGNvbnN0IHNrZWxldG9uS2V5ID0gc2tlbGV0b25EaXNwYXRjaGVyLmdldE9yQ3JlYXRlKG5ld1NrZWxldG9uKTtcblxuICAgIC8vIHJlbWFwIHNraW4gaW5kZXggYXR0cmlidXRlXG4gICAgZm9yIChjb25zdCBtZXNoIG9mIG1lc2hlcykge1xuICAgICAgY29uc3Qgc2tpbkluZGV4QXR0ciA9IG1lc2guZ2VvbWV0cnkuZ2V0QXR0cmlidXRlKCdza2luSW5kZXgnKTtcbiAgICAgIGNvbnN0IHNraW5JbmRleEtleSA9IHNraW5JbmRleERpc3BhdGNoZXIuZ2V0T3JDcmVhdGUoc2tpbkluZGV4QXR0cik7XG5cbiAgICAgIGNvbnN0IGJvbmVzID0gbWVzaC5za2VsZXRvbi5ib25lcztcbiAgICAgIGNvbnN0IGJvbmVzS2V5ID0gYm9uZXMubWFwKChib25lKSA9PiBib25lRGlzcGF0Y2hlci5nZXRPckNyZWF0ZShib25lKSkuam9pbignLCcpO1xuXG4gICAgICBjb25zdCBrZXkgPSBgJHtza2luSW5kZXhLZXl9OyR7c2tlbGV0b25LZXl9OyR7Ym9uZXNLZXl9YDtcbiAgICAgIGxldCBuZXdTa2luSW5kZXhBdHRyID0gY2FjaGUuZ2V0KGtleSk7XG5cbiAgICAgIGlmIChuZXdTa2luSW5kZXhBdHRyID09IG51bGwpIHtcbiAgICAgICAgbmV3U2tpbkluZGV4QXR0ciA9IHNraW5JbmRleEF0dHIuY2xvbmUoKTtcbiAgICAgICAgcmVtYXBTa2luSW5kZXhBdHRyaWJ1dGUobmV3U2tpbkluZGV4QXR0ciwgYm9uZXMsIG5ld0JvbmVzKTtcbiAgICAgICAgY2FjaGUuc2V0KGtleSwgbmV3U2tpbkluZGV4QXR0cik7XG4gICAgICB9XG5cbiAgICAgIG1lc2guZ2VvbWV0cnkuc2V0QXR0cmlidXRlKCdza2luSW5kZXgnLCBuZXdTa2luSW5kZXhBdHRyKTtcbiAgICB9XG5cbiAgICAvLyBiaW5kIHRoZSBuZXcgc2tlbGV0b24gdG8gdGhlIG1lc2hlc1xuICAgIGZvciAoY29uc3QgbWVzaCBvZiBtZXNoZXMpIHtcbiAgICAgIG1lc2guYmluZChuZXdTa2VsZXRvbiwgbmV3IFRIUkVFLk1hdHJpeDQoKSk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogVHJhdmVyc2UgYW4gZW50aXJlIHRyZWUgYW5kIGNvbGxlY3Qgc2tpbm5lZCBtZXNoZXMuXG4gKi9cbmZ1bmN0aW9uIGNvbGxlY3RTa2lubmVkTWVzaGVzKHNjZW5lOiBUSFJFRS5PYmplY3QzRCk6IFNldDxUSFJFRS5Ta2lubmVkTWVzaD4ge1xuICBjb25zdCBza2lubmVkTWVzaGVzID0gbmV3IFNldDxUSFJFRS5Ta2lubmVkTWVzaD4oKTtcblxuICBzY2VuZS50cmF2ZXJzZSgob2JqKSA9PiB7XG4gICAgaWYgKCEob2JqIGFzIGFueSkuaXNTa2lubmVkTWVzaCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHNraW5uZWRNZXNoID0gb2JqIGFzIFRIUkVFLlNraW5uZWRNZXNoO1xuICAgIHNraW5uZWRNZXNoZXMuYWRkKHNraW5uZWRNZXNoKTtcbiAgfSk7XG5cbiAgcmV0dXJuIHNraW5uZWRNZXNoZXM7XG59XG5cbi8qKlxuICogTGlzdCBhbGwgc2tpbiBpbmRpY2VzIHVzZWQgYnkgdGhlIGdpdmVuIGdlb21ldHJ5LlxuICogSWYgdGhlIHNraW4gd2VpZ2h0IGlzIDAsIHRoZSBpbmRleCB3b24ndCBiZSBjb25zaWRlcmVkIGFzIHVzZWQuXG4gKiBAcGFyYW0gc2tpbkluZGV4QXR0ciBUaGUgc2tpbiBpbmRleCBhdHRyaWJ1dGUgdG8gbGlzdCB1c2VkIGluZGljZXNcbiAqIEBwYXJhbSBza2luV2VpZ2h0QXR0ciBUaGUgc2tpbiB3ZWlnaHQgYXR0cmlidXRlIGNvcnJlc3BvbmRpbmcgdG8gdGhlIHNraW4gaW5kZXggYXR0cmlidXRlXG4gKi9cbmZ1bmN0aW9uIGxpc3RVc2VkSW5kaWNlcyhcbiAgc2tpbkluZGV4QXR0cjogVEhSRUUuQnVmZmVyQXR0cmlidXRlIHwgVEhSRUUuSW50ZXJsZWF2ZWRCdWZmZXJBdHRyaWJ1dGUsXG4gIHNraW5XZWlnaHRBdHRyOiBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUgfCBUSFJFRS5JbnRlcmxlYXZlZEJ1ZmZlckF0dHJpYnV0ZSxcbik6IFNldDxudW1iZXI+IHtcbiAgY29uc3QgdXNlZEluZGljZXMgPSBuZXcgU2V0PG51bWJlcj4oKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHNraW5JbmRleEF0dHIuY291bnQ7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgc2tpbkluZGV4QXR0ci5pdGVtU2l6ZTsgaisrKSB7XG4gICAgICBjb25zdCBpbmRleCA9IHNraW5JbmRleEF0dHIuZ2V0Q29tcG9uZW50KGksIGopO1xuICAgICAgY29uc3Qgd2VpZ2h0ID0gc2tpbldlaWdodEF0dHIuZ2V0Q29tcG9uZW50KGksIGopO1xuXG4gICAgICBpZiAod2VpZ2h0ICE9PSAwKSB7XG4gICAgICAgIHVzZWRJbmRpY2VzLmFkZChpbmRleCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHVzZWRJbmRpY2VzO1xufVxuXG4vKipcbiAqIExpc3QgYWxsIGJvbmVzIHVzZWQgYnkgdGhlIGdpdmVuIHNraW5uZWQgbWVzaC5cbiAqIEBwYXJhbSBtZXNoIFRoZSBza2lubmVkIG1lc2ggdG8gbGlzdCB1c2VkIGJvbmVzXG4gKiBAcGFyYW0gYXR0cmlidXRlVXNlZEluZGV4U2V0TWFwIEEgbWFwIGZyb20gc2tpbiBpbmRleCBhdHRyaWJ1dGUgdG8gdGhlIHNldCBvZiB1c2VkIHNraW4gaW5kaWNlc1xuICogQHJldHVybnMgQSBtYXAgZnJvbSB1c2VkIGJvbmUgdG8gdGhlIGNvcnJlc3BvbmRpbmcgYm9uZSBpbnZlcnNlIG1hdHJpeFxuICovXG5mdW5jdGlvbiBsaXN0VXNlZEJvbmVzKFxuICBtZXNoOiBUSFJFRS5Ta2lubmVkTWVzaCxcbiAgYXR0cmlidXRlVXNlZEluZGV4U2V0TWFwOiBNYXA8XG4gICAgVEhSRUUuQnVmZmVyQXR0cmlidXRlIHwgVEhSRUUuSW50ZXJsZWF2ZWRCdWZmZXJBdHRyaWJ1dGUsXG4gICAgTWFwPFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZSB8IFRIUkVFLkludGVybGVhdmVkQnVmZmVyQXR0cmlidXRlLCBTZXQ8bnVtYmVyPj5cbiAgPixcbik6IE1hcDxUSFJFRS5Cb25lLCBUSFJFRS5NYXRyaXg0PiB7XG4gIGNvbnN0IGJvbmVJbnZlcnNlTWFwID0gbmV3IE1hcDxUSFJFRS5Cb25lLCBUSFJFRS5NYXRyaXg0PigpO1xuXG4gIGNvbnN0IHNrZWxldG9uID0gbWVzaC5za2VsZXRvbjtcblxuICBjb25zdCBnZW9tZXRyeSA9IG1lc2guZ2VvbWV0cnk7XG4gIGNvbnN0IHNraW5JbmRleEF0dHIgPSBnZW9tZXRyeS5nZXRBdHRyaWJ1dGUoJ3NraW5JbmRleCcpO1xuICBjb25zdCBza2luV2VpZ2h0QXR0ciA9IGdlb21ldHJ5LmdldEF0dHJpYnV0ZSgnc2tpbldlaWdodCcpO1xuICBjb25zdCBza2luSW5kZXhNYXAgPSBhdHRyaWJ1dGVVc2VkSW5kZXhTZXRNYXAuZ2V0KHNraW5JbmRleEF0dHIpO1xuICBjb25zdCB1c2VkSW5kaWNlc1NldCA9IHNraW5JbmRleE1hcD8uZ2V0KHNraW5XZWlnaHRBdHRyKTtcblxuICBpZiAoIXVzZWRJbmRpY2VzU2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ1VucmVhY2hhYmxlLiBhdHRyaWJ1dGVVc2VkSW5kZXhTZXRNYXAgZG9lcyBub3Qga25vdyB0aGUgc2tpbiBpbmRleCBhdHRyaWJ1dGUgb3IgdGhlIHNraW4gd2VpZ2h0IGF0dHJpYnV0ZS4nLFxuICAgICk7XG4gIH1cblxuICBmb3IgKGNvbnN0IGluZGV4IG9mIHVzZWRJbmRpY2VzU2V0KSB7XG4gICAgYm9uZUludmVyc2VNYXAuc2V0KHNrZWxldG9uLmJvbmVzW2luZGV4XSwgc2tlbGV0b24uYm9uZUludmVyc2VzW2luZGV4XSk7XG4gIH1cblxuICByZXR1cm4gYm9uZUludmVyc2VNYXA7XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgdGhlIGdpdmVuIGJvbmUgaW52ZXJzZSBtYXAgaXMgbWVyZ2VhYmxlIHRvIHRoZSBjYW5kaWRhdGUgYm9uZSBpbnZlcnNlIG1hcC5cbiAqIEBwYXJhbSB0b0NoZWNrIFRoZSBib25lIGludmVyc2UgbWFwIHRvIGNoZWNrXG4gKiBAcGFyYW0gY2FuZGlkYXRlIFRoZSBjYW5kaWRhdGUgYm9uZSBpbnZlcnNlIG1hcFxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgYm9uZSBpbnZlcnNlIG1hcCBpcyBtZXJnZWFibGUgdG8gdGhlIGNhbmRpZGF0ZSBib25lIGludmVyc2UgbWFwXG4gKi9cbmZ1bmN0aW9uIGJvbmVJbnZlcnNlTWFwSXNNZXJnZWFibGUoXG4gIHRvQ2hlY2s6IE1hcDxUSFJFRS5Cb25lLCBUSFJFRS5NYXRyaXg0PixcbiAgY2FuZGlkYXRlOiBNYXA8VEhSRUUuQm9uZSwgVEhSRUUuTWF0cml4ND4sXG4pOiBib29sZWFuIHtcbiAgZm9yIChjb25zdCBbYm9uZSwgYm9uZUludmVyc2VdIG9mIHRvQ2hlY2suZW50cmllcygpKSB7XG4gICAgLy8gaWYgdGhlIGJvbmUgaXMgaW4gdGhlIGNhbmRpZGF0ZSBncm91cCBhbmQgdGhlIGJvbmVJbnZlcnNlIGlzIGRpZmZlcmVudCwgaXQncyBub3QgbWVyZ2VhYmxlXG4gICAgY29uc3QgY2FuZGlkYXRlQm9uZUludmVyc2UgPSBjYW5kaWRhdGUuZ2V0KGJvbmUpO1xuICAgIGlmIChjYW5kaWRhdGVCb25lSW52ZXJzZSAhPSBudWxsKSB7XG4gICAgICBpZiAoIW1hdHJpeEVxdWFscyhib25lSW52ZXJzZSwgY2FuZGlkYXRlQm9uZUludmVyc2UpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLyoqXG4gKiBSZW1hcCB0aGUgc2tpbiBpbmRleCBhdHRyaWJ1dGUgZnJvbSBvbGQgYm9uZXMgdG8gbmV3IGJvbmVzLlxuICogVGhpcyBmdW5jdGlvbiBtb2RpZmllcyB0aGUgZ2l2ZW4gYXR0cmlidXRlIGluIHBsYWNlLlxuICogQHBhcmFtIGF0dHJpYnV0ZSBUaGUgc2tpbiBpbmRleCBhdHRyaWJ1dGUgdG8gcmVtYXBcbiAqIEBwYXJhbSBvbGRCb25lcyBUaGUgYm9uZSBhcnJheSB0aGF0IHRoZSBhdHRyaWJ1dGUgaXMgY3VycmVudGx5IHVzaW5nXG4gKiBAcGFyYW0gbmV3Qm9uZXMgVGhlIGJvbmUgYXJyYXkgdGhhdCB0aGUgYXR0cmlidXRlIHdpbGwgYmUgdXNpbmdcbiAqL1xuZnVuY3Rpb24gcmVtYXBTa2luSW5kZXhBdHRyaWJ1dGUoXG4gIGF0dHJpYnV0ZTogVEhSRUUuQnVmZmVyQXR0cmlidXRlIHwgVEhSRUUuSW50ZXJsZWF2ZWRCdWZmZXJBdHRyaWJ1dGUsXG4gIG9sZEJvbmVzOiBUSFJFRS5Cb25lW10sXG4gIG5ld0JvbmVzOiBUSFJFRS5Cb25lW10sXG4pOiB2b2lkIHtcbiAgLy8gYSBtYXAgZnJvbSBib25lIHRvIG9sZCBpbmRleFxuICBjb25zdCBib25lT2xkSW5kZXhNYXAgPSBuZXcgTWFwPFRIUkVFLkJvbmUsIG51bWJlcj4oKTtcbiAgZm9yIChjb25zdCBib25lIG9mIG9sZEJvbmVzKSB7XG4gICAgYm9uZU9sZEluZGV4TWFwLnNldChib25lLCBib25lT2xkSW5kZXhNYXAuc2l6ZSk7XG4gIH1cblxuICAvLyBhIG1hcCBmcm9tIG9sZCBza2luIGluZGV4IHRvIG5ldyBza2luIGluZGV4XG4gIGNvbnN0IG9sZFRvTmV3ID0gbmV3IE1hcDxudW1iZXIsIG51bWJlcj4oKTtcbiAgZm9yIChjb25zdCBbaSwgYm9uZV0gb2YgbmV3Qm9uZXMuZW50cmllcygpKSB7XG4gICAgY29uc3Qgb2xkSW5kZXggPSBib25lT2xkSW5kZXhNYXAuZ2V0KGJvbmUpITtcbiAgICBvbGRUb05ldy5zZXQob2xkSW5kZXgsIGkpO1xuICB9XG5cbiAgLy8gcmVwbGFjZSB0aGUgc2tpbiBpbmRleCBhdHRyaWJ1dGUgd2l0aCBuZXcgaW5kaWNlc1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGF0dHJpYnV0ZS5jb3VudDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBhdHRyaWJ1dGUuaXRlbVNpemU7IGorKykge1xuICAgICAgY29uc3Qgb2xkSW5kZXggPSBhdHRyaWJ1dGUuZ2V0Q29tcG9uZW50KGksIGopO1xuICAgICAgY29uc3QgbmV3SW5kZXggPSBvbGRUb05ldy5nZXQob2xkSW5kZXgpITtcbiAgICAgIGF0dHJpYnV0ZS5zZXRDb21wb25lbnQoaSwgaiwgbmV3SW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIGF0dHJpYnV0ZS5uZWVkc1VwZGF0ZSA9IHRydWU7XG59XG5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvYmxvYi9yMTcwL3Rlc3QvdW5pdC9zcmMvbWF0aC9NYXRyaXg0LnRlc3RzLmpzI0wxMlxuZnVuY3Rpb24gbWF0cml4RXF1YWxzKGE6IFRIUkVFLk1hdHJpeDQsIGI6IFRIUkVFLk1hdHJpeDQsIHRvbGVyYW5jZT86IG51bWJlcikge1xuICB0b2xlcmFuY2UgPSB0b2xlcmFuY2UgfHwgMC4wMDAxO1xuICBpZiAoYS5lbGVtZW50cy5sZW5ndGggIT0gYi5lbGVtZW50cy5sZW5ndGgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBmb3IgKGxldCBpID0gMCwgaWwgPSBhLmVsZW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICBjb25zdCBkZWx0YSA9IE1hdGguYWJzKGEuZWxlbWVudHNbaV0gLSBiLmVsZW1lbnRzW2ldKTtcbiAgICBpZiAoZGVsdGEgPiB0b2xlcmFuY2UpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuY2xhc3MgT2JqZWN0SW5kZXhEaXNwYXRjaGVyPFQ+IHtcbiAgcHJpdmF0ZSBfb2JqZWN0SW5kZXhNYXAgPSBuZXcgTWFwPFQsIG51bWJlcj4oKTtcbiAgcHJpdmF0ZSBfaW5kZXggPSAwO1xuXG4gIHB1YmxpYyBnZXQob2JqOiBUKTogbnVtYmVyIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fb2JqZWN0SW5kZXhNYXAuZ2V0KG9iaik7XG4gIH1cblxuICBwdWJsaWMgZ2V0T3JDcmVhdGUob2JqOiBUKTogbnVtYmVyIHtcbiAgICBsZXQgaW5kZXggPSB0aGlzLl9vYmplY3RJbmRleE1hcC5nZXQob2JqKTtcbiAgICBpZiAoaW5kZXggPT0gbnVsbCkge1xuICAgICAgaW5kZXggPSB0aGlzLl9pbmRleDtcbiAgICAgIHRoaXMuX29iamVjdEluZGV4TWFwLnNldChvYmosIGluZGV4KTtcbiAgICAgIHRoaXMuX2luZGV4Kys7XG4gICAgfVxuXG4gICAgcmV0dXJuIGluZGV4O1xuICB9XG59XG4iLCAiLy8gU2VlOiBodHRwczovL3RocmVlanMub3JnL2RvY3MvI21hbnVhbC9lbi9pbnRyb2R1Y3Rpb24vSG93LXRvLWRpc3Bvc2Utb2Ytb2JqZWN0c1xuXG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbmZ1bmN0aW9uIGRpc3Bvc2VNYXRlcmlhbChtYXRlcmlhbDogVEhSRUUuTWF0ZXJpYWwpOiB2b2lkIHtcbiAgT2JqZWN0LnZhbHVlcyhtYXRlcmlhbCkuZm9yRWFjaCgodmFsdWUpID0+IHtcbiAgICBpZiAodmFsdWU/LmlzVGV4dHVyZSkge1xuICAgICAgY29uc3QgdGV4dHVyZSA9IHZhbHVlIGFzIFRIUkVFLlRleHR1cmU7XG4gICAgICB0ZXh0dXJlLmRpc3Bvc2UoKTtcbiAgICB9XG4gIH0pO1xuXG4gIGlmICgobWF0ZXJpYWwgYXMgYW55KS5pc1NoYWRlck1hdGVyaWFsKSB7XG4gICAgY29uc3QgdW5pZm9ybXM6IHsgW3VuaWZvcm06IHN0cmluZ106IFRIUkVFLklVbmlmb3JtPGFueT4gfSA9IChtYXRlcmlhbCBhcyBhbnkpLnVuaWZvcm1zO1xuICAgIGlmICh1bmlmb3Jtcykge1xuICAgICAgT2JqZWN0LnZhbHVlcyh1bmlmb3JtcykuZm9yRWFjaCgodW5pZm9ybSkgPT4ge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHVuaWZvcm0udmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZT8uaXNUZXh0dXJlKSB7XG4gICAgICAgICAgY29uc3QgdGV4dHVyZSA9IHZhbHVlIGFzIFRIUkVFLlRleHR1cmU7XG4gICAgICAgICAgdGV4dHVyZS5kaXNwb3NlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG1hdGVyaWFsLmRpc3Bvc2UoKTtcbn1cblxuZnVuY3Rpb24gZGlzcG9zZShvYmplY3QzRDogVEhSRUUuT2JqZWN0M0QpOiB2b2lkIHtcbiAgY29uc3QgZ2VvbWV0cnk6IFRIUkVFLkJ1ZmZlckdlb21ldHJ5IHwgdW5kZWZpbmVkID0gKG9iamVjdDNEIGFzIGFueSkuZ2VvbWV0cnk7XG4gIGlmIChnZW9tZXRyeSkge1xuICAgIGdlb21ldHJ5LmRpc3Bvc2UoKTtcbiAgfVxuXG4gIGNvbnN0IHNrZWxldG9uOiBUSFJFRS5Ta2VsZXRvbiB8IHVuZGVmaW5lZCA9IChvYmplY3QzRCBhcyBhbnkpLnNrZWxldG9uO1xuICBpZiAoc2tlbGV0b24pIHtcbiAgICBza2VsZXRvbi5kaXNwb3NlKCk7XG4gIH1cblxuICBjb25zdCBtYXRlcmlhbDogVEhSRUUuTWF0ZXJpYWwgfCBUSFJFRS5NYXRlcmlhbFtdIHwgdW5kZWZpbmVkID0gKG9iamVjdDNEIGFzIGFueSkubWF0ZXJpYWw7XG4gIGlmIChtYXRlcmlhbCkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KG1hdGVyaWFsKSkge1xuICAgICAgbWF0ZXJpYWwuZm9yRWFjaCgobWF0ZXJpYWw6IFRIUkVFLk1hdGVyaWFsKSA9PiBkaXNwb3NlTWF0ZXJpYWwobWF0ZXJpYWwpKTtcbiAgICB9IGVsc2UgaWYgKG1hdGVyaWFsKSB7XG4gICAgICBkaXNwb3NlTWF0ZXJpYWwobWF0ZXJpYWwpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVlcERpc3Bvc2Uob2JqZWN0M0Q6IFRIUkVFLk9iamVjdDNEKTogdm9pZCB7XG4gIG9iamVjdDNELnRyYXZlcnNlKGRpc3Bvc2UpO1xufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBUcmF2ZXJzZSB0aGUgZ2l2ZW4gb2JqZWN0IGFuZCByZW1vdmUgdW5uZWNlc3NhcmlseSBib3VuZCBqb2ludHMgZnJvbSBldmVyeSBgVEhSRUUuU2tpbm5lZE1lc2hgLlxuICpcbiAqIFNvbWUgZW52aXJvbm1lbnRzIGxpa2UgbW9iaWxlIGRldmljZXMgaGF2ZSBhIGxvd2VyIGxpbWl0IG9mIGJvbmVzXG4gKiBhbmQgbWlnaHQgYmUgdW5hYmxlIHRvIHBlcmZvcm0gbWVzaCBza2lubmluZyB3aXRoIG1hbnkgYm9uZXMuXG4gKiBUaGlzIGZ1bmN0aW9uIG1pZ2h0IHJlc29sdmUgc3VjaCBhbiBpc3N1ZS5cbiAqXG4gKiBBbHNvLCB0aGlzIGZ1bmN0aW9uIG1pZ2h0IHNpZ25pZmljYW50bHkgaW1wcm92ZSB0aGUgcGVyZm9ybWFuY2Ugb2YgbWVzaCBza2lubmluZy5cbiAqXG4gKiBAcGFyYW0gcm9vdCBSb290IG9iamVjdCB0aGF0IHdpbGwgYmUgdHJhdmVyc2VkXG4gKlxuICogQGRlcHJlY2F0ZWQgYHJlbW92ZVVubmVjZXNzYXJ5Sm9pbnRzYCBpcyBkZXByZWNhdGVkLiBVc2UgYGNvbWJpbmVTa2VsZXRvbnNgIGluc3RlYWQuIGBjb21iaW5lU2tlbGV0b25zYCBjb250cmlidXRlcyBtb3JlIHRvIHRoZSBwZXJmb3JtYW5jZSBpbXByb3ZlbWVudC4gVGhpcyBmdW5jdGlvbiB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIG5leHQgbWFqb3IgdmVyc2lvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZVVubmVjZXNzYXJ5Sm9pbnRzKFxuICByb290OiBUSFJFRS5PYmplY3QzRCxcbiAgb3B0aW9ucz86IHtcbiAgICAvKipcbiAgICAgKiBJZiBgdHJ1ZWAsIHRoaXMgZnVuY3Rpb24gd2lsbCBjb21wZW5zYXRlIHNrZWxldG9ucyB3aXRoIGR1bW15IGJvbmVzIHRvIGtlZXAgdGhlIGJvbmUgY291bnQgc2FtZSBiZXR3ZWVuIHNrZWxldG9ucy5cbiAgICAgKlxuICAgICAqIFRoaXMgb3B0aW9uIG1pZ2h0IGJlIGVmZmVjdGl2ZSBmb3IgdGhlIHNoYWRlciBjb21waWxhdGlvbiBwZXJmb3JtYW5jZSB0aGF0IG1hdHRlcnMgdG8gdGhlIGluaXRpYWwgcmVuZGVyaW5nIHRpbWUgaW4gV2ViR1BVUmVuZGVyZXIsXG4gICAgICogZXNwZWNpYWxseSB3aGVuIHRoZSBtb2RlbCBsb2FkZWQgaGFzIG1hbnkgbWF0ZXJpYWxzIGFuZCB0aGUgZGVwZW5kZW50IGJvbmUgY291bnQgaXMgZGlmZmVyZW50IGJldHdlZW4gdGhlbS5cbiAgICAgKlxuICAgICAqIENvbnNpZGVyIHRoaXMgcGFyYW1ldGVyIGFzIGV4cGVyaW1lbnRhbC4gV2UgbWlnaHQgbW9kaWZ5IG9yIGRlbGV0ZSB0aGlzIEFQSSB3aXRob3V0IG5vdGljZSBpbiB0aGUgZnV0dXJlLlxuICAgICAqXG4gICAgICogYGZhbHNlYCBieSBkZWZhdWx0LlxuICAgICAqL1xuICAgIGV4cGVyaW1lbnRhbFNhbWVCb25lQ291bnRzPzogYm9vbGVhbjtcbiAgfSxcbik6IHZvaWQge1xuICBjb25zb2xlLndhcm4oXG4gICAgJ1ZSTVV0aWxzLnJlbW92ZVVubmVjZXNzYXJ5Sm9pbnRzOiByZW1vdmVVbm5lY2Vzc2FyeUpvaW50cyBpcyBkZXByZWNhdGVkLiBVc2UgY29tYmluZVNrZWxldG9ucyBpbnN0ZWFkLiBjb21iaW5lU2tlbGV0b25zIGNvbnRyaWJ1dGVzIG1vcmUgdG8gdGhlIHBlcmZvcm1hbmNlIGltcHJvdmVtZW50LiBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgbmV4dCBtYWpvciB2ZXJzaW9uLicsXG4gICk7XG5cbiAgY29uc3QgZXhwZXJpbWVudGFsU2FtZUJvbmVDb3VudHMgPSBvcHRpb25zPy5leHBlcmltZW50YWxTYW1lQm9uZUNvdW50cyA/PyBmYWxzZTtcblxuICAvLyBUcmF2ZXJzZSBhbiBlbnRpcmUgdHJlZSwgYW5kIGNvbGxlY3QgYWxsIHNraW5uZWQgbWVzaGVzXG4gIGNvbnN0IHNraW5uZWRNZXNoZXM6IFRIUkVFLlNraW5uZWRNZXNoW10gPSBbXTtcblxuICByb290LnRyYXZlcnNlKChvYmopID0+IHtcbiAgICBpZiAob2JqLnR5cGUgIT09ICdTa2lubmVkTWVzaCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBza2lubmVkTWVzaGVzLnB1c2gob2JqIGFzIFRIUkVFLlNraW5uZWRNZXNoKTtcbiAgfSk7XG5cbiAgLy8gQSBtYXAgZnJvbSBtZXNoZXMgdG8gbmV3LXRvLW9sZCBib25lIGluZGV4IG1hcFxuICAvLyBzb21lIG1lc2hlcyBtaWdodCBzaGFyZSBhIHNhbWUgc2tpbkluZGV4IGF0dHJpYnV0ZSwgYW5kIHRoaXMgbWFwIGFsc28gcHJldmVudHMgdG8gY29udmVydCB0aGUgYXR0cmlidXRlIHR3aWNlXG4gIGNvbnN0IGF0dHJpYnV0ZVRvQm9uZUluZGV4TWFwTWFwOiBNYXA8XG4gICAgVEhSRUUuQnVmZmVyQXR0cmlidXRlIHwgVEhSRUUuSW50ZXJsZWF2ZWRCdWZmZXJBdHRyaWJ1dGUsXG4gICAgTWFwPG51bWJlciwgbnVtYmVyPlxuICA+ID0gbmV3IE1hcCgpO1xuXG4gIC8vIEEgbWF4aW11bSBudW1iZXIgb2YgYm9uZXNcbiAgbGV0IG1heEJvbmVzID0gMDtcblxuICAvLyBJdGVyYXRlIG92ZXIgYWxsIHNraW5uZWQgbWVzaGVzIGFuZCByZW1hcCBib25lcyBmb3IgZWFjaCBza2luIGluZGV4IGF0dHJpYnV0ZVxuICBmb3IgKGNvbnN0IG1lc2ggb2Ygc2tpbm5lZE1lc2hlcykge1xuICAgIGNvbnN0IGdlb21ldHJ5ID0gbWVzaC5nZW9tZXRyeTtcbiAgICBjb25zdCBhdHRyaWJ1dGUgPSBnZW9tZXRyeS5nZXRBdHRyaWJ1dGUoJ3NraW5JbmRleCcpO1xuXG4gICAgaWYgKGF0dHJpYnV0ZVRvQm9uZUluZGV4TWFwTWFwLmhhcyhhdHRyaWJ1dGUpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBjb25zdCBvbGRUb05ldyA9IG5ldyBNYXA8bnVtYmVyLCBudW1iZXI+KCk7IC8vIG1hcCBvZiBvbGQgYm9uZSBpbmRleCB2cy4gbmV3IGJvbmUgaW5kZXhcbiAgICBjb25zdCBuZXdUb09sZCA9IG5ldyBNYXA8bnVtYmVyLCBudW1iZXI+KCk7IC8vIG1hcCBvZiBuZXcgYm9uZSBpbmRleCB2cy4gb2xkIGJvbmUgaW5kZXhcblxuICAgIC8vIGNyZWF0ZSBhIG5ldyBib25lIG1hcFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXR0cmlidXRlLmNvdW50OyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgYXR0cmlidXRlLml0ZW1TaXplOyBqKyspIHtcbiAgICAgICAgY29uc3Qgb2xkSW5kZXggPSBhdHRyaWJ1dGUuZ2V0Q29tcG9uZW50KGksIGopO1xuICAgICAgICBsZXQgbmV3SW5kZXggPSBvbGRUb05ldy5nZXQob2xkSW5kZXgpO1xuXG4gICAgICAgIC8vIG5ldyBza2luSW5kZXggYnVmZmVyXG4gICAgICAgIGlmIChuZXdJbmRleCA9PSBudWxsKSB7XG4gICAgICAgICAgbmV3SW5kZXggPSBvbGRUb05ldy5zaXplO1xuICAgICAgICAgIG9sZFRvTmV3LnNldChvbGRJbmRleCwgbmV3SW5kZXgpO1xuICAgICAgICAgIG5ld1RvT2xkLnNldChuZXdJbmRleCwgb2xkSW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXR0cmlidXRlLnNldENvbXBvbmVudChpLCBqLCBuZXdJbmRleCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gcmVwbGFjZSB3aXRoIG5ldyBpbmRpY2VzXG4gICAgYXR0cmlidXRlLm5lZWRzVXBkYXRlID0gdHJ1ZTtcblxuICAgIC8vIHVwZGF0ZSBib25lTGlzdFxuICAgIGF0dHJpYnV0ZVRvQm9uZUluZGV4TWFwTWFwLnNldChhdHRyaWJ1dGUsIG5ld1RvT2xkKTtcblxuICAgIC8vIHVwZGF0ZSBtYXggYm9uZXMgY291bnRcbiAgICBtYXhCb25lcyA9IE1hdGgubWF4KG1heEJvbmVzLCBvbGRUb05ldy5zaXplKTtcbiAgfVxuXG4gIC8vIExldCdzIGFjdHVhbGx5IHNldCB0aGUgc2tlbGV0b25zXG4gIGZvciAoY29uc3QgbWVzaCBvZiBza2lubmVkTWVzaGVzKSB7XG4gICAgY29uc3QgZ2VvbWV0cnkgPSBtZXNoLmdlb21ldHJ5O1xuICAgIGNvbnN0IGF0dHJpYnV0ZSA9IGdlb21ldHJ5LmdldEF0dHJpYnV0ZSgnc2tpbkluZGV4Jyk7XG4gICAgY29uc3QgbmV3VG9PbGQgPSBhdHRyaWJ1dGVUb0JvbmVJbmRleE1hcE1hcC5nZXQoYXR0cmlidXRlKSE7XG5cbiAgICBjb25zdCBib25lczogVEhSRUUuQm9uZVtdID0gW107XG4gICAgY29uc3QgYm9uZUludmVyc2VzOiBUSFJFRS5NYXRyaXg0W10gPSBbXTtcblxuICAgIC8vIGlmIGBleHBlcmltZW50YWxTYW1lQm9uZUNvdW50c2AgaXMgYHRydWVgLCBjb21wZW5zYXRlIHNrZWxldG9ucyB3aXRoIGR1bW15IGJvbmVzIHRvIGtlZXAgdGhlIGJvbmUgY291bnQgc2FtZSBiZXR3ZWVuIHNrZWxldG9uc1xuICAgIGNvbnN0IG5Cb25lcyA9IGV4cGVyaW1lbnRhbFNhbWVCb25lQ291bnRzID8gbWF4Qm9uZXMgOiBuZXdUb09sZC5zaXplO1xuXG4gICAgZm9yIChsZXQgbmV3SW5kZXggPSAwOyBuZXdJbmRleCA8IG5Cb25lczsgbmV3SW5kZXgrKykge1xuICAgICAgY29uc3Qgb2xkSW5kZXggPSBuZXdUb09sZC5nZXQobmV3SW5kZXgpID8/IDA7XG5cbiAgICAgIGJvbmVzLnB1c2gobWVzaC5za2VsZXRvbi5ib25lc1tvbGRJbmRleF0pO1xuICAgICAgYm9uZUludmVyc2VzLnB1c2gobWVzaC5za2VsZXRvbi5ib25lSW52ZXJzZXNbb2xkSW5kZXhdKTtcbiAgICB9XG5cbiAgICBjb25zdCBza2VsZXRvbiA9IG5ldyBUSFJFRS5Ta2VsZXRvbihib25lcywgYm9uZUludmVyc2VzKTtcbiAgICBtZXNoLmJpbmQoc2tlbGV0b24sIG5ldyBUSFJFRS5NYXRyaXg0KCkpO1xuICAgIC8vICAgICAgICAgICAgICAgICAgXl5eXl5eXl5eXl5eXl5eXl5eXiB0cmFuc2Zvcm0gb2YgbWVzaGVzIHNob3VsZCBiZSBpZ25vcmVkXG4gICAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vS2hyb25vc0dyb3VwL2dsVEYvdHJlZS9tYXN0ZXIvc3BlY2lmaWNhdGlvbi8yLjAjc2tpbnNcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IEJ1ZmZlckF0dHJpYnV0ZSB9IGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBUcmF2ZXJzZSBnaXZlbiBvYmplY3QgYW5kIHJlbW92ZSB1bm5lY2Vzc2FyeSB2ZXJ0aWNlcyBmcm9tIGV2ZXJ5IEJ1ZmZlckdlb21ldHJpZXMuXG4gKiBUaGlzIG9ubHkgcHJvY2Vzc2VzIGJ1ZmZlciBnZW9tZXRyaWVzIHdpdGggaW5kZXggYnVmZmVyLlxuICpcbiAqIFRocmVlLmpzIGNyZWF0ZXMgbW9ycGggdGV4dHVyZXMgZm9yIGVhY2ggZ2VvbWV0cmllcyBhbmQgaXQgc29tZXRpbWVzIGNvbnN1bWVzIHVubmVjZXNzYXJ5IGFtb3VudCBvZiBWUkFNIGZvciBjZXJ0YWluIG1vZGVscy5cbiAqIFRoaXMgZnVuY3Rpb24gd2lsbCBvcHRpbWl6ZSBnZW9tZXRyaWVzIHRvIHJlZHVjZSB0aGUgc2l6ZSBvZiBtb3JwaCB0ZXh0dXJlLlxuICogU2VlOiBodHRwczovL2dpdGh1Yi5jb20vbXJkb29iL3RocmVlLmpzL2lzc3Vlcy8yMzA5NVxuICpcbiAqIEBwYXJhbSByb290IFJvb3Qgb2JqZWN0IHRoYXQgd2lsbCBiZSB0cmF2ZXJzZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZVVubmVjZXNzYXJ5VmVydGljZXMocm9vdDogVEhSRUUuT2JqZWN0M0QpOiB2b2lkIHtcbiAgY29uc3QgZ2VvbWV0cnlNYXAgPSBuZXcgTWFwPFRIUkVFLkJ1ZmZlckdlb21ldHJ5LCBUSFJFRS5CdWZmZXJHZW9tZXRyeT4oKTtcblxuICAvLyBUcmF2ZXJzZSBhbiBlbnRpcmUgdHJlZVxuICByb290LnRyYXZlcnNlKChvYmopID0+IHtcbiAgICBpZiAoIShvYmogYXMgYW55KS5pc01lc2gpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBtZXNoID0gb2JqIGFzIFRIUkVFLk1lc2g7XG4gICAgY29uc3QgZ2VvbWV0cnkgPSBtZXNoLmdlb21ldHJ5O1xuXG4gICAgLy8gaWYgdGhlIGdlb21ldHJ5IGRvZXMgbm90IGhhdmUgYW4gaW5kZXggYnVmZmVyIGl0IGRvZXMgbm90IG5lZWQgdG8gYmUgcHJvY2Vzc2VkXG4gICAgY29uc3Qgb3JpZ2luYWxJbmRleCA9IGdlb21ldHJ5LmluZGV4O1xuICAgIGlmIChvcmlnaW5hbEluZGV4ID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBza2lwIGFscmVhZHkgcHJvY2Vzc2VkIGdlb21ldHJ5XG4gICAgY29uc3QgbmV3R2VvbWV0cnlBbHJlYWR5RXhpc3RlZCA9IGdlb21ldHJ5TWFwLmdldChnZW9tZXRyeSk7XG4gICAgaWYgKG5ld0dlb21ldHJ5QWxyZWFkeUV4aXN0ZWQgIT0gbnVsbCkge1xuICAgICAgbWVzaC5nZW9tZXRyeSA9IG5ld0dlb21ldHJ5QWxyZWFkeUV4aXN0ZWQ7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gZGV0ZXJtaW5lIHdoaWNoIHZlcnRpY2VzIGFyZSB1c2VkIGluIHRoZSBnZW9tZXRyeVxuICAgIGNvbnN0IHZlcnRleENvdW50ID0gT2JqZWN0LnZhbHVlcyhnZW9tZXRyeS5hdHRyaWJ1dGVzKVswXS5jb3VudDtcbiAgICBjb25zdCB2ZXJ0ZXhJblVzZSA9IG5ldyBBcnJheSh2ZXJ0ZXhDb3VudCk7XG4gICAgbGV0IHZlcnRpY2VzVXNlZCA9IDA7XG5cbiAgICBjb25zdCBvcmlnaW5hbEluZGV4QXJyYXkgPSBvcmlnaW5hbEluZGV4LmFycmF5O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3JpZ2luYWxJbmRleEFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBpbmRleCA9IG9yaWdpbmFsSW5kZXhBcnJheVtpXTtcbiAgICAgIGlmICghdmVydGV4SW5Vc2VbaW5kZXhdKSB7XG4gICAgICAgIHZlcnRleEluVXNlW2luZGV4XSA9IHRydWU7XG4gICAgICAgIHZlcnRpY2VzVXNlZCsrO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGlmIHRoZSBnZW9tZXRyeSB1c2VzIGFsbCB2ZXJ0aWNlcyBpdCBkb2VzIG5vdCBuZWVkIHRvIGJlIHByb2Nlc3NlZFxuICAgIGlmICh2ZXJ0aWNlc1VzZWQgPT09IHZlcnRleENvdW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLyoqIGZyb20gb3JpZ2luYWwgaW5kZXggdG8gbmV3IGluZGV4ICovXG4gICAgY29uc3Qgb3JpZ2luYWxJbmRleE5ld0luZGV4TWFwOiBudW1iZXJbXSA9IFtdO1xuXG4gICAgLyoqIGZyb20gbmV3IGluZGV4IHRvIG9yaWdpbmFsIGluZGV4ICovXG4gICAgY29uc3QgbmV3SW5kZXhPcmlnaW5hbEluZGV4TWFwOiBudW1iZXJbXSA9IFtdO1xuXG4gICAgLy8gYXNzaWduIG5ldyBpbmRpY2VzXG4gICAgbGV0IGluZGV4SGVhZCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2ZXJ0ZXhJblVzZS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHZlcnRleEluVXNlW2ldKSB7XG4gICAgICAgIGNvbnN0IG5ld0luZGV4ID0gaW5kZXhIZWFkKys7XG4gICAgICAgIG9yaWdpbmFsSW5kZXhOZXdJbmRleE1hcFtpXSA9IG5ld0luZGV4O1xuICAgICAgICBuZXdJbmRleE9yaWdpbmFsSW5kZXhNYXBbbmV3SW5kZXhdID0gaTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBuZXdHZW9tZXRyeSA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeSgpO1xuXG4gICAgLy8gY29weSB2YXJpb3VzIHByb3BlcnRpZXNcbiAgICAvLyBSZWY6IGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvYmxvYi8xYTI0MWVmMTAwNDg3NzBkNTZlMDZkNmNkNmE2NGM3NmNjNzIwZjk1L3NyYy9jb3JlL0J1ZmZlckdlb21ldHJ5LmpzI0wxMDExXG4gICAgbmV3R2VvbWV0cnkubmFtZSA9IGdlb21ldHJ5Lm5hbWU7XG5cbiAgICBuZXdHZW9tZXRyeS5tb3JwaFRhcmdldHNSZWxhdGl2ZSA9IGdlb21ldHJ5Lm1vcnBoVGFyZ2V0c1JlbGF0aXZlO1xuXG4gICAgZ2VvbWV0cnkuZ3JvdXBzLmZvckVhY2goKGdyb3VwKSA9PiB7XG4gICAgICBuZXdHZW9tZXRyeS5hZGRHcm91cChncm91cC5zdGFydCwgZ3JvdXAuY291bnQsIGdyb3VwLm1hdGVyaWFsSW5kZXgpO1xuICAgIH0pO1xuXG4gICAgbmV3R2VvbWV0cnkuYm91bmRpbmdCb3ggPSBnZW9tZXRyeS5ib3VuZGluZ0JveD8uY2xvbmUoKSA/PyBudWxsO1xuICAgIG5ld0dlb21ldHJ5LmJvdW5kaW5nU3BoZXJlID0gZ2VvbWV0cnkuYm91bmRpbmdTcGhlcmU/LmNsb25lKCkgPz8gbnVsbDtcblxuICAgIG5ld0dlb21ldHJ5LnNldERyYXdSYW5nZShnZW9tZXRyeS5kcmF3UmFuZ2Uuc3RhcnQsIGdlb21ldHJ5LmRyYXdSYW5nZS5jb3VudCk7XG5cbiAgICBuZXdHZW9tZXRyeS51c2VyRGF0YSA9IGdlb21ldHJ5LnVzZXJEYXRhO1xuXG4gICAgLy8gc2V0IHRvIGdlb21ldHJ5TWFwXG4gICAgZ2VvbWV0cnlNYXAuc2V0KGdlb21ldHJ5LCBuZXdHZW9tZXRyeSk7XG5cbiAgICAvLyByZW9yZ2FuaXplIGluZGljZXNcbiAgICB7XG4gICAgICBjb25zdCBvcmlnaW5hbEluZGV4QXJyYXkgPSBvcmlnaW5hbEluZGV4LmFycmF5O1xuICAgICAgY29uc3QgbmV3SW5kZXhBcnJheSA9IG5ldyAob3JpZ2luYWxJbmRleEFycmF5LmNvbnN0cnVjdG9yIGFzIGFueSkob3JpZ2luYWxJbmRleEFycmF5Lmxlbmd0aCk7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3JpZ2luYWxJbmRleEFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IG9yaWdpbmFsSW5kZXggPSBvcmlnaW5hbEluZGV4QXJyYXlbaV07XG5cbiAgICAgICAgY29uc3QgbmV3SW5kZXggPSBvcmlnaW5hbEluZGV4TmV3SW5kZXhNYXBbb3JpZ2luYWxJbmRleF07XG4gICAgICAgIG5ld0luZGV4QXJyYXlbaV0gPSBuZXdJbmRleDtcbiAgICAgIH1cblxuICAgICAgbmV3R2VvbWV0cnkuc2V0SW5kZXgobmV3IEJ1ZmZlckF0dHJpYnV0ZShuZXdJbmRleEFycmF5LCAxLCBmYWxzZSkpO1xuICAgIH1cblxuICAgIC8vIHJlb3JnYW5pemUgYXR0cmlidXRlc1xuICAgIE9iamVjdC5rZXlzKGdlb21ldHJ5LmF0dHJpYnV0ZXMpLmZvckVhY2goKGF0dHJpYnV0ZU5hbWUpID0+IHtcbiAgICAgIGNvbnN0IG9yaWdpbmFsQXR0cmlidXRlID0gZ2VvbWV0cnkuYXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXSBhcyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGU7XG5cbiAgICAgIGlmICgob3JpZ2luYWxBdHRyaWJ1dGUgYXMgYW55KS5pc0ludGVybGVhdmVkQnVmZmVyQXR0cmlidXRlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigncmVtb3ZlVW5uZWNlc3NhcnlWZXJ0aWNlczogSW50ZXJsZWF2ZWRCdWZmZXJBdHRyaWJ1dGUgaXMgbm90IHN1cHBvcnRlZCcpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBvcmlnaW5hbEF0dHJpYnV0ZUFycmF5ID0gb3JpZ2luYWxBdHRyaWJ1dGUuYXJyYXk7XG4gICAgICBjb25zdCB7IGl0ZW1TaXplLCBub3JtYWxpemVkIH0gPSBvcmlnaW5hbEF0dHJpYnV0ZTtcblxuICAgICAgY29uc3QgbmV3QXR0cmlidXRlQXJyYXkgPSBuZXcgKG9yaWdpbmFsQXR0cmlidXRlQXJyYXkuY29uc3RydWN0b3IgYXMgYW55KShcbiAgICAgICAgbmV3SW5kZXhPcmlnaW5hbEluZGV4TWFwLmxlbmd0aCAqIGl0ZW1TaXplLFxuICAgICAgKTtcblxuICAgICAgbmV3SW5kZXhPcmlnaW5hbEluZGV4TWFwLmZvckVhY2goKG9yaWdpbmFsSW5kZXgsIGkpID0+IHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBpdGVtU2l6ZTsgaisrKSB7XG4gICAgICAgICAgbmV3QXR0cmlidXRlQXJyYXlbaSAqIGl0ZW1TaXplICsgal0gPSBvcmlnaW5hbEF0dHJpYnV0ZUFycmF5W29yaWdpbmFsSW5kZXggKiBpdGVtU2l6ZSArIGpdO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgbmV3R2VvbWV0cnkuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUsIG5ldyBCdWZmZXJBdHRyaWJ1dGUobmV3QXR0cmlidXRlQXJyYXksIGl0ZW1TaXplLCBub3JtYWxpemVkKSk7XG4gICAgfSk7XG5cbiAgICAvLyByZW9yZ2FuaXplIG1vcnBoIGF0dHJpYnV0ZXNcbiAgICAvKiogVHJ1ZSBpZiBhbGwgbW9ycGhzIGFyZSB6ZXJvLiAqL1xuICAgIGxldCBpc051bGxNb3JwaCA9IHRydWU7XG5cbiAgICBPYmplY3Qua2V5cyhnZW9tZXRyeS5tb3JwaEF0dHJpYnV0ZXMpLmZvckVhY2goKGF0dHJpYnV0ZU5hbWUpID0+IHtcbiAgICAgIG5ld0dlb21ldHJ5Lm1vcnBoQXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXSA9IFtdO1xuXG4gICAgICBjb25zdCBtb3JwaHMgPSBnZW9tZXRyeS5tb3JwaEF0dHJpYnV0ZXNbYXR0cmlidXRlTmFtZV07XG4gICAgICBmb3IgKGxldCBpTW9ycGggPSAwOyBpTW9ycGggPCBtb3JwaHMubGVuZ3RoOyBpTW9ycGgrKykge1xuICAgICAgICBjb25zdCBvcmlnaW5hbEF0dHJpYnV0ZSA9IG1vcnBoc1tpTW9ycGhdIGFzIFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZTtcblxuICAgICAgICBpZiAoKG9yaWdpbmFsQXR0cmlidXRlIGFzIGFueSkuaXNJbnRlcmxlYXZlZEJ1ZmZlckF0dHJpYnV0ZSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcigncmVtb3ZlVW5uZWNlc3NhcnlWZXJ0aWNlczogSW50ZXJsZWF2ZWRCdWZmZXJBdHRyaWJ1dGUgaXMgbm90IHN1cHBvcnRlZCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgb3JpZ2luYWxBdHRyaWJ1dGVBcnJheSA9IG9yaWdpbmFsQXR0cmlidXRlLmFycmF5O1xuICAgICAgICBjb25zdCB7IGl0ZW1TaXplLCBub3JtYWxpemVkIH0gPSBvcmlnaW5hbEF0dHJpYnV0ZTtcblxuICAgICAgICBjb25zdCBuZXdBdHRyaWJ1dGVBcnJheSA9IG5ldyAob3JpZ2luYWxBdHRyaWJ1dGVBcnJheS5jb25zdHJ1Y3RvciBhcyBhbnkpKFxuICAgICAgICAgIG5ld0luZGV4T3JpZ2luYWxJbmRleE1hcC5sZW5ndGggKiBpdGVtU2l6ZSxcbiAgICAgICAgKTtcblxuICAgICAgICBuZXdJbmRleE9yaWdpbmFsSW5kZXhNYXAuZm9yRWFjaCgob3JpZ2luYWxJbmRleCwgaSkgPT4ge1xuICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgaXRlbVNpemU7IGorKykge1xuICAgICAgICAgICAgbmV3QXR0cmlidXRlQXJyYXlbaSAqIGl0ZW1TaXplICsgal0gPSBvcmlnaW5hbEF0dHJpYnV0ZUFycmF5W29yaWdpbmFsSW5kZXggKiBpdGVtU2l6ZSArIGpdO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXNOdWxsTW9ycGggPSBpc051bGxNb3JwaCAmJiBuZXdBdHRyaWJ1dGVBcnJheS5ldmVyeSgodjogbnVtYmVyKSA9PiB2ID09PSAwKTtcblxuICAgICAgICBuZXdHZW9tZXRyeS5tb3JwaEF0dHJpYnV0ZXNbYXR0cmlidXRlTmFtZV1baU1vcnBoXSA9IG5ldyBCdWZmZXJBdHRyaWJ1dGUoXG4gICAgICAgICAgbmV3QXR0cmlidXRlQXJyYXksXG4gICAgICAgICAgaXRlbVNpemUsXG4gICAgICAgICAgbm9ybWFsaXplZCxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIElmIGFsbCBtb3JwaHMgYXJlIHplcm8sIGp1c3QgZGlzY2FyZCB0aGUgbW9ycGggYXR0cmlidXRlcyB3ZSd2ZSBqdXN0IG1hZGVcbiAgICBpZiAoaXNOdWxsTW9ycGgpIHtcbiAgICAgIG5ld0dlb21ldHJ5Lm1vcnBoQXR0cmlidXRlcyA9IHt9O1xuICAgIH1cblxuICAgIG1lc2guZ2VvbWV0cnkgPSBuZXdHZW9tZXRyeTtcbiAgfSk7XG5cbiAgQXJyYXkuZnJvbShnZW9tZXRyeU1hcC5rZXlzKCkpLmZvckVhY2goKG9yaWdpbmFsR2VvbWV0cnkpID0+IHtcbiAgICBvcmlnaW5hbEdlb21ldHJ5LmRpc3Bvc2UoKTtcbiAgfSk7XG59XG4iLCAiaW1wb3J0IHsgVlJNIH0gZnJvbSAnLi4vVlJNJztcblxuLyoqXG4gKiBJZiB0aGUgZ2l2ZW4gVlJNIGlzIFZSTTAuMCwgcm90YXRlIHRoZSBgdnJtLnNjZW5lYCBieSAxODAgZGVncmVlcyBhcm91bmQgdGhlIFkgYXhpcy5cbiAqXG4gKiBAcGFyYW0gdnJtIFRoZSB0YXJnZXQgVlJNXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByb3RhdGVWUk0wKHZybTogVlJNKTogdm9pZCB7XG4gIGlmICh2cm0ubWV0YT8ubWV0YVZlcnNpb24gPT09ICcwJykge1xuICAgIHZybS5zY2VuZS5yb3RhdGlvbi55ID0gTWF0aC5QSTtcbiAgfVxufVxuIiwgImltcG9ydCB7IGNvbWJpbmVNb3JwaHMgfSBmcm9tICcuL2NvbWJpbmVNb3JwaHMnO1xuaW1wb3J0IHsgY29tYmluZVNrZWxldG9ucyB9IGZyb20gJy4vY29tYmluZVNrZWxldG9ucyc7XG5pbXBvcnQgeyBkZWVwRGlzcG9zZSB9IGZyb20gJy4vZGVlcERpc3Bvc2UnO1xuaW1wb3J0IHsgcmVtb3ZlVW5uZWNlc3NhcnlKb2ludHMgfSBmcm9tICcuL3JlbW92ZVVubmVjZXNzYXJ5Sm9pbnRzJztcbmltcG9ydCB7IHJlbW92ZVVubmVjZXNzYXJ5VmVydGljZXMgfSBmcm9tICcuL3JlbW92ZVVubmVjZXNzYXJ5VmVydGljZXMnO1xuaW1wb3J0IHsgcm90YXRlVlJNMCB9IGZyb20gJy4vcm90YXRlVlJNMCc7XG5cbmV4cG9ydCBjbGFzcyBWUk1VdGlscyB7XG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gdGhpcyBjbGFzcyBpcyBub3QgbWVhbnQgdG8gYmUgaW5zdGFudGlhdGVkXG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNvbWJpbmVNb3JwaHMgPSBjb21iaW5lTW9ycGhzO1xuICBwdWJsaWMgc3RhdGljIGNvbWJpbmVTa2VsZXRvbnMgPSBjb21iaW5lU2tlbGV0b25zO1xuICBwdWJsaWMgc3RhdGljIGRlZXBEaXNwb3NlID0gZGVlcERpc3Bvc2U7XG4gIHB1YmxpYyBzdGF0aWMgcmVtb3ZlVW5uZWNlc3NhcnlKb2ludHMgPSByZW1vdmVVbm5lY2Vzc2FyeUpvaW50cztcbiAgcHVibGljIHN0YXRpYyByZW1vdmVVbm5lY2Vzc2FyeVZlcnRpY2VzID0gcmVtb3ZlVW5uZWNlc3NhcnlWZXJ0aWNlcztcbiAgcHVibGljIHN0YXRpYyByb3RhdGVWUk0wID0gcm90YXRlVlJNMDtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLFlBQVksV0FBVztBQ0V2QixZQUFZQSxZQUFXO0FNRnZCLFlBQVlBLFlBQVc7QUVBdkIsWUFBWUEsWUFBVztBRUN2QixZQUFZQSxZQUFXO0FHRHZCLFlBQVlBLFlBQVc7QUlBdkIsWUFBWUEsWUFBVztBRUF2QixZQUFZQSxZQUFXO0FJQXZCLFlBQVlBLGFBQVc7QUNBdkIsWUFBWUEsWUFBVztBQ0F2QixZQUFZQSxhQUFXO0FDQXZCLFlBQVlBLGFBQVc7QUNBdkIsWUFBWUEsYUFBVztBR0N2QixZQUFZQSxhQUFXO0FDQXZCLFlBQVlBLGFBQVc7QUlNdkIsWUFBWUEsYUFBVzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FwQ0FoQixJQUFNLGdCQUFOLGNBQWtDLGVBQVM7RUF1R2hELFlBQVksZ0JBQXdCO0FBQ2xDLFVBQU07QUExRlIsU0FBTyxTQUFTO0FBS2hCLFNBQU8sV0FBVztBQUtsQixTQUFPLGdCQUEyQztBQUtsRCxTQUFPLGlCQUE0QztBQUtuRCxTQUFPLGdCQUEyQztBQUtsRCxTQUFRLFNBQThCLENBQUM7QUFtRXJDLFNBQUssT0FBTyxpQkFBaUIsY0FBYztBQUMzQyxTQUFLLGlCQUFpQjtBQUd0QixTQUFLLE9BQU87QUFJWixTQUFLLFVBQVU7RUFDakI7Ozs7RUF2RUEsSUFBVyxRQUFzQztBQUMvQyxXQUFPLEtBQUs7RUFDZDs7Ozs7RUFRQSxJQUFXLHNCQUE4QjtBQUN2QyxRQUFJLEtBQUssa0JBQWtCLFNBQVM7QUFDbEMsYUFBTyxJQUFNLEtBQUssZUFBZSxJQUFNO0lBQ3pDLFdBQVcsS0FBSyxrQkFBa0IsU0FBUztBQUN6QyxhQUFPLEtBQUs7SUFDZCxPQUFPO0FBQ0wsYUFBTztJQUNUO0VBQ0Y7Ozs7O0VBTUEsSUFBVyx1QkFBK0I7QUFDeEMsUUFBSSxLQUFLLG1CQUFtQixTQUFTO0FBQ25DLGFBQU8sSUFBTSxLQUFLLGVBQWUsSUFBTTtJQUN6QyxXQUFXLEtBQUssbUJBQW1CLFNBQVM7QUFDMUMsYUFBTyxLQUFLO0lBQ2QsT0FBTztBQUNMLGFBQU87SUFDVDtFQUNGOzs7OztFQU1BLElBQVcsc0JBQThCO0FBQ3ZDLFFBQUksS0FBSyxrQkFBa0IsU0FBUztBQUNsQyxhQUFPLElBQU0sS0FBSyxlQUFlLElBQU07SUFDekMsV0FBVyxLQUFLLGtCQUFrQixTQUFTO0FBQ3pDLGFBQU8sS0FBSztJQUNkLE9BQU87QUFDTCxhQUFPO0lBQ1Q7RUFDRjs7OztFQUtBLElBQVcsZUFBdUI7QUFDaEMsUUFBSSxLQUFLLFVBQVU7QUFDakIsYUFBTyxLQUFLLFNBQVMsTUFBTSxJQUFNO0lBQ25DO0FBRUEsV0FBTyxLQUFLO0VBQ2Q7Ozs7OztFQXFCTyxRQUFRLE1BQStCO0FBQzVDLFNBQUssT0FBTyxLQUFLLElBQUk7RUFDdkI7Ozs7OztFQU9PLFdBQVcsTUFBK0I7QUFDL0MsVUFBTSxRQUFRLEtBQUssT0FBTyxRQUFRLElBQUk7QUFDdEMsUUFBSSxTQUFTLEdBQUc7QUFDZCxXQUFLLE9BQU8sT0FBTyxPQUFPLENBQUM7SUFDN0I7RUFDRjs7Ozs7RUFNTyxZQUFZLFNBT1Y7QUE1SlgsUUFBQTtBQTZKSSxRQUFJLGVBQWUsS0FBSztBQUN4QixxQkFBZ0IsS0FBQSxXQUFBLE9BQUEsU0FBQSxRQUFTLGVBQVQsT0FBQSxLQUF1QjtBQUd2QyxRQUFJLEtBQUssWUFBWSxlQUFlLEdBQUs7QUFDdkMscUJBQWU7SUFDakI7QUFFQSxTQUFLLE9BQU8sUUFBUSxDQUFDLFNBQVMsS0FBSyxZQUFZLFlBQVksQ0FBQztFQUM5RDs7OztFQUtPLHFCQUEyQjtBQUNoQyxTQUFLLE9BQU8sUUFBUSxDQUFDLFNBQVMsS0FBSyxtQkFBbUIsQ0FBQztFQUN6RDtBQUNGO0FFMUtBLFNBQVMsMEJBQTBCLE1BQVksV0FBbUIsTUFBMkM7QUFKN0csTUFBQSxJQUFBO0FBS0UsUUFBTSxPQUFPLEtBQUssT0FBTztBQXNEekIsUUFBTSxjQUFhLEtBQUEsS0FBSyxVQUFMLE9BQUEsU0FBQSxHQUFhLFNBQUE7QUFDaEMsTUFBSSxjQUFjLE1BQU07QUFDdEIsWUFBUSxLQUFLLG1EQUFtRCxTQUFTLHNDQUFzQztBQUMvRyxXQUFPO0VBQ1Q7QUFFQSxRQUFNLFlBQVksV0FBVztBQUM3QixNQUFJLGFBQWEsTUFBTTtBQUNyQixXQUFPO0VBQ1Q7QUFHQSxRQUFNLGNBQWEsS0FBQSxLQUFLLFdBQUwsT0FBQSxTQUFBLEdBQWMsU0FBQTtBQUNqQyxNQUFJLGNBQWMsTUFBTTtBQUN0QixZQUFRLEtBQUssb0RBQW9ELFNBQVMsc0NBQXNDO0FBQ2hILFdBQU87RUFDVDtBQUVBLFFBQU0saUJBQWlCLFdBQVcsV0FBVztBQUc3QyxRQUFNLGFBQTJCLENBQUM7QUFDbEMsT0FBSyxTQUFTLENBQUMsV0FBVztBQUN4QixRQUFJLFdBQVcsU0FBUyxnQkFBZ0I7QUFDdEMsVUFBSyxPQUFlLFFBQVE7QUFDMUIsbUJBQVcsS0FBSyxNQUFvQjtNQUN0QztJQUNGO0VBQ0YsQ0FBQztBQUVELFNBQU87QUFDVDtBQVdBLFNBQXNCLDhCQUE4QixNQUFZLFdBQWlEO0FBQUEsU0FBQUMsU0FBQSxNQUFBLE1BQUEsYUFBQTtBQUMvRyxVQUFNLE9BQXVCLE1BQU0sS0FBSyxPQUFPLGNBQWMsUUFBUSxTQUFTO0FBQzlFLFdBQU8sMEJBQTBCLE1BQU0sV0FBVyxJQUFJO0VBQ3hELENBQUE7QUFBQTtBQVdBLFNBQXNCLCtCQUErQixNQUFnRDtBQUFBLFNBQUFBLFNBQUEsTUFBQSxNQUFBLGFBQUE7QUFDbkcsVUFBTSxRQUEwQixNQUFNLEtBQUssT0FBTyxnQkFBZ0IsTUFBTTtBQUN4RSxVQUFNLE1BQU0sb0JBQUksSUFBMEI7QUFFMUMsVUFBTSxRQUFRLENBQUMsTUFBTSxVQUFVO0FBQzdCLFlBQU0sU0FBUywwQkFBMEIsTUFBTSxPQUFPLElBQUk7QUFDMUQsVUFBSSxVQUFVLE1BQU07QUFDbEIsWUFBSSxJQUFJLE9BQU8sTUFBTTtNQUN2QjtJQUNGLENBQUM7QUFFRCxXQUFPO0VBQ1QsQ0FBQTtBQUFBO0FDN0hPLElBQU0sMEJBQTBCO0VBQ3JDLElBQUk7RUFDSixJQUFJO0VBQ0osSUFBSTtFQUNKLElBQUk7RUFDSixJQUFJO0VBQ0osT0FBTztFQUNQLE9BQU87RUFDUCxPQUFPO0VBQ1AsS0FBSztFQUNMLFNBQVM7RUFDVCxRQUFRO0VBQ1IsV0FBVztFQUNYLFVBQVU7RUFDVixVQUFVO0VBQ1YsV0FBVztFQUNYLFdBQVc7RUFDWCxZQUFZO0VBQ1osU0FBUztBQUNYO0FDaEJPLFNBQVMsU0FBUyxPQUF1QjtBQUM5QyxTQUFPLEtBQUssSUFBSSxLQUFLLElBQUksT0FBTyxDQUFHLEdBQUcsQ0FBRztBQUMzQztBQ0hPLElBQU0sdUJBQU4sTUFBTSxzQkFBcUI7Ozs7RUFzRXpCLGNBQWM7QUFsRXJCLFNBQU8sdUJBQXVCLENBQUMsU0FBUyxhQUFhLFlBQVk7QUFLakUsU0FBTyx3QkFBd0IsQ0FBQyxZQUFZLGFBQWEsVUFBVSxVQUFVO0FBSzdFLFNBQU8sdUJBQXVCLENBQUMsTUFBTSxNQUFNLE1BQU0sTUFBTSxJQUFJO0FBTTNELFNBQVEsZUFBZ0MsQ0FBQztBQVF6QyxTQUFRLGlCQUFvRCxDQUFDO0VBNEM3RDtFQW5EQSxJQUFXLGNBQStCO0FBQ3hDLFdBQU8sS0FBSyxhQUFhLE9BQU87RUFDbEM7RUFNQSxJQUFXLGdCQUFtRDtBQUM1RCxXQUFPLE9BQU8sT0FBTyxDQUFDLEdBQUcsS0FBSyxjQUFjO0VBQzlDOzs7O0VBS0EsSUFBVyxzQkFBNkU7QUFDdEYsVUFBTSxTQUFnRSxDQUFDO0FBRXZFLFVBQU0sZ0JBQWdCLElBQUksSUFBWSxPQUFPLE9BQU8sdUJBQXVCLENBQUM7QUFFNUUsV0FBTyxRQUFRLEtBQUssY0FBYyxFQUFFLFFBQVEsQ0FBQyxDQUFDLE1BQU0sVUFBVSxNQUFNO0FBQ2xFLFVBQUksY0FBYyxJQUFJLElBQUksR0FBRztBQUMzQixlQUFPLElBQStCLElBQUk7TUFDNUM7SUFDRixDQUFDO0FBRUQsV0FBTztFQUNUOzs7O0VBS0EsSUFBVyxzQkFBeUQ7QUFDbEUsVUFBTSxTQUE0QyxDQUFDO0FBRW5ELFVBQU0sZ0JBQWdCLElBQUksSUFBWSxPQUFPLE9BQU8sdUJBQXVCLENBQUM7QUFFNUUsV0FBTyxRQUFRLEtBQUssY0FBYyxFQUFFLFFBQVEsQ0FBQyxDQUFDLE1BQU0sVUFBVSxNQUFNO0FBQ2xFLFVBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxHQUFHO0FBQzVCLGVBQU8sSUFBSSxJQUFJO01BQ2pCO0lBQ0YsQ0FBQztBQUVELFdBQU87RUFDVDs7Ozs7O0VBY08sS0FBSyxRQUFvQztBQUU5QyxVQUFNLGNBQWMsS0FBSyxhQUFhLE9BQU87QUFDN0MsZ0JBQVksUUFBUSxDQUFDLGVBQWU7QUFDbEMsV0FBSyxxQkFBcUIsVUFBVTtJQUN0QyxDQUFDO0FBR0QsV0FBTyxhQUFhLFFBQVEsQ0FBQyxlQUFlO0FBQzFDLFdBQUssbUJBQW1CLFVBQVU7SUFDcEMsQ0FBQztBQUdELFNBQUssdUJBQXVCLE9BQU8scUJBQXFCLE9BQU87QUFDL0QsU0FBSyx3QkFBd0IsT0FBTyxzQkFBc0IsT0FBTztBQUNqRSxTQUFLLHVCQUF1QixPQUFPLHFCQUFxQixPQUFPO0FBRS9ELFdBQU87RUFDVDs7Ozs7RUFNTyxRQUE4QjtBQUNuQyxXQUFPLElBQUksc0JBQXFCLEVBQUUsS0FBSyxJQUFJO0VBQzdDOzs7Ozs7O0VBUU8sY0FBYyxNQUE4RDtBQXJIckYsUUFBQTtBQXNISSxZQUFPLEtBQUEsS0FBSyxlQUFlLElBQUksTUFBeEIsT0FBQSxLQUE2QjtFQUN0Qzs7Ozs7O0VBT08sbUJBQW1CLFlBQWlDO0FBQ3pELFNBQUssYUFBYSxLQUFLLFVBQVU7QUFDakMsU0FBSyxlQUFlLFdBQVcsY0FBYyxJQUFJO0VBQ25EOzs7Ozs7RUFPTyxxQkFBcUIsWUFBaUM7QUFDM0QsVUFBTSxRQUFRLEtBQUssYUFBYSxRQUFRLFVBQVU7QUFDbEQsUUFBSSxVQUFVLElBQUk7QUFDaEIsY0FBUSxLQUFLLG1FQUFtRTtJQUNsRjtBQUVBLFNBQUssYUFBYSxPQUFPLE9BQU8sQ0FBQztBQUNqQyxXQUFPLEtBQUssZUFBZSxXQUFXLGNBQWM7RUFDdEQ7Ozs7Ozs7RUFRTyxTQUFTLE1BQXVEO0FBeEp6RSxRQUFBO0FBeUpJLFVBQU0sYUFBYSxLQUFLLGNBQWMsSUFBSTtBQUMxQyxZQUFPLEtBQUEsY0FBQSxPQUFBLFNBQUEsV0FBWSxXQUFaLE9BQUEsS0FBc0I7RUFDL0I7Ozs7Ozs7RUFRTyxTQUFTLE1BQXdDLFFBQXNCO0FBQzVFLFVBQU0sYUFBYSxLQUFLLGNBQWMsSUFBSTtBQUMxQyxRQUFJLFlBQVk7QUFDZCxpQkFBVyxTQUFTLFNBQVMsTUFBTTtJQUNyQztFQUNGOzs7O0VBS08sY0FBb0I7QUFDekIsU0FBSyxhQUFhLFFBQVEsQ0FBQyxlQUFlO0FBQ3hDLGlCQUFXLFNBQVM7SUFDdEIsQ0FBQztFQUNIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUE0Qk8sdUJBQXVCLE1BQXVEO0FBQ25GLFVBQU0sYUFBYSxLQUFLLGNBQWMsSUFBSTtBQUMxQyxXQUFPLGFBQWEsR0FBRyxXQUFXLElBQUksWUFBWTtFQUNwRDs7OztFQUtPLFNBQWU7QUFFcEIsVUFBTSxvQkFBb0IsS0FBSyw0QkFBNEI7QUFHM0QsU0FBSyxhQUFhLFFBQVEsQ0FBQyxlQUFlO0FBQ3hDLGlCQUFXLG1CQUFtQjtJQUNoQyxDQUFDO0FBR0QsU0FBSyxhQUFhLFFBQVEsQ0FBQyxlQUFlO0FBQ3hDLFVBQUksYUFBYTtBQUNqQixZQUFNLE9BQU8sV0FBVztBQUV4QixVQUFJLEtBQUsscUJBQXFCLFFBQVEsSUFBSSxNQUFNLElBQUk7QUFDbEQsc0JBQWMsa0JBQWtCO01BQ2xDO0FBRUEsVUFBSSxLQUFLLHNCQUFzQixRQUFRLElBQUksTUFBTSxJQUFJO0FBQ25ELHNCQUFjLGtCQUFrQjtNQUNsQztBQUVBLFVBQUksS0FBSyxxQkFBcUIsUUFBUSxJQUFJLE1BQU0sSUFBSTtBQUNsRCxzQkFBYyxrQkFBa0I7TUFDbEM7QUFFQSxpQkFBVyxZQUFZLEVBQUUsV0FBVyxDQUFDO0lBQ3ZDLENBQUM7RUFDSDs7OztFQUtRLDhCQUlOO0FBQ0EsUUFBSSxRQUFRO0FBQ1osUUFBSSxTQUFTO0FBQ2IsUUFBSSxRQUFRO0FBRVosU0FBSyxhQUFhLFFBQVEsQ0FBQyxlQUFlO0FBQ3hDLGVBQVMsV0FBVztBQUNwQixnQkFBVSxXQUFXO0FBQ3JCLGVBQVMsV0FBVztJQUN0QixDQUFDO0FBRUQsWUFBUSxLQUFLLElBQUksR0FBSyxLQUFLO0FBQzNCLGFBQVMsS0FBSyxJQUFJLEdBQUssTUFBTTtBQUM3QixZQUFRLEtBQUssSUFBSSxHQUFLLEtBQUs7QUFFM0IsV0FBTyxFQUFFLE9BQU8sUUFBUSxNQUFNO0VBQ2hDO0FBQ0Y7QUN6UU8sSUFBTSxpQ0FBaUM7RUFDNUMsT0FBTztFQUNQLGVBQWU7RUFDZixZQUFZO0VBQ1osYUFBYTtFQUNiLFVBQVU7RUFDVixjQUFjO0FBQ2hCO0FBS08sSUFBTSwrQkFBOEY7RUFDekcsUUFBUSwrQkFBK0I7RUFDdkMsZ0JBQWdCLCtCQUErQjtFQUMvQyxhQUFhLCtCQUErQjtFQUM1QyxXQUFXLCtCQUErQjtFQUMxQyxlQUFlLCtCQUErQjtBQUNoRDtBQ2hCQSxJQUFNLFNBQVMsSUFBVSxhQUFNO0FBc0J4QixJQUFNLGtDQUFOLE1BQU1DLGlDQUE0RDtFQXNEaEUsWUFBWTtJQUNqQjtJQUNBO0lBQ0E7SUFDQTtFQUNGLEdBb0JHO0FBQ0QsU0FBSyxXQUFXO0FBQ2hCLFNBQUssT0FBTztBQUNaLFNBQUssY0FBYztBQUNuQixTQUFLLGNBQWMsZUFBQSxPQUFBLGNBQWU7QUFHbEMsVUFBTSxRQUFRLEtBQUssb0JBQW9CO0FBQ3ZDLFVBQU0sUUFBUSxLQUFLLG9CQUFvQjtBQUN2QyxTQUFLLFNBQVMsRUFBRSxPQUFPLE1BQU07RUFDL0I7RUFFTyxZQUFZLFFBQXNCO0FBQ3ZDLFVBQU0sRUFBRSxPQUFPLE1BQU0sSUFBSSxLQUFLO0FBRTlCLFFBQUksU0FBUyxNQUFNO0FBQ2pCLFlBQU0sRUFBRSxjQUFjLFdBQVcsSUFBSTtBQUVyQyxZQUFNLFNBQVUsS0FBSyxTQUFpQixZQUFZO0FBQ2xELFVBQUksVUFBVSxRQUFXO0FBQ3ZCLGVBQU8sSUFBSSxPQUFPLEtBQUssVUFBVSxFQUFFLGVBQWUsTUFBTSxDQUFDO01BQzNEO0lBQ0Y7QUFFQSxRQUFJLFNBQVMsTUFBTTtBQUNqQixZQUFNLEVBQUUsY0FBYyxXQUFXLElBQUk7QUFFckMsWUFBTSxTQUFVLEtBQUssU0FBaUIsWUFBWTtBQUNsRCxVQUFJLFVBQVUsUUFBVztBQUNyQixhQUFLLFNBQWlCLFlBQVksS0FBZ0IsYUFBYTtNQUNuRTtJQUNGO0VBQ0Y7RUFFTyxxQkFBMkI7QUFDaEMsVUFBTSxFQUFFLE9BQU8sTUFBTSxJQUFJLEtBQUs7QUFFOUIsUUFBSSxTQUFTLE1BQU07QUFDakIsWUFBTSxFQUFFLGNBQWMsYUFBYSxJQUFJO0FBRXZDLFlBQU0sU0FBVSxLQUFLLFNBQWlCLFlBQVk7QUFDbEQsVUFBSSxVQUFVLFFBQVc7QUFDdkIsZUFBTyxLQUFLLFlBQVk7TUFDMUI7SUFDRjtBQUVBLFFBQUksU0FBUyxNQUFNO0FBQ2pCLFlBQU0sRUFBRSxjQUFjLGFBQWEsSUFBSTtBQUV2QyxZQUFNLFNBQVUsS0FBSyxTQUFpQixZQUFZO0FBQ2xELFVBQUksVUFBVSxRQUFXO0FBQ3JCLGFBQUssU0FBaUIsWUFBWSxJQUFlO01BQ3JEO0lBQ0Y7RUFDRjtFQUVRLHNCQUE2QztBQWpLdkQsUUFBQSxJQUFBLElBQUE7QUFrS0ksVUFBTSxFQUFFLFVBQVUsTUFBTSxZQUFZLElBQUk7QUFFeEMsVUFBTSxrQkFBa0IsS0FBSyxvQkFBb0I7QUFDakQsVUFBTSxnQkFBZSxNQUFBLEtBQUEsbUJBQUEsT0FBQSxTQUFBLGdCQUFrQixJQUFBLE1BQWxCLE9BQUEsU0FBQSxHQUEwQixDQUFBLE1BQTFCLE9BQUEsS0FBZ0M7QUFFckQsUUFBSSxnQkFBZ0IsTUFBTTtBQUN4QixjQUFRO1FBQ04sdURBQ0UsS0FBQSxTQUFTLFNBQVQsT0FBQSxLQUFpQixXQUNuQixjQUFjLElBQUk7TUFDcEI7QUFFQSxhQUFPO0lBQ1Q7QUFFQSxVQUFNLFNBQVUsU0FBaUIsWUFBWTtBQUU3QyxVQUFNLGVBQWUsT0FBTyxNQUFNO0FBR2xDLFVBQU0sYUFBYSxJQUFVO01BQzNCLFlBQVksSUFBSSxhQUFhO01BQzdCLFlBQVksSUFBSSxhQUFhO01BQzdCLFlBQVksSUFBSSxhQUFhO0lBQy9CO0FBRUEsV0FBTyxFQUFFLGNBQWMsY0FBYyxXQUFXO0VBQ2xEO0VBRVEsc0JBQTZDO0FBL0x2RCxRQUFBLElBQUEsSUFBQTtBQWdNSSxVQUFNLEVBQUUsVUFBVSxNQUFNLFlBQVksSUFBSTtBQUV4QyxVQUFNLGtCQUFrQixLQUFLLG9CQUFvQjtBQUNqRCxVQUFNLGdCQUFlLE1BQUEsS0FBQSxtQkFBQSxPQUFBLFNBQUEsZ0JBQWtCLElBQUEsTUFBbEIsT0FBQSxTQUFBLEdBQTBCLENBQUEsTUFBMUIsT0FBQSxLQUFnQztBQUVyRCxRQUFJLGdCQUFnQixRQUFRLGdCQUFnQixHQUFLO0FBQy9DLGNBQVE7UUFDTix1REFDRSxLQUFBLFNBQVMsU0FBVCxPQUFBLEtBQWlCLFdBQ25CLGNBQWMsSUFBSTtNQUNwQjtBQUVBLGFBQU87SUFDVDtBQUVBLFFBQUksZ0JBQWdCLE1BQU07QUFDeEIsYUFBTztJQUNUO0FBRUEsVUFBTSxlQUFnQixTQUFpQixZQUFZO0FBRW5ELFVBQU0sYUFBYSxjQUFjO0FBRWpDLFdBQU8sRUFBRSxjQUFjLGNBQWMsV0FBVztFQUNsRDtFQUVRLHNCQUVDO0FBNU5YLFFBQUEsSUFBQTtBQTZOSSxZQUNFLE1BQUEsS0FBQSxPQUFPLFFBQVFBLGlDQUErQixtQkFBbUIsRUFBRSxLQUFLLENBQUMsQ0FBQyxhQUFhLE1BQU07QUFDM0YsYUFBUSxLQUFLLFNBQWlCLGFBQWEsTUFBTTtJQUNuRCxDQUFDLE1BRkQsT0FBQSxTQUFBLEdBRUssQ0FBQSxNQUZMLE9BQUEsS0FFVztFQUVmO0FBQ0Y7QUF6TWEsZ0NBUUksc0JBRVg7RUFDRix3QkFBd0I7SUFDdEIsT0FBTyxDQUFDLFNBQVMsU0FBUztJQUMxQixlQUFlLENBQUMsWUFBWSxJQUFJO0VBQ2xDO0VBQ0EscUJBQXFCO0lBQ25CLE9BQU8sQ0FBQyxTQUFTLFNBQVM7RUFDNUI7RUFDQSxpQkFBaUI7SUFDZixPQUFPLENBQUMsU0FBUyxTQUFTO0lBQzFCLGVBQWUsQ0FBQyxZQUFZLElBQUk7SUFDaEMsY0FBYyxDQUFDLHNCQUFzQixJQUFJO0lBQ3pDLGFBQWEsQ0FBQyxnQkFBZ0IsSUFBSTtJQUNsQyxVQUFVLENBQUMsNEJBQTRCLElBQUk7SUFDM0MsWUFBWSxDQUFDLG9CQUFvQixJQUFJO0VBQ3ZDO0FBQ0Y7QUExQkssSUFBTSxpQ0FBTjtBQ3BCQSxJQUFNLCtCQUFOLE1BQWdFO0VBZ0I5RCxZQUFZO0lBQ2pCO0lBQ0E7SUFDQTtFQUNGLEdBZUc7QUFDRCxTQUFLLGFBQWE7QUFDbEIsU0FBSyxRQUFRO0FBQ2IsU0FBSyxTQUFTO0VBQ2hCO0VBRU8sWUFBWSxRQUFzQjtBQUN2QyxTQUFLLFdBQVcsUUFBUSxDQUFDLFNBQVM7QUFoRHRDLFVBQUE7QUFpRE0sWUFBSSxLQUFBLEtBQUssMEJBQUwsT0FBQSxTQUFBLEdBQTZCLEtBQUssS0FBQSxNQUFVLE1BQU07QUFDcEQsYUFBSyxzQkFBc0IsS0FBSyxLQUFLLEtBQUssS0FBSyxTQUFTO01BQzFEO0lBQ0YsQ0FBQztFQUNIO0VBRU8scUJBQTJCO0FBQ2hDLFNBQUssV0FBVyxRQUFRLENBQUMsU0FBUztBQXhEdEMsVUFBQTtBQXlETSxZQUFJLEtBQUEsS0FBSywwQkFBTCxPQUFBLFNBQUEsR0FBNkIsS0FBSyxLQUFBLE1BQVUsTUFBTTtBQUNwRCxhQUFLLHNCQUFzQixLQUFLLEtBQUssSUFBSTtNQUMzQztJQUNGLENBQUM7RUFDSDtBQUNGO0FDM0RBLElBQU0sTUFBTSxJQUFVLGVBQVE7QUFLdkIsSUFBTSxxQ0FBTixNQUFNQyxvQ0FBK0Q7RUFrRG5FLFlBQVk7SUFDakI7SUFDQTtJQUNBO0VBQ0YsR0FlRztBQTdFTCxRQUFBLElBQUE7QUE4RUksU0FBSyxXQUFXO0FBQ2hCLFNBQUssUUFBUTtBQUNiLFNBQUssU0FBUztBQUVkLFVBQU0saUJBQWdCLEtBQUEsT0FBTyxRQUFRQSxvQ0FBa0MsaUJBQWlCLEVBQUU7TUFDeEYsQ0FBQyxDQUFDLGFBQWEsTUFBTTtBQUNuQixlQUFRLFNBQWlCLGFBQWEsTUFBTTtNQUM5QztJQUNGLE1BSnNCLE9BQUEsU0FBQSxHQUlsQixDQUFBO0FBRUosUUFBSSxpQkFBaUIsTUFBTTtBQUN6QixjQUFRO1FBQ04sMERBQ0UsS0FBQSxTQUFTLFNBQVQsT0FBQSxLQUFpQixXQUNuQjtNQUNGO0FBRUEsV0FBSyxjQUFjLENBQUM7SUFDdEIsT0FBTztBQUNMLFdBQUssY0FBYyxDQUFDO0FBRXBCLG9CQUFjLFFBQVEsQ0FBQyxpQkFBaUI7QUFuRzlDLFlBQUFDO0FBb0dRLGNBQU0sV0FBWUEsTUFBQSxTQUFpQixZQUFZLE1BQTdCLE9BQUEsU0FBQUEsSUFBOEQsTUFBQTtBQUNoRixZQUFJLENBQUMsU0FBUztBQUNaLGlCQUFPO1FBQ1Q7QUFFQyxpQkFBaUIsWUFBWSxJQUFJO0FBRWxDLGNBQU0sZ0JBQWdCLFFBQVEsT0FBTyxNQUFNO0FBQzNDLGNBQU0sZUFBZSxRQUFRLE9BQU8sTUFBTTtBQUMxQyxjQUFNLGNBQWMsT0FBTyxNQUFNLEVBQUUsSUFBSSxhQUFhO0FBQ3BELGNBQU0sYUFBYSxNQUFNLE1BQU0sRUFBRSxJQUFJLFlBQVk7QUFFakQsYUFBSyxZQUFZLEtBQUs7VUFDcEIsTUFBTTtVQUNOO1VBQ0E7VUFDQTtVQUNBO1FBQ0YsQ0FBQztNQUNILENBQUM7SUFDSDtFQUNGO0VBRU8sWUFBWSxRQUFzQjtBQUN2QyxTQUFLLFlBQVksUUFBUSxDQUFDLGFBQWE7QUFDckMsWUFBTSxTQUFVLEtBQUssU0FBaUIsU0FBUyxJQUFJO0FBQ25ELFVBQUksV0FBVyxRQUFXO0FBQ3hCO01BQ0Y7QUFFQSxhQUFPLE9BQU8sSUFBSSxJQUFJLEtBQUssU0FBUyxXQUFXLEVBQUUsZUFBZSxNQUFNLENBQUM7QUFDdkUsYUFBTyxPQUFPLElBQUksSUFBSSxLQUFLLFNBQVMsVUFBVSxFQUFFLGVBQWUsTUFBTSxDQUFDO0lBQ3hFLENBQUM7RUFDSDtFQUVPLHFCQUEyQjtBQUNoQyxTQUFLLFlBQVksUUFBUSxDQUFDLGFBQWE7QUFDckMsWUFBTSxTQUFVLEtBQUssU0FBaUIsU0FBUyxJQUFJO0FBQ25ELFVBQUksV0FBVyxRQUFXO0FBQ3hCO01BQ0Y7QUFFQSxhQUFPLE9BQU8sS0FBSyxTQUFTLGFBQWE7QUFDekMsYUFBTyxPQUFPLEtBQUssU0FBUyxZQUFZO0lBQzFDLENBQUM7RUFDSDtBQUNGO0FBMUlhLG1DQUNJLG9CQUEyRDtFQUN4RSx3QkFBd0I7SUFDdEI7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtFQUNGO0VBQ0EscUJBQXFCLENBQUMsT0FBTyxlQUFlLFVBQVU7RUFDdEQsaUJBQWlCO0lBQ2Y7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7RUFDRjtBQUNGO0FBdEJLLElBQU0sb0NBQU47QVJTUCxJQUFNLHlCQUF5QixvQkFBSSxJQUFJLENBQUMsT0FBTyxVQUFVLENBQUM7QUFLbkQsSUFBTSw2QkFBTixNQUFNQyw0QkFBc0Q7RUF5QmpFLElBQVcsT0FBZTtBQUV4QixXQUFPO0VBQ1Q7RUFFTyxZQUFZLFFBQW9CO0FBQ3JDLFNBQUssU0FBUztFQUNoQjtFQUVhLFVBQVUsTUFBMkI7QUFBQSxXQUFBSixTQUFBLE1BQUEsTUFBQSxhQUFBO0FBQ2hELFdBQUssU0FBUyx1QkFBdUIsTUFBTSxLQUFLLFFBQVEsSUFBSTtJQUM5RCxDQUFBO0VBQUE7Ozs7OztFQU9jLFFBQVEsTUFBa0Q7QUFBQSxXQUFBQSxTQUFBLE1BQUEsTUFBQSxhQUFBO0FBQ3RFLFlBQU0sV0FBVyxNQUFNLEtBQUssVUFBVSxJQUFJO0FBQzFDLFVBQUksVUFBVTtBQUNaLGVBQU87TUFDVDtBQUVBLFlBQU0sV0FBVyxNQUFNLEtBQUssVUFBVSxJQUFJO0FBQzFDLFVBQUksVUFBVTtBQUNaLGVBQU87TUFDVDtBQUVBLGFBQU87SUFDVCxDQUFBO0VBQUE7RUFFYyxVQUFVLE1BQWtEO0FBQUEsV0FBQUEsU0FBQSxNQUFBLE1BQUEsYUFBQTtBQS9FNUUsVUFBQSxJQUFBO0FBZ0ZJLFlBQU0sT0FBTyxLQUFLLE9BQU87QUFHekIsWUFBTSxjQUFZLEtBQUEsS0FBSyxtQkFBTCxPQUFBLFNBQUEsR0FBcUIsUUFBUSxVQUFBLE9BQWdCO0FBQy9ELFVBQUksQ0FBQyxXQUFXO0FBQ2QsZUFBTztNQUNUO0FBRUEsWUFBTSxhQUFZLEtBQUEsS0FBSyxlQUFMLE9BQUEsU0FBQSxHQUFrQixVQUFBO0FBQ3BDLFVBQUksQ0FBQyxXQUFXO0FBQ2QsZUFBTztNQUNUO0FBRUEsWUFBTSxjQUFjLFVBQVU7QUFDOUIsVUFBSSxDQUFDLHVCQUF1QixJQUFJLFdBQVcsR0FBRztBQUM1QyxnQkFBUSxLQUFLLDREQUE0RCxXQUFXLEdBQUc7QUFDdkYsZUFBTztNQUNUO0FBRUEsWUFBTSxvQkFBb0IsVUFBVTtBQUNwQyxVQUFJLENBQUMsbUJBQW1CO0FBQ3RCLGVBQU87TUFDVDtBQUdBLFlBQU0sZ0JBQWdCLElBQUksSUFBWSxPQUFPLE9BQU8sdUJBQXVCLENBQUM7QUFDNUUsWUFBTSwwQkFBMEIsb0JBQUksSUFBb0M7QUFFeEUsVUFBSSxrQkFBa0IsVUFBVSxNQUFNO0FBQ3BDLGVBQU8sUUFBUSxrQkFBa0IsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDLE1BQU0sZ0JBQWdCLE1BQU07QUFDN0UsY0FBSSxvQkFBb0IsTUFBTTtBQUM1QjtVQUNGO0FBRUEsY0FBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLEdBQUc7QUFDNUIsb0JBQVEsS0FBSyxtREFBbUQsSUFBSSxxQ0FBcUM7QUFDekc7VUFDRjtBQUVBLGtDQUF3QixJQUFJLE1BQU0sZ0JBQWdCO1FBQ3BELENBQUM7TUFDSDtBQUVBLFVBQUksa0JBQWtCLFVBQVUsTUFBTTtBQUNwQyxlQUFPLFFBQVEsa0JBQWtCLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQyxNQUFNLGdCQUFnQixNQUFNO0FBQzdFLGNBQUksY0FBYyxJQUFJLElBQUksR0FBRztBQUMzQixvQkFBUTtjQUNOLHlFQUF5RSxJQUFJO1lBQy9FO0FBQ0E7VUFDRjtBQUVBLGtDQUF3QixJQUFJLE1BQU0sZ0JBQWdCO1FBQ3BELENBQUM7TUFDSDtBQUdBLFlBQU0sVUFBVSxJQUFJLHFCQUFxQjtBQUd6QyxZQUFNLFFBQVE7UUFDWixNQUFNLEtBQUssd0JBQXdCLFFBQVEsQ0FBQyxFQUFFLElBQUksQ0FBTyxPQUE2QkEsU0FBQSxNQUFBLENBQTdCLEVBQUEsR0FBNkIsV0FBN0IsQ0FBQyxNQUFNLGdCQUFnQixHQUFNO0FBN0k1RixjQUFBRyxLQUFBRSxLQUFBLElBQUEsSUFBQSxJQUFBLElBQUE7QUE4SVEsZ0JBQU0sYUFBYSxJQUFJLGNBQWMsSUFBSTtBQUN6QyxlQUFLLE1BQU0sSUFBSSxVQUFVO0FBRXpCLHFCQUFXLFlBQVdGLE1BQUEsaUJBQWlCLGFBQWpCLE9BQUFBLE1BQTZCO0FBQ25ELHFCQUFXLGlCQUFnQkUsTUFBQSxpQkFBaUIsa0JBQWpCLE9BQUFBLE1BQWtDO0FBQzdELHFCQUFXLGtCQUFpQixLQUFBLGlCQUFpQixtQkFBakIsT0FBQSxLQUFtQztBQUMvRCxxQkFBVyxpQkFBZ0IsS0FBQSxpQkFBaUIsa0JBQWpCLE9BQUEsS0FBa0M7QUFFN0QsV0FBQSxLQUFBLGlCQUFpQixxQkFBakIsT0FBQSxTQUFBLEdBQW1DLFFBQVEsQ0FBTyxTQUFTTCxTQUFBLE1BQUEsTUFBQSxhQUFBO0FBdEpuRSxnQkFBQUc7QUF1SlUsZ0JBQUksS0FBSyxTQUFTLFVBQWEsS0FBSyxVQUFVLFFBQVc7QUFDdkQ7WUFDRjtBQUVBLGtCQUFNLGFBQWMsTUFBTSw4QkFBOEIsTUFBTSxLQUFLLElBQUk7QUFDdkUsa0JBQU0sbUJBQW1CLEtBQUs7QUFHOUIsZ0JBQ0UsQ0FBQyxXQUFXO2NBQ1YsQ0FBQyxjQUNDLE1BQU0sUUFBUSxVQUFVLHFCQUFxQixLQUM3QyxtQkFBbUIsVUFBVSxzQkFBc0I7WUFDdkQsR0FDQTtBQUNBLHNCQUFRO2dCQUNOLDhCQUE4QixpQkFBaUIsSUFBSSw2QkFBNkIsZ0JBQWdCO2NBQ2xHO0FBQ0E7WUFDRjtBQUVBLHVCQUFXO2NBQ1QsSUFBSSw2QkFBNkI7Z0JBQy9CO2dCQUNBLE9BQU87Z0JBQ1AsU0FBUUEsTUFBQSxLQUFLLFdBQUwsT0FBQUEsTUFBZTtjQUN6QixDQUFDO1lBQ0g7VUFDRixDQUFBLENBQUE7QUFFQSxjQUFJLGlCQUFpQixzQkFBc0IsaUJBQWlCLHVCQUF1QjtBQUVqRixrQkFBTSxnQkFBa0MsQ0FBQztBQUN6QyxpQkFBSyxNQUFNLFNBQVMsQ0FBQyxXQUFXO0FBQzlCLG9CQUFNLFdBQVksT0FBZTtBQUNqQyxrQkFBSSxVQUFVO0FBQ1osb0JBQUksTUFBTSxRQUFRLFFBQVEsR0FBRztBQUMzQixnQ0FBYyxLQUFLLEdBQUcsUUFBUTtnQkFDaEMsT0FBTztBQUNMLGdDQUFjLEtBQUssUUFBUTtnQkFDN0I7Y0FDRjtZQUNGLENBQUM7QUFFRCxhQUFBLEtBQUEsaUJBQWlCLHVCQUFqQixPQUFBLFNBQUEsR0FBcUMsUUFBUSxDQUFPLFNBQVNILFNBQUEsTUFBQSxNQUFBLGFBQUE7QUFDM0Qsb0JBQU0sWUFBWSxjQUFjLE9BQU8sQ0FBQyxhQUFhO0FBcE1qRSxvQkFBQUc7QUFxTWMsc0JBQU0saUJBQWdCQSxNQUFBLEtBQUssT0FBTyxhQUFhLElBQUksUUFBUSxNQUFyQyxPQUFBLFNBQUFBLElBQXdDO0FBQzlELHVCQUFPLEtBQUssYUFBYTtjQUMzQixDQUFDO0FBRUQsd0JBQVUsUUFBUSxDQUFDLGFBQWE7QUFDOUIsMkJBQVc7a0JBQ1QsSUFBSSwrQkFBK0I7b0JBQ2pDO29CQUNBLE1BQU0sS0FBSztvQkFDWCxhQUFhLElBQVUsYUFBTSxFQUFFLFVBQVUsS0FBSyxXQUFXO29CQUN6RCxhQUFhLEtBQUssWUFBWSxDQUFDO2tCQUNqQyxDQUFDO2dCQUNIO2NBQ0YsQ0FBQztZQUNILENBQUEsQ0FBQTtBQUVBLGFBQUEsS0FBQSxpQkFBaUIsMEJBQWpCLE9BQUEsU0FBQSxHQUF3QyxRQUFRLENBQU8sU0FBU0gsU0FBQSxNQUFBLE1BQUEsYUFBQTtBQUM5RCxvQkFBTSxZQUFZLGNBQWMsT0FBTyxDQUFDLGFBQWE7QUF0TmpFLG9CQUFBRztBQXVOYyxzQkFBTSxpQkFBZ0JBLE1BQUEsS0FBSyxPQUFPLGFBQWEsSUFBSSxRQUFRLE1BQXJDLE9BQUEsU0FBQUEsSUFBd0M7QUFDOUQsdUJBQU8sS0FBSyxhQUFhO2NBQzNCLENBQUM7QUFFRCx3QkFBVSxRQUFRLENBQUMsYUFBYTtBQTNONUMsb0JBQUFBLEtBQUFFO0FBNE5jLDJCQUFXO2tCQUNULElBQUksa0NBQWtDO29CQUNwQztvQkFDQSxRQUFRLElBQVUsZUFBUSxFQUFFLFdBQVVGLE1BQUEsS0FBSyxXQUFMLE9BQUFBLE1BQWUsQ0FBQyxHQUFLLENBQUcsQ0FBQztvQkFDL0QsT0FBTyxJQUFVLGVBQVEsRUFBRSxXQUFVRSxNQUFBLEtBQUssVUFBTCxPQUFBQSxNQUFjLENBQUMsR0FBSyxDQUFHLENBQUM7a0JBQy9ELENBQUM7Z0JBQ0g7Y0FDRixDQUFDO1lBQ0gsQ0FBQSxDQUFBO1VBQ0Y7QUFFQSxrQkFBUSxtQkFBbUIsVUFBVTtRQUN2QyxDQUFBLENBQUM7TUFDSDtBQUVBLGFBQU87SUFDVCxDQUFBO0VBQUE7RUFFYyxVQUFVLE1BQWtEO0FBQUEsV0FBQUwsU0FBQSxNQUFBLE1BQUEsYUFBQTtBQTlPNUUsVUFBQTtBQStPSSxZQUFNLE9BQU8sS0FBSyxPQUFPO0FBR3pCLFlBQU0sVUFBUyxLQUFBLEtBQUssZUFBTCxPQUFBLFNBQUEsR0FBaUI7QUFDaEMsVUFBSSxDQUFDLFFBQVE7QUFDWCxlQUFPO01BQ1Q7QUFFQSxZQUFNLG1CQUFtQixPQUFPO0FBQ2hDLFVBQUksQ0FBQyxrQkFBa0I7QUFDckIsZUFBTztNQUNUO0FBRUEsWUFBTSxVQUFVLElBQUkscUJBQXFCO0FBRXpDLFlBQU0seUJBQXlCLGlCQUFpQjtBQUNoRCxVQUFJLENBQUMsd0JBQXdCO0FBQzNCLGVBQU87TUFDVDtBQUVBLFlBQU0sb0JBQW9CLG9CQUFJLElBQVk7QUFFMUMsWUFBTSxRQUFRO1FBQ1osdUJBQXVCLElBQUksQ0FBTyxnQkFBZ0JBLFNBQUEsTUFBQSxNQUFBLGFBQUE7QUF0UXhELGNBQUFHO0FBdVFRLGdCQUFNLGVBQWUsWUFBWTtBQUNqQyxnQkFBTSxlQUNILGdCQUFnQixRQUFRQyw0QkFBMEIsa0JBQWtCLFlBQVksS0FBTTtBQUN6RixnQkFBTSxPQUFPLGdCQUFBLE9BQUEsZUFBZ0IsWUFBWTtBQUV6QyxjQUFJLFFBQVEsTUFBTTtBQUNoQixvQkFBUSxLQUFLLDJGQUEyRjtBQUN4RztVQUNGO0FBR0EsY0FBSSxrQkFBa0IsSUFBSSxJQUFJLEdBQUc7QUFDL0Isb0JBQVE7Y0FDTixtREFBbUQsWUFBWTtZQUNqRTtBQUNBO1VBQ0Y7QUFFQSw0QkFBa0IsSUFBSSxJQUFJO0FBRTFCLGdCQUFNLGFBQWEsSUFBSSxjQUFjLElBQUk7QUFDekMsZUFBSyxNQUFNLElBQUksVUFBVTtBQUV6QixxQkFBVyxZQUFXRCxNQUFBLFlBQVksYUFBWixPQUFBQSxNQUF3QjtBQUk5QyxjQUFJLFlBQVksT0FBTztBQUNyQix3QkFBWSxNQUFNLFFBQVEsQ0FBTyxTQUFTSCxTQUFBLE1BQUEsTUFBQSxhQUFBO0FBblNwRCxrQkFBQUc7QUFvU1ksa0JBQUksS0FBSyxTQUFTLFVBQWEsS0FBSyxVQUFVLFFBQVc7QUFDdkQ7Y0FDRjtBQUVBLG9CQUFNLGlCQUEyQixDQUFDO0FBQ2xDLGVBQUFBLE1BQUEsS0FBSyxVQUFMLE9BQUEsU0FBQUEsSUFBWSxRQUFRLENBQUMsTUFBTSxNQUFNO0FBQy9CLG9CQUFJLEtBQUssU0FBUyxLQUFLLE1BQU07QUFDM0IsaUNBQWUsS0FBSyxDQUFDO2dCQUN2QjtjQUNGLENBQUE7QUFFQSxvQkFBTSxtQkFBbUIsS0FBSztBQUU5QixvQkFBTSxRQUFRO2dCQUNaLGVBQWUsSUFBSSxDQUFPLGNBQWNILFNBQUEsTUFBQSxNQUFBLGFBQUE7QUFsVHRELHNCQUFBRztBQW1UZ0Isd0JBQU0sYUFBYyxNQUFNLDhCQUE4QixNQUFNLFNBQVM7QUFHdkUsc0JBQ0UsQ0FBQyxXQUFXO29CQUNWLENBQUMsY0FDQyxNQUFNLFFBQVEsVUFBVSxxQkFBcUIsS0FDN0MsbUJBQW1CLFVBQVUsc0JBQXNCO2tCQUN2RCxHQUNBO0FBQ0EsNEJBQVE7c0JBQ04sOEJBQThCLFlBQVksSUFBSSxzQkFBc0IsZ0JBQWdCO29CQUN0RjtBQUNBO2tCQUNGO0FBRUEsNkJBQVc7b0JBQ1QsSUFBSSw2QkFBNkI7c0JBQy9CO3NCQUNBLE9BQU87c0JBQ1AsUUFBUSxTQUFRQSxNQUFBLEtBQUssV0FBTCxPQUFBQSxNQUFlOztvQkFDakMsQ0FBQztrQkFDSDtnQkFDRixDQUFBLENBQUM7Y0FDSDtZQUNGLENBQUEsQ0FBQztVQUNIO0FBR0EsZ0JBQU0saUJBQWlCLFlBQVk7QUFDbkMsY0FBSSxrQkFBa0IsZUFBZSxXQUFXLEdBQUc7QUFDakQsMkJBQWUsUUFBUSxDQUFDLGtCQUFrQjtBQUN4QyxrQkFDRSxjQUFjLGlCQUFpQixVQUMvQixjQUFjLGlCQUFpQixVQUMvQixjQUFjLGdCQUFnQixRQUM5QjtBQUNBO2NBQ0Y7QUFTQSxvQkFBTSxZQUE4QixDQUFDO0FBQ3JDLG1CQUFLLE1BQU0sU0FBUyxDQUFDLFdBQVc7QUFDOUIsb0JBQUssT0FBZSxVQUFVO0FBQzVCLHdCQUFNLFdBQStDLE9BQWU7QUFDcEUsc0JBQUksTUFBTSxRQUFRLFFBQVEsR0FBRztBQUMzQiw4QkFBVTtzQkFDUixHQUFHLFNBQVM7d0JBQ1YsQ0FBQyxTQUNFLElBQUksU0FBUyxjQUFjLGdCQUMxQixJQUFJLFNBQVMsY0FBYyxlQUFnQixpQkFDN0MsVUFBVSxRQUFRLEdBQUcsTUFBTTtzQkFDL0I7b0JBQ0Y7a0JBQ0YsV0FBVyxTQUFTLFNBQVMsY0FBYyxnQkFBZ0IsVUFBVSxRQUFRLFFBQVEsTUFBTSxJQUFJO0FBQzdGLDhCQUFVLEtBQUssUUFBUTtrQkFDekI7Z0JBQ0Y7Y0FDRixDQUFDO0FBRUQsb0JBQU0sdUJBQXVCLGNBQWM7QUFDM0Msd0JBQVUsUUFBUSxDQUFDLGFBQWE7QUFFOUIsb0JBQUkseUJBQXlCLGVBQWU7QUFDMUMsd0JBQU0sUUFBUSxJQUFVLGVBQVEsY0FBYyxZQUFhLENBQUMsR0FBRyxjQUFjLFlBQWEsQ0FBQyxDQUFDO0FBQzVGLHdCQUFNLFNBQVMsSUFBVSxlQUFRLGNBQWMsWUFBYSxDQUFDLEdBQUcsY0FBYyxZQUFhLENBQUMsQ0FBQztBQUU3Rix5QkFBTyxJQUFJLElBQU0sT0FBTyxJQUFJLE1BQU07QUFFbEMsNkJBQVc7b0JBQ1QsSUFBSSxrQ0FBa0M7c0JBQ3BDO3NCQUNBO3NCQUNBO29CQUNGLENBQUM7a0JBQ0g7QUFFQTtnQkFDRjtBQUdBLHNCQUFNLG9CQUFvQiw2QkFBNkIsb0JBQW9CO0FBQzNFLG9CQUFJLG1CQUFtQjtBQUNyQiw2QkFBVztvQkFDVCxJQUFJLCtCQUErQjtzQkFDakM7c0JBQ0EsTUFBTTtzQkFDTixhQUFhLElBQVUsYUFBTSxFQUFFLFVBQVUsY0FBYyxXQUFZO3NCQUNuRSxhQUFhLGNBQWMsWUFBYSxDQUFDO29CQUMzQyxDQUFDO2tCQUNIO0FBRUE7Z0JBQ0Y7QUFFQSx3QkFBUSxLQUFLLHVCQUF1QixtQkFBbUI7Y0FDekQsQ0FBQztZQUNILENBQUM7VUFDSDtBQUVBLGtCQUFRLG1CQUFtQixVQUFVO1FBQ3ZDLENBQUEsQ0FBQztNQUNIO0FBRUEsYUFBTztJQUNULENBQUE7RUFBQTtBQUNGO0FBN1lhLDJCQUNZLG9CQUEwRjtFQUMvRyxHQUFHO0VBQ0gsR0FBRztFQUNILEdBQUc7RUFDSCxHQUFHO0VBQ0gsR0FBRztFQUNILE9BQU87RUFDUCxLQUFLO0VBQ0wsT0FBTztFQUNQLFFBQVE7RUFDUixLQUFLO0VBQ0wsUUFBUTtFQUNSLFVBQVU7RUFDVixVQUFVO0VBQ1YsV0FBVzs7RUFFWCxTQUFTOztFQUVULFNBQVM7RUFDVCxTQUFTO0FBQ1g7QUFyQkssSUFBTSw0QkFBTjtBU3BCQSxJQUFNLDRCQUE0QjtFQUN2QyxNQUFNO0VBQ04sT0FBTztFQUNQLE9BQU87QUFDVDtBQ0ZPLElBQU0sa0JBQU4sTUFBTUcsaUJBQWU7Ozs7Ozs7RUFnQ25CLFlBQVksVUFBdUIsaUJBQWlEO0FBWDNGLFNBQVEsd0JBQXdCQSxpQkFBZTtBQUMvQyxTQUFRLHdCQUF3QkEsaUJBQWU7QUFFL0MsU0FBUSxxQkFBcUI7QUFTM0IsU0FBSyxXQUFXO0FBQ2hCLFNBQUssa0JBQWtCO0VBQ3pCOzs7Ozs7O0VBUU8sS0FBSyxRQUE4QjtBQUN4QyxRQUFJLEtBQUssYUFBYSxPQUFPLFVBQVU7QUFDckMsWUFBTSxJQUFJLE1BQU0sd0RBQXdEO0lBQzFFO0FBRUEsU0FBSyxrQkFBa0IsT0FBTyxnQkFBZ0IsSUFBSSxDQUFDLGdCQUFnQjtNQUNqRSxRQUFRLFdBQVcsT0FBTyxPQUFPO01BQ2pDLE1BQU0sV0FBVztJQUNuQixFQUFFO0FBRUYsV0FBTztFQUNUOzs7OztFQU1PLFFBQXdCO0FBQzdCLFdBQU8sSUFBSUEsaUJBQWUsS0FBSyxVQUFVLEtBQUssZUFBZSxFQUFFLEtBQUssSUFBSTtFQUMxRTs7Ozs7Ozs7OztFQVdBLElBQVcsdUJBQStCO0FBQ3hDLFdBQU8sS0FBSztFQUNkOzs7Ozs7Ozs7O0VBV0EsSUFBVyx1QkFBK0I7QUFDeEMsV0FBTyxLQUFLO0VBQ2Q7Ozs7Ozs7Ozs7Ozs7RUFjTyxNQUFNO0lBQ1gsdUJBQXVCQSxpQkFBZTtJQUN0Qyx1QkFBdUJBLGlCQUFlO0VBQ3hDLElBQUksQ0FBQyxHQUFTO0FBQ1osUUFBSSxLQUFLLG9CQUFvQjtBQUMzQjtJQUNGO0FBQ0EsU0FBSyx3QkFBd0I7QUFDN0IsU0FBSyx3QkFBd0I7QUFFN0IsU0FBSyxnQkFBZ0IsUUFBUSxDQUFDLFNBQVM7QUFDckMsV0FBSyxPQUFPLFFBQVEsQ0FBQyxTQUFTO0FBQzVCLFlBQUksS0FBSyxTQUFTLG1CQUFtQjtBQUNuQyxlQUFLLE9BQU8sSUFBSSxLQUFLLHFCQUFxQjtBQUMxQyxlQUFLLFNBQVMsQ0FBQyxVQUFVLE1BQU0sT0FBTyxJQUFJLEtBQUsscUJBQXFCLENBQUM7UUFDdkUsV0FBVyxLQUFLLFNBQVMsbUJBQW1CO0FBQzFDLGVBQUssT0FBTyxJQUFJLEtBQUsscUJBQXFCO0FBQzFDLGVBQUssU0FBUyxDQUFDLFVBQVUsTUFBTSxPQUFPLElBQUksS0FBSyxxQkFBcUIsQ0FBQztRQUN2RSxXQUFXLEtBQUssU0FBUyxRQUFRO0FBQy9CLGVBQUsscUJBQXFCLElBQUk7UUFDaEM7TUFDRixDQUFDO0lBQ0gsQ0FBQztBQUVELFNBQUsscUJBQXFCO0VBQzVCO0VBRVEsa0JBQWtCLFdBQXFCLEtBQWlCLFdBQXVCLFNBQTJCO0FBQ2hILFFBQUksUUFBUTtBQUNaLFFBQUksT0FBTyxRQUFRLElBQUksU0FBUyxHQUFHO0FBQ2pDLGVBQVMsSUFBSSxHQUFHLElBQUksVUFBVSxRQUFRLEtBQUssR0FBRztBQUM1QyxjQUFNLElBQUksVUFBVSxDQUFDO0FBQ3JCLGNBQU0sSUFBSSxVQUFVLElBQUksQ0FBQztBQUN6QixjQUFNLElBQUksVUFBVSxJQUFJLENBQUM7QUFDekIsY0FBTSxNQUFNLElBQUksQ0FBQztBQUNqQixjQUFNLFFBQVEsVUFBVSxDQUFDO0FBRXpCLFlBQUksSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRLFNBQVMsTUFBTSxDQUFDLENBQUMsRUFBRztBQUM5QyxZQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxTQUFTLE1BQU0sQ0FBQyxDQUFDLEVBQUc7QUFDOUMsWUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFFBQVEsU0FBUyxNQUFNLENBQUMsQ0FBQyxFQUFHO0FBQzlDLFlBQUksSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRLFNBQVMsTUFBTSxDQUFDLENBQUMsRUFBRztBQUU5QyxjQUFNLE1BQU0sSUFBSSxDQUFDO0FBQ2pCLGNBQU0sUUFBUSxVQUFVLENBQUM7QUFDekIsWUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFFBQVEsU0FBUyxNQUFNLENBQUMsQ0FBQyxFQUFHO0FBQzlDLFlBQUksSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRLFNBQVMsTUFBTSxDQUFDLENBQUMsRUFBRztBQUM5QyxZQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxTQUFTLE1BQU0sQ0FBQyxDQUFDLEVBQUc7QUFDOUMsWUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFFBQVEsU0FBUyxNQUFNLENBQUMsQ0FBQyxFQUFHO0FBRTlDLGNBQU0sTUFBTSxJQUFJLENBQUM7QUFDakIsY0FBTSxRQUFRLFVBQVUsQ0FBQztBQUN6QixZQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxTQUFTLE1BQU0sQ0FBQyxDQUFDLEVBQUc7QUFDOUMsWUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFFBQVEsU0FBUyxNQUFNLENBQUMsQ0FBQyxFQUFHO0FBQzlDLFlBQUksSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRLFNBQVMsTUFBTSxDQUFDLENBQUMsRUFBRztBQUM5QyxZQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxTQUFTLE1BQU0sQ0FBQyxDQUFDLEVBQUc7QUFFOUMsa0JBQVUsT0FBTyxJQUFJO0FBQ3JCLGtCQUFVLE9BQU8sSUFBSTtBQUNyQixrQkFBVSxPQUFPLElBQUk7TUFDdkI7SUFDRjtBQUNBLFdBQU87RUFDVDtFQUVRLGtCQUFrQixLQUF3QixtQkFBZ0Q7QUFDaEcsVUFBTSxNQUFNLElBQVUsbUJBQVksSUFBSSxTQUFTLE1BQU0sR0FBRyxJQUFJLFFBQVE7QUFDcEUsUUFBSSxPQUFPLEdBQUcsSUFBSSxJQUFJO0FBQ3RCLFFBQUksZ0JBQWdCLElBQUk7QUFDeEIsUUFBSSxPQUFPLElBQUksS0FBSyxxQkFBcUI7QUFFekMsVUFBTSxXQUFXLElBQUk7QUFFckIsVUFBTSxnQkFBZ0IsU0FBUyxhQUFhLFdBQVc7QUFDdkQsVUFBTSxxQkFBcUIseUJBQStCLDJCQUFvQixDQUFDLElBQUksY0FBYztBQUNqRyxVQUFNLFlBQVksQ0FBQztBQUNuQixhQUFTLElBQUksR0FBRyxJQUFJLG1CQUFtQixRQUFRLEtBQUssR0FBRztBQUNyRCxnQkFBVSxLQUFLO1FBQ2IsbUJBQW1CLENBQUM7UUFDcEIsbUJBQW1CLElBQUksQ0FBQztRQUN4QixtQkFBbUIsSUFBSSxDQUFDO1FBQ3hCLG1CQUFtQixJQUFJLENBQUM7TUFDMUIsQ0FBQztJQUNIO0FBRUEsVUFBTSxpQkFBaUIsU0FBUyxhQUFhLFlBQVk7QUFDekQsVUFBTSxzQkFBc0IsMEJBQWdDLDJCQUFvQixDQUFDLElBQUksZUFBZTtBQUNwRyxVQUFNLGFBQWEsQ0FBQztBQUNwQixhQUFTLElBQUksR0FBRyxJQUFJLG9CQUFvQixRQUFRLEtBQUssR0FBRztBQUN0RCxpQkFBVyxLQUFLO1FBQ2Qsb0JBQW9CLENBQUM7UUFDckIsb0JBQW9CLElBQUksQ0FBQztRQUN6QixvQkFBb0IsSUFBSSxDQUFDO1FBQ3pCLG9CQUFvQixJQUFJLENBQUM7TUFDM0IsQ0FBQztJQUNIO0FBRUEsVUFBTSxRQUFRLFNBQVMsU0FBUztBQUNoQyxRQUFJLENBQUMsT0FBTztBQUNWLFlBQU0sSUFBSSxNQUFNLDJDQUEyQztJQUM3RDtBQUNBLFVBQU0sZUFBZSxNQUFNLEtBQUssTUFBTSxLQUFLO0FBRTNDLFVBQU0sUUFBUSxLQUFLLGtCQUFrQixjQUFjLFlBQVksV0FBVyxpQkFBaUI7QUFDM0YsVUFBTSxjQUF3QixDQUFDO0FBQy9CLGFBQVMsSUFBSSxHQUFHLElBQUksT0FBTyxLQUFLO0FBQzlCLGtCQUFZLENBQUMsSUFBSSxhQUFhLENBQUM7SUFDakM7QUFDQSxhQUFTLFNBQVMsV0FBVztBQUc3QixRQUFJLElBQUksZ0JBQWdCO0FBQ3RCLFVBQUksaUJBQWlCLElBQUk7SUFDM0I7QUFDQSxRQUFJLEtBQUssSUFBVSxnQkFBUyxJQUFJLFNBQVMsT0FBTyxJQUFJLFNBQVMsWUFBWSxHQUFHLElBQVUsZUFBUSxDQUFDO0FBQy9GLFdBQU87RUFDVDtFQUVRLG1DQUFtQyxRQUF3QixNQUErQjtBQUNoRyxVQUFNLG1CQUE2QixDQUFDO0FBQ3BDLFNBQUssU0FBUyxNQUFNLFFBQVEsQ0FBQyxNQUFNLFVBQVU7QUFDM0MsVUFBSSxLQUFLLGVBQWUsSUFBSSxFQUFHLGtCQUFpQixLQUFLLEtBQUs7SUFDNUQsQ0FBQztBQUdELFFBQUksQ0FBQyxpQkFBaUIsUUFBUTtBQUM1QixXQUFLLE9BQU8sT0FBTyxLQUFLLHFCQUFxQjtBQUM3QyxXQUFLLE9BQU8sT0FBTyxLQUFLLHFCQUFxQjtBQUM3QztJQUNGO0FBQ0EsU0FBSyxPQUFPLElBQUksS0FBSyxxQkFBcUI7QUFDMUMsVUFBTSxVQUFVLEtBQUssa0JBQWtCLE1BQU0sZ0JBQWdCO0FBQzdELFdBQU8sSUFBSSxPQUFPO0VBQ3BCO0VBRVEscUJBQXFCLE1BQTRCO0FBQ3ZELFFBQUksS0FBSyxTQUFTLFNBQVM7QUFDekIsV0FBSyxPQUFPLElBQUksS0FBSyxxQkFBcUI7QUFDMUMsVUFBSSxLQUFLLGVBQWUsSUFBSSxHQUFHO0FBQzdCLGFBQUssU0FBUyxDQUFDLFVBQVUsTUFBTSxPQUFPLElBQUksS0FBSyxxQkFBcUIsQ0FBQztNQUN2RSxPQUFPO0FBQ0wsY0FBTSxTQUFTLElBQVUsYUFBTTtBQUMvQixlQUFPLE9BQU8sYUFBYSxLQUFLLElBQUk7QUFDcEMsZUFBTyxPQUFPLElBQUksS0FBSyxxQkFBcUI7QUFDNUMsYUFBSyxPQUFRLElBQUksTUFBTTtBQUN2QixhQUFLLFNBQ0YsT0FBTyxDQUFDLFVBQVUsTUFBTSxTQUFTLGFBQWEsRUFDOUMsUUFBUSxDQUFDLFVBQVU7QUFDbEIsZ0JBQU0sY0FBYztBQUNwQixlQUFLLG1DQUFtQyxRQUFRLFdBQVc7UUFDN0QsQ0FBQztNQUNMO0lBQ0YsV0FBVyxLQUFLLFNBQVMsZUFBZTtBQUN0QyxZQUFNLGNBQWM7QUFDcEIsV0FBSyxtQ0FBbUMsS0FBSyxRQUFTLFdBQVc7SUFDbkUsT0FBTztBQUNMLFVBQUksS0FBSyxlQUFlLElBQUksR0FBRztBQUM3QixhQUFLLE9BQU8sSUFBSSxLQUFLLHFCQUFxQjtBQUMxQyxhQUFLLFNBQVMsQ0FBQyxVQUFVLE1BQU0sT0FBTyxJQUFJLEtBQUsscUJBQXFCLENBQUM7TUFDdkU7SUFDRjtFQUNGO0VBRVEsZUFBZSxNQUErQjtBQUNwRCxRQUFJLFNBQVMsS0FBSyxTQUFTLGVBQWUsTUFBTSxHQUFHO0FBQ2pELGFBQU87SUFDVCxXQUFXLENBQUMsS0FBSyxRQUFRO0FBQ3ZCLGFBQU87SUFDVCxPQUFPO0FBQ0wsYUFBTyxLQUFLLGVBQWUsS0FBSyxNQUFNO0lBQ3hDO0VBQ0Y7QUFDRjtBQWpSYSxnQkFNWSxpQ0FBaUM7QUFON0MsZ0JBYVksaUNBQWlDO0FBYm5ELElBQU0saUJBQU47QUNTUCxJQUFNQywwQkFBeUIsb0JBQUksSUFBSSxDQUFDLE9BQU8sVUFBVSxDQUFDO0FBS25ELElBQU0sNkJBQU4sTUFBNkQ7RUFHbEUsSUFBVyxPQUFlO0FBRXhCLFdBQU87RUFDVDtFQUVPLFlBQVksUUFBb0I7QUFDckMsU0FBSyxTQUFTO0VBQ2hCO0VBRWEsVUFBVSxNQUEyQjtBQUFBLFdBQUFQLFNBQUEsTUFBQSxNQUFBLGFBQUE7QUFDaEQsWUFBTSxjQUFjLEtBQUssU0FBUztBQUlsQyxVQUFJLGdCQUFnQixNQUFNO0FBQ3hCO01BQ0YsV0FBVyxnQkFBZ0IsUUFBVztBQUNwQyxjQUFNLElBQUk7VUFDUjtRQUNGO01BQ0Y7QUFFQSxXQUFLLFNBQVMsaUJBQWlCLE1BQU0sS0FBSyxRQUFRLE1BQU0sV0FBVztJQUNyRSxDQUFBO0VBQUE7Ozs7Ozs7RUFTYyxRQUFRLE1BQVksVUFBOEQ7QUFBQSxXQUFBQSxTQUFBLE1BQUEsTUFBQSxhQUFBO0FBQzlGLFVBQUksWUFBWSxNQUFNO0FBQ3BCLGVBQU87TUFDVDtBQUVBLFlBQU0sV0FBVyxNQUFNLEtBQUssVUFBVSxNQUFNLFFBQVE7QUFDcEQsVUFBSSxVQUFVO0FBQ1osZUFBTztNQUNUO0FBRUEsWUFBTSxXQUFXLE1BQU0sS0FBSyxVQUFVLE1BQU0sUUFBUTtBQUNwRCxVQUFJLFVBQVU7QUFDWixlQUFPO01BQ1Q7QUFFQSxhQUFPO0lBQ1QsQ0FBQTtFQUFBO0VBRWMsVUFBVSxNQUFZLFVBQXVEO0FBQUEsV0FBQUEsU0FBQSxNQUFBLE1BQUEsYUFBQTtBQXZFN0YsVUFBQSxJQUFBO0FBd0VJLFlBQU0sT0FBTyxLQUFLLE9BQU87QUFHekIsWUFBTSxjQUFZLEtBQUEsS0FBSyxtQkFBTCxPQUFBLFNBQUEsR0FBcUIsUUFBUSxVQUFBLE9BQWdCO0FBQy9ELFVBQUksQ0FBQyxXQUFXO0FBQ2QsZUFBTztNQUNUO0FBRUEsWUFBTSxhQUFZLEtBQUEsS0FBSyxlQUFMLE9BQUEsU0FBQSxHQUFrQixVQUFBO0FBQ3BDLFVBQUksQ0FBQyxXQUFXO0FBQ2QsZUFBTztNQUNUO0FBRUEsWUFBTSxjQUFjLFVBQVU7QUFDOUIsVUFBSSxDQUFDTyx3QkFBdUIsSUFBSSxXQUFXLEdBQUc7QUFDNUMsZ0JBQVEsS0FBSyw2REFBNkQsV0FBVyxHQUFHO0FBQ3hGLGVBQU87TUFDVDtBQUVBLFlBQU0sb0JBQW9CLFVBQVU7QUFFcEMsWUFBTSxrQkFBa0QsQ0FBQztBQUN6RCxZQUFNLG9CQUFvQixNQUFNLCtCQUErQixJQUFJO0FBQ25FLFlBQU0sS0FBSyxrQkFBa0IsUUFBUSxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsV0FBVyxVQUFVLE1BQU07QUEvRmpGLFlBQUFKLEtBQUFFO0FBZ0dNLGNBQU0sY0FBYUYsTUFBQSxxQkFBQSxPQUFBLFNBQUEsa0JBQW1CLG9CQUFuQixPQUFBLFNBQUFBLElBQW9DLEtBQUssQ0FBQyxNQUFNLEVBQUUsU0FBUyxTQUFBO0FBRTlFLHdCQUFnQixLQUFLO1VBQ25CLFFBQVE7VUFDUixPQUFNRSxNQUFBLGNBQUEsT0FBQSxTQUFBLFdBQVksU0FBWixPQUFBQSxNQUFvQjtRQUM1QixDQUFDO01BQ0gsQ0FBQztBQUVELGFBQU8sSUFBSSxlQUFlLFVBQVUsZUFBZTtJQUNyRCxDQUFBO0VBQUE7RUFFYyxVQUFVLE1BQVksVUFBdUQ7QUFBQSxXQUFBTCxTQUFBLE1BQUEsTUFBQSxhQUFBO0FBM0c3RixVQUFBO0FBNEdJLFlBQU0sT0FBTyxLQUFLLE9BQU87QUFFekIsWUFBTSxVQUFTLEtBQUEsS0FBSyxlQUFMLE9BQUEsU0FBQSxHQUFpQjtBQUNoQyxVQUFJLENBQUMsUUFBUTtBQUNYLGVBQU87TUFDVDtBQUVBLFlBQU0sb0JBQW1ELE9BQU87QUFDaEUsVUFBSSxDQUFDLG1CQUFtQjtBQUN0QixlQUFPO01BQ1Q7QUFFQSxZQUFNLGtCQUFrRCxDQUFDO0FBQ3pELFlBQU0sb0JBQW9CLE1BQU0sK0JBQStCLElBQUk7QUFFbkUsWUFBTSxLQUFLLGtCQUFrQixRQUFRLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxXQUFXLFVBQVUsTUFBTTtBQUMzRSxjQUFNLGFBQWEsS0FBSyxNQUFPLFNBQVM7QUFFeEMsY0FBTSxPQUFPLGtCQUFrQixrQkFDM0Isa0JBQWtCLGdCQUFnQixLQUFLLENBQUMsTUFBTSxFQUFFLFNBQVMsV0FBVyxJQUFJLElBQ3hFO0FBRUosd0JBQWdCLEtBQUs7VUFDbkIsUUFBUTtVQUNSLE1BQU0sS0FBSyx1QkFBdUIsUUFBQSxPQUFBLFNBQUEsS0FBTSxlQUFlO1FBQ3pELENBQUM7TUFDSCxDQUFDO0FBRUQsYUFBTyxJQUFJLGVBQWUsVUFBVSxlQUFlO0lBQ3JELENBQUE7RUFBQTtFQUVRLHVCQUF1QixNQUE0RDtBQUN6RixRQUFJLFNBQVMsbUJBQW1CO0FBQzlCLGFBQU87SUFDVCxXQUFXLFNBQVMsbUJBQW1CO0FBQ3JDLGFBQU87SUFDVCxXQUFXLFNBQVMsUUFBUTtBQUMxQixhQUFPO0lBQ1QsT0FBTztBQUdMLGFBQU87SUFDVDtFQUNGO0FBQ0Y7QUN0Sk8sSUFBTSxtQ0FBbUM7RUFDOUMsTUFBTTtFQUNOLE1BQU07RUFDTixpQkFBaUI7RUFDakIsaUJBQWlCO0FBQ25CO0FDSEEsSUFBTSxPQUFPLElBQVUsZUFBUTtBQUMvQixJQUFNLE9BQU8sSUFBVSxlQUFRO0FBQy9CLElBQU0sU0FBUyxJQUFVLGtCQUFXO0FBRTdCLElBQU0sb0JBQU4sY0FBc0MsYUFBTTtFQUkxQyxZQUFZLFVBQXVCO0FBQ3hDLFVBQU07QUFFTixTQUFLLGNBQWM7QUFFbkIsU0FBSyxlQUFlLG9CQUFJLElBQUk7QUFFNUIsV0FBTyxPQUFPLFNBQVMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxTQUFTO0FBQ25ELFlBQU0sU0FBUyxJQUFVLGtCQUFXLENBQUc7QUFFdkMsYUFBTyxtQkFBbUI7QUFFekIsYUFBTyxTQUE0QixZQUFZO0FBQy9DLGFBQU8sU0FBNEIsYUFBYTtBQUVqRCxXQUFLLElBQUksTUFBTTtBQUVmLFdBQUssYUFBYSxJQUFJLE1BQU0sTUFBTTtJQUNwQyxDQUFDO0VBQ0g7RUFFTyxVQUFnQjtBQUNyQixVQUFNLEtBQUssS0FBSyxhQUFhLE9BQU8sQ0FBQyxFQUFFLFFBQVEsQ0FBQyxTQUFTO0FBQ3ZELFdBQUssU0FBUyxRQUFRO0FBQ3JCLFdBQUssU0FBNEIsUUFBUTtJQUM1QyxDQUFDO0VBQ0g7RUFFTyxrQkFBa0IsT0FBc0I7QUFDN0MsVUFBTSxLQUFLLEtBQUssYUFBYSxRQUFRLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTTtBQUNoRSxXQUFLLEtBQUssa0JBQWtCLE1BQU0sS0FBSztBQUV2QyxXQUFLLEtBQUssWUFBWSxVQUFVLE1BQU0sUUFBUSxJQUFJO0FBRWxELFlBQU0sUUFBUSxLQUFLLElBQUksS0FBSyxLQUFLLEdBQUcsRUFBRSxPQUFPLElBQUk7QUFDakQsV0FBSyxPQUFPLEtBQUssS0FBSyxLQUFLLFdBQVcsRUFBRSxNQUFNLEtBQUs7SUFDckQsQ0FBQztBQUVELFVBQU0sa0JBQWtCLEtBQUs7RUFDL0I7QUFDRjtBQzdDTyxJQUFNLG1CQUF1QztFQUNsRDtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBRUE7RUFDQTtFQUNBO0VBQ0E7RUFFQTtFQUNBO0VBQ0E7RUFDQTtFQUVBO0VBQ0E7RUFDQTtFQUNBO0VBRUE7RUFDQTtFQUNBO0VBQ0E7RUFFQTtFQUNBO0VBQ0E7RUFDQTtFQUVBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUVBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtBQUNGO0FDL0RPLElBQU0sbUJBQW1CO0VBQzlCLE1BQU07RUFDTixPQUFPO0VBQ1AsT0FBTztFQUNQLFlBQVk7RUFDWixNQUFNO0VBRU4sTUFBTTtFQUNOLFNBQVM7RUFDVCxVQUFVO0VBQ1YsS0FBSztFQUVMLGNBQWM7RUFDZCxjQUFjO0VBQ2QsVUFBVTtFQUNWLFVBQVU7RUFFVixlQUFlO0VBQ2YsZUFBZTtFQUNmLFdBQVc7RUFDWCxXQUFXO0VBRVgsY0FBYztFQUNkLGNBQWM7RUFDZCxjQUFjO0VBQ2QsVUFBVTtFQUVWLGVBQWU7RUFDZixlQUFlO0VBQ2YsZUFBZTtFQUNmLFdBQVc7RUFFWCxxQkFBcUI7RUFDckIsbUJBQW1CO0VBQ25CLGlCQUFpQjtFQUNqQixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLGlCQUFpQjtFQUNqQixvQkFBb0I7RUFDcEIsd0JBQXdCO0VBQ3hCLGtCQUFrQjtFQUNsQixrQkFBa0I7RUFDbEIsc0JBQXNCO0VBQ3RCLGdCQUFnQjtFQUNoQixvQkFBb0I7RUFDcEIsd0JBQXdCO0VBQ3hCLGtCQUFrQjtFQUVsQixzQkFBc0I7RUFDdEIsb0JBQW9CO0VBQ3BCLGtCQUFrQjtFQUNsQixvQkFBb0I7RUFDcEIsd0JBQXdCO0VBQ3hCLGtCQUFrQjtFQUNsQixxQkFBcUI7RUFDckIseUJBQXlCO0VBQ3pCLG1CQUFtQjtFQUNuQixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLGlCQUFpQjtFQUNqQixxQkFBcUI7RUFDckIseUJBQXlCO0VBQ3pCLG1CQUFtQjtBQUNyQjtBQzdETyxJQUFNLHdCQUFpRjtFQUM1RixNQUFNO0VBQ04sT0FBTztFQUNQLE9BQU87RUFDUCxZQUFZO0VBQ1osTUFBTTtFQUVOLE1BQU07RUFDTixTQUFTO0VBQ1QsVUFBVTtFQUNWLEtBQUs7RUFFTCxjQUFjO0VBQ2QsY0FBYztFQUNkLFVBQVU7RUFDVixVQUFVO0VBRVYsZUFBZTtFQUNmLGVBQWU7RUFDZixXQUFXO0VBQ1gsV0FBVztFQUVYLGNBQWM7RUFDZCxjQUFjO0VBQ2QsY0FBYztFQUNkLFVBQVU7RUFFVixlQUFlO0VBQ2YsZUFBZTtFQUNmLGVBQWU7RUFDZixXQUFXO0VBRVgscUJBQXFCO0VBQ3JCLG1CQUFtQjtFQUNuQixpQkFBaUI7RUFDakIsbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2QixpQkFBaUI7RUFDakIsb0JBQW9CO0VBQ3BCLHdCQUF3QjtFQUN4QixrQkFBa0I7RUFDbEIsa0JBQWtCO0VBQ2xCLHNCQUFzQjtFQUN0QixnQkFBZ0I7RUFDaEIsb0JBQW9CO0VBQ3BCLHdCQUF3QjtFQUN4QixrQkFBa0I7RUFFbEIsc0JBQXNCO0VBQ3RCLG9CQUFvQjtFQUNwQixrQkFBa0I7RUFDbEIsb0JBQW9CO0VBQ3BCLHdCQUF3QjtFQUN4QixrQkFBa0I7RUFDbEIscUJBQXFCO0VBQ3JCLHlCQUF5QjtFQUN6QixtQkFBbUI7RUFDbkIsbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2QixpQkFBaUI7RUFDakIscUJBQXFCO0VBQ3JCLHlCQUF5QjtFQUN6QixtQkFBbUI7QUFDckI7QUVoRU8sU0FBUyxpQkFBNkMsUUFBYztBQUN6RSxNQUFLLE9BQWUsUUFBUTtBQUMxQixXQUFPLE9BQU87RUFDaEIsT0FBTztBQUNKLFdBQWUsUUFBUTtFQUMxQjtBQUVBLFNBQU87QUFDVDtBRFRBLElBQU1RLFFBQU8sSUFBVSxlQUFRO0FBQy9CLElBQU1DLFVBQVMsSUFBVSxrQkFBVztBQUs3QixJQUFNLFNBQU4sTUFBYTs7Ozs7RUFpQlgsWUFBWSxZQUEyQjtBQUM1QyxTQUFLLGFBQWE7QUFFbEIsU0FBSyxXQUFXLEtBQUssZ0JBQWdCO0VBQ3ZDOzs7Ozs7RUFPTyxrQkFBMkI7QUFDaEMsVUFBTSxPQUFPLENBQUM7QUFFZCxXQUFPLEtBQUssS0FBSyxVQUFVLEVBQUUsUUFBUSxDQUFDLHNCQUFzQjtBQUMxRCxZQUFNLGNBQWM7QUFDcEIsWUFBTSxPQUFPLEtBQUssWUFBWSxXQUFXO0FBR3pDLFVBQUksQ0FBQyxNQUFNO0FBQ1Q7TUFDRjtBQUdBRCxZQUFLLEtBQUssS0FBSyxRQUFRO0FBQ3ZCQyxjQUFPLEtBQUssS0FBSyxVQUFVO0FBRzNCLFdBQUssV0FBVyxJQUFJO1FBQ2xCLFVBQVVELE1BQUssUUFBUTtRQUN2QixVQUFVQyxRQUFPLFFBQVE7TUFDM0I7SUFDRixDQUFDO0FBRUQsV0FBTztFQUNUOzs7Ozs7RUFPTyxVQUFtQjtBQUN4QixVQUFNLE9BQU8sQ0FBQztBQUVkLFdBQU8sS0FBSyxLQUFLLFVBQVUsRUFBRSxRQUFRLENBQUMsbUJBQW1CO0FBQ3ZELFlBQU0sV0FBVztBQUNqQixZQUFNLE9BQU8sS0FBSyxZQUFZLFFBQVE7QUFHdEMsVUFBSSxDQUFDLE1BQU07QUFDVDtNQUNGO0FBR0FELFlBQUssSUFBSSxHQUFHLEdBQUcsQ0FBQztBQUNoQkMsY0FBTyxTQUFTO0FBRWhCLFlBQU0sWUFBWSxLQUFLLFNBQVMsUUFBUTtBQUN4QyxVQUFJLGFBQUEsT0FBQSxTQUFBLFVBQVcsVUFBVTtBQUN2QkQsY0FBSyxVQUFVLFVBQVUsUUFBUSxFQUFFLE9BQU87TUFDNUM7QUFDQSxVQUFJLGFBQUEsT0FBQSxTQUFBLFVBQVcsVUFBVTtBQUN2Qix5QkFBaUJDLFFBQU8sVUFBVSxVQUFVLFFBQVEsQ0FBQztNQUN2RDtBQUdBRCxZQUFLLElBQUksS0FBSyxRQUFRO0FBQ3RCQyxjQUFPLFlBQVksS0FBSyxVQUFVO0FBR2xDLFdBQUssUUFBUSxJQUFJO1FBQ2YsVUFBVUQsTUFBSyxRQUFRO1FBQ3ZCLFVBQVVDLFFBQU8sUUFBUTtNQUMzQjtJQUNGLENBQUM7QUFFRCxXQUFPO0VBQ1Q7Ozs7Ozs7OztFQVVPLFFBQVEsWUFBMkI7QUFDeEMsV0FBTyxRQUFRLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQyxnQkFBZ0IsS0FBSyxNQUFNO0FBQzlELFlBQU0sV0FBVztBQUNqQixZQUFNLE9BQU8sS0FBSyxZQUFZLFFBQVE7QUFHdEMsVUFBSSxDQUFDLE1BQU07QUFDVDtNQUNGO0FBRUEsWUFBTSxZQUFZLEtBQUssU0FBUyxRQUFRO0FBQ3hDLFVBQUksQ0FBQyxXQUFXO0FBRWQ7TUFDRjtBQUdBLFVBQUksU0FBQSxPQUFBLFNBQUEsTUFBTyxVQUFVO0FBQ25CLGFBQUssU0FBUyxVQUFVLE1BQU0sUUFBUTtBQUV0QyxZQUFJLFVBQVUsVUFBVTtBQUN0QixlQUFLLFNBQVMsSUFBSUQsTUFBSyxVQUFVLFVBQVUsUUFBUSxDQUFDO1FBQ3REO01BQ0Y7QUFFQSxVQUFJLFNBQUEsT0FBQSxTQUFBLE1BQU8sVUFBVTtBQUNuQixhQUFLLFdBQVcsVUFBVSxNQUFNLFFBQVE7QUFFeEMsWUFBSSxVQUFVLFVBQVU7QUFDdEIsZUFBSyxXQUFXLFNBQVNDLFFBQU8sVUFBVSxVQUFVLFFBQVEsQ0FBQztRQUMvRDtNQUNGO0lBQ0YsQ0FBQztFQUNIOzs7O0VBS08sWUFBa0I7QUFDdkIsV0FBTyxRQUFRLEtBQUssUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDLFVBQVUsSUFBSSxNQUFNO0FBQzFELFlBQU0sT0FBTyxLQUFLLFlBQVksUUFBNEI7QUFFMUQsVUFBSSxDQUFDLE1BQU07QUFDVDtNQUNGO0FBRUEsVUFBSSxRQUFBLE9BQUEsU0FBQSxLQUFNLFVBQVU7QUFDbEIsYUFBSyxTQUFTLFVBQVUsS0FBSyxRQUFRO01BQ3ZDO0FBRUEsVUFBSSxRQUFBLE9BQUEsU0FBQSxLQUFNLFVBQVU7QUFDbEIsYUFBSyxXQUFXLFVBQVUsS0FBSyxRQUFRO01BQ3pDO0lBQ0YsQ0FBQztFQUNIOzs7Ozs7RUFPTyxRQUFRLE1BQWtEO0FBbkxuRSxRQUFBO0FBb0xJLFlBQU8sS0FBQSxLQUFLLFdBQVcsSUFBSSxNQUFwQixPQUFBLEtBQXlCO0VBQ2xDOzs7Ozs7RUFPTyxZQUFZLE1BQStDO0FBNUxwRSxRQUFBLElBQUE7QUE2TEksWUFBTyxNQUFBLEtBQUEsS0FBSyxXQUFXLElBQUksTUFBcEIsT0FBQSxTQUFBLEdBQXVCLFNBQXZCLE9BQUEsS0FBK0I7RUFDeEM7QUFDRjtBRXpMQSxJQUFNRCxRQUFPLElBQVUsZUFBUTtBQUMvQixJQUFNQyxVQUFTLElBQVUsa0JBQVc7QUFDcEMsSUFBTSxnQkFBZ0IsSUFBVSxlQUFRO0FBS2pDLElBQU0saUJBQU4sTUFBTSx3QkFBdUIsT0FBTztFQUN6QyxPQUFpQixpQkFBaUIsVUFLaEM7QUFDQSxVQUFNLE9BQU8sSUFBVSxnQkFBUztBQUNoQyxTQUFLLE9BQU87QUFHWixVQUFNLHFCQUF5RSxDQUFDO0FBQ2hGLFVBQU0scUJBQTRFLENBQUM7QUFDbkYsVUFBTSxnQkFBdUUsQ0FBQztBQUM5RSxVQUFNLHVCQUE4RSxDQUFDO0FBRXJGLHFCQUFpQixRQUFRLENBQUMsYUFBYTtBQTdCM0MsVUFBQTtBQThCTSxZQUFNLFdBQVcsU0FBUyxZQUFZLFFBQVE7QUFFOUMsVUFBSSxVQUFVO0FBQ1osY0FBTSxvQkFBb0IsSUFBVSxlQUFRO0FBQzVDLGNBQU0sb0JBQW9CLElBQVUsa0JBQVc7QUFFL0MsaUJBQVMsa0JBQWtCLE1BQU0sS0FBSztBQUN0QyxpQkFBUyxZQUFZLFVBQVUsbUJBQW1CLG1CQUFtQkQsS0FBSTtBQUV6RSwyQkFBbUIsUUFBUSxJQUFJO0FBQy9CLDJCQUFtQixRQUFRLElBQUk7QUFDL0Isc0JBQWMsUUFBUSxJQUFJLFNBQVMsV0FBVyxNQUFNO0FBRXBELGNBQU0sc0JBQXNCLElBQVUsa0JBQVc7QUFDakQsU0FBQSxLQUFBLFNBQVMsV0FBVCxPQUFBLFNBQUEsR0FBaUIsWUFBWSxVQUFVQSxPQUFNLHFCQUFxQkEsS0FBQUE7QUFDbEUsNkJBQXFCLFFBQVEsSUFBSTtNQUNuQztJQUNGLENBQUM7QUFHRCxVQUFNLFdBQW1DLENBQUM7QUFDMUMscUJBQWlCLFFBQVEsQ0FBQyxhQUFhO0FBbkQzQyxVQUFBO0FBb0RNLFlBQU0sV0FBVyxTQUFTLFlBQVksUUFBUTtBQUU5QyxVQUFJLFVBQVU7QUFDWixjQUFNLG9CQUFvQixtQkFBbUIsUUFBUTtBQUdyRCxZQUFJLGtCQUEyQztBQUMvQyxZQUFJO0FBQ0osZUFBTywyQkFBMkIsTUFBTTtBQUN0Qyw0QkFBa0Isc0JBQXNCLGVBQWU7QUFDdkQsY0FBSSxtQkFBbUIsTUFBTTtBQUMzQjtVQUNGO0FBQ0Esb0NBQTBCLG1CQUFtQixlQUFlO1FBQzlEO0FBR0EsY0FBTSxjQUFjLElBQVUsZ0JBQVM7QUFDdkMsb0JBQVksT0FBTyxnQkFBZ0IsU0FBUztBQUU1QyxjQUFNLG9CQUFxQixtQkFBa0IsS0FBQSxTQUFTLGVBQWUsTUFBeEIsT0FBQSxTQUFBLEdBQTJCLE9BQU87QUFFL0UsMEJBQWtCLElBQUksV0FBVztBQUNqQyxvQkFBWSxTQUFTLEtBQUssaUJBQWlCO0FBQzNDLFlBQUkseUJBQXlCO0FBQzNCLHNCQUFZLFNBQVMsSUFBSSx1QkFBdUI7UUFDbEQ7QUFFQSxpQkFBUyxRQUFRLElBQUksRUFBRSxNQUFNLFlBQVk7TUFDM0M7SUFDRixDQUFDO0FBRUQsV0FBTztNQUNMO01BQ0E7TUFDQTtNQUNBO0lBQ0Y7RUFDRjtFQU9PLFlBQVksVUFBa0I7QUFDbkMsVUFBTSxFQUFFLFVBQVUsTUFBTSxzQkFBc0IsY0FBYyxJQUFJLGdCQUFlLGlCQUFpQixRQUFRO0FBRXhHLFVBQU0sUUFBUTtBQUVkLFNBQUssV0FBVztBQUNoQixTQUFLLE9BQU87QUFDWixTQUFLLHdCQUF3QjtBQUM3QixTQUFLLGlCQUFpQjtFQUN4Qjs7OztFQUtPLFNBQWU7QUFDcEIscUJBQWlCLFFBQVEsQ0FBQyxhQUFhO0FBQ3JDLFlBQU0sV0FBVyxLQUFLLFNBQVMsWUFBWSxRQUFRO0FBRW5ELFVBQUksWUFBWSxNQUFNO0FBQ3BCLGNBQU0sY0FBYyxLQUFLLFlBQVksUUFBUTtBQUM3QyxjQUFNLHNCQUFzQixLQUFLLHNCQUFzQixRQUFRO0FBQy9ELGNBQU0seUJBQXlCQyxRQUFPLEtBQUssbUJBQW1CLEVBQUUsT0FBTztBQUN2RSxjQUFNLGVBQWUsS0FBSyxlQUFlLFFBQVE7QUFFakQsaUJBQVMsV0FDTixLQUFLLFlBQVksVUFBVSxFQUMzQixTQUFTLG1CQUFtQixFQUM1QixZQUFZLHNCQUFzQixFQUNsQyxTQUFTLFlBQVk7QUFHeEIsWUFBSSxhQUFhLFFBQVE7QUFDdkIsZ0JBQU0sb0JBQW9CLFlBQVksaUJBQWlCLGFBQWE7QUFDcEUsbUJBQVMsT0FBUSxrQkFBa0IsTUFBTSxLQUFLO0FBQzlDLGdCQUFNLG9CQUFvQixTQUFTLE9BQVE7QUFDM0MsZ0JBQU0sZ0JBQWdCLGtCQUFrQixhQUFhLGtCQUFrQixPQUFPLENBQUM7QUFDL0UsbUJBQVMsU0FBUyxLQUFLLGFBQWE7UUFDdEM7TUFDRjtJQUNGLENBQUM7RUFDSDtBQUNGO0FDL0hPLElBQU0sY0FBTixNQUFNLGFBQVk7Ozs7O0VBc0J2QixJQUFXLFdBQW9CO0FBQzdCLFlBQVEsS0FBSyw0RkFBNEY7QUFFekcsV0FBTyxLQUFLO0VBQ2Q7Ozs7O0VBTUEsSUFBVyxjQUF1QjtBQUNoQyxXQUFPLEtBQUssZUFBZTtFQUM3Qjs7Ozs7RUFNQSxJQUFXLHFCQUE4QjtBQUN2QyxXQUFPLEtBQUssc0JBQXNCO0VBQ3BDOzs7O0VBS0EsSUFBVyxhQUE0QjtBQUVyQyxXQUFPLEtBQUssZUFBZTtFQUM3Qjs7OztFQUtBLElBQVcsZ0JBQStCO0FBQ3hDLFdBQU8sS0FBSyxlQUFlO0VBQzdCOzs7O0VBS0EsSUFBVyx1QkFBc0M7QUFDL0MsV0FBTyxLQUFLLHNCQUFzQjtFQUNwQzs7OztFQUtBLElBQVcsMkJBQTJDO0FBQ3BELFdBQU8sS0FBSyxzQkFBc0I7RUFDcEM7Ozs7OztFQU9PLFlBQVksWUFBMkIsU0FBOEM7QUF6RjlGLFFBQUE7QUEwRkksU0FBSyx3QkFBdUIsS0FBQSxXQUFBLE9BQUEsU0FBQSxRQUFTLHlCQUFULE9BQUEsS0FBaUM7QUFDN0QsU0FBSyxpQkFBaUIsSUFBSSxPQUFPLFVBQVU7QUFDM0MsU0FBSyx3QkFBd0IsSUFBSSxlQUFlLEtBQUssY0FBYztFQUNyRTs7Ozs7O0VBT08sS0FBSyxRQUEyQjtBQUNyQyxTQUFLLHVCQUF1QixPQUFPO0FBQ25DLFNBQUssaUJBQWlCLElBQUksT0FBTyxPQUFPLFVBQVU7QUFDbEQsU0FBSyx3QkFBd0IsSUFBSSxlQUFlLEtBQUssY0FBYztBQUVuRSxXQUFPO0VBQ1Q7Ozs7O0VBTU8sUUFBcUI7QUFDMUIsV0FBTyxJQUFJLGFBQVksS0FBSyxZQUFZLEVBQUUsc0JBQXNCLEtBQUsscUJBQXFCLENBQUMsRUFBRSxLQUFLLElBQUk7RUFDeEc7Ozs7RUFLTyxrQkFBMkI7QUFDaEMsWUFBUTtNQUNOO0lBQ0Y7QUFFQSxXQUFPLEtBQUssbUJBQW1CO0VBQ2pDOzs7Ozs7RUFPTyxxQkFBOEI7QUFDbkMsV0FBTyxLQUFLLGVBQWUsZ0JBQWdCO0VBQzdDOzs7Ozs7RUFPTyw0QkFBcUM7QUFDMUMsV0FBTyxLQUFLLHNCQUFzQixnQkFBZ0I7RUFDcEQ7Ozs7RUFLTyxVQUFtQjtBQUN4QixZQUFRLEtBQUssK0ZBQStGO0FBRTVHLFdBQU8sS0FBSyxXQUFXO0VBQ3pCOzs7Ozs7RUFPTyxhQUFzQjtBQUMzQixXQUFPLEtBQUssZUFBZSxRQUFRO0VBQ3JDOzs7Ozs7RUFPTyxvQkFBNkI7QUFDbEMsV0FBTyxLQUFLLHNCQUFzQixRQUFRO0VBQzVDOzs7O0VBS08sUUFBUSxZQUEyQjtBQUN4QyxZQUFRLEtBQUssK0ZBQStGO0FBRTVHLFdBQU8sS0FBSyxXQUFXLFVBQVU7RUFDbkM7Ozs7Ozs7Ozs7O0VBWU8sV0FBVyxZQUEyQjtBQUMzQyxXQUFPLEtBQUssZUFBZSxRQUFRLFVBQVU7RUFDL0M7Ozs7Ozs7OztFQVVPLGtCQUFrQixZQUEyQjtBQUNsRCxXQUFPLEtBQUssc0JBQXNCLFFBQVEsVUFBVTtFQUN0RDs7OztFQUtPLFlBQWtCO0FBQ3ZCLFlBQVEsS0FBSyxxR0FBcUc7QUFFbEgsV0FBTyxLQUFLLGFBQWE7RUFDM0I7Ozs7OztFQU9PLGVBQXFCO0FBQzFCLFdBQU8sS0FBSyxlQUFlLFVBQVU7RUFDdkM7Ozs7RUFLTyxzQkFBNEI7QUFDakMsV0FBTyxLQUFLLHNCQUFzQixVQUFVO0VBQzlDOzs7O0VBS08sUUFBUSxNQUFrRDtBQUMvRCxZQUFRLEtBQUssK0ZBQStGO0FBRTVHLFdBQU8sS0FBSyxXQUFXLElBQUk7RUFDN0I7Ozs7OztFQU9PLFdBQVcsTUFBa0Q7QUFDbEUsV0FBTyxLQUFLLGVBQWUsUUFBUSxJQUFJO0VBQ3pDOzs7Ozs7RUFPTyxrQkFBa0IsTUFBa0Q7QUFDekUsV0FBTyxLQUFLLHNCQUFzQixRQUFRLElBQUk7RUFDaEQ7Ozs7RUFLTyxZQUFZLE1BQStDO0FBQ2hFLFlBQVE7TUFDTjtJQUNGO0FBRUEsV0FBTyxLQUFLLGVBQWUsSUFBSTtFQUNqQzs7Ozs7O0VBT08sZUFBZSxNQUErQztBQUNuRSxXQUFPLEtBQUssZUFBZSxZQUFZLElBQUk7RUFDN0M7Ozs7OztFQU9PLHNCQUFzQixNQUErQztBQUMxRSxXQUFPLEtBQUssc0JBQXNCLFlBQVksSUFBSTtFQUNwRDs7Ozs7O0VBT08sU0FBZTtBQUNwQixRQUFJLEtBQUssc0JBQXNCO0FBQzdCLFdBQUssc0JBQXNCLE9BQU87SUFDcEM7RUFDRjtBQUNGO0FDeFNPLElBQU0sMkJBQTJCO0VBQ3RDLE1BQU07RUFDTixPQUFPO0VBQ1AsTUFBTTtFQUNOLGNBQWM7RUFDZCxjQUFjO0VBQ2QsVUFBVTtFQUNWLGVBQWU7RUFDZixlQUFlO0VBQ2YsV0FBVztFQUNYLGNBQWM7RUFDZCxjQUFjO0VBQ2QsVUFBVTtFQUNWLGVBQWU7RUFDZixlQUFlO0VBQ2YsV0FBVztBQUNiO0FDSkEsSUFBTUYsMEJBQXlCLG9CQUFJLElBQUksQ0FBQyxPQUFPLFVBQVUsQ0FBQztBQUsxRCxJQUFNLG1CQUFxRjtFQUN6RixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLG9CQUFvQjtFQUNwQix3QkFBd0I7QUFDMUI7QUFLTyxJQUFNLDBCQUFOLE1BQTBEO0VBWS9ELElBQVcsT0FBZTtBQUV4QixXQUFPO0VBQ1Q7RUFFTyxZQUFZLFFBQW9CLFNBQTBDO0FBQy9FLFNBQUssU0FBUztBQUVkLFNBQUssYUFBYSxXQUFBLE9BQUEsU0FBQSxRQUFTO0FBQzNCLFNBQUssdUJBQXVCLFdBQUEsT0FBQSxTQUFBLFFBQVM7RUFDdkM7RUFFYSxVQUFVLE1BQTJCO0FBQUEsV0FBQVAsU0FBQSxNQUFBLE1BQUEsYUFBQTtBQUNoRCxXQUFLLFNBQVMsY0FBYyxNQUFNLEtBQUssUUFBUSxJQUFJO0lBQ3JELENBQUE7RUFBQTs7Ozs7O0VBT2MsUUFBUSxNQUF5QztBQUFBLFdBQUFBLFNBQUEsTUFBQSxNQUFBLGFBQUE7QUFDN0QsWUFBTSxXQUFXLE1BQU0sS0FBSyxVQUFVLElBQUk7QUFDMUMsVUFBSSxVQUFVO0FBQ1osZUFBTztNQUNUO0FBRUEsWUFBTSxXQUFXLE1BQU0sS0FBSyxVQUFVLElBQUk7QUFDMUMsVUFBSSxVQUFVO0FBQ1osZUFBTztNQUNUO0FBRUEsYUFBTztJQUNULENBQUE7RUFBQTtFQUVjLFVBQVUsTUFBeUM7QUFBQSxXQUFBQSxTQUFBLE1BQUEsTUFBQSxhQUFBO0FBNUVuRSxVQUFBLElBQUE7QUE2RUksWUFBTSxPQUFPLEtBQUssT0FBTztBQUd6QixZQUFNLGNBQVksS0FBQSxLQUFLLG1CQUFMLE9BQUEsU0FBQSxHQUFxQixRQUFRLFVBQUEsT0FBZ0I7QUFDL0QsVUFBSSxDQUFDLFdBQVc7QUFDZCxlQUFPO01BQ1Q7QUFFQSxZQUFNLGFBQVksS0FBQSxLQUFLLGVBQUwsT0FBQSxTQUFBLEdBQWtCLFVBQUE7QUFDcEMsVUFBSSxDQUFDLFdBQVc7QUFDZCxlQUFPO01BQ1Q7QUFFQSxZQUFNLGNBQWMsVUFBVTtBQUM5QixVQUFJLENBQUNPLHdCQUF1QixJQUFJLFdBQVcsR0FBRztBQUM1QyxnQkFBUSxLQUFLLDBEQUEwRCxXQUFXLEdBQUc7QUFDckYsZUFBTztNQUNUO0FBRUEsWUFBTSxpQkFBaUIsVUFBVTtBQUNqQyxVQUFJLENBQUMsZ0JBQWdCO0FBQ25CLGVBQU87TUFDVDtBQU9BLFlBQU0sMEJBQ0gsZUFBZSxXQUFtQix5QkFBeUIsUUFDM0QsZUFBZSxXQUFtQiwwQkFBMEI7QUFFL0QsWUFBTSxhQUFxQyxDQUFDO0FBQzVDLFVBQUksZUFBZSxjQUFjLE1BQU07QUFDckMsY0FBTSxRQUFRO1VBQ1osT0FBTyxRQUFRLGVBQWUsVUFBVSxFQUFFLElBQUksQ0FBTyxPQUFzQ1AsU0FBQSxNQUFBLENBQXRDLEVBQUEsR0FBc0MsV0FBdEMsQ0FBQyxnQkFBZ0IsZUFBZSxHQUFNO0FBQ3pGLGdCQUFJLFdBQVc7QUFDZixrQkFBTSxRQUFRLGdCQUFnQjtBQUc5QixnQkFBSSx5QkFBeUI7QUFDM0Isb0JBQU0sZ0JBQWdCLGlCQUFpQixRQUFRO0FBQy9DLGtCQUFJLGlCQUFpQixNQUFNO0FBQ3pCLDJCQUFXO2NBQ2I7WUFDRjtBQUVBLGtCQUFNLE9BQU8sTUFBTSxLQUFLLE9BQU8sY0FBYyxRQUFRLEtBQUs7QUFHMUQsZ0JBQUksUUFBUSxNQUFNO0FBQ2hCLHNCQUFRLEtBQUssMENBQTBDLFFBQVEsYUFBYSxLQUFLLGtCQUFrQjtBQUNuRztZQUNGO0FBR0EsdUJBQVcsUUFBUSxJQUFJLEVBQUUsS0FBSztVQUNoQyxDQUFBLENBQUM7UUFDSDtNQUNGO0FBRUEsWUFBTSxXQUFXLElBQUksWUFBWSxLQUFLLDBCQUEwQixVQUFVLEdBQUc7UUFDM0Usc0JBQXNCLEtBQUs7TUFDN0IsQ0FBQztBQUNELFdBQUssTUFBTSxJQUFJLFNBQVMsd0JBQXdCO0FBRWhELFVBQUksS0FBSyxZQUFZO0FBQ25CLGNBQU0sU0FBUyxJQUFJLGtCQUFrQixRQUFRO0FBQzdDLGFBQUssV0FBVyxJQUFJLE1BQU07QUFDMUIsZUFBTyxjQUFjLEtBQUssV0FBVztNQUN2QztBQUVBLGFBQU87SUFDVCxDQUFBO0VBQUE7RUFFYyxVQUFVLE1BQXlDO0FBQUEsV0FBQUEsU0FBQSxNQUFBLE1BQUEsYUFBQTtBQXpKbkUsVUFBQTtBQTBKSSxZQUFNLE9BQU8sS0FBSyxPQUFPO0FBRXpCLFlBQU0sVUFBUyxLQUFBLEtBQUssZUFBTCxPQUFBLFNBQUEsR0FBaUI7QUFDaEMsVUFBSSxDQUFDLFFBQVE7QUFDWCxlQUFPO01BQ1Q7QUFFQSxZQUFNLGlCQUE2QyxPQUFPO0FBQzFELFVBQUksQ0FBQyxnQkFBZ0I7QUFDbkIsZUFBTztNQUNUO0FBRUEsWUFBTSxhQUFxQyxDQUFDO0FBQzVDLFVBQUksZUFBZSxjQUFjLE1BQU07QUFDckMsY0FBTSxRQUFRO1VBQ1osZUFBZSxXQUFXLElBQUksQ0FBTyxTQUFTQSxTQUFBLE1BQUEsTUFBQSxhQUFBO0FBQzVDLGtCQUFNLFdBQVcsS0FBSztBQUN0QixrQkFBTSxRQUFRLEtBQUs7QUFFbkIsZ0JBQUksWUFBWSxRQUFRLFNBQVMsTUFBTTtBQUNyQztZQUNGO0FBRUEsa0JBQU0sT0FBTyxNQUFNLEtBQUssT0FBTyxjQUFjLFFBQVEsS0FBSztBQUcxRCxnQkFBSSxRQUFRLE1BQU07QUFDaEIsc0JBQVEsS0FBSywwQ0FBMEMsUUFBUSxhQUFhLEtBQUssa0JBQWtCO0FBQ25HO1lBQ0Y7QUFHQSxrQkFBTSxnQkFBZ0IsaUJBQWlCLFFBQVE7QUFDL0Msa0JBQU0sY0FBZSxpQkFBQSxPQUFBLGdCQUFpQjtBQUl0QyxnQkFBSSxXQUFXLFdBQVcsS0FBSyxNQUFNO0FBQ25DLHNCQUFRO2dCQUNOLDZCQUE2QixXQUFXLHNCQUFzQixLQUFLO2NBQ3JFO0FBQ0E7WUFDRjtBQUdBLHVCQUFXLFdBQVcsSUFBSSxFQUFFLEtBQUs7VUFDbkMsQ0FBQSxDQUFDO1FBQ0g7TUFDRjtBQUVBLFlBQU0sV0FBVyxJQUFJLFlBQVksS0FBSywwQkFBMEIsVUFBVSxHQUFHO1FBQzNFLHNCQUFzQixLQUFLO01BQzdCLENBQUM7QUFDRCxXQUFLLE1BQU0sSUFBSSxTQUFTLHdCQUF3QjtBQUVoRCxVQUFJLEtBQUssWUFBWTtBQUNuQixjQUFNLFNBQVMsSUFBSSxrQkFBa0IsUUFBUTtBQUM3QyxhQUFLLFdBQVcsSUFBSSxNQUFNO0FBQzFCLGVBQU8sY0FBYyxLQUFLLFdBQVc7TUFDdkM7QUFFQSxhQUFPO0lBQ1QsQ0FBQTtFQUFBOzs7Ozs7RUFPUSwwQkFBMEIsWUFBbUQ7QUFFbkYsVUFBTSx1QkFBdUIsT0FBTyxPQUFPLHdCQUF3QixFQUFFO01BQ25FLENBQUMscUJBQXFCLFdBQVcsZ0JBQWdCLEtBQUs7SUFDeEQ7QUFHQSxRQUFJLHFCQUFxQixTQUFTLEdBQUc7QUFDbkMsWUFBTSxJQUFJO1FBQ1IsNkVBQTZFLHFCQUFxQixLQUFLLElBQUksQ0FBQztNQUM5RztJQUNGO0FBRUEsV0FBTztFQUNUO0FBQ0Y7QUU1T08sSUFBTSxvQkFBTixjQUFzQyxzQkFBZTtFQVFuRCxjQUFjO0FBQ25CLFVBQU07QUFOUixTQUFRLGdCQUFnQjtBQUN4QixTQUFRLGlCQUFpQjtBQU92QixTQUFLLFFBQVE7QUFDYixTQUFLLFNBQVM7QUFDZCxTQUFLLGdCQUFnQjtBQUNyQixTQUFLLGlCQUFpQjtBQUV0QixTQUFLLFdBQVcsSUFBVSx1QkFBZ0IsSUFBSSxhQUFhLEtBQUssQ0FBQyxHQUFHLENBQUM7QUFDckUsU0FBSyxhQUFhLFlBQVksS0FBSyxRQUFRO0FBRTNDLFNBQUssYUFBYSxJQUFVLHVCQUFnQixJQUFJLFlBQVksSUFBSSxFQUFFLEdBQUcsQ0FBQztBQUN0RSxTQUFLLFNBQVMsS0FBSyxVQUFVO0FBRTdCLFNBQUssWUFBWTtBQUNqQixTQUFLLE9BQU87RUFDZDtFQUVPLFNBQWU7QUFDcEIsUUFBSSx1QkFBdUI7QUFFM0IsUUFBSSxLQUFLLGtCQUFrQixLQUFLLE9BQU87QUFDckMsV0FBSyxnQkFBZ0IsS0FBSztBQUMxQiw2QkFBdUI7SUFDekI7QUFFQSxRQUFJLEtBQUssbUJBQW1CLEtBQUssUUFBUTtBQUN2QyxXQUFLLGlCQUFpQixLQUFLO0FBQzNCLDZCQUF1QjtJQUN6QjtBQUVBLFFBQUksc0JBQXNCO0FBQ3hCLFdBQUssZUFBZTtJQUN0QjtFQUNGO0VBRVEsaUJBQXVCO0FBQzdCLFNBQUssU0FBUyxPQUFPLEdBQUcsR0FBSyxHQUFLLENBQUc7QUFFckMsYUFBUyxJQUFJLEdBQUcsSUFBSSxJQUFJLEtBQUs7QUFDM0IsWUFBTSxJQUFLLElBQUksS0FBUSxLQUFLO0FBRTVCLFdBQUssU0FBUyxPQUFPLElBQUksR0FBRyxLQUFLLGlCQUFpQixLQUFLLElBQUksQ0FBQyxHQUFHLEdBQUssS0FBSyxpQkFBaUIsS0FBSyxJQUFJLENBQUMsQ0FBQztJQUN2RztBQUVBLFNBQUssU0FBUyxjQUFjO0VBQzlCO0VBRVEsY0FBb0I7QUFDMUIsYUFBUyxJQUFJLEdBQUcsSUFBSSxJQUFJLEtBQUs7QUFDM0IsV0FBSyxXQUFXLE9BQU8sSUFBSSxHQUFHLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQztJQUMvQztBQUVBLFNBQUssV0FBVyxjQUFjO0VBQ2hDO0FBQ0Y7QUMvRE8sSUFBTSw4QkFBTixjQUFnRCx1QkFBZTtFQVE3RCxjQUFjO0FBQ25CLFVBQU07QUFFTixTQUFLLFNBQVM7QUFDZCxTQUFLLGlCQUFpQjtBQUV0QixTQUFLLE9BQU8sSUFBVSxnQkFBUTtBQUM5QixTQUFLLGVBQWUsSUFBVSxnQkFBUTtBQUV0QyxTQUFLLFdBQVcsSUFBVSx3QkFBZ0IsSUFBSSxhQUFhLEdBQUcsR0FBRyxDQUFDO0FBQ2xFLFNBQUssYUFBYSxZQUFZLEtBQUssUUFBUTtBQUUzQyxTQUFLLGFBQWEsSUFBVSx3QkFBZ0IsSUFBSSxZQUFZLEdBQUcsR0FBRyxDQUFDO0FBQ25FLFNBQUssU0FBUyxLQUFLLFVBQVU7QUFFN0IsU0FBSyxZQUFZO0FBQ2pCLFNBQUssT0FBTztFQUNkO0VBRU8sU0FBZTtBQUNwQixRQUFJLHVCQUF1QjtBQUUzQixRQUFJLEtBQUssbUJBQW1CLEtBQUssUUFBUTtBQUN2QyxXQUFLLGlCQUFpQixLQUFLO0FBQzNCLDZCQUF1QjtJQUN6QjtBQUVBLFFBQUksQ0FBQyxLQUFLLGFBQWEsT0FBTyxLQUFLLElBQUksR0FBRztBQUN4QyxXQUFLLGFBQWEsS0FBSyxLQUFLLElBQUk7QUFDaEMsNkJBQXVCO0lBQ3pCO0FBRUEsUUFBSSxzQkFBc0I7QUFDeEIsV0FBSyxlQUFlO0lBQ3RCO0VBQ0Y7RUFFUSxpQkFBdUI7QUFDN0IsYUFBUyxJQUFJLEdBQUcsSUFBSSxJQUFJLEtBQUs7QUFDM0IsWUFBTSxJQUFLLElBQUksS0FBUSxLQUFLO0FBRTVCLFdBQUssU0FBUyxPQUFPLEdBQUcsS0FBSyxJQUFJLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUc7QUFDckQsV0FBSyxTQUFTLE9BQU8sS0FBSyxHQUFHLEdBQUssS0FBSyxJQUFJLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxDQUFDO0FBQzFELFdBQUssU0FBUyxPQUFPLEtBQUssR0FBRyxLQUFLLElBQUksQ0FBQyxHQUFHLEdBQUssS0FBSyxJQUFJLENBQUMsQ0FBQztJQUM1RDtBQUVBLFNBQUssTUFBTSxLQUFLLGdCQUFnQixLQUFLLGdCQUFnQixLQUFLLGNBQWM7QUFDeEUsU0FBSyxVQUFVLEtBQUssYUFBYSxHQUFHLEtBQUssYUFBYSxHQUFHLEtBQUssYUFBYSxDQUFDO0FBRTVFLFNBQUssU0FBUyxPQUFPLElBQUksR0FBRyxHQUFHLENBQUM7QUFDaEMsU0FBSyxTQUFTLE9BQU8sSUFBSSxLQUFLLGFBQWEsR0FBRyxLQUFLLGFBQWEsR0FBRyxLQUFLLGFBQWEsQ0FBQztBQUV0RixTQUFLLFNBQVMsY0FBYztFQUM5QjtFQUVRLGNBQW9CO0FBQzFCLGFBQVMsSUFBSSxHQUFHLElBQUksSUFBSSxLQUFLO0FBQzNCLFlBQU0sTUFBTSxJQUFJLEtBQUs7QUFFckIsV0FBSyxXQUFXLE1BQU0sSUFBSSxHQUFHLEdBQUcsRUFBRTtBQUNsQyxXQUFLLFdBQVcsTUFBTSxLQUFLLElBQUksR0FBRyxLQUFLLEdBQUcsS0FBSyxFQUFFO0FBQ2pELFdBQUssV0FBVyxNQUFNLE1BQU0sSUFBSSxHQUFHLEtBQUssR0FBRyxLQUFLLEVBQUU7SUFDcEQ7QUFDQSxTQUFLLFdBQVcsTUFBTSxLQUFLLElBQUksRUFBRTtBQUVqQyxTQUFLLFdBQVcsY0FBYztFQUNoQztBQUNGO0FGeEVBLElBQU1TLFVBQVMsSUFBVSxtQkFBVztBQUNwQyxJQUFNLFNBQVMsSUFBVSxtQkFBVztBQUNwQyxJQUFNRCxRQUFPLElBQVUsZ0JBQVE7QUFDL0IsSUFBTUUsUUFBTyxJQUFVLGdCQUFRO0FBRS9CLElBQU0sZ0JBQWdCLEtBQUssS0FBSyxDQUFHLElBQUk7QUFDdkMsSUFBTSxlQUFlLElBQVUsbUJBQVcsR0FBRyxHQUFHLENBQUMsZUFBZSxhQUFhO0FBQzdFLElBQU0sa0JBQWtCLElBQVUsZ0JBQVEsR0FBSyxHQUFLLENBQUc7QUFFaEQsSUFBTSxrQkFBTixjQUFvQyxjQUFNO0VBTXhDLFlBQVksUUFBbUI7QUFDcEMsVUFBTTtBQUNOLFNBQUssbUJBQW1CO0FBRXhCLFNBQUssWUFBWTtBQUVqQjtBQUNFLFlBQU0sV0FBVyxJQUFJLGtCQUFrQjtBQUN2QyxlQUFTLFNBQVM7QUFFbEIsWUFBTSxXQUFXLElBQVUsMEJBQWtCO1FBQzNDLE9BQU87UUFDUCxhQUFhO1FBQ2IsU0FBUztRQUNULE1BQVk7UUFDWixXQUFXO1FBQ1gsWUFBWTtNQUNkLENBQUM7QUFFRCxXQUFLLGFBQWEsSUFBVSxhQUFLLFVBQVUsUUFBUTtBQUNuRCxXQUFLLElBQUksS0FBSyxVQUFVO0lBQzFCO0FBRUE7QUFDRSxZQUFNLFdBQVcsSUFBSSxrQkFBa0I7QUFDdkMsZUFBUyxTQUFTO0FBRWxCLFlBQU0sV0FBVyxJQUFVLDBCQUFrQjtRQUMzQyxPQUFPO1FBQ1AsYUFBYTtRQUNiLFNBQVM7UUFDVCxNQUFZO1FBQ1osV0FBVztRQUNYLFlBQVk7TUFDZCxDQUFDO0FBRUQsV0FBSyxXQUFXLElBQVUsYUFBSyxVQUFVLFFBQVE7QUFDakQsV0FBSyxJQUFJLEtBQUssUUFBUTtJQUN4QjtBQUVBO0FBQ0UsWUFBTSxXQUFXLElBQUksNEJBQTRCO0FBQ2pELGVBQVMsU0FBUztBQUVsQixZQUFNLFdBQVcsSUFBVSwwQkFBa0I7UUFDM0MsT0FBTztRQUNQLFdBQVc7UUFDWCxZQUFZO01BQ2QsQ0FBQztBQUVELFdBQUssY0FBYyxJQUFVLHFCQUFhLFVBQVUsUUFBUTtBQUM1RCxXQUFLLFlBQVksZ0JBQWdCO0FBQ2pDLFdBQUssSUFBSSxLQUFLLFdBQVc7SUFDM0I7RUFDRjtFQUVPLFVBQWdCO0FBQ3JCLFNBQUssU0FBUyxTQUFTLFFBQVE7QUFDL0IsU0FBSyxTQUFTLFNBQVMsUUFBUTtBQUUvQixTQUFLLFdBQVcsU0FBUyxRQUFRO0FBQ2pDLFNBQUssV0FBVyxTQUFTLFFBQVE7QUFFakMsU0FBSyxZQUFZLFNBQVMsUUFBUTtBQUNsQyxTQUFLLFlBQVksU0FBUyxRQUFRO0VBQ3BDO0VBRU8sa0JBQWtCLE9BQXNCO0FBRTdDLFVBQU0sTUFBWSxrQkFBVSxVQUFVLEtBQUssVUFBVTtBQUNyRCxTQUFLLFNBQVMsU0FBUyxRQUFRO0FBQy9CLFNBQUssU0FBUyxTQUFTLE9BQU87QUFFOUIsVUFBTSxRQUFjLGtCQUFVLFVBQVUsS0FBSyxVQUFVO0FBQ3ZELFNBQUssV0FBVyxTQUFTLFFBQVE7QUFDakMsU0FBSyxXQUFXLFNBQVMsT0FBTztBQUdoQyxTQUFLLFVBQVUsdUJBQXVCRixLQUFJO0FBQzFDLFNBQUssVUFBVSx5QkFBeUJDLE9BQU07QUFHOUNBLFlBQU8sU0FBUyxLQUFLLFVBQVUsdUJBQXVCLE1BQU0sQ0FBQztBQUc3RCxTQUFLLFNBQVMsU0FBUyxLQUFLRCxLQUFJO0FBQ2hDLFNBQUssU0FBUyxXQUFXLEtBQUtDLE9BQU07QUFFcEMsU0FBSyxXQUFXLFNBQVMsS0FBS0QsS0FBSTtBQUNsQyxTQUFLLFdBQVcsV0FBVyxLQUFLQyxPQUFNO0FBQ3RDLFNBQUssV0FBVyxXQUFXLFNBQVMsT0FBTyxpQkFBaUIsaUJBQWlCLEdBQUcsQ0FBQztBQUNqRixTQUFLLFdBQVcsV0FBVyxTQUFTLFlBQVk7QUFHaEQsVUFBTSxFQUFFLFFBQVEsV0FBVyxJQUFJLEtBQUs7QUFDcEMsUUFBSSxVQUFVLFFBQVEsWUFBWTtBQUNoQyxhQUFPLGlCQUFpQkMsS0FBSSxFQUFFLElBQUlGLEtBQUk7QUFDdEMsV0FBSyxZQUFZLFNBQVMsS0FBSyxLQUFLRSxLQUFJO0FBQ3hDLFdBQUssWUFBWSxTQUFTLE9BQU87QUFDakMsV0FBSyxZQUFZLFNBQVMsS0FBS0YsS0FBSTtJQUNyQztBQUdBLFVBQU0sa0JBQWtCLEtBQUs7RUFDL0I7QUFDRjtBSTNIQSxJQUFNLFlBQVksSUFBVSxnQkFBUTtBQUNwQyxJQUFNLFNBQVMsSUFBVSxnQkFBUTtBQVUxQixTQUFTLHVCQUF1QixRQUF3QixLQUF5QztBQUN0RyxTQUFPLFlBQVksVUFBVSxXQUFXLEtBQUssTUFBTTtBQUNuRCxTQUFPO0FBQ1Q7QUNITyxTQUFTLG9CQUFvQixRQUE0RDtBQUM5RixTQUFPLENBQUMsS0FBSyxNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEtBQUssTUFBTSxPQUFPLEdBQUcsS0FBSyxLQUFLLE9BQU8sSUFBSSxPQUFPLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDckg7QUNMTyxTQUFTLGNBQWMsT0FBdUI7QUFDbkQsUUFBTSxZQUFZLEtBQUssTUFBTSxRQUFRLElBQU0sS0FBSyxFQUFFO0FBQ2xELFNBQU8sUUFBUSxJQUFNLEtBQUssS0FBSztBQUNqQztBSExBLElBQU0sa0JBQWtCLElBQVUsZ0JBQVEsR0FBSyxHQUFLLENBQUc7QUFFdkQsSUFBTUEsUUFBTyxJQUFVLGdCQUFRO0FBQy9CLElBQU1FLFFBQU8sSUFBVSxnQkFBUTtBQUMvQixJQUFNLE9BQU8sSUFBVSxnQkFBUTtBQUMvQixJQUFNRCxVQUFTLElBQVUsbUJBQVc7QUFDcEMsSUFBTUUsVUFBUyxJQUFVLG1CQUFXO0FBQ3BDLElBQU0sU0FBUyxJQUFVLG1CQUFXO0FBQ3BDLElBQU0sU0FBUyxJQUFVLG1CQUFXO0FBQ3BDLElBQU0sVUFBVSxJQUFVLGNBQU07QUFLekIsSUFBTSxhQUFOLE1BQU1DLFlBQVU7Ozs7Ozs7RUEwR2QsWUFBWSxVQUF1QixTQUEyQjtBQXBHckUsU0FBTyxxQkFBcUIsSUFBVSxnQkFBUTtBQWtCOUMsU0FBTyxhQUFhO0FBZXBCLFNBQU8sWUFBWSxJQUFVLGdCQUFRLEdBQUssR0FBSyxDQUFHO0FBb0VoRCxTQUFLLFdBQVc7QUFDaEIsU0FBSyxVQUFVO0FBRWYsU0FBSyxPQUFPO0FBQ1osU0FBSyxTQUFTO0FBQ2QsU0FBSyxlQUFlO0FBRXBCLFNBQUssMkJBQTJCLEtBQUsseUJBQXlCLElBQVUsbUJBQVcsQ0FBQztFQUN0Rjs7OztFQWxFQSxJQUFXLE1BQWM7QUFDdkIsV0FBTyxLQUFLO0VBQ2Q7Ozs7RUFLQSxJQUFXLElBQUksT0FBZTtBQUM1QixTQUFLLE9BQU87QUFDWixTQUFLLGVBQWU7RUFDdEI7Ozs7RUFVQSxJQUFXLFFBQWdCO0FBQ3pCLFdBQU8sS0FBSztFQUNkOzs7O0VBS0EsSUFBVyxNQUFNLE9BQWU7QUFDOUIsU0FBSyxTQUFTO0FBQ2QsU0FBSyxlQUFlO0VBQ3RCOzs7O0VBZUEsSUFBVyxRQUFxQjtBQUM5QixZQUFRLEtBQUsseURBQXlEO0FBRXRFLFdBQU8sS0FBSyxTQUFTLElBQVUsY0FBTSxDQUFDO0VBQ3hDOzs7Ozs7O0VBeUJPLFNBQVMsUUFBa0M7QUFDaEQsV0FBTyxPQUFPLElBQVUsa0JBQVUsVUFBVSxLQUFLLFFBQWMsa0JBQVUsVUFBVSxLQUFLLE1BQU0sR0FBSyxLQUFLO0VBQzFHOzs7Ozs7OztFQVNPLEtBQUssUUFBeUI7QUFDbkMsUUFBSSxLQUFLLGFBQWEsT0FBTyxVQUFVO0FBQ3JDLFlBQU0sSUFBSSxNQUFNLG1EQUFtRDtJQUNyRTtBQUVBLFNBQUssbUJBQW1CLEtBQUssT0FBTyxrQkFBa0I7QUFDdEQsU0FBSyxVQUFVLE9BQU87QUFDdEIsU0FBSyxhQUFhLE9BQU87QUFDekIsU0FBSyxTQUFTLE9BQU87QUFDckIsU0FBSyxVQUFVLEtBQUssT0FBTyxTQUFTO0FBRXBDLFdBQU87RUFDVDs7Ozs7O0VBT08sUUFBbUI7QUFDeEIsV0FBTyxJQUFJQSxZQUFVLEtBQUssVUFBVSxLQUFLLE9BQU8sRUFBRSxLQUFLLElBQUk7RUFDN0Q7Ozs7RUFLTyxRQUFjO0FBQ25CLFNBQUssT0FBTztBQUNaLFNBQUssU0FBUztBQUNkLFNBQUssZUFBZTtFQUN0Qjs7Ozs7O0VBT08sdUJBQXVCLFFBQXNDO0FBQ2xFLFVBQU0sT0FBTyxLQUFLLFNBQVMsZUFBZSxNQUFNO0FBRWhELFdBQU8sT0FBTyxLQUFLLEtBQUssa0JBQWtCLEVBQUUsYUFBYSxLQUFLLFdBQVc7RUFDM0U7Ozs7Ozs7RUFRTyx5QkFBeUIsUUFBNEM7QUFDMUUsVUFBTSxPQUFPLEtBQUssU0FBUyxlQUFlLE1BQU07QUFFaEQsV0FBTyx1QkFBdUIsTUFBTSxNQUFNO0VBQzVDOzs7Ozs7RUFPTyx1QkFBdUIsUUFBNEM7QUFDeEUsUUFBSSxLQUFLLFVBQVUsa0JBQWtCLGVBQWUsSUFBSSxNQUFNO0FBQzVELGFBQU8sT0FBTyxLQUFLLEtBQUssd0JBQXdCLEVBQUUsT0FBTztJQUMzRDtBQUVBLFVBQU0sQ0FBQyxrQkFBa0IsaUJBQWlCLElBQUksb0JBQW9CLEtBQUssU0FBUztBQUNoRixZQUFRLElBQUksR0FBSyxNQUFNLEtBQUssS0FBSyxrQkFBa0IsbUJBQW1CLEtBQUs7QUFFM0UsV0FBTyxPQUFPLGFBQWEsT0FBTyxFQUFFLFlBQVksT0FBTyxLQUFLLEtBQUssd0JBQXdCLEVBQUUsT0FBTyxDQUFDO0VBQ3JHOzs7Ozs7RUFPTyx3QkFBd0IsUUFBc0M7QUFDbkUsU0FBSyx5QkFBeUJELE9BQU07QUFDcEMsU0FBSyx1QkFBdUIsTUFBTTtBQUVsQyxXQUFPLE9BQ0osS0FBSyxlQUFlLEVBQ3BCLGdCQUFnQkEsT0FBTSxFQUN0QixnQkFBZ0IsTUFBTSxFQUN0QixXQUFXLEtBQUssU0FBUyxPQUFPLENBQUM7RUFDdEM7Ozs7Ozs7Ozs7RUFXTyxPQUFPLFVBQStCO0FBRTNDLFVBQU0saUJBQWlCRixRQUNwQixLQUFLLEtBQUssd0JBQXdCLEVBQ2xDLFNBQVMsaUJBQWlCLEtBQUsseUJBQXlCRSxPQUFNLENBQUMsQ0FBQztBQUNuRSxVQUFNLFVBQVUsS0FBSyx1QkFBdUJELEtBQUk7QUFDaEQsVUFBTSxZQUFZLEtBQUssS0FBSyxRQUFRLEVBQUUsSUFBSSxPQUFPLEVBQUUsZ0JBQWdCLGNBQWMsRUFBRSxVQUFVO0FBRzdGLFVBQU0sQ0FBQyxhQUFhLFlBQVksSUFBSSxvQkFBb0IsS0FBSyxTQUFTO0FBQ3RFLFVBQU0sQ0FBQyxXQUFXLFVBQVUsSUFBSSxvQkFBb0IsU0FBUztBQUM3RCxVQUFNLE1BQU0sY0FBYyxZQUFZLFdBQVc7QUFDakQsVUFBTSxRQUFRLGNBQWMsZUFBZSxVQUFVO0FBR3JELFNBQUssT0FBYSxrQkFBVSxVQUFVO0FBQ3RDLFNBQUssU0FBZSxrQkFBVSxVQUFVO0FBRXhDLFNBQUssZUFBZTtFQUN0Qjs7Ozs7OztFQVFPLE9BQU8sT0FBcUI7QUFDakMsUUFBSSxLQUFLLFVBQVUsUUFBUSxLQUFLLFlBQVk7QUFDMUMsV0FBSyxPQUFPLEtBQUssT0FBTyxpQkFBaUJGLEtBQUksQ0FBQztJQUNoRDtBQUVBLFFBQUksS0FBSyxjQUFjO0FBQ3JCLFdBQUssZUFBZTtBQUVwQixXQUFLLFFBQVEsY0FBYyxLQUFLLE1BQU0sS0FBSyxNQUFNO0lBQ25EO0VBQ0Y7QUFDRjtBQTVRYSxXQUNZLGNBQWM7QUFEaEMsSUFBTSxZQUFOO0FJZlAsSUFBTUssbUJBQWtCLElBQVUsZ0JBQVEsR0FBSyxHQUFLLENBQUc7QUFFdkQsSUFBTUosVUFBUyxJQUFVLG1CQUFXO0FBQ3BDLElBQU1FLFVBQVMsSUFBVSxtQkFBVztBQUNwQyxJQUFNRyxXQUFVLElBQVUsY0FBTSxHQUFLLEdBQUssR0FBSyxLQUFLO0FBTTdDLElBQU0sdUJBQU4sTUFBdUQ7Ozs7Ozs7Ozs7RUFtRXJELFlBQ0wsVUFDQSx5QkFDQSx5QkFDQSxzQkFDQSxvQkFDQTtBQUNBLFNBQUssV0FBVztBQUVoQixTQUFLLDBCQUEwQjtBQUMvQixTQUFLLDBCQUEwQjtBQUMvQixTQUFLLHVCQUF1QjtBQUM1QixTQUFLLHFCQUFxQjtBQUUxQixTQUFLLFlBQVksSUFBVSxnQkFBUSxHQUFLLEdBQUssQ0FBRztBQUdoRCxTQUFLLG1CQUFtQixJQUFVLG1CQUFXO0FBQzdDLFNBQUssb0JBQW9CLElBQVUsbUJBQVc7QUFDOUMsU0FBSyw4QkFBOEIsSUFBVSxtQkFBVztBQUN4RCxTQUFLLCtCQUErQixJQUFVLG1CQUFXO0FBRXpELFVBQU0sVUFBVSxLQUFLLFNBQVMsZUFBZSxTQUFTO0FBQ3RELFVBQU0sV0FBVyxLQUFLLFNBQVMsZUFBZSxVQUFVO0FBRXhELFFBQUksU0FBUztBQUNYLFdBQUssaUJBQWlCLEtBQUssUUFBUSxVQUFVO0FBQzdDLDZCQUF1QixRQUFRLFFBQVMsS0FBSywyQkFBMkI7SUFDMUU7QUFFQSxRQUFJLFVBQVU7QUFDWixXQUFLLGtCQUFrQixLQUFLLFNBQVMsVUFBVTtBQUMvQyw2QkFBdUIsU0FBUyxRQUFTLEtBQUssNEJBQTRCO0lBQzVFO0VBQ0Y7Ozs7Ozs7RUFRTyxjQUFjLEtBQWEsT0FBcUI7QUFDckQsVUFBTSxVQUFVLEtBQUssU0FBUyxlQUFlLFNBQVM7QUFDdEQsVUFBTSxXQUFXLEtBQUssU0FBUyxlQUFlLFVBQVU7QUFDeEQsVUFBTSxvQkFBb0IsS0FBSyxTQUFTLHNCQUFzQixTQUFTO0FBQ3ZFLFVBQU0scUJBQXFCLEtBQUssU0FBUyxzQkFBc0IsVUFBVTtBQUV6RSxRQUFJLFNBQVM7QUFDWCxVQUFJLFFBQVEsR0FBSztBQUNmQSxpQkFBUSxJQUFJLENBQU8sa0JBQVUsVUFBVSxLQUFLLHFCQUFxQixJQUFJLENBQUMsS0FBSztNQUM3RSxPQUFPO0FBQ0xBLGlCQUFRLElBQVUsa0JBQVUsVUFBVSxLQUFLLG1CQUFtQixJQUFJLEtBQUs7TUFDekU7QUFFQSxVQUFJLE1BQU0sR0FBSztBQUNiQSxpQkFBUSxJQUFJLENBQU8sa0JBQVUsVUFBVSxLQUFLLHdCQUF3QixJQUFJLENBQUMsR0FBRztNQUM5RSxPQUFPO0FBQ0xBLGlCQUFRLElBQVUsa0JBQVUsVUFBVSxLQUFLLHdCQUF3QixJQUFJLEdBQUc7TUFDNUU7QUFFQUwsY0FBTyxhQUFhSyxRQUFPO0FBQzNCLFdBQUssdUJBQXVCSCxPQUFNO0FBS2xDLHdCQUFtQixXQUFXLEtBQUtBLE9BQU0sRUFBRSxTQUFTRixPQUFNLEVBQUUsU0FBU0UsUUFBTyxPQUFPLENBQUM7QUFFcEZGLGNBQU8sS0FBSyxLQUFLLDJCQUEyQjtBQUk1QyxjQUFRLFdBQ0wsS0FBSyxrQkFBbUIsVUFBVSxFQUNsQyxTQUFTQSxPQUFNLEVBQ2YsWUFBWUEsUUFBTyxPQUFPLENBQUMsRUFDM0IsU0FBUyxLQUFLLGdCQUFnQjtJQUNuQztBQUdBLFFBQUksVUFBVTtBQUNaLFVBQUksUUFBUSxHQUFLO0FBQ2ZLLGlCQUFRLElBQUksQ0FBTyxrQkFBVSxVQUFVLEtBQUsscUJBQXFCLElBQUksQ0FBQyxLQUFLO01BQzdFLE9BQU87QUFDTEEsaUJBQVEsSUFBVSxrQkFBVSxVQUFVLEtBQUssbUJBQW1CLElBQUksS0FBSztNQUN6RTtBQUVBLFVBQUksTUFBTSxHQUFLO0FBQ2JBLGlCQUFRLElBQUksQ0FBTyxrQkFBVSxVQUFVLEtBQUssd0JBQXdCLElBQUksQ0FBQyxHQUFHO01BQzlFLE9BQU87QUFDTEEsaUJBQVEsSUFBVSxrQkFBVSxVQUFVLEtBQUssd0JBQXdCLElBQUksR0FBRztNQUM1RTtBQUVBTCxjQUFPLGFBQWFLLFFBQU87QUFDM0IsV0FBSyx1QkFBdUJILE9BQU07QUFLbEMseUJBQW9CLFdBQVcsS0FBS0EsT0FBTSxFQUFFLFNBQVNGLE9BQU0sRUFBRSxTQUFTRSxRQUFPLE9BQU8sQ0FBQztBQUVyRkYsY0FBTyxLQUFLLEtBQUssNEJBQTRCO0FBSTdDLGVBQVMsV0FDTixLQUFLLG1CQUFvQixVQUFVLEVBQ25DLFNBQVNBLE9BQU0sRUFDZixZQUFZQSxRQUFPLE9BQU8sQ0FBQyxFQUMzQixTQUFTLEtBQUssaUJBQWlCO0lBQ3BDO0VBQ0Y7Ozs7RUFLTyxPQUFPLE9BQTBCO0FBQ3RDLFlBQVEsS0FBSyxvRUFBb0U7QUFFakYsVUFBTSxNQUFZLGtCQUFVLFVBQVUsTUFBTTtBQUM1QyxVQUFNLFFBQWMsa0JBQVUsVUFBVSxNQUFNO0FBRTlDLFNBQUssY0FBYyxLQUFLLEtBQUs7RUFDL0I7Ozs7OztFQU9RLHVCQUF1QixRQUE0QztBQUN6RSxRQUFJLEtBQUssVUFBVSxrQkFBa0JJLGdCQUFlLElBQUksTUFBTTtBQUM1RCxhQUFPLE9BQU8sU0FBUztJQUN6QjtBQUVBLFVBQU0sQ0FBQyxrQkFBa0IsaUJBQWlCLElBQUksb0JBQW9CLEtBQUssU0FBUztBQUNoRkMsYUFBUSxJQUFJLEdBQUssTUFBTSxLQUFLLEtBQUssa0JBQWtCLG1CQUFtQixLQUFLO0FBRTNFLFdBQU8sT0FBTyxhQUFhQSxRQUFPO0VBQ3BDO0FBQ0Y7QUFoTmEscUJBSVksT0FBTztBQ1p6QixJQUFNLDZCQUFOLE1BQTZEOzs7Ozs7Ozs7O0VBeUMzRCxZQUNMLGFBQ0EseUJBQ0EseUJBQ0Esc0JBQ0Esb0JBQ0E7QUFDQSxTQUFLLGNBQWM7QUFFbkIsU0FBSywwQkFBMEI7QUFDL0IsU0FBSywwQkFBMEI7QUFDL0IsU0FBSyx1QkFBdUI7QUFDNUIsU0FBSyxxQkFBcUI7RUFDNUI7Ozs7Ozs7RUFRTyxjQUFjLEtBQWEsT0FBcUI7QUFDckQsUUFBSSxRQUFRLEdBQUs7QUFDZixXQUFLLFlBQVksU0FBUyxZQUFZLENBQUc7QUFDekMsV0FBSyxZQUFZLFNBQVMsVUFBVSxLQUFLLG1CQUFtQixJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3pFLE9BQU87QUFDTCxXQUFLLFlBQVksU0FBUyxVQUFVLENBQUc7QUFDdkMsV0FBSyxZQUFZLFNBQVMsWUFBWSxLQUFLLHFCQUFxQixJQUFJLEtBQUssQ0FBQztJQUM1RTtBQUVBLFFBQUksTUFBTSxHQUFLO0FBQ2IsV0FBSyxZQUFZLFNBQVMsWUFBWSxDQUFHO0FBQ3pDLFdBQUssWUFBWSxTQUFTLGFBQWEsS0FBSyx3QkFBd0IsSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUMvRSxPQUFPO0FBQ0wsV0FBSyxZQUFZLFNBQVMsYUFBYSxDQUFHO0FBQzFDLFdBQUssWUFBWSxTQUFTLFlBQVksS0FBSyx3QkFBd0IsSUFBSSxHQUFHLENBQUM7SUFDN0U7RUFDRjs7OztFQUtPLE9BQU8sT0FBMEI7QUFDdEMsWUFBUSxLQUFLLG9FQUFvRTtBQUVqRixVQUFNLE1BQVksa0JBQVUsVUFBVSxNQUFNO0FBQzVDLFVBQU0sUUFBYyxrQkFBVSxVQUFVLE1BQU07QUFFOUMsU0FBSyxjQUFjLEtBQUssS0FBSztFQUMvQjtBQUNGO0FBM0ZhLDJCQUlZLE9BQU87QUNYekIsSUFBTSxvQkFBTixNQUF3Qjs7Ozs7OztFQWtCdEIsWUFBWSxlQUF1QixhQUFxQjtBQUM3RCxTQUFLLGdCQUFnQjtBQUNyQixTQUFLLGNBQWM7RUFDckI7Ozs7O0VBTU8sSUFBSSxLQUFxQjtBQUM5QixXQUFPLEtBQUssY0FBYyxTQUFTLE1BQU0sS0FBSyxhQUFhO0VBQzdEO0FBQ0Y7QUNkQSxJQUFNUCwwQkFBeUIsb0JBQUksSUFBSSxDQUFDLE9BQU8sVUFBVSxDQUFDO0FBTTFELElBQU0sMEJBQTBCO0FBS3pCLElBQU0sd0JBQU4sTUFBd0Q7RUFVN0QsSUFBVyxPQUFlO0FBRXhCLFdBQU87RUFDVDtFQUVPLFlBQVksUUFBb0IsU0FBd0M7QUFDN0UsU0FBSyxTQUFTO0FBRWQsU0FBSyxhQUFhLFdBQUEsT0FBQSxTQUFBLFFBQVM7RUFDN0I7RUFFYSxVQUFVLE1BQTJCO0FBQUEsV0FBQVAsU0FBQSxNQUFBLE1BQUEsYUFBQTtBQUNoRCxZQUFNLGNBQWMsS0FBSyxTQUFTO0FBSWxDLFVBQUksZ0JBQWdCLE1BQU07QUFDeEI7TUFDRixXQUFXLGdCQUFnQixRQUFXO0FBQ3BDLGNBQU0sSUFBSSxNQUFNLGdHQUFnRztNQUNsSDtBQUVBLFlBQU0sdUJBQXVCLEtBQUssU0FBUztBQUUzQyxVQUFJLHlCQUF5QixNQUFNO0FBQ2pDO01BQ0YsV0FBVyx5QkFBeUIsUUFBVztBQUM3QyxjQUFNLElBQUk7VUFDUjtRQUNGO01BQ0Y7QUFFQSxXQUFLLFNBQVMsWUFBWSxNQUFNLEtBQUssUUFBUSxNQUFNLGFBQWEsb0JBQW9CO0lBQ3RGLENBQUE7RUFBQTs7Ozs7Ozs7RUFTYyxRQUNaLE1BQ0EsVUFDQSxhQUMyQjtBQUFBLFdBQUFBLFNBQUEsTUFBQSxNQUFBLGFBQUE7QUFDM0IsVUFBSSxZQUFZLFFBQVEsZUFBZSxNQUFNO0FBQzNDLGVBQU87TUFDVDtBQUVBLFlBQU0sV0FBVyxNQUFNLEtBQUssVUFBVSxNQUFNLFVBQVUsV0FBVztBQUNqRSxVQUFJLFVBQVU7QUFDWixlQUFPO01BQ1Q7QUFFQSxZQUFNLFdBQVcsTUFBTSxLQUFLLFVBQVUsTUFBTSxVQUFVLFdBQVc7QUFDakUsVUFBSSxVQUFVO0FBQ1osZUFBTztNQUNUO0FBRUEsYUFBTztJQUNULENBQUE7RUFBQTtFQUVjLFVBQ1osTUFDQSxVQUNBLGFBQzJCO0FBQUEsV0FBQUEsU0FBQSxNQUFBLE1BQUEsYUFBQTtBQTNHL0IsVUFBQSxJQUFBLElBQUE7QUE0R0ksWUFBTSxPQUFPLEtBQUssT0FBTztBQUd6QixZQUFNLGNBQVksS0FBQSxLQUFLLG1CQUFMLE9BQUEsU0FBQSxHQUFxQixRQUFRLFVBQUEsT0FBZ0I7QUFDL0QsVUFBSSxDQUFDLFdBQVc7QUFDZCxlQUFPO01BQ1Q7QUFFQSxZQUFNLGFBQVksS0FBQSxLQUFLLGVBQUwsT0FBQSxTQUFBLEdBQWtCLFVBQUE7QUFDcEMsVUFBSSxDQUFDLFdBQVc7QUFDZCxlQUFPO01BQ1Q7QUFFQSxZQUFNLGNBQWMsVUFBVTtBQUM5QixVQUFJLENBQUNPLHdCQUF1QixJQUFJLFdBQVcsR0FBRztBQUM1QyxnQkFBUSxLQUFLLHdEQUF3RCxXQUFXLEdBQUc7QUFDbkYsZUFBTztNQUNUO0FBRUEsWUFBTSxlQUFlLFVBQVU7QUFDL0IsVUFBSSxDQUFDLGNBQWM7QUFDakIsZUFBTztNQUNUO0FBRUEsWUFBTSxxQkFBcUIsYUFBYSxTQUFTLGVBQWUsSUFBTTtBQUV0RSxZQUFNLFFBQVEsS0FBSyxrQkFBa0IsYUFBYSx5QkFBeUIsa0JBQWtCO0FBQzdGLFlBQU0sUUFBUSxLQUFLLGtCQUFrQixhQUFhLHlCQUF5QixrQkFBa0I7QUFDN0YsWUFBTSxRQUFRLEtBQUssa0JBQWtCLGFBQWEsc0JBQXNCLGtCQUFrQjtBQUMxRixZQUFNLFFBQVEsS0FBSyxrQkFBa0IsYUFBYSxvQkFBb0Isa0JBQWtCO0FBRXhGLFVBQUk7QUFFSixVQUFJLGFBQWEsU0FBUyxjQUFjO0FBQ3RDLGtCQUFVLElBQUksMkJBQTJCLGFBQWEsT0FBTyxPQUFPLE9BQU8sS0FBSztNQUNsRixPQUFPO0FBQ0wsa0JBQVUsSUFBSSxxQkFBcUIsVUFBVSxPQUFPLE9BQU8sT0FBTyxLQUFLO01BQ3pFO0FBRUEsWUFBTSxTQUFTLEtBQUssY0FBYyxVQUFVLE9BQU87QUFFbkQsYUFBTyxtQkFBbUIsV0FBVSxLQUFBLGFBQWEsdUJBQWIsT0FBQSxLQUFtQyxDQUFDLEdBQUssTUFBTSxDQUFHLENBQUM7QUFFdkYsYUFBTztJQUNULENBQUE7RUFBQTtFQUVRLGtCQUNOLGdCQUNBLG9CQUNtQjtBQTdKdkIsUUFBQSxJQUFBO0FBOEpJLFFBQUksaUJBQWdCLEtBQUEsa0JBQUEsT0FBQSxTQUFBLGVBQWdCLGtCQUFoQixPQUFBLEtBQWlDO0FBQ3JELFVBQU0sZUFBYyxLQUFBLGtCQUFBLE9BQUEsU0FBQSxlQUFnQixnQkFBaEIsT0FBQSxLQUErQjtBQUtuRCxRQUFJLGdCQUFnQix5QkFBeUI7QUFDM0MsY0FBUTtRQUNOO01BQ0Y7QUFDQSxzQkFBZ0I7SUFDbEI7QUFFQSxXQUFPLElBQUksa0JBQWtCLGVBQWUsV0FBVztFQUN6RDtFQUVjLFVBQ1osTUFDQSxVQUNBLGFBQzJCO0FBQUEsV0FBQVAsU0FBQSxNQUFBLE1BQUEsYUFBQTtBQWxML0IsVUFBQSxJQUFBLElBQUEsSUFBQTtBQW1MSSxZQUFNLE9BQU8sS0FBSyxPQUFPO0FBR3pCLFlBQU0sVUFBUyxLQUFBLEtBQUssZUFBTCxPQUFBLFNBQUEsR0FBaUI7QUFDaEMsVUFBSSxDQUFDLFFBQVE7QUFDWCxlQUFPO01BQ1Q7QUFFQSxZQUFNLG9CQUFvQixPQUFPO0FBQ2pDLFVBQUksQ0FBQyxtQkFBbUI7QUFDdEIsZUFBTztNQUNUO0FBRUEsWUFBTSxxQkFBcUIsa0JBQWtCLG1CQUFtQixlQUFlLElBQU07QUFFckYsWUFBTSxRQUFRLEtBQUssbUJBQW1CLGtCQUFrQix1QkFBdUIsa0JBQWtCO0FBQ2pHLFlBQU0sUUFBUSxLQUFLLG1CQUFtQixrQkFBa0IsdUJBQXVCLGtCQUFrQjtBQUNqRyxZQUFNLFFBQVEsS0FBSyxtQkFBbUIsa0JBQWtCLG9CQUFvQixrQkFBa0I7QUFDOUYsWUFBTSxRQUFRLEtBQUssbUJBQW1CLGtCQUFrQixrQkFBa0Isa0JBQWtCO0FBRTVGLFVBQUk7QUFFSixVQUFJLGtCQUFrQixtQkFBbUIsY0FBYztBQUNyRCxrQkFBVSxJQUFJLDJCQUEyQixhQUFhLE9BQU8sT0FBTyxPQUFPLEtBQUs7TUFDbEYsT0FBTztBQUNMLGtCQUFVLElBQUkscUJBQXFCLFVBQVUsT0FBTyxPQUFPLE9BQU8sS0FBSztNQUN6RTtBQUVBLFlBQU0sU0FBUyxLQUFLLGNBQWMsVUFBVSxPQUFPO0FBRW5ELFVBQUksa0JBQWtCLHVCQUF1QjtBQUMzQyxlQUFPLG1CQUFtQjtXQUN4QixLQUFBLGtCQUFrQixzQkFBc0IsTUFBeEMsT0FBQSxLQUE2QztXQUM3QyxLQUFBLGtCQUFrQixzQkFBc0IsTUFBeEMsT0FBQSxLQUE2QztVQUM3QyxHQUFFLEtBQUEsa0JBQWtCLHNCQUFzQixNQUF4QyxPQUFBLEtBQTZDO1FBQ2pEO01BQ0YsT0FBTztBQUNMLGVBQU8sbUJBQW1CLElBQUksR0FBSyxNQUFNLENBQUc7TUFDOUM7QUFHQSxhQUFPLFVBQVUsSUFBSSxHQUFLLEdBQUssRUFBSTtBQUVuQyxVQUFJLG1CQUFtQixzQkFBc0I7QUFDM0MsZ0JBQVEsVUFBVSxJQUFJLEdBQUssR0FBSyxFQUFJO01BQ3RDO0FBRUEsYUFBTztJQUNULENBQUE7RUFBQTtFQUVRLG1CQUNOLGlCQUNBLG9CQUNtQjtBQXhPdkIsUUFBQSxJQUFBO0FBeU9JLFVBQU0sUUFBUSxtQkFBQSxPQUFBLFNBQUEsZ0JBQWlCO0FBQy9CLFFBQUksS0FBSyxVQUFVLEtBQUssTUFBTSxxQkFBcUI7QUFDakQsY0FBUSxLQUFLLGdFQUFnRTtJQUMvRTtBQUVBLFFBQUksVUFBUyxLQUFBLG1CQUFBLE9BQUEsU0FBQSxnQkFBaUIsV0FBakIsT0FBQSxLQUEyQjtBQUN4QyxVQUFNLFVBQVMsS0FBQSxtQkFBQSxPQUFBLFNBQUEsZ0JBQWlCLFdBQWpCLE9BQUEsS0FBMkI7QUFLMUMsUUFBSSxTQUFTLHlCQUF5QjtBQUNwQyxjQUFRLEtBQUssZ0dBQWdHO0FBQzdHLGVBQVM7SUFDWDtBQUVBLFdBQU8sSUFBSSxrQkFBa0IsUUFBUSxNQUFNO0VBQzdDO0VBRVEsY0FBYyxVQUF1QixTQUFzQztBQUNqRixVQUFNLFNBQVMsSUFBSSxVQUFVLFVBQVUsT0FBTztBQUU5QyxRQUFJLEtBQUssWUFBWTtBQUNuQixZQUFNLFNBQVMsSUFBSSxnQkFBZ0IsTUFBTTtBQUN6QyxXQUFLLFdBQVcsSUFBSSxNQUFNO0FBQzFCLGFBQU8sY0FBYyxLQUFLLFdBQVc7SUFDdkM7QUFFQSxXQUFPO0VBQ1Q7QUFDRjtBQ2xRTyxJQUFNLG9CQUFvQjtFQUMvQixNQUFNO0VBQ04sWUFBWTtBQUNkO0FFTE8sU0FBUyxXQUFXLEtBQWEsTUFBc0I7QUFFNUQsTUFBSSxPQUFPLFFBQVEsWUFBWSxRQUFRLEdBQUksUUFBTztBQUdsRCxNQUFJLGdCQUFnQixLQUFLLElBQUksS0FBSyxNQUFNLEtBQUssR0FBRyxHQUFHO0FBQ2pELFdBQU8sS0FBSyxRQUFRLDBCQUEwQixJQUFJO0VBQ3BEO0FBR0EsTUFBSSxtQkFBbUIsS0FBSyxHQUFHLEVBQUcsUUFBTztBQUd6QyxNQUFJLGdCQUFnQixLQUFLLEdBQUcsRUFBRyxRQUFPO0FBR3RDLE1BQUksYUFBYSxLQUFLLEdBQUcsRUFBRyxRQUFPO0FBR25DLFNBQU8sT0FBTztBQUNoQjtBRFRBLElBQU1PLDBCQUF5QixvQkFBSSxJQUFJLENBQUMsT0FBTyxVQUFVLENBQUM7QUFLbkQsSUFBTSxzQkFBTixNQUFzRDtFQXVCM0QsSUFBVyxPQUFlO0FBRXhCLFdBQU87RUFDVDtFQUVPLFlBQVksUUFBb0IsU0FBc0M7QUEvQy9FLFFBQUEsSUFBQSxJQUFBO0FBZ0RJLFNBQUssU0FBUztBQUVkLFNBQUssc0JBQXFCLEtBQUEsV0FBQSxPQUFBLFNBQUEsUUFBUyx1QkFBVCxPQUFBLEtBQStCO0FBQ3pELFNBQUsscUJBQW9CLEtBQUEsV0FBQSxPQUFBLFNBQUEsUUFBUyxzQkFBVCxPQUFBLEtBQThCLENBQUMsK0JBQStCO0FBQ3ZGLFNBQUssZ0JBQWUsS0FBQSxXQUFBLE9BQUEsU0FBQSxRQUFTLGlCQUFULE9BQUEsS0FBeUI7RUFDL0M7RUFFYSxVQUFVLE1BQTJCO0FBQUEsV0FBQVAsU0FBQSxNQUFBLE1BQUEsYUFBQTtBQUNoRCxXQUFLLFNBQVMsVUFBVSxNQUFNLEtBQUssUUFBUSxJQUFJO0lBQ2pELENBQUE7RUFBQTtFQUVjLFFBQVEsTUFBcUM7QUFBQSxXQUFBQSxTQUFBLE1BQUEsTUFBQSxhQUFBO0FBQ3pELFlBQU0sV0FBVyxNQUFNLEtBQUssVUFBVSxJQUFJO0FBQzFDLFVBQUksWUFBWSxNQUFNO0FBQ3BCLGVBQU87TUFDVDtBQUVBLFlBQU0sV0FBVyxNQUFNLEtBQUssVUFBVSxJQUFJO0FBQzFDLFVBQUksWUFBWSxNQUFNO0FBQ3BCLGVBQU87TUFDVDtBQUVBLGFBQU87SUFDVCxDQUFBO0VBQUE7RUFFYyxVQUFVLE1BQXNDO0FBQUEsV0FBQUEsU0FBQSxNQUFBLE1BQUEsYUFBQTtBQXpFaEUsVUFBQSxJQUFBLElBQUE7QUEwRUksWUFBTSxPQUFPLEtBQUssT0FBTztBQUd6QixZQUFNLGNBQVksS0FBQSxLQUFLLG1CQUFMLE9BQUEsU0FBQSxHQUFxQixRQUFRLFVBQUEsT0FBZ0I7QUFDL0QsVUFBSSxDQUFDLFdBQVc7QUFDZCxlQUFPO01BQ1Q7QUFFQSxZQUFNLGFBQVksS0FBQSxLQUFLLGVBQUwsT0FBQSxTQUFBLEdBQWtCLFVBQUE7QUFDcEMsVUFBSSxhQUFhLE1BQU07QUFDckIsZUFBTztNQUNUO0FBRUEsWUFBTSxjQUFjLFVBQVU7QUFDOUIsVUFBSSxDQUFDTyx3QkFBdUIsSUFBSSxXQUFXLEdBQUc7QUFDNUMsZ0JBQVEsS0FBSyxzREFBc0QsV0FBVyxHQUFHO0FBQ2pGLGVBQU87TUFDVDtBQUVBLFlBQU0sYUFBYSxVQUFVO0FBQzdCLFVBQUksQ0FBQyxZQUFZO0FBQ2YsZUFBTztNQUNUO0FBR0EsWUFBTSxhQUFhLFdBQVc7QUFDOUIsWUFBTSx1QkFBdUIsSUFBSSxJQUFJLEtBQUssaUJBQWlCO0FBQzNELFVBQUksQ0FBQyxxQkFBcUIsSUFBSSxVQUFVLEdBQUc7QUFDekMsY0FBTSxJQUFJLE1BQU0seUNBQXlDLFVBQVUsbUJBQW1CO01BQ3hGO0FBRUEsVUFBSSxpQkFBK0M7QUFDbkQsVUFBSSxLQUFLLHNCQUFzQixXQUFXLGtCQUFrQixNQUFNO0FBQ2hFLDBCQUFrQixLQUFBLE1BQU0sS0FBSyxrQkFBa0IsV0FBVyxjQUFjLE1BQXRELE9BQUEsS0FBNEQ7TUFDaEY7QUFFQSxhQUFPO1FBQ0wsYUFBYTtRQUNiLE1BQU0sV0FBVztRQUNqQixTQUFTLFdBQVc7UUFDcEIsU0FBUyxXQUFXO1FBQ3BCLHNCQUFzQixXQUFXO1FBQ2pDLG9CQUFvQixXQUFXO1FBQy9CLFlBQVksV0FBVztRQUN2QixvQkFBb0IsV0FBVztRQUMvQjtRQUNBLFlBQVksV0FBVztRQUN2QixrQkFBa0IsV0FBVztRQUM3Qiw4QkFBOEIsV0FBVztRQUN6Qyw2QkFBNkIsV0FBVztRQUN4QyxpQkFBaUIsV0FBVztRQUM1QixnQ0FBZ0MsV0FBVztRQUMzQyw0QkFBNEIsV0FBVztRQUN2QyxnQkFBZ0IsV0FBVztRQUMzQixxQkFBcUIsV0FBVztRQUNoQyxjQUFjLFdBQVc7UUFDekIsaUJBQWlCLFdBQVc7TUFDOUI7SUFDRixDQUFBO0VBQUE7RUFFYyxVQUFVLE1BQXNDO0FBQUEsV0FBQVAsU0FBQSxNQUFBLE1BQUEsYUFBQTtBQXRJaEUsVUFBQTtBQXVJSSxZQUFNLE9BQU8sS0FBSyxPQUFPO0FBR3pCLFlBQU0sVUFBUyxLQUFBLEtBQUssZUFBTCxPQUFBLFNBQUEsR0FBaUI7QUFDaEMsVUFBSSxDQUFDLFFBQVE7QUFDWCxlQUFPO01BQ1Q7QUFFQSxZQUFNLGFBQWEsT0FBTztBQUMxQixVQUFJLENBQUMsWUFBWTtBQUNmLGVBQU87TUFDVDtBQUdBLFVBQUksQ0FBQyxLQUFLLGNBQWM7QUFDdEIsY0FBTSxJQUFJLE1BQU0sOEVBQThFO01BQ2hHO0FBR0EsVUFBSTtBQUNKLFVBQUksS0FBSyxzQkFBc0IsV0FBVyxXQUFXLFFBQVEsV0FBVyxZQUFZLElBQUk7QUFDdEYsa0JBQVUsTUFBTSxLQUFLLE9BQU8sY0FBYyxXQUFXLFdBQVcsT0FBTztNQUN6RTtBQUVBLGFBQU87UUFDTCxhQUFhO1FBQ2IsaUJBQWlCLFdBQVc7UUFDNUIsUUFBUSxXQUFXO1FBQ25CLHNCQUFzQixXQUFXO1FBQ2pDLG9CQUFvQixXQUFXO1FBQy9CLGFBQWEsV0FBVztRQUN4QixpQkFBaUIsV0FBVztRQUM1QixvQkFBb0IsV0FBVztRQUMvQixXQUFXLFdBQVc7UUFDdEIsa0JBQWtCLFdBQVc7UUFDN0IsU0FBUyxXQUFBLE9BQUEsVUFBVztRQUNwQixPQUFPLFdBQVc7UUFDbEIsU0FBUyxXQUFXO1FBQ3BCLG1CQUFtQixXQUFXO01BQ2hDO0lBQ0YsQ0FBQTtFQUFBO0VBRWMsa0JBQWtCLE9BQWlEO0FBQUEsV0FBQUEsU0FBQSxNQUFBLE1BQUEsYUFBQTtBQWpMbkYsVUFBQTtBQWtMSSxZQUFNLE9BQU8sS0FBSyxPQUFPO0FBRXpCLFlBQU0sVUFBUyxLQUFBLEtBQUssV0FBTCxPQUFBLFNBQUEsR0FBYyxLQUFBO0FBRTdCLFVBQUksVUFBVSxNQUFNO0FBQ2xCLGdCQUFRO1VBQ04sOENBQThDLEtBQUs7UUFDckQ7QUFDQSxlQUFPO01BQ1Q7QUFLQSxVQUFJLFlBQWdDLE9BQU87QUFHM0MsVUFBSSxPQUFPLGNBQWMsTUFBTTtBQUM3QixjQUFNLGFBQWEsTUFBTSxLQUFLLE9BQU8sY0FBYyxjQUFjLE9BQU8sVUFBVTtBQUNsRixjQUFNLE9BQU8sSUFBSSxLQUFLLENBQUMsVUFBVSxHQUFHLEVBQUUsTUFBTSxPQUFPLFNBQVMsQ0FBQztBQUM3RCxvQkFBWSxJQUFJLGdCQUFnQixJQUFJO01BQ3RDO0FBRUEsVUFBSSxhQUFhLE1BQU07QUFDckIsZ0JBQVE7VUFDTiw4Q0FBOEMsS0FBSztRQUNyRDtBQUNBLGVBQU87TUFDVDtBQUVBLFlBQU0sU0FBUyxJQUFVLG9CQUFZO0FBQ3JDLGFBQU8sTUFBTSxPQUFPLFVBQVUsV0FBVyxXQUFZLEtBQUssT0FBZSxRQUFRLElBQUksQ0FBQyxFQUFFLE1BQU0sQ0FBQyxVQUFVO0FBQ3ZHLGdCQUFRLE1BQU0sS0FBSztBQUNuQixnQkFBUSxLQUFLLHVEQUF1RDtBQUNwRSxlQUFPO01BQ1QsQ0FBQztJQUNILENBQUE7RUFBQTtBQUNGO0FFM01PLElBQU0sVUFBTixNQUFjOzs7Ozs7RUEyQ1osWUFBWSxRQUEyQjtBQUM1QyxTQUFLLFFBQVEsT0FBTztBQUNwQixTQUFLLE9BQU8sT0FBTztBQUNuQixTQUFLLFdBQVcsT0FBTztBQUN2QixTQUFLLG9CQUFvQixPQUFPO0FBQ2hDLFNBQUssY0FBYyxPQUFPO0FBQzFCLFNBQUssU0FBUyxPQUFPO0VBQ3ZCOzs7Ozs7OztFQVNPLE9BQU8sT0FBcUI7QUFDakMsU0FBSyxTQUFTLE9BQU87QUFFckIsUUFBSSxLQUFLLFFBQVE7QUFDZixXQUFLLE9BQU8sT0FBTyxLQUFLO0lBQzFCO0FBRUEsUUFBSSxLQUFLLG1CQUFtQjtBQUMxQixXQUFLLGtCQUFrQixPQUFPO0lBQ2hDO0VBQ0Y7QUFDRjtBQ3ZFTyxJQUFNLHNCQUFOLE1BQXNEO0VBQzNELElBQVcsT0FBZTtBQUV4QixXQUFPO0VBQ1Q7RUFVTyxZQUFZLFFBQW9CLFNBQXNDO0FBekIvRSxRQUFBLElBQUEsSUFBQSxJQUFBLElBQUE7QUEwQkksU0FBSyxTQUFTO0FBRWQsVUFBTSxhQUFhLFdBQUEsT0FBQSxTQUFBLFFBQVM7QUFDNUIsVUFBTSx1QkFBdUIsV0FBQSxPQUFBLFNBQUEsUUFBUztBQUV0QyxTQUFLLG9CQUFtQixLQUFBLFdBQUEsT0FBQSxTQUFBLFFBQVMscUJBQVQsT0FBQSxLQUE2QixJQUFJLDBCQUEwQixNQUFNO0FBQ3pGLFNBQUsscUJBQW9CLEtBQUEsV0FBQSxPQUFBLFNBQUEsUUFBUyxzQkFBVCxPQUFBLEtBQThCLElBQUksMkJBQTJCLE1BQU07QUFDNUYsU0FBSyxrQkFDSCxLQUFBLFdBQUEsT0FBQSxTQUFBLFFBQVMsbUJBQVQsT0FBQSxLQUEyQixJQUFJLHdCQUF3QixRQUFRLEVBQUUsWUFBWSxxQkFBcUIsQ0FBQztBQUNyRyxTQUFLLGdCQUFlLEtBQUEsV0FBQSxPQUFBLFNBQUEsUUFBUyxpQkFBVCxPQUFBLEtBQXlCLElBQUksc0JBQXNCLFFBQVEsRUFBRSxXQUFXLENBQUM7QUFDN0YsU0FBSyxjQUFhLEtBQUEsV0FBQSxPQUFBLFNBQUEsUUFBUyxlQUFULE9BQUEsS0FBdUIsSUFBSSxvQkFBb0IsTUFBTTtFQUN6RTtFQUVhLFVBQVUsTUFBMkI7QUFBQSxXQUFBQSxTQUFBLE1BQUEsTUFBQSxhQUFBO0FBQ2hELFlBQU0sS0FBSyxXQUFXLFVBQVUsSUFBSTtBQUNwQyxZQUFNLEtBQUssZUFBZSxVQUFVLElBQUk7QUFDeEMsWUFBTSxLQUFLLGlCQUFpQixVQUFVLElBQUk7QUFDMUMsWUFBTSxLQUFLLGFBQWEsVUFBVSxJQUFJO0FBQ3RDLFlBQU0sS0FBSyxrQkFBa0IsVUFBVSxJQUFJO0FBRTNDLFlBQU0sT0FBTyxLQUFLLFNBQVM7QUFDM0IsWUFBTSxXQUFXLEtBQUssU0FBUztBQUkvQixVQUFJLFFBQVEsVUFBVTtBQUNwQixjQUFNLFVBQVUsSUFBSSxRQUFRO1VBQzFCLE9BQU8sS0FBSztVQUNaLG1CQUFtQixLQUFLLFNBQVM7VUFDakMsYUFBYSxLQUFLLFNBQVM7VUFDM0I7VUFDQSxRQUFRLEtBQUssU0FBUztVQUN0QjtRQUNGLENBQUM7QUFFRCxhQUFLLFNBQVMsVUFBVTtNQUMxQjtJQUNGLENBQUE7RUFBQTtBQUNGOzs7QUN2RE8sSUFBTSxNQUFOLGNBQWtCLFFBQVE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUF3QnhCLFlBQVksUUFBdUI7QUFDeEMsVUFBTSxNQUFNO0FBRVosU0FBSyxZQUFZLE9BQU87QUFDeEIsU0FBSyxvQkFBb0IsT0FBTztBQUNoQyxTQUFLLHdCQUF3QixPQUFPO0FBQUEsRUFDdEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBU08sT0FBTyxPQUFxQjtBQUNqQyxVQUFNLE9BQU8sS0FBSztBQUVsQixRQUFJLEtBQUssdUJBQXVCO0FBQzlCLFdBQUssc0JBQXNCLE9BQU87QUFBQSxJQUNwQztBQUVBLFFBQUksS0FBSyxtQkFBbUI7QUFDMUIsV0FBSyxrQkFBa0IsT0FBTyxLQUFLO0FBQUEsSUFDckM7QUFFQSxRQUFJLEtBQUssV0FBVztBQUNsQixXQUFLLFVBQVUsUUFBUSxDQUFDLGFBQWtCO0FBQ3hDLFlBQUksU0FBUyxRQUFRO0FBQ25CLG1CQUFTLE9BQU8sS0FBSztBQUFBLFFBQ3ZCO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0Y7QUFDRjs7O0FDbkVBLFlBQVllLGFBQVc7QUNBdkIsWUFBWUEsYUFBVztBQ0F2QixZQUFZQSxhQUFXO0FDRXZCLFlBQVlBLGFBQVc7QUtGdkIsWUFBWUEsYUFBVzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBTkV2QixJQUFNLHdCQUFrRDs7RUFFdEQsSUFBSTtFQUNKLE1BQU07QUFDUjtBQVlPLFNBQVMscUJBQXFCLFNBQXdCLFlBQStCO0FBQzFGLE1BQUksU0FBZSxrQkFBVSxFQUFFLEtBQUssS0FBSztBQUN2QyxZQUFRLGFBQWE7RUFDdkIsT0FBTztBQUNKLFlBQWdCLFdBQVcsc0JBQXNCLFVBQVU7RUFDOUQ7QUFDRjtBRGRPLElBQU0sc0NBQU4sTUFBMEM7RUFLL0MsSUFBVyxVQUE0QjtBQUNyQyxXQUFPLFFBQVEsSUFBSSxLQUFLLFNBQVM7RUFDbkM7RUFFTyxZQUFZLFFBQW9CLGdCQUF5QztBQUM5RSxTQUFLLFVBQVU7QUFDZixTQUFLLGtCQUFrQjtBQUN2QixTQUFLLFlBQVksQ0FBQztFQUNwQjtFQUVPLGdCQUF5RCxLQUFRLE9BQXlDO0FBQy9HLFFBQUksU0FBUyxNQUFNO0FBQ2pCLFdBQUssZ0JBQWdCLEdBQUcsSUFBSTtJQUM5QjtFQUNGO0VBRU8sWUFDTCxLQUNBLE9BQ0EscUJBQ007QUFDTixRQUFJLFNBQVMsTUFBTTtBQUNqQixXQUFLLGdCQUFnQixHQUFHLElBQUksSUFBVSxjQUFNLEVBQUUsVUFBVSxLQUFLO0FBRTdELFVBQUkscUJBQXFCO0FBQ3ZCLGFBQUssZ0JBQWdCLEdBQUcsRUFBRSxvQkFBb0I7TUFDaEQ7SUFDRjtFQUNGO0VBRWEsY0FDWCxLQUNBLFNBQ0EsZ0JBQ2U7QUFBQSxXQUFBQyxTQUFBLE1BQUEsTUFBQSxhQUFBO0FBQ2YsWUFBTSxXQUFXLE1BQVlBLFNBQUEsTUFBQSxNQUFBLGFBQUE7QUFDM0IsWUFBSSxXQUFXLE1BQU07QUFDbkIsZ0JBQU0sS0FBSyxRQUFRLGNBQWMsS0FBSyxpQkFBaUIsS0FBSyxPQUFPO0FBRW5FLGNBQUksZ0JBQWdCO0FBQ2xCLGlDQUFxQixLQUFLLGdCQUFnQixHQUFHLEdBQUcsTUFBTTtVQUN4RDtRQUNGO01BQ0YsQ0FBQSxHQUFHO0FBRUgsV0FBSyxVQUFVLEtBQUssT0FBTztBQUUzQixhQUFPO0lBQ1QsQ0FBQTtFQUFBO0VBRWEscUJBQ1gsS0FDQSxjQUNBLGdCQUNlO0FBQUEsV0FBQUEsU0FBQSxNQUFBLE1BQUEsYUFBQTtBQUNmLGFBQU8sS0FBSyxjQUFjLEtBQUssZ0JBQWdCLE9BQU8sRUFBRSxPQUFPLGFBQWEsSUFBSSxRQUFXLGNBQWM7SUFDM0csQ0FBQTtFQUFBO0FBQ0Y7QUd4RUEsSUFBQSxnQkFBQTtBQ0FBLElBQUFDLGlCQUFBO0FDT08sSUFBTSx5QkFBeUI7Ozs7RUFJcEMsTUFBTTs7OztFQUtOLFFBQVE7Ozs7RUFLUixjQUFjOzs7O0VBS2QsSUFBSTtBQUNOO0FDekJPLElBQU0sZ0NBQWdDO0VBQzNDLE1BQU07RUFDTixrQkFBa0I7RUFDbEIsbUJBQW1CO0FBQ3JCO0FDSkEsSUFBTSx3QkFBa0Q7O0VBRXRELEtBQU07O0VBRU4sTUFBTTtBQUNSO0FBV08sU0FBUyxxQkFBcUIsU0FBcUM7QUFDeEUsTUFBSSxTQUFlLGtCQUFVLEVBQUUsS0FBSyxLQUFLO0FBQ3ZDLFdBQU8sUUFBUTtFQUNqQixPQUFPO0FBQ0wsV0FBTyxzQkFBdUIsUUFBZ0IsUUFBUTtFQUN4RDtBQUNGO0FMUk8sSUFBTSxnQkFBTixjQUFrQyx1QkFBZTtFQXdXdEQsWUFBWSxhQUFzQyxDQUFDLEdBQUc7QUF4WHhELFFBQUE7QUF5WEksVUFBTSxFQUFFLGNBQUEsZUFBYyxnQkFBQUEsZUFBZSxDQUFDO0FBbEh4QyxTQUFPLGdDQUFnQztBQUN2QyxTQUFPLGdDQUFnQztBQUN2QyxTQUFPLGlDQUFpQztBQU14QyxTQUFPLE1BQU07QUFPYixTQUFPLGdCQUFzQjtBQU03QixTQUFRLHFCQUFxQjtBQWU3QixTQUFRLGlCQUFpQjtBQXdCekIsU0FBUSxhQUFxQyx1QkFBdUI7QUF3QnBFLFNBQVEsb0JBQW1ELDhCQUE4QjtBQVd6RixTQUFRLGFBQWE7QUFzQm5CLFFBQUksV0FBVyx1QkFBdUI7QUFDcEMsaUJBQVcsYUFBYTtJQUMxQjtBQUNBLFdBQU8sV0FBVztBQUdsQixlQUFXLE1BQU07QUFDakIsZUFBVyxTQUFTO0FBQ3BCLGVBQVcsV0FBVztBQUd0QixTQUFLLFdBQWlCLHNCQUFjLE1BQU07TUFDbEMsb0JBQVk7O01BQ1osb0JBQVk7O01BQ1osb0JBQVk7O01BQ1osb0JBQVk7TUFDWixvQkFBWTtNQUNsQjtRQUNFLFdBQVcsRUFBRSxPQUFPLElBQVUsY0FBTSxHQUFLLEdBQUssQ0FBRyxFQUFFO1FBQ25ELGdCQUFnQixFQUFFLE9BQU8sSUFBVSxnQkFBUSxFQUFFO1FBQzdDLFlBQVksRUFBRSxPQUFPLEVBQUk7UUFDekIsc0JBQXNCLEVBQUUsT0FBTyxJQUFVLGdCQUFRLEVBQUU7UUFDbkQsa0JBQWtCLEVBQUUsT0FBTyxJQUFVLGNBQU0sR0FBSyxHQUFLLENBQUcsRUFBRTtRQUMxRCxzQkFBc0IsRUFBRSxPQUFPLEtBQUs7UUFDcEMsaUNBQWlDLEVBQUUsT0FBTyxJQUFVLGdCQUFRLEVBQUU7UUFDOUQsb0JBQW9CLEVBQUUsT0FBTyxFQUFJO1FBQ2pDLHFCQUFxQixFQUFFLE9BQU8sS0FBSztRQUNuQyxnQ0FBZ0MsRUFBRSxPQUFPLElBQVUsZ0JBQVEsRUFBRTtRQUM3RCwwQkFBMEIsRUFBRSxPQUFPLEVBQUk7UUFDdkMsb0JBQW9CLEVBQUUsT0FBTyxJQUFJO1FBQ2pDLHNCQUFzQixFQUFFLE9BQU8sSUFBSTtRQUNuQyxjQUFjLEVBQUUsT0FBTyxJQUFVLGNBQU0sR0FBSyxHQUFLLENBQUcsRUFBRTtRQUN0RCxlQUFlLEVBQUUsT0FBTyxLQUFLO1FBQzdCLDBCQUEwQixFQUFFLE9BQU8sSUFBVSxnQkFBUSxFQUFFO1FBQ3ZELDBCQUEwQixFQUFFLE9BQU8sSUFBVSxjQUFNLEdBQUssR0FBSyxDQUFHLEVBQUU7UUFDbEUsb0JBQW9CLEVBQUUsT0FBTyxLQUFLO1FBQ2xDLCtCQUErQixFQUFFLE9BQU8sSUFBVSxnQkFBUSxFQUFFO1FBQzVELHNCQUFzQixFQUFFLE9BQU8sRUFBSTtRQUNuQyxpQ0FBaUMsRUFBRSxPQUFPLEVBQUk7UUFDOUMseUJBQXlCLEVBQUUsT0FBTyxFQUFJO1FBQ3RDLFVBQVUsRUFBRSxPQUFPLElBQVUsY0FBTSxHQUFLLEdBQUssQ0FBRyxFQUFFO1FBQ2xELG1CQUFtQixFQUFFLE9BQU8sRUFBSTtRQUNoQyx3QkFBd0IsRUFBRSxPQUFPLElBQVUsZ0JBQVEsRUFBRTtRQUNyRCw2QkFBNkIsRUFBRSxPQUFPLEtBQUs7UUFDM0Msd0NBQXdDLEVBQUUsT0FBTyxJQUFVLGdCQUFRLEVBQUU7UUFDckUsb0JBQW9CLEVBQUUsT0FBTyxFQUFJO1FBQ2pDLG9CQUFvQixFQUFFLE9BQU8sSUFBVSxjQUFNLEdBQUssR0FBSyxDQUFHLEVBQUU7UUFDNUQsMEJBQTBCLEVBQUUsT0FBTyxFQUFJO1FBQ3ZDLHdCQUF3QixFQUFFLE9BQU8sS0FBSztRQUN0QyxtQ0FBbUMsRUFBRSxPQUFPLElBQVUsZ0JBQVEsRUFBRTtRQUNoRSwwQkFBMEIsRUFBRSxPQUFPLEVBQUk7UUFDdkMsMEJBQTBCLEVBQUUsT0FBTyxFQUFJO1FBQ3ZDLDBCQUEwQixFQUFFLE9BQU8sRUFBSTtNQUN6QztPQUNBLEtBQUEsV0FBVyxhQUFYLE9BQUEsS0FBdUIsQ0FBQztJQUMxQixDQUFDO0FBR0QsU0FBSyxVQUFVLFVBQVU7QUFHekIsU0FBSywwQkFBMEI7QUFHL0IsU0FBSyx3QkFBd0IsTUFDM0I7TUFDRSxHQUFHLE9BQU8sUUFBUSxLQUFLLGlCQUFpQixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsT0FBTyxLQUFLLE1BQU0sR0FBRyxLQUFLLElBQUksS0FBSyxFQUFFO01BQ3RGLEtBQUssZ0JBQWdCLDJCQUEyQixxQkFBcUIsS0FBSyxhQUFhLENBQUMsS0FBSztNQUM3RixLQUFLLHVCQUNELGtDQUFrQyxxQkFBcUIsS0FBSyxvQkFBb0IsQ0FBQyxLQUNqRjtNQUNKLEtBQUsscUJBQXFCLGdDQUFnQyxxQkFBcUIsS0FBSyxrQkFBa0IsQ0FBQyxLQUFLO0lBQzlHLEVBQUUsS0FBSyxHQUFHO0FBRVosU0FBSyxrQkFBa0IsQ0FBQyxXQUFXO0FBQ2pDLFlBQU0sZ0JBQWdCLFNBQWUsa0JBQVUsRUFBRTtBQUVqRCxZQUFNLFVBQ0osT0FBTyxRQUFRLGVBQUEsZUFBQSxDQUFBLEdBQUssS0FBSyxpQkFBaUIsQ0FBQSxHQUFNLEtBQUssT0FBQSxDQUFTLEVBQzNELE9BQU8sQ0FBQyxDQUFDLE9BQU8sS0FBSyxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQ2xDLElBQUksQ0FBQyxDQUFDLE9BQU8sS0FBSyxNQUFNLFdBQVcsS0FBSyxJQUFJLEtBQUssRUFBRSxFQUNuRCxLQUFLLElBQUksSUFBSTtBQUdsQixhQUFPLGVBQWUsVUFBVSxPQUFPO0FBQ3ZDLGFBQU8saUJBQWlCLFVBQVUsT0FBTztBQU16QyxVQUFJLGdCQUFnQixLQUFLO0FBQ3ZCLGVBQU8saUJBQWlCLE9BQU8sZUFBZTtVQUM1QztVQUNBO1FBQ0Y7TUFDRjtJQUNGO0VBQ0Y7RUFsYUEsSUFBVyxRQUFxQjtBQUM5QixXQUFPLEtBQUssU0FBUyxVQUFVO0VBQ2pDO0VBQ0EsSUFBVyxNQUFNLE9BQW9CO0FBQ25DLFNBQUssU0FBUyxVQUFVLFFBQVE7RUFDbEM7RUFFQSxJQUFXLE1BQTRCO0FBQ3JDLFdBQU8sS0FBSyxTQUFTLElBQUk7RUFDM0I7RUFDQSxJQUFXLElBQUksT0FBNkI7QUFDMUMsU0FBSyxTQUFTLElBQUksUUFBUTtFQUM1QjtFQUVBLElBQVcsWUFBa0M7QUFDM0MsV0FBTyxLQUFLLFNBQVMsVUFBVTtFQUNqQztFQUNBLElBQVcsVUFBVSxPQUE2QjtBQUNoRCxTQUFLLFNBQVMsVUFBVSxRQUFRO0VBQ2xDO0VBRUEsSUFBVyxjQUE2QjtBQUN0QyxXQUFPLEtBQUssU0FBUyxZQUFZO0VBQ25DO0VBQ0EsSUFBVyxZQUFZLE9BQXNCO0FBQzNDLFNBQUssU0FBUyxZQUFZLFFBQVE7RUFDcEM7RUFFQSxJQUFXLFdBQXdCO0FBQ2pDLFdBQU8sS0FBSyxTQUFTLFNBQVM7RUFDaEM7RUFDQSxJQUFXLFNBQVMsT0FBb0I7QUFDdEMsU0FBSyxTQUFTLFNBQVMsUUFBUTtFQUNqQztFQUVBLElBQVcsb0JBQTRCO0FBQ3JDLFdBQU8sS0FBSyxTQUFTLGtCQUFrQjtFQUN6QztFQUNBLElBQVcsa0JBQWtCLE9BQWU7QUFDMUMsU0FBSyxTQUFTLGtCQUFrQixRQUFRO0VBQzFDO0VBRUEsSUFBVyxjQUFvQztBQUM3QyxXQUFPLEtBQUssU0FBUyxZQUFZO0VBQ25DO0VBQ0EsSUFBVyxZQUFZLE9BQTZCO0FBQ2xELFNBQUssU0FBUyxZQUFZLFFBQVE7RUFDcEM7RUFFQSxJQUFXLG1CQUFnQztBQUN6QyxXQUFPLEtBQUssU0FBUyxpQkFBaUI7RUFDeEM7RUFDQSxJQUFXLGlCQUFpQixPQUFvQjtBQUM5QyxTQUFLLFNBQVMsaUJBQWlCLFFBQVE7RUFDekM7RUFFQSxJQUFXLHVCQUE2QztBQUN0RCxXQUFPLEtBQUssU0FBUyxxQkFBcUI7RUFDNUM7RUFDQSxJQUFXLHFCQUFxQixPQUE2QjtBQUMzRCxTQUFLLFNBQVMscUJBQXFCLFFBQVE7RUFDN0M7RUFFQSxJQUFXLHFCQUE2QjtBQUN0QyxXQUFPLEtBQUssU0FBUyxtQkFBbUI7RUFDMUM7RUFDQSxJQUFXLG1CQUFtQixPQUFlO0FBQzNDLFNBQUssU0FBUyxtQkFBbUIsUUFBUTtFQUMzQztFQUVBLElBQVcsc0JBQTRDO0FBQ3JELFdBQU8sS0FBSyxTQUFTLG9CQUFvQjtFQUMzQztFQUNBLElBQVcsb0JBQW9CLE9BQTZCO0FBQzFELFNBQUssU0FBUyxvQkFBb0IsUUFBUTtFQUM1QztFQUVBLElBQVcsMkJBQW1DO0FBQzVDLFdBQU8sS0FBSyxTQUFTLHlCQUF5QjtFQUNoRDtFQUNBLElBQVcseUJBQXlCLE9BQWU7QUFDakQsU0FBSyxTQUFTLHlCQUF5QixRQUFRO0VBQ2pEO0VBRUEsSUFBVyxxQkFBNkI7QUFDdEMsV0FBTyxLQUFLLFNBQVMsbUJBQW1CO0VBQzFDO0VBQ0EsSUFBVyxtQkFBbUIsT0FBZTtBQUMzQyxTQUFLLFNBQVMsbUJBQW1CLFFBQVE7RUFDM0M7RUFFQSxJQUFXLHVCQUErQjtBQUN4QyxXQUFPLEtBQUssU0FBUyxxQkFBcUI7RUFDNUM7RUFDQSxJQUFXLHFCQUFxQixPQUFlO0FBQzdDLFNBQUssU0FBUyxxQkFBcUIsUUFBUTtFQUM3QztFQUVBLElBQVcsZUFBNEI7QUFDckMsV0FBTyxLQUFLLFNBQVMsYUFBYTtFQUNwQztFQUNBLElBQVcsYUFBYSxPQUFvQjtBQUMxQyxTQUFLLFNBQVMsYUFBYSxRQUFRO0VBQ3JDO0VBRUEsSUFBVyxnQkFBc0M7QUFDL0MsV0FBTyxLQUFLLFNBQVMsY0FBYztFQUNyQztFQUNBLElBQVcsY0FBYyxPQUE2QjtBQUNwRCxTQUFLLFNBQVMsY0FBYyxRQUFRO0VBQ3RDO0VBRUEsSUFBVywyQkFBd0M7QUFDakQsV0FBTyxLQUFLLFNBQVMseUJBQXlCO0VBQ2hEO0VBQ0EsSUFBVyx5QkFBeUIsT0FBb0I7QUFDdEQsU0FBSyxTQUFTLHlCQUF5QixRQUFRO0VBQ2pEO0VBRUEsSUFBVyxxQkFBMkM7QUFDcEQsV0FBTyxLQUFLLFNBQVMsbUJBQW1CO0VBQzFDO0VBQ0EsSUFBVyxtQkFBbUIsT0FBNkI7QUFDekQsU0FBSyxTQUFTLG1CQUFtQixRQUFRO0VBQzNDO0VBRUEsSUFBVyx1QkFBK0I7QUFDeEMsV0FBTyxLQUFLLFNBQVMscUJBQXFCO0VBQzVDO0VBQ0EsSUFBVyxxQkFBcUIsT0FBZTtBQUM3QyxTQUFLLFNBQVMscUJBQXFCLFFBQVE7RUFDN0M7RUFFQSxJQUFXLGtDQUEwQztBQUNuRCxXQUFPLEtBQUssU0FBUyxnQ0FBZ0M7RUFDdkQ7RUFDQSxJQUFXLGdDQUFnQyxPQUFlO0FBQ3hELFNBQUssU0FBUyxnQ0FBZ0MsUUFBUTtFQUN4RDtFQUVBLElBQVcsMEJBQWtDO0FBQzNDLFdBQU8sS0FBSyxTQUFTLHdCQUF3QjtFQUMvQztFQUNBLElBQVcsd0JBQXdCLE9BQWU7QUFDaEQsU0FBSyxTQUFTLHdCQUF3QixRQUFRO0VBQ2hEO0VBRUEsSUFBVyw4QkFBb0Q7QUFDN0QsV0FBTyxLQUFLLFNBQVMsNEJBQTRCO0VBQ25EO0VBQ0EsSUFBVyw0QkFBNEIsT0FBNkI7QUFDbEUsU0FBSyxTQUFTLDRCQUE0QixRQUFRO0VBQ3BEO0VBRUEsSUFBVyxxQkFBNkI7QUFDdEMsV0FBTyxLQUFLLFNBQVMsbUJBQW1CO0VBQzFDO0VBQ0EsSUFBVyxtQkFBbUIsT0FBZTtBQUMzQyxTQUFLLFNBQVMsbUJBQW1CLFFBQVE7RUFDM0M7RUFFQSxJQUFXLHFCQUFrQztBQUMzQyxXQUFPLEtBQUssU0FBUyxtQkFBbUI7RUFDMUM7RUFDQSxJQUFXLG1CQUFtQixPQUFvQjtBQUNoRCxTQUFLLFNBQVMsbUJBQW1CLFFBQVE7RUFDM0M7RUFFQSxJQUFXLDJCQUFtQztBQUM1QyxXQUFPLEtBQUssU0FBUyx5QkFBeUI7RUFDaEQ7RUFDQSxJQUFXLHlCQUF5QixPQUFlO0FBQ2pELFNBQUssU0FBUyx5QkFBeUIsUUFBUTtFQUNqRDtFQUVBLElBQVcseUJBQStDO0FBQ3hELFdBQU8sS0FBSyxTQUFTLHVCQUF1QjtFQUM5QztFQUNBLElBQVcsdUJBQXVCLE9BQTZCO0FBQzdELFNBQUssU0FBUyx1QkFBdUIsUUFBUTtFQUMvQztFQUVBLElBQVcsMkJBQW1DO0FBQzVDLFdBQU8sS0FBSyxTQUFTLHlCQUF5QjtFQUNoRDtFQUNBLElBQVcseUJBQXlCLE9BQWU7QUFDakQsU0FBSyxTQUFTLHlCQUF5QixRQUFRO0VBQ2pEO0VBRUEsSUFBVywyQkFBbUM7QUFDNUMsV0FBTyxLQUFLLFNBQVMseUJBQXlCO0VBQ2hEO0VBQ0EsSUFBVyx5QkFBeUIsT0FBZTtBQUNqRCxTQUFLLFNBQVMseUJBQXlCLFFBQVE7RUFDakQ7RUFFQSxJQUFXLDJCQUFtQztBQUM1QyxXQUFPLEtBQUssU0FBUyx5QkFBeUI7RUFDaEQ7RUFDQSxJQUFXLHlCQUF5QixPQUFlO0FBQ2pELFNBQUssU0FBUyx5QkFBeUIsUUFBUTtFQUNqRDs7Ozs7RUE2QkEsSUFBVyxvQkFBNkI7QUFDdEMsV0FBTyxLQUFLO0VBQ2Q7RUFDQSxJQUFXLGtCQUFrQixPQUFnQjtBQUMzQyxTQUFLLHFCQUFxQjtBQUUxQixTQUFLLGNBQWM7RUFDckI7Ozs7Ozs7RUFVQSxJQUFJLGdCQUF5QjtBQUMzQixXQUFPLEtBQUs7RUFDZDs7Ozs7OztFQVFBLElBQUksY0FBYyxHQUFZO0FBQzVCLFNBQUssaUJBQWlCO0FBRXRCLFNBQUssY0FBYztFQUNyQjs7Ozs7OztFQVVBLElBQUksWUFBb0M7QUFDdEMsV0FBTyxLQUFLO0VBQ2Q7Ozs7Ozs7RUFRQSxJQUFJLFVBQVUsR0FBMkI7QUFDdkMsU0FBSyxhQUFhO0FBRWxCLFNBQUssY0FBYztFQUNyQjtFQUlBLElBQUksbUJBQWtEO0FBQ3BELFdBQU8sS0FBSztFQUNkO0VBQ0EsSUFBSSxpQkFBaUIsR0FBa0M7QUFDckQsU0FBSyxvQkFBb0I7QUFFekIsU0FBSyxjQUFjO0VBQ3JCO0VBSUEsSUFBSSxZQUFxQjtBQUN2QixXQUFPLEtBQUs7RUFDZDtFQUNBLElBQUksVUFBVSxHQUFZO0FBQ3hCLFNBQUssYUFBYTtBQUVsQixTQUFLLGNBQWM7RUFDckI7Ozs7RUFLQSxJQUFXLGtCQUF3QjtBQUNqQyxXQUFPO0VBQ1Q7Ozs7OztFQStHTyxPQUFPLE9BQXFCO0FBQ2pDLFNBQUssMEJBQTBCO0FBQy9CLFNBQUssbUJBQW1CLEtBQUs7RUFDL0I7RUFFTyxLQUFLLFFBQW9CO0FBQzlCLFVBQU0sS0FBSyxNQUFNO0FBVWpCLFNBQUssTUFBTSxPQUFPO0FBQ2xCLFNBQUssWUFBWSxPQUFPO0FBQ3hCLFNBQUssY0FBYyxPQUFPO0FBQzFCLFNBQUssdUJBQXVCLE9BQU87QUFDbkMsU0FBSyxzQkFBc0IsT0FBTztBQUNsQyxTQUFLLGdCQUFnQixPQUFPO0FBQzVCLFNBQUsscUJBQXFCLE9BQU87QUFDakMsU0FBSyw4QkFBOEIsT0FBTztBQUMxQyxTQUFLLHlCQUF5QixPQUFPO0FBR3JDLFNBQUssZ0JBQWdCLE9BQU87QUFFNUIsU0FBSyxnQ0FBZ0MsT0FBTztBQUM1QyxTQUFLLGdDQUFnQyxPQUFPO0FBQzVDLFNBQUssaUNBQWlDLE9BQU87QUFFN0MsU0FBSyxvQkFBb0IsT0FBTztBQUVoQyxTQUFLLGdCQUFnQixPQUFPO0FBQzVCLFNBQUssWUFBWSxPQUFPO0FBQ3hCLFNBQUssbUJBQW1CLE9BQU87QUFFL0IsU0FBSyxZQUFZLE9BQU87QUFHeEIsU0FBSyxjQUFjO0FBRW5CLFdBQU87RUFDVDs7Ozs7O0VBT1EsbUJBQW1CLE9BQXFCO0FBQzlDLFNBQUssU0FBUyx5QkFBeUIsU0FBUyxRQUFRLEtBQUs7QUFDN0QsU0FBSyxTQUFTLHlCQUF5QixTQUFTLFFBQVEsS0FBSztBQUM3RCxTQUFLLFNBQVMseUJBQXlCLFNBQVMsUUFBUSxLQUFLO0FBQzdELFNBQUssU0FBUyxVQUFVLFFBQVEsS0FBSztBQUVyQyxTQUFLLHFCQUFxQjtFQUM1Qjs7Ozs7RUFNUSw0QkFBa0M7QUFJeEMsU0FBSyxTQUFTLFFBQVEsUUFBUSxLQUFLO0FBR25DLFNBQUsscUJBQXFCLEtBQUssU0FBUyxLQUFLLEtBQUssU0FBUyxjQUFjO0FBQ3pFLFNBQUsscUJBQXFCLEtBQUssU0FBUyxXQUFXLEtBQUssU0FBUyxvQkFBb0I7QUFDckYsU0FBSyxxQkFBcUIsS0FBSyxTQUFTLGFBQWEsS0FBSyxTQUFTLHNCQUFzQjtBQUN6RixTQUFLLHFCQUFxQixLQUFLLFNBQVMsc0JBQXNCLEtBQUssU0FBUywrQkFBK0I7QUFDM0csU0FBSyxxQkFBcUIsS0FBSyxTQUFTLHFCQUFxQixLQUFLLFNBQVMsOEJBQThCO0FBQ3pHLFNBQUsscUJBQXFCLEtBQUssU0FBUyxlQUFlLEtBQUssU0FBUyx3QkFBd0I7QUFDN0YsU0FBSyxxQkFBcUIsS0FBSyxTQUFTLG9CQUFvQixLQUFLLFNBQVMsNkJBQTZCO0FBQ3ZHLFNBQUs7TUFDSCxLQUFLLFNBQVM7TUFDZCxLQUFLLFNBQVM7SUFDaEI7QUFDQSxTQUFLLHFCQUFxQixLQUFLLFNBQVMsd0JBQXdCLEtBQUssU0FBUyxpQ0FBaUM7QUFFL0csU0FBSyxxQkFBcUI7RUFDNUI7Ozs7RUFLUSxtQkFBbUU7QUFDekUsVUFBTSxnQkFBZ0IsU0FBZSxrQkFBVSxFQUFFO0FBRWpELFVBQU0sY0FBYyxLQUFLLGdDQUFnQztBQUN6RCxVQUFNLGNBQ0osS0FBSyxRQUFRLFFBQ2IsS0FBSyxjQUFjLFFBQ25CLEtBQUssZ0JBQWdCLFFBQ3JCLEtBQUsseUJBQXlCLFFBQzlCLEtBQUssd0JBQXdCLFFBQzdCLEtBQUssdUJBQXVCLFFBQzVCLEtBQUssMkJBQTJCO0FBRWxDLFdBQU87OztNQUdMLDBCQUEwQjtNQUUxQixTQUFTLEtBQUs7TUFDZCxjQUFjLGVBQWU7O01BQzdCLHVCQUF1QixlQUFlLENBQUM7TUFDdkMsaUJBQWlCLEtBQUs7TUFDdEIsMEJBQTBCLEtBQUsseUJBQXlCO01BQ3hELHlCQUF5QixLQUFLLHdCQUF3QjtNQUN0RCxtQkFBbUIsS0FBSyxrQkFBa0I7TUFDMUMsd0JBQXdCLEtBQUssdUJBQXVCO01BQ3BELGlDQUFpQyxLQUFLLGNBQWMsS0FBSyxnQ0FBZ0M7TUFDekYsNEJBQTRCLEtBQUssMkJBQTJCO01BQzVELHFCQUFxQixLQUFLLHVCQUF1QjtNQUNqRCxjQUFjLEtBQUssZUFBZTtNQUNsQyxvQkFBb0IsS0FBSyxlQUFlO01BQ3hDLFVBQVUsS0FBSyxlQUFlO01BQzlCLHNCQUNFLEtBQUssY0FBYyxLQUFLLHNCQUFzQiw4QkFBOEI7SUFDaEY7RUFDRjtFQUVRLHFCQUFxQixLQUEyQyxLQUEwQztBQUNoSCxRQUFJLElBQUksT0FBTztBQUNiLFVBQUksSUFBSSxNQUFNLGtCQUFrQjtBQUM5QixZQUFJLE1BQU0sYUFBYTtNQUN6QjtBQUVBLFVBQUksTUFBTSxLQUFLLElBQUksTUFBTSxNQUFNO0lBQ2pDO0VBQ0Y7QUFDRjtBSC9sQkEsSUFBTUMsMEJBQXlCLG9CQUFJLElBQUksQ0FBQyxPQUFPLFVBQVUsQ0FBQztBQTZCbkQsSUFBTSw2QkFBTixNQUFNQyw0QkFBc0Q7RUErQ2pFLElBQVcsT0FBZTtBQUN4QixXQUFPQSw0QkFBMEI7RUFDbkM7RUFFTyxZQUFZLFFBQW9CLFVBQTRDLENBQUMsR0FBRztBQS9GekYsUUFBQSxJQUFBLElBQUEsSUFBQTtBQWdHSSxTQUFLLFNBQVM7QUFFZCxTQUFLLGdCQUFlLEtBQUEsUUFBUSxpQkFBUixPQUFBLEtBQXdCO0FBQzVDLFNBQUsscUJBQW9CLEtBQUEsUUFBUSxzQkFBUixPQUFBLEtBQTZCO0FBQ3RELFNBQUssaUJBQWdCLEtBQUEsUUFBUSxrQkFBUixPQUFBLEtBQXlCO0FBQzlDLFNBQUssYUFBWSxLQUFBLFFBQVEsY0FBUixPQUFBLEtBQXFCO0FBRXRDLFNBQUssb0JBQW9CLG9CQUFJLElBQUk7RUFDbkM7RUFFYSxhQUE0QjtBQUFBLFdBQUFILFNBQUEsTUFBQSxNQUFBLGFBQUE7QUFDdkMsV0FBSyxtQ0FBbUM7SUFDMUMsQ0FBQTtFQUFBO0VBRWEsVUFBVSxNQUEyQjtBQUFBLFdBQUFBLFNBQUEsTUFBQSxNQUFBLGFBQUE7QUFDaEQsV0FBSyxTQUFTLG9CQUFvQixNQUFNLEtBQUssS0FBSyxpQkFBaUI7SUFDckUsQ0FBQTtFQUFBO0VBRU8sZ0JBQWdCLGVBQXFEO0FBQzFFLFVBQU0sY0FBYyxLQUFLLG1CQUFtQixhQUFhO0FBQ3pELFFBQUksYUFBYTtBQUNmLGFBQU8sS0FBSztJQUNkO0FBRUEsV0FBTztFQUNUO0VBRU8scUJBQXFCLGVBQXVCLGdCQUE4RDtBQUMvRyxVQUFNLFlBQVksS0FBSyxtQkFBbUIsYUFBYTtBQUN2RCxRQUFJLFdBQVc7QUFDYixhQUFPLEtBQUssc0JBQXNCLFdBQVcsY0FBYztJQUM3RDtBQUVBLFdBQU87RUFDVDtFQUVhLFNBQVMsV0FBMEU7QUFBQSxXQUFBQSxTQUFBLE1BQUEsTUFBQSxhQUFBO0FBcElsRyxVQUFBO0FBcUlJLFlBQU0sU0FBUyxLQUFLO0FBQ3BCLFlBQU0sT0FBTyxPQUFPO0FBRXBCLFlBQU0sV0FBVSxLQUFBLEtBQUssV0FBTCxPQUFBLFNBQUEsR0FBYyxTQUFBO0FBRTlCLFVBQUksV0FBVyxNQUFNO0FBQ25CLGNBQU0sSUFBSTtVQUNSLG9EQUFvRCxTQUFTO1FBQy9EO01BQ0Y7QUFFQSxZQUFNLGdCQUFnQixRQUFRO0FBRTlCLFlBQU0sY0FBYyxNQUFNLE9BQU8sU0FBUyxTQUFTO0FBRW5ELFVBQUksY0FBYyxXQUFXLEdBQUc7QUFDOUIsY0FBTSxPQUFPO0FBQ2IsY0FBTSxnQkFBZ0IsY0FBYyxDQUFDLEVBQUU7QUFFdkMsWUFBSSxpQkFBaUIsTUFBTTtBQUN6QixlQUFLLGdCQUFnQixNQUFNLGFBQWE7UUFDMUM7TUFDRixPQUFPO0FBQ0wsY0FBTSxRQUFRO0FBQ2QsaUJBQVMsSUFBSSxHQUFHLElBQUksY0FBYyxRQUFRLEtBQUs7QUFDN0MsZ0JBQU0sT0FBTyxNQUFNLFNBQVMsQ0FBQztBQUM3QixnQkFBTSxnQkFBZ0IsY0FBYyxDQUFDLEVBQUU7QUFFdkMsY0FBSSxpQkFBaUIsTUFBTTtBQUN6QixpQkFBSyxnQkFBZ0IsTUFBTSxhQUFhO1VBQzFDO1FBQ0Y7TUFDRjtBQUVBLGFBQU87SUFDVCxDQUFBO0VBQUE7Ozs7Ozs7RUFRUSxxQ0FBMkM7QUFDakQsVUFBTSxTQUFTLEtBQUs7QUFDcEIsVUFBTSxPQUFPLE9BQU87QUFFcEIsVUFBTSxlQUFlLEtBQUs7QUFDMUIsb0JBQUEsT0FBQSxTQUFBLGFBQWMsSUFBSSxDQUFDLGFBQWEsY0FBYztBQXJMbEQsVUFBQTtBQXNMTSxZQUFNLFlBQVksS0FBSyxtQkFBbUIsU0FBUztBQUVuRCxVQUFJLGVBQWEsS0FBQSxZQUFZLGVBQVosT0FBQSxTQUFBLEdBQXlCLHFCQUFBLElBQXdCO0FBQ2hFLGVBQU8sWUFBWSxXQUFXLHFCQUFxQjtNQUNyRDtJQUNGLENBQUE7RUFDRjtFQUVVLG1CQUFtQixlQUFxRTtBQTlMcEcsUUFBQSxJQUFBO0FBK0xJLFVBQU0sU0FBUyxLQUFLO0FBQ3BCLFVBQU0sT0FBTyxPQUFPO0FBRXBCLFVBQU0sZUFBYyxLQUFBLEtBQUssY0FBTCxPQUFBLFNBQUEsR0FBaUIsYUFBQTtBQUVyQyxRQUFJLGVBQWUsTUFBTTtBQUN2QixjQUFRO1FBQ04sdURBQXVELGFBQWE7TUFDdEU7QUFDQSxhQUFPO0lBQ1Q7QUFFQSxVQUFNLGFBQVksS0FBQSxZQUFZLGVBQVosT0FBQSxTQUFBLEdBQXlCRyw0QkFBMEIsY0FBQTtBQUdyRSxRQUFJLGFBQWEsTUFBTTtBQUNyQixhQUFPO0lBQ1Q7QUFFQSxVQUFNLGNBQWMsVUFBVTtBQUM5QixRQUFJLENBQUNELHdCQUF1QixJQUFJLFdBQVcsR0FBRztBQUM1QyxjQUFRO1FBQ04sc0NBQXNDQyw0QkFBMEIsY0FBYyxpQkFBaUIsV0FBVztNQUM1RztBQUNBLGFBQU87SUFDVDtBQUVBLFdBQU87RUFDVDtFQUVjLHNCQUNaLFdBQ0EsZ0JBQ2U7QUFBQSxXQUFBSCxTQUFBLE1BQUEsTUFBQSxhQUFBO0FBaE9uQixVQUFBO0FBa09JLGFBQVEsZUFBd0Q7QUFDaEUsYUFBUSxlQUF3RDtBQUVoRSxZQUFNLGVBQWUsSUFBSSxvQ0FBb0MsS0FBSyxRQUFRLGNBQWM7QUFFeEYsbUJBQWEsZ0JBQWdCLHlCQUF5QixVQUFVLHFCQUFxQjtBQUNyRixtQkFBYSxZQUFZLG9CQUFvQixVQUFVLGdCQUFnQjtBQUN2RSxtQkFBYSxjQUFjLHdCQUF3QixVQUFVLHNCQUFzQixJQUFJO0FBQ3ZGLG1CQUFhLGdCQUFnQixzQkFBc0IsVUFBVSxrQkFBa0I7QUFDL0UsbUJBQWEsY0FBYyx1QkFBdUIsVUFBVSxxQkFBcUIsSUFBSTtBQUNyRixtQkFBYSxnQkFBZ0IsNkJBQTRCLEtBQUEsVUFBVSx3QkFBVixPQUFBLFNBQUEsR0FBK0IsS0FBSztBQUM3RixtQkFBYSxnQkFBZ0Isc0JBQXNCLFVBQVUsa0JBQWtCO0FBQy9FLG1CQUFhLGdCQUFnQix3QkFBd0IsVUFBVSxvQkFBb0I7QUFDbkYsbUJBQWEsWUFBWSxnQkFBZ0IsVUFBVSxZQUFZO0FBQy9ELG1CQUFhLGNBQWMsaUJBQWlCLFVBQVUsZUFBZSxJQUFJO0FBQ3pFLG1CQUFhLFlBQVksNEJBQTRCLFVBQVUsd0JBQXdCO0FBQ3ZGLG1CQUFhLGNBQWMsc0JBQXNCLFVBQVUsb0JBQW9CLElBQUk7QUFDbkYsbUJBQWEsZ0JBQWdCLHdCQUF3QixVQUFVLG9CQUFvQjtBQUNuRixtQkFBYSxnQkFBZ0IsbUNBQW1DLFVBQVUsK0JBQStCO0FBQ3pHLG1CQUFhLGdCQUFnQiwyQkFBMkIsVUFBVSx1QkFBdUI7QUFDekYsbUJBQWEsZ0JBQWdCLG9CQUFvQixVQUFVLGdCQUFpRDtBQUM1RyxtQkFBYSxnQkFBZ0Isc0JBQXNCLFVBQVUsa0JBQWtCO0FBQy9FLG1CQUFhLGNBQWMsK0JBQStCLFVBQVUsNkJBQTZCLEtBQUs7QUFDdEcsbUJBQWEsWUFBWSxzQkFBc0IsVUFBVSxrQkFBa0I7QUFDM0UsbUJBQWEsZ0JBQWdCLDRCQUE0QixVQUFVLHdCQUF3QjtBQUMzRixtQkFBYSxjQUFjLDBCQUEwQixVQUFVLHdCQUF3QixLQUFLO0FBQzVGLG1CQUFhLGdCQUFnQixpQ0FBaUMsVUFBVSw2QkFBNkI7QUFDckcsbUJBQWEsZ0JBQWdCLGlDQUFpQyxVQUFVLDZCQUE2QjtBQUNyRyxtQkFBYSxnQkFBZ0Isa0NBQWtDLFVBQVUsOEJBQThCO0FBRXZHLG1CQUFhLGdCQUFnQixpQkFBaUIsS0FBSyxhQUFhO0FBQ2hFLG1CQUFhLGdCQUFnQixhQUFhLEtBQUssU0FBUztBQUV4RCxZQUFNLGFBQWE7SUFDckIsQ0FBQTtFQUFBOzs7Ozs7Ozs7O0VBV1EsZ0JBQWdCLE1BQWtCLGVBQTZCO0FBQ3JFLFVBQU0sWUFBWSxLQUFLLG1CQUFtQixhQUFhO0FBQ3ZELFFBQUksV0FBVztBQUNiLFlBQU0sY0FBYyxLQUFLLGtCQUFrQixTQUFTO0FBQ3BELFdBQUssY0FBYyxjQUFjLEtBQUs7QUFFdEMsV0FBSyxpQkFBaUIsSUFBSTtBQUUxQixXQUFLLGtCQUFrQixJQUFJO0FBRTNCO0lBQ0Y7RUFDRjs7Ozs7O0VBT1EsdUJBQXVCLGlCQUEwQztBQUd2RSxXQUNFLE9BQVEsZ0JBQXdCLHFCQUFxQixZQUNwRCxnQkFBd0IscUJBQXFCLFVBQzlDLE9BQVEsZ0JBQXdCLHVCQUF1QixZQUN0RCxnQkFBd0IscUJBQXFCO0VBRWxEOzs7Ozs7RUFPUSxpQkFBaUIsTUFBd0I7QUFPL0MsVUFBTSxrQkFBa0IsS0FBSztBQUM3QixRQUFJLEVBQUUsMkJBQWlDLG1CQUFXO0FBQ2hEO0lBQ0Y7QUFFQSxRQUFJLENBQUMsS0FBSyx1QkFBdUIsZUFBZSxHQUFHO0FBQ2pEO0lBQ0Y7QUFHQSxTQUFLLFdBQVcsQ0FBQyxlQUFlO0FBR2hDLFVBQU0sa0JBQWtCLGdCQUFnQixNQUFNO0FBQzlDLG9CQUFnQixRQUFRO0FBQ3ZCLG9CQUF3QixZQUFZO0FBQ3JDLG9CQUFnQixPQUFhO0FBQzdCLFNBQUssU0FBUyxLQUFLLGVBQWU7QUFHbEMsVUFBTSxXQUFXLEtBQUs7QUFDdEIsVUFBTSxvQkFBb0IsU0FBUyxRQUFRLFNBQVMsTUFBTSxRQUFRLFNBQVMsV0FBVyxTQUFTLFFBQVE7QUFDdkcsYUFBUyxTQUFTLEdBQUcsbUJBQW1CLENBQUM7QUFDekMsYUFBUyxTQUFTLEdBQUcsbUJBQW1CLENBQUM7RUFDM0M7RUFFUSxrQkFBa0IsTUFBd0I7QUFDaEQsVUFBTSxzQkFBc0IsS0FBSztBQUNqQyxVQUFNLGNBQWMsb0JBQUksSUFBb0I7QUFFNUMsUUFBSSxNQUFNLFFBQVEsbUJBQW1CLEdBQUc7QUFDdEMsMEJBQW9CLFFBQVEsQ0FBQyxhQUFhLFlBQVksSUFBSSxRQUFRLENBQUM7SUFDckUsT0FBTztBQUNMLGtCQUFZLElBQUksbUJBQW1CO0lBQ3JDO0FBRUEsZUFBVyxZQUFZLGFBQWE7QUFDbEMsV0FBSyxrQkFBa0IsSUFBSSxRQUFRO0lBQ3JDO0VBQ0Y7RUFFUSxrQkFBa0IsV0FBcUQ7QUFsV2pGLFFBQUE7QUFxV0ksVUFBTSxnQkFBZ0IsVUFBVTtBQUNoQyxZQUFRLGdCQUFnQixJQUFJLFFBQU8sS0FBQSxVQUFVLDRCQUFWLE9BQUEsS0FBcUM7RUFDMUU7QUFDRjtBQTVUYSwyQkFDRyxpQkFBaUI7QUFEMUIsSUFBTSw0QkFBTjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QVN4Q0EsSUFBTSxpREFBTixNQUFNSSxnREFBMEU7RUFLckYsSUFBVyxPQUFlO0FBQ3hCLFdBQU9BLGdEQUE4QztFQUN2RDtFQUVPLFlBQVksUUFBb0I7QUFDckMsU0FBSyxTQUFTO0VBQ2hCO0VBRWEscUJBQXFCLGVBQXVCLGdCQUF1RDtBQUFBLFdBQUFDLFNBQUEsTUFBQSxNQUFBLGFBQUE7QUFDOUcsWUFBTSxZQUFZLEtBQUssbUNBQW1DLGFBQWE7QUFDdkUsVUFBSSxhQUFhLE1BQU07QUFDckI7TUFDRjtBQUlBLGNBQVE7UUFDTjtNQUNGO0FBRUEsWUFBTSxxQkFBcUIsVUFBVTtBQUNyQyxxQkFBZSxvQkFBb0I7SUFDckMsQ0FBQTtFQUFBO0VBRVEsbUNBQ04sZUFDNEU7QUFuQ2hGLFFBQUEsSUFBQTtBQW9DSSxVQUFNLFNBQVMsS0FBSztBQUNwQixVQUFNLE9BQU8sT0FBTztBQUVwQixVQUFNLGVBQWMsS0FBQSxLQUFLLGNBQUwsT0FBQSxTQUFBLEdBQWlCLGFBQUE7QUFFckMsUUFBSSxlQUFlLE1BQU07QUFDdkIsY0FBUTtRQUNOLDJFQUEyRSxhQUFhO01BQzFGO0FBQ0EsYUFBTztJQUNUO0FBRUEsVUFBTSxhQUFZLEtBQUEsWUFBWSxlQUFaLE9BQUEsU0FBQSxHQUF5QkQsZ0RBQThDLGNBQUE7QUFHekYsUUFBSSxhQUFhLE1BQU07QUFDckIsYUFBTztJQUNUO0FBRUEsV0FBTztFQUNUO0FBQ0Y7QUFyRGEsK0NBQ0csaUJBQWlCO0FBRDFCLElBQU0sZ0RBQU47OztBQ0pQLFlBQVlFLGFBQVc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBaEIsU0FBUyxVQUFVLEdBQW1CO0FBQzNDLFNBQU8sS0FBSyxJQUFJLEdBQUcsR0FBRztBQUN4QjtBREtPLElBQU0sNkJBQU4sTUFBNkQ7RUFhbEUsSUFBVyxPQUFlO0FBQ3hCLFdBQU87RUFDVDtFQUVPLFlBQVksUUFBb0I7QUF4QnpDLFFBQUE7QUF5QkksU0FBSyxTQUFTO0FBRWQsU0FBSyw2QkFBNkIsb0JBQUksSUFBSTtBQUMxQyxTQUFLLG1DQUFtQyxvQkFBSSxJQUFJO0FBSWhELFVBQU0sT0FBTyxLQUFLLE9BQU87QUFFekIsU0FBSyxrQkFBaUIsS0FBQSxLQUFLLG1CQUFMLE9BQUEsS0FBdUIsQ0FBQztBQUM5QyxRQUFJLEtBQUssZUFBZSxRQUFRLHVCQUF1QixNQUFNLElBQUk7QUFDL0QsV0FBSyxlQUFlLEtBQUssdUJBQXVCO0lBQ2xEO0VBQ0Y7RUFFYSxhQUE0QjtBQUFBLFdBQUFDLFNBQUEsTUFBQSxNQUFBLGFBQUE7QUF4QzNDLFVBQUE7QUF5Q0ksWUFBTSxPQUFPLEtBQUssT0FBTztBQUd6QixZQUFNLGtCQUFpQixLQUFBLEtBQUssZUFBTCxPQUFBLFNBQUEsR0FBa0IsS0FBQTtBQUN6QyxZQUFNLHVCQUF1QixrQkFBQSxPQUFBLFNBQUEsZUFBZ0I7QUFDN0MsVUFBSSxDQUFDLHNCQUFzQjtBQUN6QjtNQUNGO0FBR0EsV0FBSyx3QkFBd0Isb0JBQW9CO0FBR2pELDJCQUFxQixRQUFRLENBQUMsb0JBQW9CLGtCQUFrQjtBQXREeEUsWUFBQUMsS0FBQTtBQXVETSxjQUFNLGVBQWNBLE1BQUEsS0FBSyxjQUFMLE9BQUEsU0FBQUEsSUFBaUIsYUFBQTtBQUVyQyxZQUFJLGVBQWUsTUFBTTtBQUN2QixrQkFBUTtZQUNOLHdEQUF3RCxhQUFhO1VBQ3ZFO0FBQ0E7UUFDRjtBQUVBLFlBQUksbUJBQW1CLFdBQVcsYUFBYTtBQUM3QyxnQkFBTSxXQUFXLEtBQUssd0JBQXdCLG9CQUFvQixXQUFXO0FBQzdFLGVBQUssVUFBVyxhQUFhLElBQUk7UUFDbkMsWUFBVyxLQUFBLG1CQUFtQixXQUFuQixPQUFBLFNBQUEsR0FBMkIsV0FBVyxXQUFBLEdBQWM7QUFDN0QsZ0JBQU0sV0FBVyxLQUFLLHdCQUF3QixvQkFBb0IsV0FBVztBQUM3RSxlQUFLLFVBQVcsYUFBYSxJQUFJO1FBQ25DLFdBQVcsbUJBQW1CLFdBQVcsc0JBQXNCO1FBRS9ELE9BQU87QUFDTCxrQkFBUSxLQUFLLCtDQUErQyxtQkFBbUIsTUFBTSxFQUFFO1FBQ3pGO01BQ0YsQ0FBQztJQUNILENBQUE7RUFBQTtFQUVRLHdCQUNOLG9CQUNBLGdCQUNzQjtBQWpGMUIsUUFBQSxJQUFBLElBQUEsSUFBQSxJQUFBLElBQUEsSUFBQSxJQUFBLElBQUEsSUFBQSxJQUFBLElBQUEsSUFBQSxJQUFBLElBQUEsSUFBQSxJQUFBLElBQUEsSUFBQSxJQUFBLElBQUEsSUFBQSxJQUFBLElBQUEsSUFBQSxJQUFBLElBQUEsSUFBQSxJQUFBLElBQUEsSUFBQSxJQUFBLElBQUEsSUFBQSxJQUFBLElBQUEsSUFBQSxJQUFBLElBQUEsSUFBQSxJQUFBLElBQUEsSUFBQSxJQUFBLElBQUEsSUFBQSxJQUFBLElBQUEsSUFBQSxJQUFBLElBQUEsSUFBQSxJQUFBLElBQUEsSUFBQTtBQWtGSSxVQUFNLGlCQUFnQixNQUFBLEtBQUEsbUJBQW1CLGVBQW5CLE9BQUEsU0FBQSxHQUFnQyxnQkFBQSxNQUFoQyxPQUFBLEtBQXFEO0FBQzNFLFVBQU0sa0JBQWdCLEtBQUEsbUJBQW1CLG9CQUFuQixPQUFBLFNBQUEsR0FBcUMsU0FBQSxPQUFlO0FBQzFFLFVBQU0sd0JBQXdCLGlCQUFpQjtBQUUvQyxVQUFNLDBCQUEwQixLQUFLLG9CQUFvQixrQkFBa0I7QUFFM0UsVUFBTSxZQUFXLE1BQUEsS0FBQSxtQkFBbUIsZUFBbkIsT0FBQSxTQUFBLEdBQWdDLGVBQUEsTUFBaEMsT0FBQSxLQUFvRDtBQUNyRSxVQUFNLFlBQVksZ0JBQWdCLFVBQVUsV0FBVyxTQUFTO0FBQ2hFLFVBQU0sY0FBYyxZQUFZLE1BQUEsS0FBQSxtQkFBbUIsb0JBQW5CLE9BQUEsU0FBQSxHQUFxQyxTQUFBLE1BQXJDLE9BQUEsS0FBbUQsTUFBTztBQUUxRixVQUFNLFlBQVcsTUFBQSxLQUFBLG1CQUFtQixvQkFBbkIsT0FBQSxTQUFBLEdBQXFDLFdBQUEsTUFBckMsT0FBQSxLQUFxRDtBQUN0RSxVQUFNLGNBQWMsYUFBYTtBQUVqQyxVQUFNLHNCQUFzQixLQUFLLHNCQUFzQixrQkFBa0I7QUFFekUsVUFBTSxvQkFBbUIsTUFBQSxLQUFBLG1CQUFtQixxQkFBbkIsT0FBQSxTQUFBLEdBQXNDLFFBQUEsTUFBdEMsT0FBQSxLQUFtRCxDQUFDLEdBQUssR0FBSyxHQUFLLENBQUcsR0FBRztNQUNoRyxDQUFDLEdBQVcsTUFBZSxNQUFNLElBQUksSUFBSSxVQUFVLENBQUM7O0lBQ3REO0FBQ0EsVUFBTSx5QkFBd0IsS0FBQSxtQkFBbUIsc0JBQW5CLE9BQUEsU0FBQSxHQUF1QyxVQUFBO0FBQ3JFLFVBQU0sbUJBQ0oseUJBQXlCLE9BQ3JCO01BQ0UsT0FBTztNQUNQLFlBQVlDLGdCQUFBLENBQUEsR0FDUCxtQkFBQTtJQUVQLElBQ0E7QUFFTixVQUFNLHNCQUFxQixNQUFBLEtBQUEsbUJBQW1CLG9CQUFuQixPQUFBLFNBQUEsR0FBcUMsWUFBQSxNQUFyQyxPQUFBLEtBQXNEO0FBQ2pGLFVBQU0sc0JBQXFCLEtBQUEsbUJBQW1CLHNCQUFuQixPQUFBLFNBQUEsR0FBdUMsVUFBQTtBQUNsRSxVQUFNLGdCQUNKLHNCQUFzQixPQUNsQjtNQUNFLE9BQU87TUFDUCxPQUFPO01BQ1AsWUFBWUEsZ0JBQUEsQ0FBQSxHQUNQLG1CQUFBO0lBRVAsSUFDQTtBQUVOLFVBQU0sbUJBQWtCLE1BQUEsS0FBQSxtQkFBbUIscUJBQW5CLE9BQUEsU0FBQSxHQUFzQyxnQkFBQSxNQUF0QyxPQUFBLEtBQTJELENBQUMsR0FBSyxHQUFLLEdBQUssQ0FBRyxHQUFHO01BQ3ZHO0lBQ0Y7QUFDQSxVQUFNLHdCQUF1QixLQUFBLG1CQUFtQixzQkFBbkIsT0FBQSxTQUFBLEdBQXVDLGNBQUE7QUFDcEUsVUFBTSxrQkFDSix3QkFBd0IsT0FDcEI7TUFDRSxPQUFPO01BQ1AsWUFBWUEsZ0JBQUEsQ0FBQSxHQUNQLG1CQUFBO0lBRVAsSUFDQTtBQUVOLFVBQU0scUJBQW9CLE1BQUEsS0FBQSxtQkFBbUIscUJBQW5CLE9BQUEsU0FBQSxHQUFzQyxhQUFBLE1BQXRDLE9BQUEsS0FBd0QsQ0FBQyxNQUFNLE1BQU0sTUFBTSxDQUFHLEdBQUc7TUFDekc7SUFDRjtBQUNBLFVBQU0sNkJBQTRCLEtBQUEsbUJBQW1CLHNCQUFuQixPQUFBLFNBQUEsR0FBdUMsZUFBQTtBQUN6RSxVQUFNLHVCQUNKLDZCQUE2QixPQUN6QjtNQUNFLE9BQU87TUFDUCxZQUFZQSxnQkFBQSxDQUFBLEdBQ1AsbUJBQUE7SUFFUCxJQUNBO0FBR04sUUFBSSxzQkFBcUIsTUFBQSxLQUFBLG1CQUFtQixvQkFBbkIsT0FBQSxTQUFBLEdBQXFDLGFBQUEsTUFBckMsT0FBQSxLQUF1RDtBQUNoRixRQUFJLHNCQUFxQixNQUFBLEtBQUEsbUJBQW1CLG9CQUFuQixPQUFBLFNBQUEsR0FBcUMsYUFBQSxNQUFyQyxPQUFBLEtBQXVEO0FBQ2hGLHlCQUEyQixrQkFBVSxLQUFLLG9CQUFvQixHQUFLLE1BQU0sTUFBTSxrQkFBa0I7QUFDakcseUJBQXFCLENBQUMsc0JBQXNCLElBQU07QUFFbEQsVUFBTSxxQkFBb0IsTUFBQSxLQUFBLG1CQUFtQixvQkFBbkIsT0FBQSxTQUFBLEdBQXFDLHlCQUFBLE1BQXJDLE9BQUEsS0FBbUU7QUFDN0YsVUFBTSx1QkFBdUIsb0JBQW9CLElBQU0sb0JBQW9CO0FBRTNFLFVBQU0sc0JBQXFCLEtBQUEsbUJBQW1CLHNCQUFuQixPQUFBLFNBQUEsR0FBdUMsWUFBQTtBQUNsRSxVQUFNLGVBQWUsc0JBQXNCLE9BQU8sQ0FBQyxHQUFLLEdBQUssQ0FBRyxJQUFJO0FBQ3BFLFVBQU0sZ0JBQ0osc0JBQXNCLE9BQ2xCO01BQ0UsT0FBTztJQUNULElBQ0E7QUFFTixVQUFNLHdCQUF1QixNQUFBLEtBQUEsbUJBQW1CLG9CQUFuQixPQUFBLFNBQUEsR0FBcUMsaUJBQUEsTUFBckMsT0FBQSxLQUEyRDtBQUN4RixVQUFNLDJCQUEwQixLQUFBLG1CQUFtQixzQkFBbkIsT0FBQSxTQUFBLEdBQXVDLGFBQUE7QUFDdkUsVUFBTSxxQkFDSiwyQkFBMkIsT0FDdkI7TUFDRSxPQUFPO01BQ1AsWUFBWUEsZ0JBQUEsQ0FBQSxHQUNQLG1CQUFBO0lBRVAsSUFDQTtBQUVOLFVBQU0sNkJBQTRCLE1BQUEsS0FBQSxtQkFBbUIscUJBQW5CLE9BQUEsU0FBQSxHQUFzQyxXQUFBLE1BQXRDLE9BQUEsS0FBc0QsQ0FBQyxHQUFLLEdBQUssR0FBSyxDQUFHLEdBQUc7TUFDNUc7SUFDRjtBQUNBLFVBQU0sbUNBQWtDLE1BQUEsS0FBQSxtQkFBbUIsb0JBQW5CLE9BQUEsU0FBQSxHQUFxQyxrQkFBQSxNQUFyQyxPQUFBLEtBQTREO0FBQ3BHLFVBQU0sMkJBQTBCLE1BQUEsS0FBQSxtQkFBbUIsb0JBQW5CLE9BQUEsU0FBQSxHQUFxQyxVQUFBLE1BQXJDLE9BQUEsS0FBb0Q7QUFFcEYsVUFBTSxtQkFBbUIsQ0FBQyxRQUFRLG9CQUFvQixtQkFBbUIsR0FDdkUsTUFBQSxLQUFBLG1CQUFtQixvQkFBbkIsT0FBQSxTQUFBLEdBQXFDLG1CQUFBLE1BQXJDLE9BQUEsS0FBNkQsQ0FDL0Q7QUFHQSxRQUFJLHNCQUFxQixNQUFBLEtBQUEsbUJBQW1CLG9CQUFuQixPQUFBLFNBQUEsR0FBcUMsZUFBQSxNQUFyQyxPQUFBLEtBQXlEO0FBQ2xGLHlCQUFxQixPQUFPO0FBRTVCLFVBQU0sb0NBQW1DLEtBQUEsbUJBQW1CLHNCQUFuQixPQUFBLFNBQUEsR0FBdUMsc0JBQUE7QUFDaEYsVUFBTSw4QkFDSixvQ0FBb0MsT0FDaEM7TUFDRSxPQUFPO01BQ1AsWUFBWUEsZ0JBQUEsQ0FBQSxHQUNQLG1CQUFBO0lBRVAsSUFDQTtBQUVOLFVBQU0sdUJBQXNCLE1BQUEsS0FBQSxtQkFBbUIscUJBQW5CLE9BQUEsU0FBQSxHQUFzQyxlQUFBLE1BQXRDLE9BQUEsS0FBMEQsQ0FBQyxHQUFLLEdBQUssQ0FBRyxHQUFHO01BQ3JHO0lBQ0Y7QUFDQSxVQUFNLG9CQUFtQixNQUFBLEtBQUEsbUJBQW1CLG9CQUFuQixPQUFBLFNBQUEsR0FBcUMsbUJBQUEsTUFBckMsT0FBQSxLQUE2RDtBQUN0RixVQUFNLDJCQUNKLHFCQUFxQixLQUFLLE1BQUEsS0FBQSxtQkFBbUIsb0JBQW5CLE9BQUEsU0FBQSxHQUFxQyxxQkFBQSxNQUFyQyxPQUFBLEtBQStELElBQU87QUFFbEcsVUFBTSwrQkFBOEIsS0FBQSxtQkFBbUIsc0JBQW5CLE9BQUEsU0FBQSxHQUF1QyxvQkFBQTtBQUMzRSxVQUFNLHlCQUNKLCtCQUErQixPQUMzQjtNQUNFLE9BQU87TUFDUCxZQUFZQSxnQkFBQSxDQUFBLEdBQ1AsbUJBQUE7SUFFUCxJQUNBO0FBRU4sVUFBTSxpQ0FBZ0MsTUFBQSxLQUFBLG1CQUFtQixvQkFBbkIsT0FBQSxTQUFBLEdBQXFDLGdCQUFBLE1BQXJDLE9BQUEsS0FBMEQ7QUFHaEcsUUFBSSxpQ0FBZ0MsTUFBQSxLQUFBLG1CQUFtQixvQkFBbkIsT0FBQSxTQUFBLEdBQXFDLGdCQUFBLE1BQXJDLE9BQUEsS0FBMEQ7QUFDOUYsUUFBSSxpQ0FBaUMsTUFBTTtBQUN6QyxzQ0FBZ0MsQ0FBQztJQUNuQztBQUVBLFVBQU0sa0NBQWlDLE9BQUEsS0FBQSxtQkFBbUIsb0JBQW5CLE9BQUEsU0FBQSxHQUFxQyxpQkFBQSxNQUFyQyxPQUFBLE1BQTJEO0FBRWxHLFVBQU0saUJBQW1EO01BQ3ZELGFBQWE7TUFDYjtNQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQTtNQUNBO0lBQ0Y7QUFFQSxXQUFPLGNBQUFBLGdCQUFBLENBQUEsR0FDRixjQUFBLEdBREU7TUFHTCxzQkFBc0I7UUFDcEI7UUFDQTtNQUNGO01BQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0EsWUFBWTs7UUFFVixzQkFBc0I7TUFDeEI7SUFDRixDQUFBO0VBQ0Y7RUFFUSx3QkFDTixvQkFDQSxnQkFDc0I7QUE3UjFCLFFBQUEsSUFBQSxJQUFBLElBQUEsSUFBQTtBQThSSSxVQUFNLHNCQUFzQixtQkFBbUIsV0FBVztBQUMxRCxVQUFNLGdCQUFnQixtQkFBbUIsV0FBVywwQkFBMEI7QUFFOUUsVUFBTSwwQkFBMEIsS0FBSyxvQkFBb0Isa0JBQWtCO0FBRTNFLFVBQU0sV0FBVyxtQkFBbUIsV0FBVztBQUMvQyxVQUFNLFlBQVksZ0JBQWdCLFVBQVUsV0FBVyxTQUFTO0FBQ2hFLFVBQU0sY0FBYyxZQUFZLE1BQUEsS0FBQSxtQkFBbUIsb0JBQW5CLE9BQUEsU0FBQSxHQUFxQyxTQUFBLE1BQXJDLE9BQUEsS0FBbUQsTUFBTztBQUUxRixVQUFNLHNCQUFzQixLQUFLLHNCQUFzQixrQkFBa0I7QUFFekUsVUFBTSxvQkFBbUIsTUFBQSxLQUFBLG1CQUFtQixxQkFBbkIsT0FBQSxTQUFBLEdBQXNDLFFBQUEsTUFBdEMsT0FBQSxLQUFtRCxDQUFDLEdBQUssR0FBSyxHQUFLLENBQUcsR0FBRyxJQUFJLFNBQVM7QUFDL0csVUFBTSx5QkFBd0IsS0FBQSxtQkFBbUIsc0JBQW5CLE9BQUEsU0FBQSxHQUF1QyxVQUFBO0FBQ3JFLFVBQU0sbUJBQ0oseUJBQXlCLE9BQ3JCO01BQ0UsT0FBTztNQUNQLFlBQVlBLGdCQUFBLENBQUEsR0FDUCxtQkFBQTtJQUVQLElBQ0E7QUFHTixVQUFNLGlCQUFtRDtNQUN2RCxhQUFhO01BQ2IsdUJBQXVCO01BQ3ZCO01BQ0Esa0JBQWtCO01BQ2xCLHNCQUFzQjtJQUN4QjtBQUVBLFdBQU8sY0FBQUEsZ0JBQUEsQ0FBQSxHQUNGLGNBQUEsR0FERTtNQUdMLHNCQUFzQjtRQUNwQjtRQUNBO01BQ0Y7TUFDQTtNQUNBO01BQ0EsWUFBWTs7UUFFVixzQkFBc0I7TUFDeEI7SUFDRixDQUFBO0VBQ0Y7Ozs7RUFLUSxzQkFBc0Isb0JBQXlEO0FBalZ6RixRQUFBLElBQUEsSUFBQSxJQUFBLElBQUE7QUFrVkksVUFBTSxvQkFBbUIsS0FBQSxtQkFBbUIscUJBQW5CLE9BQUEsU0FBQSxHQUFzQyxVQUFBO0FBQy9ELFFBQUksb0JBQW9CLE1BQU07QUFDNUIsYUFBTyxDQUFDO0lBQ1Y7QUFFQSxVQUFNLFNBQVMsRUFBQyxLQUFBLG9CQUFBLE9BQUEsU0FBQSxpQkFBbUIsQ0FBQSxNQUFuQixPQUFBLEtBQXlCLElBQUssS0FBQSxvQkFBQSxPQUFBLFNBQUEsaUJBQW1CLENBQUEsTUFBbkIsT0FBQSxLQUF5QixDQUFHO0FBQzFFLFVBQU0sUUFBUSxFQUFDLEtBQUEsb0JBQUEsT0FBQSxTQUFBLGlCQUFtQixDQUFBLE1BQW5CLE9BQUEsS0FBeUIsSUFBSyxLQUFBLG9CQUFBLE9BQUEsU0FBQSxpQkFBbUIsQ0FBQSxNQUFuQixPQUFBLEtBQXlCLENBQUc7QUFFekUsV0FBTyxDQUFDLElBQUksSUFBTSxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUM7QUFFckMsV0FBTzs7TUFFTCx1QkFBdUIsRUFBRSxRQUFRLE1BQU07SUFDekM7RUFDRjs7Ozs7RUFNUSxvQkFBb0Isb0JBQXdDO0FBdFd0RSxRQUFBLElBQUE7QUF1V0ksVUFBTSxzQkFBc0IsbUJBQW1CLFdBQVc7QUFDMUQsVUFBTSxrQkFDSixLQUFBLG1CQUFtQixlQUFuQixPQUFBLFNBQUEsR0FBZ0MsZ0JBQUEsTUFBcUIsVUFDckQsbUJBQW1CLFdBQVcsMEJBQzlCO0FBQ0YsVUFBTSxrQkFBZ0IsS0FBQSxtQkFBbUIsb0JBQW5CLE9BQUEsU0FBQSxHQUFxQyxTQUFBLE9BQWUsS0FBSztBQUUvRSxRQUFJLFNBQVM7QUFFYixRQUFJLGVBQWU7QUFDakIsWUFBTSxVQUFVLG1CQUFtQjtBQUVuQyxVQUFJLFdBQVcsTUFBTTtBQUNuQixZQUFJLGVBQWU7QUFDakIsbUJBQVMsS0FBSyxpQ0FBaUMsSUFBSSxPQUFPO1FBQzVELE9BQU87QUFDTCxtQkFBUyxLQUFLLDJCQUEyQixJQUFJLE9BQU87UUFDdEQ7TUFDRjtJQUNGO0FBRUEsV0FBTztFQUNUOzs7OztFQU1RLHdCQUF3Qix3QkFBc0M7QUFJcEUsVUFBTSwwQkFBMEIsb0JBQUksSUFBWTtBQUtoRCxVQUFNLGdDQUFnQyxvQkFBSSxJQUFZO0FBR3RELDJCQUF1QixRQUFRLENBQUMsdUJBQXVCO0FBL1kzRCxVQUFBLElBQUE7QUFnWk0sWUFBTSxzQkFBc0IsbUJBQW1CLFdBQVc7QUFDMUQsWUFBTSxrQkFDSixLQUFBLG1CQUFtQixlQUFuQixPQUFBLFNBQUEsR0FBZ0MsZ0JBQUEsTUFBcUIsVUFDckQsbUJBQW1CLFdBQVcsMEJBQzlCO0FBQ0YsWUFBTSxrQkFBZ0IsS0FBQSxtQkFBbUIsb0JBQW5CLE9BQUEsU0FBQSxHQUFxQyxTQUFBLE9BQWUsS0FBSztBQUUvRSxVQUFJLGVBQWU7QUFDakIsY0FBTSxVQUFVLG1CQUFtQjtBQUVuQyxZQUFJLFdBQVcsTUFBTTtBQUNuQixjQUFJLGVBQWU7QUFDakIsMENBQThCLElBQUksT0FBTztVQUMzQyxPQUFPO0FBQ0wsb0NBQXdCLElBQUksT0FBTztVQUNyQztRQUNGO01BQ0Y7SUFDRixDQUFDO0FBR0QsUUFBSSx3QkFBd0IsT0FBTyxJQUFJO0FBQ3JDLGNBQVE7UUFDTiw2Q0FBNkMsd0JBQXdCLElBQUk7TUFDM0U7SUFDRjtBQUVBLFFBQUksOEJBQThCLE9BQU8sSUFBSTtBQUMzQyxjQUFRO1FBQ04sNkNBQTZDLDhCQUE4QixJQUFJO01BQ2pGO0lBQ0Y7QUFHQSxVQUFNLEtBQUssdUJBQXVCLEVBQy9CLEtBQUssRUFDTCxRQUFRLENBQUMsT0FBTyxNQUFNO0FBQ3JCLFlBQU0saUJBQWlCLEtBQUssSUFBSSxLQUFLLElBQUksSUFBSSx3QkFBd0IsT0FBTyxHQUFHLEVBQUUsR0FBRyxDQUFDO0FBQ3JGLFdBQUssMkJBQTJCLElBQUksT0FBTyxjQUFjO0lBQzNELENBQUM7QUFFSCxVQUFNLEtBQUssNkJBQTZCLEVBQ3JDLEtBQUssRUFDTCxRQUFRLENBQUMsT0FBTyxNQUFNO0FBQ3JCLFlBQU0saUJBQWlCLEtBQUssSUFBSSxLQUFLLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQztBQUNqRCxXQUFLLGlDQUFpQyxJQUFJLE9BQU8sY0FBYztJQUNqRSxDQUFDO0VBQ0w7QUFDRjs7O0FFaGNBLFlBQVlDLGFBQVc7QUNBdkIsWUFBWUEsYUFBVztBRUF2QixZQUFZQSxhQUFXO0FLQXZCLFlBQVlBLGFBQVc7QUNBdkIsWUFBWUEsYUFBVzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FUR3ZCLElBQU1DLFFBQU8sSUFBVSxnQkFBUTtBQUV4QixJQUFNLDBCQUFOLGNBQTRDLGNBQU07RUFLaEQsWUFBWSxZQUErQjtBQUNoRCxVQUFNO0FBRU4sU0FBSyxnQkFBZ0IsSUFBVSx3QkFBZ0IsSUFBSSxhQUFhLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7QUFDdEYsU0FBSyxjQUFjLFNBQWUsd0JBQWdCO0FBRWxELFVBQU0sV0FBVyxJQUFVLHVCQUFlO0FBQzFDLGFBQVMsYUFBYSxZQUFZLEtBQUssYUFBYTtBQUVwRCxVQUFNLFdBQVcsSUFBVSwwQkFBa0I7TUFDM0MsT0FBTztNQUNQLFdBQVc7TUFDWCxZQUFZO0lBQ2QsQ0FBQztBQUVELFNBQUssUUFBUSxJQUFVLGFBQUssVUFBVSxRQUFRO0FBQzlDLFNBQUssSUFBSSxLQUFLLEtBQUs7QUFFbkIsU0FBSyxhQUFhO0VBQ3BCO0VBRU8sa0JBQWtCLE9BQXVCO0FBQzlDLElBQUFBLE1BQUssc0JBQXNCLEtBQUssV0FBVyxZQUFZLFdBQVc7QUFDbEUsU0FBSyxjQUFjLE9BQU8sR0FBR0EsTUFBSyxHQUFHQSxNQUFLLEdBQUdBLE1BQUssQ0FBQztBQUVuRCxRQUFJLEtBQUssV0FBVyxRQUFRO0FBQzFCLE1BQUFBLE1BQUssc0JBQXNCLEtBQUssV0FBVyxPQUFPLFdBQVc7SUFDL0Q7QUFDQSxTQUFLLGNBQWMsT0FBTyxHQUFHQSxNQUFLLEdBQUdBLE1BQUssR0FBR0EsTUFBSyxDQUFDO0FBRW5ELFNBQUssY0FBYyxjQUFjO0FBRWpDLFVBQU0sa0JBQWtCLEtBQUs7RUFDL0I7QUFDRjtBRTFDTyxTQUFTLGtCQUEyQyxRQUF1QixRQUFjO0FBQzlGLFNBQU8sT0FBTyxJQUFJLE9BQU8sU0FBUyxFQUFFLEdBQUcsT0FBTyxTQUFTLEVBQUUsR0FBRyxPQUFPLFNBQVMsRUFBRSxDQUFDO0FBQ2pGO0FDRkEsSUFBTUEsU0FBTyxJQUFVLGdCQUFRO0FBQy9CLElBQU1DLFFBQU8sSUFBVSxnQkFBUTtBQUV4QixTQUFTLGtCQUE4QyxRQUF1QixRQUFjO0FBQ2pHLFNBQU8sVUFBVUQsUUFBTSxRQUFRQyxLQUFJO0FBQ25DLFNBQU87QUFDVDtBQ0FPLFNBQVNDLGtCQUE2QyxRQUFjO0FBQ3pFLE1BQUssT0FBZSxRQUFRO0FBQzFCLFdBQU8sT0FBTztFQUNoQixPQUFPO0FBQ0osV0FBZSxRQUFRO0VBQzFCO0FBRUEsU0FBTztBQUNUO0FDWE8sSUFBZSxvQkFBZixNQUFpQzs7Ozs7RUFzQi9CLFlBQVksYUFBNkIsUUFBd0I7QUFDdEUsU0FBSyxjQUFjO0FBQ25CLFNBQUssU0FBUztBQUVkLFNBQUssU0FBUztFQUNoQjtBQVdGO0FKckNBLElBQU1GLFNBQU8sSUFBVSxnQkFBUTtBQUMvQixJQUFNQyxTQUFPLElBQVUsZ0JBQVE7QUFDL0IsSUFBTUUsUUFBTyxJQUFVLGdCQUFRO0FBQy9CLElBQU1DLFVBQVMsSUFBVSxtQkFBVztBQUNwQyxJQUFNQyxVQUFTLElBQVUsbUJBQVc7QUFDcEMsSUFBTUMsVUFBUyxJQUFVLG1CQUFXO0FBTzdCLElBQU0sbUJBQU4sY0FBK0Isa0JBQWtCOzs7O0VBSXRELElBQVcsVUFBNkY7QUFDdEcsV0FBTyxLQUFLO0VBQ2Q7Ozs7RUFLQSxJQUFXLFFBQVEsU0FBNEY7QUFDN0csU0FBSyxXQUFXO0FBQ2hCLFNBQUssV0FBVztNQUNkLFlBQVksY0FBYyxJQUFNLFlBQVksY0FBYyxLQUFPO01BQ2pFLFlBQVksY0FBYyxJQUFNLFlBQVksY0FBYyxLQUFPO01BQ2pFLFlBQVksY0FBYyxJQUFNLFlBQVksY0FBYyxLQUFPO0lBQ25FO0VBQ0Y7RUFpQkEsSUFBVyxlQUFvQztBQUM3QyxVQUFNLE1BQU0sb0JBQUksSUFBb0IsQ0FBQyxLQUFLLE1BQU0sQ0FBQztBQUVqRCxRQUFJLEtBQUssWUFBWSxRQUFRO0FBQzNCLFVBQUksSUFBSSxLQUFLLFlBQVksTUFBTTtJQUNqQztBQUVBLFdBQU87RUFDVDtFQUVPLFlBQVksYUFBNkIsUUFBd0I7QUFDdEUsVUFBTSxhQUFhLE1BQU07QUFFekIsU0FBSyxXQUFXO0FBQ2hCLFNBQUssYUFBYSxJQUFVLGdCQUFRLEdBQUcsR0FBRyxDQUFDO0FBRTNDLFNBQUssZUFBZSxJQUFVLG1CQUFXO0VBQzNDO0VBRU8sZUFBcUI7QUFDMUIsU0FBSyxhQUFhLEtBQUssS0FBSyxZQUFZLFVBQVU7RUFDcEQ7RUFFTyxTQUFlO0FBRXBCLFNBQUssWUFBWSxrQkFBa0IsTUFBTSxLQUFLO0FBQzlDLFNBQUssT0FBTyxrQkFBa0IsTUFBTSxLQUFLO0FBR3pDLFVBQU0scUJBQXFCRixRQUFPLFNBQVM7QUFDM0MsVUFBTSx3QkFBd0JDLFFBQU8sU0FBUztBQUM5QyxRQUFJLEtBQUssWUFBWSxRQUFRO0FBQzNCLHdCQUFrQixLQUFLLFlBQVksT0FBTyxhQUFhLGtCQUFrQjtBQUN6RSxNQUFBSCxrQkFBaUIsc0JBQXNCLEtBQUssa0JBQWtCLENBQUM7SUFDakU7QUFHQSxVQUFNLEtBQUtGLE9BQUssS0FBSyxLQUFLLFVBQVUsRUFBRSxnQkFBZ0IsS0FBSyxZQUFZLEVBQUUsZ0JBQWdCLGtCQUFrQjtBQUMzRyxVQUFNLEtBQUssa0JBQWtCLEtBQUssT0FBTyxhQUFhQyxNQUFJLEVBQ3ZELElBQUksa0JBQWtCLEtBQUssWUFBWSxhQUFhRSxLQUFJLENBQUMsRUFDekQsVUFBVTtBQUdiLFVBQU0sYUFBYUcsUUFDaEIsbUJBQW1CLElBQUksRUFBRSxFQUN6QixZQUFZLHFCQUFxQixFQUNqQyxTQUFTLGtCQUFrQixFQUMzQixTQUFTLEtBQUssWUFBWTtBQUc3QixTQUFLLFlBQVksV0FBVyxLQUFLLEtBQUssWUFBWSxFQUFFLE1BQU0sWUFBWSxLQUFLLE1BQU07RUFDbkY7QUFDRjtBS2hHTyxTQUFTLDBCQUEwQixRQUF3QixVQUFrRDtBQUNsSCxRQUFNLFlBQThCLENBQUMsTUFBTTtBQUUzQyxNQUFJLE9BQThCLE9BQU87QUFDekMsU0FBTyxTQUFTLE1BQU07QUFDcEIsY0FBVSxRQUFRLElBQUk7QUFDdEIsV0FBTyxLQUFLO0VBQ2Q7QUFFQSxZQUFVLFFBQVEsQ0FBQyxhQUFhO0FBQzlCLGFBQVMsUUFBUTtFQUNuQixDQUFDO0FBQ0g7QUNqQk8sSUFBTSwyQkFBTixNQUErQjtFQUEvQixjQUFBO0FBQ0wsU0FBUSxlQUFlLG9CQUFJLElBQXVCO0FBS2xELFNBQVEsd0JBQXdCLG9CQUFJLElBQTRDO0VBQUE7RUFKaEYsSUFBVyxjQUFzQztBQUMvQyxXQUFPLEtBQUs7RUFDZDtFQUlPLGNBQWMsWUFBcUM7QUFDeEQsU0FBSyxhQUFhLElBQUksVUFBVTtBQUVoQyxRQUFJLFlBQVksS0FBSyxzQkFBc0IsSUFBSSxXQUFXLFdBQVc7QUFDckUsUUFBSSxhQUFhLE1BQU07QUFDckIsa0JBQVksb0JBQUksSUFBdUI7QUFDdkMsV0FBSyxzQkFBc0IsSUFBSSxXQUFXLGFBQWEsU0FBUztJQUNsRTtBQUNBLGNBQVUsSUFBSSxVQUFVO0VBQzFCO0VBRU8saUJBQWlCLFlBQXFDO0FBQzNELFNBQUssYUFBYSxPQUFPLFVBQVU7QUFFbkMsVUFBTSxZQUFZLEtBQUssc0JBQXNCLElBQUksV0FBVyxXQUFXO0FBQ3ZFLGNBQVUsT0FBTyxVQUFVO0VBQzdCO0VBRU8sZUFBcUI7QUFDMUIsVUFBTSxtQkFBbUIsb0JBQUksSUFBdUI7QUFDcEQsVUFBTSxrQkFBa0Isb0JBQUksSUFBdUI7QUFFbkQsZUFBVyxjQUFjLEtBQUssY0FBYztBQUMxQyxXQUFLLG1CQUFtQixZQUFZLGtCQUFrQixpQkFBaUIsQ0FBQ0MsZ0JBQWVBLFlBQVcsYUFBYSxDQUFDO0lBQ2xIO0VBQ0Y7RUFFTyxTQUFlO0FBQ3BCLFVBQU0sbUJBQW1CLG9CQUFJLElBQXVCO0FBQ3BELFVBQU0sa0JBQWtCLG9CQUFJLElBQXVCO0FBRW5ELGVBQVcsY0FBYyxLQUFLLGNBQWM7QUFDMUMsV0FBSyxtQkFBbUIsWUFBWSxrQkFBa0IsaUJBQWlCLENBQUNBLGdCQUFlQSxZQUFXLE9BQU8sQ0FBQztJQUM1RztFQUNGOzs7Ozs7Ozs7Ozs7RUFhUSxtQkFDTixZQUNBLGtCQUNBLGlCQUNBLFVBQ007QUFDTixRQUFJLGdCQUFnQixJQUFJLFVBQVUsR0FBRztBQUNuQztJQUNGO0FBRUEsUUFBSSxpQkFBaUIsSUFBSSxVQUFVLEdBQUc7QUFDcEMsWUFBTSxJQUFJLE1BQU0sbUZBQW1GO0lBQ3JHO0FBQ0EscUJBQWlCLElBQUksVUFBVTtBQUUvQixVQUFNLGFBQWEsV0FBVztBQUM5QixlQUFXLGFBQWEsWUFBWTtBQUNsQyxnQ0FBMEIsV0FBVyxDQUFDLHNCQUFzQjtBQUMxRCxjQUFNLFlBQVksS0FBSyxzQkFBc0IsSUFBSSxpQkFBaUI7QUFDbEUsWUFBSSxXQUFXO0FBQ2IscUJBQVcsaUJBQWlCLFdBQVc7QUFDckMsaUJBQUssbUJBQW1CLGVBQWUsa0JBQWtCLGlCQUFpQixRQUFRO1VBQ3BGO1FBQ0Y7TUFDRixDQUFDO0lBQ0g7QUFFQSxhQUFTLFVBQVU7QUFFbkIsb0JBQWdCLElBQUksVUFBVTtFQUNoQztBQUNGO0FDdEZBLElBQU1ILFdBQVMsSUFBVSxtQkFBVztBQUNwQyxJQUFNQyxXQUFTLElBQVUsbUJBQVc7QUFPN0IsSUFBTSx3QkFBTixjQUFvQyxrQkFBa0I7RUFXM0QsSUFBVyxlQUFvQztBQUM3QyxXQUFPLG9CQUFJLElBQUksQ0FBQyxLQUFLLE1BQU0sQ0FBQztFQUM5QjtFQUVPLFlBQVksYUFBNkIsUUFBd0I7QUFDdEUsVUFBTSxhQUFhLE1BQU07QUFFekIsU0FBSyxlQUFlLElBQVUsbUJBQVc7QUFDekMsU0FBSyxrQkFBa0IsSUFBVSxtQkFBVztFQUM5QztFQUVPLGVBQXFCO0FBQzFCLFNBQUssYUFBYSxLQUFLLEtBQUssWUFBWSxVQUFVO0FBQ2xELElBQUFILGtCQUFpQixLQUFLLGdCQUFnQixLQUFLLEtBQUssT0FBTyxVQUFVLENBQUM7RUFDcEU7RUFFTyxTQUFlO0FBRXBCLFVBQU0sZUFBZUUsU0FBTyxLQUFLLEtBQUssZUFBZSxFQUFFLFNBQVMsS0FBSyxPQUFPLFVBQVU7QUFHdEYsVUFBTSxhQUFhQyxTQUFPLEtBQUssS0FBSyxZQUFZLEVBQUUsU0FBUyxZQUFZO0FBR3ZFLFNBQUssWUFBWSxXQUFXLEtBQUssS0FBSyxZQUFZLEVBQUUsTUFBTSxZQUFZLEtBQUssTUFBTTtFQUNuRjtBQUNGO0FDN0NBLElBQU1MLFNBQU8sSUFBVSxnQkFBUTtBQUMvQixJQUFNSSxXQUFTLElBQVUsbUJBQVc7QUFDcEMsSUFBTUMsV0FBUyxJQUFVLG1CQUFXO0FBTzdCLElBQU0sb0JBQU4sY0FBZ0Msa0JBQWtCOzs7O0VBSXZELElBQVcsV0FBNEI7QUFDckMsV0FBTyxLQUFLO0VBQ2Q7Ozs7RUFLQSxJQUFXLFNBQVMsVUFBMkI7QUFDN0MsU0FBSyxZQUFZO0FBQ2pCLFNBQUssWUFBWSxJQUFJLGFBQWEsTUFBTSxJQUFNLEdBQUssYUFBYSxNQUFNLElBQU0sR0FBSyxhQUFhLE1BQU0sSUFBTSxDQUFHO0VBQy9HO0VBMkJBLElBQVcsZUFBb0M7QUFDN0MsV0FBTyxvQkFBSSxJQUFJLENBQUMsS0FBSyxNQUFNLENBQUM7RUFDOUI7RUFFTyxZQUFZLGFBQTZCLFFBQXdCO0FBQ3RFLFVBQU0sYUFBYSxNQUFNO0FBRXpCLFNBQUssWUFBWTtBQUNqQixTQUFLLGNBQWMsSUFBVSxnQkFBUSxHQUFHLEdBQUcsQ0FBQztBQUU1QyxTQUFLLGVBQWUsSUFBVSxtQkFBVztBQUN6QyxTQUFLLGtCQUFrQixJQUFVLG1CQUFXO0FBQzVDLFNBQUssZ0NBQWdDLElBQVUsbUJBQVc7RUFDNUQ7RUFFTyxlQUFxQjtBQUMxQixTQUFLLGFBQWEsS0FBSyxLQUFLLFlBQVksVUFBVTtBQUNsRCxJQUFBSCxrQkFBaUIsS0FBSyxnQkFBZ0IsS0FBSyxLQUFLLFlBQVksQ0FBQztBQUM3RCxJQUFBQSxrQkFBaUIsS0FBSyw4QkFBOEIsS0FBSyxLQUFLLE9BQU8sVUFBVSxDQUFDLEVBQUUsU0FBUyxLQUFLLFlBQVk7RUFDOUc7RUFFTyxTQUFlO0FBbUJwQixVQUFNLFlBQVlFLFNBQ2YsS0FBSyxLQUFLLGVBQWUsRUFDekIsU0FBUyxLQUFLLE9BQU8sVUFBVSxFQUMvQixTQUFTLEtBQUssNkJBQTZCO0FBRzlDLFVBQU0sS0FBS0osT0FBSyxLQUFLLEtBQUssV0FBVyxFQUFFLGdCQUFnQixTQUFTO0FBU2hFLFVBQU0sYUFBYUssU0FBTyxtQkFBbUIsSUFBSSxLQUFLLFdBQVc7QUFHakUsVUFBTSxhQUFhLFdBQVcsWUFBWSxLQUFLLFlBQVksRUFBRSxTQUFTLFNBQVM7QUFHL0UsU0FBSyxZQUFZLFdBQVcsS0FBSyxLQUFLLFlBQVksRUFBRSxNQUFNLFlBQVksS0FBSyxNQUFNO0VBQ25GO0FBQ0Y7QUN2R0EsSUFBTUcsMEJBQXlCLG9CQUFJLElBQUksQ0FBQyxPQUFPLFVBQVUsQ0FBQztBQUVuRCxJQUFNLGlDQUFOLE1BQU1DLGdDQUEwRDtFQVlyRSxJQUFXLE9BQWU7QUFDeEIsV0FBT0EsZ0NBQThCO0VBQ3ZDO0VBRU8sWUFBWSxRQUFvQixTQUFnRDtBQUNyRixTQUFLLFNBQVM7QUFFZCxTQUFLLGFBQWEsV0FBQSxPQUFBLFNBQUEsUUFBUztFQUM3QjtFQUVhLFVBQVUsTUFBMkI7QUFBQSxXQUFBQyxTQUFBLE1BQUEsTUFBQSxhQUFBO0FBQ2hELFdBQUssU0FBUywyQkFBMkIsTUFBTSxLQUFLLFFBQVEsSUFBSTtJQUNsRSxDQUFBO0VBQUE7Ozs7Ozs7RUFRZ0IsUUFBUSxNQUFzRDtBQUFBLFdBQUFBLFNBQUEsTUFBQSxNQUFBLGFBQUE7QUFoRGhGLFVBQUE7QUFpREksWUFBTSxPQUFPLEtBQUssT0FBTztBQUd6QixZQUFNLHNCQUFvQixLQUFBLEtBQUssbUJBQUwsT0FBQSxTQUFBLEdBQXFCLFFBQVFELGdDQUE4QixjQUFBLE9BQW9CO0FBQ3pHLFVBQUksQ0FBQyxtQkFBbUI7QUFDdEIsZUFBTztNQUNUO0FBRUEsWUFBTSxVQUFVLElBQUkseUJBQXlCO0FBQzdDLFlBQU0sYUFBK0IsTUFBTSxLQUFLLE9BQU8sZ0JBQWdCLE1BQU07QUFHN0UsaUJBQVcsUUFBUSxDQUFDLE1BQU0sY0FBYztBQTdENUMsWUFBQUU7QUE4RE0sY0FBTSxhQUFhLEtBQUssTUFBTyxTQUFTO0FBR3hDLGNBQU0sYUFBWUEsTUFBQSxjQUFBLE9BQUEsU0FBQSxXQUFZLGVBQVosT0FBQSxTQUFBQSxJQUF5QkYsZ0NBQThCLGNBQUE7QUFJekUsWUFBSSxhQUFhLE1BQU07QUFDckI7UUFDRjtBQUVBLGNBQU0sY0FBYyxVQUFVO0FBQzlCLFlBQUksQ0FBQ0Qsd0JBQXVCLElBQUksV0FBVyxHQUFHO0FBQzVDLGtCQUFRO1lBQ04sMENBQTBDQyxnQ0FBOEIsY0FBYyxpQkFBaUIsV0FBVztVQUNwSDtBQUNBO1FBQ0Y7QUFFQSxjQUFNLGdCQUFnQixVQUFVO0FBR2hDLFlBQUksY0FBYyxRQUFRLE1BQU07QUFDOUIsZ0JBQU0sYUFBYSxLQUFLLHNCQUFzQixNQUFNLFlBQVksY0FBYyxJQUFJO0FBQ2xGLGtCQUFRLGNBQWMsVUFBVTtRQUNsQyxXQUFXLGNBQWMsT0FBTyxNQUFNO0FBQ3BDLGdCQUFNLGFBQWEsS0FBSyxxQkFBcUIsTUFBTSxZQUFZLGNBQWMsR0FBRztBQUNoRixrQkFBUSxjQUFjLFVBQVU7UUFDbEMsV0FBVyxjQUFjLFlBQVksTUFBTTtBQUN6QyxnQkFBTSxhQUFhLEtBQUssMEJBQTBCLE1BQU0sWUFBWSxjQUFjLFFBQVE7QUFDMUYsa0JBQVEsY0FBYyxVQUFVO1FBQ2xDO01BQ0YsQ0FBQztBQUdELFdBQUssTUFBTSxrQkFBa0I7QUFDN0IsY0FBUSxhQUFhO0FBRXJCLGFBQU87SUFDVCxDQUFBO0VBQUE7RUFFVSxzQkFDUixhQUNBLE9BQ0EsbUJBQ21CO0FBQ25CLFVBQU0sRUFBRSxRQUFRLGFBQWEsVUFBVSxPQUFPLElBQUk7QUFDbEQsVUFBTSxTQUFTLE1BQU0sV0FBVztBQUNoQyxVQUFNLGFBQWEsSUFBSSxrQkFBa0IsYUFBYSxNQUFNO0FBRTVELFFBQUksWUFBWSxNQUFNO0FBQ3BCLGlCQUFXLFdBQVc7SUFDeEI7QUFDQSxRQUFJLFVBQVUsTUFBTTtBQUNsQixpQkFBVyxTQUFTO0lBQ3RCO0FBRUEsUUFBSSxLQUFLLFlBQVk7QUFDbkIsWUFBTSxTQUFTLElBQUksd0JBQXdCLFVBQVU7QUFDckQsV0FBSyxXQUFXLElBQUksTUFBTTtJQUM1QjtBQUVBLFdBQU87RUFDVDtFQUVVLHFCQUNSLGFBQ0EsT0FDQSxrQkFDa0I7QUFDbEIsVUFBTSxFQUFFLFFBQVEsYUFBYSxTQUFTLE9BQU8sSUFBSTtBQUNqRCxVQUFNLFNBQVMsTUFBTSxXQUFXO0FBQ2hDLFVBQU0sYUFBYSxJQUFJLGlCQUFpQixhQUFhLE1BQU07QUFFM0QsUUFBSSxXQUFXLE1BQU07QUFDbkIsaUJBQVcsVUFBVTtJQUN2QjtBQUNBLFFBQUksVUFBVSxNQUFNO0FBQ2xCLGlCQUFXLFNBQVM7SUFDdEI7QUFFQSxRQUFJLEtBQUssWUFBWTtBQUNuQixZQUFNLFNBQVMsSUFBSSx3QkFBd0IsVUFBVTtBQUNyRCxXQUFLLFdBQVcsSUFBSSxNQUFNO0lBQzVCO0FBRUEsV0FBTztFQUNUO0VBRVUsMEJBQ1IsYUFDQSxPQUNBLHVCQUN1QjtBQUN2QixVQUFNLEVBQUUsUUFBUSxhQUFhLE9BQU8sSUFBSTtBQUN4QyxVQUFNLFNBQVMsTUFBTSxXQUFXO0FBQ2hDLFVBQU0sYUFBYSxJQUFJLHNCQUFzQixhQUFhLE1BQU07QUFFaEUsUUFBSSxVQUFVLE1BQU07QUFDbEIsaUJBQVcsU0FBUztJQUN0QjtBQUVBLFFBQUksS0FBSyxZQUFZO0FBQ25CLFlBQU0sU0FBUyxJQUFJLHdCQUF3QixVQUFVO0FBQ3JELFdBQUssV0FBVyxJQUFJLE1BQU07SUFDNUI7QUFFQSxXQUFPO0VBQ1Q7QUFDRjtBQTNKYSwrQkFDWSxpQkFBaUI7QUFEbkMsSUFBTSxnQ0FBTjs7O0FDaEJQLFlBQVlHLGFBQVc7QUNBdkIsWUFBWUEsYUFBVztBRUF2QixZQUFZQSxhQUFXO0FDQXZCLFlBQVlBLGFBQVc7QUNBdkIsWUFBWUEsYUFBVztBQ0F2QixZQUFZQSxhQUFXO0FDQXZCLFlBQVlBLGFBQVc7QUNBdkIsWUFBWUEsYUFBVztBQ0F2QixZQUFZQSxhQUFXO0FDQXZCLFlBQVlBLGNBQVc7QUNBdkIsWUFBWUEsY0FBVztBQ0F2QixZQUFZQSxjQUFXO0FDQXZCLFlBQVlBLGNBQVc7QUNHdkIsWUFBWUEsY0FBVzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FaRWhCLElBQWUsNkJBQWYsTUFBMEM7QUEyQmpEO0FEN0JBLElBQU1DLFFBQU8sSUFBVSxnQkFBUTtBQUMvQixJQUFNQyxRQUFPLElBQVUsZ0JBQVE7QUFFeEIsSUFBTSxvQ0FBTixjQUFnRCwyQkFBMkI7RUFDaEYsSUFBVyxPQUFrQjtBQUMzQixXQUFPO0VBQ1Q7RUFzQk8sWUFBWSxRQUE4RjtBQS9CbkgsUUFBQSxJQUFBLElBQUEsSUFBQTtBQWdDSSxVQUFNO0FBRU4sU0FBSyxVQUFTLEtBQUEsVUFBQSxPQUFBLFNBQUEsT0FBUSxXQUFSLE9BQUEsS0FBa0IsSUFBVSxnQkFBUSxHQUFLLEdBQUssQ0FBRztBQUMvRCxTQUFLLFFBQU8sS0FBQSxVQUFBLE9BQUEsU0FBQSxPQUFRLFNBQVIsT0FBQSxLQUFnQixJQUFVLGdCQUFRLEdBQUssR0FBSyxDQUFHO0FBQzNELFNBQUssVUFBUyxLQUFBLFVBQUEsT0FBQSxTQUFBLE9BQVEsV0FBUixPQUFBLEtBQWtCO0FBQ2hDLFNBQUssVUFBUyxLQUFBLFVBQUEsT0FBQSxTQUFBLE9BQVEsV0FBUixPQUFBLEtBQWtCO0VBQ2xDO0VBRU8sbUJBQ0wsZ0JBQ0EsZ0JBQ0EsY0FDQSxRQUNRO0FBQ1IsSUFBQUQsTUFBSyxzQkFBc0IsY0FBYztBQUN6QyxJQUFBQyxNQUFLLFdBQVcsS0FBSyxNQUFNLEtBQUssTUFBTSxFQUFFLGFBQWEsY0FBYztBQUNuRSxJQUFBQSxNQUFLLElBQUlELEtBQUk7QUFDYixVQUFNLGtCQUFrQkMsTUFBSyxTQUFTO0FBRXRDLFdBQU8sS0FBSyxjQUFjLEVBQUUsSUFBSUQsS0FBSTtBQUNwQyxVQUFNLE1BQU1DLE1BQUssSUFBSSxNQUFNO0FBRTNCLFFBQUksT0FBTyxHQUFLO0lBR2hCLFdBQVcsbUJBQW1CLEtBQUs7QUFFakMsYUFBTyxJQUFJQSxLQUFJO0lBQ2pCLE9BQU87QUFFTCxNQUFBQSxNQUFLLGVBQWUsTUFBTSxlQUFlO0FBQ3pDLGFBQU8sSUFBSUEsS0FBSTtJQUNqQjtBQUVBLFVBQU0sU0FBUyxPQUFPLE9BQU87QUFDN0IsVUFBTSxXQUFXLEtBQUssU0FBUyxLQUFLLFNBQVMsZUFBZSxTQUFTLFNBQVMsZUFBZSxLQUFLO0FBRWxHLFFBQUksV0FBVyxHQUFHO0FBQ2hCLGFBQU8sZUFBZSxJQUFJLE1BQU07QUFDaEMsVUFBSSxLQUFLLFFBQVE7QUFDZixlQUFPLE9BQU87TUFDaEI7SUFDRjtBQUVBLFdBQU87RUFDVDtBQUNGO0FFM0VBLElBQU1ELFNBQU8sSUFBVSxnQkFBUTtBQUMvQixJQUFNLFNBQVMsSUFBVSxnQkFBUTtBQUUxQixJQUFNLGtDQUFOLGNBQThDLDJCQUEyQjtFQUM5RSxJQUFXLE9BQWdCO0FBQ3pCLFdBQU87RUFDVDtFQVlPLFlBQVksUUFBNkQ7QUFyQmxGLFFBQUEsSUFBQTtBQXNCSSxVQUFNO0FBRU4sU0FBSyxVQUFTLEtBQUEsVUFBQSxPQUFBLFNBQUEsT0FBUSxXQUFSLE9BQUEsS0FBa0IsSUFBVSxnQkFBUSxHQUFLLEdBQUssQ0FBRztBQUMvRCxTQUFLLFVBQVMsS0FBQSxVQUFBLE9BQUEsU0FBQSxPQUFRLFdBQVIsT0FBQSxLQUFrQixJQUFVLGdCQUFRLEdBQUssR0FBSyxDQUFHO0VBQ2pFO0VBRU8sbUJBQ0wsZ0JBQ0EsZ0JBQ0EsY0FDQSxRQUNRO0FBQ1IsV0FBTyxzQkFBc0IsY0FBYztBQUMzQyxXQUFPLE9BQU8sRUFBRSxJQUFJLGNBQWM7QUFFbEMsV0FBTyxnQkFBZ0IsY0FBYztBQUNyQ0EsSUFBQUEsT0FBSyxLQUFLLEtBQUssTUFBTSxFQUFFLGtCQUFrQixNQUFNLEVBQUUsVUFBVTtBQUMzRCxVQUFNLFdBQVcsT0FBTyxJQUFJQSxNQUFJLElBQUk7QUFFcEMsV0FBTyxLQUFLQSxNQUFJO0FBRWhCLFdBQU87RUFDVDtBQUNGO0FDMUNBLElBQU1BLFNBQU8sSUFBVSxnQkFBUTtBQUV4QixJQUFNLG1DQUFOLGNBQStDLDJCQUEyQjtFQUMvRSxJQUFXLE9BQWlCO0FBQzFCLFdBQU87RUFDVDtFQWlCTyxZQUFZLFFBQXdFO0FBekI3RixRQUFBLElBQUEsSUFBQTtBQTBCSSxVQUFNO0FBRU4sU0FBSyxVQUFTLEtBQUEsVUFBQSxPQUFBLFNBQUEsT0FBUSxXQUFSLE9BQUEsS0FBa0IsSUFBVSxnQkFBUSxHQUFLLEdBQUssQ0FBRztBQUMvRCxTQUFLLFVBQVMsS0FBQSxVQUFBLE9BQUEsU0FBQSxPQUFRLFdBQVIsT0FBQSxLQUFrQjtBQUNoQyxTQUFLLFVBQVMsS0FBQSxVQUFBLE9BQUEsU0FBQSxPQUFRLFdBQVIsT0FBQSxLQUFrQjtFQUNsQztFQUVPLG1CQUNMLGdCQUNBLGdCQUNBLGNBQ0EsUUFDUTtBQUNSLFdBQU8sV0FBVyxnQkFBZ0JBLE9BQUssc0JBQXNCLGNBQWMsQ0FBQztBQUU1RSxVQUFNLFNBQVMsT0FBTyxPQUFPO0FBQzdCLFVBQU0sV0FBVyxLQUFLLFNBQVMsS0FBSyxTQUFTLGVBQWUsU0FBUyxTQUFTLGVBQWUsS0FBSztBQUVsRyxRQUFJLFdBQVcsR0FBRztBQUNoQixhQUFPLGVBQWUsSUFBSSxNQUFNO0FBQ2hDLFVBQUksS0FBSyxRQUFRO0FBQ2YsZUFBTyxPQUFPO01BQ2hCO0lBQ0Y7QUFFQSxXQUFPO0VBQ1Q7QUFDRjtBQ2pEQSxJQUFNQSxTQUFPLElBQVUsZ0JBQVE7QUFFeEIsSUFBTSxxQ0FBTixjQUF1RCx1QkFBc0Q7RUFVM0csWUFBWSxPQUEwQztBQUMzRCxVQUFNO0FBVlIsU0FBTyxhQUFhO0FBS3BCLFNBQVEsaUJBQWlCO0FBQ3pCLFNBQWlCLGlCQUFpQixJQUFVLGdCQUFRO0FBQ3BELFNBQWlCLGVBQWUsSUFBVSxnQkFBUTtBQUtoRCxTQUFLLFNBQVM7QUFFZCxTQUFLLFdBQVcsSUFBVSx3QkFBZ0IsSUFBSSxhQUFhLEdBQUcsR0FBRyxDQUFDO0FBQ2xFLFNBQUssYUFBYSxZQUFZLEtBQUssUUFBUTtBQUUzQyxTQUFLLGFBQWEsSUFBVSx3QkFBZ0IsSUFBSSxZQUFZLEdBQUcsR0FBRyxDQUFDO0FBQ25FLFNBQUssU0FBUyxLQUFLLFVBQVU7QUFFN0IsU0FBSyxZQUFZO0FBQ2pCLFNBQUssT0FBTztFQUNkO0VBRU8sU0FBZTtBQUNwQixRQUFJLHVCQUF1QjtBQUUzQixVQUFNLFNBQVMsS0FBSyxPQUFPLFNBQVMsS0FBSztBQUN6QyxRQUFJLEtBQUssbUJBQW1CLFFBQVE7QUFDbEMsV0FBSyxpQkFBaUI7QUFDdEIsNkJBQXVCO0lBQ3pCO0FBRUEsUUFBSSxDQUFDLEtBQUssZUFBZSxPQUFPLEtBQUssT0FBTyxNQUFNLEdBQUc7QUFDbkQsV0FBSyxlQUFlLEtBQUssS0FBSyxPQUFPLE1BQU07QUFDM0MsNkJBQXVCO0lBQ3pCO0FBRUEsVUFBTSxPQUFPQSxPQUFLLEtBQUssS0FBSyxPQUFPLElBQUksRUFBRSxhQUFhLEtBQUssVUFBVTtBQUNyRSxRQUFJLEtBQUssYUFBYSxrQkFBa0IsSUFBSSxJQUFJLE9BQU87QUFDckQsV0FBSyxhQUFhLEtBQUssSUFBSTtBQUMzQiw2QkFBdUI7SUFDekI7QUFFQSxRQUFJLHNCQUFzQjtBQUN4QixXQUFLLGVBQWU7SUFDdEI7RUFDRjtFQUVRLGlCQUF1QjtBQUM3QkEsSUFBQUEsT0FBSyxLQUFLLEtBQUssWUFBWSxFQUFFLElBQUksS0FBSyxjQUFjO0FBQ3BELFVBQU0sSUFBSUEsT0FBSyxPQUFPLElBQUksS0FBSztBQUUvQixhQUFTLElBQUksR0FBRyxLQUFLLElBQUksS0FBSztBQUM1QixZQUFNLElBQUssSUFBSSxLQUFRLEtBQUs7QUFFNUIsV0FBSyxTQUFTLE9BQU8sR0FBRyxDQUFDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUc7QUFDdkQsV0FBSyxTQUFTLE9BQU8sS0FBSyxHQUFHLElBQUksS0FBSyxJQUFJLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUc7QUFDOUQsV0FBSyxTQUFTLE9BQU8sS0FBSyxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsR0FBRyxHQUFLLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztBQUM1RCxXQUFLLFNBQVMsT0FBTyxLQUFLLEdBQUcsSUFBSSxLQUFLLElBQUksQ0FBQyxHQUFHLEdBQUssS0FBSyxJQUFJLENBQUMsQ0FBQztJQUNoRTtBQUVBLGFBQVMsSUFBSSxHQUFHLElBQUksSUFBSSxLQUFLO0FBQzNCLFlBQU0sSUFBSyxJQUFJLEtBQVEsS0FBSztBQUM1QixXQUFLLFNBQVMsT0FBTyxLQUFLLEdBQUcsR0FBSyxLQUFLLElBQUksQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLENBQUM7QUFDMUQsV0FBSyxTQUFTLE9BQU8sTUFBTSxHQUFHLEdBQUcsS0FBSyxJQUFJLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxDQUFDO0lBQzNEO0FBRUEsVUFBTSxRQUFRLEtBQUssTUFBTUEsT0FBSyxHQUFHLEtBQUssS0FBS0EsT0FBSyxJQUFJQSxPQUFLLElBQUlBLE9BQUssSUFBSUEsT0FBSyxDQUFDLENBQUM7QUFDN0UsVUFBTSxNQUFNLENBQUMsS0FBSyxNQUFNQSxPQUFLLEdBQUdBLE9BQUssQ0FBQztBQUV0QyxTQUFLLFFBQVEsS0FBSztBQUNsQixTQUFLLFFBQVEsR0FBRztBQUNoQixTQUFLLE1BQU0sS0FBSyxnQkFBZ0IsS0FBSyxnQkFBZ0IsS0FBSyxjQUFjO0FBQ3hFLFNBQUssVUFBVSxLQUFLLGVBQWUsR0FBRyxLQUFLLGVBQWUsR0FBRyxLQUFLLGVBQWUsQ0FBQztBQUVsRixTQUFLLFNBQVMsY0FBYztFQUM5QjtFQUVRLGNBQW9CO0FBQzFCLGFBQVMsSUFBSSxHQUFHLElBQUksSUFBSSxLQUFLO0FBQzNCLFlBQU0sTUFBTSxJQUFJLEtBQUs7QUFFckIsV0FBSyxXQUFXLE1BQU0sSUFBSSxHQUFHLEdBQUcsRUFBRTtBQUNsQyxXQUFLLFdBQVcsTUFBTSxLQUFLLElBQUksR0FBRyxLQUFLLEdBQUcsS0FBSyxFQUFFO0lBQ25EO0FBRUEsYUFBUyxJQUFJLEdBQUcsSUFBSSxJQUFJLEtBQUs7QUFDM0IsWUFBTSxNQUFNLElBQUksS0FBSztBQUVyQixXQUFLLFdBQVcsTUFBTSxNQUFNLElBQUksR0FBRyxLQUFLLEdBQUcsS0FBSyxFQUFFO0FBQ2xELFdBQUssV0FBVyxNQUFNLE1BQU0sSUFBSSxHQUFHLE1BQU0sR0FBRyxNQUFNLEVBQUU7SUFDdEQ7QUFFQSxTQUFLLFdBQVcsY0FBYztFQUNoQztBQUNGO0FDbkdPLElBQU0sbUNBQU4sY0FBcUQsdUJBQXNEO0VBU3pHLFlBQVksT0FBd0M7QUFDekQsVUFBTTtBQVRSLFNBQU8sYUFBYTtBQUtwQixTQUFpQixpQkFBaUIsSUFBVSxnQkFBUTtBQUNwRCxTQUFpQixpQkFBaUIsSUFBVSxnQkFBUTtBQUtsRCxTQUFLLFNBQVM7QUFFZCxTQUFLLFdBQVcsSUFBVSx3QkFBZ0IsSUFBSSxhQUFhLElBQUksQ0FBQyxHQUFHLENBQUM7QUFDcEUsU0FBSyxhQUFhLFlBQVksS0FBSyxRQUFRO0FBRTNDLFNBQUssYUFBYSxJQUFVLHdCQUFnQixJQUFJLFlBQVksRUFBRSxHQUFHLENBQUM7QUFDbEUsU0FBSyxTQUFTLEtBQUssVUFBVTtBQUU3QixTQUFLLFlBQVk7QUFDakIsU0FBSyxPQUFPO0VBQ2Q7RUFFTyxTQUFlO0FBQ3BCLFFBQUksdUJBQXVCO0FBRTNCLFFBQUksQ0FBQyxLQUFLLGVBQWUsT0FBTyxLQUFLLE9BQU8sTUFBTSxHQUFHO0FBQ25ELFdBQUssZUFBZSxLQUFLLEtBQUssT0FBTyxNQUFNO0FBQzNDLDZCQUF1QjtJQUN6QjtBQUVBLFFBQUksQ0FBQyxLQUFLLGVBQWUsT0FBTyxLQUFLLE9BQU8sTUFBTSxHQUFHO0FBQ25ELFdBQUssZUFBZSxLQUFLLEtBQUssT0FBTyxNQUFNO0FBQzNDLDZCQUF1QjtJQUN6QjtBQUVBLFFBQUksc0JBQXNCO0FBQ3hCLFdBQUssZUFBZTtJQUN0QjtFQUNGO0VBRVEsaUJBQXVCO0FBQzdCLFNBQUssU0FBUyxPQUFPLEdBQUcsTUFBTSxNQUFNLENBQUM7QUFDckMsU0FBSyxTQUFTLE9BQU8sR0FBRyxLQUFLLE1BQU0sQ0FBQztBQUNwQyxTQUFLLFNBQVMsT0FBTyxHQUFHLEtBQUssS0FBSyxDQUFDO0FBQ25DLFNBQUssU0FBUyxPQUFPLEdBQUcsTUFBTSxLQUFLLENBQUM7QUFDcEMsU0FBSyxTQUFTLE9BQU8sR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUMvQixTQUFLLFNBQVMsT0FBTyxHQUFHLEdBQUcsR0FBRyxJQUFJO0FBRWxDLFNBQUssVUFBVSxLQUFLLGVBQWUsR0FBRyxLQUFLLGVBQWUsR0FBRyxLQUFLLGVBQWUsQ0FBQztBQUNsRixTQUFLLE9BQU8sS0FBSyxjQUFjO0FBRS9CLFNBQUssU0FBUyxjQUFjO0VBQzlCO0VBRVEsY0FBb0I7QUFDMUIsU0FBSyxXQUFXLE1BQU0sR0FBRyxHQUFHLENBQUM7QUFDN0IsU0FBSyxXQUFXLE1BQU0sR0FBRyxHQUFHLENBQUM7QUFDN0IsU0FBSyxXQUFXLE1BQU0sR0FBRyxHQUFHLENBQUM7QUFDN0IsU0FBSyxXQUFXLE1BQU0sR0FBRyxHQUFHLENBQUM7QUFDN0IsU0FBSyxXQUFXLE1BQU0sR0FBRyxHQUFHLENBQUM7QUFFN0IsU0FBSyxXQUFXLGNBQWM7RUFDaEM7QUFDRjtBQ2pFTyxJQUFNLG9DQUFOLGNBQXNELHVCQUFzRDtFQVMxRyxZQUFZLE9BQXlDO0FBQzFELFVBQU07QUFUUixTQUFPLGFBQWE7QUFLcEIsU0FBUSxpQkFBaUI7QUFDekIsU0FBaUIsaUJBQWlCLElBQVUsZ0JBQVE7QUFLbEQsU0FBSyxTQUFTO0FBRWQsU0FBSyxXQUFXLElBQVUsd0JBQWdCLElBQUksYUFBYSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUM7QUFDekUsU0FBSyxhQUFhLFlBQVksS0FBSyxRQUFRO0FBRTNDLFNBQUssYUFBYSxJQUFVLHdCQUFnQixJQUFJLFlBQVksS0FBSyxDQUFDLEdBQUcsQ0FBQztBQUN0RSxTQUFLLFNBQVMsS0FBSyxVQUFVO0FBRTdCLFNBQUssWUFBWTtBQUNqQixTQUFLLE9BQU87RUFDZDtFQUVPLFNBQWU7QUFDcEIsUUFBSSx1QkFBdUI7QUFFM0IsVUFBTSxTQUFTLEtBQUssT0FBTyxTQUFTLEtBQUs7QUFDekMsUUFBSSxLQUFLLG1CQUFtQixRQUFRO0FBQ2xDLFdBQUssaUJBQWlCO0FBQ3RCLDZCQUF1QjtJQUN6QjtBQUVBLFFBQUksQ0FBQyxLQUFLLGVBQWUsT0FBTyxLQUFLLE9BQU8sTUFBTSxHQUFHO0FBQ25ELFdBQUssZUFBZSxLQUFLLEtBQUssT0FBTyxNQUFNO0FBQzNDLDZCQUF1QjtJQUN6QjtBQUVBLFFBQUksc0JBQXNCO0FBQ3hCLFdBQUssZUFBZTtJQUN0QjtFQUNGO0VBRVEsaUJBQXVCO0FBQzdCLGFBQVMsSUFBSSxHQUFHLElBQUksSUFBSSxLQUFLO0FBQzNCLFlBQU0sSUFBSyxJQUFJLEtBQVEsS0FBSztBQUU1QixXQUFLLFNBQVMsT0FBTyxHQUFHLEtBQUssSUFBSSxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFHO0FBQ3JELFdBQUssU0FBUyxPQUFPLEtBQUssR0FBRyxHQUFLLEtBQUssSUFBSSxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsQ0FBQztBQUMxRCxXQUFLLFNBQVMsT0FBTyxLQUFLLEdBQUcsS0FBSyxJQUFJLENBQUMsR0FBRyxHQUFLLEtBQUssSUFBSSxDQUFDLENBQUM7SUFDNUQ7QUFFQSxTQUFLLE1BQU0sS0FBSyxnQkFBZ0IsS0FBSyxnQkFBZ0IsS0FBSyxjQUFjO0FBQ3hFLFNBQUssVUFBVSxLQUFLLGVBQWUsR0FBRyxLQUFLLGVBQWUsR0FBRyxLQUFLLGVBQWUsQ0FBQztBQUVsRixTQUFLLFNBQVMsY0FBYztFQUM5QjtFQUVRLGNBQW9CO0FBQzFCLGFBQVMsSUFBSSxHQUFHLElBQUksSUFBSSxLQUFLO0FBQzNCLFlBQU0sTUFBTSxJQUFJLEtBQUs7QUFFckIsV0FBSyxXQUFXLE1BQU0sSUFBSSxHQUFHLEdBQUcsRUFBRTtBQUNsQyxXQUFLLFdBQVcsTUFBTSxLQUFLLElBQUksR0FBRyxLQUFLLEdBQUcsS0FBSyxFQUFFO0FBQ2pELFdBQUssV0FBVyxNQUFNLE1BQU0sSUFBSSxHQUFHLEtBQUssR0FBRyxLQUFLLEVBQUU7SUFDcEQ7QUFFQSxTQUFLLFdBQVcsY0FBYztFQUNoQztBQUNGO0FQL0RBLElBQU1BLFNBQU8sSUFBVSxnQkFBUTtBQUV4QixJQUFNLDhCQUFOLGNBQWdELGNBQU07RUFLcEQsWUFBWSxVQUFpQztBQUNsRCxVQUFNO0FBQ04sU0FBSyxtQkFBbUI7QUFFeEIsU0FBSyxXQUFXO0FBRWhCLFFBQUksS0FBSyxTQUFTLGlCQUFpQixrQ0FBa0M7QUFDbkUsV0FBSyxZQUFZLElBQUksa0NBQWtDLEtBQUssU0FBUyxLQUFLO0lBQzVFLFdBQVcsS0FBSyxTQUFTLGlCQUFpQixtQ0FBbUM7QUFDM0UsV0FBSyxZQUFZLElBQUksbUNBQW1DLEtBQUssU0FBUyxLQUFLO0lBQzdFLFdBQVcsS0FBSyxTQUFTLGlCQUFpQixpQ0FBaUM7QUFDekUsV0FBSyxZQUFZLElBQUksaUNBQWlDLEtBQUssU0FBUyxLQUFLO0lBQzNFLE9BQU87QUFDTCxZQUFNLElBQUksTUFBTSxtRUFBbUU7SUFDckY7QUFFQSxVQUFNLFdBQVcsSUFBVSwwQkFBa0I7TUFDM0MsT0FBTztNQUNQLFdBQVc7TUFDWCxZQUFZO0lBQ2QsQ0FBQztBQUVELFNBQUssUUFBUSxJQUFVLHFCQUFhLEtBQUssV0FBVyxRQUFRO0FBQzVELFNBQUssSUFBSSxLQUFLLEtBQUs7RUFDckI7RUFFTyxVQUFnQjtBQUNyQixTQUFLLFVBQVUsUUFBUTtFQUN6QjtFQUVPLGtCQUFrQixPQUFzQjtBQUM3QyxTQUFLLFNBQVMsa0JBQWtCLE1BQU0sS0FBSztBQUUzQyxTQUFLLE9BQU8sS0FBSyxLQUFLLFNBQVMsV0FBVztBQUUxQyxVQUFNLHNCQUFzQixLQUFLLE9BQU87QUFDeEMsU0FBSyxVQUFVLGFBQWFBLE9BQ3pCLElBQUksb0JBQW9CLENBQUMsR0FBRyxvQkFBb0IsQ0FBQyxHQUFHLG9CQUFvQixDQUFDLENBQUMsRUFDMUUsT0FBTztBQUVWLFNBQUssVUFBVSxPQUFPO0FBRXRCLFVBQU0sa0JBQWtCLEtBQUs7RUFDL0I7QUFDRjtBUzFETyxJQUFNLDJCQUFOLGNBQTZDLHVCQUFlO0VBUzFELFlBQVksWUFBZ0M7QUFDakQsVUFBTTtBQVRSLFNBQU8sYUFBYTtBQUtwQixTQUFRLGlCQUFpQjtBQUN6QixTQUFpQixlQUFlLElBQVUsZ0JBQVE7QUFLaEQsU0FBSyxjQUFjO0FBRW5CLFNBQUssV0FBVyxJQUFVLHdCQUFnQixJQUFJLGFBQWEsR0FBRyxHQUFHLENBQUM7QUFDbEUsU0FBSyxhQUFhLFlBQVksS0FBSyxRQUFRO0FBRTNDLFNBQUssYUFBYSxJQUFVLHdCQUFnQixJQUFJLFlBQVksR0FBRyxHQUFHLENBQUM7QUFDbkUsU0FBSyxTQUFTLEtBQUssVUFBVTtBQUU3QixTQUFLLFlBQVk7QUFDakIsU0FBSyxPQUFPO0VBQ2Q7RUFFTyxTQUFlO0FBQ3BCLFFBQUksdUJBQXVCO0FBRTNCLFVBQU0sU0FBUyxLQUFLLFlBQVksU0FBUyxZQUFZLEtBQUs7QUFDMUQsUUFBSSxLQUFLLG1CQUFtQixRQUFRO0FBQ2xDLFdBQUssaUJBQWlCO0FBQ3RCLDZCQUF1QjtJQUN6QjtBQUVBLFFBQUksQ0FBQyxLQUFLLGFBQWEsT0FBTyxLQUFLLFlBQVkseUJBQXlCLEdBQUc7QUFDekUsV0FBSyxhQUFhLEtBQUssS0FBSyxZQUFZLHlCQUF5QjtBQUNqRSw2QkFBdUI7SUFDekI7QUFFQSxRQUFJLHNCQUFzQjtBQUN4QixXQUFLLGVBQWU7SUFDdEI7RUFDRjtFQUVRLGlCQUF1QjtBQUM3QixhQUFTLElBQUksR0FBRyxJQUFJLElBQUksS0FBSztBQUMzQixZQUFNLElBQUssSUFBSSxLQUFRLEtBQUs7QUFFNUIsV0FBSyxTQUFTLE9BQU8sR0FBRyxLQUFLLElBQUksQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBRztBQUNyRCxXQUFLLFNBQVMsT0FBTyxLQUFLLEdBQUcsR0FBSyxLQUFLLElBQUksQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLENBQUM7QUFDMUQsV0FBSyxTQUFTLE9BQU8sS0FBSyxHQUFHLEtBQUssSUFBSSxDQUFDLEdBQUcsR0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDO0lBQzVEO0FBRUEsU0FBSyxNQUFNLEtBQUssZ0JBQWdCLEtBQUssZ0JBQWdCLEtBQUssY0FBYztBQUN4RSxTQUFLLFVBQVUsS0FBSyxhQUFhLEdBQUcsS0FBSyxhQUFhLEdBQUcsS0FBSyxhQUFhLENBQUM7QUFFNUUsU0FBSyxTQUFTLE9BQU8sSUFBSSxHQUFHLEdBQUcsQ0FBQztBQUNoQyxTQUFLLFNBQVMsT0FBTyxJQUFJLEtBQUssYUFBYSxHQUFHLEtBQUssYUFBYSxHQUFHLEtBQUssYUFBYSxDQUFDO0FBRXRGLFNBQUssU0FBUyxjQUFjO0VBQzlCO0VBRVEsY0FBb0I7QUFDMUIsYUFBUyxJQUFJLEdBQUcsSUFBSSxJQUFJLEtBQUs7QUFDM0IsWUFBTSxNQUFNLElBQUksS0FBSztBQUVyQixXQUFLLFdBQVcsTUFBTSxJQUFJLEdBQUcsR0FBRyxFQUFFO0FBQ2xDLFdBQUssV0FBVyxNQUFNLEtBQUssSUFBSSxHQUFHLEtBQUssR0FBRyxLQUFLLEVBQUU7QUFDakQsV0FBSyxXQUFXLE1BQU0sTUFBTSxJQUFJLEdBQUcsS0FBSyxHQUFHLEtBQUssRUFBRTtJQUNwRDtBQUNBLFNBQUssV0FBVyxNQUFNLEtBQUssSUFBSSxFQUFFO0FBRWpDLFNBQUssV0FBVyxjQUFjO0VBQ2hDO0FBQ0Y7QUR4RUEsSUFBTUEsU0FBTyxJQUFVLGdCQUFRO0FBRXhCLElBQU0sMkJBQU4sY0FBNkMsY0FBTTtFQUtqRCxZQUFZLFlBQWdDO0FBQ2pELFVBQU07QUFDTixTQUFLLG1CQUFtQjtBQUV4QixTQUFLLGFBQWE7QUFFbEIsU0FBSyxZQUFZLElBQUkseUJBQXlCLEtBQUssVUFBVTtBQUU3RCxVQUFNLFdBQVcsSUFBVSwwQkFBa0I7TUFDM0MsT0FBTztNQUNQLFdBQVc7TUFDWCxZQUFZO0lBQ2QsQ0FBQztBQUVELFNBQUssUUFBUSxJQUFVLHFCQUFhLEtBQUssV0FBVyxRQUFRO0FBQzVELFNBQUssSUFBSSxLQUFLLEtBQUs7RUFDckI7RUFFTyxVQUFnQjtBQUNyQixTQUFLLFVBQVUsUUFBUTtFQUN6QjtFQUVPLGtCQUFrQixPQUFzQjtBQUM3QyxTQUFLLFdBQVcsS0FBSyxrQkFBa0IsTUFBTSxLQUFLO0FBRWxELFNBQUssT0FBTyxLQUFLLEtBQUssV0FBVyxLQUFLLFdBQVc7QUFFakQsVUFBTSxzQkFBc0IsS0FBSyxPQUFPO0FBQ3hDLFNBQUssVUFBVSxhQUFhQSxPQUN6QixJQUFJLG9CQUFvQixDQUFDLEdBQUcsb0JBQW9CLENBQUMsR0FBRyxvQkFBb0IsQ0FBQyxDQUFDLEVBQzFFLE9BQU87QUFFVixTQUFLLFVBQVUsT0FBTztBQUV0QixVQUFNLGtCQUFrQixLQUFLO0VBQy9CO0FBQ0Y7QUV6Q08sSUFBTSx3QkFBTixjQUEwQyxrQkFBUztFQVdqRCxZQUFZLE9BQW1DO0FBQ3BELFVBQU07QUFIUixTQUFnQixpQkFBaUIsSUFBVSxpQkFBUTtBQUtqRCxTQUFLLFFBQVE7RUFDZjtFQUVPLGtCQUFrQixlQUF3QixnQkFBK0I7QUFDOUUsVUFBTSxrQkFBa0IsZUFBZSxjQUFjO0FBRXJELHlCQUFxQixLQUFLLGdCQUFnQixLQUFLLGFBQWEsS0FBSyxNQUFNLE1BQU07RUFDL0U7QUFDRjtBQWFBLFNBQVMscUJBQXFCLGdCQUErQixhQUE0QixRQUF3QjtBQUMvRyxRQUFNLEtBQUssWUFBWTtBQUV2QixpQkFBZSxLQUFLLFdBQVc7QUFFL0IsTUFBSSxRQUFRO0FBQ1YsbUJBQWUsU0FBUyxFQUFFLElBQUksR0FBRyxDQUFDLElBQUksT0FBTyxJQUFJLEdBQUcsQ0FBQyxJQUFJLE9BQU8sSUFBSSxHQUFHLENBQUMsSUFBSSxPQUFPLElBQUksR0FBRyxFQUFFO0FBQzVGLG1CQUFlLFNBQVMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxJQUFJLE9BQU8sSUFBSSxHQUFHLENBQUMsSUFBSSxPQUFPLElBQUksR0FBRyxDQUFDLElBQUksT0FBTyxJQUFJLEdBQUcsRUFBRTtBQUM1RixtQkFBZSxTQUFTLEVBQUUsSUFBSSxHQUFHLENBQUMsSUFBSSxPQUFPLElBQUksR0FBRyxDQUFDLElBQUksT0FBTyxJQUFJLEdBQUcsRUFBRSxJQUFJLE9BQU8sSUFBSSxHQUFHLEVBQUU7RUFDL0Y7QUFDRjtBR2pEQSxJQUFNLFFBQVEsSUFBVSxpQkFBUTtBQVF6QixTQUFTLGlCQUEwQyxRQUFjO0FBQ3RFLE1BQUssT0FBZSxRQUFRO0FBQzFCLFdBQU8sT0FBTztFQUNoQixPQUFPO0FBQ0osV0FBZSxXQUFXLE1BQU0sS0FBSyxNQUFNLENBQUM7RUFDL0M7QUFFQSxTQUFPO0FBQ1Q7QURmTyxJQUFNLHNCQUFOLE1BQTBCO0VBb0N4QixZQUFZLFFBQXVCO0FBM0IxQyxTQUFpQixnQkFBZ0IsSUFBVSxpQkFBUTtBQU1uRCxTQUFRLHVCQUF1QjtBQXNCN0IsU0FBSyxTQUFTO0FBRWQsVUFBTSxVQUFrQztNQUN0QyxLQUFLLENBQUMsS0FBSyxNQUFXLFdBQVc7QUFDL0IsYUFBSyx1QkFBdUI7QUFDNUIsWUFBSSxJQUFJLElBQUk7QUFFWixlQUFPO01BQ1Q7SUFDRjtBQUVBLFNBQUssb0JBQW9CLE9BQU87QUFDaEMsV0FBTyxXQUFXLElBQUksTUFBMEIsT0FBTyxVQUFVLE9BQU87RUFDMUU7Ozs7OztFQXZCQSxJQUFXLFVBQXlCO0FBQ2xDLFFBQUksS0FBSyxzQkFBc0I7QUFDN0IsdUJBQWlCLEtBQUssY0FBYyxLQUFLLEtBQUssTUFBTSxDQUFDO0FBQ3JELFdBQUssdUJBQXVCO0lBQzlCO0FBRUEsV0FBTyxLQUFLO0VBQ2Q7RUFrQk8sU0FBZTtBQUNwQixTQUFLLE9BQU8sV0FBVyxLQUFLO0VBQzlCO0FBQ0Y7QURqREEsSUFBTSxtQkFBbUIsSUFBVSxpQkFBUTtBQUczQyxJQUFNQSxTQUFPLElBQVUsaUJBQVE7QUFDL0IsSUFBTUMsU0FBTyxJQUFVLGlCQUFRO0FBSy9CLElBQU0sc0JBQXNCLElBQVUsaUJBQVE7QUFLOUMsSUFBTSxZQUFZLElBQVUsaUJBQVE7QUFFcEMsSUFBTUMsU0FBUSxJQUFVLGlCQUFRO0FBTXpCLElBQU0scUJBQU4sTUFBeUI7Ozs7Ozs7OztFQTZIOUIsWUFDRSxNQUNBLE9BQ0EsV0FBZ0QsQ0FBQyxHQUNqRCxpQkFBK0MsQ0FBQyxHQUNoRDtBQXpHRixTQUFRLGVBQWUsSUFBVSxpQkFBUTtBQUt6QyxTQUFRLFlBQVksSUFBVSxpQkFBUTtBQUt0QyxTQUFRLFlBQVksSUFBVSxpQkFBUTtBQVF0QyxTQUFRLHdCQUF3QjtBQTBCaEMsU0FBUSxVQUFpQztBQXlCekMsU0FBUSxzQkFBc0IsSUFBVSxpQkFBUTtBQUtoRCxTQUFRLHdCQUF3QixJQUFVLG9CQUFXO0FBS3JELFNBQVEsNkJBQTZCLElBQVUsaUJBQVE7QUF2SXpELFFBQUEsSUFBQSxJQUFBLElBQUEsSUFBQSxJQUFBO0FBa0tJLFNBQUssT0FBTztBQUNaLFNBQUssS0FBSyxtQkFBbUI7QUFFN0IsU0FBSyxRQUFRO0FBRWIsU0FBSyxXQUFXO01BQ2QsWUFBVyxLQUFBLFNBQVMsY0FBVCxPQUFBLEtBQXNCO01BQ2pDLFlBQVcsS0FBQSxTQUFTLGNBQVQsT0FBQSxLQUFzQjtNQUNqQyxlQUFjLEtBQUEsU0FBUyxpQkFBVCxPQUFBLEtBQXlCO01BQ3ZDLGFBQVksTUFBQSxLQUFBLFNBQVMsZUFBVCxPQUFBLFNBQUEsR0FBcUIsTUFBQSxNQUFyQixPQUFBLEtBQWdDLElBQVUsaUJBQVEsR0FBSyxJQUFNLENBQUc7TUFDNUUsWUFBVyxLQUFBLFNBQVMsY0FBVCxPQUFBLEtBQXNCO0lBQ25DO0FBRUEsU0FBSyxpQkFBaUI7RUFDeEI7Ozs7RUFqR0EsSUFBVyxlQUFvQztBQUM3QyxVQUFNLE1BQU0sb0JBQUksSUFBb0I7QUFFcEMsVUFBTSxTQUFTLEtBQUssS0FBSztBQUN6QixRQUFJLFFBQVE7QUFDVixVQUFJLElBQUksTUFBTTtJQUNoQjtBQUVBLGFBQVMsS0FBSyxHQUFHLEtBQUssS0FBSyxlQUFlLFFBQVEsTUFBTTtBQUN0RCxlQUFTLElBQUksR0FBRyxJQUFJLEtBQUssZUFBZSxFQUFFLEVBQUUsVUFBVSxRQUFRLEtBQUs7QUFDakUsWUFBSSxJQUFJLEtBQUssZUFBZSxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7TUFDOUM7SUFDRjtBQUVBLFdBQU87RUFDVDtFQU9BLElBQVcsU0FBZ0M7QUFDekMsV0FBTyxLQUFLO0VBQ2Q7RUFDQSxJQUFXLE9BQU8sUUFBK0I7QUF4R25ELFFBQUE7QUEwR0ksU0FBSSxLQUFBLEtBQUssWUFBTCxPQUFBLFNBQUEsR0FBYyxTQUFTLG1CQUFtQjtBQUMzQyxXQUFLLFFBQVEsU0FBUyxrQkFBMEMsT0FBTztBQUN4RSxhQUFPLEtBQUssUUFBUSxTQUFTO0lBQy9CO0FBR0EsU0FBSyxVQUFVO0FBR2YsUUFBSSxLQUFLLFNBQVM7QUFDaEIsVUFBSSxDQUFDLEtBQUssUUFBUSxTQUFTLG1CQUFtQjtBQUM1QyxhQUFLLFFBQVEsU0FBUyxvQkFBb0IsSUFBSSxvQkFBb0IsS0FBSyxRQUFRLFdBQVc7TUFDNUY7SUFDRjtFQUNGO0VBZ0JBLElBQVcsNEJBQTJDO0FBQ3BELFdBQU8sS0FBSztFQUNkOzs7OztFQU1BLElBQVkscUJBQW9DO0FBQzlDLFdBQU8sS0FBSyxLQUFLLFNBQVMsS0FBSyxLQUFLLE9BQU8sY0FBYztFQUMzRDs7Ozs7RUFvQ08sZUFBcUI7QUFFMUIsU0FBSyxvQkFBb0IsS0FBSyxLQUFLLEtBQUssTUFBTTtBQUM5QyxTQUFLLHNCQUFzQixLQUFLLEtBQUssS0FBSyxVQUFVO0FBR3BELFFBQUksS0FBSyxPQUFPO0FBQ2QsV0FBSywyQkFBMkIsS0FBSyxLQUFLLE1BQU0sUUFBUTtJQUMxRCxPQUFPO0FBR0wsV0FBSywyQkFBMkIsS0FBSyxLQUFLLEtBQUssUUFBUSxFQUFFLFVBQVUsRUFBRSxlQUFlLElBQUk7SUFDMUY7QUFHQSxVQUFNLHNCQUFzQixLQUFLLHdCQUF3QjtBQUN6RCxTQUFLLEtBQUssYUFBYSxLQUFLLGFBQWEsS0FBSyxLQUFLLDBCQUEwQixDQUFDLEVBQUUsYUFBYSxtQkFBbUI7QUFDaEgsU0FBSyxVQUFVLEtBQUssS0FBSyxZQUFZO0FBR3JDLFNBQUssVUFBVSxLQUFLLEtBQUssMEJBQTBCLEVBQUUsVUFBVTtFQUNqRTs7Ozs7RUFNTyxRQUFjO0FBQ25CLFNBQUssS0FBSyxXQUFXLEtBQUssS0FBSyxxQkFBcUI7QUFHcEQsU0FBSyxLQUFLLGFBQWE7QUFDdkIsU0FBSyxLQUFLLFlBQVksaUJBQWlCLEtBQUssb0JBQW9CLEtBQUssS0FBSyxNQUFNO0FBR2hGLFVBQU0sc0JBQXNCLEtBQUssd0JBQXdCO0FBQ3pELFNBQUssS0FBSyxhQUFhLEtBQUssYUFBYSxLQUFLLEtBQUssMEJBQTBCLENBQUMsRUFBRSxhQUFhLG1CQUFtQjtBQUNoSCxTQUFLLFVBQVUsS0FBSyxLQUFLLFlBQVk7RUFDdkM7Ozs7Ozs7RUFRTyxPQUFPLE9BQXFCO0FBQ2pDLFFBQUksU0FBUyxFQUFHO0FBR2hCLFNBQUssMEJBQTBCO0FBRy9CLFVBQU0scUJBQXFCRCxPQUN4QixLQUFLLEtBQUssU0FBUyxFQUNuQixtQkFBbUIsS0FBSyxtQkFBbUIsRUFDM0MsbUJBQW1CLEtBQUssa0JBQWtCO0FBRzdDLGNBRUcsS0FBSyxLQUFLLFlBQVksRUFDdEIsSUFBSUQsT0FBSyxXQUFXLEtBQUssY0FBYyxLQUFLLFNBQVMsRUFBRSxlQUFlLElBQUksS0FBSyxTQUFTLFNBQVMsQ0FBQyxFQUVsRyxhQUFhLEtBQUssd0JBQXdCLENBQUMsRUFFM0MsZ0JBQWdCLG9CQUFvQixLQUFLLFNBQVMsWUFBWSxLQUFLLEVBQ25FLGdCQUFnQixLQUFLLFNBQVMsWUFBWSxLQUFLLFNBQVMsZUFBZSxLQUFLO0FBRy9FLHdCQUFvQixzQkFBc0IsS0FBSyxLQUFLLFdBQVc7QUFDL0QsY0FBVSxJQUFJLG1CQUFtQixFQUFFLFVBQVUsRUFBRSxlQUFlLEtBQUsscUJBQXFCLEVBQUUsSUFBSSxtQkFBbUI7QUFHakgsU0FBSyxXQUFXLFNBQVM7QUFHekIsU0FBSyxVQUFVLEtBQUssS0FBSyxZQUFZO0FBQ3JDLFNBQUssYUFBYSxLQUFLLFNBQVMsRUFBRSxhQUFhLEtBQUssd0JBQXdCLENBQUM7QUFJN0UsVUFBTSw2QkFBNkJFLE9BQ2hDLGlCQUFpQixLQUFLLG9CQUFvQixLQUFLLG1CQUFtQixFQUNsRSxPQUFPO0FBQ1YsU0FBSyxLQUFLLFdBQ1AsbUJBQW1CLEtBQUssV0FBV0YsT0FBSyxLQUFLLFNBQVMsRUFBRSxhQUFhLDBCQUEwQixFQUFFLFVBQVUsQ0FBQyxFQUM1RyxZQUFZLEtBQUsscUJBQXFCO0FBR3pDLFNBQUssS0FBSyxhQUFhO0FBQ3ZCLFNBQUssS0FBSyxZQUFZLGlCQUFpQixLQUFLLG9CQUFvQixLQUFLLEtBQUssTUFBTTtFQUNsRjs7Ozs7O0VBT1EsV0FBVyxNQUEyQjtBQUM1QyxhQUFTLEtBQUssR0FBRyxLQUFLLEtBQUssZUFBZSxRQUFRLE1BQU07QUFDdEQsZUFBUyxJQUFJLEdBQUcsSUFBSSxLQUFLLGVBQWUsRUFBRSxFQUFFLFVBQVUsUUFBUSxLQUFLO0FBQ2pFLGNBQU0sV0FBVyxLQUFLLGVBQWUsRUFBRSxFQUFFLFVBQVUsQ0FBQztBQUNwRCxjQUFNLE9BQU8sU0FBUyxNQUFNLG1CQUFtQixTQUFTLGdCQUFnQixNQUFNLEtBQUssU0FBUyxXQUFXQSxNQUFJO0FBRTNHLFlBQUksT0FBTyxHQUFLO0FBRWQsZUFBSyxnQkFBZ0JBLFFBQU0sQ0FBQyxJQUFJO0FBR2hDLGVBQUssSUFBSSxtQkFBbUI7QUFDNUIsZ0JBQU0sU0FBUyxLQUFLLE9BQU87QUFDM0IsZUFBSyxlQUFlLEtBQUssd0JBQXdCLE1BQU0sRUFBRSxJQUFJLG1CQUFtQjtRQUNsRjtNQUNGO0lBQ0Y7RUFDRjs7Ozs7RUFNUSw0QkFBa0M7QUFDeENBLElBQUFBLE9BQUssc0JBQXNCLEtBQUssS0FBSyxXQUFXO0FBRWhELFFBQUksS0FBSyxPQUFPO0FBQ2RDLE1BQUFBLE9BQUssc0JBQXNCLEtBQUssTUFBTSxXQUFXO0lBQ25ELE9BQU87QUFDTEEsTUFBQUEsT0FBSyxLQUFLLEtBQUssMEJBQTBCO0FBQ3pDQSxNQUFBQSxPQUFLLGFBQWEsS0FBSyxLQUFLLFdBQVc7SUFDekM7QUFFQSxTQUFLLHdCQUF3QkQsT0FBSyxJQUFJQyxNQUFJLEVBQUUsT0FBTztFQUNyRDs7OztFQUtRLDBCQUF5QztBQUMvQyxXQUFPLEtBQUssVUFBVSxLQUFLLFFBQVEsY0FBYztFQUNuRDs7OztFQUtRLDBCQUF5QztBQUMvQyxXQUFPLEtBQUssVUFBVyxLQUFLLFFBQVEsU0FBUyxrQkFBMEMsVUFBVTtFQUNuRztBQUNGO0FJeFVPLFNBQVNFLDJCQUEwQixRQUF3QixVQUFrRDtBQUNsSCxRQUFNLFlBQThCLENBQUM7QUFFckMsTUFBSSxPQUE4QjtBQUNsQyxTQUFPLFNBQVMsTUFBTTtBQUNwQixjQUFVLFFBQVEsSUFBSTtBQUN0QixXQUFPLEtBQUs7RUFDZDtBQUVBLFlBQVUsUUFBUSxDQUFDLGFBQWE7QUFDOUIsYUFBUyxRQUFRO0VBQ25CLENBQUM7QUFDSDtBQ0xPLFNBQVMsa0NBQ2QsUUFDQSxVQUNNO0FBQ04sU0FBTyxTQUFTLFFBQVEsQ0FBQyxVQUFVO0FBQ2pDLFVBQU0sU0FBUyxTQUFTLEtBQUs7QUFDN0IsUUFBSSxDQUFDLFFBQVE7QUFDWCx3Q0FBa0MsT0FBTyxRQUFRO0lBQ25EO0VBQ0YsQ0FBQztBQUNIO0FDYk8sU0FBUyxxQkFBcUIsU0FBcUQ7QUFOMUYsTUFBQTtBQU9FLFFBQU0sa0JBQWtCLG9CQUFJLElBQTRCO0FBQ3hELGFBQVcsVUFBVSxTQUFTO0FBQzVCLFFBQUksVUFBaUM7QUFDckMsT0FBRztBQUNELFlBQU0sYUFBWSxLQUFBLGdCQUFnQixJQUFJLE9BQU8sTUFBM0IsT0FBQSxLQUFnQyxLQUFLO0FBQ3ZELFVBQUksYUFBYSxRQUFRLE1BQU07QUFDN0IsZUFBTztNQUNUO0FBQ0Esc0JBQWdCLElBQUksU0FBUyxRQUFRO0FBQ3JDLGdCQUFVLFFBQVE7SUFDcEIsU0FBUyxZQUFZO0VBQ3ZCO0FBQ0EsU0FBTztBQUNUO0FDWk8sSUFBTSx1QkFBTixNQUEyQjtFQWtEaEMsY0FBYztBQWpEZCxTQUFRLFVBQVUsb0JBQUksSUFBd0I7QUFDOUMsU0FBUSxnQkFBMkMsQ0FBQztBQUNwRCxTQUFRLCtCQUErQjtBQVN2QyxTQUFRLGFBQStCLENBQUM7QUFtQ3hDLFNBQVEsd0JBQXdCLG9CQUFJLElBQTZDO0FBQ2pGLFNBQVEsdUJBQXVCO0FBRzdCLFNBQUssMkJBQTJCLEtBQUsseUJBQXlCLEtBQUssSUFBSTtFQUN6RTtFQXRDQSxJQUFXLFNBQWtDO0FBQzNDLFdBQU8sS0FBSztFQUNkOzs7O0VBS0EsSUFBVyxjQUF1QztBQUNoRCxZQUFRLEtBQUssc0VBQXNFO0FBRW5GLFdBQU8sS0FBSztFQUNkO0VBRUEsSUFBVyxpQkFBK0M7QUFDeEQsVUFBTSxNQUFNLG9CQUFJLElBQWdDO0FBQ2hELFNBQUssUUFBUSxRQUFRLENBQUMsZUFBZTtBQUNuQyxpQkFBVyxlQUFlLFFBQVEsQ0FBQyxrQkFBa0I7QUFDbkQsWUFBSSxJQUFJLGFBQWE7TUFDdkIsQ0FBQztJQUNILENBQUM7QUFDRCxXQUFPLE1BQU0sS0FBSyxHQUFHO0VBQ3ZCO0VBRUEsSUFBVyxZQUFxQztBQUM5QyxVQUFNLE1BQU0sb0JBQUksSUFBMkI7QUFDM0MsU0FBSyxlQUFlLFFBQVEsQ0FBQyxrQkFBa0I7QUFDN0Msb0JBQWMsVUFBVSxRQUFRLENBQUMsYUFBYTtBQUM1QyxZQUFJLElBQUksUUFBUTtNQUNsQixDQUFDO0lBQ0gsQ0FBQztBQUNELFdBQU8sTUFBTSxLQUFLLEdBQUc7RUFDdkI7RUFTTyxTQUFTLE9BQWlDO0FBQy9DLFNBQUssUUFBUSxJQUFJLEtBQUs7QUFFdEIsUUFBSSxZQUFZLEtBQUssc0JBQXNCLElBQUksTUFBTSxJQUFJO0FBQ3pELFFBQUksYUFBYSxNQUFNO0FBQ3JCLGtCQUFZLG9CQUFJLElBQXdCO0FBQ3hDLFdBQUssc0JBQXNCLElBQUksTUFBTSxNQUFNLFNBQVM7SUFDdEQ7QUFDQSxjQUFVLElBQUksS0FBSztBQUVuQixTQUFLLHVCQUF1QjtFQUM5Qjs7OztFQUtPLGNBQWMsT0FBaUM7QUFDcEQsWUFBUSxLQUFLLDhFQUE4RTtBQUUzRixTQUFLLFNBQVMsS0FBSztFQUNyQjtFQUVPLFlBQVksT0FBaUM7QUFDbEQsU0FBSyxRQUFRLE9BQU8sS0FBSztBQUV6QixVQUFNLFlBQVksS0FBSyxzQkFBc0IsSUFBSSxNQUFNLElBQUk7QUFDM0QsY0FBVSxPQUFPLEtBQUs7QUFFdEIsU0FBSyx1QkFBdUI7RUFDOUI7Ozs7RUFLTyxpQkFBaUIsT0FBaUM7QUFDdkQsWUFBUSxLQUFLLG9GQUFvRjtBQUVqRyxTQUFLLFlBQVksS0FBSztFQUN4QjtFQUVPLGVBQXFCO0FBQzFCLFNBQUssWUFBWTtBQUVqQixhQUFTLElBQUksR0FBRyxJQUFJLEtBQUssY0FBYyxRQUFRLEtBQUs7QUFDbEQsWUFBTSxhQUFhLEtBQUssY0FBYyxDQUFDO0FBQ3ZDLGlCQUFXLEtBQUssYUFBYTtBQUM3QixpQkFBVyxLQUFLLGtCQUFrQixPQUFPLEtBQUs7QUFDOUMsaUJBQVcsYUFBYTtJQUMxQjtFQUNGO0VBRU8sUUFBYztBQUNuQixTQUFLLFlBQVk7QUFFakIsYUFBUyxJQUFJLEdBQUcsSUFBSSxLQUFLLGNBQWMsUUFBUSxLQUFLO0FBQ2xELFlBQU0sYUFBYSxLQUFLLGNBQWMsQ0FBQztBQUN2QyxpQkFBVyxLQUFLLGFBQWE7QUFDN0IsaUJBQVcsS0FBSyxrQkFBa0IsT0FBTyxLQUFLO0FBQzlDLGlCQUFXLE1BQU07SUFDbkI7RUFDRjtFQUVPLE9BQU8sT0FBcUI7QUFDakMsU0FBSyxZQUFZO0FBRWpCLGFBQVMsSUFBSSxHQUFHLElBQUksS0FBSyxXQUFXLFFBQVEsS0FBSztBQUMvQyxXQUFLLFdBQVcsQ0FBQyxFQUFFLGtCQUFrQixNQUFNLEdBQUcsS0FBSztJQUNyRDtBQUVBLGFBQVMsSUFBSSxHQUFHLElBQUksS0FBSyxjQUFjLFFBQVEsS0FBSztBQUVsRCxZQUFNLGFBQWEsS0FBSyxjQUFjLENBQUM7QUFDdkMsaUJBQVcsS0FBSyxhQUFhO0FBQzdCLGlCQUFXLEtBQUssa0JBQWtCLE9BQU8sS0FBSztBQUM5QyxpQkFBVyxPQUFPLEtBQUs7QUFJdkIsd0NBQWtDLFdBQVcsTUFBTSxLQUFLLHdCQUF3QjtJQUNsRjtFQUNGOzs7Ozs7O0VBUVEsY0FBYztBQUNwQixRQUFJLENBQUMsS0FBSyxzQkFBc0I7QUFDOUI7SUFDRjtBQUVBLFVBQU0sa0JBQTZDLENBQUM7QUFDcEQsVUFBTSxtQkFBbUIsb0JBQUksSUFBd0I7QUFDckQsVUFBTSxrQkFBa0Isb0JBQUksSUFBd0I7QUFDcEQsVUFBTSxZQUFZLG9CQUFJLElBQW9CO0FBRTFDLGVBQVcsY0FBYyxLQUFLLFNBQVM7QUFDckMsV0FBSyxpQkFBaUIsWUFBWSxrQkFBa0IsaUJBQWlCLGlCQUFpQixTQUFTO0lBQ2pHO0FBQ0EsU0FBSyxnQkFBZ0I7QUFFckIsVUFBTSxNQUFNLHFCQUFxQixTQUFTO0FBQzFDLFNBQUssYUFBYSxDQUFDO0FBQ25CLFFBQUksS0FBSztBQUNQLFdBQUssV0FBVyxLQUFLLEdBQUc7QUFDeEIsd0NBQWtDLEtBQUssQ0FBQyxXQUEyQjtBQXpLekUsWUFBQSxJQUFBO0FBMktRLGNBQUssTUFBQSxLQUFBLEtBQUssc0JBQXNCLElBQUksTUFBTSxNQUFyQyxPQUFBLFNBQUEsR0FBd0MsU0FBeEMsT0FBQSxLQUFnRCxLQUFLLEdBQUc7QUFDM0QsaUJBQU87UUFDVDtBQUNBLGFBQUssV0FBVyxLQUFLLE1BQU07QUFDM0IsZUFBTztNQUNULENBQUM7SUFDSDtBQUVBLFNBQUssdUJBQXVCO0VBQzlCO0VBRVEsaUJBQ04sWUFDQSxrQkFDQSxpQkFDQSxpQkFDQSxXQUNBO0FBQ0EsUUFBSSxnQkFBZ0IsSUFBSSxVQUFVLEdBQUc7QUFDbkM7SUFDRjtBQUVBLFFBQUksaUJBQWlCLElBQUksVUFBVSxHQUFHO0FBQ3BDLFVBQUksQ0FBQyxLQUFLLDhCQUE4QjtBQUN0QyxnQkFBUSxLQUFLLG9EQUFvRDtBQUNqRSxhQUFLLCtCQUErQjtNQUN0QztBQUNBO0lBQ0Y7QUFFQSxxQkFBaUIsSUFBSSxVQUFVO0FBRS9CLFVBQU0sYUFBYSxXQUFXO0FBQzlCLGVBQVcsYUFBYSxZQUFZO0FBQ2xDLFVBQUksd0JBQXdCO0FBQzVCLFVBQUksV0FBa0M7QUFDdEMsTUFBQUEsMkJBQTBCLFdBQVcsQ0FBQyxzQkFBc0I7QUFDMUQsY0FBTSxZQUFZLEtBQUssc0JBQXNCLElBQUksaUJBQWlCO0FBQ2xFLFlBQUksV0FBVztBQUNiLHFCQUFXLGlCQUFpQixXQUFXO0FBQ3JDLG9DQUF3QjtBQUN4QixpQkFBSyxpQkFBaUIsZUFBZSxrQkFBa0IsaUJBQWlCLGlCQUFpQixTQUFTO1VBQ3BHO1FBQ0YsV0FBVyxDQUFDLHVCQUF1QjtBQUVqQyxxQkFBVztRQUNiO01BQ0YsQ0FBQztBQUNELFVBQUksVUFBVTtBQUNaLGtCQUFVLElBQUksUUFBUTtNQUN4QjtJQUNGO0FBRUEsb0JBQWdCLEtBQUssVUFBVTtBQUUvQixvQkFBZ0IsSUFBSSxVQUFVO0VBQ2hDO0VBRVEseUJBQXlCLFFBQXdCO0FBck8zRCxRQUFBLElBQUE7QUF1T0ksVUFBSyxNQUFBLEtBQUEsS0FBSyxzQkFBc0IsSUFBSSxNQUFNLE1BQXJDLE9BQUEsU0FBQSxHQUF3QyxTQUF4QyxPQUFBLEtBQWdELEtBQUssR0FBRztBQUMzRCxhQUFPO0lBQ1Q7QUFHQSxXQUFPLGtCQUFrQixPQUFPLEtBQUs7QUFDckMsV0FBTztFQUNUO0FBQ0Y7QUo5TkEsSUFBTSxtQ0FBbUM7QUFLekMsSUFBTUMsMEJBQXlCLG9CQUFJLElBQUksQ0FBQyxPQUFPLFVBQVUsQ0FBQztBQUsxRCxJQUFNLDRDQUE0QyxvQkFBSSxJQUFJLENBQUMsS0FBSyxDQUFDO0FBRTFELElBQU0sNkJBQU4sTUFBTUMsNEJBQXNEO0VBMEJqRSxJQUFXLE9BQWU7QUFDeEIsV0FBT0EsNEJBQTBCO0VBQ25DO0VBRU8sWUFBWSxRQUFvQixTQUE0QztBQTNEckYsUUFBQTtBQTRESSxTQUFLLFNBQVM7QUFFZCxTQUFLLGtCQUFrQixXQUFBLE9BQUEsU0FBQSxRQUFTO0FBQ2hDLFNBQUsscUJBQXFCLFdBQUEsT0FBQSxTQUFBLFFBQVM7QUFDbkMsU0FBSyx3QkFBdUIsS0FBQSxXQUFBLE9BQUEsU0FBQSxRQUFTLHlCQUFULE9BQUEsS0FBaUM7RUFDL0Q7RUFFYSxVQUFVLE1BQTJCO0FBQUEsV0FBQUMsU0FBQSxNQUFBLE1BQUEsYUFBQTtBQUNoRCxXQUFLLFNBQVMsdUJBQXVCLE1BQU0sS0FBSyxRQUFRLElBQUk7SUFDOUQsQ0FBQTtFQUFBOzs7Ozs7O0VBUWMsUUFBUSxNQUFrRDtBQUFBLFdBQUFBLFNBQUEsTUFBQSxNQUFBLGFBQUE7QUFDdEUsWUFBTSxXQUFXLE1BQU0sS0FBSyxVQUFVLElBQUk7QUFDMUMsVUFBSSxZQUFZLE1BQU07QUFDcEIsZUFBTztNQUNUO0FBRUEsWUFBTSxXQUFXLE1BQU0sS0FBSyxVQUFVLElBQUk7QUFDMUMsVUFBSSxZQUFZLE1BQU07QUFDcEIsZUFBTztNQUNUO0FBRUEsYUFBTztJQUNULENBQUE7RUFBQTtFQUVjLFVBQVUsTUFBa0Q7QUFBQSxXQUFBQSxTQUFBLE1BQUEsTUFBQSxhQUFBO0FBM0Y1RSxVQUFBLElBQUEsSUFBQSxJQUFBLElBQUE7QUE0RkksWUFBTSxPQUFPLEtBQUssT0FBTztBQUd6QixZQUFNLHFCQUFtQixLQUFBLEtBQUssbUJBQUwsT0FBQSxTQUFBLEdBQXFCLFFBQVFELDRCQUEwQixjQUFBLE9BQW9CO0FBQ3BHLFVBQUksQ0FBQyxrQkFBa0I7QUFDckIsZUFBTztNQUNUO0FBRUEsWUFBTSxVQUFVLElBQUkscUJBQXFCO0FBRXpDLFlBQU0sYUFBK0IsTUFBTSxLQUFLLE9BQU8sZ0JBQWdCLE1BQU07QUFFN0UsWUFBTSxhQUFZLEtBQUEsS0FBSyxlQUFMLE9BQUEsU0FBQSxHQUFrQkEsNEJBQTBCLGNBQUE7QUFHOUQsVUFBSSxDQUFDLFdBQVc7QUFDZCxlQUFPO01BQ1Q7QUFFQSxZQUFNLGNBQWMsVUFBVTtBQUM5QixVQUFJLENBQUNELHdCQUF1QixJQUFJLFdBQVcsR0FBRztBQUM1QyxnQkFBUTtVQUNOLHNDQUFzQ0MsNEJBQTBCLGNBQWMsaUJBQWlCLFdBQVc7UUFDNUc7QUFDQSxlQUFPO01BQ1Q7QUFFQSxZQUFNLGFBQVksS0FBQSxVQUFVLGNBQVYsT0FBQSxTQUFBLEdBQXFCLElBQUksQ0FBQyxnQkFBZ0IsY0FBYztBQXZIOUUsWUFBQUUsS0FBQUMsS0FBQUMsS0FBQUMsS0FBQUMsS0FBQSxJQUFBLElBQUEsSUFBQSxJQUFBLElBQUEsSUFBQSxJQUFBLElBQUEsSUFBQTtBQXdITSxjQUFNLE9BQU8sV0FBVyxlQUFlLElBQUs7QUFHNUMsWUFBSSxRQUFRLE1BQU07QUFDaEIsa0JBQVE7WUFDTiw0Q0FBNEMsU0FBUywrQkFBK0IsZUFBZSxJQUFJO1VBQ3pHO0FBQ0EsaUJBQU87UUFDVDtBQUVBLGNBQU0sY0FBYyxlQUFlO0FBSW5DLGNBQU0sb0JBQ0pKLE1BQUEsZUFBZSxlQUFmLE9BQUEsU0FBQUEsSUFBNEIsZ0NBQUE7QUFFOUIsWUFBSSxLQUFLLHdCQUF3QixvQkFBb0IsTUFBTTtBQUN6RCxnQkFBTSx3QkFBd0IsaUJBQWlCO0FBQy9DLGNBQUksQ0FBQywwQ0FBMEMsSUFBSSxxQkFBcUIsR0FBRztBQUN6RSxvQkFBUTtjQUNOLHNDQUFzQyxnQ0FBZ0MsaUJBQWlCLHFCQUFxQix5QkFBeUJGLDRCQUEwQixjQUFjO1lBQy9LO1VBQ0YsT0FBTztBQUNMLGtCQUFNLGdCQUFnQixpQkFBaUI7QUFDdkMsZ0JBQUksY0FBYyxRQUFRO0FBQ3hCLHFCQUFPLEtBQUssc0JBQXNCLE1BQU07Z0JBQ3RDLFFBQVEsSUFBVSxpQkFBUSxFQUFFLFdBQVVHLE1BQUEsY0FBYyxPQUFPLFdBQXJCLE9BQUFBLE1BQStCLENBQUMsR0FBSyxHQUFLLENBQUcsQ0FBQztnQkFDcEYsU0FBUUMsTUFBQSxjQUFjLE9BQU8sV0FBckIsT0FBQUEsTUFBK0I7Z0JBQ3ZDLFNBQVFDLE1BQUEsY0FBYyxPQUFPLFdBQXJCLE9BQUFBLE1BQStCO2NBQ3pDLENBQUM7WUFDSCxXQUFXLGNBQWMsU0FBUztBQUNoQyxxQkFBTyxLQUFLLHVCQUF1QixNQUFNO2dCQUN2QyxRQUFRLElBQVUsaUJBQVEsRUFBRSxXQUFVQyxNQUFBLGNBQWMsUUFBUSxXQUF0QixPQUFBQSxNQUFnQyxDQUFDLEdBQUssR0FBSyxDQUFHLENBQUM7Z0JBQ3JGLFNBQVEsS0FBQSxjQUFjLFFBQVEsV0FBdEIsT0FBQSxLQUFnQztnQkFDeEMsTUFBTSxJQUFVLGlCQUFRLEVBQUUsV0FBVSxLQUFBLGNBQWMsUUFBUSxTQUF0QixPQUFBLEtBQThCLENBQUMsR0FBSyxHQUFLLENBQUcsQ0FBQztnQkFDakYsU0FBUSxLQUFBLGNBQWMsUUFBUSxXQUF0QixPQUFBLEtBQWdDO2NBQzFDLENBQUM7WUFDSCxXQUFXLGNBQWMsT0FBTztBQUM5QixxQkFBTyxLQUFLLHFCQUFxQixNQUFNO2dCQUNyQyxRQUFRLElBQVUsaUJBQVEsRUFBRSxXQUFVLEtBQUEsY0FBYyxNQUFNLFdBQXBCLE9BQUEsS0FBOEIsQ0FBQyxHQUFLLEdBQUssQ0FBRyxDQUFDO2dCQUNuRixRQUFRLElBQVUsaUJBQVEsRUFBRSxXQUFVLEtBQUEsY0FBYyxNQUFNLFdBQXBCLE9BQUEsS0FBOEIsQ0FBQyxHQUFLLEdBQUssQ0FBRyxDQUFDO2NBQ3JGLENBQUM7WUFDSDtVQUNGO1FBQ0Y7QUFFQSxZQUFJLFlBQVksUUFBUTtBQUN0QixpQkFBTyxLQUFLLHNCQUFzQixNQUFNO1lBQ3RDLFFBQVEsSUFBVSxpQkFBUSxFQUFFLFdBQVUsS0FBQSxZQUFZLE9BQU8sV0FBbkIsT0FBQSxLQUE2QixDQUFDLEdBQUssR0FBSyxDQUFHLENBQUM7WUFDbEYsU0FBUSxLQUFBLFlBQVksT0FBTyxXQUFuQixPQUFBLEtBQTZCO1lBQ3JDLFFBQVE7VUFDVixDQUFDO1FBQ0gsV0FBVyxZQUFZLFNBQVM7QUFDOUIsaUJBQU8sS0FBSyx1QkFBdUIsTUFBTTtZQUN2QyxRQUFRLElBQVUsaUJBQVEsRUFBRSxXQUFVLEtBQUEsWUFBWSxRQUFRLFdBQXBCLE9BQUEsS0FBOEIsQ0FBQyxHQUFLLEdBQUssQ0FBRyxDQUFDO1lBQ25GLFNBQVEsS0FBQSxZQUFZLFFBQVEsV0FBcEIsT0FBQSxLQUE4QjtZQUN0QyxNQUFNLElBQVUsaUJBQVEsRUFBRSxXQUFVLEtBQUEsWUFBWSxRQUFRLFNBQXBCLE9BQUEsS0FBNEIsQ0FBQyxHQUFLLEdBQUssQ0FBRyxDQUFDO1lBQy9FLFFBQVE7VUFDVixDQUFDO1FBQ0g7QUFFQSxjQUFNLElBQUksTUFBTSw0Q0FBNEMsU0FBUyxxQkFBcUI7TUFDNUYsQ0FBQTtBQUVBLFlBQU0sa0JBQWlCLEtBQUEsVUFBVSxtQkFBVixPQUFBLFNBQUEsR0FBMEI7UUFDL0MsQ0FBQyxxQkFBcUIsbUJBQStDO0FBMUwzRSxjQUFBSjtBQTJMUSxnQkFBTSxTQUFRQSxNQUFBLG9CQUFvQixjQUFwQixPQUFBQSxNQUFpQyxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWM7QUFDeEUsa0JBQU0sTUFBTSxhQUFBLE9BQUEsU0FBQSxVQUFZLFNBQUE7QUFFeEIsZ0JBQUksT0FBTyxNQUFNO0FBQ2Ysc0JBQVE7Z0JBQ04saURBQWlELGNBQWMsaUNBQWlDLFNBQVM7Y0FDM0c7QUFDQSxxQkFBTyxDQUFDO1lBQ1Y7QUFFQSxtQkFBTztVQUNULENBQUM7QUFFRCxpQkFBTztZQUNMLFdBQVc7WUFDWCxNQUFNLG9CQUFvQjtVQUM1QjtRQUNGO01BQUE7QUFHRixPQUFBLEtBQUEsVUFBVSxZQUFWLE9BQUEsU0FBQSxHQUFtQixRQUFRLENBQUMsY0FBYyxZQUFZO0FBL00xRCxZQUFBQTtBQWdOTSxjQUFNLGVBQWUsYUFBYTtBQUdsQyxjQUFNLDJCQUEwQkEsTUFBQSxhQUFhLG1CQUFiLE9BQUEsU0FBQUEsSUFBNkIsSUFBSSxDQUFDLG1CQUFtQjtBQUNuRixnQkFBTSxRQUFRLGtCQUFBLE9BQUEsU0FBQSxlQUFpQixjQUFBO0FBRS9CLGNBQUksU0FBUyxNQUFNO0FBQ2pCLGtCQUFNLElBQUk7Y0FDUiwwQ0FBMEMsT0FBTyxxQ0FBcUMsY0FBYztZQUN0RztVQUNGO0FBRUEsaUJBQU87UUFDVCxDQUFBO0FBRUEsY0FBTSxTQUFTLGFBQWEsVUFBVSxPQUFPLFdBQVcsYUFBYSxNQUFNLElBQUk7QUFFL0UsWUFBSTtBQUNKLHFCQUFhLFFBQVEsQ0FBQyxnQkFBZ0I7QUFDcEMsY0FBSSxpQkFBaUI7QUFFbkIsa0JBQU0sWUFBWSxnQkFBZ0I7QUFDbEMsa0JBQU0sT0FBTyxXQUFXLFNBQVM7QUFDakMsa0JBQU0sYUFBYSxZQUFZO0FBQy9CLGtCQUFNLFFBQVEsV0FBVyxVQUFVO0FBR25DLGtCQUFNLFVBQStDO2NBQ25ELFdBQVcsZ0JBQWdCO2NBQzNCLFdBQVcsZ0JBQWdCO2NBQzNCLGNBQWMsZ0JBQWdCO2NBQzlCLFdBQVcsZ0JBQWdCO2NBQzNCLFlBQ0UsZ0JBQWdCLGNBQWMsT0FDMUIsSUFBVSxpQkFBUSxFQUFFLFVBQVUsZ0JBQWdCLFVBQVUsSUFDeEQ7WUFDUjtBQUdBLGtCQUFNLFFBQVEsS0FBSyxhQUFhLE1BQU0sT0FBTyxTQUFTLHVCQUF1QjtBQUM3RSxnQkFBSSxRQUFRO0FBQ1Ysb0JBQU0sU0FBUztZQUNqQjtBQUVBLG9CQUFRLFNBQVMsS0FBSztVQUN4QjtBQUVBLDRCQUFrQjtRQUNwQixDQUFDO01BQ0gsQ0FBQTtBQUdBLGNBQVEsYUFBYTtBQUVyQixhQUFPO0lBQ1QsQ0FBQTtFQUFBO0VBRWMsVUFBVSxNQUFrRDtBQUFBLFdBQUFELFNBQUEsTUFBQSxNQUFBLGFBQUE7QUF6UTVFLFVBQUEsSUFBQSxJQUFBO0FBMFFJLFlBQU0sT0FBTyxLQUFLLE9BQU87QUFHekIsWUFBTSxjQUFZLEtBQUEsS0FBSyxtQkFBTCxPQUFBLFNBQUEsR0FBcUIsUUFBUSxLQUFBLE9BQVc7QUFDMUQsVUFBSSxDQUFDLFdBQVc7QUFDZCxlQUFPO01BQ1Q7QUFHQSxZQUFNLGFBQVksS0FBQSxLQUFLLGVBQUwsT0FBQSxTQUFBLEdBQWtCLEtBQUE7QUFDcEMsWUFBTSwyQkFBMkIsYUFBQSxPQUFBLFNBQUEsVUFBVztBQUM1QyxVQUFJLENBQUMsMEJBQTBCO0FBQzdCLGVBQU87TUFDVDtBQUVBLFlBQU0sbUJBQW1CLDRCQUFBLE9BQUEsU0FBQSx5QkFBMEI7QUFDbkQsVUFBSSxDQUFDLGtCQUFrQjtBQUNyQixlQUFPO01BQ1Q7QUFFQSxZQUFNLFVBQVUsSUFBSSxxQkFBcUI7QUFFekMsWUFBTSxhQUErQixNQUFNLEtBQUssT0FBTyxnQkFBZ0IsTUFBTTtBQUU3RSxZQUFNLGtCQUFpQixLQUFBLHlCQUF5QixtQkFBekIsT0FBQSxTQUFBLEdBQXlDO1FBQzlELENBQUMsd0JBQW9EO0FBblMzRCxjQUFBQztBQW9TUSxnQkFBTSxPQUFPLFdBQVcsb0JBQW9CLElBQUs7QUFDakQsZ0JBQU0sY0FBYUEsTUFBQSxvQkFBb0IsY0FBcEIsT0FBQUEsTUFBaUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsY0FBYztBQXJTbkcsZ0JBQUFBLEtBQUFDLEtBQUFDO0FBc1NVLGtCQUFNLFNBQVMsSUFBVSxpQkFBUSxHQUFLLEdBQUssQ0FBRztBQUM5QyxnQkFBSSxlQUFlLFFBQVE7QUFDekIscUJBQU87aUJBQ0xGLE1BQUEsZUFBZSxPQUFPLE1BQXRCLE9BQUFBLE1BQTJCO2lCQUMzQkMsTUFBQSxlQUFlLE9BQU8sTUFBdEIsT0FBQUEsTUFBMkI7Z0JBQzNCLGVBQWUsT0FBTyxJQUFJLENBQUMsZUFBZSxPQUFPLElBQUk7O2NBQ3ZEO1lBQ0Y7QUFFQSxtQkFBTyxLQUFLLHNCQUFzQixNQUFNO2NBQ3RDO2NBQ0EsU0FBUUMsTUFBQSxlQUFlLFdBQWYsT0FBQUEsTUFBeUI7Y0FDakMsUUFBUTtZQUNWLENBQUM7VUFDSCxDQUFDO0FBRUQsaUJBQU8sRUFBRSxVQUFVO1FBQ3JCO01BQUE7QUFJRiwwQkFBQSxPQUFBLFNBQUEsaUJBQWtCLFFBQVEsQ0FBQyxpQkFBaUIsZUFBZTtBQUN6RCxjQUFNLGNBQWMsZ0JBQWdCO0FBQ3BDLFlBQUksQ0FBQyxhQUFhO0FBQ2hCO1FBQ0Y7QUFFQSxvQkFBWSxRQUFRLENBQUMsY0FBYztBQWpVekMsY0FBQUYsS0FBQUMsS0FBQUMsS0FBQTtBQWtVUSxnQkFBTSxPQUFPLFdBQVcsU0FBUztBQUdqQyxnQkFBTSxhQUFhLElBQVUsaUJBQVE7QUFDckMsY0FBSSxnQkFBZ0IsWUFBWTtBQUM5Qix1QkFBVztlQUNURixNQUFBLGdCQUFnQixXQUFXLE1BQTNCLE9BQUFBLE1BQWdDO2VBQ2hDQyxNQUFBLGdCQUFnQixXQUFXLE1BQTNCLE9BQUFBLE1BQWdDO2VBQ2hDQyxNQUFBLGdCQUFnQixXQUFXLE1BQTNCLE9BQUFBLE1BQWdDO1lBQ2xDO1VBQ0YsT0FBTztBQUNMLHVCQUFXLElBQUksR0FBSyxJQUFNLENBQUc7VUFDL0I7QUFFQSxnQkFBTSxTQUFTLGdCQUFnQixVQUFVLE9BQU8sV0FBVyxnQkFBZ0IsTUFBTSxJQUFJO0FBRXJGLGdCQUFNLFVBQStDO1lBQ25ELFdBQVcsZ0JBQWdCO1lBQzNCLFdBQVcsZ0JBQWdCO1lBQzNCLGNBQWMsZ0JBQWdCO1lBQzlCLFdBQVcsZ0JBQWdCO1lBQzNCO1VBQ0Y7QUFHQSxnQkFBTSwyQkFBMEIsS0FBQSxnQkFBZ0IsbUJBQWhCLE9BQUEsU0FBQSxHQUFnQyxJQUFJLENBQUMsbUJBQW1CO0FBQ3RGLGtCQUFNLFFBQVEsa0JBQUEsT0FBQSxTQUFBLGVBQWlCLGNBQUE7QUFFL0IsZ0JBQUksU0FBUyxNQUFNO0FBQ2pCLG9CQUFNLElBQUk7Z0JBQ1IsMENBQTBDLFVBQVUscUNBQXFDLGNBQWM7Y0FDekc7WUFDRjtBQUVBLG1CQUFPO1VBQ1QsQ0FBQTtBQUdBLGVBQUssU0FBUyxDQUFDLFNBQVM7QUF4V2hDLGdCQUFBRjtBQXlXVSxrQkFBTSxTQUErQkEsTUFBQSxLQUFLLFNBQVMsQ0FBQyxNQUFmLE9BQUFBLE1BQW9CO0FBRXpELGtCQUFNLFFBQVEsS0FBSyxhQUFhLE1BQU0sT0FBTyxTQUFTLHVCQUF1QjtBQUM3RSxnQkFBSSxRQUFRO0FBQ1Ysb0JBQU0sU0FBUztZQUNqQjtBQUVBLG9CQUFRLFNBQVMsS0FBSztVQUN4QixDQUFDO1FBQ0gsQ0FBQztNQUNILENBQUE7QUFHQSxXQUFLLE1BQU0sa0JBQWtCO0FBQzdCLGNBQVEsYUFBYTtBQUVyQixhQUFPO0lBQ1QsQ0FBQTtFQUFBO0VBRVEsYUFDTixNQUNBLE9BQ0EsU0FDQSx5QkFDb0I7QUFDcEIsVUFBTSxhQUFhLElBQUksbUJBQW1CLE1BQU0sT0FBTyxTQUFTLHVCQUF1QjtBQUV2RixRQUFJLEtBQUssaUJBQWlCO0FBQ3hCLFlBQU0sU0FBUyxJQUFJLHlCQUF5QixVQUFVO0FBQ3RELFdBQUssZ0JBQWdCLElBQUksTUFBTTtBQUMvQixhQUFPLGNBQWMsS0FBSyxnQkFBZ0I7SUFDNUM7QUFFQSxXQUFPO0VBQ1Q7RUFFUSxzQkFDTixhQUNBLFFBS3VCO0FBQ3ZCLFVBQU0sUUFBUSxJQUFJLGlDQUFpQyxNQUFNO0FBRXpELFVBQU0sV0FBVyxJQUFJLHNCQUFzQixLQUFLO0FBRWhELGdCQUFZLElBQUksUUFBUTtBQUV4QixRQUFJLEtBQUssb0JBQW9CO0FBQzNCLFlBQU0sU0FBUyxJQUFJLDRCQUE0QixRQUFRO0FBQ3ZELFdBQUssbUJBQW1CLElBQUksTUFBTTtBQUNsQyxhQUFPLGNBQWMsS0FBSyxtQkFBbUI7SUFDL0M7QUFFQSxXQUFPO0VBQ1Q7RUFFUSx1QkFDTixhQUNBLFFBTXVCO0FBQ3ZCLFVBQU0sUUFBUSxJQUFJLGtDQUFrQyxNQUFNO0FBRTFELFVBQU0sV0FBVyxJQUFJLHNCQUFzQixLQUFLO0FBRWhELGdCQUFZLElBQUksUUFBUTtBQUV4QixRQUFJLEtBQUssb0JBQW9CO0FBQzNCLFlBQU0sU0FBUyxJQUFJLDRCQUE0QixRQUFRO0FBQ3ZELFdBQUssbUJBQW1CLElBQUksTUFBTTtBQUNsQyxhQUFPLGNBQWMsS0FBSyxtQkFBbUI7SUFDL0M7QUFFQSxXQUFPO0VBQ1Q7RUFFUSxxQkFDTixhQUNBLFFBSXVCO0FBQ3ZCLFVBQU0sUUFBUSxJQUFJLGdDQUFnQyxNQUFNO0FBRXhELFVBQU0sV0FBVyxJQUFJLHNCQUFzQixLQUFLO0FBRWhELGdCQUFZLElBQUksUUFBUTtBQUV4QixRQUFJLEtBQUssb0JBQW9CO0FBQzNCLFlBQU0sU0FBUyxJQUFJLDRCQUE0QixRQUFRO0FBQ3ZELFdBQUssbUJBQW1CLElBQUksTUFBTTtBQUNsQyxhQUFPLGNBQWMsS0FBSyxtQkFBbUI7SUFDL0M7QUFFQSxXQUFPO0VBQ1Q7QUFDRjtBQXBiYSwyQkFDWSxpQkFBaUI7QUFEbkMsSUFBTSw0QkFBTjs7O0FLVkEsSUFBTSxrQkFBTixNQUFrRDtBQUFBLEVBY3ZELElBQVcsT0FBZTtBQUN4QixXQUFPO0FBQUEsRUFDVDtBQUFBLEVBRU8sWUFBWSxRQUFvQixTQUFrQztBQXJDM0U7QUFzQ0ksU0FBSyxTQUFTO0FBRWQsVUFBTSxhQUFhLG1DQUFTO0FBQzVCLFVBQU0sdUJBQXVCLG1DQUFTO0FBRXRDLFNBQUssb0JBQW1CLHdDQUFTLHFCQUFULFlBQTZCLElBQUksMEJBQTBCLE1BQU07QUFDekYsU0FBSyxxQkFBb0Isd0NBQVMsc0JBQVQsWUFBOEIsSUFBSSwyQkFBMkIsTUFBTTtBQUM1RixTQUFLLGtCQUNILHdDQUFTLG1CQUFULFlBQ0EsSUFBSSx3QkFBd0IsUUFBUTtBQUFBLE1BQ2xDO0FBQUEsTUFDQTtBQUFBLElBQ0YsQ0FBQztBQUNILFNBQUssZ0JBQWUsd0NBQVMsaUJBQVQsWUFBeUIsSUFBSSxzQkFBc0IsUUFBUSxFQUFFLFdBQVcsQ0FBQztBQUM3RixTQUFLLGNBQWEsd0NBQVMsZUFBVCxZQUF1QixJQUFJLG9CQUFvQixNQUFNO0FBQ3ZFLFNBQUssdUJBQXNCLHdDQUFTLHdCQUFULFlBQWdDLElBQUksMEJBQTBCLE1BQU07QUFDL0YsU0FBSyx3Q0FDSCx3Q0FBUyx5Q0FBVCxZQUFpRCxJQUFJLDhDQUE4QyxNQUFNO0FBQzNHLFNBQUssMkJBQTBCLHdDQUFTLDRCQUFULFlBQW9DLElBQUksMkJBQTJCLE1BQU07QUFFeEcsU0FBSyxvQkFDSCx3Q0FBUyxxQkFBVCxZQUNBLElBQUksMEJBQTBCLFFBQVE7QUFBQSxNQUNwQyxvQkFBb0I7QUFBQSxNQUNwQixpQkFBaUI7QUFBQSxJQUNuQixDQUFDO0FBRUgsU0FBSyx3QkFDSCx3Q0FBUyx5QkFBVCxZQUFpQyxJQUFJLDhCQUE4QixRQUFRLEVBQUUsV0FBVyxDQUFDO0FBQUEsRUFDN0Y7QUFBQSxFQUVhLGFBQTRCO0FBQUE7QUFDdkMsWUFBTSxLQUFLLHdCQUF3QixXQUFXO0FBQzlDLFlBQU0sS0FBSyxvQkFBb0IsV0FBVztBQUFBLElBQzVDO0FBQUE7QUFBQSxFQUVhLFNBQVMsV0FBMEU7QUFBQTtBQUM5RixhQUFPLE1BQU0sS0FBSyxvQkFBb0IsU0FBUyxTQUFTO0FBQUEsSUFDMUQ7QUFBQTtBQUFBLEVBRU8sZ0JBQWdCLGVBQXFEO0FBQzFFLFVBQU0sWUFBWSxLQUFLLG9CQUFvQixnQkFBZ0IsYUFBYTtBQUN4RSxRQUFJLGFBQWEsTUFBTTtBQUNyQixhQUFPO0FBQUEsSUFDVDtBQUVBLFdBQU87QUFBQSxFQUNUO0FBQUEsRUFFYSxxQkFBcUIsZUFBdUIsZ0JBQXNEO0FBQUE7QUFDN0csWUFBTSxLQUFLLHFDQUFxQyxxQkFBcUIsZUFBZSxjQUFjO0FBQ2xHLFlBQU0sS0FBSyxvQkFBb0IscUJBQXFCLGVBQWUsY0FBYztBQUFBLElBQ25GO0FBQUE7QUFBQSxFQUVhLFVBQVUsTUFBMkI7QUFBQTtBQUNoRCxZQUFNLEtBQUssV0FBVyxVQUFVLElBQUk7QUFDcEMsWUFBTSxLQUFLLGVBQWUsVUFBVSxJQUFJO0FBQ3hDLFlBQU0sS0FBSyxpQkFBaUIsVUFBVSxJQUFJO0FBQzFDLFlBQU0sS0FBSyxhQUFhLFVBQVUsSUFBSTtBQUN0QyxZQUFNLEtBQUssa0JBQWtCLFVBQVUsSUFBSTtBQUMzQyxZQUFNLEtBQUssaUJBQWlCLFVBQVUsSUFBSTtBQUMxQyxZQUFNLEtBQUsscUJBQXFCLFVBQVUsSUFBSTtBQUM5QyxZQUFNLEtBQUssb0JBQW9CLFVBQVUsSUFBSTtBQUU3QyxZQUFNLE9BQU8sS0FBSyxTQUFTO0FBQzNCLFlBQU0sV0FBVyxLQUFLLFNBQVM7QUFJL0IsVUFBSSxRQUFRLFVBQVU7QUFDcEIsY0FBTSxNQUFNLElBQUksSUFBSTtBQUFBLFVBQ2xCLE9BQU8sS0FBSztBQUFBLFVBQ1osbUJBQW1CLEtBQUssU0FBUztBQUFBLFVBQ2pDLGFBQWEsS0FBSyxTQUFTO0FBQUEsVUFDM0I7QUFBQSxVQUNBLFFBQVEsS0FBSyxTQUFTO0FBQUEsVUFDdEI7QUFBQSxVQUNBLFdBQVcsS0FBSyxTQUFTO0FBQUEsVUFDekIsbUJBQW1CLEtBQUssU0FBUztBQUFBLFVBQ2pDLHVCQUF1QixLQUFLLFNBQVM7QUFBQSxRQUN2QyxDQUFDO0FBRUQsYUFBSyxTQUFTLE1BQU07QUFBQSxNQUN0QjtBQUFBLElBQ0Y7QUFBQTtBQUNGOzs7QUMzSEEsWUFBWUssYUFBVztBQU12QixTQUFTLGNBQWMsT0FBcUM7QUFDMUQsUUFBTSxTQUFTLG9CQUFJLElBQWdCO0FBRW5DLFFBQU0sU0FBUyxDQUFDLFFBQVE7QUFDdEIsUUFBSSxDQUFFLElBQVksUUFBUTtBQUN4QjtBQUFBLElBQ0Y7QUFFQSxVQUFNLE9BQU87QUFDYixXQUFPLElBQUksSUFBSTtBQUFBLEVBQ2pCLENBQUM7QUFFRCxTQUFPO0FBQ1Q7QUFFQSxTQUFTLGFBQ1Asb0JBQ0EsT0FDQSxzQkFDMEQ7QUFFMUQsTUFBSSxNQUFNLFNBQVMsR0FBRztBQUNwQixVQUFNLE9BQU8sTUFBTSxPQUFPLEVBQUUsS0FBSyxFQUFFO0FBQ25DLFFBQUksS0FBSyxXQUFXLEdBQUs7QUFDdkIsYUFBTyxtQkFBbUIsS0FBSyxLQUFLO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBRUEsUUFBTSxXQUFXLElBQUksYUFBYSxtQkFBbUIsQ0FBQyxFQUFFLFFBQVEsQ0FBQztBQUNqRSxNQUFJLFlBQVk7QUFFaEIsTUFBSSxzQkFBc0I7QUFDeEIsZ0JBQVk7QUFBQSxFQUNkLE9BQU87QUFDTCxlQUFXLFFBQVEsT0FBTztBQUN4QixtQkFBYSxLQUFLO0FBQUEsSUFDcEI7QUFBQSxFQUNGO0FBRUEsYUFBVyxRQUFRLE9BQU87QUFDeEIsVUFBTSxNQUFNLG1CQUFtQixLQUFLLEtBQUs7QUFDekMsVUFBTSxTQUFTLEtBQUssU0FBUztBQUU3QixhQUFTLElBQUksR0FBRyxJQUFJLElBQUksT0FBTyxLQUFLO0FBQ2xDLGVBQVMsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxJQUFJO0FBQ3JDLGVBQVMsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxJQUFJO0FBQ3JDLGVBQVMsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxJQUFJO0FBQUEsSUFDdkM7QUFBQSxFQUNGO0FBRUEsUUFBTSxlQUFlLElBQVUsd0JBQWdCLFVBQVUsQ0FBQztBQUMxRCxTQUFPO0FBQ1Q7QUFjTyxTQUFTLGNBQWMsS0FBb0I7QUF4RWxEO0FBeUVFLFFBQU0sU0FBUyxjQUFjLElBQUksS0FBSztBQUd0QyxRQUFNLHdCQUF3QixvQkFBSSxJQUFnQztBQUVsRSxRQUFNLGlCQUFnQixTQUFJLHNCQUFKLG1CQUF1QjtBQUM3QyxNQUFJLGlCQUFpQixNQUFNO0FBQ3pCLGVBQVcsQ0FBQyxnQkFBZ0IsVUFBVSxLQUFLLE9BQU8sUUFBUSxhQUFhLEdBQUc7QUFDeEUsWUFBTSxtQkFBbUIsb0JBQUksSUFBa0M7QUFDL0QsaUJBQVcsUUFBUSxXQUFXLE9BQU87QUFDbkMsWUFBSSxnQkFBZ0IsOEJBQThCO0FBQ2hELGNBQUksS0FBSyxXQUFXLEdBQUs7QUFDdkIsdUJBQVcsUUFBUSxLQUFLLFlBQVk7QUFDbEMsa0JBQUksaUJBQWlCLHNCQUFzQixJQUFJLElBQUk7QUFDbkQsa0JBQUksa0JBQWtCLE1BQU07QUFDMUIsaUNBQWlCLG9CQUFJLElBQUk7QUFDekIsc0NBQXNCLElBQUksTUFBTSxjQUFjO0FBQUEsY0FDaEQ7QUFFQSxrQkFBSSxVQUFVLGVBQWUsSUFBSSxjQUFjO0FBQy9DLGtCQUFJLFdBQVcsTUFBTTtBQUNuQiwwQkFBVSxvQkFBSSxJQUFJO0FBQ2xCLCtCQUFlLElBQUksZ0JBQWdCLE9BQU87QUFBQSxjQUM1QztBQUVBLHNCQUFRLElBQUksSUFBSTtBQUFBLFlBQ2xCO0FBQUEsVUFDRjtBQUNBLDJCQUFpQixJQUFJLElBQUk7QUFBQSxRQUMzQjtBQUFBLE1BQ0Y7QUFFQSxpQkFBVyxRQUFRLGtCQUFrQjtBQUNuQyxtQkFBVyxXQUFXLElBQUk7QUFBQSxNQUM1QjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBR0EsYUFBVyxRQUFRLFFBQVE7QUFDekIsVUFBTSxpQkFBaUIsc0JBQXNCLElBQUksSUFBSTtBQUNyRCxRQUFJLGtCQUFrQixNQUFNO0FBQzFCO0FBQUEsSUFDRjtBQUdBLFVBQU0sMEJBQTBCLEtBQUssU0FBUztBQUM5QyxTQUFLLFNBQVMsa0JBQWtCLENBQUM7QUFFakMsVUFBTSxXQUFXLEtBQUssU0FBUyxNQUFNO0FBQ3JDLFNBQUssV0FBVztBQUNoQixVQUFNLHVCQUF1QixTQUFTO0FBRXRDLFVBQU0sWUFBWSx3QkFBd0IsWUFBWTtBQUN0RCxVQUFNLFlBQVksd0JBQXdCLFVBQVU7QUFFcEQsVUFBTSxrQkFBa0QsQ0FBQztBQUN6RCxVQUFNLHdCQUEyRCxDQUFDO0FBQ2xFLFVBQU0sd0JBQTJELENBQUM7QUFFbEUsUUFBSSxhQUFhLFdBQVc7QUFDMUIsVUFBSSxXQUFXO0FBQ2Isd0JBQWdCLFdBQVcsQ0FBQztBQUFBLE1BQzlCO0FBQ0EsVUFBSSxXQUFXO0FBQ2Isd0JBQWdCLFNBQVMsQ0FBQztBQUFBLE1BQzVCO0FBRUEsVUFBSSxJQUFJO0FBQ1IsaUJBQVcsQ0FBQyxNQUFNLE9BQU8sS0FBSyxnQkFBZ0I7QUFDNUMsWUFBSSxXQUFXO0FBQ2IsMEJBQWdCLFNBQVMsQ0FBQyxJQUFJLGFBQWEsd0JBQXdCLFVBQVUsU0FBUyxvQkFBb0I7QUFBQSxRQUM1RztBQUNBLFlBQUksV0FBVztBQUNiLDBCQUFnQixPQUFPLENBQUMsSUFBSSxhQUFhLHdCQUF3QixRQUFRLFNBQVMsb0JBQW9CO0FBQUEsUUFDeEc7QUFFQSx1REFBZ0IsTUFBTTtBQUFBLFVBQ3BCLElBQUksNkJBQTZCO0FBQUEsWUFDL0IsT0FBTztBQUFBLFlBQ1AsUUFBUTtBQUFBLFlBQ1IsWUFBWSxDQUFDLElBQUk7QUFBQSxVQUNuQixDQUFDO0FBQUE7QUFHSCw4QkFBc0IsSUFBSSxJQUFJO0FBQzlCLDhCQUFzQixLQUFLLENBQUc7QUFFOUI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUVBLGFBQVMsa0JBQWtCO0FBQzNCLFNBQUssd0JBQXdCO0FBQzdCLFNBQUssd0JBQXdCO0FBQUEsRUFDL0I7QUFDRjs7O0FDektBLFlBQVlDLGFBQVc7QUFVaEIsU0FBUyxpQkFBaUIsTUFBNEI7QUFWN0Q7QUFXRSxRQUFNLGdCQUFnQixxQkFBcUIsSUFBSTtBQUkvQyxRQUFNLDJCQUEyQixvQkFBSSxJQUduQztBQUNGLGFBQVcsUUFBUSxlQUFlO0FBQ2hDLFVBQU0sV0FBVyxLQUFLO0FBRXRCLFVBQU0sZ0JBQWdCLFNBQVMsYUFBYSxXQUFXO0FBQ3ZELFVBQU0sZ0JBQWUsOEJBQXlCLElBQUksYUFBYSxNQUExQyxZQUErQyxvQkFBSSxJQUFJO0FBQzVFLDZCQUF5QixJQUFJLGVBQWUsWUFBWTtBQUV4RCxVQUFNLGlCQUFpQixTQUFTLGFBQWEsWUFBWTtBQUN6RCxVQUFNLGlCQUFpQixnQkFBZ0IsZUFBZSxjQUFjO0FBQ3BFLGlCQUFhLElBQUksZ0JBQWdCLGNBQWM7QUFBQSxFQUNqRDtBQUdBLFFBQU0sd0JBQXdCLG9CQUFJLElBQXVEO0FBQ3pGLGFBQVcsUUFBUSxlQUFlO0FBQ2hDLFVBQU0saUJBQWlCLGNBQWMsTUFBTSx3QkFBd0I7QUFDbkUsMEJBQXNCLElBQUksTUFBTSxjQUFjO0FBQUEsRUFDaEQ7QUFHQSxRQUFNLFNBQStGLENBQUM7QUFDdEcsYUFBVyxDQUFDLE1BQU0sY0FBYyxLQUFLLHVCQUF1QjtBQUMxRCxRQUFJLHNCQUFzQjtBQUMxQixlQUFXLGFBQWEsUUFBUTtBQUU5QixZQUFNLGNBQWMsMEJBQTBCLGdCQUFnQixVQUFVLGNBQWM7QUFHdEYsVUFBSSxhQUFhO0FBQ2YsOEJBQXNCO0FBQ3RCLGtCQUFVLE9BQU8sSUFBSSxJQUFJO0FBR3pCLG1CQUFXLENBQUMsTUFBTSxXQUFXLEtBQUssZ0JBQWdCO0FBQ2hELG9CQUFVLGVBQWUsSUFBSSxNQUFNLFdBQVc7QUFBQSxRQUNoRDtBQUVBO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFHQSxRQUFJLENBQUMscUJBQXFCO0FBQ3hCLGFBQU8sS0FBSyxFQUFFLGdCQUFnQixRQUFRLG9CQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO0FBQUEsSUFDekQ7QUFBQSxFQUNGO0FBUUEsUUFBTSxRQUFRLG9CQUFJLElBQXNFO0FBQ3hGLFFBQU0sc0JBQXNCLElBQUksc0JBQWdGO0FBQ2hILFFBQU0scUJBQXFCLElBQUksc0JBQXNDO0FBQ3JFLFFBQU0saUJBQWlCLElBQUksc0JBQWtDO0FBRTdELGFBQVcsU0FBUyxRQUFRO0FBQzFCLFVBQU0sRUFBRSxnQkFBZ0IsT0FBTyxJQUFJO0FBR25DLFVBQU0sV0FBVyxNQUFNLEtBQUssZUFBZSxLQUFLLENBQUM7QUFDakQsVUFBTSxrQkFBa0IsTUFBTSxLQUFLLGVBQWUsT0FBTyxDQUFDO0FBQzFELFVBQU0sY0FBYyxJQUFVLGlCQUFTLFVBQVUsZUFBZTtBQUNoRSxVQUFNLGNBQWMsbUJBQW1CLFlBQVksV0FBVztBQUc5RCxlQUFXLFFBQVEsUUFBUTtBQUN6QixZQUFNLGdCQUFnQixLQUFLLFNBQVMsYUFBYSxXQUFXO0FBQzVELFlBQU0sZUFBZSxvQkFBb0IsWUFBWSxhQUFhO0FBRWxFLFlBQU0sUUFBUSxLQUFLLFNBQVM7QUFDNUIsWUFBTSxXQUFXLE1BQU0sSUFBSSxDQUFDLFNBQVMsZUFBZSxZQUFZLElBQUksQ0FBQyxFQUFFLEtBQUssR0FBRztBQUUvRSxZQUFNLE1BQU0sR0FBRyxZQUFZLElBQUksV0FBVyxJQUFJLFFBQVE7QUFDdEQsVUFBSSxtQkFBbUIsTUFBTSxJQUFJLEdBQUc7QUFFcEMsVUFBSSxvQkFBb0IsTUFBTTtBQUM1QiwyQkFBbUIsY0FBYyxNQUFNO0FBQ3ZDLGdDQUF3QixrQkFBa0IsT0FBTyxRQUFRO0FBQ3pELGNBQU0sSUFBSSxLQUFLLGdCQUFnQjtBQUFBLE1BQ2pDO0FBRUEsV0FBSyxTQUFTLGFBQWEsYUFBYSxnQkFBZ0I7QUFBQSxJQUMxRDtBQUdBLGVBQVcsUUFBUSxRQUFRO0FBQ3pCLFdBQUssS0FBSyxhQUFhLElBQVUsZ0JBQVEsQ0FBQztBQUFBLElBQzVDO0FBQUEsRUFDRjtBQUNGO0FBS0EsU0FBUyxxQkFBcUIsT0FBK0M7QUFDM0UsUUFBTSxnQkFBZ0Isb0JBQUksSUFBdUI7QUFFakQsUUFBTSxTQUFTLENBQUMsUUFBUTtBQUN0QixRQUFJLENBQUUsSUFBWSxlQUFlO0FBQy9CO0FBQUEsSUFDRjtBQUVBLFVBQU0sY0FBYztBQUNwQixrQkFBYyxJQUFJLFdBQVc7QUFBQSxFQUMvQixDQUFDO0FBRUQsU0FBTztBQUNUO0FBUUEsU0FBUyxnQkFDUCxlQUNBLGdCQUNhO0FBQ2IsUUFBTSxjQUFjLG9CQUFJLElBQVk7QUFFcEMsV0FBUyxJQUFJLEdBQUcsSUFBSSxjQUFjLE9BQU8sS0FBSztBQUM1QyxhQUFTLElBQUksR0FBRyxJQUFJLGNBQWMsVUFBVSxLQUFLO0FBQy9DLFlBQU0sUUFBUSxjQUFjLGFBQWEsR0FBRyxDQUFDO0FBQzdDLFlBQU0sU0FBUyxlQUFlLGFBQWEsR0FBRyxDQUFDO0FBRS9DLFVBQUksV0FBVyxHQUFHO0FBQ2hCLG9CQUFZLElBQUksS0FBSztBQUFBLE1BQ3ZCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFFQSxTQUFPO0FBQ1Q7QUFRQSxTQUFTLGNBQ1AsTUFDQSwwQkFJZ0M7QUFDaEMsUUFBTSxpQkFBaUIsb0JBQUksSUFBK0I7QUFFMUQsUUFBTSxXQUFXLEtBQUs7QUFFdEIsUUFBTSxXQUFXLEtBQUs7QUFDdEIsUUFBTSxnQkFBZ0IsU0FBUyxhQUFhLFdBQVc7QUFDdkQsUUFBTSxpQkFBaUIsU0FBUyxhQUFhLFlBQVk7QUFDekQsUUFBTSxlQUFlLHlCQUF5QixJQUFJLGFBQWE7QUFDL0QsUUFBTSxpQkFBaUIsNkNBQWMsSUFBSTtBQUV6QyxNQUFJLENBQUMsZ0JBQWdCO0FBQ25CLFVBQU0sSUFBSTtBQUFBLE1BQ1I7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUVBLGFBQVcsU0FBUyxnQkFBZ0I7QUFDbEMsbUJBQWUsSUFBSSxTQUFTLE1BQU0sS0FBSyxHQUFHLFNBQVMsYUFBYSxLQUFLLENBQUM7QUFBQSxFQUN4RTtBQUVBLFNBQU87QUFDVDtBQVFBLFNBQVMsMEJBQ1AsU0FDQSxXQUNTO0FBQ1QsYUFBVyxDQUFDLE1BQU0sV0FBVyxLQUFLLFFBQVEsUUFBUSxHQUFHO0FBRW5ELFVBQU0sdUJBQXVCLFVBQVUsSUFBSSxJQUFJO0FBQy9DLFFBQUksd0JBQXdCLE1BQU07QUFDaEMsVUFBSSxDQUFDLGFBQWEsYUFBYSxvQkFBb0IsR0FBRztBQUNwRCxlQUFPO0FBQUEsTUFDVDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRUEsU0FBTztBQUNUO0FBU0EsU0FBUyx3QkFDUCxXQUNBLFVBQ0EsVUFDTTtBQUVOLFFBQU0sa0JBQWtCLG9CQUFJLElBQXdCO0FBQ3BELGFBQVcsUUFBUSxVQUFVO0FBQzNCLG9CQUFnQixJQUFJLE1BQU0sZ0JBQWdCLElBQUk7QUFBQSxFQUNoRDtBQUdBLFFBQU0sV0FBVyxvQkFBSSxJQUFvQjtBQUN6QyxhQUFXLENBQUMsR0FBRyxJQUFJLEtBQUssU0FBUyxRQUFRLEdBQUc7QUFDMUMsVUFBTSxXQUFXLGdCQUFnQixJQUFJLElBQUk7QUFDekMsYUFBUyxJQUFJLFVBQVUsQ0FBQztBQUFBLEVBQzFCO0FBR0EsV0FBUyxJQUFJLEdBQUcsSUFBSSxVQUFVLE9BQU8sS0FBSztBQUN4QyxhQUFTLElBQUksR0FBRyxJQUFJLFVBQVUsVUFBVSxLQUFLO0FBQzNDLFlBQU0sV0FBVyxVQUFVLGFBQWEsR0FBRyxDQUFDO0FBQzVDLFlBQU0sV0FBVyxTQUFTLElBQUksUUFBUTtBQUN0QyxnQkFBVSxhQUFhLEdBQUcsR0FBRyxRQUFRO0FBQUEsSUFDdkM7QUFBQSxFQUNGO0FBRUEsWUFBVSxjQUFjO0FBQzFCO0FBR0EsU0FBUyxhQUFhLEdBQWtCLEdBQWtCLFdBQW9CO0FBQzVFLGNBQVksYUFBYTtBQUN6QixNQUFJLEVBQUUsU0FBUyxVQUFVLEVBQUUsU0FBUyxRQUFRO0FBQzFDLFdBQU87QUFBQSxFQUNUO0FBRUEsV0FBUyxJQUFJLEdBQUcsS0FBSyxFQUFFLFNBQVMsUUFBUSxJQUFJLElBQUksS0FBSztBQUNuRCxVQUFNLFFBQVEsS0FBSyxJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztBQUNwRCxRQUFJLFFBQVEsV0FBVztBQUNyQixhQUFPO0FBQUEsSUFDVDtBQUFBLEVBQ0Y7QUFFQSxTQUFPO0FBQ1Q7QUFFQSxJQUFNLHdCQUFOLE1BQStCO0FBQUEsRUFBL0I7QUFDRSxTQUFRLGtCQUFrQixvQkFBSSxJQUFlO0FBQzdDLFNBQVEsU0FBUztBQUFBO0FBQUEsRUFFVixJQUFJLEtBQTRCO0FBQ3JDLFdBQU8sS0FBSyxnQkFBZ0IsSUFBSSxHQUFHO0FBQUEsRUFDckM7QUFBQSxFQUVPLFlBQVksS0FBZ0I7QUFDakMsUUFBSSxRQUFRLEtBQUssZ0JBQWdCLElBQUksR0FBRztBQUN4QyxRQUFJLFNBQVMsTUFBTTtBQUNqQixjQUFRLEtBQUs7QUFDYixXQUFLLGdCQUFnQixJQUFJLEtBQUssS0FBSztBQUNuQyxXQUFLO0FBQUEsSUFDUDtBQUVBLFdBQU87QUFBQSxFQUNUO0FBQ0Y7OztBQzVSQSxTQUFTLGdCQUFnQixVQUFnQztBQUN2RCxTQUFPLE9BQU8sUUFBUSxFQUFFLFFBQVEsQ0FBQyxVQUFVO0FBQ3pDLFFBQUksK0JBQU8sV0FBVztBQUNwQixZQUFNLFVBQVU7QUFDaEIsY0FBUSxRQUFRO0FBQUEsSUFDbEI7QUFBQSxFQUNGLENBQUM7QUFFRCxNQUFLLFNBQWlCLGtCQUFrQjtBQUN0QyxVQUFNLFdBQXdELFNBQWlCO0FBQy9FLFFBQUksVUFBVTtBQUNaLGFBQU8sT0FBTyxRQUFRLEVBQUUsUUFBUSxDQUFDLFlBQVk7QUFDM0MsY0FBTSxRQUFRLFFBQVE7QUFDdEIsWUFBSSwrQkFBTyxXQUFXO0FBQ3BCLGdCQUFNLFVBQVU7QUFDaEIsa0JBQVEsUUFBUTtBQUFBLFFBQ2xCO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0Y7QUFFQSxXQUFTLFFBQVE7QUFDbkI7QUFFQSxTQUFTLFFBQVEsVUFBZ0M7QUFDL0MsUUFBTSxXQUE4QyxTQUFpQjtBQUNyRSxNQUFJLFVBQVU7QUFDWixhQUFTLFFBQVE7QUFBQSxFQUNuQjtBQUVBLFFBQU0sV0FBd0MsU0FBaUI7QUFDL0QsTUFBSSxVQUFVO0FBQ1osYUFBUyxRQUFRO0FBQUEsRUFDbkI7QUFFQSxRQUFNLFdBQTJELFNBQWlCO0FBQ2xGLE1BQUksVUFBVTtBQUNaLFFBQUksTUFBTSxRQUFRLFFBQVEsR0FBRztBQUMzQixlQUFTLFFBQVEsQ0FBQ0MsY0FBNkIsZ0JBQWdCQSxTQUFRLENBQUM7QUFBQSxJQUMxRSxXQUFXLFVBQVU7QUFDbkIsc0JBQWdCLFFBQVE7QUFBQSxJQUMxQjtBQUFBLEVBQ0Y7QUFDRjtBQUVPLFNBQVMsWUFBWSxVQUFnQztBQUMxRCxXQUFTLFNBQVMsT0FBTztBQUMzQjs7O0FDbkRBLFlBQVlDLGFBQVc7QUFlaEIsU0FBUyx3QkFDZCxNQUNBLFNBYU07QUE5QlI7QUErQkUsVUFBUTtBQUFBLElBQ047QUFBQSxFQUNGO0FBRUEsUUFBTSw4QkFBNkIsd0NBQVMsK0JBQVQsWUFBdUM7QUFHMUUsUUFBTSxnQkFBcUMsQ0FBQztBQUU1QyxPQUFLLFNBQVMsQ0FBQyxRQUFRO0FBQ3JCLFFBQUksSUFBSSxTQUFTLGVBQWU7QUFDOUI7QUFBQSxJQUNGO0FBRUEsa0JBQWMsS0FBSyxHQUF3QjtBQUFBLEVBQzdDLENBQUM7QUFJRCxRQUFNLDZCQUdGLG9CQUFJLElBQUk7QUFHWixNQUFJLFdBQVc7QUFHZixhQUFXLFFBQVEsZUFBZTtBQUNoQyxVQUFNLFdBQVcsS0FBSztBQUN0QixVQUFNLFlBQVksU0FBUyxhQUFhLFdBQVc7QUFFbkQsUUFBSSwyQkFBMkIsSUFBSSxTQUFTLEdBQUc7QUFDN0M7QUFBQSxJQUNGO0FBRUEsVUFBTSxXQUFXLG9CQUFJLElBQW9CO0FBQ3pDLFVBQU0sV0FBVyxvQkFBSSxJQUFvQjtBQUd6QyxhQUFTLElBQUksR0FBRyxJQUFJLFVBQVUsT0FBTyxLQUFLO0FBQ3hDLGVBQVMsSUFBSSxHQUFHLElBQUksVUFBVSxVQUFVLEtBQUs7QUFDM0MsY0FBTSxXQUFXLFVBQVUsYUFBYSxHQUFHLENBQUM7QUFDNUMsWUFBSSxXQUFXLFNBQVMsSUFBSSxRQUFRO0FBR3BDLFlBQUksWUFBWSxNQUFNO0FBQ3BCLHFCQUFXLFNBQVM7QUFDcEIsbUJBQVMsSUFBSSxVQUFVLFFBQVE7QUFDL0IsbUJBQVMsSUFBSSxVQUFVLFFBQVE7QUFBQSxRQUNqQztBQUVBLGtCQUFVLGFBQWEsR0FBRyxHQUFHLFFBQVE7QUFBQSxNQUN2QztBQUFBLElBQ0Y7QUFHQSxjQUFVLGNBQWM7QUFHeEIsK0JBQTJCLElBQUksV0FBVyxRQUFRO0FBR2xELGVBQVcsS0FBSyxJQUFJLFVBQVUsU0FBUyxJQUFJO0FBQUEsRUFDN0M7QUFHQSxhQUFXLFFBQVEsZUFBZTtBQUNoQyxVQUFNLFdBQVcsS0FBSztBQUN0QixVQUFNLFlBQVksU0FBUyxhQUFhLFdBQVc7QUFDbkQsVUFBTSxXQUFXLDJCQUEyQixJQUFJLFNBQVM7QUFFekQsVUFBTSxRQUFzQixDQUFDO0FBQzdCLFVBQU0sZUFBZ0MsQ0FBQztBQUd2QyxVQUFNLFNBQVMsNkJBQTZCLFdBQVcsU0FBUztBQUVoRSxhQUFTLFdBQVcsR0FBRyxXQUFXLFFBQVEsWUFBWTtBQUNwRCxZQUFNLFlBQVcsY0FBUyxJQUFJLFFBQVEsTUFBckIsWUFBMEI7QUFFM0MsWUFBTSxLQUFLLEtBQUssU0FBUyxNQUFNLFFBQVEsQ0FBQztBQUN4QyxtQkFBYSxLQUFLLEtBQUssU0FBUyxhQUFhLFFBQVEsQ0FBQztBQUFBLElBQ3hEO0FBRUEsVUFBTSxXQUFXLElBQVUsaUJBQVMsT0FBTyxZQUFZO0FBQ3ZELFNBQUssS0FBSyxVQUFVLElBQVUsZ0JBQVEsQ0FBQztBQUFBLEVBR3pDO0FBQ0Y7OztBQ3pIQSxZQUFZQyxhQUFXO0FBQ3ZCLFNBQVMsbUJBQUFDLHdCQUF1QjtBQVl6QixTQUFTLDBCQUEwQixNQUE0QjtBQUNwRSxRQUFNLGNBQWMsb0JBQUksSUFBZ0Q7QUFHeEUsT0FBSyxTQUFTLENBQUMsUUFBUTtBQWpCekI7QUFrQkksUUFBSSxDQUFFLElBQVksUUFBUTtBQUN4QjtBQUFBLElBQ0Y7QUFFQSxVQUFNLE9BQU87QUFDYixVQUFNLFdBQVcsS0FBSztBQUd0QixVQUFNLGdCQUFnQixTQUFTO0FBQy9CLFFBQUksaUJBQWlCLE1BQU07QUFDekI7QUFBQSxJQUNGO0FBR0EsVUFBTSw0QkFBNEIsWUFBWSxJQUFJLFFBQVE7QUFDMUQsUUFBSSw2QkFBNkIsTUFBTTtBQUNyQyxXQUFLLFdBQVc7QUFDaEI7QUFBQSxJQUNGO0FBR0EsVUFBTSxjQUFjLE9BQU8sT0FBTyxTQUFTLFVBQVUsRUFBRSxDQUFDLEVBQUU7QUFDMUQsVUFBTSxjQUFjLElBQUksTUFBTSxXQUFXO0FBQ3pDLFFBQUksZUFBZTtBQUVuQixVQUFNLHFCQUFxQixjQUFjO0FBQ3pDLGFBQVMsSUFBSSxHQUFHLElBQUksbUJBQW1CLFFBQVEsS0FBSztBQUNsRCxZQUFNLFFBQVEsbUJBQW1CLENBQUM7QUFDbEMsVUFBSSxDQUFDLFlBQVksS0FBSyxHQUFHO0FBQ3ZCLG9CQUFZLEtBQUssSUFBSTtBQUNyQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBR0EsUUFBSSxpQkFBaUIsYUFBYTtBQUNoQztBQUFBLElBQ0Y7QUFHQSxVQUFNLDJCQUFxQyxDQUFDO0FBRzVDLFVBQU0sMkJBQXFDLENBQUM7QUFHNUMsUUFBSSxZQUFZO0FBQ2hCLGFBQVMsSUFBSSxHQUFHLElBQUksWUFBWSxRQUFRLEtBQUs7QUFDM0MsVUFBSSxZQUFZLENBQUMsR0FBRztBQUNsQixjQUFNLFdBQVc7QUFDakIsaUNBQXlCLENBQUMsSUFBSTtBQUM5QixpQ0FBeUIsUUFBUSxJQUFJO0FBQUEsTUFDdkM7QUFBQSxJQUNGO0FBRUEsVUFBTSxjQUFjLElBQVUsdUJBQWU7QUFJN0MsZ0JBQVksT0FBTyxTQUFTO0FBRTVCLGdCQUFZLHVCQUF1QixTQUFTO0FBRTVDLGFBQVMsT0FBTyxRQUFRLENBQUMsVUFBVTtBQUNqQyxrQkFBWSxTQUFTLE1BQU0sT0FBTyxNQUFNLE9BQU8sTUFBTSxhQUFhO0FBQUEsSUFDcEUsQ0FBQztBQUVELGdCQUFZLGVBQWMsb0JBQVMsZ0JBQVQsbUJBQXNCLFlBQXRCLFlBQWlDO0FBQzNELGdCQUFZLGtCQUFpQixvQkFBUyxtQkFBVCxtQkFBeUIsWUFBekIsWUFBb0M7QUFFakUsZ0JBQVksYUFBYSxTQUFTLFVBQVUsT0FBTyxTQUFTLFVBQVUsS0FBSztBQUUzRSxnQkFBWSxXQUFXLFNBQVM7QUFHaEMsZ0JBQVksSUFBSSxVQUFVLFdBQVc7QUFHckM7QUFDRSxZQUFNQyxzQkFBcUIsY0FBYztBQUN6QyxZQUFNLGdCQUFnQixJQUFLQSxvQkFBbUIsWUFBb0JBLG9CQUFtQixNQUFNO0FBRTNGLGVBQVMsSUFBSSxHQUFHLElBQUlBLG9CQUFtQixRQUFRLEtBQUs7QUFDbEQsY0FBTUMsaUJBQWdCRCxvQkFBbUIsQ0FBQztBQUUxQyxjQUFNLFdBQVcseUJBQXlCQyxjQUFhO0FBQ3ZELHNCQUFjLENBQUMsSUFBSTtBQUFBLE1BQ3JCO0FBRUEsa0JBQVksU0FBUyxJQUFJRixpQkFBZ0IsZUFBZSxHQUFHLEtBQUssQ0FBQztBQUFBLElBQ25FO0FBR0EsV0FBTyxLQUFLLFNBQVMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxrQkFBa0I7QUFDMUQsWUFBTSxvQkFBb0IsU0FBUyxXQUFXLGFBQWE7QUFFM0QsVUFBSyxrQkFBMEIsOEJBQThCO0FBQzNELGNBQU0sSUFBSSxNQUFNLHdFQUF3RTtBQUFBLE1BQzFGO0FBRUEsWUFBTSx5QkFBeUIsa0JBQWtCO0FBQ2pELFlBQU0sRUFBRSxVQUFVLFdBQVcsSUFBSTtBQUVqQyxZQUFNLG9CQUFvQixJQUFLLHVCQUF1QjtBQUFBLFFBQ3BELHlCQUF5QixTQUFTO0FBQUEsTUFDcEM7QUFFQSwrQkFBeUIsUUFBUSxDQUFDRSxnQkFBZSxNQUFNO0FBQ3JELGlCQUFTLElBQUksR0FBRyxJQUFJLFVBQVUsS0FBSztBQUNqQyw0QkFBa0IsSUFBSSxXQUFXLENBQUMsSUFBSSx1QkFBdUJBLGlCQUFnQixXQUFXLENBQUM7QUFBQSxRQUMzRjtBQUFBLE1BQ0YsQ0FBQztBQUVELGtCQUFZLGFBQWEsZUFBZSxJQUFJRixpQkFBZ0IsbUJBQW1CLFVBQVUsVUFBVSxDQUFDO0FBQUEsSUFDdEcsQ0FBQztBQUlELFFBQUksY0FBYztBQUVsQixXQUFPLEtBQUssU0FBUyxlQUFlLEVBQUUsUUFBUSxDQUFDLGtCQUFrQjtBQUMvRCxrQkFBWSxnQkFBZ0IsYUFBYSxJQUFJLENBQUM7QUFFOUMsWUFBTSxTQUFTLFNBQVMsZ0JBQWdCLGFBQWE7QUFDckQsZUFBUyxTQUFTLEdBQUcsU0FBUyxPQUFPLFFBQVEsVUFBVTtBQUNyRCxjQUFNLG9CQUFvQixPQUFPLE1BQU07QUFFdkMsWUFBSyxrQkFBMEIsOEJBQThCO0FBQzNELGdCQUFNLElBQUksTUFBTSx3RUFBd0U7QUFBQSxRQUMxRjtBQUVBLGNBQU0seUJBQXlCLGtCQUFrQjtBQUNqRCxjQUFNLEVBQUUsVUFBVSxXQUFXLElBQUk7QUFFakMsY0FBTSxvQkFBb0IsSUFBSyx1QkFBdUI7QUFBQSxVQUNwRCx5QkFBeUIsU0FBUztBQUFBLFFBQ3BDO0FBRUEsaUNBQXlCLFFBQVEsQ0FBQ0UsZ0JBQWUsTUFBTTtBQUNyRCxtQkFBUyxJQUFJLEdBQUcsSUFBSSxVQUFVLEtBQUs7QUFDakMsOEJBQWtCLElBQUksV0FBVyxDQUFDLElBQUksdUJBQXVCQSxpQkFBZ0IsV0FBVyxDQUFDO0FBQUEsVUFDM0Y7QUFBQSxRQUNGLENBQUM7QUFFRCxzQkFBYyxlQUFlLGtCQUFrQixNQUFNLENBQUMsTUFBYyxNQUFNLENBQUM7QUFFM0Usb0JBQVksZ0JBQWdCLGFBQWEsRUFBRSxNQUFNLElBQUksSUFBSUY7QUFBQSxVQUN2RDtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFHRCxRQUFJLGFBQWE7QUFDZixrQkFBWSxrQkFBa0IsQ0FBQztBQUFBLElBQ2pDO0FBRUEsU0FBSyxXQUFXO0FBQUEsRUFDbEIsQ0FBQztBQUVELFFBQU0sS0FBSyxZQUFZLEtBQUssQ0FBQyxFQUFFLFFBQVEsQ0FBQyxxQkFBcUI7QUFDM0QscUJBQWlCLFFBQVE7QUFBQSxFQUMzQixDQUFDO0FBQ0g7OztBQ2hMTyxTQUFTLFdBQVcsS0FBZ0I7QUFQM0M7QUFRRSxRQUFJLFNBQUksU0FBSixtQkFBVSxpQkFBZ0IsS0FBSztBQUNqQyxRQUFJLE1BQU0sU0FBUyxJQUFJLEtBQUs7QUFBQSxFQUM5QjtBQUNGOzs7QUNKTyxJQUFNLFdBQU4sTUFBZTtBQUFBLEVBQ1osY0FBYztBQUFBLEVBRXRCO0FBUUY7QUFYYSxTQUtHLGdCQUFnQjtBQUxuQixTQU1HLG1CQUFtQjtBQU50QixTQU9HLGNBQWM7QUFQakIsU0FRRywwQkFBMEI7QUFSN0IsU0FTRyw0QkFBNEI7QUFUL0IsU0FVRyxhQUFhOyIsCiAgIm5hbWVzIjogWyJUSFJFRSIsICJfX2FzeW5jIiwgIl9WUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvckJpbmQiLCAiX1ZSTUV4cHJlc3Npb25UZXh0dXJlVHJhbnNmb3JtQmluZCIsICJfYSIsICJfVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbiIsICJfYiIsICJfVlJNRmlyc3RQZXJzb24iLCAiUE9TU0lCTEVfU1BFQ19WRVJTSU9OUyIsICJfdjNBIiwgIl9xdWF0QSIsICJfdjNCIiwgIl9xdWF0QiIsICJfVlJNTG9va0F0IiwgIlZFQzNfUE9TSVRJVkVfWiIsICJfZXVsZXJBIiwgIlRIUkVFIiwgIl9fYXN5bmMiLCAibXRvb25fZGVmYXVsdCIsICJQT1NTSUJMRV9TUEVDX1ZFUlNJT05TIiwgIl9NVG9vbk1hdGVyaWFsTG9hZGVyUGx1Z2luIiwgIl9WUk1NYXRlcmlhbHNIRFJFbWlzc2l2ZU11bHRpcGxpZXJMb2FkZXJQbHVnaW4iLCAiX19hc3luYyIsICJUSFJFRSIsICJfX2FzeW5jIiwgIl9hIiwgIl9fc3ByZWFkVmFsdWVzIiwgIlRIUkVFIiwgIl92M0EiLCAiX3YzQiIsICJxdWF0SW52ZXJ0Q29tcGF0IiwgIl92M0MiLCAiX3F1YXRBIiwgIl9xdWF0QiIsICJfcXVhdEMiLCAiY29uc3RyYWludCIsICJQT1NTSUJMRV9TUEVDX1ZFUlNJT05TIiwgIl9WUk1Ob2RlQ29uc3RyYWludExvYWRlclBsdWdpbiIsICJfX2FzeW5jIiwgIl9hIiwgIlRIUkVFIiwgIl92M0EiLCAiX3YzQiIsICJfbWF0QSIsICJ0cmF2ZXJzZUFuY2VzdG9yc0Zyb21Sb290IiwgIlBPU1NJQkxFX1NQRUNfVkVSU0lPTlMiLCAiX1ZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW4iLCAiX19hc3luYyIsICJfYSIsICJfYiIsICJfYyIsICJfZCIsICJfZSIsICJUSFJFRSIsICJUSFJFRSIsICJtYXRlcmlhbCIsICJUSFJFRSIsICJUSFJFRSIsICJCdWZmZXJBdHRyaWJ1dGUiLCAib3JpZ2luYWxJbmRleEFycmF5IiwgIm9yaWdpbmFsSW5kZXgiXQp9Cg==
