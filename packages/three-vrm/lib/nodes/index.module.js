/*!
 * @pixiv/three-vrm v3.0.0-beta.2
 * VRM file loader for three.js.
 *
 * Copyright (c) 2019-2024 pixiv Inc.
 * @pixiv/three-vrm is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */

// ../three-vrm-materials-mtoon/lib/nodes/index.module.js
import * as THREE from "three";
import * as THREE3 from "three/webgpu";
import * as THREE2 from "three/webgpu";
import * as THREE5 from "three/webgpu";
import * as THREE4 from "three/webgpu";
import * as THREE7 from "three/webgpu";
import * as THREE6 from "three/webgpu";
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
export {
  MToonAnimatedUVNode,
  MToonLightingModel,
  MToonNodeMaterial
};
/*!
 * @pixiv/three-vrm-materials-mtoon v3.0.0-beta.2
 * MToon (toon material) module for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2024 pixiv Inc.
 * @pixiv/three-vrm-materials-mtoon is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vdGhyZWUtdnJtLW1hdGVyaWFscy1tdG9vbi9zcmMvbm9kZXMvd2FybmluZ0lmUHJlMTYxLnRzIiwgIi4uLy4uLy4uL3RocmVlLXZybS1tYXRlcmlhbHMtbXRvb24vc3JjL25vZGVzL01Ub29uQW5pbWF0ZWRVVk5vZGUudHMiLCAiLi4vLi4vLi4vdGhyZWUtdnJtLW1hdGVyaWFscy1tdG9vbi9zcmMvbm9kZXMvbWF0ZXJpYWxSZWZlcmVuY2VzLnRzIiwgIi4uLy4uLy4uL3RocmVlLXZybS1tYXRlcmlhbHMtbXRvb24vc3JjL25vZGVzL01Ub29uTGlnaHRpbmdNb2RlbC50cyIsICIuLi8uLi8uLi90aHJlZS12cm0tbWF0ZXJpYWxzLW10b29uL3NyYy9ub2Rlcy9pbW11dGFibGVOb2Rlcy50cyIsICIuLi8uLi8uLi90aHJlZS12cm0tbWF0ZXJpYWxzLW10b29uL3NyYy9ub2Rlcy9NVG9vbk5vZGVNYXRlcmlhbC50cyIsICIuLi8uLi8uLi90aHJlZS12cm0tbWF0ZXJpYWxzLW10b29uL3NyYy9NVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZS50cyIsICIuLi8uLi8uLi90aHJlZS12cm0tbWF0ZXJpYWxzLW10b29uL3NyYy9ub2Rlcy9tdG9vblBhcmFtZXRyaWNSaW0udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIFRoaXMgbW9kdWxlIHdpbGwgYmUgaW1wb3J0ZWQgYXQgdGhlIGJlZ2lubmluZyBvZiBgdGhyZWUtdnJtLW1hdGVyaWFscy1tdG9vbi9ub2Rlc2Bcbi8vIElmIHRoZSB2ZXJzaW9uIG9mIFRocmVlLmpzIGlzIGxlc3MgdGhhbiByMTY3LCBpdCB3aWxsIHdhcm4gdGhhdCBpdCBpcyBub3Qgc3VwcG9ydGVkXG5cbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuY29uc3QgdGhyZWVSZXZpc2lvbiA9IHBhcnNlSW50KFRIUkVFLlJFVklTSU9OLCAxMCk7XG5pZiAodGhyZWVSZXZpc2lvbiA8IDE2Nykge1xuICBjb25zb2xlLndhcm4oXG4gICAgYE1Ub29uTm9kZU1hdGVyaWFsIHJlcXVpcmVzIFRocmVlLmpzIHIxNjcgb3IgaGlnaGVyIChZb3UgYXJlIHVzaW5nIHIke3RocmVlUmV2aXNpb259KS4gVGhpcyB3b3VsZCBub3Qgd29yayBjb3JyZWN0bHkuYCxcbiAgKTtcbn1cbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS93ZWJncHUnO1xuaW1wb3J0IHtcbiAgcmVmVVZBbmltYXRpb25NYXNrVGV4dHVyZSxcbiAgcmVmVVZBbmltYXRpb25Sb3RhdGlvblBoYXNlLFxuICByZWZVVkFuaW1hdGlvblNjcm9sbFhPZmZzZXQsXG4gIHJlZlVWQW5pbWF0aW9uU2Nyb2xsWU9mZnNldCxcbn0gZnJvbSAnLi9tYXRlcmlhbFJlZmVyZW5jZXMnO1xuXG5leHBvcnQgY2xhc3MgTVRvb25BbmltYXRlZFVWTm9kZSBleHRlbmRzIFRIUkVFLlRlbXBOb2RlIHtcbiAgcHVibGljIHJlYWRvbmx5IGhhc01hc2tUZXh0dXJlOiBib29sZWFuO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihoYXNNYXNrVGV4dHVyZTogYm9vbGVhbikge1xuICAgIHN1cGVyKCd2ZWMyJyk7XG5cbiAgICB0aGlzLmhhc01hc2tUZXh0dXJlID0gaGFzTWFza1RleHR1cmU7XG4gIH1cblxuICBwdWJsaWMgc2V0dXAoKTogVEhSRUUuU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5WYXJOb2RlPiB7XG4gICAgbGV0IHV2QW5pbWF0aW9uTWFzazogVEhSRUUuTm9kZVJlcHJlc2VudGF0aW9uID0gMS4wO1xuXG4gICAgaWYgKHRoaXMuaGFzTWFza1RleHR1cmUpIHtcbiAgICAgIHV2QW5pbWF0aW9uTWFzayA9IFRIUkVFLnZlYzQocmVmVVZBbmltYXRpb25NYXNrVGV4dHVyZSkuY29udGV4dCh7IGdldFVWOiAoKSA9PiBUSFJFRS51digpIH0pLnI7XG4gICAgfVxuXG4gICAgbGV0IHV2OiBUSFJFRS5TaGFkZXJOb2RlT2JqZWN0PFRIUkVFLlN3aXp6YWJsZT4gPSBUSFJFRS51digpO1xuXG4gICAgLy8gcm90YXRlXG4gICAgY29uc3QgcGhhc2UgPSByZWZVVkFuaW1hdGlvblJvdGF0aW9uUGhhc2UubXVsKHV2QW5pbWF0aW9uTWFzayk7XG5cbiAgICAvLyBXT1JLQVJPVU5EOiBUSFJFRS5yb3RhdGVVViBjYXVzZXMgYW4gaXNzdWUgd2l0aCB0aGUgbWFzayB0ZXh0dXJlXG4gICAgLy8gV2UgYXJlIGdvaW5nIHRvIHNwaW4gdXNpbmcgYSAxMDAlIG9yZ2FuaWMgaGFuZG1hZGUgcm90YXRpb24gbWF0cml4XG4gICAgLy8gdXYgPSBUSFJFRS5yb3RhdGVVVih1diwgcGhhc2UsIFRIUkVFLnZlYzIoMC41LCAwLjUpKTtcblxuICAgIGNvbnN0IGMgPSBUSFJFRS5jb3MocGhhc2UpO1xuICAgIGNvbnN0IHMgPSBUSFJFRS5zaW4ocGhhc2UpO1xuICAgIHV2ID0gdXYuc3ViKFRIUkVFLnZlYzIoMC41LCAwLjUpKTtcbiAgICB1diA9IHV2Lm11bChUSFJFRS5tYXQyKGMsIHMsIHMubmVnYXRlKCksIGMpKTtcbiAgICB1diA9IHV2LmFkZChUSFJFRS52ZWMyKDAuNSwgMC41KSk7XG5cbiAgICAvLyBzY3JvbGxcbiAgICBjb25zdCBzY3JvbGwgPSBUSFJFRS52ZWMyKHJlZlVWQW5pbWF0aW9uU2Nyb2xsWE9mZnNldCwgcmVmVVZBbmltYXRpb25TY3JvbGxZT2Zmc2V0KS5tdWwodXZBbmltYXRpb25NYXNrKTtcbiAgICB1diA9IHV2LmFkZChzY3JvbGwpO1xuXG4gICAgcmV0dXJuIHV2LnRlbXAoJ0FuaW1hdGVkVVYnKTtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlL3dlYmdwdSc7XG5cbmV4cG9ydCBjb25zdCByZWZDb2xvciA9IFRIUkVFLm1hdGVyaWFsUmVmZXJlbmNlKCdjb2xvcicsICdjb2xvcicpO1xuZXhwb3J0IGNvbnN0IHJlZk1hcCA9IFRIUkVFLm1hdGVyaWFsUmVmZXJlbmNlKCdtYXAnLCAndGV4dHVyZScpO1xuZXhwb3J0IGNvbnN0IHJlZk5vcm1hbE1hcCA9IFRIUkVFLm1hdGVyaWFsUmVmZXJlbmNlKCdub3JtYWxNYXAnLCAndGV4dHVyZScpO1xuZXhwb3J0IGNvbnN0IHJlZk5vcm1hbFNjYWxlID0gVEhSRUUubWF0ZXJpYWxSZWZlcmVuY2UoJ25vcm1hbFNjYWxlJywgJ3ZlYzInKTtcbmV4cG9ydCBjb25zdCByZWZFbWlzc2l2ZSA9IFRIUkVFLm1hdGVyaWFsUmVmZXJlbmNlKCdlbWlzc2l2ZScsICdjb2xvcicpO1xuZXhwb3J0IGNvbnN0IHJlZkVtaXNzaXZlSW50ZW5zaXR5ID0gVEhSRUUubWF0ZXJpYWxSZWZlcmVuY2UoJ2VtaXNzaXZlSW50ZW5zaXR5JywgJ2Zsb2F0Jyk7XG5leHBvcnQgY29uc3QgcmVmRW1pc3NpdmVNYXAgPSBUSFJFRS5tYXRlcmlhbFJlZmVyZW5jZSgnZW1pc3NpdmVNYXAnLCAndGV4dHVyZScpO1xuXG5leHBvcnQgY29uc3QgcmVmU2hhZGVDb2xvckZhY3RvciA9IFRIUkVFLm1hdGVyaWFsUmVmZXJlbmNlKCdzaGFkZUNvbG9yRmFjdG9yJywgJ2NvbG9yJyk7XG5leHBvcnQgY29uc3QgcmVmU2hhZGluZ1NoaWZ0RmFjdG9yID0gVEhSRUUubWF0ZXJpYWxSZWZlcmVuY2UoJ3NoYWRpbmdTaGlmdEZhY3RvcicsICdmbG9hdCcpO1xuZXhwb3J0IGNvbnN0IHJlZlNoYWRlTXVsdGlwbHlUZXh0dXJlID0gVEhSRUUubWF0ZXJpYWxSZWZlcmVuY2UoJ3NoYWRlTXVsdGlwbHlUZXh0dXJlJywgJ3RleHR1cmUnKTtcbmV4cG9ydCBjb25zdCByZWZTaGFkZU11bHRpcGx5VGV4dHVyZVNjYWxlID0gVEhSRUUubWF0ZXJpYWxSZWZlcmVuY2UoJ3NoYWRlTXVsdGlwbHlUZXh0dXJlU2NhbGUnLCAnZmxvYXQnKTtcbmV4cG9ydCBjb25zdCByZWZTaGFkaW5nVG9vbnlGYWN0b3IgPSBUSFJFRS5tYXRlcmlhbFJlZmVyZW5jZSgnc2hhZGluZ1Rvb255RmFjdG9yJywgJ2Zsb2F0Jyk7XG5leHBvcnQgY29uc3QgcmVmUmltTGlnaHRpbmdNaXhGYWN0b3IgPSBUSFJFRS5tYXRlcmlhbFJlZmVyZW5jZSgncmltTGlnaHRpbmdNaXhGYWN0b3InLCAnZmxvYXQnKTtcbmV4cG9ydCBjb25zdCByZWZSaW1NdWx0aXBseVRleHR1cmUgPSBUSFJFRS5tYXRlcmlhbFJlZmVyZW5jZSgncmltTXVsdGlwbHlUZXh0dXJlJywgJ3RleHR1cmUnKTtcbmV4cG9ydCBjb25zdCByZWZNYXRjYXBGYWN0b3IgPSBUSFJFRS5tYXRlcmlhbFJlZmVyZW5jZSgnbWF0Y2FwRmFjdG9yJywgJ2NvbG9yJyk7XG5leHBvcnQgY29uc3QgcmVmTWF0Y2FwVGV4dHVyZSA9IFRIUkVFLm1hdGVyaWFsUmVmZXJlbmNlKCdtYXRjYXBUZXh0dXJlJywgJ3RleHR1cmUnKTtcbmV4cG9ydCBjb25zdCByZWZQYXJhbWV0cmljUmltQ29sb3JGYWN0b3IgPSBUSFJFRS5tYXRlcmlhbFJlZmVyZW5jZSgncGFyYW1ldHJpY1JpbUNvbG9yRmFjdG9yJywgJ2NvbG9yJyk7XG5leHBvcnQgY29uc3QgcmVmUGFyYW1ldHJpY1JpbUxpZnRGYWN0b3IgPSBUSFJFRS5tYXRlcmlhbFJlZmVyZW5jZSgncGFyYW1ldHJpY1JpbUxpZnRGYWN0b3InLCAnZmxvYXQnKTtcbmV4cG9ydCBjb25zdCByZWZQYXJhbWV0cmljUmltRnJlc25lbFBvd2VyRmFjdG9yID0gVEhSRUUubWF0ZXJpYWxSZWZlcmVuY2UoJ3BhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJGYWN0b3InLCAnZmxvYXQnKTtcbmV4cG9ydCBjb25zdCByZWZPdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmUgPSBUSFJFRS5tYXRlcmlhbFJlZmVyZW5jZSgnb3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlJywgJ3RleHR1cmUnKTtcbmV4cG9ydCBjb25zdCByZWZPdXRsaW5lV2lkdGhGYWN0b3IgPSBUSFJFRS5tYXRlcmlhbFJlZmVyZW5jZSgnb3V0bGluZVdpZHRoRmFjdG9yJywgJ2Zsb2F0Jyk7XG5leHBvcnQgY29uc3QgcmVmT3V0bGluZUNvbG9yRmFjdG9yID0gVEhSRUUubWF0ZXJpYWxSZWZlcmVuY2UoJ291dGxpbmVDb2xvckZhY3RvcicsICdjb2xvcicpO1xuZXhwb3J0IGNvbnN0IHJlZk91dGxpbmVMaWdodGluZ01peEZhY3RvciA9IFRIUkVFLm1hdGVyaWFsUmVmZXJlbmNlKCdvdXRsaW5lTGlnaHRpbmdNaXhGYWN0b3InLCAnZmxvYXQnKTtcbmV4cG9ydCBjb25zdCByZWZVVkFuaW1hdGlvbk1hc2tUZXh0dXJlID0gVEhSRUUubWF0ZXJpYWxSZWZlcmVuY2UoJ3V2QW5pbWF0aW9uTWFza1RleHR1cmUnLCAndGV4dHVyZScpO1xuXG5leHBvcnQgY29uc3QgcmVmVVZBbmltYXRpb25TY3JvbGxYT2Zmc2V0ID0gVEhSRUUubWF0ZXJpYWxSZWZlcmVuY2UoJ3V2QW5pbWF0aW9uU2Nyb2xsWE9mZnNldCcsICdmbG9hdCcpO1xuZXhwb3J0IGNvbnN0IHJlZlVWQW5pbWF0aW9uU2Nyb2xsWU9mZnNldCA9IFRIUkVFLm1hdGVyaWFsUmVmZXJlbmNlKCd1dkFuaW1hdGlvblNjcm9sbFlPZmZzZXQnLCAnZmxvYXQnKTtcbmV4cG9ydCBjb25zdCByZWZVVkFuaW1hdGlvblJvdGF0aW9uUGhhc2UgPSBUSFJFRS5tYXRlcmlhbFJlZmVyZW5jZSgndXZBbmltYXRpb25Sb3RhdGlvblBoYXNlJywgJ2Zsb2F0Jyk7XG4iLCAiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUvd2ViZ3B1JztcbmltcG9ydCB7XG4gIG1hdGNhcCxcbiAgcGFyYW1ldHJpY1JpbSxcbiAgcmltTGlnaHRpbmdNaXgsXG4gIHJpbU11bHRpcGx5LFxuICBzaGFkZUNvbG9yLFxuICBzaGFkaW5nU2hpZnQsXG4gIHNoYWRpbmdUb29ueSxcbn0gZnJvbSAnLi9pbW11dGFibGVOb2Rlcyc7XG5cbi8vIFRPRE86IDAlIGNvbmZpZGVuY2UgYWJvdXQgZnVuY3Rpb24gdHlwZXMuXG5cbmNvbnN0IGxpbmVhcnN0ZXAgPSBUSFJFRS50c2xGbihcbiAgKHtcbiAgICBhLFxuICAgIGIsXG4gICAgdCxcbiAgfToge1xuICAgIGE6IFRIUkVFLlNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT47XG4gICAgYjogVEhSRUUuU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPjtcbiAgICB0OiBUSFJFRS5TaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+O1xuICB9KSA9PiB7XG4gICAgY29uc3QgdG9wID0gdC5zdWIoYSk7XG4gICAgY29uc3QgYm90dG9tID0gYi5zdWIoYSk7XG4gICAgcmV0dXJuIHRvcC5kaXYoYm90dG9tKS5jbGFtcCgpO1xuICB9LFxuKTtcblxuLyoqXG4gKiBDb252ZXJ0IE5kb3RMIGludG8gdG9vbiBzaGFkaW5nIGZhY3RvciB1c2luZyBzaGFkaW5nU2hpZnQgYW5kIHNoYWRpbmdUb29ueVxuICovXG5jb25zdCBnZXRTaGFkaW5nID0gVEhSRUUudHNsRm4oKHsgZG90TkwgfTogeyBkb3ROTDogVEhSRUUuU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPiB9KSA9PiB7XG4gIGNvbnN0IHNoYWRvdyA9IDEuMDsgLy8gVE9ET1xuXG4gIGNvbnN0IGZlYXRoZXIgPSBUSFJFRS5mbG9hdCgxLjApLnN1YihzaGFkaW5nVG9vbnkpO1xuXG4gIGxldCBzaGFkaW5nOiBUSFJFRS5TaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+ID0gZG90TkwuYWRkKHNoYWRpbmdTaGlmdCk7XG4gIHNoYWRpbmcgPSBsaW5lYXJzdGVwKHtcbiAgICBhOiBmZWF0aGVyLm5lZ2F0ZSgpLFxuICAgIGI6IGZlYXRoZXIsXG4gICAgdDogc2hhZGluZyxcbiAgfSk7XG4gIHNoYWRpbmcgPSBzaGFkaW5nLm11bChzaGFkb3cpO1xuICByZXR1cm4gc2hhZGluZztcbn0pO1xuXG4vKipcbiAqIE1peCBkaWZmdXNlQ29sb3IgYW5kIHNoYWRlQ29sb3IgdXNpbmcgc2hhZGluZyBmYWN0b3IgYW5kIGxpZ2h0IGNvbG9yXG4gKi9cbmNvbnN0IGdldERpZmZ1c2UgPSBUSFJFRS50c2xGbihcbiAgKHtcbiAgICBzaGFkaW5nLFxuICAgIGxpZ2h0Q29sb3IsXG4gIH06IHtcbiAgICBzaGFkaW5nOiBUSFJFRS5TaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+O1xuICAgIGxpZ2h0Q29sb3I6IFRIUkVFLlNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT47XG4gIH0pID0+IHtcbiAgICBjb25zdCBkaWZmdXNlQ29sb3IgPSBUSFJFRS5taXgoc2hhZGVDb2xvciwgVEhSRUUuZGlmZnVzZUNvbG9yLCBzaGFkaW5nKTtcbiAgICBjb25zdCBjb2wgPSBsaWdodENvbG9yLm11bChUSFJFRS5CUkRGX0xhbWJlcnQoeyBkaWZmdXNlQ29sb3IgfSkpO1xuXG4gICAgcmV0dXJuIGNvbDtcbiAgfSxcbik7XG5cbmV4cG9ydCBjbGFzcyBNVG9vbkxpZ2h0aW5nTW9kZWwgZXh0ZW5kcyBUSFJFRS5MaWdodGluZ01vZGVsIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIGRpcmVjdCh7IGxpZ2h0RGlyZWN0aW9uLCBsaWdodENvbG9yLCByZWZsZWN0ZWRMaWdodCB9OiBUSFJFRS5MaWdodGluZ01vZGVsRGlyZWN0SW5wdXQpIHtcbiAgICBjb25zdCBkb3ROTCA9IFRIUkVFLnRyYW5zZm9ybWVkTm9ybWFsVmlldy5kb3QobGlnaHREaXJlY3Rpb24pLmNsYW1wKC0xLjAsIDEuMCk7XG5cbiAgICAvLyB0b29uIGRpZmZ1c2VcbiAgICBjb25zdCBzaGFkaW5nID0gZ2V0U2hhZGluZyh7XG4gICAgICBkb3ROTCxcbiAgICB9KTtcblxuICAgIC8vIFVuYWJsZSB0byB1c2UgYGFkZEFzc2lnbmAgaW4gdGhlIGN1cnJlbnQgQHR5cGVzL3RocmVlLCB3ZSB1c2UgYGFzc2lnbmAgYW5kIGBhZGRgIGluc3RlYWRcbiAgICAvLyBUT0RPOiBGaXggdGhlIGBhZGRBc3NpZ25gIGlzc3VlIGZyb20gdGhlIGBAdHlwZXMvdGhyZWVgIHNpZGVcblxuICAgIChyZWZsZWN0ZWRMaWdodC5kaXJlY3REaWZmdXNlIGFzIFRIUkVFLlNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT4pLmFzc2lnbihcbiAgICAgIChyZWZsZWN0ZWRMaWdodC5kaXJlY3REaWZmdXNlIGFzIFRIUkVFLlNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT4pLmFkZChcbiAgICAgICAgZ2V0RGlmZnVzZSh7XG4gICAgICAgICAgc2hhZGluZyxcbiAgICAgICAgICBsaWdodENvbG9yOiBsaWdodENvbG9yIGFzIFRIUkVFLlNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT4sXG4gICAgICAgIH0pLFxuICAgICAgKSxcbiAgICApO1xuXG4gICAgLy8gcmltXG4gICAgKHJlZmxlY3RlZExpZ2h0LmRpcmVjdFNwZWN1bGFyIGFzIFRIUkVFLlNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT4pLmFzc2lnbihcbiAgICAgIChyZWZsZWN0ZWRMaWdodC5kaXJlY3RTcGVjdWxhciBhcyBUSFJFRS5TaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+KS5hZGQoXG4gICAgICAgIHBhcmFtZXRyaWNSaW1cbiAgICAgICAgICAuYWRkKG1hdGNhcClcbiAgICAgICAgICAubXVsKHJpbU11bHRpcGx5KVxuICAgICAgICAgIC5tdWwoVEhSRUUubWl4KFRIUkVFLnZlYzMoMC4wKSwgVEhSRUUuQlJERl9MYW1iZXJ0KHsgZGlmZnVzZUNvbG9yOiBsaWdodENvbG9yIH0pLCByaW1MaWdodGluZ01peCkpLFxuICAgICAgKSxcbiAgICApO1xuICB9XG5cbiAgaW5kaXJlY3QoY29udGV4dDogVEhSRUUuTGlnaHRpbmdNb2RlbEluZGlyZWN0SW5wdXQpIHtcbiAgICB0aGlzLmluZGlyZWN0RGlmZnVzZShjb250ZXh0KTtcbiAgICB0aGlzLmluZGlyZWN0U3BlY3VsYXIoY29udGV4dCk7XG4gIH1cblxuICBpbmRpcmVjdERpZmZ1c2UoeyBpcnJhZGlhbmNlLCByZWZsZWN0ZWRMaWdodCB9OiBUSFJFRS5MaWdodGluZ01vZGVsSW5kaXJlY3RJbnB1dCkge1xuICAgIC8vIGluZGlyZWN0IGlycmFkaWFuY2VcbiAgICAocmVmbGVjdGVkTGlnaHQuaW5kaXJlY3REaWZmdXNlIGFzIFRIUkVFLlNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT4pLmFzc2lnbihcbiAgICAgIChyZWZsZWN0ZWRMaWdodC5pbmRpcmVjdERpZmZ1c2UgYXMgVEhSRUUuU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPikuYWRkKFxuICAgICAgICAoaXJyYWRpYW5jZSBhcyBUSFJFRS5TaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+KS5tdWwoXG4gICAgICAgICAgVEhSRUUuQlJERl9MYW1iZXJ0KHtcbiAgICAgICAgICAgIGRpZmZ1c2VDb2xvcjogVEhSRUUuZGlmZnVzZUNvbG9yLFxuICAgICAgICAgIH0pLFxuICAgICAgICApLFxuICAgICAgKSxcbiAgICApO1xuICB9XG5cbiAgaW5kaXJlY3RTcGVjdWxhcih7IHJlZmxlY3RlZExpZ2h0IH06IFRIUkVFLkxpZ2h0aW5nTW9kZWxJbmRpcmVjdElucHV0KSB7XG4gICAgLy8gcmltXG4gICAgKHJlZmxlY3RlZExpZ2h0LmluZGlyZWN0U3BlY3VsYXIgYXMgVEhSRUUuU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPikuYXNzaWduKFxuICAgICAgKHJlZmxlY3RlZExpZ2h0LmluZGlyZWN0U3BlY3VsYXIgYXMgVEhSRUUuU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPikuYWRkKFxuICAgICAgICBwYXJhbWV0cmljUmltXG4gICAgICAgICAgLmFkZChtYXRjYXApXG4gICAgICAgICAgLm11bChyaW1NdWx0aXBseSlcbiAgICAgICAgICAubXVsKFRIUkVFLm1peChUSFJFRS52ZWMzKDEuMCksIFRIUkVFLnZlYzMoMC4wKSwgcmltTGlnaHRpbmdNaXgpKSxcbiAgICAgICksXG4gICAgKTtcbiAgfVxufVxuIiwgImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlL3dlYmdwdSc7XG5cbmV4cG9ydCBjb25zdCBzaGFkZUNvbG9yID0gVEhSRUUubm9kZUltbXV0YWJsZShUSFJFRS5Qcm9wZXJ0eU5vZGUsICd2ZWMzJykudGVtcCgnU2hhZGVDb2xvcicpO1xuZXhwb3J0IGNvbnN0IHNoYWRpbmdTaGlmdCA9IFRIUkVFLm5vZGVJbW11dGFibGUoVEhSRUUuUHJvcGVydHlOb2RlLCAnZmxvYXQnKS50ZW1wKCdTaGFkaW5nU2hpZnQnKTtcbmV4cG9ydCBjb25zdCBzaGFkaW5nVG9vbnkgPSBUSFJFRS5ub2RlSW1tdXRhYmxlKFRIUkVFLlByb3BlcnR5Tm9kZSwgJ2Zsb2F0JykudGVtcCgnU2hhZGluZ1Rvb255Jyk7XG5leHBvcnQgY29uc3QgcmltTGlnaHRpbmdNaXggPSBUSFJFRS5ub2RlSW1tdXRhYmxlKFRIUkVFLlByb3BlcnR5Tm9kZSwgJ2Zsb2F0JykudGVtcCgnUmltTGlnaHRpbmdNaXgnKTtcbmV4cG9ydCBjb25zdCByaW1NdWx0aXBseSA9IFRIUkVFLm5vZGVJbW11dGFibGUoVEhSRUUuUHJvcGVydHlOb2RlLCAndmVjMycpLnRlbXAoJ1JpbU11bHRpcGx5Jyk7XG5leHBvcnQgY29uc3QgbWF0Y2FwID0gVEhSRUUubm9kZUltbXV0YWJsZShUSFJFRS5Qcm9wZXJ0eU5vZGUsICd2ZWMzJykudGVtcCgnbWF0Y2FwJyk7XG5leHBvcnQgY29uc3QgcGFyYW1ldHJpY1JpbSA9IFRIUkVFLm5vZGVJbW11dGFibGUoVEhSRUUuUHJvcGVydHlOb2RlLCAndmVjMycpLnRlbXAoJ1BhcmFtZXRyaWNSaW0nKTtcbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS93ZWJncHUnO1xuXG5pbXBvcnQgdHlwZSB7IE1Ub29uTWF0ZXJpYWwgfSBmcm9tICcuLi9NVG9vbk1hdGVyaWFsJztcbmltcG9ydCB7IE1Ub29uTGlnaHRpbmdNb2RlbCB9IGZyb20gJy4vTVRvb25MaWdodGluZ01vZGVsJztcbmltcG9ydCB7XG4gIHJpbUxpZ2h0aW5nTWl4LFxuICBtYXRjYXAsXG4gIHNoYWRlQ29sb3IsXG4gIHNoYWRpbmdTaGlmdCxcbiAgc2hhZGluZ1Rvb255LFxuICByaW1NdWx0aXBseSxcbiAgcGFyYW1ldHJpY1JpbSxcbn0gZnJvbSAnLi9pbW11dGFibGVOb2Rlcyc7XG5pbXBvcnQge1xuICByZWZDb2xvcixcbiAgcmVmRW1pc3NpdmUsXG4gIHJlZkVtaXNzaXZlSW50ZW5zaXR5LFxuICByZWZFbWlzc2l2ZU1hcCxcbiAgcmVmTWFwLFxuICByZWZNYXRjYXBGYWN0b3IsXG4gIHJlZk1hdGNhcFRleHR1cmUsXG4gIHJlZk5vcm1hbE1hcCxcbiAgcmVmTm9ybWFsU2NhbGUsXG4gIHJlZk91dGxpbmVDb2xvckZhY3RvcixcbiAgcmVmT3V0bGluZUxpZ2h0aW5nTWl4RmFjdG9yLFxuICByZWZPdXRsaW5lV2lkdGhGYWN0b3IsXG4gIHJlZk91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZSxcbiAgcmVmUGFyYW1ldHJpY1JpbUNvbG9yRmFjdG9yLFxuICByZWZQYXJhbWV0cmljUmltRnJlc25lbFBvd2VyRmFjdG9yLFxuICByZWZQYXJhbWV0cmljUmltTGlmdEZhY3RvcixcbiAgcmVmUmltTGlnaHRpbmdNaXhGYWN0b3IsXG4gIHJlZlJpbU11bHRpcGx5VGV4dHVyZSxcbiAgcmVmU2hhZGVDb2xvckZhY3RvcixcbiAgcmVmU2hhZGVNdWx0aXBseVRleHR1cmUsXG4gIHJlZlNoYWRlTXVsdGlwbHlUZXh0dXJlU2NhbGUsXG4gIHJlZlNoYWRpbmdTaGlmdEZhY3RvcixcbiAgcmVmU2hhZGluZ1Rvb255RmFjdG9yLFxufSBmcm9tICcuL21hdGVyaWFsUmVmZXJlbmNlcyc7XG5pbXBvcnQgeyBNVG9vbkFuaW1hdGVkVVZOb2RlIH0gZnJvbSAnLi9NVG9vbkFuaW1hdGVkVVZOb2RlJztcbmltcG9ydCB7IE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlIH0gZnJvbSAnLi4vTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUnO1xuaW1wb3J0IHsgTVRvb25Ob2RlTWF0ZXJpYWxQYXJhbWV0ZXJzIH0gZnJvbSAnLi9NVG9vbk5vZGVNYXRlcmlhbFBhcmFtZXRlcnMnO1xuaW1wb3J0IHsgbXRvb25QYXJhbWV0cmljUmltIH0gZnJvbSAnLi9tdG9vblBhcmFtZXRyaWNSaW0nO1xuXG4vKipcbiAqIE1Ub29uIGlzIGEgbWF0ZXJpYWwgc3BlY2lmaWNhdGlvbiB0aGF0IGhhcyB2YXJpb3VzIGZlYXR1cmVzLlxuICogVGhlIHNwZWMgYW5kIGltcGxlbWVudGF0aW9uIGFyZSBvcmlnaW5hbGx5IGZvdW5kZWQgZm9yIFVuaXR5IGVuZ2luZSBhbmQgdGhpcyBpcyBhIHBvcnQgb2YgdGhlIG1hdGVyaWFsLlxuICpcbiAqIFRoaXMgbWF0ZXJpYWwgaXMgYSBOb2RlTWF0ZXJpYWwgdmFyaWFudCBvZiB7QGxpbmsgTVRvb25NYXRlcmlhbH0uXG4gKlxuICogU2VlOiBodHRwczovL2dpdGh1Yi5jb20vU2FudGFyaC9NVG9vblxuICovXG5leHBvcnQgY2xhc3MgTVRvb25Ob2RlTWF0ZXJpYWwgZXh0ZW5kcyBUSFJFRS5Ob2RlTWF0ZXJpYWwge1xuICBwdWJsaWMgZW1pc3NpdmVOb2RlOiBUSFJFRS5TaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+IHwgbnVsbDtcblxuICBwdWJsaWMgY29sb3I6IFRIUkVFLkNvbG9yO1xuICBwdWJsaWMgbWFwOiBUSFJFRS5UZXh0dXJlIHwgbnVsbDtcbiAgcHVibGljIGVtaXNzaXZlOiBUSFJFRS5Db2xvcjtcbiAgcHVibGljIGVtaXNzaXZlSW50ZW5zaXR5OiBudW1iZXI7XG4gIHB1YmxpYyBlbWlzc2l2ZU1hcDogVEhSRUUuVGV4dHVyZSB8IG51bGw7XG4gIHB1YmxpYyBub3JtYWxNYXA6IFRIUkVFLlRleHR1cmUgfCBudWxsO1xuICBwdWJsaWMgbm9ybWFsU2NhbGU6IFRIUkVFLlZlY3RvcjI7XG5cbiAgcHVibGljIHNoYWRlQ29sb3JGYWN0b3I6IFRIUkVFLkNvbG9yO1xuICBwdWJsaWMgc2hhZGVNdWx0aXBseVRleHR1cmU6IFRIUkVFLlRleHR1cmUgfCBudWxsO1xuICBwdWJsaWMgc2hhZGluZ1NoaWZ0RmFjdG9yOiBudW1iZXI7XG4gIHB1YmxpYyBzaGFkaW5nU2hpZnRUZXh0dXJlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbDtcbiAgcHVibGljIHNoYWRpbmdTaGlmdFRleHR1cmVTY2FsZTogbnVtYmVyO1xuICBwdWJsaWMgc2hhZGluZ1Rvb255RmFjdG9yOiBudW1iZXI7XG4gIHB1YmxpYyByaW1MaWdodGluZ01peEZhY3RvcjogbnVtYmVyO1xuICBwdWJsaWMgcmltTXVsdGlwbHlUZXh0dXJlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbDtcbiAgcHVibGljIG1hdGNhcEZhY3RvcjogVEhSRUUuQ29sb3I7XG4gIHB1YmxpYyBtYXRjYXBUZXh0dXJlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbDtcbiAgcHVibGljIHBhcmFtZXRyaWNSaW1Db2xvckZhY3RvcjogVEhSRUUuQ29sb3I7XG4gIHB1YmxpYyBwYXJhbWV0cmljUmltTGlmdEZhY3RvcjogbnVtYmVyO1xuICBwdWJsaWMgcGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlckZhY3RvcjogbnVtYmVyO1xuICBwdWJsaWMgb3V0bGluZVdpZHRoTW9kZTogTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGU7XG4gIHB1YmxpYyBvdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmU6IFRIUkVFLlRleHR1cmUgfCBudWxsO1xuICBwdWJsaWMgb3V0bGluZVdpZHRoRmFjdG9yOiBudW1iZXI7XG4gIHB1YmxpYyBvdXRsaW5lQ29sb3JGYWN0b3I6IFRIUkVFLkNvbG9yO1xuICBwdWJsaWMgb3V0bGluZUxpZ2h0aW5nTWl4RmFjdG9yOiBudW1iZXI7XG4gIHB1YmxpYyB1dkFuaW1hdGlvblNjcm9sbFhTcGVlZEZhY3RvcjogbnVtYmVyO1xuICBwdWJsaWMgdXZBbmltYXRpb25TY3JvbGxZU3BlZWRGYWN0b3I6IG51bWJlcjtcbiAgcHVibGljIHV2QW5pbWF0aW9uUm90YXRpb25TcGVlZEZhY3RvcjogbnVtYmVyO1xuICBwdWJsaWMgdXZBbmltYXRpb25NYXNrVGV4dHVyZTogVEhSRUUuVGV4dHVyZSB8IG51bGw7XG5cbiAgcHVibGljIHNoYWRlQ29sb3JOb2RlOiBUSFJFRS5Td2l6emFibGUgfCBudWxsO1xuICBwdWJsaWMgc2hhZGluZ1NoaWZ0Tm9kZTogVEhSRUUuTm9kZSB8IG51bGw7XG4gIHB1YmxpYyBzaGFkaW5nVG9vbnlOb2RlOiBUSFJFRS5Ob2RlIHwgbnVsbDtcbiAgcHVibGljIHJpbUxpZ2h0aW5nTWl4Tm9kZTogVEhSRUUuTm9kZSB8IG51bGw7XG4gIHB1YmxpYyByaW1NdWx0aXBseU5vZGU6IFRIUkVFLk5vZGUgfCBudWxsO1xuICBwdWJsaWMgbWF0Y2FwTm9kZTogVEhSRUUuTm9kZSB8IG51bGw7XG4gIHB1YmxpYyBwYXJhbWV0cmljUmltQ29sb3JOb2RlOiBUSFJFRS5Td2l6emFibGUgfCBudWxsO1xuICBwdWJsaWMgcGFyYW1ldHJpY1JpbUxpZnROb2RlOiBUSFJFRS5Ob2RlIHwgbnVsbDtcbiAgcHVibGljIHBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJOb2RlOiBUSFJFRS5Ob2RlIHwgbnVsbDtcblxuICBwdWJsaWMgdXZBbmltYXRpb25TY3JvbGxYT2Zmc2V0OiBudW1iZXI7XG4gIHB1YmxpYyB1dkFuaW1hdGlvblNjcm9sbFlPZmZzZXQ6IG51bWJlcjtcbiAgcHVibGljIHV2QW5pbWF0aW9uUm90YXRpb25QaGFzZTogbnVtYmVyO1xuXG4gIHB1YmxpYyBpc091dGxpbmU6IGJvb2xlYW47XG5cbiAgcHJpdmF0ZSBfYW5pbWF0ZWRVVk5vZGU6IE1Ub29uQW5pbWF0ZWRVVk5vZGUgfCBudWxsO1xuXG4gIHB1YmxpYyBjdXN0b21Qcm9ncmFtQ2FjaGVLZXkoKTogc3RyaW5nIHtcbiAgICBsZXQgY2FjaGVLZXkgPSBzdXBlci5jdXN0b21Qcm9ncmFtQ2FjaGVLZXkoKTtcblxuICAgIGNhY2hlS2V5ICs9IGBpc091dGxpbmU6JHt0aGlzLmlzT3V0bGluZX0sYDtcblxuICAgIHJldHVybiBjYWNoZUtleTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWFkb25seSBib29sZWFuIHRoYXQgaW5kaWNhdGVzIHRoaXMgaXMgYSB7QGxpbmsgTVRvb25Ob2RlTWF0ZXJpYWx9LlxuICAgKi9cbiAgcHVibGljIGdldCBpc01Ub29uTm9kZU1hdGVyaWFsKCk6IHRydWUge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBhcmFtZXRlcnM6IE1Ub29uTm9kZU1hdGVyaWFsUGFyYW1ldGVycyA9IHt9KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIGlmIChwYXJhbWV0ZXJzLnRyYW5zcGFyZW50V2l0aFpXcml0ZSkge1xuICAgICAgcGFyYW1ldGVycy5kZXB0aFdyaXRlID0gdHJ1ZTtcbiAgICB9XG4gICAgZGVsZXRlIHBhcmFtZXRlcnMudHJhbnNwYXJlbnRXaXRoWldyaXRlO1xuXG4gICAgLy8gYE1Ub29uTWF0ZXJpYWxMb2FkZXJQbHVnaW5gIGFzc2lnbnMgdGhlc2UgcGFyYW1ldGVycyB0byB0aGUgbWF0ZXJpYWxcbiAgICAvLyBIb3dldmVyLCBgTVRvb25Ob2RlTWF0ZXJpYWxgIGRvZXMgbm90IHN1cHBvcnQgdGhlc2UgcGFyYW1ldGVyc1xuICAgIC8vIHNvIHdlIGRlbGV0ZSB0aGVtIGhlcmUgdG8gc3VwcHJlc3Mgd2FybmluZ3NcbiAgICBkZWxldGUgKHBhcmFtZXRlcnMgYXMgYW55KS5naUVxdWFsaXphdGlvbkZhY3RvcjtcbiAgICBkZWxldGUgKHBhcmFtZXRlcnMgYXMgYW55KS52MENvbXBhdFNoYWRlO1xuICAgIGRlbGV0ZSAocGFyYW1ldGVycyBhcyBhbnkpLmRlYnVnTW9kZTtcblxuICAgIHRoaXMuZW1pc3NpdmVOb2RlID0gbnVsbDtcblxuICAgIHRoaXMubGlnaHRzID0gdHJ1ZTtcblxuICAgIHRoaXMuY29sb3IgPSBuZXcgVEhSRUUuQ29sb3IoMS4wLCAxLjAsIDEuMCk7XG4gICAgdGhpcy5tYXAgPSBudWxsO1xuICAgIHRoaXMuZW1pc3NpdmUgPSBuZXcgVEhSRUUuQ29sb3IoMC4wLCAwLjAsIDAuMCk7XG4gICAgdGhpcy5lbWlzc2l2ZUludGVuc2l0eSA9IDEuMDtcbiAgICB0aGlzLmVtaXNzaXZlTWFwID0gbnVsbDtcbiAgICB0aGlzLm5vcm1hbE1hcCA9IG51bGw7XG4gICAgdGhpcy5ub3JtYWxTY2FsZSA9IG5ldyBUSFJFRS5WZWN0b3IyKDEuMCwgMS4wKTtcbiAgICB0aGlzLnNoYWRlQ29sb3JGYWN0b3IgPSBuZXcgVEhSRUUuQ29sb3IoMC4wLCAwLjAsIDAuMCk7XG4gICAgdGhpcy5zaGFkZU11bHRpcGx5VGV4dHVyZSA9IG51bGw7XG4gICAgdGhpcy5zaGFkaW5nU2hpZnRGYWN0b3IgPSAwLjA7XG4gICAgdGhpcy5zaGFkaW5nU2hpZnRUZXh0dXJlID0gbnVsbDtcbiAgICB0aGlzLnNoYWRpbmdTaGlmdFRleHR1cmVTY2FsZSA9IDEuMDtcbiAgICB0aGlzLnNoYWRpbmdUb29ueUZhY3RvciA9IDAuOTtcbiAgICB0aGlzLnJpbUxpZ2h0aW5nTWl4RmFjdG9yID0gMS4wO1xuICAgIHRoaXMucmltTXVsdGlwbHlUZXh0dXJlID0gbnVsbDtcbiAgICB0aGlzLm1hdGNhcEZhY3RvciA9IG5ldyBUSFJFRS5Db2xvcigxLjAsIDEuMCwgMS4wKTtcbiAgICB0aGlzLm1hdGNhcFRleHR1cmUgPSBudWxsO1xuICAgIHRoaXMucGFyYW1ldHJpY1JpbUNvbG9yRmFjdG9yID0gbmV3IFRIUkVFLkNvbG9yKDAuMCwgMC4wLCAwLjApO1xuICAgIHRoaXMucGFyYW1ldHJpY1JpbUxpZnRGYWN0b3IgPSAwLjA7XG4gICAgdGhpcy5wYXJhbWV0cmljUmltRnJlc25lbFBvd2VyRmFjdG9yID0gNS4wO1xuICAgIHRoaXMub3V0bGluZVdpZHRoTW9kZSA9IE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlLk5vbmU7XG4gICAgdGhpcy5vdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmUgPSBudWxsO1xuICAgIHRoaXMub3V0bGluZVdpZHRoRmFjdG9yID0gMC4wO1xuICAgIHRoaXMub3V0bGluZUNvbG9yRmFjdG9yID0gbmV3IFRIUkVFLkNvbG9yKDAuMCwgMC4wLCAwLjApO1xuICAgIHRoaXMub3V0bGluZUxpZ2h0aW5nTWl4RmFjdG9yID0gMS4wO1xuICAgIHRoaXMudXZBbmltYXRpb25TY3JvbGxYU3BlZWRGYWN0b3IgPSAwLjA7XG4gICAgdGhpcy51dkFuaW1hdGlvblNjcm9sbFlTcGVlZEZhY3RvciA9IDAuMDtcbiAgICB0aGlzLnV2QW5pbWF0aW9uUm90YXRpb25TcGVlZEZhY3RvciA9IDAuMDtcbiAgICB0aGlzLnV2QW5pbWF0aW9uTWFza1RleHR1cmUgPSBudWxsO1xuXG4gICAgdGhpcy5zaGFkZUNvbG9yTm9kZSA9IG51bGw7XG4gICAgdGhpcy5zaGFkaW5nU2hpZnROb2RlID0gbnVsbDtcbiAgICB0aGlzLnNoYWRpbmdUb29ueU5vZGUgPSBudWxsO1xuICAgIHRoaXMucmltTGlnaHRpbmdNaXhOb2RlID0gbnVsbDtcbiAgICB0aGlzLnJpbU11bHRpcGx5Tm9kZSA9IG51bGw7XG4gICAgdGhpcy5tYXRjYXBOb2RlID0gbnVsbDtcbiAgICB0aGlzLnBhcmFtZXRyaWNSaW1Db2xvck5vZGUgPSBudWxsO1xuICAgIHRoaXMucGFyYW1ldHJpY1JpbUxpZnROb2RlID0gbnVsbDtcbiAgICB0aGlzLnBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJOb2RlID0gbnVsbDtcblxuICAgIHRoaXMudXZBbmltYXRpb25TY3JvbGxYT2Zmc2V0ID0gMC4wO1xuICAgIHRoaXMudXZBbmltYXRpb25TY3JvbGxZT2Zmc2V0ID0gMC4wO1xuICAgIHRoaXMudXZBbmltYXRpb25Sb3RhdGlvblBoYXNlID0gMC4wO1xuXG4gICAgdGhpcy5pc091dGxpbmUgPSBmYWxzZTtcblxuICAgIHRoaXMuX2FuaW1hdGVkVVZOb2RlID0gbnVsbDtcblxuICAgIHRoaXMuc2V0VmFsdWVzKHBhcmFtZXRlcnMpO1xuICB9XG5cbiAgcHVibGljIHNldHVwTGlnaHRpbmdNb2RlbCgvKmJ1aWxkZXIqLyk6IE1Ub29uTGlnaHRpbmdNb2RlbCB7XG4gICAgcmV0dXJuIG5ldyBNVG9vbkxpZ2h0aW5nTW9kZWwoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXR1cChidWlsZGVyOiBUSFJFRS5Ob2RlQnVpbGRlcik6IHZvaWQge1xuICAgIHRoaXMuX2FuaW1hdGVkVVZOb2RlID0gbmV3IE1Ub29uQW5pbWF0ZWRVVk5vZGUoXG4gICAgICAodGhpcy51dkFuaW1hdGlvbk1hc2tUZXh0dXJlICYmIHRoaXMudXZBbmltYXRpb25NYXNrVGV4dHVyZS5pc1RleHR1cmUgPT09IHRydWUpID8/IGZhbHNlLFxuICAgICk7XG5cbiAgICBzdXBlci5zZXR1cChidWlsZGVyKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXR1cERpZmZ1c2VDb2xvcihidWlsZGVyOiBUSFJFRS5Ob2RlQnVpbGRlcik6IHZvaWQge1xuICAgIC8vIHdlIG11c3QgYXBwbHkgdXYgc2Nyb2xsIHRvIHRoZSBtYXBcbiAgICAvLyB0aGlzLmNvbG9yTm9kZSB3aWxsIGJlIHVzZWQgaW4gc3VwZXIuc2V0dXBEaWZmdXNlQ29sb3IoKSBzbyB3ZSB0ZW1wb3JhcmlseSByZXBsYWNlIGl0XG4gICAgbGV0IHRlbXBDb2xvck5vZGU6IFRIUkVFLlNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT4gfCBudWxsID0gbnVsbDtcblxuICAgIGlmICh0aGlzLmNvbG9yTm9kZSA9PSBudWxsKSB7XG4gICAgICB0ZW1wQ29sb3JOb2RlID0gcmVmQ29sb3I7XG5cbiAgICAgIGlmICh0aGlzLm1hcCAmJiB0aGlzLm1hcC5pc1RleHR1cmUgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3QgbWFwID0gcmVmTWFwLmNvbnRleHQoeyBnZXRVVjogKCkgPT4gdGhpcy5fYW5pbWF0ZWRVVk5vZGUgfSk7XG4gICAgICAgIHRlbXBDb2xvck5vZGUgPSB0ZW1wQ29sb3JOb2RlLm11bChtYXApO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNvbG9yTm9kZSA9IHRlbXBDb2xvck5vZGU7XG4gICAgfVxuXG4gICAgLy8gTVRvb24gbXVzdCBpZ25vcmUgdmVydGV4IGNvbG9yIGJ5IHNwZWNcbiAgICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS92cm0tYy92cm0tc3BlY2lmaWNhdGlvbi9ibG9iLzQyYzBhOTBlNmI0YjcxMDM1MjU2OTk3OGYxNDk4MGU5ZmM5NGIyNWQvc3BlY2lmaWNhdGlvbi9WUk1DX21hdGVyaWFsc19tdG9vbi0xLjAvUkVBRE1FLm1kI3ZlcnRleC1jb2xvcnNcbiAgICBpZiAodGhpcy52ZXJ0ZXhDb2xvcnMgPT09IHRydWUgJiYgYnVpbGRlci5nZW9tZXRyeS5oYXNBdHRyaWJ1dGUoJ2NvbG9yJykpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgJ01Ub29uTm9kZU1hdGVyaWFsOiBNVG9vbiBpZ25vcmVzIHZlcnRleCBjb2xvcnMuIENvbnNpZGVyIHVzaW5nIGEgbW9kZWwgd2l0aG91dCB2ZXJ0ZXggY29sb3JzIGluc3RlYWQuJyxcbiAgICAgICk7XG4gICAgICB0aGlzLnZlcnRleENvbG9ycyA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8vIHRoZSBvcmRpbmFyeSBkaWZmdXNlQ29sb3Igc2V0dXBcbiAgICBzdXBlci5zZXR1cERpZmZ1c2VDb2xvcihidWlsZGVyKTtcblxuICAgIC8vIENPTVBBVDogcHJlLXIxNjZcbiAgICAvLyBTZXQgYWxwaGEgdG8gMSBpZiBpdCBpcyBvcGFxdWVcbiAgICAvLyBBZGRyZXNzZWQgaW4gVGhyZWUuanMgcjE2NiBidXQgd2UgbGVhdmUgaXQgaGVyZSBmb3IgY29tcGF0aWJpbGl0eVxuICAgIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9wdWxsLzI4NjQ2XG4gICAgaWYgKHBhcnNlSW50KFRIUkVFLlJFVklTSU9OLCAxMCkgPCAxNjYpIHtcbiAgICAgIGlmICh0aGlzLnRyYW5zcGFyZW50ID09PSBmYWxzZSAmJiB0aGlzLmJsZW5kaW5nID09PSBUSFJFRS5Ob3JtYWxCbGVuZGluZyAmJiB0aGlzLmFscGhhVG9Db3ZlcmFnZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgVEhSRUUuZGlmZnVzZUNvbG9yLmEuYXNzaWduKDEuMCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gcmV2ZXJ0IHRoZSBjb2xvck5vZGVcbiAgICBpZiAodGhpcy5jb2xvck5vZGUgPT09IHRlbXBDb2xvck5vZGUpIHtcbiAgICAgIHRoaXMuY29sb3JOb2RlID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2V0dXBWYXJpYW50cygpOiB2b2lkIHtcbiAgICBzaGFkZUNvbG9yLmFzc2lnbih0aGlzLl9zZXR1cFNoYWRlQ29sb3JOb2RlKCkpO1xuICAgIHNoYWRpbmdTaGlmdC5hc3NpZ24odGhpcy5fc2V0dXBTaGFkaW5nU2hpZnROb2RlKCkpO1xuICAgIHNoYWRpbmdUb29ueS5hc3NpZ24odGhpcy5fc2V0dXBTaGFkaW5nVG9vbnlOb2RlKCkpO1xuICAgIHJpbUxpZ2h0aW5nTWl4LmFzc2lnbih0aGlzLl9zZXR1cFJpbUxpZ2h0aW5nTWl4Tm9kZSgpKTtcbiAgICByaW1NdWx0aXBseS5hc3NpZ24odGhpcy5fc2V0dXBSaW1NdWx0aXBseU5vZGUoKSk7XG4gICAgbWF0Y2FwLmFzc2lnbih0aGlzLl9zZXR1cE1hdGNhcE5vZGUoKSk7XG4gICAgcGFyYW1ldHJpY1JpbS5hc3NpZ24odGhpcy5fc2V0dXBQYXJhbWV0cmljUmltTm9kZSgpKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXR1cE5vcm1hbChidWlsZGVyOiBUSFJFRS5Ob2RlQnVpbGRlcik6IHZvaWQge1xuICAgIC8vIHdlIG11c3QgYXBwbHkgdXYgc2Nyb2xsIHRvIHRoZSBub3JtYWxNYXBcbiAgICAvLyB0aGlzLm5vcm1hbE5vZGUgd2lsbCBiZSB1c2VkIGluIHN1cGVyLnNldHVwTm9ybWFsKCkgc28gd2UgdGVtcG9yYXJpbHkgcmVwbGFjZSBpdFxuICAgIGNvbnN0IHRlbXBOb3JtYWxOb2RlID0gdGhpcy5ub3JtYWxOb2RlO1xuXG4gICAgaWYgKHRoaXMubm9ybWFsTm9kZSA9PSBudWxsKSB7XG4gICAgICB0aGlzLm5vcm1hbE5vZGUgPSBUSFJFRS5tYXRlcmlhbE5vcm1hbDtcblxuICAgICAgaWYgKHRoaXMubm9ybWFsTWFwICYmIHRoaXMubm9ybWFsTWFwLmlzVGV4dHVyZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBtYXAgPSByZWZOb3JtYWxNYXAuY29udGV4dCh7IGdldFVWOiAoKSA9PiB0aGlzLl9hbmltYXRlZFVWTm9kZSB9KTtcbiAgICAgICAgdGhpcy5ub3JtYWxOb2RlID0gbWFwLm5vcm1hbE1hcChyZWZOb3JtYWxTY2FsZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmlzT3V0bGluZSkge1xuICAgICAgICAvLyBTZWUgYWJvdXQgdGhlIHR5cGUgYXNzZXJ0aW9uOiBodHRwczovL2dpdGh1Yi5jb20vdGhyZWUtdHlwZXMvdGhyZWUtdHMtdHlwZXMvcHVsbC8xMTIzXG4gICAgICAgIHRoaXMubm9ybWFsTm9kZSA9ICh0aGlzLm5vcm1hbE5vZGUgYXMgVEhSRUUuU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPikubmVnYXRlKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gdGhlIG9yZGluYXJ5IG5vcm1hbCBzZXR1cFxuICAgIHN1cGVyLnNldHVwTm9ybWFsKGJ1aWxkZXIpO1xuXG4gICAgLy8gcmV2ZXJ0IHRoZSBub3JtYWxOb2RlXG4gICAgdGhpcy5ub3JtYWxOb2RlID0gdGVtcE5vcm1hbE5vZGU7XG4gIH1cblxuICBwdWJsaWMgc2V0dXBMaWdodGluZyhidWlsZGVyOiBUSFJFRS5Ob2RlQnVpbGRlcik6IFRIUkVFLk5vZGUge1xuICAgIC8vIHdlIG11c3QgYXBwbHkgdXYgc2Nyb2xsIHRvIHRoZSBlbWlzc2l2ZU1hcFxuICAgIC8vIHRoaXMuZW1pc3NpdmVOb2RlIHdpbGwgYmUgdXNlZCBpbiBzdXBlci5zZXR1cExpZ2h0aW5nKCkgc28gd2UgdGVtcG9yYXJpbHkgcmVwbGFjZSBpdFxuICAgIGxldCB0ZW1wRW1pc3NpdmVOb2RlOiBUSFJFRS5TaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+IHwgbnVsbCA9IG51bGw7XG5cbiAgICBpZiAodGhpcy5lbWlzc2l2ZU5vZGUgPT0gbnVsbCkge1xuICAgICAgdGVtcEVtaXNzaXZlTm9kZSA9IHJlZkVtaXNzaXZlLm11bChyZWZFbWlzc2l2ZUludGVuc2l0eSk7XG5cbiAgICAgIGlmICh0aGlzLmVtaXNzaXZlTWFwICYmIHRoaXMuZW1pc3NpdmVNYXAuaXNUZXh0dXJlID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IG1hcCA9IHJlZkVtaXNzaXZlTWFwLmNvbnRleHQoeyBnZXRVVjogKCkgPT4gdGhpcy5fYW5pbWF0ZWRVVk5vZGUgfSk7XG4gICAgICAgIHRlbXBFbWlzc2l2ZU5vZGUgPSB0ZW1wRW1pc3NpdmVOb2RlLm11bChtYXApO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmVtaXNzaXZlTm9kZSA9IHRlbXBFbWlzc2l2ZU5vZGU7XG4gICAgfVxuXG4gICAgLy8gdGhlIG9yZGluYXJ5IGxpZ2h0aW5nIHNldHVwXG4gICAgY29uc3QgcmV0ID0gc3VwZXIuc2V0dXBMaWdodGluZyhidWlsZGVyKTtcblxuICAgIC8vIHJldmVydCB0aGUgZW1pc3NpdmVOb2RlXG4gICAgaWYgKHRoaXMuZW1pc3NpdmVOb2RlID09PSB0ZW1wRW1pc3NpdmVOb2RlKSB7XG4gICAgICB0aGlzLmVtaXNzaXZlTm9kZSA9IG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIHB1YmxpYyBzZXR1cE91dHB1dChcbiAgICBidWlsZGVyOiBUSFJFRS5Ob2RlQnVpbGRlcixcbiAgICBvdXRwdXROb2RlOiBUSFJFRS5TaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+LFxuICApOiBUSFJFRS5TaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+IHtcbiAgICAvLyBtaXggb3Igc2V0IG91dGxpbmUgY29sb3JcbiAgICBpZiAodGhpcy5pc091dGxpbmUgJiYgdGhpcy5vdXRsaW5lV2lkdGhNb2RlICE9PSBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZS5Ob25lKSB7XG4gICAgICBvdXRwdXROb2RlID0gVEhSRUUudmVjNChcbiAgICAgICAgVEhSRUUubWl4KHJlZk91dGxpbmVDb2xvckZhY3Rvciwgb3V0cHV0Tm9kZS54eXoubXVsKHJlZk91dGxpbmVDb2xvckZhY3RvciksIHJlZk91dGxpbmVMaWdodGluZ01peEZhY3RvciksXG4gICAgICAgIG91dHB1dE5vZGUudyxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gdGhlIG9yZGluYXJ5IG91dHB1dCBzZXR1cFxuICAgIHJldHVybiBzdXBlci5zZXR1cE91dHB1dChidWlsZGVyLCBvdXRwdXROb2RlKSBhcyBUSFJFRS5TaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+O1xuICB9XG5cbiAgcHVibGljIHNldHVwUG9zaXRpb24oYnVpbGRlcjogVEhSRUUuTm9kZUJ1aWxkZXIpOiBUSFJFRS5TaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+IHtcbiAgICAvLyB3ZSBtdXN0IGFwcGx5IG91dGxpbmUgcG9zaXRpb24gb2Zmc2V0XG4gICAgLy8gdGhpcy5wb3NpdGlvbk5vZGUgd2lsbCBiZSB1c2VkIGluIHN1cGVyLnNldHVwUG9zaXRpb24oKSBzbyB3ZSB0ZW1wb3JhcmlseSByZXBsYWNlIGl0XG4gICAgY29uc3QgdGVtcFBvc2l0aW9uTm9kZSA9IHRoaXMucG9zaXRpb25Ob2RlO1xuXG4gICAgaWYgKHRoaXMuaXNPdXRsaW5lICYmIHRoaXMub3V0bGluZVdpZHRoTW9kZSAhPT0gTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUuTm9uZSkge1xuICAgICAgdGhpcy5wb3NpdGlvbk5vZGUgPz89IFRIUkVFLnBvc2l0aW9uTG9jYWw7XG5cbiAgICAgIGNvbnN0IG5vcm1hbExvY2FsID0gVEhSRUUubm9ybWFsTG9jYWwubm9ybWFsaXplKCk7XG5cbiAgICAgIGxldCB3aWR0aDogVEhSRUUuU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPiA9IHJlZk91dGxpbmVXaWR0aEZhY3RvcjtcblxuICAgICAgaWYgKHRoaXMub3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlICYmIHRoaXMub3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlLmlzVGV4dHVyZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBtYXAgPSByZWZPdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmUuY29udGV4dCh7IGdldFVWOiAoKSA9PiB0aGlzLl9hbmltYXRlZFVWTm9kZSB9KTtcbiAgICAgICAgd2lkdGggPSB3aWR0aC5tdWwobWFwKTtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgd29ybGROb3JtYWxMZW5ndGggPSBUSFJFRS5sZW5ndGgoVEhSRUUubW9kZWxOb3JtYWxNYXRyaXgubXVsKG5vcm1hbExvY2FsKSk7XG4gICAgICBjb25zdCBvdXRsaW5lT2Zmc2V0ID0gd2lkdGgubXVsKHdvcmxkTm9ybWFsTGVuZ3RoKS5tdWwobm9ybWFsTG9jYWwpO1xuXG4gICAgICBpZiAodGhpcy5vdXRsaW5lV2lkdGhNb2RlID09PSBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZS5Xb3JsZENvb3JkaW5hdGVzKSB7XG4gICAgICAgIC8vIFNlZSBhYm91dCB0aGUgdHlwZSBhc3NlcnRpb246IGh0dHBzOi8vZ2l0aHViLmNvbS90aHJlZS10eXBlcy90aHJlZS10cy10eXBlcy9wdWxsLzExMjNcbiAgICAgICAgdGhpcy5wb3NpdGlvbk5vZGUgPSAodGhpcy5wb3NpdGlvbk5vZGUgYXMgVEhSRUUuU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPikuYWRkKG91dGxpbmVPZmZzZXQpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLm91dGxpbmVXaWR0aE1vZGUgPT09IE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlLlNjcmVlbkNvb3JkaW5hdGVzKSB7XG4gICAgICAgIGNvbnN0IGNsaXBTY2FsZSA9IFRIUkVFLmNhbWVyYVByb2plY3Rpb25NYXRyaXguZWxlbWVudCgxKS5lbGVtZW50KDEpO1xuXG4gICAgICAgIC8vIFNlZSBhYm91dCB0aGUgdHlwZSBhc3NlcnRpb246IGh0dHBzOi8vZ2l0aHViLmNvbS90aHJlZS10eXBlcy90aHJlZS10cy10eXBlcy9wdWxsLzExMjNcbiAgICAgICAgdGhpcy5wb3NpdGlvbk5vZGUgPSAodGhpcy5wb3NpdGlvbk5vZGUgYXMgVEhSRUUuU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPikuYWRkKFxuICAgICAgICAgIG91dGxpbmVPZmZzZXQuZGl2KGNsaXBTY2FsZSkubXVsKFRIUkVFLnBvc2l0aW9uVmlldy56Lm5lZ2F0ZSgpKSxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5wb3NpdGlvbk5vZGUgPz89IFRIUkVFLnBvc2l0aW9uTG9jYWw7XG4gICAgfVxuXG4gICAgLy8gdGhlIG9yZGluYXJ5IHBvc2l0aW9uIHNldHVwXG4gICAgY29uc3QgcmV0ID0gc3VwZXIuc2V0dXBQb3NpdGlvbihidWlsZGVyKSBhcyBUSFJFRS5TaGFkZXJOb2RlT2JqZWN0PFRIUkVFLk5vZGU+O1xuXG4gICAgLy8gYW50aSB6LWZpZ2h0aW5nXG4gICAgLy8gVE9ETzogV2UgbWlnaHQgd2FudCB0byBhZGRyZXNzIHRoaXMgdmlhIGdsUG9seWdvbk9mZnNldCBpbnN0ZWFkP1xuICAgIHJldC56LmFkZChyZXQudy5tdWwoMWUtNikpO1xuXG4gICAgLy8gcmV2ZXJ0IHRoZSBwb3NpdGlvbk5vZGVcbiAgICB0aGlzLnBvc2l0aW9uTm9kZSA9IHRlbXBQb3NpdGlvbk5vZGU7XG5cbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgcHVibGljIGNvcHkoc291cmNlOiBNVG9vbk5vZGVNYXRlcmlhbCk6IHRoaXMge1xuICAgIHRoaXMuY29sb3IuY29weShzb3VyY2UuY29sb3IpO1xuICAgIHRoaXMubWFwID0gc291cmNlLm1hcCA/PyBudWxsO1xuICAgIHRoaXMuZW1pc3NpdmUuY29weShzb3VyY2UuZW1pc3NpdmUpO1xuICAgIHRoaXMuZW1pc3NpdmVJbnRlbnNpdHkgPSBzb3VyY2UuZW1pc3NpdmVJbnRlbnNpdHk7XG4gICAgdGhpcy5lbWlzc2l2ZU1hcCA9IHNvdXJjZS5lbWlzc2l2ZU1hcCA/PyBudWxsO1xuICAgIHRoaXMubm9ybWFsTWFwID0gc291cmNlLm5vcm1hbE1hcCA/PyBudWxsO1xuICAgIHRoaXMubm9ybWFsU2NhbGUuY29weShzb3VyY2Uubm9ybWFsU2NhbGUpO1xuXG4gICAgdGhpcy5zaGFkZUNvbG9yRmFjdG9yLmNvcHkoc291cmNlLnNoYWRlQ29sb3JGYWN0b3IpO1xuICAgIHRoaXMuc2hhZGVNdWx0aXBseVRleHR1cmUgPSBzb3VyY2Uuc2hhZGVNdWx0aXBseVRleHR1cmUgPz8gbnVsbDtcbiAgICB0aGlzLnNoYWRpbmdTaGlmdEZhY3RvciA9IHNvdXJjZS5zaGFkaW5nU2hpZnRGYWN0b3I7XG4gICAgdGhpcy5zaGFkaW5nU2hpZnRUZXh0dXJlID0gc291cmNlLnNoYWRpbmdTaGlmdFRleHR1cmUgPz8gbnVsbDtcbiAgICB0aGlzLnNoYWRpbmdTaGlmdFRleHR1cmVTY2FsZSA9IHNvdXJjZS5zaGFkaW5nU2hpZnRUZXh0dXJlU2NhbGU7XG4gICAgdGhpcy5zaGFkaW5nVG9vbnlGYWN0b3IgPSBzb3VyY2Uuc2hhZGluZ1Rvb255RmFjdG9yO1xuICAgIHRoaXMucmltTGlnaHRpbmdNaXhGYWN0b3IgPSBzb3VyY2UucmltTGlnaHRpbmdNaXhGYWN0b3I7XG4gICAgdGhpcy5yaW1NdWx0aXBseVRleHR1cmUgPSBzb3VyY2UucmltTXVsdGlwbHlUZXh0dXJlID8/IG51bGw7XG4gICAgdGhpcy5tYXRjYXBGYWN0b3IuY29weShzb3VyY2UubWF0Y2FwRmFjdG9yKTtcbiAgICB0aGlzLm1hdGNhcFRleHR1cmUgPSBzb3VyY2UubWF0Y2FwVGV4dHVyZSA/PyBudWxsO1xuICAgIHRoaXMucGFyYW1ldHJpY1JpbUNvbG9yRmFjdG9yLmNvcHkoc291cmNlLnBhcmFtZXRyaWNSaW1Db2xvckZhY3Rvcik7XG4gICAgdGhpcy5wYXJhbWV0cmljUmltTGlmdEZhY3RvciA9IHNvdXJjZS5wYXJhbWV0cmljUmltTGlmdEZhY3RvcjtcbiAgICB0aGlzLnBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJGYWN0b3IgPSBzb3VyY2UucGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlckZhY3RvcjtcbiAgICB0aGlzLm91dGxpbmVXaWR0aE1vZGUgPSBzb3VyY2Uub3V0bGluZVdpZHRoTW9kZTtcbiAgICB0aGlzLm91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZSA9IHNvdXJjZS5vdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmUgPz8gbnVsbDtcbiAgICB0aGlzLm91dGxpbmVXaWR0aEZhY3RvciA9IHNvdXJjZS5vdXRsaW5lV2lkdGhGYWN0b3I7XG4gICAgdGhpcy5vdXRsaW5lQ29sb3JGYWN0b3IuY29weShzb3VyY2Uub3V0bGluZUNvbG9yRmFjdG9yKTtcbiAgICB0aGlzLm91dGxpbmVMaWdodGluZ01peEZhY3RvciA9IHNvdXJjZS5vdXRsaW5lTGlnaHRpbmdNaXhGYWN0b3I7XG4gICAgdGhpcy51dkFuaW1hdGlvblNjcm9sbFhTcGVlZEZhY3RvciA9IHNvdXJjZS51dkFuaW1hdGlvblNjcm9sbFhTcGVlZEZhY3RvcjtcbiAgICB0aGlzLnV2QW5pbWF0aW9uU2Nyb2xsWVNwZWVkRmFjdG9yID0gc291cmNlLnV2QW5pbWF0aW9uU2Nyb2xsWVNwZWVkRmFjdG9yO1xuICAgIHRoaXMudXZBbmltYXRpb25Sb3RhdGlvblNwZWVkRmFjdG9yID0gc291cmNlLnV2QW5pbWF0aW9uUm90YXRpb25TcGVlZEZhY3RvcjtcbiAgICB0aGlzLnV2QW5pbWF0aW9uTWFza1RleHR1cmUgPSBzb3VyY2UudXZBbmltYXRpb25NYXNrVGV4dHVyZSA/PyBudWxsO1xuXG4gICAgdGhpcy5zaGFkZUNvbG9yTm9kZSA9IHNvdXJjZS5zaGFkZUNvbG9yTm9kZSA/PyBudWxsO1xuICAgIHRoaXMuc2hhZGluZ1NoaWZ0Tm9kZSA9IHNvdXJjZS5zaGFkaW5nU2hpZnROb2RlID8/IG51bGw7XG4gICAgdGhpcy5zaGFkaW5nVG9vbnlOb2RlID0gc291cmNlLnNoYWRpbmdUb29ueU5vZGUgPz8gbnVsbDtcbiAgICB0aGlzLnJpbUxpZ2h0aW5nTWl4Tm9kZSA9IHNvdXJjZS5yaW1MaWdodGluZ01peE5vZGUgPz8gbnVsbDtcbiAgICB0aGlzLnJpbU11bHRpcGx5Tm9kZSA9IHNvdXJjZS5yaW1NdWx0aXBseU5vZGUgPz8gbnVsbDtcbiAgICB0aGlzLm1hdGNhcE5vZGUgPSBzb3VyY2UubWF0Y2FwTm9kZSA/PyBudWxsO1xuICAgIHRoaXMucGFyYW1ldHJpY1JpbUNvbG9yTm9kZSA9IHNvdXJjZS5wYXJhbWV0cmljUmltQ29sb3JOb2RlID8/IG51bGw7XG4gICAgdGhpcy5wYXJhbWV0cmljUmltTGlmdE5vZGUgPSBzb3VyY2UucGFyYW1ldHJpY1JpbUxpZnROb2RlID8/IG51bGw7XG4gICAgdGhpcy5wYXJhbWV0cmljUmltRnJlc25lbFBvd2VyTm9kZSA9IHNvdXJjZS5wYXJhbWV0cmljUmltRnJlc25lbFBvd2VyTm9kZSA/PyBudWxsO1xuXG4gICAgdGhpcy5pc091dGxpbmUgPSBzb3VyY2UuaXNPdXRsaW5lID8/IG51bGw7XG5cbiAgICByZXR1cm4gc3VwZXIuY29weShzb3VyY2UpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZShkZWx0YTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy51dkFuaW1hdGlvblNjcm9sbFhPZmZzZXQgKz0gZGVsdGEgKiB0aGlzLnV2QW5pbWF0aW9uU2Nyb2xsWFNwZWVkRmFjdG9yO1xuICAgIHRoaXMudXZBbmltYXRpb25TY3JvbGxZT2Zmc2V0ICs9IGRlbHRhICogdGhpcy51dkFuaW1hdGlvblNjcm9sbFlTcGVlZEZhY3RvcjtcbiAgICB0aGlzLnV2QW5pbWF0aW9uUm90YXRpb25QaGFzZSArPSBkZWx0YSAqIHRoaXMudXZBbmltYXRpb25Sb3RhdGlvblNwZWVkRmFjdG9yO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0dXBTaGFkZUNvbG9yTm9kZSgpOiBUSFJFRS5Td2l6emFibGUge1xuICAgIGlmICh0aGlzLnNoYWRlQ29sb3JOb2RlICE9IG51bGwpIHtcbiAgICAgIHJldHVybiBUSFJFRS52ZWMzKHRoaXMuc2hhZGVDb2xvck5vZGUpO1xuICAgIH1cblxuICAgIGxldCBzaGFkZUNvbG9yTm9kZTogVEhSRUUuU2hhZGVyTm9kZU9iamVjdDxUSFJFRS5Ob2RlPiA9IHJlZlNoYWRlQ29sb3JGYWN0b3I7XG5cbiAgICBpZiAodGhpcy5zaGFkZU11bHRpcGx5VGV4dHVyZSAmJiB0aGlzLnNoYWRlTXVsdGlwbHlUZXh0dXJlLmlzVGV4dHVyZSA9PT0gdHJ1ZSkge1xuICAgICAgY29uc3QgbWFwID0gcmVmU2hhZGVNdWx0aXBseVRleHR1cmUuY29udGV4dCh7IGdldFVWOiAoKSA9PiB0aGlzLl9hbmltYXRlZFVWTm9kZSB9KTtcbiAgICAgIHNoYWRlQ29sb3JOb2RlID0gc2hhZGVDb2xvck5vZGUubXVsKG1hcCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNoYWRlQ29sb3JOb2RlO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0dXBTaGFkaW5nU2hpZnROb2RlKCk6IFRIUkVFLk5vZGUge1xuICAgIGlmICh0aGlzLnNoYWRpbmdTaGlmdE5vZGUgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIFRIUkVFLmZsb2F0KHRoaXMuc2hhZGluZ1NoaWZ0Tm9kZSk7XG4gICAgfVxuXG4gICAgbGV0IHNoYWRpbmdTaGlmdE5vZGU6IFRIUkVFLlNoYWRlck5vZGVPYmplY3Q8VEhSRUUuTm9kZT4gPSByZWZTaGFkaW5nU2hpZnRGYWN0b3I7XG5cbiAgICBpZiAodGhpcy5zaGFkaW5nU2hpZnRUZXh0dXJlICYmIHRoaXMuc2hhZGluZ1NoaWZ0VGV4dHVyZS5pc1RleHR1cmUgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IG1hcCA9IHJlZlNoYWRlTXVsdGlwbHlUZXh0dXJlLmNvbnRleHQoeyBnZXRVVjogKCkgPT4gdGhpcy5fYW5pbWF0ZWRVVk5vZGUgfSk7XG4gICAgICBzaGFkaW5nU2hpZnROb2RlID0gc2hhZGluZ1NoaWZ0Tm9kZS5hZGQobWFwLm11bChyZWZTaGFkZU11bHRpcGx5VGV4dHVyZVNjYWxlKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNoYWRpbmdTaGlmdE5vZGU7XG4gIH1cblxuICBwcml2YXRlIF9zZXR1cFNoYWRpbmdUb29ueU5vZGUoKTogVEhSRUUuTm9kZSB7XG4gICAgaWYgKHRoaXMuc2hhZGluZ1Rvb255Tm9kZSAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gVEhSRUUuZmxvYXQodGhpcy5zaGFkaW5nVG9vbnlOb2RlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVmU2hhZGluZ1Rvb255RmFjdG9yO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0dXBSaW1MaWdodGluZ01peE5vZGUoKTogVEhSRUUuTm9kZSB7XG4gICAgaWYgKHRoaXMucmltTGlnaHRpbmdNaXhOb2RlICE9IG51bGwpIHtcbiAgICAgIHJldHVybiBUSFJFRS5mbG9hdCh0aGlzLnJpbUxpZ2h0aW5nTWl4Tm9kZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlZlJpbUxpZ2h0aW5nTWl4RmFjdG9yO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0dXBSaW1NdWx0aXBseU5vZGUoKTogVEhSRUUuU3dpenphYmxlIHtcbiAgICBpZiAodGhpcy5yaW1NdWx0aXBseU5vZGUgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIFRIUkVFLnZlYzModGhpcy5yaW1NdWx0aXBseU5vZGUpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnJpbU11bHRpcGx5VGV4dHVyZSAmJiB0aGlzLnJpbU11bHRpcGx5VGV4dHVyZS5pc1RleHR1cmUgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IG1hcCA9IHJlZlJpbU11bHRpcGx5VGV4dHVyZS5jb250ZXh0KHsgZ2V0VVY6ICgpID0+IHRoaXMuX2FuaW1hdGVkVVZOb2RlIH0pO1xuICAgICAgcmV0dXJuIG1hcDtcbiAgICB9XG5cbiAgICByZXR1cm4gVEhSRUUudmVjMygxLjApO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0dXBNYXRjYXBOb2RlKCk6IFRIUkVFLlN3aXp6YWJsZSB7XG4gICAgaWYgKHRoaXMubWF0Y2FwTm9kZSAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gVEhSRUUudmVjMyh0aGlzLm1hdGNhcE5vZGUpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm1hdGNhcFRleHR1cmUgJiYgdGhpcy5tYXRjYXBUZXh0dXJlLmlzVGV4dHVyZSA9PT0gdHJ1ZSkge1xuICAgICAgY29uc3QgbWFwID0gcmVmTWF0Y2FwVGV4dHVyZS5jb250ZXh0KHsgZ2V0VVY6ICgpID0+IFRIUkVFLm1hdGNhcFVWLm11bCgxLjAsIC0xLjApLmFkZCgwLjAsIDEuMCkgfSk7XG4gICAgICByZXR1cm4gbWFwLm11bChyZWZNYXRjYXBGYWN0b3IpO1xuICAgIH1cblxuICAgIHJldHVybiBUSFJFRS52ZWMzKDAuMCk7XG4gIH1cblxuICBwcml2YXRlIF9zZXR1cFBhcmFtZXRyaWNSaW1Ob2RlKCk6IFRIUkVFLlN3aXp6YWJsZSB7XG4gICAgY29uc3QgcGFyYW1ldHJpY1JpbUNvbG9yID1cbiAgICAgIHRoaXMucGFyYW1ldHJpY1JpbUNvbG9yTm9kZSAhPSBudWxsID8gVEhSRUUudmVjMyh0aGlzLnBhcmFtZXRyaWNSaW1Db2xvck5vZGUpIDogcmVmUGFyYW1ldHJpY1JpbUNvbG9yRmFjdG9yO1xuXG4gICAgY29uc3QgcGFyYW1ldHJpY1JpbUxpZnQgPVxuICAgICAgdGhpcy5wYXJhbWV0cmljUmltTGlmdE5vZGUgIT0gbnVsbCA/IFRIUkVFLmZsb2F0KHRoaXMucGFyYW1ldHJpY1JpbUxpZnROb2RlKSA6IHJlZlBhcmFtZXRyaWNSaW1MaWZ0RmFjdG9yO1xuXG4gICAgY29uc3QgcGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlciA9XG4gICAgICB0aGlzLnBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJOb2RlICE9IG51bGxcbiAgICAgICAgPyBUSFJFRS5mbG9hdCh0aGlzLnBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJOb2RlKVxuICAgICAgICA6IHJlZlBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJGYWN0b3I7XG5cbiAgICByZXR1cm4gbXRvb25QYXJhbWV0cmljUmltKHtcbiAgICAgIHBhcmFtZXRyaWNSaW1MaWZ0LFxuICAgICAgcGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlcixcbiAgICAgIHBhcmFtZXRyaWNSaW1Db2xvcixcbiAgICB9KTtcbiAgfVxufVxuXG4vLyBUT0RPOiBQYXJ0IG9mIHN0dWZmIHRoYXQgTVRvb25NYXRlcmlhbCBkZXBlbmRzIG9uIGRvZXMgbm90IGV4aXN0IGluIHRocmVlL3dlYmdwdSAoZS5nLiBVbmlmb3Jtc0xpYilcbi8vIFRIUkVFLmFkZE5vZGVNYXRlcmlhbCgnTVRvb25Ob2RlTWF0ZXJpYWwnLCBNVG9vbk5vZGVNYXRlcmlhbCk7XG4iLCAiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uICovXG5cbmV4cG9ydCBjb25zdCBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZSA9IHtcbiAgTm9uZTogJ25vbmUnLFxuICBXb3JsZENvb3JkaW5hdGVzOiAnd29ybGRDb29yZGluYXRlcycsXG4gIFNjcmVlbkNvb3JkaW5hdGVzOiAnc2NyZWVuQ29vcmRpbmF0ZXMnLFxufSBhcyBjb25zdDtcblxuZXhwb3J0IHR5cGUgTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUgPVxuICB0eXBlb2YgTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGVba2V5b2YgdHlwZW9mIE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlXTtcbiIsICJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS93ZWJncHUnO1xuXG5leHBvcnQgY29uc3QgbXRvb25QYXJhbWV0cmljUmltID0gVEhSRUUudHNsRm4oXG4gICh7XG4gICAgcGFyYW1ldHJpY1JpbUxpZnQsXG4gICAgcGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlcixcbiAgICBwYXJhbWV0cmljUmltQ29sb3IsXG4gIH06IHtcbiAgICBwYXJhbWV0cmljUmltTGlmdDogVEhSRUUuTm9kZVJlcHJlc2VudGF0aW9uO1xuICAgIHBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXI6IFRIUkVFLk5vZGVSZXByZXNlbnRhdGlvbjtcbiAgICBwYXJhbWV0cmljUmltQ29sb3I6IFRIUkVFLk5vZGVSZXByZXNlbnRhdGlvbjtcbiAgfSkgPT4ge1xuICAgIGNvbnN0IHZpZXdEaXIgPSBUSFJFRS5tb2RlbFZpZXdQb3NpdGlvbi5ub3JtYWxpemUoKTtcbiAgICBjb25zdCBkb3ROViA9IFRIUkVFLnRyYW5zZm9ybWVkTm9ybWFsVmlldy5kb3Qodmlld0Rpci5uZWdhdGUoKSk7XG5cbiAgICBjb25zdCByaW0gPSBUSFJFRS5mbG9hdCgxLjApLnN1Yihkb3ROVikuYWRkKHBhcmFtZXRyaWNSaW1MaWZ0KS5jbGFtcCgpLnBvdyhwYXJhbWV0cmljUmltRnJlc25lbFBvd2VyKTtcblxuICAgIHJldHVybiByaW0ubXVsKHBhcmFtZXRyaWNSaW1Db2xvcik7XG4gIH0sXG4pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7OztBQUdBLFlBQVksV0FBVztBQ0h2QixZQUFZQSxZQUFXO0FDQXZCLFlBQVlBLFlBQVc7QUNBdkIsWUFBWUEsWUFBVztBQ0F2QixZQUFZQSxZQUFXO0FDQXZCLFlBQVlBLFlBQVc7QUVBdkIsWUFBWUEsWUFBVztBUEt2QixJQUFNLGdCQUFnQixTQUFlLGdCQUFVLEVBQUU7QUFDakQsSUFBSSxnQkFBZ0IsS0FBSztBQUN2QixVQUFRO0lBQ04sc0VBQXNFLGFBQWE7RUFDckY7QUFDRjtBRVJPLElBQU0sV0FBaUIseUJBQWtCLFNBQVMsT0FBTztBQUN6RCxJQUFNLFNBQWUseUJBQWtCLE9BQU8sU0FBUztBQUN2RCxJQUFNLGVBQXFCLHlCQUFrQixhQUFhLFNBQVM7QUFDbkUsSUFBTSxpQkFBdUIseUJBQWtCLGVBQWUsTUFBTTtBQUNwRSxJQUFNLGNBQW9CLHlCQUFrQixZQUFZLE9BQU87QUFDL0QsSUFBTSx1QkFBNkIseUJBQWtCLHFCQUFxQixPQUFPO0FBQ2pGLElBQU0saUJBQXVCLHlCQUFrQixlQUFlLFNBQVM7QUFFdkUsSUFBTSxzQkFBNEIseUJBQWtCLG9CQUFvQixPQUFPO0FBQy9FLElBQU0sd0JBQThCLHlCQUFrQixzQkFBc0IsT0FBTztBQUNuRixJQUFNLDBCQUFnQyx5QkFBa0Isd0JBQXdCLFNBQVM7QUFDekYsSUFBTSwrQkFBcUMseUJBQWtCLDZCQUE2QixPQUFPO0FBQ2pHLElBQU0sd0JBQThCLHlCQUFrQixzQkFBc0IsT0FBTztBQUNuRixJQUFNLDBCQUFnQyx5QkFBa0Isd0JBQXdCLE9BQU87QUFDdkYsSUFBTSx3QkFBOEIseUJBQWtCLHNCQUFzQixTQUFTO0FBQ3JGLElBQU0sa0JBQXdCLHlCQUFrQixnQkFBZ0IsT0FBTztBQUN2RSxJQUFNLG1CQUF5Qix5QkFBa0IsaUJBQWlCLFNBQVM7QUFDM0UsSUFBTSw4QkFBb0MseUJBQWtCLDRCQUE0QixPQUFPO0FBQy9GLElBQU0sNkJBQW1DLHlCQUFrQiwyQkFBMkIsT0FBTztBQUM3RixJQUFNLHFDQUEyQyx5QkFBa0IsbUNBQW1DLE9BQU87QUFDN0csSUFBTSxpQ0FBdUMseUJBQWtCLCtCQUErQixTQUFTO0FBQ3ZHLElBQU0sd0JBQThCLHlCQUFrQixzQkFBc0IsT0FBTztBQUNuRixJQUFNLHdCQUE4Qix5QkFBa0Isc0JBQXNCLE9BQU87QUFDbkYsSUFBTSw4QkFBb0MseUJBQWtCLDRCQUE0QixPQUFPO0FBQy9GLElBQU0sNEJBQWtDLHlCQUFrQiwwQkFBMEIsU0FBUztBQUU3RixJQUFNLDhCQUFvQyx5QkFBa0IsNEJBQTRCLE9BQU87QUFDL0YsSUFBTSw4QkFBb0MseUJBQWtCLDRCQUE0QixPQUFPO0FBQy9GLElBQU0sOEJBQW9DLHlCQUFrQiw0QkFBNEIsT0FBTztBRHRCL0YsSUFBTSxzQkFBTixjQUF3QyxnQkFBUztFQUcvQyxZQUFZLGdCQUF5QjtBQUMxQyxVQUFNLE1BQU07QUFFWixTQUFLLGlCQUFpQjtFQUN4QjtFQUVPLFFBQStDO0FBQ3BELFFBQUksa0JBQTRDO0FBRWhELFFBQUksS0FBSyxnQkFBZ0I7QUFDdkIsd0JBQXdCLFlBQUsseUJBQXlCLEVBQUUsUUFBUSxFQUFFLE9BQU8sTUFBWSxVQUFHLEVBQUUsQ0FBQyxFQUFFO0lBQy9GO0FBRUEsUUFBSUMsTUFBb0QsVUFBRztBQUczRCxVQUFNLFFBQVEsNEJBQTRCLElBQUksZUFBZTtBQU03RCxVQUFNLElBQVUsV0FBSSxLQUFLO0FBQ3pCLFVBQU0sSUFBVSxXQUFJLEtBQUs7QUFDekJBLFVBQUtBLElBQUcsSUFBVSxZQUFLLEtBQUssR0FBRyxDQUFDO0FBQ2hDQSxVQUFLQSxJQUFHLElBQVUsWUFBSyxHQUFHLEdBQUcsRUFBRSxPQUFPLEdBQUcsQ0FBQyxDQUFDO0FBQzNDQSxVQUFLQSxJQUFHLElBQVUsWUFBSyxLQUFLLEdBQUcsQ0FBQztBQUdoQyxVQUFNLFNBQWUsWUFBSyw2QkFBNkIsMkJBQTJCLEVBQUUsSUFBSSxlQUFlO0FBQ3ZHQSxVQUFLQSxJQUFHLElBQUksTUFBTTtBQUVsQixXQUFPQSxJQUFHLEtBQUssWUFBWTtFQUM3QjtBQUNGO0FHM0NPLElBQU0sYUFBbUIscUJBQW9CLHFCQUFjLE1BQU0sRUFBRSxLQUFLLFlBQVk7QUFDcEYsSUFBTSxlQUFxQixxQkFBb0IscUJBQWMsT0FBTyxFQUFFLEtBQUssY0FBYztBQUN6RixJQUFNLGVBQXFCLHFCQUFvQixxQkFBYyxPQUFPLEVBQUUsS0FBSyxjQUFjO0FBQ3pGLElBQU0saUJBQXVCLHFCQUFvQixxQkFBYyxPQUFPLEVBQUUsS0FBSyxnQkFBZ0I7QUFDN0YsSUFBTSxjQUFvQixxQkFBb0IscUJBQWMsTUFBTSxFQUFFLEtBQUssYUFBYTtBQUN0RixJQUFNLFNBQWUscUJBQW9CLHFCQUFjLE1BQU0sRUFBRSxLQUFLLFFBQVE7QUFDNUUsSUFBTSxnQkFBc0IscUJBQW9CLHFCQUFjLE1BQU0sRUFBRSxLQUFLLGVBQWU7QURLakcsSUFBTSxhQUFtQjtFQUN2QixDQUFDO0lBQ0M7SUFDQTtJQUNBO0VBQ0YsTUFJTTtBQUNKLFVBQU0sTUFBTSxFQUFFLElBQUksQ0FBQztBQUNuQixVQUFNLFNBQVMsRUFBRSxJQUFJLENBQUM7QUFDdEIsV0FBTyxJQUFJLElBQUksTUFBTSxFQUFFLE1BQU07RUFDL0I7QUFDRjtBQUtBLElBQU0sYUFBbUIsYUFBTSxDQUFDLEVBQUUsTUFBTSxNQUFxRDtBQUMzRixRQUFNLFNBQVM7QUFFZixRQUFNLFVBQWdCLGFBQU0sQ0FBRyxFQUFFLElBQUksWUFBWTtBQUVqRCxNQUFJLFVBQThDLE1BQU0sSUFBSSxZQUFZO0FBQ3hFLFlBQVUsV0FBVztJQUNuQixHQUFHLFFBQVEsT0FBTztJQUNsQixHQUFHO0lBQ0gsR0FBRztFQUNMLENBQUM7QUFDRCxZQUFVLFFBQVEsSUFBSSxNQUFNO0FBQzVCLFNBQU87QUFDVCxDQUFDO0FBS0QsSUFBTSxhQUFtQjtFQUN2QixDQUFDO0lBQ0M7SUFDQTtFQUNGLE1BR007QUFDSixVQUFNQyxnQkFBcUIsV0FBSSxZQUFrQixxQkFBYyxPQUFPO0FBQ3RFLFVBQU0sTUFBTSxXQUFXLElBQVUsb0JBQWEsRUFBRSxjQUFBQSxjQUFhLENBQUMsQ0FBQztBQUUvRCxXQUFPO0VBQ1Q7QUFDRjtBQUVPLElBQU0scUJBQU4sY0FBdUMscUJBQWM7RUFDMUQsY0FBYztBQUNaLFVBQU07RUFDUjtFQUVBLE9BQU8sRUFBRSxnQkFBZ0IsWUFBWSxlQUFlLEdBQW1DO0FBQ3JGLFVBQU0sUUFBYyw2QkFBc0IsSUFBSSxjQUFjLEVBQUUsTUFBTSxJQUFNLENBQUc7QUFHN0UsVUFBTSxVQUFVLFdBQVc7TUFDekI7SUFDRixDQUFDO0FBS0EsbUJBQWUsY0FBcUQ7TUFDbEUsZUFBZSxjQUFxRDtRQUNuRSxXQUFXO1VBQ1Q7VUFDQTtRQUNGLENBQUM7TUFDSDtJQUNGO0FBR0MsbUJBQWUsZUFBc0Q7TUFDbkUsZUFBZSxlQUFzRDtRQUNwRSxjQUNHLElBQUksTUFBTSxFQUNWLElBQUksV0FBVyxFQUNmLElBQVUsV0FBVSxZQUFLLENBQUcsR0FBUyxvQkFBYSxFQUFFLGNBQWMsV0FBVyxDQUFDLEdBQUcsY0FBYyxDQUFDO01BQ3JHO0lBQ0Y7RUFDRjtFQUVBLFNBQVMsU0FBMkM7QUFDbEQsU0FBSyxnQkFBZ0IsT0FBTztBQUM1QixTQUFLLGlCQUFpQixPQUFPO0VBQy9CO0VBRUEsZ0JBQWdCLEVBQUUsWUFBWSxlQUFlLEdBQXFDO0FBRS9FLG1CQUFlLGdCQUF1RDtNQUNwRSxlQUFlLGdCQUF1RDtRQUNwRSxXQUFrRDtVQUMzQyxvQkFBYTtZQUNqQixjQUFvQjtVQUN0QixDQUFDO1FBQ0g7TUFDRjtJQUNGO0VBQ0Y7RUFFQSxpQkFBaUIsRUFBRSxlQUFlLEdBQXFDO0FBRXBFLG1CQUFlLGlCQUF3RDtNQUNyRSxlQUFlLGlCQUF3RDtRQUN0RSxjQUNHLElBQUksTUFBTSxFQUNWLElBQUksV0FBVyxFQUNmLElBQVUsV0FBVSxZQUFLLENBQUcsR0FBUyxZQUFLLENBQUcsR0FBRyxjQUFjLENBQUM7TUFDcEU7SUFDRjtFQUNGO0FBQ0Y7QUdoSU8sSUFBTSxnQ0FBZ0M7RUFDM0MsTUFBTTtFQUNOLGtCQUFrQjtFQUNsQixtQkFBbUI7QUFDckI7QUNKTyxJQUFNLHFCQUEyQjtFQUN0QyxDQUFDO0lBQ0M7SUFDQTtJQUNBO0VBQ0YsTUFJTTtBQUNKLFVBQU0sVUFBZ0IseUJBQWtCLFVBQVU7QUFDbEQsVUFBTSxRQUFjLDZCQUFzQixJQUFJLFFBQVEsT0FBTyxDQUFDO0FBRTlELFVBQU0sTUFBWSxhQUFNLENBQUcsRUFBRSxJQUFJLEtBQUssRUFBRSxJQUFJLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxJQUFJLHlCQUF5QjtBQUVwRyxXQUFPLElBQUksSUFBSSxrQkFBa0I7RUFDbkM7QUFDRjtBRmdDTyxJQUFNLG9CQUFOLGNBQXNDLG9CQUFhO0VBb0RqRCx3QkFBZ0M7QUFDckMsUUFBSSxXQUFXLE1BQU0sc0JBQXNCO0FBRTNDLGdCQUFZLGFBQWEsS0FBSyxTQUFTO0FBRXZDLFdBQU87RUFDVDs7OztFQUtBLElBQVcsc0JBQTRCO0FBQ3JDLFdBQU87RUFDVDtFQUVPLFlBQVksYUFBMEMsQ0FBQyxHQUFHO0FBQy9ELFVBQU07QUFFTixRQUFJLFdBQVcsdUJBQXVCO0FBQ3BDLGlCQUFXLGFBQWE7SUFDMUI7QUFDQSxXQUFPLFdBQVc7QUFLbEIsV0FBUSxXQUFtQjtBQUMzQixXQUFRLFdBQW1CO0FBQzNCLFdBQVEsV0FBbUI7QUFFM0IsU0FBSyxlQUFlO0FBRXBCLFNBQUssU0FBUztBQUVkLFNBQUssUUFBUSxJQUFVLGFBQU0sR0FBSyxHQUFLLENBQUc7QUFDMUMsU0FBSyxNQUFNO0FBQ1gsU0FBSyxXQUFXLElBQVUsYUFBTSxHQUFLLEdBQUssQ0FBRztBQUM3QyxTQUFLLG9CQUFvQjtBQUN6QixTQUFLLGNBQWM7QUFDbkIsU0FBSyxZQUFZO0FBQ2pCLFNBQUssY0FBYyxJQUFVLGVBQVEsR0FBSyxDQUFHO0FBQzdDLFNBQUssbUJBQW1CLElBQVUsYUFBTSxHQUFLLEdBQUssQ0FBRztBQUNyRCxTQUFLLHVCQUF1QjtBQUM1QixTQUFLLHFCQUFxQjtBQUMxQixTQUFLLHNCQUFzQjtBQUMzQixTQUFLLDJCQUEyQjtBQUNoQyxTQUFLLHFCQUFxQjtBQUMxQixTQUFLLHVCQUF1QjtBQUM1QixTQUFLLHFCQUFxQjtBQUMxQixTQUFLLGVBQWUsSUFBVSxhQUFNLEdBQUssR0FBSyxDQUFHO0FBQ2pELFNBQUssZ0JBQWdCO0FBQ3JCLFNBQUssMkJBQTJCLElBQVUsYUFBTSxHQUFLLEdBQUssQ0FBRztBQUM3RCxTQUFLLDBCQUEwQjtBQUMvQixTQUFLLGtDQUFrQztBQUN2QyxTQUFLLG1CQUFtQiw4QkFBOEI7QUFDdEQsU0FBSyw4QkFBOEI7QUFDbkMsU0FBSyxxQkFBcUI7QUFDMUIsU0FBSyxxQkFBcUIsSUFBVSxhQUFNLEdBQUssR0FBSyxDQUFHO0FBQ3ZELFNBQUssMkJBQTJCO0FBQ2hDLFNBQUssZ0NBQWdDO0FBQ3JDLFNBQUssZ0NBQWdDO0FBQ3JDLFNBQUssaUNBQWlDO0FBQ3RDLFNBQUsseUJBQXlCO0FBRTlCLFNBQUssaUJBQWlCO0FBQ3RCLFNBQUssbUJBQW1CO0FBQ3hCLFNBQUssbUJBQW1CO0FBQ3hCLFNBQUsscUJBQXFCO0FBQzFCLFNBQUssa0JBQWtCO0FBQ3ZCLFNBQUssYUFBYTtBQUNsQixTQUFLLHlCQUF5QjtBQUM5QixTQUFLLHdCQUF3QjtBQUM3QixTQUFLLGdDQUFnQztBQUVyQyxTQUFLLDJCQUEyQjtBQUNoQyxTQUFLLDJCQUEyQjtBQUNoQyxTQUFLLDJCQUEyQjtBQUVoQyxTQUFLLFlBQVk7QUFFakIsU0FBSyxrQkFBa0I7QUFFdkIsU0FBSyxVQUFVLFVBQVU7RUFDM0I7RUFFTyxxQkFBb0Q7QUFDekQsV0FBTyxJQUFJLG1CQUFtQjtFQUNoQztFQUVPLE1BQU0sU0FBa0M7QUFoTWpELFFBQUE7QUFpTUksU0FBSyxrQkFBa0IsSUFBSTtPQUN4QixLQUFBLEtBQUssMEJBQTBCLEtBQUssdUJBQXVCLGNBQWMsU0FBekUsT0FBQSxLQUFrRjtJQUNyRjtBQUVBLFVBQU0sTUFBTSxPQUFPO0VBQ3JCO0VBRU8sa0JBQWtCLFNBQWtDO0FBR3pELFFBQUksZ0JBQTJEO0FBRS9ELFFBQUksS0FBSyxhQUFhLE1BQU07QUFDMUIsc0JBQWdCO0FBRWhCLFVBQUksS0FBSyxPQUFPLEtBQUssSUFBSSxjQUFjLE1BQU07QUFDM0MsY0FBTSxNQUFNLE9BQU8sUUFBUSxFQUFFLE9BQU8sTUFBTSxLQUFLLGdCQUFnQixDQUFDO0FBQ2hFLHdCQUFnQixjQUFjLElBQUksR0FBRztNQUN2QztBQUVBLFdBQUssWUFBWTtJQUNuQjtBQUlBLFFBQUksS0FBSyxpQkFBaUIsUUFBUSxRQUFRLFNBQVMsYUFBYSxPQUFPLEdBQUc7QUFDeEUsY0FBUTtRQUNOO01BQ0Y7QUFDQSxXQUFLLGVBQWU7SUFDdEI7QUFHQSxVQUFNLGtCQUFrQixPQUFPO0FBTS9CLFFBQUksU0FBZSxpQkFBVSxFQUFFLElBQUksS0FBSztBQUN0QyxVQUFJLEtBQUssZ0JBQWdCLFNBQVMsS0FBSyxhQUFtQix5QkFBa0IsS0FBSyxvQkFBb0IsT0FBTztBQUNwRyxRQUFBLG9CQUFhLEVBQUUsT0FBTyxDQUFHO01BQ2pDO0lBQ0Y7QUFHQSxRQUFJLEtBQUssY0FBYyxlQUFlO0FBQ3BDLFdBQUssWUFBWTtJQUNuQjtFQUNGO0VBRU8sZ0JBQXNCO0FBQzNCLGVBQVcsT0FBTyxLQUFLLHFCQUFxQixDQUFDO0FBQzdDLGlCQUFhLE9BQU8sS0FBSyx1QkFBdUIsQ0FBQztBQUNqRCxpQkFBYSxPQUFPLEtBQUssdUJBQXVCLENBQUM7QUFDakQsbUJBQWUsT0FBTyxLQUFLLHlCQUF5QixDQUFDO0FBQ3JELGdCQUFZLE9BQU8sS0FBSyxzQkFBc0IsQ0FBQztBQUMvQyxXQUFPLE9BQU8sS0FBSyxpQkFBaUIsQ0FBQztBQUNyQyxrQkFBYyxPQUFPLEtBQUssd0JBQXdCLENBQUM7RUFDckQ7RUFFTyxZQUFZLFNBQWtDO0FBR25ELFVBQU0saUJBQWlCLEtBQUs7QUFFNUIsUUFBSSxLQUFLLGNBQWMsTUFBTTtBQUMzQixXQUFLLGFBQW1CO0FBRXhCLFVBQUksS0FBSyxhQUFhLEtBQUssVUFBVSxjQUFjLE1BQU07QUFDdkQsY0FBTSxNQUFNLGFBQWEsUUFBUSxFQUFFLE9BQU8sTUFBTSxLQUFLLGdCQUFnQixDQUFDO0FBQ3RFLGFBQUssYUFBYSxJQUFJLFVBQVUsY0FBYztNQUNoRDtBQUVBLFVBQUksS0FBSyxXQUFXO0FBRWxCLGFBQUssYUFBYyxLQUFLLFdBQWtELE9BQU87TUFDbkY7SUFDRjtBQUdBLFVBQU0sWUFBWSxPQUFPO0FBR3pCLFNBQUssYUFBYTtFQUNwQjtFQUVPLGNBQWMsU0FBd0M7QUFHM0QsUUFBSSxtQkFBOEQ7QUFFbEUsUUFBSSxLQUFLLGdCQUFnQixNQUFNO0FBQzdCLHlCQUFtQixZQUFZLElBQUksb0JBQW9CO0FBRXZELFVBQUksS0FBSyxlQUFlLEtBQUssWUFBWSxjQUFjLE1BQU07QUFDM0QsY0FBTSxNQUFNLGVBQWUsUUFBUSxFQUFFLE9BQU8sTUFBTSxLQUFLLGdCQUFnQixDQUFDO0FBQ3hFLDJCQUFtQixpQkFBaUIsSUFBSSxHQUFHO01BQzdDO0FBRUEsV0FBSyxlQUFlO0lBQ3RCO0FBR0EsVUFBTSxNQUFNLE1BQU0sY0FBYyxPQUFPO0FBR3ZDLFFBQUksS0FBSyxpQkFBaUIsa0JBQWtCO0FBQzFDLFdBQUssZUFBZTtJQUN0QjtBQUVBLFdBQU87RUFDVDtFQUVPLFlBQ0wsU0FDQSxZQUNvQztBQUVwQyxRQUFJLEtBQUssYUFBYSxLQUFLLHFCQUFxQiw4QkFBOEIsTUFBTTtBQUNsRixtQkFBbUI7UUFDWCxXQUFJLHVCQUF1QixXQUFXLElBQUksSUFBSSxxQkFBcUIsR0FBRywyQkFBMkI7UUFDdkcsV0FBVztNQUNiO0lBQ0Y7QUFHQSxXQUFPLE1BQU0sWUFBWSxTQUFTLFVBQVU7RUFDOUM7RUFFTyxjQUFjLFNBQWdFO0FBblV2RixRQUFBLElBQUE7QUFzVUksVUFBTSxtQkFBbUIsS0FBSztBQUU5QixRQUFJLEtBQUssYUFBYSxLQUFLLHFCQUFxQiw4QkFBOEIsTUFBTTtBQUNsRixPQUFBLEtBQUEsS0FBSyxpQkFBTCxPQUFBLEtBQUEsS0FBSyxlQUF1QjtBQUU1QixZQUFNQyxlQUFvQixtQkFBWSxVQUFVO0FBRWhELFVBQUksUUFBNEM7QUFFaEQsVUFBSSxLQUFLLCtCQUErQixLQUFLLDRCQUE0QixjQUFjLE1BQU07QUFDM0YsY0FBTSxNQUFNLCtCQUErQixRQUFRLEVBQUUsT0FBTyxNQUFNLEtBQUssZ0JBQWdCLENBQUM7QUFDeEYsZ0JBQVEsTUFBTSxJQUFJLEdBQUc7TUFDdkI7QUFFQSxZQUFNLG9CQUEwQixjQUFhLHlCQUFrQixJQUFJQSxZQUFXLENBQUM7QUFDL0UsWUFBTSxnQkFBZ0IsTUFBTSxJQUFJLGlCQUFpQixFQUFFLElBQUlBLFlBQVc7QUFFbEUsVUFBSSxLQUFLLHFCQUFxQiw4QkFBOEIsa0JBQWtCO0FBRTVFLGFBQUssZUFBZ0IsS0FBSyxhQUFvRCxJQUFJLGFBQWE7TUFDakcsV0FBVyxLQUFLLHFCQUFxQiw4QkFBOEIsbUJBQW1CO0FBQ3BGLGNBQU0sWUFBa0IsOEJBQXVCLFFBQVEsQ0FBQyxFQUFFLFFBQVEsQ0FBQztBQUduRSxhQUFLLGVBQWdCLEtBQUssYUFBb0Q7VUFDNUUsY0FBYyxJQUFJLFNBQVMsRUFBRSxJQUFVLG9CQUFhLEVBQUUsT0FBTyxDQUFDO1FBQ2hFO01BQ0Y7QUFFQSxPQUFBLEtBQUEsS0FBSyxpQkFBTCxPQUFBLEtBQUEsS0FBSyxlQUF1QjtJQUM5QjtBQUdBLFVBQU0sTUFBTSxNQUFNLGNBQWMsT0FBTztBQUl2QyxRQUFJLEVBQUUsSUFBSSxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUM7QUFHekIsU0FBSyxlQUFlO0FBRXBCLFdBQU87RUFDVDtFQUVPLEtBQUssUUFBaUM7QUFuWC9DLFFBQUEsSUFBQSxJQUFBLElBQUEsSUFBQSxJQUFBLElBQUEsSUFBQSxJQUFBLElBQUEsSUFBQSxJQUFBLElBQUEsSUFBQSxJQUFBLElBQUEsSUFBQSxJQUFBLElBQUE7QUFvWEksU0FBSyxNQUFNLEtBQUssT0FBTyxLQUFLO0FBQzVCLFNBQUssT0FBTSxLQUFBLE9BQU8sUUFBUCxPQUFBLEtBQWM7QUFDekIsU0FBSyxTQUFTLEtBQUssT0FBTyxRQUFRO0FBQ2xDLFNBQUssb0JBQW9CLE9BQU87QUFDaEMsU0FBSyxlQUFjLEtBQUEsT0FBTyxnQkFBUCxPQUFBLEtBQXNCO0FBQ3pDLFNBQUssYUFBWSxLQUFBLE9BQU8sY0FBUCxPQUFBLEtBQW9CO0FBQ3JDLFNBQUssWUFBWSxLQUFLLE9BQU8sV0FBVztBQUV4QyxTQUFLLGlCQUFpQixLQUFLLE9BQU8sZ0JBQWdCO0FBQ2xELFNBQUssd0JBQXVCLEtBQUEsT0FBTyx5QkFBUCxPQUFBLEtBQStCO0FBQzNELFNBQUsscUJBQXFCLE9BQU87QUFDakMsU0FBSyx1QkFBc0IsS0FBQSxPQUFPLHdCQUFQLE9BQUEsS0FBOEI7QUFDekQsU0FBSywyQkFBMkIsT0FBTztBQUN2QyxTQUFLLHFCQUFxQixPQUFPO0FBQ2pDLFNBQUssdUJBQXVCLE9BQU87QUFDbkMsU0FBSyxzQkFBcUIsS0FBQSxPQUFPLHVCQUFQLE9BQUEsS0FBNkI7QUFDdkQsU0FBSyxhQUFhLEtBQUssT0FBTyxZQUFZO0FBQzFDLFNBQUssaUJBQWdCLEtBQUEsT0FBTyxrQkFBUCxPQUFBLEtBQXdCO0FBQzdDLFNBQUsseUJBQXlCLEtBQUssT0FBTyx3QkFBd0I7QUFDbEUsU0FBSywwQkFBMEIsT0FBTztBQUN0QyxTQUFLLGtDQUFrQyxPQUFPO0FBQzlDLFNBQUssbUJBQW1CLE9BQU87QUFDL0IsU0FBSywrQkFBOEIsS0FBQSxPQUFPLGdDQUFQLE9BQUEsS0FBc0M7QUFDekUsU0FBSyxxQkFBcUIsT0FBTztBQUNqQyxTQUFLLG1CQUFtQixLQUFLLE9BQU8sa0JBQWtCO0FBQ3RELFNBQUssMkJBQTJCLE9BQU87QUFDdkMsU0FBSyxnQ0FBZ0MsT0FBTztBQUM1QyxTQUFLLGdDQUFnQyxPQUFPO0FBQzVDLFNBQUssaUNBQWlDLE9BQU87QUFDN0MsU0FBSywwQkFBeUIsS0FBQSxPQUFPLDJCQUFQLE9BQUEsS0FBaUM7QUFFL0QsU0FBSyxrQkFBaUIsS0FBQSxPQUFPLG1CQUFQLE9BQUEsS0FBeUI7QUFDL0MsU0FBSyxvQkFBbUIsS0FBQSxPQUFPLHFCQUFQLE9BQUEsS0FBMkI7QUFDbkQsU0FBSyxvQkFBbUIsS0FBQSxPQUFPLHFCQUFQLE9BQUEsS0FBMkI7QUFDbkQsU0FBSyxzQkFBcUIsS0FBQSxPQUFPLHVCQUFQLE9BQUEsS0FBNkI7QUFDdkQsU0FBSyxtQkFBa0IsS0FBQSxPQUFPLG9CQUFQLE9BQUEsS0FBMEI7QUFDakQsU0FBSyxjQUFhLEtBQUEsT0FBTyxlQUFQLE9BQUEsS0FBcUI7QUFDdkMsU0FBSywwQkFBeUIsS0FBQSxPQUFPLDJCQUFQLE9BQUEsS0FBaUM7QUFDL0QsU0FBSyx5QkFBd0IsS0FBQSxPQUFPLDBCQUFQLE9BQUEsS0FBZ0M7QUFDN0QsU0FBSyxpQ0FBZ0MsS0FBQSxPQUFPLGtDQUFQLE9BQUEsS0FBd0M7QUFFN0UsU0FBSyxhQUFZLEtBQUEsT0FBTyxjQUFQLE9BQUEsS0FBb0I7QUFFckMsV0FBTyxNQUFNLEtBQUssTUFBTTtFQUMxQjtFQUVPLE9BQU8sT0FBcUI7QUFDakMsU0FBSyw0QkFBNEIsUUFBUSxLQUFLO0FBQzlDLFNBQUssNEJBQTRCLFFBQVEsS0FBSztBQUM5QyxTQUFLLDRCQUE0QixRQUFRLEtBQUs7RUFDaEQ7RUFFUSx1QkFBd0M7QUFDOUMsUUFBSSxLQUFLLGtCQUFrQixNQUFNO0FBQy9CLGFBQWEsWUFBSyxLQUFLLGNBQWM7SUFDdkM7QUFFQSxRQUFJLGlCQUFxRDtBQUV6RCxRQUFJLEtBQUssd0JBQXdCLEtBQUsscUJBQXFCLGNBQWMsTUFBTTtBQUM3RSxZQUFNLE1BQU0sd0JBQXdCLFFBQVEsRUFBRSxPQUFPLE1BQU0sS0FBSyxnQkFBZ0IsQ0FBQztBQUNqRix1QkFBaUIsZUFBZSxJQUFJLEdBQUc7SUFDekM7QUFFQSxXQUFPO0VBQ1Q7RUFFUSx5QkFBcUM7QUFDM0MsUUFBSSxLQUFLLG9CQUFvQixNQUFNO0FBQ2pDLGFBQWEsYUFBTSxLQUFLLGdCQUFnQjtJQUMxQztBQUVBLFFBQUksbUJBQXVEO0FBRTNELFFBQUksS0FBSyx1QkFBdUIsS0FBSyxvQkFBb0IsY0FBYyxNQUFNO0FBQzNFLFlBQU0sTUFBTSx3QkFBd0IsUUFBUSxFQUFFLE9BQU8sTUFBTSxLQUFLLGdCQUFnQixDQUFDO0FBQ2pGLHlCQUFtQixpQkFBaUIsSUFBSSxJQUFJLElBQUksNEJBQTRCLENBQUM7SUFDL0U7QUFFQSxXQUFPO0VBQ1Q7RUFFUSx5QkFBcUM7QUFDM0MsUUFBSSxLQUFLLG9CQUFvQixNQUFNO0FBQ2pDLGFBQWEsYUFBTSxLQUFLLGdCQUFnQjtJQUMxQztBQUVBLFdBQU87RUFDVDtFQUVRLDJCQUF1QztBQUM3QyxRQUFJLEtBQUssc0JBQXNCLE1BQU07QUFDbkMsYUFBYSxhQUFNLEtBQUssa0JBQWtCO0lBQzVDO0FBRUEsV0FBTztFQUNUO0VBRVEsd0JBQXlDO0FBQy9DLFFBQUksS0FBSyxtQkFBbUIsTUFBTTtBQUNoQyxhQUFhLFlBQUssS0FBSyxlQUFlO0lBQ3hDO0FBRUEsUUFBSSxLQUFLLHNCQUFzQixLQUFLLG1CQUFtQixjQUFjLE1BQU07QUFDekUsWUFBTSxNQUFNLHNCQUFzQixRQUFRLEVBQUUsT0FBTyxNQUFNLEtBQUssZ0JBQWdCLENBQUM7QUFDL0UsYUFBTztJQUNUO0FBRUEsV0FBYSxZQUFLLENBQUc7RUFDdkI7RUFFUSxtQkFBb0M7QUFDMUMsUUFBSSxLQUFLLGNBQWMsTUFBTTtBQUMzQixhQUFhLFlBQUssS0FBSyxVQUFVO0lBQ25DO0FBRUEsUUFBSSxLQUFLLGlCQUFpQixLQUFLLGNBQWMsY0FBYyxNQUFNO0FBQy9ELFlBQU0sTUFBTSxpQkFBaUIsUUFBUSxFQUFFLE9BQU8sTUFBWSxnQkFBUyxJQUFJLEdBQUssRUFBSSxFQUFFLElBQUksR0FBSyxDQUFHLEVBQUUsQ0FBQztBQUNqRyxhQUFPLElBQUksSUFBSSxlQUFlO0lBQ2hDO0FBRUEsV0FBYSxZQUFLLENBQUc7RUFDdkI7RUFFUSwwQkFBMkM7QUFDakQsVUFBTSxxQkFDSixLQUFLLDBCQUEwQixPQUFhLFlBQUssS0FBSyxzQkFBc0IsSUFBSTtBQUVsRixVQUFNLG9CQUNKLEtBQUsseUJBQXlCLE9BQWEsYUFBTSxLQUFLLHFCQUFxQixJQUFJO0FBRWpGLFVBQU0sNEJBQ0osS0FBSyxpQ0FBaUMsT0FDNUIsYUFBTSxLQUFLLDZCQUE2QixJQUM5QztBQUVOLFdBQU8sbUJBQW1CO01BQ3hCO01BQ0E7TUFDQTtJQUNGLENBQUM7RUFDSDtBQUNGOyIsCiAgIm5hbWVzIjogWyJUSFJFRSIsICJ1diIsICJkaWZmdXNlQ29sb3IiLCAibm9ybWFsTG9jYWwiXQp9Cg==
