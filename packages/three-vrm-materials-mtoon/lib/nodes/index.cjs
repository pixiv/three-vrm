/*!
 * @pixiv/three-vrm-materials-mtoon v3.0.0-beta.2
 * MToon (toon material) module for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2024 pixiv Inc.
 * @pixiv/three-vrm-materials-mtoon is distributed under MIT License
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

// src/nodes/warningIfPre161.ts
var THREE = __toESM(require("three"), 1);
var threeRevision = parseInt(THREE.REVISION, 10);
if (threeRevision < 167) {
  console.warn(
    `MToonNodeMaterial requires Three.js r167 or higher (You are using r${threeRevision}). This would not work correctly.`
  );
}

// src/nodes/MToonAnimatedUVNode.ts
var THREE3 = __toESM(require("three/webgpu"), 1);

// src/nodes/materialReferences.ts
var THREE2 = __toESM(require("three/webgpu"), 1);
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

// src/nodes/MToonAnimatedUVNode.ts
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

// src/nodes/MToonLightingModel.ts
var THREE5 = __toESM(require("three/webgpu"), 1);

// src/nodes/immutableNodes.ts
var THREE4 = __toESM(require("three/webgpu"), 1);
var shadeColor = THREE4.nodeImmutable(THREE4.PropertyNode, "vec3").temp("ShadeColor");
var shadingShift = THREE4.nodeImmutable(THREE4.PropertyNode, "float").temp("ShadingShift");
var shadingToony = THREE4.nodeImmutable(THREE4.PropertyNode, "float").temp("ShadingToony");
var rimLightingMix = THREE4.nodeImmutable(THREE4.PropertyNode, "float").temp("RimLightingMix");
var rimMultiply = THREE4.nodeImmutable(THREE4.PropertyNode, "vec3").temp("RimMultiply");
var matcap = THREE4.nodeImmutable(THREE4.PropertyNode, "vec3").temp("matcap");
var parametricRim = THREE4.nodeImmutable(THREE4.PropertyNode, "vec3").temp("ParametricRim");

// src/nodes/MToonLightingModel.ts
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

// src/nodes/MToonNodeMaterial.ts
var THREE7 = __toESM(require("three/webgpu"), 1);

// src/MToonMaterialOutlineWidthMode.ts
var MToonMaterialOutlineWidthMode = {
  None: "none",
  WorldCoordinates: "worldCoordinates",
  ScreenCoordinates: "screenCoordinates"
};

// src/nodes/mtoonParametricRim.ts
var THREE6 = __toESM(require("three/webgpu"), 1);
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

// src/nodes/MToonNodeMaterial.ts
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL25vZGVzL2luZGV4LnRzIiwgIi4uLy4uL3NyYy9ub2Rlcy93YXJuaW5nSWZQcmUxNjEudHMiLCAiLi4vLi4vc3JjL25vZGVzL01Ub29uQW5pbWF0ZWRVVk5vZGUudHMiLCAiLi4vLi4vc3JjL25vZGVzL21hdGVyaWFsUmVmZXJlbmNlcy50cyIsICIuLi8uLi9zcmMvbm9kZXMvTVRvb25MaWdodGluZ01vZGVsLnRzIiwgIi4uLy4uL3NyYy9ub2Rlcy9pbW11dGFibGVOb2Rlcy50cyIsICIuLi8uLi9zcmMvbm9kZXMvTVRvb25Ob2RlTWF0ZXJpYWwudHMiLCAiLi4vLi4vc3JjL01Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlLnRzIiwgIi4uLy4uL3NyYy9ub2Rlcy9tdG9vblBhcmFtZXRyaWNSaW0udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCAnLi93YXJuaW5nSWZQcmUxNjEuanMnO1xuXG5leHBvcnQgeyBNVG9vbkFuaW1hdGVkVVZOb2RlIH0gZnJvbSAnLi9NVG9vbkFuaW1hdGVkVVZOb2RlJztcbmV4cG9ydCB7IE1Ub29uTGlnaHRpbmdNb2RlbCB9IGZyb20gJy4vTVRvb25MaWdodGluZ01vZGVsJztcbmV4cG9ydCB7IE1Ub29uTm9kZU1hdGVyaWFsIH0gZnJvbSAnLi9NVG9vbk5vZGVNYXRlcmlhbCc7XG5leHBvcnQgdHlwZSB7IE1Ub29uTm9kZU1hdGVyaWFsUGFyYW1ldGVycyB9IGZyb20gJy4vTVRvb25Ob2RlTWF0ZXJpYWxQYXJhbWV0ZXJzJztcbiIsICIvLyBUaGlzIG1vZHVsZSB3aWxsIGJlIGltcG9ydGVkIGF0IHRoZSBiZWdpbm5pbmcgb2YgYHRocmVlLXZybS1tYXRlcmlhbHMtbXRvb24vbm9kZXNgXG4vLyBJZiB0aGUgdmVyc2lvbiBvZiBUaHJlZS5qcyBpcyBsZXNzIHRoYW4gcjE2NywgaXQgd2lsbCB3YXJuIHRoYXQgaXQgaXMgbm90IHN1cHBvcnRlZFxuXG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbmNvbnN0IHRocmVlUmV2aXNpb24gPSBwYXJzZUludChUSFJFRS5SRVZJU0lPTiwgMTApO1xuaWYgKHRocmVlUmV2aXNpb24gPCAxNjcpIHtcbiAgY29uc29sZS53YXJuKFxuICAgIGBNVG9vbk5vZGVNYXRlcmlhbCByZXF1aXJlcyBUaHJlZS5qcyByMTY3IG9yIGhpZ2hlciAoWW91IGFyZSB1c2luZyByJHt0aHJlZVJldmlzaW9ufSkuIFRoaXMgd291bGQgbm90IHdvcmsgY29ycmVjdGx5LmAsXG4gICk7XG59XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUvd2ViZ3B1JztcbmltcG9ydCB7XG4gIHJlZlVWQW5pbWF0aW9uTWFza1RleHR1cmUsXG4gIHJlZlVWQW5pbWF0aW9uUm90YXRpb25QaGFzZSxcbiAgcmVmVVZBbmltYXRpb25TY3JvbGxYT2Zmc2V0LFxuICByZWZVVkFuaW1hdGlvblNjcm9sbFlPZmZzZXQsXG59IGZyb20gJy4vbWF0ZXJpYWxSZWZlcmVuY2VzJztcblxuZXhwb3J0IGNsYXNzIE1Ub29uQW5pbWF0ZWRVVk5vZGUgZXh0ZW5kcyBUSFJFRS5UZW1wTm9kZSB7XG4gIHB1YmxpYyByZWFkb25seSBoYXNNYXNrVGV4dHVyZTogYm9vbGVhbjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoaGFzTWFza1RleHR1cmU6IGJvb2xlYW4pIHtcbiAgICBzdXBlcigndmVjMicpO1xuXG4gICAgdGhpcy5oYXNNYXNrVGV4dHVyZSA9IGhhc01hc2tUZXh0dXJlO1xuICB9XG5cbiAgcHVibGljIHNldHVwKCk6IFRIUkVFLlNoYWRlck5vZGVPYmplY3Q8VEhSRUUuVmFyTm9kZT4ge1xuICAgIGxldCB1dkFuaW1hdGlvbk1hc2s6IFRIUkVFLk5vZGVSZXByZXNlbnRhdGlvbiA9IDEuMDtcblxuICAgIGlmICh0aGlzLmhhc01hc2tUZXh0dXJlKSB7XG4gICAgICB1dkFuaW1hdGlvbk1hc2sgPSBUSFJFRS52ZWM0KHJlZlVWQW5pbWF0aW9uTWFza1RleHR1cmUpLmNvbnRleHQoeyBnZXRVVjogKCkgPT4gVEhSRUUudXYoKSB9KS5yO1xuICAgIH1cblxuICAgIGxldCB1djogVEhSRUUuU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Td2l6emFibGU+ID0gVEhSRUUudXYoKTtcblxuICAgIC8vIHJvdGF0ZVxuICAgIGNvbnN0IHBoYXNlID0gcmVmVVZBbmltYXRpb25Sb3RhdGlvblBoYXNlLm11bCh1dkFuaW1hdGlvbk1hc2spO1xuXG4gICAgLy8gV09SS0FST1VORDogVEhSRUUucm90YXRlVVYgY2F1c2VzIGFuIGlzc3VlIHdpdGggdGhlIG1hc2sgdGV4dHVyZVxuICAgIC8vIFdlIGFyZSBnb2luZyB0byBzcGluIHVzaW5nIGEgMTAwJSBvcmdhbmljIGhhbmRtYWRlIHJvdGF0aW9uIG1hdHJpeFxuICAgIC8vIHV2ID0gVEhSRUUucm90YXRlVVYodXYsIHBoYXNlLCBUSFJFRS52ZWMyKDAuNSwgMC41KSk7XG5cbiAgICBjb25zdCBjID0gVEhSRUUuY29zKHBoYXNlKTtcbiAgICBjb25zdCBzID0gVEhSRUUuc2luKHBoYXNlKTtcbiAgICB1diA9IHV2LnN1YihUSFJFRS52ZWMyKDAuNSwgMC41KSk7XG4gICAgdXYgPSB1di5tdWwoVEhSRUUubWF0MihjLCBzLCBzLm5lZ2F0ZSgpLCBjKSk7XG4gICAgdXYgPSB1di5hZGQoVEhSRUUudmVjMigwLjUsIDAuNSkpO1xuXG4gICAgLy8gc2Nyb2xsXG4gICAgY29uc3Qgc2Nyb2xsID0gVEhSRUUudmVjMihyZWZVVkFuaW1hdGlvblNjcm9sbFhPZmZzZXQsIHJlZlVWQW5pbWF0aW9uU2Nyb2xsWU9mZnNldCkubXVsKHV2QW5pbWF0aW9uTWFzayk7XG4gICAgdXYgPSB1di5hZGQoc2Nyb2xsKTtcblxuICAgIHJldHVybiB1di50ZW1wKCdBbmltYXRlZFVWJyk7XG4gIH1cbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS93ZWJncHUnO1xuXG5leHBvcnQgY29uc3QgcmVmQ29sb3IgPSBUSFJFRS5tYXRlcmlhbFJlZmVyZW5jZSgnY29sb3InLCAnY29sb3InKTtcbmV4cG9ydCBjb25zdCByZWZNYXAgPSBUSFJFRS5tYXRlcmlhbFJlZmVyZW5jZSgnbWFwJywgJ3RleHR1cmUnKTtcbmV4cG9ydCBjb25zdCByZWZOb3JtYWxNYXAgPSBUSFJFRS5tYXRlcmlhbFJlZmVyZW5jZSgnbm9ybWFsTWFwJywgJ3RleHR1cmUnKTtcbmV4cG9ydCBjb25zdCByZWZOb3JtYWxTY2FsZSA9IFRIUkVFLm1hdGVyaWFsUmVmZXJlbmNlKCdub3JtYWxTY2FsZScsICd2ZWMyJyk7XG5leHBvcnQgY29uc3QgcmVmRW1pc3NpdmUgPSBUSFJFRS5tYXRlcmlhbFJlZmVyZW5jZSgnZW1pc3NpdmUnLCAnY29sb3InKTtcbmV4cG9ydCBjb25zdCByZWZFbWlzc2l2ZUludGVuc2l0eSA9IFRIUkVFLm1hdGVyaWFsUmVmZXJlbmNlKCdlbWlzc2l2ZUludGVuc2l0eScsICdmbG9hdCcpO1xuZXhwb3J0IGNvbnN0IHJlZkVtaXNzaXZlTWFwID0gVEhSRUUubWF0ZXJpYWxSZWZlcmVuY2UoJ2VtaXNzaXZlTWFwJywgJ3RleHR1cmUnKTtcblxuZXhwb3J0IGNvbnN0IHJlZlNoYWRlQ29sb3JGYWN0b3IgPSBUSFJFRS5tYXRlcmlhbFJlZmVyZW5jZSgnc2hhZGVDb2xvckZhY3RvcicsICdjb2xvcicpO1xuZXhwb3J0IGNvbnN0IHJlZlNoYWRpbmdTaGlmdEZhY3RvciA9IFRIUkVFLm1hdGVyaWFsUmVmZXJlbmNlKCdzaGFkaW5nU2hpZnRGYWN0b3InLCAnZmxvYXQnKTtcbmV4cG9ydCBjb25zdCByZWZTaGFkZU11bHRpcGx5VGV4dHVyZSA9IFRIUkVFLm1hdGVyaWFsUmVmZXJlbmNlKCdzaGFkZU11bHRpcGx5VGV4dHVyZScsICd0ZXh0dXJlJyk7XG5leHBvcnQgY29uc3QgcmVmU2hhZGVNdWx0aXBseVRleHR1cmVTY2FsZSA9IFRIUkVFLm1hdGVyaWFsUmVmZXJlbmNlKCdzaGFkZU11bHRpcGx5VGV4dHVyZVNjYWxlJywgJ2Zsb2F0Jyk7XG5leHBvcnQgY29uc3QgcmVmU2hhZGluZ1Rvb255RmFjdG9yID0gVEhSRUUubWF0ZXJpYWxSZWZlcmVuY2UoJ3NoYWRpbmdUb29ueUZhY3RvcicsICdmbG9hdCcpO1xuZXhwb3J0IGNvbnN0IHJlZlJpbUxpZ2h0aW5nTWl4RmFjdG9yID0gVEhSRUUubWF0ZXJpYWxSZWZlcmVuY2UoJ3JpbUxpZ2h0aW5nTWl4RmFjdG9yJywgJ2Zsb2F0Jyk7XG5leHBvcnQgY29uc3QgcmVmUmltTXVsdGlwbHlUZXh0dXJlID0gVEhSRUUubWF0ZXJpYWxSZWZlcmVuY2UoJ3JpbU11bHRpcGx5VGV4dHVyZScsICd0ZXh0dXJlJyk7XG5leHBvcnQgY29uc3QgcmVmTWF0Y2FwRmFjdG9yID0gVEhSRUUubWF0ZXJpYWxSZWZlcmVuY2UoJ21hdGNhcEZhY3RvcicsICdjb2xvcicpO1xuZXhwb3J0IGNvbnN0IHJlZk1hdGNhcFRleHR1cmUgPSBUSFJFRS5tYXRlcmlhbFJlZmVyZW5jZSgnbWF0Y2FwVGV4dHVyZScsICd0ZXh0dXJlJyk7XG5leHBvcnQgY29uc3QgcmVmUGFyYW1ldHJpY1JpbUNvbG9yRmFjdG9yID0gVEhSRUUubWF0ZXJpYWxSZWZlcmVuY2UoJ3BhcmFtZXRyaWNSaW1Db2xvckZhY3RvcicsICdjb2xvcicpO1xuZXhwb3J0IGNvbnN0IHJlZlBhcmFtZXRyaWNSaW1MaWZ0RmFjdG9yID0gVEhSRUUubWF0ZXJpYWxSZWZlcmVuY2UoJ3BhcmFtZXRyaWNSaW1MaWZ0RmFjdG9yJywgJ2Zsb2F0Jyk7XG5leHBvcnQgY29uc3QgcmVmUGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlckZhY3RvciA9IFRIUkVFLm1hdGVyaWFsUmVmZXJlbmNlKCdwYXJhbWV0cmljUmltRnJlc25lbFBvd2VyRmFjdG9yJywgJ2Zsb2F0Jyk7XG5leHBvcnQgY29uc3QgcmVmT3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlID0gVEhSRUUubWF0ZXJpYWxSZWZlcmVuY2UoJ291dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZScsICd0ZXh0dXJlJyk7XG5leHBvcnQgY29uc3QgcmVmT3V0bGluZVdpZHRoRmFjdG9yID0gVEhSRUUubWF0ZXJpYWxSZWZlcmVuY2UoJ291dGxpbmVXaWR0aEZhY3RvcicsICdmbG9hdCcpO1xuZXhwb3J0IGNvbnN0IHJlZk91dGxpbmVDb2xvckZhY3RvciA9IFRIUkVFLm1hdGVyaWFsUmVmZXJlbmNlKCdvdXRsaW5lQ29sb3JGYWN0b3InLCAnY29sb3InKTtcbmV4cG9ydCBjb25zdCByZWZPdXRsaW5lTGlnaHRpbmdNaXhGYWN0b3IgPSBUSFJFRS5tYXRlcmlhbFJlZmVyZW5jZSgnb3V0bGluZUxpZ2h0aW5nTWl4RmFjdG9yJywgJ2Zsb2F0Jyk7XG5leHBvcnQgY29uc3QgcmVmVVZBbmltYXRpb25NYXNrVGV4dHVyZSA9IFRIUkVFLm1hdGVyaWFsUmVmZXJlbmNlKCd1dkFuaW1hdGlvbk1hc2tUZXh0dXJlJywgJ3RleHR1cmUnKTtcblxuZXhwb3J0IGNvbnN0IHJlZlVWQW5pbWF0aW9uU2Nyb2xsWE9mZnNldCA9IFRIUkVFLm1hdGVyaWFsUmVmZXJlbmNlKCd1dkFuaW1hdGlvblNjcm9sbFhPZmZzZXQnLCAnZmxvYXQnKTtcbmV4cG9ydCBjb25zdCByZWZVVkFuaW1hdGlvblNjcm9sbFlPZmZzZXQgPSBUSFJFRS5tYXRlcmlhbFJlZmVyZW5jZSgndXZBbmltYXRpb25TY3JvbGxZT2Zmc2V0JywgJ2Zsb2F0Jyk7XG5leHBvcnQgY29uc3QgcmVmVVZBbmltYXRpb25Sb3RhdGlvblBoYXNlID0gVEhSRUUubWF0ZXJpYWxSZWZlcmVuY2UoJ3V2QW5pbWF0aW9uUm90YXRpb25QaGFzZScsICdmbG9hdCcpO1xuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlL3dlYmdwdSc7XG5pbXBvcnQge1xuICBtYXRjYXAsXG4gIHBhcmFtZXRyaWNSaW0sXG4gIHJpbUxpZ2h0aW5nTWl4LFxuICByaW1NdWx0aXBseSxcbiAgc2hhZGVDb2xvcixcbiAgc2hhZGluZ1NoaWZ0LFxuICBzaGFkaW5nVG9vbnksXG59IGZyb20gJy4vaW1tdXRhYmxlTm9kZXMnO1xuXG4vLyBUT0RPOiAwJSBjb25maWRlbmNlIGFib3V0IGZ1bmN0aW9uIHR5cGVzLlxuXG5jb25zdCBsaW5lYXJzdGVwID0gVEhSRUUudHNsRm4oXG4gICh7XG4gICAgYSxcbiAgICBiLFxuICAgIHQsXG4gIH06IHtcbiAgICBhOiBUSFJFRS5TaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+O1xuICAgIGI6IFRIUkVFLlNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT47XG4gICAgdDogVEhSRUUuU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPjtcbiAgfSkgPT4ge1xuICAgIGNvbnN0IHRvcCA9IHQuc3ViKGEpO1xuICAgIGNvbnN0IGJvdHRvbSA9IGIuc3ViKGEpO1xuICAgIHJldHVybiB0b3AuZGl2KGJvdHRvbSkuY2xhbXAoKTtcbiAgfSxcbik7XG5cbi8qKlxuICogQ29udmVydCBOZG90TCBpbnRvIHRvb24gc2hhZGluZyBmYWN0b3IgdXNpbmcgc2hhZGluZ1NoaWZ0IGFuZCBzaGFkaW5nVG9vbnlcbiAqL1xuY29uc3QgZ2V0U2hhZGluZyA9IFRIUkVFLnRzbEZuKCh7IGRvdE5MIH06IHsgZG90Tkw6IFRIUkVFLlNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT4gfSkgPT4ge1xuICBjb25zdCBzaGFkb3cgPSAxLjA7IC8vIFRPRE9cblxuICBjb25zdCBmZWF0aGVyID0gVEhSRUUuZmxvYXQoMS4wKS5zdWIoc2hhZGluZ1Rvb255KTtcblxuICBsZXQgc2hhZGluZzogVEhSRUUuU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPiA9IGRvdE5MLmFkZChzaGFkaW5nU2hpZnQpO1xuICBzaGFkaW5nID0gbGluZWFyc3RlcCh7XG4gICAgYTogZmVhdGhlci5uZWdhdGUoKSxcbiAgICBiOiBmZWF0aGVyLFxuICAgIHQ6IHNoYWRpbmcsXG4gIH0pO1xuICBzaGFkaW5nID0gc2hhZGluZy5tdWwoc2hhZG93KTtcbiAgcmV0dXJuIHNoYWRpbmc7XG59KTtcblxuLyoqXG4gKiBNaXggZGlmZnVzZUNvbG9yIGFuZCBzaGFkZUNvbG9yIHVzaW5nIHNoYWRpbmcgZmFjdG9yIGFuZCBsaWdodCBjb2xvclxuICovXG5jb25zdCBnZXREaWZmdXNlID0gVEhSRUUudHNsRm4oXG4gICh7XG4gICAgc2hhZGluZyxcbiAgICBsaWdodENvbG9yLFxuICB9OiB7XG4gICAgc2hhZGluZzogVEhSRUUuU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPjtcbiAgICBsaWdodENvbG9yOiBUSFJFRS5TaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+O1xuICB9KSA9PiB7XG4gICAgY29uc3QgZGlmZnVzZUNvbG9yID0gVEhSRUUubWl4KHNoYWRlQ29sb3IsIFRIUkVFLmRpZmZ1c2VDb2xvciwgc2hhZGluZyk7XG4gICAgY29uc3QgY29sID0gbGlnaHRDb2xvci5tdWwoVEhSRUUuQlJERl9MYW1iZXJ0KHsgZGlmZnVzZUNvbG9yIH0pKTtcblxuICAgIHJldHVybiBjb2w7XG4gIH0sXG4pO1xuXG5leHBvcnQgY2xhc3MgTVRvb25MaWdodGluZ01vZGVsIGV4dGVuZHMgVEhSRUUuTGlnaHRpbmdNb2RlbCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBkaXJlY3QoeyBsaWdodERpcmVjdGlvbiwgbGlnaHRDb2xvciwgcmVmbGVjdGVkTGlnaHQgfTogVEhSRUUuTGlnaHRpbmdNb2RlbERpcmVjdElucHV0KSB7XG4gICAgY29uc3QgZG90TkwgPSBUSFJFRS50cmFuc2Zvcm1lZE5vcm1hbFZpZXcuZG90KGxpZ2h0RGlyZWN0aW9uKS5jbGFtcCgtMS4wLCAxLjApO1xuXG4gICAgLy8gdG9vbiBkaWZmdXNlXG4gICAgY29uc3Qgc2hhZGluZyA9IGdldFNoYWRpbmcoe1xuICAgICAgZG90TkwsXG4gICAgfSk7XG5cbiAgICAvLyBVbmFibGUgdG8gdXNlIGBhZGRBc3NpZ25gIGluIHRoZSBjdXJyZW50IEB0eXBlcy90aHJlZSwgd2UgdXNlIGBhc3NpZ25gIGFuZCBgYWRkYCBpbnN0ZWFkXG4gICAgLy8gVE9ETzogRml4IHRoZSBgYWRkQXNzaWduYCBpc3N1ZSBmcm9tIHRoZSBgQHR5cGVzL3RocmVlYCBzaWRlXG5cbiAgICAocmVmbGVjdGVkTGlnaHQuZGlyZWN0RGlmZnVzZSBhcyBUSFJFRS5TaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+KS5hc3NpZ24oXG4gICAgICAocmVmbGVjdGVkTGlnaHQuZGlyZWN0RGlmZnVzZSBhcyBUSFJFRS5TaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+KS5hZGQoXG4gICAgICAgIGdldERpZmZ1c2Uoe1xuICAgICAgICAgIHNoYWRpbmcsXG4gICAgICAgICAgbGlnaHRDb2xvcjogbGlnaHRDb2xvciBhcyBUSFJFRS5TaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+LFxuICAgICAgICB9KSxcbiAgICAgICksXG4gICAgKTtcblxuICAgIC8vIHJpbVxuICAgIChyZWZsZWN0ZWRMaWdodC5kaXJlY3RTcGVjdWxhciBhcyBUSFJFRS5TaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+KS5hc3NpZ24oXG4gICAgICAocmVmbGVjdGVkTGlnaHQuZGlyZWN0U3BlY3VsYXIgYXMgVEhSRUUuU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPikuYWRkKFxuICAgICAgICBwYXJhbWV0cmljUmltXG4gICAgICAgICAgLmFkZChtYXRjYXApXG4gICAgICAgICAgLm11bChyaW1NdWx0aXBseSlcbiAgICAgICAgICAubXVsKFRIUkVFLm1peChUSFJFRS52ZWMzKDAuMCksIFRIUkVFLkJSREZfTGFtYmVydCh7IGRpZmZ1c2VDb2xvcjogbGlnaHRDb2xvciB9KSwgcmltTGlnaHRpbmdNaXgpKSxcbiAgICAgICksXG4gICAgKTtcbiAgfVxuXG4gIGluZGlyZWN0KGNvbnRleHQ6IFRIUkVFLkxpZ2h0aW5nTW9kZWxJbmRpcmVjdElucHV0KSB7XG4gICAgdGhpcy5pbmRpcmVjdERpZmZ1c2UoY29udGV4dCk7XG4gICAgdGhpcy5pbmRpcmVjdFNwZWN1bGFyKGNvbnRleHQpO1xuICB9XG5cbiAgaW5kaXJlY3REaWZmdXNlKHsgaXJyYWRpYW5jZSwgcmVmbGVjdGVkTGlnaHQgfTogVEhSRUUuTGlnaHRpbmdNb2RlbEluZGlyZWN0SW5wdXQpIHtcbiAgICAvLyBpbmRpcmVjdCBpcnJhZGlhbmNlXG4gICAgKHJlZmxlY3RlZExpZ2h0LmluZGlyZWN0RGlmZnVzZSBhcyBUSFJFRS5TaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+KS5hc3NpZ24oXG4gICAgICAocmVmbGVjdGVkTGlnaHQuaW5kaXJlY3REaWZmdXNlIGFzIFRIUkVFLlNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT4pLmFkZChcbiAgICAgICAgKGlycmFkaWFuY2UgYXMgVEhSRUUuU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPikubXVsKFxuICAgICAgICAgIFRIUkVFLkJSREZfTGFtYmVydCh7XG4gICAgICAgICAgICBkaWZmdXNlQ29sb3I6IFRIUkVFLmRpZmZ1c2VDb2xvcixcbiAgICAgICAgICB9KSxcbiAgICAgICAgKSxcbiAgICAgICksXG4gICAgKTtcbiAgfVxuXG4gIGluZGlyZWN0U3BlY3VsYXIoeyByZWZsZWN0ZWRMaWdodCB9OiBUSFJFRS5MaWdodGluZ01vZGVsSW5kaXJlY3RJbnB1dCkge1xuICAgIC8vIHJpbVxuICAgIChyZWZsZWN0ZWRMaWdodC5pbmRpcmVjdFNwZWN1bGFyIGFzIFRIUkVFLlNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT4pLmFzc2lnbihcbiAgICAgIChyZWZsZWN0ZWRMaWdodC5pbmRpcmVjdFNwZWN1bGFyIGFzIFRIUkVFLlNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT4pLmFkZChcbiAgICAgICAgcGFyYW1ldHJpY1JpbVxuICAgICAgICAgIC5hZGQobWF0Y2FwKVxuICAgICAgICAgIC5tdWwocmltTXVsdGlwbHkpXG4gICAgICAgICAgLm11bChUSFJFRS5taXgoVEhSRUUudmVjMygxLjApLCBUSFJFRS52ZWMzKDAuMCksIHJpbUxpZ2h0aW5nTWl4KSksXG4gICAgICApLFxuICAgICk7XG4gIH1cbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS93ZWJncHUnO1xuXG5leHBvcnQgY29uc3Qgc2hhZGVDb2xvciA9IFRIUkVFLm5vZGVJbW11dGFibGUoVEhSRUUuUHJvcGVydHlOb2RlLCAndmVjMycpLnRlbXAoJ1NoYWRlQ29sb3InKTtcbmV4cG9ydCBjb25zdCBzaGFkaW5nU2hpZnQgPSBUSFJFRS5ub2RlSW1tdXRhYmxlKFRIUkVFLlByb3BlcnR5Tm9kZSwgJ2Zsb2F0JykudGVtcCgnU2hhZGluZ1NoaWZ0Jyk7XG5leHBvcnQgY29uc3Qgc2hhZGluZ1Rvb255ID0gVEhSRUUubm9kZUltbXV0YWJsZShUSFJFRS5Qcm9wZXJ0eU5vZGUsICdmbG9hdCcpLnRlbXAoJ1NoYWRpbmdUb29ueScpO1xuZXhwb3J0IGNvbnN0IHJpbUxpZ2h0aW5nTWl4ID0gVEhSRUUubm9kZUltbXV0YWJsZShUSFJFRS5Qcm9wZXJ0eU5vZGUsICdmbG9hdCcpLnRlbXAoJ1JpbUxpZ2h0aW5nTWl4Jyk7XG5leHBvcnQgY29uc3QgcmltTXVsdGlwbHkgPSBUSFJFRS5ub2RlSW1tdXRhYmxlKFRIUkVFLlByb3BlcnR5Tm9kZSwgJ3ZlYzMnKS50ZW1wKCdSaW1NdWx0aXBseScpO1xuZXhwb3J0IGNvbnN0IG1hdGNhcCA9IFRIUkVFLm5vZGVJbW11dGFibGUoVEhSRUUuUHJvcGVydHlOb2RlLCAndmVjMycpLnRlbXAoJ21hdGNhcCcpO1xuZXhwb3J0IGNvbnN0IHBhcmFtZXRyaWNSaW0gPSBUSFJFRS5ub2RlSW1tdXRhYmxlKFRIUkVFLlByb3BlcnR5Tm9kZSwgJ3ZlYzMnKS50ZW1wKCdQYXJhbWV0cmljUmltJyk7XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUvd2ViZ3B1JztcblxuaW1wb3J0IHR5cGUgeyBNVG9vbk1hdGVyaWFsIH0gZnJvbSAnLi4vTVRvb25NYXRlcmlhbCc7XG5pbXBvcnQgeyBNVG9vbkxpZ2h0aW5nTW9kZWwgfSBmcm9tICcuL01Ub29uTGlnaHRpbmdNb2RlbCc7XG5pbXBvcnQge1xuICByaW1MaWdodGluZ01peCxcbiAgbWF0Y2FwLFxuICBzaGFkZUNvbG9yLFxuICBzaGFkaW5nU2hpZnQsXG4gIHNoYWRpbmdUb29ueSxcbiAgcmltTXVsdGlwbHksXG4gIHBhcmFtZXRyaWNSaW0sXG59IGZyb20gJy4vaW1tdXRhYmxlTm9kZXMnO1xuaW1wb3J0IHtcbiAgcmVmQ29sb3IsXG4gIHJlZkVtaXNzaXZlLFxuICByZWZFbWlzc2l2ZUludGVuc2l0eSxcbiAgcmVmRW1pc3NpdmVNYXAsXG4gIHJlZk1hcCxcbiAgcmVmTWF0Y2FwRmFjdG9yLFxuICByZWZNYXRjYXBUZXh0dXJlLFxuICByZWZOb3JtYWxNYXAsXG4gIHJlZk5vcm1hbFNjYWxlLFxuICByZWZPdXRsaW5lQ29sb3JGYWN0b3IsXG4gIHJlZk91dGxpbmVMaWdodGluZ01peEZhY3RvcixcbiAgcmVmT3V0bGluZVdpZHRoRmFjdG9yLFxuICByZWZPdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmUsXG4gIHJlZlBhcmFtZXRyaWNSaW1Db2xvckZhY3RvcixcbiAgcmVmUGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlckZhY3RvcixcbiAgcmVmUGFyYW1ldHJpY1JpbUxpZnRGYWN0b3IsXG4gIHJlZlJpbUxpZ2h0aW5nTWl4RmFjdG9yLFxuICByZWZSaW1NdWx0aXBseVRleHR1cmUsXG4gIHJlZlNoYWRlQ29sb3JGYWN0b3IsXG4gIHJlZlNoYWRlTXVsdGlwbHlUZXh0dXJlLFxuICByZWZTaGFkZU11bHRpcGx5VGV4dHVyZVNjYWxlLFxuICByZWZTaGFkaW5nU2hpZnRGYWN0b3IsXG4gIHJlZlNoYWRpbmdUb29ueUZhY3Rvcixcbn0gZnJvbSAnLi9tYXRlcmlhbFJlZmVyZW5jZXMnO1xuaW1wb3J0IHsgTVRvb25BbmltYXRlZFVWTm9kZSB9IGZyb20gJy4vTVRvb25BbmltYXRlZFVWTm9kZSc7XG5pbXBvcnQgeyBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZSB9IGZyb20gJy4uL01Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlJztcbmltcG9ydCB7IE1Ub29uTm9kZU1hdGVyaWFsUGFyYW1ldGVycyB9IGZyb20gJy4vTVRvb25Ob2RlTWF0ZXJpYWxQYXJhbWV0ZXJzJztcbmltcG9ydCB7IG10b29uUGFyYW1ldHJpY1JpbSB9IGZyb20gJy4vbXRvb25QYXJhbWV0cmljUmltJztcblxuLyoqXG4gKiBNVG9vbiBpcyBhIG1hdGVyaWFsIHNwZWNpZmljYXRpb24gdGhhdCBoYXMgdmFyaW91cyBmZWF0dXJlcy5cbiAqIFRoZSBzcGVjIGFuZCBpbXBsZW1lbnRhdGlvbiBhcmUgb3JpZ2luYWxseSBmb3VuZGVkIGZvciBVbml0eSBlbmdpbmUgYW5kIHRoaXMgaXMgYSBwb3J0IG9mIHRoZSBtYXRlcmlhbC5cbiAqXG4gKiBUaGlzIG1hdGVyaWFsIGlzIGEgTm9kZU1hdGVyaWFsIHZhcmlhbnQgb2Yge0BsaW5rIE1Ub29uTWF0ZXJpYWx9LlxuICpcbiAqIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL1NhbnRhcmgvTVRvb25cbiAqL1xuZXhwb3J0IGNsYXNzIE1Ub29uTm9kZU1hdGVyaWFsIGV4dGVuZHMgVEhSRUUuTm9kZU1hdGVyaWFsIHtcbiAgcHVibGljIGVtaXNzaXZlTm9kZTogVEhSRUUuU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPiB8IG51bGw7XG5cbiAgcHVibGljIGNvbG9yOiBUSFJFRS5Db2xvcjtcbiAgcHVibGljIG1hcDogVEhSRUUuVGV4dHVyZSB8IG51bGw7XG4gIHB1YmxpYyBlbWlzc2l2ZTogVEhSRUUuQ29sb3I7XG4gIHB1YmxpYyBlbWlzc2l2ZUludGVuc2l0eTogbnVtYmVyO1xuICBwdWJsaWMgZW1pc3NpdmVNYXA6IFRIUkVFLlRleHR1cmUgfCBudWxsO1xuICBwdWJsaWMgbm9ybWFsTWFwOiBUSFJFRS5UZXh0dXJlIHwgbnVsbDtcbiAgcHVibGljIG5vcm1hbFNjYWxlOiBUSFJFRS5WZWN0b3IyO1xuXG4gIHB1YmxpYyBzaGFkZUNvbG9yRmFjdG9yOiBUSFJFRS5Db2xvcjtcbiAgcHVibGljIHNoYWRlTXVsdGlwbHlUZXh0dXJlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbDtcbiAgcHVibGljIHNoYWRpbmdTaGlmdEZhY3RvcjogbnVtYmVyO1xuICBwdWJsaWMgc2hhZGluZ1NoaWZ0VGV4dHVyZTogVEhSRUUuVGV4dHVyZSB8IG51bGw7XG4gIHB1YmxpYyBzaGFkaW5nU2hpZnRUZXh0dXJlU2NhbGU6IG51bWJlcjtcbiAgcHVibGljIHNoYWRpbmdUb29ueUZhY3RvcjogbnVtYmVyO1xuICBwdWJsaWMgcmltTGlnaHRpbmdNaXhGYWN0b3I6IG51bWJlcjtcbiAgcHVibGljIHJpbU11bHRpcGx5VGV4dHVyZTogVEhSRUUuVGV4dHVyZSB8IG51bGw7XG4gIHB1YmxpYyBtYXRjYXBGYWN0b3I6IFRIUkVFLkNvbG9yO1xuICBwdWJsaWMgbWF0Y2FwVGV4dHVyZTogVEhSRUUuVGV4dHVyZSB8IG51bGw7XG4gIHB1YmxpYyBwYXJhbWV0cmljUmltQ29sb3JGYWN0b3I6IFRIUkVFLkNvbG9yO1xuICBwdWJsaWMgcGFyYW1ldHJpY1JpbUxpZnRGYWN0b3I6IG51bWJlcjtcbiAgcHVibGljIHBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJGYWN0b3I6IG51bWJlcjtcbiAgcHVibGljIG91dGxpbmVXaWR0aE1vZGU6IE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlO1xuICBwdWJsaWMgb3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbDtcbiAgcHVibGljIG91dGxpbmVXaWR0aEZhY3RvcjogbnVtYmVyO1xuICBwdWJsaWMgb3V0bGluZUNvbG9yRmFjdG9yOiBUSFJFRS5Db2xvcjtcbiAgcHVibGljIG91dGxpbmVMaWdodGluZ01peEZhY3RvcjogbnVtYmVyO1xuICBwdWJsaWMgdXZBbmltYXRpb25TY3JvbGxYU3BlZWRGYWN0b3I6IG51bWJlcjtcbiAgcHVibGljIHV2QW5pbWF0aW9uU2Nyb2xsWVNwZWVkRmFjdG9yOiBudW1iZXI7XG4gIHB1YmxpYyB1dkFuaW1hdGlvblJvdGF0aW9uU3BlZWRGYWN0b3I6IG51bWJlcjtcbiAgcHVibGljIHV2QW5pbWF0aW9uTWFza1RleHR1cmU6IFRIUkVFLlRleHR1cmUgfCBudWxsO1xuXG4gIHB1YmxpYyBzaGFkZUNvbG9yTm9kZTogVEhSRUUuU3dpenphYmxlIHwgbnVsbDtcbiAgcHVibGljIHNoYWRpbmdTaGlmdE5vZGU6IFRIUkVFLk5vZGUgfCBudWxsO1xuICBwdWJsaWMgc2hhZGluZ1Rvb255Tm9kZTogVEhSRUUuTm9kZSB8IG51bGw7XG4gIHB1YmxpYyByaW1MaWdodGluZ01peE5vZGU6IFRIUkVFLk5vZGUgfCBudWxsO1xuICBwdWJsaWMgcmltTXVsdGlwbHlOb2RlOiBUSFJFRS5Ob2RlIHwgbnVsbDtcbiAgcHVibGljIG1hdGNhcE5vZGU6IFRIUkVFLk5vZGUgfCBudWxsO1xuICBwdWJsaWMgcGFyYW1ldHJpY1JpbUNvbG9yTm9kZTogVEhSRUUuU3dpenphYmxlIHwgbnVsbDtcbiAgcHVibGljIHBhcmFtZXRyaWNSaW1MaWZ0Tm9kZTogVEhSRUUuTm9kZSB8IG51bGw7XG4gIHB1YmxpYyBwYXJhbWV0cmljUmltRnJlc25lbFBvd2VyTm9kZTogVEhSRUUuTm9kZSB8IG51bGw7XG5cbiAgcHVibGljIHV2QW5pbWF0aW9uU2Nyb2xsWE9mZnNldDogbnVtYmVyO1xuICBwdWJsaWMgdXZBbmltYXRpb25TY3JvbGxZT2Zmc2V0OiBudW1iZXI7XG4gIHB1YmxpYyB1dkFuaW1hdGlvblJvdGF0aW9uUGhhc2U6IG51bWJlcjtcblxuICBwdWJsaWMgaXNPdXRsaW5lOiBib29sZWFuO1xuXG4gIHByaXZhdGUgX2FuaW1hdGVkVVZOb2RlOiBNVG9vbkFuaW1hdGVkVVZOb2RlIHwgbnVsbDtcblxuICBwdWJsaWMgY3VzdG9tUHJvZ3JhbUNhY2hlS2V5KCk6IHN0cmluZyB7XG4gICAgbGV0IGNhY2hlS2V5ID0gc3VwZXIuY3VzdG9tUHJvZ3JhbUNhY2hlS2V5KCk7XG5cbiAgICBjYWNoZUtleSArPSBgaXNPdXRsaW5lOiR7dGhpcy5pc091dGxpbmV9LGA7XG5cbiAgICByZXR1cm4gY2FjaGVLZXk7XG4gIH1cblxuICAvKipcbiAgICogUmVhZG9ubHkgYm9vbGVhbiB0aGF0IGluZGljYXRlcyB0aGlzIGlzIGEge0BsaW5rIE1Ub29uTm9kZU1hdGVyaWFsfS5cbiAgICovXG4gIHB1YmxpYyBnZXQgaXNNVG9vbk5vZGVNYXRlcmlhbCgpOiB0cnVlIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJhbWV0ZXJzOiBNVG9vbk5vZGVNYXRlcmlhbFBhcmFtZXRlcnMgPSB7fSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICBpZiAocGFyYW1ldGVycy50cmFuc3BhcmVudFdpdGhaV3JpdGUpIHtcbiAgICAgIHBhcmFtZXRlcnMuZGVwdGhXcml0ZSA9IHRydWU7XG4gICAgfVxuICAgIGRlbGV0ZSBwYXJhbWV0ZXJzLnRyYW5zcGFyZW50V2l0aFpXcml0ZTtcblxuICAgIC8vIGBNVG9vbk1hdGVyaWFsTG9hZGVyUGx1Z2luYCBhc3NpZ25zIHRoZXNlIHBhcmFtZXRlcnMgdG8gdGhlIG1hdGVyaWFsXG4gICAgLy8gSG93ZXZlciwgYE1Ub29uTm9kZU1hdGVyaWFsYCBkb2VzIG5vdCBzdXBwb3J0IHRoZXNlIHBhcmFtZXRlcnNcbiAgICAvLyBzbyB3ZSBkZWxldGUgdGhlbSBoZXJlIHRvIHN1cHByZXNzIHdhcm5pbmdzXG4gICAgZGVsZXRlIChwYXJhbWV0ZXJzIGFzIGFueSkuZ2lFcXVhbGl6YXRpb25GYWN0b3I7XG4gICAgZGVsZXRlIChwYXJhbWV0ZXJzIGFzIGFueSkudjBDb21wYXRTaGFkZTtcbiAgICBkZWxldGUgKHBhcmFtZXRlcnMgYXMgYW55KS5kZWJ1Z01vZGU7XG5cbiAgICB0aGlzLmVtaXNzaXZlTm9kZSA9IG51bGw7XG5cbiAgICB0aGlzLmxpZ2h0cyA9IHRydWU7XG5cbiAgICB0aGlzLmNvbG9yID0gbmV3IFRIUkVFLkNvbG9yKDEuMCwgMS4wLCAxLjApO1xuICAgIHRoaXMubWFwID0gbnVsbDtcbiAgICB0aGlzLmVtaXNzaXZlID0gbmV3IFRIUkVFLkNvbG9yKDAuMCwgMC4wLCAwLjApO1xuICAgIHRoaXMuZW1pc3NpdmVJbnRlbnNpdHkgPSAxLjA7XG4gICAgdGhpcy5lbWlzc2l2ZU1hcCA9IG51bGw7XG4gICAgdGhpcy5ub3JtYWxNYXAgPSBudWxsO1xuICAgIHRoaXMubm9ybWFsU2NhbGUgPSBuZXcgVEhSRUUuVmVjdG9yMigxLjAsIDEuMCk7XG4gICAgdGhpcy5zaGFkZUNvbG9yRmFjdG9yID0gbmV3IFRIUkVFLkNvbG9yKDAuMCwgMC4wLCAwLjApO1xuICAgIHRoaXMuc2hhZGVNdWx0aXBseVRleHR1cmUgPSBudWxsO1xuICAgIHRoaXMuc2hhZGluZ1NoaWZ0RmFjdG9yID0gMC4wO1xuICAgIHRoaXMuc2hhZGluZ1NoaWZ0VGV4dHVyZSA9IG51bGw7XG4gICAgdGhpcy5zaGFkaW5nU2hpZnRUZXh0dXJlU2NhbGUgPSAxLjA7XG4gICAgdGhpcy5zaGFkaW5nVG9vbnlGYWN0b3IgPSAwLjk7XG4gICAgdGhpcy5yaW1MaWdodGluZ01peEZhY3RvciA9IDEuMDtcbiAgICB0aGlzLnJpbU11bHRpcGx5VGV4dHVyZSA9IG51bGw7XG4gICAgdGhpcy5tYXRjYXBGYWN0b3IgPSBuZXcgVEhSRUUuQ29sb3IoMS4wLCAxLjAsIDEuMCk7XG4gICAgdGhpcy5tYXRjYXBUZXh0dXJlID0gbnVsbDtcbiAgICB0aGlzLnBhcmFtZXRyaWNSaW1Db2xvckZhY3RvciA9IG5ldyBUSFJFRS5Db2xvcigwLjAsIDAuMCwgMC4wKTtcbiAgICB0aGlzLnBhcmFtZXRyaWNSaW1MaWZ0RmFjdG9yID0gMC4wO1xuICAgIHRoaXMucGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlckZhY3RvciA9IDUuMDtcbiAgICB0aGlzLm91dGxpbmVXaWR0aE1vZGUgPSBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZS5Ob25lO1xuICAgIHRoaXMub3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlID0gbnVsbDtcbiAgICB0aGlzLm91dGxpbmVXaWR0aEZhY3RvciA9IDAuMDtcbiAgICB0aGlzLm91dGxpbmVDb2xvckZhY3RvciA9IG5ldyBUSFJFRS5Db2xvcigwLjAsIDAuMCwgMC4wKTtcbiAgICB0aGlzLm91dGxpbmVMaWdodGluZ01peEZhY3RvciA9IDEuMDtcbiAgICB0aGlzLnV2QW5pbWF0aW9uU2Nyb2xsWFNwZWVkRmFjdG9yID0gMC4wO1xuICAgIHRoaXMudXZBbmltYXRpb25TY3JvbGxZU3BlZWRGYWN0b3IgPSAwLjA7XG4gICAgdGhpcy51dkFuaW1hdGlvblJvdGF0aW9uU3BlZWRGYWN0b3IgPSAwLjA7XG4gICAgdGhpcy51dkFuaW1hdGlvbk1hc2tUZXh0dXJlID0gbnVsbDtcblxuICAgIHRoaXMuc2hhZGVDb2xvck5vZGUgPSBudWxsO1xuICAgIHRoaXMuc2hhZGluZ1NoaWZ0Tm9kZSA9IG51bGw7XG4gICAgdGhpcy5zaGFkaW5nVG9vbnlOb2RlID0gbnVsbDtcbiAgICB0aGlzLnJpbUxpZ2h0aW5nTWl4Tm9kZSA9IG51bGw7XG4gICAgdGhpcy5yaW1NdWx0aXBseU5vZGUgPSBudWxsO1xuICAgIHRoaXMubWF0Y2FwTm9kZSA9IG51bGw7XG4gICAgdGhpcy5wYXJhbWV0cmljUmltQ29sb3JOb2RlID0gbnVsbDtcbiAgICB0aGlzLnBhcmFtZXRyaWNSaW1MaWZ0Tm9kZSA9IG51bGw7XG4gICAgdGhpcy5wYXJhbWV0cmljUmltRnJlc25lbFBvd2VyTm9kZSA9IG51bGw7XG5cbiAgICB0aGlzLnV2QW5pbWF0aW9uU2Nyb2xsWE9mZnNldCA9IDAuMDtcbiAgICB0aGlzLnV2QW5pbWF0aW9uU2Nyb2xsWU9mZnNldCA9IDAuMDtcbiAgICB0aGlzLnV2QW5pbWF0aW9uUm90YXRpb25QaGFzZSA9IDAuMDtcblxuICAgIHRoaXMuaXNPdXRsaW5lID0gZmFsc2U7XG5cbiAgICB0aGlzLl9hbmltYXRlZFVWTm9kZSA9IG51bGw7XG5cbiAgICB0aGlzLnNldFZhbHVlcyhwYXJhbWV0ZXJzKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXR1cExpZ2h0aW5nTW9kZWwoLypidWlsZGVyKi8pOiBNVG9vbkxpZ2h0aW5nTW9kZWwge1xuICAgIHJldHVybiBuZXcgTVRvb25MaWdodGluZ01vZGVsKCk7XG4gIH1cblxuICBwdWJsaWMgc2V0dXAoYnVpbGRlcjogVEhSRUUuTm9kZUJ1aWxkZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9hbmltYXRlZFVWTm9kZSA9IG5ldyBNVG9vbkFuaW1hdGVkVVZOb2RlKFxuICAgICAgKHRoaXMudXZBbmltYXRpb25NYXNrVGV4dHVyZSAmJiB0aGlzLnV2QW5pbWF0aW9uTWFza1RleHR1cmUuaXNUZXh0dXJlID09PSB0cnVlKSA/PyBmYWxzZSxcbiAgICApO1xuXG4gICAgc3VwZXIuc2V0dXAoYnVpbGRlcik7XG4gIH1cblxuICBwdWJsaWMgc2V0dXBEaWZmdXNlQ29sb3IoYnVpbGRlcjogVEhSRUUuTm9kZUJ1aWxkZXIpOiB2b2lkIHtcbiAgICAvLyB3ZSBtdXN0IGFwcGx5IHV2IHNjcm9sbCB0byB0aGUgbWFwXG4gICAgLy8gdGhpcy5jb2xvck5vZGUgd2lsbCBiZSB1c2VkIGluIHN1cGVyLnNldHVwRGlmZnVzZUNvbG9yKCkgc28gd2UgdGVtcG9yYXJpbHkgcmVwbGFjZSBpdFxuICAgIGxldCB0ZW1wQ29sb3JOb2RlOiBUSFJFRS5TaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+IHwgbnVsbCA9IG51bGw7XG5cbiAgICBpZiAodGhpcy5jb2xvck5vZGUgPT0gbnVsbCkge1xuICAgICAgdGVtcENvbG9yTm9kZSA9IHJlZkNvbG9yO1xuXG4gICAgICBpZiAodGhpcy5tYXAgJiYgdGhpcy5tYXAuaXNUZXh0dXJlID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IG1hcCA9IHJlZk1hcC5jb250ZXh0KHsgZ2V0VVY6ICgpID0+IHRoaXMuX2FuaW1hdGVkVVZOb2RlIH0pO1xuICAgICAgICB0ZW1wQ29sb3JOb2RlID0gdGVtcENvbG9yTm9kZS5tdWwobWFwKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jb2xvck5vZGUgPSB0ZW1wQ29sb3JOb2RlO1xuICAgIH1cblxuICAgIC8vIE1Ub29uIG11c3QgaWdub3JlIHZlcnRleCBjb2xvciBieSBzcGVjXG4gICAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vdnJtLWMvdnJtLXNwZWNpZmljYXRpb24vYmxvYi80MmMwYTkwZTZiNGI3MTAzNTI1Njk5NzhmMTQ5ODBlOWZjOTRiMjVkL3NwZWNpZmljYXRpb24vVlJNQ19tYXRlcmlhbHNfbXRvb24tMS4wL1JFQURNRS5tZCN2ZXJ0ZXgtY29sb3JzXG4gICAgaWYgKHRoaXMudmVydGV4Q29sb3JzID09PSB0cnVlICYmIGJ1aWxkZXIuZ2VvbWV0cnkuaGFzQXR0cmlidXRlKCdjb2xvcicpKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICdNVG9vbk5vZGVNYXRlcmlhbDogTVRvb24gaWdub3JlcyB2ZXJ0ZXggY29sb3JzLiBDb25zaWRlciB1c2luZyBhIG1vZGVsIHdpdGhvdXQgdmVydGV4IGNvbG9ycyBpbnN0ZWFkLicsXG4gICAgICApO1xuICAgICAgdGhpcy52ZXJ0ZXhDb2xvcnMgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyB0aGUgb3JkaW5hcnkgZGlmZnVzZUNvbG9yIHNldHVwXG4gICAgc3VwZXIuc2V0dXBEaWZmdXNlQ29sb3IoYnVpbGRlcik7XG5cbiAgICAvLyBDT01QQVQ6IHByZS1yMTY2XG4gICAgLy8gU2V0IGFscGhhIHRvIDEgaWYgaXQgaXMgb3BhcXVlXG4gICAgLy8gQWRkcmVzc2VkIGluIFRocmVlLmpzIHIxNjYgYnV0IHdlIGxlYXZlIGl0IGhlcmUgZm9yIGNvbXBhdGliaWxpdHlcbiAgICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvcHVsbC8yODY0NlxuICAgIGlmIChwYXJzZUludChUSFJFRS5SRVZJU0lPTiwgMTApIDwgMTY2KSB7XG4gICAgICBpZiAodGhpcy50cmFuc3BhcmVudCA9PT0gZmFsc2UgJiYgdGhpcy5ibGVuZGluZyA9PT0gVEhSRUUuTm9ybWFsQmxlbmRpbmcgJiYgdGhpcy5hbHBoYVRvQ292ZXJhZ2UgPT09IGZhbHNlKSB7XG4gICAgICAgIFRIUkVFLmRpZmZ1c2VDb2xvci5hLmFzc2lnbigxLjApO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHJldmVydCB0aGUgY29sb3JOb2RlXG4gICAgaWYgKHRoaXMuY29sb3JOb2RlID09PSB0ZW1wQ29sb3JOb2RlKSB7XG4gICAgICB0aGlzLmNvbG9yTm9kZSA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldHVwVmFyaWFudHMoKTogdm9pZCB7XG4gICAgc2hhZGVDb2xvci5hc3NpZ24odGhpcy5fc2V0dXBTaGFkZUNvbG9yTm9kZSgpKTtcbiAgICBzaGFkaW5nU2hpZnQuYXNzaWduKHRoaXMuX3NldHVwU2hhZGluZ1NoaWZ0Tm9kZSgpKTtcbiAgICBzaGFkaW5nVG9vbnkuYXNzaWduKHRoaXMuX3NldHVwU2hhZGluZ1Rvb255Tm9kZSgpKTtcbiAgICByaW1MaWdodGluZ01peC5hc3NpZ24odGhpcy5fc2V0dXBSaW1MaWdodGluZ01peE5vZGUoKSk7XG4gICAgcmltTXVsdGlwbHkuYXNzaWduKHRoaXMuX3NldHVwUmltTXVsdGlwbHlOb2RlKCkpO1xuICAgIG1hdGNhcC5hc3NpZ24odGhpcy5fc2V0dXBNYXRjYXBOb2RlKCkpO1xuICAgIHBhcmFtZXRyaWNSaW0uYXNzaWduKHRoaXMuX3NldHVwUGFyYW1ldHJpY1JpbU5vZGUoKSk7XG4gIH1cblxuICBwdWJsaWMgc2V0dXBOb3JtYWwoYnVpbGRlcjogVEhSRUUuTm9kZUJ1aWxkZXIpOiB2b2lkIHtcbiAgICAvLyB3ZSBtdXN0IGFwcGx5IHV2IHNjcm9sbCB0byB0aGUgbm9ybWFsTWFwXG4gICAgLy8gdGhpcy5ub3JtYWxOb2RlIHdpbGwgYmUgdXNlZCBpbiBzdXBlci5zZXR1cE5vcm1hbCgpIHNvIHdlIHRlbXBvcmFyaWx5IHJlcGxhY2UgaXRcbiAgICBjb25zdCB0ZW1wTm9ybWFsTm9kZSA9IHRoaXMubm9ybWFsTm9kZTtcblxuICAgIGlmICh0aGlzLm5vcm1hbE5vZGUgPT0gbnVsbCkge1xuICAgICAgdGhpcy5ub3JtYWxOb2RlID0gVEhSRUUubWF0ZXJpYWxOb3JtYWw7XG5cbiAgICAgIGlmICh0aGlzLm5vcm1hbE1hcCAmJiB0aGlzLm5vcm1hbE1hcC5pc1RleHR1cmUgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3QgbWFwID0gcmVmTm9ybWFsTWFwLmNvbnRleHQoeyBnZXRVVjogKCkgPT4gdGhpcy5fYW5pbWF0ZWRVVk5vZGUgfSk7XG4gICAgICAgIHRoaXMubm9ybWFsTm9kZSA9IG1hcC5ub3JtYWxNYXAocmVmTm9ybWFsU2NhbGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5pc091dGxpbmUpIHtcbiAgICAgICAgLy8gU2VlIGFib3V0IHRoZSB0eXBlIGFzc2VydGlvbjogaHR0cHM6Ly9naXRodWIuY29tL3RocmVlLXR5cGVzL3RocmVlLXRzLXR5cGVzL3B1bGwvMTEyM1xuICAgICAgICB0aGlzLm5vcm1hbE5vZGUgPSAodGhpcy5ub3JtYWxOb2RlIGFzIFRIUkVFLlNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT4pLm5lZ2F0ZSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHRoZSBvcmRpbmFyeSBub3JtYWwgc2V0dXBcbiAgICBzdXBlci5zZXR1cE5vcm1hbChidWlsZGVyKTtcblxuICAgIC8vIHJldmVydCB0aGUgbm9ybWFsTm9kZVxuICAgIHRoaXMubm9ybWFsTm9kZSA9IHRlbXBOb3JtYWxOb2RlO1xuICB9XG5cbiAgcHVibGljIHNldHVwTGlnaHRpbmcoYnVpbGRlcjogVEhSRUUuTm9kZUJ1aWxkZXIpOiBUSFJFRS5Ob2RlIHtcbiAgICAvLyB3ZSBtdXN0IGFwcGx5IHV2IHNjcm9sbCB0byB0aGUgZW1pc3NpdmVNYXBcbiAgICAvLyB0aGlzLmVtaXNzaXZlTm9kZSB3aWxsIGJlIHVzZWQgaW4gc3VwZXIuc2V0dXBMaWdodGluZygpIHNvIHdlIHRlbXBvcmFyaWx5IHJlcGxhY2UgaXRcbiAgICBsZXQgdGVtcEVtaXNzaXZlTm9kZTogVEhSRUUuU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPiB8IG51bGwgPSBudWxsO1xuXG4gICAgaWYgKHRoaXMuZW1pc3NpdmVOb2RlID09IG51bGwpIHtcbiAgICAgIHRlbXBFbWlzc2l2ZU5vZGUgPSByZWZFbWlzc2l2ZS5tdWwocmVmRW1pc3NpdmVJbnRlbnNpdHkpO1xuXG4gICAgICBpZiAodGhpcy5lbWlzc2l2ZU1hcCAmJiB0aGlzLmVtaXNzaXZlTWFwLmlzVGV4dHVyZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBtYXAgPSByZWZFbWlzc2l2ZU1hcC5jb250ZXh0KHsgZ2V0VVY6ICgpID0+IHRoaXMuX2FuaW1hdGVkVVZOb2RlIH0pO1xuICAgICAgICB0ZW1wRW1pc3NpdmVOb2RlID0gdGVtcEVtaXNzaXZlTm9kZS5tdWwobWFwKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5lbWlzc2l2ZU5vZGUgPSB0ZW1wRW1pc3NpdmVOb2RlO1xuICAgIH1cblxuICAgIC8vIHRoZSBvcmRpbmFyeSBsaWdodGluZyBzZXR1cFxuICAgIGNvbnN0IHJldCA9IHN1cGVyLnNldHVwTGlnaHRpbmcoYnVpbGRlcik7XG5cbiAgICAvLyByZXZlcnQgdGhlIGVtaXNzaXZlTm9kZVxuICAgIGlmICh0aGlzLmVtaXNzaXZlTm9kZSA9PT0gdGVtcEVtaXNzaXZlTm9kZSkge1xuICAgICAgdGhpcy5lbWlzc2l2ZU5vZGUgPSBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICBwdWJsaWMgc2V0dXBPdXRwdXQoXG4gICAgYnVpbGRlcjogVEhSRUUuTm9kZUJ1aWxkZXIsXG4gICAgb3V0cHV0Tm9kZTogVEhSRUUuU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPixcbiAgKTogVEhSRUUuU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPiB7XG4gICAgLy8gbWl4IG9yIHNldCBvdXRsaW5lIGNvbG9yXG4gICAgaWYgKHRoaXMuaXNPdXRsaW5lICYmIHRoaXMub3V0bGluZVdpZHRoTW9kZSAhPT0gTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUuTm9uZSkge1xuICAgICAgb3V0cHV0Tm9kZSA9IFRIUkVFLnZlYzQoXG4gICAgICAgIFRIUkVFLm1peChyZWZPdXRsaW5lQ29sb3JGYWN0b3IsIG91dHB1dE5vZGUueHl6Lm11bChyZWZPdXRsaW5lQ29sb3JGYWN0b3IpLCByZWZPdXRsaW5lTGlnaHRpbmdNaXhGYWN0b3IpLFxuICAgICAgICBvdXRwdXROb2RlLncsXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIHRoZSBvcmRpbmFyeSBvdXRwdXQgc2V0dXBcbiAgICByZXR1cm4gc3VwZXIuc2V0dXBPdXRwdXQoYnVpbGRlciwgb3V0cHV0Tm9kZSkgYXMgVEhSRUUuU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPjtcbiAgfVxuXG4gIHB1YmxpYyBzZXR1cFBvc2l0aW9uKGJ1aWxkZXI6IFRIUkVFLk5vZGVCdWlsZGVyKTogVEhSRUUuU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPiB7XG4gICAgLy8gd2UgbXVzdCBhcHBseSBvdXRsaW5lIHBvc2l0aW9uIG9mZnNldFxuICAgIC8vIHRoaXMucG9zaXRpb25Ob2RlIHdpbGwgYmUgdXNlZCBpbiBzdXBlci5zZXR1cFBvc2l0aW9uKCkgc28gd2UgdGVtcG9yYXJpbHkgcmVwbGFjZSBpdFxuICAgIGNvbnN0IHRlbXBQb3NpdGlvbk5vZGUgPSB0aGlzLnBvc2l0aW9uTm9kZTtcblxuICAgIGlmICh0aGlzLmlzT3V0bGluZSAmJiB0aGlzLm91dGxpbmVXaWR0aE1vZGUgIT09IE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlLk5vbmUpIHtcbiAgICAgIHRoaXMucG9zaXRpb25Ob2RlID8/PSBUSFJFRS5wb3NpdGlvbkxvY2FsO1xuXG4gICAgICBjb25zdCBub3JtYWxMb2NhbCA9IFRIUkVFLm5vcm1hbExvY2FsLm5vcm1hbGl6ZSgpO1xuXG4gICAgICBsZXQgd2lkdGg6IFRIUkVFLlNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT4gPSByZWZPdXRsaW5lV2lkdGhGYWN0b3I7XG5cbiAgICAgIGlmICh0aGlzLm91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZSAmJiB0aGlzLm91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZS5pc1RleHR1cmUgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3QgbWFwID0gcmVmT3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlLmNvbnRleHQoeyBnZXRVVjogKCkgPT4gdGhpcy5fYW5pbWF0ZWRVVk5vZGUgfSk7XG4gICAgICAgIHdpZHRoID0gd2lkdGgubXVsKG1hcCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHdvcmxkTm9ybWFsTGVuZ3RoID0gVEhSRUUubGVuZ3RoKFRIUkVFLm1vZGVsTm9ybWFsTWF0cml4Lm11bChub3JtYWxMb2NhbCkpO1xuICAgICAgY29uc3Qgb3V0bGluZU9mZnNldCA9IHdpZHRoLm11bCh3b3JsZE5vcm1hbExlbmd0aCkubXVsKG5vcm1hbExvY2FsKTtcblxuICAgICAgaWYgKHRoaXMub3V0bGluZVdpZHRoTW9kZSA9PT0gTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUuV29ybGRDb29yZGluYXRlcykge1xuICAgICAgICAvLyBTZWUgYWJvdXQgdGhlIHR5cGUgYXNzZXJ0aW9uOiBodHRwczovL2dpdGh1Yi5jb20vdGhyZWUtdHlwZXMvdGhyZWUtdHMtdHlwZXMvcHVsbC8xMTIzXG4gICAgICAgIHRoaXMucG9zaXRpb25Ob2RlID0gKHRoaXMucG9zaXRpb25Ob2RlIGFzIFRIUkVFLlNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT4pLmFkZChvdXRsaW5lT2Zmc2V0KTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5vdXRsaW5lV2lkdGhNb2RlID09PSBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZS5TY3JlZW5Db29yZGluYXRlcykge1xuICAgICAgICBjb25zdCBjbGlwU2NhbGUgPSBUSFJFRS5jYW1lcmFQcm9qZWN0aW9uTWF0cml4LmVsZW1lbnQoMSkuZWxlbWVudCgxKTtcblxuICAgICAgICAvLyBTZWUgYWJvdXQgdGhlIHR5cGUgYXNzZXJ0aW9uOiBodHRwczovL2dpdGh1Yi5jb20vdGhyZWUtdHlwZXMvdGhyZWUtdHMtdHlwZXMvcHVsbC8xMTIzXG4gICAgICAgIHRoaXMucG9zaXRpb25Ob2RlID0gKHRoaXMucG9zaXRpb25Ob2RlIGFzIFRIUkVFLlNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT4pLmFkZChcbiAgICAgICAgICBvdXRsaW5lT2Zmc2V0LmRpdihjbGlwU2NhbGUpLm11bChUSFJFRS5wb3NpdGlvblZpZXcuei5uZWdhdGUoKSksXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucG9zaXRpb25Ob2RlID8/PSBUSFJFRS5wb3NpdGlvbkxvY2FsO1xuICAgIH1cblxuICAgIC8vIHRoZSBvcmRpbmFyeSBwb3NpdGlvbiBzZXR1cFxuICAgIGNvbnN0IHJldCA9IHN1cGVyLnNldHVwUG9zaXRpb24oYnVpbGRlcikgYXMgVEhSRUUuU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPjtcblxuICAgIC8vIGFudGkgei1maWdodGluZ1xuICAgIC8vIFRPRE86IFdlIG1pZ2h0IHdhbnQgdG8gYWRkcmVzcyB0aGlzIHZpYSBnbFBvbHlnb25PZmZzZXQgaW5zdGVhZD9cbiAgICByZXQuei5hZGQocmV0LncubXVsKDFlLTYpKTtcblxuICAgIC8vIHJldmVydCB0aGUgcG9zaXRpb25Ob2RlXG4gICAgdGhpcy5wb3NpdGlvbk5vZGUgPSB0ZW1wUG9zaXRpb25Ob2RlO1xuXG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIHB1YmxpYyBjb3B5KHNvdXJjZTogTVRvb25Ob2RlTWF0ZXJpYWwpOiB0aGlzIHtcbiAgICB0aGlzLmNvbG9yLmNvcHkoc291cmNlLmNvbG9yKTtcbiAgICB0aGlzLm1hcCA9IHNvdXJjZS5tYXAgPz8gbnVsbDtcbiAgICB0aGlzLmVtaXNzaXZlLmNvcHkoc291cmNlLmVtaXNzaXZlKTtcbiAgICB0aGlzLmVtaXNzaXZlSW50ZW5zaXR5ID0gc291cmNlLmVtaXNzaXZlSW50ZW5zaXR5O1xuICAgIHRoaXMuZW1pc3NpdmVNYXAgPSBzb3VyY2UuZW1pc3NpdmVNYXAgPz8gbnVsbDtcbiAgICB0aGlzLm5vcm1hbE1hcCA9IHNvdXJjZS5ub3JtYWxNYXAgPz8gbnVsbDtcbiAgICB0aGlzLm5vcm1hbFNjYWxlLmNvcHkoc291cmNlLm5vcm1hbFNjYWxlKTtcblxuICAgIHRoaXMuc2hhZGVDb2xvckZhY3Rvci5jb3B5KHNvdXJjZS5zaGFkZUNvbG9yRmFjdG9yKTtcbiAgICB0aGlzLnNoYWRlTXVsdGlwbHlUZXh0dXJlID0gc291cmNlLnNoYWRlTXVsdGlwbHlUZXh0dXJlID8/IG51bGw7XG4gICAgdGhpcy5zaGFkaW5nU2hpZnRGYWN0b3IgPSBzb3VyY2Uuc2hhZGluZ1NoaWZ0RmFjdG9yO1xuICAgIHRoaXMuc2hhZGluZ1NoaWZ0VGV4dHVyZSA9IHNvdXJjZS5zaGFkaW5nU2hpZnRUZXh0dXJlID8/IG51bGw7XG4gICAgdGhpcy5zaGFkaW5nU2hpZnRUZXh0dXJlU2NhbGUgPSBzb3VyY2Uuc2hhZGluZ1NoaWZ0VGV4dHVyZVNjYWxlO1xuICAgIHRoaXMuc2hhZGluZ1Rvb255RmFjdG9yID0gc291cmNlLnNoYWRpbmdUb29ueUZhY3RvcjtcbiAgICB0aGlzLnJpbUxpZ2h0aW5nTWl4RmFjdG9yID0gc291cmNlLnJpbUxpZ2h0aW5nTWl4RmFjdG9yO1xuICAgIHRoaXMucmltTXVsdGlwbHlUZXh0dXJlID0gc291cmNlLnJpbU11bHRpcGx5VGV4dHVyZSA/PyBudWxsO1xuICAgIHRoaXMubWF0Y2FwRmFjdG9yLmNvcHkoc291cmNlLm1hdGNhcEZhY3Rvcik7XG4gICAgdGhpcy5tYXRjYXBUZXh0dXJlID0gc291cmNlLm1hdGNhcFRleHR1cmUgPz8gbnVsbDtcbiAgICB0aGlzLnBhcmFtZXRyaWNSaW1Db2xvckZhY3Rvci5jb3B5KHNvdXJjZS5wYXJhbWV0cmljUmltQ29sb3JGYWN0b3IpO1xuICAgIHRoaXMucGFyYW1ldHJpY1JpbUxpZnRGYWN0b3IgPSBzb3VyY2UucGFyYW1ldHJpY1JpbUxpZnRGYWN0b3I7XG4gICAgdGhpcy5wYXJhbWV0cmljUmltRnJlc25lbFBvd2VyRmFjdG9yID0gc291cmNlLnBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJGYWN0b3I7XG4gICAgdGhpcy5vdXRsaW5lV2lkdGhNb2RlID0gc291cmNlLm91dGxpbmVXaWR0aE1vZGU7XG4gICAgdGhpcy5vdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmUgPSBzb3VyY2Uub3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlID8/IG51bGw7XG4gICAgdGhpcy5vdXRsaW5lV2lkdGhGYWN0b3IgPSBzb3VyY2Uub3V0bGluZVdpZHRoRmFjdG9yO1xuICAgIHRoaXMub3V0bGluZUNvbG9yRmFjdG9yLmNvcHkoc291cmNlLm91dGxpbmVDb2xvckZhY3Rvcik7XG4gICAgdGhpcy5vdXRsaW5lTGlnaHRpbmdNaXhGYWN0b3IgPSBzb3VyY2Uub3V0bGluZUxpZ2h0aW5nTWl4RmFjdG9yO1xuICAgIHRoaXMudXZBbmltYXRpb25TY3JvbGxYU3BlZWRGYWN0b3IgPSBzb3VyY2UudXZBbmltYXRpb25TY3JvbGxYU3BlZWRGYWN0b3I7XG4gICAgdGhpcy51dkFuaW1hdGlvblNjcm9sbFlTcGVlZEZhY3RvciA9IHNvdXJjZS51dkFuaW1hdGlvblNjcm9sbFlTcGVlZEZhY3RvcjtcbiAgICB0aGlzLnV2QW5pbWF0aW9uUm90YXRpb25TcGVlZEZhY3RvciA9IHNvdXJjZS51dkFuaW1hdGlvblJvdGF0aW9uU3BlZWRGYWN0b3I7XG4gICAgdGhpcy51dkFuaW1hdGlvbk1hc2tUZXh0dXJlID0gc291cmNlLnV2QW5pbWF0aW9uTWFza1RleHR1cmUgPz8gbnVsbDtcblxuICAgIHRoaXMuc2hhZGVDb2xvck5vZGUgPSBzb3VyY2Uuc2hhZGVDb2xvck5vZGUgPz8gbnVsbDtcbiAgICB0aGlzLnNoYWRpbmdTaGlmdE5vZGUgPSBzb3VyY2Uuc2hhZGluZ1NoaWZ0Tm9kZSA/PyBudWxsO1xuICAgIHRoaXMuc2hhZGluZ1Rvb255Tm9kZSA9IHNvdXJjZS5zaGFkaW5nVG9vbnlOb2RlID8/IG51bGw7XG4gICAgdGhpcy5yaW1MaWdodGluZ01peE5vZGUgPSBzb3VyY2UucmltTGlnaHRpbmdNaXhOb2RlID8/IG51bGw7XG4gICAgdGhpcy5yaW1NdWx0aXBseU5vZGUgPSBzb3VyY2UucmltTXVsdGlwbHlOb2RlID8/IG51bGw7XG4gICAgdGhpcy5tYXRjYXBOb2RlID0gc291cmNlLm1hdGNhcE5vZGUgPz8gbnVsbDtcbiAgICB0aGlzLnBhcmFtZXRyaWNSaW1Db2xvck5vZGUgPSBzb3VyY2UucGFyYW1ldHJpY1JpbUNvbG9yTm9kZSA/PyBudWxsO1xuICAgIHRoaXMucGFyYW1ldHJpY1JpbUxpZnROb2RlID0gc291cmNlLnBhcmFtZXRyaWNSaW1MaWZ0Tm9kZSA/PyBudWxsO1xuICAgIHRoaXMucGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlck5vZGUgPSBzb3VyY2UucGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlck5vZGUgPz8gbnVsbDtcblxuICAgIHRoaXMuaXNPdXRsaW5lID0gc291cmNlLmlzT3V0bGluZSA/PyBudWxsO1xuXG4gICAgcmV0dXJuIHN1cGVyLmNvcHkoc291cmNlKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMudXZBbmltYXRpb25TY3JvbGxYT2Zmc2V0ICs9IGRlbHRhICogdGhpcy51dkFuaW1hdGlvblNjcm9sbFhTcGVlZEZhY3RvcjtcbiAgICB0aGlzLnV2QW5pbWF0aW9uU2Nyb2xsWU9mZnNldCArPSBkZWx0YSAqIHRoaXMudXZBbmltYXRpb25TY3JvbGxZU3BlZWRGYWN0b3I7XG4gICAgdGhpcy51dkFuaW1hdGlvblJvdGF0aW9uUGhhc2UgKz0gZGVsdGEgKiB0aGlzLnV2QW5pbWF0aW9uUm90YXRpb25TcGVlZEZhY3RvcjtcbiAgfVxuXG4gIHByaXZhdGUgX3NldHVwU2hhZGVDb2xvck5vZGUoKTogVEhSRUUuU3dpenphYmxlIHtcbiAgICBpZiAodGhpcy5zaGFkZUNvbG9yTm9kZSAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gVEhSRUUudmVjMyh0aGlzLnNoYWRlQ29sb3JOb2RlKTtcbiAgICB9XG5cbiAgICBsZXQgc2hhZGVDb2xvck5vZGU6IFRIUkVFLlNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT4gPSByZWZTaGFkZUNvbG9yRmFjdG9yO1xuXG4gICAgaWYgKHRoaXMuc2hhZGVNdWx0aXBseVRleHR1cmUgJiYgdGhpcy5zaGFkZU11bHRpcGx5VGV4dHVyZS5pc1RleHR1cmUgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IG1hcCA9IHJlZlNoYWRlTXVsdGlwbHlUZXh0dXJlLmNvbnRleHQoeyBnZXRVVjogKCkgPT4gdGhpcy5fYW5pbWF0ZWRVVk5vZGUgfSk7XG4gICAgICBzaGFkZUNvbG9yTm9kZSA9IHNoYWRlQ29sb3JOb2RlLm11bChtYXApO1xuICAgIH1cblxuICAgIHJldHVybiBzaGFkZUNvbG9yTm9kZTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldHVwU2hhZGluZ1NoaWZ0Tm9kZSgpOiBUSFJFRS5Ob2RlIHtcbiAgICBpZiAodGhpcy5zaGFkaW5nU2hpZnROb2RlICE9IG51bGwpIHtcbiAgICAgIHJldHVybiBUSFJFRS5mbG9hdCh0aGlzLnNoYWRpbmdTaGlmdE5vZGUpO1xuICAgIH1cblxuICAgIGxldCBzaGFkaW5nU2hpZnROb2RlOiBUSFJFRS5TaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+ID0gcmVmU2hhZGluZ1NoaWZ0RmFjdG9yO1xuXG4gICAgaWYgKHRoaXMuc2hhZGluZ1NoaWZ0VGV4dHVyZSAmJiB0aGlzLnNoYWRpbmdTaGlmdFRleHR1cmUuaXNUZXh0dXJlID09PSB0cnVlKSB7XG4gICAgICBjb25zdCBtYXAgPSByZWZTaGFkZU11bHRpcGx5VGV4dHVyZS5jb250ZXh0KHsgZ2V0VVY6ICgpID0+IHRoaXMuX2FuaW1hdGVkVVZOb2RlIH0pO1xuICAgICAgc2hhZGluZ1NoaWZ0Tm9kZSA9IHNoYWRpbmdTaGlmdE5vZGUuYWRkKG1hcC5tdWwocmVmU2hhZGVNdWx0aXBseVRleHR1cmVTY2FsZSkpO1xuICAgIH1cblxuICAgIHJldHVybiBzaGFkaW5nU2hpZnROb2RlO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0dXBTaGFkaW5nVG9vbnlOb2RlKCk6IFRIUkVFLk5vZGUge1xuICAgIGlmICh0aGlzLnNoYWRpbmdUb29ueU5vZGUgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIFRIUkVFLmZsb2F0KHRoaXMuc2hhZGluZ1Rvb255Tm9kZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlZlNoYWRpbmdUb29ueUZhY3RvcjtcbiAgfVxuXG4gIHByaXZhdGUgX3NldHVwUmltTGlnaHRpbmdNaXhOb2RlKCk6IFRIUkVFLk5vZGUge1xuICAgIGlmICh0aGlzLnJpbUxpZ2h0aW5nTWl4Tm9kZSAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gVEhSRUUuZmxvYXQodGhpcy5yaW1MaWdodGluZ01peE5vZGUpO1xuICAgIH1cblxuICAgIHJldHVybiByZWZSaW1MaWdodGluZ01peEZhY3RvcjtcbiAgfVxuXG4gIHByaXZhdGUgX3NldHVwUmltTXVsdGlwbHlOb2RlKCk6IFRIUkVFLlN3aXp6YWJsZSB7XG4gICAgaWYgKHRoaXMucmltTXVsdGlwbHlOb2RlICE9IG51bGwpIHtcbiAgICAgIHJldHVybiBUSFJFRS52ZWMzKHRoaXMucmltTXVsdGlwbHlOb2RlKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5yaW1NdWx0aXBseVRleHR1cmUgJiYgdGhpcy5yaW1NdWx0aXBseVRleHR1cmUuaXNUZXh0dXJlID09PSB0cnVlKSB7XG4gICAgICBjb25zdCBtYXAgPSByZWZSaW1NdWx0aXBseVRleHR1cmUuY29udGV4dCh7IGdldFVWOiAoKSA9PiB0aGlzLl9hbmltYXRlZFVWTm9kZSB9KTtcbiAgICAgIHJldHVybiBtYXA7XG4gICAgfVxuXG4gICAgcmV0dXJuIFRIUkVFLnZlYzMoMS4wKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldHVwTWF0Y2FwTm9kZSgpOiBUSFJFRS5Td2l6emFibGUge1xuICAgIGlmICh0aGlzLm1hdGNhcE5vZGUgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIFRIUkVFLnZlYzModGhpcy5tYXRjYXBOb2RlKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5tYXRjYXBUZXh0dXJlICYmIHRoaXMubWF0Y2FwVGV4dHVyZS5pc1RleHR1cmUgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IG1hcCA9IHJlZk1hdGNhcFRleHR1cmUuY29udGV4dCh7IGdldFVWOiAoKSA9PiBUSFJFRS5tYXRjYXBVVi5tdWwoMS4wLCAtMS4wKS5hZGQoMC4wLCAxLjApIH0pO1xuICAgICAgcmV0dXJuIG1hcC5tdWwocmVmTWF0Y2FwRmFjdG9yKTtcbiAgICB9XG5cbiAgICByZXR1cm4gVEhSRUUudmVjMygwLjApO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0dXBQYXJhbWV0cmljUmltTm9kZSgpOiBUSFJFRS5Td2l6emFibGUge1xuICAgIGNvbnN0IHBhcmFtZXRyaWNSaW1Db2xvciA9XG4gICAgICB0aGlzLnBhcmFtZXRyaWNSaW1Db2xvck5vZGUgIT0gbnVsbCA/IFRIUkVFLnZlYzModGhpcy5wYXJhbWV0cmljUmltQ29sb3JOb2RlKSA6IHJlZlBhcmFtZXRyaWNSaW1Db2xvckZhY3RvcjtcblxuICAgIGNvbnN0IHBhcmFtZXRyaWNSaW1MaWZ0ID1cbiAgICAgIHRoaXMucGFyYW1ldHJpY1JpbUxpZnROb2RlICE9IG51bGwgPyBUSFJFRS5mbG9hdCh0aGlzLnBhcmFtZXRyaWNSaW1MaWZ0Tm9kZSkgOiByZWZQYXJhbWV0cmljUmltTGlmdEZhY3RvcjtcblxuICAgIGNvbnN0IHBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXIgPVxuICAgICAgdGhpcy5wYXJhbWV0cmljUmltRnJlc25lbFBvd2VyTm9kZSAhPSBudWxsXG4gICAgICAgID8gVEhSRUUuZmxvYXQodGhpcy5wYXJhbWV0cmljUmltRnJlc25lbFBvd2VyTm9kZSlcbiAgICAgICAgOiByZWZQYXJhbWV0cmljUmltRnJlc25lbFBvd2VyRmFjdG9yO1xuXG4gICAgcmV0dXJuIG10b29uUGFyYW1ldHJpY1JpbSh7XG4gICAgICBwYXJhbWV0cmljUmltTGlmdCxcbiAgICAgIHBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXIsXG4gICAgICBwYXJhbWV0cmljUmltQ29sb3IsXG4gICAgfSk7XG4gIH1cbn1cblxuLy8gVE9ETzogUGFydCBvZiBzdHVmZiB0aGF0IE1Ub29uTWF0ZXJpYWwgZGVwZW5kcyBvbiBkb2VzIG5vdCBleGlzdCBpbiB0aHJlZS93ZWJncHUgKGUuZy4gVW5pZm9ybXNMaWIpXG4vLyBUSFJFRS5hZGROb2RlTWF0ZXJpYWwoJ01Ub29uTm9kZU1hdGVyaWFsJywgTVRvb25Ob2RlTWF0ZXJpYWwpO1xuIiwgIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiAqL1xuXG5leHBvcnQgY29uc3QgTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUgPSB7XG4gIE5vbmU6ICdub25lJyxcbiAgV29ybGRDb29yZGluYXRlczogJ3dvcmxkQ29vcmRpbmF0ZXMnLFxuICBTY3JlZW5Db29yZGluYXRlczogJ3NjcmVlbkNvb3JkaW5hdGVzJyxcbn0gYXMgY29uc3Q7XG5cbmV4cG9ydCB0eXBlIE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlID1cbiAgdHlwZW9mIE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlW2tleW9mIHR5cGVvZiBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZV07XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUvd2ViZ3B1JztcblxuZXhwb3J0IGNvbnN0IG10b29uUGFyYW1ldHJpY1JpbSA9IFRIUkVFLnRzbEZuKFxuICAoe1xuICAgIHBhcmFtZXRyaWNSaW1MaWZ0LFxuICAgIHBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXIsXG4gICAgcGFyYW1ldHJpY1JpbUNvbG9yLFxuICB9OiB7XG4gICAgcGFyYW1ldHJpY1JpbUxpZnQ6IFRIUkVFLk5vZGVSZXByZXNlbnRhdGlvbjtcbiAgICBwYXJhbWV0cmljUmltRnJlc25lbFBvd2VyOiBUSFJFRS5Ob2RlUmVwcmVzZW50YXRpb247XG4gICAgcGFyYW1ldHJpY1JpbUNvbG9yOiBUSFJFRS5Ob2RlUmVwcmVzZW50YXRpb247XG4gIH0pID0+IHtcbiAgICBjb25zdCB2aWV3RGlyID0gVEhSRUUubW9kZWxWaWV3UG9zaXRpb24ubm9ybWFsaXplKCk7XG4gICAgY29uc3QgZG90TlYgPSBUSFJFRS50cmFuc2Zvcm1lZE5vcm1hbFZpZXcuZG90KHZpZXdEaXIubmVnYXRlKCkpO1xuXG4gICAgY29uc3QgcmltID0gVEhSRUUuZmxvYXQoMS4wKS5zdWIoZG90TlYpLmFkZChwYXJhbWV0cmljUmltTGlmdCkuY2xhbXAoKS5wb3cocGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlcik7XG5cbiAgICByZXR1cm4gcmltLm11bChwYXJhbWV0cmljUmltQ29sb3IpO1xuICB9LFxuKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7OztBQ0dBLFlBQXVCO0FBRXZCLElBQU0sZ0JBQWdCLFNBQWUsZ0JBQVUsRUFBRTtBQUNqRCxJQUFJLGdCQUFnQixLQUFLO0FBQ3ZCLFVBQVE7QUFBQSxJQUNOLHNFQUFzRSxhQUFhO0FBQUEsRUFDckY7QUFDRjs7O0FDVkEsSUFBQUEsU0FBdUI7OztBQ0F2QixJQUFBQyxTQUF1QjtBQUVoQixJQUFNLFdBQWlCLHlCQUFrQixTQUFTLE9BQU87QUFDekQsSUFBTSxTQUFlLHlCQUFrQixPQUFPLFNBQVM7QUFDdkQsSUFBTSxlQUFxQix5QkFBa0IsYUFBYSxTQUFTO0FBQ25FLElBQU0saUJBQXVCLHlCQUFrQixlQUFlLE1BQU07QUFDcEUsSUFBTSxjQUFvQix5QkFBa0IsWUFBWSxPQUFPO0FB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O0FBQUEsSUFDL0U7QUFFQSxXQUFPO0FBQUEsRUFDVDtBQUFBLEVBRVEseUJBQXFDO0FBQzNDLFFBQUksS0FBSyxvQkFBb0IsTUFBTTtBQUNqQyxhQUFhLGFBQU0sS0FBSyxnQkFBZ0I7QUFBQSxJQUMxQztBQUVBLFdBQU87QUFBQSxFQUNUO0FBQUEsRUFFUSwyQkFBdUM7QUFDN0MsUUFBSSxLQUFLLHNCQUFzQixNQUFNO0FBQ25DLGFBQWEsYUFBTSxLQUFLLGtCQUFrQjtBQUFBLElBQzVDO0FBRUEsV0FBTztBQUFBLEVBQ1Q7QUFBQSxFQUVRLHdCQUF5QztBQUMvQyxRQUFJLEtBQUssbUJBQW1CLE1BQU07QUFDaEMsYUFBYSxZQUFLLEtBQUssZUFBZTtBQUFBLElBQ3hDO0FBRUEsUUFBSSxLQUFLLHNCQUFzQixLQUFLLG1CQUFtQixjQUFjLE1BQU07QUFDekUsWUFBTSxNQUFNLHNCQUFzQixRQUFRLEVBQUUsT0FBTyxNQUFNLEtBQUssZ0JBQWdCLENBQUM7QUFDL0UsYUFBTztBQUFBLElBQ1Q7QUFFQSxXQUFhLFlBQUssQ0FBRztBQUFBLEVBQ3ZCO0FBQUEsRUFFUSxtQkFBb0M7QUFDMUMsUUFBSSxLQUFLLGNBQWMsTUFBTTtBQUMzQixhQUFhLFlBQUssS0FBSyxVQUFVO0FBQUEsSUFDbkM7QUFFQSxRQUFJLEtBQUssaUJBQWlCLEtBQUssY0FBYyxjQUFjLE1BQU07QUFDL0QsWUFBTSxNQUFNLGlCQUFpQixRQUFRLEVBQUUsT0FBTyxNQUFZLGdCQUFTLElBQUksR0FBSyxFQUFJLEVBQUUsSUFBSSxHQUFLLENBQUcsRUFBRSxDQUFDO0FBQ2pHLGFBQU8sSUFBSSxJQUFJLGVBQWU7QUFBQSxJQUNoQztBQUVBLFdBQWEsWUFBSyxDQUFHO0FBQUEsRUFDdkI7QUFBQSxFQUVRLDBCQUEyQztBQUNqRCxVQUFNLHFCQUNKLEtBQUssMEJBQTBCLE9BQWEsWUFBSyxLQUFLLHNCQUFzQixJQUFJO0FBRWxGLFVBQU0sb0JBQ0osS0FBSyx5QkFBeUIsT0FBYSxhQUFNLEtBQUsscUJBQXFCLElBQUk7QUFFakYsVUFBTSw0QkFDSixLQUFLLGlDQUFpQyxPQUM1QixhQUFNLEtBQUssNkJBQTZCLElBQzlDO0FBRU4sV0FBTyxtQkFBbUI7QUFBQSxNQUN4QjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUNGOyIsCiAgIm5hbWVzIjogWyJUSFJFRSIsICJUSFJFRSIsICJ1diIsICJUSFJFRSIsICJUSFJFRSIsICJkaWZmdXNlQ29sb3IiLCAiVEhSRUUiLCAiVEhSRUUiLCAibm9ybWFsTG9jYWwiXQp9Cg==
