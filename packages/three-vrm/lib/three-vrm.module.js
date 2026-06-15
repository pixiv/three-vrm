/*!
 * @pixiv/three-vrm v3.5.4
 * VRM file loader for three.js.
 *
 * Copyright (c) 2019-2026 pixiv Inc.
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
import * as THREE27 from "three";

// src/utils/attributeGetComponentCompat.ts
import * as THREE25 from "three";
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
import * as THREE26 from "three";
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
import * as THREE28 from "three";
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
import * as THREE29 from "three";
import { BufferAttribute as BufferAttribute9 } from "three";
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
  newGeometry.setIndex(new BufferAttribute9(newIndexArray, originalIndex.itemSize, originalIndex.normalized));
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
    newGeometry.setAttribute(attributeName, new BufferAttribute9(newAttributeArray, itemSize, normalized));
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
    newMorphAttributes[attributeName][morphIndex] = new BufferAttribute9(newAttributeArray, itemSize, normalized);
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
 * @pixiv/three-vrm-core v3.5.4
 * The implementation of core features of VRM, for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2026 pixiv Inc.
 * @pixiv/three-vrm-core is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
/*!
 * @pixiv/three-vrm-materials-mtoon v3.5.4
 * MToon (toon material) module for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2026 pixiv Inc.
 * @pixiv/three-vrm-materials-mtoon is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
/*!
 * @pixiv/three-vrm-materials-hdr-emissive-multiplier v3.5.4
 * Support VRMC_hdr_emissiveMultiplier for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2026 pixiv Inc.
 * @pixiv/three-vrm-materials-hdr-emissive-multiplier is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
/*!
 * @pixiv/three-vrm-materials-v0compat v3.5.4
 * VRM0.0 materials compatibility layer plugin for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2026 pixiv Inc.
 * @pixiv/three-vrm-materials-v0compat is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
/*!
 * @pixiv/three-vrm-node-constraint v3.5.4
 * Node constraint module for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2026 pixiv Inc.
 * @pixiv/three-vrm-node-constraint is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
/*!
 * @pixiv/three-vrm-springbone v3.5.4
 * Spring bone module for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2026 pixiv Inc.
 * @pixiv/three-vrm-springbone is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL2V4cHJlc3Npb25zL1ZSTUV4cHJlc3Npb24udHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL2V4cHJlc3Npb25zL1ZSTUV4cHJlc3Npb25Mb2FkZXJQbHVnaW4udHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL3V0aWxzL2dsdGZFeHRyYWN0UHJpbWl0aXZlc0Zyb21Ob2RlLnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9leHByZXNzaW9ucy9WUk1FeHByZXNzaW9uUHJlc2V0TmFtZS50cyIsICIuLi8uLi90aHJlZS12cm0tY29yZS9zcmMvdXRpbHMvc2F0dXJhdGUudHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL2V4cHJlc3Npb25zL1ZSTUV4cHJlc3Npb25NYW5hZ2VyLnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9leHByZXNzaW9ucy9WUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGUudHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL2V4cHJlc3Npb25zL1ZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yQmluZC50cyIsICIuLi8uLi90aHJlZS12cm0tY29yZS9zcmMvZXhwcmVzc2lvbnMvVlJNRXhwcmVzc2lvbk1vcnBoVGFyZ2V0QmluZC50cyIsICIuLi8uLi90aHJlZS12cm0tY29yZS9zcmMvZXhwcmVzc2lvbnMvVlJNRXhwcmVzc2lvblRleHR1cmVUcmFuc2Zvcm1CaW5kLnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9leHByZXNzaW9ucy9WUk1FeHByZXNzaW9uT3ZlcnJpZGVUeXBlLnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9maXJzdFBlcnNvbi9WUk1GaXJzdFBlcnNvbi50cyIsICIuLi8uLi90aHJlZS12cm0tY29yZS9zcmMvZmlyc3RQZXJzb24vVlJNRmlyc3RQZXJzb25Mb2FkZXJQbHVnaW4udHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL2ZpcnN0UGVyc29uL1ZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb25UeXBlLnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9odW1hbm9pZC9oZWxwZXJzL1ZSTUh1bWFub2lkSGVscGVyLnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9odW1hbm9pZC9WUk1IdW1hbkJvbmVMaXN0LnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9odW1hbm9pZC9WUk1IdW1hbkJvbmVOYW1lLnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9odW1hbm9pZC9WUk1IdW1hbkJvbmVQYXJlbnRNYXAudHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL2h1bWFub2lkL1ZSTVJpZy50cyIsICIuLi8uLi90aHJlZS12cm0tY29yZS9zcmMvdXRpbHMvcXVhdEludmVydENvbXBhdC50cyIsICIuLi8uLi90aHJlZS12cm0tY29yZS9zcmMvaHVtYW5vaWQvVlJNSHVtYW5vaWRSaWcudHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL2h1bWFub2lkL1ZSTUh1bWFub2lkLnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9odW1hbm9pZC9WUk1SZXF1aXJlZEh1bWFuQm9uZU5hbWUudHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL2h1bWFub2lkL1ZSTUh1bWFub2lkTG9hZGVyUGx1Z2luLnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9sb29rQXQvaGVscGVycy9WUk1Mb29rQXRIZWxwZXIudHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL2xvb2tBdC9oZWxwZXJzL3V0aWxzL0ZhbkJ1ZmZlckdlb21ldHJ5LnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9sb29rQXQvaGVscGVycy91dGlscy9MaW5lQW5kU3BoZXJlQnVmZmVyR2VvbWV0cnkudHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL2xvb2tBdC9WUk1Mb29rQXQudHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL3V0aWxzL2dldFdvcmxkUXVhdGVybmlvbkxpdGUudHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL2xvb2tBdC91dGlscy9jYWxjQXppbXV0aEFsdGl0dWRlLnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9sb29rQXQvdXRpbHMvc2FuaXRpemVBbmdsZS50cyIsICIuLi8uLi90aHJlZS12cm0tY29yZS9zcmMvbG9va0F0L1ZSTUxvb2tBdEJvbmVBcHBsaWVyLnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9sb29rQXQvVlJNTG9va0F0RXhwcmVzc2lvbkFwcGxpZXIudHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL2xvb2tBdC9WUk1Mb29rQXRSYW5nZU1hcC50cyIsICIuLi8uLi90aHJlZS12cm0tY29yZS9zcmMvbG9va0F0L1ZSTUxvb2tBdExvYWRlclBsdWdpbi50cyIsICIuLi8uLi90aHJlZS12cm0tY29yZS9zcmMvbG9va0F0L1ZSTUxvb2tBdFR5cGVOYW1lLnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9tZXRhL1ZSTU1ldGFMb2FkZXJQbHVnaW4udHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL3V0aWxzL3Jlc29sdmVVUkwudHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL1ZSTUNvcmUudHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL1ZSTUNvcmVMb2FkZXJQbHVnaW4udHMiLCAiLi4vc3JjL1ZSTS50cyIsICIuLi8uLi90aHJlZS12cm0tbWF0ZXJpYWxzLW10b29uL3NyYy9NVG9vbk1hdGVyaWFsTG9hZGVyUGx1Z2luLnRzIiwgIi4uLy4uL3RocmVlLXZybS1tYXRlcmlhbHMtbXRvb24vc3JjL0dMVEZNVG9vbk1hdGVyaWFsUGFyYW1zQXNzaWduSGVscGVyLnRzIiwgIi4uLy4uL3RocmVlLXZybS1tYXRlcmlhbHMtbXRvb24vc3JjL3V0aWxzL3NldFRleHR1cmVDb2xvclNwYWNlLnRzIiwgIi4uLy4uL3RocmVlLXZybS1tYXRlcmlhbHMtbXRvb24vc3JjL01Ub29uTWF0ZXJpYWwudHMiLCAiLi4vLi4vdGhyZWUtdnJtLW1hdGVyaWFscy1tdG9vbi9zcmMvc2hhZGVycy9tdG9vbi52ZXJ0IiwgIi4uLy4uL3RocmVlLXZybS1tYXRlcmlhbHMtbXRvb24vc3JjL3NoYWRlcnMvbXRvb24uZnJhZyIsICIuLi8uLi90aHJlZS12cm0tbWF0ZXJpYWxzLW10b29uL3NyYy9NVG9vbk1hdGVyaWFsRGVidWdNb2RlLnRzIiwgIi4uLy4uL3RocmVlLXZybS1tYXRlcmlhbHMtbXRvb24vc3JjL01Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlLnRzIiwgIi4uLy4uL3RocmVlLXZybS1tYXRlcmlhbHMtbXRvb24vc3JjL3V0aWxzL2dldFRleHR1cmVDb2xvclNwYWNlLnRzIiwgIi4uLy4uL3RocmVlLXZybS1tYXRlcmlhbHMtaGRyLWVtaXNzaXZlLW11bHRpcGxpZXIvc3JjL1ZSTU1hdGVyaWFsc0hEUkVtaXNzaXZlTXVsdGlwbGllckxvYWRlclBsdWdpbi50cyIsICIuLi8uLi90aHJlZS12cm0tbWF0ZXJpYWxzLXYwY29tcGF0L3NyYy9WUk1NYXRlcmlhbHNWMENvbXBhdFBsdWdpbi50cyIsICIuLi8uLi90aHJlZS12cm0tbWF0ZXJpYWxzLXYwY29tcGF0L3NyYy91dGlscy9nYW1tYUVPVEYudHMiLCAiLi4vLi4vdGhyZWUtdnJtLW5vZGUtY29uc3RyYWludC9zcmMvaGVscGVycy9WUk1Ob2RlQ29uc3RyYWludEhlbHBlci50cyIsICIuLi8uLi90aHJlZS12cm0tbm9kZS1jb25zdHJhaW50L3NyYy9WUk1BaW1Db25zdHJhaW50LnRzIiwgIi4uLy4uL3RocmVlLXZybS1ub2RlLWNvbnN0cmFpbnQvc3JjL3V0aWxzL2RlY29tcG9zZVBvc2l0aW9uLnRzIiwgIi4uLy4uL3RocmVlLXZybS1ub2RlLWNvbnN0cmFpbnQvc3JjL3V0aWxzL2RlY29tcG9zZVJvdGF0aW9uLnRzIiwgIi4uLy4uL3RocmVlLXZybS1ub2RlLWNvbnN0cmFpbnQvc3JjL3V0aWxzL3F1YXRJbnZlcnRDb21wYXQudHMiLCAiLi4vLi4vdGhyZWUtdnJtLW5vZGUtY29uc3RyYWludC9zcmMvVlJNTm9kZUNvbnN0cmFpbnQudHMiLCAiLi4vLi4vdGhyZWUtdnJtLW5vZGUtY29uc3RyYWludC9zcmMvdXRpbHMvdHJhdmVyc2VBbmNlc3RvcnNGcm9tUm9vdC50cyIsICIuLi8uLi90aHJlZS12cm0tbm9kZS1jb25zdHJhaW50L3NyYy9WUk1Ob2RlQ29uc3RyYWludE1hbmFnZXIudHMiLCAiLi4vLi4vdGhyZWUtdnJtLW5vZGUtY29uc3RyYWludC9zcmMvVlJNUm90YXRpb25Db25zdHJhaW50LnRzIiwgIi4uLy4uL3RocmVlLXZybS1ub2RlLWNvbnN0cmFpbnQvc3JjL1ZSTVJvbGxDb25zdHJhaW50LnRzIiwgIi4uLy4uL3RocmVlLXZybS1ub2RlLWNvbnN0cmFpbnQvc3JjL1ZSTU5vZGVDb25zdHJhaW50TG9hZGVyUGx1Z2luLnRzIiwgIi4uLy4uL3RocmVlLXZybS1zcHJpbmdib25lL3NyYy9oZWxwZXJzL1ZSTVNwcmluZ0JvbmVDb2xsaWRlckhlbHBlci50cyIsICIuLi8uLi90aHJlZS12cm0tc3ByaW5nYm9uZS9zcmMvVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVDYXBzdWxlLnRzIiwgIi4uLy4uL3RocmVlLXZybS1zcHJpbmdib25lL3NyYy9WUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZS50cyIsICIuLi8uLi90aHJlZS12cm0tc3ByaW5nYm9uZS9zcmMvVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVQbGFuZS50cyIsICIuLi8uLi90aHJlZS12cm0tc3ByaW5nYm9uZS9zcmMvVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVTcGhlcmUudHMiLCAiLi4vLi4vdGhyZWUtdnJtLXNwcmluZ2JvbmUvc3JjL2hlbHBlcnMvdXRpbHMvQ29sbGlkZXJTaGFwZUNhcHN1bGVCdWZmZXJHZW9tZXRyeS50cyIsICIuLi8uLi90aHJlZS12cm0tc3ByaW5nYm9uZS9zcmMvaGVscGVycy91dGlscy9Db2xsaWRlclNoYXBlUGxhbmVCdWZmZXJHZW9tZXRyeS50cyIsICIuLi8uLi90aHJlZS12cm0tc3ByaW5nYm9uZS9zcmMvaGVscGVycy91dGlscy9Db2xsaWRlclNoYXBlU3BoZXJlQnVmZmVyR2VvbWV0cnkudHMiLCAiLi4vLi4vdGhyZWUtdnJtLXNwcmluZ2JvbmUvc3JjL2hlbHBlcnMvVlJNU3ByaW5nQm9uZUpvaW50SGVscGVyLnRzIiwgIi4uLy4uL3RocmVlLXZybS1zcHJpbmdib25lL3NyYy9oZWxwZXJzL3V0aWxzL1NwcmluZ0JvbmVCdWZmZXJHZW9tZXRyeS50cyIsICIuLi8uLi90aHJlZS12cm0tc3ByaW5nYm9uZS9zcmMvVlJNU3ByaW5nQm9uZUNvbGxpZGVyLnRzIiwgIi4uLy4uL3RocmVlLXZybS1zcHJpbmdib25lL3NyYy9WUk1TcHJpbmdCb25lSm9pbnQudHMiLCAiLi4vLi4vdGhyZWUtdnJtLXNwcmluZ2JvbmUvc3JjL3V0aWxzL01hdHJpeDRJbnZlcnNlQ2FjaGUudHMiLCAiLi4vLi4vdGhyZWUtdnJtLXNwcmluZ2JvbmUvc3JjL3V0aWxzL21hdDRJbnZlcnRDb21wYXQudHMiLCAiLi4vLi4vdGhyZWUtdnJtLXNwcmluZ2JvbmUvc3JjL1ZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW4udHMiLCAiLi4vLi4vdGhyZWUtdnJtLXNwcmluZ2JvbmUvc3JjL3V0aWxzL3RyYXZlcnNlQW5jZXN0b3JzRnJvbVJvb3QudHMiLCAiLi4vLi4vdGhyZWUtdnJtLXNwcmluZ2JvbmUvc3JjL3V0aWxzL3RyYXZlcnNlQ2hpbGRyZW5VbnRpbENvbmRpdGlvbk1ldC50cyIsICIuLi8uLi90aHJlZS12cm0tc3ByaW5nYm9uZS9zcmMvdXRpbHMvbG93ZXN0Q29tbW9uQW5jZXN0b3IudHMiLCAiLi4vLi4vdGhyZWUtdnJtLXNwcmluZ2JvbmUvc3JjL1ZSTVNwcmluZ0JvbmVNYW5hZ2VyLnRzIiwgIi4uL3NyYy9WUk1Mb2FkZXJQbHVnaW4udHMiLCAiLi4vc3JjL1ZSTVV0aWxzL2NvbWJpbmVNb3JwaHMudHMiLCAiLi4vc3JjL1ZSTVV0aWxzL2NvbWJpbmVTa2VsZXRvbnMudHMiLCAiLi4vc3JjL3V0aWxzL2F0dHJpYnV0ZUdldENvbXBvbmVudENvbXBhdC50cyIsICIuLi9zcmMvdXRpbHMvYXR0cmlidXRlU2V0Q29tcG9uZW50Q29tcGF0LnRzIiwgIi4uL3NyYy9WUk1VdGlscy9kZWVwRGlzcG9zZS50cyIsICIuLi9zcmMvVlJNVXRpbHMvcmVtb3ZlVW5uZWNlc3NhcnlKb2ludHMudHMiLCAiLi4vc3JjL1ZSTVV0aWxzL3JlbW92ZVVubmVjZXNzYXJ5VmVydGljZXMudHMiLCAiLi4vc3JjL1ZSTVV0aWxzL3JvdGF0ZVZSTTAudHMiLCAiLi4vc3JjL1ZSTVV0aWxzL2luZGV4LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1FeHByZXNzaW9uQmluZCB9IGZyb20gJy4vVlJNRXhwcmVzc2lvbkJpbmQnO1xuaW1wb3J0IHR5cGUgeyBWUk1FeHByZXNzaW9uT3ZlcnJpZGVUeXBlIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uT3ZlcnJpZGVUeXBlJztcbmltcG9ydCB0eXBlIHsgVlJNRXhwcmVzc2lvbk1hbmFnZXIgfSBmcm9tICcuL1ZSTUV4cHJlc3Npb25NYW5hZ2VyJztcblxuLy8gYW5pbWF0aW9uTWl4ZXIgXHUzMDZFXHU3NkUzXHU4OTk2XHU1QkZFXHU4QzYxXHUzMDZGXHUzMDAxU2NlbmUgXHUzMDZFXHU0RTJEXHUzMDZCXHU1MTY1XHUzMDYzXHUzMDY2XHUzMDQ0XHUzMDhCXHU1RkM1XHU4OTgxXHUzMDRDXHUzMDQyXHUzMDhCXHUzMDAyXG4vLyBcdTMwNURcdTMwNkVcdTMwNUZcdTMwODFcdTMwMDFcdTg4NjhcdTc5M0FcdTMwQUFcdTMwRDZcdTMwQjhcdTMwQTdcdTMwQUZcdTMwQzhcdTMwNjdcdTMwNkZcdTMwNkFcdTMwNDRcdTMwNTFcdTMwOENcdTMwNjlcdTMwMDFPYmplY3QzRCBcdTMwOTJcdTdEOTlcdTYyN0ZcdTMwNTdcdTMwNjYgU2NlbmUgXHUzMDZCXHU2Mjk1XHU1MTY1XHUzMDY3XHUzMDREXHUzMDhCXHUzMDg4XHUzMDQ2XHUzMDZCXHUzMDU5XHUzMDhCXHUzMDAyXG5leHBvcnQgY2xhc3MgVlJNRXhwcmVzc2lvbiBleHRlbmRzIFRIUkVFLk9iamVjdDNEIHtcbiAgLyoqXG4gICAqIE5hbWUgb2YgdGhpcyBleHByZXNzaW9uLlxuICAgKiBEaXN0aW5ndWlzaGVkIHdpdGggYG5hbWVgIHNpbmNlIGBuYW1lYCB3aWxsIGJlIGNvbmZsaWN0ZWQgd2l0aCBPYmplY3QzRC5cbiAgICovXG4gIHB1YmxpYyBleHByZXNzaW9uTmFtZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgY3VycmVudCB3ZWlnaHQgb2YgdGhlIGV4cHJlc3Npb24uXG4gICAqXG4gICAqIFlvdSB1c3VhbGx5IHdhbnQgdG8gc2V0IHRoZSB3ZWlnaHQgdmlhIHtAbGluayBWUk1FeHByZXNzaW9uTWFuYWdlci5zZXRWYWx1ZX0uXG4gICAqXG4gICAqIEl0IG1pZ2h0IGFsc28gYmUgY29udHJvbGxlZCBieSB0aGUgVGhyZWUuanMgYW5pbWF0aW9uIHN5c3RlbS5cbiAgICovXG4gIHB1YmxpYyB3ZWlnaHQgPSAwLjA7XG5cbiAgLyoqXG4gICAqIEludGVycHJldCB2YWx1ZXMgZ3JlYXRlciB0aGFuIDAuNSBhcyAxLjAsIG9ydGhlcndpc2UgMC4wLlxuICAgKi9cbiAgcHVibGljIGlzQmluYXJ5ID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFNwZWNpZnkgaG93IHRoZSBleHByZXNzaW9uIG92ZXJyaWRlcyBibGluayBleHByZXNzaW9ucy5cbiAgICovXG4gIHB1YmxpYyBvdmVycmlkZUJsaW5rOiBWUk1FeHByZXNzaW9uT3ZlcnJpZGVUeXBlID0gJ25vbmUnO1xuXG4gIC8qKlxuICAgKiBTcGVjaWZ5IGhvdyB0aGUgZXhwcmVzc2lvbiBvdmVycmlkZXMgbG9va0F0IGV4cHJlc3Npb25zLlxuICAgKi9cbiAgcHVibGljIG92ZXJyaWRlTG9va0F0OiBWUk1FeHByZXNzaW9uT3ZlcnJpZGVUeXBlID0gJ25vbmUnO1xuXG4gIC8qKlxuICAgKiBTcGVjaWZ5IGhvdyB0aGUgZXhwcmVzc2lvbiBvdmVycmlkZXMgbW91dGggZXhwcmVzc2lvbnMuXG4gICAqL1xuICBwdWJsaWMgb3ZlcnJpZGVNb3V0aDogVlJNRXhwcmVzc2lvbk92ZXJyaWRlVHlwZSA9ICdub25lJztcblxuICAvKipcbiAgICogQmluZHMgdGhhdCB0aGlzIGV4cHJlc3Npb24gaW5mbHVlbmNlcy5cbiAgICovXG4gIHByaXZhdGUgX2JpbmRzOiBWUk1FeHByZXNzaW9uQmluZFtdID0gW107XG5cbiAgLyoqXG4gICAqIEJpbmRzIHRoYXQgdGhpcyBleHByZXNzaW9uIGluZmx1ZW5jZXMuXG4gICAqL1xuICBwdWJsaWMgZ2V0IGJpbmRzKCk6IHJlYWRvbmx5IFZSTUV4cHJlc3Npb25CaW5kW10ge1xuICAgIHJldHVybiB0aGlzLl9iaW5kcztcbiAgfVxuXG4gIG92ZXJyaWRlIHJlYWRvbmx5IHR5cGU6IHN0cmluZyB8ICdWUk1FeHByZXNzaW9uJztcblxuICAvKipcbiAgICogQSB2YWx1ZSByZXByZXNlbnRzIGhvdyBtdWNoIGl0IHNob3VsZCBvdmVycmlkZSBibGluayBleHByZXNzaW9ucy5cbiAgICogYDAuMGAgPT0gbm8gb3ZlcnJpZGUgYXQgYWxsLCBgMS4wYCA9PSBjb21wbGV0ZWx5IGJsb2NrIHRoZSBleHByZXNzaW9ucy5cbiAgICovXG4gIHB1YmxpYyBnZXQgb3ZlcnJpZGVCbGlua0Ftb3VudCgpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLm92ZXJyaWRlQmxpbmsgPT09ICdibG9jaycpIHtcbiAgICAgIHJldHVybiAwLjAgPCB0aGlzLm91dHB1dFdlaWdodCA/IDEuMCA6IDAuMDtcbiAgICB9IGVsc2UgaWYgKHRoaXMub3ZlcnJpZGVCbGluayA9PT0gJ2JsZW5kJykge1xuICAgICAgcmV0dXJuIHRoaXMub3V0cHV0V2VpZ2h0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gMC4wO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBIHZhbHVlIHJlcHJlc2VudHMgaG93IG11Y2ggaXQgc2hvdWxkIG92ZXJyaWRlIGxvb2tBdCBleHByZXNzaW9ucy5cbiAgICogYDAuMGAgPT0gbm8gb3ZlcnJpZGUgYXQgYWxsLCBgMS4wYCA9PSBjb21wbGV0ZWx5IGJsb2NrIHRoZSBleHByZXNzaW9ucy5cbiAgICovXG4gIHB1YmxpYyBnZXQgb3ZlcnJpZGVMb29rQXRBbW91bnQoKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5vdmVycmlkZUxvb2tBdCA9PT0gJ2Jsb2NrJykge1xuICAgICAgcmV0dXJuIDAuMCA8IHRoaXMub3V0cHV0V2VpZ2h0ID8gMS4wIDogMC4wO1xuICAgIH0gZWxzZSBpZiAodGhpcy5vdmVycmlkZUxvb2tBdCA9PT0gJ2JsZW5kJykge1xuICAgICAgcmV0dXJuIHRoaXMub3V0cHV0V2VpZ2h0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gMC4wO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBIHZhbHVlIHJlcHJlc2VudHMgaG93IG11Y2ggaXQgc2hvdWxkIG92ZXJyaWRlIG1vdXRoIGV4cHJlc3Npb25zLlxuICAgKiBgMC4wYCA9PSBubyBvdmVycmlkZSBhdCBhbGwsIGAxLjBgID09IGNvbXBsZXRlbHkgYmxvY2sgdGhlIGV4cHJlc3Npb25zLlxuICAgKi9cbiAgcHVibGljIGdldCBvdmVycmlkZU1vdXRoQW1vdW50KCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMub3ZlcnJpZGVNb3V0aCA9PT0gJ2Jsb2NrJykge1xuICAgICAgcmV0dXJuIDAuMCA8IHRoaXMub3V0cHV0V2VpZ2h0ID8gMS4wIDogMC4wO1xuICAgIH0gZWxzZSBpZiAodGhpcy5vdmVycmlkZU1vdXRoID09PSAnYmxlbmQnKSB7XG4gICAgICByZXR1cm4gdGhpcy5vdXRwdXRXZWlnaHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAwLjA7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFuIG91dHB1dCB3ZWlnaHQgb2YgdGhpcyBleHByZXNzaW9uLCBjb25zaWRlcmluZyB0aGUge0BsaW5rIGlzQmluYXJ5fS5cbiAgICovXG4gIHB1YmxpYyBnZXQgb3V0cHV0V2VpZ2h0KCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMuaXNCaW5hcnkpIHtcbiAgICAgIHJldHVybiB0aGlzLndlaWdodCA+IDAuNSA/IDEuMCA6IDAuMDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy53ZWlnaHQ7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihleHByZXNzaW9uTmFtZTogc3RyaW5nKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMubmFtZSA9IGBWUk1FeHByZXNzaW9uXyR7ZXhwcmVzc2lvbk5hbWV9YDtcbiAgICB0aGlzLmV4cHJlc3Npb25OYW1lID0gZXhwcmVzc2lvbk5hbWU7XG5cbiAgICAvLyB0cmF2ZXJzZSBcdTY2NDJcdTMwNkVcdTY1NTFcdTZFMDhcdTYyNEJcdTZCQjVcdTMwNjhcdTMwNTdcdTMwNjYgT2JqZWN0M0QgXHUzMDY3XHUzMDZGXHUzMDZBXHUzMDQ0XHUzMDUzXHUzMDY4XHUzMDkyXHU2NjBFXHU3OTNBXHUzMDU3XHUzMDY2XHUzMDRBXHUzMDRGXG4gICAgdGhpcy50eXBlID0gJ1ZSTUV4cHJlc3Npb24nO1xuXG4gICAgLy8gXHU4ODY4XHU3OTNBXHU3NkVFXHU3Njg0XHUzMDZFXHUzMEFBXHUzMEQ2XHUzMEI4XHUzMEE3XHUzMEFGXHUzMEM4XHUzMDY3XHUzMDZGXHUzMDZBXHUzMDQ0XHUzMDZFXHUzMDY3XHUzMDAxXHU4Q0EwXHU4Mzc3XHU4RUZEXHU2RTFCXHUzMDZFXHUzMDVGXHUzMDgxXHUzMDZCIHZpc2libGUgXHUzMDkyIGZhbHNlIFx1MzA2Qlx1MzA1N1x1MzA2Nlx1MzA0QVx1MzA0Rlx1MzAwMlxuICAgIC8vIFx1MzA1M1x1MzA4Q1x1MzA2Qlx1MzA4OFx1MzA4QVx1MzAwMVx1MzA1M1x1MzA2RVx1MzBBNFx1MzBGM1x1MzBCOVx1MzBCRlx1MzBGM1x1MzBCOVx1MzA2Qlx1NUJGRVx1MzA1OVx1MzA4Qlx1NkJDRVx1MzBENVx1MzBFQ1x1MzBGQ1x1MzBFMFx1MzA2RSBtYXRyaXggXHU4MUVBXHU1MkQ1XHU4QTA4XHU3Qjk3XHUzMDkyXHU3NzAxXHU3NTY1XHUzMDY3XHUzMDREXHUzMDhCXHUzMDAyXG4gICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGFuIGV4cHJlc3Npb24gYmluZCB0byB0aGUgZXhwcmVzc2lvbi5cbiAgICpcbiAgICogQHBhcmFtIGJpbmQgQSBiaW5kIHRvIGFkZFxuICAgKi9cbiAgcHVibGljIGFkZEJpbmQoYmluZDogVlJNRXhwcmVzc2lvbkJpbmQpOiB2b2lkIHtcbiAgICB0aGlzLl9iaW5kcy5wdXNoKGJpbmQpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZSBhbiBleHByZXNzaW9uIGJpbmQgZnJvbSB0aGUgZXhwcmVzc2lvbi5cbiAgICpcbiAgICogQHBhcmFtIGJpbmQgQSBiaW5kIHRvIGRlbGV0ZVxuICAgKi9cbiAgcHVibGljIGRlbGV0ZUJpbmQoYmluZDogVlJNRXhwcmVzc2lvbkJpbmQpOiB2b2lkIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuX2JpbmRzLmluZGV4T2YoYmluZCk7XG4gICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgIHRoaXMuX2JpbmRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHdlaWdodCB0byBldmVyeSBhc3NpZ25lZCBibGVuZCBzaGFwZXMuXG4gICAqIFNob3VsZCBiZSBjYWxsZWQgZXZlcnkgZnJhbWUuXG4gICAqL1xuICBwdWJsaWMgYXBwbHlXZWlnaHQob3B0aW9ucz86IHtcbiAgICAvKipcbiAgICAgKiBNdWx0aXBsaWVzIGEgdmFsdWUgdG8gaXRzIHdlaWdodCB0byBhcHBseS5cbiAgICAgKiBJbnRlbmRlZCB0byBiZSB1c2VkIGZvciBvdmVycmlkaW5nIGFuIGV4cHJlc3Npb24gd2VpZ2h0IGJ5IGFub3RoZXIgZXhwcmVzc2lvbi5cbiAgICAgKiBTZWUgYWxzbzoge0BsaW5rIG92ZXJyaWRlQmxpbmt9LCB7QGxpbmsgb3ZlcnJpZGVMb29rQXR9LCB7QGxpbmsgb3ZlcnJpZGVNb3V0aH1cbiAgICAgKi9cbiAgICBtdWx0aXBsaWVyPzogbnVtYmVyO1xuICB9KTogdm9pZCB7XG4gICAgbGV0IGFjdHVhbFdlaWdodCA9IHRoaXMub3V0cHV0V2VpZ2h0O1xuICAgIGFjdHVhbFdlaWdodCAqPSBvcHRpb25zPy5tdWx0aXBsaWVyID8/IDEuMDtcblxuICAgIC8vIGlmIHRoZSBleHByZXNzaW9uIGlzIGJpbmFyeSwgdGhlIG92ZXJyaWRlIHZhbHVlIG11c3QgYmUgYWxzbyB0cmVhdGVkIGFzIGJpbmFyeVxuICAgIGlmICh0aGlzLmlzQmluYXJ5ICYmIGFjdHVhbFdlaWdodCA8IDEuMCkge1xuICAgICAgYWN0dWFsV2VpZ2h0ID0gMC4wO1xuICAgIH1cblxuICAgIHRoaXMuX2JpbmRzLmZvckVhY2goKGJpbmQpID0+IGJpbmQuYXBwbHlXZWlnaHQoYWN0dWFsV2VpZ2h0KSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXIgcHJldmlvdXNseSBhc3NpZ25lZCBibGVuZCBzaGFwZXMuXG4gICAqL1xuICBwdWJsaWMgY2xlYXJBcHBsaWVkV2VpZ2h0KCk6IHZvaWQge1xuICAgIHRoaXMuX2JpbmRzLmZvckVhY2goKGJpbmQpID0+IGJpbmQuY2xlYXJBcHBsaWVkV2VpZ2h0KCkpO1xuICB9XG59XG4iLCAiaW1wb3J0IHR5cGUgKiBhcyBWMFZSTSBmcm9tICdAcGl4aXYvdHlwZXMtdnJtLTAuMCc7XG5pbXBvcnQgdHlwZSAqIGFzIFYxVlJNU2NoZW1hIGZyb20gJ0BwaXhpdi90eXBlcy12cm1jLXZybS0xLjAnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgR0xURiwgR0xURkxvYWRlclBsdWdpbiwgR0xURlBhcnNlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXIuanMnO1xuaW1wb3J0IHsgZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGUgfSBmcm9tICcuLi91dGlscy9nbHRmRXh0cmFjdFByaW1pdGl2ZXNGcm9tTm9kZSc7XG5pbXBvcnQgeyBWUk1FeHByZXNzaW9uIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uJztcbmltcG9ydCB7IFZSTUV4cHJlc3Npb25NYW5hZ2VyIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uTWFuYWdlcic7XG5pbXBvcnQgeyB2MEV4cHJlc3Npb25NYXRlcmlhbENvbG9yTWFwIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGUnO1xuaW1wb3J0IHsgVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JCaW5kIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvckJpbmQnO1xuaW1wb3J0IHsgVlJNRXhwcmVzc2lvbk1vcnBoVGFyZ2V0QmluZCB9IGZyb20gJy4vVlJNRXhwcmVzc2lvbk1vcnBoVGFyZ2V0QmluZCc7XG5pbXBvcnQgeyBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSB9IGZyb20gJy4vVlJNRXhwcmVzc2lvblByZXNldE5hbWUnO1xuaW1wb3J0IHsgVlJNRXhwcmVzc2lvblRleHR1cmVUcmFuc2Zvcm1CaW5kIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uVGV4dHVyZVRyYW5zZm9ybUJpbmQnO1xuaW1wb3J0IHsgR0xURiBhcyBHTFRGU2NoZW1hIH0gZnJvbSAnQGdsdGYtdHJhbnNmb3JtL2NvcmUnO1xuXG4vKipcbiAqIFBvc3NpYmxlIHNwZWMgdmVyc2lvbnMgaXQgcmVjb2duaXplcy5cbiAqL1xuY29uc3QgUE9TU0lCTEVfU1BFQ19WRVJTSU9OUyA9IG5ldyBTZXQoWycxLjAnLCAnMS4wLWJldGEnXSk7XG5cbi8qKlxuICogQSBwbHVnaW4gb2YgR0xURkxvYWRlciB0aGF0IGltcG9ydHMgYSB7QGxpbmsgVlJNRXhwcmVzc2lvbk1hbmFnZXJ9IGZyb20gYSBWUk0gZXh0ZW5zaW9uIG9mIGEgR0xURi5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUV4cHJlc3Npb25Mb2FkZXJQbHVnaW4gaW1wbGVtZW50cyBHTFRGTG9hZGVyUGx1Z2luIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSB2MHYxUHJlc2V0TmFtZU1hcDogeyBbdjBOYW1lIGluIFYwVlJNLkJsZW5kU2hhcGVQcmVzZXROYW1lXT86IFZSTUV4cHJlc3Npb25QcmVzZXROYW1lIH0gPSB7XG4gICAgYTogJ2FhJyxcbiAgICBlOiAnZWUnLFxuICAgIGk6ICdpaCcsXG4gICAgbzogJ29oJyxcbiAgICB1OiAnb3UnLFxuICAgIGJsaW5rOiAnYmxpbmsnLFxuICAgIGpveTogJ2hhcHB5JyxcbiAgICBhbmdyeTogJ2FuZ3J5JyxcbiAgICBzb3Jyb3c6ICdzYWQnLFxuICAgIGZ1bjogJ3JlbGF4ZWQnLFxuICAgIGxvb2t1cDogJ2xvb2tVcCcsXG4gICAgbG9va2Rvd246ICdsb29rRG93bicsXG4gICAgbG9va2xlZnQ6ICdsb29rTGVmdCcsXG4gICAgbG9va3JpZ2h0OiAnbG9va1JpZ2h0JyxcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXG4gICAgYmxpbmtfbDogJ2JsaW5rTGVmdCcsXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxuICAgIGJsaW5rX3I6ICdibGlua1JpZ2h0JyxcbiAgICBuZXV0cmFsOiAnbmV1dHJhbCcsXG4gIH07XG5cbiAgcHVibGljIHJlYWRvbmx5IHBhcnNlcjogR0xURlBhcnNlcjtcblxuICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICAvLyBXZSBzaG91bGQgdXNlIHRoZSBleHRlbnNpb24gbmFtZSBpbnN0ZWFkIGJ1dCB3ZSBoYXZlIG11bHRpcGxlIHBsdWdpbnMgZm9yIGFuIGV4dGVuc2lvbi4uLlxuICAgIHJldHVybiAnVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbic7XG4gIH1cblxuICBwdWJsaWMgY29uc3RydWN0b3IocGFyc2VyOiBHTFRGUGFyc2VyKSB7XG4gICAgdGhpcy5wYXJzZXIgPSBwYXJzZXI7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgYWZ0ZXJSb290KGdsdGY6IEdMVEYpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBnbHRmLnVzZXJEYXRhLnZybUV4cHJlc3Npb25NYW5hZ2VyID0gYXdhaXQgdGhpcy5faW1wb3J0KGdsdGYpO1xuICB9XG5cbiAgLyoqXG4gICAqIEltcG9ydCBhIHtAbGluayBWUk1FeHByZXNzaW9uTWFuYWdlcn0gZnJvbSBhIFZSTS5cbiAgICpcbiAgICogQHBhcmFtIGdsdGYgQSBwYXJzZWQgcmVzdWx0IG9mIEdMVEYgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gICAqL1xuICBwcml2YXRlIGFzeW5jIF9pbXBvcnQoZ2x0ZjogR0xURik6IFByb21pc2U8VlJNRXhwcmVzc2lvbk1hbmFnZXIgfCBudWxsPiB7XG4gICAgY29uc3QgdjFSZXN1bHQgPSBhd2FpdCB0aGlzLl92MUltcG9ydChnbHRmKTtcbiAgICBpZiAodjFSZXN1bHQpIHtcbiAgICAgIHJldHVybiB2MVJlc3VsdDtcbiAgICB9XG5cbiAgICBjb25zdCB2MFJlc3VsdCA9IGF3YWl0IHRoaXMuX3YwSW1wb3J0KGdsdGYpO1xuICAgIGlmICh2MFJlc3VsdCkge1xuICAgICAgcmV0dXJuIHYwUmVzdWx0O1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfdjFJbXBvcnQoZ2x0ZjogR0xURik6IFByb21pc2U8VlJNRXhwcmVzc2lvbk1hbmFnZXIgfCBudWxsPiB7XG4gICAgY29uc3QganNvbiA9IHRoaXMucGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAgIC8vIGVhcmx5IGFib3J0IGlmIGl0IGRvZXNuJ3QgdXNlIHZybVxuICAgIGNvbnN0IGlzVlJNVXNlZCA9IGpzb24uZXh0ZW5zaW9uc1VzZWQ/LmluZGV4T2YoJ1ZSTUNfdnJtJykgIT09IC0xO1xuICAgIGlmICghaXNWUk1Vc2VkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBleHRlbnNpb24gPSBqc29uLmV4dGVuc2lvbnM/LlsnVlJNQ192cm0nXSBhcyBWMVZSTVNjaGVtYS5WUk1DVlJNIHwgdW5kZWZpbmVkO1xuICAgIGlmICghZXh0ZW5zaW9uKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzcGVjVmVyc2lvbiA9IGV4dGVuc2lvbi5zcGVjVmVyc2lvbjtcbiAgICBpZiAoIVBPU1NJQkxFX1NQRUNfVkVSU0lPTlMuaGFzKHNwZWNWZXJzaW9uKSkge1xuICAgICAgY29uc29sZS53YXJuKGBWUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luOiBVbmtub3duIFZSTUNfdnJtIHNwZWNWZXJzaW9uIFwiJHtzcGVjVmVyc2lvbn1cImApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc2NoZW1hRXhwcmVzc2lvbnMgPSBleHRlbnNpb24uZXhwcmVzc2lvbnM7XG4gICAgaWYgKCFzY2hlbWFFeHByZXNzaW9ucykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gbGlzdCBleHByZXNzaW9uc1xuICAgIGNvbnN0IHByZXNldE5hbWVTZXQgPSBuZXcgU2V0PHN0cmluZz4oT2JqZWN0LnZhbHVlcyhWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSkpO1xuICAgIGNvbnN0IG5hbWVTY2hlbWFFeHByZXNzaW9uTWFwID0gbmV3IE1hcDxzdHJpbmcsIFYxVlJNU2NoZW1hLkV4cHJlc3Npb24+KCk7XG5cbiAgICBpZiAoc2NoZW1hRXhwcmVzc2lvbnMucHJlc2V0ICE9IG51bGwpIHtcbiAgICAgIE9iamVjdC5lbnRyaWVzKHNjaGVtYUV4cHJlc3Npb25zLnByZXNldCkuZm9yRWFjaCgoW25hbWUsIHNjaGVtYUV4cHJlc3Npb25dKSA9PiB7XG4gICAgICAgIGlmIChzY2hlbWFFeHByZXNzaW9uID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gLy8gdHlwZXNjcmlwdFxuXG4gICAgICAgIGlmICghcHJlc2V0TmFtZVNldC5oYXMobmFtZSkpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oYFZSTUV4cHJlc3Npb25Mb2FkZXJQbHVnaW46IFVua25vd24gcHJlc2V0IG5hbWUgXCIke25hbWV9XCIgZGV0ZWN0ZWQuIElnbm9yaW5nIHRoZSBleHByZXNzaW9uYCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbmFtZVNjaGVtYUV4cHJlc3Npb25NYXAuc2V0KG5hbWUsIHNjaGVtYUV4cHJlc3Npb24pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHNjaGVtYUV4cHJlc3Npb25zLmN1c3RvbSAhPSBudWxsKSB7XG4gICAgICBPYmplY3QuZW50cmllcyhzY2hlbWFFeHByZXNzaW9ucy5jdXN0b20pLmZvckVhY2goKFtuYW1lLCBzY2hlbWFFeHByZXNzaW9uXSkgPT4ge1xuICAgICAgICBpZiAocHJlc2V0TmFtZVNldC5oYXMobmFtZSkpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICBgVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbjogQ3VzdG9tIGV4cHJlc3Npb24gY2Fubm90IGhhdmUgcHJlc2V0IG5hbWUgXCIke25hbWV9XCIuIElnbm9yaW5nIHRoZSBleHByZXNzaW9uYCxcbiAgICAgICAgICApO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIG5hbWVTY2hlbWFFeHByZXNzaW9uTWFwLnNldChuYW1lLCBzY2hlbWFFeHByZXNzaW9uKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIHByZXBhcmUgbWFuYWdlclxuICAgIGNvbnN0IG1hbmFnZXIgPSBuZXcgVlJNRXhwcmVzc2lvbk1hbmFnZXIoKTtcblxuICAgIC8vIGxvYWQgZXhwcmVzc2lvbnNcbiAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIEFycmF5LmZyb20obmFtZVNjaGVtYUV4cHJlc3Npb25NYXAuZW50cmllcygpKS5tYXAoYXN5bmMgKFtuYW1lLCBzY2hlbWFFeHByZXNzaW9uXSkgPT4ge1xuICAgICAgICBjb25zdCBleHByZXNzaW9uID0gbmV3IFZSTUV4cHJlc3Npb24obmFtZSk7XG4gICAgICAgIGdsdGYuc2NlbmUuYWRkKGV4cHJlc3Npb24pO1xuXG4gICAgICAgIGV4cHJlc3Npb24uaXNCaW5hcnkgPSBzY2hlbWFFeHByZXNzaW9uLmlzQmluYXJ5ID8/IGZhbHNlO1xuICAgICAgICBleHByZXNzaW9uLm92ZXJyaWRlQmxpbmsgPSBzY2hlbWFFeHByZXNzaW9uLm92ZXJyaWRlQmxpbmsgPz8gJ25vbmUnO1xuICAgICAgICBleHByZXNzaW9uLm92ZXJyaWRlTG9va0F0ID0gc2NoZW1hRXhwcmVzc2lvbi5vdmVycmlkZUxvb2tBdCA/PyAnbm9uZSc7XG4gICAgICAgIGV4cHJlc3Npb24ub3ZlcnJpZGVNb3V0aCA9IHNjaGVtYUV4cHJlc3Npb24ub3ZlcnJpZGVNb3V0aCA/PyAnbm9uZSc7XG5cbiAgICAgICAgc2NoZW1hRXhwcmVzc2lvbi5tb3JwaFRhcmdldEJpbmRzPy5mb3JFYWNoKGFzeW5jIChiaW5kKSA9PiB7XG4gICAgICAgICAgaWYgKGJpbmQubm9kZSA9PT0gdW5kZWZpbmVkIHx8IGJpbmQuaW5kZXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHByaW1pdGl2ZXMgPSAoYXdhaXQgZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGUoZ2x0ZiwgYmluZC5ub2RlKSkhO1xuICAgICAgICAgIGNvbnN0IG1vcnBoVGFyZ2V0SW5kZXggPSBiaW5kLmluZGV4O1xuXG4gICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIG1lc2ggaGFzIHRoZSB0YXJnZXQgbW9ycGggdGFyZ2V0XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgIXByaW1pdGl2ZXMuZXZlcnkoXG4gICAgICAgICAgICAgIChwcmltaXRpdmUpID0+XG4gICAgICAgICAgICAgICAgQXJyYXkuaXNBcnJheShwcmltaXRpdmUubW9ycGhUYXJnZXRJbmZsdWVuY2VzKSAmJlxuICAgICAgICAgICAgICAgIG1vcnBoVGFyZ2V0SW5kZXggPCBwcmltaXRpdmUubW9ycGhUYXJnZXRJbmZsdWVuY2VzLmxlbmd0aCxcbiAgICAgICAgICAgIClcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgICAgYFZSTUV4cHJlc3Npb25Mb2FkZXJQbHVnaW46ICR7c2NoZW1hRXhwcmVzc2lvbi5uYW1lfSBhdHRlbXB0cyB0byBpbmRleCBtb3JwaCAjJHttb3JwaFRhcmdldEluZGV4fSBidXQgbm90IGZvdW5kLmAsXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGV4cHJlc3Npb24uYWRkQmluZChcbiAgICAgICAgICAgIG5ldyBWUk1FeHByZXNzaW9uTW9ycGhUYXJnZXRCaW5kKHtcbiAgICAgICAgICAgICAgcHJpbWl0aXZlcyxcbiAgICAgICAgICAgICAgaW5kZXg6IG1vcnBoVGFyZ2V0SW5kZXgsXG4gICAgICAgICAgICAgIHdlaWdodDogYmluZC53ZWlnaHQgPz8gMS4wLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHNjaGVtYUV4cHJlc3Npb24ubWF0ZXJpYWxDb2xvckJpbmRzIHx8IHNjaGVtYUV4cHJlc3Npb24udGV4dHVyZVRyYW5zZm9ybUJpbmRzKSB7XG4gICAgICAgICAgLy8gbGlzdCB1cCBldmVyeSBtYXRlcmlhbCBpbiBgZ2x0Zi5zY2VuZWBcbiAgICAgICAgICBjb25zdCBnbHRmTWF0ZXJpYWxzOiBUSFJFRS5NYXRlcmlhbFtdID0gW107XG4gICAgICAgICAgZ2x0Zi5zY2VuZS50cmF2ZXJzZSgob2JqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtYXRlcmlhbCA9IChvYmplY3QgYXMgYW55KS5tYXRlcmlhbCBhcyBUSFJFRS5NYXRlcmlhbCB8IFRIUkVFLk1hdGVyaWFsW10gfCB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAobWF0ZXJpYWwpIHtcbiAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobWF0ZXJpYWwpKSB7XG4gICAgICAgICAgICAgICAgZ2x0Zk1hdGVyaWFscy5wdXNoKC4uLm1hdGVyaWFsKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBnbHRmTWF0ZXJpYWxzLnB1c2gobWF0ZXJpYWwpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBzY2hlbWFFeHByZXNzaW9uLm1hdGVyaWFsQ29sb3JCaW5kcz8uZm9yRWFjaChhc3luYyAoYmluZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWxzID0gZ2x0Zk1hdGVyaWFscy5maWx0ZXIoKG1hdGVyaWFsKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IG1hdGVyaWFsSW5kZXggPSB0aGlzLnBhcnNlci5hc3NvY2lhdGlvbnMuZ2V0KG1hdGVyaWFsKT8ubWF0ZXJpYWxzO1xuICAgICAgICAgICAgICByZXR1cm4gYmluZC5tYXRlcmlhbCA9PT0gbWF0ZXJpYWxJbmRleDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBtYXRlcmlhbHMuZm9yRWFjaCgobWF0ZXJpYWwpID0+IHtcbiAgICAgICAgICAgICAgZXhwcmVzc2lvbi5hZGRCaW5kKFxuICAgICAgICAgICAgICAgIG5ldyBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvckJpbmQoe1xuICAgICAgICAgICAgICAgICAgbWF0ZXJpYWwsXG4gICAgICAgICAgICAgICAgICB0eXBlOiBiaW5kLnR5cGUsXG4gICAgICAgICAgICAgICAgICB0YXJnZXRWYWx1ZTogbmV3IFRIUkVFLkNvbG9yKCkuZnJvbUFycmF5KGJpbmQudGFyZ2V0VmFsdWUpLFxuICAgICAgICAgICAgICAgICAgdGFyZ2V0QWxwaGE6IGJpbmQudGFyZ2V0VmFsdWVbM10sXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHNjaGVtYUV4cHJlc3Npb24udGV4dHVyZVRyYW5zZm9ybUJpbmRzPy5mb3JFYWNoKGFzeW5jIChiaW5kKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtYXRlcmlhbHMgPSBnbHRmTWF0ZXJpYWxzLmZpbHRlcigobWF0ZXJpYWwpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWxJbmRleCA9IHRoaXMucGFyc2VyLmFzc29jaWF0aW9ucy5nZXQobWF0ZXJpYWwpPy5tYXRlcmlhbHM7XG4gICAgICAgICAgICAgIHJldHVybiBiaW5kLm1hdGVyaWFsID09PSBtYXRlcmlhbEluZGV4O1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG1hdGVyaWFscy5mb3JFYWNoKChtYXRlcmlhbCkgPT4ge1xuICAgICAgICAgICAgICBleHByZXNzaW9uLmFkZEJpbmQoXG4gICAgICAgICAgICAgICAgbmV3IFZSTUV4cHJlc3Npb25UZXh0dXJlVHJhbnNmb3JtQmluZCh7XG4gICAgICAgICAgICAgICAgICBtYXRlcmlhbCxcbiAgICAgICAgICAgICAgICAgIG9mZnNldDogbmV3IFRIUkVFLlZlY3RvcjIoKS5mcm9tQXJyYXkoYmluZC5vZmZzZXQgPz8gWzAuMCwgMC4wXSksXG4gICAgICAgICAgICAgICAgICBzY2FsZTogbmV3IFRIUkVFLlZlY3RvcjIoKS5mcm9tQXJyYXkoYmluZC5zY2FsZSA/PyBbMS4wLCAxLjBdKSxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgbWFuYWdlci5yZWdpc3RlckV4cHJlc3Npb24oZXhwcmVzc2lvbik7XG4gICAgICB9KSxcbiAgICApO1xuXG4gICAgcmV0dXJuIG1hbmFnZXI7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF92MEltcG9ydChnbHRmOiBHTFRGKTogUHJvbWlzZTxWUk1FeHByZXNzaW9uTWFuYWdlciB8IG51bGw+IHtcbiAgICBjb25zdCBqc29uID0gdGhpcy5wYXJzZXIuanNvbiBhcyBHTFRGU2NoZW1hLklHTFRGO1xuXG4gICAgLy8gZWFybHkgYWJvcnQgaWYgaXQgZG9lc24ndCB1c2UgdnJtXG4gICAgY29uc3QgdnJtRXh0ID0ganNvbi5leHRlbnNpb25zPy5WUk0gYXMgVjBWUk0uVlJNIHwgdW5kZWZpbmVkO1xuICAgIGlmICghdnJtRXh0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzY2hlbWFCbGVuZFNoYXBlID0gdnJtRXh0LmJsZW5kU2hhcGVNYXN0ZXI7XG4gICAgaWYgKCFzY2hlbWFCbGVuZFNoYXBlKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBtYW5hZ2VyID0gbmV3IFZSTUV4cHJlc3Npb25NYW5hZ2VyKCk7XG5cbiAgICBjb25zdCBzY2hlbWFCbGVuZFNoYXBlR3JvdXBzID0gc2NoZW1hQmxlbmRTaGFwZS5ibGVuZFNoYXBlR3JvdXBzO1xuICAgIGlmICghc2NoZW1hQmxlbmRTaGFwZUdyb3Vwcykge1xuICAgICAgcmV0dXJuIG1hbmFnZXI7XG4gICAgfVxuXG4gICAgY29uc3QgYmxlbmRTaGFwZU5hbWVTZXQgPSBuZXcgU2V0PHN0cmluZz4oKTtcblxuICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgc2NoZW1hQmxlbmRTaGFwZUdyb3Vwcy5tYXAoYXN5bmMgKHNjaGVtYUdyb3VwKSA9PiB7XG4gICAgICAgIGNvbnN0IHYwUHJlc2V0TmFtZSA9IHNjaGVtYUdyb3VwLnByZXNldE5hbWU7XG4gICAgICAgIGNvbnN0IHYxUHJlc2V0TmFtZSA9XG4gICAgICAgICAgKHYwUHJlc2V0TmFtZSAhPSBudWxsICYmIFZSTUV4cHJlc3Npb25Mb2FkZXJQbHVnaW4udjB2MVByZXNldE5hbWVNYXBbdjBQcmVzZXROYW1lXSkgfHwgbnVsbDtcbiAgICAgICAgY29uc3QgbmFtZSA9IHYxUHJlc2V0TmFtZSA/PyBzY2hlbWFHcm91cC5uYW1lO1xuXG4gICAgICAgIGlmIChuYW1lID09IG51bGwpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ1ZSTUV4cHJlc3Npb25Mb2FkZXJQbHVnaW46IE9uZSBvZiBjdXN0b20gZXhwcmVzc2lvbnMgaGFzIG5vIG5hbWUuIElnbm9yaW5nIHRoZSBleHByZXNzaW9uJyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZHVwbGljYXRpb24gY2hlY2tcbiAgICAgICAgaWYgKGJsZW5kU2hhcGVOYW1lU2V0LmhhcyhuYW1lKSkge1xuICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgIGBWUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luOiBBbiBleHByZXNzaW9uIHByZXNldCAke3YwUHJlc2V0TmFtZX0gaGFzIGR1cGxpY2F0ZWQgZW50cmllcy4gSWdub3JpbmcgdGhlIGV4cHJlc3Npb25gLFxuICAgICAgICAgICk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgYmxlbmRTaGFwZU5hbWVTZXQuYWRkKG5hbWUpO1xuXG4gICAgICAgIGNvbnN0IGV4cHJlc3Npb24gPSBuZXcgVlJNRXhwcmVzc2lvbihuYW1lKTtcbiAgICAgICAgZ2x0Zi5zY2VuZS5hZGQoZXhwcmVzc2lvbik7XG5cbiAgICAgICAgZXhwcmVzc2lvbi5pc0JpbmFyeSA9IHNjaGVtYUdyb3VwLmlzQmluYXJ5ID8/IGZhbHNlO1xuICAgICAgICAvLyB2MCBkb2Vzbid0IGhhdmUgaWdub3JlIHByb3BlcnRpZXNcblxuICAgICAgICAvLyBCaW5kIG1vcnBoVGFyZ2V0XG4gICAgICAgIGlmIChzY2hlbWFHcm91cC5iaW5kcykge1xuICAgICAgICAgIHNjaGVtYUdyb3VwLmJpbmRzLmZvckVhY2goYXN5bmMgKGJpbmQpID0+IHtcbiAgICAgICAgICAgIGlmIChiaW5kLm1lc2ggPT09IHVuZGVmaW5lZCB8fCBiaW5kLmluZGV4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBub2Rlc1VzaW5nTWVzaDogbnVtYmVyW10gPSBbXTtcbiAgICAgICAgICAgIGpzb24ubm9kZXM/LmZvckVhY2goKG5vZGUsIGkpID0+IHtcbiAgICAgICAgICAgICAgaWYgKG5vZGUubWVzaCA9PT0gYmluZC5tZXNoKSB7XG4gICAgICAgICAgICAgICAgbm9kZXNVc2luZ01lc2gucHVzaChpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChub2Rlc1VzaW5nTWVzaC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgICAgIGBWUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luOiAke3NjaGVtYUdyb3VwLm5hbWV9IGF0dGVtcHRzIHRvIGJpbmQgYSBtb3JwaCB0YXJnZXQgdG8gdGhlIG1lc2ggIyR7YmluZC5tZXNofSBidXQgdGhlIG1lc2ggaXMgbm90IGZvdW5kIG9yIG5vdCB1c2VkIGluIHRoZSBzY2VuZS4gSWdub3JpbmcgdGhlIGJpbmQuYCxcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBtb3JwaFRhcmdldEluZGV4ID0gYmluZC5pbmRleDtcblxuICAgICAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgICAgICAgIG5vZGVzVXNpbmdNZXNoLm1hcChhc3luYyAobm9kZUluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJpbWl0aXZlcyA9IChhd2FpdCBnbHRmRXh0cmFjdFByaW1pdGl2ZXNGcm9tTm9kZShnbHRmLCBub2RlSW5kZXgpKSE7XG5cbiAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgbWVzaCBoYXMgdGhlIHRhcmdldCBtb3JwaCB0YXJnZXRcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAhcHJpbWl0aXZlcy5ldmVyeShcbiAgICAgICAgICAgICAgICAgICAgKHByaW1pdGl2ZSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICBBcnJheS5pc0FycmF5KHByaW1pdGl2ZS5tb3JwaFRhcmdldEluZmx1ZW5jZXMpICYmXG4gICAgICAgICAgICAgICAgICAgICAgbW9ycGhUYXJnZXRJbmRleCA8IHByaW1pdGl2ZS5tb3JwaFRhcmdldEluZmx1ZW5jZXMubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgICAgICAgICBgVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbjogJHtzY2hlbWFHcm91cC5uYW1lfSBhdHRlbXB0cyB0byBpbmRleCAke21vcnBoVGFyZ2V0SW5kZXh9dGggbW9ycGggYnV0IG5vdCBmb3VuZC5gLFxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBleHByZXNzaW9uLmFkZEJpbmQoXG4gICAgICAgICAgICAgICAgICBuZXcgVlJNRXhwcmVzc2lvbk1vcnBoVGFyZ2V0QmluZCh7XG4gICAgICAgICAgICAgICAgICAgIHByaW1pdGl2ZXMsXG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiBtb3JwaFRhcmdldEluZGV4LFxuICAgICAgICAgICAgICAgICAgICB3ZWlnaHQ6IDAuMDEgKiAoYmluZC53ZWlnaHQgPz8gMTAwKSwgLy8gbmFycm93aW5nIHRoZSByYW5nZSBmcm9tIFsgMC4wIC0gMTAwLjAgXSB0byBbIDAuMCAtIDEuMCBdXG4gICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCaW5kIE1hdGVyaWFsQ29sb3IgYW5kIFRleHR1cmVUcmFuc2Zvcm1cbiAgICAgICAgY29uc3QgbWF0ZXJpYWxWYWx1ZXMgPSBzY2hlbWFHcm91cC5tYXRlcmlhbFZhbHVlcztcbiAgICAgICAgaWYgKG1hdGVyaWFsVmFsdWVzICYmIG1hdGVyaWFsVmFsdWVzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgIG1hdGVyaWFsVmFsdWVzLmZvckVhY2goKG1hdGVyaWFsVmFsdWUpID0+IHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgbWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbE5hbWUgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICBtYXRlcmlhbFZhbHVlLnByb3BlcnR5TmFtZSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgIG1hdGVyaWFsVmFsdWUudGFyZ2V0VmFsdWUgPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBcdTMwQTJcdTMwRDBcdTMwQkZcdTMwRkNcdTMwNkVcdTMwQUFcdTMwRDZcdTMwQjhcdTMwQTdcdTMwQUZcdTMwQzhcdTMwNkJcdThBMkRcdTVCOUFcdTMwNTVcdTMwOENcdTMwNjZcdTMwNDRcdTMwOEJcdTMwREVcdTMwQzZcdTMwRUFcdTMwQTJcdTMwRUJcdTMwNkVcdTUxODVcdTMwNEJcdTMwODlcbiAgICAgICAgICAgICAqIG1hdGVyaWFsVmFsdWVcdTMwNjdcdTYzMDdcdTVCOUFcdTMwNTVcdTMwOENcdTMwNjZcdTMwNDRcdTMwOEJcdTMwREVcdTMwQzZcdTMwRUFcdTMwQTJcdTMwRUJcdTMwOTJcdTk2QzZcdTMwODFcdTMwOEJcdTMwMDJcbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBcdTcyNzlcdTVCOUFcdTMwNkJcdTMwNkZcdTU0MERcdTUyNERcdTMwOTJcdTRGN0ZcdTc1MjhcdTMwNTlcdTMwOEJcdTMwMDJcbiAgICAgICAgICAgICAqIFx1MzBBMlx1MzBBNlx1MzBDOFx1MzBFOVx1MzBBNFx1MzBGM1x1NjNDRlx1NzUzQlx1NzUyOFx1MzA2RVx1MzBERVx1MzBDNlx1MzBFQVx1MzBBMlx1MzBFQlx1MzA4Mlx1NTQwQ1x1NjY0Mlx1MzA2Qlx1OTZDNlx1MzA4MVx1MzA4Qlx1MzAwMlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBjb25zdCBtYXRlcmlhbHM6IFRIUkVFLk1hdGVyaWFsW10gPSBbXTtcbiAgICAgICAgICAgIGdsdGYuc2NlbmUudHJhdmVyc2UoKG9iamVjdCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoKG9iamVjdCBhcyBhbnkpLm1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWw6IFRIUkVFLk1hdGVyaWFsW10gfCBUSFJFRS5NYXRlcmlhbCA9IChvYmplY3QgYXMgYW55KS5tYXRlcmlhbDtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShtYXRlcmlhbCkpIHtcbiAgICAgICAgICAgICAgICAgIG1hdGVyaWFscy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAuLi5tYXRlcmlhbC5maWx0ZXIoXG4gICAgICAgICAgICAgICAgICAgICAgKG10bCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIChtdGwubmFtZSA9PT0gbWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbE5hbWUhIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG10bC5uYW1lID09PSBtYXRlcmlhbFZhbHVlLm1hdGVyaWFsTmFtZSEgKyAnIChPdXRsaW5lKScpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbHMuaW5kZXhPZihtdGwpID09PSAtMSxcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChtYXRlcmlhbC5uYW1lID09PSBtYXRlcmlhbFZhbHVlLm1hdGVyaWFsTmFtZSAmJiBtYXRlcmlhbHMuaW5kZXhPZihtYXRlcmlhbCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICBtYXRlcmlhbHMucHVzaChtYXRlcmlhbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWxQcm9wZXJ0eU5hbWUgPSBtYXRlcmlhbFZhbHVlLnByb3BlcnR5TmFtZTtcbiAgICAgICAgICAgIG1hdGVyaWFscy5mb3JFYWNoKChtYXRlcmlhbCkgPT4ge1xuICAgICAgICAgICAgICAvLyBUZXh0dXJlVHJhbnNmb3JtQmluZFxuICAgICAgICAgICAgICBpZiAobWF0ZXJpYWxQcm9wZXJ0eU5hbWUgPT09ICdfTWFpblRleF9TVCcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzY2FsZSA9IG5ldyBUSFJFRS5WZWN0b3IyKG1hdGVyaWFsVmFsdWUudGFyZ2V0VmFsdWUhWzBdLCBtYXRlcmlhbFZhbHVlLnRhcmdldFZhbHVlIVsxXSk7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gbmV3IFRIUkVFLlZlY3RvcjIobWF0ZXJpYWxWYWx1ZS50YXJnZXRWYWx1ZSFbMl0sIG1hdGVyaWFsVmFsdWUudGFyZ2V0VmFsdWUhWzNdKTtcblxuICAgICAgICAgICAgICAgIG9mZnNldC55ID0gMS4wIC0gb2Zmc2V0LnkgLSBzY2FsZS55O1xuXG4gICAgICAgICAgICAgICAgZXhwcmVzc2lvbi5hZGRCaW5kKFxuICAgICAgICAgICAgICAgICAgbmV3IFZSTUV4cHJlc3Npb25UZXh0dXJlVHJhbnNmb3JtQmluZCh7XG4gICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsLFxuICAgICAgICAgICAgICAgICAgICBzY2FsZSxcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0LFxuICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIC8vIE1hdGVyaWFsQ29sb3JCaW5kXG4gICAgICAgICAgICAgIGNvbnN0IG1hdGVyaWFsQ29sb3JUeXBlID0gdjBFeHByZXNzaW9uTWF0ZXJpYWxDb2xvck1hcFttYXRlcmlhbFByb3BlcnR5TmFtZV07XG4gICAgICAgICAgICAgIGlmIChtYXRlcmlhbENvbG9yVHlwZSkge1xuICAgICAgICAgICAgICAgIGV4cHJlc3Npb24uYWRkQmluZChcbiAgICAgICAgICAgICAgICAgIG5ldyBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvckJpbmQoe1xuICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbCxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogbWF0ZXJpYWxDb2xvclR5cGUsXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFZhbHVlOiBuZXcgVEhSRUUuQ29sb3IoKS5mcm9tQXJyYXkobWF0ZXJpYWxWYWx1ZS50YXJnZXRWYWx1ZSEpLFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRBbHBoYTogbWF0ZXJpYWxWYWx1ZS50YXJnZXRWYWx1ZSFbM10sXG4gICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgY29uc29sZS53YXJuKG1hdGVyaWFsUHJvcGVydHlOYW1lICsgJyBpcyBub3Qgc3VwcG9ydGVkJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIG1hbmFnZXIucmVnaXN0ZXJFeHByZXNzaW9uKGV4cHJlc3Npb24pO1xuICAgICAgfSksXG4gICAgKTtcblxuICAgIHJldHVybiBtYW5hZ2VyO1xuICB9XG59XG4iLCAiaW1wb3J0IHR5cGUgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgdHlwZSB7IEdMVEYgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyLmpzJztcbmltcG9ydCB7IEdMVEYgYXMgR0xURlNjaGVtYSB9IGZyb20gJ0BnbHRmLXRyYW5zZm9ybS9jb3JlJztcblxuZnVuY3Rpb24gZXh0cmFjdFByaW1pdGl2ZXNJbnRlcm5hbChnbHRmOiBHTFRGLCBub2RlSW5kZXg6IG51bWJlciwgbm9kZTogVEhSRUUuT2JqZWN0M0QpOiBUSFJFRS5NZXNoW10gfCBudWxsIHtcbiAgY29uc3QganNvbiA9IGdsdGYucGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAvKipcbiAgICogTGV0J3MgbGlzdCB1cCBldmVyeSBwb3NzaWJsZSBwYXR0ZXJucyB0aGF0IHBhcnNlZCBnbHRmIG5vZGVzIHdpdGggYSBtZXNoIGNhbiBoYXZlLCwsXG4gICAqXG4gICAqIFwiKlwiIGluZGljYXRlcyB0aGF0IHRob3NlIG1lc2hlcyBzaG91bGQgYmUgbGlzdGVkIHVwIHVzaW5nIHRoaXMgZnVuY3Rpb25cbiAgICpcbiAgICogIyMjIEEgbm9kZSB3aXRoIGEgKG1lc2gsIGEgc2lnbmxlIHByaW1pdGl2ZSlcbiAgICpcbiAgICogLSBgVEhSRUUuTWVzaGA6IFRoZSBvbmx5IHByaW1pdGl2ZSBvZiB0aGUgbWVzaCAqXG4gICAqXG4gICAqICMjIyBBIG5vZGUgd2l0aCBhIChtZXNoLCBtdWx0aXBsZSBwcmltaXRpdmVzKVxuICAgKlxuICAgKiAtIGBUSFJFRS5Hcm91cGA6IFRoZSByb290IG9mIHRoZSBtZXNoXG4gICAqICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoICpcbiAgICogICAtIGBUSFJFRS5NZXNoYDogQSBwcmltaXRpdmUgb2YgdGhlIG1lc2ggKDIpICpcbiAgICpcbiAgICogIyMjIEEgbm9kZSB3aXRoIGEgKG1lc2gsIG11bHRpcGxlIHByaW1pdGl2ZXMpIEFORCAoYSBjaGlsZCB3aXRoIGEgbWVzaCwgYSBzaW5nbGUgcHJpbWl0aXZlKVxuICAgKlxuICAgKiAtIGBUSFJFRS5Hcm91cGA6IFRoZSByb290IG9mIHRoZSBtZXNoXG4gICAqICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoICpcbiAgICogICAtIGBUSFJFRS5NZXNoYDogQSBwcmltaXRpdmUgb2YgdGhlIG1lc2ggKDIpICpcbiAgICogICAtIGBUSFJFRS5NZXNoYDogQSBwcmltaXRpdmUgb2YgYSBNRVNIIE9GIFRIRSBDSElMRFxuICAgKlxuICAgKiAjIyMgQSBub2RlIHdpdGggYSAobWVzaCwgbXVsdGlwbGUgcHJpbWl0aXZlcykgQU5EIChhIGNoaWxkIHdpdGggYSBtZXNoLCBtdWx0aXBsZSBwcmltaXRpdmVzKVxuICAgKlxuICAgKiAtIGBUSFJFRS5Hcm91cGA6IFRoZSByb290IG9mIHRoZSBtZXNoXG4gICAqICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoICpcbiAgICogICAtIGBUSFJFRS5NZXNoYDogQSBwcmltaXRpdmUgb2YgdGhlIG1lc2ggKDIpICpcbiAgICogICAtIGBUSFJFRS5Hcm91cGA6IFRoZSByb290IG9mIGEgTUVTSCBPRiBUSEUgQ0hJTERcbiAgICogICAgIC0gYFRIUkVFLk1lc2hgOiBBIHByaW1pdGl2ZSBvZiB0aGUgbWVzaCBvZiB0aGUgY2hpbGRcbiAgICogICAgIC0gYFRIUkVFLk1lc2hgOiBBIHByaW1pdGl2ZSBvZiB0aGUgbWVzaCBvZiB0aGUgY2hpbGQgKDIpXG4gICAqXG4gICAqICMjIyBBIG5vZGUgd2l0aCBhIChtZXNoLCBtdWx0aXBsZSBwcmltaXRpdmVzKSBCVVQgdGhlIG5vZGUgaXMgYSBib25lXG4gICAqXG4gICAqIC0gYFRIUkVFLkJvbmVgOiBUaGUgcm9vdCBvZiB0aGUgbm9kZSwgYXMgYSBib25lXG4gICAqICAgLSBgVEhSRUUuR3JvdXBgOiBUaGUgcm9vdCBvZiB0aGUgbWVzaFxuICAgKiAgICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoICpcbiAgICogICAgIC0gYFRIUkVFLk1lc2hgOiBBIHByaW1pdGl2ZSBvZiB0aGUgbWVzaCAoMikgKlxuICAgKlxuICAgKiAjIyMgQSBub2RlIHdpdGggYSAobWVzaCwgbXVsdGlwbGUgcHJpbWl0aXZlcykgQU5EIChhIGNoaWxkIHdpdGggYSBtZXNoLCBtdWx0aXBsZSBwcmltaXRpdmVzKSBCVVQgdGhlIG5vZGUgaXMgYSBib25lXG4gICAqXG4gICAqIC0gYFRIUkVFLkJvbmVgOiBUaGUgcm9vdCBvZiB0aGUgbm9kZSwgYXMgYSBib25lXG4gICAqICAgLSBgVEhSRUUuR3JvdXBgOiBUaGUgcm9vdCBvZiB0aGUgbWVzaFxuICAgKiAgICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoICpcbiAgICogICAgIC0gYFRIUkVFLk1lc2hgOiBBIHByaW1pdGl2ZSBvZiB0aGUgbWVzaCAoMikgKlxuICAgKiAgIC0gYFRIUkVFLkdyb3VwYDogVGhlIHJvb3Qgb2YgYSBNRVNIIE9GIFRIRSBDSElMRFxuICAgKiAgICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoIG9mIHRoZSBjaGlsZFxuICAgKiAgICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoIG9mIHRoZSBjaGlsZCAoMilcbiAgICpcbiAgICogLi4uSSB3aWxsIHRha2UgYSBzdHJhdGVneSB0aGF0IHRyYXZlcnNlcyB0aGUgcm9vdCBvZiB0aGUgbm9kZSBhbmQgdGFrZSBmaXJzdCAocHJpbWl0aXZlQ291bnQpIG1lc2hlcy5cbiAgICovXG5cbiAgLy8gTWFrZSBzdXJlIHRoYXQgdGhlIG5vZGUgaGFzIGEgbWVzaFxuICBjb25zdCBzY2hlbWFOb2RlID0ganNvbi5ub2Rlcz8uW25vZGVJbmRleF07XG4gIGlmIChzY2hlbWFOb2RlID09IG51bGwpIHtcbiAgICBjb25zb2xlLndhcm4oYGV4dHJhY3RQcmltaXRpdmVzSW50ZXJuYWw6IEF0dGVtcHQgdG8gdXNlIG5vZGVzWyR7bm9kZUluZGV4fV0gb2YgZ2xURiBidXQgdGhlIG5vZGUgZG9lc24ndCBleGlzdGApO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3QgbWVzaEluZGV4ID0gc2NoZW1hTm9kZS5tZXNoO1xuICBpZiAobWVzaEluZGV4ID09IG51bGwpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIEhvdyBtYW55IHByaW1pdGl2ZXMgdGhlIG1lc2ggaGFzP1xuICBjb25zdCBzY2hlbWFNZXNoID0ganNvbi5tZXNoZXM/LlttZXNoSW5kZXhdO1xuICBpZiAoc2NoZW1hTWVzaCA9PSBudWxsKSB7XG4gICAgY29uc29sZS53YXJuKGBleHRyYWN0UHJpbWl0aXZlc0ludGVybmFsOiBBdHRlbXB0IHRvIHVzZSBtZXNoZXNbJHttZXNoSW5kZXh9XSBvZiBnbFRGIGJ1dCB0aGUgbWVzaCBkb2Vzbid0IGV4aXN0YCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCBwcmltaXRpdmVDb3VudCA9IHNjaGVtYU1lc2gucHJpbWl0aXZlcy5sZW5ndGg7XG5cbiAgLy8gVHJhdmVyc2UgdGhlIG5vZGUgYW5kIHRha2UgZmlyc3QgKHByaW1pdGl2ZUNvdW50KSBtZXNoZXNcbiAgY29uc3QgcHJpbWl0aXZlczogVEhSRUUuTWVzaFtdID0gW107XG4gIG5vZGUudHJhdmVyc2UoKG9iamVjdCkgPT4ge1xuICAgIGlmIChwcmltaXRpdmVzLmxlbmd0aCA8IHByaW1pdGl2ZUNvdW50KSB7XG4gICAgICBpZiAoKG9iamVjdCBhcyBhbnkpLmlzTWVzaCkge1xuICAgICAgICBwcmltaXRpdmVzLnB1c2gob2JqZWN0IGFzIFRIUkVFLk1lc2gpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHByaW1pdGl2ZXM7XG59XG5cbi8qKlxuICogRXh0cmFjdCBwcmltaXRpdmVzICggYFRIUkVFLk1lc2hbXWAgKSBvZiBhIG5vZGUgZnJvbSBhIGxvYWRlZCBHTFRGLlxuICogVGhlIG1haW4gcHVycG9zZSBvZiB0aGlzIGZ1bmN0aW9uIGlzIHRvIGRpc3Rpbmd1aXNoIHByaW1pdGl2ZXMgYW5kIGNoaWxkcmVuIGZyb20gYSBub2RlIHRoYXQgaGFzIGJvdGggbWVzaGVzIGFuZCBjaGlsZHJlbi5cbiAqXG4gKiBJdCB1dGlsaXplcyB0aGUgYmVoYXZpb3IgdGhhdCBHTFRGTG9hZGVyIGFkZHMgbWVzaCBwcmltaXRpdmVzIHRvIHRoZSBub2RlIG9iamVjdCAoIGBUSFJFRS5Hcm91cGAgKSBmaXJzdCB0aGVuIGFkZHMgaXRzIGNoaWxkcmVuLlxuICpcbiAqIEBwYXJhbSBnbHRmIEEgR0xURiBvYmplY3QgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gKiBAcGFyYW0gbm9kZUluZGV4IFRoZSBpbmRleCBvZiB0aGUgbm9kZVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGUoZ2x0ZjogR0xURiwgbm9kZUluZGV4OiBudW1iZXIpOiBQcm9taXNlPFRIUkVFLk1lc2hbXSB8IG51bGw+IHtcbiAgY29uc3Qgbm9kZTogVEhSRUUuT2JqZWN0M0QgPSBhd2FpdCBnbHRmLnBhcnNlci5nZXREZXBlbmRlbmN5KCdub2RlJywgbm9kZUluZGV4KTtcbiAgcmV0dXJuIGV4dHJhY3RQcmltaXRpdmVzSW50ZXJuYWwoZ2x0Ziwgbm9kZUluZGV4LCBub2RlKTtcbn1cblxuLyoqXG4gKiBFeHRyYWN0IHByaW1pdGl2ZXMgKCBgVEhSRUUuTWVzaFtdYCApIG9mIG5vZGVzIGZyb20gYSBsb2FkZWQgR0xURi5cbiAqIFNlZSB7QGxpbmsgZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGV9IGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogSXQgcmV0dXJucyBhIG1hcCBmcm9tIG5vZGUgaW5kZXggdG8gZXh0cmFjdGlvbiByZXN1bHQuXG4gKiBJZiBhIG5vZGUgZG9lcyBub3QgaGF2ZSBhIG1lc2gsIHRoZSBlbnRyeSBmb3IgdGhlIG5vZGUgd2lsbCBub3QgYmUgcHV0IGluIHRoZSByZXR1cm5pbmcgbWFwLlxuICpcbiAqIEBwYXJhbSBnbHRmIEEgR0xURiBvYmplY3QgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnbHRmRXh0cmFjdFByaW1pdGl2ZXNGcm9tTm9kZXMoZ2x0ZjogR0xURik6IFByb21pc2U8TWFwPG51bWJlciwgVEhSRUUuTWVzaFtdPj4ge1xuICBjb25zdCBub2RlczogVEhSRUUuT2JqZWN0M0RbXSA9IGF3YWl0IGdsdGYucGFyc2VyLmdldERlcGVuZGVuY2llcygnbm9kZScpO1xuICBjb25zdCBtYXAgPSBuZXcgTWFwPG51bWJlciwgVEhSRUUuTWVzaFtdPigpO1xuXG4gIG5vZGVzLmZvckVhY2goKG5vZGUsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gZXh0cmFjdFByaW1pdGl2ZXNJbnRlcm5hbChnbHRmLCBpbmRleCwgbm9kZSk7XG4gICAgaWYgKHJlc3VsdCAhPSBudWxsKSB7XG4gICAgICBtYXAuc2V0KGluZGV4LCByZXN1bHQpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIG1hcDtcbn1cbiIsICIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cblxuZXhwb3J0IGNvbnN0IFZSTUV4cHJlc3Npb25QcmVzZXROYW1lID0ge1xuICBBYTogJ2FhJyxcbiAgSWg6ICdpaCcsXG4gIE91OiAnb3UnLFxuICBFZTogJ2VlJyxcbiAgT2g6ICdvaCcsXG4gIEJsaW5rOiAnYmxpbmsnLFxuICBIYXBweTogJ2hhcHB5JyxcbiAgQW5ncnk6ICdhbmdyeScsXG4gIFNhZDogJ3NhZCcsXG4gIFJlbGF4ZWQ6ICdyZWxheGVkJyxcbiAgTG9va1VwOiAnbG9va1VwJyxcbiAgU3VycHJpc2VkOiAnc3VycHJpc2VkJyxcbiAgTG9va0Rvd246ICdsb29rRG93bicsXG4gIExvb2tMZWZ0OiAnbG9va0xlZnQnLFxuICBMb29rUmlnaHQ6ICdsb29rUmlnaHQnLFxuICBCbGlua0xlZnQ6ICdibGlua0xlZnQnLFxuICBCbGlua1JpZ2h0OiAnYmxpbmtSaWdodCcsXG4gIE5ldXRyYWw6ICduZXV0cmFsJyxcbn0gYXMgY29uc3Q7XG5cbmV4cG9ydCB0eXBlIFZSTUV4cHJlc3Npb25QcmVzZXROYW1lID0gKHR5cGVvZiBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSlba2V5b2YgdHlwZW9mIFZSTUV4cHJlc3Npb25QcmVzZXROYW1lXTtcbiIsICIvKipcbiAqIENsYW1wIHRoZSBpbnB1dCB2YWx1ZSB3aXRoaW4gWzAuMCAtIDEuMF0uXG4gKlxuICogQHBhcmFtIHZhbHVlIFRoZSBpbnB1dCB2YWx1ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2F0dXJhdGUodmFsdWU6IG51bWJlcik6IG51bWJlciB7XG4gIHJldHVybiBNYXRoLm1heChNYXRoLm1pbih2YWx1ZSwgMS4wKSwgMC4wKTtcbn1cbiIsICJpbXBvcnQgeyBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSB9IGZyb20gJy4vVlJNRXhwcmVzc2lvblByZXNldE5hbWUnO1xuaW1wb3J0IHsgc2F0dXJhdGUgfSBmcm9tICcuLi91dGlscy9zYXR1cmF0ZSc7XG5pbXBvcnQgdHlwZSB7IFZSTUV4cHJlc3Npb24gfSBmcm9tICcuL1ZSTUV4cHJlc3Npb24nO1xuXG5leHBvcnQgY2xhc3MgVlJNRXhwcmVzc2lvbk1hbmFnZXIge1xuICAvKipcbiAgICogQSBzZXQgb2YgbmFtZSBvciBwcmVzZXQgbmFtZSBvZiBleHByZXNzaW9ucyB0aGF0IHdpbGwgYmUgb3ZlcnJpZGRlbiBieSB7QGxpbmsgVlJNRXhwcmVzc2lvbi5vdmVycmlkZUJsaW5rfS5cbiAgICovXG4gIHB1YmxpYyBibGlua0V4cHJlc3Npb25OYW1lcyA9IFsnYmxpbmsnLCAnYmxpbmtMZWZ0JywgJ2JsaW5rUmlnaHQnXTtcblxuICAvKipcbiAgICogQSBzZXQgb2YgbmFtZSBvciBwcmVzZXQgbmFtZSBvZiBleHByZXNzaW9ucyB0aGF0IHdpbGwgYmUgb3ZlcnJpZGRlbiBieSB7QGxpbmsgVlJNRXhwcmVzc2lvbi5vdmVycmlkZUxvb2tBdH0uXG4gICAqL1xuICBwdWJsaWMgbG9va0F0RXhwcmVzc2lvbk5hbWVzID0gWydsb29rTGVmdCcsICdsb29rUmlnaHQnLCAnbG9va1VwJywgJ2xvb2tEb3duJ107XG5cbiAgLyoqXG4gICAqIEEgc2V0IG9mIG5hbWUgb3IgcHJlc2V0IG5hbWUgb2YgZXhwcmVzc2lvbnMgdGhhdCB3aWxsIGJlIG92ZXJyaWRkZW4gYnkge0BsaW5rIFZSTUV4cHJlc3Npb24ub3ZlcnJpZGVNb3V0aH0uXG4gICAqL1xuICBwdWJsaWMgbW91dGhFeHByZXNzaW9uTmFtZXMgPSBbJ2FhJywgJ2VlJywgJ2loJywgJ29oJywgJ291J107XG5cbiAgLyoqXG4gICAqIEEgc2V0IG9mIHtAbGluayBWUk1FeHByZXNzaW9ufS5cbiAgICogV2hlbiB5b3Ugd2FudCB0byByZWdpc3RlciBleHByZXNzaW9ucywgdXNlIHtAbGluayByZWdpc3RlckV4cHJlc3Npb259XG4gICAqL1xuICBwcml2YXRlIF9leHByZXNzaW9uczogVlJNRXhwcmVzc2lvbltdID0gW107XG4gIHB1YmxpYyBnZXQgZXhwcmVzc2lvbnMoKTogVlJNRXhwcmVzc2lvbltdIHtcbiAgICByZXR1cm4gdGhpcy5fZXhwcmVzc2lvbnMuY29uY2F0KCk7XG4gIH1cblxuICAvKipcbiAgICogQSBtYXAgZnJvbSBuYW1lIHRvIGV4cHJlc3Npb24uXG4gICAqL1xuICBwcml2YXRlIF9leHByZXNzaW9uTWFwOiB7IFtuYW1lOiBzdHJpbmddOiBWUk1FeHByZXNzaW9uIH0gPSB7fTtcbiAgcHVibGljIGdldCBleHByZXNzaW9uTWFwKCk6IHsgW25hbWU6IHN0cmluZ106IFZSTUV4cHJlc3Npb24gfSB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHRoaXMuX2V4cHJlc3Npb25NYXApO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgbWFwIGZyb20gbmFtZSB0byBleHByZXNzaW9uLCBidXQgZXhjbHVkaW5nIGN1c3RvbSBleHByZXNzaW9ucy5cbiAgICovXG4gIHB1YmxpYyBnZXQgcHJlc2V0RXhwcmVzc2lvbk1hcCgpOiB7IFtuYW1lIGluIFZSTUV4cHJlc3Npb25QcmVzZXROYW1lXT86IFZSTUV4cHJlc3Npb24gfSB7XG4gICAgY29uc3QgcmVzdWx0OiB7IFtuYW1lIGluIFZSTUV4cHJlc3Npb25QcmVzZXROYW1lXT86IFZSTUV4cHJlc3Npb24gfSA9IHt9O1xuXG4gICAgY29uc3QgcHJlc2V0TmFtZVNldCA9IG5ldyBTZXQ8c3RyaW5nPihPYmplY3QudmFsdWVzKFZSTUV4cHJlc3Npb25QcmVzZXROYW1lKSk7XG5cbiAgICBPYmplY3QuZW50cmllcyh0aGlzLl9leHByZXNzaW9uTWFwKS5mb3JFYWNoKChbbmFtZSwgZXhwcmVzc2lvbl0pID0+IHtcbiAgICAgIGlmIChwcmVzZXROYW1lU2V0LmhhcyhuYW1lKSkge1xuICAgICAgICByZXN1bHRbbmFtZSBhcyBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZV0gPSBleHByZXNzaW9uO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIG1hcCBmcm9tIG5hbWUgdG8gZXhwcmVzc2lvbiwgYnV0IGV4Y2x1ZGluZyBwcmVzZXQgZXhwcmVzc2lvbnMuXG4gICAqL1xuICBwdWJsaWMgZ2V0IGN1c3RvbUV4cHJlc3Npb25NYXAoKTogeyBbbmFtZTogc3RyaW5nXTogVlJNRXhwcmVzc2lvbiB9IHtcbiAgICBjb25zdCByZXN1bHQ6IHsgW25hbWU6IHN0cmluZ106IFZSTUV4cHJlc3Npb24gfSA9IHt9O1xuXG4gICAgY29uc3QgcHJlc2V0TmFtZVNldCA9IG5ldyBTZXQ8c3RyaW5nPihPYmplY3QudmFsdWVzKFZSTUV4cHJlc3Npb25QcmVzZXROYW1lKSk7XG5cbiAgICBPYmplY3QuZW50cmllcyh0aGlzLl9leHByZXNzaW9uTWFwKS5mb3JFYWNoKChbbmFtZSwgZXhwcmVzc2lvbl0pID0+IHtcbiAgICAgIGlmICghcHJlc2V0TmFtZVNldC5oYXMobmFtZSkpIHtcbiAgICAgICAgcmVzdWx0W25hbWVdID0gZXhwcmVzc2lvbjtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IHtAbGluayBWUk1FeHByZXNzaW9uTWFuYWdlcn0uXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gZG8gbm90aGluZ1xuICB9XG5cbiAgLyoqXG4gICAqIENvcHkgdGhlIGdpdmVuIHtAbGluayBWUk1FeHByZXNzaW9uTWFuYWdlcn0gaW50byB0aGlzIG9uZS5cbiAgICogQHBhcmFtIHNvdXJjZSBUaGUge0BsaW5rIFZSTUV4cHJlc3Npb25NYW5hZ2VyfSB5b3Ugd2FudCB0byBjb3B5XG4gICAqIEByZXR1cm5zIHRoaXNcbiAgICovXG4gIHB1YmxpYyBjb3B5KHNvdXJjZTogVlJNRXhwcmVzc2lvbk1hbmFnZXIpOiB0aGlzIHtcbiAgICAvLyBmaXJzdCB1bnJlZ2lzdGVyIGFsbCB0aGUgZXhwcmVzc2lvbiBpdCBoYXNcbiAgICBjb25zdCBleHByZXNzaW9ucyA9IHRoaXMuX2V4cHJlc3Npb25zLmNvbmNhdCgpO1xuICAgIGV4cHJlc3Npb25zLmZvckVhY2goKGV4cHJlc3Npb24pID0+IHtcbiAgICAgIHRoaXMudW5yZWdpc3RlckV4cHJlc3Npb24oZXhwcmVzc2lvbik7XG4gICAgfSk7XG5cbiAgICAvLyB0aGVuIHJlZ2lzdGVyIGFsbCB0aGUgZXhwcmVzc2lvbiBvZiB0aGUgc291cmNlXG4gICAgc291cmNlLl9leHByZXNzaW9ucy5mb3JFYWNoKChleHByZXNzaW9uKSA9PiB7XG4gICAgICB0aGlzLnJlZ2lzdGVyRXhwcmVzc2lvbihleHByZXNzaW9uKTtcbiAgICB9KTtcblxuICAgIC8vIGNvcHkgcmVtYWluaW5nIG1lbWJlcnNcbiAgICB0aGlzLmJsaW5rRXhwcmVzc2lvbk5hbWVzID0gc291cmNlLmJsaW5rRXhwcmVzc2lvbk5hbWVzLmNvbmNhdCgpO1xuICAgIHRoaXMubG9va0F0RXhwcmVzc2lvbk5hbWVzID0gc291cmNlLmxvb2tBdEV4cHJlc3Npb25OYW1lcy5jb25jYXQoKTtcbiAgICB0aGlzLm1vdXRoRXhwcmVzc2lvbk5hbWVzID0gc291cmNlLm1vdXRoRXhwcmVzc2lvbk5hbWVzLmNvbmNhdCgpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGNsb25lIG9mIHRoaXMge0BsaW5rIFZSTUV4cHJlc3Npb25NYW5hZ2VyfS5cbiAgICogQHJldHVybnMgQ29waWVkIHtAbGluayBWUk1FeHByZXNzaW9uTWFuYWdlcn1cbiAgICovXG4gIHB1YmxpYyBjbG9uZSgpOiBWUk1FeHByZXNzaW9uTWFuYWdlciB7XG4gICAgcmV0dXJuIG5ldyBWUk1FeHByZXNzaW9uTWFuYWdlcigpLmNvcHkodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGEgcmVnaXN0ZXJlZCBleHByZXNzaW9uLlxuICAgKiBJZiBpdCBjYW5ub3QgZmluZCBhbiBleHByZXNzaW9uLCBpdCB3aWxsIHJldHVybiBgbnVsbGAgaW5zdGVhZC5cbiAgICpcbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvciBwcmVzZXQgbmFtZSBvZiB0aGUgZXhwcmVzc2lvblxuICAgKi9cbiAgcHVibGljIGdldEV4cHJlc3Npb24obmFtZTogVlJNRXhwcmVzc2lvblByZXNldE5hbWUgfCBzdHJpbmcpOiBWUk1FeHByZXNzaW9uIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX2V4cHJlc3Npb25NYXBbbmFtZV0gPz8gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBhbiBleHByZXNzaW9uLlxuICAgKlxuICAgKiBAcGFyYW0gZXhwcmVzc2lvbiB7QGxpbmsgVlJNRXhwcmVzc2lvbn0gdGhhdCBkZXNjcmliZXMgdGhlIGV4cHJlc3Npb25cbiAgICovXG4gIHB1YmxpYyByZWdpc3RlckV4cHJlc3Npb24oZXhwcmVzc2lvbjogVlJNRXhwcmVzc2lvbik6IHZvaWQge1xuICAgIHRoaXMuX2V4cHJlc3Npb25zLnB1c2goZXhwcmVzc2lvbik7XG4gICAgdGhpcy5fZXhwcmVzc2lvbk1hcFtleHByZXNzaW9uLmV4cHJlc3Npb25OYW1lXSA9IGV4cHJlc3Npb247XG4gIH1cblxuICAvKipcbiAgICogVW5yZWdpc3RlciBhbiBleHByZXNzaW9uLlxuICAgKlxuICAgKiBAcGFyYW0gZXhwcmVzc2lvbiBUaGUgZXhwcmVzc2lvbiB5b3Ugd2FudCB0byB1bnJlZ2lzdGVyXG4gICAqL1xuICBwdWJsaWMgdW5yZWdpc3RlckV4cHJlc3Npb24oZXhwcmVzc2lvbjogVlJNRXhwcmVzc2lvbik6IHZvaWQge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fZXhwcmVzc2lvbnMuaW5kZXhPZihleHByZXNzaW9uKTtcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1ZSTUV4cHJlc3Npb25NYW5hZ2VyOiBUaGUgc3BlY2lmaWVkIGV4cHJlc3Npb25zIGlzIG5vdCByZWdpc3RlcmVkJyk7XG4gICAgfVxuXG4gICAgdGhpcy5fZXhwcmVzc2lvbnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICBkZWxldGUgdGhpcy5fZXhwcmVzc2lvbk1hcFtleHByZXNzaW9uLmV4cHJlc3Npb25OYW1lXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGN1cnJlbnQgd2VpZ2h0IG9mIHRoZSBzcGVjaWZpZWQgZXhwcmVzc2lvbi5cbiAgICogSWYgaXQgZG9lc24ndCBoYXZlIGFuIGV4cHJlc3Npb24gb2YgZ2l2ZW4gbmFtZSwgaXQgd2lsbCByZXR1cm4gYG51bGxgIGluc3RlYWQuXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGV4cHJlc3Npb25cbiAgICovXG4gIHB1YmxpYyBnZXRWYWx1ZShuYW1lOiBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSB8IHN0cmluZyk6IG51bWJlciB8IG51bGwge1xuICAgIGNvbnN0IGV4cHJlc3Npb24gPSB0aGlzLmdldEV4cHJlc3Npb24obmFtZSk7XG4gICAgcmV0dXJuIGV4cHJlc3Npb24/LndlaWdodCA/PyBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBhIHdlaWdodCB0byB0aGUgc3BlY2lmaWVkIGV4cHJlc3Npb24uXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGV4cHJlc3Npb25cbiAgICogQHBhcmFtIHdlaWdodCBXZWlnaHRcbiAgICovXG4gIHB1YmxpYyBzZXRWYWx1ZShuYW1lOiBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSB8IHN0cmluZywgd2VpZ2h0OiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBleHByZXNzaW9uID0gdGhpcy5nZXRFeHByZXNzaW9uKG5hbWUpO1xuICAgIGlmIChleHByZXNzaW9uKSB7XG4gICAgICBleHByZXNzaW9uLndlaWdodCA9IHNhdHVyYXRlKHdlaWdodCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHdlaWdodHMgb2YgYWxsIGV4cHJlc3Npb25zIHRvIGAwLjBgLlxuICAgKi9cbiAgcHVibGljIHJlc2V0VmFsdWVzKCk6IHZvaWQge1xuICAgIHRoaXMuX2V4cHJlc3Npb25zLmZvckVhY2goKGV4cHJlc3Npb24pID0+IHtcbiAgICAgIGV4cHJlc3Npb24ud2VpZ2h0ID0gMC4wO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIHRyYWNrIG5hbWUgb2Ygc3BlY2lmaWVkIGV4cHJlc3Npb24uXG4gICAqIFRoaXMgdHJhY2sgbmFtZSBpcyBuZWVkZWQgdG8gbWFuaXB1bGF0ZSBpdHMgZXhwcmVzc2lvbiB2aWEga2V5ZnJhbWUgYW5pbWF0aW9ucy5cbiAgICpcbiAgICogQGV4YW1wbGUgTWFuaXB1bGF0ZSBhbiBleHByZXNzaW9uIHVzaW5nIGtleWZyYW1lIGFuaW1hdGlvblxuICAgKiBgYGBqc1xuICAgKiBjb25zdCB0cmFja05hbWUgPSB2cm0uZXhwcmVzc2lvbk1hbmFnZXIuZ2V0RXhwcmVzc2lvblRyYWNrTmFtZSggJ2JsaW5rJyApO1xuICAgKiBjb25zdCB0cmFjayA9IG5ldyBUSFJFRS5OdW1iZXJLZXlmcmFtZVRyYWNrKFxuICAgKiAgIG5hbWUsXG4gICAqICAgWyAwLjAsIDAuNSwgMS4wIF0sIC8vIHRpbWVzXG4gICAqICAgWyAwLjAsIDEuMCwgMC4wIF0gLy8gdmFsdWVzXG4gICAqICk7XG4gICAqXG4gICAqIGNvbnN0IGNsaXAgPSBuZXcgVEhSRUUuQW5pbWF0aW9uQ2xpcChcbiAgICogICAnYmxpbmsnLCAvLyBuYW1lXG4gICAqICAgMS4wLCAvLyBkdXJhdGlvblxuICAgKiAgIFsgdHJhY2sgXSAvLyB0cmFja3NcbiAgICogKTtcbiAgICpcbiAgICogY29uc3QgbWl4ZXIgPSBuZXcgVEhSRUUuQW5pbWF0aW9uTWl4ZXIoIHZybS5zY2VuZSApO1xuICAgKiBjb25zdCBhY3Rpb24gPSBtaXhlci5jbGlwQWN0aW9uKCBjbGlwICk7XG4gICAqIGFjdGlvbi5wbGF5KCk7XG4gICAqIGBgYFxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBleHByZXNzaW9uXG4gICAqL1xuICBwdWJsaWMgZ2V0RXhwcmVzc2lvblRyYWNrTmFtZShuYW1lOiBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSB8IHN0cmluZyk6IHN0cmluZyB8IG51bGwge1xuICAgIGNvbnN0IGV4cHJlc3Npb24gPSB0aGlzLmdldEV4cHJlc3Npb24obmFtZSk7XG4gICAgcmV0dXJuIGV4cHJlc3Npb24gPyBgJHtleHByZXNzaW9uLm5hbWV9LndlaWdodGAgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBldmVyeSBleHByZXNzaW9ucy5cbiAgICovXG4gIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgLy8gc2VlIGhvdyBtdWNoIHdlIHNob3VsZCBvdmVycmlkZSBjZXJ0YWluIGV4cHJlc3Npb25zXG4gICAgY29uc3Qgd2VpZ2h0TXVsdGlwbGllcnMgPSB0aGlzLl9jYWxjdWxhdGVXZWlnaHRNdWx0aXBsaWVycygpO1xuXG4gICAgLy8gcmVzZXQgZXhwcmVzc2lvbiBiaW5kcyBmaXJzdFxuICAgIHRoaXMuX2V4cHJlc3Npb25zLmZvckVhY2goKGV4cHJlc3Npb24pID0+IHtcbiAgICAgIGV4cHJlc3Npb24uY2xlYXJBcHBsaWVkV2VpZ2h0KCk7XG4gICAgfSk7XG5cbiAgICAvLyB0aGVuIGFwcGx5IGJpbmRzXG4gICAgdGhpcy5fZXhwcmVzc2lvbnMuZm9yRWFjaCgoZXhwcmVzc2lvbikgPT4ge1xuICAgICAgbGV0IG11bHRpcGxpZXIgPSAxLjA7XG4gICAgICBjb25zdCBuYW1lID0gZXhwcmVzc2lvbi5leHByZXNzaW9uTmFtZTtcblxuICAgICAgaWYgKHRoaXMuYmxpbmtFeHByZXNzaW9uTmFtZXMuaW5kZXhPZihuYW1lKSAhPT0gLTEpIHtcbiAgICAgICAgbXVsdGlwbGllciAqPSB3ZWlnaHRNdWx0aXBsaWVycy5ibGluaztcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMubG9va0F0RXhwcmVzc2lvbk5hbWVzLmluZGV4T2YobmFtZSkgIT09IC0xKSB7XG4gICAgICAgIG11bHRpcGxpZXIgKj0gd2VpZ2h0TXVsdGlwbGllcnMubG9va0F0O1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5tb3V0aEV4cHJlc3Npb25OYW1lcy5pbmRleE9mKG5hbWUpICE9PSAtMSkge1xuICAgICAgICBtdWx0aXBsaWVyICo9IHdlaWdodE11bHRpcGxpZXJzLm1vdXRoO1xuICAgICAgfVxuXG4gICAgICBleHByZXNzaW9uLmFwcGx5V2VpZ2h0KHsgbXVsdGlwbGllciB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgc3VtIG9mIG92ZXJyaWRlIGFtb3VudHMgdG8gc2VlIGhvdyBtdWNoIHdlIHNob3VsZCBtdWx0aXBseSB3ZWlnaHRzIG9mIGNlcnRhaW4gZXhwcmVzc2lvbnMuXG4gICAqL1xuICBwcml2YXRlIF9jYWxjdWxhdGVXZWlnaHRNdWx0aXBsaWVycygpOiB7XG4gICAgYmxpbms6IG51bWJlcjtcbiAgICBsb29rQXQ6IG51bWJlcjtcbiAgICBtb3V0aDogbnVtYmVyO1xuICB9IHtcbiAgICBsZXQgYmxpbmsgPSAxLjA7XG4gICAgbGV0IGxvb2tBdCA9IDEuMDtcbiAgICBsZXQgbW91dGggPSAxLjA7XG5cbiAgICB0aGlzLl9leHByZXNzaW9ucy5mb3JFYWNoKChleHByZXNzaW9uKSA9PiB7XG4gICAgICBibGluayAtPSBleHByZXNzaW9uLm92ZXJyaWRlQmxpbmtBbW91bnQ7XG4gICAgICBsb29rQXQgLT0gZXhwcmVzc2lvbi5vdmVycmlkZUxvb2tBdEFtb3VudDtcbiAgICAgIG1vdXRoIC09IGV4cHJlc3Npb24ub3ZlcnJpZGVNb3V0aEFtb3VudDtcbiAgICB9KTtcblxuICAgIGJsaW5rID0gTWF0aC5tYXgoMC4wLCBibGluayk7XG4gICAgbG9va0F0ID0gTWF0aC5tYXgoMC4wLCBsb29rQXQpO1xuICAgIG1vdXRoID0gTWF0aC5tYXgoMC4wLCBtb3V0aCk7XG5cbiAgICByZXR1cm4geyBibGluaywgbG9va0F0LCBtb3V0aCB9O1xuICB9XG59XG4iLCAiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uICovXG5cbmV4cG9ydCBjb25zdCBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGUgPSB7XG4gIENvbG9yOiAnY29sb3InLFxuICBFbWlzc2lvbkNvbG9yOiAnZW1pc3Npb25Db2xvcicsXG4gIFNoYWRlQ29sb3I6ICdzaGFkZUNvbG9yJyxcbiAgTWF0Y2FwQ29sb3I6ICdtYXRjYXBDb2xvcicsXG4gIFJpbUNvbG9yOiAncmltQ29sb3InLFxuICBPdXRsaW5lQ29sb3I6ICdvdXRsaW5lQ29sb3InLFxufSBhcyBjb25zdDtcblxuZXhwb3J0IHR5cGUgVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JUeXBlID1cbiAgKHR5cGVvZiBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGUpW2tleW9mIHR5cGVvZiBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGVdO1xuXG5leHBvcnQgY29uc3QgdjBFeHByZXNzaW9uTWF0ZXJpYWxDb2xvck1hcDogeyBba2V5OiBzdHJpbmddOiBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGUgfCB1bmRlZmluZWQgfSA9IHtcbiAgX0NvbG9yOiBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGUuQ29sb3IsXG4gIF9FbWlzc2lvbkNvbG9yOiBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGUuRW1pc3Npb25Db2xvcixcbiAgX1NoYWRlQ29sb3I6IFZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yVHlwZS5TaGFkZUNvbG9yLFxuICBfUmltQ29sb3I6IFZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yVHlwZS5SaW1Db2xvcixcbiAgX091dGxpbmVDb2xvcjogVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JUeXBlLk91dGxpbmVDb2xvcixcbn07XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHR5cGUgeyBWUk1FeHByZXNzaW9uQmluZCB9IGZyb20gJy4vVlJNRXhwcmVzc2lvbkJpbmQnO1xuaW1wb3J0IHR5cGUgeyBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGUgfSBmcm9tICcuL1ZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yVHlwZSc7XG5cbmNvbnN0IF9jb2xvciA9IG5ldyBUSFJFRS5Db2xvcigpO1xuXG5pbnRlcmZhY2UgQ29sb3JCaW5kU3RhdGUge1xuICBwcm9wZXJ0eU5hbWU6IHN0cmluZztcbiAgaW5pdGlhbFZhbHVlOiBUSFJFRS5Db2xvcjtcbiAgZGVsdGFWYWx1ZTogVEhSRUUuQ29sb3I7XG59XG5cbmludGVyZmFjZSBBbHBoYUJpbmRTdGF0ZSB7XG4gIHByb3BlcnR5TmFtZTogc3RyaW5nO1xuICBpbml0aWFsVmFsdWU6IG51bWJlcjtcbiAgZGVsdGFWYWx1ZTogbnVtYmVyO1xufVxuXG5pbnRlcmZhY2UgQmluZFN0YXRlIHtcbiAgY29sb3I6IENvbG9yQmluZFN0YXRlIHwgbnVsbDtcbiAgYWxwaGE6IEFscGhhQmluZFN0YXRlIHwgbnVsbDtcbn1cblxuLyoqXG4gKiBBIGJpbmQgb2YgZXhwcmVzc2lvbiBpbmZsdWVuY2VzIHRvIGEgbWF0ZXJpYWwgY29sb3IuXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvckJpbmQgaW1wbGVtZW50cyBWUk1FeHByZXNzaW9uQmluZCB7XG4gIC8qKlxuICAgKiBNYXBwaW5nIG9mIHByb3BlcnR5IG5hbWVzIGZyb20gVlJNQy9tYXRlcmlhbENvbG9yQmluZHMudHlwZSB0byB0aHJlZS5qcy9NYXRlcmlhbC5cbiAgICogVGhlIGZpcnN0IGVsZW1lbnQgc3RhbmRzIGZvciBjb2xvciBjaGFubmVscywgdGhlIHNlY29uZCBlbGVtZW50IHN0YW5kcyBmb3IgdGhlIGFscGhhIGNoYW5uZWwuXG4gICAqIFRoZSBzZWNvbmQgZWxlbWVudCBjYW4gYmUgbnVsbCBpZiB0aGUgdGFyZ2V0IHByb3BlcnR5IGRvZXNuJ3QgZXhpc3QuXG4gICAqL1xuICAvLyBUT0RPOiBXZSBtaWdodCB3YW50IHRvIHVzZSB0aGUgYHNhdGlzZmllc2Agb3BlcmF0b3Igb25jZSB3ZSBidW1wIFRTIHRvIDQuOSBvciBoaWdoZXJcbiAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vcGl4aXYvdGhyZWUtdnJtL3B1bGwvMTMyMyNkaXNjdXNzaW9uX3IxMzc0MDIwMDM1XG4gIHByaXZhdGUgc3RhdGljIF9wcm9wZXJ0eU5hbWVNYXBNYXA6IHtcbiAgICBbZGlzdGluZ3Vpc2hlcjogc3RyaW5nXTogeyBbdHlwZSBpbiBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGVdPzogcmVhZG9ubHkgW3N0cmluZywgc3RyaW5nIHwgbnVsbF0gfTtcbiAgfSA9IHtcbiAgICBpc01lc2hTdGFuZGFyZE1hdGVyaWFsOiB7XG4gICAgICBjb2xvcjogWydjb2xvcicsICdvcGFjaXR5J10sXG4gICAgICBlbWlzc2lvbkNvbG9yOiBbJ2VtaXNzaXZlJywgbnVsbF0sXG4gICAgfSxcbiAgICBpc01lc2hCYXNpY01hdGVyaWFsOiB7XG4gICAgICBjb2xvcjogWydjb2xvcicsICdvcGFjaXR5J10sXG4gICAgfSxcbiAgICBpc01Ub29uTWF0ZXJpYWw6IHtcbiAgICAgIGNvbG9yOiBbJ2NvbG9yJywgJ29wYWNpdHknXSxcbiAgICAgIGVtaXNzaW9uQ29sb3I6IFsnZW1pc3NpdmUnLCBudWxsXSxcbiAgICAgIG91dGxpbmVDb2xvcjogWydvdXRsaW5lQ29sb3JGYWN0b3InLCBudWxsXSxcbiAgICAgIG1hdGNhcENvbG9yOiBbJ21hdGNhcEZhY3RvcicsIG51bGxdLFxuICAgICAgcmltQ29sb3I6IFsncGFyYW1ldHJpY1JpbUNvbG9yRmFjdG9yJywgbnVsbF0sXG4gICAgICBzaGFkZUNvbG9yOiBbJ3NoYWRlQ29sb3JGYWN0b3InLCBudWxsXSxcbiAgICB9LFxuICB9O1xuXG4gIC8qKlxuICAgKiBUaGUgdGFyZ2V0IG1hdGVyaWFsLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IG1hdGVyaWFsOiBUSFJFRS5NYXRlcmlhbDtcblxuICAvKipcbiAgICogVGhlIHR5cGUgb2YgdGhlIHRhcmdldCBwcm9wZXJ0eSBvZiB0aGUgbWF0ZXJpYWwuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZTogVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JUeXBlO1xuXG4gIC8qKlxuICAgKiBUaGUgdGFyZ2V0IGNvbG9yLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IHRhcmdldFZhbHVlOiBUSFJFRS5Db2xvcjtcblxuICAvKipcbiAgICogVGhlIHRhcmdldCBhbHBoYS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSB0YXJnZXRBbHBoYTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBJdHMgYmluZGluZyBzdGF0ZS5cbiAgICogSWYgaXQgY2Fubm90IGZpbmQgdGhlIHRhcmdldCBwcm9wZXJ0eSBpbiB0aGUgY29uc3RydWN0b3IsIGVhY2ggcHJvcGVydHkgd2lsbCBiZSBudWxsIGluc3RlYWQuXG4gICAqL1xuICBwcml2YXRlIF9zdGF0ZTogQmluZFN0YXRlO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcih7XG4gICAgbWF0ZXJpYWwsXG4gICAgdHlwZSxcbiAgICB0YXJnZXRWYWx1ZSxcbiAgICB0YXJnZXRBbHBoYSxcbiAgfToge1xuICAgIC8qKlxuICAgICAqIFRoZSB0YXJnZXQgbWF0ZXJpYWwuXG4gICAgICovXG4gICAgbWF0ZXJpYWw6IFRIUkVFLk1hdGVyaWFsO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHR5cGUgb2YgdGhlIHRhcmdldCBwcm9wZXJ0eSBvZiB0aGUgbWF0ZXJpYWwuXG4gICAgICovXG4gICAgdHlwZTogVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JUeXBlO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHRhcmdldCBjb2xvci5cbiAgICAgKi9cbiAgICB0YXJnZXRWYWx1ZTogVEhSRUUuQ29sb3I7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgdGFyZ2V0IGFscGhhLlxuICAgICAqL1xuICAgIHRhcmdldEFscGhhPzogbnVtYmVyO1xuICB9KSB7XG4gICAgdGhpcy5tYXRlcmlhbCA9IG1hdGVyaWFsO1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy50YXJnZXRWYWx1ZSA9IHRhcmdldFZhbHVlO1xuICAgIHRoaXMudGFyZ2V0QWxwaGEgPSB0YXJnZXRBbHBoYSA/PyAxLjA7XG5cbiAgICAvLyBpbml0IGJpbmQgc3RhdGVcbiAgICBjb25zdCBjb2xvciA9IHRoaXMuX2luaXRDb2xvckJpbmRTdGF0ZSgpO1xuICAgIGNvbnN0IGFscGhhID0gdGhpcy5faW5pdEFscGhhQmluZFN0YXRlKCk7XG4gICAgdGhpcy5fc3RhdGUgPSB7IGNvbG9yLCBhbHBoYSB9O1xuICB9XG5cbiAgcHVibGljIGFwcGx5V2VpZ2h0KHdlaWdodDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgeyBjb2xvciwgYWxwaGEgfSA9IHRoaXMuX3N0YXRlO1xuXG4gICAgaWYgKGNvbG9yICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IHsgcHJvcGVydHlOYW1lLCBkZWx0YVZhbHVlIH0gPSBjb2xvcjtcblxuICAgICAgY29uc3QgdGFyZ2V0ID0gKHRoaXMubWF0ZXJpYWwgYXMgYW55KVtwcm9wZXJ0eU5hbWVdIGFzIFRIUkVFLkNvbG9yO1xuICAgICAgaWYgKHRhcmdldCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGFyZ2V0LmFkZChfY29sb3IuY29weShkZWx0YVZhbHVlKS5tdWx0aXBseVNjYWxhcih3ZWlnaHQpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoYWxwaGEgIT0gbnVsbCkge1xuICAgICAgY29uc3QgeyBwcm9wZXJ0eU5hbWUsIGRlbHRhVmFsdWUgfSA9IGFscGhhO1xuXG4gICAgICBjb25zdCB0YXJnZXQgPSAodGhpcy5tYXRlcmlhbCBhcyBhbnkpW3Byb3BlcnR5TmFtZV0gYXMgbnVtYmVyO1xuICAgICAgaWYgKHRhcmdldCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgKCh0aGlzLm1hdGVyaWFsIGFzIGFueSlbcHJvcGVydHlOYW1lXSBhcyBudW1iZXIpICs9IGRlbHRhVmFsdWUgKiB3ZWlnaHQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNsZWFyQXBwbGllZFdlaWdodCgpOiB2b2lkIHtcbiAgICBjb25zdCB7IGNvbG9yLCBhbHBoYSB9ID0gdGhpcy5fc3RhdGU7XG5cbiAgICBpZiAoY29sb3IgIT0gbnVsbCkge1xuICAgICAgY29uc3QgeyBwcm9wZXJ0eU5hbWUsIGluaXRpYWxWYWx1ZSB9ID0gY29sb3I7XG5cbiAgICAgIGNvbnN0IHRhcmdldCA9ICh0aGlzLm1hdGVyaWFsIGFzIGFueSlbcHJvcGVydHlOYW1lXSBhcyBUSFJFRS5Db2xvcjtcbiAgICAgIGlmICh0YXJnZXQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRhcmdldC5jb3B5KGluaXRpYWxWYWx1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGFscGhhICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IHsgcHJvcGVydHlOYW1lLCBpbml0aWFsVmFsdWUgfSA9IGFscGhhO1xuXG4gICAgICBjb25zdCB0YXJnZXQgPSAodGhpcy5tYXRlcmlhbCBhcyBhbnkpW3Byb3BlcnR5TmFtZV0gYXMgbnVtYmVyO1xuICAgICAgaWYgKHRhcmdldCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgKCh0aGlzLm1hdGVyaWFsIGFzIGFueSlbcHJvcGVydHlOYW1lXSBhcyBudW1iZXIpID0gaW5pdGlhbFZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2luaXRDb2xvckJpbmRTdGF0ZSgpOiBDb2xvckJpbmRTdGF0ZSB8IG51bGwge1xuICAgIGNvbnN0IHsgbWF0ZXJpYWwsIHR5cGUsIHRhcmdldFZhbHVlIH0gPSB0aGlzO1xuXG4gICAgY29uc3QgcHJvcGVydHlOYW1lTWFwID0gdGhpcy5fZ2V0UHJvcGVydHlOYW1lTWFwKCk7XG4gICAgY29uc3QgcHJvcGVydHlOYW1lID0gcHJvcGVydHlOYW1lTWFwPy5bdHlwZV0/LlswXSA/PyBudWxsO1xuXG4gICAgaWYgKHByb3BlcnR5TmFtZSA9PSBudWxsKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIGBUcmllZCB0byBhZGQgYSBtYXRlcmlhbCBjb2xvciBiaW5kIHRvIHRoZSBtYXRlcmlhbCAke1xuICAgICAgICAgIG1hdGVyaWFsLm5hbWUgPz8gJyhubyBuYW1lKSdcbiAgICAgICAgfSwgdGhlIHR5cGUgJHt0eXBlfSBidXQgdGhlIG1hdGVyaWFsIG9yIHRoZSB0eXBlIGlzIG5vdCBzdXBwb3J0ZWQuYCxcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHRhcmdldCA9IChtYXRlcmlhbCBhcyBhbnkpW3Byb3BlcnR5TmFtZV0gYXMgVEhSRUUuQ29sb3I7XG5cbiAgICBjb25zdCBpbml0aWFsVmFsdWUgPSB0YXJnZXQuY2xvbmUoKTtcblxuICAgIC8vIFx1OENBMFx1MzA2RVx1NTAyNFx1MzA5Mlx1NEZERFx1NjMwMVx1MzA1OVx1MzA4Qlx1MzA1Rlx1MzA4MVx1MzA2QkNvbG9yLnN1Ylx1MzA5Mlx1NEY3Rlx1MzA4Rlx1MzA1QVx1MzA2Qlx1NURFRVx1NTIwNlx1MzA5Mlx1OEEwOFx1N0I5N1x1MzA1OVx1MzA4QlxuICAgIGNvbnN0IGRlbHRhVmFsdWUgPSBuZXcgVEhSRUUuQ29sb3IoXG4gICAgICB0YXJnZXRWYWx1ZS5yIC0gaW5pdGlhbFZhbHVlLnIsXG4gICAgICB0YXJnZXRWYWx1ZS5nIC0gaW5pdGlhbFZhbHVlLmcsXG4gICAgICB0YXJnZXRWYWx1ZS5iIC0gaW5pdGlhbFZhbHVlLmIsXG4gICAgKTtcblxuICAgIHJldHVybiB7IHByb3BlcnR5TmFtZSwgaW5pdGlhbFZhbHVlLCBkZWx0YVZhbHVlIH07XG4gIH1cblxuICBwcml2YXRlIF9pbml0QWxwaGFCaW5kU3RhdGUoKTogQWxwaGFCaW5kU3RhdGUgfCBudWxsIHtcbiAgICBjb25zdCB7IG1hdGVyaWFsLCB0eXBlLCB0YXJnZXRBbHBoYSB9ID0gdGhpcztcblxuICAgIGNvbnN0IHByb3BlcnR5TmFtZU1hcCA9IHRoaXMuX2dldFByb3BlcnR5TmFtZU1hcCgpO1xuICAgIGNvbnN0IHByb3BlcnR5TmFtZSA9IHByb3BlcnR5TmFtZU1hcD8uW3R5cGVdPy5bMV0gPz8gbnVsbDtcblxuICAgIGlmIChwcm9wZXJ0eU5hbWUgPT0gbnVsbCAmJiB0YXJnZXRBbHBoYSAhPT0gMS4wKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIGBUcmllZCB0byBhZGQgYSBtYXRlcmlhbCBhbHBoYSBiaW5kIHRvIHRoZSBtYXRlcmlhbCAke1xuICAgICAgICAgIG1hdGVyaWFsLm5hbWUgPz8gJyhubyBuYW1lKSdcbiAgICAgICAgfSwgdGhlIHR5cGUgJHt0eXBlfSBidXQgdGhlIG1hdGVyaWFsIG9yIHRoZSB0eXBlIGRvZXMgbm90IHN1cHBvcnQgYWxwaGEuYCxcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlmIChwcm9wZXJ0eU5hbWUgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgaW5pdGlhbFZhbHVlID0gKG1hdGVyaWFsIGFzIGFueSlbcHJvcGVydHlOYW1lXSBhcyBudW1iZXI7XG5cbiAgICBjb25zdCBkZWx0YVZhbHVlID0gdGFyZ2V0QWxwaGEgLSBpbml0aWFsVmFsdWU7XG5cbiAgICByZXR1cm4geyBwcm9wZXJ0eU5hbWUsIGluaXRpYWxWYWx1ZSwgZGVsdGFWYWx1ZSB9O1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0UHJvcGVydHlOYW1lTWFwKCk6XG4gICAgfCB7IFt0eXBlIGluIFZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yVHlwZV0/OiByZWFkb25seSBbc3RyaW5nLCBzdHJpbmcgfCBudWxsXSB9XG4gICAgfCBudWxsIHtcbiAgICByZXR1cm4gKFxuICAgICAgT2JqZWN0LmVudHJpZXMoVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JCaW5kLl9wcm9wZXJ0eU5hbWVNYXBNYXApLmZpbmQoKFtkaXN0aW5ndWlzaGVyXSkgPT4ge1xuICAgICAgICByZXR1cm4gKHRoaXMubWF0ZXJpYWwgYXMgYW55KVtkaXN0aW5ndWlzaGVyXSA9PT0gdHJ1ZTtcbiAgICAgIH0pPy5bMV0gPz8gbnVsbFxuICAgICk7XG4gIH1cbn1cbiIsICJpbXBvcnQgdHlwZSAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB0eXBlIHsgVlJNRXhwcmVzc2lvbkJpbmQgfSBmcm9tICcuL1ZSTUV4cHJlc3Npb25CaW5kJztcblxuLyoqXG4gKiBBIGJpbmQgb2Yge0BsaW5rIFZSTUV4cHJlc3Npb259IGluZmx1ZW5jZXMgdG8gbW9ycGggdGFyZ2V0cy5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUV4cHJlc3Npb25Nb3JwaFRhcmdldEJpbmQgaW1wbGVtZW50cyBWUk1FeHByZXNzaW9uQmluZCB7XG4gIC8qKlxuICAgKiBUaGUgbWVzaCBwcmltaXRpdmVzIHRoYXQgYXR0YWNoZWQgdG8gdGFyZ2V0IG1lc2guXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgcHJpbWl0aXZlczogVEhSRUUuTWVzaFtdO1xuXG4gIC8qKlxuICAgKiBUaGUgaW5kZXggb2YgdGhlIG1vcnBoIHRhcmdldCBpbiB0aGUgbWVzaC5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBpbmRleDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgd2VpZ2h0IHZhbHVlIG9mIHRhcmdldCBtb3JwaCB0YXJnZXQuIFJhbmdpbmcgaW4gWzAuMCAtIDEuMF0uXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgd2VpZ2h0OiBudW1iZXI7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHtcbiAgICBwcmltaXRpdmVzLFxuICAgIGluZGV4LFxuICAgIHdlaWdodCxcbiAgfToge1xuICAgIC8qKlxuICAgICAqIFRoZSBtZXNoIHByaW1pdGl2ZXMgdGhhdCBhdHRhY2hlZCB0byB0YXJnZXQgbWVzaC5cbiAgICAgKi9cbiAgICBwcmltaXRpdmVzOiBUSFJFRS5NZXNoW107XG5cbiAgICAvKipcbiAgICAgKiBUaGUgaW5kZXggb2YgdGhlIG1vcnBoIHRhcmdldCBpbiB0aGUgbWVzaC5cbiAgICAgKi9cbiAgICBpbmRleDogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHdlaWdodCB2YWx1ZSBvZiB0YXJnZXQgbW9ycGggdGFyZ2V0LiBSYW5naW5nIGluIFswLjAgLSAxLjBdLlxuICAgICAqL1xuICAgIHdlaWdodDogbnVtYmVyO1xuICB9KSB7XG4gICAgdGhpcy5wcmltaXRpdmVzID0gcHJpbWl0aXZlcztcbiAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gICAgdGhpcy53ZWlnaHQgPSB3ZWlnaHQ7XG4gIH1cblxuICBwdWJsaWMgYXBwbHlXZWlnaHQod2VpZ2h0OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnByaW1pdGl2ZXMuZm9yRWFjaCgobWVzaCkgPT4ge1xuICAgICAgaWYgKG1lc2gubW9ycGhUYXJnZXRJbmZsdWVuY2VzPy5bdGhpcy5pbmRleF0gIT0gbnVsbCkge1xuICAgICAgICBtZXNoLm1vcnBoVGFyZ2V0SW5mbHVlbmNlc1t0aGlzLmluZGV4XSArPSB0aGlzLndlaWdodCAqIHdlaWdodDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBjbGVhckFwcGxpZWRXZWlnaHQoKTogdm9pZCB7XG4gICAgdGhpcy5wcmltaXRpdmVzLmZvckVhY2goKG1lc2gpID0+IHtcbiAgICAgIGlmIChtZXNoLm1vcnBoVGFyZ2V0SW5mbHVlbmNlcz8uW3RoaXMuaW5kZXhdICE9IG51bGwpIHtcbiAgICAgICAgbWVzaC5tb3JwaFRhcmdldEluZmx1ZW5jZXNbdGhpcy5pbmRleF0gPSAwLjA7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgdHlwZSB7IFZSTUV4cHJlc3Npb25CaW5kIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uQmluZCc7XG5cbmNvbnN0IF92MiA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cbi8qKlxuICogQSBiaW5kIG9mIGV4cHJlc3Npb24gaW5mbHVlbmNlcyB0byB0ZXh0dXJlIHRyYW5zZm9ybXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1FeHByZXNzaW9uVGV4dHVyZVRyYW5zZm9ybUJpbmQgaW1wbGVtZW50cyBWUk1FeHByZXNzaW9uQmluZCB7XG4gIHByaXZhdGUgc3RhdGljIF9wcm9wZXJ0eU5hbWVzTWFwOiB7IFtkaXN0aW5ndWlzaGVyOiBzdHJpbmddOiBzdHJpbmdbXSB9ID0ge1xuICAgIGlzTWVzaFN0YW5kYXJkTWF0ZXJpYWw6IFtcbiAgICAgICdtYXAnLFxuICAgICAgJ2VtaXNzaXZlTWFwJyxcbiAgICAgICdidW1wTWFwJyxcbiAgICAgICdub3JtYWxNYXAnLFxuICAgICAgJ2Rpc3BsYWNlbWVudE1hcCcsXG4gICAgICAncm91Z2huZXNzTWFwJyxcbiAgICAgICdtZXRhbG5lc3NNYXAnLFxuICAgICAgJ2FscGhhTWFwJyxcbiAgICBdLFxuICAgIGlzTWVzaEJhc2ljTWF0ZXJpYWw6IFsnbWFwJywgJ3NwZWN1bGFyTWFwJywgJ2FscGhhTWFwJ10sXG4gICAgaXNNVG9vbk1hdGVyaWFsOiBbXG4gICAgICAnbWFwJyxcbiAgICAgICdub3JtYWxNYXAnLFxuICAgICAgJ2VtaXNzaXZlTWFwJyxcbiAgICAgICdzaGFkZU11bHRpcGx5VGV4dHVyZScsXG4gICAgICAncmltTXVsdGlwbHlUZXh0dXJlJyxcbiAgICAgICdvdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmUnLFxuICAgICAgJ3V2QW5pbWF0aW9uTWFza1RleHR1cmUnLFxuICAgIF0sXG4gIH07XG5cbiAgLyoqXG4gICAqIFRoZSB0YXJnZXQgbWF0ZXJpYWwuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgbWF0ZXJpYWw6IFRIUkVFLk1hdGVyaWFsO1xuXG4gIC8qKlxuICAgKiBUaGUgdXYgc2NhbGUgb2YgdGhlIHRleHR1cmUuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgc2NhbGU6IFRIUkVFLlZlY3RvcjI7XG5cbiAgLyoqXG4gICAqIFRoZSB1diBvZmZzZXQgb2YgdGhlIHRleHR1cmUuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgb2Zmc2V0OiBUSFJFRS5WZWN0b3IyO1xuXG4gIC8qKlxuICAgKiBUaGUgbGlzdCBvZiB0ZXh0dXJlIG5hbWVzIGFuZCBpdHMgc3RhdGUgdGhhdCBzaG91bGQgYmUgdHJhbnNmb3JtZWQgYnkgdGhpcyBiaW5kLlxuICAgKi9cbiAgcHJpdmF0ZSBfcHJvcGVydGllczoge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBpbml0aWFsT2Zmc2V0OiBUSFJFRS5WZWN0b3IyO1xuICAgIGluaXRpYWxTY2FsZTogVEhSRUUuVmVjdG9yMjtcbiAgICBkZWx0YU9mZnNldDogVEhSRUUuVmVjdG9yMjtcbiAgICBkZWx0YVNjYWxlOiBUSFJFRS5WZWN0b3IyO1xuICB9W107XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHtcbiAgICBtYXRlcmlhbCxcbiAgICBzY2FsZSxcbiAgICBvZmZzZXQsXG4gIH06IHtcbiAgICAvKipcbiAgICAgKiBUaGUgdGFyZ2V0IG1hdGVyaWFsLlxuICAgICAqL1xuICAgIG1hdGVyaWFsOiBUSFJFRS5NYXRlcmlhbDtcblxuICAgIC8qKlxuICAgICAqIFRoZSB1diBzY2FsZSBvZiB0aGUgdGV4dHVyZS5cbiAgICAgKi9cbiAgICBzY2FsZTogVEhSRUUuVmVjdG9yMjtcblxuICAgIC8qKlxuICAgICAqIFRoZSB1diBvZmZzZXQgb2YgdGhlIHRleHR1cmUuXG4gICAgICovXG4gICAgb2Zmc2V0OiBUSFJFRS5WZWN0b3IyO1xuICB9KSB7XG4gICAgdGhpcy5tYXRlcmlhbCA9IG1hdGVyaWFsO1xuICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICB0aGlzLm9mZnNldCA9IG9mZnNldDtcblxuICAgIGNvbnN0IHByb3BlcnR5TmFtZXMgPSBPYmplY3QuZW50cmllcyhWUk1FeHByZXNzaW9uVGV4dHVyZVRyYW5zZm9ybUJpbmQuX3Byb3BlcnR5TmFtZXNNYXApLmZpbmQoXG4gICAgICAoW2Rpc3Rpbmd1aXNoZXJdKSA9PiB7XG4gICAgICAgIHJldHVybiAobWF0ZXJpYWwgYXMgYW55KVtkaXN0aW5ndWlzaGVyXSA9PT0gdHJ1ZTtcbiAgICAgIH0sXG4gICAgKT8uWzFdO1xuXG4gICAgaWYgKHByb3BlcnR5TmFtZXMgPT0gbnVsbCkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBgVHJpZWQgdG8gYWRkIGEgdGV4dHVyZSB0cmFuc2Zvcm0gYmluZCB0byB0aGUgbWF0ZXJpYWwgJHtcbiAgICAgICAgICBtYXRlcmlhbC5uYW1lID8/ICcobm8gbmFtZSknXG4gICAgICAgIH0gYnV0IHRoZSBtYXRlcmlhbCBpcyBub3Qgc3VwcG9ydGVkLmAsXG4gICAgICApO1xuXG4gICAgICB0aGlzLl9wcm9wZXJ0aWVzID0gW107XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3Byb3BlcnRpZXMgPSBbXTtcblxuICAgICAgcHJvcGVydHlOYW1lcy5mb3JFYWNoKChwcm9wZXJ0eU5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgdGV4dHVyZSA9ICgobWF0ZXJpYWwgYXMgYW55KVtwcm9wZXJ0eU5hbWVdIGFzIFRIUkVFLlRleHR1cmUgfCB1bmRlZmluZWQpPy5jbG9uZSgpO1xuICAgICAgICBpZiAoIXRleHR1cmUpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIChtYXRlcmlhbCBhcyBhbnkpW3Byb3BlcnR5TmFtZV0gPSB0ZXh0dXJlOyAvLyBiZWNhdXNlIHRoZSB0ZXh0dXJlIGlzIGNsb25lZFxuXG4gICAgICAgIGNvbnN0IGluaXRpYWxPZmZzZXQgPSB0ZXh0dXJlLm9mZnNldC5jbG9uZSgpO1xuICAgICAgICBjb25zdCBpbml0aWFsU2NhbGUgPSB0ZXh0dXJlLnJlcGVhdC5jbG9uZSgpO1xuICAgICAgICBjb25zdCBkZWx0YU9mZnNldCA9IG9mZnNldC5jbG9uZSgpLnN1Yihpbml0aWFsT2Zmc2V0KTtcbiAgICAgICAgY29uc3QgZGVsdGFTY2FsZSA9IHNjYWxlLmNsb25lKCkuc3ViKGluaXRpYWxTY2FsZSk7XG5cbiAgICAgICAgdGhpcy5fcHJvcGVydGllcy5wdXNoKHtcbiAgICAgICAgICBuYW1lOiBwcm9wZXJ0eU5hbWUsXG4gICAgICAgICAgaW5pdGlhbE9mZnNldCxcbiAgICAgICAgICBkZWx0YU9mZnNldCxcbiAgICAgICAgICBpbml0aWFsU2NhbGUsXG4gICAgICAgICAgZGVsdGFTY2FsZSxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXBwbHlXZWlnaHQod2VpZ2h0OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9wcm9wZXJ0aWVzLmZvckVhY2goKHByb3BlcnR5KSA9PiB7XG4gICAgICBjb25zdCB0YXJnZXQgPSAodGhpcy5tYXRlcmlhbCBhcyBhbnkpW3Byb3BlcnR5Lm5hbWVdIGFzIFRIUkVFLlRleHR1cmU7XG4gICAgICBpZiAodGFyZ2V0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSAvLyBUT0RPOiB3ZSBzaG91bGQga2ljayB0aGlzIGF0IGBhZGRNYXRlcmlhbFZhbHVlYFxuXG4gICAgICB0YXJnZXQub2Zmc2V0LmFkZChfdjIuY29weShwcm9wZXJ0eS5kZWx0YU9mZnNldCkubXVsdGlwbHlTY2FsYXIod2VpZ2h0KSk7XG4gICAgICB0YXJnZXQucmVwZWF0LmFkZChfdjIuY29weShwcm9wZXJ0eS5kZWx0YVNjYWxlKS5tdWx0aXBseVNjYWxhcih3ZWlnaHQpKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBjbGVhckFwcGxpZWRXZWlnaHQoKTogdm9pZCB7XG4gICAgdGhpcy5fcHJvcGVydGllcy5mb3JFYWNoKChwcm9wZXJ0eSkgPT4ge1xuICAgICAgY29uc3QgdGFyZ2V0ID0gKHRoaXMubWF0ZXJpYWwgYXMgYW55KVtwcm9wZXJ0eS5uYW1lXSBhcyBUSFJFRS5UZXh0dXJlO1xuICAgICAgaWYgKHRhcmdldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gLy8gVE9ETzogd2Ugc2hvdWxkIGtpY2sgdGhpcyBhdCBgYWRkTWF0ZXJpYWxWYWx1ZWBcblxuICAgICAgdGFyZ2V0Lm9mZnNldC5jb3B5KHByb3BlcnR5LmluaXRpYWxPZmZzZXQpO1xuICAgICAgdGFyZ2V0LnJlcGVhdC5jb3B5KHByb3BlcnR5LmluaXRpYWxTY2FsZSk7XG4gICAgfSk7XG4gIH1cbn1cbiIsICIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cblxuZXhwb3J0IGNvbnN0IFZSTUV4cHJlc3Npb25PdmVycmlkZVR5cGUgPSB7XG4gIE5vbmU6ICdub25lJyxcbiAgQmxvY2s6ICdibG9jaycsXG4gIEJsZW5kOiAnYmxlbmQnLFxufSBhcyBjb25zdDtcblxuZXhwb3J0IHR5cGUgVlJNRXhwcmVzc2lvbk92ZXJyaWRlVHlwZSA9ICh0eXBlb2YgVlJNRXhwcmVzc2lvbk92ZXJyaWRlVHlwZSlba2V5b2YgdHlwZW9mIFZSTUV4cHJlc3Npb25PdmVycmlkZVR5cGVdO1xuIiwgImltcG9ydCB0eXBlIHsgVlJNRmlyc3RQZXJzb25NZXNoQW5ub3RhdGlvbiB9IGZyb20gJy4vVlJNRmlyc3RQZXJzb25NZXNoQW5ub3RhdGlvbic7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgdHlwZSB7IFZSTUh1bWFub2lkIH0gZnJvbSAnLi4vaHVtYW5vaWQnO1xuXG5leHBvcnQgY2xhc3MgVlJNRmlyc3RQZXJzb24ge1xuICAvKipcbiAgICogQSBkZWZhdWx0IGNhbWVyYSBsYXllciBmb3IgYEZpcnN0UGVyc29uT25seWAgbGF5ZXIuXG4gICAqXG4gICAqIEBzZWUge0BsaW5rIGZpcnN0UGVyc29uT25seUxheWVyfVxuICAgKi9cbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBERUZBVUxUX0ZJUlNUUEVSU09OX09OTFlfTEFZRVIgPSA5O1xuXG4gIC8qKlxuICAgKiBBIGRlZmF1bHQgY2FtZXJhIGxheWVyIGZvciBgVGhpcmRQZXJzb25Pbmx5YCBsYXllci5cbiAgICpcbiAgICogQHNlZSB7QGxpbmsgdGhpcmRQZXJzb25Pbmx5TGF5ZXJ9XG4gICAqL1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IERFRkFVTFRfVEhJUkRQRVJTT05fT05MWV9MQVlFUiA9IDEwO1xuXG4gIC8qKlxuICAgKiBJdHMgYXNzb2NpYXRlZCB7QGxpbmsgVlJNSHVtYW5vaWR9LlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGh1bWFub2lkOiBWUk1IdW1hbm9pZDtcbiAgcHVibGljIG1lc2hBbm5vdGF0aW9uczogVlJNRmlyc3RQZXJzb25NZXNoQW5ub3RhdGlvbltdO1xuXG4gIHByaXZhdGUgX2ZpcnN0UGVyc29uT25seUxheWVyID0gVlJNRmlyc3RQZXJzb24uREVGQVVMVF9GSVJTVFBFUlNPTl9PTkxZX0xBWUVSO1xuICBwcml2YXRlIF90aGlyZFBlcnNvbk9ubHlMYXllciA9IFZSTUZpcnN0UGVyc29uLkRFRkFVTFRfVEhJUkRQRVJTT05fT05MWV9MQVlFUjtcblxuICBwcml2YXRlIF9pbml0aWFsaXplZExheWVycyA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgVlJNRmlyc3RQZXJzb24gb2JqZWN0LlxuICAgKlxuICAgKiBAcGFyYW0gaHVtYW5vaWQgQSB7QGxpbmsgVlJNSHVtYW5vaWR9XG4gICAqIEBwYXJhbSBtZXNoQW5ub3RhdGlvbnMgQSB7QGxpbmsgVlJNRmlyc3RQZXJzb25NZXNoQW5ub3RhdGlvbn1cbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihodW1hbm9pZDogVlJNSHVtYW5vaWQsIG1lc2hBbm5vdGF0aW9uczogVlJNRmlyc3RQZXJzb25NZXNoQW5ub3RhdGlvbltdKSB7XG4gICAgdGhpcy5odW1hbm9pZCA9IGh1bWFub2lkO1xuICAgIHRoaXMubWVzaEFubm90YXRpb25zID0gbWVzaEFubm90YXRpb25zO1xuICB9XG5cbiAgLyoqXG4gICAqIENvcHkgdGhlIGdpdmVuIHtAbGluayBWUk1GaXJzdFBlcnNvbn0gaW50byB0aGlzIG9uZS5cbiAgICoge0BsaW5rIGh1bWFub2lkfSBtdXN0IGJlIHNhbWUgYXMgdGhlIHNvdXJjZSBvbmUuXG4gICAqIEBwYXJhbSBzb3VyY2UgVGhlIHtAbGluayBWUk1GaXJzdFBlcnNvbn0geW91IHdhbnQgdG8gY29weVxuICAgKiBAcmV0dXJucyB0aGlzXG4gICAqL1xuICBwdWJsaWMgY29weShzb3VyY2U6IFZSTUZpcnN0UGVyc29uKTogdGhpcyB7XG4gICAgaWYgKHRoaXMuaHVtYW5vaWQgIT09IHNvdXJjZS5odW1hbm9pZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdWUk1GaXJzdFBlcnNvbjogaHVtYW5vaWQgbXVzdCBiZSBzYW1lIGluIG9yZGVyIHRvIGNvcHknKTtcbiAgICB9XG5cbiAgICB0aGlzLm1lc2hBbm5vdGF0aW9ucyA9IHNvdXJjZS5tZXNoQW5ub3RhdGlvbnMubWFwKChhbm5vdGF0aW9uKSA9PiAoe1xuICAgICAgbWVzaGVzOiBhbm5vdGF0aW9uLm1lc2hlcy5jb25jYXQoKSxcbiAgICAgIHR5cGU6IGFubm90YXRpb24udHlwZSxcbiAgICB9KSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgY2xvbmUgb2YgdGhpcyB7QGxpbmsgVlJNRmlyc3RQZXJzb259LlxuICAgKiBAcmV0dXJucyBDb3BpZWQge0BsaW5rIFZSTUZpcnN0UGVyc29ufVxuICAgKi9cbiAgcHVibGljIGNsb25lKCk6IFZSTUZpcnN0UGVyc29uIHtcbiAgICByZXR1cm4gbmV3IFZSTUZpcnN0UGVyc29uKHRoaXMuaHVtYW5vaWQsIHRoaXMubWVzaEFubm90YXRpb25zKS5jb3B5KHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgY2FtZXJhIGxheWVyIHJlcHJlc2VudHMgYEZpcnN0UGVyc29uT25seWAgbGF5ZXIuXG4gICAqIE5vdGUgdGhhdCAqKnlvdSBtdXN0IGNhbGwge0BsaW5rIHNldHVwfSBmaXJzdCBiZWZvcmUgeW91IHVzZSB0aGUgbGF5ZXIgZmVhdHVyZSoqIG9yIGl0IGRvZXMgbm90IHdvcmsgcHJvcGVybHkuXG4gICAqXG4gICAqIFRoZSB2YWx1ZSBpcyB7QGxpbmsgREVGQVVMVF9GSVJTVFBFUlNPTl9PTkxZX0xBWUVSfSBieSBkZWZhdWx0IGJ1dCB5b3UgY2FuIGNoYW5nZSB0aGUgbGF5ZXIgYnkgc3BlY2lmeWluZyB2aWEge0BsaW5rIHNldHVwfSBpZiB5b3UgcHJlZmVyLlxuICAgKlxuICAgKiBAc2VlIGh0dHBzOi8vdnJtLmRldi9lbi91bml2cm0vYXBpL3VuaXZybV91c2VfZmlyc3RwZXJzb24vXG4gICAqIEBzZWUgaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzLyNhcGkvZW4vY29yZS9MYXllcnNcbiAgICovXG4gIHB1YmxpYyBnZXQgZmlyc3RQZXJzb25Pbmx5TGF5ZXIoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fZmlyc3RQZXJzb25Pbmx5TGF5ZXI7XG4gIH1cblxuICAvKipcbiAgICogQSBjYW1lcmEgbGF5ZXIgcmVwcmVzZW50cyBgVGhpcmRQZXJzb25Pbmx5YCBsYXllci5cbiAgICogTm90ZSB0aGF0ICoqeW91IG11c3QgY2FsbCB7QGxpbmsgc2V0dXB9IGZpcnN0IGJlZm9yZSB5b3UgdXNlIHRoZSBsYXllciBmZWF0dXJlKiogb3IgaXQgZG9lcyBub3Qgd29yayBwcm9wZXJseS5cbiAgICpcbiAgICogVGhlIHZhbHVlIGlzIHtAbGluayBERUZBVUxUX1RISVJEUEVSU09OX09OTFlfTEFZRVJ9IGJ5IGRlZmF1bHQgYnV0IHlvdSBjYW4gY2hhbmdlIHRoZSBsYXllciBieSBzcGVjaWZ5aW5nIHZpYSB7QGxpbmsgc2V0dXB9IGlmIHlvdSBwcmVmZXIuXG4gICAqXG4gICAqIEBzZWUgaHR0cHM6Ly92cm0uZGV2L2VuL3VuaXZybS9hcGkvdW5pdnJtX3VzZV9maXJzdHBlcnNvbi9cbiAgICogQHNlZSBodHRwczovL3RocmVlanMub3JnL2RvY3MvI2FwaS9lbi9jb3JlL0xheWVyc1xuICAgKi9cbiAgcHVibGljIGdldCB0aGlyZFBlcnNvbk9ubHlMYXllcigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl90aGlyZFBlcnNvbk9ubHlMYXllcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbiB0aGlzIG1ldGhvZCwgaXQgYXNzaWducyBsYXllcnMgZm9yIGV2ZXJ5IG1lc2hlcyBiYXNlZCBvbiBtZXNoIGFubm90YXRpb25zLlxuICAgKiBZb3UgbXVzdCBjYWxsIHRoaXMgbWV0aG9kIGZpcnN0IGJlZm9yZSB5b3UgdXNlIHRoZSBsYXllciBmZWF0dXJlLlxuICAgKlxuICAgKiBUaGlzIGlzIGFuIGVxdWl2YWxlbnQgb2YgW1ZSTUZpcnN0UGVyc29uLlNldHVwXShodHRwczovL2dpdGh1Yi5jb20vdnJtLWMvVW5pVlJNL2Jsb2IvNzNhNWJkOGZjZGRhYTJhN2E4NzM1MDk5YTk3ZTYzYzlkYjNlNWVhMC9Bc3NldHMvVlJNL1J1bnRpbWUvRmlyc3RQZXJzb24vVlJNRmlyc3RQZXJzb24uY3MjTDI5NS1MMjk5KSBvZiB0aGUgVW5pVlJNLlxuICAgKlxuICAgKiBUaGUgYGNhbWVyYUxheWVyYCBwYXJhbWV0ZXIgc3BlY2lmaWVzIHdoaWNoIGxheWVyIHdpbGwgYmUgYXNzaWduZWQgZm9yIGBGaXJzdFBlcnNvbk9ubHlgIC8gYFRoaXJkUGVyc29uT25seWAuXG4gICAqIEluIFVuaVZSTSwgd2Ugc3BlY2lmaWVkIHRob3NlIGJ5IG5hbWluZyBlYWNoIGRlc2lyZWQgbGF5ZXIgYXMgYEZJUlNUUEVSU09OX09OTFlfTEFZRVJgIC8gYFRISVJEUEVSU09OX09OTFlfTEFZRVJgXG4gICAqIGJ1dCB3ZSBhcmUgZ29pbmcgdG8gc3BlY2lmeSB0aGVzZSBsYXllcnMgYXQgaGVyZSBzaW5jZSB3ZSBhcmUgdW5hYmxlIHRvIG5hbWUgbGF5ZXJzIGluIFRocmVlLmpzLlxuICAgKlxuICAgKiBAcGFyYW0gY2FtZXJhTGF5ZXIgU3BlY2lmeSB3aGljaCBsYXllciB3aWxsIGJlIGZvciBgRmlyc3RQZXJzb25Pbmx5YCAvIGBUaGlyZFBlcnNvbk9ubHlgLlxuICAgKi9cbiAgcHVibGljIHNldHVwKHtcbiAgICBmaXJzdFBlcnNvbk9ubHlMYXllciA9IFZSTUZpcnN0UGVyc29uLkRFRkFVTFRfRklSU1RQRVJTT05fT05MWV9MQVlFUixcbiAgICB0aGlyZFBlcnNvbk9ubHlMYXllciA9IFZSTUZpcnN0UGVyc29uLkRFRkFVTFRfVEhJUkRQRVJTT05fT05MWV9MQVlFUixcbiAgfSA9IHt9KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2luaXRpYWxpemVkTGF5ZXJzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2ZpcnN0UGVyc29uT25seUxheWVyID0gZmlyc3RQZXJzb25Pbmx5TGF5ZXI7XG4gICAgdGhpcy5fdGhpcmRQZXJzb25Pbmx5TGF5ZXIgPSB0aGlyZFBlcnNvbk9ubHlMYXllcjtcblxuICAgIHRoaXMubWVzaEFubm90YXRpb25zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGl0ZW0ubWVzaGVzLmZvckVhY2goKG1lc2gpID0+IHtcbiAgICAgICAgaWYgKGl0ZW0udHlwZSA9PT0gJ2ZpcnN0UGVyc29uT25seScpIHtcbiAgICAgICAgICBtZXNoLmxheWVycy5zZXQodGhpcy5fZmlyc3RQZXJzb25Pbmx5TGF5ZXIpO1xuICAgICAgICAgIG1lc2gudHJhdmVyc2UoKGNoaWxkKSA9PiBjaGlsZC5sYXllcnMuc2V0KHRoaXMuX2ZpcnN0UGVyc29uT25seUxheWVyKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXRlbS50eXBlID09PSAndGhpcmRQZXJzb25Pbmx5Jykge1xuICAgICAgICAgIG1lc2gubGF5ZXJzLnNldCh0aGlzLl90aGlyZFBlcnNvbk9ubHlMYXllcik7XG4gICAgICAgICAgbWVzaC50cmF2ZXJzZSgoY2hpbGQpID0+IGNoaWxkLmxheWVycy5zZXQodGhpcy5fdGhpcmRQZXJzb25Pbmx5TGF5ZXIpKTtcbiAgICAgICAgfSBlbHNlIGlmIChpdGVtLnR5cGUgPT09ICdhdXRvJykge1xuICAgICAgICAgIHRoaXMuX2NyZWF0ZUhlYWRsZXNzTW9kZWwobWVzaCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5faW5pdGlhbGl6ZWRMYXllcnMgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfZXhjbHVkZVRyaWFuZ2xlcyh0cmlhbmdsZXM6IG51bWJlcltdLCBid3M6IG51bWJlcltdW10sIHNraW5JbmRleDogbnVtYmVyW11bXSwgZXhjbHVkZTogbnVtYmVyW10pOiBudW1iZXIge1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgaWYgKGJ3cyAhPSBudWxsICYmIGJ3cy5sZW5ndGggPiAwKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRyaWFuZ2xlcy5sZW5ndGg7IGkgKz0gMykge1xuICAgICAgICBjb25zdCBhID0gdHJpYW5nbGVzW2ldO1xuICAgICAgICBjb25zdCBiID0gdHJpYW5nbGVzW2kgKyAxXTtcbiAgICAgICAgY29uc3QgYyA9IHRyaWFuZ2xlc1tpICsgMl07XG4gICAgICAgIGNvbnN0IGJ3MCA9IGJ3c1thXTtcbiAgICAgICAgY29uc3Qgc2tpbjAgPSBza2luSW5kZXhbYV07XG5cbiAgICAgICAgaWYgKGJ3MFswXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMFswXSkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoYncwWzFdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4wWzFdKSkgY29udGludWU7XG4gICAgICAgIGlmIChidzBbMl0gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjBbMl0pKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJ3MFszXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMFszXSkpIGNvbnRpbnVlO1xuXG4gICAgICAgIGNvbnN0IGJ3MSA9IGJ3c1tiXTtcbiAgICAgICAgY29uc3Qgc2tpbjEgPSBza2luSW5kZXhbYl07XG4gICAgICAgIGlmIChidzFbMF0gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjFbMF0pKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJ3MVsxXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMVsxXSkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoYncxWzJdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4xWzJdKSkgY29udGludWU7XG4gICAgICAgIGlmIChidzFbM10gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjFbM10pKSBjb250aW51ZTtcblxuICAgICAgICBjb25zdCBidzIgPSBid3NbY107XG4gICAgICAgIGNvbnN0IHNraW4yID0gc2tpbkluZGV4W2NdO1xuICAgICAgICBpZiAoYncyWzBdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4yWzBdKSkgY29udGludWU7XG4gICAgICAgIGlmIChidzJbMV0gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjJbMV0pKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJ3MlsyXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMlsyXSkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoYncyWzNdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4yWzNdKSkgY29udGludWU7XG5cbiAgICAgICAgdHJpYW5nbGVzW2NvdW50KytdID0gYTtcbiAgICAgICAgdHJpYW5nbGVzW2NvdW50KytdID0gYjtcbiAgICAgICAgdHJpYW5nbGVzW2NvdW50KytdID0gYztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvdW50O1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlRXJhc2VkTWVzaChzcmM6IFRIUkVFLlNraW5uZWRNZXNoLCBlcmFzaW5nQm9uZXNJbmRleDogbnVtYmVyW10pOiBUSFJFRS5Ta2lubmVkTWVzaCB7XG4gICAgY29uc3QgZHN0ID0gbmV3IFRIUkVFLlNraW5uZWRNZXNoKHNyYy5nZW9tZXRyeS5jbG9uZSgpLCBzcmMubWF0ZXJpYWwpO1xuICAgIGRzdC5uYW1lID0gYCR7c3JjLm5hbWV9KGVyYXNlKWA7XG4gICAgZHN0LmZydXN0dW1DdWxsZWQgPSBzcmMuZnJ1c3R1bUN1bGxlZDtcbiAgICBkc3QubGF5ZXJzLnNldCh0aGlzLl9maXJzdFBlcnNvbk9ubHlMYXllcik7XG5cbiAgICBjb25zdCBnZW9tZXRyeSA9IGRzdC5nZW9tZXRyeTtcblxuICAgIGNvbnN0IHNraW5JbmRleEF0dHIgPSBnZW9tZXRyeS5nZXRBdHRyaWJ1dGUoJ3NraW5JbmRleCcpO1xuICAgIGNvbnN0IHNraW5JbmRleEF0dHJBcnJheSA9IHNraW5JbmRleEF0dHIgaW5zdGFuY2VvZiBUSFJFRS5HTEJ1ZmZlckF0dHJpYnV0ZSA/IFtdIDogc2tpbkluZGV4QXR0ci5hcnJheTtcbiAgICBjb25zdCBza2luSW5kZXggPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNraW5JbmRleEF0dHJBcnJheS5sZW5ndGg7IGkgKz0gNCkge1xuICAgICAgc2tpbkluZGV4LnB1c2goW1xuICAgICAgICBza2luSW5kZXhBdHRyQXJyYXlbaV0sXG4gICAgICAgIHNraW5JbmRleEF0dHJBcnJheVtpICsgMV0sXG4gICAgICAgIHNraW5JbmRleEF0dHJBcnJheVtpICsgMl0sXG4gICAgICAgIHNraW5JbmRleEF0dHJBcnJheVtpICsgM10sXG4gICAgICBdKTtcbiAgICB9XG5cbiAgICBjb25zdCBza2luV2VpZ2h0QXR0ciA9IGdlb21ldHJ5LmdldEF0dHJpYnV0ZSgnc2tpbldlaWdodCcpO1xuICAgIGNvbnN0IHNraW5XZWlnaHRBdHRyQXJyYXkgPSBza2luV2VpZ2h0QXR0ciBpbnN0YW5jZW9mIFRIUkVFLkdMQnVmZmVyQXR0cmlidXRlID8gW10gOiBza2luV2VpZ2h0QXR0ci5hcnJheTtcbiAgICBjb25zdCBza2luV2VpZ2h0ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBza2luV2VpZ2h0QXR0ckFycmF5Lmxlbmd0aDsgaSArPSA0KSB7XG4gICAgICBza2luV2VpZ2h0LnB1c2goW1xuICAgICAgICBza2luV2VpZ2h0QXR0ckFycmF5W2ldLFxuICAgICAgICBza2luV2VpZ2h0QXR0ckFycmF5W2kgKyAxXSxcbiAgICAgICAgc2tpbldlaWdodEF0dHJBcnJheVtpICsgMl0sXG4gICAgICAgIHNraW5XZWlnaHRBdHRyQXJyYXlbaSArIDNdLFxuICAgICAgXSk7XG4gICAgfVxuXG4gICAgY29uc3QgaW5kZXggPSBnZW9tZXRyeS5nZXRJbmRleCgpO1xuICAgIGlmICghaW5kZXgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBnZW9tZXRyeSBkb2Vzbid0IGhhdmUgYW4gaW5kZXggYnVmZmVyXCIpO1xuICAgIH1cbiAgICBjb25zdCBvbGRUcmlhbmdsZXMgPSBBcnJheS5mcm9tKGluZGV4LmFycmF5KTtcblxuICAgIGNvbnN0IGNvdW50ID0gdGhpcy5fZXhjbHVkZVRyaWFuZ2xlcyhvbGRUcmlhbmdsZXMsIHNraW5XZWlnaHQsIHNraW5JbmRleCwgZXJhc2luZ0JvbmVzSW5kZXgpO1xuICAgIGNvbnN0IG5ld1RyaWFuZ2xlOiBudW1iZXJbXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgbmV3VHJpYW5nbGVbaV0gPSBvbGRUcmlhbmdsZXNbaV07XG4gICAgfVxuICAgIGdlb21ldHJ5LnNldEluZGV4KG5ld1RyaWFuZ2xlKTtcblxuICAgIC8vIG10b29uIG1hdGVyaWFsIGluY2x1ZGVzIG9uQmVmb3JlUmVuZGVyLiB0aGlzIGlzIHVuc3VwcG9ydGVkIGF0IFNraW5uZWRNZXNoI2Nsb25lXG4gICAgaWYgKHNyYy5vbkJlZm9yZVJlbmRlcikge1xuICAgICAgZHN0Lm9uQmVmb3JlUmVuZGVyID0gc3JjLm9uQmVmb3JlUmVuZGVyO1xuICAgIH1cbiAgICBkc3QuYmluZChuZXcgVEhSRUUuU2tlbGV0b24oc3JjLnNrZWxldG9uLmJvbmVzLCBzcmMuc2tlbGV0b24uYm9uZUludmVyc2VzKSwgbmV3IFRIUkVFLk1hdHJpeDQoKSk7XG4gICAgcmV0dXJuIGRzdDtcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZUhlYWRsZXNzTW9kZWxGb3JTa2lubmVkTWVzaChwYXJlbnQ6IFRIUkVFLk9iamVjdDNELCBtZXNoOiBUSFJFRS5Ta2lubmVkTWVzaCk6IHZvaWQge1xuICAgIGNvbnN0IGVyYXNlQm9uZUluZGV4ZXM6IG51bWJlcltdID0gW107XG4gICAgbWVzaC5za2VsZXRvbi5ib25lcy5mb3JFYWNoKChib25lLCBpbmRleCkgPT4ge1xuICAgICAgaWYgKHRoaXMuX2lzRXJhc2VUYXJnZXQoYm9uZSkpIGVyYXNlQm9uZUluZGV4ZXMucHVzaChpbmRleCk7XG4gICAgfSk7XG5cbiAgICAvLyBVbmxpa2UgVW5pVlJNIHdlIGRvbid0IGNvcHkgbWVzaCBpZiBubyBpbnZpc2libGUgYm9uZSB3YXMgZm91bmRcbiAgICBpZiAoIWVyYXNlQm9uZUluZGV4ZXMubGVuZ3RoKSB7XG4gICAgICBtZXNoLmxheWVycy5lbmFibGUodGhpcy5fdGhpcmRQZXJzb25Pbmx5TGF5ZXIpO1xuICAgICAgbWVzaC5sYXllcnMuZW5hYmxlKHRoaXMuX2ZpcnN0UGVyc29uT25seUxheWVyKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbWVzaC5sYXllcnMuc2V0KHRoaXMuX3RoaXJkUGVyc29uT25seUxheWVyKTtcbiAgICBjb25zdCBuZXdNZXNoID0gdGhpcy5fY3JlYXRlRXJhc2VkTWVzaChtZXNoLCBlcmFzZUJvbmVJbmRleGVzKTtcbiAgICBwYXJlbnQuYWRkKG5ld01lc2gpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlSGVhZGxlc3NNb2RlbChub2RlOiBUSFJFRS5PYmplY3QzRCk6IHZvaWQge1xuICAgIGlmIChub2RlLnR5cGUgPT09ICdHcm91cCcpIHtcbiAgICAgIG5vZGUubGF5ZXJzLnNldCh0aGlzLl90aGlyZFBlcnNvbk9ubHlMYXllcik7XG4gICAgICBpZiAodGhpcy5faXNFcmFzZVRhcmdldChub2RlKSkge1xuICAgICAgICBub2RlLnRyYXZlcnNlKChjaGlsZCkgPT4gY2hpbGQubGF5ZXJzLnNldCh0aGlzLl90aGlyZFBlcnNvbk9ubHlMYXllcikpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcGFyZW50ID0gbmV3IFRIUkVFLkdyb3VwKCk7XG4gICAgICAgIHBhcmVudC5uYW1lID0gYF9oZWFkbGVzc18ke25vZGUubmFtZX1gO1xuICAgICAgICBwYXJlbnQubGF5ZXJzLnNldCh0aGlzLl9maXJzdFBlcnNvbk9ubHlMYXllcik7XG4gICAgICAgIG5vZGUucGFyZW50IS5hZGQocGFyZW50KTtcbiAgICAgICAgbm9kZS5jaGlsZHJlblxuICAgICAgICAgIC5maWx0ZXIoKGNoaWxkKSA9PiBjaGlsZC50eXBlID09PSAnU2tpbm5lZE1lc2gnKVxuICAgICAgICAgIC5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2tpbm5lZE1lc2ggPSBjaGlsZCBhcyBUSFJFRS5Ta2lubmVkTWVzaDtcbiAgICAgICAgICAgIHRoaXMuX2NyZWF0ZUhlYWRsZXNzTW9kZWxGb3JTa2lubmVkTWVzaChwYXJlbnQsIHNraW5uZWRNZXNoKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG5vZGUudHlwZSA9PT0gJ1NraW5uZWRNZXNoJykge1xuICAgICAgY29uc3Qgc2tpbm5lZE1lc2ggPSBub2RlIGFzIFRIUkVFLlNraW5uZWRNZXNoO1xuICAgICAgdGhpcy5fY3JlYXRlSGVhZGxlc3NNb2RlbEZvclNraW5uZWRNZXNoKG5vZGUucGFyZW50ISwgc2tpbm5lZE1lc2gpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5faXNFcmFzZVRhcmdldChub2RlKSkge1xuICAgICAgICBub2RlLmxheWVycy5zZXQodGhpcy5fdGhpcmRQZXJzb25Pbmx5TGF5ZXIpO1xuICAgICAgICBub2RlLnRyYXZlcnNlKChjaGlsZCkgPT4gY2hpbGQubGF5ZXJzLnNldCh0aGlzLl90aGlyZFBlcnNvbk9ubHlMYXllcikpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2lzRXJhc2VUYXJnZXQoYm9uZTogVEhSRUUuT2JqZWN0M0QpOiBib29sZWFuIHtcbiAgICBpZiAoYm9uZSA9PT0gdGhpcy5odW1hbm9pZC5nZXRSYXdCb25lTm9kZSgnaGVhZCcpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKCFib25lLnBhcmVudCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5faXNFcmFzZVRhcmdldChib25lLnBhcmVudCk7XG4gICAgfVxuICB9XG59XG4iLCAiaW1wb3J0IHR5cGUgKiBhcyBWMFZSTSBmcm9tICdAcGl4aXYvdHlwZXMtdnJtLTAuMCc7XG5pbXBvcnQgdHlwZSAqIGFzIFYxVlJNU2NoZW1hIGZyb20gJ0BwaXhpdi90eXBlcy12cm1jLXZybS0xLjAnO1xuaW1wb3J0IHR5cGUgeyBHTFRGLCBHTFRGTG9hZGVyUGx1Z2luLCBHTFRGUGFyc2VyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlci5qcyc7XG5pbXBvcnQgdHlwZSB7IFZSTUh1bWFub2lkIH0gZnJvbSAnLi4vaHVtYW5vaWQvVlJNSHVtYW5vaWQnO1xuaW1wb3J0IHsgZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGVzIH0gZnJvbSAnLi4vdXRpbHMvZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGUnO1xuaW1wb3J0IHsgVlJNRmlyc3RQZXJzb24gfSBmcm9tICcuL1ZSTUZpcnN0UGVyc29uJztcbmltcG9ydCB0eXBlIHsgVlJNRmlyc3RQZXJzb25NZXNoQW5ub3RhdGlvbiB9IGZyb20gJy4vVlJNRmlyc3RQZXJzb25NZXNoQW5ub3RhdGlvbic7XG5pbXBvcnQgdHlwZSB7IFZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb25UeXBlIH0gZnJvbSAnLi9WUk1GaXJzdFBlcnNvbk1lc2hBbm5vdGF0aW9uVHlwZSc7XG5pbXBvcnQgeyBHTFRGIGFzIEdMVEZTY2hlbWEgfSBmcm9tICdAZ2x0Zi10cmFuc2Zvcm0vY29yZSc7XG5cbi8qKlxuICogUG9zc2libGUgc3BlYyB2ZXJzaW9ucyBpdCByZWNvZ25pemVzLlxuICovXG5jb25zdCBQT1NTSUJMRV9TUEVDX1ZFUlNJT05TID0gbmV3IFNldChbJzEuMCcsICcxLjAtYmV0YSddKTtcblxuLyoqXG4gKiBBIHBsdWdpbiBvZiBHTFRGTG9hZGVyIHRoYXQgaW1wb3J0cyBhIHtAbGluayBWUk1GaXJzdFBlcnNvbn0gZnJvbSBhIFZSTSBleHRlbnNpb24gb2YgYSBHTFRGLlxuICovXG5leHBvcnQgY2xhc3MgVlJNRmlyc3RQZXJzb25Mb2FkZXJQbHVnaW4gaW1wbGVtZW50cyBHTFRGTG9hZGVyUGx1Z2luIHtcbiAgcHVibGljIHJlYWRvbmx5IHBhcnNlcjogR0xURlBhcnNlcjtcblxuICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICAvLyBXZSBzaG91bGQgdXNlIHRoZSBleHRlbnNpb24gbmFtZSBpbnN0ZWFkIGJ1dCB3ZSBoYXZlIG11bHRpcGxlIHBsdWdpbnMgZm9yIGFuIGV4dGVuc2lvbi4uLlxuICAgIHJldHVybiAnVlJNRmlyc3RQZXJzb25Mb2FkZXJQbHVnaW4nO1xuICB9XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBhcnNlcjogR0xURlBhcnNlcikge1xuICAgIHRoaXMucGFyc2VyID0gcGFyc2VyO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGFmdGVyUm9vdChnbHRmOiBHTFRGKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgdnJtSHVtYW5vaWQgPSBnbHRmLnVzZXJEYXRhLnZybUh1bWFub2lkIGFzIFZSTUh1bWFub2lkIHwgdW5kZWZpbmVkO1xuXG4gICAgLy8gZXhwbGljaXRseSBkaXN0aW5ndWlzaCBudWxsIGFuZCB1bmRlZmluZWRcbiAgICAvLyBzaW5jZSB2cm1IdW1hbm9pZCBtaWdodCBiZSBudWxsIGFzIGEgcmVzdWx0XG4gICAgaWYgKHZybUh1bWFub2lkID09PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIGlmICh2cm1IdW1hbm9pZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdWUk1GaXJzdFBlcnNvbkxvYWRlclBsdWdpbjogdnJtSHVtYW5vaWQgaXMgdW5kZWZpbmVkLiBWUk1IdW1hbm9pZExvYWRlclBsdWdpbiBoYXZlIHRvIGJlIHVzZWQgZmlyc3QnLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBnbHRmLnVzZXJEYXRhLnZybUZpcnN0UGVyc29uID0gYXdhaXQgdGhpcy5faW1wb3J0KGdsdGYsIHZybUh1bWFub2lkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbXBvcnQgYSB7QGxpbmsgVlJNRmlyc3RQZXJzb259IGZyb20gYSBWUk0uXG4gICAqXG4gICAqIEBwYXJhbSBnbHRmIEEgcGFyc2VkIHJlc3VsdCBvZiBHTFRGIHRha2VuIGZyb20gR0xURkxvYWRlclxuICAgKiBAcGFyYW0gaHVtYW5vaWQgQSB7QGxpbmsgVlJNSHVtYW5vaWR9IGluc3RhbmNlIHRoYXQgcmVwcmVzZW50cyB0aGUgVlJNXG4gICAqL1xuXG4gIHByaXZhdGUgYXN5bmMgX2ltcG9ydChnbHRmOiBHTFRGLCBodW1hbm9pZDogVlJNSHVtYW5vaWQgfCBudWxsKTogUHJvbWlzZTxWUk1GaXJzdFBlcnNvbiB8IG51bGw+IHtcbiAgICBpZiAoaHVtYW5vaWQgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgdjFSZXN1bHQgPSBhd2FpdCB0aGlzLl92MUltcG9ydChnbHRmLCBodW1hbm9pZCk7XG4gICAgaWYgKHYxUmVzdWx0KSB7XG4gICAgICByZXR1cm4gdjFSZXN1bHQ7XG4gICAgfVxuXG4gICAgY29uc3QgdjBSZXN1bHQgPSBhd2FpdCB0aGlzLl92MEltcG9ydChnbHRmLCBodW1hbm9pZCk7XG4gICAgaWYgKHYwUmVzdWx0KSB7XG4gICAgICByZXR1cm4gdjBSZXN1bHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF92MUltcG9ydChnbHRmOiBHTFRGLCBodW1hbm9pZDogVlJNSHVtYW5vaWQpOiBQcm9taXNlPFZSTUZpcnN0UGVyc29uIHwgbnVsbD4ge1xuICAgIGNvbnN0IGpzb24gPSB0aGlzLnBhcnNlci5qc29uIGFzIEdMVEZTY2hlbWEuSUdMVEY7XG5cbiAgICAvLyBlYXJseSBhYm9ydCBpZiBpdCBkb2Vzbid0IHVzZSB2cm1cbiAgICBjb25zdCBpc1ZSTVVzZWQgPSBqc29uLmV4dGVuc2lvbnNVc2VkPy5pbmRleE9mKCdWUk1DX3ZybScpICE9PSAtMTtcbiAgICBpZiAoIWlzVlJNVXNlZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgZXh0ZW5zaW9uID0ganNvbi5leHRlbnNpb25zPy5bJ1ZSTUNfdnJtJ10gYXMgVjFWUk1TY2hlbWEuVlJNQ1ZSTSB8IHVuZGVmaW5lZDtcbiAgICBpZiAoIWV4dGVuc2lvbikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc3BlY1ZlcnNpb24gPSBleHRlbnNpb24uc3BlY1ZlcnNpb247XG4gICAgaWYgKCFQT1NTSUJMRV9TUEVDX1ZFUlNJT05TLmhhcyhzcGVjVmVyc2lvbikpIHtcbiAgICAgIGNvbnNvbGUud2FybihgVlJNRmlyc3RQZXJzb25Mb2FkZXJQbHVnaW46IFVua25vd24gVlJNQ192cm0gc3BlY1ZlcnNpb24gXCIke3NwZWNWZXJzaW9ufVwiYCk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzY2hlbWFGaXJzdFBlcnNvbiA9IGV4dGVuc2lvbi5maXJzdFBlcnNvbjtcblxuICAgIGNvbnN0IG1lc2hBbm5vdGF0aW9uczogVlJNRmlyc3RQZXJzb25NZXNoQW5ub3RhdGlvbltdID0gW107XG4gICAgY29uc3Qgbm9kZVByaW1pdGl2ZXNNYXAgPSBhd2FpdCBnbHRmRXh0cmFjdFByaW1pdGl2ZXNGcm9tTm9kZXMoZ2x0Zik7XG4gICAgQXJyYXkuZnJvbShub2RlUHJpbWl0aXZlc01hcC5lbnRyaWVzKCkpLmZvckVhY2goKFtub2RlSW5kZXgsIHByaW1pdGl2ZXNdKSA9PiB7XG4gICAgICBjb25zdCBhbm5vdGF0aW9uID0gc2NoZW1hRmlyc3RQZXJzb24/Lm1lc2hBbm5vdGF0aW9ucz8uZmluZCgoYSkgPT4gYS5ub2RlID09PSBub2RlSW5kZXgpO1xuXG4gICAgICBtZXNoQW5ub3RhdGlvbnMucHVzaCh7XG4gICAgICAgIG1lc2hlczogcHJpbWl0aXZlcyxcbiAgICAgICAgdHlwZTogYW5ub3RhdGlvbj8udHlwZSA/PyAnYXV0bycsXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHJldHVybiBuZXcgVlJNRmlyc3RQZXJzb24oaHVtYW5vaWQsIG1lc2hBbm5vdGF0aW9ucyk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF92MEltcG9ydChnbHRmOiBHTFRGLCBodW1hbm9pZDogVlJNSHVtYW5vaWQpOiBQcm9taXNlPFZSTUZpcnN0UGVyc29uIHwgbnVsbD4ge1xuICAgIGNvbnN0IGpzb24gPSB0aGlzLnBhcnNlci5qc29uIGFzIEdMVEZTY2hlbWEuSUdMVEY7XG5cbiAgICBjb25zdCB2cm1FeHQgPSBqc29uLmV4dGVuc2lvbnM/LlZSTSBhcyBWMFZSTS5WUk0gfCB1bmRlZmluZWQ7XG4gICAgaWYgKCF2cm1FeHQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNjaGVtYUZpcnN0UGVyc29uOiBWMFZSTS5GaXJzdFBlcnNvbiB8IHVuZGVmaW5lZCA9IHZybUV4dC5maXJzdFBlcnNvbjtcbiAgICBpZiAoIXNjaGVtYUZpcnN0UGVyc29uKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBtZXNoQW5ub3RhdGlvbnM6IFZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb25bXSA9IFtdO1xuICAgIGNvbnN0IG5vZGVQcmltaXRpdmVzTWFwID0gYXdhaXQgZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGVzKGdsdGYpO1xuXG4gICAgQXJyYXkuZnJvbShub2RlUHJpbWl0aXZlc01hcC5lbnRyaWVzKCkpLmZvckVhY2goKFtub2RlSW5kZXgsIHByaW1pdGl2ZXNdKSA9PiB7XG4gICAgICBjb25zdCBzY2hlbWFOb2RlID0ganNvbi5ub2RlcyFbbm9kZUluZGV4XTtcblxuICAgICAgY29uc3QgZmxhZyA9IHNjaGVtYUZpcnN0UGVyc29uLm1lc2hBbm5vdGF0aW9uc1xuICAgICAgICA/IHNjaGVtYUZpcnN0UGVyc29uLm1lc2hBbm5vdGF0aW9ucy5maW5kKChhKSA9PiBhLm1lc2ggPT09IHNjaGVtYU5vZGUubWVzaClcbiAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICAgIG1lc2hBbm5vdGF0aW9ucy5wdXNoKHtcbiAgICAgICAgbWVzaGVzOiBwcmltaXRpdmVzLFxuICAgICAgICB0eXBlOiB0aGlzLl9jb252ZXJ0VjBGbGFnVG9WMVR5cGUoZmxhZz8uZmlyc3RQZXJzb25GbGFnKSxcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5ldyBWUk1GaXJzdFBlcnNvbihodW1hbm9pZCwgbWVzaEFubm90YXRpb25zKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbnZlcnRWMEZsYWdUb1YxVHlwZShmbGFnOiBzdHJpbmcgfCB1bmRlZmluZWQpOiBWUk1GaXJzdFBlcnNvbk1lc2hBbm5vdGF0aW9uVHlwZSB7XG4gICAgaWYgKGZsYWcgPT09ICdGaXJzdFBlcnNvbk9ubHknKSB7XG4gICAgICByZXR1cm4gJ2ZpcnN0UGVyc29uT25seSc7XG4gICAgfSBlbHNlIGlmIChmbGFnID09PSAnVGhpcmRQZXJzb25Pbmx5Jykge1xuICAgICAgcmV0dXJuICd0aGlyZFBlcnNvbk9ubHknO1xuICAgIH0gZWxzZSBpZiAoZmxhZyA9PT0gJ0JvdGgnKSB7XG4gICAgICByZXR1cm4gJ2JvdGgnO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBUaGUgZGVmYXVsdCB2YWx1ZSBpcyAnQXV0bycgZXZlbiBpbiBWUk0wXG4gICAgICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS92cm0tYy9VbmlWUk0vYmxvYi8wN2Q5OGUyZjFhYmM1MjhkMzg3Zjg2MGQyMjI0ZDA4NTViMGQwYjU5L0Fzc2V0cy9WUk0vUnVudGltZS9GaXJzdFBlcnNvbi9WUk1GaXJzdFBlcnNvbi5jcyNMMTE3LUwxMTlcbiAgICAgIHJldHVybiAnYXV0byc7XG4gICAgfVxuICB9XG59XG4iLCAiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uICovXG5cbmV4cG9ydCBjb25zdCBWUk1GaXJzdFBlcnNvbk1lc2hBbm5vdGF0aW9uVHlwZSA9IHtcbiAgQXV0bzogJ2F1dG8nLFxuICBCb3RoOiAnYm90aCcsXG4gIFRoaXJkUGVyc29uT25seTogJ3RoaXJkUGVyc29uT25seScsXG4gIEZpcnN0UGVyc29uT25seTogJ2ZpcnN0UGVyc29uT25seScsXG59IGFzIGNvbnN0O1xuXG5leHBvcnQgdHlwZSBWUk1GaXJzdFBlcnNvbk1lc2hBbm5vdGF0aW9uVHlwZSA9XG4gICh0eXBlb2YgVlJNRmlyc3RQZXJzb25NZXNoQW5ub3RhdGlvblR5cGUpW2tleW9mIHR5cGVvZiBWUk1GaXJzdFBlcnNvbk1lc2hBbm5vdGF0aW9uVHlwZV07XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNSHVtYW5Cb25lIH0gZnJvbSAnLi4vVlJNSHVtYW5Cb25lJztcbmltcG9ydCB7IFZSTUh1bWFub2lkIH0gZnJvbSAnLi4vVlJNSHVtYW5vaWQnO1xuXG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF92M0IgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3F1YXRBID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblxuZXhwb3J0IGNsYXNzIFZSTUh1bWFub2lkSGVscGVyIGV4dGVuZHMgVEhSRUUuR3JvdXAge1xuICBwdWJsaWMgcmVhZG9ubHkgdnJtSHVtYW5vaWQ6IFZSTUh1bWFub2lkO1xuICBwcml2YXRlIF9ib25lQXhlc01hcDogTWFwPFZSTUh1bWFuQm9uZSwgVEhSRUUuQXhlc0hlbHBlcj47XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGh1bWFub2lkOiBWUk1IdW1hbm9pZCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnZybUh1bWFub2lkID0gaHVtYW5vaWQ7XG5cbiAgICB0aGlzLl9ib25lQXhlc01hcCA9IG5ldyBNYXAoKTtcblxuICAgIE9iamVjdC52YWx1ZXMoaHVtYW5vaWQuaHVtYW5Cb25lcykuZm9yRWFjaCgoYm9uZSkgPT4ge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IFRIUkVFLkF4ZXNIZWxwZXIoMS4wKTtcblxuICAgICAgaGVscGVyLm1hdHJpeEF1dG9VcGRhdGUgPSBmYWxzZTtcblxuICAgICAgKGhlbHBlci5tYXRlcmlhbCBhcyBUSFJFRS5NYXRlcmlhbCkuZGVwdGhUZXN0ID0gZmFsc2U7XG4gICAgICAoaGVscGVyLm1hdGVyaWFsIGFzIFRIUkVFLk1hdGVyaWFsKS5kZXB0aFdyaXRlID0gZmFsc2U7XG5cbiAgICAgIHRoaXMuYWRkKGhlbHBlcik7XG5cbiAgICAgIHRoaXMuX2JvbmVBeGVzTWFwLnNldChib25lLCBoZWxwZXIpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgQXJyYXkuZnJvbSh0aGlzLl9ib25lQXhlc01hcC52YWx1ZXMoKSkuZm9yRWFjaCgoYXhlcykgPT4ge1xuICAgICAgYXhlcy5nZW9tZXRyeS5kaXNwb3NlKCk7XG4gICAgICAoYXhlcy5tYXRlcmlhbCBhcyBUSFJFRS5NYXRlcmlhbCkuZGlzcG9zZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZU1hdHJpeFdvcmxkKGZvcmNlOiBib29sZWFuKTogdm9pZCB7XG4gICAgQXJyYXkuZnJvbSh0aGlzLl9ib25lQXhlc01hcC5lbnRyaWVzKCkpLmZvckVhY2goKFtib25lLCBheGVzXSkgPT4ge1xuICAgICAgYm9uZS5ub2RlLnVwZGF0ZVdvcmxkTWF0cml4KHRydWUsIGZhbHNlKTtcblxuICAgICAgYm9uZS5ub2RlLm1hdHJpeFdvcmxkLmRlY29tcG9zZShfdjNBLCBfcXVhdEEsIF92M0IpO1xuXG4gICAgICBjb25zdCBzY2FsZSA9IF92M0Euc2V0KDAuMSwgMC4xLCAwLjEpLmRpdmlkZShfdjNCKTtcbiAgICAgIGF4ZXMubWF0cml4LmNvcHkoYm9uZS5ub2RlLm1hdHJpeFdvcmxkKS5zY2FsZShzY2FsZSk7XG4gICAgfSk7XG5cbiAgICBzdXBlci51cGRhdGVNYXRyaXhXb3JsZChmb3JjZSk7XG4gIH1cbn1cbiIsICIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cblxuaW1wb3J0IHsgVlJNSHVtYW5Cb25lTmFtZSB9IGZyb20gJy4vVlJNSHVtYW5Cb25lTmFtZSc7XG5cbi8qKlxuICogVGhlIGxpc3Qgb2Yge0BsaW5rIFZSTUh1bWFuQm9uZU5hbWV9LiBEZXBlbmRlbmN5IGF3YXJlLlxuICovXG5leHBvcnQgY29uc3QgVlJNSHVtYW5Cb25lTGlzdDogVlJNSHVtYW5Cb25lTmFtZVtdID0gW1xuICAnaGlwcycsXG4gICdzcGluZScsXG4gICdjaGVzdCcsXG4gICd1cHBlckNoZXN0JyxcbiAgJ25lY2snLFxuXG4gICdoZWFkJyxcbiAgJ2xlZnRFeWUnLFxuICAncmlnaHRFeWUnLFxuICAnamF3JyxcblxuICAnbGVmdFVwcGVyTGVnJyxcbiAgJ2xlZnRMb3dlckxlZycsXG4gICdsZWZ0Rm9vdCcsXG4gICdsZWZ0VG9lcycsXG5cbiAgJ3JpZ2h0VXBwZXJMZWcnLFxuICAncmlnaHRMb3dlckxlZycsXG4gICdyaWdodEZvb3QnLFxuICAncmlnaHRUb2VzJyxcblxuICAnbGVmdFNob3VsZGVyJyxcbiAgJ2xlZnRVcHBlckFybScsXG4gICdsZWZ0TG93ZXJBcm0nLFxuICAnbGVmdEhhbmQnLFxuXG4gICdyaWdodFNob3VsZGVyJyxcbiAgJ3JpZ2h0VXBwZXJBcm0nLFxuICAncmlnaHRMb3dlckFybScsXG4gICdyaWdodEhhbmQnLFxuXG4gICdsZWZ0VGh1bWJNZXRhY2FycGFsJyxcbiAgJ2xlZnRUaHVtYlByb3hpbWFsJyxcbiAgJ2xlZnRUaHVtYkRpc3RhbCcsXG4gICdsZWZ0SW5kZXhQcm94aW1hbCcsXG4gICdsZWZ0SW5kZXhJbnRlcm1lZGlhdGUnLFxuICAnbGVmdEluZGV4RGlzdGFsJyxcbiAgJ2xlZnRNaWRkbGVQcm94aW1hbCcsXG4gICdsZWZ0TWlkZGxlSW50ZXJtZWRpYXRlJyxcbiAgJ2xlZnRNaWRkbGVEaXN0YWwnLFxuICAnbGVmdFJpbmdQcm94aW1hbCcsXG4gICdsZWZ0UmluZ0ludGVybWVkaWF0ZScsXG4gICdsZWZ0UmluZ0Rpc3RhbCcsXG4gICdsZWZ0TGl0dGxlUHJveGltYWwnLFxuICAnbGVmdExpdHRsZUludGVybWVkaWF0ZScsXG4gICdsZWZ0TGl0dGxlRGlzdGFsJyxcblxuICAncmlnaHRUaHVtYk1ldGFjYXJwYWwnLFxuICAncmlnaHRUaHVtYlByb3hpbWFsJyxcbiAgJ3JpZ2h0VGh1bWJEaXN0YWwnLFxuICAncmlnaHRJbmRleFByb3hpbWFsJyxcbiAgJ3JpZ2h0SW5kZXhJbnRlcm1lZGlhdGUnLFxuICAncmlnaHRJbmRleERpc3RhbCcsXG4gICdyaWdodE1pZGRsZVByb3hpbWFsJyxcbiAgJ3JpZ2h0TWlkZGxlSW50ZXJtZWRpYXRlJyxcbiAgJ3JpZ2h0TWlkZGxlRGlzdGFsJyxcbiAgJ3JpZ2h0UmluZ1Byb3hpbWFsJyxcbiAgJ3JpZ2h0UmluZ0ludGVybWVkaWF0ZScsXG4gICdyaWdodFJpbmdEaXN0YWwnLFxuICAncmlnaHRMaXR0bGVQcm94aW1hbCcsXG4gICdyaWdodExpdHRsZUludGVybWVkaWF0ZScsXG4gICdyaWdodExpdHRsZURpc3RhbCcsXG5dO1xuIiwgIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiAqL1xuXG4vKipcbiAqIFRoZSBuYW1lcyBvZiB7QGxpbmsgVlJNSHVtYW5vaWR9IGJvbmUgbmFtZXMuXG4gKlxuICogUmVmOiBodHRwczovL2dpdGh1Yi5jb20vdnJtLWMvdnJtLXNwZWNpZmljYXRpb24vYmxvYi9tYXN0ZXIvc3BlY2lmaWNhdGlvbi9WUk1DX3ZybS0xLjAvaHVtYW5vaWQubWRcbiAqL1xuZXhwb3J0IGNvbnN0IFZSTUh1bWFuQm9uZU5hbWUgPSB7XG4gIEhpcHM6ICdoaXBzJyxcbiAgU3BpbmU6ICdzcGluZScsXG4gIENoZXN0OiAnY2hlc3QnLFxuICBVcHBlckNoZXN0OiAndXBwZXJDaGVzdCcsXG4gIE5lY2s6ICduZWNrJyxcblxuICBIZWFkOiAnaGVhZCcsXG4gIExlZnRFeWU6ICdsZWZ0RXllJyxcbiAgUmlnaHRFeWU6ICdyaWdodEV5ZScsXG4gIEphdzogJ2phdycsXG5cbiAgTGVmdFVwcGVyTGVnOiAnbGVmdFVwcGVyTGVnJyxcbiAgTGVmdExvd2VyTGVnOiAnbGVmdExvd2VyTGVnJyxcbiAgTGVmdEZvb3Q6ICdsZWZ0Rm9vdCcsXG4gIExlZnRUb2VzOiAnbGVmdFRvZXMnLFxuXG4gIFJpZ2h0VXBwZXJMZWc6ICdyaWdodFVwcGVyTGVnJyxcbiAgUmlnaHRMb3dlckxlZzogJ3JpZ2h0TG93ZXJMZWcnLFxuICBSaWdodEZvb3Q6ICdyaWdodEZvb3QnLFxuICBSaWdodFRvZXM6ICdyaWdodFRvZXMnLFxuXG4gIExlZnRTaG91bGRlcjogJ2xlZnRTaG91bGRlcicsXG4gIExlZnRVcHBlckFybTogJ2xlZnRVcHBlckFybScsXG4gIExlZnRMb3dlckFybTogJ2xlZnRMb3dlckFybScsXG4gIExlZnRIYW5kOiAnbGVmdEhhbmQnLFxuXG4gIFJpZ2h0U2hvdWxkZXI6ICdyaWdodFNob3VsZGVyJyxcbiAgUmlnaHRVcHBlckFybTogJ3JpZ2h0VXBwZXJBcm0nLFxuICBSaWdodExvd2VyQXJtOiAncmlnaHRMb3dlckFybScsXG4gIFJpZ2h0SGFuZDogJ3JpZ2h0SGFuZCcsXG5cbiAgTGVmdFRodW1iTWV0YWNhcnBhbDogJ2xlZnRUaHVtYk1ldGFjYXJwYWwnLFxuICBMZWZ0VGh1bWJQcm94aW1hbDogJ2xlZnRUaHVtYlByb3hpbWFsJyxcbiAgTGVmdFRodW1iRGlzdGFsOiAnbGVmdFRodW1iRGlzdGFsJyxcbiAgTGVmdEluZGV4UHJveGltYWw6ICdsZWZ0SW5kZXhQcm94aW1hbCcsXG4gIExlZnRJbmRleEludGVybWVkaWF0ZTogJ2xlZnRJbmRleEludGVybWVkaWF0ZScsXG4gIExlZnRJbmRleERpc3RhbDogJ2xlZnRJbmRleERpc3RhbCcsXG4gIExlZnRNaWRkbGVQcm94aW1hbDogJ2xlZnRNaWRkbGVQcm94aW1hbCcsXG4gIExlZnRNaWRkbGVJbnRlcm1lZGlhdGU6ICdsZWZ0TWlkZGxlSW50ZXJtZWRpYXRlJyxcbiAgTGVmdE1pZGRsZURpc3RhbDogJ2xlZnRNaWRkbGVEaXN0YWwnLFxuICBMZWZ0UmluZ1Byb3hpbWFsOiAnbGVmdFJpbmdQcm94aW1hbCcsXG4gIExlZnRSaW5nSW50ZXJtZWRpYXRlOiAnbGVmdFJpbmdJbnRlcm1lZGlhdGUnLFxuICBMZWZ0UmluZ0Rpc3RhbDogJ2xlZnRSaW5nRGlzdGFsJyxcbiAgTGVmdExpdHRsZVByb3hpbWFsOiAnbGVmdExpdHRsZVByb3hpbWFsJyxcbiAgTGVmdExpdHRsZUludGVybWVkaWF0ZTogJ2xlZnRMaXR0bGVJbnRlcm1lZGlhdGUnLFxuICBMZWZ0TGl0dGxlRGlzdGFsOiAnbGVmdExpdHRsZURpc3RhbCcsXG5cbiAgUmlnaHRUaHVtYk1ldGFjYXJwYWw6ICdyaWdodFRodW1iTWV0YWNhcnBhbCcsXG4gIFJpZ2h0VGh1bWJQcm94aW1hbDogJ3JpZ2h0VGh1bWJQcm94aW1hbCcsXG4gIFJpZ2h0VGh1bWJEaXN0YWw6ICdyaWdodFRodW1iRGlzdGFsJyxcbiAgUmlnaHRJbmRleFByb3hpbWFsOiAncmlnaHRJbmRleFByb3hpbWFsJyxcbiAgUmlnaHRJbmRleEludGVybWVkaWF0ZTogJ3JpZ2h0SW5kZXhJbnRlcm1lZGlhdGUnLFxuICBSaWdodEluZGV4RGlzdGFsOiAncmlnaHRJbmRleERpc3RhbCcsXG4gIFJpZ2h0TWlkZGxlUHJveGltYWw6ICdyaWdodE1pZGRsZVByb3hpbWFsJyxcbiAgUmlnaHRNaWRkbGVJbnRlcm1lZGlhdGU6ICdyaWdodE1pZGRsZUludGVybWVkaWF0ZScsXG4gIFJpZ2h0TWlkZGxlRGlzdGFsOiAncmlnaHRNaWRkbGVEaXN0YWwnLFxuICBSaWdodFJpbmdQcm94aW1hbDogJ3JpZ2h0UmluZ1Byb3hpbWFsJyxcbiAgUmlnaHRSaW5nSW50ZXJtZWRpYXRlOiAncmlnaHRSaW5nSW50ZXJtZWRpYXRlJyxcbiAgUmlnaHRSaW5nRGlzdGFsOiAncmlnaHRSaW5nRGlzdGFsJyxcbiAgUmlnaHRMaXR0bGVQcm94aW1hbDogJ3JpZ2h0TGl0dGxlUHJveGltYWwnLFxuICBSaWdodExpdHRsZUludGVybWVkaWF0ZTogJ3JpZ2h0TGl0dGxlSW50ZXJtZWRpYXRlJyxcbiAgUmlnaHRMaXR0bGVEaXN0YWw6ICdyaWdodExpdHRsZURpc3RhbCcsXG59IGFzIGNvbnN0O1xuXG5leHBvcnQgdHlwZSBWUk1IdW1hbkJvbmVOYW1lID0gKHR5cGVvZiBWUk1IdW1hbkJvbmVOYW1lKVtrZXlvZiB0eXBlb2YgVlJNSHVtYW5Cb25lTmFtZV07XG4iLCAiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uICovXG5cbmltcG9ydCB7IFZSTUh1bWFuQm9uZU5hbWUgfSBmcm9tICcuL1ZSTUh1bWFuQm9uZU5hbWUnO1xuXG4vKipcbiAqIEFuIG9iamVjdCB0aGF0IG1hcHMgZnJvbSB7QGxpbmsgVlJNSHVtYW5Cb25lTmFtZX0gdG8gaXRzIHBhcmVudCB7QGxpbmsgVlJNSHVtYW5Cb25lTmFtZX0uXG4gKlxuICogUmVmOiBodHRwczovL2dpdGh1Yi5jb20vdnJtLWMvdnJtLXNwZWNpZmljYXRpb24vYmxvYi9tYXN0ZXIvc3BlY2lmaWNhdGlvbi9WUk1DX3ZybS0xLjAvaHVtYW5vaWQubWRcbiAqL1xuZXhwb3J0IGNvbnN0IFZSTUh1bWFuQm9uZVBhcmVudE1hcDogeyBbYm9uZSBpbiBWUk1IdW1hbkJvbmVOYW1lXTogVlJNSHVtYW5Cb25lTmFtZSB8IG51bGwgfSA9IHtcbiAgaGlwczogbnVsbCxcbiAgc3BpbmU6ICdoaXBzJyxcbiAgY2hlc3Q6ICdzcGluZScsXG4gIHVwcGVyQ2hlc3Q6ICdjaGVzdCcsXG4gIG5lY2s6ICd1cHBlckNoZXN0JyxcblxuICBoZWFkOiAnbmVjaycsXG4gIGxlZnRFeWU6ICdoZWFkJyxcbiAgcmlnaHRFeWU6ICdoZWFkJyxcbiAgamF3OiAnaGVhZCcsXG5cbiAgbGVmdFVwcGVyTGVnOiAnaGlwcycsXG4gIGxlZnRMb3dlckxlZzogJ2xlZnRVcHBlckxlZycsXG4gIGxlZnRGb290OiAnbGVmdExvd2VyTGVnJyxcbiAgbGVmdFRvZXM6ICdsZWZ0Rm9vdCcsXG5cbiAgcmlnaHRVcHBlckxlZzogJ2hpcHMnLFxuICByaWdodExvd2VyTGVnOiAncmlnaHRVcHBlckxlZycsXG4gIHJpZ2h0Rm9vdDogJ3JpZ2h0TG93ZXJMZWcnLFxuICByaWdodFRvZXM6ICdyaWdodEZvb3QnLFxuXG4gIGxlZnRTaG91bGRlcjogJ3VwcGVyQ2hlc3QnLFxuICBsZWZ0VXBwZXJBcm06ICdsZWZ0U2hvdWxkZXInLFxuICBsZWZ0TG93ZXJBcm06ICdsZWZ0VXBwZXJBcm0nLFxuICBsZWZ0SGFuZDogJ2xlZnRMb3dlckFybScsXG5cbiAgcmlnaHRTaG91bGRlcjogJ3VwcGVyQ2hlc3QnLFxuICByaWdodFVwcGVyQXJtOiAncmlnaHRTaG91bGRlcicsXG4gIHJpZ2h0TG93ZXJBcm06ICdyaWdodFVwcGVyQXJtJyxcbiAgcmlnaHRIYW5kOiAncmlnaHRMb3dlckFybScsXG5cbiAgbGVmdFRodW1iTWV0YWNhcnBhbDogJ2xlZnRIYW5kJyxcbiAgbGVmdFRodW1iUHJveGltYWw6ICdsZWZ0VGh1bWJNZXRhY2FycGFsJyxcbiAgbGVmdFRodW1iRGlzdGFsOiAnbGVmdFRodW1iUHJveGltYWwnLFxuICBsZWZ0SW5kZXhQcm94aW1hbDogJ2xlZnRIYW5kJyxcbiAgbGVmdEluZGV4SW50ZXJtZWRpYXRlOiAnbGVmdEluZGV4UHJveGltYWwnLFxuICBsZWZ0SW5kZXhEaXN0YWw6ICdsZWZ0SW5kZXhJbnRlcm1lZGlhdGUnLFxuICBsZWZ0TWlkZGxlUHJveGltYWw6ICdsZWZ0SGFuZCcsXG4gIGxlZnRNaWRkbGVJbnRlcm1lZGlhdGU6ICdsZWZ0TWlkZGxlUHJveGltYWwnLFxuICBsZWZ0TWlkZGxlRGlzdGFsOiAnbGVmdE1pZGRsZUludGVybWVkaWF0ZScsXG4gIGxlZnRSaW5nUHJveGltYWw6ICdsZWZ0SGFuZCcsXG4gIGxlZnRSaW5nSW50ZXJtZWRpYXRlOiAnbGVmdFJpbmdQcm94aW1hbCcsXG4gIGxlZnRSaW5nRGlzdGFsOiAnbGVmdFJpbmdJbnRlcm1lZGlhdGUnLFxuICBsZWZ0TGl0dGxlUHJveGltYWw6ICdsZWZ0SGFuZCcsXG4gIGxlZnRMaXR0bGVJbnRlcm1lZGlhdGU6ICdsZWZ0TGl0dGxlUHJveGltYWwnLFxuICBsZWZ0TGl0dGxlRGlzdGFsOiAnbGVmdExpdHRsZUludGVybWVkaWF0ZScsXG5cbiAgcmlnaHRUaHVtYk1ldGFjYXJwYWw6ICdyaWdodEhhbmQnLFxuICByaWdodFRodW1iUHJveGltYWw6ICdyaWdodFRodW1iTWV0YWNhcnBhbCcsXG4gIHJpZ2h0VGh1bWJEaXN0YWw6ICdyaWdodFRodW1iUHJveGltYWwnLFxuICByaWdodEluZGV4UHJveGltYWw6ICdyaWdodEhhbmQnLFxuICByaWdodEluZGV4SW50ZXJtZWRpYXRlOiAncmlnaHRJbmRleFByb3hpbWFsJyxcbiAgcmlnaHRJbmRleERpc3RhbDogJ3JpZ2h0SW5kZXhJbnRlcm1lZGlhdGUnLFxuICByaWdodE1pZGRsZVByb3hpbWFsOiAncmlnaHRIYW5kJyxcbiAgcmlnaHRNaWRkbGVJbnRlcm1lZGlhdGU6ICdyaWdodE1pZGRsZVByb3hpbWFsJyxcbiAgcmlnaHRNaWRkbGVEaXN0YWw6ICdyaWdodE1pZGRsZUludGVybWVkaWF0ZScsXG4gIHJpZ2h0UmluZ1Byb3hpbWFsOiAncmlnaHRIYW5kJyxcbiAgcmlnaHRSaW5nSW50ZXJtZWRpYXRlOiAncmlnaHRSaW5nUHJveGltYWwnLFxuICByaWdodFJpbmdEaXN0YWw6ICdyaWdodFJpbmdJbnRlcm1lZGlhdGUnLFxuICByaWdodExpdHRsZVByb3hpbWFsOiAncmlnaHRIYW5kJyxcbiAgcmlnaHRMaXR0bGVJbnRlcm1lZGlhdGU6ICdyaWdodExpdHRsZVByb3hpbWFsJyxcbiAgcmlnaHRMaXR0bGVEaXN0YWw6ICdyaWdodExpdHRsZUludGVybWVkaWF0ZScsXG59O1xuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IHF1YXRJbnZlcnRDb21wYXQgfSBmcm9tICcuLi91dGlscy9xdWF0SW52ZXJ0Q29tcGF0JztcbmltcG9ydCB0eXBlIHsgVlJNSHVtYW5Cb25lIH0gZnJvbSAnLi9WUk1IdW1hbkJvbmUnO1xuaW1wb3J0IHR5cGUgeyBWUk1IdW1hbkJvbmVzIH0gZnJvbSAnLi9WUk1IdW1hbkJvbmVzJztcbmltcG9ydCB0eXBlIHsgVlJNSHVtYW5Cb25lTmFtZSB9IGZyb20gJy4vVlJNSHVtYW5Cb25lTmFtZSc7XG5pbXBvcnQgdHlwZSB7IFZSTVBvc2UgfSBmcm9tICcuL1ZSTVBvc2UnO1xuXG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF9xdWF0QSA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5cbi8qKlxuICogQSBjbGFzcyByZXByZXNlbnRzIHRoZSBSaWcgb2YgYSBWUk0uXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1SaWcge1xuICAvKipcbiAgICogQSB7QGxpbmsgVlJNSHVtYW5Cb25lc30gdGhhdCBjb250YWlucyBhbGwgdGhlIGh1bWFuIGJvbmVzIG9mIHRoZSBWUk0uXG4gICAqIFlvdSBtaWdodCB3YW50IHRvIGdldCB0aGVzZSBib25lcyB1c2luZyB7QGxpbmsgVlJNSHVtYW5vaWQuZ2V0Qm9uZX0uXG4gICAqL1xuICBwdWJsaWMgaHVtYW5Cb25lczogVlJNSHVtYW5Cb25lcztcblxuICAvKipcbiAgICogQSB7QGxpbmsgVlJNUG9zZX0gdGhhdCBpcyBpdHMgZGVmYXVsdCBzdGF0ZS5cbiAgICogTm90ZSB0aGF0IGl0J3Mgbm90IGNvbXBhdGlibGUgd2l0aCB7QGxpbmsgc2V0UG9zZX0gYW5kIHtAbGluayBnZXRQb3NlfSwgc2luY2UgaXQgY29udGFpbnMgbm9uLXJlbGF0aXZlIHZhbHVlcyBvZiBlYWNoIGxvY2FsIHRyYW5zZm9ybXMuXG4gICAqL1xuICBwdWJsaWMgcmVzdFBvc2U6IFZSTVBvc2U7XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyB7QGxpbmsgVlJNSHVtYW5vaWR9LlxuICAgKiBAcGFyYW0gaHVtYW5Cb25lcyBBIHtAbGluayBWUk1IdW1hbkJvbmVzfSBjb250YWlucyBhbGwgdGhlIGJvbmVzIG9mIHRoZSBuZXcgaHVtYW5vaWRcbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihodW1hbkJvbmVzOiBWUk1IdW1hbkJvbmVzKSB7XG4gICAgdGhpcy5odW1hbkJvbmVzID0gaHVtYW5Cb25lcztcblxuICAgIHRoaXMucmVzdFBvc2UgPSB0aGlzLmdldEFic29sdXRlUG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgY3VycmVudCBhYnNvbHV0ZSBwb3NlIG9mIHRoaXMgaHVtYW5vaWQgYXMgYSB7QGxpbmsgVlJNUG9zZX0uXG4gICAqIE5vdGUgdGhhdCB0aGUgb3V0cHV0IHJlc3VsdCB3aWxsIGNvbnRhaW4gaW5pdGlhbCBzdGF0ZSBvZiB0aGUgVlJNIGFuZCBub3QgY29tcGF0aWJsZSBiZXR3ZWVuIGRpZmZlcmVudCBtb2RlbHMuXG4gICAqIFlvdSBtaWdodCB3YW50IHRvIHVzZSB7QGxpbmsgZ2V0UG9zZX0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBnZXRBYnNvbHV0ZVBvc2UoKTogVlJNUG9zZSB7XG4gICAgY29uc3QgcG9zZSA9IHt9IGFzIFZSTVBvc2U7XG5cbiAgICBPYmplY3Qua2V5cyh0aGlzLmh1bWFuQm9uZXMpLmZvckVhY2goKHZybUJvbmVOYW1lU3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCB2cm1Cb25lTmFtZSA9IHZybUJvbmVOYW1lU3RyaW5nIGFzIFZSTUh1bWFuQm9uZU5hbWU7XG4gICAgICBjb25zdCBub2RlID0gdGhpcy5nZXRCb25lTm9kZSh2cm1Cb25lTmFtZSk7XG5cbiAgICAgIC8vIElnbm9yZSB3aGVuIHRoZXJlIGFyZSBubyBib25lIG9uIHRoZSBWUk1IdW1hbm9pZFxuICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gR2V0IHRoZSBwb3NpdGlvbiAvIHJvdGF0aW9uIGZyb20gdGhlIG5vZGVcbiAgICAgIF92M0EuY29weShub2RlLnBvc2l0aW9uKTtcbiAgICAgIF9xdWF0QS5jb3B5KG5vZGUucXVhdGVybmlvbik7XG5cbiAgICAgIC8vIENvbnZlcnQgdG8gcmF3IGFycmF5c1xuICAgICAgcG9zZVt2cm1Cb25lTmFtZV0gPSB7XG4gICAgICAgIHBvc2l0aW9uOiBfdjNBLnRvQXJyYXkoKSBhcyBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl0sXG4gICAgICAgIHJvdGF0aW9uOiBfcXVhdEEudG9BcnJheSgpIGFzIFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdLFxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIHJldHVybiBwb3NlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgY3VycmVudCBwb3NlIG9mIHRoaXMgaHVtYW5vaWQgYXMgYSB7QGxpbmsgVlJNUG9zZX0uXG4gICAqXG4gICAqIEVhY2ggdHJhbnNmb3JtIGlzIGEgbG9jYWwgdHJhbnNmb3JtIHJlbGF0aXZlIGZyb20gcmVzdCBwb3NlIChULXBvc2UpLlxuICAgKi9cbiAgcHVibGljIGdldFBvc2UoKTogVlJNUG9zZSB7XG4gICAgY29uc3QgcG9zZSA9IHt9IGFzIFZSTVBvc2U7XG5cbiAgICBPYmplY3Qua2V5cyh0aGlzLmh1bWFuQm9uZXMpLmZvckVhY2goKGJvbmVOYW1lU3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCBib25lTmFtZSA9IGJvbmVOYW1lU3RyaW5nIGFzIFZSTUh1bWFuQm9uZU5hbWU7XG4gICAgICBjb25zdCBub2RlID0gdGhpcy5nZXRCb25lTm9kZShib25lTmFtZSk7XG5cbiAgICAgIC8vIElnbm9yZSB3aGVuIHRoZXJlIGFyZSBubyBib25lIG9uIHRoZSBWUk1IdW1hbm9pZFxuICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gVGFrZSBhIGRpZmYgZnJvbSByZXN0UG9zZVxuICAgICAgX3YzQS5zZXQoMCwgMCwgMCk7XG4gICAgICBfcXVhdEEuaWRlbnRpdHkoKTtcblxuICAgICAgY29uc3QgcmVzdFN0YXRlID0gdGhpcy5yZXN0UG9zZVtib25lTmFtZV07XG4gICAgICBpZiAocmVzdFN0YXRlPy5wb3NpdGlvbikge1xuICAgICAgICBfdjNBLmZyb21BcnJheShyZXN0U3RhdGUucG9zaXRpb24pLm5lZ2F0ZSgpO1xuICAgICAgfVxuICAgICAgaWYgKHJlc3RTdGF0ZT8ucm90YXRpb24pIHtcbiAgICAgICAgcXVhdEludmVydENvbXBhdChfcXVhdEEuZnJvbUFycmF5KHJlc3RTdGF0ZS5yb3RhdGlvbikpO1xuICAgICAgfVxuXG4gICAgICAvLyBHZXQgdGhlIHBvc2l0aW9uIC8gcm90YXRpb24gZnJvbSB0aGUgbm9kZVxuICAgICAgX3YzQS5hZGQobm9kZS5wb3NpdGlvbik7XG4gICAgICBfcXVhdEEucHJlbXVsdGlwbHkobm9kZS5xdWF0ZXJuaW9uKTtcblxuICAgICAgLy8gQ29udmVydCB0byByYXcgYXJyYXlzXG4gICAgICBwb3NlW2JvbmVOYW1lXSA9IHtcbiAgICAgICAgcG9zaXRpb246IF92M0EudG9BcnJheSgpIGFzIFtudW1iZXIsIG51bWJlciwgbnVtYmVyXSxcbiAgICAgICAgcm90YXRpb246IF9xdWF0QS50b0FycmF5KCkgYXMgW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl0sXG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHBvc2U7XG4gIH1cblxuICAvKipcbiAgICogTGV0IHRoZSBodW1hbm9pZCBkbyBhIHNwZWNpZmllZCBwb3NlLlxuICAgKlxuICAgKiBFYWNoIHRyYW5zZm9ybSBoYXZlIHRvIGJlIGEgbG9jYWwgdHJhbnNmb3JtIHJlbGF0aXZlIGZyb20gcmVzdCBwb3NlIChULXBvc2UpLlxuICAgKiBZb3UgY2FuIHBhc3Mgd2hhdCB5b3UgZ290IGZyb20ge0BsaW5rIGdldFBvc2V9LlxuICAgKlxuICAgKiBAcGFyYW0gcG9zZU9iamVjdCBBIHtAbGluayBWUk1Qb3NlfSB0aGF0IHJlcHJlc2VudHMgYSBzaW5nbGUgcG9zZVxuICAgKi9cbiAgcHVibGljIHNldFBvc2UocG9zZU9iamVjdDogVlJNUG9zZSk6IHZvaWQge1xuICAgIE9iamVjdC5lbnRyaWVzKHBvc2VPYmplY3QpLmZvckVhY2goKFtib25lTmFtZVN0cmluZywgc3RhdGVdKSA9PiB7XG4gICAgICBjb25zdCBib25lTmFtZSA9IGJvbmVOYW1lU3RyaW5nIGFzIFZSTUh1bWFuQm9uZU5hbWU7XG4gICAgICBjb25zdCBub2RlID0gdGhpcy5nZXRCb25lTm9kZShib25lTmFtZSk7XG5cbiAgICAgIC8vIElnbm9yZSB3aGVuIHRoZXJlIGFyZSBubyBib25lIHRoYXQgaXMgZGVmaW5lZCBpbiB0aGUgcG9zZSBvbiB0aGUgVlJNSHVtYW5vaWRcbiAgICAgIGlmICghbm9kZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlc3RTdGF0ZSA9IHRoaXMucmVzdFBvc2VbYm9uZU5hbWVdO1xuICAgICAgaWYgKCFyZXN0U3RhdGUpIHtcbiAgICAgICAgLy8gSXQncyB2ZXJ5IHVubGlrZWx5LiBQb3NzaWJseSBhIGJ1Z1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIEFwcGx5IHRoZSBzdGF0ZSB0byB0aGUgYWN0dWFsIGJvbmVcbiAgICAgIGlmIChzdGF0ZT8ucG9zaXRpb24pIHtcbiAgICAgICAgbm9kZS5wb3NpdGlvbi5mcm9tQXJyYXkoc3RhdGUucG9zaXRpb24pO1xuXG4gICAgICAgIGlmIChyZXN0U3RhdGUucG9zaXRpb24pIHtcbiAgICAgICAgICBub2RlLnBvc2l0aW9uLmFkZChfdjNBLmZyb21BcnJheShyZXN0U3RhdGUucG9zaXRpb24pKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGU/LnJvdGF0aW9uKSB7XG4gICAgICAgIG5vZGUucXVhdGVybmlvbi5mcm9tQXJyYXkoc3RhdGUucm90YXRpb24pO1xuXG4gICAgICAgIGlmIChyZXN0U3RhdGUucm90YXRpb24pIHtcbiAgICAgICAgICBub2RlLnF1YXRlcm5pb24ubXVsdGlwbHkoX3F1YXRBLmZyb21BcnJheShyZXN0U3RhdGUucm90YXRpb24pKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoZSBodW1hbm9pZCB0byBpdHMgcmVzdCBwb3NlLlxuICAgKi9cbiAgcHVibGljIHJlc2V0UG9zZSgpOiB2b2lkIHtcbiAgICBPYmplY3QuZW50cmllcyh0aGlzLnJlc3RQb3NlKS5mb3JFYWNoKChbYm9uZU5hbWUsIHJlc3RdKSA9PiB7XG4gICAgICBjb25zdCBub2RlID0gdGhpcy5nZXRCb25lTm9kZShib25lTmFtZSBhcyBWUk1IdW1hbkJvbmVOYW1lKTtcblxuICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHJlc3Q/LnBvc2l0aW9uKSB7XG4gICAgICAgIG5vZGUucG9zaXRpb24uZnJvbUFycmF5KHJlc3QucG9zaXRpb24pO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVzdD8ucm90YXRpb24pIHtcbiAgICAgICAgbm9kZS5xdWF0ZXJuaW9uLmZyb21BcnJheShyZXN0LnJvdGF0aW9uKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYSBib25lIGJvdW5kIHRvIGEgc3BlY2lmaWVkIHtAbGluayBWUk1IdW1hbkJvbmVOYW1lfSwgYXMgYSB7QGxpbmsgVlJNSHVtYW5Cb25lfS5cbiAgICpcbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgYm9uZSB5b3Ugd2FudFxuICAgKi9cbiAgcHVibGljIGdldEJvbmUobmFtZTogVlJNSHVtYW5Cb25lTmFtZSk6IFZSTUh1bWFuQm9uZSB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuaHVtYW5Cb25lc1tuYW1lXSA/PyB1bmRlZmluZWQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGEgYm9uZSBib3VuZCB0byBhIHNwZWNpZmllZCB7QGxpbmsgVlJNSHVtYW5Cb25lTmFtZX0sIGFzIGEgYFRIUkVFLk9iamVjdDNEYC5cbiAgICpcbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgYm9uZSB5b3Ugd2FudFxuICAgKi9cbiAgcHVibGljIGdldEJvbmVOb2RlKG5hbWU6IFZSTUh1bWFuQm9uZU5hbWUpOiBUSFJFRS5PYmplY3QzRCB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLmh1bWFuQm9uZXNbbmFtZV0/Lm5vZGUgPz8gbnVsbDtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBBIGNvbXBhdCBmdW5jdGlvbiBmb3IgYFF1YXRlcm5pb24uaW52ZXJ0KClgIC8gYFF1YXRlcm5pb24uaW52ZXJzZSgpYC5cbiAqIGBRdWF0ZXJuaW9uLmludmVydCgpYCBpcyBpbnRyb2R1Y2VkIGluIHIxMjMgYW5kIGBRdWF0ZXJuaW9uLmludmVyc2UoKWAgZW1pdHMgYSB3YXJuaW5nLlxuICogV2UgYXJlIGdvaW5nIHRvIHVzZSB0aGlzIGNvbXBhdCBmb3IgYSB3aGlsZS5cbiAqIEBwYXJhbSB0YXJnZXQgQSB0YXJnZXQgcXVhdGVybmlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gcXVhdEludmVydENvbXBhdDxUIGV4dGVuZHMgVEhSRUUuUXVhdGVybmlvbj4odGFyZ2V0OiBUKTogVCB7XG4gIGlmICgodGFyZ2V0IGFzIGFueSkuaW52ZXJ0KSB7XG4gICAgdGFyZ2V0LmludmVydCgpO1xuICB9IGVsc2Uge1xuICAgICh0YXJnZXQgYXMgYW55KS5pbnZlcnNlKCk7XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTUh1bWFuQm9uZU5hbWUsIFZSTUh1bWFuQm9uZXMgfSBmcm9tICcuJztcbmltcG9ydCB7IFZSTUh1bWFuQm9uZUxpc3QgfSBmcm9tICcuL1ZSTUh1bWFuQm9uZUxpc3QnO1xuaW1wb3J0IHsgVlJNSHVtYW5Cb25lUGFyZW50TWFwIH0gZnJvbSAnLi9WUk1IdW1hbkJvbmVQYXJlbnRNYXAnO1xuaW1wb3J0IHsgVlJNUmlnIH0gZnJvbSAnLi9WUk1SaWcnO1xuXG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF9xdWF0QSA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5jb25zdCBfYm9uZVdvcmxkUG9zID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuLyoqXG4gKiBBIGNsYXNzIHJlcHJlc2VudHMgdGhlIG5vcm1hbGl6ZWQgUmlnIG9mIGEgVlJNLlxuICovXG5leHBvcnQgY2xhc3MgVlJNSHVtYW5vaWRSaWcgZXh0ZW5kcyBWUk1SaWcge1xuICBwcm90ZWN0ZWQgc3RhdGljIF9zZXR1cFRyYW5zZm9ybXMobW9kZWxSaWc6IFZSTVJpZyk6IHtcbiAgICByaWdCb25lczogVlJNSHVtYW5Cb25lcztcbiAgICByb290OiBUSFJFRS5PYmplY3QzRDtcbiAgICBwYXJlbnRXb3JsZFJvdGF0aW9uczogeyBbYm9uZU5hbWUgaW4gVlJNSHVtYW5Cb25lTmFtZV0/OiBUSFJFRS5RdWF0ZXJuaW9uIH07XG4gICAgYm9uZVJvdGF0aW9uczogeyBbYm9uZU5hbWUgaW4gVlJNSHVtYW5Cb25lTmFtZV0/OiBUSFJFRS5RdWF0ZXJuaW9uIH07XG4gIH0ge1xuICAgIGNvbnN0IHJvb3QgPSBuZXcgVEhSRUUuT2JqZWN0M0QoKTtcbiAgICByb290Lm5hbWUgPSAnVlJNSHVtYW5vaWRSaWcnO1xuXG4gICAgLy8gc3RvcmUgYm9uZVdvcmxkUG9zaXRpb25zLCBib25lV29ybGRSb3RhdGlvbnMsIGFuZCBwYXJlbnRXb3JsZFJvdGF0aW9uc1xuICAgIGNvbnN0IGJvbmVXb3JsZFBvc2l0aW9uczogeyBbYm9uZU5hbWUgaW4gVlJNSHVtYW5Cb25lTmFtZV0/OiBUSFJFRS5WZWN0b3IzIH0gPSB7fTtcbiAgICBjb25zdCBib25lV29ybGRSb3RhdGlvbnM6IHsgW2JvbmVOYW1lIGluIFZSTUh1bWFuQm9uZU5hbWVdPzogVEhSRUUuUXVhdGVybmlvbiB9ID0ge307XG4gICAgY29uc3QgYm9uZVJvdGF0aW9uczogeyBbYm9uZU5hbWUgaW4gVlJNSHVtYW5Cb25lTmFtZV0/OiBUSFJFRS5RdWF0ZXJuaW9uIH0gPSB7fTtcbiAgICBjb25zdCBwYXJlbnRXb3JsZFJvdGF0aW9uczogeyBbYm9uZU5hbWUgaW4gVlJNSHVtYW5Cb25lTmFtZV0/OiBUSFJFRS5RdWF0ZXJuaW9uIH0gPSB7fTtcblxuICAgIFZSTUh1bWFuQm9uZUxpc3QuZm9yRWFjaCgoYm9uZU5hbWUpID0+IHtcbiAgICAgIGNvbnN0IGJvbmVOb2RlID0gbW9kZWxSaWcuZ2V0Qm9uZU5vZGUoYm9uZU5hbWUpO1xuXG4gICAgICBpZiAoYm9uZU5vZGUpIHtcbiAgICAgICAgY29uc3QgYm9uZVdvcmxkUG9zaXRpb24gPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuICAgICAgICBjb25zdCBib25lV29ybGRSb3RhdGlvbiA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5cbiAgICAgICAgYm9uZU5vZGUudXBkYXRlV29ybGRNYXRyaXgodHJ1ZSwgZmFsc2UpO1xuICAgICAgICBib25lTm9kZS5tYXRyaXhXb3JsZC5kZWNvbXBvc2UoYm9uZVdvcmxkUG9zaXRpb24sIGJvbmVXb3JsZFJvdGF0aW9uLCBfdjNBKTtcblxuICAgICAgICBib25lV29ybGRQb3NpdGlvbnNbYm9uZU5hbWVdID0gYm9uZVdvcmxkUG9zaXRpb247XG4gICAgICAgIGJvbmVXb3JsZFJvdGF0aW9uc1tib25lTmFtZV0gPSBib25lV29ybGRSb3RhdGlvbjtcbiAgICAgICAgYm9uZVJvdGF0aW9uc1tib25lTmFtZV0gPSBib25lTm9kZS5xdWF0ZXJuaW9uLmNsb25lKCk7XG5cbiAgICAgICAgY29uc3QgcGFyZW50V29ybGRSb3RhdGlvbiA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG4gICAgICAgIGJvbmVOb2RlLnBhcmVudD8ubWF0cml4V29ybGQuZGVjb21wb3NlKF92M0EsIHBhcmVudFdvcmxkUm90YXRpb24sIF92M0EpO1xuICAgICAgICBwYXJlbnRXb3JsZFJvdGF0aW9uc1tib25lTmFtZV0gPSBwYXJlbnRXb3JsZFJvdGF0aW9uO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gYnVpbGQgcmlnIGhpZXJhcmNoeSArIHN0b3JlIHBhcmVudFdvcmxkUm90YXRpb25zXG4gICAgY29uc3QgcmlnQm9uZXM6IFBhcnRpYWw8VlJNSHVtYW5Cb25lcz4gPSB7fTtcbiAgICBWUk1IdW1hbkJvbmVMaXN0LmZvckVhY2goKGJvbmVOYW1lKSA9PiB7XG4gICAgICBjb25zdCBib25lTm9kZSA9IG1vZGVsUmlnLmdldEJvbmVOb2RlKGJvbmVOYW1lKTtcblxuICAgICAgaWYgKGJvbmVOb2RlKSB7XG4gICAgICAgIGNvbnN0IGJvbmVXb3JsZFBvc2l0aW9uID0gYm9uZVdvcmxkUG9zaXRpb25zW2JvbmVOYW1lXSBhcyBUSFJFRS5WZWN0b3IzO1xuXG4gICAgICAgIC8vIHNlZSB0aGUgbmVhcmVzdCBwYXJlbnQgcG9zaXRpb25cbiAgICAgICAgbGV0IGN1cnJlbnRCb25lTmFtZTogVlJNSHVtYW5Cb25lTmFtZSB8IG51bGwgPSBib25lTmFtZTtcbiAgICAgICAgbGV0IHBhcmVudEJvbmVXb3JsZFBvc2l0aW9uOiBUSFJFRS5WZWN0b3IzIHwgdW5kZWZpbmVkO1xuICAgICAgICB3aGlsZSAocGFyZW50Qm9uZVdvcmxkUG9zaXRpb24gPT0gbnVsbCkge1xuICAgICAgICAgIGN1cnJlbnRCb25lTmFtZSA9IFZSTUh1bWFuQm9uZVBhcmVudE1hcFtjdXJyZW50Qm9uZU5hbWVdO1xuICAgICAgICAgIGlmIChjdXJyZW50Qm9uZU5hbWUgPT0gbnVsbCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIHBhcmVudEJvbmVXb3JsZFBvc2l0aW9uID0gYm9uZVdvcmxkUG9zaXRpb25zW2N1cnJlbnRCb25lTmFtZV07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhZGQgdG8gaGllcmFyY2h5XG4gICAgICAgIGNvbnN0IHJpZ0JvbmVOb2RlID0gbmV3IFRIUkVFLk9iamVjdDNEKCk7XG4gICAgICAgIHJpZ0JvbmVOb2RlLm5hbWUgPSAnTm9ybWFsaXplZF8nICsgYm9uZU5vZGUubmFtZTtcblxuICAgICAgICBjb25zdCBwYXJlbnRSaWdCb25lTm9kZSA9IChjdXJyZW50Qm9uZU5hbWUgPyByaWdCb25lc1tjdXJyZW50Qm9uZU5hbWVdPy5ub2RlIDogcm9vdCkgYXMgVEhSRUUuT2JqZWN0M0Q7XG5cbiAgICAgICAgcGFyZW50UmlnQm9uZU5vZGUuYWRkKHJpZ0JvbmVOb2RlKTtcbiAgICAgICAgcmlnQm9uZU5vZGUucG9zaXRpb24uY29weShib25lV29ybGRQb3NpdGlvbik7XG4gICAgICAgIGlmIChwYXJlbnRCb25lV29ybGRQb3NpdGlvbikge1xuICAgICAgICAgIHJpZ0JvbmVOb2RlLnBvc2l0aW9uLnN1YihwYXJlbnRCb25lV29ybGRQb3NpdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICByaWdCb25lc1tib25lTmFtZV0gPSB7IG5vZGU6IHJpZ0JvbmVOb2RlIH07XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgcmlnQm9uZXM6IHJpZ0JvbmVzIGFzIFZSTUh1bWFuQm9uZXMsXG4gICAgICByb290LFxuICAgICAgcGFyZW50V29ybGRSb3RhdGlvbnMsXG4gICAgICBib25lUm90YXRpb25zLFxuICAgIH07XG4gIH1cblxuICBwdWJsaWMgcmVhZG9ubHkgb3JpZ2luYWw6IFZSTVJpZztcbiAgcHVibGljIHJlYWRvbmx5IHJvb3Q6IFRIUkVFLk9iamVjdDNEO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3BhcmVudFdvcmxkUm90YXRpb25zOiB7IFtib25lTmFtZSBpbiBWUk1IdW1hbkJvbmVOYW1lXT86IFRIUkVFLlF1YXRlcm5pb24gfTtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9ib25lUm90YXRpb25zOiB7IFtib25lTmFtZSBpbiBWUk1IdW1hbkJvbmVOYW1lXT86IFRIUkVFLlF1YXRlcm5pb24gfTtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoaHVtYW5vaWQ6IFZSTVJpZykge1xuICAgIGNvbnN0IHsgcmlnQm9uZXMsIHJvb3QsIHBhcmVudFdvcmxkUm90YXRpb25zLCBib25lUm90YXRpb25zIH0gPSBWUk1IdW1hbm9pZFJpZy5fc2V0dXBUcmFuc2Zvcm1zKGh1bWFub2lkKTtcblxuICAgIHN1cGVyKHJpZ0JvbmVzKTtcblxuICAgIHRoaXMub3JpZ2luYWwgPSBodW1hbm9pZDtcbiAgICB0aGlzLnJvb3QgPSByb290O1xuICAgIHRoaXMuX3BhcmVudFdvcmxkUm90YXRpb25zID0gcGFyZW50V29ybGRSb3RhdGlvbnM7XG4gICAgdGhpcy5fYm9uZVJvdGF0aW9ucyA9IGJvbmVSb3RhdGlvbnM7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoaXMgaHVtYW5vaWQgcmlnLlxuICAgKi9cbiAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBWUk1IdW1hbkJvbmVMaXN0LmZvckVhY2goKGJvbmVOYW1lKSA9PiB7XG4gICAgICBjb25zdCBib25lTm9kZSA9IHRoaXMub3JpZ2luYWwuZ2V0Qm9uZU5vZGUoYm9uZU5hbWUpO1xuXG4gICAgICBpZiAoYm9uZU5vZGUgIT0gbnVsbCkge1xuICAgICAgICBjb25zdCByaWdCb25lTm9kZSA9IHRoaXMuZ2V0Qm9uZU5vZGUoYm9uZU5hbWUpITtcbiAgICAgICAgY29uc3QgcGFyZW50V29ybGRSb3RhdGlvbiA9IHRoaXMuX3BhcmVudFdvcmxkUm90YXRpb25zW2JvbmVOYW1lXSE7XG4gICAgICAgIGNvbnN0IGludlBhcmVudFdvcmxkUm90YXRpb24gPSBfcXVhdEEuY29weShwYXJlbnRXb3JsZFJvdGF0aW9uKS5pbnZlcnQoKTtcbiAgICAgICAgY29uc3QgYm9uZVJvdGF0aW9uID0gdGhpcy5fYm9uZVJvdGF0aW9uc1tib25lTmFtZV0hO1xuXG4gICAgICAgIGJvbmVOb2RlLnF1YXRlcm5pb25cbiAgICAgICAgICAuY29weShyaWdCb25lTm9kZS5xdWF0ZXJuaW9uKVxuICAgICAgICAgIC5tdWx0aXBseShwYXJlbnRXb3JsZFJvdGF0aW9uKVxuICAgICAgICAgIC5wcmVtdWx0aXBseShpbnZQYXJlbnRXb3JsZFJvdGF0aW9uKVxuICAgICAgICAgIC5tdWx0aXBseShib25lUm90YXRpb24pO1xuXG4gICAgICAgIC8vIE1vdmUgdGhlIG1hc3MgY2VudGVyIG9mIHRoZSBWUk1cbiAgICAgICAgaWYgKGJvbmVOYW1lID09PSAnaGlwcycpIHtcbiAgICAgICAgICBjb25zdCBib25lV29ybGRQb3NpdGlvbiA9IHJpZ0JvbmVOb2RlLmdldFdvcmxkUG9zaXRpb24oX2JvbmVXb3JsZFBvcyk7XG4gICAgICAgICAgYm9uZU5vZGUucGFyZW50IS51cGRhdGVXb3JsZE1hdHJpeCh0cnVlLCBmYWxzZSk7XG4gICAgICAgICAgY29uc3QgcGFyZW50V29ybGRNYXRyaXggPSBib25lTm9kZS5wYXJlbnQhLm1hdHJpeFdvcmxkO1xuICAgICAgICAgIGNvbnN0IGxvY2FsUG9zaXRpb24gPSBib25lV29ybGRQb3NpdGlvbi5hcHBseU1hdHJpeDQocGFyZW50V29ybGRNYXRyaXguaW52ZXJ0KCkpO1xuICAgICAgICAgIGJvbmVOb2RlLnBvc2l0aW9uLmNvcHkobG9jYWxQb3NpdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB0eXBlIHsgVlJNSHVtYW5Cb25lIH0gZnJvbSAnLi9WUk1IdW1hbkJvbmUnO1xuaW1wb3J0IHR5cGUgeyBWUk1IdW1hbkJvbmVzIH0gZnJvbSAnLi9WUk1IdW1hbkJvbmVzJztcbmltcG9ydCB0eXBlIHsgVlJNSHVtYW5Cb25lTmFtZSB9IGZyb20gJy4vVlJNSHVtYW5Cb25lTmFtZSc7XG5pbXBvcnQgdHlwZSB7IFZSTVBvc2UgfSBmcm9tICcuL1ZSTVBvc2UnO1xuaW1wb3J0IHsgVlJNUmlnIH0gZnJvbSAnLi9WUk1SaWcnO1xuaW1wb3J0IHsgVlJNSHVtYW5vaWRSaWcgfSBmcm9tICcuL1ZSTUh1bWFub2lkUmlnJztcblxuLyoqXG4gKiBBIGNsYXNzIHJlcHJlc2VudHMgYSBodW1hbm9pZCBvZiBhIFZSTS5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUh1bWFub2lkIHtcbiAgLyoqXG4gICAqIFdoZXRoZXIgaXQgY29waWVzIHBvc2UgZnJvbSBub3JtYWxpemVkSHVtYW5Cb25lcyB0byByYXdIdW1hbkJvbmVzIG9uIHtAbGluayB1cGRhdGV9LlxuICAgKiBgdHJ1ZWAgYnkgZGVmYXVsdC5cbiAgICpcbiAgICogQGRlZmF1bHQgdHJ1ZVxuICAgKi9cbiAgcHVibGljIGF1dG9VcGRhdGVIdW1hbkJvbmVzOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBBIHJhdyByaWcgb2YgdGhlIFZSTS5cbiAgICovXG4gIHByaXZhdGUgX3Jhd0h1bWFuQm9uZXM6IFZSTVJpZzsgLy8gVE9ETzogUmVuYW1lXG5cbiAgLyoqXG4gICAqIEEgbm9ybWFsaXplZCByaWcgb2YgdGhlIFZSTS5cbiAgICovXG4gIHByaXZhdGUgX25vcm1hbGl6ZWRIdW1hbkJvbmVzOiBWUk1IdW1hbm9pZFJpZzsgLy8gVE9ETzogUmVuYW1lXG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIERlcHJlY2F0ZWQuIFVzZSBlaXRoZXIge0BsaW5rIHJhd1Jlc3RQb3NlfSBvciB7QGxpbmsgbm9ybWFsaXplZFJlc3RQb3NlfSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIGdldCByZXN0UG9zZSgpOiBWUk1Qb3NlIHtcbiAgICBjb25zb2xlLndhcm4oJ1ZSTUh1bWFub2lkOiByZXN0UG9zZSBpcyBkZXByZWNhdGVkLiBVc2UgZWl0aGVyIHJhd1Jlc3RQb3NlIG9yIG5vcm1hbGl6ZWRSZXN0UG9zZSBpbnN0ZWFkLicpO1xuXG4gICAgcmV0dXJuIHRoaXMucmF3UmVzdFBvc2U7XG4gIH1cblxuICAvKipcbiAgICogQSB7QGxpbmsgVlJNUG9zZX0gb2YgaXRzIHJhdyBodW1hbiBib25lcyB0aGF0IGlzIGl0cyBkZWZhdWx0IHN0YXRlLlxuICAgKiBOb3RlIHRoYXQgaXQncyBub3QgY29tcGF0aWJsZSB3aXRoIHtAbGluayBzZXRSYXdQb3NlfSBhbmQge0BsaW5rIGdldFJhd1Bvc2V9LCBzaW5jZSBpdCBjb250YWlucyBub24tcmVsYXRpdmUgdmFsdWVzIG9mIGVhY2ggbG9jYWwgdHJhbnNmb3Jtcy5cbiAgICovXG4gIHB1YmxpYyBnZXQgcmF3UmVzdFBvc2UoKTogVlJNUG9zZSB7XG4gICAgcmV0dXJuIHRoaXMuX3Jhd0h1bWFuQm9uZXMucmVzdFBvc2U7XG4gIH1cblxuICAvKipcbiAgICogQSB7QGxpbmsgVlJNUG9zZX0gb2YgaXRzIG5vcm1hbGl6ZWQgaHVtYW4gYm9uZXMgdGhhdCBpcyBpdHMgZGVmYXVsdCBzdGF0ZS5cbiAgICogTm90ZSB0aGF0IGl0J3Mgbm90IGNvbXBhdGlibGUgd2l0aCB7QGxpbmsgc2V0Tm9ybWFsaXplZFBvc2V9IGFuZCB7QGxpbmsgZ2V0Tm9ybWFsaXplZFBvc2V9LCBzaW5jZSBpdCBjb250YWlucyBub24tcmVsYXRpdmUgdmFsdWVzIG9mIGVhY2ggbG9jYWwgdHJhbnNmb3Jtcy5cbiAgICovXG4gIHB1YmxpYyBnZXQgbm9ybWFsaXplZFJlc3RQb3NlKCk6IFZSTVBvc2Uge1xuICAgIHJldHVybiB0aGlzLl9ub3JtYWxpemVkSHVtYW5Cb25lcy5yZXN0UG9zZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIG1hcCBmcm9tIHtAbGluayBWUk1IdW1hbkJvbmVOYW1lfSB0byByYXcge0BsaW5rIFZSTUh1bWFuQm9uZX1zLlxuICAgKi9cbiAgcHVibGljIGdldCBodW1hbkJvbmVzKCk6IFZSTUh1bWFuQm9uZXMge1xuICAgIC8vIGFuIGFsaWFzIG9mIGByYXdIdW1hbkJvbmVzYFxuICAgIHJldHVybiB0aGlzLl9yYXdIdW1hbkJvbmVzLmh1bWFuQm9uZXM7XG4gIH1cblxuICAvKipcbiAgICogQSBtYXAgZnJvbSB7QGxpbmsgVlJNSHVtYW5Cb25lTmFtZX0gdG8gcmF3IHtAbGluayBWUk1IdW1hbkJvbmV9cy5cbiAgICovXG4gIHB1YmxpYyBnZXQgcmF3SHVtYW5Cb25lcygpOiBWUk1IdW1hbkJvbmVzIHtcbiAgICByZXR1cm4gdGhpcy5fcmF3SHVtYW5Cb25lcy5odW1hbkJvbmVzO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgbWFwIGZyb20ge0BsaW5rIFZSTUh1bWFuQm9uZU5hbWV9IHRvIG5vcm1hbGl6ZWQge0BsaW5rIFZSTUh1bWFuQm9uZX1zLlxuICAgKi9cbiAgcHVibGljIGdldCBub3JtYWxpemVkSHVtYW5Cb25lcygpOiBWUk1IdW1hbkJvbmVzIHtcbiAgICByZXR1cm4gdGhpcy5fbm9ybWFsaXplZEh1bWFuQm9uZXMuaHVtYW5Cb25lcztcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgcm9vdCBvZiBub3JtYWxpemVkIHtAbGluayBWUk1IdW1hbkJvbmV9cy5cbiAgICovXG4gIHB1YmxpYyBnZXQgbm9ybWFsaXplZEh1bWFuQm9uZXNSb290KCk6IFRIUkVFLk9iamVjdDNEIHtcbiAgICByZXR1cm4gdGhpcy5fbm9ybWFsaXplZEh1bWFuQm9uZXMucm9vdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcge0BsaW5rIFZSTUh1bWFub2lkfS5cbiAgICogQHBhcmFtIGh1bWFuQm9uZXMgQSB7QGxpbmsgVlJNSHVtYW5Cb25lc30gY29udGFpbnMgYWxsIHRoZSBib25lcyBvZiB0aGUgbmV3IGh1bWFub2lkXG4gICAqIEBwYXJhbSBhdXRvVXBkYXRlSHVtYW5Cb25lcyBXaGV0aGVyIGl0IGNvcGllcyBwb3NlIGZyb20gbm9ybWFsaXplZEh1bWFuQm9uZXMgdG8gcmF3SHVtYW5Cb25lcyBvbiB7QGxpbmsgdXBkYXRlfS4gYHRydWVgIGJ5IGRlZmF1bHQuXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoaHVtYW5Cb25lczogVlJNSHVtYW5Cb25lcywgb3B0aW9ucz86IHsgYXV0b1VwZGF0ZUh1bWFuQm9uZXM/OiBib29sZWFuIH0pIHtcbiAgICB0aGlzLmF1dG9VcGRhdGVIdW1hbkJvbmVzID0gb3B0aW9ucz8uYXV0b1VwZGF0ZUh1bWFuQm9uZXMgPz8gdHJ1ZTtcbiAgICB0aGlzLl9yYXdIdW1hbkJvbmVzID0gbmV3IFZSTVJpZyhodW1hbkJvbmVzKTtcbiAgICB0aGlzLl9ub3JtYWxpemVkSHVtYW5Cb25lcyA9IG5ldyBWUk1IdW1hbm9pZFJpZyh0aGlzLl9yYXdIdW1hbkJvbmVzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb3B5IHRoZSBnaXZlbiB7QGxpbmsgVlJNSHVtYW5vaWR9IGludG8gdGhpcyBvbmUuXG4gICAqIEBwYXJhbSBzb3VyY2UgVGhlIHtAbGluayBWUk1IdW1hbm9pZH0geW91IHdhbnQgdG8gY29weVxuICAgKiBAcmV0dXJucyB0aGlzXG4gICAqL1xuICBwdWJsaWMgY29weShzb3VyY2U6IFZSTUh1bWFub2lkKTogdGhpcyB7XG4gICAgdGhpcy5hdXRvVXBkYXRlSHVtYW5Cb25lcyA9IHNvdXJjZS5hdXRvVXBkYXRlSHVtYW5Cb25lcztcbiAgICB0aGlzLl9yYXdIdW1hbkJvbmVzID0gbmV3IFZSTVJpZyhzb3VyY2UuaHVtYW5Cb25lcyk7XG4gICAgdGhpcy5fbm9ybWFsaXplZEh1bWFuQm9uZXMgPSBuZXcgVlJNSHVtYW5vaWRSaWcodGhpcy5fcmF3SHVtYW5Cb25lcyk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgY2xvbmUgb2YgdGhpcyB7QGxpbmsgVlJNSHVtYW5vaWR9LlxuICAgKiBAcmV0dXJucyBDb3BpZWQge0BsaW5rIFZSTUh1bWFub2lkfVxuICAgKi9cbiAgcHVibGljIGNsb25lKCk6IFZSTUh1bWFub2lkIHtcbiAgICByZXR1cm4gbmV3IFZSTUh1bWFub2lkKHRoaXMuaHVtYW5Cb25lcywgeyBhdXRvVXBkYXRlSHVtYW5Cb25lczogdGhpcy5hdXRvVXBkYXRlSHVtYW5Cb25lcyB9KS5jb3B5KHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIERlcHJlY2F0ZWQuIFVzZSBlaXRoZXIge0BsaW5rIGdldFJhd0Fic29sdXRlUG9zZX0gb3Ige0BsaW5rIGdldE5vcm1hbGl6ZWRBYnNvbHV0ZVBvc2V9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgZ2V0QWJzb2x1dGVQb3NlKCk6IFZSTVBvc2Uge1xuICAgIGNvbnNvbGUud2FybihcbiAgICAgICdWUk1IdW1hbm9pZDogZ2V0QWJzb2x1dGVQb3NlKCkgaXMgZGVwcmVjYXRlZC4gVXNlIGVpdGhlciBnZXRSYXdBYnNvbHV0ZVBvc2UoKSBvciBnZXROb3JtYWxpemVkQWJzb2x1dGVQb3NlKCkgaW5zdGVhZC4nLFxuICAgICk7XG5cbiAgICByZXR1cm4gdGhpcy5nZXRSYXdBYnNvbHV0ZVBvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGN1cnJlbnQgYWJzb2x1dGUgcG9zZSBvZiB0aGlzIHJhdyBodW1hbiBib25lcyBhcyBhIHtAbGluayBWUk1Qb3NlfS5cbiAgICogTm90ZSB0aGF0IHRoZSBvdXRwdXQgcmVzdWx0IHdpbGwgY29udGFpbiBpbml0aWFsIHN0YXRlIG9mIHRoZSBWUk0gYW5kIG5vdCBjb21wYXRpYmxlIGJldHdlZW4gZGlmZmVyZW50IG1vZGVscy5cbiAgICogWW91IG1pZ2h0IHdhbnQgdG8gdXNlIHtAbGluayBnZXRSYXdQb3NlfSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIGdldFJhd0Fic29sdXRlUG9zZSgpOiBWUk1Qb3NlIHtcbiAgICByZXR1cm4gdGhpcy5fcmF3SHVtYW5Cb25lcy5nZXRBYnNvbHV0ZVBvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGN1cnJlbnQgYWJzb2x1dGUgcG9zZSBvZiB0aGlzIG5vcm1hbGl6ZWQgaHVtYW4gYm9uZXMgYXMgYSB7QGxpbmsgVlJNUG9zZX0uXG4gICAqIE5vdGUgdGhhdCB0aGUgb3V0cHV0IHJlc3VsdCB3aWxsIGNvbnRhaW4gaW5pdGlhbCBzdGF0ZSBvZiB0aGUgVlJNIGFuZCBub3QgY29tcGF0aWJsZSBiZXR3ZWVuIGRpZmZlcmVudCBtb2RlbHMuXG4gICAqIFlvdSBtaWdodCB3YW50IHRvIHVzZSB7QGxpbmsgZ2V0Tm9ybWFsaXplZFBvc2V9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgZ2V0Tm9ybWFsaXplZEFic29sdXRlUG9zZSgpOiBWUk1Qb3NlIHtcbiAgICByZXR1cm4gdGhpcy5fbm9ybWFsaXplZEh1bWFuQm9uZXMuZ2V0QWJzb2x1dGVQb3NlKCk7XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgRGVwcmVjYXRlZC4gVXNlIGVpdGhlciB7QGxpbmsgZ2V0UmF3UG9zZX0gb3Ige0BsaW5rIGdldE5vcm1hbGl6ZWRQb3NlfSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIGdldFBvc2UoKTogVlJNUG9zZSB7XG4gICAgY29uc29sZS53YXJuKCdWUk1IdW1hbm9pZDogZ2V0UG9zZSgpIGlzIGRlcHJlY2F0ZWQuIFVzZSBlaXRoZXIgZ2V0UmF3UG9zZSgpIG9yIGdldE5vcm1hbGl6ZWRQb3NlKCkgaW5zdGVhZC4nKTtcblxuICAgIHJldHVybiB0aGlzLmdldFJhd1Bvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGN1cnJlbnQgcG9zZSBvZiByYXcgaHVtYW4gYm9uZXMgYXMgYSB7QGxpbmsgVlJNUG9zZX0uXG4gICAqXG4gICAqIEVhY2ggdHJhbnNmb3JtIGlzIGEgbG9jYWwgdHJhbnNmb3JtIHJlbGF0aXZlIGZyb20gcmVzdCBwb3NlIChULXBvc2UpLlxuICAgKi9cbiAgcHVibGljIGdldFJhd1Bvc2UoKTogVlJNUG9zZSB7XG4gICAgcmV0dXJuIHRoaXMuX3Jhd0h1bWFuQm9uZXMuZ2V0UG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgY3VycmVudCBwb3NlIG9mIG5vcm1hbGl6ZWQgaHVtYW4gYm9uZXMgYXMgYSB7QGxpbmsgVlJNUG9zZX0uXG4gICAqXG4gICAqIEVhY2ggdHJhbnNmb3JtIGlzIGEgbG9jYWwgdHJhbnNmb3JtIHJlbGF0aXZlIGZyb20gcmVzdCBwb3NlIChULXBvc2UpLlxuICAgKi9cbiAgcHVibGljIGdldE5vcm1hbGl6ZWRQb3NlKCk6IFZSTVBvc2Uge1xuICAgIHJldHVybiB0aGlzLl9ub3JtYWxpemVkSHVtYW5Cb25lcy5nZXRQb3NlKCk7XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgRGVwcmVjYXRlZC4gVXNlIGVpdGhlciB7QGxpbmsgc2V0UmF3UG9zZX0gb3Ige0BsaW5rIHNldE5vcm1hbGl6ZWRQb3NlfSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIHNldFBvc2UocG9zZU9iamVjdDogVlJNUG9zZSk6IHZvaWQge1xuICAgIGNvbnNvbGUud2FybignVlJNSHVtYW5vaWQ6IHNldFBvc2UoKSBpcyBkZXByZWNhdGVkLiBVc2UgZWl0aGVyIHNldFJhd1Bvc2UoKSBvciBzZXROb3JtYWxpemVkUG9zZSgpIGluc3RlYWQuJyk7XG5cbiAgICByZXR1cm4gdGhpcy5zZXRSYXdQb3NlKHBvc2VPYmplY3QpO1xuICB9XG5cbiAgLyoqXG4gICAqIExldCB0aGUgcmF3IGh1bWFuIGJvbmVzIGRvIGEgc3BlY2lmaWVkIHBvc2UuXG4gICAqXG4gICAqIEVhY2ggdHJhbnNmb3JtIGhhdmUgdG8gYmUgYSBsb2NhbCB0cmFuc2Zvcm0gcmVsYXRpdmUgZnJvbSByZXN0IHBvc2UgKFQtcG9zZSkuXG4gICAqIFlvdSBjYW4gcGFzcyB3aGF0IHlvdSBnb3QgZnJvbSB7QGxpbmsgZ2V0UmF3UG9zZX0uXG4gICAqXG4gICAqIElmIHlvdSBhcmUgdXNpbmcge0BsaW5rIGF1dG9VcGRhdGVIdW1hbkJvbmVzfSwgeW91IG1pZ2h0IHdhbnQgdG8gdXNlIHtAbGluayBzZXROb3JtYWxpemVkUG9zZX0gaW5zdGVhZC5cbiAgICpcbiAgICogQHBhcmFtIHBvc2VPYmplY3QgQSB7QGxpbmsgVlJNUG9zZX0gdGhhdCByZXByZXNlbnRzIGEgc2luZ2xlIHBvc2VcbiAgICovXG4gIHB1YmxpYyBzZXRSYXdQb3NlKHBvc2VPYmplY3Q6IFZSTVBvc2UpOiB2b2lkIHtcbiAgICByZXR1cm4gdGhpcy5fcmF3SHVtYW5Cb25lcy5zZXRQb3NlKHBvc2VPYmplY3QpO1xuICB9XG5cbiAgLyoqXG4gICAqIExldCB0aGUgbm9ybWFsaXplZCBodW1hbiBib25lcyBkbyBhIHNwZWNpZmllZCBwb3NlLlxuICAgKlxuICAgKiBFYWNoIHRyYW5zZm9ybSBoYXZlIHRvIGJlIGEgbG9jYWwgdHJhbnNmb3JtIHJlbGF0aXZlIGZyb20gcmVzdCBwb3NlIChULXBvc2UpLlxuICAgKiBZb3UgY2FuIHBhc3Mgd2hhdCB5b3UgZ290IGZyb20ge0BsaW5rIGdldE5vcm1hbGl6ZWRQb3NlfS5cbiAgICpcbiAgICogQHBhcmFtIHBvc2VPYmplY3QgQSB7QGxpbmsgVlJNUG9zZX0gdGhhdCByZXByZXNlbnRzIGEgc2luZ2xlIHBvc2VcbiAgICovXG4gIHB1YmxpYyBzZXROb3JtYWxpemVkUG9zZShwb3NlT2JqZWN0OiBWUk1Qb3NlKTogdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMuX25vcm1hbGl6ZWRIdW1hbkJvbmVzLnNldFBvc2UocG9zZU9iamVjdCk7XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgRGVwcmVjYXRlZC4gVXNlIGVpdGhlciB7QGxpbmsgcmVzZXRSYXdQb3NlfSBvciB7QGxpbmsgcmVzZXROb3JtYWxpemVkUG9zZX0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyByZXNldFBvc2UoKTogdm9pZCB7XG4gICAgY29uc29sZS53YXJuKCdWUk1IdW1hbm9pZDogcmVzZXRQb3NlKCkgaXMgZGVwcmVjYXRlZC4gVXNlIGVpdGhlciByZXNldFJhd1Bvc2UoKSBvciByZXNldE5vcm1hbGl6ZWRQb3NlKCkgaW5zdGVhZC4nKTtcblxuICAgIHJldHVybiB0aGlzLnJlc2V0UmF3UG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoZSByYXcgaHVtYW5vaWQgdG8gaXRzIHJlc3QgcG9zZS5cbiAgICpcbiAgICogSWYgeW91IGFyZSB1c2luZyB7QGxpbmsgYXV0b1VwZGF0ZUh1bWFuQm9uZXN9LCB5b3UgbWlnaHQgd2FudCB0byB1c2Uge0BsaW5rIHJlc2V0Tm9ybWFsaXplZFBvc2V9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgcmVzZXRSYXdQb3NlKCk6IHZvaWQge1xuICAgIHJldHVybiB0aGlzLl9yYXdIdW1hbkJvbmVzLnJlc2V0UG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoZSBub3JtYWxpemVkIGh1bWFub2lkIHRvIGl0cyByZXN0IHBvc2UuXG4gICAqL1xuICBwdWJsaWMgcmVzZXROb3JtYWxpemVkUG9zZSgpOiB2b2lkIHtcbiAgICByZXR1cm4gdGhpcy5fbm9ybWFsaXplZEh1bWFuQm9uZXMucmVzZXRQb3NlKCk7XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgRGVwcmVjYXRlZC4gVXNlIGVpdGhlciB7QGxpbmsgZ2V0UmF3Qm9uZX0gb3Ige0BsaW5rIGdldE5vcm1hbGl6ZWRCb25lfSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIGdldEJvbmUobmFtZTogVlJNSHVtYW5Cb25lTmFtZSk6IFZSTUh1bWFuQm9uZSB8IHVuZGVmaW5lZCB7XG4gICAgY29uc29sZS53YXJuKCdWUk1IdW1hbm9pZDogZ2V0Qm9uZSgpIGlzIGRlcHJlY2F0ZWQuIFVzZSBlaXRoZXIgZ2V0UmF3Qm9uZSgpIG9yIGdldE5vcm1hbGl6ZWRCb25lKCkgaW5zdGVhZC4nKTtcblxuICAgIHJldHVybiB0aGlzLmdldFJhd0JvbmUobmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGEgcmF3IHtAbGluayBWUk1IdW1hbkJvbmV9IGJvdW5kIHRvIGEgc3BlY2lmaWVkIHtAbGluayBWUk1IdW1hbkJvbmVOYW1lfS5cbiAgICpcbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgYm9uZSB5b3Ugd2FudFxuICAgKi9cbiAgcHVibGljIGdldFJhd0JvbmUobmFtZTogVlJNSHVtYW5Cb25lTmFtZSk6IFZSTUh1bWFuQm9uZSB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX3Jhd0h1bWFuQm9uZXMuZ2V0Qm9uZShuYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYSBub3JtYWxpemVkIHtAbGluayBWUk1IdW1hbkJvbmV9IGJvdW5kIHRvIGEgc3BlY2lmaWVkIHtAbGluayBWUk1IdW1hbkJvbmVOYW1lfS5cbiAgICpcbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgYm9uZSB5b3Ugd2FudFxuICAgKi9cbiAgcHVibGljIGdldE5vcm1hbGl6ZWRCb25lKG5hbWU6IFZSTUh1bWFuQm9uZU5hbWUpOiBWUk1IdW1hbkJvbmUgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9ub3JtYWxpemVkSHVtYW5Cb25lcy5nZXRCb25lKG5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIERlcHJlY2F0ZWQuIFVzZSBlaXRoZXIge0BsaW5rIGdldFJhd0JvbmVOb2RlfSBvciB7QGxpbmsgZ2V0Tm9ybWFsaXplZEJvbmVOb2RlfSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIGdldEJvbmVOb2RlKG5hbWU6IFZSTUh1bWFuQm9uZU5hbWUpOiBUSFJFRS5PYmplY3QzRCB8IG51bGwge1xuICAgIGNvbnNvbGUud2FybihcbiAgICAgICdWUk1IdW1hbm9pZDogZ2V0Qm9uZU5vZGUoKSBpcyBkZXByZWNhdGVkLiBVc2UgZWl0aGVyIGdldFJhd0JvbmVOb2RlKCkgb3IgZ2V0Tm9ybWFsaXplZEJvbmVOb2RlKCkgaW5zdGVhZC4nLFxuICAgICk7XG5cbiAgICByZXR1cm4gdGhpcy5nZXRSYXdCb25lTm9kZShuYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYSByYXcgYm9uZSBhcyBhIGBUSFJFRS5PYmplY3QzRGAgYm91bmQgdG8gYSBzcGVjaWZpZWQge0BsaW5rIFZSTUh1bWFuQm9uZU5hbWV9LlxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBib25lIHlvdSB3YW50XG4gICAqL1xuICBwdWJsaWMgZ2V0UmF3Qm9uZU5vZGUobmFtZTogVlJNSHVtYW5Cb25lTmFtZSk6IFRIUkVFLk9iamVjdDNEIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX3Jhd0h1bWFuQm9uZXMuZ2V0Qm9uZU5vZGUobmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGEgbm9ybWFsaXplZCBib25lIGFzIGEgYFRIUkVFLk9iamVjdDNEYCBib3VuZCB0byBhIHNwZWNpZmllZCB7QGxpbmsgVlJNSHVtYW5Cb25lTmFtZX0uXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGJvbmUgeW91IHdhbnRcbiAgICovXG4gIHB1YmxpYyBnZXROb3JtYWxpemVkQm9uZU5vZGUobmFtZTogVlJNSHVtYW5Cb25lTmFtZSk6IFRIUkVFLk9iamVjdDNEIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX25vcm1hbGl6ZWRIdW1hbkJvbmVzLmdldEJvbmVOb2RlKG5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgaHVtYW5vaWQgY29tcG9uZW50LlxuICAgKlxuICAgKiBJZiB7QGxpbmsgYXV0b1VwZGF0ZUh1bWFuQm9uZXN9IGlzIGB0cnVlYCwgaXQgdHJhbnNmZXJzIHRoZSBwb3NlIG9mIG5vcm1hbGl6ZWQgaHVtYW4gYm9uZXMgdG8gcmF3IGh1bWFuIGJvbmVzLlxuICAgKi9cbiAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5hdXRvVXBkYXRlSHVtYW5Cb25lcykge1xuICAgICAgdGhpcy5fbm9ybWFsaXplZEh1bWFuQm9uZXMudXBkYXRlKCk7XG4gICAgfVxuICB9XG59XG4iLCAiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uICovXG5cbmV4cG9ydCBjb25zdCBWUk1SZXF1aXJlZEh1bWFuQm9uZU5hbWUgPSB7XG4gIEhpcHM6ICdoaXBzJyxcbiAgU3BpbmU6ICdzcGluZScsXG4gIEhlYWQ6ICdoZWFkJyxcbiAgTGVmdFVwcGVyTGVnOiAnbGVmdFVwcGVyTGVnJyxcbiAgTGVmdExvd2VyTGVnOiAnbGVmdExvd2VyTGVnJyxcbiAgTGVmdEZvb3Q6ICdsZWZ0Rm9vdCcsXG4gIFJpZ2h0VXBwZXJMZWc6ICdyaWdodFVwcGVyTGVnJyxcbiAgUmlnaHRMb3dlckxlZzogJ3JpZ2h0TG93ZXJMZWcnLFxuICBSaWdodEZvb3Q6ICdyaWdodEZvb3QnLFxuICBMZWZ0VXBwZXJBcm06ICdsZWZ0VXBwZXJBcm0nLFxuICBMZWZ0TG93ZXJBcm06ICdsZWZ0TG93ZXJBcm0nLFxuICBMZWZ0SGFuZDogJ2xlZnRIYW5kJyxcbiAgUmlnaHRVcHBlckFybTogJ3JpZ2h0VXBwZXJBcm0nLFxuICBSaWdodExvd2VyQXJtOiAncmlnaHRMb3dlckFybScsXG4gIFJpZ2h0SGFuZDogJ3JpZ2h0SGFuZCcsXG59IGFzIGNvbnN0O1xuXG5leHBvcnQgdHlwZSBWUk1SZXF1aXJlZEh1bWFuQm9uZU5hbWUgPSAodHlwZW9mIFZSTVJlcXVpcmVkSHVtYW5Cb25lTmFtZSlba2V5b2YgdHlwZW9mIFZSTVJlcXVpcmVkSHVtYW5Cb25lTmFtZV07XG4iLCAiaW1wb3J0IHR5cGUgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgdHlwZSAqIGFzIFYwVlJNIGZyb20gJ0BwaXhpdi90eXBlcy12cm0tMC4wJztcbmltcG9ydCB0eXBlICogYXMgVjFWUk1TY2hlbWEgZnJvbSAnQHBpeGl2L3R5cGVzLXZybWMtdnJtLTEuMCc7XG5pbXBvcnQgdHlwZSB7IEdMVEYsIEdMVEZMb2FkZXJQbHVnaW4sIEdMVEZQYXJzZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyLmpzJztcbmltcG9ydCB7IFZSTUh1bWFub2lkIH0gZnJvbSAnLi9WUk1IdW1hbm9pZCc7XG5pbXBvcnQgdHlwZSB7IFZSTUh1bWFuQm9uZXMgfSBmcm9tICcuL1ZSTUh1bWFuQm9uZXMnO1xuaW1wb3J0IHsgVlJNUmVxdWlyZWRIdW1hbkJvbmVOYW1lIH0gZnJvbSAnLi9WUk1SZXF1aXJlZEh1bWFuQm9uZU5hbWUnO1xuaW1wb3J0IHsgR0xURiBhcyBHTFRGU2NoZW1hIH0gZnJvbSAnQGdsdGYtdHJhbnNmb3JtL2NvcmUnO1xuaW1wb3J0IHsgVlJNSHVtYW5vaWRIZWxwZXIgfSBmcm9tICcuL2hlbHBlcnMvVlJNSHVtYW5vaWRIZWxwZXInO1xuaW1wb3J0IHsgVlJNSHVtYW5vaWRMb2FkZXJQbHVnaW5PcHRpb25zIH0gZnJvbSAnLi9WUk1IdW1hbm9pZExvYWRlclBsdWdpbk9wdGlvbnMnO1xuXG4vKipcbiAqIFBvc3NpYmxlIHNwZWMgdmVyc2lvbnMgaXQgcmVjb2duaXplcy5cbiAqL1xuY29uc3QgUE9TU0lCTEVfU1BFQ19WRVJTSU9OUyA9IG5ldyBTZXQoWycxLjAnLCAnMS4wLWJldGEnXSk7XG5cbi8qKlxuICogQSBtYXAgZnJvbSBvbGQgdGh1bWIgYm9uZSBuYW1lcyB0byBuZXcgdGh1bWIgYm9uZSBuYW1lc1xuICovXG5jb25zdCB0aHVtYkJvbmVOYW1lTWFwOiB7IFtrZXk6IHN0cmluZ106IFYxVlJNU2NoZW1hLkh1bWFub2lkSHVtYW5Cb25lTmFtZSB8IHVuZGVmaW5lZCB9ID0ge1xuICBsZWZ0VGh1bWJQcm94aW1hbDogJ2xlZnRUaHVtYk1ldGFjYXJwYWwnLFxuICBsZWZ0VGh1bWJJbnRlcm1lZGlhdGU6ICdsZWZ0VGh1bWJQcm94aW1hbCcsXG4gIHJpZ2h0VGh1bWJQcm94aW1hbDogJ3JpZ2h0VGh1bWJNZXRhY2FycGFsJyxcbiAgcmlnaHRUaHVtYkludGVybWVkaWF0ZTogJ3JpZ2h0VGh1bWJQcm94aW1hbCcsXG59O1xuXG4vKipcbiAqIEEgcGx1Z2luIG9mIEdMVEZMb2FkZXIgdGhhdCBpbXBvcnRzIGEge0BsaW5rIFZSTUh1bWFub2lkfSBmcm9tIGEgVlJNIGV4dGVuc2lvbiBvZiBhIEdMVEYuXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1IdW1hbm9pZExvYWRlclBsdWdpbiBpbXBsZW1lbnRzIEdMVEZMb2FkZXJQbHVnaW4ge1xuICAvKipcbiAgICogU3BlY2lmeSBhbiBPYmplY3QzRCB0byBhZGQge0BsaW5rIFZSTUh1bWFub2lkSGVscGVyfS5cbiAgICogSWYgbm90IHNwZWNpZmllZCwgaGVscGVyIHdpbGwgbm90IGJlIGNyZWF0ZWQuXG4gICAqIElmIGByZW5kZXJPcmRlcmAgaXMgc2V0IHRvIHRoZSByb290LCB0aGUgaGVscGVyIHdpbGwgY29weSB0aGUgc2FtZSBgcmVuZGVyT3JkZXJgIC5cbiAgICovXG4gIHB1YmxpYyBoZWxwZXJSb290PzogVEhSRUUuT2JqZWN0M0Q7XG5cbiAgcHVibGljIGF1dG9VcGRhdGVIdW1hbkJvbmVzPzogYm9vbGVhbjtcblxuICBwdWJsaWMgcmVhZG9ubHkgcGFyc2VyOiBHTFRGUGFyc2VyO1xuXG4gIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xuICAgIC8vIFdlIHNob3VsZCB1c2UgdGhlIGV4dGVuc2lvbiBuYW1lIGluc3RlYWQgYnV0IHdlIGhhdmUgbXVsdGlwbGUgcGx1Z2lucyBmb3IgYW4gZXh0ZW5zaW9uLi4uXG4gICAgcmV0dXJuICdWUk1IdW1hbm9pZExvYWRlclBsdWdpbic7XG4gIH1cblxuICBwdWJsaWMgY29uc3RydWN0b3IocGFyc2VyOiBHTFRGUGFyc2VyLCBvcHRpb25zPzogVlJNSHVtYW5vaWRMb2FkZXJQbHVnaW5PcHRpb25zKSB7XG4gICAgdGhpcy5wYXJzZXIgPSBwYXJzZXI7XG5cbiAgICB0aGlzLmhlbHBlclJvb3QgPSBvcHRpb25zPy5oZWxwZXJSb290O1xuICAgIHRoaXMuYXV0b1VwZGF0ZUh1bWFuQm9uZXMgPSBvcHRpb25zPy5hdXRvVXBkYXRlSHVtYW5Cb25lcztcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBhZnRlclJvb3QoZ2x0ZjogR0xURik6IFByb21pc2U8dm9pZD4ge1xuICAgIGdsdGYudXNlckRhdGEudnJtSHVtYW5vaWQgPSBhd2FpdCB0aGlzLl9pbXBvcnQoZ2x0Zik7XG4gIH1cblxuICAvKipcbiAgICogSW1wb3J0IGEge0BsaW5rIFZSTUh1bWFub2lkfSBmcm9tIGEgVlJNLlxuICAgKlxuICAgKiBAcGFyYW0gZ2x0ZiBBIHBhcnNlZCByZXN1bHQgb2YgR0xURiB0YWtlbiBmcm9tIEdMVEZMb2FkZXJcbiAgICovXG4gIHByaXZhdGUgYXN5bmMgX2ltcG9ydChnbHRmOiBHTFRGKTogUHJvbWlzZTxWUk1IdW1hbm9pZCB8IG51bGw+IHtcbiAgICBjb25zdCB2MVJlc3VsdCA9IGF3YWl0IHRoaXMuX3YxSW1wb3J0KGdsdGYpO1xuICAgIGlmICh2MVJlc3VsdCkge1xuICAgICAgcmV0dXJuIHYxUmVzdWx0O1xuICAgIH1cblxuICAgIGNvbnN0IHYwUmVzdWx0ID0gYXdhaXQgdGhpcy5fdjBJbXBvcnQoZ2x0Zik7XG4gICAgaWYgKHYwUmVzdWx0KSB7XG4gICAgICByZXR1cm4gdjBSZXN1bHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF92MUltcG9ydChnbHRmOiBHTFRGKTogUHJvbWlzZTxWUk1IdW1hbm9pZCB8IG51bGw+IHtcbiAgICBjb25zdCBqc29uID0gdGhpcy5wYXJzZXIuanNvbiBhcyBHTFRGU2NoZW1hLklHTFRGO1xuXG4gICAgLy8gZWFybHkgYWJvcnQgaWYgaXQgZG9lc24ndCB1c2UgdnJtXG4gICAgY29uc3QgaXNWUk1Vc2VkID0ganNvbi5leHRlbnNpb25zVXNlZD8uaW5kZXhPZignVlJNQ192cm0nKSAhPT0gLTE7XG4gICAgaWYgKCFpc1ZSTVVzZWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGV4dGVuc2lvbiA9IGpzb24uZXh0ZW5zaW9ucz8uWydWUk1DX3ZybSddIGFzIFYxVlJNU2NoZW1hLlZSTUNWUk0gfCB1bmRlZmluZWQ7XG4gICAgaWYgKCFleHRlbnNpb24pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNwZWNWZXJzaW9uID0gZXh0ZW5zaW9uLnNwZWNWZXJzaW9uO1xuICAgIGlmICghUE9TU0lCTEVfU1BFQ19WRVJTSU9OUy5oYXMoc3BlY1ZlcnNpb24pKSB7XG4gICAgICBjb25zb2xlLndhcm4oYFZSTUh1bWFub2lkTG9hZGVyUGx1Z2luOiBVbmtub3duIFZSTUNfdnJtIHNwZWNWZXJzaW9uIFwiJHtzcGVjVmVyc2lvbn1cImApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc2NoZW1hSHVtYW5vaWQgPSBleHRlbnNpb24uaHVtYW5vaWQ7XG4gICAgaWYgKCFzY2hlbWFIdW1hbm9pZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY29tcGF0OiAxLjAtYmV0YSB0aHVtYiBib25lIG5hbWVzXG4gICAgICpcbiAgICAgKiBgdHJ1ZWAgaWYgYGxlZnRUaHVtYkludGVybWVkaWF0ZWAgb3IgYHJpZ2h0VGh1bWJJbnRlcm1lZGlhdGVgIGV4aXN0c1xuICAgICAqL1xuICAgIGNvbnN0IGV4aXN0c1ByZXZpb3VzVGh1bWJOYW1lID1cbiAgICAgIChzY2hlbWFIdW1hbm9pZC5odW1hbkJvbmVzIGFzIGFueSkubGVmdFRodW1iSW50ZXJtZWRpYXRlICE9IG51bGwgfHxcbiAgICAgIChzY2hlbWFIdW1hbm9pZC5odW1hbkJvbmVzIGFzIGFueSkucmlnaHRUaHVtYkludGVybWVkaWF0ZSAhPSBudWxsO1xuXG4gICAgY29uc3QgaHVtYW5Cb25lczogUGFydGlhbDxWUk1IdW1hbkJvbmVzPiA9IHt9O1xuICAgIGlmIChzY2hlbWFIdW1hbm9pZC5odW1hbkJvbmVzICE9IG51bGwpIHtcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICBPYmplY3QuZW50cmllcyhzY2hlbWFIdW1hbm9pZC5odW1hbkJvbmVzKS5tYXAoYXN5bmMgKFtib25lTmFtZVN0cmluZywgc2NoZW1hSHVtYW5Cb25lXSkgPT4ge1xuICAgICAgICAgIGxldCBib25lTmFtZSA9IGJvbmVOYW1lU3RyaW5nIGFzIFYxVlJNU2NoZW1hLkh1bWFub2lkSHVtYW5Cb25lTmFtZTtcbiAgICAgICAgICBjb25zdCBpbmRleCA9IHNjaGVtYUh1bWFuQm9uZS5ub2RlO1xuXG4gICAgICAgICAgLy8gY29tcGF0OiAxLjAtYmV0YSBwcmV2aW91cyB0aHVtYiBib25lIG5hbWVzXG4gICAgICAgICAgaWYgKGV4aXN0c1ByZXZpb3VzVGh1bWJOYW1lKSB7XG4gICAgICAgICAgICBjb25zdCB0aHVtYkJvbmVOYW1lID0gdGh1bWJCb25lTmFtZU1hcFtib25lTmFtZV07XG4gICAgICAgICAgICBpZiAodGh1bWJCb25lTmFtZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgIGJvbmVOYW1lID0gdGh1bWJCb25lTmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBub2RlID0gYXdhaXQgdGhpcy5wYXJzZXIuZ2V0RGVwZW5kZW5jeSgnbm9kZScsIGluZGV4KTtcblxuICAgICAgICAgIC8vIGlmIHRoZSBzcGVjaWZpZWQgbm9kZSBkb2VzIG5vdCBleGlzdCwgZW1pdCBhIHdhcm5pbmdcbiAgICAgICAgICBpZiAobm9kZSA9PSBudWxsKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYEEgZ2xURiBub2RlIGJvdW5kIHRvIHRoZSBodW1hbm9pZCBib25lICR7Ym9uZU5hbWV9IChpbmRleCA9ICR7aW5kZXh9KSBkb2VzIG5vdCBleGlzdGApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIHNldCB0byB0aGUgYGh1bWFuQm9uZXNgXG4gICAgICAgICAgaHVtYW5Cb25lc1tib25lTmFtZV0gPSB7IG5vZGUgfTtcbiAgICAgICAgfSksXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IGh1bWFub2lkID0gbmV3IFZSTUh1bWFub2lkKHRoaXMuX2Vuc3VyZVJlcXVpcmVkQm9uZXNFeGlzdChodW1hbkJvbmVzKSwge1xuICAgICAgYXV0b1VwZGF0ZUh1bWFuQm9uZXM6IHRoaXMuYXV0b1VwZGF0ZUh1bWFuQm9uZXMsXG4gICAgfSk7XG4gICAgZ2x0Zi5zY2VuZS5hZGQoaHVtYW5vaWQubm9ybWFsaXplZEh1bWFuQm9uZXNSb290KTtcblxuICAgIGlmICh0aGlzLmhlbHBlclJvb3QpIHtcbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBWUk1IdW1hbm9pZEhlbHBlcihodW1hbm9pZCk7XG4gICAgICB0aGlzLmhlbHBlclJvb3QuYWRkKGhlbHBlcik7XG4gICAgICBoZWxwZXIucmVuZGVyT3JkZXIgPSB0aGlzLmhlbHBlclJvb3QucmVuZGVyT3JkZXI7XG4gICAgfVxuXG4gICAgcmV0dXJuIGh1bWFub2lkO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfdjBJbXBvcnQoZ2x0ZjogR0xURik6IFByb21pc2U8VlJNSHVtYW5vaWQgfCBudWxsPiB7XG4gICAgY29uc3QganNvbiA9IHRoaXMucGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAgIGNvbnN0IHZybUV4dCA9IGpzb24uZXh0ZW5zaW9ucz8uVlJNIGFzIFYwVlJNLlZSTSB8IHVuZGVmaW5lZDtcbiAgICBpZiAoIXZybUV4dCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc2NoZW1hSHVtYW5vaWQ6IFYwVlJNLkh1bWFub2lkIHwgdW5kZWZpbmVkID0gdnJtRXh0Lmh1bWFub2lkO1xuICAgIGlmICghc2NoZW1hSHVtYW5vaWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGh1bWFuQm9uZXM6IFBhcnRpYWw8VlJNSHVtYW5Cb25lcz4gPSB7fTtcbiAgICBpZiAoc2NoZW1hSHVtYW5vaWQuaHVtYW5Cb25lcyAhPSBudWxsKSB7XG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgc2NoZW1hSHVtYW5vaWQuaHVtYW5Cb25lcy5tYXAoYXN5bmMgKGJvbmUpID0+IHtcbiAgICAgICAgICBjb25zdCBib25lTmFtZSA9IGJvbmUuYm9uZTtcbiAgICAgICAgICBjb25zdCBpbmRleCA9IGJvbmUubm9kZTtcblxuICAgICAgICAgIGlmIChib25lTmFtZSA9PSBudWxsIHx8IGluZGV4ID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBWUk0wLjAgY2FuIGNvbnRhaW4gLTEgYXMgYSBub2RlIGluZGV4LCB3aGljaCBpcyBpbnZhbGlkXG4gICAgICAgICAgLy8gRm91bmQgYXQgbGVhc3QgaW4gVW5pVlJNLTAuNjEuMVxuICAgICAgICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgICAgYEEgZ2xURiBub2RlIGluZGV4IGZvciB0aGUgaHVtYW5vaWQgYm9uZSAke2JvbmVOYW1lfSBpcyBuZWdhdGl2ZSAoJHtpbmRleH0pLCBpZ25vcmluZyB0aGlzIGJvbmUuYCxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3Qgbm9kZSA9IGF3YWl0IHRoaXMucGFyc2VyLmdldERlcGVuZGVuY3koJ25vZGUnLCBpbmRleCk7XG5cbiAgICAgICAgICAvLyBpZiB0aGUgc3BlY2lmaWVkIG5vZGUgZG9lcyBub3QgZXhpc3QsIGVtaXQgYSB3YXJuaW5nXG4gICAgICAgICAgaWYgKG5vZGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGBBIGdsVEYgbm9kZSBib3VuZCB0byB0aGUgaHVtYW5vaWQgYm9uZSAke2JvbmVOYW1lfSAoaW5kZXggPSAke2luZGV4fSkgZG9lcyBub3QgZXhpc3RgKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBtYXAgdG8gbmV3IGJvbmUgbmFtZVxuICAgICAgICAgIGNvbnN0IHRodW1iQm9uZU5hbWUgPSB0aHVtYkJvbmVOYW1lTWFwW2JvbmVOYW1lXTtcbiAgICAgICAgICBjb25zdCBuZXdCb25lTmFtZSA9ICh0aHVtYkJvbmVOYW1lID8/IGJvbmVOYW1lKSBhcyBWMVZSTVNjaGVtYS5IdW1hbm9pZEh1bWFuQm9uZU5hbWU7XG5cbiAgICAgICAgICAvLyB2MCBWUk1zIG1pZ2h0IGhhdmUgYSBtdWx0aXBsZSBub2RlcyBhdHRhY2hlZCB0byBhIHNpbmdsZSBib25lLi4uXG4gICAgICAgICAgLy8gc28gaWYgdGhlcmUgYWxyZWFkeSBpcyBhbiBlbnRyeSBpbiB0aGUgYGh1bWFuQm9uZXNgLCBzaG93IGEgd2FybmluZyBhbmQgaWdub3JlIGl0XG4gICAgICAgICAgaWYgKGh1bWFuQm9uZXNbbmV3Qm9uZU5hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgICAgYE11bHRpcGxlIGJvbmUgZW50cmllcyBmb3IgJHtuZXdCb25lTmFtZX0gZGV0ZWN0ZWQgKGluZGV4ID0gJHtpbmRleH0pLCBpZ25vcmluZyBkdXBsaWNhdGVkIGVudHJpZXMuYCxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gc2V0IHRvIHRoZSBgaHVtYW5Cb25lc2BcbiAgICAgICAgICBodW1hbkJvbmVzW25ld0JvbmVOYW1lXSA9IHsgbm9kZSB9O1xuICAgICAgICB9KSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgaHVtYW5vaWQgPSBuZXcgVlJNSHVtYW5vaWQodGhpcy5fZW5zdXJlUmVxdWlyZWRCb25lc0V4aXN0KGh1bWFuQm9uZXMpLCB7XG4gICAgICBhdXRvVXBkYXRlSHVtYW5Cb25lczogdGhpcy5hdXRvVXBkYXRlSHVtYW5Cb25lcyxcbiAgICB9KTtcbiAgICBnbHRmLnNjZW5lLmFkZChodW1hbm9pZC5ub3JtYWxpemVkSHVtYW5Cb25lc1Jvb3QpO1xuXG4gICAgaWYgKHRoaXMuaGVscGVyUm9vdCkge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IFZSTUh1bWFub2lkSGVscGVyKGh1bWFub2lkKTtcbiAgICAgIHRoaXMuaGVscGVyUm9vdC5hZGQoaGVscGVyKTtcbiAgICAgIGhlbHBlci5yZW5kZXJPcmRlciA9IHRoaXMuaGVscGVyUm9vdC5yZW5kZXJPcmRlcjtcbiAgICB9XG5cbiAgICByZXR1cm4gaHVtYW5vaWQ7XG4gIH1cblxuICAvKipcbiAgICogRW5zdXJlIHJlcXVpcmVkIGJvbmVzIGV4aXN0IGluIGdpdmVuIGh1bWFuIGJvbmVzLlxuICAgKiBAcGFyYW0gaHVtYW5Cb25lcyBIdW1hbiBib25lc1xuICAgKiBAcmV0dXJucyBIdW1hbiBib25lcywgbm8gbG9uZ2VyIHBhcnRpYWwhXG4gICAqL1xuICBwcml2YXRlIF9lbnN1cmVSZXF1aXJlZEJvbmVzRXhpc3QoaHVtYW5Cb25lczogUGFydGlhbDxWUk1IdW1hbkJvbmVzPik6IFZSTUh1bWFuQm9uZXMge1xuICAgIC8vIGVuc3VyZSByZXF1aXJlZCBib25lcyBleGlzdFxuICAgIGNvbnN0IG1pc3NpbmdSZXF1aXJlZEJvbmVzID0gT2JqZWN0LnZhbHVlcyhWUk1SZXF1aXJlZEh1bWFuQm9uZU5hbWUpLmZpbHRlcihcbiAgICAgIChyZXF1aXJlZEJvbmVOYW1lKSA9PiBodW1hbkJvbmVzW3JlcXVpcmVkQm9uZU5hbWVdID09IG51bGwsXG4gICAgKTtcblxuICAgIC8vIHRocm93IGFuIGVycm9yIGlmIHRoZXJlIGFyZSBtaXNzaW5nIGJvbmVzXG4gICAgaWYgKG1pc3NpbmdSZXF1aXJlZEJvbmVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYFZSTUh1bWFub2lkTG9hZGVyUGx1Z2luOiBUaGVzZSBodW1hbm9pZCBib25lcyBhcmUgcmVxdWlyZWQgYnV0IG5vdCBleGlzdDogJHttaXNzaW5nUmVxdWlyZWRCb25lcy5qb2luKCcsICcpfWAsXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBodW1hbkJvbmVzIGFzIFZSTUh1bWFuQm9uZXM7XG4gIH1cbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1Mb29rQXQgfSBmcm9tICcuLi9WUk1Mb29rQXQnO1xuaW1wb3J0IHsgRmFuQnVmZmVyR2VvbWV0cnkgfSBmcm9tICcuL3V0aWxzL0ZhbkJ1ZmZlckdlb21ldHJ5JztcbmltcG9ydCB7IExpbmVBbmRTcGhlcmVCdWZmZXJHZW9tZXRyeSB9IGZyb20gJy4vdXRpbHMvTGluZUFuZFNwaGVyZUJ1ZmZlckdlb21ldHJ5JztcblxuY29uc3QgX3F1YXRBID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbmNvbnN0IF9xdWF0QiA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF92M0IgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5jb25zdCBTUVJUXzJfT1ZFUl8yID0gTWF0aC5zcXJ0KDIuMCkgLyAyLjA7XG5jb25zdCBRVUFUX1hZX0NXOTAgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigwLCAwLCAtU1FSVF8yX09WRVJfMiwgU1FSVF8yX09WRVJfMik7XG5jb25zdCBWRUMzX1BPU0lUSVZFX1kgPSBuZXcgVEhSRUUuVmVjdG9yMygwLjAsIDEuMCwgMC4wKTtcblxuZXhwb3J0IGNsYXNzIFZSTUxvb2tBdEhlbHBlciBleHRlbmRzIFRIUkVFLkdyb3VwIHtcbiAgcHVibGljIHJlYWRvbmx5IHZybUxvb2tBdDogVlJNTG9va0F0O1xuICBwcml2YXRlIHJlYWRvbmx5IF9tZXNoWWF3OiBUSFJFRS5NZXNoPEZhbkJ1ZmZlckdlb21ldHJ5LCBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbD47XG4gIHByaXZhdGUgcmVhZG9ubHkgX21lc2hQaXRjaDogVEhSRUUuTWVzaDxGYW5CdWZmZXJHZW9tZXRyeSwgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWw+O1xuICBwcml2YXRlIHJlYWRvbmx5IF9saW5lVGFyZ2V0OiBUSFJFRS5MaW5lU2VnbWVudHM8TGluZUFuZFNwaGVyZUJ1ZmZlckdlb21ldHJ5LCBUSFJFRS5MaW5lQmFzaWNNYXRlcmlhbD47XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGxvb2tBdDogVlJNTG9va0F0KSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLm1hdHJpeEF1dG9VcGRhdGUgPSBmYWxzZTtcblxuICAgIHRoaXMudnJtTG9va0F0ID0gbG9va0F0O1xuXG4gICAge1xuICAgICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgRmFuQnVmZmVyR2VvbWV0cnkoKTtcbiAgICAgIGdlb21ldHJ5LnJhZGl1cyA9IDAuNTtcblxuICAgICAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICAgICAgICBjb2xvcjogMHgwMGZmMDAsXG4gICAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgICAgICBvcGFjaXR5OiAwLjUsXG4gICAgICAgIHNpZGU6IFRIUkVFLkRvdWJsZVNpZGUsXG4gICAgICAgIGRlcHRoVGVzdDogZmFsc2UsXG4gICAgICAgIGRlcHRoV3JpdGU6IGZhbHNlLFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuX21lc2hQaXRjaCA9IG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCk7XG4gICAgICB0aGlzLmFkZCh0aGlzLl9tZXNoUGl0Y2gpO1xuICAgIH1cblxuICAgIHtcbiAgICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IEZhbkJ1ZmZlckdlb21ldHJ5KCk7XG4gICAgICBnZW9tZXRyeS5yYWRpdXMgPSAwLjU7XG5cbiAgICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAgICAgICAgY29sb3I6IDB4ZmYwMDAwLFxuICAgICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICAgICAgb3BhY2l0eTogMC41LFxuICAgICAgICBzaWRlOiBUSFJFRS5Eb3VibGVTaWRlLFxuICAgICAgICBkZXB0aFRlc3Q6IGZhbHNlLFxuICAgICAgICBkZXB0aFdyaXRlOiBmYWxzZSxcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLl9tZXNoWWF3ID0gbmV3IFRIUkVFLk1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKTtcbiAgICAgIHRoaXMuYWRkKHRoaXMuX21lc2hZYXcpO1xuICAgIH1cblxuICAgIHtcbiAgICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IExpbmVBbmRTcGhlcmVCdWZmZXJHZW9tZXRyeSgpO1xuICAgICAgZ2VvbWV0cnkucmFkaXVzID0gMC4xO1xuXG4gICAgICBjb25zdCBtYXRlcmlhbCA9IG5ldyBUSFJFRS5MaW5lQmFzaWNNYXRlcmlhbCh7XG4gICAgICAgIGNvbG9yOiAweGZmZmZmZixcbiAgICAgICAgZGVwdGhUZXN0OiBmYWxzZSxcbiAgICAgICAgZGVwdGhXcml0ZTogZmFsc2UsXG4gICAgICB9KTtcblxuICAgICAgdGhpcy5fbGluZVRhcmdldCA9IG5ldyBUSFJFRS5MaW5lU2VnbWVudHMoZ2VvbWV0cnksIG1hdGVyaWFsKTtcbiAgICAgIHRoaXMuX2xpbmVUYXJnZXQuZnJ1c3R1bUN1bGxlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5hZGQodGhpcy5fbGluZVRhcmdldCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5fbWVzaFlhdy5nZW9tZXRyeS5kaXNwb3NlKCk7XG4gICAgdGhpcy5fbWVzaFlhdy5tYXRlcmlhbC5kaXNwb3NlKCk7XG5cbiAgICB0aGlzLl9tZXNoUGl0Y2guZ2VvbWV0cnkuZGlzcG9zZSgpO1xuICAgIHRoaXMuX21lc2hQaXRjaC5tYXRlcmlhbC5kaXNwb3NlKCk7XG5cbiAgICB0aGlzLl9saW5lVGFyZ2V0Lmdlb21ldHJ5LmRpc3Bvc2UoKTtcbiAgICB0aGlzLl9saW5lVGFyZ2V0Lm1hdGVyaWFsLmRpc3Bvc2UoKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVNYXRyaXhXb3JsZChmb3JjZTogYm9vbGVhbik6IHZvaWQge1xuICAgIC8vIHVwZGF0ZSBnZW9tZXRyaWVzXG4gICAgY29uc3QgeWF3ID0gVEhSRUUuTWF0aFV0aWxzLkRFRzJSQUQgKiB0aGlzLnZybUxvb2tBdC55YXc7XG4gICAgdGhpcy5fbWVzaFlhdy5nZW9tZXRyeS50aGV0YSA9IHlhdztcbiAgICB0aGlzLl9tZXNoWWF3Lmdlb21ldHJ5LnVwZGF0ZSgpO1xuXG4gICAgY29uc3QgcGl0Y2ggPSBUSFJFRS5NYXRoVXRpbHMuREVHMlJBRCAqIHRoaXMudnJtTG9va0F0LnBpdGNoO1xuICAgIHRoaXMuX21lc2hQaXRjaC5nZW9tZXRyeS50aGV0YSA9IHBpdGNoO1xuICAgIHRoaXMuX21lc2hQaXRjaC5nZW9tZXRyeS51cGRhdGUoKTtcblxuICAgIC8vIGdldCB3b3JsZCBwb3NpdGlvbiBhbmQgcXVhdGVybmlvblxuICAgIHRoaXMudnJtTG9va0F0LmdldExvb2tBdFdvcmxkUG9zaXRpb24oX3YzQSk7XG4gICAgdGhpcy52cm1Mb29rQXQuZ2V0TG9va0F0V29ybGRRdWF0ZXJuaW9uKF9xdWF0QSk7XG5cbiAgICAvLyBjYWxjdWxhdGUgcm90YXRpb24gdXNpbmcgZmFjZUZyb250XG4gICAgX3F1YXRBLm11bHRpcGx5KHRoaXMudnJtTG9va0F0LmdldEZhY2VGcm9udFF1YXRlcm5pb24oX3F1YXRCKSk7XG5cbiAgICAvLyBzZXQgdHJhbnNmb3JtIHRvIG1lc2hlc1xuICAgIHRoaXMuX21lc2hZYXcucG9zaXRpb24uY29weShfdjNBKTtcbiAgICB0aGlzLl9tZXNoWWF3LnF1YXRlcm5pb24uY29weShfcXVhdEEpO1xuXG4gICAgdGhpcy5fbWVzaFBpdGNoLnBvc2l0aW9uLmNvcHkoX3YzQSk7XG4gICAgdGhpcy5fbWVzaFBpdGNoLnF1YXRlcm5pb24uY29weShfcXVhdEEpO1xuICAgIHRoaXMuX21lc2hQaXRjaC5xdWF0ZXJuaW9uLm11bHRpcGx5KF9xdWF0Qi5zZXRGcm9tQXhpc0FuZ2xlKFZFQzNfUE9TSVRJVkVfWSwgeWF3KSk7XG4gICAgdGhpcy5fbWVzaFBpdGNoLnF1YXRlcm5pb24ubXVsdGlwbHkoUVVBVF9YWV9DVzkwKTtcblxuICAgIC8vIHVwZGF0ZSB0YXJnZXQgbGluZSBhbmQgc3BoZXJlXG4gICAgY29uc3QgeyB0YXJnZXQsIGF1dG9VcGRhdGUgfSA9IHRoaXMudnJtTG9va0F0O1xuICAgIGlmICh0YXJnZXQgIT0gbnVsbCAmJiBhdXRvVXBkYXRlKSB7XG4gICAgICB0YXJnZXQuZ2V0V29ybGRQb3NpdGlvbihfdjNCKS5zdWIoX3YzQSk7XG4gICAgICB0aGlzLl9saW5lVGFyZ2V0Lmdlb21ldHJ5LnRhaWwuY29weShfdjNCKTtcbiAgICAgIHRoaXMuX2xpbmVUYXJnZXQuZ2VvbWV0cnkudXBkYXRlKCk7XG4gICAgICB0aGlzLl9saW5lVGFyZ2V0LnBvc2l0aW9uLmNvcHkoX3YzQSk7XG4gICAgfVxuXG4gICAgLy8gYXBwbHkgdHJhbnNmb3JtIHRvIG1lc2hlc1xuICAgIHN1cGVyLnVwZGF0ZU1hdHJpeFdvcmxkKGZvcmNlKTtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuZXhwb3J0IGNsYXNzIEZhbkJ1ZmZlckdlb21ldHJ5IGV4dGVuZHMgVEhSRUUuQnVmZmVyR2VvbWV0cnkge1xuICBwdWJsaWMgdGhldGE6IG51bWJlcjtcbiAgcHVibGljIHJhZGl1czogbnVtYmVyO1xuICBwcml2YXRlIF9jdXJyZW50VGhldGEgPSAwO1xuICBwcml2YXRlIF9jdXJyZW50UmFkaXVzID0gMDtcbiAgcHJpdmF0ZSByZWFkb25seSBfYXR0clBvczogVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xuICBwcml2YXRlIHJlYWRvbmx5IF9hdHRySW5kZXg6IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZTtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMudGhldGEgPSAwLjA7XG4gICAgdGhpcy5yYWRpdXMgPSAwLjA7XG4gICAgdGhpcy5fY3VycmVudFRoZXRhID0gMC4wO1xuICAgIHRoaXMuX2N1cnJlbnRSYWRpdXMgPSAwLjA7XG5cbiAgICB0aGlzLl9hdHRyUG9zID0gbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShuZXcgRmxvYXQzMkFycmF5KDY1ICogMyksIDMpO1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKCdwb3NpdGlvbicsIHRoaXMuX2F0dHJQb3MpO1xuXG4gICAgdGhpcy5fYXR0ckluZGV4ID0gbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShuZXcgVWludDE2QXJyYXkoMyAqIDYzKSwgMSk7XG4gICAgdGhpcy5zZXRJbmRleCh0aGlzLl9hdHRySW5kZXgpO1xuXG4gICAgdGhpcy5fYnVpbGRJbmRleCgpO1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIGxldCBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IGZhbHNlO1xuXG4gICAgaWYgKHRoaXMuX2N1cnJlbnRUaGV0YSAhPT0gdGhpcy50aGV0YSkge1xuICAgICAgdGhpcy5fY3VycmVudFRoZXRhID0gdGhpcy50aGV0YTtcbiAgICAgIHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fY3VycmVudFJhZGl1cyAhPT0gdGhpcy5yYWRpdXMpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRSYWRpdXMgPSB0aGlzLnJhZGl1cztcbiAgICAgIHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoc2hvdWxkVXBkYXRlR2VvbWV0cnkpIHtcbiAgICAgIHRoaXMuX2J1aWxkUG9zaXRpb24oKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9idWlsZFBvc2l0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKDAsIDAuMCwgMC4wLCAwLjApO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA2NDsgaSsrKSB7XG4gICAgICBjb25zdCB0ID0gKGkgLyA2My4wKSAqIHRoaXMuX2N1cnJlbnRUaGV0YTtcblxuICAgICAgdGhpcy5fYXR0clBvcy5zZXRYWVooaSArIDEsIHRoaXMuX2N1cnJlbnRSYWRpdXMgKiBNYXRoLnNpbih0KSwgMC4wLCB0aGlzLl9jdXJyZW50UmFkaXVzICogTWF0aC5jb3ModCkpO1xuICAgIH1cblxuICAgIHRoaXMuX2F0dHJQb3MubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRJbmRleCgpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDYzOyBpKyspIHtcbiAgICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWVooaSAqIDMsIDAsIGkgKyAxLCBpICsgMik7XG4gICAgfVxuXG4gICAgdGhpcy5fYXR0ckluZGV4Lm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuZXhwb3J0IGNsYXNzIExpbmVBbmRTcGhlcmVCdWZmZXJHZW9tZXRyeSBleHRlbmRzIFRIUkVFLkJ1ZmZlckdlb21ldHJ5IHtcbiAgcHVibGljIHJhZGl1czogbnVtYmVyO1xuICBwdWJsaWMgdGFpbDogVEhSRUUuVmVjdG9yMztcbiAgcHJpdmF0ZSBfY3VycmVudFJhZGl1czogbnVtYmVyO1xuICBwcml2YXRlIF9jdXJyZW50VGFpbDogVEhSRUUuVmVjdG9yMztcbiAgcHJpdmF0ZSByZWFkb25seSBfYXR0clBvczogVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xuICBwcml2YXRlIHJlYWRvbmx5IF9hdHRySW5kZXg6IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZTtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMucmFkaXVzID0gMC4wO1xuICAgIHRoaXMuX2N1cnJlbnRSYWRpdXMgPSAwLjA7XG5cbiAgICB0aGlzLnRhaWwgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuICAgIHRoaXMuX2N1cnJlbnRUYWlsID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuICAgIHRoaXMuX2F0dHJQb3MgPSBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKG5ldyBGbG9hdDMyQXJyYXkoMjk0KSwgMyk7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJywgdGhpcy5fYXR0clBvcyk7XG5cbiAgICB0aGlzLl9hdHRySW5kZXggPSBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKG5ldyBVaW50MTZBcnJheSgxOTQpLCAxKTtcbiAgICB0aGlzLnNldEluZGV4KHRoaXMuX2F0dHJJbmRleCk7XG5cbiAgICB0aGlzLl9idWlsZEluZGV4KCk7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgbGV0IHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gZmFsc2U7XG5cbiAgICBpZiAodGhpcy5fY3VycmVudFJhZGl1cyAhPT0gdGhpcy5yYWRpdXMpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRSYWRpdXMgPSB0aGlzLnJhZGl1cztcbiAgICAgIHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX2N1cnJlbnRUYWlsLmVxdWFscyh0aGlzLnRhaWwpKSB7XG4gICAgICB0aGlzLl9jdXJyZW50VGFpbC5jb3B5KHRoaXMudGFpbCk7XG4gICAgICBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHNob3VsZFVwZGF0ZUdlb21ldHJ5KSB7XG4gICAgICB0aGlzLl9idWlsZFBvc2l0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRQb3NpdGlvbigpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDMyOyBpKyspIHtcbiAgICAgIGNvbnN0IHQgPSAoaSAvIDE2LjApICogTWF0aC5QSTtcblxuICAgICAgdGhpcy5fYXR0clBvcy5zZXRYWVooaSwgTWF0aC5jb3ModCksIE1hdGguc2luKHQpLCAwLjApO1xuICAgICAgdGhpcy5fYXR0clBvcy5zZXRYWVooMzIgKyBpLCAwLjAsIE1hdGguY29zKHQpLCBNYXRoLnNpbih0KSk7XG4gICAgICB0aGlzLl9hdHRyUG9zLnNldFhZWig2NCArIGksIE1hdGguc2luKHQpLCAwLjAsIE1hdGguY29zKHQpKTtcbiAgICB9XG5cbiAgICB0aGlzLnNjYWxlKHRoaXMuX2N1cnJlbnRSYWRpdXMsIHRoaXMuX2N1cnJlbnRSYWRpdXMsIHRoaXMuX2N1cnJlbnRSYWRpdXMpO1xuICAgIHRoaXMudHJhbnNsYXRlKHRoaXMuX2N1cnJlbnRUYWlsLngsIHRoaXMuX2N1cnJlbnRUYWlsLnksIHRoaXMuX2N1cnJlbnRUYWlsLnopO1xuXG4gICAgdGhpcy5fYXR0clBvcy5zZXRYWVooOTYsIDAsIDAsIDApO1xuICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKDk3LCB0aGlzLl9jdXJyZW50VGFpbC54LCB0aGlzLl9jdXJyZW50VGFpbC55LCB0aGlzLl9jdXJyZW50VGFpbC56KTtcblxuICAgIHRoaXMuX2F0dHJQb3MubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRJbmRleCgpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDMyOyBpKyspIHtcbiAgICAgIGNvbnN0IGkxID0gKGkgKyAxKSAlIDMyO1xuXG4gICAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoaSAqIDIsIGksIGkxKTtcbiAgICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWSg2NCArIGkgKiAyLCAzMiArIGksIDMyICsgaTEpO1xuICAgICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKDEyOCArIGkgKiAyLCA2NCArIGksIDY0ICsgaTEpO1xuICAgIH1cbiAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoMTkyLCA5NiwgOTcpO1xuXG4gICAgdGhpcy5fYXR0ckluZGV4Lm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTUh1bWFub2lkIH0gZnJvbSAnLi4vaHVtYW5vaWQnO1xuaW1wb3J0IHsgZ2V0V29ybGRRdWF0ZXJuaW9uTGl0ZSB9IGZyb20gJy4uL3V0aWxzL2dldFdvcmxkUXVhdGVybmlvbkxpdGUnO1xuaW1wb3J0IHsgcXVhdEludmVydENvbXBhdCB9IGZyb20gJy4uL3V0aWxzL3F1YXRJbnZlcnRDb21wYXQnO1xuaW1wb3J0IHsgY2FsY0F6aW11dGhBbHRpdHVkZSB9IGZyb20gJy4vdXRpbHMvY2FsY0F6aW11dGhBbHRpdHVkZSc7XG5pbXBvcnQgdHlwZSB7IFZSTUxvb2tBdEFwcGxpZXIgfSBmcm9tICcuL1ZSTUxvb2tBdEFwcGxpZXInO1xuaW1wb3J0IHsgc2FuaXRpemVBbmdsZSB9IGZyb20gJy4vdXRpbHMvc2FuaXRpemVBbmdsZSc7XG5cbmNvbnN0IFZFQzNfUE9TSVRJVkVfWiA9IG5ldyBUSFJFRS5WZWN0b3IzKDAuMCwgMC4wLCAxLjApO1xuXG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF92M0IgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3YzQyA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfcXVhdEEgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuY29uc3QgX3F1YXRCID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbmNvbnN0IF9xdWF0QyA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5jb25zdCBfcXVhdEQgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuY29uc3QgX2V1bGVyQSA9IG5ldyBUSFJFRS5FdWxlcigpO1xuXG4vKipcbiAqIEEgY2xhc3MgY29udHJvbHMgZXllIGdhemUgbW92ZW1lbnRzIG9mIGEgVlJNLlxuICovXG5leHBvcnQgY2xhc3MgVlJNTG9va0F0IHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBFVUxFUl9PUkRFUiA9ICdZWFonOyAvLyB5YXctcGl0Y2gtcm9sbFxuXG4gIC8qKlxuICAgKiBUaGUgb3JpZ2luIG9mIExvb2tBdC4gUG9zaXRpb24gb2Zmc2V0IGZyb20gdGhlIGhlYWQgYm9uZS5cbiAgICovXG4gIHB1YmxpYyBvZmZzZXRGcm9tSGVhZEJvbmUgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4gIC8qKlxuICAgKiBJdHMgYXNzb2NpYXRlZCB7QGxpbmsgVlJNSHVtYW5vaWR9LlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGh1bWFub2lkOiBWUk1IdW1hbm9pZDtcblxuICAvKipcbiAgICogVGhlIHtAbGluayBWUk1Mb29rQXRBcHBsaWVyfSBvZiB0aGUgTG9va0F0LlxuICAgKi9cbiAgcHVibGljIGFwcGxpZXI6IFZSTUxvb2tBdEFwcGxpZXI7XG5cbiAgLyoqXG4gICAqIElmIHRoaXMgaXMgdHJ1ZSwgdGhlIExvb2tBdCB3aWxsIGJlIHVwZGF0ZWQgYXV0b21hdGljYWxseSBieSBjYWxsaW5nIHtAbGluayB1cGRhdGV9LCB0b3dhcmRpbmcgdGhlIGRpcmVjdGlvbiB0byB0aGUge0BsaW5rIHRhcmdldH0uXG4gICAqIGB0cnVlYCBieSBkZWZhdWx0LlxuICAgKlxuICAgKiBTZWUgYWxzbzoge0BsaW5rIHRhcmdldH1cbiAgICovXG4gIHB1YmxpYyBhdXRvVXBkYXRlID0gdHJ1ZTtcblxuICAvKipcbiAgICogVGhlIHRhcmdldCBvYmplY3Qgb2YgdGhlIExvb2tBdC5cbiAgICogTm90ZSB0aGF0IGl0IGRvZXMgbm90IG1ha2UgYW55IHNlbnNlIGlmIHtAbGluayBhdXRvVXBkYXRlfSBpcyBkaXNhYmxlZC5cbiAgICpcbiAgICogU2VlIGFsc286IHtAbGluayBhdXRvVXBkYXRlfVxuICAgKi9cbiAgcHVibGljIHRhcmdldD86IFRIUkVFLk9iamVjdDNEIHwgbnVsbDtcblxuICAvKipcbiAgICogVGhlIGZyb250IGRpcmVjdGlvbiBvZiB0aGUgZmFjZS5cbiAgICogSW50ZW5kZWQgdG8gYmUgdXNlZCBmb3IgVlJNIDAuMCBjb21wYXQgKFZSTSAwLjAgbW9kZWxzIGFyZSBmYWNpbmcgWi0gaW5zdGVhZCBvZiBaKykuXG4gICAqIFlvdSB1c3VhbGx5IGRvbid0IHdhbnQgdG8gdG91Y2ggdGhpcy5cbiAgICovXG4gIHB1YmxpYyBmYWNlRnJvbnQgPSBuZXcgVEhSRUUuVmVjdG9yMygwLjAsIDAuMCwgMS4wKTtcblxuICAvKipcbiAgICogSXRzIGN1cnJlbnQgYW5nbGUgYXJvdW5kIFkgYXhpcywgaW4gZGVncmVlLlxuICAgKi9cbiAgcHJvdGVjdGVkIF95YXc6IG51bWJlcjtcblxuICAvKipcbiAgICogSXRzIGN1cnJlbnQgYW5nbGUgYXJvdW5kIFkgYXhpcywgaW4gZGVncmVlLlxuICAgKi9cbiAgcHVibGljIGdldCB5YXcoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5feWF3O1xuICB9XG5cbiAgLyoqXG4gICAqIEl0cyBjdXJyZW50IGFuZ2xlIGFyb3VuZCBZIGF4aXMsIGluIGRlZ3JlZS5cbiAgICovXG4gIHB1YmxpYyBzZXQgeWF3KHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl95YXcgPSB2YWx1ZTtcbiAgICB0aGlzLl9uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogSXRzIGN1cnJlbnQgYW5nbGUgYXJvdW5kIFggYXhpcywgaW4gZGVncmVlLlxuICAgKi9cbiAgcHJvdGVjdGVkIF9waXRjaDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBJdHMgY3VycmVudCBhbmdsZSBhcm91bmQgWCBheGlzLCBpbiBkZWdyZWUuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHBpdGNoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3BpdGNoO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0cyBjdXJyZW50IGFuZ2xlIGFyb3VuZCBYIGF4aXMsIGluIGRlZ3JlZS5cbiAgICovXG4gIHB1YmxpYyBzZXQgcGl0Y2godmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX3BpdGNoID0gdmFsdWU7XG4gICAgdGhpcy5fbmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNwZWNpZmllcyB0aGF0IGFuZ2xlcyBuZWVkIHRvIGJlIGFwcGxpZWQgdG8gaXRzIFtAbGluayBhcHBsaWVyXS5cbiAgICovXG4gIHByb3RlY3RlZCBfbmVlZHNVcGRhdGU6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFdvcmxkIHJvdGF0aW9uIG9mIHRoZSBoZWFkIGluIGl0cyByZXN0IHBvc2UuXG4gICAqL1xuICBwcml2YXRlIF9yZXN0SGVhZFdvcmxkUXVhdGVybmlvbjogVEhSRUUuUXVhdGVybmlvbjtcblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVXNlIHtAbGluayBnZXRFdWxlcn0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBnZXQgZXVsZXIoKTogVEhSRUUuRXVsZXIge1xuICAgIGNvbnNvbGUud2FybignVlJNTG9va0F0OiBldWxlciBpcyBkZXByZWNhdGVkLiB1c2UgZ2V0RXVsZXIoKSBpbnN0ZWFkLicpO1xuXG4gICAgcmV0dXJuIHRoaXMuZ2V0RXVsZXIobmV3IFRIUkVFLkV1bGVyKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyB7QGxpbmsgVlJNTG9va0F0fS5cbiAgICpcbiAgICogQHBhcmFtIGh1bWFub2lkIEEge0BsaW5rIFZSTUh1bWFub2lkfVxuICAgKiBAcGFyYW0gYXBwbGllciBBIHtAbGluayBWUk1Mb29rQXRBcHBsaWVyfVxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKGh1bWFub2lkOiBWUk1IdW1hbm9pZCwgYXBwbGllcjogVlJNTG9va0F0QXBwbGllcikge1xuICAgIHRoaXMuaHVtYW5vaWQgPSBodW1hbm9pZDtcbiAgICB0aGlzLmFwcGxpZXIgPSBhcHBsaWVyO1xuXG4gICAgdGhpcy5feWF3ID0gMC4wO1xuICAgIHRoaXMuX3BpdGNoID0gMC4wO1xuICAgIHRoaXMuX25lZWRzVXBkYXRlID0gdHJ1ZTtcblxuICAgIHRoaXMuX3Jlc3RIZWFkV29ybGRRdWF0ZXJuaW9uID0gdGhpcy5nZXRMb29rQXRXb3JsZFF1YXRlcm5pb24obmV3IFRIUkVFLlF1YXRlcm5pb24oKSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGl0cyB5YXctcGl0Y2ggYW5nbGVzIGFzIGFuIGBFdWxlcmAuXG4gICAqIERvZXMgTk9UIGNvbnNpZGVyIHtAbGluayBmYWNlRnJvbnR9OyBpdCByZXR1cm5zIGBFdWxlcigwLCAwLCAwOyBcIllYWlwiKWAgYnkgZGVmYXVsdCByZWdhcmRsZXNzIG9mIHRoZSBmYWNlRnJvbnQgdmFsdWUuXG4gICAqXG4gICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBldWxlclxuICAgKi9cbiAgcHVibGljIGdldEV1bGVyKHRhcmdldDogVEhSRUUuRXVsZXIpOiBUSFJFRS5FdWxlciB7XG4gICAgcmV0dXJuIHRhcmdldC5zZXQoVEhSRUUuTWF0aFV0aWxzLkRFRzJSQUQgKiB0aGlzLl9waXRjaCwgVEhSRUUuTWF0aFV0aWxzLkRFRzJSQUQgKiB0aGlzLl95YXcsIDAuMCwgJ1lYWicpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvcHkgdGhlIGdpdmVuIHtAbGluayBWUk1Mb29rQXR9IGludG8gdGhpcyBvbmUuXG4gICAqIHtAbGluayBodW1hbm9pZH0gbXVzdCBiZSBzYW1lIGFzIHRoZSBzb3VyY2Ugb25lLlxuICAgKiB7QGxpbmsgYXBwbGllcn0gd2lsbCByZWZlcmVuY2UgdGhlIHNhbWUgaW5zdGFuY2UgYXMgdGhlIHNvdXJjZSBvbmUuXG4gICAqIEBwYXJhbSBzb3VyY2UgVGhlIHtAbGluayBWUk1Mb29rQXR9IHlvdSB3YW50IHRvIGNvcHlcbiAgICogQHJldHVybnMgdGhpc1xuICAgKi9cbiAgcHVibGljIGNvcHkoc291cmNlOiBWUk1Mb29rQXQpOiB0aGlzIHtcbiAgICBpZiAodGhpcy5odW1hbm9pZCAhPT0gc291cmNlLmh1bWFub2lkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZSTUxvb2tBdDogaHVtYW5vaWQgbXVzdCBiZSBzYW1lIGluIG9yZGVyIHRvIGNvcHknKTtcbiAgICB9XG5cbiAgICB0aGlzLm9mZnNldEZyb21IZWFkQm9uZS5jb3B5KHNvdXJjZS5vZmZzZXRGcm9tSGVhZEJvbmUpO1xuICAgIHRoaXMuYXBwbGllciA9IHNvdXJjZS5hcHBsaWVyO1xuICAgIHRoaXMuYXV0b1VwZGF0ZSA9IHNvdXJjZS5hdXRvVXBkYXRlO1xuICAgIHRoaXMudGFyZ2V0ID0gc291cmNlLnRhcmdldDtcbiAgICB0aGlzLmZhY2VGcm9udC5jb3B5KHNvdXJjZS5mYWNlRnJvbnQpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGNsb25lIG9mIHRoaXMge0BsaW5rIFZSTUxvb2tBdH0uXG4gICAqIE5vdGUgdGhhdCB7QGxpbmsgaHVtYW5vaWR9IGFuZCB7QGxpbmsgYXBwbGllcn0gd2lsbCByZWZlcmVuY2UgdGhlIHNhbWUgaW5zdGFuY2UgYXMgdGhpcyBvbmUuXG4gICAqIEByZXR1cm5zIENvcGllZCB7QGxpbmsgVlJNTG9va0F0fVxuICAgKi9cbiAgcHVibGljIGNsb25lKCk6IFZSTUxvb2tBdCB7XG4gICAgcmV0dXJuIG5ldyBWUk1Mb29rQXQodGhpcy5odW1hbm9pZCwgdGhpcy5hcHBsaWVyKS5jb3B5KHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoZSBsb29rQXQgZGlyZWN0aW9uICh5YXcgYW5kIHBpdGNoKSB0byB0aGUgaW5pdGlhbCBkaXJlY3Rpb24uXG4gICAqL1xuICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy5feWF3ID0gMC4wO1xuICAgIHRoaXMuX3BpdGNoID0gMC4wO1xuICAgIHRoaXMuX25lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgaXRzIGxvb2tBdCBwb3NpdGlvbiBpbiB3b3JsZCBjb29yZGluYXRlLlxuICAgKlxuICAgKiBAcGFyYW0gdGFyZ2V0IEEgdGFyZ2V0IGBUSFJFRS5WZWN0b3IzYFxuICAgKi9cbiAgcHVibGljIGdldExvb2tBdFdvcmxkUG9zaXRpb24odGFyZ2V0OiBUSFJFRS5WZWN0b3IzKTogVEhSRUUuVmVjdG9yMyB7XG4gICAgY29uc3QgaGVhZCA9IHRoaXMuaHVtYW5vaWQuZ2V0UmF3Qm9uZU5vZGUoJ2hlYWQnKSE7XG5cbiAgICByZXR1cm4gdGFyZ2V0LmNvcHkodGhpcy5vZmZzZXRGcm9tSGVhZEJvbmUpLmFwcGx5TWF0cml4NChoZWFkLm1hdHJpeFdvcmxkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgaXRzIGxvb2tBdCByb3RhdGlvbiBpbiB3b3JsZCBjb29yZGluYXRlLlxuICAgKiBEb2VzIE5PVCBjb25zaWRlciB7QGxpbmsgZmFjZUZyb250fS5cbiAgICpcbiAgICogQHBhcmFtIHRhcmdldCBBIHRhcmdldCBgVEhSRUUuUXVhdGVybmlvbmBcbiAgICovXG4gIHB1YmxpYyBnZXRMb29rQXRXb3JsZFF1YXRlcm5pb24odGFyZ2V0OiBUSFJFRS5RdWF0ZXJuaW9uKTogVEhSRUUuUXVhdGVybmlvbiB7XG4gICAgY29uc3QgaGVhZCA9IHRoaXMuaHVtYW5vaWQuZ2V0UmF3Qm9uZU5vZGUoJ2hlYWQnKSE7XG5cbiAgICByZXR1cm4gZ2V0V29ybGRRdWF0ZXJuaW9uTGl0ZShoZWFkLCB0YXJnZXQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIHF1YXRlcm5pb24gdGhhdCByb3RhdGVzIHRoZSArWiB1bml0IHZlY3RvciBvZiB0aGUgaHVtYW5vaWQgSGVhZCB0byB0aGUge0BsaW5rIGZhY2VGcm9udH0gZGlyZWN0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0gdGFyZ2V0IEEgdGFyZ2V0IGBUSFJFRS5RdWF0ZXJuaW9uYFxuICAgKi9cbiAgcHVibGljIGdldEZhY2VGcm9udFF1YXRlcm5pb24odGFyZ2V0OiBUSFJFRS5RdWF0ZXJuaW9uKTogVEhSRUUuUXVhdGVybmlvbiB7XG4gICAgaWYgKHRoaXMuZmFjZUZyb250LmRpc3RhbmNlVG9TcXVhcmVkKFZFQzNfUE9TSVRJVkVfWikgPCAwLjAxKSB7XG4gICAgICByZXR1cm4gdGFyZ2V0LmNvcHkodGhpcy5fcmVzdEhlYWRXb3JsZFF1YXRlcm5pb24pLmludmVydCgpO1xuICAgIH1cblxuICAgIGNvbnN0IFtmYWNlRnJvbnRBemltdXRoLCBmYWNlRnJvbnRBbHRpdHVkZV0gPSBjYWxjQXppbXV0aEFsdGl0dWRlKHRoaXMuZmFjZUZyb250KTtcbiAgICBfZXVsZXJBLnNldCgwLjAsIDAuNSAqIE1hdGguUEkgKyBmYWNlRnJvbnRBemltdXRoLCBmYWNlRnJvbnRBbHRpdHVkZSwgJ1laWCcpO1xuXG4gICAgcmV0dXJuIHRhcmdldC5zZXRGcm9tRXVsZXIoX2V1bGVyQSkucHJlbXVsdGlwbHkoX3F1YXRELmNvcHkodGhpcy5fcmVzdEhlYWRXb3JsZFF1YXRlcm5pb24pLmludmVydCgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgaXRzIExvb2tBdCBkaXJlY3Rpb24gaW4gd29ybGQgY29vcmRpbmF0ZS5cbiAgICpcbiAgICogQHBhcmFtIHRhcmdldCBBIHRhcmdldCBgVEhSRUUuVmVjdG9yM2BcbiAgICovXG4gIHB1YmxpYyBnZXRMb29rQXRXb3JsZERpcmVjdGlvbih0YXJnZXQ6IFRIUkVFLlZlY3RvcjMpOiBUSFJFRS5WZWN0b3IzIHtcbiAgICB0aGlzLmdldExvb2tBdFdvcmxkUXVhdGVybmlvbihfcXVhdEIpO1xuICAgIHRoaXMuZ2V0RmFjZUZyb250UXVhdGVybmlvbihfcXVhdEMpO1xuXG4gICAgcmV0dXJuIHRhcmdldFxuICAgICAgLmNvcHkoVkVDM19QT1NJVElWRV9aKVxuICAgICAgLmFwcGx5UXVhdGVybmlvbihfcXVhdEIpXG4gICAgICAuYXBwbHlRdWF0ZXJuaW9uKF9xdWF0QylcbiAgICAgIC5hcHBseUV1bGVyKHRoaXMuZ2V0RXVsZXIoX2V1bGVyQSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBpdHMgbG9va0F0IHRhcmdldCBwb3NpdGlvbi5cbiAgICpcbiAgICogTm90ZSB0aGF0IGl0cyByZXN1bHQgd2lsbCBiZSBpbnN0YW50bHkgb3ZlcndyaXR0ZW4gaWYge0BsaW5rIFZSTUxvb2tBdEhlYWQuYXV0b1VwZGF0ZX0gaXMgZW5hYmxlZC5cbiAgICpcbiAgICogSWYgeW91IHdhbnQgdG8gdHJhY2sgYW4gb2JqZWN0IGNvbnRpbnVvdXNseSwgeW91IG1pZ2h0IHdhbnQgdG8gdXNlIHtAbGluayB0YXJnZXR9IGluc3RlYWQuXG4gICAqXG4gICAqIEBwYXJhbSBwb3NpdGlvbiBBIHRhcmdldCBwb3NpdGlvbiwgaW4gd29ybGQgc3BhY2VcbiAgICovXG4gIHB1YmxpYyBsb29rQXQocG9zaXRpb246IFRIUkVFLlZlY3RvcjMpOiB2b2lkIHtcbiAgICAvLyBMb29rIGF0IGRpcmVjdGlvbiBpbiBsb2NhbCBjb29yZGluYXRlXG4gICAgY29uc3QgaGVhZFJvdERpZmZJbnYgPSBfcXVhdEFcbiAgICAgIC5jb3B5KHRoaXMuX3Jlc3RIZWFkV29ybGRRdWF0ZXJuaW9uKVxuICAgICAgLm11bHRpcGx5KHF1YXRJbnZlcnRDb21wYXQodGhpcy5nZXRMb29rQXRXb3JsZFF1YXRlcm5pb24oX3F1YXRCKSkpO1xuICAgIGNvbnN0IGhlYWRQb3MgPSB0aGlzLmdldExvb2tBdFdvcmxkUG9zaXRpb24oX3YzQik7XG4gICAgY29uc3QgbG9va0F0RGlyID0gX3YzQy5jb3B5KHBvc2l0aW9uKS5zdWIoaGVhZFBvcykuYXBwbHlRdWF0ZXJuaW9uKGhlYWRSb3REaWZmSW52KS5ub3JtYWxpemUoKTtcblxuICAgIC8vIGNhbGN1bGF0ZSBhbmdsZXNcbiAgICBjb25zdCBbYXppbXV0aEZyb20sIGFsdGl0dWRlRnJvbV0gPSBjYWxjQXppbXV0aEFsdGl0dWRlKHRoaXMuZmFjZUZyb250KTtcbiAgICBjb25zdCBbYXppbXV0aFRvLCBhbHRpdHVkZVRvXSA9IGNhbGNBemltdXRoQWx0aXR1ZGUobG9va0F0RGlyKTtcbiAgICBjb25zdCB5YXcgPSBzYW5pdGl6ZUFuZ2xlKGF6aW11dGhUbyAtIGF6aW11dGhGcm9tKTtcbiAgICBjb25zdCBwaXRjaCA9IHNhbml0aXplQW5nbGUoYWx0aXR1ZGVGcm9tIC0gYWx0aXR1ZGVUbyk7IC8vIHNwaW5uaW5nICgxLCAwLCAwKSBDQ1cgYXJvdW5kIFogYXhpcyBtYWtlcyB0aGUgdmVjdG9yIGxvb2sgdXAsIHdoaWxlIHNwaW5uaW5nICgwLCAwLCAxKSBDQ1cgYXJvdW5kIFggYXhpcyBtYWtlcyB0aGUgdmVjdG9yIGxvb2sgZG93blxuXG4gICAgLy8gYXBwbHkgYW5nbGVzXG4gICAgdGhpcy5feWF3ID0gVEhSRUUuTWF0aFV0aWxzLlJBRDJERUcgKiB5YXc7XG4gICAgdGhpcy5fcGl0Y2ggPSBUSFJFRS5NYXRoVXRpbHMuUkFEMkRFRyAqIHBpdGNoO1xuXG4gICAgdGhpcy5fbmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgVlJNTG9va0F0SGVhZC5cbiAgICogSWYge0BsaW5rIGF1dG9VcGRhdGV9IGlzIGVuYWJsZWQsIHRoaXMgd2lsbCBtYWtlIGl0IGxvb2sgYXQgdGhlIHtAbGluayB0YXJnZXR9LlxuICAgKlxuICAgKiBAcGFyYW0gZGVsdGEgZGVsdGFUaW1lLCBpdCBpc24ndCB1c2VkIHRob3VnaC4gWW91IGNhbiB1c2UgdGhlIHBhcmFtZXRlciBpZiB5b3Ugd2FudCB0byB1c2UgdGhpcyBpbiB5b3VyIG93biBleHRlbmRlZCB7QGxpbmsgVlJNTG9va0F0fS5cbiAgICovXG4gIHB1YmxpYyB1cGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQge1xuICAgIGlmICh0aGlzLnRhcmdldCAhPSBudWxsICYmIHRoaXMuYXV0b1VwZGF0ZSkge1xuICAgICAgdGhpcy5sb29rQXQodGhpcy50YXJnZXQuZ2V0V29ybGRQb3NpdGlvbihfdjNBKSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX25lZWRzVXBkYXRlKSB7XG4gICAgICB0aGlzLl9uZWVkc1VwZGF0ZSA9IGZhbHNlO1xuXG4gICAgICB0aGlzLmFwcGxpZXIuYXBwbHlZYXdQaXRjaCh0aGlzLl95YXcsIHRoaXMuX3BpdGNoKTtcbiAgICB9XG4gIH1cbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbmNvbnN0IF9wb3NpdGlvbiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfc2NhbGUgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4vKipcbiAqIEEgcmVwbGFjZW1lbnQgb2YgYE9iamVjdDNELmdldFdvcmxkUXVhdGVybmlvbmAuXG4gKiBFeHRyYWN0IHRoZSB3b3JsZCBxdWF0ZXJuaW9uIG9mIGFuIG9iamVjdCBmcm9tIGl0cyB3b3JsZCBzcGFjZSBtYXRyaXgsIHdpdGhvdXQgY2FsbGluZyBgT2JqZWN0M0QudXBkYXRlV29ybGRNYXRyaXhgLlxuICogVXNlIHRoaXMgd2hlbiB5b3UncmUgc3VyZSB0aGF0IHRoZSB3b3JsZCBtYXRyaXggaXMgdXAtdG8tZGF0ZS5cbiAqXG4gKiBAcGFyYW0gb2JqZWN0IFRoZSBvYmplY3RcbiAqIEBwYXJhbSBvdXQgQSB0YXJnZXQgcXVhdGVybmlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0V29ybGRRdWF0ZXJuaW9uTGl0ZShvYmplY3Q6IFRIUkVFLk9iamVjdDNELCBvdXQ6IFRIUkVFLlF1YXRlcm5pb24pOiBUSFJFRS5RdWF0ZXJuaW9uIHtcbiAgb2JqZWN0Lm1hdHJpeFdvcmxkLmRlY29tcG9zZShfcG9zaXRpb24sIG91dCwgX3NjYWxlKTtcbiAgcmV0dXJuIG91dDtcbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbi8qKlxuICogQ2FsY3VsYXRlIGF6aW11dGggLyBhbHRpdHVkZSBhbmdsZXMgZnJvbSBhIHZlY3Rvci5cbiAqXG4gKiBUaGlzIHJldHVybnMgYSBkaWZmZXJlbmNlIG9mIGFuZ2xlcyBmcm9tICgxLCAwLCAwKS5cbiAqIEF6aW11dGggcmVwcmVzZW50cyBhbiBhbmdsZSBhcm91bmQgWSBheGlzLlxuICogQWx0aXR1ZGUgcmVwcmVzZW50cyBhbiBhbmdsZSBhcm91bmQgWiBheGlzLlxuICogSXQgaXMgcm90YXRlZCBpbiBpbnRyaW5zaWMgWS1aIG9yZGVyLlxuICpcbiAqIEBwYXJhbSB2ZWN0b3IgVGhlIHZlY3RvclxuICogQHJldHVybnMgQSB0dXBsZSBjb250YWlucyB0d28gYW5nbGVzLCBgWyBhemltdXRoLCBhbHRpdHVkZSBdYFxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FsY0F6aW11dGhBbHRpdHVkZSh2ZWN0b3I6IFRIUkVFLlZlY3RvcjMpOiBbYXppbXV0aDogbnVtYmVyLCBhbHRpdHVkZTogbnVtYmVyXSB7XG4gIHJldHVybiBbTWF0aC5hdGFuMigtdmVjdG9yLnosIHZlY3Rvci54KSwgTWF0aC5hdGFuMih2ZWN0b3IueSwgTWF0aC5zcXJ0KHZlY3Rvci54ICogdmVjdG9yLnggKyB2ZWN0b3IueiAqIHZlY3Rvci56KSldO1xufVxuIiwgIi8qKlxuICogTWFrZSBzdXJlIHRoZSBhbmdsZSBpcyB3aXRoaW4gLVBJIHRvIFBJLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBqc1xuICogc2FuaXRpemVBbmdsZSgxLjUgKiBNYXRoLlBJKSAvLyAtMC41ICogUElcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSBhbmdsZSBBbiBpbnB1dCBhbmdsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2FuaXRpemVBbmdsZShhbmdsZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgY29uc3Qgcm91bmRUdXJuID0gTWF0aC5yb3VuZChhbmdsZSAvIDIuMCAvIE1hdGguUEkpO1xuICByZXR1cm4gYW5nbGUgLSAyLjAgKiBNYXRoLlBJICogcm91bmRUdXJuO1xufVxuIiwgImltcG9ydCB7IFZSTUh1bWFub2lkIH0gZnJvbSAnLi4vaHVtYW5vaWQnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHR5cGUgeyBWUk1Mb29rQXRBcHBsaWVyIH0gZnJvbSAnLi9WUk1Mb29rQXRBcHBsaWVyJztcbmltcG9ydCB7IFZSTUxvb2tBdFJhbmdlTWFwIH0gZnJvbSAnLi9WUk1Mb29rQXRSYW5nZU1hcCc7XG5pbXBvcnQgeyBjYWxjQXppbXV0aEFsdGl0dWRlIH0gZnJvbSAnLi91dGlscy9jYWxjQXppbXV0aEFsdGl0dWRlJztcbmltcG9ydCB7IGdldFdvcmxkUXVhdGVybmlvbkxpdGUgfSBmcm9tICcuLi91dGlscy9nZXRXb3JsZFF1YXRlcm5pb25MaXRlJztcblxuY29uc3QgVkVDM19QT1NJVElWRV9aID0gbmV3IFRIUkVFLlZlY3RvcjMoMC4wLCAwLjAsIDEuMCk7XG5cbmNvbnN0IF9xdWF0QSA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5jb25zdCBfcXVhdEIgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuY29uc3QgX2V1bGVyQSA9IG5ldyBUSFJFRS5FdWxlcigwLjAsIDAuMCwgMC4wLCAnWVhaJyk7XG5cbi8qKlxuICogQSBjbGFzcyB0aGF0IGFwcGxpZXMgZXllIGdhemUgZGlyZWN0aW9ucyB0byBhIFZSTS5cbiAqIEl0IHdpbGwgYmUgdXNlZCBieSB7QGxpbmsgVlJNTG9va0F0fS5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUxvb2tBdEJvbmVBcHBsaWVyIGltcGxlbWVudHMgVlJNTG9va0F0QXBwbGllciB7XG4gIC8qKlxuICAgKiBSZXByZXNlbnQgaXRzIHR5cGUgb2YgYXBwbGllci5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgdHlwZSA9ICdib25lJztcblxuICAvKipcbiAgICogSXRzIGFzc29jaWF0ZWQge0BsaW5rIFZSTUh1bWFub2lkfS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBodW1hbm9pZDogVlJNSHVtYW5vaWQ7XG5cbiAgLyoqXG4gICAqIEEge0BsaW5rIFZSTUxvb2tBdFJhbmdlTWFwfSBmb3IgaG9yaXpvbnRhbCBpbndhcmQgbW92ZW1lbnQuIFRoZSBsZWZ0IGV5ZSBtb3ZlcyByaWdodC4gVGhlIHJpZ2h0IGV5ZSBtb3ZlcyBsZWZ0LlxuICAgKi9cbiAgcHVibGljIHJhbmdlTWFwSG9yaXpvbnRhbElubmVyOiBWUk1Mb29rQXRSYW5nZU1hcDtcblxuICAvKipcbiAgICogQSB7QGxpbmsgVlJNTG9va0F0UmFuZ2VNYXB9IGZvciBob3Jpem9udGFsIG91dHdhcmQgbW92ZW1lbnQuIFRoZSBsZWZ0IGV5ZSBtb3ZlcyBsZWZ0LiBUaGUgcmlnaHQgZXllIG1vdmVzIHJpZ2h0LlxuICAgKi9cbiAgcHVibGljIHJhbmdlTWFwSG9yaXpvbnRhbE91dGVyOiBWUk1Mb29rQXRSYW5nZU1hcDtcblxuICAvKipcbiAgICogQSB7QGxpbmsgVlJNTG9va0F0UmFuZ2VNYXB9IGZvciB2ZXJ0aWNhbCBkb3dud2FyZCBtb3ZlbWVudC4gQm90aCBleWVzIG1vdmUgdXB3YXJkcy5cbiAgICovXG4gIHB1YmxpYyByYW5nZU1hcFZlcnRpY2FsRG93bjogVlJNTG9va0F0UmFuZ2VNYXA7XG5cbiAgLyoqXG4gICAqIEEge0BsaW5rIFZSTUxvb2tBdFJhbmdlTWFwfSBmb3IgdmVydGljYWwgdXB3YXJkIG1vdmVtZW50LiBCb3RoIGV5ZXMgbW92ZSBkb3dud2FyZHMuXG4gICAqL1xuICBwdWJsaWMgcmFuZ2VNYXBWZXJ0aWNhbFVwOiBWUk1Mb29rQXRSYW5nZU1hcDtcblxuICAvKipcbiAgICogVGhlIGZyb250IGRpcmVjdGlvbiBvZiB0aGUgZmFjZS5cbiAgICogSW50ZW5kZWQgdG8gYmUgdXNlZCBmb3IgVlJNIDAuMCBjb21wYXQgKFZSTSAwLjAgbW9kZWxzIGFyZSBmYWNpbmcgWi0gaW5zdGVhZCBvZiBaKykuXG4gICAqIFlvdSB1c3VhbGx5IGRvbid0IHdhbnQgdG8gdG91Y2ggdGhpcy5cbiAgICovXG4gIHB1YmxpYyBmYWNlRnJvbnQ6IFRIUkVFLlZlY3RvcjM7XG5cbiAgLyoqXG4gICAqIFRoZSByZXN0IHF1YXRlcm5pb24gb2YgTGVmdEV5ZSBib25lLlxuICAgKi9cbiAgcHJpdmF0ZSBfcmVzdFF1YXRMZWZ0RXllOiBUSFJFRS5RdWF0ZXJuaW9uO1xuXG4gIC8qKlxuICAgKiBUaGUgcmVzdCBxdWF0ZXJuaW9uIG9mIFJpZ2h0RXllIGJvbmUuXG4gICAqL1xuICBwcml2YXRlIF9yZXN0UXVhdFJpZ2h0RXllOiBUSFJFRS5RdWF0ZXJuaW9uO1xuXG4gIC8qKlxuICAgKiBUaGUgd29ybGQtc3BhY2UgcmVzdCBxdWF0ZXJuaW9uIG9mIHRoZSBwYXJlbnQgb2YgdGhlIGh1bWFub2lkIExlZnRFeWUuXG4gICAqL1xuICBwcml2YXRlIF9yZXN0TGVmdEV5ZVBhcmVudFdvcmxkUXVhdDogVEhSRUUuUXVhdGVybmlvbjtcblxuICAvKipcbiAgICogVGhlIHdvcmxkLXNwYWNlIHJlc3QgcXVhdGVybmlvbiBvZiB0aGUgcGFyZW50IG9mIHRoZSBodW1hbm9pZCBSaWdodEV5ZS5cbiAgICovXG4gIHByaXZhdGUgX3Jlc3RSaWdodEV5ZVBhcmVudFdvcmxkUXVhdDogVEhSRUUuUXVhdGVybmlvbjtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IHtAbGluayBWUk1Mb29rQXRCb25lQXBwbGllcn0uXG4gICAqXG4gICAqIEBwYXJhbSBodW1hbm9pZCBBIHtAbGluayBWUk1IdW1hbm9pZH1cbiAgICogQHBhcmFtIHJhbmdlTWFwSG9yaXpvbnRhbElubmVyIEEge0BsaW5rIFZSTUxvb2tBdFJhbmdlTWFwfSB1c2VkIGZvciBpbm5lciB0cmFuc3ZlcnNlIGRpcmVjdGlvblxuICAgKiBAcGFyYW0gcmFuZ2VNYXBIb3Jpem9udGFsT3V0ZXIgQSB7QGxpbmsgVlJNTG9va0F0UmFuZ2VNYXB9IHVzZWQgZm9yIG91dGVyIHRyYW5zdmVyc2UgZGlyZWN0aW9uXG4gICAqIEBwYXJhbSByYW5nZU1hcFZlcnRpY2FsRG93biBBIHtAbGluayBWUk1Mb29rQXRSYW5nZU1hcH0gdXNlZCBmb3IgZG93biBkaXJlY3Rpb25cbiAgICogQHBhcmFtIHJhbmdlTWFwVmVydGljYWxVcCBBIHtAbGluayBWUk1Mb29rQXRSYW5nZU1hcH0gdXNlZCBmb3IgdXAgZGlyZWN0aW9uXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgaHVtYW5vaWQ6IFZSTUh1bWFub2lkLFxuICAgIHJhbmdlTWFwSG9yaXpvbnRhbElubmVyOiBWUk1Mb29rQXRSYW5nZU1hcCxcbiAgICByYW5nZU1hcEhvcml6b250YWxPdXRlcjogVlJNTG9va0F0UmFuZ2VNYXAsXG4gICAgcmFuZ2VNYXBWZXJ0aWNhbERvd246IFZSTUxvb2tBdFJhbmdlTWFwLFxuICAgIHJhbmdlTWFwVmVydGljYWxVcDogVlJNTG9va0F0UmFuZ2VNYXAsXG4gICkge1xuICAgIHRoaXMuaHVtYW5vaWQgPSBodW1hbm9pZDtcblxuICAgIHRoaXMucmFuZ2VNYXBIb3Jpem9udGFsSW5uZXIgPSByYW5nZU1hcEhvcml6b250YWxJbm5lcjtcbiAgICB0aGlzLnJhbmdlTWFwSG9yaXpvbnRhbE91dGVyID0gcmFuZ2VNYXBIb3Jpem9udGFsT3V0ZXI7XG4gICAgdGhpcy5yYW5nZU1hcFZlcnRpY2FsRG93biA9IHJhbmdlTWFwVmVydGljYWxEb3duO1xuICAgIHRoaXMucmFuZ2VNYXBWZXJ0aWNhbFVwID0gcmFuZ2VNYXBWZXJ0aWNhbFVwO1xuXG4gICAgdGhpcy5mYWNlRnJvbnQgPSBuZXcgVEhSRUUuVmVjdG9yMygwLjAsIDAuMCwgMS4wKTtcblxuICAgIC8vIHNldCByZXN0IHF1YXRlcm5pb25zXG4gICAgdGhpcy5fcmVzdFF1YXRMZWZ0RXllID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbiAgICB0aGlzLl9yZXN0UXVhdFJpZ2h0RXllID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbiAgICB0aGlzLl9yZXN0TGVmdEV5ZVBhcmVudFdvcmxkUXVhdCA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG4gICAgdGhpcy5fcmVzdFJpZ2h0RXllUGFyZW50V29ybGRRdWF0ID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblxuICAgIGNvbnN0IGxlZnRFeWUgPSB0aGlzLmh1bWFub2lkLmdldFJhd0JvbmVOb2RlKCdsZWZ0RXllJyk7XG4gICAgY29uc3QgcmlnaHRFeWUgPSB0aGlzLmh1bWFub2lkLmdldFJhd0JvbmVOb2RlKCdyaWdodEV5ZScpO1xuXG4gICAgaWYgKGxlZnRFeWUpIHtcbiAgICAgIHRoaXMuX3Jlc3RRdWF0TGVmdEV5ZS5jb3B5KGxlZnRFeWUucXVhdGVybmlvbik7XG4gICAgICBnZXRXb3JsZFF1YXRlcm5pb25MaXRlKGxlZnRFeWUucGFyZW50ISwgdGhpcy5fcmVzdExlZnRFeWVQYXJlbnRXb3JsZFF1YXQpO1xuICAgIH1cblxuICAgIGlmIChyaWdodEV5ZSkge1xuICAgICAgdGhpcy5fcmVzdFF1YXRSaWdodEV5ZS5jb3B5KHJpZ2h0RXllLnF1YXRlcm5pb24pO1xuICAgICAgZ2V0V29ybGRRdWF0ZXJuaW9uTGl0ZShyaWdodEV5ZS5wYXJlbnQhLCB0aGlzLl9yZXN0UmlnaHRFeWVQYXJlbnRXb3JsZFF1YXQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGUgaW5wdXQgYW5nbGUgdG8gaXRzIGFzc29jaWF0ZWQgVlJNIG1vZGVsLlxuICAgKlxuICAgKiBAcGFyYW0geWF3IFJvdGF0aW9uIGFyb3VuZCBZIGF4aXMsIGluIGRlZ3JlZVxuICAgKiBAcGFyYW0gcGl0Y2ggUm90YXRpb24gYXJvdW5kIFggYXhpcywgaW4gZGVncmVlXG4gICAqL1xuICBwdWJsaWMgYXBwbHlZYXdQaXRjaCh5YXc6IG51bWJlciwgcGl0Y2g6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IGxlZnRFeWUgPSB0aGlzLmh1bWFub2lkLmdldFJhd0JvbmVOb2RlKCdsZWZ0RXllJyk7XG4gICAgY29uc3QgcmlnaHRFeWUgPSB0aGlzLmh1bWFub2lkLmdldFJhd0JvbmVOb2RlKCdyaWdodEV5ZScpO1xuICAgIGNvbnN0IGxlZnRFeWVOb3JtYWxpemVkID0gdGhpcy5odW1hbm9pZC5nZXROb3JtYWxpemVkQm9uZU5vZGUoJ2xlZnRFeWUnKTtcbiAgICBjb25zdCByaWdodEV5ZU5vcm1hbGl6ZWQgPSB0aGlzLmh1bWFub2lkLmdldE5vcm1hbGl6ZWRCb25lTm9kZSgncmlnaHRFeWUnKTtcbiAgICAvLyBsZWZ0XG4gICAgaWYgKGxlZnRFeWUpIHtcbiAgICAgIGlmIChwaXRjaCA8IDAuMCkge1xuICAgICAgICBfZXVsZXJBLnggPSAtVEhSRUUuTWF0aFV0aWxzLkRFRzJSQUQgKiB0aGlzLnJhbmdlTWFwVmVydGljYWxEb3duLm1hcCgtcGl0Y2gpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX2V1bGVyQS54ID0gVEhSRUUuTWF0aFV0aWxzLkRFRzJSQUQgKiB0aGlzLnJhbmdlTWFwVmVydGljYWxVcC5tYXAocGl0Y2gpO1xuICAgICAgfVxuXG4gICAgICBpZiAoeWF3IDwgMC4wKSB7XG4gICAgICAgIF9ldWxlckEueSA9IC1USFJFRS5NYXRoVXRpbHMuREVHMlJBRCAqIHRoaXMucmFuZ2VNYXBIb3Jpem9udGFsSW5uZXIubWFwKC15YXcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX2V1bGVyQS55ID0gVEhSRUUuTWF0aFV0aWxzLkRFRzJSQUQgKiB0aGlzLnJhbmdlTWFwSG9yaXpvbnRhbE91dGVyLm1hcCh5YXcpO1xuICAgICAgfVxuXG4gICAgICBfcXVhdEEuc2V0RnJvbUV1bGVyKF9ldWxlckEpO1xuICAgICAgdGhpcy5fZ2V0V29ybGRGYWNlRnJvbnRRdWF0KF9xdWF0Qik7XG5cbiAgICAgIC8vIF9xdWF0QiAqIF9xdWF0QSAqIF9xdWF0Ql4tMVxuICAgICAgLy8gd2hlcmUgX3F1YXRBIGlzIExvb2tBdCByb3RhdGlvblxuICAgICAgLy8gYW5kIF9xdWF0QiBpcyB3b3JsZEZhY2VGcm9udFF1YXRcbiAgICAgIGxlZnRFeWVOb3JtYWxpemVkIS5xdWF0ZXJuaW9uLmNvcHkoX3F1YXRCKS5tdWx0aXBseShfcXVhdEEpLm11bHRpcGx5KF9xdWF0Qi5pbnZlcnQoKSk7XG5cbiAgICAgIF9xdWF0QS5jb3B5KHRoaXMuX3Jlc3RMZWZ0RXllUGFyZW50V29ybGRRdWF0KTtcblxuICAgICAgLy8gX3F1YXRBXi0xICogbGVmdEV5ZU5vcm1hbGl6ZWQucXVhdGVybmlvbiAqIF9xdWF0QSAqIHJlc3RRdWF0TGVmdEV5ZVxuICAgICAgLy8gd2hlcmUgX3F1YXRBIGlzIHJlc3RMZWZ0RXllUGFyZW50V29ybGRRdWF0XG4gICAgICBsZWZ0RXllLnF1YXRlcm5pb25cbiAgICAgICAgLmNvcHkobGVmdEV5ZU5vcm1hbGl6ZWQhLnF1YXRlcm5pb24pXG4gICAgICAgIC5tdWx0aXBseShfcXVhdEEpXG4gICAgICAgIC5wcmVtdWx0aXBseShfcXVhdEEuaW52ZXJ0KCkpXG4gICAgICAgIC5tdWx0aXBseSh0aGlzLl9yZXN0UXVhdExlZnRFeWUpO1xuICAgIH1cblxuICAgIC8vIHJpZ2h0XG4gICAgaWYgKHJpZ2h0RXllKSB7XG4gICAgICBpZiAocGl0Y2ggPCAwLjApIHtcbiAgICAgICAgX2V1bGVyQS54ID0gLVRIUkVFLk1hdGhVdGlscy5ERUcyUkFEICogdGhpcy5yYW5nZU1hcFZlcnRpY2FsRG93bi5tYXAoLXBpdGNoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF9ldWxlckEueCA9IFRIUkVFLk1hdGhVdGlscy5ERUcyUkFEICogdGhpcy5yYW5nZU1hcFZlcnRpY2FsVXAubWFwKHBpdGNoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHlhdyA8IDAuMCkge1xuICAgICAgICBfZXVsZXJBLnkgPSAtVEhSRUUuTWF0aFV0aWxzLkRFRzJSQUQgKiB0aGlzLnJhbmdlTWFwSG9yaXpvbnRhbE91dGVyLm1hcCgteWF3KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF9ldWxlckEueSA9IFRIUkVFLk1hdGhVdGlscy5ERUcyUkFEICogdGhpcy5yYW5nZU1hcEhvcml6b250YWxJbm5lci5tYXAoeWF3KTtcbiAgICAgIH1cblxuICAgICAgX3F1YXRBLnNldEZyb21FdWxlcihfZXVsZXJBKTtcbiAgICAgIHRoaXMuX2dldFdvcmxkRmFjZUZyb250UXVhdChfcXVhdEIpO1xuXG4gICAgICAvLyBfcXVhdEIgKiBfcXVhdEEgKiBfcXVhdEJeLTFcbiAgICAgIC8vIHdoZXJlIF9xdWF0QSBpcyBMb29rQXQgcm90YXRpb25cbiAgICAgIC8vIGFuZCBfcXVhdEIgaXMgd29ybGRGYWNlRnJvbnRRdWF0XG4gICAgICByaWdodEV5ZU5vcm1hbGl6ZWQhLnF1YXRlcm5pb24uY29weShfcXVhdEIpLm11bHRpcGx5KF9xdWF0QSkubXVsdGlwbHkoX3F1YXRCLmludmVydCgpKTtcblxuICAgICAgX3F1YXRBLmNvcHkodGhpcy5fcmVzdFJpZ2h0RXllUGFyZW50V29ybGRRdWF0KTtcblxuICAgICAgLy8gX3F1YXRBXi0xICogcmlnaHRFeWVOb3JtYWxpemVkLnF1YXRlcm5pb24gKiBfcXVhdEEgKiByZXN0UXVhdFJpZ2h0RXllXG4gICAgICAvLyB3aGVyZSBfcXVhdEEgaXMgcmVzdFJpZ2h0RXllUGFyZW50V29ybGRRdWF0XG4gICAgICByaWdodEV5ZS5xdWF0ZXJuaW9uXG4gICAgICAgIC5jb3B5KHJpZ2h0RXllTm9ybWFsaXplZCEucXVhdGVybmlvbilcbiAgICAgICAgLm11bHRpcGx5KF9xdWF0QSlcbiAgICAgICAgLnByZW11bHRpcGx5KF9xdWF0QS5pbnZlcnQoKSlcbiAgICAgICAgLm11bHRpcGx5KHRoaXMuX3Jlc3RRdWF0UmlnaHRFeWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBVc2Uge0BsaW5rIGFwcGx5WWF3UGl0Y2h9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgbG9va0F0KGV1bGVyOiBUSFJFRS5FdWxlcik6IHZvaWQge1xuICAgIGNvbnNvbGUud2FybignVlJNTG9va0F0Qm9uZUFwcGxpZXI6IGxvb2tBdCgpIGlzIGRlcHJlY2F0ZWQuIHVzZSBhcHBseSgpIGluc3RlYWQuJyk7XG5cbiAgICBjb25zdCB5YXcgPSBUSFJFRS5NYXRoVXRpbHMuUkFEMkRFRyAqIGV1bGVyLnk7XG4gICAgY29uc3QgcGl0Y2ggPSBUSFJFRS5NYXRoVXRpbHMuUkFEMkRFRyAqIGV1bGVyLng7XG5cbiAgICB0aGlzLmFwcGx5WWF3UGl0Y2goeWF3LCBwaXRjaCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgcXVhdGVybmlvbiB0aGF0IHJvdGF0ZXMgdGhlIHdvcmxkLXNwYWNlICtaIHVuaXQgdmVjdG9yIHRvIHRoZSB7QGxpbmsgZmFjZUZyb250fSBkaXJlY3Rpb24uXG4gICAqXG4gICAqIEBwYXJhbSB0YXJnZXQgQSB0YXJnZXQgYFRIUkVFLlF1YXRlcm5pb25gXG4gICAqL1xuICBwcml2YXRlIF9nZXRXb3JsZEZhY2VGcm9udFF1YXQodGFyZ2V0OiBUSFJFRS5RdWF0ZXJuaW9uKTogVEhSRUUuUXVhdGVybmlvbiB7XG4gICAgaWYgKHRoaXMuZmFjZUZyb250LmRpc3RhbmNlVG9TcXVhcmVkKFZFQzNfUE9TSVRJVkVfWikgPCAwLjAxKSB7XG4gICAgICByZXR1cm4gdGFyZ2V0LmlkZW50aXR5KCk7XG4gICAgfVxuXG4gICAgY29uc3QgW2ZhY2VGcm9udEF6aW11dGgsIGZhY2VGcm9udEFsdGl0dWRlXSA9IGNhbGNBemltdXRoQWx0aXR1ZGUodGhpcy5mYWNlRnJvbnQpO1xuICAgIF9ldWxlckEuc2V0KDAuMCwgMC41ICogTWF0aC5QSSArIGZhY2VGcm9udEF6aW11dGgsIGZhY2VGcm9udEFsdGl0dWRlLCAnWVpYJyk7XG5cbiAgICByZXR1cm4gdGFyZ2V0LnNldEZyb21FdWxlcihfZXVsZXJBKTtcbiAgfVxufVxuIiwgImltcG9ydCB7IFZSTUV4cHJlc3Npb25NYW5hZ2VyIH0gZnJvbSAnLi4vZXhwcmVzc2lvbnMnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHR5cGUgeyBWUk1Mb29rQXRBcHBsaWVyIH0gZnJvbSAnLi9WUk1Mb29rQXRBcHBsaWVyJztcbmltcG9ydCB7IFZSTUxvb2tBdFJhbmdlTWFwIH0gZnJvbSAnLi9WUk1Mb29rQXRSYW5nZU1hcCc7XG5cbi8qKlxuICogQSBjbGFzcyB0aGF0IGFwcGxpZXMgZXllIGdhemUgZGlyZWN0aW9ucyB0byBhIFZSTS5cbiAqIEl0IHdpbGwgYmUgdXNlZCBieSB7QGxpbmsgVlJNTG9va0F0fS5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUxvb2tBdEV4cHJlc3Npb25BcHBsaWVyIGltcGxlbWVudHMgVlJNTG9va0F0QXBwbGllciB7XG4gIC8qKlxuICAgKiBSZXByZXNlbnQgaXRzIHR5cGUgb2YgYXBwbGllci5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgdHlwZSA9ICdleHByZXNzaW9uJztcblxuICAvKipcbiAgICogSXRzIGFzc29jaWF0ZWQge0BsaW5rIFZSTUV4cHJlc3Npb25NYW5hZ2VyfS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBleHByZXNzaW9uczogVlJNRXhwcmVzc2lvbk1hbmFnZXI7XG5cbiAgLyoqXG4gICAqIEl0IHdvbid0IGJlIHVzZWQgaW4gZXhwcmVzc2lvbiBhcHBsaWVyLlxuICAgKiBTZWUgYWxzbzoge0BsaW5rIHJhbmdlTWFwSG9yaXpvbnRhbE91dGVyfVxuICAgKi9cbiAgcHVibGljIHJhbmdlTWFwSG9yaXpvbnRhbElubmVyOiBWUk1Mb29rQXRSYW5nZU1hcDtcblxuICAvKipcbiAgICogQSB7QGxpbmsgVlJNTG9va0F0UmFuZ2VNYXB9IGZvciBob3Jpem9udGFsIG1vdmVtZW50LiBCb3RoIGV5ZXMgbW92ZSBsZWZ0IG9yIHJpZ2h0LlxuICAgKi9cbiAgcHVibGljIHJhbmdlTWFwSG9yaXpvbnRhbE91dGVyOiBWUk1Mb29rQXRSYW5nZU1hcDtcblxuICAvKipcbiAgICogQSB7QGxpbmsgVlJNTG9va0F0UmFuZ2VNYXB9IGZvciB2ZXJ0aWNhbCBkb3dud2FyZCBtb3ZlbWVudC4gQm90aCBleWVzIG1vdmUgdXB3YXJkcy5cbiAgICovXG4gIHB1YmxpYyByYW5nZU1hcFZlcnRpY2FsRG93bjogVlJNTG9va0F0UmFuZ2VNYXA7XG5cbiAgLyoqXG4gICAqIEEge0BsaW5rIFZSTUxvb2tBdFJhbmdlTWFwfSBmb3IgdmVydGljYWwgdXB3YXJkIG1vdmVtZW50LiBCb3RoIGV5ZXMgbW92ZSBkb3dud2FyZHMuXG4gICAqL1xuICBwdWJsaWMgcmFuZ2VNYXBWZXJ0aWNhbFVwOiBWUk1Mb29rQXRSYW5nZU1hcDtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IHtAbGluayBWUk1Mb29rQXRFeHByZXNzaW9uQXBwbGllcn0uXG4gICAqXG4gICAqIEBwYXJhbSBleHByZXNzaW9ucyBBIHtAbGluayBWUk1FeHByZXNzaW9uTWFuYWdlcn1cbiAgICogQHBhcmFtIHJhbmdlTWFwSG9yaXpvbnRhbElubmVyIEEge0BsaW5rIFZSTUxvb2tBdFJhbmdlTWFwfSB1c2VkIGZvciBpbm5lciB0cmFuc3ZlcnNlIGRpcmVjdGlvblxuICAgKiBAcGFyYW0gcmFuZ2VNYXBIb3Jpem9udGFsT3V0ZXIgQSB7QGxpbmsgVlJNTG9va0F0UmFuZ2VNYXB9IHVzZWQgZm9yIG91dGVyIHRyYW5zdmVyc2UgZGlyZWN0aW9uXG4gICAqIEBwYXJhbSByYW5nZU1hcFZlcnRpY2FsRG93biBBIHtAbGluayBWUk1Mb29rQXRSYW5nZU1hcH0gdXNlZCBmb3IgZG93biBkaXJlY3Rpb25cbiAgICogQHBhcmFtIHJhbmdlTWFwVmVydGljYWxVcCBBIHtAbGluayBWUk1Mb29rQXRSYW5nZU1hcH0gdXNlZCBmb3IgdXAgZGlyZWN0aW9uXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgZXhwcmVzc2lvbnM6IFZSTUV4cHJlc3Npb25NYW5hZ2VyLFxuICAgIHJhbmdlTWFwSG9yaXpvbnRhbElubmVyOiBWUk1Mb29rQXRSYW5nZU1hcCxcbiAgICByYW5nZU1hcEhvcml6b250YWxPdXRlcjogVlJNTG9va0F0UmFuZ2VNYXAsXG4gICAgcmFuZ2VNYXBWZXJ0aWNhbERvd246IFZSTUxvb2tBdFJhbmdlTWFwLFxuICAgIHJhbmdlTWFwVmVydGljYWxVcDogVlJNTG9va0F0UmFuZ2VNYXAsXG4gICkge1xuICAgIHRoaXMuZXhwcmVzc2lvbnMgPSBleHByZXNzaW9ucztcblxuICAgIHRoaXMucmFuZ2VNYXBIb3Jpem9udGFsSW5uZXIgPSByYW5nZU1hcEhvcml6b250YWxJbm5lcjtcbiAgICB0aGlzLnJhbmdlTWFwSG9yaXpvbnRhbE91dGVyID0gcmFuZ2VNYXBIb3Jpem9udGFsT3V0ZXI7XG4gICAgdGhpcy5yYW5nZU1hcFZlcnRpY2FsRG93biA9IHJhbmdlTWFwVmVydGljYWxEb3duO1xuICAgIHRoaXMucmFuZ2VNYXBWZXJ0aWNhbFVwID0gcmFuZ2VNYXBWZXJ0aWNhbFVwO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoZSBpbnB1dCBhbmdsZSB0byBpdHMgYXNzb2NpYXRlZCBWUk0gbW9kZWwuXG4gICAqXG4gICAqIEBwYXJhbSB5YXcgUm90YXRpb24gYXJvdW5kIFkgYXhpcywgaW4gZGVncmVlXG4gICAqIEBwYXJhbSBwaXRjaCBSb3RhdGlvbiBhcm91bmQgWCBheGlzLCBpbiBkZWdyZWVcbiAgICovXG4gIHB1YmxpYyBhcHBseVlhd1BpdGNoKHlhdzogbnVtYmVyLCBwaXRjaDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHBpdGNoIDwgMC4wKSB7XG4gICAgICB0aGlzLmV4cHJlc3Npb25zLnNldFZhbHVlKCdsb29rRG93bicsIDAuMCk7XG4gICAgICB0aGlzLmV4cHJlc3Npb25zLnNldFZhbHVlKCdsb29rVXAnLCB0aGlzLnJhbmdlTWFwVmVydGljYWxVcC5tYXAoLXBpdGNoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZXhwcmVzc2lvbnMuc2V0VmFsdWUoJ2xvb2tVcCcsIDAuMCk7XG4gICAgICB0aGlzLmV4cHJlc3Npb25zLnNldFZhbHVlKCdsb29rRG93bicsIHRoaXMucmFuZ2VNYXBWZXJ0aWNhbERvd24ubWFwKHBpdGNoKSk7XG4gICAgfVxuXG4gICAgaWYgKHlhdyA8IDAuMCkge1xuICAgICAgdGhpcy5leHByZXNzaW9ucy5zZXRWYWx1ZSgnbG9va0xlZnQnLCAwLjApO1xuICAgICAgdGhpcy5leHByZXNzaW9ucy5zZXRWYWx1ZSgnbG9va1JpZ2h0JywgdGhpcy5yYW5nZU1hcEhvcml6b250YWxPdXRlci5tYXAoLXlhdykpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmV4cHJlc3Npb25zLnNldFZhbHVlKCdsb29rUmlnaHQnLCAwLjApO1xuICAgICAgdGhpcy5leHByZXNzaW9ucy5zZXRWYWx1ZSgnbG9va0xlZnQnLCB0aGlzLnJhbmdlTWFwSG9yaXpvbnRhbE91dGVyLm1hcCh5YXcpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVXNlIHtAbGluayBhcHBseVlhd1BpdGNofSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIGxvb2tBdChldWxlcjogVEhSRUUuRXVsZXIpOiB2b2lkIHtcbiAgICBjb25zb2xlLndhcm4oJ1ZSTUxvb2tBdEJvbmVBcHBsaWVyOiBsb29rQXQoKSBpcyBkZXByZWNhdGVkLiB1c2UgYXBwbHkoKSBpbnN0ZWFkLicpO1xuXG4gICAgY29uc3QgeWF3ID0gVEhSRUUuTWF0aFV0aWxzLlJBRDJERUcgKiBldWxlci55O1xuICAgIGNvbnN0IHBpdGNoID0gVEhSRUUuTWF0aFV0aWxzLlJBRDJERUcgKiBldWxlci54O1xuXG4gICAgdGhpcy5hcHBseVlhd1BpdGNoKHlhdywgcGl0Y2gpO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgc2F0dXJhdGUgfSBmcm9tICcuLi91dGlscy9zYXR1cmF0ZSc7XG5cbmV4cG9ydCBjbGFzcyBWUk1Mb29rQXRSYW5nZU1hcCB7XG4gIC8qKlxuICAgKiBMaW1pdHMgdGhlIG1heGltdW0gYW5nbGUgb2YgdGhlIGlucHV0IGFuZ2xlIG9mIHRoZSBMb29rQXQgdmVjdG9yIGZyb20gdGhlIGZyb250IG9mIHRoZSBoZWFkICh0aGUgcG9zaXRpdmUgeiBheGlzKS5cbiAgICovXG4gIHB1YmxpYyBpbnB1dE1heFZhbHVlOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFJlcHJlc2VudHMgYW4gYW5nbGUgKGluIGRlZ3JlZXMpIGZvciBib25lIHR5cGUgb2YgTG9va0F0IGFwcGxpZXJzLCBvciBhIHdlaWdodCBmb3IgZXhwcmVzc2lvbiB0eXBlIG9mIExvb2tBdCBhcHBsaWVycy5cbiAgICogVGhlIGlucHV0IHZhbHVlIHdpbGwgdGFrZSBgMS4wYCB3aGVuIHRoZSBpbnB1dCBhbmdsZSBlcXVhbHMgKG9yIGdyZWF0ZXIpIHRvIHtAbGluayBpbnB1dE1heFZhbHVlfS5cbiAgICovXG4gIHB1YmxpYyBvdXRwdXRTY2FsZTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcge0BsaW5rIFZSTUxvb2tBdFJhbmdlTWFwfS5cbiAgICpcbiAgICogQHBhcmFtIGlucHV0TWF4VmFsdWUgVGhlIHtAbGluayBpbnB1dE1heFZhbHVlfSBvZiB0aGUgbWFwXG4gICAqIEBwYXJhbSBvdXRwdXRTY2FsZSBUaGUge0BsaW5rIG91dHB1dFNjYWxlfSBvZiB0aGUgbWFwXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoaW5wdXRNYXhWYWx1ZTogbnVtYmVyLCBvdXRwdXRTY2FsZTogbnVtYmVyKSB7XG4gICAgdGhpcy5pbnB1dE1heFZhbHVlID0gaW5wdXRNYXhWYWx1ZTtcbiAgICB0aGlzLm91dHB1dFNjYWxlID0gb3V0cHV0U2NhbGU7XG4gIH1cblxuICAvKipcbiAgICogRXZhbHVhdGUgYW4gaW5wdXQgdmFsdWUgYW5kIG91dHB1dCBhIG1hcHBlZCB2YWx1ZS5cbiAgICogQHBhcmFtIHNyYyBUaGUgaW5wdXQgdmFsdWVcbiAgICovXG4gIHB1YmxpYyBtYXAoc3JjOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLm91dHB1dFNjYWxlICogc2F0dXJhdGUoc3JjIC8gdGhpcy5pbnB1dE1heFZhbHVlKTtcbiAgfVxufVxuIiwgImltcG9ydCB0eXBlICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHR5cGUgKiBhcyBWMFZSTSBmcm9tICdAcGl4aXYvdHlwZXMtdnJtLTAuMCc7XG5pbXBvcnQgdHlwZSAqIGFzIFYxVlJNU2NoZW1hIGZyb20gJ0BwaXhpdi90eXBlcy12cm1jLXZybS0xLjAnO1xuaW1wb3J0IHR5cGUgeyBHTFRGLCBHTFRGTG9hZGVyUGx1Z2luLCBHTFRGUGFyc2VyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlci5qcyc7XG5pbXBvcnQgdHlwZSB7IFZSTUV4cHJlc3Npb25NYW5hZ2VyIH0gZnJvbSAnLi4vZXhwcmVzc2lvbnMvVlJNRXhwcmVzc2lvbk1hbmFnZXInO1xuaW1wb3J0IHR5cGUgeyBWUk1IdW1hbm9pZCB9IGZyb20gJy4uL2h1bWFub2lkL1ZSTUh1bWFub2lkJztcbmltcG9ydCB7IFZSTUxvb2tBdEhlbHBlciB9IGZyb20gJy4vaGVscGVycy9WUk1Mb29rQXRIZWxwZXInO1xuaW1wb3J0IHsgVlJNTG9va0F0IH0gZnJvbSAnLi9WUk1Mb29rQXQnO1xuaW1wb3J0IHR5cGUgeyBWUk1Mb29rQXRBcHBsaWVyIH0gZnJvbSAnLi9WUk1Mb29rQXRBcHBsaWVyJztcbmltcG9ydCB7IFZSTUxvb2tBdEJvbmVBcHBsaWVyIH0gZnJvbSAnLi9WUk1Mb29rQXRCb25lQXBwbGllcic7XG5pbXBvcnQgeyBWUk1Mb29rQXRFeHByZXNzaW9uQXBwbGllciB9IGZyb20gJy4vVlJNTG9va0F0RXhwcmVzc2lvbkFwcGxpZXInO1xuaW1wb3J0IHR5cGUgeyBWUk1Mb29rQXRMb2FkZXJQbHVnaW5PcHRpb25zIH0gZnJvbSAnLi9WUk1Mb29rQXRMb2FkZXJQbHVnaW5PcHRpb25zJztcbmltcG9ydCB7IFZSTUxvb2tBdFJhbmdlTWFwIH0gZnJvbSAnLi9WUk1Mb29rQXRSYW5nZU1hcCc7XG5pbXBvcnQgeyBHTFRGIGFzIEdMVEZTY2hlbWEgfSBmcm9tICdAZ2x0Zi10cmFuc2Zvcm0vY29yZSc7XG5cbi8qKlxuICogUG9zc2libGUgc3BlYyB2ZXJzaW9ucyBpdCByZWNvZ25pemVzLlxuICovXG5jb25zdCBQT1NTSUJMRV9TUEVDX1ZFUlNJT05TID0gbmV3IFNldChbJzEuMCcsICcxLjAtYmV0YSddKTtcblxuLyoqXG4gKiBUaGUgbWluaW11bSBwZXJtaXR0ZWQgdmFsdWUgZm9yIHtAbGluayBWMVZSTVNjaGVtYS5Mb29rQXRSYW5nZU1hcC5pbnB1dE1heFZhbHVlfS5cbiAqIElmIHRoZSBnaXZlbiB2YWx1ZSBpcyBzbWFsbGVyIHRoYW4gdGhpcywgdGhlIGxvYWRlciBzaG93cyBhIHdhcm5pbmcgYW5kIGNsYW1wcyB1cCB0aGUgdmFsdWUuXG4gKi9cbmNvbnN0IElOUFVUX01BWF9WQUxVRV9NSU5JTVVNID0gMC4wMTtcblxuLyoqXG4gKiBBIHBsdWdpbiBvZiBHTFRGTG9hZGVyIHRoYXQgaW1wb3J0cyBhIHtAbGluayBWUk1Mb29rQXR9IGZyb20gYSBWUk0gZXh0ZW5zaW9uIG9mIGEgR0xURi5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUxvb2tBdExvYWRlclBsdWdpbiBpbXBsZW1lbnRzIEdMVEZMb2FkZXJQbHVnaW4ge1xuICAvKipcbiAgICogU3BlY2lmeSBhbiBPYmplY3QzRCB0byBhZGQge0BsaW5rIFZSTUxvb2tBdEhlbHBlcn0gcy5cbiAgICogSWYgbm90IHNwZWNpZmllZCwgaGVscGVyIHdpbGwgbm90IGJlIGNyZWF0ZWQuXG4gICAqIElmIGByZW5kZXJPcmRlcmAgaXMgc2V0IHRvIHRoZSByb290LCBoZWxwZXJzIHdpbGwgY29weSB0aGUgc2FtZSBgcmVuZGVyT3JkZXJgIC5cbiAgICovXG4gIHB1YmxpYyBoZWxwZXJSb290PzogVEhSRUUuT2JqZWN0M0Q7XG5cbiAgcHVibGljIHJlYWRvbmx5IHBhcnNlcjogR0xURlBhcnNlcjtcblxuICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICAvLyBXZSBzaG91bGQgdXNlIHRoZSBleHRlbnNpb24gbmFtZSBpbnN0ZWFkIGJ1dCB3ZSBoYXZlIG11bHRpcGxlIHBsdWdpbnMgZm9yIGFuIGV4dGVuc2lvbi4uLlxuICAgIHJldHVybiAnVlJNTG9va0F0TG9hZGVyUGx1Z2luJztcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJzZXI6IEdMVEZQYXJzZXIsIG9wdGlvbnM/OiBWUk1Mb29rQXRMb2FkZXJQbHVnaW5PcHRpb25zKSB7XG4gICAgdGhpcy5wYXJzZXIgPSBwYXJzZXI7XG5cbiAgICB0aGlzLmhlbHBlclJvb3QgPSBvcHRpb25zPy5oZWxwZXJSb290O1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGFmdGVyUm9vdChnbHRmOiBHTFRGKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgdnJtSHVtYW5vaWQgPSBnbHRmLnVzZXJEYXRhLnZybUh1bWFub2lkIGFzIFZSTUh1bWFub2lkIHwgdW5kZWZpbmVkO1xuXG4gICAgLy8gZXhwbGljaXRseSBkaXN0aW5ndWlzaCBudWxsIGFuZCB1bmRlZmluZWRcbiAgICAvLyBzaW5jZSB2cm1IdW1hbm9pZCBtaWdodCBiZSBudWxsIGFzIGEgcmVzdWx0XG4gICAgaWYgKHZybUh1bWFub2lkID09PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIGlmICh2cm1IdW1hbm9pZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZSTUxvb2tBdExvYWRlclBsdWdpbjogdnJtSHVtYW5vaWQgaXMgdW5kZWZpbmVkLiBWUk1IdW1hbm9pZExvYWRlclBsdWdpbiBoYXZlIHRvIGJlIHVzZWQgZmlyc3QnKTtcbiAgICB9XG5cbiAgICBjb25zdCB2cm1FeHByZXNzaW9uTWFuYWdlciA9IGdsdGYudXNlckRhdGEudnJtRXhwcmVzc2lvbk1hbmFnZXIgYXMgVlJNRXhwcmVzc2lvbk1hbmFnZXIgfCB1bmRlZmluZWQ7XG5cbiAgICBpZiAodnJtRXhwcmVzc2lvbk1hbmFnZXIgPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKHZybUV4cHJlc3Npb25NYW5hZ2VyID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1ZSTUxvb2tBdExvYWRlclBsdWdpbjogdnJtRXhwcmVzc2lvbk1hbmFnZXIgaXMgdW5kZWZpbmVkLiBWUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luIGhhdmUgdG8gYmUgdXNlZCBmaXJzdCcsXG4gICAgICApO1xuICAgIH1cblxuICAgIGdsdGYudXNlckRhdGEudnJtTG9va0F0ID0gYXdhaXQgdGhpcy5faW1wb3J0KGdsdGYsIHZybUh1bWFub2lkLCB2cm1FeHByZXNzaW9uTWFuYWdlcik7XG4gIH1cblxuICAvKipcbiAgICogSW1wb3J0IGEge0BsaW5rIFZSTUxvb2tBdH0gZnJvbSBhIFZSTS5cbiAgICpcbiAgICogQHBhcmFtIGdsdGYgQSBwYXJzZWQgcmVzdWx0IG9mIEdMVEYgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gICAqIEBwYXJhbSBodW1hbm9pZCBBIHtAbGluayBWUk1IdW1hbm9pZH0gaW5zdGFuY2UgdGhhdCByZXByZXNlbnRzIHRoZSBWUk1cbiAgICogQHBhcmFtIGV4cHJlc3Npb25zIEEge0BsaW5rIFZSTUV4cHJlc3Npb25NYW5hZ2VyfSBpbnN0YW5jZSB0aGF0IHJlcHJlc2VudHMgdGhlIFZSTVxuICAgKi9cbiAgcHJpdmF0ZSBhc3luYyBfaW1wb3J0KFxuICAgIGdsdGY6IEdMVEYsXG4gICAgaHVtYW5vaWQ6IFZSTUh1bWFub2lkIHwgbnVsbCxcbiAgICBleHByZXNzaW9uczogVlJNRXhwcmVzc2lvbk1hbmFnZXIgfCBudWxsLFxuICApOiBQcm9taXNlPFZSTUxvb2tBdCB8IG51bGw+IHtcbiAgICBpZiAoaHVtYW5vaWQgPT0gbnVsbCB8fCBleHByZXNzaW9ucyA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCB2MVJlc3VsdCA9IGF3YWl0IHRoaXMuX3YxSW1wb3J0KGdsdGYsIGh1bWFub2lkLCBleHByZXNzaW9ucyk7XG4gICAgaWYgKHYxUmVzdWx0KSB7XG4gICAgICByZXR1cm4gdjFSZXN1bHQ7XG4gICAgfVxuXG4gICAgY29uc3QgdjBSZXN1bHQgPSBhd2FpdCB0aGlzLl92MEltcG9ydChnbHRmLCBodW1hbm9pZCwgZXhwcmVzc2lvbnMpO1xuICAgIGlmICh2MFJlc3VsdCkge1xuICAgICAgcmV0dXJuIHYwUmVzdWx0O1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfdjFJbXBvcnQoXG4gICAgZ2x0ZjogR0xURixcbiAgICBodW1hbm9pZDogVlJNSHVtYW5vaWQsXG4gICAgZXhwcmVzc2lvbnM6IFZSTUV4cHJlc3Npb25NYW5hZ2VyLFxuICApOiBQcm9taXNlPFZSTUxvb2tBdCB8IG51bGw+IHtcbiAgICBjb25zdCBqc29uID0gdGhpcy5wYXJzZXIuanNvbiBhcyBHTFRGU2NoZW1hLklHTFRGO1xuXG4gICAgLy8gZWFybHkgYWJvcnQgaWYgaXQgZG9lc24ndCB1c2UgdnJtXG4gICAgY29uc3QgaXNWUk1Vc2VkID0ganNvbi5leHRlbnNpb25zVXNlZD8uaW5kZXhPZignVlJNQ192cm0nKSAhPT0gLTE7XG4gICAgaWYgKCFpc1ZSTVVzZWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGV4dGVuc2lvbiA9IGpzb24uZXh0ZW5zaW9ucz8uWydWUk1DX3ZybSddIGFzIFYxVlJNU2NoZW1hLlZSTUNWUk0gfCB1bmRlZmluZWQ7XG4gICAgaWYgKCFleHRlbnNpb24pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNwZWNWZXJzaW9uID0gZXh0ZW5zaW9uLnNwZWNWZXJzaW9uO1xuICAgIGlmICghUE9TU0lCTEVfU1BFQ19WRVJTSU9OUy5oYXMoc3BlY1ZlcnNpb24pKSB7XG4gICAgICBjb25zb2xlLndhcm4oYFZSTUxvb2tBdExvYWRlclBsdWdpbjogVW5rbm93biBWUk1DX3ZybSBzcGVjVmVyc2lvbiBcIiR7c3BlY1ZlcnNpb259XCJgKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNjaGVtYUxvb2tBdCA9IGV4dGVuc2lvbi5sb29rQXQ7XG4gICAgaWYgKCFzY2hlbWFMb29rQXQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGRlZmF1bHRPdXRwdXRTY2FsZSA9IHNjaGVtYUxvb2tBdC50eXBlID09PSAnZXhwcmVzc2lvbicgPyAxLjAgOiAxMC4wO1xuXG4gICAgY29uc3QgbWFwSEkgPSB0aGlzLl92MUltcG9ydFJhbmdlTWFwKHNjaGVtYUxvb2tBdC5yYW5nZU1hcEhvcml6b250YWxJbm5lciwgZGVmYXVsdE91dHB1dFNjYWxlKTtcbiAgICBjb25zdCBtYXBITyA9IHRoaXMuX3YxSW1wb3J0UmFuZ2VNYXAoc2NoZW1hTG9va0F0LnJhbmdlTWFwSG9yaXpvbnRhbE91dGVyLCBkZWZhdWx0T3V0cHV0U2NhbGUpO1xuICAgIGNvbnN0IG1hcFZEID0gdGhpcy5fdjFJbXBvcnRSYW5nZU1hcChzY2hlbWFMb29rQXQucmFuZ2VNYXBWZXJ0aWNhbERvd24sIGRlZmF1bHRPdXRwdXRTY2FsZSk7XG4gICAgY29uc3QgbWFwVlUgPSB0aGlzLl92MUltcG9ydFJhbmdlTWFwKHNjaGVtYUxvb2tBdC5yYW5nZU1hcFZlcnRpY2FsVXAsIGRlZmF1bHRPdXRwdXRTY2FsZSk7XG5cbiAgICBsZXQgYXBwbGllcjtcblxuICAgIGlmIChzY2hlbWFMb29rQXQudHlwZSA9PT0gJ2V4cHJlc3Npb24nKSB7XG4gICAgICBhcHBsaWVyID0gbmV3IFZSTUxvb2tBdEV4cHJlc3Npb25BcHBsaWVyKGV4cHJlc3Npb25zLCBtYXBISSwgbWFwSE8sIG1hcFZELCBtYXBWVSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwcGxpZXIgPSBuZXcgVlJNTG9va0F0Qm9uZUFwcGxpZXIoaHVtYW5vaWQsIG1hcEhJLCBtYXBITywgbWFwVkQsIG1hcFZVKTtcbiAgICB9XG5cbiAgICBjb25zdCBsb29rQXQgPSB0aGlzLl9pbXBvcnRMb29rQXQoaHVtYW5vaWQsIGFwcGxpZXIpO1xuXG4gICAgbG9va0F0Lm9mZnNldEZyb21IZWFkQm9uZS5mcm9tQXJyYXkoc2NoZW1hTG9va0F0Lm9mZnNldEZyb21IZWFkQm9uZSA/PyBbMC4wLCAwLjA2LCAwLjBdKTtcblxuICAgIHJldHVybiBsb29rQXQ7XG4gIH1cblxuICBwcml2YXRlIF92MUltcG9ydFJhbmdlTWFwKFxuICAgIHNjaGVtYVJhbmdlTWFwOiBWMVZSTVNjaGVtYS5Mb29rQXRSYW5nZU1hcCB8IHVuZGVmaW5lZCxcbiAgICBkZWZhdWx0T3V0cHV0U2NhbGU6IG51bWJlcixcbiAgKTogVlJNTG9va0F0UmFuZ2VNYXAge1xuICAgIGxldCBpbnB1dE1heFZhbHVlID0gc2NoZW1hUmFuZ2VNYXA/LmlucHV0TWF4VmFsdWUgPz8gOTAuMDtcbiAgICBjb25zdCBvdXRwdXRTY2FsZSA9IHNjaGVtYVJhbmdlTWFwPy5vdXRwdXRTY2FsZSA/PyBkZWZhdWx0T3V0cHV0U2NhbGU7XG5cbiAgICAvLyBJdCBtaWdodCBjYXVzZSBOYU4gd2hlbiBgaW5wdXRNYXhWYWx1ZWAgaXMgdG9vIHNtYWxsXG4gICAgLy8gd2hpY2ggbWFrZXMgdGhlIG1lc2ggb2YgdGhlIGhlYWQgZGlzYXBwZWFyXG4gICAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vcGl4aXYvdGhyZWUtdnJtL2lzc3Vlcy8xMjAxXG4gICAgaWYgKGlucHV0TWF4VmFsdWUgPCBJTlBVVF9NQVhfVkFMVUVfTUlOSU1VTSkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAnVlJNTG9va0F0TG9hZGVyUGx1Z2luOiBpbnB1dE1heFZhbHVlIG9mIGEgcmFuZ2UgbWFwIGlzIHRvbyBzbWFsbC4gQ29uc2lkZXIgcmV2aWV3aW5nIHRoZSByYW5nZSBtYXAhJyxcbiAgICAgICk7XG4gICAgICBpbnB1dE1heFZhbHVlID0gSU5QVVRfTUFYX1ZBTFVFX01JTklNVU07XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBWUk1Mb29rQXRSYW5nZU1hcChpbnB1dE1heFZhbHVlLCBvdXRwdXRTY2FsZSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF92MEltcG9ydChcbiAgICBnbHRmOiBHTFRGLFxuICAgIGh1bWFub2lkOiBWUk1IdW1hbm9pZCxcbiAgICBleHByZXNzaW9uczogVlJNRXhwcmVzc2lvbk1hbmFnZXIsXG4gICk6IFByb21pc2U8VlJNTG9va0F0IHwgbnVsbD4ge1xuICAgIGNvbnN0IGpzb24gPSB0aGlzLnBhcnNlci5qc29uIGFzIEdMVEZTY2hlbWEuSUdMVEY7XG5cbiAgICAvLyBlYXJseSBhYm9ydCBpZiBpdCBkb2Vzbid0IHVzZSB2cm1cbiAgICBjb25zdCB2cm1FeHQgPSBqc29uLmV4dGVuc2lvbnM/LlZSTSBhcyBWMFZSTS5WUk0gfCB1bmRlZmluZWQ7XG4gICAgaWYgKCF2cm1FeHQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNjaGVtYUZpcnN0UGVyc29uID0gdnJtRXh0LmZpcnN0UGVyc29uO1xuICAgIGlmICghc2NoZW1hRmlyc3RQZXJzb24pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGRlZmF1bHRPdXRwdXRTY2FsZSA9IHNjaGVtYUZpcnN0UGVyc29uLmxvb2tBdFR5cGVOYW1lID09PSAnQmxlbmRTaGFwZScgPyAxLjAgOiAxMC4wO1xuXG4gICAgY29uc3QgbWFwSEkgPSB0aGlzLl92MEltcG9ydERlZ3JlZU1hcChzY2hlbWFGaXJzdFBlcnNvbi5sb29rQXRIb3Jpem9udGFsSW5uZXIsIGRlZmF1bHRPdXRwdXRTY2FsZSk7XG4gICAgY29uc3QgbWFwSE8gPSB0aGlzLl92MEltcG9ydERlZ3JlZU1hcChzY2hlbWFGaXJzdFBlcnNvbi5sb29rQXRIb3Jpem9udGFsT3V0ZXIsIGRlZmF1bHRPdXRwdXRTY2FsZSk7XG4gICAgY29uc3QgbWFwVkQgPSB0aGlzLl92MEltcG9ydERlZ3JlZU1hcChzY2hlbWFGaXJzdFBlcnNvbi5sb29rQXRWZXJ0aWNhbERvd24sIGRlZmF1bHRPdXRwdXRTY2FsZSk7XG4gICAgY29uc3QgbWFwVlUgPSB0aGlzLl92MEltcG9ydERlZ3JlZU1hcChzY2hlbWFGaXJzdFBlcnNvbi5sb29rQXRWZXJ0aWNhbFVwLCBkZWZhdWx0T3V0cHV0U2NhbGUpO1xuXG4gICAgbGV0IGFwcGxpZXI7XG5cbiAgICBpZiAoc2NoZW1hRmlyc3RQZXJzb24ubG9va0F0VHlwZU5hbWUgPT09ICdCbGVuZFNoYXBlJykge1xuICAgICAgYXBwbGllciA9IG5ldyBWUk1Mb29rQXRFeHByZXNzaW9uQXBwbGllcihleHByZXNzaW9ucywgbWFwSEksIG1hcEhPLCBtYXBWRCwgbWFwVlUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcHBsaWVyID0gbmV3IFZSTUxvb2tBdEJvbmVBcHBsaWVyKGh1bWFub2lkLCBtYXBISSwgbWFwSE8sIG1hcFZELCBtYXBWVSk7XG4gICAgfVxuXG4gICAgY29uc3QgbG9va0F0ID0gdGhpcy5faW1wb3J0TG9va0F0KGh1bWFub2lkLCBhcHBsaWVyKTtcblxuICAgIGlmIChzY2hlbWFGaXJzdFBlcnNvbi5maXJzdFBlcnNvbkJvbmVPZmZzZXQpIHtcbiAgICAgIGxvb2tBdC5vZmZzZXRGcm9tSGVhZEJvbmUuc2V0KFxuICAgICAgICBzY2hlbWFGaXJzdFBlcnNvbi5maXJzdFBlcnNvbkJvbmVPZmZzZXQueCA/PyAwLjAsXG4gICAgICAgIHNjaGVtYUZpcnN0UGVyc29uLmZpcnN0UGVyc29uQm9uZU9mZnNldC55ID8/IDAuMDYsXG4gICAgICAgIC0oc2NoZW1hRmlyc3RQZXJzb24uZmlyc3RQZXJzb25Cb25lT2Zmc2V0LnogPz8gMC4wKSxcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvb2tBdC5vZmZzZXRGcm9tSGVhZEJvbmUuc2V0KDAuMCwgMC4wNiwgMC4wKTtcbiAgICB9XG5cbiAgICAvLyBWUk0gMC4wIGFyZSBmYWNpbmcgWi0gaW5zdGVhZCBvZiBaK1xuICAgIGxvb2tBdC5mYWNlRnJvbnQuc2V0KDAuMCwgMC4wLCAtMS4wKTtcblxuICAgIGlmIChhcHBsaWVyIGluc3RhbmNlb2YgVlJNTG9va0F0Qm9uZUFwcGxpZXIpIHtcbiAgICAgIGFwcGxpZXIuZmFjZUZyb250LnNldCgwLjAsIDAuMCwgLTEuMCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxvb2tBdDtcbiAgfVxuXG4gIHByaXZhdGUgX3YwSW1wb3J0RGVncmVlTWFwKFxuICAgIHNjaGVtYURlZ3JlZU1hcDogVjBWUk0uRmlyc3RQZXJzb25EZWdyZWVNYXAgfCB1bmRlZmluZWQsXG4gICAgZGVmYXVsdE91dHB1dFNjYWxlOiBudW1iZXIsXG4gICk6IFZSTUxvb2tBdFJhbmdlTWFwIHtcbiAgICBjb25zdCBjdXJ2ZSA9IHNjaGVtYURlZ3JlZU1hcD8uY3VydmU7XG4gICAgaWYgKEpTT04uc3RyaW5naWZ5KGN1cnZlKSAhPT0gJ1swLDAsMCwxLDEsMSwxLDBdJykge1xuICAgICAgY29uc29sZS53YXJuKCdDdXJ2ZXMgb2YgTG9va0F0RGVncmVlTWFwIGRlZmluZWQgaW4gVlJNIDAuMCBhcmUgbm90IHN1cHBvcnRlZCcpO1xuICAgIH1cblxuICAgIGxldCB4UmFuZ2UgPSBzY2hlbWFEZWdyZWVNYXA/LnhSYW5nZSA/PyA5MC4wO1xuICAgIGNvbnN0IHlSYW5nZSA9IHNjaGVtYURlZ3JlZU1hcD8ueVJhbmdlID8/IGRlZmF1bHRPdXRwdXRTY2FsZTtcblxuICAgIC8vIEl0IG1pZ2h0IGNhdXNlIE5hTiB3aGVuIGB4UmFuZ2VgIGlzIHRvbyBzbWFsbFxuICAgIC8vIHdoaWNoIG1ha2VzIHRoZSBtZXNoIG9mIHRoZSBoZWFkIGRpc2FwcGVhclxuICAgIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL3BpeGl2L3RocmVlLXZybS9pc3N1ZXMvMTIwMVxuICAgIGlmICh4UmFuZ2UgPCBJTlBVVF9NQVhfVkFMVUVfTUlOSU1VTSkge1xuICAgICAgY29uc29sZS53YXJuKCdWUk1Mb29rQXRMb2FkZXJQbHVnaW46IHhSYW5nZSBvZiBhIGRlZ3JlZSBtYXAgaXMgdG9vIHNtYWxsLiBDb25zaWRlciByZXZpZXdpbmcgdGhlIGRlZ3JlZSBtYXAhJyk7XG4gICAgICB4UmFuZ2UgPSBJTlBVVF9NQVhfVkFMVUVfTUlOSU1VTTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFZSTUxvb2tBdFJhbmdlTWFwKHhSYW5nZSwgeVJhbmdlKTtcbiAgfVxuXG4gIHByaXZhdGUgX2ltcG9ydExvb2tBdChodW1hbm9pZDogVlJNSHVtYW5vaWQsIGFwcGxpZXI6IFZSTUxvb2tBdEFwcGxpZXIpOiBWUk1Mb29rQXQge1xuICAgIGNvbnN0IGxvb2tBdCA9IG5ldyBWUk1Mb29rQXQoaHVtYW5vaWQsIGFwcGxpZXIpO1xuXG4gICAgaWYgKHRoaXMuaGVscGVyUm9vdCkge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IFZSTUxvb2tBdEhlbHBlcihsb29rQXQpO1xuICAgICAgdGhpcy5oZWxwZXJSb290LmFkZChoZWxwZXIpO1xuICAgICAgaGVscGVyLnJlbmRlck9yZGVyID0gdGhpcy5oZWxwZXJSb290LnJlbmRlck9yZGVyO1xuICAgIH1cblxuICAgIHJldHVybiBsb29rQXQ7XG4gIH1cbn1cbiIsICIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgdHlwZSBvZiBhcHBsaWVyLlxuICovXG5leHBvcnQgY29uc3QgVlJNTG9va0F0VHlwZU5hbWUgPSB7XG4gIEJvbmU6ICdib25lJyxcbiAgRXhwcmVzc2lvbjogJ2V4cHJlc3Npb24nLFxufTtcblxuZXhwb3J0IHR5cGUgVlJNTG9va0F0VHlwZU5hbWUgPSAodHlwZW9mIFZSTUxvb2tBdFR5cGVOYW1lKVtrZXlvZiB0eXBlb2YgVlJNTG9va0F0VHlwZU5hbWVdO1xuIiwgImltcG9ydCB0eXBlIHsgR0xURiwgR0xURkxvYWRlclBsdWdpbiwgR0xURlBhcnNlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXIuanMnO1xuaW1wb3J0IHR5cGUgeyBWUk0wTWV0YSB9IGZyb20gJy4vVlJNME1ldGEnO1xuaW1wb3J0IHR5cGUgeyBWUk0xTWV0YSB9IGZyb20gJy4vVlJNMU1ldGEnO1xuaW1wb3J0IHR5cGUgeyBWUk1NZXRhIH0gZnJvbSAnLi9WUk1NZXRhJztcbmltcG9ydCB0eXBlIHsgVlJNTWV0YUxvYWRlclBsdWdpbk9wdGlvbnMgfSBmcm9tICcuL1ZSTU1ldGFMb2FkZXJQbHVnaW5PcHRpb25zJztcbmltcG9ydCB0eXBlICogYXMgVjBWUk0gZnJvbSAnQHBpeGl2L3R5cGVzLXZybS0wLjAnO1xuaW1wb3J0IHR5cGUgKiBhcyBWMVZSTVNjaGVtYSBmcm9tICdAcGl4aXYvdHlwZXMtdnJtYy12cm0tMS4wJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IHJlc29sdmVVUkwgfSBmcm9tICcuLi91dGlscy9yZXNvbHZlVVJMJztcbmltcG9ydCB7IEdMVEYgYXMgR0xURlNjaGVtYSB9IGZyb20gJ0BnbHRmLXRyYW5zZm9ybS9jb3JlJztcblxuLyoqXG4gKiBQb3NzaWJsZSBzcGVjIHZlcnNpb25zIGl0IHJlY29nbml6ZXMuXG4gKi9cbmNvbnN0IFBPU1NJQkxFX1NQRUNfVkVSU0lPTlMgPSBuZXcgU2V0KFsnMS4wJywgJzEuMC1iZXRhJ10pO1xuXG4vKipcbiAqIEEgcGx1Z2luIG9mIEdMVEZMb2FkZXIgdGhhdCBpbXBvcnRzIGEge0BsaW5rIFZSTTFNZXRhfSBmcm9tIGEgVlJNIGV4dGVuc2lvbiBvZiBhIEdMVEYuXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1NZXRhTG9hZGVyUGx1Z2luIGltcGxlbWVudHMgR0xURkxvYWRlclBsdWdpbiB7XG4gIHB1YmxpYyByZWFkb25seSBwYXJzZXI6IEdMVEZQYXJzZXI7XG5cbiAgLyoqXG4gICAqIElmIGBmYWxzZWAsIGl0IHdvbid0IGxvYWQgaXRzIHRodW1ibmFpbCBpbWFnZSAoe0BsaW5rIFZSTTFNZXRhLnRodW1ibmFpbEltYWdlfSkuXG4gICAqIGBmYWxzZWAgYnkgZGVmYXVsdC5cbiAgICovXG4gIHB1YmxpYyBuZWVkVGh1bWJuYWlsSW1hZ2U6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEEgbGlzdCBvZiBsaWNlbnNlIHVybHMuXG4gICAqIFRoaXMgbWV0YSBsb2FkZXIgd2lsbCBhY2NlcHQgdGhlc2UgYGxpY2Vuc2VVcmxgcy5cbiAgICogT3RoZXJ3aXNlIGl0IHdvbid0IGJlIGxvYWRlZC5cbiAgICovXG4gIHB1YmxpYyBhY2NlcHRMaWNlbnNlVXJsczogc3RyaW5nW107XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgaXQgc2hvdWxkIGFjY2VwdCBWUk0wLjAgbWV0YSBvciBub3QuXG4gICAqIE5vdGUgdGhhdCBpdCBtaWdodCBsb2FkIHtAbGluayBWUk0wTWV0YX0gaW5zdGVhZCBvZiB7QGxpbmsgVlJNMU1ldGF9IHdoZW4gdGhpcyBpcyBgdHJ1ZWAuXG4gICAqIGB0cnVlYCBieSBkZWZhdWx0LlxuICAgKi9cbiAgcHVibGljIGFjY2VwdFYwTWV0YTogYm9vbGVhbjtcblxuICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICAvLyBXZSBzaG91bGQgdXNlIHRoZSBleHRlbnNpb24gbmFtZSBpbnN0ZWFkIGJ1dCB3ZSBoYXZlIG11bHRpcGxlIHBsdWdpbnMgZm9yIGFuIGV4dGVuc2lvbi4uLlxuICAgIHJldHVybiAnVlJNTWV0YUxvYWRlclBsdWdpbic7XG4gIH1cblxuICBwdWJsaWMgY29uc3RydWN0b3IocGFyc2VyOiBHTFRGUGFyc2VyLCBvcHRpb25zPzogVlJNTWV0YUxvYWRlclBsdWdpbk9wdGlvbnMpIHtcbiAgICB0aGlzLnBhcnNlciA9IHBhcnNlcjtcblxuICAgIHRoaXMubmVlZFRodW1ibmFpbEltYWdlID0gb3B0aW9ucz8ubmVlZFRodW1ibmFpbEltYWdlID8/IGZhbHNlO1xuICAgIHRoaXMuYWNjZXB0TGljZW5zZVVybHMgPSBvcHRpb25zPy5hY2NlcHRMaWNlbnNlVXJscyA/PyBbJ2h0dHBzOi8vdnJtLmRldi9saWNlbnNlcy8xLjAvJ107XG4gICAgdGhpcy5hY2NlcHRWME1ldGEgPSBvcHRpb25zPy5hY2NlcHRWME1ldGEgPz8gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBhZnRlclJvb3QoZ2x0ZjogR0xURik6IFByb21pc2U8dm9pZD4ge1xuICAgIGdsdGYudXNlckRhdGEudnJtTWV0YSA9IGF3YWl0IHRoaXMuX2ltcG9ydChnbHRmKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX2ltcG9ydChnbHRmOiBHTFRGKTogUHJvbWlzZTxWUk1NZXRhIHwgbnVsbD4ge1xuICAgIGNvbnN0IHYxUmVzdWx0ID0gYXdhaXQgdGhpcy5fdjFJbXBvcnQoZ2x0Zik7XG4gICAgaWYgKHYxUmVzdWx0ICE9IG51bGwpIHtcbiAgICAgIHJldHVybiB2MVJlc3VsdDtcbiAgICB9XG5cbiAgICBjb25zdCB2MFJlc3VsdCA9IGF3YWl0IHRoaXMuX3YwSW1wb3J0KGdsdGYpO1xuICAgIGlmICh2MFJlc3VsdCAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gdjBSZXN1bHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF92MUltcG9ydChnbHRmOiBHTFRGKTogUHJvbWlzZTxWUk0xTWV0YSB8IG51bGw+IHtcbiAgICBjb25zdCBqc29uID0gdGhpcy5wYXJzZXIuanNvbiBhcyBHTFRGU2NoZW1hLklHTFRGO1xuXG4gICAgLy8gZWFybHkgYWJvcnQgaWYgaXQgZG9lc24ndCB1c2UgdnJtXG4gICAgY29uc3QgaXNWUk1Vc2VkID0ganNvbi5leHRlbnNpb25zVXNlZD8uaW5kZXhPZignVlJNQ192cm0nKSAhPT0gLTE7XG4gICAgaWYgKCFpc1ZSTVVzZWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGV4dGVuc2lvbiA9IGpzb24uZXh0ZW5zaW9ucz8uWydWUk1DX3ZybSddIGFzIFYxVlJNU2NoZW1hLlZSTUNWUk0gfCB1bmRlZmluZWQ7XG4gICAgaWYgKGV4dGVuc2lvbiA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzcGVjVmVyc2lvbiA9IGV4dGVuc2lvbi5zcGVjVmVyc2lvbjtcbiAgICBpZiAoIVBPU1NJQkxFX1NQRUNfVkVSU0lPTlMuaGFzKHNwZWNWZXJzaW9uKSkge1xuICAgICAgY29uc29sZS53YXJuKGBWUk1NZXRhTG9hZGVyUGx1Z2luOiBVbmtub3duIFZSTUNfdnJtIHNwZWNWZXJzaW9uIFwiJHtzcGVjVmVyc2lvbn1cImApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc2NoZW1hTWV0YSA9IGV4dGVuc2lvbi5tZXRhO1xuICAgIGlmICghc2NoZW1hTWV0YSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gdGhyb3cgYW4gZXJyb3IgaWYgYWNjZXB0VjBNZXRhIGlzIGZhbHNlXG4gICAgY29uc3QgbGljZW5zZVVybCA9IHNjaGVtYU1ldGEubGljZW5zZVVybDtcbiAgICBjb25zdCBhY2NlcHRMaWNlbnNlVXJsc1NldCA9IG5ldyBTZXQodGhpcy5hY2NlcHRMaWNlbnNlVXJscyk7XG4gICAgaWYgKCFhY2NlcHRMaWNlbnNlVXJsc1NldC5oYXMobGljZW5zZVVybCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVlJNTWV0YUxvYWRlclBsdWdpbjogVGhlIGxpY2Vuc2UgdXJsIFwiJHtsaWNlbnNlVXJsfVwiIGlzIG5vdCBhY2NlcHRlZGApO1xuICAgIH1cblxuICAgIGxldCB0aHVtYm5haWxJbWFnZTogSFRNTEltYWdlRWxlbWVudCB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgICBpZiAodGhpcy5uZWVkVGh1bWJuYWlsSW1hZ2UgJiYgc2NoZW1hTWV0YS50aHVtYm5haWxJbWFnZSAhPSBudWxsKSB7XG4gICAgICB0aHVtYm5haWxJbWFnZSA9IChhd2FpdCB0aGlzLl9leHRyYWN0R0xURkltYWdlKHNjaGVtYU1ldGEudGh1bWJuYWlsSW1hZ2UpKSA/PyB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIG1ldGFWZXJzaW9uOiAnMScsXG4gICAgICBuYW1lOiBzY2hlbWFNZXRhLm5hbWUsXG4gICAgICB2ZXJzaW9uOiBzY2hlbWFNZXRhLnZlcnNpb24sXG4gICAgICBhdXRob3JzOiBzY2hlbWFNZXRhLmF1dGhvcnMsXG4gICAgICBjb3B5cmlnaHRJbmZvcm1hdGlvbjogc2NoZW1hTWV0YS5jb3B5cmlnaHRJbmZvcm1hdGlvbixcbiAgICAgIGNvbnRhY3RJbmZvcm1hdGlvbjogc2NoZW1hTWV0YS5jb250YWN0SW5mb3JtYXRpb24sXG4gICAgICByZWZlcmVuY2VzOiBzY2hlbWFNZXRhLnJlZmVyZW5jZXMsXG4gICAgICB0aGlyZFBhcnR5TGljZW5zZXM6IHNjaGVtYU1ldGEudGhpcmRQYXJ0eUxpY2Vuc2VzLFxuICAgICAgdGh1bWJuYWlsSW1hZ2UsXG4gICAgICBsaWNlbnNlVXJsOiBzY2hlbWFNZXRhLmxpY2Vuc2VVcmwsXG4gICAgICBhdmF0YXJQZXJtaXNzaW9uOiBzY2hlbWFNZXRhLmF2YXRhclBlcm1pc3Npb24sXG4gICAgICBhbGxvd0V4Y2Vzc2l2ZWx5VmlvbGVudFVzYWdlOiBzY2hlbWFNZXRhLmFsbG93RXhjZXNzaXZlbHlWaW9sZW50VXNhZ2UsXG4gICAgICBhbGxvd0V4Y2Vzc2l2ZWx5U2V4dWFsVXNhZ2U6IHNjaGVtYU1ldGEuYWxsb3dFeGNlc3NpdmVseVNleHVhbFVzYWdlLFxuICAgICAgY29tbWVyY2lhbFVzYWdlOiBzY2hlbWFNZXRhLmNvbW1lcmNpYWxVc2FnZSxcbiAgICAgIGFsbG93UG9saXRpY2FsT3JSZWxpZ2lvdXNVc2FnZTogc2NoZW1hTWV0YS5hbGxvd1BvbGl0aWNhbE9yUmVsaWdpb3VzVXNhZ2UsXG4gICAgICBhbGxvd0FudGlzb2NpYWxPckhhdGVVc2FnZTogc2NoZW1hTWV0YS5hbGxvd0FudGlzb2NpYWxPckhhdGVVc2FnZSxcbiAgICAgIGNyZWRpdE5vdGF0aW9uOiBzY2hlbWFNZXRhLmNyZWRpdE5vdGF0aW9uLFxuICAgICAgYWxsb3dSZWRpc3RyaWJ1dGlvbjogc2NoZW1hTWV0YS5hbGxvd1JlZGlzdHJpYnV0aW9uLFxuICAgICAgbW9kaWZpY2F0aW9uOiBzY2hlbWFNZXRhLm1vZGlmaWNhdGlvbixcbiAgICAgIG90aGVyTGljZW5zZVVybDogc2NoZW1hTWV0YS5vdGhlckxpY2Vuc2VVcmwsXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX3YwSW1wb3J0KGdsdGY6IEdMVEYpOiBQcm9taXNlPFZSTTBNZXRhIHwgbnVsbD4ge1xuICAgIGNvbnN0IGpzb24gPSB0aGlzLnBhcnNlci5qc29uIGFzIEdMVEZTY2hlbWEuSUdMVEY7XG5cbiAgICAvLyBlYXJseSBhYm9ydCBpZiBpdCBkb2Vzbid0IHVzZSB2cm1cbiAgICBjb25zdCB2cm1FeHQgPSBqc29uLmV4dGVuc2lvbnM/LlZSTSBhcyBWMFZSTS5WUk0gfCB1bmRlZmluZWQ7XG4gICAgaWYgKCF2cm1FeHQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNjaGVtYU1ldGEgPSB2cm1FeHQubWV0YTtcbiAgICBpZiAoIXNjaGVtYU1ldGEpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIHRocm93IGFuIGVycm9yIGlmIGFjY2VwdFYwTWV0YSBpcyBmYWxzZVxuICAgIGlmICghdGhpcy5hY2NlcHRWME1ldGEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVlJNTWV0YUxvYWRlclBsdWdpbjogQXR0ZW1wdGVkIHRvIGxvYWQgVlJNMC4wIG1ldGEgYnV0IGFjY2VwdFYwTWV0YSBpcyBmYWxzZScpO1xuICAgIH1cblxuICAgIC8vIGxvYWQgdGh1bWJuYWlsIHRleHR1cmVcbiAgICBsZXQgdGV4dHVyZTogVEhSRUUuVGV4dHVyZSB8IG51bGwgfCB1bmRlZmluZWQ7XG4gICAgaWYgKHRoaXMubmVlZFRodW1ibmFpbEltYWdlICYmIHNjaGVtYU1ldGEudGV4dHVyZSAhPSBudWxsICYmIHNjaGVtYU1ldGEudGV4dHVyZSAhPT0gLTEpIHtcbiAgICAgIHRleHR1cmUgPSBhd2FpdCB0aGlzLnBhcnNlci5nZXREZXBlbmRlbmN5KCd0ZXh0dXJlJywgc2NoZW1hTWV0YS50ZXh0dXJlKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgbWV0YVZlcnNpb246ICcwJyxcbiAgICAgIGFsbG93ZWRVc2VyTmFtZTogc2NoZW1hTWV0YS5hbGxvd2VkVXNlck5hbWUsXG4gICAgICBhdXRob3I6IHNjaGVtYU1ldGEuYXV0aG9yLFxuICAgICAgY29tbWVyY2lhbFVzc2FnZU5hbWU6IHNjaGVtYU1ldGEuY29tbWVyY2lhbFVzc2FnZU5hbWUsXG4gICAgICBjb250YWN0SW5mb3JtYXRpb246IHNjaGVtYU1ldGEuY29udGFjdEluZm9ybWF0aW9uLFxuICAgICAgbGljZW5zZU5hbWU6IHNjaGVtYU1ldGEubGljZW5zZU5hbWUsXG4gICAgICBvdGhlckxpY2Vuc2VVcmw6IHNjaGVtYU1ldGEub3RoZXJMaWNlbnNlVXJsLFxuICAgICAgb3RoZXJQZXJtaXNzaW9uVXJsOiBzY2hlbWFNZXRhLm90aGVyUGVybWlzc2lvblVybCxcbiAgICAgIHJlZmVyZW5jZTogc2NoZW1hTWV0YS5yZWZlcmVuY2UsXG4gICAgICBzZXh1YWxVc3NhZ2VOYW1lOiBzY2hlbWFNZXRhLnNleHVhbFVzc2FnZU5hbWUsXG4gICAgICB0ZXh0dXJlOiB0ZXh0dXJlID8/IHVuZGVmaW5lZCxcbiAgICAgIHRpdGxlOiBzY2hlbWFNZXRhLnRpdGxlLFxuICAgICAgdmVyc2lvbjogc2NoZW1hTWV0YS52ZXJzaW9uLFxuICAgICAgdmlvbGVudFVzc2FnZU5hbWU6IHNjaGVtYU1ldGEudmlvbGVudFVzc2FnZU5hbWUsXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX2V4dHJhY3RHTFRGSW1hZ2UoaW5kZXg6IG51bWJlcik6IFByb21pc2U8SFRNTEltYWdlRWxlbWVudCB8IG51bGw+IHtcbiAgICBjb25zdCBqc29uID0gdGhpcy5wYXJzZXIuanNvbiBhcyBHTFRGU2NoZW1hLklHTFRGO1xuXG4gICAgY29uc3Qgc291cmNlID0ganNvbi5pbWFnZXM/LltpbmRleF07XG5cbiAgICBpZiAoc291cmNlID09IG51bGwpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgYFZSTU1ldGFMb2FkZXJQbHVnaW46IEF0dGVtcHQgdG8gdXNlIGltYWdlc1ske2luZGV4fV0gb2YgZ2xURiBhcyBhIHRodW1ibmFpbCBidXQgdGhlIGltYWdlIGRvZXNuJ3QgZXhpc3RgLFxuICAgICAgKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIFJlZjogaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9ibG9iL3IxMjQvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlci5qcyNMMjQ2N1xuXG4gICAgLy8gYHNvdXJjZS51cmlgIG1pZ2h0IGJlIGEgcmVmZXJlbmNlIHRvIGEgZmlsZVxuICAgIGxldCBzb3VyY2VVUkk6IHN0cmluZyB8IHVuZGVmaW5lZCA9IHNvdXJjZS51cmk7XG5cbiAgICAvLyBMb2FkIHRoZSBiaW5hcnkgYXMgYSBibG9iXG4gICAgaWYgKHNvdXJjZS5idWZmZXJWaWV3ICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGJ1ZmZlclZpZXcgPSBhd2FpdCB0aGlzLnBhcnNlci5nZXREZXBlbmRlbmN5KCdidWZmZXJWaWV3Jywgc291cmNlLmJ1ZmZlclZpZXcpO1xuICAgICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtidWZmZXJWaWV3XSwgeyB0eXBlOiBzb3VyY2UubWltZVR5cGUgfSk7XG4gICAgICBzb3VyY2VVUkkgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgIH1cblxuICAgIGlmIChzb3VyY2VVUkkgPT0gbnVsbCkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBgVlJNTWV0YUxvYWRlclBsdWdpbjogQXR0ZW1wdCB0byB1c2UgaW1hZ2VzWyR7aW5kZXh9XSBvZiBnbFRGIGFzIGEgdGh1bWJuYWlsIGJ1dCB0aGUgaW1hZ2UgY291bGRuJ3QgbG9hZCBwcm9wZXJseWAsXG4gICAgICApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgbG9hZGVyID0gbmV3IFRIUkVFLkltYWdlTG9hZGVyKCk7XG4gICAgcmV0dXJuIGF3YWl0IGxvYWRlci5sb2FkQXN5bmMocmVzb2x2ZVVSTChzb3VyY2VVUkksICh0aGlzLnBhcnNlciBhcyBhbnkpLm9wdGlvbnMucGF0aCkpLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICBjb25zb2xlLndhcm4oJ1ZSTU1ldGFMb2FkZXJQbHVnaW46IEZhaWxlZCB0byBsb2FkIGEgdGh1bWJuYWlsIGltYWdlJyk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9KTtcbiAgfVxufVxuIiwgIi8qKlxuICogWW9pbmtlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvYmxvYi9tYXN0ZXIvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlci5qc1xuICovXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZVVSTCh1cmw6IHN0cmluZywgcGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgLy8gSW52YWxpZCBVUkxcbiAgaWYgKHR5cGVvZiB1cmwgIT09ICdzdHJpbmcnIHx8IHVybCA9PT0gJycpIHJldHVybiAnJztcblxuICAvLyBIb3N0IFJlbGF0aXZlIFVSTFxuICBpZiAoL15odHRwcz86XFwvXFwvL2kudGVzdChwYXRoKSAmJiAvXlxcLy8udGVzdCh1cmwpKSB7XG4gICAgcGF0aCA9IHBhdGgucmVwbGFjZSgvKF5odHRwcz86XFwvXFwvW14vXSspLiovaSwgJyQxJyk7XG4gIH1cblxuICAvLyBBYnNvbHV0ZSBVUkwgaHR0cDovLyxodHRwczovLywvL1xuICBpZiAoL14oaHR0cHM/Oik/XFwvXFwvL2kudGVzdCh1cmwpKSByZXR1cm4gdXJsO1xuXG4gIC8vIERhdGEgVVJJXG4gIGlmICgvXmRhdGE6LiosLiokL2kudGVzdCh1cmwpKSByZXR1cm4gdXJsO1xuXG4gIC8vIEJsb2IgVVJMXG4gIGlmICgvXmJsb2I6LiokL2kudGVzdCh1cmwpKSByZXR1cm4gdXJsO1xuXG4gIC8vIFJlbGF0aXZlIFVSTFxuICByZXR1cm4gcGF0aCArIHVybDtcbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1FeHByZXNzaW9uTWFuYWdlciB9IGZyb20gJy4vZXhwcmVzc2lvbnMvVlJNRXhwcmVzc2lvbk1hbmFnZXInO1xuaW1wb3J0IHsgVlJNRmlyc3RQZXJzb24gfSBmcm9tICcuL2ZpcnN0UGVyc29uL1ZSTUZpcnN0UGVyc29uJztcbmltcG9ydCB7IFZSTUh1bWFub2lkIH0gZnJvbSAnLi9odW1hbm9pZC9WUk1IdW1hbm9pZCc7XG5pbXBvcnQgeyBWUk1Mb29rQXQgfSBmcm9tICcuL2xvb2tBdC9WUk1Mb29rQXQnO1xuaW1wb3J0IHsgVlJNTWV0YSB9IGZyb20gJy4vbWV0YS9WUk1NZXRhJztcbmltcG9ydCB7IFZSTUNvcmVQYXJhbWV0ZXJzIH0gZnJvbSAnLi9WUk1Db3JlUGFyYW1ldGVycyc7XG5cbi8qKlxuICogQSBjbGFzcyB0aGF0IHJlcHJlc2VudHMgYSBzaW5nbGUgVlJNIG1vZGVsLlxuICogVGhpcyBjbGFzcyBvbmx5IGluY2x1ZGVzIGNvcmUgc3BlYyBvZiB0aGUgVlJNIChgVlJNQ192cm1gKS5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUNvcmUge1xuICAvKipcbiAgICogYFRIUkVFLkdyb3VwYCB0aGF0IGNvbnRhaW5zIHRoZSBlbnRpcmUgVlJNLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IHNjZW5lOiBUSFJFRS5Hcm91cDtcblxuICAvKipcbiAgICogQ29udGFpbnMgbWV0YSBmaWVsZHMgb2YgdGhlIFZSTS5cbiAgICogWW91IG1pZ2h0IHdhbnQgdG8gcmVmZXIgdGhlc2UgbGljZW5zZSBmaWVsZHMgYmVmb3JlIHVzZSB5b3VyIFZSTXMuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgbWV0YTogVlJNTWV0YTtcblxuICAvKipcbiAgICogQ29udGFpbnMge0BsaW5rIFZSTUh1bWFub2lkfSBvZiB0aGUgVlJNLlxuICAgKiBZb3UgY2FuIGNvbnRyb2wgZWFjaCBib25lcyB1c2luZyB7QGxpbmsgVlJNSHVtYW5vaWQuZ2V0Tm9ybWFsaXplZEJvbmVOb2RlfSBvciB7QGxpbmsgVlJNSHVtYW5vaWQuZ2V0UmF3Qm9uZU5vZGV9LlxuICAgKlxuICAgKiBAVE9ETyBBZGQgYSBsaW5rIHRvIFZSTSBzcGVjXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgaHVtYW5vaWQ6IFZSTUh1bWFub2lkO1xuXG4gIC8qKlxuICAgKiBDb250YWlucyB7QGxpbmsgVlJNRXhwcmVzc2lvbk1hbmFnZXJ9IG9mIHRoZSBWUk0uXG4gICAqIFlvdSBtaWdodCB3YW50IHRvIGNvbnRyb2wgdGhlc2UgZmFjaWFsIGV4cHJlc3Npb25zIHZpYSB7QGxpbmsgVlJNRXhwcmVzc2lvbk1hbmFnZXIuc2V0VmFsdWV9LlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGV4cHJlc3Npb25NYW5hZ2VyPzogVlJNRXhwcmVzc2lvbk1hbmFnZXI7XG5cbiAgLyoqXG4gICAqIENvbnRhaW5zIHtAbGluayBWUk1GaXJzdFBlcnNvbn0gb2YgdGhlIFZSTS5cbiAgICogVlJNRmlyc3RQZXJzb24gaXMgbW9zdGx5IHVzZWQgZm9yIG1lc2ggY3VsbGluZyBmb3IgZmlyc3QgcGVyc29uIHZpZXcuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgZmlyc3RQZXJzb24/OiBWUk1GaXJzdFBlcnNvbjtcblxuICAvKipcbiAgICogQ29udGFpbnMge0BsaW5rIFZSTUxvb2tBdH0gb2YgdGhlIFZSTS5cbiAgICogWW91IG1pZ2h0IHdhbnQgdG8gdXNlIHtAbGluayBWUk1Mb29rQXQudGFyZ2V0fSB0byBjb250cm9sIHRoZSBleWUgZGlyZWN0aW9uIG9mIHlvdXIgVlJNcy5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBsb29rQXQ/OiBWUk1Mb29rQXQ7XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBWUk0gaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSBwYXJhbXMge0BsaW5rIFZSTVBhcmFtZXRlcnN9IHRoYXQgcmVwcmVzZW50cyBjb21wb25lbnRzIG9mIHRoZSBWUk1cbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJhbXM6IFZSTUNvcmVQYXJhbWV0ZXJzKSB7XG4gICAgdGhpcy5zY2VuZSA9IHBhcmFtcy5zY2VuZTtcbiAgICB0aGlzLm1ldGEgPSBwYXJhbXMubWV0YTtcbiAgICB0aGlzLmh1bWFub2lkID0gcGFyYW1zLmh1bWFub2lkO1xuICAgIHRoaXMuZXhwcmVzc2lvbk1hbmFnZXIgPSBwYXJhbXMuZXhwcmVzc2lvbk1hbmFnZXI7XG4gICAgdGhpcy5maXJzdFBlcnNvbiA9IHBhcmFtcy5maXJzdFBlcnNvbjtcbiAgICB0aGlzLmxvb2tBdCA9IHBhcmFtcy5sb29rQXQ7XG4gIH1cblxuICAvKipcbiAgICogKipZb3UgbmVlZCB0byBjYWxsIHRoaXMgb24geW91ciB1cGRhdGUgbG9vcC4qKlxuICAgKlxuICAgKiBUaGlzIGZ1bmN0aW9uIHVwZGF0ZXMgZXZlcnkgVlJNIGNvbXBvbmVudHMuXG4gICAqXG4gICAqIEBwYXJhbSBkZWx0YSBkZWx0YVRpbWVcbiAgICovXG4gIHB1YmxpYyB1cGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuaHVtYW5vaWQudXBkYXRlKCk7XG5cbiAgICBpZiAodGhpcy5sb29rQXQpIHtcbiAgICAgIHRoaXMubG9va0F0LnVwZGF0ZShkZWx0YSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZXhwcmVzc2lvbk1hbmFnZXIpIHtcbiAgICAgIHRoaXMuZXhwcmVzc2lvbk1hbmFnZXIudXBkYXRlKCk7XG4gICAgfVxuICB9XG59XG4iLCAiaW1wb3J0IHsgR0xURiwgR0xURkxvYWRlclBsdWdpbiwgR0xURlBhcnNlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXIuanMnO1xuaW1wb3J0IHsgVlJNQ29yZUxvYWRlclBsdWdpbk9wdGlvbnMgfSBmcm9tICcuL1ZSTUNvcmVMb2FkZXJQbHVnaW5PcHRpb25zJztcbmltcG9ydCB7IFZSTUNvcmUgfSBmcm9tICcuL1ZSTUNvcmUnO1xuaW1wb3J0IHsgVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbiB9IGZyb20gJy4vZXhwcmVzc2lvbnMvVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbic7XG5pbXBvcnQgeyBWUk1GaXJzdFBlcnNvbkxvYWRlclBsdWdpbiB9IGZyb20gJy4vZmlyc3RQZXJzb24vVlJNRmlyc3RQZXJzb25Mb2FkZXJQbHVnaW4nO1xuaW1wb3J0IHsgVlJNSHVtYW5vaWRMb2FkZXJQbHVnaW4gfSBmcm9tICcuL2h1bWFub2lkL1ZSTUh1bWFub2lkTG9hZGVyUGx1Z2luJztcbmltcG9ydCB7IFZSTU1ldGFMb2FkZXJQbHVnaW4gfSBmcm9tICcuL21ldGEvVlJNTWV0YUxvYWRlclBsdWdpbic7XG5pbXBvcnQgeyBWUk1Mb29rQXRMb2FkZXJQbHVnaW4gfSBmcm9tICcuL2xvb2tBdC9WUk1Mb29rQXRMb2FkZXJQbHVnaW4nO1xuaW1wb3J0IHR5cGUgeyBWUk1IdW1hbm9pZCB9IGZyb20gJy4vaHVtYW5vaWQnO1xuaW1wb3J0IHR5cGUgeyBWUk1NZXRhIH0gZnJvbSAnLi9tZXRhJztcblxuZXhwb3J0IGNsYXNzIFZSTUNvcmVMb2FkZXJQbHVnaW4gaW1wbGVtZW50cyBHTFRGTG9hZGVyUGx1Z2luIHtcbiAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7XG4gICAgLy8gV2Ugc2hvdWxkIHVzZSB0aGUgZXh0ZW5zaW9uIG5hbWUgaW5zdGVhZCBidXQgd2UgaGF2ZSBtdWx0aXBsZSBwbHVnaW5zIGZvciBhbiBleHRlbnNpb24uLi5cbiAgICByZXR1cm4gJ1ZSTUNfdnJtJztcbiAgfVxuXG4gIHB1YmxpYyByZWFkb25seSBwYXJzZXI6IEdMVEZQYXJzZXI7XG5cbiAgcHVibGljIHJlYWRvbmx5IGV4cHJlc3Npb25QbHVnaW46IFZSTUV4cHJlc3Npb25Mb2FkZXJQbHVnaW47XG4gIHB1YmxpYyByZWFkb25seSBmaXJzdFBlcnNvblBsdWdpbjogVlJNRmlyc3RQZXJzb25Mb2FkZXJQbHVnaW47XG4gIHB1YmxpYyByZWFkb25seSBodW1hbm9pZFBsdWdpbjogVlJNSHVtYW5vaWRMb2FkZXJQbHVnaW47XG4gIHB1YmxpYyByZWFkb25seSBsb29rQXRQbHVnaW46IFZSTUxvb2tBdExvYWRlclBsdWdpbjtcbiAgcHVibGljIHJlYWRvbmx5IG1ldGFQbHVnaW46IFZSTU1ldGFMb2FkZXJQbHVnaW47XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBhcnNlcjogR0xURlBhcnNlciwgb3B0aW9ucz86IFZSTUNvcmVMb2FkZXJQbHVnaW5PcHRpb25zKSB7XG4gICAgdGhpcy5wYXJzZXIgPSBwYXJzZXI7XG5cbiAgICBjb25zdCBoZWxwZXJSb290ID0gb3B0aW9ucz8uaGVscGVyUm9vdDtcbiAgICBjb25zdCBhdXRvVXBkYXRlSHVtYW5Cb25lcyA9IG9wdGlvbnM/LmF1dG9VcGRhdGVIdW1hbkJvbmVzO1xuXG4gICAgdGhpcy5leHByZXNzaW9uUGx1Z2luID0gb3B0aW9ucz8uZXhwcmVzc2lvblBsdWdpbiA/PyBuZXcgVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbihwYXJzZXIpO1xuICAgIHRoaXMuZmlyc3RQZXJzb25QbHVnaW4gPSBvcHRpb25zPy5maXJzdFBlcnNvblBsdWdpbiA/PyBuZXcgVlJNRmlyc3RQZXJzb25Mb2FkZXJQbHVnaW4ocGFyc2VyKTtcbiAgICB0aGlzLmh1bWFub2lkUGx1Z2luID1cbiAgICAgIG9wdGlvbnM/Lmh1bWFub2lkUGx1Z2luID8/IG5ldyBWUk1IdW1hbm9pZExvYWRlclBsdWdpbihwYXJzZXIsIHsgaGVscGVyUm9vdCwgYXV0b1VwZGF0ZUh1bWFuQm9uZXMgfSk7XG4gICAgdGhpcy5sb29rQXRQbHVnaW4gPSBvcHRpb25zPy5sb29rQXRQbHVnaW4gPz8gbmV3IFZSTUxvb2tBdExvYWRlclBsdWdpbihwYXJzZXIsIHsgaGVscGVyUm9vdCB9KTtcbiAgICB0aGlzLm1ldGFQbHVnaW4gPSBvcHRpb25zPy5tZXRhUGx1Z2luID8/IG5ldyBWUk1NZXRhTG9hZGVyUGx1Z2luKHBhcnNlcik7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgYWZ0ZXJSb290KGdsdGY6IEdMVEYpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLm1ldGFQbHVnaW4uYWZ0ZXJSb290KGdsdGYpO1xuICAgIGF3YWl0IHRoaXMuaHVtYW5vaWRQbHVnaW4uYWZ0ZXJSb290KGdsdGYpO1xuICAgIGF3YWl0IHRoaXMuZXhwcmVzc2lvblBsdWdpbi5hZnRlclJvb3QoZ2x0Zik7XG4gICAgYXdhaXQgdGhpcy5sb29rQXRQbHVnaW4uYWZ0ZXJSb290KGdsdGYpO1xuICAgIGF3YWl0IHRoaXMuZmlyc3RQZXJzb25QbHVnaW4uYWZ0ZXJSb290KGdsdGYpO1xuXG4gICAgY29uc3QgbWV0YSA9IGdsdGYudXNlckRhdGEudnJtTWV0YSBhcyBWUk1NZXRhIHwgbnVsbDtcbiAgICBjb25zdCBodW1hbm9pZCA9IGdsdGYudXNlckRhdGEudnJtSHVtYW5vaWQgYXMgVlJNSHVtYW5vaWQgfCBudWxsO1xuXG4gICAgLy8gbWV0YSBhbmQgaHVtYW5vaWQgYXJlIHJlcXVpcmVkIHRvIGJlIGEgVlJNLlxuICAgIC8vIERvbid0IGNyZWF0ZSBWUk0gaWYgdGhleSBhcmUgbnVsbFxuICAgIGlmIChtZXRhICYmIGh1bWFub2lkKSB7XG4gICAgICBjb25zdCB2cm1Db3JlID0gbmV3IFZSTUNvcmUoe1xuICAgICAgICBzY2VuZTogZ2x0Zi5zY2VuZSxcbiAgICAgICAgZXhwcmVzc2lvbk1hbmFnZXI6IGdsdGYudXNlckRhdGEudnJtRXhwcmVzc2lvbk1hbmFnZXIsXG4gICAgICAgIGZpcnN0UGVyc29uOiBnbHRmLnVzZXJEYXRhLnZybUZpcnN0UGVyc29uLFxuICAgICAgICBodW1hbm9pZCxcbiAgICAgICAgbG9va0F0OiBnbHRmLnVzZXJEYXRhLnZybUxvb2tBdCxcbiAgICAgICAgbWV0YSxcbiAgICAgIH0pO1xuXG4gICAgICBnbHRmLnVzZXJEYXRhLnZybUNvcmUgPSB2cm1Db3JlO1xuICAgIH1cbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTUNvcmUgfSBmcm9tICdAcGl4aXYvdGhyZWUtdnJtLWNvcmUnO1xuaW1wb3J0IHsgVlJNTm9kZUNvbnN0cmFpbnRNYW5hZ2VyIH0gZnJvbSAnQHBpeGl2L3RocmVlLXZybS1ub2RlLWNvbnN0cmFpbnQnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZU1hbmFnZXIgfSBmcm9tICdAcGl4aXYvdGhyZWUtdnJtLXNwcmluZ2JvbmUnO1xuaW1wb3J0IHsgVlJNUGFyYW1ldGVycyB9IGZyb20gJy4vVlJNUGFyYW1ldGVycyc7XG5cbi8qKlxuICogQSBjbGFzcyB0aGF0IHJlcHJlc2VudHMgYSBzaW5nbGUgVlJNIG1vZGVsLlxuICovXG5leHBvcnQgY2xhc3MgVlJNIGV4dGVuZHMgVlJNQ29yZSB7XG4gIC8qKlxuICAgKiBDb250YWlucyBtYXRlcmlhbHMgb2YgdGhlIFZSTS5cbiAgICogYHVwZGF0ZWAgbWV0aG9kIG9mIHRoZXNlIG1hdGVyaWFscyB3aWxsIGJlIGNhbGxlZCB2aWEgaXRzIHtAbGluayBWUk0udXBkYXRlfSBtZXRob2QuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgbWF0ZXJpYWxzPzogVEhSRUUuTWF0ZXJpYWxbXTtcblxuICAvKipcbiAgICogQSB7QGxpbmsgVlJNU3ByaW5nQm9uZU1hbmFnZXJ9IG1hbmlwdWxhdGVzIGFsbCBzcHJpbmcgYm9uZXMgYXR0YWNoZWQgb24gdGhlIFZSTS5cbiAgICogVXN1YWxseSB5b3UgZG9uJ3QgaGF2ZSB0byBjYXJlIGFib3V0IHRoaXMgcHJvcGVydHkuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgc3ByaW5nQm9uZU1hbmFnZXI/OiBWUk1TcHJpbmdCb25lTWFuYWdlcjtcblxuICAvKipcbiAgICogQSB7QGxpbmsgVlJNTm9kZUNvbnN0cmFpbnRNYW5hZ2VyfSBtYW5pcHVsYXRlcyBhbGwgY29uc3RyYWludHMgYXR0YWNoZWQgb24gdGhlIFZSTS5cbiAgICogVXN1YWxseSB5b3UgZG9uJ3QgaGF2ZSB0byBjYXJlIGFib3V0IHRoaXMgcHJvcGVydHkuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgbm9kZUNvbnN0cmFpbnRNYW5hZ2VyPzogVlJNTm9kZUNvbnN0cmFpbnRNYW5hZ2VyO1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgVlJNIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0gcGFyYW1zIHtAbGluayBWUk1QYXJhbWV0ZXJzfSB0aGF0IHJlcHJlc2VudHMgY29tcG9uZW50cyBvZiB0aGUgVlJNXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IocGFyYW1zOiBWUk1QYXJhbWV0ZXJzKSB7XG4gICAgc3VwZXIocGFyYW1zKTtcblxuICAgIHRoaXMubWF0ZXJpYWxzID0gcGFyYW1zLm1hdGVyaWFscztcbiAgICB0aGlzLnNwcmluZ0JvbmVNYW5hZ2VyID0gcGFyYW1zLnNwcmluZ0JvbmVNYW5hZ2VyO1xuICAgIHRoaXMubm9kZUNvbnN0cmFpbnRNYW5hZ2VyID0gcGFyYW1zLm5vZGVDb25zdHJhaW50TWFuYWdlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiAqKllvdSBuZWVkIHRvIGNhbGwgdGhpcyBvbiB5b3VyIHVwZGF0ZSBsb29wLioqXG4gICAqXG4gICAqIFRoaXMgZnVuY3Rpb24gdXBkYXRlcyBldmVyeSBWUk0gY29tcG9uZW50cy5cbiAgICpcbiAgICogQHBhcmFtIGRlbHRhIGRlbHRhVGltZVxuICAgKi9cbiAgcHVibGljIHVwZGF0ZShkZWx0YTogbnVtYmVyKTogdm9pZCB7XG4gICAgc3VwZXIudXBkYXRlKGRlbHRhKTtcblxuICAgIGlmICh0aGlzLm5vZGVDb25zdHJhaW50TWFuYWdlcikge1xuICAgICAgdGhpcy5ub2RlQ29uc3RyYWludE1hbmFnZXIudXBkYXRlKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc3ByaW5nQm9uZU1hbmFnZXIpIHtcbiAgICAgIHRoaXMuc3ByaW5nQm9uZU1hbmFnZXIudXBkYXRlKGRlbHRhKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5tYXRlcmlhbHMpIHtcbiAgICAgIHRoaXMubWF0ZXJpYWxzLmZvckVhY2goKG1hdGVyaWFsOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKG1hdGVyaWFsLnVwZGF0ZSkge1xuICAgICAgICAgIG1hdGVyaWFsLnVwZGF0ZShkZWx0YSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCAqIGFzIFYxTVRvb25TY2hlbWEgZnJvbSAnQHBpeGl2L3R5cGVzLXZybWMtbWF0ZXJpYWxzLW10b29uLTEuMCc7XG5pbXBvcnQgdHlwZSB7IEdMVEYsIEdMVEZMb2FkZXIsIEdMVEZMb2FkZXJQbHVnaW4sIEdMVEZQYXJzZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyLmpzJztcbmltcG9ydCB0eXBlIHsgTVRvb25NYXRlcmlhbFBhcmFtZXRlcnMgfSBmcm9tICcuL01Ub29uTWF0ZXJpYWxQYXJhbWV0ZXJzJztcbmltcG9ydCB0eXBlIHsgTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUgfSBmcm9tICcuL01Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlJztcbmltcG9ydCB7IEdMVEZNVG9vbk1hdGVyaWFsUGFyYW1zQXNzaWduSGVscGVyIH0gZnJvbSAnLi9HTFRGTVRvb25NYXRlcmlhbFBhcmFtc0Fzc2lnbkhlbHBlcic7XG5pbXBvcnQgdHlwZSB7IE1Ub29uTWF0ZXJpYWxMb2FkZXJQbHVnaW5PcHRpb25zIH0gZnJvbSAnLi9NVG9vbk1hdGVyaWFsTG9hZGVyUGx1Z2luT3B0aW9ucyc7XG5pbXBvcnQgdHlwZSB7IE1Ub29uTWF0ZXJpYWxEZWJ1Z01vZGUgfSBmcm9tICcuL01Ub29uTWF0ZXJpYWxEZWJ1Z01vZGUnO1xuaW1wb3J0IHsgR0xURiBhcyBHTFRGU2NoZW1hIH0gZnJvbSAnQGdsdGYtdHJhbnNmb3JtL2NvcmUnO1xuaW1wb3J0IHsgTVRvb25NYXRlcmlhbCB9IGZyb20gJy4vTVRvb25NYXRlcmlhbCc7XG5pbXBvcnQgdHlwZSB7IE1Ub29uTm9kZU1hdGVyaWFsIH0gZnJvbSAnLi9ub2Rlcy9NVG9vbk5vZGVNYXRlcmlhbCc7XG5cbi8qKlxuICogUG9zc2libGUgc3BlYyB2ZXJzaW9ucyBpdCByZWNvZ25pemVzLlxuICovXG5jb25zdCBQT1NTSUJMRV9TUEVDX1ZFUlNJT05TID0gbmV3IFNldChbJzEuMCcsICcxLjAtYmV0YSddKTtcblxuLyoqXG4gKiBBIGxvYWRlciBwbHVnaW4gb2Yge0BsaW5rIEdMVEZMb2FkZXJ9IGZvciB0aGUgZXh0ZW5zaW9uIGBWUk1DX21hdGVyaWFsc19tdG9vbmAuXG4gKlxuICogVGhpcyBwbHVnaW4gaXMgZm9yIHVzZXMgd2l0aCBXZWJHTFJlbmRlcmVyIGJ5IGRlZmF1bHQuXG4gKiBUbyB1c2UgTVRvb24gaW4gV2ViR1BVUmVuZGVyZXIsIHNldCB7QGxpbmsgbWF0ZXJpYWxUeXBlfSB0byB7QGxpbmsgTVRvb25Ob2RlTWF0ZXJpYWx9LlxuICpcbiAqIEBleGFtcGxlIHRvIHVzZSB3aXRoIFdlYkdQVVJlbmRlcmVyXG4gKiBgYGBqc1xuICogaW1wb3J0IHsgTVRvb25NYXRlcmlhbExvYWRlclBsdWdpbiB9IGZyb20gJ0BwaXhpdi90aHJlZS12cm0tbWF0ZXJpYWxzLW10b29uJztcbiAqIGltcG9ydCB7IE1Ub29uTm9kZU1hdGVyaWFsIH0gZnJvbSAnQHBpeGl2L3RocmVlLXZybS1tYXRlcmlhbHMtbXRvb24vbm9kZXMnO1xuICpcbiAqIC8vIC4uLlxuICpcbiAqIC8vIFJlZ2lzdGVyIGEgTVRvb25NYXRlcmlhbExvYWRlclBsdWdpbiB3aXRoIE1Ub29uTm9kZU1hdGVyaWFsXG4gKiBsb2FkZXIucmVnaXN0ZXIoKHBhcnNlcikgPT4ge1xuICpcbiAqICAgLy8gY3JlYXRlIGEgV2ViR1BVIGNvbXBhdGlibGUgTVRvb25NYXRlcmlhbExvYWRlclBsdWdpblxuICogICByZXR1cm4gbmV3IE1Ub29uTWF0ZXJpYWxMb2FkZXJQbHVnaW4ocGFyc2VyLCB7XG4gKlxuICogICAgIC8vIHNldCB0aGUgbWF0ZXJpYWwgdHlwZSB0byBNVG9vbk5vZGVNYXRlcmlhbFxuICogICAgIG1hdGVyaWFsVHlwZTogTVRvb25Ob2RlTWF0ZXJpYWwsXG4gKlxuICogICB9KTtcbiAqXG4gKiB9KTtcbiAqIGBgYFxuICovXG5leHBvcnQgY2xhc3MgTVRvb25NYXRlcmlhbExvYWRlclBsdWdpbiBpbXBsZW1lbnRzIEdMVEZMb2FkZXJQbHVnaW4ge1xuICBwdWJsaWMgc3RhdGljIEVYVEVOU0lPTl9OQU1FID0gJ1ZSTUNfbWF0ZXJpYWxzX210b29uJztcblxuICAvKipcbiAgICogVGhlIHR5cGUgb2YgdGhlIG1hdGVyaWFsIHRoYXQgdGhpcyBwbHVnaW4gd2lsbCBnZW5lcmF0ZS5cbiAgICpcbiAgICogSWYgeW91IGFyZSB1c2luZyB0aGlzIHBsdWdpbiB3aXRoIFdlYkdQVSwgc2V0IHRoaXMgdG8ge0BsaW5rIE1Ub29uTm9kZU1hdGVyaWFsfS5cbiAgICpcbiAgICogQGRlZmF1bHQgTVRvb25NYXRlcmlhbFxuICAgKi9cbiAgcHVibGljIG1hdGVyaWFsVHlwZTogdHlwZW9mIFRIUkVFLk1hdGVyaWFsO1xuXG4gIC8qKlxuICAgKiBUaGlzIHZhbHVlIHdpbGwgYmUgYWRkZWQgdG8gYHJlbmRlck9yZGVyYCBvZiBldmVyeSBtZXNoZXMgd2hvIGhhdmUgTWF0ZXJpYWxzTVRvb24uXG4gICAqIFRoZSBmaW5hbCByZW5kZXJPcmRlciB3aWxsIGJlIHN1bSBvZiB0aGlzIGByZW5kZXJPcmRlck9mZnNldGAgYW5kIGByZW5kZXJRdWV1ZU9mZnNldE51bWJlcmAgZm9yIGVhY2ggbWF0ZXJpYWxzLlxuICAgKlxuICAgKiBAZGVmYXVsdCAwXG4gICAqL1xuICBwdWJsaWMgcmVuZGVyT3JkZXJPZmZzZXQ6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlcmUgaXMgYSBsaW5lIG9mIHRoZSBzaGFkZXIgY2FsbGVkIFwiY29tbWVudCBvdXQgaWYgeW91IHdhbnQgdG8gUEJSIGFic29sdXRlbHlcIiBpbiBWUk0wLjAgTVRvb24uXG4gICAqIFdoZW4gdGhpcyBpcyB0cnVlLCB0aGUgbWF0ZXJpYWwgZW5hYmxlcyB0aGUgbGluZSB0byBtYWtlIGl0IGNvbXBhdGlibGUgd2l0aCB0aGUgbGVnYWN5IHJlbmRlcmluZyBvZiBWUk0uXG4gICAqIFVzdWFsbHkgbm90IHJlY29tbWVuZGVkIHRvIHR1cm4gdGhpcyBvbi5cbiAgICpcbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIHB1YmxpYyB2MENvbXBhdFNoYWRlOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBEZWJ1ZyBtb2RlIGZvciB0aGUgbWF0ZXJpYWwuXG4gICAqIFlvdSBjYW4gdmlzdWFsaXplIHNldmVyYWwgY29tcG9uZW50cyBmb3IgZGlhZ25vc2lzIHVzaW5nIGRlYnVnIG1vZGUuXG4gICAqXG4gICAqIFNlZToge0BsaW5rIE1Ub29uTWF0ZXJpYWxEZWJ1Z01vZGV9XG4gICAqXG4gICAqIEBkZWZhdWx0ICdub25lJ1xuICAgKi9cbiAgcHVibGljIGRlYnVnTW9kZTogTVRvb25NYXRlcmlhbERlYnVnTW9kZTtcblxuICBwdWJsaWMgcmVhZG9ubHkgcGFyc2VyOiBHTFRGUGFyc2VyO1xuXG4gIC8qKlxuICAgKiBMb2FkZWQgbWF0ZXJpYWxzIHdpbGwgYmUgc3RvcmVkIGluIHRoaXMgc2V0LlxuICAgKiBXaWxsIGJlIHRyYW5zZmVycmVkIGludG8gYGdsdGYudXNlckRhdGEudnJtTVRvb25NYXRlcmlhbHNgIGluIHtAbGluayBhZnRlclJvb3R9LlxuICAgKi9cbiAgcHJpdmF0ZSByZWFkb25seSBfbVRvb25NYXRlcmlhbFNldDogU2V0PFRIUkVFLk1hdGVyaWFsPjtcblxuICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gTVRvb25NYXRlcmlhbExvYWRlclBsdWdpbi5FWFRFTlNJT05fTkFNRTtcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJzZXI6IEdMVEZQYXJzZXIsIG9wdGlvbnM6IE1Ub29uTWF0ZXJpYWxMb2FkZXJQbHVnaW5PcHRpb25zID0ge30pIHtcbiAgICB0aGlzLnBhcnNlciA9IHBhcnNlcjtcblxuICAgIHRoaXMubWF0ZXJpYWxUeXBlID0gb3B0aW9ucy5tYXRlcmlhbFR5cGUgPz8gTVRvb25NYXRlcmlhbDtcbiAgICB0aGlzLnJlbmRlck9yZGVyT2Zmc2V0ID0gb3B0aW9ucy5yZW5kZXJPcmRlck9mZnNldCA/PyAwO1xuICAgIHRoaXMudjBDb21wYXRTaGFkZSA9IG9wdGlvbnMudjBDb21wYXRTaGFkZSA/PyBmYWxzZTtcbiAgICB0aGlzLmRlYnVnTW9kZSA9IG9wdGlvbnMuZGVidWdNb2RlID8/ICdub25lJztcblxuICAgIHRoaXMuX21Ub29uTWF0ZXJpYWxTZXQgPSBuZXcgU2V0KCk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgYmVmb3JlUm9vdCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aGlzLl9yZW1vdmVVbmxpdEV4dGVuc2lvbklmTVRvb25FeGlzdHMoKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBhZnRlclJvb3QoZ2x0ZjogR0xURik6IFByb21pc2U8dm9pZD4ge1xuICAgIGdsdGYudXNlckRhdGEudnJtTVRvb25NYXRlcmlhbHMgPSBBcnJheS5mcm9tKHRoaXMuX21Ub29uTWF0ZXJpYWxTZXQpO1xuICB9XG5cbiAgcHVibGljIGdldE1hdGVyaWFsVHlwZShtYXRlcmlhbEluZGV4OiBudW1iZXIpOiB0eXBlb2YgVEhSRUUuTWF0ZXJpYWwgfCBudWxsIHtcbiAgICBjb25zdCB2MUV4dGVuc2lvbiA9IHRoaXMuX2dldE1Ub29uRXh0ZW5zaW9uKG1hdGVyaWFsSW5kZXgpO1xuICAgIGlmICh2MUV4dGVuc2lvbikge1xuICAgICAgcmV0dXJuIHRoaXMubWF0ZXJpYWxUeXBlO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHVibGljIGV4dGVuZE1hdGVyaWFsUGFyYW1zKG1hdGVyaWFsSW5kZXg6IG51bWJlciwgbWF0ZXJpYWxQYXJhbXM6IE1Ub29uTWF0ZXJpYWxQYXJhbWV0ZXJzKTogUHJvbWlzZTxhbnk+IHwgbnVsbCB7XG4gICAgY29uc3QgZXh0ZW5zaW9uID0gdGhpcy5fZ2V0TVRvb25FeHRlbnNpb24obWF0ZXJpYWxJbmRleCk7XG4gICAgaWYgKGV4dGVuc2lvbikge1xuICAgICAgcmV0dXJuIHRoaXMuX2V4dGVuZE1hdGVyaWFsUGFyYW1zKGV4dGVuc2lvbiwgbWF0ZXJpYWxQYXJhbXMpO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGxvYWRNZXNoKG1lc2hJbmRleDogbnVtYmVyKTogUHJvbWlzZTxUSFJFRS5Hcm91cCB8IFRIUkVFLk1lc2ggfCBUSFJFRS5Ta2lubmVkTWVzaD4ge1xuICAgIGNvbnN0IHBhcnNlciA9IHRoaXMucGFyc2VyO1xuICAgIGNvbnN0IGpzb24gPSBwYXJzZXIuanNvbiBhcyBHTFRGU2NoZW1hLklHTFRGO1xuXG4gICAgY29uc3QgbWVzaERlZiA9IGpzb24ubWVzaGVzPy5bbWVzaEluZGV4XTtcblxuICAgIGlmIChtZXNoRGVmID09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYE1Ub29uTWF0ZXJpYWxMb2FkZXJQbHVnaW46IEF0dGVtcHQgdG8gdXNlIG1lc2hlc1ske21lc2hJbmRleH1dIG9mIGdsVEYgYnV0IHRoZSBtZXNoIGRvZXNuJ3QgZXhpc3RgLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBwcmltaXRpdmVzRGVmID0gbWVzaERlZi5wcmltaXRpdmVzO1xuXG4gICAgY29uc3QgbWVzaE9yR3JvdXAgPSBhd2FpdCBwYXJzZXIubG9hZE1lc2gobWVzaEluZGV4KTtcblxuICAgIGlmIChwcmltaXRpdmVzRGVmLmxlbmd0aCA9PT0gMSkge1xuICAgICAgY29uc3QgbWVzaCA9IG1lc2hPckdyb3VwIGFzIFRIUkVFLk1lc2g7XG4gICAgICBjb25zdCBtYXRlcmlhbEluZGV4ID0gcHJpbWl0aXZlc0RlZlswXS5tYXRlcmlhbDtcblxuICAgICAgaWYgKG1hdGVyaWFsSW5kZXggIT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9zZXR1cFByaW1pdGl2ZShtZXNoLCBtYXRlcmlhbEluZGV4KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZ3JvdXAgPSBtZXNoT3JHcm91cCBhcyBUSFJFRS5Hcm91cDtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJpbWl0aXZlc0RlZi5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBtZXNoID0gZ3JvdXAuY2hpbGRyZW5baV0gYXMgVEhSRUUuTWVzaDtcbiAgICAgICAgY29uc3QgbWF0ZXJpYWxJbmRleCA9IHByaW1pdGl2ZXNEZWZbaV0ubWF0ZXJpYWw7XG5cbiAgICAgICAgaWYgKG1hdGVyaWFsSW5kZXggIT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuX3NldHVwUHJpbWl0aXZlKG1lc2gsIG1hdGVyaWFsSW5kZXgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1lc2hPckdyb3VwO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZSB1c2Ugb2YgYEtIUl9tYXRlcmlhbHNfdW5saXRgIGZyb20gaXRzIGBtYXRlcmlhbHNgIGlmIHRoZSBtYXRlcmlhbCBpcyB1c2luZyBNVG9vbi5cbiAgICpcbiAgICogU2luY2UgR0xURkxvYWRlciBoYXZlIHNvIG1hbnkgaGFyZGNvZGVkIHByb2NlZHVyZSByZWxhdGVkIHRvIGBLSFJfbWF0ZXJpYWxzX3VubGl0YFxuICAgKiB3ZSBoYXZlIHRvIGRlbGV0ZSB0aGUgZXh0ZW5zaW9uIGJlZm9yZSB3ZSBzdGFydCB0byBwYXJzZSB0aGUgZ2xURi5cbiAgICovXG4gIHByaXZhdGUgX3JlbW92ZVVubGl0RXh0ZW5zaW9uSWZNVG9vbkV4aXN0cygpOiB2b2lkIHtcbiAgICBjb25zdCBwYXJzZXIgPSB0aGlzLnBhcnNlcjtcbiAgICBjb25zdCBqc29uID0gcGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAgIGNvbnN0IG1hdGVyaWFsRGVmcyA9IGpzb24ubWF0ZXJpYWxzO1xuICAgIG1hdGVyaWFsRGVmcz8ubWFwKChtYXRlcmlhbERlZiwgaU1hdGVyaWFsKSA9PiB7XG4gICAgICBjb25zdCBleHRlbnNpb24gPSB0aGlzLl9nZXRNVG9vbkV4dGVuc2lvbihpTWF0ZXJpYWwpO1xuXG4gICAgICBpZiAoZXh0ZW5zaW9uICYmIG1hdGVyaWFsRGVmLmV4dGVuc2lvbnM/LlsnS0hSX21hdGVyaWFsc191bmxpdCddKSB7XG4gICAgICAgIGRlbGV0ZSBtYXRlcmlhbERlZi5leHRlbnNpb25zWydLSFJfbWF0ZXJpYWxzX3VubGl0J107XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2dldE1Ub29uRXh0ZW5zaW9uKG1hdGVyaWFsSW5kZXg6IG51bWJlcik6IFYxTVRvb25TY2hlbWEuVlJNQ01hdGVyaWFsc01Ub29uIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBwYXJzZXIgPSB0aGlzLnBhcnNlcjtcbiAgICBjb25zdCBqc29uID0gcGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAgIGNvbnN0IG1hdGVyaWFsRGVmID0ganNvbi5tYXRlcmlhbHM/LlttYXRlcmlhbEluZGV4XTtcblxuICAgIGlmIChtYXRlcmlhbERlZiA9PSBudWxsKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIGBNVG9vbk1hdGVyaWFsTG9hZGVyUGx1Z2luOiBBdHRlbXB0IHRvIHVzZSBtYXRlcmlhbHNbJHttYXRlcmlhbEluZGV4fV0gb2YgZ2xURiBidXQgdGhlIG1hdGVyaWFsIGRvZXNuJ3QgZXhpc3RgLFxuICAgICAgKTtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgY29uc3QgZXh0ZW5zaW9uID0gbWF0ZXJpYWxEZWYuZXh0ZW5zaW9ucz8uW01Ub29uTWF0ZXJpYWxMb2FkZXJQbHVnaW4uRVhURU5TSU9OX05BTUVdIGFzXG4gICAgICB8IFYxTVRvb25TY2hlbWEuVlJNQ01hdGVyaWFsc01Ub29uXG4gICAgICB8IHVuZGVmaW5lZDtcbiAgICBpZiAoZXh0ZW5zaW9uID09IG51bGwpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgY29uc3Qgc3BlY1ZlcnNpb24gPSBleHRlbnNpb24uc3BlY1ZlcnNpb247XG4gICAgaWYgKCFQT1NTSUJMRV9TUEVDX1ZFUlNJT05TLmhhcyhzcGVjVmVyc2lvbikpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgYE1Ub29uTWF0ZXJpYWxMb2FkZXJQbHVnaW46IFVua25vd24gJHtNVG9vbk1hdGVyaWFsTG9hZGVyUGx1Z2luLkVYVEVOU0lPTl9OQU1FfSBzcGVjVmVyc2lvbiBcIiR7c3BlY1ZlcnNpb259XCJgLFxuICAgICAgKTtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGV4dGVuc2lvbjtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX2V4dGVuZE1hdGVyaWFsUGFyYW1zKFxuICAgIGV4dGVuc2lvbjogVjFNVG9vblNjaGVtYS5WUk1DTWF0ZXJpYWxzTVRvb24sXG4gICAgbWF0ZXJpYWxQYXJhbXM6IE1Ub29uTWF0ZXJpYWxQYXJhbWV0ZXJzLFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBSZW1vdmluZyBtYXRlcmlhbCBwYXJhbXMgdGhhdCBpcyBub3QgcmVxdWlyZWQgdG8gc3VwcmVzcyB3YXJuaW5ncy5cbiAgICBkZWxldGUgKG1hdGVyaWFsUGFyYW1zIGFzIFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsUGFyYW1ldGVycykubWV0YWxuZXNzO1xuICAgIGRlbGV0ZSAobWF0ZXJpYWxQYXJhbXMgYXMgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWxQYXJhbWV0ZXJzKS5yb3VnaG5lc3M7XG5cbiAgICBjb25zdCBhc3NpZ25IZWxwZXIgPSBuZXcgR0xURk1Ub29uTWF0ZXJpYWxQYXJhbXNBc3NpZ25IZWxwZXIodGhpcy5wYXJzZXIsIG1hdGVyaWFsUGFyYW1zKTtcblxuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25QcmltaXRpdmUoJ3RyYW5zcGFyZW50V2l0aFpXcml0ZScsIGV4dGVuc2lvbi50cmFuc3BhcmVudFdpdGhaV3JpdGUpO1xuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25Db2xvcignc2hhZGVDb2xvckZhY3RvcicsIGV4dGVuc2lvbi5zaGFkZUNvbG9yRmFjdG9yKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduVGV4dHVyZSgnc2hhZGVNdWx0aXBseVRleHR1cmUnLCBleHRlbnNpb24uc2hhZGVNdWx0aXBseVRleHR1cmUsIHRydWUpO1xuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25QcmltaXRpdmUoJ3NoYWRpbmdTaGlmdEZhY3RvcicsIGV4dGVuc2lvbi5zaGFkaW5nU2hpZnRGYWN0b3IpO1xuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25UZXh0dXJlKCdzaGFkaW5nU2hpZnRUZXh0dXJlJywgZXh0ZW5zaW9uLnNoYWRpbmdTaGlmdFRleHR1cmUsIHRydWUpO1xuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25QcmltaXRpdmUoJ3NoYWRpbmdTaGlmdFRleHR1cmVTY2FsZScsIGV4dGVuc2lvbi5zaGFkaW5nU2hpZnRUZXh0dXJlPy5zY2FsZSk7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnblByaW1pdGl2ZSgnc2hhZGluZ1Rvb255RmFjdG9yJywgZXh0ZW5zaW9uLnNoYWRpbmdUb29ueUZhY3Rvcik7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnblByaW1pdGl2ZSgnZ2lFcXVhbGl6YXRpb25GYWN0b3InLCBleHRlbnNpb24uZ2lFcXVhbGl6YXRpb25GYWN0b3IpO1xuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25Db2xvcignbWF0Y2FwRmFjdG9yJywgZXh0ZW5zaW9uLm1hdGNhcEZhY3Rvcik7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnblRleHR1cmUoJ21hdGNhcFRleHR1cmUnLCBleHRlbnNpb24ubWF0Y2FwVGV4dHVyZSwgdHJ1ZSk7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnbkNvbG9yKCdwYXJhbWV0cmljUmltQ29sb3JGYWN0b3InLCBleHRlbnNpb24ucGFyYW1ldHJpY1JpbUNvbG9yRmFjdG9yKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduVGV4dHVyZSgncmltTXVsdGlwbHlUZXh0dXJlJywgZXh0ZW5zaW9uLnJpbU11bHRpcGx5VGV4dHVyZSwgdHJ1ZSk7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnblByaW1pdGl2ZSgncmltTGlnaHRpbmdNaXhGYWN0b3InLCBleHRlbnNpb24ucmltTGlnaHRpbmdNaXhGYWN0b3IpO1xuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25QcmltaXRpdmUoJ3BhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJGYWN0b3InLCBleHRlbnNpb24ucGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlckZhY3Rvcik7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnblByaW1pdGl2ZSgncGFyYW1ldHJpY1JpbUxpZnRGYWN0b3InLCBleHRlbnNpb24ucGFyYW1ldHJpY1JpbUxpZnRGYWN0b3IpO1xuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25QcmltaXRpdmUoJ291dGxpbmVXaWR0aE1vZGUnLCBleHRlbnNpb24ub3V0bGluZVdpZHRoTW9kZSBhcyBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZSk7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnblByaW1pdGl2ZSgnb3V0bGluZVdpZHRoRmFjdG9yJywgZXh0ZW5zaW9uLm91dGxpbmVXaWR0aEZhY3Rvcik7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnblRleHR1cmUoJ291dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZScsIGV4dGVuc2lvbi5vdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmUsIGZhbHNlKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduQ29sb3IoJ291dGxpbmVDb2xvckZhY3RvcicsIGV4dGVuc2lvbi5vdXRsaW5lQ29sb3JGYWN0b3IpO1xuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25QcmltaXRpdmUoJ291dGxpbmVMaWdodGluZ01peEZhY3RvcicsIGV4dGVuc2lvbi5vdXRsaW5lTGlnaHRpbmdNaXhGYWN0b3IpO1xuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25UZXh0dXJlKCd1dkFuaW1hdGlvbk1hc2tUZXh0dXJlJywgZXh0ZW5zaW9uLnV2QW5pbWF0aW9uTWFza1RleHR1cmUsIGZhbHNlKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduUHJpbWl0aXZlKCd1dkFuaW1hdGlvblNjcm9sbFhTcGVlZEZhY3RvcicsIGV4dGVuc2lvbi51dkFuaW1hdGlvblNjcm9sbFhTcGVlZEZhY3Rvcik7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnblByaW1pdGl2ZSgndXZBbmltYXRpb25TY3JvbGxZU3BlZWRGYWN0b3InLCBleHRlbnNpb24udXZBbmltYXRpb25TY3JvbGxZU3BlZWRGYWN0b3IpO1xuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25QcmltaXRpdmUoJ3V2QW5pbWF0aW9uUm90YXRpb25TcGVlZEZhY3RvcicsIGV4dGVuc2lvbi51dkFuaW1hdGlvblJvdGF0aW9uU3BlZWRGYWN0b3IpO1xuXG4gICAgYXNzaWduSGVscGVyLmFzc2lnblByaW1pdGl2ZSgndjBDb21wYXRTaGFkZScsIHRoaXMudjBDb21wYXRTaGFkZSk7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnblByaW1pdGl2ZSgnZGVidWdNb2RlJywgdGhpcy5kZWJ1Z01vZGUpO1xuXG4gICAgYXdhaXQgYXNzaWduSGVscGVyLnBlbmRpbmc7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyB3aWxsIGRvIHR3byBwcm9jZXNzZXMgdGhhdCBpcyByZXF1aXJlZCB0byByZW5kZXIgTVRvb24gcHJvcGVybHkuXG4gICAqXG4gICAqIC0gU2V0IHJlbmRlciBvcmRlclxuICAgKiAtIEdlbmVyYXRlIG91dGxpbmVcbiAgICpcbiAgICogQHBhcmFtIG1lc2ggQSB0YXJnZXQgR0xURiBwcmltaXRpdmVcbiAgICogQHBhcmFtIG1hdGVyaWFsSW5kZXggVGhlIG1hdGVyaWFsIGluZGV4IG9mIHRoZSBwcmltaXRpdmVcbiAgICovXG4gIHByaXZhdGUgX3NldHVwUHJpbWl0aXZlKG1lc2g6IFRIUkVFLk1lc2gsIG1hdGVyaWFsSW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IGV4dGVuc2lvbiA9IHRoaXMuX2dldE1Ub29uRXh0ZW5zaW9uKG1hdGVyaWFsSW5kZXgpO1xuICAgIGlmIChleHRlbnNpb24pIHtcbiAgICAgIGNvbnN0IHJlbmRlck9yZGVyID0gdGhpcy5fcGFyc2VSZW5kZXJPcmRlcihleHRlbnNpb24pO1xuICAgICAgbWVzaC5yZW5kZXJPcmRlciA9IHJlbmRlck9yZGVyICsgdGhpcy5yZW5kZXJPcmRlck9mZnNldDtcblxuICAgICAgdGhpcy5fZ2VuZXJhdGVPdXRsaW5lKG1lc2gpO1xuXG4gICAgICB0aGlzLl9hZGRUb01hdGVyaWFsU2V0KG1lc2gpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIHdoZXRoZXIgdGhlIG1hdGVyaWFsIHNob3VsZCBnZW5lcmF0ZSBvdXRsaW5lIG9yIG5vdC5cbiAgICogQHBhcmFtIHN1cmZhY2VNYXRlcmlhbCBUaGUgbWF0ZXJpYWwgdG8gY2hlY2tcbiAgICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgbWF0ZXJpYWwgc2hvdWxkIGdlbmVyYXRlIG91dGxpbmVcbiAgICovXG4gIHByaXZhdGUgX3Nob3VsZEdlbmVyYXRlT3V0bGluZShzdXJmYWNlTWF0ZXJpYWw6IFRIUkVFLk1hdGVyaWFsKTogYm9vbGVhbiB7XG4gICAgLy8gd2UgbWlnaHQgcmVjZWl2ZSBNVG9vbk5vZGVNYXRlcmlhbCBhcyB3ZWxsIGFzIE1Ub29uTWF0ZXJpYWxcbiAgICAvLyBzbyB3ZSdyZSBnb25uYSBkdWNrIHR5cGUgdG8gY2hlY2sgaWYgaXQncyBjb21wYXRpYmxlIHdpdGggTVRvb24gdHlwZSBvdXRsaW5lc1xuICAgIHJldHVybiAoXG4gICAgICB0eXBlb2YgKHN1cmZhY2VNYXRlcmlhbCBhcyBhbnkpLm91dGxpbmVXaWR0aE1vZGUgPT09ICdzdHJpbmcnICYmXG4gICAgICAoc3VyZmFjZU1hdGVyaWFsIGFzIGFueSkub3V0bGluZVdpZHRoTW9kZSAhPT0gJ25vbmUnICYmXG4gICAgICB0eXBlb2YgKHN1cmZhY2VNYXRlcmlhbCBhcyBhbnkpLm91dGxpbmVXaWR0aEZhY3RvciA9PT0gJ251bWJlcicgJiZcbiAgICAgIChzdXJmYWNlTWF0ZXJpYWwgYXMgYW55KS5vdXRsaW5lV2lkdGhGYWN0b3IgPiAwLjBcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlIG91dGxpbmUgZm9yIHRoZSBnaXZlbiBtZXNoLCBpZiBpdCBuZWVkcy5cbiAgICpcbiAgICogQHBhcmFtIG1lc2ggVGhlIHRhcmdldCBtZXNoXG4gICAqL1xuICBwcml2YXRlIF9nZW5lcmF0ZU91dGxpbmUobWVzaDogVEhSRUUuTWVzaCk6IHZvaWQge1xuICAgIC8vIE9LLCBpdCdzIHRoZSBoYWNreSBwYXJ0LlxuICAgIC8vIFdlIGFyZSBnb2luZyB0byBkdXBsaWNhdGUgdGhlIE1Ub29uTWF0ZXJpYWwgZm9yIG91dGxpbmUgdXNlLlxuICAgIC8vIFRoZW4gd2UgYXJlIGdvaW5nIHRvIGNyZWF0ZSB0d28gZ2VvbWV0cnkgZ3JvdXBzIGFuZCByZWZlciBzYW1lIGJ1ZmZlciBidXQgZGlmZmVyZW50IG1hdGVyaWFsLlxuICAgIC8vIEl0J3MgaG93IHdlIGRyYXcgdHdvIG1hdGVyaWFscyBhdCBvbmNlIHVzaW5nIGEgc2luZ2xlIG1lc2guXG5cbiAgICAvLyBtYWtlIHN1cmUgdGhlIG1hdGVyaWFsIGlzIHNpbmdsZVxuICAgIGNvbnN0IHN1cmZhY2VNYXRlcmlhbCA9IG1lc2gubWF0ZXJpYWw7XG4gICAgaWYgKCEoc3VyZmFjZU1hdGVyaWFsIGluc3RhbmNlb2YgVEhSRUUuTWF0ZXJpYWwpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9zaG91bGRHZW5lcmF0ZU91dGxpbmUoc3VyZmFjZU1hdGVyaWFsKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIG1ha2UgaXRzIG1hdGVyaWFsIGFuIGFycmF5XG4gICAgbWVzaC5tYXRlcmlhbCA9IFtzdXJmYWNlTWF0ZXJpYWxdOyAvLyBtZXNoLm1hdGVyaWFsIGlzIGd1YXJhbnRlZWQgdG8gYmUgYSBNYXRlcmlhbCBpbiBHTFRGTG9hZGVyXG5cbiAgICAvLyBkdXBsaWNhdGUgdGhlIG1hdGVyaWFsIGZvciBvdXRsaW5lIHVzZVxuICAgIGNvbnN0IG91dGxpbmVNYXRlcmlhbCA9IHN1cmZhY2VNYXRlcmlhbC5jbG9uZSgpO1xuICAgIG91dGxpbmVNYXRlcmlhbC5uYW1lICs9ICcgKE91dGxpbmUpJztcbiAgICAob3V0bGluZU1hdGVyaWFsIGFzIGFueSkuaXNPdXRsaW5lID0gdHJ1ZTtcbiAgICBvdXRsaW5lTWF0ZXJpYWwuc2lkZSA9IFRIUkVFLkJhY2tTaWRlO1xuICAgIG1lc2gubWF0ZXJpYWwucHVzaChvdXRsaW5lTWF0ZXJpYWwpO1xuXG4gICAgLy8gbWFrZSB0d28gZ2VvbWV0cnkgZ3JvdXBzIG91dCBvZiBhIHNhbWUgYnVmZmVyXG4gICAgY29uc3QgZ2VvbWV0cnkgPSBtZXNoLmdlb21ldHJ5OyAvLyBtZXNoLmdlb21ldHJ5IGlzIGd1YXJhbnRlZWQgdG8gYmUgYSBCdWZmZXJHZW9tZXRyeSBpbiBHTFRGTG9hZGVyXG4gICAgY29uc3QgcHJpbWl0aXZlVmVydGljZXMgPSBnZW9tZXRyeS5pbmRleCA/IGdlb21ldHJ5LmluZGV4LmNvdW50IDogZ2VvbWV0cnkuYXR0cmlidXRlcy5wb3NpdGlvbi5jb3VudCAvIDM7XG4gICAgZ2VvbWV0cnkuYWRkR3JvdXAoMCwgcHJpbWl0aXZlVmVydGljZXMsIDApO1xuICAgIGdlb21ldHJ5LmFkZEdyb3VwKDAsIHByaW1pdGl2ZVZlcnRpY2VzLCAxKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFRvTWF0ZXJpYWxTZXQobWVzaDogVEhSRUUuTWVzaCk6IHZvaWQge1xuICAgIGNvbnN0IG1hdGVyaWFsT3JNYXRlcmlhbHMgPSBtZXNoLm1hdGVyaWFsO1xuICAgIGNvbnN0IG1hdGVyaWFsU2V0ID0gbmV3IFNldDxUSFJFRS5NYXRlcmlhbD4oKTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KG1hdGVyaWFsT3JNYXRlcmlhbHMpKSB7XG4gICAgICBtYXRlcmlhbE9yTWF0ZXJpYWxzLmZvckVhY2goKG1hdGVyaWFsKSA9PiBtYXRlcmlhbFNldC5hZGQobWF0ZXJpYWwpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWF0ZXJpYWxTZXQuYWRkKG1hdGVyaWFsT3JNYXRlcmlhbHMpO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgbWF0ZXJpYWwgb2YgbWF0ZXJpYWxTZXQpIHtcbiAgICAgIHRoaXMuX21Ub29uTWF0ZXJpYWxTZXQuYWRkKG1hdGVyaWFsKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZVJlbmRlck9yZGVyKGV4dGVuc2lvbjogVjFNVG9vblNjaGVtYS5WUk1DTWF0ZXJpYWxzTVRvb24pOiBudW1iZXIge1xuICAgIC8vIHRyYW5zcGFyZW50V2l0aFpXcml0ZSByYW5nZXMgZnJvbSAwIHRvICs5XG4gICAgLy8gbWVyZSB0cmFuc3BhcmVudCByYW5nZXMgZnJvbSAtOSB0byAwXG4gICAgY29uc3QgZW5hYmxlZFpXcml0ZSA9IGV4dGVuc2lvbi50cmFuc3BhcmVudFdpdGhaV3JpdGU7XG4gICAgcmV0dXJuIChlbmFibGVkWldyaXRlID8gMCA6IDE5KSArIChleHRlbnNpb24ucmVuZGVyUXVldWVPZmZzZXROdW1iZXIgPz8gMCk7XG4gIH1cbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBHTFRGUGFyc2VyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlci5qcyc7XG5pbXBvcnQgeyBNVG9vbk1hdGVyaWFsUGFyYW1ldGVycyB9IGZyb20gJy4vTVRvb25NYXRlcmlhbFBhcmFtZXRlcnMnO1xuaW1wb3J0IHsgc2V0VGV4dHVyZUNvbG9yU3BhY2UgfSBmcm9tICcuL3V0aWxzL3NldFRleHR1cmVDb2xvclNwYWNlJztcblxuLyoqXG4gKiBNYXRlcmlhbFBhcmFtZXRlcnMgaGF0ZXMgYHVuZGVmaW5lZGAuIFRoaXMgaGVscGVyIGF1dG9tYXRpY2FsbHkgcmVqZWN0cyBhc3NpZ24gb2YgdGhlc2UgYHVuZGVmaW5lZGAuXG4gKiBJdCBhbHNvIGhhbmRsZXMgYXN5bmNocm9ub3VzIHByb2Nlc3Mgb2YgdGV4dHVyZXMuXG4gKiBNYWtlIHN1cmUgYXdhaXQgZm9yIHtAbGluayBHTFRGTVRvb25NYXRlcmlhbFBhcmFtc0Fzc2lnbkhlbHBlci5wZW5kaW5nfS5cbiAqL1xuZXhwb3J0IGNsYXNzIEdMVEZNVG9vbk1hdGVyaWFsUGFyYW1zQXNzaWduSGVscGVyIHtcbiAgcHJpdmF0ZSByZWFkb25seSBfcGFyc2VyOiBHTFRGUGFyc2VyO1xuICBwcml2YXRlIF9tYXRlcmlhbFBhcmFtczogTVRvb25NYXRlcmlhbFBhcmFtZXRlcnM7XG4gIHByaXZhdGUgX3BlbmRpbmdzOiBQcm9taXNlPGFueT5bXTtcblxuICBwdWJsaWMgZ2V0IHBlbmRpbmcoKTogUHJvbWlzZTx1bmtub3duPiB7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHRoaXMuX3BlbmRpbmdzKTtcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJzZXI6IEdMVEZQYXJzZXIsIG1hdGVyaWFsUGFyYW1zOiBNVG9vbk1hdGVyaWFsUGFyYW1ldGVycykge1xuICAgIHRoaXMuX3BhcnNlciA9IHBhcnNlcjtcbiAgICB0aGlzLl9tYXRlcmlhbFBhcmFtcyA9IG1hdGVyaWFsUGFyYW1zO1xuICAgIHRoaXMuX3BlbmRpbmdzID0gW107XG4gIH1cblxuICBwdWJsaWMgYXNzaWduUHJpbWl0aXZlPFQgZXh0ZW5kcyBrZXlvZiBNVG9vbk1hdGVyaWFsUGFyYW1ldGVycz4oa2V5OiBULCB2YWx1ZTogTVRvb25NYXRlcmlhbFBhcmFtZXRlcnNbVF0pOiB2b2lkIHtcbiAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fbWF0ZXJpYWxQYXJhbXNba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3NpZ25Db2xvcjxUIGV4dGVuZHMga2V5b2YgTVRvb25NYXRlcmlhbFBhcmFtZXRlcnM+KFxuICAgIGtleTogVCxcbiAgICB2YWx1ZTogbnVtYmVyW10gfCB1bmRlZmluZWQsXG4gICAgY29udmVydFNSR0JUb0xpbmVhcj86IGJvb2xlYW4sXG4gICk6IHZvaWQge1xuICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICBjb25zdCBjb2xvciA9IG5ldyBUSFJFRS5Db2xvcigpLmZyb21BcnJheSh2YWx1ZSk7XG5cbiAgICAgIGlmIChjb252ZXJ0U1JHQlRvTGluZWFyKSB7XG4gICAgICAgIGNvbG9yLmNvbnZlcnRTUkdCVG9MaW5lYXIoKTtcbiAgICAgIH1cbiAgICAgICh0aGlzLl9tYXRlcmlhbFBhcmFtcyBhcyBhbnkpW2tleV0gPSBjb2xvcjtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgYXNzaWduVGV4dHVyZTxUIGV4dGVuZHMga2V5b2YgTVRvb25NYXRlcmlhbFBhcmFtZXRlcnM+KFxuICAgIGtleTogVCxcbiAgICBzY2hlbWFUZXh0dXJlOiB7IGluZGV4OiBudW1iZXIgfSB8IHVuZGVmaW5lZCxcbiAgICBpc0NvbG9yVGV4dHVyZTogYm9vbGVhbixcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcHJvbWlzZSA9IChhc3luYyAoKSA9PiB7XG4gICAgICBpZiAoc2NoZW1hVGV4dHVyZSAhPSBudWxsKSB7XG4gICAgICAgIGNvbnN0IHRleHR1cmUgPSBhd2FpdCB0aGlzLl9wYXJzZXIuYXNzaWduVGV4dHVyZSh0aGlzLl9tYXRlcmlhbFBhcmFtcywga2V5LCBzY2hlbWFUZXh0dXJlKTtcblxuICAgICAgICAvLyBlYXJseSBhYm9ydCBpZiB0ZXh0dXJlIGZhaWxlZCB0byBsb2FkXG4gICAgICAgIGlmICh0ZXh0dXJlID09IG51bGwpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICAnR0xURk1Ub29uTWF0ZXJpYWxQYXJhbXNBc3NpZ25IZWxwZXI6IEZhaWxlZCB0byBsb2FkIHRleHR1cmUuIFRoZSByZW5kZXJpbmcgcmVzdWx0IG1heSBiZSB3cm9uZycsXG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNDb2xvclRleHR1cmUpIHtcbiAgICAgICAgICBzZXRUZXh0dXJlQ29sb3JTcGFjZSh0ZXh0dXJlLCAnc3JnYicpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSkoKTtcblxuICAgIHRoaXMuX3BlbmRpbmdzLnB1c2gocHJvbWlzZSk7XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBhc3NpZ25UZXh0dXJlQnlJbmRleDxUIGV4dGVuZHMga2V5b2YgTVRvb25NYXRlcmlhbFBhcmFtZXRlcnM+KFxuICAgIGtleTogVCxcbiAgICB0ZXh0dXJlSW5kZXg6IG51bWJlciB8IHVuZGVmaW5lZCxcbiAgICBpc0NvbG9yVGV4dHVyZTogYm9vbGVhbixcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuYXNzaWduVGV4dHVyZShrZXksIHRleHR1cmVJbmRleCAhPSBudWxsID8geyBpbmRleDogdGV4dHVyZUluZGV4IH0gOiB1bmRlZmluZWQsIGlzQ29sb3JUZXh0dXJlKTtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuY29uc3QgY29sb3JTcGFjZUVuY29kaW5nTWFwOiBSZWNvcmQ8JycgfCAnc3JnYicsIGFueT4gPSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cbiAgJyc6IDMwMDAsXG4gIHNyZ2I6IDMwMDEsXG59O1xuXG4vKipcbiAqIEEgY29tcGF0IGZ1bmN0aW9uIHRvIHNldCB0ZXh0dXJlIGNvbG9yIHNwYWNlLlxuICpcbiAqIENPTVBBVDogcHJlLXIxNTJcbiAqIFN0YXJ0aW5nIGZyb20gVGhyZWUuanMgcjE1MiwgYHRleHR1cmUuZW5jb2RpbmdgIGlzIHJlbmFtZWQgdG8gYHRleHR1cmUuY29sb3JTcGFjZWAuXG4gKiBUaGlzIGZ1bmN0aW9uIHdpbGwgaGFuZGxlIHRoZSBjb21hcHQuXG4gKlxuICogQHBhcmFtIHRleHR1cmUgVGhlIHRleHR1cmUgeW91IHdhbnQgdG8gc2V0IHRoZSBjb2xvciBzcGFjZSB0b1xuICogQHBhcmFtIGNvbG9yU3BhY2UgVGhlIGNvbG9yIHNwYWNlIHlvdSB3YW50IHRvIHNldCB0byB0aGUgdGV4dHVyZVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0VGV4dHVyZUNvbG9yU3BhY2UodGV4dHVyZTogVEhSRUUuVGV4dHVyZSwgY29sb3JTcGFjZTogJycgfCAnc3JnYicpOiB2b2lkIHtcbiAgaWYgKHBhcnNlSW50KFRIUkVFLlJFVklTSU9OLCAxMCkgPj0gMTUyKSB7XG4gICAgdGV4dHVyZS5jb2xvclNwYWNlID0gY29sb3JTcGFjZTtcbiAgfSBlbHNlIHtcbiAgICAodGV4dHVyZSBhcyBhbnkpLmVuY29kaW5nID0gY29sb3JTcGFjZUVuY29kaW5nTWFwW2NvbG9yU3BhY2VdO1xuICB9XG59XG4iLCAiLyogdHNsaW50OmRpc2FibGU6bWVtYmVyLW9yZGVyaW5nICovXG5cbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB2ZXJ0ZXhTaGFkZXIgZnJvbSAnLi9zaGFkZXJzL210b29uLnZlcnQnO1xuaW1wb3J0IGZyYWdtZW50U2hhZGVyIGZyb20gJy4vc2hhZGVycy9tdG9vbi5mcmFnJztcbmltcG9ydCB7IE1Ub29uTWF0ZXJpYWxEZWJ1Z01vZGUgfSBmcm9tICcuL01Ub29uTWF0ZXJpYWxEZWJ1Z01vZGUnO1xuaW1wb3J0IHsgTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUgfSBmcm9tICcuL01Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlJztcbmltcG9ydCB0eXBlIHsgTVRvb25NYXRlcmlhbFBhcmFtZXRlcnMgfSBmcm9tICcuL01Ub29uTWF0ZXJpYWxQYXJhbWV0ZXJzJztcbmltcG9ydCB7IGdldFRleHR1cmVDb2xvclNwYWNlIH0gZnJvbSAnLi91dGlscy9nZXRUZXh0dXJlQ29sb3JTcGFjZSc7XG5cbi8qKlxuICogTVRvb24gaXMgYSBtYXRlcmlhbCBzcGVjaWZpY2F0aW9uIHRoYXQgaGFzIHZhcmlvdXMgZmVhdHVyZXMuXG4gKiBUaGUgc3BlYyBhbmQgaW1wbGVtZW50YXRpb24gYXJlIG9yaWdpbmFsbHkgZm91bmRlZCBmb3IgVW5pdHkgZW5naW5lIGFuZCB0aGlzIGlzIGEgcG9ydCBvZiB0aGUgbWF0ZXJpYWwuXG4gKlxuICogU2VlOiBodHRwczovL2dpdGh1Yi5jb20vU2FudGFyaC9NVG9vblxuICovXG5leHBvcnQgY2xhc3MgTVRvb25NYXRlcmlhbCBleHRlbmRzIFRIUkVFLlNoYWRlck1hdGVyaWFsIHtcbiAgcHVibGljIHVuaWZvcm1zOiB7XG4gICAgbGl0RmFjdG9yOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5Db2xvcj47XG4gICAgYWxwaGFUZXN0OiBUSFJFRS5JVW5pZm9ybTxudW1iZXI+O1xuICAgIG9wYWNpdHk6IFRIUkVFLklVbmlmb3JtPG51bWJlcj47XG4gICAgbWFwOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5UZXh0dXJlIHwgbnVsbD47XG4gICAgbWFwVXZUcmFuc2Zvcm06IFRIUkVFLklVbmlmb3JtPFRIUkVFLk1hdHJpeDM+O1xuICAgIG5vcm1hbE1hcDogVEhSRUUuSVVuaWZvcm08VEhSRUUuVGV4dHVyZSB8IG51bGw+O1xuICAgIG5vcm1hbE1hcFV2VHJhbnNmb3JtOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5NYXRyaXgzPjtcbiAgICBub3JtYWxTY2FsZTogVEhSRUUuSVVuaWZvcm08VEhSRUUuVmVjdG9yMj47XG4gICAgZW1pc3NpdmU6IFRIUkVFLklVbmlmb3JtPFRIUkVFLkNvbG9yPjtcbiAgICBlbWlzc2l2ZUludGVuc2l0eTogVEhSRUUuSVVuaWZvcm08bnVtYmVyPjtcbiAgICBlbWlzc2l2ZU1hcDogVEhSRUUuSVVuaWZvcm08VEhSRUUuVGV4dHVyZSB8IG51bGw+O1xuICAgIGVtaXNzaXZlTWFwVXZUcmFuc2Zvcm06IFRIUkVFLklVbmlmb3JtPFRIUkVFLk1hdHJpeDM+O1xuICAgIHNoYWRlQ29sb3JGYWN0b3I6IFRIUkVFLklVbmlmb3JtPFRIUkVFLkNvbG9yPjtcbiAgICBzaGFkZU11bHRpcGx5VGV4dHVyZTogVEhSRUUuSVVuaWZvcm08VEhSRUUuVGV4dHVyZSB8IG51bGw+O1xuICAgIHNoYWRlTXVsdGlwbHlUZXh0dXJlVXZUcmFuc2Zvcm06IFRIUkVFLklVbmlmb3JtPFRIUkVFLk1hdHJpeDM+O1xuICAgIHNoYWRpbmdTaGlmdEZhY3RvcjogVEhSRUUuSVVuaWZvcm08bnVtYmVyPjtcbiAgICBzaGFkaW5nU2hpZnRUZXh0dXJlOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5UZXh0dXJlIHwgbnVsbD47XG4gICAgc2hhZGluZ1NoaWZ0VGV4dHVyZVV2VHJhbnNmb3JtOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5NYXRyaXgzPjtcbiAgICBzaGFkaW5nU2hpZnRUZXh0dXJlU2NhbGU6IFRIUkVFLklVbmlmb3JtPG51bWJlcj47XG4gICAgc2hhZGluZ1Rvb255RmFjdG9yOiBUSFJFRS5JVW5pZm9ybTxudW1iZXI+O1xuICAgIGdpRXF1YWxpemF0aW9uRmFjdG9yOiBUSFJFRS5JVW5pZm9ybTxudW1iZXI+O1xuICAgIG1hdGNhcEZhY3RvcjogVEhSRUUuSVVuaWZvcm08VEhSRUUuQ29sb3I+O1xuICAgIG1hdGNhcFRleHR1cmU6IFRIUkVFLklVbmlmb3JtPFRIUkVFLlRleHR1cmUgfCBudWxsPjtcbiAgICBtYXRjYXBUZXh0dXJlVXZUcmFuc2Zvcm06IFRIUkVFLklVbmlmb3JtPFRIUkVFLk1hdHJpeDM+O1xuICAgIHBhcmFtZXRyaWNSaW1Db2xvckZhY3RvcjogVEhSRUUuSVVuaWZvcm08VEhSRUUuQ29sb3I+O1xuICAgIHJpbU11bHRpcGx5VGV4dHVyZTogVEhSRUUuSVVuaWZvcm08VEhSRUUuVGV4dHVyZSB8IG51bGw+O1xuICAgIHJpbU11bHRpcGx5VGV4dHVyZVV2VHJhbnNmb3JtOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5NYXRyaXgzPjtcbiAgICByaW1MaWdodGluZ01peEZhY3RvcjogVEhSRUUuSVVuaWZvcm08bnVtYmVyPjtcbiAgICBwYXJhbWV0cmljUmltRnJlc25lbFBvd2VyRmFjdG9yOiBUSFJFRS5JVW5pZm9ybTxudW1iZXI+O1xuICAgIHBhcmFtZXRyaWNSaW1MaWZ0RmFjdG9yOiBUSFJFRS5JVW5pZm9ybTxudW1iZXI+O1xuICAgIG91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZTogVEhSRUUuSVVuaWZvcm08VEhSRUUuVGV4dHVyZSB8IG51bGw+O1xuICAgIG91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZVV2VHJhbnNmb3JtOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5NYXRyaXgzPjtcbiAgICBvdXRsaW5lV2lkdGhGYWN0b3I6IFRIUkVFLklVbmlmb3JtPG51bWJlcj47XG4gICAgb3V0bGluZUNvbG9yRmFjdG9yOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5Db2xvcj47XG4gICAgb3V0bGluZUxpZ2h0aW5nTWl4RmFjdG9yOiBUSFJFRS5JVW5pZm9ybTxudW1iZXI+O1xuICAgIHV2QW5pbWF0aW9uTWFza1RleHR1cmU6IFRIUkVFLklVbmlmb3JtPFRIUkVFLlRleHR1cmUgfCBudWxsPjtcbiAgICB1dkFuaW1hdGlvbk1hc2tUZXh0dXJlVXZUcmFuc2Zvcm06IFRIUkVFLklVbmlmb3JtPFRIUkVFLk1hdHJpeDM+O1xuICAgIHV2QW5pbWF0aW9uU2Nyb2xsWE9mZnNldDogVEhSRUUuSVVuaWZvcm08bnVtYmVyPjtcbiAgICB1dkFuaW1hdGlvblNjcm9sbFlPZmZzZXQ6IFRIUkVFLklVbmlmb3JtPG51bWJlcj47XG4gICAgdXZBbmltYXRpb25Sb3RhdGlvblBoYXNlOiBUSFJFRS5JVW5pZm9ybTxudW1iZXI+O1xuICB9O1xuXG4gIHB1YmxpYyBnZXQgY29sb3IoKTogVEhSRUUuQ29sb3Ige1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLmxpdEZhY3Rvci52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IGNvbG9yKHZhbHVlOiBUSFJFRS5Db2xvcikge1xuICAgIHRoaXMudW5pZm9ybXMubGl0RmFjdG9yLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG1hcCgpOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMubWFwLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgbWFwKHZhbHVlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCkge1xuICAgIHRoaXMudW5pZm9ybXMubWFwLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG5vcm1hbE1hcCgpOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMubm9ybWFsTWFwLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgbm9ybWFsTWFwKHZhbHVlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCkge1xuICAgIHRoaXMudW5pZm9ybXMubm9ybWFsTWFwLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG5vcm1hbFNjYWxlKCk6IFRIUkVFLlZlY3RvcjIge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLm5vcm1hbFNjYWxlLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgbm9ybWFsU2NhbGUodmFsdWU6IFRIUkVFLlZlY3RvcjIpIHtcbiAgICB0aGlzLnVuaWZvcm1zLm5vcm1hbFNjYWxlLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGVtaXNzaXZlKCk6IFRIUkVFLkNvbG9yIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5lbWlzc2l2ZS52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IGVtaXNzaXZlKHZhbHVlOiBUSFJFRS5Db2xvcikge1xuICAgIHRoaXMudW5pZm9ybXMuZW1pc3NpdmUudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgZW1pc3NpdmVJbnRlbnNpdHkoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5lbWlzc2l2ZUludGVuc2l0eS52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IGVtaXNzaXZlSW50ZW5zaXR5KHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLnVuaWZvcm1zLmVtaXNzaXZlSW50ZW5zaXR5LnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGVtaXNzaXZlTWFwKCk6IFRIUkVFLlRleHR1cmUgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5lbWlzc2l2ZU1hcC52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IGVtaXNzaXZlTWFwKHZhbHVlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCkge1xuICAgIHRoaXMudW5pZm9ybXMuZW1pc3NpdmVNYXAudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc2hhZGVDb2xvckZhY3RvcigpOiBUSFJFRS5Db2xvciB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMuc2hhZGVDb2xvckZhY3Rvci52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IHNoYWRlQ29sb3JGYWN0b3IodmFsdWU6IFRIUkVFLkNvbG9yKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5zaGFkZUNvbG9yRmFjdG9yLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHNoYWRlTXVsdGlwbHlUZXh0dXJlKCk6IFRIUkVFLlRleHR1cmUgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5zaGFkZU11bHRpcGx5VGV4dHVyZS52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IHNoYWRlTXVsdGlwbHlUZXh0dXJlKHZhbHVlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCkge1xuICAgIHRoaXMudW5pZm9ybXMuc2hhZGVNdWx0aXBseVRleHR1cmUudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc2hhZGluZ1NoaWZ0RmFjdG9yKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMuc2hhZGluZ1NoaWZ0RmFjdG9yLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgc2hhZGluZ1NoaWZ0RmFjdG9yKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLnVuaWZvcm1zLnNoYWRpbmdTaGlmdEZhY3Rvci52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBzaGFkaW5nU2hpZnRUZXh0dXJlKCk6IFRIUkVFLlRleHR1cmUgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5zaGFkaW5nU2hpZnRUZXh0dXJlLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgc2hhZGluZ1NoaWZ0VGV4dHVyZSh2YWx1ZTogVEhSRUUuVGV4dHVyZSB8IG51bGwpIHtcbiAgICB0aGlzLnVuaWZvcm1zLnNoYWRpbmdTaGlmdFRleHR1cmUudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc2hhZGluZ1NoaWZ0VGV4dHVyZVNjYWxlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMuc2hhZGluZ1NoaWZ0VGV4dHVyZVNjYWxlLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgc2hhZGluZ1NoaWZ0VGV4dHVyZVNjYWxlKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLnVuaWZvcm1zLnNoYWRpbmdTaGlmdFRleHR1cmVTY2FsZS52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBzaGFkaW5nVG9vbnlGYWN0b3IoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5zaGFkaW5nVG9vbnlGYWN0b3IudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCBzaGFkaW5nVG9vbnlGYWN0b3IodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMudW5pZm9ybXMuc2hhZGluZ1Rvb255RmFjdG9yLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGdpRXF1YWxpemF0aW9uRmFjdG9yKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMuZ2lFcXVhbGl6YXRpb25GYWN0b3IudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCBnaUVxdWFsaXphdGlvbkZhY3Rvcih2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5naUVxdWFsaXphdGlvbkZhY3Rvci52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBtYXRjYXBGYWN0b3IoKTogVEhSRUUuQ29sb3Ige1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLm1hdGNhcEZhY3Rvci52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IG1hdGNhcEZhY3Rvcih2YWx1ZTogVEhSRUUuQ29sb3IpIHtcbiAgICB0aGlzLnVuaWZvcm1zLm1hdGNhcEZhY3Rvci52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBtYXRjYXBUZXh0dXJlKCk6IFRIUkVFLlRleHR1cmUgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5tYXRjYXBUZXh0dXJlLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgbWF0Y2FwVGV4dHVyZSh2YWx1ZTogVEhSRUUuVGV4dHVyZSB8IG51bGwpIHtcbiAgICB0aGlzLnVuaWZvcm1zLm1hdGNhcFRleHR1cmUudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcGFyYW1ldHJpY1JpbUNvbG9yRmFjdG9yKCk6IFRIUkVFLkNvbG9yIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5wYXJhbWV0cmljUmltQ29sb3JGYWN0b3IudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCBwYXJhbWV0cmljUmltQ29sb3JGYWN0b3IodmFsdWU6IFRIUkVFLkNvbG9yKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5wYXJhbWV0cmljUmltQ29sb3JGYWN0b3IudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcmltTXVsdGlwbHlUZXh0dXJlKCk6IFRIUkVFLlRleHR1cmUgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5yaW1NdWx0aXBseVRleHR1cmUudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCByaW1NdWx0aXBseVRleHR1cmUodmFsdWU6IFRIUkVFLlRleHR1cmUgfCBudWxsKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5yaW1NdWx0aXBseVRleHR1cmUudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcmltTGlnaHRpbmdNaXhGYWN0b3IoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5yaW1MaWdodGluZ01peEZhY3Rvci52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IHJpbUxpZ2h0aW5nTWl4RmFjdG9yKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLnVuaWZvcm1zLnJpbUxpZ2h0aW5nTWl4RmFjdG9yLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJGYWN0b3IoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5wYXJhbWV0cmljUmltRnJlc25lbFBvd2VyRmFjdG9yLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgcGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlckZhY3Rvcih2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5wYXJhbWV0cmljUmltRnJlc25lbFBvd2VyRmFjdG9yLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHBhcmFtZXRyaWNSaW1MaWZ0RmFjdG9yKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMucGFyYW1ldHJpY1JpbUxpZnRGYWN0b3IudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCBwYXJhbWV0cmljUmltTGlmdEZhY3Rvcih2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5wYXJhbWV0cmljUmltTGlmdEZhY3Rvci52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBvdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmUoKTogVEhSRUUuVGV4dHVyZSB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLm91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZS52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IG91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZSh2YWx1ZTogVEhSRUUuVGV4dHVyZSB8IG51bGwpIHtcbiAgICB0aGlzLnVuaWZvcm1zLm91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZS52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBvdXRsaW5lV2lkdGhGYWN0b3IoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5vdXRsaW5lV2lkdGhGYWN0b3IudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCBvdXRsaW5lV2lkdGhGYWN0b3IodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMudW5pZm9ybXMub3V0bGluZVdpZHRoRmFjdG9yLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG91dGxpbmVDb2xvckZhY3RvcigpOiBUSFJFRS5Db2xvciB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMub3V0bGluZUNvbG9yRmFjdG9yLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgb3V0bGluZUNvbG9yRmFjdG9yKHZhbHVlOiBUSFJFRS5Db2xvcikge1xuICAgIHRoaXMudW5pZm9ybXMub3V0bGluZUNvbG9yRmFjdG9yLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG91dGxpbmVMaWdodGluZ01peEZhY3RvcigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLm91dGxpbmVMaWdodGluZ01peEZhY3Rvci52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IG91dGxpbmVMaWdodGluZ01peEZhY3Rvcih2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5vdXRsaW5lTGlnaHRpbmdNaXhGYWN0b3IudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdXZBbmltYXRpb25NYXNrVGV4dHVyZSgpOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMudXZBbmltYXRpb25NYXNrVGV4dHVyZS52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IHV2QW5pbWF0aW9uTWFza1RleHR1cmUodmFsdWU6IFRIUkVFLlRleHR1cmUgfCBudWxsKSB7XG4gICAgdGhpcy51bmlmb3Jtcy51dkFuaW1hdGlvbk1hc2tUZXh0dXJlLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHV2QW5pbWF0aW9uU2Nyb2xsWE9mZnNldCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLnV2QW5pbWF0aW9uU2Nyb2xsWE9mZnNldC52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IHV2QW5pbWF0aW9uU2Nyb2xsWE9mZnNldCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy51bmlmb3Jtcy51dkFuaW1hdGlvblNjcm9sbFhPZmZzZXQudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdXZBbmltYXRpb25TY3JvbGxZT2Zmc2V0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMudXZBbmltYXRpb25TY3JvbGxZT2Zmc2V0LnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgdXZBbmltYXRpb25TY3JvbGxZT2Zmc2V0KHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLnVuaWZvcm1zLnV2QW5pbWF0aW9uU2Nyb2xsWU9mZnNldC52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCB1dkFuaW1hdGlvblJvdGF0aW9uUGhhc2UoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy51dkFuaW1hdGlvblJvdGF0aW9uUGhhc2UudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCB1dkFuaW1hdGlvblJvdGF0aW9uUGhhc2UodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMudW5pZm9ybXMudXZBbmltYXRpb25Sb3RhdGlvblBoYXNlLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgdXZBbmltYXRpb25TY3JvbGxYU3BlZWRGYWN0b3IgPSAwLjA7XG4gIHB1YmxpYyB1dkFuaW1hdGlvblNjcm9sbFlTcGVlZEZhY3RvciA9IDAuMDtcbiAgcHVibGljIHV2QW5pbWF0aW9uUm90YXRpb25TcGVlZEZhY3RvciA9IDAuMDtcblxuICAvKipcbiAgICogV2hldGhlciB0aGUgbWF0ZXJpYWwgaXMgYWZmZWN0ZWQgYnkgZm9nLlxuICAgKiBgdHJ1ZWAgYnkgZGVmYXVsdC5cbiAgICovXG4gIHB1YmxpYyBmb2cgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBXaWxsIGJlIHJlYWQgaW4gV2ViR0xQcm9ncmFtc1xuICAgKlxuICAgKiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvYmxvYi80ZjUyMzZhYzNkNmY0MWQ5MDRhYTU4NDAxYjQwNTU0ZThmYmRjYjE1L3NyYy9yZW5kZXJlcnMvd2ViZ2wvV2ViR0xQcm9ncmFtcy5qcyNMMTkwLUwxOTFcbiAgICovXG4gIHB1YmxpYyBub3JtYWxNYXBUeXBlID0gVEhSRUUuVGFuZ2VudFNwYWNlTm9ybWFsTWFwO1xuXG4gIC8qKlxuICAgKiBXaGVuIHRoaXMgaXMgYHRydWVgLCB2ZXJ0ZXggY29sb3JzIHdpbGwgYmUgaWdub3JlZC5cbiAgICogYHRydWVgIGJ5IGRlZmF1bHQuXG4gICAqL1xuICBwcml2YXRlIF9pZ25vcmVWZXJ0ZXhDb2xvciA9IHRydWU7XG5cbiAgLyoqXG4gICAqIFdoZW4gdGhpcyBpcyBgdHJ1ZWAsIHZlcnRleCBjb2xvcnMgd2lsbCBiZSBpZ25vcmVkLlxuICAgKiBgdHJ1ZWAgYnkgZGVmYXVsdC5cbiAgICovXG4gIHB1YmxpYyBnZXQgaWdub3JlVmVydGV4Q29sb3IoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2lnbm9yZVZlcnRleENvbG9yO1xuICB9XG4gIHB1YmxpYyBzZXQgaWdub3JlVmVydGV4Q29sb3IodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9pZ25vcmVWZXJ0ZXhDb2xvciA9IHZhbHVlO1xuXG4gICAgdGhpcy5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIF92MENvbXBhdFNoYWRlID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFRoZXJlIGlzIGEgbGluZSBvZiB0aGUgc2hhZGVyIGNhbGxlZCBcImNvbW1lbnQgb3V0IGlmIHlvdSB3YW50IHRvIFBCUiBhYnNvbHV0ZWx5XCIgaW4gVlJNMC4wIE1Ub29uLlxuICAgKiBXaGVuIHRoaXMgaXMgdHJ1ZSwgdGhlIG1hdGVyaWFsIGVuYWJsZXMgdGhlIGxpbmUgdG8gbWFrZSBpdCBjb21wYXRpYmxlIHdpdGggdGhlIGxlZ2FjeSByZW5kZXJpbmcgb2YgVlJNLlxuICAgKiBVc3VhbGx5IG5vdCByZWNvbW1lbmRlZCB0byB0dXJuIHRoaXMgb24uXG4gICAqIGBmYWxzZWAgYnkgZGVmYXVsdC5cbiAgICovXG4gIGdldCB2MENvbXBhdFNoYWRlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl92MENvbXBhdFNoYWRlO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZXJlIGlzIGEgbGluZSBvZiB0aGUgc2hhZGVyIGNhbGxlZCBcImNvbW1lbnQgb3V0IGlmIHlvdSB3YW50IHRvIFBCUiBhYnNvbHV0ZWx5XCIgaW4gVlJNMC4wIE1Ub29uLlxuICAgKiBXaGVuIHRoaXMgaXMgdHJ1ZSwgdGhlIG1hdGVyaWFsIGVuYWJsZXMgdGhlIGxpbmUgdG8gbWFrZSBpdCBjb21wYXRpYmxlIHdpdGggdGhlIGxlZ2FjeSByZW5kZXJpbmcgb2YgVlJNLlxuICAgKiBVc3VhbGx5IG5vdCByZWNvbW1lbmRlZCB0byB0dXJuIHRoaXMgb24uXG4gICAqIGBmYWxzZWAgYnkgZGVmYXVsdC5cbiAgICovXG4gIHNldCB2MENvbXBhdFNoYWRlKHY6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl92MENvbXBhdFNoYWRlID0gdjtcblxuICAgIHRoaXMubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfZGVidWdNb2RlOiBNVG9vbk1hdGVyaWFsRGVidWdNb2RlID0gTVRvb25NYXRlcmlhbERlYnVnTW9kZS5Ob25lO1xuXG4gIC8qKlxuICAgKiBEZWJ1ZyBtb2RlIGZvciB0aGUgbWF0ZXJpYWwuXG4gICAqIFlvdSBjYW4gdmlzdWFsaXplIHNldmVyYWwgY29tcG9uZW50cyBmb3IgZGlhZ25vc2lzIHVzaW5nIGRlYnVnIG1vZGUuXG4gICAqXG4gICAqIFNlZToge0BsaW5rIE1Ub29uTWF0ZXJpYWxEZWJ1Z01vZGV9XG4gICAqL1xuICBnZXQgZGVidWdNb2RlKCk6IE1Ub29uTWF0ZXJpYWxEZWJ1Z01vZGUge1xuICAgIHJldHVybiB0aGlzLl9kZWJ1Z01vZGU7XG4gIH1cblxuICAvKipcbiAgICogRGVidWcgbW9kZSBmb3IgdGhlIG1hdGVyaWFsLlxuICAgKiBZb3UgY2FuIHZpc3VhbGl6ZSBzZXZlcmFsIGNvbXBvbmVudHMgZm9yIGRpYWdub3NpcyB1c2luZyBkZWJ1ZyBtb2RlLlxuICAgKlxuICAgKiBTZWU6IHtAbGluayBNVG9vbk1hdGVyaWFsRGVidWdNb2RlfVxuICAgKi9cbiAgc2V0IGRlYnVnTW9kZShtOiBNVG9vbk1hdGVyaWFsRGVidWdNb2RlKSB7XG4gICAgdGhpcy5fZGVidWdNb2RlID0gbTtcblxuICAgIHRoaXMubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfb3V0bGluZVdpZHRoTW9kZTogTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUgPSBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZS5Ob25lO1xuXG4gIGdldCBvdXRsaW5lV2lkdGhNb2RlKCk6IE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlIHtcbiAgICByZXR1cm4gdGhpcy5fb3V0bGluZVdpZHRoTW9kZTtcbiAgfVxuICBzZXQgb3V0bGluZVdpZHRoTW9kZShtOiBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZSkge1xuICAgIHRoaXMuX291dGxpbmVXaWR0aE1vZGUgPSBtO1xuXG4gICAgdGhpcy5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIF9pc091dGxpbmUgPSBmYWxzZTtcblxuICBnZXQgaXNPdXRsaW5lKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc091dGxpbmU7XG4gIH1cbiAgc2V0IGlzT3V0bGluZShiOiBib29sZWFuKSB7XG4gICAgdGhpcy5faXNPdXRsaW5lID0gYjtcblxuICAgIHRoaXMubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlYWRvbmx5IGJvb2xlYW4gdGhhdCBpbmRpY2F0ZXMgdGhpcyBpcyBhIHtAbGluayBNVG9vbk1hdGVyaWFsfS5cbiAgICovXG4gIHB1YmxpYyBnZXQgaXNNVG9vbk1hdGVyaWFsKCk6IHRydWUge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgY29uc3RydWN0b3IocGFyYW1ldGVyczogTVRvb25NYXRlcmlhbFBhcmFtZXRlcnMgPSB7fSkge1xuICAgIHN1cGVyKHsgdmVydGV4U2hhZGVyLCBmcmFnbWVudFNoYWRlciB9KTtcblxuICAgIC8vIG92ZXJyaWRlIGRlcHRoV3JpdGUgd2l0aCB0cmFuc3BhcmVudFdpdGhaV3JpdGVcbiAgICBpZiAocGFyYW1ldGVycy50cmFuc3BhcmVudFdpdGhaV3JpdGUpIHtcbiAgICAgIHBhcmFtZXRlcnMuZGVwdGhXcml0ZSA9IHRydWU7XG4gICAgfVxuICAgIGRlbGV0ZSBwYXJhbWV0ZXJzLnRyYW5zcGFyZW50V2l0aFpXcml0ZTtcblxuICAgIC8vID09IGVuYWJsaW5nIGJ1bmNoIG9mIHN0dWZmID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHBhcmFtZXRlcnMuZm9nID0gdHJ1ZTtcbiAgICBwYXJhbWV0ZXJzLmxpZ2h0cyA9IHRydWU7XG4gICAgcGFyYW1ldGVycy5jbGlwcGluZyA9IHRydWU7XG5cbiAgICAvLyA9PSB1bmlmb3JtcyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICB0aGlzLnVuaWZvcm1zID0gVEhSRUUuVW5pZm9ybXNVdGlscy5tZXJnZShbXG4gICAgICBUSFJFRS5Vbmlmb3Jtc0xpYi5jb21tb24sIC8vIG1hcFxuICAgICAgVEhSRUUuVW5pZm9ybXNMaWIubm9ybWFsbWFwLCAvLyBub3JtYWxNYXBcbiAgICAgIFRIUkVFLlVuaWZvcm1zTGliLmVtaXNzaXZlbWFwLCAvLyBlbWlzc2l2ZU1hcFxuICAgICAgVEhSRUUuVW5pZm9ybXNMaWIuZm9nLFxuICAgICAgVEhSRUUuVW5pZm9ybXNMaWIubGlnaHRzLFxuICAgICAge1xuICAgICAgICBsaXRGYWN0b3I6IHsgdmFsdWU6IG5ldyBUSFJFRS5Db2xvcigxLjAsIDEuMCwgMS4wKSB9LFxuICAgICAgICBtYXBVdlRyYW5zZm9ybTogeyB2YWx1ZTogbmV3IFRIUkVFLk1hdHJpeDMoKSB9LFxuICAgICAgICBjb2xvckFscGhhOiB7IHZhbHVlOiAxLjAgfSxcbiAgICAgICAgbm9ybWFsTWFwVXZUcmFuc2Zvcm06IHsgdmFsdWU6IG5ldyBUSFJFRS5NYXRyaXgzKCkgfSxcbiAgICAgICAgc2hhZGVDb2xvckZhY3RvcjogeyB2YWx1ZTogbmV3IFRIUkVFLkNvbG9yKDAuMCwgMC4wLCAwLjApIH0sXG4gICAgICAgIHNoYWRlTXVsdGlwbHlUZXh0dXJlOiB7IHZhbHVlOiBudWxsIH0sXG4gICAgICAgIHNoYWRlTXVsdGlwbHlUZXh0dXJlVXZUcmFuc2Zvcm06IHsgdmFsdWU6IG5ldyBUSFJFRS5NYXRyaXgzKCkgfSxcbiAgICAgICAgc2hhZGluZ1NoaWZ0RmFjdG9yOiB7IHZhbHVlOiAwLjAgfSxcbiAgICAgICAgc2hhZGluZ1NoaWZ0VGV4dHVyZTogeyB2YWx1ZTogbnVsbCB9LFxuICAgICAgICBzaGFkaW5nU2hpZnRUZXh0dXJlVXZUcmFuc2Zvcm06IHsgdmFsdWU6IG5ldyBUSFJFRS5NYXRyaXgzKCkgfSxcbiAgICAgICAgc2hhZGluZ1NoaWZ0VGV4dHVyZVNjYWxlOiB7IHZhbHVlOiAxLjAgfSxcbiAgICAgICAgc2hhZGluZ1Rvb255RmFjdG9yOiB7IHZhbHVlOiAwLjkgfSxcbiAgICAgICAgZ2lFcXVhbGl6YXRpb25GYWN0b3I6IHsgdmFsdWU6IDAuOSB9LFxuICAgICAgICBtYXRjYXBGYWN0b3I6IHsgdmFsdWU6IG5ldyBUSFJFRS5Db2xvcigxLjAsIDEuMCwgMS4wKSB9LFxuICAgICAgICBtYXRjYXBUZXh0dXJlOiB7IHZhbHVlOiBudWxsIH0sXG4gICAgICAgIG1hdGNhcFRleHR1cmVVdlRyYW5zZm9ybTogeyB2YWx1ZTogbmV3IFRIUkVFLk1hdHJpeDMoKSB9LFxuICAgICAgICBwYXJhbWV0cmljUmltQ29sb3JGYWN0b3I6IHsgdmFsdWU6IG5ldyBUSFJFRS5Db2xvcigwLjAsIDAuMCwgMC4wKSB9LFxuICAgICAgICByaW1NdWx0aXBseVRleHR1cmU6IHsgdmFsdWU6IG51bGwgfSxcbiAgICAgICAgcmltTXVsdGlwbHlUZXh0dXJlVXZUcmFuc2Zvcm06IHsgdmFsdWU6IG5ldyBUSFJFRS5NYXRyaXgzKCkgfSxcbiAgICAgICAgcmltTGlnaHRpbmdNaXhGYWN0b3I6IHsgdmFsdWU6IDEuMCB9LFxuICAgICAgICBwYXJhbWV0cmljUmltRnJlc25lbFBvd2VyRmFjdG9yOiB7IHZhbHVlOiA1LjAgfSxcbiAgICAgICAgcGFyYW1ldHJpY1JpbUxpZnRGYWN0b3I6IHsgdmFsdWU6IDAuMCB9LFxuICAgICAgICBlbWlzc2l2ZTogeyB2YWx1ZTogbmV3IFRIUkVFLkNvbG9yKDAuMCwgMC4wLCAwLjApIH0sXG4gICAgICAgIGVtaXNzaXZlSW50ZW5zaXR5OiB7IHZhbHVlOiAxLjAgfSxcbiAgICAgICAgZW1pc3NpdmVNYXBVdlRyYW5zZm9ybTogeyB2YWx1ZTogbmV3IFRIUkVFLk1hdHJpeDMoKSB9LFxuICAgICAgICBvdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmU6IHsgdmFsdWU6IG51bGwgfSxcbiAgICAgICAgb3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlVXZUcmFuc2Zvcm06IHsgdmFsdWU6IG5ldyBUSFJFRS5NYXRyaXgzKCkgfSxcbiAgICAgICAgb3V0bGluZVdpZHRoRmFjdG9yOiB7IHZhbHVlOiAwLjAgfSxcbiAgICAgICAgb3V0bGluZUNvbG9yRmFjdG9yOiB7IHZhbHVlOiBuZXcgVEhSRUUuQ29sb3IoMC4wLCAwLjAsIDAuMCkgfSxcbiAgICAgICAgb3V0bGluZUxpZ2h0aW5nTWl4RmFjdG9yOiB7IHZhbHVlOiAxLjAgfSxcbiAgICAgICAgdXZBbmltYXRpb25NYXNrVGV4dHVyZTogeyB2YWx1ZTogbnVsbCB9LFxuICAgICAgICB1dkFuaW1hdGlvbk1hc2tUZXh0dXJlVXZUcmFuc2Zvcm06IHsgdmFsdWU6IG5ldyBUSFJFRS5NYXRyaXgzKCkgfSxcbiAgICAgICAgdXZBbmltYXRpb25TY3JvbGxYT2Zmc2V0OiB7IHZhbHVlOiAwLjAgfSxcbiAgICAgICAgdXZBbmltYXRpb25TY3JvbGxZT2Zmc2V0OiB7IHZhbHVlOiAwLjAgfSxcbiAgICAgICAgdXZBbmltYXRpb25Sb3RhdGlvblBoYXNlOiB7IHZhbHVlOiAwLjAgfSxcbiAgICAgIH0sXG4gICAgICBwYXJhbWV0ZXJzLnVuaWZvcm1zID8/IHt9LFxuICAgIF0pIGFzIHR5cGVvZiBNVG9vbk1hdGVyaWFsLnByb3RvdHlwZS51bmlmb3JtcztcblxuICAgIC8vID09IGZpbmFsbHkgY29tcGlsZSB0aGUgc2hhZGVyIHByb2dyYW0gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHRoaXMuc2V0VmFsdWVzKHBhcmFtZXRlcnMpO1xuXG4gICAgLy8gPT0gdXBsb2FkIHVuaWZvcm1zIHRoYXQgbmVlZCB0byB1cGxvYWQgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgdGhpcy5fdXBsb2FkVW5pZm9ybXNXb3JrYXJvdW5kKCk7XG5cbiAgICAvLyA9PSB1cGRhdGUgc2hhZGVyIHN0dWZmID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICB0aGlzLmN1c3RvbVByb2dyYW1DYWNoZUtleSA9ICgpID0+XG4gICAgICBbXG4gICAgICAgIC4uLk9iamVjdC5lbnRyaWVzKHRoaXMuX2dlbmVyYXRlRGVmaW5lcygpKS5tYXAoKFt0b2tlbiwgbWFjcm9dKSA9PiBgJHt0b2tlbn06JHttYWNyb31gKSxcbiAgICAgICAgdGhpcy5tYXRjYXBUZXh0dXJlID8gYG1hdGNhcFRleHR1cmVDb2xvclNwYWNlOiR7Z2V0VGV4dHVyZUNvbG9yU3BhY2UodGhpcy5tYXRjYXBUZXh0dXJlKX1gIDogJycsXG4gICAgICAgIHRoaXMuc2hhZGVNdWx0aXBseVRleHR1cmVcbiAgICAgICAgICA/IGBzaGFkZU11bHRpcGx5VGV4dHVyZUNvbG9yU3BhY2U6JHtnZXRUZXh0dXJlQ29sb3JTcGFjZSh0aGlzLnNoYWRlTXVsdGlwbHlUZXh0dXJlKX1gXG4gICAgICAgICAgOiAnJyxcbiAgICAgICAgdGhpcy5yaW1NdWx0aXBseVRleHR1cmUgPyBgcmltTXVsdGlwbHlUZXh0dXJlQ29sb3JTcGFjZToke2dldFRleHR1cmVDb2xvclNwYWNlKHRoaXMucmltTXVsdGlwbHlUZXh0dXJlKX1gIDogJycsXG4gICAgICBdLmpvaW4oJywnKTtcblxuICAgIHRoaXMub25CZWZvcmVDb21waWxlID0gKHNoYWRlcikgPT4ge1xuICAgICAgY29uc3QgdGhyZWVSZXZpc2lvbiA9IHBhcnNlSW50KFRIUkVFLlJFVklTSU9OLCAxMCk7XG5cbiAgICAgIGNvbnN0IGRlZmluZXMgPVxuICAgICAgICBPYmplY3QuZW50cmllcyh7IC4uLnRoaXMuX2dlbmVyYXRlRGVmaW5lcygpLCAuLi50aGlzLmRlZmluZXMgfSlcbiAgICAgICAgICAuZmlsdGVyKChbdG9rZW4sIG1hY3JvXSkgPT4gISFtYWNybylcbiAgICAgICAgICAubWFwKChbdG9rZW4sIG1hY3JvXSkgPT4gYCNkZWZpbmUgJHt0b2tlbn0gJHttYWNyb31gKVxuICAgICAgICAgIC5qb2luKCdcXG4nKSArICdcXG4nO1xuXG4gICAgICAvLyAtLSBnZW5lcmF0ZSBzaGFkZXIgY29kZSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICBzaGFkZXIudmVydGV4U2hhZGVyID0gZGVmaW5lcyArIHNoYWRlci52ZXJ0ZXhTaGFkZXI7XG4gICAgICBzaGFkZXIuZnJhZ21lbnRTaGFkZXIgPSBkZWZpbmVzICsgc2hhZGVyLmZyYWdtZW50U2hhZGVyO1xuXG4gICAgICAvLyAtLSBjb21wYXQgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgIC8vIENPTVBBVDogcHJlLXIxNTRcbiAgICAgIC8vIFRocmVlLmpzIHIxNTQgcmVuYW1lcyB0aGUgc2hhZGVyIGNodW5rIDxjb2xvcnNwYWNlX2ZyYWdtZW50PiB0byA8ZW5jb2RpbmdzX2ZyYWdtZW50PlxuICAgICAgaWYgKHRocmVlUmV2aXNpb24gPCAxNTQpIHtcbiAgICAgICAgc2hhZGVyLmZyYWdtZW50U2hhZGVyID0gc2hhZGVyLmZyYWdtZW50U2hhZGVyLnJlcGxhY2UoXG4gICAgICAgICAgJyNpbmNsdWRlIDxjb2xvcnNwYWNlX2ZyYWdtZW50PicsXG4gICAgICAgICAgJyNpbmNsdWRlIDxlbmNvZGluZ3NfZnJhZ21lbnQ+JyxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGlzIG1hdGVyaWFsLlxuICAgKlxuICAgKiBAcGFyYW0gZGVsdGEgZGVsdGFUaW1lIHNpbmNlIGxhc3QgdXBkYXRlXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl91cGxvYWRVbmlmb3Jtc1dvcmthcm91bmQoKTtcbiAgICB0aGlzLl91cGRhdGVVVkFuaW1hdGlvbihkZWx0YSk7XG4gIH1cblxuICBwdWJsaWMgY29weShzb3VyY2U6IHRoaXMpOiB0aGlzIHtcbiAgICBzdXBlci5jb3B5KHNvdXJjZSk7XG4gICAgLy8gdW5pZm9ybXMgYXJlIGFscmVhZHkgY29waWVkIGF0IHRoaXMgbW9tZW50XG5cbiAgICAvLyBCZWdpbm5pbmcgZnJvbSByMTMzLCB1bmlmb3JtIHRleHR1cmVzIHdpbGwgYmUgY2xvbmVkIGluc3RlYWQgb2YgcmVmZXJlbmNlXG4gICAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vbXJkb29iL3RocmVlLmpzL2Jsb2IvYTg4MTNiZTA0YTg0OWJkMTU1ZjdjZjZmMWIyM2Q4ZWUyZTBmYjQ4Yi9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyLmpzI0wzMDQ3XG4gICAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vbXJkb29iL3RocmVlLmpzL2Jsb2IvYTg4MTNiZTA0YTg0OWJkMTU1ZjdjZjZmMWIyM2Q4ZWUyZTBmYjQ4Yi9zcmMvcmVuZGVyZXJzL3NoYWRlcnMvVW5pZm9ybXNVdGlscy5qcyNMMjJcbiAgICAvLyBUaGlzIHdpbGwgbGVhdmUgdGhlaXIgYC52ZXJzaW9uYCB0byBiZSBgMGBcbiAgICAvLyBhbmQgdGhlc2UgdGV4dHVyZXMgd29uJ3QgYmUgdXBsb2FkZWQgdG8gR1BVXG4gICAgLy8gV2UgYXJlIGdvaW5nIHRvIHdvcmthcm91bmQgdGhpcyBpbiBoZXJlXG4gICAgLy8gSSd2ZSBvcGVuZWQgYW4gaXNzdWUgZm9yIHRoaXM6IGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvaXNzdWVzLzIyNzE4XG4gICAgdGhpcy5tYXAgPSBzb3VyY2UubWFwO1xuICAgIHRoaXMubm9ybWFsTWFwID0gc291cmNlLm5vcm1hbE1hcDtcbiAgICB0aGlzLmVtaXNzaXZlTWFwID0gc291cmNlLmVtaXNzaXZlTWFwO1xuICAgIHRoaXMuc2hhZGVNdWx0aXBseVRleHR1cmUgPSBzb3VyY2Uuc2hhZGVNdWx0aXBseVRleHR1cmU7XG4gICAgdGhpcy5zaGFkaW5nU2hpZnRUZXh0dXJlID0gc291cmNlLnNoYWRpbmdTaGlmdFRleHR1cmU7XG4gICAgdGhpcy5tYXRjYXBUZXh0dXJlID0gc291cmNlLm1hdGNhcFRleHR1cmU7XG4gICAgdGhpcy5yaW1NdWx0aXBseVRleHR1cmUgPSBzb3VyY2UucmltTXVsdGlwbHlUZXh0dXJlO1xuICAgIHRoaXMub3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlID0gc291cmNlLm91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZTtcbiAgICB0aGlzLnV2QW5pbWF0aW9uTWFza1RleHR1cmUgPSBzb3VyY2UudXZBbmltYXRpb25NYXNrVGV4dHVyZTtcblxuICAgIC8vID09IGNvcHkgbWVtYmVycyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHRoaXMubm9ybWFsTWFwVHlwZSA9IHNvdXJjZS5ub3JtYWxNYXBUeXBlO1xuXG4gICAgdGhpcy51dkFuaW1hdGlvblNjcm9sbFhTcGVlZEZhY3RvciA9IHNvdXJjZS51dkFuaW1hdGlvblNjcm9sbFhTcGVlZEZhY3RvcjtcbiAgICB0aGlzLnV2QW5pbWF0aW9uU2Nyb2xsWVNwZWVkRmFjdG9yID0gc291cmNlLnV2QW5pbWF0aW9uU2Nyb2xsWVNwZWVkRmFjdG9yO1xuICAgIHRoaXMudXZBbmltYXRpb25Sb3RhdGlvblNwZWVkRmFjdG9yID0gc291cmNlLnV2QW5pbWF0aW9uUm90YXRpb25TcGVlZEZhY3RvcjtcblxuICAgIHRoaXMuaWdub3JlVmVydGV4Q29sb3IgPSBzb3VyY2UuaWdub3JlVmVydGV4Q29sb3I7XG5cbiAgICB0aGlzLnYwQ29tcGF0U2hhZGUgPSBzb3VyY2UudjBDb21wYXRTaGFkZTtcbiAgICB0aGlzLmRlYnVnTW9kZSA9IHNvdXJjZS5kZWJ1Z01vZGU7XG4gICAgdGhpcy5vdXRsaW5lV2lkdGhNb2RlID0gc291cmNlLm91dGxpbmVXaWR0aE1vZGU7XG5cbiAgICB0aGlzLmlzT3V0bGluZSA9IHNvdXJjZS5pc091dGxpbmU7XG5cbiAgICAvLyA9PSB1cGRhdGUgc2hhZGVyIHN0dWZmID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICB0aGlzLm5lZWRzVXBkYXRlID0gdHJ1ZTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBVViBhbmltYXRpb24gc3RhdGUuXG4gICAqIEludGVuZGVkIHRvIGJlIGNhbGxlZCB2aWEge0BsaW5rIHVwZGF0ZX0uXG4gICAqIEBwYXJhbSBkZWx0YSBkZWx0YVRpbWVcbiAgICovXG4gIHByaXZhdGUgX3VwZGF0ZVVWQW5pbWF0aW9uKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnVuaWZvcm1zLnV2QW5pbWF0aW9uU2Nyb2xsWE9mZnNldC52YWx1ZSArPSBkZWx0YSAqIHRoaXMudXZBbmltYXRpb25TY3JvbGxYU3BlZWRGYWN0b3I7XG4gICAgdGhpcy51bmlmb3Jtcy51dkFuaW1hdGlvblNjcm9sbFlPZmZzZXQudmFsdWUgKz0gZGVsdGEgKiB0aGlzLnV2QW5pbWF0aW9uU2Nyb2xsWVNwZWVkRmFjdG9yO1xuICAgIHRoaXMudW5pZm9ybXMudXZBbmltYXRpb25Sb3RhdGlvblBoYXNlLnZhbHVlICs9IGRlbHRhICogdGhpcy51dkFuaW1hdGlvblJvdGF0aW9uU3BlZWRGYWN0b3I7XG4gICAgdGhpcy51bmlmb3Jtcy5hbHBoYVRlc3QudmFsdWUgPSB0aGlzLmFscGhhVGVzdDtcblxuICAgIHRoaXMudW5pZm9ybXNOZWVkVXBkYXRlID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGxvYWQgdW5pZm9ybXMgdGhhdCBuZWVkIHRvIHVwbG9hZCBidXQgZG9lc24ndCBhdXRvbWF0aWNhbGx5IGJlY2F1c2Ugb2YgcmVhc29ucy5cbiAgICogSW50ZW5kZWQgdG8gYmUgY2FsbGVkIHZpYSB7QGxpbmsgY29uc3RydWN0b3J9IGFuZCB7QGxpbmsgdXBkYXRlfS5cbiAgICovXG4gIHByaXZhdGUgX3VwbG9hZFVuaWZvcm1zV29ya2Fyb3VuZCgpOiB2b2lkIHtcbiAgICAvLyB3b3JrYXJvdW5kOiBzaW5jZSBvcGFjaXR5IGlzIGRlZmluZWQgYXMgYSBwcm9wZXJ0eSBpbiBUSFJFRS5NYXRlcmlhbFxuICAgIC8vIGFuZCBjYW5ub3QgYmUgb3ZlcnJpZGRlbiBhcyBhbiBhY2Nlc3NvcixcbiAgICAvLyBXZSBhcmUgZ29pbmcgdG8gdXBkYXRlIG9wYWNpdHkgaGVyZVxuICAgIHRoaXMudW5pZm9ybXMub3BhY2l0eS52YWx1ZSA9IHRoaXMub3BhY2l0eTtcblxuICAgIC8vIHdvcmthcm91bmQ6IHRleHR1cmUgdHJhbnNmb3JtcyBhcmUgbm90IHVwZGF0ZWQgYXV0b21hdGljYWxseVxuICAgIHRoaXMuX3VwZGF0ZVRleHR1cmVNYXRyaXgodGhpcy51bmlmb3Jtcy5tYXAsIHRoaXMudW5pZm9ybXMubWFwVXZUcmFuc2Zvcm0pO1xuICAgIHRoaXMuX3VwZGF0ZVRleHR1cmVNYXRyaXgodGhpcy51bmlmb3Jtcy5ub3JtYWxNYXAsIHRoaXMudW5pZm9ybXMubm9ybWFsTWFwVXZUcmFuc2Zvcm0pO1xuICAgIHRoaXMuX3VwZGF0ZVRleHR1cmVNYXRyaXgodGhpcy51bmlmb3Jtcy5lbWlzc2l2ZU1hcCwgdGhpcy51bmlmb3Jtcy5lbWlzc2l2ZU1hcFV2VHJhbnNmb3JtKTtcbiAgICB0aGlzLl91cGRhdGVUZXh0dXJlTWF0cml4KHRoaXMudW5pZm9ybXMuc2hhZGVNdWx0aXBseVRleHR1cmUsIHRoaXMudW5pZm9ybXMuc2hhZGVNdWx0aXBseVRleHR1cmVVdlRyYW5zZm9ybSk7XG4gICAgdGhpcy5fdXBkYXRlVGV4dHVyZU1hdHJpeCh0aGlzLnVuaWZvcm1zLnNoYWRpbmdTaGlmdFRleHR1cmUsIHRoaXMudW5pZm9ybXMuc2hhZGluZ1NoaWZ0VGV4dHVyZVV2VHJhbnNmb3JtKTtcbiAgICB0aGlzLl91cGRhdGVUZXh0dXJlTWF0cml4KHRoaXMudW5pZm9ybXMubWF0Y2FwVGV4dHVyZSwgdGhpcy51bmlmb3Jtcy5tYXRjYXBUZXh0dXJlVXZUcmFuc2Zvcm0pO1xuICAgIHRoaXMuX3VwZGF0ZVRleHR1cmVNYXRyaXgodGhpcy51bmlmb3Jtcy5yaW1NdWx0aXBseVRleHR1cmUsIHRoaXMudW5pZm9ybXMucmltTXVsdGlwbHlUZXh0dXJlVXZUcmFuc2Zvcm0pO1xuICAgIHRoaXMuX3VwZGF0ZVRleHR1cmVNYXRyaXgoXG4gICAgICB0aGlzLnVuaWZvcm1zLm91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZSxcbiAgICAgIHRoaXMudW5pZm9ybXMub3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlVXZUcmFuc2Zvcm0sXG4gICAgKTtcbiAgICB0aGlzLl91cGRhdGVUZXh0dXJlTWF0cml4KHRoaXMudW5pZm9ybXMudXZBbmltYXRpb25NYXNrVGV4dHVyZSwgdGhpcy51bmlmb3Jtcy51dkFuaW1hdGlvbk1hc2tUZXh0dXJlVXZUcmFuc2Zvcm0pO1xuXG4gICAgdGhpcy51bmlmb3Jtc05lZWRVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBtYXAgb2JqZWN0IG9mIHByZXByb2Nlc3NvciB0b2tlbiBhbmQgbWFjcm8gb2YgdGhlIHNoYWRlciBwcm9ncmFtLlxuICAgKi9cbiAgcHJpdmF0ZSBfZ2VuZXJhdGVEZWZpbmVzKCk6IHsgW3Rva2VuOiBzdHJpbmddOiBib29sZWFuIHwgbnVtYmVyIHwgc3RyaW5nIH0ge1xuICAgIGNvbnN0IHRocmVlUmV2aXNpb24gPSBwYXJzZUludChUSFJFRS5SRVZJU0lPTiwgMTApO1xuXG4gICAgY29uc3QgdXNlVXZJblZlcnQgPSB0aGlzLm91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZSAhPT0gbnVsbDtcbiAgICBjb25zdCB1c2VVdkluRnJhZyA9XG4gICAgICB0aGlzLm1hcCAhPT0gbnVsbCB8fFxuICAgICAgdGhpcy5ub3JtYWxNYXAgIT09IG51bGwgfHxcbiAgICAgIHRoaXMuZW1pc3NpdmVNYXAgIT09IG51bGwgfHxcbiAgICAgIHRoaXMuc2hhZGVNdWx0aXBseVRleHR1cmUgIT09IG51bGwgfHxcbiAgICAgIHRoaXMuc2hhZGluZ1NoaWZ0VGV4dHVyZSAhPT0gbnVsbCB8fFxuICAgICAgdGhpcy5yaW1NdWx0aXBseVRleHR1cmUgIT09IG51bGwgfHxcbiAgICAgIHRoaXMudXZBbmltYXRpb25NYXNrVGV4dHVyZSAhPT0gbnVsbDtcblxuICAgIHJldHVybiB7XG4gICAgICAvLyBUZW1wb3JhcnkgY29tcGF0IGFnYWluc3Qgc2hhZGVyIGNoYW5nZSBAIFRocmVlLmpzIHIxMjZcbiAgICAgIC8vIFNlZTogIzIxMjA1LCAjMjEzMDcsICMyMTI5OVxuICAgICAgVEhSRUVfVlJNX1RIUkVFX1JFVklTSU9OOiB0aHJlZVJldmlzaW9uLFxuXG4gICAgICBPVVRMSU5FOiB0aGlzLl9pc091dGxpbmUsXG4gICAgICBNVE9PTl9VU0VfVVY6IHVzZVV2SW5WZXJ0IHx8IHVzZVV2SW5GcmFnLCAvLyB3ZSBjYW4ndCB1c2UgYFVTRV9VVmAgLCBpdCB3aWxsIGJlIHJlZGVmaW5lZCBpbiBXZWJHTFByb2dyYW0uanNcbiAgICAgIE1UT09OX1VWU19WRVJURVhfT05MWTogdXNlVXZJblZlcnQgJiYgIXVzZVV2SW5GcmFnLFxuICAgICAgVjBfQ09NUEFUX1NIQURFOiB0aGlzLl92MENvbXBhdFNoYWRlLFxuICAgICAgVVNFX1NIQURFTVVMVElQTFlURVhUVVJFOiB0aGlzLnNoYWRlTXVsdGlwbHlUZXh0dXJlICE9PSBudWxsLFxuICAgICAgVVNFX1NIQURJTkdTSElGVFRFWFRVUkU6IHRoaXMuc2hhZGluZ1NoaWZ0VGV4dHVyZSAhPT0gbnVsbCxcbiAgICAgIFVTRV9NQVRDQVBURVhUVVJFOiB0aGlzLm1hdGNhcFRleHR1cmUgIT09IG51bGwsXG4gICAgICBVU0VfUklNTVVMVElQTFlURVhUVVJFOiB0aGlzLnJpbU11bHRpcGx5VGV4dHVyZSAhPT0gbnVsbCxcbiAgICAgIFVTRV9PVVRMSU5FV0lEVEhNVUxUSVBMWVRFWFRVUkU6IHRoaXMuX2lzT3V0bGluZSAmJiB0aGlzLm91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZSAhPT0gbnVsbCxcbiAgICAgIFVTRV9VVkFOSU1BVElPTk1BU0tURVhUVVJFOiB0aGlzLnV2QW5pbWF0aW9uTWFza1RleHR1cmUgIT09IG51bGwsXG4gICAgICBJR05PUkVfVkVSVEVYX0NPTE9SOiB0aGlzLl9pZ25vcmVWZXJ0ZXhDb2xvciA9PT0gdHJ1ZSxcbiAgICAgIERFQlVHX05PUk1BTDogdGhpcy5fZGVidWdNb2RlID09PSAnbm9ybWFsJyxcbiAgICAgIERFQlVHX0xJVFNIQURFUkFURTogdGhpcy5fZGVidWdNb2RlID09PSAnbGl0U2hhZGVSYXRlJyxcbiAgICAgIERFQlVHX1VWOiB0aGlzLl9kZWJ1Z01vZGUgPT09ICd1dicsXG4gICAgICBPVVRMSU5FX1dJRFRIX1NDUkVFTjpcbiAgICAgICAgdGhpcy5faXNPdXRsaW5lICYmIHRoaXMuX291dGxpbmVXaWR0aE1vZGUgPT09IE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlLlNjcmVlbkNvb3JkaW5hdGVzLFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVUZXh0dXJlTWF0cml4KHNyYzogVEhSRUUuSVVuaWZvcm08VEhSRUUuVGV4dHVyZSB8IG51bGw+LCBkc3Q6IFRIUkVFLklVbmlmb3JtPFRIUkVFLk1hdHJpeDM+KTogdm9pZCB7XG4gICAgaWYgKHNyYy52YWx1ZSkge1xuICAgICAgaWYgKHNyYy52YWx1ZS5tYXRyaXhBdXRvVXBkYXRlKSB7XG4gICAgICAgIHNyYy52YWx1ZS51cGRhdGVNYXRyaXgoKTtcbiAgICAgIH1cblxuICAgICAgZHN0LnZhbHVlLmNvcHkoc3JjLnZhbHVlLm1hdHJpeCk7XG4gICAgfVxuICB9XG59XG4iLCAiLy8gI2RlZmluZSBQSE9OR1xuXG52YXJ5aW5nIHZlYzMgdlZpZXdQb3NpdGlvbjtcblxuI2lmbmRlZiBGTEFUX1NIQURFRFxuICB2YXJ5aW5nIHZlYzMgdk5vcm1hbDtcbiNlbmRpZlxuXG4jaW5jbHVkZSA8Y29tbW9uPlxuXG4vLyAjaW5jbHVkZSA8dXZfcGFyc192ZXJ0ZXg+XG4jaWZkZWYgTVRPT05fVVNFX1VWXG4gIHZhcnlpbmcgdmVjMiB2VXY7XG5cbiAgLy8gQ09NUEFUOiBwcmUtcjE1MSB1c2VzIGEgY29tbW9uIHV2VHJhbnNmb3JtXG4gICNpZiBUSFJFRV9WUk1fVEhSRUVfUkVWSVNJT04gPCAxNTFcbiAgICB1bmlmb3JtIG1hdDMgdXZUcmFuc2Zvcm07XG4gICNlbmRpZlxuI2VuZGlmXG5cbi8vICNpbmNsdWRlIDx1djJfcGFyc192ZXJ0ZXg+XG4vLyBDT01BUFQ6IHByZS1yMTUxIHVzZXMgdXYyIGZvciBsaWdodE1hcCBhbmQgYW9NYXBcbiNpZiBUSFJFRV9WUk1fVEhSRUVfUkVWSVNJT04gPCAxNTFcbiAgI2lmIGRlZmluZWQoIFVTRV9MSUdIVE1BUCApIHx8IGRlZmluZWQoIFVTRV9BT01BUCApXG4gICAgYXR0cmlidXRlIHZlYzIgdXYyO1xuICAgIHZhcnlpbmcgdmVjMiB2VXYyO1xuICAgIHVuaWZvcm0gbWF0MyB1djJUcmFuc2Zvcm07XG4gICNlbmRpZlxuI2VuZGlmXG5cbi8vICNpbmNsdWRlIDxkaXNwbGFjZW1lbnRtYXBfcGFyc192ZXJ0ZXg+XG4vLyAjaW5jbHVkZSA8ZW52bWFwX3BhcnNfdmVydGV4PlxuI2luY2x1ZGUgPGNvbG9yX3BhcnNfdmVydGV4PlxuI2luY2x1ZGUgPGZvZ19wYXJzX3ZlcnRleD5cbiNpbmNsdWRlIDxtb3JwaHRhcmdldF9wYXJzX3ZlcnRleD5cbiNpbmNsdWRlIDxza2lubmluZ19wYXJzX3ZlcnRleD5cbiNpbmNsdWRlIDxzaGFkb3dtYXBfcGFyc192ZXJ0ZXg+XG4jaW5jbHVkZSA8bG9nZGVwdGhidWZfcGFyc192ZXJ0ZXg+XG4jaW5jbHVkZSA8Y2xpcHBpbmdfcGxhbmVzX3BhcnNfdmVydGV4PlxuXG4jaWZkZWYgVVNFX09VVExJTkVXSURUSE1VTFRJUExZVEVYVFVSRVxuICB1bmlmb3JtIHNhbXBsZXIyRCBvdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmU7XG4gIHVuaWZvcm0gbWF0MyBvdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmVVdlRyYW5zZm9ybTtcbiNlbmRpZlxuXG51bmlmb3JtIGZsb2F0IG91dGxpbmVXaWR0aEZhY3Rvcjtcblxudm9pZCBtYWluKCkge1xuXG4gIC8vICNpbmNsdWRlIDx1dl92ZXJ0ZXg+XG4gICNpZmRlZiBNVE9PTl9VU0VfVVZcbiAgICAvLyBDT01QQVQ6IHByZS1yMTUxIHVzZXMgYSBjb21tb24gdXZUcmFuc2Zvcm1cbiAgICAjaWYgVEhSRUVfVlJNX1RIUkVFX1JFVklTSU9OID49IDE1MVxuICAgICAgdlV2ID0gdXY7XG4gICAgI2Vsc2VcbiAgICAgIHZVdiA9ICggdXZUcmFuc2Zvcm0gKiB2ZWMzKCB1diwgMSApICkueHk7XG4gICAgI2VuZGlmXG4gICNlbmRpZlxuXG4gIC8vICNpbmNsdWRlIDx1djJfdmVydGV4PlxuICAvLyBDT01BUFQ6IHByZS1yMTUxIHVzZXMgdXYyIGZvciBsaWdodE1hcCBhbmQgYW9NYXBcbiAgI2lmIFRIUkVFX1ZSTV9USFJFRV9SRVZJU0lPTiA8IDE1MVxuICAgICNpZiBkZWZpbmVkKCBVU0VfTElHSFRNQVAgKSB8fCBkZWZpbmVkKCBVU0VfQU9NQVAgKVxuICAgICAgdlV2MiA9ICggdXYyVHJhbnNmb3JtICogdmVjMyggdXYyLCAxICkgKS54eTtcbiAgICAjZW5kaWZcbiAgI2VuZGlmXG5cbiAgI2luY2x1ZGUgPGNvbG9yX3ZlcnRleD5cblxuICAjaW5jbHVkZSA8YmVnaW5ub3JtYWxfdmVydGV4PlxuICAjaW5jbHVkZSA8bW9ycGhub3JtYWxfdmVydGV4PlxuICAjaW5jbHVkZSA8c2tpbmJhc2VfdmVydGV4PlxuICAjaW5jbHVkZSA8c2tpbm5vcm1hbF92ZXJ0ZXg+XG5cbiAgLy8gd2UgbmVlZCB0aGlzIHRvIGNvbXB1dGUgdGhlIG91dGxpbmUgcHJvcGVybHlcbiAgb2JqZWN0Tm9ybWFsID0gbm9ybWFsaXplKCBvYmplY3ROb3JtYWwgKTtcblxuICAjaW5jbHVkZSA8ZGVmYXVsdG5vcm1hbF92ZXJ0ZXg+XG5cbiAgI2lmbmRlZiBGTEFUX1NIQURFRCAvLyBOb3JtYWwgY29tcHV0ZWQgd2l0aCBkZXJpdmF0aXZlcyB3aGVuIEZMQVRfU0hBREVEXG4gICAgdk5vcm1hbCA9IG5vcm1hbGl6ZSggdHJhbnNmb3JtZWROb3JtYWwgKTtcbiAgI2VuZGlmXG5cbiAgI2luY2x1ZGUgPGJlZ2luX3ZlcnRleD5cblxuICAjaW5jbHVkZSA8bW9ycGh0YXJnZXRfdmVydGV4PlxuICAjaW5jbHVkZSA8c2tpbm5pbmdfdmVydGV4PlxuICAvLyAjaW5jbHVkZSA8ZGlzcGxhY2VtZW50bWFwX3ZlcnRleD5cbiAgI2luY2x1ZGUgPHByb2plY3RfdmVydGV4PlxuICAjaW5jbHVkZSA8bG9nZGVwdGhidWZfdmVydGV4PlxuICAjaW5jbHVkZSA8Y2xpcHBpbmdfcGxhbmVzX3ZlcnRleD5cblxuICB2Vmlld1Bvc2l0aW9uID0gLSBtdlBvc2l0aW9uLnh5ejtcblxuICAjaWZkZWYgT1VUTElORVxuICAgIGZsb2F0IHdvcmxkTm9ybWFsTGVuZ3RoID0gbGVuZ3RoKCB0cmFuc2Zvcm1lZE5vcm1hbCApO1xuICAgIHZlYzMgb3V0bGluZU9mZnNldCA9IG91dGxpbmVXaWR0aEZhY3RvciAqIHdvcmxkTm9ybWFsTGVuZ3RoICogb2JqZWN0Tm9ybWFsO1xuXG4gICAgI2lmZGVmIFVTRV9PVVRMSU5FV0lEVEhNVUxUSVBMWVRFWFRVUkVcbiAgICAgIHZlYzIgb3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlVXYgPSAoIG91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZVV2VHJhbnNmb3JtICogdmVjMyggdlV2LCAxICkgKS54eTtcbiAgICAgIGZsb2F0IG91dGxpbmVUZXggPSB0ZXh0dXJlMkQoIG91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZSwgb3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlVXYgKS5nO1xuICAgICAgb3V0bGluZU9mZnNldCAqPSBvdXRsaW5lVGV4O1xuICAgICNlbmRpZlxuXG4gICAgI2lmZGVmIE9VVExJTkVfV0lEVEhfU0NSRUVOXG4gICAgICBvdXRsaW5lT2Zmc2V0ICo9IHZWaWV3UG9zaXRpb24ueiAvIHByb2plY3Rpb25NYXRyaXhbIDEgXS55O1xuICAgICNlbmRpZlxuXG4gICAgZ2xfUG9zaXRpb24gPSBwcm9qZWN0aW9uTWF0cml4ICogbW9kZWxWaWV3TWF0cml4ICogdmVjNCggb3V0bGluZU9mZnNldCArIHRyYW5zZm9ybWVkLCAxLjAgKTtcblxuICAgIGdsX1Bvc2l0aW9uLnogKz0gMUUtNiAqIGdsX1Bvc2l0aW9uLnc7IC8vIGFudGktYXJ0aWZhY3QgbWFnaWNcbiAgI2VuZGlmXG5cbiAgI2luY2x1ZGUgPHdvcmxkcG9zX3ZlcnRleD5cbiAgLy8gI2luY2x1ZGUgPGVudm1hcF92ZXJ0ZXg+XG4gICNpbmNsdWRlIDxzaGFkb3dtYXBfdmVydGV4PlxuICAjaW5jbHVkZSA8Zm9nX3ZlcnRleD5cblxufSIsICIvLyAjZGVmaW5lIFBIT05HXG5cbnVuaWZvcm0gdmVjMyBsaXRGYWN0b3I7XG5cbnVuaWZvcm0gZmxvYXQgb3BhY2l0eTtcblxudW5pZm9ybSB2ZWMzIHNoYWRlQ29sb3JGYWN0b3I7XG4jaWZkZWYgVVNFX1NIQURFTVVMVElQTFlURVhUVVJFXG4gIHVuaWZvcm0gc2FtcGxlcjJEIHNoYWRlTXVsdGlwbHlUZXh0dXJlO1xuICB1bmlmb3JtIG1hdDMgc2hhZGVNdWx0aXBseVRleHR1cmVVdlRyYW5zZm9ybTtcbiNlbmRpZlxuXG51bmlmb3JtIGZsb2F0IHNoYWRpbmdTaGlmdEZhY3RvcjtcbnVuaWZvcm0gZmxvYXQgc2hhZGluZ1Rvb255RmFjdG9yO1xuXG4jaWZkZWYgVVNFX1NIQURJTkdTSElGVFRFWFRVUkVcbiAgdW5pZm9ybSBzYW1wbGVyMkQgc2hhZGluZ1NoaWZ0VGV4dHVyZTtcbiAgdW5pZm9ybSBtYXQzIHNoYWRpbmdTaGlmdFRleHR1cmVVdlRyYW5zZm9ybTtcbiAgdW5pZm9ybSBmbG9hdCBzaGFkaW5nU2hpZnRUZXh0dXJlU2NhbGU7XG4jZW5kaWZcblxudW5pZm9ybSBmbG9hdCBnaUVxdWFsaXphdGlvbkZhY3RvcjtcblxudW5pZm9ybSB2ZWMzIHBhcmFtZXRyaWNSaW1Db2xvckZhY3RvcjtcbiNpZmRlZiBVU0VfUklNTVVMVElQTFlURVhUVVJFXG4gIHVuaWZvcm0gc2FtcGxlcjJEIHJpbU11bHRpcGx5VGV4dHVyZTtcbiAgdW5pZm9ybSBtYXQzIHJpbU11bHRpcGx5VGV4dHVyZVV2VHJhbnNmb3JtO1xuI2VuZGlmXG51bmlmb3JtIGZsb2F0IHJpbUxpZ2h0aW5nTWl4RmFjdG9yO1xudW5pZm9ybSBmbG9hdCBwYXJhbWV0cmljUmltRnJlc25lbFBvd2VyRmFjdG9yO1xudW5pZm9ybSBmbG9hdCBwYXJhbWV0cmljUmltTGlmdEZhY3RvcjtcblxuI2lmZGVmIFVTRV9NQVRDQVBURVhUVVJFXG4gIHVuaWZvcm0gdmVjMyBtYXRjYXBGYWN0b3I7XG4gIHVuaWZvcm0gc2FtcGxlcjJEIG1hdGNhcFRleHR1cmU7XG4gIHVuaWZvcm0gbWF0MyBtYXRjYXBUZXh0dXJlVXZUcmFuc2Zvcm07XG4jZW5kaWZcblxudW5pZm9ybSB2ZWMzIGVtaXNzaXZlO1xudW5pZm9ybSBmbG9hdCBlbWlzc2l2ZUludGVuc2l0eTtcblxudW5pZm9ybSB2ZWMzIG91dGxpbmVDb2xvckZhY3RvcjtcbnVuaWZvcm0gZmxvYXQgb3V0bGluZUxpZ2h0aW5nTWl4RmFjdG9yO1xuXG4jaWZkZWYgVVNFX1VWQU5JTUFUSU9OTUFTS1RFWFRVUkVcbiAgdW5pZm9ybSBzYW1wbGVyMkQgdXZBbmltYXRpb25NYXNrVGV4dHVyZTtcbiAgdW5pZm9ybSBtYXQzIHV2QW5pbWF0aW9uTWFza1RleHR1cmVVdlRyYW5zZm9ybTtcbiNlbmRpZlxuXG51bmlmb3JtIGZsb2F0IHV2QW5pbWF0aW9uU2Nyb2xsWE9mZnNldDtcbnVuaWZvcm0gZmxvYXQgdXZBbmltYXRpb25TY3JvbGxZT2Zmc2V0O1xudW5pZm9ybSBmbG9hdCB1dkFuaW1hdGlvblJvdGF0aW9uUGhhc2U7XG5cbiNpbmNsdWRlIDxjb21tb24+XG4jaW5jbHVkZSA8cGFja2luZz5cbiNpbmNsdWRlIDxkaXRoZXJpbmdfcGFyc19mcmFnbWVudD5cbiNpbmNsdWRlIDxjb2xvcl9wYXJzX2ZyYWdtZW50PlxuXG4vLyAjaW5jbHVkZSA8dXZfcGFyc19mcmFnbWVudD5cbiNpZiAoIGRlZmluZWQoIE1UT09OX1VTRV9VViApICYmICFkZWZpbmVkKCBNVE9PTl9VVlNfVkVSVEVYX09OTFkgKSApXG4gIHZhcnlpbmcgdmVjMiB2VXY7XG4jZW5kaWZcblxuLy8gI2luY2x1ZGUgPHV2Ml9wYXJzX2ZyYWdtZW50PlxuLy8gQ09NQVBUOiBwcmUtcjE1MSB1c2VzIHV2MiBmb3IgbGlnaHRNYXAgYW5kIGFvTWFwXG4jaWYgVEhSRUVfVlJNX1RIUkVFX1JFVklTSU9OIDwgMTUxXG4gICNpZiBkZWZpbmVkKCBVU0VfTElHSFRNQVAgKSB8fCBkZWZpbmVkKCBVU0VfQU9NQVAgKVxuICAgIHZhcnlpbmcgdmVjMiB2VXYyO1xuICAjZW5kaWZcbiNlbmRpZlxuXG4jaW5jbHVkZSA8bWFwX3BhcnNfZnJhZ21lbnQ+XG5cbiNpZmRlZiBVU0VfTUFQXG4gIHVuaWZvcm0gbWF0MyBtYXBVdlRyYW5zZm9ybTtcbiNlbmRpZlxuXG4vLyAjaW5jbHVkZSA8YWxwaGFtYXBfcGFyc19mcmFnbWVudD5cblxuI2luY2x1ZGUgPGFscGhhdGVzdF9wYXJzX2ZyYWdtZW50PlxuXG4jaW5jbHVkZSA8YW9tYXBfcGFyc19mcmFnbWVudD5cbi8vICNpbmNsdWRlIDxsaWdodG1hcF9wYXJzX2ZyYWdtZW50PlxuI2luY2x1ZGUgPGVtaXNzaXZlbWFwX3BhcnNfZnJhZ21lbnQ+XG5cbiNpZmRlZiBVU0VfRU1JU1NJVkVNQVBcbiAgdW5pZm9ybSBtYXQzIGVtaXNzaXZlTWFwVXZUcmFuc2Zvcm07XG4jZW5kaWZcblxuLy8gI2luY2x1ZGUgPGVudm1hcF9jb21tb25fcGFyc19mcmFnbWVudD5cbi8vICNpbmNsdWRlIDxlbnZtYXBfcGFyc19mcmFnbWVudD5cbi8vICNpbmNsdWRlIDxjdWJlX3V2X3JlZmxlY3Rpb25fZnJhZ21lbnQ+XG4jaW5jbHVkZSA8Zm9nX3BhcnNfZnJhZ21lbnQ+XG5cbi8vICNpbmNsdWRlIDxic2Rmcz5cbi8vIENPTVBBVDogcHJlLXIxNTEgZG9lc24ndCBoYXZlIEJSREZfTGFtYmVydCBpbiA8Y29tbW9uPlxuI2lmIFRIUkVFX1ZSTV9USFJFRV9SRVZJU0lPTiA8IDE1MVxuICB2ZWMzIEJSREZfTGFtYmVydCggY29uc3QgaW4gdmVjMyBkaWZmdXNlQ29sb3IgKSB7XG4gICAgcmV0dXJuIFJFQ0lQUk9DQUxfUEkgKiBkaWZmdXNlQ29sb3I7XG4gIH1cbiNlbmRpZlxuXG4jaW5jbHVkZSA8bGlnaHRzX3BhcnNfYmVnaW4+XG5cbiNpbmNsdWRlIDxub3JtYWxfcGFyc19mcmFnbWVudD5cblxuLy8gI2luY2x1ZGUgPGxpZ2h0c19waG9uZ19wYXJzX2ZyYWdtZW50PlxudmFyeWluZyB2ZWMzIHZWaWV3UG9zaXRpb247XG5cbnN0cnVjdCBNVG9vbk1hdGVyaWFsIHtcbiAgdmVjMyBkaWZmdXNlQ29sb3I7XG4gIHZlYzMgc2hhZGVDb2xvcjtcbiAgZmxvYXQgc2hhZGluZ1NoaWZ0O1xufTtcblxuZmxvYXQgbGluZWFyc3RlcCggZmxvYXQgYSwgZmxvYXQgYiwgZmxvYXQgdCApIHtcbiAgcmV0dXJuIGNsYW1wKCAoIHQgLSBhICkgLyAoIGIgLSBhICksIDAuMCwgMS4wICk7XG59XG5cbi8qKlxuICogQ29udmVydCBOZG90TCBpbnRvIHRvb24gc2hhZGluZyBmYWN0b3IgdXNpbmcgc2hhZGluZ1NoaWZ0IGFuZCBzaGFkaW5nVG9vbnlcbiAqL1xuZmxvYXQgZ2V0U2hhZGluZyhcbiAgY29uc3QgaW4gZmxvYXQgZG90TkwsXG4gIGNvbnN0IGluIGZsb2F0IHNoYWRvdyxcbiAgY29uc3QgaW4gZmxvYXQgc2hhZGluZ1NoaWZ0XG4pIHtcbiAgZmxvYXQgc2hhZGluZyA9IGRvdE5MO1xuICBzaGFkaW5nID0gc2hhZGluZyArIHNoYWRpbmdTaGlmdDtcbiAgc2hhZGluZyA9IGxpbmVhcnN0ZXAoIC0xLjAgKyBzaGFkaW5nVG9vbnlGYWN0b3IsIDEuMCAtIHNoYWRpbmdUb29ueUZhY3Rvciwgc2hhZGluZyApO1xuICBzaGFkaW5nICo9IHNoYWRvdztcbiAgcmV0dXJuIHNoYWRpbmc7XG59XG5cbi8qKlxuICogTWl4IGRpZmZ1c2VDb2xvciBhbmQgc2hhZGVDb2xvciB1c2luZyBzaGFkaW5nIGZhY3RvciBhbmQgbGlnaHQgY29sb3JcbiAqL1xudmVjMyBnZXREaWZmdXNlKFxuICBjb25zdCBpbiBNVG9vbk1hdGVyaWFsIG1hdGVyaWFsLFxuICBjb25zdCBpbiBmbG9hdCBzaGFkaW5nLFxuICBpbiB2ZWMzIGxpZ2h0Q29sb3Jcbikge1xuICAjaWZkZWYgREVCVUdfTElUU0hBREVSQVRFXG4gICAgcmV0dXJuIHZlYzMoIEJSREZfTGFtYmVydCggc2hhZGluZyAqIGxpZ2h0Q29sb3IgKSApO1xuICAjZW5kaWZcblxuICB2ZWMzIGNvbCA9IGxpZ2h0Q29sb3IgKiBCUkRGX0xhbWJlcnQoIG1peCggbWF0ZXJpYWwuc2hhZGVDb2xvciwgbWF0ZXJpYWwuZGlmZnVzZUNvbG9yLCBzaGFkaW5nICkgKTtcblxuICAvLyBUaGUgXCJjb21tZW50IG91dCBpZiB5b3Ugd2FudCB0byBQQlIgYWJzb2x1dGVseVwiIGxpbmVcbiAgI2lmZGVmIFYwX0NPTVBBVF9TSEFERVxuICAgIGNvbCA9IG1pbiggY29sLCBtYXRlcmlhbC5kaWZmdXNlQ29sb3IgKTtcbiAgI2VuZGlmXG5cbiAgcmV0dXJuIGNvbDtcbn1cblxuLy8gQ09NUEFUOiBwcmUtcjE1NiB1c2VzIGEgc3RydWN0IEdlb21ldHJpY0NvbnRleHRcbiNpZiBUSFJFRV9WUk1fVEhSRUVfUkVWSVNJT04gPj0gMTU3XG4gIHZvaWQgUkVfRGlyZWN0X01Ub29uKCBjb25zdCBpbiBJbmNpZGVudExpZ2h0IGRpcmVjdExpZ2h0LCBjb25zdCBpbiB2ZWMzIGdlb21ldHJ5UG9zaXRpb24sIGNvbnN0IGluIHZlYzMgZ2VvbWV0cnlOb3JtYWwsIGNvbnN0IGluIHZlYzMgZ2VvbWV0cnlWaWV3RGlyLCBjb25zdCBpbiB2ZWMzIGdlb21ldHJ5Q2xlYXJjb2F0Tm9ybWFsLCBjb25zdCBpbiBNVG9vbk1hdGVyaWFsIG1hdGVyaWFsLCBjb25zdCBpbiBmbG9hdCBzaGFkb3csIGlub3V0IFJlZmxlY3RlZExpZ2h0IHJlZmxlY3RlZExpZ2h0ICkge1xuICAgIGZsb2F0IGRvdE5MID0gY2xhbXAoIGRvdCggZ2VvbWV0cnlOb3JtYWwsIGRpcmVjdExpZ2h0LmRpcmVjdGlvbiApLCAtMS4wLCAxLjAgKTtcbiAgICB2ZWMzIGlycmFkaWFuY2UgPSBkaXJlY3RMaWdodC5jb2xvcjtcblxuICAgIC8vIGRpcmVjdFNwZWN1bGFyIHdpbGwgYmUgdXNlZCBmb3IgcmltIGxpZ2h0aW5nLCBub3QgYW4gYWN0dWFsIHNwZWN1bGFyXG4gICAgcmVmbGVjdGVkTGlnaHQuZGlyZWN0U3BlY3VsYXIgKz0gaXJyYWRpYW5jZTtcblxuICAgIGlycmFkaWFuY2UgKj0gZG90Tkw7XG5cbiAgICBmbG9hdCBzaGFkaW5nID0gZ2V0U2hhZGluZyggZG90TkwsIHNoYWRvdywgbWF0ZXJpYWwuc2hhZGluZ1NoaWZ0ICk7XG5cbiAgICAvLyB0b29uIHNoYWRlZCBkaWZmdXNlXG4gICAgcmVmbGVjdGVkTGlnaHQuZGlyZWN0RGlmZnVzZSArPSBnZXREaWZmdXNlKCBtYXRlcmlhbCwgc2hhZGluZywgZGlyZWN0TGlnaHQuY29sb3IgKTtcbiAgfVxuXG4gIHZvaWQgUkVfSW5kaXJlY3REaWZmdXNlX01Ub29uKCBjb25zdCBpbiB2ZWMzIGlycmFkaWFuY2UsIGNvbnN0IGluIHZlYzMgZ2VvbWV0cnlQb3NpdGlvbiwgY29uc3QgaW4gdmVjMyBnZW9tZXRyeU5vcm1hbCwgY29uc3QgaW4gdmVjMyBnZW9tZXRyeVZpZXdEaXIsIGNvbnN0IGluIHZlYzMgZ2VvbWV0cnlDbGVhcmNvYXROb3JtYWwsIGNvbnN0IGluIE1Ub29uTWF0ZXJpYWwgbWF0ZXJpYWwsIGlub3V0IFJlZmxlY3RlZExpZ2h0IHJlZmxlY3RlZExpZ2h0ICkge1xuICAgIC8vIGluZGlyZWN0IGRpZmZ1c2Ugd2lsbCB1c2UgZGlmZnVzZUNvbG9yLCBubyBzaGFkZUNvbG9yIGludm9sdmVkXG4gICAgcmVmbGVjdGVkTGlnaHQuaW5kaXJlY3REaWZmdXNlICs9IGlycmFkaWFuY2UgKiBCUkRGX0xhbWJlcnQoIG1hdGVyaWFsLmRpZmZ1c2VDb2xvciApO1xuXG4gICAgLy8gZGlyZWN0U3BlY3VsYXIgd2lsbCBiZSB1c2VkIGZvciByaW0gbGlnaHRpbmcsIG5vdCBhbiBhY3R1YWwgc3BlY3VsYXJcbiAgICByZWZsZWN0ZWRMaWdodC5kaXJlY3RTcGVjdWxhciArPSBpcnJhZGlhbmNlO1xuICB9XG4jZWxzZVxuICB2b2lkIFJFX0RpcmVjdF9NVG9vbiggY29uc3QgaW4gSW5jaWRlbnRMaWdodCBkaXJlY3RMaWdodCwgY29uc3QgaW4gR2VvbWV0cmljQ29udGV4dCBnZW9tZXRyeSwgY29uc3QgaW4gTVRvb25NYXRlcmlhbCBtYXRlcmlhbCwgY29uc3QgaW4gZmxvYXQgc2hhZG93LCBpbm91dCBSZWZsZWN0ZWRMaWdodCByZWZsZWN0ZWRMaWdodCApIHtcbiAgICBmbG9hdCBkb3ROTCA9IGNsYW1wKCBkb3QoIGdlb21ldHJ5Lm5vcm1hbCwgZGlyZWN0TGlnaHQuZGlyZWN0aW9uICksIC0xLjAsIDEuMCApO1xuICAgIHZlYzMgaXJyYWRpYW5jZSA9IGRpcmVjdExpZ2h0LmNvbG9yO1xuXG4gICAgLy8gZGlyZWN0U3BlY3VsYXIgd2lsbCBiZSB1c2VkIGZvciByaW0gbGlnaHRpbmcsIG5vdCBhbiBhY3R1YWwgc3BlY3VsYXJcbiAgICByZWZsZWN0ZWRMaWdodC5kaXJlY3RTcGVjdWxhciArPSBpcnJhZGlhbmNlO1xuXG4gICAgaXJyYWRpYW5jZSAqPSBkb3ROTDtcblxuICAgIGZsb2F0IHNoYWRpbmcgPSBnZXRTaGFkaW5nKCBkb3ROTCwgc2hhZG93LCBtYXRlcmlhbC5zaGFkaW5nU2hpZnQgKTtcblxuICAgIC8vIHRvb24gc2hhZGVkIGRpZmZ1c2VcbiAgICByZWZsZWN0ZWRMaWdodC5kaXJlY3REaWZmdXNlICs9IGdldERpZmZ1c2UoIG1hdGVyaWFsLCBzaGFkaW5nLCBkaXJlY3RMaWdodC5jb2xvciApO1xuICB9XG5cbiAgdm9pZCBSRV9JbmRpcmVjdERpZmZ1c2VfTVRvb24oIGNvbnN0IGluIHZlYzMgaXJyYWRpYW5jZSwgY29uc3QgaW4gR2VvbWV0cmljQ29udGV4dCBnZW9tZXRyeSwgY29uc3QgaW4gTVRvb25NYXRlcmlhbCBtYXRlcmlhbCwgaW5vdXQgUmVmbGVjdGVkTGlnaHQgcmVmbGVjdGVkTGlnaHQgKSB7XG4gICAgLy8gaW5kaXJlY3QgZGlmZnVzZSB3aWxsIHVzZSBkaWZmdXNlQ29sb3IsIG5vIHNoYWRlQ29sb3IgaW52b2x2ZWRcbiAgICByZWZsZWN0ZWRMaWdodC5pbmRpcmVjdERpZmZ1c2UgKz0gaXJyYWRpYW5jZSAqIEJSREZfTGFtYmVydCggbWF0ZXJpYWwuZGlmZnVzZUNvbG9yICk7XG5cbiAgICAvLyBkaXJlY3RTcGVjdWxhciB3aWxsIGJlIHVzZWQgZm9yIHJpbSBsaWdodGluZywgbm90IGFuIGFjdHVhbCBzcGVjdWxhclxuICAgIHJlZmxlY3RlZExpZ2h0LmRpcmVjdFNwZWN1bGFyICs9IGlycmFkaWFuY2U7XG4gIH1cbiNlbmRpZlxuXG4jZGVmaW5lIFJFX0RpcmVjdCBSRV9EaXJlY3RfTVRvb25cbiNkZWZpbmUgUkVfSW5kaXJlY3REaWZmdXNlIFJFX0luZGlyZWN0RGlmZnVzZV9NVG9vblxuI2RlZmluZSBNYXRlcmlhbF9MaWdodFByb2JlTE9EKCBtYXRlcmlhbCApICgwKVxuXG4jaW5jbHVkZSA8c2hhZG93bWFwX3BhcnNfZnJhZ21lbnQ+XG4vLyAjaW5jbHVkZSA8YnVtcG1hcF9wYXJzX2ZyYWdtZW50PlxuXG4vLyAjaW5jbHVkZSA8bm9ybWFsbWFwX3BhcnNfZnJhZ21lbnQ+XG4jaWZkZWYgVVNFX05PUk1BTE1BUFxuXG4gIHVuaWZvcm0gc2FtcGxlcjJEIG5vcm1hbE1hcDtcbiAgdW5pZm9ybSBtYXQzIG5vcm1hbE1hcFV2VHJhbnNmb3JtO1xuICB1bmlmb3JtIHZlYzIgbm9ybWFsU2NhbGU7XG5cbiNlbmRpZlxuXG4vLyBDT01QQVQ6IHByZS1yMTUxXG4vLyBVU0VfTk9STUFMTUFQX09CSkVDVFNQQUNFIHVzZWQgdG8gYmUgT0JKRUNUU1BBQ0VfTk9STUFMTUFQIGluIHByZS1yMTUxXG4jaWYgZGVmaW5lZCggVVNFX05PUk1BTE1BUF9PQkpFQ1RTUEFDRSApIHx8IGRlZmluZWQoIE9CSkVDVFNQQUNFX05PUk1BTE1BUCApXG5cbiAgdW5pZm9ybSBtYXQzIG5vcm1hbE1hdHJpeDtcblxuI2VuZGlmXG5cbi8vIENPTVBBVDogcHJlLXIxNTFcbi8vIFVTRV9OT1JNQUxNQVBfVEFOR0VOVFNQQUNFIHVzZWQgdG8gYmUgVEFOR0VOVFNQQUNFX05PUk1BTE1BUCBpbiBwcmUtcjE1MVxuI2lmICEgZGVmaW5lZCAoIFVTRV9UQU5HRU5UICkgJiYgKCBkZWZpbmVkICggVVNFX05PUk1BTE1BUF9UQU5HRU5UU1BBQ0UgKSB8fCBkZWZpbmVkICggVEFOR0VOVFNQQUNFX05PUk1BTE1BUCApIClcblxuICAvLyBQZXItUGl4ZWwgVGFuZ2VudCBTcGFjZSBOb3JtYWwgTWFwcGluZ1xuICAvLyBodHRwOi8vaGFja3NvZmxpZmUuYmxvZ3Nwb3QuY2gvMjAwOS8xMS9wZXItcGl4ZWwtdGFuZ2VudC1zcGFjZS1ub3JtYWwtbWFwcGluZy5odG1sXG5cbiAgLy8gdGhyZWUtdnJtIHNwZWNpZmljIGNoYW5nZTogaXQgcmVxdWlyZXMgYHV2YCBhcyBhbiBpbnB1dCBpbiBvcmRlciB0byBzdXBwb3J0IHV2IHNjcm9sbHNcblxuICAvLyBUZW1wb3JhcnkgY29tcGF0IGFnYWluc3Qgc2hhZGVyIGNoYW5nZSBAIFRocmVlLmpzIHIxMjYsIHIxNTFcbiAgI2lmIFRIUkVFX1ZSTV9USFJFRV9SRVZJU0lPTiA+PSAxNTFcblxuICAgIG1hdDMgZ2V0VGFuZ2VudEZyYW1lKCB2ZWMzIGV5ZV9wb3MsIHZlYzMgc3VyZl9ub3JtLCB2ZWMyIHV2ICkge1xuXG4gICAgICB2ZWMzIHEwID0gZEZkeCggZXllX3Bvcy54eXogKTtcbiAgICAgIHZlYzMgcTEgPSBkRmR5KCBleWVfcG9zLnh5eiApO1xuICAgICAgdmVjMiBzdDAgPSBkRmR4KCB1di5zdCApO1xuICAgICAgdmVjMiBzdDEgPSBkRmR5KCB1di5zdCApO1xuXG4gICAgICB2ZWMzIE4gPSBzdXJmX25vcm07XG5cbiAgICAgIHZlYzMgcTFwZXJwID0gY3Jvc3MoIHExLCBOICk7XG4gICAgICB2ZWMzIHEwcGVycCA9IGNyb3NzKCBOLCBxMCApO1xuXG4gICAgICB2ZWMzIFQgPSBxMXBlcnAgKiBzdDAueCArIHEwcGVycCAqIHN0MS54O1xuICAgICAgdmVjMyBCID0gcTFwZXJwICogc3QwLnkgKyBxMHBlcnAgKiBzdDEueTtcblxuICAgICAgZmxvYXQgZGV0ID0gbWF4KCBkb3QoIFQsIFQgKSwgZG90KCBCLCBCICkgKTtcbiAgICAgIGZsb2F0IHNjYWxlID0gKCBkZXQgPT0gMC4wICkgPyAwLjAgOiBpbnZlcnNlc3FydCggZGV0ICk7XG5cbiAgICAgIHJldHVybiBtYXQzKCBUICogc2NhbGUsIEIgKiBzY2FsZSwgTiApO1xuXG4gICAgfVxuXG4gICNlbHNlXG5cbiAgICB2ZWMzIHBlcnR1cmJOb3JtYWwyQXJiKCB2ZWMyIHV2LCB2ZWMzIGV5ZV9wb3MsIHZlYzMgc3VyZl9ub3JtLCB2ZWMzIG1hcE4sIGZsb2F0IGZhY2VEaXJlY3Rpb24gKSB7XG5cbiAgICAgIHZlYzMgcTAgPSB2ZWMzKCBkRmR4KCBleWVfcG9zLnggKSwgZEZkeCggZXllX3Bvcy55ICksIGRGZHgoIGV5ZV9wb3MueiApICk7XG4gICAgICB2ZWMzIHExID0gdmVjMyggZEZkeSggZXllX3Bvcy54ICksIGRGZHkoIGV5ZV9wb3MueSApLCBkRmR5KCBleWVfcG9zLnogKSApO1xuICAgICAgdmVjMiBzdDAgPSBkRmR4KCB1di5zdCApO1xuICAgICAgdmVjMiBzdDEgPSBkRmR5KCB1di5zdCApO1xuXG4gICAgICB2ZWMzIE4gPSBub3JtYWxpemUoIHN1cmZfbm9ybSApO1xuXG4gICAgICB2ZWMzIHExcGVycCA9IGNyb3NzKCBxMSwgTiApO1xuICAgICAgdmVjMyBxMHBlcnAgPSBjcm9zcyggTiwgcTAgKTtcblxuICAgICAgdmVjMyBUID0gcTFwZXJwICogc3QwLnggKyBxMHBlcnAgKiBzdDEueDtcbiAgICAgIHZlYzMgQiA9IHExcGVycCAqIHN0MC55ICsgcTBwZXJwICogc3QxLnk7XG5cbiAgICAgIC8vIHRocmVlLXZybSBzcGVjaWZpYyBjaGFuZ2U6IFdvcmthcm91bmQgZm9yIHRoZSBpc3N1ZSB0aGF0IGhhcHBlbnMgd2hlbiBkZWx0YSBvZiB1diA9IDAuMFxuICAgICAgLy8gVE9ETzogSXMgdGhpcyBzdGlsbCByZXF1aXJlZD8gT3Igc2hhbGwgSSBtYWtlIGEgUFIgYWJvdXQgaXQ/XG4gICAgICBpZiAoIGxlbmd0aCggVCApID09IDAuMCB8fCBsZW5ndGgoIEIgKSA9PSAwLjAgKSB7XG4gICAgICAgIHJldHVybiBzdXJmX25vcm07XG4gICAgICB9XG5cbiAgICAgIGZsb2F0IGRldCA9IG1heCggZG90KCBULCBUICksIGRvdCggQiwgQiApICk7XG4gICAgICBmbG9hdCBzY2FsZSA9ICggZGV0ID09IDAuMCApID8gMC4wIDogZmFjZURpcmVjdGlvbiAqIGludmVyc2VzcXJ0KCBkZXQgKTtcblxuICAgICAgcmV0dXJuIG5vcm1hbGl6ZSggVCAqICggbWFwTi54ICogc2NhbGUgKSArIEIgKiAoIG1hcE4ueSAqIHNjYWxlICkgKyBOICogbWFwTi56ICk7XG5cbiAgICB9XG5cbiAgI2VuZGlmXG5cbiNlbmRpZlxuXG4vLyAjaW5jbHVkZSA8c3BlY3VsYXJtYXBfcGFyc19mcmFnbWVudD5cbiNpbmNsdWRlIDxsb2dkZXB0aGJ1Zl9wYXJzX2ZyYWdtZW50PlxuI2luY2x1ZGUgPGNsaXBwaW5nX3BsYW5lc19wYXJzX2ZyYWdtZW50PlxuXG4vLyA9PSBwb3N0IGNvcnJlY3Rpb24gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxudm9pZCBwb3N0Q29ycmVjdGlvbigpIHtcbiAgI2luY2x1ZGUgPHRvbmVtYXBwaW5nX2ZyYWdtZW50PlxuICAjaW5jbHVkZSA8Y29sb3JzcGFjZV9mcmFnbWVudD5cbiAgI2luY2x1ZGUgPGZvZ19mcmFnbWVudD5cbiAgI2luY2x1ZGUgPHByZW11bHRpcGxpZWRfYWxwaGFfZnJhZ21lbnQ+XG4gICNpbmNsdWRlIDxkaXRoZXJpbmdfZnJhZ21lbnQ+XG59XG5cbi8vID09IG1haW4gcHJvY2VkdXJlID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG52b2lkIG1haW4oKSB7XG4gICNpbmNsdWRlIDxjbGlwcGluZ19wbGFuZXNfZnJhZ21lbnQ+XG5cbiAgdmVjMiB1diA9IHZlYzIoMC41LCAwLjUpO1xuXG4gICNpZiAoIGRlZmluZWQoIE1UT09OX1VTRV9VViApICYmICFkZWZpbmVkKCBNVE9PTl9VVlNfVkVSVEVYX09OTFkgKSApXG4gICAgdXYgPSB2VXY7XG5cbiAgICBmbG9hdCB1dkFuaW1NYXNrID0gMS4wO1xuICAgICNpZmRlZiBVU0VfVVZBTklNQVRJT05NQVNLVEVYVFVSRVxuICAgICAgdmVjMiB1dkFuaW1hdGlvbk1hc2tUZXh0dXJlVXYgPSAoIHV2QW5pbWF0aW9uTWFza1RleHR1cmVVdlRyYW5zZm9ybSAqIHZlYzMoIHV2LCAxICkgKS54eTtcbiAgICAgIHV2QW5pbU1hc2sgPSB0ZXh0dXJlMkQoIHV2QW5pbWF0aW9uTWFza1RleHR1cmUsIHV2QW5pbWF0aW9uTWFza1RleHR1cmVVdiApLmI7XG4gICAgI2VuZGlmXG5cbiAgICBmbG9hdCB1dlJvdENvcyA9IGNvcyggdXZBbmltYXRpb25Sb3RhdGlvblBoYXNlICogdXZBbmltTWFzayApO1xuICAgIGZsb2F0IHV2Um90U2luID0gc2luKCB1dkFuaW1hdGlvblJvdGF0aW9uUGhhc2UgKiB1dkFuaW1NYXNrICk7XG4gICAgdXYgPSBtYXQyKCB1dlJvdENvcywgLXV2Um90U2luLCB1dlJvdFNpbiwgdXZSb3RDb3MgKSAqICggdXYgLSAwLjUgKSArIDAuNTtcbiAgICB1diA9IHV2ICsgdmVjMiggdXZBbmltYXRpb25TY3JvbGxYT2Zmc2V0LCB1dkFuaW1hdGlvblNjcm9sbFlPZmZzZXQgKSAqIHV2QW5pbU1hc2s7XG4gICNlbmRpZlxuXG4gICNpZmRlZiBERUJVR19VVlxuICAgIGdsX0ZyYWdDb2xvciA9IHZlYzQoIDAuMCwgMC4wLCAwLjAsIDEuMCApO1xuICAgICNpZiAoIGRlZmluZWQoIE1UT09OX1VTRV9VViApICYmICFkZWZpbmVkKCBNVE9PTl9VVlNfVkVSVEVYX09OTFkgKSApXG4gICAgICBnbF9GcmFnQ29sb3IgPSB2ZWM0KCB1diwgMC4wLCAxLjAgKTtcbiAgICAjZW5kaWZcbiAgICByZXR1cm47XG4gICNlbmRpZlxuXG4gIHZlYzQgZGlmZnVzZUNvbG9yID0gdmVjNCggbGl0RmFjdG9yLCBvcGFjaXR5ICk7XG4gIFJlZmxlY3RlZExpZ2h0IHJlZmxlY3RlZExpZ2h0ID0gUmVmbGVjdGVkTGlnaHQoIHZlYzMoIDAuMCApLCB2ZWMzKCAwLjAgKSwgdmVjMyggMC4wICksIHZlYzMoIDAuMCApICk7XG4gIHZlYzMgdG90YWxFbWlzc2l2ZVJhZGlhbmNlID0gZW1pc3NpdmUgKiBlbWlzc2l2ZUludGVuc2l0eTtcblxuICAjaW5jbHVkZSA8bG9nZGVwdGhidWZfZnJhZ21lbnQ+XG5cbiAgLy8gI2luY2x1ZGUgPG1hcF9mcmFnbWVudD5cbiAgI2lmZGVmIFVTRV9NQVBcbiAgICB2ZWMyIG1hcFV2ID0gKCBtYXBVdlRyYW5zZm9ybSAqIHZlYzMoIHV2LCAxICkgKS54eTtcbiAgICB2ZWM0IHNhbXBsZWREaWZmdXNlQ29sb3IgPSB0ZXh0dXJlMkQoIG1hcCwgbWFwVXYgKTtcbiAgICAjaWZkZWYgREVDT0RFX1ZJREVPX1RFWFRVUkVcbiAgICAgIHNhbXBsZWREaWZmdXNlQ29sb3IgPSB2ZWM0KCBtaXgoIHBvdyggc2FtcGxlZERpZmZ1c2VDb2xvci5yZ2IgKiAwLjk0Nzg2NzI5ODYgKyB2ZWMzKCAwLjA1MjEzMjcwMTQgKSwgdmVjMyggMi40ICkgKSwgc2FtcGxlZERpZmZ1c2VDb2xvci5yZ2IgKiAwLjA3NzM5OTM4MDgsIHZlYzMoIGxlc3NUaGFuRXF1YWwoIHNhbXBsZWREaWZmdXNlQ29sb3IucmdiLCB2ZWMzKCAwLjA0MDQ1ICkgKSApICksIHNhbXBsZWREaWZmdXNlQ29sb3IudyApO1xuICAgICNlbmRpZlxuICAgIGRpZmZ1c2VDb2xvciAqPSBzYW1wbGVkRGlmZnVzZUNvbG9yO1xuICAjZW5kaWZcblxuICAvLyAjaW5jbHVkZSA8Y29sb3JfZnJhZ21lbnQ+XG4gICNpZiAoIGRlZmluZWQoIFVTRV9DT0xPUiApICYmICFkZWZpbmVkKCBJR05PUkVfVkVSVEVYX0NPTE9SICkgKVxuICAgIGRpZmZ1c2VDb2xvci5yZ2IgKj0gdkNvbG9yO1xuICAjZW5kaWZcblxuICAvLyAjaW5jbHVkZSA8YWxwaGFtYXBfZnJhZ21lbnQ+XG5cbiAgI2luY2x1ZGUgPGFscGhhdGVzdF9mcmFnbWVudD5cblxuICAvLyAjaW5jbHVkZSA8c3BlY3VsYXJtYXBfZnJhZ21lbnQ+XG5cbiAgLy8gI2luY2x1ZGUgPG5vcm1hbF9mcmFnbWVudF9iZWdpbj5cbiAgZmxvYXQgZmFjZURpcmVjdGlvbiA9IGdsX0Zyb250RmFjaW5nID8gMS4wIDogLTEuMDtcblxuICAjaWZkZWYgRkxBVF9TSEFERURcblxuICAgIHZlYzMgZmR4ID0gZEZkeCggdlZpZXdQb3NpdGlvbiApO1xuICAgIHZlYzMgZmR5ID0gZEZkeSggdlZpZXdQb3NpdGlvbiApO1xuICAgIHZlYzMgbm9ybWFsID0gbm9ybWFsaXplKCBjcm9zcyggZmR4LCBmZHkgKSApO1xuXG4gICNlbHNlXG5cbiAgICB2ZWMzIG5vcm1hbCA9IG5vcm1hbGl6ZSggdk5vcm1hbCApO1xuXG4gICAgI2lmZGVmIERPVUJMRV9TSURFRFxuXG4gICAgICBub3JtYWwgKj0gZmFjZURpcmVjdGlvbjtcblxuICAgICNlbmRpZlxuXG4gICNlbmRpZlxuXG4gICNpZmRlZiBVU0VfTk9STUFMTUFQXG5cbiAgICB2ZWMyIG5vcm1hbE1hcFV2ID0gKCBub3JtYWxNYXBVdlRyYW5zZm9ybSAqIHZlYzMoIHV2LCAxICkgKS54eTtcblxuICAjZW5kaWZcblxuICAjaWZkZWYgVVNFX05PUk1BTE1BUF9UQU5HRU5UU1BBQ0VcblxuICAgICNpZmRlZiBVU0VfVEFOR0VOVFxuXG4gICAgICBtYXQzIHRibiA9IG1hdDMoIG5vcm1hbGl6ZSggdlRhbmdlbnQgKSwgbm9ybWFsaXplKCB2Qml0YW5nZW50ICksIG5vcm1hbCApO1xuXG4gICAgI2Vsc2VcblxuICAgICAgbWF0MyB0Ym4gPSBnZXRUYW5nZW50RnJhbWUoIC0gdlZpZXdQb3NpdGlvbiwgbm9ybWFsLCBub3JtYWxNYXBVdiApO1xuXG4gICAgI2VuZGlmXG5cbiAgICAjaWYgZGVmaW5lZCggRE9VQkxFX1NJREVEICkgJiYgISBkZWZpbmVkKCBGTEFUX1NIQURFRCApXG5cbiAgICAgIHRiblswXSAqPSBmYWNlRGlyZWN0aW9uO1xuICAgICAgdGJuWzFdICo9IGZhY2VEaXJlY3Rpb247XG5cbiAgICAjZW5kaWZcblxuICAjZW5kaWZcblxuICAjaWZkZWYgVVNFX0NMRUFSQ09BVF9OT1JNQUxNQVBcblxuICAgICNpZmRlZiBVU0VfVEFOR0VOVFxuXG4gICAgICBtYXQzIHRibjIgPSBtYXQzKCBub3JtYWxpemUoIHZUYW5nZW50ICksIG5vcm1hbGl6ZSggdkJpdGFuZ2VudCApLCBub3JtYWwgKTtcblxuICAgICNlbHNlXG5cbiAgICAgIG1hdDMgdGJuMiA9IGdldFRhbmdlbnRGcmFtZSggLSB2Vmlld1Bvc2l0aW9uLCBub3JtYWwsIHZDbGVhcmNvYXROb3JtYWxNYXBVdiApO1xuXG4gICAgI2VuZGlmXG5cbiAgICAjaWYgZGVmaW5lZCggRE9VQkxFX1NJREVEICkgJiYgISBkZWZpbmVkKCBGTEFUX1NIQURFRCApXG5cbiAgICAgIHRibjJbMF0gKj0gZmFjZURpcmVjdGlvbjtcbiAgICAgIHRibjJbMV0gKj0gZmFjZURpcmVjdGlvbjtcblxuICAgICNlbmRpZlxuXG4gICNlbmRpZlxuXG4gIC8vIG5vbiBwZXJ0dXJiZWQgbm9ybWFsIGZvciBjbGVhcmNvYXQgYW1vbmcgb3RoZXJzXG5cbiAgdmVjMyBub25QZXJ0dXJiZWROb3JtYWwgPSBub3JtYWw7XG5cbiAgI2lmZGVmIE9VVExJTkVcbiAgICBub3JtYWwgKj0gLTEuMDtcbiAgI2VuZGlmXG5cbiAgLy8gI2luY2x1ZGUgPG5vcm1hbF9mcmFnbWVudF9tYXBzPlxuXG4gIC8vIENPTVBBVDogcHJlLXIxNTFcbiAgLy8gVVNFX05PUk1BTE1BUF9PQkpFQ1RTUEFDRSB1c2VkIHRvIGJlIE9CSkVDVFNQQUNFX05PUk1BTE1BUCBpbiBwcmUtcjE1MVxuICAjaWYgZGVmaW5lZCggVVNFX05PUk1BTE1BUF9PQkpFQ1RTUEFDRSApIHx8IGRlZmluZWQoIE9CSkVDVFNQQUNFX05PUk1BTE1BUCApXG5cbiAgICBub3JtYWwgPSB0ZXh0dXJlMkQoIG5vcm1hbE1hcCwgbm9ybWFsTWFwVXYgKS54eXogKiAyLjAgLSAxLjA7IC8vIG92ZXJyaWRlcyBib3RoIGZsYXRTaGFkaW5nIGFuZCBhdHRyaWJ1dGUgbm9ybWFsc1xuXG4gICAgI2lmZGVmIEZMSVBfU0lERURcblxuICAgICAgbm9ybWFsID0gLSBub3JtYWw7XG5cbiAgICAjZW5kaWZcblxuICAgICNpZmRlZiBET1VCTEVfU0lERURcblxuICAgICAgbm9ybWFsID0gbm9ybWFsICogZmFjZURpcmVjdGlvbjtcblxuICAgICNlbmRpZlxuXG4gICAgbm9ybWFsID0gbm9ybWFsaXplKCBub3JtYWxNYXRyaXggKiBub3JtYWwgKTtcblxuICAvLyBDT01QQVQ6IHByZS1yMTUxXG4gIC8vIFVTRV9OT1JNQUxNQVBfVEFOR0VOVFNQQUNFIHVzZWQgdG8gYmUgVEFOR0VOVFNQQUNFX05PUk1BTE1BUCBpbiBwcmUtcjE1MVxuICAjZWxpZiBkZWZpbmVkKCBVU0VfTk9STUFMTUFQX1RBTkdFTlRTUEFDRSApIHx8IGRlZmluZWQoIFRBTkdFTlRTUEFDRV9OT1JNQUxNQVAgKVxuXG4gICAgdmVjMyBtYXBOID0gdGV4dHVyZTJEKCBub3JtYWxNYXAsIG5vcm1hbE1hcFV2ICkueHl6ICogMi4wIC0gMS4wO1xuICAgIG1hcE4ueHkgKj0gbm9ybWFsU2NhbGU7XG5cbiAgICAvLyBDT01QQVQ6IHByZS1yMTUxXG4gICAgI2lmIFRIUkVFX1ZSTV9USFJFRV9SRVZJU0lPTiA+PSAxNTEgfHwgZGVmaW5lZCggVVNFX1RBTkdFTlQgKVxuXG4gICAgICBub3JtYWwgPSBub3JtYWxpemUoIHRibiAqIG1hcE4gKTtcblxuICAgICNlbHNlXG5cbiAgICAgIG5vcm1hbCA9IHBlcnR1cmJOb3JtYWwyQXJiKCB1diwgLXZWaWV3UG9zaXRpb24sIG5vcm1hbCwgbWFwTiwgZmFjZURpcmVjdGlvbiApO1xuXG4gICAgI2VuZGlmXG5cbiAgI2VuZGlmXG5cbiAgLy8gI2luY2x1ZGUgPGVtaXNzaXZlbWFwX2ZyYWdtZW50PlxuICAjaWZkZWYgVVNFX0VNSVNTSVZFTUFQXG4gICAgdmVjMiBlbWlzc2l2ZU1hcFV2ID0gKCBlbWlzc2l2ZU1hcFV2VHJhbnNmb3JtICogdmVjMyggdXYsIDEgKSApLnh5O1xuICAgIHRvdGFsRW1pc3NpdmVSYWRpYW5jZSAqPSB0ZXh0dXJlMkQoIGVtaXNzaXZlTWFwLCBlbWlzc2l2ZU1hcFV2ICkucmdiO1xuICAjZW5kaWZcblxuICAjaWZkZWYgREVCVUdfTk9STUFMXG4gICAgZ2xfRnJhZ0NvbG9yID0gdmVjNCggMC41ICsgMC41ICogbm9ybWFsLCAxLjAgKTtcbiAgICByZXR1cm47XG4gICNlbmRpZlxuXG4gIC8vIC0tIE1Ub29uOiBsaWdodGluZyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBhY2N1bXVsYXRpb25cbiAgLy8gI2luY2x1ZGUgPGxpZ2h0c19waG9uZ19mcmFnbWVudD5cbiAgTVRvb25NYXRlcmlhbCBtYXRlcmlhbDtcblxuICBtYXRlcmlhbC5kaWZmdXNlQ29sb3IgPSBkaWZmdXNlQ29sb3IucmdiO1xuXG4gIG1hdGVyaWFsLnNoYWRlQ29sb3IgPSBzaGFkZUNvbG9yRmFjdG9yO1xuICAjaWZkZWYgVVNFX1NIQURFTVVMVElQTFlURVhUVVJFXG4gICAgdmVjMiBzaGFkZU11bHRpcGx5VGV4dHVyZVV2ID0gKCBzaGFkZU11bHRpcGx5VGV4dHVyZVV2VHJhbnNmb3JtICogdmVjMyggdXYsIDEgKSApLnh5O1xuICAgIG1hdGVyaWFsLnNoYWRlQ29sb3IgKj0gdGV4dHVyZTJEKCBzaGFkZU11bHRpcGx5VGV4dHVyZSwgc2hhZGVNdWx0aXBseVRleHR1cmVVdiApLnJnYjtcbiAgI2VuZGlmXG5cbiAgI2lmICggZGVmaW5lZCggVVNFX0NPTE9SICkgJiYgIWRlZmluZWQoIElHTk9SRV9WRVJURVhfQ09MT1IgKSApXG4gICAgbWF0ZXJpYWwuc2hhZGVDb2xvci5yZ2IgKj0gdkNvbG9yO1xuICAjZW5kaWZcblxuICBtYXRlcmlhbC5zaGFkaW5nU2hpZnQgPSBzaGFkaW5nU2hpZnRGYWN0b3I7XG4gICNpZmRlZiBVU0VfU0hBRElOR1NISUZUVEVYVFVSRVxuICAgIHZlYzIgc2hhZGluZ1NoaWZ0VGV4dHVyZVV2ID0gKCBzaGFkaW5nU2hpZnRUZXh0dXJlVXZUcmFuc2Zvcm0gKiB2ZWMzKCB1diwgMSApICkueHk7XG4gICAgbWF0ZXJpYWwuc2hhZGluZ1NoaWZ0ICs9IHRleHR1cmUyRCggc2hhZGluZ1NoaWZ0VGV4dHVyZSwgc2hhZGluZ1NoaWZ0VGV4dHVyZVV2ICkuciAqIHNoYWRpbmdTaGlmdFRleHR1cmVTY2FsZTtcbiAgI2VuZGlmXG5cbiAgLy8gI2luY2x1ZGUgPGxpZ2h0c19mcmFnbWVudF9iZWdpbj5cblxuICAvLyBNVG9vbiBTcGVjaWZpYyBjaGFuZ2VzOlxuICAvLyBTaW5jZSB3ZSB3YW50IHRvIHRha2Ugc2hhZG93cyBpbnRvIGFjY291bnQgb2Ygc2hhZGluZyBpbnN0ZWFkIG9mIGlycmFkaWFuY2UsXG4gIC8vIHdlIGhhZCB0byBtb2RpZnkgdGhlIGNvZGVzIHRoYXQgbXVsdGlwbGllcyB0aGUgcmVzdWx0cyBvZiBzaGFkb3dtYXAgaW50byBjb2xvciBvZiBkaXJlY3QgbGlnaHRzLlxuXG4gIC8vIENPTVBBVDogcHJlLXIxNTYgdXNlcyBhIHN0cnVjdCBHZW9tZXRyaWNDb250ZXh0XG4gICNpZiBUSFJFRV9WUk1fVEhSRUVfUkVWSVNJT04gPj0gMTU3XG4gICAgdmVjMyBnZW9tZXRyeVBvc2l0aW9uID0gLSB2Vmlld1Bvc2l0aW9uO1xuICAgIHZlYzMgZ2VvbWV0cnlOb3JtYWwgPSBub3JtYWw7XG4gICAgdmVjMyBnZW9tZXRyeVZpZXdEaXIgPSAoIGlzT3J0aG9ncmFwaGljICkgPyB2ZWMzKCAwLCAwLCAxICkgOiBub3JtYWxpemUoIHZWaWV3UG9zaXRpb24gKTtcblxuICAgIHZlYzMgZ2VvbWV0cnlDbGVhcmNvYXROb3JtYWw7XG5cbiAgICAjaWZkZWYgVVNFX0NMRUFSQ09BVFxuXG4gICAgICBnZW9tZXRyeUNsZWFyY29hdE5vcm1hbCA9IGNsZWFyY29hdE5vcm1hbDtcblxuICAgICNlbmRpZlxuICAjZWxzZVxuICAgIEdlb21ldHJpY0NvbnRleHQgZ2VvbWV0cnk7XG5cbiAgICBnZW9tZXRyeS5wb3NpdGlvbiA9IC0gdlZpZXdQb3NpdGlvbjtcbiAgICBnZW9tZXRyeS5ub3JtYWwgPSBub3JtYWw7XG4gICAgZ2VvbWV0cnkudmlld0RpciA9ICggaXNPcnRob2dyYXBoaWMgKSA/IHZlYzMoIDAsIDAsIDEgKSA6IG5vcm1hbGl6ZSggdlZpZXdQb3NpdGlvbiApO1xuXG4gICAgI2lmZGVmIFVTRV9DTEVBUkNPQVRcblxuICAgICAgZ2VvbWV0cnkuY2xlYXJjb2F0Tm9ybWFsID0gY2xlYXJjb2F0Tm9ybWFsO1xuXG4gICAgI2VuZGlmXG4gICNlbmRpZlxuXG4gIEluY2lkZW50TGlnaHQgZGlyZWN0TGlnaHQ7XG5cbiAgLy8gc2luY2UgdGhlc2UgdmFyaWFibGVzIHdpbGwgYmUgdXNlZCBpbiB1bnJvbGxlZCBsb29wLCB3ZSBoYXZlIHRvIGRlZmluZSBpbiBwcmlvclxuICBmbG9hdCBzaGFkb3c7XG5cbiAgI2lmICggTlVNX1BPSU5UX0xJR0hUUyA+IDAgKSAmJiBkZWZpbmVkKCBSRV9EaXJlY3QgKVxuXG4gICAgUG9pbnRMaWdodCBwb2ludExpZ2h0O1xuICAgICNpZiBkZWZpbmVkKCBVU0VfU0hBRE9XTUFQICkgJiYgTlVNX1BPSU5UX0xJR0hUX1NIQURPV1MgPiAwXG4gICAgUG9pbnRMaWdodFNoYWRvdyBwb2ludExpZ2h0U2hhZG93O1xuICAgICNlbmRpZlxuXG4gICAgI3ByYWdtYSB1bnJvbGxfbG9vcF9zdGFydFxuICAgIGZvciAoIGludCBpID0gMDsgaSA8IE5VTV9QT0lOVF9MSUdIVFM7IGkgKysgKSB7XG5cbiAgICAgIHBvaW50TGlnaHQgPSBwb2ludExpZ2h0c1sgaSBdO1xuXG4gICAgICAvLyBDT01QQVQ6IHByZS1yMTU2IHVzZXMgYSBzdHJ1Y3QgR2VvbWV0cmljQ29udGV4dFxuICAgICAgI2lmIFRIUkVFX1ZSTV9USFJFRV9SRVZJU0lPTiA+PSAxNTdcbiAgICAgICAgZ2V0UG9pbnRMaWdodEluZm8oIHBvaW50TGlnaHQsIGdlb21ldHJ5UG9zaXRpb24sIGRpcmVjdExpZ2h0ICk7XG4gICAgICAjZWxzZVxuICAgICAgICBnZXRQb2ludExpZ2h0SW5mbyggcG9pbnRMaWdodCwgZ2VvbWV0cnksIGRpcmVjdExpZ2h0ICk7XG4gICAgICAjZW5kaWZcblxuICAgICAgc2hhZG93ID0gMS4wO1xuICAgICAgI2lmIGRlZmluZWQoIFVTRV9TSEFET1dNQVAgKSAmJiAoIFVOUk9MTEVEX0xPT1BfSU5ERVggPCBOVU1fUE9JTlRfTElHSFRfU0hBRE9XUyApXG4gICAgICBwb2ludExpZ2h0U2hhZG93ID0gcG9pbnRMaWdodFNoYWRvd3NbIGkgXTtcbiAgICAgIC8vIENPTVBBVDogcHJlLXIxNjZcbiAgICAgIC8vIHIxNjYgaW50cm9kdWNlZCBzaGFkb3dJbnRlbnNpdHlcbiAgICAgICNpZiBUSFJFRV9WUk1fVEhSRUVfUkVWSVNJT04gPj0gMTY2XG4gICAgICAgIHNoYWRvdyA9IGFsbCggYnZlYzIoIGRpcmVjdExpZ2h0LnZpc2libGUsIHJlY2VpdmVTaGFkb3cgKSApID8gZ2V0UG9pbnRTaGFkb3coIHBvaW50U2hhZG93TWFwWyBpIF0sIHBvaW50TGlnaHRTaGFkb3cuc2hhZG93TWFwU2l6ZSwgcG9pbnRMaWdodFNoYWRvdy5zaGFkb3dJbnRlbnNpdHksIHBvaW50TGlnaHRTaGFkb3cuc2hhZG93QmlhcywgcG9pbnRMaWdodFNoYWRvdy5zaGFkb3dSYWRpdXMsIHZQb2ludFNoYWRvd0Nvb3JkWyBpIF0sIHBvaW50TGlnaHRTaGFkb3cuc2hhZG93Q2FtZXJhTmVhciwgcG9pbnRMaWdodFNoYWRvdy5zaGFkb3dDYW1lcmFGYXIgKSA6IDEuMDtcbiAgICAgICNlbHNlXG4gICAgICAgIHNoYWRvdyA9IGFsbCggYnZlYzIoIGRpcmVjdExpZ2h0LnZpc2libGUsIHJlY2VpdmVTaGFkb3cgKSApID8gZ2V0UG9pbnRTaGFkb3coIHBvaW50U2hhZG93TWFwWyBpIF0sIHBvaW50TGlnaHRTaGFkb3cuc2hhZG93TWFwU2l6ZSwgcG9pbnRMaWdodFNoYWRvdy5zaGFkb3dCaWFzLCBwb2ludExpZ2h0U2hhZG93LnNoYWRvd1JhZGl1cywgdlBvaW50U2hhZG93Q29vcmRbIGkgXSwgcG9pbnRMaWdodFNoYWRvdy5zaGFkb3dDYW1lcmFOZWFyLCBwb2ludExpZ2h0U2hhZG93LnNoYWRvd0NhbWVyYUZhciApIDogMS4wO1xuICAgICAgI2VuZGlmXG4gICAgICAjZW5kaWZcblxuICAgICAgLy8gQ09NUEFUOiBwcmUtcjE1NiB1c2VzIGEgc3RydWN0IEdlb21ldHJpY0NvbnRleHRcbiAgICAgICNpZiBUSFJFRV9WUk1fVEhSRUVfUkVWSVNJT04gPj0gMTU3XG4gICAgICAgIFJFX0RpcmVjdCggZGlyZWN0TGlnaHQsIGdlb21ldHJ5UG9zaXRpb24sIGdlb21ldHJ5Tm9ybWFsLCBnZW9tZXRyeVZpZXdEaXIsIGdlb21ldHJ5Q2xlYXJjb2F0Tm9ybWFsLCBtYXRlcmlhbCwgc2hhZG93LCByZWZsZWN0ZWRMaWdodCApO1xuICAgICAgI2Vsc2VcbiAgICAgICAgUkVfRGlyZWN0KCBkaXJlY3RMaWdodCwgZ2VvbWV0cnksIG1hdGVyaWFsLCBzaGFkb3csIHJlZmxlY3RlZExpZ2h0ICk7XG4gICAgICAjZW5kaWZcblxuICAgIH1cbiAgICAjcHJhZ21hIHVucm9sbF9sb29wX2VuZFxuXG4gICNlbmRpZlxuXG4gICNpZiAoIE5VTV9TUE9UX0xJR0hUUyA+IDAgKSAmJiBkZWZpbmVkKCBSRV9EaXJlY3QgKVxuXG4gICAgU3BvdExpZ2h0IHNwb3RMaWdodDtcbiAgICAvLyBDT01QQVQ6IHByZS1yMTQ0IHVzZXMgTlVNX1NQT1RfTElHSFRfU0hBRE9XUywgcjE0NCsgdXNlcyBOVU1fU1BPVF9MSUdIVF9DT09SRFNcbiAgICAjaWYgVEhSRUVfVlJNX1RIUkVFX1JFVklTSU9OID49IDE0NFxuICAgICAgI2lmIGRlZmluZWQoIFVTRV9TSEFET1dNQVAgKSAmJiBOVU1fU1BPVF9MSUdIVF9DT09SRFMgPiAwXG4gICAgICBTcG90TGlnaHRTaGFkb3cgc3BvdExpZ2h0U2hhZG93O1xuICAgICAgI2VuZGlmXG4gICAgI2VsaWYgZGVmaW5lZCggVVNFX1NIQURPV01BUCApICYmIE5VTV9TUE9UX0xJR0hUX1NIQURPV1MgPiAwXG4gICAgU3BvdExpZ2h0U2hhZG93IHNwb3RMaWdodFNoYWRvdztcbiAgICAjZW5kaWZcblxuICAgICNwcmFnbWEgdW5yb2xsX2xvb3Bfc3RhcnRcbiAgICBmb3IgKCBpbnQgaSA9IDA7IGkgPCBOVU1fU1BPVF9MSUdIVFM7IGkgKysgKSB7XG5cbiAgICAgIHNwb3RMaWdodCA9IHNwb3RMaWdodHNbIGkgXTtcblxuICAgICAgLy8gQ09NUEFUOiBwcmUtcjE1NiB1c2VzIGEgc3RydWN0IEdlb21ldHJpY0NvbnRleHRcbiAgICAgICNpZiBUSFJFRV9WUk1fVEhSRUVfUkVWSVNJT04gPj0gMTU3XG4gICAgICAgIGdldFNwb3RMaWdodEluZm8oIHNwb3RMaWdodCwgZ2VvbWV0cnlQb3NpdGlvbiwgZGlyZWN0TGlnaHQgKTtcbiAgICAgICNlbHNlXG4gICAgICAgIGdldFNwb3RMaWdodEluZm8oIHNwb3RMaWdodCwgZ2VvbWV0cnksIGRpcmVjdExpZ2h0ICk7XG4gICAgICAjZW5kaWZcblxuICAgICAgc2hhZG93ID0gMS4wO1xuICAgICAgLy8gQ09NUEFUOiBwcmUtcjE0NCB1c2VzIE5VTV9TUE9UX0xJR0hUX1NIQURPV1MgYW5kIHZTcG90U2hhZG93Q29vcmQsIHIxNDQrIHVzZXMgTlVNX1NQT1RfTElHSFRfQ09PUkRTIGFuZCB2U3BvdExpZ2h0Q29vcmRcbiAgICAgIC8vIENPTVBBVDogcHJlLXIxNjYgZG9lcyBub3QgaGF2ZSBzaGFkb3dJbnRlbnNpdHksIHIxNjYrIGhhcyBzaGFkb3dJbnRlbnNpdHlcbiAgICAgICNpZiBUSFJFRV9WUk1fVEhSRUVfUkVWSVNJT04gPj0gMTY2XG4gICAgICAgICNpZiBkZWZpbmVkKCBVU0VfU0hBRE9XTUFQICkgJiYgKCBVTlJPTExFRF9MT09QX0lOREVYIDwgTlVNX1NQT1RfTElHSFRfQ09PUkRTIClcbiAgICAgICAgc3BvdExpZ2h0U2hhZG93ID0gc3BvdExpZ2h0U2hhZG93c1sgaSBdO1xuICAgICAgICBzaGFkb3cgPSBhbGwoIGJ2ZWMyKCBkaXJlY3RMaWdodC52aXNpYmxlLCByZWNlaXZlU2hhZG93ICkgKSA/IGdldFNoYWRvdyggc3BvdFNoYWRvd01hcFsgaSBdLCBzcG90TGlnaHRTaGFkb3cuc2hhZG93TWFwU2l6ZSwgc3BvdExpZ2h0U2hhZG93LnNoYWRvd0ludGVuc2l0eSwgc3BvdExpZ2h0U2hhZG93LnNoYWRvd0JpYXMsIHNwb3RMaWdodFNoYWRvdy5zaGFkb3dSYWRpdXMsIHZTcG90TGlnaHRDb29yZFsgaSBdICkgOiAxLjA7XG4gICAgICAgICNlbmRpZlxuICAgICAgI2VsaWYgVEhSRUVfVlJNX1RIUkVFX1JFVklTSU9OID49IDE0NFxuICAgICAgICAjaWYgZGVmaW5lZCggVVNFX1NIQURPV01BUCApICYmICggVU5ST0xMRURfTE9PUF9JTkRFWCA8IE5VTV9TUE9UX0xJR0hUX0NPT1JEUyApXG4gICAgICAgIHNwb3RMaWdodFNoYWRvdyA9IHNwb3RMaWdodFNoYWRvd3NbIGkgXTtcbiAgICAgICAgc2hhZG93ID0gYWxsKCBidmVjMiggZGlyZWN0TGlnaHQudmlzaWJsZSwgcmVjZWl2ZVNoYWRvdyApICkgPyBnZXRTaGFkb3coIHNwb3RTaGFkb3dNYXBbIGkgXSwgc3BvdExpZ2h0U2hhZG93LnNoYWRvd01hcFNpemUsIHNwb3RMaWdodFNoYWRvdy5zaGFkb3dCaWFzLCBzcG90TGlnaHRTaGFkb3cuc2hhZG93UmFkaXVzLCB2U3BvdExpZ2h0Q29vcmRbIGkgXSApIDogMS4wO1xuICAgICAgICAjZW5kaWZcbiAgICAgICNlbGlmIGRlZmluZWQoIFVTRV9TSEFET1dNQVAgKSAmJiAoIFVOUk9MTEVEX0xPT1BfSU5ERVggPCBOVU1fU1BPVF9MSUdIVF9TSEFET1dTIClcbiAgICAgIHNwb3RMaWdodFNoYWRvdyA9IHNwb3RMaWdodFNoYWRvd3NbIGkgXTtcbiAgICAgIHNoYWRvdyA9IGFsbCggYnZlYzIoIGRpcmVjdExpZ2h0LnZpc2libGUsIHJlY2VpdmVTaGFkb3cgKSApID8gZ2V0U2hhZG93KCBzcG90U2hhZG93TWFwWyBpIF0sIHNwb3RMaWdodFNoYWRvdy5zaGFkb3dNYXBTaXplLCBzcG90TGlnaHRTaGFkb3cuc2hhZG93Qmlhcywgc3BvdExpZ2h0U2hhZG93LnNoYWRvd1JhZGl1cywgdlNwb3RTaGFkb3dDb29yZFsgaSBdICkgOiAxLjA7XG4gICAgICAjZW5kaWZcblxuICAgICAgLy8gQ09NUEFUOiBwcmUtcjE1NiB1c2VzIGEgc3RydWN0IEdlb21ldHJpY0NvbnRleHRcbiAgICAgICNpZiBUSFJFRV9WUk1fVEhSRUVfUkVWSVNJT04gPj0gMTU3XG4gICAgICAgIFJFX0RpcmVjdCggZGlyZWN0TGlnaHQsIGdlb21ldHJ5UG9zaXRpb24sIGdlb21ldHJ5Tm9ybWFsLCBnZW9tZXRyeVZpZXdEaXIsIGdlb21ldHJ5Q2xlYXJjb2F0Tm9ybWFsLCBtYXRlcmlhbCwgc2hhZG93LCByZWZsZWN0ZWRMaWdodCApO1xuICAgICAgI2Vsc2VcbiAgICAgICAgUkVfRGlyZWN0KCBkaXJlY3RMaWdodCwgZ2VvbWV0cnksIG1hdGVyaWFsLCBzaGFkb3csIHJlZmxlY3RlZExpZ2h0ICk7XG4gICAgICAjZW5kaWZcblxuICAgIH1cbiAgICAjcHJhZ21hIHVucm9sbF9sb29wX2VuZFxuXG4gICNlbmRpZlxuXG4gICNpZiAoIE5VTV9ESVJfTElHSFRTID4gMCApICYmIGRlZmluZWQoIFJFX0RpcmVjdCApXG5cbiAgICBEaXJlY3Rpb25hbExpZ2h0IGRpcmVjdGlvbmFsTGlnaHQ7XG4gICAgI2lmIGRlZmluZWQoIFVTRV9TSEFET1dNQVAgKSAmJiBOVU1fRElSX0xJR0hUX1NIQURPV1MgPiAwXG4gICAgRGlyZWN0aW9uYWxMaWdodFNoYWRvdyBkaXJlY3Rpb25hbExpZ2h0U2hhZG93O1xuICAgICNlbmRpZlxuXG4gICAgI3ByYWdtYSB1bnJvbGxfbG9vcF9zdGFydFxuICAgIGZvciAoIGludCBpID0gMDsgaSA8IE5VTV9ESVJfTElHSFRTOyBpICsrICkge1xuXG4gICAgICBkaXJlY3Rpb25hbExpZ2h0ID0gZGlyZWN0aW9uYWxMaWdodHNbIGkgXTtcblxuICAgICAgLy8gQ09NUEFUOiBwcmUtcjE1NiB1c2VzIGEgc3RydWN0IEdlb21ldHJpY0NvbnRleHRcbiAgICAgICNpZiBUSFJFRV9WUk1fVEhSRUVfUkVWSVNJT04gPj0gMTU3XG4gICAgICAgIGdldERpcmVjdGlvbmFsTGlnaHRJbmZvKCBkaXJlY3Rpb25hbExpZ2h0LCBkaXJlY3RMaWdodCApO1xuICAgICAgI2Vsc2VcbiAgICAgICAgZ2V0RGlyZWN0aW9uYWxMaWdodEluZm8oIGRpcmVjdGlvbmFsTGlnaHQsIGdlb21ldHJ5LCBkaXJlY3RMaWdodCApO1xuICAgICAgI2VuZGlmXG5cbiAgICAgIHNoYWRvdyA9IDEuMDtcbiAgICAgICNpZiBkZWZpbmVkKCBVU0VfU0hBRE9XTUFQICkgJiYgKCBVTlJPTExFRF9MT09QX0lOREVYIDwgTlVNX0RJUl9MSUdIVF9TSEFET1dTIClcbiAgICAgIGRpcmVjdGlvbmFsTGlnaHRTaGFkb3cgPSBkaXJlY3Rpb25hbExpZ2h0U2hhZG93c1sgaSBdO1xuICAgICAgLy8gQ09NUEFUOiBwcmUtcjE2NlxuICAgICAgLy8gcjE2NiBpbnRyb2R1Y2VkIHNoYWRvd0ludGVuc2l0eVxuICAgICAgI2lmIFRIUkVFX1ZSTV9USFJFRV9SRVZJU0lPTiA+PSAxNjZcbiAgICAgICAgc2hhZG93ID0gYWxsKCBidmVjMiggZGlyZWN0TGlnaHQudmlzaWJsZSwgcmVjZWl2ZVNoYWRvdyApICkgPyBnZXRTaGFkb3coIGRpcmVjdGlvbmFsU2hhZG93TWFwWyBpIF0sIGRpcmVjdGlvbmFsTGlnaHRTaGFkb3cuc2hhZG93TWFwU2l6ZSwgZGlyZWN0aW9uYWxMaWdodFNoYWRvdy5zaGFkb3dJbnRlbnNpdHksIGRpcmVjdGlvbmFsTGlnaHRTaGFkb3cuc2hhZG93QmlhcywgZGlyZWN0aW9uYWxMaWdodFNoYWRvdy5zaGFkb3dSYWRpdXMsIHZEaXJlY3Rpb25hbFNoYWRvd0Nvb3JkWyBpIF0gKSA6IDEuMDtcbiAgICAgICNlbHNlXG4gICAgICAgIHNoYWRvdyA9IGFsbCggYnZlYzIoIGRpcmVjdExpZ2h0LnZpc2libGUsIHJlY2VpdmVTaGFkb3cgKSApID8gZ2V0U2hhZG93KCBkaXJlY3Rpb25hbFNoYWRvd01hcFsgaSBdLCBkaXJlY3Rpb25hbExpZ2h0U2hhZG93LnNoYWRvd01hcFNpemUsIGRpcmVjdGlvbmFsTGlnaHRTaGFkb3cuc2hhZG93QmlhcywgZGlyZWN0aW9uYWxMaWdodFNoYWRvdy5zaGFkb3dSYWRpdXMsIHZEaXJlY3Rpb25hbFNoYWRvd0Nvb3JkWyBpIF0gKSA6IDEuMDtcbiAgICAgICNlbmRpZlxuICAgICAgI2VuZGlmXG5cbiAgICAgIC8vIENPTVBBVDogcHJlLXIxNTYgdXNlcyBhIHN0cnVjdCBHZW9tZXRyaWNDb250ZXh0XG4gICAgICAjaWYgVEhSRUVfVlJNX1RIUkVFX1JFVklTSU9OID49IDE1N1xuICAgICAgICBSRV9EaXJlY3QoIGRpcmVjdExpZ2h0LCBnZW9tZXRyeVBvc2l0aW9uLCBnZW9tZXRyeU5vcm1hbCwgZ2VvbWV0cnlWaWV3RGlyLCBnZW9tZXRyeUNsZWFyY29hdE5vcm1hbCwgbWF0ZXJpYWwsIHNoYWRvdywgcmVmbGVjdGVkTGlnaHQgKTtcbiAgICAgICNlbHNlXG4gICAgICAgIFJFX0RpcmVjdCggZGlyZWN0TGlnaHQsIGdlb21ldHJ5LCBtYXRlcmlhbCwgc2hhZG93LCByZWZsZWN0ZWRMaWdodCApO1xuICAgICAgI2VuZGlmXG5cbiAgICB9XG4gICAgI3ByYWdtYSB1bnJvbGxfbG9vcF9lbmRcblxuICAjZW5kaWZcblxuICAvLyAjaWYgKCBOVU1fUkVDVF9BUkVBX0xJR0hUUyA+IDAgKSAmJiBkZWZpbmVkKCBSRV9EaXJlY3RfUmVjdEFyZWEgKVxuXG4gIC8vICAgUmVjdEFyZWFMaWdodCByZWN0QXJlYUxpZ2h0O1xuXG4gIC8vICAgI3ByYWdtYSB1bnJvbGxfbG9vcF9zdGFydFxuICAvLyAgIGZvciAoIGludCBpID0gMDsgaSA8IE5VTV9SRUNUX0FSRUFfTElHSFRTOyBpICsrICkge1xuXG4gIC8vICAgICByZWN0QXJlYUxpZ2h0ID0gcmVjdEFyZWFMaWdodHNbIGkgXTtcbiAgLy8gICAgIFJFX0RpcmVjdF9SZWN0QXJlYSggcmVjdEFyZWFMaWdodCwgZ2VvbWV0cnksIG1hdGVyaWFsLCByZWZsZWN0ZWRMaWdodCApO1xuXG4gIC8vICAgfVxuICAvLyAgICNwcmFnbWEgdW5yb2xsX2xvb3BfZW5kXG5cbiAgLy8gI2VuZGlmXG5cbiAgI2lmIGRlZmluZWQoIFJFX0luZGlyZWN0RGlmZnVzZSApXG5cbiAgICB2ZWMzIGlibElycmFkaWFuY2UgPSB2ZWMzKCAwLjAgKTtcblxuICAgIHZlYzMgaXJyYWRpYW5jZSA9IGdldEFtYmllbnRMaWdodElycmFkaWFuY2UoIGFtYmllbnRMaWdodENvbG9yICk7XG5cbiAgICAvLyBDT01QQVQ6IHByZS1yMTU2IHVzZXMgYSBzdHJ1Y3QgR2VvbWV0cmljQ29udGV4dFxuICAgIC8vIENPTVBBVDogcHJlLXIxNTYgZG9lc24ndCBoYXZlIGEgZGVmaW5lIFVTRV9MSUdIVF9QUk9CRVNcbiAgICAjaWYgVEhSRUVfVlJNX1RIUkVFX1JFVklTSU9OID49IDE1N1xuICAgICAgI2lmIGRlZmluZWQoIFVTRV9MSUdIVF9QUk9CRVMgKVxuICAgICAgICBpcnJhZGlhbmNlICs9IGdldExpZ2h0UHJvYmVJcnJhZGlhbmNlKCBsaWdodFByb2JlLCBnZW9tZXRyeU5vcm1hbCApO1xuICAgICAgI2VuZGlmXG4gICAgI2Vsc2VcbiAgICAgIGlycmFkaWFuY2UgKz0gZ2V0TGlnaHRQcm9iZUlycmFkaWFuY2UoIGxpZ2h0UHJvYmUsIGdlb21ldHJ5Lm5vcm1hbCApO1xuICAgICNlbmRpZlxuXG4gICAgI2lmICggTlVNX0hFTUlfTElHSFRTID4gMCApXG5cbiAgICAgICNwcmFnbWEgdW5yb2xsX2xvb3Bfc3RhcnRcbiAgICAgIGZvciAoIGludCBpID0gMDsgaSA8IE5VTV9IRU1JX0xJR0hUUzsgaSArKyApIHtcblxuICAgICAgICAvLyBDT01QQVQ6IHByZS1yMTU2IHVzZXMgYSBzdHJ1Y3QgR2VvbWV0cmljQ29udGV4dFxuICAgICAgICAjaWYgVEhSRUVfVlJNX1RIUkVFX1JFVklTSU9OID49IDE1N1xuICAgICAgICAgIGlycmFkaWFuY2UgKz0gZ2V0SGVtaXNwaGVyZUxpZ2h0SXJyYWRpYW5jZSggaGVtaXNwaGVyZUxpZ2h0c1sgaSBdLCBnZW9tZXRyeU5vcm1hbCApO1xuICAgICAgICAjZWxzZVxuICAgICAgICAgIGlycmFkaWFuY2UgKz0gZ2V0SGVtaXNwaGVyZUxpZ2h0SXJyYWRpYW5jZSggaGVtaXNwaGVyZUxpZ2h0c1sgaSBdLCBnZW9tZXRyeS5ub3JtYWwgKTtcbiAgICAgICAgI2VuZGlmXG5cbiAgICAgIH1cbiAgICAgICNwcmFnbWEgdW5yb2xsX2xvb3BfZW5kXG5cbiAgICAjZW5kaWZcblxuICAjZW5kaWZcblxuICAvLyAjaWYgZGVmaW5lZCggUkVfSW5kaXJlY3RTcGVjdWxhciApXG5cbiAgLy8gICB2ZWMzIHJhZGlhbmNlID0gdmVjMyggMC4wICk7XG4gIC8vICAgdmVjMyBjbGVhcmNvYXRSYWRpYW5jZSA9IHZlYzMoIDAuMCApO1xuXG4gIC8vICNlbmRpZlxuXG4gICNpbmNsdWRlIDxsaWdodHNfZnJhZ21lbnRfbWFwcz5cbiAgI2luY2x1ZGUgPGxpZ2h0c19mcmFnbWVudF9lbmQ+XG5cbiAgLy8gbW9kdWxhdGlvblxuICAjaW5jbHVkZSA8YW9tYXBfZnJhZ21lbnQ+XG5cbiAgdmVjMyBjb2wgPSByZWZsZWN0ZWRMaWdodC5kaXJlY3REaWZmdXNlICsgcmVmbGVjdGVkTGlnaHQuaW5kaXJlY3REaWZmdXNlO1xuXG4gICNpZmRlZiBERUJVR19MSVRTSEFERVJBVEVcbiAgICBnbF9GcmFnQ29sb3IgPSB2ZWM0KCBjb2wsIGRpZmZ1c2VDb2xvci5hICk7XG4gICAgcG9zdENvcnJlY3Rpb24oKTtcbiAgICByZXR1cm47XG4gICNlbmRpZlxuXG4gIC8vIC0tIE1Ub29uOiByaW0gbGlnaHRpbmcgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgdmVjMyB2aWV3RGlyID0gbm9ybWFsaXplKCB2Vmlld1Bvc2l0aW9uICk7XG5cbiAgI2lmbmRlZiBQSFlTSUNBTExZX0NPUlJFQ1RfTElHSFRTXG4gICAgcmVmbGVjdGVkTGlnaHQuZGlyZWN0U3BlY3VsYXIgLz0gUEk7XG4gICNlbmRpZlxuICB2ZWMzIHJpbU1peCA9IG1peCggdmVjMyggMS4wICksIHJlZmxlY3RlZExpZ2h0LmRpcmVjdFNwZWN1bGFyLCByaW1MaWdodGluZ01peEZhY3RvciApO1xuXG4gIHZlYzMgcmltID0gcGFyYW1ldHJpY1JpbUNvbG9yRmFjdG9yICogcG93KCBzYXR1cmF0ZSggMS4wIC0gZG90KCB2aWV3RGlyLCBub3JtYWwgKSArIHBhcmFtZXRyaWNSaW1MaWZ0RmFjdG9yICksIHBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJGYWN0b3IgKTtcblxuICAjaWZkZWYgVVNFX01BVENBUFRFWFRVUkVcbiAgICB7XG4gICAgICB2ZWMzIHggPSBub3JtYWxpemUoIHZlYzMoIHZpZXdEaXIueiwgMC4wLCAtdmlld0Rpci54ICkgKTtcbiAgICAgIHZlYzMgeSA9IGNyb3NzKCB2aWV3RGlyLCB4ICk7IC8vIGd1YXJhbnRlZWQgdG8gYmUgbm9ybWFsaXplZFxuICAgICAgdmVjMiBzcGhlcmVVdiA9IDAuNSArIDAuNSAqIHZlYzIoIGRvdCggeCwgbm9ybWFsICksIC1kb3QoIHksIG5vcm1hbCApICk7XG4gICAgICBzcGhlcmVVdiA9ICggbWF0Y2FwVGV4dHVyZVV2VHJhbnNmb3JtICogdmVjMyggc3BoZXJlVXYsIDEgKSApLnh5O1xuICAgICAgdmVjMyBtYXRjYXAgPSB0ZXh0dXJlMkQoIG1hdGNhcFRleHR1cmUsIHNwaGVyZVV2ICkucmdiO1xuICAgICAgcmltICs9IG1hdGNhcEZhY3RvciAqIG1hdGNhcDtcbiAgICB9XG4gICNlbmRpZlxuXG4gICNpZmRlZiBVU0VfUklNTVVMVElQTFlURVhUVVJFXG4gICAgdmVjMiByaW1NdWx0aXBseVRleHR1cmVVdiA9ICggcmltTXVsdGlwbHlUZXh0dXJlVXZUcmFuc2Zvcm0gKiB2ZWMzKCB1diwgMSApICkueHk7XG4gICAgcmltICo9IHRleHR1cmUyRCggcmltTXVsdGlwbHlUZXh0dXJlLCByaW1NdWx0aXBseVRleHR1cmVVdiApLnJnYjtcbiAgI2VuZGlmXG5cbiAgY29sICs9IHJpbU1peCAqIHJpbTtcblxuICAvLyAtLSBNVG9vbjogRW1pc3Npb24gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgY29sICs9IHRvdGFsRW1pc3NpdmVSYWRpYW5jZTtcblxuICAvLyAjaW5jbHVkZSA8ZW52bWFwX2ZyYWdtZW50PlxuXG4gIC8vIC0tIEFsbW9zdCBkb25lISAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAjaWYgZGVmaW5lZCggT1VUTElORSApXG4gICAgY29sID0gb3V0bGluZUNvbG9yRmFjdG9yLnJnYiAqIG1peCggdmVjMyggMS4wICksIGNvbCwgb3V0bGluZUxpZ2h0aW5nTWl4RmFjdG9yICk7XG4gICNlbmRpZlxuXG4gICNpZmRlZiBPUEFRVUVcbiAgICBkaWZmdXNlQ29sb3IuYSA9IDEuMDtcbiAgI2VuZGlmXG5cbiAgZ2xfRnJhZ0NvbG9yID0gdmVjNCggY29sLCBkaWZmdXNlQ29sb3IuYSApO1xuICBwb3N0Q29ycmVjdGlvbigpO1xufVxuIiwgIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiAqL1xuXG4vKipcbiAqIFNwZWNpZmllcnMgb2YgZGVidWcgbW9kZSBvZiB7QGxpbmsgTVRvb25NYXRlcmlhbH0uXG4gKlxuICogU2VlOiB7QGxpbmsgTVRvb25NYXRlcmlhbC5kZWJ1Z01vZGV9XG4gKi9cbmV4cG9ydCBjb25zdCBNVG9vbk1hdGVyaWFsRGVidWdNb2RlID0ge1xuICAvKipcbiAgICogUmVuZGVyIG5vcm1hbGx5LlxuICAgKi9cbiAgTm9uZTogJ25vbmUnLFxuXG4gIC8qKlxuICAgKiBWaXN1YWxpemUgbm9ybWFscyBvZiB0aGUgc3VyZmFjZS5cbiAgICovXG4gIE5vcm1hbDogJ25vcm1hbCcsXG5cbiAgLyoqXG4gICAqIFZpc3VhbGl6ZSBsaXQvc2hhZGUgb2YgdGhlIHN1cmZhY2UuXG4gICAqL1xuICBMaXRTaGFkZVJhdGU6ICdsaXRTaGFkZVJhdGUnLFxuXG4gIC8qKlxuICAgKiBWaXN1YWxpemUgVVYgb2YgdGhlIHN1cmZhY2UuXG4gICAqL1xuICBVVjogJ3V2Jyxcbn0gYXMgY29uc3Q7XG5cbmV4cG9ydCB0eXBlIE1Ub29uTWF0ZXJpYWxEZWJ1Z01vZGUgPSAodHlwZW9mIE1Ub29uTWF0ZXJpYWxEZWJ1Z01vZGUpW2tleW9mIHR5cGVvZiBNVG9vbk1hdGVyaWFsRGVidWdNb2RlXTtcbiIsICIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cblxuZXhwb3J0IGNvbnN0IE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlID0ge1xuICBOb25lOiAnbm9uZScsXG4gIFdvcmxkQ29vcmRpbmF0ZXM6ICd3b3JsZENvb3JkaW5hdGVzJyxcbiAgU2NyZWVuQ29vcmRpbmF0ZXM6ICdzY3JlZW5Db29yZGluYXRlcycsXG59IGFzIGNvbnN0O1xuXG5leHBvcnQgdHlwZSBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZSA9XG4gICh0eXBlb2YgTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUpW2tleW9mIHR5cGVvZiBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZV07XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG5jb25zdCBlbmNvZGluZ0NvbG9yU3BhY2VNYXA6IFJlY29yZDxhbnksICcnIHwgJ3NyZ2InPiA9IHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxuICAzMDAwOiAnJyxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxuICAzMDAxOiAnc3JnYicsXG59O1xuXG4vKipcbiAqIEEgY29tcGF0IGZ1bmN0aW9uIHRvIGdldCB0ZXh0dXJlIGNvbG9yIHNwYWNlLlxuICpcbiAqIENPTVBBVDogcHJlLXIxNTJcbiAqIFN0YXJ0aW5nIGZyb20gVGhyZWUuanMgcjE1MiwgYHRleHR1cmUuZW5jb2RpbmdgIGlzIHJlbmFtZWQgdG8gYHRleHR1cmUuY29sb3JTcGFjZWAuXG4gKiBUaGlzIGZ1bmN0aW9uIHdpbGwgaGFuZGxlIHRoZSBjb21hcHQuXG4gKlxuICogQHBhcmFtIHRleHR1cmUgVGhlIHRleHR1cmUgeW91IHdhbnQgdG8gZ2V0IHRoZSBjb2xvciBzcGFjZSBmcm9tXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRUZXh0dXJlQ29sb3JTcGFjZSh0ZXh0dXJlOiBUSFJFRS5UZXh0dXJlKTogJycgfCAnc3JnYicge1xuICBpZiAocGFyc2VJbnQoVEhSRUUuUkVWSVNJT04sIDEwKSA+PSAxNTIpIHtcbiAgICByZXR1cm4gdGV4dHVyZS5jb2xvclNwYWNlIGFzICcnIHwgJ3NyZ2InO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBlbmNvZGluZ0NvbG9yU3BhY2VNYXBbKHRleHR1cmUgYXMgYW55KS5lbmNvZGluZ107XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBHTFRGTG9hZGVyUGx1Z2luLCBHTFRGUGFyc2VyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlci5qcyc7XG5pbXBvcnQgKiBhcyBIRFJFbWlzc2l2ZU11bHRpcGxpZXJTY2hlbWEgZnJvbSAnQHBpeGl2L3R5cGVzLXZybWMtbWF0ZXJpYWxzLWhkci1lbWlzc2l2ZS1tdWx0aXBsaWVyLTEuMCc7XG5pbXBvcnQgeyBHTFRGIGFzIEdMVEZTY2hlbWEgfSBmcm9tICdAZ2x0Zi10cmFuc2Zvcm0vY29yZSc7XG5cbmV4cG9ydCBjbGFzcyBWUk1NYXRlcmlhbHNIRFJFbWlzc2l2ZU11bHRpcGxpZXJMb2FkZXJQbHVnaW4gaW1wbGVtZW50cyBHTFRGTG9hZGVyUGx1Z2luIHtcbiAgcHVibGljIHN0YXRpYyBFWFRFTlNJT05fTkFNRSA9ICdWUk1DX21hdGVyaWFsc19oZHJfZW1pc3NpdmVNdWx0aXBsaWVyJyBhcyBjb25zdDtcblxuICBwdWJsaWMgcmVhZG9ubHkgcGFyc2VyOiBHTFRGUGFyc2VyO1xuXG4gIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBWUk1NYXRlcmlhbHNIRFJFbWlzc2l2ZU11bHRpcGxpZXJMb2FkZXJQbHVnaW4uRVhURU5TSU9OX05BTUU7XG4gIH1cblxuICBwdWJsaWMgY29uc3RydWN0b3IocGFyc2VyOiBHTFRGUGFyc2VyKSB7XG4gICAgdGhpcy5wYXJzZXIgPSBwYXJzZXI7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZXh0ZW5kTWF0ZXJpYWxQYXJhbXMobWF0ZXJpYWxJbmRleDogbnVtYmVyLCBtYXRlcmlhbFBhcmFtczogeyBba2V5OiBzdHJpbmddOiBhbnkgfSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGV4dGVuc2lvbiA9IHRoaXMuX2dldEhEUkVtaXNzaXZlTXVsdGlwbGllckV4dGVuc2lvbihtYXRlcmlhbEluZGV4KTtcbiAgICBpZiAoZXh0ZW5zaW9uID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBUaGlzIGV4dGVuc2lvbiBpcyBhcmNoaXZlZC4gRW1pdCB3YXJuaW5nXG4gICAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vdnJtLWMvdnJtLXNwZWNpZmljYXRpb24vcHVsbC8zNzVcbiAgICBjb25zb2xlLndhcm4oXG4gICAgICAnVlJNTWF0ZXJpYWxzSERSRW1pc3NpdmVNdWx0aXBsaWVyTG9hZGVyUGx1Z2luOiBgVlJNQ19tYXRlcmlhbHNfaGRyX2VtaXNzaXZlTXVsdGlwbGllcmAgaXMgYXJjaGl2ZWQuIFVzZSBgS0hSX21hdGVyaWFsc19lbWlzc2l2ZV9zdHJlbmd0aGAgaW5zdGVhZC4nLFxuICAgICk7XG5cbiAgICBjb25zdCBlbWlzc2l2ZU11bHRpcGxpZXIgPSBleHRlbnNpb24uZW1pc3NpdmVNdWx0aXBsaWVyO1xuICAgIG1hdGVyaWFsUGFyYW1zLmVtaXNzaXZlSW50ZW5zaXR5ID0gZW1pc3NpdmVNdWx0aXBsaWVyO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0SERSRW1pc3NpdmVNdWx0aXBsaWVyRXh0ZW5zaW9uKFxuICAgIG1hdGVyaWFsSW5kZXg6IG51bWJlcixcbiAgKTogSERSRW1pc3NpdmVNdWx0aXBsaWVyU2NoZW1hLlZSTUNNYXRlcmlhbHNIRFJFbWlzc2l2ZU11bHRpcGxpZXIgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IHBhcnNlciA9IHRoaXMucGFyc2VyO1xuICAgIGNvbnN0IGpzb24gPSBwYXJzZXIuanNvbiBhcyBHTFRGU2NoZW1hLklHTFRGO1xuXG4gICAgY29uc3QgbWF0ZXJpYWxEZWYgPSBqc29uLm1hdGVyaWFscz8uW21hdGVyaWFsSW5kZXhdO1xuXG4gICAgaWYgKG1hdGVyaWFsRGVmID09IG51bGwpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgYFZSTU1hdGVyaWFsc0hEUkVtaXNzaXZlTXVsdGlwbGllckxvYWRlclBsdWdpbjogQXR0ZW1wdCB0byB1c2UgbWF0ZXJpYWxzWyR7bWF0ZXJpYWxJbmRleH1dIG9mIGdsVEYgYnV0IHRoZSBtYXRlcmlhbCBkb2Vzbid0IGV4aXN0YCxcbiAgICAgICk7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGNvbnN0IGV4dGVuc2lvbiA9IG1hdGVyaWFsRGVmLmV4dGVuc2lvbnM/LltWUk1NYXRlcmlhbHNIRFJFbWlzc2l2ZU11bHRpcGxpZXJMb2FkZXJQbHVnaW4uRVhURU5TSU9OX05BTUVdIGFzXG4gICAgICB8IEhEUkVtaXNzaXZlTXVsdGlwbGllclNjaGVtYS5WUk1DTWF0ZXJpYWxzSERSRW1pc3NpdmVNdWx0aXBsaWVyXG4gICAgICB8IHVuZGVmaW5lZDtcbiAgICBpZiAoZXh0ZW5zaW9uID09IG51bGwpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGV4dGVuc2lvbjtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTSBhcyBWMFZSTSwgTWF0ZXJpYWwgYXMgVjBNYXRlcmlhbCB9IGZyb20gJ0BwaXhpdi90eXBlcy12cm0tMC4wJztcbmltcG9ydCAqIGFzIFYxTVRvb25TY2hlbWEgZnJvbSAnQHBpeGl2L3R5cGVzLXZybWMtbWF0ZXJpYWxzLW10b29uLTEuMCc7XG5pbXBvcnQgdHlwZSB7IEdMVEZMb2FkZXJQbHVnaW4sIEdMVEZQYXJzZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyLmpzJztcbmltcG9ydCB7IGdhbW1hRU9URiB9IGZyb20gJy4vdXRpbHMvZ2FtbWFFT1RGJztcbmltcG9ydCB7IEdMVEYgYXMgR0xURlNjaGVtYSB9IGZyb20gJ0BnbHRmLXRyYW5zZm9ybS9jb3JlJztcblxuZXhwb3J0IGNsYXNzIFZSTU1hdGVyaWFsc1YwQ29tcGF0UGx1Z2luIGltcGxlbWVudHMgR0xURkxvYWRlclBsdWdpbiB7XG4gIHB1YmxpYyByZWFkb25seSBwYXJzZXI6IEdMVEZQYXJzZXI7XG5cbiAgLyoqXG4gICAqIEEgbWFwIGZyb20gdjAgcmVuZGVyIHF1ZXVlIHRvIHYxIHJlbmRlciBxdWV1ZSBvZmZzZXQsIGZvciBUcmFuc3BhcmVudCBtYXRlcmlhbHMuXG4gICAqL1xuICBwcml2YXRlIHJlYWRvbmx5IF9yZW5kZXJRdWV1ZU1hcFRyYW5zcGFyZW50OiBNYXA8bnVtYmVyLCBudW1iZXI+O1xuXG4gIC8qKlxuICAgKiBBIG1hcCBmcm9tIHYwIHJlbmRlciBxdWV1ZSB0byB2MSByZW5kZXIgcXVldWUgb2Zmc2V0LCBmb3IgVHJhbnNwYXJlbnRaV3JpdGUgbWF0ZXJpYWxzLlxuICAgKi9cbiAgcHJpdmF0ZSByZWFkb25seSBfcmVuZGVyUXVldWVNYXBUcmFuc3BhcmVudFpXcml0ZTogTWFwPG51bWJlciwgbnVtYmVyPjtcblxuICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJ1ZSTU1hdGVyaWFsc1YwQ29tcGF0UGx1Z2luJztcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJzZXI6IEdMVEZQYXJzZXIpIHtcbiAgICB0aGlzLnBhcnNlciA9IHBhcnNlcjtcblxuICAgIHRoaXMuX3JlbmRlclF1ZXVlTWFwVHJhbnNwYXJlbnQgPSBuZXcgTWFwKCk7XG4gICAgdGhpcy5fcmVuZGVyUXVldWVNYXBUcmFuc3BhcmVudFpXcml0ZSA9IG5ldyBNYXAoKTtcblxuICAgIC8vIFdPUktBUk9VTkQ6IEFkZCBLSFJfdGV4dHVyZV90cmFuc2Zvcm0gdG8gZXh0ZW5zaW9uc1VzZWRcbiAgICAvLyBJdCBpcyB0b28gbGF0ZSB0byBhZGQgdGhpcyBpbiBiZWZvcmVSb290XG4gICAgY29uc3QganNvbiA9IHRoaXMucGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAgIGpzb24uZXh0ZW5zaW9uc1VzZWQgPSBqc29uLmV4dGVuc2lvbnNVc2VkID8/IFtdO1xuICAgIGlmIChqc29uLmV4dGVuc2lvbnNVc2VkLmluZGV4T2YoJ0tIUl90ZXh0dXJlX3RyYW5zZm9ybScpID09PSAtMSkge1xuICAgICAganNvbi5leHRlbnNpb25zVXNlZC5wdXNoKCdLSFJfdGV4dHVyZV90cmFuc2Zvcm0nKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgYmVmb3JlUm9vdCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBqc29uID0gdGhpcy5wYXJzZXIuanNvbiBhcyBHTFRGU2NoZW1hLklHTFRGO1xuXG4gICAgLy8gZWFybHkgYWJvcnQgaWYgaXQgZG9lc24ndCB1c2UgVjBWUk1cbiAgICBjb25zdCB2MFZSTUV4dGVuc2lvbiA9IGpzb24uZXh0ZW5zaW9ucz8uWydWUk0nXSBhcyBWMFZSTSB8IHVuZGVmaW5lZDtcbiAgICBjb25zdCB2ME1hdGVyaWFsUHJvcGVydGllcyA9IHYwVlJNRXh0ZW5zaW9uPy5tYXRlcmlhbFByb3BlcnRpZXM7XG4gICAgaWYgKCF2ME1hdGVyaWFsUHJvcGVydGllcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIHBvcHVsYXRlIHJlbmRlciBxdWV1ZSBtYXBcbiAgICB0aGlzLl9wb3B1bGF0ZVJlbmRlclF1ZXVlTWFwKHYwTWF0ZXJpYWxQcm9wZXJ0aWVzKTtcblxuICAgIC8vIGNvbnZlcnQgVjAgbWF0ZXJpYWwgcHJvcGVydGllcyBpbnRvIFYxIGNvbXBhdGlibGUgZm9ybWF0XG4gICAgdjBNYXRlcmlhbFByb3BlcnRpZXMuZm9yRWFjaCgobWF0ZXJpYWxQcm9wZXJ0aWVzLCBtYXRlcmlhbEluZGV4KSA9PiB7XG4gICAgICBjb25zdCBtYXRlcmlhbERlZiA9IGpzb24ubWF0ZXJpYWxzPy5bbWF0ZXJpYWxJbmRleF07XG5cbiAgICAgIGlmIChtYXRlcmlhbERlZiA9PSBudWxsKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICBgVlJNTWF0ZXJpYWxzVjBDb21wYXRQbHVnaW46IEF0dGVtcHQgdG8gdXNlIG1hdGVyaWFsc1ske21hdGVyaWFsSW5kZXh9XSBvZiBnbFRGIGJ1dCB0aGUgbWF0ZXJpYWwgZG9lc24ndCBleGlzdGAsXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKG1hdGVyaWFsUHJvcGVydGllcy5zaGFkZXIgPT09ICdWUk0vTVRvb24nKSB7XG4gICAgICAgIGNvbnN0IG1hdGVyaWFsID0gdGhpcy5fcGFyc2VWME1Ub29uUHJvcGVydGllcyhtYXRlcmlhbFByb3BlcnRpZXMsIG1hdGVyaWFsRGVmKTtcbiAgICAgICAganNvbi5tYXRlcmlhbHMhW21hdGVyaWFsSW5kZXhdID0gbWF0ZXJpYWw7XG4gICAgICB9IGVsc2UgaWYgKG1hdGVyaWFsUHJvcGVydGllcy5zaGFkZXI/LnN0YXJ0c1dpdGgoJ1ZSTS9VbmxpdCcpKSB7XG4gICAgICAgIGNvbnN0IG1hdGVyaWFsID0gdGhpcy5fcGFyc2VWMFVubGl0UHJvcGVydGllcyhtYXRlcmlhbFByb3BlcnRpZXMsIG1hdGVyaWFsRGVmKTtcbiAgICAgICAganNvbi5tYXRlcmlhbHMhW21hdGVyaWFsSW5kZXhdID0gbWF0ZXJpYWw7XG4gICAgICB9IGVsc2UgaWYgKG1hdGVyaWFsUHJvcGVydGllcy5zaGFkZXIgPT09ICdWUk1fVVNFX0dMVEZTSEFERVInKSB7XG4gICAgICAgIC8vIGBqc29uLm1hdGVyaWFsc1ttYXRlcmlhbEluZGV4XWAgc2hvdWxkIGJlIGFscmVhZHkgdmFsaWRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUud2FybihgVlJNTWF0ZXJpYWxzVjBDb21wYXRQbHVnaW46IFVua25vd24gc2hhZGVyOiAke21hdGVyaWFsUHJvcGVydGllcy5zaGFkZXJ9YCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZVYwTVRvb25Qcm9wZXJ0aWVzKFxuICAgIG1hdGVyaWFsUHJvcGVydGllczogVjBNYXRlcmlhbCxcbiAgICBzY2hlbWFNYXRlcmlhbDogR0xURlNjaGVtYS5JTWF0ZXJpYWwsXG4gICk6IEdMVEZTY2hlbWEuSU1hdGVyaWFsIHtcbiAgICBjb25zdCBpc1RyYW5zcGFyZW50ID0gbWF0ZXJpYWxQcm9wZXJ0aWVzLmtleXdvcmRNYXA/LlsnX0FMUEhBQkxFTkRfT04nXSA/PyBmYWxzZTtcbiAgICBjb25zdCBlbmFibGVkWldyaXRlID0gbWF0ZXJpYWxQcm9wZXJ0aWVzLmZsb2F0UHJvcGVydGllcz8uWydfWldyaXRlJ10gPT09IDE7XG4gICAgY29uc3QgdHJhbnNwYXJlbnRXaXRoWldyaXRlID0gZW5hYmxlZFpXcml0ZSAmJiBpc1RyYW5zcGFyZW50O1xuXG4gICAgY29uc3QgcmVuZGVyUXVldWVPZmZzZXROdW1iZXIgPSB0aGlzLl92MFBhcnNlUmVuZGVyUXVldWUobWF0ZXJpYWxQcm9wZXJ0aWVzKTtcblxuICAgIGNvbnN0IGlzQ3V0b2ZmID0gbWF0ZXJpYWxQcm9wZXJ0aWVzLmtleXdvcmRNYXA/LlsnX0FMUEhBVEVTVF9PTiddID8/IGZhbHNlO1xuICAgIGNvbnN0IGFscGhhTW9kZSA9IGlzVHJhbnNwYXJlbnQgPyAnQkxFTkQnIDogaXNDdXRvZmYgPyAnTUFTSycgOiAnT1BBUVVFJztcbiAgICBjb25zdCBhbHBoYUN1dG9mZiA9IGlzQ3V0b2ZmID8gKG1hdGVyaWFsUHJvcGVydGllcy5mbG9hdFByb3BlcnRpZXM/LlsnX0N1dG9mZiddID8/IDAuNSkgOiB1bmRlZmluZWQ7XG5cbiAgICBjb25zdCBjdWxsTW9kZSA9IG1hdGVyaWFsUHJvcGVydGllcy5mbG9hdFByb3BlcnRpZXM/LlsnX0N1bGxNb2RlJ10gPz8gMjsgLy8gZW51bSwgeyBPZmYsIEZyb250LCBCYWNrIH1cbiAgICBjb25zdCBkb3VibGVTaWRlZCA9IGN1bGxNb2RlID09PSAwO1xuXG4gICAgY29uc3QgdGV4dHVyZVRyYW5zZm9ybUV4dCA9IHRoaXMuX3BvcnRUZXh0dXJlVHJhbnNmb3JtKG1hdGVyaWFsUHJvcGVydGllcyk7XG5cbiAgICBjb25zdCBiYXNlQ29sb3JGYWN0b3IgPSAobWF0ZXJpYWxQcm9wZXJ0aWVzLnZlY3RvclByb3BlcnRpZXM/LlsnX0NvbG9yJ10gPz8gWzEuMCwgMS4wLCAxLjAsIDEuMF0pLm1hcChcbiAgICAgICh2OiBudW1iZXIsIGk6IG51bWJlcikgPT4gKGkgPT09IDMgPyB2IDogZ2FtbWFFT1RGKHYpKSwgLy8gYWxwaGEgY2hhbm5lbCBpcyBzdG9yZWQgaW4gbGluZWFyXG4gICAgKTtcbiAgICBjb25zdCBiYXNlQ29sb3JUZXh0dXJlSW5kZXggPSBtYXRlcmlhbFByb3BlcnRpZXMudGV4dHVyZVByb3BlcnRpZXM/LlsnX01haW5UZXgnXTtcbiAgICBjb25zdCBiYXNlQ29sb3JUZXh0dXJlID1cbiAgICAgIGJhc2VDb2xvclRleHR1cmVJbmRleCAhPSBudWxsXG4gICAgICAgID8ge1xuICAgICAgICAgICAgaW5kZXg6IGJhc2VDb2xvclRleHR1cmVJbmRleCxcbiAgICAgICAgICAgIGV4dGVuc2lvbnM6IHtcbiAgICAgICAgICAgICAgLi4udGV4dHVyZVRyYW5zZm9ybUV4dCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfVxuICAgICAgICA6IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0IG5vcm1hbFRleHR1cmVTY2FsZSA9IG1hdGVyaWFsUHJvcGVydGllcy5mbG9hdFByb3BlcnRpZXM/LlsnX0J1bXBTY2FsZSddID8/IDEuMDtcbiAgICBjb25zdCBub3JtYWxUZXh0dXJlSW5kZXggPSBtYXRlcmlhbFByb3BlcnRpZXMudGV4dHVyZVByb3BlcnRpZXM/LlsnX0J1bXBNYXAnXTtcbiAgICBjb25zdCBub3JtYWxUZXh0dXJlID1cbiAgICAgIG5vcm1hbFRleHR1cmVJbmRleCAhPSBudWxsXG4gICAgICAgID8ge1xuICAgICAgICAgICAgaW5kZXg6IG5vcm1hbFRleHR1cmVJbmRleCxcbiAgICAgICAgICAgIHNjYWxlOiBub3JtYWxUZXh0dXJlU2NhbGUsXG4gICAgICAgICAgICBleHRlbnNpb25zOiB7XG4gICAgICAgICAgICAgIC4uLnRleHR1cmVUcmFuc2Zvcm1FeHQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH1cbiAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICBjb25zdCBlbWlzc2l2ZUZhY3RvciA9IChtYXRlcmlhbFByb3BlcnRpZXMudmVjdG9yUHJvcGVydGllcz8uWydfRW1pc3Npb25Db2xvciddID8/IFswLjAsIDAuMCwgMC4wLCAxLjBdKS5tYXAoXG4gICAgICBnYW1tYUVPVEYsXG4gICAgKTtcbiAgICBjb25zdCBlbWlzc2l2ZVRleHR1cmVJbmRleCA9IG1hdGVyaWFsUHJvcGVydGllcy50ZXh0dXJlUHJvcGVydGllcz8uWydfRW1pc3Npb25NYXAnXTtcbiAgICBjb25zdCBlbWlzc2l2ZVRleHR1cmUgPVxuICAgICAgZW1pc3NpdmVUZXh0dXJlSW5kZXggIT0gbnVsbFxuICAgICAgICA/IHtcbiAgICAgICAgICAgIGluZGV4OiBlbWlzc2l2ZVRleHR1cmVJbmRleCxcbiAgICAgICAgICAgIGV4dGVuc2lvbnM6IHtcbiAgICAgICAgICAgICAgLi4udGV4dHVyZVRyYW5zZm9ybUV4dCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfVxuICAgICAgICA6IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0IHNoYWRlQ29sb3JGYWN0b3IgPSAobWF0ZXJpYWxQcm9wZXJ0aWVzLnZlY3RvclByb3BlcnRpZXM/LlsnX1NoYWRlQ29sb3InXSA/PyBbMC45NywgMC44MSwgMC44NiwgMS4wXSkubWFwKFxuICAgICAgZ2FtbWFFT1RGLFxuICAgICk7XG4gICAgY29uc3Qgc2hhZGVNdWx0aXBseVRleHR1cmVJbmRleCA9IG1hdGVyaWFsUHJvcGVydGllcy50ZXh0dXJlUHJvcGVydGllcz8uWydfU2hhZGVUZXh0dXJlJ107XG4gICAgY29uc3Qgc2hhZGVNdWx0aXBseVRleHR1cmUgPVxuICAgICAgc2hhZGVNdWx0aXBseVRleHR1cmVJbmRleCAhPSBudWxsXG4gICAgICAgID8ge1xuICAgICAgICAgICAgaW5kZXg6IHNoYWRlTXVsdGlwbHlUZXh0dXJlSW5kZXgsXG4gICAgICAgICAgICBleHRlbnNpb25zOiB7XG4gICAgICAgICAgICAgIC4uLnRleHR1cmVUcmFuc2Zvcm1FeHQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH1cbiAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICAvLyAvLyBjb252ZXJ0IHYwIHNoYWRlIHNoaWZ0IC8gc2hhZGUgdG9vbnlcbiAgICBsZXQgc2hhZGluZ1NoaWZ0RmFjdG9yID0gbWF0ZXJpYWxQcm9wZXJ0aWVzLmZsb2F0UHJvcGVydGllcz8uWydfU2hhZGVTaGlmdCddID8/IDAuMDtcbiAgICBsZXQgc2hhZGluZ1Rvb255RmFjdG9yID0gbWF0ZXJpYWxQcm9wZXJ0aWVzLmZsb2F0UHJvcGVydGllcz8uWydfU2hhZGVUb29ueSddID8/IDAuOTtcbiAgICBzaGFkaW5nVG9vbnlGYWN0b3IgPSBUSFJFRS5NYXRoVXRpbHMubGVycChzaGFkaW5nVG9vbnlGYWN0b3IsIDEuMCwgMC41ICsgMC41ICogc2hhZGluZ1NoaWZ0RmFjdG9yKTtcbiAgICBzaGFkaW5nU2hpZnRGYWN0b3IgPSAtc2hhZGluZ1NoaWZ0RmFjdG9yIC0gKDEuMCAtIHNoYWRpbmdUb29ueUZhY3Rvcik7XG5cbiAgICBjb25zdCBnaUludGVuc2l0eUZhY3RvciA9IG1hdGVyaWFsUHJvcGVydGllcy5mbG9hdFByb3BlcnRpZXM/LlsnX0luZGlyZWN0TGlnaHRJbnRlbnNpdHknXSA/PyAwLjE7XG4gICAgY29uc3QgZ2lFcXVhbGl6YXRpb25GYWN0b3IgPSBnaUludGVuc2l0eUZhY3RvciA/IDEuMCAtIGdpSW50ZW5zaXR5RmFjdG9yIDogdW5kZWZpbmVkO1xuXG4gICAgY29uc3QgbWF0Y2FwVGV4dHVyZUluZGV4ID0gbWF0ZXJpYWxQcm9wZXJ0aWVzLnRleHR1cmVQcm9wZXJ0aWVzPy5bJ19TcGhlcmVBZGQnXTtcbiAgICBjb25zdCBtYXRjYXBGYWN0b3IgPSBtYXRjYXBUZXh0dXJlSW5kZXggIT0gbnVsbCA/IFsxLjAsIDEuMCwgMS4wXSA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBtYXRjYXBUZXh0dXJlID1cbiAgICAgIG1hdGNhcFRleHR1cmVJbmRleCAhPSBudWxsXG4gICAgICAgID8ge1xuICAgICAgICAgICAgaW5kZXg6IG1hdGNhcFRleHR1cmVJbmRleCxcbiAgICAgICAgICB9XG4gICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgY29uc3QgcmltTGlnaHRpbmdNaXhGYWN0b3IgPSBtYXRlcmlhbFByb3BlcnRpZXMuZmxvYXRQcm9wZXJ0aWVzPy5bJ19SaW1MaWdodGluZ01peCddID8/IDAuMDtcbiAgICBjb25zdCByaW1NdWx0aXBseVRleHR1cmVJbmRleCA9IG1hdGVyaWFsUHJvcGVydGllcy50ZXh0dXJlUHJvcGVydGllcz8uWydfUmltVGV4dHVyZSddO1xuICAgIGNvbnN0IHJpbU11bHRpcGx5VGV4dHVyZSA9XG4gICAgICByaW1NdWx0aXBseVRleHR1cmVJbmRleCAhPSBudWxsXG4gICAgICAgID8ge1xuICAgICAgICAgICAgaW5kZXg6IHJpbU11bHRpcGx5VGV4dHVyZUluZGV4LFxuICAgICAgICAgICAgZXh0ZW5zaW9uczoge1xuICAgICAgICAgICAgICAuLi50ZXh0dXJlVHJhbnNmb3JtRXh0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9XG4gICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgY29uc3QgcGFyYW1ldHJpY1JpbUNvbG9yRmFjdG9yID0gKG1hdGVyaWFsUHJvcGVydGllcy52ZWN0b3JQcm9wZXJ0aWVzPy5bJ19SaW1Db2xvciddID8/IFswLjAsIDAuMCwgMC4wLCAxLjBdKS5tYXAoXG4gICAgICBnYW1tYUVPVEYsXG4gICAgKTtcbiAgICBjb25zdCBwYXJhbWV0cmljUmltRnJlc25lbFBvd2VyRmFjdG9yID0gbWF0ZXJpYWxQcm9wZXJ0aWVzLmZsb2F0UHJvcGVydGllcz8uWydfUmltRnJlc25lbFBvd2VyJ10gPz8gMS4wO1xuICAgIGNvbnN0IHBhcmFtZXRyaWNSaW1MaWZ0RmFjdG9yID0gbWF0ZXJpYWxQcm9wZXJ0aWVzLmZsb2F0UHJvcGVydGllcz8uWydfUmltTGlmdCddID8/IDAuMDtcblxuICAgIGNvbnN0IG91dGxpbmVXaWR0aE1vZGUgPSBbJ25vbmUnLCAnd29ybGRDb29yZGluYXRlcycsICdzY3JlZW5Db29yZGluYXRlcyddW1xuICAgICAgbWF0ZXJpYWxQcm9wZXJ0aWVzLmZsb2F0UHJvcGVydGllcz8uWydfT3V0bGluZVdpZHRoTW9kZSddID8/IDBcbiAgICBdIGFzIFYxTVRvb25TY2hlbWEuTWF0ZXJpYWxzTVRvb25PdXRsaW5lV2lkdGhNb2RlO1xuXG4gICAgLy8gLy8gdjAgb3V0bGluZVdpZHRoRmFjdG9yIGlzIGluIGNlbnRpbWV0ZXJcbiAgICBsZXQgb3V0bGluZVdpZHRoRmFjdG9yID0gbWF0ZXJpYWxQcm9wZXJ0aWVzLmZsb2F0UHJvcGVydGllcz8uWydfT3V0bGluZVdpZHRoJ10gPz8gMC4wO1xuICAgIG91dGxpbmVXaWR0aEZhY3RvciA9IDAuMDEgKiBvdXRsaW5lV2lkdGhGYWN0b3I7XG5cbiAgICBjb25zdCBvdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmVJbmRleCA9IG1hdGVyaWFsUHJvcGVydGllcy50ZXh0dXJlUHJvcGVydGllcz8uWydfT3V0bGluZVdpZHRoVGV4dHVyZSddO1xuICAgIGNvbnN0IG91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZSA9XG4gICAgICBvdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmVJbmRleCAhPSBudWxsXG4gICAgICAgID8ge1xuICAgICAgICAgICAgaW5kZXg6IG91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZUluZGV4LFxuICAgICAgICAgICAgZXh0ZW5zaW9uczoge1xuICAgICAgICAgICAgICAuLi50ZXh0dXJlVHJhbnNmb3JtRXh0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9XG4gICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgY29uc3Qgb3V0bGluZUNvbG9yRmFjdG9yID0gKG1hdGVyaWFsUHJvcGVydGllcy52ZWN0b3JQcm9wZXJ0aWVzPy5bJ19PdXRsaW5lQ29sb3InXSA/PyBbMC4wLCAwLjAsIDAuMF0pLm1hcChcbiAgICAgIGdhbW1hRU9URixcbiAgICApO1xuICAgIGNvbnN0IG91dGxpbmVDb2xvck1vZGUgPSBtYXRlcmlhbFByb3BlcnRpZXMuZmxvYXRQcm9wZXJ0aWVzPy5bJ19PdXRsaW5lQ29sb3JNb2RlJ10gPz8gMDsgLy8gZW51bSwgeyBGaXhlZCwgTWl4ZWQgfVxuICAgIGNvbnN0IG91dGxpbmVMaWdodGluZ01peEZhY3RvciA9XG4gICAgICBvdXRsaW5lQ29sb3JNb2RlID09PSAxID8gKG1hdGVyaWFsUHJvcGVydGllcy5mbG9hdFByb3BlcnRpZXM/LlsnX091dGxpbmVMaWdodGluZ01peCddID8/IDEuMCkgOiAwLjA7XG5cbiAgICBjb25zdCB1dkFuaW1hdGlvbk1hc2tUZXh0dXJlSW5kZXggPSBtYXRlcmlhbFByb3BlcnRpZXMudGV4dHVyZVByb3BlcnRpZXM/LlsnX1V2QW5pbU1hc2tUZXh0dXJlJ107XG4gICAgY29uc3QgdXZBbmltYXRpb25NYXNrVGV4dHVyZSA9XG4gICAgICB1dkFuaW1hdGlvbk1hc2tUZXh0dXJlSW5kZXggIT0gbnVsbFxuICAgICAgICA/IHtcbiAgICAgICAgICAgIGluZGV4OiB1dkFuaW1hdGlvbk1hc2tUZXh0dXJlSW5kZXgsXG4gICAgICAgICAgICBleHRlbnNpb25zOiB7XG4gICAgICAgICAgICAgIC4uLnRleHR1cmVUcmFuc2Zvcm1FeHQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH1cbiAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICBjb25zdCB1dkFuaW1hdGlvblNjcm9sbFhTcGVlZEZhY3RvciA9IG1hdGVyaWFsUHJvcGVydGllcy5mbG9hdFByb3BlcnRpZXM/LlsnX1V2QW5pbVNjcm9sbFgnXSA/PyAwLjA7XG5cbiAgICAvLyB1dkFuaW1hdGlvblNjcm9sbFlTcGVlZEZhY3RvciB3aWxsIGJlIG9wcG9zaXRlIGJldHdlZW4gVjAgYW5kIFYxXG4gICAgbGV0IHV2QW5pbWF0aW9uU2Nyb2xsWVNwZWVkRmFjdG9yID0gbWF0ZXJpYWxQcm9wZXJ0aWVzLmZsb2F0UHJvcGVydGllcz8uWydfVXZBbmltU2Nyb2xsWSddID8/IDAuMDtcbiAgICBpZiAodXZBbmltYXRpb25TY3JvbGxZU3BlZWRGYWN0b3IgIT0gbnVsbCkge1xuICAgICAgdXZBbmltYXRpb25TY3JvbGxZU3BlZWRGYWN0b3IgPSAtdXZBbmltYXRpb25TY3JvbGxZU3BlZWRGYWN0b3I7XG4gICAgfVxuXG4gICAgY29uc3QgdXZBbmltYXRpb25Sb3RhdGlvblNwZWVkRmFjdG9yID0gbWF0ZXJpYWxQcm9wZXJ0aWVzLmZsb2F0UHJvcGVydGllcz8uWydfVXZBbmltUm90YXRpb24nXSA/PyAwLjA7XG5cbiAgICBjb25zdCBtdG9vbkV4dGVuc2lvbjogVjFNVG9vblNjaGVtYS5WUk1DTWF0ZXJpYWxzTVRvb24gPSB7XG4gICAgICBzcGVjVmVyc2lvbjogJzEuMCcsXG4gICAgICB0cmFuc3BhcmVudFdpdGhaV3JpdGUsXG4gICAgICByZW5kZXJRdWV1ZU9mZnNldE51bWJlcixcbiAgICAgIHNoYWRlQ29sb3JGYWN0b3IsXG4gICAgICBzaGFkZU11bHRpcGx5VGV4dHVyZSxcbiAgICAgIHNoYWRpbmdTaGlmdEZhY3RvcixcbiAgICAgIHNoYWRpbmdUb29ueUZhY3RvcixcbiAgICAgIGdpRXF1YWxpemF0aW9uRmFjdG9yLFxuICAgICAgbWF0Y2FwRmFjdG9yLFxuICAgICAgbWF0Y2FwVGV4dHVyZSxcbiAgICAgIHJpbUxpZ2h0aW5nTWl4RmFjdG9yLFxuICAgICAgcmltTXVsdGlwbHlUZXh0dXJlLFxuICAgICAgcGFyYW1ldHJpY1JpbUNvbG9yRmFjdG9yLFxuICAgICAgcGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlckZhY3RvcixcbiAgICAgIHBhcmFtZXRyaWNSaW1MaWZ0RmFjdG9yLFxuICAgICAgb3V0bGluZVdpZHRoTW9kZSxcbiAgICAgIG91dGxpbmVXaWR0aEZhY3RvcixcbiAgICAgIG91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZSxcbiAgICAgIG91dGxpbmVDb2xvckZhY3RvcixcbiAgICAgIG91dGxpbmVMaWdodGluZ01peEZhY3RvcixcbiAgICAgIHV2QW5pbWF0aW9uTWFza1RleHR1cmUsXG4gICAgICB1dkFuaW1hdGlvblNjcm9sbFhTcGVlZEZhY3RvcixcbiAgICAgIHV2QW5pbWF0aW9uU2Nyb2xsWVNwZWVkRmFjdG9yLFxuICAgICAgdXZBbmltYXRpb25Sb3RhdGlvblNwZWVkRmFjdG9yLFxuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4uc2NoZW1hTWF0ZXJpYWwsXG5cbiAgICAgIHBick1ldGFsbGljUm91Z2huZXNzOiB7XG4gICAgICAgIGJhc2VDb2xvckZhY3RvcixcbiAgICAgICAgYmFzZUNvbG9yVGV4dHVyZSxcbiAgICAgIH0sXG4gICAgICBub3JtYWxUZXh0dXJlLFxuICAgICAgZW1pc3NpdmVUZXh0dXJlLFxuICAgICAgZW1pc3NpdmVGYWN0b3IsXG4gICAgICBhbHBoYU1vZGUsXG4gICAgICBhbHBoYUN1dG9mZixcbiAgICAgIGRvdWJsZVNpZGVkLFxuICAgICAgZXh0ZW5zaW9uczoge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXG4gICAgICAgIFZSTUNfbWF0ZXJpYWxzX210b29uOiBtdG9vbkV4dGVuc2lvbixcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlVjBVbmxpdFByb3BlcnRpZXMoXG4gICAgbWF0ZXJpYWxQcm9wZXJ0aWVzOiBWME1hdGVyaWFsLFxuICAgIHNjaGVtYU1hdGVyaWFsOiBHTFRGU2NoZW1hLklNYXRlcmlhbCxcbiAgKTogR0xURlNjaGVtYS5JTWF0ZXJpYWwge1xuICAgIGNvbnN0IGlzVHJhbnNwYXJlbnRaV3JpdGUgPSBtYXRlcmlhbFByb3BlcnRpZXMuc2hhZGVyID09PSAnVlJNL1VubGl0VHJhbnNwYXJlbnRaV3JpdGUnO1xuICAgIGNvbnN0IGlzVHJhbnNwYXJlbnQgPSBtYXRlcmlhbFByb3BlcnRpZXMuc2hhZGVyID09PSAnVlJNL1VubGl0VHJhbnNwYXJlbnQnIHx8IGlzVHJhbnNwYXJlbnRaV3JpdGU7XG5cbiAgICBjb25zdCByZW5kZXJRdWV1ZU9mZnNldE51bWJlciA9IHRoaXMuX3YwUGFyc2VSZW5kZXJRdWV1ZShtYXRlcmlhbFByb3BlcnRpZXMpO1xuXG4gICAgY29uc3QgaXNDdXRvZmYgPSBtYXRlcmlhbFByb3BlcnRpZXMuc2hhZGVyID09PSAnVlJNL1VubGl0Q3V0b3V0JztcbiAgICBjb25zdCBhbHBoYU1vZGUgPSBpc1RyYW5zcGFyZW50ID8gJ0JMRU5EJyA6IGlzQ3V0b2ZmID8gJ01BU0snIDogJ09QQVFVRSc7XG4gICAgY29uc3QgYWxwaGFDdXRvZmYgPSBpc0N1dG9mZiA/IChtYXRlcmlhbFByb3BlcnRpZXMuZmxvYXRQcm9wZXJ0aWVzPy5bJ19DdXRvZmYnXSA/PyAwLjUpIDogdW5kZWZpbmVkO1xuXG4gICAgY29uc3QgdGV4dHVyZVRyYW5zZm9ybUV4dCA9IHRoaXMuX3BvcnRUZXh0dXJlVHJhbnNmb3JtKG1hdGVyaWFsUHJvcGVydGllcyk7XG5cbiAgICBjb25zdCBiYXNlQ29sb3JGYWN0b3IgPSAobWF0ZXJpYWxQcm9wZXJ0aWVzLnZlY3RvclByb3BlcnRpZXM/LlsnX0NvbG9yJ10gPz8gWzEuMCwgMS4wLCAxLjAsIDEuMF0pLm1hcChnYW1tYUVPVEYpO1xuICAgIGNvbnN0IGJhc2VDb2xvclRleHR1cmVJbmRleCA9IG1hdGVyaWFsUHJvcGVydGllcy50ZXh0dXJlUHJvcGVydGllcz8uWydfTWFpblRleCddO1xuICAgIGNvbnN0IGJhc2VDb2xvclRleHR1cmUgPVxuICAgICAgYmFzZUNvbG9yVGV4dHVyZUluZGV4ICE9IG51bGxcbiAgICAgICAgPyB7XG4gICAgICAgICAgICBpbmRleDogYmFzZUNvbG9yVGV4dHVyZUluZGV4LFxuICAgICAgICAgICAgZXh0ZW5zaW9uczoge1xuICAgICAgICAgICAgICAuLi50ZXh0dXJlVHJhbnNmb3JtRXh0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9XG4gICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgLy8gdXNlIG10b29uIGluc3RlYWQgb2YgdW5saXQsIHNpbmNlIHRoZXJlIG1pZ2h0IGJlIFZSTTAuMCBzcGVjaWZpYyBmZWF0dXJlcyB0aGF0IGFyZSBub3Qgc3VwcG9ydGVkIGJ5IGdsdGZcbiAgICBjb25zdCBtdG9vbkV4dGVuc2lvbjogVjFNVG9vblNjaGVtYS5WUk1DTWF0ZXJpYWxzTVRvb24gPSB7XG4gICAgICBzcGVjVmVyc2lvbjogJzEuMCcsXG4gICAgICB0cmFuc3BhcmVudFdpdGhaV3JpdGU6IGlzVHJhbnNwYXJlbnRaV3JpdGUsXG4gICAgICByZW5kZXJRdWV1ZU9mZnNldE51bWJlcixcbiAgICAgIHNoYWRlQ29sb3JGYWN0b3I6IGJhc2VDb2xvckZhY3RvcixcbiAgICAgIHNoYWRlTXVsdGlwbHlUZXh0dXJlOiBiYXNlQ29sb3JUZXh0dXJlLFxuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4uc2NoZW1hTWF0ZXJpYWwsXG5cbiAgICAgIHBick1ldGFsbGljUm91Z2huZXNzOiB7XG4gICAgICAgIGJhc2VDb2xvckZhY3RvcixcbiAgICAgICAgYmFzZUNvbG9yVGV4dHVyZSxcbiAgICAgIH0sXG4gICAgICBhbHBoYU1vZGUsXG4gICAgICBhbHBoYUN1dG9mZixcbiAgICAgIGV4dGVuc2lvbnM6IHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxuICAgICAgICBWUk1DX21hdGVyaWFsc19tdG9vbjogbXRvb25FeHRlbnNpb24sXG4gICAgICB9LFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgZ2xURiBgS0hSX3RleHR1cmVfdHJhbnNmb3JtYCBleHRlbnNpb24gZnJvbSB2MCB0ZXh0dXJlIHRyYW5zZm9ybSBpbmZvLlxuICAgKi9cbiAgcHJpdmF0ZSBfcG9ydFRleHR1cmVUcmFuc2Zvcm0obWF0ZXJpYWxQcm9wZXJ0aWVzOiBWME1hdGVyaWFsKTogeyBbbmFtZTogc3RyaW5nXTogYW55IH0ge1xuICAgIGNvbnN0IHRleHR1cmVUcmFuc2Zvcm0gPSBtYXRlcmlhbFByb3BlcnRpZXMudmVjdG9yUHJvcGVydGllcz8uWydfTWFpblRleCddO1xuICAgIGlmICh0ZXh0dXJlVHJhbnNmb3JtID09IG51bGwpIHtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG5cbiAgICBjb25zdCBvZmZzZXQgPSBbdGV4dHVyZVRyYW5zZm9ybT8uWzBdID8/IDAuMCwgdGV4dHVyZVRyYW5zZm9ybT8uWzFdID8/IDAuMF07XG4gICAgY29uc3Qgc2NhbGUgPSBbdGV4dHVyZVRyYW5zZm9ybT8uWzJdID8/IDEuMCwgdGV4dHVyZVRyYW5zZm9ybT8uWzNdID8/IDEuMF07XG5cbiAgICBvZmZzZXRbMV0gPSAxLjAgLSBzY2FsZVsxXSAtIG9mZnNldFsxXTtcblxuICAgIHJldHVybiB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXG4gICAgICBLSFJfdGV4dHVyZV90cmFuc2Zvcm06IHsgb2Zmc2V0LCBzY2FsZSB9LFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydCB2MCByZW5kZXIgb3JkZXIgaW50byB2MSByZW5kZXIgb3JkZXIuXG4gICAqIFRoaXMgdXNlcyBhIG1hcCBmcm9tIHYwIHJlbmRlciBxdWV1ZSB0byB2MSBjb21wbGlhbnQgcmVuZGVyIHF1ZXVlIG9mZnNldCB3aGljaCBpcyBnZW5lcmF0ZWQgaW4ge0BsaW5rIF9wb3B1bGF0ZVJlbmRlclF1ZXVlTWFwfS5cbiAgICovXG4gIHByaXZhdGUgX3YwUGFyc2VSZW5kZXJRdWV1ZShtYXRlcmlhbFByb3BlcnRpZXM6IFYwTWF0ZXJpYWwpOiBudW1iZXIge1xuICAgIGNvbnN0IGlzVHJhbnNwYXJlbnRaV3JpdGUgPSBtYXRlcmlhbFByb3BlcnRpZXMuc2hhZGVyID09PSAnVlJNL1VubGl0VHJhbnNwYXJlbnRaV3JpdGUnO1xuICAgIGNvbnN0IGlzVHJhbnNwYXJlbnQgPVxuICAgICAgbWF0ZXJpYWxQcm9wZXJ0aWVzLmtleXdvcmRNYXA/LlsnX0FMUEhBQkxFTkRfT04nXSAhPSB1bmRlZmluZWQgfHxcbiAgICAgIG1hdGVyaWFsUHJvcGVydGllcy5zaGFkZXIgPT09ICdWUk0vVW5saXRUcmFuc3BhcmVudCcgfHxcbiAgICAgIGlzVHJhbnNwYXJlbnRaV3JpdGU7XG4gICAgY29uc3QgZW5hYmxlZFpXcml0ZSA9IG1hdGVyaWFsUHJvcGVydGllcy5mbG9hdFByb3BlcnRpZXM/LlsnX1pXcml0ZSddID09PSAxIHx8IGlzVHJhbnNwYXJlbnRaV3JpdGU7XG5cbiAgICBsZXQgb2Zmc2V0ID0gMDtcblxuICAgIGlmIChpc1RyYW5zcGFyZW50KSB7XG4gICAgICBjb25zdCB2MFF1ZXVlID0gbWF0ZXJpYWxQcm9wZXJ0aWVzLnJlbmRlclF1ZXVlO1xuXG4gICAgICBpZiAodjBRdWV1ZSAhPSBudWxsKSB7XG4gICAgICAgIGlmIChlbmFibGVkWldyaXRlKSB7XG4gICAgICAgICAgb2Zmc2V0ID0gdGhpcy5fcmVuZGVyUXVldWVNYXBUcmFuc3BhcmVudFpXcml0ZS5nZXQodjBRdWV1ZSkhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9mZnNldCA9IHRoaXMuX3JlbmRlclF1ZXVlTWFwVHJhbnNwYXJlbnQuZ2V0KHYwUXVldWUpITtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvZmZzZXQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbWFwIHdoaWNoIG1hcHMgdjAgcmVuZGVyIHF1ZXVlIHRvIHYxIGNvbXBsaWFudCByZW5kZXIgcXVldWUgb2Zmc2V0LlxuICAgKiBUaGlzIGxpc3RzIHVwIGFsbCByZW5kZXIgcXVldWVzIHRoZSBtb2RlbCB1c2UgYW5kIGNyZWF0ZXMgYSBtYXAgdG8gbmV3IHJlbmRlciBxdWV1ZSBvZmZzZXRzIGluIHRoZSBzYW1lIG9yZGVyLlxuICAgKi9cbiAgcHJpdmF0ZSBfcG9wdWxhdGVSZW5kZXJRdWV1ZU1hcChtYXRlcmlhbFByb3BlcnRpZXNMaXN0OiBWME1hdGVyaWFsW10pIHtcbiAgICAvKipcbiAgICAgKiBBIHNldCBvZiB1c2VkIHJlbmRlciBxdWV1ZXMgaW4gVHJhbnNwYXJlbnQgbWF0ZXJpYWxzLlxuICAgICAqL1xuICAgIGNvbnN0IHJlbmRlclF1ZXVlc1RyYW5zcGFyZW50ID0gbmV3IFNldDxudW1iZXI+KCk7XG5cbiAgICAvKipcbiAgICAgKiBBIHNldCBvZiB1c2VkIHJlbmRlciBxdWV1ZXMgaW4gVHJhbnNwYXJlbnRaV3JpdGUgbWF0ZXJpYWxzLlxuICAgICAqL1xuICAgIGNvbnN0IHJlbmRlclF1ZXVlc1RyYW5zcGFyZW50WldyaXRlID0gbmV3IFNldDxudW1iZXI+KCk7XG5cbiAgICAvLyBwb3B1bGF0ZSB0aGUgcmVuZGVyIHF1ZXVlIHNldFxuICAgIG1hdGVyaWFsUHJvcGVydGllc0xpc3QuZm9yRWFjaCgobWF0ZXJpYWxQcm9wZXJ0aWVzKSA9PiB7XG4gICAgICBjb25zdCBpc1RyYW5zcGFyZW50WldyaXRlID0gbWF0ZXJpYWxQcm9wZXJ0aWVzLnNoYWRlciA9PT0gJ1ZSTS9VbmxpdFRyYW5zcGFyZW50WldyaXRlJztcbiAgICAgIGNvbnN0IGlzVHJhbnNwYXJlbnQgPVxuICAgICAgICBtYXRlcmlhbFByb3BlcnRpZXMua2V5d29yZE1hcD8uWydfQUxQSEFCTEVORF9PTiddICE9IHVuZGVmaW5lZCB8fFxuICAgICAgICBtYXRlcmlhbFByb3BlcnRpZXMuc2hhZGVyID09PSAnVlJNL1VubGl0VHJhbnNwYXJlbnQnIHx8XG4gICAgICAgIGlzVHJhbnNwYXJlbnRaV3JpdGU7XG4gICAgICBjb25zdCBlbmFibGVkWldyaXRlID0gbWF0ZXJpYWxQcm9wZXJ0aWVzLmZsb2F0UHJvcGVydGllcz8uWydfWldyaXRlJ10gPT09IDEgfHwgaXNUcmFuc3BhcmVudFpXcml0ZTtcblxuICAgICAgaWYgKGlzVHJhbnNwYXJlbnQpIHtcbiAgICAgICAgY29uc3QgdjBRdWV1ZSA9IG1hdGVyaWFsUHJvcGVydGllcy5yZW5kZXJRdWV1ZTtcblxuICAgICAgICBpZiAodjBRdWV1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgaWYgKGVuYWJsZWRaV3JpdGUpIHtcbiAgICAgICAgICAgIHJlbmRlclF1ZXVlc1RyYW5zcGFyZW50WldyaXRlLmFkZCh2MFF1ZXVlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVuZGVyUXVldWVzVHJhbnNwYXJlbnQuYWRkKHYwUXVldWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gc2hvdyBhIHdhcm5pbmcgaWYgdGhlIG1vZGVsIHVzZXMgdjEgaW5jb21wYXRpYmxlIG51bWJlciBvZiByZW5kZXIgcXVldWVzXG4gICAgaWYgKHJlbmRlclF1ZXVlc1RyYW5zcGFyZW50LnNpemUgPiAxMCkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBgVlJNTWF0ZXJpYWxzVjBDb21wYXRQbHVnaW46IFRoaXMgVlJNIHVzZXMgJHtyZW5kZXJRdWV1ZXNUcmFuc3BhcmVudC5zaXplfSByZW5kZXIgcXVldWVzIGZvciBUcmFuc3BhcmVudCBtYXRlcmlhbHMgd2hpbGUgVlJNIDEuMCBvbmx5IHN1cHBvcnRzIHVwIHRvIDEwIHJlbmRlciBxdWV1ZXMuIFRoZSBtb2RlbCBtaWdodCBub3QgYmUgcmVuZGVyZWQgY29ycmVjdGx5LmAsXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChyZW5kZXJRdWV1ZXNUcmFuc3BhcmVudFpXcml0ZS5zaXplID4gMTApIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgYFZSTU1hdGVyaWFsc1YwQ29tcGF0UGx1Z2luOiBUaGlzIFZSTSB1c2VzICR7cmVuZGVyUXVldWVzVHJhbnNwYXJlbnRaV3JpdGUuc2l6ZX0gcmVuZGVyIHF1ZXVlcyBmb3IgVHJhbnNwYXJlbnRaV3JpdGUgbWF0ZXJpYWxzIHdoaWxlIFZSTSAxLjAgb25seSBzdXBwb3J0cyB1cCB0byAxMCByZW5kZXIgcXVldWVzLiBUaGUgbW9kZWwgbWlnaHQgbm90IGJlIHJlbmRlcmVkIGNvcnJlY3RseS5gLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBjcmVhdGUgYSBtYXAgZnJvbSB2MCByZW5kZXIgcXVldWUgdG8gdjEgcmVuZGVyIHF1ZXVlIG9mZnNldFxuICAgIEFycmF5LmZyb20ocmVuZGVyUXVldWVzVHJhbnNwYXJlbnQpXG4gICAgICAuc29ydCgpXG4gICAgICAuZm9yRWFjaCgocXVldWUsIGkpID0+IHtcbiAgICAgICAgY29uc3QgbmV3UXVldWVPZmZzZXQgPSBNYXRoLm1pbihNYXRoLm1heChpIC0gcmVuZGVyUXVldWVzVHJhbnNwYXJlbnQuc2l6ZSArIDEsIC05KSwgMCk7XG4gICAgICAgIHRoaXMuX3JlbmRlclF1ZXVlTWFwVHJhbnNwYXJlbnQuc2V0KHF1ZXVlLCBuZXdRdWV1ZU9mZnNldCk7XG4gICAgICB9KTtcblxuICAgIEFycmF5LmZyb20ocmVuZGVyUXVldWVzVHJhbnNwYXJlbnRaV3JpdGUpXG4gICAgICAuc29ydCgpXG4gICAgICAuZm9yRWFjaCgocXVldWUsIGkpID0+IHtcbiAgICAgICAgY29uc3QgbmV3UXVldWVPZmZzZXQgPSBNYXRoLm1pbihNYXRoLm1heChpLCAwKSwgOSk7XG4gICAgICAgIHRoaXMuX3JlbmRlclF1ZXVlTWFwVHJhbnNwYXJlbnRaV3JpdGUuc2V0KHF1ZXVlLCBuZXdRdWV1ZU9mZnNldCk7XG4gICAgICB9KTtcbiAgfVxufVxuIiwgImV4cG9ydCBmdW5jdGlvbiBnYW1tYUVPVEYoZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgcmV0dXJuIE1hdGgucG93KGUsIDIuMik7XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNTm9kZUNvbnN0cmFpbnQgfSBmcm9tICcuLi9WUk1Ob2RlQ29uc3RyYWludCc7XG5cbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5leHBvcnQgY2xhc3MgVlJNTm9kZUNvbnN0cmFpbnRIZWxwZXIgZXh0ZW5kcyBUSFJFRS5Hcm91cCB7XG4gIHB1YmxpYyByZWFkb25seSBjb25zdHJhaW50OiBWUk1Ob2RlQ29uc3RyYWludDtcbiAgcHJpdmF0ZSBfbGluZTogVEhSRUUuTGluZTtcbiAgcHJpdmF0ZSBfYXR0clBvc2l0aW9uOiBUSFJFRS5CdWZmZXJBdHRyaWJ1dGU7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGNvbnN0cmFpbnQ6IFZSTU5vZGVDb25zdHJhaW50KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuX2F0dHJQb3NpdGlvbiA9IG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUobmV3IEZsb2F0MzJBcnJheShbMCwgMCwgMCwgMCwgMCwgMF0pLCAzKTtcbiAgICB0aGlzLl9hdHRyUG9zaXRpb24uc2V0VXNhZ2UoVEhSRUUuRHluYW1pY0RyYXdVc2FnZSk7XG5cbiAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeSgpO1xuICAgIGdlb21ldHJ5LnNldEF0dHJpYnV0ZSgncG9zaXRpb24nLCB0aGlzLl9hdHRyUG9zaXRpb24pO1xuXG4gICAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTGluZUJhc2ljTWF0ZXJpYWwoe1xuICAgICAgY29sb3I6IDB4ZmYwMGZmLFxuICAgICAgZGVwdGhUZXN0OiBmYWxzZSxcbiAgICAgIGRlcHRoV3JpdGU6IGZhbHNlLFxuICAgIH0pO1xuXG4gICAgdGhpcy5fbGluZSA9IG5ldyBUSFJFRS5MaW5lKGdlb21ldHJ5LCBtYXRlcmlhbCk7XG4gICAgdGhpcy5hZGQodGhpcy5fbGluZSk7XG5cbiAgICB0aGlzLmNvbnN0cmFpbnQgPSBjb25zdHJhaW50O1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZU1hdHJpeFdvcmxkKGZvcmNlPzogYm9vbGVhbik6IHZvaWQge1xuICAgIF92M0Euc2V0RnJvbU1hdHJpeFBvc2l0aW9uKHRoaXMuY29uc3RyYWludC5kZXN0aW5hdGlvbi5tYXRyaXhXb3JsZCk7XG4gICAgdGhpcy5fYXR0clBvc2l0aW9uLnNldFhZWigwLCBfdjNBLngsIF92M0EueSwgX3YzQS56KTtcblxuICAgIGlmICh0aGlzLmNvbnN0cmFpbnQuc291cmNlKSB7XG4gICAgICBfdjNBLnNldEZyb21NYXRyaXhQb3NpdGlvbih0aGlzLmNvbnN0cmFpbnQuc291cmNlLm1hdHJpeFdvcmxkKTtcbiAgICB9XG4gICAgdGhpcy5fYXR0clBvc2l0aW9uLnNldFhZWigxLCBfdjNBLngsIF92M0EueSwgX3YzQS56KTtcblxuICAgIHRoaXMuX2F0dHJQb3NpdGlvbi5uZWVkc1VwZGF0ZSA9IHRydWU7XG5cbiAgICBzdXBlci51cGRhdGVNYXRyaXhXb3JsZChmb3JjZSk7XG4gIH1cbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBkZWNvbXBvc2VQb3NpdGlvbiB9IGZyb20gJy4vdXRpbHMvZGVjb21wb3NlUG9zaXRpb24nO1xuaW1wb3J0IHsgZGVjb21wb3NlUm90YXRpb24gfSBmcm9tICcuL3V0aWxzL2RlY29tcG9zZVJvdGF0aW9uJztcbmltcG9ydCB7IHF1YXRJbnZlcnRDb21wYXQgfSBmcm9tICcuL3V0aWxzL3F1YXRJbnZlcnRDb21wYXQnO1xuaW1wb3J0IHsgVlJNTm9kZUNvbnN0cmFpbnQgfSBmcm9tICcuL1ZSTU5vZGVDb25zdHJhaW50JztcblxuY29uc3QgX3YzQSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfdjNCID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF92M0MgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3F1YXRBID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbmNvbnN0IF9xdWF0QiA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5jb25zdCBfcXVhdEMgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXG4vKipcbiAqIEEgY29uc3RyYWludCB0aGF0IG1ha2VzIGl0IGxvb2sgYXQgYSBzb3VyY2Ugb2JqZWN0LlxuICpcbiAqIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL3ZybS1jL3ZybS1zcGVjaWZpY2F0aW9uL3RyZWUvbWFzdGVyL3NwZWNpZmljYXRpb24vVlJNQ19ub2RlX2NvbnN0cmFpbnQtMS4wX2JldGEjcm9sbC1jb25zdHJhaW50XG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1BaW1Db25zdHJhaW50IGV4dGVuZHMgVlJNTm9kZUNvbnN0cmFpbnQge1xuICAvKipcbiAgICogVGhlIGFpbSBheGlzIG9mIHRoZSBjb25zdHJhaW50LlxuICAgKi9cbiAgcHVibGljIGdldCBhaW1BeGlzKCk6ICdQb3NpdGl2ZVgnIHwgJ05lZ2F0aXZlWCcgfCAnUG9zaXRpdmVZJyB8ICdOZWdhdGl2ZVknIHwgJ1Bvc2l0aXZlWicgfCAnTmVnYXRpdmVaJyB7XG4gICAgcmV0dXJuIHRoaXMuX2FpbUF4aXM7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGFpbSBheGlzIG9mIHRoZSBjb25zdHJhaW50LlxuICAgKi9cbiAgcHVibGljIHNldCBhaW1BeGlzKGFpbUF4aXM6ICdQb3NpdGl2ZVgnIHwgJ05lZ2F0aXZlWCcgfCAnUG9zaXRpdmVZJyB8ICdOZWdhdGl2ZVknIHwgJ1Bvc2l0aXZlWicgfCAnTmVnYXRpdmVaJykge1xuICAgIHRoaXMuX2FpbUF4aXMgPSBhaW1BeGlzO1xuICAgIHRoaXMuX3YzQWltQXhpcy5zZXQoXG4gICAgICBhaW1BeGlzID09PSAnUG9zaXRpdmVYJyA/IDEuMCA6IGFpbUF4aXMgPT09ICdOZWdhdGl2ZVgnID8gLTEuMCA6IDAuMCxcbiAgICAgIGFpbUF4aXMgPT09ICdQb3NpdGl2ZVknID8gMS4wIDogYWltQXhpcyA9PT0gJ05lZ2F0aXZlWScgPyAtMS4wIDogMC4wLFxuICAgICAgYWltQXhpcyA9PT0gJ1Bvc2l0aXZlWicgPyAxLjAgOiBhaW1BeGlzID09PSAnTmVnYXRpdmVaJyA/IC0xLjAgOiAwLjAsXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgYWltIGF4aXMgb2YgdGhlIGNvbnN0cmFpbnQuXG4gICAqL1xuICBwcml2YXRlIF9haW1BeGlzOiAnUG9zaXRpdmVYJyB8ICdOZWdhdGl2ZVgnIHwgJ1Bvc2l0aXZlWScgfCAnTmVnYXRpdmVZJyB8ICdQb3NpdGl2ZVonIHwgJ05lZ2F0aXZlWic7XG5cbiAgLyoqXG4gICAqIFRoZSB7QGxpbmsgX2FpbUF4aXN9IGJ1dCBpbiBhbiBhY3R1YWwgVmVjdG9yMyBmb3JtLlxuICAgKi9cbiAgcHJpdmF0ZSBfdjNBaW1BeGlzOiBUSFJFRS5WZWN0b3IzO1xuXG4gIC8qKlxuICAgKiBUaGUgcmVzdCBxdWF0ZXJuaW9uIG9mIHRoZSB7QGxpbmsgZGVzdGluYXRpb259LlxuICAgKi9cbiAgcHJpdmF0ZSBfZHN0UmVzdFF1YXQ6IFRIUkVFLlF1YXRlcm5pb247XG5cbiAgcHVibGljIGdldCBkZXBlbmRlbmNpZXMoKTogU2V0PFRIUkVFLk9iamVjdDNEPiB7XG4gICAgY29uc3Qgc2V0ID0gbmV3IFNldDxUSFJFRS5PYmplY3QzRD4oW3RoaXMuc291cmNlXSk7XG5cbiAgICBpZiAodGhpcy5kZXN0aW5hdGlvbi5wYXJlbnQpIHtcbiAgICAgIHNldC5hZGQodGhpcy5kZXN0aW5hdGlvbi5wYXJlbnQpO1xuICAgIH1cblxuICAgIHJldHVybiBzZXQ7XG4gIH1cblxuICBwdWJsaWMgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFRIUkVFLk9iamVjdDNELCBzb3VyY2U6IFRIUkVFLk9iamVjdDNEKSB7XG4gICAgc3VwZXIoZGVzdGluYXRpb24sIHNvdXJjZSk7XG5cbiAgICB0aGlzLl9haW1BeGlzID0gJ1Bvc2l0aXZlWCc7XG4gICAgdGhpcy5fdjNBaW1BeGlzID0gbmV3IFRIUkVFLlZlY3RvcjMoMSwgMCwgMCk7XG5cbiAgICB0aGlzLl9kc3RSZXN0UXVhdCA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG4gIH1cblxuICBwdWJsaWMgc2V0SW5pdFN0YXRlKCk6IHZvaWQge1xuICAgIHRoaXMuX2RzdFJlc3RRdWF0LmNvcHkodGhpcy5kZXN0aW5hdGlvbi5xdWF0ZXJuaW9uKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgLy8gdXBkYXRlIHdvcmxkIG1hdHJpeCBvZiBkZXN0aW5hdGlvbiBhbmQgc291cmNlIG1hbnVhbGx5XG4gICAgdGhpcy5kZXN0aW5hdGlvbi51cGRhdGVXb3JsZE1hdHJpeCh0cnVlLCBmYWxzZSk7XG4gICAgdGhpcy5zb3VyY2UudXBkYXRlV29ybGRNYXRyaXgodHJ1ZSwgZmFsc2UpO1xuXG4gICAgLy8gZ2V0IHdvcmxkIHF1YXRlcm5pb24gb2YgdGhlIHBhcmVudCBvZiB0aGUgZGVzdGluYXRpb25cbiAgICBjb25zdCBkc3RQYXJlbnRXb3JsZFF1YXQgPSBfcXVhdEEuaWRlbnRpdHkoKTtcbiAgICBjb25zdCBpbnZEc3RQYXJlbnRXb3JsZFF1YXQgPSBfcXVhdEIuaWRlbnRpdHkoKTtcbiAgICBpZiAodGhpcy5kZXN0aW5hdGlvbi5wYXJlbnQpIHtcbiAgICAgIGRlY29tcG9zZVJvdGF0aW9uKHRoaXMuZGVzdGluYXRpb24ucGFyZW50Lm1hdHJpeFdvcmxkLCBkc3RQYXJlbnRXb3JsZFF1YXQpO1xuICAgICAgcXVhdEludmVydENvbXBhdChpbnZEc3RQYXJlbnRXb3JsZFF1YXQuY29weShkc3RQYXJlbnRXb3JsZFF1YXQpKTtcbiAgICB9XG5cbiAgICAvLyBjYWxjdWxhdGUgZnJvbS10byB2ZWN0b3JzIGluIHdvcmxkIGNvb3JkXG4gICAgY29uc3QgYTAgPSBfdjNBLmNvcHkodGhpcy5fdjNBaW1BeGlzKS5hcHBseVF1YXRlcm5pb24odGhpcy5fZHN0UmVzdFF1YXQpLmFwcGx5UXVhdGVybmlvbihkc3RQYXJlbnRXb3JsZFF1YXQpO1xuICAgIGNvbnN0IGExID0gZGVjb21wb3NlUG9zaXRpb24odGhpcy5zb3VyY2UubWF0cml4V29ybGQsIF92M0IpXG4gICAgICAuc3ViKGRlY29tcG9zZVBvc2l0aW9uKHRoaXMuZGVzdGluYXRpb24ubWF0cml4V29ybGQsIF92M0MpKVxuICAgICAgLm5vcm1hbGl6ZSgpO1xuXG4gICAgLy8gY3JlYXRlIGEgZnJvbS10byBxdWF0ZXJuaW9uLCBjb252ZXJ0IHRvIGRlc3RpbmF0aW9uIGxvY2FsIGNvb3JkLCB0aGVuIG11bHRpcGx5IHJlc3QgcXVhdGVybmlvblxuICAgIGNvbnN0IHRhcmdldFF1YXQgPSBfcXVhdENcbiAgICAgIC5zZXRGcm9tVW5pdFZlY3RvcnMoYTAsIGExKVxuICAgICAgLnByZW11bHRpcGx5KGludkRzdFBhcmVudFdvcmxkUXVhdClcbiAgICAgIC5tdWx0aXBseShkc3RQYXJlbnRXb3JsZFF1YXQpXG4gICAgICAubXVsdGlwbHkodGhpcy5fZHN0UmVzdFF1YXQpO1xuXG4gICAgLy8gYmxlbmQgd2l0aCB0aGUgcmVzdCBxdWF0ZXJuaW9uIHVzaW5nIHdlaWdodFxuICAgIHRoaXMuZGVzdGluYXRpb24ucXVhdGVybmlvbi5jb3B5KHRoaXMuX2RzdFJlc3RRdWF0KS5zbGVycCh0YXJnZXRRdWF0LCB0aGlzLndlaWdodCk7XG4gIH1cbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWNvbXBvc2VQb3NpdGlvbjxUIGV4dGVuZHMgVEhSRUUuVmVjdG9yMz4obWF0cml4OiBUSFJFRS5NYXRyaXg0LCB0YXJnZXQ6IFQpOiBUIHtcbiAgcmV0dXJuIHRhcmdldC5zZXQobWF0cml4LmVsZW1lbnRzWzEyXSwgbWF0cml4LmVsZW1lbnRzWzEzXSwgbWF0cml4LmVsZW1lbnRzWzE0XSk7XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF92M0IgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5leHBvcnQgZnVuY3Rpb24gZGVjb21wb3NlUm90YXRpb248VCBleHRlbmRzIFRIUkVFLlF1YXRlcm5pb24+KG1hdHJpeDogVEhSRUUuTWF0cml4NCwgdGFyZ2V0OiBUKTogVCB7XG4gIG1hdHJpeC5kZWNvbXBvc2UoX3YzQSwgdGFyZ2V0LCBfdjNCKTtcbiAgcmV0dXJuIHRhcmdldDtcbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbi8qKlxuICogQSBjb21wYXQgZnVuY3Rpb24gZm9yIGBRdWF0ZXJuaW9uLmludmVydCgpYCAvIGBRdWF0ZXJuaW9uLmludmVyc2UoKWAuXG4gKiBgUXVhdGVybmlvbi5pbnZlcnQoKWAgaXMgaW50cm9kdWNlZCBpbiByMTIzIGFuZCBgUXVhdGVybmlvbi5pbnZlcnNlKClgIGVtaXRzIGEgd2FybmluZy5cbiAqIFdlIGFyZSBnb2luZyB0byB1c2UgdGhpcyBjb21wYXQgZm9yIGEgd2hpbGUuXG4gKiBAcGFyYW0gdGFyZ2V0IEEgdGFyZ2V0IHF1YXRlcm5pb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHF1YXRJbnZlcnRDb21wYXQ8VCBleHRlbmRzIFRIUkVFLlF1YXRlcm5pb24+KHRhcmdldDogVCk6IFQge1xuICBpZiAoKHRhcmdldCBhcyBhbnkpLmludmVydCkge1xuICAgIHRhcmdldC5pbnZlcnQoKTtcbiAgfSBlbHNlIHtcbiAgICAodGFyZ2V0IGFzIGFueSkuaW52ZXJzZSgpO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbi8qKlxuICogQSBiYXNlIGNsYXNzIG9mIFZSTSBjb25zdHJhaW50IGNsYXNzZXMuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBWUk1Ob2RlQ29uc3RyYWludCB7XG4gIC8qKlxuICAgKiBUaGUgb2JqZWN0IGJlaW5nIGNvbnN0cmFpbmVkIGJ5IHRoZSB7QGxpbmsgc291cmNlfS5cbiAgICovXG4gIHB1YmxpYyBkZXN0aW5hdGlvbjogVEhSRUUuT2JqZWN0M0Q7XG5cbiAgLyoqXG4gICAqIFRoZSBvYmplY3QgY29uc3RyYWlucyB0aGUge0BsaW5rIGRlc3RpbmF0aW9ufS5cbiAgICovXG4gIHB1YmxpYyBzb3VyY2U6IFRIUkVFLk9iamVjdDNEO1xuXG4gIC8qKlxuICAgKiBUaGUgd2VpZ2h0IG9mIHRoZSBjb25zdHJhaW50LlxuICAgKi9cbiAgcHVibGljIHdlaWdodDogbnVtYmVyO1xuXG4gIHB1YmxpYyBhYnN0cmFjdCBnZXQgZGVwZW5kZW5jaWVzKCk6IFNldDxUSFJFRS5PYmplY3QzRD47XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBkZXN0aW5hdGlvbiBUaGUgZGVzdGluYXRpb24gb2JqZWN0XG4gICAqIEBwYXJhbSBzb3VyY2UgVGhlIHNvdXJjZSBvYmplY3RcbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogVEhSRUUuT2JqZWN0M0QsIHNvdXJjZTogVEhSRUUuT2JqZWN0M0QpIHtcbiAgICB0aGlzLmRlc3RpbmF0aW9uID0gZGVzdGluYXRpb247XG4gICAgdGhpcy5zb3VyY2UgPSBzb3VyY2U7XG5cbiAgICB0aGlzLndlaWdodCA9IDEuMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgaW5pdGlhbCBzdGF0ZSBvZiB0aGUgY29uc3RyYWludC5cbiAgICovXG4gIHB1YmxpYyBhYnN0cmFjdCBzZXRJbml0U3RhdGUoKTogdm9pZDtcblxuICAvKipcbiAgICogVXBkYXRlIGFuZCBhcHBseSB0aGUgY29uc3RyYWludC5cbiAgICovXG4gIHB1YmxpYyBhYnN0cmFjdCB1cGRhdGUoKTogdm9pZDtcbn1cbiIsICJpbXBvcnQgdHlwZSAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBUcmF2ZXJzZSBhbmNlc3RvcnMgb2YgZ2l2ZW4gb2JqZWN0IGFuZCBjYWxsIGdpdmVuIGNhbGxiYWNrIGZyb20gcm9vdCBzaWRlLlxuICogSXQgd2lsbCBpbmNsdWRlIHRoZSBnaXZlbiBvYmplY3QgaXRzZWxmLlxuICpcbiAqIEBwYXJhbSBvYmplY3QgVGhlIG9iamVjdCB5b3Ugd2FudCB0byB0cmF2ZXJzZVxuICogQHBhcmFtIGNhbGxiYWNrIFRoZSBjYWxsIGJhY2sgZnVuY3Rpb24gdGhhdCB3aWxsIGJlIGNhbGxlZCBmb3IgZWFjaCBhbmNlc3RvcnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRyYXZlcnNlQW5jZXN0b3JzRnJvbVJvb3Qob2JqZWN0OiBUSFJFRS5PYmplY3QzRCwgY2FsbGJhY2s6IChvYmplY3Q6IFRIUkVFLk9iamVjdDNEKSA9PiB2b2lkKTogdm9pZCB7XG4gIGNvbnN0IGFuY2VzdG9yczogVEhSRUUuT2JqZWN0M0RbXSA9IFtvYmplY3RdO1xuXG4gIGxldCBoZWFkOiBUSFJFRS5PYmplY3QzRCB8IG51bGwgPSBvYmplY3QucGFyZW50O1xuICB3aGlsZSAoaGVhZCAhPT0gbnVsbCkge1xuICAgIGFuY2VzdG9ycy51bnNoaWZ0KGhlYWQpO1xuICAgIGhlYWQgPSBoZWFkLnBhcmVudDtcbiAgfVxuXG4gIGFuY2VzdG9ycy5mb3JFYWNoKChhbmNlc3RvcikgPT4ge1xuICAgIGNhbGxiYWNrKGFuY2VzdG9yKTtcbiAgfSk7XG59XG4iLCAiaW1wb3J0IHR5cGUgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgdHlwZSB7IFZSTU5vZGVDb25zdHJhaW50IH0gZnJvbSAnLi9WUk1Ob2RlQ29uc3RyYWludCc7XG5pbXBvcnQgeyB0cmF2ZXJzZUFuY2VzdG9yc0Zyb21Sb290IH0gZnJvbSAnLi91dGlscy90cmF2ZXJzZUFuY2VzdG9yc0Zyb21Sb290JztcblxuZXhwb3J0IGNsYXNzIFZSTU5vZGVDb25zdHJhaW50TWFuYWdlciB7XG4gIHByaXZhdGUgX2NvbnN0cmFpbnRzID0gbmV3IFNldDxWUk1Ob2RlQ29uc3RyYWludD4oKTtcbiAgcHVibGljIGdldCBjb25zdHJhaW50cygpOiBTZXQ8VlJNTm9kZUNvbnN0cmFpbnQ+IHtcbiAgICByZXR1cm4gdGhpcy5fY29uc3RyYWludHM7XG4gIH1cblxuICBwcml2YXRlIF9vYmplY3RDb25zdHJhaW50c01hcCA9IG5ldyBNYXA8VEhSRUUuT2JqZWN0M0QsIFNldDxWUk1Ob2RlQ29uc3RyYWludD4+KCk7XG5cbiAgcHVibGljIGFkZENvbnN0cmFpbnQoY29uc3RyYWludDogVlJNTm9kZUNvbnN0cmFpbnQpOiB2b2lkIHtcbiAgICB0aGlzLl9jb25zdHJhaW50cy5hZGQoY29uc3RyYWludCk7XG5cbiAgICBsZXQgb2JqZWN0U2V0ID0gdGhpcy5fb2JqZWN0Q29uc3RyYWludHNNYXAuZ2V0KGNvbnN0cmFpbnQuZGVzdGluYXRpb24pO1xuICAgIGlmIChvYmplY3RTZXQgPT0gbnVsbCkge1xuICAgICAgb2JqZWN0U2V0ID0gbmV3IFNldDxWUk1Ob2RlQ29uc3RyYWludD4oKTtcbiAgICAgIHRoaXMuX29iamVjdENvbnN0cmFpbnRzTWFwLnNldChjb25zdHJhaW50LmRlc3RpbmF0aW9uLCBvYmplY3RTZXQpO1xuICAgIH1cbiAgICBvYmplY3RTZXQuYWRkKGNvbnN0cmFpbnQpO1xuICB9XG5cbiAgcHVibGljIGRlbGV0ZUNvbnN0cmFpbnQoY29uc3RyYWludDogVlJNTm9kZUNvbnN0cmFpbnQpOiB2b2lkIHtcbiAgICB0aGlzLl9jb25zdHJhaW50cy5kZWxldGUoY29uc3RyYWludCk7XG5cbiAgICBjb25zdCBvYmplY3RTZXQgPSB0aGlzLl9vYmplY3RDb25zdHJhaW50c01hcC5nZXQoY29uc3RyYWludC5kZXN0aW5hdGlvbikhO1xuICAgIG9iamVjdFNldC5kZWxldGUoY29uc3RyYWludCk7XG4gIH1cblxuICBwdWJsaWMgc2V0SW5pdFN0YXRlKCk6IHZvaWQge1xuICAgIGNvbnN0IGNvbnN0cmFpbnRzVHJpZWQgPSBuZXcgU2V0PFZSTU5vZGVDb25zdHJhaW50PigpO1xuICAgIGNvbnN0IGNvbnN0cmFpbnRzRG9uZSA9IG5ldyBTZXQ8VlJNTm9kZUNvbnN0cmFpbnQ+KCk7XG5cbiAgICBmb3IgKGNvbnN0IGNvbnN0cmFpbnQgb2YgdGhpcy5fY29uc3RyYWludHMpIHtcbiAgICAgIHRoaXMuX3Byb2Nlc3NDb25zdHJhaW50KGNvbnN0cmFpbnQsIGNvbnN0cmFpbnRzVHJpZWQsIGNvbnN0cmFpbnRzRG9uZSwgKGNvbnN0cmFpbnQpID0+IGNvbnN0cmFpbnQuc2V0SW5pdFN0YXRlKCkpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgY29uc3QgY29uc3RyYWludHNUcmllZCA9IG5ldyBTZXQ8VlJNTm9kZUNvbnN0cmFpbnQ+KCk7XG4gICAgY29uc3QgY29uc3RyYWludHNEb25lID0gbmV3IFNldDxWUk1Ob2RlQ29uc3RyYWludD4oKTtcblxuICAgIGZvciAoY29uc3QgY29uc3RyYWludCBvZiB0aGlzLl9jb25zdHJhaW50cykge1xuICAgICAgdGhpcy5fcHJvY2Vzc0NvbnN0cmFpbnQoY29uc3RyYWludCwgY29uc3RyYWludHNUcmllZCwgY29uc3RyYWludHNEb25lLCAoY29uc3RyYWludCkgPT4gY29uc3RyYWludC51cGRhdGUoKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBhIGNvbnN0cmFpbnQuXG4gICAqIElmIHRoZXJlIGFyZSBvdGhlciBjb25zdHJhaW50cyB0aGF0IGFyZSBkZXBlbmRhbnQsIGl0IHdpbGwgdHJ5IHRvIHVwZGF0ZSB0aGVtIHJlY3Vyc2l2ZWx5LlxuICAgKiBJdCBtaWdodCB0aHJvdyBhbiBlcnJvciBpZiB0aGVyZSBhcmUgY2lyY3VsYXIgZGVwZW5kZW5jaWVzLlxuICAgKlxuICAgKiBJbnRlbmRlZCB0byBiZSB1c2VkIGluIHtAbGluayB1cGRhdGV9IGFuZCB7QGxpbmsgX3Byb2Nlc3NDb25zdHJhaW50fSBpdHNlbGYgcmVjdXJzaXZlbHkuXG4gICAqXG4gICAqIEBwYXJhbSBjb25zdHJhaW50IEEgY29uc3RyYWludCB5b3Ugd2FudCB0byB1cGRhdGVcbiAgICogQHBhcmFtIGNvbnN0cmFpbnRzVHJpZWQgU2V0IG9mIGNvbnN0cmFpbnRzIHRoYXQgYXJlIGFscmVhZHkgdHJpZWQgdG8gYmUgdXBkYXRlZFxuICAgKiBAcGFyYW0gY29uc3RyYWludHNEb25lIFNldCBvZiBjb25zdHJhaW50cyB0aGF0IGFyZSBhbHJlYWR5IHVwIHRvIGRhdGVcbiAgICovXG4gIHByaXZhdGUgX3Byb2Nlc3NDb25zdHJhaW50KFxuICAgIGNvbnN0cmFpbnQ6IFZSTU5vZGVDb25zdHJhaW50LFxuICAgIGNvbnN0cmFpbnRzVHJpZWQ6IFNldDxWUk1Ob2RlQ29uc3RyYWludD4sXG4gICAgY29uc3RyYWludHNEb25lOiBTZXQ8VlJNTm9kZUNvbnN0cmFpbnQ+LFxuICAgIGNhbGxiYWNrOiAoY29uc3RyYWludDogVlJNTm9kZUNvbnN0cmFpbnQpID0+IHZvaWQsXG4gICk6IHZvaWQge1xuICAgIGlmIChjb25zdHJhaW50c0RvbmUuaGFzKGNvbnN0cmFpbnQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGNvbnN0cmFpbnRzVHJpZWQuaGFzKGNvbnN0cmFpbnQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZSTU5vZGVDb25zdHJhaW50TWFuYWdlcjogQ2lyY3VsYXIgZGVwZW5kZW5jeSBkZXRlY3RlZCB3aGlsZSB1cGRhdGluZyBjb25zdHJhaW50cycpO1xuICAgIH1cbiAgICBjb25zdHJhaW50c1RyaWVkLmFkZChjb25zdHJhaW50KTtcblxuICAgIGNvbnN0IGRlcE9iamVjdHMgPSBjb25zdHJhaW50LmRlcGVuZGVuY2llcztcbiAgICBmb3IgKGNvbnN0IGRlcE9iamVjdCBvZiBkZXBPYmplY3RzKSB7XG4gICAgICB0cmF2ZXJzZUFuY2VzdG9yc0Zyb21Sb290KGRlcE9iamVjdCwgKGRlcE9iamVjdEFuY2VzdG9yKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iamVjdFNldCA9IHRoaXMuX29iamVjdENvbnN0cmFpbnRzTWFwLmdldChkZXBPYmplY3RBbmNlc3Rvcik7XG4gICAgICAgIGlmIChvYmplY3RTZXQpIHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGRlcENvbnN0cmFpbnQgb2Ygb2JqZWN0U2V0KSB7XG4gICAgICAgICAgICB0aGlzLl9wcm9jZXNzQ29uc3RyYWludChkZXBDb25zdHJhaW50LCBjb25zdHJhaW50c1RyaWVkLCBjb25zdHJhaW50c0RvbmUsIGNhbGxiYWNrKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNhbGxiYWNrKGNvbnN0cmFpbnQpO1xuXG4gICAgY29uc3RyYWludHNEb25lLmFkZChjb25zdHJhaW50KTtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IHF1YXRJbnZlcnRDb21wYXQgfSBmcm9tICcuL3V0aWxzL3F1YXRJbnZlcnRDb21wYXQnO1xuaW1wb3J0IHsgVlJNTm9kZUNvbnN0cmFpbnQgfSBmcm9tICcuL1ZSTU5vZGVDb25zdHJhaW50JztcblxuY29uc3QgX3F1YXRBID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbmNvbnN0IF9xdWF0QiA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5cbi8qKlxuICogQSBjb25zdHJhaW50IHRoYXQgdHJhbnNmZXJzIGEgcm90YXRpb24gYXJvdW5kIG9uZSBheGlzIG9mIGEgc291cmNlLlxuICpcbiAqIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL3ZybS1jL3ZybS1zcGVjaWZpY2F0aW9uL3RyZWUvbWFzdGVyL3NwZWNpZmljYXRpb24vVlJNQ19ub2RlX2NvbnN0cmFpbnQtMS4wX2JldGEjcm9sbC1jb25zdHJhaW50XG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1Sb3RhdGlvbkNvbnN0cmFpbnQgZXh0ZW5kcyBWUk1Ob2RlQ29uc3RyYWludCB7XG4gIC8qKlxuICAgKiBUaGUgcmVzdCBxdWF0ZXJuaW9uIG9mIHRoZSB7QGxpbmsgZGVzdGluYXRpb259LlxuICAgKi9cbiAgcHJpdmF0ZSBfZHN0UmVzdFF1YXQ6IFRIUkVFLlF1YXRlcm5pb247XG5cbiAgLyoqXG4gICAqIFRoZSBpbnZlcnNlIG9mIHRoZSByZXN0IHF1YXRlcm5pb24gb2YgdGhlIHtAbGluayBzb3VyY2V9LlxuICAgKi9cbiAgcHJpdmF0ZSBfaW52U3JjUmVzdFF1YXQ6IFRIUkVFLlF1YXRlcm5pb247XG5cbiAgcHVibGljIGdldCBkZXBlbmRlbmNpZXMoKTogU2V0PFRIUkVFLk9iamVjdDNEPiB7XG4gICAgcmV0dXJuIG5ldyBTZXQoW3RoaXMuc291cmNlXSk7XG4gIH1cblxuICBwdWJsaWMgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFRIUkVFLk9iamVjdDNELCBzb3VyY2U6IFRIUkVFLk9iamVjdDNEKSB7XG4gICAgc3VwZXIoZGVzdGluYXRpb24sIHNvdXJjZSk7XG5cbiAgICB0aGlzLl9kc3RSZXN0UXVhdCA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG4gICAgdGhpcy5faW52U3JjUmVzdFF1YXQgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuICB9XG5cbiAgcHVibGljIHNldEluaXRTdGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9kc3RSZXN0UXVhdC5jb3B5KHRoaXMuZGVzdGluYXRpb24ucXVhdGVybmlvbik7XG4gICAgcXVhdEludmVydENvbXBhdCh0aGlzLl9pbnZTcmNSZXN0UXVhdC5jb3B5KHRoaXMuc291cmNlLnF1YXRlcm5pb24pKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgLy8gY2FsY3VsYXRlIHRoZSBkZWx0YSByb3RhdGlvbiBmcm9tIHRoZSByZXN0IGFib3V0IHRoZSBzb3VyY2VcbiAgICBjb25zdCBzcmNEZWx0YVF1YXQgPSBfcXVhdEEuY29weSh0aGlzLl9pbnZTcmNSZXN0UXVhdCkubXVsdGlwbHkodGhpcy5zb3VyY2UucXVhdGVybmlvbik7XG5cbiAgICAvLyBtdWx0aXBseSB0aGUgZGVsdGEgdG8gdGhlIHJlc3Qgb2YgdGhlIGRlc3RpbmF0aW9uXG4gICAgY29uc3QgdGFyZ2V0UXVhdCA9IF9xdWF0Qi5jb3B5KHRoaXMuX2RzdFJlc3RRdWF0KS5tdWx0aXBseShzcmNEZWx0YVF1YXQpO1xuXG4gICAgLy8gYmxlbmQgd2l0aCB0aGUgcmVzdCBxdWF0ZXJuaW9uIHVzaW5nIHdlaWdodFxuICAgIHRoaXMuZGVzdGluYXRpb24ucXVhdGVybmlvbi5jb3B5KHRoaXMuX2RzdFJlc3RRdWF0KS5zbGVycCh0YXJnZXRRdWF0LCB0aGlzLndlaWdodCk7XG4gIH1cbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBxdWF0SW52ZXJ0Q29tcGF0IH0gZnJvbSAnLi91dGlscy9xdWF0SW52ZXJ0Q29tcGF0JztcbmltcG9ydCB7IFZSTU5vZGVDb25zdHJhaW50IH0gZnJvbSAnLi9WUk1Ob2RlQ29uc3RyYWludCc7XG5cbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3F1YXRBID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbmNvbnN0IF9xdWF0QiA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5cbi8qKlxuICogQSBjb25zdHJhaW50IHRoYXQgdHJhbnNmZXJzIGEgcm90YXRpb24gYXJvdW5kIG9uZSBheGlzIG9mIGEgc291cmNlLlxuICpcbiAqIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL3ZybS1jL3ZybS1zcGVjaWZpY2F0aW9uL3RyZWUvbWFzdGVyL3NwZWNpZmljYXRpb24vVlJNQ19ub2RlX2NvbnN0cmFpbnQtMS4wX2JldGEjcm9sbC1jb25zdHJhaW50XG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1Sb2xsQ29uc3RyYWludCBleHRlbmRzIFZSTU5vZGVDb25zdHJhaW50IHtcbiAgLyoqXG4gICAqIFRoZSByb2xsIGF4aXMgb2YgdGhlIGNvbnN0cmFpbnQuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJvbGxBeGlzKCk6ICdYJyB8ICdZJyB8ICdaJyB7XG4gICAgcmV0dXJuIHRoaXMuX3JvbGxBeGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSByb2xsIGF4aXMgb2YgdGhlIGNvbnN0cmFpbnQuXG4gICAqL1xuICBwdWJsaWMgc2V0IHJvbGxBeGlzKHJvbGxBeGlzOiAnWCcgfCAnWScgfCAnWicpIHtcbiAgICB0aGlzLl9yb2xsQXhpcyA9IHJvbGxBeGlzO1xuICAgIHRoaXMuX3YzUm9sbEF4aXMuc2V0KHJvbGxBeGlzID09PSAnWCcgPyAxLjAgOiAwLjAsIHJvbGxBeGlzID09PSAnWScgPyAxLjAgOiAwLjAsIHJvbGxBeGlzID09PSAnWicgPyAxLjAgOiAwLjApO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSByb2xsIGF4aXMgb2YgdGhlIGNvbnN0cmFpbnQuXG4gICAqL1xuICBwcml2YXRlIF9yb2xsQXhpczogJ1gnIHwgJ1knIHwgJ1onO1xuXG4gIC8qKlxuICAgKiBUaGUge0BsaW5rIF9yb2xsQXhpc30gYnV0IGluIGFuIGFjdHVhbCBWZWN0b3IzIGZvcm0uXG4gICAqL1xuICBwcml2YXRlIF92M1JvbGxBeGlzOiBUSFJFRS5WZWN0b3IzO1xuXG4gIC8qKlxuICAgKiBUaGUgcmVzdCBxdWF0ZXJuaW9uIG9mIHRoZSB7QGxpbmsgZGVzdGluYXRpb259LlxuICAgKi9cbiAgcHJpdmF0ZSBfZHN0UmVzdFF1YXQ6IFRIUkVFLlF1YXRlcm5pb247XG5cbiAgLyoqXG4gICAqIFRoZSBpbnZlcnNlIG9mIHRoZSByZXN0IHF1YXRlcm5pb24gb2YgdGhlIHtAbGluayBkZXN0aW5hdGlvbn0uXG4gICAqL1xuICBwcml2YXRlIF9pbnZEc3RSZXN0UXVhdDogVEhSRUUuUXVhdGVybmlvbjtcblxuICAvKipcbiAgICogYHNyY1Jlc3RRdWF0LmludmVydCgpICogZHN0UmVzdFF1YXRgLlxuICAgKi9cbiAgcHJpdmF0ZSBfaW52U3JjUmVzdFF1YXRNdWxEc3RSZXN0UXVhdDogVEhSRUUuUXVhdGVybmlvbjtcblxuICBwdWJsaWMgZ2V0IGRlcGVuZGVuY2llcygpOiBTZXQ8VEhSRUUuT2JqZWN0M0Q+IHtcbiAgICByZXR1cm4gbmV3IFNldChbdGhpcy5zb3VyY2VdKTtcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogVEhSRUUuT2JqZWN0M0QsIHNvdXJjZTogVEhSRUUuT2JqZWN0M0QpIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbiwgc291cmNlKTtcblxuICAgIHRoaXMuX3JvbGxBeGlzID0gJ1gnO1xuICAgIHRoaXMuX3YzUm9sbEF4aXMgPSBuZXcgVEhSRUUuVmVjdG9yMygxLCAwLCAwKTtcblxuICAgIHRoaXMuX2RzdFJlc3RRdWF0ID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbiAgICB0aGlzLl9pbnZEc3RSZXN0UXVhdCA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG4gICAgdGhpcy5faW52U3JjUmVzdFF1YXRNdWxEc3RSZXN0UXVhdCA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG4gIH1cblxuICBwdWJsaWMgc2V0SW5pdFN0YXRlKCk6IHZvaWQge1xuICAgIHRoaXMuX2RzdFJlc3RRdWF0LmNvcHkodGhpcy5kZXN0aW5hdGlvbi5xdWF0ZXJuaW9uKTtcbiAgICBxdWF0SW52ZXJ0Q29tcGF0KHRoaXMuX2ludkRzdFJlc3RRdWF0LmNvcHkodGhpcy5fZHN0UmVzdFF1YXQpKTtcbiAgICBxdWF0SW52ZXJ0Q29tcGF0KHRoaXMuX2ludlNyY1Jlc3RRdWF0TXVsRHN0UmVzdFF1YXQuY29weSh0aGlzLnNvdXJjZS5xdWF0ZXJuaW9uKSkubXVsdGlwbHkodGhpcy5fZHN0UmVzdFF1YXQpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICAvLyBjYWxjdWxhdGUgdGhlIGRlbHRhIHJvdGF0aW9uIGZyb20gdGhlIHJlc3QgYWJvdXQgdGhlIHNvdXJjZSwgdGhlbiBjb252ZXJ0IHRvIHRoZSBkZXN0aW5hdGlvbiBsb2NhbCBjb29yZFxuICAgIC8qKlxuICAgICAqIFdoYXQgdGhlIHF1YXREZWx0YSBpcyBpbnRlbmRlZCB0byBiZTpcbiAgICAgKlxuICAgICAqIGBgYHRzXG4gICAgICogY29uc3QgcXVhdFNyY0RlbHRhID0gX3F1YXRBXG4gICAgICogICAuY29weSggdGhpcy5faW52U3JjUmVzdFF1YXQgKVxuICAgICAqICAgLm11bHRpcGx5KCB0aGlzLnNvdXJjZS5xdWF0ZXJuaW9uICk7XG4gICAgICogY29uc3QgcXVhdFNyY0RlbHRhSW5QYXJlbnQgPSBfcXVhdEJcbiAgICAgKiAgIC5jb3B5KCB0aGlzLl9zcmNSZXN0UXVhdCApXG4gICAgICogICAubXVsdGlwbHkoIHF1YXRTcmNEZWx0YSApXG4gICAgICogICAubXVsdGlwbHkoIHRoaXMuX2ludlNyY1Jlc3RRdWF0ICk7XG4gICAgICogY29uc3QgcXVhdFNyY0RlbHRhSW5Ec3QgPSBfcXVhdEFcbiAgICAgKiAgIC5jb3B5KCB0aGlzLl9pbnZEc3RSZXN0UXVhdCApXG4gICAgICogICAubXVsdGlwbHkoIHF1YXRTcmNEZWx0YUluUGFyZW50IClcbiAgICAgKiAgIC5tdWx0aXBseSggdGhpcy5fZHN0UmVzdFF1YXQgKTtcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBjb25zdCBxdWF0RGVsdGEgPSBfcXVhdEFcbiAgICAgIC5jb3B5KHRoaXMuX2ludkRzdFJlc3RRdWF0KVxuICAgICAgLm11bHRpcGx5KHRoaXMuc291cmNlLnF1YXRlcm5pb24pXG4gICAgICAubXVsdGlwbHkodGhpcy5faW52U3JjUmVzdFF1YXRNdWxEc3RSZXN0UXVhdCk7XG5cbiAgICAvLyBjcmVhdGUgYSBmcm9tLXRvIHF1YXRlcm5pb25cbiAgICBjb25zdCBuMSA9IF92M0EuY29weSh0aGlzLl92M1JvbGxBeGlzKS5hcHBseVF1YXRlcm5pb24ocXVhdERlbHRhKTtcblxuICAgIC8qKlxuICAgICAqIFdoYXQgdGhlIHF1YXRGcm9tVG8gaXMgaW50ZW5kZWQgdG8gYmU6XG4gICAgICpcbiAgICAgKiBgYGB0c1xuICAgICAqIGNvbnN0IHF1YXRGcm9tVG8gPSBfcXVhdEIuc2V0RnJvbVVuaXRWZWN0b3JzKCB0aGlzLl92M1JvbGxBeGlzLCBuMSApLmludmVyc2UoKTtcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBjb25zdCBxdWF0RnJvbVRvID0gX3F1YXRCLnNldEZyb21Vbml0VmVjdG9ycyhuMSwgdGhpcy5fdjNSb2xsQXhpcyk7XG5cbiAgICAvLyBxdWF0RnJvbVRvICogcXVhdERlbHRhID09IHJvbGwgZXh0cmFjdGVkIGZyb20gcXVhdERlbHRhXG4gICAgY29uc3QgdGFyZ2V0UXVhdCA9IHF1YXRGcm9tVG8ucHJlbXVsdGlwbHkodGhpcy5fZHN0UmVzdFF1YXQpLm11bHRpcGx5KHF1YXREZWx0YSk7XG5cbiAgICAvLyBibGVuZCB3aXRoIHRoZSByZXN0IHF1YXRlcm5pb24gdXNpbmcgd2VpZ2h0XG4gICAgdGhpcy5kZXN0aW5hdGlvbi5xdWF0ZXJuaW9uLmNvcHkodGhpcy5fZHN0UmVzdFF1YXQpLnNsZXJwKHRhcmdldFF1YXQsIHRoaXMud2VpZ2h0KTtcbiAgfVxufVxuIiwgImltcG9ydCB0eXBlICogYXMgQ29uc3RyYWludFNjaGVtYSBmcm9tICdAcGl4aXYvdHlwZXMtdnJtYy1ub2RlLWNvbnN0cmFpbnQtMS4wJztcbmltcG9ydCB0eXBlICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHR5cGUgeyBHTFRGLCBHTFRGTG9hZGVyUGx1Z2luLCBHTFRGUGFyc2VyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlci5qcyc7XG5pbXBvcnQgeyBWUk1Ob2RlQ29uc3RyYWludEhlbHBlciB9IGZyb20gJy4vaGVscGVycyc7XG5pbXBvcnQgdHlwZSB7IFZSTU5vZGVDb25zdHJhaW50TG9hZGVyUGx1Z2luT3B0aW9ucyB9IGZyb20gJy4vVlJNTm9kZUNvbnN0cmFpbnRMb2FkZXJQbHVnaW5PcHRpb25zJztcbmltcG9ydCB7IFZSTU5vZGVDb25zdHJhaW50TWFuYWdlciB9IGZyb20gJy4vVlJNTm9kZUNvbnN0cmFpbnRNYW5hZ2VyJztcbmltcG9ydCB7IFZSTVJvdGF0aW9uQ29uc3RyYWludCB9IGZyb20gJy4vVlJNUm90YXRpb25Db25zdHJhaW50JztcbmltcG9ydCB7IEdMVEYgYXMgR0xURlNjaGVtYSB9IGZyb20gJ0BnbHRmLXRyYW5zZm9ybS9jb3JlJztcbmltcG9ydCB7IFZSTUFpbUNvbnN0cmFpbnQgfSBmcm9tICcuL1ZSTUFpbUNvbnN0cmFpbnQnO1xuaW1wb3J0IHsgVlJNUm9sbENvbnN0cmFpbnQgfSBmcm9tICcuL1ZSTVJvbGxDb25zdHJhaW50JztcblxuLyoqXG4gKiBQb3NzaWJsZSBzcGVjIHZlcnNpb25zIGl0IHJlY29nbml6ZXMuXG4gKi9cbmNvbnN0IFBPU1NJQkxFX1NQRUNfVkVSU0lPTlMgPSBuZXcgU2V0KFsnMS4wJywgJzEuMC1iZXRhJ10pO1xuXG5leHBvcnQgY2xhc3MgVlJNTm9kZUNvbnN0cmFpbnRMb2FkZXJQbHVnaW4gaW1wbGVtZW50cyBHTFRGTG9hZGVyUGx1Z2luIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBFWFRFTlNJT05fTkFNRSA9ICdWUk1DX25vZGVfY29uc3RyYWludCc7XG5cbiAgLyoqXG4gICAqIFNwZWNpZnkgYW4gT2JqZWN0M0QgdG8gYWRkIHtAbGluayBWUk1Ob2RlQ29uc3RyYWludEhlbHBlcn0gcy5cbiAgICogSWYgbm90IHNwZWNpZmllZCwgaGVscGVyIHdpbGwgbm90IGJlIGNyZWF0ZWQuXG4gICAqIElmIGByZW5kZXJPcmRlcmAgaXMgc2V0IHRvIHRoZSByb290LCBoZWxwZXJzIHdpbGwgY29weSB0aGUgc2FtZSBgcmVuZGVyT3JkZXJgIC5cbiAgICovXG4gIHB1YmxpYyBoZWxwZXJSb290PzogVEhSRUUuT2JqZWN0M0Q7XG5cbiAgcHVibGljIHJlYWRvbmx5IHBhcnNlcjogR0xURlBhcnNlcjtcblxuICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gVlJNTm9kZUNvbnN0cmFpbnRMb2FkZXJQbHVnaW4uRVhURU5TSU9OX05BTUU7XG4gIH1cblxuICBwdWJsaWMgY29uc3RydWN0b3IocGFyc2VyOiBHTFRGUGFyc2VyLCBvcHRpb25zPzogVlJNTm9kZUNvbnN0cmFpbnRMb2FkZXJQbHVnaW5PcHRpb25zKSB7XG4gICAgdGhpcy5wYXJzZXIgPSBwYXJzZXI7XG5cbiAgICB0aGlzLmhlbHBlclJvb3QgPSBvcHRpb25zPy5oZWxwZXJSb290O1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGFmdGVyUm9vdChnbHRmOiBHTFRGKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgZ2x0Zi51c2VyRGF0YS52cm1Ob2RlQ29uc3RyYWludE1hbmFnZXIgPSBhd2FpdCB0aGlzLl9pbXBvcnQoZ2x0Zik7XG4gIH1cblxuICAvKipcbiAgICogSW1wb3J0IGNvbnN0cmFpbnRzIGZyb20gYSBHTFRGIGFuZCByZXR1cm5zIGEge0BsaW5rIFZSTU5vZGVDb25zdHJhaW50TWFuYWdlcn0uXG4gICAqIEl0IG1pZ2h0IHJldHVybiBgbnVsbGAgaW5zdGVhZCB3aGVuIGl0IGRvZXMgbm90IG5lZWQgdG8gYmUgY3JlYXRlZCBvciBzb21ldGhpbmcgZ28gd3JvbmcuXG4gICAqXG4gICAqIEBwYXJhbSBnbHRmIEEgcGFyc2VkIHJlc3VsdCBvZiBHTFRGIHRha2VuIGZyb20gR0xURkxvYWRlclxuICAgKi9cbiAgcHJvdGVjdGVkIGFzeW5jIF9pbXBvcnQoZ2x0ZjogR0xURik6IFByb21pc2U8VlJNTm9kZUNvbnN0cmFpbnRNYW5hZ2VyIHwgbnVsbD4ge1xuICAgIGNvbnN0IGpzb24gPSB0aGlzLnBhcnNlci5qc29uIGFzIEdMVEZTY2hlbWEuSUdMVEY7XG5cbiAgICAvLyBlYXJseSBhYm9ydCBpZiBpdCBkb2Vzbid0IHVzZSBjb25zdHJhaW50c1xuICAgIGNvbnN0IGlzQ29uc3RyYWludHNVc2VkID0ganNvbi5leHRlbnNpb25zVXNlZD8uaW5kZXhPZihWUk1Ob2RlQ29uc3RyYWludExvYWRlclBsdWdpbi5FWFRFTlNJT05fTkFNRSkgIT09IC0xO1xuICAgIGlmICghaXNDb25zdHJhaW50c1VzZWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IG1hbmFnZXIgPSBuZXcgVlJNTm9kZUNvbnN0cmFpbnRNYW5hZ2VyKCk7XG4gICAgY29uc3QgdGhyZWVOb2RlczogVEhSRUUuT2JqZWN0M0RbXSA9IGF3YWl0IHRoaXMucGFyc2VyLmdldERlcGVuZGVuY2llcygnbm9kZScpO1xuXG4gICAgLy8gaW1wb3J0IGNvbnN0cmFpbnRzIGZvciBlYWNoIG5vZGVzXG4gICAgdGhyZWVOb2Rlcy5mb3JFYWNoKChub2RlLCBub2RlSW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IHNjaGVtYU5vZGUgPSBqc29uLm5vZGVzIVtub2RlSW5kZXhdO1xuXG4gICAgICAvLyBjaGVjayBpZiB0aGUgZXh0ZW5zaW9uIHVzZXMgdGhlIGV4dGVuc2lvblxuICAgICAgY29uc3QgZXh0ZW5zaW9uID0gc2NoZW1hTm9kZT8uZXh0ZW5zaW9ucz8uW1ZSTU5vZGVDb25zdHJhaW50TG9hZGVyUGx1Z2luLkVYVEVOU0lPTl9OQU1FXSBhc1xuICAgICAgICB8IENvbnN0cmFpbnRTY2hlbWEuVlJNQ05vZGVDb25zdHJhaW50XG4gICAgICAgIHwgdW5kZWZpbmVkO1xuXG4gICAgICBpZiAoZXh0ZW5zaW9uID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzcGVjVmVyc2lvbiA9IGV4dGVuc2lvbi5zcGVjVmVyc2lvbjtcbiAgICAgIGlmICghUE9TU0lCTEVfU1BFQ19WRVJTSU9OUy5oYXMoc3BlY1ZlcnNpb24pKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICBgVlJNTm9kZUNvbnN0cmFpbnRMb2FkZXJQbHVnaW46IFVua25vd24gJHtWUk1Ob2RlQ29uc3RyYWludExvYWRlclBsdWdpbi5FWFRFTlNJT05fTkFNRX0gc3BlY1ZlcnNpb24gXCIke3NwZWNWZXJzaW9ufVwiYCxcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjb25zdHJhaW50RGVmID0gZXh0ZW5zaW9uLmNvbnN0cmFpbnQ7XG5cbiAgICAgIC8vIGltcG9ydCBjb25zdHJhaW50c1xuICAgICAgaWYgKGNvbnN0cmFpbnREZWYucm9sbCAhPSBudWxsKSB7XG4gICAgICAgIGNvbnN0IGNvbnN0cmFpbnQgPSB0aGlzLl9pbXBvcnRSb2xsQ29uc3RyYWludChub2RlLCB0aHJlZU5vZGVzLCBjb25zdHJhaW50RGVmLnJvbGwpO1xuICAgICAgICBtYW5hZ2VyLmFkZENvbnN0cmFpbnQoY29uc3RyYWludCk7XG4gICAgICB9IGVsc2UgaWYgKGNvbnN0cmFpbnREZWYuYWltICE9IG51bGwpIHtcbiAgICAgICAgY29uc3QgY29uc3RyYWludCA9IHRoaXMuX2ltcG9ydEFpbUNvbnN0cmFpbnQobm9kZSwgdGhyZWVOb2RlcywgY29uc3RyYWludERlZi5haW0pO1xuICAgICAgICBtYW5hZ2VyLmFkZENvbnN0cmFpbnQoY29uc3RyYWludCk7XG4gICAgICB9IGVsc2UgaWYgKGNvbnN0cmFpbnREZWYucm90YXRpb24gIT0gbnVsbCkge1xuICAgICAgICBjb25zdCBjb25zdHJhaW50ID0gdGhpcy5faW1wb3J0Um90YXRpb25Db25zdHJhaW50KG5vZGUsIHRocmVlTm9kZXMsIGNvbnN0cmFpbnREZWYucm90YXRpb24pO1xuICAgICAgICBtYW5hZ2VyLmFkZENvbnN0cmFpbnQoY29uc3RyYWludCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBpbml0IGNvbnN0cmFpbnRzXG4gICAgZ2x0Zi5zY2VuZS51cGRhdGVNYXRyaXhXb3JsZCgpO1xuICAgIG1hbmFnZXIuc2V0SW5pdFN0YXRlKCk7XG5cbiAgICByZXR1cm4gbWFuYWdlcjtcbiAgfVxuXG4gIHByb3RlY3RlZCBfaW1wb3J0Um9sbENvbnN0cmFpbnQoXG4gICAgZGVzdGluYXRpb246IFRIUkVFLk9iamVjdDNELFxuICAgIG5vZGVzOiBUSFJFRS5PYmplY3QzRFtdLFxuICAgIHJvbGxDb25zdHJhaW50RGVmOiBDb25zdHJhaW50U2NoZW1hLlJvbGxDb25zdHJhaW50LFxuICApOiBWUk1Sb2xsQ29uc3RyYWludCB7XG4gICAgY29uc3QgeyBzb3VyY2U6IHNvdXJjZUluZGV4LCByb2xsQXhpcywgd2VpZ2h0IH0gPSByb2xsQ29uc3RyYWludERlZjtcbiAgICBjb25zdCBzb3VyY2UgPSBub2Rlc1tzb3VyY2VJbmRleF07XG4gICAgY29uc3QgY29uc3RyYWludCA9IG5ldyBWUk1Sb2xsQ29uc3RyYWludChkZXN0aW5hdGlvbiwgc291cmNlKTtcblxuICAgIGlmIChyb2xsQXhpcyAhPSBudWxsKSB7XG4gICAgICBjb25zdHJhaW50LnJvbGxBeGlzID0gcm9sbEF4aXM7XG4gICAgfVxuICAgIGlmICh3ZWlnaHQgIT0gbnVsbCkge1xuICAgICAgY29uc3RyYWludC53ZWlnaHQgPSB3ZWlnaHQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaGVscGVyUm9vdCkge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IFZSTU5vZGVDb25zdHJhaW50SGVscGVyKGNvbnN0cmFpbnQpO1xuICAgICAgdGhpcy5oZWxwZXJSb290LmFkZChoZWxwZXIpO1xuICAgIH1cblxuICAgIHJldHVybiBjb25zdHJhaW50O1xuICB9XG5cbiAgcHJvdGVjdGVkIF9pbXBvcnRBaW1Db25zdHJhaW50KFxuICAgIGRlc3RpbmF0aW9uOiBUSFJFRS5PYmplY3QzRCxcbiAgICBub2RlczogVEhSRUUuT2JqZWN0M0RbXSxcbiAgICBhaW1Db25zdHJhaW50RGVmOiBDb25zdHJhaW50U2NoZW1hLkFpbUNvbnN0cmFpbnQsXG4gICk6IFZSTUFpbUNvbnN0cmFpbnQge1xuICAgIGNvbnN0IHsgc291cmNlOiBzb3VyY2VJbmRleCwgYWltQXhpcywgd2VpZ2h0IH0gPSBhaW1Db25zdHJhaW50RGVmO1xuICAgIGNvbnN0IHNvdXJjZSA9IG5vZGVzW3NvdXJjZUluZGV4XTtcbiAgICBjb25zdCBjb25zdHJhaW50ID0gbmV3IFZSTUFpbUNvbnN0cmFpbnQoZGVzdGluYXRpb24sIHNvdXJjZSk7XG5cbiAgICBpZiAoYWltQXhpcyAhPSBudWxsKSB7XG4gICAgICBjb25zdHJhaW50LmFpbUF4aXMgPSBhaW1BeGlzO1xuICAgIH1cbiAgICBpZiAod2VpZ2h0ICE9IG51bGwpIHtcbiAgICAgIGNvbnN0cmFpbnQud2VpZ2h0ID0gd2VpZ2h0O1xuICAgIH1cblxuICAgIGlmICh0aGlzLmhlbHBlclJvb3QpIHtcbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBWUk1Ob2RlQ29uc3RyYWludEhlbHBlcihjb25zdHJhaW50KTtcbiAgICAgIHRoaXMuaGVscGVyUm9vdC5hZGQoaGVscGVyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29uc3RyYWludDtcbiAgfVxuXG4gIHByb3RlY3RlZCBfaW1wb3J0Um90YXRpb25Db25zdHJhaW50KFxuICAgIGRlc3RpbmF0aW9uOiBUSFJFRS5PYmplY3QzRCxcbiAgICBub2RlczogVEhSRUUuT2JqZWN0M0RbXSxcbiAgICByb3RhdGlvbkNvbnN0cmFpbnREZWY6IENvbnN0cmFpbnRTY2hlbWEuUm90YXRpb25Db25zdHJhaW50LFxuICApOiBWUk1Sb3RhdGlvbkNvbnN0cmFpbnQge1xuICAgIGNvbnN0IHsgc291cmNlOiBzb3VyY2VJbmRleCwgd2VpZ2h0IH0gPSByb3RhdGlvbkNvbnN0cmFpbnREZWY7XG4gICAgY29uc3Qgc291cmNlID0gbm9kZXNbc291cmNlSW5kZXhdO1xuICAgIGNvbnN0IGNvbnN0cmFpbnQgPSBuZXcgVlJNUm90YXRpb25Db25zdHJhaW50KGRlc3RpbmF0aW9uLCBzb3VyY2UpO1xuXG4gICAgaWYgKHdlaWdodCAhPSBudWxsKSB7XG4gICAgICBjb25zdHJhaW50LndlaWdodCA9IHdlaWdodDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5oZWxwZXJSb290KSB7XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgVlJNTm9kZUNvbnN0cmFpbnRIZWxwZXIoY29uc3RyYWludCk7XG4gICAgICB0aGlzLmhlbHBlclJvb3QuYWRkKGhlbHBlcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbnN0cmFpbnQ7XG4gIH1cbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXIgfSBmcm9tICcuLi9WUk1TcHJpbmdCb25lQ29sbGlkZXInO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVDYXBzdWxlIH0gZnJvbSAnLi4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVDYXBzdWxlJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlUGxhbmUgfSBmcm9tICcuLi9WUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZVBsYW5lJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlU3BoZXJlIH0gZnJvbSAnLi4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVTcGhlcmUnO1xuaW1wb3J0IHsgQ29sbGlkZXJTaGFwZUJ1ZmZlckdlb21ldHJ5IH0gZnJvbSAnLi91dGlscy9Db2xsaWRlclNoYXBlQnVmZmVyR2VvbWV0cnknO1xuaW1wb3J0IHsgQ29sbGlkZXJTaGFwZUNhcHN1bGVCdWZmZXJHZW9tZXRyeSB9IGZyb20gJy4vdXRpbHMvQ29sbGlkZXJTaGFwZUNhcHN1bGVCdWZmZXJHZW9tZXRyeSc7XG5pbXBvcnQgeyBDb2xsaWRlclNoYXBlUGxhbmVCdWZmZXJHZW9tZXRyeSB9IGZyb20gJy4vdXRpbHMvQ29sbGlkZXJTaGFwZVBsYW5lQnVmZmVyR2VvbWV0cnknO1xuaW1wb3J0IHsgQ29sbGlkZXJTaGFwZVNwaGVyZUJ1ZmZlckdlb21ldHJ5IH0gZnJvbSAnLi91dGlscy9Db2xsaWRlclNoYXBlU3BoZXJlQnVmZmVyR2VvbWV0cnknO1xuXG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuZXhwb3J0IGNsYXNzIFZSTVNwcmluZ0JvbmVDb2xsaWRlckhlbHBlciBleHRlbmRzIFRIUkVFLkdyb3VwIHtcbiAgcHVibGljIHJlYWRvbmx5IGNvbGxpZGVyOiBWUk1TcHJpbmdCb25lQ29sbGlkZXI7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2dlb21ldHJ5OiBDb2xsaWRlclNoYXBlQnVmZmVyR2VvbWV0cnk7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2xpbmU6IFRIUkVFLkxpbmVTZWdtZW50cztcblxuICBwdWJsaWMgY29uc3RydWN0b3IoY29sbGlkZXI6IFZSTVNwcmluZ0JvbmVDb2xsaWRlcikge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5tYXRyaXhBdXRvVXBkYXRlID0gZmFsc2U7XG5cbiAgICB0aGlzLmNvbGxpZGVyID0gY29sbGlkZXI7XG5cbiAgICBpZiAodGhpcy5jb2xsaWRlci5zaGFwZSBpbnN0YW5jZW9mIFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlU3BoZXJlKSB7XG4gICAgICB0aGlzLl9nZW9tZXRyeSA9IG5ldyBDb2xsaWRlclNoYXBlU3BoZXJlQnVmZmVyR2VvbWV0cnkodGhpcy5jb2xsaWRlci5zaGFwZSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNvbGxpZGVyLnNoYXBlIGluc3RhbmNlb2YgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVDYXBzdWxlKSB7XG4gICAgICB0aGlzLl9nZW9tZXRyeSA9IG5ldyBDb2xsaWRlclNoYXBlQ2Fwc3VsZUJ1ZmZlckdlb21ldHJ5KHRoaXMuY29sbGlkZXIuc2hhcGUpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jb2xsaWRlci5zaGFwZSBpbnN0YW5jZW9mIFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlUGxhbmUpIHtcbiAgICAgIHRoaXMuX2dlb21ldHJ5ID0gbmV3IENvbGxpZGVyU2hhcGVQbGFuZUJ1ZmZlckdlb21ldHJ5KHRoaXMuY29sbGlkZXIuc2hhcGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZSTVNwcmluZ0JvbmVDb2xsaWRlckhlbHBlcjogVW5rbm93biBjb2xsaWRlciBzaGFwZSB0eXBlIGRldGVjdGVkJyk7XG4gICAgfVxuXG4gICAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTGluZUJhc2ljTWF0ZXJpYWwoe1xuICAgICAgY29sb3I6IDB4ZmYwMGZmLFxuICAgICAgZGVwdGhUZXN0OiBmYWxzZSxcbiAgICAgIGRlcHRoV3JpdGU6IGZhbHNlLFxuICAgIH0pO1xuXG4gICAgdGhpcy5fbGluZSA9IG5ldyBUSFJFRS5MaW5lU2VnbWVudHModGhpcy5fZ2VvbWV0cnksIG1hdGVyaWFsKTtcbiAgICB0aGlzLmFkZCh0aGlzLl9saW5lKTtcbiAgfVxuXG4gIHB1YmxpYyBkaXNwb3NlKCk6IHZvaWQge1xuICAgIHRoaXMuX2dlb21ldHJ5LmRpc3Bvc2UoKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVNYXRyaXhXb3JsZChmb3JjZTogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuY29sbGlkZXIudXBkYXRlV29ybGRNYXRyaXgodHJ1ZSwgZmFsc2UpO1xuXG4gICAgdGhpcy5tYXRyaXguY29weSh0aGlzLmNvbGxpZGVyLm1hdHJpeFdvcmxkKTtcblxuICAgIGNvbnN0IG1hdHJpeFdvcmxkRWxlbWVudHMgPSB0aGlzLm1hdHJpeC5lbGVtZW50cztcbiAgICB0aGlzLl9nZW9tZXRyeS53b3JsZFNjYWxlID0gX3YzQVxuICAgICAgLnNldChtYXRyaXhXb3JsZEVsZW1lbnRzWzBdLCBtYXRyaXhXb3JsZEVsZW1lbnRzWzFdLCBtYXRyaXhXb3JsZEVsZW1lbnRzWzJdKVxuICAgICAgLmxlbmd0aCgpOyAvLyBjYWxjdWxhdGUgc2NhbGUgb2YgeCBjb21wb25lbnRcblxuICAgIHRoaXMuX2dlb21ldHJ5LnVwZGF0ZSgpO1xuXG4gICAgc3VwZXIudXBkYXRlTWF0cml4V29ybGQoZm9yY2UpO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGUgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlJztcblxuY29uc3QgX3YzQSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfdjNCID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuZXhwb3J0IGNsYXNzIFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlQ2Fwc3VsZSBleHRlbmRzIFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlIHtcbiAgcHVibGljIGdldCB0eXBlKCk6ICdjYXBzdWxlJyB7XG4gICAgcmV0dXJuICdjYXBzdWxlJztcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgb2Zmc2V0IG9mIHRoZSBjYXBzdWxlIGhlYWQgZnJvbSB0aGUgb3JpZ2luIGluIGxvY2FsIHNwYWNlLlxuICAgKi9cbiAgcHVibGljIG9mZnNldDogVEhSRUUuVmVjdG9yMztcblxuICAvKipcbiAgICogVGhlIG9mZnNldCBvZiB0aGUgY2Fwc3VsZSB0YWlsIGZyb20gdGhlIG9yaWdpbiBpbiBsb2NhbCBzcGFjZS5cbiAgICovXG4gIHB1YmxpYyB0YWlsOiBUSFJFRS5WZWN0b3IzO1xuXG4gIC8qKlxuICAgKiBUaGUgcmFkaXVzIG9mIHRoZSBjYXBzdWxlLlxuICAgKi9cbiAgcHVibGljIHJhZGl1czogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBJZiB0cnVlLCB0aGUgY29sbGlkZXIgcHJldmVudHMgc3ByaW5nIGJvbmVzIGZyb20gZ29pbmcgb3V0c2lkZSBvZiB0aGUgY2Fwc3VsZSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIGluc2lkZTogYm9vbGVhbjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IocGFyYW1zPzogeyByYWRpdXM/OiBudW1iZXI7IG9mZnNldD86IFRIUkVFLlZlY3RvcjM7IHRhaWw/OiBUSFJFRS5WZWN0b3IzOyBpbnNpZGU/OiBib29sZWFuIH0pIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5vZmZzZXQgPSBwYXJhbXM/Lm9mZnNldCA/PyBuZXcgVEhSRUUuVmVjdG9yMygwLjAsIDAuMCwgMC4wKTtcbiAgICB0aGlzLnRhaWwgPSBwYXJhbXM/LnRhaWwgPz8gbmV3IFRIUkVFLlZlY3RvcjMoMC4wLCAwLjAsIDAuMCk7XG4gICAgdGhpcy5yYWRpdXMgPSBwYXJhbXM/LnJhZGl1cyA/PyAwLjA7XG4gICAgdGhpcy5pbnNpZGUgPSBwYXJhbXM/Lmluc2lkZSA/PyBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBjYWxjdWxhdGVDb2xsaXNpb24oXG4gICAgY29sbGlkZXJNYXRyaXg6IFRIUkVFLk1hdHJpeDQsXG4gICAgb2JqZWN0UG9zaXRpb246IFRIUkVFLlZlY3RvcjMsXG4gICAgb2JqZWN0UmFkaXVzOiBudW1iZXIsXG4gICAgdGFyZ2V0OiBUSFJFRS5WZWN0b3IzLFxuICApOiBudW1iZXIge1xuICAgIF92M0Euc2V0RnJvbU1hdHJpeFBvc2l0aW9uKGNvbGxpZGVyTWF0cml4KTsgLy8gdHJhbnNmb3JtZWQgaGVhZFxuICAgIF92M0Iuc3ViVmVjdG9ycyh0aGlzLnRhaWwsIHRoaXMub2Zmc2V0KS5hcHBseU1hdHJpeDQoY29sbGlkZXJNYXRyaXgpOyAvLyB0cmFuc2Zvcm1lZCB0YWlsXG4gICAgX3YzQi5zdWIoX3YzQSk7IC8vIGZyb20gaGVhZCB0byB0YWlsXG4gICAgY29uc3QgbGVuZ3RoU3FDYXBzdWxlID0gX3YzQi5sZW5ndGhTcSgpO1xuXG4gICAgdGFyZ2V0LmNvcHkob2JqZWN0UG9zaXRpb24pLnN1YihfdjNBKTsgLy8gZnJvbSBoZWFkIHRvIG9iamVjdFxuICAgIGNvbnN0IGRvdCA9IF92M0IuZG90KHRhcmdldCk7IC8vIGRvdCBwcm9kdWN0IG9mIG9mZnNldFRvVGFpbCBhbmQgb2Zmc2V0VG9PYmplY3RcblxuICAgIGlmIChkb3QgPD0gMC4wKSB7XG4gICAgICAvLyBpZiBvYmplY3QgaXMgbmVhciBmcm9tIHRoZSBoZWFkXG4gICAgICAvLyBkbyBub3RoaW5nLCB1c2UgdGhlIGN1cnJlbnQgdmFsdWUgZGlyZWN0bHlcbiAgICB9IGVsc2UgaWYgKGxlbmd0aFNxQ2Fwc3VsZSA8PSBkb3QpIHtcbiAgICAgIC8vIGlmIG9iamVjdCBpcyBuZWFyIGZyb20gdGhlIHRhaWxcbiAgICAgIHRhcmdldC5zdWIoX3YzQik7IC8vIGZyb20gdGFpbCB0byBvYmplY3RcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaWYgb2JqZWN0IGlzIGJldHdlZW4gdHdvIGVuZHNcbiAgICAgIF92M0IubXVsdGlwbHlTY2FsYXIoZG90IC8gbGVuZ3RoU3FDYXBzdWxlKTsgLy8gZnJvbSBoZWFkIHRvIHRoZSBuZWFyZXN0IHBvaW50IG9mIHRoZSBzaGFmdFxuICAgICAgdGFyZ2V0LnN1YihfdjNCKTsgLy8gZnJvbSB0aGUgc2hhZnQgcG9pbnQgdG8gb2JqZWN0XG4gICAgfVxuXG4gICAgY29uc3QgbGVuZ3RoID0gdGFyZ2V0Lmxlbmd0aCgpO1xuICAgIGNvbnN0IGRpc3RhbmNlID0gdGhpcy5pbnNpZGUgPyB0aGlzLnJhZGl1cyAtIG9iamVjdFJhZGl1cyAtIGxlbmd0aCA6IGxlbmd0aCAtIG9iamVjdFJhZGl1cyAtIHRoaXMucmFkaXVzO1xuXG4gICAgaWYgKGRpc3RhbmNlIDwgMCkge1xuICAgICAgdGFyZ2V0Lm11bHRpcGx5U2NhbGFyKDEgLyBsZW5ndGgpOyAvLyBjb252ZXJ0IHRoZSBkZWx0YSB0byB0aGUgZGlyZWN0aW9uXG4gICAgICBpZiAodGhpcy5pbnNpZGUpIHtcbiAgICAgICAgdGFyZ2V0Lm5lZ2F0ZSgpOyAvLyBpZiBpbnNpZGUsIHJldmVyc2UgdGhlIGRpcmVjdGlvblxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkaXN0YW5jZTtcbiAgfVxufVxuIiwgImltcG9ydCB0eXBlICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBzaGFwZSBvZiBhIGNvbGxpZGVyLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGUge1xuICAvKipcbiAgICogVGhlIHR5cGUgb2YgdGhlIHNoYXBlLlxuICAgKi9cbiAgcHVibGljIGFic3RyYWN0IGdldCB0eXBlKCk6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIG9mZnNldCB0byB0aGUgc2hhcGUuXG4gICAqL1xuICBwdWJsaWMgb2Zmc2V0PzogVEhSRUUuVmVjdG9yMztcblxuICAvKipcbiAgICogQ2FsY3VsYXRlIGEgZGlzdGFuY2UgYW5kIGEgZGlyZWN0aW9uIGZyb20gdGhlIGNvbGxpZGVyIHRvIGEgdGFyZ2V0IG9iamVjdC5cbiAgICogSXQncyBoaXQgaWYgdGhlIGRpc3RhbmNlIGlzIG5lZ2F0aXZlLlxuICAgKiBUaGUgZGlyZWN0aW9uIHdpbGwgYmUgY29udGFpbmVkIGluIHRoZSBnaXZlbiB0YXJnZXQgdmVjdG9yLlxuICAgKlxuICAgKiBAcGFyYW0gY29sbGlkZXJNYXRyaXggQSBtYXRyaXggcmVwcmVzZW50cyB0aGUgdHJhbnNmb3JtIG9mIHRoZSBjb2xsaWRlclxuICAgKiBAcGFyYW0gb2JqZWN0UG9zaXRpb24gQSB2ZWN0b3IgcmVwcmVzZW50cyB0aGUgcG9zaXRpb24gb2YgdGhlIHRhcmdldCBvYmplY3RcbiAgICogQHBhcmFtIG9iamVjdFJhZGl1cyBUaGUgcmFkaXVzIG9mIHRoZSBvYmplY3RcbiAgICogQHBhcmFtIHRhcmdldCBUaGUgcmVzdWx0IGRpcmVjdGlvbiB3aWxsIGJlIGNvbnRhaW5lZCBpbiB0aGlzIHZlY3RvclxuICAgKi9cbiAgcHVibGljIGFic3RyYWN0IGNhbGN1bGF0ZUNvbGxpc2lvbihcbiAgICBjb2xsaWRlck1hdHJpeDogVEhSRUUuTWF0cml4NCxcbiAgICBvYmplY3RQb3NpdGlvbjogVEhSRUUuVmVjdG9yMyxcbiAgICBvYmplY3RSYWRpdXM6IG51bWJlcixcbiAgICB0YXJnZXQ6IFRIUkVFLlZlY3RvcjMsXG4gICk6IG51bWJlcjtcbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZSB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGUnO1xuXG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF9tYXQzQSA9IG5ldyBUSFJFRS5NYXRyaXgzKCk7XG5cbmV4cG9ydCBjbGFzcyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZVBsYW5lIGV4dGVuZHMgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGUge1xuICBwdWJsaWMgZ2V0IHR5cGUoKTogJ3BsYW5lJyB7XG4gICAgcmV0dXJuICdwbGFuZSc7XG4gIH1cblxuICAvKipcbiAgICogVGhlIG9mZnNldCBvZiB0aGUgcGxhbmUgZnJvbSB0aGUgb3JpZ2luIGluIGxvY2FsIHNwYWNlLlxuICAgKi9cbiAgcHVibGljIG9mZnNldDogVEhSRUUuVmVjdG9yMztcblxuICAvKipcbiAgICogVGhlIG5vcm1hbCBvZiB0aGUgcGxhbmUgaW4gbG9jYWwgc3BhY2UuIE11c3QgYmUgbm9ybWFsaXplZC5cbiAgICovXG4gIHB1YmxpYyBub3JtYWw6IFRIUkVFLlZlY3RvcjM7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBhcmFtcz86IHsgb2Zmc2V0PzogVEhSRUUuVmVjdG9yMzsgbm9ybWFsPzogVEhSRUUuVmVjdG9yMyB9KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMub2Zmc2V0ID0gcGFyYW1zPy5vZmZzZXQgPz8gbmV3IFRIUkVFLlZlY3RvcjMoMC4wLCAwLjAsIDAuMCk7XG4gICAgdGhpcy5ub3JtYWwgPSBwYXJhbXM/Lm5vcm1hbCA/PyBuZXcgVEhSRUUuVmVjdG9yMygwLjAsIDAuMCwgMS4wKTtcbiAgfVxuXG4gIHB1YmxpYyBjYWxjdWxhdGVDb2xsaXNpb24oXG4gICAgY29sbGlkZXJNYXRyaXg6IFRIUkVFLk1hdHJpeDQsXG4gICAgb2JqZWN0UG9zaXRpb246IFRIUkVFLlZlY3RvcjMsXG4gICAgb2JqZWN0UmFkaXVzOiBudW1iZXIsXG4gICAgdGFyZ2V0OiBUSFJFRS5WZWN0b3IzLFxuICApOiBudW1iZXIge1xuICAgIHRhcmdldC5zZXRGcm9tTWF0cml4UG9zaXRpb24oY29sbGlkZXJNYXRyaXgpOyAvLyB0cmFuc2Zvcm1lZCBvZmZzZXRcbiAgICB0YXJnZXQubmVnYXRlKCkuYWRkKG9iamVjdFBvc2l0aW9uKTsgLy8gYSB2ZWN0b3IgZnJvbSBjb2xsaWRlciBjZW50ZXIgdG8gb2JqZWN0IHBvc2l0aW9uXG5cbiAgICBfbWF0M0EuZ2V0Tm9ybWFsTWF0cml4KGNvbGxpZGVyTWF0cml4KTsgLy8gY29udmVydCB0aGUgY29sbGlkZXIgbWF0cml4IHRvIHRoZSBub3JtYWwgbWF0cml4XG4gICAgX3YzQS5jb3B5KHRoaXMubm9ybWFsKS5hcHBseU5vcm1hbE1hdHJpeChfbWF0M0EpLm5vcm1hbGl6ZSgpOyAvLyB0cmFuc2Zvcm1lZCBub3JtYWxcbiAgICBjb25zdCBkaXN0YW5jZSA9IHRhcmdldC5kb3QoX3YzQSkgLSBvYmplY3RSYWRpdXM7XG5cbiAgICB0YXJnZXQuY29weShfdjNBKTsgLy8gY29udmVydCB0aGUgZGVsdGEgdG8gdGhlIGRpcmVjdGlvblxuXG4gICAgcmV0dXJuIGRpc3RhbmNlO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGUgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlJztcblxuY29uc3QgX3YzQSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbmV4cG9ydCBjbGFzcyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZVNwaGVyZSBleHRlbmRzIFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlIHtcbiAgcHVibGljIGdldCB0eXBlKCk6ICdzcGhlcmUnIHtcbiAgICByZXR1cm4gJ3NwaGVyZSc7XG4gIH1cblxuICAvKipcbiAgICogVGhlIG9mZnNldCBvZiB0aGUgc3BoZXJlIGZyb20gdGhlIG9yaWdpbiBpbiBsb2NhbCBzcGFjZS5cbiAgICovXG4gIHB1YmxpYyBvZmZzZXQ6IFRIUkVFLlZlY3RvcjM7XG5cbiAgLyoqXG4gICAqIFRoZSByYWRpdXMuXG4gICAqL1xuICBwdWJsaWMgcmFkaXVzOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIElmIHRydWUsIHRoZSBjb2xsaWRlciBwcmV2ZW50cyBzcHJpbmcgYm9uZXMgZnJvbSBnb2luZyBvdXRzaWRlIG9mIHRoZSBzcGhlcmUgaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBpbnNpZGU6IGJvb2xlYW47XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBhcmFtcz86IHsgcmFkaXVzPzogbnVtYmVyOyBvZmZzZXQ/OiBUSFJFRS5WZWN0b3IzOyBpbnNpZGU/OiBib29sZWFuIH0pIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5vZmZzZXQgPSBwYXJhbXM/Lm9mZnNldCA/PyBuZXcgVEhSRUUuVmVjdG9yMygwLjAsIDAuMCwgMC4wKTtcbiAgICB0aGlzLnJhZGl1cyA9IHBhcmFtcz8ucmFkaXVzID8/IDAuMDtcbiAgICB0aGlzLmluc2lkZSA9IHBhcmFtcz8uaW5zaWRlID8/IGZhbHNlO1xuICB9XG5cbiAgcHVibGljIGNhbGN1bGF0ZUNvbGxpc2lvbihcbiAgICBjb2xsaWRlck1hdHJpeDogVEhSRUUuTWF0cml4NCxcbiAgICBvYmplY3RQb3NpdGlvbjogVEhSRUUuVmVjdG9yMyxcbiAgICBvYmplY3RSYWRpdXM6IG51bWJlcixcbiAgICB0YXJnZXQ6IFRIUkVFLlZlY3RvcjMsXG4gICk6IG51bWJlciB7XG4gICAgdGFyZ2V0LnN1YlZlY3RvcnMob2JqZWN0UG9zaXRpb24sIF92M0Euc2V0RnJvbU1hdHJpeFBvc2l0aW9uKGNvbGxpZGVyTWF0cml4KSk7XG5cbiAgICBjb25zdCBsZW5ndGggPSB0YXJnZXQubGVuZ3RoKCk7XG4gICAgY29uc3QgZGlzdGFuY2UgPSB0aGlzLmluc2lkZSA/IHRoaXMucmFkaXVzIC0gb2JqZWN0UmFkaXVzIC0gbGVuZ3RoIDogbGVuZ3RoIC0gb2JqZWN0UmFkaXVzIC0gdGhpcy5yYWRpdXM7XG5cbiAgICBpZiAoZGlzdGFuY2UgPCAwKSB7XG4gICAgICB0YXJnZXQubXVsdGlwbHlTY2FsYXIoMSAvIGxlbmd0aCk7IC8vIGNvbnZlcnQgdGhlIGRlbHRhIHRvIHRoZSBkaXJlY3Rpb25cbiAgICAgIGlmICh0aGlzLmluc2lkZSkge1xuICAgICAgICB0YXJnZXQubmVnYXRlKCk7IC8vIGlmIGluc2lkZSwgcmV2ZXJzZSB0aGUgZGlyZWN0aW9uXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpc3RhbmNlO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVDYXBzdWxlIH0gZnJvbSAnLi4vLi4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVDYXBzdWxlJztcbmltcG9ydCB7IENvbGxpZGVyU2hhcGVCdWZmZXJHZW9tZXRyeSB9IGZyb20gJy4vQ29sbGlkZXJTaGFwZUJ1ZmZlckdlb21ldHJ5JztcblxuY29uc3QgX3YzQSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbmV4cG9ydCBjbGFzcyBDb2xsaWRlclNoYXBlQ2Fwc3VsZUJ1ZmZlckdlb21ldHJ5IGV4dGVuZHMgVEhSRUUuQnVmZmVyR2VvbWV0cnkgaW1wbGVtZW50cyBDb2xsaWRlclNoYXBlQnVmZmVyR2VvbWV0cnkge1xuICBwdWJsaWMgd29ybGRTY2FsZSA9IDEuMDtcblxuICBwcml2YXRlIHJlYWRvbmx5IF9hdHRyUG9zOiBUSFJFRS5CdWZmZXJBdHRyaWJ1dGU7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2F0dHJJbmRleDogVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xuICBwcml2YXRlIHJlYWRvbmx5IF9zaGFwZTogVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVDYXBzdWxlO1xuICBwcml2YXRlIF9jdXJyZW50UmFkaXVzID0gMDtcbiAgcHJpdmF0ZSByZWFkb25seSBfY3VycmVudE9mZnNldCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2N1cnJlbnRUYWlsID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuICBwdWJsaWMgY29uc3RydWN0b3Ioc2hhcGU6IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlQ2Fwc3VsZSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLl9zaGFwZSA9IHNoYXBlO1xuXG4gICAgdGhpcy5fYXR0clBvcyA9IG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUobmV3IEZsb2F0MzJBcnJheSgzOTYpLCAzKTtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgncG9zaXRpb24nLCB0aGlzLl9hdHRyUG9zKTtcblxuICAgIHRoaXMuX2F0dHJJbmRleCA9IG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUobmV3IFVpbnQxNkFycmF5KDI2NCksIDEpO1xuICAgIHRoaXMuc2V0SW5kZXgodGhpcy5fYXR0ckluZGV4KTtcblxuICAgIHRoaXMuX2J1aWxkSW5kZXgoKTtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBsZXQgc2hvdWxkVXBkYXRlR2VvbWV0cnkgPSBmYWxzZTtcblxuICAgIGNvbnN0IHJhZGl1cyA9IHRoaXMuX3NoYXBlLnJhZGl1cyAvIHRoaXMud29ybGRTY2FsZTtcbiAgICBpZiAodGhpcy5fY3VycmVudFJhZGl1cyAhPT0gcmFkaXVzKSB7XG4gICAgICB0aGlzLl9jdXJyZW50UmFkaXVzID0gcmFkaXVzO1xuICAgICAgc2hvdWxkVXBkYXRlR2VvbWV0cnkgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fY3VycmVudE9mZnNldC5lcXVhbHModGhpcy5fc2hhcGUub2Zmc2V0KSkge1xuICAgICAgdGhpcy5fY3VycmVudE9mZnNldC5jb3B5KHRoaXMuX3NoYXBlLm9mZnNldCk7XG4gICAgICBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IHRydWU7XG4gICAgfVxuXG4gICAgY29uc3QgdGFpbCA9IF92M0EuY29weSh0aGlzLl9zaGFwZS50YWlsKS5kaXZpZGVTY2FsYXIodGhpcy53b3JsZFNjYWxlKTtcbiAgICBpZiAodGhpcy5fY3VycmVudFRhaWwuZGlzdGFuY2VUb1NxdWFyZWQodGFpbCkgPiAxZS0xMCkge1xuICAgICAgdGhpcy5fY3VycmVudFRhaWwuY29weSh0YWlsKTtcbiAgICAgIHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoc2hvdWxkVXBkYXRlR2VvbWV0cnkpIHtcbiAgICAgIHRoaXMuX2J1aWxkUG9zaXRpb24oKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9idWlsZFBvc2l0aW9uKCk6IHZvaWQge1xuICAgIF92M0EuY29weSh0aGlzLl9jdXJyZW50VGFpbCkuc3ViKHRoaXMuX2N1cnJlbnRPZmZzZXQpO1xuICAgIGNvbnN0IGwgPSBfdjNBLmxlbmd0aCgpIC8gdGhpcy5fY3VycmVudFJhZGl1cztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IDE2OyBpKyspIHtcbiAgICAgIGNvbnN0IHQgPSAoaSAvIDE2LjApICogTWF0aC5QSTtcblxuICAgICAgdGhpcy5fYXR0clBvcy5zZXRYWVooaSwgLU1hdGguc2luKHQpLCAtTWF0aC5jb3ModCksIDAuMCk7XG4gICAgICB0aGlzLl9hdHRyUG9zLnNldFhZWigxNyArIGksIGwgKyBNYXRoLnNpbih0KSwgTWF0aC5jb3ModCksIDAuMCk7XG4gICAgICB0aGlzLl9hdHRyUG9zLnNldFhZWigzNCArIGksIC1NYXRoLnNpbih0KSwgMC4wLCAtTWF0aC5jb3ModCkpO1xuICAgICAgdGhpcy5fYXR0clBvcy5zZXRYWVooNTEgKyBpLCBsICsgTWF0aC5zaW4odCksIDAuMCwgTWF0aC5jb3ModCkpO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzI7IGkrKykge1xuICAgICAgY29uc3QgdCA9IChpIC8gMTYuMCkgKiBNYXRoLlBJO1xuICAgICAgdGhpcy5fYXR0clBvcy5zZXRYWVooNjggKyBpLCAwLjAsIE1hdGguc2luKHQpLCBNYXRoLmNvcyh0KSk7XG4gICAgICB0aGlzLl9hdHRyUG9zLnNldFhZWigxMDAgKyBpLCBsLCBNYXRoLnNpbih0KSwgTWF0aC5jb3ModCkpO1xuICAgIH1cblxuICAgIGNvbnN0IHRoZXRhID0gTWF0aC5hdGFuMihfdjNBLnksIE1hdGguc3FydChfdjNBLnggKiBfdjNBLnggKyBfdjNBLnogKiBfdjNBLnopKTtcbiAgICBjb25zdCBwaGkgPSAtTWF0aC5hdGFuMihfdjNBLnosIF92M0EueCk7XG5cbiAgICB0aGlzLnJvdGF0ZVoodGhldGEpO1xuICAgIHRoaXMucm90YXRlWShwaGkpO1xuICAgIHRoaXMuc2NhbGUodGhpcy5fY3VycmVudFJhZGl1cywgdGhpcy5fY3VycmVudFJhZGl1cywgdGhpcy5fY3VycmVudFJhZGl1cyk7XG4gICAgdGhpcy50cmFuc2xhdGUodGhpcy5fY3VycmVudE9mZnNldC54LCB0aGlzLl9jdXJyZW50T2Zmc2V0LnksIHRoaXMuX2N1cnJlbnRPZmZzZXQueik7XG5cbiAgICB0aGlzLl9hdHRyUG9zLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX2J1aWxkSW5kZXgoKTogdm9pZCB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzNDsgaSsrKSB7XG4gICAgICBjb25zdCBpMSA9IChpICsgMSkgJSAzNDtcblxuICAgICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKGkgKiAyLCBpLCBpMSk7XG4gICAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoNjggKyBpICogMiwgMzQgKyBpLCAzNCArIGkxKTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDMyOyBpKyspIHtcbiAgICAgIGNvbnN0IGkxID0gKGkgKyAxKSAlIDMyO1xuXG4gICAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoMTM2ICsgaSAqIDIsIDY4ICsgaSwgNjggKyBpMSk7XG4gICAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoMjAwICsgaSAqIDIsIDEwMCArIGksIDEwMCArIGkxKTtcbiAgICB9XG5cbiAgICB0aGlzLl9hdHRySW5kZXgubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVQbGFuZSB9IGZyb20gJy4uLy4uL1ZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlUGxhbmUnO1xuaW1wb3J0IHsgQ29sbGlkZXJTaGFwZUJ1ZmZlckdlb21ldHJ5IH0gZnJvbSAnLi9Db2xsaWRlclNoYXBlQnVmZmVyR2VvbWV0cnknO1xuXG5leHBvcnQgY2xhc3MgQ29sbGlkZXJTaGFwZVBsYW5lQnVmZmVyR2VvbWV0cnkgZXh0ZW5kcyBUSFJFRS5CdWZmZXJHZW9tZXRyeSBpbXBsZW1lbnRzIENvbGxpZGVyU2hhcGVCdWZmZXJHZW9tZXRyeSB7XG4gIHB1YmxpYyB3b3JsZFNjYWxlID0gMS4wO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgX2F0dHJQb3M6IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZTtcbiAgcHJpdmF0ZSByZWFkb25seSBfYXR0ckluZGV4OiBUSFJFRS5CdWZmZXJBdHRyaWJ1dGU7XG4gIHByaXZhdGUgcmVhZG9ubHkgX3NoYXBlOiBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZVBsYW5lO1xuICBwcml2YXRlIHJlYWRvbmx5IF9jdXJyZW50T2Zmc2V0ID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbiAgcHJpdmF0ZSByZWFkb25seSBfY3VycmVudE5vcm1hbCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHNoYXBlOiBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZVBsYW5lKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuX3NoYXBlID0gc2hhcGU7XG5cbiAgICB0aGlzLl9hdHRyUG9zID0gbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShuZXcgRmxvYXQzMkFycmF5KDYgKiAzKSwgMyk7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJywgdGhpcy5fYXR0clBvcyk7XG5cbiAgICB0aGlzLl9hdHRySW5kZXggPSBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKG5ldyBVaW50MTZBcnJheSgxMCksIDEpO1xuICAgIHRoaXMuc2V0SW5kZXgodGhpcy5fYXR0ckluZGV4KTtcblxuICAgIHRoaXMuX2J1aWxkSW5kZXgoKTtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBsZXQgc2hvdWxkVXBkYXRlR2VvbWV0cnkgPSBmYWxzZTtcblxuICAgIGlmICghdGhpcy5fY3VycmVudE9mZnNldC5lcXVhbHModGhpcy5fc2hhcGUub2Zmc2V0KSkge1xuICAgICAgdGhpcy5fY3VycmVudE9mZnNldC5jb3B5KHRoaXMuX3NoYXBlLm9mZnNldCk7XG4gICAgICBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9jdXJyZW50Tm9ybWFsLmVxdWFscyh0aGlzLl9zaGFwZS5ub3JtYWwpKSB7XG4gICAgICB0aGlzLl9jdXJyZW50Tm9ybWFsLmNvcHkodGhpcy5fc2hhcGUubm9ybWFsKTtcbiAgICAgIHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoc2hvdWxkVXBkYXRlR2VvbWV0cnkpIHtcbiAgICAgIHRoaXMuX2J1aWxkUG9zaXRpb24oKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9idWlsZFBvc2l0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKDAsIC0wLjUsIC0wLjUsIDApO1xuICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKDEsIDAuNSwgLTAuNSwgMCk7XG4gICAgdGhpcy5fYXR0clBvcy5zZXRYWVooMiwgMC41LCAwLjUsIDApO1xuICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKDMsIC0wLjUsIDAuNSwgMCk7XG4gICAgdGhpcy5fYXR0clBvcy5zZXRYWVooNCwgMCwgMCwgMCk7XG4gICAgdGhpcy5fYXR0clBvcy5zZXRYWVooNSwgMCwgMCwgMC4yNSk7XG5cbiAgICB0aGlzLnRyYW5zbGF0ZSh0aGlzLl9jdXJyZW50T2Zmc2V0LngsIHRoaXMuX2N1cnJlbnRPZmZzZXQueSwgdGhpcy5fY3VycmVudE9mZnNldC56KTtcbiAgICB0aGlzLmxvb2tBdCh0aGlzLl9jdXJyZW50Tm9ybWFsKTtcblxuICAgIHRoaXMuX2F0dHJQb3MubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRJbmRleCgpOiB2b2lkIHtcbiAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoMCwgMCwgMSk7XG4gICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKDIsIDEsIDIpO1xuICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWSg0LCAyLCAzKTtcbiAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoNiwgMywgMCk7XG4gICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKDgsIDQsIDUpO1xuXG4gICAgdGhpcy5fYXR0ckluZGV4Lm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlU3BoZXJlIH0gZnJvbSAnLi4vLi4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVTcGhlcmUnO1xuaW1wb3J0IHsgQ29sbGlkZXJTaGFwZUJ1ZmZlckdlb21ldHJ5IH0gZnJvbSAnLi9Db2xsaWRlclNoYXBlQnVmZmVyR2VvbWV0cnknO1xuXG5leHBvcnQgY2xhc3MgQ29sbGlkZXJTaGFwZVNwaGVyZUJ1ZmZlckdlb21ldHJ5IGV4dGVuZHMgVEhSRUUuQnVmZmVyR2VvbWV0cnkgaW1wbGVtZW50cyBDb2xsaWRlclNoYXBlQnVmZmVyR2VvbWV0cnkge1xuICBwdWJsaWMgd29ybGRTY2FsZSA9IDEuMDtcblxuICBwcml2YXRlIHJlYWRvbmx5IF9hdHRyUG9zOiBUSFJFRS5CdWZmZXJBdHRyaWJ1dGU7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2F0dHJJbmRleDogVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xuICBwcml2YXRlIHJlYWRvbmx5IF9zaGFwZTogVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVTcGhlcmU7XG4gIHByaXZhdGUgX2N1cnJlbnRSYWRpdXMgPSAwO1xuICBwcml2YXRlIHJlYWRvbmx5IF9jdXJyZW50T2Zmc2V0ID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuICBwdWJsaWMgY29uc3RydWN0b3Ioc2hhcGU6IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlU3BoZXJlKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuX3NoYXBlID0gc2hhcGU7XG5cbiAgICB0aGlzLl9hdHRyUG9zID0gbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShuZXcgRmxvYXQzMkFycmF5KDMyICogMyAqIDMpLCAzKTtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgncG9zaXRpb24nLCB0aGlzLl9hdHRyUG9zKTtcblxuICAgIHRoaXMuX2F0dHJJbmRleCA9IG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUobmV3IFVpbnQxNkFycmF5KDY0ICogMyksIDEpO1xuICAgIHRoaXMuc2V0SW5kZXgodGhpcy5fYXR0ckluZGV4KTtcblxuICAgIHRoaXMuX2J1aWxkSW5kZXgoKTtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBsZXQgc2hvdWxkVXBkYXRlR2VvbWV0cnkgPSBmYWxzZTtcblxuICAgIGNvbnN0IHJhZGl1cyA9IHRoaXMuX3NoYXBlLnJhZGl1cyAvIHRoaXMud29ybGRTY2FsZTtcbiAgICBpZiAodGhpcy5fY3VycmVudFJhZGl1cyAhPT0gcmFkaXVzKSB7XG4gICAgICB0aGlzLl9jdXJyZW50UmFkaXVzID0gcmFkaXVzO1xuICAgICAgc2hvdWxkVXBkYXRlR2VvbWV0cnkgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fY3VycmVudE9mZnNldC5lcXVhbHModGhpcy5fc2hhcGUub2Zmc2V0KSkge1xuICAgICAgdGhpcy5fY3VycmVudE9mZnNldC5jb3B5KHRoaXMuX3NoYXBlLm9mZnNldCk7XG4gICAgICBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHNob3VsZFVwZGF0ZUdlb21ldHJ5KSB7XG4gICAgICB0aGlzLl9idWlsZFBvc2l0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRQb3NpdGlvbigpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDMyOyBpKyspIHtcbiAgICAgIGNvbnN0IHQgPSAoaSAvIDE2LjApICogTWF0aC5QSTtcblxuICAgICAgdGhpcy5fYXR0clBvcy5zZXRYWVooaSwgTWF0aC5jb3ModCksIE1hdGguc2luKHQpLCAwLjApO1xuICAgICAgdGhpcy5fYXR0clBvcy5zZXRYWVooMzIgKyBpLCAwLjAsIE1hdGguY29zKHQpLCBNYXRoLnNpbih0KSk7XG4gICAgICB0aGlzLl9hdHRyUG9zLnNldFhZWig2NCArIGksIE1hdGguc2luKHQpLCAwLjAsIE1hdGguY29zKHQpKTtcbiAgICB9XG5cbiAgICB0aGlzLnNjYWxlKHRoaXMuX2N1cnJlbnRSYWRpdXMsIHRoaXMuX2N1cnJlbnRSYWRpdXMsIHRoaXMuX2N1cnJlbnRSYWRpdXMpO1xuICAgIHRoaXMudHJhbnNsYXRlKHRoaXMuX2N1cnJlbnRPZmZzZXQueCwgdGhpcy5fY3VycmVudE9mZnNldC55LCB0aGlzLl9jdXJyZW50T2Zmc2V0LnopO1xuXG4gICAgdGhpcy5fYXR0clBvcy5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIF9idWlsZEluZGV4KCk6IHZvaWQge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzI7IGkrKykge1xuICAgICAgY29uc3QgaTEgPSAoaSArIDEpICUgMzI7XG5cbiAgICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWShpICogMiwgaSwgaTEpO1xuICAgICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKDY0ICsgaSAqIDIsIDMyICsgaSwgMzIgKyBpMSk7XG4gICAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoMTI4ICsgaSAqIDIsIDY0ICsgaSwgNjQgKyBpMSk7XG4gICAgfVxuXG4gICAgdGhpcy5fYXR0ckluZGV4Lm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVKb2ludCB9IGZyb20gJy4uL1ZSTVNwcmluZ0JvbmVKb2ludCc7XG5pbXBvcnQgeyBTcHJpbmdCb25lQnVmZmVyR2VvbWV0cnkgfSBmcm9tICcuL3V0aWxzL1NwcmluZ0JvbmVCdWZmZXJHZW9tZXRyeSc7XG5cbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5leHBvcnQgY2xhc3MgVlJNU3ByaW5nQm9uZUpvaW50SGVscGVyIGV4dGVuZHMgVEhSRUUuR3JvdXAge1xuICBwdWJsaWMgcmVhZG9ubHkgc3ByaW5nQm9uZTogVlJNU3ByaW5nQm9uZUpvaW50O1xuICBwcml2YXRlIHJlYWRvbmx5IF9nZW9tZXRyeTogU3ByaW5nQm9uZUJ1ZmZlckdlb21ldHJ5O1xuICBwcml2YXRlIHJlYWRvbmx5IF9saW5lOiBUSFJFRS5MaW5lU2VnbWVudHM7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHNwcmluZ0JvbmU6IFZSTVNwcmluZ0JvbmVKb2ludCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5tYXRyaXhBdXRvVXBkYXRlID0gZmFsc2U7XG5cbiAgICB0aGlzLnNwcmluZ0JvbmUgPSBzcHJpbmdCb25lO1xuXG4gICAgdGhpcy5fZ2VvbWV0cnkgPSBuZXcgU3ByaW5nQm9uZUJ1ZmZlckdlb21ldHJ5KHRoaXMuc3ByaW5nQm9uZSk7XG5cbiAgICBjb25zdCBtYXRlcmlhbCA9IG5ldyBUSFJFRS5MaW5lQmFzaWNNYXRlcmlhbCh7XG4gICAgICBjb2xvcjogMHhmZmZmMDAsXG4gICAgICBkZXB0aFRlc3Q6IGZhbHNlLFxuICAgICAgZGVwdGhXcml0ZTogZmFsc2UsXG4gICAgfSk7XG5cbiAgICB0aGlzLl9saW5lID0gbmV3IFRIUkVFLkxpbmVTZWdtZW50cyh0aGlzLl9nZW9tZXRyeSwgbWF0ZXJpYWwpO1xuICAgIHRoaXMuYWRkKHRoaXMuX2xpbmUpO1xuICB9XG5cbiAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5fZ2VvbWV0cnkuZGlzcG9zZSgpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZU1hdHJpeFdvcmxkKGZvcmNlOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5zcHJpbmdCb25lLmJvbmUudXBkYXRlV29ybGRNYXRyaXgodHJ1ZSwgZmFsc2UpO1xuXG4gICAgdGhpcy5tYXRyaXguY29weSh0aGlzLnNwcmluZ0JvbmUuYm9uZS5tYXRyaXhXb3JsZCk7XG5cbiAgICBjb25zdCBtYXRyaXhXb3JsZEVsZW1lbnRzID0gdGhpcy5tYXRyaXguZWxlbWVudHM7XG4gICAgdGhpcy5fZ2VvbWV0cnkud29ybGRTY2FsZSA9IF92M0FcbiAgICAgIC5zZXQobWF0cml4V29ybGRFbGVtZW50c1swXSwgbWF0cml4V29ybGRFbGVtZW50c1sxXSwgbWF0cml4V29ybGRFbGVtZW50c1syXSlcbiAgICAgIC5sZW5ndGgoKTsgLy8gY2FsY3VsYXRlIHNjYWxlIG9mIHggY29tcG9uZW50XG5cbiAgICB0aGlzLl9nZW9tZXRyeS51cGRhdGUoKTtcblxuICAgIHN1cGVyLnVwZGF0ZU1hdHJpeFdvcmxkKGZvcmNlKTtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVKb2ludCB9IGZyb20gJy4uLy4uL1ZSTVNwcmluZ0JvbmVKb2ludCc7XG5cbmV4cG9ydCBjbGFzcyBTcHJpbmdCb25lQnVmZmVyR2VvbWV0cnkgZXh0ZW5kcyBUSFJFRS5CdWZmZXJHZW9tZXRyeSB7XG4gIHB1YmxpYyB3b3JsZFNjYWxlID0gMS4wO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgX2F0dHJQb3M6IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZTtcbiAgcHJpdmF0ZSByZWFkb25seSBfYXR0ckluZGV4OiBUSFJFRS5CdWZmZXJBdHRyaWJ1dGU7XG4gIHByaXZhdGUgcmVhZG9ubHkgX3NwcmluZ0JvbmU6IFZSTVNwcmluZ0JvbmVKb2ludDtcbiAgcHJpdmF0ZSBfY3VycmVudFJhZGl1cyA9IDA7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2N1cnJlbnRUYWlsID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuICBwdWJsaWMgY29uc3RydWN0b3Ioc3ByaW5nQm9uZTogVlJNU3ByaW5nQm9uZUpvaW50KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuX3NwcmluZ0JvbmUgPSBzcHJpbmdCb25lO1xuXG4gICAgdGhpcy5fYXR0clBvcyA9IG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUobmV3IEZsb2F0MzJBcnJheSgyOTQpLCAzKTtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgncG9zaXRpb24nLCB0aGlzLl9hdHRyUG9zKTtcblxuICAgIHRoaXMuX2F0dHJJbmRleCA9IG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUobmV3IFVpbnQxNkFycmF5KDE5NCksIDEpO1xuICAgIHRoaXMuc2V0SW5kZXgodGhpcy5fYXR0ckluZGV4KTtcblxuICAgIHRoaXMuX2J1aWxkSW5kZXgoKTtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBsZXQgc2hvdWxkVXBkYXRlR2VvbWV0cnkgPSBmYWxzZTtcblxuICAgIGNvbnN0IHJhZGl1cyA9IHRoaXMuX3NwcmluZ0JvbmUuc2V0dGluZ3MuaGl0UmFkaXVzIC8gdGhpcy53b3JsZFNjYWxlO1xuICAgIGlmICh0aGlzLl9jdXJyZW50UmFkaXVzICE9PSByYWRpdXMpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRSYWRpdXMgPSByYWRpdXM7XG4gICAgICBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9jdXJyZW50VGFpbC5lcXVhbHModGhpcy5fc3ByaW5nQm9uZS5pbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uKSkge1xuICAgICAgdGhpcy5fY3VycmVudFRhaWwuY29weSh0aGlzLl9zcHJpbmdCb25lLmluaXRpYWxMb2NhbENoaWxkUG9zaXRpb24pO1xuICAgICAgc2hvdWxkVXBkYXRlR2VvbWV0cnkgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmIChzaG91bGRVcGRhdGVHZW9tZXRyeSkge1xuICAgICAgdGhpcy5fYnVpbGRQb3NpdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2J1aWxkUG9zaXRpb24oKTogdm9pZCB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzMjsgaSsrKSB7XG4gICAgICBjb25zdCB0ID0gKGkgLyAxNi4wKSAqIE1hdGguUEk7XG5cbiAgICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKGksIE1hdGguY29zKHQpLCBNYXRoLnNpbih0KSwgMC4wKTtcbiAgICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKDMyICsgaSwgMC4wLCBNYXRoLmNvcyh0KSwgTWF0aC5zaW4odCkpO1xuICAgICAgdGhpcy5fYXR0clBvcy5zZXRYWVooNjQgKyBpLCBNYXRoLnNpbih0KSwgMC4wLCBNYXRoLmNvcyh0KSk7XG4gICAgfVxuXG4gICAgdGhpcy5zY2FsZSh0aGlzLl9jdXJyZW50UmFkaXVzLCB0aGlzLl9jdXJyZW50UmFkaXVzLCB0aGlzLl9jdXJyZW50UmFkaXVzKTtcbiAgICB0aGlzLnRyYW5zbGF0ZSh0aGlzLl9jdXJyZW50VGFpbC54LCB0aGlzLl9jdXJyZW50VGFpbC55LCB0aGlzLl9jdXJyZW50VGFpbC56KTtcblxuICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKDk2LCAwLCAwLCAwKTtcbiAgICB0aGlzLl9hdHRyUG9zLnNldFhZWig5NywgdGhpcy5fY3VycmVudFRhaWwueCwgdGhpcy5fY3VycmVudFRhaWwueSwgdGhpcy5fY3VycmVudFRhaWwueik7XG5cbiAgICB0aGlzLl9hdHRyUG9zLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX2J1aWxkSW5kZXgoKTogdm9pZCB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzMjsgaSsrKSB7XG4gICAgICBjb25zdCBpMSA9IChpICsgMSkgJSAzMjtcblxuICAgICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKGkgKiAyLCBpLCBpMSk7XG4gICAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoNjQgKyBpICogMiwgMzIgKyBpLCAzMiArIGkxKTtcbiAgICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWSgxMjggKyBpICogMiwgNjQgKyBpLCA2NCArIGkxKTtcbiAgICB9XG4gICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKDE5MiwgOTYsIDk3KTtcblxuICAgIHRoaXMuX2F0dHJJbmRleC5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgdHlwZSB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZSc7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGNvbGxpZGVyIG9mIGEgc3ByaW5nIGJvbmUuXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1TcHJpbmdCb25lQ29sbGlkZXIgZXh0ZW5kcyBUSFJFRS5PYmplY3QzRCB7XG4gIC8qKlxuICAgKiBUaGUgc2hhcGUgb2YgdGhlIGNvbGxpZGVyLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IHNoYXBlOiBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZTtcblxuICAvKipcbiAgICogV29ybGQgc3BhY2UgbWF0cml4IGZvciB0aGUgY29sbGlkZXIgc2hhcGUgdXNlZCBpbiBjb2xsaXNpb24gY2FsY3VsYXRpb25zLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGNvbGxpZGVyTWF0cml4ID0gbmV3IFRIUkVFLk1hdHJpeDQoKTtcblxuICBwdWJsaWMgY29uc3RydWN0b3Ioc2hhcGU6IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuc2hhcGUgPSBzaGFwZTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVXb3JsZE1hdHJpeCh1cGRhdGVQYXJlbnRzOiBib29sZWFuLCB1cGRhdGVDaGlsZHJlbjogYm9vbGVhbik6IHZvaWQge1xuICAgIHN1cGVyLnVwZGF0ZVdvcmxkTWF0cml4KHVwZGF0ZVBhcmVudHMsIHVwZGF0ZUNoaWxkcmVuKTtcblxuICAgIHVwZGF0ZUNvbGxpZGVyTWF0cml4KHRoaXMuY29sbGlkZXJNYXRyaXgsIHRoaXMubWF0cml4V29ybGQsIHRoaXMuc2hhcGUub2Zmc2V0KTtcbiAgfVxufVxuXG4vKipcbiAqIENvbXB1dGVzIHRoZSBjb2xsaWRlck1hdHJpeCBiYXNlZCBvbiBhbiBvZmZzZXQgYW5kIGEgd29ybGQgbWF0cml4LlxuICogRXF1aXZhbGVudCB0byB0aGUgZm9sbG93aW5nIGNvZGUgd2hlbiBtYXRyaXhXb3JsZCBpcyBhbiBhZmZpbmUgbWF0cml4OlxuICogYGBganNcbiAqIG91dC5tYWtlVHJhbnNsYXRpb24ob2Zmc2V0KS5wcmVtdWx0aXBseShtYXRyaXhXb3JsZClcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSBjb2xsaWRlck1hdHJpeCBUaGUgdGFyZ2V0IG1hdHJpeCB0byBzdG9yZSB0aGUgcmVzdWx0IGluLlxuICogQHBhcmFtIG1hdHJpeFdvcmxkIFRoZSB3b3JsZCBtYXRyaXggZm8gdGhlIGNvbGxpZGVyIG9iamVjdC5cbiAqIEBwYXJhbSBvZmZzZXQgT3B0aW9uYWwgb2Zmc2V0IHRvIHRoZSBjb2xsaWRlciBzaGFwZS5cbiAqL1xuZnVuY3Rpb24gdXBkYXRlQ29sbGlkZXJNYXRyaXgoY29sbGlkZXJNYXRyaXg6IFRIUkVFLk1hdHJpeDQsIG1hdHJpeFdvcmxkOiBUSFJFRS5NYXRyaXg0LCBvZmZzZXQ/OiBUSFJFRS5WZWN0b3IzKSB7XG4gIGNvbnN0IG1lID0gbWF0cml4V29ybGQuZWxlbWVudHM7XG5cbiAgY29sbGlkZXJNYXRyaXguY29weShtYXRyaXhXb3JsZCk7XG5cbiAgaWYgKG9mZnNldCkge1xuICAgIGNvbGxpZGVyTWF0cml4LmVsZW1lbnRzWzEyXSA9IG1lWzBdICogb2Zmc2V0LnggKyBtZVs0XSAqIG9mZnNldC55ICsgbWVbOF0gKiBvZmZzZXQueiArIG1lWzEyXTtcbiAgICBjb2xsaWRlck1hdHJpeC5lbGVtZW50c1sxM10gPSBtZVsxXSAqIG9mZnNldC54ICsgbWVbNV0gKiBvZmZzZXQueSArIG1lWzldICogb2Zmc2V0LnogKyBtZVsxM107XG4gICAgY29sbGlkZXJNYXRyaXguZWxlbWVudHNbMTRdID0gbWVbMl0gKiBvZmZzZXQueCArIG1lWzZdICogb2Zmc2V0LnkgKyBtZVsxMF0gKiBvZmZzZXQueiArIG1lWzE0XTtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IE1hdHJpeDRJbnZlcnNlQ2FjaGUgfSBmcm9tICcuL3V0aWxzL01hdHJpeDRJbnZlcnNlQ2FjaGUnO1xuaW1wb3J0IHR5cGUgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cCB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXAnO1xuaW1wb3J0IHR5cGUgeyBWUk1TcHJpbmdCb25lSm9pbnRTZXR0aW5ncyB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUpvaW50U2V0dGluZ3MnO1xuaW1wb3J0IHR5cGUgeyBWUk1TcHJpbmdCb25lTWFuYWdlciB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZU1hbmFnZXInO1xuXG4vLyBiYXNlZCBvblxuLy8gaHR0cDovL3JvY2tldGp1bXAuc2tyLmpwL3VuaXR5M2QvMTA5L1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL2R3YW5nby9VbmlWUk0vYmxvYi9tYXN0ZXIvU2NyaXB0cy9TcHJpbmdCb25lL1ZSTVNwcmluZ0JvbmUuY3NcblxuY29uc3QgSURFTlRJVFlfTUFUUklYNCA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG5cbi8vIFx1OEEwOFx1N0I5N1x1NEUyRFx1MzA2RVx1NEUwMFx1NjY0Mlx1NEZERFx1NUI1OFx1NzUyOFx1NTkwOVx1NjU3MFx1RkYwOFx1NEUwMFx1NUVBNlx1MzBBNFx1MzBGM1x1MzBCOVx1MzBCRlx1MzBGM1x1MzBCOVx1MzA5Mlx1NEY1Q1x1MzA2M1x1MzA1Rlx1MzA4OVx1MzA0Mlx1MzA2OFx1MzA2Rlx1NEY3Rlx1MzA0NFx1NTZERVx1MzA1OVx1RkYwOVxuY29uc3QgX3YzQSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfdjNCID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuLyoqXG4gKiBBIHRlbXBvcmFyeSB2YXJpYWJsZSB3aGljaCBpcyB1c2VkIGluIGB1cGRhdGVgXG4gKi9cbmNvbnN0IF93b3JsZFNwYWNlUG9zaXRpb24gPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4vKipcbiAqIEEgdGVtcG9yYXJ5IHZhcmlhYmxlIHdoaWNoIGlzIHVzZWQgaW4gYHVwZGF0ZWBcbiAqL1xuY29uc3QgX25leHRUYWlsID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuY29uc3QgX21hdEEgPSBuZXcgVEhSRUUuTWF0cml4NCgpO1xuXG4vKipcbiAqIEEgY2xhc3MgcmVwcmVzZW50cyBhIHNpbmdsZSBqb2ludCBvZiBhIHNwcmluZyBib25lLlxuICogSXQgc2hvdWxkIGJlIG1hbmFnZWQgYnkgYSB7QGxpbmsgVlJNU3ByaW5nQm9uZU1hbmFnZXJ9LlxuICovXG5leHBvcnQgY2xhc3MgVlJNU3ByaW5nQm9uZUpvaW50IHtcbiAgLyoqXG4gICAqIFNldHRpbmdzIG9mIHRoZSBib25lLlxuICAgKi9cbiAgcHVibGljIHNldHRpbmdzOiBWUk1TcHJpbmdCb25lSm9pbnRTZXR0aW5ncztcblxuICAvKipcbiAgICogQ29sbGlkZXIgZ3JvdXBzIGF0dGFjaGVkIHRvIHRoaXMgYm9uZS5cbiAgICovXG4gIHB1YmxpYyBjb2xsaWRlckdyb3VwczogVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXBbXTtcblxuICAvKipcbiAgICogQW4gT2JqZWN0M0QgYXR0YWNoZWQgdG8gdGhpcyBib25lLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGJvbmU6IFRIUkVFLk9iamVjdDNEO1xuXG4gIC8qKlxuICAgKiBBbiBPYmplY3QzRCB0aGF0IHdpbGwgYmUgdXNlZCBhcyBhIHRhaWwgb2YgdGhpcyBzcHJpbmcgYm9uZS5cbiAgICogSXQgY2FuIGJlIG51bGwgd2hlbiB0aGUgc3ByaW5nIGJvbmUgaXMgaW1wb3J0ZWQgZnJvbSBWUk0gMC4wLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGNoaWxkOiBUSFJFRS5PYmplY3QzRCB8IG51bGw7XG5cbiAgLyoqXG4gICAqIEN1cnJlbnQgcG9zaXRpb24gb2YgY2hpbGQgdGFpbCwgaW4gY2VudGVyIHVuaXQuIFdpbGwgYmUgdXNlZCBmb3IgdmVybGV0IGludGVncmF0aW9uLlxuICAgKi9cbiAgcHJpdmF0ZSBfY3VycmVudFRhaWwgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4gIC8qKlxuICAgKiBQcmV2aW91cyBwb3NpdGlvbiBvZiBjaGlsZCB0YWlsLCBpbiBjZW50ZXIgdW5pdC4gV2lsbCBiZSB1c2VkIGZvciB2ZXJsZXQgaW50ZWdyYXRpb24uXG4gICAqL1xuICBwcml2YXRlIF9wcmV2VGFpbCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbiAgLyoqXG4gICAqIEluaXRpYWwgYXhpcyBvZiB0aGUgYm9uZSwgaW4gbG9jYWwgdW5pdC5cbiAgICovXG4gIHByaXZhdGUgX2JvbmVBeGlzID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuICAvKipcbiAgICogTGVuZ3RoIG9mIHRoZSBib25lIGluIHdvcmxkIHVuaXQuXG4gICAqIFdpbGwgYmUgdXNlZCBmb3Igbm9ybWFsaXphdGlvbiBpbiB1cGRhdGUgbG9vcCwgd2lsbCBiZSB1cGRhdGVkIGJ5IHtAbGluayBfY2FsY1dvcmxkU3BhY2VCb25lTGVuZ3RofS5cbiAgICpcbiAgICogSXQncyBzYW1lIGFzIGxvY2FsIHVuaXQgbGVuZ3RoIHVubGVzcyB0aGVyZSBhcmUgc2NhbGUgdHJhbnNmb3JtYXRpb25zIGluIHRoZSB3b3JsZCBzcGFjZS5cbiAgICovXG4gIHByaXZhdGUgX3dvcmxkU3BhY2VCb25lTGVuZ3RoID0gMC4wO1xuXG4gIC8qKlxuICAgKiBTZXQgb2YgZGVwZW5kZW5jaWVzIHRoYXQgbmVlZCB0byBiZSB1cGRhdGVkIGJlZm9yZSB0aGlzIGpvaW50LlxuICAgKi9cbiAgcHVibGljIGdldCBkZXBlbmRlbmNpZXMoKTogU2V0PFRIUkVFLk9iamVjdDNEPiB7XG4gICAgY29uc3Qgc2V0ID0gbmV3IFNldDxUSFJFRS5PYmplY3QzRD4oKTtcblxuICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuYm9uZS5wYXJlbnQ7XG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgc2V0LmFkZChwYXJlbnQpO1xuICAgIH1cblxuICAgIGZvciAobGV0IGNnID0gMDsgY2cgPCB0aGlzLmNvbGxpZGVyR3JvdXBzLmxlbmd0aDsgY2crKykge1xuICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCB0aGlzLmNvbGxpZGVyR3JvdXBzW2NnXS5jb2xsaWRlcnMubGVuZ3RoOyBjKyspIHtcbiAgICAgICAgc2V0LmFkZCh0aGlzLmNvbGxpZGVyR3JvdXBzW2NnXS5jb2xsaWRlcnNbY10pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzZXQ7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBzcHJpbmdib25lIHdpbGwgYmUgY2FsY3VsYXRlZCBiYXNlZCBvbiB0aGUgc3BhY2UgcmVsYXRpdmUgZnJvbSB0aGlzIG9iamVjdC5cbiAgICogSWYgdGhpcyBpcyBgbnVsbGAsIHNwcmluZ2JvbmUgd2lsbCBiZSBjYWxjdWxhdGVkIGluIHdvcmxkIHNwYWNlLlxuICAgKi9cbiAgcHJpdmF0ZSBfY2VudGVyOiBUSFJFRS5PYmplY3QzRCB8IG51bGwgPSBudWxsO1xuICBwdWJsaWMgZ2V0IGNlbnRlcigpOiBUSFJFRS5PYmplY3QzRCB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl9jZW50ZXI7XG4gIH1cbiAgcHVibGljIHNldCBjZW50ZXIoY2VudGVyOiBUSFJFRS5PYmplY3QzRCB8IG51bGwpIHtcbiAgICAvLyB1bmluc3RhbGwgaW52ZXJzZSBjYWNoZVxuICAgIGlmICh0aGlzLl9jZW50ZXI/LnVzZXJEYXRhLmludmVyc2VDYWNoZVByb3h5KSB7XG4gICAgICAodGhpcy5fY2VudGVyLnVzZXJEYXRhLmludmVyc2VDYWNoZVByb3h5IGFzIE1hdHJpeDRJbnZlcnNlQ2FjaGUpLnJldmVydCgpO1xuICAgICAgZGVsZXRlIHRoaXMuX2NlbnRlci51c2VyRGF0YS5pbnZlcnNlQ2FjaGVQcm94eTtcbiAgICB9XG5cbiAgICAvLyBjaGFuZ2UgdGhlIGNlbnRlclxuICAgIHRoaXMuX2NlbnRlciA9IGNlbnRlcjtcblxuICAgIC8vIGluc3RhbGwgaW52ZXJzZSBjYWNoZVxuICAgIGlmICh0aGlzLl9jZW50ZXIpIHtcbiAgICAgIGlmICghdGhpcy5fY2VudGVyLnVzZXJEYXRhLmludmVyc2VDYWNoZVByb3h5KSB7XG4gICAgICAgIHRoaXMuX2NlbnRlci51c2VyRGF0YS5pbnZlcnNlQ2FjaGVQcm94eSA9IG5ldyBNYXRyaXg0SW52ZXJzZUNhY2hlKHRoaXMuX2NlbnRlci5tYXRyaXhXb3JsZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWwgc3RhdGUgb2YgdGhlIGxvY2FsIG1hdHJpeCBvZiB0aGUgYm9uZS5cbiAgICovXG4gIHByaXZhdGUgX2luaXRpYWxMb2NhbE1hdHJpeCA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG5cbiAgLyoqXG4gICAqIEluaXRpYWwgc3RhdGUgb2YgdGhlIHJvdGF0aW9uIG9mIHRoZSBib25lLlxuICAgKi9cbiAgcHJpdmF0ZSBfaW5pdGlhbExvY2FsUm90YXRpb24gPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXG4gIC8qKlxuICAgKiBJbml0aWFsIHN0YXRlIG9mIHRoZSBwb3NpdGlvbiBvZiBpdHMgY2hpbGQuXG4gICAqL1xuICBwcml2YXRlIF9pbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbiAgcHVibGljIGdldCBpbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uKCk6IFRIUkVFLlZlY3RvcjMge1xuICAgIHJldHVybiB0aGlzLl9pbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHdvcmxkIG1hdHJpeCBvZiBpdHMgcGFyZW50IG9iamVjdC5cbiAgICogTm90ZSB0aGF0IGl0IHJldHVybnMgYSByZWZlcmVuY2UgdG8gdGhlIG1hdHJpeC4gRG9uJ3QgbXV0YXRlIHRoaXMgZGlyZWN0bHkhXG4gICAqL1xuICBwcml2YXRlIGdldCBfcGFyZW50TWF0cml4V29ybGQoKTogVEhSRUUuTWF0cml4NCB7XG4gICAgcmV0dXJuIHRoaXMuYm9uZS5wYXJlbnQgPyB0aGlzLmJvbmUucGFyZW50Lm1hdHJpeFdvcmxkIDogSURFTlRJVFlfTUFUUklYNDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgVlJNU3ByaW5nQm9uZS5cbiAgICpcbiAgICogQHBhcmFtIGJvbmUgQW4gT2JqZWN0M0QgdGhhdCB3aWxsIGJlIGF0dGFjaGVkIHRvIHRoaXMgYm9uZVxuICAgKiBAcGFyYW0gY2hpbGQgQW4gT2JqZWN0M0QgdGhhdCB3aWxsIGJlIHVzZWQgYXMgYSB0YWlsIG9mIHRoaXMgc3ByaW5nIGJvbmUuIEl0IGNhbiBiZSBudWxsIHdoZW4gdGhlIHNwcmluZyBib25lIGlzIGltcG9ydGVkIGZyb20gVlJNIDAuMFxuICAgKiBAcGFyYW0gc2V0dGluZ3MgU2V2ZXJhbCBwYXJhbWV0ZXJzIHJlbGF0ZWQgdG8gYmVoYXZpb3Igb2YgdGhlIHNwcmluZyBib25lXG4gICAqIEBwYXJhbSBjb2xsaWRlckdyb3VwcyBDb2xsaWRlciBncm91cHMgdGhhdCB3aWxsIGJlIGNvbGxpZGVkIHdpdGggdGhpcyBzcHJpbmcgYm9uZVxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgYm9uZTogVEhSRUUuT2JqZWN0M0QsXG4gICAgY2hpbGQ6IFRIUkVFLk9iamVjdDNEIHwgbnVsbCxcbiAgICBzZXR0aW5nczogUGFydGlhbDxWUk1TcHJpbmdCb25lSm9pbnRTZXR0aW5ncz4gPSB7fSxcbiAgICBjb2xsaWRlckdyb3VwczogVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXBbXSA9IFtdLFxuICApIHtcbiAgICB0aGlzLmJvbmUgPSBib25lOyAvLyB1bmlWUk1cdTMwNjdcdTMwNkUgcGFyZW50XG4gICAgdGhpcy5ib25lLm1hdHJpeEF1dG9VcGRhdGUgPSBmYWxzZTsgLy8gdXBkYXRlXHUzMDZCXHUzMDg4XHUzMDhBXHU4QTA4XHU3Qjk3XHUzMDU1XHUzMDhDXHUzMDhCXHUzMDZFXHUzMDY3dGhyZWUuanNcdTUxODVcdTMwNjdcdTMwNkVcdTgxRUFcdTUyRDVcdTUxRTZcdTc0MDZcdTMwNkZcdTRFMERcdTg5ODFcblxuICAgIHRoaXMuY2hpbGQgPSBjaGlsZDtcblxuICAgIHRoaXMuc2V0dGluZ3MgPSB7XG4gICAgICBoaXRSYWRpdXM6IHNldHRpbmdzLmhpdFJhZGl1cyA/PyAwLjAsXG4gICAgICBzdGlmZm5lc3M6IHNldHRpbmdzLnN0aWZmbmVzcyA/PyAxLjAsXG4gICAgICBncmF2aXR5UG93ZXI6IHNldHRpbmdzLmdyYXZpdHlQb3dlciA/PyAwLjAsXG4gICAgICBncmF2aXR5RGlyOiBzZXR0aW5ncy5ncmF2aXR5RGlyPy5jbG9uZSgpID8/IG5ldyBUSFJFRS5WZWN0b3IzKDAuMCwgLTEuMCwgMC4wKSxcbiAgICAgIGRyYWdGb3JjZTogc2V0dGluZ3MuZHJhZ0ZvcmNlID8/IDAuNCxcbiAgICB9O1xuXG4gICAgdGhpcy5jb2xsaWRlckdyb3VwcyA9IGNvbGxpZGVyR3JvdXBzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgaW5pdGlhbCBzdGF0ZSBvZiB0aGlzIHNwcmluZyBib25lLlxuICAgKiBZb3UgbWlnaHQgd2FudCB0byBjYWxsIHtAbGluayBWUk1TcHJpbmdCb25lTWFuYWdlci5zZXRJbml0U3RhdGV9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgc2V0SW5pdFN0YXRlKCk6IHZvaWQge1xuICAgIC8vIHJlbWVtYmVyIGluaXRpYWwgcG9zaXRpb24gb2YgaXRzZWxmXG4gICAgdGhpcy5faW5pdGlhbExvY2FsTWF0cml4LmNvcHkodGhpcy5ib25lLm1hdHJpeCk7XG4gICAgdGhpcy5faW5pdGlhbExvY2FsUm90YXRpb24uY29weSh0aGlzLmJvbmUucXVhdGVybmlvbik7XG5cbiAgICAvLyBzZWUgaW5pdGlhbCBwb3NpdGlvbiBvZiBpdHMgbG9jYWwgY2hpbGRcbiAgICBpZiAodGhpcy5jaGlsZCkge1xuICAgICAgdGhpcy5faW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbi5jb3B5KHRoaXMuY2hpbGQucG9zaXRpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyB2cm0wIHJlcXVpcmVzIGEgN2NtIGZpeGVkIGJvbmUgbGVuZ3RoIGZvciB0aGUgZmluYWwgbm9kZSBpbiBhIGNoYWluXG4gICAgICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS92cm0tYy92cm0tc3BlY2lmaWNhdGlvbi90cmVlL21hc3Rlci9zcGVjaWZpY2F0aW9uL1ZSTUNfc3ByaW5nQm9uZS0xLjAjYWJvdXQtc3ByaW5nLWNvbmZpZ3VyYXRpb25cbiAgICAgIHRoaXMuX2luaXRpYWxMb2NhbENoaWxkUG9zaXRpb24uY29weSh0aGlzLmJvbmUucG9zaXRpb24pLm5vcm1hbGl6ZSgpLm11bHRpcGx5U2NhbGFyKDAuMDcpO1xuICAgIH1cblxuICAgIC8vIGNvcHkgdGhlIGNoaWxkIHBvc2l0aW9uIHRvIHRhaWxzXG4gICAgY29uc3QgbWF0cml4V29ybGRUb0NlbnRlciA9IHRoaXMuX2dldE1hdHJpeFdvcmxkVG9DZW50ZXIoKTtcbiAgICB0aGlzLmJvbmUubG9jYWxUb1dvcmxkKHRoaXMuX2N1cnJlbnRUYWlsLmNvcHkodGhpcy5faW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbikpLmFwcGx5TWF0cml4NChtYXRyaXhXb3JsZFRvQ2VudGVyKTtcbiAgICB0aGlzLl9wcmV2VGFpbC5jb3B5KHRoaXMuX2N1cnJlbnRUYWlsKTtcblxuICAgIC8vIHNldCBpbml0aWFsIHN0YXRlcyB0aGF0IGFyZSByZWxhdGVkIHRvIGxvY2FsIGNoaWxkIHBvc2l0aW9uXG4gICAgdGhpcy5fYm9uZUF4aXMuY29weSh0aGlzLl9pbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uKS5ub3JtYWxpemUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGUgc3RhdGUgb2YgdGhpcyBib25lLlxuICAgKiBZb3UgbWlnaHQgd2FudCB0byBjYWxsIHtAbGluayBWUk1TcHJpbmdCb25lTWFuYWdlci5yZXNldH0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLmJvbmUucXVhdGVybmlvbi5jb3B5KHRoaXMuX2luaXRpYWxMb2NhbFJvdGF0aW9uKTtcblxuICAgIC8vIFdlIG5lZWQgdG8gdXBkYXRlIGl0cyBtYXRyaXhXb3JsZCBtYW51YWxseSwgc2luY2Ugd2UgdHdlYWtlZCB0aGUgYm9uZSBieSBvdXIgaGFuZFxuICAgIHRoaXMuYm9uZS51cGRhdGVNYXRyaXgoKTtcbiAgICB0aGlzLmJvbmUubWF0cml4V29ybGQubXVsdGlwbHlNYXRyaWNlcyh0aGlzLl9wYXJlbnRNYXRyaXhXb3JsZCwgdGhpcy5ib25lLm1hdHJpeCk7XG5cbiAgICAvLyBBcHBseSB1cGRhdGVkIHBvc2l0aW9uIHRvIHRhaWwgc3RhdGVzXG4gICAgY29uc3QgbWF0cml4V29ybGRUb0NlbnRlciA9IHRoaXMuX2dldE1hdHJpeFdvcmxkVG9DZW50ZXIoKTtcbiAgICB0aGlzLmJvbmUubG9jYWxUb1dvcmxkKHRoaXMuX2N1cnJlbnRUYWlsLmNvcHkodGhpcy5faW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbikpLmFwcGx5TWF0cml4NChtYXRyaXhXb3JsZFRvQ2VudGVyKTtcbiAgICB0aGlzLl9wcmV2VGFpbC5jb3B5KHRoaXMuX2N1cnJlbnRUYWlsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIHN0YXRlIG9mIHRoaXMgYm9uZS5cbiAgICogWW91IG1pZ2h0IHdhbnQgdG8gY2FsbCB7QGxpbmsgVlJNU3ByaW5nQm9uZU1hbmFnZXIudXBkYXRlfSBpbnN0ZWFkLlxuICAgKlxuICAgKiBAcGFyYW0gZGVsdGEgZGVsdGFUaW1lXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoZGVsdGEgPD0gMCkgcmV0dXJuO1xuXG4gICAgLy8gVXBkYXRlIHRoZSBfd29ybGRTcGFjZUJvbmVMZW5ndGhcbiAgICB0aGlzLl9jYWxjV29ybGRTcGFjZUJvbmVMZW5ndGgoKTtcblxuICAgIC8vIEdldCBib25lQXhpcyBpbiB3b3JsZCBzcGFjZVxuICAgIGNvbnN0IHdvcmxkU3BhY2VCb25lQXhpcyA9IF92M0JcbiAgICAgIC5jb3B5KHRoaXMuX2JvbmVBeGlzKVxuICAgICAgLnRyYW5zZm9ybURpcmVjdGlvbih0aGlzLl9pbml0aWFsTG9jYWxNYXRyaXgpXG4gICAgICAudHJhbnNmb3JtRGlyZWN0aW9uKHRoaXMuX3BhcmVudE1hdHJpeFdvcmxkKTtcblxuICAgIC8vIHZlcmxldFx1N0E0RFx1NTIwNlx1MzA2N1x1NkIyMVx1MzA2RVx1NEY0RFx1N0Y2RVx1MzA5Mlx1OEEwOFx1N0I5N1xuICAgIF9uZXh0VGFpbFxuICAgICAgLy8gRGV0ZXJtaW5lIGluZXJ0aWEgaW4gY2VudGVyIHNwYWNlXG4gICAgICAuY29weSh0aGlzLl9jdXJyZW50VGFpbClcbiAgICAgIC5hZGQoX3YzQS5zdWJWZWN0b3JzKHRoaXMuX2N1cnJlbnRUYWlsLCB0aGlzLl9wcmV2VGFpbCkubXVsdGlwbHlTY2FsYXIoMSAtIHRoaXMuc2V0dGluZ3MuZHJhZ0ZvcmNlKSkgLy8gXHU1MjREXHUzMEQ1XHUzMEVDXHUzMEZDXHUzMEUwXHUzMDZFXHU3OUZCXHU1MkQ1XHUzMDkyXHU3RDk5XHU3RDlBXHUzMDU5XHUzMDhCKFx1NkUxQlx1ODg3MFx1MzA4Mlx1MzA0Mlx1MzA4Qlx1MzA4OClcbiAgICAgIC8vIENvbnZlcnQgY2VudGVyIHNwYWNlIHRvIHdvcmxkIHNwYWNlXG4gICAgICAuYXBwbHlNYXRyaXg0KHRoaXMuX2dldE1hdHJpeENlbnRlclRvV29ybGQoKSkgLy8gdGFpbFx1MzA5MndvcmxkIHNwYWNlXHUzMDZCXHU2MjNCXHUzMDU5XG4gICAgICAvLyBBcHBseSBzdGlmZm5lc3MgYW5kIGdyYXZpdHkgaW4gd29ybGQgc3BhY2VcbiAgICAgIC5hZGRTY2FsZWRWZWN0b3Iod29ybGRTcGFjZUJvbmVBeGlzLCB0aGlzLnNldHRpbmdzLnN0aWZmbmVzcyAqIGRlbHRhKSAvLyBcdTg5QUFcdTMwNkVcdTU2REVcdThFRTJcdTMwNkJcdTMwODhcdTMwOEJcdTVCNTBcdTMwRENcdTMwRkNcdTMwRjNcdTMwNkVcdTc5RkJcdTUyRDVcdTc2RUVcdTZBMTlcbiAgICAgIC5hZGRTY2FsZWRWZWN0b3IodGhpcy5zZXR0aW5ncy5ncmF2aXR5RGlyLCB0aGlzLnNldHRpbmdzLmdyYXZpdHlQb3dlciAqIGRlbHRhKTsgLy8gXHU1OTE2XHU1MjlCXHUzMDZCXHUzMDg4XHUzMDhCXHU3OUZCXHU1MkQ1XHU5MUNGXG5cbiAgICAvLyBub3JtYWxpemUgYm9uZSBsZW5ndGhcbiAgICBfd29ybGRTcGFjZVBvc2l0aW9uLnNldEZyb21NYXRyaXhQb3NpdGlvbih0aGlzLmJvbmUubWF0cml4V29ybGQpO1xuICAgIF9uZXh0VGFpbC5zdWIoX3dvcmxkU3BhY2VQb3NpdGlvbikubm9ybWFsaXplKCkubXVsdGlwbHlTY2FsYXIodGhpcy5fd29ybGRTcGFjZUJvbmVMZW5ndGgpLmFkZChfd29ybGRTcGFjZVBvc2l0aW9uKTtcblxuICAgIC8vIENvbGxpc2lvblx1MzA2N1x1NzlGQlx1NTJENVxuICAgIHRoaXMuX2NvbGxpc2lvbihfbmV4dFRhaWwpO1xuXG4gICAgLy8gdXBkYXRlIHByZXZUYWlsIGFuZCBjdXJyZW50VGFpbFxuICAgIHRoaXMuX3ByZXZUYWlsLmNvcHkodGhpcy5fY3VycmVudFRhaWwpO1xuICAgIHRoaXMuX2N1cnJlbnRUYWlsLmNvcHkoX25leHRUYWlsKS5hcHBseU1hdHJpeDQodGhpcy5fZ2V0TWF0cml4V29ybGRUb0NlbnRlcigpKTtcblxuICAgIC8vIEFwcGx5IHJvdGF0aW9uLCBjb252ZXJ0IHZlY3RvcjMgdGhpbmcgaW50byBhY3R1YWwgcXVhdGVybmlvblxuICAgIC8vIE9yaWdpbmFsIFVuaVZSTSBpcyBkb2luZyBjZW50ZXIgdW5pdCBjYWxjdWx1cyBhdCBoZXJlIGJ1dCB3ZSdyZSBnb25uYSBkbyB0aGlzIG9uIGxvY2FsIHVuaXRcbiAgICBjb25zdCB3b3JsZFNwYWNlSW5pdGlhbE1hdHJpeEludiA9IF9tYXRBXG4gICAgICAubXVsdGlwbHlNYXRyaWNlcyh0aGlzLl9wYXJlbnRNYXRyaXhXb3JsZCwgdGhpcy5faW5pdGlhbExvY2FsTWF0cml4KVxuICAgICAgLmludmVydCgpO1xuICAgIHRoaXMuYm9uZS5xdWF0ZXJuaW9uXG4gICAgICAuc2V0RnJvbVVuaXRWZWN0b3JzKHRoaXMuX2JvbmVBeGlzLCBfdjNBLmNvcHkoX25leHRUYWlsKS5hcHBseU1hdHJpeDQod29ybGRTcGFjZUluaXRpYWxNYXRyaXhJbnYpLm5vcm1hbGl6ZSgpKVxuICAgICAgLnByZW11bHRpcGx5KHRoaXMuX2luaXRpYWxMb2NhbFJvdGF0aW9uKTtcblxuICAgIC8vIFdlIG5lZWQgdG8gdXBkYXRlIGl0cyBtYXRyaXhXb3JsZCBtYW51YWxseSwgc2luY2Ugd2UgdHdlYWtlZCB0aGUgYm9uZSBieSBvdXIgaGFuZFxuICAgIHRoaXMuYm9uZS51cGRhdGVNYXRyaXgoKTtcbiAgICB0aGlzLmJvbmUubWF0cml4V29ybGQubXVsdGlwbHlNYXRyaWNlcyh0aGlzLl9wYXJlbnRNYXRyaXhXb3JsZCwgdGhpcy5ib25lLm1hdHJpeCk7XG4gIH1cblxuICAvKipcbiAgICogRG8gY29sbGlzaW9uIG1hdGggYWdhaW5zdCBldmVyeSBjb2xsaWRlcnMgYXR0YWNoZWQgdG8gdGhpcyBib25lLlxuICAgKlxuICAgKiBAcGFyYW0gdGFpbCBUaGUgdGFpbCB5b3Ugd2FudCB0byBwcm9jZXNzXG4gICAqL1xuICBwcml2YXRlIF9jb2xsaXNpb24odGFpbDogVEhSRUUuVmVjdG9yMyk6IHZvaWQge1xuICAgIGZvciAobGV0IGNnID0gMDsgY2cgPCB0aGlzLmNvbGxpZGVyR3JvdXBzLmxlbmd0aDsgY2crKykge1xuICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCB0aGlzLmNvbGxpZGVyR3JvdXBzW2NnXS5jb2xsaWRlcnMubGVuZ3RoOyBjKyspIHtcbiAgICAgICAgY29uc3QgY29sbGlkZXIgPSB0aGlzLmNvbGxpZGVyR3JvdXBzW2NnXS5jb2xsaWRlcnNbY107XG4gICAgICAgIGNvbnN0IGRpc3QgPSBjb2xsaWRlci5zaGFwZS5jYWxjdWxhdGVDb2xsaXNpb24oY29sbGlkZXIuY29sbGlkZXJNYXRyaXgsIHRhaWwsIHRoaXMuc2V0dGluZ3MuaGl0UmFkaXVzLCBfdjNBKTtcblxuICAgICAgICBpZiAoZGlzdCA8IDAuMCkge1xuICAgICAgICAgIC8vIGhpdFxuICAgICAgICAgIHRhaWwuYWRkU2NhbGVkVmVjdG9yKF92M0EsIC1kaXN0KTtcblxuICAgICAgICAgIC8vIG5vcm1hbGl6ZSBib25lIGxlbmd0aFxuICAgICAgICAgIHRhaWwuc3ViKF93b3JsZFNwYWNlUG9zaXRpb24pO1xuICAgICAgICAgIGNvbnN0IGxlbmd0aCA9IHRhaWwubGVuZ3RoKCk7XG4gICAgICAgICAgdGFpbC5tdWx0aXBseVNjYWxhcih0aGlzLl93b3JsZFNwYWNlQm9uZUxlbmd0aCAvIGxlbmd0aCkuYWRkKF93b3JsZFNwYWNlUG9zaXRpb24pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSB0aGUge0BsaW5rIF93b3JsZFNwYWNlQm9uZUxlbmd0aH0uXG4gICAqIEludGVuZGVkIHRvIGJlIHVzZWQgaW4ge0BsaW5rIHVwZGF0ZX0uXG4gICAqL1xuICBwcml2YXRlIF9jYWxjV29ybGRTcGFjZUJvbmVMZW5ndGgoKTogdm9pZCB7XG4gICAgX3YzQS5zZXRGcm9tTWF0cml4UG9zaXRpb24odGhpcy5ib25lLm1hdHJpeFdvcmxkKTsgLy8gZ2V0IHdvcmxkIHBvc2l0aW9uIG9mIHRoaXMuYm9uZVxuXG4gICAgaWYgKHRoaXMuY2hpbGQpIHtcbiAgICAgIF92M0Iuc2V0RnJvbU1hdHJpeFBvc2l0aW9uKHRoaXMuY2hpbGQubWF0cml4V29ybGQpOyAvLyBnZXQgd29ybGQgcG9zaXRpb24gb2YgdGhpcy5jaGlsZFxuICAgIH0gZWxzZSB7XG4gICAgICBfdjNCLmNvcHkodGhpcy5faW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbik7XG4gICAgICBfdjNCLmFwcGx5TWF0cml4NCh0aGlzLmJvbmUubWF0cml4V29ybGQpO1xuICAgIH1cblxuICAgIHRoaXMuX3dvcmxkU3BhY2VCb25lTGVuZ3RoID0gX3YzQS5zdWIoX3YzQikubGVuZ3RoKCk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbWF0cml4IHRoYXQgY29udmVydHMgY2VudGVyIHNwYWNlIGludG8gd29ybGQgc3BhY2UuXG4gICAqL1xuICBwcml2YXRlIF9nZXRNYXRyaXhDZW50ZXJUb1dvcmxkKCk6IFRIUkVFLk1hdHJpeDQge1xuICAgIHJldHVybiB0aGlzLl9jZW50ZXIgPyB0aGlzLl9jZW50ZXIubWF0cml4V29ybGQgOiBJREVOVElUWV9NQVRSSVg0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG1hdHJpeCB0aGF0IGNvbnZlcnRzIHdvcmxkIHNwYWNlIGludG8gY2VudGVyIHNwYWNlLlxuICAgKi9cbiAgcHJpdmF0ZSBfZ2V0TWF0cml4V29ybGRUb0NlbnRlcigpOiBUSFJFRS5NYXRyaXg0IHtcbiAgICByZXR1cm4gdGhpcy5fY2VudGVyID8gKHRoaXMuX2NlbnRlci51c2VyRGF0YS5pbnZlcnNlQ2FjaGVQcm94eSBhcyBNYXRyaXg0SW52ZXJzZUNhY2hlKS5pbnZlcnNlIDogSURFTlRJVFlfTUFUUklYNDtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IG1hdDRJbnZlcnRDb21wYXQgfSBmcm9tICcuL21hdDRJbnZlcnRDb21wYXQnO1xuXG5leHBvcnQgY2xhc3MgTWF0cml4NEludmVyc2VDYWNoZSB7XG4gIC8qKlxuICAgKiBUaGUgdGFyZ2V0IG1hdHJpeC5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBtYXRyaXg6IFRIUkVFLk1hdHJpeDQ7XG5cbiAgLyoqXG4gICAqIEEgY2FjaGUgb2YgaW52ZXJzZSBvZiBjdXJyZW50IG1hdHJpeC5cbiAgICovXG4gIHByaXZhdGUgcmVhZG9ubHkgX2ludmVyc2VDYWNoZSA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG5cbiAgLyoqXG4gICAqIEEgZmxhZyB0aGF0IG1ha2VzIGl0IHdhbnQgdG8gcmVjYWxjdWxhdGUgaXRzIHtAbGluayBfaW52ZXJzZUNhY2hlfS5cbiAgICogV2lsbCBiZSBzZXQgYHRydWVgIHdoZW4gYGVsZW1lbnRzYCBhcmUgbXV0YXRlZCBhbmQgYmUgdXNlZCBpbiBgZ2V0SW52ZXJzZWAuXG4gICAqL1xuICBwcml2YXRlIF9zaG91bGRVcGRhdGVJbnZlcnNlID0gdHJ1ZTtcblxuICAvKipcbiAgICogVGhlIG9yaWdpbmFsIG9mIGBtYXRyaXguZWxlbWVudHNgXG4gICAqL1xuICBwcml2YXRlIHJlYWRvbmx5IF9vcmlnaW5hbEVsZW1lbnRzOiBUSFJFRS5NYXRyaXg0VHVwbGU7XG5cbiAgLyoqXG4gICAqIEludmVyc2Ugb2YgZ2l2ZW4gbWF0cml4LlxuICAgKiBOb3RlIHRoYXQgaXQgd2lsbCByZXR1cm4gaXRzIGludGVybmFsIHByaXZhdGUgaW5zdGFuY2UuXG4gICAqIE1ha2Ugc3VyZSBjb3B5aW5nIHRoaXMgYmVmb3JlIG11dGF0ZSB0aGlzLlxuICAgKi9cbiAgcHVibGljIGdldCBpbnZlcnNlKCk6IFRIUkVFLk1hdHJpeDQge1xuICAgIGlmICh0aGlzLl9zaG91bGRVcGRhdGVJbnZlcnNlKSB7XG4gICAgICBtYXQ0SW52ZXJ0Q29tcGF0KHRoaXMuX2ludmVyc2VDYWNoZS5jb3B5KHRoaXMubWF0cml4KSk7XG4gICAgICB0aGlzLl9zaG91bGRVcGRhdGVJbnZlcnNlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX2ludmVyc2VDYWNoZTtcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihtYXRyaXg6IFRIUkVFLk1hdHJpeDQpIHtcbiAgICB0aGlzLm1hdHJpeCA9IG1hdHJpeDtcblxuICAgIGNvbnN0IGhhbmRsZXI6IFByb3h5SGFuZGxlcjxudW1iZXJbXT4gPSB7XG4gICAgICBzZXQ6IChvYmosIHByb3A6IGFueSwgbmV3VmFsKSA9PiB7XG4gICAgICAgIHRoaXMuX3Nob3VsZFVwZGF0ZUludmVyc2UgPSB0cnVlO1xuICAgICAgICBvYmpbcHJvcF0gPSBuZXdWYWw7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9LFxuICAgIH07XG5cbiAgICB0aGlzLl9vcmlnaW5hbEVsZW1lbnRzID0gbWF0cml4LmVsZW1lbnRzO1xuICAgIG1hdHJpeC5lbGVtZW50cyA9IG5ldyBQcm94eTxUSFJFRS5NYXRyaXg0VHVwbGU+KG1hdHJpeC5lbGVtZW50cywgaGFuZGxlcik7XG4gIH1cblxuICBwdWJsaWMgcmV2ZXJ0KCk6IHZvaWQge1xuICAgIHRoaXMubWF0cml4LmVsZW1lbnRzID0gdGhpcy5fb3JpZ2luYWxFbGVtZW50cztcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuY29uc3QgX21hdEEgPSBuZXcgVEhSRUUuTWF0cml4NCgpO1xuXG4vKipcbiAqIEEgY29tcGF0IGZ1bmN0aW9uIGZvciBgTWF0cml4NC5pbnZlcnQoKWAgLyBgTWF0cml4NC5nZXRJbnZlcnNlKClgLlxuICogYE1hdHJpeDQuaW52ZXJ0KClgIGlzIGludHJvZHVjZWQgaW4gcjEyMyBhbmQgYE1hdHJpeDQuZ2V0SW52ZXJzZSgpYCBlbWl0cyBhIHdhcm5pbmcuXG4gKiBXZSBhcmUgZ29pbmcgdG8gdXNlIHRoaXMgY29tcGF0IGZvciBhIHdoaWxlLlxuICogQHBhcmFtIHRhcmdldCBBIHRhcmdldCBtYXRyaXhcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hdDRJbnZlcnRDb21wYXQ8VCBleHRlbmRzIFRIUkVFLk1hdHJpeDQ+KHRhcmdldDogVCk6IFQge1xuICBpZiAoKHRhcmdldCBhcyBhbnkpLmludmVydCkge1xuICAgIHRhcmdldC5pbnZlcnQoKTtcbiAgfSBlbHNlIHtcbiAgICAodGFyZ2V0IGFzIGFueSkuZ2V0SW52ZXJzZShfbWF0QS5jb3B5KHRhcmdldCkpO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cbiIsICJpbXBvcnQgdHlwZSAqIGFzIFYwVlJNIGZyb20gJ0BwaXhpdi90eXBlcy12cm0tMC4wJztcbmltcG9ydCB0eXBlICogYXMgVjFTcHJpbmdCb25lU2NoZW1hIGZyb20gJ0BwaXhpdi90eXBlcy12cm1jLXNwcmluZ2JvbmUtMS4wJztcbmltcG9ydCB0eXBlICogYXMgU3ByaW5nQm9uZUV4dGVuZGVkQ29sbGlkZXJTY2hlbWEgZnJvbSAnQHBpeGl2L3R5cGVzLXZybWMtc3ByaW5nYm9uZS1leHRlbmRlZC1jb2xsaWRlci0xLjAnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHR5cGUgeyBHTFRGLCBHTFRGTG9hZGVyUGx1Z2luLCBHTFRGUGFyc2VyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlci5qcyc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXJIZWxwZXIsIFZSTVNwcmluZ0JvbmVKb2ludEhlbHBlciB9IGZyb20gJy4vaGVscGVycyc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXIgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVDb2xsaWRlcic7XG5pbXBvcnQgdHlwZSB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cCc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZUNhcHN1bGUgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlQ2Fwc3VsZSc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZVNwaGVyZSB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVTcGhlcmUnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUpvaW50IH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lSm9pbnQnO1xuaW1wb3J0IHR5cGUgeyBWUk1TcHJpbmdCb25lTG9hZGVyUGx1Z2luT3B0aW9ucyB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUxvYWRlclBsdWdpbk9wdGlvbnMnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZU1hbmFnZXIgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVNYW5hZ2VyJztcbmltcG9ydCB0eXBlIHsgVlJNU3ByaW5nQm9uZUpvaW50U2V0dGluZ3MgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVKb2ludFNldHRpbmdzJztcbmltcG9ydCB7IEdMVEYgYXMgR0xURlNjaGVtYSB9IGZyb20gJ0BnbHRmLXRyYW5zZm9ybS9jb3JlJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlUGxhbmUgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVDb2xsaWRlclNoYXBlUGxhbmUnO1xuXG5jb25zdCBFWFRFTlNJT05fTkFNRV9FWFRFTkRFRF9DT0xMSURFUiA9ICdWUk1DX3NwcmluZ0JvbmVfZXh0ZW5kZWRfY29sbGlkZXInO1xuXG4vKipcbiAqIFBvc3NpYmxlIHNwZWMgdmVyc2lvbnMgaXQgcmVjb2duaXplcy5cbiAqL1xuY29uc3QgUE9TU0lCTEVfU1BFQ19WRVJTSU9OUyA9IG5ldyBTZXQoWycxLjAnLCAnMS4wLWJldGEnXSk7XG5cbi8qKlxuICogUG9zc2libGUgc3BlYyB2ZXJzaW9ucyBvZiBgVlJNQ19zcHJpbmdCb25lX2V4dGVuZGVkX2NvbGxpZGVyYCBpdCByZWNvZ25pemVzLlxuICovXG5jb25zdCBQT1NTSUJMRV9TUEVDX1ZFUlNJT05TX0VYVEVOREVEX0NPTExJREVSUyA9IG5ldyBTZXQoWycxLjAnXSk7XG5cbmV4cG9ydCBjbGFzcyBWUk1TcHJpbmdCb25lTG9hZGVyUGx1Z2luIGltcGxlbWVudHMgR0xURkxvYWRlclBsdWdpbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgRVhURU5TSU9OX05BTUUgPSAnVlJNQ19zcHJpbmdCb25lJztcblxuICAvKipcbiAgICogU3BlY2lmeSBhbiBPYmplY3QzRCB0byBhZGQge0BsaW5rIFZSTVNwcmluZ0JvbmVKb2ludEhlbHBlcn0gcy5cbiAgICogSWYgbm90IHNwZWNpZmllZCwgaGVscGVyIHdpbGwgbm90IGJlIGNyZWF0ZWQuXG4gICAqIElmIGByZW5kZXJPcmRlcmAgaXMgc2V0IHRvIHRoZSByb290LCBoZWxwZXJzIHdpbGwgY29weSB0aGUgc2FtZSBgcmVuZGVyT3JkZXJgIC5cbiAgICovXG4gIHB1YmxpYyBqb2ludEhlbHBlclJvb3Q/OiBUSFJFRS5PYmplY3QzRDtcblxuICAvKipcbiAgICogU3BlY2lmeSBhbiBPYmplY3QzRCB0byBhZGQge0BsaW5rIFZSTVNwcmluZ0JvbmVKb2ludEhlbHBlcn0gcy5cbiAgICogSWYgbm90IHNwZWNpZmllZCwgaGVscGVyIHdpbGwgbm90IGJlIGNyZWF0ZWQuXG4gICAqIElmIGByZW5kZXJPcmRlcmAgaXMgc2V0IHRvIHRoZSByb290LCBoZWxwZXJzIHdpbGwgY29weSB0aGUgc2FtZSBgcmVuZGVyT3JkZXJgIC5cbiAgICovXG4gIHB1YmxpYyBjb2xsaWRlckhlbHBlclJvb3Q/OiBUSFJFRS5PYmplY3QzRDtcblxuICAvKipcbiAgICogSWYgdHJ1ZSwgbG9hZCBjb2xsaWRlcnMgZGVmaW5lZCBpbiBgVlJNQ19zcHJpbmdCb25lX2V4dGVuZGVkX2NvbGxpZGVyYC5cbiAgICogU2V0IHRvIGBmYWxzZWAgdG8gZGlzYWJsZSBsb2FkaW5nIGV4dGVuZGVkIGNvbGxpZGVycyBhbmQgdXNlIHRoZSBmYWxsYmFjayBiZWhhdmlvci5cbiAgICogYHRydWVgIGJ5IGRlZmF1bHQuXG4gICAqL1xuICBwdWJsaWMgdXNlRXh0ZW5kZWRDb2xsaWRlcnM6IGJvb2xlYW47XG5cbiAgcHVibGljIHJlYWRvbmx5IHBhcnNlcjogR0xURlBhcnNlcjtcblxuICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gVlJNU3ByaW5nQm9uZUxvYWRlclBsdWdpbi5FWFRFTlNJT05fTkFNRTtcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJzZXI6IEdMVEZQYXJzZXIsIG9wdGlvbnM/OiBWUk1TcHJpbmdCb25lTG9hZGVyUGx1Z2luT3B0aW9ucykge1xuICAgIHRoaXMucGFyc2VyID0gcGFyc2VyO1xuXG4gICAgdGhpcy5qb2ludEhlbHBlclJvb3QgPSBvcHRpb25zPy5qb2ludEhlbHBlclJvb3Q7XG4gICAgdGhpcy5jb2xsaWRlckhlbHBlclJvb3QgPSBvcHRpb25zPy5jb2xsaWRlckhlbHBlclJvb3Q7XG4gICAgdGhpcy51c2VFeHRlbmRlZENvbGxpZGVycyA9IG9wdGlvbnM/LnVzZUV4dGVuZGVkQ29sbGlkZXJzID8/IHRydWU7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgYWZ0ZXJSb290KGdsdGY6IEdMVEYpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBnbHRmLnVzZXJEYXRhLnZybVNwcmluZ0JvbmVNYW5hZ2VyID0gYXdhaXQgdGhpcy5faW1wb3J0KGdsdGYpO1xuICB9XG5cbiAgLyoqXG4gICAqIEltcG9ydCBzcHJpbmcgYm9uZXMgZnJvbSBhIEdMVEYgYW5kIHJldHVybiBhIHtAbGluayBWUk1TcHJpbmdCb25lTWFuYWdlcn0uXG4gICAqIEl0IG1pZ2h0IHJldHVybiBgbnVsbGAgaW5zdGVhZCB3aGVuIGl0IGRvZXMgbm90IG5lZWQgdG8gYmUgY3JlYXRlZCBvciBzb21ldGhpbmcgZ28gd3JvbmcuXG4gICAqXG4gICAqIEBwYXJhbSBnbHRmIEEgcGFyc2VkIHJlc3VsdCBvZiBHTFRGIHRha2VuIGZyb20gR0xURkxvYWRlclxuICAgKi9cbiAgcHJpdmF0ZSBhc3luYyBfaW1wb3J0KGdsdGY6IEdMVEYpOiBQcm9taXNlPFZSTVNwcmluZ0JvbmVNYW5hZ2VyIHwgbnVsbD4ge1xuICAgIGNvbnN0IHYxUmVzdWx0ID0gYXdhaXQgdGhpcy5fdjFJbXBvcnQoZ2x0Zik7XG4gICAgaWYgKHYxUmVzdWx0ICE9IG51bGwpIHtcbiAgICAgIHJldHVybiB2MVJlc3VsdDtcbiAgICB9XG5cbiAgICBjb25zdCB2MFJlc3VsdCA9IGF3YWl0IHRoaXMuX3YwSW1wb3J0KGdsdGYpO1xuICAgIGlmICh2MFJlc3VsdCAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gdjBSZXN1bHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF92MUltcG9ydChnbHRmOiBHTFRGKTogUHJvbWlzZTxWUk1TcHJpbmdCb25lTWFuYWdlciB8IG51bGw+IHtcbiAgICBjb25zdCBqc29uID0gZ2x0Zi5wYXJzZXIuanNvbiBhcyBHTFRGU2NoZW1hLklHTFRGO1xuXG4gICAgLy8gZWFybHkgYWJvcnQgaWYgaXQgZG9lc24ndCB1c2Ugc3ByaW5nIGJvbmVzXG4gICAgY29uc3QgaXNTcHJpbmdCb25lVXNlZCA9IGpzb24uZXh0ZW5zaW9uc1VzZWQ/LmluZGV4T2YoVlJNU3ByaW5nQm9uZUxvYWRlclBsdWdpbi5FWFRFTlNJT05fTkFNRSkgIT09IC0xO1xuICAgIGlmICghaXNTcHJpbmdCb25lVXNlZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgbWFuYWdlciA9IG5ldyBWUk1TcHJpbmdCb25lTWFuYWdlcigpO1xuXG4gICAgY29uc3QgdGhyZWVOb2RlczogVEhSRUUuT2JqZWN0M0RbXSA9IGF3YWl0IGdsdGYucGFyc2VyLmdldERlcGVuZGVuY2llcygnbm9kZScpO1xuXG4gICAgY29uc3QgZXh0ZW5zaW9uID0ganNvbi5leHRlbnNpb25zPy5bVlJNU3ByaW5nQm9uZUxvYWRlclBsdWdpbi5FWFRFTlNJT05fTkFNRV0gYXNcbiAgICAgIHwgVjFTcHJpbmdCb25lU2NoZW1hLlZSTUNTcHJpbmdCb25lXG4gICAgICB8IHVuZGVmaW5lZDtcbiAgICBpZiAoIWV4dGVuc2lvbikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc3BlY1ZlcnNpb24gPSBleHRlbnNpb24uc3BlY1ZlcnNpb247XG4gICAgaWYgKCFQT1NTSUJMRV9TUEVDX1ZFUlNJT05TLmhhcyhzcGVjVmVyc2lvbikpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgYFZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW46IFVua25vd24gJHtWUk1TcHJpbmdCb25lTG9hZGVyUGx1Z2luLkVYVEVOU0lPTl9OQU1FfSBzcGVjVmVyc2lvbiBcIiR7c3BlY1ZlcnNpb259XCJgLFxuICAgICAgKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbGxpZGVycyA9IGV4dGVuc2lvbi5jb2xsaWRlcnM/Lm1hcCgoc2NoZW1hQ29sbGlkZXIsIGlDb2xsaWRlcikgPT4ge1xuICAgICAgY29uc3Qgbm9kZSA9IHRocmVlTm9kZXNbc2NoZW1hQ29sbGlkZXIubm9kZSFdO1xuXG4gICAgICAvLyBTb21lIG1vZGVscyBwdXQgYC0xYCB0byB0aGUgbm9kZSBpbmRleCBvZiBjb2xsaWRlcnNcbiAgICAgIGlmIChub2RlID09IG51bGwpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIGBWUk1TcHJpbmdCb25lTG9hZGVyUGx1Z2luOiBUaGUgY29sbGlkZXIgIyR7aUNvbGxpZGVyfSBhdHRlbXB0ZWQgdG8gcmVmZXJlbmNlIGEgbm9kZSAjJHtzY2hlbWFDb2xsaWRlci5ub2RlfSBidXQgbm90IGZvdW5kLiBTa2lwcGluZyB0aGUgY29sbGlkZXJgLFxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc2NoZW1hU2hhcGUgPSBzY2hlbWFDb2xsaWRlci5zaGFwZSE7XG5cbiAgICAgIC8vIFRPRE86IHNlcGFyYXRlIGludG8gc2V2ZXJhbCBmdW5jdGlvbnNcblxuICAgICAgY29uc3Qgc2NoZW1hRXhDb2xsaWRlcjogU3ByaW5nQm9uZUV4dGVuZGVkQ29sbGlkZXJTY2hlbWEuVlJNQ1NwcmluZ0JvbmVFeHRlbmRlZENvbGxpZGVyIHwgdW5kZWZpbmVkID1cbiAgICAgICAgc2NoZW1hQ29sbGlkZXIuZXh0ZW5zaW9ucz8uW0VYVEVOU0lPTl9OQU1FX0VYVEVOREVEX0NPTExJREVSXTtcblxuICAgICAgaWYgKHRoaXMudXNlRXh0ZW5kZWRDb2xsaWRlcnMgJiYgc2NoZW1hRXhDb2xsaWRlciAhPSBudWxsKSB7XG4gICAgICAgIGNvbnN0IHNwZWNWZXJzaW9uRXhDb2xsaWRlciA9IHNjaGVtYUV4Q29sbGlkZXIuc3BlY1ZlcnNpb247XG4gICAgICAgIGlmICghUE9TU0lCTEVfU1BFQ19WRVJTSU9OU19FWFRFTkRFRF9DT0xMSURFUlMuaGFzKHNwZWNWZXJzaW9uRXhDb2xsaWRlcikpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICBgVlJNU3ByaW5nQm9uZUxvYWRlclBsdWdpbjogVW5rbm93biAke0VYVEVOU0lPTl9OQU1FX0VYVEVOREVEX0NPTExJREVSfSBzcGVjVmVyc2lvbiBcIiR7c3BlY1ZlcnNpb25FeENvbGxpZGVyfVwiLiBGYWxsYmFja2luZyB0byB0aGUgJHtWUk1TcHJpbmdCb25lTG9hZGVyUGx1Z2luLkVYVEVOU0lPTl9OQU1FfSBkZWZpbml0aW9uYCxcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHNjaGVtYUV4U2hhcGUgPSBzY2hlbWFFeENvbGxpZGVyLnNoYXBlITtcbiAgICAgICAgICBpZiAoc2NoZW1hRXhTaGFwZS5zcGhlcmUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pbXBvcnRTcGhlcmVDb2xsaWRlcihub2RlLCB7XG4gICAgICAgICAgICAgIG9mZnNldDogbmV3IFRIUkVFLlZlY3RvcjMoKS5mcm9tQXJyYXkoc2NoZW1hRXhTaGFwZS5zcGhlcmUub2Zmc2V0ID8/IFswLjAsIDAuMCwgMC4wXSksXG4gICAgICAgICAgICAgIHJhZGl1czogc2NoZW1hRXhTaGFwZS5zcGhlcmUucmFkaXVzID8/IDAuMCxcbiAgICAgICAgICAgICAgaW5zaWRlOiBzY2hlbWFFeFNoYXBlLnNwaGVyZS5pbnNpZGUgPz8gZmFsc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHNjaGVtYUV4U2hhcGUuY2Fwc3VsZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2ltcG9ydENhcHN1bGVDb2xsaWRlcihub2RlLCB7XG4gICAgICAgICAgICAgIG9mZnNldDogbmV3IFRIUkVFLlZlY3RvcjMoKS5mcm9tQXJyYXkoc2NoZW1hRXhTaGFwZS5jYXBzdWxlLm9mZnNldCA/PyBbMC4wLCAwLjAsIDAuMF0pLFxuICAgICAgICAgICAgICByYWRpdXM6IHNjaGVtYUV4U2hhcGUuY2Fwc3VsZS5yYWRpdXMgPz8gMC4wLFxuICAgICAgICAgICAgICB0YWlsOiBuZXcgVEhSRUUuVmVjdG9yMygpLmZyb21BcnJheShzY2hlbWFFeFNoYXBlLmNhcHN1bGUudGFpbCA/PyBbMC4wLCAwLjAsIDAuMF0pLFxuICAgICAgICAgICAgICBpbnNpZGU6IHNjaGVtYUV4U2hhcGUuY2Fwc3VsZS5pbnNpZGUgPz8gZmFsc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHNjaGVtYUV4U2hhcGUucGxhbmUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pbXBvcnRQbGFuZUNvbGxpZGVyKG5vZGUsIHtcbiAgICAgICAgICAgICAgb2Zmc2V0OiBuZXcgVEhSRUUuVmVjdG9yMygpLmZyb21BcnJheShzY2hlbWFFeFNoYXBlLnBsYW5lLm9mZnNldCA/PyBbMC4wLCAwLjAsIDAuMF0pLFxuICAgICAgICAgICAgICBub3JtYWw6IG5ldyBUSFJFRS5WZWN0b3IzKCkuZnJvbUFycmF5KHNjaGVtYUV4U2hhcGUucGxhbmUubm9ybWFsID8/IFswLjAsIDAuMCwgMS4wXSksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHNjaGVtYVNoYXBlLnNwaGVyZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5faW1wb3J0U3BoZXJlQ29sbGlkZXIobm9kZSwge1xuICAgICAgICAgIG9mZnNldDogbmV3IFRIUkVFLlZlY3RvcjMoKS5mcm9tQXJyYXkoc2NoZW1hU2hhcGUuc3BoZXJlLm9mZnNldCA/PyBbMC4wLCAwLjAsIDAuMF0pLFxuICAgICAgICAgIHJhZGl1czogc2NoZW1hU2hhcGUuc3BoZXJlLnJhZGl1cyA/PyAwLjAsXG4gICAgICAgICAgaW5zaWRlOiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKHNjaGVtYVNoYXBlLmNhcHN1bGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ltcG9ydENhcHN1bGVDb2xsaWRlcihub2RlLCB7XG4gICAgICAgICAgb2Zmc2V0OiBuZXcgVEhSRUUuVmVjdG9yMygpLmZyb21BcnJheShzY2hlbWFTaGFwZS5jYXBzdWxlLm9mZnNldCA/PyBbMC4wLCAwLjAsIDAuMF0pLFxuICAgICAgICAgIHJhZGl1czogc2NoZW1hU2hhcGUuY2Fwc3VsZS5yYWRpdXMgPz8gMC4wLFxuICAgICAgICAgIHRhaWw6IG5ldyBUSFJFRS5WZWN0b3IzKCkuZnJvbUFycmF5KHNjaGVtYVNoYXBlLmNhcHN1bGUudGFpbCA/PyBbMC4wLCAwLjAsIDAuMF0pLFxuICAgICAgICAgIGluc2lkZTogZmFsc2UsXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBjb25zb2xlLndhcm4oYFZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW46IFRoZSBjb2xsaWRlciAjJHtpQ29sbGlkZXJ9IGhhcyBubyB2YWxpZCBzaGFwZS4gU2tpcHBpbmcgdGhlIGNvbGxpZGVyYCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBjb2xsaWRlckdyb3VwcyA9IGV4dGVuc2lvbi5jb2xsaWRlckdyb3Vwcz8ubWFwKFxuICAgICAgKHNjaGVtYUNvbGxpZGVyR3JvdXAsIGlDb2xsaWRlckdyb3VwKTogVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXAgPT4ge1xuICAgICAgICBjb25zdCBjb2xzID0gKHNjaGVtYUNvbGxpZGVyR3JvdXAuY29sbGlkZXJzID8/IFtdKVxuICAgICAgICAgIC5tYXAoKGlDb2xsaWRlcikgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29sID0gY29sbGlkZXJzPy5baUNvbGxpZGVyXTtcblxuICAgICAgICAgICAgaWYgKGNvbCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgICAgICBgVlJNU3ByaW5nQm9uZUxvYWRlclBsdWdpbjogVGhlIGNvbGxpZGVyIGdyb3VwICMke2lDb2xsaWRlckdyb3VwfSBhdHRlbXB0ZWQgdG8gcmVmZXJlbmNlIGEgY29sbGlkZXIgIyR7aUNvbGxpZGVyfSBidXQgbm90IGZvdW5kLiBTa2lwcGluZyB0aGUgY29sbGlkZXJgLFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGNvbDtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5maWx0ZXIoKGNvbCk6IGNvbCBpcyBWUk1TcHJpbmdCb25lQ29sbGlkZXIgPT4gY29sICE9IG51bGwpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgY29sbGlkZXJzOiBjb2xzLFxuICAgICAgICAgIG5hbWU6IHNjaGVtYUNvbGxpZGVyR3JvdXAubmFtZSxcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgKTtcblxuICAgIGV4dGVuc2lvbi5zcHJpbmdzPy5mb3JFYWNoKChzY2hlbWFTcHJpbmcsIGlTcHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IHNjaGVtYUpvaW50cyA9IHNjaGVtYVNwcmluZy5qb2ludHM7XG5cbiAgICAgIC8vIHByZXBhcmUgY29sbGlkZXJzXG4gICAgICBjb25zdCBjb2xsaWRlckdyb3Vwc0ZvclNwcmluZyA9IHNjaGVtYVNwcmluZy5jb2xsaWRlckdyb3Vwc1xuICAgICAgICA/Lm1hcCgoaUNvbGxpZGVyR3JvdXApID0+IHtcbiAgICAgICAgICBjb25zdCBncm91cCA9IGNvbGxpZGVyR3JvdXBzPy5baUNvbGxpZGVyR3JvdXBdO1xuXG4gICAgICAgICAgaWYgKGdyb3VwID09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgICAgYFZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW46IFRoZSBzcHJpbmcgIyR7aVNwcmluZ30gYXR0ZW1wdGVkIHRvIHJlZmVyZW5jZSBhIGNvbGxpZGVyIGdyb3VwICMke2lDb2xsaWRlckdyb3VwfSBidXQgbm90IGZvdW5kLiBTa2lwcGluZyB0aGUgY29sbGlkZXIgZ3JvdXBgLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBncm91cDtcbiAgICAgICAgfSlcbiAgICAgICAgLmZpbHRlcigoZ3JvdXApOiBncm91cCBpcyBWUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cCA9PiBncm91cCAhPSBudWxsKTtcblxuICAgICAgY29uc3QgY2VudGVyID0gc2NoZW1hU3ByaW5nLmNlbnRlciAhPSBudWxsID8gdGhyZWVOb2Rlc1tzY2hlbWFTcHJpbmcuY2VudGVyXSA6IHVuZGVmaW5lZDtcblxuICAgICAgbGV0IHByZXZTY2hlbWFKb2ludDogVjFTcHJpbmdCb25lU2NoZW1hLlNwcmluZ0JvbmVKb2ludCB8IHVuZGVmaW5lZDtcbiAgICAgIHNjaGVtYUpvaW50cy5mb3JFYWNoKChzY2hlbWFKb2ludCkgPT4ge1xuICAgICAgICBpZiAocHJldlNjaGVtYUpvaW50KSB7XG4gICAgICAgICAgLy8gcHJlcGFyZSBub2RlXG4gICAgICAgICAgY29uc3Qgbm9kZUluZGV4ID0gcHJldlNjaGVtYUpvaW50Lm5vZGU7XG4gICAgICAgICAgY29uc3Qgbm9kZSA9IHRocmVlTm9kZXNbbm9kZUluZGV4XTtcbiAgICAgICAgICBjb25zdCBjaGlsZEluZGV4ID0gc2NoZW1hSm9pbnQubm9kZTtcbiAgICAgICAgICBjb25zdCBjaGlsZCA9IHRocmVlTm9kZXNbY2hpbGRJbmRleF07XG5cbiAgICAgICAgICAvLyBwcmVwYXJlIHNldHRpbmdcbiAgICAgICAgICBjb25zdCBzZXR0aW5nOiBQYXJ0aWFsPFZSTVNwcmluZ0JvbmVKb2ludFNldHRpbmdzPiA9IHtcbiAgICAgICAgICAgIGhpdFJhZGl1czogcHJldlNjaGVtYUpvaW50LmhpdFJhZGl1cyxcbiAgICAgICAgICAgIGRyYWdGb3JjZTogcHJldlNjaGVtYUpvaW50LmRyYWdGb3JjZSxcbiAgICAgICAgICAgIGdyYXZpdHlQb3dlcjogcHJldlNjaGVtYUpvaW50LmdyYXZpdHlQb3dlcixcbiAgICAgICAgICAgIHN0aWZmbmVzczogcHJldlNjaGVtYUpvaW50LnN0aWZmbmVzcyxcbiAgICAgICAgICAgIGdyYXZpdHlEaXI6XG4gICAgICAgICAgICAgIHByZXZTY2hlbWFKb2ludC5ncmF2aXR5RGlyICE9IG51bGxcbiAgICAgICAgICAgICAgICA/IG5ldyBUSFJFRS5WZWN0b3IzKCkuZnJvbUFycmF5KHByZXZTY2hlbWFKb2ludC5ncmF2aXR5RGlyKVxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgICAgIH07XG5cbiAgICAgICAgICAvLyBjcmVhdGUgc3ByaW5nIGJvbmVzXG4gICAgICAgICAgY29uc3Qgam9pbnQgPSB0aGlzLl9pbXBvcnRKb2ludChub2RlLCBjaGlsZCwgc2V0dGluZywgY29sbGlkZXJHcm91cHNGb3JTcHJpbmcpO1xuICAgICAgICAgIGlmIChjZW50ZXIpIHtcbiAgICAgICAgICAgIGpvaW50LmNlbnRlciA9IGNlbnRlcjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBtYW5hZ2VyLmFkZEpvaW50KGpvaW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByZXZTY2hlbWFKb2ludCA9IHNjaGVtYUpvaW50O1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBpbml0IHNwcmluZyBib25lc1xuICAgIG1hbmFnZXIuc2V0SW5pdFN0YXRlKCk7XG5cbiAgICByZXR1cm4gbWFuYWdlcjtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX3YwSW1wb3J0KGdsdGY6IEdMVEYpOiBQcm9taXNlPFZSTVNwcmluZ0JvbmVNYW5hZ2VyIHwgbnVsbD4ge1xuICAgIGNvbnN0IGpzb24gPSBnbHRmLnBhcnNlci5qc29uIGFzIEdMVEZTY2hlbWEuSUdMVEY7XG5cbiAgICAvLyBlYXJseSBhYm9ydCBpZiBpdCBkb2Vzbid0IHVzZSB2cm1cbiAgICBjb25zdCBpc1ZSTVVzZWQgPSBqc29uLmV4dGVuc2lvbnNVc2VkPy5pbmRleE9mKCdWUk0nKSAhPT0gLTE7XG4gICAgaWYgKCFpc1ZSTVVzZWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIGVhcmx5IGFib3J0IGlmIGl0IGRvZXNuJ3QgaGF2ZSBib25lIGdyb3Vwc1xuICAgIGNvbnN0IGV4dGVuc2lvbiA9IGpzb24uZXh0ZW5zaW9ucz8uWydWUk0nXSBhcyBWMFZSTS5WUk0gfCB1bmRlZmluZWQ7XG4gICAgY29uc3Qgc2NoZW1hU2Vjb25kYXJ5QW5pbWF0aW9uID0gZXh0ZW5zaW9uPy5zZWNvbmRhcnlBbmltYXRpb247XG4gICAgaWYgKCFzY2hlbWFTZWNvbmRhcnlBbmltYXRpb24pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNjaGVtYUJvbmVHcm91cHMgPSBzY2hlbWFTZWNvbmRhcnlBbmltYXRpb24/LmJvbmVHcm91cHM7XG4gICAgaWYgKCFzY2hlbWFCb25lR3JvdXBzKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBtYW5hZ2VyID0gbmV3IFZSTVNwcmluZ0JvbmVNYW5hZ2VyKCk7XG5cbiAgICBjb25zdCB0aHJlZU5vZGVzOiBUSFJFRS5PYmplY3QzRFtdID0gYXdhaXQgZ2x0Zi5wYXJzZXIuZ2V0RGVwZW5kZW5jaWVzKCdub2RlJyk7XG5cbiAgICBjb25zdCBjb2xsaWRlckdyb3VwcyA9IHNjaGVtYVNlY29uZGFyeUFuaW1hdGlvbi5jb2xsaWRlckdyb3Vwcz8ubWFwKFxuICAgICAgKHNjaGVtYUNvbGxpZGVyR3JvdXAsIGlDb2xsaWRlckdyb3VwKTogVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXAgfCBudWxsID0+IHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IHRocmVlTm9kZXNbc2NoZW1hQ29sbGlkZXJHcm91cC5ub2RlIV07XG4gICAgICAgIGlmIChub2RlID09IG51bGwpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICBgVlJNU3ByaW5nQm9uZUxvYWRlclBsdWdpbjogVGhlIGNvbGxpZGVyIGdyb3VwICMke2lDb2xsaWRlckdyb3VwfSBhdHRlbXB0ZWQgdG8gcmVmZXJlbmNlIGEgbm9kZSAjJHtzY2hlbWFDb2xsaWRlckdyb3VwLm5vZGV9IGJ1dCBub3QgZm91bmQuIFNraXBwaW5nIHRoZSBjb2xsaWRlciBncm91cGAsXG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbGxpZGVycyA9IChzY2hlbWFDb2xsaWRlckdyb3VwLmNvbGxpZGVycyA/PyBbXSkubWFwKChzY2hlbWFDb2xsaWRlciwgaUNvbGxpZGVyKSA9PiB7XG4gICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gbmV3IFRIUkVFLlZlY3RvcjMoMC4wLCAwLjAsIDAuMCk7XG4gICAgICAgICAgaWYgKHNjaGVtYUNvbGxpZGVyLm9mZnNldCkge1xuICAgICAgICAgICAgb2Zmc2V0LnNldChcbiAgICAgICAgICAgICAgc2NoZW1hQ29sbGlkZXIub2Zmc2V0LnggPz8gMC4wLFxuICAgICAgICAgICAgICBzY2hlbWFDb2xsaWRlci5vZmZzZXQueSA/PyAwLjAsXG4gICAgICAgICAgICAgIHNjaGVtYUNvbGxpZGVyLm9mZnNldC56ID8gLXNjaGVtYUNvbGxpZGVyLm9mZnNldC56IDogMC4wLCAvLyB6IGlzIG9wcG9zaXRlIGluIFZSTTAuMFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gdGhpcy5faW1wb3J0U3BoZXJlQ29sbGlkZXIobm9kZSwge1xuICAgICAgICAgICAgb2Zmc2V0LFxuICAgICAgICAgICAgcmFkaXVzOiBzY2hlbWFDb2xsaWRlci5yYWRpdXMgPz8gMC4wLFxuICAgICAgICAgICAgaW5zaWRlOiBmYWxzZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHsgY29sbGlkZXJzIH07XG4gICAgICB9LFxuICAgICk7XG5cbiAgICAvLyBpbXBvcnQgc3ByaW5nIGJvbmVzIGZvciBlYWNoIHNwcmluZyBib25lIGdyb3Vwc1xuICAgIHNjaGVtYUJvbmVHcm91cHM/LmZvckVhY2goKHNjaGVtYUJvbmVHcm91cCwgaUJvbmVHcm91cCkgPT4ge1xuICAgICAgY29uc3Qgcm9vdEluZGljZXMgPSBzY2hlbWFCb25lR3JvdXAuYm9uZXM7XG4gICAgICBpZiAoIXJvb3RJbmRpY2VzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcm9vdEluZGljZXMuZm9yRWFjaCgocm9vdEluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IHJvb3QgPSB0aHJlZU5vZGVzW3Jvb3RJbmRleF07XG4gICAgICAgIGlmIChyb290ID09IG51bGwpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICBgVlJNU3ByaW5nQm9uZUxvYWRlclBsdWdpbjogVGhlIHNwcmluZyBib25lIGdyb3VwICMke2lCb25lR3JvdXB9IGF0dGVtcHRlZCB0byByZWZlcmVuY2UgYSBub2RlICMke3Jvb3RJbmRleH0gYnV0IG5vdCBmb3VuZC4gU2tpcHBpbmcgdGhlIG5vZGVgLFxuICAgICAgICAgICk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcHJlcGFyZSBzZXR0aW5nXG4gICAgICAgIGNvbnN0IGdyYXZpdHlEaXIgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuICAgICAgICBpZiAoc2NoZW1hQm9uZUdyb3VwLmdyYXZpdHlEaXIpIHtcbiAgICAgICAgICBncmF2aXR5RGlyLnNldChcbiAgICAgICAgICAgIHNjaGVtYUJvbmVHcm91cC5ncmF2aXR5RGlyLnggPz8gMC4wLFxuICAgICAgICAgICAgc2NoZW1hQm9uZUdyb3VwLmdyYXZpdHlEaXIueSA/PyAwLjAsXG4gICAgICAgICAgICBzY2hlbWFCb25lR3JvdXAuZ3Jhdml0eURpci56ID8/IDAuMCxcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGdyYXZpdHlEaXIuc2V0KDAuMCwgLTEuMCwgMC4wKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNlbnRlciA9IHNjaGVtYUJvbmVHcm91cC5jZW50ZXIgIT0gbnVsbCA/IHRocmVlTm9kZXNbc2NoZW1hQm9uZUdyb3VwLmNlbnRlcl0gOiB1bmRlZmluZWQ7XG5cbiAgICAgICAgY29uc3Qgc2V0dGluZzogUGFydGlhbDxWUk1TcHJpbmdCb25lSm9pbnRTZXR0aW5ncz4gPSB7XG4gICAgICAgICAgaGl0UmFkaXVzOiBzY2hlbWFCb25lR3JvdXAuaGl0UmFkaXVzLFxuICAgICAgICAgIGRyYWdGb3JjZTogc2NoZW1hQm9uZUdyb3VwLmRyYWdGb3JjZSxcbiAgICAgICAgICBncmF2aXR5UG93ZXI6IHNjaGVtYUJvbmVHcm91cC5ncmF2aXR5UG93ZXIsXG4gICAgICAgICAgc3RpZmZuZXNzOiBzY2hlbWFCb25lR3JvdXAuc3RpZmZpbmVzcyxcbiAgICAgICAgICBncmF2aXR5RGlyLFxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIHByZXBhcmUgY29sbGlkZXJzXG4gICAgICAgIGNvbnN0IGNvbGxpZGVyR3JvdXBzRm9yU3ByaW5nID0gc2NoZW1hQm9uZUdyb3VwLmNvbGxpZGVyR3JvdXBzXG4gICAgICAgICAgPy5tYXAoKGlDb2xsaWRlckdyb3VwKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBncm91cCA9IGNvbGxpZGVyR3JvdXBzPy5baUNvbGxpZGVyR3JvdXBdO1xuXG4gICAgICAgICAgICBpZiAoZ3JvdXAgPT0gbnVsbCkge1xuICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICAgICAgYFZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW46IFRoZSBzcHJpbmcgIyR7aUJvbmVHcm91cH0gYXR0ZW1wdGVkIHRvIHJlZmVyZW5jZSBhIGNvbGxpZGVyIGdyb3VwICMke2lDb2xsaWRlckdyb3VwfSBidXQgbm90IGZvdW5kLiBTa2lwcGluZyB0aGUgY29sbGlkZXIgZ3JvdXBgLFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGdyb3VwO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmZpbHRlcigoZ3JvdXApOiBncm91cCBpcyBWUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cCA9PiBncm91cCAhPSBudWxsKTtcblxuICAgICAgICAvLyBjcmVhdGUgc3ByaW5nIGJvbmVzXG4gICAgICAgIHJvb3QudHJhdmVyc2UoKG5vZGUpID0+IHtcbiAgICAgICAgICBjb25zdCBjaGlsZDogVEhSRUUuT2JqZWN0M0QgfCBudWxsID0gbm9kZS5jaGlsZHJlblswXSA/PyBudWxsO1xuXG4gICAgICAgICAgY29uc3Qgam9pbnQgPSB0aGlzLl9pbXBvcnRKb2ludChub2RlLCBjaGlsZCwgc2V0dGluZywgY29sbGlkZXJHcm91cHNGb3JTcHJpbmcpO1xuICAgICAgICAgIGlmIChjZW50ZXIpIHtcbiAgICAgICAgICAgIGpvaW50LmNlbnRlciA9IGNlbnRlcjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBtYW5hZ2VyLmFkZEpvaW50KGpvaW50KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIGluaXQgc3ByaW5nIGJvbmVzXG4gICAgZ2x0Zi5zY2VuZS51cGRhdGVNYXRyaXhXb3JsZCgpO1xuICAgIG1hbmFnZXIuc2V0SW5pdFN0YXRlKCk7XG5cbiAgICByZXR1cm4gbWFuYWdlcjtcbiAgfVxuXG4gIHByaXZhdGUgX2ltcG9ydEpvaW50KFxuICAgIG5vZGU6IFRIUkVFLk9iamVjdDNELFxuICAgIGNoaWxkOiBUSFJFRS5PYmplY3QzRCxcbiAgICBzZXR0aW5nPzogUGFydGlhbDxWUk1TcHJpbmdCb25lSm9pbnRTZXR0aW5ncz4sXG4gICAgY29sbGlkZXJHcm91cHNGb3JTcHJpbmc/OiBWUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cFtdLFxuICApOiBWUk1TcHJpbmdCb25lSm9pbnQge1xuICAgIGNvbnN0IHNwcmluZ0JvbmUgPSBuZXcgVlJNU3ByaW5nQm9uZUpvaW50KG5vZGUsIGNoaWxkLCBzZXR0aW5nLCBjb2xsaWRlckdyb3Vwc0ZvclNwcmluZyk7XG5cbiAgICBpZiAodGhpcy5qb2ludEhlbHBlclJvb3QpIHtcbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBWUk1TcHJpbmdCb25lSm9pbnRIZWxwZXIoc3ByaW5nQm9uZSk7XG4gICAgICB0aGlzLmpvaW50SGVscGVyUm9vdC5hZGQoaGVscGVyKTtcbiAgICAgIGhlbHBlci5yZW5kZXJPcmRlciA9IHRoaXMuam9pbnRIZWxwZXJSb290LnJlbmRlck9yZGVyO1xuICAgIH1cblxuICAgIHJldHVybiBzcHJpbmdCb25lO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW1wb3J0U3BoZXJlQ29sbGlkZXIoXG4gICAgZGVzdGluYXRpb246IFRIUkVFLk9iamVjdDNELFxuICAgIHBhcmFtczoge1xuICAgICAgb2Zmc2V0OiBUSFJFRS5WZWN0b3IzO1xuICAgICAgcmFkaXVzOiBudW1iZXI7XG4gICAgICBpbnNpZGU6IGJvb2xlYW47XG4gICAgfSxcbiAgKTogVlJNU3ByaW5nQm9uZUNvbGxpZGVyIHtcbiAgICBjb25zdCBzaGFwZSA9IG5ldyBWUk1TcHJpbmdCb25lQ29sbGlkZXJTaGFwZVNwaGVyZShwYXJhbXMpO1xuXG4gICAgY29uc3QgY29sbGlkZXIgPSBuZXcgVlJNU3ByaW5nQm9uZUNvbGxpZGVyKHNoYXBlKTtcblxuICAgIGRlc3RpbmF0aW9uLmFkZChjb2xsaWRlcik7XG5cbiAgICBpZiAodGhpcy5jb2xsaWRlckhlbHBlclJvb3QpIHtcbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBWUk1TcHJpbmdCb25lQ29sbGlkZXJIZWxwZXIoY29sbGlkZXIpO1xuICAgICAgdGhpcy5jb2xsaWRlckhlbHBlclJvb3QuYWRkKGhlbHBlcik7XG4gICAgICBoZWxwZXIucmVuZGVyT3JkZXIgPSB0aGlzLmNvbGxpZGVySGVscGVyUm9vdC5yZW5kZXJPcmRlcjtcbiAgICB9XG5cbiAgICByZXR1cm4gY29sbGlkZXI7XG4gIH1cblxuICBwcml2YXRlIF9pbXBvcnRDYXBzdWxlQ29sbGlkZXIoXG4gICAgZGVzdGluYXRpb246IFRIUkVFLk9iamVjdDNELFxuICAgIHBhcmFtczoge1xuICAgICAgb2Zmc2V0OiBUSFJFRS5WZWN0b3IzO1xuICAgICAgcmFkaXVzOiBudW1iZXI7XG4gICAgICB0YWlsOiBUSFJFRS5WZWN0b3IzO1xuICAgICAgaW5zaWRlOiBib29sZWFuO1xuICAgIH0sXG4gICk6IFZSTVNwcmluZ0JvbmVDb2xsaWRlciB7XG4gICAgY29uc3Qgc2hhcGUgPSBuZXcgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVDYXBzdWxlKHBhcmFtcyk7XG5cbiAgICBjb25zdCBjb2xsaWRlciA9IG5ldyBWUk1TcHJpbmdCb25lQ29sbGlkZXIoc2hhcGUpO1xuXG4gICAgZGVzdGluYXRpb24uYWRkKGNvbGxpZGVyKTtcblxuICAgIGlmICh0aGlzLmNvbGxpZGVySGVscGVyUm9vdCkge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IFZSTVNwcmluZ0JvbmVDb2xsaWRlckhlbHBlcihjb2xsaWRlcik7XG4gICAgICB0aGlzLmNvbGxpZGVySGVscGVyUm9vdC5hZGQoaGVscGVyKTtcbiAgICAgIGhlbHBlci5yZW5kZXJPcmRlciA9IHRoaXMuY29sbGlkZXJIZWxwZXJSb290LnJlbmRlck9yZGVyO1xuICAgIH1cblxuICAgIHJldHVybiBjb2xsaWRlcjtcbiAgfVxuXG4gIHByaXZhdGUgX2ltcG9ydFBsYW5lQ29sbGlkZXIoXG4gICAgZGVzdGluYXRpb246IFRIUkVFLk9iamVjdDNELFxuICAgIHBhcmFtczoge1xuICAgICAgb2Zmc2V0OiBUSFJFRS5WZWN0b3IzO1xuICAgICAgbm9ybWFsOiBUSFJFRS5WZWN0b3IzO1xuICAgIH0sXG4gICk6IFZSTVNwcmluZ0JvbmVDb2xsaWRlciB7XG4gICAgY29uc3Qgc2hhcGUgPSBuZXcgVlJNU3ByaW5nQm9uZUNvbGxpZGVyU2hhcGVQbGFuZShwYXJhbXMpO1xuXG4gICAgY29uc3QgY29sbGlkZXIgPSBuZXcgVlJNU3ByaW5nQm9uZUNvbGxpZGVyKHNoYXBlKTtcblxuICAgIGRlc3RpbmF0aW9uLmFkZChjb2xsaWRlcik7XG5cbiAgICBpZiAodGhpcy5jb2xsaWRlckhlbHBlclJvb3QpIHtcbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBWUk1TcHJpbmdCb25lQ29sbGlkZXJIZWxwZXIoY29sbGlkZXIpO1xuICAgICAgdGhpcy5jb2xsaWRlckhlbHBlclJvb3QuYWRkKGhlbHBlcik7XG4gICAgICBoZWxwZXIucmVuZGVyT3JkZXIgPSB0aGlzLmNvbGxpZGVySGVscGVyUm9vdC5yZW5kZXJPcmRlcjtcbiAgICB9XG5cbiAgICByZXR1cm4gY29sbGlkZXI7XG4gIH1cbn1cbiIsICJpbXBvcnQgdHlwZSAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuZXhwb3J0IGZ1bmN0aW9uIHRyYXZlcnNlQW5jZXN0b3JzRnJvbVJvb3Qob2JqZWN0OiBUSFJFRS5PYmplY3QzRCwgY2FsbGJhY2s6IChvYmplY3Q6IFRIUkVFLk9iamVjdDNEKSA9PiB2b2lkKTogdm9pZCB7XG4gIGNvbnN0IGFuY2VzdG9yczogVEhSRUUuT2JqZWN0M0RbXSA9IFtdO1xuXG4gIGxldCBoZWFkOiBUSFJFRS5PYmplY3QzRCB8IG51bGwgPSBvYmplY3Q7XG4gIHdoaWxlIChoZWFkICE9PSBudWxsKSB7XG4gICAgYW5jZXN0b3JzLnVuc2hpZnQoaGVhZCk7XG4gICAgaGVhZCA9IGhlYWQucGFyZW50O1xuICB9XG5cbiAgYW5jZXN0b3JzLmZvckVhY2goKGFuY2VzdG9yKSA9PiB7XG4gICAgY2FsbGJhY2soYW5jZXN0b3IpO1xuICB9KTtcbn1cbiIsICJpbXBvcnQgdHlwZSAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBUcmF2ZXJzZSBjaGlsZHJlbiBvZiBnaXZlbiBvYmplY3QgYW5kIGV4ZWN1dGUgZ2l2ZW4gY2FsbGJhY2suXG4gKiBUaGUgZ2l2ZW4gb2JqZWN0IGl0c2VsZiB3b250IGJlIGdpdmVuIHRvIHRoZSBjYWxsYmFjay5cbiAqIElmIHRoZSByZXR1cm4gdmFsdWUgb2YgdGhlIGNhbGxiYWNrIGlzIGB0cnVlYCwgaXQgd2lsbCBoYWx0IHRoZSB0cmF2ZXJzYWwgb2YgaXRzIGNoaWxkcmVuLlxuICogQHBhcmFtIG9iamVjdCBBIHJvb3Qgb2JqZWN0XG4gKiBAcGFyYW0gY2FsbGJhY2sgQSBjYWxsYmFjayBmdW5jdGlvbiBjYWxsZWQgZm9yIGVhY2ggY2hpbGRyZW5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRyYXZlcnNlQ2hpbGRyZW5VbnRpbENvbmRpdGlvbk1ldChcbiAgb2JqZWN0OiBUSFJFRS5PYmplY3QzRCxcbiAgY2FsbGJhY2s6IChvYmplY3Q6IFRIUkVFLk9iamVjdDNEKSA9PiBib29sZWFuLFxuKTogdm9pZCB7XG4gIG9iamVjdC5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IGNhbGxiYWNrKGNoaWxkKTtcbiAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgdHJhdmVyc2VDaGlsZHJlblVudGlsQ29uZGl0aW9uTWV0KGNoaWxkLCBjYWxsYmFjayk7XG4gICAgfVxuICB9KTtcbn1cbiIsICJpbXBvcnQgdHlwZSAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBGaW5kcyB0aGUgbG93ZXN0IGNvbW1vbiBhbmNlc3RvcnMgb2YgdGhlIGdpdmVuIG9iamVjdHMsIGlmIGl0IGV4aXN0cy5cbiAqIEBwYXJhbSBvYmplY3RzIFRoZSBvYmplY3RzIHRvIGZpbmQgdGhlIGxvd2VzdCBjb21tb24gYW5jZXN0b3IgZm9yLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbG93ZXN0Q29tbW9uQW5jZXN0b3Iob2JqZWN0czogU2V0PFRIUkVFLk9iamVjdDNEPik6IFRIUkVFLk9iamVjdDNEIHwgbnVsbCB7XG4gIGNvbnN0IHNoYXJlZEFuY2VzdG9ycyA9IG5ldyBNYXA8VEhSRUUuT2JqZWN0M0QsIG51bWJlcj4oKTtcbiAgZm9yIChjb25zdCBvYmplY3Qgb2Ygb2JqZWN0cykge1xuICAgIGxldCBjdXJyZW50OiBUSFJFRS5PYmplY3QzRCB8IG51bGwgPSBvYmplY3Q7XG4gICAgZG8ge1xuICAgICAgY29uc3QgbmV3VmFsdWUgPSAoc2hhcmVkQW5jZXN0b3JzLmdldChjdXJyZW50KSA/PyAwKSArIDE7XG4gICAgICBpZiAobmV3VmFsdWUgPT09IG9iamVjdHMuc2l6ZSkge1xuICAgICAgICByZXR1cm4gY3VycmVudDtcbiAgICAgIH1cbiAgICAgIHNoYXJlZEFuY2VzdG9ycy5zZXQoY3VycmVudCwgbmV3VmFsdWUpO1xuICAgICAgY3VycmVudCA9IGN1cnJlbnQucGFyZW50O1xuICAgIH0gd2hpbGUgKGN1cnJlbnQgIT09IG51bGwpO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuIiwgImltcG9ydCB0eXBlICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHR5cGUgeyBWUk1TcHJpbmdCb25lSm9pbnQgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVKb2ludC5qcyc7XG5pbXBvcnQgeyB0cmF2ZXJzZUFuY2VzdG9yc0Zyb21Sb290IH0gZnJvbSAnLi91dGlscy90cmF2ZXJzZUFuY2VzdG9yc0Zyb21Sb290LmpzJztcbmltcG9ydCB0eXBlIHsgVlJNU3ByaW5nQm9uZUNvbGxpZGVyIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lQ29sbGlkZXIuanMnO1xuaW1wb3J0IHR5cGUgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cCB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXAuanMnO1xuaW1wb3J0IHsgdHJhdmVyc2VDaGlsZHJlblVudGlsQ29uZGl0aW9uTWV0IH0gZnJvbSAnLi91dGlscy90cmF2ZXJzZUNoaWxkcmVuVW50aWxDb25kaXRpb25NZXQuanMnO1xuaW1wb3J0IHsgbG93ZXN0Q29tbW9uQW5jZXN0b3IgfSBmcm9tICcuL3V0aWxzL2xvd2VzdENvbW1vbkFuY2VzdG9yLmpzJztcblxuZXhwb3J0IGNsYXNzIFZSTVNwcmluZ0JvbmVNYW5hZ2VyIHtcbiAgcHJpdmF0ZSBfam9pbnRzID0gbmV3IFNldDxWUk1TcHJpbmdCb25lSm9pbnQ+KCk7XG4gIHByaXZhdGUgX3NvcnRlZEpvaW50czogQXJyYXk8VlJNU3ByaW5nQm9uZUpvaW50PiA9IFtdO1xuICBwcml2YXRlIF9oYXNXYXJuZWRDaXJjdWxhckRlcGVuZGVuY3kgPSBmYWxzZTtcblxuICAvKipcbiAgICogQW4gb3JkZXJlZCBsaXN0IG9mIGFuY2VzdG9ycyBvZiBhbGwgdGhlIFNwcmluZ0JvbmUgam9pbnRzLiBCZWZvcmUgdGhlXG4gICAqIFNwcmluZ0JvbmUgam9pbnRzIGNhbiBiZSB1cGRhdGVkLCB0aGUgd29ybGQgbWF0cmljZXMgb2YgdGhlc2UgYW5jZXN0b3JzXG4gICAqIG11c3QgYmUgY2FsY3VsYXRlZC4gVGhlIGZpcnN0IGVsZW1lbnQgaXMgdGhlIGxvd2VzdCBjb21tb24gYW5jZXN0b3IsIGZvclxuICAgKiB3aGljaCBub3Qgb25seSBpdHMgd29ybGQgbWF0cml4IGJ1dCBpdHMgYW5jZXN0b3JzJyB3b3JsZCBtYXRyaWNlcyBhcmVcbiAgICogdXBkYXRlZCBhcyB3ZWxsLlxuICAgKi9cbiAgcHJpdmF0ZSBfYW5jZXN0b3JzOiBUSFJFRS5PYmplY3QzRFtdID0gW107XG5cbiAgcHVibGljIGdldCBqb2ludHMoKTogU2V0PFZSTVNwcmluZ0JvbmVKb2ludD4ge1xuICAgIHJldHVybiB0aGlzLl9qb2ludHM7XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVXNlIHtAbGluayBqb2ludHN9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHNwcmluZ0JvbmVzKCk6IFNldDxWUk1TcHJpbmdCb25lSm9pbnQ+IHtcbiAgICBjb25zb2xlLndhcm4oJ1ZSTVNwcmluZ0JvbmVNYW5hZ2VyOiBzcHJpbmdCb25lcyBpcyBkZXByZWNhdGVkLiB1c2Ugam9pbnRzIGluc3RlYWQuJyk7XG5cbiAgICByZXR1cm4gdGhpcy5fam9pbnRzO1xuICB9XG5cbiAgcHVibGljIGdldCBjb2xsaWRlckdyb3VwcygpOiBWUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cFtdIHtcbiAgICBjb25zdCBzZXQgPSBuZXcgU2V0PFZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwPigpO1xuICAgIHRoaXMuX2pvaW50cy5mb3JFYWNoKChzcHJpbmdCb25lKSA9PiB7XG4gICAgICBzcHJpbmdCb25lLmNvbGxpZGVyR3JvdXBzLmZvckVhY2goKGNvbGxpZGVyR3JvdXApID0+IHtcbiAgICAgICAgc2V0LmFkZChjb2xsaWRlckdyb3VwKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBBcnJheS5mcm9tKHNldCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGNvbGxpZGVycygpOiBWUk1TcHJpbmdCb25lQ29sbGlkZXJbXSB7XG4gICAgY29uc3Qgc2V0ID0gbmV3IFNldDxWUk1TcHJpbmdCb25lQ29sbGlkZXI+KCk7XG4gICAgdGhpcy5jb2xsaWRlckdyb3Vwcy5mb3JFYWNoKChjb2xsaWRlckdyb3VwKSA9PiB7XG4gICAgICBjb2xsaWRlckdyb3VwLmNvbGxpZGVycy5mb3JFYWNoKChjb2xsaWRlcikgPT4ge1xuICAgICAgICBzZXQuYWRkKGNvbGxpZGVyKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBBcnJheS5mcm9tKHNldCk7XG4gIH1cblxuICBwcml2YXRlIF9vYmplY3RTcHJpbmdCb25lc01hcCA9IG5ldyBNYXA8VEhSRUUuT2JqZWN0M0QsIFNldDxWUk1TcHJpbmdCb25lSm9pbnQ+PigpO1xuICBwcml2YXRlIF9pc1NvcnRlZEpvaW50c0RpcnR5ID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fcmVsZXZhbnRDaGlsZHJlblVwZGF0ZWQgPSB0aGlzLl9yZWxldmFudENoaWxkcmVuVXBkYXRlZC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgcHVibGljIGFkZEpvaW50KGpvaW50OiBWUk1TcHJpbmdCb25lSm9pbnQpOiB2b2lkIHtcbiAgICB0aGlzLl9qb2ludHMuYWRkKGpvaW50KTtcblxuICAgIGxldCBvYmplY3RTZXQgPSB0aGlzLl9vYmplY3RTcHJpbmdCb25lc01hcC5nZXQoam9pbnQuYm9uZSk7XG4gICAgaWYgKG9iamVjdFNldCA9PSBudWxsKSB7XG4gICAgICBvYmplY3RTZXQgPSBuZXcgU2V0PFZSTVNwcmluZ0JvbmVKb2ludD4oKTtcbiAgICAgIHRoaXMuX29iamVjdFNwcmluZ0JvbmVzTWFwLnNldChqb2ludC5ib25lLCBvYmplY3RTZXQpO1xuICAgIH1cbiAgICBvYmplY3RTZXQuYWRkKGpvaW50KTtcblxuICAgIHRoaXMuX2lzU29ydGVkSm9pbnRzRGlydHkgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFVzZSB7QGxpbmsgYWRkSm9pbnR9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgYWRkU3ByaW5nQm9uZShqb2ludDogVlJNU3ByaW5nQm9uZUpvaW50KTogdm9pZCB7XG4gICAgY29uc29sZS53YXJuKCdWUk1TcHJpbmdCb25lTWFuYWdlcjogYWRkU3ByaW5nQm9uZSgpIGlzIGRlcHJlY2F0ZWQuIHVzZSBhZGRKb2ludCgpIGluc3RlYWQuJyk7XG5cbiAgICB0aGlzLmFkZEpvaW50KGpvaW50KTtcbiAgfVxuXG4gIHB1YmxpYyBkZWxldGVKb2ludChqb2ludDogVlJNU3ByaW5nQm9uZUpvaW50KTogdm9pZCB7XG4gICAgdGhpcy5fam9pbnRzLmRlbGV0ZShqb2ludCk7XG5cbiAgICBjb25zdCBvYmplY3RTZXQgPSB0aGlzLl9vYmplY3RTcHJpbmdCb25lc01hcC5nZXQoam9pbnQuYm9uZSkhO1xuICAgIG9iamVjdFNldC5kZWxldGUoam9pbnQpO1xuXG4gICAgdGhpcy5faXNTb3J0ZWRKb2ludHNEaXJ0eSA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVXNlIHtAbGluayBkZWxldGVKb2ludH0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBkZWxldGVTcHJpbmdCb25lKGpvaW50OiBWUk1TcHJpbmdCb25lSm9pbnQpOiB2b2lkIHtcbiAgICBjb25zb2xlLndhcm4oJ1ZSTVNwcmluZ0JvbmVNYW5hZ2VyOiBkZWxldGVTcHJpbmdCb25lKCkgaXMgZGVwcmVjYXRlZC4gdXNlIGRlbGV0ZUpvaW50KCkgaW5zdGVhZC4nKTtcblxuICAgIHRoaXMuZGVsZXRlSm9pbnQoam9pbnQpO1xuICB9XG5cbiAgcHVibGljIHNldEluaXRTdGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9zb3J0Sm9pbnRzKCk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3NvcnRlZEpvaW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgc3ByaW5nQm9uZSA9IHRoaXMuX3NvcnRlZEpvaW50c1tpXTtcbiAgICAgIHNwcmluZ0JvbmUuYm9uZS51cGRhdGVNYXRyaXgoKTtcbiAgICAgIHNwcmluZ0JvbmUuYm9uZS51cGRhdGVXb3JsZE1hdHJpeChmYWxzZSwgZmFsc2UpO1xuICAgICAgc3ByaW5nQm9uZS5zZXRJbml0U3RhdGUoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy5fc29ydEpvaW50cygpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9zb3J0ZWRKb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHNwcmluZ0JvbmUgPSB0aGlzLl9zb3J0ZWRKb2ludHNbaV07XG4gICAgICBzcHJpbmdCb25lLmJvbmUudXBkYXRlTWF0cml4KCk7XG4gICAgICBzcHJpbmdCb25lLmJvbmUudXBkYXRlV29ybGRNYXRyaXgoZmFsc2UsIGZhbHNlKTtcbiAgICAgIHNwcmluZ0JvbmUucmVzZXQoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9zb3J0Sm9pbnRzKCk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2FuY2VzdG9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5fYW5jZXN0b3JzW2ldLnVwZGF0ZVdvcmxkTWF0cml4KGkgPT09IDAsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3NvcnRlZEpvaW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgLy8gdXBkYXRlIHRoZSBzcHJpbmdib25lXG4gICAgICBjb25zdCBzcHJpbmdCb25lID0gdGhpcy5fc29ydGVkSm9pbnRzW2ldO1xuICAgICAgc3ByaW5nQm9uZS5ib25lLnVwZGF0ZU1hdHJpeCgpO1xuICAgICAgc3ByaW5nQm9uZS5ib25lLnVwZGF0ZVdvcmxkTWF0cml4KGZhbHNlLCBmYWxzZSk7XG4gICAgICBzcHJpbmdCb25lLnVwZGF0ZShkZWx0YSk7XG5cbiAgICAgIC8vIHVwZGF0ZSBjaGlsZHJlbiB3b3JsZCBtYXRyaWNlc1xuICAgICAgLy8gaXQgaXMgcmVxdWlyZWQgd2hlbiB0aGUgc3ByaW5nIGJvbmUgY2hhaW4gaXMgc3BhcnNlXG4gICAgICB0cmF2ZXJzZUNoaWxkcmVuVW50aWxDb25kaXRpb25NZXQoc3ByaW5nQm9uZS5ib25lLCB0aGlzLl9yZWxldmFudENoaWxkcmVuVXBkYXRlZCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNvcnRzIHRoZSBqb2ludHMgZW5zdXJpbmcgdGhleSBhcmUgdXBkYXRlZCBpbiB0aGUgY29ycmVjdCBvcmRlciB0YWtpbmcgZGVwZW5kZW5jaWVzIGludG8gYWNjb3VudC5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgdXBkYXRlcyB7QGxpbmsgX3NvcnRlZEpvaW50c30gYW5kIHtAbGluayBfYW5jZXN0b3JzfS5cbiAgICogTWFrZSBzdXJlIHRvIGNhbGwgdGhpcyBiZWZvcmUgdXNpbmcgdGhlbS5cbiAgICovXG4gIHByaXZhdGUgX3NvcnRKb2ludHMoKSB7XG4gICAgaWYgKCF0aGlzLl9pc1NvcnRlZEpvaW50c0RpcnR5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc3ByaW5nQm9uZU9yZGVyOiBBcnJheTxWUk1TcHJpbmdCb25lSm9pbnQ+ID0gW107XG4gICAgY29uc3Qgc3ByaW5nQm9uZXNUcmllZCA9IG5ldyBTZXQ8VlJNU3ByaW5nQm9uZUpvaW50PigpO1xuICAgIGNvbnN0IHNwcmluZ0JvbmVzRG9uZSA9IG5ldyBTZXQ8VlJNU3ByaW5nQm9uZUpvaW50PigpO1xuICAgIGNvbnN0IGFuY2VzdG9ycyA9IG5ldyBTZXQ8VEhSRUUuT2JqZWN0M0Q+KCk7XG5cbiAgICBmb3IgKGNvbnN0IHNwcmluZ0JvbmUgb2YgdGhpcy5fam9pbnRzKSB7XG4gICAgICB0aGlzLl9pbnNlcnRKb2ludFNvcnQoc3ByaW5nQm9uZSwgc3ByaW5nQm9uZXNUcmllZCwgc3ByaW5nQm9uZXNEb25lLCBzcHJpbmdCb25lT3JkZXIsIGFuY2VzdG9ycyk7XG4gICAgfVxuICAgIHRoaXMuX3NvcnRlZEpvaW50cyA9IHNwcmluZ0JvbmVPcmRlcjtcblxuICAgIGNvbnN0IGxjYSA9IGxvd2VzdENvbW1vbkFuY2VzdG9yKGFuY2VzdG9ycyk7XG4gICAgdGhpcy5fYW5jZXN0b3JzID0gW107XG4gICAgaWYgKGxjYSkge1xuICAgICAgdGhpcy5fYW5jZXN0b3JzLnB1c2gobGNhKTtcbiAgICAgIHRyYXZlcnNlQ2hpbGRyZW5VbnRpbENvbmRpdGlvbk1ldChsY2EsIChvYmplY3Q6IFRIUkVFLk9iamVjdDNEKSA9PiB7XG4gICAgICAgIC8vIGlmIHRoZSBvYmplY3QgaGFzIGF0dGFjaGVkIHNwcmluZ2JvbmUsIGhhbHQgdGhlIHRyYXZlcnNhbFxuICAgICAgICBpZiAoKHRoaXMuX29iamVjdFNwcmluZ0JvbmVzTWFwLmdldChvYmplY3QpPy5zaXplID8/IDApID4gMCkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2FuY2VzdG9ycy5wdXNoKG9iamVjdCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuX2lzU29ydGVkSm9pbnRzRGlydHkgPSBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgX2luc2VydEpvaW50U29ydChcbiAgICBzcHJpbmdCb25lOiBWUk1TcHJpbmdCb25lSm9pbnQsXG4gICAgc3ByaW5nQm9uZXNUcmllZDogU2V0PFZSTVNwcmluZ0JvbmVKb2ludD4sXG4gICAgc3ByaW5nQm9uZXNEb25lOiBTZXQ8VlJNU3ByaW5nQm9uZUpvaW50PixcbiAgICBzcHJpbmdCb25lT3JkZXI6IEFycmF5PFZSTVNwcmluZ0JvbmVKb2ludD4sXG4gICAgYW5jZXN0b3JzOiBTZXQ8VEhSRUUuT2JqZWN0M0Q+LFxuICApIHtcbiAgICBpZiAoc3ByaW5nQm9uZXNEb25lLmhhcyhzcHJpbmdCb25lKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChzcHJpbmdCb25lc1RyaWVkLmhhcyhzcHJpbmdCb25lKSkge1xuICAgICAgaWYgKCF0aGlzLl9oYXNXYXJuZWRDaXJjdWxhckRlcGVuZGVuY3kpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdWUk1TcHJpbmdCb25lTWFuYWdlcjogQ2lyY3VsYXIgZGVwZW5kZW5jeSBkZXRlY3RlZCcpO1xuICAgICAgICB0aGlzLl9oYXNXYXJuZWRDaXJjdWxhckRlcGVuZGVuY3kgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNwcmluZ0JvbmVzVHJpZWQuYWRkKHNwcmluZ0JvbmUpO1xuXG4gICAgY29uc3QgZGVwT2JqZWN0cyA9IHNwcmluZ0JvbmUuZGVwZW5kZW5jaWVzO1xuICAgIGZvciAoY29uc3QgZGVwT2JqZWN0IG9mIGRlcE9iamVjdHMpIHtcbiAgICAgIGxldCBlbmNvdW50ZXJlZFNwcmluZ0JvbmUgPSBmYWxzZTtcbiAgICAgIGxldCBhbmNlc3RvcjogVEhSRUUuT2JqZWN0M0QgfCBudWxsID0gbnVsbDtcbiAgICAgIHRyYXZlcnNlQW5jZXN0b3JzRnJvbVJvb3QoZGVwT2JqZWN0LCAoZGVwT2JqZWN0QW5jZXN0b3IpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqZWN0U2V0ID0gdGhpcy5fb2JqZWN0U3ByaW5nQm9uZXNNYXAuZ2V0KGRlcE9iamVjdEFuY2VzdG9yKTtcbiAgICAgICAgaWYgKG9iamVjdFNldCkge1xuICAgICAgICAgIGZvciAoY29uc3QgZGVwU3ByaW5nQm9uZSBvZiBvYmplY3RTZXQpIHtcbiAgICAgICAgICAgIGVuY291bnRlcmVkU3ByaW5nQm9uZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9pbnNlcnRKb2ludFNvcnQoZGVwU3ByaW5nQm9uZSwgc3ByaW5nQm9uZXNUcmllZCwgc3ByaW5nQm9uZXNEb25lLCBzcHJpbmdCb25lT3JkZXIsIGFuY2VzdG9ycyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKCFlbmNvdW50ZXJlZFNwcmluZ0JvbmUpIHtcbiAgICAgICAgICAvLyBUaGlzIG9iamVjdCBpcyBhbiBhbmNlc3RvciBvZiBhIHNwcmluZyBib25lLCBidXQgaXMgTk9UIGEgc3BhcnNlIG5vZGUgaW4gYmV0d2VlbiBzcHJpbmcgYm9uZXMuXG4gICAgICAgICAgYW5jZXN0b3IgPSBkZXBPYmplY3RBbmNlc3RvcjtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAoYW5jZXN0b3IpIHtcbiAgICAgICAgYW5jZXN0b3JzLmFkZChhbmNlc3Rvcik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc3ByaW5nQm9uZU9yZGVyLnB1c2goc3ByaW5nQm9uZSk7XG5cbiAgICBzcHJpbmdCb25lc0RvbmUuYWRkKHNwcmluZ0JvbmUpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVsZXZhbnRDaGlsZHJlblVwZGF0ZWQob2JqZWN0OiBUSFJFRS5PYmplY3QzRCkge1xuICAgIC8vIGlmIHRoZSBvYmplY3QgaGFzIGF0dGFjaGVkIHNwcmluZ2JvbmUsIGhhbHQgdGhlIHRyYXZlcnNhbFxuICAgIGlmICgodGhpcy5fb2JqZWN0U3ByaW5nQm9uZXNNYXAuZ2V0KG9iamVjdCk/LnNpemUgPz8gMCkgPiAwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBvdGhlcndpc2UgdXBkYXRlIGl0cyB3b3JsZCBtYXRyaXhcbiAgICBvYmplY3QudXBkYXRlV29ybGRNYXRyaXgoZmFsc2UsIGZhbHNlKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBHTFRGLCBHTFRGTG9hZGVyUGx1Z2luLCBHTFRGUGFyc2VyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlci5qcyc7XG5pbXBvcnQge1xuICBWUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luLFxuICBWUk1GaXJzdFBlcnNvbkxvYWRlclBsdWdpbixcbiAgVlJNSHVtYW5vaWQsXG4gIFZSTUh1bWFub2lkTG9hZGVyUGx1Z2luLFxuICBWUk1Mb29rQXRMb2FkZXJQbHVnaW4sXG4gIFZSTU1ldGEsXG4gIFZSTU1ldGFMb2FkZXJQbHVnaW4sXG59IGZyb20gJ0BwaXhpdi90aHJlZS12cm0tY29yZSc7XG5pbXBvcnQgeyBNVG9vbk1hdGVyaWFsTG9hZGVyUGx1Z2luIH0gZnJvbSAnQHBpeGl2L3RocmVlLXZybS1tYXRlcmlhbHMtbXRvb24nO1xuaW1wb3J0IHsgVlJNTWF0ZXJpYWxzSERSRW1pc3NpdmVNdWx0aXBsaWVyTG9hZGVyUGx1Z2luIH0gZnJvbSAnQHBpeGl2L3RocmVlLXZybS1tYXRlcmlhbHMtaGRyLWVtaXNzaXZlLW11bHRpcGxpZXInO1xuaW1wb3J0IHsgVlJNTWF0ZXJpYWxzVjBDb21wYXRQbHVnaW4gfSBmcm9tICdAcGl4aXYvdGhyZWUtdnJtLW1hdGVyaWFscy12MGNvbXBhdCc7XG5pbXBvcnQgeyBWUk1Ob2RlQ29uc3RyYWludExvYWRlclBsdWdpbiB9IGZyb20gJ0BwaXhpdi90aHJlZS12cm0tbm9kZS1jb25zdHJhaW50JztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW4gfSBmcm9tICdAcGl4aXYvdGhyZWUtdnJtLXNwcmluZ2JvbmUnO1xuaW1wb3J0IHsgVlJNTG9hZGVyUGx1Z2luT3B0aW9ucyB9IGZyb20gJy4vVlJNTG9hZGVyUGx1Z2luT3B0aW9ucyc7XG5pbXBvcnQgeyBWUk0gfSBmcm9tICcuL1ZSTSc7XG5cbmV4cG9ydCBjbGFzcyBWUk1Mb2FkZXJQbHVnaW4gaW1wbGVtZW50cyBHTFRGTG9hZGVyUGx1Z2luIHtcbiAgcHVibGljIHJlYWRvbmx5IHBhcnNlcjogR0xURlBhcnNlcjtcblxuICBwdWJsaWMgcmVhZG9ubHkgZXhwcmVzc2lvblBsdWdpbjogVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbjtcbiAgcHVibGljIHJlYWRvbmx5IGZpcnN0UGVyc29uUGx1Z2luOiBWUk1GaXJzdFBlcnNvbkxvYWRlclBsdWdpbjtcbiAgcHVibGljIHJlYWRvbmx5IGh1bWFub2lkUGx1Z2luOiBWUk1IdW1hbm9pZExvYWRlclBsdWdpbjtcbiAgcHVibGljIHJlYWRvbmx5IGxvb2tBdFBsdWdpbjogVlJNTG9va0F0TG9hZGVyUGx1Z2luO1xuICBwdWJsaWMgcmVhZG9ubHkgbWV0YVBsdWdpbjogVlJNTWV0YUxvYWRlclBsdWdpbjtcbiAgcHVibGljIHJlYWRvbmx5IG10b29uTWF0ZXJpYWxQbHVnaW46IE1Ub29uTWF0ZXJpYWxMb2FkZXJQbHVnaW47XG4gIHB1YmxpYyByZWFkb25seSBtYXRlcmlhbHNIRFJFbWlzc2l2ZU11bHRpcGxpZXJQbHVnaW46IFZSTU1hdGVyaWFsc0hEUkVtaXNzaXZlTXVsdGlwbGllckxvYWRlclBsdWdpbjtcbiAgcHVibGljIHJlYWRvbmx5IG1hdGVyaWFsc1YwQ29tcGF0UGx1Z2luOiBWUk1NYXRlcmlhbHNWMENvbXBhdFBsdWdpbjtcbiAgcHVibGljIHJlYWRvbmx5IHNwcmluZ0JvbmVQbHVnaW46IFZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW47XG4gIHB1YmxpYyByZWFkb25seSBub2RlQ29uc3RyYWludFBsdWdpbjogVlJNTm9kZUNvbnN0cmFpbnRMb2FkZXJQbHVnaW47XG5cbiAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICdWUk1Mb2FkZXJQbHVnaW4nO1xuICB9XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBhcnNlcjogR0xURlBhcnNlciwgb3B0aW9ucz86IFZSTUxvYWRlclBsdWdpbk9wdGlvbnMpIHtcbiAgICB0aGlzLnBhcnNlciA9IHBhcnNlcjtcblxuICAgIGNvbnN0IGhlbHBlclJvb3QgPSBvcHRpb25zPy5oZWxwZXJSb290O1xuICAgIGNvbnN0IGF1dG9VcGRhdGVIdW1hbkJvbmVzID0gb3B0aW9ucz8uYXV0b1VwZGF0ZUh1bWFuQm9uZXM7XG5cbiAgICB0aGlzLmV4cHJlc3Npb25QbHVnaW4gPSBvcHRpb25zPy5leHByZXNzaW9uUGx1Z2luID8/IG5ldyBWUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luKHBhcnNlcik7XG4gICAgdGhpcy5maXJzdFBlcnNvblBsdWdpbiA9IG9wdGlvbnM/LmZpcnN0UGVyc29uUGx1Z2luID8/IG5ldyBWUk1GaXJzdFBlcnNvbkxvYWRlclBsdWdpbihwYXJzZXIpO1xuICAgIHRoaXMuaHVtYW5vaWRQbHVnaW4gPVxuICAgICAgb3B0aW9ucz8uaHVtYW5vaWRQbHVnaW4gPz9cbiAgICAgIG5ldyBWUk1IdW1hbm9pZExvYWRlclBsdWdpbihwYXJzZXIsIHtcbiAgICAgICAgaGVscGVyUm9vdCxcbiAgICAgICAgYXV0b1VwZGF0ZUh1bWFuQm9uZXMsXG4gICAgICB9KTtcbiAgICB0aGlzLmxvb2tBdFBsdWdpbiA9IG9wdGlvbnM/Lmxvb2tBdFBsdWdpbiA/PyBuZXcgVlJNTG9va0F0TG9hZGVyUGx1Z2luKHBhcnNlciwgeyBoZWxwZXJSb290IH0pO1xuICAgIHRoaXMubWV0YVBsdWdpbiA9IG9wdGlvbnM/Lm1ldGFQbHVnaW4gPz8gbmV3IFZSTU1ldGFMb2FkZXJQbHVnaW4ocGFyc2VyKTtcbiAgICB0aGlzLm10b29uTWF0ZXJpYWxQbHVnaW4gPSBvcHRpb25zPy5tdG9vbk1hdGVyaWFsUGx1Z2luID8/IG5ldyBNVG9vbk1hdGVyaWFsTG9hZGVyUGx1Z2luKHBhcnNlcik7XG4gICAgdGhpcy5tYXRlcmlhbHNIRFJFbWlzc2l2ZU11bHRpcGxpZXJQbHVnaW4gPVxuICAgICAgb3B0aW9ucz8ubWF0ZXJpYWxzSERSRW1pc3NpdmVNdWx0aXBsaWVyUGx1Z2luID8/IG5ldyBWUk1NYXRlcmlhbHNIRFJFbWlzc2l2ZU11bHRpcGxpZXJMb2FkZXJQbHVnaW4ocGFyc2VyKTtcbiAgICB0aGlzLm1hdGVyaWFsc1YwQ29tcGF0UGx1Z2luID0gb3B0aW9ucz8ubWF0ZXJpYWxzVjBDb21wYXRQbHVnaW4gPz8gbmV3IFZSTU1hdGVyaWFsc1YwQ29tcGF0UGx1Z2luKHBhcnNlcik7XG5cbiAgICB0aGlzLnNwcmluZ0JvbmVQbHVnaW4gPVxuICAgICAgb3B0aW9ucz8uc3ByaW5nQm9uZVBsdWdpbiA/P1xuICAgICAgbmV3IFZSTVNwcmluZ0JvbmVMb2FkZXJQbHVnaW4ocGFyc2VyLCB7XG4gICAgICAgIGNvbGxpZGVySGVscGVyUm9vdDogaGVscGVyUm9vdCxcbiAgICAgICAgam9pbnRIZWxwZXJSb290OiBoZWxwZXJSb290LFxuICAgICAgfSk7XG5cbiAgICB0aGlzLm5vZGVDb25zdHJhaW50UGx1Z2luID1cbiAgICAgIG9wdGlvbnM/Lm5vZGVDb25zdHJhaW50UGx1Z2luID8/IG5ldyBWUk1Ob2RlQ29uc3RyYWludExvYWRlclBsdWdpbihwYXJzZXIsIHsgaGVscGVyUm9vdCB9KTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBiZWZvcmVSb290KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMubWF0ZXJpYWxzVjBDb21wYXRQbHVnaW4uYmVmb3JlUm9vdCgpO1xuICAgIGF3YWl0IHRoaXMubXRvb25NYXRlcmlhbFBsdWdpbi5iZWZvcmVSb290KCk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgbG9hZE1lc2gobWVzaEluZGV4OiBudW1iZXIpOiBQcm9taXNlPFRIUkVFLkdyb3VwIHwgVEhSRUUuTWVzaCB8IFRIUkVFLlNraW5uZWRNZXNoPiB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMubXRvb25NYXRlcmlhbFBsdWdpbi5sb2FkTWVzaChtZXNoSW5kZXgpO1xuICB9XG5cbiAgcHVibGljIGdldE1hdGVyaWFsVHlwZShtYXRlcmlhbEluZGV4OiBudW1iZXIpOiB0eXBlb2YgVEhSRUUuTWF0ZXJpYWwgfCBudWxsIHtcbiAgICBjb25zdCBtdG9vblR5cGUgPSB0aGlzLm10b29uTWF0ZXJpYWxQbHVnaW4uZ2V0TWF0ZXJpYWxUeXBlKG1hdGVyaWFsSW5kZXgpO1xuICAgIGlmIChtdG9vblR5cGUgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG10b29uVHlwZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBleHRlbmRNYXRlcmlhbFBhcmFtcyhtYXRlcmlhbEluZGV4OiBudW1iZXIsIG1hdGVyaWFsUGFyYW1zOiB7IFtrZXk6IHN0cmluZ106IGFueSB9KTogUHJvbWlzZTxhbnk+IHtcbiAgICBhd2FpdCB0aGlzLm1hdGVyaWFsc0hEUkVtaXNzaXZlTXVsdGlwbGllclBsdWdpbi5leHRlbmRNYXRlcmlhbFBhcmFtcyhtYXRlcmlhbEluZGV4LCBtYXRlcmlhbFBhcmFtcyk7XG4gICAgYXdhaXQgdGhpcy5tdG9vbk1hdGVyaWFsUGx1Z2luLmV4dGVuZE1hdGVyaWFsUGFyYW1zKG1hdGVyaWFsSW5kZXgsIG1hdGVyaWFsUGFyYW1zKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBhZnRlclJvb3QoZ2x0ZjogR0xURik6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMubWV0YVBsdWdpbi5hZnRlclJvb3QoZ2x0Zik7XG4gICAgYXdhaXQgdGhpcy5odW1hbm9pZFBsdWdpbi5hZnRlclJvb3QoZ2x0Zik7XG4gICAgYXdhaXQgdGhpcy5leHByZXNzaW9uUGx1Z2luLmFmdGVyUm9vdChnbHRmKTtcbiAgICBhd2FpdCB0aGlzLmxvb2tBdFBsdWdpbi5hZnRlclJvb3QoZ2x0Zik7XG4gICAgYXdhaXQgdGhpcy5maXJzdFBlcnNvblBsdWdpbi5hZnRlclJvb3QoZ2x0Zik7XG4gICAgYXdhaXQgdGhpcy5zcHJpbmdCb25lUGx1Z2luLmFmdGVyUm9vdChnbHRmKTtcbiAgICBhd2FpdCB0aGlzLm5vZGVDb25zdHJhaW50UGx1Z2luLmFmdGVyUm9vdChnbHRmKTtcbiAgICBhd2FpdCB0aGlzLm10b29uTWF0ZXJpYWxQbHVnaW4uYWZ0ZXJSb290KGdsdGYpO1xuXG4gICAgY29uc3QgbWV0YSA9IGdsdGYudXNlckRhdGEudnJtTWV0YSBhcyBWUk1NZXRhIHwgbnVsbDtcbiAgICBjb25zdCBodW1hbm9pZCA9IGdsdGYudXNlckRhdGEudnJtSHVtYW5vaWQgYXMgVlJNSHVtYW5vaWQgfCBudWxsO1xuXG4gICAgLy8gbWV0YSBhbmQgaHVtYW5vaWQgYXJlIHJlcXVpcmVkIHRvIGJlIGEgVlJNLlxuICAgIC8vIERvbid0IGNyZWF0ZSBWUk0gaWYgdGhleSBhcmUgbnVsbFxuICAgIGlmIChtZXRhICYmIGh1bWFub2lkKSB7XG4gICAgICBjb25zdCB2cm0gPSBuZXcgVlJNKHtcbiAgICAgICAgc2NlbmU6IGdsdGYuc2NlbmUsXG4gICAgICAgIGV4cHJlc3Npb25NYW5hZ2VyOiBnbHRmLnVzZXJEYXRhLnZybUV4cHJlc3Npb25NYW5hZ2VyLFxuICAgICAgICBmaXJzdFBlcnNvbjogZ2x0Zi51c2VyRGF0YS52cm1GaXJzdFBlcnNvbixcbiAgICAgICAgaHVtYW5vaWQsXG4gICAgICAgIGxvb2tBdDogZ2x0Zi51c2VyRGF0YS52cm1Mb29rQXQsXG4gICAgICAgIG1ldGEsXG4gICAgICAgIG1hdGVyaWFsczogZ2x0Zi51c2VyRGF0YS52cm1NVG9vbk1hdGVyaWFscyxcbiAgICAgICAgc3ByaW5nQm9uZU1hbmFnZXI6IGdsdGYudXNlckRhdGEudnJtU3ByaW5nQm9uZU1hbmFnZXIsXG4gICAgICAgIG5vZGVDb25zdHJhaW50TWFuYWdlcjogZ2x0Zi51c2VyRGF0YS52cm1Ob2RlQ29uc3RyYWludE1hbmFnZXIsXG4gICAgICB9KTtcblxuICAgICAgZ2x0Zi51c2VyRGF0YS52cm0gPSB2cm07XG4gICAgfVxuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNQ29yZSwgVlJNRXhwcmVzc2lvbk1vcnBoVGFyZ2V0QmluZCB9IGZyb20gJ0BwaXhpdi90aHJlZS12cm0tY29yZSc7XG5cbi8qKlxuICogVHJhdmVyc2UgYW4gZW50aXJlIHRyZWUgYW5kIGNvbGxlY3QgbWVzaGVzLlxuICovXG5mdW5jdGlvbiBjb2xsZWN0TWVzaGVzKHNjZW5lOiBUSFJFRS5Hcm91cCk6IFNldDxUSFJFRS5NZXNoPiB7XG4gIGNvbnN0IG1lc2hlcyA9IG5ldyBTZXQ8VEhSRUUuTWVzaD4oKTtcblxuICBzY2VuZS50cmF2ZXJzZSgob2JqKSA9PiB7XG4gICAgaWYgKCEob2JqIGFzIGFueSkuaXNNZXNoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbWVzaCA9IG9iaiBhcyBUSFJFRS5NZXNoO1xuICAgIG1lc2hlcy5hZGQobWVzaCk7XG4gIH0pO1xuXG4gIHJldHVybiBtZXNoZXM7XG59XG5cbmZ1bmN0aW9uIGNvbWJpbmVNb3JwaChcbiAgcG9zaXRpb25BdHRyaWJ1dGVzOiAoVEhSRUUuQnVmZmVyQXR0cmlidXRlIHwgVEhSRUUuSW50ZXJsZWF2ZWRCdWZmZXJBdHRyaWJ1dGUpW10sXG4gIGJpbmRzOiBTZXQ8VlJNRXhwcmVzc2lvbk1vcnBoVGFyZ2V0QmluZD4sXG4gIG1vcnBoVGFyZ2V0c1JlbGF0aXZlOiBib29sZWFuLFxuKTogVEhSRUUuQnVmZmVyQXR0cmlidXRlIHwgVEhSRUUuSW50ZXJsZWF2ZWRCdWZmZXJBdHRyaWJ1dGUge1xuICAvLyBpZiB0aGVyZSBpcyBvbmx5IG9uZSBtb3JwaCB0YXJnZXQgYW5kIHRoZSB3ZWlnaHQgaXMgMS4wLCB3ZSBjYW4gdXNlIHRoZSBvcmlnaW5hbCBhcy1pc1xuICBpZiAoYmluZHMuc2l6ZSA9PT0gMSkge1xuICAgIGNvbnN0IGJpbmQgPSBiaW5kcy52YWx1ZXMoKS5uZXh0KCkudmFsdWUhO1xuICAgIGlmIChiaW5kLndlaWdodCA9PT0gMS4wKSB7XG4gICAgICByZXR1cm4gcG9zaXRpb25BdHRyaWJ1dGVzW2JpbmQuaW5kZXhdO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IG5ld0FycmF5ID0gbmV3IEZsb2F0MzJBcnJheShwb3NpdGlvbkF0dHJpYnV0ZXNbMF0uY291bnQgKiAzKTtcbiAgbGV0IHdlaWdodFN1bSA9IDAuMDtcblxuICBpZiAobW9ycGhUYXJnZXRzUmVsYXRpdmUpIHtcbiAgICB3ZWlnaHRTdW0gPSAxLjA7XG4gIH0gZWxzZSB7XG4gICAgZm9yIChjb25zdCBiaW5kIG9mIGJpbmRzKSB7XG4gICAgICB3ZWlnaHRTdW0gKz0gYmluZC53ZWlnaHQ7XG4gICAgfVxuICB9XG5cbiAgZm9yIChjb25zdCBiaW5kIG9mIGJpbmRzKSB7XG4gICAgY29uc3Qgc3JjID0gcG9zaXRpb25BdHRyaWJ1dGVzW2JpbmQuaW5kZXhdO1xuICAgIGNvbnN0IHdlaWdodCA9IGJpbmQud2VpZ2h0IC8gd2VpZ2h0U3VtO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzcmMuY291bnQ7IGkrKykge1xuICAgICAgbmV3QXJyYXlbaSAqIDMgKyAwXSArPSBzcmMuZ2V0WChpKSAqIHdlaWdodDtcbiAgICAgIG5ld0FycmF5W2kgKiAzICsgMV0gKz0gc3JjLmdldFkoaSkgKiB3ZWlnaHQ7XG4gICAgICBuZXdBcnJheVtpICogMyArIDJdICs9IHNyYy5nZXRaKGkpICogd2VpZ2h0O1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IG5ld0F0dHJpYnV0ZSA9IG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUobmV3QXJyYXksIDMpO1xuICByZXR1cm4gbmV3QXR0cmlidXRlO1xufVxuXG4vKipcbiAqIEEgbWFwIGZyb20gZXhwcmVzc2lvbiBuYW1lcyB0byBhIHNldCBvZiBtb3JwaCB0YXJnZXQgYmluZHMuXG4gKi9cbnR5cGUgTmFtZUJpbmRTZXRNYXAgPSBNYXA8c3RyaW5nLCBTZXQ8VlJNRXhwcmVzc2lvbk1vcnBoVGFyZ2V0QmluZD4+O1xuXG4vKipcbiAqIENvbWJpbmUgbW9ycGggdGFyZ2V0cyBieSBWUk0gZXhwcmVzc2lvbnMuXG4gKlxuICogVGhpcyBmdW5jdGlvbiBwcmV2ZW50cyBjcmFzaGVzIGNhdXNlZCBieSB0aGUgbGltaXRhdGlvbiBvZiB0aGUgbnVtYmVyIG9mIG1vcnBoIHRhcmdldHMsIGVzcGVjaWFsbHkgb24gbW9iaWxlIGRldmljZXMuXG4gKlxuICogQHBhcmFtIHZybSBUaGUgVlJNIGluc3RhbmNlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21iaW5lTW9ycGhzKHZybTogVlJNQ29yZSk6IHZvaWQge1xuICBjb25zdCBtZXNoZXMgPSBjb2xsZWN0TWVzaGVzKHZybS5zY2VuZSk7XG5cbiAgLy8gSXRlcmF0ZSBvdmVyIGFsbCBleHByZXNzaW9ucyBhbmQgY2hlY2sgd2hpY2ggbW9ycGggdGFyZ2V0cyBhcmUgdXNlZFxuICBjb25zdCBtZXNoTmFtZUJpbmRTZXRNYXBNYXAgPSBuZXcgTWFwPFRIUkVFLk1lc2gsIE5hbWVCaW5kU2V0TWFwPigpO1xuXG4gIGNvbnN0IGV4cHJlc3Npb25NYXAgPSB2cm0uZXhwcmVzc2lvbk1hbmFnZXI/LmV4cHJlc3Npb25NYXA7XG4gIGlmIChleHByZXNzaW9uTWFwICE9IG51bGwpIHtcbiAgICBmb3IgKGNvbnN0IFtleHByZXNzaW9uTmFtZSwgZXhwcmVzc2lvbl0gb2YgT2JqZWN0LmVudHJpZXMoZXhwcmVzc2lvbk1hcCkpIHtcbiAgICAgIGNvbnN0IGJpbmRzVG9EZWxldGVTZXQgPSBuZXcgU2V0PFZSTUV4cHJlc3Npb25Nb3JwaFRhcmdldEJpbmQ+KCk7XG4gICAgICBmb3IgKGNvbnN0IGJpbmQgb2YgZXhwcmVzc2lvbi5iaW5kcykge1xuICAgICAgICBpZiAoYmluZCBpbnN0YW5jZW9mIFZSTUV4cHJlc3Npb25Nb3JwaFRhcmdldEJpbmQpIHtcbiAgICAgICAgICBpZiAoYmluZC53ZWlnaHQgIT09IDAuMCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBtZXNoIG9mIGJpbmQucHJpbWl0aXZlcykge1xuICAgICAgICAgICAgICBsZXQgbmFtZUJpbmRTZXRNYXAgPSBtZXNoTmFtZUJpbmRTZXRNYXBNYXAuZ2V0KG1lc2gpO1xuICAgICAgICAgICAgICBpZiAobmFtZUJpbmRTZXRNYXAgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIG5hbWVCaW5kU2V0TWFwID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgICAgIG1lc2hOYW1lQmluZFNldE1hcE1hcC5zZXQobWVzaCwgbmFtZUJpbmRTZXRNYXApO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgbGV0IGJpbmRTZXQgPSBuYW1lQmluZFNldE1hcC5nZXQoZXhwcmVzc2lvbk5hbWUpO1xuICAgICAgICAgICAgICBpZiAoYmluZFNldCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgYmluZFNldCA9IG5ldyBTZXQoKTtcbiAgICAgICAgICAgICAgICBuYW1lQmluZFNldE1hcC5zZXQoZXhwcmVzc2lvbk5hbWUsIGJpbmRTZXQpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgYmluZFNldC5hZGQoYmluZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJpbmRzVG9EZWxldGVTZXQuYWRkKGJpbmQpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZvciAoY29uc3QgYmluZCBvZiBiaW5kc1RvRGVsZXRlU2V0KSB7XG4gICAgICAgIGV4cHJlc3Npb24uZGVsZXRlQmluZChiaW5kKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBDb21iaW5lIG1vcnBoc1xuICBmb3IgKGNvbnN0IG1lc2ggb2YgbWVzaGVzKSB7XG4gICAgY29uc3QgbmFtZUJpbmRTZXRNYXAgPSBtZXNoTmFtZUJpbmRTZXRNYXBNYXAuZ2V0KG1lc2gpO1xuICAgIGlmIChuYW1lQmluZFNldE1hcCA9PSBudWxsKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBwcmV2ZW50IGNsb25pbmcgbW9ycGggYXR0cmlidXRlc1xuICAgIGNvbnN0IG9yaWdpbmFsTW9ycGhBdHRyaWJ1dGVzID0gbWVzaC5nZW9tZXRyeS5tb3JwaEF0dHJpYnV0ZXM7XG4gICAgbWVzaC5nZW9tZXRyeS5tb3JwaEF0dHJpYnV0ZXMgPSB7fTtcblxuICAgIGNvbnN0IGdlb21ldHJ5ID0gbWVzaC5nZW9tZXRyeS5jbG9uZSgpO1xuICAgIG1lc2guZ2VvbWV0cnkgPSBnZW9tZXRyeTtcbiAgICBjb25zdCBtb3JwaFRhcmdldHNSZWxhdGl2ZSA9IGdlb21ldHJ5Lm1vcnBoVGFyZ2V0c1JlbGF0aXZlO1xuXG4gICAgY29uc3QgaGFzUE1vcnBoID0gb3JpZ2luYWxNb3JwaEF0dHJpYnV0ZXMucG9zaXRpb24gIT0gbnVsbDtcbiAgICBjb25zdCBoYXNOTW9ycGggPSBvcmlnaW5hbE1vcnBoQXR0cmlidXRlcy5ub3JtYWwgIT0gbnVsbDtcblxuICAgIGNvbnN0IG1vcnBoQXR0cmlidXRlczogdHlwZW9mIG9yaWdpbmFsTW9ycGhBdHRyaWJ1dGVzID0ge307XG4gICAgY29uc3QgbW9ycGhUYXJnZXREaWN0aW9uYXJ5OiB0eXBlb2YgbWVzaC5tb3JwaFRhcmdldERpY3Rpb25hcnkgPSB7fTtcbiAgICBjb25zdCBtb3JwaFRhcmdldEluZmx1ZW5jZXM6IHR5cGVvZiBtZXNoLm1vcnBoVGFyZ2V0SW5mbHVlbmNlcyA9IFtdO1xuXG4gICAgaWYgKGhhc1BNb3JwaCB8fCBoYXNOTW9ycGgpIHtcbiAgICAgIGlmIChoYXNQTW9ycGgpIHtcbiAgICAgICAgbW9ycGhBdHRyaWJ1dGVzLnBvc2l0aW9uID0gW107XG4gICAgICB9XG4gICAgICBpZiAoaGFzTk1vcnBoKSB7XG4gICAgICAgIG1vcnBoQXR0cmlidXRlcy5ub3JtYWwgPSBbXTtcbiAgICAgIH1cblxuICAgICAgbGV0IGkgPSAwO1xuICAgICAgZm9yIChjb25zdCBbbmFtZSwgYmluZFNldF0gb2YgbmFtZUJpbmRTZXRNYXApIHtcbiAgICAgICAgaWYgKGhhc1BNb3JwaCkge1xuICAgICAgICAgIG1vcnBoQXR0cmlidXRlcy5wb3NpdGlvbiFbaV0gPSBjb21iaW5lTW9ycGgob3JpZ2luYWxNb3JwaEF0dHJpYnV0ZXMucG9zaXRpb24hLCBiaW5kU2V0LCBtb3JwaFRhcmdldHNSZWxhdGl2ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhhc05Nb3JwaCkge1xuICAgICAgICAgIG1vcnBoQXR0cmlidXRlcy5ub3JtYWwhW2ldID0gY29tYmluZU1vcnBoKG9yaWdpbmFsTW9ycGhBdHRyaWJ1dGVzLm5vcm1hbCEsIGJpbmRTZXQsIG1vcnBoVGFyZ2V0c1JlbGF0aXZlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGV4cHJlc3Npb25NYXA/LltuYW1lXS5hZGRCaW5kKFxuICAgICAgICAgIG5ldyBWUk1FeHByZXNzaW9uTW9ycGhUYXJnZXRCaW5kKHtcbiAgICAgICAgICAgIGluZGV4OiBpLFxuICAgICAgICAgICAgd2VpZ2h0OiAxLjAsXG4gICAgICAgICAgICBwcmltaXRpdmVzOiBbbWVzaF0sXG4gICAgICAgICAgfSksXG4gICAgICAgICk7XG5cbiAgICAgICAgbW9ycGhUYXJnZXREaWN0aW9uYXJ5W25hbWVdID0gaTtcbiAgICAgICAgbW9ycGhUYXJnZXRJbmZsdWVuY2VzLnB1c2goMC4wKTtcblxuICAgICAgICBpKys7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZ2VvbWV0cnkubW9ycGhBdHRyaWJ1dGVzID0gbW9ycGhBdHRyaWJ1dGVzO1xuICAgIG1lc2gubW9ycGhUYXJnZXREaWN0aW9uYXJ5ID0gbW9ycGhUYXJnZXREaWN0aW9uYXJ5O1xuICAgIG1lc2gubW9ycGhUYXJnZXRJbmZsdWVuY2VzID0gbW9ycGhUYXJnZXRJbmZsdWVuY2VzO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgYXR0cmlidXRlR2V0Q29tcG9uZW50Q29tcGF0IH0gZnJvbSAnLi4vdXRpbHMvYXR0cmlidXRlR2V0Q29tcG9uZW50Q29tcGF0JztcbmltcG9ydCB7IGF0dHJpYnV0ZVNldENvbXBvbmVudENvbXBhdCB9IGZyb20gJy4uL3V0aWxzL2F0dHJpYnV0ZVNldENvbXBvbmVudENvbXBhdCc7XG5cbi8qKlxuICogVHJhdmVyc2VzIHRoZSBnaXZlbiBvYmplY3QgYW5kIGNvbWJpbmVzIHRoZSBza2VsZXRvbnMgb2Ygc2tpbm5lZCBtZXNoZXMuXG4gKlxuICogRWFjaCBmcmFtZSB0aGUgYm9uZSBtYXRyaWNlcyBhcmUgY29tcHV0ZWQgZm9yIGV2ZXJ5IHNrZWxldG9uLiBDb21iaW5pbmcgc2tlbGV0b25zXG4gKiByZWR1Y2VzIHRoZSBudW1iZXIgb2YgY2FsY3VsYXRpb25zIG5lZWRlZCwgaW1wcm92aW5nIHBlcmZvcm1hbmNlLlxuICpcbiAqIEBwYXJhbSByb290IFJvb3Qgb2JqZWN0IHRoYXQgd2lsbCBiZSB0cmF2ZXJzZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbWJpbmVTa2VsZXRvbnMocm9vdDogVEhSRUUuT2JqZWN0M0QpOiB2b2lkIHtcbiAgY29uc3Qgc2tpbm5lZE1lc2hlcyA9IGNvbGxlY3RTa2lubmVkTWVzaGVzKHJvb3QpO1xuXG4gIC8qKiBBIHNldCBvZiBnZW9tZXRyaWVzIGluIHRoZSBnaXZlbiB7QGxpbmsgcm9vdH0uICovXG4gIGNvbnN0IGdlb21ldHJpZXMgPSBuZXcgU2V0PFRIUkVFLkJ1ZmZlckdlb21ldHJ5PigpO1xuICBmb3IgKGNvbnN0IG1lc2ggb2Ygc2tpbm5lZE1lc2hlcykge1xuICAgIC8vIG1lc2hlcyBzb21ldGltZXMgc2hhcmUgdGhlIHNhbWUgZ2VvbWV0cnlcbiAgICAvLyB3ZSBkb24ndCB3YW50IHRvIHRvdWNoIHRoZSBzYW1lIGF0dHJpYnV0ZSB0d2ljZSwgc28gd2UgY2xvbmUgdGhlIGdlb21ldHJpZXNcbiAgICBpZiAoZ2VvbWV0cmllcy5oYXMobWVzaC5nZW9tZXRyeSkpIHtcbiAgICAgIG1lc2guZ2VvbWV0cnkgPSBzaGFsbG93Q2xvbmVCdWZmZXJHZW9tZXRyeShtZXNoLmdlb21ldHJ5KTtcbiAgICB9XG5cbiAgICBnZW9tZXRyaWVzLmFkZChtZXNoLmdlb21ldHJ5KTtcbiAgfVxuXG4gIC8vIExpc3QgYWxsIHVzZWQgc2tpbiBpbmRpY2VzIGZvciBlYWNoIHNraW4gaW5kZXggYXR0cmlidXRlXG4gIC8qKiBBIG1hcDogc2tpbiBpbmRleCBhdHRyaWJ1dGUgLT4gc2tpbiB3ZWlnaHQgYXR0cmlidXRlIC0+IHVzZWQgaW5kZXggc2V0ICovXG4gIGNvbnN0IGF0dHJpYnV0ZVVzZWRJbmRleFNldE1hcCA9IG5ldyBNYXA8XG4gICAgVEhSRUUuQnVmZmVyQXR0cmlidXRlIHwgVEhSRUUuSW50ZXJsZWF2ZWRCdWZmZXJBdHRyaWJ1dGUsXG4gICAgTWFwPFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZSB8IFRIUkVFLkludGVybGVhdmVkQnVmZmVyQXR0cmlidXRlLCBTZXQ8bnVtYmVyPj5cbiAgPigpO1xuXG4gIGZvciAoY29uc3QgZ2VvbWV0cnkgb2YgZ2VvbWV0cmllcykge1xuICAgIGNvbnN0IHNraW5JbmRleEF0dHIgPSBnZW9tZXRyeS5nZXRBdHRyaWJ1dGUoJ3NraW5JbmRleCcpO1xuICAgIGNvbnN0IHNraW5JbmRleE1hcCA9IGF0dHJpYnV0ZVVzZWRJbmRleFNldE1hcC5nZXQoc2tpbkluZGV4QXR0cikgPz8gbmV3IE1hcCgpO1xuICAgIGF0dHJpYnV0ZVVzZWRJbmRleFNldE1hcC5zZXQoc2tpbkluZGV4QXR0ciwgc2tpbkluZGV4TWFwKTtcblxuICAgIGNvbnN0IHNraW5XZWlnaHRBdHRyID0gZ2VvbWV0cnkuZ2V0QXR0cmlidXRlKCdza2luV2VpZ2h0Jyk7XG4gICAgY29uc3QgdXNlZEluZGljZXNTZXQgPSBsaXN0VXNlZEluZGljZXMoc2tpbkluZGV4QXR0ciwgc2tpbldlaWdodEF0dHIpO1xuICAgIHNraW5JbmRleE1hcC5zZXQoc2tpbldlaWdodEF0dHIsIHVzZWRJbmRpY2VzU2V0KTtcbiAgfVxuXG4gIC8vIExpc3QgYWxsIGJvbmVzIGFuZCBib25lSW52ZXJzZXMgZm9yIGVhY2ggbWVzaGVzXG4gIGNvbnN0IG1lc2hCb25lSW52ZXJzZU1hcE1hcCA9IG5ldyBNYXA8VEhSRUUuU2tpbm5lZE1lc2gsIE1hcDxUSFJFRS5Cb25lLCBUSFJFRS5NYXRyaXg0Pj4oKTtcbiAgZm9yIChjb25zdCBtZXNoIG9mIHNraW5uZWRNZXNoZXMpIHtcbiAgICBjb25zdCBib25lSW52ZXJzZU1hcCA9IGxpc3RVc2VkQm9uZXMobWVzaCwgYXR0cmlidXRlVXNlZEluZGV4U2V0TWFwKTtcbiAgICBtZXNoQm9uZUludmVyc2VNYXBNYXAuc2V0KG1lc2gsIGJvbmVJbnZlcnNlTWFwKTtcbiAgfVxuXG4gIC8vIEdyb3VwIG1lc2hlcyBieSBib25lIHNldHNcbiAgY29uc3QgZ3JvdXBzOiB7IGJvbmVJbnZlcnNlTWFwOiBNYXA8VEhSRUUuQm9uZSwgVEhSRUUuTWF0cml4ND47IG1lc2hlczogU2V0PFRIUkVFLlNraW5uZWRNZXNoPiB9W10gPSBbXTtcbiAgZm9yIChjb25zdCBbbWVzaCwgYm9uZUludmVyc2VNYXBdIG9mIG1lc2hCb25lSW52ZXJzZU1hcE1hcCkge1xuICAgIGxldCBmb3VuZE1lcmdlYWJsZUdyb3VwID0gZmFsc2U7XG4gICAgZm9yIChjb25zdCBjYW5kaWRhdGUgb2YgZ3JvdXBzKSB7XG4gICAgICAvLyBjaGVjayBpZiB0aGUgY2FuZGlkYXRlIGdyb3VwIGlzIG1lcmdlYWJsZVxuICAgICAgY29uc3QgaXNNZXJnZWFibGUgPSBib25lSW52ZXJzZU1hcElzTWVyZ2VhYmxlKGJvbmVJbnZlcnNlTWFwLCBjYW5kaWRhdGUuYm9uZUludmVyc2VNYXApO1xuXG4gICAgICAvLyBpZiB3ZSBmb3VuZCBhIG1lcmdlYWJsZSBncm91cCwgYWRkIHRoZSBtZXNoIHRvIHRoZSBncm91cFxuICAgICAgaWYgKGlzTWVyZ2VhYmxlKSB7XG4gICAgICAgIGZvdW5kTWVyZ2VhYmxlR3JvdXAgPSB0cnVlO1xuICAgICAgICBjYW5kaWRhdGUubWVzaGVzLmFkZChtZXNoKTtcblxuICAgICAgICAvLyBhZGQgbGFja2luZyBib25lcyB0byB0aGUgZ3JvdXBcbiAgICAgICAgZm9yIChjb25zdCBbYm9uZSwgYm9uZUludmVyc2VdIG9mIGJvbmVJbnZlcnNlTWFwKSB7XG4gICAgICAgICAgY2FuZGlkYXRlLmJvbmVJbnZlcnNlTWFwLnNldChib25lLCBib25lSW52ZXJzZSk7XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBpZiB3ZSBjb3VsZG4ndCBmaW5kIGEgbWVyZ2VhYmxlIGdyb3VwLCBjcmVhdGUgYSBuZXcgZ3JvdXBcbiAgICBpZiAoIWZvdW5kTWVyZ2VhYmxlR3JvdXApIHtcbiAgICAgIGdyb3Vwcy5wdXNoKHsgYm9uZUludmVyc2VNYXAsIG1lc2hlczogbmV3IFNldChbbWVzaF0pIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIHByZXBhcmUgbmV3IHNrZWxldG9ucyBmb3IgZWFjaCBncm91cCwgYW5kIGJpbmQgdGhlbSB0byB0aGUgbWVzaGVzXG5cbiAgLy8gdGhlIGNvbmRpdGlvbiB0byB1c2UgdGhlIHNhbWUgc2tpbiBpbmRleCBhdHRyaWJ1dGU6XG4gIC8vIC0gdGhlIHNhbWUgc2tpbiBpbmRleCBhdHRyaWJ1dGVcbiAgLy8gLSBhbmQgdGhlIHNrZWxldG9uIGlzIHNhbWVcbiAgLy8gLSBhbmQgdGhlIGJvbmUgc2V0IGlzIHNhbWVcbiAgY29uc3QgY2FjaGUgPSBuZXcgTWFwPHN0cmluZywgVEhSRUUuQnVmZmVyQXR0cmlidXRlIHwgVEhSRUUuSW50ZXJsZWF2ZWRCdWZmZXJBdHRyaWJ1dGU+KCk7XG4gIGNvbnN0IHNraW5JbmRleERpc3BhdGNoZXIgPSBuZXcgT2JqZWN0SW5kZXhEaXNwYXRjaGVyPFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZSB8IFRIUkVFLkludGVybGVhdmVkQnVmZmVyQXR0cmlidXRlPigpO1xuICBjb25zdCBza2VsZXRvbkRpc3BhdGNoZXIgPSBuZXcgT2JqZWN0SW5kZXhEaXNwYXRjaGVyPFRIUkVFLlNrZWxldG9uPigpO1xuICBjb25zdCBib25lRGlzcGF0Y2hlciA9IG5ldyBPYmplY3RJbmRleERpc3BhdGNoZXI8VEhSRUUuQm9uZT4oKTtcblxuICBmb3IgKGNvbnN0IGdyb3VwIG9mIGdyb3Vwcykge1xuICAgIGNvbnN0IHsgYm9uZUludmVyc2VNYXAsIG1lc2hlcyB9ID0gZ3JvdXA7XG5cbiAgICAvLyBjcmVhdGUgYSBuZXcgc2tlbGV0b25cbiAgICBjb25zdCBuZXdCb25lcyA9IEFycmF5LmZyb20oYm9uZUludmVyc2VNYXAua2V5cygpKTtcbiAgICBjb25zdCBuZXdCb25lSW52ZXJzZXMgPSBBcnJheS5mcm9tKGJvbmVJbnZlcnNlTWFwLnZhbHVlcygpKTtcbiAgICBjb25zdCBuZXdTa2VsZXRvbiA9IG5ldyBUSFJFRS5Ta2VsZXRvbihuZXdCb25lcywgbmV3Qm9uZUludmVyc2VzKTtcbiAgICBjb25zdCBza2VsZXRvbktleSA9IHNrZWxldG9uRGlzcGF0Y2hlci5nZXRPckNyZWF0ZShuZXdTa2VsZXRvbik7XG5cbiAgICAvLyByZW1hcCBza2luIGluZGV4IGF0dHJpYnV0ZVxuICAgIGZvciAoY29uc3QgbWVzaCBvZiBtZXNoZXMpIHtcbiAgICAgIGNvbnN0IHNraW5JbmRleEF0dHIgPSBtZXNoLmdlb21ldHJ5LmdldEF0dHJpYnV0ZSgnc2tpbkluZGV4Jyk7XG4gICAgICBjb25zdCBza2luSW5kZXhLZXkgPSBza2luSW5kZXhEaXNwYXRjaGVyLmdldE9yQ3JlYXRlKHNraW5JbmRleEF0dHIpO1xuXG4gICAgICBjb25zdCBib25lcyA9IG1lc2guc2tlbGV0b24uYm9uZXM7XG4gICAgICBjb25zdCBib25lc0tleSA9IGJvbmVzLm1hcCgoYm9uZSkgPT4gYm9uZURpc3BhdGNoZXIuZ2V0T3JDcmVhdGUoYm9uZSkpLmpvaW4oJywnKTtcblxuICAgICAgLy8gY3JlYXRlIGEga2V5IGZyb20gY29uZGl0aW9ucyBhbmQgY2hlY2sgaWYgd2UgYWxyZWFkeSBoYXZlIGEgcmVtYXBwZWQgc2tpbiBpbmRleCBhdHRyaWJ1dGVcbiAgICAgIGNvbnN0IGtleSA9IGAke3NraW5JbmRleEtleX07JHtza2VsZXRvbktleX07JHtib25lc0tleX1gO1xuICAgICAgbGV0IG5ld1NraW5JbmRleEF0dHIgPSBjYWNoZS5nZXQoa2V5KTtcblxuICAgICAgLy8gaWYgd2UgZG9uJ3QgaGF2ZSBhIHJlbWFwcGVkIHNraW4gaW5kZXggYXR0cmlidXRlLCBjcmVhdGUgb25lXG4gICAgICBpZiAobmV3U2tpbkluZGV4QXR0ciA9PSBudWxsKSB7XG4gICAgICAgIG5ld1NraW5JbmRleEF0dHIgPSBza2luSW5kZXhBdHRyLmNsb25lKCk7XG4gICAgICAgIHJlbWFwU2tpbkluZGV4QXR0cmlidXRlKG5ld1NraW5JbmRleEF0dHIsIGJvbmVzLCBuZXdCb25lcyk7XG4gICAgICAgIGNhY2hlLnNldChrZXksIG5ld1NraW5JbmRleEF0dHIpO1xuICAgICAgfVxuXG4gICAgICBtZXNoLmdlb21ldHJ5LnNldEF0dHJpYnV0ZSgnc2tpbkluZGV4JywgbmV3U2tpbkluZGV4QXR0cik7XG4gICAgfVxuXG4gICAgLy8gYmluZCB0aGUgbmV3IHNrZWxldG9uIHRvIHRoZSBtZXNoZXNcbiAgICBmb3IgKGNvbnN0IG1lc2ggb2YgbWVzaGVzKSB7XG4gICAgICBtZXNoLmJpbmQobmV3U2tlbGV0b24sIG5ldyBUSFJFRS5NYXRyaXg0KCkpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFRyYXZlcnNlIGFuIGVudGlyZSB0cmVlIGFuZCBjb2xsZWN0IHNraW5uZWQgbWVzaGVzLlxuICovXG5mdW5jdGlvbiBjb2xsZWN0U2tpbm5lZE1lc2hlcyhzY2VuZTogVEhSRUUuT2JqZWN0M0QpOiBTZXQ8VEhSRUUuU2tpbm5lZE1lc2g+IHtcbiAgY29uc3Qgc2tpbm5lZE1lc2hlcyA9IG5ldyBTZXQ8VEhSRUUuU2tpbm5lZE1lc2g+KCk7XG5cbiAgc2NlbmUudHJhdmVyc2UoKG9iaikgPT4ge1xuICAgIGlmICghKG9iaiBhcyBhbnkpLmlzU2tpbm5lZE1lc2gpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBza2lubmVkTWVzaCA9IG9iaiBhcyBUSFJFRS5Ta2lubmVkTWVzaDtcbiAgICBza2lubmVkTWVzaGVzLmFkZChza2lubmVkTWVzaCk7XG4gIH0pO1xuXG4gIHJldHVybiBza2lubmVkTWVzaGVzO1xufVxuXG4vKipcbiAqIExpc3QgYWxsIHNraW4gaW5kaWNlcyB1c2VkIGJ5IHRoZSBnaXZlbiBnZW9tZXRyeS5cbiAqIElmIHRoZSBza2luIHdlaWdodCBpcyAwLCB0aGUgaW5kZXggd29uJ3QgYmUgY29uc2lkZXJlZCBhcyB1c2VkLlxuICogQHBhcmFtIHNraW5JbmRleEF0dHIgVGhlIHNraW4gaW5kZXggYXR0cmlidXRlIHRvIGxpc3QgdXNlZCBpbmRpY2VzXG4gKiBAcGFyYW0gc2tpbldlaWdodEF0dHIgVGhlIHNraW4gd2VpZ2h0IGF0dHJpYnV0ZSBjb3JyZXNwb25kaW5nIHRvIHRoZSBza2luIGluZGV4IGF0dHJpYnV0ZVxuICovXG5mdW5jdGlvbiBsaXN0VXNlZEluZGljZXMoXG4gIHNraW5JbmRleEF0dHI6IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZSB8IFRIUkVFLkludGVybGVhdmVkQnVmZmVyQXR0cmlidXRlLFxuICBza2luV2VpZ2h0QXR0cjogVEhSRUUuQnVmZmVyQXR0cmlidXRlIHwgVEhSRUUuSW50ZXJsZWF2ZWRCdWZmZXJBdHRyaWJ1dGUsXG4pOiBTZXQ8bnVtYmVyPiB7XG4gIGNvbnN0IHVzZWRJbmRpY2VzID0gbmV3IFNldDxudW1iZXI+KCk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBza2luSW5kZXhBdHRyLmNvdW50OyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNraW5JbmRleEF0dHIuaXRlbVNpemU7IGorKykge1xuICAgICAgY29uc3QgaW5kZXggPSBhdHRyaWJ1dGVHZXRDb21wb25lbnRDb21wYXQoc2tpbkluZGV4QXR0ciwgaSwgaik7XG4gICAgICBjb25zdCB3ZWlnaHQgPSBhdHRyaWJ1dGVHZXRDb21wb25lbnRDb21wYXQoc2tpbldlaWdodEF0dHIsIGksIGopO1xuXG4gICAgICBpZiAod2VpZ2h0ICE9PSAwKSB7XG4gICAgICAgIHVzZWRJbmRpY2VzLmFkZChpbmRleCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHVzZWRJbmRpY2VzO1xufVxuXG4vKipcbiAqIExpc3QgYWxsIGJvbmVzIHVzZWQgYnkgdGhlIGdpdmVuIHNraW5uZWQgbWVzaC5cbiAqIEBwYXJhbSBtZXNoIFRoZSBza2lubmVkIG1lc2ggdG8gbGlzdCB1c2VkIGJvbmVzXG4gKiBAcGFyYW0gYXR0cmlidXRlVXNlZEluZGV4U2V0TWFwIEEgbWFwIGZyb20gc2tpbiBpbmRleCBhdHRyaWJ1dGUgdG8gdGhlIHNldCBvZiB1c2VkIHNraW4gaW5kaWNlc1xuICogQHJldHVybnMgQSBtYXAgZnJvbSB1c2VkIGJvbmUgdG8gdGhlIGNvcnJlc3BvbmRpbmcgYm9uZSBpbnZlcnNlIG1hdHJpeFxuICovXG5mdW5jdGlvbiBsaXN0VXNlZEJvbmVzKFxuICBtZXNoOiBUSFJFRS5Ta2lubmVkTWVzaCxcbiAgYXR0cmlidXRlVXNlZEluZGV4U2V0TWFwOiBNYXA8XG4gICAgVEhSRUUuQnVmZmVyQXR0cmlidXRlIHwgVEhSRUUuSW50ZXJsZWF2ZWRCdWZmZXJBdHRyaWJ1dGUsXG4gICAgTWFwPFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZSB8IFRIUkVFLkludGVybGVhdmVkQnVmZmVyQXR0cmlidXRlLCBTZXQ8bnVtYmVyPj5cbiAgPixcbik6IE1hcDxUSFJFRS5Cb25lLCBUSFJFRS5NYXRyaXg0PiB7XG4gIGNvbnN0IGJvbmVJbnZlcnNlTWFwID0gbmV3IE1hcDxUSFJFRS5Cb25lLCBUSFJFRS5NYXRyaXg0PigpO1xuXG4gIGNvbnN0IHNrZWxldG9uID0gbWVzaC5za2VsZXRvbjtcblxuICBjb25zdCBnZW9tZXRyeSA9IG1lc2guZ2VvbWV0cnk7XG4gIGNvbnN0IHNraW5JbmRleEF0dHIgPSBnZW9tZXRyeS5nZXRBdHRyaWJ1dGUoJ3NraW5JbmRleCcpO1xuICBjb25zdCBza2luV2VpZ2h0QXR0ciA9IGdlb21ldHJ5LmdldEF0dHJpYnV0ZSgnc2tpbldlaWdodCcpO1xuICBjb25zdCBza2luSW5kZXhNYXAgPSBhdHRyaWJ1dGVVc2VkSW5kZXhTZXRNYXAuZ2V0KHNraW5JbmRleEF0dHIpO1xuICBjb25zdCB1c2VkSW5kaWNlc1NldCA9IHNraW5JbmRleE1hcD8uZ2V0KHNraW5XZWlnaHRBdHRyKTtcblxuICBpZiAoIXVzZWRJbmRpY2VzU2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ1VucmVhY2hhYmxlLiBhdHRyaWJ1dGVVc2VkSW5kZXhTZXRNYXAgZG9lcyBub3Qga25vdyB0aGUgc2tpbiBpbmRleCBhdHRyaWJ1dGUgb3IgdGhlIHNraW4gd2VpZ2h0IGF0dHJpYnV0ZS4nLFxuICAgICk7XG4gIH1cblxuICBmb3IgKGNvbnN0IGluZGV4IG9mIHVzZWRJbmRpY2VzU2V0KSB7XG4gICAgYm9uZUludmVyc2VNYXAuc2V0KHNrZWxldG9uLmJvbmVzW2luZGV4XSwgc2tlbGV0b24uYm9uZUludmVyc2VzW2luZGV4XSk7XG4gIH1cblxuICByZXR1cm4gYm9uZUludmVyc2VNYXA7XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgdGhlIGdpdmVuIGJvbmUgaW52ZXJzZSBtYXAgaXMgbWVyZ2VhYmxlIHRvIHRoZSBjYW5kaWRhdGUgYm9uZSBpbnZlcnNlIG1hcC5cbiAqIEBwYXJhbSB0b0NoZWNrIFRoZSBib25lIGludmVyc2UgbWFwIHRvIGNoZWNrXG4gKiBAcGFyYW0gY2FuZGlkYXRlIFRoZSBjYW5kaWRhdGUgYm9uZSBpbnZlcnNlIG1hcFxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgYm9uZSBpbnZlcnNlIG1hcCBpcyBtZXJnZWFibGUgdG8gdGhlIGNhbmRpZGF0ZSBib25lIGludmVyc2UgbWFwXG4gKi9cbmZ1bmN0aW9uIGJvbmVJbnZlcnNlTWFwSXNNZXJnZWFibGUoXG4gIHRvQ2hlY2s6IE1hcDxUSFJFRS5Cb25lLCBUSFJFRS5NYXRyaXg0PixcbiAgY2FuZGlkYXRlOiBNYXA8VEhSRUUuQm9uZSwgVEhSRUUuTWF0cml4ND4sXG4pOiBib29sZWFuIHtcbiAgZm9yIChjb25zdCBbYm9uZSwgYm9uZUludmVyc2VdIG9mIHRvQ2hlY2suZW50cmllcygpKSB7XG4gICAgLy8gaWYgdGhlIGJvbmUgaXMgaW4gdGhlIGNhbmRpZGF0ZSBncm91cCBhbmQgdGhlIGJvbmVJbnZlcnNlIGlzIGRpZmZlcmVudCwgaXQncyBub3QgbWVyZ2VhYmxlXG4gICAgY29uc3QgY2FuZGlkYXRlQm9uZUludmVyc2UgPSBjYW5kaWRhdGUuZ2V0KGJvbmUpO1xuICAgIGlmIChjYW5kaWRhdGVCb25lSW52ZXJzZSAhPSBudWxsKSB7XG4gICAgICBpZiAoIW1hdHJpeEVxdWFscyhib25lSW52ZXJzZSwgY2FuZGlkYXRlQm9uZUludmVyc2UpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLyoqXG4gKiBSZW1hcCB0aGUgc2tpbiBpbmRleCBhdHRyaWJ1dGUgZnJvbSBvbGQgYm9uZXMgdG8gbmV3IGJvbmVzLlxuICogVGhpcyBmdW5jdGlvbiBtb2RpZmllcyB0aGUgZ2l2ZW4gYXR0cmlidXRlIGluIHBsYWNlLlxuICogQHBhcmFtIGF0dHJpYnV0ZSBUaGUgc2tpbiBpbmRleCBhdHRyaWJ1dGUgdG8gcmVtYXBcbiAqIEBwYXJhbSBvbGRCb25lcyBUaGUgYm9uZSBhcnJheSB0aGF0IHRoZSBhdHRyaWJ1dGUgaXMgY3VycmVudGx5IHVzaW5nXG4gKiBAcGFyYW0gbmV3Qm9uZXMgVGhlIGJvbmUgYXJyYXkgdGhhdCB0aGUgYXR0cmlidXRlIHdpbGwgYmUgdXNpbmdcbiAqL1xuZnVuY3Rpb24gcmVtYXBTa2luSW5kZXhBdHRyaWJ1dGUoXG4gIGF0dHJpYnV0ZTogVEhSRUUuQnVmZmVyQXR0cmlidXRlIHwgVEhSRUUuSW50ZXJsZWF2ZWRCdWZmZXJBdHRyaWJ1dGUsXG4gIG9sZEJvbmVzOiBUSFJFRS5Cb25lW10sXG4gIG5ld0JvbmVzOiBUSFJFRS5Cb25lW10sXG4pOiB2b2lkIHtcbiAgLy8gYSBtYXAgZnJvbSBib25lIHRvIG9sZCBpbmRleFxuICBjb25zdCBib25lT2xkSW5kZXhNYXAgPSBuZXcgTWFwPFRIUkVFLkJvbmUsIG51bWJlcj4oKTtcbiAgZm9yIChjb25zdCBib25lIG9mIG9sZEJvbmVzKSB7XG4gICAgYm9uZU9sZEluZGV4TWFwLnNldChib25lLCBib25lT2xkSW5kZXhNYXAuc2l6ZSk7XG4gIH1cblxuICAvLyBhIG1hcCBmcm9tIG9sZCBza2luIGluZGV4IHRvIG5ldyBza2luIGluZGV4XG4gIGNvbnN0IG9sZFRvTmV3ID0gbmV3IE1hcDxudW1iZXIsIG51bWJlcj4oKTtcbiAgZm9yIChjb25zdCBbaSwgYm9uZV0gb2YgbmV3Qm9uZXMuZW50cmllcygpKSB7XG4gICAgY29uc3Qgb2xkSW5kZXggPSBib25lT2xkSW5kZXhNYXAuZ2V0KGJvbmUpITtcbiAgICBvbGRUb05ldy5zZXQob2xkSW5kZXgsIGkpO1xuICB9XG5cbiAgLy8gcmVwbGFjZSB0aGUgc2tpbiBpbmRleCBhdHRyaWJ1dGUgd2l0aCBuZXcgaW5kaWNlc1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGF0dHJpYnV0ZS5jb3VudDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBhdHRyaWJ1dGUuaXRlbVNpemU7IGorKykge1xuICAgICAgY29uc3Qgb2xkSW5kZXggPSBhdHRyaWJ1dGVHZXRDb21wb25lbnRDb21wYXQoYXR0cmlidXRlLCBpLCBqKTtcbiAgICAgIGNvbnN0IG5ld0luZGV4ID0gb2xkVG9OZXcuZ2V0KG9sZEluZGV4KSE7XG4gICAgICBhdHRyaWJ1dGVTZXRDb21wb25lbnRDb21wYXQoYXR0cmlidXRlLCBpLCBqLCBuZXdJbmRleCk7XG4gICAgfVxuICB9XG5cbiAgYXR0cmlidXRlLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbn1cblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9ibG9iL3IxNzAvdGVzdC91bml0L3NyYy9tYXRoL01hdHJpeDQudGVzdHMuanMjTDEyXG5mdW5jdGlvbiBtYXRyaXhFcXVhbHMoYTogVEhSRUUuTWF0cml4NCwgYjogVEhSRUUuTWF0cml4NCwgdG9sZXJhbmNlPzogbnVtYmVyKSB7XG4gIHRvbGVyYW5jZSA9IHRvbGVyYW5jZSB8fCAwLjAwMDE7XG4gIGlmIChhLmVsZW1lbnRzLmxlbmd0aCAhPSBiLmVsZW1lbnRzLmxlbmd0aCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwLCBpbCA9IGEuZWxlbWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgIGNvbnN0IGRlbHRhID0gTWF0aC5hYnMoYS5lbGVtZW50c1tpXSAtIGIuZWxlbWVudHNbaV0pO1xuICAgIGlmIChkZWx0YSA+IHRvbGVyYW5jZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5jbGFzcyBPYmplY3RJbmRleERpc3BhdGNoZXI8VD4ge1xuICBwcml2YXRlIF9vYmplY3RJbmRleE1hcCA9IG5ldyBNYXA8VCwgbnVtYmVyPigpO1xuICBwcml2YXRlIF9pbmRleCA9IDA7XG5cbiAgcHVibGljIGdldChvYmo6IFQpOiBudW1iZXIgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9vYmplY3RJbmRleE1hcC5nZXQob2JqKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRPckNyZWF0ZShvYmo6IFQpOiBudW1iZXIge1xuICAgIGxldCBpbmRleCA9IHRoaXMuX29iamVjdEluZGV4TWFwLmdldChvYmopO1xuICAgIGlmIChpbmRleCA9PSBudWxsKSB7XG4gICAgICBpbmRleCA9IHRoaXMuX2luZGV4O1xuICAgICAgdGhpcy5fb2JqZWN0SW5kZXhNYXAuc2V0KG9iaiwgaW5kZXgpO1xuICAgICAgdGhpcy5faW5kZXgrKztcbiAgICB9XG5cbiAgICByZXR1cm4gaW5kZXg7XG4gIH1cbn1cblxuLyoqXG4gKiBTaGFsbG93IGNsb25lIGEgYnVmZmVyIGdlb21ldHJ5LlxuICogYEJ1ZmZlckdlb21ldHJ5I2Nsb25lYCBkb2VzIGEgZGVlcCBjbG9uZSB0aGF0IGFsc28gY29waWVzIHRoZSBhdHRyaWJ1dGVzLlxuICogV2Ugd2FudCB0byBzaGFsbG93IGNsb25lIHRoZSBnZW9tZXRyeSB0byBhdm9pZCBjb3B5aW5nIHRoZSBhdHRyaWJ1dGVzLlxuICpcbiAqIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9ibG9iL3IxNzUvc3JjL2NvcmUvQnVmZmVyR2VvbWV0cnkuanMjTDEzMzBcbiAqL1xuZnVuY3Rpb24gc2hhbGxvd0Nsb25lQnVmZmVyR2VvbWV0cnkoZ2VvbWV0cnk6IFRIUkVFLkJ1ZmZlckdlb21ldHJ5KTogVEhSRUUuQnVmZmVyR2VvbWV0cnkge1xuICBjb25zdCBjbG9uZSA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeSgpO1xuXG4gIGNsb25lLm5hbWUgPSBnZW9tZXRyeS5uYW1lO1xuXG4gIGNsb25lLnNldEluZGV4KGdlb21ldHJ5LmluZGV4KTtcblxuICBmb3IgKGNvbnN0IFtuYW1lLCBhdHRyaWJ1dGVdIG9mIE9iamVjdC5lbnRyaWVzKGdlb21ldHJ5LmF0dHJpYnV0ZXMpKSB7XG4gICAgY2xvbmUuc2V0QXR0cmlidXRlKG5hbWUsIGF0dHJpYnV0ZSk7XG4gIH1cblxuICBmb3IgKGNvbnN0IFtrZXksIG1vcnBoQXR0cmlidXRlc10gb2YgT2JqZWN0LmVudHJpZXMoZ2VvbWV0cnkubW9ycGhBdHRyaWJ1dGVzKSkge1xuICAgIGNvbnN0IGF0dHJpYnV0ZU5hbWUgPSBrZXkgYXMga2V5b2YgdHlwZW9mIGdlb21ldHJ5Lm1vcnBoQXR0cmlidXRlcztcbiAgICBjbG9uZS5tb3JwaEF0dHJpYnV0ZXNbYXR0cmlidXRlTmFtZV0gPSBtb3JwaEF0dHJpYnV0ZXMuY29uY2F0KCk7XG4gIH1cbiAgY2xvbmUubW9ycGhUYXJnZXRzUmVsYXRpdmUgPSBnZW9tZXRyeS5tb3JwaFRhcmdldHNSZWxhdGl2ZTtcblxuICBjbG9uZS5ncm91cHMgPSBbXTtcbiAgZm9yIChjb25zdCBncm91cCBvZiBnZW9tZXRyeS5ncm91cHMpIHtcbiAgICBjbG9uZS5hZGRHcm91cChncm91cC5zdGFydCwgZ3JvdXAuY291bnQsIGdyb3VwLm1hdGVyaWFsSW5kZXgpO1xuICB9XG5cbiAgY2xvbmUuYm91bmRpbmdTcGhlcmUgPSBnZW9tZXRyeS5ib3VuZGluZ1NwaGVyZT8uY2xvbmUoKSA/PyBudWxsO1xuICBjbG9uZS5ib3VuZGluZ0JveCA9IGdlb21ldHJ5LmJvdW5kaW5nQm94Py5jbG9uZSgpID8/IG51bGw7XG5cbiAgY2xvbmUuZHJhd1JhbmdlLnN0YXJ0ID0gZ2VvbWV0cnkuZHJhd1JhbmdlLnN0YXJ0O1xuICBjbG9uZS5kcmF3UmFuZ2UuY291bnQgPSBnZW9tZXRyeS5kcmF3UmFuZ2UuY291bnQ7XG5cbiAgY2xvbmUudXNlckRhdGEgPSBnZW9tZXRyeS51c2VyRGF0YTtcblxuICByZXR1cm4gY2xvbmU7XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG4vLyBDT01QQVQ6IHByZS1yMTU1XG4vKipcbiAqIEEgY29tcGF0IGZ1bmN0aW9uIGZvciBgQnVmZmVyQXR0cmlidXRlLmdldENvbXBvbmVudCgpYC5cbiAqIGBCdWZmZXJBdHRyaWJ1dGUuZ2V0Q29tcG9uZW50KClgIGlzIGludHJvZHVjZWQgaW4gcjE1NS5cbiAqXG4gKiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvcHVsbC8yNDUxNVxuICovXG5leHBvcnQgZnVuY3Rpb24gYXR0cmlidXRlR2V0Q29tcG9uZW50Q29tcGF0KFxuICBhdHRyaWJ1dGU6IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZSB8IFRIUkVFLkludGVybGVhdmVkQnVmZmVyQXR0cmlidXRlLFxuICBpbmRleDogbnVtYmVyLFxuICBjb21wb25lbnQ6IG51bWJlcixcbik6IG51bWJlciB7XG4gIGlmICgoYXR0cmlidXRlIGFzIGFueSkuZ2V0Q29tcG9uZW50KSB7XG4gICAgcmV0dXJuIChhdHRyaWJ1dGUgYXMgYW55KS5nZXRDb21wb25lbnQoaW5kZXgsIGNvbXBvbmVudCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gUmVmOiBodHRwczovL2dpdGh1Yi5jb20vbXJkb29iL3RocmVlLmpzL3B1bGwvMjQ1MTUvZmlsZXMjZGlmZi1mZDliZDk4MjAyNDJhZDk4ZjcxYjcyNTM1ODM0ZTAyYTQ1MDBlNDc4OGFkNjJlNjE4YTE3MjUzNGI2OWFmMDEzXG4gICAgbGV0IHZhbHVlID0gYXR0cmlidXRlLmFycmF5W2luZGV4ICogYXR0cmlidXRlLml0ZW1TaXplICsgY29tcG9uZW50XTtcbiAgICBpZiAoYXR0cmlidXRlLm5vcm1hbGl6ZWQpIHtcbiAgICAgIHZhbHVlID0gVEhSRUUuTWF0aFV0aWxzLmRlbm9ybWFsaXplKHZhbHVlLCBhdHRyaWJ1dGUuYXJyYXkgYXMgYW55KTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG4vLyBDT01QQVQ6IHByZS1yMTU1XG4vKipcbiAqIEEgY29tcGF0IGZ1bmN0aW9uIGZvciBgQnVmZmVyQXR0cmlidXRlLnNldENvbXBvbmVudCgpYC5cbiAqIGBCdWZmZXJBdHRyaWJ1dGUuc2V0Q29tcG9uZW50KClgIGlzIGludHJvZHVjZWQgaW4gcjE1NS5cbiAqXG4gKiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvcHVsbC8yNDUxNVxuICovXG5leHBvcnQgZnVuY3Rpb24gYXR0cmlidXRlU2V0Q29tcG9uZW50Q29tcGF0KFxuICBhdHRyaWJ1dGU6IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZSB8IFRIUkVFLkludGVybGVhdmVkQnVmZmVyQXR0cmlidXRlLFxuICBpbmRleDogbnVtYmVyLFxuICBjb21wb25lbnQ6IG51bWJlcixcbiAgdmFsdWU6IG51bWJlcixcbik6IHZvaWQge1xuICBpZiAoKGF0dHJpYnV0ZSBhcyBhbnkpLnNldENvbXBvbmVudCkge1xuICAgIChhdHRyaWJ1dGUgYXMgYW55KS5zZXRDb21wb25lbnQoaW5kZXgsIGNvbXBvbmVudCwgdmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIC8vIFJlZjogaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9wdWxsLzI0NTE1L2ZpbGVzI2RpZmYtZmQ5YmQ5ODIwMjQyYWQ5OGY3MWI3MjUzNTgzNGUwMmE0NTAwZTQ3ODhhZDYyZTYxOGExNzI1MzRiNjlhZjAxM1xuICAgIGlmIChhdHRyaWJ1dGUubm9ybWFsaXplZCkge1xuICAgICAgdmFsdWUgPSBUSFJFRS5NYXRoVXRpbHMubm9ybWFsaXplKHZhbHVlLCBhdHRyaWJ1dGUuYXJyYXkgYXMgYW55KTtcbiAgICB9XG4gICAgYXR0cmlidXRlLmFycmF5W2luZGV4ICogYXR0cmlidXRlLml0ZW1TaXplICsgY29tcG9uZW50XSA9IHZhbHVlO1xuICB9XG59XG4iLCAiLy8gU2VlOiBodHRwczovL3RocmVlanMub3JnL2RvY3MvI21hbnVhbC9lbi9pbnRyb2R1Y3Rpb24vSG93LXRvLWRpc3Bvc2Utb2Ytb2JqZWN0c1xuXG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbmZ1bmN0aW9uIGRpc3Bvc2VNYXRlcmlhbChtYXRlcmlhbDogVEhSRUUuTWF0ZXJpYWwpOiB2b2lkIHtcbiAgT2JqZWN0LnZhbHVlcyhtYXRlcmlhbCkuZm9yRWFjaCgodmFsdWUpID0+IHtcbiAgICBpZiAodmFsdWU/LmlzVGV4dHVyZSkge1xuICAgICAgY29uc3QgdGV4dHVyZSA9IHZhbHVlIGFzIFRIUkVFLlRleHR1cmU7XG4gICAgICB0ZXh0dXJlLmRpc3Bvc2UoKTtcbiAgICB9XG4gIH0pO1xuXG4gIGlmICgobWF0ZXJpYWwgYXMgYW55KS5pc1NoYWRlck1hdGVyaWFsKSB7XG4gICAgY29uc3QgdW5pZm9ybXM6IHsgW3VuaWZvcm06IHN0cmluZ106IFRIUkVFLklVbmlmb3JtPGFueT4gfSA9IChtYXRlcmlhbCBhcyBhbnkpLnVuaWZvcm1zO1xuICAgIGlmICh1bmlmb3Jtcykge1xuICAgICAgT2JqZWN0LnZhbHVlcyh1bmlmb3JtcykuZm9yRWFjaCgodW5pZm9ybSkgPT4ge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHVuaWZvcm0udmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZT8uaXNUZXh0dXJlKSB7XG4gICAgICAgICAgY29uc3QgdGV4dHVyZSA9IHZhbHVlIGFzIFRIUkVFLlRleHR1cmU7XG4gICAgICAgICAgdGV4dHVyZS5kaXNwb3NlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG1hdGVyaWFsLmRpc3Bvc2UoKTtcbn1cblxuZnVuY3Rpb24gZGlzcG9zZShvYmplY3QzRDogVEhSRUUuT2JqZWN0M0QpOiB2b2lkIHtcbiAgY29uc3QgZ2VvbWV0cnk6IFRIUkVFLkJ1ZmZlckdlb21ldHJ5IHwgdW5kZWZpbmVkID0gKG9iamVjdDNEIGFzIGFueSkuZ2VvbWV0cnk7XG4gIGlmIChnZW9tZXRyeSkge1xuICAgIGdlb21ldHJ5LmRpc3Bvc2UoKTtcbiAgfVxuXG4gIGNvbnN0IHNrZWxldG9uOiBUSFJFRS5Ta2VsZXRvbiB8IHVuZGVmaW5lZCA9IChvYmplY3QzRCBhcyBhbnkpLnNrZWxldG9uO1xuICBpZiAoc2tlbGV0b24pIHtcbiAgICBza2VsZXRvbi5kaXNwb3NlKCk7XG4gIH1cblxuICBjb25zdCBtYXRlcmlhbDogVEhSRUUuTWF0ZXJpYWwgfCBUSFJFRS5NYXRlcmlhbFtdIHwgdW5kZWZpbmVkID0gKG9iamVjdDNEIGFzIGFueSkubWF0ZXJpYWw7XG4gIGlmIChtYXRlcmlhbCkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KG1hdGVyaWFsKSkge1xuICAgICAgbWF0ZXJpYWwuZm9yRWFjaCgobWF0ZXJpYWw6IFRIUkVFLk1hdGVyaWFsKSA9PiBkaXNwb3NlTWF0ZXJpYWwobWF0ZXJpYWwpKTtcbiAgICB9IGVsc2UgaWYgKG1hdGVyaWFsKSB7XG4gICAgICBkaXNwb3NlTWF0ZXJpYWwobWF0ZXJpYWwpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVlcERpc3Bvc2Uob2JqZWN0M0Q6IFRIUkVFLk9iamVjdDNEKTogdm9pZCB7XG4gIG9iamVjdDNELnRyYXZlcnNlKGRpc3Bvc2UpO1xufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IGF0dHJpYnV0ZUdldENvbXBvbmVudENvbXBhdCB9IGZyb20gJy4uL3V0aWxzL2F0dHJpYnV0ZUdldENvbXBvbmVudENvbXBhdCc7XG5pbXBvcnQgeyBhdHRyaWJ1dGVTZXRDb21wb25lbnRDb21wYXQgfSBmcm9tICcuLi91dGlscy9hdHRyaWJ1dGVTZXRDb21wb25lbnRDb21wYXQnO1xuXG4vKipcbiAqIFRyYXZlcnNlIHRoZSBnaXZlbiBvYmplY3QgYW5kIHJlbW92ZSB1bm5lY2Vzc2FyaWx5IGJvdW5kIGpvaW50cyBmcm9tIGV2ZXJ5IGBUSFJFRS5Ta2lubmVkTWVzaGAuXG4gKlxuICogU29tZSBlbnZpcm9ubWVudHMgbGlrZSBtb2JpbGUgZGV2aWNlcyBoYXZlIGEgbG93ZXIgbGltaXQgb2YgYm9uZXNcbiAqIGFuZCBtaWdodCBiZSB1bmFibGUgdG8gcGVyZm9ybSBtZXNoIHNraW5uaW5nIHdpdGggbWFueSBib25lcy5cbiAqIFRoaXMgZnVuY3Rpb24gbWlnaHQgcmVzb2x2ZSBzdWNoIGFuIGlzc3VlLlxuICpcbiAqIEFsc28sIHRoaXMgZnVuY3Rpb24gbWlnaHQgc2lnbmlmaWNhbnRseSBpbXByb3ZlIHRoZSBwZXJmb3JtYW5jZSBvZiBtZXNoIHNraW5uaW5nLlxuICpcbiAqIEBwYXJhbSByb290IFJvb3Qgb2JqZWN0IHRoYXQgd2lsbCBiZSB0cmF2ZXJzZWRcbiAqXG4gKiBAZGVwcmVjYXRlZCBgcmVtb3ZlVW5uZWNlc3NhcnlKb2ludHNgIGlzIGRlcHJlY2F0ZWQuIFVzZSBgY29tYmluZVNrZWxldG9uc2AgaW5zdGVhZC4gYGNvbWJpbmVTa2VsZXRvbnNgIGNvbnRyaWJ1dGVzIG1vcmUgdG8gdGhlIHBlcmZvcm1hbmNlIGltcHJvdmVtZW50LiBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgbmV4dCBtYWpvciB2ZXJzaW9uLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlVW5uZWNlc3NhcnlKb2ludHMoXG4gIHJvb3Q6IFRIUkVFLk9iamVjdDNELFxuICBvcHRpb25zPzoge1xuICAgIC8qKlxuICAgICAqIElmIGB0cnVlYCwgdGhpcyBmdW5jdGlvbiB3aWxsIGNvbXBlbnNhdGUgc2tlbGV0b25zIHdpdGggZHVtbXkgYm9uZXMgdG8ga2VlcCB0aGUgYm9uZSBjb3VudCBzYW1lIGJldHdlZW4gc2tlbGV0b25zLlxuICAgICAqXG4gICAgICogVGhpcyBvcHRpb24gbWlnaHQgYmUgZWZmZWN0aXZlIGZvciB0aGUgc2hhZGVyIGNvbXBpbGF0aW9uIHBlcmZvcm1hbmNlIHRoYXQgbWF0dGVycyB0byB0aGUgaW5pdGlhbCByZW5kZXJpbmcgdGltZSBpbiBXZWJHUFVSZW5kZXJlcixcbiAgICAgKiBlc3BlY2lhbGx5IHdoZW4gdGhlIG1vZGVsIGxvYWRlZCBoYXMgbWFueSBtYXRlcmlhbHMgYW5kIHRoZSBkZXBlbmRlbnQgYm9uZSBjb3VudCBpcyBkaWZmZXJlbnQgYmV0d2VlbiB0aGVtLlxuICAgICAqXG4gICAgICogQ29uc2lkZXIgdGhpcyBwYXJhbWV0ZXIgYXMgZXhwZXJpbWVudGFsLiBXZSBtaWdodCBtb2RpZnkgb3IgZGVsZXRlIHRoaXMgQVBJIHdpdGhvdXQgbm90aWNlIGluIHRoZSBmdXR1cmUuXG4gICAgICpcbiAgICAgKiBgZmFsc2VgIGJ5IGRlZmF1bHQuXG4gICAgICovXG4gICAgZXhwZXJpbWVudGFsU2FtZUJvbmVDb3VudHM/OiBib29sZWFuO1xuICB9LFxuKTogdm9pZCB7XG4gIGNvbnNvbGUud2FybihcbiAgICAnVlJNVXRpbHMucmVtb3ZlVW5uZWNlc3NhcnlKb2ludHM6IHJlbW92ZVVubmVjZXNzYXJ5Sm9pbnRzIGlzIGRlcHJlY2F0ZWQuIFVzZSBjb21iaW5lU2tlbGV0b25zIGluc3RlYWQuIGNvbWJpbmVTa2VsZXRvbnMgY29udHJpYnV0ZXMgbW9yZSB0byB0aGUgcGVyZm9ybWFuY2UgaW1wcm92ZW1lbnQuIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSByZW1vdmVkIGluIHRoZSBuZXh0IG1ham9yIHZlcnNpb24uJyxcbiAgKTtcblxuICBjb25zdCBleHBlcmltZW50YWxTYW1lQm9uZUNvdW50cyA9IG9wdGlvbnM/LmV4cGVyaW1lbnRhbFNhbWVCb25lQ291bnRzID8/IGZhbHNlO1xuXG4gIC8vIFRyYXZlcnNlIGFuIGVudGlyZSB0cmVlLCBhbmQgY29sbGVjdCBhbGwgc2tpbm5lZCBtZXNoZXNcbiAgY29uc3Qgc2tpbm5lZE1lc2hlczogVEhSRUUuU2tpbm5lZE1lc2hbXSA9IFtdO1xuXG4gIHJvb3QudHJhdmVyc2UoKG9iaikgPT4ge1xuICAgIGlmIChvYmoudHlwZSAhPT0gJ1NraW5uZWRNZXNoJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNraW5uZWRNZXNoZXMucHVzaChvYmogYXMgVEhSRUUuU2tpbm5lZE1lc2gpO1xuICB9KTtcblxuICAvLyBBIG1hcCBmcm9tIG1lc2hlcyB0byBuZXctdG8tb2xkIGJvbmUgaW5kZXggbWFwXG4gIC8vIHNvbWUgbWVzaGVzIG1pZ2h0IHNoYXJlIGEgc2FtZSBza2luSW5kZXggYXR0cmlidXRlLCBhbmQgdGhpcyBtYXAgYWxzbyBwcmV2ZW50cyB0byBjb252ZXJ0IHRoZSBhdHRyaWJ1dGUgdHdpY2VcbiAgY29uc3QgYXR0cmlidXRlVG9Cb25lSW5kZXhNYXBNYXA6IE1hcDxcbiAgICBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUgfCBUSFJFRS5JbnRlcmxlYXZlZEJ1ZmZlckF0dHJpYnV0ZSxcbiAgICBNYXA8bnVtYmVyLCBudW1iZXI+XG4gID4gPSBuZXcgTWFwKCk7XG5cbiAgLy8gQSBtYXhpbXVtIG51bWJlciBvZiBib25lc1xuICBsZXQgbWF4Qm9uZXMgPSAwO1xuXG4gIC8vIEl0ZXJhdGUgb3ZlciBhbGwgc2tpbm5lZCBtZXNoZXMgYW5kIHJlbWFwIGJvbmVzIGZvciBlYWNoIHNraW4gaW5kZXggYXR0cmlidXRlXG4gIGZvciAoY29uc3QgbWVzaCBvZiBza2lubmVkTWVzaGVzKSB7XG4gICAgY29uc3QgZ2VvbWV0cnkgPSBtZXNoLmdlb21ldHJ5O1xuICAgIGNvbnN0IGF0dHJpYnV0ZSA9IGdlb21ldHJ5LmdldEF0dHJpYnV0ZSgnc2tpbkluZGV4Jyk7XG5cbiAgICBpZiAoYXR0cmlidXRlVG9Cb25lSW5kZXhNYXBNYXAuaGFzKGF0dHJpYnV0ZSkpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGNvbnN0IG9sZFRvTmV3ID0gbmV3IE1hcDxudW1iZXIsIG51bWJlcj4oKTsgLy8gbWFwIG9mIG9sZCBib25lIGluZGV4IHZzLiBuZXcgYm9uZSBpbmRleFxuICAgIGNvbnN0IG5ld1RvT2xkID0gbmV3IE1hcDxudW1iZXIsIG51bWJlcj4oKTsgLy8gbWFwIG9mIG5ldyBib25lIGluZGV4IHZzLiBvbGQgYm9uZSBpbmRleFxuXG4gICAgLy8gY3JlYXRlIGEgbmV3IGJvbmUgbWFwXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhdHRyaWJ1dGUuY291bnQ7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBhdHRyaWJ1dGUuaXRlbVNpemU7IGorKykge1xuICAgICAgICBjb25zdCBvbGRJbmRleCA9IGF0dHJpYnV0ZUdldENvbXBvbmVudENvbXBhdChhdHRyaWJ1dGUsIGksIGopO1xuICAgICAgICBsZXQgbmV3SW5kZXggPSBvbGRUb05ldy5nZXQob2xkSW5kZXgpO1xuXG4gICAgICAgIC8vIG5ldyBza2luSW5kZXggYnVmZmVyXG4gICAgICAgIGlmIChuZXdJbmRleCA9PSBudWxsKSB7XG4gICAgICAgICAgbmV3SW5kZXggPSBvbGRUb05ldy5zaXplO1xuICAgICAgICAgIG9sZFRvTmV3LnNldChvbGRJbmRleCwgbmV3SW5kZXgpO1xuICAgICAgICAgIG5ld1RvT2xkLnNldChuZXdJbmRleCwgb2xkSW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXR0cmlidXRlU2V0Q29tcG9uZW50Q29tcGF0KGF0dHJpYnV0ZSwgaSwgaiwgbmV3SW5kZXgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHJlcGxhY2Ugd2l0aCBuZXcgaW5kaWNlc1xuICAgIGF0dHJpYnV0ZS5uZWVkc1VwZGF0ZSA9IHRydWU7XG5cbiAgICAvLyB1cGRhdGUgYm9uZUxpc3RcbiAgICBhdHRyaWJ1dGVUb0JvbmVJbmRleE1hcE1hcC5zZXQoYXR0cmlidXRlLCBuZXdUb09sZCk7XG5cbiAgICAvLyB1cGRhdGUgbWF4IGJvbmVzIGNvdW50XG4gICAgbWF4Qm9uZXMgPSBNYXRoLm1heChtYXhCb25lcywgb2xkVG9OZXcuc2l6ZSk7XG4gIH1cblxuICAvLyBMZXQncyBhY3R1YWxseSBzZXQgdGhlIHNrZWxldG9uc1xuICBmb3IgKGNvbnN0IG1lc2ggb2Ygc2tpbm5lZE1lc2hlcykge1xuICAgIGNvbnN0IGdlb21ldHJ5ID0gbWVzaC5nZW9tZXRyeTtcbiAgICBjb25zdCBhdHRyaWJ1dGUgPSBnZW9tZXRyeS5nZXRBdHRyaWJ1dGUoJ3NraW5JbmRleCcpO1xuICAgIGNvbnN0IG5ld1RvT2xkID0gYXR0cmlidXRlVG9Cb25lSW5kZXhNYXBNYXAuZ2V0KGF0dHJpYnV0ZSkhO1xuXG4gICAgY29uc3QgYm9uZXM6IFRIUkVFLkJvbmVbXSA9IFtdO1xuICAgIGNvbnN0IGJvbmVJbnZlcnNlczogVEhSRUUuTWF0cml4NFtdID0gW107XG5cbiAgICAvLyBpZiBgZXhwZXJpbWVudGFsU2FtZUJvbmVDb3VudHNgIGlzIGB0cnVlYCwgY29tcGVuc2F0ZSBza2VsZXRvbnMgd2l0aCBkdW1teSBib25lcyB0byBrZWVwIHRoZSBib25lIGNvdW50IHNhbWUgYmV0d2VlbiBza2VsZXRvbnNcbiAgICBjb25zdCBuQm9uZXMgPSBleHBlcmltZW50YWxTYW1lQm9uZUNvdW50cyA/IG1heEJvbmVzIDogbmV3VG9PbGQuc2l6ZTtcblxuICAgIGZvciAobGV0IG5ld0luZGV4ID0gMDsgbmV3SW5kZXggPCBuQm9uZXM7IG5ld0luZGV4KyspIHtcbiAgICAgIGNvbnN0IG9sZEluZGV4ID0gbmV3VG9PbGQuZ2V0KG5ld0luZGV4KSA/PyAwO1xuXG4gICAgICBib25lcy5wdXNoKG1lc2guc2tlbGV0b24uYm9uZXNbb2xkSW5kZXhdKTtcbiAgICAgIGJvbmVJbnZlcnNlcy5wdXNoKG1lc2guc2tlbGV0b24uYm9uZUludmVyc2VzW29sZEluZGV4XSk7XG4gICAgfVxuXG4gICAgY29uc3Qgc2tlbGV0b24gPSBuZXcgVEhSRUUuU2tlbGV0b24oYm9uZXMsIGJvbmVJbnZlcnNlcyk7XG4gICAgbWVzaC5iaW5kKHNrZWxldG9uLCBuZXcgVEhSRUUuTWF0cml4NCgpKTtcbiAgICAvLyAgICAgICAgICAgICAgICAgIF5eXl5eXl5eXl5eXl5eXl5eXl4gdHJhbnNmb3JtIG9mIG1lc2hlcyBzaG91bGQgYmUgaWdub3JlZFxuICAgIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL0tocm9ub3NHcm91cC9nbFRGL3RyZWUvbWFzdGVyL3NwZWNpZmljYXRpb24vMi4wI3NraW5zXG4gIH1cbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBCdWZmZXJBdHRyaWJ1dGUgfSBmcm9tICd0aHJlZSc7XG5cbi8qKlxuICogQ2hlY2tzIHdoaWNoIHZlcnRpY2VzIGFyZSB1c2VkIGJ5IHRoZSBpbmRleCBhdHRyaWJ1dGUuXG4gKiBAcGFyYW0gYXR0cmlidXRlcyBHZW9tZXRyeSBhdHRyaWJ1dGVzXG4gKiBAcGFyYW0gb3JpZ2luYWxJbmRleCBPcmlnaW5hbCBpbmRleCBhdHRyaWJ1dGVcbiAqIEByZXR1cm5zIFZlcnRleCB1c2FnZSBtYXAgYW5kIGNvdW50c1xuICovXG5mdW5jdGlvbiBjaGVja0lzVmVydGV4VXNlZChcbiAgYXR0cmlidXRlczogVEhSRUUuQnVmZmVyR2VvbWV0cnlbJ2F0dHJpYnV0ZXMnXSxcbiAgb3JpZ2luYWxJbmRleDogVEhSRUUuQnVmZmVyQXR0cmlidXRlLFxuKToge1xuICBpc1ZlcnRleFVzZWQ6IGJvb2xlYW5bXTtcbiAgdmVydGV4Q291bnQ6IG51bWJlcjtcbiAgdmVydGljZXNVc2VkOiBudW1iZXI7XG59IHtcbiAgLy8gZGV0ZXJtaW5lIHdoaWNoIHZlcnRpY2VzIGFyZSB1c2VkIGluIHRoZSBnZW9tZXRyeVxuICBjb25zdCB2ZXJ0ZXhDb3VudCA9IGF0dHJpYnV0ZXMucG9zaXRpb24uY291bnQ7XG4gIGNvbnN0IGlzVmVydGV4VXNlZCA9IG5ldyBBcnJheSh2ZXJ0ZXhDb3VudCkgYXMgYm9vbGVhbltdO1xuICBsZXQgdmVydGljZXNVc2VkID0gMDtcblxuICBjb25zdCBvcmlnaW5hbEluZGV4QXJyYXkgPSBvcmlnaW5hbEluZGV4LmFycmF5O1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG9yaWdpbmFsSW5kZXhBcnJheS5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGluZGV4ID0gb3JpZ2luYWxJbmRleEFycmF5W2ldO1xuICAgIGlmICghaXNWZXJ0ZXhVc2VkW2luZGV4XSkge1xuICAgICAgaXNWZXJ0ZXhVc2VkW2luZGV4XSA9IHRydWU7XG4gICAgICB2ZXJ0aWNlc1VzZWQrKztcbiAgICB9XG4gIH1cblxuICByZXR1cm4geyBpc1ZlcnRleFVzZWQsIHZlcnRleENvdW50LCB2ZXJ0aWNlc1VzZWQgfTtcbn1cblxuLyoqXG4gKiBCdWlsZHMgaW5kZXggbWFwcyBmcm9tIHRoZSB2ZXJ0ZXggdXNhZ2UgbWFwLlxuICogQHBhcmFtIGlzVmVydGV4VXNlZCBWZXJ0ZXggdXNhZ2UgbWFwXG4gKiBAcmV0dXJucyBJbmRleCBtYXBzXG4gKi9cbmZ1bmN0aW9uIGJ1aWxkSW5kZXhNYXBzRnJvbUlzVmVydGV4VXNlZChpc1ZlcnRleFVzZWQ6IGJvb2xlYW5bXSk6IHtcbiAgb3JpZ2luYWxJbmRleE5ld0luZGV4TWFwOiBudW1iZXJbXTtcbiAgbmV3SW5kZXhPcmlnaW5hbEluZGV4TWFwOiBudW1iZXJbXTtcbn0ge1xuICAvKiogZnJvbSBvcmlnaW5hbCBpbmRleCB0byBuZXcgaW5kZXggKi9cbiAgY29uc3Qgb3JpZ2luYWxJbmRleE5ld0luZGV4TWFwOiBudW1iZXJbXSA9IFtdO1xuXG4gIC8qKiBmcm9tIG5ldyBpbmRleCB0byBvcmlnaW5hbCBpbmRleCAqL1xuICBjb25zdCBuZXdJbmRleE9yaWdpbmFsSW5kZXhNYXA6IG51bWJlcltdID0gW107XG5cbiAgLy8gYXNzaWduIG5ldyBpbmRpY2VzXG4gIGxldCBpbmRleEhlYWQgPSAwO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGlzVmVydGV4VXNlZC5sZW5ndGg7IGkrKykge1xuICAgIGlmIChpc1ZlcnRleFVzZWRbaV0pIHtcbiAgICAgIGNvbnN0IG5ld0luZGV4ID0gaW5kZXhIZWFkKys7XG4gICAgICBvcmlnaW5hbEluZGV4TmV3SW5kZXhNYXBbaV0gPSBuZXdJbmRleDtcbiAgICAgIG5ld0luZGV4T3JpZ2luYWxJbmRleE1hcFtuZXdJbmRleF0gPSBpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7IG9yaWdpbmFsSW5kZXhOZXdJbmRleE1hcCwgbmV3SW5kZXhPcmlnaW5hbEluZGV4TWFwIH07XG59XG5cbi8qKlxuICogQ29waWVzIGdlb21ldHJ5IHByb3BlcnRpZXMgdGhhdCBhcmUgbm90IHBhcnQgb2YgYXR0cmlidXRlcyBvciBpbmRpY2VzLlxuICogQHBhcmFtIHNvdXJjZSBTb3VyY2UgZ2VvbWV0cnlcbiAqIEBwYXJhbSB0YXJnZXQgVGFyZ2V0IGdlb21ldHJ5XG4gKi9cbmZ1bmN0aW9uIGNvcHlHZW9tZXRyeVByb3BlcnRpZXMoc291cmNlOiBUSFJFRS5CdWZmZXJHZW9tZXRyeSwgdGFyZ2V0OiBUSFJFRS5CdWZmZXJHZW9tZXRyeSk6IHZvaWQge1xuICAvLyBSZWY6IGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvYmxvYi8xYTI0MWVmMTAwNDg3NzBkNTZlMDZkNmNkNmE2NGM3NmNjNzIwZjk1L3NyYy9jb3JlL0J1ZmZlckdlb21ldHJ5LmpzI0wxMDExXG4gIHRhcmdldC5uYW1lID0gc291cmNlLm5hbWU7XG5cbiAgdGFyZ2V0Lm1vcnBoVGFyZ2V0c1JlbGF0aXZlID0gc291cmNlLm1vcnBoVGFyZ2V0c1JlbGF0aXZlO1xuXG4gIHNvdXJjZS5ncm91cHMuZm9yRWFjaCgoZ3JvdXApID0+IHtcbiAgICB0YXJnZXQuYWRkR3JvdXAoZ3JvdXAuc3RhcnQsIGdyb3VwLmNvdW50LCBncm91cC5tYXRlcmlhbEluZGV4KTtcbiAgfSk7XG5cbiAgdGFyZ2V0LmJvdW5kaW5nQm94ID0gc291cmNlLmJvdW5kaW5nQm94Py5jbG9uZSgpID8/IG51bGw7XG4gIHRhcmdldC5ib3VuZGluZ1NwaGVyZSA9IHNvdXJjZS5ib3VuZGluZ1NwaGVyZT8uY2xvbmUoKSA/PyBudWxsO1xuXG4gIHRhcmdldC5zZXREcmF3UmFuZ2Uoc291cmNlLmRyYXdSYW5nZS5zdGFydCwgc291cmNlLmRyYXdSYW5nZS5jb3VudCk7XG5cbiAgdGFyZ2V0LnVzZXJEYXRhID0gc291cmNlLnVzZXJEYXRhO1xufVxuXG4vKipcbiAqIFJlYnVpbGRzIGluZGV4IGF0dHJpYnV0ZSBiYXNlZCBvbiB0aGUgb3JpZ2luYWwtdG8tbmV3IGluZGV4IG1hcC5cbiAqIEBwYXJhbSBuZXdHZW9tZXRyeSBOZXcgZ2VvbWV0cnlcbiAqIEBwYXJhbSBvcmlnaW5hbEluZGV4IE9yaWdpbmFsIGluZGV4IGF0dHJpYnV0ZVxuICogQHBhcmFtIG9yaWdpbmFsSW5kZXhOZXdJbmRleE1hcCBNYXAgZnJvbSBvcmlnaW5hbCBpbmRleCB0byBuZXcgaW5kZXhcbiAqL1xuZnVuY3Rpb24gcmVvcmdhbml6ZUluZGV4QXR0cmlidXRlKFxuICBuZXdHZW9tZXRyeTogVEhSRUUuQnVmZmVyR2VvbWV0cnksXG4gIG9yaWdpbmFsSW5kZXg6IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZSxcbiAgb3JpZ2luYWxJbmRleE5ld0luZGV4TWFwOiBudW1iZXJbXSxcbik6IHZvaWQge1xuICBjb25zdCBvcmlnaW5hbEluZGV4QXJyYXkgPSBvcmlnaW5hbEluZGV4LmFycmF5O1xuICBjb25zdCBuZXdJbmRleEFycmF5ID0gbmV3IChvcmlnaW5hbEluZGV4QXJyYXkuY29uc3RydWN0b3IgYXMgYW55KShvcmlnaW5hbEluZGV4QXJyYXkubGVuZ3RoKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IG9yaWdpbmFsSW5kZXhBcnJheS5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGluZGV4ID0gb3JpZ2luYWxJbmRleEFycmF5W2ldO1xuICAgIG5ld0luZGV4QXJyYXlbaV0gPSBvcmlnaW5hbEluZGV4TmV3SW5kZXhNYXBbaW5kZXhdO1xuICB9XG5cbiAgbmV3R2VvbWV0cnkuc2V0SW5kZXgobmV3IEJ1ZmZlckF0dHJpYnV0ZShuZXdJbmRleEFycmF5LCBvcmlnaW5hbEluZGV4Lml0ZW1TaXplLCBvcmlnaW5hbEluZGV4Lm5vcm1hbGl6ZWQpKTtcbn1cblxuLyoqXG4gKiBDb3BpZXMgdHlwZWQgYXJyYXkgZGF0YSBieSByZW1hcHBpbmcgaW5kaWNlcy5cbiAqIEBwYXJhbSBvcmlnaW5hbEFycmF5IFNvdXJjZSBhcnJheVxuICogQHBhcmFtIG5ld0luZGV4T3JpZ2luYWxJbmRleE1hcCBNYXAgZnJvbSBuZXcgaW5kZXggdG8gb3JpZ2luYWwgaW5kZXhcbiAqIEBwYXJhbSBzdHJpZGUgTnVtYmVyIG9mIGNvbXBvbmVudHMgcGVyIHZlcnRleCBpbiB0aGUgYXJyYXlcbiAqIEByZXR1cm5zIE5ldyBhcnJheSB3aXRoIHJlbWFwcGVkIGRhdGFcbiAqL1xuZnVuY3Rpb24gcmVtYXBBdHRyaWJ1dGVBcnJheShcbiAgb3JpZ2luYWxBcnJheTogVEhSRUUuVHlwZWRBcnJheSxcbiAgbmV3SW5kZXhPcmlnaW5hbEluZGV4TWFwOiBudW1iZXJbXSxcbiAgc3RyaWRlOiBudW1iZXIsXG4pOiBbVEhSRUUuVHlwZWRBcnJheSwgaXNBbGxaZXJvOiBib29sZWFuXSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cbiAgY29uc3QgQXJyYXlDdG9yID0gb3JpZ2luYWxBcnJheS5jb25zdHJ1Y3RvciBhcyBUSFJFRS5UeXBlZEFycmF5Q29uc3RydWN0b3I7XG4gIGNvbnN0IG5ld0FycmF5ID0gbmV3IEFycmF5Q3RvcihuZXdJbmRleE9yaWdpbmFsSW5kZXhNYXAubGVuZ3RoICogc3RyaWRlKTtcblxuICBsZXQgaXNBbGxaZXJvID0gdHJ1ZTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld0luZGV4T3JpZ2luYWxJbmRleE1hcC5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IG9yaWdpbmFsSW5kZXggPSBuZXdJbmRleE9yaWdpbmFsSW5kZXhNYXBbaV07XG4gICAgY29uc3Qgc3JjQmFzZSA9IG9yaWdpbmFsSW5kZXggKiBzdHJpZGU7XG4gICAgY29uc3QgZHN0QmFzZSA9IGkgKiBzdHJpZGU7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBzdHJpZGU7IGorKykge1xuICAgICAgY29uc3QgdiA9IG9yaWdpbmFsQXJyYXlbc3JjQmFzZSArIGpdO1xuICAgICAgbmV3QXJyYXlbZHN0QmFzZSArIGpdID0gdjtcbiAgICAgIGlzQWxsWmVybyA9IGlzQWxsWmVybyAmJiB2ID09PSAwO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBbbmV3QXJyYXksIGlzQWxsWmVyb107XG59XG5cbnR5cGUgR2VvbWV0cnlJbnRlcmxlYXZlZEVudHJ5ID0gW25hbWU6IHN0cmluZywgYXR0cmlidXRlOiBUSFJFRS5JbnRlcmxlYXZlZEJ1ZmZlckF0dHJpYnV0ZV07XG50eXBlIEdlb21ldHJ5Tm9uSW50ZXJsZWF2ZWRFbnRyeSA9IFtuYW1lOiBzdHJpbmcsIGF0dHJpYnV0ZTogVEhSRUUuQnVmZmVyQXR0cmlidXRlXTtcblxuLyoqXG4gKiBDb2xsZWN0cyBnZW9tZXRyeSBhdHRyaWJ1dGVzLlxuICogRm9yIGludGVybGVhdmVkIGF0dHJpYnV0ZXMsIGdyb3VwIHRoZW0gaWYgdGhleSBzaGFyZSB0aGUgc2FtZSBJbnRlcmxlYXZlZEJ1ZmZlci5cbiAqIEZvciBub24taW50ZXJsZWF2ZWQgYXR0cmlidXRlcywganVzdCBjb2xsZWN0IHRoZW0gYXMgaXMuXG4gKiBAcGFyYW0gYXR0cmlidXRlcyBPcmlnaW5hbCBnZW9tZXRyeSBhdHRyaWJ1dGVzXG4gKiBAcmV0dXJucyBDb2xsZWN0ZWQgZ2VvbWV0cnkgYXR0cmlidXRlIGdyb3Vwc1xuICovXG5mdW5jdGlvbiBjb2xsZWN0R2VvbWV0cnlBdHRyaWJ1dGVHcm91cHMoXG4gIGF0dHJpYnV0ZXM6IFRIUkVFLkJ1ZmZlckdlb21ldHJ5WydhdHRyaWJ1dGVzJ10sXG4pOiBbXG4gIGludGVybGVhdmVkQnVmZmVyQXR0cmlidXRlTWFwOiBNYXA8VEhSRUUuSW50ZXJsZWF2ZWRCdWZmZXIsIEdlb21ldHJ5SW50ZXJsZWF2ZWRFbnRyeVtdPixcbiAgbm9uSW50ZXJsZWF2ZWRBdHRyaWJ1dGVzOiBHZW9tZXRyeU5vbkludGVybGVhdmVkRW50cnlbXSxcbl0ge1xuICBjb25zdCBpbnRlcmxlYXZlZEJ1ZmZlckF0dHJpYnV0ZU1hcCA9IG5ldyBNYXA8VEhSRUUuSW50ZXJsZWF2ZWRCdWZmZXIsIEdlb21ldHJ5SW50ZXJsZWF2ZWRFbnRyeVtdPigpO1xuICBjb25zdCBub25JbnRlcmxlYXZlZEF0dHJpYnV0ZXM6IEdlb21ldHJ5Tm9uSW50ZXJsZWF2ZWRFbnRyeVtdID0gW107XG5cbiAgZm9yIChjb25zdCBbYXR0cmlidXRlTmFtZSwgb3JpZ2luYWxBdHRyaWJ1dGVdIG9mIE9iamVjdC5lbnRyaWVzKGF0dHJpYnV0ZXMpKSB7XG4gICAgaWYgKChvcmlnaW5hbEF0dHJpYnV0ZSBhcyBhbnkpLmlzSW50ZXJsZWF2ZWRCdWZmZXJBdHRyaWJ1dGUpIHtcbiAgICAgIGNvbnN0IGludGVybGVhdmVkQXR0cmlidXRlID0gb3JpZ2luYWxBdHRyaWJ1dGUgYXMgVEhSRUUuSW50ZXJsZWF2ZWRCdWZmZXJBdHRyaWJ1dGU7XG4gICAgICBjb25zdCBpbnRlcmxlYXZlZEJ1ZmZlciA9IGludGVybGVhdmVkQXR0cmlidXRlLmRhdGE7XG4gICAgICBjb25zdCBncm91cCA9IGludGVybGVhdmVkQnVmZmVyQXR0cmlidXRlTWFwLmdldChpbnRlcmxlYXZlZEJ1ZmZlcikgPz8gW107XG4gICAgICBpbnRlcmxlYXZlZEJ1ZmZlckF0dHJpYnV0ZU1hcC5zZXQoaW50ZXJsZWF2ZWRCdWZmZXIsIGdyb3VwKTtcbiAgICAgIGdyb3VwLnB1c2goW2F0dHJpYnV0ZU5hbWUsIGludGVybGVhdmVkQXR0cmlidXRlXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGF0dHJpYnV0ZSA9IG9yaWdpbmFsQXR0cmlidXRlIGFzIFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZTtcbiAgICAgIG5vbkludGVybGVhdmVkQXR0cmlidXRlcy5wdXNoKFthdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVdKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gW2ludGVybGVhdmVkQnVmZmVyQXR0cmlidXRlTWFwLCBub25JbnRlcmxlYXZlZEF0dHJpYnV0ZXNdO1xufVxuXG4vKipcbiAqIFJlYnVpbGRzIGFsbCBnZW9tZXRyeSBhdHRyaWJ1dGVzIGJhc2VkIG9uIHRoZSBuZXctdG8tb3JpZ2luYWwgaW5kZXggbWFwLlxuICogQHBhcmFtIG5ld0dlb21ldHJ5IE5ldyBnZW9tZXRyeVxuICogQHBhcmFtIGF0dHJpYnV0ZXMgT3JpZ2luYWwgZ2VvbWV0cnkgYXR0cmlidXRlc1xuICogQHBhcmFtIG5ld0luZGV4T3JpZ2luYWxJbmRleE1hcCBNYXAgZnJvbSBuZXcgaW5kZXggdG8gb3JpZ2luYWwgaW5kZXhcbiAqL1xuZnVuY3Rpb24gcmVvcmdhbml6ZUdlb21ldHJ5QXR0cmlidXRlcyhcbiAgbmV3R2VvbWV0cnk6IFRIUkVFLkJ1ZmZlckdlb21ldHJ5LFxuICBhdHRyaWJ1dGVzOiBUSFJFRS5CdWZmZXJHZW9tZXRyeVsnYXR0cmlidXRlcyddLFxuICBuZXdJbmRleE9yaWdpbmFsSW5kZXhNYXA6IG51bWJlcltdLFxuKTogdm9pZCB7XG4gIC8vIGNvbGxlY3QgaW50ZXJsZWF2ZWQgYW5kIG5vbi1pbnRlcmxlYXZlZCBhdHRyaWJ1dGVzXG4gIGNvbnN0IFtpbnRlcmxlYXZlZEJ1ZmZlckF0dHJpYnV0ZU1hcCwgbm9uSW50ZXJsZWF2ZWRBdHRyaWJ1dGVzXSA9IGNvbGxlY3RHZW9tZXRyeUF0dHJpYnV0ZUdyb3VwcyhhdHRyaWJ1dGVzKTtcblxuICAvLyBwcm9jZXNzIGludGVybGVhdmVkIGF0dHJpYnV0ZXNcbiAgZm9yIChjb25zdCBbaW50ZXJsZWF2ZWRCdWZmZXIsIGF0dHJpYnV0ZXNJbkdyb3VwXSBvZiBpbnRlcmxlYXZlZEJ1ZmZlckF0dHJpYnV0ZU1hcCkge1xuICAgIC8vIHJlYnVpbGQgaW50ZXJsZWF2ZWQgYnVmZmVyIGFycmF5XG4gICAgY29uc3Qgb3JpZ2luYWxJbnRlcmxlYXZlZEJ1ZmZlckFycmF5ID0gaW50ZXJsZWF2ZWRCdWZmZXIuYXJyYXk7XG4gICAgY29uc3QgeyBzdHJpZGUgfSA9IGludGVybGVhdmVkQnVmZmVyO1xuICAgIGNvbnN0IFtuZXdJbnRlcmxlYXZlZEFycmF5LCBfXSA9IHJlbWFwQXR0cmlidXRlQXJyYXkoXG4gICAgICBvcmlnaW5hbEludGVybGVhdmVkQnVmZmVyQXJyYXksXG4gICAgICBuZXdJbmRleE9yaWdpbmFsSW5kZXhNYXAsXG4gICAgICBzdHJpZGUsXG4gICAgKTtcblxuICAgIC8vIHJlYnVpbGQgaW50ZXJsZWF2ZWQgYnVmZmVyXG4gICAgY29uc3QgbmV3SW50ZXJsZWF2ZWRCdWZmZXIgPSBuZXcgVEhSRUUuSW50ZXJsZWF2ZWRCdWZmZXIobmV3SW50ZXJsZWF2ZWRBcnJheSwgc3RyaWRlKTtcbiAgICBuZXdJbnRlcmxlYXZlZEJ1ZmZlci5zZXRVc2FnZShpbnRlcmxlYXZlZEJ1ZmZlci51c2FnZSk7XG5cbiAgICAvLyByZWJ1aWxkIGludGVybGVhdmVkIGJ1ZmZlciBhdHRyaWJ1dGVzXG4gICAgZm9yIChjb25zdCBbYXR0cmlidXRlTmFtZSwgb3JpZ2luYWxBdHRyaWJ1dGVdIG9mIGF0dHJpYnV0ZXNJbkdyb3VwKSB7XG4gICAgICBjb25zdCB7IGl0ZW1TaXplLCBvZmZzZXQsIG5vcm1hbGl6ZWQgfSA9IG9yaWdpbmFsQXR0cmlidXRlO1xuICAgICAgY29uc3QgbmV3QXR0cmlidXRlID0gbmV3IFRIUkVFLkludGVybGVhdmVkQnVmZmVyQXR0cmlidXRlKG5ld0ludGVybGVhdmVkQnVmZmVyLCBpdGVtU2l6ZSwgb2Zmc2V0LCBub3JtYWxpemVkKTtcbiAgICAgIG5ld0dlb21ldHJ5LnNldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lLCBuZXdBdHRyaWJ1dGUpO1xuICAgIH1cbiAgfVxuXG4gIC8vIHByb2Nlc3Mgbm9uLWludGVybGVhdmVkIGF0dHJpYnV0ZXNcbiAgZm9yIChjb25zdCBbYXR0cmlidXRlTmFtZSwgb3JpZ2luYWxBdHRyaWJ1dGVdIG9mIG5vbkludGVybGVhdmVkQXR0cmlidXRlcykge1xuICAgIC8vIHJlYnVpbGQgYXR0cmlidXRlIGFycmF5XG4gICAgY29uc3Qgb3JpZ2luYWxBdHRyaWJ1dGVBcnJheSA9IG9yaWdpbmFsQXR0cmlidXRlLmFycmF5O1xuICAgIGNvbnN0IHsgaXRlbVNpemUsIG5vcm1hbGl6ZWQgfSA9IG9yaWdpbmFsQXR0cmlidXRlO1xuICAgIGNvbnN0IFtuZXdBdHRyaWJ1dGVBcnJheSwgX10gPSByZW1hcEF0dHJpYnV0ZUFycmF5KG9yaWdpbmFsQXR0cmlidXRlQXJyYXksIG5ld0luZGV4T3JpZ2luYWxJbmRleE1hcCwgaXRlbVNpemUpO1xuXG4gICAgLy8gcmVidWlsZCBidWZmZXIgYXR0cmlidXRlXG4gICAgbmV3R2VvbWV0cnkuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUsIG5ldyBCdWZmZXJBdHRyaWJ1dGUobmV3QXR0cmlidXRlQXJyYXksIGl0ZW1TaXplLCBub3JtYWxpemVkKSk7XG4gIH1cbn1cblxudHlwZSBNb3JwaEF0dHJpYnV0ZU5hbWUgPSBrZXlvZiBUSFJFRS5CdWZmZXJHZW9tZXRyeVsnbW9ycGhBdHRyaWJ1dGVzJ107XG50eXBlIE1vcnBoSW50ZXJsZWF2ZWRFbnRyeSA9IFtcbiAgbmFtZTogTW9ycGhBdHRyaWJ1dGVOYW1lLFxuICBtb3JwaEluZGV4OiBudW1iZXIsXG4gIGF0dHJpYnV0ZTogVEhSRUUuSW50ZXJsZWF2ZWRCdWZmZXJBdHRyaWJ1dGUsXG5dO1xudHlwZSBNb3JwaE5vbkludGVybGVhdmVkRW50cnkgPSBbbmFtZTogTW9ycGhBdHRyaWJ1dGVOYW1lLCBtb3JwaEluZGV4OiBudW1iZXIsIGF0dHJpYnV0ZTogVEhSRUUuQnVmZmVyQXR0cmlidXRlXTtcblxuLyoqXG4gKiBDb2xsZWN0cyBtb3JwaCBhdHRyaWJ1dGVzLlxuICogRm9yIGludGVybGVhdmVkIGF0dHJpYnV0ZXMsIGdyb3VwIHRoZW0gaWYgdGhleSBzaGFyZSB0aGUgc2FtZSBJbnRlcmxlYXZlZEJ1ZmZlci5cbiAqIEZvciBub24taW50ZXJsZWF2ZWQgYXR0cmlidXRlcywganVzdCBjb2xsZWN0IHRoZW0gYXMgaXMuXG4gKiBAcGFyYW0gbW9ycGhBdHRyaWJ1dGVzIE9yaWdpbmFsIG1vcnBoIGF0dHJpYnV0ZXNcbiAqIEByZXR1cm5zIENvbGxlY3RlZCBtb3JwaCBhdHRyaWJ1dGUgZ3JvdXBzXG4gKi9cbmZ1bmN0aW9uIGNvbGxlY3RNb3JwaEF0dHJpYnV0ZUdyb3VwcyhcbiAgbW9ycGhBdHRyaWJ1dGVzOiBUSFJFRS5CdWZmZXJHZW9tZXRyeVsnbW9ycGhBdHRyaWJ1dGVzJ10sXG4pOiBbXG4gIGludGVybGVhdmVkQnVmZmVyQXR0cmlidXRlTWFwOiBNYXA8VEhSRUUuSW50ZXJsZWF2ZWRCdWZmZXIsIE1vcnBoSW50ZXJsZWF2ZWRFbnRyeVtdPixcbiAgbm9uSW50ZXJsZWF2ZWRBdHRyaWJ1dGVzOiBNb3JwaE5vbkludGVybGVhdmVkRW50cnlbXSxcbl0ge1xuICBjb25zdCBpbnRlcmxlYXZlZEJ1ZmZlckF0dHJpYnV0ZU1hcCA9IG5ldyBNYXA8VEhSRUUuSW50ZXJsZWF2ZWRCdWZmZXIsIE1vcnBoSW50ZXJsZWF2ZWRFbnRyeVtdPigpO1xuICBjb25zdCBub25JbnRlcmxlYXZlZEF0dHJpYnV0ZXM6IE1vcnBoTm9uSW50ZXJsZWF2ZWRFbnRyeVtdID0gW107XG5cbiAgZm9yIChjb25zdCBba2V5LCBhdHRyaWJ1dGVzXSBvZiBPYmplY3QuZW50cmllcyhtb3JwaEF0dHJpYnV0ZXMpKSB7XG4gICAgY29uc3QgYXR0cmlidXRlTmFtZSA9IGtleSBhcyBNb3JwaEF0dHJpYnV0ZU5hbWU7XG4gICAgZm9yIChsZXQgaU1vcnBoID0gMDsgaU1vcnBoIDwgYXR0cmlidXRlcy5sZW5ndGg7IGlNb3JwaCsrKSB7XG4gICAgICBjb25zdCBvcmlnaW5hbEF0dHJpYnV0ZSA9IGF0dHJpYnV0ZXNbaU1vcnBoXSBhcyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUgfCBUSFJFRS5JbnRlcmxlYXZlZEJ1ZmZlckF0dHJpYnV0ZTtcblxuICAgICAgaWYgKChvcmlnaW5hbEF0dHJpYnV0ZSBhcyBhbnkpLmlzSW50ZXJsZWF2ZWRCdWZmZXJBdHRyaWJ1dGUpIHtcbiAgICAgICAgY29uc3QgaW50ZXJsZWF2ZWRBdHRyaWJ1dGUgPSBvcmlnaW5hbEF0dHJpYnV0ZSBhcyBUSFJFRS5JbnRlcmxlYXZlZEJ1ZmZlckF0dHJpYnV0ZTtcbiAgICAgICAgY29uc3QgaW50ZXJsZWF2ZWRCdWZmZXIgPSBpbnRlcmxlYXZlZEF0dHJpYnV0ZS5kYXRhO1xuICAgICAgICBjb25zdCBncm91cCA9IGludGVybGVhdmVkQnVmZmVyQXR0cmlidXRlTWFwLmdldChpbnRlcmxlYXZlZEJ1ZmZlcikgPz8gW107XG4gICAgICAgIGludGVybGVhdmVkQnVmZmVyQXR0cmlidXRlTWFwLnNldChpbnRlcmxlYXZlZEJ1ZmZlciwgZ3JvdXApO1xuICAgICAgICBncm91cC5wdXNoKFthdHRyaWJ1dGVOYW1lLCBpTW9ycGgsIGludGVybGVhdmVkQXR0cmlidXRlXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGUgPSBvcmlnaW5hbEF0dHJpYnV0ZSBhcyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGU7XG4gICAgICAgIG5vbkludGVybGVhdmVkQXR0cmlidXRlcy5wdXNoKFthdHRyaWJ1dGVOYW1lLCBpTW9ycGgsIGF0dHJpYnV0ZV0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBbaW50ZXJsZWF2ZWRCdWZmZXJBdHRyaWJ1dGVNYXAsIG5vbkludGVybGVhdmVkQXR0cmlidXRlc107XG59XG5cbi8qKlxuICogUmVidWlsZHMgbW9ycGggYXR0cmlidXRlcyBiYXNlZCBvbiB0aGUgbmV3LXRvLW9yaWdpbmFsIGluZGV4IG1hcC5cbiAqIElmIGFsbCBtb3JwaCBhdHRyaWJ1dGUgdmFsdWVzIGFyZSB6ZXJvLCBhbGwgbW9ycGggYXR0cmlidXRlcyB3aWxsIGJlIGRpc2NhcmRlZC5cbiAqIEBwYXJhbSBuZXdHZW9tZXRyeSBOZXcgZ2VvbWV0cnlcbiAqIEBwYXJhbSBtb3JwaEF0dHJpYnV0ZXMgT3JpZ2luYWwgbW9ycGggYXR0cmlidXRlc1xuICogQHBhcmFtIG5ld0luZGV4T3JpZ2luYWxJbmRleE1hcCBNYXAgZnJvbSBuZXcgaW5kZXggdG8gb3JpZ2luYWwgaW5kZXhcbiAqL1xuZnVuY3Rpb24gcmVvcmdhbml6ZU1vcnBoQXR0cmlidXRlcyhcbiAgbmV3R2VvbWV0cnk6IFRIUkVFLkJ1ZmZlckdlb21ldHJ5LFxuICBtb3JwaEF0dHJpYnV0ZXM6IFRIUkVFLkJ1ZmZlckdlb21ldHJ5Wydtb3JwaEF0dHJpYnV0ZXMnXSxcbiAgbmV3SW5kZXhPcmlnaW5hbEluZGV4TWFwOiBudW1iZXJbXSxcbik6IHZvaWQge1xuICAvKiogVHJ1ZSBpZiBhbGwgbW9ycGggYXR0cmlidXRlIHZhbHVlcyBhcmUgemVybyAqL1xuICBsZXQgYWxsTW9ycGhzQXJlWmVybyA9IHRydWU7XG5cbiAgLy8gY29sbGVjdCBpbnRlcmxlYXZlZCBhbmQgbm9uLWludGVybGVhdmVkIG1vcnBoIGF0dHJpYnV0ZXNcbiAgY29uc3QgW2ludGVybGVhdmVkQnVmZmVyQXR0cmlidXRlTWFwLCBub25JbnRlcmxlYXZlZEF0dHJpYnV0ZXNdID0gY29sbGVjdE1vcnBoQXR0cmlidXRlR3JvdXBzKG1vcnBoQXR0cmlidXRlcyk7XG5cbiAgY29uc3QgbmV3TW9ycGhBdHRyaWJ1dGVzOiBUSFJFRS5CdWZmZXJHZW9tZXRyeVsnbW9ycGhBdHRyaWJ1dGVzJ10gPSB7fTtcblxuICAvLyBwcm9jZXNzIGludGVybGVhdmVkIG1vcnBoIGF0dHJpYnV0ZXNcbiAgZm9yIChjb25zdCBbaW50ZXJsZWF2ZWRCdWZmZXIsIGF0dHJpYnV0ZXNJbkdyb3VwXSBvZiBpbnRlcmxlYXZlZEJ1ZmZlckF0dHJpYnV0ZU1hcCkge1xuICAgIC8vIHJlYnVpbGQgaW50ZXJsZWF2ZWQgYnVmZmVyIGFycmF5XG4gICAgY29uc3Qgb3JpZ2luYWxJbnRlcmxlYXZlZEJ1ZmZlckFycmF5ID0gaW50ZXJsZWF2ZWRCdWZmZXIuYXJyYXk7XG4gICAgY29uc3QgeyBzdHJpZGUgfSA9IGludGVybGVhdmVkQnVmZmVyO1xuICAgIGNvbnN0IFtuZXdJbnRlcmxlYXZlZEFycmF5LCBpc0FsbFplcm9dID0gcmVtYXBBdHRyaWJ1dGVBcnJheShcbiAgICAgIG9yaWdpbmFsSW50ZXJsZWF2ZWRCdWZmZXJBcnJheSxcbiAgICAgIG5ld0luZGV4T3JpZ2luYWxJbmRleE1hcCxcbiAgICAgIHN0cmlkZSxcbiAgICApO1xuICAgIGFsbE1vcnBoc0FyZVplcm8gPSBhbGxNb3JwaHNBcmVaZXJvICYmIGlzQWxsWmVybztcblxuICAgIC8vIHJlYnVpbGQgaW50ZXJsZWF2ZWQgYnVmZmVyXG4gICAgY29uc3QgbmV3SW50ZXJsZWF2ZWRCdWZmZXIgPSBuZXcgVEhSRUUuSW50ZXJsZWF2ZWRCdWZmZXIobmV3SW50ZXJsZWF2ZWRBcnJheSwgc3RyaWRlKTtcbiAgICBuZXdJbnRlcmxlYXZlZEJ1ZmZlci5zZXRVc2FnZShpbnRlcmxlYXZlZEJ1ZmZlci51c2FnZSk7XG5cbiAgICAvLyByZWJ1aWxkIGludGVybGVhdmVkIGJ1ZmZlciBhdHRyaWJ1dGVzXG4gICAgZm9yIChjb25zdCBbYXR0cmlidXRlTmFtZSwgbW9ycGhJbmRleCwgYXR0cmlidXRlXSBvZiBhdHRyaWJ1dGVzSW5Hcm91cCkge1xuICAgICAgY29uc3QgeyBpdGVtU2l6ZSwgb2Zmc2V0LCBub3JtYWxpemVkIH0gPSBhdHRyaWJ1dGUgYXMgVEhSRUUuSW50ZXJsZWF2ZWRCdWZmZXJBdHRyaWJ1dGU7XG4gICAgICBjb25zdCBuZXdBdHRyaWJ1dGUgPSBuZXcgVEhSRUUuSW50ZXJsZWF2ZWRCdWZmZXJBdHRyaWJ1dGUobmV3SW50ZXJsZWF2ZWRCdWZmZXIsIGl0ZW1TaXplLCBvZmZzZXQsIG5vcm1hbGl6ZWQpO1xuICAgICAgbmV3TW9ycGhBdHRyaWJ1dGVzW2F0dHJpYnV0ZU5hbWVdID8/PSBbXTtcbiAgICAgIG5ld01vcnBoQXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXVttb3JwaEluZGV4XSA9IG5ld0F0dHJpYnV0ZTtcbiAgICB9XG4gIH1cblxuICAvLyBwcm9jZXNzIG5vbi1pbnRlcmxlYXZlZCBtb3JwaCBhdHRyaWJ1dGVzXG4gIGZvciAoY29uc3QgW2F0dHJpYnV0ZU5hbWUsIG1vcnBoSW5kZXgsIGF0dHJpYnV0ZV0gb2Ygbm9uSW50ZXJsZWF2ZWRBdHRyaWJ1dGVzKSB7XG4gICAgY29uc3Qgb3JpZ2luYWxBdHRyaWJ1dGUgPSBhdHRyaWJ1dGUgYXMgVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xuICAgIGNvbnN0IG9yaWdpbmFsQXR0cmlidXRlQXJyYXkgPSBvcmlnaW5hbEF0dHJpYnV0ZS5hcnJheTtcbiAgICBjb25zdCB7IGl0ZW1TaXplLCBub3JtYWxpemVkIH0gPSBvcmlnaW5hbEF0dHJpYnV0ZTtcbiAgICBjb25zdCBbbmV3QXR0cmlidXRlQXJyYXksIGlzQWxsWmVyb10gPSByZW1hcEF0dHJpYnV0ZUFycmF5KFxuICAgICAgb3JpZ2luYWxBdHRyaWJ1dGVBcnJheSxcbiAgICAgIG5ld0luZGV4T3JpZ2luYWxJbmRleE1hcCxcbiAgICAgIGl0ZW1TaXplLFxuICAgICk7XG4gICAgYWxsTW9ycGhzQXJlWmVybyA9IGFsbE1vcnBoc0FyZVplcm8gJiYgaXNBbGxaZXJvO1xuXG4gICAgbmV3TW9ycGhBdHRyaWJ1dGVzW2F0dHJpYnV0ZU5hbWVdID8/PSBbXTtcbiAgICBuZXdNb3JwaEF0dHJpYnV0ZXNbYXR0cmlidXRlTmFtZV1bbW9ycGhJbmRleF0gPSBuZXcgQnVmZmVyQXR0cmlidXRlKG5ld0F0dHJpYnV0ZUFycmF5LCBpdGVtU2l6ZSwgbm9ybWFsaXplZCk7XG4gIH1cblxuICAvLyBkaXNjYXJkIG1vcnBoIGF0dHJpYnV0ZXMgaWYgYWxsIHZhbHVlcyBhcmUgemVyb1xuICBuZXdHZW9tZXRyeS5tb3JwaEF0dHJpYnV0ZXMgPSBhbGxNb3JwaHNBcmVaZXJvID8ge30gOiBuZXdNb3JwaEF0dHJpYnV0ZXM7XG59XG5cbi8qKlxuICogVHJhdmVyc2UgZ2l2ZW4gb2JqZWN0IGFuZCByZW1vdmUgdW5uZWNlc3NhcnkgdmVydGljZXMgZnJvbSBldmVyeSBCdWZmZXJHZW9tZXRyaWVzLlxuICogVGhpcyBvbmx5IHByb2Nlc3NlcyBidWZmZXIgZ2VvbWV0cmllcyB3aXRoIGluZGV4IGJ1ZmZlci5cbiAqXG4gKiBDZXJ0YWluIG1vZGVscyBoYXZlIHZlcnRpY2VzIHRoYXQgYXJlIG5vdCB1c2VkIGJ5IGFueSBmYWNlcy5cbiAqIFRocmVlLmpzIGNyZWF0ZXMgbW9ycGggdGV4dHVyZXMgZm9yIGVhY2ggZ2VvbWV0cmllcyBhbmQgaXQgc29tZXRpbWVzIGNvbnN1bWVzIHVubmVjZXNzYXJ5IGFtb3VudCBvZiBWUkFNIGZvciBjZXJ0YWluIG1vZGVscy5cbiAqIFRoaXMgZnVuY3Rpb24gd2lsbCBvcHRpbWl6ZSBnZW9tZXRyaWVzIHRvIHJlZHVjZSB0aGUgc2l6ZSBvZiBtb3JwaCB0ZXh0dXJlLlxuICogU2VlOiBodHRwczovL2dpdGh1Yi5jb20vbXJkb29iL3RocmVlLmpzL2lzc3Vlcy8yMzA5NVxuICpcbiAqIEBwYXJhbSByb290IFJvb3Qgb2JqZWN0IHRoYXQgd2lsbCBiZSB0cmF2ZXJzZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZVVubmVjZXNzYXJ5VmVydGljZXMocm9vdDogVEhSRUUuT2JqZWN0M0QpOiB2b2lkIHtcbiAgY29uc3QgZ2VvbWV0cnlNYXAgPSBuZXcgTWFwPFRIUkVFLkJ1ZmZlckdlb21ldHJ5LCBUSFJFRS5CdWZmZXJHZW9tZXRyeT4oKTtcblxuICAvLyBUcmF2ZXJzZSBhbiBlbnRpcmUgdHJlZVxuICByb290LnRyYXZlcnNlKChvYmopID0+IHtcbiAgICBpZiAoIShvYmogYXMgYW55KS5pc01lc2gpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBtZXNoID0gb2JqIGFzIFRIUkVFLk1lc2g7XG4gICAgY29uc3QgZ2VvbWV0cnkgPSBtZXNoLmdlb21ldHJ5O1xuXG4gICAgLy8gaWYgdGhlIGdlb21ldHJ5IGRvZXMgbm90IGhhdmUgYW4gaW5kZXggYnVmZmVyIGl0IGRvZXMgbm90IG5lZWQgdG8gYmUgcHJvY2Vzc2VkXG4gICAgY29uc3Qgb3JpZ2luYWxJbmRleCA9IGdlb21ldHJ5LmluZGV4O1xuICAgIGlmIChvcmlnaW5hbEluZGV4ID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBpZiB0aGUgZ2VvbWV0cnkgaGFzIGFscmVhZHkgYmVlbiBwcm9jZXNzZWQsIHJldXNlIGl0XG4gICAgY29uc3QgbmV3R2VvbWV0cnlBbHJlYWR5RXhpc3RlZCA9IGdlb21ldHJ5TWFwLmdldChnZW9tZXRyeSk7XG4gICAgaWYgKG5ld0dlb21ldHJ5QWxyZWFkeUV4aXN0ZWQgIT0gbnVsbCkge1xuICAgICAgbWVzaC5nZW9tZXRyeSA9IG5ld0dlb21ldHJ5QWxyZWFkeUV4aXN0ZWQ7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gY2hlY2sgd2hpY2ggdmVydGljZXMgYXJlIHVzZWRcbiAgICBjb25zdCB7IGlzVmVydGV4VXNlZCwgdmVydGV4Q291bnQsIHZlcnRpY2VzVXNlZCB9ID0gY2hlY2tJc1ZlcnRleFVzZWQoZ2VvbWV0cnkuYXR0cmlidXRlcywgb3JpZ2luYWxJbmRleCk7XG5cbiAgICAvLyBpZiBhbGwgdmVydGljZXMgYXJlIHVzZWQsIGRvIG5vdGhpbmdcbiAgICBpZiAodmVydGljZXNVc2VkID09PSB2ZXJ0ZXhDb3VudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGJ1aWxkIGluZGV4IG1hcHNcbiAgICBjb25zdCB7IG9yaWdpbmFsSW5kZXhOZXdJbmRleE1hcCwgbmV3SW5kZXhPcmlnaW5hbEluZGV4TWFwIH0gPSBidWlsZEluZGV4TWFwc0Zyb21Jc1ZlcnRleFVzZWQoaXNWZXJ0ZXhVc2VkKTtcblxuICAgIC8vIHRoaXMgaXMgdGhlIG5ldyBnZW9tZXRyeSB3ZSB3aWxsIGJ1aWxkXG4gICAgY29uc3QgbmV3R2VvbWV0cnkgPSBuZXcgVEhSRUUuQnVmZmVyR2VvbWV0cnkoKTtcbiAgICBjb3B5R2VvbWV0cnlQcm9wZXJ0aWVzKGdlb21ldHJ5LCBuZXdHZW9tZXRyeSk7XG5cbiAgICAvLyBzZXQgdG8gZ2VvbWV0cnlNYXAgZm9yIGxhdGVyIHJldXNlXG4gICAgZ2VvbWV0cnlNYXAuc2V0KGdlb21ldHJ5LCBuZXdHZW9tZXRyeSk7XG5cbiAgICAvLyByZW9yZ2FuaXplIGluZGljZXMgYW5kIGF0dHJpYnV0ZXNcbiAgICByZW9yZ2FuaXplSW5kZXhBdHRyaWJ1dGUobmV3R2VvbWV0cnksIG9yaWdpbmFsSW5kZXgsIG9yaWdpbmFsSW5kZXhOZXdJbmRleE1hcCk7XG4gICAgcmVvcmdhbml6ZUdlb21ldHJ5QXR0cmlidXRlcyhuZXdHZW9tZXRyeSwgZ2VvbWV0cnkuYXR0cmlidXRlcywgbmV3SW5kZXhPcmlnaW5hbEluZGV4TWFwKTtcbiAgICByZW9yZ2FuaXplTW9ycGhBdHRyaWJ1dGVzKG5ld0dlb21ldHJ5LCBnZW9tZXRyeS5tb3JwaEF0dHJpYnV0ZXMsIG5ld0luZGV4T3JpZ2luYWxJbmRleE1hcCk7XG5cbiAgICAvLyBmaW5hbGx5LCBzZXQgdGhlIG5ldyBnZW9tZXRyeSB0byB0aGUgbWVzaFxuICAgIG1lc2guZ2VvbWV0cnkgPSBuZXdHZW9tZXRyeTtcbiAgfSk7XG5cbiAgQXJyYXkuZnJvbShnZW9tZXRyeU1hcC5rZXlzKCkpLmZvckVhY2goKG9yaWdpbmFsR2VvbWV0cnkpID0+IHtcbiAgICBvcmlnaW5hbEdlb21ldHJ5LmRpc3Bvc2UoKTtcbiAgfSk7XG59XG4iLCAiaW1wb3J0IHsgVlJNIH0gZnJvbSAnLi4vVlJNJztcblxuLyoqXG4gKiBJZiB0aGUgZ2l2ZW4gVlJNIGlzIFZSTTAuMCwgcm90YXRlIHRoZSBgdnJtLnNjZW5lYCBieSAxODAgZGVncmVlcyBhcm91bmQgdGhlIFkgYXhpcy5cbiAqXG4gKiBAcGFyYW0gdnJtIFRoZSB0YXJnZXQgVlJNXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByb3RhdGVWUk0wKHZybTogVlJNKTogdm9pZCB7XG4gIGlmICh2cm0ubWV0YT8ubWV0YVZlcnNpb24gPT09ICcwJykge1xuICAgIHZybS5zY2VuZS5yb3RhdGlvbi55ID0gTWF0aC5QSTtcbiAgfVxufVxuIiwgImltcG9ydCB7IGNvbWJpbmVNb3JwaHMgfSBmcm9tICcuL2NvbWJpbmVNb3JwaHMnO1xuaW1wb3J0IHsgY29tYmluZVNrZWxldG9ucyB9IGZyb20gJy4vY29tYmluZVNrZWxldG9ucyc7XG5pbXBvcnQgeyBkZWVwRGlzcG9zZSB9IGZyb20gJy4vZGVlcERpc3Bvc2UnO1xuaW1wb3J0IHsgcmVtb3ZlVW5uZWNlc3NhcnlKb2ludHMgfSBmcm9tICcuL3JlbW92ZVVubmVjZXNzYXJ5Sm9pbnRzJztcbmltcG9ydCB7IHJlbW92ZVVubmVjZXNzYXJ5VmVydGljZXMgfSBmcm9tICcuL3JlbW92ZVVubmVjZXNzYXJ5VmVydGljZXMnO1xuaW1wb3J0IHsgcm90YXRlVlJNMCB9IGZyb20gJy4vcm90YXRlVlJNMCc7XG5cbmV4cG9ydCBjbGFzcyBWUk1VdGlscyB7XG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gdGhpcyBjbGFzcyBpcyBub3QgbWVhbnQgdG8gYmUgaW5zdGFudGlhdGVkXG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNvbWJpbmVNb3JwaHMgPSBjb21iaW5lTW9ycGhzO1xuICBwdWJsaWMgc3RhdGljIGNvbWJpbmVTa2VsZXRvbnMgPSBjb21iaW5lU2tlbGV0b25zO1xuICBwdWJsaWMgc3RhdGljIGRlZXBEaXNwb3NlID0gZGVlcERpc3Bvc2U7XG4gIHB1YmxpYyBzdGF0aWMgcmVtb3ZlVW5uZWNlc3NhcnlKb2ludHMgPSByZW1vdmVVbm5lY2Vzc2FyeUpvaW50cztcbiAgcHVibGljIHN0YXRpYyByZW1vdmVVbm5lY2Vzc2FyeVZlcnRpY2VzID0gcmVtb3ZlVW5uZWNlc3NhcnlWZXJ0aWNlcztcbiAgcHVibGljIHN0YXRpYyByb3RhdGVWUk0wID0gcm90YXRlVlJNMDtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLFlBQVksV0FBVztBQ0V2QixZQUFZQSxZQUFXO0FNRnZCLFlBQVlBLFlBQVc7QUVBdkIsWUFBWUEsWUFBVztBRUN2QixZQUFZQSxZQUFXO0FHRHZCLFlBQVlBLFlBQVc7QUlBdkIsWUFBWUEsWUFBVztBRUF2QixZQUFZQSxZQUFXO0FJQXZCLFlBQVlBLGFBQVc7QUNBdkIsWUFBWUEsWUFBVztBQ0F2QixZQUFZQSxhQUFXO0FDQXZCLFlBQVlBLGFBQVc7QUNBdkIsWUFBWUEsYUFBVztBR0N2QixZQUFZQSxhQUFXO0FDQXZCLFlBQVlBLGFBQVc7QUlNdkIsWUFBWUEsYUFBVzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FwQ0FoQixJQUFNLGdCQUFOLGNBQWtDLGVBQVM7RUF1R2hELFlBQVksZ0JBQXdCO0FBQ2xDLFVBQU07QUExRlIsU0FBTyxTQUFTO0FBS2hCLFNBQU8sV0FBVztBQUtsQixTQUFPLGdCQUEyQztBQUtsRCxTQUFPLGlCQUE0QztBQUtuRCxTQUFPLGdCQUEyQztBQUts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QUNGO0FBR0EsVUFBTSxFQUFFLDBCQUEwQix5QkFBeUIsSUFBSSwrQkFBK0IsWUFBWTtBQUcxRyxVQUFNLGNBQWMsSUFBVSx1QkFBZTtBQUM3QywyQkFBdUIsVUFBVSxXQUFXO0FBRzVDLGdCQUFZLElBQUksVUFBVSxXQUFXO0FBR3JDLDZCQUF5QixhQUFhLGVBQWUsd0JBQXdCO0FBQzdFLGlDQUE2QixhQUFhLFNBQVMsWUFBWSx3QkFBd0I7QUFDdkYsOEJBQTBCLGFBQWEsU0FBUyxpQkFBaUIsd0JBQXdCO0FBR3pGLFNBQUssV0FBVztBQUFBLEVBQ2xCLENBQUM7QUFFRCxRQUFNLEtBQUssWUFBWSxLQUFLLENBQUMsRUFBRSxRQUFRLENBQUMscUJBQXFCO0FBQzNELHFCQUFpQixRQUFRO0FBQUEsRUFDM0IsQ0FBQztBQUNIOzs7QUN4WU8sU0FBUyxXQUFXLEtBQWdCO0FBUDNDO0FBUUUsUUFBSSxTQUFJLFNBQUosbUJBQVUsaUJBQWdCLEtBQUs7QUFDakMsUUFBSSxNQUFNLFNBQVMsSUFBSSxLQUFLO0FBQUEsRUFDOUI7QUFDRjs7O0FDSk8sSUFBTSxXQUFOLE1BQWU7QUFBQSxFQUNaLGNBQWM7QUFBQSxFQUV0QjtBQVFGO0FBWGEsU0FLRyxnQkFBZ0I7QUFMbkIsU0FNRyxtQkFBbUI7QUFOdEIsU0FPRyxjQUFjO0FBUGpCLFNBUUcsMEJBQTBCO0FBUjdCLFNBU0csNEJBQTRCO0FBVC9CLFNBVUcsYUFBYTsiLAogICJuYW1lcyI6IFsiVEhSRUUiLCAiX19hc3luYyIsICJfVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JCaW5kIiwgIl9WUk1FeHByZXNzaW9uVGV4dHVyZVRyYW5zZm9ybUJpbmQiLCAiX2EiLCAiX1ZSTUV4cHJlc3Npb25Mb2FkZXJQbHVnaW4iLCAiX2IiLCAiX1ZSTUZpcnN0UGVyc29uIiwgIlBPU1NJQkxFX1NQRUNfVkVSU0lPTlMiLCAiX3YzQSIsICJfcXVhdEEiLCAiX3YzQiIsICJfcXVhdEIiLCAiX1ZSTUxvb2tBdCIsICJWRUMzX1BPU0lUSVZFX1oiLCAiX2V1bGVyQSIsICJUSFJFRSIsICJfX2FzeW5jIiwgIm10b29uX2RlZmF1bHQiLCAiUE9TU0lCTEVfU1BFQ19WRVJTSU9OUyIsICJfTVRvb25NYXRlcmlhbExvYWRlclBsdWdpbiIsICJfVlJNTWF0ZXJpYWxzSERSRW1pc3NpdmVNdWx0aXBsaWVyTG9hZGVyUGx1Z2luIiwgIl9fYXN5bmMiLCAiVEhSRUUiLCAiX19hc3luYyIsICJfYSIsICJfX3NwcmVhZFZhbHVlcyIsICJUSFJFRSIsICJfdjNBIiwgIl92M0IiLCAicXVhdEludmVydENvbXBhdCIsICJfdjNDIiwgIl9xdWF0QSIsICJfcXVhdEIiLCAiX3F1YXRDIiwgImNvbnN0cmFpbnQiLCAiUE9TU0lCTEVfU1BFQ19WRVJTSU9OUyIsICJfVlJNTm9kZUNvbnN0cmFpbnRMb2FkZXJQbHVnaW4iLCAiX19hc3luYyIsICJfYSIsICJUSFJFRSIsICJfdjNBIiwgIl92M0IiLCAiX21hdEEiLCAidHJhdmVyc2VBbmNlc3RvcnNGcm9tUm9vdCIsICJQT1NTSUJMRV9TUEVDX1ZFUlNJT05TIiwgIl9WUk1TcHJpbmdCb25lTG9hZGVyUGx1Z2luIiwgIl9fYXN5bmMiLCAiX2EiLCAiX2IiLCAiX2MiLCAiX2QiLCAiX2UiLCAiVEhSRUUiLCAiVEhSRUUiLCAiVEhSRUUiLCAiVEhSRUUiLCAibWF0ZXJpYWwiLCAiVEhSRUUiLCAiVEhSRUUiLCAiQnVmZmVyQXR0cmlidXRlIl0KfQo=
