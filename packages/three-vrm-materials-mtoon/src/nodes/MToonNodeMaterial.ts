import * as THREE from 'three/webgpu';

import type { MToonMaterial } from '../MToonMaterial';
import { MToonLightingModel } from './MToonLightingModel';
import {
  rimLightingMix,
  matcap,
  shadeColor,
  shadingShift,
  shadingToony,
  rimMultiply,
  parametricRim,
} from './immutableNodes';
import {
  refColor,
  refEmissive,
  refEmissiveIntensity,
  refEmissiveMap,
  refMap,
  refMatcapFactor,
  refMatcapTexture,
  refNormalMap,
  refNormalScale,
  refOutlineColorFactor,
  refOutlineLightingMixFactor,
  refOutlineWidthFactor,
  refOutlineWidthMultiplyTexture,
  refParametricRimColorFactor,
  refParametricRimFresnelPowerFactor,
  refParametricRimLiftFactor,
  refRimLightingMixFactor,
  refRimMultiplyTexture,
  refShadeColorFactor,
  refShadeMultiplyTexture,
  refShadeMultiplyTextureScale,
  refShadingShiftFactor,
  refShadingToonyFactor,
} from './materialReferences';
import { MToonAnimatedUVNode } from './MToonAnimatedUVNode';
import { MToonMaterialOutlineWidthMode } from '../MToonMaterialOutlineWidthMode';
import { MToonNodeMaterialParameters } from './MToonNodeMaterialParameters';
import { mtoonParametricRim } from './mtoonParametricRim';

/**
 * MToon is a material specification that has various features.
 * The spec and implementation are originally founded for Unity engine and this is a port of the material.
 *
 * This material is a NodeMaterial variant of {@link MToonMaterial}.
 *
 * See: https://github.com/Santarh/MToon
 */
export class MToonNodeMaterial extends THREE.NodeMaterial {
  public emissiveNode: THREE.ShaderNodeObject<THREE.Node> | null;

  public color: THREE.Color;
  public map: THREE.Texture | null;
  public emissive: THREE.Color;
  public emissiveIntensity: number;
  public emissiveMap: THREE.Texture | null;
  public normalMap: THREE.Texture | null;
  public normalScale: THREE.Vector2;

  public shadeColorFactor: THREE.Color;
  public shadeMultiplyTexture: THREE.Texture | null;
  public shadingShiftFactor: number;
  public shadingShiftTexture: THREE.Texture | null;
  public shadingShiftTextureScale: number;
  public shadingToonyFactor: number;
  public rimLightingMixFactor: number;
  public rimMultiplyTexture: THREE.Texture | null;
  public matcapFactor: THREE.Color;
  public matcapTexture: THREE.Texture | null;
  public parametricRimColorFactor: THREE.Color;
  public parametricRimLiftFactor: number;
  public parametricRimFresnelPowerFactor: number;
  public outlineWidthMode: MToonMaterialOutlineWidthMode;
  public outlineWidthMultiplyTexture: THREE.Texture | null;
  public outlineWidthFactor: number;
  public outlineColorFactor: THREE.Color;
  public outlineLightingMixFactor: number;
  public uvAnimationScrollXSpeedFactor: number;
  public uvAnimationScrollYSpeedFactor: number;
  public uvAnimationRotationSpeedFactor: number;
  public uvAnimationMaskTexture: THREE.Texture | null;

  public shadeColorNode: THREE.Swizzable | null;
  public shadingShiftNode: THREE.Node | null;
  public shadingToonyNode: THREE.Node | null;
  public rimLightingMixNode: THREE.Node | null;
  public rimMultiplyNode: THREE.Node | null;
  public matcapNode: THREE.Node | null;
  public parametricRimColorNode: THREE.Swizzable | null;
  public parametricRimLiftNode: THREE.Node | null;
  public parametricRimFresnelPowerNode: THREE.Node | null;

  public uvAnimationScrollXOffset: number;
  public uvAnimationScrollYOffset: number;
  public uvAnimationRotationPhase: number;

  public isOutline: boolean;

  private _animatedUVNode: MToonAnimatedUVNode | null;

  public customProgramCacheKey(): string {
    let cacheKey = super.customProgramCacheKey();

    cacheKey += `isOutline:${this.isOutline},`;

    return cacheKey;
  }

  /**
   * Readonly boolean that indicates this is a {@link MToonNodeMaterial}.
   */
  public get isMToonNodeMaterial(): true {
    return true;
  }

  public constructor(parameters: MToonNodeMaterialParameters = {}) {
    super();

    if (parameters.transparentWithZWrite) {
      parameters.depthWrite = true;
    }
    delete parameters.transparentWithZWrite;

    // `MToonMaterialLoaderPlugin` assigns these parameters to the material
    // However, `MToonNodeMaterial` does not support these parameters
    // so we delete them here to suppress warnings
    delete (parameters as any).giEqualizationFactor;
    delete (parameters as any).v0CompatShade;
    delete (parameters as any).debugMode;

    this.emissiveNode = null;

    this.lights = true;

    this.color = new THREE.Color(1.0, 1.0, 1.0);
    this.map = null;
    this.emissive = new THREE.Color(0.0, 0.0, 0.0);
    this.emissiveIntensity = 1.0;
    this.emissiveMap = null;
    this.normalMap = null;
    this.normalScale = new THREE.Vector2(1.0, 1.0);
    this.shadeColorFactor = new THREE.Color(0.0, 0.0, 0.0);
    this.shadeMultiplyTexture = null;
    this.shadingShiftFactor = 0.0;
    this.shadingShiftTexture = null;
    this.shadingShiftTextureScale = 1.0;
    this.shadingToonyFactor = 0.9;
    this.rimLightingMixFactor = 1.0;
    this.rimMultiplyTexture = null;
    this.matcapFactor = new THREE.Color(1.0, 1.0, 1.0);
    this.matcapTexture = null;
    this.parametricRimColorFactor = new THREE.Color(0.0, 0.0, 0.0);
    this.parametricRimLiftFactor = 0.0;
    this.parametricRimFresnelPowerFactor = 5.0;
    this.outlineWidthMode = MToonMaterialOutlineWidthMode.None;
    this.outlineWidthMultiplyTexture = null;
    this.outlineWidthFactor = 0.0;
    this.outlineColorFactor = new THREE.Color(0.0, 0.0, 0.0);
    this.outlineLightingMixFactor = 1.0;
    this.uvAnimationScrollXSpeedFactor = 0.0;
    this.uvAnimationScrollYSpeedFactor = 0.0;
    this.uvAnimationRotationSpeedFactor = 0.0;
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

    this.uvAnimationScrollXOffset = 0.0;
    this.uvAnimationScrollYOffset = 0.0;
    this.uvAnimationRotationPhase = 0.0;

    this.isOutline = false;

    this._animatedUVNode = null;

    this.setValues(parameters);
  }

  public setupLightingModel(/*builder*/): MToonLightingModel {
    return new MToonLightingModel();
  }

  public setup(builder: THREE.NodeBuilder): void {
    this._animatedUVNode = new MToonAnimatedUVNode(
      (this.uvAnimationMaskTexture && this.uvAnimationMaskTexture.isTexture === true) ?? false,
    );

    super.setup(builder);
  }

  public setupDiffuseColor(builder: THREE.NodeBuilder): void {
    // we must apply uv scroll to the map
    // this.colorNode will be used in super.setupDiffuseColor() so we temporarily replace it
    let tempColorNode: THREE.ShaderNodeObject<THREE.Node> | null = null;

    if (this.colorNode == null) {
      tempColorNode = refColor;

      if (this.map && this.map.isTexture === true) {
        const map = refMap.context({ getUV: () => this._animatedUVNode });
        tempColorNode = tempColorNode.mul(map);
      }

      this.colorNode = tempColorNode;
    }

    // MToon must ignore vertex color by spec
    // See: https://github.com/vrm-c/vrm-specification/blob/42c0a90e6b4b710352569978f14980e9fc94b25d/specification/VRMC_materials_mtoon-1.0/README.md#vertex-colors
    if (this.vertexColors === true && builder.geometry.hasAttribute('color')) {
      console.warn(
        'MToonNodeMaterial: MToon ignores vertex colors. Consider using a model without vertex colors instead.',
      );
      this.vertexColors = false;
    }

    // the ordinary diffuseColor setup
    super.setupDiffuseColor(builder);

    // COMPAT: pre-r166
    // Set alpha to 1 if it is opaque
    // Addressed in Three.js r166 but we leave it here for compatibility
    // See: https://github.com/mrdoob/three.js/pull/28646
    if (parseInt(THREE.REVISION, 10) < 166) {
      if (this.transparent === false && this.blending === THREE.NormalBlending && this.alphaToCoverage === false) {
        THREE.diffuseColor.a.assign(1.0);
      }
    }

    // revert the colorNode
    if (this.colorNode === tempColorNode) {
      this.colorNode = null;
    }
  }

  public setupVariants(): void {
    shadeColor.assign(this._setupShadeColorNode());
    shadingShift.assign(this._setupShadingShiftNode());
    shadingToony.assign(this._setupShadingToonyNode());
    rimLightingMix.assign(this._setupRimLightingMixNode());
    rimMultiply.assign(this._setupRimMultiplyNode());
    matcap.assign(this._setupMatcapNode());
    parametricRim.assign(this._setupParametricRimNode());
  }

  public setupNormal(builder: THREE.NodeBuilder): THREE.ShaderNodeObject<THREE.Node> | null | undefined {
    // we must apply uv scroll to the normalMap
    // this.normalNode will be used in super.setupNormal() so we temporarily replace it
    const tempNormalNode = this.normalNode;

    if (this.normalNode == null) {
      this.normalNode = THREE.materialNormal;

      if (this.normalMap && this.normalMap.isTexture === true) {
        const map = refNormalMap.context({ getUV: () => this._animatedUVNode });
        this.normalNode = map.normalMap(refNormalScale);
      }

      if (this.isOutline) {
        // See about the type assertion: https://github.com/three-types/three-ts-types/pull/1123
        this.normalNode = (this.normalNode as THREE.ShaderNodeObject<THREE.Node>).negate();
      }
    }

    // COMPAT r168: `setupNormal` now returns the normal node
    // instead of assigning inside the `super.setupNormal`
    // See: https://github.com/mrdoob/three.js/pull/29137
    const threeRevision = parseInt(THREE.REVISION, 10);
    if (threeRevision >= 168) {
      const ret = this.normalNode as THREE.ShaderNodeObject<THREE.Node> | null;

      // revert the normalNode
      this.normalNode = tempNormalNode;

      return ret;
    } else {
      // pre-r168
      // the ordinary normal setup
      super.setupNormal(builder);

      // revert the normalNode
      this.normalNode = tempNormalNode;
    }
  }

  public setupLighting(builder: THREE.NodeBuilder): THREE.Node {
    // we must apply uv scroll to the emissiveMap
    // this.emissiveNode will be used in super.setupLighting() so we temporarily replace it
    let tempEmissiveNode: THREE.ShaderNodeObject<THREE.Node> | null = null;

    if (this.emissiveNode == null) {
      tempEmissiveNode = refEmissive.mul(refEmissiveIntensity);

      if (this.emissiveMap && this.emissiveMap.isTexture === true) {
        const map = refEmissiveMap.context({ getUV: () => this._animatedUVNode });
        tempEmissiveNode = tempEmissiveNode.mul(map);
      }

      this.emissiveNode = tempEmissiveNode;
    }

    // the ordinary lighting setup
    const ret = super.setupLighting(builder);

    // revert the emissiveNode
    if (this.emissiveNode === tempEmissiveNode) {
      this.emissiveNode = null;
    }

    return ret;
  }

  public setupOutput(
    builder: THREE.NodeBuilder,
    outputNode: THREE.ShaderNodeObject<THREE.Node>,
  ): THREE.ShaderNodeObject<THREE.Node> {
    // mix or set outline color
    if (this.isOutline && this.outlineWidthMode !== MToonMaterialOutlineWidthMode.None) {
      outputNode = THREE.vec4(
        THREE.mix(refOutlineColorFactor, outputNode.xyz.mul(refOutlineColorFactor), refOutlineLightingMixFactor),
        outputNode.w,
      );
    }

    // the ordinary output setup
    return super.setupOutput(builder, outputNode) as THREE.ShaderNodeObject<THREE.Node>;
  }

  public setupPosition(builder: THREE.NodeBuilder): THREE.ShaderNodeObject<THREE.Node> {
    // we must apply outline position offset
    // this.positionNode will be used in super.setupPosition() so we temporarily replace it
    const tempPositionNode = this.positionNode;

    if (this.isOutline && this.outlineWidthMode !== MToonMaterialOutlineWidthMode.None) {
      this.positionNode ??= THREE.positionLocal;

      const normalLocal = THREE.normalLocal.normalize();

      let width: THREE.ShaderNodeObject<THREE.Node> = refOutlineWidthFactor;

      if (this.outlineWidthMultiplyTexture && this.outlineWidthMultiplyTexture.isTexture === true) {
        const map = refOutlineWidthMultiplyTexture.context({ getUV: () => this._animatedUVNode });
        width = width.mul(map);
      }

      const worldNormalLength = THREE.length(THREE.modelNormalMatrix.mul(normalLocal));
      const outlineOffset = width.mul(worldNormalLength).mul(normalLocal);

      if (this.outlineWidthMode === MToonMaterialOutlineWidthMode.WorldCoordinates) {
        // See about the type assertion: https://github.com/three-types/three-ts-types/pull/1123
        this.positionNode = (this.positionNode as THREE.ShaderNodeObject<THREE.Node>).add(outlineOffset);
      } else if (this.outlineWidthMode === MToonMaterialOutlineWidthMode.ScreenCoordinates) {
        const clipScale = THREE.cameraProjectionMatrix.element(1).element(1);

        // See about the type assertion: https://github.com/three-types/three-ts-types/pull/1123
        this.positionNode = (this.positionNode as THREE.ShaderNodeObject<THREE.Node>).add(
          outlineOffset.div(clipScale).mul(THREE.positionView.z.negate()),
        );
      }

      this.positionNode ??= THREE.positionLocal;
    }

    // the ordinary position setup
    const ret = super.setupPosition(builder) as THREE.ShaderNodeObject<THREE.Node>;

    // anti z-fighting
    // TODO: We might want to address this via glPolygonOffset instead?
    ret.z.add(ret.w.mul(1e-6));

    // revert the positionNode
    this.positionNode = tempPositionNode;

    return ret;
  }

  public copy(source: MToonNodeMaterial): this {
    this.color.copy(source.color);
    this.map = source.map ?? null;
    this.emissive.copy(source.emissive);
    this.emissiveIntensity = source.emissiveIntensity;
    this.emissiveMap = source.emissiveMap ?? null;
    this.normalMap = source.normalMap ?? null;
    this.normalScale.copy(source.normalScale);

    this.shadeColorFactor.copy(source.shadeColorFactor);
    this.shadeMultiplyTexture = source.shadeMultiplyTexture ?? null;
    this.shadingShiftFactor = source.shadingShiftFactor;
    this.shadingShiftTexture = source.shadingShiftTexture ?? null;
    this.shadingShiftTextureScale = source.shadingShiftTextureScale;
    this.shadingToonyFactor = source.shadingToonyFactor;
    this.rimLightingMixFactor = source.rimLightingMixFactor;
    this.rimMultiplyTexture = source.rimMultiplyTexture ?? null;
    this.matcapFactor.copy(source.matcapFactor);
    this.matcapTexture = source.matcapTexture ?? null;
    this.parametricRimColorFactor.copy(source.parametricRimColorFactor);
    this.parametricRimLiftFactor = source.parametricRimLiftFactor;
    this.parametricRimFresnelPowerFactor = source.parametricRimFresnelPowerFactor;
    this.outlineWidthMode = source.outlineWidthMode;
    this.outlineWidthMultiplyTexture = source.outlineWidthMultiplyTexture ?? null;
    this.outlineWidthFactor = source.outlineWidthFactor;
    this.outlineColorFactor.copy(source.outlineColorFactor);
    this.outlineLightingMixFactor = source.outlineLightingMixFactor;
    this.uvAnimationScrollXSpeedFactor = source.uvAnimationScrollXSpeedFactor;
    this.uvAnimationScrollYSpeedFactor = source.uvAnimationScrollYSpeedFactor;
    this.uvAnimationRotationSpeedFactor = source.uvAnimationRotationSpeedFactor;
    this.uvAnimationMaskTexture = source.uvAnimationMaskTexture ?? null;

    this.shadeColorNode = source.shadeColorNode ?? null;
    this.shadingShiftNode = source.shadingShiftNode ?? null;
    this.shadingToonyNode = source.shadingToonyNode ?? null;
    this.rimLightingMixNode = source.rimLightingMixNode ?? null;
    this.rimMultiplyNode = source.rimMultiplyNode ?? null;
    this.matcapNode = source.matcapNode ?? null;
    this.parametricRimColorNode = source.parametricRimColorNode ?? null;
    this.parametricRimLiftNode = source.parametricRimLiftNode ?? null;
    this.parametricRimFresnelPowerNode = source.parametricRimFresnelPowerNode ?? null;

    this.isOutline = source.isOutline ?? null;

    return super.copy(source);
  }

  public update(delta: number): void {
    this.uvAnimationScrollXOffset += delta * this.uvAnimationScrollXSpeedFactor;
    this.uvAnimationScrollYOffset += delta * this.uvAnimationScrollYSpeedFactor;
    this.uvAnimationRotationPhase += delta * this.uvAnimationRotationSpeedFactor;
  }

  private _setupShadeColorNode(): THREE.Swizzable {
    if (this.shadeColorNode != null) {
      return THREE.vec3(this.shadeColorNode);
    }

    let shadeColorNode: THREE.ShaderNodeObject<THREE.Node> = refShadeColorFactor;

    if (this.shadeMultiplyTexture && this.shadeMultiplyTexture.isTexture === true) {
      const map = refShadeMultiplyTexture.context({ getUV: () => this._animatedUVNode });
      shadeColorNode = shadeColorNode.mul(map);
    }

    return shadeColorNode;
  }

  private _setupShadingShiftNode(): THREE.Node {
    if (this.shadingShiftNode != null) {
      return THREE.float(this.shadingShiftNode);
    }

    let shadingShiftNode: THREE.ShaderNodeObject<THREE.Node> = refShadingShiftFactor;

    if (this.shadingShiftTexture && this.shadingShiftTexture.isTexture === true) {
      const map = refShadeMultiplyTexture.context({ getUV: () => this._animatedUVNode });
      shadingShiftNode = shadingShiftNode.add(map.mul(refShadeMultiplyTextureScale));
    }

    return shadingShiftNode;
  }

  private _setupShadingToonyNode(): THREE.Node {
    if (this.shadingToonyNode != null) {
      return THREE.float(this.shadingToonyNode);
    }

    return refShadingToonyFactor;
  }

  private _setupRimLightingMixNode(): THREE.Node {
    if (this.rimLightingMixNode != null) {
      return THREE.float(this.rimLightingMixNode);
    }

    return refRimLightingMixFactor;
  }

  private _setupRimMultiplyNode(): THREE.Swizzable {
    if (this.rimMultiplyNode != null) {
      return THREE.vec3(this.rimMultiplyNode);
    }

    if (this.rimMultiplyTexture && this.rimMultiplyTexture.isTexture === true) {
      const map = refRimMultiplyTexture.context({ getUV: () => this._animatedUVNode });
      return map;
    }

    return THREE.vec3(1.0);
  }

  private _setupMatcapNode(): THREE.Swizzable {
    if (this.matcapNode != null) {
      return THREE.vec3(this.matcapNode);
    }

    if (this.matcapTexture && this.matcapTexture.isTexture === true) {
      const map = refMatcapTexture.context({ getUV: () => THREE.matcapUV.mul(1.0, -1.0).add(0.0, 1.0) });
      return map.mul(refMatcapFactor);
    }

    return THREE.vec3(0.0);
  }

  private _setupParametricRimNode(): THREE.Swizzable {
    const parametricRimColor =
      this.parametricRimColorNode != null ? THREE.vec3(this.parametricRimColorNode) : refParametricRimColorFactor;

    const parametricRimLift =
      this.parametricRimLiftNode != null ? THREE.float(this.parametricRimLiftNode) : refParametricRimLiftFactor;

    const parametricRimFresnelPower =
      this.parametricRimFresnelPowerNode != null
        ? THREE.float(this.parametricRimFresnelPowerNode)
        : refParametricRimFresnelPowerFactor;

    return mtoonParametricRim({
      parametricRimLift,
      parametricRimFresnelPower,
      parametricRimColor,
    });
  }
}

// TODO: Part of stuff that MToonMaterial depends on does not exist in three/webgpu (e.g. UniformsLib)
// THREE.addNodeMaterial('MToonNodeMaterial', MToonNodeMaterial);
