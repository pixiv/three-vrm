/*!
 * @pixiv/three-vrm v3.0.0-beta.2
 * VRM file loader for three.js.
 *
 * Copyright (c) 2019-2024 pixiv Inc.
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
var THREE3 = __toESM(require("three/webgpu"), 1);
var THREE2 = __toESM(require("three/webgpu"), 1);
var THREE5 = __toESM(require("three/webgpu"), 1);
var THREE4 = __toESM(require("three/webgpu"), 1);
var THREE7 = __toESM(require("three/webgpu"), 1);
var THREE6 = __toESM(require("three/webgpu"), 1);
var threeRevision = parseInt(THREE.REVISION, 10);
if (threeRevision < 167) {
  console.warn(
    `MToonNodeMaterial requires Three.js r167 or higher (You are using r${threeRevision}). This would not work correctly.`
  );
}
var refColor = THREE2.materialReference("color", "color");
var refMap = THREE2.materialReference("map", "texture");
var refNormalMap = THREE2.materialReference("normalMap", "texture");
var refNormalScale = THREE2.materialReference("normalScale", "vec2");
var refEmissive = THREE2.materialReference("emissive", "color");
var refEmissiveIntensity = THREE2.materialReference("emissiveIntensity", "float");
var refEmissiveMap = THREE2.materialReference("emissiveMap", "texture");
var refShadeColorFactor = THREE2.materialReference("shadeColorFactor", "color");
var refShadingShiftFactor = THREE2.materialReference("shadingShiftFactor", "float");
var refShadeMultiplyTexture = THREE2.materialReference("shadeMultiplyTexture", "texture");
var refShadeMultiplyTextureScale = THREE2.materialReference("shadeMultiplyTextureScale", "float");
var refShadingToonyFactor = THREE2.materialReference("shadingToonyFactor", "float");
var refRimLightingMixFactor = THREE2.materialReference("rimLightingMixFactor", "float");
var refRimMultiplyTexture = THREE2.materialReference("rimMultiplyTexture", "texture");
var refMatcapFactor = THREE2.materialReference("matcapFactor", "color");
var refMatcapTexture = THREE2.materialReference("matcapTexture", "texture");
var refParametricRimColorFactor = THREE2.materialReference("parametricRimColorFactor", "color");
var refParametricRimLiftFactor = THREE2.materialReference("parametricRimLiftFactor", "float");
var refParametricRimFresnelPowerFactor = THREE2.materialReference("parametricRimFresnelPowerFactor", "float");
var refOutlineWidthMultiplyTexture = THREE2.materialReference("outlineWidthMultiplyTexture", "texture");
var refOutlineWidthFactor = THREE2.materialReference("outlineWidthFactor", "float");
var refOutlineColorFactor = THREE2.materialReference("outlineColorFactor", "color");
var refOutlineLightingMixFactor = THREE2.materialReference("outlineLightingMixFactor", "float");
var refUVAnimationMaskTexture = THREE2.materialReference("uvAnimationMaskTexture", "texture");
var refUVAnimationScrollXOffset = THREE2.materialReference("uvAnimationScrollXOffset", "float");
var refUVAnimationScrollYOffset = THREE2.materialReference("uvAnimationScrollYOffset", "float");
var refUVAnimationRotationPhase = THREE2.materialReference("uvAnimationRotationPhase", "float");
var MToonAnimatedUVNode = class extends THREE3.TempNode {
  constructor(hasMaskTexture) {
    super("vec2");
    this.hasMaskTexture = hasMaskTexture;
  }
  setup() {
    let uvAnimationMask = 1;
    if (this.hasMaskTexture) {
      uvAnimationMask = THREE3.vec4(refUVAnimationMaskTexture).context({ getUV: () => THREE3.uv() }).r;
    }
    let uv2 = THREE3.uv();
    const phase = refUVAnimationRotationPhase.mul(uvAnimationMask);
    const c = THREE3.cos(phase);
    const s = THREE3.sin(phase);
    uv2 = uv2.sub(THREE3.vec2(0.5, 0.5));
    uv2 = uv2.mul(THREE3.mat2(c, s, s.negate(), c));
    uv2 = uv2.add(THREE3.vec2(0.5, 0.5));
    const scroll = THREE3.vec2(refUVAnimationScrollXOffset, refUVAnimationScrollYOffset).mul(uvAnimationMask);
    uv2 = uv2.add(scroll);
    return uv2.temp("AnimatedUV");
  }
};
var shadeColor = THREE4.nodeImmutable(THREE4.PropertyNode, "vec3").temp("ShadeColor");
var shadingShift = THREE4.nodeImmutable(THREE4.PropertyNode, "float").temp("ShadingShift");
var shadingToony = THREE4.nodeImmutable(THREE4.PropertyNode, "float").temp("ShadingToony");
var rimLightingMix = THREE4.nodeImmutable(THREE4.PropertyNode, "float").temp("RimLightingMix");
var rimMultiply = THREE4.nodeImmutable(THREE4.PropertyNode, "vec3").temp("RimMultiply");
var matcap = THREE4.nodeImmutable(THREE4.PropertyNode, "vec3").temp("matcap");
var parametricRim = THREE4.nodeImmutable(THREE4.PropertyNode, "vec3").temp("ParametricRim");
var linearstep = THREE5.tslFn(
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
var getShading = THREE5.tslFn(({ dotNL }) => {
  const shadow = 1;
  const feather = THREE5.float(1).sub(shadingToony);
  let shading = dotNL.add(shadingShift);
  shading = linearstep({
    a: feather.negate(),
    b: feather,
    t: shading
  });
  shading = shading.mul(shadow);
  return shading;
});
var getDiffuse = THREE5.tslFn(
  ({
    shading,
    lightColor
  }) => {
    const diffuseColor3 = THREE5.mix(shadeColor, THREE5.diffuseColor, shading);
    const col = lightColor.mul(THREE5.BRDF_Lambert({ diffuseColor: diffuseColor3 }));
    return col;
  }
);
var MToonLightingModel = class extends THREE5.LightingModel {
  constructor() {
    super();
  }
  direct({ lightDirection, lightColor, reflectedLight }) {
    const dotNL = THREE5.transformedNormalView.dot(lightDirection).clamp(-1, 1);
    const shading = getShading({
      dotNL
    });
    reflectedLight.directDiffuse.assign(
      reflectedLight.directDiffuse.add(
        getDiffuse({
          shading,
          lightColor
        })
      )
    );
    reflectedLight.directSpecular.assign(
      reflectedLight.directSpecular.add(
        parametricRim.add(matcap).mul(rimMultiply).mul(THREE5.mix(THREE5.vec3(0), THREE5.BRDF_Lambert({ diffuseColor: lightColor }), rimLightingMix))
      )
    );
  }
  indirect(context) {
    this.indirectDiffuse(context);
    this.indirectSpecular(context);
  }
  indirectDiffuse({ irradiance, reflectedLight }) {
    reflectedLight.indirectDiffuse.assign(
      reflectedLight.indirectDiffuse.add(
        irradiance.mul(
          THREE5.BRDF_Lambert({
            diffuseColor: THREE5.diffuseColor
          })
        )
      )
    );
  }
  indirectSpecular({ reflectedLight }) {
    reflectedLight.indirectSpecular.assign(
      reflectedLight.indirectSpecular.add(
        parametricRim.add(matcap).mul(rimMultiply).mul(THREE5.mix(THREE5.vec3(1), THREE5.vec3(0), rimLightingMix))
      )
    );
  }
};
var MToonMaterialOutlineWidthMode = {
  None: "none",
  WorldCoordinates: "worldCoordinates",
  ScreenCoordinates: "screenCoordinates"
};
var mtoonParametricRim = THREE6.tslFn(
  ({
    parametricRimLift,
    parametricRimFresnelPower,
    parametricRimColor
  }) => {
    const viewDir = THREE6.modelViewPosition.normalize();
    const dotNV = THREE6.transformedNormalView.dot(viewDir.negate());
    const rim = THREE6.float(1).sub(dotNV).add(parametricRimLift).clamp().pow(parametricRimFresnelPower);
    return rim.mul(parametricRimColor);
  }
);
var MToonNodeMaterial = class extends THREE7.NodeMaterial {
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
    this.color = new THREE7.Color(1, 1, 1);
    this.map = null;
    this.emissive = new THREE7.Color(0, 0, 0);
    this.emissiveIntensity = 1;
    this.emissiveMap = null;
    this.normalMap = null;
    this.normalScale = new THREE7.Vector2(1, 1);
    this.shadeColorFactor = new THREE7.Color(0, 0, 0);
    this.shadeMultiplyTexture = null;
    this.shadingShiftFactor = 0;
    this.shadingShiftTexture = null;
    this.shadingShiftTextureScale = 1;
    this.shadingToonyFactor = 0.9;
    this.rimLightingMixFactor = 1;
    this.rimMultiplyTexture = null;
    this.matcapFactor = new THREE7.Color(1, 1, 1);
    this.matcapTexture = null;
    this.parametricRimColorFactor = new THREE7.Color(0, 0, 0);
    this.parametricRimLiftFactor = 0;
    this.parametricRimFresnelPowerFactor = 5;
    this.outlineWidthMode = MToonMaterialOutlineWidthMode.None;
    this.outlineWidthMultiplyTexture = null;
    this.outlineWidthFactor = 0;
    this.outlineColorFactor = new THREE7.Color(0, 0, 0);
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
    if (parseInt(THREE7.REVISION, 10) < 166) {
      if (this.transparent === false && this.blending === THREE7.NormalBlending && this.alphaToCoverage === false) {
        THREE7.diffuseColor.a.assign(1);
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
      this.normalNode = THREE7.materialNormal;
      if (this.normalMap && this.normalMap.isTexture === true) {
        const map = refNormalMap.context({ getUV: () => this._animatedUVNode });
        this.normalNode = map.normalMap(refNormalScale);
      }
      if (this.isOutline) {
        this.normalNode = this.normalNode.negate();
      }
    }
    super.setupNormal(builder);
    this.normalNode = tempNormalNode;
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
      outputNode = THREE7.vec4(
        THREE7.mix(refOutlineColorFactor, outputNode.xyz.mul(refOutlineColorFactor), refOutlineLightingMixFactor),
        outputNode.w
      );
    }
    return super.setupOutput(builder, outputNode);
  }
  setupPosition(builder) {
    var _a, _b;
    const tempPositionNode = this.positionNode;
    if (this.isOutline && this.outlineWidthMode !== MToonMaterialOutlineWidthMode.None) {
      (_a = this.positionNode) != null ? _a : this.positionNode = THREE7.positionLocal;
      const normalLocal2 = THREE7.normalLocal.normalize();
      let width = refOutlineWidthFactor;
      if (this.outlineWidthMultiplyTexture && this.outlineWidthMultiplyTexture.isTexture === true) {
        const map = refOutlineWidthMultiplyTexture.context({ getUV: () => this._animatedUVNode });
        width = width.mul(map);
      }
      const worldNormalLength = THREE7.length(THREE7.modelNormalMatrix.mul(normalLocal2));
      const outlineOffset = width.mul(worldNormalLength).mul(normalLocal2);
      if (this.outlineWidthMode === MToonMaterialOutlineWidthMode.WorldCoordinates) {
        this.positionNode = this.positionNode.add(outlineOffset);
      } else if (this.outlineWidthMode === MToonMaterialOutlineWidthMode.ScreenCoordinates) {
        const clipScale = THREE7.cameraProjectionMatrix.element(1).element(1);
        this.positionNode = this.positionNode.add(
          outlineOffset.div(clipScale).mul(THREE7.positionView.z.negate())
        );
      }
      (_b = this.positionNode) != null ? _b : this.positionNode = THREE7.positionLocal;
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
      return THREE7.vec3(this.shadeColorNode);
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
      return THREE7.float(this.shadingShiftNode);
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
      return THREE7.float(this.shadingToonyNode);
    }
    return refShadingToonyFactor;
  }
  _setupRimLightingMixNode() {
    if (this.rimLightingMixNode != null) {
      return THREE7.float(this.rimLightingMixNode);
    }
    return refRimLightingMixFactor;
  }
  _setupRimMultiplyNode() {
    if (this.rimMultiplyNode != null) {
      return THREE7.vec3(this.rimMultiplyNode);
    }
    if (this.rimMultiplyTexture && this.rimMultiplyTexture.isTexture === true) {
      const map = refRimMultiplyTexture.context({ getUV: () => this._animatedUVNode });
      return map;
    }
    return THREE7.vec3(1);
  }
  _setupMatcapNode() {
    if (this.matcapNode != null) {
      return THREE7.vec3(this.matcapNode);
    }
    if (this.matcapTexture && this.matcapTexture.isTexture === true) {
      const map = refMatcapTexture.context({ getUV: () => THREE7.matcapUV.mul(1, -1).add(0, 1) });
      return map.mul(refMatcapFactor);
    }
    return THREE7.vec3(0);
  }
  _setupParametricRimNode() {
    const parametricRimColor = this.parametricRimColorNode != null ? THREE7.vec3(this.parametricRimColorNode) : refParametricRimColorFactor;
    const parametricRimLift = this.parametricRimLiftNode != null ? THREE7.float(this.parametricRimLiftNode) : refParametricRimLiftFactor;
    const parametricRimFresnelPower = this.parametricRimFresnelPowerNode != null ? THREE7.float(this.parametricRimFresnelPowerNode) : refParametricRimFresnelPowerFactor;
    return mtoonParametricRim({
      parametricRimLift,
      parametricRimFresnelPower,
      parametricRimColor
    });
  }
};
/*!
 * @pixiv/three-vrm-materials-mtoon v3.0.0-beta.2
 * MToon (toon material) module for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2024 pixiv Inc.
 * @pixiv/three-vrm-materials-mtoon is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL25vZGVzL2luZGV4LnRzIiwgIi4uLy4uLy4uL3RocmVlLXZybS1tYXRlcmlhbHMtbXRvb24vc3JjL25vZGVzL3dhcm5pbmdJZlByZTE2MS50cyIsICIuLi8uLi8uLi90aHJlZS12cm0tbWF0ZXJpYWxzLW10b29uL3NyYy9ub2Rlcy9NVG9vbkFuaW1hdGVkVVZOb2RlLnRzIiwgIi4uLy4uLy4uL3RocmVlLXZybS1tYXRlcmlhbHMtbXRvb24vc3JjL25vZGVzL21hdGVyaWFsUmVmZXJlbmNlcy50cyIsICIuLi8uLi8uLi90aHJlZS12cm0tbWF0ZXJpYWxzLW10b29uL3NyYy9ub2Rlcy9NVG9vbkxpZ2h0aW5nTW9kZWwudHMiLCAiLi4vLi4vLi4vdGhyZWUtdnJtLW1hdGVyaWFscy1tdG9vbi9zcmMvbm9kZXMvaW1tdXRhYmxlTm9kZXMudHMiLCAiLi4vLi4vLi4vdGhyZWUtdnJtLW1hdGVyaWFscy1tdG9vbi9zcmMvbm9kZXMvTVRvb25Ob2RlTWF0ZXJpYWwudHMiLCAiLi4vLi4vLi4vdGhyZWUtdnJtLW1hdGVyaWFscy1tdG9vbi9zcmMvTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUudHMiLCAiLi4vLi4vLi4vdGhyZWUtdnJtLW1hdGVyaWFscy1tdG9vbi9zcmMvbm9kZXMvbXRvb25QYXJhbWV0cmljUmltLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgKiBmcm9tICdAcGl4aXYvdGhyZWUtdnJtLW1hdGVyaWFscy1tdG9vbi9ub2Rlcyc7XG4iLCAiLy8gVGhpcyBtb2R1bGUgd2lsbCBiZSBpbXBvcnRlZCBhdCB0aGUgYmVnaW5uaW5nIG9mIGB0aHJlZS12cm0tbWF0ZXJpYWxzLW10b29uL25vZGVzYFxuLy8gSWYgdGhlIHZlcnNpb24gb2YgVGhyZWUuanMgaXMgbGVzcyB0aGFuIHIxNjcsIGl0IHdpbGwgd2FybiB0aGF0IGl0IGlzIG5vdCBzdXBwb3J0ZWRcblxuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG5jb25zdCB0aHJlZVJldmlzaW9uID0gcGFyc2VJbnQoVEhSRUUuUkVWSVNJT04sIDEwKTtcbmlmICh0aHJlZVJldmlzaW9uIDwgMTY3KSB7XG4gIGNvbnNvbGUud2FybihcbiAgICBgTVRvb25Ob2RlTWF0ZXJpYWwgcmVxdWlyZXMgVGhyZWUuanMgcjE2NyBvciBoaWdoZXIgKFlvdSBhcmUgdXNpbmcgciR7dGhyZWVSZXZpc2lvbn0pLiBUaGlzIHdvdWxkIG5vdCB3b3JrIGNvcnJlY3RseS5gLFxuICApO1xufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlL3dlYmdwdSc7XG5pbXBvcnQge1xuICByZWZVVkFuaW1hdGlvbk1hc2tUZXh0dXJlLFxuICByZWZVVkFuaW1hdGlvblJvdGF0aW9uUGhhc2UsXG4gIHJlZlVWQW5pbWF0aW9uU2Nyb2xsWE9mZnNldCxcbiAgcmVmVVZBbmltYXRpb25TY3JvbGxZT2Zmc2V0LFxufSBmcm9tICcuL21hdGVyaWFsUmVmZXJlbmNlcyc7XG5cbmV4cG9ydCBjbGFzcyBNVG9vbkFuaW1hdGVkVVZOb2RlIGV4dGVuZHMgVEhSRUUuVGVtcE5vZGUge1xuICBwdWJsaWMgcmVhZG9ubHkgaGFzTWFza1RleHR1cmU6IGJvb2xlYW47XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGhhc01hc2tUZXh0dXJlOiBib29sZWFuKSB7XG4gICAgc3VwZXIoJ3ZlYzInKTtcblxuICAgIHRoaXMuaGFzTWFza1RleHR1cmUgPSBoYXNNYXNrVGV4dHVyZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXR1cCgpOiBUSFJFRS5TaGFkZXJOb2RlT2JqZWN0PFRIUkVFLlZhck5vZGU+IHtcbiAgICBsZXQgdXZBbmltYXRpb25NYXNrOiBUSFJFRS5Ob2RlUmVwcmVzZW50YXRpb24gPSAxLjA7XG5cbiAgICBpZiAodGhpcy5oYXNNYXNrVGV4dHVyZSkge1xuICAgICAgdXZBbmltYXRpb25NYXNrID0gVEhSRUUudmVjNChyZWZVVkFuaW1hdGlvbk1hc2tUZXh0dXJlKS5jb250ZXh0KHsgZ2V0VVY6ICgpID0+IFRIUkVFLnV2KCkgfSkucjtcbiAgICB9XG5cbiAgICBsZXQgdXY6IFRIUkVFLlNoYWRlck5vZGVPYmplY3Q8VEhSRUUuU3dpenphYmxlPiA9IFRIUkVFLnV2KCk7XG5cbiAgICAvLyByb3RhdGVcbiAgICBjb25zdCBwaGFzZSA9IHJlZlVWQW5pbWF0aW9uUm90YXRpb25QaGFzZS5tdWwodXZBbmltYXRpb25NYXNrKTtcblxuICAgIC8vIFdPUktBUk9VTkQ6IFRIUkVFLnJvdGF0ZVVWIGNhdXNlcyBhbiBpc3N1ZSB3aXRoIHRoZSBtYXNrIHRleHR1cmVcbiAgICAvLyBXZSBhcmUgZ29pbmcgdG8gc3BpbiB1c2luZyBhIDEwMCUgb3JnYW5pYyBoYW5kbWFkZSByb3RhdGlvbiBtYXRyaXhcbiAgICAvLyB1diA9IFRIUkVFLnJvdGF0ZVVWKHV2LCBwaGFzZSwgVEhSRUUudmVjMigwLjUsIDAuNSkpO1xuXG4gICAgY29uc3QgYyA9IFRIUkVFLmNvcyhwaGFzZSk7XG4gICAgY29uc3QgcyA9IFRIUkVFLnNpbihwaGFzZSk7XG4gICAgdXYgPSB1di5zdWIoVEhSRUUudmVjMigwLjUsIDAuNSkpO1xuICAgIHV2ID0gdXYubXVsKFRIUkVFLm1hdDIoYywgcywgcy5uZWdhdGUoKSwgYykpO1xuICAgIHV2ID0gdXYuYWRkKFRIUkVFLnZlYzIoMC41LCAwLjUpKTtcblxuICAgIC8vIHNjcm9sbFxuICAgIGNvbnN0IHNjcm9sbCA9IFRIUkVFLnZlYzIocmVmVVZBbmltYXRpb25TY3JvbGxYT2Zmc2V0LCByZWZVVkFuaW1hdGlvblNjcm9sbFlPZmZzZXQpLm11bCh1dkFuaW1hdGlvbk1hc2spO1xuICAgIHV2ID0gdXYuYWRkKHNjcm9sbCk7XG5cbiAgICByZXR1cm4gdXYudGVtcCgnQW5pbWF0ZWRVVicpO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUvd2ViZ3B1JztcblxuZXhwb3J0IGNvbnN0IHJlZkNvbG9yID0gVEhSRUUubWF0ZXJpYWxSZWZlcmVuY2UoJ2NvbG9yJywgJ2NvbG9yJyk7XG5leHBvcnQgY29uc3QgcmVmTWFwID0gVEhSRUUubWF0ZXJpYWxSZWZlcmVuY2UoJ21hcCcsICd0ZXh0dXJlJyk7XG5leHBvcnQgY29uc3QgcmVmTm9ybWFsTWFwID0gVEhSRUUubWF0ZXJpYWxSZWZlcmVuY2UoJ25vcm1hbE1hcCcsICd0ZXh0dXJlJyk7XG5leHBvcnQgY29uc3QgcmVmTm9ybWFsU2NhbGUgPSBUSFJFRS5tYXRlcmlhbFJlZmVyZW5jZSgnbm9ybWFsU2NhbGUnLCAndmVjMicpO1xuZXhwb3J0IGNvbnN0IHJlZkVtaXNzaXZlID0gVEhSRUUubWF0ZXJpYWxSZWZlcmVuY2UoJ2VtaXNzaXZlJywgJ2NvbG9yJyk7XG5leHBvcnQgY29uc3QgcmVmRW1pc3NpdmVJbnRlbnNpdHkgPSBUSFJFRS5tYXRlcmlhbFJlZmVyZW5jZSgnZW1pc3NpdmVJbnRlbnNpdHknLCAnZmxvYXQnKTtcbmV4cG9ydCBjb25zdCByZWZFbWlzc2l2ZU1hcCA9IFRIUkVFLm1hdGVyaWFsUmVmZXJlbmNlKCdlbWlzc2l2ZU1hcCcsICd0ZXh0dXJlJyk7XG5cbmV4cG9ydCBjb25zdCByZWZTaGFkZUNvbG9yRmFjdG9yID0gVEhSRUUubWF0ZXJpYWxSZWZlcmVuY2UoJ3NoYWRlQ29sb3JGYWN0b3InLCAnY29sb3InKTtcbmV4cG9ydCBjb25zdCByZWZTaGFkaW5nU2hpZnRGYWN0b3IgPSBUSFJFRS5tYXRlcmlhbFJlZmVyZW5jZSgnc2hhZGluZ1NoaWZ0RmFjdG9yJywgJ2Zsb2F0Jyk7XG5leHBvcnQgY29uc3QgcmVmU2hhZGVNdWx0aXBseVRleHR1cmUgPSBUSFJFRS5tYXRlcmlhbFJlZmVyZW5jZSgnc2hhZGVNdWx0aXBseVRleHR1cmUnLCAndGV4dHVyZScpO1xuZXhwb3J0IGNvbnN0IHJlZlNoYWRlTXVsdGlwbHlUZXh0dXJlU2NhbGUgPSBUSFJFRS5tYXRlcmlhbFJlZmVyZW5jZSgnc2hhZGVNdWx0aXBseVRleHR1cmVTY2FsZScsICdmbG9hdCcpO1xuZXhwb3J0IGNvbnN0IHJlZlNoYWRpbmdUb29ueUZhY3RvciA9IFRIUkVFLm1hdGVyaWFsUmVmZXJlbmNlKCdzaGFkaW5nVG9vbnlGYWN0b3InLCAnZmxvYXQnKTtcbmV4cG9ydCBjb25zdCByZWZSaW1MaWdodGluZ01peEZhY3RvciA9IFRIUkVFLm1hdGVyaWFsUmVmZXJlbmNlKCdyaW1MaWdodGluZ01peEZhY3RvcicsICdmbG9hdCcpO1xuZXhwb3J0IGNvbnN0IHJlZlJpbU11bHRpcGx5VGV4dHVyZSA9IFRIUkVFLm1hdGVyaWFsUmVmZXJlbmNlKCdyaW1NdWx0aXBseVRleHR1cmUnLCAndGV4dHVyZScpO1xuZXhwb3J0IGNvbnN0IHJlZk1hdGNhcEZhY3RvciA9IFRIUkVFLm1hdGVyaWFsUmVmZXJlbmNlKCdtYXRjYXBGYWN0b3InLCAnY29sb3InKTtcbmV4cG9ydCBjb25zdCByZWZNYXRjYXBUZXh0dXJlID0gVEhSRUUubWF0ZXJpYWxSZWZlcmVuY2UoJ21hdGNhcFRleHR1cmUnLCAndGV4dHVyZScpO1xuZXhwb3J0IGNvbnN0IHJlZlBhcmFtZXRyaWNSaW1Db2xvckZhY3RvciA9IFRIUkVFLm1hdGVyaWFsUmVmZXJlbmNlKCdwYXJhbWV0cmljUmltQ29sb3JGYWN0b3InLCAnY29sb3InKTtcbmV4cG9ydCBjb25zdCByZWZQYXJhbWV0cmljUmltTGlmdEZhY3RvciA9IFRIUkVFLm1hdGVyaWFsUmVmZXJlbmNlKCdwYXJhbWV0cmljUmltTGlmdEZhY3RvcicsICdmbG9hdCcpO1xuZXhwb3J0IGNvbnN0IHJlZlBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJGYWN0b3IgPSBUSFJFRS5tYXRlcmlhbFJlZmVyZW5jZSgncGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlckZhY3RvcicsICdmbG9hdCcpO1xuZXhwb3J0IGNvbnN0IHJlZk91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZSA9IFRIUkVFLm1hdGVyaWFsUmVmZXJlbmNlKCdvdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmUnLCAndGV4dHVyZScpO1xuZXhwb3J0IGNvbnN0IHJlZk91dGxpbmVXaWR0aEZhY3RvciA9IFRIUkVFLm1hdGVyaWFsUmVmZXJlbmNlKCdvdXRsaW5lV2lkdGhGYWN0b3InLCAnZmxvYXQnKTtcbmV4cG9ydCBjb25zdCByZWZPdXRsaW5lQ29sb3JGYWN0b3IgPSBUSFJFRS5tYXRlcmlhbFJlZmVyZW5jZSgnb3V0bGluZUNvbG9yRmFjdG9yJywgJ2NvbG9yJyk7XG5leHBvcnQgY29uc3QgcmVmT3V0bGluZUxpZ2h0aW5nTWl4RmFjdG9yID0gVEhSRUUubWF0ZXJpYWxSZWZlcmVuY2UoJ291dGxpbmVMaWdodGluZ01peEZhY3RvcicsICdmbG9hdCcpO1xuZXhwb3J0IGNvbnN0IHJlZlVWQW5pbWF0aW9uTWFza1RleHR1cmUgPSBUSFJFRS5tYXRlcmlhbFJlZmVyZW5jZSgndXZBbmltYXRpb25NYXNrVGV4dHVyZScsICd0ZXh0dXJlJyk7XG5cbmV4cG9ydCBjb25zdCByZWZVVkFuaW1hdGlvblNjcm9sbFhPZmZzZXQgPSBUSFJFRS5tYXRlcmlhbFJlZmVyZW5jZSgndXZBbmltYXRpb25TY3JvbGxYT2Zmc2V0JywgJ2Zsb2F0Jyk7XG5leHBvcnQgY29uc3QgcmVmVVZBbmltYXRpb25TY3JvbGxZT2Zmc2V0ID0gVEhSRUUubWF0ZXJpYWxSZWZlcmVuY2UoJ3V2QW5pbWF0aW9uU2Nyb2xsWU9mZnNldCcsICdmbG9hdCcpO1xuZXhwb3J0IGNvbnN0IHJlZlVWQW5pbWF0aW9uUm90YXRpb25QaGFzZSA9IFRIUkVFLm1hdGVyaWFsUmVmZXJlbmNlKCd1dkFuaW1hdGlvblJvdGF0aW9uUGhhc2UnLCAnZmxvYXQnKTtcbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS93ZWJncHUnO1xuaW1wb3J0IHtcbiAgbWF0Y2FwLFxuICBwYXJhbWV0cmljUmltLFxuICByaW1MaWdodGluZ01peCxcbiAgcmltTXVsdGlwbHksXG4gIHNoYWRlQ29sb3IsXG4gIHNoYWRpbmdTaGlmdCxcbiAgc2hhZGluZ1Rvb255LFxufSBmcm9tICcuL2ltbXV0YWJsZU5vZGVzJztcblxuLy8gVE9ETzogMCUgY29uZmlkZW5jZSBhYm91dCBmdW5jdGlvbiB0eXBlcy5cblxuY29uc3QgbGluZWFyc3RlcCA9IFRIUkVFLnRzbEZuKFxuICAoe1xuICAgIGEsXG4gICAgYixcbiAgICB0LFxuICB9OiB7XG4gICAgYTogVEhSRUUuU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPjtcbiAgICBiOiBUSFJFRS5TaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+O1xuICAgIHQ6IFRIUkVFLlNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT47XG4gIH0pID0+IHtcbiAgICBjb25zdCB0b3AgPSB0LnN1YihhKTtcbiAgICBjb25zdCBib3R0b20gPSBiLnN1YihhKTtcbiAgICByZXR1cm4gdG9wLmRpdihib3R0b20pLmNsYW1wKCk7XG4gIH0sXG4pO1xuXG4vKipcbiAqIENvbnZlcnQgTmRvdEwgaW50byB0b29uIHNoYWRpbmcgZmFjdG9yIHVzaW5nIHNoYWRpbmdTaGlmdCBhbmQgc2hhZGluZ1Rvb255XG4gKi9cbmNvbnN0IGdldFNoYWRpbmcgPSBUSFJFRS50c2xGbigoeyBkb3ROTCB9OiB7IGRvdE5MOiBUSFJFRS5TaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+IH0pID0+IHtcbiAgY29uc3Qgc2hhZG93ID0gMS4wOyAvLyBUT0RPXG5cbiAgY29uc3QgZmVhdGhlciA9IFRIUkVFLmZsb2F0KDEuMCkuc3ViKHNoYWRpbmdUb29ueSk7XG5cbiAgbGV0IHNoYWRpbmc6IFRIUkVFLlNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT4gPSBkb3ROTC5hZGQoc2hhZGluZ1NoaWZ0KTtcbiAgc2hhZGluZyA9IGxpbmVhcnN0ZXAoe1xuICAgIGE6IGZlYXRoZXIubmVnYXRlKCksXG4gICAgYjogZmVhdGhlcixcbiAgICB0OiBzaGFkaW5nLFxuICB9KTtcbiAgc2hhZGluZyA9IHNoYWRpbmcubXVsKHNoYWRvdyk7XG4gIHJldHVybiBzaGFkaW5nO1xufSk7XG5cbi8qKlxuICogTWl4IGRpZmZ1c2VDb2xvciBhbmQgc2hhZGVDb2xvciB1c2luZyBzaGFkaW5nIGZhY3RvciBhbmQgbGlnaHQgY29sb3JcbiAqL1xuY29uc3QgZ2V0RGlmZnVzZSA9IFRIUkVFLnRzbEZuKFxuICAoe1xuICAgIHNoYWRpbmcsXG4gICAgbGlnaHRDb2xvcixcbiAgfToge1xuICAgIHNoYWRpbmc6IFRIUkVFLlNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT47XG4gICAgbGlnaHRDb2xvcjogVEhSRUUuU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPjtcbiAgfSkgPT4ge1xuICAgIGNvbnN0IGRpZmZ1c2VDb2xvciA9IFRIUkVFLm1peChzaGFkZUNvbG9yLCBUSFJFRS5kaWZmdXNlQ29sb3IsIHNoYWRpbmcpO1xuICAgIGNvbnN0IGNvbCA9IGxpZ2h0Q29sb3IubXVsKFRIUkVFLkJSREZfTGFtYmVydCh7IGRpZmZ1c2VDb2xvciB9KSk7XG5cbiAgICByZXR1cm4gY29sO1xuICB9LFxuKTtcblxuZXhwb3J0IGNsYXNzIE1Ub29uTGlnaHRpbmdNb2RlbCBleHRlbmRzIFRIUkVFLkxpZ2h0aW5nTW9kZWwge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgZGlyZWN0KHsgbGlnaHREaXJlY3Rpb24sIGxpZ2h0Q29sb3IsIHJlZmxlY3RlZExpZ2h0IH06IFRIUkVFLkxpZ2h0aW5nTW9kZWxEaXJlY3RJbnB1dCkge1xuICAgIGNvbnN0IGRvdE5MID0gVEhSRUUudHJhbnNmb3JtZWROb3JtYWxWaWV3LmRvdChsaWdodERpcmVjdGlvbikuY2xhbXAoLTEuMCwgMS4wKTtcblxuICAgIC8vIHRvb24gZGlmZnVzZVxuICAgIGNvbnN0IHNoYWRpbmcgPSBnZXRTaGFkaW5nKHtcbiAgICAgIGRvdE5MLFxuICAgIH0pO1xuXG4gICAgLy8gVW5hYmxlIHRvIHVzZSBgYWRkQXNzaWduYCBpbiB0aGUgY3VycmVudCBAdHlwZXMvdGhyZWUsIHdlIHVzZSBgYXNzaWduYCBhbmQgYGFkZGAgaW5zdGVhZFxuICAgIC8vIFRPRE86IEZpeCB0aGUgYGFkZEFzc2lnbmAgaXNzdWUgZnJvbSB0aGUgYEB0eXBlcy90aHJlZWAgc2lkZVxuXG4gICAgKHJlZmxlY3RlZExpZ2h0LmRpcmVjdERpZmZ1c2UgYXMgVEhSRUUuU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPikuYXNzaWduKFxuICAgICAgKHJlZmxlY3RlZExpZ2h0LmRpcmVjdERpZmZ1c2UgYXMgVEhSRUUuU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPikuYWRkKFxuICAgICAgICBnZXREaWZmdXNlKHtcbiAgICAgICAgICBzaGFkaW5nLFxuICAgICAgICAgIGxpZ2h0Q29sb3I6IGxpZ2h0Q29sb3IgYXMgVEhSRUUuU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPixcbiAgICAgICAgfSksXG4gICAgICApLFxuICAgICk7XG5cbiAgICAvLyByaW1cbiAgICAocmVmbGVjdGVkTGlnaHQuZGlyZWN0U3BlY3VsYXIgYXMgVEhSRUUuU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPikuYXNzaWduKFxuICAgICAgKHJlZmxlY3RlZExpZ2h0LmRpcmVjdFNwZWN1bGFyIGFzIFRIUkVFLlNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT4pLmFkZChcbiAgICAgICAgcGFyYW1ldHJpY1JpbVxuICAgICAgICAgIC5hZGQobWF0Y2FwKVxuICAgICAgICAgIC5tdWwocmltTXVsdGlwbHkpXG4gICAgICAgICAgLm11bChUSFJFRS5taXgoVEhSRUUudmVjMygwLjApLCBUSFJFRS5CUkRGX0xhbWJlcnQoeyBkaWZmdXNlQ29sb3I6IGxpZ2h0Q29sb3IgfSksIHJpbUxpZ2h0aW5nTWl4KSksXG4gICAgICApLFxuICAgICk7XG4gIH1cblxuICBpbmRpcmVjdChjb250ZXh0OiBUSFJFRS5MaWdodGluZ01vZGVsSW5kaXJlY3RJbnB1dCkge1xuICAgIHRoaXMuaW5kaXJlY3REaWZmdXNlKGNvbnRleHQpO1xuICAgIHRoaXMuaW5kaXJlY3RTcGVjdWxhcihjb250ZXh0KTtcbiAgfVxuXG4gIGluZGlyZWN0RGlmZnVzZSh7IGlycmFkaWFuY2UsIHJlZmxlY3RlZExpZ2h0IH06IFRIUkVFLkxpZ2h0aW5nTW9kZWxJbmRpcmVjdElucHV0KSB7XG4gICAgLy8gaW5kaXJlY3QgaXJyYWRpYW5jZVxuICAgIChyZWZsZWN0ZWRMaWdodC5pbmRpcmVjdERpZmZ1c2UgYXMgVEhSRUUuU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPikuYXNzaWduKFxuICAgICAgKHJlZmxlY3RlZExpZ2h0LmluZGlyZWN0RGlmZnVzZSBhcyBUSFJFRS5TaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+KS5hZGQoXG4gICAgICAgIChpcnJhZGlhbmNlIGFzIFRIUkVFLlNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT4pLm11bChcbiAgICAgICAgICBUSFJFRS5CUkRGX0xhbWJlcnQoe1xuICAgICAgICAgICAgZGlmZnVzZUNvbG9yOiBUSFJFRS5kaWZmdXNlQ29sb3IsXG4gICAgICAgICAgfSksXG4gICAgICAgICksXG4gICAgICApLFxuICAgICk7XG4gIH1cblxuICBpbmRpcmVjdFNwZWN1bGFyKHsgcmVmbGVjdGVkTGlnaHQgfTogVEhSRUUuTGlnaHRpbmdNb2RlbEluZGlyZWN0SW5wdXQpIHtcbiAgICAvLyByaW1cbiAgICAocmVmbGVjdGVkTGlnaHQuaW5kaXJlY3RTcGVjdWxhciBhcyBUSFJFRS5TaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+KS5hc3NpZ24oXG4gICAgICAocmVmbGVjdGVkTGlnaHQuaW5kaXJlY3RTcGVjdWxhciBhcyBUSFJFRS5TaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+KS5hZGQoXG4gICAgICAgIHBhcmFtZXRyaWNSaW1cbiAgICAgICAgICAuYWRkKG1hdGNhcClcbiAgICAgICAgICAubXVsKHJpbU11bHRpcGx5KVxuICAgICAgICAgIC5tdWwoVEhSRUUubWl4KFRIUkVFLnZlYzMoMS4wKSwgVEhSRUUudmVjMygwLjApLCByaW1MaWdodGluZ01peCkpLFxuICAgICAgKSxcbiAgICApO1xuICB9XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUvd2ViZ3B1JztcblxuZXhwb3J0IGNvbnN0IHNoYWRlQ29sb3IgPSBUSFJFRS5ub2RlSW1tdXRhYmxlKFRIUkVFLlByb3BlcnR5Tm9kZSwgJ3ZlYzMnKS50ZW1wKCdTaGFkZUNvbG9yJyk7XG5leHBvcnQgY29uc3Qgc2hhZGluZ1NoaWZ0ID0gVEhSRUUubm9kZUltbXV0YWJsZShUSFJFRS5Qcm9wZXJ0eU5vZGUsICdmbG9hdCcpLnRlbXAoJ1NoYWRpbmdTaGlmdCcpO1xuZXhwb3J0IGNvbnN0IHNoYWRpbmdUb29ueSA9IFRIUkVFLm5vZGVJbW11dGFibGUoVEhSRUUuUHJvcGVydHlOb2RlLCAnZmxvYXQnKS50ZW1wKCdTaGFkaW5nVG9vbnknKTtcbmV4cG9ydCBjb25zdCByaW1MaWdodGluZ01peCA9IFRIUkVFLm5vZGVJbW11dGFibGUoVEhSRUUuUHJvcGVydHlOb2RlLCAnZmxvYXQnKS50ZW1wKCdSaW1MaWdodGluZ01peCcpO1xuZXhwb3J0IGNvbnN0IHJpbU11bHRpcGx5ID0gVEhSRUUubm9kZUltbXV0YWJsZShUSFJFRS5Qcm9wZXJ0eU5vZGUsICd2ZWMzJykudGVtcCgnUmltTXVsdGlwbHknKTtcbmV4cG9ydCBjb25zdCBtYXRjYXAgPSBUSFJFRS5ub2RlSW1tdXRhYmxlKFRIUkVFLlByb3BlcnR5Tm9kZSwgJ3ZlYzMnKS50ZW1wKCdtYXRjYXAnKTtcbmV4cG9ydCBjb25zdCBwYXJhbWV0cmljUmltID0gVEhSRUUubm9kZUltbXV0YWJsZShUSFJFRS5Qcm9wZXJ0eU5vZGUsICd2ZWMzJykudGVtcCgnUGFyYW1ldHJpY1JpbScpO1xuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlL3dlYmdwdSc7XG5cbmltcG9ydCB0eXBlIHsgTVRvb25NYXRlcmlhbCB9IGZyb20gJy4uL01Ub29uTWF0ZXJpYWwnO1xuaW1wb3J0IHsgTVRvb25MaWdodGluZ01vZGVsIH0gZnJvbSAnLi9NVG9vbkxpZ2h0aW5nTW9kZWwnO1xuaW1wb3J0IHtcbiAgcmltTGlnaHRpbmdNaXgsXG4gIG1hdGNhcCxcbiAgc2hhZGVDb2xvcixcbiAgc2hhZGluZ1NoaWZ0LFxuICBzaGFkaW5nVG9vbnksXG4gIHJpbU11bHRpcGx5LFxuICBwYXJhbWV0cmljUmltLFxufSBmcm9tICcuL2ltbXV0YWJsZU5vZGVzJztcbmltcG9ydCB7XG4gIHJlZkNvbG9yLFxuICByZWZFbWlzc2l2ZSxcbiAgcmVmRW1pc3NpdmVJbnRlbnNpdHksXG4gIHJlZkVtaXNzaXZlTWFwLFxuICByZWZNYXAsXG4gIHJlZk1hdGNhcEZhY3RvcixcbiAgcmVmTWF0Y2FwVGV4dHVyZSxcbiAgcmVmTm9ybWFsTWFwLFxuICByZWZOb3JtYWxTY2FsZSxcbiAgcmVmT3V0bGluZUNvbG9yRmFjdG9yLFxuICByZWZPdXRsaW5lTGlnaHRpbmdNaXhGYWN0b3IsXG4gIHJlZk91dGxpbmVXaWR0aEZhY3RvcixcbiAgcmVmT3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlLFxuICByZWZQYXJhbWV0cmljUmltQ29sb3JGYWN0b3IsXG4gIHJlZlBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJGYWN0b3IsXG4gIHJlZlBhcmFtZXRyaWNSaW1MaWZ0RmFjdG9yLFxuICByZWZSaW1MaWdodGluZ01peEZhY3RvcixcbiAgcmVmUmltTXVsdGlwbHlUZXh0dXJlLFxuICByZWZTaGFkZUNvbG9yRmFjdG9yLFxuICByZWZTaGFkZU11bHRpcGx5VGV4dHVyZSxcbiAgcmVmU2hhZGVNdWx0aXBseVRleHR1cmVTY2FsZSxcbiAgcmVmU2hhZGluZ1NoaWZ0RmFjdG9yLFxuICByZWZTaGFkaW5nVG9vbnlGYWN0b3IsXG59IGZyb20gJy4vbWF0ZXJpYWxSZWZlcmVuY2VzJztcbmltcG9ydCB7IE1Ub29uQW5pbWF0ZWRVVk5vZGUgfSBmcm9tICcuL01Ub29uQW5pbWF0ZWRVVk5vZGUnO1xuaW1wb3J0IHsgTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUgfSBmcm9tICcuLi9NVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZSc7XG5pbXBvcnQgeyBNVG9vbk5vZGVNYXRlcmlhbFBhcmFtZXRlcnMgfSBmcm9tICcuL01Ub29uTm9kZU1hdGVyaWFsUGFyYW1ldGVycyc7XG5pbXBvcnQgeyBtdG9vblBhcmFtZXRyaWNSaW0gfSBmcm9tICcuL210b29uUGFyYW1ldHJpY1JpbSc7XG5cbi8qKlxuICogTVRvb24gaXMgYSBtYXRlcmlhbCBzcGVjaWZpY2F0aW9uIHRoYXQgaGFzIHZhcmlvdXMgZmVhdHVyZXMuXG4gKiBUaGUgc3BlYyBhbmQgaW1wbGVtZW50YXRpb24gYXJlIG9yaWdpbmFsbHkgZm91bmRlZCBmb3IgVW5pdHkgZW5naW5lIGFuZCB0aGlzIGlzIGEgcG9ydCBvZiB0aGUgbWF0ZXJpYWwuXG4gKlxuICogVGhpcyBtYXRlcmlhbCBpcyBhIE5vZGVNYXRlcmlhbCB2YXJpYW50IG9mIHtAbGluayBNVG9vbk1hdGVyaWFsfS5cbiAqXG4gKiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9TYW50YXJoL01Ub29uXG4gKi9cbmV4cG9ydCBjbGFzcyBNVG9vbk5vZGVNYXRlcmlhbCBleHRlbmRzIFRIUkVFLk5vZGVNYXRlcmlhbCB7XG4gIHB1YmxpYyBlbWlzc2l2ZU5vZGU6IFRIUkVFLlNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT4gfCBudWxsO1xuXG4gIHB1YmxpYyBjb2xvcjogVEhSRUUuQ29sb3I7XG4gIHB1YmxpYyBtYXA6IFRIUkVFLlRleHR1cmUgfCBudWxsO1xuICBwdWJsaWMgZW1pc3NpdmU6IFRIUkVFLkNvbG9yO1xuICBwdWJsaWMgZW1pc3NpdmVJbnRlbnNpdHk6IG51bWJlcjtcbiAgcHVibGljIGVtaXNzaXZlTWFwOiBUSFJFRS5UZXh0dXJlIHwgbnVsbDtcbiAgcHVibGljIG5vcm1hbE1hcDogVEhSRUUuVGV4dHVyZSB8IG51bGw7XG4gIHB1YmxpYyBub3JtYWxTY2FsZTogVEhSRUUuVmVjdG9yMjtcblxuICBwdWJsaWMgc2hhZGVDb2xvckZhY3RvcjogVEhSRUUuQ29sb3I7XG4gIHB1YmxpYyBzaGFkZU11bHRpcGx5VGV4dHVyZTogVEhSRUUuVGV4dHVyZSB8IG51bGw7XG4gIHB1YmxpYyBzaGFkaW5nU2hpZnRGYWN0b3I6IG51bWJlcjtcbiAgcHVibGljIHNoYWRpbmdTaGlmdFRleHR1cmU6IFRIUkVFLlRleHR1cmUgfCBudWxsO1xuICBwdWJsaWMgc2hhZGluZ1NoaWZ0VGV4dHVyZVNjYWxlOiBudW1iZXI7XG4gIHB1YmxpYyBzaGFkaW5nVG9vbnlGYWN0b3I6IG51bWJlcjtcbiAgcHVibGljIHJpbUxpZ2h0aW5nTWl4RmFjdG9yOiBudW1iZXI7XG4gIHB1YmxpYyByaW1NdWx0aXBseVRleHR1cmU6IFRIUkVFLlRleHR1cmUgfCBudWxsO1xuICBwdWJsaWMgbWF0Y2FwRmFjdG9yOiBUSFJFRS5Db2xvcjtcbiAgcHVibGljIG1hdGNhcFRleHR1cmU6IFRIUkVFLlRleHR1cmUgfCBudWxsO1xuICBwdWJsaWMgcGFyYW1ldHJpY1JpbUNvbG9yRmFjdG9yOiBUSFJFRS5Db2xvcjtcbiAgcHVibGljIHBhcmFtZXRyaWNSaW1MaWZ0RmFjdG9yOiBudW1iZXI7XG4gIHB1YmxpYyBwYXJhbWV0cmljUmltRnJlc25lbFBvd2VyRmFjdG9yOiBudW1iZXI7XG4gIHB1YmxpYyBvdXRsaW5lV2lkdGhNb2RlOiBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZTtcbiAgcHVibGljIG91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZTogVEhSRUUuVGV4dHVyZSB8IG51bGw7XG4gIHB1YmxpYyBvdXRsaW5lV2lkdGhGYWN0b3I6IG51bWJlcjtcbiAgcHVibGljIG91dGxpbmVDb2xvckZhY3RvcjogVEhSRUUuQ29sb3I7XG4gIHB1YmxpYyBvdXRsaW5lTGlnaHRpbmdNaXhGYWN0b3I6IG51bWJlcjtcbiAgcHVibGljIHV2QW5pbWF0aW9uU2Nyb2xsWFNwZWVkRmFjdG9yOiBudW1iZXI7XG4gIHB1YmxpYyB1dkFuaW1hdGlvblNjcm9sbFlTcGVlZEZhY3RvcjogbnVtYmVyO1xuICBwdWJsaWMgdXZBbmltYXRpb25Sb3RhdGlvblNwZWVkRmFjdG9yOiBudW1iZXI7XG4gIHB1YmxpYyB1dkFuaW1hdGlvbk1hc2tUZXh0dXJlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbDtcblxuICBwdWJsaWMgc2hhZGVDb2xvck5vZGU6IFRIUkVFLlN3aXp6YWJsZSB8IG51bGw7XG4gIHB1YmxpYyBzaGFkaW5nU2hpZnROb2RlOiBUSFJFRS5Ob2RlIHwgbnVsbDtcbiAgcHVibGljIHNoYWRpbmdUb29ueU5vZGU6IFRIUkVFLk5vZGUgfCBudWxsO1xuICBwdWJsaWMgcmltTGlnaHRpbmdNaXhOb2RlOiBUSFJFRS5Ob2RlIHwgbnVsbDtcbiAgcHVibGljIHJpbU11bHRpcGx5Tm9kZTogVEhSRUUuTm9kZSB8IG51bGw7XG4gIHB1YmxpYyBtYXRjYXBOb2RlOiBUSFJFRS5Ob2RlIHwgbnVsbDtcbiAgcHVibGljIHBhcmFtZXRyaWNSaW1Db2xvck5vZGU6IFRIUkVFLlN3aXp6YWJsZSB8IG51bGw7XG4gIHB1YmxpYyBwYXJhbWV0cmljUmltTGlmdE5vZGU6IFRIUkVFLk5vZGUgfCBudWxsO1xuICBwdWJsaWMgcGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlck5vZGU6IFRIUkVFLk5vZGUgfCBudWxsO1xuXG4gIHB1YmxpYyB1dkFuaW1hdGlvblNjcm9sbFhPZmZzZXQ6IG51bWJlcjtcbiAgcHVibGljIHV2QW5pbWF0aW9uU2Nyb2xsWU9mZnNldDogbnVtYmVyO1xuICBwdWJsaWMgdXZBbmltYXRpb25Sb3RhdGlvblBoYXNlOiBudW1iZXI7XG5cbiAgcHVibGljIGlzT3V0bGluZTogYm9vbGVhbjtcblxuICBwcml2YXRlIF9hbmltYXRlZFVWTm9kZTogTVRvb25BbmltYXRlZFVWTm9kZSB8IG51bGw7XG5cbiAgcHVibGljIGN1c3RvbVByb2dyYW1DYWNoZUtleSgpOiBzdHJpbmcge1xuICAgIGxldCBjYWNoZUtleSA9IHN1cGVyLmN1c3RvbVByb2dyYW1DYWNoZUtleSgpO1xuXG4gICAgY2FjaGVLZXkgKz0gYGlzT3V0bGluZToke3RoaXMuaXNPdXRsaW5lfSxgO1xuXG4gICAgcmV0dXJuIGNhY2hlS2V5O1xuICB9XG5cbiAgLyoqXG4gICAqIFJlYWRvbmx5IGJvb2xlYW4gdGhhdCBpbmRpY2F0ZXMgdGhpcyBpcyBhIHtAbGluayBNVG9vbk5vZGVNYXRlcmlhbH0uXG4gICAqL1xuICBwdWJsaWMgZ2V0IGlzTVRvb25Ob2RlTWF0ZXJpYWwoKTogdHJ1ZSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwdWJsaWMgY29uc3RydWN0b3IocGFyYW1ldGVyczogTVRvb25Ob2RlTWF0ZXJpYWxQYXJhbWV0ZXJzID0ge30pIHtcbiAgICBzdXBlcigpO1xuXG4gICAgaWYgKHBhcmFtZXRlcnMudHJhbnNwYXJlbnRXaXRoWldyaXRlKSB7XG4gICAgICBwYXJhbWV0ZXJzLmRlcHRoV3JpdGUgPSB0cnVlO1xuICAgIH1cbiAgICBkZWxldGUgcGFyYW1ldGVycy50cmFuc3BhcmVudFdpdGhaV3JpdGU7XG5cbiAgICAvLyBgTVRvb25NYXRlcmlhbExvYWRlclBsdWdpbmAgYXNzaWducyB0aGVzZSBwYXJhbWV0ZXJzIHRvIHRoZSBtYXRlcmlhbFxuICAgIC8vIEhvd2V2ZXIsIGBNVG9vbk5vZGVNYXRlcmlhbGAgZG9lcyBub3Qgc3VwcG9ydCB0aGVzZSBwYXJhbWV0ZXJzXG4gICAgLy8gc28gd2UgZGVsZXRlIHRoZW0gaGVyZSB0byBzdXBwcmVzcyB3YXJuaW5nc1xuICAgIGRlbGV0ZSAocGFyYW1ldGVycyBhcyBhbnkpLmdpRXF1YWxpemF0aW9uRmFjdG9yO1xuICAgIGRlbGV0ZSAocGFyYW1ldGVycyBhcyBhbnkpLnYwQ29tcGF0U2hhZGU7XG4gICAgZGVsZXRlIChwYXJhbWV0ZXJzIGFzIGFueSkuZGVidWdNb2RlO1xuXG4gICAgdGhpcy5lbWlzc2l2ZU5vZGUgPSBudWxsO1xuXG4gICAgdGhpcy5saWdodHMgPSB0cnVlO1xuXG4gICAgdGhpcy5jb2xvciA9IG5ldyBUSFJFRS5Db2xvcigxLjAsIDEuMCwgMS4wKTtcbiAgICB0aGlzLm1hcCA9IG51bGw7XG4gICAgdGhpcy5lbWlzc2l2ZSA9IG5ldyBUSFJFRS5Db2xvcigwLjAsIDAuMCwgMC4wKTtcbiAgICB0aGlzLmVtaXNzaXZlSW50ZW5zaXR5ID0gMS4wO1xuICAgIHRoaXMuZW1pc3NpdmVNYXAgPSBudWxsO1xuICAgIHRoaXMubm9ybWFsTWFwID0gbnVsbDtcbiAgICB0aGlzLm5vcm1hbFNjYWxlID0gbmV3IFRIUkVFLlZlY3RvcjIoMS4wLCAxLjApO1xuICAgIHRoaXMuc2hhZGVDb2xvckZhY3RvciA9IG5ldyBUSFJFRS5Db2xvcigwLjAsIDAuMCwgMC4wKTtcbiAgICB0aGlzLnNoYWRlTXVsdGlwbHlUZXh0dXJlID0gbnVsbDtcbiAgICB0aGlzLnNoYWRpbmdTaGlmdEZhY3RvciA9IDAuMDtcbiAgICB0aGlzLnNoYWRpbmdTaGlmdFRleHR1cmUgPSBudWxsO1xuICAgIHRoaXMuc2hhZGluZ1NoaWZ0VGV4dHVyZVNjYWxlID0gMS4wO1xuICAgIHRoaXMuc2hhZGluZ1Rvb255RmFjdG9yID0gMC45O1xuICAgIHRoaXMucmltTGlnaHRpbmdNaXhGYWN0b3IgPSAxLjA7XG4gICAgdGhpcy5yaW1NdWx0aXBseVRleHR1cmUgPSBudWxsO1xuICAgIHRoaXMubWF0Y2FwRmFjdG9yID0gbmV3IFRIUkVFLkNvbG9yKDEuMCwgMS4wLCAxLjApO1xuICAgIHRoaXMubWF0Y2FwVGV4dHVyZSA9IG51bGw7XG4gICAgdGhpcy5wYXJhbWV0cmljUmltQ29sb3JGYWN0b3IgPSBuZXcgVEhSRUUuQ29sb3IoMC4wLCAwLjAsIDAuMCk7XG4gICAgdGhpcy5wYXJhbWV0cmljUmltTGlmdEZhY3RvciA9IDAuMDtcbiAgICB0aGlzLnBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJGYWN0b3IgPSA1LjA7XG4gICAgdGhpcy5vdXRsaW5lV2lkdGhNb2RlID0gTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUuTm9uZTtcbiAgICB0aGlzLm91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZSA9IG51bGw7XG4gICAgdGhpcy5vdXRsaW5lV2lkdGhGYWN0b3IgPSAwLjA7XG4gICAgdGhpcy5vdXRsaW5lQ29sb3JGYWN0b3IgPSBuZXcgVEhSRUUuQ29sb3IoMC4wLCAwLjAsIDAuMCk7XG4gICAgdGhpcy5vdXRsaW5lTGlnaHRpbmdNaXhGYWN0b3IgPSAxLjA7XG4gICAgdGhpcy51dkFuaW1hdGlvblNjcm9sbFhTcGVlZEZhY3RvciA9IDAuMDtcbiAgICB0aGlzLnV2QW5pbWF0aW9uU2Nyb2xsWVNwZWVkRmFjdG9yID0gMC4wO1xuICAgIHRoaXMudXZBbmltYXRpb25Sb3RhdGlvblNwZWVkRmFjdG9yID0gMC4wO1xuICAgIHRoaXMudXZBbmltYXRpb25NYXNrVGV4dHVyZSA9IG51bGw7XG5cbiAgICB0aGlzLnNoYWRlQ29sb3JOb2RlID0gbnVsbDtcbiAgICB0aGlzLnNoYWRpbmdTaGlmdE5vZGUgPSBudWxsO1xuICAgIHRoaXMuc2hhZGluZ1Rvb255Tm9kZSA9IG51bGw7XG4gICAgdGhpcy5yaW1MaWdodGluZ01peE5vZGUgPSBudWxsO1xuICAgIHRoaXMucmltTXVsdGlwbHlOb2RlID0gbnVsbDtcbiAgICB0aGlzLm1hdGNhcE5vZGUgPSBudWxsO1xuICAgIHRoaXMucGFyYW1ldHJpY1JpbUNvbG9yTm9kZSA9IG51bGw7XG4gICAgdGhpcy5wYXJhbWV0cmljUmltTGlmdE5vZGUgPSBudWxsO1xuICAgIHRoaXMucGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlck5vZGUgPSBudWxsO1xuXG4gICAgdGhpcy51dkFuaW1hdGlvblNjcm9sbFhPZmZzZXQgPSAwLjA7XG4gICAgdGhpcy51dkFuaW1hdGlvblNjcm9sbFlPZmZzZXQgPSAwLjA7XG4gICAgdGhpcy51dkFuaW1hdGlvblJvdGF0aW9uUGhhc2UgPSAwLjA7XG5cbiAgICB0aGlzLmlzT3V0bGluZSA9IGZhbHNlO1xuXG4gICAgdGhpcy5fYW5pbWF0ZWRVVk5vZGUgPSBudWxsO1xuXG4gICAgdGhpcy5zZXRWYWx1ZXMocGFyYW1ldGVycyk7XG4gIH1cblxuICBwdWJsaWMgc2V0dXBMaWdodGluZ01vZGVsKC8qYnVpbGRlciovKTogTVRvb25MaWdodGluZ01vZGVsIHtcbiAgICByZXR1cm4gbmV3IE1Ub29uTGlnaHRpbmdNb2RlbCgpO1xuICB9XG5cbiAgcHVibGljIHNldHVwKGJ1aWxkZXI6IFRIUkVFLk5vZGVCdWlsZGVyKTogdm9pZCB7XG4gICAgdGhpcy5fYW5pbWF0ZWRVVk5vZGUgPSBuZXcgTVRvb25BbmltYXRlZFVWTm9kZShcbiAgICAgICh0aGlzLnV2QW5pbWF0aW9uTWFza1RleHR1cmUgJiYgdGhpcy51dkFuaW1hdGlvbk1hc2tUZXh0dXJlLmlzVGV4dHVyZSA9PT0gdHJ1ZSkgPz8gZmFsc2UsXG4gICAgKTtcblxuICAgIHN1cGVyLnNldHVwKGJ1aWxkZXIpO1xuICB9XG5cbiAgcHVibGljIHNldHVwRGlmZnVzZUNvbG9yKGJ1aWxkZXI6IFRIUkVFLk5vZGVCdWlsZGVyKTogdm9pZCB7XG4gICAgLy8gd2UgbXVzdCBhcHBseSB1diBzY3JvbGwgdG8gdGhlIG1hcFxuICAgIC8vIHRoaXMuY29sb3JOb2RlIHdpbGwgYmUgdXNlZCBpbiBzdXBlci5zZXR1cERpZmZ1c2VDb2xvcigpIHNvIHdlIHRlbXBvcmFyaWx5IHJlcGxhY2UgaXRcbiAgICBsZXQgdGVtcENvbG9yTm9kZTogVEhSRUUuU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPiB8IG51bGwgPSBudWxsO1xuXG4gICAgaWYgKHRoaXMuY29sb3JOb2RlID09IG51bGwpIHtcbiAgICAgIHRlbXBDb2xvck5vZGUgPSByZWZDb2xvcjtcblxuICAgICAgaWYgKHRoaXMubWFwICYmIHRoaXMubWFwLmlzVGV4dHVyZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBtYXAgPSByZWZNYXAuY29udGV4dCh7IGdldFVWOiAoKSA9PiB0aGlzLl9hbmltYXRlZFVWTm9kZSB9KTtcbiAgICAgICAgdGVtcENvbG9yTm9kZSA9IHRlbXBDb2xvck5vZGUubXVsKG1hcCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY29sb3JOb2RlID0gdGVtcENvbG9yTm9kZTtcbiAgICB9XG5cbiAgICAvLyBNVG9vbiBtdXN0IGlnbm9yZSB2ZXJ0ZXggY29sb3IgYnkgc3BlY1xuICAgIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL3ZybS1jL3ZybS1zcGVjaWZpY2F0aW9uL2Jsb2IvNDJjMGE5MGU2YjRiNzEwMzUyNTY5OTc4ZjE0OTgwZTlmYzk0YjI1ZC9zcGVjaWZpY2F0aW9uL1ZSTUNfbWF0ZXJpYWxzX210b29uLTEuMC9SRUFETUUubWQjdmVydGV4LWNvbG9yc1xuICAgIGlmICh0aGlzLnZlcnRleENvbG9ycyA9PT0gdHJ1ZSAmJiBidWlsZGVyLmdlb21ldHJ5Lmhhc0F0dHJpYnV0ZSgnY29sb3InKSkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAnTVRvb25Ob2RlTWF0ZXJpYWw6IE1Ub29uIGlnbm9yZXMgdmVydGV4IGNvbG9ycy4gQ29uc2lkZXIgdXNpbmcgYSBtb2RlbCB3aXRob3V0IHZlcnRleCBjb2xvcnMgaW5zdGVhZC4nLFxuICAgICAgKTtcbiAgICAgIHRoaXMudmVydGV4Q29sb3JzID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gdGhlIG9yZGluYXJ5IGRpZmZ1c2VDb2xvciBzZXR1cFxuICAgIHN1cGVyLnNldHVwRGlmZnVzZUNvbG9yKGJ1aWxkZXIpO1xuXG4gICAgLy8gQ09NUEFUOiBwcmUtcjE2NlxuICAgIC8vIFNldCBhbHBoYSB0byAxIGlmIGl0IGlzIG9wYXF1ZVxuICAgIC8vIEFkZHJlc3NlZCBpbiBUaHJlZS5qcyByMTY2IGJ1dCB3ZSBsZWF2ZSBpdCBoZXJlIGZvciBjb21wYXRpYmlsaXR5XG4gICAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vbXJkb29iL3RocmVlLmpzL3B1bGwvMjg2NDZcbiAgICBpZiAocGFyc2VJbnQoVEhSRUUuUkVWSVNJT04sIDEwKSA8IDE2Nikge1xuICAgICAgaWYgKHRoaXMudHJhbnNwYXJlbnQgPT09IGZhbHNlICYmIHRoaXMuYmxlbmRpbmcgPT09IFRIUkVFLk5vcm1hbEJsZW5kaW5nICYmIHRoaXMuYWxwaGFUb0NvdmVyYWdlID09PSBmYWxzZSkge1xuICAgICAgICBUSFJFRS5kaWZmdXNlQ29sb3IuYS5hc3NpZ24oMS4wKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyByZXZlcnQgdGhlIGNvbG9yTm9kZVxuICAgIGlmICh0aGlzLmNvbG9yTm9kZSA9PT0gdGVtcENvbG9yTm9kZSkge1xuICAgICAgdGhpcy5jb2xvck5vZGUgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXR1cFZhcmlhbnRzKCk6IHZvaWQge1xuICAgIHNoYWRlQ29sb3IuYXNzaWduKHRoaXMuX3NldHVwU2hhZGVDb2xvck5vZGUoKSk7XG4gICAgc2hhZGluZ1NoaWZ0LmFzc2lnbih0aGlzLl9zZXR1cFNoYWRpbmdTaGlmdE5vZGUoKSk7XG4gICAgc2hhZGluZ1Rvb255LmFzc2lnbih0aGlzLl9zZXR1cFNoYWRpbmdUb29ueU5vZGUoKSk7XG4gICAgcmltTGlnaHRpbmdNaXguYXNzaWduKHRoaXMuX3NldHVwUmltTGlnaHRpbmdNaXhOb2RlKCkpO1xuICAgIHJpbU11bHRpcGx5LmFzc2lnbih0aGlzLl9zZXR1cFJpbU11bHRpcGx5Tm9kZSgpKTtcbiAgICBtYXRjYXAuYXNzaWduKHRoaXMuX3NldHVwTWF0Y2FwTm9kZSgpKTtcbiAgICBwYXJhbWV0cmljUmltLmFzc2lnbih0aGlzLl9zZXR1cFBhcmFtZXRyaWNSaW1Ob2RlKCkpO1xuICB9XG5cbiAgcHVibGljIHNldHVwTm9ybWFsKGJ1aWxkZXI6IFRIUkVFLk5vZGVCdWlsZGVyKTogdm9pZCB7XG4gICAgLy8gd2UgbXVzdCBhcHBseSB1diBzY3JvbGwgdG8gdGhlIG5vcm1hbE1hcFxuICAgIC8vIHRoaXMubm9ybWFsTm9kZSB3aWxsIGJlIHVzZWQgaW4gc3VwZXIuc2V0dXBOb3JtYWwoKSBzbyB3ZSB0ZW1wb3JhcmlseSByZXBsYWNlIGl0XG4gICAgY29uc3QgdGVtcE5vcm1hbE5vZGUgPSB0aGlzLm5vcm1hbE5vZGU7XG5cbiAgICBpZiAodGhpcy5ub3JtYWxOb2RlID09IG51bGwpIHtcbiAgICAgIHRoaXMubm9ybWFsTm9kZSA9IFRIUkVFLm1hdGVyaWFsTm9ybWFsO1xuXG4gICAgICBpZiAodGhpcy5ub3JtYWxNYXAgJiYgdGhpcy5ub3JtYWxNYXAuaXNUZXh0dXJlID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IG1hcCA9IHJlZk5vcm1hbE1hcC5jb250ZXh0KHsgZ2V0VVY6ICgpID0+IHRoaXMuX2FuaW1hdGVkVVZOb2RlIH0pO1xuICAgICAgICB0aGlzLm5vcm1hbE5vZGUgPSBtYXAubm9ybWFsTWFwKHJlZk5vcm1hbFNjYWxlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuaXNPdXRsaW5lKSB7XG4gICAgICAgIC8vIFNlZSBhYm91dCB0aGUgdHlwZSBhc3NlcnRpb246IGh0dHBzOi8vZ2l0aHViLmNvbS90aHJlZS10eXBlcy90aHJlZS10cy10eXBlcy9wdWxsLzExMjNcbiAgICAgICAgdGhpcy5ub3JtYWxOb2RlID0gKHRoaXMubm9ybWFsTm9kZSBhcyBUSFJFRS5TaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+KS5uZWdhdGUoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB0aGUgb3JkaW5hcnkgbm9ybWFsIHNldHVwXG4gICAgc3VwZXIuc2V0dXBOb3JtYWwoYnVpbGRlcik7XG5cbiAgICAvLyByZXZlcnQgdGhlIG5vcm1hbE5vZGVcbiAgICB0aGlzLm5vcm1hbE5vZGUgPSB0ZW1wTm9ybWFsTm9kZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXR1cExpZ2h0aW5nKGJ1aWxkZXI6IFRIUkVFLk5vZGVCdWlsZGVyKTogVEhSRUUuTm9kZSB7XG4gICAgLy8gd2UgbXVzdCBhcHBseSB1diBzY3JvbGwgdG8gdGhlIGVtaXNzaXZlTWFwXG4gICAgLy8gdGhpcy5lbWlzc2l2ZU5vZGUgd2lsbCBiZSB1c2VkIGluIHN1cGVyLnNldHVwTGlnaHRpbmcoKSBzbyB3ZSB0ZW1wb3JhcmlseSByZXBsYWNlIGl0XG4gICAgbGV0IHRlbXBFbWlzc2l2ZU5vZGU6IFRIUkVFLlNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT4gfCBudWxsID0gbnVsbDtcblxuICAgIGlmICh0aGlzLmVtaXNzaXZlTm9kZSA9PSBudWxsKSB7XG4gICAgICB0ZW1wRW1pc3NpdmVOb2RlID0gcmVmRW1pc3NpdmUubXVsKHJlZkVtaXNzaXZlSW50ZW5zaXR5KTtcblxuICAgICAgaWYgKHRoaXMuZW1pc3NpdmVNYXAgJiYgdGhpcy5lbWlzc2l2ZU1hcC5pc1RleHR1cmUgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3QgbWFwID0gcmVmRW1pc3NpdmVNYXAuY29udGV4dCh7IGdldFVWOiAoKSA9PiB0aGlzLl9hbmltYXRlZFVWTm9kZSB9KTtcbiAgICAgICAgdGVtcEVtaXNzaXZlTm9kZSA9IHRlbXBFbWlzc2l2ZU5vZGUubXVsKG1hcCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZW1pc3NpdmVOb2RlID0gdGVtcEVtaXNzaXZlTm9kZTtcbiAgICB9XG5cbiAgICAvLyB0aGUgb3JkaW5hcnkgbGlnaHRpbmcgc2V0dXBcbiAgICBjb25zdCByZXQgPSBzdXBlci5zZXR1cExpZ2h0aW5nKGJ1aWxkZXIpO1xuXG4gICAgLy8gcmV2ZXJ0IHRoZSBlbWlzc2l2ZU5vZGVcbiAgICBpZiAodGhpcy5lbWlzc2l2ZU5vZGUgPT09IHRlbXBFbWlzc2l2ZU5vZGUpIHtcbiAgICAgIHRoaXMuZW1pc3NpdmVOb2RlID0gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgcHVibGljIHNldHVwT3V0cHV0KFxuICAgIGJ1aWxkZXI6IFRIUkVFLk5vZGVCdWlsZGVyLFxuICAgIG91dHB1dE5vZGU6IFRIUkVFLlNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT4sXG4gICk6IFRIUkVFLlNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT4ge1xuICAgIC8vIG1peCBvciBzZXQgb3V0bGluZSBjb2xvclxuICAgIGlmICh0aGlzLmlzT3V0bGluZSAmJiB0aGlzLm91dGxpbmVXaWR0aE1vZGUgIT09IE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlLk5vbmUpIHtcbiAgICAgIG91dHB1dE5vZGUgPSBUSFJFRS52ZWM0KFxuICAgICAgICBUSFJFRS5taXgocmVmT3V0bGluZUNvbG9yRmFjdG9yLCBvdXRwdXROb2RlLnh5ei5tdWwocmVmT3V0bGluZUNvbG9yRmFjdG9yKSwgcmVmT3V0bGluZUxpZ2h0aW5nTWl4RmFjdG9yKSxcbiAgICAgICAgb3V0cHV0Tm9kZS53LFxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyB0aGUgb3JkaW5hcnkgb3V0cHV0IHNldHVwXG4gICAgcmV0dXJuIHN1cGVyLnNldHVwT3V0cHV0KGJ1aWxkZXIsIG91dHB1dE5vZGUpIGFzIFRIUkVFLlNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT47XG4gIH1cblxuICBwdWJsaWMgc2V0dXBQb3NpdGlvbihidWlsZGVyOiBUSFJFRS5Ob2RlQnVpbGRlcik6IFRIUkVFLlNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT4ge1xuICAgIC8vIHdlIG11c3QgYXBwbHkgb3V0bGluZSBwb3NpdGlvbiBvZmZzZXRcbiAgICAvLyB0aGlzLnBvc2l0aW9uTm9kZSB3aWxsIGJlIHVzZWQgaW4gc3VwZXIuc2V0dXBQb3NpdGlvbigpIHNvIHdlIHRlbXBvcmFyaWx5IHJlcGxhY2UgaXRcbiAgICBjb25zdCB0ZW1wUG9zaXRpb25Ob2RlID0gdGhpcy5wb3NpdGlvbk5vZGU7XG5cbiAgICBpZiAodGhpcy5pc091dGxpbmUgJiYgdGhpcy5vdXRsaW5lV2lkdGhNb2RlICE9PSBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZS5Ob25lKSB7XG4gICAgICB0aGlzLnBvc2l0aW9uTm9kZSA/Pz0gVEhSRUUucG9zaXRpb25Mb2NhbDtcblxuICAgICAgY29uc3Qgbm9ybWFsTG9jYWwgPSBUSFJFRS5ub3JtYWxMb2NhbC5ub3JtYWxpemUoKTtcblxuICAgICAgbGV0IHdpZHRoOiBUSFJFRS5TaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+ID0gcmVmT3V0bGluZVdpZHRoRmFjdG9yO1xuXG4gICAgICBpZiAodGhpcy5vdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmUgJiYgdGhpcy5vdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmUuaXNUZXh0dXJlID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IG1hcCA9IHJlZk91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZS5jb250ZXh0KHsgZ2V0VVY6ICgpID0+IHRoaXMuX2FuaW1hdGVkVVZOb2RlIH0pO1xuICAgICAgICB3aWR0aCA9IHdpZHRoLm11bChtYXApO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB3b3JsZE5vcm1hbExlbmd0aCA9IFRIUkVFLmxlbmd0aChUSFJFRS5tb2RlbE5vcm1hbE1hdHJpeC5tdWwobm9ybWFsTG9jYWwpKTtcbiAgICAgIGNvbnN0IG91dGxpbmVPZmZzZXQgPSB3aWR0aC5tdWwod29ybGROb3JtYWxMZW5ndGgpLm11bChub3JtYWxMb2NhbCk7XG5cbiAgICAgIGlmICh0aGlzLm91dGxpbmVXaWR0aE1vZGUgPT09IE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlLldvcmxkQ29vcmRpbmF0ZXMpIHtcbiAgICAgICAgLy8gU2VlIGFib3V0IHRoZSB0eXBlIGFzc2VydGlvbjogaHR0cHM6Ly9naXRodWIuY29tL3RocmVlLXR5cGVzL3RocmVlLXRzLXR5cGVzL3B1bGwvMTEyM1xuICAgICAgICB0aGlzLnBvc2l0aW9uTm9kZSA9ICh0aGlzLnBvc2l0aW9uTm9kZSBhcyBUSFJFRS5TaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+KS5hZGQob3V0bGluZU9mZnNldCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMub3V0bGluZVdpZHRoTW9kZSA9PT0gTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUuU2NyZWVuQ29vcmRpbmF0ZXMpIHtcbiAgICAgICAgY29uc3QgY2xpcFNjYWxlID0gVEhSRUUuY2FtZXJhUHJvamVjdGlvbk1hdHJpeC5lbGVtZW50KDEpLmVsZW1lbnQoMSk7XG5cbiAgICAgICAgLy8gU2VlIGFib3V0IHRoZSB0eXBlIGFzc2VydGlvbjogaHR0cHM6Ly9naXRodWIuY29tL3RocmVlLXR5cGVzL3RocmVlLXRzLXR5cGVzL3B1bGwvMTEyM1xuICAgICAgICB0aGlzLnBvc2l0aW9uTm9kZSA9ICh0aGlzLnBvc2l0aW9uTm9kZSBhcyBUSFJFRS5TaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+KS5hZGQoXG4gICAgICAgICAgb3V0bGluZU9mZnNldC5kaXYoY2xpcFNjYWxlKS5tdWwoVEhSRUUucG9zaXRpb25WaWV3LnoubmVnYXRlKCkpLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnBvc2l0aW9uTm9kZSA/Pz0gVEhSRUUucG9zaXRpb25Mb2NhbDtcbiAgICB9XG5cbiAgICAvLyB0aGUgb3JkaW5hcnkgcG9zaXRpb24gc2V0dXBcbiAgICBjb25zdCByZXQgPSBzdXBlci5zZXR1cFBvc2l0aW9uKGJ1aWxkZXIpIGFzIFRIUkVFLlNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT47XG5cbiAgICAvLyBhbnRpIHotZmlnaHRpbmdcbiAgICAvLyBUT0RPOiBXZSBtaWdodCB3YW50IHRvIGFkZHJlc3MgdGhpcyB2aWEgZ2xQb2x5Z29uT2Zmc2V0IGluc3RlYWQ/XG4gICAgcmV0LnouYWRkKHJldC53Lm11bCgxZS02KSk7XG5cbiAgICAvLyByZXZlcnQgdGhlIHBvc2l0aW9uTm9kZVxuICAgIHRoaXMucG9zaXRpb25Ob2RlID0gdGVtcFBvc2l0aW9uTm9kZTtcblxuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICBwdWJsaWMgY29weShzb3VyY2U6IE1Ub29uTm9kZU1hdGVyaWFsKTogdGhpcyB7XG4gICAgdGhpcy5jb2xvci5jb3B5KHNvdXJjZS5jb2xvcik7XG4gICAgdGhpcy5tYXAgPSBzb3VyY2UubWFwID8/IG51bGw7XG4gICAgdGhpcy5lbWlzc2l2ZS5jb3B5KHNvdXJjZS5lbWlzc2l2ZSk7XG4gICAgdGhpcy5lbWlzc2l2ZUludGVuc2l0eSA9IHNvdXJjZS5lbWlzc2l2ZUludGVuc2l0eTtcbiAgICB0aGlzLmVtaXNzaXZlTWFwID0gc291cmNlLmVtaXNzaXZlTWFwID8/IG51bGw7XG4gICAgdGhpcy5ub3JtYWxNYXAgPSBzb3VyY2Uubm9ybWFsTWFwID8/IG51bGw7XG4gICAgdGhpcy5ub3JtYWxTY2FsZS5jb3B5KHNvdXJjZS5ub3JtYWxTY2FsZSk7XG5cbiAgICB0aGlzLnNoYWRlQ29sb3JGYWN0b3IuY29weShzb3VyY2Uuc2hhZGVDb2xvckZhY3Rvcik7XG4gICAgdGhpcy5zaGFkZU11bHRpcGx5VGV4dHVyZSA9IHNvdXJjZS5zaGFkZU11bHRpcGx5VGV4dHVyZSA/PyBudWxsO1xuICAgIHRoaXMuc2hhZGluZ1NoaWZ0RmFjdG9yID0gc291cmNlLnNoYWRpbmdTaGlmdEZhY3RvcjtcbiAgICB0aGlzLnNoYWRpbmdTaGlmdFRleHR1cmUgPSBzb3VyY2Uuc2hhZGluZ1NoaWZ0VGV4dHVyZSA/PyBudWxsO1xuICAgIHRoaXMuc2hhZGluZ1NoaWZ0VGV4dHVyZVNjYWxlID0gc291cmNlLnNoYWRpbmdTaGlmdFRleHR1cmVTY2FsZTtcbiAgICB0aGlzLnNoYWRpbmdUb29ueUZhY3RvciA9IHNvdXJjZS5zaGFkaW5nVG9vbnlGYWN0b3I7XG4gICAgdGhpcy5yaW1MaWdodGluZ01peEZhY3RvciA9IHNvdXJjZS5yaW1MaWdodGluZ01peEZhY3RvcjtcbiAgICB0aGlzLnJpbU11bHRpcGx5VGV4dHVyZSA9IHNvdXJjZS5yaW1NdWx0aXBseVRleHR1cmUgPz8gbnVsbDtcbiAgICB0aGlzLm1hdGNhcEZhY3Rvci5jb3B5KHNvdXJjZS5tYXRjYXBGYWN0b3IpO1xuICAgIHRoaXMubWF0Y2FwVGV4dHVyZSA9IHNvdXJjZS5tYXRjYXBUZXh0dXJlID8/IG51bGw7XG4gICAgdGhpcy5wYXJhbWV0cmljUmltQ29sb3JGYWN0b3IuY29weShzb3VyY2UucGFyYW1ldHJpY1JpbUNvbG9yRmFjdG9yKTtcbiAgICB0aGlzLnBhcmFtZXRyaWNSaW1MaWZ0RmFjdG9yID0gc291cmNlLnBhcmFtZXRyaWNSaW1MaWZ0RmFjdG9yO1xuICAgIHRoaXMucGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlckZhY3RvciA9IHNvdXJjZS5wYXJhbWV0cmljUmltRnJlc25lbFBvd2VyRmFjdG9yO1xuICAgIHRoaXMub3V0bGluZVdpZHRoTW9kZSA9IHNvdXJjZS5vdXRsaW5lV2lkdGhNb2RlO1xuICAgIHRoaXMub3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlID0gc291cmNlLm91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZSA/PyBudWxsO1xuICAgIHRoaXMub3V0bGluZVdpZHRoRmFjdG9yID0gc291cmNlLm91dGxpbmVXaWR0aEZhY3RvcjtcbiAgICB0aGlzLm91dGxpbmVDb2xvckZhY3Rvci5jb3B5KHNvdXJjZS5vdXRsaW5lQ29sb3JGYWN0b3IpO1xuICAgIHRoaXMub3V0bGluZUxpZ2h0aW5nTWl4RmFjdG9yID0gc291cmNlLm91dGxpbmVMaWdodGluZ01peEZhY3RvcjtcbiAgICB0aGlzLnV2QW5pbWF0aW9uU2Nyb2xsWFNwZWVkRmFjdG9yID0gc291cmNlLnV2QW5pbWF0aW9uU2Nyb2xsWFNwZWVkRmFjdG9yO1xuICAgIHRoaXMudXZBbmltYXRpb25TY3JvbGxZU3BlZWRGYWN0b3IgPSBzb3VyY2UudXZBbmltYXRpb25TY3JvbGxZU3BlZWRGYWN0b3I7XG4gICAgdGhpcy51dkFuaW1hdGlvblJvdGF0aW9uU3BlZWRGYWN0b3IgPSBzb3VyY2UudXZBbmltYXRpb25Sb3RhdGlvblNwZWVkRmFjdG9yO1xuICAgIHRoaXMudXZBbmltYXRpb25NYXNrVGV4dHVyZSA9IHNvdXJjZS51dkFuaW1hdGlvbk1hc2tUZXh0dXJlID8/IG51bGw7XG5cbiAgICB0aGlzLnNoYWRlQ29sb3JOb2RlID0gc291cmNlLnNoYWRlQ29sb3JOb2RlID8/IG51bGw7XG4gICAgdGhpcy5zaGFkaW5nU2hpZnROb2RlID0gc291cmNlLnNoYWRpbmdTaGlmdE5vZGUgPz8gbnVsbDtcbiAgICB0aGlzLnNoYWRpbmdUb29ueU5vZGUgPSBzb3VyY2Uuc2hhZGluZ1Rvb255Tm9kZSA/PyBudWxsO1xuICAgIHRoaXMucmltTGlnaHRpbmdNaXhOb2RlID0gc291cmNlLnJpbUxpZ2h0aW5nTWl4Tm9kZSA/PyBudWxsO1xuICAgIHRoaXMucmltTXVsdGlwbHlOb2RlID0gc291cmNlLnJpbU11bHRpcGx5Tm9kZSA/PyBudWxsO1xuICAgIHRoaXMubWF0Y2FwTm9kZSA9IHNvdXJjZS5tYXRjYXBOb2RlID8/IG51bGw7XG4gICAgdGhpcy5wYXJhbWV0cmljUmltQ29sb3JOb2RlID0gc291cmNlLnBhcmFtZXRyaWNSaW1Db2xvck5vZGUgPz8gbnVsbDtcbiAgICB0aGlzLnBhcmFtZXRyaWNSaW1MaWZ0Tm9kZSA9IHNvdXJjZS5wYXJhbWV0cmljUmltTGlmdE5vZGUgPz8gbnVsbDtcbiAgICB0aGlzLnBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJOb2RlID0gc291cmNlLnBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJOb2RlID8/IG51bGw7XG5cbiAgICB0aGlzLmlzT3V0bGluZSA9IHNvdXJjZS5pc091dGxpbmUgPz8gbnVsbDtcblxuICAgIHJldHVybiBzdXBlci5jb3B5KHNvdXJjZSk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnV2QW5pbWF0aW9uU2Nyb2xsWE9mZnNldCArPSBkZWx0YSAqIHRoaXMudXZBbmltYXRpb25TY3JvbGxYU3BlZWRGYWN0b3I7XG4gICAgdGhpcy51dkFuaW1hdGlvblNjcm9sbFlPZmZzZXQgKz0gZGVsdGEgKiB0aGlzLnV2QW5pbWF0aW9uU2Nyb2xsWVNwZWVkRmFjdG9yO1xuICAgIHRoaXMudXZBbmltYXRpb25Sb3RhdGlvblBoYXNlICs9IGRlbHRhICogdGhpcy51dkFuaW1hdGlvblJvdGF0aW9uU3BlZWRGYWN0b3I7XG4gIH1cblxuICBwcml2YXRlIF9zZXR1cFNoYWRlQ29sb3JOb2RlKCk6IFRIUkVFLlN3aXp6YWJsZSB7XG4gICAgaWYgKHRoaXMuc2hhZGVDb2xvck5vZGUgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIFRIUkVFLnZlYzModGhpcy5zaGFkZUNvbG9yTm9kZSk7XG4gICAgfVxuXG4gICAgbGV0IHNoYWRlQ29sb3JOb2RlOiBUSFJFRS5TaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+ID0gcmVmU2hhZGVDb2xvckZhY3RvcjtcblxuICAgIGlmICh0aGlzLnNoYWRlTXVsdGlwbHlUZXh0dXJlICYmIHRoaXMuc2hhZGVNdWx0aXBseVRleHR1cmUuaXNUZXh0dXJlID09PSB0cnVlKSB7XG4gICAgICBjb25zdCBtYXAgPSByZWZTaGFkZU11bHRpcGx5VGV4dHVyZS5jb250ZXh0KHsgZ2V0VVY6ICgpID0+IHRoaXMuX2FuaW1hdGVkVVZOb2RlIH0pO1xuICAgICAgc2hhZGVDb2xvck5vZGUgPSBzaGFkZUNvbG9yTm9kZS5tdWwobWFwKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2hhZGVDb2xvck5vZGU7XG4gIH1cblxuICBwcml2YXRlIF9zZXR1cFNoYWRpbmdTaGlmdE5vZGUoKTogVEhSRUUuTm9kZSB7XG4gICAgaWYgKHRoaXMuc2hhZGluZ1NoaWZ0Tm9kZSAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gVEhSRUUuZmxvYXQodGhpcy5zaGFkaW5nU2hpZnROb2RlKTtcbiAgICB9XG5cbiAgICBsZXQgc2hhZGluZ1NoaWZ0Tm9kZTogVEhSRUUuU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPiA9IHJlZlNoYWRpbmdTaGlmdEZhY3RvcjtcblxuICAgIGlmICh0aGlzLnNoYWRpbmdTaGlmdFRleHR1cmUgJiYgdGhpcy5zaGFkaW5nU2hpZnRUZXh0dXJlLmlzVGV4dHVyZSA9PT0gdHJ1ZSkge1xuICAgICAgY29uc3QgbWFwID0gcmVmU2hhZGVNdWx0aXBseVRleHR1cmUuY29udGV4dCh7IGdldFVWOiAoKSA9PiB0aGlzLl9hbmltYXRlZFVWTm9kZSB9KTtcbiAgICAgIHNoYWRpbmdTaGlmdE5vZGUgPSBzaGFkaW5nU2hpZnROb2RlLmFkZChtYXAubXVsKHJlZlNoYWRlTXVsdGlwbHlUZXh0dXJlU2NhbGUpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2hhZGluZ1NoaWZ0Tm9kZTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldHVwU2hhZGluZ1Rvb255Tm9kZSgpOiBUSFJFRS5Ob2RlIHtcbiAgICBpZiAodGhpcy5zaGFkaW5nVG9vbnlOb2RlICE9IG51bGwpIHtcbiAgICAgIHJldHVybiBUSFJFRS5mbG9hdCh0aGlzLnNoYWRpbmdUb29ueU5vZGUpO1xuICAgIH1cblxuICAgIHJldHVybiByZWZTaGFkaW5nVG9vbnlGYWN0b3I7XG4gIH1cblxuICBwcml2YXRlIF9zZXR1cFJpbUxpZ2h0aW5nTWl4Tm9kZSgpOiBUSFJFRS5Ob2RlIHtcbiAgICBpZiAodGhpcy5yaW1MaWdodGluZ01peE5vZGUgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIFRIUkVFLmZsb2F0KHRoaXMucmltTGlnaHRpbmdNaXhOb2RlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVmUmltTGlnaHRpbmdNaXhGYWN0b3I7XG4gIH1cblxuICBwcml2YXRlIF9zZXR1cFJpbU11bHRpcGx5Tm9kZSgpOiBUSFJFRS5Td2l6emFibGUge1xuICAgIGlmICh0aGlzLnJpbU11bHRpcGx5Tm9kZSAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gVEhSRUUudmVjMyh0aGlzLnJpbU11bHRpcGx5Tm9kZSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucmltTXVsdGlwbHlUZXh0dXJlICYmIHRoaXMucmltTXVsdGlwbHlUZXh0dXJlLmlzVGV4dHVyZSA9PT0gdHJ1ZSkge1xuICAgICAgY29uc3QgbWFwID0gcmVmUmltTXVsdGlwbHlUZXh0dXJlLmNvbnRleHQoeyBnZXRVVjogKCkgPT4gdGhpcy5fYW5pbWF0ZWRVVk5vZGUgfSk7XG4gICAgICByZXR1cm4gbWFwO1xuICAgIH1cblxuICAgIHJldHVybiBUSFJFRS52ZWMzKDEuMCk7XG4gIH1cblxuICBwcml2YXRlIF9zZXR1cE1hdGNhcE5vZGUoKTogVEhSRUUuU3dpenphYmxlIHtcbiAgICBpZiAodGhpcy5tYXRjYXBOb2RlICE9IG51bGwpIHtcbiAgICAgIHJldHVybiBUSFJFRS52ZWMzKHRoaXMubWF0Y2FwTm9kZSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubWF0Y2FwVGV4dHVyZSAmJiB0aGlzLm1hdGNhcFRleHR1cmUuaXNUZXh0dXJlID09PSB0cnVlKSB7XG4gICAgICBjb25zdCBtYXAgPSByZWZNYXRjYXBUZXh0dXJlLmNvbnRleHQoeyBnZXRVVjogKCkgPT4gVEhSRUUubWF0Y2FwVVYubXVsKDEuMCwgLTEuMCkuYWRkKDAuMCwgMS4wKSB9KTtcbiAgICAgIHJldHVybiBtYXAubXVsKHJlZk1hdGNhcEZhY3Rvcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIFRIUkVFLnZlYzMoMC4wKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldHVwUGFyYW1ldHJpY1JpbU5vZGUoKTogVEhSRUUuU3dpenphYmxlIHtcbiAgICBjb25zdCBwYXJhbWV0cmljUmltQ29sb3IgPVxuICAgICAgdGhpcy5wYXJhbWV0cmljUmltQ29sb3JOb2RlICE9IG51bGwgPyBUSFJFRS52ZWMzKHRoaXMucGFyYW1ldHJpY1JpbUNvbG9yTm9kZSkgOiByZWZQYXJhbWV0cmljUmltQ29sb3JGYWN0b3I7XG5cbiAgICBjb25zdCBwYXJhbWV0cmljUmltTGlmdCA9XG4gICAgICB0aGlzLnBhcmFtZXRyaWNSaW1MaWZ0Tm9kZSAhPSBudWxsID8gVEhSRUUuZmxvYXQodGhpcy5wYXJhbWV0cmljUmltTGlmdE5vZGUpIDogcmVmUGFyYW1ldHJpY1JpbUxpZnRGYWN0b3I7XG5cbiAgICBjb25zdCBwYXJhbWV0cmljUmltRnJlc25lbFBvd2VyID1cbiAgICAgIHRoaXMucGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlck5vZGUgIT0gbnVsbFxuICAgICAgICA/IFRIUkVFLmZsb2F0KHRoaXMucGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlck5vZGUpXG4gICAgICAgIDogcmVmUGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlckZhY3RvcjtcblxuICAgIHJldHVybiBtdG9vblBhcmFtZXRyaWNSaW0oe1xuICAgICAgcGFyYW1ldHJpY1JpbUxpZnQsXG4gICAgICBwYXJhbWV0cmljUmltRnJlc25lbFBvd2VyLFxuICAgICAgcGFyYW1ldHJpY1JpbUNvbG9yLFxuICAgIH0pO1xuICB9XG59XG5cbi8vIFRPRE86IFBhcnQgb2Ygc3R1ZmYgdGhhdCBNVG9vbk1hdGVyaWFsIGRlcGVuZHMgb24gZG9lcyBub3QgZXhpc3QgaW4gdGhyZWUvd2ViZ3B1IChlLmcuIFVuaWZvcm1zTGliKVxuLy8gVEhSRUUuYWRkTm9kZU1hdGVyaWFsKCdNVG9vbk5vZGVNYXRlcmlhbCcsIE1Ub29uTm9kZU1hdGVyaWFsKTtcbiIsICIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cblxuZXhwb3J0IGNvbnN0IE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlID0ge1xuICBOb25lOiAnbm9uZScsXG4gIFdvcmxkQ29vcmRpbmF0ZXM6ICd3b3JsZENvb3JkaW5hdGVzJyxcbiAgU2NyZWVuQ29vcmRpbmF0ZXM6ICdzY3JlZW5Db29yZGluYXRlcycsXG59IGFzIGNvbnN0O1xuXG5leHBvcnQgdHlwZSBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZSA9XG4gIHR5cGVvZiBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZVtrZXlvZiB0eXBlb2YgTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGVdO1xuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlL3dlYmdwdSc7XG5cbmV4cG9ydCBjb25zdCBtdG9vblBhcmFtZXRyaWNSaW0gPSBUSFJFRS50c2xGbihcbiAgKHtcbiAgICBwYXJhbWV0cmljUmltTGlmdCxcbiAgICBwYXJhbWV0cmljUmltRnJlc25lbFBvd2VyLFxuICAgIHBhcmFtZXRyaWNSaW1Db2xvcixcbiAgfToge1xuICAgIHBhcmFtZXRyaWNSaW1MaWZ0OiBUSFJFRS5Ob2RlUmVwcmVzZW50YXRpb247XG4gICAgcGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlcjogVEhSRUUuTm9kZVJlcHJlc2VudGF0aW9uO1xuICAgIHBhcmFtZXRyaWNSaW1Db2xvcjogVEhSRUUuTm9kZVJlcHJlc2VudGF0aW9uO1xuICB9KSA9PiB7XG4gICAgY29uc3Qgdmlld0RpciA9IFRIUkVFLm1vZGVsVmlld1Bvc2l0aW9uLm5vcm1hbGl6ZSgpO1xuICAgIGNvbnN0IGRvdE5WID0gVEhSRUUudHJhbnNmb3JtZWROb3JtYWxWaWV3LmRvdCh2aWV3RGlyLm5lZ2F0ZSgpKTtcblxuICAgIGNvbnN0IHJpbSA9IFRIUkVFLmZsb2F0KDEuMCkuc3ViKGRvdE5WKS5hZGQocGFyYW1ldHJpY1JpbUxpZnQpLmNsYW1wKCkucG93KHBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXIpO1xuXG4gICAgcmV0dXJuIHJpbS5tdWwocGFyYW1ldHJpY1JpbUNvbG9yKTtcbiAgfSxcbik7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUNHQSxZQUF1QjtBQ0h2QixhQUF1QjtBQ0F2QixhQUF1QjtBQ0F2QixhQUF1QjtBQ0F2QixhQUF1QjtBQ0F2QixhQUF1QjtBRUF2QixhQUF1QjtBUEt2QixJQUFNLGdCQUFnQixTQUFlLGdCQUFVLEVBQUU7QUFDakQsSUFBSSxnQkFBZ0IsS0FBSztBQUN2QixVQUFRO0lBQ04sc0VBQXNFLGFBQWE7RUFDckY7QUFDRjtBRVJPLElBQU0sV0FBaUIseUJBQWtCLFNBQVMsT0FBTztBQUN6RCxJQUFNLFNBQWUseUJBQWtCLE9BQU8sU0FBUztBQUN2RCxJQUFNLGVBQXFCLHlCQUFrQixhQUFhLFNBQVM7QUFDbkUsSUFBTSxpQkFBdUIseUJBQWtCLGVBQWUsTUFBTTtBQUNwRSxJQUFNLGNBQW9CLHlCQUFr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O0FBRUEsV0FBYSxZQUFLLENBQUc7RUFDdkI7RUFFUSxtQkFBb0M7QUFDMUMsUUFBSSxLQUFLLGNBQWMsTUFBTTtBQUMzQixhQUFhLFlBQUssS0FBSyxVQUFVO0lBQ25DO0FBRUEsUUFBSSxLQUFLLGlCQUFpQixLQUFLLGNBQWMsY0FBYyxNQUFNO0FBQy9ELFlBQU0sTUFBTSxpQkFBaUIsUUFBUSxFQUFFLE9BQU8sTUFBWSxnQkFBUyxJQUFJLEdBQUssRUFBSSxFQUFFLElBQUksR0FBSyxDQUFHLEVBQUUsQ0FBQztBQUNqRyxhQUFPLElBQUksSUFBSSxlQUFlO0lBQ2hDO0FBRUEsV0FBYSxZQUFLLENBQUc7RUFDdkI7RUFFUSwwQkFBMkM7QUFDakQsVUFBTSxxQkFDSixLQUFLLDBCQUEwQixPQUFhLFlBQUssS0FBSyxzQkFBc0IsSUFBSTtBQUVsRixVQUFNLG9CQUNKLEtBQUsseUJBQXlCLE9BQWEsYUFBTSxLQUFLLHFCQUFxQixJQUFJO0FBRWpGLFVBQU0sNEJBQ0osS0FBSyxpQ0FBaUMsT0FDNUIsYUFBTSxLQUFLLDZCQUE2QixJQUM5QztBQUVOLFdBQU8sbUJBQW1CO01BQ3hCO01BQ0E7TUFDQTtJQUNGLENBQUM7RUFDSDtBQUNGOyIsCiAgIm5hbWVzIjogWyJ1diIsICJkaWZmdXNlQ29sb3IiLCAibm9ybWFsTG9jYWwiXQp9Cg==
