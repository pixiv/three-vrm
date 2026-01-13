/*!
 * @pixiv/three-vrm-materials-mtoon v3.4.5
 * MToon (toon material) module for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2026 pixiv Inc.
 * @pixiv/three-vrm-materials-mtoon is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */

// src/nodes/warningIfPre161.ts
import * as THREE from "three";
var threeRevision = parseInt(THREE.REVISION, 10);
if (threeRevision < 167) {
  console.warn(
    `MToonNodeMaterial requires Three.js r167 or higher (You are using r${threeRevision}). This would not work correctly.`
  );
}

// src/nodes/MToonAnimatedUVNode.ts
import * as THREE2 from "three/webgpu";
import { cos, mat2, sin, uv, vec2, vec4 } from "three/tsl";

// src/nodes/materialReferences.ts
import { materialReference } from "three/tsl";
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

// src/nodes/MToonAnimatedUVNode.ts
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

// src/nodes/MToonLightingModel.ts
import * as THREE4 from "three/webgpu";
import { BRDF_Lambert, diffuseColor, float, mix, transformedNormalView, vec3 } from "three/tsl";

// src/nodes/immutableNodes.ts
import * as THREE3 from "three/webgpu";
import { nodeImmutable } from "three/tsl";
var shadeColor = nodeImmutable(THREE3.PropertyNode, "vec3").toVar("ShadeColor");
var shadingShift = nodeImmutable(THREE3.PropertyNode, "float").toVar("ShadingShift");
var shadingToony = nodeImmutable(THREE3.PropertyNode, "float").toVar("ShadingToony");
var rimLightingMix = nodeImmutable(THREE3.PropertyNode, "float").toVar("RimLightingMix");
var rimMultiply = nodeImmutable(THREE3.PropertyNode, "vec3").toVar("RimMultiply");
var matcap = nodeImmutable(THREE3.PropertyNode, "vec3").toVar("matcap");
var parametricRim = nodeImmutable(THREE3.PropertyNode, "vec3").toVar("ParametricRim");

// src/nodes/utils/FnCompat.ts
import * as THREE_TSL from "three/tsl";
import * as THREE_WEBGPU from "three/webgpu";
var FnCompat = (jsFunc) => {
  const threeRevision2 = parseInt(THREE_WEBGPU.REVISION, 10);
  if (threeRevision2 >= 168) {
    return THREE_TSL.Fn(jsFunc);
  } else {
    return THREE_WEBGPU.tslFn(jsFunc);
  }
};

// src/nodes/MToonLightingModel.ts
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

// src/nodes/MToonNodeMaterial.ts
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

// src/MToonMaterialOutlineWidthMode.ts
var MToonMaterialOutlineWidthMode = {
  None: "none",
  WorldCoordinates: "worldCoordinates",
  ScreenCoordinates: "screenCoordinates"
};

// src/nodes/mtoonParametricRim.ts
import { float as float2, modelViewPosition, transformedNormalView as transformedNormalView2 } from "three/tsl";
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

// src/nodes/MToonNodeMaterial.ts
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL25vZGVzL3dhcm5pbmdJZlByZTE2MS50cyIsICIuLi8uLi9zcmMvbm9kZXMvTVRvb25BbmltYXRlZFVWTm9kZS50cyIsICIuLi8uLi9zcmMvbm9kZXMvbWF0ZXJpYWxSZWZlcmVuY2VzLnRzIiwgIi4uLy4uL3NyYy9ub2Rlcy9NVG9vbkxpZ2h0aW5nTW9kZWwudHMiLCAiLi4vLi4vc3JjL25vZGVzL2ltbXV0YWJsZU5vZGVzLnRzIiwgIi4uLy4uL3NyYy9ub2Rlcy91dGlscy9GbkNvbXBhdC50cyIsICIuLi8uLi9zcmMvbm9kZXMvTVRvb25Ob2RlTWF0ZXJpYWwudHMiLCAiLi4vLi4vc3JjL01Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlLnRzIiwgIi4uLy4uL3NyYy9ub2Rlcy9tdG9vblBhcmFtZXRyaWNSaW0udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIFRoaXMgbW9kdWxlIHdpbGwgYmUgaW1wb3J0ZWQgYXQgdGhlIGJlZ2lubmluZyBvZiBgdGhyZWUtdnJtLW1hdGVyaWFscy1tdG9vbi9ub2Rlc2Bcbi8vIElmIHRoZSB2ZXJzaW9uIG9mIFRocmVlLmpzIGlzIGxlc3MgdGhhbiByMTY3LCBpdCB3aWxsIHdhcm4gdGhhdCBpdCBpcyBub3Qgc3VwcG9ydGVkXG5cbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuY29uc3QgdGhyZWVSZXZpc2lvbiA9IHBhcnNlSW50KFRIUkVFLlJFVklTSU9OLCAxMCk7XG5pZiAodGhyZWVSZXZpc2lvbiA8IDE2Nykge1xuICBjb25zb2xlLndhcm4oXG4gICAgYE1Ub29uTm9kZU1hdGVyaWFsIHJlcXVpcmVzIFRocmVlLmpzIHIxNjcgb3IgaGlnaGVyIChZb3UgYXJlIHVzaW5nIHIke3RocmVlUmV2aXNpb259KS4gVGhpcyB3b3VsZCBub3Qgd29yayBjb3JyZWN0bHkuYCxcbiAgKTtcbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS93ZWJncHUnO1xuaW1wb3J0IHsgY29zLCBtYXQyLCBTaGFkZXJOb2RlT2JqZWN0LCBzaW4sIFN3aXp6YWJsZSwgdXYsIHZlYzIsIHZlYzQgfSBmcm9tICd0aHJlZS90c2wnO1xuaW1wb3J0IHtcbiAgcmVmVVZBbmltYXRpb25NYXNrVGV4dHVyZSxcbiAgcmVmVVZBbmltYXRpb25Sb3RhdGlvblBoYXNlLFxuICByZWZVVkFuaW1hdGlvblNjcm9sbFhPZmZzZXQsXG4gIHJlZlVWQW5pbWF0aW9uU2Nyb2xsWU9mZnNldCxcbn0gZnJvbSAnLi9tYXRlcmlhbFJlZmVyZW5jZXMnO1xuXG5leHBvcnQgY2xhc3MgTVRvb25BbmltYXRlZFVWTm9kZSBleHRlbmRzIFRIUkVFLlRlbXBOb2RlIHtcbiAgcHVibGljIHJlYWRvbmx5IGhhc01hc2tUZXh0dXJlOiBib29sZWFuO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihoYXNNYXNrVGV4dHVyZTogYm9vbGVhbikge1xuICAgIHN1cGVyKCd2ZWMyJyk7XG5cbiAgICB0aGlzLmhhc01hc2tUZXh0dXJlID0gaGFzTWFza1RleHR1cmU7XG4gIH1cblxuICBwdWJsaWMgc2V0dXAoKTogU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5WYXJOb2RlPiB7XG4gICAgbGV0IHV2QW5pbWF0aW9uTWFzazogVEhSRUUuVFNMLk9wZXJhdG9yTm9kZVBhcmFtZXRlciA9IDEuMDtcblxuICAgIGlmICh0aGlzLmhhc01hc2tUZXh0dXJlKSB7XG4gICAgICB1dkFuaW1hdGlvbk1hc2sgPSB2ZWM0KHJlZlVWQW5pbWF0aW9uTWFza1RleHR1cmUpLmNvbnRleHQoeyBnZXRVVjogKCkgPT4gdXYoKSB9KS5yO1xuICAgIH1cblxuICAgIGxldCBhbmltYXRlZFV2OiBTaGFkZXJOb2RlT2JqZWN0PFN3aXp6YWJsZT4gPSB1digpO1xuXG4gICAgLy8gcm90YXRlXG4gICAgY29uc3QgcGhhc2UgPSByZWZVVkFuaW1hdGlvblJvdGF0aW9uUGhhc2UubXVsKHV2QW5pbWF0aW9uTWFzayk7XG5cbiAgICAvLyBXT1JLQVJPVU5EOiBUSFJFRS5yb3RhdGVVViBjYXVzZXMgYW4gaXNzdWUgd2l0aCB0aGUgbWFzayB0ZXh0dXJlXG4gICAgLy8gV2UgYXJlIGdvaW5nIHRvIHNwaW4gdXNpbmcgYSAxMDAlIG9yZ2FuaWMgaGFuZG1hZGUgcm90YXRpb24gbWF0cml4XG4gICAgLy8gYW5pbWF0ZWRVdiA9IFRIUkVFLnJvdGF0ZVVWKGFuaW1hdGVkVXYsIHBoYXNlLCBUSFJFRS52ZWMyKDAuNSwgMC41KSk7XG5cbiAgICBjb25zdCBjID0gY29zKHBoYXNlKTtcbiAgICBjb25zdCBzID0gc2luKHBoYXNlKTtcbiAgICBhbmltYXRlZFV2ID0gYW5pbWF0ZWRVdi5zdWIodmVjMigwLjUsIDAuNSkpO1xuICAgIGFuaW1hdGVkVXYgPSBhbmltYXRlZFV2Lm11bChtYXQyKGMsIHMsIHMubmVnYXRlKCksIGMpKTtcbiAgICBhbmltYXRlZFV2ID0gYW5pbWF0ZWRVdi5hZGQodmVjMigwLjUsIDAuNSkpO1xuXG4gICAgLy8gc2Nyb2xsXG4gICAgY29uc3Qgc2Nyb2xsID0gdmVjMihyZWZVVkFuaW1hdGlvblNjcm9sbFhPZmZzZXQsIHJlZlVWQW5pbWF0aW9uU2Nyb2xsWU9mZnNldCkubXVsKHV2QW5pbWF0aW9uTWFzayk7XG4gICAgYW5pbWF0ZWRVdiA9IGFuaW1hdGVkVXYuYWRkKHNjcm9sbCk7XG5cbiAgICByZXR1cm4gYW5pbWF0ZWRVdi50b1ZhcignQW5pbWF0ZWRVVicpO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgbWF0ZXJpYWxSZWZlcmVuY2UgfSBmcm9tICd0aHJlZS90c2wnO1xuXG5leHBvcnQgY29uc3QgcmVmQ29sb3IgPSBtYXRlcmlhbFJlZmVyZW5jZSgnY29sb3InLCAnY29sb3InKTtcbmV4cG9ydCBjb25zdCByZWZNYXAgPSBtYXRlcmlhbFJlZmVyZW5jZSgnbWFwJywgJ3RleHR1cmUnKTtcbmV4cG9ydCBjb25zdCByZWZOb3JtYWxNYXAgPSBtYXRlcmlhbFJlZmVyZW5jZSgnbm9ybWFsTWFwJywgJ3RleHR1cmUnKTtcbmV4cG9ydCBjb25zdCByZWZOb3JtYWxTY2FsZSA9IG1hdGVyaWFsUmVmZXJlbmNlKCdub3JtYWxTY2FsZScsICd2ZWMyJyk7XG5leHBvcnQgY29uc3QgcmVmRW1pc3NpdmUgPSBtYXRlcmlhbFJlZmVyZW5jZSgnZW1pc3NpdmUnLCAnY29sb3InKTtcbmV4cG9ydCBjb25zdCByZWZFbWlzc2l2ZUludGVuc2l0eSA9IG1hdGVyaWFsUmVmZXJlbmNlKCdlbWlzc2l2ZUludGVuc2l0eScsICdmbG9hdCcpO1xuZXhwb3J0IGNvbnN0IHJlZkVtaXNzaXZlTWFwID0gbWF0ZXJpYWxSZWZlcmVuY2UoJ2VtaXNzaXZlTWFwJywgJ3RleHR1cmUnKTtcblxuZXhwb3J0IGNvbnN0IHJlZlNoYWRlQ29sb3JGYWN0b3IgPSBtYXRlcmlhbFJlZmVyZW5jZSgnc2hhZGVDb2xvckZhY3RvcicsICdjb2xvcicpO1xuZXhwb3J0IGNvbnN0IHJlZlNoYWRpbmdTaGlmdEZhY3RvciA9IG1hdGVyaWFsUmVmZXJlbmNlKCdzaGFkaW5nU2hpZnRGYWN0b3InLCAnZmxvYXQnKTtcbmV4cG9ydCBjb25zdCByZWZTaGFkZU11bHRpcGx5VGV4dHVyZSA9IG1hdGVyaWFsUmVmZXJlbmNlKCdzaGFkZU11bHRpcGx5VGV4dHVyZScsICd0ZXh0dXJlJyk7XG5leHBvcnQgY29uc3QgcmVmU2hhZGVNdWx0aXBseVRleHR1cmVTY2FsZSA9IG1hdGVyaWFsUmVmZXJlbmNlKCdzaGFkZU11bHRpcGx5VGV4dHVyZVNjYWxlJywgJ2Zsb2F0Jyk7XG5leHBvcnQgY29uc3QgcmVmU2hhZGluZ1Rvb255RmFjdG9yID0gbWF0ZXJpYWxSZWZlcmVuY2UoJ3NoYWRpbmdUb29ueUZhY3RvcicsICdmbG9hdCcpO1xuZXhwb3J0IGNvbnN0IHJlZlJpbUxpZ2h0aW5nTWl4RmFjdG9yID0gbWF0ZXJpYWxSZWZlcmVuY2UoJ3JpbUxpZ2h0aW5nTWl4RmFjdG9yJywgJ2Zsb2F0Jyk7XG5leHBvcnQgY29uc3QgcmVmUmltTXVsdGlwbHlUZXh0dXJlID0gbWF0ZXJpYWxSZWZlcmVuY2UoJ3JpbU11bHRpcGx5VGV4dHVyZScsICd0ZXh0dXJlJyk7XG5leHBvcnQgY29uc3QgcmVmTWF0Y2FwRmFjdG9yID0gbWF0ZXJpYWxSZWZlcmVuY2UoJ21hdGNhcEZhY3RvcicsICdjb2xvcicpO1xuZXhwb3J0IGNvbnN0IHJlZk1hdGNhcFRleHR1cmUgPSBtYXRlcmlhbFJlZmVyZW5jZSgnbWF0Y2FwVGV4dHVyZScsICd0ZXh0dXJlJyk7XG5leHBvcnQgY29uc3QgcmVmUGFyYW1ldHJpY1JpbUNvbG9yRmFjdG9yID0gbWF0ZXJpYWxSZWZlcmVuY2UoJ3BhcmFtZXRyaWNSaW1Db2xvckZhY3RvcicsICdjb2xvcicpO1xuZXhwb3J0IGNvbnN0IHJlZlBhcmFtZXRyaWNSaW1MaWZ0RmFjdG9yID0gbWF0ZXJpYWxSZWZlcmVuY2UoJ3BhcmFtZXRyaWNSaW1MaWZ0RmFjdG9yJywgJ2Zsb2F0Jyk7XG5leHBvcnQgY29uc3QgcmVmUGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlckZhY3RvciA9IG1hdGVyaWFsUmVmZXJlbmNlKCdwYXJhbWV0cmljUmltRnJlc25lbFBvd2VyRmFjdG9yJywgJ2Zsb2F0Jyk7XG5leHBvcnQgY29uc3QgcmVmT3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlID0gbWF0ZXJpYWxSZWZlcmVuY2UoJ291dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZScsICd0ZXh0dXJlJyk7XG5leHBvcnQgY29uc3QgcmVmT3V0bGluZVdpZHRoRmFjdG9yID0gbWF0ZXJpYWxSZWZlcmVuY2UoJ291dGxpbmVXaWR0aEZhY3RvcicsICdmbG9hdCcpO1xuZXhwb3J0IGNvbnN0IHJlZk91dGxpbmVDb2xvckZhY3RvciA9IG1hdGVyaWFsUmVmZXJlbmNlKCdvdXRsaW5lQ29sb3JGYWN0b3InLCAnY29sb3InKTtcbmV4cG9ydCBjb25zdCByZWZPdXRsaW5lTGlnaHRpbmdNaXhGYWN0b3IgPSBtYXRlcmlhbFJlZmVyZW5jZSgnb3V0bGluZUxpZ2h0aW5nTWl4RmFjdG9yJywgJ2Zsb2F0Jyk7XG5leHBvcnQgY29uc3QgcmVmVVZBbmltYXRpb25NYXNrVGV4dHVyZSA9IG1hdGVyaWFsUmVmZXJlbmNlKCd1dkFuaW1hdGlvbk1hc2tUZXh0dXJlJywgJ3RleHR1cmUnKTtcblxuZXhwb3J0IGNvbnN0IHJlZlVWQW5pbWF0aW9uU2Nyb2xsWE9mZnNldCA9IG1hdGVyaWFsUmVmZXJlbmNlKCd1dkFuaW1hdGlvblNjcm9sbFhPZmZzZXQnLCAnZmxvYXQnKTtcbmV4cG9ydCBjb25zdCByZWZVVkFuaW1hdGlvblNjcm9sbFlPZmZzZXQgPSBtYXRlcmlhbFJlZmVyZW5jZSgndXZBbmltYXRpb25TY3JvbGxZT2Zmc2V0JywgJ2Zsb2F0Jyk7XG5leHBvcnQgY29uc3QgcmVmVVZBbmltYXRpb25Sb3RhdGlvblBoYXNlID0gbWF0ZXJpYWxSZWZlcmVuY2UoJ3V2QW5pbWF0aW9uUm90YXRpb25QaGFzZScsICdmbG9hdCcpO1xuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlL3dlYmdwdSc7XG5pbXBvcnQgeyBCUkRGX0xhbWJlcnQsIGRpZmZ1c2VDb2xvciwgZmxvYXQsIG1peCwgU2hhZGVyTm9kZU9iamVjdCwgdHJhbnNmb3JtZWROb3JtYWxWaWV3LCB2ZWMzIH0gZnJvbSAndGhyZWUvdHNsJztcbmltcG9ydCB7XG4gIG1hdGNhcCxcbiAgcGFyYW1ldHJpY1JpbSxcbiAgcmltTGlnaHRpbmdNaXgsXG4gIHJpbU11bHRpcGx5LFxuICBzaGFkZUNvbG9yLFxuICBzaGFkaW5nU2hpZnQsXG4gIHNoYWRpbmdUb29ueSxcbn0gZnJvbSAnLi9pbW11dGFibGVOb2Rlcyc7XG5pbXBvcnQgeyBGbkNvbXBhdCB9IGZyb20gJy4vdXRpbHMvRm5Db21wYXQnO1xuXG4vLyBUT0RPOiAwJSBjb25maWRlbmNlIGFib3V0IGZ1bmN0aW9uIHR5cGVzLlxuXG5jb25zdCBsaW5lYXJzdGVwID0gRm5Db21wYXQoXG4gICh7XG4gICAgYSxcbiAgICBiLFxuICAgIHQsXG4gIH06IHtcbiAgICBhOiBTaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+O1xuICAgIGI6IFNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT47XG4gICAgdDogU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPjtcbiAgfSkgPT4ge1xuICAgIGNvbnN0IHRvcCA9IHQuc3ViKGEpO1xuICAgIGNvbnN0IGJvdHRvbSA9IGIuc3ViKGEpO1xuICAgIHJldHVybiB0b3AuZGl2KGJvdHRvbSkuY2xhbXAoKTtcbiAgfSxcbik7XG5cbi8qKlxuICogQ29udmVydCBOZG90TCBpbnRvIHRvb24gc2hhZGluZyBmYWN0b3IgdXNpbmcgc2hhZGluZ1NoaWZ0IGFuZCBzaGFkaW5nVG9vbnlcbiAqL1xuY29uc3QgZ2V0U2hhZGluZyA9IEZuQ29tcGF0KCh7IGRvdE5MIH06IHsgZG90Tkw6IFNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT4gfSkgPT4ge1xuICBjb25zdCBzaGFkb3cgPSAxLjA7IC8vIFRPRE9cblxuICBjb25zdCBmZWF0aGVyID0gZmxvYXQoMS4wKS5zdWIoc2hhZGluZ1Rvb255KTtcblxuICBsZXQgc2hhZGluZzogU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPiA9IGRvdE5MLmFkZChzaGFkaW5nU2hpZnQpO1xuICBzaGFkaW5nID0gbGluZWFyc3RlcCh7XG4gICAgYTogZmVhdGhlci5uZWdhdGUoKSxcbiAgICBiOiBmZWF0aGVyLFxuICAgIHQ6IHNoYWRpbmcsXG4gIH0pO1xuICBzaGFkaW5nID0gc2hhZGluZy5tdWwoc2hhZG93KTtcbiAgcmV0dXJuIHNoYWRpbmc7XG59KTtcblxuLyoqXG4gKiBNaXggZGlmZnVzZUNvbG9yIGFuZCBzaGFkZUNvbG9yIHVzaW5nIHNoYWRpbmcgZmFjdG9yIGFuZCBsaWdodCBjb2xvclxuICovXG5jb25zdCBnZXREaWZmdXNlID0gRm5Db21wYXQoXG4gICh7IHNoYWRpbmcsIGxpZ2h0Q29sb3IgfTogeyBzaGFkaW5nOiBTaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+OyBsaWdodENvbG9yOiBTaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+IH0pID0+IHtcbiAgICBjb25zdCBmZWF0aGVyZWQgPSBtaXgoc2hhZGVDb2xvciwgZGlmZnVzZUNvbG9yLCBzaGFkaW5nKTtcbiAgICBjb25zdCBjb2wgPSBsaWdodENvbG9yLm11bChCUkRGX0xhbWJlcnQoeyBkaWZmdXNlQ29sb3I6IGZlYXRoZXJlZCB9KSk7XG5cbiAgICByZXR1cm4gY29sO1xuICB9LFxuKTtcblxuZXhwb3J0IGNsYXNzIE1Ub29uTGlnaHRpbmdNb2RlbCBleHRlbmRzIFRIUkVFLkxpZ2h0aW5nTW9kZWwge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgZGlyZWN0KHtcbiAgICBsaWdodERpcmVjdGlvbixcbiAgICBsaWdodENvbG9yLFxuICAgIHJlZmxlY3RlZExpZ2h0LFxuICB9OiBUSFJFRS5MaWdodGluZ01vZGVsRGlyZWN0SW5wdXQgJiB7IGxpZ2h0RGlyZWN0aW9uOiBUSFJFRS5Ob2RlOyBsaWdodENvbG9yOiBUSFJFRS5Ob2RlIH0pIHtcbiAgICBjb25zdCBkb3ROTCA9IHRyYW5zZm9ybWVkTm9ybWFsVmlldy5kb3QobGlnaHREaXJlY3Rpb24pLmNsYW1wKC0xLjAsIDEuMCk7XG5cbiAgICAvLyB0b29uIGRpZmZ1c2VcbiAgICBjb25zdCBzaGFkaW5nID0gZ2V0U2hhZGluZyh7XG4gICAgICBkb3ROTCxcbiAgICB9KTtcblxuICAgIChyZWZsZWN0ZWRMaWdodC5kaXJlY3REaWZmdXNlIGFzIFNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT4pLmFkZEFzc2lnbihcbiAgICAgIGdldERpZmZ1c2Uoe1xuICAgICAgICBzaGFkaW5nLFxuICAgICAgICBsaWdodENvbG9yOiBsaWdodENvbG9yIGFzIFNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT4sXG4gICAgICB9KSxcbiAgICApO1xuXG4gICAgLy8gcmltXG4gICAgKHJlZmxlY3RlZExpZ2h0LmRpcmVjdFNwZWN1bGFyIGFzIFNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT4pLmFkZEFzc2lnbihcbiAgICAgIHBhcmFtZXRyaWNSaW1cbiAgICAgICAgLmFkZChtYXRjYXApXG4gICAgICAgIC5tdWwocmltTXVsdGlwbHkpXG4gICAgICAgIC5tdWwobWl4KHZlYzMoMC4wKSwgQlJERl9MYW1iZXJ0KHsgZGlmZnVzZUNvbG9yOiBsaWdodENvbG9yIH0pLCByaW1MaWdodGluZ01peCkpLFxuICAgICk7XG4gIH1cblxuICAvLyBDT01QQVQ6IHByZS1yMTc0XG4gIC8vIGBidWlsZGVyT3JDb250ZXh0YDogYFRIUkVFLk5vZGVCdWlsZGVyYCBpbiA+PSByMTc0LCBgTGlnaHRpbmdNb2RlbEluZGlyZWN0SW5wdXRgIChgTGlnaHRpbmdDb250ZXh0YCkgb3RoZXJ3aXNlXG4gIGluZGlyZWN0KGJ1aWxkZXJPckNvbnRleHQ6IFRIUkVFLk5vZGVCdWlsZGVyIHwgVEhSRUUuTGlnaHRpbmdDb250ZXh0KSB7XG4gICAgY29uc3QgY29udGV4dDogVEhSRUUuTGlnaHRpbmdDb250ZXh0ID1cbiAgICAgICdjb250ZXh0JyBpbiBidWlsZGVyT3JDb250ZXh0ID8gKGJ1aWxkZXJPckNvbnRleHQuY29udGV4dCBhcyB1bmtub3duIGFzIFRIUkVFLkxpZ2h0aW5nQ29udGV4dCkgOiBidWlsZGVyT3JDb250ZXh0O1xuXG4gICAgdGhpcy5pbmRpcmVjdERpZmZ1c2UoY29udGV4dCk7XG4gICAgdGhpcy5pbmRpcmVjdFNwZWN1bGFyKGNvbnRleHQpO1xuICB9XG5cbiAgaW5kaXJlY3REaWZmdXNlKGNvbnRleHQ6IFRIUkVFLkxpZ2h0aW5nQ29udGV4dCkge1xuICAgIGNvbnN0IHsgaXJyYWRpYW5jZSwgcmVmbGVjdGVkTGlnaHQgfSA9IGNvbnRleHQ7XG5cbiAgICAvLyBpbmRpcmVjdCBpcnJhZGlhbmNlXG4gICAgKHJlZmxlY3RlZExpZ2h0LmluZGlyZWN0RGlmZnVzZSBhcyBTaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+KS5hZGRBc3NpZ24oXG4gICAgICAoaXJyYWRpYW5jZSBhcyBTaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+KS5tdWwoQlJERl9MYW1iZXJ0KHsgZGlmZnVzZUNvbG9yIH0pKSxcbiAgICApO1xuICB9XG5cbiAgaW5kaXJlY3RTcGVjdWxhcihjb250ZXh0OiBUSFJFRS5MaWdodGluZ0NvbnRleHQpIHtcbiAgICBjb25zdCB7IHJlZmxlY3RlZExpZ2h0IH0gPSBjb250ZXh0O1xuXG4gICAgLy8gcmltXG4gICAgKHJlZmxlY3RlZExpZ2h0LmluZGlyZWN0U3BlY3VsYXIgYXMgU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPikuYWRkQXNzaWduKFxuICAgICAgcGFyYW1ldHJpY1JpbVxuICAgICAgICAuYWRkKG1hdGNhcClcbiAgICAgICAgLm11bChyaW1NdWx0aXBseSlcbiAgICAgICAgLm11bChtaXgodmVjMygxLjApLCB2ZWMzKDAuMCksIHJpbUxpZ2h0aW5nTWl4KSksXG4gICAgKTtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlL3dlYmdwdSc7XG5pbXBvcnQgeyBub2RlSW1tdXRhYmxlIH0gZnJvbSAndGhyZWUvdHNsJztcblxuZXhwb3J0IGNvbnN0IHNoYWRlQ29sb3IgPSBub2RlSW1tdXRhYmxlKFRIUkVFLlByb3BlcnR5Tm9kZSwgJ3ZlYzMnKS50b1ZhcignU2hhZGVDb2xvcicpO1xuZXhwb3J0IGNvbnN0IHNoYWRpbmdTaGlmdCA9IG5vZGVJbW11dGFibGUoVEhSRUUuUHJvcGVydHlOb2RlLCAnZmxvYXQnKS50b1ZhcignU2hhZGluZ1NoaWZ0Jyk7XG5leHBvcnQgY29uc3Qgc2hhZGluZ1Rvb255ID0gbm9kZUltbXV0YWJsZShUSFJFRS5Qcm9wZXJ0eU5vZGUsICdmbG9hdCcpLnRvVmFyKCdTaGFkaW5nVG9vbnknKTtcbmV4cG9ydCBjb25zdCByaW1MaWdodGluZ01peCA9IG5vZGVJbW11dGFibGUoVEhSRUUuUHJvcGVydHlOb2RlLCAnZmxvYXQnKS50b1ZhcignUmltTGlnaHRpbmdNaXgnKTtcbmV4cG9ydCBjb25zdCByaW1NdWx0aXBseSA9IG5vZGVJbW11dGFibGUoVEhSRUUuUHJvcGVydHlOb2RlLCAndmVjMycpLnRvVmFyKCdSaW1NdWx0aXBseScpO1xuZXhwb3J0IGNvbnN0IG1hdGNhcCA9IG5vZGVJbW11dGFibGUoVEhSRUUuUHJvcGVydHlOb2RlLCAndmVjMycpLnRvVmFyKCdtYXRjYXAnKTtcbmV4cG9ydCBjb25zdCBwYXJhbWV0cmljUmltID0gbm9kZUltbXV0YWJsZShUSFJFRS5Qcm9wZXJ0eU5vZGUsICd2ZWMzJykudG9WYXIoJ1BhcmFtZXRyaWNSaW0nKTtcbiIsICJpbXBvcnQgKiBhcyBUSFJFRV9UU0wgZnJvbSAndGhyZWUvdHNsJztcbmltcG9ydCAqIGFzIFRIUkVFX1dFQkdQVSBmcm9tICd0aHJlZS93ZWJncHUnO1xuXG4vKipcbiAqIEEgY29tcGF0IGZ1bmN0aW9uIGZvciBgRm4oKWAgLyBgdHNsRm4oKWAuXG4gKiBgdHNsRm4oKWAgaGFzIGJlZW4gcmVuYW1lZCB0byBgRm4oKWAgaW4gcjE2OC5cbiAqIFdlIGFyZSBnb2luZyB0byB1c2UgdGhpcyBjb21wYXQgZm9yIGEgd2hpbGUuXG4gKlxuICogU2VlOiBodHRwczovL2dpdGh1Yi5jb20vbXJkb29iL3RocmVlLmpzL3B1bGwvMjkwNjRcbiAqL1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNvbnN0IEZuQ29tcGF0OiB0eXBlb2YgVEhSRUVfVFNMLkZuID0gKGpzRnVuYzogYW55KSA9PiB7XG4gIC8vIENPTVBBVCByMTY4OiBgdHNsRm4oKWAgaGFzIGJlZW4gcmVuYW1lZCB0byBgRm4oKWBcbiAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vbXJkb29iL3RocmVlLmpzL3B1bGwvMjkwNjRcbiAgY29uc3QgdGhyZWVSZXZpc2lvbiA9IHBhcnNlSW50KFRIUkVFX1dFQkdQVS5SRVZJU0lPTiwgMTApO1xuICBpZiAodGhyZWVSZXZpc2lvbiA+PSAxNjgpIHtcbiAgICByZXR1cm4gKFRIUkVFX1RTTCBhcyBhbnkpLkZuKGpzRnVuYyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIChUSFJFRV9XRUJHUFUgYXMgYW55KS50c2xGbihqc0Z1bmMpO1xuICB9XG59O1xuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlL3dlYmdwdSc7XG5pbXBvcnQge1xuICBjYW1lcmFQcm9qZWN0aW9uTWF0cml4LFxuICBkaWZmdXNlQ29sb3IsXG4gIGZsb2F0LFxuICBsZW5ndGgsXG4gIG1hdGNhcFVWLFxuICBtYXRlcmlhbE5vcm1hbCxcbiAgbWl4LFxuICBtb2RlbE5vcm1hbE1hdHJpeCxcbiAgbW9kZWxWaWV3TWF0cml4LFxuICBub3JtYWxMb2NhbCxcbiAgbm9ybWFsTWFwLFxuICBwb3NpdGlvbkxvY2FsLFxuICBwb3NpdGlvblZpZXcsXG4gIFNoYWRlck5vZGVPYmplY3QsXG4gIFN3aXp6YWJsZSxcbiAgdW5pZm9ybSxcbiAgdmVjMyxcbiAgdmVjNCxcbn0gZnJvbSAndGhyZWUvdHNsJztcblxuaW1wb3J0IHR5cGUgeyBNVG9vbk1hdGVyaWFsIH0gZnJvbSAnLi4vTVRvb25NYXRlcmlhbCc7XG5pbXBvcnQgeyBNVG9vbkxpZ2h0aW5nTW9kZWwgfSBmcm9tICcuL01Ub29uTGlnaHRpbmdNb2RlbCc7XG5pbXBvcnQge1xuICByaW1MaWdodGluZ01peCxcbiAgbWF0Y2FwLFxuICBzaGFkZUNvbG9yLFxuICBzaGFkaW5nU2hpZnQsXG4gIHNoYWRpbmdUb29ueSxcbiAgcmltTXVsdGlwbHksXG4gIHBhcmFtZXRyaWNSaW0sXG59IGZyb20gJy4vaW1tdXRhYmxlTm9kZXMnO1xuaW1wb3J0IHtcbiAgcmVmQ29sb3IsXG4gIHJlZkVtaXNzaXZlLFxuICByZWZFbWlzc2l2ZUludGVuc2l0eSxcbiAgcmVmRW1pc3NpdmVNYXAsXG4gIHJlZk1hcCxcbiAgcmVmTWF0Y2FwRmFjdG9yLFxuICByZWZNYXRjYXBUZXh0dXJlLFxuICByZWZOb3JtYWxNYXAsXG4gIHJlZk5vcm1hbFNjYWxlLFxuICByZWZPdXRsaW5lQ29sb3JGYWN0b3IsXG4gIHJlZk91dGxpbmVMaWdodGluZ01peEZhY3RvcixcbiAgcmVmT3V0bGluZVdpZHRoRmFjdG9yLFxuICByZWZPdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmUsXG4gIHJlZlBhcmFtZXRyaWNSaW1Db2xvckZhY3RvcixcbiAgcmVmUGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlckZhY3RvcixcbiAgcmVmUGFyYW1ldHJpY1JpbUxpZnRGYWN0b3IsXG4gIHJlZlJpbUxpZ2h0aW5nTWl4RmFjdG9yLFxuICByZWZSaW1NdWx0aXBseVRleHR1cmUsXG4gIHJlZlNoYWRlQ29sb3JGYWN0b3IsXG4gIHJlZlNoYWRlTXVsdGlwbHlUZXh0dXJlLFxuICByZWZTaGFkZU11bHRpcGx5VGV4dHVyZVNjYWxlLFxuICByZWZTaGFkaW5nU2hpZnRGYWN0b3IsXG4gIHJlZlNoYWRpbmdUb29ueUZhY3Rvcixcbn0gZnJvbSAnLi9tYXRlcmlhbFJlZmVyZW5jZXMnO1xuaW1wb3J0IHsgTVRvb25BbmltYXRlZFVWTm9kZSB9IGZyb20gJy4vTVRvb25BbmltYXRlZFVWTm9kZSc7XG5pbXBvcnQgeyBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZSB9IGZyb20gJy4uL01Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlJztcbmltcG9ydCB7IE1Ub29uTm9kZU1hdGVyaWFsUGFyYW1ldGVycyB9IGZyb20gJy4vTVRvb25Ob2RlTWF0ZXJpYWxQYXJhbWV0ZXJzJztcbmltcG9ydCB7IG10b29uUGFyYW1ldHJpY1JpbSB9IGZyb20gJy4vbXRvb25QYXJhbWV0cmljUmltJztcblxuLyoqXG4gKiBNVG9vbiBpcyBhIG1hdGVyaWFsIHNwZWNpZmljYXRpb24gdGhhdCBoYXMgdmFyaW91cyBmZWF0dXJlcy5cbiAqIFRoZSBzcGVjIGFuZCBpbXBsZW1lbnRhdGlvbiBhcmUgb3JpZ2luYWxseSBmb3VuZGVkIGZvciBVbml0eSBlbmdpbmUgYW5kIHRoaXMgaXMgYSBwb3J0IG9mIHRoZSBtYXRlcmlhbC5cbiAqXG4gKiBUaGlzIG1hdGVyaWFsIGlzIGEgTm9kZU1hdGVyaWFsIHZhcmlhbnQgb2Yge0BsaW5rIE1Ub29uTWF0ZXJpYWx9LlxuICpcbiAqIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL1NhbnRhcmgvTVRvb25cbiAqL1xuZXhwb3J0IGNsYXNzIE1Ub29uTm9kZU1hdGVyaWFsIGV4dGVuZHMgVEhSRUUuTm9kZU1hdGVyaWFsIHtcbiAgcHVibGljIGVtaXNzaXZlTm9kZTogU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPiB8IG51bGw7XG5cbiAgcHVibGljIGNvbG9yOiBUSFJFRS5Db2xvcjtcbiAgcHVibGljIG1hcDogVEhSRUUuVGV4dHVyZSB8IG51bGw7XG4gIHB1YmxpYyBlbWlzc2l2ZTogVEhSRUUuQ29sb3I7XG4gIHB1YmxpYyBlbWlzc2l2ZUludGVuc2l0eTogbnVtYmVyO1xuICBwdWJsaWMgZW1pc3NpdmVNYXA6IFRIUkVFLlRleHR1cmUgfCBudWxsO1xuICBwdWJsaWMgbm9ybWFsTWFwOiBUSFJFRS5UZXh0dXJlIHwgbnVsbDtcbiAgcHVibGljIG5vcm1hbFNjYWxlOiBUSFJFRS5WZWN0b3IyO1xuXG4gIHB1YmxpYyBzaGFkZUNvbG9yRmFjdG9yOiBUSFJFRS5Db2xvcjtcbiAgcHVibGljIHNoYWRlTXVsdGlwbHlUZXh0dXJlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbDtcbiAgcHVibGljIHNoYWRpbmdTaGlmdEZhY3RvcjogbnVtYmVyO1xuICBwdWJsaWMgc2hhZGluZ1NoaWZ0VGV4dHVyZTogVEhSRUUuVGV4dHVyZSB8IG51bGw7XG4gIHB1YmxpYyBzaGFkaW5nU2hpZnRUZXh0dXJlU2NhbGU6IG51bWJlcjtcbiAgcHVibGljIHNoYWRpbmdUb29ueUZhY3RvcjogbnVtYmVyO1xuICBwdWJsaWMgcmltTGlnaHRpbmdNaXhGYWN0b3I6IG51bWJlcjtcbiAgcHVibGljIHJpbU11bHRpcGx5VGV4dHVyZTogVEhSRUUuVGV4dHVyZSB8IG51bGw7XG4gIHB1YmxpYyBtYXRjYXBGYWN0b3I6IFRIUkVFLkNvbG9yO1xuICBwdWJsaWMgbWF0Y2FwVGV4dHVyZTogVEhSRUUuVGV4dHVyZSB8IG51bGw7XG4gIHB1YmxpYyBwYXJhbWV0cmljUmltQ29sb3JGYWN0b3I6IFRIUkVFLkNvbG9yO1xuICBwdWJsaWMgcGFyYW1ldHJpY1JpbUxpZnRGYWN0b3I6IG51bWJlcjtcbiAgcHVibGljIHBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJGYWN0b3I6IG51bWJlcjtcbiAgcHVibGljIG91dGxpbmVXaWR0aE1vZGU6IE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlO1xuICBwdWJsaWMgb3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbDtcbiAgcHVibGljIG91dGxpbmVXaWR0aEZhY3RvcjogbnVtYmVyO1xuICBwdWJsaWMgb3V0bGluZUNvbG9yRmFjdG9yOiBUSFJFRS5Db2xvcjtcbiAgcHVibGljIG91dGxpbmVMaWdodGluZ01peEZhY3RvcjogbnVtYmVyO1xuICBwdWJsaWMgdXZBbmltYXRpb25TY3JvbGxYU3BlZWRGYWN0b3I6IG51bWJlcjtcbiAgcHVibGljIHV2QW5pbWF0aW9uU2Nyb2xsWVNwZWVkRmFjdG9yOiBudW1iZXI7XG4gIHB1YmxpYyB1dkFuaW1hdGlvblJvdGF0aW9uU3BlZWRGYWN0b3I6IG51bWJlcjtcbiAgcHVibGljIHV2QW5pbWF0aW9uTWFza1RleHR1cmU6IFRIUkVFLlRleHR1cmUgfCBudWxsO1xuXG4gIHB1YmxpYyBzaGFkZUNvbG9yTm9kZTogU3dpenphYmxlIHwgbnVsbDtcbiAgcHVibGljIHNoYWRpbmdTaGlmdE5vZGU6IFRIUkVFLk5vZGUgfCBudWxsO1xuICBwdWJsaWMgc2hhZGluZ1Rvb255Tm9kZTogVEhSRUUuTm9kZSB8IG51bGw7XG4gIHB1YmxpYyByaW1MaWdodGluZ01peE5vZGU6IFRIUkVFLk5vZGUgfCBudWxsO1xuICBwdWJsaWMgcmltTXVsdGlwbHlOb2RlOiBUSFJFRS5Ob2RlIHwgbnVsbDtcbiAgcHVibGljIG1hdGNhcE5vZGU6IFRIUkVFLk5vZGUgfCBudWxsO1xuICBwdWJsaWMgcGFyYW1ldHJpY1JpbUNvbG9yTm9kZTogU3dpenphYmxlIHwgbnVsbDtcbiAgcHVibGljIHBhcmFtZXRyaWNSaW1MaWZ0Tm9kZTogVEhSRUUuTm9kZSB8IG51bGw7XG4gIHB1YmxpYyBwYXJhbWV0cmljUmltRnJlc25lbFBvd2VyTm9kZTogVEhSRUUuTm9kZSB8IG51bGw7XG5cbiAgcHVibGljIHV2QW5pbWF0aW9uU2Nyb2xsWE9mZnNldDogbnVtYmVyO1xuICBwdWJsaWMgdXZBbmltYXRpb25TY3JvbGxZT2Zmc2V0OiBudW1iZXI7XG4gIHB1YmxpYyB1dkFuaW1hdGlvblJvdGF0aW9uUGhhc2U6IG51bWJlcjtcblxuICBwdWJsaWMgaXNPdXRsaW5lOiBib29sZWFuO1xuXG4gIHByaXZhdGUgX2FuaW1hdGVkVVZOb2RlOiBNVG9vbkFuaW1hdGVkVVZOb2RlIHwgbnVsbDtcblxuICBwdWJsaWMgY3VzdG9tUHJvZ3JhbUNhY2hlS2V5KCk6IHN0cmluZyB7XG4gICAgbGV0IGNhY2hlS2V5ID0gc3VwZXIuY3VzdG9tUHJvZ3JhbUNhY2hlS2V5KCk7XG5cbiAgICBjYWNoZUtleSArPSBgaXNPdXRsaW5lOiR7dGhpcy5pc091dGxpbmV9LGA7XG5cbiAgICByZXR1cm4gY2FjaGVLZXk7XG4gIH1cblxuICAvKipcbiAgICogUmVhZG9ubHkgYm9vbGVhbiB0aGF0IGluZGljYXRlcyB0aGlzIGlzIGEge0BsaW5rIE1Ub29uTm9kZU1hdGVyaWFsfS5cbiAgICovXG4gIHB1YmxpYyBnZXQgaXNNVG9vbk5vZGVNYXRlcmlhbCgpOiB0cnVlIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJhbWV0ZXJzOiBNVG9vbk5vZGVNYXRlcmlhbFBhcmFtZXRlcnMgPSB7fSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICBpZiAocGFyYW1ldGVycy50cmFuc3BhcmVudFdpdGhaV3JpdGUpIHtcbiAgICAgIHBhcmFtZXRlcnMuZGVwdGhXcml0ZSA9IHRydWU7XG4gICAgfVxuICAgIGRlbGV0ZSBwYXJhbWV0ZXJzLnRyYW5zcGFyZW50V2l0aFpXcml0ZTtcblxuICAgIC8vIGBNVG9vbk1hdGVyaWFsTG9hZGVyUGx1Z2luYCBhc3NpZ25zIHRoZXNlIHBhcmFtZXRlcnMgdG8gdGhlIG1hdGVyaWFsXG4gICAgLy8gSG93ZXZlciwgYE1Ub29uTm9kZU1hdGVyaWFsYCBkb2VzIG5vdCBzdXBwb3J0IHRoZXNlIHBhcmFtZXRlcnNcbiAgICAvLyBzbyB3ZSBkZWxldGUgdGhlbSBoZXJlIHRvIHN1cHByZXNzIHdhcm5pbmdzXG4gICAgZGVsZXRlIChwYXJhbWV0ZXJzIGFzIGFueSkuZ2lFcXVhbGl6YXRpb25GYWN0b3I7XG4gICAgZGVsZXRlIChwYXJhbWV0ZXJzIGFzIGFueSkudjBDb21wYXRTaGFkZTtcbiAgICBkZWxldGUgKHBhcmFtZXRlcnMgYXMgYW55KS5kZWJ1Z01vZGU7XG5cbiAgICB0aGlzLmVtaXNzaXZlTm9kZSA9IG51bGw7XG5cbiAgICB0aGlzLmxpZ2h0cyA9IHRydWU7XG5cbiAgICB0aGlzLmNvbG9yID0gbmV3IFRIUkVFLkNvbG9yKDEuMCwgMS4wLCAxLjApO1xuICAgIHRoaXMubWFwID0gbnVsbDtcbiAgICB0aGlzLmVtaXNzaXZlID0gbmV3IFRIUkVFLkNvbG9yKDAuMCwgMC4wLCAwLjApO1xuICAgIHRoaXMuZW1pc3NpdmVJbnRlbnNpdHkgPSAxLjA7XG4gICAgdGhpcy5lbWlzc2l2ZU1hcCA9IG51bGw7XG4gICAgdGhpcy5ub3JtYWxNYXAgPSBudWxsO1xuICAgIHRoaXMubm9ybWFsU2NhbGUgPSBuZXcgVEhSRUUuVmVjdG9yMigxLjAsIDEuMCk7XG4gICAgdGhpcy5zaGFkZUNvbG9yRmFjdG9yID0gbmV3IFRIUkVFLkNvbG9yKDAuMCwgMC4wLCAwLjApO1xuICAgIHRoaXMuc2hhZGVNdWx0aXBseVRleHR1cmUgPSBudWxsO1xuICAgIHRoaXMuc2hhZGluZ1NoaWZ0RmFjdG9yID0gMC4wO1xuICAgIHRoaXMuc2hhZGluZ1NoaWZ0VGV4dHVyZSA9IG51bGw7XG4gICAgdGhpcy5zaGFkaW5nU2hpZnRUZXh0dXJlU2NhbGUgPSAxLjA7XG4gICAgdGhpcy5zaGFkaW5nVG9vbnlGYWN0b3IgPSAwLjk7XG4gICAgdGhpcy5yaW1MaWdodGluZ01peEZhY3RvciA9IDEuMDtcbiAgICB0aGlzLnJpbU11bHRpcGx5VGV4dHVyZSA9IG51bGw7XG4gICAgdGhpcy5tYXRjYXBGYWN0b3IgPSBuZXcgVEhSRUUuQ29sb3IoMS4wLCAxLjAsIDEuMCk7XG4gICAgdGhpcy5tYXRjYXBUZXh0dXJlID0gbnVsbDtcbiAgICB0aGlzLnBhcmFtZXRyaWNSaW1Db2xvckZhY3RvciA9IG5ldyBUSFJFRS5Db2xvcigwLjAsIDAuMCwgMC4wKTtcbiAgICB0aGlzLnBhcmFtZXRyaWNSaW1MaWZ0RmFjdG9yID0gMC4wO1xuICAgIHRoaXMucGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlckZhY3RvciA9IDUuMDtcbiAgICB0aGlzLm91dGxpbmVXaWR0aE1vZGUgPSBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZS5Ob25lO1xuICAgIHRoaXMub3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlID0gbnVsbDtcbiAgICB0aGlzLm91dGxpbmVXaWR0aEZhY3RvciA9IDAuMDtcbiAgICB0aGlzLm91dGxpbmVDb2xvckZhY3RvciA9IG5ldyBUSFJFRS5Db2xvcigwLjAsIDAuMCwgMC4wKTtcbiAgICB0aGlzLm91dGxpbmVMaWdodGluZ01peEZhY3RvciA9IDEuMDtcbiAgICB0aGlzLnV2QW5pbWF0aW9uU2Nyb2xsWFNwZWVkRmFjdG9yID0gMC4wO1xuICAgIHRoaXMudXZBbmltYXRpb25TY3JvbGxZU3BlZWRGYWN0b3IgPSAwLjA7XG4gICAgdGhpcy51dkFuaW1hdGlvblJvdGF0aW9uU3BlZWRGYWN0b3IgPSAwLjA7XG4gICAgdGhpcy51dkFuaW1hdGlvbk1hc2tUZXh0dXJlID0gbnVsbDtcblxuICAgIHRoaXMuc2hhZGVDb2xvck5vZGUgPSBudWxsO1xuICAgIHRoaXMuc2hhZGluZ1NoaWZ0Tm9kZSA9IG51bGw7XG4gICAgdGhpcy5zaGFkaW5nVG9vbnlOb2RlID0gbnVsbDtcbiAgICB0aGlzLnJpbUxpZ2h0aW5nTWl4Tm9kZSA9IG51bGw7XG4gICAgdGhpcy5yaW1NdWx0aXBseU5vZGUgPSBudWxsO1xuICAgIHRoaXMubWF0Y2FwTm9kZSA9IG51bGw7XG4gICAgdGhpcy5wYXJhbWV0cmljUmltQ29sb3JOb2RlID0gbnVsbDtcbiAgICB0aGlzLnBhcmFtZXRyaWNSaW1MaWZ0Tm9kZSA9IG51bGw7XG4gICAgdGhpcy5wYXJhbWV0cmljUmltRnJlc25lbFBvd2VyTm9kZSA9IG51bGw7XG5cbiAgICB0aGlzLnV2QW5pbWF0aW9uU2Nyb2xsWE9mZnNldCA9IDAuMDtcbiAgICB0aGlzLnV2QW5pbWF0aW9uU2Nyb2xsWU9mZnNldCA9IDAuMDtcbiAgICB0aGlzLnV2QW5pbWF0aW9uUm90YXRpb25QaGFzZSA9IDAuMDtcblxuICAgIHRoaXMuaXNPdXRsaW5lID0gZmFsc2U7XG5cbiAgICB0aGlzLl9hbmltYXRlZFVWTm9kZSA9IG51bGw7XG5cbiAgICB0aGlzLnNldFZhbHVlcyhwYXJhbWV0ZXJzKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXR1cExpZ2h0aW5nTW9kZWwoLypidWlsZGVyKi8pOiBNVG9vbkxpZ2h0aW5nTW9kZWwge1xuICAgIHJldHVybiBuZXcgTVRvb25MaWdodGluZ01vZGVsKCk7XG4gIH1cblxuICBwdWJsaWMgc2V0dXAoYnVpbGRlcjogVEhSRUUuTm9kZUJ1aWxkZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9hbmltYXRlZFVWTm9kZSA9IG5ldyBNVG9vbkFuaW1hdGVkVVZOb2RlKFxuICAgICAgKHRoaXMudXZBbmltYXRpb25NYXNrVGV4dHVyZSAmJiB0aGlzLnV2QW5pbWF0aW9uTWFza1RleHR1cmUuaXNUZXh0dXJlID09PSB0cnVlKSA/PyBmYWxzZSxcbiAgICApO1xuXG4gICAgc3VwZXIuc2V0dXAoYnVpbGRlcik7XG4gIH1cblxuICBwdWJsaWMgc2V0dXBEaWZmdXNlQ29sb3IoYnVpbGRlcjogVEhSRUUuTm9kZUJ1aWxkZXIpOiB2b2lkIHtcbiAgICAvLyB3ZSBtdXN0IGFwcGx5IHV2IHNjcm9sbCB0byB0aGUgbWFwXG4gICAgLy8gdGhpcy5jb2xvck5vZGUgd2lsbCBiZSB1c2VkIGluIHN1cGVyLnNldHVwRGlmZnVzZUNvbG9yKCkgc28gd2UgdGVtcG9yYXJpbHkgcmVwbGFjZSBpdFxuICAgIGxldCB0ZW1wQ29sb3JOb2RlOiBTaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+IHwgbnVsbCA9IG51bGw7XG5cbiAgICBpZiAodGhpcy5jb2xvck5vZGUgPT0gbnVsbCkge1xuICAgICAgdGVtcENvbG9yTm9kZSA9IHJlZkNvbG9yO1xuXG4gICAgICBpZiAodGhpcy5tYXAgJiYgdGhpcy5tYXAuaXNUZXh0dXJlID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IG1hcCA9IHJlZk1hcC5jb250ZXh0KHsgZ2V0VVY6ICgpID0+IHRoaXMuX2FuaW1hdGVkVVZOb2RlIH0pO1xuICAgICAgICB0ZW1wQ29sb3JOb2RlID0gdGVtcENvbG9yTm9kZS5tdWwobWFwKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jb2xvck5vZGUgPSB0ZW1wQ29sb3JOb2RlO1xuICAgIH1cblxuICAgIC8vIE1Ub29uIG11c3QgaWdub3JlIHZlcnRleCBjb2xvciBieSBzcGVjXG4gICAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vdnJtLWMvdnJtLXNwZWNpZmljYXRpb24vYmxvYi80MmMwYTkwZTZiNGI3MTAzNTI1Njk5NzhmMTQ5ODBlOWZjOTRiMjVkL3NwZWNpZmljYXRpb24vVlJNQ19tYXRlcmlhbHNfbXRvb24tMS4wL1JFQURNRS5tZCN2ZXJ0ZXgtY29sb3JzXG4gICAgaWYgKHRoaXMudmVydGV4Q29sb3JzID09PSB0cnVlICYmIGJ1aWxkZXIuZ2VvbWV0cnkuaGFzQXR0cmlidXRlKCdjb2xvcicpKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICdNVG9vbk5vZGVNYXRlcmlhbDogTVRvb24gaWdub3JlcyB2ZXJ0ZXggY29sb3JzLiBDb25zaWRlciB1c2luZyBhIG1vZGVsIHdpdGhvdXQgdmVydGV4IGNvbG9ycyBpbnN0ZWFkLicsXG4gICAgICApO1xuICAgICAgdGhpcy52ZXJ0ZXhDb2xvcnMgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyB0aGUgb3JkaW5hcnkgZGlmZnVzZUNvbG9yIHNldHVwXG4gICAgc3VwZXIuc2V0dXBEaWZmdXNlQ29sb3IoYnVpbGRlcik7XG5cbiAgICAvLyBDT01QQVQ6IHByZS1yMTY2XG4gICAgLy8gU2V0IGFscGhhIHRvIDEgaWYgaXQgaXMgb3BhcXVlXG4gICAgLy8gQWRkcmVzc2VkIGluIFRocmVlLmpzIHIxNjYgYnV0IHdlIGxlYXZlIGl0IGhlcmUgZm9yIGNvbXBhdGliaWxpdHlcbiAgICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvcHVsbC8yODY0NlxuICAgIGlmIChwYXJzZUludChUSFJFRS5SRVZJU0lPTiwgMTApIDwgMTY2KSB7XG4gICAgICBpZiAodGhpcy50cmFuc3BhcmVudCA9PT0gZmFsc2UgJiYgdGhpcy5ibGVuZGluZyA9PT0gVEhSRUUuTm9ybWFsQmxlbmRpbmcgJiYgdGhpcy5hbHBoYVRvQ292ZXJhZ2UgPT09IGZhbHNlKSB7XG4gICAgICAgIGRpZmZ1c2VDb2xvci5hLmFzc2lnbigxLjApO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHJldmVydCB0aGUgY29sb3JOb2RlXG4gICAgaWYgKHRoaXMuY29sb3JOb2RlID09PSB0ZW1wQ29sb3JOb2RlKSB7XG4gICAgICB0aGlzLmNvbG9yTm9kZSA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldHVwVmFyaWFudHMoKTogdm9pZCB7XG4gICAgc2hhZGVDb2xvci5hc3NpZ24odGhpcy5fc2V0dXBTaGFkZUNvbG9yTm9kZSgpKTtcbiAgICBzaGFkaW5nU2hpZnQuYXNzaWduKHRoaXMuX3NldHVwU2hhZGluZ1NoaWZ0Tm9kZSgpKTtcbiAgICBzaGFkaW5nVG9vbnkuYXNzaWduKHRoaXMuX3NldHVwU2hhZGluZ1Rvb255Tm9kZSgpKTtcbiAgICByaW1MaWdodGluZ01peC5hc3NpZ24odGhpcy5fc2V0dXBSaW1MaWdodGluZ01peE5vZGUoKSk7XG4gICAgcmltTXVsdGlwbHkuYXNzaWduKHRoaXMuX3NldHVwUmltTXVsdGlwbHlOb2RlKCkpO1xuICAgIG1hdGNhcC5hc3NpZ24odGhpcy5fc2V0dXBNYXRjYXBOb2RlKCkpO1xuICAgIHBhcmFtZXRyaWNSaW0uYXNzaWduKHRoaXMuX3NldHVwUGFyYW1ldHJpY1JpbU5vZGUoKSk7XG4gIH1cblxuICBwdWJsaWMgc2V0dXBOb3JtYWwoKTogU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPjtcbiAgcHVibGljIHNldHVwTm9ybWFsKGJ1aWxkZXI/OiBUSFJFRS5Ob2RlQnVpbGRlcik6IFNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT47XG4gIHB1YmxpYyBzZXR1cE5vcm1hbChidWlsZGVyPzogVEhSRUUuTm9kZUJ1aWxkZXIpOiBTaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+IHtcbiAgICAvLyB3ZSBtdXN0IGFwcGx5IHV2IHNjcm9sbCB0byB0aGUgbm9ybWFsTWFwXG4gICAgLy8gdGhpcy5ub3JtYWxOb2RlIHdpbGwgYmUgdXNlZCBpbiBzdXBlci5zZXR1cE5vcm1hbCgpIHNvIHdlIHRlbXBvcmFyaWx5IHJlcGxhY2UgaXRcbiAgICBjb25zdCB0ZW1wTm9ybWFsTm9kZSA9IHRoaXMubm9ybWFsTm9kZTtcblxuICAgIGlmICh0aGlzLm5vcm1hbE5vZGUgPT0gbnVsbCkge1xuICAgICAgdGhpcy5ub3JtYWxOb2RlID0gbWF0ZXJpYWxOb3JtYWw7XG5cbiAgICAgIGlmICh0aGlzLm5vcm1hbE1hcCAmJiB0aGlzLm5vcm1hbE1hcC5pc1RleHR1cmUgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3QgbWFwID0gcmVmTm9ybWFsTWFwLmNvbnRleHQoeyBnZXRVVjogKCkgPT4gdGhpcy5fYW5pbWF0ZWRVVk5vZGUgfSk7XG4gICAgICAgIHRoaXMubm9ybWFsTm9kZSA9IG5vcm1hbE1hcChtYXAsIHJlZk5vcm1hbFNjYWxlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuaXNPdXRsaW5lKSB7XG4gICAgICAgIC8vIFNlZSBhYm91dCB0aGUgdHlwZSBhc3NlcnRpb246IGh0dHBzOi8vZ2l0aHViLmNvbS90aHJlZS10eXBlcy90aHJlZS10cy10eXBlcy9wdWxsLzExMjNcbiAgICAgICAgdGhpcy5ub3JtYWxOb2RlID0gKHRoaXMubm9ybWFsTm9kZSBhcyBTaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+KS5uZWdhdGUoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDT01QQVQgcjE2ODogYHNldHVwTm9ybWFsYCBub3cgcmV0dXJucyB0aGUgbm9ybWFsIG5vZGVcbiAgICAvLyBpbnN0ZWFkIG9mIGFzc2lnbmluZyBpbnNpZGUgdGhlIGBzdXBlci5zZXR1cE5vcm1hbGBcbiAgICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvcHVsbC8yOTEzN1xuICAgIGNvbnN0IHRocmVlUmV2aXNpb24gPSBwYXJzZUludChUSFJFRS5SRVZJU0lPTiwgMTApO1xuICAgIGlmICh0aHJlZVJldmlzaW9uID49IDE2OCkge1xuICAgICAgY29uc3QgcmV0ID0gdGhpcy5ub3JtYWxOb2RlIGFzIFNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT47XG5cbiAgICAgIC8vIHJldmVydCB0aGUgbm9ybWFsTm9kZVxuICAgICAgdGhpcy5ub3JtYWxOb2RlID0gdGVtcE5vcm1hbE5vZGU7XG5cbiAgICAgIHJldHVybiByZXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHByZS1yMTY4XG4gICAgICAvLyB0aGUgb3JkaW5hcnkgbm9ybWFsIHNldHVwXG5cbiAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgdHlwZSB3b3JrYXJvdW5kIGZvciBwcmUtcjE2OFxuICAgICAgc3VwZXIuc2V0dXBOb3JtYWwoYnVpbGRlcik7XG5cbiAgICAgIC8vIHJldmVydCB0aGUgbm9ybWFsTm9kZVxuICAgICAgdGhpcy5ub3JtYWxOb2RlID0gdGVtcE5vcm1hbE5vZGU7XG5cbiAgICAgIC8vIHR5cGUgd29ya2Fyb3VuZDogcHJldGVuZCB0byByZXR1cm4gYSB2YWxpZCB2YWx1ZVxuICAgICAgLy8gcjE2NyBkb2Vzbid0IHVzZSB0aGUgcmV0dXJuIHZhbHVlIGFueXdheVxuICAgICAgcmV0dXJuIHVuZGVmaW5lZCBhcyBhbnk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldHVwTGlnaHRpbmcoYnVpbGRlcjogVEhSRUUuTm9kZUJ1aWxkZXIpOiBUSFJFRS5Ob2RlIHtcbiAgICAvLyB3ZSBtdXN0IGFwcGx5IHV2IHNjcm9sbCB0byB0aGUgZW1pc3NpdmVNYXBcbiAgICAvLyB0aGlzLmVtaXNzaXZlTm9kZSB3aWxsIGJlIHVzZWQgaW4gc3VwZXIuc2V0dXBMaWdodGluZygpIHNvIHdlIHRlbXBvcmFyaWx5IHJlcGxhY2UgaXRcbiAgICBsZXQgdGVtcEVtaXNzaXZlTm9kZTogU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPiB8IG51bGwgPSBudWxsO1xuXG4gICAgaWYgKHRoaXMuZW1pc3NpdmVOb2RlID09IG51bGwpIHtcbiAgICAgIHRlbXBFbWlzc2l2ZU5vZGUgPSByZWZFbWlzc2l2ZS5tdWwocmVmRW1pc3NpdmVJbnRlbnNpdHkpO1xuXG4gICAgICBpZiAodGhpcy5lbWlzc2l2ZU1hcCAmJiB0aGlzLmVtaXNzaXZlTWFwLmlzVGV4dHVyZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBtYXAgPSByZWZFbWlzc2l2ZU1hcC5jb250ZXh0KHsgZ2V0VVY6ICgpID0+IHRoaXMuX2FuaW1hdGVkVVZOb2RlIH0pO1xuICAgICAgICB0ZW1wRW1pc3NpdmVOb2RlID0gdGVtcEVtaXNzaXZlTm9kZS5tdWwobWFwKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5lbWlzc2l2ZU5vZGUgPSB0ZW1wRW1pc3NpdmVOb2RlO1xuICAgIH1cblxuICAgIC8vIHRoZSBvcmRpbmFyeSBsaWdodGluZyBzZXR1cFxuICAgIGNvbnN0IHJldCA9IHN1cGVyLnNldHVwTGlnaHRpbmcoYnVpbGRlcik7XG5cbiAgICAvLyByZXZlcnQgdGhlIGVtaXNzaXZlTm9kZVxuICAgIGlmICh0aGlzLmVtaXNzaXZlTm9kZSA9PT0gdGVtcEVtaXNzaXZlTm9kZSkge1xuICAgICAgdGhpcy5lbWlzc2l2ZU5vZGUgPSBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICBwdWJsaWMgc2V0dXBPdXRwdXQoXG4gICAgYnVpbGRlcjogVEhSRUUuTm9kZUJ1aWxkZXIsXG4gICAgb3V0cHV0Tm9kZTogU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPixcbiAgKTogU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPiB7XG4gICAgLy8gbWl4IG9yIHNldCBvdXRsaW5lIGNvbG9yXG4gICAgaWYgKHRoaXMuaXNPdXRsaW5lICYmIHRoaXMub3V0bGluZVdpZHRoTW9kZSAhPT0gTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUuTm9uZSkge1xuICAgICAgb3V0cHV0Tm9kZSA9IHZlYzQoXG4gICAgICAgIG1peChyZWZPdXRsaW5lQ29sb3JGYWN0b3IsIG91dHB1dE5vZGUueHl6Lm11bChyZWZPdXRsaW5lQ29sb3JGYWN0b3IpLCByZWZPdXRsaW5lTGlnaHRpbmdNaXhGYWN0b3IpLFxuICAgICAgICBvdXRwdXROb2RlLncsXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIHRoZSBvcmRpbmFyeSBvdXRwdXQgc2V0dXBcbiAgICByZXR1cm4gc3VwZXIuc2V0dXBPdXRwdXQoYnVpbGRlciwgb3V0cHV0Tm9kZSkgYXMgU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPjtcbiAgfVxuXG4gIHB1YmxpYyBzZXR1cFBvc2l0aW9uKGJ1aWxkZXI6IFRIUkVFLk5vZGVCdWlsZGVyKTogU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPiB7XG4gICAgLy8gd2UgbXVzdCBhcHBseSBvdXRsaW5lIHBvc2l0aW9uIG9mZnNldFxuICAgIC8vIHRoaXMucG9zaXRpb25Ob2RlIHdpbGwgYmUgdXNlZCBpbiBzdXBlci5zZXR1cFBvc2l0aW9uKCkgc28gd2UgdGVtcG9yYXJpbHkgcmVwbGFjZSBpdFxuICAgIGNvbnN0IHRlbXBQb3NpdGlvbk5vZGUgPSB0aGlzLnBvc2l0aW9uTm9kZTtcblxuICAgIGlmICh0aGlzLmlzT3V0bGluZSAmJiB0aGlzLm91dGxpbmVXaWR0aE1vZGUgIT09IE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlLk5vbmUpIHtcbiAgICAgIHRoaXMucG9zaXRpb25Ob2RlID8/PSBwb3NpdGlvbkxvY2FsO1xuXG4gICAgICBjb25zdCBub3JtYWxMb2NhbE5vcm1hbGl6ZWQgPSBub3JtYWxMb2NhbC5ub3JtYWxpemUoKTtcblxuICAgICAgbGV0IHdpZHRoOiBTaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+ID0gcmVmT3V0bGluZVdpZHRoRmFjdG9yO1xuXG4gICAgICBpZiAodGhpcy5vdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmUgJiYgdGhpcy5vdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmUuaXNUZXh0dXJlID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IG1hcCA9IHJlZk91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZS5jb250ZXh0KHsgZ2V0VVY6ICgpID0+IHRoaXMuX2FuaW1hdGVkVVZOb2RlIH0pO1xuICAgICAgICB3aWR0aCA9IHdpZHRoLm11bChtYXApO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB3b3JsZE5vcm1hbExlbmd0aCA9IGxlbmd0aChtb2RlbE5vcm1hbE1hdHJpeC5tdWwobm9ybWFsTG9jYWxOb3JtYWxpemVkKSk7XG4gICAgICBjb25zdCBvdXRsaW5lT2Zmc2V0ID0gd2lkdGgubXVsKHdvcmxkTm9ybWFsTGVuZ3RoKS5tdWwobm9ybWFsTG9jYWxOb3JtYWxpemVkKTtcblxuICAgICAgaWYgKHRoaXMub3V0bGluZVdpZHRoTW9kZSA9PT0gTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUuV29ybGRDb29yZGluYXRlcykge1xuICAgICAgICAvLyBTZWUgYWJvdXQgdGhlIHR5cGUgYXNzZXJ0aW9uOiBodHRwczovL2dpdGh1Yi5jb20vdGhyZWUtdHlwZXMvdGhyZWUtdHMtdHlwZXMvcHVsbC8xMTIzXG4gICAgICAgIHRoaXMucG9zaXRpb25Ob2RlID0gKHRoaXMucG9zaXRpb25Ob2RlIGFzIFNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT4pLmFkZChvdXRsaW5lT2Zmc2V0KTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5vdXRsaW5lV2lkdGhNb2RlID09PSBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZS5TY3JlZW5Db29yZGluYXRlcykge1xuICAgICAgICBjb25zdCBjbGlwU2NhbGUgPSBjYW1lcmFQcm9qZWN0aW9uTWF0cml4LmVsZW1lbnQoMSkuZWxlbWVudCgxKTtcblxuICAgICAgICAvLyBXZSBjYW4ndCB1c2UgYHBvc2l0aW9uVmlld2AgaW4gYHNldHVwUG9zaXRpb25gXG4gICAgICAgIC8vIGJlY2F1c2UgdXNpbmcgYHBvc2l0aW9uVmlld2AgaGVyZSB3aWxsIG1ha2UgaXQgY2FsY3VsYXRlIHRoZSBgcG9zaXRpb25WaWV3YCBlYXJsaWVyXG4gICAgICAgIC8vIGFuZCBpdCB3b24ndCBiZSBjYWxjdWxhdGVkIGFnYWluIGFmdGVyIHNldHRpbmcgdGhlIGBwb3NpdGlvbk5vZGVgXG4gICAgICAgIGNvbnN0IHRlbXBQb3NpdGlvblZpZXcgPSBtb2RlbFZpZXdNYXRyaXgubXVsKHBvc2l0aW9uTG9jYWwpO1xuXG4gICAgICAgIC8vIFNlZSBhYm91dCB0aGUgdHlwZSBhc3NlcnRpb246IGh0dHBzOi8vZ2l0aHViLmNvbS90aHJlZS10eXBlcy90aHJlZS10cy10eXBlcy9wdWxsLzExMjNcbiAgICAgICAgdGhpcy5wb3NpdGlvbk5vZGUgPSAodGhpcy5wb3NpdGlvbk5vZGUgYXMgU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPikuYWRkKFxuICAgICAgICAgIG91dGxpbmVPZmZzZXQuZGl2KGNsaXBTY2FsZSkubXVsKHRlbXBQb3NpdGlvblZpZXcuei5uZWdhdGUoKSksXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucG9zaXRpb25Ob2RlID8/PSBwb3NpdGlvbkxvY2FsO1xuICAgIH1cblxuICAgIC8vIHRoZSBvcmRpbmFyeSBwb3NpdGlvbiBzZXR1cFxuICAgIGNvbnN0IHJldCA9IHN1cGVyLnNldHVwUG9zaXRpb24oYnVpbGRlcikgYXMgU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPjtcblxuICAgIC8vIGFudGkgei1maWdodGluZ1xuICAgIC8vIFRPRE86IFdlIG1pZ2h0IHdhbnQgdG8gYWRkcmVzcyB0aGlzIHZpYSBnbFBvbHlnb25PZmZzZXQgaW5zdGVhZD9cbiAgICByZXQuei5hZGQocmV0LncubXVsKDFlLTYpKTtcblxuICAgIC8vIHJldmVydCB0aGUgcG9zaXRpb25Ob2RlXG4gICAgdGhpcy5wb3NpdGlvbk5vZGUgPSB0ZW1wUG9zaXRpb25Ob2RlO1xuXG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIHB1YmxpYyBjb3B5KHNvdXJjZTogTVRvb25Ob2RlTWF0ZXJpYWwpOiB0aGlzIHtcbiAgICB0aGlzLmNvbG9yLmNvcHkoc291cmNlLmNvbG9yKTtcbiAgICB0aGlzLm1hcCA9IHNvdXJjZS5tYXAgPz8gbnVsbDtcbiAgICB0aGlzLmVtaXNzaXZlLmNvcHkoc291cmNlLmVtaXNzaXZlKTtcbiAgICB0aGlzLmVtaXNzaXZlSW50ZW5zaXR5ID0gc291cmNlLmVtaXNzaXZlSW50ZW5zaXR5O1xuICAgIHRoaXMuZW1pc3NpdmVNYXAgPSBzb3VyY2UuZW1pc3NpdmVNYXAgPz8gbnVsbDtcbiAgICB0aGlzLm5vcm1hbE1hcCA9IHNvdXJjZS5ub3JtYWxNYXAgPz8gbnVsbDtcbiAgICB0aGlzLm5vcm1hbFNjYWxlLmNvcHkoc291cmNlLm5vcm1hbFNjYWxlKTtcblxuICAgIHRoaXMuc2hhZGVDb2xvckZhY3Rvci5jb3B5KHNvdXJjZS5zaGFkZUNvbG9yRmFjdG9yKTtcbiAgICB0aGlzLnNoYWRlTXVsdGlwbHlUZXh0dXJlID0gc291cmNlLnNoYWRlTXVsdGlwbHlUZXh0dXJlID8/IG51bGw7XG4gICAgdGhpcy5zaGFkaW5nU2hpZnRGYWN0b3IgPSBzb3VyY2Uuc2hhZGluZ1NoaWZ0RmFjdG9yO1xuICAgIHRoaXMuc2hhZGluZ1NoaWZ0VGV4dHVyZSA9IHNvdXJjZS5zaGFkaW5nU2hpZnRUZXh0dXJlID8/IG51bGw7XG4gICAgdGhpcy5zaGFkaW5nU2hpZnRUZXh0dXJlU2NhbGUgPSBzb3VyY2Uuc2hhZGluZ1NoaWZ0VGV4dHVyZVNjYWxlO1xuICAgIHRoaXMuc2hhZGluZ1Rvb255RmFjdG9yID0gc291cmNlLnNoYWRpbmdUb29ueUZhY3RvcjtcbiAgICB0aGlzLnJpbUxpZ2h0aW5nTWl4RmFjdG9yID0gc291cmNlLnJpbUxpZ2h0aW5nTWl4RmFjdG9yO1xuICAgIHRoaXMucmltTXVsdGlwbHlUZXh0dXJlID0gc291cmNlLnJpbU11bHRpcGx5VGV4dHVyZSA/PyBudWxsO1xuICAgIHRoaXMubWF0Y2FwRmFjdG9yLmNvcHkoc291cmNlLm1hdGNhcEZhY3Rvcik7XG4gICAgdGhpcy5tYXRjYXBUZXh0dXJlID0gc291cmNlLm1hdGNhcFRleHR1cmUgPz8gbnVsbDtcbiAgICB0aGlzLnBhcmFtZXRyaWNSaW1Db2xvckZhY3Rvci5jb3B5KHNvdXJjZS5wYXJhbWV0cmljUmltQ29sb3JGYWN0b3IpO1xuICAgIHRoaXMucGFyYW1ldHJpY1JpbUxpZnRGYWN0b3IgPSBzb3VyY2UucGFyYW1ldHJpY1JpbUxpZnRGYWN0b3I7XG4gICAgdGhpcy5wYXJhbWV0cmljUmltRnJlc25lbFBvd2VyRmFjdG9yID0gc291cmNlLnBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJGYWN0b3I7XG4gICAgdGhpcy5vdXRsaW5lV2lkdGhNb2RlID0gc291cmNlLm91dGxpbmVXaWR0aE1vZGU7XG4gICAgdGhpcy5vdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmUgPSBzb3VyY2Uub3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlID8/IG51bGw7XG4gICAgdGhpcy5vdXRsaW5lV2lkdGhGYWN0b3IgPSBzb3VyY2Uub3V0bGluZVdpZHRoRmFjdG9yO1xuICAgIHRoaXMub3V0bGluZUNvbG9yRmFjdG9yLmNvcHkoc291cmNlLm91dGxpbmVDb2xvckZhY3Rvcik7XG4gICAgdGhpcy5vdXRsaW5lTGlnaHRpbmdNaXhGYWN0b3IgPSBzb3VyY2Uub3V0bGluZUxpZ2h0aW5nTWl4RmFjdG9yO1xuICAgIHRoaXMudXZBbmltYXRpb25TY3JvbGxYU3BlZWRGYWN0b3IgPSBzb3VyY2UudXZBbmltYXRpb25TY3JvbGxYU3BlZWRGYWN0b3I7XG4gICAgdGhpcy51dkFuaW1hdGlvblNjcm9sbFlTcGVlZEZhY3RvciA9IHNvdXJjZS51dkFuaW1hdGlvblNjcm9sbFlTcGVlZEZhY3RvcjtcbiAgICB0aGlzLnV2QW5pbWF0aW9uUm90YXRpb25TcGVlZEZhY3RvciA9IHNvdXJjZS51dkFuaW1hdGlvblJvdGF0aW9uU3BlZWRGYWN0b3I7XG4gICAgdGhpcy51dkFuaW1hdGlvbk1hc2tUZXh0dXJlID0gc291cmNlLnV2QW5pbWF0aW9uTWFza1RleHR1cmUgPz8gbnVsbDtcblxuICAgIHRoaXMuc2hhZGVDb2xvck5vZGUgPSBzb3VyY2Uuc2hhZGVDb2xvck5vZGUgPz8gbnVsbDtcbiAgICB0aGlzLnNoYWRpbmdTaGlmdE5vZGUgPSBzb3VyY2Uuc2hhZGluZ1NoaWZ0Tm9kZSA/PyBudWxsO1xuICAgIHRoaXMuc2hhZGluZ1Rvb255Tm9kZSA9IHNvdXJjZS5zaGFkaW5nVG9vbnlOb2RlID8/IG51bGw7XG4gICAgdGhpcy5yaW1MaWdodGluZ01peE5vZGUgPSBzb3VyY2UucmltTGlnaHRpbmdNaXhOb2RlID8/IG51bGw7XG4gICAgdGhpcy5yaW1NdWx0aXBseU5vZGUgPSBzb3VyY2UucmltTXVsdGlwbHlOb2RlID8/IG51bGw7XG4gICAgdGhpcy5tYXRjYXBOb2RlID0gc291cmNlLm1hdGNhcE5vZGUgPz8gbnVsbDtcbiAgICB0aGlzLnBhcmFtZXRyaWNSaW1Db2xvck5vZGUgPSBzb3VyY2UucGFyYW1ldHJpY1JpbUNvbG9yTm9kZSA/PyBudWxsO1xuICAgIHRoaXMucGFyYW1ldHJpY1JpbUxpZnROb2RlID0gc291cmNlLnBhcmFtZXRyaWNSaW1MaWZ0Tm9kZSA/PyBudWxsO1xuICAgIHRoaXMucGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlck5vZGUgPSBzb3VyY2UucGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlck5vZGUgPz8gbnVsbDtcblxuICAgIHRoaXMuaXNPdXRsaW5lID0gc291cmNlLmlzT3V0bGluZSA/PyBudWxsO1xuXG4gICAgcmV0dXJuIHN1cGVyLmNvcHkoc291cmNlKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMudXZBbmltYXRpb25TY3JvbGxYT2Zmc2V0ICs9IGRlbHRhICogdGhpcy51dkFuaW1hdGlvblNjcm9sbFhTcGVlZEZhY3RvcjtcbiAgICB0aGlzLnV2QW5pbWF0aW9uU2Nyb2xsWU9mZnNldCArPSBkZWx0YSAqIHRoaXMudXZBbmltYXRpb25TY3JvbGxZU3BlZWRGYWN0b3I7XG4gICAgdGhpcy51dkFuaW1hdGlvblJvdGF0aW9uUGhhc2UgKz0gZGVsdGEgKiB0aGlzLnV2QW5pbWF0aW9uUm90YXRpb25TcGVlZEZhY3RvcjtcbiAgfVxuXG4gIHByaXZhdGUgX3NldHVwU2hhZGVDb2xvck5vZGUoKTogU3dpenphYmxlIHtcbiAgICBpZiAodGhpcy5zaGFkZUNvbG9yTm9kZSAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gdmVjMyh0aGlzLnNoYWRlQ29sb3JOb2RlKTtcbiAgICB9XG5cbiAgICBsZXQgc2hhZGVDb2xvck5vZGU6IFNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT4gPSByZWZTaGFkZUNvbG9yRmFjdG9yO1xuXG4gICAgaWYgKHRoaXMuc2hhZGVNdWx0aXBseVRleHR1cmUgJiYgdGhpcy5zaGFkZU11bHRpcGx5VGV4dHVyZS5pc1RleHR1cmUgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IG1hcCA9IHJlZlNoYWRlTXVsdGlwbHlUZXh0dXJlLmNvbnRleHQoeyBnZXRVVjogKCkgPT4gdGhpcy5fYW5pbWF0ZWRVVk5vZGUgfSk7XG4gICAgICBzaGFkZUNvbG9yTm9kZSA9IHNoYWRlQ29sb3JOb2RlLm11bChtYXApO1xuICAgIH1cblxuICAgIHJldHVybiBzaGFkZUNvbG9yTm9kZTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldHVwU2hhZGluZ1NoaWZ0Tm9kZSgpOiBUSFJFRS5Ob2RlIHtcbiAgICBpZiAodGhpcy5zaGFkaW5nU2hpZnROb2RlICE9IG51bGwpIHtcbiAgICAgIHJldHVybiBmbG9hdCh0aGlzLnNoYWRpbmdTaGlmdE5vZGUpO1xuICAgIH1cblxuICAgIGxldCBzaGFkaW5nU2hpZnROb2RlOiBTaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+ID0gcmVmU2hhZGluZ1NoaWZ0RmFjdG9yO1xuXG4gICAgaWYgKHRoaXMuc2hhZGluZ1NoaWZ0VGV4dHVyZSAmJiB0aGlzLnNoYWRpbmdTaGlmdFRleHR1cmUuaXNUZXh0dXJlID09PSB0cnVlKSB7XG4gICAgICBjb25zdCBtYXAgPSByZWZTaGFkZU11bHRpcGx5VGV4dHVyZS5jb250ZXh0KHsgZ2V0VVY6ICgpID0+IHRoaXMuX2FuaW1hdGVkVVZOb2RlIH0pO1xuICAgICAgc2hhZGluZ1NoaWZ0Tm9kZSA9IHNoYWRpbmdTaGlmdE5vZGUuYWRkKG1hcC5tdWwocmVmU2hhZGVNdWx0aXBseVRleHR1cmVTY2FsZSkpO1xuICAgIH1cblxuICAgIHJldHVybiBzaGFkaW5nU2hpZnROb2RlO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0dXBTaGFkaW5nVG9vbnlOb2RlKCk6IFRIUkVFLk5vZGUge1xuICAgIGlmICh0aGlzLnNoYWRpbmdUb29ueU5vZGUgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGZsb2F0KHRoaXMuc2hhZGluZ1Rvb255Tm9kZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlZlNoYWRpbmdUb29ueUZhY3RvcjtcbiAgfVxuXG4gIHByaXZhdGUgX3NldHVwUmltTGlnaHRpbmdNaXhOb2RlKCk6IFRIUkVFLk5vZGUge1xuICAgIGlmICh0aGlzLnJpbUxpZ2h0aW5nTWl4Tm9kZSAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gZmxvYXQodGhpcy5yaW1MaWdodGluZ01peE5vZGUpO1xuICAgIH1cblxuICAgIHJldHVybiByZWZSaW1MaWdodGluZ01peEZhY3RvcjtcbiAgfVxuXG4gIHByaXZhdGUgX3NldHVwUmltTXVsdGlwbHlOb2RlKCk6IFN3aXp6YWJsZSB7XG4gICAgaWYgKHRoaXMucmltTXVsdGlwbHlOb2RlICE9IG51bGwpIHtcbiAgICAgIHJldHVybiB2ZWMzKHRoaXMucmltTXVsdGlwbHlOb2RlKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5yaW1NdWx0aXBseVRleHR1cmUgJiYgdGhpcy5yaW1NdWx0aXBseVRleHR1cmUuaXNUZXh0dXJlID09PSB0cnVlKSB7XG4gICAgICBjb25zdCBtYXAgPSByZWZSaW1NdWx0aXBseVRleHR1cmUuY29udGV4dCh7IGdldFVWOiAoKSA9PiB0aGlzLl9hbmltYXRlZFVWTm9kZSB9KTtcbiAgICAgIHJldHVybiBtYXA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZlYzMoMS4wKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldHVwTWF0Y2FwTm9kZSgpOiBTd2l6emFibGUge1xuICAgIGlmICh0aGlzLm1hdGNhcE5vZGUgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHZlYzModGhpcy5tYXRjYXBOb2RlKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5tYXRjYXBUZXh0dXJlICYmIHRoaXMubWF0Y2FwVGV4dHVyZS5pc1RleHR1cmUgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IG1hcCA9IHJlZk1hdGNhcFRleHR1cmUuY29udGV4dCh7IGdldFVWOiAoKSA9PiBtYXRjYXBVVi5tdWwoMS4wLCAtMS4wKS5hZGQoMC4wLCAxLjApIH0pO1xuICAgICAgcmV0dXJuIG1hcC5tdWwocmVmTWF0Y2FwRmFjdG9yKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmVjMygwLjApO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0dXBQYXJhbWV0cmljUmltTm9kZSgpOiBTd2l6emFibGUge1xuICAgIGNvbnN0IHBhcmFtZXRyaWNSaW1Db2xvciA9XG4gICAgICB0aGlzLnBhcmFtZXRyaWNSaW1Db2xvck5vZGUgIT0gbnVsbCA/IHZlYzModGhpcy5wYXJhbWV0cmljUmltQ29sb3JOb2RlKSA6IHJlZlBhcmFtZXRyaWNSaW1Db2xvckZhY3RvcjtcblxuICAgIGNvbnN0IHBhcmFtZXRyaWNSaW1MaWZ0ID1cbiAgICAgIHRoaXMucGFyYW1ldHJpY1JpbUxpZnROb2RlICE9IG51bGwgPyBmbG9hdCh0aGlzLnBhcmFtZXRyaWNSaW1MaWZ0Tm9kZSkgOiByZWZQYXJhbWV0cmljUmltTGlmdEZhY3RvcjtcblxuICAgIGNvbnN0IHBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXIgPVxuICAgICAgdGhpcy5wYXJhbWV0cmljUmltRnJlc25lbFBvd2VyTm9kZSAhPSBudWxsXG4gICAgICAgID8gZmxvYXQodGhpcy5wYXJhbWV0cmljUmltRnJlc25lbFBvd2VyTm9kZSlcbiAgICAgICAgOiByZWZQYXJhbWV0cmljUmltRnJlc25lbFBvd2VyRmFjdG9yO1xuXG4gICAgcmV0dXJuIG10b29uUGFyYW1ldHJpY1JpbSh7XG4gICAgICBwYXJhbWV0cmljUmltTGlmdCxcbiAgICAgIHBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXIsXG4gICAgICBwYXJhbWV0cmljUmltQ29sb3IsXG4gICAgfSk7XG4gIH1cbn1cblxuLy8gVE9ETzogUGFydCBvZiBzdHVmZiB0aGF0IE1Ub29uTWF0ZXJpYWwgZGVwZW5kcyBvbiBkb2VzIG5vdCBleGlzdCBpbiB0aHJlZS93ZWJncHUgKGUuZy4gVW5pZm9ybXNMaWIpXG4vLyBUSFJFRS5hZGROb2RlTWF0ZXJpYWwoJ01Ub29uTm9kZU1hdGVyaWFsJywgTVRvb25Ob2RlTWF0ZXJpYWwpO1xuIiwgIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiAqL1xuXG5leHBvcnQgY29uc3QgTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUgPSB7XG4gIE5vbmU6ICdub25lJyxcbiAgV29ybGRDb29yZGluYXRlczogJ3dvcmxkQ29vcmRpbmF0ZXMnLFxuICBTY3JlZW5Db29yZGluYXRlczogJ3NjcmVlbkNvb3JkaW5hdGVzJyxcbn0gYXMgY29uc3Q7XG5cbmV4cG9ydCB0eXBlIE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlID1cbiAgKHR5cGVvZiBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZSlba2V5b2YgdHlwZW9mIE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlXTtcbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS93ZWJncHUnO1xuaW1wb3J0IHsgZmxvYXQsIG1vZGVsVmlld1Bvc2l0aW9uLCB0cmFuc2Zvcm1lZE5vcm1hbFZpZXcgfSBmcm9tICd0aHJlZS90c2wnO1xuaW1wb3J0IHsgRm5Db21wYXQgfSBmcm9tICcuL3V0aWxzL0ZuQ29tcGF0JztcblxuZXhwb3J0IGNvbnN0IG10b29uUGFyYW1ldHJpY1JpbSA9IEZuQ29tcGF0KFxuICAoe1xuICAgIHBhcmFtZXRyaWNSaW1MaWZ0LFxuICAgIHBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXIsXG4gICAgcGFyYW1ldHJpY1JpbUNvbG9yLFxuICB9OiB7XG4gICAgcGFyYW1ldHJpY1JpbUxpZnQ6IFRIUkVFLlRTTC5PcGVyYXRvck5vZGVQYXJhbWV0ZXI7XG4gICAgcGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlcjogVEhSRUUuVFNMLk9wZXJhdG9yTm9kZVBhcmFtZXRlcjtcbiAgICBwYXJhbWV0cmljUmltQ29sb3I6IFRIUkVFLlRTTC5PcGVyYXRvck5vZGVQYXJhbWV0ZXI7XG4gIH0pID0+IHtcbiAgICBjb25zdCB2aWV3RGlyID0gbW9kZWxWaWV3UG9zaXRpb24ubm9ybWFsaXplKCk7XG4gICAgY29uc3QgZG90TlYgPSB0cmFuc2Zvcm1lZE5vcm1hbFZpZXcuZG90KHZpZXdEaXIubmVnYXRlKCkpO1xuXG4gICAgY29uc3QgcmltID0gZmxvYXQoMS4wKS5zdWIoZG90TlYpLmFkZChwYXJhbWV0cmljUmltTGlmdCkuY2xhbXAoKS5wb3cocGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlcik7XG5cbiAgICByZXR1cm4gcmltLm11bChwYXJhbWV0cmljUmltQ29sb3IpO1xuICB9LFxuKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7QUFHQSxZQUFZLFdBQVc7QUFFdkIsSUFBTSxnQkFBZ0IsU0FBZSxnQkFBVSxFQUFFO0FBQ2pELElBQUksZ0JBQWdCLEtBQUs7QUFDdkIsVUFBUTtBQUFBLElBQ04sc0VBQXNFLGFBQWE7QUFBQSxFQUNyRjtBQUNGOzs7QUNWQSxZQUFZQSxZQUFXO0FBQ3ZCLFNBQVMsS0FBSyxNQUF3QixLQUFnQixJQUFJLE1BQU0sWUFBWTs7O0FDRDVFLFNBQVMseUJBQXlCO0FBRTNCLElBQU0sV0FBVyxrQkFBa0IsU0FBUyxPQUFPO0FBQ25ELElBQU0sU0FBUyxrQkFBa0IsT0FBTyxTQUFTO0FBQ2pELElBQU0sZUFBZSxrQkFBa0IsYUFBYSxTQUFTO0FBQzdELElBQU0saUJBQWlCLGtCQUFrQixlQUFlLE1BQU07QUFDOUQsSUFBTSxjQUFjLGtCQUFrQixZQUFZLE9BQU87QUFDekQsSUFBTSx1QkFBdUIsa0JBQWtCLHFCQUFxQixPQUFPO0FBQzNFLElBQU0saUJBQWlCLGtCQUFrQixlQUFlLFNBQVM7QUFFakUsSUFBTSxzQkFBc0Isa0JBQWtCLG9CQUFvQixPQUFPO0FBQ3pFLElBQU0sd0JBQXdCLGtCQUFrQixzQkFBc0IsT0FBTztBQUM3RSxJQUFNLDBCQUEwQixrQkFBa0Isd0JBQXdCLFNBQVM7QUFDbkYsSUFBTSwrQkFBK0Isa0JBQWtCLDZC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LGlCQUFpQixLQUFLLGNBQWMsY0FBYyxNQUFNO0FBQy9ELFlBQU0sTUFBTSxpQkFBaUIsUUFBUSxFQUFFLE9BQU8sTUFBTSxTQUFTLElBQUksR0FBSyxFQUFJLEVBQUUsSUFBSSxHQUFLLENBQUcsRUFBRSxDQUFDO0FBQzNGLGFBQU8sSUFBSSxJQUFJLGVBQWU7QUFBQSxJQUNoQztBQUVBLFdBQU9BLE1BQUssQ0FBRztBQUFBLEVBQ2pCO0FBQUEsRUFFUSwwQkFBcUM7QUFDM0MsVUFBTSxxQkFDSixLQUFLLDBCQUEwQixPQUFPQSxNQUFLLEtBQUssc0JBQXNCLElBQUk7QUFFNUUsVUFBTSxvQkFDSixLQUFLLHlCQUF5QixPQUFPQyxPQUFNLEtBQUsscUJBQXFCLElBQUk7QUFFM0UsVUFBTSw0QkFDSixLQUFLLGlDQUFpQyxPQUNsQ0EsT0FBTSxLQUFLLDZCQUE2QixJQUN4QztBQUVOLFdBQU8sbUJBQW1CO0FBQUEsTUFDeEI7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFDRjsiLAogICJuYW1lcyI6IFsiVEhSRUUiLCAiVEhSRUUiLCAiVEhSRUUiLCAidGhyZWVSZXZpc2lvbiIsICJUSFJFRSIsICJkaWZmdXNlQ29sb3IiLCAiZmxvYXQiLCAibWl4IiwgInZlYzMiLCAidmVjNCIsICJmbG9hdCIsICJ0cmFuc2Zvcm1lZE5vcm1hbFZpZXciLCAidHJhbnNmb3JtZWROb3JtYWxWaWV3IiwgImZsb2F0IiwgImRpZmZ1c2VDb2xvciIsICJ0aHJlZVJldmlzaW9uIiwgInZlYzQiLCAibWl4IiwgInZlYzMiLCAiZmxvYXQiXQp9Cg==
