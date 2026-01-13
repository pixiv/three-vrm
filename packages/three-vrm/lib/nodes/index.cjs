/*!
 * @pixiv/three-vrm v3.4.5
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
 * @pixiv/three-vrm-materials-mtoon v3.4.5
 * MToon (toon material) module for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2026 pixiv Inc.
 * @pixiv/three-vrm-materials-mtoon is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL25vZGVzL2luZGV4LnRzIiwgIi4uLy4uLy4uL3RocmVlLXZybS1tYXRlcmlhbHMtbXRvb24vc3JjL25vZGVzL3dhcm5pbmdJZlByZTE2MS50cyIsICIuLi8uLi8uLi90aHJlZS12cm0tbWF0ZXJpYWxzLW10b29uL3NyYy9ub2Rlcy9NVG9vbkFuaW1hdGVkVVZOb2RlLnRzIiwgIi4uLy4uLy4uL3RocmVlLXZybS1tYXRlcmlhbHMtbXRvb24vc3JjL25vZGVzL21hdGVyaWFsUmVmZXJlbmNlcy50cyIsICIuLi8uLi8uLi90aHJlZS12cm0tbWF0ZXJpYWxzLW10b29uL3NyYy9ub2Rlcy9NVG9vbkxpZ2h0aW5nTW9kZWwudHMiLCAiLi4vLi4vLi4vdGhyZWUtdnJtLW1hdGVyaWFscy1tdG9vbi9zcmMvbm9kZXMvaW1tdXRhYmxlTm9kZXMudHMiLCAiLi4vLi4vLi4vdGhyZWUtdnJtLW1hdGVyaWFscy1tdG9vbi9zcmMvbm9kZXMvdXRpbHMvRm5Db21wYXQudHMiLCAiLi4vLi4vLi4vdGhyZWUtdnJtLW1hdGVyaWFscy1tdG9vbi9zcmMvbm9kZXMvTVRvb25Ob2RlTWF0ZXJpYWwudHMiLCAiLi4vLi4vLi4vdGhyZWUtdnJtLW1hdGVyaWFscy1tdG9vbi9zcmMvTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUudHMiLCAiLi4vLi4vLi4vdGhyZWUtdnJtLW1hdGVyaWFscy1tdG9vbi9zcmMvbm9kZXMvbXRvb25QYXJhbWV0cmljUmltLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgKiBmcm9tICdAcGl4aXYvdGhyZWUtdnJtLW1hdGVyaWFscy1tdG9vbi9ub2Rlcyc7XG4iLCAiLy8gVGhpcyBtb2R1bGUgd2lsbCBiZSBpbXBvcnRlZCBhdCB0aGUgYmVnaW5uaW5nIG9mIGB0aHJlZS12cm0tbWF0ZXJpYWxzLW10b29uL25vZGVzYFxuLy8gSWYgdGhlIHZlcnNpb24gb2YgVGhyZWUuanMgaXMgbGVzcyB0aGFuIHIxNjcsIGl0IHdpbGwgd2FybiB0aGF0IGl0IGlzIG5vdCBzdXBwb3J0ZWRcblxuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG5jb25zdCB0aHJlZVJldmlzaW9uID0gcGFyc2VJbnQoVEhSRUUuUkVWSVNJT04sIDEwKTtcbmlmICh0aHJlZVJldmlzaW9uIDwgMTY3KSB7XG4gIGNvbnNvbGUud2FybihcbiAgICBgTVRvb25Ob2RlTWF0ZXJpYWwgcmVxdWlyZXMgVGhyZWUuanMgcjE2NyBvciBoaWdoZXIgKFlvdSBhcmUgdXNpbmcgciR7dGhyZWVSZXZpc2lvbn0pLiBUaGlzIHdvdWxkIG5vdCB3b3JrIGNvcnJlY3RseS5gLFxuICApO1xufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlL3dlYmdwdSc7XG5pbXBvcnQgeyBjb3MsIG1hdDIsIFNoYWRlck5vZGVPYmplY3QsIHNpbiwgU3dpenphYmxlLCB1diwgdmVjMiwgdmVjNCB9IGZyb20gJ3RocmVlL3RzbCc7XG5pbXBvcnQge1xuICByZWZVVkFuaW1hdGlvbk1hc2tUZXh0dXJlLFxuICByZWZVVkFuaW1hdGlvblJvdGF0aW9uUGhhc2UsXG4gIHJlZlVWQW5pbWF0aW9uU2Nyb2xsWE9mZnNldCxcbiAgcmVmVVZBbmltYXRpb25TY3JvbGxZT2Zmc2V0LFxufSBmcm9tICcuL21hdGVyaWFsUmVmZXJlbmNlcyc7XG5cbmV4cG9ydCBjbGFzcyBNVG9vbkFuaW1hdGVkVVZOb2RlIGV4dGVuZHMgVEhSRUUuVGVtcE5vZGUge1xuICBwdWJsaWMgcmVhZG9ubHkgaGFzTWFza1RleHR1cmU6IGJvb2xlYW47XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGhhc01hc2tUZXh0dXJlOiBib29sZWFuKSB7XG4gICAgc3VwZXIoJ3ZlYzInKTtcblxuICAgIHRoaXMuaGFzTWFza1RleHR1cmUgPSBoYXNNYXNrVGV4dHVyZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXR1cCgpOiBTaGFkZXJOb2RlT2JqZWN0PFRIUkVFLlZhck5vZGU+IHtcbiAgICBsZXQgdXZBbmltYXRpb25NYXNrOiBUSFJFRS5UU0wuT3BlcmF0b3JOb2RlUGFyYW1ldGVyID0gMS4wO1xuXG4gICAgaWYgKHRoaXMuaGFzTWFza1RleHR1cmUpIHtcbiAgICAgIHV2QW5pbWF0aW9uTWFzayA9IHZlYzQocmVmVVZBbmltYXRpb25NYXNrVGV4dHVyZSkuY29udGV4dCh7IGdldFVWOiAoKSA9PiB1digpIH0pLnI7XG4gICAgfVxuXG4gICAgbGV0IGFuaW1hdGVkVXY6IFNoYWRlck5vZGVPYmplY3Q8U3dpenphYmxlPiA9IHV2KCk7XG5cbiAgICAvLyByb3RhdGVcbiAgICBjb25zdCBwaGFzZSA9IHJlZlVWQW5pbWF0aW9uUm90YXRpb25QaGFzZS5tdWwodXZBbmltYXRpb25NYXNrKTtcblxuICAgIC8vIFdPUktBUk9VTkQ6IFRIUkVFLnJvdGF0ZVVWIGNhdXNlcyBhbiBpc3N1ZSB3aXRoIHRoZSBtYXNrIHRleHR1cmVcbiAgICAvLyBXZSBhcmUgZ29pbmcgdG8gc3BpbiB1c2luZyBhIDEwMCUgb3JnYW5pYyBoYW5kbWFkZSByb3RhdGlvbiBtYXRyaXhcbiAgICAvLyBhbmltYXRlZFV2ID0gVEhSRUUucm90YXRlVVYoYW5pbWF0ZWRVdiwgcGhhc2UsIFRIUkVFLnZlYzIoMC41LCAwLjUpKTtcblxuICAgIGNvbnN0IGMgPSBjb3MocGhhc2UpO1xuICAgIGNvbnN0IHMgPSBzaW4ocGhhc2UpO1xuICAgIGFuaW1hdGVkVXYgPSBhbmltYXRlZFV2LnN1Yih2ZWMyKDAuNSwgMC41KSk7XG4gICAgYW5pbWF0ZWRVdiA9IGFuaW1hdGVkVXYubXVsKG1hdDIoYywgcywgcy5uZWdhdGUoKSwgYykpO1xuICAgIGFuaW1hdGVkVXYgPSBhbmltYXRlZFV2LmFkZCh2ZWMyKDAuNSwgMC41KSk7XG5cbiAgICAvLyBzY3JvbGxcbiAgICBjb25zdCBzY3JvbGwgPSB2ZWMyKHJlZlVWQW5pbWF0aW9uU2Nyb2xsWE9mZnNldCwgcmVmVVZBbmltYXRpb25TY3JvbGxZT2Zmc2V0KS5tdWwodXZBbmltYXRpb25NYXNrKTtcbiAgICBhbmltYXRlZFV2ID0gYW5pbWF0ZWRVdi5hZGQoc2Nyb2xsKTtcblxuICAgIHJldHVybiBhbmltYXRlZFV2LnRvVmFyKCdBbmltYXRlZFVWJyk7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBtYXRlcmlhbFJlZmVyZW5jZSB9IGZyb20gJ3RocmVlL3RzbCc7XG5cbmV4cG9ydCBjb25zdCByZWZDb2xvciA9IG1hdGVyaWFsUmVmZXJlbmNlKCdjb2xvcicsICdjb2xvcicpO1xuZXhwb3J0IGNvbnN0IHJlZk1hcCA9IG1hdGVyaWFsUmVmZXJlbmNlKCdtYXAnLCAndGV4dHVyZScpO1xuZXhwb3J0IGNvbnN0IHJlZk5vcm1hbE1hcCA9IG1hdGVyaWFsUmVmZXJlbmNlKCdub3JtYWxNYXAnLCAndGV4dHVyZScpO1xuZXhwb3J0IGNvbnN0IHJlZk5vcm1hbFNjYWxlID0gbWF0ZXJpYWxSZWZlcmVuY2UoJ25vcm1hbFNjYWxlJywgJ3ZlYzInKTtcbmV4cG9ydCBjb25zdCByZWZFbWlzc2l2ZSA9IG1hdGVyaWFsUmVmZXJlbmNlKCdlbWlzc2l2ZScsICdjb2xvcicpO1xuZXhwb3J0IGNvbnN0IHJlZkVtaXNzaXZlSW50ZW5zaXR5ID0gbWF0ZXJpYWxSZWZlcmVuY2UoJ2VtaXNzaXZlSW50ZW5zaXR5JywgJ2Zsb2F0Jyk7XG5leHBvcnQgY29uc3QgcmVmRW1pc3NpdmVNYXAgPSBtYXRlcmlhbFJlZmVyZW5jZSgnZW1pc3NpdmVNYXAnLCAndGV4dHVyZScpO1xuXG5leHBvcnQgY29uc3QgcmVmU2hhZGVDb2xvckZhY3RvciA9IG1hdGVyaWFsUmVmZXJlbmNlKCdzaGFkZUNvbG9yRmFjdG9yJywgJ2NvbG9yJyk7XG5leHBvcnQgY29uc3QgcmVmU2hhZGluZ1NoaWZ0RmFjdG9yID0gbWF0ZXJpYWxSZWZlcmVuY2UoJ3NoYWRpbmdTaGlmdEZhY3RvcicsICdmbG9hdCcpO1xuZXhwb3J0IGNvbnN0IHJlZlNoYWRlTXVsdGlwbHlUZXh0dXJlID0gbWF0ZXJpYWxSZWZlcmVuY2UoJ3NoYWRlTXVsdGlwbHlUZXh0dXJlJywgJ3RleHR1cmUnKTtcbmV4cG9ydCBjb25zdCByZWZTaGFkZU11bHRpcGx5VGV4dHVyZVNjYWxlID0gbWF0ZXJpYWxSZWZlcmVuY2UoJ3NoYWRlTXVsdGlwbHlUZXh0dXJlU2NhbGUnLCAnZmxvYXQnKTtcbmV4cG9ydCBjb25zdCByZWZTaGFkaW5nVG9vbnlGYWN0b3IgPSBtYXRlcmlhbFJlZmVyZW5jZSgnc2hhZGluZ1Rvb255RmFjdG9yJywgJ2Zsb2F0Jyk7XG5leHBvcnQgY29uc3QgcmVmUmltTGlnaHRpbmdNaXhGYWN0b3IgPSBtYXRlcmlhbFJlZmVyZW5jZSgncmltTGlnaHRpbmdNaXhGYWN0b3InLCAnZmxvYXQnKTtcbmV4cG9ydCBjb25zdCByZWZSaW1NdWx0aXBseVRleHR1cmUgPSBtYXRlcmlhbFJlZmVyZW5jZSgncmltTXVsdGlwbHlUZXh0dXJlJywgJ3RleHR1cmUnKTtcbmV4cG9ydCBjb25zdCByZWZNYXRjYXBGYWN0b3IgPSBtYXRlcmlhbFJlZmVyZW5jZSgnbWF0Y2FwRmFjdG9yJywgJ2NvbG9yJyk7XG5leHBvcnQgY29uc3QgcmVmTWF0Y2FwVGV4dHVyZSA9IG1hdGVyaWFsUmVmZXJlbmNlKCdtYXRjYXBUZXh0dXJlJywgJ3RleHR1cmUnKTtcbmV4cG9ydCBjb25zdCByZWZQYXJhbWV0cmljUmltQ29sb3JGYWN0b3IgPSBtYXRlcmlhbFJlZmVyZW5jZSgncGFyYW1ldHJpY1JpbUNvbG9yRmFjdG9yJywgJ2NvbG9yJyk7XG5leHBvcnQgY29uc3QgcmVmUGFyYW1ldHJpY1JpbUxpZnRGYWN0b3IgPSBtYXRlcmlhbFJlZmVyZW5jZSgncGFyYW1ldHJpY1JpbUxpZnRGYWN0b3InLCAnZmxvYXQnKTtcbmV4cG9ydCBjb25zdCByZWZQYXJhbWV0cmljUmltRnJlc25lbFBvd2VyRmFjdG9yID0gbWF0ZXJpYWxSZWZlcmVuY2UoJ3BhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJGYWN0b3InLCAnZmxvYXQnKTtcbmV4cG9ydCBjb25zdCByZWZPdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmUgPSBtYXRlcmlhbFJlZmVyZW5jZSgnb3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlJywgJ3RleHR1cmUnKTtcbmV4cG9ydCBjb25zdCByZWZPdXRsaW5lV2lkdGhGYWN0b3IgPSBtYXRlcmlhbFJlZmVyZW5jZSgnb3V0bGluZVdpZHRoRmFjdG9yJywgJ2Zsb2F0Jyk7XG5leHBvcnQgY29uc3QgcmVmT3V0bGluZUNvbG9yRmFjdG9yID0gbWF0ZXJpYWxSZWZlcmVuY2UoJ291dGxpbmVDb2xvckZhY3RvcicsICdjb2xvcicpO1xuZXhwb3J0IGNvbnN0IHJlZk91dGxpbmVMaWdodGluZ01peEZhY3RvciA9IG1hdGVyaWFsUmVmZXJlbmNlKCdvdXRsaW5lTGlnaHRpbmdNaXhGYWN0b3InLCAnZmxvYXQnKTtcbmV4cG9ydCBjb25zdCByZWZVVkFuaW1hdGlvbk1hc2tUZXh0dXJlID0gbWF0ZXJpYWxSZWZlcmVuY2UoJ3V2QW5pbWF0aW9uTWFza1RleHR1cmUnLCAndGV4dHVyZScpO1xuXG5leHBvcnQgY29uc3QgcmVmVVZBbmltYXRpb25TY3JvbGxYT2Zmc2V0ID0gbWF0ZXJpYWxSZWZlcmVuY2UoJ3V2QW5pbWF0aW9uU2Nyb2xsWE9mZnNldCcsICdmbG9hdCcpO1xuZXhwb3J0IGNvbnN0IHJlZlVWQW5pbWF0aW9uU2Nyb2xsWU9mZnNldCA9IG1hdGVyaWFsUmVmZXJlbmNlKCd1dkFuaW1hdGlvblNjcm9sbFlPZmZzZXQnLCAnZmxvYXQnKTtcbmV4cG9ydCBjb25zdCByZWZVVkFuaW1hdGlvblJvdGF0aW9uUGhhc2UgPSBtYXRlcmlhbFJlZmVyZW5jZSgndXZBbmltYXRpb25Sb3RhdGlvblBoYXNlJywgJ2Zsb2F0Jyk7XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUvd2ViZ3B1JztcbmltcG9ydCB7IEJSREZfTGFtYmVydCwgZGlmZnVzZUNvbG9yLCBmbG9hdCwgbWl4LCBTaGFkZXJOb2RlT2JqZWN0LCB0cmFuc2Zvcm1lZE5vcm1hbFZpZXcsIHZlYzMgfSBmcm9tICd0aHJlZS90c2wnO1xuaW1wb3J0IHtcbiAgbWF0Y2FwLFxuICBwYXJhbWV0cmljUmltLFxuICByaW1MaWdodGluZ01peCxcbiAgcmltTXVsdGlwbHksXG4gIHNoYWRlQ29sb3IsXG4gIHNoYWRpbmdTaGlmdCxcbiAgc2hhZGluZ1Rvb255LFxufSBmcm9tICcuL2ltbXV0YWJsZU5vZGVzJztcbmltcG9ydCB7IEZuQ29tcGF0IH0gZnJvbSAnLi91dGlscy9GbkNvbXBhdCc7XG5cbi8vIFRPRE86IDAlIGNvbmZpZGVuY2UgYWJvdXQgZnVuY3Rpb24gdHlwZXMuXG5cbmNvbnN0IGxpbmVhcnN0ZXAgPSBGbkNvbXBhdChcbiAgKHtcbiAgICBhLFxuICAgIGIsXG4gICAgdCxcbiAgfToge1xuICAgIGE6IFNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT47XG4gICAgYjogU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPjtcbiAgICB0OiBTaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+O1xuICB9KSA9PiB7XG4gICAgY29uc3QgdG9wID0gdC5zdWIoYSk7XG4gICAgY29uc3QgYm90dG9tID0gYi5zdWIoYSk7XG4gICAgcmV0dXJuIHRvcC5kaXYoYm90dG9tKS5jbGFtcCgpO1xuICB9LFxuKTtcblxuLyoqXG4gKiBDb252ZXJ0IE5kb3RMIGludG8gdG9vbiBzaGFkaW5nIGZhY3RvciB1c2luZyBzaGFkaW5nU2hpZnQgYW5kIHNoYWRpbmdUb29ueVxuICovXG5jb25zdCBnZXRTaGFkaW5nID0gRm5Db21wYXQoKHsgZG90TkwgfTogeyBkb3ROTDogU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPiB9KSA9PiB7XG4gIGNvbnN0IHNoYWRvdyA9IDEuMDsgLy8gVE9ET1xuXG4gIGNvbnN0IGZlYXRoZXIgPSBmbG9hdCgxLjApLnN1YihzaGFkaW5nVG9vbnkpO1xuXG4gIGxldCBzaGFkaW5nOiBTaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+ID0gZG90TkwuYWRkKHNoYWRpbmdTaGlmdCk7XG4gIHNoYWRpbmcgPSBsaW5lYXJzdGVwKHtcbiAgICBhOiBmZWF0aGVyLm5lZ2F0ZSgpLFxuICAgIGI6IGZlYXRoZXIsXG4gICAgdDogc2hhZGluZyxcbiAgfSk7XG4gIHNoYWRpbmcgPSBzaGFkaW5nLm11bChzaGFkb3cpO1xuICByZXR1cm4gc2hhZGluZztcbn0pO1xuXG4vKipcbiAqIE1peCBkaWZmdXNlQ29sb3IgYW5kIHNoYWRlQ29sb3IgdXNpbmcgc2hhZGluZyBmYWN0b3IgYW5kIGxpZ2h0IGNvbG9yXG4gKi9cbmNvbnN0IGdldERpZmZ1c2UgPSBGbkNvbXBhdChcbiAgKHsgc2hhZGluZywgbGlnaHRDb2xvciB9OiB7IHNoYWRpbmc6IFNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT47IGxpZ2h0Q29sb3I6IFNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT4gfSkgPT4ge1xuICAgIGNvbnN0IGZlYXRoZXJlZCA9IG1peChzaGFkZUNvbG9yLCBkaWZmdXNlQ29sb3IsIHNoYWRpbmcpO1xuICAgIGNvbnN0IGNvbCA9IGxpZ2h0Q29sb3IubXVsKEJSREZfTGFtYmVydCh7IGRpZmZ1c2VDb2xvcjogZmVhdGhlcmVkIH0pKTtcblxuICAgIHJldHVybiBjb2w7XG4gIH0sXG4pO1xuXG5leHBvcnQgY2xhc3MgTVRvb25MaWdodGluZ01vZGVsIGV4dGVuZHMgVEhSRUUuTGlnaHRpbmdNb2RlbCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBkaXJlY3Qoe1xuICAgIGxpZ2h0RGlyZWN0aW9uLFxuICAgIGxpZ2h0Q29sb3IsXG4gICAgcmVmbGVjdGVkTGlnaHQsXG4gIH06IFRIUkVFLkxpZ2h0aW5nTW9kZWxEaXJlY3RJbnB1dCAmIHsgbGlnaHREaXJlY3Rpb246IFRIUkVFLk5vZGU7IGxpZ2h0Q29sb3I6IFRIUkVFLk5vZGUgfSkge1xuICAgIGNvbnN0IGRvdE5MID0gdHJhbnNmb3JtZWROb3JtYWxWaWV3LmRvdChsaWdodERpcmVjdGlvbikuY2xhbXAoLTEuMCwgMS4wKTtcblxuICAgIC8vIHRvb24gZGlmZnVzZVxuICAgIGNvbnN0IHNoYWRpbmcgPSBnZXRTaGFkaW5nKHtcbiAgICAgIGRvdE5MLFxuICAgIH0pO1xuXG4gICAgKHJlZmxlY3RlZExpZ2h0LmRpcmVjdERpZmZ1c2UgYXMgU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPikuYWRkQXNzaWduKFxuICAgICAgZ2V0RGlmZnVzZSh7XG4gICAgICAgIHNoYWRpbmcsXG4gICAgICAgIGxpZ2h0Q29sb3I6IGxpZ2h0Q29sb3IgYXMgU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPixcbiAgICAgIH0pLFxuICAgICk7XG5cbiAgICAvLyByaW1cbiAgICAocmVmbGVjdGVkTGlnaHQuZGlyZWN0U3BlY3VsYXIgYXMgU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPikuYWRkQXNzaWduKFxuICAgICAgcGFyYW1ldHJpY1JpbVxuICAgICAgICAuYWRkKG1hdGNhcClcbiAgICAgICAgLm11bChyaW1NdWx0aXBseSlcbiAgICAgICAgLm11bChtaXgodmVjMygwLjApLCBCUkRGX0xhbWJlcnQoeyBkaWZmdXNlQ29sb3I6IGxpZ2h0Q29sb3IgfSksIHJpbUxpZ2h0aW5nTWl4KSksXG4gICAgKTtcbiAgfVxuXG4gIC8vIENPTVBBVDogcHJlLXIxNzRcbiAgLy8gYGJ1aWxkZXJPckNvbnRleHRgOiBgVEhSRUUuTm9kZUJ1aWxkZXJgIGluID49IHIxNzQsIGBMaWdodGluZ01vZGVsSW5kaXJlY3RJbnB1dGAgKGBMaWdodGluZ0NvbnRleHRgKSBvdGhlcndpc2VcbiAgaW5kaXJlY3QoYnVpbGRlck9yQ29udGV4dDogVEhSRUUuTm9kZUJ1aWxkZXIgfCBUSFJFRS5MaWdodGluZ0NvbnRleHQpIHtcbiAgICBjb25zdCBjb250ZXh0OiBUSFJFRS5MaWdodGluZ0NvbnRleHQgPVxuICAgICAgJ2NvbnRleHQnIGluIGJ1aWxkZXJPckNvbnRleHQgPyAoYnVpbGRlck9yQ29udGV4dC5jb250ZXh0IGFzIHVua25vd24gYXMgVEhSRUUuTGlnaHRpbmdDb250ZXh0KSA6IGJ1aWxkZXJPckNvbnRleHQ7XG5cbiAgICB0aGlzLmluZGlyZWN0RGlmZnVzZShjb250ZXh0KTtcbiAgICB0aGlzLmluZGlyZWN0U3BlY3VsYXIoY29udGV4dCk7XG4gIH1cblxuICBpbmRpcmVjdERpZmZ1c2UoY29udGV4dDogVEhSRUUuTGlnaHRpbmdDb250ZXh0KSB7XG4gICAgY29uc3QgeyBpcnJhZGlhbmNlLCByZWZsZWN0ZWRMaWdodCB9ID0gY29udGV4dDtcblxuICAgIC8vIGluZGlyZWN0IGlycmFkaWFuY2VcbiAgICAocmVmbGVjdGVkTGlnaHQuaW5kaXJlY3REaWZmdXNlIGFzIFNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT4pLmFkZEFzc2lnbihcbiAgICAgIChpcnJhZGlhbmNlIGFzIFNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT4pLm11bChCUkRGX0xhbWJlcnQoeyBkaWZmdXNlQ29sb3IgfSkpLFxuICAgICk7XG4gIH1cblxuICBpbmRpcmVjdFNwZWN1bGFyKGNvbnRleHQ6IFRIUkVFLkxpZ2h0aW5nQ29udGV4dCkge1xuICAgIGNvbnN0IHsgcmVmbGVjdGVkTGlnaHQgfSA9IGNvbnRleHQ7XG5cbiAgICAvLyByaW1cbiAgICAocmVmbGVjdGVkTGlnaHQuaW5kaXJlY3RTcGVjdWxhciBhcyBTaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+KS5hZGRBc3NpZ24oXG4gICAgICBwYXJhbWV0cmljUmltXG4gICAgICAgIC5hZGQobWF0Y2FwKVxuICAgICAgICAubXVsKHJpbU11bHRpcGx5KVxuICAgICAgICAubXVsKG1peCh2ZWMzKDEuMCksIHZlYzMoMC4wKSwgcmltTGlnaHRpbmdNaXgpKSxcbiAgICApO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUvd2ViZ3B1JztcbmltcG9ydCB7IG5vZGVJbW11dGFibGUgfSBmcm9tICd0aHJlZS90c2wnO1xuXG5leHBvcnQgY29uc3Qgc2hhZGVDb2xvciA9IG5vZGVJbW11dGFibGUoVEhSRUUuUHJvcGVydHlOb2RlLCAndmVjMycpLnRvVmFyKCdTaGFkZUNvbG9yJyk7XG5leHBvcnQgY29uc3Qgc2hhZGluZ1NoaWZ0ID0gbm9kZUltbXV0YWJsZShUSFJFRS5Qcm9wZXJ0eU5vZGUsICdmbG9hdCcpLnRvVmFyKCdTaGFkaW5nU2hpZnQnKTtcbmV4cG9ydCBjb25zdCBzaGFkaW5nVG9vbnkgPSBub2RlSW1tdXRhYmxlKFRIUkVFLlByb3BlcnR5Tm9kZSwgJ2Zsb2F0JykudG9WYXIoJ1NoYWRpbmdUb29ueScpO1xuZXhwb3J0IGNvbnN0IHJpbUxpZ2h0aW5nTWl4ID0gbm9kZUltbXV0YWJsZShUSFJFRS5Qcm9wZXJ0eU5vZGUsICdmbG9hdCcpLnRvVmFyKCdSaW1MaWdodGluZ01peCcpO1xuZXhwb3J0IGNvbnN0IHJpbU11bHRpcGx5ID0gbm9kZUltbXV0YWJsZShUSFJFRS5Qcm9wZXJ0eU5vZGUsICd2ZWMzJykudG9WYXIoJ1JpbU11bHRpcGx5Jyk7XG5leHBvcnQgY29uc3QgbWF0Y2FwID0gbm9kZUltbXV0YWJsZShUSFJFRS5Qcm9wZXJ0eU5vZGUsICd2ZWMzJykudG9WYXIoJ21hdGNhcCcpO1xuZXhwb3J0IGNvbnN0IHBhcmFtZXRyaWNSaW0gPSBub2RlSW1tdXRhYmxlKFRIUkVFLlByb3BlcnR5Tm9kZSwgJ3ZlYzMnKS50b1ZhcignUGFyYW1ldHJpY1JpbScpO1xuIiwgImltcG9ydCAqIGFzIFRIUkVFX1RTTCBmcm9tICd0aHJlZS90c2wnO1xuaW1wb3J0ICogYXMgVEhSRUVfV0VCR1BVIGZyb20gJ3RocmVlL3dlYmdwdSc7XG5cbi8qKlxuICogQSBjb21wYXQgZnVuY3Rpb24gZm9yIGBGbigpYCAvIGB0c2xGbigpYC5cbiAqIGB0c2xGbigpYCBoYXMgYmVlbiByZW5hbWVkIHRvIGBGbigpYCBpbiByMTY4LlxuICogV2UgYXJlIGdvaW5nIHRvIHVzZSB0aGlzIGNvbXBhdCBmb3IgYSB3aGlsZS5cbiAqXG4gKiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvcHVsbC8yOTA2NFxuICovXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgRm5Db21wYXQ6IHR5cGVvZiBUSFJFRV9UU0wuRm4gPSAoanNGdW5jOiBhbnkpID0+IHtcbiAgLy8gQ09NUEFUIHIxNjg6IGB0c2xGbigpYCBoYXMgYmVlbiByZW5hbWVkIHRvIGBGbigpYFxuICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvcHVsbC8yOTA2NFxuICBjb25zdCB0aHJlZVJldmlzaW9uID0gcGFyc2VJbnQoVEhSRUVfV0VCR1BVLlJFVklTSU9OLCAxMCk7XG4gIGlmICh0aHJlZVJldmlzaW9uID49IDE2OCkge1xuICAgIHJldHVybiAoVEhSRUVfVFNMIGFzIGFueSkuRm4oanNGdW5jKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gKFRIUkVFX1dFQkdQVSBhcyBhbnkpLnRzbEZuKGpzRnVuYyk7XG4gIH1cbn07XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUvd2ViZ3B1JztcbmltcG9ydCB7XG4gIGNhbWVyYVByb2plY3Rpb25NYXRyaXgsXG4gIGRpZmZ1c2VDb2xvcixcbiAgZmxvYXQsXG4gIGxlbmd0aCxcbiAgbWF0Y2FwVVYsXG4gIG1hdGVyaWFsTm9ybWFsLFxuICBtaXgsXG4gIG1vZGVsTm9ybWFsTWF0cml4LFxuICBtb2RlbFZpZXdNYXRyaXgsXG4gIG5vcm1hbExvY2FsLFxuICBub3JtYWxNYXAsXG4gIHBvc2l0aW9uTG9jYWwsXG4gIHBvc2l0aW9uVmlldyxcbiAgU2hhZGVyTm9kZU9iamVjdCxcbiAgU3dpenphYmxlLFxuICB1bmlmb3JtLFxuICB2ZWMzLFxuICB2ZWM0LFxufSBmcm9tICd0aHJlZS90c2wnO1xuXG5pbXBvcnQgdHlwZSB7IE1Ub29uTWF0ZXJpYWwgfSBmcm9tICcuLi9NVG9vbk1hdGVyaWFsJztcbmltcG9ydCB7IE1Ub29uTGlnaHRpbmdNb2RlbCB9IGZyb20gJy4vTVRvb25MaWdodGluZ01vZGVsJztcbmltcG9ydCB7XG4gIHJpbUxpZ2h0aW5nTWl4LFxuICBtYXRjYXAsXG4gIHNoYWRlQ29sb3IsXG4gIHNoYWRpbmdTaGlmdCxcbiAgc2hhZGluZ1Rvb255LFxuICByaW1NdWx0aXBseSxcbiAgcGFyYW1ldHJpY1JpbSxcbn0gZnJvbSAnLi9pbW11dGFibGVOb2Rlcyc7XG5pbXBvcnQge1xuICByZWZDb2xvcixcbiAgcmVmRW1pc3NpdmUsXG4gIHJlZkVtaXNzaXZlSW50ZW5zaXR5LFxuICByZWZFbWlzc2l2ZU1hcCxcbiAgcmVmTWFwLFxuICByZWZNYXRjYXBGYWN0b3IsXG4gIHJlZk1hdGNhcFRleHR1cmUsXG4gIHJlZk5vcm1hbE1hcCxcbiAgcmVmTm9ybWFsU2NhbGUsXG4gIHJlZk91dGxpbmVDb2xvckZhY3RvcixcbiAgcmVmT3V0bGluZUxpZ2h0aW5nTWl4RmFjdG9yLFxuICByZWZPdXRsaW5lV2lkdGhGYWN0b3IsXG4gIHJlZk91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZSxcbiAgcmVmUGFyYW1ldHJpY1JpbUNvbG9yRmFjdG9yLFxuICByZWZQYXJhbWV0cmljUmltRnJlc25lbFBvd2VyRmFjdG9yLFxuICByZWZQYXJhbWV0cmljUmltTGlmdEZhY3RvcixcbiAgcmVmUmltTGlnaHRpbmdNaXhGYWN0b3IsXG4gIHJlZlJpbU11bHRpcGx5VGV4dHVyZSxcbiAgcmVmU2hhZGVDb2xvckZhY3RvcixcbiAgcmVmU2hhZGVNdWx0aXBseVRleHR1cmUsXG4gIHJlZlNoYWRlTXVsdGlwbHlUZXh0dXJlU2NhbGUsXG4gIHJlZlNoYWRpbmdTaGlmdEZhY3RvcixcbiAgcmVmU2hhZGluZ1Rvb255RmFjdG9yLFxufSBmcm9tICcuL21hdGVyaWFsUmVmZXJlbmNlcyc7XG5pbXBvcnQgeyBNVG9vbkFuaW1hdGVkVVZOb2RlIH0gZnJvbSAnLi9NVG9vbkFuaW1hdGVkVVZOb2RlJztcbmltcG9ydCB7IE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlIH0gZnJvbSAnLi4vTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUnO1xuaW1wb3J0IHsgTVRvb25Ob2RlTWF0ZXJpYWxQYXJhbWV0ZXJzIH0gZnJvbSAnLi9NVG9vbk5vZGVNYXRlcmlhbFBhcmFtZXRlcnMnO1xuaW1wb3J0IHsgbXRvb25QYXJhbWV0cmljUmltIH0gZnJvbSAnLi9tdG9vblBhcmFtZXRyaWNSaW0nO1xuXG4vKipcbiAqIE1Ub29uIGlzIGEgbWF0ZXJpYWwgc3BlY2lmaWNhdGlvbiB0aGF0IGhhcyB2YXJpb3VzIGZlYXR1cmVzLlxuICogVGhlIHNwZWMgYW5kIGltcGxlbWVudGF0aW9uIGFyZSBvcmlnaW5hbGx5IGZvdW5kZWQgZm9yIFVuaXR5IGVuZ2luZSBhbmQgdGhpcyBpcyBhIHBvcnQgb2YgdGhlIG1hdGVyaWFsLlxuICpcbiAqIFRoaXMgbWF0ZXJpYWwgaXMgYSBOb2RlTWF0ZXJpYWwgdmFyaWFudCBvZiB7QGxpbmsgTVRvb25NYXRlcmlhbH0uXG4gKlxuICogU2VlOiBodHRwczovL2dpdGh1Yi5jb20vU2FudGFyaC9NVG9vblxuICovXG5leHBvcnQgY2xhc3MgTVRvb25Ob2RlTWF0ZXJpYWwgZXh0ZW5kcyBUSFJFRS5Ob2RlTWF0ZXJpYWwge1xuICBwdWJsaWMgZW1pc3NpdmVOb2RlOiBTaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+IHwgbnVsbDtcblxuICBwdWJsaWMgY29sb3I6IFRIUkVFLkNvbG9yO1xuICBwdWJsaWMgbWFwOiBUSFJFRS5UZXh0dXJlIHwgbnVsbDtcbiAgcHVibGljIGVtaXNzaXZlOiBUSFJFRS5Db2xvcjtcbiAgcHVibGljIGVtaXNzaXZlSW50ZW5zaXR5OiBudW1iZXI7XG4gIHB1YmxpYyBlbWlzc2l2ZU1hcDogVEhSRUUuVGV4dHVyZSB8IG51bGw7XG4gIHB1YmxpYyBub3JtYWxNYXA6IFRIUkVFLlRleHR1cmUgfCBudWxsO1xuICBwdWJsaWMgbm9ybWFsU2NhbGU6IFRIUkVFLlZlY3RvcjI7XG5cbiAgcHVibGljIHNoYWRlQ29sb3JGYWN0b3I6IFRIUkVFLkNvbG9yO1xuICBwdWJsaWMgc2hhZGVNdWx0aXBseVRleHR1cmU6IFRIUkVFLlRleHR1cmUgfCBudWxsO1xuICBwdWJsaWMgc2hhZGluZ1NoaWZ0RmFjdG9yOiBudW1iZXI7XG4gIHB1YmxpYyBzaGFkaW5nU2hpZnRUZXh0dXJlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbDtcbiAgcHVibGljIHNoYWRpbmdTaGlmdFRleHR1cmVTY2FsZTogbnVtYmVyO1xuICBwdWJsaWMgc2hhZGluZ1Rvb255RmFjdG9yOiBudW1iZXI7XG4gIHB1YmxpYyByaW1MaWdodGluZ01peEZhY3RvcjogbnVtYmVyO1xuICBwdWJsaWMgcmltTXVsdGlwbHlUZXh0dXJlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbDtcbiAgcHVibGljIG1hdGNhcEZhY3RvcjogVEhSRUUuQ29sb3I7XG4gIHB1YmxpYyBtYXRjYXBUZXh0dXJlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbDtcbiAgcHVibGljIHBhcmFtZXRyaWNSaW1Db2xvckZhY3RvcjogVEhSRUUuQ29sb3I7XG4gIHB1YmxpYyBwYXJhbWV0cmljUmltTGlmdEZhY3RvcjogbnVtYmVyO1xuICBwdWJsaWMgcGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlckZhY3RvcjogbnVtYmVyO1xuICBwdWJsaWMgb3V0bGluZVdpZHRoTW9kZTogTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGU7XG4gIHB1YmxpYyBvdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmU6IFRIUkVFLlRleHR1cmUgfCBudWxsO1xuICBwdWJsaWMgb3V0bGluZVdpZHRoRmFjdG9yOiBudW1iZXI7XG4gIHB1YmxpYyBvdXRsaW5lQ29sb3JGYWN0b3I6IFRIUkVFLkNvbG9yO1xuICBwdWJsaWMgb3V0bGluZUxpZ2h0aW5nTWl4RmFjdG9yOiBudW1iZXI7XG4gIHB1YmxpYyB1dkFuaW1hdGlvblNjcm9sbFhTcGVlZEZhY3RvcjogbnVtYmVyO1xuICBwdWJsaWMgdXZBbmltYXRpb25TY3JvbGxZU3BlZWRGYWN0b3I6IG51bWJlcjtcbiAgcHVibGljIHV2QW5pbWF0aW9uUm90YXRpb25TcGVlZEZhY3RvcjogbnVtYmVyO1xuICBwdWJsaWMgdXZBbmltYXRpb25NYXNrVGV4dHVyZTogVEhSRUUuVGV4dHVyZSB8IG51bGw7XG5cbiAgcHVibGljIHNoYWRlQ29sb3JOb2RlOiBTd2l6emFibGUgfCBudWxsO1xuICBwdWJsaWMgc2hhZGluZ1NoaWZ0Tm9kZTogVEhSRUUuTm9kZSB8IG51bGw7XG4gIHB1YmxpYyBzaGFkaW5nVG9vbnlOb2RlOiBUSFJFRS5Ob2RlIHwgbnVsbDtcbiAgcHVibGljIHJpbUxpZ2h0aW5nTWl4Tm9kZTogVEhSRUUuTm9kZSB8IG51bGw7XG4gIHB1YmxpYyByaW1NdWx0aXBseU5vZGU6IFRIUkVFLk5vZGUgfCBudWxsO1xuICBwdWJsaWMgbWF0Y2FwTm9kZTogVEhSRUUuTm9kZSB8IG51bGw7XG4gIHB1YmxpYyBwYXJhbWV0cmljUmltQ29sb3JOb2RlOiBTd2l6emFibGUgfCBudWxsO1xuICBwdWJsaWMgcGFyYW1ldHJpY1JpbUxpZnROb2RlOiBUSFJFRS5Ob2RlIHwgbnVsbDtcbiAgcHVibGljIHBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJOb2RlOiBUSFJFRS5Ob2RlIHwgbnVsbDtcblxuICBwdWJsaWMgdXZBbmltYXRpb25TY3JvbGxYT2Zmc2V0OiBudW1iZXI7XG4gIHB1YmxpYyB1dkFuaW1hdGlvblNjcm9sbFlPZmZzZXQ6IG51bWJlcjtcbiAgcHVibGljIHV2QW5pbWF0aW9uUm90YXRpb25QaGFzZTogbnVtYmVyO1xuXG4gIHB1YmxpYyBpc091dGxpbmU6IGJvb2xlYW47XG5cbiAgcHJpdmF0ZSBfYW5pbWF0ZWRVVk5vZGU6IE1Ub29uQW5pbWF0ZWRVVk5vZGUgfCBudWxsO1xuXG4gIHB1YmxpYyBjdXN0b21Qcm9ncmFtQ2FjaGVLZXkoKTogc3RyaW5nIHtcbiAgICBsZXQgY2FjaGVLZXkgPSBzdXBlci5jdXN0b21Qcm9ncmFtQ2FjaGVLZXkoKTtcblxuICAgIGNhY2hlS2V5ICs9IGBpc091dGxpbmU6JHt0aGlzLmlzT3V0bGluZX0sYDtcblxuICAgIHJldHVybiBjYWNoZUtleTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWFkb25seSBib29sZWFuIHRoYXQgaW5kaWNhdGVzIHRoaXMgaXMgYSB7QGxpbmsgTVRvb25Ob2RlTWF0ZXJpYWx9LlxuICAgKi9cbiAgcHVibGljIGdldCBpc01Ub29uTm9kZU1hdGVyaWFsKCk6IHRydWUge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBhcmFtZXRlcnM6IE1Ub29uTm9kZU1hdGVyaWFsUGFyYW1ldGVycyA9IHt9KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIGlmIChwYXJhbWV0ZXJzLnRyYW5zcGFyZW50V2l0aFpXcml0ZSkge1xuICAgICAgcGFyYW1ldGVycy5kZXB0aFdyaXRlID0gdHJ1ZTtcbiAgICB9XG4gICAgZGVsZXRlIHBhcmFtZXRlcnMudHJhbnNwYXJlbnRXaXRoWldyaXRlO1xuXG4gICAgLy8gYE1Ub29uTWF0ZXJpYWxMb2FkZXJQbHVnaW5gIGFzc2lnbnMgdGhlc2UgcGFyYW1ldGVycyB0byB0aGUgbWF0ZXJpYWxcbiAgICAvLyBIb3dldmVyLCBgTVRvb25Ob2RlTWF0ZXJpYWxgIGRvZXMgbm90IHN1cHBvcnQgdGhlc2UgcGFyYW1ldGVyc1xuICAgIC8vIHNvIHdlIGRlbGV0ZSB0aGVtIGhlcmUgdG8gc3VwcHJlc3Mgd2FybmluZ3NcbiAgICBkZWxldGUgKHBhcmFtZXRlcnMgYXMgYW55KS5naUVxdWFsaXphdGlvbkZhY3RvcjtcbiAgICBkZWxldGUgKHBhcmFtZXRlcnMgYXMgYW55KS52MENvbXBhdFNoYWRlO1xuICAgIGRlbGV0ZSAocGFyYW1ldGVycyBhcyBhbnkpLmRlYnVnTW9kZTtcblxuICAgIHRoaXMuZW1pc3NpdmVOb2RlID0gbnVsbDtcblxuICAgIHRoaXMubGlnaHRzID0gdHJ1ZTtcblxuICAgIHRoaXMuY29sb3IgPSBuZXcgVEhSRUUuQ29sb3IoMS4wLCAxLjAsIDEuMCk7XG4gICAgdGhpcy5tYXAgPSBudWxsO1xuICAgIHRoaXMuZW1pc3NpdmUgPSBuZXcgVEhSRUUuQ29sb3IoMC4wLCAwLjAsIDAuMCk7XG4gICAgdGhpcy5lbWlzc2l2ZUludGVuc2l0eSA9IDEuMDtcbiAgICB0aGlzLmVtaXNzaXZlTWFwID0gbnVsbDtcbiAgICB0aGlzLm5vcm1hbE1hcCA9IG51bGw7XG4gICAgdGhpcy5ub3JtYWxTY2FsZSA9IG5ldyBUSFJFRS5WZWN0b3IyKDEuMCwgMS4wKTtcbiAgICB0aGlzLnNoYWRlQ29sb3JGYWN0b3IgPSBuZXcgVEhSRUUuQ29sb3IoMC4wLCAwLjAsIDAuMCk7XG4gICAgdGhpcy5zaGFkZU11bHRpcGx5VGV4dHVyZSA9IG51bGw7XG4gICAgdGhpcy5zaGFkaW5nU2hpZnRGYWN0b3IgPSAwLjA7XG4gICAgdGhpcy5zaGFkaW5nU2hpZnRUZXh0dXJlID0gbnVsbDtcbiAgICB0aGlzLnNoYWRpbmdTaGlmdFRleHR1cmVTY2FsZSA9IDEuMDtcbiAgICB0aGlzLnNoYWRpbmdUb29ueUZhY3RvciA9IDAuOTtcbiAgICB0aGlzLnJpbUxpZ2h0aW5nTWl4RmFjdG9yID0gMS4wO1xuICAgIHRoaXMucmltTXVsdGlwbHlUZXh0dXJlID0gbnVsbDtcbiAgICB0aGlzLm1hdGNhcEZhY3RvciA9IG5ldyBUSFJFRS5Db2xvcigxLjAsIDEuMCwgMS4wKTtcbiAgICB0aGlzLm1hdGNhcFRleHR1cmUgPSBudWxsO1xuICAgIHRoaXMucGFyYW1ldHJpY1JpbUNvbG9yRmFjdG9yID0gbmV3IFRIUkVFLkNvbG9yKDAuMCwgMC4wLCAwLjApO1xuICAgIHRoaXMucGFyYW1ldHJpY1JpbUxpZnRGYWN0b3IgPSAwLjA7XG4gICAgdGhpcy5wYXJhbWV0cmljUmltRnJlc25lbFBvd2VyRmFjdG9yID0gNS4wO1xuICAgIHRoaXMub3V0bGluZVdpZHRoTW9kZSA9IE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlLk5vbmU7XG4gICAgdGhpcy5vdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmUgPSBudWxsO1xuICAgIHRoaXMub3V0bGluZVdpZHRoRmFjdG9yID0gMC4wO1xuICAgIHRoaXMub3V0bGluZUNvbG9yRmFjdG9yID0gbmV3IFRIUkVFLkNvbG9yKDAuMCwgMC4wLCAwLjApO1xuICAgIHRoaXMub3V0bGluZUxpZ2h0aW5nTWl4RmFjdG9yID0gMS4wO1xuICAgIHRoaXMudXZBbmltYXRpb25TY3JvbGxYU3BlZWRGYWN0b3IgPSAwLjA7XG4gICAgdGhpcy51dkFuaW1hdGlvblNjcm9sbFlTcGVlZEZhY3RvciA9IDAuMDtcbiAgICB0aGlzLnV2QW5pbWF0aW9uUm90YXRpb25TcGVlZEZhY3RvciA9IDAuMDtcbiAgICB0aGlzLnV2QW5pbWF0aW9uTWFza1RleHR1cmUgPSBudWxsO1xuXG4gICAgdGhpcy5zaGFkZUNvbG9yTm9kZSA9IG51bGw7XG4gICAgdGhpcy5zaGFkaW5nU2hpZnROb2RlID0gbnVsbDtcbiAgICB0aGlzLnNoYWRpbmdUb29ueU5vZGUgPSBudWxsO1xuICAgIHRoaXMucmltTGlnaHRpbmdNaXhOb2RlID0gbnVsbDtcbiAgICB0aGlzLnJpbU11bHRpcGx5Tm9kZSA9IG51bGw7XG4gICAgdGhpcy5tYXRjYXBOb2RlID0gbnVsbDtcbiAgICB0aGlzLnBhcmFtZXRyaWNSaW1Db2xvck5vZGUgPSBudWxsO1xuICAgIHRoaXMucGFyYW1ldHJpY1JpbUxpZnROb2RlID0gbnVsbDtcbiAgICB0aGlzLnBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJOb2RlID0gbnVsbDtcblxuICAgIHRoaXMudXZBbmltYXRpb25TY3JvbGxYT2Zmc2V0ID0gMC4wO1xuICAgIHRoaXMudXZBbmltYXRpb25TY3JvbGxZT2Zmc2V0ID0gMC4wO1xuICAgIHRoaXMudXZBbmltYXRpb25Sb3RhdGlvblBoYXNlID0gMC4wO1xuXG4gICAgdGhpcy5pc091dGxpbmUgPSBmYWxzZTtcblxuICAgIHRoaXMuX2FuaW1hdGVkVVZOb2RlID0gbnVsbDtcblxuICAgIHRoaXMuc2V0VmFsdWVzKHBhcmFtZXRlcnMpO1xuICB9XG5cbiAgcHVibGljIHNldHVwTGlnaHRpbmdNb2RlbCgvKmJ1aWxkZXIqLyk6IE1Ub29uTGlnaHRpbmdNb2RlbCB7XG4gICAgcmV0dXJuIG5ldyBNVG9vbkxpZ2h0aW5nTW9kZWwoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXR1cChidWlsZGVyOiBUSFJFRS5Ob2RlQnVpbGRlcik6IHZvaWQge1xuICAgIHRoaXMuX2FuaW1hdGVkVVZOb2RlID0gbmV3IE1Ub29uQW5pbWF0ZWRVVk5vZGUoXG4gICAgICAodGhpcy51dkFuaW1hdGlvbk1hc2tUZXh0dXJlICYmIHRoaXMudXZBbmltYXRpb25NYXNrVGV4dHVyZS5pc1RleHR1cmUgPT09IHRydWUpID8/IGZhbHNlLFxuICAgICk7XG5cbiAgICBzdXBlci5zZXR1cChidWlsZGVyKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXR1cERpZmZ1c2VDb2xvcihidWlsZGVyOiBUSFJFRS5Ob2RlQnVpbGRlcik6IHZvaWQge1xuICAgIC8vIHdlIG11c3QgYXBwbHkgdXYgc2Nyb2xsIHRvIHRoZSBtYXBcbiAgICAvLyB0aGlzLmNvbG9yTm9kZSB3aWxsIGJlIHVzZWQgaW4gc3VwZXIuc2V0dXBEaWZmdXNlQ29sb3IoKSBzbyB3ZSB0ZW1wb3JhcmlseSByZXBsYWNlIGl0XG4gICAgbGV0IHRlbXBDb2xvck5vZGU6IFNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT4gfCBudWxsID0gbnVsbDtcblxuICAgIGlmICh0aGlzLmNvbG9yTm9kZSA9PSBudWxsKSB7XG4gICAgICB0ZW1wQ29sb3JOb2RlID0gcmVmQ29sb3I7XG5cbiAgICAgIGlmICh0aGlzLm1hcCAmJiB0aGlzLm1hcC5pc1RleHR1cmUgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3QgbWFwID0gcmVmTWFwLmNvbnRleHQoeyBnZXRVVjogKCkgPT4gdGhpcy5fYW5pbWF0ZWRVVk5vZGUgfSk7XG4gICAgICAgIHRlbXBDb2xvck5vZGUgPSB0ZW1wQ29sb3JOb2RlLm11bChtYXApO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNvbG9yTm9kZSA9IHRlbXBDb2xvck5vZGU7XG4gICAgfVxuXG4gICAgLy8gTVRvb24gbXVzdCBpZ25vcmUgdmVydGV4IGNvbG9yIGJ5IHNwZWNcbiAgICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS92cm0tYy92cm0tc3BlY2lmaWNhdGlvbi9ibG9iLzQyYzBhOTBlNmI0YjcxMDM1MjU2OTk3OGYxNDk4MGU5ZmM5NGIyNWQvc3BlY2lmaWNhdGlvbi9WUk1DX21hdGVyaWFsc19tdG9vbi0xLjAvUkVBRE1FLm1kI3ZlcnRleC1jb2xvcnNcbiAgICBpZiAodGhpcy52ZXJ0ZXhDb2xvcnMgPT09IHRydWUgJiYgYnVpbGRlci5nZW9tZXRyeS5oYXNBdHRyaWJ1dGUoJ2NvbG9yJykpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgJ01Ub29uTm9kZU1hdGVyaWFsOiBNVG9vbiBpZ25vcmVzIHZlcnRleCBjb2xvcnMuIENvbnNpZGVyIHVzaW5nIGEgbW9kZWwgd2l0aG91dCB2ZXJ0ZXggY29sb3JzIGluc3RlYWQuJyxcbiAgICAgICk7XG4gICAgICB0aGlzLnZlcnRleENvbG9ycyA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8vIHRoZSBvcmRpbmFyeSBkaWZmdXNlQ29sb3Igc2V0dXBcbiAgICBzdXBlci5zZXR1cERpZmZ1c2VDb2xvcihidWlsZGVyKTtcblxuICAgIC8vIENPTVBBVDogcHJlLXIxNjZcbiAgICAvLyBTZXQgYWxwaGEgdG8gMSBpZiBpdCBpcyBvcGFxdWVcbiAgICAvLyBBZGRyZXNzZWQgaW4gVGhyZWUuanMgcjE2NiBidXQgd2UgbGVhdmUgaXQgaGVyZSBmb3IgY29tcGF0aWJpbGl0eVxuICAgIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9wdWxsLzI4NjQ2XG4gICAgaWYgKHBhcnNlSW50KFRIUkVFLlJFVklTSU9OLCAxMCkgPCAxNjYpIHtcbiAgICAgIGlmICh0aGlzLnRyYW5zcGFyZW50ID09PSBmYWxzZSAmJiB0aGlzLmJsZW5kaW5nID09PSBUSFJFRS5Ob3JtYWxCbGVuZGluZyAmJiB0aGlzLmFscGhhVG9Db3ZlcmFnZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgZGlmZnVzZUNvbG9yLmEuYXNzaWduKDEuMCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gcmV2ZXJ0IHRoZSBjb2xvck5vZGVcbiAgICBpZiAodGhpcy5jb2xvck5vZGUgPT09IHRlbXBDb2xvck5vZGUpIHtcbiAgICAgIHRoaXMuY29sb3JOb2RlID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2V0dXBWYXJpYW50cygpOiB2b2lkIHtcbiAgICBzaGFkZUNvbG9yLmFzc2lnbih0aGlzLl9zZXR1cFNoYWRlQ29sb3JOb2RlKCkpO1xuICAgIHNoYWRpbmdTaGlmdC5hc3NpZ24odGhpcy5fc2V0dXBTaGFkaW5nU2hpZnROb2RlKCkpO1xuICAgIHNoYWRpbmdUb29ueS5hc3NpZ24odGhpcy5fc2V0dXBTaGFkaW5nVG9vbnlOb2RlKCkpO1xuICAgIHJpbUxpZ2h0aW5nTWl4LmFzc2lnbih0aGlzLl9zZXR1cFJpbUxpZ2h0aW5nTWl4Tm9kZSgpKTtcbiAgICByaW1NdWx0aXBseS5hc3NpZ24odGhpcy5fc2V0dXBSaW1NdWx0aXBseU5vZGUoKSk7XG4gICAgbWF0Y2FwLmFzc2lnbih0aGlzLl9zZXR1cE1hdGNhcE5vZGUoKSk7XG4gICAgcGFyYW1ldHJpY1JpbS5hc3NpZ24odGhpcy5fc2V0dXBQYXJhbWV0cmljUmltTm9kZSgpKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXR1cE5vcm1hbCgpOiBTaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+O1xuICBwdWJsaWMgc2V0dXBOb3JtYWwoYnVpbGRlcj86IFRIUkVFLk5vZGVCdWlsZGVyKTogU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPjtcbiAgcHVibGljIHNldHVwTm9ybWFsKGJ1aWxkZXI/OiBUSFJFRS5Ob2RlQnVpbGRlcik6IFNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT4ge1xuICAgIC8vIHdlIG11c3QgYXBwbHkgdXYgc2Nyb2xsIHRvIHRoZSBub3JtYWxNYXBcbiAgICAvLyB0aGlzLm5vcm1hbE5vZGUgd2lsbCBiZSB1c2VkIGluIHN1cGVyLnNldHVwTm9ybWFsKCkgc28gd2UgdGVtcG9yYXJpbHkgcmVwbGFjZSBpdFxuICAgIGNvbnN0IHRlbXBOb3JtYWxOb2RlID0gdGhpcy5ub3JtYWxOb2RlO1xuXG4gICAgaWYgKHRoaXMubm9ybWFsTm9kZSA9PSBudWxsKSB7XG4gICAgICB0aGlzLm5vcm1hbE5vZGUgPSBtYXRlcmlhbE5vcm1hbDtcblxuICAgICAgaWYgKHRoaXMubm9ybWFsTWFwICYmIHRoaXMubm9ybWFsTWFwLmlzVGV4dHVyZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBtYXAgPSByZWZOb3JtYWxNYXAuY29udGV4dCh7IGdldFVWOiAoKSA9PiB0aGlzLl9hbmltYXRlZFVWTm9kZSB9KTtcbiAgICAgICAgdGhpcy5ub3JtYWxOb2RlID0gbm9ybWFsTWFwKG1hcCwgcmVmTm9ybWFsU2NhbGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5pc091dGxpbmUpIHtcbiAgICAgICAgLy8gU2VlIGFib3V0IHRoZSB0eXBlIGFzc2VydGlvbjogaHR0cHM6Ly9naXRodWIuY29tL3RocmVlLXR5cGVzL3RocmVlLXRzLXR5cGVzL3B1bGwvMTEyM1xuICAgICAgICB0aGlzLm5vcm1hbE5vZGUgPSAodGhpcy5ub3JtYWxOb2RlIGFzIFNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT4pLm5lZ2F0ZSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIENPTVBBVCByMTY4OiBgc2V0dXBOb3JtYWxgIG5vdyByZXR1cm5zIHRoZSBub3JtYWwgbm9kZVxuICAgIC8vIGluc3RlYWQgb2YgYXNzaWduaW5nIGluc2lkZSB0aGUgYHN1cGVyLnNldHVwTm9ybWFsYFxuICAgIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9wdWxsLzI5MTM3XG4gICAgY29uc3QgdGhyZWVSZXZpc2lvbiA9IHBhcnNlSW50KFRIUkVFLlJFVklTSU9OLCAxMCk7XG4gICAgaWYgKHRocmVlUmV2aXNpb24gPj0gMTY4KSB7XG4gICAgICBjb25zdCByZXQgPSB0aGlzLm5vcm1hbE5vZGUgYXMgU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPjtcblxuICAgICAgLy8gcmV2ZXJ0IHRoZSBub3JtYWxOb2RlXG4gICAgICB0aGlzLm5vcm1hbE5vZGUgPSB0ZW1wTm9ybWFsTm9kZTtcblxuICAgICAgcmV0dXJuIHJldDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gcHJlLXIxNjhcbiAgICAgIC8vIHRoZSBvcmRpbmFyeSBub3JtYWwgc2V0dXBcblxuICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciB0eXBlIHdvcmthcm91bmQgZm9yIHByZS1yMTY4XG4gICAgICBzdXBlci5zZXR1cE5vcm1hbChidWlsZGVyKTtcblxuICAgICAgLy8gcmV2ZXJ0IHRoZSBub3JtYWxOb2RlXG4gICAgICB0aGlzLm5vcm1hbE5vZGUgPSB0ZW1wTm9ybWFsTm9kZTtcblxuICAgICAgLy8gdHlwZSB3b3JrYXJvdW5kOiBwcmV0ZW5kIHRvIHJldHVybiBhIHZhbGlkIHZhbHVlXG4gICAgICAvLyByMTY3IGRvZXNuJ3QgdXNlIHRoZSByZXR1cm4gdmFsdWUgYW55d2F5XG4gICAgICByZXR1cm4gdW5kZWZpbmVkIGFzIGFueTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2V0dXBMaWdodGluZyhidWlsZGVyOiBUSFJFRS5Ob2RlQnVpbGRlcik6IFRIUkVFLk5vZGUge1xuICAgIC8vIHdlIG11c3QgYXBwbHkgdXYgc2Nyb2xsIHRvIHRoZSBlbWlzc2l2ZU1hcFxuICAgIC8vIHRoaXMuZW1pc3NpdmVOb2RlIHdpbGwgYmUgdXNlZCBpbiBzdXBlci5zZXR1cExpZ2h0aW5nKCkgc28gd2UgdGVtcG9yYXJpbHkgcmVwbGFjZSBpdFxuICAgIGxldCB0ZW1wRW1pc3NpdmVOb2RlOiBTaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+IHwgbnVsbCA9IG51bGw7XG5cbiAgICBpZiAodGhpcy5lbWlzc2l2ZU5vZGUgPT0gbnVsbCkge1xuICAgICAgdGVtcEVtaXNzaXZlTm9kZSA9IHJlZkVtaXNzaXZlLm11bChyZWZFbWlzc2l2ZUludGVuc2l0eSk7XG5cbiAgICAgIGlmICh0aGlzLmVtaXNzaXZlTWFwICYmIHRoaXMuZW1pc3NpdmVNYXAuaXNUZXh0dXJlID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IG1hcCA9IHJlZkVtaXNzaXZlTWFwLmNvbnRleHQoeyBnZXRVVjogKCkgPT4gdGhpcy5fYW5pbWF0ZWRVVk5vZGUgfSk7XG4gICAgICAgIHRlbXBFbWlzc2l2ZU5vZGUgPSB0ZW1wRW1pc3NpdmVOb2RlLm11bChtYXApO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmVtaXNzaXZlTm9kZSA9IHRlbXBFbWlzc2l2ZU5vZGU7XG4gICAgfVxuXG4gICAgLy8gdGhlIG9yZGluYXJ5IGxpZ2h0aW5nIHNldHVwXG4gICAgY29uc3QgcmV0ID0gc3VwZXIuc2V0dXBMaWdodGluZyhidWlsZGVyKTtcblxuICAgIC8vIHJldmVydCB0aGUgZW1pc3NpdmVOb2RlXG4gICAgaWYgKHRoaXMuZW1pc3NpdmVOb2RlID09PSB0ZW1wRW1pc3NpdmVOb2RlKSB7XG4gICAgICB0aGlzLmVtaXNzaXZlTm9kZSA9IG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIHB1YmxpYyBzZXR1cE91dHB1dChcbiAgICBidWlsZGVyOiBUSFJFRS5Ob2RlQnVpbGRlcixcbiAgICBvdXRwdXROb2RlOiBTaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+LFxuICApOiBTaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+IHtcbiAgICAvLyBtaXggb3Igc2V0IG91dGxpbmUgY29sb3JcbiAgICBpZiAodGhpcy5pc091dGxpbmUgJiYgdGhpcy5vdXRsaW5lV2lkdGhNb2RlICE9PSBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZS5Ob25lKSB7XG4gICAgICBvdXRwdXROb2RlID0gdmVjNChcbiAgICAgICAgbWl4KHJlZk91dGxpbmVDb2xvckZhY3Rvciwgb3V0cHV0Tm9kZS54eXoubXVsKHJlZk91dGxpbmVDb2xvckZhY3RvciksIHJlZk91dGxpbmVMaWdodGluZ01peEZhY3RvciksXG4gICAgICAgIG91dHB1dE5vZGUudyxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gdGhlIG9yZGluYXJ5IG91dHB1dCBzZXR1cFxuICAgIHJldHVybiBzdXBlci5zZXR1cE91dHB1dChidWlsZGVyLCBvdXRwdXROb2RlKSBhcyBTaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+O1xuICB9XG5cbiAgcHVibGljIHNldHVwUG9zaXRpb24oYnVpbGRlcjogVEhSRUUuTm9kZUJ1aWxkZXIpOiBTaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+IHtcbiAgICAvLyB3ZSBtdXN0IGFwcGx5IG91dGxpbmUgcG9zaXRpb24gb2Zmc2V0XG4gICAgLy8gdGhpcy5wb3NpdGlvbk5vZGUgd2lsbCBiZSB1c2VkIGluIHN1cGVyLnNldHVwUG9zaXRpb24oKSBzbyB3ZSB0ZW1wb3JhcmlseSByZXBsYWNlIGl0XG4gICAgY29uc3QgdGVtcFBvc2l0aW9uTm9kZSA9IHRoaXMucG9zaXRpb25Ob2RlO1xuXG4gICAgaWYgKHRoaXMuaXNPdXRsaW5lICYmIHRoaXMub3V0bGluZVdpZHRoTW9kZSAhPT0gTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUuTm9uZSkge1xuICAgICAgdGhpcy5wb3NpdGlvbk5vZGUgPz89IHBvc2l0aW9uTG9jYWw7XG5cbiAgICAgIGNvbnN0IG5vcm1hbExvY2FsTm9ybWFsaXplZCA9IG5vcm1hbExvY2FsLm5vcm1hbGl6ZSgpO1xuXG4gICAgICBsZXQgd2lkdGg6IFNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT4gPSByZWZPdXRsaW5lV2lkdGhGYWN0b3I7XG5cbiAgICAgIGlmICh0aGlzLm91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZSAmJiB0aGlzLm91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZS5pc1RleHR1cmUgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3QgbWFwID0gcmVmT3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlLmNvbnRleHQoeyBnZXRVVjogKCkgPT4gdGhpcy5fYW5pbWF0ZWRVVk5vZGUgfSk7XG4gICAgICAgIHdpZHRoID0gd2lkdGgubXVsKG1hcCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHdvcmxkTm9ybWFsTGVuZ3RoID0gbGVuZ3RoKG1vZGVsTm9ybWFsTWF0cml4Lm11bChub3JtYWxMb2NhbE5vcm1hbGl6ZWQpKTtcbiAgICAgIGNvbnN0IG91dGxpbmVPZmZzZXQgPSB3aWR0aC5tdWwod29ybGROb3JtYWxMZW5ndGgpLm11bChub3JtYWxMb2NhbE5vcm1hbGl6ZWQpO1xuXG4gICAgICBpZiAodGhpcy5vdXRsaW5lV2lkdGhNb2RlID09PSBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZS5Xb3JsZENvb3JkaW5hdGVzKSB7XG4gICAgICAgIC8vIFNlZSBhYm91dCB0aGUgdHlwZSBhc3NlcnRpb246IGh0dHBzOi8vZ2l0aHViLmNvbS90aHJlZS10eXBlcy90aHJlZS10cy10eXBlcy9wdWxsLzExMjNcbiAgICAgICAgdGhpcy5wb3NpdGlvbk5vZGUgPSAodGhpcy5wb3NpdGlvbk5vZGUgYXMgU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPikuYWRkKG91dGxpbmVPZmZzZXQpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLm91dGxpbmVXaWR0aE1vZGUgPT09IE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlLlNjcmVlbkNvb3JkaW5hdGVzKSB7XG4gICAgICAgIGNvbnN0IGNsaXBTY2FsZSA9IGNhbWVyYVByb2plY3Rpb25NYXRyaXguZWxlbWVudCgxKS5lbGVtZW50KDEpO1xuXG4gICAgICAgIC8vIFdlIGNhbid0IHVzZSBgcG9zaXRpb25WaWV3YCBpbiBgc2V0dXBQb3NpdGlvbmBcbiAgICAgICAgLy8gYmVjYXVzZSB1c2luZyBgcG9zaXRpb25WaWV3YCBoZXJlIHdpbGwgbWFrZSBpdCBjYWxjdWxhdGUgdGhlIGBwb3NpdGlvblZpZXdgIGVhcmxpZXJcbiAgICAgICAgLy8gYW5kIGl0IHdvbid0IGJlIGNhbGN1bGF0ZWQgYWdhaW4gYWZ0ZXIgc2V0dGluZyB0aGUgYHBvc2l0aW9uTm9kZWBcbiAgICAgICAgY29uc3QgdGVtcFBvc2l0aW9uVmlldyA9IG1vZGVsVmlld01hdHJpeC5tdWwocG9zaXRpb25Mb2NhbCk7XG5cbiAgICAgICAgLy8gU2VlIGFib3V0IHRoZSB0eXBlIGFzc2VydGlvbjogaHR0cHM6Ly9naXRodWIuY29tL3RocmVlLXR5cGVzL3RocmVlLXRzLXR5cGVzL3B1bGwvMTEyM1xuICAgICAgICB0aGlzLnBvc2l0aW9uTm9kZSA9ICh0aGlzLnBvc2l0aW9uTm9kZSBhcyBTaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+KS5hZGQoXG4gICAgICAgICAgb3V0bGluZU9mZnNldC5kaXYoY2xpcFNjYWxlKS5tdWwodGVtcFBvc2l0aW9uVmlldy56Lm5lZ2F0ZSgpKSxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5wb3NpdGlvbk5vZGUgPz89IHBvc2l0aW9uTG9jYWw7XG4gICAgfVxuXG4gICAgLy8gdGhlIG9yZGluYXJ5IHBvc2l0aW9uIHNldHVwXG4gICAgY29uc3QgcmV0ID0gc3VwZXIuc2V0dXBQb3NpdGlvbihidWlsZGVyKSBhcyBTaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+O1xuXG4gICAgLy8gYW50aSB6LWZpZ2h0aW5nXG4gICAgLy8gVE9ETzogV2UgbWlnaHQgd2FudCB0byBhZGRyZXNzIHRoaXMgdmlhIGdsUG9seWdvbk9mZnNldCBpbnN0ZWFkP1xuICAgIHJldC56LmFkZChyZXQudy5tdWwoMWUtNikpO1xuXG4gICAgLy8gcmV2ZXJ0IHRoZSBwb3NpdGlvbk5vZGVcbiAgICB0aGlzLnBvc2l0aW9uTm9kZSA9IHRlbXBQb3NpdGlvbk5vZGU7XG5cbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgcHVibGljIGNvcHkoc291cmNlOiBNVG9vbk5vZGVNYXRlcmlhbCk6IHRoaXMge1xuICAgIHRoaXMuY29sb3IuY29weShzb3VyY2UuY29sb3IpO1xuICAgIHRoaXMubWFwID0gc291cmNlLm1hcCA/PyBudWxsO1xuICAgIHRoaXMuZW1pc3NpdmUuY29weShzb3VyY2UuZW1pc3NpdmUpO1xuICAgIHRoaXMuZW1pc3NpdmVJbnRlbnNpdHkgPSBzb3VyY2UuZW1pc3NpdmVJbnRlbnNpdHk7XG4gICAgdGhpcy5lbWlzc2l2ZU1hcCA9IHNvdXJjZS5lbWlzc2l2ZU1hcCA/PyBudWxsO1xuICAgIHRoaXMubm9ybWFsTWFwID0gc291cmNlLm5vcm1hbE1hcCA/PyBudWxsO1xuICAgIHRoaXMubm9ybWFsU2NhbGUuY29weShzb3VyY2Uubm9ybWFsU2NhbGUpO1xuXG4gICAgdGhpcy5zaGFkZUNvbG9yRmFjdG9yLmNvcHkoc291cmNlLnNoYWRlQ29sb3JGYWN0b3IpO1xuICAgIHRoaXMuc2hhZGVNdWx0aXBseVRleHR1cmUgPSBzb3VyY2Uuc2hhZGVNdWx0aXBseVRleHR1cmUgPz8gbnVsbDtcbiAgICB0aGlzLnNoYWRpbmdTaGlmdEZhY3RvciA9IHNvdXJjZS5zaGFkaW5nU2hpZnRGYWN0b3I7XG4gICAgdGhpcy5zaGFkaW5nU2hpZnRUZXh0dXJlID0gc291cmNlLnNoYWRpbmdTaGlmdFRleHR1cmUgPz8gbnVsbDtcbiAgICB0aGlzLnNoYWRpbmdTaGlmdFRleHR1cmVTY2FsZSA9IHNvdXJjZS5zaGFkaW5nU2hpZnRUZXh0dXJlU2NhbGU7XG4gICAgdGhpcy5zaGFkaW5nVG9vbnlGYWN0b3IgPSBzb3VyY2Uuc2hhZGluZ1Rvb255RmFjdG9yO1xuICAgIHRoaXMucmltTGlnaHRpbmdNaXhGYWN0b3IgPSBzb3VyY2UucmltTGlnaHRpbmdNaXhGYWN0b3I7XG4gICAgdGhpcy5yaW1NdWx0aXBseVRleHR1cmUgPSBzb3VyY2UucmltTXVsdGlwbHlUZXh0dXJlID8/IG51bGw7XG4gICAgdGhpcy5tYXRjYXBGYWN0b3IuY29weShzb3VyY2UubWF0Y2FwRmFjdG9yKTtcbiAgICB0aGlzLm1hdGNhcFRleHR1cmUgPSBzb3VyY2UubWF0Y2FwVGV4dHVyZSA/PyBudWxsO1xuICAgIHRoaXMucGFyYW1ldHJpY1JpbUNvbG9yRmFjdG9yLmNvcHkoc291cmNlLnBhcmFtZXRyaWNSaW1Db2xvckZhY3Rvcik7XG4gICAgdGhpcy5wYXJhbWV0cmljUmltTGlmdEZhY3RvciA9IHNvdXJjZS5wYXJhbWV0cmljUmltTGlmdEZhY3RvcjtcbiAgICB0aGlzLnBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJGYWN0b3IgPSBzb3VyY2UucGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlckZhY3RvcjtcbiAgICB0aGlzLm91dGxpbmVXaWR0aE1vZGUgPSBzb3VyY2Uub3V0bGluZVdpZHRoTW9kZTtcbiAgICB0aGlzLm91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZSA9IHNvdXJjZS5vdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmUgPz8gbnVsbDtcbiAgICB0aGlzLm91dGxpbmVXaWR0aEZhY3RvciA9IHNvdXJjZS5vdXRsaW5lV2lkdGhGYWN0b3I7XG4gICAgdGhpcy5vdXRsaW5lQ29sb3JGYWN0b3IuY29weShzb3VyY2Uub3V0bGluZUNvbG9yRmFjdG9yKTtcbiAgICB0aGlzLm91dGxpbmVMaWdodGluZ01peEZhY3RvciA9IHNvdXJjZS5vdXRsaW5lTGlnaHRpbmdNaXhGYWN0b3I7XG4gICAgdGhpcy51dkFuaW1hdGlvblNjcm9sbFhTcGVlZEZhY3RvciA9IHNvdXJjZS51dkFuaW1hdGlvblNjcm9sbFhTcGVlZEZhY3RvcjtcbiAgICB0aGlzLnV2QW5pbWF0aW9uU2Nyb2xsWVNwZWVkRmFjdG9yID0gc291cmNlLnV2QW5pbWF0aW9uU2Nyb2xsWVNwZWVkRmFjdG9yO1xuICAgIHRoaXMudXZBbmltYXRpb25Sb3RhdGlvblNwZWVkRmFjdG9yID0gc291cmNlLnV2QW5pbWF0aW9uUm90YXRpb25TcGVlZEZhY3RvcjtcbiAgICB0aGlzLnV2QW5pbWF0aW9uTWFza1RleHR1cmUgPSBzb3VyY2UudXZBbmltYXRpb25NYXNrVGV4dHVyZSA/PyBudWxsO1xuXG4gICAgdGhpcy5zaGFkZUNvbG9yTm9kZSA9IHNvdXJjZS5zaGFkZUNvbG9yTm9kZSA/PyBudWxsO1xuICAgIHRoaXMuc2hhZGluZ1NoaWZ0Tm9kZSA9IHNvdXJjZS5zaGFkaW5nU2hpZnROb2RlID8/IG51bGw7XG4gICAgdGhpcy5zaGFkaW5nVG9vbnlOb2RlID0gc291cmNlLnNoYWRpbmdUb29ueU5vZGUgPz8gbnVsbDtcbiAgICB0aGlzLnJpbUxpZ2h0aW5nTWl4Tm9kZSA9IHNvdXJjZS5yaW1MaWdodGluZ01peE5vZGUgPz8gbnVsbDtcbiAgICB0aGlzLnJpbU11bHRpcGx5Tm9kZSA9IHNvdXJjZS5yaW1NdWx0aXBseU5vZGUgPz8gbnVsbDtcbiAgICB0aGlzLm1hdGNhcE5vZGUgPSBzb3VyY2UubWF0Y2FwTm9kZSA/PyBudWxsO1xuICAgIHRoaXMucGFyYW1ldHJpY1JpbUNvbG9yTm9kZSA9IHNvdXJjZS5wYXJhbWV0cmljUmltQ29sb3JOb2RlID8/IG51bGw7XG4gICAgdGhpcy5wYXJhbWV0cmljUmltTGlmdE5vZGUgPSBzb3VyY2UucGFyYW1ldHJpY1JpbUxpZnROb2RlID8/IG51bGw7XG4gICAgdGhpcy5wYXJhbWV0cmljUmltRnJlc25lbFBvd2VyTm9kZSA9IHNvdXJjZS5wYXJhbWV0cmljUmltRnJlc25lbFBvd2VyTm9kZSA/PyBudWxsO1xuXG4gICAgdGhpcy5pc091dGxpbmUgPSBzb3VyY2UuaXNPdXRsaW5lID8/IG51bGw7XG5cbiAgICByZXR1cm4gc3VwZXIuY29weShzb3VyY2UpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZShkZWx0YTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy51dkFuaW1hdGlvblNjcm9sbFhPZmZzZXQgKz0gZGVsdGEgKiB0aGlzLnV2QW5pbWF0aW9uU2Nyb2xsWFNwZWVkRmFjdG9yO1xuICAgIHRoaXMudXZBbmltYXRpb25TY3JvbGxZT2Zmc2V0ICs9IGRlbHRhICogdGhpcy51dkFuaW1hdGlvblNjcm9sbFlTcGVlZEZhY3RvcjtcbiAgICB0aGlzLnV2QW5pbWF0aW9uUm90YXRpb25QaGFzZSArPSBkZWx0YSAqIHRoaXMudXZBbmltYXRpb25Sb3RhdGlvblNwZWVkRmFjdG9yO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0dXBTaGFkZUNvbG9yTm9kZSgpOiBTd2l6emFibGUge1xuICAgIGlmICh0aGlzLnNoYWRlQ29sb3JOb2RlICE9IG51bGwpIHtcbiAgICAgIHJldHVybiB2ZWMzKHRoaXMuc2hhZGVDb2xvck5vZGUpO1xuICAgIH1cblxuICAgIGxldCBzaGFkZUNvbG9yTm9kZTogU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPiA9IHJlZlNoYWRlQ29sb3JGYWN0b3I7XG5cbiAgICBpZiAodGhpcy5zaGFkZU11bHRpcGx5VGV4dHVyZSAmJiB0aGlzLnNoYWRlTXVsdGlwbHlUZXh0dXJlLmlzVGV4dHVyZSA9PT0gdHJ1ZSkge1xuICAgICAgY29uc3QgbWFwID0gcmVmU2hhZGVNdWx0aXBseVRleHR1cmUuY29udGV4dCh7IGdldFVWOiAoKSA9PiB0aGlzLl9hbmltYXRlZFVWTm9kZSB9KTtcbiAgICAgIHNoYWRlQ29sb3JOb2RlID0gc2hhZGVDb2xvck5vZGUubXVsKG1hcCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNoYWRlQ29sb3JOb2RlO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0dXBTaGFkaW5nU2hpZnROb2RlKCk6IFRIUkVFLk5vZGUge1xuICAgIGlmICh0aGlzLnNoYWRpbmdTaGlmdE5vZGUgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGZsb2F0KHRoaXMuc2hhZGluZ1NoaWZ0Tm9kZSk7XG4gICAgfVxuXG4gICAgbGV0IHNoYWRpbmdTaGlmdE5vZGU6IFNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT4gPSByZWZTaGFkaW5nU2hpZnRGYWN0b3I7XG5cbiAgICBpZiAodGhpcy5zaGFkaW5nU2hpZnRUZXh0dXJlICYmIHRoaXMuc2hhZGluZ1NoaWZ0VGV4dHVyZS5pc1RleHR1cmUgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IG1hcCA9IHJlZlNoYWRlTXVsdGlwbHlUZXh0dXJlLmNvbnRleHQoeyBnZXRVVjogKCkgPT4gdGhpcy5fYW5pbWF0ZWRVVk5vZGUgfSk7XG4gICAgICBzaGFkaW5nU2hpZnROb2RlID0gc2hhZGluZ1NoaWZ0Tm9kZS5hZGQobWFwLm11bChyZWZTaGFkZU11bHRpcGx5VGV4dHVyZVNjYWxlKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNoYWRpbmdTaGlmdE5vZGU7XG4gIH1cblxuICBwcml2YXRlIF9zZXR1cFNoYWRpbmdUb29ueU5vZGUoKTogVEhSRUUuTm9kZSB7XG4gICAgaWYgKHRoaXMuc2hhZGluZ1Rvb255Tm9kZSAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gZmxvYXQodGhpcy5zaGFkaW5nVG9vbnlOb2RlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVmU2hhZGluZ1Rvb255RmFjdG9yO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0dXBSaW1MaWdodGluZ01peE5vZGUoKTogVEhSRUUuTm9kZSB7XG4gICAgaWYgKHRoaXMucmltTGlnaHRpbmdNaXhOb2RlICE9IG51bGwpIHtcbiAgICAgIHJldHVybiBmbG9hdCh0aGlzLnJpbUxpZ2h0aW5nTWl4Tm9kZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlZlJpbUxpZ2h0aW5nTWl4RmFjdG9yO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0dXBSaW1NdWx0aXBseU5vZGUoKTogU3dpenphYmxlIHtcbiAgICBpZiAodGhpcy5yaW1NdWx0aXBseU5vZGUgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHZlYzModGhpcy5yaW1NdWx0aXBseU5vZGUpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnJpbU11bHRpcGx5VGV4dHVyZSAmJiB0aGlzLnJpbU11bHRpcGx5VGV4dHVyZS5pc1RleHR1cmUgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IG1hcCA9IHJlZlJpbU11bHRpcGx5VGV4dHVyZS5jb250ZXh0KHsgZ2V0VVY6ICgpID0+IHRoaXMuX2FuaW1hdGVkVVZOb2RlIH0pO1xuICAgICAgcmV0dXJuIG1hcDtcbiAgICB9XG5cbiAgICByZXR1cm4gdmVjMygxLjApO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0dXBNYXRjYXBOb2RlKCk6IFN3aXp6YWJsZSB7XG4gICAgaWYgKHRoaXMubWF0Y2FwTm9kZSAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gdmVjMyh0aGlzLm1hdGNhcE5vZGUpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm1hdGNhcFRleHR1cmUgJiYgdGhpcy5tYXRjYXBUZXh0dXJlLmlzVGV4dHVyZSA9PT0gdHJ1ZSkge1xuICAgICAgY29uc3QgbWFwID0gcmVmTWF0Y2FwVGV4dHVyZS5jb250ZXh0KHsgZ2V0VVY6ICgpID0+IG1hdGNhcFVWLm11bCgxLjAsIC0xLjApLmFkZCgwLjAsIDEuMCkgfSk7XG4gICAgICByZXR1cm4gbWFwLm11bChyZWZNYXRjYXBGYWN0b3IpO1xuICAgIH1cblxuICAgIHJldHVybiB2ZWMzKDAuMCk7XG4gIH1cblxuICBwcml2YXRlIF9zZXR1cFBhcmFtZXRyaWNSaW1Ob2RlKCk6IFN3aXp6YWJsZSB7XG4gICAgY29uc3QgcGFyYW1ldHJpY1JpbUNvbG9yID1cbiAgICAgIHRoaXMucGFyYW1ldHJpY1JpbUNvbG9yTm9kZSAhPSBudWxsID8gdmVjMyh0aGlzLnBhcmFtZXRyaWNSaW1Db2xvck5vZGUpIDogcmVmUGFyYW1ldHJpY1JpbUNvbG9yRmFjdG9yO1xuXG4gICAgY29uc3QgcGFyYW1ldHJpY1JpbUxpZnQgPVxuICAgICAgdGhpcy5wYXJhbWV0cmljUmltTGlmdE5vZGUgIT0gbnVsbCA/IGZsb2F0KHRoaXMucGFyYW1ldHJpY1JpbUxpZnROb2RlKSA6IHJlZlBhcmFtZXRyaWNSaW1MaWZ0RmFjdG9yO1xuXG4gICAgY29uc3QgcGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlciA9XG4gICAgICB0aGlzLnBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJOb2RlICE9IG51bGxcbiAgICAgICAgPyBmbG9hdCh0aGlzLnBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJOb2RlKVxuICAgICAgICA6IHJlZlBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJGYWN0b3I7XG5cbiAgICByZXR1cm4gbXRvb25QYXJhbWV0cmljUmltKHtcbiAgICAgIHBhcmFtZXRyaWNSaW1MaWZ0LFxuICAgICAgcGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlcixcbiAgICAgIHBhcmFtZXRyaWNSaW1Db2xvcixcbiAgICB9KTtcbiAgfVxufVxuXG4vLyBUT0RPOiBQYXJ0IG9mIHN0dWZmIHRoYXQgTVRvb25NYXRlcmlhbCBkZXBlbmRzIG9uIGRvZXMgbm90IGV4aXN0IGluIHRocmVlL3dlYmdwdSAoZS5nLiBVbmlmb3Jtc0xpYilcbi8vIFRIUkVFLmFkZE5vZGVNYXRlcmlhbCgnTVRvb25Ob2RlTWF0ZXJpYWwnLCBNVG9vbk5vZGVNYXRlcmlhbCk7XG4iLCAiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uICovXG5cbmV4cG9ydCBjb25zdCBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZSA9IHtcbiAgTm9uZTogJ25vbmUnLFxuICBXb3JsZENvb3JkaW5hdGVzOiAnd29ybGRDb29yZGluYXRlcycsXG4gIFNjcmVlbkNvb3JkaW5hdGVzOiAnc2NyZWVuQ29vcmRpbmF0ZXMnLFxufSBhcyBjb25zdDtcblxuZXhwb3J0IHR5cGUgTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUgPVxuICAodHlwZW9mIE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlKVtrZXlvZiB0eXBlb2YgTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGVdO1xuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlL3dlYmdwdSc7XG5pbXBvcnQgeyBmbG9hdCwgbW9kZWxWaWV3UG9zaXRpb24sIHRyYW5zZm9ybWVkTm9ybWFsVmlldyB9IGZyb20gJ3RocmVlL3RzbCc7XG5pbXBvcnQgeyBGbkNvbXBhdCB9IGZyb20gJy4vdXRpbHMvRm5Db21wYXQnO1xuXG5leHBvcnQgY29uc3QgbXRvb25QYXJhbWV0cmljUmltID0gRm5Db21wYXQoXG4gICh7XG4gICAgcGFyYW1ldHJpY1JpbUxpZnQsXG4gICAgcGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlcixcbiAgICBwYXJhbWV0cmljUmltQ29sb3IsXG4gIH06IHtcbiAgICBwYXJhbWV0cmljUmltTGlmdDogVEhSRUUuVFNMLk9wZXJhdG9yTm9kZVBhcmFtZXRlcjtcbiAgICBwYXJhbWV0cmljUmltRnJlc25lbFBvd2VyOiBUSFJFRS5UU0wuT3BlcmF0b3JOb2RlUGFyYW1ldGVyO1xuICAgIHBhcmFtZXRyaWNSaW1Db2xvcjogVEhSRUUuVFNMLk9wZXJhdG9yTm9kZVBhcmFtZXRlcjtcbiAgfSkgPT4ge1xuICAgIGNvbnN0IHZpZXdEaXIgPSBtb2RlbFZpZXdQb3NpdGlvbi5ub3JtYWxpemUoKTtcbiAgICBjb25zdCBkb3ROViA9IHRyYW5zZm9ybWVkTm9ybWFsVmlldy5kb3Qodmlld0Rpci5uZWdhdGUoKSk7XG5cbiAgICBjb25zdCByaW0gPSBmbG9hdCgxLjApLnN1Yihkb3ROVikuYWRkKHBhcmFtZXRyaWNSaW1MaWZ0KS5jbGFtcCgpLnBvdyhwYXJhbWV0cmljUmltRnJlc25lbFBvd2VyKTtcblxuICAgIHJldHVybiByaW0ubXVsKHBhcmFtZXRyaWNSaW1Db2xvcik7XG4gIH0sXG4pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7O0FDR0EsWUFBdUI7QUNIdkIsYUFBdUI7QUFDdkIsaUJBQTRFO0FDRDVFLElBQUFBLGNBQWtDO0FDQWxDLGFBQXVCO0FBQ3ZCLElBQUFBLGNBQXNHO0FDRHRHLGFBQXVCO0FBQ3ZCLElBQUFBLGNBQThCO0FDRDlCLGdCQUEyQjtBQUMzQixtQkFBOEI7QUNEOUIsYUFBdUI7QUFDdkIsSUFBQUEs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LFFBQUksS0FBSyxvQkFBb0IsTUFBTTtBQUNqQyxpQkFBT0osWUFBQUEsT0FBTSxLQUFLLGdCQUFnQjtJQUNwQztBQUVBLFFBQUksbUJBQWlEO0FBRXJELFFBQUksS0FBSyx1QkFBdUIsS0FBSyxvQkFBb0IsY0FBYyxNQUFNO0FBQzNFLFlBQU0sTUFBTSx3QkFBd0IsUUFBUSxFQUFFLE9BQU8sTUFBTSxLQUFLLGdCQUFnQixDQUFDO0FBQ2pGLHlCQUFtQixpQkFBaUIsSUFBSSxJQUFJLElBQUksNEJBQTRCLENBQUM7SUFDL0U7QUFFQSxXQUFPO0VBQ1Q7RUFFUSx5QkFBcUM7QUFDM0MsUUFBSSxLQUFLLG9CQUFvQixNQUFNO0FBQ2pDLGlCQUFPQSxZQUFBQSxPQUFNLEtBQUssZ0JBQWdCO0lBQ3BDO0FBRUEsV0FBTztFQUNUO0VBRVEsMkJBQXVDO0FBQzdDLFFBQUksS0FBSyxzQkFBc0IsTUFBTTtBQUNuQyxpQkFBT0EsWUFBQUEsT0FBTSxLQUFLLGtCQUFrQjtJQUN0QztBQUVBLFdBQU87RUFDVDtFQUVRLHdCQUFtQztBQUN6QyxRQUFJLEtBQUssbUJBQW1CLE1BQU07QUFDaEMsaUJBQU9JLFlBQUFBLE1BQUssS0FBSyxlQUFlO0lBQ2xDO0FBRUEsUUFBSSxLQUFLLHNCQUFzQixLQUFLLG1CQUFtQixjQUFjLE1BQU07QUFDekUsWUFBTSxNQUFNLHNCQUFzQixRQUFRLEVBQUUsT0FBTyxNQUFNLEtBQUssZ0JBQWdCLENBQUM7QUFDL0UsYUFBTztJQUNUO0FBRUEsZUFBT0EsWUFBQUEsTUFBSyxDQUFHO0VBQ2pCO0VBRVEsbUJBQThCO0FBQ3BDLFFBQUksS0FBSyxjQUFjLE1BQU07QUFDM0IsaUJBQU9BLFlBQUFBLE1BQUssS0FBSyxVQUFVO0lBQzdCO0FBRUEsUUFBSSxLQUFLLGlCQUFpQixLQUFLLGNBQWMsY0FBYyxNQUFNO0FBQy9ELFlBQU0sTUFBTSxpQkFBaUIsUUFBUSxFQUFFLE9BQU8sTUFBTSxxQkFBUyxJQUFJLEdBQUssRUFBSSxFQUFFLElBQUksR0FBSyxDQUFHLEVBQUUsQ0FBQztBQUMzRixhQUFPLElBQUksSUFBSSxlQUFlO0lBQ2hDO0FBRUEsZUFBT0EsWUFBQUEsTUFBSyxDQUFHO0VBQ2pCO0VBRVEsMEJBQXFDO0FBQzNDLFVBQU0scUJBQ0osS0FBSywwQkFBMEIsV0FBT0EsWUFBQUEsTUFBSyxLQUFLLHNCQUFzQixJQUFJO0FBRTVFLFVBQU0sb0JBQ0osS0FBSyx5QkFBeUIsV0FBT0osWUFBQUEsT0FBTSxLQUFLLHFCQUFxQixJQUFJO0FBRTNFLFVBQU0sNEJBQ0osS0FBSyxpQ0FBaUMsV0FDbENBLFlBQUFBLE9BQU0sS0FBSyw2QkFBNkIsSUFDeEM7QUFFTixXQUFPLG1CQUFtQjtNQUN4QjtNQUNBO01BQ0E7SUFDRixDQUFDO0VBQ0g7QUFDRjsiLAogICJuYW1lcyI6IFsiaW1wb3J0X3RzbCIsICJ0aHJlZVJldmlzaW9uIiwgInRyYW5zZm9ybWVkTm9ybWFsVmlldyIsICJmbG9hdCIsICJkaWZmdXNlQ29sb3IiLCAidmVjNCIsICJtaXgiLCAidmVjMyJdCn0K
