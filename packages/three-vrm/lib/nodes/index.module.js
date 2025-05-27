/*!
 * @pixiv/three-vrm v3.4.0
 * VRM file loader for three.js.
 *
 * Copyright (c) 2019-2025 pixiv Inc.
 * @pixiv/three-vrm is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */

// ../three-vrm-materials-mtoon/lib/nodes/index.module.js
import * as THREE from "three";
import * as THREE2 from "three/webgpu";
import { cos, mat2, sin, uv, vec2, vec4 } from "three/tsl";
import { materialReference } from "three/tsl";
import * as THREE4 from "three/webgpu";
import { BRDF_Lambert, diffuseColor, float, mix, transformedNormalView, vec3 } from "three/tsl";
import * as THREE3 from "three/webgpu";
import { nodeImmutable } from "three/tsl";
import * as THREE_TSL from "three/tsl";
import * as THREE_WEBGPU from "three/webgpu";
import * as THREE5 from "three/webgpu";
import {
  cameraProjectionMatrix,
  diffuseColor as diffuseColor2,
  float as float3,
  length,
  matcapUV,
  materialNormal,
  mix as mix2,
  modelNormalMatrix,
  modelViewMatrix,
  normalLocal,
  normalMap,
  positionLocal,
  vec3 as vec32,
  vec4 as vec42
} from "three/tsl";
import { float as float2, modelViewPosition, transformedNormalView as transformedNormalView2 } from "three/tsl";
var threeRevision = parseInt(THREE.REVISION, 10);
if (threeRevision < 167) {
  console.warn(
    `MToonNodeMaterial requires Three.js r167 or higher (You are using r${threeRevision}). This would not work correctly.`
  );
}
var refColor = materialReference("color", "color");
var refMap = materialReference("map", "texture");
var refNormalMap = materialReference("normalMap", "texture");
var refNormalScale = materialReference("normalScale", "vec2");
var refEmissive = materialReference("emissive", "color");
var refEmissiveIntensity = materialReference("emissiveIntensity", "float");
var refEmissiveMap = materialReference("emissiveMap", "texture");
var refShadeColorFactor = materialReference("shadeColorFactor", "color");
var refShadingShiftFactor = materialReference("shadingShiftFactor", "float");
var refShadeMultiplyTexture = materialReference("shadeMultiplyTexture", "texture");
var refShadeMultiplyTextureScale = materialReference("shadeMultiplyTextureScale", "float");
var refShadingToonyFactor = materialReference("shadingToonyFactor", "float");
var refRimLightingMixFactor = materialReference("rimLightingMixFactor", "float");
var refRimMultiplyTexture = materialReference("rimMultiplyTexture", "texture");
var refMatcapFactor = materialReference("matcapFactor", "color");
var refMatcapTexture = materialReference("matcapTexture", "texture");
var refParametricRimColorFactor = materialReference("parametricRimColorFactor", "color");
var refParametricRimLiftFactor = materialReference("parametricRimLiftFactor", "float");
var refParametricRimFresnelPowerFactor = materialReference("parametricRimFresnelPowerFactor", "float");
var refOutlineWidthMultiplyTexture = materialReference("outlineWidthMultiplyTexture", "texture");
var refOutlineWidthFactor = materialReference("outlineWidthFactor", "float");
var refOutlineColorFactor = materialReference("outlineColorFactor", "color");
var refOutlineLightingMixFactor = materialReference("outlineLightingMixFactor", "float");
var refUVAnimationMaskTexture = materialReference("uvAnimationMaskTexture", "texture");
var refUVAnimationScrollXOffset = materialReference("uvAnimationScrollXOffset", "float");
var refUVAnimationScrollYOffset = materialReference("uvAnimationScrollYOffset", "float");
var refUVAnimationRotationPhase = materialReference("uvAnimationRotationPhase", "float");
var MToonAnimatedUVNode = class extends THREE2.TempNode {
  constructor(hasMaskTexture) {
    super("vec2");
    this.hasMaskTexture = hasMaskTexture;
  }
  setup() {
    let uvAnimationMask = 1;
    if (this.hasMaskTexture) {
      uvAnimationMask = vec4(refUVAnimationMaskTexture).context({ getUV: () => uv() }).r;
    }
    let animatedUv = uv();
    const phase = refUVAnimationRotationPhase.mul(uvAnimationMask);
    const c = cos(phase);
    const s = sin(phase);
    animatedUv = animatedUv.sub(vec2(0.5, 0.5));
    animatedUv = animatedUv.mul(mat2(c, s, s.negate(), c));
    animatedUv = animatedUv.add(vec2(0.5, 0.5));
    const scroll = vec2(refUVAnimationScrollXOffset, refUVAnimationScrollYOffset).mul(uvAnimationMask);
    animatedUv = animatedUv.add(scroll);
    return animatedUv.toVar("AnimatedUV");
  }
};
var shadeColor = nodeImmutable(THREE3.PropertyNode, "vec3").toVar("ShadeColor");
var shadingShift = nodeImmutable(THREE3.PropertyNode, "float").toVar("ShadingShift");
var shadingToony = nodeImmutable(THREE3.PropertyNode, "float").toVar("ShadingToony");
var rimLightingMix = nodeImmutable(THREE3.PropertyNode, "float").toVar("RimLightingMix");
var rimMultiply = nodeImmutable(THREE3.PropertyNode, "vec3").toVar("RimMultiply");
var matcap = nodeImmutable(THREE3.PropertyNode, "vec3").toVar("matcap");
var parametricRim = nodeImmutable(THREE3.PropertyNode, "vec3").toVar("ParametricRim");
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
  const feather = float(1).sub(shadingToony);
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
    const feathered = mix(shadeColor, diffuseColor, shading);
    const col = lightColor.mul(BRDF_Lambert({ diffuseColor: feathered }));
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
    const dotNL = transformedNormalView.dot(lightDirection).clamp(-1, 1);
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
      parametricRim.add(matcap).mul(rimMultiply).mul(mix(vec3(0), BRDF_Lambert({ diffuseColor: lightColor }), rimLightingMix))
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
      irradiance.mul(BRDF_Lambert({ diffuseColor }))
    );
  }
  indirectSpecular(context) {
    const { reflectedLight } = context;
    reflectedLight.indirectSpecular.addAssign(
      parametricRim.add(matcap).mul(rimMultiply).mul(mix(vec3(1), vec3(0), rimLightingMix))
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
    const viewDir = modelViewPosition.normalize();
    const dotNV = transformedNormalView2.dot(viewDir.negate());
    const rim = float2(1).sub(dotNV).add(parametricRimLift).clamp().pow(parametricRimFresnelPower);
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
        diffuseColor2.a.assign(1);
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
      this.normalNode = materialNormal;
      if (this.normalMap && this.normalMap.isTexture === true) {
        const map = refNormalMap.context({ getUV: () => this._animatedUVNode });
        this.normalNode = normalMap(map, refNormalScale);
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
      outputNode = vec42(
        mix2(refOutlineColorFactor, outputNode.xyz.mul(refOutlineColorFactor), refOutlineLightingMixFactor),
        outputNode.w
      );
    }
    return super.setupOutput(builder, outputNode);
  }
  setupPosition(builder) {
    var _a, _b;
    const tempPositionNode = this.positionNode;
    if (this.isOutline && this.outlineWidthMode !== MToonMaterialOutlineWidthMode.None) {
      (_a = this.positionNode) != null ? _a : this.positionNode = positionLocal;
      const normalLocalNormalized = normalLocal.normalize();
      let width = refOutlineWidthFactor;
      if (this.outlineWidthMultiplyTexture && this.outlineWidthMultiplyTexture.isTexture === true) {
        const map = refOutlineWidthMultiplyTexture.context({ getUV: () => this._animatedUVNode });
        width = width.mul(map);
      }
      const worldNormalLength = length(modelNormalMatrix.mul(normalLocalNormalized));
      const outlineOffset = width.mul(worldNormalLength).mul(normalLocalNormalized);
      if (this.outlineWidthMode === MToonMaterialOutlineWidthMode.WorldCoordinates) {
        this.positionNode = this.positionNode.add(outlineOffset);
      } else if (this.outlineWidthMode === MToonMaterialOutlineWidthMode.ScreenCoordinates) {
        const clipScale = cameraProjectionMatrix.element(1).element(1);
        const tempPositionView = modelViewMatrix.mul(positionLocal);
        this.positionNode = this.positionNode.add(
          outlineOffset.div(clipScale).mul(tempPositionView.z.negate())
        );
      }
      (_b = this.positionNode) != null ? _b : this.positionNode = positionLocal;
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
      return vec32(this.shadeColorNode);
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
      return float3(this.shadingShiftNode);
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
      return float3(this.shadingToonyNode);
    }
    return refShadingToonyFactor;
  }
  _setupRimLightingMixNode() {
    if (this.rimLightingMixNode != null) {
      return float3(this.rimLightingMixNode);
    }
    return refRimLightingMixFactor;
  }
  _setupRimMultiplyNode() {
    if (this.rimMultiplyNode != null) {
      return vec32(this.rimMultiplyNode);
    }
    if (this.rimMultiplyTexture && this.rimMultiplyTexture.isTexture === true) {
      const map = refRimMultiplyTexture.context({ getUV: () => this._animatedUVNode });
      return map;
    }
    return vec32(1);
  }
  _setupMatcapNode() {
    if (this.matcapNode != null) {
      return vec32(this.matcapNode);
    }
    if (this.matcapTexture && this.matcapTexture.isTexture === true) {
      const map = refMatcapTexture.context({ getUV: () => matcapUV.mul(1, -1).add(0, 1) });
      return map.mul(refMatcapFactor);
    }
    return vec32(0);
  }
  _setupParametricRimNode() {
    const parametricRimColor = this.parametricRimColorNode != null ? vec32(this.parametricRimColorNode) : refParametricRimColorFactor;
    const parametricRimLift = this.parametricRimLiftNode != null ? float3(this.parametricRimLiftNode) : refParametricRimLiftFactor;
    const parametricRimFresnelPower = this.parametricRimFresnelPowerNode != null ? float3(this.parametricRimFresnelPowerNode) : refParametricRimFresnelPowerFactor;
    return mtoonParametricRim({
      parametricRimLift,
      parametricRimFresnelPower,
      parametricRimColor
    });
  }
};
export {
  MToonAnimatedUVNode,
  MToonLightingModel,
  MToonNodeMaterial
};
/*!
 * @pixiv/three-vrm-materials-mtoon v3.4.0
 * MToon (toon material) module for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2025 pixiv Inc.
 * @pixiv/three-vrm-materials-mtoon is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vdGhyZWUtdnJtLW1hdGVyaWFscy1tdG9vbi9zcmMvbm9kZXMvd2FybmluZ0lmUHJlMTYxLnRzIiwgIi4uLy4uLy4uL3RocmVlLXZybS1tYXRlcmlhbHMtbXRvb24vc3JjL25vZGVzL01Ub29uQW5pbWF0ZWRVVk5vZGUudHMiLCAiLi4vLi4vLi4vdGhyZWUtdnJtLW1hdGVyaWFscy1tdG9vbi9zcmMvbm9kZXMvbWF0ZXJpYWxSZWZlcmVuY2VzLnRzIiwgIi4uLy4uLy4uL3RocmVlLXZybS1tYXRlcmlhbHMtbXRvb24vc3JjL25vZGVzL01Ub29uTGlnaHRpbmdNb2RlbC50cyIsICIuLi8uLi8uLi90aHJlZS12cm0tbWF0ZXJpYWxzLW10b29uL3NyYy9ub2Rlcy9pbW11dGFibGVOb2Rlcy50cyIsICIuLi8uLi8uLi90aHJlZS12cm0tbWF0ZXJpYWxzLW10b29uL3NyYy9ub2Rlcy91dGlscy9GbkNvbXBhdC50cyIsICIuLi8uLi8uLi90aHJlZS12cm0tbWF0ZXJpYWxzLW10b29uL3NyYy9ub2Rlcy9NVG9vbk5vZGVNYXRlcmlhbC50cyIsICIuLi8uLi8uLi90aHJlZS12cm0tbWF0ZXJpYWxzLW10b29uL3NyYy9NVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZS50cyIsICIuLi8uLi8uLi90aHJlZS12cm0tbWF0ZXJpYWxzLW10b29uL3NyYy9ub2Rlcy9tdG9vblBhcmFtZXRyaWNSaW0udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIFRoaXMgbW9kdWxlIHdpbGwgYmUgaW1wb3J0ZWQgYXQgdGhlIGJlZ2lubmluZyBvZiBgdGhyZWUtdnJtLW1hdGVyaWFscy1tdG9vbi9ub2Rlc2Bcbi8vIElmIHRoZSB2ZXJzaW9uIG9mIFRocmVlLmpzIGlzIGxlc3MgdGhhbiByMTY3LCBpdCB3aWxsIHdhcm4gdGhhdCBpdCBpcyBub3Qgc3VwcG9ydGVkXG5cbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuY29uc3QgdGhyZWVSZXZpc2lvbiA9IHBhcnNlSW50KFRIUkVFLlJFVklTSU9OLCAxMCk7XG5pZiAodGhyZWVSZXZpc2lvbiA8IDE2Nykge1xuICBjb25zb2xlLndhcm4oXG4gICAgYE1Ub29uTm9kZU1hdGVyaWFsIHJlcXVpcmVzIFRocmVlLmpzIHIxNjcgb3IgaGlnaGVyIChZb3UgYXJlIHVzaW5nIHIke3RocmVlUmV2aXNpb259KS4gVGhpcyB3b3VsZCBub3Qgd29yayBjb3JyZWN0bHkuYCxcbiAgKTtcbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS93ZWJncHUnO1xuaW1wb3J0IHsgY29zLCBtYXQyLCBOb2RlUmVwcmVzZW50YXRpb24sIFNoYWRlck5vZGVPYmplY3QsIHNpbiwgU3dpenphYmxlLCB1diwgdmVjMiwgdmVjNCB9IGZyb20gJ3RocmVlL3RzbCc7XG5pbXBvcnQge1xuICByZWZVVkFuaW1hdGlvbk1hc2tUZXh0dXJlLFxuICByZWZVVkFuaW1hdGlvblJvdGF0aW9uUGhhc2UsXG4gIHJlZlVWQW5pbWF0aW9uU2Nyb2xsWE9mZnNldCxcbiAgcmVmVVZBbmltYXRpb25TY3JvbGxZT2Zmc2V0LFxufSBmcm9tICcuL21hdGVyaWFsUmVmZXJlbmNlcyc7XG5cbmV4cG9ydCBjbGFzcyBNVG9vbkFuaW1hdGVkVVZOb2RlIGV4dGVuZHMgVEhSRUUuVGVtcE5vZGUge1xuICBwdWJsaWMgcmVhZG9ubHkgaGFzTWFza1RleHR1cmU6IGJvb2xlYW47XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGhhc01hc2tUZXh0dXJlOiBib29sZWFuKSB7XG4gICAgc3VwZXIoJ3ZlYzInKTtcblxuICAgIHRoaXMuaGFzTWFza1RleHR1cmUgPSBoYXNNYXNrVGV4dHVyZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXR1cCgpOiBTaGFkZXJOb2RlT2JqZWN0PFRIUkVFLlZhck5vZGU+IHtcbiAgICBsZXQgdXZBbmltYXRpb25NYXNrOiBOb2RlUmVwcmVzZW50YXRpb24gPSAxLjA7XG5cbiAgICBpZiAodGhpcy5oYXNNYXNrVGV4dHVyZSkge1xuICAgICAgdXZBbmltYXRpb25NYXNrID0gdmVjNChyZWZVVkFuaW1hdGlvbk1hc2tUZXh0dXJlKS5jb250ZXh0KHsgZ2V0VVY6ICgpID0+IHV2KCkgfSkucjtcbiAgICB9XG5cbiAgICBsZXQgYW5pbWF0ZWRVdjogU2hhZGVyTm9kZU9iamVjdDxTd2l6emFibGU+ID0gdXYoKTtcblxuICAgIC8vIHJvdGF0ZVxuICAgIGNvbnN0IHBoYXNlID0gcmVmVVZBbmltYXRpb25Sb3RhdGlvblBoYXNlLm11bCh1dkFuaW1hdGlvbk1hc2spO1xuXG4gICAgLy8gV09SS0FST1VORDogVEhSRUUucm90YXRlVVYgY2F1c2VzIGFuIGlzc3VlIHdpdGggdGhlIG1hc2sgdGV4dHVyZVxuICAgIC8vIFdlIGFyZSBnb2luZyB0byBzcGluIHVzaW5nIGEgMTAwJSBvcmdhbmljIGhhbmRtYWRlIHJvdGF0aW9uIG1hdHJpeFxuICAgIC8vIGFuaW1hdGVkVXYgPSBUSFJFRS5yb3RhdGVVVihhbmltYXRlZFV2LCBwaGFzZSwgVEhSRUUudmVjMigwLjUsIDAuNSkpO1xuXG4gICAgY29uc3QgYyA9IGNvcyhwaGFzZSk7XG4gICAgY29uc3QgcyA9IHNpbihwaGFzZSk7XG4gICAgYW5pbWF0ZWRVdiA9IGFuaW1hdGVkVXYuc3ViKHZlYzIoMC41LCAwLjUpKTtcbiAgICBhbmltYXRlZFV2ID0gYW5pbWF0ZWRVdi5tdWwobWF0MihjLCBzLCBzLm5lZ2F0ZSgpLCBjKSk7XG4gICAgYW5pbWF0ZWRVdiA9IGFuaW1hdGVkVXYuYWRkKHZlYzIoMC41LCAwLjUpKTtcblxuICAgIC8vIHNjcm9sbFxuICAgIGNvbnN0IHNjcm9sbCA9IHZlYzIocmVmVVZBbmltYXRpb25TY3JvbGxYT2Zmc2V0LCByZWZVVkFuaW1hdGlvblNjcm9sbFlPZmZzZXQpLm11bCh1dkFuaW1hdGlvbk1hc2spO1xuICAgIGFuaW1hdGVkVXYgPSBhbmltYXRlZFV2LmFkZChzY3JvbGwpO1xuXG4gICAgcmV0dXJuIGFuaW1hdGVkVXYudG9WYXIoJ0FuaW1hdGVkVVYnKTtcbiAgfVxufVxuIiwgImltcG9ydCB7IG1hdGVyaWFsUmVmZXJlbmNlIH0gZnJvbSAndGhyZWUvdHNsJztcblxuZXhwb3J0IGNvbnN0IHJlZkNvbG9yID0gbWF0ZXJpYWxSZWZlcmVuY2UoJ2NvbG9yJywgJ2NvbG9yJyk7XG5leHBvcnQgY29uc3QgcmVmTWFwID0gbWF0ZXJpYWxSZWZlcmVuY2UoJ21hcCcsICd0ZXh0dXJlJyk7XG5leHBvcnQgY29uc3QgcmVmTm9ybWFsTWFwID0gbWF0ZXJpYWxSZWZlcmVuY2UoJ25vcm1hbE1hcCcsICd0ZXh0dXJlJyk7XG5leHBvcnQgY29uc3QgcmVmTm9ybWFsU2NhbGUgPSBtYXRlcmlhbFJlZmVyZW5jZSgnbm9ybWFsU2NhbGUnLCAndmVjMicpO1xuZXhwb3J0IGNvbnN0IHJlZkVtaXNzaXZlID0gbWF0ZXJpYWxSZWZlcmVuY2UoJ2VtaXNzaXZlJywgJ2NvbG9yJyk7XG5leHBvcnQgY29uc3QgcmVmRW1pc3NpdmVJbnRlbnNpdHkgPSBtYXRlcmlhbFJlZmVyZW5jZSgnZW1pc3NpdmVJbnRlbnNpdHknLCAnZmxvYXQnKTtcbmV4cG9ydCBjb25zdCByZWZFbWlzc2l2ZU1hcCA9IG1hdGVyaWFsUmVmZXJlbmNlKCdlbWlzc2l2ZU1hcCcsICd0ZXh0dXJlJyk7XG5cbmV4cG9ydCBjb25zdCByZWZTaGFkZUNvbG9yRmFjdG9yID0gbWF0ZXJpYWxSZWZlcmVuY2UoJ3NoYWRlQ29sb3JGYWN0b3InLCAnY29sb3InKTtcbmV4cG9ydCBjb25zdCByZWZTaGFkaW5nU2hpZnRGYWN0b3IgPSBtYXRlcmlhbFJlZmVyZW5jZSgnc2hhZGluZ1NoaWZ0RmFjdG9yJywgJ2Zsb2F0Jyk7XG5leHBvcnQgY29uc3QgcmVmU2hhZGVNdWx0aXBseVRleHR1cmUgPSBtYXRlcmlhbFJlZmVyZW5jZSgnc2hhZGVNdWx0aXBseVRleHR1cmUnLCAndGV4dHVyZScpO1xuZXhwb3J0IGNvbnN0IHJlZlNoYWRlTXVsdGlwbHlUZXh0dXJlU2NhbGUgPSBtYXRlcmlhbFJlZmVyZW5jZSgnc2hhZGVNdWx0aXBseVRleHR1cmVTY2FsZScsICdmbG9hdCcpO1xuZXhwb3J0IGNvbnN0IHJlZlNoYWRpbmdUb29ueUZhY3RvciA9IG1hdGVyaWFsUmVmZXJlbmNlKCdzaGFkaW5nVG9vbnlGYWN0b3InLCAnZmxvYXQnKTtcbmV4cG9ydCBjb25zdCByZWZSaW1MaWdodGluZ01peEZhY3RvciA9IG1hdGVyaWFsUmVmZXJlbmNlKCdyaW1MaWdodGluZ01peEZhY3RvcicsICdmbG9hdCcpO1xuZXhwb3J0IGNvbnN0IHJlZlJpbU11bHRpcGx5VGV4dHVyZSA9IG1hdGVyaWFsUmVmZXJlbmNlKCdyaW1NdWx0aXBseVRleHR1cmUnLCAndGV4dHVyZScpO1xuZXhwb3J0IGNvbnN0IHJlZk1hdGNhcEZhY3RvciA9IG1hdGVyaWFsUmVmZXJlbmNlKCdtYXRjYXBGYWN0b3InLCAnY29sb3InKTtcbmV4cG9ydCBjb25zdCByZWZNYXRjYXBUZXh0dXJlID0gbWF0ZXJpYWxSZWZlcmVuY2UoJ21hdGNhcFRleHR1cmUnLCAndGV4dHVyZScpO1xuZXhwb3J0IGNvbnN0IHJlZlBhcmFtZXRyaWNSaW1Db2xvckZhY3RvciA9IG1hdGVyaWFsUmVmZXJlbmNlKCdwYXJhbWV0cmljUmltQ29sb3JGYWN0b3InLCAnY29sb3InKTtcbmV4cG9ydCBjb25zdCByZWZQYXJhbWV0cmljUmltTGlmdEZhY3RvciA9IG1hdGVyaWFsUmVmZXJlbmNlKCdwYXJhbWV0cmljUmltTGlmdEZhY3RvcicsICdmbG9hdCcpO1xuZXhwb3J0IGNvbnN0IHJlZlBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJGYWN0b3IgPSBtYXRlcmlhbFJlZmVyZW5jZSgncGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlckZhY3RvcicsICdmbG9hdCcpO1xuZXhwb3J0IGNvbnN0IHJlZk91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZSA9IG1hdGVyaWFsUmVmZXJlbmNlKCdvdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmUnLCAndGV4dHVyZScpO1xuZXhwb3J0IGNvbnN0IHJlZk91dGxpbmVXaWR0aEZhY3RvciA9IG1hdGVyaWFsUmVmZXJlbmNlKCdvdXRsaW5lV2lkdGhGYWN0b3InLCAnZmxvYXQnKTtcbmV4cG9ydCBjb25zdCByZWZPdXRsaW5lQ29sb3JGYWN0b3IgPSBtYXRlcmlhbFJlZmVyZW5jZSgnb3V0bGluZUNvbG9yRmFjdG9yJywgJ2NvbG9yJyk7XG5leHBvcnQgY29uc3QgcmVmT3V0bGluZUxpZ2h0aW5nTWl4RmFjdG9yID0gbWF0ZXJpYWxSZWZlcmVuY2UoJ291dGxpbmVMaWdodGluZ01peEZhY3RvcicsICdmbG9hdCcpO1xuZXhwb3J0IGNvbnN0IHJlZlVWQW5pbWF0aW9uTWFza1RleHR1cmUgPSBtYXRlcmlhbFJlZmVyZW5jZSgndXZBbmltYXRpb25NYXNrVGV4dHVyZScsICd0ZXh0dXJlJyk7XG5cbmV4cG9ydCBjb25zdCByZWZVVkFuaW1hdGlvblNjcm9sbFhPZmZzZXQgPSBtYXRlcmlhbFJlZmVyZW5jZSgndXZBbmltYXRpb25TY3JvbGxYT2Zmc2V0JywgJ2Zsb2F0Jyk7XG5leHBvcnQgY29uc3QgcmVmVVZBbmltYXRpb25TY3JvbGxZT2Zmc2V0ID0gbWF0ZXJpYWxSZWZlcmVuY2UoJ3V2QW5pbWF0aW9uU2Nyb2xsWU9mZnNldCcsICdmbG9hdCcpO1xuZXhwb3J0IGNvbnN0IHJlZlVWQW5pbWF0aW9uUm90YXRpb25QaGFzZSA9IG1hdGVyaWFsUmVmZXJlbmNlKCd1dkFuaW1hdGlvblJvdGF0aW9uUGhhc2UnLCAnZmxvYXQnKTtcbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS93ZWJncHUnO1xuaW1wb3J0IHsgQlJERl9MYW1iZXJ0LCBkaWZmdXNlQ29sb3IsIGZsb2F0LCBtaXgsIFNoYWRlck5vZGVPYmplY3QsIHRyYW5zZm9ybWVkTm9ybWFsVmlldywgdmVjMyB9IGZyb20gJ3RocmVlL3RzbCc7XG5pbXBvcnQge1xuICBtYXRjYXAsXG4gIHBhcmFtZXRyaWNSaW0sXG4gIHJpbUxpZ2h0aW5nTWl4LFxuICByaW1NdWx0aXBseSxcbiAgc2hhZGVDb2xvcixcbiAgc2hhZGluZ1NoaWZ0LFxuICBzaGFkaW5nVG9vbnksXG59IGZyb20gJy4vaW1tdXRhYmxlTm9kZXMnO1xuaW1wb3J0IHsgRm5Db21wYXQgfSBmcm9tICcuL3V0aWxzL0ZuQ29tcGF0JztcblxuLy8gVE9ETzogMCUgY29uZmlkZW5jZSBhYm91dCBmdW5jdGlvbiB0eXBlcy5cblxuY29uc3QgbGluZWFyc3RlcCA9IEZuQ29tcGF0KFxuICAoe1xuICAgIGEsXG4gICAgYixcbiAgICB0LFxuICB9OiB7XG4gICAgYTogU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPjtcbiAgICBiOiBTaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+O1xuICAgIHQ6IFNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT47XG4gIH0pID0+IHtcbiAgICBjb25zdCB0b3AgPSB0LnN1YihhKTtcbiAgICBjb25zdCBib3R0b20gPSBiLnN1YihhKTtcbiAgICByZXR1cm4gdG9wLmRpdihib3R0b20pLmNsYW1wKCk7XG4gIH0sXG4pO1xuXG4vKipcbiAqIENvbnZlcnQgTmRvdEwgaW50byB0b29uIHNoYWRpbmcgZmFjdG9yIHVzaW5nIHNoYWRpbmdTaGlmdCBhbmQgc2hhZGluZ1Rvb255XG4gKi9cbmNvbnN0IGdldFNoYWRpbmcgPSBGbkNvbXBhdCgoeyBkb3ROTCB9OiB7IGRvdE5MOiBTaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+IH0pID0+IHtcbiAgY29uc3Qgc2hhZG93ID0gMS4wOyAvLyBUT0RPXG5cbiAgY29uc3QgZmVhdGhlciA9IGZsb2F0KDEuMCkuc3ViKHNoYWRpbmdUb29ueSk7XG5cbiAgbGV0IHNoYWRpbmc6IFNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT4gPSBkb3ROTC5hZGQoc2hhZGluZ1NoaWZ0KTtcbiAgc2hhZGluZyA9IGxpbmVhcnN0ZXAoe1xuICAgIGE6IGZlYXRoZXIubmVnYXRlKCksXG4gICAgYjogZmVhdGhlcixcbiAgICB0OiBzaGFkaW5nLFxuICB9KTtcbiAgc2hhZGluZyA9IHNoYWRpbmcubXVsKHNoYWRvdyk7XG4gIHJldHVybiBzaGFkaW5nO1xufSk7XG5cbi8qKlxuICogTWl4IGRpZmZ1c2VDb2xvciBhbmQgc2hhZGVDb2xvciB1c2luZyBzaGFkaW5nIGZhY3RvciBhbmQgbGlnaHQgY29sb3JcbiAqL1xuY29uc3QgZ2V0RGlmZnVzZSA9IEZuQ29tcGF0KFxuICAoeyBzaGFkaW5nLCBsaWdodENvbG9yIH06IHsgc2hhZGluZzogU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPjsgbGlnaHRDb2xvcjogU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPiB9KSA9PiB7XG4gICAgY29uc3QgZmVhdGhlcmVkID0gbWl4KHNoYWRlQ29sb3IsIGRpZmZ1c2VDb2xvciwgc2hhZGluZyk7XG4gICAgY29uc3QgY29sID0gbGlnaHRDb2xvci5tdWwoQlJERl9MYW1iZXJ0KHsgZGlmZnVzZUNvbG9yOiBmZWF0aGVyZWQgfSkpO1xuXG4gICAgcmV0dXJuIGNvbDtcbiAgfSxcbik7XG5cbmV4cG9ydCBjbGFzcyBNVG9vbkxpZ2h0aW5nTW9kZWwgZXh0ZW5kcyBUSFJFRS5MaWdodGluZ01vZGVsIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIGRpcmVjdCh7XG4gICAgbGlnaHREaXJlY3Rpb24sXG4gICAgbGlnaHRDb2xvcixcbiAgICByZWZsZWN0ZWRMaWdodCxcbiAgfTogVEhSRUUuTGlnaHRpbmdNb2RlbERpcmVjdElucHV0ICYgeyBsaWdodERpcmVjdGlvbjogVEhSRUUuTm9kZTsgbGlnaHRDb2xvcjogVEhSRUUuTm9kZSB9KSB7XG4gICAgY29uc3QgZG90TkwgPSB0cmFuc2Zvcm1lZE5vcm1hbFZpZXcuZG90KGxpZ2h0RGlyZWN0aW9uKS5jbGFtcCgtMS4wLCAxLjApO1xuXG4gICAgLy8gdG9vbiBkaWZmdXNlXG4gICAgY29uc3Qgc2hhZGluZyA9IGdldFNoYWRpbmcoe1xuICAgICAgZG90TkwsXG4gICAgfSk7XG5cbiAgICAocmVmbGVjdGVkTGlnaHQuZGlyZWN0RGlmZnVzZSBhcyBTaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+KS5hZGRBc3NpZ24oXG4gICAgICBnZXREaWZmdXNlKHtcbiAgICAgICAgc2hhZGluZyxcbiAgICAgICAgbGlnaHRDb2xvcjogbGlnaHRDb2xvciBhcyBTaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+LFxuICAgICAgfSksXG4gICAgKTtcblxuICAgIC8vIHJpbVxuICAgIChyZWZsZWN0ZWRMaWdodC5kaXJlY3RTcGVjdWxhciBhcyBTaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+KS5hZGRBc3NpZ24oXG4gICAgICBwYXJhbWV0cmljUmltXG4gICAgICAgIC5hZGQobWF0Y2FwKVxuICAgICAgICAubXVsKHJpbU11bHRpcGx5KVxuICAgICAgICAubXVsKG1peCh2ZWMzKDAuMCksIEJSREZfTGFtYmVydCh7IGRpZmZ1c2VDb2xvcjogbGlnaHRDb2xvciB9KSwgcmltTGlnaHRpbmdNaXgpKSxcbiAgICApO1xuICB9XG5cbiAgLy8gQ09NUEFUOiBwcmUtcjE3NFxuICAvLyBgYnVpbGRlck9yQ29udGV4dGA6IGBUSFJFRS5Ob2RlQnVpbGRlcmAgaW4gPj0gcjE3NCwgYExpZ2h0aW5nTW9kZWxJbmRpcmVjdElucHV0YCAoYExpZ2h0aW5nQ29udGV4dGApIG90aGVyd2lzZVxuICBpbmRpcmVjdChidWlsZGVyT3JDb250ZXh0OiBUSFJFRS5Ob2RlQnVpbGRlciB8IFRIUkVFLkxpZ2h0aW5nQ29udGV4dCkge1xuICAgIGNvbnN0IGNvbnRleHQ6IFRIUkVFLkxpZ2h0aW5nQ29udGV4dCA9XG4gICAgICAnY29udGV4dCcgaW4gYnVpbGRlck9yQ29udGV4dCA/IChidWlsZGVyT3JDb250ZXh0LmNvbnRleHQgYXMgdW5rbm93biBhcyBUSFJFRS5MaWdodGluZ0NvbnRleHQpIDogYnVpbGRlck9yQ29udGV4dDtcblxuICAgIHRoaXMuaW5kaXJlY3REaWZmdXNlKGNvbnRleHQpO1xuICAgIHRoaXMuaW5kaXJlY3RTcGVjdWxhcihjb250ZXh0KTtcbiAgfVxuXG4gIGluZGlyZWN0RGlmZnVzZShjb250ZXh0OiBUSFJFRS5MaWdodGluZ0NvbnRleHQpIHtcbiAgICBjb25zdCB7IGlycmFkaWFuY2UsIHJlZmxlY3RlZExpZ2h0IH0gPSBjb250ZXh0O1xuXG4gICAgLy8gaW5kaXJlY3QgaXJyYWRpYW5jZVxuICAgIChyZWZsZWN0ZWRMaWdodC5pbmRpcmVjdERpZmZ1c2UgYXMgU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPikuYWRkQXNzaWduKFxuICAgICAgKGlycmFkaWFuY2UgYXMgU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPikubXVsKEJSREZfTGFtYmVydCh7IGRpZmZ1c2VDb2xvciB9KSksXG4gICAgKTtcbiAgfVxuXG4gIGluZGlyZWN0U3BlY3VsYXIoY29udGV4dDogVEhSRUUuTGlnaHRpbmdDb250ZXh0KSB7XG4gICAgY29uc3QgeyByZWZsZWN0ZWRMaWdodCB9ID0gY29udGV4dDtcblxuICAgIC8vIHJpbVxuICAgIChyZWZsZWN0ZWRMaWdodC5pbmRpcmVjdFNwZWN1bGFyIGFzIFNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT4pLmFkZEFzc2lnbihcbiAgICAgIHBhcmFtZXRyaWNSaW1cbiAgICAgICAgLmFkZChtYXRjYXApXG4gICAgICAgIC5tdWwocmltTXVsdGlwbHkpXG4gICAgICAgIC5tdWwobWl4KHZlYzMoMS4wKSwgdmVjMygwLjApLCByaW1MaWdodGluZ01peCkpLFxuICAgICk7XG4gIH1cbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS93ZWJncHUnO1xuaW1wb3J0IHsgbm9kZUltbXV0YWJsZSB9IGZyb20gJ3RocmVlL3RzbCc7XG5cbmV4cG9ydCBjb25zdCBzaGFkZUNvbG9yID0gbm9kZUltbXV0YWJsZShUSFJFRS5Qcm9wZXJ0eU5vZGUsICd2ZWMzJykudG9WYXIoJ1NoYWRlQ29sb3InKTtcbmV4cG9ydCBjb25zdCBzaGFkaW5nU2hpZnQgPSBub2RlSW1tdXRhYmxlKFRIUkVFLlByb3BlcnR5Tm9kZSwgJ2Zsb2F0JykudG9WYXIoJ1NoYWRpbmdTaGlmdCcpO1xuZXhwb3J0IGNvbnN0IHNoYWRpbmdUb29ueSA9IG5vZGVJbW11dGFibGUoVEhSRUUuUHJvcGVydHlOb2RlLCAnZmxvYXQnKS50b1ZhcignU2hhZGluZ1Rvb255Jyk7XG5leHBvcnQgY29uc3QgcmltTGlnaHRpbmdNaXggPSBub2RlSW1tdXRhYmxlKFRIUkVFLlByb3BlcnR5Tm9kZSwgJ2Zsb2F0JykudG9WYXIoJ1JpbUxpZ2h0aW5nTWl4Jyk7XG5leHBvcnQgY29uc3QgcmltTXVsdGlwbHkgPSBub2RlSW1tdXRhYmxlKFRIUkVFLlByb3BlcnR5Tm9kZSwgJ3ZlYzMnKS50b1ZhcignUmltTXVsdGlwbHknKTtcbmV4cG9ydCBjb25zdCBtYXRjYXAgPSBub2RlSW1tdXRhYmxlKFRIUkVFLlByb3BlcnR5Tm9kZSwgJ3ZlYzMnKS50b1ZhcignbWF0Y2FwJyk7XG5leHBvcnQgY29uc3QgcGFyYW1ldHJpY1JpbSA9IG5vZGVJbW11dGFibGUoVEhSRUUuUHJvcGVydHlOb2RlLCAndmVjMycpLnRvVmFyKCdQYXJhbWV0cmljUmltJyk7XG4iLCAiaW1wb3J0ICogYXMgVEhSRUVfVFNMIGZyb20gJ3RocmVlL3RzbCc7XG5pbXBvcnQgKiBhcyBUSFJFRV9XRUJHUFUgZnJvbSAndGhyZWUvd2ViZ3B1JztcblxuLyoqXG4gKiBBIGNvbXBhdCBmdW5jdGlvbiBmb3IgYEZuKClgIC8gYHRzbEZuKClgLlxuICogYHRzbEZuKClgIGhhcyBiZWVuIHJlbmFtZWQgdG8gYEZuKClgIGluIHIxNjguXG4gKiBXZSBhcmUgZ29pbmcgdG8gdXNlIHRoaXMgY29tcGF0IGZvciBhIHdoaWxlLlxuICpcbiAqIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9wdWxsLzI5MDY0XG4gKi9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBGbkNvbXBhdDogdHlwZW9mIFRIUkVFX1RTTC5GbiA9IChqc0Z1bmM6IGFueSkgPT4ge1xuICAvLyBDT01QQVQgcjE2ODogYHRzbEZuKClgIGhhcyBiZWVuIHJlbmFtZWQgdG8gYEZuKClgXG4gIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9wdWxsLzI5MDY0XG4gIGNvbnN0IHRocmVlUmV2aXNpb24gPSBwYXJzZUludChUSFJFRV9XRUJHUFUuUkVWSVNJT04sIDEwKTtcbiAgaWYgKHRocmVlUmV2aXNpb24gPj0gMTY4KSB7XG4gICAgcmV0dXJuIChUSFJFRV9UU0wgYXMgYW55KS5Gbihqc0Z1bmMpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAoVEhSRUVfV0VCR1BVIGFzIGFueSkudHNsRm4oanNGdW5jKTtcbiAgfVxufTtcbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS93ZWJncHUnO1xuaW1wb3J0IHtcbiAgY2FtZXJhUHJvamVjdGlvbk1hdHJpeCxcbiAgZGlmZnVzZUNvbG9yLFxuICBmbG9hdCxcbiAgbGVuZ3RoLFxuICBtYXRjYXBVVixcbiAgbWF0ZXJpYWxOb3JtYWwsXG4gIG1peCxcbiAgbW9kZWxOb3JtYWxNYXRyaXgsXG4gIG1vZGVsVmlld01hdHJpeCxcbiAgbm9ybWFsTG9jYWwsXG4gIG5vcm1hbE1hcCxcbiAgcG9zaXRpb25Mb2NhbCxcbiAgcG9zaXRpb25WaWV3LFxuICBTaGFkZXJOb2RlT2JqZWN0LFxuICBTd2l6emFibGUsXG4gIHZlYzMsXG4gIHZlYzQsXG59IGZyb20gJ3RocmVlL3RzbCc7XG5cbmltcG9ydCB0eXBlIHsgTVRvb25NYXRlcmlhbCB9IGZyb20gJy4uL01Ub29uTWF0ZXJpYWwnO1xuaW1wb3J0IHsgTVRvb25MaWdodGluZ01vZGVsIH0gZnJvbSAnLi9NVG9vbkxpZ2h0aW5nTW9kZWwnO1xuaW1wb3J0IHtcbiAgcmltTGlnaHRpbmdNaXgsXG4gIG1hdGNhcCxcbiAgc2hhZGVDb2xvcixcbiAgc2hhZGluZ1NoaWZ0LFxuICBzaGFkaW5nVG9vbnksXG4gIHJpbU11bHRpcGx5LFxuICBwYXJhbWV0cmljUmltLFxufSBmcm9tICcuL2ltbXV0YWJsZU5vZGVzJztcbmltcG9ydCB7XG4gIHJlZkNvbG9yLFxuICByZWZFbWlzc2l2ZSxcbiAgcmVmRW1pc3NpdmVJbnRlbnNpdHksXG4gIHJlZkVtaXNzaXZlTWFwLFxuICByZWZNYXAsXG4gIHJlZk1hdGNhcEZhY3RvcixcbiAgcmVmTWF0Y2FwVGV4dHVyZSxcbiAgcmVmTm9ybWFsTWFwLFxuICByZWZOb3JtYWxTY2FsZSxcbiAgcmVmT3V0bGluZUNvbG9yRmFjdG9yLFxuICByZWZPdXRsaW5lTGlnaHRpbmdNaXhGYWN0b3IsXG4gIHJlZk91dGxpbmVXaWR0aEZhY3RvcixcbiAgcmVmT3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlLFxuICByZWZQYXJhbWV0cmljUmltQ29sb3JGYWN0b3IsXG4gIHJlZlBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJGYWN0b3IsXG4gIHJlZlBhcmFtZXRyaWNSaW1MaWZ0RmFjdG9yLFxuICByZWZSaW1MaWdodGluZ01peEZhY3RvcixcbiAgcmVmUmltTXVsdGlwbHlUZXh0dXJlLFxuICByZWZTaGFkZUNvbG9yRmFjdG9yLFxuICByZWZTaGFkZU11bHRpcGx5VGV4dHVyZSxcbiAgcmVmU2hhZGVNdWx0aXBseVRleHR1cmVTY2FsZSxcbiAgcmVmU2hhZGluZ1NoaWZ0RmFjdG9yLFxuICByZWZTaGFkaW5nVG9vbnlGYWN0b3IsXG59IGZyb20gJy4vbWF0ZXJpYWxSZWZlcmVuY2VzJztcbmltcG9ydCB7IE1Ub29uQW5pbWF0ZWRVVk5vZGUgfSBmcm9tICcuL01Ub29uQW5pbWF0ZWRVVk5vZGUnO1xuaW1wb3J0IHsgTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUgfSBmcm9tICcuLi9NVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZSc7XG5pbXBvcnQgeyBNVG9vbk5vZGVNYXRlcmlhbFBhcmFtZXRlcnMgfSBmcm9tICcuL01Ub29uTm9kZU1hdGVyaWFsUGFyYW1ldGVycyc7XG5pbXBvcnQgeyBtdG9vblBhcmFtZXRyaWNSaW0gfSBmcm9tICcuL210b29uUGFyYW1ldHJpY1JpbSc7XG5cbi8qKlxuICogTVRvb24gaXMgYSBtYXRlcmlhbCBzcGVjaWZpY2F0aW9uIHRoYXQgaGFzIHZhcmlvdXMgZmVhdHVyZXMuXG4gKiBUaGUgc3BlYyBhbmQgaW1wbGVtZW50YXRpb24gYXJlIG9yaWdpbmFsbHkgZm91bmRlZCBmb3IgVW5pdHkgZW5naW5lIGFuZCB0aGlzIGlzIGEgcG9ydCBvZiB0aGUgbWF0ZXJpYWwuXG4gKlxuICogVGhpcyBtYXRlcmlhbCBpcyBhIE5vZGVNYXRlcmlhbCB2YXJpYW50IG9mIHtAbGluayBNVG9vbk1hdGVyaWFsfS5cbiAqXG4gKiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9TYW50YXJoL01Ub29uXG4gKi9cbmV4cG9ydCBjbGFzcyBNVG9vbk5vZGVNYXRlcmlhbCBleHRlbmRzIFRIUkVFLk5vZGVNYXRlcmlhbCB7XG4gIHB1YmxpYyBlbWlzc2l2ZU5vZGU6IFNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT4gfCBudWxsO1xuXG4gIHB1YmxpYyBjb2xvcjogVEhSRUUuQ29sb3I7XG4gIHB1YmxpYyBtYXA6IFRIUkVFLlRleHR1cmUgfCBudWxsO1xuICBwdWJsaWMgZW1pc3NpdmU6IFRIUkVFLkNvbG9yO1xuICBwdWJsaWMgZW1pc3NpdmVJbnRlbnNpdHk6IG51bWJlcjtcbiAgcHVibGljIGVtaXNzaXZlTWFwOiBUSFJFRS5UZXh0dXJlIHwgbnVsbDtcbiAgcHVibGljIG5vcm1hbE1hcDogVEhSRUUuVGV4dHVyZSB8IG51bGw7XG4gIHB1YmxpYyBub3JtYWxTY2FsZTogVEhSRUUuVmVjdG9yMjtcblxuICBwdWJsaWMgc2hhZGVDb2xvckZhY3RvcjogVEhSRUUuQ29sb3I7XG4gIHB1YmxpYyBzaGFkZU11bHRpcGx5VGV4dHVyZTogVEhSRUUuVGV4dHVyZSB8IG51bGw7XG4gIHB1YmxpYyBzaGFkaW5nU2hpZnRGYWN0b3I6IG51bWJlcjtcbiAgcHVibGljIHNoYWRpbmdTaGlmdFRleHR1cmU6IFRIUkVFLlRleHR1cmUgfCBudWxsO1xuICBwdWJsaWMgc2hhZGluZ1NoaWZ0VGV4dHVyZVNjYWxlOiBudW1iZXI7XG4gIHB1YmxpYyBzaGFkaW5nVG9vbnlGYWN0b3I6IG51bWJlcjtcbiAgcHVibGljIHJpbUxpZ2h0aW5nTWl4RmFjdG9yOiBudW1iZXI7XG4gIHB1YmxpYyByaW1NdWx0aXBseVRleHR1cmU6IFRIUkVFLlRleHR1cmUgfCBudWxsO1xuICBwdWJsaWMgbWF0Y2FwRmFjdG9yOiBUSFJFRS5Db2xvcjtcbiAgcHVibGljIG1hdGNhcFRleHR1cmU6IFRIUkVFLlRleHR1cmUgfCBudWxsO1xuICBwdWJsaWMgcGFyYW1ldHJpY1JpbUNvbG9yRmFjdG9yOiBUSFJFRS5Db2xvcjtcbiAgcHVibGljIHBhcmFtZXRyaWNSaW1MaWZ0RmFjdG9yOiBudW1iZXI7XG4gIHB1YmxpYyBwYXJhbWV0cmljUmltRnJlc25lbFBvd2VyRmFjdG9yOiBudW1iZXI7XG4gIHB1YmxpYyBvdXRsaW5lV2lkdGhNb2RlOiBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZTtcbiAgcHVibGljIG91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZTogVEhSRUUuVGV4dHVyZSB8IG51bGw7XG4gIHB1YmxpYyBvdXRsaW5lV2lkdGhGYWN0b3I6IG51bWJlcjtcbiAgcHVibGljIG91dGxpbmVDb2xvckZhY3RvcjogVEhSRUUuQ29sb3I7XG4gIHB1YmxpYyBvdXRsaW5lTGlnaHRpbmdNaXhGYWN0b3I6IG51bWJlcjtcbiAgcHVibGljIHV2QW5pbWF0aW9uU2Nyb2xsWFNwZWVkRmFjdG9yOiBudW1iZXI7XG4gIHB1YmxpYyB1dkFuaW1hdGlvblNjcm9sbFlTcGVlZEZhY3RvcjogbnVtYmVyO1xuICBwdWJsaWMgdXZBbmltYXRpb25Sb3RhdGlvblNwZWVkRmFjdG9yOiBudW1iZXI7XG4gIHB1YmxpYyB1dkFuaW1hdGlvbk1hc2tUZXh0dXJlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbDtcblxuICBwdWJsaWMgc2hhZGVDb2xvck5vZGU6IFN3aXp6YWJsZSB8IG51bGw7XG4gIHB1YmxpYyBzaGFkaW5nU2hpZnROb2RlOiBUSFJFRS5Ob2RlIHwgbnVsbDtcbiAgcHVibGljIHNoYWRpbmdUb29ueU5vZGU6IFRIUkVFLk5vZGUgfCBudWxsO1xuICBwdWJsaWMgcmltTGlnaHRpbmdNaXhOb2RlOiBUSFJFRS5Ob2RlIHwgbnVsbDtcbiAgcHVibGljIHJpbU11bHRpcGx5Tm9kZTogVEhSRUUuTm9kZSB8IG51bGw7XG4gIHB1YmxpYyBtYXRjYXBOb2RlOiBUSFJFRS5Ob2RlIHwgbnVsbDtcbiAgcHVibGljIHBhcmFtZXRyaWNSaW1Db2xvck5vZGU6IFN3aXp6YWJsZSB8IG51bGw7XG4gIHB1YmxpYyBwYXJhbWV0cmljUmltTGlmdE5vZGU6IFRIUkVFLk5vZGUgfCBudWxsO1xuICBwdWJsaWMgcGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlck5vZGU6IFRIUkVFLk5vZGUgfCBudWxsO1xuXG4gIHB1YmxpYyB1dkFuaW1hdGlvblNjcm9sbFhPZmZzZXQ6IG51bWJlcjtcbiAgcHVibGljIHV2QW5pbWF0aW9uU2Nyb2xsWU9mZnNldDogbnVtYmVyO1xuICBwdWJsaWMgdXZBbmltYXRpb25Sb3RhdGlvblBoYXNlOiBudW1iZXI7XG5cbiAgcHVibGljIGlzT3V0bGluZTogYm9vbGVhbjtcblxuICBwcml2YXRlIF9hbmltYXRlZFVWTm9kZTogTVRvb25BbmltYXRlZFVWTm9kZSB8IG51bGw7XG5cbiAgcHVibGljIGN1c3RvbVByb2dyYW1DYWNoZUtleSgpOiBzdHJpbmcge1xuICAgIGxldCBjYWNoZUtleSA9IHN1cGVyLmN1c3RvbVByb2dyYW1DYWNoZUtleSgpO1xuXG4gICAgY2FjaGVLZXkgKz0gYGlzT3V0bGluZToke3RoaXMuaXNPdXRsaW5lfSxgO1xuXG4gICAgcmV0dXJuIGNhY2hlS2V5O1xuICB9XG5cbiAgLyoqXG4gICAqIFJlYWRvbmx5IGJvb2xlYW4gdGhhdCBpbmRpY2F0ZXMgdGhpcyBpcyBhIHtAbGluayBNVG9vbk5vZGVNYXRlcmlhbH0uXG4gICAqL1xuICBwdWJsaWMgZ2V0IGlzTVRvb25Ob2RlTWF0ZXJpYWwoKTogdHJ1ZSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwdWJsaWMgY29uc3RydWN0b3IocGFyYW1ldGVyczogTVRvb25Ob2RlTWF0ZXJpYWxQYXJhbWV0ZXJzID0ge30pIHtcbiAgICBzdXBlcigpO1xuXG4gICAgaWYgKHBhcmFtZXRlcnMudHJhbnNwYXJlbnRXaXRoWldyaXRlKSB7XG4gICAgICBwYXJhbWV0ZXJzLmRlcHRoV3JpdGUgPSB0cnVlO1xuICAgIH1cbiAgICBkZWxldGUgcGFyYW1ldGVycy50cmFuc3BhcmVudFdpdGhaV3JpdGU7XG5cbiAgICAvLyBgTVRvb25NYXRlcmlhbExvYWRlclBsdWdpbmAgYXNzaWducyB0aGVzZSBwYXJhbWV0ZXJzIHRvIHRoZSBtYXRlcmlhbFxuICAgIC8vIEhvd2V2ZXIsIGBNVG9vbk5vZGVNYXRlcmlhbGAgZG9lcyBub3Qgc3VwcG9ydCB0aGVzZSBwYXJhbWV0ZXJzXG4gICAgLy8gc28gd2UgZGVsZXRlIHRoZW0gaGVyZSB0byBzdXBwcmVzcyB3YXJuaW5nc1xuICAgIGRlbGV0ZSAocGFyYW1ldGVycyBhcyBhbnkpLmdpRXF1YWxpemF0aW9uRmFjdG9yO1xuICAgIGRlbGV0ZSAocGFyYW1ldGVycyBhcyBhbnkpLnYwQ29tcGF0U2hhZGU7XG4gICAgZGVsZXRlIChwYXJhbWV0ZXJzIGFzIGFueSkuZGVidWdNb2RlO1xuXG4gICAgdGhpcy5lbWlzc2l2ZU5vZGUgPSBudWxsO1xuXG4gICAgdGhpcy5saWdodHMgPSB0cnVlO1xuXG4gICAgdGhpcy5jb2xvciA9IG5ldyBUSFJFRS5Db2xvcigxLjAsIDEuMCwgMS4wKTtcbiAgICB0aGlzLm1hcCA9IG51bGw7XG4gICAgdGhpcy5lbWlzc2l2ZSA9IG5ldyBUSFJFRS5Db2xvcigwLjAsIDAuMCwgMC4wKTtcbiAgICB0aGlzLmVtaXNzaXZlSW50ZW5zaXR5ID0gMS4wO1xuICAgIHRoaXMuZW1pc3NpdmVNYXAgPSBudWxsO1xuICAgIHRoaXMubm9ybWFsTWFwID0gbnVsbDtcbiAgICB0aGlzLm5vcm1hbFNjYWxlID0gbmV3IFRIUkVFLlZlY3RvcjIoMS4wLCAxLjApO1xuICAgIHRoaXMuc2hhZGVDb2xvckZhY3RvciA9IG5ldyBUSFJFRS5Db2xvcigwLjAsIDAuMCwgMC4wKTtcbiAgICB0aGlzLnNoYWRlTXVsdGlwbHlUZXh0dXJlID0gbnVsbDtcbiAgICB0aGlzLnNoYWRpbmdTaGlmdEZhY3RvciA9IDAuMDtcbiAgICB0aGlzLnNoYWRpbmdTaGlmdFRleHR1cmUgPSBudWxsO1xuICAgIHRoaXMuc2hhZGluZ1NoaWZ0VGV4dHVyZVNjYWxlID0gMS4wO1xuICAgIHRoaXMuc2hhZGluZ1Rvb255RmFjdG9yID0gMC45O1xuICAgIHRoaXMucmltTGlnaHRpbmdNaXhGYWN0b3IgPSAxLjA7XG4gICAgdGhpcy5yaW1NdWx0aXBseVRleHR1cmUgPSBudWxsO1xuICAgIHRoaXMubWF0Y2FwRmFjdG9yID0gbmV3IFRIUkVFLkNvbG9yKDEuMCwgMS4wLCAxLjApO1xuICAgIHRoaXMubWF0Y2FwVGV4dHVyZSA9IG51bGw7XG4gICAgdGhpcy5wYXJhbWV0cmljUmltQ29sb3JGYWN0b3IgPSBuZXcgVEhSRUUuQ29sb3IoMC4wLCAwLjAsIDAuMCk7XG4gICAgdGhpcy5wYXJhbWV0cmljUmltTGlmdEZhY3RvciA9IDAuMDtcbiAgICB0aGlzLnBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJGYWN0b3IgPSA1LjA7XG4gICAgdGhpcy5vdXRsaW5lV2lkdGhNb2RlID0gTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUuTm9uZTtcbiAgICB0aGlzLm91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZSA9IG51bGw7XG4gICAgdGhpcy5vdXRsaW5lV2lkdGhGYWN0b3IgPSAwLjA7XG4gICAgdGhpcy5vdXRsaW5lQ29sb3JGYWN0b3IgPSBuZXcgVEhSRUUuQ29sb3IoMC4wLCAwLjAsIDAuMCk7XG4gICAgdGhpcy5vdXRsaW5lTGlnaHRpbmdNaXhGYWN0b3IgPSAxLjA7XG4gICAgdGhpcy51dkFuaW1hdGlvblNjcm9sbFhTcGVlZEZhY3RvciA9IDAuMDtcbiAgICB0aGlzLnV2QW5pbWF0aW9uU2Nyb2xsWVNwZWVkRmFjdG9yID0gMC4wO1xuICAgIHRoaXMudXZBbmltYXRpb25Sb3RhdGlvblNwZWVkRmFjdG9yID0gMC4wO1xuICAgIHRoaXMudXZBbmltYXRpb25NYXNrVGV4dHVyZSA9IG51bGw7XG5cbiAgICB0aGlzLnNoYWRlQ29sb3JOb2RlID0gbnVsbDtcbiAgICB0aGlzLnNoYWRpbmdTaGlmdE5vZGUgPSBudWxsO1xuICAgIHRoaXMuc2hhZGluZ1Rvb255Tm9kZSA9IG51bGw7XG4gICAgdGhpcy5yaW1MaWdodGluZ01peE5vZGUgPSBudWxsO1xuICAgIHRoaXMucmltTXVsdGlwbHlOb2RlID0gbnVsbDtcbiAgICB0aGlzLm1hdGNhcE5vZGUgPSBudWxsO1xuICAgIHRoaXMucGFyYW1ldHJpY1JpbUNvbG9yTm9kZSA9IG51bGw7XG4gICAgdGhpcy5wYXJhbWV0cmljUmltTGlmdE5vZGUgPSBudWxsO1xuICAgIHRoaXMucGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlck5vZGUgPSBudWxsO1xuXG4gICAgdGhpcy51dkFuaW1hdGlvblNjcm9sbFhPZmZzZXQgPSAwLjA7XG4gICAgdGhpcy51dkFuaW1hdGlvblNjcm9sbFlPZmZzZXQgPSAwLjA7XG4gICAgdGhpcy51dkFuaW1hdGlvblJvdGF0aW9uUGhhc2UgPSAwLjA7XG5cbiAgICB0aGlzLmlzT3V0bGluZSA9IGZhbHNlO1xuXG4gICAgdGhpcy5fYW5pbWF0ZWRVVk5vZGUgPSBudWxsO1xuXG4gICAgdGhpcy5zZXRWYWx1ZXMocGFyYW1ldGVycyk7XG4gIH1cblxuICBwdWJsaWMgc2V0dXBMaWdodGluZ01vZGVsKC8qYnVpbGRlciovKTogTVRvb25MaWdodGluZ01vZGVsIHtcbiAgICByZXR1cm4gbmV3IE1Ub29uTGlnaHRpbmdNb2RlbCgpO1xuICB9XG5cbiAgcHVibGljIHNldHVwKGJ1aWxkZXI6IFRIUkVFLk5vZGVCdWlsZGVyKTogdm9pZCB7XG4gICAgdGhpcy5fYW5pbWF0ZWRVVk5vZGUgPSBuZXcgTVRvb25BbmltYXRlZFVWTm9kZShcbiAgICAgICh0aGlzLnV2QW5pbWF0aW9uTWFza1RleHR1cmUgJiYgdGhpcy51dkFuaW1hdGlvbk1hc2tUZXh0dXJlLmlzVGV4dHVyZSA9PT0gdHJ1ZSkgPz8gZmFsc2UsXG4gICAgKTtcblxuICAgIHN1cGVyLnNldHVwKGJ1aWxkZXIpO1xuICB9XG5cbiAgcHVibGljIHNldHVwRGlmZnVzZUNvbG9yKGJ1aWxkZXI6IFRIUkVFLk5vZGVCdWlsZGVyKTogdm9pZCB7XG4gICAgLy8gd2UgbXVzdCBhcHBseSB1diBzY3JvbGwgdG8gdGhlIG1hcFxuICAgIC8vIHRoaXMuY29sb3JOb2RlIHdpbGwgYmUgdXNlZCBpbiBzdXBlci5zZXR1cERpZmZ1c2VDb2xvcigpIHNvIHdlIHRlbXBvcmFyaWx5IHJlcGxhY2UgaXRcbiAgICBsZXQgdGVtcENvbG9yTm9kZTogU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPiB8IG51bGwgPSBudWxsO1xuXG4gICAgaWYgKHRoaXMuY29sb3JOb2RlID09IG51bGwpIHtcbiAgICAgIHRlbXBDb2xvck5vZGUgPSByZWZDb2xvcjtcblxuICAgICAgaWYgKHRoaXMubWFwICYmIHRoaXMubWFwLmlzVGV4dHVyZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBtYXAgPSByZWZNYXAuY29udGV4dCh7IGdldFVWOiAoKSA9PiB0aGlzLl9hbmltYXRlZFVWTm9kZSB9KTtcbiAgICAgICAgdGVtcENvbG9yTm9kZSA9IHRlbXBDb2xvck5vZGUubXVsKG1hcCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY29sb3JOb2RlID0gdGVtcENvbG9yTm9kZTtcbiAgICB9XG5cbiAgICAvLyBNVG9vbiBtdXN0IGlnbm9yZSB2ZXJ0ZXggY29sb3IgYnkgc3BlY1xuICAgIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL3ZybS1jL3ZybS1zcGVjaWZpY2F0aW9uL2Jsb2IvNDJjMGE5MGU2YjRiNzEwMzUyNTY5OTc4ZjE0OTgwZTlmYzk0YjI1ZC9zcGVjaWZpY2F0aW9uL1ZSTUNfbWF0ZXJpYWxzX210b29uLTEuMC9SRUFETUUubWQjdmVydGV4LWNvbG9yc1xuICAgIGlmICh0aGlzLnZlcnRleENvbG9ycyA9PT0gdHJ1ZSAmJiBidWlsZGVyLmdlb21ldHJ5Lmhhc0F0dHJpYnV0ZSgnY29sb3InKSkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAnTVRvb25Ob2RlTWF0ZXJpYWw6IE1Ub29uIGlnbm9yZXMgdmVydGV4IGNvbG9ycy4gQ29uc2lkZXIgdXNpbmcgYSBtb2RlbCB3aXRob3V0IHZlcnRleCBjb2xvcnMgaW5zdGVhZC4nLFxuICAgICAgKTtcbiAgICAgIHRoaXMudmVydGV4Q29sb3JzID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gdGhlIG9yZGluYXJ5IGRpZmZ1c2VDb2xvciBzZXR1cFxuICAgIHN1cGVyLnNldHVwRGlmZnVzZUNvbG9yKGJ1aWxkZXIpO1xuXG4gICAgLy8gQ09NUEFUOiBwcmUtcjE2NlxuICAgIC8vIFNldCBhbHBoYSB0byAxIGlmIGl0IGlzIG9wYXF1ZVxuICAgIC8vIEFkZHJlc3NlZCBpbiBUaHJlZS5qcyByMTY2IGJ1dCB3ZSBsZWF2ZSBpdCBoZXJlIGZvciBjb21wYXRpYmlsaXR5XG4gICAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vbXJkb29iL3RocmVlLmpzL3B1bGwvMjg2NDZcbiAgICBpZiAocGFyc2VJbnQoVEhSRUUuUkVWSVNJT04sIDEwKSA8IDE2Nikge1xuICAgICAgaWYgKHRoaXMudHJhbnNwYXJlbnQgPT09IGZhbHNlICYmIHRoaXMuYmxlbmRpbmcgPT09IFRIUkVFLk5vcm1hbEJsZW5kaW5nICYmIHRoaXMuYWxwaGFUb0NvdmVyYWdlID09PSBmYWxzZSkge1xuICAgICAgICBkaWZmdXNlQ29sb3IuYS5hc3NpZ24oMS4wKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyByZXZlcnQgdGhlIGNvbG9yTm9kZVxuICAgIGlmICh0aGlzLmNvbG9yTm9kZSA9PT0gdGVtcENvbG9yTm9kZSkge1xuICAgICAgdGhpcy5jb2xvck5vZGUgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXR1cFZhcmlhbnRzKCk6IHZvaWQge1xuICAgIHNoYWRlQ29sb3IuYXNzaWduKHRoaXMuX3NldHVwU2hhZGVDb2xvck5vZGUoKSk7XG4gICAgc2hhZGluZ1NoaWZ0LmFzc2lnbih0aGlzLl9zZXR1cFNoYWRpbmdTaGlmdE5vZGUoKSk7XG4gICAgc2hhZGluZ1Rvb255LmFzc2lnbih0aGlzLl9zZXR1cFNoYWRpbmdUb29ueU5vZGUoKSk7XG4gICAgcmltTGlnaHRpbmdNaXguYXNzaWduKHRoaXMuX3NldHVwUmltTGlnaHRpbmdNaXhOb2RlKCkpO1xuICAgIHJpbU11bHRpcGx5LmFzc2lnbih0aGlzLl9zZXR1cFJpbU11bHRpcGx5Tm9kZSgpKTtcbiAgICBtYXRjYXAuYXNzaWduKHRoaXMuX3NldHVwTWF0Y2FwTm9kZSgpKTtcbiAgICBwYXJhbWV0cmljUmltLmFzc2lnbih0aGlzLl9zZXR1cFBhcmFtZXRyaWNSaW1Ob2RlKCkpO1xuICB9XG5cbiAgcHVibGljIHNldHVwTm9ybWFsKGJ1aWxkZXI6IFRIUkVFLk5vZGVCdWlsZGVyKTogU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPiB7XG4gICAgLy8gd2UgbXVzdCBhcHBseSB1diBzY3JvbGwgdG8gdGhlIG5vcm1hbE1hcFxuICAgIC8vIHRoaXMubm9ybWFsTm9kZSB3aWxsIGJlIHVzZWQgaW4gc3VwZXIuc2V0dXBOb3JtYWwoKSBzbyB3ZSB0ZW1wb3JhcmlseSByZXBsYWNlIGl0XG4gICAgY29uc3QgdGVtcE5vcm1hbE5vZGUgPSB0aGlzLm5vcm1hbE5vZGU7XG5cbiAgICBpZiAodGhpcy5ub3JtYWxOb2RlID09IG51bGwpIHtcbiAgICAgIHRoaXMubm9ybWFsTm9kZSA9IG1hdGVyaWFsTm9ybWFsO1xuXG4gICAgICBpZiAodGhpcy5ub3JtYWxNYXAgJiYgdGhpcy5ub3JtYWxNYXAuaXNUZXh0dXJlID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IG1hcCA9IHJlZk5vcm1hbE1hcC5jb250ZXh0KHsgZ2V0VVY6ICgpID0+IHRoaXMuX2FuaW1hdGVkVVZOb2RlIH0pO1xuICAgICAgICB0aGlzLm5vcm1hbE5vZGUgPSBub3JtYWxNYXAobWFwLCByZWZOb3JtYWxTY2FsZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmlzT3V0bGluZSkge1xuICAgICAgICAvLyBTZWUgYWJvdXQgdGhlIHR5cGUgYXNzZXJ0aW9uOiBodHRwczovL2dpdGh1Yi5jb20vdGhyZWUtdHlwZXMvdGhyZWUtdHMtdHlwZXMvcHVsbC8xMTIzXG4gICAgICAgIHRoaXMubm9ybWFsTm9kZSA9ICh0aGlzLm5vcm1hbE5vZGUgYXMgU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPikubmVnYXRlKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ09NUEFUIHIxNjg6IGBzZXR1cE5vcm1hbGAgbm93IHJldHVybnMgdGhlIG5vcm1hbCBub2RlXG4gICAgLy8gaW5zdGVhZCBvZiBhc3NpZ25pbmcgaW5zaWRlIHRoZSBgc3VwZXIuc2V0dXBOb3JtYWxgXG4gICAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vbXJkb29iL3RocmVlLmpzL3B1bGwvMjkxMzdcbiAgICBjb25zdCB0aHJlZVJldmlzaW9uID0gcGFyc2VJbnQoVEhSRUUuUkVWSVNJT04sIDEwKTtcbiAgICBpZiAodGhyZWVSZXZpc2lvbiA+PSAxNjgpIHtcbiAgICAgIGNvbnN0IHJldCA9IHRoaXMubm9ybWFsTm9kZSBhcyBTaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+O1xuXG4gICAgICAvLyByZXZlcnQgdGhlIG5vcm1hbE5vZGVcbiAgICAgIHRoaXMubm9ybWFsTm9kZSA9IHRlbXBOb3JtYWxOb2RlO1xuXG4gICAgICByZXR1cm4gcmV0O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBwcmUtcjE2OFxuICAgICAgLy8gdGhlIG9yZGluYXJ5IG5vcm1hbCBzZXR1cFxuICAgICAgc3VwZXIuc2V0dXBOb3JtYWwoYnVpbGRlcik7XG5cbiAgICAgIC8vIHJldmVydCB0aGUgbm9ybWFsTm9kZVxuICAgICAgdGhpcy5ub3JtYWxOb2RlID0gdGVtcE5vcm1hbE5vZGU7XG5cbiAgICAgIC8vIHR5cGUgd29ya2Fyb3VuZDogcHJldGVuZCB0byByZXR1cm4gYSB2YWxpZCB2YWx1ZVxuICAgICAgLy8gcjE2NyBkb2Vzbid0IHVzZSB0aGUgcmV0dXJuIHZhbHVlIGFueXdheVxuICAgICAgcmV0dXJuIHVuZGVmaW5lZCBhcyBhbnk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldHVwTGlnaHRpbmcoYnVpbGRlcjogVEhSRUUuTm9kZUJ1aWxkZXIpOiBUSFJFRS5Ob2RlIHtcbiAgICAvLyB3ZSBtdXN0IGFwcGx5IHV2IHNjcm9sbCB0byB0aGUgZW1pc3NpdmVNYXBcbiAgICAvLyB0aGlzLmVtaXNzaXZlTm9kZSB3aWxsIGJlIHVzZWQgaW4gc3VwZXIuc2V0dXBMaWdodGluZygpIHNvIHdlIHRlbXBvcmFyaWx5IHJlcGxhY2UgaXRcbiAgICBsZXQgdGVtcEVtaXNzaXZlTm9kZTogU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPiB8IG51bGwgPSBudWxsO1xuXG4gICAgaWYgKHRoaXMuZW1pc3NpdmVOb2RlID09IG51bGwpIHtcbiAgICAgIHRlbXBFbWlzc2l2ZU5vZGUgPSByZWZFbWlzc2l2ZS5tdWwocmVmRW1pc3NpdmVJbnRlbnNpdHkpO1xuXG4gICAgICBpZiAodGhpcy5lbWlzc2l2ZU1hcCAmJiB0aGlzLmVtaXNzaXZlTWFwLmlzVGV4dHVyZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBtYXAgPSByZWZFbWlzc2l2ZU1hcC5jb250ZXh0KHsgZ2V0VVY6ICgpID0+IHRoaXMuX2FuaW1hdGVkVVZOb2RlIH0pO1xuICAgICAgICB0ZW1wRW1pc3NpdmVOb2RlID0gdGVtcEVtaXNzaXZlTm9kZS5tdWwobWFwKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5lbWlzc2l2ZU5vZGUgPSB0ZW1wRW1pc3NpdmVOb2RlO1xuICAgIH1cblxuICAgIC8vIHRoZSBvcmRpbmFyeSBsaWdodGluZyBzZXR1cFxuICAgIGNvbnN0IHJldCA9IHN1cGVyLnNldHVwTGlnaHRpbmcoYnVpbGRlcik7XG5cbiAgICAvLyByZXZlcnQgdGhlIGVtaXNzaXZlTm9kZVxuICAgIGlmICh0aGlzLmVtaXNzaXZlTm9kZSA9PT0gdGVtcEVtaXNzaXZlTm9kZSkge1xuICAgICAgdGhpcy5lbWlzc2l2ZU5vZGUgPSBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICBwdWJsaWMgc2V0dXBPdXRwdXQoXG4gICAgYnVpbGRlcjogVEhSRUUuTm9kZUJ1aWxkZXIsXG4gICAgb3V0cHV0Tm9kZTogU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPixcbiAgKTogU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPiB7XG4gICAgLy8gbWl4IG9yIHNldCBvdXRsaW5lIGNvbG9yXG4gICAgaWYgKHRoaXMuaXNPdXRsaW5lICYmIHRoaXMub3V0bGluZVdpZHRoTW9kZSAhPT0gTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUuTm9uZSkge1xuICAgICAgb3V0cHV0Tm9kZSA9IHZlYzQoXG4gICAgICAgIG1peChyZWZPdXRsaW5lQ29sb3JGYWN0b3IsIG91dHB1dE5vZGUueHl6Lm11bChyZWZPdXRsaW5lQ29sb3JGYWN0b3IpLCByZWZPdXRsaW5lTGlnaHRpbmdNaXhGYWN0b3IpLFxuICAgICAgICBvdXRwdXROb2RlLncsXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIHRoZSBvcmRpbmFyeSBvdXRwdXQgc2V0dXBcbiAgICByZXR1cm4gc3VwZXIuc2V0dXBPdXRwdXQoYnVpbGRlciwgb3V0cHV0Tm9kZSkgYXMgU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPjtcbiAgfVxuXG4gIHB1YmxpYyBzZXR1cFBvc2l0aW9uKGJ1aWxkZXI6IFRIUkVFLk5vZGVCdWlsZGVyKTogU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPiB7XG4gICAgLy8gd2UgbXVzdCBhcHBseSBvdXRsaW5lIHBvc2l0aW9uIG9mZnNldFxuICAgIC8vIHRoaXMucG9zaXRpb25Ob2RlIHdpbGwgYmUgdXNlZCBpbiBzdXBlci5zZXR1cFBvc2l0aW9uKCkgc28gd2UgdGVtcG9yYXJpbHkgcmVwbGFjZSBpdFxuICAgIGNvbnN0IHRlbXBQb3NpdGlvbk5vZGUgPSB0aGlzLnBvc2l0aW9uTm9kZTtcblxuICAgIGlmICh0aGlzLmlzT3V0bGluZSAmJiB0aGlzLm91dGxpbmVXaWR0aE1vZGUgIT09IE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlLk5vbmUpIHtcbiAgICAgIHRoaXMucG9zaXRpb25Ob2RlID8/PSBwb3NpdGlvbkxvY2FsO1xuXG4gICAgICBjb25zdCBub3JtYWxMb2NhbE5vcm1hbGl6ZWQgPSBub3JtYWxMb2NhbC5ub3JtYWxpemUoKTtcblxuICAgICAgbGV0IHdpZHRoOiBTaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+ID0gcmVmT3V0bGluZVdpZHRoRmFjdG9yO1xuXG4gICAgICBpZiAodGhpcy5vdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmUgJiYgdGhpcy5vdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmUuaXNUZXh0dXJlID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IG1hcCA9IHJlZk91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZS5jb250ZXh0KHsgZ2V0VVY6ICgpID0+IHRoaXMuX2FuaW1hdGVkVVZOb2RlIH0pO1xuICAgICAgICB3aWR0aCA9IHdpZHRoLm11bChtYXApO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB3b3JsZE5vcm1hbExlbmd0aCA9IGxlbmd0aChtb2RlbE5vcm1hbE1hdHJpeC5tdWwobm9ybWFsTG9jYWxOb3JtYWxpemVkKSk7XG4gICAgICBjb25zdCBvdXRsaW5lT2Zmc2V0ID0gd2lkdGgubXVsKHdvcmxkTm9ybWFsTGVuZ3RoKS5tdWwobm9ybWFsTG9jYWxOb3JtYWxpemVkKTtcblxuICAgICAgaWYgKHRoaXMub3V0bGluZVdpZHRoTW9kZSA9PT0gTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUuV29ybGRDb29yZGluYXRlcykge1xuICAgICAgICAvLyBTZWUgYWJvdXQgdGhlIHR5cGUgYXNzZXJ0aW9uOiBodHRwczovL2dpdGh1Yi5jb20vdGhyZWUtdHlwZXMvdGhyZWUtdHMtdHlwZXMvcHVsbC8xMTIzXG4gICAgICAgIHRoaXMucG9zaXRpb25Ob2RlID0gKHRoaXMucG9zaXRpb25Ob2RlIGFzIFNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT4pLmFkZChvdXRsaW5lT2Zmc2V0KTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5vdXRsaW5lV2lkdGhNb2RlID09PSBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZS5TY3JlZW5Db29yZGluYXRlcykge1xuICAgICAgICBjb25zdCBjbGlwU2NhbGUgPSBjYW1lcmFQcm9qZWN0aW9uTWF0cml4LmVsZW1lbnQoMSkuZWxlbWVudCgxKTtcblxuICAgICAgICAvLyBXZSBjYW4ndCB1c2UgYHBvc2l0aW9uVmlld2AgaW4gYHNldHVwUG9zaXRpb25gXG4gICAgICAgIC8vIGJlY2F1c2UgdXNpbmcgYHBvc2l0aW9uVmlld2AgaGVyZSB3aWxsIG1ha2UgaXQgY2FsY3VsYXRlIHRoZSBgcG9zaXRpb25WaWV3YCBlYXJsaWVyXG4gICAgICAgIC8vIGFuZCBpdCB3b24ndCBiZSBjYWxjdWxhdGVkIGFnYWluIGFmdGVyIHNldHRpbmcgdGhlIGBwb3NpdGlvbk5vZGVgXG4gICAgICAgIGNvbnN0IHRlbXBQb3NpdGlvblZpZXcgPSBtb2RlbFZpZXdNYXRyaXgubXVsKHBvc2l0aW9uTG9jYWwpO1xuXG4gICAgICAgIC8vIFNlZSBhYm91dCB0aGUgdHlwZSBhc3NlcnRpb246IGh0dHBzOi8vZ2l0aHViLmNvbS90aHJlZS10eXBlcy90aHJlZS10cy10eXBlcy9wdWxsLzExMjNcbiAgICAgICAgdGhpcy5wb3NpdGlvbk5vZGUgPSAodGhpcy5wb3NpdGlvbk5vZGUgYXMgU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPikuYWRkKFxuICAgICAgICAgIG91dGxpbmVPZmZzZXQuZGl2KGNsaXBTY2FsZSkubXVsKHRlbXBQb3NpdGlvblZpZXcuei5uZWdhdGUoKSksXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucG9zaXRpb25Ob2RlID8/PSBwb3NpdGlvbkxvY2FsO1xuICAgIH1cblxuICAgIC8vIHRoZSBvcmRpbmFyeSBwb3NpdGlvbiBzZXR1cFxuICAgIGNvbnN0IHJldCA9IHN1cGVyLnNldHVwUG9zaXRpb24oYnVpbGRlcikgYXMgU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPjtcblxuICAgIC8vIGFudGkgei1maWdodGluZ1xuICAgIC8vIFRPRE86IFdlIG1pZ2h0IHdhbnQgdG8gYWRkcmVzcyB0aGlzIHZpYSBnbFBvbHlnb25PZmZzZXQgaW5zdGVhZD9cbiAgICByZXQuei5hZGQocmV0LncubXVsKDFlLTYpKTtcblxuICAgIC8vIHJldmVydCB0aGUgcG9zaXRpb25Ob2RlXG4gICAgdGhpcy5wb3NpdGlvbk5vZGUgPSB0ZW1wUG9zaXRpb25Ob2RlO1xuXG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIHB1YmxpYyBjb3B5KHNvdXJjZTogTVRvb25Ob2RlTWF0ZXJpYWwpOiB0aGlzIHtcbiAgICB0aGlzLmNvbG9yLmNvcHkoc291cmNlLmNvbG9yKTtcbiAgICB0aGlzLm1hcCA9IHNvdXJjZS5tYXAgPz8gbnVsbDtcbiAgICB0aGlzLmVtaXNzaXZlLmNvcHkoc291cmNlLmVtaXNzaXZlKTtcbiAgICB0aGlzLmVtaXNzaXZlSW50ZW5zaXR5ID0gc291cmNlLmVtaXNzaXZlSW50ZW5zaXR5O1xuICAgIHRoaXMuZW1pc3NpdmVNYXAgPSBzb3VyY2UuZW1pc3NpdmVNYXAgPz8gbnVsbDtcbiAgICB0aGlzLm5vcm1hbE1hcCA9IHNvdXJjZS5ub3JtYWxNYXAgPz8gbnVsbDtcbiAgICB0aGlzLm5vcm1hbFNjYWxlLmNvcHkoc291cmNlLm5vcm1hbFNjYWxlKTtcblxuICAgIHRoaXMuc2hhZGVDb2xvckZhY3Rvci5jb3B5KHNvdXJjZS5zaGFkZUNvbG9yRmFjdG9yKTtcbiAgICB0aGlzLnNoYWRlTXVsdGlwbHlUZXh0dXJlID0gc291cmNlLnNoYWRlTXVsdGlwbHlUZXh0dXJlID8/IG51bGw7XG4gICAgdGhpcy5zaGFkaW5nU2hpZnRGYWN0b3IgPSBzb3VyY2Uuc2hhZGluZ1NoaWZ0RmFjdG9yO1xuICAgIHRoaXMuc2hhZGluZ1NoaWZ0VGV4dHVyZSA9IHNvdXJjZS5zaGFkaW5nU2hpZnRUZXh0dXJlID8/IG51bGw7XG4gICAgdGhpcy5zaGFkaW5nU2hpZnRUZXh0dXJlU2NhbGUgPSBzb3VyY2Uuc2hhZGluZ1NoaWZ0VGV4dHVyZVNjYWxlO1xuICAgIHRoaXMuc2hhZGluZ1Rvb255RmFjdG9yID0gc291cmNlLnNoYWRpbmdUb29ueUZhY3RvcjtcbiAgICB0aGlzLnJpbUxpZ2h0aW5nTWl4RmFjdG9yID0gc291cmNlLnJpbUxpZ2h0aW5nTWl4RmFjdG9yO1xuICAgIHRoaXMucmltTXVsdGlwbHlUZXh0dXJlID0gc291cmNlLnJpbU11bHRpcGx5VGV4dHVyZSA/PyBudWxsO1xuICAgIHRoaXMubWF0Y2FwRmFjdG9yLmNvcHkoc291cmNlLm1hdGNhcEZhY3Rvcik7XG4gICAgdGhpcy5tYXRjYXBUZXh0dXJlID0gc291cmNlLm1hdGNhcFRleHR1cmUgPz8gbnVsbDtcbiAgICB0aGlzLnBhcmFtZXRyaWNSaW1Db2xvckZhY3Rvci5jb3B5KHNvdXJjZS5wYXJhbWV0cmljUmltQ29sb3JGYWN0b3IpO1xuICAgIHRoaXMucGFyYW1ldHJpY1JpbUxpZnRGYWN0b3IgPSBzb3VyY2UucGFyYW1ldHJpY1JpbUxpZnRGYWN0b3I7XG4gICAgdGhpcy5wYXJhbWV0cmljUmltRnJlc25lbFBvd2VyRmFjdG9yID0gc291cmNlLnBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJGYWN0b3I7XG4gICAgdGhpcy5vdXRsaW5lV2lkdGhNb2RlID0gc291cmNlLm91dGxpbmVXaWR0aE1vZGU7XG4gICAgdGhpcy5vdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmUgPSBzb3VyY2Uub3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlID8/IG51bGw7XG4gICAgdGhpcy5vdXRsaW5lV2lkdGhGYWN0b3IgPSBzb3VyY2Uub3V0bGluZVdpZHRoRmFjdG9yO1xuICAgIHRoaXMub3V0bGluZUNvbG9yRmFjdG9yLmNvcHkoc291cmNlLm91dGxpbmVDb2xvckZhY3Rvcik7XG4gICAgdGhpcy5vdXRsaW5lTGlnaHRpbmdNaXhGYWN0b3IgPSBzb3VyY2Uub3V0bGluZUxpZ2h0aW5nTWl4RmFjdG9yO1xuICAgIHRoaXMudXZBbmltYXRpb25TY3JvbGxYU3BlZWRGYWN0b3IgPSBzb3VyY2UudXZBbmltYXRpb25TY3JvbGxYU3BlZWRGYWN0b3I7XG4gICAgdGhpcy51dkFuaW1hdGlvblNjcm9sbFlTcGVlZEZhY3RvciA9IHNvdXJjZS51dkFuaW1hdGlvblNjcm9sbFlTcGVlZEZhY3RvcjtcbiAgICB0aGlzLnV2QW5pbWF0aW9uUm90YXRpb25TcGVlZEZhY3RvciA9IHNvdXJjZS51dkFuaW1hdGlvblJvdGF0aW9uU3BlZWRGYWN0b3I7XG4gICAgdGhpcy51dkFuaW1hdGlvbk1hc2tUZXh0dXJlID0gc291cmNlLnV2QW5pbWF0aW9uTWFza1RleHR1cmUgPz8gbnVsbDtcblxuICAgIHRoaXMuc2hhZGVDb2xvck5vZGUgPSBzb3VyY2Uuc2hhZGVDb2xvck5vZGUgPz8gbnVsbDtcbiAgICB0aGlzLnNoYWRpbmdTaGlmdE5vZGUgPSBzb3VyY2Uuc2hhZGluZ1NoaWZ0Tm9kZSA/PyBudWxsO1xuICAgIHRoaXMuc2hhZGluZ1Rvb255Tm9kZSA9IHNvdXJjZS5zaGFkaW5nVG9vbnlOb2RlID8/IG51bGw7XG4gICAgdGhpcy5yaW1MaWdodGluZ01peE5vZGUgPSBzb3VyY2UucmltTGlnaHRpbmdNaXhOb2RlID8/IG51bGw7XG4gICAgdGhpcy5yaW1NdWx0aXBseU5vZGUgPSBzb3VyY2UucmltTXVsdGlwbHlOb2RlID8/IG51bGw7XG4gICAgdGhpcy5tYXRjYXBOb2RlID0gc291cmNlLm1hdGNhcE5vZGUgPz8gbnVsbDtcbiAgICB0aGlzLnBhcmFtZXRyaWNSaW1Db2xvck5vZGUgPSBzb3VyY2UucGFyYW1ldHJpY1JpbUNvbG9yTm9kZSA/PyBudWxsO1xuICAgIHRoaXMucGFyYW1ldHJpY1JpbUxpZnROb2RlID0gc291cmNlLnBhcmFtZXRyaWNSaW1MaWZ0Tm9kZSA/PyBudWxsO1xuICAgIHRoaXMucGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlck5vZGUgPSBzb3VyY2UucGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlck5vZGUgPz8gbnVsbDtcblxuICAgIHRoaXMuaXNPdXRsaW5lID0gc291cmNlLmlzT3V0bGluZSA/PyBudWxsO1xuXG4gICAgcmV0dXJuIHN1cGVyLmNvcHkoc291cmNlKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMudXZBbmltYXRpb25TY3JvbGxYT2Zmc2V0ICs9IGRlbHRhICogdGhpcy51dkFuaW1hdGlvblNjcm9sbFhTcGVlZEZhY3RvcjtcbiAgICB0aGlzLnV2QW5pbWF0aW9uU2Nyb2xsWU9mZnNldCArPSBkZWx0YSAqIHRoaXMudXZBbmltYXRpb25TY3JvbGxZU3BlZWRGYWN0b3I7XG4gICAgdGhpcy51dkFuaW1hdGlvblJvdGF0aW9uUGhhc2UgKz0gZGVsdGEgKiB0aGlzLnV2QW5pbWF0aW9uUm90YXRpb25TcGVlZEZhY3RvcjtcbiAgfVxuXG4gIHByaXZhdGUgX3NldHVwU2hhZGVDb2xvck5vZGUoKTogU3dpenphYmxlIHtcbiAgICBpZiAodGhpcy5zaGFkZUNvbG9yTm9kZSAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gdmVjMyh0aGlzLnNoYWRlQ29sb3JOb2RlKTtcbiAgICB9XG5cbiAgICBsZXQgc2hhZGVDb2xvck5vZGU6IFNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT4gPSByZWZTaGFkZUNvbG9yRmFjdG9yO1xuXG4gICAgaWYgKHRoaXMuc2hhZGVNdWx0aXBseVRleHR1cmUgJiYgdGhpcy5zaGFkZU11bHRpcGx5VGV4dHVyZS5pc1RleHR1cmUgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IG1hcCA9IHJlZlNoYWRlTXVsdGlwbHlUZXh0dXJlLmNvbnRleHQoeyBnZXRVVjogKCkgPT4gdGhpcy5fYW5pbWF0ZWRVVk5vZGUgfSk7XG4gICAgICBzaGFkZUNvbG9yTm9kZSA9IHNoYWRlQ29sb3JOb2RlLm11bChtYXApO1xuICAgIH1cblxuICAgIHJldHVybiBzaGFkZUNvbG9yTm9kZTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldHVwU2hhZGluZ1NoaWZ0Tm9kZSgpOiBUSFJFRS5Ob2RlIHtcbiAgICBpZiAodGhpcy5zaGFkaW5nU2hpZnROb2RlICE9IG51bGwpIHtcbiAgICAgIHJldHVybiBmbG9hdCh0aGlzLnNoYWRpbmdTaGlmdE5vZGUpO1xuICAgIH1cblxuICAgIGxldCBzaGFkaW5nU2hpZnROb2RlOiBTaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+ID0gcmVmU2hhZGluZ1NoaWZ0RmFjdG9yO1xuXG4gICAgaWYgKHRoaXMuc2hhZGluZ1NoaWZ0VGV4dHVyZSAmJiB0aGlzLnNoYWRpbmdTaGlmdFRleHR1cmUuaXNUZXh0dXJlID09PSB0cnVlKSB7XG4gICAgICBjb25zdCBtYXAgPSByZWZTaGFkZU11bHRpcGx5VGV4dHVyZS5jb250ZXh0KHsgZ2V0VVY6ICgpID0+IHRoaXMuX2FuaW1hdGVkVVZOb2RlIH0pO1xuICAgICAgc2hhZGluZ1NoaWZ0Tm9kZSA9IHNoYWRpbmdTaGlmdE5vZGUuYWRkKG1hcC5tdWwocmVmU2hhZGVNdWx0aXBseVRleHR1cmVTY2FsZSkpO1xuICAgIH1cblxuICAgIHJldHVybiBzaGFkaW5nU2hpZnROb2RlO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0dXBTaGFkaW5nVG9vbnlOb2RlKCk6IFRIUkVFLk5vZGUge1xuICAgIGlmICh0aGlzLnNoYWRpbmdUb29ueU5vZGUgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGZsb2F0KHRoaXMuc2hhZGluZ1Rvb255Tm9kZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlZlNoYWRpbmdUb29ueUZhY3RvcjtcbiAgfVxuXG4gIHByaXZhdGUgX3NldHVwUmltTGlnaHRpbmdNaXhOb2RlKCk6IFRIUkVFLk5vZGUge1xuICAgIGlmICh0aGlzLnJpbUxpZ2h0aW5nTWl4Tm9kZSAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gZmxvYXQodGhpcy5yaW1MaWdodGluZ01peE5vZGUpO1xuICAgIH1cblxuICAgIHJldHVybiByZWZSaW1MaWdodGluZ01peEZhY3RvcjtcbiAgfVxuXG4gIHByaXZhdGUgX3NldHVwUmltTXVsdGlwbHlOb2RlKCk6IFN3aXp6YWJsZSB7XG4gICAgaWYgKHRoaXMucmltTXVsdGlwbHlOb2RlICE9IG51bGwpIHtcbiAgICAgIHJldHVybiB2ZWMzKHRoaXMucmltTXVsdGlwbHlOb2RlKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5yaW1NdWx0aXBseVRleHR1cmUgJiYgdGhpcy5yaW1NdWx0aXBseVRleHR1cmUuaXNUZXh0dXJlID09PSB0cnVlKSB7XG4gICAgICBjb25zdCBtYXAgPSByZWZSaW1NdWx0aXBseVRleHR1cmUuY29udGV4dCh7IGdldFVWOiAoKSA9PiB0aGlzLl9hbmltYXRlZFVWTm9kZSB9KTtcbiAgICAgIHJldHVybiBtYXA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZlYzMoMS4wKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldHVwTWF0Y2FwTm9kZSgpOiBTd2l6emFibGUge1xuICAgIGlmICh0aGlzLm1hdGNhcE5vZGUgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHZlYzModGhpcy5tYXRjYXBOb2RlKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5tYXRjYXBUZXh0dXJlICYmIHRoaXMubWF0Y2FwVGV4dHVyZS5pc1RleHR1cmUgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IG1hcCA9IHJlZk1hdGNhcFRleHR1cmUuY29udGV4dCh7IGdldFVWOiAoKSA9PiBtYXRjYXBVVi5tdWwoMS4wLCAtMS4wKS5hZGQoMC4wLCAxLjApIH0pO1xuICAgICAgcmV0dXJuIG1hcC5tdWwocmVmTWF0Y2FwRmFjdG9yKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmVjMygwLjApO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0dXBQYXJhbWV0cmljUmltTm9kZSgpOiBTd2l6emFibGUge1xuICAgIGNvbnN0IHBhcmFtZXRyaWNSaW1Db2xvciA9XG4gICAgICB0aGlzLnBhcmFtZXRyaWNSaW1Db2xvck5vZGUgIT0gbnVsbCA/IHZlYzModGhpcy5wYXJhbWV0cmljUmltQ29sb3JOb2RlKSA6IHJlZlBhcmFtZXRyaWNSaW1Db2xvckZhY3RvcjtcblxuICAgIGNvbnN0IHBhcmFtZXRyaWNSaW1MaWZ0ID1cbiAgICAgIHRoaXMucGFyYW1ldHJpY1JpbUxpZnROb2RlICE9IG51bGwgPyBmbG9hdCh0aGlzLnBhcmFtZXRyaWNSaW1MaWZ0Tm9kZSkgOiByZWZQYXJhbWV0cmljUmltTGlmdEZhY3RvcjtcblxuICAgIGNvbnN0IHBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXIgPVxuICAgICAgdGhpcy5wYXJhbWV0cmljUmltRnJlc25lbFBvd2VyTm9kZSAhPSBudWxsXG4gICAgICAgID8gZmxvYXQodGhpcy5wYXJhbWV0cmljUmltRnJlc25lbFBvd2VyTm9kZSlcbiAgICAgICAgOiByZWZQYXJhbWV0cmljUmltRnJlc25lbFBvd2VyRmFjdG9yO1xuXG4gICAgcmV0dXJuIG10b29uUGFyYW1ldHJpY1JpbSh7XG4gICAgICBwYXJhbWV0cmljUmltTGlmdCxcbiAgICAgIHBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXIsXG4gICAgICBwYXJhbWV0cmljUmltQ29sb3IsXG4gICAgfSk7XG4gIH1cbn1cblxuLy8gVE9ETzogUGFydCBvZiBzdHVmZiB0aGF0IE1Ub29uTWF0ZXJpYWwgZGVwZW5kcyBvbiBkb2VzIG5vdCBleGlzdCBpbiB0aHJlZS93ZWJncHUgKGUuZy4gVW5pZm9ybXNMaWIpXG4vLyBUSFJFRS5hZGROb2RlTWF0ZXJpYWwoJ01Ub29uTm9kZU1hdGVyaWFsJywgTVRvb25Ob2RlTWF0ZXJpYWwpO1xuIiwgIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiAqL1xuXG5leHBvcnQgY29uc3QgTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUgPSB7XG4gIE5vbmU6ICdub25lJyxcbiAgV29ybGRDb29yZGluYXRlczogJ3dvcmxkQ29vcmRpbmF0ZXMnLFxuICBTY3JlZW5Db29yZGluYXRlczogJ3NjcmVlbkNvb3JkaW5hdGVzJyxcbn0gYXMgY29uc3Q7XG5cbmV4cG9ydCB0eXBlIE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlID1cbiAgKHR5cGVvZiBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZSlba2V5b2YgdHlwZW9mIE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlXTtcbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS93ZWJncHUnO1xuaW1wb3J0IHsgZmxvYXQsIG1vZGVsVmlld1Bvc2l0aW9uLCBOb2RlUmVwcmVzZW50YXRpb24sIHRyYW5zZm9ybWVkTm9ybWFsVmlldyB9IGZyb20gJ3RocmVlL3RzbCc7XG5pbXBvcnQgeyBGbkNvbXBhdCB9IGZyb20gJy4vdXRpbHMvRm5Db21wYXQnO1xuXG5leHBvcnQgY29uc3QgbXRvb25QYXJhbWV0cmljUmltID0gRm5Db21wYXQoXG4gICh7XG4gICAgcGFyYW1ldHJpY1JpbUxpZnQsXG4gICAgcGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlcixcbiAgICBwYXJhbWV0cmljUmltQ29sb3IsXG4gIH06IHtcbiAgICBwYXJhbWV0cmljUmltTGlmdDogTm9kZVJlcHJlc2VudGF0aW9uO1xuICAgIHBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXI6IE5vZGVSZXByZXNlbnRhdGlvbjtcbiAgICBwYXJhbWV0cmljUmltQ29sb3I6IE5vZGVSZXByZXNlbnRhdGlvbjtcbiAgfSkgPT4ge1xuICAgIGNvbnN0IHZpZXdEaXIgPSBtb2RlbFZpZXdQb3NpdGlvbi5ub3JtYWxpemUoKTtcbiAgICBjb25zdCBkb3ROViA9IHRyYW5zZm9ybWVkTm9ybWFsVmlldy5kb3Qodmlld0Rpci5uZWdhdGUoKSk7XG5cbiAgICBjb25zdCByaW0gPSBmbG9hdCgxLjApLnN1Yihkb3ROVikuYWRkKHBhcmFtZXRyaWNSaW1MaWZ0KS5jbGFtcCgpLnBvdyhwYXJhbWV0cmljUmltRnJlc25lbFBvd2VyKTtcblxuICAgIHJldHVybiByaW0ubXVsKHBhcmFtZXRyaWNSaW1Db2xvcik7XG4gIH0sXG4pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7OztBQUdBLFlBQVksV0FBVztBQ0h2QixZQUFZQSxZQUFXO0FBQ3ZCLFNBQVMsS0FBSyxNQUE0QyxLQUFnQixJQUFJLE1BQU0sWUFBWTtBQ0RoRyxTQUFTLHlCQUF5QjtBQ0FsQyxZQUFZQSxZQUFXO0FBQ3ZCLFNBQVMsY0FBYyxjQUFjLE9BQU8sS0FBdUIsdUJBQXVCLFlBQVk7QUNEdEcsWUFBWUEsWUFBVztBQUN2QixTQUFTLHFCQUFxQjtBQ0Q5QixZQUFZLGVBQWU7QUFDM0IsWUFBWSxrQkFBa0I7QUNEOUIsWUFBWUEsWUFBVztBQUN2QjtFQUNFO0VBQ0EsZ0JBQUFDO0VBQ0EsU0FBQUM7RUFDQTtFQUNBO0VBQ0E7RUFDQSxPQUFBQztFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFJQSxRQUFBQztFQUNBLFFBQUFDO09BQ0s7QUVsQlAsU0FBUyxTQUFBSCxRQUFPLG1CQUF1Qyx5QkFBQUksOEJBQTZCO0FSSXBGLElBQU0sZ0JBQWdCLFNBQWUsZ0JBQVUsRUFBRTtBQUNqRCxJQUFJLGdCQUFnQixLQUFLO0FBQ3ZCLFVBQVE7SUFDTixzRUFBc0UsYUFBYTtFQUNyRjtBQUNGO0FFUk8sSUFBTSxXQUFXLGtCQUFrQixTQUFTLE9BQU87QUFDbkQsSUFBTSxTQUFT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
