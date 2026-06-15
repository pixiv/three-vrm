/*!
 * @pixiv/three-vrm-animation v3.5.4
 * The implementation of VRM Animation
 *
 * Copyright (c) 2019-2026 pixiv Inc.
 * @pixiv/three-vrm-animation is distributed under MIT License
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

// src/createVRMAnimationClip.ts
import * as THREE18 from "three";

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
var _v3A = new THREE6.Vector3();
var _v3B = new THREE6.Vector3();
var _quatA = new THREE6.Quaternion();
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
var _v3A3 = new THREE8.Vector3();
var _quatA3 = new THREE8.Quaternion();
var _boneWorldPos = new THREE8.Vector3();
var _quatA4 = new THREE11.Quaternion();
var _quatB = new THREE11.Quaternion();
var _v3A4 = new THREE11.Vector3();
var _v3B2 = new THREE11.Vector3();
var SQRT_2_OVER_2 = Math.sqrt(2) / 2;
var QUAT_XY_CW90 = new THREE11.Quaternion(0, 0, -SQRT_2_OVER_2, SQRT_2_OVER_2);
var VEC3_POSITIVE_Y = new THREE11.Vector3(0, 1, 0);
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

// src/VRMLookAtQuaternionProxy.ts
import * as THREE17 from "three";
var RAD2DEG = 180 / Math.PI;
var _eulerA3 = /* @__PURE__ */ new THREE17.Euler();
var VRMLookAtQuaternionProxy = class extends THREE17.Object3D {
  constructor(lookAt) {
    super();
    this.vrmLookAt = lookAt;
    this.type = "VRMLookAtQuaternionProxy";
    const prevRotationOnChangeCallback = this.rotation._onChangeCallback;
    this.rotation._onChange(() => {
      prevRotationOnChangeCallback();
      this._applyToLookAt();
    });
    const prevQuaternionOnChangeCallback = this.quaternion._onChangeCallback;
    this.quaternion._onChange(() => {
      prevQuaternionOnChangeCallback();
      this._applyToLookAt();
    });
  }
  _applyToLookAt() {
    _eulerA3.setFromQuaternion(this.quaternion, VRMLookAt.EULER_ORDER);
    this.vrmLookAt.yaw = RAD2DEG * _eulerA3.y;
    this.vrmLookAt.pitch = RAD2DEG * _eulerA3.x;
  }
};

// src/createVRMAnimationClip.ts
function createVRMAnimationHumanoidTracks(vrmAnimation, humanoid, metaVersion) {
  var _a, _b;
  const translation = /* @__PURE__ */ new Map();
  const rotation = /* @__PURE__ */ new Map();
  for (const [name, origTrack] of vrmAnimation.humanoidTracks.rotation.entries()) {
    const nodeName = (_a = humanoid.getNormalizedBoneNode(name)) == null ? void 0 : _a.name;
    if (nodeName != null) {
      const track = new THREE18.QuaternionKeyframeTrack(
        `${nodeName}.quaternion`,
        origTrack.times,
        origTrack.values.map((v, i) => metaVersion === "0" && i % 2 === 0 ? -v : v)
      );
      rotation.set(name, track);
    }
  }
  for (const [name, origTrack] of vrmAnimation.humanoidTracks.translation.entries()) {
    const nodeName = (_b = humanoid.getNormalizedBoneNode(name)) == null ? void 0 : _b.name;
    if (nodeName != null) {
      const animationY = vrmAnimation.restHipsPosition.y;
      const humanoidY = humanoid.normalizedRestPose.hips.position[1];
      const scale = humanoidY / animationY;
      const track = origTrack.clone();
      track.values = track.values.map((v, i) => (metaVersion === "0" && i % 3 !== 1 ? -v : v) * scale);
      track.name = `${nodeName}.position`;
      translation.set(name, track);
    }
  }
  return { translation, rotation };
}
function createVRMAnimationExpressionTracks(vrmAnimation, expressionManager) {
  const preset = /* @__PURE__ */ new Map();
  const custom = /* @__PURE__ */ new Map();
  for (const [name, origTrack] of vrmAnimation.expressionTracks.preset.entries()) {
    const trackName = expressionManager.getExpressionTrackName(name);
    if (trackName != null) {
      const track = origTrack.clone();
      track.name = trackName;
      preset.set(name, track);
    }
  }
  for (const [name, origTrack] of vrmAnimation.expressionTracks.custom.entries()) {
    const trackName = expressionManager.getExpressionTrackName(name);
    if (trackName != null) {
      const track = origTrack.clone();
      track.name = trackName;
      custom.set(name, track);
    }
  }
  return { preset, custom };
}
function createVRMAnimationLookAtTrack(vrmAnimation, trackName) {
  if (vrmAnimation.lookAtTrack == null) {
    return null;
  }
  const track = vrmAnimation.lookAtTrack.clone();
  track.name = trackName;
  return track;
}
function createVRMAnimationClip(vrmAnimation, vrm) {
  const tracks = [];
  const humanoidTracks = createVRMAnimationHumanoidTracks(vrmAnimation, vrm.humanoid, vrm.meta.metaVersion);
  tracks.push(...humanoidTracks.translation.values());
  tracks.push(...humanoidTracks.rotation.values());
  if (vrm.expressionManager != null) {
    const expressionTracks = createVRMAnimationExpressionTracks(vrmAnimation, vrm.expressionManager);
    tracks.push(...expressionTracks.preset.values());
    tracks.push(...expressionTracks.custom.values());
  }
  if (vrm.lookAt != null) {
    let proxy = vrm.scene.children.find((obj) => obj instanceof VRMLookAtQuaternionProxy);
    if (proxy == null) {
      console.warn(
        "createVRMAnimationClip: VRMLookAtQuaternionProxy is not found. Creating a new one automatically. To suppress this warning, create a VRMLookAtQuaternionProxy manually"
      );
      proxy = new VRMLookAtQuaternionProxy(vrm.lookAt);
      proxy.name = "VRMLookAtQuaternionProxy";
      vrm.scene.add(proxy);
    } else if (proxy.name === "") {
      console.warn(
        "createVRMAnimationClip: VRMLookAtQuaternionProxy is found but its name is not set. Setting the name automatically. To suppress this warning, set the name manually"
      );
      proxy.name = "VRMLookAtQuaternionProxy";
    }
    const track = createVRMAnimationLookAtTrack(vrmAnimation, `${proxy.name}.quaternion`);
    if (track != null) {
      tracks.push(track);
    }
  }
  return new THREE18.AnimationClip("Clip", vrmAnimation.duration, tracks);
}

// src/VRMAnimation.ts
import * as THREE19 from "three";
var VRMAnimation = class {
  constructor() {
    this.duration = 0;
    this.restHipsPosition = new THREE19.Vector3();
    this.humanoidTracks = {
      translation: /* @__PURE__ */ new Map(),
      rotation: /* @__PURE__ */ new Map()
    };
    this.expressionTracks = {
      preset: /* @__PURE__ */ new Map(),
      custom: /* @__PURE__ */ new Map()
    };
    this.lookAtTrack = null;
  }
};

// src/VRMAnimationLoaderPlugin.ts
import * as THREE20 from "three";

// src/utils/arrayChunk.ts
function arrayChunk(array, every) {
  const N = array.length;
  const ret = [];
  let current = [];
  let remaining = 0;
  for (let i = 0; i < N; i++) {
    const el = array[i];
    if (remaining <= 0) {
      remaining = every;
      current = [];
      ret.push(current);
    }
    current.push(el);
    remaining--;
  }
  return ret;
}

// src/VRMAnimationLoaderPlugin.ts
var MAT4_IDENTITY = /* @__PURE__ */ new THREE20.Matrix4();
var _v3A6 = /* @__PURE__ */ new THREE20.Vector3();
var _quatA7 = /* @__PURE__ */ new THREE20.Quaternion();
var _quatB4 = /* @__PURE__ */ new THREE20.Quaternion();
var _quatC2 = /* @__PURE__ */ new THREE20.Quaternion();
var POSSIBLE_SPEC_VERSIONS2 = /* @__PURE__ */ new Set(["1.0", "1.0-draft"]);
var vrmExpressionPresetNameSet = /* @__PURE__ */ new Set(Object.values(VRMExpressionPresetName));
var VRMAnimationLoaderPlugin = class {
  constructor(parser) {
    this.parser = parser;
  }
  get name() {
    return "VRMC_vrm_animation";
  }
  afterRoot(gltf) {
    return __async(this, null, function* () {
      var _a, _b, _c;
      const defGltf = gltf.parser.json;
      const defExtensionsUsed = defGltf.extensionsUsed;
      if (defExtensionsUsed == null || defExtensionsUsed.indexOf(this.name) == -1) {
        return;
      }
      const defExtension = (_a = defGltf.extensions) == null ? void 0 : _a[this.name];
      if (defExtension == null) {
        return;
      }
      const specVersion = defExtension.specVersion;
      if (specVersion == null) {
        console.warn(
          "VRMAnimationLoaderPlugin: specVersion of the VRMA is not defined. Consider updating the animation file. Assuming the spec version is 1.0."
        );
      } else {
        if (!POSSIBLE_SPEC_VERSIONS2.has(specVersion)) {
          console.warn(`VRMAnimationLoaderPlugin: Unknown VRMC_vrm_animation spec version: ${specVersion}`);
          return;
        }
        if (specVersion === "1.0-draft") {
          console.warn(
            "VRMAnimationLoaderPlugin: Using a draft spec version: 1.0-draft. Some behaviors may be different. Consider updating the animation file."
          );
        }
      }
      const nodeMap = this._createNodeMap(defExtension);
      const worldMatrixMap = yield this._createBoneWorldMatrixMap(gltf, defExtension);
      const hipsNode = (_c = (_b = defExtension.humanoid) == null ? void 0 : _b.humanBones["hips"]) == null ? void 0 : _c.node;
      const hips = hipsNode != null ? yield gltf.parser.getDependency("node", hipsNode) : null;
      const restHipsPosition = new THREE20.Vector3();
      hips == null ? void 0 : hips.getWorldPosition(restHipsPosition);
      if (restHipsPosition.y < 1e-3) {
        console.warn(
          "VRMAnimationLoaderPlugin: The loaded VRM Animation might violate the VRM T-pose (The y component of the rest hips position is approximately zero or below.)"
        );
      }
      const clips = gltf.animations;
      const animations = clips.map((clip, iAnimation) => {
        const defAnimation = defGltf.animations[iAnimation];
        const animation = this._parseAnimation(clip, defAnimation, nodeMap, worldMatrixMap);
        animation.restHipsPosition = restHipsPosition;
        return animation;
      });
      gltf.userData.vrmAnimations = animations;
    });
  }
  _createNodeMap(defExtension) {
    var _a, _b, _c, _d, _e;
    const humanoidIndexToName = /* @__PURE__ */ new Map();
    const expressionsIndexToName = /* @__PURE__ */ new Map();
    const humanBones = (_a = defExtension.humanoid) == null ? void 0 : _a.humanBones;
    if (humanBones) {
      Object.entries(humanBones).forEach(([name, bone]) => {
        const node = bone == null ? void 0 : bone.node;
        if (node != null) {
          humanoidIndexToName.set(node, name);
        }
      });
    }
    const preset = (_b = defExtension.expressions) == null ? void 0 : _b.preset;
    if (preset) {
      Object.entries(preset).forEach(([name, expression]) => {
        const node = expression == null ? void 0 : expression.node;
        if (node != null) {
          expressionsIndexToName.set(node, name);
        }
      });
    }
    const custom = (_c = defExtension.expressions) == null ? void 0 : _c.custom;
    if (custom) {
      Object.entries(custom).forEach(([name, expression]) => {
        const { node } = expression;
        expressionsIndexToName.set(node, name);
      });
    }
    const lookAtIndex = (_e = (_d = defExtension.lookAt) == null ? void 0 : _d.node) != null ? _e : null;
    return { humanoidIndexToName, expressionsIndexToName, lookAtIndex };
  }
  _createBoneWorldMatrixMap(gltf, defExtension) {
    return __async(this, null, function* () {
      var _a, _b;
      gltf.scene.updateWorldMatrix(false, true);
      const threeNodes = yield gltf.parser.getDependencies("node");
      const worldMatrixMap = /* @__PURE__ */ new Map();
      if (defExtension.humanoid == null) {
        return worldMatrixMap;
      }
      for (const [boneName, humanBone] of Object.entries(defExtension.humanoid.humanBones)) {
        const node = humanBone == null ? void 0 : humanBone.node;
        if (node != null) {
          const threeNode = threeNodes[node];
          worldMatrixMap.set(boneName, threeNode.matrixWorld);
          if (boneName === "hips") {
            worldMatrixMap.set("hipsParent", (_b = (_a = threeNode.parent) == null ? void 0 : _a.matrixWorld) != null ? _b : MAT4_IDENTITY);
          }
        }
      }
      return worldMatrixMap;
    });
  }
  _parseAnimation(animationClip, defAnimation, nodeMap, worldMatrixMap) {
    const tracks = animationClip.tracks;
    const defChannels = defAnimation.channels;
    const result = new VRMAnimation();
    result.duration = animationClip.duration;
    defChannels.forEach((channel, iChannel) => {
      const { node, path } = channel.target;
      const origTrack = tracks[iChannel];
      if (node == null) {
        return;
      }
      const boneName = nodeMap.humanoidIndexToName.get(node);
      if (boneName != null) {
        let parentBoneName = VRMHumanBoneParentMap[boneName];
        while (parentBoneName != null && worldMatrixMap.get(parentBoneName) == null) {
          parentBoneName = VRMHumanBoneParentMap[parentBoneName];
        }
        if (parentBoneName == null) {
          parentBoneName = "hipsParent";
        }
        if (path === "translation") {
          if (boneName !== "hips") {
            console.warn(
              `The loading animation contains a translation track for ${boneName}, which is not permitted in the VRMC_vrm_animation spec. ignoring the track`
            );
          } else {
            const hipsParentWorldMatrix = worldMatrixMap.get("hipsParent");
            const trackValues = arrayChunk(origTrack.values, 3).flatMap(
              (v) => _v3A6.fromArray(v).applyMatrix4(hipsParentWorldMatrix).toArray()
            );
            const track = origTrack.clone();
            track.values = new Float32Array(trackValues);
            result.humanoidTracks.translation.set(boneName, track);
          }
        } else if (path === "rotation") {
          const worldMatrix = worldMatrixMap.get(boneName);
          const parentWorldMatrix = worldMatrixMap.get(parentBoneName);
          worldMatrix.decompose(_v3A6, _quatA7, _v3A6);
          _quatA7.invert();
          parentWorldMatrix.decompose(_v3A6, _quatB4, _v3A6);
          const trackValues = arrayChunk(origTrack.values, 4).flatMap(
            (q) => _quatC2.fromArray(q).premultiply(_quatB4).multiply(_quatA7).toArray()
          );
          const track = origTrack.clone();
          track.values = new Float32Array(trackValues);
          result.humanoidTracks.rotation.set(boneName, track);
        } else {
          throw new Error(`Invalid path "${path}"`);
        }
        return;
      }
      const expressionName = nodeMap.expressionsIndexToName.get(node);
      if (expressionName != null) {
        if (path === "translation") {
          const times = origTrack.times;
          const values = new Float32Array(origTrack.values.length / 3);
          for (let i = 0; i < values.length; i++) {
            values[i] = origTrack.values[3 * i];
          }
          const newTrack = new THREE20.NumberKeyframeTrack(`${expressionName}.weight`, times, values);
          if (vrmExpressionPresetNameSet.has(expressionName)) {
            result.expressionTracks.preset.set(expressionName, newTrack);
          } else {
            result.expressionTracks.custom.set(expressionName, newTrack);
          }
        } else {
          throw new Error(`Invalid path "${path}"`);
        }
        return;
      }
      if (node === nodeMap.lookAtIndex) {
        if (path === "rotation") {
          result.lookAtTrack = origTrack;
        } else {
          throw new Error(`Invalid path "${path}"`);
        }
      }
    });
    return result;
  }
};
export {
  VRMAnimation,
  VRMAnimationLoaderPlugin,
  VRMLookAtQuaternionProxy,
  createVRMAnimationClip,
  createVRMAnimationExpressionTracks,
  createVRMAnimationHumanoidTracks,
  createVRMAnimationLookAtTrack
};
/*!
 * @pixiv/three-vrm-core v3.5.4
 * The implementation of core features of VRM, for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2026 pixiv Inc.
 * @pixiv/three-vrm-core is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2NyZWF0ZVZSTUFuaW1hdGlvbkNsaXAudHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL2V4cHJlc3Npb25zL1ZSTUV4cHJlc3Npb24udHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL2V4cHJlc3Npb25zL1ZSTUV4cHJlc3Npb25Mb2FkZXJQbHVnaW4udHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL3V0aWxzL2dsdGZFeHRyYWN0UHJpbWl0aXZlc0Zyb21Ob2RlLnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9leHByZXNzaW9ucy9WUk1FeHByZXNzaW9uUHJlc2V0TmFtZS50cyIsICIuLi8uLi90aHJlZS12cm0tY29yZS9zcmMvdXRpbHMvc2F0dXJhdGUudHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL2V4cHJlc3Npb25zL1ZSTUV4cHJlc3Npb25NYW5hZ2VyLnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9leHByZXNzaW9ucy9WUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGUudHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL2V4cHJlc3Npb25zL1ZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yQmluZC50cyIsICIuLi8uLi90aHJlZS12cm0tY29yZS9zcmMvZXhwcmVzc2lvbnMvVlJNRXhwcmVzc2lvbk1vcnBoVGFyZ2V0QmluZC50cyIsICIuLi8uLi90aHJlZS12cm0tY29yZS9zcmMvZXhwcmVzc2lvbnMvVlJNRXhwcmVzc2lvblRleHR1cmVUcmFuc2Zvcm1CaW5kLnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9leHByZXNzaW9ucy9WUk1FeHByZXNzaW9uT3ZlcnJpZGVUeXBlLnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9maXJzdFBlcnNvbi9WUk1GaXJzdFBlcnNvbi50cyIsICIuLi8uLi90aHJlZS12cm0tY29yZS9zcmMvZmlyc3RQZXJzb24vVlJNRmlyc3RQZXJzb25Mb2FkZXJQbHVnaW4udHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL2ZpcnN0UGVyc29uL1ZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb25UeXBlLnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9odW1hbm9pZC9oZWxwZXJzL1ZSTUh1bWFub2lkSGVscGVyLnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9odW1hbm9pZC9WUk1IdW1hbkJvbmVMaXN0LnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9odW1hbm9pZC9WUk1IdW1hbkJvbmVOYW1lLnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9odW1hbm9pZC9WUk1IdW1hbkJvbmVQYXJlbnRNYXAudHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL2h1bWFub2lkL1ZSTVJpZy50cyIsICIuLi8uLi90aHJlZS12cm0tY29yZS9zcmMvdXRpbHMvcXVhdEludmVydENvbXBhdC50cyIsICIuLi8uLi90aHJlZS12cm0tY29yZS9zcmMvaHVtYW5vaWQvVlJNSHVtYW5vaWRSaWcudHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL2h1bWFub2lkL1ZSTUh1bWFub2lkLnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9odW1hbm9pZC9WUk1SZXF1aXJlZEh1bWFuQm9uZU5hbWUudHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL2h1bWFub2lkL1ZSTUh1bWFub2lkTG9hZGVyUGx1Z2luLnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9sb29rQXQvaGVscGVycy9WUk1Mb29rQXRIZWxwZXIudHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL2xvb2tBdC9oZWxwZXJzL3V0aWxzL0ZhbkJ1ZmZlckdlb21ldHJ5LnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9sb29rQXQvaGVscGVycy91dGlscy9MaW5lQW5kU3BoZXJlQnVmZmVyR2VvbWV0cnkudHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL2xvb2tBdC9WUk1Mb29rQXQudHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL3V0aWxzL2dldFdvcmxkUXVhdGVybmlvbkxpdGUudHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL2xvb2tBdC91dGlscy9jYWxjQXppbXV0aEFsdGl0dWRlLnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9sb29rQXQvdXRpbHMvc2FuaXRpemVBbmdsZS50cyIsICIuLi8uLi90aHJlZS12cm0tY29yZS9zcmMvbG9va0F0L1ZSTUxvb2tBdEJvbmVBcHBsaWVyLnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9sb29rQXQvVlJNTG9va0F0RXhwcmVzc2lvbkFwcGxpZXIudHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL2xvb2tBdC9WUk1Mb29rQXRSYW5nZU1hcC50cyIsICIuLi8uLi90aHJlZS12cm0tY29yZS9zcmMvbG9va0F0L1ZSTUxvb2tBdExvYWRlclBsdWdpbi50cyIsICIuLi8uLi90aHJlZS12cm0tY29yZS9zcmMvbG9va0F0L1ZSTUxvb2tBdFR5cGVOYW1lLnRzIiwgIi4uLy4uL3RocmVlLXZybS1jb3JlL3NyYy9tZXRhL1ZSTU1ldGFMb2FkZXJQbHVnaW4udHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL3V0aWxzL3Jlc29sdmVVUkwudHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL1ZSTUNvcmUudHMiLCAiLi4vLi4vdGhyZWUtdnJtLWNvcmUvc3JjL1ZSTUNvcmVMb2FkZXJQbHVnaW4udHMiLCAiLi4vc3JjL1ZSTUxvb2tBdFF1YXRlcm5pb25Qcm94eS50cyIsICIuLi9zcmMvVlJNQW5pbWF0aW9uLnRzIiwgIi4uL3NyYy9WUk1BbmltYXRpb25Mb2FkZXJQbHVnaW4udHMiLCAiLi4vc3JjL3V0aWxzL2FycmF5Q2h1bmsudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB0eXBlIHtcbiAgVlJNQ29yZSxcbiAgVlJNRXhwcmVzc2lvbk1hbmFnZXIsXG4gIFZSTUV4cHJlc3Npb25QcmVzZXROYW1lLFxuICBWUk1IdW1hbkJvbmVOYW1lLFxuICBWUk1IdW1hbm9pZCxcbn0gZnJvbSAnQHBpeGl2L3RocmVlLXZybS1jb3JlJztcbmltcG9ydCB0eXBlIHsgVlJNQW5pbWF0aW9uIH0gZnJvbSAnLi9WUk1BbmltYXRpb24nO1xuaW1wb3J0IHsgVlJNTG9va0F0UXVhdGVybmlvblByb3h5IH0gZnJvbSAnLi9WUk1Mb29rQXRRdWF0ZXJuaW9uUHJveHknO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVlJNQW5pbWF0aW9uSHVtYW5vaWRUcmFja3MoXG4gIHZybUFuaW1hdGlvbjogVlJNQW5pbWF0aW9uLFxuICBodW1hbm9pZDogVlJNSHVtYW5vaWQsXG4gIG1ldGFWZXJzaW9uOiAnMCcgfCAnMScsXG4pOiB7XG4gIHRyYW5zbGF0aW9uOiBNYXA8J2hpcHMnLCBUSFJFRS5WZWN0b3JLZXlmcmFtZVRyYWNrPjtcbiAgcm90YXRpb246IE1hcDxWUk1IdW1hbkJvbmVOYW1lLCBUSFJFRS5RdWF0ZXJuaW9uS2V5ZnJhbWVUcmFjaz47XG59IHtcbiAgY29uc3QgdHJhbnNsYXRpb24gPSBuZXcgTWFwPCdoaXBzJywgVEhSRUUuVmVjdG9yS2V5ZnJhbWVUcmFjaz4oKTtcbiAgY29uc3Qgcm90YXRpb24gPSBuZXcgTWFwPFZSTUh1bWFuQm9uZU5hbWUsIFRIUkVFLlZlY3RvcktleWZyYW1lVHJhY2s+KCk7XG5cbiAgZm9yIChjb25zdCBbbmFtZSwgb3JpZ1RyYWNrXSBvZiB2cm1BbmltYXRpb24uaHVtYW5vaWRUcmFja3Mucm90YXRpb24uZW50cmllcygpKSB7XG4gICAgY29uc3Qgbm9kZU5hbWUgPSBodW1hbm9pZC5nZXROb3JtYWxpemVkQm9uZU5vZGUobmFtZSk/Lm5hbWU7XG5cbiAgICBpZiAobm9kZU5hbWUgIT0gbnVsbCkge1xuICAgICAgY29uc3QgdHJhY2sgPSBuZXcgVEhSRUUuUXVhdGVybmlvbktleWZyYW1lVHJhY2soXG4gICAgICAgIGAke25vZGVOYW1lfS5xdWF0ZXJuaW9uYCxcbiAgICAgICAgb3JpZ1RyYWNrLnRpbWVzLFxuICAgICAgICBvcmlnVHJhY2sudmFsdWVzLm1hcCgodiwgaSkgPT4gKG1ldGFWZXJzaW9uID09PSAnMCcgJiYgaSAlIDIgPT09IDAgPyAtdiA6IHYpKSxcbiAgICAgICk7XG4gICAgICByb3RhdGlvbi5zZXQobmFtZSwgdHJhY2spO1xuICAgIH1cbiAgfVxuXG4gIGZvciAoY29uc3QgW25hbWUsIG9yaWdUcmFja10gb2YgdnJtQW5pbWF0aW9uLmh1bWFub2lkVHJhY2tzLnRyYW5zbGF0aW9uLmVudHJpZXMoKSkge1xuICAgIGNvbnN0IG5vZGVOYW1lID0gaHVtYW5vaWQuZ2V0Tm9ybWFsaXplZEJvbmVOb2RlKG5hbWUpPy5uYW1lO1xuXG4gICAgaWYgKG5vZGVOYW1lICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGFuaW1hdGlvblkgPSB2cm1BbmltYXRpb24ucmVzdEhpcHNQb3NpdGlvbi55O1xuICAgICAgY29uc3QgaHVtYW5vaWRZID0gaHVtYW5vaWQubm9ybWFsaXplZFJlc3RQb3NlLmhpcHMhLnBvc2l0aW9uIVsxXTtcbiAgICAgIGNvbnN0IHNjYWxlID0gaHVtYW5vaWRZIC8gYW5pbWF0aW9uWTtcblxuICAgICAgY29uc3QgdHJhY2sgPSBvcmlnVHJhY2suY2xvbmUoKTtcbiAgICAgIHRyYWNrLnZhbHVlcyA9IHRyYWNrLnZhbHVlcy5tYXAoKHYsIGkpID0+IChtZXRhVmVyc2lvbiA9PT0gJzAnICYmIGkgJSAzICE9PSAxID8gLXYgOiB2KSAqIHNjYWxlKTtcbiAgICAgIHRyYWNrLm5hbWUgPSBgJHtub2RlTmFtZX0ucG9zaXRpb25gO1xuICAgICAgdHJhbnNsYXRpb24uc2V0KG5hbWUsIHRyYWNrKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4geyB0cmFuc2xhdGlvbiwgcm90YXRpb24gfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVZSTUFuaW1hdGlvbkV4cHJlc3Npb25UcmFja3MoXG4gIHZybUFuaW1hdGlvbjogVlJNQW5pbWF0aW9uLFxuICBleHByZXNzaW9uTWFuYWdlcjogVlJNRXhwcmVzc2lvbk1hbmFnZXIsXG4pOiB7XG4gIHByZXNldDogTWFwPFZSTUV4cHJlc3Npb25QcmVzZXROYW1lLCBUSFJFRS5OdW1iZXJLZXlmcmFtZVRyYWNrPjtcbiAgY3VzdG9tOiBNYXA8c3RyaW5nLCBUSFJFRS5OdW1iZXJLZXlmcmFtZVRyYWNrPjtcbn0ge1xuICBjb25zdCBwcmVzZXQgPSBuZXcgTWFwPFZSTUV4cHJlc3Npb25QcmVzZXROYW1lLCBUSFJFRS5OdW1iZXJLZXlmcmFtZVRyYWNrPigpO1xuICBjb25zdCBjdXN0b20gPSBuZXcgTWFwPHN0cmluZywgVEhSRUUuTnVtYmVyS2V5ZnJhbWVUcmFjaz4oKTtcblxuICBmb3IgKGNvbnN0IFtuYW1lLCBvcmlnVHJhY2tdIG9mIHZybUFuaW1hdGlvbi5leHByZXNzaW9uVHJhY2tzLnByZXNldC5lbnRyaWVzKCkpIHtcbiAgICBjb25zdCB0cmFja05hbWUgPSBleHByZXNzaW9uTWFuYWdlci5nZXRFeHByZXNzaW9uVHJhY2tOYW1lKG5hbWUpO1xuXG4gICAgaWYgKHRyYWNrTmFtZSAhPSBudWxsKSB7XG4gICAgICBjb25zdCB0cmFjayA9IG9yaWdUcmFjay5jbG9uZSgpO1xuICAgICAgdHJhY2submFtZSA9IHRyYWNrTmFtZTtcbiAgICAgIHByZXNldC5zZXQobmFtZSwgdHJhY2spO1xuICAgIH1cbiAgfVxuXG4gIGZvciAoY29uc3QgW25hbWUsIG9yaWdUcmFja10gb2YgdnJtQW5pbWF0aW9uLmV4cHJlc3Npb25UcmFja3MuY3VzdG9tLmVudHJpZXMoKSkge1xuICAgIGNvbnN0IHRyYWNrTmFtZSA9IGV4cHJlc3Npb25NYW5hZ2VyLmdldEV4cHJlc3Npb25UcmFja05hbWUobmFtZSk7XG5cbiAgICBpZiAodHJhY2tOYW1lICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IHRyYWNrID0gb3JpZ1RyYWNrLmNsb25lKCk7XG4gICAgICB0cmFjay5uYW1lID0gdHJhY2tOYW1lO1xuICAgICAgY3VzdG9tLnNldChuYW1lLCB0cmFjayk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHsgcHJlc2V0LCBjdXN0b20gfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVZSTUFuaW1hdGlvbkxvb2tBdFRyYWNrKFxuICB2cm1BbmltYXRpb246IFZSTUFuaW1hdGlvbixcbiAgdHJhY2tOYW1lOiBzdHJpbmcsXG4pOiBUSFJFRS5LZXlmcmFtZVRyYWNrIHwgbnVsbCB7XG4gIGlmICh2cm1BbmltYXRpb24ubG9va0F0VHJhY2sgPT0gbnVsbCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3QgdHJhY2sgPSB2cm1BbmltYXRpb24ubG9va0F0VHJhY2suY2xvbmUoKTtcbiAgdHJhY2submFtZSA9IHRyYWNrTmFtZTtcbiAgcmV0dXJuIHRyYWNrO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhbiBBbmltYXRpb25DbGlwIG91dCBvZiB0aGUgZ2l2ZW4gVlJNQW5pbWF0aW9uIGFuZCB0aGUgVlJNLlxuICpcbiAqIEBwYXJhbSB2cm1BbmltYXRpb24gQSB7QGxpbmsgVlJNQW5pbWF0aW9ufS5cbiAqIEBwYXJhbSB2cm0gQSB7QGxpbmsgVlJNQ29yZX0uXG4gKiBAcmV0dXJucyBBbiBBbmltYXRpb25DbGlwXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVWUk1BbmltYXRpb25DbGlwKHZybUFuaW1hdGlvbjogVlJNQW5pbWF0aW9uLCB2cm06IFZSTUNvcmUpOiBUSFJFRS5BbmltYXRpb25DbGlwIHtcbiAgY29uc3QgdHJhY2tzOiBUSFJFRS5LZXlmcmFtZVRyYWNrW10gPSBbXTtcblxuICBjb25zdCBodW1hbm9pZFRyYWNrcyA9IGNyZWF0ZVZSTUFuaW1hdGlvbkh1bWFub2lkVHJhY2tzKHZybUFuaW1hdGlvbiwgdnJtLmh1bWFub2lkLCB2cm0ubWV0YS5tZXRhVmVyc2lvbik7XG4gIHRyYWNrcy5wdXNoKC4uLmh1bWFub2lkVHJhY2tzLnRyYW5zbGF0aW9uLnZhbHVlcygpKTtcbiAgdHJhY2tzLnB1c2goLi4uaHVtYW5vaWRUcmFja3Mucm90YXRpb24udmFsdWVzKCkpO1xuXG4gIGlmICh2cm0uZXhwcmVzc2lvbk1hbmFnZXIgIT0gbnVsbCkge1xuICAgIGNvbnN0IGV4cHJlc3Npb25UcmFja3MgPSBjcmVhdGVWUk1BbmltYXRpb25FeHByZXNzaW9uVHJhY2tzKHZybUFuaW1hdGlvbiwgdnJtLmV4cHJlc3Npb25NYW5hZ2VyKTtcbiAgICB0cmFja3MucHVzaCguLi5leHByZXNzaW9uVHJhY2tzLnByZXNldC52YWx1ZXMoKSk7XG4gICAgdHJhY2tzLnB1c2goLi4uZXhwcmVzc2lvblRyYWNrcy5jdXN0b20udmFsdWVzKCkpO1xuICB9XG5cbiAgaWYgKHZybS5sb29rQXQgIT0gbnVsbCkge1xuICAgIC8vIHNlYXJjaCBWUk1Mb29rQXRRdWF0ZXJuaW9uUHJveHlcbiAgICBsZXQgcHJveHkgPSB2cm0uc2NlbmUuY2hpbGRyZW4uZmluZCgob2JqKSA9PiBvYmogaW5zdGFuY2VvZiBWUk1Mb29rQXRRdWF0ZXJuaW9uUHJveHkpO1xuXG4gICAgaWYgKHByb3h5ID09IG51bGwpIHtcbiAgICAgIC8vIGlmIG5vdCBmb3VuZCwgY3JlYXRlIGEgbmV3IG9uZVxuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAnY3JlYXRlVlJNQW5pbWF0aW9uQ2xpcDogVlJNTG9va0F0UXVhdGVybmlvblByb3h5IGlzIG5vdCBmb3VuZC4gQ3JlYXRpbmcgYSBuZXcgb25lIGF1dG9tYXRpY2FsbHkuIFRvIHN1cHByZXNzIHRoaXMgd2FybmluZywgY3JlYXRlIGEgVlJNTG9va0F0UXVhdGVybmlvblByb3h5IG1hbnVhbGx5JyxcbiAgICAgICk7XG5cbiAgICAgIHByb3h5ID0gbmV3IFZSTUxvb2tBdFF1YXRlcm5pb25Qcm94eSh2cm0ubG9va0F0KTtcbiAgICAgIHByb3h5Lm5hbWUgPSAnVlJNTG9va0F0UXVhdGVybmlvblByb3h5JztcbiAgICAgIHZybS5zY2VuZS5hZGQocHJveHkpO1xuICAgIH0gZWxzZSBpZiAocHJveHkubmFtZSA9PT0gJycpIHtcbiAgICAgIC8vIGlmIGZvdW5kIGJ1dCBuYW1lIGlzIG5vdCBzZXQsIHNldCB0aGUgbmFtZSBhdXRvbWF0aWNhbGx5XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICdjcmVhdGVWUk1BbmltYXRpb25DbGlwOiBWUk1Mb29rQXRRdWF0ZXJuaW9uUHJveHkgaXMgZm91bmQgYnV0IGl0cyBuYW1lIGlzIG5vdCBzZXQuIFNldHRpbmcgdGhlIG5hbWUgYXV0b21hdGljYWxseS4gVG8gc3VwcHJlc3MgdGhpcyB3YXJuaW5nLCBzZXQgdGhlIG5hbWUgbWFudWFsbHknLFxuICAgICAgKTtcblxuICAgICAgcHJveHkubmFtZSA9ICdWUk1Mb29rQXRRdWF0ZXJuaW9uUHJveHknO1xuICAgIH1cblxuICAgIC8vIGNyZWF0ZSBhIHRyYWNrXG4gICAgY29uc3QgdHJhY2sgPSBjcmVhdGVWUk1BbmltYXRpb25Mb29rQXRUcmFjayh2cm1BbmltYXRpb24sIGAke3Byb3h5Lm5hbWV9LnF1YXRlcm5pb25gKTtcbiAgICBpZiAodHJhY2sgIT0gbnVsbCkge1xuICAgICAgdHJhY2tzLnB1c2godHJhY2spO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXcgVEhSRUUuQW5pbWF0aW9uQ2xpcCgnQ2xpcCcsIHZybUFuaW1hdGlvbi5kdXJhdGlvbiwgdHJhY2tzKTtcbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1FeHByZXNzaW9uQmluZCB9IGZyb20gJy4vVlJNRXhwcmVzc2lvbkJpbmQnO1xuaW1wb3J0IHR5cGUgeyBWUk1FeHByZXNzaW9uT3ZlcnJpZGVUeXBlIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uT3ZlcnJpZGVUeXBlJztcbmltcG9ydCB0eXBlIHsgVlJNRXhwcmVzc2lvbk1hbmFnZXIgfSBmcm9tICcuL1ZSTUV4cHJlc3Npb25NYW5hZ2VyJztcblxuLy8gYW5pbWF0aW9uTWl4ZXIgXHUzMDZFXHU3NkUzXHU4OTk2XHU1QkZFXHU4QzYxXHUzMDZGXHUzMDAxU2NlbmUgXHUzMDZFXHU0RTJEXHUzMDZCXHU1MTY1XHUzMDYzXHUzMDY2XHUzMDQ0XHUzMDhCXHU1RkM1XHU4OTgxXHUzMDRDXHUzMDQyXHUzMDhCXHUzMDAyXG4vLyBcdTMwNURcdTMwNkVcdTMwNUZcdTMwODFcdTMwMDFcdTg4NjhcdTc5M0FcdTMwQUFcdTMwRDZcdTMwQjhcdTMwQTdcdTMwQUZcdTMwQzhcdTMwNjdcdTMwNkZcdTMwNkFcdTMwNDRcdTMwNTFcdTMwOENcdTMwNjlcdTMwMDFPYmplY3QzRCBcdTMwOTJcdTdEOTlcdTYyN0ZcdTMwNTdcdTMwNjYgU2NlbmUgXHUzMDZCXHU2Mjk1XHU1MTY1XHUzMDY3XHUzMDREXHUzMDhCXHUzMDg4XHUzMDQ2XHUzMDZCXHUzMDU5XHUzMDhCXHUzMDAyXG5leHBvcnQgY2xhc3MgVlJNRXhwcmVzc2lvbiBleHRlbmRzIFRIUkVFLk9iamVjdDNEIHtcbiAgLyoqXG4gICAqIE5hbWUgb2YgdGhpcyBleHByZXNzaW9uLlxuICAgKiBEaXN0aW5ndWlzaGVkIHdpdGggYG5hbWVgIHNpbmNlIGBuYW1lYCB3aWxsIGJlIGNvbmZsaWN0ZWQgd2l0aCBPYmplY3QzRC5cbiAgICovXG4gIHB1YmxpYyBleHByZXNzaW9uTmFtZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgY3VycmVudCB3ZWlnaHQgb2YgdGhlIGV4cHJlc3Npb24uXG4gICAqXG4gICAqIFlvdSB1c3VhbGx5IHdhbnQgdG8gc2V0IHRoZSB3ZWlnaHQgdmlhIHtAbGluayBWUk1FeHByZXNzaW9uTWFuYWdlci5zZXRWYWx1ZX0uXG4gICAqXG4gICAqIEl0IG1pZ2h0IGFsc28gYmUgY29udHJvbGxlZCBieSB0aGUgVGhyZWUuanMgYW5pbWF0aW9uIHN5c3RlbS5cbiAgICovXG4gIHB1YmxpYyB3ZWlnaHQgPSAwLjA7XG5cbiAgLyoqXG4gICAqIEludGVycHJldCB2YWx1ZXMgZ3JlYXRlciB0aGFuIDAuNSBhcyAxLjAsIG9ydGhlcndpc2UgMC4wLlxuICAgKi9cbiAgcHVibGljIGlzQmluYXJ5ID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFNwZWNpZnkgaG93IHRoZSBleHByZXNzaW9uIG92ZXJyaWRlcyBibGluayBleHByZXNzaW9ucy5cbiAgICovXG4gIHB1YmxpYyBvdmVycmlkZUJsaW5rOiBWUk1FeHByZXNzaW9uT3ZlcnJpZGVUeXBlID0gJ25vbmUnO1xuXG4gIC8qKlxuICAgKiBTcGVjaWZ5IGhvdyB0aGUgZXhwcmVzc2lvbiBvdmVycmlkZXMgbG9va0F0IGV4cHJlc3Npb25zLlxuICAgKi9cbiAgcHVibGljIG92ZXJyaWRlTG9va0F0OiBWUk1FeHByZXNzaW9uT3ZlcnJpZGVUeXBlID0gJ25vbmUnO1xuXG4gIC8qKlxuICAgKiBTcGVjaWZ5IGhvdyB0aGUgZXhwcmVzc2lvbiBvdmVycmlkZXMgbW91dGggZXhwcmVzc2lvbnMuXG4gICAqL1xuICBwdWJsaWMgb3ZlcnJpZGVNb3V0aDogVlJNRXhwcmVzc2lvbk92ZXJyaWRlVHlwZSA9ICdub25lJztcblxuICAvKipcbiAgICogQmluZHMgdGhhdCB0aGlzIGV4cHJlc3Npb24gaW5mbHVlbmNlcy5cbiAgICovXG4gIHByaXZhdGUgX2JpbmRzOiBWUk1FeHByZXNzaW9uQmluZFtdID0gW107XG5cbiAgLyoqXG4gICAqIEJpbmRzIHRoYXQgdGhpcyBleHByZXNzaW9uIGluZmx1ZW5jZXMuXG4gICAqL1xuICBwdWJsaWMgZ2V0IGJpbmRzKCk6IHJlYWRvbmx5IFZSTUV4cHJlc3Npb25CaW5kW10ge1xuICAgIHJldHVybiB0aGlzLl9iaW5kcztcbiAgfVxuXG4gIG92ZXJyaWRlIHJlYWRvbmx5IHR5cGU6IHN0cmluZyB8ICdWUk1FeHByZXNzaW9uJztcblxuICAvKipcbiAgICogQSB2YWx1ZSByZXByZXNlbnRzIGhvdyBtdWNoIGl0IHNob3VsZCBvdmVycmlkZSBibGluayBleHByZXNzaW9ucy5cbiAgICogYDAuMGAgPT0gbm8gb3ZlcnJpZGUgYXQgYWxsLCBgMS4wYCA9PSBjb21wbGV0ZWx5IGJsb2NrIHRoZSBleHByZXNzaW9ucy5cbiAgICovXG4gIHB1YmxpYyBnZXQgb3ZlcnJpZGVCbGlua0Ftb3VudCgpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLm92ZXJyaWRlQmxpbmsgPT09ICdibG9jaycpIHtcbiAgICAgIHJldHVybiAwLjAgPCB0aGlzLm91dHB1dFdlaWdodCA/IDEuMCA6IDAuMDtcbiAgICB9IGVsc2UgaWYgKHRoaXMub3ZlcnJpZGVCbGluayA9PT0gJ2JsZW5kJykge1xuICAgICAgcmV0dXJuIHRoaXMub3V0cHV0V2VpZ2h0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gMC4wO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBIHZhbHVlIHJlcHJlc2VudHMgaG93IG11Y2ggaXQgc2hvdWxkIG92ZXJyaWRlIGxvb2tBdCBleHByZXNzaW9ucy5cbiAgICogYDAuMGAgPT0gbm8gb3ZlcnJpZGUgYXQgYWxsLCBgMS4wYCA9PSBjb21wbGV0ZWx5IGJsb2NrIHRoZSBleHByZXNzaW9ucy5cbiAgICovXG4gIHB1YmxpYyBnZXQgb3ZlcnJpZGVMb29rQXRBbW91bnQoKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5vdmVycmlkZUxvb2tBdCA9PT0gJ2Jsb2NrJykge1xuICAgICAgcmV0dXJuIDAuMCA8IHRoaXMub3V0cHV0V2VpZ2h0ID8gMS4wIDogMC4wO1xuICAgIH0gZWxzZSBpZiAodGhpcy5vdmVycmlkZUxvb2tBdCA9PT0gJ2JsZW5kJykge1xuICAgICAgcmV0dXJuIHRoaXMub3V0cHV0V2VpZ2h0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gMC4wO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBIHZhbHVlIHJlcHJlc2VudHMgaG93IG11Y2ggaXQgc2hvdWxkIG92ZXJyaWRlIG1vdXRoIGV4cHJlc3Npb25zLlxuICAgKiBgMC4wYCA9PSBubyBvdmVycmlkZSBhdCBhbGwsIGAxLjBgID09IGNvbXBsZXRlbHkgYmxvY2sgdGhlIGV4cHJlc3Npb25zLlxuICAgKi9cbiAgcHVibGljIGdldCBvdmVycmlkZU1vdXRoQW1vdW50KCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMub3ZlcnJpZGVNb3V0aCA9PT0gJ2Jsb2NrJykge1xuICAgICAgcmV0dXJuIDAuMCA8IHRoaXMub3V0cHV0V2VpZ2h0ID8gMS4wIDogMC4wO1xuICAgIH0gZWxzZSBpZiAodGhpcy5vdmVycmlkZU1vdXRoID09PSAnYmxlbmQnKSB7XG4gICAgICByZXR1cm4gdGhpcy5vdXRwdXRXZWlnaHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAwLjA7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFuIG91dHB1dCB3ZWlnaHQgb2YgdGhpcyBleHByZXNzaW9uLCBjb25zaWRlcmluZyB0aGUge0BsaW5rIGlzQmluYXJ5fS5cbiAgICovXG4gIHB1YmxpYyBnZXQgb3V0cHV0V2VpZ2h0KCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMuaXNCaW5hcnkpIHtcbiAgICAgIHJldHVybiB0aGlzLndlaWdodCA+IDAuNSA/IDEuMCA6IDAuMDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy53ZWlnaHQ7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihleHByZXNzaW9uTmFtZTogc3RyaW5nKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMubmFtZSA9IGBWUk1FeHByZXNzaW9uXyR7ZXhwcmVzc2lvbk5hbWV9YDtcbiAgICB0aGlzLmV4cHJlc3Npb25OYW1lID0gZXhwcmVzc2lvbk5hbWU7XG5cbiAgICAvLyB0cmF2ZXJzZSBcdTY2NDJcdTMwNkVcdTY1NTFcdTZFMDhcdTYyNEJcdTZCQjVcdTMwNjhcdTMwNTdcdTMwNjYgT2JqZWN0M0QgXHUzMDY3XHUzMDZGXHUzMDZBXHUzMDQ0XHUzMDUzXHUzMDY4XHUzMDkyXHU2NjBFXHU3OTNBXHUzMDU3XHUzMDY2XHUzMDRBXHUzMDRGXG4gICAgdGhpcy50eXBlID0gJ1ZSTUV4cHJlc3Npb24nO1xuXG4gICAgLy8gXHU4ODY4XHU3OTNBXHU3NkVFXHU3Njg0XHUzMDZFXHUzMEFBXHUzMEQ2XHUzMEI4XHUzMEE3XHUzMEFGXHUzMEM4XHUzMDY3XHUzMDZGXHUzMDZBXHUzMDQ0XHUzMDZFXHUzMDY3XHUzMDAxXHU4Q0EwXHU4Mzc3XHU4RUZEXHU2RTFCXHUzMDZFXHUzMDVGXHUzMDgxXHUzMDZCIHZpc2libGUgXHUzMDkyIGZhbHNlIFx1MzA2Qlx1MzA1N1x1MzA2Nlx1MzA0QVx1MzA0Rlx1MzAwMlxuICAgIC8vIFx1MzA1M1x1MzA4Q1x1MzA2Qlx1MzA4OFx1MzA4QVx1MzAwMVx1MzA1M1x1MzA2RVx1MzBBNFx1MzBGM1x1MzBCOVx1MzBCRlx1MzBGM1x1MzBCOVx1MzA2Qlx1NUJGRVx1MzA1OVx1MzA4Qlx1NkJDRVx1MzBENVx1MzBFQ1x1MzBGQ1x1MzBFMFx1MzA2RSBtYXRyaXggXHU4MUVBXHU1MkQ1XHU4QTA4XHU3Qjk3XHUzMDkyXHU3NzAxXHU3NTY1XHUzMDY3XHUzMDREXHUzMDhCXHUzMDAyXG4gICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGFuIGV4cHJlc3Npb24gYmluZCB0byB0aGUgZXhwcmVzc2lvbi5cbiAgICpcbiAgICogQHBhcmFtIGJpbmQgQSBiaW5kIHRvIGFkZFxuICAgKi9cbiAgcHVibGljIGFkZEJpbmQoYmluZDogVlJNRXhwcmVzc2lvbkJpbmQpOiB2b2lkIHtcbiAgICB0aGlzLl9iaW5kcy5wdXNoKGJpbmQpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZSBhbiBleHByZXNzaW9uIGJpbmQgZnJvbSB0aGUgZXhwcmVzc2lvbi5cbiAgICpcbiAgICogQHBhcmFtIGJpbmQgQSBiaW5kIHRvIGRlbGV0ZVxuICAgKi9cbiAgcHVibGljIGRlbGV0ZUJpbmQoYmluZDogVlJNRXhwcmVzc2lvbkJpbmQpOiB2b2lkIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuX2JpbmRzLmluZGV4T2YoYmluZCk7XG4gICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgIHRoaXMuX2JpbmRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHdlaWdodCB0byBldmVyeSBhc3NpZ25lZCBibGVuZCBzaGFwZXMuXG4gICAqIFNob3VsZCBiZSBjYWxsZWQgZXZlcnkgZnJhbWUuXG4gICAqL1xuICBwdWJsaWMgYXBwbHlXZWlnaHQob3B0aW9ucz86IHtcbiAgICAvKipcbiAgICAgKiBNdWx0aXBsaWVzIGEgdmFsdWUgdG8gaXRzIHdlaWdodCB0byBhcHBseS5cbiAgICAgKiBJbnRlbmRlZCB0byBiZSB1c2VkIGZvciBvdmVycmlkaW5nIGFuIGV4cHJlc3Npb24gd2VpZ2h0IGJ5IGFub3RoZXIgZXhwcmVzc2lvbi5cbiAgICAgKiBTZWUgYWxzbzoge0BsaW5rIG92ZXJyaWRlQmxpbmt9LCB7QGxpbmsgb3ZlcnJpZGVMb29rQXR9LCB7QGxpbmsgb3ZlcnJpZGVNb3V0aH1cbiAgICAgKi9cbiAgICBtdWx0aXBsaWVyPzogbnVtYmVyO1xuICB9KTogdm9pZCB7XG4gICAgbGV0IGFjdHVhbFdlaWdodCA9IHRoaXMub3V0cHV0V2VpZ2h0O1xuICAgIGFjdHVhbFdlaWdodCAqPSBvcHRpb25zPy5tdWx0aXBsaWVyID8/IDEuMDtcblxuICAgIC8vIGlmIHRoZSBleHByZXNzaW9uIGlzIGJpbmFyeSwgdGhlIG92ZXJyaWRlIHZhbHVlIG11c3QgYmUgYWxzbyB0cmVhdGVkIGFzIGJpbmFyeVxuICAgIGlmICh0aGlzLmlzQmluYXJ5ICYmIGFjdHVhbFdlaWdodCA8IDEuMCkge1xuICAgICAgYWN0dWFsV2VpZ2h0ID0gMC4wO1xuICAgIH1cblxuICAgIHRoaXMuX2JpbmRzLmZvckVhY2goKGJpbmQpID0+IGJpbmQuYXBwbHlXZWlnaHQoYWN0dWFsV2VpZ2h0KSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXIgcHJldmlvdXNseSBhc3NpZ25lZCBibGVuZCBzaGFwZXMuXG4gICAqL1xuICBwdWJsaWMgY2xlYXJBcHBsaWVkV2VpZ2h0KCk6IHZvaWQge1xuICAgIHRoaXMuX2JpbmRzLmZvckVhY2goKGJpbmQpID0+IGJpbmQuY2xlYXJBcHBsaWVkV2VpZ2h0KCkpO1xuICB9XG59XG4iLCAiaW1wb3J0IHR5cGUgKiBhcyBWMFZSTSBmcm9tICdAcGl4aXYvdHlwZXMtdnJtLTAuMCc7XG5pbXBvcnQgdHlwZSAqIGFzIFYxVlJNU2NoZW1hIGZyb20gJ0BwaXhpdi90eXBlcy12cm1jLXZybS0xLjAnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgR0xURiwgR0xURkxvYWRlclBsdWdpbiwgR0xURlBhcnNlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXIuanMnO1xuaW1wb3J0IHsgZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGUgfSBmcm9tICcuLi91dGlscy9nbHRmRXh0cmFjdFByaW1pdGl2ZXNGcm9tTm9kZSc7XG5pbXBvcnQgeyBWUk1FeHByZXNzaW9uIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uJztcbmltcG9ydCB7IFZSTUV4cHJlc3Npb25NYW5hZ2VyIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uTWFuYWdlcic7XG5pbXBvcnQgeyB2MEV4cHJlc3Npb25NYXRlcmlhbENvbG9yTWFwIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGUnO1xuaW1wb3J0IHsgVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JCaW5kIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvckJpbmQnO1xuaW1wb3J0IHsgVlJNRXhwcmVzc2lvbk1vcnBoVGFyZ2V0QmluZCB9IGZyb20gJy4vVlJNRXhwcmVzc2lvbk1vcnBoVGFyZ2V0QmluZCc7XG5pbXBvcnQgeyBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSB9IGZyb20gJy4vVlJNRXhwcmVzc2lvblByZXNldE5hbWUnO1xuaW1wb3J0IHsgVlJNRXhwcmVzc2lvblRleHR1cmVUcmFuc2Zvcm1CaW5kIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uVGV4dHVyZVRyYW5zZm9ybUJpbmQnO1xuaW1wb3J0IHsgR0xURiBhcyBHTFRGU2NoZW1hIH0gZnJvbSAnQGdsdGYtdHJhbnNmb3JtL2NvcmUnO1xuXG4vKipcbiAqIFBvc3NpYmxlIHNwZWMgdmVyc2lvbnMgaXQgcmVjb2duaXplcy5cbiAqL1xuY29uc3QgUE9TU0lCTEVfU1BFQ19WRVJTSU9OUyA9IG5ldyBTZXQoWycxLjAnLCAnMS4wLWJldGEnXSk7XG5cbi8qKlxuICogQSBwbHVnaW4gb2YgR0xURkxvYWRlciB0aGF0IGltcG9ydHMgYSB7QGxpbmsgVlJNRXhwcmVzc2lvbk1hbmFnZXJ9IGZyb20gYSBWUk0gZXh0ZW5zaW9uIG9mIGEgR0xURi5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUV4cHJlc3Npb25Mb2FkZXJQbHVnaW4gaW1wbGVtZW50cyBHTFRGTG9hZGVyUGx1Z2luIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSB2MHYxUHJlc2V0TmFtZU1hcDogeyBbdjBOYW1lIGluIFYwVlJNLkJsZW5kU2hhcGVQcmVzZXROYW1lXT86IFZSTUV4cHJlc3Npb25QcmVzZXROYW1lIH0gPSB7XG4gICAgYTogJ2FhJyxcbiAgICBlOiAnZWUnLFxuICAgIGk6ICdpaCcsXG4gICAgbzogJ29oJyxcbiAgICB1OiAnb3UnLFxuICAgIGJsaW5rOiAnYmxpbmsnLFxuICAgIGpveTogJ2hhcHB5JyxcbiAgICBhbmdyeTogJ2FuZ3J5JyxcbiAgICBzb3Jyb3c6ICdzYWQnLFxuICAgIGZ1bjogJ3JlbGF4ZWQnLFxuICAgIGxvb2t1cDogJ2xvb2tVcCcsXG4gICAgbG9va2Rvd246ICdsb29rRG93bicsXG4gICAgbG9va2xlZnQ6ICdsb29rTGVmdCcsXG4gICAgbG9va3JpZ2h0OiAnbG9va1JpZ2h0JyxcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXG4gICAgYmxpbmtfbDogJ2JsaW5rTGVmdCcsXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxuICAgIGJsaW5rX3I6ICdibGlua1JpZ2h0JyxcbiAgICBuZXV0cmFsOiAnbmV1dHJhbCcsXG4gIH07XG5cbiAgcHVibGljIHJlYWRvbmx5IHBhcnNlcjogR0xURlBhcnNlcjtcblxuICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICAvLyBXZSBzaG91bGQgdXNlIHRoZSBleHRlbnNpb24gbmFtZSBpbnN0ZWFkIGJ1dCB3ZSBoYXZlIG11bHRpcGxlIHBsdWdpbnMgZm9yIGFuIGV4dGVuc2lvbi4uLlxuICAgIHJldHVybiAnVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbic7XG4gIH1cblxuICBwdWJsaWMgY29uc3RydWN0b3IocGFyc2VyOiBHTFRGUGFyc2VyKSB7XG4gICAgdGhpcy5wYXJzZXIgPSBwYXJzZXI7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgYWZ0ZXJSb290KGdsdGY6IEdMVEYpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBnbHRmLnVzZXJEYXRhLnZybUV4cHJlc3Npb25NYW5hZ2VyID0gYXdhaXQgdGhpcy5faW1wb3J0KGdsdGYpO1xuICB9XG5cbiAgLyoqXG4gICAqIEltcG9ydCBhIHtAbGluayBWUk1FeHByZXNzaW9uTWFuYWdlcn0gZnJvbSBhIFZSTS5cbiAgICpcbiAgICogQHBhcmFtIGdsdGYgQSBwYXJzZWQgcmVzdWx0IG9mIEdMVEYgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gICAqL1xuICBwcml2YXRlIGFzeW5jIF9pbXBvcnQoZ2x0ZjogR0xURik6IFByb21pc2U8VlJNRXhwcmVzc2lvbk1hbmFnZXIgfCBudWxsPiB7XG4gICAgY29uc3QgdjFSZXN1bHQgPSBhd2FpdCB0aGlzLl92MUltcG9ydChnbHRmKTtcbiAgICBpZiAodjFSZXN1bHQpIHtcbiAgICAgIHJldHVybiB2MVJlc3VsdDtcbiAgICB9XG5cbiAgICBjb25zdCB2MFJlc3VsdCA9IGF3YWl0IHRoaXMuX3YwSW1wb3J0KGdsdGYpO1xuICAgIGlmICh2MFJlc3VsdCkge1xuICAgICAgcmV0dXJuIHYwUmVzdWx0O1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfdjFJbXBvcnQoZ2x0ZjogR0xURik6IFByb21pc2U8VlJNRXhwcmVzc2lvbk1hbmFnZXIgfCBudWxsPiB7XG4gICAgY29uc3QganNvbiA9IHRoaXMucGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAgIC8vIGVhcmx5IGFib3J0IGlmIGl0IGRvZXNuJ3QgdXNlIHZybVxuICAgIGNvbnN0IGlzVlJNVXNlZCA9IGpzb24uZXh0ZW5zaW9uc1VzZWQ/LmluZGV4T2YoJ1ZSTUNfdnJtJykgIT09IC0xO1xuICAgIGlmICghaXNWUk1Vc2VkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBleHRlbnNpb24gPSBqc29uLmV4dGVuc2lvbnM/LlsnVlJNQ192cm0nXSBhcyBWMVZSTVNjaGVtYS5WUk1DVlJNIHwgdW5kZWZpbmVkO1xuICAgIGlmICghZXh0ZW5zaW9uKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzcGVjVmVyc2lvbiA9IGV4dGVuc2lvbi5zcGVjVmVyc2lvbjtcbiAgICBpZiAoIVBPU1NJQkxFX1NQRUNfVkVSU0lPTlMuaGFzKHNwZWNWZXJzaW9uKSkge1xuICAgICAgY29uc29sZS53YXJuKGBWUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luOiBVbmtub3duIFZSTUNfdnJtIHNwZWNWZXJzaW9uIFwiJHtzcGVjVmVyc2lvbn1cImApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc2NoZW1hRXhwcmVzc2lvbnMgPSBleHRlbnNpb24uZXhwcmVzc2lvbnM7XG4gICAgaWYgKCFzY2hlbWFFeHByZXNzaW9ucykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gbGlzdCBleHByZXNzaW9uc1xuICAgIGNvbnN0IHByZXNldE5hbWVTZXQgPSBuZXcgU2V0PHN0cmluZz4oT2JqZWN0LnZhbHVlcyhWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSkpO1xuICAgIGNvbnN0IG5hbWVTY2hlbWFFeHByZXNzaW9uTWFwID0gbmV3IE1hcDxzdHJpbmcsIFYxVlJNU2NoZW1hLkV4cHJlc3Npb24+KCk7XG5cbiAgICBpZiAoc2NoZW1hRXhwcmVzc2lvbnMucHJlc2V0ICE9IG51bGwpIHtcbiAgICAgIE9iamVjdC5lbnRyaWVzKHNjaGVtYUV4cHJlc3Npb25zLnByZXNldCkuZm9yRWFjaCgoW25hbWUsIHNjaGVtYUV4cHJlc3Npb25dKSA9PiB7XG4gICAgICAgIGlmIChzY2hlbWFFeHByZXNzaW9uID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gLy8gdHlwZXNjcmlwdFxuXG4gICAgICAgIGlmICghcHJlc2V0TmFtZVNldC5oYXMobmFtZSkpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oYFZSTUV4cHJlc3Npb25Mb2FkZXJQbHVnaW46IFVua25vd24gcHJlc2V0IG5hbWUgXCIke25hbWV9XCIgZGV0ZWN0ZWQuIElnbm9yaW5nIHRoZSBleHByZXNzaW9uYCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbmFtZVNjaGVtYUV4cHJlc3Npb25NYXAuc2V0KG5hbWUsIHNjaGVtYUV4cHJlc3Npb24pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHNjaGVtYUV4cHJlc3Npb25zLmN1c3RvbSAhPSBudWxsKSB7XG4gICAgICBPYmplY3QuZW50cmllcyhzY2hlbWFFeHByZXNzaW9ucy5jdXN0b20pLmZvckVhY2goKFtuYW1lLCBzY2hlbWFFeHByZXNzaW9uXSkgPT4ge1xuICAgICAgICBpZiAocHJlc2V0TmFtZVNldC5oYXMobmFtZSkpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICBgVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbjogQ3VzdG9tIGV4cHJlc3Npb24gY2Fubm90IGhhdmUgcHJlc2V0IG5hbWUgXCIke25hbWV9XCIuIElnbm9yaW5nIHRoZSBleHByZXNzaW9uYCxcbiAgICAgICAgICApO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIG5hbWVTY2hlbWFFeHByZXNzaW9uTWFwLnNldChuYW1lLCBzY2hlbWFFeHByZXNzaW9uKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIHByZXBhcmUgbWFuYWdlclxuICAgIGNvbnN0IG1hbmFnZXIgPSBuZXcgVlJNRXhwcmVzc2lvbk1hbmFnZXIoKTtcblxuICAgIC8vIGxvYWQgZXhwcmVzc2lvbnNcbiAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIEFycmF5LmZyb20obmFtZVNjaGVtYUV4cHJlc3Npb25NYXAuZW50cmllcygpKS5tYXAoYXN5bmMgKFtuYW1lLCBzY2hlbWFFeHByZXNzaW9uXSkgPT4ge1xuICAgICAgICBjb25zdCBleHByZXNzaW9uID0gbmV3IFZSTUV4cHJlc3Npb24obmFtZSk7XG4gICAgICAgIGdsdGYuc2NlbmUuYWRkKGV4cHJlc3Npb24pO1xuXG4gICAgICAgIGV4cHJlc3Npb24uaXNCaW5hcnkgPSBzY2hlbWFFeHByZXNzaW9uLmlzQmluYXJ5ID8/IGZhbHNlO1xuICAgICAgICBleHByZXNzaW9uLm92ZXJyaWRlQmxpbmsgPSBzY2hlbWFFeHByZXNzaW9uLm92ZXJyaWRlQmxpbmsgPz8gJ25vbmUnO1xuICAgICAgICBleHByZXNzaW9uLm92ZXJyaWRlTG9va0F0ID0gc2NoZW1hRXhwcmVzc2lvbi5vdmVycmlkZUxvb2tBdCA/PyAnbm9uZSc7XG4gICAgICAgIGV4cHJlc3Npb24ub3ZlcnJpZGVNb3V0aCA9IHNjaGVtYUV4cHJlc3Npb24ub3ZlcnJpZGVNb3V0aCA/PyAnbm9uZSc7XG5cbiAgICAgICAgc2NoZW1hRXhwcmVzc2lvbi5tb3JwaFRhcmdldEJpbmRzPy5mb3JFYWNoKGFzeW5jIChiaW5kKSA9PiB7XG4gICAgICAgICAgaWYgKGJpbmQubm9kZSA9PT0gdW5kZWZpbmVkIHx8IGJpbmQuaW5kZXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHByaW1pdGl2ZXMgPSAoYXdhaXQgZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGUoZ2x0ZiwgYmluZC5ub2RlKSkhO1xuICAgICAgICAgIGNvbnN0IG1vcnBoVGFyZ2V0SW5kZXggPSBiaW5kLmluZGV4O1xuXG4gICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIG1lc2ggaGFzIHRoZSB0YXJnZXQgbW9ycGggdGFyZ2V0XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgIXByaW1pdGl2ZXMuZXZlcnkoXG4gICAgICAgICAgICAgIChwcmltaXRpdmUpID0+XG4gICAgICAgICAgICAgICAgQXJyYXkuaXNBcnJheShwcmltaXRpdmUubW9ycGhUYXJnZXRJbmZsdWVuY2VzKSAmJlxuICAgICAgICAgICAgICAgIG1vcnBoVGFyZ2V0SW5kZXggPCBwcmltaXRpdmUubW9ycGhUYXJnZXRJbmZsdWVuY2VzLmxlbmd0aCxcbiAgICAgICAgICAgIClcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgICAgYFZSTUV4cHJlc3Npb25Mb2FkZXJQbHVnaW46ICR7c2NoZW1hRXhwcmVzc2lvbi5uYW1lfSBhdHRlbXB0cyB0byBpbmRleCBtb3JwaCAjJHttb3JwaFRhcmdldEluZGV4fSBidXQgbm90IGZvdW5kLmAsXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGV4cHJlc3Npb24uYWRkQmluZChcbiAgICAgICAgICAgIG5ldyBWUk1FeHByZXNzaW9uTW9ycGhUYXJnZXRCaW5kKHtcbiAgICAgICAgICAgICAgcHJpbWl0aXZlcyxcbiAgICAgICAgICAgICAgaW5kZXg6IG1vcnBoVGFyZ2V0SW5kZXgsXG4gICAgICAgICAgICAgIHdlaWdodDogYmluZC53ZWlnaHQgPz8gMS4wLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHNjaGVtYUV4cHJlc3Npb24ubWF0ZXJpYWxDb2xvckJpbmRzIHx8IHNjaGVtYUV4cHJlc3Npb24udGV4dHVyZVRyYW5zZm9ybUJpbmRzKSB7XG4gICAgICAgICAgLy8gbGlzdCB1cCBldmVyeSBtYXRlcmlhbCBpbiBgZ2x0Zi5zY2VuZWBcbiAgICAgICAgICBjb25zdCBnbHRmTWF0ZXJpYWxzOiBUSFJFRS5NYXRlcmlhbFtdID0gW107XG4gICAgICAgICAgZ2x0Zi5zY2VuZS50cmF2ZXJzZSgob2JqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtYXRlcmlhbCA9IChvYmplY3QgYXMgYW55KS5tYXRlcmlhbCBhcyBUSFJFRS5NYXRlcmlhbCB8IFRIUkVFLk1hdGVyaWFsW10gfCB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAobWF0ZXJpYWwpIHtcbiAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobWF0ZXJpYWwpKSB7XG4gICAgICAgICAgICAgICAgZ2x0Zk1hdGVyaWFscy5wdXNoKC4uLm1hdGVyaWFsKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBnbHRmTWF0ZXJpYWxzLnB1c2gobWF0ZXJpYWwpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBzY2hlbWFFeHByZXNzaW9uLm1hdGVyaWFsQ29sb3JCaW5kcz8uZm9yRWFjaChhc3luYyAoYmluZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWxzID0gZ2x0Zk1hdGVyaWFscy5maWx0ZXIoKG1hdGVyaWFsKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IG1hdGVyaWFsSW5kZXggPSB0aGlzLnBhcnNlci5hc3NvY2lhdGlvbnMuZ2V0KG1hdGVyaWFsKT8ubWF0ZXJpYWxzO1xuICAgICAgICAgICAgICByZXR1cm4gYmluZC5tYXRlcmlhbCA9PT0gbWF0ZXJpYWxJbmRleDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBtYXRlcmlhbHMuZm9yRWFjaCgobWF0ZXJpYWwpID0+IHtcbiAgICAgICAgICAgICAgZXhwcmVzc2lvbi5hZGRCaW5kKFxuICAgICAgICAgICAgICAgIG5ldyBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvckJpbmQoe1xuICAgICAgICAgICAgICAgICAgbWF0ZXJpYWwsXG4gICAgICAgICAgICAgICAgICB0eXBlOiBiaW5kLnR5cGUsXG4gICAgICAgICAgICAgICAgICB0YXJnZXRWYWx1ZTogbmV3IFRIUkVFLkNvbG9yKCkuZnJvbUFycmF5KGJpbmQudGFyZ2V0VmFsdWUpLFxuICAgICAgICAgICAgICAgICAgdGFyZ2V0QWxwaGE6IGJpbmQudGFyZ2V0VmFsdWVbM10sXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHNjaGVtYUV4cHJlc3Npb24udGV4dHVyZVRyYW5zZm9ybUJpbmRzPy5mb3JFYWNoKGFzeW5jIChiaW5kKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtYXRlcmlhbHMgPSBnbHRmTWF0ZXJpYWxzLmZpbHRlcigobWF0ZXJpYWwpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWxJbmRleCA9IHRoaXMucGFyc2VyLmFzc29jaWF0aW9ucy5nZXQobWF0ZXJpYWwpPy5tYXRlcmlhbHM7XG4gICAgICAgICAgICAgIHJldHVybiBiaW5kLm1hdGVyaWFsID09PSBtYXRlcmlhbEluZGV4O1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG1hdGVyaWFscy5mb3JFYWNoKChtYXRlcmlhbCkgPT4ge1xuICAgICAgICAgICAgICBleHByZXNzaW9uLmFkZEJpbmQoXG4gICAgICAgICAgICAgICAgbmV3IFZSTUV4cHJlc3Npb25UZXh0dXJlVHJhbnNmb3JtQmluZCh7XG4gICAgICAgICAgICAgICAgICBtYXRlcmlhbCxcbiAgICAgICAgICAgICAgICAgIG9mZnNldDogbmV3IFRIUkVFLlZlY3RvcjIoKS5mcm9tQXJyYXkoYmluZC5vZmZzZXQgPz8gWzAuMCwgMC4wXSksXG4gICAgICAgICAgICAgICAgICBzY2FsZTogbmV3IFRIUkVFLlZlY3RvcjIoKS5mcm9tQXJyYXkoYmluZC5zY2FsZSA/PyBbMS4wLCAxLjBdKSxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgbWFuYWdlci5yZWdpc3RlckV4cHJlc3Npb24oZXhwcmVzc2lvbik7XG4gICAgICB9KSxcbiAgICApO1xuXG4gICAgcmV0dXJuIG1hbmFnZXI7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF92MEltcG9ydChnbHRmOiBHTFRGKTogUHJvbWlzZTxWUk1FeHByZXNzaW9uTWFuYWdlciB8IG51bGw+IHtcbiAgICBjb25zdCBqc29uID0gdGhpcy5wYXJzZXIuanNvbiBhcyBHTFRGU2NoZW1hLklHTFRGO1xuXG4gICAgLy8gZWFybHkgYWJvcnQgaWYgaXQgZG9lc24ndCB1c2UgdnJtXG4gICAgY29uc3QgdnJtRXh0ID0ganNvbi5leHRlbnNpb25zPy5WUk0gYXMgVjBWUk0uVlJNIHwgdW5kZWZpbmVkO1xuICAgIGlmICghdnJtRXh0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzY2hlbWFCbGVuZFNoYXBlID0gdnJtRXh0LmJsZW5kU2hhcGVNYXN0ZXI7XG4gICAgaWYgKCFzY2hlbWFCbGVuZFNoYXBlKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBtYW5hZ2VyID0gbmV3IFZSTUV4cHJlc3Npb25NYW5hZ2VyKCk7XG5cbiAgICBjb25zdCBzY2hlbWFCbGVuZFNoYXBlR3JvdXBzID0gc2NoZW1hQmxlbmRTaGFwZS5ibGVuZFNoYXBlR3JvdXBzO1xuICAgIGlmICghc2NoZW1hQmxlbmRTaGFwZUdyb3Vwcykge1xuICAgICAgcmV0dXJuIG1hbmFnZXI7XG4gICAgfVxuXG4gICAgY29uc3QgYmxlbmRTaGFwZU5hbWVTZXQgPSBuZXcgU2V0PHN0cmluZz4oKTtcblxuICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgc2NoZW1hQmxlbmRTaGFwZUdyb3Vwcy5tYXAoYXN5bmMgKHNjaGVtYUdyb3VwKSA9PiB7XG4gICAgICAgIGNvbnN0IHYwUHJlc2V0TmFtZSA9IHNjaGVtYUdyb3VwLnByZXNldE5hbWU7XG4gICAgICAgIGNvbnN0IHYxUHJlc2V0TmFtZSA9XG4gICAgICAgICAgKHYwUHJlc2V0TmFtZSAhPSBudWxsICYmIFZSTUV4cHJlc3Npb25Mb2FkZXJQbHVnaW4udjB2MVByZXNldE5hbWVNYXBbdjBQcmVzZXROYW1lXSkgfHwgbnVsbDtcbiAgICAgICAgY29uc3QgbmFtZSA9IHYxUHJlc2V0TmFtZSA/PyBzY2hlbWFHcm91cC5uYW1lO1xuXG4gICAgICAgIGlmIChuYW1lID09IG51bGwpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ1ZSTUV4cHJlc3Npb25Mb2FkZXJQbHVnaW46IE9uZSBvZiBjdXN0b20gZXhwcmVzc2lvbnMgaGFzIG5vIG5hbWUuIElnbm9yaW5nIHRoZSBleHByZXNzaW9uJyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZHVwbGljYXRpb24gY2hlY2tcbiAgICAgICAgaWYgKGJsZW5kU2hhcGVOYW1lU2V0LmhhcyhuYW1lKSkge1xuICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgIGBWUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luOiBBbiBleHByZXNzaW9uIHByZXNldCAke3YwUHJlc2V0TmFtZX0gaGFzIGR1cGxpY2F0ZWQgZW50cmllcy4gSWdub3JpbmcgdGhlIGV4cHJlc3Npb25gLFxuICAgICAgICAgICk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgYmxlbmRTaGFwZU5hbWVTZXQuYWRkKG5hbWUpO1xuXG4gICAgICAgIGNvbnN0IGV4cHJlc3Npb24gPSBuZXcgVlJNRXhwcmVzc2lvbihuYW1lKTtcbiAgICAgICAgZ2x0Zi5zY2VuZS5hZGQoZXhwcmVzc2lvbik7XG5cbiAgICAgICAgZXhwcmVzc2lvbi5pc0JpbmFyeSA9IHNjaGVtYUdyb3VwLmlzQmluYXJ5ID8/IGZhbHNlO1xuICAgICAgICAvLyB2MCBkb2Vzbid0IGhhdmUgaWdub3JlIHByb3BlcnRpZXNcblxuICAgICAgICAvLyBCaW5kIG1vcnBoVGFyZ2V0XG4gICAgICAgIGlmIChzY2hlbWFHcm91cC5iaW5kcykge1xuICAgICAgICAgIHNjaGVtYUdyb3VwLmJpbmRzLmZvckVhY2goYXN5bmMgKGJpbmQpID0+IHtcbiAgICAgICAgICAgIGlmIChiaW5kLm1lc2ggPT09IHVuZGVmaW5lZCB8fCBiaW5kLmluZGV4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBub2Rlc1VzaW5nTWVzaDogbnVtYmVyW10gPSBbXTtcbiAgICAgICAgICAgIGpzb24ubm9kZXM/LmZvckVhY2goKG5vZGUsIGkpID0+IHtcbiAgICAgICAgICAgICAgaWYgKG5vZGUubWVzaCA9PT0gYmluZC5tZXNoKSB7XG4gICAgICAgICAgICAgICAgbm9kZXNVc2luZ01lc2gucHVzaChpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChub2Rlc1VzaW5nTWVzaC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgICAgIGBWUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luOiAke3NjaGVtYUdyb3VwLm5hbWV9IGF0dGVtcHRzIHRvIGJpbmQgYSBtb3JwaCB0YXJnZXQgdG8gdGhlIG1lc2ggIyR7YmluZC5tZXNofSBidXQgdGhlIG1lc2ggaXMgbm90IGZvdW5kIG9yIG5vdCB1c2VkIGluIHRoZSBzY2VuZS4gSWdub3JpbmcgdGhlIGJpbmQuYCxcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBtb3JwaFRhcmdldEluZGV4ID0gYmluZC5pbmRleDtcblxuICAgICAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgICAgICAgIG5vZGVzVXNpbmdNZXNoLm1hcChhc3luYyAobm9kZUluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJpbWl0aXZlcyA9IChhd2FpdCBnbHRmRXh0cmFjdFByaW1pdGl2ZXNGcm9tTm9kZShnbHRmLCBub2RlSW5kZXgpKSE7XG5cbiAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgbWVzaCBoYXMgdGhlIHRhcmdldCBtb3JwaCB0YXJnZXRcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAhcHJpbWl0aXZlcy5ldmVyeShcbiAgICAgICAgICAgICAgICAgICAgKHByaW1pdGl2ZSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICBBcnJheS5pc0FycmF5KHByaW1pdGl2ZS5tb3JwaFRhcmdldEluZmx1ZW5jZXMpICYmXG4gICAgICAgICAgICAgICAgICAgICAgbW9ycGhUYXJnZXRJbmRleCA8IHByaW1pdGl2ZS5tb3JwaFRhcmdldEluZmx1ZW5jZXMubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgICAgICAgICBgVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbjogJHtzY2hlbWFHcm91cC5uYW1lfSBhdHRlbXB0cyB0byBpbmRleCAke21vcnBoVGFyZ2V0SW5kZXh9dGggbW9ycGggYnV0IG5vdCBmb3VuZC5gLFxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBleHByZXNzaW9uLmFkZEJpbmQoXG4gICAgICAgICAgICAgICAgICBuZXcgVlJNRXhwcmVzc2lvbk1vcnBoVGFyZ2V0QmluZCh7XG4gICAgICAgICAgICAgICAgICAgIHByaW1pdGl2ZXMsXG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiBtb3JwaFRhcmdldEluZGV4LFxuICAgICAgICAgICAgICAgICAgICB3ZWlnaHQ6IDAuMDEgKiAoYmluZC53ZWlnaHQgPz8gMTAwKSwgLy8gbmFycm93aW5nIHRoZSByYW5nZSBmcm9tIFsgMC4wIC0gMTAwLjAgXSB0byBbIDAuMCAtIDEuMCBdXG4gICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCaW5kIE1hdGVyaWFsQ29sb3IgYW5kIFRleHR1cmVUcmFuc2Zvcm1cbiAgICAgICAgY29uc3QgbWF0ZXJpYWxWYWx1ZXMgPSBzY2hlbWFHcm91cC5tYXRlcmlhbFZhbHVlcztcbiAgICAgICAgaWYgKG1hdGVyaWFsVmFsdWVzICYmIG1hdGVyaWFsVmFsdWVzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgIG1hdGVyaWFsVmFsdWVzLmZvckVhY2goKG1hdGVyaWFsVmFsdWUpID0+IHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgbWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbE5hbWUgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICBtYXRlcmlhbFZhbHVlLnByb3BlcnR5TmFtZSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgIG1hdGVyaWFsVmFsdWUudGFyZ2V0VmFsdWUgPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBcdTMwQTJcdTMwRDBcdTMwQkZcdTMwRkNcdTMwNkVcdTMwQUFcdTMwRDZcdTMwQjhcdTMwQTdcdTMwQUZcdTMwQzhcdTMwNkJcdThBMkRcdTVCOUFcdTMwNTVcdTMwOENcdTMwNjZcdTMwNDRcdTMwOEJcdTMwREVcdTMwQzZcdTMwRUFcdTMwQTJcdTMwRUJcdTMwNkVcdTUxODVcdTMwNEJcdTMwODlcbiAgICAgICAgICAgICAqIG1hdGVyaWFsVmFsdWVcdTMwNjdcdTYzMDdcdTVCOUFcdTMwNTVcdTMwOENcdTMwNjZcdTMwNDRcdTMwOEJcdTMwREVcdTMwQzZcdTMwRUFcdTMwQTJcdTMwRUJcdTMwOTJcdTk2QzZcdTMwODFcdTMwOEJcdTMwMDJcbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBcdTcyNzlcdTVCOUFcdTMwNkJcdTMwNkZcdTU0MERcdTUyNERcdTMwOTJcdTRGN0ZcdTc1MjhcdTMwNTlcdTMwOEJcdTMwMDJcbiAgICAgICAgICAgICAqIFx1MzBBMlx1MzBBNlx1MzBDOFx1MzBFOVx1MzBBNFx1MzBGM1x1NjNDRlx1NzUzQlx1NzUyOFx1MzA2RVx1MzBERVx1MzBDNlx1MzBFQVx1MzBBMlx1MzBFQlx1MzA4Mlx1NTQwQ1x1NjY0Mlx1MzA2Qlx1OTZDNlx1MzA4MVx1MzA4Qlx1MzAwMlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBjb25zdCBtYXRlcmlhbHM6IFRIUkVFLk1hdGVyaWFsW10gPSBbXTtcbiAgICAgICAgICAgIGdsdGYuc2NlbmUudHJhdmVyc2UoKG9iamVjdCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoKG9iamVjdCBhcyBhbnkpLm1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWw6IFRIUkVFLk1hdGVyaWFsW10gfCBUSFJFRS5NYXRlcmlhbCA9IChvYmplY3QgYXMgYW55KS5tYXRlcmlhbDtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShtYXRlcmlhbCkpIHtcbiAgICAgICAgICAgICAgICAgIG1hdGVyaWFscy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAuLi5tYXRlcmlhbC5maWx0ZXIoXG4gICAgICAgICAgICAgICAgICAgICAgKG10bCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIChtdGwubmFtZSA9PT0gbWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbE5hbWUhIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG10bC5uYW1lID09PSBtYXRlcmlhbFZhbHVlLm1hdGVyaWFsTmFtZSEgKyAnIChPdXRsaW5lKScpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbHMuaW5kZXhPZihtdGwpID09PSAtMSxcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChtYXRlcmlhbC5uYW1lID09PSBtYXRlcmlhbFZhbHVlLm1hdGVyaWFsTmFtZSAmJiBtYXRlcmlhbHMuaW5kZXhPZihtYXRlcmlhbCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICBtYXRlcmlhbHMucHVzaChtYXRlcmlhbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWxQcm9wZXJ0eU5hbWUgPSBtYXRlcmlhbFZhbHVlLnByb3BlcnR5TmFtZTtcbiAgICAgICAgICAgIG1hdGVyaWFscy5mb3JFYWNoKChtYXRlcmlhbCkgPT4ge1xuICAgICAgICAgICAgICAvLyBUZXh0dXJlVHJhbnNmb3JtQmluZFxuICAgICAgICAgICAgICBpZiAobWF0ZXJpYWxQcm9wZXJ0eU5hbWUgPT09ICdfTWFpblRleF9TVCcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzY2FsZSA9IG5ldyBUSFJFRS5WZWN0b3IyKG1hdGVyaWFsVmFsdWUudGFyZ2V0VmFsdWUhWzBdLCBtYXRlcmlhbFZhbHVlLnRhcmdldFZhbHVlIVsxXSk7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gbmV3IFRIUkVFLlZlY3RvcjIobWF0ZXJpYWxWYWx1ZS50YXJnZXRWYWx1ZSFbMl0sIG1hdGVyaWFsVmFsdWUudGFyZ2V0VmFsdWUhWzNdKTtcblxuICAgICAgICAgICAgICAgIG9mZnNldC55ID0gMS4wIC0gb2Zmc2V0LnkgLSBzY2FsZS55O1xuXG4gICAgICAgICAgICAgICAgZXhwcmVzc2lvbi5hZGRCaW5kKFxuICAgICAgICAgICAgICAgICAgbmV3IFZSTUV4cHJlc3Npb25UZXh0dXJlVHJhbnNmb3JtQmluZCh7XG4gICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsLFxuICAgICAgICAgICAgICAgICAgICBzY2FsZSxcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0LFxuICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIC8vIE1hdGVyaWFsQ29sb3JCaW5kXG4gICAgICAgICAgICAgIGNvbnN0IG1hdGVyaWFsQ29sb3JUeXBlID0gdjBFeHByZXNzaW9uTWF0ZXJpYWxDb2xvck1hcFttYXRlcmlhbFByb3BlcnR5TmFtZV07XG4gICAgICAgICAgICAgIGlmIChtYXRlcmlhbENvbG9yVHlwZSkge1xuICAgICAgICAgICAgICAgIGV4cHJlc3Npb24uYWRkQmluZChcbiAgICAgICAgICAgICAgICAgIG5ldyBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvckJpbmQoe1xuICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbCxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogbWF0ZXJpYWxDb2xvclR5cGUsXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFZhbHVlOiBuZXcgVEhSRUUuQ29sb3IoKS5mcm9tQXJyYXkobWF0ZXJpYWxWYWx1ZS50YXJnZXRWYWx1ZSEpLFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRBbHBoYTogbWF0ZXJpYWxWYWx1ZS50YXJnZXRWYWx1ZSFbM10sXG4gICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgY29uc29sZS53YXJuKG1hdGVyaWFsUHJvcGVydHlOYW1lICsgJyBpcyBub3Qgc3VwcG9ydGVkJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIG1hbmFnZXIucmVnaXN0ZXJFeHByZXNzaW9uKGV4cHJlc3Npb24pO1xuICAgICAgfSksXG4gICAgKTtcblxuICAgIHJldHVybiBtYW5hZ2VyO1xuICB9XG59XG4iLCAiaW1wb3J0IHR5cGUgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgdHlwZSB7IEdMVEYgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyLmpzJztcbmltcG9ydCB7IEdMVEYgYXMgR0xURlNjaGVtYSB9IGZyb20gJ0BnbHRmLXRyYW5zZm9ybS9jb3JlJztcblxuZnVuY3Rpb24gZXh0cmFjdFByaW1pdGl2ZXNJbnRlcm5hbChnbHRmOiBHTFRGLCBub2RlSW5kZXg6IG51bWJlciwgbm9kZTogVEhSRUUuT2JqZWN0M0QpOiBUSFJFRS5NZXNoW10gfCBudWxsIHtcbiAgY29uc3QganNvbiA9IGdsdGYucGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAvKipcbiAgICogTGV0J3MgbGlzdCB1cCBldmVyeSBwb3NzaWJsZSBwYXR0ZXJucyB0aGF0IHBhcnNlZCBnbHRmIG5vZGVzIHdpdGggYSBtZXNoIGNhbiBoYXZlLCwsXG4gICAqXG4gICAqIFwiKlwiIGluZGljYXRlcyB0aGF0IHRob3NlIG1lc2hlcyBzaG91bGQgYmUgbGlzdGVkIHVwIHVzaW5nIHRoaXMgZnVuY3Rpb25cbiAgICpcbiAgICogIyMjIEEgbm9kZSB3aXRoIGEgKG1lc2gsIGEgc2lnbmxlIHByaW1pdGl2ZSlcbiAgICpcbiAgICogLSBgVEhSRUUuTWVzaGA6IFRoZSBvbmx5IHByaW1pdGl2ZSBvZiB0aGUgbWVzaCAqXG4gICAqXG4gICAqICMjIyBBIG5vZGUgd2l0aCBhIChtZXNoLCBtdWx0aXBsZSBwcmltaXRpdmVzKVxuICAgKlxuICAgKiAtIGBUSFJFRS5Hcm91cGA6IFRoZSByb290IG9mIHRoZSBtZXNoXG4gICAqICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoICpcbiAgICogICAtIGBUSFJFRS5NZXNoYDogQSBwcmltaXRpdmUgb2YgdGhlIG1lc2ggKDIpICpcbiAgICpcbiAgICogIyMjIEEgbm9kZSB3aXRoIGEgKG1lc2gsIG11bHRpcGxlIHByaW1pdGl2ZXMpIEFORCAoYSBjaGlsZCB3aXRoIGEgbWVzaCwgYSBzaW5nbGUgcHJpbWl0aXZlKVxuICAgKlxuICAgKiAtIGBUSFJFRS5Hcm91cGA6IFRoZSByb290IG9mIHRoZSBtZXNoXG4gICAqICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoICpcbiAgICogICAtIGBUSFJFRS5NZXNoYDogQSBwcmltaXRpdmUgb2YgdGhlIG1lc2ggKDIpICpcbiAgICogICAtIGBUSFJFRS5NZXNoYDogQSBwcmltaXRpdmUgb2YgYSBNRVNIIE9GIFRIRSBDSElMRFxuICAgKlxuICAgKiAjIyMgQSBub2RlIHdpdGggYSAobWVzaCwgbXVsdGlwbGUgcHJpbWl0aXZlcykgQU5EIChhIGNoaWxkIHdpdGggYSBtZXNoLCBtdWx0aXBsZSBwcmltaXRpdmVzKVxuICAgKlxuICAgKiAtIGBUSFJFRS5Hcm91cGA6IFRoZSByb290IG9mIHRoZSBtZXNoXG4gICAqICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoICpcbiAgICogICAtIGBUSFJFRS5NZXNoYDogQSBwcmltaXRpdmUgb2YgdGhlIG1lc2ggKDIpICpcbiAgICogICAtIGBUSFJFRS5Hcm91cGA6IFRoZSByb290IG9mIGEgTUVTSCBPRiBUSEUgQ0hJTERcbiAgICogICAgIC0gYFRIUkVFLk1lc2hgOiBBIHByaW1pdGl2ZSBvZiB0aGUgbWVzaCBvZiB0aGUgY2hpbGRcbiAgICogICAgIC0gYFRIUkVFLk1lc2hgOiBBIHByaW1pdGl2ZSBvZiB0aGUgbWVzaCBvZiB0aGUgY2hpbGQgKDIpXG4gICAqXG4gICAqICMjIyBBIG5vZGUgd2l0aCBhIChtZXNoLCBtdWx0aXBsZSBwcmltaXRpdmVzKSBCVVQgdGhlIG5vZGUgaXMgYSBib25lXG4gICAqXG4gICAqIC0gYFRIUkVFLkJvbmVgOiBUaGUgcm9vdCBvZiB0aGUgbm9kZSwgYXMgYSBib25lXG4gICAqICAgLSBgVEhSRUUuR3JvdXBgOiBUaGUgcm9vdCBvZiB0aGUgbWVzaFxuICAgKiAgICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoICpcbiAgICogICAgIC0gYFRIUkVFLk1lc2hgOiBBIHByaW1pdGl2ZSBvZiB0aGUgbWVzaCAoMikgKlxuICAgKlxuICAgKiAjIyMgQSBub2RlIHdpdGggYSAobWVzaCwgbXVsdGlwbGUgcHJpbWl0aXZlcykgQU5EIChhIGNoaWxkIHdpdGggYSBtZXNoLCBtdWx0aXBsZSBwcmltaXRpdmVzKSBCVVQgdGhlIG5vZGUgaXMgYSBib25lXG4gICAqXG4gICAqIC0gYFRIUkVFLkJvbmVgOiBUaGUgcm9vdCBvZiB0aGUgbm9kZSwgYXMgYSBib25lXG4gICAqICAgLSBgVEhSRUUuR3JvdXBgOiBUaGUgcm9vdCBvZiB0aGUgbWVzaFxuICAgKiAgICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoICpcbiAgICogICAgIC0gYFRIUkVFLk1lc2hgOiBBIHByaW1pdGl2ZSBvZiB0aGUgbWVzaCAoMikgKlxuICAgKiAgIC0gYFRIUkVFLkdyb3VwYDogVGhlIHJvb3Qgb2YgYSBNRVNIIE9GIFRIRSBDSElMRFxuICAgKiAgICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoIG9mIHRoZSBjaGlsZFxuICAgKiAgICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoIG9mIHRoZSBjaGlsZCAoMilcbiAgICpcbiAgICogLi4uSSB3aWxsIHRha2UgYSBzdHJhdGVneSB0aGF0IHRyYXZlcnNlcyB0aGUgcm9vdCBvZiB0aGUgbm9kZSBhbmQgdGFrZSBmaXJzdCAocHJpbWl0aXZlQ291bnQpIG1lc2hlcy5cbiAgICovXG5cbiAgLy8gTWFrZSBzdXJlIHRoYXQgdGhlIG5vZGUgaGFzIGEgbWVzaFxuICBjb25zdCBzY2hlbWFOb2RlID0ganNvbi5ub2Rlcz8uW25vZGVJbmRleF07XG4gIGlmIChzY2hlbWFOb2RlID09IG51bGwpIHtcbiAgICBjb25zb2xlLndhcm4oYGV4dHJhY3RQcmltaXRpdmVzSW50ZXJuYWw6IEF0dGVtcHQgdG8gdXNlIG5vZGVzWyR7bm9kZUluZGV4fV0gb2YgZ2xURiBidXQgdGhlIG5vZGUgZG9lc24ndCBleGlzdGApO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3QgbWVzaEluZGV4ID0gc2NoZW1hTm9kZS5tZXNoO1xuICBpZiAobWVzaEluZGV4ID09IG51bGwpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIEhvdyBtYW55IHByaW1pdGl2ZXMgdGhlIG1lc2ggaGFzP1xuICBjb25zdCBzY2hlbWFNZXNoID0ganNvbi5tZXNoZXM/LlttZXNoSW5kZXhdO1xuICBpZiAoc2NoZW1hTWVzaCA9PSBudWxsKSB7XG4gICAgY29uc29sZS53YXJuKGBleHRyYWN0UHJpbWl0aXZlc0ludGVybmFsOiBBdHRlbXB0IHRvIHVzZSBtZXNoZXNbJHttZXNoSW5kZXh9XSBvZiBnbFRGIGJ1dCB0aGUgbWVzaCBkb2Vzbid0IGV4aXN0YCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCBwcmltaXRpdmVDb3VudCA9IHNjaGVtYU1lc2gucHJpbWl0aXZlcy5sZW5ndGg7XG5cbiAgLy8gVHJhdmVyc2UgdGhlIG5vZGUgYW5kIHRha2UgZmlyc3QgKHByaW1pdGl2ZUNvdW50KSBtZXNoZXNcbiAgY29uc3QgcHJpbWl0aXZlczogVEhSRUUuTWVzaFtdID0gW107XG4gIG5vZGUudHJhdmVyc2UoKG9iamVjdCkgPT4ge1xuICAgIGlmIChwcmltaXRpdmVzLmxlbmd0aCA8IHByaW1pdGl2ZUNvdW50KSB7XG4gICAgICBpZiAoKG9iamVjdCBhcyBhbnkpLmlzTWVzaCkge1xuICAgICAgICBwcmltaXRpdmVzLnB1c2gob2JqZWN0IGFzIFRIUkVFLk1lc2gpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHByaW1pdGl2ZXM7XG59XG5cbi8qKlxuICogRXh0cmFjdCBwcmltaXRpdmVzICggYFRIUkVFLk1lc2hbXWAgKSBvZiBhIG5vZGUgZnJvbSBhIGxvYWRlZCBHTFRGLlxuICogVGhlIG1haW4gcHVycG9zZSBvZiB0aGlzIGZ1bmN0aW9uIGlzIHRvIGRpc3Rpbmd1aXNoIHByaW1pdGl2ZXMgYW5kIGNoaWxkcmVuIGZyb20gYSBub2RlIHRoYXQgaGFzIGJvdGggbWVzaGVzIGFuZCBjaGlsZHJlbi5cbiAqXG4gKiBJdCB1dGlsaXplcyB0aGUgYmVoYXZpb3IgdGhhdCBHTFRGTG9hZGVyIGFkZHMgbWVzaCBwcmltaXRpdmVzIHRvIHRoZSBub2RlIG9iamVjdCAoIGBUSFJFRS5Hcm91cGAgKSBmaXJzdCB0aGVuIGFkZHMgaXRzIGNoaWxkcmVuLlxuICpcbiAqIEBwYXJhbSBnbHRmIEEgR0xURiBvYmplY3QgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gKiBAcGFyYW0gbm9kZUluZGV4IFRoZSBpbmRleCBvZiB0aGUgbm9kZVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGUoZ2x0ZjogR0xURiwgbm9kZUluZGV4OiBudW1iZXIpOiBQcm9taXNlPFRIUkVFLk1lc2hbXSB8IG51bGw+IHtcbiAgY29uc3Qgbm9kZTogVEhSRUUuT2JqZWN0M0QgPSBhd2FpdCBnbHRmLnBhcnNlci5nZXREZXBlbmRlbmN5KCdub2RlJywgbm9kZUluZGV4KTtcbiAgcmV0dXJuIGV4dHJhY3RQcmltaXRpdmVzSW50ZXJuYWwoZ2x0Ziwgbm9kZUluZGV4LCBub2RlKTtcbn1cblxuLyoqXG4gKiBFeHRyYWN0IHByaW1pdGl2ZXMgKCBgVEhSRUUuTWVzaFtdYCApIG9mIG5vZGVzIGZyb20gYSBsb2FkZWQgR0xURi5cbiAqIFNlZSB7QGxpbmsgZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGV9IGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogSXQgcmV0dXJucyBhIG1hcCBmcm9tIG5vZGUgaW5kZXggdG8gZXh0cmFjdGlvbiByZXN1bHQuXG4gKiBJZiBhIG5vZGUgZG9lcyBub3QgaGF2ZSBhIG1lc2gsIHRoZSBlbnRyeSBmb3IgdGhlIG5vZGUgd2lsbCBub3QgYmUgcHV0IGluIHRoZSByZXR1cm5pbmcgbWFwLlxuICpcbiAqIEBwYXJhbSBnbHRmIEEgR0xURiBvYmplY3QgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnbHRmRXh0cmFjdFByaW1pdGl2ZXNGcm9tTm9kZXMoZ2x0ZjogR0xURik6IFByb21pc2U8TWFwPG51bWJlciwgVEhSRUUuTWVzaFtdPj4ge1xuICBjb25zdCBub2RlczogVEhSRUUuT2JqZWN0M0RbXSA9IGF3YWl0IGdsdGYucGFyc2VyLmdldERlcGVuZGVuY2llcygnbm9kZScpO1xuICBjb25zdCBtYXAgPSBuZXcgTWFwPG51bWJlciwgVEhSRUUuTWVzaFtdPigpO1xuXG4gIG5vZGVzLmZvckVhY2goKG5vZGUsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gZXh0cmFjdFByaW1pdGl2ZXNJbnRlcm5hbChnbHRmLCBpbmRleCwgbm9kZSk7XG4gICAgaWYgKHJlc3VsdCAhPSBudWxsKSB7XG4gICAgICBtYXAuc2V0KGluZGV4LCByZXN1bHQpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIG1hcDtcbn1cbiIsICIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cblxuZXhwb3J0IGNvbnN0IFZSTUV4cHJlc3Npb25QcmVzZXROYW1lID0ge1xuICBBYTogJ2FhJyxcbiAgSWg6ICdpaCcsXG4gIE91OiAnb3UnLFxuICBFZTogJ2VlJyxcbiAgT2g6ICdvaCcsXG4gIEJsaW5rOiAnYmxpbmsnLFxuICBIYXBweTogJ2hhcHB5JyxcbiAgQW5ncnk6ICdhbmdyeScsXG4gIFNhZDogJ3NhZCcsXG4gIFJlbGF4ZWQ6ICdyZWxheGVkJyxcbiAgTG9va1VwOiAnbG9va1VwJyxcbiAgU3VycHJpc2VkOiAnc3VycHJpc2VkJyxcbiAgTG9va0Rvd246ICdsb29rRG93bicsXG4gIExvb2tMZWZ0OiAnbG9va0xlZnQnLFxuICBMb29rUmlnaHQ6ICdsb29rUmlnaHQnLFxuICBCbGlua0xlZnQ6ICdibGlua0xlZnQnLFxuICBCbGlua1JpZ2h0OiAnYmxpbmtSaWdodCcsXG4gIE5ldXRyYWw6ICduZXV0cmFsJyxcbn0gYXMgY29uc3Q7XG5cbmV4cG9ydCB0eXBlIFZSTUV4cHJlc3Npb25QcmVzZXROYW1lID0gKHR5cGVvZiBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSlba2V5b2YgdHlwZW9mIFZSTUV4cHJlc3Npb25QcmVzZXROYW1lXTtcbiIsICIvKipcbiAqIENsYW1wIHRoZSBpbnB1dCB2YWx1ZSB3aXRoaW4gWzAuMCAtIDEuMF0uXG4gKlxuICogQHBhcmFtIHZhbHVlIFRoZSBpbnB1dCB2YWx1ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2F0dXJhdGUodmFsdWU6IG51bWJlcik6IG51bWJlciB7XG4gIHJldHVybiBNYXRoLm1heChNYXRoLm1pbih2YWx1ZSwgMS4wKSwgMC4wKTtcbn1cbiIsICJpbXBvcnQgeyBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSB9IGZyb20gJy4vVlJNRXhwcmVzc2lvblByZXNldE5hbWUnO1xuaW1wb3J0IHsgc2F0dXJhdGUgfSBmcm9tICcuLi91dGlscy9zYXR1cmF0ZSc7XG5pbXBvcnQgdHlwZSB7IFZSTUV4cHJlc3Npb24gfSBmcm9tICcuL1ZSTUV4cHJlc3Npb24nO1xuXG5leHBvcnQgY2xhc3MgVlJNRXhwcmVzc2lvbk1hbmFnZXIge1xuICAvKipcbiAgICogQSBzZXQgb2YgbmFtZSBvciBwcmVzZXQgbmFtZSBvZiBleHByZXNzaW9ucyB0aGF0IHdpbGwgYmUgb3ZlcnJpZGRlbiBieSB7QGxpbmsgVlJNRXhwcmVzc2lvbi5vdmVycmlkZUJsaW5rfS5cbiAgICovXG4gIHB1YmxpYyBibGlua0V4cHJlc3Npb25OYW1lcyA9IFsnYmxpbmsnLCAnYmxpbmtMZWZ0JywgJ2JsaW5rUmlnaHQnXTtcblxuICAvKipcbiAgICogQSBzZXQgb2YgbmFtZSBvciBwcmVzZXQgbmFtZSBvZiBleHByZXNzaW9ucyB0aGF0IHdpbGwgYmUgb3ZlcnJpZGRlbiBieSB7QGxpbmsgVlJNRXhwcmVzc2lvbi5vdmVycmlkZUxvb2tBdH0uXG4gICAqL1xuICBwdWJsaWMgbG9va0F0RXhwcmVzc2lvbk5hbWVzID0gWydsb29rTGVmdCcsICdsb29rUmlnaHQnLCAnbG9va1VwJywgJ2xvb2tEb3duJ107XG5cbiAgLyoqXG4gICAqIEEgc2V0IG9mIG5hbWUgb3IgcHJlc2V0IG5hbWUgb2YgZXhwcmVzc2lvbnMgdGhhdCB3aWxsIGJlIG92ZXJyaWRkZW4gYnkge0BsaW5rIFZSTUV4cHJlc3Npb24ub3ZlcnJpZGVNb3V0aH0uXG4gICAqL1xuICBwdWJsaWMgbW91dGhFeHByZXNzaW9uTmFtZXMgPSBbJ2FhJywgJ2VlJywgJ2loJywgJ29oJywgJ291J107XG5cbiAgLyoqXG4gICAqIEEgc2V0IG9mIHtAbGluayBWUk1FeHByZXNzaW9ufS5cbiAgICogV2hlbiB5b3Ugd2FudCB0byByZWdpc3RlciBleHByZXNzaW9ucywgdXNlIHtAbGluayByZWdpc3RlckV4cHJlc3Npb259XG4gICAqL1xuICBwcml2YXRlIF9leHByZXNzaW9uczogVlJNRXhwcmVzc2lvbltdID0gW107XG4gIHB1YmxpYyBnZXQgZXhwcmVzc2lvbnMoKTogVlJNRXhwcmVzc2lvbltdIHtcbiAgICByZXR1cm4gdGhpcy5fZXhwcmVzc2lvbnMuY29uY2F0KCk7XG4gIH1cblxuICAvKipcbiAgICogQSBtYXAgZnJvbSBuYW1lIHRvIGV4cHJlc3Npb24uXG4gICAqL1xuICBwcml2YXRlIF9leHByZXNzaW9uTWFwOiB7IFtuYW1lOiBzdHJpbmddOiBWUk1FeHByZXNzaW9uIH0gPSB7fTtcbiAgcHVibGljIGdldCBleHByZXNzaW9uTWFwKCk6IHsgW25hbWU6IHN0cmluZ106IFZSTUV4cHJlc3Npb24gfSB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHRoaXMuX2V4cHJlc3Npb25NYXApO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgbWFwIGZyb20gbmFtZSB0byBleHByZXNzaW9uLCBidXQgZXhjbHVkaW5nIGN1c3RvbSBleHByZXNzaW9ucy5cbiAgICovXG4gIHB1YmxpYyBnZXQgcHJlc2V0RXhwcmVzc2lvbk1hcCgpOiB7IFtuYW1lIGluIFZSTUV4cHJlc3Npb25QcmVzZXROYW1lXT86IFZSTUV4cHJlc3Npb24gfSB7XG4gICAgY29uc3QgcmVzdWx0OiB7IFtuYW1lIGluIFZSTUV4cHJlc3Npb25QcmVzZXROYW1lXT86IFZSTUV4cHJlc3Npb24gfSA9IHt9O1xuXG4gICAgY29uc3QgcHJlc2V0TmFtZVNldCA9IG5ldyBTZXQ8c3RyaW5nPihPYmplY3QudmFsdWVzKFZSTUV4cHJlc3Npb25QcmVzZXROYW1lKSk7XG5cbiAgICBPYmplY3QuZW50cmllcyh0aGlzLl9leHByZXNzaW9uTWFwKS5mb3JFYWNoKChbbmFtZSwgZXhwcmVzc2lvbl0pID0+IHtcbiAgICAgIGlmIChwcmVzZXROYW1lU2V0LmhhcyhuYW1lKSkge1xuICAgICAgICByZXN1bHRbbmFtZSBhcyBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZV0gPSBleHByZXNzaW9uO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIG1hcCBmcm9tIG5hbWUgdG8gZXhwcmVzc2lvbiwgYnV0IGV4Y2x1ZGluZyBwcmVzZXQgZXhwcmVzc2lvbnMuXG4gICAqL1xuICBwdWJsaWMgZ2V0IGN1c3RvbUV4cHJlc3Npb25NYXAoKTogeyBbbmFtZTogc3RyaW5nXTogVlJNRXhwcmVzc2lvbiB9IHtcbiAgICBjb25zdCByZXN1bHQ6IHsgW25hbWU6IHN0cmluZ106IFZSTUV4cHJlc3Npb24gfSA9IHt9O1xuXG4gICAgY29uc3QgcHJlc2V0TmFtZVNldCA9IG5ldyBTZXQ8c3RyaW5nPihPYmplY3QudmFsdWVzKFZSTUV4cHJlc3Npb25QcmVzZXROYW1lKSk7XG5cbiAgICBPYmplY3QuZW50cmllcyh0aGlzLl9leHByZXNzaW9uTWFwKS5mb3JFYWNoKChbbmFtZSwgZXhwcmVzc2lvbl0pID0+IHtcbiAgICAgIGlmICghcHJlc2V0TmFtZVNldC5oYXMobmFtZSkpIHtcbiAgICAgICAgcmVzdWx0W25hbWVdID0gZXhwcmVzc2lvbjtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IHtAbGluayBWUk1FeHByZXNzaW9uTWFuYWdlcn0uXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gZG8gbm90aGluZ1xuICB9XG5cbiAgLyoqXG4gICAqIENvcHkgdGhlIGdpdmVuIHtAbGluayBWUk1FeHByZXNzaW9uTWFuYWdlcn0gaW50byB0aGlzIG9uZS5cbiAgICogQHBhcmFtIHNvdXJjZSBUaGUge0BsaW5rIFZSTUV4cHJlc3Npb25NYW5hZ2VyfSB5b3Ugd2FudCB0byBjb3B5XG4gICAqIEByZXR1cm5zIHRoaXNcbiAgICovXG4gIHB1YmxpYyBjb3B5KHNvdXJjZTogVlJNRXhwcmVzc2lvbk1hbmFnZXIpOiB0aGlzIHtcbiAgICAvLyBmaXJzdCB1bnJlZ2lzdGVyIGFsbCB0aGUgZXhwcmVzc2lvbiBpdCBoYXNcbiAgICBjb25zdCBleHByZXNzaW9ucyA9IHRoaXMuX2V4cHJlc3Npb25zLmNvbmNhdCgpO1xuICAgIGV4cHJlc3Npb25zLmZvckVhY2goKGV4cHJlc3Npb24pID0+IHtcbiAgICAgIHRoaXMudW5yZWdpc3RlckV4cHJlc3Npb24oZXhwcmVzc2lvbik7XG4gICAgfSk7XG5cbiAgICAvLyB0aGVuIHJlZ2lzdGVyIGFsbCB0aGUgZXhwcmVzc2lvbiBvZiB0aGUgc291cmNlXG4gICAgc291cmNlLl9leHByZXNzaW9ucy5mb3JFYWNoKChleHByZXNzaW9uKSA9PiB7XG4gICAgICB0aGlzLnJlZ2lzdGVyRXhwcmVzc2lvbihleHByZXNzaW9uKTtcbiAgICB9KTtcblxuICAgIC8vIGNvcHkgcmVtYWluaW5nIG1lbWJlcnNcbiAgICB0aGlzLmJsaW5rRXhwcmVzc2lvbk5hbWVzID0gc291cmNlLmJsaW5rRXhwcmVzc2lvbk5hbWVzLmNvbmNhdCgpO1xuICAgIHRoaXMubG9va0F0RXhwcmVzc2lvbk5hbWVzID0gc291cmNlLmxvb2tBdEV4cHJlc3Npb25OYW1lcy5jb25jYXQoKTtcbiAgICB0aGlzLm1vdXRoRXhwcmVzc2lvbk5hbWVzID0gc291cmNlLm1vdXRoRXhwcmVzc2lvbk5hbWVzLmNvbmNhdCgpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGNsb25lIG9mIHRoaXMge0BsaW5rIFZSTUV4cHJlc3Npb25NYW5hZ2VyfS5cbiAgICogQHJldHVybnMgQ29waWVkIHtAbGluayBWUk1FeHByZXNzaW9uTWFuYWdlcn1cbiAgICovXG4gIHB1YmxpYyBjbG9uZSgpOiBWUk1FeHByZXNzaW9uTWFuYWdlciB7XG4gICAgcmV0dXJuIG5ldyBWUk1FeHByZXNzaW9uTWFuYWdlcigpLmNvcHkodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGEgcmVnaXN0ZXJlZCBleHByZXNzaW9uLlxuICAgKiBJZiBpdCBjYW5ub3QgZmluZCBhbiBleHByZXNzaW9uLCBpdCB3aWxsIHJldHVybiBgbnVsbGAgaW5zdGVhZC5cbiAgICpcbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvciBwcmVzZXQgbmFtZSBvZiB0aGUgZXhwcmVzc2lvblxuICAgKi9cbiAgcHVibGljIGdldEV4cHJlc3Npb24obmFtZTogVlJNRXhwcmVzc2lvblByZXNldE5hbWUgfCBzdHJpbmcpOiBWUk1FeHByZXNzaW9uIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX2V4cHJlc3Npb25NYXBbbmFtZV0gPz8gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBhbiBleHByZXNzaW9uLlxuICAgKlxuICAgKiBAcGFyYW0gZXhwcmVzc2lvbiB7QGxpbmsgVlJNRXhwcmVzc2lvbn0gdGhhdCBkZXNjcmliZXMgdGhlIGV4cHJlc3Npb25cbiAgICovXG4gIHB1YmxpYyByZWdpc3RlckV4cHJlc3Npb24oZXhwcmVzc2lvbjogVlJNRXhwcmVzc2lvbik6IHZvaWQge1xuICAgIHRoaXMuX2V4cHJlc3Npb25zLnB1c2goZXhwcmVzc2lvbik7XG4gICAgdGhpcy5fZXhwcmVzc2lvbk1hcFtleHByZXNzaW9uLmV4cHJlc3Npb25OYW1lXSA9IGV4cHJlc3Npb247XG4gIH1cblxuICAvKipcbiAgICogVW5yZWdpc3RlciBhbiBleHByZXNzaW9uLlxuICAgKlxuICAgKiBAcGFyYW0gZXhwcmVzc2lvbiBUaGUgZXhwcmVzc2lvbiB5b3Ugd2FudCB0byB1bnJlZ2lzdGVyXG4gICAqL1xuICBwdWJsaWMgdW5yZWdpc3RlckV4cHJlc3Npb24oZXhwcmVzc2lvbjogVlJNRXhwcmVzc2lvbik6IHZvaWQge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fZXhwcmVzc2lvbnMuaW5kZXhPZihleHByZXNzaW9uKTtcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1ZSTUV4cHJlc3Npb25NYW5hZ2VyOiBUaGUgc3BlY2lmaWVkIGV4cHJlc3Npb25zIGlzIG5vdCByZWdpc3RlcmVkJyk7XG4gICAgfVxuXG4gICAgdGhpcy5fZXhwcmVzc2lvbnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICBkZWxldGUgdGhpcy5fZXhwcmVzc2lvbk1hcFtleHByZXNzaW9uLmV4cHJlc3Npb25OYW1lXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGN1cnJlbnQgd2VpZ2h0IG9mIHRoZSBzcGVjaWZpZWQgZXhwcmVzc2lvbi5cbiAgICogSWYgaXQgZG9lc24ndCBoYXZlIGFuIGV4cHJlc3Npb24gb2YgZ2l2ZW4gbmFtZSwgaXQgd2lsbCByZXR1cm4gYG51bGxgIGluc3RlYWQuXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGV4cHJlc3Npb25cbiAgICovXG4gIHB1YmxpYyBnZXRWYWx1ZShuYW1lOiBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSB8IHN0cmluZyk6IG51bWJlciB8IG51bGwge1xuICAgIGNvbnN0IGV4cHJlc3Npb24gPSB0aGlzLmdldEV4cHJlc3Npb24obmFtZSk7XG4gICAgcmV0dXJuIGV4cHJlc3Npb24/LndlaWdodCA/PyBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBhIHdlaWdodCB0byB0aGUgc3BlY2lmaWVkIGV4cHJlc3Npb24uXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGV4cHJlc3Npb25cbiAgICogQHBhcmFtIHdlaWdodCBXZWlnaHRcbiAgICovXG4gIHB1YmxpYyBzZXRWYWx1ZShuYW1lOiBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSB8IHN0cmluZywgd2VpZ2h0OiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBleHByZXNzaW9uID0gdGhpcy5nZXRFeHByZXNzaW9uKG5hbWUpO1xuICAgIGlmIChleHByZXNzaW9uKSB7XG4gICAgICBleHByZXNzaW9uLndlaWdodCA9IHNhdHVyYXRlKHdlaWdodCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHdlaWdodHMgb2YgYWxsIGV4cHJlc3Npb25zIHRvIGAwLjBgLlxuICAgKi9cbiAgcHVibGljIHJlc2V0VmFsdWVzKCk6IHZvaWQge1xuICAgIHRoaXMuX2V4cHJlc3Npb25zLmZvckVhY2goKGV4cHJlc3Npb24pID0+IHtcbiAgICAgIGV4cHJlc3Npb24ud2VpZ2h0ID0gMC4wO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIHRyYWNrIG5hbWUgb2Ygc3BlY2lmaWVkIGV4cHJlc3Npb24uXG4gICAqIFRoaXMgdHJhY2sgbmFtZSBpcyBuZWVkZWQgdG8gbWFuaXB1bGF0ZSBpdHMgZXhwcmVzc2lvbiB2aWEga2V5ZnJhbWUgYW5pbWF0aW9ucy5cbiAgICpcbiAgICogQGV4YW1wbGUgTWFuaXB1bGF0ZSBhbiBleHByZXNzaW9uIHVzaW5nIGtleWZyYW1lIGFuaW1hdGlvblxuICAgKiBgYGBqc1xuICAgKiBjb25zdCB0cmFja05hbWUgPSB2cm0uZXhwcmVzc2lvbk1hbmFnZXIuZ2V0RXhwcmVzc2lvblRyYWNrTmFtZSggJ2JsaW5rJyApO1xuICAgKiBjb25zdCB0cmFjayA9IG5ldyBUSFJFRS5OdW1iZXJLZXlmcmFtZVRyYWNrKFxuICAgKiAgIG5hbWUsXG4gICAqICAgWyAwLjAsIDAuNSwgMS4wIF0sIC8vIHRpbWVzXG4gICAqICAgWyAwLjAsIDEuMCwgMC4wIF0gLy8gdmFsdWVzXG4gICAqICk7XG4gICAqXG4gICAqIGNvbnN0IGNsaXAgPSBuZXcgVEhSRUUuQW5pbWF0aW9uQ2xpcChcbiAgICogICAnYmxpbmsnLCAvLyBuYW1lXG4gICAqICAgMS4wLCAvLyBkdXJhdGlvblxuICAgKiAgIFsgdHJhY2sgXSAvLyB0cmFja3NcbiAgICogKTtcbiAgICpcbiAgICogY29uc3QgbWl4ZXIgPSBuZXcgVEhSRUUuQW5pbWF0aW9uTWl4ZXIoIHZybS5zY2VuZSApO1xuICAgKiBjb25zdCBhY3Rpb24gPSBtaXhlci5jbGlwQWN0aW9uKCBjbGlwICk7XG4gICAqIGFjdGlvbi5wbGF5KCk7XG4gICAqIGBgYFxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBleHByZXNzaW9uXG4gICAqL1xuICBwdWJsaWMgZ2V0RXhwcmVzc2lvblRyYWNrTmFtZShuYW1lOiBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSB8IHN0cmluZyk6IHN0cmluZyB8IG51bGwge1xuICAgIGNvbnN0IGV4cHJlc3Npb24gPSB0aGlzLmdldEV4cHJlc3Npb24obmFtZSk7XG4gICAgcmV0dXJuIGV4cHJlc3Npb24gPyBgJHtleHByZXNzaW9uLm5hbWV9LndlaWdodGAgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBldmVyeSBleHByZXNzaW9ucy5cbiAgICovXG4gIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgLy8gc2VlIGhvdyBtdWNoIHdlIHNob3VsZCBvdmVycmlkZSBjZXJ0YWluIGV4cHJlc3Npb25zXG4gICAgY29uc3Qgd2VpZ2h0TXVsdGlwbGllcnMgPSB0aGlzLl9jYWxjdWxhdGVXZWlnaHRNdWx0aXBsaWVycygpO1xuXG4gICAgLy8gcmVzZXQgZXhwcmVzc2lvbiBiaW5kcyBmaXJzdFxuICAgIHRoaXMuX2V4cHJlc3Npb25zLmZvckVhY2goKGV4cHJlc3Npb24pID0+IHtcbiAgICAgIGV4cHJlc3Npb24uY2xlYXJBcHBsaWVkV2VpZ2h0KCk7XG4gICAgfSk7XG5cbiAgICAvLyB0aGVuIGFwcGx5IGJpbmRzXG4gICAgdGhpcy5fZXhwcmVzc2lvbnMuZm9yRWFjaCgoZXhwcmVzc2lvbikgPT4ge1xuICAgICAgbGV0IG11bHRpcGxpZXIgPSAxLjA7XG4gICAgICBjb25zdCBuYW1lID0gZXhwcmVzc2lvbi5leHByZXNzaW9uTmFtZTtcblxuICAgICAgaWYgKHRoaXMuYmxpbmtFeHByZXNzaW9uTmFtZXMuaW5kZXhPZihuYW1lKSAhPT0gLTEpIHtcbiAgICAgICAgbXVsdGlwbGllciAqPSB3ZWlnaHRNdWx0aXBsaWVycy5ibGluaztcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMubG9va0F0RXhwcmVzc2lvbk5hbWVzLmluZGV4T2YobmFtZSkgIT09IC0xKSB7XG4gICAgICAgIG11bHRpcGxpZXIgKj0gd2VpZ2h0TXVsdGlwbGllcnMubG9va0F0O1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5tb3V0aEV4cHJlc3Npb25OYW1lcy5pbmRleE9mKG5hbWUpICE9PSAtMSkge1xuICAgICAgICBtdWx0aXBsaWVyICo9IHdlaWdodE11bHRpcGxpZXJzLm1vdXRoO1xuICAgICAgfVxuXG4gICAgICBleHByZXNzaW9uLmFwcGx5V2VpZ2h0KHsgbXVsdGlwbGllciB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgc3VtIG9mIG92ZXJyaWRlIGFtb3VudHMgdG8gc2VlIGhvdyBtdWNoIHdlIHNob3VsZCBtdWx0aXBseSB3ZWlnaHRzIG9mIGNlcnRhaW4gZXhwcmVzc2lvbnMuXG4gICAqL1xuICBwcml2YXRlIF9jYWxjdWxhdGVXZWlnaHRNdWx0aXBsaWVycygpOiB7XG4gICAgYmxpbms6IG51bWJlcjtcbiAgICBsb29rQXQ6IG51bWJlcjtcbiAgICBtb3V0aDogbnVtYmVyO1xuICB9IHtcbiAgICBsZXQgYmxpbmsgPSAxLjA7XG4gICAgbGV0IGxvb2tBdCA9IDEuMDtcbiAgICBsZXQgbW91dGggPSAxLjA7XG5cbiAgICB0aGlzLl9leHByZXNzaW9ucy5mb3JFYWNoKChleHByZXNzaW9uKSA9PiB7XG4gICAgICBibGluayAtPSBleHByZXNzaW9uLm92ZXJyaWRlQmxpbmtBbW91bnQ7XG4gICAgICBsb29rQXQgLT0gZXhwcmVzc2lvbi5vdmVycmlkZUxvb2tBdEFtb3VudDtcbiAgICAgIG1vdXRoIC09IGV4cHJlc3Npb24ub3ZlcnJpZGVNb3V0aEFtb3VudDtcbiAgICB9KTtcblxuICAgIGJsaW5rID0gTWF0aC5tYXgoMC4wLCBibGluayk7XG4gICAgbG9va0F0ID0gTWF0aC5tYXgoMC4wLCBsb29rQXQpO1xuICAgIG1vdXRoID0gTWF0aC5tYXgoMC4wLCBtb3V0aCk7XG5cbiAgICByZXR1cm4geyBibGluaywgbG9va0F0LCBtb3V0aCB9O1xuICB9XG59XG4iLCAiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uICovXG5cbmV4cG9ydCBjb25zdCBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGUgPSB7XG4gIENvbG9yOiAnY29sb3InLFxuICBFbWlzc2lvbkNvbG9yOiAnZW1pc3Npb25Db2xvcicsXG4gIFNoYWRlQ29sb3I6ICdzaGFkZUNvbG9yJyxcbiAgTWF0Y2FwQ29sb3I6ICdtYXRjYXBDb2xvcicsXG4gIFJpbUNvbG9yOiAncmltQ29sb3InLFxuICBPdXRsaW5lQ29sb3I6ICdvdXRsaW5lQ29sb3InLFxufSBhcyBjb25zdDtcblxuZXhwb3J0IHR5cGUgVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JUeXBlID1cbiAgKHR5cGVvZiBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGUpW2tleW9mIHR5cGVvZiBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGVdO1xuXG5leHBvcnQgY29uc3QgdjBFeHByZXNzaW9uTWF0ZXJpYWxDb2xvck1hcDogeyBba2V5OiBzdHJpbmddOiBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGUgfCB1bmRlZmluZWQgfSA9IHtcbiAgX0NvbG9yOiBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGUuQ29sb3IsXG4gIF9FbWlzc2lvbkNvbG9yOiBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGUuRW1pc3Npb25Db2xvcixcbiAgX1NoYWRlQ29sb3I6IFZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yVHlwZS5TaGFkZUNvbG9yLFxuICBfUmltQ29sb3I6IFZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yVHlwZS5SaW1Db2xvcixcbiAgX091dGxpbmVDb2xvcjogVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JUeXBlLk91dGxpbmVDb2xvcixcbn07XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHR5cGUgeyBWUk1FeHByZXNzaW9uQmluZCB9IGZyb20gJy4vVlJNRXhwcmVzc2lvbkJpbmQnO1xuaW1wb3J0IHR5cGUgeyBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGUgfSBmcm9tICcuL1ZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yVHlwZSc7XG5cbmNvbnN0IF9jb2xvciA9IG5ldyBUSFJFRS5Db2xvcigpO1xuXG5pbnRlcmZhY2UgQ29sb3JCaW5kU3RhdGUge1xuICBwcm9wZXJ0eU5hbWU6IHN0cmluZztcbiAgaW5pdGlhbFZhbHVlOiBUSFJFRS5Db2xvcjtcbiAgZGVsdGFWYWx1ZTogVEhSRUUuQ29sb3I7XG59XG5cbmludGVyZmFjZSBBbHBoYUJpbmRTdGF0ZSB7XG4gIHByb3BlcnR5TmFtZTogc3RyaW5nO1xuICBpbml0aWFsVmFsdWU6IG51bWJlcjtcbiAgZGVsdGFWYWx1ZTogbnVtYmVyO1xufVxuXG5pbnRlcmZhY2UgQmluZFN0YXRlIHtcbiAgY29sb3I6IENvbG9yQmluZFN0YXRlIHwgbnVsbDtcbiAgYWxwaGE6IEFscGhhQmluZFN0YXRlIHwgbnVsbDtcbn1cblxuLyoqXG4gKiBBIGJpbmQgb2YgZXhwcmVzc2lvbiBpbmZsdWVuY2VzIHRvIGEgbWF0ZXJpYWwgY29sb3IuXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvckJpbmQgaW1wbGVtZW50cyBWUk1FeHByZXNzaW9uQmluZCB7XG4gIC8qKlxuICAgKiBNYXBwaW5nIG9mIHByb3BlcnR5IG5hbWVzIGZyb20gVlJNQy9tYXRlcmlhbENvbG9yQmluZHMudHlwZSB0byB0aHJlZS5qcy9NYXRlcmlhbC5cbiAgICogVGhlIGZpcnN0IGVsZW1lbnQgc3RhbmRzIGZvciBjb2xvciBjaGFubmVscywgdGhlIHNlY29uZCBlbGVtZW50IHN0YW5kcyBmb3IgdGhlIGFscGhhIGNoYW5uZWwuXG4gICAqIFRoZSBzZWNvbmQgZWxlbWVudCBjYW4gYmUgbnVsbCBpZiB0aGUgdGFyZ2V0IHByb3BlcnR5IGRvZXNuJ3QgZXhpc3QuXG4gICAqL1xuICAvLyBUT0RPOiBXZSBtaWdodCB3YW50IHRvIHVzZSB0aGUgYHNhdGlzZmllc2Agb3BlcmF0b3Igb25jZSB3ZSBidW1wIFRTIHRvIDQuOSBvciBoaWdoZXJcbiAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vcGl4aXYvdGhyZWUtdnJtL3B1bGwvMTMyMyNkaXNjdXNzaW9uX3IxMzc0MDIwMDM1XG4gIHByaXZhdGUgc3RhdGljIF9wcm9wZXJ0eU5hbWVNYXBNYXA6IHtcbiAgICBbZGlzdGluZ3Vpc2hlcjogc3RyaW5nXTogeyBbdHlwZSBpbiBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGVdPzogcmVhZG9ubHkgW3N0cmluZywgc3RyaW5nIHwgbnVsbF0gfTtcbiAgfSA9IHtcbiAgICBpc01lc2hTdGFuZGFyZE1hdGVyaWFsOiB7XG4gICAgICBjb2xvcjogWydjb2xvcicsICdvcGFjaXR5J10sXG4gICAgICBlbWlzc2lvbkNvbG9yOiBbJ2VtaXNzaXZlJywgbnVsbF0sXG4gICAgfSxcbiAgICBpc01lc2hCYXNpY01hdGVyaWFsOiB7XG4gICAgICBjb2xvcjogWydjb2xvcicsICdvcGFjaXR5J10sXG4gICAgfSxcbiAgICBpc01Ub29uTWF0ZXJpYWw6IHtcbiAgICAgIGNvbG9yOiBbJ2NvbG9yJywgJ29wYWNpdHknXSxcbiAgICAgIGVtaXNzaW9uQ29sb3I6IFsnZW1pc3NpdmUnLCBudWxsXSxcbiAgICAgIG91dGxpbmVDb2xvcjogWydvdXRsaW5lQ29sb3JGYWN0b3InLCBudWxsXSxcbiAgICAgIG1hdGNhcENvbG9yOiBbJ21hdGNhcEZhY3RvcicsIG51bGxdLFxuICAgICAgcmltQ29sb3I6IFsncGFyYW1ldHJpY1JpbUNvbG9yRmFjdG9yJywgbnVsbF0sXG4gICAgICBzaGFkZUNvbG9yOiBbJ3NoYWRlQ29sb3JGYWN0b3InLCBudWxsXSxcbiAgICB9LFxuICB9O1xuXG4gIC8qKlxuICAgKiBUaGUgdGFyZ2V0IG1hdGVyaWFsLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IG1hdGVyaWFsOiBUSFJFRS5NYXRlcmlhbDtcblxuICAvKipcbiAgICogVGhlIHR5cGUgb2YgdGhlIHRhcmdldCBwcm9wZXJ0eSBvZiB0aGUgbWF0ZXJpYWwuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZTogVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JUeXBlO1xuXG4gIC8qKlxuICAgKiBUaGUgdGFyZ2V0IGNvbG9yLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IHRhcmdldFZhbHVlOiBUSFJFRS5Db2xvcjtcblxuICAvKipcbiAgICogVGhlIHRhcmdldCBhbHBoYS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSB0YXJnZXRBbHBoYTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBJdHMgYmluZGluZyBzdGF0ZS5cbiAgICogSWYgaXQgY2Fubm90IGZpbmQgdGhlIHRhcmdldCBwcm9wZXJ0eSBpbiB0aGUgY29uc3RydWN0b3IsIGVhY2ggcHJvcGVydHkgd2lsbCBiZSBudWxsIGluc3RlYWQuXG4gICAqL1xuICBwcml2YXRlIF9zdGF0ZTogQmluZFN0YXRlO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcih7XG4gICAgbWF0ZXJpYWwsXG4gICAgdHlwZSxcbiAgICB0YXJnZXRWYWx1ZSxcbiAgICB0YXJnZXRBbHBoYSxcbiAgfToge1xuICAgIC8qKlxuICAgICAqIFRoZSB0YXJnZXQgbWF0ZXJpYWwuXG4gICAgICovXG4gICAgbWF0ZXJpYWw6IFRIUkVFLk1hdGVyaWFsO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHR5cGUgb2YgdGhlIHRhcmdldCBwcm9wZXJ0eSBvZiB0aGUgbWF0ZXJpYWwuXG4gICAgICovXG4gICAgdHlwZTogVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JUeXBlO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHRhcmdldCBjb2xvci5cbiAgICAgKi9cbiAgICB0YXJnZXRWYWx1ZTogVEhSRUUuQ29sb3I7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgdGFyZ2V0IGFscGhhLlxuICAgICAqL1xuICAgIHRhcmdldEFscGhhPzogbnVtYmVyO1xuICB9KSB7XG4gICAgdGhpcy5tYXRlcmlhbCA9IG1hdGVyaWFsO1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy50YXJnZXRWYWx1ZSA9IHRhcmdldFZhbHVlO1xuICAgIHRoaXMudGFyZ2V0QWxwaGEgPSB0YXJnZXRBbHBoYSA/PyAxLjA7XG5cbiAgICAvLyBpbml0IGJpbmQgc3RhdGVcbiAgICBjb25zdCBjb2xvciA9IHRoaXMuX2luaXRDb2xvckJpbmRTdGF0ZSgpO1xuICAgIGNvbnN0IGFscGhhID0gdGhpcy5faW5pdEFscGhhQmluZFN0YXRlKCk7XG4gICAgdGhpcy5fc3RhdGUgPSB7IGNvbG9yLCBhbHBoYSB9O1xuICB9XG5cbiAgcHVibGljIGFwcGx5V2VpZ2h0KHdlaWdodDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgeyBjb2xvciwgYWxwaGEgfSA9IHRoaXMuX3N0YXRlO1xuXG4gICAgaWYgKGNvbG9yICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IHsgcHJvcGVydHlOYW1lLCBkZWx0YVZhbHVlIH0gPSBjb2xvcjtcblxuICAgICAgY29uc3QgdGFyZ2V0ID0gKHRoaXMubWF0ZXJpYWwgYXMgYW55KVtwcm9wZXJ0eU5hbWVdIGFzIFRIUkVFLkNvbG9yO1xuICAgICAgaWYgKHRhcmdldCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGFyZ2V0LmFkZChfY29sb3IuY29weShkZWx0YVZhbHVlKS5tdWx0aXBseVNjYWxhcih3ZWlnaHQpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoYWxwaGEgIT0gbnVsbCkge1xuICAgICAgY29uc3QgeyBwcm9wZXJ0eU5hbWUsIGRlbHRhVmFsdWUgfSA9IGFscGhhO1xuXG4gICAgICBjb25zdCB0YXJnZXQgPSAodGhpcy5tYXRlcmlhbCBhcyBhbnkpW3Byb3BlcnR5TmFtZV0gYXMgbnVtYmVyO1xuICAgICAgaWYgKHRhcmdldCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgKCh0aGlzLm1hdGVyaWFsIGFzIGFueSlbcHJvcGVydHlOYW1lXSBhcyBudW1iZXIpICs9IGRlbHRhVmFsdWUgKiB3ZWlnaHQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNsZWFyQXBwbGllZFdlaWdodCgpOiB2b2lkIHtcbiAgICBjb25zdCB7IGNvbG9yLCBhbHBoYSB9ID0gdGhpcy5fc3RhdGU7XG5cbiAgICBpZiAoY29sb3IgIT0gbnVsbCkge1xuICAgICAgY29uc3QgeyBwcm9wZXJ0eU5hbWUsIGluaXRpYWxWYWx1ZSB9ID0gY29sb3I7XG5cbiAgICAgIGNvbnN0IHRhcmdldCA9ICh0aGlzLm1hdGVyaWFsIGFzIGFueSlbcHJvcGVydHlOYW1lXSBhcyBUSFJFRS5Db2xvcjtcbiAgICAgIGlmICh0YXJnZXQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRhcmdldC5jb3B5KGluaXRpYWxWYWx1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGFscGhhICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IHsgcHJvcGVydHlOYW1lLCBpbml0aWFsVmFsdWUgfSA9IGFscGhhO1xuXG4gICAgICBjb25zdCB0YXJnZXQgPSAodGhpcy5tYXRlcmlhbCBhcyBhbnkpW3Byb3BlcnR5TmFtZV0gYXMgbnVtYmVyO1xuICAgICAgaWYgKHRhcmdldCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgKCh0aGlzLm1hdGVyaWFsIGFzIGFueSlbcHJvcGVydHlOYW1lXSBhcyBudW1iZXIpID0gaW5pdGlhbFZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2luaXRDb2xvckJpbmRTdGF0ZSgpOiBDb2xvckJpbmRTdGF0ZSB8IG51bGwge1xuICAgIGNvbnN0IHsgbWF0ZXJpYWwsIHR5cGUsIHRhcmdldFZhbHVlIH0gPSB0aGlzO1xuXG4gICAgY29uc3QgcHJvcGVydHlOYW1lTWFwID0gdGhpcy5fZ2V0UHJvcGVydHlOYW1lTWFwKCk7XG4gICAgY29uc3QgcHJvcGVydHlOYW1lID0gcHJvcGVydHlOYW1lTWFwPy5bdHlwZV0/LlswXSA/PyBudWxsO1xuXG4gICAgaWYgKHByb3BlcnR5TmFtZSA9PSBudWxsKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIGBUcmllZCB0byBhZGQgYSBtYXRlcmlhbCBjb2xvciBiaW5kIHRvIHRoZSBtYXRlcmlhbCAke1xuICAgICAgICAgIG1hdGVyaWFsLm5hbWUgPz8gJyhubyBuYW1lKSdcbiAgICAgICAgfSwgdGhlIHR5cGUgJHt0eXBlfSBidXQgdGhlIG1hdGVyaWFsIG9yIHRoZSB0eXBlIGlzIG5vdCBzdXBwb3J0ZWQuYCxcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHRhcmdldCA9IChtYXRlcmlhbCBhcyBhbnkpW3Byb3BlcnR5TmFtZV0gYXMgVEhSRUUuQ29sb3I7XG5cbiAgICBjb25zdCBpbml0aWFsVmFsdWUgPSB0YXJnZXQuY2xvbmUoKTtcblxuICAgIC8vIFx1OENBMFx1MzA2RVx1NTAyNFx1MzA5Mlx1NEZERFx1NjMwMVx1MzA1OVx1MzA4Qlx1MzA1Rlx1MzA4MVx1MzA2QkNvbG9yLnN1Ylx1MzA5Mlx1NEY3Rlx1MzA4Rlx1MzA1QVx1MzA2Qlx1NURFRVx1NTIwNlx1MzA5Mlx1OEEwOFx1N0I5N1x1MzA1OVx1MzA4QlxuICAgIGNvbnN0IGRlbHRhVmFsdWUgPSBuZXcgVEhSRUUuQ29sb3IoXG4gICAgICB0YXJnZXRWYWx1ZS5yIC0gaW5pdGlhbFZhbHVlLnIsXG4gICAgICB0YXJnZXRWYWx1ZS5nIC0gaW5pdGlhbFZhbHVlLmcsXG4gICAgICB0YXJnZXRWYWx1ZS5iIC0gaW5pdGlhbFZhbHVlLmIsXG4gICAgKTtcblxuICAgIHJldHVybiB7IHByb3BlcnR5TmFtZSwgaW5pdGlhbFZhbHVlLCBkZWx0YVZhbHVlIH07XG4gIH1cblxuICBwcml2YXRlIF9pbml0QWxwaGFCaW5kU3RhdGUoKTogQWxwaGFCaW5kU3RhdGUgfCBudWxsIHtcbiAgICBjb25zdCB7IG1hdGVyaWFsLCB0eXBlLCB0YXJnZXRBbHBoYSB9ID0gdGhpcztcblxuICAgIGNvbnN0IHByb3BlcnR5TmFtZU1hcCA9IHRoaXMuX2dldFByb3BlcnR5TmFtZU1hcCgpO1xuICAgIGNvbnN0IHByb3BlcnR5TmFtZSA9IHByb3BlcnR5TmFtZU1hcD8uW3R5cGVdPy5bMV0gPz8gbnVsbDtcblxuICAgIGlmIChwcm9wZXJ0eU5hbWUgPT0gbnVsbCAmJiB0YXJnZXRBbHBoYSAhPT0gMS4wKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIGBUcmllZCB0byBhZGQgYSBtYXRlcmlhbCBhbHBoYSBiaW5kIHRvIHRoZSBtYXRlcmlhbCAke1xuICAgICAgICAgIG1hdGVyaWFsLm5hbWUgPz8gJyhubyBuYW1lKSdcbiAgICAgICAgfSwgdGhlIHR5cGUgJHt0eXBlfSBidXQgdGhlIG1hdGVyaWFsIG9yIHRoZSB0eXBlIGRvZXMgbm90IHN1cHBvcnQgYWxwaGEuYCxcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlmIChwcm9wZXJ0eU5hbWUgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgaW5pdGlhbFZhbHVlID0gKG1hdGVyaWFsIGFzIGFueSlbcHJvcGVydHlOYW1lXSBhcyBudW1iZXI7XG5cbiAgICBjb25zdCBkZWx0YVZhbHVlID0gdGFyZ2V0QWxwaGEgLSBpbml0aWFsVmFsdWU7XG5cbiAgICByZXR1cm4geyBwcm9wZXJ0eU5hbWUsIGluaXRpYWxWYWx1ZSwgZGVsdGFWYWx1ZSB9O1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0UHJvcGVydHlOYW1lTWFwKCk6XG4gICAgfCB7IFt0eXBlIGluIFZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yVHlwZV0/OiByZWFkb25seSBbc3RyaW5nLCBzdHJpbmcgfCBudWxsXSB9XG4gICAgfCBudWxsIHtcbiAgICByZXR1cm4gKFxuICAgICAgT2JqZWN0LmVudHJpZXMoVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JCaW5kLl9wcm9wZXJ0eU5hbWVNYXBNYXApLmZpbmQoKFtkaXN0aW5ndWlzaGVyXSkgPT4ge1xuICAgICAgICByZXR1cm4gKHRoaXMubWF0ZXJpYWwgYXMgYW55KVtkaXN0aW5ndWlzaGVyXSA9PT0gdHJ1ZTtcbiAgICAgIH0pPy5bMV0gPz8gbnVsbFxuICAgICk7XG4gIH1cbn1cbiIsICJpbXBvcnQgdHlwZSAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB0eXBlIHsgVlJNRXhwcmVzc2lvbkJpbmQgfSBmcm9tICcuL1ZSTUV4cHJlc3Npb25CaW5kJztcblxuLyoqXG4gKiBBIGJpbmQgb2Yge0BsaW5rIFZSTUV4cHJlc3Npb259IGluZmx1ZW5jZXMgdG8gbW9ycGggdGFyZ2V0cy5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUV4cHJlc3Npb25Nb3JwaFRhcmdldEJpbmQgaW1wbGVtZW50cyBWUk1FeHByZXNzaW9uQmluZCB7XG4gIC8qKlxuICAgKiBUaGUgbWVzaCBwcmltaXRpdmVzIHRoYXQgYXR0YWNoZWQgdG8gdGFyZ2V0IG1lc2guXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgcHJpbWl0aXZlczogVEhSRUUuTWVzaFtdO1xuXG4gIC8qKlxuICAgKiBUaGUgaW5kZXggb2YgdGhlIG1vcnBoIHRhcmdldCBpbiB0aGUgbWVzaC5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBpbmRleDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgd2VpZ2h0IHZhbHVlIG9mIHRhcmdldCBtb3JwaCB0YXJnZXQuIFJhbmdpbmcgaW4gWzAuMCAtIDEuMF0uXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgd2VpZ2h0OiBudW1iZXI7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHtcbiAgICBwcmltaXRpdmVzLFxuICAgIGluZGV4LFxuICAgIHdlaWdodCxcbiAgfToge1xuICAgIC8qKlxuICAgICAqIFRoZSBtZXNoIHByaW1pdGl2ZXMgdGhhdCBhdHRhY2hlZCB0byB0YXJnZXQgbWVzaC5cbiAgICAgKi9cbiAgICBwcmltaXRpdmVzOiBUSFJFRS5NZXNoW107XG5cbiAgICAvKipcbiAgICAgKiBUaGUgaW5kZXggb2YgdGhlIG1vcnBoIHRhcmdldCBpbiB0aGUgbWVzaC5cbiAgICAgKi9cbiAgICBpbmRleDogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHdlaWdodCB2YWx1ZSBvZiB0YXJnZXQgbW9ycGggdGFyZ2V0LiBSYW5naW5nIGluIFswLjAgLSAxLjBdLlxuICAgICAqL1xuICAgIHdlaWdodDogbnVtYmVyO1xuICB9KSB7XG4gICAgdGhpcy5wcmltaXRpdmVzID0gcHJpbWl0aXZlcztcbiAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gICAgdGhpcy53ZWlnaHQgPSB3ZWlnaHQ7XG4gIH1cblxuICBwdWJsaWMgYXBwbHlXZWlnaHQod2VpZ2h0OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnByaW1pdGl2ZXMuZm9yRWFjaCgobWVzaCkgPT4ge1xuICAgICAgaWYgKG1lc2gubW9ycGhUYXJnZXRJbmZsdWVuY2VzPy5bdGhpcy5pbmRleF0gIT0gbnVsbCkge1xuICAgICAgICBtZXNoLm1vcnBoVGFyZ2V0SW5mbHVlbmNlc1t0aGlzLmluZGV4XSArPSB0aGlzLndlaWdodCAqIHdlaWdodDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBjbGVhckFwcGxpZWRXZWlnaHQoKTogdm9pZCB7XG4gICAgdGhpcy5wcmltaXRpdmVzLmZvckVhY2goKG1lc2gpID0+IHtcbiAgICAgIGlmIChtZXNoLm1vcnBoVGFyZ2V0SW5mbHVlbmNlcz8uW3RoaXMuaW5kZXhdICE9IG51bGwpIHtcbiAgICAgICAgbWVzaC5tb3JwaFRhcmdldEluZmx1ZW5jZXNbdGhpcy5pbmRleF0gPSAwLjA7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgdHlwZSB7IFZSTUV4cHJlc3Npb25CaW5kIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uQmluZCc7XG5cbmNvbnN0IF92MiA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cbi8qKlxuICogQSBiaW5kIG9mIGV4cHJlc3Npb24gaW5mbHVlbmNlcyB0byB0ZXh0dXJlIHRyYW5zZm9ybXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1FeHByZXNzaW9uVGV4dHVyZVRyYW5zZm9ybUJpbmQgaW1wbGVtZW50cyBWUk1FeHByZXNzaW9uQmluZCB7XG4gIHByaXZhdGUgc3RhdGljIF9wcm9wZXJ0eU5hbWVzTWFwOiB7IFtkaXN0aW5ndWlzaGVyOiBzdHJpbmddOiBzdHJpbmdbXSB9ID0ge1xuICAgIGlzTWVzaFN0YW5kYXJkTWF0ZXJpYWw6IFtcbiAgICAgICdtYXAnLFxuICAgICAgJ2VtaXNzaXZlTWFwJyxcbiAgICAgICdidW1wTWFwJyxcbiAgICAgICdub3JtYWxNYXAnLFxuICAgICAgJ2Rpc3BsYWNlbWVudE1hcCcsXG4gICAgICAncm91Z2huZXNzTWFwJyxcbiAgICAgICdtZXRhbG5lc3NNYXAnLFxuICAgICAgJ2FscGhhTWFwJyxcbiAgICBdLFxuICAgIGlzTWVzaEJhc2ljTWF0ZXJpYWw6IFsnbWFwJywgJ3NwZWN1bGFyTWFwJywgJ2FscGhhTWFwJ10sXG4gICAgaXNNVG9vbk1hdGVyaWFsOiBbXG4gICAgICAnbWFwJyxcbiAgICAgICdub3JtYWxNYXAnLFxuICAgICAgJ2VtaXNzaXZlTWFwJyxcbiAgICAgICdzaGFkZU11bHRpcGx5VGV4dHVyZScsXG4gICAgICAncmltTXVsdGlwbHlUZXh0dXJlJyxcbiAgICAgICdvdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmUnLFxuICAgICAgJ3V2QW5pbWF0aW9uTWFza1RleHR1cmUnLFxuICAgIF0sXG4gIH07XG5cbiAgLyoqXG4gICAqIFRoZSB0YXJnZXQgbWF0ZXJpYWwuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgbWF0ZXJpYWw6IFRIUkVFLk1hdGVyaWFsO1xuXG4gIC8qKlxuICAgKiBUaGUgdXYgc2NhbGUgb2YgdGhlIHRleHR1cmUuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgc2NhbGU6IFRIUkVFLlZlY3RvcjI7XG5cbiAgLyoqXG4gICAqIFRoZSB1diBvZmZzZXQgb2YgdGhlIHRleHR1cmUuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgb2Zmc2V0OiBUSFJFRS5WZWN0b3IyO1xuXG4gIC8qKlxuICAgKiBUaGUgbGlzdCBvZiB0ZXh0dXJlIG5hbWVzIGFuZCBpdHMgc3RhdGUgdGhhdCBzaG91bGQgYmUgdHJhbnNmb3JtZWQgYnkgdGhpcyBiaW5kLlxuICAgKi9cbiAgcHJpdmF0ZSBfcHJvcGVydGllczoge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBpbml0aWFsT2Zmc2V0OiBUSFJFRS5WZWN0b3IyO1xuICAgIGluaXRpYWxTY2FsZTogVEhSRUUuVmVjdG9yMjtcbiAgICBkZWx0YU9mZnNldDogVEhSRUUuVmVjdG9yMjtcbiAgICBkZWx0YVNjYWxlOiBUSFJFRS5WZWN0b3IyO1xuICB9W107XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHtcbiAgICBtYXRlcmlhbCxcbiAgICBzY2FsZSxcbiAgICBvZmZzZXQsXG4gIH06IHtcbiAgICAvKipcbiAgICAgKiBUaGUgdGFyZ2V0IG1hdGVyaWFsLlxuICAgICAqL1xuICAgIG1hdGVyaWFsOiBUSFJFRS5NYXRlcmlhbDtcblxuICAgIC8qKlxuICAgICAqIFRoZSB1diBzY2FsZSBvZiB0aGUgdGV4dHVyZS5cbiAgICAgKi9cbiAgICBzY2FsZTogVEhSRUUuVmVjdG9yMjtcblxuICAgIC8qKlxuICAgICAqIFRoZSB1diBvZmZzZXQgb2YgdGhlIHRleHR1cmUuXG4gICAgICovXG4gICAgb2Zmc2V0OiBUSFJFRS5WZWN0b3IyO1xuICB9KSB7XG4gICAgdGhpcy5tYXRlcmlhbCA9IG1hdGVyaWFsO1xuICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICB0aGlzLm9mZnNldCA9IG9mZnNldDtcblxuICAgIGNvbnN0IHByb3BlcnR5TmFtZXMgPSBPYmplY3QuZW50cmllcyhWUk1FeHByZXNzaW9uVGV4dHVyZVRyYW5zZm9ybUJpbmQuX3Byb3BlcnR5TmFtZXNNYXApLmZpbmQoXG4gICAgICAoW2Rpc3Rpbmd1aXNoZXJdKSA9PiB7XG4gICAgICAgIHJldHVybiAobWF0ZXJpYWwgYXMgYW55KVtkaXN0aW5ndWlzaGVyXSA9PT0gdHJ1ZTtcbiAgICAgIH0sXG4gICAgKT8uWzFdO1xuXG4gICAgaWYgKHByb3BlcnR5TmFtZXMgPT0gbnVsbCkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBgVHJpZWQgdG8gYWRkIGEgdGV4dHVyZSB0cmFuc2Zvcm0gYmluZCB0byB0aGUgbWF0ZXJpYWwgJHtcbiAgICAgICAgICBtYXRlcmlhbC5uYW1lID8/ICcobm8gbmFtZSknXG4gICAgICAgIH0gYnV0IHRoZSBtYXRlcmlhbCBpcyBub3Qgc3VwcG9ydGVkLmAsXG4gICAgICApO1xuXG4gICAgICB0aGlzLl9wcm9wZXJ0aWVzID0gW107XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3Byb3BlcnRpZXMgPSBbXTtcblxuICAgICAgcHJvcGVydHlOYW1lcy5mb3JFYWNoKChwcm9wZXJ0eU5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgdGV4dHVyZSA9ICgobWF0ZXJpYWwgYXMgYW55KVtwcm9wZXJ0eU5hbWVdIGFzIFRIUkVFLlRleHR1cmUgfCB1bmRlZmluZWQpPy5jbG9uZSgpO1xuICAgICAgICBpZiAoIXRleHR1cmUpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIChtYXRlcmlhbCBhcyBhbnkpW3Byb3BlcnR5TmFtZV0gPSB0ZXh0dXJlOyAvLyBiZWNhdXNlIHRoZSB0ZXh0dXJlIGlzIGNsb25lZFxuXG4gICAgICAgIGNvbnN0IGluaXRpYWxPZmZzZXQgPSB0ZXh0dXJlLm9mZnNldC5jbG9uZSgpO1xuICAgICAgICBjb25zdCBpbml0aWFsU2NhbGUgPSB0ZXh0dXJlLnJlcGVhdC5jbG9uZSgpO1xuICAgICAgICBjb25zdCBkZWx0YU9mZnNldCA9IG9mZnNldC5jbG9uZSgpLnN1Yihpbml0aWFsT2Zmc2V0KTtcbiAgICAgICAgY29uc3QgZGVsdGFTY2FsZSA9IHNjYWxlLmNsb25lKCkuc3ViKGluaXRpYWxTY2FsZSk7XG5cbiAgICAgICAgdGhpcy5fcHJvcGVydGllcy5wdXNoKHtcbiAgICAgICAgICBuYW1lOiBwcm9wZXJ0eU5hbWUsXG4gICAgICAgICAgaW5pdGlhbE9mZnNldCxcbiAgICAgICAgICBkZWx0YU9mZnNldCxcbiAgICAgICAgICBpbml0aWFsU2NhbGUsXG4gICAgICAgICAgZGVsdGFTY2FsZSxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXBwbHlXZWlnaHQod2VpZ2h0OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9wcm9wZXJ0aWVzLmZvckVhY2goKHByb3BlcnR5KSA9PiB7XG4gICAgICBjb25zdCB0YXJnZXQgPSAodGhpcy5tYXRlcmlhbCBhcyBhbnkpW3Byb3BlcnR5Lm5hbWVdIGFzIFRIUkVFLlRleHR1cmU7XG4gICAgICBpZiAodGFyZ2V0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSAvLyBUT0RPOiB3ZSBzaG91bGQga2ljayB0aGlzIGF0IGBhZGRNYXRlcmlhbFZhbHVlYFxuXG4gICAgICB0YXJnZXQub2Zmc2V0LmFkZChfdjIuY29weShwcm9wZXJ0eS5kZWx0YU9mZnNldCkubXVsdGlwbHlTY2FsYXIod2VpZ2h0KSk7XG4gICAgICB0YXJnZXQucmVwZWF0LmFkZChfdjIuY29weShwcm9wZXJ0eS5kZWx0YVNjYWxlKS5tdWx0aXBseVNjYWxhcih3ZWlnaHQpKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBjbGVhckFwcGxpZWRXZWlnaHQoKTogdm9pZCB7XG4gICAgdGhpcy5fcHJvcGVydGllcy5mb3JFYWNoKChwcm9wZXJ0eSkgPT4ge1xuICAgICAgY29uc3QgdGFyZ2V0ID0gKHRoaXMubWF0ZXJpYWwgYXMgYW55KVtwcm9wZXJ0eS5uYW1lXSBhcyBUSFJFRS5UZXh0dXJlO1xuICAgICAgaWYgKHRhcmdldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gLy8gVE9ETzogd2Ugc2hvdWxkIGtpY2sgdGhpcyBhdCBgYWRkTWF0ZXJpYWxWYWx1ZWBcblxuICAgICAgdGFyZ2V0Lm9mZnNldC5jb3B5KHByb3BlcnR5LmluaXRpYWxPZmZzZXQpO1xuICAgICAgdGFyZ2V0LnJlcGVhdC5jb3B5KHByb3BlcnR5LmluaXRpYWxTY2FsZSk7XG4gICAgfSk7XG4gIH1cbn1cbiIsICIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cblxuZXhwb3J0IGNvbnN0IFZSTUV4cHJlc3Npb25PdmVycmlkZVR5cGUgPSB7XG4gIE5vbmU6ICdub25lJyxcbiAgQmxvY2s6ICdibG9jaycsXG4gIEJsZW5kOiAnYmxlbmQnLFxufSBhcyBjb25zdDtcblxuZXhwb3J0IHR5cGUgVlJNRXhwcmVzc2lvbk92ZXJyaWRlVHlwZSA9ICh0eXBlb2YgVlJNRXhwcmVzc2lvbk92ZXJyaWRlVHlwZSlba2V5b2YgdHlwZW9mIFZSTUV4cHJlc3Npb25PdmVycmlkZVR5cGVdO1xuIiwgImltcG9ydCB0eXBlIHsgVlJNRmlyc3RQZXJzb25NZXNoQW5ub3RhdGlvbiB9IGZyb20gJy4vVlJNRmlyc3RQZXJzb25NZXNoQW5ub3RhdGlvbic7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgdHlwZSB7IFZSTUh1bWFub2lkIH0gZnJvbSAnLi4vaHVtYW5vaWQnO1xuXG5leHBvcnQgY2xhc3MgVlJNRmlyc3RQZXJzb24ge1xuICAvKipcbiAgICogQSBkZWZhdWx0IGNhbWVyYSBsYXllciBmb3IgYEZpcnN0UGVyc29uT25seWAgbGF5ZXIuXG4gICAqXG4gICAqIEBzZWUge0BsaW5rIGZpcnN0UGVyc29uT25seUxheWVyfVxuICAgKi9cbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBERUZBVUxUX0ZJUlNUUEVSU09OX09OTFlfTEFZRVIgPSA5O1xuXG4gIC8qKlxuICAgKiBBIGRlZmF1bHQgY2FtZXJhIGxheWVyIGZvciBgVGhpcmRQZXJzb25Pbmx5YCBsYXllci5cbiAgICpcbiAgICogQHNlZSB7QGxpbmsgdGhpcmRQZXJzb25Pbmx5TGF5ZXJ9XG4gICAqL1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IERFRkFVTFRfVEhJUkRQRVJTT05fT05MWV9MQVlFUiA9IDEwO1xuXG4gIC8qKlxuICAgKiBJdHMgYXNzb2NpYXRlZCB7QGxpbmsgVlJNSHVtYW5vaWR9LlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGh1bWFub2lkOiBWUk1IdW1hbm9pZDtcbiAgcHVibGljIG1lc2hBbm5vdGF0aW9uczogVlJNRmlyc3RQZXJzb25NZXNoQW5ub3RhdGlvbltdO1xuXG4gIHByaXZhdGUgX2ZpcnN0UGVyc29uT25seUxheWVyID0gVlJNRmlyc3RQZXJzb24uREVGQVVMVF9GSVJTVFBFUlNPTl9PTkxZX0xBWUVSO1xuICBwcml2YXRlIF90aGlyZFBlcnNvbk9ubHlMYXllciA9IFZSTUZpcnN0UGVyc29uLkRFRkFVTFRfVEhJUkRQRVJTT05fT05MWV9MQVlFUjtcblxuICBwcml2YXRlIF9pbml0aWFsaXplZExheWVycyA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgVlJNRmlyc3RQZXJzb24gb2JqZWN0LlxuICAgKlxuICAgKiBAcGFyYW0gaHVtYW5vaWQgQSB7QGxpbmsgVlJNSHVtYW5vaWR9XG4gICAqIEBwYXJhbSBtZXNoQW5ub3RhdGlvbnMgQSB7QGxpbmsgVlJNRmlyc3RQZXJzb25NZXNoQW5ub3RhdGlvbn1cbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihodW1hbm9pZDogVlJNSHVtYW5vaWQsIG1lc2hBbm5vdGF0aW9uczogVlJNRmlyc3RQZXJzb25NZXNoQW5ub3RhdGlvbltdKSB7XG4gICAgdGhpcy5odW1hbm9pZCA9IGh1bWFub2lkO1xuICAgIHRoaXMubWVzaEFubm90YXRpb25zID0gbWVzaEFubm90YXRpb25zO1xuICB9XG5cbiAgLyoqXG4gICAqIENvcHkgdGhlIGdpdmVuIHtAbGluayBWUk1GaXJzdFBlcnNvbn0gaW50byB0aGlzIG9uZS5cbiAgICoge0BsaW5rIGh1bWFub2lkfSBtdXN0IGJlIHNhbWUgYXMgdGhlIHNvdXJjZSBvbmUuXG4gICAqIEBwYXJhbSBzb3VyY2UgVGhlIHtAbGluayBWUk1GaXJzdFBlcnNvbn0geW91IHdhbnQgdG8gY29weVxuICAgKiBAcmV0dXJucyB0aGlzXG4gICAqL1xuICBwdWJsaWMgY29weShzb3VyY2U6IFZSTUZpcnN0UGVyc29uKTogdGhpcyB7XG4gICAgaWYgKHRoaXMuaHVtYW5vaWQgIT09IHNvdXJjZS5odW1hbm9pZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdWUk1GaXJzdFBlcnNvbjogaHVtYW5vaWQgbXVzdCBiZSBzYW1lIGluIG9yZGVyIHRvIGNvcHknKTtcbiAgICB9XG5cbiAgICB0aGlzLm1lc2hBbm5vdGF0aW9ucyA9IHNvdXJjZS5tZXNoQW5ub3RhdGlvbnMubWFwKChhbm5vdGF0aW9uKSA9PiAoe1xuICAgICAgbWVzaGVzOiBhbm5vdGF0aW9uLm1lc2hlcy5jb25jYXQoKSxcbiAgICAgIHR5cGU6IGFubm90YXRpb24udHlwZSxcbiAgICB9KSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgY2xvbmUgb2YgdGhpcyB7QGxpbmsgVlJNRmlyc3RQZXJzb259LlxuICAgKiBAcmV0dXJucyBDb3BpZWQge0BsaW5rIFZSTUZpcnN0UGVyc29ufVxuICAgKi9cbiAgcHVibGljIGNsb25lKCk6IFZSTUZpcnN0UGVyc29uIHtcbiAgICByZXR1cm4gbmV3IFZSTUZpcnN0UGVyc29uKHRoaXMuaHVtYW5vaWQsIHRoaXMubWVzaEFubm90YXRpb25zKS5jb3B5KHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgY2FtZXJhIGxheWVyIHJlcHJlc2VudHMgYEZpcnN0UGVyc29uT25seWAgbGF5ZXIuXG4gICAqIE5vdGUgdGhhdCAqKnlvdSBtdXN0IGNhbGwge0BsaW5rIHNldHVwfSBmaXJzdCBiZWZvcmUgeW91IHVzZSB0aGUgbGF5ZXIgZmVhdHVyZSoqIG9yIGl0IGRvZXMgbm90IHdvcmsgcHJvcGVybHkuXG4gICAqXG4gICAqIFRoZSB2YWx1ZSBpcyB7QGxpbmsgREVGQVVMVF9GSVJTVFBFUlNPTl9PTkxZX0xBWUVSfSBieSBkZWZhdWx0IGJ1dCB5b3UgY2FuIGNoYW5nZSB0aGUgbGF5ZXIgYnkgc3BlY2lmeWluZyB2aWEge0BsaW5rIHNldHVwfSBpZiB5b3UgcHJlZmVyLlxuICAgKlxuICAgKiBAc2VlIGh0dHBzOi8vdnJtLmRldi9lbi91bml2cm0vYXBpL3VuaXZybV91c2VfZmlyc3RwZXJzb24vXG4gICAqIEBzZWUgaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzLyNhcGkvZW4vY29yZS9MYXllcnNcbiAgICovXG4gIHB1YmxpYyBnZXQgZmlyc3RQZXJzb25Pbmx5TGF5ZXIoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fZmlyc3RQZXJzb25Pbmx5TGF5ZXI7XG4gIH1cblxuICAvKipcbiAgICogQSBjYW1lcmEgbGF5ZXIgcmVwcmVzZW50cyBgVGhpcmRQZXJzb25Pbmx5YCBsYXllci5cbiAgICogTm90ZSB0aGF0ICoqeW91IG11c3QgY2FsbCB7QGxpbmsgc2V0dXB9IGZpcnN0IGJlZm9yZSB5b3UgdXNlIHRoZSBsYXllciBmZWF0dXJlKiogb3IgaXQgZG9lcyBub3Qgd29yayBwcm9wZXJseS5cbiAgICpcbiAgICogVGhlIHZhbHVlIGlzIHtAbGluayBERUZBVUxUX1RISVJEUEVSU09OX09OTFlfTEFZRVJ9IGJ5IGRlZmF1bHQgYnV0IHlvdSBjYW4gY2hhbmdlIHRoZSBsYXllciBieSBzcGVjaWZ5aW5nIHZpYSB7QGxpbmsgc2V0dXB9IGlmIHlvdSBwcmVmZXIuXG4gICAqXG4gICAqIEBzZWUgaHR0cHM6Ly92cm0uZGV2L2VuL3VuaXZybS9hcGkvdW5pdnJtX3VzZV9maXJzdHBlcnNvbi9cbiAgICogQHNlZSBodHRwczovL3RocmVlanMub3JnL2RvY3MvI2FwaS9lbi9jb3JlL0xheWVyc1xuICAgKi9cbiAgcHVibGljIGdldCB0aGlyZFBlcnNvbk9ubHlMYXllcigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl90aGlyZFBlcnNvbk9ubHlMYXllcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbiB0aGlzIG1ldGhvZCwgaXQgYXNzaWducyBsYXllcnMgZm9yIGV2ZXJ5IG1lc2hlcyBiYXNlZCBvbiBtZXNoIGFubm90YXRpb25zLlxuICAgKiBZb3UgbXVzdCBjYWxsIHRoaXMgbWV0aG9kIGZpcnN0IGJlZm9yZSB5b3UgdXNlIHRoZSBsYXllciBmZWF0dXJlLlxuICAgKlxuICAgKiBUaGlzIGlzIGFuIGVxdWl2YWxlbnQgb2YgW1ZSTUZpcnN0UGVyc29uLlNldHVwXShodHRwczovL2dpdGh1Yi5jb20vdnJtLWMvVW5pVlJNL2Jsb2IvNzNhNWJkOGZjZGRhYTJhN2E4NzM1MDk5YTk3ZTYzYzlkYjNlNWVhMC9Bc3NldHMvVlJNL1J1bnRpbWUvRmlyc3RQZXJzb24vVlJNRmlyc3RQZXJzb24uY3MjTDI5NS1MMjk5KSBvZiB0aGUgVW5pVlJNLlxuICAgKlxuICAgKiBUaGUgYGNhbWVyYUxheWVyYCBwYXJhbWV0ZXIgc3BlY2lmaWVzIHdoaWNoIGxheWVyIHdpbGwgYmUgYXNzaWduZWQgZm9yIGBGaXJzdFBlcnNvbk9ubHlgIC8gYFRoaXJkUGVyc29uT25seWAuXG4gICAqIEluIFVuaVZSTSwgd2Ugc3BlY2lmaWVkIHRob3NlIGJ5IG5hbWluZyBlYWNoIGRlc2lyZWQgbGF5ZXIgYXMgYEZJUlNUUEVSU09OX09OTFlfTEFZRVJgIC8gYFRISVJEUEVSU09OX09OTFlfTEFZRVJgXG4gICAqIGJ1dCB3ZSBhcmUgZ29pbmcgdG8gc3BlY2lmeSB0aGVzZSBsYXllcnMgYXQgaGVyZSBzaW5jZSB3ZSBhcmUgdW5hYmxlIHRvIG5hbWUgbGF5ZXJzIGluIFRocmVlLmpzLlxuICAgKlxuICAgKiBAcGFyYW0gY2FtZXJhTGF5ZXIgU3BlY2lmeSB3aGljaCBsYXllciB3aWxsIGJlIGZvciBgRmlyc3RQZXJzb25Pbmx5YCAvIGBUaGlyZFBlcnNvbk9ubHlgLlxuICAgKi9cbiAgcHVibGljIHNldHVwKHtcbiAgICBmaXJzdFBlcnNvbk9ubHlMYXllciA9IFZSTUZpcnN0UGVyc29uLkRFRkFVTFRfRklSU1RQRVJTT05fT05MWV9MQVlFUixcbiAgICB0aGlyZFBlcnNvbk9ubHlMYXllciA9IFZSTUZpcnN0UGVyc29uLkRFRkFVTFRfVEhJUkRQRVJTT05fT05MWV9MQVlFUixcbiAgfSA9IHt9KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2luaXRpYWxpemVkTGF5ZXJzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2ZpcnN0UGVyc29uT25seUxheWVyID0gZmlyc3RQZXJzb25Pbmx5TGF5ZXI7XG4gICAgdGhpcy5fdGhpcmRQZXJzb25Pbmx5TGF5ZXIgPSB0aGlyZFBlcnNvbk9ubHlMYXllcjtcblxuICAgIHRoaXMubWVzaEFubm90YXRpb25zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGl0ZW0ubWVzaGVzLmZvckVhY2goKG1lc2gpID0+IHtcbiAgICAgICAgaWYgKGl0ZW0udHlwZSA9PT0gJ2ZpcnN0UGVyc29uT25seScpIHtcbiAgICAgICAgICBtZXNoLmxheWVycy5zZXQodGhpcy5fZmlyc3RQZXJzb25Pbmx5TGF5ZXIpO1xuICAgICAgICAgIG1lc2gudHJhdmVyc2UoKGNoaWxkKSA9PiBjaGlsZC5sYXllcnMuc2V0KHRoaXMuX2ZpcnN0UGVyc29uT25seUxheWVyKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXRlbS50eXBlID09PSAndGhpcmRQZXJzb25Pbmx5Jykge1xuICAgICAgICAgIG1lc2gubGF5ZXJzLnNldCh0aGlzLl90aGlyZFBlcnNvbk9ubHlMYXllcik7XG4gICAgICAgICAgbWVzaC50cmF2ZXJzZSgoY2hpbGQpID0+IGNoaWxkLmxheWVycy5zZXQodGhpcy5fdGhpcmRQZXJzb25Pbmx5TGF5ZXIpKTtcbiAgICAgICAgfSBlbHNlIGlmIChpdGVtLnR5cGUgPT09ICdhdXRvJykge1xuICAgICAgICAgIHRoaXMuX2NyZWF0ZUhlYWRsZXNzTW9kZWwobWVzaCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5faW5pdGlhbGl6ZWRMYXllcnMgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfZXhjbHVkZVRyaWFuZ2xlcyh0cmlhbmdsZXM6IG51bWJlcltdLCBid3M6IG51bWJlcltdW10sIHNraW5JbmRleDogbnVtYmVyW11bXSwgZXhjbHVkZTogbnVtYmVyW10pOiBudW1iZXIge1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgaWYgKGJ3cyAhPSBudWxsICYmIGJ3cy5sZW5ndGggPiAwKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRyaWFuZ2xlcy5sZW5ndGg7IGkgKz0gMykge1xuICAgICAgICBjb25zdCBhID0gdHJpYW5nbGVzW2ldO1xuICAgICAgICBjb25zdCBiID0gdHJpYW5nbGVzW2kgKyAxXTtcbiAgICAgICAgY29uc3QgYyA9IHRyaWFuZ2xlc1tpICsgMl07XG4gICAgICAgIGNvbnN0IGJ3MCA9IGJ3c1thXTtcbiAgICAgICAgY29uc3Qgc2tpbjAgPSBza2luSW5kZXhbYV07XG5cbiAgICAgICAgaWYgKGJ3MFswXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMFswXSkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoYncwWzFdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4wWzFdKSkgY29udGludWU7XG4gICAgICAgIGlmIChidzBbMl0gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjBbMl0pKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJ3MFszXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMFszXSkpIGNvbnRpbnVlO1xuXG4gICAgICAgIGNvbnN0IGJ3MSA9IGJ3c1tiXTtcbiAgICAgICAgY29uc3Qgc2tpbjEgPSBza2luSW5kZXhbYl07XG4gICAgICAgIGlmIChidzFbMF0gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjFbMF0pKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJ3MVsxXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMVsxXSkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoYncxWzJdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4xWzJdKSkgY29udGludWU7XG4gICAgICAgIGlmIChidzFbM10gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjFbM10pKSBjb250aW51ZTtcblxuICAgICAgICBjb25zdCBidzIgPSBid3NbY107XG4gICAgICAgIGNvbnN0IHNraW4yID0gc2tpbkluZGV4W2NdO1xuICAgICAgICBpZiAoYncyWzBdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4yWzBdKSkgY29udGludWU7XG4gICAgICAgIGlmIChidzJbMV0gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjJbMV0pKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJ3MlsyXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMlsyXSkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoYncyWzNdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4yWzNdKSkgY29udGludWU7XG5cbiAgICAgICAgdHJpYW5nbGVzW2NvdW50KytdID0gYTtcbiAgICAgICAgdHJpYW5nbGVzW2NvdW50KytdID0gYjtcbiAgICAgICAgdHJpYW5nbGVzW2NvdW50KytdID0gYztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvdW50O1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlRXJhc2VkTWVzaChzcmM6IFRIUkVFLlNraW5uZWRNZXNoLCBlcmFzaW5nQm9uZXNJbmRleDogbnVtYmVyW10pOiBUSFJFRS5Ta2lubmVkTWVzaCB7XG4gICAgY29uc3QgZHN0ID0gbmV3IFRIUkVFLlNraW5uZWRNZXNoKHNyYy5nZW9tZXRyeS5jbG9uZSgpLCBzcmMubWF0ZXJpYWwpO1xuICAgIGRzdC5uYW1lID0gYCR7c3JjLm5hbWV9KGVyYXNlKWA7XG4gICAgZHN0LmZydXN0dW1DdWxsZWQgPSBzcmMuZnJ1c3R1bUN1bGxlZDtcbiAgICBkc3QubGF5ZXJzLnNldCh0aGlzLl9maXJzdFBlcnNvbk9ubHlMYXllcik7XG5cbiAgICBjb25zdCBnZW9tZXRyeSA9IGRzdC5nZW9tZXRyeTtcblxuICAgIGNvbnN0IHNraW5JbmRleEF0dHIgPSBnZW9tZXRyeS5nZXRBdHRyaWJ1dGUoJ3NraW5JbmRleCcpO1xuICAgIGNvbnN0IHNraW5JbmRleEF0dHJBcnJheSA9IHNraW5JbmRleEF0dHIgaW5zdGFuY2VvZiBUSFJFRS5HTEJ1ZmZlckF0dHJpYnV0ZSA/IFtdIDogc2tpbkluZGV4QXR0ci5hcnJheTtcbiAgICBjb25zdCBza2luSW5kZXggPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNraW5JbmRleEF0dHJBcnJheS5sZW5ndGg7IGkgKz0gNCkge1xuICAgICAgc2tpbkluZGV4LnB1c2goW1xuICAgICAgICBza2luSW5kZXhBdHRyQXJyYXlbaV0sXG4gICAgICAgIHNraW5JbmRleEF0dHJBcnJheVtpICsgMV0sXG4gICAgICAgIHNraW5JbmRleEF0dHJBcnJheVtpICsgMl0sXG4gICAgICAgIHNraW5JbmRleEF0dHJBcnJheVtpICsgM10sXG4gICAgICBdKTtcbiAgICB9XG5cbiAgICBjb25zdCBza2luV2VpZ2h0QXR0ciA9IGdlb21ldHJ5LmdldEF0dHJpYnV0ZSgnc2tpbldlaWdodCcpO1xuICAgIGNvbnN0IHNraW5XZWlnaHRBdHRyQXJyYXkgPSBza2luV2VpZ2h0QXR0ciBpbnN0YW5jZW9mIFRIUkVFLkdMQnVmZmVyQXR0cmlidXRlID8gW10gOiBza2luV2VpZ2h0QXR0ci5hcnJheTtcbiAgICBjb25zdCBza2luV2VpZ2h0ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBza2luV2VpZ2h0QXR0ckFycmF5Lmxlbmd0aDsgaSArPSA0KSB7XG4gICAgICBza2luV2VpZ2h0LnB1c2goW1xuICAgICAgICBza2luV2VpZ2h0QXR0ckFycmF5W2ldLFxuICAgICAgICBza2luV2VpZ2h0QXR0ckFycmF5W2kgKyAxXSxcbiAgICAgICAgc2tpbldlaWdodEF0dHJBcnJheVtpICsgMl0sXG4gICAgICAgIHNraW5XZWlnaHRBdHRyQXJyYXlbaSArIDNdLFxuICAgICAgXSk7XG4gICAgfVxuXG4gICAgY29uc3QgaW5kZXggPSBnZW9tZXRyeS5nZXRJbmRleCgpO1xuICAgIGlmICghaW5kZXgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBnZW9tZXRyeSBkb2Vzbid0IGhhdmUgYW4gaW5kZXggYnVmZmVyXCIpO1xuICAgIH1cbiAgICBjb25zdCBvbGRUcmlhbmdsZXMgPSBBcnJheS5mcm9tKGluZGV4LmFycmF5KTtcblxuICAgIGNvbnN0IGNvdW50ID0gdGhpcy5fZXhjbHVkZVRyaWFuZ2xlcyhvbGRUcmlhbmdsZXMsIHNraW5XZWlnaHQsIHNraW5JbmRleCwgZXJhc2luZ0JvbmVzSW5kZXgpO1xuICAgIGNvbnN0IG5ld1RyaWFuZ2xlOiBudW1iZXJbXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgbmV3VHJpYW5nbGVbaV0gPSBvbGRUcmlhbmdsZXNbaV07XG4gICAgfVxuICAgIGdlb21ldHJ5LnNldEluZGV4KG5ld1RyaWFuZ2xlKTtcblxuICAgIC8vIG10b29uIG1hdGVyaWFsIGluY2x1ZGVzIG9uQmVmb3JlUmVuZGVyLiB0aGlzIGlzIHVuc3VwcG9ydGVkIGF0IFNraW5uZWRNZXNoI2Nsb25lXG4gICAgaWYgKHNyYy5vbkJlZm9yZVJlbmRlcikge1xuICAgICAgZHN0Lm9uQmVmb3JlUmVuZGVyID0gc3JjLm9uQmVmb3JlUmVuZGVyO1xuICAgIH1cbiAgICBkc3QuYmluZChuZXcgVEhSRUUuU2tlbGV0b24oc3JjLnNrZWxldG9uLmJvbmVzLCBzcmMuc2tlbGV0b24uYm9uZUludmVyc2VzKSwgbmV3IFRIUkVFLk1hdHJpeDQoKSk7XG4gICAgcmV0dXJuIGRzdDtcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZUhlYWRsZXNzTW9kZWxGb3JTa2lubmVkTWVzaChwYXJlbnQ6IFRIUkVFLk9iamVjdDNELCBtZXNoOiBUSFJFRS5Ta2lubmVkTWVzaCk6IHZvaWQge1xuICAgIGNvbnN0IGVyYXNlQm9uZUluZGV4ZXM6IG51bWJlcltdID0gW107XG4gICAgbWVzaC5za2VsZXRvbi5ib25lcy5mb3JFYWNoKChib25lLCBpbmRleCkgPT4ge1xuICAgICAgaWYgKHRoaXMuX2lzRXJhc2VUYXJnZXQoYm9uZSkpIGVyYXNlQm9uZUluZGV4ZXMucHVzaChpbmRleCk7XG4gICAgfSk7XG5cbiAgICAvLyBVbmxpa2UgVW5pVlJNIHdlIGRvbid0IGNvcHkgbWVzaCBpZiBubyBpbnZpc2libGUgYm9uZSB3YXMgZm91bmRcbiAgICBpZiAoIWVyYXNlQm9uZUluZGV4ZXMubGVuZ3RoKSB7XG4gICAgICBtZXNoLmxheWVycy5lbmFibGUodGhpcy5fdGhpcmRQZXJzb25Pbmx5TGF5ZXIpO1xuICAgICAgbWVzaC5sYXllcnMuZW5hYmxlKHRoaXMuX2ZpcnN0UGVyc29uT25seUxheWVyKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbWVzaC5sYXllcnMuc2V0KHRoaXMuX3RoaXJkUGVyc29uT25seUxheWVyKTtcbiAgICBjb25zdCBuZXdNZXNoID0gdGhpcy5fY3JlYXRlRXJhc2VkTWVzaChtZXNoLCBlcmFzZUJvbmVJbmRleGVzKTtcbiAgICBwYXJlbnQuYWRkKG5ld01lc2gpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlSGVhZGxlc3NNb2RlbChub2RlOiBUSFJFRS5PYmplY3QzRCk6IHZvaWQge1xuICAgIGlmIChub2RlLnR5cGUgPT09ICdHcm91cCcpIHtcbiAgICAgIG5vZGUubGF5ZXJzLnNldCh0aGlzLl90aGlyZFBlcnNvbk9ubHlMYXllcik7XG4gICAgICBpZiAodGhpcy5faXNFcmFzZVRhcmdldChub2RlKSkge1xuICAgICAgICBub2RlLnRyYXZlcnNlKChjaGlsZCkgPT4gY2hpbGQubGF5ZXJzLnNldCh0aGlzLl90aGlyZFBlcnNvbk9ubHlMYXllcikpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcGFyZW50ID0gbmV3IFRIUkVFLkdyb3VwKCk7XG4gICAgICAgIHBhcmVudC5uYW1lID0gYF9oZWFkbGVzc18ke25vZGUubmFtZX1gO1xuICAgICAgICBwYXJlbnQubGF5ZXJzLnNldCh0aGlzLl9maXJzdFBlcnNvbk9ubHlMYXllcik7XG4gICAgICAgIG5vZGUucGFyZW50IS5hZGQocGFyZW50KTtcbiAgICAgICAgbm9kZS5jaGlsZHJlblxuICAgICAgICAgIC5maWx0ZXIoKGNoaWxkKSA9PiBjaGlsZC50eXBlID09PSAnU2tpbm5lZE1lc2gnKVxuICAgICAgICAgIC5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2tpbm5lZE1lc2ggPSBjaGlsZCBhcyBUSFJFRS5Ta2lubmVkTWVzaDtcbiAgICAgICAgICAgIHRoaXMuX2NyZWF0ZUhlYWRsZXNzTW9kZWxGb3JTa2lubmVkTWVzaChwYXJlbnQsIHNraW5uZWRNZXNoKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG5vZGUudHlwZSA9PT0gJ1NraW5uZWRNZXNoJykge1xuICAgICAgY29uc3Qgc2tpbm5lZE1lc2ggPSBub2RlIGFzIFRIUkVFLlNraW5uZWRNZXNoO1xuICAgICAgdGhpcy5fY3JlYXRlSGVhZGxlc3NNb2RlbEZvclNraW5uZWRNZXNoKG5vZGUucGFyZW50ISwgc2tpbm5lZE1lc2gpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5faXNFcmFzZVRhcmdldChub2RlKSkge1xuICAgICAgICBub2RlLmxheWVycy5zZXQodGhpcy5fdGhpcmRQZXJzb25Pbmx5TGF5ZXIpO1xuICAgICAgICBub2RlLnRyYXZlcnNlKChjaGlsZCkgPT4gY2hpbGQubGF5ZXJzLnNldCh0aGlzLl90aGlyZFBlcnNvbk9ubHlMYXllcikpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2lzRXJhc2VUYXJnZXQoYm9uZTogVEhSRUUuT2JqZWN0M0QpOiBib29sZWFuIHtcbiAgICBpZiAoYm9uZSA9PT0gdGhpcy5odW1hbm9pZC5nZXRSYXdCb25lTm9kZSgnaGVhZCcpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKCFib25lLnBhcmVudCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5faXNFcmFzZVRhcmdldChib25lLnBhcmVudCk7XG4gICAgfVxuICB9XG59XG4iLCAiaW1wb3J0IHR5cGUgKiBhcyBWMFZSTSBmcm9tICdAcGl4aXYvdHlwZXMtdnJtLTAuMCc7XG5pbXBvcnQgdHlwZSAqIGFzIFYxVlJNU2NoZW1hIGZyb20gJ0BwaXhpdi90eXBlcy12cm1jLXZybS0xLjAnO1xuaW1wb3J0IHR5cGUgeyBHTFRGLCBHTFRGTG9hZGVyUGx1Z2luLCBHTFRGUGFyc2VyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlci5qcyc7XG5pbXBvcnQgdHlwZSB7IFZSTUh1bWFub2lkIH0gZnJvbSAnLi4vaHVtYW5vaWQvVlJNSHVtYW5vaWQnO1xuaW1wb3J0IHsgZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGVzIH0gZnJvbSAnLi4vdXRpbHMvZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGUnO1xuaW1wb3J0IHsgVlJNRmlyc3RQZXJzb24gfSBmcm9tICcuL1ZSTUZpcnN0UGVyc29uJztcbmltcG9ydCB0eXBlIHsgVlJNRmlyc3RQZXJzb25NZXNoQW5ub3RhdGlvbiB9IGZyb20gJy4vVlJNRmlyc3RQZXJzb25NZXNoQW5ub3RhdGlvbic7XG5pbXBvcnQgdHlwZSB7IFZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb25UeXBlIH0gZnJvbSAnLi9WUk1GaXJzdFBlcnNvbk1lc2hBbm5vdGF0aW9uVHlwZSc7XG5pbXBvcnQgeyBHTFRGIGFzIEdMVEZTY2hlbWEgfSBmcm9tICdAZ2x0Zi10cmFuc2Zvcm0vY29yZSc7XG5cbi8qKlxuICogUG9zc2libGUgc3BlYyB2ZXJzaW9ucyBpdCByZWNvZ25pemVzLlxuICovXG5jb25zdCBQT1NTSUJMRV9TUEVDX1ZFUlNJT05TID0gbmV3IFNldChbJzEuMCcsICcxLjAtYmV0YSddKTtcblxuLyoqXG4gKiBBIHBsdWdpbiBvZiBHTFRGTG9hZGVyIHRoYXQgaW1wb3J0cyBhIHtAbGluayBWUk1GaXJzdFBlcnNvbn0gZnJvbSBhIFZSTSBleHRlbnNpb24gb2YgYSBHTFRGLlxuICovXG5leHBvcnQgY2xhc3MgVlJNRmlyc3RQZXJzb25Mb2FkZXJQbHVnaW4gaW1wbGVtZW50cyBHTFRGTG9hZGVyUGx1Z2luIHtcbiAgcHVibGljIHJlYWRvbmx5IHBhcnNlcjogR0xURlBhcnNlcjtcblxuICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICAvLyBXZSBzaG91bGQgdXNlIHRoZSBleHRlbnNpb24gbmFtZSBpbnN0ZWFkIGJ1dCB3ZSBoYXZlIG11bHRpcGxlIHBsdWdpbnMgZm9yIGFuIGV4dGVuc2lvbi4uLlxuICAgIHJldHVybiAnVlJNRmlyc3RQZXJzb25Mb2FkZXJQbHVnaW4nO1xuICB9XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBhcnNlcjogR0xURlBhcnNlcikge1xuICAgIHRoaXMucGFyc2VyID0gcGFyc2VyO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGFmdGVyUm9vdChnbHRmOiBHTFRGKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgdnJtSHVtYW5vaWQgPSBnbHRmLnVzZXJEYXRhLnZybUh1bWFub2lkIGFzIFZSTUh1bWFub2lkIHwgdW5kZWZpbmVkO1xuXG4gICAgLy8gZXhwbGljaXRseSBkaXN0aW5ndWlzaCBudWxsIGFuZCB1bmRlZmluZWRcbiAgICAvLyBzaW5jZSB2cm1IdW1hbm9pZCBtaWdodCBiZSBudWxsIGFzIGEgcmVzdWx0XG4gICAgaWYgKHZybUh1bWFub2lkID09PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIGlmICh2cm1IdW1hbm9pZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdWUk1GaXJzdFBlcnNvbkxvYWRlclBsdWdpbjogdnJtSHVtYW5vaWQgaXMgdW5kZWZpbmVkLiBWUk1IdW1hbm9pZExvYWRlclBsdWdpbiBoYXZlIHRvIGJlIHVzZWQgZmlyc3QnLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBnbHRmLnVzZXJEYXRhLnZybUZpcnN0UGVyc29uID0gYXdhaXQgdGhpcy5faW1wb3J0KGdsdGYsIHZybUh1bWFub2lkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbXBvcnQgYSB7QGxpbmsgVlJNRmlyc3RQZXJzb259IGZyb20gYSBWUk0uXG4gICAqXG4gICAqIEBwYXJhbSBnbHRmIEEgcGFyc2VkIHJlc3VsdCBvZiBHTFRGIHRha2VuIGZyb20gR0xURkxvYWRlclxuICAgKiBAcGFyYW0gaHVtYW5vaWQgQSB7QGxpbmsgVlJNSHVtYW5vaWR9IGluc3RhbmNlIHRoYXQgcmVwcmVzZW50cyB0aGUgVlJNXG4gICAqL1xuXG4gIHByaXZhdGUgYXN5bmMgX2ltcG9ydChnbHRmOiBHTFRGLCBodW1hbm9pZDogVlJNSHVtYW5vaWQgfCBudWxsKTogUHJvbWlzZTxWUk1GaXJzdFBlcnNvbiB8IG51bGw+IHtcbiAgICBpZiAoaHVtYW5vaWQgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgdjFSZXN1bHQgPSBhd2FpdCB0aGlzLl92MUltcG9ydChnbHRmLCBodW1hbm9pZCk7XG4gICAgaWYgKHYxUmVzdWx0KSB7XG4gICAgICByZXR1cm4gdjFSZXN1bHQ7XG4gICAgfVxuXG4gICAgY29uc3QgdjBSZXN1bHQgPSBhd2FpdCB0aGlzLl92MEltcG9ydChnbHRmLCBodW1hbm9pZCk7XG4gICAgaWYgKHYwUmVzdWx0KSB7XG4gICAgICByZXR1cm4gdjBSZXN1bHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF92MUltcG9ydChnbHRmOiBHTFRGLCBodW1hbm9pZDogVlJNSHVtYW5vaWQpOiBQcm9taXNlPFZSTUZpcnN0UGVyc29uIHwgbnVsbD4ge1xuICAgIGNvbnN0IGpzb24gPSB0aGlzLnBhcnNlci5qc29uIGFzIEdMVEZTY2hlbWEuSUdMVEY7XG5cbiAgICAvLyBlYXJseSBhYm9ydCBpZiBpdCBkb2Vzbid0IHVzZSB2cm1cbiAgICBjb25zdCBpc1ZSTVVzZWQgPSBqc29uLmV4dGVuc2lvbnNVc2VkPy5pbmRleE9mKCdWUk1DX3ZybScpICE9PSAtMTtcbiAgICBpZiAoIWlzVlJNVXNlZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgZXh0ZW5zaW9uID0ganNvbi5leHRlbnNpb25zPy5bJ1ZSTUNfdnJtJ10gYXMgVjFWUk1TY2hlbWEuVlJNQ1ZSTSB8IHVuZGVmaW5lZDtcbiAgICBpZiAoIWV4dGVuc2lvbikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc3BlY1ZlcnNpb24gPSBleHRlbnNpb24uc3BlY1ZlcnNpb247XG4gICAgaWYgKCFQT1NTSUJMRV9TUEVDX1ZFUlNJT05TLmhhcyhzcGVjVmVyc2lvbikpIHtcbiAgICAgIGNvbnNvbGUud2FybihgVlJNRmlyc3RQZXJzb25Mb2FkZXJQbHVnaW46IFVua25vd24gVlJNQ192cm0gc3BlY1ZlcnNpb24gXCIke3NwZWNWZXJzaW9ufVwiYCk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzY2hlbWFGaXJzdFBlcnNvbiA9IGV4dGVuc2lvbi5maXJzdFBlcnNvbjtcblxuICAgIGNvbnN0IG1lc2hBbm5vdGF0aW9uczogVlJNRmlyc3RQZXJzb25NZXNoQW5ub3RhdGlvbltdID0gW107XG4gICAgY29uc3Qgbm9kZVByaW1pdGl2ZXNNYXAgPSBhd2FpdCBnbHRmRXh0cmFjdFByaW1pdGl2ZXNGcm9tTm9kZXMoZ2x0Zik7XG4gICAgQXJyYXkuZnJvbShub2RlUHJpbWl0aXZlc01hcC5lbnRyaWVzKCkpLmZvckVhY2goKFtub2RlSW5kZXgsIHByaW1pdGl2ZXNdKSA9PiB7XG4gICAgICBjb25zdCBhbm5vdGF0aW9uID0gc2NoZW1hRmlyc3RQZXJzb24/Lm1lc2hBbm5vdGF0aW9ucz8uZmluZCgoYSkgPT4gYS5ub2RlID09PSBub2RlSW5kZXgpO1xuXG4gICAgICBtZXNoQW5ub3RhdGlvbnMucHVzaCh7XG4gICAgICAgIG1lc2hlczogcHJpbWl0aXZlcyxcbiAgICAgICAgdHlwZTogYW5ub3RhdGlvbj8udHlwZSA/PyAnYXV0bycsXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHJldHVybiBuZXcgVlJNRmlyc3RQZXJzb24oaHVtYW5vaWQsIG1lc2hBbm5vdGF0aW9ucyk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF92MEltcG9ydChnbHRmOiBHTFRGLCBodW1hbm9pZDogVlJNSHVtYW5vaWQpOiBQcm9taXNlPFZSTUZpcnN0UGVyc29uIHwgbnVsbD4ge1xuICAgIGNvbnN0IGpzb24gPSB0aGlzLnBhcnNlci5qc29uIGFzIEdMVEZTY2hlbWEuSUdMVEY7XG5cbiAgICBjb25zdCB2cm1FeHQgPSBqc29uLmV4dGVuc2lvbnM/LlZSTSBhcyBWMFZSTS5WUk0gfCB1bmRlZmluZWQ7XG4gICAgaWYgKCF2cm1FeHQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNjaGVtYUZpcnN0UGVyc29uOiBWMFZSTS5GaXJzdFBlcnNvbiB8IHVuZGVmaW5lZCA9IHZybUV4dC5maXJzdFBlcnNvbjtcbiAgICBpZiAoIXNjaGVtYUZpcnN0UGVyc29uKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBtZXNoQW5ub3RhdGlvbnM6IFZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb25bXSA9IFtdO1xuICAgIGNvbnN0IG5vZGVQcmltaXRpdmVzTWFwID0gYXdhaXQgZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGVzKGdsdGYpO1xuXG4gICAgQXJyYXkuZnJvbShub2RlUHJpbWl0aXZlc01hcC5lbnRyaWVzKCkpLmZvckVhY2goKFtub2RlSW5kZXgsIHByaW1pdGl2ZXNdKSA9PiB7XG4gICAgICBjb25zdCBzY2hlbWFOb2RlID0ganNvbi5ub2RlcyFbbm9kZUluZGV4XTtcblxuICAgICAgY29uc3QgZmxhZyA9IHNjaGVtYUZpcnN0UGVyc29uLm1lc2hBbm5vdGF0aW9uc1xuICAgICAgICA/IHNjaGVtYUZpcnN0UGVyc29uLm1lc2hBbm5vdGF0aW9ucy5maW5kKChhKSA9PiBhLm1lc2ggPT09IHNjaGVtYU5vZGUubWVzaClcbiAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICAgIG1lc2hBbm5vdGF0aW9ucy5wdXNoKHtcbiAgICAgICAgbWVzaGVzOiBwcmltaXRpdmVzLFxuICAgICAgICB0eXBlOiB0aGlzLl9jb252ZXJ0VjBGbGFnVG9WMVR5cGUoZmxhZz8uZmlyc3RQZXJzb25GbGFnKSxcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5ldyBWUk1GaXJzdFBlcnNvbihodW1hbm9pZCwgbWVzaEFubm90YXRpb25zKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbnZlcnRWMEZsYWdUb1YxVHlwZShmbGFnOiBzdHJpbmcgfCB1bmRlZmluZWQpOiBWUk1GaXJzdFBlcnNvbk1lc2hBbm5vdGF0aW9uVHlwZSB7XG4gICAgaWYgKGZsYWcgPT09ICdGaXJzdFBlcnNvbk9ubHknKSB7XG4gICAgICByZXR1cm4gJ2ZpcnN0UGVyc29uT25seSc7XG4gICAgfSBlbHNlIGlmIChmbGFnID09PSAnVGhpcmRQZXJzb25Pbmx5Jykge1xuICAgICAgcmV0dXJuICd0aGlyZFBlcnNvbk9ubHknO1xuICAgIH0gZWxzZSBpZiAoZmxhZyA9PT0gJ0JvdGgnKSB7XG4gICAgICByZXR1cm4gJ2JvdGgnO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBUaGUgZGVmYXVsdCB2YWx1ZSBpcyAnQXV0bycgZXZlbiBpbiBWUk0wXG4gICAgICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS92cm0tYy9VbmlWUk0vYmxvYi8wN2Q5OGUyZjFhYmM1MjhkMzg3Zjg2MGQyMjI0ZDA4NTViMGQwYjU5L0Fzc2V0cy9WUk0vUnVudGltZS9GaXJzdFBlcnNvbi9WUk1GaXJzdFBlcnNvbi5jcyNMMTE3LUwxMTlcbiAgICAgIHJldHVybiAnYXV0byc7XG4gICAgfVxuICB9XG59XG4iLCAiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uICovXG5cbmV4cG9ydCBjb25zdCBWUk1GaXJzdFBlcnNvbk1lc2hBbm5vdGF0aW9uVHlwZSA9IHtcbiAgQXV0bzogJ2F1dG8nLFxuICBCb3RoOiAnYm90aCcsXG4gIFRoaXJkUGVyc29uT25seTogJ3RoaXJkUGVyc29uT25seScsXG4gIEZpcnN0UGVyc29uT25seTogJ2ZpcnN0UGVyc29uT25seScsXG59IGFzIGNvbnN0O1xuXG5leHBvcnQgdHlwZSBWUk1GaXJzdFBlcnNvbk1lc2hBbm5vdGF0aW9uVHlwZSA9XG4gICh0eXBlb2YgVlJNRmlyc3RQZXJzb25NZXNoQW5ub3RhdGlvblR5cGUpW2tleW9mIHR5cGVvZiBWUk1GaXJzdFBlcnNvbk1lc2hBbm5vdGF0aW9uVHlwZV07XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNSHVtYW5Cb25lIH0gZnJvbSAnLi4vVlJNSHVtYW5Cb25lJztcbmltcG9ydCB7IFZSTUh1bWFub2lkIH0gZnJvbSAnLi4vVlJNSHVtYW5vaWQnO1xuXG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF92M0IgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3F1YXRBID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblxuZXhwb3J0IGNsYXNzIFZSTUh1bWFub2lkSGVscGVyIGV4dGVuZHMgVEhSRUUuR3JvdXAge1xuICBwdWJsaWMgcmVhZG9ubHkgdnJtSHVtYW5vaWQ6IFZSTUh1bWFub2lkO1xuICBwcml2YXRlIF9ib25lQXhlc01hcDogTWFwPFZSTUh1bWFuQm9uZSwgVEhSRUUuQXhlc0hlbHBlcj47XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGh1bWFub2lkOiBWUk1IdW1hbm9pZCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnZybUh1bWFub2lkID0gaHVtYW5vaWQ7XG5cbiAgICB0aGlzLl9ib25lQXhlc01hcCA9IG5ldyBNYXAoKTtcblxuICAgIE9iamVjdC52YWx1ZXMoaHVtYW5vaWQuaHVtYW5Cb25lcykuZm9yRWFjaCgoYm9uZSkgPT4ge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IFRIUkVFLkF4ZXNIZWxwZXIoMS4wKTtcblxuICAgICAgaGVscGVyLm1hdHJpeEF1dG9VcGRhdGUgPSBmYWxzZTtcblxuICAgICAgKGhlbHBlci5tYXRlcmlhbCBhcyBUSFJFRS5NYXRlcmlhbCkuZGVwdGhUZXN0ID0gZmFsc2U7XG4gICAgICAoaGVscGVyLm1hdGVyaWFsIGFzIFRIUkVFLk1hdGVyaWFsKS5kZXB0aFdyaXRlID0gZmFsc2U7XG5cbiAgICAgIHRoaXMuYWRkKGhlbHBlcik7XG5cbiAgICAgIHRoaXMuX2JvbmVBeGVzTWFwLnNldChib25lLCBoZWxwZXIpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgQXJyYXkuZnJvbSh0aGlzLl9ib25lQXhlc01hcC52YWx1ZXMoKSkuZm9yRWFjaCgoYXhlcykgPT4ge1xuICAgICAgYXhlcy5nZW9tZXRyeS5kaXNwb3NlKCk7XG4gICAgICAoYXhlcy5tYXRlcmlhbCBhcyBUSFJFRS5NYXRlcmlhbCkuZGlzcG9zZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZU1hdHJpeFdvcmxkKGZvcmNlOiBib29sZWFuKTogdm9pZCB7XG4gICAgQXJyYXkuZnJvbSh0aGlzLl9ib25lQXhlc01hcC5lbnRyaWVzKCkpLmZvckVhY2goKFtib25lLCBheGVzXSkgPT4ge1xuICAgICAgYm9uZS5ub2RlLnVwZGF0ZVdvcmxkTWF0cml4KHRydWUsIGZhbHNlKTtcblxuICAgICAgYm9uZS5ub2RlLm1hdHJpeFdvcmxkLmRlY29tcG9zZShfdjNBLCBfcXVhdEEsIF92M0IpO1xuXG4gICAgICBjb25zdCBzY2FsZSA9IF92M0Euc2V0KDAuMSwgMC4xLCAwLjEpLmRpdmlkZShfdjNCKTtcbiAgICAgIGF4ZXMubWF0cml4LmNvcHkoYm9uZS5ub2RlLm1hdHJpeFdvcmxkKS5zY2FsZShzY2FsZSk7XG4gICAgfSk7XG5cbiAgICBzdXBlci51cGRhdGVNYXRyaXhXb3JsZChmb3JjZSk7XG4gIH1cbn1cbiIsICIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cblxuaW1wb3J0IHsgVlJNSHVtYW5Cb25lTmFtZSB9IGZyb20gJy4vVlJNSHVtYW5Cb25lTmFtZSc7XG5cbi8qKlxuICogVGhlIGxpc3Qgb2Yge0BsaW5rIFZSTUh1bWFuQm9uZU5hbWV9LiBEZXBlbmRlbmN5IGF3YXJlLlxuICovXG5leHBvcnQgY29uc3QgVlJNSHVtYW5Cb25lTGlzdDogVlJNSHVtYW5Cb25lTmFtZVtdID0gW1xuICAnaGlwcycsXG4gICdzcGluZScsXG4gICdjaGVzdCcsXG4gICd1cHBlckNoZXN0JyxcbiAgJ25lY2snLFxuXG4gICdoZWFkJyxcbiAgJ2xlZnRFeWUnLFxuICAncmlnaHRFeWUnLFxuICAnamF3JyxcblxuICAnbGVmdFVwcGVyTGVnJyxcbiAgJ2xlZnRMb3dlckxlZycsXG4gICdsZWZ0Rm9vdCcsXG4gICdsZWZ0VG9lcycsXG5cbiAgJ3JpZ2h0VXBwZXJMZWcnLFxuICAncmlnaHRMb3dlckxlZycsXG4gICdyaWdodEZvb3QnLFxuICAncmlnaHRUb2VzJyxcblxuICAnbGVmdFNob3VsZGVyJyxcbiAgJ2xlZnRVcHBlckFybScsXG4gICdsZWZ0TG93ZXJBcm0nLFxuICAnbGVmdEhhbmQnLFxuXG4gICdyaWdodFNob3VsZGVyJyxcbiAgJ3JpZ2h0VXBwZXJBcm0nLFxuICAncmlnaHRMb3dlckFybScsXG4gICdyaWdodEhhbmQnLFxuXG4gICdsZWZ0VGh1bWJNZXRhY2FycGFsJyxcbiAgJ2xlZnRUaHVtYlByb3hpbWFsJyxcbiAgJ2xlZnRUaHVtYkRpc3RhbCcsXG4gICdsZWZ0SW5kZXhQcm94aW1hbCcsXG4gICdsZWZ0SW5kZXhJbnRlcm1lZGlhdGUnLFxuICAnbGVmdEluZGV4RGlzdGFsJyxcbiAgJ2xlZnRNaWRkbGVQcm94aW1hbCcsXG4gICdsZWZ0TWlkZGxlSW50ZXJtZWRpYXRlJyxcbiAgJ2xlZnRNaWRkbGVEaXN0YWwnLFxuICAnbGVmdFJpbmdQcm94aW1hbCcsXG4gICdsZWZ0UmluZ0ludGVybWVkaWF0ZScsXG4gICdsZWZ0UmluZ0Rpc3RhbCcsXG4gICdsZWZ0TGl0dGxlUHJveGltYWwnLFxuICAnbGVmdExpdHRsZUludGVybWVkaWF0ZScsXG4gICdsZWZ0TGl0dGxlRGlzdGFsJyxcblxuICAncmlnaHRUaHVtYk1ldGFjYXJwYWwnLFxuICAncmlnaHRUaHVtYlByb3hpbWFsJyxcbiAgJ3JpZ2h0VGh1bWJEaXN0YWwnLFxuICAncmlnaHRJbmRleFByb3hpbWFsJyxcbiAgJ3JpZ2h0SW5kZXhJbnRlcm1lZGlhdGUnLFxuICAncmlnaHRJbmRleERpc3RhbCcsXG4gICdyaWdodE1pZGRsZVByb3hpbWFsJyxcbiAgJ3JpZ2h0TWlkZGxlSW50ZXJtZWRpYXRlJyxcbiAgJ3JpZ2h0TWlkZGxlRGlzdGFsJyxcbiAgJ3JpZ2h0UmluZ1Byb3hpbWFsJyxcbiAgJ3JpZ2h0UmluZ0ludGVybWVkaWF0ZScsXG4gICdyaWdodFJpbmdEaXN0YWwnLFxuICAncmlnaHRMaXR0bGVQcm94aW1hbCcsXG4gICdyaWdodExpdHRsZUludGVybWVkaWF0ZScsXG4gICdyaWdodExpdHRsZURpc3RhbCcsXG5dO1xuIiwgIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiAqL1xuXG4vKipcbiAqIFRoZSBuYW1lcyBvZiB7QGxpbmsgVlJNSHVtYW5vaWR9IGJvbmUgbmFtZXMuXG4gKlxuICogUmVmOiBodHRwczovL2dpdGh1Yi5jb20vdnJtLWMvdnJtLXNwZWNpZmljYXRpb24vYmxvYi9tYXN0ZXIvc3BlY2lmaWNhdGlvbi9WUk1DX3ZybS0xLjAvaHVtYW5vaWQubWRcbiAqL1xuZXhwb3J0IGNvbnN0IFZSTUh1bWFuQm9uZU5hbWUgPSB7XG4gIEhpcHM6ICdoaXBzJyxcbiAgU3BpbmU6ICdzcGluZScsXG4gIENoZXN0OiAnY2hlc3QnLFxuICBVcHBlckNoZXN0OiAndXBwZXJDaGVzdCcsXG4gIE5lY2s6ICduZWNrJyxcblxuICBIZWFkOiAnaGVhZCcsXG4gIExlZnRFeWU6ICdsZWZ0RXllJyxcbiAgUmlnaHRFeWU6ICdyaWdodEV5ZScsXG4gIEphdzogJ2phdycsXG5cbiAgTGVmdFVwcGVyTGVnOiAnbGVmdFVwcGVyTGVnJyxcbiAgTGVmdExvd2VyTGVnOiAnbGVmdExvd2VyTGVnJyxcbiAgTGVmdEZvb3Q6ICdsZWZ0Rm9vdCcsXG4gIExlZnRUb2VzOiAnbGVmdFRvZXMnLFxuXG4gIFJpZ2h0VXBwZXJMZWc6ICdyaWdodFVwcGVyTGVnJyxcbiAgUmlnaHRMb3dlckxlZzogJ3JpZ2h0TG93ZXJMZWcnLFxuICBSaWdodEZvb3Q6ICdyaWdodEZvb3QnLFxuICBSaWdodFRvZXM6ICdyaWdodFRvZXMnLFxuXG4gIExlZnRTaG91bGRlcjogJ2xlZnRTaG91bGRlcicsXG4gIExlZnRVcHBlckFybTogJ2xlZnRVcHBlckFybScsXG4gIExlZnRMb3dlckFybTogJ2xlZnRMb3dlckFybScsXG4gIExlZnRIYW5kOiAnbGVmdEhhbmQnLFxuXG4gIFJpZ2h0U2hvdWxkZXI6ICdyaWdodFNob3VsZGVyJyxcbiAgUmlnaHRVcHBlckFybTogJ3JpZ2h0VXBwZXJBcm0nLFxuICBSaWdodExvd2VyQXJtOiAncmlnaHRMb3dlckFybScsXG4gIFJpZ2h0SGFuZDogJ3JpZ2h0SGFuZCcsXG5cbiAgTGVmdFRodW1iTWV0YWNhcnBhbDogJ2xlZnRUaHVtYk1ldGFjYXJwYWwnLFxuICBMZWZ0VGh1bWJQcm94aW1hbDogJ2xlZnRUaHVtYlByb3hpbWFsJyxcbiAgTGVmdFRodW1iRGlzdGFsOiAnbGVmdFRodW1iRGlzdGFsJyxcbiAgTGVmdEluZGV4UHJveGltYWw6ICdsZWZ0SW5kZXhQcm94aW1hbCcsXG4gIExlZnRJbmRleEludGVybWVkaWF0ZTogJ2xlZnRJbmRleEludGVybWVkaWF0ZScsXG4gIExlZnRJbmRleERpc3RhbDogJ2xlZnRJbmRleERpc3RhbCcsXG4gIExlZnRNaWRkbGVQcm94aW1hbDogJ2xlZnRNaWRkbGVQcm94aW1hbCcsXG4gIExlZnRNaWRkbGVJbnRlcm1lZGlhdGU6ICdsZWZ0TWlkZGxlSW50ZXJtZWRpYXRlJyxcbiAgTGVmdE1pZGRsZURpc3RhbDogJ2xlZnRNaWRkbGVEaXN0YWwnLFxuICBMZWZ0UmluZ1Byb3hpbWFsOiAnbGVmdFJpbmdQcm94aW1hbCcsXG4gIExlZnRSaW5nSW50ZXJtZWRpYXRlOiAnbGVmdFJpbmdJbnRlcm1lZGlhdGUnLFxuICBMZWZ0UmluZ0Rpc3RhbDogJ2xlZnRSaW5nRGlzdGFsJyxcbiAgTGVmdExpdHRsZVByb3hpbWFsOiAnbGVmdExpdHRsZVByb3hpbWFsJyxcbiAgTGVmdExpdHRsZUludGVybWVkaWF0ZTogJ2xlZnRMaXR0bGVJbnRlcm1lZGlhdGUnLFxuICBMZWZ0TGl0dGxlRGlzdGFsOiAnbGVmdExpdHRsZURpc3RhbCcsXG5cbiAgUmlnaHRUaHVtYk1ldGFjYXJwYWw6ICdyaWdodFRodW1iTWV0YWNhcnBhbCcsXG4gIFJpZ2h0VGh1bWJQcm94aW1hbDogJ3JpZ2h0VGh1bWJQcm94aW1hbCcsXG4gIFJpZ2h0VGh1bWJEaXN0YWw6ICdyaWdodFRodW1iRGlzdGFsJyxcbiAgUmlnaHRJbmRleFByb3hpbWFsOiAncmlnaHRJbmRleFByb3hpbWFsJyxcbiAgUmlnaHRJbmRleEludGVybWVkaWF0ZTogJ3JpZ2h0SW5kZXhJbnRlcm1lZGlhdGUnLFxuICBSaWdodEluZGV4RGlzdGFsOiAncmlnaHRJbmRleERpc3RhbCcsXG4gIFJpZ2h0TWlkZGxlUHJveGltYWw6ICdyaWdodE1pZGRsZVByb3hpbWFsJyxcbiAgUmlnaHRNaWRkbGVJbnRlcm1lZGlhdGU6ICdyaWdodE1pZGRsZUludGVybWVkaWF0ZScsXG4gIFJpZ2h0TWlkZGxlRGlzdGFsOiAncmlnaHRNaWRkbGVEaXN0YWwnLFxuICBSaWdodFJpbmdQcm94aW1hbDogJ3JpZ2h0UmluZ1Byb3hpbWFsJyxcbiAgUmlnaHRSaW5nSW50ZXJtZWRpYXRlOiAncmlnaHRSaW5nSW50ZXJtZWRpYXRlJyxcbiAgUmlnaHRSaW5nRGlzdGFsOiAncmlnaHRSaW5nRGlzdGFsJyxcbiAgUmlnaHRMaXR0bGVQcm94aW1hbDogJ3JpZ2h0TGl0dGxlUHJveGltYWwnLFxuICBSaWdodExpdHRsZUludGVybWVkaWF0ZTogJ3JpZ2h0TGl0dGxlSW50ZXJtZWRpYXRlJyxcbiAgUmlnaHRMaXR0bGVEaXN0YWw6ICdyaWdodExpdHRsZURpc3RhbCcsXG59IGFzIGNvbnN0O1xuXG5leHBvcnQgdHlwZSBWUk1IdW1hbkJvbmVOYW1lID0gKHR5cGVvZiBWUk1IdW1hbkJvbmVOYW1lKVtrZXlvZiB0eXBlb2YgVlJNSHVtYW5Cb25lTmFtZV07XG4iLCAiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uICovXG5cbmltcG9ydCB7IFZSTUh1bWFuQm9uZU5hbWUgfSBmcm9tICcuL1ZSTUh1bWFuQm9uZU5hbWUnO1xuXG4vKipcbiAqIEFuIG9iamVjdCB0aGF0IG1hcHMgZnJvbSB7QGxpbmsgVlJNSHVtYW5Cb25lTmFtZX0gdG8gaXRzIHBhcmVudCB7QGxpbmsgVlJNSHVtYW5Cb25lTmFtZX0uXG4gKlxuICogUmVmOiBodHRwczovL2dpdGh1Yi5jb20vdnJtLWMvdnJtLXNwZWNpZmljYXRpb24vYmxvYi9tYXN0ZXIvc3BlY2lmaWNhdGlvbi9WUk1DX3ZybS0xLjAvaHVtYW5vaWQubWRcbiAqL1xuZXhwb3J0IGNvbnN0IFZSTUh1bWFuQm9uZVBhcmVudE1hcDogeyBbYm9uZSBpbiBWUk1IdW1hbkJvbmVOYW1lXTogVlJNSHVtYW5Cb25lTmFtZSB8IG51bGwgfSA9IHtcbiAgaGlwczogbnVsbCxcbiAgc3BpbmU6ICdoaXBzJyxcbiAgY2hlc3Q6ICdzcGluZScsXG4gIHVwcGVyQ2hlc3Q6ICdjaGVzdCcsXG4gIG5lY2s6ICd1cHBlckNoZXN0JyxcblxuICBoZWFkOiAnbmVjaycsXG4gIGxlZnRFeWU6ICdoZWFkJyxcbiAgcmlnaHRFeWU6ICdoZWFkJyxcbiAgamF3OiAnaGVhZCcsXG5cbiAgbGVmdFVwcGVyTGVnOiAnaGlwcycsXG4gIGxlZnRMb3dlckxlZzogJ2xlZnRVcHBlckxlZycsXG4gIGxlZnRGb290OiAnbGVmdExvd2VyTGVnJyxcbiAgbGVmdFRvZXM6ICdsZWZ0Rm9vdCcsXG5cbiAgcmlnaHRVcHBlckxlZzogJ2hpcHMnLFxuICByaWdodExvd2VyTGVnOiAncmlnaHRVcHBlckxlZycsXG4gIHJpZ2h0Rm9vdDogJ3JpZ2h0TG93ZXJMZWcnLFxuICByaWdodFRvZXM6ICdyaWdodEZvb3QnLFxuXG4gIGxlZnRTaG91bGRlcjogJ3VwcGVyQ2hlc3QnLFxuICBsZWZ0VXBwZXJBcm06ICdsZWZ0U2hvdWxkZXInLFxuICBsZWZ0TG93ZXJBcm06ICdsZWZ0VXBwZXJBcm0nLFxuICBsZWZ0SGFuZDogJ2xlZnRMb3dlckFybScsXG5cbiAgcmlnaHRTaG91bGRlcjogJ3VwcGVyQ2hlc3QnLFxuICByaWdodFVwcGVyQXJtOiAncmlnaHRTaG91bGRlcicsXG4gIHJpZ2h0TG93ZXJBcm06ICdyaWdodFVwcGVyQXJtJyxcbiAgcmlnaHRIYW5kOiAncmlnaHRMb3dlckFybScsXG5cbiAgbGVmdFRodW1iTWV0YWNhcnBhbDogJ2xlZnRIYW5kJyxcbiAgbGVmdFRodW1iUHJveGltYWw6ICdsZWZ0VGh1bWJNZXRhY2FycGFsJyxcbiAgbGVmdFRodW1iRGlzdGFsOiAnbGVmdFRodW1iUHJveGltYWwnLFxuICBsZWZ0SW5kZXhQcm94aW1hbDogJ2xlZnRIYW5kJyxcbiAgbGVmdEluZGV4SW50ZXJtZWRpYXRlOiAnbGVmdEluZGV4UHJveGltYWwnLFxuICBsZWZ0SW5kZXhEaXN0YWw6ICdsZWZ0SW5kZXhJbnRlcm1lZGlhdGUnLFxuICBsZWZ0TWlkZGxlUHJveGltYWw6ICdsZWZ0SGFuZCcsXG4gIGxlZnRNaWRkbGVJbnRlcm1lZGlhdGU6ICdsZWZ0TWlkZGxlUHJveGltYWwnLFxuICBsZWZ0TWlkZGxlRGlzdGFsOiAnbGVmdE1pZGRsZUludGVybWVkaWF0ZScsXG4gIGxlZnRSaW5nUHJveGltYWw6ICdsZWZ0SGFuZCcsXG4gIGxlZnRSaW5nSW50ZXJtZWRpYXRlOiAnbGVmdFJpbmdQcm94aW1hbCcsXG4gIGxlZnRSaW5nRGlzdGFsOiAnbGVmdFJpbmdJbnRlcm1lZGlhdGUnLFxuICBsZWZ0TGl0dGxlUHJveGltYWw6ICdsZWZ0SGFuZCcsXG4gIGxlZnRMaXR0bGVJbnRlcm1lZGlhdGU6ICdsZWZ0TGl0dGxlUHJveGltYWwnLFxuICBsZWZ0TGl0dGxlRGlzdGFsOiAnbGVmdExpdHRsZUludGVybWVkaWF0ZScsXG5cbiAgcmlnaHRUaHVtYk1ldGFjYXJwYWw6ICdyaWdodEhhbmQnLFxuICByaWdodFRodW1iUHJveGltYWw6ICdyaWdodFRodW1iTWV0YWNhcnBhbCcsXG4gIHJpZ2h0VGh1bWJEaXN0YWw6ICdyaWdodFRodW1iUHJveGltYWwnLFxuICByaWdodEluZGV4UHJveGltYWw6ICdyaWdodEhhbmQnLFxuICByaWdodEluZGV4SW50ZXJtZWRpYXRlOiAncmlnaHRJbmRleFByb3hpbWFsJyxcbiAgcmlnaHRJbmRleERpc3RhbDogJ3JpZ2h0SW5kZXhJbnRlcm1lZGlhdGUnLFxuICByaWdodE1pZGRsZVByb3hpbWFsOiAncmlnaHRIYW5kJyxcbiAgcmlnaHRNaWRkbGVJbnRlcm1lZGlhdGU6ICdyaWdodE1pZGRsZVByb3hpbWFsJyxcbiAgcmlnaHRNaWRkbGVEaXN0YWw6ICdyaWdodE1pZGRsZUludGVybWVkaWF0ZScsXG4gIHJpZ2h0UmluZ1Byb3hpbWFsOiAncmlnaHRIYW5kJyxcbiAgcmlnaHRSaW5nSW50ZXJtZWRpYXRlOiAncmlnaHRSaW5nUHJveGltYWwnLFxuICByaWdodFJpbmdEaXN0YWw6ICdyaWdodFJpbmdJbnRlcm1lZGlhdGUnLFxuICByaWdodExpdHRsZVByb3hpbWFsOiAncmlnaHRIYW5kJyxcbiAgcmlnaHRMaXR0bGVJbnRlcm1lZGlhdGU6ICdyaWdodExpdHRsZVByb3hpbWFsJyxcbiAgcmlnaHRMaXR0bGVEaXN0YWw6ICdyaWdodExpdHRsZUludGVybWVkaWF0ZScsXG59O1xuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IHF1YXRJbnZlcnRDb21wYXQgfSBmcm9tICcuLi91dGlscy9xdWF0SW52ZXJ0Q29tcGF0JztcbmltcG9ydCB0eXBlIHsgVlJNSHVtYW5Cb25lIH0gZnJvbSAnLi9WUk1IdW1hbkJvbmUnO1xuaW1wb3J0IHR5cGUgeyBWUk1IdW1hbkJvbmVzIH0gZnJvbSAnLi9WUk1IdW1hbkJvbmVzJztcbmltcG9ydCB0eXBlIHsgVlJNSHVtYW5Cb25lTmFtZSB9IGZyb20gJy4vVlJNSHVtYW5Cb25lTmFtZSc7XG5pbXBvcnQgdHlwZSB7IFZSTVBvc2UgfSBmcm9tICcuL1ZSTVBvc2UnO1xuXG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF9xdWF0QSA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5cbi8qKlxuICogQSBjbGFzcyByZXByZXNlbnRzIHRoZSBSaWcgb2YgYSBWUk0uXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1SaWcge1xuICAvKipcbiAgICogQSB7QGxpbmsgVlJNSHVtYW5Cb25lc30gdGhhdCBjb250YWlucyBhbGwgdGhlIGh1bWFuIGJvbmVzIG9mIHRoZSBWUk0uXG4gICAqIFlvdSBtaWdodCB3YW50IHRvIGdldCB0aGVzZSBib25lcyB1c2luZyB7QGxpbmsgVlJNSHVtYW5vaWQuZ2V0Qm9uZX0uXG4gICAqL1xuICBwdWJsaWMgaHVtYW5Cb25lczogVlJNSHVtYW5Cb25lcztcblxuICAvKipcbiAgICogQSB7QGxpbmsgVlJNUG9zZX0gdGhhdCBpcyBpdHMgZGVmYXVsdCBzdGF0ZS5cbiAgICogTm90ZSB0aGF0IGl0J3Mgbm90IGNvbXBhdGlibGUgd2l0aCB7QGxpbmsgc2V0UG9zZX0gYW5kIHtAbGluayBnZXRQb3NlfSwgc2luY2UgaXQgY29udGFpbnMgbm9uLXJlbGF0aXZlIHZhbHVlcyBvZiBlYWNoIGxvY2FsIHRyYW5zZm9ybXMuXG4gICAqL1xuICBwdWJsaWMgcmVzdFBvc2U6IFZSTVBvc2U7XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyB7QGxpbmsgVlJNSHVtYW5vaWR9LlxuICAgKiBAcGFyYW0gaHVtYW5Cb25lcyBBIHtAbGluayBWUk1IdW1hbkJvbmVzfSBjb250YWlucyBhbGwgdGhlIGJvbmVzIG9mIHRoZSBuZXcgaHVtYW5vaWRcbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihodW1hbkJvbmVzOiBWUk1IdW1hbkJvbmVzKSB7XG4gICAgdGhpcy5odW1hbkJvbmVzID0gaHVtYW5Cb25lcztcblxuICAgIHRoaXMucmVzdFBvc2UgPSB0aGlzLmdldEFic29sdXRlUG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgY3VycmVudCBhYnNvbHV0ZSBwb3NlIG9mIHRoaXMgaHVtYW5vaWQgYXMgYSB7QGxpbmsgVlJNUG9zZX0uXG4gICAqIE5vdGUgdGhhdCB0aGUgb3V0cHV0IHJlc3VsdCB3aWxsIGNvbnRhaW4gaW5pdGlhbCBzdGF0ZSBvZiB0aGUgVlJNIGFuZCBub3QgY29tcGF0aWJsZSBiZXR3ZWVuIGRpZmZlcmVudCBtb2RlbHMuXG4gICAqIFlvdSBtaWdodCB3YW50IHRvIHVzZSB7QGxpbmsgZ2V0UG9zZX0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBnZXRBYnNvbHV0ZVBvc2UoKTogVlJNUG9zZSB7XG4gICAgY29uc3QgcG9zZSA9IHt9IGFzIFZSTVBvc2U7XG5cbiAgICBPYmplY3Qua2V5cyh0aGlzLmh1bWFuQm9uZXMpLmZvckVhY2goKHZybUJvbmVOYW1lU3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCB2cm1Cb25lTmFtZSA9IHZybUJvbmVOYW1lU3RyaW5nIGFzIFZSTUh1bWFuQm9uZU5hbWU7XG4gICAgICBjb25zdCBub2RlID0gdGhpcy5nZXRCb25lTm9kZSh2cm1Cb25lTmFtZSk7XG5cbiAgICAgIC8vIElnbm9yZSB3aGVuIHRoZXJlIGFyZSBubyBib25lIG9uIHRoZSBWUk1IdW1hbm9pZFxuICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gR2V0IHRoZSBwb3NpdGlvbiAvIHJvdGF0aW9uIGZyb20gdGhlIG5vZGVcbiAgICAgIF92M0EuY29weShub2RlLnBvc2l0aW9uKTtcbiAgICAgIF9xdWF0QS5jb3B5KG5vZGUucXVhdGVybmlvbik7XG5cbiAgICAgIC8vIENvbnZlcnQgdG8gcmF3IGFycmF5c1xuICAgICAgcG9zZVt2cm1Cb25lTmFtZV0gPSB7XG4gICAgICAgIHBvc2l0aW9uOiBfdjNBLnRvQXJyYXkoKSBhcyBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl0sXG4gICAgICAgIHJvdGF0aW9uOiBfcXVhdEEudG9BcnJheSgpIGFzIFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdLFxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIHJldHVybiBwb3NlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgY3VycmVudCBwb3NlIG9mIHRoaXMgaHVtYW5vaWQgYXMgYSB7QGxpbmsgVlJNUG9zZX0uXG4gICAqXG4gICAqIEVhY2ggdHJhbnNmb3JtIGlzIGEgbG9jYWwgdHJhbnNmb3JtIHJlbGF0aXZlIGZyb20gcmVzdCBwb3NlIChULXBvc2UpLlxuICAgKi9cbiAgcHVibGljIGdldFBvc2UoKTogVlJNUG9zZSB7XG4gICAgY29uc3QgcG9zZSA9IHt9IGFzIFZSTVBvc2U7XG5cbiAgICBPYmplY3Qua2V5cyh0aGlzLmh1bWFuQm9uZXMpLmZvckVhY2goKGJvbmVOYW1lU3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCBib25lTmFtZSA9IGJvbmVOYW1lU3RyaW5nIGFzIFZSTUh1bWFuQm9uZU5hbWU7XG4gICAgICBjb25zdCBub2RlID0gdGhpcy5nZXRCb25lTm9kZShib25lTmFtZSk7XG5cbiAgICAgIC8vIElnbm9yZSB3aGVuIHRoZXJlIGFyZSBubyBib25lIG9uIHRoZSBWUk1IdW1hbm9pZFxuICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gVGFrZSBhIGRpZmYgZnJvbSByZXN0UG9zZVxuICAgICAgX3YzQS5zZXQoMCwgMCwgMCk7XG4gICAgICBfcXVhdEEuaWRlbnRpdHkoKTtcblxuICAgICAgY29uc3QgcmVzdFN0YXRlID0gdGhpcy5yZXN0UG9zZVtib25lTmFtZV07XG4gICAgICBpZiAocmVzdFN0YXRlPy5wb3NpdGlvbikge1xuICAgICAgICBfdjNBLmZyb21BcnJheShyZXN0U3RhdGUucG9zaXRpb24pLm5lZ2F0ZSgpO1xuICAgICAgfVxuICAgICAgaWYgKHJlc3RTdGF0ZT8ucm90YXRpb24pIHtcbiAgICAgICAgcXVhdEludmVydENvbXBhdChfcXVhdEEuZnJvbUFycmF5KHJlc3RTdGF0ZS5yb3RhdGlvbikpO1xuICAgICAgfVxuXG4gICAgICAvLyBHZXQgdGhlIHBvc2l0aW9uIC8gcm90YXRpb24gZnJvbSB0aGUgbm9kZVxuICAgICAgX3YzQS5hZGQobm9kZS5wb3NpdGlvbik7XG4gICAgICBfcXVhdEEucHJlbXVsdGlwbHkobm9kZS5xdWF0ZXJuaW9uKTtcblxuICAgICAgLy8gQ29udmVydCB0byByYXcgYXJyYXlzXG4gICAgICBwb3NlW2JvbmVOYW1lXSA9IHtcbiAgICAgICAgcG9zaXRpb246IF92M0EudG9BcnJheSgpIGFzIFtudW1iZXIsIG51bWJlciwgbnVtYmVyXSxcbiAgICAgICAgcm90YXRpb246IF9xdWF0QS50b0FycmF5KCkgYXMgW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl0sXG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHBvc2U7XG4gIH1cblxuICAvKipcbiAgICogTGV0IHRoZSBodW1hbm9pZCBkbyBhIHNwZWNpZmllZCBwb3NlLlxuICAgKlxuICAgKiBFYWNoIHRyYW5zZm9ybSBoYXZlIHRvIGJlIGEgbG9jYWwgdHJhbnNmb3JtIHJlbGF0aXZlIGZyb20gcmVzdCBwb3NlIChULXBvc2UpLlxuICAgKiBZb3UgY2FuIHBhc3Mgd2hhdCB5b3UgZ290IGZyb20ge0BsaW5rIGdldFBvc2V9LlxuICAgKlxuICAgKiBAcGFyYW0gcG9zZU9iamVjdCBBIHtAbGluayBWUk1Qb3NlfSB0aGF0IHJlcHJlc2VudHMgYSBzaW5nbGUgcG9zZVxuICAgKi9cbiAgcHVibGljIHNldFBvc2UocG9zZU9iamVjdDogVlJNUG9zZSk6IHZvaWQge1xuICAgIE9iamVjdC5lbnRyaWVzKHBvc2VPYmplY3QpLmZvckVhY2goKFtib25lTmFtZVN0cmluZywgc3RhdGVdKSA9PiB7XG4gICAgICBjb25zdCBib25lTmFtZSA9IGJvbmVOYW1lU3RyaW5nIGFzIFZSTUh1bWFuQm9uZU5hbWU7XG4gICAgICBjb25zdCBub2RlID0gdGhpcy5nZXRCb25lTm9kZShib25lTmFtZSk7XG5cbiAgICAgIC8vIElnbm9yZSB3aGVuIHRoZXJlIGFyZSBubyBib25lIHRoYXQgaXMgZGVmaW5lZCBpbiB0aGUgcG9zZSBvbiB0aGUgVlJNSHVtYW5vaWRcbiAgICAgIGlmICghbm9kZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlc3RTdGF0ZSA9IHRoaXMucmVzdFBvc2VbYm9uZU5hbWVdO1xuICAgICAgaWYgKCFyZXN0U3RhdGUpIHtcbiAgICAgICAgLy8gSXQncyB2ZXJ5IHVubGlrZWx5LiBQb3NzaWJseSBhIGJ1Z1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIEFwcGx5IHRoZSBzdGF0ZSB0byB0aGUgYWN0dWFsIGJvbmVcbiAgICAgIGlmIChzdGF0ZT8ucG9zaXRpb24pIHtcbiAgICAgICAgbm9kZS5wb3NpdGlvbi5mcm9tQXJyYXkoc3RhdGUucG9zaXRpb24pO1xuXG4gICAgICAgIGlmIChyZXN0U3RhdGUucG9zaXRpb24pIHtcbiAgICAgICAgICBub2RlLnBvc2l0aW9uLmFkZChfdjNBLmZyb21BcnJheShyZXN0U3RhdGUucG9zaXRpb24pKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGU/LnJvdGF0aW9uKSB7XG4gICAgICAgIG5vZGUucXVhdGVybmlvbi5mcm9tQXJyYXkoc3RhdGUucm90YXRpb24pO1xuXG4gICAgICAgIGlmIChyZXN0U3RhdGUucm90YXRpb24pIHtcbiAgICAgICAgICBub2RlLnF1YXRlcm5pb24ubXVsdGlwbHkoX3F1YXRBLmZyb21BcnJheShyZXN0U3RhdGUucm90YXRpb24pKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoZSBodW1hbm9pZCB0byBpdHMgcmVzdCBwb3NlLlxuICAgKi9cbiAgcHVibGljIHJlc2V0UG9zZSgpOiB2b2lkIHtcbiAgICBPYmplY3QuZW50cmllcyh0aGlzLnJlc3RQb3NlKS5mb3JFYWNoKChbYm9uZU5hbWUsIHJlc3RdKSA9PiB7XG4gICAgICBjb25zdCBub2RlID0gdGhpcy5nZXRCb25lTm9kZShib25lTmFtZSBhcyBWUk1IdW1hbkJvbmVOYW1lKTtcblxuICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHJlc3Q/LnBvc2l0aW9uKSB7XG4gICAgICAgIG5vZGUucG9zaXRpb24uZnJvbUFycmF5KHJlc3QucG9zaXRpb24pO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVzdD8ucm90YXRpb24pIHtcbiAgICAgICAgbm9kZS5xdWF0ZXJuaW9uLmZyb21BcnJheShyZXN0LnJvdGF0aW9uKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYSBib25lIGJvdW5kIHRvIGEgc3BlY2lmaWVkIHtAbGluayBWUk1IdW1hbkJvbmVOYW1lfSwgYXMgYSB7QGxpbmsgVlJNSHVtYW5Cb25lfS5cbiAgICpcbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgYm9uZSB5b3Ugd2FudFxuICAgKi9cbiAgcHVibGljIGdldEJvbmUobmFtZTogVlJNSHVtYW5Cb25lTmFtZSk6IFZSTUh1bWFuQm9uZSB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuaHVtYW5Cb25lc1tuYW1lXSA/PyB1bmRlZmluZWQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGEgYm9uZSBib3VuZCB0byBhIHNwZWNpZmllZCB7QGxpbmsgVlJNSHVtYW5Cb25lTmFtZX0sIGFzIGEgYFRIUkVFLk9iamVjdDNEYC5cbiAgICpcbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgYm9uZSB5b3Ugd2FudFxuICAgKi9cbiAgcHVibGljIGdldEJvbmVOb2RlKG5hbWU6IFZSTUh1bWFuQm9uZU5hbWUpOiBUSFJFRS5PYmplY3QzRCB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLmh1bWFuQm9uZXNbbmFtZV0/Lm5vZGUgPz8gbnVsbDtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBBIGNvbXBhdCBmdW5jdGlvbiBmb3IgYFF1YXRlcm5pb24uaW52ZXJ0KClgIC8gYFF1YXRlcm5pb24uaW52ZXJzZSgpYC5cbiAqIGBRdWF0ZXJuaW9uLmludmVydCgpYCBpcyBpbnRyb2R1Y2VkIGluIHIxMjMgYW5kIGBRdWF0ZXJuaW9uLmludmVyc2UoKWAgZW1pdHMgYSB3YXJuaW5nLlxuICogV2UgYXJlIGdvaW5nIHRvIHVzZSB0aGlzIGNvbXBhdCBmb3IgYSB3aGlsZS5cbiAqIEBwYXJhbSB0YXJnZXQgQSB0YXJnZXQgcXVhdGVybmlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gcXVhdEludmVydENvbXBhdDxUIGV4dGVuZHMgVEhSRUUuUXVhdGVybmlvbj4odGFyZ2V0OiBUKTogVCB7XG4gIGlmICgodGFyZ2V0IGFzIGFueSkuaW52ZXJ0KSB7XG4gICAgdGFyZ2V0LmludmVydCgpO1xuICB9IGVsc2Uge1xuICAgICh0YXJnZXQgYXMgYW55KS5pbnZlcnNlKCk7XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTUh1bWFuQm9uZU5hbWUsIFZSTUh1bWFuQm9uZXMgfSBmcm9tICcuJztcbmltcG9ydCB7IFZSTUh1bWFuQm9uZUxpc3QgfSBmcm9tICcuL1ZSTUh1bWFuQm9uZUxpc3QnO1xuaW1wb3J0IHsgVlJNSHVtYW5Cb25lUGFyZW50TWFwIH0gZnJvbSAnLi9WUk1IdW1hbkJvbmVQYXJlbnRNYXAnO1xuaW1wb3J0IHsgVlJNUmlnIH0gZnJvbSAnLi9WUk1SaWcnO1xuXG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF9xdWF0QSA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5jb25zdCBfYm9uZVdvcmxkUG9zID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuLyoqXG4gKiBBIGNsYXNzIHJlcHJlc2VudHMgdGhlIG5vcm1hbGl6ZWQgUmlnIG9mIGEgVlJNLlxuICovXG5leHBvcnQgY2xhc3MgVlJNSHVtYW5vaWRSaWcgZXh0ZW5kcyBWUk1SaWcge1xuICBwcm90ZWN0ZWQgc3RhdGljIF9zZXR1cFRyYW5zZm9ybXMobW9kZWxSaWc6IFZSTVJpZyk6IHtcbiAgICByaWdCb25lczogVlJNSHVtYW5Cb25lcztcbiAgICByb290OiBUSFJFRS5PYmplY3QzRDtcbiAgICBwYXJlbnRXb3JsZFJvdGF0aW9uczogeyBbYm9uZU5hbWUgaW4gVlJNSHVtYW5Cb25lTmFtZV0/OiBUSFJFRS5RdWF0ZXJuaW9uIH07XG4gICAgYm9uZVJvdGF0aW9uczogeyBbYm9uZU5hbWUgaW4gVlJNSHVtYW5Cb25lTmFtZV0/OiBUSFJFRS5RdWF0ZXJuaW9uIH07XG4gIH0ge1xuICAgIGNvbnN0IHJvb3QgPSBuZXcgVEhSRUUuT2JqZWN0M0QoKTtcbiAgICByb290Lm5hbWUgPSAnVlJNSHVtYW5vaWRSaWcnO1xuXG4gICAgLy8gc3RvcmUgYm9uZVdvcmxkUG9zaXRpb25zLCBib25lV29ybGRSb3RhdGlvbnMsIGFuZCBwYXJlbnRXb3JsZFJvdGF0aW9uc1xuICAgIGNvbnN0IGJvbmVXb3JsZFBvc2l0aW9uczogeyBbYm9uZU5hbWUgaW4gVlJNSHVtYW5Cb25lTmFtZV0/OiBUSFJFRS5WZWN0b3IzIH0gPSB7fTtcbiAgICBjb25zdCBib25lV29ybGRSb3RhdGlvbnM6IHsgW2JvbmVOYW1lIGluIFZSTUh1bWFuQm9uZU5hbWVdPzogVEhSRUUuUXVhdGVybmlvbiB9ID0ge307XG4gICAgY29uc3QgYm9uZVJvdGF0aW9uczogeyBbYm9uZU5hbWUgaW4gVlJNSHVtYW5Cb25lTmFtZV0/OiBUSFJFRS5RdWF0ZXJuaW9uIH0gPSB7fTtcbiAgICBjb25zdCBwYXJlbnRXb3JsZFJvdGF0aW9uczogeyBbYm9uZU5hbWUgaW4gVlJNSHVtYW5Cb25lTmFtZV0/OiBUSFJFRS5RdWF0ZXJuaW9uIH0gPSB7fTtcblxuICAgIFZSTUh1bWFuQm9uZUxpc3QuZm9yRWFjaCgoYm9uZU5hbWUpID0+IHtcbiAgICAgIGNvbnN0IGJvbmVOb2RlID0gbW9kZWxSaWcuZ2V0Qm9uZU5vZGUoYm9uZU5hbWUpO1xuXG4gICAgICBpZiAoYm9uZU5vZGUpIHtcbiAgICAgICAgY29uc3QgYm9uZVdvcmxkUG9zaXRpb24gPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuICAgICAgICBjb25zdCBib25lV29ybGRSb3RhdGlvbiA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5cbiAgICAgICAgYm9uZU5vZGUudXBkYXRlV29ybGRNYXRyaXgodHJ1ZSwgZmFsc2UpO1xuICAgICAgICBib25lTm9kZS5tYXRyaXhXb3JsZC5kZWNvbXBvc2UoYm9uZVdvcmxkUG9zaXRpb24sIGJvbmVXb3JsZFJvdGF0aW9uLCBfdjNBKTtcblxuICAgICAgICBib25lV29ybGRQb3NpdGlvbnNbYm9uZU5hbWVdID0gYm9uZVdvcmxkUG9zaXRpb247XG4gICAgICAgIGJvbmVXb3JsZFJvdGF0aW9uc1tib25lTmFtZV0gPSBib25lV29ybGRSb3RhdGlvbjtcbiAgICAgICAgYm9uZVJvdGF0aW9uc1tib25lTmFtZV0gPSBib25lTm9kZS5xdWF0ZXJuaW9uLmNsb25lKCk7XG5cbiAgICAgICAgY29uc3QgcGFyZW50V29ybGRSb3RhdGlvbiA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG4gICAgICAgIGJvbmVOb2RlLnBhcmVudD8ubWF0cml4V29ybGQuZGVjb21wb3NlKF92M0EsIHBhcmVudFdvcmxkUm90YXRpb24sIF92M0EpO1xuICAgICAgICBwYXJlbnRXb3JsZFJvdGF0aW9uc1tib25lTmFtZV0gPSBwYXJlbnRXb3JsZFJvdGF0aW9uO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gYnVpbGQgcmlnIGhpZXJhcmNoeSArIHN0b3JlIHBhcmVudFdvcmxkUm90YXRpb25zXG4gICAgY29uc3QgcmlnQm9uZXM6IFBhcnRpYWw8VlJNSHVtYW5Cb25lcz4gPSB7fTtcbiAgICBWUk1IdW1hbkJvbmVMaXN0LmZvckVhY2goKGJvbmVOYW1lKSA9PiB7XG4gICAgICBjb25zdCBib25lTm9kZSA9IG1vZGVsUmlnLmdldEJvbmVOb2RlKGJvbmVOYW1lKTtcblxuICAgICAgaWYgKGJvbmVOb2RlKSB7XG4gICAgICAgIGNvbnN0IGJvbmVXb3JsZFBvc2l0aW9uID0gYm9uZVdvcmxkUG9zaXRpb25zW2JvbmVOYW1lXSBhcyBUSFJFRS5WZWN0b3IzO1xuXG4gICAgICAgIC8vIHNlZSB0aGUgbmVhcmVzdCBwYXJlbnQgcG9zaXRpb25cbiAgICAgICAgbGV0IGN1cnJlbnRCb25lTmFtZTogVlJNSHVtYW5Cb25lTmFtZSB8IG51bGwgPSBib25lTmFtZTtcbiAgICAgICAgbGV0IHBhcmVudEJvbmVXb3JsZFBvc2l0aW9uOiBUSFJFRS5WZWN0b3IzIHwgdW5kZWZpbmVkO1xuICAgICAgICB3aGlsZSAocGFyZW50Qm9uZVdvcmxkUG9zaXRpb24gPT0gbnVsbCkge1xuICAgICAgICAgIGN1cnJlbnRCb25lTmFtZSA9IFZSTUh1bWFuQm9uZVBhcmVudE1hcFtjdXJyZW50Qm9uZU5hbWVdO1xuICAgICAgICAgIGlmIChjdXJyZW50Qm9uZU5hbWUgPT0gbnVsbCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIHBhcmVudEJvbmVXb3JsZFBvc2l0aW9uID0gYm9uZVdvcmxkUG9zaXRpb25zW2N1cnJlbnRCb25lTmFtZV07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhZGQgdG8gaGllcmFyY2h5XG4gICAgICAgIGNvbnN0IHJpZ0JvbmVOb2RlID0gbmV3IFRIUkVFLk9iamVjdDNEKCk7XG4gICAgICAgIHJpZ0JvbmVOb2RlLm5hbWUgPSAnTm9ybWFsaXplZF8nICsgYm9uZU5vZGUubmFtZTtcblxuICAgICAgICBjb25zdCBwYXJlbnRSaWdCb25lTm9kZSA9IChjdXJyZW50Qm9uZU5hbWUgPyByaWdCb25lc1tjdXJyZW50Qm9uZU5hbWVdPy5ub2RlIDogcm9vdCkgYXMgVEhSRUUuT2JqZWN0M0Q7XG5cbiAgICAgICAgcGFyZW50UmlnQm9uZU5vZGUuYWRkKHJpZ0JvbmVOb2RlKTtcbiAgICAgICAgcmlnQm9uZU5vZGUucG9zaXRpb24uY29weShib25lV29ybGRQb3NpdGlvbik7XG4gICAgICAgIGlmIChwYXJlbnRCb25lV29ybGRQb3NpdGlvbikge1xuICAgICAgICAgIHJpZ0JvbmVOb2RlLnBvc2l0aW9uLnN1YihwYXJlbnRCb25lV29ybGRQb3NpdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICByaWdCb25lc1tib25lTmFtZV0gPSB7IG5vZGU6IHJpZ0JvbmVOb2RlIH07XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgcmlnQm9uZXM6IHJpZ0JvbmVzIGFzIFZSTUh1bWFuQm9uZXMsXG4gICAgICByb290LFxuICAgICAgcGFyZW50V29ybGRSb3RhdGlvbnMsXG4gICAgICBib25lUm90YXRpb25zLFxuICAgIH07XG4gIH1cblxuICBwdWJsaWMgcmVhZG9ubHkgb3JpZ2luYWw6IFZSTVJpZztcbiAgcHVibGljIHJlYWRvbmx5IHJvb3Q6IFRIUkVFLk9iamVjdDNEO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3BhcmVudFdvcmxkUm90YXRpb25zOiB7IFtib25lTmFtZSBpbiBWUk1IdW1hbkJvbmVOYW1lXT86IFRIUkVFLlF1YXRlcm5pb24gfTtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9ib25lUm90YXRpb25zOiB7IFtib25lTmFtZSBpbiBWUk1IdW1hbkJvbmVOYW1lXT86IFRIUkVFLlF1YXRlcm5pb24gfTtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoaHVtYW5vaWQ6IFZSTVJpZykge1xuICAgIGNvbnN0IHsgcmlnQm9uZXMsIHJvb3QsIHBhcmVudFdvcmxkUm90YXRpb25zLCBib25lUm90YXRpb25zIH0gPSBWUk1IdW1hbm9pZFJpZy5fc2V0dXBUcmFuc2Zvcm1zKGh1bWFub2lkKTtcblxuICAgIHN1cGVyKHJpZ0JvbmVzKTtcblxuICAgIHRoaXMub3JpZ2luYWwgPSBodW1hbm9pZDtcbiAgICB0aGlzLnJvb3QgPSByb290O1xuICAgIHRoaXMuX3BhcmVudFdvcmxkUm90YXRpb25zID0gcGFyZW50V29ybGRSb3RhdGlvbnM7XG4gICAgdGhpcy5fYm9uZVJvdGF0aW9ucyA9IGJvbmVSb3RhdGlvbnM7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoaXMgaHVtYW5vaWQgcmlnLlxuICAgKi9cbiAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBWUk1IdW1hbkJvbmVMaXN0LmZvckVhY2goKGJvbmVOYW1lKSA9PiB7XG4gICAgICBjb25zdCBib25lTm9kZSA9IHRoaXMub3JpZ2luYWwuZ2V0Qm9uZU5vZGUoYm9uZU5hbWUpO1xuXG4gICAgICBpZiAoYm9uZU5vZGUgIT0gbnVsbCkge1xuICAgICAgICBjb25zdCByaWdCb25lTm9kZSA9IHRoaXMuZ2V0Qm9uZU5vZGUoYm9uZU5hbWUpITtcbiAgICAgICAgY29uc3QgcGFyZW50V29ybGRSb3RhdGlvbiA9IHRoaXMuX3BhcmVudFdvcmxkUm90YXRpb25zW2JvbmVOYW1lXSE7XG4gICAgICAgIGNvbnN0IGludlBhcmVudFdvcmxkUm90YXRpb24gPSBfcXVhdEEuY29weShwYXJlbnRXb3JsZFJvdGF0aW9uKS5pbnZlcnQoKTtcbiAgICAgICAgY29uc3QgYm9uZVJvdGF0aW9uID0gdGhpcy5fYm9uZVJvdGF0aW9uc1tib25lTmFtZV0hO1xuXG4gICAgICAgIGJvbmVOb2RlLnF1YXRlcm5pb25cbiAgICAgICAgICAuY29weShyaWdCb25lTm9kZS5xdWF0ZXJuaW9uKVxuICAgICAgICAgIC5tdWx0aXBseShwYXJlbnRXb3JsZFJvdGF0aW9uKVxuICAgICAgICAgIC5wcmVtdWx0aXBseShpbnZQYXJlbnRXb3JsZFJvdGF0aW9uKVxuICAgICAgICAgIC5tdWx0aXBseShib25lUm90YXRpb24pO1xuXG4gICAgICAgIC8vIE1vdmUgdGhlIG1hc3MgY2VudGVyIG9mIHRoZSBWUk1cbiAgICAgICAgaWYgKGJvbmVOYW1lID09PSAnaGlwcycpIHtcbiAgICAgICAgICBjb25zdCBib25lV29ybGRQb3NpdGlvbiA9IHJpZ0JvbmVOb2RlLmdldFdvcmxkUG9zaXRpb24oX2JvbmVXb3JsZFBvcyk7XG4gICAgICAgICAgYm9uZU5vZGUucGFyZW50IS51cGRhdGVXb3JsZE1hdHJpeCh0cnVlLCBmYWxzZSk7XG4gICAgICAgICAgY29uc3QgcGFyZW50V29ybGRNYXRyaXggPSBib25lTm9kZS5wYXJlbnQhLm1hdHJpeFdvcmxkO1xuICAgICAgICAgIGNvbnN0IGxvY2FsUG9zaXRpb24gPSBib25lV29ybGRQb3NpdGlvbi5hcHBseU1hdHJpeDQocGFyZW50V29ybGRNYXRyaXguaW52ZXJ0KCkpO1xuICAgICAgICAgIGJvbmVOb2RlLnBvc2l0aW9uLmNvcHkobG9jYWxQb3NpdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB0eXBlIHsgVlJNSHVtYW5Cb25lIH0gZnJvbSAnLi9WUk1IdW1hbkJvbmUnO1xuaW1wb3J0IHR5cGUgeyBWUk1IdW1hbkJvbmVzIH0gZnJvbSAnLi9WUk1IdW1hbkJvbmVzJztcbmltcG9ydCB0eXBlIHsgVlJNSHVtYW5Cb25lTmFtZSB9IGZyb20gJy4vVlJNSHVtYW5Cb25lTmFtZSc7XG5pbXBvcnQgdHlwZSB7IFZSTVBvc2UgfSBmcm9tICcuL1ZSTVBvc2UnO1xuaW1wb3J0IHsgVlJNUmlnIH0gZnJvbSAnLi9WUk1SaWcnO1xuaW1wb3J0IHsgVlJNSHVtYW5vaWRSaWcgfSBmcm9tICcuL1ZSTUh1bWFub2lkUmlnJztcblxuLyoqXG4gKiBBIGNsYXNzIHJlcHJlc2VudHMgYSBodW1hbm9pZCBvZiBhIFZSTS5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUh1bWFub2lkIHtcbiAgLyoqXG4gICAqIFdoZXRoZXIgaXQgY29waWVzIHBvc2UgZnJvbSBub3JtYWxpemVkSHVtYW5Cb25lcyB0byByYXdIdW1hbkJvbmVzIG9uIHtAbGluayB1cGRhdGV9LlxuICAgKiBgdHJ1ZWAgYnkgZGVmYXVsdC5cbiAgICpcbiAgICogQGRlZmF1bHQgdHJ1ZVxuICAgKi9cbiAgcHVibGljIGF1dG9VcGRhdGVIdW1hbkJvbmVzOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBBIHJhdyByaWcgb2YgdGhlIFZSTS5cbiAgICovXG4gIHByaXZhdGUgX3Jhd0h1bWFuQm9uZXM6IFZSTVJpZzsgLy8gVE9ETzogUmVuYW1lXG5cbiAgLyoqXG4gICAqIEEgbm9ybWFsaXplZCByaWcgb2YgdGhlIFZSTS5cbiAgICovXG4gIHByaXZhdGUgX25vcm1hbGl6ZWRIdW1hbkJvbmVzOiBWUk1IdW1hbm9pZFJpZzsgLy8gVE9ETzogUmVuYW1lXG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIERlcHJlY2F0ZWQuIFVzZSBlaXRoZXIge0BsaW5rIHJhd1Jlc3RQb3NlfSBvciB7QGxpbmsgbm9ybWFsaXplZFJlc3RQb3NlfSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIGdldCByZXN0UG9zZSgpOiBWUk1Qb3NlIHtcbiAgICBjb25zb2xlLndhcm4oJ1ZSTUh1bWFub2lkOiByZXN0UG9zZSBpcyBkZXByZWNhdGVkLiBVc2UgZWl0aGVyIHJhd1Jlc3RQb3NlIG9yIG5vcm1hbGl6ZWRSZXN0UG9zZSBpbnN0ZWFkLicpO1xuXG4gICAgcmV0dXJuIHRoaXMucmF3UmVzdFBvc2U7XG4gIH1cblxuICAvKipcbiAgICogQSB7QGxpbmsgVlJNUG9zZX0gb2YgaXRzIHJhdyBodW1hbiBib25lcyB0aGF0IGlzIGl0cyBkZWZhdWx0IHN0YXRlLlxuICAgKiBOb3RlIHRoYXQgaXQncyBub3QgY29tcGF0aWJsZSB3aXRoIHtAbGluayBzZXRSYXdQb3NlfSBhbmQge0BsaW5rIGdldFJhd1Bvc2V9LCBzaW5jZSBpdCBjb250YWlucyBub24tcmVsYXRpdmUgdmFsdWVzIG9mIGVhY2ggbG9jYWwgdHJhbnNmb3Jtcy5cbiAgICovXG4gIHB1YmxpYyBnZXQgcmF3UmVzdFBvc2UoKTogVlJNUG9zZSB7XG4gICAgcmV0dXJuIHRoaXMuX3Jhd0h1bWFuQm9uZXMucmVzdFBvc2U7XG4gIH1cblxuICAvKipcbiAgICogQSB7QGxpbmsgVlJNUG9zZX0gb2YgaXRzIG5vcm1hbGl6ZWQgaHVtYW4gYm9uZXMgdGhhdCBpcyBpdHMgZGVmYXVsdCBzdGF0ZS5cbiAgICogTm90ZSB0aGF0IGl0J3Mgbm90IGNvbXBhdGlibGUgd2l0aCB7QGxpbmsgc2V0Tm9ybWFsaXplZFBvc2V9IGFuZCB7QGxpbmsgZ2V0Tm9ybWFsaXplZFBvc2V9LCBzaW5jZSBpdCBjb250YWlucyBub24tcmVsYXRpdmUgdmFsdWVzIG9mIGVhY2ggbG9jYWwgdHJhbnNmb3Jtcy5cbiAgICovXG4gIHB1YmxpYyBnZXQgbm9ybWFsaXplZFJlc3RQb3NlKCk6IFZSTVBvc2Uge1xuICAgIHJldHVybiB0aGlzLl9ub3JtYWxpemVkSHVtYW5Cb25lcy5yZXN0UG9zZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIG1hcCBmcm9tIHtAbGluayBWUk1IdW1hbkJvbmVOYW1lfSB0byByYXcge0BsaW5rIFZSTUh1bWFuQm9uZX1zLlxuICAgKi9cbiAgcHVibGljIGdldCBodW1hbkJvbmVzKCk6IFZSTUh1bWFuQm9uZXMge1xuICAgIC8vIGFuIGFsaWFzIG9mIGByYXdIdW1hbkJvbmVzYFxuICAgIHJldHVybiB0aGlzLl9yYXdIdW1hbkJvbmVzLmh1bWFuQm9uZXM7XG4gIH1cblxuICAvKipcbiAgICogQSBtYXAgZnJvbSB7QGxpbmsgVlJNSHVtYW5Cb25lTmFtZX0gdG8gcmF3IHtAbGluayBWUk1IdW1hbkJvbmV9cy5cbiAgICovXG4gIHB1YmxpYyBnZXQgcmF3SHVtYW5Cb25lcygpOiBWUk1IdW1hbkJvbmVzIHtcbiAgICByZXR1cm4gdGhpcy5fcmF3SHVtYW5Cb25lcy5odW1hbkJvbmVzO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgbWFwIGZyb20ge0BsaW5rIFZSTUh1bWFuQm9uZU5hbWV9IHRvIG5vcm1hbGl6ZWQge0BsaW5rIFZSTUh1bWFuQm9uZX1zLlxuICAgKi9cbiAgcHVibGljIGdldCBub3JtYWxpemVkSHVtYW5Cb25lcygpOiBWUk1IdW1hbkJvbmVzIHtcbiAgICByZXR1cm4gdGhpcy5fbm9ybWFsaXplZEh1bWFuQm9uZXMuaHVtYW5Cb25lcztcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgcm9vdCBvZiBub3JtYWxpemVkIHtAbGluayBWUk1IdW1hbkJvbmV9cy5cbiAgICovXG4gIHB1YmxpYyBnZXQgbm9ybWFsaXplZEh1bWFuQm9uZXNSb290KCk6IFRIUkVFLk9iamVjdDNEIHtcbiAgICByZXR1cm4gdGhpcy5fbm9ybWFsaXplZEh1bWFuQm9uZXMucm9vdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcge0BsaW5rIFZSTUh1bWFub2lkfS5cbiAgICogQHBhcmFtIGh1bWFuQm9uZXMgQSB7QGxpbmsgVlJNSHVtYW5Cb25lc30gY29udGFpbnMgYWxsIHRoZSBib25lcyBvZiB0aGUgbmV3IGh1bWFub2lkXG4gICAqIEBwYXJhbSBhdXRvVXBkYXRlSHVtYW5Cb25lcyBXaGV0aGVyIGl0IGNvcGllcyBwb3NlIGZyb20gbm9ybWFsaXplZEh1bWFuQm9uZXMgdG8gcmF3SHVtYW5Cb25lcyBvbiB7QGxpbmsgdXBkYXRlfS4gYHRydWVgIGJ5IGRlZmF1bHQuXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoaHVtYW5Cb25lczogVlJNSHVtYW5Cb25lcywgb3B0aW9ucz86IHsgYXV0b1VwZGF0ZUh1bWFuQm9uZXM/OiBib29sZWFuIH0pIHtcbiAgICB0aGlzLmF1dG9VcGRhdGVIdW1hbkJvbmVzID0gb3B0aW9ucz8uYXV0b1VwZGF0ZUh1bWFuQm9uZXMgPz8gdHJ1ZTtcbiAgICB0aGlzLl9yYXdIdW1hbkJvbmVzID0gbmV3IFZSTVJpZyhodW1hbkJvbmVzKTtcbiAgICB0aGlzLl9ub3JtYWxpemVkSHVtYW5Cb25lcyA9IG5ldyBWUk1IdW1hbm9pZFJpZyh0aGlzLl9yYXdIdW1hbkJvbmVzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb3B5IHRoZSBnaXZlbiB7QGxpbmsgVlJNSHVtYW5vaWR9IGludG8gdGhpcyBvbmUuXG4gICAqIEBwYXJhbSBzb3VyY2UgVGhlIHtAbGluayBWUk1IdW1hbm9pZH0geW91IHdhbnQgdG8gY29weVxuICAgKiBAcmV0dXJucyB0aGlzXG4gICAqL1xuICBwdWJsaWMgY29weShzb3VyY2U6IFZSTUh1bWFub2lkKTogdGhpcyB7XG4gICAgdGhpcy5hdXRvVXBkYXRlSHVtYW5Cb25lcyA9IHNvdXJjZS5hdXRvVXBkYXRlSHVtYW5Cb25lcztcbiAgICB0aGlzLl9yYXdIdW1hbkJvbmVzID0gbmV3IFZSTVJpZyhzb3VyY2UuaHVtYW5Cb25lcyk7XG4gICAgdGhpcy5fbm9ybWFsaXplZEh1bWFuQm9uZXMgPSBuZXcgVlJNSHVtYW5vaWRSaWcodGhpcy5fcmF3SHVtYW5Cb25lcyk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgY2xvbmUgb2YgdGhpcyB7QGxpbmsgVlJNSHVtYW5vaWR9LlxuICAgKiBAcmV0dXJucyBDb3BpZWQge0BsaW5rIFZSTUh1bWFub2lkfVxuICAgKi9cbiAgcHVibGljIGNsb25lKCk6IFZSTUh1bWFub2lkIHtcbiAgICByZXR1cm4gbmV3IFZSTUh1bWFub2lkKHRoaXMuaHVtYW5Cb25lcywgeyBhdXRvVXBkYXRlSHVtYW5Cb25lczogdGhpcy5hdXRvVXBkYXRlSHVtYW5Cb25lcyB9KS5jb3B5KHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIERlcHJlY2F0ZWQuIFVzZSBlaXRoZXIge0BsaW5rIGdldFJhd0Fic29sdXRlUG9zZX0gb3Ige0BsaW5rIGdldE5vcm1hbGl6ZWRBYnNvbHV0ZVBvc2V9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgZ2V0QWJzb2x1dGVQb3NlKCk6IFZSTVBvc2Uge1xuICAgIGNvbnNvbGUud2FybihcbiAgICAgICdWUk1IdW1hbm9pZDogZ2V0QWJzb2x1dGVQb3NlKCkgaXMgZGVwcmVjYXRlZC4gVXNlIGVpdGhlciBnZXRSYXdBYnNvbHV0ZVBvc2UoKSBvciBnZXROb3JtYWxpemVkQWJzb2x1dGVQb3NlKCkgaW5zdGVhZC4nLFxuICAgICk7XG5cbiAgICByZXR1cm4gdGhpcy5nZXRSYXdBYnNvbHV0ZVBvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGN1cnJlbnQgYWJzb2x1dGUgcG9zZSBvZiB0aGlzIHJhdyBodW1hbiBib25lcyBhcyBhIHtAbGluayBWUk1Qb3NlfS5cbiAgICogTm90ZSB0aGF0IHRoZSBvdXRwdXQgcmVzdWx0IHdpbGwgY29udGFpbiBpbml0aWFsIHN0YXRlIG9mIHRoZSBWUk0gYW5kIG5vdCBjb21wYXRpYmxlIGJldHdlZW4gZGlmZmVyZW50IG1vZGVscy5cbiAgICogWW91IG1pZ2h0IHdhbnQgdG8gdXNlIHtAbGluayBnZXRSYXdQb3NlfSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIGdldFJhd0Fic29sdXRlUG9zZSgpOiBWUk1Qb3NlIHtcbiAgICByZXR1cm4gdGhpcy5fcmF3SHVtYW5Cb25lcy5nZXRBYnNvbHV0ZVBvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGN1cnJlbnQgYWJzb2x1dGUgcG9zZSBvZiB0aGlzIG5vcm1hbGl6ZWQgaHVtYW4gYm9uZXMgYXMgYSB7QGxpbmsgVlJNUG9zZX0uXG4gICAqIE5vdGUgdGhhdCB0aGUgb3V0cHV0IHJlc3VsdCB3aWxsIGNvbnRhaW4gaW5pdGlhbCBzdGF0ZSBvZiB0aGUgVlJNIGFuZCBub3QgY29tcGF0aWJsZSBiZXR3ZWVuIGRpZmZlcmVudCBtb2RlbHMuXG4gICAqIFlvdSBtaWdodCB3YW50IHRvIHVzZSB7QGxpbmsgZ2V0Tm9ybWFsaXplZFBvc2V9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgZ2V0Tm9ybWFsaXplZEFic29sdXRlUG9zZSgpOiBWUk1Qb3NlIHtcbiAgICByZXR1cm4gdGhpcy5fbm9ybWFsaXplZEh1bWFuQm9uZXMuZ2V0QWJzb2x1dGVQb3NlKCk7XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgRGVwcmVjYXRlZC4gVXNlIGVpdGhlciB7QGxpbmsgZ2V0UmF3UG9zZX0gb3Ige0BsaW5rIGdldE5vcm1hbGl6ZWRQb3NlfSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIGdldFBvc2UoKTogVlJNUG9zZSB7XG4gICAgY29uc29sZS53YXJuKCdWUk1IdW1hbm9pZDogZ2V0UG9zZSgpIGlzIGRlcHJlY2F0ZWQuIFVzZSBlaXRoZXIgZ2V0UmF3UG9zZSgpIG9yIGdldE5vcm1hbGl6ZWRQb3NlKCkgaW5zdGVhZC4nKTtcblxuICAgIHJldHVybiB0aGlzLmdldFJhd1Bvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGN1cnJlbnQgcG9zZSBvZiByYXcgaHVtYW4gYm9uZXMgYXMgYSB7QGxpbmsgVlJNUG9zZX0uXG4gICAqXG4gICAqIEVhY2ggdHJhbnNmb3JtIGlzIGEgbG9jYWwgdHJhbnNmb3JtIHJlbGF0aXZlIGZyb20gcmVzdCBwb3NlIChULXBvc2UpLlxuICAgKi9cbiAgcHVibGljIGdldFJhd1Bvc2UoKTogVlJNUG9zZSB7XG4gICAgcmV0dXJuIHRoaXMuX3Jhd0h1bWFuQm9uZXMuZ2V0UG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgY3VycmVudCBwb3NlIG9mIG5vcm1hbGl6ZWQgaHVtYW4gYm9uZXMgYXMgYSB7QGxpbmsgVlJNUG9zZX0uXG4gICAqXG4gICAqIEVhY2ggdHJhbnNmb3JtIGlzIGEgbG9jYWwgdHJhbnNmb3JtIHJlbGF0aXZlIGZyb20gcmVzdCBwb3NlIChULXBvc2UpLlxuICAgKi9cbiAgcHVibGljIGdldE5vcm1hbGl6ZWRQb3NlKCk6IFZSTVBvc2Uge1xuICAgIHJldHVybiB0aGlzLl9ub3JtYWxpemVkSHVtYW5Cb25lcy5nZXRQb3NlKCk7XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgRGVwcmVjYXRlZC4gVXNlIGVpdGhlciB7QGxpbmsgc2V0UmF3UG9zZX0gb3Ige0BsaW5rIHNldE5vcm1hbGl6ZWRQb3NlfSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIHNldFBvc2UocG9zZU9iamVjdDogVlJNUG9zZSk6IHZvaWQge1xuICAgIGNvbnNvbGUud2FybignVlJNSHVtYW5vaWQ6IHNldFBvc2UoKSBpcyBkZXByZWNhdGVkLiBVc2UgZWl0aGVyIHNldFJhd1Bvc2UoKSBvciBzZXROb3JtYWxpemVkUG9zZSgpIGluc3RlYWQuJyk7XG5cbiAgICByZXR1cm4gdGhpcy5zZXRSYXdQb3NlKHBvc2VPYmplY3QpO1xuICB9XG5cbiAgLyoqXG4gICAqIExldCB0aGUgcmF3IGh1bWFuIGJvbmVzIGRvIGEgc3BlY2lmaWVkIHBvc2UuXG4gICAqXG4gICAqIEVhY2ggdHJhbnNmb3JtIGhhdmUgdG8gYmUgYSBsb2NhbCB0cmFuc2Zvcm0gcmVsYXRpdmUgZnJvbSByZXN0IHBvc2UgKFQtcG9zZSkuXG4gICAqIFlvdSBjYW4gcGFzcyB3aGF0IHlvdSBnb3QgZnJvbSB7QGxpbmsgZ2V0UmF3UG9zZX0uXG4gICAqXG4gICAqIElmIHlvdSBhcmUgdXNpbmcge0BsaW5rIGF1dG9VcGRhdGVIdW1hbkJvbmVzfSwgeW91IG1pZ2h0IHdhbnQgdG8gdXNlIHtAbGluayBzZXROb3JtYWxpemVkUG9zZX0gaW5zdGVhZC5cbiAgICpcbiAgICogQHBhcmFtIHBvc2VPYmplY3QgQSB7QGxpbmsgVlJNUG9zZX0gdGhhdCByZXByZXNlbnRzIGEgc2luZ2xlIHBvc2VcbiAgICovXG4gIHB1YmxpYyBzZXRSYXdQb3NlKHBvc2VPYmplY3Q6IFZSTVBvc2UpOiB2b2lkIHtcbiAgICByZXR1cm4gdGhpcy5fcmF3SHVtYW5Cb25lcy5zZXRQb3NlKHBvc2VPYmplY3QpO1xuICB9XG5cbiAgLyoqXG4gICAqIExldCB0aGUgbm9ybWFsaXplZCBodW1hbiBib25lcyBkbyBhIHNwZWNpZmllZCBwb3NlLlxuICAgKlxuICAgKiBFYWNoIHRyYW5zZm9ybSBoYXZlIHRvIGJlIGEgbG9jYWwgdHJhbnNmb3JtIHJlbGF0aXZlIGZyb20gcmVzdCBwb3NlIChULXBvc2UpLlxuICAgKiBZb3UgY2FuIHBhc3Mgd2hhdCB5b3UgZ290IGZyb20ge0BsaW5rIGdldE5vcm1hbGl6ZWRQb3NlfS5cbiAgICpcbiAgICogQHBhcmFtIHBvc2VPYmplY3QgQSB7QGxpbmsgVlJNUG9zZX0gdGhhdCByZXByZXNlbnRzIGEgc2luZ2xlIHBvc2VcbiAgICovXG4gIHB1YmxpYyBzZXROb3JtYWxpemVkUG9zZShwb3NlT2JqZWN0OiBWUk1Qb3NlKTogdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMuX25vcm1hbGl6ZWRIdW1hbkJvbmVzLnNldFBvc2UocG9zZU9iamVjdCk7XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgRGVwcmVjYXRlZC4gVXNlIGVpdGhlciB7QGxpbmsgcmVzZXRSYXdQb3NlfSBvciB7QGxpbmsgcmVzZXROb3JtYWxpemVkUG9zZX0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyByZXNldFBvc2UoKTogdm9pZCB7XG4gICAgY29uc29sZS53YXJuKCdWUk1IdW1hbm9pZDogcmVzZXRQb3NlKCkgaXMgZGVwcmVjYXRlZC4gVXNlIGVpdGhlciByZXNldFJhd1Bvc2UoKSBvciByZXNldE5vcm1hbGl6ZWRQb3NlKCkgaW5zdGVhZC4nKTtcblxuICAgIHJldHVybiB0aGlzLnJlc2V0UmF3UG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoZSByYXcgaHVtYW5vaWQgdG8gaXRzIHJlc3QgcG9zZS5cbiAgICpcbiAgICogSWYgeW91IGFyZSB1c2luZyB7QGxpbmsgYXV0b1VwZGF0ZUh1bWFuQm9uZXN9LCB5b3UgbWlnaHQgd2FudCB0byB1c2Uge0BsaW5rIHJlc2V0Tm9ybWFsaXplZFBvc2V9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgcmVzZXRSYXdQb3NlKCk6IHZvaWQge1xuICAgIHJldHVybiB0aGlzLl9yYXdIdW1hbkJvbmVzLnJlc2V0UG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoZSBub3JtYWxpemVkIGh1bWFub2lkIHRvIGl0cyByZXN0IHBvc2UuXG4gICAqL1xuICBwdWJsaWMgcmVzZXROb3JtYWxpemVkUG9zZSgpOiB2b2lkIHtcbiAgICByZXR1cm4gdGhpcy5fbm9ybWFsaXplZEh1bWFuQm9uZXMucmVzZXRQb3NlKCk7XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgRGVwcmVjYXRlZC4gVXNlIGVpdGhlciB7QGxpbmsgZ2V0UmF3Qm9uZX0gb3Ige0BsaW5rIGdldE5vcm1hbGl6ZWRCb25lfSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIGdldEJvbmUobmFtZTogVlJNSHVtYW5Cb25lTmFtZSk6IFZSTUh1bWFuQm9uZSB8IHVuZGVmaW5lZCB7XG4gICAgY29uc29sZS53YXJuKCdWUk1IdW1hbm9pZDogZ2V0Qm9uZSgpIGlzIGRlcHJlY2F0ZWQuIFVzZSBlaXRoZXIgZ2V0UmF3Qm9uZSgpIG9yIGdldE5vcm1hbGl6ZWRCb25lKCkgaW5zdGVhZC4nKTtcblxuICAgIHJldHVybiB0aGlzLmdldFJhd0JvbmUobmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGEgcmF3IHtAbGluayBWUk1IdW1hbkJvbmV9IGJvdW5kIHRvIGEgc3BlY2lmaWVkIHtAbGluayBWUk1IdW1hbkJvbmVOYW1lfS5cbiAgICpcbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgYm9uZSB5b3Ugd2FudFxuICAgKi9cbiAgcHVibGljIGdldFJhd0JvbmUobmFtZTogVlJNSHVtYW5Cb25lTmFtZSk6IFZSTUh1bWFuQm9uZSB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX3Jhd0h1bWFuQm9uZXMuZ2V0Qm9uZShuYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYSBub3JtYWxpemVkIHtAbGluayBWUk1IdW1hbkJvbmV9IGJvdW5kIHRvIGEgc3BlY2lmaWVkIHtAbGluayBWUk1IdW1hbkJvbmVOYW1lfS5cbiAgICpcbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgYm9uZSB5b3Ugd2FudFxuICAgKi9cbiAgcHVibGljIGdldE5vcm1hbGl6ZWRCb25lKG5hbWU6IFZSTUh1bWFuQm9uZU5hbWUpOiBWUk1IdW1hbkJvbmUgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9ub3JtYWxpemVkSHVtYW5Cb25lcy5nZXRCb25lKG5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIERlcHJlY2F0ZWQuIFVzZSBlaXRoZXIge0BsaW5rIGdldFJhd0JvbmVOb2RlfSBvciB7QGxpbmsgZ2V0Tm9ybWFsaXplZEJvbmVOb2RlfSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIGdldEJvbmVOb2RlKG5hbWU6IFZSTUh1bWFuQm9uZU5hbWUpOiBUSFJFRS5PYmplY3QzRCB8IG51bGwge1xuICAgIGNvbnNvbGUud2FybihcbiAgICAgICdWUk1IdW1hbm9pZDogZ2V0Qm9uZU5vZGUoKSBpcyBkZXByZWNhdGVkLiBVc2UgZWl0aGVyIGdldFJhd0JvbmVOb2RlKCkgb3IgZ2V0Tm9ybWFsaXplZEJvbmVOb2RlKCkgaW5zdGVhZC4nLFxuICAgICk7XG5cbiAgICByZXR1cm4gdGhpcy5nZXRSYXdCb25lTm9kZShuYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYSByYXcgYm9uZSBhcyBhIGBUSFJFRS5PYmplY3QzRGAgYm91bmQgdG8gYSBzcGVjaWZpZWQge0BsaW5rIFZSTUh1bWFuQm9uZU5hbWV9LlxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBib25lIHlvdSB3YW50XG4gICAqL1xuICBwdWJsaWMgZ2V0UmF3Qm9uZU5vZGUobmFtZTogVlJNSHVtYW5Cb25lTmFtZSk6IFRIUkVFLk9iamVjdDNEIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX3Jhd0h1bWFuQm9uZXMuZ2V0Qm9uZU5vZGUobmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGEgbm9ybWFsaXplZCBib25lIGFzIGEgYFRIUkVFLk9iamVjdDNEYCBib3VuZCB0byBhIHNwZWNpZmllZCB7QGxpbmsgVlJNSHVtYW5Cb25lTmFtZX0uXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGJvbmUgeW91IHdhbnRcbiAgICovXG4gIHB1YmxpYyBnZXROb3JtYWxpemVkQm9uZU5vZGUobmFtZTogVlJNSHVtYW5Cb25lTmFtZSk6IFRIUkVFLk9iamVjdDNEIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX25vcm1hbGl6ZWRIdW1hbkJvbmVzLmdldEJvbmVOb2RlKG5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgaHVtYW5vaWQgY29tcG9uZW50LlxuICAgKlxuICAgKiBJZiB7QGxpbmsgYXV0b1VwZGF0ZUh1bWFuQm9uZXN9IGlzIGB0cnVlYCwgaXQgdHJhbnNmZXJzIHRoZSBwb3NlIG9mIG5vcm1hbGl6ZWQgaHVtYW4gYm9uZXMgdG8gcmF3IGh1bWFuIGJvbmVzLlxuICAgKi9cbiAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5hdXRvVXBkYXRlSHVtYW5Cb25lcykge1xuICAgICAgdGhpcy5fbm9ybWFsaXplZEh1bWFuQm9uZXMudXBkYXRlKCk7XG4gICAgfVxuICB9XG59XG4iLCAiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uICovXG5cbmV4cG9ydCBjb25zdCBWUk1SZXF1aXJlZEh1bWFuQm9uZU5hbWUgPSB7XG4gIEhpcHM6ICdoaXBzJyxcbiAgU3BpbmU6ICdzcGluZScsXG4gIEhlYWQ6ICdoZWFkJyxcbiAgTGVmdFVwcGVyTGVnOiAnbGVmdFVwcGVyTGVnJyxcbiAgTGVmdExvd2VyTGVnOiAnbGVmdExvd2VyTGVnJyxcbiAgTGVmdEZvb3Q6ICdsZWZ0Rm9vdCcsXG4gIFJpZ2h0VXBwZXJMZWc6ICdyaWdodFVwcGVyTGVnJyxcbiAgUmlnaHRMb3dlckxlZzogJ3JpZ2h0TG93ZXJMZWcnLFxuICBSaWdodEZvb3Q6ICdyaWdodEZvb3QnLFxuICBMZWZ0VXBwZXJBcm06ICdsZWZ0VXBwZXJBcm0nLFxuICBMZWZ0TG93ZXJBcm06ICdsZWZ0TG93ZXJBcm0nLFxuICBMZWZ0SGFuZDogJ2xlZnRIYW5kJyxcbiAgUmlnaHRVcHBlckFybTogJ3JpZ2h0VXBwZXJBcm0nLFxuICBSaWdodExvd2VyQXJtOiAncmlnaHRMb3dlckFybScsXG4gIFJpZ2h0SGFuZDogJ3JpZ2h0SGFuZCcsXG59IGFzIGNvbnN0O1xuXG5leHBvcnQgdHlwZSBWUk1SZXF1aXJlZEh1bWFuQm9uZU5hbWUgPSAodHlwZW9mIFZSTVJlcXVpcmVkSHVtYW5Cb25lTmFtZSlba2V5b2YgdHlwZW9mIFZSTVJlcXVpcmVkSHVtYW5Cb25lTmFtZV07XG4iLCAiaW1wb3J0IHR5cGUgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgdHlwZSAqIGFzIFYwVlJNIGZyb20gJ0BwaXhpdi90eXBlcy12cm0tMC4wJztcbmltcG9ydCB0eXBlICogYXMgVjFWUk1TY2hlbWEgZnJvbSAnQHBpeGl2L3R5cGVzLXZybWMtdnJtLTEuMCc7XG5pbXBvcnQgdHlwZSB7IEdMVEYsIEdMVEZMb2FkZXJQbHVnaW4sIEdMVEZQYXJzZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyLmpzJztcbmltcG9ydCB7IFZSTUh1bWFub2lkIH0gZnJvbSAnLi9WUk1IdW1hbm9pZCc7XG5pbXBvcnQgdHlwZSB7IFZSTUh1bWFuQm9uZXMgfSBmcm9tICcuL1ZSTUh1bWFuQm9uZXMnO1xuaW1wb3J0IHsgVlJNUmVxdWlyZWRIdW1hbkJvbmVOYW1lIH0gZnJvbSAnLi9WUk1SZXF1aXJlZEh1bWFuQm9uZU5hbWUnO1xuaW1wb3J0IHsgR0xURiBhcyBHTFRGU2NoZW1hIH0gZnJvbSAnQGdsdGYtdHJhbnNmb3JtL2NvcmUnO1xuaW1wb3J0IHsgVlJNSHVtYW5vaWRIZWxwZXIgfSBmcm9tICcuL2hlbHBlcnMvVlJNSHVtYW5vaWRIZWxwZXInO1xuaW1wb3J0IHsgVlJNSHVtYW5vaWRMb2FkZXJQbHVnaW5PcHRpb25zIH0gZnJvbSAnLi9WUk1IdW1hbm9pZExvYWRlclBsdWdpbk9wdGlvbnMnO1xuXG4vKipcbiAqIFBvc3NpYmxlIHNwZWMgdmVyc2lvbnMgaXQgcmVjb2duaXplcy5cbiAqL1xuY29uc3QgUE9TU0lCTEVfU1BFQ19WRVJTSU9OUyA9IG5ldyBTZXQoWycxLjAnLCAnMS4wLWJldGEnXSk7XG5cbi8qKlxuICogQSBtYXAgZnJvbSBvbGQgdGh1bWIgYm9uZSBuYW1lcyB0byBuZXcgdGh1bWIgYm9uZSBuYW1lc1xuICovXG5jb25zdCB0aHVtYkJvbmVOYW1lTWFwOiB7IFtrZXk6IHN0cmluZ106IFYxVlJNU2NoZW1hLkh1bWFub2lkSHVtYW5Cb25lTmFtZSB8IHVuZGVmaW5lZCB9ID0ge1xuICBsZWZ0VGh1bWJQcm94aW1hbDogJ2xlZnRUaHVtYk1ldGFjYXJwYWwnLFxuICBsZWZ0VGh1bWJJbnRlcm1lZGlhdGU6ICdsZWZ0VGh1bWJQcm94aW1hbCcsXG4gIHJpZ2h0VGh1bWJQcm94aW1hbDogJ3JpZ2h0VGh1bWJNZXRhY2FycGFsJyxcbiAgcmlnaHRUaHVtYkludGVybWVkaWF0ZTogJ3JpZ2h0VGh1bWJQcm94aW1hbCcsXG59O1xuXG4vKipcbiAqIEEgcGx1Z2luIG9mIEdMVEZMb2FkZXIgdGhhdCBpbXBvcnRzIGEge0BsaW5rIFZSTUh1bWFub2lkfSBmcm9tIGEgVlJNIGV4dGVuc2lvbiBvZiBhIEdMVEYuXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1IdW1hbm9pZExvYWRlclBsdWdpbiBpbXBsZW1lbnRzIEdMVEZMb2FkZXJQbHVnaW4ge1xuICAvKipcbiAgICogU3BlY2lmeSBhbiBPYmplY3QzRCB0byBhZGQge0BsaW5rIFZSTUh1bWFub2lkSGVscGVyfS5cbiAgICogSWYgbm90IHNwZWNpZmllZCwgaGVscGVyIHdpbGwgbm90IGJlIGNyZWF0ZWQuXG4gICAqIElmIGByZW5kZXJPcmRlcmAgaXMgc2V0IHRvIHRoZSByb290LCB0aGUgaGVscGVyIHdpbGwgY29weSB0aGUgc2FtZSBgcmVuZGVyT3JkZXJgIC5cbiAgICovXG4gIHB1YmxpYyBoZWxwZXJSb290PzogVEhSRUUuT2JqZWN0M0Q7XG5cbiAgcHVibGljIGF1dG9VcGRhdGVIdW1hbkJvbmVzPzogYm9vbGVhbjtcblxuICBwdWJsaWMgcmVhZG9ubHkgcGFyc2VyOiBHTFRGUGFyc2VyO1xuXG4gIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xuICAgIC8vIFdlIHNob3VsZCB1c2UgdGhlIGV4dGVuc2lvbiBuYW1lIGluc3RlYWQgYnV0IHdlIGhhdmUgbXVsdGlwbGUgcGx1Z2lucyBmb3IgYW4gZXh0ZW5zaW9uLi4uXG4gICAgcmV0dXJuICdWUk1IdW1hbm9pZExvYWRlclBsdWdpbic7XG4gIH1cblxuICBwdWJsaWMgY29uc3RydWN0b3IocGFyc2VyOiBHTFRGUGFyc2VyLCBvcHRpb25zPzogVlJNSHVtYW5vaWRMb2FkZXJQbHVnaW5PcHRpb25zKSB7XG4gICAgdGhpcy5wYXJzZXIgPSBwYXJzZXI7XG5cbiAgICB0aGlzLmhlbHBlclJvb3QgPSBvcHRpb25zPy5oZWxwZXJSb290O1xuICAgIHRoaXMuYXV0b1VwZGF0ZUh1bWFuQm9uZXMgPSBvcHRpb25zPy5hdXRvVXBkYXRlSHVtYW5Cb25lcztcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBhZnRlclJvb3QoZ2x0ZjogR0xURik6IFByb21pc2U8dm9pZD4ge1xuICAgIGdsdGYudXNlckRhdGEudnJtSHVtYW5vaWQgPSBhd2FpdCB0aGlzLl9pbXBvcnQoZ2x0Zik7XG4gIH1cblxuICAvKipcbiAgICogSW1wb3J0IGEge0BsaW5rIFZSTUh1bWFub2lkfSBmcm9tIGEgVlJNLlxuICAgKlxuICAgKiBAcGFyYW0gZ2x0ZiBBIHBhcnNlZCByZXN1bHQgb2YgR0xURiB0YWtlbiBmcm9tIEdMVEZMb2FkZXJcbiAgICovXG4gIHByaXZhdGUgYXN5bmMgX2ltcG9ydChnbHRmOiBHTFRGKTogUHJvbWlzZTxWUk1IdW1hbm9pZCB8IG51bGw+IHtcbiAgICBjb25zdCB2MVJlc3VsdCA9IGF3YWl0IHRoaXMuX3YxSW1wb3J0KGdsdGYpO1xuICAgIGlmICh2MVJlc3VsdCkge1xuICAgICAgcmV0dXJuIHYxUmVzdWx0O1xuICAgIH1cblxuICAgIGNvbnN0IHYwUmVzdWx0ID0gYXdhaXQgdGhpcy5fdjBJbXBvcnQoZ2x0Zik7XG4gICAgaWYgKHYwUmVzdWx0KSB7XG4gICAgICByZXR1cm4gdjBSZXN1bHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF92MUltcG9ydChnbHRmOiBHTFRGKTogUHJvbWlzZTxWUk1IdW1hbm9pZCB8IG51bGw+IHtcbiAgICBjb25zdCBqc29uID0gdGhpcy5wYXJzZXIuanNvbiBhcyBHTFRGU2NoZW1hLklHTFRGO1xuXG4gICAgLy8gZWFybHkgYWJvcnQgaWYgaXQgZG9lc24ndCB1c2UgdnJtXG4gICAgY29uc3QgaXNWUk1Vc2VkID0ganNvbi5leHRlbnNpb25zVXNlZD8uaW5kZXhPZignVlJNQ192cm0nKSAhPT0gLTE7XG4gICAgaWYgKCFpc1ZSTVVzZWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGV4dGVuc2lvbiA9IGpzb24uZXh0ZW5zaW9ucz8uWydWUk1DX3ZybSddIGFzIFYxVlJNU2NoZW1hLlZSTUNWUk0gfCB1bmRlZmluZWQ7XG4gICAgaWYgKCFleHRlbnNpb24pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNwZWNWZXJzaW9uID0gZXh0ZW5zaW9uLnNwZWNWZXJzaW9uO1xuICAgIGlmICghUE9TU0lCTEVfU1BFQ19WRVJTSU9OUy5oYXMoc3BlY1ZlcnNpb24pKSB7XG4gICAgICBjb25zb2xlLndhcm4oYFZSTUh1bWFub2lkTG9hZGVyUGx1Z2luOiBVbmtub3duIFZSTUNfdnJtIHNwZWNWZXJzaW9uIFwiJHtzcGVjVmVyc2lvbn1cImApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc2NoZW1hSHVtYW5vaWQgPSBleHRlbnNpb24uaHVtYW5vaWQ7XG4gICAgaWYgKCFzY2hlbWFIdW1hbm9pZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY29tcGF0OiAxLjAtYmV0YSB0aHVtYiBib25lIG5hbWVzXG4gICAgICpcbiAgICAgKiBgdHJ1ZWAgaWYgYGxlZnRUaHVtYkludGVybWVkaWF0ZWAgb3IgYHJpZ2h0VGh1bWJJbnRlcm1lZGlhdGVgIGV4aXN0c1xuICAgICAqL1xuICAgIGNvbnN0IGV4aXN0c1ByZXZpb3VzVGh1bWJOYW1lID1cbiAgICAgIChzY2hlbWFIdW1hbm9pZC5odW1hbkJvbmVzIGFzIGFueSkubGVmdFRodW1iSW50ZXJtZWRpYXRlICE9IG51bGwgfHxcbiAgICAgIChzY2hlbWFIdW1hbm9pZC5odW1hbkJvbmVzIGFzIGFueSkucmlnaHRUaHVtYkludGVybWVkaWF0ZSAhPSBudWxsO1xuXG4gICAgY29uc3QgaHVtYW5Cb25lczogUGFydGlhbDxWUk1IdW1hbkJvbmVzPiA9IHt9O1xuICAgIGlmIChzY2hlbWFIdW1hbm9pZC5odW1hbkJvbmVzICE9IG51bGwpIHtcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICBPYmplY3QuZW50cmllcyhzY2hlbWFIdW1hbm9pZC5odW1hbkJvbmVzKS5tYXAoYXN5bmMgKFtib25lTmFtZVN0cmluZywgc2NoZW1hSHVtYW5Cb25lXSkgPT4ge1xuICAgICAgICAgIGxldCBib25lTmFtZSA9IGJvbmVOYW1lU3RyaW5nIGFzIFYxVlJNU2NoZW1hLkh1bWFub2lkSHVtYW5Cb25lTmFtZTtcbiAgICAgICAgICBjb25zdCBpbmRleCA9IHNjaGVtYUh1bWFuQm9uZS5ub2RlO1xuXG4gICAgICAgICAgLy8gY29tcGF0OiAxLjAtYmV0YSBwcmV2aW91cyB0aHVtYiBib25lIG5hbWVzXG4gICAgICAgICAgaWYgKGV4aXN0c1ByZXZpb3VzVGh1bWJOYW1lKSB7XG4gICAgICAgICAgICBjb25zdCB0aHVtYkJvbmVOYW1lID0gdGh1bWJCb25lTmFtZU1hcFtib25lTmFtZV07XG4gICAgICAgICAgICBpZiAodGh1bWJCb25lTmFtZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgIGJvbmVOYW1lID0gdGh1bWJCb25lTmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBub2RlID0gYXdhaXQgdGhpcy5wYXJzZXIuZ2V0RGVwZW5kZW5jeSgnbm9kZScsIGluZGV4KTtcblxuICAgICAgICAgIC8vIGlmIHRoZSBzcGVjaWZpZWQgbm9kZSBkb2VzIG5vdCBleGlzdCwgZW1pdCBhIHdhcm5pbmdcbiAgICAgICAgICBpZiAobm9kZSA9PSBudWxsKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYEEgZ2xURiBub2RlIGJvdW5kIHRvIHRoZSBodW1hbm9pZCBib25lICR7Ym9uZU5hbWV9IChpbmRleCA9ICR7aW5kZXh9KSBkb2VzIG5vdCBleGlzdGApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIHNldCB0byB0aGUgYGh1bWFuQm9uZXNgXG4gICAgICAgICAgaHVtYW5Cb25lc1tib25lTmFtZV0gPSB7IG5vZGUgfTtcbiAgICAgICAgfSksXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IGh1bWFub2lkID0gbmV3IFZSTUh1bWFub2lkKHRoaXMuX2Vuc3VyZVJlcXVpcmVkQm9uZXNFeGlzdChodW1hbkJvbmVzKSwge1xuICAgICAgYXV0b1VwZGF0ZUh1bWFuQm9uZXM6IHRoaXMuYXV0b1VwZGF0ZUh1bWFuQm9uZXMsXG4gICAgfSk7XG4gICAgZ2x0Zi5zY2VuZS5hZGQoaHVtYW5vaWQubm9ybWFsaXplZEh1bWFuQm9uZXNSb290KTtcblxuICAgIGlmICh0aGlzLmhlbHBlclJvb3QpIHtcbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBWUk1IdW1hbm9pZEhlbHBlcihodW1hbm9pZCk7XG4gICAgICB0aGlzLmhlbHBlclJvb3QuYWRkKGhlbHBlcik7XG4gICAgICBoZWxwZXIucmVuZGVyT3JkZXIgPSB0aGlzLmhlbHBlclJvb3QucmVuZGVyT3JkZXI7XG4gICAgfVxuXG4gICAgcmV0dXJuIGh1bWFub2lkO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfdjBJbXBvcnQoZ2x0ZjogR0xURik6IFByb21pc2U8VlJNSHVtYW5vaWQgfCBudWxsPiB7XG4gICAgY29uc3QganNvbiA9IHRoaXMucGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAgIGNvbnN0IHZybUV4dCA9IGpzb24uZXh0ZW5zaW9ucz8uVlJNIGFzIFYwVlJNLlZSTSB8IHVuZGVmaW5lZDtcbiAgICBpZiAoIXZybUV4dCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc2NoZW1hSHVtYW5vaWQ6IFYwVlJNLkh1bWFub2lkIHwgdW5kZWZpbmVkID0gdnJtRXh0Lmh1bWFub2lkO1xuICAgIGlmICghc2NoZW1hSHVtYW5vaWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGh1bWFuQm9uZXM6IFBhcnRpYWw8VlJNSHVtYW5Cb25lcz4gPSB7fTtcbiAgICBpZiAoc2NoZW1hSHVtYW5vaWQuaHVtYW5Cb25lcyAhPSBudWxsKSB7XG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgc2NoZW1hSHVtYW5vaWQuaHVtYW5Cb25lcy5tYXAoYXN5bmMgKGJvbmUpID0+IHtcbiAgICAgICAgICBjb25zdCBib25lTmFtZSA9IGJvbmUuYm9uZTtcbiAgICAgICAgICBjb25zdCBpbmRleCA9IGJvbmUubm9kZTtcblxuICAgICAgICAgIGlmIChib25lTmFtZSA9PSBudWxsIHx8IGluZGV4ID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBWUk0wLjAgY2FuIGNvbnRhaW4gLTEgYXMgYSBub2RlIGluZGV4LCB3aGljaCBpcyBpbnZhbGlkXG4gICAgICAgICAgLy8gRm91bmQgYXQgbGVhc3QgaW4gVW5pVlJNLTAuNjEuMVxuICAgICAgICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgICAgYEEgZ2xURiBub2RlIGluZGV4IGZvciB0aGUgaHVtYW5vaWQgYm9uZSAke2JvbmVOYW1lfSBpcyBuZWdhdGl2ZSAoJHtpbmRleH0pLCBpZ25vcmluZyB0aGlzIGJvbmUuYCxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3Qgbm9kZSA9IGF3YWl0IHRoaXMucGFyc2VyLmdldERlcGVuZGVuY3koJ25vZGUnLCBpbmRleCk7XG5cbiAgICAgICAgICAvLyBpZiB0aGUgc3BlY2lmaWVkIG5vZGUgZG9lcyBub3QgZXhpc3QsIGVtaXQgYSB3YXJuaW5nXG4gICAgICAgICAgaWYgKG5vZGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGBBIGdsVEYgbm9kZSBib3VuZCB0byB0aGUgaHVtYW5vaWQgYm9uZSAke2JvbmVOYW1lfSAoaW5kZXggPSAke2luZGV4fSkgZG9lcyBub3QgZXhpc3RgKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBtYXAgdG8gbmV3IGJvbmUgbmFtZVxuICAgICAgICAgIGNvbnN0IHRodW1iQm9uZU5hbWUgPSB0aHVtYkJvbmVOYW1lTWFwW2JvbmVOYW1lXTtcbiAgICAgICAgICBjb25zdCBuZXdCb25lTmFtZSA9ICh0aHVtYkJvbmVOYW1lID8/IGJvbmVOYW1lKSBhcyBWMVZSTVNjaGVtYS5IdW1hbm9pZEh1bWFuQm9uZU5hbWU7XG5cbiAgICAgICAgICAvLyB2MCBWUk1zIG1pZ2h0IGhhdmUgYSBtdWx0aXBsZSBub2RlcyBhdHRhY2hlZCB0byBhIHNpbmdsZSBib25lLi4uXG4gICAgICAgICAgLy8gc28gaWYgdGhlcmUgYWxyZWFkeSBpcyBhbiBlbnRyeSBpbiB0aGUgYGh1bWFuQm9uZXNgLCBzaG93IGEgd2FybmluZyBhbmQgaWdub3JlIGl0XG4gICAgICAgICAgaWYgKGh1bWFuQm9uZXNbbmV3Qm9uZU5hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgICAgYE11bHRpcGxlIGJvbmUgZW50cmllcyBmb3IgJHtuZXdCb25lTmFtZX0gZGV0ZWN0ZWQgKGluZGV4ID0gJHtpbmRleH0pLCBpZ25vcmluZyBkdXBsaWNhdGVkIGVudHJpZXMuYCxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gc2V0IHRvIHRoZSBgaHVtYW5Cb25lc2BcbiAgICAgICAgICBodW1hbkJvbmVzW25ld0JvbmVOYW1lXSA9IHsgbm9kZSB9O1xuICAgICAgICB9KSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgaHVtYW5vaWQgPSBuZXcgVlJNSHVtYW5vaWQodGhpcy5fZW5zdXJlUmVxdWlyZWRCb25lc0V4aXN0KGh1bWFuQm9uZXMpLCB7XG4gICAgICBhdXRvVXBkYXRlSHVtYW5Cb25lczogdGhpcy5hdXRvVXBkYXRlSHVtYW5Cb25lcyxcbiAgICB9KTtcbiAgICBnbHRmLnNjZW5lLmFkZChodW1hbm9pZC5ub3JtYWxpemVkSHVtYW5Cb25lc1Jvb3QpO1xuXG4gICAgaWYgKHRoaXMuaGVscGVyUm9vdCkge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IFZSTUh1bWFub2lkSGVscGVyKGh1bWFub2lkKTtcbiAgICAgIHRoaXMuaGVscGVyUm9vdC5hZGQoaGVscGVyKTtcbiAgICAgIGhlbHBlci5yZW5kZXJPcmRlciA9IHRoaXMuaGVscGVyUm9vdC5yZW5kZXJPcmRlcjtcbiAgICB9XG5cbiAgICByZXR1cm4gaHVtYW5vaWQ7XG4gIH1cblxuICAvKipcbiAgICogRW5zdXJlIHJlcXVpcmVkIGJvbmVzIGV4aXN0IGluIGdpdmVuIGh1bWFuIGJvbmVzLlxuICAgKiBAcGFyYW0gaHVtYW5Cb25lcyBIdW1hbiBib25lc1xuICAgKiBAcmV0dXJucyBIdW1hbiBib25lcywgbm8gbG9uZ2VyIHBhcnRpYWwhXG4gICAqL1xuICBwcml2YXRlIF9lbnN1cmVSZXF1aXJlZEJvbmVzRXhpc3QoaHVtYW5Cb25lczogUGFydGlhbDxWUk1IdW1hbkJvbmVzPik6IFZSTUh1bWFuQm9uZXMge1xuICAgIC8vIGVuc3VyZSByZXF1aXJlZCBib25lcyBleGlzdFxuICAgIGNvbnN0IG1pc3NpbmdSZXF1aXJlZEJvbmVzID0gT2JqZWN0LnZhbHVlcyhWUk1SZXF1aXJlZEh1bWFuQm9uZU5hbWUpLmZpbHRlcihcbiAgICAgIChyZXF1aXJlZEJvbmVOYW1lKSA9PiBodW1hbkJvbmVzW3JlcXVpcmVkQm9uZU5hbWVdID09IG51bGwsXG4gICAgKTtcblxuICAgIC8vIHRocm93IGFuIGVycm9yIGlmIHRoZXJlIGFyZSBtaXNzaW5nIGJvbmVzXG4gICAgaWYgKG1pc3NpbmdSZXF1aXJlZEJvbmVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYFZSTUh1bWFub2lkTG9hZGVyUGx1Z2luOiBUaGVzZSBodW1hbm9pZCBib25lcyBhcmUgcmVxdWlyZWQgYnV0IG5vdCBleGlzdDogJHttaXNzaW5nUmVxdWlyZWRCb25lcy5qb2luKCcsICcpfWAsXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBodW1hbkJvbmVzIGFzIFZSTUh1bWFuQm9uZXM7XG4gIH1cbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1Mb29rQXQgfSBmcm9tICcuLi9WUk1Mb29rQXQnO1xuaW1wb3J0IHsgRmFuQnVmZmVyR2VvbWV0cnkgfSBmcm9tICcuL3V0aWxzL0ZhbkJ1ZmZlckdlb21ldHJ5JztcbmltcG9ydCB7IExpbmVBbmRTcGhlcmVCdWZmZXJHZW9tZXRyeSB9IGZyb20gJy4vdXRpbHMvTGluZUFuZFNwaGVyZUJ1ZmZlckdlb21ldHJ5JztcblxuY29uc3QgX3F1YXRBID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbmNvbnN0IF9xdWF0QiA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF92M0IgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5jb25zdCBTUVJUXzJfT1ZFUl8yID0gTWF0aC5zcXJ0KDIuMCkgLyAyLjA7XG5jb25zdCBRVUFUX1hZX0NXOTAgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigwLCAwLCAtU1FSVF8yX09WRVJfMiwgU1FSVF8yX09WRVJfMik7XG5jb25zdCBWRUMzX1BPU0lUSVZFX1kgPSBuZXcgVEhSRUUuVmVjdG9yMygwLjAsIDEuMCwgMC4wKTtcblxuZXhwb3J0IGNsYXNzIFZSTUxvb2tBdEhlbHBlciBleHRlbmRzIFRIUkVFLkdyb3VwIHtcbiAgcHVibGljIHJlYWRvbmx5IHZybUxvb2tBdDogVlJNTG9va0F0O1xuICBwcml2YXRlIHJlYWRvbmx5IF9tZXNoWWF3OiBUSFJFRS5NZXNoPEZhbkJ1ZmZlckdlb21ldHJ5LCBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbD47XG4gIHByaXZhdGUgcmVhZG9ubHkgX21lc2hQaXRjaDogVEhSRUUuTWVzaDxGYW5CdWZmZXJHZW9tZXRyeSwgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWw+O1xuICBwcml2YXRlIHJlYWRvbmx5IF9saW5lVGFyZ2V0OiBUSFJFRS5MaW5lU2VnbWVudHM8TGluZUFuZFNwaGVyZUJ1ZmZlckdlb21ldHJ5LCBUSFJFRS5MaW5lQmFzaWNNYXRlcmlhbD47XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGxvb2tBdDogVlJNTG9va0F0KSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLm1hdHJpeEF1dG9VcGRhdGUgPSBmYWxzZTtcblxuICAgIHRoaXMudnJtTG9va0F0ID0gbG9va0F0O1xuXG4gICAge1xuICAgICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgRmFuQnVmZmVyR2VvbWV0cnkoKTtcbiAgICAgIGdlb21ldHJ5LnJhZGl1cyA9IDAuNTtcblxuICAgICAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICAgICAgICBjb2xvcjogMHgwMGZmMDAsXG4gICAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgICAgICBvcGFjaXR5OiAwLjUsXG4gICAgICAgIHNpZGU6IFRIUkVFLkRvdWJsZVNpZGUsXG4gICAgICAgIGRlcHRoVGVzdDogZmFsc2UsXG4gICAgICAgIGRlcHRoV3JpdGU6IGZhbHNlLFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuX21lc2hQaXRjaCA9IG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCk7XG4gICAgICB0aGlzLmFkZCh0aGlzLl9tZXNoUGl0Y2gpO1xuICAgIH1cblxuICAgIHtcbiAgICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IEZhbkJ1ZmZlckdlb21ldHJ5KCk7XG4gICAgICBnZW9tZXRyeS5yYWRpdXMgPSAwLjU7XG5cbiAgICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAgICAgICAgY29sb3I6IDB4ZmYwMDAwLFxuICAgICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICAgICAgb3BhY2l0eTogMC41LFxuICAgICAgICBzaWRlOiBUSFJFRS5Eb3VibGVTaWRlLFxuICAgICAgICBkZXB0aFRlc3Q6IGZhbHNlLFxuICAgICAgICBkZXB0aFdyaXRlOiBmYWxzZSxcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLl9tZXNoWWF3ID0gbmV3IFRIUkVFLk1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKTtcbiAgICAgIHRoaXMuYWRkKHRoaXMuX21lc2hZYXcpO1xuICAgIH1cblxuICAgIHtcbiAgICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IExpbmVBbmRTcGhlcmVCdWZmZXJHZW9tZXRyeSgpO1xuICAgICAgZ2VvbWV0cnkucmFkaXVzID0gMC4xO1xuXG4gICAgICBjb25zdCBtYXRlcmlhbCA9IG5ldyBUSFJFRS5MaW5lQmFzaWNNYXRlcmlhbCh7XG4gICAgICAgIGNvbG9yOiAweGZmZmZmZixcbiAgICAgICAgZGVwdGhUZXN0OiBmYWxzZSxcbiAgICAgICAgZGVwdGhXcml0ZTogZmFsc2UsXG4gICAgICB9KTtcblxuICAgICAgdGhpcy5fbGluZVRhcmdldCA9IG5ldyBUSFJFRS5MaW5lU2VnbWVudHMoZ2VvbWV0cnksIG1hdGVyaWFsKTtcbiAgICAgIHRoaXMuX2xpbmVUYXJnZXQuZnJ1c3R1bUN1bGxlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5hZGQodGhpcy5fbGluZVRhcmdldCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5fbWVzaFlhdy5nZW9tZXRyeS5kaXNwb3NlKCk7XG4gICAgdGhpcy5fbWVzaFlhdy5tYXRlcmlhbC5kaXNwb3NlKCk7XG5cbiAgICB0aGlzLl9tZXNoUGl0Y2guZ2VvbWV0cnkuZGlzcG9zZSgpO1xuICAgIHRoaXMuX21lc2hQaXRjaC5tYXRlcmlhbC5kaXNwb3NlKCk7XG5cbiAgICB0aGlzLl9saW5lVGFyZ2V0Lmdlb21ldHJ5LmRpc3Bvc2UoKTtcbiAgICB0aGlzLl9saW5lVGFyZ2V0Lm1hdGVyaWFsLmRpc3Bvc2UoKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVNYXRyaXhXb3JsZChmb3JjZTogYm9vbGVhbik6IHZvaWQge1xuICAgIC8vIHVwZGF0ZSBnZW9tZXRyaWVzXG4gICAgY29uc3QgeWF3ID0gVEhSRUUuTWF0aFV0aWxzLkRFRzJSQUQgKiB0aGlzLnZybUxvb2tBdC55YXc7XG4gICAgdGhpcy5fbWVzaFlhdy5nZW9tZXRyeS50aGV0YSA9IHlhdztcbiAgICB0aGlzLl9tZXNoWWF3Lmdlb21ldHJ5LnVwZGF0ZSgpO1xuXG4gICAgY29uc3QgcGl0Y2ggPSBUSFJFRS5NYXRoVXRpbHMuREVHMlJBRCAqIHRoaXMudnJtTG9va0F0LnBpdGNoO1xuICAgIHRoaXMuX21lc2hQaXRjaC5nZW9tZXRyeS50aGV0YSA9IHBpdGNoO1xuICAgIHRoaXMuX21lc2hQaXRjaC5nZW9tZXRyeS51cGRhdGUoKTtcblxuICAgIC8vIGdldCB3b3JsZCBwb3NpdGlvbiBhbmQgcXVhdGVybmlvblxuICAgIHRoaXMudnJtTG9va0F0LmdldExvb2tBdFdvcmxkUG9zaXRpb24oX3YzQSk7XG4gICAgdGhpcy52cm1Mb29rQXQuZ2V0TG9va0F0V29ybGRRdWF0ZXJuaW9uKF9xdWF0QSk7XG5cbiAgICAvLyBjYWxjdWxhdGUgcm90YXRpb24gdXNpbmcgZmFjZUZyb250XG4gICAgX3F1YXRBLm11bHRpcGx5KHRoaXMudnJtTG9va0F0LmdldEZhY2VGcm9udFF1YXRlcm5pb24oX3F1YXRCKSk7XG5cbiAgICAvLyBzZXQgdHJhbnNmb3JtIHRvIG1lc2hlc1xuICAgIHRoaXMuX21lc2hZYXcucG9zaXRpb24uY29weShfdjNBKTtcbiAgICB0aGlzLl9tZXNoWWF3LnF1YXRlcm5pb24uY29weShfcXVhdEEpO1xuXG4gICAgdGhpcy5fbWVzaFBpdGNoLnBvc2l0aW9uLmNvcHkoX3YzQSk7XG4gICAgdGhpcy5fbWVzaFBpdGNoLnF1YXRlcm5pb24uY29weShfcXVhdEEpO1xuICAgIHRoaXMuX21lc2hQaXRjaC5xdWF0ZXJuaW9uLm11bHRpcGx5KF9xdWF0Qi5zZXRGcm9tQXhpc0FuZ2xlKFZFQzNfUE9TSVRJVkVfWSwgeWF3KSk7XG4gICAgdGhpcy5fbWVzaFBpdGNoLnF1YXRlcm5pb24ubXVsdGlwbHkoUVVBVF9YWV9DVzkwKTtcblxuICAgIC8vIHVwZGF0ZSB0YXJnZXQgbGluZSBhbmQgc3BoZXJlXG4gICAgY29uc3QgeyB0YXJnZXQsIGF1dG9VcGRhdGUgfSA9IHRoaXMudnJtTG9va0F0O1xuICAgIGlmICh0YXJnZXQgIT0gbnVsbCAmJiBhdXRvVXBkYXRlKSB7XG4gICAgICB0YXJnZXQuZ2V0V29ybGRQb3NpdGlvbihfdjNCKS5zdWIoX3YzQSk7XG4gICAgICB0aGlzLl9saW5lVGFyZ2V0Lmdlb21ldHJ5LnRhaWwuY29weShfdjNCKTtcbiAgICAgIHRoaXMuX2xpbmVUYXJnZXQuZ2VvbWV0cnkudXBkYXRlKCk7XG4gICAgICB0aGlzLl9saW5lVGFyZ2V0LnBvc2l0aW9uLmNvcHkoX3YzQSk7XG4gICAgfVxuXG4gICAgLy8gYXBwbHkgdHJhbnNmb3JtIHRvIG1lc2hlc1xuICAgIHN1cGVyLnVwZGF0ZU1hdHJpeFdvcmxkKGZvcmNlKTtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuZXhwb3J0IGNsYXNzIEZhbkJ1ZmZlckdlb21ldHJ5IGV4dGVuZHMgVEhSRUUuQnVmZmVyR2VvbWV0cnkge1xuICBwdWJsaWMgdGhldGE6IG51bWJlcjtcbiAgcHVibGljIHJhZGl1czogbnVtYmVyO1xuICBwcml2YXRlIF9jdXJyZW50VGhldGEgPSAwO1xuICBwcml2YXRlIF9jdXJyZW50UmFkaXVzID0gMDtcbiAgcHJpdmF0ZSByZWFkb25seSBfYXR0clBvczogVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xuICBwcml2YXRlIHJlYWRvbmx5IF9hdHRySW5kZXg6IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZTtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMudGhldGEgPSAwLjA7XG4gICAgdGhpcy5yYWRpdXMgPSAwLjA7XG4gICAgdGhpcy5fY3VycmVudFRoZXRhID0gMC4wO1xuICAgIHRoaXMuX2N1cnJlbnRSYWRpdXMgPSAwLjA7XG5cbiAgICB0aGlzLl9hdHRyUG9zID0gbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShuZXcgRmxvYXQzMkFycmF5KDY1ICogMyksIDMpO1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKCdwb3NpdGlvbicsIHRoaXMuX2F0dHJQb3MpO1xuXG4gICAgdGhpcy5fYXR0ckluZGV4ID0gbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShuZXcgVWludDE2QXJyYXkoMyAqIDYzKSwgMSk7XG4gICAgdGhpcy5zZXRJbmRleCh0aGlzLl9hdHRySW5kZXgpO1xuXG4gICAgdGhpcy5fYnVpbGRJbmRleCgpO1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIGxldCBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IGZhbHNlO1xuXG4gICAgaWYgKHRoaXMuX2N1cnJlbnRUaGV0YSAhPT0gdGhpcy50aGV0YSkge1xuICAgICAgdGhpcy5fY3VycmVudFRoZXRhID0gdGhpcy50aGV0YTtcbiAgICAgIHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fY3VycmVudFJhZGl1cyAhPT0gdGhpcy5yYWRpdXMpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRSYWRpdXMgPSB0aGlzLnJhZGl1cztcbiAgICAgIHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoc2hvdWxkVXBkYXRlR2VvbWV0cnkpIHtcbiAgICAgIHRoaXMuX2J1aWxkUG9zaXRpb24oKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9idWlsZFBvc2l0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKDAsIDAuMCwgMC4wLCAwLjApO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA2NDsgaSsrKSB7XG4gICAgICBjb25zdCB0ID0gKGkgLyA2My4wKSAqIHRoaXMuX2N1cnJlbnRUaGV0YTtcblxuICAgICAgdGhpcy5fYXR0clBvcy5zZXRYWVooaSArIDEsIHRoaXMuX2N1cnJlbnRSYWRpdXMgKiBNYXRoLnNpbih0KSwgMC4wLCB0aGlzLl9jdXJyZW50UmFkaXVzICogTWF0aC5jb3ModCkpO1xuICAgIH1cblxuICAgIHRoaXMuX2F0dHJQb3MubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRJbmRleCgpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDYzOyBpKyspIHtcbiAgICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWVooaSAqIDMsIDAsIGkgKyAxLCBpICsgMik7XG4gICAgfVxuXG4gICAgdGhpcy5fYXR0ckluZGV4Lm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuZXhwb3J0IGNsYXNzIExpbmVBbmRTcGhlcmVCdWZmZXJHZW9tZXRyeSBleHRlbmRzIFRIUkVFLkJ1ZmZlckdlb21ldHJ5IHtcbiAgcHVibGljIHJhZGl1czogbnVtYmVyO1xuICBwdWJsaWMgdGFpbDogVEhSRUUuVmVjdG9yMztcbiAgcHJpdmF0ZSBfY3VycmVudFJhZGl1czogbnVtYmVyO1xuICBwcml2YXRlIF9jdXJyZW50VGFpbDogVEhSRUUuVmVjdG9yMztcbiAgcHJpdmF0ZSByZWFkb25seSBfYXR0clBvczogVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xuICBwcml2YXRlIHJlYWRvbmx5IF9hdHRySW5kZXg6IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZTtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMucmFkaXVzID0gMC4wO1xuICAgIHRoaXMuX2N1cnJlbnRSYWRpdXMgPSAwLjA7XG5cbiAgICB0aGlzLnRhaWwgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuICAgIHRoaXMuX2N1cnJlbnRUYWlsID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuICAgIHRoaXMuX2F0dHJQb3MgPSBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKG5ldyBGbG9hdDMyQXJyYXkoMjk0KSwgMyk7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJywgdGhpcy5fYXR0clBvcyk7XG5cbiAgICB0aGlzLl9hdHRySW5kZXggPSBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKG5ldyBVaW50MTZBcnJheSgxOTQpLCAxKTtcbiAgICB0aGlzLnNldEluZGV4KHRoaXMuX2F0dHJJbmRleCk7XG5cbiAgICB0aGlzLl9idWlsZEluZGV4KCk7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgbGV0IHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gZmFsc2U7XG5cbiAgICBpZiAodGhpcy5fY3VycmVudFJhZGl1cyAhPT0gdGhpcy5yYWRpdXMpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRSYWRpdXMgPSB0aGlzLnJhZGl1cztcbiAgICAgIHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX2N1cnJlbnRUYWlsLmVxdWFscyh0aGlzLnRhaWwpKSB7XG4gICAgICB0aGlzLl9jdXJyZW50VGFpbC5jb3B5KHRoaXMudGFpbCk7XG4gICAgICBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHNob3VsZFVwZGF0ZUdlb21ldHJ5KSB7XG4gICAgICB0aGlzLl9idWlsZFBvc2l0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRQb3NpdGlvbigpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDMyOyBpKyspIHtcbiAgICAgIGNvbnN0IHQgPSAoaSAvIDE2LjApICogTWF0aC5QSTtcblxuICAgICAgdGhpcy5fYXR0clBvcy5zZXRYWVooaSwgTWF0aC5jb3ModCksIE1hdGguc2luKHQpLCAwLjApO1xuICAgICAgdGhpcy5fYXR0clBvcy5zZXRYWVooMzIgKyBpLCAwLjAsIE1hdGguY29zKHQpLCBNYXRoLnNpbih0KSk7XG4gICAgICB0aGlzLl9hdHRyUG9zLnNldFhZWig2NCArIGksIE1hdGguc2luKHQpLCAwLjAsIE1hdGguY29zKHQpKTtcbiAgICB9XG5cbiAgICB0aGlzLnNjYWxlKHRoaXMuX2N1cnJlbnRSYWRpdXMsIHRoaXMuX2N1cnJlbnRSYWRpdXMsIHRoaXMuX2N1cnJlbnRSYWRpdXMpO1xuICAgIHRoaXMudHJhbnNsYXRlKHRoaXMuX2N1cnJlbnRUYWlsLngsIHRoaXMuX2N1cnJlbnRUYWlsLnksIHRoaXMuX2N1cnJlbnRUYWlsLnopO1xuXG4gICAgdGhpcy5fYXR0clBvcy5zZXRYWVooOTYsIDAsIDAsIDApO1xuICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKDk3LCB0aGlzLl9jdXJyZW50VGFpbC54LCB0aGlzLl9jdXJyZW50VGFpbC55LCB0aGlzLl9jdXJyZW50VGFpbC56KTtcblxuICAgIHRoaXMuX2F0dHJQb3MubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRJbmRleCgpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDMyOyBpKyspIHtcbiAgICAgIGNvbnN0IGkxID0gKGkgKyAxKSAlIDMyO1xuXG4gICAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoaSAqIDIsIGksIGkxKTtcbiAgICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWSg2NCArIGkgKiAyLCAzMiArIGksIDMyICsgaTEpO1xuICAgICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKDEyOCArIGkgKiAyLCA2NCArIGksIDY0ICsgaTEpO1xuICAgIH1cbiAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoMTkyLCA5NiwgOTcpO1xuXG4gICAgdGhpcy5fYXR0ckluZGV4Lm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTUh1bWFub2lkIH0gZnJvbSAnLi4vaHVtYW5vaWQnO1xuaW1wb3J0IHsgZ2V0V29ybGRRdWF0ZXJuaW9uTGl0ZSB9IGZyb20gJy4uL3V0aWxzL2dldFdvcmxkUXVhdGVybmlvbkxpdGUnO1xuaW1wb3J0IHsgcXVhdEludmVydENvbXBhdCB9IGZyb20gJy4uL3V0aWxzL3F1YXRJbnZlcnRDb21wYXQnO1xuaW1wb3J0IHsgY2FsY0F6aW11dGhBbHRpdHVkZSB9IGZyb20gJy4vdXRpbHMvY2FsY0F6aW11dGhBbHRpdHVkZSc7XG5pbXBvcnQgdHlwZSB7IFZSTUxvb2tBdEFwcGxpZXIgfSBmcm9tICcuL1ZSTUxvb2tBdEFwcGxpZXInO1xuaW1wb3J0IHsgc2FuaXRpemVBbmdsZSB9IGZyb20gJy4vdXRpbHMvc2FuaXRpemVBbmdsZSc7XG5cbmNvbnN0IFZFQzNfUE9TSVRJVkVfWiA9IG5ldyBUSFJFRS5WZWN0b3IzKDAuMCwgMC4wLCAxLjApO1xuXG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF92M0IgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3YzQyA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfcXVhdEEgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuY29uc3QgX3F1YXRCID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbmNvbnN0IF9xdWF0QyA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5jb25zdCBfcXVhdEQgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuY29uc3QgX2V1bGVyQSA9IG5ldyBUSFJFRS5FdWxlcigpO1xuXG4vKipcbiAqIEEgY2xhc3MgY29udHJvbHMgZXllIGdhemUgbW92ZW1lbnRzIG9mIGEgVlJNLlxuICovXG5leHBvcnQgY2xhc3MgVlJNTG9va0F0IHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBFVUxFUl9PUkRFUiA9ICdZWFonOyAvLyB5YXctcGl0Y2gtcm9sbFxuXG4gIC8qKlxuICAgKiBUaGUgb3JpZ2luIG9mIExvb2tBdC4gUG9zaXRpb24gb2Zmc2V0IGZyb20gdGhlIGhlYWQgYm9uZS5cbiAgICovXG4gIHB1YmxpYyBvZmZzZXRGcm9tSGVhZEJvbmUgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4gIC8qKlxuICAgKiBJdHMgYXNzb2NpYXRlZCB7QGxpbmsgVlJNSHVtYW5vaWR9LlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGh1bWFub2lkOiBWUk1IdW1hbm9pZDtcblxuICAvKipcbiAgICogVGhlIHtAbGluayBWUk1Mb29rQXRBcHBsaWVyfSBvZiB0aGUgTG9va0F0LlxuICAgKi9cbiAgcHVibGljIGFwcGxpZXI6IFZSTUxvb2tBdEFwcGxpZXI7XG5cbiAgLyoqXG4gICAqIElmIHRoaXMgaXMgdHJ1ZSwgdGhlIExvb2tBdCB3aWxsIGJlIHVwZGF0ZWQgYXV0b21hdGljYWxseSBieSBjYWxsaW5nIHtAbGluayB1cGRhdGV9LCB0b3dhcmRpbmcgdGhlIGRpcmVjdGlvbiB0byB0aGUge0BsaW5rIHRhcmdldH0uXG4gICAqIGB0cnVlYCBieSBkZWZhdWx0LlxuICAgKlxuICAgKiBTZWUgYWxzbzoge0BsaW5rIHRhcmdldH1cbiAgICovXG4gIHB1YmxpYyBhdXRvVXBkYXRlID0gdHJ1ZTtcblxuICAvKipcbiAgICogVGhlIHRhcmdldCBvYmplY3Qgb2YgdGhlIExvb2tBdC5cbiAgICogTm90ZSB0aGF0IGl0IGRvZXMgbm90IG1ha2UgYW55IHNlbnNlIGlmIHtAbGluayBhdXRvVXBkYXRlfSBpcyBkaXNhYmxlZC5cbiAgICpcbiAgICogU2VlIGFsc286IHtAbGluayBhdXRvVXBkYXRlfVxuICAgKi9cbiAgcHVibGljIHRhcmdldD86IFRIUkVFLk9iamVjdDNEIHwgbnVsbDtcblxuICAvKipcbiAgICogVGhlIGZyb250IGRpcmVjdGlvbiBvZiB0aGUgZmFjZS5cbiAgICogSW50ZW5kZWQgdG8gYmUgdXNlZCBmb3IgVlJNIDAuMCBjb21wYXQgKFZSTSAwLjAgbW9kZWxzIGFyZSBmYWNpbmcgWi0gaW5zdGVhZCBvZiBaKykuXG4gICAqIFlvdSB1c3VhbGx5IGRvbid0IHdhbnQgdG8gdG91Y2ggdGhpcy5cbiAgICovXG4gIHB1YmxpYyBmYWNlRnJvbnQgPSBuZXcgVEhSRUUuVmVjdG9yMygwLjAsIDAuMCwgMS4wKTtcblxuICAvKipcbiAgICogSXRzIGN1cnJlbnQgYW5nbGUgYXJvdW5kIFkgYXhpcywgaW4gZGVncmVlLlxuICAgKi9cbiAgcHJvdGVjdGVkIF95YXc6IG51bWJlcjtcblxuICAvKipcbiAgICogSXRzIGN1cnJlbnQgYW5nbGUgYXJvdW5kIFkgYXhpcywgaW4gZGVncmVlLlxuICAgKi9cbiAgcHVibGljIGdldCB5YXcoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5feWF3O1xuICB9XG5cbiAgLyoqXG4gICAqIEl0cyBjdXJyZW50IGFuZ2xlIGFyb3VuZCBZIGF4aXMsIGluIGRlZ3JlZS5cbiAgICovXG4gIHB1YmxpYyBzZXQgeWF3KHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl95YXcgPSB2YWx1ZTtcbiAgICB0aGlzLl9uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogSXRzIGN1cnJlbnQgYW5nbGUgYXJvdW5kIFggYXhpcywgaW4gZGVncmVlLlxuICAgKi9cbiAgcHJvdGVjdGVkIF9waXRjaDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBJdHMgY3VycmVudCBhbmdsZSBhcm91bmQgWCBheGlzLCBpbiBkZWdyZWUuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHBpdGNoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3BpdGNoO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0cyBjdXJyZW50IGFuZ2xlIGFyb3VuZCBYIGF4aXMsIGluIGRlZ3JlZS5cbiAgICovXG4gIHB1YmxpYyBzZXQgcGl0Y2godmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX3BpdGNoID0gdmFsdWU7XG4gICAgdGhpcy5fbmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNwZWNpZmllcyB0aGF0IGFuZ2xlcyBuZWVkIHRvIGJlIGFwcGxpZWQgdG8gaXRzIFtAbGluayBhcHBsaWVyXS5cbiAgICovXG4gIHByb3RlY3RlZCBfbmVlZHNVcGRhdGU6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFdvcmxkIHJvdGF0aW9uIG9mIHRoZSBoZWFkIGluIGl0cyByZXN0IHBvc2UuXG4gICAqL1xuICBwcml2YXRlIF9yZXN0SGVhZFdvcmxkUXVhdGVybmlvbjogVEhSRUUuUXVhdGVybmlvbjtcblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVXNlIHtAbGluayBnZXRFdWxlcn0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBnZXQgZXVsZXIoKTogVEhSRUUuRXVsZXIge1xuICAgIGNvbnNvbGUud2FybignVlJNTG9va0F0OiBldWxlciBpcyBkZXByZWNhdGVkLiB1c2UgZ2V0RXVsZXIoKSBpbnN0ZWFkLicpO1xuXG4gICAgcmV0dXJuIHRoaXMuZ2V0RXVsZXIobmV3IFRIUkVFLkV1bGVyKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyB7QGxpbmsgVlJNTG9va0F0fS5cbiAgICpcbiAgICogQHBhcmFtIGh1bWFub2lkIEEge0BsaW5rIFZSTUh1bWFub2lkfVxuICAgKiBAcGFyYW0gYXBwbGllciBBIHtAbGluayBWUk1Mb29rQXRBcHBsaWVyfVxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKGh1bWFub2lkOiBWUk1IdW1hbm9pZCwgYXBwbGllcjogVlJNTG9va0F0QXBwbGllcikge1xuICAgIHRoaXMuaHVtYW5vaWQgPSBodW1hbm9pZDtcbiAgICB0aGlzLmFwcGxpZXIgPSBhcHBsaWVyO1xuXG4gICAgdGhpcy5feWF3ID0gMC4wO1xuICAgIHRoaXMuX3BpdGNoID0gMC4wO1xuICAgIHRoaXMuX25lZWRzVXBkYXRlID0gdHJ1ZTtcblxuICAgIHRoaXMuX3Jlc3RIZWFkV29ybGRRdWF0ZXJuaW9uID0gdGhpcy5nZXRMb29rQXRXb3JsZFF1YXRlcm5pb24obmV3IFRIUkVFLlF1YXRlcm5pb24oKSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGl0cyB5YXctcGl0Y2ggYW5nbGVzIGFzIGFuIGBFdWxlcmAuXG4gICAqIERvZXMgTk9UIGNvbnNpZGVyIHtAbGluayBmYWNlRnJvbnR9OyBpdCByZXR1cm5zIGBFdWxlcigwLCAwLCAwOyBcIllYWlwiKWAgYnkgZGVmYXVsdCByZWdhcmRsZXNzIG9mIHRoZSBmYWNlRnJvbnQgdmFsdWUuXG4gICAqXG4gICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBldWxlclxuICAgKi9cbiAgcHVibGljIGdldEV1bGVyKHRhcmdldDogVEhSRUUuRXVsZXIpOiBUSFJFRS5FdWxlciB7XG4gICAgcmV0dXJuIHRhcmdldC5zZXQoVEhSRUUuTWF0aFV0aWxzLkRFRzJSQUQgKiB0aGlzLl9waXRjaCwgVEhSRUUuTWF0aFV0aWxzLkRFRzJSQUQgKiB0aGlzLl95YXcsIDAuMCwgJ1lYWicpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvcHkgdGhlIGdpdmVuIHtAbGluayBWUk1Mb29rQXR9IGludG8gdGhpcyBvbmUuXG4gICAqIHtAbGluayBodW1hbm9pZH0gbXVzdCBiZSBzYW1lIGFzIHRoZSBzb3VyY2Ugb25lLlxuICAgKiB7QGxpbmsgYXBwbGllcn0gd2lsbCByZWZlcmVuY2UgdGhlIHNhbWUgaW5zdGFuY2UgYXMgdGhlIHNvdXJjZSBvbmUuXG4gICAqIEBwYXJhbSBzb3VyY2UgVGhlIHtAbGluayBWUk1Mb29rQXR9IHlvdSB3YW50IHRvIGNvcHlcbiAgICogQHJldHVybnMgdGhpc1xuICAgKi9cbiAgcHVibGljIGNvcHkoc291cmNlOiBWUk1Mb29rQXQpOiB0aGlzIHtcbiAgICBpZiAodGhpcy5odW1hbm9pZCAhPT0gc291cmNlLmh1bWFub2lkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZSTUxvb2tBdDogaHVtYW5vaWQgbXVzdCBiZSBzYW1lIGluIG9yZGVyIHRvIGNvcHknKTtcbiAgICB9XG5cbiAgICB0aGlzLm9mZnNldEZyb21IZWFkQm9uZS5jb3B5KHNvdXJjZS5vZmZzZXRGcm9tSGVhZEJvbmUpO1xuICAgIHRoaXMuYXBwbGllciA9IHNvdXJjZS5hcHBsaWVyO1xuICAgIHRoaXMuYXV0b1VwZGF0ZSA9IHNvdXJjZS5hdXRvVXBkYXRlO1xuICAgIHRoaXMudGFyZ2V0ID0gc291cmNlLnRhcmdldDtcbiAgICB0aGlzLmZhY2VGcm9udC5jb3B5KHNvdXJjZS5mYWNlRnJvbnQpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGNsb25lIG9mIHRoaXMge0BsaW5rIFZSTUxvb2tBdH0uXG4gICAqIE5vdGUgdGhhdCB7QGxpbmsgaHVtYW5vaWR9IGFuZCB7QGxpbmsgYXBwbGllcn0gd2lsbCByZWZlcmVuY2UgdGhlIHNhbWUgaW5zdGFuY2UgYXMgdGhpcyBvbmUuXG4gICAqIEByZXR1cm5zIENvcGllZCB7QGxpbmsgVlJNTG9va0F0fVxuICAgKi9cbiAgcHVibGljIGNsb25lKCk6IFZSTUxvb2tBdCB7XG4gICAgcmV0dXJuIG5ldyBWUk1Mb29rQXQodGhpcy5odW1hbm9pZCwgdGhpcy5hcHBsaWVyKS5jb3B5KHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoZSBsb29rQXQgZGlyZWN0aW9uICh5YXcgYW5kIHBpdGNoKSB0byB0aGUgaW5pdGlhbCBkaXJlY3Rpb24uXG4gICAqL1xuICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy5feWF3ID0gMC4wO1xuICAgIHRoaXMuX3BpdGNoID0gMC4wO1xuICAgIHRoaXMuX25lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgaXRzIGxvb2tBdCBwb3NpdGlvbiBpbiB3b3JsZCBjb29yZGluYXRlLlxuICAgKlxuICAgKiBAcGFyYW0gdGFyZ2V0IEEgdGFyZ2V0IGBUSFJFRS5WZWN0b3IzYFxuICAgKi9cbiAgcHVibGljIGdldExvb2tBdFdvcmxkUG9zaXRpb24odGFyZ2V0OiBUSFJFRS5WZWN0b3IzKTogVEhSRUUuVmVjdG9yMyB7XG4gICAgY29uc3QgaGVhZCA9IHRoaXMuaHVtYW5vaWQuZ2V0UmF3Qm9uZU5vZGUoJ2hlYWQnKSE7XG5cbiAgICByZXR1cm4gdGFyZ2V0LmNvcHkodGhpcy5vZmZzZXRGcm9tSGVhZEJvbmUpLmFwcGx5TWF0cml4NChoZWFkLm1hdHJpeFdvcmxkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgaXRzIGxvb2tBdCByb3RhdGlvbiBpbiB3b3JsZCBjb29yZGluYXRlLlxuICAgKiBEb2VzIE5PVCBjb25zaWRlciB7QGxpbmsgZmFjZUZyb250fS5cbiAgICpcbiAgICogQHBhcmFtIHRhcmdldCBBIHRhcmdldCBgVEhSRUUuUXVhdGVybmlvbmBcbiAgICovXG4gIHB1YmxpYyBnZXRMb29rQXRXb3JsZFF1YXRlcm5pb24odGFyZ2V0OiBUSFJFRS5RdWF0ZXJuaW9uKTogVEhSRUUuUXVhdGVybmlvbiB7XG4gICAgY29uc3QgaGVhZCA9IHRoaXMuaHVtYW5vaWQuZ2V0UmF3Qm9uZU5vZGUoJ2hlYWQnKSE7XG5cbiAgICByZXR1cm4gZ2V0V29ybGRRdWF0ZXJuaW9uTGl0ZShoZWFkLCB0YXJnZXQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIHF1YXRlcm5pb24gdGhhdCByb3RhdGVzIHRoZSArWiB1bml0IHZlY3RvciBvZiB0aGUgaHVtYW5vaWQgSGVhZCB0byB0aGUge0BsaW5rIGZhY2VGcm9udH0gZGlyZWN0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0gdGFyZ2V0IEEgdGFyZ2V0IGBUSFJFRS5RdWF0ZXJuaW9uYFxuICAgKi9cbiAgcHVibGljIGdldEZhY2VGcm9udFF1YXRlcm5pb24odGFyZ2V0OiBUSFJFRS5RdWF0ZXJuaW9uKTogVEhSRUUuUXVhdGVybmlvbiB7XG4gICAgaWYgKHRoaXMuZmFjZUZyb250LmRpc3RhbmNlVG9TcXVhcmVkKFZFQzNfUE9TSVRJVkVfWikgPCAwLjAxKSB7XG4gICAgICByZXR1cm4gdGFyZ2V0LmNvcHkodGhpcy5fcmVzdEhlYWRXb3JsZFF1YXRlcm5pb24pLmludmVydCgpO1xuICAgIH1cblxuICAgIGNvbnN0IFtmYWNlRnJvbnRBemltdXRoLCBmYWNlRnJvbnRBbHRpdHVkZV0gPSBjYWxjQXppbXV0aEFsdGl0dWRlKHRoaXMuZmFjZUZyb250KTtcbiAgICBfZXVsZXJBLnNldCgwLjAsIDAuNSAqIE1hdGguUEkgKyBmYWNlRnJvbnRBemltdXRoLCBmYWNlRnJvbnRBbHRpdHVkZSwgJ1laWCcpO1xuXG4gICAgcmV0dXJuIHRhcmdldC5zZXRGcm9tRXVsZXIoX2V1bGVyQSkucHJlbXVsdGlwbHkoX3F1YXRELmNvcHkodGhpcy5fcmVzdEhlYWRXb3JsZFF1YXRlcm5pb24pLmludmVydCgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgaXRzIExvb2tBdCBkaXJlY3Rpb24gaW4gd29ybGQgY29vcmRpbmF0ZS5cbiAgICpcbiAgICogQHBhcmFtIHRhcmdldCBBIHRhcmdldCBgVEhSRUUuVmVjdG9yM2BcbiAgICovXG4gIHB1YmxpYyBnZXRMb29rQXRXb3JsZERpcmVjdGlvbih0YXJnZXQ6IFRIUkVFLlZlY3RvcjMpOiBUSFJFRS5WZWN0b3IzIHtcbiAgICB0aGlzLmdldExvb2tBdFdvcmxkUXVhdGVybmlvbihfcXVhdEIpO1xuICAgIHRoaXMuZ2V0RmFjZUZyb250UXVhdGVybmlvbihfcXVhdEMpO1xuXG4gICAgcmV0dXJuIHRhcmdldFxuICAgICAgLmNvcHkoVkVDM19QT1NJVElWRV9aKVxuICAgICAgLmFwcGx5UXVhdGVybmlvbihfcXVhdEIpXG4gICAgICAuYXBwbHlRdWF0ZXJuaW9uKF9xdWF0QylcbiAgICAgIC5hcHBseUV1bGVyKHRoaXMuZ2V0RXVsZXIoX2V1bGVyQSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBpdHMgbG9va0F0IHRhcmdldCBwb3NpdGlvbi5cbiAgICpcbiAgICogTm90ZSB0aGF0IGl0cyByZXN1bHQgd2lsbCBiZSBpbnN0YW50bHkgb3ZlcndyaXR0ZW4gaWYge0BsaW5rIFZSTUxvb2tBdEhlYWQuYXV0b1VwZGF0ZX0gaXMgZW5hYmxlZC5cbiAgICpcbiAgICogSWYgeW91IHdhbnQgdG8gdHJhY2sgYW4gb2JqZWN0IGNvbnRpbnVvdXNseSwgeW91IG1pZ2h0IHdhbnQgdG8gdXNlIHtAbGluayB0YXJnZXR9IGluc3RlYWQuXG4gICAqXG4gICAqIEBwYXJhbSBwb3NpdGlvbiBBIHRhcmdldCBwb3NpdGlvbiwgaW4gd29ybGQgc3BhY2VcbiAgICovXG4gIHB1YmxpYyBsb29rQXQocG9zaXRpb246IFRIUkVFLlZlY3RvcjMpOiB2b2lkIHtcbiAgICAvLyBMb29rIGF0IGRpcmVjdGlvbiBpbiBsb2NhbCBjb29yZGluYXRlXG4gICAgY29uc3QgaGVhZFJvdERpZmZJbnYgPSBfcXVhdEFcbiAgICAgIC5jb3B5KHRoaXMuX3Jlc3RIZWFkV29ybGRRdWF0ZXJuaW9uKVxuICAgICAgLm11bHRpcGx5KHF1YXRJbnZlcnRDb21wYXQodGhpcy5nZXRMb29rQXRXb3JsZFF1YXRlcm5pb24oX3F1YXRCKSkpO1xuICAgIGNvbnN0IGhlYWRQb3MgPSB0aGlzLmdldExvb2tBdFdvcmxkUG9zaXRpb24oX3YzQik7XG4gICAgY29uc3QgbG9va0F0RGlyID0gX3YzQy5jb3B5KHBvc2l0aW9uKS5zdWIoaGVhZFBvcykuYXBwbHlRdWF0ZXJuaW9uKGhlYWRSb3REaWZmSW52KS5ub3JtYWxpemUoKTtcblxuICAgIC8vIGNhbGN1bGF0ZSBhbmdsZXNcbiAgICBjb25zdCBbYXppbXV0aEZyb20sIGFsdGl0dWRlRnJvbV0gPSBjYWxjQXppbXV0aEFsdGl0dWRlKHRoaXMuZmFjZUZyb250KTtcbiAgICBjb25zdCBbYXppbXV0aFRvLCBhbHRpdHVkZVRvXSA9IGNhbGNBemltdXRoQWx0aXR1ZGUobG9va0F0RGlyKTtcbiAgICBjb25zdCB5YXcgPSBzYW5pdGl6ZUFuZ2xlKGF6aW11dGhUbyAtIGF6aW11dGhGcm9tKTtcbiAgICBjb25zdCBwaXRjaCA9IHNhbml0aXplQW5nbGUoYWx0aXR1ZGVGcm9tIC0gYWx0aXR1ZGVUbyk7IC8vIHNwaW5uaW5nICgxLCAwLCAwKSBDQ1cgYXJvdW5kIFogYXhpcyBtYWtlcyB0aGUgdmVjdG9yIGxvb2sgdXAsIHdoaWxlIHNwaW5uaW5nICgwLCAwLCAxKSBDQ1cgYXJvdW5kIFggYXhpcyBtYWtlcyB0aGUgdmVjdG9yIGxvb2sgZG93blxuXG4gICAgLy8gYXBwbHkgYW5nbGVzXG4gICAgdGhpcy5feWF3ID0gVEhSRUUuTWF0aFV0aWxzLlJBRDJERUcgKiB5YXc7XG4gICAgdGhpcy5fcGl0Y2ggPSBUSFJFRS5NYXRoVXRpbHMuUkFEMkRFRyAqIHBpdGNoO1xuXG4gICAgdGhpcy5fbmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgVlJNTG9va0F0SGVhZC5cbiAgICogSWYge0BsaW5rIGF1dG9VcGRhdGV9IGlzIGVuYWJsZWQsIHRoaXMgd2lsbCBtYWtlIGl0IGxvb2sgYXQgdGhlIHtAbGluayB0YXJnZXR9LlxuICAgKlxuICAgKiBAcGFyYW0gZGVsdGEgZGVsdGFUaW1lLCBpdCBpc24ndCB1c2VkIHRob3VnaC4gWW91IGNhbiB1c2UgdGhlIHBhcmFtZXRlciBpZiB5b3Ugd2FudCB0byB1c2UgdGhpcyBpbiB5b3VyIG93biBleHRlbmRlZCB7QGxpbmsgVlJNTG9va0F0fS5cbiAgICovXG4gIHB1YmxpYyB1cGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQge1xuICAgIGlmICh0aGlzLnRhcmdldCAhPSBudWxsICYmIHRoaXMuYXV0b1VwZGF0ZSkge1xuICAgICAgdGhpcy5sb29rQXQodGhpcy50YXJnZXQuZ2V0V29ybGRQb3NpdGlvbihfdjNBKSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX25lZWRzVXBkYXRlKSB7XG4gICAgICB0aGlzLl9uZWVkc1VwZGF0ZSA9IGZhbHNlO1xuXG4gICAgICB0aGlzLmFwcGxpZXIuYXBwbHlZYXdQaXRjaCh0aGlzLl95YXcsIHRoaXMuX3BpdGNoKTtcbiAgICB9XG4gIH1cbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbmNvbnN0IF9wb3NpdGlvbiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfc2NhbGUgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4vKipcbiAqIEEgcmVwbGFjZW1lbnQgb2YgYE9iamVjdDNELmdldFdvcmxkUXVhdGVybmlvbmAuXG4gKiBFeHRyYWN0IHRoZSB3b3JsZCBxdWF0ZXJuaW9uIG9mIGFuIG9iamVjdCBmcm9tIGl0cyB3b3JsZCBzcGFjZSBtYXRyaXgsIHdpdGhvdXQgY2FsbGluZyBgT2JqZWN0M0QudXBkYXRlV29ybGRNYXRyaXhgLlxuICogVXNlIHRoaXMgd2hlbiB5b3UncmUgc3VyZSB0aGF0IHRoZSB3b3JsZCBtYXRyaXggaXMgdXAtdG8tZGF0ZS5cbiAqXG4gKiBAcGFyYW0gb2JqZWN0IFRoZSBvYmplY3RcbiAqIEBwYXJhbSBvdXQgQSB0YXJnZXQgcXVhdGVybmlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0V29ybGRRdWF0ZXJuaW9uTGl0ZShvYmplY3Q6IFRIUkVFLk9iamVjdDNELCBvdXQ6IFRIUkVFLlF1YXRlcm5pb24pOiBUSFJFRS5RdWF0ZXJuaW9uIHtcbiAgb2JqZWN0Lm1hdHJpeFdvcmxkLmRlY29tcG9zZShfcG9zaXRpb24sIG91dCwgX3NjYWxlKTtcbiAgcmV0dXJuIG91dDtcbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbi8qKlxuICogQ2FsY3VsYXRlIGF6aW11dGggLyBhbHRpdHVkZSBhbmdsZXMgZnJvbSBhIHZlY3Rvci5cbiAqXG4gKiBUaGlzIHJldHVybnMgYSBkaWZmZXJlbmNlIG9mIGFuZ2xlcyBmcm9tICgxLCAwLCAwKS5cbiAqIEF6aW11dGggcmVwcmVzZW50cyBhbiBhbmdsZSBhcm91bmQgWSBheGlzLlxuICogQWx0aXR1ZGUgcmVwcmVzZW50cyBhbiBhbmdsZSBhcm91bmQgWiBheGlzLlxuICogSXQgaXMgcm90YXRlZCBpbiBpbnRyaW5zaWMgWS1aIG9yZGVyLlxuICpcbiAqIEBwYXJhbSB2ZWN0b3IgVGhlIHZlY3RvclxuICogQHJldHVybnMgQSB0dXBsZSBjb250YWlucyB0d28gYW5nbGVzLCBgWyBhemltdXRoLCBhbHRpdHVkZSBdYFxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FsY0F6aW11dGhBbHRpdHVkZSh2ZWN0b3I6IFRIUkVFLlZlY3RvcjMpOiBbYXppbXV0aDogbnVtYmVyLCBhbHRpdHVkZTogbnVtYmVyXSB7XG4gIHJldHVybiBbTWF0aC5hdGFuMigtdmVjdG9yLnosIHZlY3Rvci54KSwgTWF0aC5hdGFuMih2ZWN0b3IueSwgTWF0aC5zcXJ0KHZlY3Rvci54ICogdmVjdG9yLnggKyB2ZWN0b3IueiAqIHZlY3Rvci56KSldO1xufVxuIiwgIi8qKlxuICogTWFrZSBzdXJlIHRoZSBhbmdsZSBpcyB3aXRoaW4gLVBJIHRvIFBJLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBqc1xuICogc2FuaXRpemVBbmdsZSgxLjUgKiBNYXRoLlBJKSAvLyAtMC41ICogUElcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSBhbmdsZSBBbiBpbnB1dCBhbmdsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2FuaXRpemVBbmdsZShhbmdsZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgY29uc3Qgcm91bmRUdXJuID0gTWF0aC5yb3VuZChhbmdsZSAvIDIuMCAvIE1hdGguUEkpO1xuICByZXR1cm4gYW5nbGUgLSAyLjAgKiBNYXRoLlBJICogcm91bmRUdXJuO1xufVxuIiwgImltcG9ydCB7IFZSTUh1bWFub2lkIH0gZnJvbSAnLi4vaHVtYW5vaWQnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHR5cGUgeyBWUk1Mb29rQXRBcHBsaWVyIH0gZnJvbSAnLi9WUk1Mb29rQXRBcHBsaWVyJztcbmltcG9ydCB7IFZSTUxvb2tBdFJhbmdlTWFwIH0gZnJvbSAnLi9WUk1Mb29rQXRSYW5nZU1hcCc7XG5pbXBvcnQgeyBjYWxjQXppbXV0aEFsdGl0dWRlIH0gZnJvbSAnLi91dGlscy9jYWxjQXppbXV0aEFsdGl0dWRlJztcbmltcG9ydCB7IGdldFdvcmxkUXVhdGVybmlvbkxpdGUgfSBmcm9tICcuLi91dGlscy9nZXRXb3JsZFF1YXRlcm5pb25MaXRlJztcblxuY29uc3QgVkVDM19QT1NJVElWRV9aID0gbmV3IFRIUkVFLlZlY3RvcjMoMC4wLCAwLjAsIDEuMCk7XG5cbmNvbnN0IF9xdWF0QSA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5jb25zdCBfcXVhdEIgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuY29uc3QgX2V1bGVyQSA9IG5ldyBUSFJFRS5FdWxlcigwLjAsIDAuMCwgMC4wLCAnWVhaJyk7XG5cbi8qKlxuICogQSBjbGFzcyB0aGF0IGFwcGxpZXMgZXllIGdhemUgZGlyZWN0aW9ucyB0byBhIFZSTS5cbiAqIEl0IHdpbGwgYmUgdXNlZCBieSB7QGxpbmsgVlJNTG9va0F0fS5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUxvb2tBdEJvbmVBcHBsaWVyIGltcGxlbWVudHMgVlJNTG9va0F0QXBwbGllciB7XG4gIC8qKlxuICAgKiBSZXByZXNlbnQgaXRzIHR5cGUgb2YgYXBwbGllci5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgdHlwZSA9ICdib25lJztcblxuICAvKipcbiAgICogSXRzIGFzc29jaWF0ZWQge0BsaW5rIFZSTUh1bWFub2lkfS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBodW1hbm9pZDogVlJNSHVtYW5vaWQ7XG5cbiAgLyoqXG4gICAqIEEge0BsaW5rIFZSTUxvb2tBdFJhbmdlTWFwfSBmb3IgaG9yaXpvbnRhbCBpbndhcmQgbW92ZW1lbnQuIFRoZSBsZWZ0IGV5ZSBtb3ZlcyByaWdodC4gVGhlIHJpZ2h0IGV5ZSBtb3ZlcyBsZWZ0LlxuICAgKi9cbiAgcHVibGljIHJhbmdlTWFwSG9yaXpvbnRhbElubmVyOiBWUk1Mb29rQXRSYW5nZU1hcDtcblxuICAvKipcbiAgICogQSB7QGxpbmsgVlJNTG9va0F0UmFuZ2VNYXB9IGZvciBob3Jpem9udGFsIG91dHdhcmQgbW92ZW1lbnQuIFRoZSBsZWZ0IGV5ZSBtb3ZlcyBsZWZ0LiBUaGUgcmlnaHQgZXllIG1vdmVzIHJpZ2h0LlxuICAgKi9cbiAgcHVibGljIHJhbmdlTWFwSG9yaXpvbnRhbE91dGVyOiBWUk1Mb29rQXRSYW5nZU1hcDtcblxuICAvKipcbiAgICogQSB7QGxpbmsgVlJNTG9va0F0UmFuZ2VNYXB9IGZvciB2ZXJ0aWNhbCBkb3dud2FyZCBtb3ZlbWVudC4gQm90aCBleWVzIG1vdmUgdXB3YXJkcy5cbiAgICovXG4gIHB1YmxpYyByYW5nZU1hcFZlcnRpY2FsRG93bjogVlJNTG9va0F0UmFuZ2VNYXA7XG5cbiAgLyoqXG4gICAqIEEge0BsaW5rIFZSTUxvb2tBdFJhbmdlTWFwfSBmb3IgdmVydGljYWwgdXB3YXJkIG1vdmVtZW50LiBCb3RoIGV5ZXMgbW92ZSBkb3dud2FyZHMuXG4gICAqL1xuICBwdWJsaWMgcmFuZ2VNYXBWZXJ0aWNhbFVwOiBWUk1Mb29rQXRSYW5nZU1hcDtcblxuICAvKipcbiAgICogVGhlIGZyb250IGRpcmVjdGlvbiBvZiB0aGUgZmFjZS5cbiAgICogSW50ZW5kZWQgdG8gYmUgdXNlZCBmb3IgVlJNIDAuMCBjb21wYXQgKFZSTSAwLjAgbW9kZWxzIGFyZSBmYWNpbmcgWi0gaW5zdGVhZCBvZiBaKykuXG4gICAqIFlvdSB1c3VhbGx5IGRvbid0IHdhbnQgdG8gdG91Y2ggdGhpcy5cbiAgICovXG4gIHB1YmxpYyBmYWNlRnJvbnQ6IFRIUkVFLlZlY3RvcjM7XG5cbiAgLyoqXG4gICAqIFRoZSByZXN0IHF1YXRlcm5pb24gb2YgTGVmdEV5ZSBib25lLlxuICAgKi9cbiAgcHJpdmF0ZSBfcmVzdFF1YXRMZWZ0RXllOiBUSFJFRS5RdWF0ZXJuaW9uO1xuXG4gIC8qKlxuICAgKiBUaGUgcmVzdCBxdWF0ZXJuaW9uIG9mIFJpZ2h0RXllIGJvbmUuXG4gICAqL1xuICBwcml2YXRlIF9yZXN0UXVhdFJpZ2h0RXllOiBUSFJFRS5RdWF0ZXJuaW9uO1xuXG4gIC8qKlxuICAgKiBUaGUgd29ybGQtc3BhY2UgcmVzdCBxdWF0ZXJuaW9uIG9mIHRoZSBwYXJlbnQgb2YgdGhlIGh1bWFub2lkIExlZnRFeWUuXG4gICAqL1xuICBwcml2YXRlIF9yZXN0TGVmdEV5ZVBhcmVudFdvcmxkUXVhdDogVEhSRUUuUXVhdGVybmlvbjtcblxuICAvKipcbiAgICogVGhlIHdvcmxkLXNwYWNlIHJlc3QgcXVhdGVybmlvbiBvZiB0aGUgcGFyZW50IG9mIHRoZSBodW1hbm9pZCBSaWdodEV5ZS5cbiAgICovXG4gIHByaXZhdGUgX3Jlc3RSaWdodEV5ZVBhcmVudFdvcmxkUXVhdDogVEhSRUUuUXVhdGVybmlvbjtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IHtAbGluayBWUk1Mb29rQXRCb25lQXBwbGllcn0uXG4gICAqXG4gICAqIEBwYXJhbSBodW1hbm9pZCBBIHtAbGluayBWUk1IdW1hbm9pZH1cbiAgICogQHBhcmFtIHJhbmdlTWFwSG9yaXpvbnRhbElubmVyIEEge0BsaW5rIFZSTUxvb2tBdFJhbmdlTWFwfSB1c2VkIGZvciBpbm5lciB0cmFuc3ZlcnNlIGRpcmVjdGlvblxuICAgKiBAcGFyYW0gcmFuZ2VNYXBIb3Jpem9udGFsT3V0ZXIgQSB7QGxpbmsgVlJNTG9va0F0UmFuZ2VNYXB9IHVzZWQgZm9yIG91dGVyIHRyYW5zdmVyc2UgZGlyZWN0aW9uXG4gICAqIEBwYXJhbSByYW5nZU1hcFZlcnRpY2FsRG93biBBIHtAbGluayBWUk1Mb29rQXRSYW5nZU1hcH0gdXNlZCBmb3IgZG93biBkaXJlY3Rpb25cbiAgICogQHBhcmFtIHJhbmdlTWFwVmVydGljYWxVcCBBIHtAbGluayBWUk1Mb29rQXRSYW5nZU1hcH0gdXNlZCBmb3IgdXAgZGlyZWN0aW9uXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgaHVtYW5vaWQ6IFZSTUh1bWFub2lkLFxuICAgIHJhbmdlTWFwSG9yaXpvbnRhbElubmVyOiBWUk1Mb29rQXRSYW5nZU1hcCxcbiAgICByYW5nZU1hcEhvcml6b250YWxPdXRlcjogVlJNTG9va0F0UmFuZ2VNYXAsXG4gICAgcmFuZ2VNYXBWZXJ0aWNhbERvd246IFZSTUxvb2tBdFJhbmdlTWFwLFxuICAgIHJhbmdlTWFwVmVydGljYWxVcDogVlJNTG9va0F0UmFuZ2VNYXAsXG4gICkge1xuICAgIHRoaXMuaHVtYW5vaWQgPSBodW1hbm9pZDtcblxuICAgIHRoaXMucmFuZ2VNYXBIb3Jpem9udGFsSW5uZXIgPSByYW5nZU1hcEhvcml6b250YWxJbm5lcjtcbiAgICB0aGlzLnJhbmdlTWFwSG9yaXpvbnRhbE91dGVyID0gcmFuZ2VNYXBIb3Jpem9udGFsT3V0ZXI7XG4gICAgdGhpcy5yYW5nZU1hcFZlcnRpY2FsRG93biA9IHJhbmdlTWFwVmVydGljYWxEb3duO1xuICAgIHRoaXMucmFuZ2VNYXBWZXJ0aWNhbFVwID0gcmFuZ2VNYXBWZXJ0aWNhbFVwO1xuXG4gICAgdGhpcy5mYWNlRnJvbnQgPSBuZXcgVEhSRUUuVmVjdG9yMygwLjAsIDAuMCwgMS4wKTtcblxuICAgIC8vIHNldCByZXN0IHF1YXRlcm5pb25zXG4gICAgdGhpcy5fcmVzdFF1YXRMZWZ0RXllID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbiAgICB0aGlzLl9yZXN0UXVhdFJpZ2h0RXllID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbiAgICB0aGlzLl9yZXN0TGVmdEV5ZVBhcmVudFdvcmxkUXVhdCA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG4gICAgdGhpcy5fcmVzdFJpZ2h0RXllUGFyZW50V29ybGRRdWF0ID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblxuICAgIGNvbnN0IGxlZnRFeWUgPSB0aGlzLmh1bWFub2lkLmdldFJhd0JvbmVOb2RlKCdsZWZ0RXllJyk7XG4gICAgY29uc3QgcmlnaHRFeWUgPSB0aGlzLmh1bWFub2lkLmdldFJhd0JvbmVOb2RlKCdyaWdodEV5ZScpO1xuXG4gICAgaWYgKGxlZnRFeWUpIHtcbiAgICAgIHRoaXMuX3Jlc3RRdWF0TGVmdEV5ZS5jb3B5KGxlZnRFeWUucXVhdGVybmlvbik7XG4gICAgICBnZXRXb3JsZFF1YXRlcm5pb25MaXRlKGxlZnRFeWUucGFyZW50ISwgdGhpcy5fcmVzdExlZnRFeWVQYXJlbnRXb3JsZFF1YXQpO1xuICAgIH1cblxuICAgIGlmIChyaWdodEV5ZSkge1xuICAgICAgdGhpcy5fcmVzdFF1YXRSaWdodEV5ZS5jb3B5KHJpZ2h0RXllLnF1YXRlcm5pb24pO1xuICAgICAgZ2V0V29ybGRRdWF0ZXJuaW9uTGl0ZShyaWdodEV5ZS5wYXJlbnQhLCB0aGlzLl9yZXN0UmlnaHRFeWVQYXJlbnRXb3JsZFF1YXQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGUgaW5wdXQgYW5nbGUgdG8gaXRzIGFzc29jaWF0ZWQgVlJNIG1vZGVsLlxuICAgKlxuICAgKiBAcGFyYW0geWF3IFJvdGF0aW9uIGFyb3VuZCBZIGF4aXMsIGluIGRlZ3JlZVxuICAgKiBAcGFyYW0gcGl0Y2ggUm90YXRpb24gYXJvdW5kIFggYXhpcywgaW4gZGVncmVlXG4gICAqL1xuICBwdWJsaWMgYXBwbHlZYXdQaXRjaCh5YXc6IG51bWJlciwgcGl0Y2g6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IGxlZnRFeWUgPSB0aGlzLmh1bWFub2lkLmdldFJhd0JvbmVOb2RlKCdsZWZ0RXllJyk7XG4gICAgY29uc3QgcmlnaHRFeWUgPSB0aGlzLmh1bWFub2lkLmdldFJhd0JvbmVOb2RlKCdyaWdodEV5ZScpO1xuICAgIGNvbnN0IGxlZnRFeWVOb3JtYWxpemVkID0gdGhpcy5odW1hbm9pZC5nZXROb3JtYWxpemVkQm9uZU5vZGUoJ2xlZnRFeWUnKTtcbiAgICBjb25zdCByaWdodEV5ZU5vcm1hbGl6ZWQgPSB0aGlzLmh1bWFub2lkLmdldE5vcm1hbGl6ZWRCb25lTm9kZSgncmlnaHRFeWUnKTtcbiAgICAvLyBsZWZ0XG4gICAgaWYgKGxlZnRFeWUpIHtcbiAgICAgIGlmIChwaXRjaCA8IDAuMCkge1xuICAgICAgICBfZXVsZXJBLnggPSAtVEhSRUUuTWF0aFV0aWxzLkRFRzJSQUQgKiB0aGlzLnJhbmdlTWFwVmVydGljYWxEb3duLm1hcCgtcGl0Y2gpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX2V1bGVyQS54ID0gVEhSRUUuTWF0aFV0aWxzLkRFRzJSQUQgKiB0aGlzLnJhbmdlTWFwVmVydGljYWxVcC5tYXAocGl0Y2gpO1xuICAgICAgfVxuXG4gICAgICBpZiAoeWF3IDwgMC4wKSB7XG4gICAgICAgIF9ldWxlckEueSA9IC1USFJFRS5NYXRoVXRpbHMuREVHMlJBRCAqIHRoaXMucmFuZ2VNYXBIb3Jpem9udGFsSW5uZXIubWFwKC15YXcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX2V1bGVyQS55ID0gVEhSRUUuTWF0aFV0aWxzLkRFRzJSQUQgKiB0aGlzLnJhbmdlTWFwSG9yaXpvbnRhbE91dGVyLm1hcCh5YXcpO1xuICAgICAgfVxuXG4gICAgICBfcXVhdEEuc2V0RnJvbUV1bGVyKF9ldWxlckEpO1xuICAgICAgdGhpcy5fZ2V0V29ybGRGYWNlRnJvbnRRdWF0KF9xdWF0Qik7XG5cbiAgICAgIC8vIF9xdWF0QiAqIF9xdWF0QSAqIF9xdWF0Ql4tMVxuICAgICAgLy8gd2hlcmUgX3F1YXRBIGlzIExvb2tBdCByb3RhdGlvblxuICAgICAgLy8gYW5kIF9xdWF0QiBpcyB3b3JsZEZhY2VGcm9udFF1YXRcbiAgICAgIGxlZnRFeWVOb3JtYWxpemVkIS5xdWF0ZXJuaW9uLmNvcHkoX3F1YXRCKS5tdWx0aXBseShfcXVhdEEpLm11bHRpcGx5KF9xdWF0Qi5pbnZlcnQoKSk7XG5cbiAgICAgIF9xdWF0QS5jb3B5KHRoaXMuX3Jlc3RMZWZ0RXllUGFyZW50V29ybGRRdWF0KTtcblxuICAgICAgLy8gX3F1YXRBXi0xICogbGVmdEV5ZU5vcm1hbGl6ZWQucXVhdGVybmlvbiAqIF9xdWF0QSAqIHJlc3RRdWF0TGVmdEV5ZVxuICAgICAgLy8gd2hlcmUgX3F1YXRBIGlzIHJlc3RMZWZ0RXllUGFyZW50V29ybGRRdWF0XG4gICAgICBsZWZ0RXllLnF1YXRlcm5pb25cbiAgICAgICAgLmNvcHkobGVmdEV5ZU5vcm1hbGl6ZWQhLnF1YXRlcm5pb24pXG4gICAgICAgIC5tdWx0aXBseShfcXVhdEEpXG4gICAgICAgIC5wcmVtdWx0aXBseShfcXVhdEEuaW52ZXJ0KCkpXG4gICAgICAgIC5tdWx0aXBseSh0aGlzLl9yZXN0UXVhdExlZnRFeWUpO1xuICAgIH1cblxuICAgIC8vIHJpZ2h0XG4gICAgaWYgKHJpZ2h0RXllKSB7XG4gICAgICBpZiAocGl0Y2ggPCAwLjApIHtcbiAgICAgICAgX2V1bGVyQS54ID0gLVRIUkVFLk1hdGhVdGlscy5ERUcyUkFEICogdGhpcy5yYW5nZU1hcFZlcnRpY2FsRG93bi5tYXAoLXBpdGNoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF9ldWxlckEueCA9IFRIUkVFLk1hdGhVdGlscy5ERUcyUkFEICogdGhpcy5yYW5nZU1hcFZlcnRpY2FsVXAubWFwKHBpdGNoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHlhdyA8IDAuMCkge1xuICAgICAgICBfZXVsZXJBLnkgPSAtVEhSRUUuTWF0aFV0aWxzLkRFRzJSQUQgKiB0aGlzLnJhbmdlTWFwSG9yaXpvbnRhbE91dGVyLm1hcCgteWF3KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF9ldWxlckEueSA9IFRIUkVFLk1hdGhVdGlscy5ERUcyUkFEICogdGhpcy5yYW5nZU1hcEhvcml6b250YWxJbm5lci5tYXAoeWF3KTtcbiAgICAgIH1cblxuICAgICAgX3F1YXRBLnNldEZyb21FdWxlcihfZXVsZXJBKTtcbiAgICAgIHRoaXMuX2dldFdvcmxkRmFjZUZyb250UXVhdChfcXVhdEIpO1xuXG4gICAgICAvLyBfcXVhdEIgKiBfcXVhdEEgKiBfcXVhdEJeLTFcbiAgICAgIC8vIHdoZXJlIF9xdWF0QSBpcyBMb29rQXQgcm90YXRpb25cbiAgICAgIC8vIGFuZCBfcXVhdEIgaXMgd29ybGRGYWNlRnJvbnRRdWF0XG4gICAgICByaWdodEV5ZU5vcm1hbGl6ZWQhLnF1YXRlcm5pb24uY29weShfcXVhdEIpLm11bHRpcGx5KF9xdWF0QSkubXVsdGlwbHkoX3F1YXRCLmludmVydCgpKTtcblxuICAgICAgX3F1YXRBLmNvcHkodGhpcy5fcmVzdFJpZ2h0RXllUGFyZW50V29ybGRRdWF0KTtcblxuICAgICAgLy8gX3F1YXRBXi0xICogcmlnaHRFeWVOb3JtYWxpemVkLnF1YXRlcm5pb24gKiBfcXVhdEEgKiByZXN0UXVhdFJpZ2h0RXllXG4gICAgICAvLyB3aGVyZSBfcXVhdEEgaXMgcmVzdFJpZ2h0RXllUGFyZW50V29ybGRRdWF0XG4gICAgICByaWdodEV5ZS5xdWF0ZXJuaW9uXG4gICAgICAgIC5jb3B5KHJpZ2h0RXllTm9ybWFsaXplZCEucXVhdGVybmlvbilcbiAgICAgICAgLm11bHRpcGx5KF9xdWF0QSlcbiAgICAgICAgLnByZW11bHRpcGx5KF9xdWF0QS5pbnZlcnQoKSlcbiAgICAgICAgLm11bHRpcGx5KHRoaXMuX3Jlc3RRdWF0UmlnaHRFeWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBVc2Uge0BsaW5rIGFwcGx5WWF3UGl0Y2h9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgbG9va0F0KGV1bGVyOiBUSFJFRS5FdWxlcik6IHZvaWQge1xuICAgIGNvbnNvbGUud2FybignVlJNTG9va0F0Qm9uZUFwcGxpZXI6IGxvb2tBdCgpIGlzIGRlcHJlY2F0ZWQuIHVzZSBhcHBseSgpIGluc3RlYWQuJyk7XG5cbiAgICBjb25zdCB5YXcgPSBUSFJFRS5NYXRoVXRpbHMuUkFEMkRFRyAqIGV1bGVyLnk7XG4gICAgY29uc3QgcGl0Y2ggPSBUSFJFRS5NYXRoVXRpbHMuUkFEMkRFRyAqIGV1bGVyLng7XG5cbiAgICB0aGlzLmFwcGx5WWF3UGl0Y2goeWF3LCBwaXRjaCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgcXVhdGVybmlvbiB0aGF0IHJvdGF0ZXMgdGhlIHdvcmxkLXNwYWNlICtaIHVuaXQgdmVjdG9yIHRvIHRoZSB7QGxpbmsgZmFjZUZyb250fSBkaXJlY3Rpb24uXG4gICAqXG4gICAqIEBwYXJhbSB0YXJnZXQgQSB0YXJnZXQgYFRIUkVFLlF1YXRlcm5pb25gXG4gICAqL1xuICBwcml2YXRlIF9nZXRXb3JsZEZhY2VGcm9udFF1YXQodGFyZ2V0OiBUSFJFRS5RdWF0ZXJuaW9uKTogVEhSRUUuUXVhdGVybmlvbiB7XG4gICAgaWYgKHRoaXMuZmFjZUZyb250LmRpc3RhbmNlVG9TcXVhcmVkKFZFQzNfUE9TSVRJVkVfWikgPCAwLjAxKSB7XG4gICAgICByZXR1cm4gdGFyZ2V0LmlkZW50aXR5KCk7XG4gICAgfVxuXG4gICAgY29uc3QgW2ZhY2VGcm9udEF6aW11dGgsIGZhY2VGcm9udEFsdGl0dWRlXSA9IGNhbGNBemltdXRoQWx0aXR1ZGUodGhpcy5mYWNlRnJvbnQpO1xuICAgIF9ldWxlckEuc2V0KDAuMCwgMC41ICogTWF0aC5QSSArIGZhY2VGcm9udEF6aW11dGgsIGZhY2VGcm9udEFsdGl0dWRlLCAnWVpYJyk7XG5cbiAgICByZXR1cm4gdGFyZ2V0LnNldEZyb21FdWxlcihfZXVsZXJBKTtcbiAgfVxufVxuIiwgImltcG9ydCB7IFZSTUV4cHJlc3Npb25NYW5hZ2VyIH0gZnJvbSAnLi4vZXhwcmVzc2lvbnMnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHR5cGUgeyBWUk1Mb29rQXRBcHBsaWVyIH0gZnJvbSAnLi9WUk1Mb29rQXRBcHBsaWVyJztcbmltcG9ydCB7IFZSTUxvb2tBdFJhbmdlTWFwIH0gZnJvbSAnLi9WUk1Mb29rQXRSYW5nZU1hcCc7XG5cbi8qKlxuICogQSBjbGFzcyB0aGF0IGFwcGxpZXMgZXllIGdhemUgZGlyZWN0aW9ucyB0byBhIFZSTS5cbiAqIEl0IHdpbGwgYmUgdXNlZCBieSB7QGxpbmsgVlJNTG9va0F0fS5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUxvb2tBdEV4cHJlc3Npb25BcHBsaWVyIGltcGxlbWVudHMgVlJNTG9va0F0QXBwbGllciB7XG4gIC8qKlxuICAgKiBSZXByZXNlbnQgaXRzIHR5cGUgb2YgYXBwbGllci5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgdHlwZSA9ICdleHByZXNzaW9uJztcblxuICAvKipcbiAgICogSXRzIGFzc29jaWF0ZWQge0BsaW5rIFZSTUV4cHJlc3Npb25NYW5hZ2VyfS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBleHByZXNzaW9uczogVlJNRXhwcmVzc2lvbk1hbmFnZXI7XG5cbiAgLyoqXG4gICAqIEl0IHdvbid0IGJlIHVzZWQgaW4gZXhwcmVzc2lvbiBhcHBsaWVyLlxuICAgKiBTZWUgYWxzbzoge0BsaW5rIHJhbmdlTWFwSG9yaXpvbnRhbE91dGVyfVxuICAgKi9cbiAgcHVibGljIHJhbmdlTWFwSG9yaXpvbnRhbElubmVyOiBWUk1Mb29rQXRSYW5nZU1hcDtcblxuICAvKipcbiAgICogQSB7QGxpbmsgVlJNTG9va0F0UmFuZ2VNYXB9IGZvciBob3Jpem9udGFsIG1vdmVtZW50LiBCb3RoIGV5ZXMgbW92ZSBsZWZ0IG9yIHJpZ2h0LlxuICAgKi9cbiAgcHVibGljIHJhbmdlTWFwSG9yaXpvbnRhbE91dGVyOiBWUk1Mb29rQXRSYW5nZU1hcDtcblxuICAvKipcbiAgICogQSB7QGxpbmsgVlJNTG9va0F0UmFuZ2VNYXB9IGZvciB2ZXJ0aWNhbCBkb3dud2FyZCBtb3ZlbWVudC4gQm90aCBleWVzIG1vdmUgdXB3YXJkcy5cbiAgICovXG4gIHB1YmxpYyByYW5nZU1hcFZlcnRpY2FsRG93bjogVlJNTG9va0F0UmFuZ2VNYXA7XG5cbiAgLyoqXG4gICAqIEEge0BsaW5rIFZSTUxvb2tBdFJhbmdlTWFwfSBmb3IgdmVydGljYWwgdXB3YXJkIG1vdmVtZW50LiBCb3RoIGV5ZXMgbW92ZSBkb3dud2FyZHMuXG4gICAqL1xuICBwdWJsaWMgcmFuZ2VNYXBWZXJ0aWNhbFVwOiBWUk1Mb29rQXRSYW5nZU1hcDtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IHtAbGluayBWUk1Mb29rQXRFeHByZXNzaW9uQXBwbGllcn0uXG4gICAqXG4gICAqIEBwYXJhbSBleHByZXNzaW9ucyBBIHtAbGluayBWUk1FeHByZXNzaW9uTWFuYWdlcn1cbiAgICogQHBhcmFtIHJhbmdlTWFwSG9yaXpvbnRhbElubmVyIEEge0BsaW5rIFZSTUxvb2tBdFJhbmdlTWFwfSB1c2VkIGZvciBpbm5lciB0cmFuc3ZlcnNlIGRpcmVjdGlvblxuICAgKiBAcGFyYW0gcmFuZ2VNYXBIb3Jpem9udGFsT3V0ZXIgQSB7QGxpbmsgVlJNTG9va0F0UmFuZ2VNYXB9IHVzZWQgZm9yIG91dGVyIHRyYW5zdmVyc2UgZGlyZWN0aW9uXG4gICAqIEBwYXJhbSByYW5nZU1hcFZlcnRpY2FsRG93biBBIHtAbGluayBWUk1Mb29rQXRSYW5nZU1hcH0gdXNlZCBmb3IgZG93biBkaXJlY3Rpb25cbiAgICogQHBhcmFtIHJhbmdlTWFwVmVydGljYWxVcCBBIHtAbGluayBWUk1Mb29rQXRSYW5nZU1hcH0gdXNlZCBmb3IgdXAgZGlyZWN0aW9uXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgZXhwcmVzc2lvbnM6IFZSTUV4cHJlc3Npb25NYW5hZ2VyLFxuICAgIHJhbmdlTWFwSG9yaXpvbnRhbElubmVyOiBWUk1Mb29rQXRSYW5nZU1hcCxcbiAgICByYW5nZU1hcEhvcml6b250YWxPdXRlcjogVlJNTG9va0F0UmFuZ2VNYXAsXG4gICAgcmFuZ2VNYXBWZXJ0aWNhbERvd246IFZSTUxvb2tBdFJhbmdlTWFwLFxuICAgIHJhbmdlTWFwVmVydGljYWxVcDogVlJNTG9va0F0UmFuZ2VNYXAsXG4gICkge1xuICAgIHRoaXMuZXhwcmVzc2lvbnMgPSBleHByZXNzaW9ucztcblxuICAgIHRoaXMucmFuZ2VNYXBIb3Jpem9udGFsSW5uZXIgPSByYW5nZU1hcEhvcml6b250YWxJbm5lcjtcbiAgICB0aGlzLnJhbmdlTWFwSG9yaXpvbnRhbE91dGVyID0gcmFuZ2VNYXBIb3Jpem9udGFsT3V0ZXI7XG4gICAgdGhpcy5yYW5nZU1hcFZlcnRpY2FsRG93biA9IHJhbmdlTWFwVmVydGljYWxEb3duO1xuICAgIHRoaXMucmFuZ2VNYXBWZXJ0aWNhbFVwID0gcmFuZ2VNYXBWZXJ0aWNhbFVwO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoZSBpbnB1dCBhbmdsZSB0byBpdHMgYXNzb2NpYXRlZCBWUk0gbW9kZWwuXG4gICAqXG4gICAqIEBwYXJhbSB5YXcgUm90YXRpb24gYXJvdW5kIFkgYXhpcywgaW4gZGVncmVlXG4gICAqIEBwYXJhbSBwaXRjaCBSb3RhdGlvbiBhcm91bmQgWCBheGlzLCBpbiBkZWdyZWVcbiAgICovXG4gIHB1YmxpYyBhcHBseVlhd1BpdGNoKHlhdzogbnVtYmVyLCBwaXRjaDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHBpdGNoIDwgMC4wKSB7XG4gICAgICB0aGlzLmV4cHJlc3Npb25zLnNldFZhbHVlKCdsb29rRG93bicsIDAuMCk7XG4gICAgICB0aGlzLmV4cHJlc3Npb25zLnNldFZhbHVlKCdsb29rVXAnLCB0aGlzLnJhbmdlTWFwVmVydGljYWxVcC5tYXAoLXBpdGNoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZXhwcmVzc2lvbnMuc2V0VmFsdWUoJ2xvb2tVcCcsIDAuMCk7XG4gICAgICB0aGlzLmV4cHJlc3Npb25zLnNldFZhbHVlKCdsb29rRG93bicsIHRoaXMucmFuZ2VNYXBWZXJ0aWNhbERvd24ubWFwKHBpdGNoKSk7XG4gICAgfVxuXG4gICAgaWYgKHlhdyA8IDAuMCkge1xuICAgICAgdGhpcy5leHByZXNzaW9ucy5zZXRWYWx1ZSgnbG9va0xlZnQnLCAwLjApO1xuICAgICAgdGhpcy5leHByZXNzaW9ucy5zZXRWYWx1ZSgnbG9va1JpZ2h0JywgdGhpcy5yYW5nZU1hcEhvcml6b250YWxPdXRlci5tYXAoLXlhdykpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmV4cHJlc3Npb25zLnNldFZhbHVlKCdsb29rUmlnaHQnLCAwLjApO1xuICAgICAgdGhpcy5leHByZXNzaW9ucy5zZXRWYWx1ZSgnbG9va0xlZnQnLCB0aGlzLnJhbmdlTWFwSG9yaXpvbnRhbE91dGVyLm1hcCh5YXcpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVXNlIHtAbGluayBhcHBseVlhd1BpdGNofSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIGxvb2tBdChldWxlcjogVEhSRUUuRXVsZXIpOiB2b2lkIHtcbiAgICBjb25zb2xlLndhcm4oJ1ZSTUxvb2tBdEJvbmVBcHBsaWVyOiBsb29rQXQoKSBpcyBkZXByZWNhdGVkLiB1c2UgYXBwbHkoKSBpbnN0ZWFkLicpO1xuXG4gICAgY29uc3QgeWF3ID0gVEhSRUUuTWF0aFV0aWxzLlJBRDJERUcgKiBldWxlci55O1xuICAgIGNvbnN0IHBpdGNoID0gVEhSRUUuTWF0aFV0aWxzLlJBRDJERUcgKiBldWxlci54O1xuXG4gICAgdGhpcy5hcHBseVlhd1BpdGNoKHlhdywgcGl0Y2gpO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgc2F0dXJhdGUgfSBmcm9tICcuLi91dGlscy9zYXR1cmF0ZSc7XG5cbmV4cG9ydCBjbGFzcyBWUk1Mb29rQXRSYW5nZU1hcCB7XG4gIC8qKlxuICAgKiBMaW1pdHMgdGhlIG1heGltdW0gYW5nbGUgb2YgdGhlIGlucHV0IGFuZ2xlIG9mIHRoZSBMb29rQXQgdmVjdG9yIGZyb20gdGhlIGZyb250IG9mIHRoZSBoZWFkICh0aGUgcG9zaXRpdmUgeiBheGlzKS5cbiAgICovXG4gIHB1YmxpYyBpbnB1dE1heFZhbHVlOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFJlcHJlc2VudHMgYW4gYW5nbGUgKGluIGRlZ3JlZXMpIGZvciBib25lIHR5cGUgb2YgTG9va0F0IGFwcGxpZXJzLCBvciBhIHdlaWdodCBmb3IgZXhwcmVzc2lvbiB0eXBlIG9mIExvb2tBdCBhcHBsaWVycy5cbiAgICogVGhlIGlucHV0IHZhbHVlIHdpbGwgdGFrZSBgMS4wYCB3aGVuIHRoZSBpbnB1dCBhbmdsZSBlcXVhbHMgKG9yIGdyZWF0ZXIpIHRvIHtAbGluayBpbnB1dE1heFZhbHVlfS5cbiAgICovXG4gIHB1YmxpYyBvdXRwdXRTY2FsZTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcge0BsaW5rIFZSTUxvb2tBdFJhbmdlTWFwfS5cbiAgICpcbiAgICogQHBhcmFtIGlucHV0TWF4VmFsdWUgVGhlIHtAbGluayBpbnB1dE1heFZhbHVlfSBvZiB0aGUgbWFwXG4gICAqIEBwYXJhbSBvdXRwdXRTY2FsZSBUaGUge0BsaW5rIG91dHB1dFNjYWxlfSBvZiB0aGUgbWFwXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoaW5wdXRNYXhWYWx1ZTogbnVtYmVyLCBvdXRwdXRTY2FsZTogbnVtYmVyKSB7XG4gICAgdGhpcy5pbnB1dE1heFZhbHVlID0gaW5wdXRNYXhWYWx1ZTtcbiAgICB0aGlzLm91dHB1dFNjYWxlID0gb3V0cHV0U2NhbGU7XG4gIH1cblxuICAvKipcbiAgICogRXZhbHVhdGUgYW4gaW5wdXQgdmFsdWUgYW5kIG91dHB1dCBhIG1hcHBlZCB2YWx1ZS5cbiAgICogQHBhcmFtIHNyYyBUaGUgaW5wdXQgdmFsdWVcbiAgICovXG4gIHB1YmxpYyBtYXAoc3JjOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLm91dHB1dFNjYWxlICogc2F0dXJhdGUoc3JjIC8gdGhpcy5pbnB1dE1heFZhbHVlKTtcbiAgfVxufVxuIiwgImltcG9ydCB0eXBlICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHR5cGUgKiBhcyBWMFZSTSBmcm9tICdAcGl4aXYvdHlwZXMtdnJtLTAuMCc7XG5pbXBvcnQgdHlwZSAqIGFzIFYxVlJNU2NoZW1hIGZyb20gJ0BwaXhpdi90eXBlcy12cm1jLXZybS0xLjAnO1xuaW1wb3J0IHR5cGUgeyBHTFRGLCBHTFRGTG9hZGVyUGx1Z2luLCBHTFRGUGFyc2VyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlci5qcyc7XG5pbXBvcnQgdHlwZSB7IFZSTUV4cHJlc3Npb25NYW5hZ2VyIH0gZnJvbSAnLi4vZXhwcmVzc2lvbnMvVlJNRXhwcmVzc2lvbk1hbmFnZXInO1xuaW1wb3J0IHR5cGUgeyBWUk1IdW1hbm9pZCB9IGZyb20gJy4uL2h1bWFub2lkL1ZSTUh1bWFub2lkJztcbmltcG9ydCB7IFZSTUxvb2tBdEhlbHBlciB9IGZyb20gJy4vaGVscGVycy9WUk1Mb29rQXRIZWxwZXInO1xuaW1wb3J0IHsgVlJNTG9va0F0IH0gZnJvbSAnLi9WUk1Mb29rQXQnO1xuaW1wb3J0IHR5cGUgeyBWUk1Mb29rQXRBcHBsaWVyIH0gZnJvbSAnLi9WUk1Mb29rQXRBcHBsaWVyJztcbmltcG9ydCB7IFZSTUxvb2tBdEJvbmVBcHBsaWVyIH0gZnJvbSAnLi9WUk1Mb29rQXRCb25lQXBwbGllcic7XG5pbXBvcnQgeyBWUk1Mb29rQXRFeHByZXNzaW9uQXBwbGllciB9IGZyb20gJy4vVlJNTG9va0F0RXhwcmVzc2lvbkFwcGxpZXInO1xuaW1wb3J0IHR5cGUgeyBWUk1Mb29rQXRMb2FkZXJQbHVnaW5PcHRpb25zIH0gZnJvbSAnLi9WUk1Mb29rQXRMb2FkZXJQbHVnaW5PcHRpb25zJztcbmltcG9ydCB7IFZSTUxvb2tBdFJhbmdlTWFwIH0gZnJvbSAnLi9WUk1Mb29rQXRSYW5nZU1hcCc7XG5pbXBvcnQgeyBHTFRGIGFzIEdMVEZTY2hlbWEgfSBmcm9tICdAZ2x0Zi10cmFuc2Zvcm0vY29yZSc7XG5cbi8qKlxuICogUG9zc2libGUgc3BlYyB2ZXJzaW9ucyBpdCByZWNvZ25pemVzLlxuICovXG5jb25zdCBQT1NTSUJMRV9TUEVDX1ZFUlNJT05TID0gbmV3IFNldChbJzEuMCcsICcxLjAtYmV0YSddKTtcblxuLyoqXG4gKiBUaGUgbWluaW11bSBwZXJtaXR0ZWQgdmFsdWUgZm9yIHtAbGluayBWMVZSTVNjaGVtYS5Mb29rQXRSYW5nZU1hcC5pbnB1dE1heFZhbHVlfS5cbiAqIElmIHRoZSBnaXZlbiB2YWx1ZSBpcyBzbWFsbGVyIHRoYW4gdGhpcywgdGhlIGxvYWRlciBzaG93cyBhIHdhcm5pbmcgYW5kIGNsYW1wcyB1cCB0aGUgdmFsdWUuXG4gKi9cbmNvbnN0IElOUFVUX01BWF9WQUxVRV9NSU5JTVVNID0gMC4wMTtcblxuLyoqXG4gKiBBIHBsdWdpbiBvZiBHTFRGTG9hZGVyIHRoYXQgaW1wb3J0cyBhIHtAbGluayBWUk1Mb29rQXR9IGZyb20gYSBWUk0gZXh0ZW5zaW9uIG9mIGEgR0xURi5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUxvb2tBdExvYWRlclBsdWdpbiBpbXBsZW1lbnRzIEdMVEZMb2FkZXJQbHVnaW4ge1xuICAvKipcbiAgICogU3BlY2lmeSBhbiBPYmplY3QzRCB0byBhZGQge0BsaW5rIFZSTUxvb2tBdEhlbHBlcn0gcy5cbiAgICogSWYgbm90IHNwZWNpZmllZCwgaGVscGVyIHdpbGwgbm90IGJlIGNyZWF0ZWQuXG4gICAqIElmIGByZW5kZXJPcmRlcmAgaXMgc2V0IHRvIHRoZSByb290LCBoZWxwZXJzIHdpbGwgY29weSB0aGUgc2FtZSBgcmVuZGVyT3JkZXJgIC5cbiAgICovXG4gIHB1YmxpYyBoZWxwZXJSb290PzogVEhSRUUuT2JqZWN0M0Q7XG5cbiAgcHVibGljIHJlYWRvbmx5IHBhcnNlcjogR0xURlBhcnNlcjtcblxuICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICAvLyBXZSBzaG91bGQgdXNlIHRoZSBleHRlbnNpb24gbmFtZSBpbnN0ZWFkIGJ1dCB3ZSBoYXZlIG11bHRpcGxlIHBsdWdpbnMgZm9yIGFuIGV4dGVuc2lvbi4uLlxuICAgIHJldHVybiAnVlJNTG9va0F0TG9hZGVyUGx1Z2luJztcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJzZXI6IEdMVEZQYXJzZXIsIG9wdGlvbnM/OiBWUk1Mb29rQXRMb2FkZXJQbHVnaW5PcHRpb25zKSB7XG4gICAgdGhpcy5wYXJzZXIgPSBwYXJzZXI7XG5cbiAgICB0aGlzLmhlbHBlclJvb3QgPSBvcHRpb25zPy5oZWxwZXJSb290O1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGFmdGVyUm9vdChnbHRmOiBHTFRGKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgdnJtSHVtYW5vaWQgPSBnbHRmLnVzZXJEYXRhLnZybUh1bWFub2lkIGFzIFZSTUh1bWFub2lkIHwgdW5kZWZpbmVkO1xuXG4gICAgLy8gZXhwbGljaXRseSBkaXN0aW5ndWlzaCBudWxsIGFuZCB1bmRlZmluZWRcbiAgICAvLyBzaW5jZSB2cm1IdW1hbm9pZCBtaWdodCBiZSBudWxsIGFzIGEgcmVzdWx0XG4gICAgaWYgKHZybUh1bWFub2lkID09PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIGlmICh2cm1IdW1hbm9pZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZSTUxvb2tBdExvYWRlclBsdWdpbjogdnJtSHVtYW5vaWQgaXMgdW5kZWZpbmVkLiBWUk1IdW1hbm9pZExvYWRlclBsdWdpbiBoYXZlIHRvIGJlIHVzZWQgZmlyc3QnKTtcbiAgICB9XG5cbiAgICBjb25zdCB2cm1FeHByZXNzaW9uTWFuYWdlciA9IGdsdGYudXNlckRhdGEudnJtRXhwcmVzc2lvbk1hbmFnZXIgYXMgVlJNRXhwcmVzc2lvbk1hbmFnZXIgfCB1bmRlZmluZWQ7XG5cbiAgICBpZiAodnJtRXhwcmVzc2lvbk1hbmFnZXIgPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKHZybUV4cHJlc3Npb25NYW5hZ2VyID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1ZSTUxvb2tBdExvYWRlclBsdWdpbjogdnJtRXhwcmVzc2lvbk1hbmFnZXIgaXMgdW5kZWZpbmVkLiBWUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luIGhhdmUgdG8gYmUgdXNlZCBmaXJzdCcsXG4gICAgICApO1xuICAgIH1cblxuICAgIGdsdGYudXNlckRhdGEudnJtTG9va0F0ID0gYXdhaXQgdGhpcy5faW1wb3J0KGdsdGYsIHZybUh1bWFub2lkLCB2cm1FeHByZXNzaW9uTWFuYWdlcik7XG4gIH1cblxuICAvKipcbiAgICogSW1wb3J0IGEge0BsaW5rIFZSTUxvb2tBdH0gZnJvbSBhIFZSTS5cbiAgICpcbiAgICogQHBhcmFtIGdsdGYgQSBwYXJzZWQgcmVzdWx0IG9mIEdMVEYgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gICAqIEBwYXJhbSBodW1hbm9pZCBBIHtAbGluayBWUk1IdW1hbm9pZH0gaW5zdGFuY2UgdGhhdCByZXByZXNlbnRzIHRoZSBWUk1cbiAgICogQHBhcmFtIGV4cHJlc3Npb25zIEEge0BsaW5rIFZSTUV4cHJlc3Npb25NYW5hZ2VyfSBpbnN0YW5jZSB0aGF0IHJlcHJlc2VudHMgdGhlIFZSTVxuICAgKi9cbiAgcHJpdmF0ZSBhc3luYyBfaW1wb3J0KFxuICAgIGdsdGY6IEdMVEYsXG4gICAgaHVtYW5vaWQ6IFZSTUh1bWFub2lkIHwgbnVsbCxcbiAgICBleHByZXNzaW9uczogVlJNRXhwcmVzc2lvbk1hbmFnZXIgfCBudWxsLFxuICApOiBQcm9taXNlPFZSTUxvb2tBdCB8IG51bGw+IHtcbiAgICBpZiAoaHVtYW5vaWQgPT0gbnVsbCB8fCBleHByZXNzaW9ucyA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCB2MVJlc3VsdCA9IGF3YWl0IHRoaXMuX3YxSW1wb3J0KGdsdGYsIGh1bWFub2lkLCBleHByZXNzaW9ucyk7XG4gICAgaWYgKHYxUmVzdWx0KSB7XG4gICAgICByZXR1cm4gdjFSZXN1bHQ7XG4gICAgfVxuXG4gICAgY29uc3QgdjBSZXN1bHQgPSBhd2FpdCB0aGlzLl92MEltcG9ydChnbHRmLCBodW1hbm9pZCwgZXhwcmVzc2lvbnMpO1xuICAgIGlmICh2MFJlc3VsdCkge1xuICAgICAgcmV0dXJuIHYwUmVzdWx0O1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfdjFJbXBvcnQoXG4gICAgZ2x0ZjogR0xURixcbiAgICBodW1hbm9pZDogVlJNSHVtYW5vaWQsXG4gICAgZXhwcmVzc2lvbnM6IFZSTUV4cHJlc3Npb25NYW5hZ2VyLFxuICApOiBQcm9taXNlPFZSTUxvb2tBdCB8IG51bGw+IHtcbiAgICBjb25zdCBqc29uID0gdGhpcy5wYXJzZXIuanNvbiBhcyBHTFRGU2NoZW1hLklHTFRGO1xuXG4gICAgLy8gZWFybHkgYWJvcnQgaWYgaXQgZG9lc24ndCB1c2UgdnJtXG4gICAgY29uc3QgaXNWUk1Vc2VkID0ganNvbi5leHRlbnNpb25zVXNlZD8uaW5kZXhPZignVlJNQ192cm0nKSAhPT0gLTE7XG4gICAgaWYgKCFpc1ZSTVVzZWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGV4dGVuc2lvbiA9IGpzb24uZXh0ZW5zaW9ucz8uWydWUk1DX3ZybSddIGFzIFYxVlJNU2NoZW1hLlZSTUNWUk0gfCB1bmRlZmluZWQ7XG4gICAgaWYgKCFleHRlbnNpb24pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNwZWNWZXJzaW9uID0gZXh0ZW5zaW9uLnNwZWNWZXJzaW9uO1xuICAgIGlmICghUE9TU0lCTEVfU1BFQ19WRVJTSU9OUy5oYXMoc3BlY1ZlcnNpb24pKSB7XG4gICAgICBjb25zb2xlLndhcm4oYFZSTUxvb2tBdExvYWRlclBsdWdpbjogVW5rbm93biBWUk1DX3ZybSBzcGVjVmVyc2lvbiBcIiR7c3BlY1ZlcnNpb259XCJgKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNjaGVtYUxvb2tBdCA9IGV4dGVuc2lvbi5sb29rQXQ7XG4gICAgaWYgKCFzY2hlbWFMb29rQXQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGRlZmF1bHRPdXRwdXRTY2FsZSA9IHNjaGVtYUxvb2tBdC50eXBlID09PSAnZXhwcmVzc2lvbicgPyAxLjAgOiAxMC4wO1xuXG4gICAgY29uc3QgbWFwSEkgPSB0aGlzLl92MUltcG9ydFJhbmdlTWFwKHNjaGVtYUxvb2tBdC5yYW5nZU1hcEhvcml6b250YWxJbm5lciwgZGVmYXVsdE91dHB1dFNjYWxlKTtcbiAgICBjb25zdCBtYXBITyA9IHRoaXMuX3YxSW1wb3J0UmFuZ2VNYXAoc2NoZW1hTG9va0F0LnJhbmdlTWFwSG9yaXpvbnRhbE91dGVyLCBkZWZhdWx0T3V0cHV0U2NhbGUpO1xuICAgIGNvbnN0IG1hcFZEID0gdGhpcy5fdjFJbXBvcnRSYW5nZU1hcChzY2hlbWFMb29rQXQucmFuZ2VNYXBWZXJ0aWNhbERvd24sIGRlZmF1bHRPdXRwdXRTY2FsZSk7XG4gICAgY29uc3QgbWFwVlUgPSB0aGlzLl92MUltcG9ydFJhbmdlTWFwKHNjaGVtYUxvb2tBdC5yYW5nZU1hcFZlcnRpY2FsVXAsIGRlZmF1bHRPdXRwdXRTY2FsZSk7XG5cbiAgICBsZXQgYXBwbGllcjtcblxuICAgIGlmIChzY2hlbWFMb29rQXQudHlwZSA9PT0gJ2V4cHJlc3Npb24nKSB7XG4gICAgICBhcHBsaWVyID0gbmV3IFZSTUxvb2tBdEV4cHJlc3Npb25BcHBsaWVyKGV4cHJlc3Npb25zLCBtYXBISSwgbWFwSE8sIG1hcFZELCBtYXBWVSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwcGxpZXIgPSBuZXcgVlJNTG9va0F0Qm9uZUFwcGxpZXIoaHVtYW5vaWQsIG1hcEhJLCBtYXBITywgbWFwVkQsIG1hcFZVKTtcbiAgICB9XG5cbiAgICBjb25zdCBsb29rQXQgPSB0aGlzLl9pbXBvcnRMb29rQXQoaHVtYW5vaWQsIGFwcGxpZXIpO1xuXG4gICAgbG9va0F0Lm9mZnNldEZyb21IZWFkQm9uZS5mcm9tQXJyYXkoc2NoZW1hTG9va0F0Lm9mZnNldEZyb21IZWFkQm9uZSA/PyBbMC4wLCAwLjA2LCAwLjBdKTtcblxuICAgIHJldHVybiBsb29rQXQ7XG4gIH1cblxuICBwcml2YXRlIF92MUltcG9ydFJhbmdlTWFwKFxuICAgIHNjaGVtYVJhbmdlTWFwOiBWMVZSTVNjaGVtYS5Mb29rQXRSYW5nZU1hcCB8IHVuZGVmaW5lZCxcbiAgICBkZWZhdWx0T3V0cHV0U2NhbGU6IG51bWJlcixcbiAgKTogVlJNTG9va0F0UmFuZ2VNYXAge1xuICAgIGxldCBpbnB1dE1heFZhbHVlID0gc2NoZW1hUmFuZ2VNYXA/LmlucHV0TWF4VmFsdWUgPz8gOTAuMDtcbiAgICBjb25zdCBvdXRwdXRTY2FsZSA9IHNjaGVtYVJhbmdlTWFwPy5vdXRwdXRTY2FsZSA/PyBkZWZhdWx0T3V0cHV0U2NhbGU7XG5cbiAgICAvLyBJdCBtaWdodCBjYXVzZSBOYU4gd2hlbiBgaW5wdXRNYXhWYWx1ZWAgaXMgdG9vIHNtYWxsXG4gICAgLy8gd2hpY2ggbWFrZXMgdGhlIG1lc2ggb2YgdGhlIGhlYWQgZGlzYXBwZWFyXG4gICAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vcGl4aXYvdGhyZWUtdnJtL2lzc3Vlcy8xMjAxXG4gICAgaWYgKGlucHV0TWF4VmFsdWUgPCBJTlBVVF9NQVhfVkFMVUVfTUlOSU1VTSkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAnVlJNTG9va0F0TG9hZGVyUGx1Z2luOiBpbnB1dE1heFZhbHVlIG9mIGEgcmFuZ2UgbWFwIGlzIHRvbyBzbWFsbC4gQ29uc2lkZXIgcmV2aWV3aW5nIHRoZSByYW5nZSBtYXAhJyxcbiAgICAgICk7XG4gICAgICBpbnB1dE1heFZhbHVlID0gSU5QVVRfTUFYX1ZBTFVFX01JTklNVU07XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBWUk1Mb29rQXRSYW5nZU1hcChpbnB1dE1heFZhbHVlLCBvdXRwdXRTY2FsZSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF92MEltcG9ydChcbiAgICBnbHRmOiBHTFRGLFxuICAgIGh1bWFub2lkOiBWUk1IdW1hbm9pZCxcbiAgICBleHByZXNzaW9uczogVlJNRXhwcmVzc2lvbk1hbmFnZXIsXG4gICk6IFByb21pc2U8VlJNTG9va0F0IHwgbnVsbD4ge1xuICAgIGNvbnN0IGpzb24gPSB0aGlzLnBhcnNlci5qc29uIGFzIEdMVEZTY2hlbWEuSUdMVEY7XG5cbiAgICAvLyBlYXJseSBhYm9ydCBpZiBpdCBkb2Vzbid0IHVzZSB2cm1cbiAgICBjb25zdCB2cm1FeHQgPSBqc29uLmV4dGVuc2lvbnM/LlZSTSBhcyBWMFZSTS5WUk0gfCB1bmRlZmluZWQ7XG4gICAgaWYgKCF2cm1FeHQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNjaGVtYUZpcnN0UGVyc29uID0gdnJtRXh0LmZpcnN0UGVyc29uO1xuICAgIGlmICghc2NoZW1hRmlyc3RQZXJzb24pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGRlZmF1bHRPdXRwdXRTY2FsZSA9IHNjaGVtYUZpcnN0UGVyc29uLmxvb2tBdFR5cGVOYW1lID09PSAnQmxlbmRTaGFwZScgPyAxLjAgOiAxMC4wO1xuXG4gICAgY29uc3QgbWFwSEkgPSB0aGlzLl92MEltcG9ydERlZ3JlZU1hcChzY2hlbWFGaXJzdFBlcnNvbi5sb29rQXRIb3Jpem9udGFsSW5uZXIsIGRlZmF1bHRPdXRwdXRTY2FsZSk7XG4gICAgY29uc3QgbWFwSE8gPSB0aGlzLl92MEltcG9ydERlZ3JlZU1hcChzY2hlbWFGaXJzdFBlcnNvbi5sb29rQXRIb3Jpem9udGFsT3V0ZXIsIGRlZmF1bHRPdXRwdXRTY2FsZSk7XG4gICAgY29uc3QgbWFwVkQgPSB0aGlzLl92MEltcG9ydERlZ3JlZU1hcChzY2hlbWFGaXJzdFBlcnNvbi5sb29rQXRWZXJ0aWNhbERvd24sIGRlZmF1bHRPdXRwdXRTY2FsZSk7XG4gICAgY29uc3QgbWFwVlUgPSB0aGlzLl92MEltcG9ydERlZ3JlZU1hcChzY2hlbWFGaXJzdFBlcnNvbi5sb29rQXRWZXJ0aWNhbFVwLCBkZWZhdWx0T3V0cHV0U2NhbGUpO1xuXG4gICAgbGV0IGFwcGxpZXI7XG5cbiAgICBpZiAoc2NoZW1hRmlyc3RQZXJzb24ubG9va0F0VHlwZU5hbWUgPT09ICdCbGVuZFNoYXBlJykge1xuICAgICAgYXBwbGllciA9IG5ldyBWUk1Mb29rQXRFeHByZXNzaW9uQXBwbGllcihleHByZXNzaW9ucywgbWFwSEksIG1hcEhPLCBtYXBWRCwgbWFwVlUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcHBsaWVyID0gbmV3IFZSTUxvb2tBdEJvbmVBcHBsaWVyKGh1bWFub2lkLCBtYXBISSwgbWFwSE8sIG1hcFZELCBtYXBWVSk7XG4gICAgfVxuXG4gICAgY29uc3QgbG9va0F0ID0gdGhpcy5faW1wb3J0TG9va0F0KGh1bWFub2lkLCBhcHBsaWVyKTtcblxuICAgIGlmIChzY2hlbWFGaXJzdFBlcnNvbi5maXJzdFBlcnNvbkJvbmVPZmZzZXQpIHtcbiAgICAgIGxvb2tBdC5vZmZzZXRGcm9tSGVhZEJvbmUuc2V0KFxuICAgICAgICBzY2hlbWFGaXJzdFBlcnNvbi5maXJzdFBlcnNvbkJvbmVPZmZzZXQueCA/PyAwLjAsXG4gICAgICAgIHNjaGVtYUZpcnN0UGVyc29uLmZpcnN0UGVyc29uQm9uZU9mZnNldC55ID8/IDAuMDYsXG4gICAgICAgIC0oc2NoZW1hRmlyc3RQZXJzb24uZmlyc3RQZXJzb25Cb25lT2Zmc2V0LnogPz8gMC4wKSxcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvb2tBdC5vZmZzZXRGcm9tSGVhZEJvbmUuc2V0KDAuMCwgMC4wNiwgMC4wKTtcbiAgICB9XG5cbiAgICAvLyBWUk0gMC4wIGFyZSBmYWNpbmcgWi0gaW5zdGVhZCBvZiBaK1xuICAgIGxvb2tBdC5mYWNlRnJvbnQuc2V0KDAuMCwgMC4wLCAtMS4wKTtcblxuICAgIGlmIChhcHBsaWVyIGluc3RhbmNlb2YgVlJNTG9va0F0Qm9uZUFwcGxpZXIpIHtcbiAgICAgIGFwcGxpZXIuZmFjZUZyb250LnNldCgwLjAsIDAuMCwgLTEuMCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxvb2tBdDtcbiAgfVxuXG4gIHByaXZhdGUgX3YwSW1wb3J0RGVncmVlTWFwKFxuICAgIHNjaGVtYURlZ3JlZU1hcDogVjBWUk0uRmlyc3RQZXJzb25EZWdyZWVNYXAgfCB1bmRlZmluZWQsXG4gICAgZGVmYXVsdE91dHB1dFNjYWxlOiBudW1iZXIsXG4gICk6IFZSTUxvb2tBdFJhbmdlTWFwIHtcbiAgICBjb25zdCBjdXJ2ZSA9IHNjaGVtYURlZ3JlZU1hcD8uY3VydmU7XG4gICAgaWYgKEpTT04uc3RyaW5naWZ5KGN1cnZlKSAhPT0gJ1swLDAsMCwxLDEsMSwxLDBdJykge1xuICAgICAgY29uc29sZS53YXJuKCdDdXJ2ZXMgb2YgTG9va0F0RGVncmVlTWFwIGRlZmluZWQgaW4gVlJNIDAuMCBhcmUgbm90IHN1cHBvcnRlZCcpO1xuICAgIH1cblxuICAgIGxldCB4UmFuZ2UgPSBzY2hlbWFEZWdyZWVNYXA/LnhSYW5nZSA/PyA5MC4wO1xuICAgIGNvbnN0IHlSYW5nZSA9IHNjaGVtYURlZ3JlZU1hcD8ueVJhbmdlID8/IGRlZmF1bHRPdXRwdXRTY2FsZTtcblxuICAgIC8vIEl0IG1pZ2h0IGNhdXNlIE5hTiB3aGVuIGB4UmFuZ2VgIGlzIHRvbyBzbWFsbFxuICAgIC8vIHdoaWNoIG1ha2VzIHRoZSBtZXNoIG9mIHRoZSBoZWFkIGRpc2FwcGVhclxuICAgIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL3BpeGl2L3RocmVlLXZybS9pc3N1ZXMvMTIwMVxuICAgIGlmICh4UmFuZ2UgPCBJTlBVVF9NQVhfVkFMVUVfTUlOSU1VTSkge1xuICAgICAgY29uc29sZS53YXJuKCdWUk1Mb29rQXRMb2FkZXJQbHVnaW46IHhSYW5nZSBvZiBhIGRlZ3JlZSBtYXAgaXMgdG9vIHNtYWxsLiBDb25zaWRlciByZXZpZXdpbmcgdGhlIGRlZ3JlZSBtYXAhJyk7XG4gICAgICB4UmFuZ2UgPSBJTlBVVF9NQVhfVkFMVUVfTUlOSU1VTTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFZSTUxvb2tBdFJhbmdlTWFwKHhSYW5nZSwgeVJhbmdlKTtcbiAgfVxuXG4gIHByaXZhdGUgX2ltcG9ydExvb2tBdChodW1hbm9pZDogVlJNSHVtYW5vaWQsIGFwcGxpZXI6IFZSTUxvb2tBdEFwcGxpZXIpOiBWUk1Mb29rQXQge1xuICAgIGNvbnN0IGxvb2tBdCA9IG5ldyBWUk1Mb29rQXQoaHVtYW5vaWQsIGFwcGxpZXIpO1xuXG4gICAgaWYgKHRoaXMuaGVscGVyUm9vdCkge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IFZSTUxvb2tBdEhlbHBlcihsb29rQXQpO1xuICAgICAgdGhpcy5oZWxwZXJSb290LmFkZChoZWxwZXIpO1xuICAgICAgaGVscGVyLnJlbmRlck9yZGVyID0gdGhpcy5oZWxwZXJSb290LnJlbmRlck9yZGVyO1xuICAgIH1cblxuICAgIHJldHVybiBsb29rQXQ7XG4gIH1cbn1cbiIsICIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgdHlwZSBvZiBhcHBsaWVyLlxuICovXG5leHBvcnQgY29uc3QgVlJNTG9va0F0VHlwZU5hbWUgPSB7XG4gIEJvbmU6ICdib25lJyxcbiAgRXhwcmVzc2lvbjogJ2V4cHJlc3Npb24nLFxufTtcblxuZXhwb3J0IHR5cGUgVlJNTG9va0F0VHlwZU5hbWUgPSAodHlwZW9mIFZSTUxvb2tBdFR5cGVOYW1lKVtrZXlvZiB0eXBlb2YgVlJNTG9va0F0VHlwZU5hbWVdO1xuIiwgImltcG9ydCB0eXBlIHsgR0xURiwgR0xURkxvYWRlclBsdWdpbiwgR0xURlBhcnNlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXIuanMnO1xuaW1wb3J0IHR5cGUgeyBWUk0wTWV0YSB9IGZyb20gJy4vVlJNME1ldGEnO1xuaW1wb3J0IHR5cGUgeyBWUk0xTWV0YSB9IGZyb20gJy4vVlJNMU1ldGEnO1xuaW1wb3J0IHR5cGUgeyBWUk1NZXRhIH0gZnJvbSAnLi9WUk1NZXRhJztcbmltcG9ydCB0eXBlIHsgVlJNTWV0YUxvYWRlclBsdWdpbk9wdGlvbnMgfSBmcm9tICcuL1ZSTU1ldGFMb2FkZXJQbHVnaW5PcHRpb25zJztcbmltcG9ydCB0eXBlICogYXMgVjBWUk0gZnJvbSAnQHBpeGl2L3R5cGVzLXZybS0wLjAnO1xuaW1wb3J0IHR5cGUgKiBhcyBWMVZSTVNjaGVtYSBmcm9tICdAcGl4aXYvdHlwZXMtdnJtYy12cm0tMS4wJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IHJlc29sdmVVUkwgfSBmcm9tICcuLi91dGlscy9yZXNvbHZlVVJMJztcbmltcG9ydCB7IEdMVEYgYXMgR0xURlNjaGVtYSB9IGZyb20gJ0BnbHRmLXRyYW5zZm9ybS9jb3JlJztcblxuLyoqXG4gKiBQb3NzaWJsZSBzcGVjIHZlcnNpb25zIGl0IHJlY29nbml6ZXMuXG4gKi9cbmNvbnN0IFBPU1NJQkxFX1NQRUNfVkVSU0lPTlMgPSBuZXcgU2V0KFsnMS4wJywgJzEuMC1iZXRhJ10pO1xuXG4vKipcbiAqIEEgcGx1Z2luIG9mIEdMVEZMb2FkZXIgdGhhdCBpbXBvcnRzIGEge0BsaW5rIFZSTTFNZXRhfSBmcm9tIGEgVlJNIGV4dGVuc2lvbiBvZiBhIEdMVEYuXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1NZXRhTG9hZGVyUGx1Z2luIGltcGxlbWVudHMgR0xURkxvYWRlclBsdWdpbiB7XG4gIHB1YmxpYyByZWFkb25seSBwYXJzZXI6IEdMVEZQYXJzZXI7XG5cbiAgLyoqXG4gICAqIElmIGBmYWxzZWAsIGl0IHdvbid0IGxvYWQgaXRzIHRodW1ibmFpbCBpbWFnZSAoe0BsaW5rIFZSTTFNZXRhLnRodW1ibmFpbEltYWdlfSkuXG4gICAqIGBmYWxzZWAgYnkgZGVmYXVsdC5cbiAgICovXG4gIHB1YmxpYyBuZWVkVGh1bWJuYWlsSW1hZ2U6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEEgbGlzdCBvZiBsaWNlbnNlIHVybHMuXG4gICAqIFRoaXMgbWV0YSBsb2FkZXIgd2lsbCBhY2NlcHQgdGhlc2UgYGxpY2Vuc2VVcmxgcy5cbiAgICogT3RoZXJ3aXNlIGl0IHdvbid0IGJlIGxvYWRlZC5cbiAgICovXG4gIHB1YmxpYyBhY2NlcHRMaWNlbnNlVXJsczogc3RyaW5nW107XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgaXQgc2hvdWxkIGFjY2VwdCBWUk0wLjAgbWV0YSBvciBub3QuXG4gICAqIE5vdGUgdGhhdCBpdCBtaWdodCBsb2FkIHtAbGluayBWUk0wTWV0YX0gaW5zdGVhZCBvZiB7QGxpbmsgVlJNMU1ldGF9IHdoZW4gdGhpcyBpcyBgdHJ1ZWAuXG4gICAqIGB0cnVlYCBieSBkZWZhdWx0LlxuICAgKi9cbiAgcHVibGljIGFjY2VwdFYwTWV0YTogYm9vbGVhbjtcblxuICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICAvLyBXZSBzaG91bGQgdXNlIHRoZSBleHRlbnNpb24gbmFtZSBpbnN0ZWFkIGJ1dCB3ZSBoYXZlIG11bHRpcGxlIHBsdWdpbnMgZm9yIGFuIGV4dGVuc2lvbi4uLlxuICAgIHJldHVybiAnVlJNTWV0YUxvYWRlclBsdWdpbic7XG4gIH1cblxuICBwdWJsaWMgY29uc3RydWN0b3IocGFyc2VyOiBHTFRGUGFyc2VyLCBvcHRpb25zPzogVlJNTWV0YUxvYWRlclBsdWdpbk9wdGlvbnMpIHtcbiAgICB0aGlzLnBhcnNlciA9IHBhcnNlcjtcblxuICAgIHRoaXMubmVlZFRodW1ibmFpbEltYWdlID0gb3B0aW9ucz8ubmVlZFRodW1ibmFpbEltYWdlID8/IGZhbHNlO1xuICAgIHRoaXMuYWNjZXB0TGljZW5zZVVybHMgPSBvcHRpb25zPy5hY2NlcHRMaWNlbnNlVXJscyA/PyBbJ2h0dHBzOi8vdnJtLmRldi9saWNlbnNlcy8xLjAvJ107XG4gICAgdGhpcy5hY2NlcHRWME1ldGEgPSBvcHRpb25zPy5hY2NlcHRWME1ldGEgPz8gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBhZnRlclJvb3QoZ2x0ZjogR0xURik6IFByb21pc2U8dm9pZD4ge1xuICAgIGdsdGYudXNlckRhdGEudnJtTWV0YSA9IGF3YWl0IHRoaXMuX2ltcG9ydChnbHRmKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX2ltcG9ydChnbHRmOiBHTFRGKTogUHJvbWlzZTxWUk1NZXRhIHwgbnVsbD4ge1xuICAgIGNvbnN0IHYxUmVzdWx0ID0gYXdhaXQgdGhpcy5fdjFJbXBvcnQoZ2x0Zik7XG4gICAgaWYgKHYxUmVzdWx0ICE9IG51bGwpIHtcbiAgICAgIHJldHVybiB2MVJlc3VsdDtcbiAgICB9XG5cbiAgICBjb25zdCB2MFJlc3VsdCA9IGF3YWl0IHRoaXMuX3YwSW1wb3J0KGdsdGYpO1xuICAgIGlmICh2MFJlc3VsdCAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gdjBSZXN1bHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF92MUltcG9ydChnbHRmOiBHTFRGKTogUHJvbWlzZTxWUk0xTWV0YSB8IG51bGw+IHtcbiAgICBjb25zdCBqc29uID0gdGhpcy5wYXJzZXIuanNvbiBhcyBHTFRGU2NoZW1hLklHTFRGO1xuXG4gICAgLy8gZWFybHkgYWJvcnQgaWYgaXQgZG9lc24ndCB1c2UgdnJtXG4gICAgY29uc3QgaXNWUk1Vc2VkID0ganNvbi5leHRlbnNpb25zVXNlZD8uaW5kZXhPZignVlJNQ192cm0nKSAhPT0gLTE7XG4gICAgaWYgKCFpc1ZSTVVzZWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGV4dGVuc2lvbiA9IGpzb24uZXh0ZW5zaW9ucz8uWydWUk1DX3ZybSddIGFzIFYxVlJNU2NoZW1hLlZSTUNWUk0gfCB1bmRlZmluZWQ7XG4gICAgaWYgKGV4dGVuc2lvbiA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzcGVjVmVyc2lvbiA9IGV4dGVuc2lvbi5zcGVjVmVyc2lvbjtcbiAgICBpZiAoIVBPU1NJQkxFX1NQRUNfVkVSU0lPTlMuaGFzKHNwZWNWZXJzaW9uKSkge1xuICAgICAgY29uc29sZS53YXJuKGBWUk1NZXRhTG9hZGVyUGx1Z2luOiBVbmtub3duIFZSTUNfdnJtIHNwZWNWZXJzaW9uIFwiJHtzcGVjVmVyc2lvbn1cImApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc2NoZW1hTWV0YSA9IGV4dGVuc2lvbi5tZXRhO1xuICAgIGlmICghc2NoZW1hTWV0YSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gdGhyb3cgYW4gZXJyb3IgaWYgYWNjZXB0VjBNZXRhIGlzIGZhbHNlXG4gICAgY29uc3QgbGljZW5zZVVybCA9IHNjaGVtYU1ldGEubGljZW5zZVVybDtcbiAgICBjb25zdCBhY2NlcHRMaWNlbnNlVXJsc1NldCA9IG5ldyBTZXQodGhpcy5hY2NlcHRMaWNlbnNlVXJscyk7XG4gICAgaWYgKCFhY2NlcHRMaWNlbnNlVXJsc1NldC5oYXMobGljZW5zZVVybCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVlJNTWV0YUxvYWRlclBsdWdpbjogVGhlIGxpY2Vuc2UgdXJsIFwiJHtsaWNlbnNlVXJsfVwiIGlzIG5vdCBhY2NlcHRlZGApO1xuICAgIH1cblxuICAgIGxldCB0aHVtYm5haWxJbWFnZTogSFRNTEltYWdlRWxlbWVudCB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgICBpZiAodGhpcy5uZWVkVGh1bWJuYWlsSW1hZ2UgJiYgc2NoZW1hTWV0YS50aHVtYm5haWxJbWFnZSAhPSBudWxsKSB7XG4gICAgICB0aHVtYm5haWxJbWFnZSA9IChhd2FpdCB0aGlzLl9leHRyYWN0R0xURkltYWdlKHNjaGVtYU1ldGEudGh1bWJuYWlsSW1hZ2UpKSA/PyB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIG1ldGFWZXJzaW9uOiAnMScsXG4gICAgICBuYW1lOiBzY2hlbWFNZXRhLm5hbWUsXG4gICAgICB2ZXJzaW9uOiBzY2hlbWFNZXRhLnZlcnNpb24sXG4gICAgICBhdXRob3JzOiBzY2hlbWFNZXRhLmF1dGhvcnMsXG4gICAgICBjb3B5cmlnaHRJbmZvcm1hdGlvbjogc2NoZW1hTWV0YS5jb3B5cmlnaHRJbmZvcm1hdGlvbixcbiAgICAgIGNvbnRhY3RJbmZvcm1hdGlvbjogc2NoZW1hTWV0YS5jb250YWN0SW5mb3JtYXRpb24sXG4gICAgICByZWZlcmVuY2VzOiBzY2hlbWFNZXRhLnJlZmVyZW5jZXMsXG4gICAgICB0aGlyZFBhcnR5TGljZW5zZXM6IHNjaGVtYU1ldGEudGhpcmRQYXJ0eUxpY2Vuc2VzLFxuICAgICAgdGh1bWJuYWlsSW1hZ2UsXG4gICAgICBsaWNlbnNlVXJsOiBzY2hlbWFNZXRhLmxpY2Vuc2VVcmwsXG4gICAgICBhdmF0YXJQZXJtaXNzaW9uOiBzY2hlbWFNZXRhLmF2YXRhclBlcm1pc3Npb24sXG4gICAgICBhbGxvd0V4Y2Vzc2l2ZWx5VmlvbGVudFVzYWdlOiBzY2hlbWFNZXRhLmFsbG93RXhjZXNzaXZlbHlWaW9sZW50VXNhZ2UsXG4gICAgICBhbGxvd0V4Y2Vzc2l2ZWx5U2V4dWFsVXNhZ2U6IHNjaGVtYU1ldGEuYWxsb3dFeGNlc3NpdmVseVNleHVhbFVzYWdlLFxuICAgICAgY29tbWVyY2lhbFVzYWdlOiBzY2hlbWFNZXRhLmNvbW1lcmNpYWxVc2FnZSxcbiAgICAgIGFsbG93UG9saXRpY2FsT3JSZWxpZ2lvdXNVc2FnZTogc2NoZW1hTWV0YS5hbGxvd1BvbGl0aWNhbE9yUmVsaWdpb3VzVXNhZ2UsXG4gICAgICBhbGxvd0FudGlzb2NpYWxPckhhdGVVc2FnZTogc2NoZW1hTWV0YS5hbGxvd0FudGlzb2NpYWxPckhhdGVVc2FnZSxcbiAgICAgIGNyZWRpdE5vdGF0aW9uOiBzY2hlbWFNZXRhLmNyZWRpdE5vdGF0aW9uLFxuICAgICAgYWxsb3dSZWRpc3RyaWJ1dGlvbjogc2NoZW1hTWV0YS5hbGxvd1JlZGlzdHJpYnV0aW9uLFxuICAgICAgbW9kaWZpY2F0aW9uOiBzY2hlbWFNZXRhLm1vZGlmaWNhdGlvbixcbiAgICAgIG90aGVyTGljZW5zZVVybDogc2NoZW1hTWV0YS5vdGhlckxpY2Vuc2VVcmwsXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX3YwSW1wb3J0KGdsdGY6IEdMVEYpOiBQcm9taXNlPFZSTTBNZXRhIHwgbnVsbD4ge1xuICAgIGNvbnN0IGpzb24gPSB0aGlzLnBhcnNlci5qc29uIGFzIEdMVEZTY2hlbWEuSUdMVEY7XG5cbiAgICAvLyBlYXJseSBhYm9ydCBpZiBpdCBkb2Vzbid0IHVzZSB2cm1cbiAgICBjb25zdCB2cm1FeHQgPSBqc29uLmV4dGVuc2lvbnM/LlZSTSBhcyBWMFZSTS5WUk0gfCB1bmRlZmluZWQ7XG4gICAgaWYgKCF2cm1FeHQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNjaGVtYU1ldGEgPSB2cm1FeHQubWV0YTtcbiAgICBpZiAoIXNjaGVtYU1ldGEpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIHRocm93IGFuIGVycm9yIGlmIGFjY2VwdFYwTWV0YSBpcyBmYWxzZVxuICAgIGlmICghdGhpcy5hY2NlcHRWME1ldGEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVlJNTWV0YUxvYWRlclBsdWdpbjogQXR0ZW1wdGVkIHRvIGxvYWQgVlJNMC4wIG1ldGEgYnV0IGFjY2VwdFYwTWV0YSBpcyBmYWxzZScpO1xuICAgIH1cblxuICAgIC8vIGxvYWQgdGh1bWJuYWlsIHRleHR1cmVcbiAgICBsZXQgdGV4dHVyZTogVEhSRUUuVGV4dHVyZSB8IG51bGwgfCB1bmRlZmluZWQ7XG4gICAgaWYgKHRoaXMubmVlZFRodW1ibmFpbEltYWdlICYmIHNjaGVtYU1ldGEudGV4dHVyZSAhPSBudWxsICYmIHNjaGVtYU1ldGEudGV4dHVyZSAhPT0gLTEpIHtcbiAgICAgIHRleHR1cmUgPSBhd2FpdCB0aGlzLnBhcnNlci5nZXREZXBlbmRlbmN5KCd0ZXh0dXJlJywgc2NoZW1hTWV0YS50ZXh0dXJlKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgbWV0YVZlcnNpb246ICcwJyxcbiAgICAgIGFsbG93ZWRVc2VyTmFtZTogc2NoZW1hTWV0YS5hbGxvd2VkVXNlck5hbWUsXG4gICAgICBhdXRob3I6IHNjaGVtYU1ldGEuYXV0aG9yLFxuICAgICAgY29tbWVyY2lhbFVzc2FnZU5hbWU6IHNjaGVtYU1ldGEuY29tbWVyY2lhbFVzc2FnZU5hbWUsXG4gICAgICBjb250YWN0SW5mb3JtYXRpb246IHNjaGVtYU1ldGEuY29udGFjdEluZm9ybWF0aW9uLFxuICAgICAgbGljZW5zZU5hbWU6IHNjaGVtYU1ldGEubGljZW5zZU5hbWUsXG4gICAgICBvdGhlckxpY2Vuc2VVcmw6IHNjaGVtYU1ldGEub3RoZXJMaWNlbnNlVXJsLFxuICAgICAgb3RoZXJQZXJtaXNzaW9uVXJsOiBzY2hlbWFNZXRhLm90aGVyUGVybWlzc2lvblVybCxcbiAgICAgIHJlZmVyZW5jZTogc2NoZW1hTWV0YS5yZWZlcmVuY2UsXG4gICAgICBzZXh1YWxVc3NhZ2VOYW1lOiBzY2hlbWFNZXRhLnNleHVhbFVzc2FnZU5hbWUsXG4gICAgICB0ZXh0dXJlOiB0ZXh0dXJlID8/IHVuZGVmaW5lZCxcbiAgICAgIHRpdGxlOiBzY2hlbWFNZXRhLnRpdGxlLFxuICAgICAgdmVyc2lvbjogc2NoZW1hTWV0YS52ZXJzaW9uLFxuICAgICAgdmlvbGVudFVzc2FnZU5hbWU6IHNjaGVtYU1ldGEudmlvbGVudFVzc2FnZU5hbWUsXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX2V4dHJhY3RHTFRGSW1hZ2UoaW5kZXg6IG51bWJlcik6IFByb21pc2U8SFRNTEltYWdlRWxlbWVudCB8IG51bGw+IHtcbiAgICBjb25zdCBqc29uID0gdGhpcy5wYXJzZXIuanNvbiBhcyBHTFRGU2NoZW1hLklHTFRGO1xuXG4gICAgY29uc3Qgc291cmNlID0ganNvbi5pbWFnZXM/LltpbmRleF07XG5cbiAgICBpZiAoc291cmNlID09IG51bGwpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgYFZSTU1ldGFMb2FkZXJQbHVnaW46IEF0dGVtcHQgdG8gdXNlIGltYWdlc1ske2luZGV4fV0gb2YgZ2xURiBhcyBhIHRodW1ibmFpbCBidXQgdGhlIGltYWdlIGRvZXNuJ3QgZXhpc3RgLFxuICAgICAgKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIFJlZjogaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9ibG9iL3IxMjQvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlci5qcyNMMjQ2N1xuXG4gICAgLy8gYHNvdXJjZS51cmlgIG1pZ2h0IGJlIGEgcmVmZXJlbmNlIHRvIGEgZmlsZVxuICAgIGxldCBzb3VyY2VVUkk6IHN0cmluZyB8IHVuZGVmaW5lZCA9IHNvdXJjZS51cmk7XG5cbiAgICAvLyBMb2FkIHRoZSBiaW5hcnkgYXMgYSBibG9iXG4gICAgaWYgKHNvdXJjZS5idWZmZXJWaWV3ICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGJ1ZmZlclZpZXcgPSBhd2FpdCB0aGlzLnBhcnNlci5nZXREZXBlbmRlbmN5KCdidWZmZXJWaWV3Jywgc291cmNlLmJ1ZmZlclZpZXcpO1xuICAgICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtidWZmZXJWaWV3XSwgeyB0eXBlOiBzb3VyY2UubWltZVR5cGUgfSk7XG4gICAgICBzb3VyY2VVUkkgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgIH1cblxuICAgIGlmIChzb3VyY2VVUkkgPT0gbnVsbCkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBgVlJNTWV0YUxvYWRlclBsdWdpbjogQXR0ZW1wdCB0byB1c2UgaW1hZ2VzWyR7aW5kZXh9XSBvZiBnbFRGIGFzIGEgdGh1bWJuYWlsIGJ1dCB0aGUgaW1hZ2UgY291bGRuJ3QgbG9hZCBwcm9wZXJseWAsXG4gICAgICApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgbG9hZGVyID0gbmV3IFRIUkVFLkltYWdlTG9hZGVyKCk7XG4gICAgcmV0dXJuIGF3YWl0IGxvYWRlci5sb2FkQXN5bmMocmVzb2x2ZVVSTChzb3VyY2VVUkksICh0aGlzLnBhcnNlciBhcyBhbnkpLm9wdGlvbnMucGF0aCkpLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICBjb25zb2xlLndhcm4oJ1ZSTU1ldGFMb2FkZXJQbHVnaW46IEZhaWxlZCB0byBsb2FkIGEgdGh1bWJuYWlsIGltYWdlJyk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9KTtcbiAgfVxufVxuIiwgIi8qKlxuICogWW9pbmtlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvYmxvYi9tYXN0ZXIvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlci5qc1xuICovXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZVVSTCh1cmw6IHN0cmluZywgcGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgLy8gSW52YWxpZCBVUkxcbiAgaWYgKHR5cGVvZiB1cmwgIT09ICdzdHJpbmcnIHx8IHVybCA9PT0gJycpIHJldHVybiAnJztcblxuICAvLyBIb3N0IFJlbGF0aXZlIFVSTFxuICBpZiAoL15odHRwcz86XFwvXFwvL2kudGVzdChwYXRoKSAmJiAvXlxcLy8udGVzdCh1cmwpKSB7XG4gICAgcGF0aCA9IHBhdGgucmVwbGFjZSgvKF5odHRwcz86XFwvXFwvW14vXSspLiovaSwgJyQxJyk7XG4gIH1cblxuICAvLyBBYnNvbHV0ZSBVUkwgaHR0cDovLyxodHRwczovLywvL1xuICBpZiAoL14oaHR0cHM/Oik/XFwvXFwvL2kudGVzdCh1cmwpKSByZXR1cm4gdXJsO1xuXG4gIC8vIERhdGEgVVJJXG4gIGlmICgvXmRhdGE6LiosLiokL2kudGVzdCh1cmwpKSByZXR1cm4gdXJsO1xuXG4gIC8vIEJsb2IgVVJMXG4gIGlmICgvXmJsb2I6LiokL2kudGVzdCh1cmwpKSByZXR1cm4gdXJsO1xuXG4gIC8vIFJlbGF0aXZlIFVSTFxuICByZXR1cm4gcGF0aCArIHVybDtcbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1FeHByZXNzaW9uTWFuYWdlciB9IGZyb20gJy4vZXhwcmVzc2lvbnMvVlJNRXhwcmVzc2lvbk1hbmFnZXInO1xuaW1wb3J0IHsgVlJNRmlyc3RQZXJzb24gfSBmcm9tICcuL2ZpcnN0UGVyc29uL1ZSTUZpcnN0UGVyc29uJztcbmltcG9ydCB7IFZSTUh1bWFub2lkIH0gZnJvbSAnLi9odW1hbm9pZC9WUk1IdW1hbm9pZCc7XG5pbXBvcnQgeyBWUk1Mb29rQXQgfSBmcm9tICcuL2xvb2tBdC9WUk1Mb29rQXQnO1xuaW1wb3J0IHsgVlJNTWV0YSB9IGZyb20gJy4vbWV0YS9WUk1NZXRhJztcbmltcG9ydCB7IFZSTUNvcmVQYXJhbWV0ZXJzIH0gZnJvbSAnLi9WUk1Db3JlUGFyYW1ldGVycyc7XG5cbi8qKlxuICogQSBjbGFzcyB0aGF0IHJlcHJlc2VudHMgYSBzaW5nbGUgVlJNIG1vZGVsLlxuICogVGhpcyBjbGFzcyBvbmx5IGluY2x1ZGVzIGNvcmUgc3BlYyBvZiB0aGUgVlJNIChgVlJNQ192cm1gKS5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUNvcmUge1xuICAvKipcbiAgICogYFRIUkVFLkdyb3VwYCB0aGF0IGNvbnRhaW5zIHRoZSBlbnRpcmUgVlJNLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IHNjZW5lOiBUSFJFRS5Hcm91cDtcblxuICAvKipcbiAgICogQ29udGFpbnMgbWV0YSBmaWVsZHMgb2YgdGhlIFZSTS5cbiAgICogWW91IG1pZ2h0IHdhbnQgdG8gcmVmZXIgdGhlc2UgbGljZW5zZSBmaWVsZHMgYmVmb3JlIHVzZSB5b3VyIFZSTXMuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgbWV0YTogVlJNTWV0YTtcblxuICAvKipcbiAgICogQ29udGFpbnMge0BsaW5rIFZSTUh1bWFub2lkfSBvZiB0aGUgVlJNLlxuICAgKiBZb3UgY2FuIGNvbnRyb2wgZWFjaCBib25lcyB1c2luZyB7QGxpbmsgVlJNSHVtYW5vaWQuZ2V0Tm9ybWFsaXplZEJvbmVOb2RlfSBvciB7QGxpbmsgVlJNSHVtYW5vaWQuZ2V0UmF3Qm9uZU5vZGV9LlxuICAgKlxuICAgKiBAVE9ETyBBZGQgYSBsaW5rIHRvIFZSTSBzcGVjXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgaHVtYW5vaWQ6IFZSTUh1bWFub2lkO1xuXG4gIC8qKlxuICAgKiBDb250YWlucyB7QGxpbmsgVlJNRXhwcmVzc2lvbk1hbmFnZXJ9IG9mIHRoZSBWUk0uXG4gICAqIFlvdSBtaWdodCB3YW50IHRvIGNvbnRyb2wgdGhlc2UgZmFjaWFsIGV4cHJlc3Npb25zIHZpYSB7QGxpbmsgVlJNRXhwcmVzc2lvbk1hbmFnZXIuc2V0VmFsdWV9LlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGV4cHJlc3Npb25NYW5hZ2VyPzogVlJNRXhwcmVzc2lvbk1hbmFnZXI7XG5cbiAgLyoqXG4gICAqIENvbnRhaW5zIHtAbGluayBWUk1GaXJzdFBlcnNvbn0gb2YgdGhlIFZSTS5cbiAgICogVlJNRmlyc3RQZXJzb24gaXMgbW9zdGx5IHVzZWQgZm9yIG1lc2ggY3VsbGluZyBmb3IgZmlyc3QgcGVyc29uIHZpZXcuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgZmlyc3RQZXJzb24/OiBWUk1GaXJzdFBlcnNvbjtcblxuICAvKipcbiAgICogQ29udGFpbnMge0BsaW5rIFZSTUxvb2tBdH0gb2YgdGhlIFZSTS5cbiAgICogWW91IG1pZ2h0IHdhbnQgdG8gdXNlIHtAbGluayBWUk1Mb29rQXQudGFyZ2V0fSB0byBjb250cm9sIHRoZSBleWUgZGlyZWN0aW9uIG9mIHlvdXIgVlJNcy5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBsb29rQXQ/OiBWUk1Mb29rQXQ7XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBWUk0gaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSBwYXJhbXMge0BsaW5rIFZSTVBhcmFtZXRlcnN9IHRoYXQgcmVwcmVzZW50cyBjb21wb25lbnRzIG9mIHRoZSBWUk1cbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJhbXM6IFZSTUNvcmVQYXJhbWV0ZXJzKSB7XG4gICAgdGhpcy5zY2VuZSA9IHBhcmFtcy5zY2VuZTtcbiAgICB0aGlzLm1ldGEgPSBwYXJhbXMubWV0YTtcbiAgICB0aGlzLmh1bWFub2lkID0gcGFyYW1zLmh1bWFub2lkO1xuICAgIHRoaXMuZXhwcmVzc2lvbk1hbmFnZXIgPSBwYXJhbXMuZXhwcmVzc2lvbk1hbmFnZXI7XG4gICAgdGhpcy5maXJzdFBlcnNvbiA9IHBhcmFtcy5maXJzdFBlcnNvbjtcbiAgICB0aGlzLmxvb2tBdCA9IHBhcmFtcy5sb29rQXQ7XG4gIH1cblxuICAvKipcbiAgICogKipZb3UgbmVlZCB0byBjYWxsIHRoaXMgb24geW91ciB1cGRhdGUgbG9vcC4qKlxuICAgKlxuICAgKiBUaGlzIGZ1bmN0aW9uIHVwZGF0ZXMgZXZlcnkgVlJNIGNvbXBvbmVudHMuXG4gICAqXG4gICAqIEBwYXJhbSBkZWx0YSBkZWx0YVRpbWVcbiAgICovXG4gIHB1YmxpYyB1cGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuaHVtYW5vaWQudXBkYXRlKCk7XG5cbiAgICBpZiAodGhpcy5sb29rQXQpIHtcbiAgICAgIHRoaXMubG9va0F0LnVwZGF0ZShkZWx0YSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZXhwcmVzc2lvbk1hbmFnZXIpIHtcbiAgICAgIHRoaXMuZXhwcmVzc2lvbk1hbmFnZXIudXBkYXRlKCk7XG4gICAgfVxuICB9XG59XG4iLCAiaW1wb3J0IHsgR0xURiwgR0xURkxvYWRlclBsdWdpbiwgR0xURlBhcnNlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXIuanMnO1xuaW1wb3J0IHsgVlJNQ29yZUxvYWRlclBsdWdpbk9wdGlvbnMgfSBmcm9tICcuL1ZSTUNvcmVMb2FkZXJQbHVnaW5PcHRpb25zJztcbmltcG9ydCB7IFZSTUNvcmUgfSBmcm9tICcuL1ZSTUNvcmUnO1xuaW1wb3J0IHsgVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbiB9IGZyb20gJy4vZXhwcmVzc2lvbnMvVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbic7XG5pbXBvcnQgeyBWUk1GaXJzdFBlcnNvbkxvYWRlclBsdWdpbiB9IGZyb20gJy4vZmlyc3RQZXJzb24vVlJNRmlyc3RQZXJzb25Mb2FkZXJQbHVnaW4nO1xuaW1wb3J0IHsgVlJNSHVtYW5vaWRMb2FkZXJQbHVnaW4gfSBmcm9tICcuL2h1bWFub2lkL1ZSTUh1bWFub2lkTG9hZGVyUGx1Z2luJztcbmltcG9ydCB7IFZSTU1ldGFMb2FkZXJQbHVnaW4gfSBmcm9tICcuL21ldGEvVlJNTWV0YUxvYWRlclBsdWdpbic7XG5pbXBvcnQgeyBWUk1Mb29rQXRMb2FkZXJQbHVnaW4gfSBmcm9tICcuL2xvb2tBdC9WUk1Mb29rQXRMb2FkZXJQbHVnaW4nO1xuaW1wb3J0IHR5cGUgeyBWUk1IdW1hbm9pZCB9IGZyb20gJy4vaHVtYW5vaWQnO1xuaW1wb3J0IHR5cGUgeyBWUk1NZXRhIH0gZnJvbSAnLi9tZXRhJztcblxuZXhwb3J0IGNsYXNzIFZSTUNvcmVMb2FkZXJQbHVnaW4gaW1wbGVtZW50cyBHTFRGTG9hZGVyUGx1Z2luIHtcbiAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7XG4gICAgLy8gV2Ugc2hvdWxkIHVzZSB0aGUgZXh0ZW5zaW9uIG5hbWUgaW5zdGVhZCBidXQgd2UgaGF2ZSBtdWx0aXBsZSBwbHVnaW5zIGZvciBhbiBleHRlbnNpb24uLi5cbiAgICByZXR1cm4gJ1ZSTUNfdnJtJztcbiAgfVxuXG4gIHB1YmxpYyByZWFkb25seSBwYXJzZXI6IEdMVEZQYXJzZXI7XG5cbiAgcHVibGljIHJlYWRvbmx5IGV4cHJlc3Npb25QbHVnaW46IFZSTUV4cHJlc3Npb25Mb2FkZXJQbHVnaW47XG4gIHB1YmxpYyByZWFkb25seSBmaXJzdFBlcnNvblBsdWdpbjogVlJNRmlyc3RQZXJzb25Mb2FkZXJQbHVnaW47XG4gIHB1YmxpYyByZWFkb25seSBodW1hbm9pZFBsdWdpbjogVlJNSHVtYW5vaWRMb2FkZXJQbHVnaW47XG4gIHB1YmxpYyByZWFkb25seSBsb29rQXRQbHVnaW46IFZSTUxvb2tBdExvYWRlclBsdWdpbjtcbiAgcHVibGljIHJlYWRvbmx5IG1ldGFQbHVnaW46IFZSTU1ldGFMb2FkZXJQbHVnaW47XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBhcnNlcjogR0xURlBhcnNlciwgb3B0aW9ucz86IFZSTUNvcmVMb2FkZXJQbHVnaW5PcHRpb25zKSB7XG4gICAgdGhpcy5wYXJzZXIgPSBwYXJzZXI7XG5cbiAgICBjb25zdCBoZWxwZXJSb290ID0gb3B0aW9ucz8uaGVscGVyUm9vdDtcbiAgICBjb25zdCBhdXRvVXBkYXRlSHVtYW5Cb25lcyA9IG9wdGlvbnM/LmF1dG9VcGRhdGVIdW1hbkJvbmVzO1xuXG4gICAgdGhpcy5leHByZXNzaW9uUGx1Z2luID0gb3B0aW9ucz8uZXhwcmVzc2lvblBsdWdpbiA/PyBuZXcgVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbihwYXJzZXIpO1xuICAgIHRoaXMuZmlyc3RQZXJzb25QbHVnaW4gPSBvcHRpb25zPy5maXJzdFBlcnNvblBsdWdpbiA/PyBuZXcgVlJNRmlyc3RQZXJzb25Mb2FkZXJQbHVnaW4ocGFyc2VyKTtcbiAgICB0aGlzLmh1bWFub2lkUGx1Z2luID1cbiAgICAgIG9wdGlvbnM/Lmh1bWFub2lkUGx1Z2luID8/IG5ldyBWUk1IdW1hbm9pZExvYWRlclBsdWdpbihwYXJzZXIsIHsgaGVscGVyUm9vdCwgYXV0b1VwZGF0ZUh1bWFuQm9uZXMgfSk7XG4gICAgdGhpcy5sb29rQXRQbHVnaW4gPSBvcHRpb25zPy5sb29rQXRQbHVnaW4gPz8gbmV3IFZSTUxvb2tBdExvYWRlclBsdWdpbihwYXJzZXIsIHsgaGVscGVyUm9vdCB9KTtcbiAgICB0aGlzLm1ldGFQbHVnaW4gPSBvcHRpb25zPy5tZXRhUGx1Z2luID8/IG5ldyBWUk1NZXRhTG9hZGVyUGx1Z2luKHBhcnNlcik7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgYWZ0ZXJSb290KGdsdGY6IEdMVEYpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLm1ldGFQbHVnaW4uYWZ0ZXJSb290KGdsdGYpO1xuICAgIGF3YWl0IHRoaXMuaHVtYW5vaWRQbHVnaW4uYWZ0ZXJSb290KGdsdGYpO1xuICAgIGF3YWl0IHRoaXMuZXhwcmVzc2lvblBsdWdpbi5hZnRlclJvb3QoZ2x0Zik7XG4gICAgYXdhaXQgdGhpcy5sb29rQXRQbHVnaW4uYWZ0ZXJSb290KGdsdGYpO1xuICAgIGF3YWl0IHRoaXMuZmlyc3RQZXJzb25QbHVnaW4uYWZ0ZXJSb290KGdsdGYpO1xuXG4gICAgY29uc3QgbWV0YSA9IGdsdGYudXNlckRhdGEudnJtTWV0YSBhcyBWUk1NZXRhIHwgbnVsbDtcbiAgICBjb25zdCBodW1hbm9pZCA9IGdsdGYudXNlckRhdGEudnJtSHVtYW5vaWQgYXMgVlJNSHVtYW5vaWQgfCBudWxsO1xuXG4gICAgLy8gbWV0YSBhbmQgaHVtYW5vaWQgYXJlIHJlcXVpcmVkIHRvIGJlIGEgVlJNLlxuICAgIC8vIERvbid0IGNyZWF0ZSBWUk0gaWYgdGhleSBhcmUgbnVsbFxuICAgIGlmIChtZXRhICYmIGh1bWFub2lkKSB7XG4gICAgICBjb25zdCB2cm1Db3JlID0gbmV3IFZSTUNvcmUoe1xuICAgICAgICBzY2VuZTogZ2x0Zi5zY2VuZSxcbiAgICAgICAgZXhwcmVzc2lvbk1hbmFnZXI6IGdsdGYudXNlckRhdGEudnJtRXhwcmVzc2lvbk1hbmFnZXIsXG4gICAgICAgIGZpcnN0UGVyc29uOiBnbHRmLnVzZXJEYXRhLnZybUZpcnN0UGVyc29uLFxuICAgICAgICBodW1hbm9pZCxcbiAgICAgICAgbG9va0F0OiBnbHRmLnVzZXJEYXRhLnZybUxvb2tBdCxcbiAgICAgICAgbWV0YSxcbiAgICAgIH0pO1xuXG4gICAgICBnbHRmLnVzZXJEYXRhLnZybUNvcmUgPSB2cm1Db3JlO1xuICAgIH1cbiAgfVxufVxuIiwgImltcG9ydCB7IFZSTUxvb2tBdCB9IGZyb20gJ0BwaXhpdi90aHJlZS12cm0tY29yZSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbmNvbnN0IFJBRDJERUcgPSAxODAgLyBNYXRoLlBJO1xuXG5jb25zdCBfZXVsZXJBID0gLypAX19QVVJFX18qLyBuZXcgVEhSRUUuRXVsZXIoKTtcblxuZXhwb3J0IGNsYXNzIFZSTUxvb2tBdFF1YXRlcm5pb25Qcm94eSBleHRlbmRzIFRIUkVFLk9iamVjdDNEIHtcbiAgcHVibGljIHJlYWRvbmx5IHZybUxvb2tBdDogVlJNTG9va0F0O1xuICBwdWJsaWMgb3ZlcnJpZGUgcmVhZG9ubHkgdHlwZTogc3RyaW5nIHwgJ1ZSTUxvb2tBdFF1YXRlcm5pb25Qcm94eSc7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGxvb2tBdDogVlJNTG9va0F0KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMudnJtTG9va0F0ID0gbG9va0F0O1xuXG4gICAgdGhpcy50eXBlID0gJ1ZSTUxvb2tBdFF1YXRlcm5pb25Qcm94eSc7XG5cbiAgICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvYmxvYi9yMTU4L3NyYy9jb3JlL09iamVjdDNELmpzI0w2NVxuICAgIGNvbnN0IHByZXZSb3RhdGlvbk9uQ2hhbmdlQ2FsbGJhY2sgPSB0aGlzLnJvdGF0aW9uLl9vbkNoYW5nZUNhbGxiYWNrO1xuICAgIHRoaXMucm90YXRpb24uX29uQ2hhbmdlKCgpID0+IHtcbiAgICAgIHByZXZSb3RhdGlvbk9uQ2hhbmdlQ2FsbGJhY2soKTtcbiAgICAgIHRoaXMuX2FwcGx5VG9Mb29rQXQoKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHByZXZRdWF0ZXJuaW9uT25DaGFuZ2VDYWxsYmFjayA9IHRoaXMucXVhdGVybmlvbi5fb25DaGFuZ2VDYWxsYmFjaztcbiAgICB0aGlzLnF1YXRlcm5pb24uX29uQ2hhbmdlKCgpID0+IHtcbiAgICAgIHByZXZRdWF0ZXJuaW9uT25DaGFuZ2VDYWxsYmFjaygpO1xuICAgICAgdGhpcy5fYXBwbHlUb0xvb2tBdCgpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfYXBwbHlUb0xvb2tBdCgpOiB2b2lkIHtcbiAgICBfZXVsZXJBLnNldEZyb21RdWF0ZXJuaW9uKHRoaXMucXVhdGVybmlvbiwgVlJNTG9va0F0LkVVTEVSX09SREVSKTtcblxuICAgIHRoaXMudnJtTG9va0F0LnlhdyA9IFJBRDJERUcgKiBfZXVsZXJBLnk7XG4gICAgdGhpcy52cm1Mb29rQXQucGl0Y2ggPSBSQUQyREVHICogX2V1bGVyQS54O1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHR5cGUgeyBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSwgVlJNSHVtYW5Cb25lTmFtZSB9IGZyb20gJ0BwaXhpdi90aHJlZS12cm0tY29yZSc7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG5pbXBvcnQgdHlwZSB7IGNyZWF0ZVZSTUFuaW1hdGlvbkNsaXAgfSBmcm9tICcuL2NyZWF0ZVZSTUFuaW1hdGlvbkNsaXAnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBzaW5nbGUgVlJNIEFuaW1hdGlvbi5cbiAqIFlvdSBwcm9iYWJseSB3YW50IHRvIGNyZWF0ZSBhbiBBbmltYXRpb25DbGlwIHVzaW5nIHtAbGluayBjcmVhdGVWUk1BbmltYXRpb25DbGlwfS5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUFuaW1hdGlvbiB7XG4gIHB1YmxpYyBkdXJhdGlvbjogbnVtYmVyO1xuICBwdWJsaWMgcmVzdEhpcHNQb3NpdGlvbjogVEhSRUUuVmVjdG9yMztcblxuICBwdWJsaWMgaHVtYW5vaWRUcmFja3M6IHtcbiAgICB0cmFuc2xhdGlvbjogTWFwPCdoaXBzJywgVEhSRUUuVmVjdG9yS2V5ZnJhbWVUcmFjaz47XG4gICAgcm90YXRpb246IE1hcDxWUk1IdW1hbkJvbmVOYW1lLCBUSFJFRS5RdWF0ZXJuaW9uS2V5ZnJhbWVUcmFjaz47XG4gIH07XG4gIHB1YmxpYyBleHByZXNzaW9uVHJhY2tzOiB7XG4gICAgcHJlc2V0OiBNYXA8VlJNRXhwcmVzc2lvblByZXNldE5hbWUsIFRIUkVFLk51bWJlcktleWZyYW1lVHJhY2s+O1xuICAgIGN1c3RvbTogTWFwPHN0cmluZywgVEhSRUUuTnVtYmVyS2V5ZnJhbWVUcmFjaz47XG4gIH07XG4gIHB1YmxpYyBsb29rQXRUcmFjazogVEhSRUUuUXVhdGVybmlvbktleWZyYW1lVHJhY2sgfCBudWxsO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmR1cmF0aW9uID0gMC4wO1xuICAgIHRoaXMucmVzdEhpcHNQb3NpdGlvbiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbiAgICB0aGlzLmh1bWFub2lkVHJhY2tzID0ge1xuICAgICAgdHJhbnNsYXRpb246IG5ldyBNYXAoKSxcbiAgICAgIHJvdGF0aW9uOiBuZXcgTWFwKCksXG4gICAgfTtcblxuICAgIHRoaXMuZXhwcmVzc2lvblRyYWNrcyA9IHtcbiAgICAgIHByZXNldDogbmV3IE1hcCgpLFxuICAgICAgY3VzdG9tOiBuZXcgTWFwKCksXG4gICAgfTtcblxuICAgIHRoaXMubG9va0F0VHJhY2sgPSBudWxsO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgR0xURiwgR0xURkxvYWRlclBsdWdpbiwgR0xURlBhcnNlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXIuanMnO1xuaW1wb3J0IHsgR0xURiBhcyBHTFRGU2NoZW1hIH0gZnJvbSAnQGdsdGYtdHJhbnNmb3JtL2NvcmUnO1xuaW1wb3J0IHsgVlJNQ1ZSTUFuaW1hdGlvbiB9IGZyb20gJ0BwaXhpdi90eXBlcy12cm1jLXZybS1hbmltYXRpb24tMS4wJztcbmltcG9ydCB0eXBlIHsgVlJNSHVtYW5Cb25lTmFtZSB9IGZyb20gJ0BwaXhpdi90aHJlZS12cm0tY29yZSc7XG5pbXBvcnQgeyBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSwgVlJNSHVtYW5Cb25lUGFyZW50TWFwIH0gZnJvbSAnQHBpeGl2L3RocmVlLXZybS1jb3JlJztcbmltcG9ydCB7IFZSTUFuaW1hdGlvbiB9IGZyb20gJy4vVlJNQW5pbWF0aW9uJztcbmltcG9ydCB7IGFycmF5Q2h1bmsgfSBmcm9tICcuL3V0aWxzL2FycmF5Q2h1bmsnO1xuXG5jb25zdCBNQVQ0X0lERU5USVRZID0gLypAX19QVVJFX18qLyBuZXcgVEhSRUUuTWF0cml4NCgpO1xuXG5jb25zdCBfdjNBID0gLypAX19QVVJFX18qLyBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3F1YXRBID0gLypAX19QVVJFX18qLyBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuY29uc3QgX3F1YXRCID0gLypAX19QVVJFX18qLyBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuY29uc3QgX3F1YXRDID0gLypAX19QVVJFX18qLyBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXG4vKipcbiAqIFBvc3NpYmxlIHNwZWMgdmVyc2lvbnMgaXQgcmVjb2duaXplcy5cbiAqL1xuY29uc3QgUE9TU0lCTEVfU1BFQ19WRVJTSU9OUyA9IC8qQF9fUFVSRV9fKi8gbmV3IFNldChbJzEuMCcsICcxLjAtZHJhZnQnXSk7XG5cbmNvbnN0IHZybUV4cHJlc3Npb25QcmVzZXROYW1lU2V0OiBTZXQ8c3RyaW5nPiA9IC8qQF9fUFVSRV9fKi8gbmV3IFNldChPYmplY3QudmFsdWVzKFZSTUV4cHJlc3Npb25QcmVzZXROYW1lKSk7XG5cbmludGVyZmFjZSBWUk1BbmltYXRpb25Mb2FkZXJQbHVnaW5Ob2RlTWFwIHtcbiAgaHVtYW5vaWRJbmRleFRvTmFtZTogTWFwPG51bWJlciwgVlJNSHVtYW5Cb25lTmFtZT47XG4gIGV4cHJlc3Npb25zSW5kZXhUb05hbWU6IE1hcDxudW1iZXIsIHN0cmluZz47XG4gIGxvb2tBdEluZGV4OiBudW1iZXIgfCBudWxsO1xufVxuXG50eXBlIFZSTUFuaW1hdGlvbkxvYWRlclBsdWdpbldvcmxkTWF0cml4TWFwID0gTWFwPFZSTUh1bWFuQm9uZU5hbWUgfCAnaGlwc1BhcmVudCcsIFRIUkVFLk1hdHJpeDQ+O1xuXG4vKipcbiAqIEEgcGx1Z2luIG9mIEdMVEZMb2FkZXIgdGhhdCBpbXBvcnRzIHtAbGluayBWUk1BbmltYXRpb259cyBmcm9tIGEgYFZSTUNfdnJtX2FuaW1hdGlvbmAgZXh0ZW5zaW9uIGFuZCBnbHRmIGFuaW1hdGlvbnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1BbmltYXRpb25Mb2FkZXJQbHVnaW4gaW1wbGVtZW50cyBHTFRGTG9hZGVyUGx1Z2luIHtcbiAgcHVibGljIHJlYWRvbmx5IHBhcnNlcjogR0xURlBhcnNlcjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IocGFyc2VyOiBHTFRGUGFyc2VyKSB7XG4gICAgdGhpcy5wYXJzZXIgPSBwYXJzZXI7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJ1ZSTUNfdnJtX2FuaW1hdGlvbic7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgYWZ0ZXJSb290KGdsdGY6IEdMVEYpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBkZWZHbHRmID0gZ2x0Zi5wYXJzZXIuanNvbiBhcyBHTFRGU2NoZW1hLklHTFRGO1xuICAgIGNvbnN0IGRlZkV4dGVuc2lvbnNVc2VkID0gZGVmR2x0Zi5leHRlbnNpb25zVXNlZDtcblxuICAgIGlmIChkZWZFeHRlbnNpb25zVXNlZCA9PSBudWxsIHx8IGRlZkV4dGVuc2lvbnNVc2VkLmluZGV4T2YodGhpcy5uYW1lKSA9PSAtMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGRlZkV4dGVuc2lvbiA9IGRlZkdsdGYuZXh0ZW5zaW9ucz8uW3RoaXMubmFtZV0gYXMgVlJNQ1ZSTUFuaW1hdGlvbiB8IHVuZGVmaW5lZDtcblxuICAgIGlmIChkZWZFeHRlbnNpb24gPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHNwZWNWZXJzaW9uID0gZGVmRXh0ZW5zaW9uLnNwZWNWZXJzaW9uO1xuICAgIGlmIChzcGVjVmVyc2lvbiA9PSBudWxsKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICdWUk1BbmltYXRpb25Mb2FkZXJQbHVnaW46IHNwZWNWZXJzaW9uIG9mIHRoZSBWUk1BIGlzIG5vdCBkZWZpbmVkLiBDb25zaWRlciB1cGRhdGluZyB0aGUgYW5pbWF0aW9uIGZpbGUuIEFzc3VtaW5nIHRoZSBzcGVjIHZlcnNpb24gaXMgMS4wLicsXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIVBPU1NJQkxFX1NQRUNfVkVSU0lPTlMuaGFzKHNwZWNWZXJzaW9uKSkge1xuICAgICAgICBjb25zb2xlLndhcm4oYFZSTUFuaW1hdGlvbkxvYWRlclBsdWdpbjogVW5rbm93biBWUk1DX3ZybV9hbmltYXRpb24gc3BlYyB2ZXJzaW9uOiAke3NwZWNWZXJzaW9ufWApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoc3BlY1ZlcnNpb24gPT09ICcxLjAtZHJhZnQnKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAnVlJNQW5pbWF0aW9uTG9hZGVyUGx1Z2luOiBVc2luZyBhIGRyYWZ0IHNwZWMgdmVyc2lvbjogMS4wLWRyYWZ0LiBTb21lIGJlaGF2aW9ycyBtYXkgYmUgZGlmZmVyZW50LiBDb25zaWRlciB1cGRhdGluZyB0aGUgYW5pbWF0aW9uIGZpbGUuJyxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBub2RlTWFwID0gdGhpcy5fY3JlYXRlTm9kZU1hcChkZWZFeHRlbnNpb24pO1xuICAgIGNvbnN0IHdvcmxkTWF0cml4TWFwID0gYXdhaXQgdGhpcy5fY3JlYXRlQm9uZVdvcmxkTWF0cml4TWFwKGdsdGYsIGRlZkV4dGVuc2lvbik7XG5cbiAgICBjb25zdCBoaXBzTm9kZSA9IGRlZkV4dGVuc2lvbi5odW1hbm9pZD8uaHVtYW5Cb25lc1snaGlwcyddPy5ub2RlO1xuICAgIGNvbnN0IGhpcHMgPSBoaXBzTm9kZSAhPSBudWxsID8gKChhd2FpdCBnbHRmLnBhcnNlci5nZXREZXBlbmRlbmN5KCdub2RlJywgaGlwc05vZGUpKSBhcyBUSFJFRS5PYmplY3QzRCkgOiBudWxsO1xuXG4gICAgY29uc3QgcmVzdEhpcHNQb3NpdGlvbiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG4gICAgaGlwcz8uZ2V0V29ybGRQb3NpdGlvbihyZXN0SGlwc1Bvc2l0aW9uKTtcblxuICAgIC8vIElmIHRoZSB5IGNvbXBvbmVudCBvZiB0aGUgcmVzdCBoaXBzIHBvc2l0aW9uIGlzIGFwcHJveGltYXRlbHkgemVybyBvciBiZWxvdyxcbiAgICAvLyBpdCBpcyBjb25zaWRlcmVkIHRoYXQgdGhlIGFuaW1hdGlvbiB2aW9sYXRlcyB0aGUgVlJNIFQtcG9zZVxuICAgIGlmIChyZXN0SGlwc1Bvc2l0aW9uLnkgPCAxZS0zKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICdWUk1BbmltYXRpb25Mb2FkZXJQbHVnaW46IFRoZSBsb2FkZWQgVlJNIEFuaW1hdGlvbiBtaWdodCB2aW9sYXRlIHRoZSBWUk0gVC1wb3NlIChUaGUgeSBjb21wb25lbnQgb2YgdGhlIHJlc3QgaGlwcyBwb3NpdGlvbiBpcyBhcHByb3hpbWF0ZWx5IHplcm8gb3IgYmVsb3cuKScsXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IGNsaXBzID0gZ2x0Zi5hbmltYXRpb25zO1xuICAgIGNvbnN0IGFuaW1hdGlvbnM6IFZSTUFuaW1hdGlvbltdID0gY2xpcHMubWFwKChjbGlwLCBpQW5pbWF0aW9uKSA9PiB7XG4gICAgICBjb25zdCBkZWZBbmltYXRpb24gPSBkZWZHbHRmLmFuaW1hdGlvbnMhW2lBbmltYXRpb25dO1xuXG4gICAgICBjb25zdCBhbmltYXRpb24gPSB0aGlzLl9wYXJzZUFuaW1hdGlvbihjbGlwLCBkZWZBbmltYXRpb24sIG5vZGVNYXAsIHdvcmxkTWF0cml4TWFwKTtcbiAgICAgIGFuaW1hdGlvbi5yZXN0SGlwc1Bvc2l0aW9uID0gcmVzdEhpcHNQb3NpdGlvbjtcblxuICAgICAgcmV0dXJuIGFuaW1hdGlvbjtcbiAgICB9KTtcblxuICAgIGdsdGYudXNlckRhdGEudnJtQW5pbWF0aW9ucyA9IGFuaW1hdGlvbnM7XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVOb2RlTWFwKGRlZkV4dGVuc2lvbjogVlJNQ1ZSTUFuaW1hdGlvbik6IFZSTUFuaW1hdGlvbkxvYWRlclBsdWdpbk5vZGVNYXAge1xuICAgIGNvbnN0IGh1bWFub2lkSW5kZXhUb05hbWU6IE1hcDxudW1iZXIsIFZSTUh1bWFuQm9uZU5hbWU+ID0gbmV3IE1hcCgpO1xuICAgIGNvbnN0IGV4cHJlc3Npb25zSW5kZXhUb05hbWU6IE1hcDxudW1iZXIsIHN0cmluZz4gPSBuZXcgTWFwKCk7XG5cbiAgICAvLyBodW1hbm9pZFxuICAgIGNvbnN0IGh1bWFuQm9uZXMgPSBkZWZFeHRlbnNpb24uaHVtYW5vaWQ/Lmh1bWFuQm9uZXM7XG5cbiAgICBpZiAoaHVtYW5Cb25lcykge1xuICAgICAgT2JqZWN0LmVudHJpZXMoaHVtYW5Cb25lcykuZm9yRWFjaCgoW25hbWUsIGJvbmVdKSA9PiB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBib25lPy5ub2RlO1xuICAgICAgICBpZiAobm9kZSAhPSBudWxsKSB7XG4gICAgICAgICAgaHVtYW5vaWRJbmRleFRvTmFtZS5zZXQobm9kZSwgbmFtZSBhcyBWUk1IdW1hbkJvbmVOYW1lKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gZXhwcmVzc2lvbnNcbiAgICBjb25zdCBwcmVzZXQgPSBkZWZFeHRlbnNpb24uZXhwcmVzc2lvbnM/LnByZXNldDtcblxuICAgIGlmIChwcmVzZXQpIHtcbiAgICAgIE9iamVjdC5lbnRyaWVzKHByZXNldCkuZm9yRWFjaCgoW25hbWUsIGV4cHJlc3Npb25dKSA9PiB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBleHByZXNzaW9uPy5ub2RlO1xuICAgICAgICBpZiAobm9kZSAhPSBudWxsKSB7XG4gICAgICAgICAgZXhwcmVzc2lvbnNJbmRleFRvTmFtZS5zZXQobm9kZSwgbmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IGN1c3RvbSA9IGRlZkV4dGVuc2lvbi5leHByZXNzaW9ucz8uY3VzdG9tO1xuXG4gICAgaWYgKGN1c3RvbSkge1xuICAgICAgT2JqZWN0LmVudHJpZXMoY3VzdG9tKS5mb3JFYWNoKChbbmFtZSwgZXhwcmVzc2lvbl0pID0+IHtcbiAgICAgICAgY29uc3QgeyBub2RlIH0gPSBleHByZXNzaW9uO1xuICAgICAgICBleHByZXNzaW9uc0luZGV4VG9OYW1lLnNldChub2RlLCBuYW1lKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIGxvb2tBdFxuICAgIGNvbnN0IGxvb2tBdEluZGV4ID0gZGVmRXh0ZW5zaW9uLmxvb2tBdD8ubm9kZSA/PyBudWxsO1xuXG4gICAgcmV0dXJuIHsgaHVtYW5vaWRJbmRleFRvTmFtZSwgZXhwcmVzc2lvbnNJbmRleFRvTmFtZSwgbG9va0F0SW5kZXggfTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX2NyZWF0ZUJvbmVXb3JsZE1hdHJpeE1hcChcbiAgICBnbHRmOiBHTFRGLFxuICAgIGRlZkV4dGVuc2lvbjogVlJNQ1ZSTUFuaW1hdGlvbixcbiAgKTogUHJvbWlzZTxWUk1BbmltYXRpb25Mb2FkZXJQbHVnaW5Xb3JsZE1hdHJpeE1hcD4ge1xuICAgIC8vIHVwZGF0ZSB0aGUgZW50aXJlIGhpZXJhcmNoeSBmaXJzdFxuICAgIGdsdGYuc2NlbmUudXBkYXRlV29ybGRNYXRyaXgoZmFsc2UsIHRydWUpO1xuXG4gICAgY29uc3QgdGhyZWVOb2RlcyA9IChhd2FpdCBnbHRmLnBhcnNlci5nZXREZXBlbmRlbmNpZXMoJ25vZGUnKSkgYXMgVEhSRUUuT2JqZWN0M0RbXTtcblxuICAgIGNvbnN0IHdvcmxkTWF0cml4TWFwOiBWUk1BbmltYXRpb25Mb2FkZXJQbHVnaW5Xb3JsZE1hdHJpeE1hcCA9IG5ldyBNYXAoKTtcblxuICAgIGlmIChkZWZFeHRlbnNpb24uaHVtYW5vaWQgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHdvcmxkTWF0cml4TWFwO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgW2JvbmVOYW1lLCBodW1hbkJvbmVdIG9mIE9iamVjdC5lbnRyaWVzKGRlZkV4dGVuc2lvbi5odW1hbm9pZC5odW1hbkJvbmVzKSkge1xuICAgICAgY29uc3Qgbm9kZSA9IGh1bWFuQm9uZT8ubm9kZTtcbiAgICAgIGlmIChub2RlICE9IG51bGwpIHtcbiAgICAgICAgY29uc3QgdGhyZWVOb2RlID0gdGhyZWVOb2Rlc1tub2RlXTtcbiAgICAgICAgd29ybGRNYXRyaXhNYXAuc2V0KGJvbmVOYW1lIGFzIFZSTUh1bWFuQm9uZU5hbWUsIHRocmVlTm9kZS5tYXRyaXhXb3JsZCk7XG5cbiAgICAgICAgaWYgKGJvbmVOYW1lID09PSAnaGlwcycpIHtcbiAgICAgICAgICB3b3JsZE1hdHJpeE1hcC5zZXQoJ2hpcHNQYXJlbnQnLCB0aHJlZU5vZGUucGFyZW50Py5tYXRyaXhXb3JsZCA/PyBNQVQ0X0lERU5USVRZKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB3b3JsZE1hdHJpeE1hcDtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlQW5pbWF0aW9uKFxuICAgIGFuaW1hdGlvbkNsaXA6IFRIUkVFLkFuaW1hdGlvbkNsaXAsXG4gICAgZGVmQW5pbWF0aW9uOiBHTFRGU2NoZW1hLklBbmltYXRpb24sXG4gICAgbm9kZU1hcDogVlJNQW5pbWF0aW9uTG9hZGVyUGx1Z2luTm9kZU1hcCxcbiAgICB3b3JsZE1hdHJpeE1hcDogVlJNQW5pbWF0aW9uTG9hZGVyUGx1Z2luV29ybGRNYXRyaXhNYXAsXG4gICk6IFZSTUFuaW1hdGlvbiB7XG4gICAgY29uc3QgdHJhY2tzID0gYW5pbWF0aW9uQ2xpcC50cmFja3M7XG4gICAgY29uc3QgZGVmQ2hhbm5lbHMgPSBkZWZBbmltYXRpb24uY2hhbm5lbHM7XG5cbiAgICBjb25zdCByZXN1bHQgPSBuZXcgVlJNQW5pbWF0aW9uKCk7XG5cbiAgICByZXN1bHQuZHVyYXRpb24gPSBhbmltYXRpb25DbGlwLmR1cmF0aW9uO1xuXG4gICAgZGVmQ2hhbm5lbHMuZm9yRWFjaCgoY2hhbm5lbCwgaUNoYW5uZWwpID0+IHtcbiAgICAgIGNvbnN0IHsgbm9kZSwgcGF0aCB9ID0gY2hhbm5lbC50YXJnZXQ7XG4gICAgICBjb25zdCBvcmlnVHJhY2sgPSB0cmFja3NbaUNoYW5uZWxdO1xuXG4gICAgICBpZiAobm9kZSA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gaHVtYW5vaWRcbiAgICAgIGNvbnN0IGJvbmVOYW1lID0gbm9kZU1hcC5odW1hbm9pZEluZGV4VG9OYW1lLmdldChub2RlKTtcbiAgICAgIGlmIChib25lTmFtZSAhPSBudWxsKSB7XG4gICAgICAgIGxldCBwYXJlbnRCb25lTmFtZTogVlJNSHVtYW5Cb25lTmFtZSB8ICdoaXBzUGFyZW50JyB8IG51bGwgPSBWUk1IdW1hbkJvbmVQYXJlbnRNYXBbYm9uZU5hbWVdO1xuICAgICAgICB3aGlsZSAocGFyZW50Qm9uZU5hbWUgIT0gbnVsbCAmJiB3b3JsZE1hdHJpeE1hcC5nZXQocGFyZW50Qm9uZU5hbWUpID09IG51bGwpIHtcbiAgICAgICAgICBwYXJlbnRCb25lTmFtZSA9IFZSTUh1bWFuQm9uZVBhcmVudE1hcFtwYXJlbnRCb25lTmFtZV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhcmVudEJvbmVOYW1lID09IG51bGwpIHtcbiAgICAgICAgICBwYXJlbnRCb25lTmFtZSA9ICdoaXBzUGFyZW50JztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXRoID09PSAndHJhbnNsYXRpb24nKSB7XG4gICAgICAgICAgaWYgKGJvbmVOYW1lICE9PSAnaGlwcycpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgICAgYFRoZSBsb2FkaW5nIGFuaW1hdGlvbiBjb250YWlucyBhIHRyYW5zbGF0aW9uIHRyYWNrIGZvciAke2JvbmVOYW1lfSwgd2hpY2ggaXMgbm90IHBlcm1pdHRlZCBpbiB0aGUgVlJNQ192cm1fYW5pbWF0aW9uIHNwZWMuIGlnbm9yaW5nIHRoZSB0cmFja2AsXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBoaXBzUGFyZW50V29ybGRNYXRyaXggPSB3b3JsZE1hdHJpeE1hcC5nZXQoJ2hpcHNQYXJlbnQnKSE7XG5cbiAgICAgICAgICAgIGNvbnN0IHRyYWNrVmFsdWVzID0gYXJyYXlDaHVuayhvcmlnVHJhY2sudmFsdWVzLCAzKS5mbGF0TWFwKCh2KSA9PlxuICAgICAgICAgICAgICBfdjNBLmZyb21BcnJheSh2KS5hcHBseU1hdHJpeDQoaGlwc1BhcmVudFdvcmxkTWF0cml4KS50b0FycmF5KCksXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBjb25zdCB0cmFjayA9IG9yaWdUcmFjay5jbG9uZSgpO1xuICAgICAgICAgICAgdHJhY2sudmFsdWVzID0gbmV3IEZsb2F0MzJBcnJheSh0cmFja1ZhbHVlcyk7XG5cbiAgICAgICAgICAgIHJlc3VsdC5odW1hbm9pZFRyYWNrcy50cmFuc2xhdGlvbi5zZXQoYm9uZU5hbWUsIHRyYWNrKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocGF0aCA9PT0gJ3JvdGF0aW9uJykge1xuICAgICAgICAgIC8vIGEgID0gcF4tMSAqIGEnICogcCAqIGNcbiAgICAgICAgICAvLyBhJyA9IHAgKiBwXi0xICogYScgKiBwICogYyAqIGNeLTEgKiBwXi0xXG4gICAgICAgICAgLy8gICAgPSBwICogYSAqIGNeLTEgKiBwXi0xXG5cbiAgICAgICAgICBjb25zdCB3b3JsZE1hdHJpeCA9IHdvcmxkTWF0cml4TWFwLmdldChib25lTmFtZSkhO1xuICAgICAgICAgIGNvbnN0IHBhcmVudFdvcmxkTWF0cml4ID0gd29ybGRNYXRyaXhNYXAuZ2V0KHBhcmVudEJvbmVOYW1lKSE7XG5cbiAgICAgICAgICB3b3JsZE1hdHJpeC5kZWNvbXBvc2UoX3YzQSwgX3F1YXRBLCBfdjNBKTtcbiAgICAgICAgICBfcXVhdEEuaW52ZXJ0KCk7XG5cbiAgICAgICAgICBwYXJlbnRXb3JsZE1hdHJpeC5kZWNvbXBvc2UoX3YzQSwgX3F1YXRCLCBfdjNBKTtcblxuICAgICAgICAgIGNvbnN0IHRyYWNrVmFsdWVzID0gYXJyYXlDaHVuayhvcmlnVHJhY2sudmFsdWVzLCA0KS5mbGF0TWFwKChxKSA9PlxuICAgICAgICAgICAgX3F1YXRDXG4gICAgICAgICAgICAgIC5mcm9tQXJyYXkocSBhcyBUSFJFRS5RdWF0ZXJuaW9uVHVwbGUpXG4gICAgICAgICAgICAgIC5wcmVtdWx0aXBseShfcXVhdEIpXG4gICAgICAgICAgICAgIC5tdWx0aXBseShfcXVhdEEpXG4gICAgICAgICAgICAgIC50b0FycmF5KCksXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGNvbnN0IHRyYWNrID0gb3JpZ1RyYWNrLmNsb25lKCk7XG4gICAgICAgICAgdHJhY2sudmFsdWVzID0gbmV3IEZsb2F0MzJBcnJheSh0cmFja1ZhbHVlcyk7XG5cbiAgICAgICAgICByZXN1bHQuaHVtYW5vaWRUcmFja3Mucm90YXRpb24uc2V0KGJvbmVOYW1lLCB0cmFjayk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHBhdGggXCIke3BhdGh9XCJgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIGV4cHJlc3Npb25zXG4gICAgICBjb25zdCBleHByZXNzaW9uTmFtZSA9IG5vZGVNYXAuZXhwcmVzc2lvbnNJbmRleFRvTmFtZS5nZXQobm9kZSk7XG4gICAgICBpZiAoZXhwcmVzc2lvbk5hbWUgIT0gbnVsbCkge1xuICAgICAgICBpZiAocGF0aCA9PT0gJ3RyYW5zbGF0aW9uJykge1xuICAgICAgICAgIGNvbnN0IHRpbWVzID0gb3JpZ1RyYWNrLnRpbWVzO1xuICAgICAgICAgIGNvbnN0IHZhbHVlcyA9IG5ldyBGbG9hdDMyQXJyYXkob3JpZ1RyYWNrLnZhbHVlcy5sZW5ndGggLyAzKTtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFsdWVzW2ldID0gb3JpZ1RyYWNrLnZhbHVlc1szICogaV07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgbmV3VHJhY2sgPSBuZXcgVEhSRUUuTnVtYmVyS2V5ZnJhbWVUcmFjayhgJHtleHByZXNzaW9uTmFtZX0ud2VpZ2h0YCwgdGltZXMgYXMgYW55LCB2YWx1ZXMgYXMgYW55KTtcblxuICAgICAgICAgIGlmICh2cm1FeHByZXNzaW9uUHJlc2V0TmFtZVNldC5oYXMoZXhwcmVzc2lvbk5hbWUpKSB7XG4gICAgICAgICAgICByZXN1bHQuZXhwcmVzc2lvblRyYWNrcy5wcmVzZXQuc2V0KGV4cHJlc3Npb25OYW1lIGFzIFZSTUV4cHJlc3Npb25QcmVzZXROYW1lLCBuZXdUcmFjayk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdC5leHByZXNzaW9uVHJhY2tzLmN1c3RvbS5zZXQoZXhwcmVzc2lvbk5hbWUsIG5ld1RyYWNrKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHBhdGggXCIke3BhdGh9XCJgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIGxvb2tBdFxuICAgICAgaWYgKG5vZGUgPT09IG5vZGVNYXAubG9va0F0SW5kZXgpIHtcbiAgICAgICAgaWYgKHBhdGggPT09ICdyb3RhdGlvbicpIHtcbiAgICAgICAgICByZXN1bHQubG9va0F0VHJhY2sgPSBvcmlnVHJhY2s7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHBhdGggXCIke3BhdGh9XCJgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuIiwgIi8qKlxuICogYGBganNcbiAqIGFycmF5Q2h1bmsoIFsgMSwgMiwgMywgNCwgNSwgNiBdLCAyIClcbiAqIC8vIHdpbGwgYmVcbiAqIFsgWyAxLCAyIF0sIFsgMywgNCBdLCBbIDUsIDYgXSBdXG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFycmF5Q2h1bms8VD4oYXJyYXk6IEFycmF5TGlrZTxUPiwgZXZlcnk6IG51bWJlcik6IFRbXVtdIHtcbiAgY29uc3QgTiA9IGFycmF5Lmxlbmd0aDtcblxuICBjb25zdCByZXQ6IFRbXVtdID0gW107XG5cbiAgbGV0IGN1cnJlbnQ6IFRbXSA9IFtdO1xuICBsZXQgcmVtYWluaW5nID0gMDtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IE47IGkrKykge1xuICAgIGNvbnN0IGVsID0gYXJyYXlbaV07XG5cbiAgICBpZiAocmVtYWluaW5nIDw9IDApIHtcbiAgICAgIHJlbWFpbmluZyA9IGV2ZXJ5O1xuICAgICAgY3VycmVudCA9IFtdO1xuICAgICAgcmV0LnB1c2goY3VycmVudCk7XG4gICAgfVxuXG4gICAgY3VycmVudC5wdXNoKGVsKTtcbiAgICByZW1haW5pbmctLTtcbiAgfVxuXG4gIHJldHVybiByZXQ7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxZQUFZQSxhQUFXOzs7QUNBdkIsWUFBWSxXQUFXO0FDRXZCLFlBQVlDLFlBQVc7QU1GdkIsWUFBWUEsWUFBVztBRUF2QixZQUFZQSxZQUFXO0FFQ3ZCLFlBQVlBLFlBQVc7QUdEdkIsWUFBWUEsWUFBVztBSUF2QixZQUFZQSxZQUFXO0FFQXZCLFlBQVlBLFlBQVc7QUlBdkIsWUFBWUEsYUFBVztBQ0F2QixZQUFZQSxZQUFXO0FDQXZCLFlBQVlBLGFBQVc7QUNBdkIsWUFBWUEsYUFBVztBQ0F2QixZQUFZQSxhQUFXO0FHQ3ZCLFlBQVlBLGFBQVc7QUNBdkIsWUFBWUEsYUFBVztBSU12QixZQUFZQSxhQUFXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QXBDQWhCLElBQU0sZ0JBQU4sY0FBa0MsZUFBUztFQXVHaEQsWUFBWSxnQkFBd0I7QUFDbEMsVUFBTTtBQTFGUixTQUFPLFNBQVM7QUFLaEIsU0FBTyxXQUFXO0FBS2xCLFNBQU8sZ0JBQTJDO0FBS2xELFNBQU8saUJBQTRDO0FBS25ELFNBQU8sZ0JBQTJDO0FBS2xELFNBQVEsU0FBOEIsQ0FBQztBQW1FckMsU0FBSyxPQUFPLGlCQUFpQixjQUFjO0FBQzNDLFNBQUssaUJBQWlCO0FBR3RCLFNBQUssT0FBTztBQUlaLFNBQUssVUFBVTtFQUNqQjs7OztFQXZFQSxJQUFXLFFBQXNDO0FBQy9DLFdBQU8sS0FBSztFQUNkOzs7OztFQVFBLElBQVcsc0JBQThCO0FBQ3ZDLFFBQUksS0FBSyxrQkFBa0IsU0FBUztBQUNsQyxhQUFPLElBQU0sS0FBSyxlQUFlLElBQU07SUFDekMsV0FBVyxLQUFLLGtCQUFrQixTQUFTO0FBQ3pDLGFBQU8sS0FBSztJQUNkLE9BQU87QUFDTCxhQUFPO0lBQ1Q7RUFDRjs7Ozs7RUFNQSxJQUFXLHVCQUErQjtBQUN4QyxRQUFJLEtBQUssbUJBQW1CLFNBQVM7QUFDbkMsYUFBTyxJQUFNLEtBQUssZUFBZSxJQUFNO0lBQ3pDLFdBQVcsS0FBSyxtQkFBbUIsU0FBUztBQUMxQyxhQUFPLEtBQUs7SUFDZCxPQUFPO0FBQ0wsYUFBTztJQUNUO0VBQ0Y7Ozs7O0VBTUEsSUFBVyxzQkFBOEI7QUFDdkMsUUFBSSxLQUFLLGtCQUFrQixTQUFTO0FBQ2xDLGFBQU8sSUFBTSxLQUFLLGVBQWUsSUFBTTtJQUN6QyxXQUFXLEtBQUssa0JBQWtCLFNBQVM7QUFDekMsYUFBTyxLQUFLO0lBQ2QsT0FBTztBQUNMLGFBQU87SUFDVDtFQUNGOzs7O0VBS0EsSUFBVyxlQUF1QjtBQUNoQyxRQUFJLEtBQUssVUFBVTtBQUNqQixhQUFPLEtBQUssU0FBUyxNQUFNLElBQU07SUFDbkM7QUFFQSxXQUFPLEtBQUs7RUFDZDs7Ozs7O0VBcUJPLFFBQVEsTUFBK0I7QUFDNUMsU0FBSyxPQUFPLEtBQUssSUFBSTtFQUN2Qjs7Ozs7O0VBT08sV0FBVyxNQUErQjtBQUMvQyxVQUFNLFFBQVEsS0FBSyxPQUFPLFFBQVEsSUFBSTtBQUN0QyxRQUFJLFNBQVMsR0FBRztBQUNkLFdBQUssT0FBTyxPQUFPLE9BQU8sQ0FBQztJQUM3QjtFQUNGOzs7OztFQU1PLFlBQVksU0FPVjtBQTVKWCxRQUFBO0FBNkpJLFFBQUksZUFBZSxLQUFLO0FBQ3hCLHFCQUFnQixLQUFBLFdBQUEsT0FBQSxTQUFBLFFBQVMsZUFBVCxPQUFBLEtBQXVCO0FBR3ZDLFFBQUksS0FBSyxZQUFZLGVBQWUsR0FBSztBQUN2QyxxQkFBZTtJQUNqQjtBQUVBLFNBQUssT0FBTyxRQUFRLENBQUMsU0FBUyxLQUFLLFlBQVksWUFBWSxDQUFDO0VBQzlEOzs7O0VBS08scUJBQTJCO0FBQ2hDLFNBQUssT0FBTyxRQUFRLENBQUMsU0FBUyxLQUFLLG1CQUFtQixDQUFDO0VBQ3pEO0FBQ0Y7QUUxS0EsU0FBUywwQkFBMEIsTUFBWSxXQUFtQixNQUEyQztBQUo3RyxNQUFBLElBQUE7QUFLRSxRQUFNLE9BQU8sS0FBSyxPQUFPO0FBc0R6QixRQUFNLGNBQWEsS0FBQSxLQUFLLFVBQUwsT0FBQSxTQUFBLEdBQWEsU0FBQTtBQUNoQyxNQUFJLGNBQWMsTUFBTTtBQUN0QixZQUFRLEtBQUssbURBQW1ELFNBQVMsc0NBQXNDO0FBQy9HLFdBQU87RUFDVDtBQUVBLFFBQU0sWUFBWSxXQUFXO0FBQzdCLE1BQUksYUFBYSxNQUFNO0FBQ3JCLFdBQU87RUFDVDtBQUdBLFFBQU0sY0FBYSxLQUFBLEtBQUssV0FBTCxPQUFBLFNBQUEsR0FBYyxTQUFBO0FBQ2pDLE1BQUksY0FBYyxNQUFNO0FBQ3RCLFlBQVEsS0FBSyxvREFBb0QsU0FBUyxzQ0FBc0M7QUFDaEgsV0FBTztFQUNUO0FBRUEsUUFBTSxpQkFBaUIsV0FBVyxXQUFXO0FBRzdDLFFBQU0sYUFBMkIsQ0FBQztBQUNsQyxPQUFLLFNBQVMsQ0FBQyxXQUFXO0FBQ3hCLFFBQUksV0FBVyxTQUFTLGdCQUFnQjtBQUN0QyxVQUFLLE9BQWUsUUFBUTtBQUMxQixtQkFBVyxLQUFLLE1BQW9CO01BQ3RDO0lBQ0Y7RUFDRixDQUFDO0FBRUQsU0FBTztBQUNUO0FBV0EsU0FBc0IsOEJBQThCLE1BQVksV0FBaUQ7QUFBQSxTQUFBQyxTQUFBLE1BQUEsTUFBQSxhQUFBO0FBQy9HLFVBQU0sT0FBdUIsTUFBTSxLQUFLLE9BQU8sY0FBYyxRQUFRLFNBQVM7QUFDOUUsV0FBTywwQkFBMEIsTUFBTSxXQUFXLElBQUk7RUFDeEQsQ0FBQTtBQUFBO0FDdEdPLElBQU0sMEJBQTBCO0VBQ3JDLElBQUk7RUFDSixJQUFJO0VBQ0osSUFBSTtFQUNKLElBQUk7RUFDSixJQUFJO0VBQ0osT0FBTztFQUNQLE9BQU87RUFDUCxPQUFPO0VBQ1AsS0FBSztFQUNMLFNBQVM7RUFDVCxRQUFRO0VBQ1IsV0FBVztFQUNYLFVBQVU7RUFDVixVQUFVO0VBQ1YsV0FBVztFQUNYLFdBQVc7RUFDWCxZQUFZO0VBQ1osU0FBUztBQUNYO0FDaEJPLFNBQVMsU0FBUyxPQUF1QjtBQUM5QyxTQUFPLEtBQUssSUFBSSxLQUFLLElBQUksT0FBTyxDQUFHLEdBQUcsQ0FBRztBQUMzQztBQ0hPLElBQU0sdUJBQU4sTUFBTSxzQkFBcUI7Ozs7RUFzRXpCLGNBQWM7QUFsRXJCLFNBQU8sdUJBQXVCLENBQUMsU0FBUyxhQUFhLFlBQVk7QUFLakUsU0FBTyx3QkFBd0IsQ0FBQyxZQUFZLGFBQWEsVUFBVSxVQUFVO0FBSzdFLFNBQU8sdUJBQXVCLENBQUMsTUFBTSxNQUFNLE1BQU0sTUFBTSxJQUFJO0FBTTNELFNBQVEsZUFBZ0MsQ0FBQztBQVF6QyxTQUFRLGlCQUFvRCxDQUFDO0VBNEM3RDtFQW5EQSxJQUFXLGNBQStCO0FBQ3hDLFdBQU8sS0FBSyxhQUFhLE9BQU87RUFDbEM7RUFNQSxJQUFXLGdCQUFtRDtBQUM1RCxXQUFPLE9BQU8sT0FBTyxDQUFDLEdBQUcsS0FBSyxjQUFjO0VBQzlDOzs7O0VBS0EsSUFBVyxzQkFBNkU7QUFDdEYsVUFBTSxTQUFnRSxDQUFDO0FBRXZFLFVBQU0sZ0JBQWdCLElBQUksSUFBWSxPQUFPLE9BQU8sdUJBQXVCLENBQUM7QUFFNUUsV0FBTyxRQUFRLEtBQUssY0FBYyxFQUFFLFFBQVEsQ0FBQyxDQUFDLE1BQU0sVUFBVSxNQUFNO0FBQ2xFLFVBQUksY0FBYyxJQUFJLElBQUksR0FBRztBQUMzQixlQUFPLElBQStCLElBQUk7TUFDNUM7SUFDRixDQUFDO0FBRUQsV0FBTztFQUNUOzs7O0VBS0EsSUFBVyxzQkFBeUQ7QUFDbEUsVUFBTSxTQUE0QyxDQUFDO0FBRW5ELFVBQU0sZ0JBQWdCLElBQUksSUFBWSxPQUFPLE9BQU8sdUJBQXVCLENBQUM7QUFFNUUsV0FBTyxRQUFRLEtBQUssY0FBYyxFQUFFLFFBQVEsQ0FBQyxDQUFDLE1BQU0sVUFBVSxNQUFNO0FBQ2xFLFVBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxHQUFHO0FBQzVCLGVBQU8sSUFBSSxJQUFJO01BQ2pCO0lBQ0YsQ0FBQztBQUVELFdBQU87RUFDVDs7Ozs7O0VBY08sS0FBSyxRQUFvQztBQUU5QyxVQUFNLGNBQWMsS0FBSyxhQUFhLE9BQU87QUFDN0MsZ0JBQVksUUFBUSxDQUFDLGVBQWU7QUFDbEMsV0FBSyxxQkFBcUIsVUFBVTtJQUN0QyxDQUFDO0FBR0QsV0FBTyxhQUFhLFFBQVEsQ0FBQyxlQUFlO0FBQzFDLFdBQUssbUJBQW1CLFVBQVU7SUFDcEMsQ0FBQztBQUdELFNBQUssdUJBQXVCLE9BQU8scUJBQXFCLE9BQU87QUFDL0QsU0FBSyx3QkFBd0IsT0FBTyxzQkFBc0IsT0FBTztBQUNqRSxTQUFLLHVCQUF1QixPQUFPLHFCQUFxQixPQUFPO0FBRS9ELFdBQU87RUFDVDs7Ozs7RUFNTyxRQUE4QjtBQUNuQyxXQUFPLElBQUksc0JBQXFCLEVBQUUsS0FBSyxJQUFJO0VBQzdDOzs7Ozs7O0VBUU8sY0FBYyxNQUE4RDtBQXJIckYsUUFBQTtBQXNISSxZQUFPLEtBQUEsS0FBSyxlQUFlLElBQUksTUFBeEIsT0FBQSxLQUE2QjtFQUN0Qzs7Ozs7O0VBT08sbUJBQW1CLFlBQWlDO0FBQ3pELFNBQUssYUFBYSxLQUFLLFVBQVU7QUFDakMsU0FBSyxlQUFlLFdBQVcsY0FBYyxJQUFJO0VBQ25EOzs7Ozs7RUFPTyxxQkFBcUIsWUFBaUM7QUFDM0QsVUFBTSxRQUFRLEtBQUssYUFBYSxRQUFRLFVBQVU7QUFDbEQsUUFBSSxVQUFVLElBQUk7QUFDaEIsY0FBUSxLQUFLLG1FQUFtRTtJQUNsRjtBQUVBLFNBQUssYUFBYSxPQUFPLE9BQU8sQ0FBQztBQUNqQyxXQUFPLEtBQUssZUFBZSxXQUFXLGNBQWM7RUFDdEQ7Ozs7Ozs7RUFRTyxTQUFTLE1BQXVEO0FBeEp6RSxRQUFBO0FBeUpJLFVBQU0sYUFBYSxLQUFLLGNBQWMsSUFBSTtBQUMxQyxZQUFPLEtBQUEsY0FBQSxPQUFBLFNBQUEsV0FBWSxXQUFaLE9BQUEsS0FBc0I7RUFDL0I7Ozs7Ozs7RUFRTyxTQUFTLE1BQXdDLFFBQXNCO0FBQzVFLFVBQU0sYUFBYSxLQUFLLGNBQWMsSUFBSTtBQUMxQyxRQUFJLFlBQVk7QUFDZCxpQkFBVyxTQUFTLFNBQVMsTUFBTTtJQUNyQztFQUNGOzs7O0VBS08sY0FBb0I7QUFDekIsU0FBSyxhQUFhLFFBQVEsQ0FBQyxlQUFlO0FBQ3hDLGlCQUFXLFNBQVM7SUFDdEIsQ0FBQztFQUNIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUE0Qk8sdUJBQXVCLE1BQXVEO0FBQ25GLFVBQU0sYUFBYSxLQUFLLGNBQWMsSUFBSTtBQUMxQyxXQUFPLGFBQWEsR0FBRyxXQUFXLElBQUksWUFBWTtFQUNwRDs7OztFQUtPLFNBQWU7QUFFcEIsVUFBTSxvQkFBb0IsS0FBSyw0QkFBNEI7QUFHM0QsU0FBSyxhQUFhLFFBQVEsQ0FBQyxlQUFlO0FBQ3hDLGlCQUFXLG1CQUFtQjtJQUNoQyxDQUFDO0FBR0QsU0FBSyxhQUFhLFFBQVEsQ0FBQyxlQUFlO0FBQ3hDLFVBQUksYUFBYTtBQUNqQixZQUFNLE9BQU8sV0FBVztBQUV4QixVQUFJLEtBQUsscUJBQXFCLFFBQVEsSUFBSSxNQUFNLElBQUk7QUFDbEQsc0JBQWMsa0JBQWtCO01BQ2xDO0FBRUEsVUFBSSxLQUFLLHNCQUFzQixRQUFRLElBQUksTUFBTSxJQUFJO0FBQ25ELHNCQUFjLGtCQUFrQjtNQUNsQztBQUVBLFVBQUksS0FBSyxxQkFBcUIsUUFBUSxJQUFJLE1BQU0sSUFBSTtBQUNsRCxzQkFBYyxrQkFBa0I7TUFDbEM7QUFFQSxpQkFBVyxZQUFZLEVBQUUsV0FBVyxDQUFDO0lBQ3ZDLENBQUM7RUFDSDs7OztFQUtRLDhCQUlOO0FBQ0EsUUFBSSxRQUFRO0FBQ1osUUFBSSxTQUFTO0FBQ2IsUUFBSSxRQUFRO0FBRVosU0FBSyxhQUFhLFFBQVEsQ0FBQyxlQUFlO0FBQ3hDLGVBQVMsV0FBVztBQUNwQixnQkFBVSxXQUFXO0FBQ3JCLGVBQVMsV0FBVztJQUN0QixDQUFDO0FBRUQsWUFBUSxLQUFLLElBQUksR0FBSyxLQUFLO0FBQzNCLGFBQVMsS0FBSyxJQUFJLEdBQUssTUFBTTtBQUM3QixZQUFRLEtBQUssSUFBSSxHQUFLLEtBQUs7QUFFM0IsV0FBTyxFQUFFLE9BQU8sUUFBUSxNQUFNO0VBQ2hDO0FBQ0Y7QUN6UU8sSUFBTSxpQ0FBaUM7RUFDNUMsT0FBTztFQUNQLGVBQWU7RUFDZixZQUFZO0VBQ1osYUFBYTtFQUNiLFVBQVU7RUFDVixjQUFjO0FBQ2hCO0FBS08sSUFBTSwrQkFBOEY7RUFDekcsUUFBUSwrQkFBK0I7RUFDdkMsZ0JBQWdCLCtCQUErQjtFQUMvQyxhQUFhLCtCQUErQjtFQUM1QyxXQUFXLCtCQUErQjtFQUMxQyxlQUFlLCtCQUErQjtBQUNoRDtBQ2hCQSxJQUFNLFNBQVMsSUFBVSxhQUFNO0FBc0J4QixJQUFNLGtDQUFOLE1BQU1DLGlDQUE0RDtFQXNEaEUsWUFBWTtJQUNqQjtJQUNBO0lBQ0E7SUFDQTtFQUNGLEdBb0JHO0FBQ0QsU0FBSyxXQUFXO0FBQ2hCLFNBQUssT0FBTztBQUNaLFNBQUssY0FBYztBQUNuQixTQUFLLGNBQWMsZUFBQSxPQUFBLGNBQWU7QUFHbEMsVUFBTSxRQUFRLEtBQUssb0JBQW9CO0FBQ3ZDLFVBQU0sUUFBUSxLQUFLLG9CQUFvQjtBQUN2QyxTQUFLLFNBQVMsRUFBRSxPQUFPLE1BQU07RUFDL0I7RUFFTyxZQUFZLFFBQXNCO0FBQ3ZDLFVBQU0sRUFBRSxPQUFPLE1BQU0sSUFBSSxLQUFLO0FBRTlCLFFBQUksU0FBUyxNQUFNO0FBQ2pCLFlBQU0sRUFBRSxjQUFjLFdBQVcsSUFBSTtBQUVyQyxZQUFNLFNBQVUsS0FBSyxTQUFpQixZQUFZO0FBQ2xELFVBQUksVUFBVSxRQUFXO0FBQ3ZCLGVBQU8sSUFBSSxPQUFPLEtBQUssVUFBVSxFQUFFLGVBQWUsTUFBTSxDQUFDO01BQzNEO0lBQ0Y7QUFFQSxRQUFJLFNBQVMsTUFBTTtBQUNqQixZQUFNLEVBQUUsY0FBYyxXQUFXLElBQUk7QUFFckMsWUFBTSxTQUFVLEtBQUssU0FBaUIsWUFBWTtBQUNsRCxVQUFJLFVBQVUsUUFBVztBQUNyQixhQUFLLFNBQWlCLFlBQVksS0FBZ0IsYUFBYTtNQUNuRTtJQUNGO0VBQ0Y7RUFFTyxxQkFBMkI7QUFDaEMsVUFBTSxFQUFFLE9BQU8sTUFBTSxJQUFJLEtBQUs7QUFFOUIsUUFBSSxTQUFTLE1BQU07QUFDakIsWUFBTSxFQUFFLGNBQWMsYUFBYSxJQUFJO0FBRXZDLFlBQU0sU0FBVSxLQUFLLFNBQWlCLFlBQVk7QUFDbEQsVUFBSSxVQUFVLFFBQVc7QUFDdkIsZUFBTyxLQUFLLFlBQVk7TUFDMUI7SUFDRjtBQUVBLFFBQUksU0FBUyxNQUFNO0FBQ2pCLFlBQU0sRUFBRSxjQUFjLGFBQWEsSUFBSTtBQUV2QyxZQUFNLFNBQVUsS0FBSyxTQUFpQixZQUFZO0FBQ2xELFVBQUksVUFBVSxRQUFXO0FBQ3JCLGFBQUssU0FBaUIsWUFBWSxJQUFlO01BQ3JEO0lBQ0Y7RUFDRjtFQUVRLHNCQUE2QztBQWpLdkQsUUFBQSxJQUFBLElBQUE7QUFrS0ksVUFBTSxFQUFFLFVBQVUsTUFBTSxZQUFZLElBQUk7QUFFeEMsVUFBTSxrQkFBa0IsS0FBSyxvQkFBb0I7QUFDakQsVUFBTSxnQkFBZSxNQUFBLEtBQUEsbUJBQUEsT0FBQSxTQUFBLGdCQUFrQixJQUFBLE1BQWxCLE9BQUEsU0FBQSxHQUEwQixDQUFBLE1BQTFCLE9BQUEsS0FBZ0M7QUFFckQsUUFBSSxnQkFBZ0IsTUFBTTtBQUN4QixjQUFRO1FBQ04sdURBQ0UsS0FBQSxTQUFTLFNBQVQsT0FBQSxLQUFpQixXQUNuQixjQUFjLElBQUk7TUFDcEI7QUFFQSxhQUFPO0lBQ1Q7QUFFQSxVQUFNLFNBQVUsU0FBaUIsWUFBWTtBQUU3QyxVQUFNLGVBQWUsT0FBTyxNQUFNO0FBR2xDLFVBQU0sYUFBYSxJQUFVO01BQzNCLFlBQVksSUFBSSxhQUFhO01BQzdCLFlBQVksSUFBSSxhQUFhO01BQzdCLFlBQVksSUFBSSxhQUFhO0lBQy9CO0FBRUEsV0FBTyxFQUFFLGNBQWMsY0FBYyxXQUFXO0VBQ2xEO0VBRVEsc0JBQTZDO0FBL0x2RCxRQUFBLElBQUEsSUFBQTtBQWdNSSxVQUFNLEVBQUUsVUFBVSxNQUFNLFlBQVksSUFBSTtBQUV4QyxVQUFNLGtCQUFrQixLQUFLLG9CQUFvQjtBQUNqRCxVQUFNLGdCQUFlLE1BQUEsS0FBQSxtQkFBQSxPQUFBLFNBQUEsZ0JBQWtCLElBQUEsTUFBbEIsT0FBQSxTQUFBLEdBQTBCLENBQUEsTUFBMUIsT0FBQSxLQUFnQztBQUVyRCxRQUFJLGdCQUFnQixRQUFRLGdCQUFnQixHQUFLO0FBQy9DLGNBQVE7UUFDTix1REFDRSxLQUFBLFNBQVMsU0FBVCxPQUFBLEtBQWlCLFdBQ25CLGNBQWMsSUFBSTtNQUNwQjtBQUVBLGFBQU87SUFDVDtBQUVBLFFBQUksZ0JBQWdCLE1BQU07QUFDeEIsYUFBTztJQUNUO0FBRUEsVUFBTSxlQUFnQixTQUFpQixZQUFZO0FBRW5ELFVBQU0sYUFBYSxjQUFjO0FBRWpDLFdBQU8sRUFBRSxjQUFjLGNBQWMsV0FBVztFQUNsRDtFQUVRLHNCQUVDO0FBNU5YLFFBQUEsSUFBQTtBQTZOSSxZQUNFLE1BQUEsS0FBQSxPQUFPLFFBQVFBLGlDQUErQixtQkFBbUIsRUFBRSxLQUFLLENBQUMsQ0FBQyxhQUFhLE1BQU07QUFDM0YsYUFBUSxLQUFLLFNBQWlCLGFBQWEsTUFBTTtJQUNuRCxDQUFDLE1BRkQsT0FBQSxTQUFBLEdBRUssQ0FBQSxNQUZMLE9BQUEsS0FFVztFQUVmO0FBQ0Y7QUF6TWEsZ0NBUUksc0JBRVg7RUFDRix3QkFBd0I7SUFDdEIsT0FBTyxDQUFDLFNBQVMsU0FBUztJQUMxQixlQUFlLENBQUMsWUFBWSxJQUFJO0VBQ2xDO0VBQ0EscUJBQXFCO0lBQ25CLE9BQU8sQ0FBQyxTQUFTLFNBQVM7RUFDNUI7RUFDQSxpQkFBaUI7SUFDZixPQUFPLENBQUMsU0FBUyxTQUFTO0lBQzFCLGVBQWUsQ0FBQyxZQUFZLElBQUk7SUFDaEMsY0FBYyxDQUFDLHNCQUFzQixJQUFJO0lBQ3pDLGFBQWEsQ0FBQyxnQkFBZ0IsSUFBSTtJQUNsQyxVQUFVLENBQUMsNEJBQTRCLElBQUk7SUFDM0MsWUFBWSxDQUFDLG9CQUFvQixJQUFJO0VBQ3ZDO0FBQ0Y7QUExQkssSUFBTSxpQ0FBTjtBQ3BCQSxJQUFNLCtCQUFOLE1BQWdFO0VBZ0I5RCxZQUFZO0lBQ2pCO0lBQ0E7SUFDQTtFQUNGLEdBZUc7QUFDRCxTQUFLLGFBQWE7QUFDbEIsU0FBSyxRQUFRO0FBQ2IsU0FBSyxTQUFTO0VBQ2hCO0VBRU8sWUFBWSxRQUFzQjtBQUN2QyxTQUFLLFdBQVcsUUFBUSxDQUFDLFNBQVM7QUFoRHRDLFVBQUE7QUFpRE0sWUFBSSxLQUFBLEtBQUssMEJBQUwsT0FBQSxTQUFBLEdBQTZCLEtBQUssS0FBQSxNQUFVLE1BQU07QUFDcEQsYUFBSyxzQkFBc0IsS0FBSyxLQUFLLEtBQUssS0FBSyxTQUFTO01BQzFEO0lBQ0YsQ0FBQztFQUNIO0VBRU8scUJBQTJCO0FBQ2hDLFNBQUssV0FBVyxRQUFRLENBQUMsU0FBUztBQXhEdEMsVUFBQTtBQXlETSxZQUFJLEtBQUEsS0FBSywwQkFBTCxPQUFBLFNBQUEsR0FBNkIsS0FBSyxLQUFBLE1BQVUsTUFBTTtBQUNwRCxhQUFLLHNCQUFzQixLQUFLLEtBQUssSUFBSTtNQUMzQztJQUNGLENBQUM7RUFDSDtBQUNGO0FDM0RBLElBQU0sTUFBTSxJQUFVLGVBQVE7QUFLdkIsSUFBTSxxQ0FBTixNQUFNQyxvQ0FBK0Q7RUFrRG5FLFlBQVk7SUFDakI7SUFDQTtJQUNBO0VBQ0YsR0FlRztBQTdFTCxRQUFBLElBQUE7QUE4RUksU0FBSyxXQUFXO0FBQ2hCLFNBQUssUUFBUTtBQUNiLFNBQUssU0FBUztBQUVkLFVBQU0saUJBQWdCLEtBQUEsT0FBTyxRQUFRQSxvQ0FBa0MsaUJBQWlCLEVBQUU7TUFDeEYsQ0FBQyxDQUFDLGFBQWEsTUFBTTtBQUNuQixlQUFRLFNBQWlCLGFBQWEsTUFBTTtNQUM5QztJQUNGLE1BSnNCLE9BQUEsU0FBQSxHQUlsQixDQUFBO0FBRUosUUFBSSxpQkFBaUIsTUFBTTtBQUN6QixjQUFRO1FBQ04sMERBQ0UsS0FBQSxTQUFTLFNBQVQsT0FBQSxLQUFpQixXQUNuQjtNQUNGO0FBRUEsV0FBSyxjQUFjLENBQUM7SUFDdEIsT0FBTztBQUNMLFdBQUssY0FBYyxDQUFDO0FBRXBCLG9CQUFjLFFBQVEsQ0FBQyxpQkFBaUI7QUFuRzlDLFlBQUFDO0FBb0dRLGNBQU0sV0FBWUEsTUFBQSxTQUFpQixZQUFZLE1BQTdCLE9BQUEsU0FBQUEsSUFBOEQsTUFBQTtBQUNoRixZQUFJLENBQUMsU0FBUztBQUNaLGlCQUFPO1FBQ1Q7QUFFQyxpQkFBaUIsWUFBWSxJQUFJO0FBRWxDLGNBQU0sZ0JBQWdCLFFBQVEsT0FBTyxNQUFNO0FBQzNDLGNBQU0sZUFBZSxRQUFRLE9BQU8sTUFBTTtBQUMxQyxjQUFNLGNBQWMsT0FBTyxNQUFNLEVBQUUsSUFBSSxhQUFhO0FBQ3BELGNBQU0sYUFBYSxNQUFNLE1BQU0sRUFBRSxJQUFJLFlBQVk7QUFFakQsYUFBSyxZQUFZLEtBQUs7VUFDcEIsTUFBTTtVQUNOO1VBQ0E7VUFDQTtVQUNBO1FBQ0YsQ0FBQztNQUNILENBQUM7SUFDSDtFQUNGO0VBRU8sWUFBWSxRQUFzQjtBQUN2QyxTQUFLLFlBQVksUUFBUSxDQUFDLGFBQWE7QUFDckMsWUFBTSxTQUFVLEtBQUssU0FBaUIsU0FBUyxJQUFJO0FBQ25ELFVBQUksV0FBVyxRQUFXO0FBQ3hCO01BQ0Y7QUFFQSxhQUFPLE9BQU8sSUFBSSxJQUFJLEtBQUssU0FBUyxXQUFXLEVBQUUsZUFBZSxNQUFNLENBQUM7QUFDdkUsYUFBTyxPQUFPLElBQUksSUFBSSxLQUFLLFNBQVMsVUFBVSxFQUFFLGVBQWUsTUFBTSxDQUFDO0lBQ3hFLENBQUM7RUFDSDtFQUVPLHFCQUEyQjtBQUNoQyxTQUFLLFlBQVksUUFBUSxDQUFDLGFBQWE7QUFDckMsWUFBTSxTQUFVLEtBQUssU0FBaUIsU0FBUyxJQUFJO0FBQ25ELFVBQUksV0FBVyxRQUFXO0FBQ3hCO01BQ0Y7QUFFQSxhQUFPLE9BQU8sS0FBSyxTQUFTLGFBQWE7QUFDekMsYUFBTyxPQUFPLEtBQUssU0FBUyxZQUFZO0lBQzFDLENBQUM7RUFDSDtBQUNGO0FBMUlhLG1DQUNJLG9CQUEyRDtFQUN4RSx3QkFBd0I7SUFDdEI7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtFQUNGO0VBQ0EscUJBQXFCLENBQUMsT0FBTyxlQUFlLFVBQVU7RUFDdEQsaUJBQWlCO0lBQ2Y7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7RUFDRjtBQUNGO0FBdEJLLElBQU0sb0NBQU47QVJTUCxJQUFNLHlCQUF5QixvQkFBSSxJQUFJLENBQUMsT0FBTyxVQUFVLENBQUM7QUFLbkQsSUFBTSw2QkFBTixNQUFNQyw0QkFBc0Q7RUF5QmpFLElBQVcsT0FBZTtBQUV4QixXQUFPO0VBQ1Q7RUFFTyxZQUFZLFFBQW9CO0FBQ3JDLFNBQUssU0FBUztFQUNoQjtFQUVhLFVBQVUsTUFBMkI7QUFBQSxXQUFBQyxTQUFBLE1BQUEsTUFBQSxhQUFBO0FBQ2hELFdBQUssU0FBUyx1QkFBdUIsTUFBTSxLQUFLLFFBQVEsSUFBSTtJQUM5RCxDQUFBO0VBQUE7Ozs7OztFQU9jLFFBQVEsTUFBa0Q7QUFBQSxXQUFBQSxTQUFBLE1BQUEsTUFBQSxhQUFBO0FBQ3RFLFlBQU0sV0FBVyxNQUFNLEtBQUssVUFBVSxJQUFJO0FBQzFDLFVBQUksVUFBVTtBQUNaLGVBQU87TUFDVDtBQUVBLFlBQU0sV0FBVyxNQUFNLEtBQUssVUFBVSxJQUFJO0FBQzFDLFVBQUksVUFBVTtBQUNaLGVBQU87TUFDVDtBQUVBLGFBQU87SUFDVCxDQUFBO0VBQUE7RUFFYyxVQUFVLE1BQWtEO0FBQUEsV0FBQUEsU0FBQSxNQUFBLE1BQUEsYUFBQTtBQS9FNUUsVUFBQSxJQUFBO0FBZ0ZJLFlBQU0sT0FBTyxLQUFLLE9BQU87QUFHekIsWUFBTSxjQUFZLEtBQUEsS0FBSyxtQkFBTCxPQUFBLFNBQUEsR0FBcUIsUUFBUSxVQUFBLE9BQWdCO0FBQy9ELFVBQUksQ0FBQyxXQUFXO0FBQ2QsZUFBTztNQUNUO0FBRUEsWUFBTSxhQUFZLEtBQUEsS0FBSyxlQUFMLE9BQUEsU0FBQSxHQUFrQixVQUFBO0FBQ3BDLFVBQUksQ0FBQyxXQUFXO0FBQ2QsZUFBTztNQUNUO0FBRUEsWUFBTSxjQUFjLFVBQVU7QUFDOUIsVUFBSSxDQUFDLHVCQUF1QixJQUFJLFdBQVcsR0FBRztBQUM1QyxnQkFBUSxLQUFLLDREQUE0RCxXQUFXLEdBQUc7QUFDdkYsZUFBTztNQUNUO0FBRUEsWUFBTSxvQkFBb0IsVUFBVTtBQUNwQyxVQUFJLENBQUMsbUJBQW1CO0FBQ3RCLGVBQU87TUFDVDtBQUdBLFlBQU0sZ0JBQWdCLElBQUksSUFBWSxPQUFPLE9BQU8sdUJBQXVCLENBQUM7QUFDNUUsWUFBTSwwQkFBMEIsb0JBQUksSUFBb0M7QUFFeEUsVUFBSSxrQkFBa0IsVUFBVSxNQUFNO0FBQ3BDLGVBQU8sUUFBUSxrQkFBa0IsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDLE1BQU0sZ0JBQWdCLE1BQU07QUFDN0UsY0FBSSxvQkFBb0IsTUFBTTtBQUM1QjtVQUNGO0FBRUEsY0FBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLEdBQUc7QUFDNUIsb0JBQVEsS0FBSyxtREFBbUQsSUFBSSxxQ0FBcUM7QUFDekc7VUFDRjtBQUVBLGtDQUF3QixJQUFJLE1BQU0sZ0JBQWdCO1FBQ3BELENBQUM7TUFDSDtBQUVBLFVBQUksa0JBQWtCLFVBQVUsTUFBTTtBQUNwQyxlQUFPLFFBQVEsa0JBQWtCLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQyxNQUFNLGdCQUFnQixNQUFNO0FBQzdFLGNBQUksY0FBYyxJQUFJLElBQUksR0FBRztBQUMzQixvQkFBUTtjQUNOLHlFQUF5RSxJQUFJO1lBQy9FO0FBQ0E7VUFDRjtBQUVBLGtDQUF3QixJQUFJLE1BQU0sZ0JBQWdCO1FBQ3BELENBQUM7TUFDSDtBQUdBLFlBQU0sVUFBVSxJQUFJLHFCQUFxQjtBQUd6QyxZQUFNLFFBQVE7UUFDWixNQUFNLEtBQUssd0JBQXdCLFFBQVEsQ0FBQyxFQUFFLElBQUksQ0FBTyxPQUE2QkEsU0FBQSxNQUFBLENBQTdCLEVBQUEsR0FBNkIsV0FBN0IsQ0FBQyxNQUFNLGdCQUFnQixHQUFNO0FBN0k1RixjQUFBRixLQUFBRyxLQUFBLElBQUEsSUFBQSxJQUFBLElBQUE7QUE4SVEsZ0JBQU0sYUFBYSxJQUFJLGNBQWMsSUFBSTtBQUN6QyxlQUFLLE1BQU0sSUFBSSxVQUFVO0FBRXpCLHFCQUFXLFlBQVdILE1BQUEsaUJBQWlCLGFBQWpCLE9BQUFBLE1BQTZCO0FBQ25ELHFCQUFXLGlCQUFnQkcsTUFBQSxpQkFBaUIsa0JBQWpCLE9BQUFBLE1BQWtDO0FBQzdELHFCQUFXLGtCQUFpQixLQUFBLGlCQUFpQixtQkFBakIsT0FBQSxLQUFtQztBQUMvRCxxQkFBVyxpQkFBZ0IsS0FBQSxpQkFBaUIsa0JBQWpCLE9BQUEsS0FBa0M7QUFFN0QsV0FBQSxLQUFBLGlCQUFpQixxQkFBakIsT0FBQSxTQUFBLEdBQW1DLFFBQVEsQ0FBTyxTQUFTRCxTQUFBLE1BQUEsTUFBQSxhQUFBO0FBdEpuRSxnQkFBQUY7QUF1SlUsZ0JBQUksS0FBSyxTQUFTLFVBQWEsS0FBSyxVQUFVLFFBQVc7QUFDdkQ7WUFDRjtBQUVBLGtCQUFNLGFBQWMsTUFBTSw4QkFBOEIsTUFBTSxLQUFLLElBQUk7QUFDdkUsa0JBQU0sbUJBQW1CLEtBQUs7QUFHOUIsZ0JBQ0UsQ0FBQyxXQUFXO2NBQ1YsQ0FBQyxjQUNDLE1BQU0sUUFBUSxVQUFVLHFCQUFxQixLQUM3QyxtQkFBbUIsVUFBVSxzQkFBc0I7WUFDdkQsR0FDQTtBQUNBLHNCQUFRO2dCQUNOLDhCQUE4QixpQkFBaUIsSUFBSSw2QkFBNkIsZ0JBQWdCO2NBQ2xHO0FBQ0E7WUFDRjtBQUVBLHVCQUFXO2NBQ1QsSUFBSSw2QkFBNkI7Z0JBQy9CO2dCQUNBLE9BQU87Z0JBQ1AsU0FBUUEsTUFBQSxLQUFLLFdBQUwsT0FBQUEsTUFBZTtjQUN6QixDQUFDO1lBQ0g7VUFDRixDQUFBLENBQUE7QUFFQSxjQUFJLGlCQUFpQixzQkFBc0IsaUJBQWlCLHVCQUF1QjtBQUVqRixrQkFBTSxnQkFBa0MsQ0FBQztBQUN6QyxpQkFBSyxNQUFNLFNBQVMsQ0FBQyxXQUFXO0FBQzlCLG9CQUFNLFdBQVksT0FBZTtBQUNqQyxrQkFBSSxVQUFVO0FBQ1osb0JBQUksTUFBTSxRQUFRLFFBQVEsR0FBRztBQUMzQixnQ0FBYyxLQUFLLEdBQUcsUUFBUTtnQkFDaEMsT0FBTztBQUNMLGdDQUFjLEtBQUssUUFBUTtnQkFDN0I7Y0FDRjtZQUNGLENBQUM7QUFFRCxhQUFBLEtBQUEsaUJBQWlCLHVCQUFqQixPQUFBLFNBQUEsR0FBcUMsUUFBUSxDQUFPLFNBQVNFLFNBQUEsTUFBQSxNQUFBLGFBQUE7QUFDM0Qsb0JBQU0sWUFBWSxjQUFjLE9BQU8sQ0FBQyxhQUFhO0FBcE1qRSxvQkFBQUY7QUFxTWMsc0JBQU0saUJBQWdCQSxNQUFBLEtBQUssT0FBTyxhQUFhLElBQUksUUFBUSxNQUFyQyxPQUFBLFNBQUFBLElBQXdDO0FBQzlELHVCQUFPLEtBQUssYUFBYTtjQUMzQixDQUFDO0FBRUQsd0JBQVUsUUFBUSxDQUFDLGFBQWE7QUFDOUIsMkJBQVc7a0JBQ1QsSUFBSSwrQkFBK0I7b0JBQ2pDO29CQUNBLE1BQU0sS0FBSztvQkFDWCxhQUFhLElBQVUsYUFBTSxFQUFFLFVBQVUsS0FBSyxXQUFXO29CQUN6RCxhQUFhLEtBQUssWUFBWSxDQUFDO2tCQUNqQyxDQUFDO2dCQUNIO2NBQ0YsQ0FBQztZQUNILENBQUEsQ0FBQTtBQUVBLGFBQUEsS0FBQSxpQkFBaUIsMEJBQWpCLE9BQUEsU0FBQSxHQUF3QyxRQUFRLENBQU8sU0FBU0UsU0FBQSxNQUFBLE1BQUEsYUFBQTtBQUM5RCxvQkFBTSxZQUFZLGNBQWMsT0FBTyxDQUFDLGFBQWE7QUF0TmpFLG9CQUFBRjtBQXVOYyxzQkFBTSxpQkFBZ0JBLE1BQUEsS0FBSyxPQUFPLGFBQWEsSUFBSSxRQUFRLE1BQXJDLE9BQUEsU0FBQUEsSUFBd0M7QUFDOUQsdUJBQU8sS0FBSyxhQUFhO2NBQzNCLENBQUM7QUFFRCx3QkFBVSxRQUFRLENBQUMsYUFBYTtBQTNONUMsb0JBQUFBLEtBQUFHO0FBNE5jLDJCQUFXO2tCQUNULElBQUksa0NBQWtDO29CQUNwQztvQkFDQSxRQUFRLElBQVUsZUFBUSxFQUFFLFdBQVVILE1BQUEsS0FBSyxXQUFMLE9BQUFBLE1BQWUsQ0FBQyxHQUFLLENBQUcsQ0FBQztvQkFDL0QsT0FBTyxJQUFVLGVBQVEsRUFBRSxXQUFVRyxNQUFBLEtBQUssVUFBTCxPQUFBQSxNQUFjLENBQUMsR0FBSyxDQUFHLENBQUM7a0JBQy9ELENBQUM7Z0JBQ0g7Y0FDRixDQUFDO1lBQ0gsQ0FBQSxDQUFBO1VBQ0Y7QUFFQSxrQkFBUSxtQkFBbUIsVUFBVTtRQUN2QyxDQUFBLENBQUM7TUFDSDtBQUVBLGFBQU87SUFDVCxDQUFBO0VBQUE7RUFFYyxVQUFVLE1BQWtEO0FBQUEsV0FBQUQsU0FBQSxNQUFBLE1BQUEsYUFBQTtBQTlPNUUsVUFBQTtBQStPSSxZQUFNLE9BQU8sS0FBSyxPQUFPO0FBR3pCLFlBQU0sVUFBUyxLQUFBLEtBQUssZUFBTCxPQUFBLFNBQUEsR0FBaUI7QUFDaEMsVUFBSSxDQUFDLFFBQVE7QUFDWCxlQUFPO01BQ1Q7QUFFQSxZQUFNLG1CQUFtQixPQUFPO0FBQ2hDLFVBQUksQ0FBQyxrQkFBa0I7QUFDckIsZUFBTztNQUNUO0FBRUEsWUFBTSxVQUFVLElBQUkscUJBQXFCO0FBRXpDLFlBQU0seUJBQXlCLGlCQUFpQjtBQUNoRCxVQUFJLENBQUMsd0JBQXdCO0FBQzNCLGVBQU87TUFDVDtBQUVBLFlBQU0sb0JBQW9CLG9CQUFJLElBQVk7QUFFMUMsWUFBTSxRQUFRO1FBQ1osdUJBQXVCLElBQUksQ0FBTyxnQkFBZ0JBLFNBQUEsTUFBQSxNQUFBLGFBQUE7QUF0UXhELGNBQUFGO0FBdVFRLGdCQUFNLGVBQWUsWUFBWTtBQUNqQyxnQkFBTSxlQUNILGdCQUFnQixRQUFRQyw0QkFBMEIsa0JBQWtCLFlBQVksS0FBTTtBQUN6RixnQkFBTSxPQUFPLGdCQUFBLE9BQUEsZUFBZ0IsWUFBWTtBQUV6QyxjQUFJLFFBQVEsTUFBTTtBQUNoQixvQkFBUSxLQUFLLDJGQUEyRjtBQUN4RztVQUNGO0FBR0EsY0FBSSxrQkFBa0IsSUFBSSxJQUFJLEdBQUc7QUFDL0Isb0JBQVE7Y0FDTixtREFBbUQsWUFBWTtZQUNqRTtBQUNBO1VBQ0Y7QUFFQSw0QkFBa0IsSUFBSSxJQUFJO0FBRTFCLGdCQUFNLGFBQWEsSUFBSSxjQUFjLElBQUk7QUFDekMsZUFBSyxNQUFNLElBQUksVUFBVTtBQUV6QixxQkFBVyxZQUFXRCxNQUFBLFlBQVksYUFBWixPQUFBQSxNQUF3QjtBQUk5QyxjQUFJLFlBQVksT0FBTztBQUNyQix3QkFBWSxNQUFNLFFBQVEsQ0FBTyxTQUFTRSxTQUFBLE1BQUEsTUFBQSxhQUFBO0FBblNwRCxrQkFBQUY7QUFvU1ksa0JBQUksS0FBSyxTQUFTLFVBQWEsS0FBSyxVQUFVLFFBQVc7QUFDdkQ7Y0FDRjtBQUVBLG9CQUFNLGlCQUEyQixDQUFDO0FBQ2xDLGVBQUFBLE1BQUEsS0FBSyxVQUFMLE9BQUEsU0FBQUEsSUFBWSxRQUFRLENBQUMsTUFBTSxNQUFNO0FBQy9CLG9CQUFJLEtBQUssU0FBUyxLQUFLLE1BQU07QUFDM0IsaUNBQWUsS0FBSyxDQUFDO2dCQUN2QjtjQUNGLENBQUE7QUFFQSxrQkFBSSxlQUFlLFdBQVcsR0FBRztBQUMvQix3QkFBUTtrQkFDTiw4QkFBOEIsWUFBWSxJQUFJLGlEQUFpRCxLQUFLLElBQUk7Z0JBQzFHO0FBQ0E7Y0FDRjtBQUVBLG9CQUFNLG1CQUFtQixLQUFLO0FBRTlCLG9CQUFNLFFBQVE7Z0JBQ1osZUFBZSxJQUFJLENBQU8sY0FBY0UsU0FBQSxNQUFBLE1BQUEsYUFBQTtBQXpUdEQsc0JBQUFGO0FBMFRnQix3QkFBTSxhQUFjLE1BQU0sOEJBQThCLE1BQU0sU0FBUztBQUd2RSxzQkFDRSxDQUFDLFdBQVc7b0JBQ1YsQ0FBQyxjQUNDLE1BQU0sUUFBUSxVQUFVLHFCQUFxQixLQUM3QyxtQkFBbUIsVUFBVSxzQkFBc0I7a0JBQ3ZELEdBQ0E7QUFDQSw0QkFBUTtzQkFDTiw4QkFBOEIsWUFBWSxJQUFJLHNCQUFzQixnQkFBZ0I7b0JBQ3RGO0FBQ0E7a0JBQ0Y7QUFFQSw2QkFBVztvQkFDVCxJQUFJLDZCQUE2QjtzQkFDL0I7c0JBQ0EsT0FBTztzQkFDUCxRQUFRLFNBQVFBLE1BQUEsS0FBSyxXQUFMLE9BQUFBLE1BQWU7O29CQUNqQyxDQUFDO2tCQUNIO2dCQUNGLENBQUEsQ0FBQztjQUNIO1lBQ0YsQ0FBQSxDQUFDO1VBQ0g7QUFHQSxnQkFBTSxpQkFBaUIsWUFBWTtBQUNuQyxjQUFJLGtCQUFrQixlQUFlLFdBQVcsR0FBRztBQUNqRCwyQkFBZSxRQUFRLENBQUMsa0JBQWtCO0FBQ3hDLGtCQUNFLGNBQWMsaUJBQWlCLFVBQy9CLGNBQWMsaUJBQWlCLFVBQy9CLGNBQWMsZ0JBQWdCLFFBQzlCO0FBQ0E7Y0FDRjtBQVNBLG9CQUFNLFlBQThCLENBQUM7QUFDckMsbUJBQUssTUFBTSxTQUFTLENBQUMsV0FBVztBQUM5QixvQkFBSyxPQUFlLFVBQVU7QUFDNUIsd0JBQU0sV0FBK0MsT0FBZTtBQUNwRSxzQkFBSSxNQUFNLFFBQVEsUUFBUSxHQUFHO0FBQzNCLDhCQUFVO3NCQUNSLEdBQUcsU0FBUzt3QkFDVixDQUFDLFNBQ0UsSUFBSSxTQUFTLGNBQWMsZ0JBQzFCLElBQUksU0FBUyxjQUFjLGVBQWdCLGlCQUM3QyxVQUFVLFFBQVEsR0FBRyxNQUFNO3NCQUMvQjtvQkFDRjtrQkFDRixXQUFXLFNBQVMsU0FBUyxjQUFjLGdCQUFnQixVQUFVLFFBQVEsUUFBUSxNQUFNLElBQUk7QUFDN0YsOEJBQVUsS0FBSyxRQUFRO2tCQUN6QjtnQkFDRjtjQUNGLENBQUM7QUFFRCxvQkFBTSx1QkFBdUIsY0FBYztBQUMzQyx3QkFBVSxRQUFRLENBQUMsYUFBYTtBQUU5QixvQkFBSSx5QkFBeUIsZUFBZTtBQUMxQyx3QkFBTSxRQUFRLElBQVUsZUFBUSxjQUFjLFlBQWEsQ0FBQyxHQUFHLGNBQWMsWUFBYSxDQUFDLENBQUM7QUFDNUYsd0JBQU0sU0FBUyxJQUFVLGVBQVEsY0FBYyxZQUFhLENBQUMsR0FBRyxjQUFjLFlBQWEsQ0FBQyxDQUFDO0FBRTdGLHlCQUFPLElBQUksSUFBTSxPQUFPLElBQUksTUFBTTtBQUVsQyw2QkFBVztvQkFDVCxJQUFJLGtDQUFrQztzQkFDcEM7c0JBQ0E7c0JBQ0E7b0JBQ0YsQ0FBQztrQkFDSDtBQUVBO2dCQUNGO0FBR0Esc0JBQU0sb0JBQW9CLDZCQUE2QixvQkFBb0I7QUFDM0Usb0JBQUksbUJBQW1CO0FBQ3JCLDZCQUFXO29CQUNULElBQUksK0JBQStCO3NCQUNqQztzQkFDQSxNQUFNO3NCQUNOLGFBQWEsSUFBVSxhQUFNLEVBQUUsVUFBVSxjQUFjLFdBQVk7c0JBQ25FLGFBQWEsY0FBYyxZQUFhLENBQUM7b0JBQzNDLENBQUM7a0JBQ0g7QUFFQTtnQkFDRjtBQUVBLHdCQUFRLEtBQUssdUJBQXVCLG1CQUFtQjtjQUN6RCxDQUFDO1lBQ0gsQ0FBQztVQUNIO0FBRUEsa0JBQVEsbUJBQW1CLFVBQVU7UUFDdkMsQ0FBQSxDQUFDO01BQ0g7QUFFQSxhQUFPO0lBQ1QsQ0FBQTtFQUFBO0FBQ0Y7QUFwWmEsMkJBQ1ksb0JBQTBGO0VBQy9HLEdBQUc7RUFDSCxHQUFHO0VBQ0gsR0FBRztFQUNILEdBQUc7RUFDSCxHQUFHO0VBQ0gsT0FBTztFQUNQLEtBQUs7RUFDTCxPQUFPO0VBQ1AsUUFBUTtFQUNSLEtBQUs7RUFDTCxRQUFRO0VBQ1IsVUFBVTtFQUNWLFVBQVU7RUFDVixXQUFXOztFQUVYLFNBQVM7O0VBRVQsU0FBUztFQUNULFNBQVM7QUFDWDtBVXZDSyxJQUFNLGtCQUFOLE1BQU1JLGlCQUFlOzs7Ozs7O0VBZ0NuQixZQUFZLFVBQXVCLGlCQUFpRDtBQVgzRixTQUFRLHdCQUF3QkEsaUJBQWU7QUFDL0MsU0FBUSx3QkFBd0JBLGlCQUFlO0FBRS9DLFNBQVEscUJBQXFCO0FBUzNCLFNBQUssV0FBVztBQUNoQixTQUFLLGtCQUFrQjtFQUN6Qjs7Ozs7OztFQVFPLEtBQUssUUFBOEI7QUFDeEMsUUFBSSxLQUFLLGFBQWEsT0FBTyxVQUFVO0FBQ3JDLFlBQU0sSUFBSSxNQUFNLHdEQUF3RDtJQUMxRTtBQUVBLFNBQUssa0JBQWtCLE9BQU8sZ0JBQWdCLElBQUksQ0FBQyxnQkFBZ0I7TUFDakUsUUFBUSxXQUFXLE9BQU8sT0FBTztNQUNqQyxNQUFNLFdBQVc7SUFDbkIsRUFBRTtBQUVGLFdBQU87RUFDVDs7Ozs7RUFNTyxRQUF3QjtBQUM3QixXQUFPLElBQUlBLGlCQUFlLEtBQUssVUFBVSxLQUFLLGVBQWUsRUFBRSxLQUFLLElBQUk7RUFDMUU7Ozs7Ozs7Ozs7RUFXQSxJQUFXLHVCQUErQjtBQUN4QyxXQUFPLEtBQUs7RUFDZDs7Ozs7Ozs7OztFQVdBLElBQVcsdUJBQStCO0FBQ3hDLFdBQU8sS0FBSztFQUNkOzs7Ozs7Ozs7Ozs7O0VBY08sTUFBTTtJQUNYLHVCQUF1QkEsaUJBQWU7SUFDdEMsdUJBQXVCQSxpQkFBZTtFQUN4QyxJQUFJLENBQUMsR0FBUztBQUNaLFFBQUksS0FBSyxvQkFBb0I7QUFDM0I7SUFDRjtBQUNBLFNBQUssd0JBQXdCO0FBQzdCLFNBQUssd0JBQXdCO0FBRTdCLFNBQUssZ0JBQWdCLFFBQVEsQ0FBQyxTQUFTO0FBQ3JDLFdBQUssT0FBTyxRQUFRLENBQUMsU0FBUztBQUM1QixZQUFJLEtBQUssU0FBUyxtQkFBbUI7QUFDbkMsZUFBSyxPQUFPLElBQUksS0FBSyxxQkFBcUI7QUFDMUMsZUFBSyxTQUFTLENBQUMsVUFBVSxNQUFNLE9BQU8sSUFBSSxLQUFLLHFCQUFxQixDQUFDO1FBQ3ZFLFdBQVcsS0FBSyxTQUFTLG1CQUFtQjtBQUMxQyxlQUFLLE9BQU8sSUFBSSxLQUFLLHFCQUFxQjtBQUMxQyxlQUFLLFNBQVMsQ0FBQyxVQUFVLE1BQU0sT0FBTyxJQUFJLEtBQUsscUJBQXFCLENBQUM7UUFDdkUsV0FBVyxLQUFLLFNBQVMsUUFBUTtBQUMvQixlQUFLLHFCQUFxQixJQUFJO1FBQ2hDO01BQ0YsQ0FBQztJQUNILENBQUM7QUFFRCxTQUFLLHFCQUFxQjtFQUM1QjtFQUVRLGtCQUFrQixXQUFxQixLQUFpQixXQUF1QixTQUEyQjtBQUNoSCxRQUFJLFFBQVE7QUFDWixRQUFJLE9BQU8sUUFBUSxJQUFJLFNBQVMsR0FBRztBQUNqQyxlQUFTLElBQUksR0FBRyxJQUFJLFVBQVUsUUFBUSxLQUFLLEdBQUc7QUFDNUMsY0FBTSxJQUFJLFVBQVUsQ0FBQztBQUNyQixjQUFNLElBQUksVUFBVSxJQUFJLENBQUM7QUFDekIsY0FBTSxJQUFJLFVBQVUsSUFBSSxDQUFDO0FBQ3pCLGNBQU0sTUFBTSxJQUFJLENBQUM7QUFDakIsY0FBTSxRQUFRLFVBQVUsQ0FBQztBQUV6QixZQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxTQUFTLE1BQU0sQ0FBQyxDQUFDLEVBQUc7QUFDOUMsWUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFFBQVEsU0FBUyxNQUFNLENBQUMsQ0FBQyxFQUFHO0FBQzlDLFlBQUksSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRLFNBQVMsTUFBTSxDQUFDLENBQUMsRUFBRztBQUM5QyxZQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxTQUFTLE1BQU0sQ0FBQyxDQUFDLEVBQUc7QUFFOUMsY0FBTSxNQUFNLElBQUksQ0FBQztBQUNqQixjQUFNLFFBQVEsVUFBVSxDQUFDO0FBQ3pCLFlBQUksSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRLFNBQVMsTUFBTSxDQUFDLENBQUMsRUFBRztBQUM5QyxZQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxTQUFTLE1BQU0sQ0FBQyxDQUFDLEVBQUc7QUFDOUMsWUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFFBQVEsU0FBUyxNQUFNLENBQUMsQ0FBQyxFQUFHO0FBQzlDLFlBQUksSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRLFNBQVMsTUFBTSxDQUFDLENBQUMsRUFBRztBQUU5QyxjQUFNLE1BQU0sSUFBSSxDQUFDO0FBQ2pCLGNBQU0sUUFBUSxVQUFVLENBQUM7QUFDekIsWUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFFBQVEsU0FBUyxNQUFNLENBQUMsQ0FBQyxFQUFHO0FBQzlDLFlBQUksSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRLFNBQVMsTUFBTSxDQUFDLENBQUMsRUFBRztBQUM5QyxZQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxTQUFTLE1BQU0sQ0FBQyxDQUFDLEVBQUc7QUFDOUMsWUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFFBQVEsU0FBUyxNQUFNLENBQUMsQ0FBQyxFQUFHO0FBRTlDLGtCQUFVLE9BQU8sSUFBSTtBQUNyQixrQkFBVSxPQUFPLElBQUk7QUFDckIsa0JBQVUsT0FBTyxJQUFJO01BQ3ZCO0lBQ0Y7QUFDQSxXQUFPO0VBQ1Q7RUFFUSxrQkFBa0IsS0FBd0IsbUJBQWdEO0FBQ2hHLFVBQU0sTUFBTSxJQUFVLG1CQUFZLElBQUksU0FBUyxNQUFNLEdBQUcsSUFBSSxRQUFRO0FBQ3BFLFFBQUksT0FBTyxHQUFHLElBQUksSUFBSTtBQUN0QixRQUFJLGdCQUFnQixJQUFJO0FBQ3hCLFFBQUksT0FBTyxJQUFJLEtBQUsscUJBQXFCO0FBRXpDLFVBQU0sV0FBVyxJQUFJO0FBRXJCLFVBQU0sZ0JBQWdCLFNBQVMsYUFBYSxXQUFXO0FBQ3ZELFVBQU0scUJBQXFCLHlCQUErQiwyQkFBb0IsQ0FBQyxJQUFJLGNBQWM7QUFDakcsVUFBTSxZQUFZLENBQUM7QUFDbkIsYUFBUyxJQUFJLEdBQUcsSUFBSSxtQkFBbUIsUUFBUSxLQUFLLEdBQUc7QUFDckQsZ0JBQVUsS0FBSztRQUNiLG1CQUFtQixDQUFDO1FBQ3BCLG1CQUFtQixJQUFJLENBQUM7UUFDeEIsbUJBQW1CLElBQUksQ0FBQztRQUN4QixtQkFBbUIsSUFBSSxDQUFDO01BQzFCLENBQUM7SUFDSDtBQUVBLFVBQU0saUJBQWlCLFNBQVMsYUFBYSxZQUFZO0FBQ3pELFVBQU0sc0JBQXNCLDBCQUFnQywyQkFBb0IsQ0FBQyxJQUFJLGVBQWU7QUFDcEcsVUFBTSxhQUFhLENBQUM7QUFDcEIsYUFBUyxJQUFJLEdBQUcsSUFBSSxvQkFBb0IsUUFBUSxLQUFLLEdBQUc7QUFDdEQsaUJBQVcsS0FBSztRQUNkLG9CQUFvQixDQUFDO1FBQ3JCLG9CQUFvQixJQUFJLENBQUM7UUFDekIsb0JBQW9CLElBQUksQ0FBQztRQUN6QixvQkFBb0IsSUFBSSxDQUFDO01BQzNCLENBQUM7SUFDSDtBQUVBLFVBQU0sUUFBUSxTQUFTLFNBQVM7QUFDaEMsUUFBSSxDQUFDLE9BQU87QUFDVixZQUFNLElBQUksTUFBTSwyQ0FBMkM7SUFDN0Q7QUFDQSxVQUFNLGVBQWUsTUFBTSxLQUFLLE1BQU0sS0FBSztBQUUzQyxVQUFNLFFBQVEsS0FBSyxrQkFBa0IsY0FBYyxZQUFZLFdBQVcsaUJBQWlCO0FBQzNGLFVBQU0sY0FBd0IsQ0FBQztBQUMvQixhQUFTLElBQUksR0FBRyxJQUFJLE9BQU8sS0FBSztBQUM5QixrQkFBWSxDQUFDLElBQUksYUFBYSxDQUFDO0lBQ2pDO0FBQ0EsYUFBUyxTQUFTLFdBQVc7QUFHN0IsUUFBSSxJQUFJLGdCQUFnQjtBQUN0QixVQUFJLGlCQUFpQixJQUFJO0lBQzNCO0FBQ0EsUUFBSSxLQUFLLElBQVUsZ0JBQVMsSUFBSSxTQUFTLE9BQU8sSUFBSSxTQUFTLFlBQVksR0FBRyxJQUFVLGVBQVEsQ0FBQztBQUMvRixXQUFPO0VBQ1Q7RUFFUSxtQ0FBbUMsUUFBd0IsTUFBK0I7QUFDaEcsVUFBTSxtQkFBNkIsQ0FBQztBQUNwQyxTQUFLLFNBQVMsTUFBTSxRQUFRLENBQUMsTUFBTSxVQUFVO0FBQzNDLFVBQUksS0FBSyxlQUFlLElBQUksRUFBRyxrQkFBaUIsS0FBSyxLQUFLO0lBQzVELENBQUM7QUFHRCxRQUFJLENBQUMsaUJBQWlCLFFBQVE7QUFDNUIsV0FBSyxPQUFPLE9BQU8sS0FBSyxxQkFBcUI7QUFDN0MsV0FBSyxPQUFPLE9BQU8sS0FBSyxxQkFBcUI7QUFDN0M7SUFDRjtBQUNBLFNBQUssT0FBTyxJQUFJLEtBQUsscUJBQXFCO0FBQzFDLFVBQU0sVUFBVSxLQUFLLGtCQUFrQixNQUFNLGdCQUFnQjtBQUM3RCxXQUFPLElBQUksT0FBTztFQUNwQjtFQUVRLHFCQUFxQixNQUE0QjtBQUN2RCxRQUFJLEtBQUssU0FBUyxTQUFTO0FBQ3pCLFdBQUssT0FBTyxJQUFJLEtBQUsscUJBQXFCO0FBQzFDLFVBQUksS0FBSyxlQUFlLElBQUksR0FBRztBQUM3QixhQUFLLFNBQVMsQ0FBQyxVQUFVLE1BQU0sT0FBTyxJQUFJLEtBQUsscUJBQXFCLENBQUM7TUFDdkUsT0FBTztBQUNMLGNBQU0sU0FBUyxJQUFVLGFBQU07QUFDL0IsZUFBTyxPQUFPLGFBQWEsS0FBSyxJQUFJO0FBQ3BDLGVBQU8sT0FBTyxJQUFJLEtBQUsscUJBQXFCO0FBQzVDLGFBQUssT0FBUSxJQUFJLE1BQU07QUFDdkIsYUFBSyxTQUNGLE9BQU8sQ0FBQyxVQUFVLE1BQU0sU0FBUyxhQUFhLEVBQzlDLFFBQVEsQ0FBQyxVQUFVO0FBQ2xCLGdCQUFNLGNBQWM7QUFDcEIsZUFBSyxtQ0FBbUMsUUFBUSxXQUFXO1FBQzdELENBQUM7TUFDTDtJQUNGLFdBQVcsS0FBSyxTQUFTLGVBQWU7QUFDdEMsWUFBTSxjQUFjO0FBQ3BCLFdBQUssbUNBQW1DLEtBQUssUUFBUyxXQUFXO0lBQ25FLE9BQU87QUFDTCxVQUFJLEtBQUssZUFBZSxJQUFJLEdBQUc7QUFDN0IsYUFBSyxPQUFPLElBQUksS0FBSyxxQkFBcUI7QUFDMUMsYUFBSyxTQUFTLENBQUMsVUFBVSxNQUFNLE9BQU8sSUFBSSxLQUFLLHFCQUFxQixDQUFDO01BQ3ZFO0lBQ0Y7RUFDRjtFQUVRLGVBQWUsTUFBK0I7QUFDcEQsUUFBSSxTQUFTLEtBQUssU0FBUyxlQUFlLE1BQU0sR0FBRztBQUNqRCxhQUFPO0lBQ1QsV0FBVyxDQUFDLEtBQUssUUFBUTtBQUN2QixhQUFPO0lBQ1QsT0FBTztBQUNMLGFBQU8sS0FBSyxlQUFlLEtBQUssTUFBTTtJQUN4QztFQUNGO0FBQ0Y7QUFqUmEsZ0JBTVksaUNBQWlDO0FBTjdDLGdCQWFZLGlDQUFpQztBR2IxRCxJQUFNLE9BQU8sSUFBVSxlQUFRO0FBQy9CLElBQU0sT0FBTyxJQUFVLGVBQVE7QUFDL0IsSUFBTSxTQUFTLElBQVUsa0JBQVc7QUdHN0IsSUFBTSx3QkFBaUY7RUFDNUYsTUFBTTtFQUNOLE9BQU87RUFDUCxPQUFPO0VBQ1AsWUFBWTtFQUNaLE1BQU07RUFFTixNQUFNO0VBQ04sU0FBUztFQUNULFVBQVU7RUFDVixLQUFLO0VBRUwsY0FBYztFQUNkLGNBQWM7RUFDZCxVQUFVO0VBQ1YsVUFBVTtFQUVWLGVBQWU7RUFDZixlQUFlO0VBQ2YsV0FBVztFQUNYLFdBQVc7RUFFWCxjQUFjO0VBQ2QsY0FBYztFQUNkLGNBQWM7RUFDZCxVQUFVO0VBRVYsZUFBZTtFQUNmLGVBQWU7RUFDZixlQUFlO0VBQ2YsV0FBVztFQUVYLHFCQUFxQjtFQUNyQixtQkFBbUI7RUFDbkIsaUJBQWlCO0VBQ2pCLG1CQUFtQjtFQUNuQix1QkFBdUI7RUFDdkIsaUJBQWlCO0VBQ2pCLG9CQUFvQjtFQUNwQix3QkFBd0I7RUFDeEIsa0JBQWtCO0VBQ2xCLGtCQUFrQjtFQUNsQixzQkFBc0I7RUFDdEIsZ0JBQWdCO0VBQ2hCLG9CQUFvQjtFQUNwQix3QkFBd0I7RUFDeEIsa0JBQWtCO0VBRWxCLHNCQUFzQjtFQUN0QixvQkFBb0I7RUFDcEIsa0JBQWtCO0VBQ2xCLG9CQUFvQjtFQUNwQix3QkFBd0I7RUFDeEIsa0JBQWtCO0VBQ2xCLHFCQUFxQjtFQUNyQix5QkFBeUI7RUFDekIsbUJBQW1CO0VBQ25CLG1CQUFtQjtFQUNuQix1QkFBdUI7RUFDdkIsaUJBQWlCO0VBQ2pCLHFCQUFxQjtFQUNyQix5QkFBeUI7RUFDekIsbUJBQW1CO0FBQ3JCO0FFaEVPLFNBQVMsaUJBQTZDLFFBQWM7QUFDekUsTUFBSyxPQUFlLFFBQVE7QUFDMUIsV0FBTyxPQUFPO0VBQ2hCLE9BQU87QUFDSixXQUFlLFFBQVE7RUFDMUI7QUFFQSxTQUFPO0FBQ1Q7QURUQSxJQUFNQyxRQUFPLElBQVUsZUFBUTtBQUMvQixJQUFNQyxVQUFTLElBQVUsa0JBQVc7QUVGcEMsSUFBTUMsUUFBTyxJQUFVLGVBQVE7QUFDL0IsSUFBTUMsVUFBUyxJQUFVLGtCQUFXO0FBQ3BDLElBQU0sZ0JBQWdCLElBQVUsZUFBUTtBSUh4QyxJQUFNQyxVQUFTLElBQVUsbUJBQVc7QUFDcEMsSUFBTSxTQUFTLElBQVUsbUJBQVc7QUFDcEMsSUFBTUMsUUFBTyxJQUFVLGdCQUFRO0FBQy9CLElBQU1DLFFBQU8sSUFBVSxnQkFBUTtBQUUvQixJQUFNLGdCQUFnQixLQUFLLEtBQUssQ0FBRyxJQUFJO0FBQ3ZDLElBQU0sZUFBZSxJQUFVLG1CQUFXLEdBQUcsR0FBRyxDQUFDLGVBQWUsYUFBYTtBQUM3RSxJQUFNLGtCQUFrQixJQUFVLGdCQUFRLEdBQUssR0FBSyxDQUFHO0FJVnZELElBQU0sWUFBWSxJQUFVLGdCQUFRO0FBQ3BDLElBQU0sU0FBUyxJQUFVLGdCQUFRO0FBVTFCLFNBQVMsdUJBQXVCLFFBQXdCLEtBQXlDO0FBQ3RHLFNBQU8sWUFBWSxVQUFVLFdBQVcsS0FBSyxNQUFNO0FBQ25ELFNBQU87QUFDVDtBQ0hPLFNBQVMsb0JBQW9CLFFBQTREO0FBQzlGLFNBQU8sQ0FBQyxLQUFLLE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsS0FBSyxNQUFNLE9BQU8sR0FBRyxLQUFLLEtBQUssT0FBTyxJQUFJLE9BQU8sSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQztBQUNySDtBQ0xPLFNBQVMsY0FBYyxPQUF1QjtBQUNuRCxRQUFNLFlBQVksS0FBSyxNQUFNLFFBQVEsSUFBTSxLQUFLLEVBQUU7QUFDbEQsU0FBTyxRQUFRLElBQU0sS0FBSyxLQUFLO0FBQ2pDO0FITEEsSUFBTSxrQkFBa0IsSUFBVSxnQkFBUSxHQUFLLEdBQUssQ0FBRztBQUV2RCxJQUFNQyxRQUFPLElBQVUsZ0JBQVE7QUFDL0IsSUFBTUMsUUFBTyxJQUFVLGdCQUFRO0FBQy9CLElBQU0sT0FBTyxJQUFVLGdCQUFRO0FBQy9CLElBQU1DLFVBQVMsSUFBVSxtQkFBVztBQUNwQyxJQUFNQyxVQUFTLElBQVUsbUJBQVc7QUFDcEMsSUFBTSxTQUFTLElBQVUsbUJBQVc7QUFDcEMsSUFBTSxTQUFTLElBQVUsbUJBQVc7QUFDcEMsSUFBTSxVQUFVLElBQVUsY0FBTTtBQUt6QixJQUFNLGFBQU4sTUFBTUMsWUFBVTs7Ozs7OztFQTBHZCxZQUFZLFVBQXVCLFNBQTJCO0FBcEdyRSxTQUFPLHFCQUFxQixJQUFVLGdCQUFRO0FBa0I5QyxTQUFPLGFBQWE7QUFlcEIsU0FBTyxZQUFZLElBQVUsZ0JBQVEsR0FBSyxHQUFLLENBQUc7QUFvRWhELFNBQUssV0FBVztBQUNoQixTQUFLLFVBQVU7QUFFZixTQUFLLE9BQU87QUFDWixTQUFLLFNBQVM7QUFDZCxTQUFLLGVBQWU7QUFFcEIsU0FBSywyQkFBMkIsS0FBSyx5QkFBeUIsSUFBVSxtQkFBVyxDQUFDO0VBQ3RGOzs7O0VBbEVBLElBQVcsTUFBYztBQUN2QixXQUFPLEtBQUs7RUFDZDs7OztFQUtBLElBQVcsSUFBSSxPQUFlO0FBQzVCLFNBQUssT0FBTztBQUNaLFNBQUssZUFBZTtFQUN0Qjs7OztFQVVBLElBQVcsUUFBZ0I7QUFDekIsV0FBTyxLQUFLO0VBQ2Q7Ozs7RUFLQSxJQUFXLE1BQU0sT0FBZTtBQUM5QixTQUFLLFNBQVM7QUFDZCxTQUFLLGVBQWU7RUFDdEI7Ozs7RUFlQSxJQUFXLFFBQXFCO0FBQzlCLFlBQVEsS0FBSyx5REFBeUQ7QUFFdEUsV0FBTyxLQUFLLFNBQVMsSUFBVSxjQUFNLENBQUM7RUFDeEM7Ozs7Ozs7RUF5Qk8sU0FBUyxRQUFrQztBQUNoRCxXQUFPLE9BQU8sSUFBVSxrQkFBVSxVQUFVLEtBQUssUUFBYyxrQkFBVSxVQUFVLEtBQUssTUFBTSxHQUFLLEtBQUs7RUFDMUc7Ozs7Ozs7O0VBU08sS0FBSyxRQUF5QjtBQUNuQyxRQUFJLEtBQUssYUFBYSxPQUFPLFVBQVU7QUFDckMsWUFBTSxJQUFJLE1BQU0sbURBQW1EO0lBQ3JFO0FBRUEsU0FBSyxtQkFBbUIsS0FBSyxPQUFPLGtCQUFrQjtBQUN0RCxTQUFLLFVBQVUsT0FBTztBQUN0QixTQUFLLGFBQWEsT0FBTztBQUN6QixTQUFLLFNBQVMsT0FBTztBQUNyQixTQUFLLFVBQVUsS0FBSyxPQUFPLFNBQVM7QUFFcEMsV0FBTztFQUNUOzs7Ozs7RUFPTyxRQUFtQjtBQUN4QixXQUFPLElBQUlBLFlBQVUsS0FBSyxVQUFVLEtBQUssT0FBTyxFQUFFLEtBQUssSUFBSTtFQUM3RDs7OztFQUtPLFFBQWM7QUFDbkIsU0FBSyxPQUFPO0FBQ1osU0FBSyxTQUFTO0FBQ2QsU0FBSyxlQUFlO0VBQ3RCOzs7Ozs7RUFPTyx1QkFBdUIsUUFBc0M7QUFDbEUsVUFBTSxPQUFPLEtBQUssU0FBUyxlQUFlLE1BQU07QUFFaEQsV0FBTyxPQUFPLEtBQUssS0FBSyxrQkFBa0IsRUFBRSxhQUFhLEtBQUssV0FBVztFQUMzRTs7Ozs7OztFQVFPLHlCQUF5QixRQUE0QztBQUMxRSxVQUFNLE9BQU8sS0FBSyxTQUFTLGVBQWUsTUFBTTtBQUVoRCxXQUFPLHVCQUF1QixNQUFNLE1BQU07RUFDNUM7Ozs7OztFQU9PLHVCQUF1QixRQUE0QztBQUN4RSxRQUFJLEtBQUssVUFBVSxrQkFBa0IsZUFBZSxJQUFJLE1BQU07QUFDNUQsYUFBTyxPQUFPLEtBQUssS0FBSyx3QkFBd0IsRUFBRSxPQUFPO0lBQzNEO0FBRUEsVUFBTSxDQUFDLGtCQUFrQixpQkFBaUIsSUFBSSxvQkFBb0IsS0FBSyxTQUFTO0FBQ2hGLFlBQVEsSUFBSSxHQUFLLE1BQU0sS0FBSyxLQUFLLGtCQUFrQixtQkFBbUIsS0FBSztBQUUzRSxXQUFPLE9BQU8sYUFBYSxPQUFPLEVBQUUsWUFBWSxPQUFPLEtBQUssS0FBSyx3QkFBd0IsRUFBRSxPQUFPLENBQUM7RUFDckc7Ozs7OztFQU9PLHdCQUF3QixRQUFzQztBQUNuRSxTQUFLLHlCQUF5QkQsT0FBTTtBQUNwQyxTQUFLLHVCQUF1QixNQUFNO0FBRWxDLFdBQU8sT0FDSixLQUFLLGVBQWUsRUFDcEIsZ0JBQWdCQSxPQUFNLEVBQ3RCLGdCQUFnQixNQUFNLEVBQ3RCLFdBQVcsS0FBSyxTQUFTLE9BQU8sQ0FBQztFQUN0Qzs7Ozs7Ozs7OztFQVdPLE9BQU8sVUFBK0I7QUFFM0MsVUFBTSxpQkFBaUJELFFBQ3BCLEtBQUssS0FBSyx3QkFBd0IsRUFDbEMsU0FBUyxpQkFBaUIsS0FBSyx5QkFBeUJDLE9BQU0sQ0FBQyxDQUFDO0FBQ25FLFVBQU0sVUFBVSxLQUFLLHVCQUF1QkYsS0FBSTtBQUNoRCxVQUFNLFlBQVksS0FBSyxLQUFLLFFBQVEsRUFBRSxJQUFJLE9BQU8sRUFBRSxnQkFBZ0IsY0FBYyxFQUFFLFVBQVU7QUFHN0YsVUFBTSxDQUFDLGFBQWEsWUFBWSxJQUFJLG9CQUFvQixLQUFLLFNBQVM7QUFDdEUsVUFBTSxDQUFDLFdBQVcsVUFBVSxJQUFJLG9CQUFvQixTQUFTO0FBQzdELFVBQU0sTUFBTSxjQUFjLFlBQVksV0FBVztBQUNqRCxVQUFNLFFBQVEsY0FBYyxlQUFlLFVBQVU7QUFHckQsU0FBSyxPQUFhLGtCQUFVLFVBQVU7QUFDdEMsU0FBSyxTQUFlLGtCQUFVLFVBQVU7QUFFeEMsU0FBSyxlQUFlO0VBQ3RCOzs7Ozs7O0VBUU8sT0FBTyxPQUFxQjtBQUNqQyxRQUFJLEtBQUssVUFBVSxRQUFRLEtBQUssWUFBWTtBQUMxQyxXQUFLLE9BQU8sS0FBSyxPQUFPLGlCQUFpQkQsS0FBSSxDQUFDO0lBQ2hEO0FBRUEsUUFBSSxLQUFLLGNBQWM7QUFDckIsV0FBSyxlQUFlO0FBRXBCLFdBQUssUUFBUSxjQUFjLEtBQUssTUFBTSxLQUFLLE1BQU07SUFDbkQ7RUFDRjtBQUNGO0FBNVFhLFdBQ1ksY0FBYztBQURoQyxJQUFNLFlBQU47QUlmUCxJQUFNSyxtQkFBa0IsSUFBVSxnQkFBUSxHQUFLLEdBQUssQ0FBRztBQUV2RCxJQUFNSCxVQUFTLElBQVUsbUJBQVc7QUFDcEMsSUFBTUMsVUFBUyxJQUFVLG1CQUFXO0FBQ3BDLElBQU1HLFdBQVUsSUFBVSxjQUFNLEdBQUssR0FBSyxHQUFLLEtBQUs7QUFNN0MsSUFBTSx1QkFBTixNQUF1RDs7Ozs7Ozs7OztFQW1FckQsWUFDTCxVQUNBLHlCQUNBLHlCQUNBLHNCQUNBLG9CQUNBO0FBQ0EsU0FBSyxXQUFXO0FBRWhCLFNBQUssMEJBQTBCO0FBQy9CLFNBQUssMEJBQTBCO0FBQy9CLFNBQUssdUJBQXVCO0FBQzVCLFNBQUsscUJBQXFCO0FBRTFCLFNBQUssWUFBWSxJQUFVLGdCQUFRLEdBQUssR0FBSyxDQUFHO0FBR2hELFNBQUssbUJBQW1CLElBQVUsbUJBQVc7QUFDN0MsU0FBSyxvQkFBb0IsSUFBVSxtQkFBVztBQUM5QyxTQUFLLDhCQUE4QixJQUFVLG1CQUFXO0FBQ3hELFNBQUssK0JBQStCLElBQVUsbUJBQVc7QUFFekQsVUFBTSxVQUFVLEtBQUssU0FBUyxlQUFlLFNBQVM7QUFDdEQsVUFBTSxXQUFXLEtBQUssU0FBUyxlQUFlLFVBQVU7QUFFeEQsUUFBSSxTQUFTO0FBQ1gsV0FBSyxpQkFBaUIsS0FBSyxRQUFRLFVBQVU7QUFDN0MsNkJBQXVCLFFBQVEsUUFBUyxLQUFLLDJCQUEyQjtJQUMxRTtBQUVBLFFBQUksVUFBVTtBQUNaLFdBQUssa0JBQWtCLEtBQUssU0FBUyxVQUFVO0FBQy9DLDZCQUF1QixTQUFTLFFBQVMsS0FBSyw0QkFBNEI7SUFDNUU7RUFDRjs7Ozs7OztFQVFPLGNBQWMsS0FBYSxPQUFxQjtBQUNyRCxVQUFNLFVBQVUsS0FBSyxTQUFTLGVBQWUsU0FBUztBQUN0RCxVQUFNLFdBQVcsS0FBSyxTQUFTLGVBQWUsVUFBVTtBQUN4RCxVQUFNLG9CQUFvQixLQUFLLFNBQVMsc0JBQXNCLFNBQVM7QUFDdkUsVUFBTSxxQkFBcUIsS0FBSyxTQUFTLHNCQUFzQixVQUFVO0FBRXpFLFFBQUksU0FBUztBQUNYLFVBQUksUUFBUSxHQUFLO0FBQ2ZBLGlCQUFRLElBQUksQ0FBTyxrQkFBVSxVQUFVLEtBQUsscUJBQXFCLElBQUksQ0FBQyxLQUFLO01BQzdFLE9BQU87QUFDTEEsaUJBQVEsSUFBVSxrQkFBVSxVQUFVLEtBQUssbUJBQW1CLElBQUksS0FBSztNQUN6RTtBQUVBLFVBQUksTUFBTSxHQUFLO0FBQ2JBLGlCQUFRLElBQUksQ0FBTyxrQkFBVSxVQUFVLEtBQUssd0JBQXdCLElBQUksQ0FBQyxHQUFHO01BQzlFLE9BQU87QUFDTEEsaUJBQVEsSUFBVSxrQkFBVSxVQUFVLEtBQUssd0JBQXdCLElBQUksR0FBRztNQUM1RTtBQUVBSixjQUFPLGFBQWFJLFFBQU87QUFDM0IsV0FBSyx1QkFBdUJILE9BQU07QUFLbEMsd0JBQW1CLFdBQVcsS0FBS0EsT0FBTSxFQUFFLFNBQVNELE9BQU0sRUFBRSxTQUFTQyxRQUFPLE9BQU8sQ0FBQztBQUVwRkQsY0FBTyxLQUFLLEtBQUssMkJBQTJCO0FBSTVDLGNBQVEsV0FDTCxLQUFLLGtCQUFtQixVQUFVLEVBQ2xDLFNBQVNBLE9BQU0sRUFDZixZQUFZQSxRQUFPLE9BQU8sQ0FBQyxFQUMzQixTQUFTLEtBQUssZ0JBQWdCO0lBQ25DO0FBR0EsUUFBSSxVQUFVO0FBQ1osVUFBSSxRQUFRLEdBQUs7QUFDZkksaUJBQVEsSUFBSSxDQUFPLGtCQUFVLFVBQVUsS0FBSyxxQkFBcUIsSUFBSSxDQUFDLEtBQUs7TUFDN0UsT0FBTztBQUNMQSxpQkFBUSxJQUFVLGtCQUFVLFVBQVUsS0FBSyxtQkFBbUIsSUFBSSxLQUFLO01BQ3pFO0FBRUEsVUFBSSxNQUFNLEdBQUs7QUFDYkEsaUJBQVEsSUFBSSxDQUFPLGtCQUFVLFVBQVUsS0FBSyx3QkFBd0IsSUFBSSxDQUFDLEdBQUc7TUFDOUUsT0FBTztBQUNMQSxpQkFBUSxJQUFVLGtCQUFVLFVBQVUsS0FBSyx3QkFBd0IsSUFBSSxHQUFHO01BQzVFO0FBRUFKLGNBQU8sYUFBYUksUUFBTztBQUMzQixXQUFLLHVCQUF1QkgsT0FBTTtBQUtsQyx5QkFBb0IsV0FBVyxLQUFLQSxPQUFNLEVBQUUsU0FBU0QsT0FBTSxFQUFFLFNBQVNDLFFBQU8sT0FBTyxDQUFDO0FBRXJGRCxjQUFPLEtBQUssS0FBSyw0QkFBNEI7QUFJN0MsZUFBUyxXQUNOLEtBQUssbUJBQW9CLFVBQVUsRUFDbkMsU0FBU0EsT0FBTSxFQUNmLFlBQVlBLFFBQU8sT0FBTyxDQUFDLEVBQzNCLFNBQVMsS0FBSyxpQkFBaUI7SUFDcEM7RUFDRjs7OztFQUtPLE9BQU8sT0FBMEI7QUFDdEMsWUFBUSxLQUFLLG9FQUFvRTtBQUVqRixVQUFNLE1BQVksa0JBQVUsVUFBVSxNQUFNO0FBQzVDLFVBQU0sUUFBYyxrQkFBVSxVQUFVLE1BQU07QUFFOUMsU0FBSyxjQUFjLEtBQUssS0FBSztFQUMvQjs7Ozs7O0VBT1EsdUJBQXVCLFFBQTRDO0FBQ3pFLFFBQUksS0FBSyxVQUFVLGtCQUFrQkcsZ0JBQWUsSUFBSSxNQUFNO0FBQzVELGFBQU8sT0FBTyxTQUFTO0lBQ3pCO0FBRUEsVUFBTSxDQUFDLGtCQUFrQixpQkFBaUIsSUFBSSxvQkFBb0IsS0FBSyxTQUFTO0FBQ2hGQyxhQUFRLElBQUksR0FBSyxNQUFNLEtBQUssS0FBSyxrQkFBa0IsbUJBQW1CLEtBQUs7QUFFM0UsV0FBTyxPQUFPLGFBQWFBLFFBQU87RUFDcEM7QUFDRjtBQWhOYSxxQkFJWSxPQUFPO0FDWnpCLElBQU0sNkJBQU4sTUFBNkQ7Ozs7Ozs7Ozs7RUF5QzNELFlBQ0wsYUFDQSx5QkFDQSx5QkFDQSxzQkFDQSxvQkFDQTtBQUNBLFNBQUssY0FBYztBQUVuQixTQUFLLDBCQUEwQjtBQUMvQixTQUFLLDBCQUEwQjtBQUMvQixTQUFLLHVCQUF1QjtBQUM1QixTQUFLLHFCQUFxQjtFQUM1Qjs7Ozs7OztFQVFPLGNBQWMsS0FBYSxPQUFxQjtBQUNyRCxRQUFJLFFBQVEsR0FBSztBQUNmLFdBQUssWUFBWSxTQUFTLFlBQVksQ0FBRztBQUN6QyxXQUFLLFlBQVksU0FBUyxVQUFVLEtBQUssbUJBQW1CLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDekUsT0FBTztBQUNMLFdBQUssWUFBWSxTQUFTLFVBQVUsQ0FBRztBQUN2QyxXQUFLLFlBQVksU0FBUyxZQUFZLEtBQUsscUJBQXFCLElBQUksS0FBSyxDQUFDO0lBQzVFO0FBRUEsUUFBSSxNQUFNLEdBQUs7QUFDYixXQUFLLFlBQVksU0FBUyxZQUFZLENBQUc7QUFDekMsV0FBSyxZQUFZLFNBQVMsYUFBYSxLQUFLLHdCQUF3QixJQUFJLENBQUMsR0FBRyxDQUFDO0lBQy9FLE9BQU87QUFDTCxXQUFLLFlBQVksU0FBUyxhQUFhLENBQUc7QUFDMUMsV0FBSyxZQUFZLFNBQVMsWUFBWSxLQUFLLHdCQUF3QixJQUFJLEdBQUcsQ0FBQztJQUM3RTtFQUNGOzs7O0VBS08sT0FBTyxPQUEwQjtBQUN0QyxZQUFRLEtBQUssb0VBQW9FO0FBRWpGLFVBQU0sTUFBWSxrQkFBVSxVQUFVLE1BQU07QUFDNUMsVUFBTSxRQUFjLGtCQUFVLFVBQVUsTUFBTTtBQUU5QyxTQUFLLGNBQWMsS0FBSyxLQUFLO0VBQy9CO0FBQ0Y7QUEzRmEsMkJBSVksT0FBTzs7O0FRWmhDLFlBQVlDLGFBQVc7QUFFdkIsSUFBTSxVQUFVLE1BQU0sS0FBSztBQUUzQixJQUFNQyxXQUF3QixvQkFBVSxjQUFNO0FBRXZDLElBQU0sMkJBQU4sY0FBNkMsaUJBQVM7QUFBQSxFQUlwRCxZQUFZLFFBQW1CO0FBQ3BDLFVBQU07QUFFTixTQUFLLFlBQVk7QUFFakIsU0FBSyxPQUFPO0FBR1osVUFBTSwrQkFBK0IsS0FBSyxTQUFTO0FBQ25ELFNBQUssU0FBUyxVQUFVLE1BQU07QUFDNUIsbUNBQTZCO0FBQzdCLFdBQUssZUFBZTtBQUFBLElBQ3RCLENBQUM7QUFFRCxVQUFNLGlDQUFpQyxLQUFLLFdBQVc7QUFDdkQsU0FBSyxXQUFXLFVBQVUsTUFBTTtBQUM5QixxQ0FBK0I7QUFDL0IsV0FBSyxlQUFlO0FBQUEsSUFDdEIsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUVRLGlCQUF1QjtBQUM3QixJQUFBQSxTQUFRLGtCQUFrQixLQUFLLFlBQVksVUFBVSxXQUFXO0FBRWhFLFNBQUssVUFBVSxNQUFNLFVBQVVBLFNBQVE7QUFDdkMsU0FBSyxVQUFVLFFBQVEsVUFBVUEsU0FBUTtBQUFBLEVBQzNDO0FBQ0Y7OztBekMzQk8sU0FBUyxpQ0FDZCxjQUNBLFVBQ0EsYUFJQTtBQWxCRjtBQW1CRSxRQUFNLGNBQWMsb0JBQUksSUFBdUM7QUFDL0QsUUFBTSxXQUFXLG9CQUFJLElBQWlEO0FBRXRFLGFBQVcsQ0FBQyxNQUFNLFNBQVMsS0FBSyxhQUFhLGVBQWUsU0FBUyxRQUFRLEdBQUc7QUFDOUUsVUFBTSxZQUFXLGNBQVMsc0JBQXNCLElBQUksTUFBbkMsbUJBQXNDO0FBRXZELFFBQUksWUFBWSxNQUFNO0FBQ3BCLFlBQU0sUUFBUSxJQUFVO0FBQUEsUUFDdEIsR0FBRyxRQUFRO0FBQUEsUUFDWCxVQUFVO0FBQUEsUUFDVixVQUFVLE9BQU8sSUFBSSxDQUFDLEdBQUcsTUFBTyxnQkFBZ0IsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBRTtBQUFBLE1BQzlFO0FBQ0EsZUFBUyxJQUFJLE1BQU0sS0FBSztBQUFBLElBQzFCO0FBQUEsRUFDRjtBQUVBLGFBQVcsQ0FBQyxNQUFNLFNBQVMsS0FBSyxhQUFhLGVBQWUsWUFBWSxRQUFRLEdBQUc7QUFDakYsVUFBTSxZQUFXLGNBQVMsc0JBQXNCLElBQUksTUFBbkMsbUJBQXNDO0FBRXZELFFBQUksWUFBWSxNQUFNO0FBQ3BCLFlBQU0sYUFBYSxhQUFhLGlCQUFpQjtBQUNqRCxZQUFNLFlBQVksU0FBUyxtQkFBbUIsS0FBTSxTQUFVLENBQUM7QUFDL0QsWUFBTSxRQUFRLFlBQVk7QUFFMUIsWUFBTSxRQUFRLFVBQVUsTUFBTTtBQUM5QixZQUFNLFNBQVMsTUFBTSxPQUFPLElBQUksQ0FBQyxHQUFHLE9BQU8sZ0JBQWdCLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQyxJQUFJLEtBQUssS0FBSztBQUMvRixZQUFNLE9BQU8sR0FBRyxRQUFRO0FBQ3hCLGtCQUFZLElBQUksTUFBTSxLQUFLO0FBQUEsSUFDN0I7QUFBQSxFQUNGO0FBRUEsU0FBTyxFQUFFLGFBQWEsU0FBUztBQUNqQztBQUVPLFNBQVMsbUNBQ2QsY0FDQSxtQkFJQTtBQUNBLFFBQU0sU0FBUyxvQkFBSSxJQUF3RDtBQUMzRSxRQUFNLFNBQVMsb0JBQUksSUFBdUM7QUFFMUQsYUFBVyxDQUFDLE1BQU0sU0FBUyxLQUFLLGFBQWEsaUJBQWlCLE9BQU8sUUFBUSxHQUFHO0FBQzlFLFVBQU0sWUFBWSxrQkFBa0IsdUJBQXVCLElBQUk7QUFFL0QsUUFBSSxhQUFhLE1BQU07QUFDckIsWUFBTSxRQUFRLFVBQVUsTUFBTTtBQUM5QixZQUFNLE9BQU87QUFDYixhQUFPLElBQUksTUFBTSxLQUFLO0FBQUEsSUFDeEI7QUFBQSxFQUNGO0FBRUEsYUFBVyxDQUFDLE1BQU0sU0FBUyxLQUFLLGFBQWEsaUJBQWlCLE9BQU8sUUFBUSxHQUFHO0FBQzlFLFVBQU0sWUFBWSxrQkFBa0IsdUJBQXVCLElBQUk7QUFFL0QsUUFBSSxhQUFhLE1BQU07QUFDckIsWUFBTSxRQUFRLFVBQVUsTUFBTTtBQUM5QixZQUFNLE9BQU87QUFDYixhQUFPLElBQUksTUFBTSxLQUFLO0FBQUEsSUFDeEI7QUFBQSxFQUNGO0FBRUEsU0FBTyxFQUFFLFFBQVEsT0FBTztBQUMxQjtBQUVPLFNBQVMsOEJBQ2QsY0FDQSxXQUM0QjtBQUM1QixNQUFJLGFBQWEsZUFBZSxNQUFNO0FBQ3BDLFdBQU87QUFBQSxFQUNUO0FBRUEsUUFBTSxRQUFRLGFBQWEsWUFBWSxNQUFNO0FBQzdDLFFBQU0sT0FBTztBQUNiLFNBQU87QUFDVDtBQVNPLFNBQVMsdUJBQXVCLGNBQTRCLEtBQW1DO0FBQ3BHLFFBQU0sU0FBZ0MsQ0FBQztBQUV2QyxRQUFNLGlCQUFpQixpQ0FBaUMsY0FBYyxJQUFJLFVBQVUsSUFBSSxLQUFLLFdBQVc7QUFDeEcsU0FBTyxLQUFLLEdBQUcsZUFBZSxZQUFZLE9BQU8sQ0FBQztBQUNsRCxTQUFPLEtBQUssR0FBRyxlQUFlLFNBQVMsT0FBTyxDQUFDO0FBRS9DLE1BQUksSUFBSSxxQkFBcUIsTUFBTTtBQUNqQyxVQUFNLG1CQUFtQixtQ0FBbUMsY0FBYyxJQUFJLGlCQUFpQjtBQUMvRixXQUFPLEtBQUssR0FBRyxpQkFBaUIsT0FBTyxPQUFPLENBQUM7QUFDL0MsV0FBTyxLQUFLLEdBQUcsaUJBQWlCLE9BQU8sT0FBTyxDQUFDO0FBQUEsRUFDakQ7QUFFQSxNQUFJLElBQUksVUFBVSxNQUFNO0FBRXRCLFFBQUksUUFBUSxJQUFJLE1BQU0sU0FBUyxLQUFLLENBQUMsUUFBUSxlQUFlLHdCQUF3QjtBQUVwRixRQUFJLFNBQVMsTUFBTTtBQUVqQixjQUFRO0FBQUEsUUFDTjtBQUFBLE1BQ0Y7QUFFQSxjQUFRLElBQUkseUJBQXlCLElBQUksTUFBTTtBQUMvQyxZQUFNLE9BQU87QUFDYixVQUFJLE1BQU0sSUFBSSxLQUFLO0FBQUEsSUFDckIsV0FBVyxNQUFNLFNBQVMsSUFBSTtBQUU1QixjQUFRO0FBQUEsUUFDTjtBQUFBLE1BQ0Y7QUFFQSxZQUFNLE9BQU87QUFBQSxJQUNmO0FBR0EsVUFBTSxRQUFRLDhCQUE4QixjQUFjLEdBQUcsTUFBTSxJQUFJLGFBQWE7QUFDcEYsUUFBSSxTQUFTLE1BQU07QUFDakIsYUFBTyxLQUFLLEtBQUs7QUFBQSxJQUNuQjtBQUFBLEVBQ0Y7QUFFQSxTQUFPLElBQVUsc0JBQWMsUUFBUSxhQUFhLFVBQVUsTUFBTTtBQUN0RTs7O0EwQ3JKQSxZQUFZQyxhQUFXO0FBU2hCLElBQU0sZUFBTixNQUFtQjtBQUFBLEVBY2pCLGNBQWM7QUFDbkIsU0FBSyxXQUFXO0FBQ2hCLFNBQUssbUJBQW1CLElBQVUsZ0JBQVE7QUFFMUMsU0FBSyxpQkFBaUI7QUFBQSxNQUNwQixhQUFhLG9CQUFJLElBQUk7QUFBQSxNQUNyQixVQUFVLG9CQUFJLElBQUk7QUFBQSxJQUNwQjtBQUVBLFNBQUssbUJBQW1CO0FBQUEsTUFDdEIsUUFBUSxvQkFBSSxJQUFJO0FBQUEsTUFDaEIsUUFBUSxvQkFBSSxJQUFJO0FBQUEsSUFDbEI7QUFFQSxTQUFLLGNBQWM7QUFBQSxFQUNyQjtBQUNGOzs7QUN2Q0EsWUFBWUMsYUFBVzs7O0FDT2hCLFNBQVMsV0FBYyxPQUFxQixPQUFzQjtBQUN2RSxRQUFNLElBQUksTUFBTTtBQUVoQixRQUFNLE1BQWEsQ0FBQztBQUVwQixNQUFJLFVBQWUsQ0FBQztBQUNwQixNQUFJLFlBQVk7QUFFaEIsV0FBUyxJQUFJLEdBQUcsSUFBSSxHQUFHLEtBQUs7QUFDMUIsVUFBTSxLQUFLLE1BQU0sQ0FBQztBQUVsQixRQUFJLGFBQWEsR0FBRztBQUNsQixrQkFBWTtBQUNaLGdCQUFVLENBQUM7QUFDWCxVQUFJLEtBQUssT0FBTztBQUFBLElBQ2xCO0FBRUEsWUFBUSxLQUFLLEVBQUU7QUFDZjtBQUFBLEVBQ0Y7QUFFQSxTQUFPO0FBQ1Q7OztBRHBCQSxJQUFNLGdCQUE4QixvQkFBVSxnQkFBUTtBQUV0RCxJQUFNQyxRQUFxQixvQkFBVSxnQkFBUTtBQUM3QyxJQUFNQyxVQUF1QixvQkFBVSxtQkFBVztBQUNsRCxJQUFNQyxVQUF1QixvQkFBVSxtQkFBVztBQUNsRCxJQUFNQyxVQUF1QixvQkFBVSxtQkFBVztBQUtsRCxJQUFNQywwQkFBdUMsb0JBQUksSUFBSSxDQUFDLE9BQU8sV0FBVyxDQUFDO0FBRXpFLElBQU0sNkJBQXdELG9CQUFJLElBQUksT0FBTyxPQUFPLHVCQUF1QixDQUFDO0FBYXJHLElBQU0sMkJBQU4sTUFBMkQ7QUFBQSxFQUd6RCxZQUFZLFFBQW9CO0FBQ3JDLFNBQUssU0FBUztBQUFBLEVBQ2hCO0FBQUEsRUFFQSxJQUFXLE9BQWU7QUFDeEIsV0FBTztBQUFBLEVBQ1Q7QUFBQSxFQUVhLFVBQVUsTUFBMkI7QUFBQTtBQTdDcEQ7QUE4Q0ksWUFBTSxVQUFVLEtBQUssT0FBTztBQUM1QixZQUFNLG9CQUFvQixRQUFRO0FBRWxDLFVBQUkscUJBQXFCLFFBQVEsa0JBQWtCLFFBQVEsS0FBSyxJQUFJLEtBQUssSUFBSTtBQUMzRTtBQUFBLE1BQ0Y7QUFFQSxZQUFNLGdCQUFlLGFBQVEsZUFBUixtQkFBcUIsS0FBSztBQUUvQyxVQUFJLGdCQUFnQixNQUFNO0FBQ3hCO0FBQUEsTUFDRjtBQUVBLFlBQU0sY0FBYyxhQUFhO0FBQ2pDLFVBQUksZUFBZSxNQUFNO0FBQ3ZCLGdCQUFRO0FBQUEsVUFDTjtBQUFBLFFBQ0Y7QUFBQSxNQUNGLE9BQU87QUFDTCxZQUFJLENBQUNBLHdCQUF1QixJQUFJLFdBQVcsR0FBRztBQUM1QyxrQkFBUSxLQUFLLHNFQUFzRSxXQUFXLEVBQUU7QUFDaEc7QUFBQSxRQUNGO0FBQ0EsWUFBSSxnQkFBZ0IsYUFBYTtBQUMvQixrQkFBUTtBQUFBLFlBQ047QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFFQSxZQUFNLFVBQVUsS0FBSyxlQUFlLFlBQVk7QUFDaEQsWUFBTSxpQkFBaUIsTUFBTSxLQUFLLDBCQUEwQixNQUFNLFlBQVk7QUFFOUUsWUFBTSxZQUFXLHdCQUFhLGFBQWIsbUJBQXVCLFdBQVcsWUFBbEMsbUJBQTJDO0FBQzVELFlBQU0sT0FBTyxZQUFZLE9BQVMsTUFBTSxLQUFLLE9BQU8sY0FBYyxRQUFRLFFBQVEsSUFBd0I7QUFFMUcsWUFBTSxtQkFBbUIsSUFBVSxnQkFBUTtBQUMzQyxtQ0FBTSxpQkFBaUI7QUFJdkIsVUFBSSxpQkFBaUIsSUFBSSxNQUFNO0FBQzdCLGdCQUFRO0FBQUEsVUFDTjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBRUEsWUFBTSxRQUFRLEtBQUs7QUFDbkIsWUFBTSxhQUE2QixNQUFNLElBQUksQ0FBQyxNQUFNLGVBQWU7QUFDakUsY0FBTSxlQUFlLFFBQVEsV0FBWSxVQUFVO0FBRW5ELGNBQU0sWUFBWSxLQUFLLGdCQUFnQixNQUFNLGNBQWMsU0FBUyxjQUFjO0FBQ2xGLGtCQUFVLG1CQUFtQjtBQUU3QixlQUFPO0FBQUEsTUFDVCxDQUFDO0FBRUQsV0FBSyxTQUFTLGdCQUFnQjtBQUFBLElBQ2hDO0FBQUE7QUFBQSxFQUVRLGVBQWUsY0FBaUU7QUExRzFGO0FBMkdJLFVBQU0sc0JBQXFELG9CQUFJLElBQUk7QUFDbkUsVUFBTSx5QkFBOEMsb0JBQUksSUFBSTtBQUc1RCxVQUFNLGNBQWEsa0JBQWEsYUFBYixtQkFBdUI7QUFFMUMsUUFBSSxZQUFZO0FBQ2QsYUFBTyxRQUFRLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTTtBQUNuRCxjQUFNLE9BQU8sNkJBQU07QUFDbkIsWUFBSSxRQUFRLE1BQU07QUFDaEIsOEJBQW9CLElBQUksTUFBTSxJQUF3QjtBQUFBLFFBQ3hEO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUdBLFVBQU0sVUFBUyxrQkFBYSxnQkFBYixtQkFBMEI7QUFFekMsUUFBSSxRQUFRO0FBQ1YsYUFBTyxRQUFRLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQyxNQUFNLFVBQVUsTUFBTTtBQUNyRCxjQUFNLE9BQU8seUNBQVk7QUFDekIsWUFBSSxRQUFRLE1BQU07QUFDaEIsaUNBQXVCLElBQUksTUFBTSxJQUFJO0FBQUEsUUFDdkM7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNIO0FBRUEsVUFBTSxVQUFTLGtCQUFhLGdCQUFiLG1CQUEwQjtBQUV6QyxRQUFJLFFBQVE7QUFDVixhQUFPLFFBQVEsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDLE1BQU0sVUFBVSxNQUFNO0FBQ3JELGNBQU0sRUFBRSxLQUFLLElBQUk7QUFDakIsK0JBQXVCLElBQUksTUFBTSxJQUFJO0FBQUEsTUFDdkMsQ0FBQztBQUFBLElBQ0g7QUFHQSxVQUFNLGVBQWMsd0JBQWEsV0FBYixtQkFBcUIsU0FBckIsWUFBNkI7QUFFakQsV0FBTyxFQUFFLHFCQUFxQix3QkFBd0IsWUFBWTtBQUFBLEVBQ3BFO0FBQUEsRUFFYywwQkFDWixNQUNBLGNBQ2lEO0FBQUE7QUF4SnJEO0FBMEpJLFdBQUssTUFBTSxrQkFBa0IsT0FBTyxJQUFJO0FBRXhDLFlBQU0sYUFBYyxNQUFNLEtBQUssT0FBTyxnQkFBZ0IsTUFBTTtBQUU1RCxZQUFNLGlCQUF5RCxvQkFBSSxJQUFJO0FBRXZFLFVBQUksYUFBYSxZQUFZLE1BQU07QUFDakMsZUFBTztBQUFBLE1BQ1Q7QUFFQSxpQkFBVyxDQUFDLFVBQVUsU0FBUyxLQUFLLE9BQU8sUUFBUSxhQUFhLFNBQVMsVUFBVSxHQUFHO0FBQ3BGLGNBQU0sT0FBTyx1Q0FBVztBQUN4QixZQUFJLFFBQVEsTUFBTTtBQUNoQixnQkFBTSxZQUFZLFdBQVcsSUFBSTtBQUNqQyx5QkFBZSxJQUFJLFVBQThCLFVBQVUsV0FBVztBQUV0RSxjQUFJLGFBQWEsUUFBUTtBQUN2QiwyQkFBZSxJQUFJLGVBQWMscUJBQVUsV0FBVixtQkFBa0IsZ0JBQWxCLFlBQWlDLGFBQWE7QUFBQSxVQUNqRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBRUEsYUFBTztBQUFBLElBQ1Q7QUFBQTtBQUFBLEVBRVEsZ0JBQ04sZUFDQSxjQUNBLFNBQ0EsZ0JBQ2M7QUFDZCxVQUFNLFNBQVMsY0FBYztBQUM3QixVQUFNLGNBQWMsYUFBYTtBQUVqQyxVQUFNLFNBQVMsSUFBSSxhQUFhO0FBRWhDLFdBQU8sV0FBVyxjQUFjO0FBRWhDLGdCQUFZLFFBQVEsQ0FBQyxTQUFTLGFBQWE7QUFDekMsWUFBTSxFQUFFLE1BQU0sS0FBSyxJQUFJLFFBQVE7QUFDL0IsWUFBTSxZQUFZLE9BQU8sUUFBUTtBQUVqQyxVQUFJLFFBQVEsTUFBTTtBQUNoQjtBQUFBLE1BQ0Y7QUFHQSxZQUFNLFdBQVcsUUFBUSxvQkFBb0IsSUFBSSxJQUFJO0FBQ3JELFVBQUksWUFBWSxNQUFNO0FBQ3BCLFlBQUksaUJBQXlELHNCQUFzQixRQUFRO0FBQzNGLGVBQU8sa0JBQWtCLFFBQVEsZUFBZSxJQUFJLGNBQWMsS0FBSyxNQUFNO0FBQzNFLDJCQUFpQixzQkFBc0IsY0FBYztBQUFBLFFBQ3ZEO0FBQ0EsWUFBSSxrQkFBa0IsTUFBTTtBQUMxQiwyQkFBaUI7QUFBQSxRQUNuQjtBQUVBLFlBQUksU0FBUyxlQUFlO0FBQzFCLGNBQUksYUFBYSxRQUFRO0FBQ3ZCLG9CQUFRO0FBQUEsY0FDTiwwREFBMEQsUUFBUTtBQUFBLFlBQ3BFO0FBQUEsVUFDRixPQUFPO0FBQ0wsa0JBQU0sd0JBQXdCLGVBQWUsSUFBSSxZQUFZO0FBRTdELGtCQUFNLGNBQWMsV0FBVyxVQUFVLFFBQVEsQ0FBQyxFQUFFO0FBQUEsY0FBUSxDQUFDLE1BQzNESixNQUFLLFVBQVUsQ0FBQyxFQUFFLGFBQWEscUJBQXFCLEVBQUUsUUFBUTtBQUFBLFlBQ2hFO0FBRUEsa0JBQU0sUUFBUSxVQUFVLE1BQU07QUFDOUIsa0JBQU0sU0FBUyxJQUFJLGFBQWEsV0FBVztBQUUzQyxtQkFBTyxlQUFlLFlBQVksSUFBSSxVQUFVLEtBQUs7QUFBQSxVQUN2RDtBQUFBLFFBQ0YsV0FBVyxTQUFTLFlBQVk7QUFLOUIsZ0JBQU0sY0FBYyxlQUFlLElBQUksUUFBUTtBQUMvQyxnQkFBTSxvQkFBb0IsZUFBZSxJQUFJLGNBQWM7QUFFM0Qsc0JBQVksVUFBVUEsT0FBTUMsU0FBUUQsS0FBSTtBQUN4QyxVQUFBQyxRQUFPLE9BQU87QUFFZCw0QkFBa0IsVUFBVUQsT0FBTUUsU0FBUUYsS0FBSTtBQUU5QyxnQkFBTSxjQUFjLFdBQVcsVUFBVSxRQUFRLENBQUMsRUFBRTtBQUFBLFlBQVEsQ0FBQyxNQUMzREcsUUFDRyxVQUFVLENBQTBCLEVBQ3BDLFlBQVlELE9BQU0sRUFDbEIsU0FBU0QsT0FBTSxFQUNmLFFBQVE7QUFBQSxVQUNiO0FBRUEsZ0JBQU0sUUFBUSxVQUFVLE1BQU07QUFDOUIsZ0JBQU0sU0FBUyxJQUFJLGFBQWEsV0FBVztBQUUzQyxpQkFBTyxlQUFlLFNBQVMsSUFBSSxVQUFVLEtBQUs7QUFBQSxRQUNwRCxPQUFPO0FBQ0wsZ0JBQU0sSUFBSSxNQUFNLGlCQUFpQixJQUFJLEdBQUc7QUFBQSxRQUMxQztBQUNBO0FBQUEsTUFDRjtBQUdBLFlBQU0saUJBQWlCLFFBQVEsdUJBQXVCLElBQUksSUFBSTtBQUM5RCxVQUFJLGtCQUFrQixNQUFNO0FBQzFCLFlBQUksU0FBUyxlQUFlO0FBQzFCLGdCQUFNLFFBQVEsVUFBVTtBQUN4QixnQkFBTSxTQUFTLElBQUksYUFBYSxVQUFVLE9BQU8sU0FBUyxDQUFDO0FBQzNELG1CQUFTLElBQUksR0FBRyxJQUFJLE9BQU8sUUFBUSxLQUFLO0FBQ3RDLG1CQUFPLENBQUMsSUFBSSxVQUFVLE9BQU8sSUFBSSxDQUFDO0FBQUEsVUFDcEM7QUFFQSxnQkFBTSxXQUFXLElBQVUsNEJBQW9CLEdBQUcsY0FBYyxXQUFXLE9BQWMsTUFBYTtBQUV0RyxjQUFJLDJCQUEyQixJQUFJLGNBQWMsR0FBRztBQUNsRCxtQkFBTyxpQkFBaUIsT0FBTyxJQUFJLGdCQUEyQyxRQUFRO0FBQUEsVUFDeEYsT0FBTztBQUNMLG1CQUFPLGlCQUFpQixPQUFPLElBQUksZ0JBQWdCLFFBQVE7QUFBQSxVQUM3RDtBQUFBLFFBQ0YsT0FBTztBQUNMLGdCQUFNLElBQUksTUFBTSxpQkFBaUIsSUFBSSxHQUFHO0FBQUEsUUFDMUM7QUFDQTtBQUFBLE1BQ0Y7QUFHQSxVQUFJLFNBQVMsUUFBUSxhQUFhO0FBQ2hDLFlBQUksU0FBUyxZQUFZO0FBQ3ZCLGlCQUFPLGNBQWM7QUFBQSxRQUN2QixPQUFPO0FBQ0wsZ0JBQU0sSUFBSSxNQUFNLGlCQUFpQixJQUFJLEdBQUc7QUFBQSxRQUMxQztBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFFRCxXQUFPO0FBQUEsRUFDVDtBQUNGOyIsCiAgIm5hbWVzIjogWyJUSFJFRSIsICJUSFJFRSIsICJfX2FzeW5jIiwgIl9WUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvckJpbmQiLCAiX1ZSTUV4cHJlc3Npb25UZXh0dXJlVHJhbnNmb3JtQmluZCIsICJfYSIsICJfVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbiIsICJfX2FzeW5jIiwgIl9iIiwgIl9WUk1GaXJzdFBlcnNvbiIsICJfdjNBIiwgIl9xdWF0QSIsICJfdjNBIiwgIl9xdWF0QSIsICJfcXVhdEEiLCAiX3YzQSIsICJfdjNCIiwgIl92M0EiLCAiX3YzQiIsICJfcXVhdEEiLCAiX3F1YXRCIiwgIl9WUk1Mb29rQXQiLCAiVkVDM19QT1NJVElWRV9aIiwgIl9ldWxlckEiLCAiVEhSRUUiLCAiX2V1bGVyQSIsICJUSFJFRSIsICJUSFJFRSIsICJfdjNBIiwgIl9xdWF0QSIsICJfcXVhdEIiLCAiX3F1YXRDIiwgIlBPU1NJQkxFX1NQRUNfVkVSU0lPTlMiXQp9Cg==
