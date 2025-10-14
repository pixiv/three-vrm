/*!
 * @pixiv/three-vrm v3.4.3
 * VRM file loader for three.js.
 *
 * Copyright (c) 2019-2025 pixiv Inc.
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

// src/nodes/index.ts
var nodes_exports = {};
__export(nodes_exports, {
  MToonAnimatedUVNode: () => MToonAnimatedUVNode,
  MToonLightingModel: () => MToonLightingModel,
  MToonNodeMaterial: () => MToonNodeMaterial
});
module.exports = __toCommonJS(nodes_exports);

// ../three-vrm-materials-mtoon/lib/nodes/index.module.js
var THREE = __toESM(require("three"), 1);
var THREE2 = __toESM(require("three/webgpu"), 1);
var import_tsl = require("three/tsl");
var import_tsl2 = require("three/tsl");
var THREE4 = __toESM(require("three/webgpu"), 1);
var import_tsl3 = require("three/tsl");
var THREE3 = __toESM(require("three/webgpu"), 1);
var import_tsl4 = require("three/tsl");
var THREE_TSL = __toESM(require("three/tsl"), 1);
var THREE_WEBGPU = __toESM(require("three/webgpu"), 1);
var THREE5 = __toESM(require("three/webgpu"), 1);
var import_tsl5 = require("three/tsl");
var import_tsl6 = require("three/tsl");
var threeRevision = parseInt(THREE.REVISION, 10);
if (threeRevision < 167) {
  console.warn(
    `MToonNodeMaterial requires Three.js r167 or higher (You are using r${threeRevision}). This would not work correctly.`
  );
}
var refColor = (0, import_tsl2.materialReference)("color", "color");
var refMap = (0, import_tsl2.materialReference)("map", "texture");
var refNormalMap = (0, import_tsl2.materialReference)("normalMap", "texture");
var refNormalScale = (0, import_tsl2.materialReference)("normalScale", "vec2");
var refEmissive = (0, import_tsl2.materialReference)("emissive", "color");
var refEmissiveIntensity = (0, import_tsl2.materialReference)("emissiveIntensity", "float");
var refEmissiveMap = (0, import_tsl2.materialReference)("emissiveMap", "texture");
var refShadeColorFactor = (0, import_tsl2.materialReference)("shadeColorFactor", "color");
var refShadingShiftFactor = (0, import_tsl2.materialReference)("shadingShiftFactor", "float");
var refShadeMultiplyTexture = (0, import_tsl2.materialReference)("shadeMultiplyTexture", "texture");
var refShadeMultiplyTextureScale = (0, import_tsl2.materialReference)("shadeMultiplyTextureScale", "float");
var refShadingToonyFactor = (0, import_tsl2.materialReference)("shadingToonyFactor", "float");
var refRimLightingMixFactor = (0, import_tsl2.materialReference)("rimLightingMixFactor", "float");
var refRimMultiplyTexture = (0, import_tsl2.materialReference)("rimMultiplyTexture", "texture");
var refMatcapFactor = (0, import_tsl2.materialReference)("matcapFactor", "color");
var refMatcapTexture = (0, import_tsl2.materialReference)("matcapTexture", "texture");
var refParametricRimColorFactor = (0, import_tsl2.materialReference)("parametricRimColorFactor", "color");
var refParametricRimLiftFactor = (0, import_tsl2.materialReference)("parametricRimLiftFactor", "float");
var refParametricRimFresnelPowerFactor = (0, import_tsl2.materialReference)("parametricRimFresnelPowerFactor", "float");
var refOutlineWidthMultiplyTexture = (0, import_tsl2.materialReference)("outlineWidthMultiplyTexture", "texture");
var refOutlineWidthFactor = (0, import_tsl2.materialReference)("outlineWidthFactor", "float");
var refOutlineColorFactor = (0, import_tsl2.materialReference)("outlineColorFactor", "color");
var refOutlineLightingMixFactor = (0, import_tsl2.materialReference)("outlineLightingMixFactor", "float");
var refUVAnimationMaskTexture = (0, import_tsl2.materialReference)("uvAnimationMaskTexture", "texture");
var refUVAnimationScrollXOffset = (0, import_tsl2.materialReference)("uvAnimationScrollXOffset", "float");
var refUVAnimationScrollYOffset = (0, import_tsl2.materialReference)("uvAnimationScrollYOffset", "float");
var refUVAnimationRotationPhase = (0, import_tsl2.materialReference)("uvAnimationRotationPhase", "float");
var MToonAnimatedUVNode = class extends THREE2.TempNode {
  constructor(hasMaskTexture) {
    super("vec2");
    this.hasMaskTexture = hasMaskTexture;
  }
  setup() {
    let uvAnimationMask = 1;
    if (this.hasMaskTexture) {
      uvAnimationMask = (0, import_tsl.vec4)(refUVAnimationMaskTexture).context({ getUV: () => (0, import_tsl.uv)() }).r;
    }
    let animatedUv = (0, import_tsl.uv)();
    const phase = refUVAnimationRotationPhase.mul(uvAnimationMask);
    const c = (0, import_tsl.cos)(phase);
    const s = (0, import_tsl.sin)(phase);
    animatedUv = animatedUv.sub((0, import_tsl.vec2)(0.5, 0.5));
    animatedUv = animatedUv.mul((0, import_tsl.mat2)(c, s, s.negate(), c));
    animatedUv = animatedUv.add((0, import_tsl.vec2)(0.5, 0.5));
    const scroll = (0, import_tsl.vec2)(refUVAnimationScrollXOffset, refUVAnimationScrollYOffset).mul(uvAnimationMask);
    animatedUv = animatedUv.add(scroll);
    return animatedUv.toVar("AnimatedUV");
  }
};
var shadeColor = (0, import_tsl4.nodeImmutable)(THREE3.PropertyNode, "vec3").toVar("ShadeColor");
var shadingShift = (0, import_tsl4.nodeImmutable)(THREE3.PropertyNode, "float").toVar("ShadingShift");
var shadingToony = (0, import_tsl4.nodeImmutable)(THREE3.PropertyNode, "float").toVar("ShadingToony");
var rimLightingMix = (0, import_tsl4.nodeImmutable)(THREE3.PropertyNode, "float").toVar("RimLightingMix");
var rimMultiply = (0, import_tsl4.nodeImmutable)(THREE3.PropertyNode, "vec3").toVar("RimMultiply");
var matcap = (0, import_tsl4.nodeImmutable)(THREE3.PropertyNode, "vec3").toVar("matcap");
var parametricRim = (0, import_tsl4.nodeImmutable)(THREE3.PropertyNode, "vec3").toVar("ParametricRim");
var FnCompat = (jsFunc) => {
  const threeRevision2 = parseInt(THREE_WEBGPU.REVISION, 10);
  if (threeRevision2 >= 168) {
    return THREE_TSL.Fn(jsFunc);
  } else {
    return THREE_WEBGPU.tslFn(jsFunc);
  }
};
var linearstep = FnCompat(
  ({
    a,
    b,
    t
  }) => {
    const top = t.sub(a);
    const bottom = b.sub(a);
    return top.div(bottom).clamp();
  }
);
var getShading = FnCompat(({ dotNL }) => {
  const shadow = 1;
  const feather = (0, import_tsl3.float)(1).sub(shadingToony);
  let shading = dotNL.add(shadingShift);
  shading = linearstep({
    a: feather.negate(),
    b: feather,
    t: shading
  });
  shading = shading.mul(shadow);
  return shading;
});
var getDiffuse = FnCompat(
  ({ shading, lightColor }) => {
    const feathered = (0, import_tsl3.mix)(shadeColor, import_tsl3.diffuseColor, shading);
    const col = lightColor.mul((0, import_tsl3.BRDF_Lambert)({ diffuseColor: feathered }));
    return col;
  }
);
var MToonLightingModel = class extends THREE4.LightingModel {
  constructor() {
    super();
  }
  direct({
    lightDirection,
    lightColor,
    reflectedLight
  }) {
    const dotNL = import_tsl3.transformedNormalView.dot(lightDirection).clamp(-1, 1);
    const shading = getShading({
      dotNL
    });
    reflectedLight.directDiffuse.addAssign(
      getDiffuse({
        shading,
        lightColor
      })
    );
    reflectedLight.directSpecular.addAssign(
      parametricRim.add(matcap).mul(rimMultiply).mul((0, import_tsl3.mix)((0, import_tsl3.vec3)(0), (0, import_tsl3.BRDF_Lambert)({ diffuseColor: lightColor }), rimLightingMix))
    );
  }
  // COMPAT: pre-r174
  // `builderOrContext`: `THREE.NodeBuilder` in >= r174, `LightingModelIndirectInput` (`LightingContext`) otherwise
  indirect(builderOrContext) {
    const context = "context" in builderOrContext ? builderOrContext.context : builderOrContext;
    this.indirectDiffuse(context);
    this.indirectSpecular(context);
  }
  indirectDiffuse(context) {
    const { irradiance, reflectedLight } = context;
    reflectedLight.indirectDiffuse.addAssign(
      irradiance.mul((0, import_tsl3.BRDF_Lambert)({ diffuseColor: import_tsl3.diffuseColor }))
    );
  }
  indirectSpecular(context) {
    const { reflectedLight } = context;
    reflectedLight.indirectSpecular.addAssign(
      parametricRim.add(matcap).mul(rimMultiply).mul((0, import_tsl3.mix)((0, import_tsl3.vec3)(1), (0, import_tsl3.vec3)(0), rimLightingMix))
    );
  }
};
var MToonMaterialOutlineWidthMode = {
  None: "none",
  WorldCoordinates: "worldCoordinates",
  ScreenCoordinates: "screenCoordinates"
};
var mtoonParametricRim = FnCompat(
  ({
    parametricRimLift,
    parametricRimFresnelPower,
    parametricRimColor
  }) => {
    const viewDir = import_tsl6.modelViewPosition.normalize();
    const dotNV = import_tsl6.transformedNormalView.dot(viewDir.negate());
    const rim = (0, import_tsl6.float)(1).sub(dotNV).add(parametricRimLift).clamp().pow(parametricRimFresnelPower);
    return rim.mul(parametricRimColor);
  }
);
var MToonNodeMaterial = class extends THREE5.NodeMaterial {
  customProgramCacheKey() {
    let cacheKey = super.customProgramCacheKey();
    cacheKey += `isOutline:${this.isOutline},`;
    return cacheKey;
  }
  /**
   * Readonly boolean that indicates this is a {@link MToonNodeMaterial}.
   */
  get isMToonNodeMaterial() {
    return true;
  }
  constructor(parameters = {}) {
    super();
    if (parameters.transparentWithZWrite) {
      parameters.depthWrite = true;
    }
    delete parameters.transparentWithZWrite;
    delete parameters.giEqualizationFactor;
    delete parameters.v0CompatShade;
    delete parameters.debugMode;
    this.emissiveNode = null;
    this.lights = true;
    this.color = new THREE5.Color(1, 1, 1);
    this.map = null;
    this.emissive = new THREE5.Color(0, 0, 0);
    this.emissiveIntensity = 1;
    this.emissiveMap = null;
    this.normalMap = null;
    this.normalScale = new THREE5.Vector2(1, 1);
    this.shadeColorFactor = new THREE5.Color(0, 0, 0);
    this.shadeMultiplyTexture = null;
    this.shadingShiftFactor = 0;
    this.shadingShiftTexture = null;
    this.shadingShiftTextureScale = 1;
    this.shadingToonyFactor = 0.9;
    this.rimLightingMixFactor = 1;
    this.rimMultiplyTexture = null;
    this.matcapFactor = new THREE5.Color(1, 1, 1);
    this.matcapTexture = null;
    this.parametricRimColorFactor = new THREE5.Color(0, 0, 0);
    this.parametricRimLiftFactor = 0;
    this.parametricRimFresnelPowerFactor = 5;
    this.outlineWidthMode = MToonMaterialOutlineWidthMode.None;
    this.outlineWidthMultiplyTexture = null;
    this.outlineWidthFactor = 0;
    this.outlineColorFactor = new THREE5.Color(0, 0, 0);
    this.outlineLightingMixFactor = 1;
    this.uvAnimationScrollXSpeedFactor = 0;
    this.uvAnimationScrollYSpeedFactor = 0;
    this.uvAnimationRotationSpeedFactor = 0;
    this.uvAnimationMaskTexture = null;
    this.shadeColorNode = null;
    this.shadingShiftNode = null;
    this.shadingToonyNode = null;
    this.rimLightingMixNode = null;
    this.rimMultiplyNode = null;
    this.matcapNode = null;
    this.parametricRimColorNode = null;
    this.parametricRimLiftNode = null;
    this.parametricRimFresnelPowerNode = null;
    this.uvAnimationScrollXOffset = 0;
    this.uvAnimationScrollYOffset = 0;
    this.uvAnimationRotationPhase = 0;
    this.isOutline = false;
    this._animatedUVNode = null;
    this.setValues(parameters);
  }
  setupLightingModel() {
    return new MToonLightingModel();
  }
  setup(builder) {
    var _a;
    this._animatedUVNode = new MToonAnimatedUVNode(
      (_a = this.uvAnimationMaskTexture && this.uvAnimationMaskTexture.isTexture === true) != null ? _a : false
    );
    super.setup(builder);
  }
  setupDiffuseColor(builder) {
    let tempColorNode = null;
    if (this.colorNode == null) {
      tempColorNode = refColor;
      if (this.map && this.map.isTexture === true) {
        const map = refMap.context({ getUV: () => this._animatedUVNode });
        tempColorNode = tempColorNode.mul(map);
      }
      this.colorNode = tempColorNode;
    }
    if (this.vertexColors === true && builder.geometry.hasAttribute("color")) {
      console.warn(
        "MToonNodeMaterial: MToon ignores vertex colors. Consider using a model without vertex colors instead."
      );
      this.vertexColors = false;
    }
    super.setupDiffuseColor(builder);
    if (parseInt(THREE5.REVISION, 10) < 166) {
      if (this.transparent === false && this.blending === THREE5.NormalBlending && this.alphaToCoverage === false) {
        import_tsl5.diffuseColor.a.assign(1);
      }
    }
    if (this.colorNode === tempColorNode) {
      this.colorNode = null;
    }
  }
  setupVariants() {
    shadeColor.assign(this._setupShadeColorNode());
    shadingShift.assign(this._setupShadingShiftNode());
    shadingToony.assign(this._setupShadingToonyNode());
    rimLightingMix.assign(this._setupRimLightingMixNode());
    rimMultiply.assign(this._setupRimMultiplyNode());
    matcap.assign(this._setupMatcapNode());
    parametricRim.assign(this._setupParametricRimNode());
  }
  setupNormal(builder) {
    const tempNormalNode = this.normalNode;
    if (this.normalNode == null) {
      this.normalNode = import_tsl5.materialNormal;
      if (this.normalMap && this.normalMap.isTexture === true) {
        const map = refNormalMap.context({ getUV: () => this._animatedUVNode });
        this.normalNode = (0, import_tsl5.normalMap)(map, refNormalScale);
      }
      if (this.isOutline) {
        this.normalNode = this.normalNode.negate();
      }
    }
    const threeRevision2 = parseInt(THREE5.REVISION, 10);
    if (threeRevision2 >= 168) {
      const ret = this.normalNode;
      this.normalNode = tempNormalNode;
      return ret;
    } else {
      super.setupNormal(builder);
      this.normalNode = tempNormalNode;
      return void 0;
    }
  }
  setupLighting(builder) {
    let tempEmissiveNode = null;
    if (this.emissiveNode == null) {
      tempEmissiveNode = refEmissive.mul(refEmissiveIntensity);
      if (this.emissiveMap && this.emissiveMap.isTexture === true) {
        const map = refEmissiveMap.context({ getUV: () => this._animatedUVNode });
        tempEmissiveNode = tempEmissiveNode.mul(map);
      }
      this.emissiveNode = tempEmissiveNode;
    }
    const ret = super.setupLighting(builder);
    if (this.emissiveNode === tempEmissiveNode) {
      this.emissiveNode = null;
    }
    return ret;
  }
  setupOutput(builder, outputNode) {
    if (this.isOutline && this.outlineWidthMode !== MToonMaterialOutlineWidthMode.None) {
      outputNode = (0, import_tsl5.vec4)(
        (0, import_tsl5.mix)(refOutlineColorFactor, outputNode.xyz.mul(refOutlineColorFactor), refOutlineLightingMixFactor),
        outputNode.w
      );
    }
    return super.setupOutput(builder, outputNode);
  }
  setupPosition(builder) {
    var _a, _b;
    const tempPositionNode = this.positionNode;
    if (this.isOutline && this.outlineWidthMode !== MToonMaterialOutlineWidthMode.None) {
      (_a = this.positionNode) != null ? _a : this.positionNode = import_tsl5.positionLocal;
      const normalLocalNormalized = import_tsl5.normalLocal.normalize();
      let width = refOutlineWidthFactor;
      if (this.outlineWidthMultiplyTexture && this.outlineWidthMultiplyTexture.isTexture === true) {
        const map = refOutlineWidthMultiplyTexture.context({ getUV: () => this._animatedUVNode });
        width = width.mul(map);
      }
      const worldNormalLength = (0, import_tsl5.length)(import_tsl5.modelNormalMatrix.mul(normalLocalNormalized));
      const outlineOffset = width.mul(worldNormalLength).mul(normalLocalNormalized);
      if (this.outlineWidthMode === MToonMaterialOutlineWidthMode.WorldCoordinates) {
        this.positionNode = this.positionNode.add(outlineOffset);
      } else if (this.outlineWidthMode === MToonMaterialOutlineWidthMode.ScreenCoordinates) {
        const clipScale = import_tsl5.cameraProjectionMatrix.element(1).element(1);
        const tempPositionView = import_tsl5.modelViewMatrix.mul(import_tsl5.positionLocal);
        this.positionNode = this.positionNode.add(
          outlineOffset.div(clipScale).mul(tempPositionView.z.negate())
        );
      }
      (_b = this.positionNode) != null ? _b : this.positionNode = import_tsl5.positionLocal;
    }
    const ret = super.setupPosition(builder);
    ret.z.add(ret.w.mul(1e-6));
    this.positionNode = tempPositionNode;
    return ret;
  }
  copy(source) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s;
    this.color.copy(source.color);
    this.map = (_a = source.map) != null ? _a : null;
    this.emissive.copy(source.emissive);
    this.emissiveIntensity = source.emissiveIntensity;
    this.emissiveMap = (_b = source.emissiveMap) != null ? _b : null;
    this.normalMap = (_c = source.normalMap) != null ? _c : null;
    this.normalScale.copy(source.normalScale);
    this.shadeColorFactor.copy(source.shadeColorFactor);
    this.shadeMultiplyTexture = (_d = source.shadeMultiplyTexture) != null ? _d : null;
    this.shadingShiftFactor = source.shadingShiftFactor;
    this.shadingShiftTexture = (_e = source.shadingShiftTexture) != null ? _e : null;
    this.shadingShiftTextureScale = source.shadingShiftTextureScale;
    this.shadingToonyFactor = source.shadingToonyFactor;
    this.rimLightingMixFactor = source.rimLightingMixFactor;
    this.rimMultiplyTexture = (_f = source.rimMultiplyTexture) != null ? _f : null;
    this.matcapFactor.copy(source.matcapFactor);
    this.matcapTexture = (_g = source.matcapTexture) != null ? _g : null;
    this.parametricRimColorFactor.copy(source.parametricRimColorFactor);
    this.parametricRimLiftFactor = source.parametricRimLiftFactor;
    this.parametricRimFresnelPowerFactor = source.parametricRimFresnelPowerFactor;
    this.outlineWidthMode = source.outlineWidthMode;
    this.outlineWidthMultiplyTexture = (_h = source.outlineWidthMultiplyTexture) != null ? _h : null;
    this.outlineWidthFactor = source.outlineWidthFactor;
    this.outlineColorFactor.copy(source.outlineColorFactor);
    this.outlineLightingMixFactor = source.outlineLightingMixFactor;
    this.uvAnimationScrollXSpeedFactor = source.uvAnimationScrollXSpeedFactor;
    this.uvAnimationScrollYSpeedFactor = source.uvAnimationScrollYSpeedFactor;
    this.uvAnimationRotationSpeedFactor = source.uvAnimationRotationSpeedFactor;
    this.uvAnimationMaskTexture = (_i = source.uvAnimationMaskTexture) != null ? _i : null;
    this.shadeColorNode = (_j = source.shadeColorNode) != null ? _j : null;
    this.shadingShiftNode = (_k = source.shadingShiftNode) != null ? _k : null;
    this.shadingToonyNode = (_l = source.shadingToonyNode) != null ? _l : null;
    this.rimLightingMixNode = (_m = source.rimLightingMixNode) != null ? _m : null;
    this.rimMultiplyNode = (_n = source.rimMultiplyNode) != null ? _n : null;
    this.matcapNode = (_o = source.matcapNode) != null ? _o : null;
    this.parametricRimColorNode = (_p = source.parametricRimColorNode) != null ? _p : null;
    this.parametricRimLiftNode = (_q = source.parametricRimLiftNode) != null ? _q : null;
    this.parametricRimFresnelPowerNode = (_r = source.parametricRimFresnelPowerNode) != null ? _r : null;
    this.isOutline = (_s = source.isOutline) != null ? _s : null;
    return super.copy(source);
  }
  update(delta) {
    this.uvAnimationScrollXOffset += delta * this.uvAnimationScrollXSpeedFactor;
    this.uvAnimationScrollYOffset += delta * this.uvAnimationScrollYSpeedFactor;
    this.uvAnimationRotationPhase += delta * this.uvAnimationRotationSpeedFactor;
  }
  _setupShadeColorNode() {
    if (this.shadeColorNode != null) {
      return (0, import_tsl5.vec3)(this.shadeColorNode);
    }
    let shadeColorNode = refShadeColorFactor;
    if (this.shadeMultiplyTexture && this.shadeMultiplyTexture.isTexture === true) {
      const map = refShadeMultiplyTexture.context({ getUV: () => this._animatedUVNode });
      shadeColorNode = shadeColorNode.mul(map);
    }
    return shadeColorNode;
  }
  _setupShadingShiftNode() {
    if (this.shadingShiftNode != null) {
      return (0, import_tsl5.float)(this.shadingShiftNode);
    }
    let shadingShiftNode = refShadingShiftFactor;
    if (this.shadingShiftTexture && this.shadingShiftTexture.isTexture === true) {
      const map = refShadeMultiplyTexture.context({ getUV: () => this._animatedUVNode });
      shadingShiftNode = shadingShiftNode.add(map.mul(refShadeMultiplyTextureScale));
    }
    return shadingShiftNode;
  }
  _setupShadingToonyNode() {
    if (this.shadingToonyNode != null) {
      return (0, import_tsl5.float)(this.shadingToonyNode);
    }
    return refShadingToonyFactor;
  }
  _setupRimLightingMixNode() {
    if (this.rimLightingMixNode != null) {
      return (0, import_tsl5.float)(this.rimLightingMixNode);
    }
    return refRimLightingMixFactor;
  }
  _setupRimMultiplyNode() {
    if (this.rimMultiplyNode != null) {
      return (0, import_tsl5.vec3)(this.rimMultiplyNode);
    }
    if (this.rimMultiplyTexture && this.rimMultiplyTexture.isTexture === true) {
      const map = refRimMultiplyTexture.context({ getUV: () => this._animatedUVNode });
      return map;
    }
    return (0, import_tsl5.vec3)(1);
  }
  _setupMatcapNode() {
    if (this.matcapNode != null) {
      return (0, import_tsl5.vec3)(this.matcapNode);
    }
    if (this.matcapTexture && this.matcapTexture.isTexture === true) {
      const map = refMatcapTexture.context({ getUV: () => import_tsl5.matcapUV.mul(1, -1).add(0, 1) });
      return map.mul(refMatcapFactor);
    }
    return (0, import_tsl5.vec3)(0);
  }
  _setupParametricRimNode() {
    const parametricRimColor = this.parametricRimColorNode != null ? (0, import_tsl5.vec3)(this.parametricRimColorNode) : refParametricRimColorFactor;
    const parametricRimLift = this.parametricRimLiftNode != null ? (0, import_tsl5.float)(this.parametricRimLiftNode) : refParametricRimLiftFactor;
    const parametricRimFresnelPower = this.parametricRimFresnelPowerNode != null ? (0, import_tsl5.float)(this.parametricRimFresnelPowerNode) : refParametricRimFresnelPowerFactor;
    return mtoonParametricRim({
      parametricRimLift,
      parametricRimFresnelPower,
      parametricRimColor
    });
  }
};
/*!
 * @pixiv/three-vrm-materials-mtoon v3.4.3
 * MToon (toon material) module for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2025 pixiv Inc.
 * @pixiv/three-vrm-materials-mtoon is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL25vZGVzL2luZGV4LnRzIiwgIi4uLy4uLy4uL3RocmVlLXZybS1tYXRlcmlhbHMtbXRvb24vc3JjL25vZGVzL3dhcm5pbmdJZlByZTE2MS50cyIsICIuLi8uLi8uLi90aHJlZS12cm0tbWF0ZXJpYWxzLW10b29uL3NyYy9ub2Rlcy9NVG9vbkFuaW1hdGVkVVZOb2RlLnRzIiwgIi4uLy4uLy4uL3RocmVlLXZybS1tYXRlcmlhbHMtbXRvb24vc3JjL25vZGVzL21hdGVyaWFsUmVmZXJlbmNlcy50cyIsICIuLi8uLi8uLi90aHJlZS12cm0tbWF0ZXJpYWxzLW10b29uL3NyYy9ub2Rlcy9NVG9vbkxpZ2h0aW5nTW9kZWwudHMiLCAiLi4vLi4vLi4vdGhyZWUtdnJtLW1hdGVyaWFscy1tdG9vbi9zcmMvbm9kZXMvaW1tdXRhYmxlTm9kZXMudHMiLCAiLi4vLi4vLi4vdGhyZWUtdnJtLW1hdGVyaWFscy1tdG9vbi9zcmMvbm9kZXMvdXRpbHMvRm5Db21wYXQudHMiLCAiLi4vLi4vLi4vdGhyZWUtdnJtLW1hdGVyaWFscy1tdG9vbi9zcmMvbm9kZXMvTVRvb25Ob2RlTWF0ZXJpYWwudHMiLCAiLi4vLi4vLi4vdGhyZWUtdnJtLW1hdGVyaWFscy1tdG9vbi9zcmMvTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUudHMiLCAiLi4vLi4vLi4vdGhyZWUtdnJtLW1hdGVyaWFscy1tdG9vbi9zcmMvbm9kZXMvbXRvb25QYXJhbWV0cmljUmltLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgKiBmcm9tICdAcGl4aXYvdGhyZWUtdnJtLW1hdGVyaWFscy1tdG9vbi9ub2Rlcyc7XG4iLCAiLy8gVGhpcyBtb2R1bGUgd2lsbCBiZSBpbXBvcnRlZCBhdCB0aGUgYmVnaW5uaW5nIG9mIGB0aHJlZS12cm0tbWF0ZXJpYWxzLW10b29uL25vZGVzYFxuLy8gSWYgdGhlIHZlcnNpb24gb2YgVGhyZWUuanMgaXMgbGVzcyB0aGFuIHIxNjcsIGl0IHdpbGwgd2FybiB0aGF0IGl0IGlzIG5vdCBzdXBwb3J0ZWRcblxuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG5jb25zdCB0aHJlZVJldmlzaW9uID0gcGFyc2VJbnQoVEhSRUUuUkVWSVNJT04sIDEwKTtcbmlmICh0aHJlZVJldmlzaW9uIDwgMTY3KSB7XG4gIGNvbnNvbGUud2FybihcbiAgICBgTVRvb25Ob2RlTWF0ZXJpYWwgcmVxdWlyZXMgVGhyZWUuanMgcjE2NyBvciBoaWdoZXIgKFlvdSBhcmUgdXNpbmcgciR7dGhyZWVSZXZpc2lvbn0pLiBUaGlzIHdvdWxkIG5vdCB3b3JrIGNvcnJlY3RseS5gLFxuICApO1xufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlL3dlYmdwdSc7XG5pbXBvcnQgeyBjb3MsIG1hdDIsIE5vZGVSZXByZXNlbnRhdGlvbiwgU2hhZGVyTm9kZU9iamVjdCwgc2luLCBTd2l6emFibGUsIHV2LCB2ZWMyLCB2ZWM0IH0gZnJvbSAndGhyZWUvdHNsJztcbmltcG9ydCB7XG4gIHJlZlVWQW5pbWF0aW9uTWFza1RleHR1cmUsXG4gIHJlZlVWQW5pbWF0aW9uUm90YXRpb25QaGFzZSxcbiAgcmVmVVZBbmltYXRpb25TY3JvbGxYT2Zmc2V0LFxuICByZWZVVkFuaW1hdGlvblNjcm9sbFlPZmZzZXQsXG59IGZyb20gJy4vbWF0ZXJpYWxSZWZlcmVuY2VzJztcblxuZXhwb3J0IGNsYXNzIE1Ub29uQW5pbWF0ZWRVVk5vZGUgZXh0ZW5kcyBUSFJFRS5UZW1wTm9kZSB7XG4gIHB1YmxpYyByZWFkb25seSBoYXNNYXNrVGV4dHVyZTogYm9vbGVhbjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoaGFzTWFza1RleHR1cmU6IGJvb2xlYW4pIHtcbiAgICBzdXBlcigndmVjMicpO1xuXG4gICAgdGhpcy5oYXNNYXNrVGV4dHVyZSA9IGhhc01hc2tUZXh0dXJlO1xuICB9XG5cbiAgcHVibGljIHNldHVwKCk6IFNoYWRlck5vZGVPYmplY3Q8VEhSRUUuVmFyTm9kZT4ge1xuICAgIGxldCB1dkFuaW1hdGlvbk1hc2s6IE5vZGVSZXByZXNlbnRhdGlvbiA9IDEuMDtcblxuICAgIGlmICh0aGlzLmhhc01hc2tUZXh0dXJlKSB7XG4gICAgICB1dkFuaW1hdGlvbk1hc2sgPSB2ZWM0KHJlZlVWQW5pbWF0aW9uTWFza1RleHR1cmUpLmNvbnRleHQoeyBnZXRVVjogKCkgPT4gdXYoKSB9KS5yO1xuICAgIH1cblxuICAgIGxldCBhbmltYXRlZFV2OiBTaGFkZXJOb2RlT2JqZWN0PFN3aXp6YWJsZT4gPSB1digpO1xuXG4gICAgLy8gcm90YXRlXG4gICAgY29uc3QgcGhhc2UgPSByZWZVVkFuaW1hdGlvblJvdGF0aW9uUGhhc2UubXVsKHV2QW5pbWF0aW9uTWFzayk7XG5cbiAgICAvLyBXT1JLQVJPVU5EOiBUSFJFRS5yb3RhdGVVViBjYXVzZXMgYW4gaXNzdWUgd2l0aCB0aGUgbWFzayB0ZXh0dXJlXG4gICAgLy8gV2UgYXJlIGdvaW5nIHRvIHNwaW4gdXNpbmcgYSAxMDAlIG9yZ2FuaWMgaGFuZG1hZGUgcm90YXRpb24gbWF0cml4XG4gICAgLy8gYW5pbWF0ZWRVdiA9IFRIUkVFLnJvdGF0ZVVWKGFuaW1hdGVkVXYsIHBoYXNlLCBUSFJFRS52ZWMyKDAuNSwgMC41KSk7XG5cbiAgICBjb25zdCBjID0gY29zKHBoYXNlKTtcbiAgICBjb25zdCBzID0gc2luKHBoYXNlKTtcbiAgICBhbmltYXRlZFV2ID0gYW5pbWF0ZWRVdi5zdWIodmVjMigwLjUsIDAuNSkpO1xuICAgIGFuaW1hdGVkVXYgPSBhbmltYXRlZFV2Lm11bChtYXQyKGMsIHMsIHMubmVnYXRlKCksIGMpKTtcbiAgICBhbmltYXRlZFV2ID0gYW5pbWF0ZWRVdi5hZGQodmVjMigwLjUsIDAuNSkpO1xuXG4gICAgLy8gc2Nyb2xsXG4gICAgY29uc3Qgc2Nyb2xsID0gdmVjMihyZWZVVkFuaW1hdGlvblNjcm9sbFhPZmZzZXQsIHJlZlVWQW5pbWF0aW9uU2Nyb2xsWU9mZnNldCkubXVsKHV2QW5pbWF0aW9uTWFzayk7XG4gICAgYW5pbWF0ZWRVdiA9IGFuaW1hdGVkVXYuYWRkKHNjcm9sbCk7XG5cbiAgICByZXR1cm4gYW5pbWF0ZWRVdi50b1ZhcignQW5pbWF0ZWRVVicpO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgbWF0ZXJpYWxSZWZlcmVuY2UgfSBmcm9tICd0aHJlZS90c2wnO1xuXG5leHBvcnQgY29uc3QgcmVmQ29sb3IgPSBtYXRlcmlhbFJlZmVyZW5jZSgnY29sb3InLCAnY29sb3InKTtcbmV4cG9ydCBjb25zdCByZWZNYXAgPSBtYXRlcmlhbFJlZmVyZW5jZSgnbWFwJywgJ3RleHR1cmUnKTtcbmV4cG9ydCBjb25zdCByZWZOb3JtYWxNYXAgPSBtYXRlcmlhbFJlZmVyZW5jZSgnbm9ybWFsTWFwJywgJ3RleHR1cmUnKTtcbmV4cG9ydCBjb25zdCByZWZOb3JtYWxTY2FsZSA9IG1hdGVyaWFsUmVmZXJlbmNlKCdub3JtYWxTY2FsZScsICd2ZWMyJyk7XG5leHBvcnQgY29uc3QgcmVmRW1pc3NpdmUgPSBtYXRlcmlhbFJlZmVyZW5jZSgnZW1pc3NpdmUnLCAnY29sb3InKTtcbmV4cG9ydCBjb25zdCByZWZFbWlzc2l2ZUludGVuc2l0eSA9IG1hdGVyaWFsUmVmZXJlbmNlKCdlbWlzc2l2ZUludGVuc2l0eScsICdmbG9hdCcpO1xuZXhwb3J0IGNvbnN0IHJlZkVtaXNzaXZlTWFwID0gbWF0ZXJpYWxSZWZlcmVuY2UoJ2VtaXNzaXZlTWFwJywgJ3RleHR1cmUnKTtcblxuZXhwb3J0IGNvbnN0IHJlZlNoYWRlQ29sb3JGYWN0b3IgPSBtYXRlcmlhbFJlZmVyZW5jZSgnc2hhZGVDb2xvckZhY3RvcicsICdjb2xvcicpO1xuZXhwb3J0IGNvbnN0IHJlZlNoYWRpbmdTaGlmdEZhY3RvciA9IG1hdGVyaWFsUmVmZXJlbmNlKCdzaGFkaW5nU2hpZnRGYWN0b3InLCAnZmxvYXQnKTtcbmV4cG9ydCBjb25zdCByZWZTaGFkZU11bHRpcGx5VGV4dHVyZSA9IG1hdGVyaWFsUmVmZXJlbmNlKCdzaGFkZU11bHRpcGx5VGV4dHVyZScsICd0ZXh0dXJlJyk7XG5leHBvcnQgY29uc3QgcmVmU2hhZGVNdWx0aXBseVRleHR1cmVTY2FsZSA9IG1hdGVyaWFsUmVmZXJlbmNlKCdzaGFkZU11bHRpcGx5VGV4dHVyZVNjYWxlJywgJ2Zsb2F0Jyk7XG5leHBvcnQgY29uc3QgcmVmU2hhZGluZ1Rvb255RmFjdG9yID0gbWF0ZXJpYWxSZWZlcmVuY2UoJ3NoYWRpbmdUb29ueUZhY3RvcicsICdmbG9hdCcpO1xuZXhwb3J0IGNvbnN0IHJlZlJpbUxpZ2h0aW5nTWl4RmFjdG9yID0gbWF0ZXJpYWxSZWZlcmVuY2UoJ3JpbUxpZ2h0aW5nTWl4RmFjdG9yJywgJ2Zsb2F0Jyk7XG5leHBvcnQgY29uc3QgcmVmUmltTXVsdGlwbHlUZXh0dXJlID0gbWF0ZXJpYWxSZWZlcmVuY2UoJ3JpbU11bHRpcGx5VGV4dHVyZScsICd0ZXh0dXJlJyk7XG5leHBvcnQgY29uc3QgcmVmTWF0Y2FwRmFjdG9yID0gbWF0ZXJpYWxSZWZlcmVuY2UoJ21hdGNhcEZhY3RvcicsICdjb2xvcicpO1xuZXhwb3J0IGNvbnN0IHJlZk1hdGNhcFRleHR1cmUgPSBtYXRlcmlhbFJlZmVyZW5jZSgnbWF0Y2FwVGV4dHVyZScsICd0ZXh0dXJlJyk7XG5leHBvcnQgY29uc3QgcmVmUGFyYW1ldHJpY1JpbUNvbG9yRmFjdG9yID0gbWF0ZXJpYWxSZWZlcmVuY2UoJ3BhcmFtZXRyaWNSaW1Db2xvckZhY3RvcicsICdjb2xvcicpO1xuZXhwb3J0IGNvbnN0IHJlZlBhcmFtZXRyaWNSaW1MaWZ0RmFjdG9yID0gbWF0ZXJpYWxSZWZlcmVuY2UoJ3BhcmFtZXRyaWNSaW1MaWZ0RmFjdG9yJywgJ2Zsb2F0Jyk7XG5leHBvcnQgY29uc3QgcmVmUGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlckZhY3RvciA9IG1hdGVyaWFsUmVmZXJlbmNlKCdwYXJhbWV0cmljUmltRnJlc25lbFBvd2VyRmFjdG9yJywgJ2Zsb2F0Jyk7XG5leHBvcnQgY29uc3QgcmVmT3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlID0gbWF0ZXJpYWxSZWZlcmVuY2UoJ291dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZScsICd0ZXh0dXJlJyk7XG5leHBvcnQgY29uc3QgcmVmT3V0bGluZVdpZHRoRmFjdG9yID0gbWF0ZXJpYWxSZWZlcmVuY2UoJ291dGxpbmVXaWR0aEZhY3RvcicsICdmbG9hdCcpO1xuZXhwb3J0IGNvbnN0IHJlZk91dGxpbmVDb2xvckZhY3RvciA9IG1hdGVyaWFsUmVmZXJlbmNlKCdvdXRsaW5lQ29sb3JGYWN0b3InLCAnY29sb3InKTtcbmV4cG9ydCBjb25zdCByZWZPdXRsaW5lTGlnaHRpbmdNaXhGYWN0b3IgPSBtYXRlcmlhbFJlZmVyZW5jZSgnb3V0bGluZUxpZ2h0aW5nTWl4RmFjdG9yJywgJ2Zsb2F0Jyk7XG5leHBvcnQgY29uc3QgcmVmVVZBbmltYXRpb25NYXNrVGV4dHVyZSA9IG1hdGVyaWFsUmVmZXJlbmNlKCd1dkFuaW1hdGlvbk1hc2tUZXh0dXJlJywgJ3RleHR1cmUnKTtcblxuZXhwb3J0IGNvbnN0IHJlZlVWQW5pbWF0aW9uU2Nyb2xsWE9mZnNldCA9IG1hdGVyaWFsUmVmZXJlbmNlKCd1dkFuaW1hdGlvblNjcm9sbFhPZmZzZXQnLCAnZmxvYXQnKTtcbmV4cG9ydCBjb25zdCByZWZVVkFuaW1hdGlvblNjcm9sbFlPZmZzZXQgPSBtYXRlcmlhbFJlZmVyZW5jZSgndXZBbmltYXRpb25TY3JvbGxZT2Zmc2V0JywgJ2Zsb2F0Jyk7XG5leHBvcnQgY29uc3QgcmVmVVZBbmltYXRpb25Sb3RhdGlvblBoYXNlID0gbWF0ZXJpYWxSZWZlcmVuY2UoJ3V2QW5pbWF0aW9uUm90YXRpb25QaGFzZScsICdmbG9hdCcpO1xuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlL3dlYmdwdSc7XG5pbXBvcnQgeyBCUkRGX0xhbWJlcnQsIGRpZmZ1c2VDb2xvciwgZmxvYXQsIG1peCwgU2hhZGVyTm9kZU9iamVjdCwgdHJhbnNmb3JtZWROb3JtYWxWaWV3LCB2ZWMzIH0gZnJvbSAndGhyZWUvdHNsJztcbmltcG9ydCB7XG4gIG1hdGNhcCxcbiAgcGFyYW1ldHJpY1JpbSxcbiAgcmltTGlnaHRpbmdNaXgsXG4gIHJpbU11bHRpcGx5LFxuICBzaGFkZUNvbG9yLFxuICBzaGFkaW5nU2hpZnQsXG4gIHNoYWRpbmdUb29ueSxcbn0gZnJvbSAnLi9pbW11dGFibGVOb2Rlcyc7XG5pbXBvcnQgeyBGbkNvbXBhdCB9IGZyb20gJy4vdXRpbHMvRm5Db21wYXQnO1xuXG4vLyBUT0RPOiAwJSBjb25maWRlbmNlIGFib3V0IGZ1bmN0aW9uIHR5cGVzLlxuXG5jb25zdCBsaW5lYXJzdGVwID0gRm5Db21wYXQoXG4gICh7XG4gICAgYSxcbiAgICBiLFxuICAgIHQsXG4gIH06IHtcbiAgICBhOiBTaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+O1xuICAgIGI6IFNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT47XG4gICAgdDogU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPjtcbiAgfSkgPT4ge1xuICAgIGNvbnN0IHRvcCA9IHQuc3ViKGEpO1xuICAgIGNvbnN0IGJvdHRvbSA9IGIuc3ViKGEpO1xuICAgIHJldHVybiB0b3AuZGl2KGJvdHRvbSkuY2xhbXAoKTtcbiAgfSxcbik7XG5cbi8qKlxuICogQ29udmVydCBOZG90TCBpbnRvIHRvb24gc2hhZGluZyBmYWN0b3IgdXNpbmcgc2hhZGluZ1NoaWZ0IGFuZCBzaGFkaW5nVG9vbnlcbiAqL1xuY29uc3QgZ2V0U2hhZGluZyA9IEZuQ29tcGF0KCh7IGRvdE5MIH06IHsgZG90Tkw6IFNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT4gfSkgPT4ge1xuICBjb25zdCBzaGFkb3cgPSAxLjA7IC8vIFRPRE9cblxuICBjb25zdCBmZWF0aGVyID0gZmxvYXQoMS4wKS5zdWIoc2hhZGluZ1Rvb255KTtcblxuICBsZXQgc2hhZGluZzogU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPiA9IGRvdE5MLmFkZChzaGFkaW5nU2hpZnQpO1xuICBzaGFkaW5nID0gbGluZWFyc3RlcCh7XG4gICAgYTogZmVhdGhlci5uZWdhdGUoKSxcbiAgICBiOiBmZWF0aGVyLFxuICAgIHQ6IHNoYWRpbmcsXG4gIH0pO1xuICBzaGFkaW5nID0gc2hhZGluZy5tdWwoc2hhZG93KTtcbiAgcmV0dXJuIHNoYWRpbmc7XG59KTtcblxuLyoqXG4gKiBNaXggZGlmZnVzZUNvbG9yIGFuZCBzaGFkZUNvbG9yIHVzaW5nIHNoYWRpbmcgZmFjdG9yIGFuZCBsaWdodCBjb2xvclxuICovXG5jb25zdCBnZXREaWZmdXNlID0gRm5Db21wYXQoXG4gICh7IHNoYWRpbmcsIGxpZ2h0Q29sb3IgfTogeyBzaGFkaW5nOiBTaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+OyBsaWdodENvbG9yOiBTaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+IH0pID0+IHtcbiAgICBjb25zdCBmZWF0aGVyZWQgPSBtaXgoc2hhZGVDb2xvciwgZGlmZnVzZUNvbG9yLCBzaGFkaW5nKTtcbiAgICBjb25zdCBjb2wgPSBsaWdodENvbG9yLm11bChCUkRGX0xhbWJlcnQoeyBkaWZmdXNlQ29sb3I6IGZlYXRoZXJlZCB9KSk7XG5cbiAgICByZXR1cm4gY29sO1xuICB9LFxuKTtcblxuZXhwb3J0IGNsYXNzIE1Ub29uTGlnaHRpbmdNb2RlbCBleHRlbmRzIFRIUkVFLkxpZ2h0aW5nTW9kZWwge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgZGlyZWN0KHtcbiAgICBsaWdodERpcmVjdGlvbixcbiAgICBsaWdodENvbG9yLFxuICAgIHJlZmxlY3RlZExpZ2h0LFxuICB9OiBUSFJFRS5MaWdodGluZ01vZGVsRGlyZWN0SW5wdXQgJiB7IGxpZ2h0RGlyZWN0aW9uOiBUSFJFRS5Ob2RlOyBsaWdodENvbG9yOiBUSFJFRS5Ob2RlIH0pIHtcbiAgICBjb25zdCBkb3ROTCA9IHRyYW5zZm9ybWVkTm9ybWFsVmlldy5kb3QobGlnaHREaXJlY3Rpb24pLmNsYW1wKC0xLjAsIDEuMCk7XG5cbiAgICAvLyB0b29uIGRpZmZ1c2VcbiAgICBjb25zdCBzaGFkaW5nID0gZ2V0U2hhZGluZyh7XG4gICAgICBkb3ROTCxcbiAgICB9KTtcblxuICAgIChyZWZsZWN0ZWRMaWdodC5kaXJlY3REaWZmdXNlIGFzIFNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT4pLmFkZEFzc2lnbihcbiAgICAgIGdldERpZmZ1c2Uoe1xuICAgICAgICBzaGFkaW5nLFxuICAgICAgICBsaWdodENvbG9yOiBsaWdodENvbG9yIGFzIFNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT4sXG4gICAgICB9KSxcbiAgICApO1xuXG4gICAgLy8gcmltXG4gICAgKHJlZmxlY3RlZExpZ2h0LmRpcmVjdFNwZWN1bGFyIGFzIFNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT4pLmFkZEFzc2lnbihcbiAgICAgIHBhcmFtZXRyaWNSaW1cbiAgICAgICAgLmFkZChtYXRjYXApXG4gICAgICAgIC5tdWwocmltTXVsdGlwbHkpXG4gICAgICAgIC5tdWwobWl4KHZlYzMoMC4wKSwgQlJERl9MYW1iZXJ0KHsgZGlmZnVzZUNvbG9yOiBsaWdodENvbG9yIH0pLCByaW1MaWdodGluZ01peCkpLFxuICAgICk7XG4gIH1cblxuICAvLyBDT01QQVQ6IHByZS1yMTc0XG4gIC8vIGBidWlsZGVyT3JDb250ZXh0YDogYFRIUkVFLk5vZGVCdWlsZGVyYCBpbiA+PSByMTc0LCBgTGlnaHRpbmdNb2RlbEluZGlyZWN0SW5wdXRgIChgTGlnaHRpbmdDb250ZXh0YCkgb3RoZXJ3aXNlXG4gIGluZGlyZWN0KGJ1aWxkZXJPckNvbnRleHQ6IFRIUkVFLk5vZGVCdWlsZGVyIHwgVEhSRUUuTGlnaHRpbmdDb250ZXh0KSB7XG4gICAgY29uc3QgY29udGV4dDogVEhSRUUuTGlnaHRpbmdDb250ZXh0ID1cbiAgICAgICdjb250ZXh0JyBpbiBidWlsZGVyT3JDb250ZXh0ID8gKGJ1aWxkZXJPckNvbnRleHQuY29udGV4dCBhcyB1bmtub3duIGFzIFRIUkVFLkxpZ2h0aW5nQ29udGV4dCkgOiBidWlsZGVyT3JDb250ZXh0O1xuXG4gICAgdGhpcy5pbmRpcmVjdERpZmZ1c2UoY29udGV4dCk7XG4gICAgdGhpcy5pbmRpcmVjdFNwZWN1bGFyKGNvbnRleHQpO1xuICB9XG5cbiAgaW5kaXJlY3REaWZmdXNlKGNvbnRleHQ6IFRIUkVFLkxpZ2h0aW5nQ29udGV4dCkge1xuICAgIGNvbnN0IHsgaXJyYWRpYW5jZSwgcmVmbGVjdGVkTGlnaHQgfSA9IGNvbnRleHQ7XG5cbiAgICAvLyBpbmRpcmVjdCBpcnJhZGlhbmNlXG4gICAgKHJlZmxlY3RlZExpZ2h0LmluZGlyZWN0RGlmZnVzZSBhcyBTaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+KS5hZGRBc3NpZ24oXG4gICAgICAoaXJyYWRpYW5jZSBhcyBTaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+KS5tdWwoQlJERl9MYW1iZXJ0KHsgZGlmZnVzZUNvbG9yIH0pKSxcbiAgICApO1xuICB9XG5cbiAgaW5kaXJlY3RTcGVjdWxhcihjb250ZXh0OiBUSFJFRS5MaWdodGluZ0NvbnRleHQpIHtcbiAgICBjb25zdCB7IHJlZmxlY3RlZExpZ2h0IH0gPSBjb250ZXh0O1xuXG4gICAgLy8gcmltXG4gICAgKHJlZmxlY3RlZExpZ2h0LmluZGlyZWN0U3BlY3VsYXIgYXMgU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPikuYWRkQXNzaWduKFxuICAgICAgcGFyYW1ldHJpY1JpbVxuICAgICAgICAuYWRkKG1hdGNhcClcbiAgICAgICAgLm11bChyaW1NdWx0aXBseSlcbiAgICAgICAgLm11bChtaXgodmVjMygxLjApLCB2ZWMzKDAuMCksIHJpbUxpZ2h0aW5nTWl4KSksXG4gICAgKTtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlL3dlYmdwdSc7XG5pbXBvcnQgeyBub2RlSW1tdXRhYmxlIH0gZnJvbSAndGhyZWUvdHNsJztcblxuZXhwb3J0IGNvbnN0IHNoYWRlQ29sb3IgPSBub2RlSW1tdXRhYmxlKFRIUkVFLlByb3BlcnR5Tm9kZSwgJ3ZlYzMnKS50b1ZhcignU2hhZGVDb2xvcicpO1xuZXhwb3J0IGNvbnN0IHNoYWRpbmdTaGlmdCA9IG5vZGVJbW11dGFibGUoVEhSRUUuUHJvcGVydHlOb2RlLCAnZmxvYXQnKS50b1ZhcignU2hhZGluZ1NoaWZ0Jyk7XG5leHBvcnQgY29uc3Qgc2hhZGluZ1Rvb255ID0gbm9kZUltbXV0YWJsZShUSFJFRS5Qcm9wZXJ0eU5vZGUsICdmbG9hdCcpLnRvVmFyKCdTaGFkaW5nVG9vbnknKTtcbmV4cG9ydCBjb25zdCByaW1MaWdodGluZ01peCA9IG5vZGVJbW11dGFibGUoVEhSRUUuUHJvcGVydHlOb2RlLCAnZmxvYXQnKS50b1ZhcignUmltTGlnaHRpbmdNaXgnKTtcbmV4cG9ydCBjb25zdCByaW1NdWx0aXBseSA9IG5vZGVJbW11dGFibGUoVEhSRUUuUHJvcGVydHlOb2RlLCAndmVjMycpLnRvVmFyKCdSaW1NdWx0aXBseScpO1xuZXhwb3J0IGNvbnN0IG1hdGNhcCA9IG5vZGVJbW11dGFibGUoVEhSRUUuUHJvcGVydHlOb2RlLCAndmVjMycpLnRvVmFyKCdtYXRjYXAnKTtcbmV4cG9ydCBjb25zdCBwYXJhbWV0cmljUmltID0gbm9kZUltbXV0YWJsZShUSFJFRS5Qcm9wZXJ0eU5vZGUsICd2ZWMzJykudG9WYXIoJ1BhcmFtZXRyaWNSaW0nKTtcbiIsICJpbXBvcnQgKiBhcyBUSFJFRV9UU0wgZnJvbSAndGhyZWUvdHNsJztcbmltcG9ydCAqIGFzIFRIUkVFX1dFQkdQVSBmcm9tICd0aHJlZS93ZWJncHUnO1xuXG4vKipcbiAqIEEgY29tcGF0IGZ1bmN0aW9uIGZvciBgRm4oKWAgLyBgdHNsRm4oKWAuXG4gKiBgdHNsRm4oKWAgaGFzIGJlZW4gcmVuYW1lZCB0byBgRm4oKWAgaW4gcjE2OC5cbiAqIFdlIGFyZSBnb2luZyB0byB1c2UgdGhpcyBjb21wYXQgZm9yIGEgd2hpbGUuXG4gKlxuICogU2VlOiBodHRwczovL2dpdGh1Yi5jb20vbXJkb29iL3RocmVlLmpzL3B1bGwvMjkwNjRcbiAqL1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNvbnN0IEZuQ29tcGF0OiB0eXBlb2YgVEhSRUVfVFNMLkZuID0gKGpzRnVuYzogYW55KSA9PiB7XG4gIC8vIENPTVBBVCByMTY4OiBgdHNsRm4oKWAgaGFzIGJlZW4gcmVuYW1lZCB0byBgRm4oKWBcbiAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vbXJkb29iL3RocmVlLmpzL3B1bGwvMjkwNjRcbiAgY29uc3QgdGhyZWVSZXZpc2lvbiA9IHBhcnNlSW50KFRIUkVFX1dFQkdQVS5SRVZJU0lPTiwgMTApO1xuICBpZiAodGhyZWVSZXZpc2lvbiA+PSAxNjgpIHtcbiAgICByZXR1cm4gKFRIUkVFX1RTTCBhcyBhbnkpLkZuKGpzRnVuYyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIChUSFJFRV9XRUJHUFUgYXMgYW55KS50c2xGbihqc0Z1bmMpO1xuICB9XG59O1xuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlL3dlYmdwdSc7XG5pbXBvcnQge1xuICBjYW1lcmFQcm9qZWN0aW9uTWF0cml4LFxuICBkaWZmdXNlQ29sb3IsXG4gIGZsb2F0LFxuICBsZW5ndGgsXG4gIG1hdGNhcFVWLFxuICBtYXRlcmlhbE5vcm1hbCxcbiAgbWl4LFxuICBtb2RlbE5vcm1hbE1hdHJpeCxcbiAgbW9kZWxWaWV3TWF0cml4LFxuICBub3JtYWxMb2NhbCxcbiAgbm9ybWFsTWFwLFxuICBwb3NpdGlvbkxvY2FsLFxuICBwb3NpdGlvblZpZXcsXG4gIFNoYWRlck5vZGVPYmplY3QsXG4gIFN3aXp6YWJsZSxcbiAgdmVjMyxcbiAgdmVjNCxcbn0gZnJvbSAndGhyZWUvdHNsJztcblxuaW1wb3J0IHR5cGUgeyBNVG9vbk1hdGVyaWFsIH0gZnJvbSAnLi4vTVRvb25NYXRlcmlhbCc7XG5pbXBvcnQgeyBNVG9vbkxpZ2h0aW5nTW9kZWwgfSBmcm9tICcuL01Ub29uTGlnaHRpbmdNb2RlbCc7XG5pbXBvcnQge1xuICByaW1MaWdodGluZ01peCxcbiAgbWF0Y2FwLFxuICBzaGFkZUNvbG9yLFxuICBzaGFkaW5nU2hpZnQsXG4gIHNoYWRpbmdUb29ueSxcbiAgcmltTXVsdGlwbHksXG4gIHBhcmFtZXRyaWNSaW0sXG59IGZyb20gJy4vaW1tdXRhYmxlTm9kZXMnO1xuaW1wb3J0IHtcbiAgcmVmQ29sb3IsXG4gIHJlZkVtaXNzaXZlLFxuICByZWZFbWlzc2l2ZUludGVuc2l0eSxcbiAgcmVmRW1pc3NpdmVNYXAsXG4gIHJlZk1hcCxcbiAgcmVmTWF0Y2FwRmFjdG9yLFxuICByZWZNYXRjYXBUZXh0dXJlLFxuICByZWZOb3JtYWxNYXAsXG4gIHJlZk5vcm1hbFNjYWxlLFxuICByZWZPdXRsaW5lQ29sb3JGYWN0b3IsXG4gIHJlZk91dGxpbmVMaWdodGluZ01peEZhY3RvcixcbiAgcmVmT3V0bGluZVdpZHRoRmFjdG9yLFxuICByZWZPdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmUsXG4gIHJlZlBhcmFtZXRyaWNSaW1Db2xvckZhY3RvcixcbiAgcmVmUGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlckZhY3RvcixcbiAgcmVmUGFyYW1ldHJpY1JpbUxpZnRGYWN0b3IsXG4gIHJlZlJpbUxpZ2h0aW5nTWl4RmFjdG9yLFxuICByZWZSaW1NdWx0aXBseVRleHR1cmUsXG4gIHJlZlNoYWRlQ29sb3JGYWN0b3IsXG4gIHJlZlNoYWRlTXVsdGlwbHlUZXh0dXJlLFxuICByZWZTaGFkZU11bHRpcGx5VGV4dHVyZVNjYWxlLFxuICByZWZTaGFkaW5nU2hpZnRGYWN0b3IsXG4gIHJlZlNoYWRpbmdUb29ueUZhY3Rvcixcbn0gZnJvbSAnLi9tYXRlcmlhbFJlZmVyZW5jZXMnO1xuaW1wb3J0IHsgTVRvb25BbmltYXRlZFVWTm9kZSB9IGZyb20gJy4vTVRvb25BbmltYXRlZFVWTm9kZSc7XG5pbXBvcnQgeyBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZSB9IGZyb20gJy4uL01Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlJztcbmltcG9ydCB7IE1Ub29uTm9kZU1hdGVyaWFsUGFyYW1ldGVycyB9IGZyb20gJy4vTVRvb25Ob2RlTWF0ZXJpYWxQYXJhbWV0ZXJzJztcbmltcG9ydCB7IG10b29uUGFyYW1ldHJpY1JpbSB9IGZyb20gJy4vbXRvb25QYXJhbWV0cmljUmltJztcblxuLyoqXG4gKiBNVG9vbiBpcyBhIG1hdGVyaWFsIHNwZWNpZmljYXRpb24gdGhhdCBoYXMgdmFyaW91cyBmZWF0dXJlcy5cbiAqIFRoZSBzcGVjIGFuZCBpbXBsZW1lbnRhdGlvbiBhcmUgb3JpZ2luYWxseSBmb3VuZGVkIGZvciBVbml0eSBlbmdpbmUgYW5kIHRoaXMgaXMgYSBwb3J0IG9mIHRoZSBtYXRlcmlhbC5cbiAqXG4gKiBUaGlzIG1hdGVyaWFsIGlzIGEgTm9kZU1hdGVyaWFsIHZhcmlhbnQgb2Yge0BsaW5rIE1Ub29uTWF0ZXJpYWx9LlxuICpcbiAqIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL1NhbnRhcmgvTVRvb25cbiAqL1xuZXhwb3J0IGNsYXNzIE1Ub29uTm9kZU1hdGVyaWFsIGV4dGVuZHMgVEhSRUUuTm9kZU1hdGVyaWFsIHtcbiAgcHVibGljIGVtaXNzaXZlTm9kZTogU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPiB8IG51bGw7XG5cbiAgcHVibGljIGNvbG9yOiBUSFJFRS5Db2xvcjtcbiAgcHVibGljIG1hcDogVEhSRUUuVGV4dHVyZSB8IG51bGw7XG4gIHB1YmxpYyBlbWlzc2l2ZTogVEhSRUUuQ29sb3I7XG4gIHB1YmxpYyBlbWlzc2l2ZUludGVuc2l0eTogbnVtYmVyO1xuICBwdWJsaWMgZW1pc3NpdmVNYXA6IFRIUkVFLlRleHR1cmUgfCBudWxsO1xuICBwdWJsaWMgbm9ybWFsTWFwOiBUSFJFRS5UZXh0dXJlIHwgbnVsbDtcbiAgcHVibGljIG5vcm1hbFNjYWxlOiBUSFJFRS5WZWN0b3IyO1xuXG4gIHB1YmxpYyBzaGFkZUNvbG9yRmFjdG9yOiBUSFJFRS5Db2xvcjtcbiAgcHVibGljIHNoYWRlTXVsdGlwbHlUZXh0dXJlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbDtcbiAgcHVibGljIHNoYWRpbmdTaGlmdEZhY3RvcjogbnVtYmVyO1xuICBwdWJsaWMgc2hhZGluZ1NoaWZ0VGV4dHVyZTogVEhSRUUuVGV4dHVyZSB8IG51bGw7XG4gIHB1YmxpYyBzaGFkaW5nU2hpZnRUZXh0dXJlU2NhbGU6IG51bWJlcjtcbiAgcHVibGljIHNoYWRpbmdUb29ueUZhY3RvcjogbnVtYmVyO1xuICBwdWJsaWMgcmltTGlnaHRpbmdNaXhGYWN0b3I6IG51bWJlcjtcbiAgcHVibGljIHJpbU11bHRpcGx5VGV4dHVyZTogVEhSRUUuVGV4dHVyZSB8IG51bGw7XG4gIHB1YmxpYyBtYXRjYXBGYWN0b3I6IFRIUkVFLkNvbG9yO1xuICBwdWJsaWMgbWF0Y2FwVGV4dHVyZTogVEhSRUUuVGV4dHVyZSB8IG51bGw7XG4gIHB1YmxpYyBwYXJhbWV0cmljUmltQ29sb3JGYWN0b3I6IFRIUkVFLkNvbG9yO1xuICBwdWJsaWMgcGFyYW1ldHJpY1JpbUxpZnRGYWN0b3I6IG51bWJlcjtcbiAgcHVibGljIHBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJGYWN0b3I6IG51bWJlcjtcbiAgcHVibGljIG91dGxpbmVXaWR0aE1vZGU6IE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlO1xuICBwdWJsaWMgb3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbDtcbiAgcHVibGljIG91dGxpbmVXaWR0aEZhY3RvcjogbnVtYmVyO1xuICBwdWJsaWMgb3V0bGluZUNvbG9yRmFjdG9yOiBUSFJFRS5Db2xvcjtcbiAgcHVibGljIG91dGxpbmVMaWdodGluZ01peEZhY3RvcjogbnVtYmVyO1xuICBwdWJsaWMgdXZBbmltYXRpb25TY3JvbGxYU3BlZWRGYWN0b3I6IG51bWJlcjtcbiAgcHVibGljIHV2QW5pbWF0aW9uU2Nyb2xsWVNwZWVkRmFjdG9yOiBudW1iZXI7XG4gIHB1YmxpYyB1dkFuaW1hdGlvblJvdGF0aW9uU3BlZWRGYWN0b3I6IG51bWJlcjtcbiAgcHVibGljIHV2QW5pbWF0aW9uTWFza1RleHR1cmU6IFRIUkVFLlRleHR1cmUgfCBudWxsO1xuXG4gIHB1YmxpYyBzaGFkZUNvbG9yTm9kZTogU3dpenphYmxlIHwgbnVsbDtcbiAgcHVibGljIHNoYWRpbmdTaGlmdE5vZGU6IFRIUkVFLk5vZGUgfCBudWxsO1xuICBwdWJsaWMgc2hhZGluZ1Rvb255Tm9kZTogVEhSRUUuTm9kZSB8IG51bGw7XG4gIHB1YmxpYyByaW1MaWdodGluZ01peE5vZGU6IFRIUkVFLk5vZGUgfCBudWxsO1xuICBwdWJsaWMgcmltTXVsdGlwbHlOb2RlOiBUSFJFRS5Ob2RlIHwgbnVsbDtcbiAgcHVibGljIG1hdGNhcE5vZGU6IFRIUkVFLk5vZGUgfCBudWxsO1xuICBwdWJsaWMgcGFyYW1ldHJpY1JpbUNvbG9yTm9kZTogU3dpenphYmxlIHwgbnVsbDtcbiAgcHVibGljIHBhcmFtZXRyaWNSaW1MaWZ0Tm9kZTogVEhSRUUuTm9kZSB8IG51bGw7XG4gIHB1YmxpYyBwYXJhbWV0cmljUmltRnJlc25lbFBvd2VyTm9kZTogVEhSRUUuTm9kZSB8IG51bGw7XG5cbiAgcHVibGljIHV2QW5pbWF0aW9uU2Nyb2xsWE9mZnNldDogbnVtYmVyO1xuICBwdWJsaWMgdXZBbmltYXRpb25TY3JvbGxZT2Zmc2V0OiBudW1iZXI7XG4gIHB1YmxpYyB1dkFuaW1hdGlvblJvdGF0aW9uUGhhc2U6IG51bWJlcjtcblxuICBwdWJsaWMgaXNPdXRsaW5lOiBib29sZWFuO1xuXG4gIHByaXZhdGUgX2FuaW1hdGVkVVZOb2RlOiBNVG9vbkFuaW1hdGVkVVZOb2RlIHwgbnVsbDtcblxuICBwdWJsaWMgY3VzdG9tUHJvZ3JhbUNhY2hlS2V5KCk6IHN0cmluZyB7XG4gICAgbGV0IGNhY2hlS2V5ID0gc3VwZXIuY3VzdG9tUHJvZ3JhbUNhY2hlS2V5KCk7XG5cbiAgICBjYWNoZUtleSArPSBgaXNPdXRsaW5lOiR7dGhpcy5pc091dGxpbmV9LGA7XG5cbiAgICByZXR1cm4gY2FjaGVLZXk7XG4gIH1cblxuICAvKipcbiAgICogUmVhZG9ubHkgYm9vbGVhbiB0aGF0IGluZGljYXRlcyB0aGlzIGlzIGEge0BsaW5rIE1Ub29uTm9kZU1hdGVyaWFsfS5cbiAgICovXG4gIHB1YmxpYyBnZXQgaXNNVG9vbk5vZGVNYXRlcmlhbCgpOiB0cnVlIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJhbWV0ZXJzOiBNVG9vbk5vZGVNYXRlcmlhbFBhcmFtZXRlcnMgPSB7fSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICBpZiAocGFyYW1ldGVycy50cmFuc3BhcmVudFdpdGhaV3JpdGUpIHtcbiAgICAgIHBhcmFtZXRlcnMuZGVwdGhXcml0ZSA9IHRydWU7XG4gICAgfVxuICAgIGRlbGV0ZSBwYXJhbWV0ZXJzLnRyYW5zcGFyZW50V2l0aFpXcml0ZTtcblxuICAgIC8vIGBNVG9vbk1hdGVyaWFsTG9hZGVyUGx1Z2luYCBhc3NpZ25zIHRoZXNlIHBhcmFtZXRlcnMgdG8gdGhlIG1hdGVyaWFsXG4gICAgLy8gSG93ZXZlciwgYE1Ub29uTm9kZU1hdGVyaWFsYCBkb2VzIG5vdCBzdXBwb3J0IHRoZXNlIHBhcmFtZXRlcnNcbiAgICAvLyBzbyB3ZSBkZWxldGUgdGhlbSBoZXJlIHRvIHN1cHByZXNzIHdhcm5pbmdzXG4gICAgZGVsZXRlIChwYXJhbWV0ZXJzIGFzIGFueSkuZ2lFcXVhbGl6YXRpb25GYWN0b3I7XG4gICAgZGVsZXRlIChwYXJhbWV0ZXJzIGFzIGFueSkudjBDb21wYXRTaGFkZTtcbiAgICBkZWxldGUgKHBhcmFtZXRlcnMgYXMgYW55KS5kZWJ1Z01vZGU7XG5cbiAgICB0aGlzLmVtaXNzaXZlTm9kZSA9IG51bGw7XG5cbiAgICB0aGlzLmxpZ2h0cyA9IHRydWU7XG5cbiAgICB0aGlzLmNvbG9yID0gbmV3IFRIUkVFLkNvbG9yKDEuMCwgMS4wLCAxLjApO1xuICAgIHRoaXMubWFwID0gbnVsbDtcbiAgICB0aGlzLmVtaXNzaXZlID0gbmV3IFRIUkVFLkNvbG9yKDAuMCwgMC4wLCAwLjApO1xuICAgIHRoaXMuZW1pc3NpdmVJbnRlbnNpdHkgPSAxLjA7XG4gICAgdGhpcy5lbWlzc2l2ZU1hcCA9IG51bGw7XG4gICAgdGhpcy5ub3JtYWxNYXAgPSBudWxsO1xuICAgIHRoaXMubm9ybWFsU2NhbGUgPSBuZXcgVEhSRUUuVmVjdG9yMigxLjAsIDEuMCk7XG4gICAgdGhpcy5zaGFkZUNvbG9yRmFjdG9yID0gbmV3IFRIUkVFLkNvbG9yKDAuMCwgMC4wLCAwLjApO1xuICAgIHRoaXMuc2hhZGVNdWx0aXBseVRleHR1cmUgPSBudWxsO1xuICAgIHRoaXMuc2hhZGluZ1NoaWZ0RmFjdG9yID0gMC4wO1xuICAgIHRoaXMuc2hhZGluZ1NoaWZ0VGV4dHVyZSA9IG51bGw7XG4gICAgdGhpcy5zaGFkaW5nU2hpZnRUZXh0dXJlU2NhbGUgPSAxLjA7XG4gICAgdGhpcy5zaGFkaW5nVG9vbnlGYWN0b3IgPSAwLjk7XG4gICAgdGhpcy5yaW1MaWdodGluZ01peEZhY3RvciA9IDEuMDtcbiAgICB0aGlzLnJpbU11bHRpcGx5VGV4dHVyZSA9IG51bGw7XG4gICAgdGhpcy5tYXRjYXBGYWN0b3IgPSBuZXcgVEhSRUUuQ29sb3IoMS4wLCAxLjAsIDEuMCk7XG4gICAgdGhpcy5tYXRjYXBUZXh0dXJlID0gbnVsbDtcbiAgICB0aGlzLnBhcmFtZXRyaWNSaW1Db2xvckZhY3RvciA9IG5ldyBUSFJFRS5Db2xvcigwLjAsIDAuMCwgMC4wKTtcbiAgICB0aGlzLnBhcmFtZXRyaWNSaW1MaWZ0RmFjdG9yID0gMC4wO1xuICAgIHRoaXMucGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlckZhY3RvciA9IDUuMDtcbiAgICB0aGlzLm91dGxpbmVXaWR0aE1vZGUgPSBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZS5Ob25lO1xuICAgIHRoaXMub3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlID0gbnVsbDtcbiAgICB0aGlzLm91dGxpbmVXaWR0aEZhY3RvciA9IDAuMDtcbiAgICB0aGlzLm91dGxpbmVDb2xvckZhY3RvciA9IG5ldyBUSFJFRS5Db2xvcigwLjAsIDAuMCwgMC4wKTtcbiAgICB0aGlzLm91dGxpbmVMaWdodGluZ01peEZhY3RvciA9IDEuMDtcbiAgICB0aGlzLnV2QW5pbWF0aW9uU2Nyb2xsWFNwZWVkRmFjdG9yID0gMC4wO1xuICAgIHRoaXMudXZBbmltYXRpb25TY3JvbGxZU3BlZWRGYWN0b3IgPSAwLjA7XG4gICAgdGhpcy51dkFuaW1hdGlvblJvdGF0aW9uU3BlZWRGYWN0b3IgPSAwLjA7XG4gICAgdGhpcy51dkFuaW1hdGlvbk1hc2tUZXh0dXJlID0gbnVsbDtcblxuICAgIHRoaXMuc2hhZGVDb2xvck5vZGUgPSBudWxsO1xuICAgIHRoaXMuc2hhZGluZ1NoaWZ0Tm9kZSA9IG51bGw7XG4gICAgdGhpcy5zaGFkaW5nVG9vbnlOb2RlID0gbnVsbDtcbiAgICB0aGlzLnJpbUxpZ2h0aW5nTWl4Tm9kZSA9IG51bGw7XG4gICAgdGhpcy5yaW1NdWx0aXBseU5vZGUgPSBudWxsO1xuICAgIHRoaXMubWF0Y2FwTm9kZSA9IG51bGw7XG4gICAgdGhpcy5wYXJhbWV0cmljUmltQ29sb3JOb2RlID0gbnVsbDtcbiAgICB0aGlzLnBhcmFtZXRyaWNSaW1MaWZ0Tm9kZSA9IG51bGw7XG4gICAgdGhpcy5wYXJhbWV0cmljUmltRnJlc25lbFBvd2VyTm9kZSA9IG51bGw7XG5cbiAgICB0aGlzLnV2QW5pbWF0aW9uU2Nyb2xsWE9mZnNldCA9IDAuMDtcbiAgICB0aGlzLnV2QW5pbWF0aW9uU2Nyb2xsWU9mZnNldCA9IDAuMDtcbiAgICB0aGlzLnV2QW5pbWF0aW9uUm90YXRpb25QaGFzZSA9IDAuMDtcblxuICAgIHRoaXMuaXNPdXRsaW5lID0gZmFsc2U7XG5cbiAgICB0aGlzLl9hbmltYXRlZFVWTm9kZSA9IG51bGw7XG5cbiAgICB0aGlzLnNldFZhbHVlcyhwYXJhbWV0ZXJzKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXR1cExpZ2h0aW5nTW9kZWwoLypidWlsZGVyKi8pOiBNVG9vbkxpZ2h0aW5nTW9kZWwge1xuICAgIHJldHVybiBuZXcgTVRvb25MaWdodGluZ01vZGVsKCk7XG4gIH1cblxuICBwdWJsaWMgc2V0dXAoYnVpbGRlcjogVEhSRUUuTm9kZUJ1aWxkZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9hbmltYXRlZFVWTm9kZSA9IG5ldyBNVG9vbkFuaW1hdGVkVVZOb2RlKFxuICAgICAgKHRoaXMudXZBbmltYXRpb25NYXNrVGV4dHVyZSAmJiB0aGlzLnV2QW5pbWF0aW9uTWFza1RleHR1cmUuaXNUZXh0dXJlID09PSB0cnVlKSA/PyBmYWxzZSxcbiAgICApO1xuXG4gICAgc3VwZXIuc2V0dXAoYnVpbGRlcik7XG4gIH1cblxuICBwdWJsaWMgc2V0dXBEaWZmdXNlQ29sb3IoYnVpbGRlcjogVEhSRUUuTm9kZUJ1aWxkZXIpOiB2b2lkIHtcbiAgICAvLyB3ZSBtdXN0IGFwcGx5IHV2IHNjcm9sbCB0byB0aGUgbWFwXG4gICAgLy8gdGhpcy5jb2xvck5vZGUgd2lsbCBiZSB1c2VkIGluIHN1cGVyLnNldHVwRGlmZnVzZUNvbG9yKCkgc28gd2UgdGVtcG9yYXJpbHkgcmVwbGFjZSBpdFxuICAgIGxldCB0ZW1wQ29sb3JOb2RlOiBTaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+IHwgbnVsbCA9IG51bGw7XG5cbiAgICBpZiAodGhpcy5jb2xvck5vZGUgPT0gbnVsbCkge1xuICAgICAgdGVtcENvbG9yTm9kZSA9IHJlZkNvbG9yO1xuXG4gICAgICBpZiAodGhpcy5tYXAgJiYgdGhpcy5tYXAuaXNUZXh0dXJlID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IG1hcCA9IHJlZk1hcC5jb250ZXh0KHsgZ2V0VVY6ICgpID0+IHRoaXMuX2FuaW1hdGVkVVZOb2RlIH0pO1xuICAgICAgICB0ZW1wQ29sb3JOb2RlID0gdGVtcENvbG9yTm9kZS5tdWwobWFwKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jb2xvck5vZGUgPSB0ZW1wQ29sb3JOb2RlO1xuICAgIH1cblxuICAgIC8vIE1Ub29uIG11c3QgaWdub3JlIHZlcnRleCBjb2xvciBieSBzcGVjXG4gICAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vdnJtLWMvdnJtLXNwZWNpZmljYXRpb24vYmxvYi80MmMwYTkwZTZiNGI3MTAzNTI1Njk5NzhmMTQ5ODBlOWZjOTRiMjVkL3NwZWNpZmljYXRpb24vVlJNQ19tYXRlcmlhbHNfbXRvb24tMS4wL1JFQURNRS5tZCN2ZXJ0ZXgtY29sb3JzXG4gICAgaWYgKHRoaXMudmVydGV4Q29sb3JzID09PSB0cnVlICYmIGJ1aWxkZXIuZ2VvbWV0cnkuaGFzQXR0cmlidXRlKCdjb2xvcicpKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICdNVG9vbk5vZGVNYXRlcmlhbDogTVRvb24gaWdub3JlcyB2ZXJ0ZXggY29sb3JzLiBDb25zaWRlciB1c2luZyBhIG1vZGVsIHdpdGhvdXQgdmVydGV4IGNvbG9ycyBpbnN0ZWFkLicsXG4gICAgICApO1xuICAgICAgdGhpcy52ZXJ0ZXhDb2xvcnMgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyB0aGUgb3JkaW5hcnkgZGlmZnVzZUNvbG9yIHNldHVwXG4gICAgc3VwZXIuc2V0dXBEaWZmdXNlQ29sb3IoYnVpbGRlcik7XG5cbiAgICAvLyBDT01QQVQ6IHByZS1yMTY2XG4gICAgLy8gU2V0IGFscGhhIHRvIDEgaWYgaXQgaXMgb3BhcXVlXG4gICAgLy8gQWRkcmVzc2VkIGluIFRocmVlLmpzIHIxNjYgYnV0IHdlIGxlYXZlIGl0IGhlcmUgZm9yIGNvbXBhdGliaWxpdHlcbiAgICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvcHVsbC8yODY0NlxuICAgIGlmIChwYXJzZUludChUSFJFRS5SRVZJU0lPTiwgMTApIDwgMTY2KSB7XG4gICAgICBpZiAodGhpcy50cmFuc3BhcmVudCA9PT0gZmFsc2UgJiYgdGhpcy5ibGVuZGluZyA9PT0gVEhSRUUuTm9ybWFsQmxlbmRpbmcgJiYgdGhpcy5hbHBoYVRvQ292ZXJhZ2UgPT09IGZhbHNlKSB7XG4gICAgICAgIGRpZmZ1c2VDb2xvci5hLmFzc2lnbigxLjApO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHJldmVydCB0aGUgY29sb3JOb2RlXG4gICAgaWYgKHRoaXMuY29sb3JOb2RlID09PSB0ZW1wQ29sb3JOb2RlKSB7XG4gICAgICB0aGlzLmNvbG9yTm9kZSA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldHVwVmFyaWFudHMoKTogdm9pZCB7XG4gICAgc2hhZGVDb2xvci5hc3NpZ24odGhpcy5fc2V0dXBTaGFkZUNvbG9yTm9kZSgpKTtcbiAgICBzaGFkaW5nU2hpZnQuYXNzaWduKHRoaXMuX3NldHVwU2hhZGluZ1NoaWZ0Tm9kZSgpKTtcbiAgICBzaGFkaW5nVG9vbnkuYXNzaWduKHRoaXMuX3NldHVwU2hhZGluZ1Rvb255Tm9kZSgpKTtcbiAgICByaW1MaWdodGluZ01peC5hc3NpZ24odGhpcy5fc2V0dXBSaW1MaWdodGluZ01peE5vZGUoKSk7XG4gICAgcmltTXVsdGlwbHkuYXNzaWduKHRoaXMuX3NldHVwUmltTXVsdGlwbHlOb2RlKCkpO1xuICAgIG1hdGNhcC5hc3NpZ24odGhpcy5fc2V0dXBNYXRjYXBOb2RlKCkpO1xuICAgIHBhcmFtZXRyaWNSaW0uYXNzaWduKHRoaXMuX3NldHVwUGFyYW1ldHJpY1JpbU5vZGUoKSk7XG4gIH1cblxuICBwdWJsaWMgc2V0dXBOb3JtYWwoYnVpbGRlcjogVEhSRUUuTm9kZUJ1aWxkZXIpOiBTaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+IHtcbiAgICAvLyB3ZSBtdXN0IGFwcGx5IHV2IHNjcm9sbCB0byB0aGUgbm9ybWFsTWFwXG4gICAgLy8gdGhpcy5ub3JtYWxOb2RlIHdpbGwgYmUgdXNlZCBpbiBzdXBlci5zZXR1cE5vcm1hbCgpIHNvIHdlIHRlbXBvcmFyaWx5IHJlcGxhY2UgaXRcbiAgICBjb25zdCB0ZW1wTm9ybWFsTm9kZSA9IHRoaXMubm9ybWFsTm9kZTtcblxuICAgIGlmICh0aGlzLm5vcm1hbE5vZGUgPT0gbnVsbCkge1xuICAgICAgdGhpcy5ub3JtYWxOb2RlID0gbWF0ZXJpYWxOb3JtYWw7XG5cbiAgICAgIGlmICh0aGlzLm5vcm1hbE1hcCAmJiB0aGlzLm5vcm1hbE1hcC5pc1RleHR1cmUgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3QgbWFwID0gcmVmTm9ybWFsTWFwLmNvbnRleHQoeyBnZXRVVjogKCkgPT4gdGhpcy5fYW5pbWF0ZWRVVk5vZGUgfSk7XG4gICAgICAgIHRoaXMubm9ybWFsTm9kZSA9IG5vcm1hbE1hcChtYXAsIHJlZk5vcm1hbFNjYWxlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuaXNPdXRsaW5lKSB7XG4gICAgICAgIC8vIFNlZSBhYm91dCB0aGUgdHlwZSBhc3NlcnRpb246IGh0dHBzOi8vZ2l0aHViLmNvbS90aHJlZS10eXBlcy90aHJlZS10cy10eXBlcy9wdWxsLzExMjNcbiAgICAgICAgdGhpcy5ub3JtYWxOb2RlID0gKHRoaXMubm9ybWFsTm9kZSBhcyBTaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+KS5uZWdhdGUoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDT01QQVQgcjE2ODogYHNldHVwTm9ybWFsYCBub3cgcmV0dXJucyB0aGUgbm9ybWFsIG5vZGVcbiAgICAvLyBpbnN0ZWFkIG9mIGFzc2lnbmluZyBpbnNpZGUgdGhlIGBzdXBlci5zZXR1cE5vcm1hbGBcbiAgICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvcHVsbC8yOTEzN1xuICAgIGNvbnN0IHRocmVlUmV2aXNpb24gPSBwYXJzZUludChUSFJFRS5SRVZJU0lPTiwgMTApO1xuICAgIGlmICh0aHJlZVJldmlzaW9uID49IDE2OCkge1xuICAgICAgY29uc3QgcmV0ID0gdGhpcy5ub3JtYWxOb2RlIGFzIFNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT47XG5cbiAgICAgIC8vIHJldmVydCB0aGUgbm9ybWFsTm9kZVxuICAgICAgdGhpcy5ub3JtYWxOb2RlID0gdGVtcE5vcm1hbE5vZGU7XG5cbiAgICAgIHJldHVybiByZXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHByZS1yMTY4XG4gICAgICAvLyB0aGUgb3JkaW5hcnkgbm9ybWFsIHNldHVwXG4gICAgICBzdXBlci5zZXR1cE5vcm1hbChidWlsZGVyKTtcblxuICAgICAgLy8gcmV2ZXJ0IHRoZSBub3JtYWxOb2RlXG4gICAgICB0aGlzLm5vcm1hbE5vZGUgPSB0ZW1wTm9ybWFsTm9kZTtcblxuICAgICAgLy8gdHlwZSB3b3JrYXJvdW5kOiBwcmV0ZW5kIHRvIHJldHVybiBhIHZhbGlkIHZhbHVlXG4gICAgICAvLyByMTY3IGRvZXNuJ3QgdXNlIHRoZSByZXR1cm4gdmFsdWUgYW55d2F5XG4gICAgICByZXR1cm4gdW5kZWZpbmVkIGFzIGFueTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2V0dXBMaWdodGluZyhidWlsZGVyOiBUSFJFRS5Ob2RlQnVpbGRlcik6IFRIUkVFLk5vZGUge1xuICAgIC8vIHdlIG11c3QgYXBwbHkgdXYgc2Nyb2xsIHRvIHRoZSBlbWlzc2l2ZU1hcFxuICAgIC8vIHRoaXMuZW1pc3NpdmVOb2RlIHdpbGwgYmUgdXNlZCBpbiBzdXBlci5zZXR1cExpZ2h0aW5nKCkgc28gd2UgdGVtcG9yYXJpbHkgcmVwbGFjZSBpdFxuICAgIGxldCB0ZW1wRW1pc3NpdmVOb2RlOiBTaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+IHwgbnVsbCA9IG51bGw7XG5cbiAgICBpZiAodGhpcy5lbWlzc2l2ZU5vZGUgPT0gbnVsbCkge1xuICAgICAgdGVtcEVtaXNzaXZlTm9kZSA9IHJlZkVtaXNzaXZlLm11bChyZWZFbWlzc2l2ZUludGVuc2l0eSk7XG5cbiAgICAgIGlmICh0aGlzLmVtaXNzaXZlTWFwICYmIHRoaXMuZW1pc3NpdmVNYXAuaXNUZXh0dXJlID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IG1hcCA9IHJlZkVtaXNzaXZlTWFwLmNvbnRleHQoeyBnZXRVVjogKCkgPT4gdGhpcy5fYW5pbWF0ZWRVVk5vZGUgfSk7XG4gICAgICAgIHRlbXBFbWlzc2l2ZU5vZGUgPSB0ZW1wRW1pc3NpdmVOb2RlLm11bChtYXApO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmVtaXNzaXZlTm9kZSA9IHRlbXBFbWlzc2l2ZU5vZGU7XG4gICAgfVxuXG4gICAgLy8gdGhlIG9yZGluYXJ5IGxpZ2h0aW5nIHNldHVwXG4gICAgY29uc3QgcmV0ID0gc3VwZXIuc2V0dXBMaWdodGluZyhidWlsZGVyKTtcblxuICAgIC8vIHJldmVydCB0aGUgZW1pc3NpdmVOb2RlXG4gICAgaWYgKHRoaXMuZW1pc3NpdmVOb2RlID09PSB0ZW1wRW1pc3NpdmVOb2RlKSB7XG4gICAgICB0aGlzLmVtaXNzaXZlTm9kZSA9IG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIHB1YmxpYyBzZXR1cE91dHB1dChcbiAgICBidWlsZGVyOiBUSFJFRS5Ob2RlQnVpbGRlcixcbiAgICBvdXRwdXROb2RlOiBTaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+LFxuICApOiBTaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+IHtcbiAgICAvLyBtaXggb3Igc2V0IG91dGxpbmUgY29sb3JcbiAgICBpZiAodGhpcy5pc091dGxpbmUgJiYgdGhpcy5vdXRsaW5lV2lkdGhNb2RlICE9PSBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZS5Ob25lKSB7XG4gICAgICBvdXRwdXROb2RlID0gdmVjNChcbiAgICAgICAgbWl4KHJlZk91dGxpbmVDb2xvckZhY3Rvciwgb3V0cHV0Tm9kZS54eXoubXVsKHJlZk91dGxpbmVDb2xvckZhY3RvciksIHJlZk91dGxpbmVMaWdodGluZ01peEZhY3RvciksXG4gICAgICAgIG91dHB1dE5vZGUudyxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gdGhlIG9yZGluYXJ5IG91dHB1dCBzZXR1cFxuICAgIHJldHVybiBzdXBlci5zZXR1cE91dHB1dChidWlsZGVyLCBvdXRwdXROb2RlKSBhcyBTaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+O1xuICB9XG5cbiAgcHVibGljIHNldHVwUG9zaXRpb24oYnVpbGRlcjogVEhSRUUuTm9kZUJ1aWxkZXIpOiBTaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+IHtcbiAgICAvLyB3ZSBtdXN0IGFwcGx5IG91dGxpbmUgcG9zaXRpb24gb2Zmc2V0XG4gICAgLy8gdGhpcy5wb3NpdGlvbk5vZGUgd2lsbCBiZSB1c2VkIGluIHN1cGVyLnNldHVwUG9zaXRpb24oKSBzbyB3ZSB0ZW1wb3JhcmlseSByZXBsYWNlIGl0XG4gICAgY29uc3QgdGVtcFBvc2l0aW9uTm9kZSA9IHRoaXMucG9zaXRpb25Ob2RlO1xuXG4gICAgaWYgKHRoaXMuaXNPdXRsaW5lICYmIHRoaXMub3V0bGluZVdpZHRoTW9kZSAhPT0gTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUuTm9uZSkge1xuICAgICAgdGhpcy5wb3NpdGlvbk5vZGUgPz89IHBvc2l0aW9uTG9jYWw7XG5cbiAgICAgIGNvbnN0IG5vcm1hbExvY2FsTm9ybWFsaXplZCA9IG5vcm1hbExvY2FsLm5vcm1hbGl6ZSgpO1xuXG4gICAgICBsZXQgd2lkdGg6IFNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT4gPSByZWZPdXRsaW5lV2lkdGhGYWN0b3I7XG5cbiAgICAgIGlmICh0aGlzLm91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZSAmJiB0aGlzLm91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZS5pc1RleHR1cmUgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3QgbWFwID0gcmVmT3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlLmNvbnRleHQoeyBnZXRVVjogKCkgPT4gdGhpcy5fYW5pbWF0ZWRVVk5vZGUgfSk7XG4gICAgICAgIHdpZHRoID0gd2lkdGgubXVsKG1hcCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHdvcmxkTm9ybWFsTGVuZ3RoID0gbGVuZ3RoKG1vZGVsTm9ybWFsTWF0cml4Lm11bChub3JtYWxMb2NhbE5vcm1hbGl6ZWQpKTtcbiAgICAgIGNvbnN0IG91dGxpbmVPZmZzZXQgPSB3aWR0aC5tdWwod29ybGROb3JtYWxMZW5ndGgpLm11bChub3JtYWxMb2NhbE5vcm1hbGl6ZWQpO1xuXG4gICAgICBpZiAodGhpcy5vdXRsaW5lV2lkdGhNb2RlID09PSBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZS5Xb3JsZENvb3JkaW5hdGVzKSB7XG4gICAgICAgIC8vIFNlZSBhYm91dCB0aGUgdHlwZSBhc3NlcnRpb246IGh0dHBzOi8vZ2l0aHViLmNvbS90aHJlZS10eXBlcy90aHJlZS10cy10eXBlcy9wdWxsLzExMjNcbiAgICAgICAgdGhpcy5wb3NpdGlvbk5vZGUgPSAodGhpcy5wb3NpdGlvbk5vZGUgYXMgU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPikuYWRkKG91dGxpbmVPZmZzZXQpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLm91dGxpbmVXaWR0aE1vZGUgPT09IE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlLlNjcmVlbkNvb3JkaW5hdGVzKSB7XG4gICAgICAgIGNvbnN0IGNsaXBTY2FsZSA9IGNhbWVyYVByb2plY3Rpb25NYXRyaXguZWxlbWVudCgxKS5lbGVtZW50KDEpO1xuXG4gICAgICAgIC8vIFdlIGNhbid0IHVzZSBgcG9zaXRpb25WaWV3YCBpbiBgc2V0dXBQb3NpdGlvbmBcbiAgICAgICAgLy8gYmVjYXVzZSB1c2luZyBgcG9zaXRpb25WaWV3YCBoZXJlIHdpbGwgbWFrZSBpdCBjYWxjdWxhdGUgdGhlIGBwb3NpdGlvblZpZXdgIGVhcmxpZXJcbiAgICAgICAgLy8gYW5kIGl0IHdvbid0IGJlIGNhbGN1bGF0ZWQgYWdhaW4gYWZ0ZXIgc2V0dGluZyB0aGUgYHBvc2l0aW9uTm9kZWBcbiAgICAgICAgY29uc3QgdGVtcFBvc2l0aW9uVmlldyA9IG1vZGVsVmlld01hdHJpeC5tdWwocG9zaXRpb25Mb2NhbCk7XG5cbiAgICAgICAgLy8gU2VlIGFib3V0IHRoZSB0eXBlIGFzc2VydGlvbjogaHR0cHM6Ly9naXRodWIuY29tL3RocmVlLXR5cGVzL3RocmVlLXRzLXR5cGVzL3B1bGwvMTEyM1xuICAgICAgICB0aGlzLnBvc2l0aW9uTm9kZSA9ICh0aGlzLnBvc2l0aW9uTm9kZSBhcyBTaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+KS5hZGQoXG4gICAgICAgICAgb3V0bGluZU9mZnNldC5kaXYoY2xpcFNjYWxlKS5tdWwodGVtcFBvc2l0aW9uVmlldy56Lm5lZ2F0ZSgpKSxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5wb3NpdGlvbk5vZGUgPz89IHBvc2l0aW9uTG9jYWw7XG4gICAgfVxuXG4gICAgLy8gdGhlIG9yZGluYXJ5IHBvc2l0aW9uIHNldHVwXG4gICAgY29uc3QgcmV0ID0gc3VwZXIuc2V0dXBQb3NpdGlvbihidWlsZGVyKSBhcyBTaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+O1xuXG4gICAgLy8gYW50aSB6LWZpZ2h0aW5nXG4gICAgLy8gVE9ETzogV2UgbWlnaHQgd2FudCB0byBhZGRyZXNzIHRoaXMgdmlhIGdsUG9seWdvbk9mZnNldCBpbnN0ZWFkP1xuICAgIHJldC56LmFkZChyZXQudy5tdWwoMWUtNikpO1xuXG4gICAgLy8gcmV2ZXJ0IHRoZSBwb3NpdGlvbk5vZGVcbiAgICB0aGlzLnBvc2l0aW9uTm9kZSA9IHRlbXBQb3NpdGlvbk5vZGU7XG5cbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgcHVibGljIGNvcHkoc291cmNlOiBNVG9vbk5vZGVNYXRlcmlhbCk6IHRoaXMge1xuICAgIHRoaXMuY29sb3IuY29weShzb3VyY2UuY29sb3IpO1xuICAgIHRoaXMubWFwID0gc291cmNlLm1hcCA/PyBudWxsO1xuICAgIHRoaXMuZW1pc3NpdmUuY29weShzb3VyY2UuZW1pc3NpdmUpO1xuICAgIHRoaXMuZW1pc3NpdmVJbnRlbnNpdHkgPSBzb3VyY2UuZW1pc3NpdmVJbnRlbnNpdHk7XG4gICAgdGhpcy5lbWlzc2l2ZU1hcCA9IHNvdXJjZS5lbWlzc2l2ZU1hcCA/PyBudWxsO1xuICAgIHRoaXMubm9ybWFsTWFwID0gc291cmNlLm5vcm1hbE1hcCA/PyBudWxsO1xuICAgIHRoaXMubm9ybWFsU2NhbGUuY29weShzb3VyY2Uubm9ybWFsU2NhbGUpO1xuXG4gICAgdGhpcy5zaGFkZUNvbG9yRmFjdG9yLmNvcHkoc291cmNlLnNoYWRlQ29sb3JGYWN0b3IpO1xuICAgIHRoaXMuc2hhZGVNdWx0aXBseVRleHR1cmUgPSBzb3VyY2Uuc2hhZGVNdWx0aXBseVRleHR1cmUgPz8gbnVsbDtcbiAgICB0aGlzLnNoYWRpbmdTaGlmdEZhY3RvciA9IHNvdXJjZS5zaGFkaW5nU2hpZnRGYWN0b3I7XG4gICAgdGhpcy5zaGFkaW5nU2hpZnRUZXh0dXJlID0gc291cmNlLnNoYWRpbmdTaGlmdFRleHR1cmUgPz8gbnVsbDtcbiAgICB0aGlzLnNoYWRpbmdTaGlmdFRleHR1cmVTY2FsZSA9IHNvdXJjZS5zaGFkaW5nU2hpZnRUZXh0dXJlU2NhbGU7XG4gICAgdGhpcy5zaGFkaW5nVG9vbnlGYWN0b3IgPSBzb3VyY2Uuc2hhZGluZ1Rvb255RmFjdG9yO1xuICAgIHRoaXMucmltTGlnaHRpbmdNaXhGYWN0b3IgPSBzb3VyY2UucmltTGlnaHRpbmdNaXhGYWN0b3I7XG4gICAgdGhpcy5yaW1NdWx0aXBseVRleHR1cmUgPSBzb3VyY2UucmltTXVsdGlwbHlUZXh0dXJlID8/IG51bGw7XG4gICAgdGhpcy5tYXRjYXBGYWN0b3IuY29weShzb3VyY2UubWF0Y2FwRmFjdG9yKTtcbiAgICB0aGlzLm1hdGNhcFRleHR1cmUgPSBzb3VyY2UubWF0Y2FwVGV4dHVyZSA/PyBudWxsO1xuICAgIHRoaXMucGFyYW1ldHJpY1JpbUNvbG9yRmFjdG9yLmNvcHkoc291cmNlLnBhcmFtZXRyaWNSaW1Db2xvckZhY3Rvcik7XG4gICAgdGhpcy5wYXJhbWV0cmljUmltTGlmdEZhY3RvciA9IHNvdXJjZS5wYXJhbWV0cmljUmltTGlmdEZhY3RvcjtcbiAgICB0aGlzLnBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJGYWN0b3IgPSBzb3VyY2UucGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlckZhY3RvcjtcbiAgICB0aGlzLm91dGxpbmVXaWR0aE1vZGUgPSBzb3VyY2Uub3V0bGluZVdpZHRoTW9kZTtcbiAgICB0aGlzLm91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZSA9IHNvdXJjZS5vdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmUgPz8gbnVsbDtcbiAgICB0aGlzLm91dGxpbmVXaWR0aEZhY3RvciA9IHNvdXJjZS5vdXRsaW5lV2lkdGhGYWN0b3I7XG4gICAgdGhpcy5vdXRsaW5lQ29sb3JGYWN0b3IuY29weShzb3VyY2Uub3V0bGluZUNvbG9yRmFjdG9yKTtcbiAgICB0aGlzLm91dGxpbmVMaWdodGluZ01peEZhY3RvciA9IHNvdXJjZS5vdXRsaW5lTGlnaHRpbmdNaXhGYWN0b3I7XG4gICAgdGhpcy51dkFuaW1hdGlvblNjcm9sbFhTcGVlZEZhY3RvciA9IHNvdXJjZS51dkFuaW1hdGlvblNjcm9sbFhTcGVlZEZhY3RvcjtcbiAgICB0aGlzLnV2QW5pbWF0aW9uU2Nyb2xsWVNwZWVkRmFjdG9yID0gc291cmNlLnV2QW5pbWF0aW9uU2Nyb2xsWVNwZWVkRmFjdG9yO1xuICAgIHRoaXMudXZBbmltYXRpb25Sb3RhdGlvblNwZWVkRmFjdG9yID0gc291cmNlLnV2QW5pbWF0aW9uUm90YXRpb25TcGVlZEZhY3RvcjtcbiAgICB0aGlzLnV2QW5pbWF0aW9uTWFza1RleHR1cmUgPSBzb3VyY2UudXZBbmltYXRpb25NYXNrVGV4dHVyZSA/PyBudWxsO1xuXG4gICAgdGhpcy5zaGFkZUNvbG9yTm9kZSA9IHNvdXJjZS5zaGFkZUNvbG9yTm9kZSA/PyBudWxsO1xuICAgIHRoaXMuc2hhZGluZ1NoaWZ0Tm9kZSA9IHNvdXJjZS5zaGFkaW5nU2hpZnROb2RlID8/IG51bGw7XG4gICAgdGhpcy5zaGFkaW5nVG9vbnlOb2RlID0gc291cmNlLnNoYWRpbmdUb29ueU5vZGUgPz8gbnVsbDtcbiAgICB0aGlzLnJpbUxpZ2h0aW5nTWl4Tm9kZSA9IHNvdXJjZS5yaW1MaWdodGluZ01peE5vZGUgPz8gbnVsbDtcbiAgICB0aGlzLnJpbU11bHRpcGx5Tm9kZSA9IHNvdXJjZS5yaW1NdWx0aXBseU5vZGUgPz8gbnVsbDtcbiAgICB0aGlzLm1hdGNhcE5vZGUgPSBzb3VyY2UubWF0Y2FwTm9kZSA/PyBudWxsO1xuICAgIHRoaXMucGFyYW1ldHJpY1JpbUNvbG9yTm9kZSA9IHNvdXJjZS5wYXJhbWV0cmljUmltQ29sb3JOb2RlID8/IG51bGw7XG4gICAgdGhpcy5wYXJhbWV0cmljUmltTGlmdE5vZGUgPSBzb3VyY2UucGFyYW1ldHJpY1JpbUxpZnROb2RlID8/IG51bGw7XG4gICAgdGhpcy5wYXJhbWV0cmljUmltRnJlc25lbFBvd2VyTm9kZSA9IHNvdXJjZS5wYXJhbWV0cmljUmltRnJlc25lbFBvd2VyTm9kZSA/PyBudWxsO1xuXG4gICAgdGhpcy5pc091dGxpbmUgPSBzb3VyY2UuaXNPdXRsaW5lID8/IG51bGw7XG5cbiAgICByZXR1cm4gc3VwZXIuY29weShzb3VyY2UpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZShkZWx0YTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy51dkFuaW1hdGlvblNjcm9sbFhPZmZzZXQgKz0gZGVsdGEgKiB0aGlzLnV2QW5pbWF0aW9uU2Nyb2xsWFNwZWVkRmFjdG9yO1xuICAgIHRoaXMudXZBbmltYXRpb25TY3JvbGxZT2Zmc2V0ICs9IGRlbHRhICogdGhpcy51dkFuaW1hdGlvblNjcm9sbFlTcGVlZEZhY3RvcjtcbiAgICB0aGlzLnV2QW5pbWF0aW9uUm90YXRpb25QaGFzZSArPSBkZWx0YSAqIHRoaXMudXZBbmltYXRpb25Sb3RhdGlvblNwZWVkRmFjdG9yO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0dXBTaGFkZUNvbG9yTm9kZSgpOiBTd2l6emFibGUge1xuICAgIGlmICh0aGlzLnNoYWRlQ29sb3JOb2RlICE9IG51bGwpIHtcbiAgICAgIHJldHVybiB2ZWMzKHRoaXMuc2hhZGVDb2xvck5vZGUpO1xuICAgIH1cblxuICAgIGxldCBzaGFkZUNvbG9yTm9kZTogU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPiA9IHJlZlNoYWRlQ29sb3JGYWN0b3I7XG5cbiAgICBpZiAodGhpcy5zaGFkZU11bHRpcGx5VGV4dHVyZSAmJiB0aGlzLnNoYWRlTXVsdGlwbHlUZXh0dXJlLmlzVGV4dHVyZSA9PT0gdHJ1ZSkge1xuICAgICAgY29uc3QgbWFwID0gcmVmU2hhZGVNdWx0aXBseVRleHR1cmUuY29udGV4dCh7IGdldFVWOiAoKSA9PiB0aGlzLl9hbmltYXRlZFVWTm9kZSB9KTtcbiAgICAgIHNoYWRlQ29sb3JOb2RlID0gc2hhZGVDb2xvck5vZGUubXVsKG1hcCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNoYWRlQ29sb3JOb2RlO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0dXBTaGFkaW5nU2hpZnROb2RlKCk6IFRIUkVFLk5vZGUge1xuICAgIGlmICh0aGlzLnNoYWRpbmdTaGlmdE5vZGUgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGZsb2F0KHRoaXMuc2hhZGluZ1NoaWZ0Tm9kZSk7XG4gICAgfVxuXG4gICAgbGV0IHNoYWRpbmdTaGlmdE5vZGU6IFNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT4gPSByZWZTaGFkaW5nU2hpZnRGYWN0b3I7XG5cbiAgICBpZiAodGhpcy5zaGFkaW5nU2hpZnRUZXh0dXJlICYmIHRoaXMuc2hhZGluZ1NoaWZ0VGV4dHVyZS5pc1RleHR1cmUgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IG1hcCA9IHJlZlNoYWRlTXVsdGlwbHlUZXh0dXJlLmNvbnRleHQoeyBnZXRVVjogKCkgPT4gdGhpcy5fYW5pbWF0ZWRVVk5vZGUgfSk7XG4gICAgICBzaGFkaW5nU2hpZnROb2RlID0gc2hhZGluZ1NoaWZ0Tm9kZS5hZGQobWFwLm11bChyZWZTaGFkZU11bHRpcGx5VGV4dHVyZVNjYWxlKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNoYWRpbmdTaGlmdE5vZGU7XG4gIH1cblxuICBwcml2YXRlIF9zZXR1cFNoYWRpbmdUb29ueU5vZGUoKTogVEhSRUUuTm9kZSB7XG4gICAgaWYgKHRoaXMuc2hhZGluZ1Rvb255Tm9kZSAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gZmxvYXQodGhpcy5zaGFkaW5nVG9vbnlOb2RlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVmU2hhZGluZ1Rvb255RmFjdG9yO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0dXBSaW1MaWdodGluZ01peE5vZGUoKTogVEhSRUUuTm9kZSB7XG4gICAgaWYgKHRoaXMucmltTGlnaHRpbmdNaXhOb2RlICE9IG51bGwpIHtcbiAgICAgIHJldHVybiBmbG9hdCh0aGlzLnJpbUxpZ2h0aW5nTWl4Tm9kZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlZlJpbUxpZ2h0aW5nTWl4RmFjdG9yO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0dXBSaW1NdWx0aXBseU5vZGUoKTogU3dpenphYmxlIHtcbiAgICBpZiAodGhpcy5yaW1NdWx0aXBseU5vZGUgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHZlYzModGhpcy5yaW1NdWx0aXBseU5vZGUpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnJpbU11bHRpcGx5VGV4dHVyZSAmJiB0aGlzLnJpbU11bHRpcGx5VGV4dHVyZS5pc1RleHR1cmUgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IG1hcCA9IHJlZlJpbU11bHRpcGx5VGV4dHVyZS5jb250ZXh0KHsgZ2V0VVY6ICgpID0+IHRoaXMuX2FuaW1hdGVkVVZOb2RlIH0pO1xuICAgICAgcmV0dXJuIG1hcDtcbiAgICB9XG5cbiAgICByZXR1cm4gdmVjMygxLjApO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0dXBNYXRjYXBOb2RlKCk6IFN3aXp6YWJsZSB7XG4gICAgaWYgKHRoaXMubWF0Y2FwTm9kZSAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gdmVjMyh0aGlzLm1hdGNhcE5vZGUpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm1hdGNhcFRleHR1cmUgJiYgdGhpcy5tYXRjYXBUZXh0dXJlLmlzVGV4dHVyZSA9PT0gdHJ1ZSkge1xuICAgICAgY29uc3QgbWFwID0gcmVmTWF0Y2FwVGV4dHVyZS5jb250ZXh0KHsgZ2V0VVY6ICgpID0+IG1hdGNhcFVWLm11bCgxLjAsIC0xLjApLmFkZCgwLjAsIDEuMCkgfSk7XG4gICAgICByZXR1cm4gbWFwLm11bChyZWZNYXRjYXBGYWN0b3IpO1xuICAgIH1cblxuICAgIHJldHVybiB2ZWMzKDAuMCk7XG4gIH1cblxuICBwcml2YXRlIF9zZXR1cFBhcmFtZXRyaWNSaW1Ob2RlKCk6IFN3aXp6YWJsZSB7XG4gICAgY29uc3QgcGFyYW1ldHJpY1JpbUNvbG9yID1cbiAgICAgIHRoaXMucGFyYW1ldHJpY1JpbUNvbG9yTm9kZSAhPSBudWxsID8gdmVjMyh0aGlzLnBhcmFtZXRyaWNSaW1Db2xvck5vZGUpIDogcmVmUGFyYW1ldHJpY1JpbUNvbG9yRmFjdG9yO1xuXG4gICAgY29uc3QgcGFyYW1ldHJpY1JpbUxpZnQgPVxuICAgICAgdGhpcy5wYXJhbWV0cmljUmltTGlmdE5vZGUgIT0gbnVsbCA/IGZsb2F0KHRoaXMucGFyYW1ldHJpY1JpbUxpZnROb2RlKSA6IHJlZlBhcmFtZXRyaWNSaW1MaWZ0RmFjdG9yO1xuXG4gICAgY29uc3QgcGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlciA9XG4gICAgICB0aGlzLnBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJOb2RlICE9IG51bGxcbiAgICAgICAgPyBmbG9hdCh0aGlzLnBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJOb2RlKVxuICAgICAgICA6IHJlZlBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJGYWN0b3I7XG5cbiAgICByZXR1cm4gbXRvb25QYXJhbWV0cmljUmltKHtcbiAgICAgIHBhcmFtZXRyaWNSaW1MaWZ0LFxuICAgICAgcGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlcixcbiAgICAgIHBhcmFtZXRyaWNSaW1Db2xvcixcbiAgICB9KTtcbiAgfVxufVxuXG4vLyBUT0RPOiBQYXJ0IG9mIHN0dWZmIHRoYXQgTVRvb25NYXRlcmlhbCBkZXBlbmRzIG9uIGRvZXMgbm90IGV4aXN0IGluIHRocmVlL3dlYmdwdSAoZS5nLiBVbmlmb3Jtc0xpYilcbi8vIFRIUkVFLmFkZE5vZGVNYXRlcmlhbCgnTVRvb25Ob2RlTWF0ZXJpYWwnLCBNVG9vbk5vZGVNYXRlcmlhbCk7XG4iLCAiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uICovXG5cbmV4cG9ydCBjb25zdCBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZSA9IHtcbiAgTm9uZTogJ25vbmUnLFxuICBXb3JsZENvb3JkaW5hdGVzOiAnd29ybGRDb29yZGluYXRlcycsXG4gIFNjcmVlbkNvb3JkaW5hdGVzOiAnc2NyZWVuQ29vcmRpbmF0ZXMnLFxufSBhcyBjb25zdDtcblxuZXhwb3J0IHR5cGUgTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUgPVxuICAodHlwZW9mIE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlKVtrZXlvZiB0eXBlb2YgTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGVdO1xuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlL3dlYmdwdSc7XG5pbXBvcnQgeyBmbG9hdCwgbW9kZWxWaWV3UG9zaXRpb24sIE5vZGVSZXByZXNlbnRhdGlvbiwgdHJhbnNmb3JtZWROb3JtYWxWaWV3IH0gZnJvbSAndGhyZWUvdHNsJztcbmltcG9ydCB7IEZuQ29tcGF0IH0gZnJvbSAnLi91dGlscy9GbkNvbXBhdCc7XG5cbmV4cG9ydCBjb25zdCBtdG9vblBhcmFtZXRyaWNSaW0gPSBGbkNvbXBhdChcbiAgKHtcbiAgICBwYXJhbWV0cmljUmltTGlmdCxcbiAgICBwYXJhbWV0cmljUmltRnJlc25lbFBvd2VyLFxuICAgIHBhcmFtZXRyaWNSaW1Db2xvcixcbiAgfToge1xuICAgIHBhcmFtZXRyaWNSaW1MaWZ0OiBOb2RlUmVwcmVzZW50YXRpb247XG4gICAgcGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlcjogTm9kZVJlcHJlc2VudGF0aW9uO1xuICAgIHBhcmFtZXRyaWNSaW1Db2xvcjogTm9kZVJlcHJlc2VudGF0aW9uO1xuICB9KSA9PiB7XG4gICAgY29uc3Qgdmlld0RpciA9IG1vZGVsVmlld1Bvc2l0aW9uLm5vcm1hbGl6ZSgpO1xuICAgIGNvbnN0IGRvdE5WID0gdHJhbnNmb3JtZWROb3JtYWxWaWV3LmRvdCh2aWV3RGlyLm5lZ2F0ZSgpKTtcblxuICAgIGNvbnN0IHJpbSA9IGZsb2F0KDEuMCkuc3ViKGRvdE5WKS5hZGQocGFyYW1ldHJpY1JpbUxpZnQpLmNsYW1wKCkucG93KHBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXIpO1xuXG4gICAgcmV0dXJuIHJpbS5tdWwocGFyYW1ldHJpY1JpbUNvbG9yKTtcbiAgfSxcbik7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUNHQSxZQUF1QjtBQ0h2QixhQUF1QjtBQUN2QixpQkFBZ0c7QUNEaEcsSUFBQUEsY0FBa0M7QUNBbEMsYUFBdUI7QUFDdkIsSUFBQUEsY0FBc0c7QUNEdEcsYUFBdUI7QUFDdkIsSUFBQUEsY0FBOEI7QUNEOUIsZ0JBQTJCO0FBQzNCLG1CQUE4QjtBQ0Q5QixhQUF1QjtBQUN2QixJQUFBQSxjQWtCTztBRWxCUCxJQUFBQSxjQUFvRjtBUklwRixJQUFNLGdCQUFnQixTQUFlLGdCQUFVLEVBQUU7QUFDakQsSUFBSSxnQkFBZ0IsS0FBSztBQUN2QixVQUFRO0lBQ04sc0VBQXNFLGFBQWE7RUFDckY7QUFDRjtBRVJPLElBQU0sZUFBVywrQkFBa0IsU0FBUyxPQUFPO0FBQ25ELElBQU0sYUFBUywrQkFBa0IsT0FBTyxTQUFTO0FBQ2pELElBQU0sbUJBQWUsK0JBQWtCLGFBQWEsU0FBUztB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SSw0QkFBNEIsQ0FBQztJQUMvRTtBQUVBLFdBQU87RUFDVDtFQUVRLHlCQUFxQztBQUMzQyxRQUFJLEtBQUssb0JBQW9CLE1BQU07QUFDakMsaUJBQU9BLFlBQUFBLE9BQU0sS0FBSyxnQkFBZ0I7SUFDcEM7QUFFQSxXQUFPO0VBQ1Q7RUFFUSwyQkFBdUM7QUFDN0MsUUFBSSxLQUFLLHNCQUFzQixNQUFNO0FBQ25DLGlCQUFPQSxZQUFBQSxPQUFNLEtBQUssa0JBQWtCO0lBQ3RDO0FBRUEsV0FBTztFQUNUO0VBRVEsd0JBQW1DO0FBQ3pDLFFBQUksS0FBSyxtQkFBbUIsTUFBTTtBQUNoQyxpQkFBT0ksWUFBQUEsTUFBSyxLQUFLLGVBQWU7SUFDbEM7QUFFQSxRQUFJLEtBQUssc0JBQXNCLEtBQUssbUJBQW1CLGNBQWMsTUFBTTtBQUN6RSxZQUFNLE1BQU0sc0JBQXNCLFFBQVEsRUFBRSxPQUFPLE1BQU0sS0FBSyxnQkFBZ0IsQ0FBQztBQUMvRSxhQUFPO0lBQ1Q7QUFFQSxlQUFPQSxZQUFBQSxNQUFLLENBQUc7RUFDakI7RUFFUSxtQkFBOEI7QUFDcEMsUUFBSSxLQUFLLGNBQWMsTUFBTTtBQUMzQixpQkFBT0EsWUFBQUEsTUFBSyxLQUFLLFVBQVU7SUFDN0I7QUFFQSxRQUFJLEtBQUssaUJBQWlCLEtBQUssY0FBYyxjQUFjLE1BQU07QUFDL0QsWUFBTSxNQUFNLGlCQUFpQixRQUFRLEVBQUUsT0FBTyxNQUFNLHFCQUFTLElBQUksR0FBSyxFQUFJLEVBQUUsSUFBSSxHQUFLLENBQUcsRUFBRSxDQUFDO0FBQzNGLGFBQU8sSUFBSSxJQUFJLGVBQWU7SUFDaEM7QUFFQSxlQUFPQSxZQUFBQSxNQUFLLENBQUc7RUFDakI7RUFFUSwwQkFBcUM7QUFDM0MsVUFBTSxxQkFDSixLQUFLLDBCQUEwQixXQUFPQSxZQUFBQSxNQUFLLEtBQUssc0JBQXNCLElBQUk7QUFFNUUsVUFBTSxvQkFDSixLQUFLLHlCQUF5QixXQUFPSixZQUFBQSxPQUFNLEtBQUsscUJBQXFCLElBQUk7QUFFM0UsVUFBTSw0QkFDSixLQUFLLGlDQUFpQyxXQUNsQ0EsWUFBQUEsT0FBTSxLQUFLLDZCQUE2QixJQUN4QztBQUVOLFdBQU8sbUJBQW1CO01BQ3hCO01BQ0E7TUFDQTtJQUNGLENBQUM7RUFDSDtBQUNGOyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfdHNsIiwgInRocmVlUmV2aXNpb24iLCAidHJhbnNmb3JtZWROb3JtYWxWaWV3IiwgImZsb2F0IiwgImRpZmZ1c2VDb2xvciIsICJ2ZWM0IiwgIm1peCIsICJ2ZWMzIl0KfQo=
