import * as THREE from 'three/webgpu';
import {
  cameraProjectionMatrix,
  diffuseColor,
  float,
  length,
  matcapUV,
  materialNormal,
  mix,
  modelNormalMatrix,
  modelViewMatrix,
  normalLocal,
  normalMap,
  positionLocal,
  vec3,
  vec4,
} from 'three/tsl';

import { MToonLightingModel } from './MToonLightingModel';
import {
  rimLightingMix,
  matcap,
  shadeColor,
  shadingShift,
  shadingToony,
  rimMultiply,
  parametricRim,
} from './propertyNodes';
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
import type { MToonColorNode } from './MToonColorNode';
import type { MToonNodeMaterialParameters } from './MToonNodeMaterialParameters';
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
  public emissiveNode: THREE.Node | null;

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

  public shadeColorNode: MToonColorNode | null;
  public shadingShiftNode: THREE.Node<'float'> | null;
  public shadingToonyNode: THREE.Node<'float'> | null;
  public rimLightingMixNode: THREE.Node<'float'> | null;
  public rimMultiplyNode: MToonColorNode | null;
  public matcapNode: MToonColorNode | null;
  public parametricRimColorNode: MToonColorNode | null;
  public parametricRimLiftNode: THREE.Node<'float'> | null;
  public parametricRimFresnelPowerNode: THREE.Node<'float'> | null;

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
    let tempColorNode: THREE.Node<'vec4'> | null = null;

    if (this.colorNode == null) {
      tempColorNode = vec4(refColor.rgb, 1.0);

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
        diffuseColor.a.assign(1.0);
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

  public setupNormal(): THREE.Node<'vec3'>;
  public setupNormal(builder?: THREE.NodeBuilder): THREE.Node<'vec3'>;
  public setupNormal(builder?: THREE.NodeBuilder): THREE.Node<'vec3'> {
    // we must apply uv scroll to the normalMap
    // this.normalNode will be used in super.setupNormal() so we temporarily replace it
    const tempNormalNode = this.normalNode;

    if (this.normalNode == null) {
      this.normalNode = materialNormal;

      if (this.normalMap && this.normalMap.isTexture === true) {
        const map = refNormalMap.context({ getUV: () => this._animatedUVNode });
        this.normalNode = normalMap(map, refNormalScale);
      }

      if (this.isOutline) {
        // See about the type assertion: https://github.com/three-types/three-ts-types/pull/1123
        this.normalNode = (this.normalNode as THREE.Node<'vec3'>).negate();
      }
    }

    const ret = this.normalNode as THREE.Node<'vec3'>;

    // revert the normalNode
    this.normalNode = tempNormalNode;

    return ret;
  }

  public setupLighting(builder: THREE.NodeBuilder): THREE.Node {
    // we must apply uv scroll to the emissiveMap
    // this.emissiveNode will be used in super.setupLighting() so we temporarily replace it
    let tempEmissiveNode: THREE.Node<'vec3'> | null = null;

    if (this.emissiveNode == null) {
      tempEmissiveNode = refEmissive.rgb.mul(refEmissiveIntensity);

      if (this.emissiveMap && this.emissiveMap.isTexture === true) {
        const map = refEmissiveMap.context({ getUV: () => this._animatedUVNode });
        tempEmissiveNode = tempEmissiveNode.mul(map.rgb);
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

  public setupOutput(builder: THREE.NodeBuilder, outputNode: THREE.Node<'vec4'>): THREE.Node<'vec4'> {
    // mix or set outline color
    if (this.isOutline && this.outlineWidthMode !== MToonMaterialOutlineWidthMode.None) {
      outputNode = vec4(
        mix(refOutlineColorFactor, outputNode.xyz.mul(refOutlineColorFactor), refOutlineLightingMixFactor),
        outputNode.w,
      );
    }

    // the ordinary output setup
    return super.setupOutput(builder, outputNode) as THREE.Node<'vec4'>;
  }

  public setupPosition(builder: THREE.NodeBuilder): THREE.Node<'vec4'> {
    // we must apply outline position offset
    // this.positionNode will be used in super.setupPosition() so we temporarily replace it
    const tempPositionNode = this.positionNode;

    if (this.isOutline && this.outlineWidthMode !== MToonMaterialOutlineWidthMode.None) {
      this.positionNode ??= positionLocal;

      const normalLocalNormalized = normalLocal.normalize();

      let width: THREE.Node<'float'> = refOutlineWidthFactor;

      if (this.outlineWidthMultiplyTexture && this.outlineWidthMultiplyTexture.isTexture === true) {
        const map = refOutlineWidthMultiplyTexture.context({ getUV: () => this._animatedUVNode });
        width = width.mul(map.r);
      }

      const worldNormalLength = length(modelNormalMatrix.mul(normalLocalNormalized));
      const outlineOffset = width.mul(worldNormalLength).mul(normalLocalNormalized);

      if (this.outlineWidthMode === MToonMaterialOutlineWidthMode.WorldCoordinates) {
        // See about the type assertion: https://github.com/three-types/three-ts-types/pull/1123
        this.positionNode = (this.positionNode as THREE.Node<'vec3'>).add(outlineOffset);
      } else if (this.outlineWidthMode === MToonMaterialOutlineWidthMode.ScreenCoordinates) {
        const clipScale = (
          cameraProjectionMatrix as unknown as THREE.Node<'mat4'> & { element(index: number): THREE.Node<'vec4'> }
        ).element(1).y;

        // We can't use `positionView` in `setupPosition`
        // because using `positionView` here will make it calculate the `positionView` earlier
        // and it won't be calculated again after setting the `positionNode`
        const tempPositionView = modelViewMatrix.mul(positionLocal);

        // See about the type assertion: https://github.com/three-types/three-ts-types/pull/1123
        this.positionNode = (this.positionNode as THREE.Node<'vec3'>).add(
          outlineOffset.div(clipScale).mul(tempPositionView.z.negate()),
        );
      }

      this.positionNode ??= positionLocal;
    }

    // the ordinary position setup
    const ret = super.setupPosition(builder) as THREE.Node<'vec4'>;

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

  private _setupShadeColorNode(): THREE.Node<'vec3'> {
    if (this.shadeColorNode != null) {
      return this.shadeColorNode.rgb;
    }

    let shadeColorNode: THREE.Node<'vec3'> = refShadeColorFactor.rgb;

    if (this.shadeMultiplyTexture && this.shadeMultiplyTexture.isTexture === true) {
      const map = refShadeMultiplyTexture.context({ getUV: () => this._animatedUVNode });
      shadeColorNode = shadeColorNode.mul(map.rgb);
    }

    return shadeColorNode;
  }

  private _setupShadingShiftNode(): THREE.Node {
    if (this.shadingShiftNode != null) {
      return float(this.shadingShiftNode);
    }

    let shadingShiftNode: THREE.Node<'float'> = refShadingShiftFactor;

    if (this.shadingShiftTexture && this.shadingShiftTexture.isTexture === true) {
      const map = refShadeMultiplyTexture.context({ getUV: () => this._animatedUVNode });
      shadingShiftNode = shadingShiftNode.add(map.r.mul(refShadeMultiplyTextureScale));
    }

    return shadingShiftNode;
  }

  private _setupShadingToonyNode(): THREE.Node {
    if (this.shadingToonyNode != null) {
      return float(this.shadingToonyNode);
    }

    return refShadingToonyFactor;
  }

  private _setupRimLightingMixNode(): THREE.Node {
    if (this.rimLightingMixNode != null) {
      return float(this.rimLightingMixNode);
    }

    return refRimLightingMixFactor;
  }

  private _setupRimMultiplyNode(): THREE.Node<'vec3'> {
    if (this.rimMultiplyNode != null) {
      return this.rimMultiplyNode.rgb;
    }

    if (this.rimMultiplyTexture && this.rimMultiplyTexture.isTexture === true) {
      const map = refRimMultiplyTexture.context({ getUV: () => this._animatedUVNode });
      return map.rgb;
    }

    return vec3(1.0);
  }

  private _setupMatcapNode(): THREE.Node<'vec3'> {
    if (this.matcapNode != null) {
      return this.matcapNode.rgb;
    }

    if (this.matcapTexture && this.matcapTexture.isTexture === true) {
      const map = refMatcapTexture.context({
        getUV: () => (matcapUV as THREE.Node<'vec2'>).mul(1.0, -1.0).add(0.0, 1.0),
      });
      return map.rgb.mul(refMatcapFactor.rgb);
    }

    return vec3(0.0);
  }

  private _setupParametricRimNode(): THREE.Node<'vec3'> {
    const parametricRimColor =
      this.parametricRimColorNode != null ? this.parametricRimColorNode.rgb : refParametricRimColorFactor.rgb;

    const parametricRimLift =
      this.parametricRimLiftNode != null ? float(this.parametricRimLiftNode) : refParametricRimLiftFactor;

    const parametricRimFresnelPower =
      this.parametricRimFresnelPowerNode != null
        ? float(this.parametricRimFresnelPowerNode)
        : refParametricRimFresnelPowerFactor;

    return mtoonParametricRim({
      parametricRimLift,
      parametricRimFresnelPower,
      parametricRimColor,
    });
  }
}
