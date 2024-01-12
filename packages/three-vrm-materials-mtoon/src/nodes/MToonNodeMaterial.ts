import * as THREE from 'three';
import * as Nodes from 'three/examples/jsm/nodes/Nodes.js';

import { MToonLightingModel } from './MToonLightingModel';
import {
  parametricRimColor,
  parametricRimFresnelPower,
  parametricRimLift,
  rimLightingMix,
  matcap,
  shadeColor,
  shadingShift,
  shadingToony,
  rimMultiply,
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
// import phongLightingModel from 'three/addons/nodes/functions/PhongLightingModel.js';
// import { float } from '../shadernode/ShaderNode.js';

export class MToonNodeMaterial extends Nodes.NodeMaterial {
  public emissiveNode: Nodes.ShaderNodeObject<Nodes.Node> | null;

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

  public shadeColorNode: Nodes.Swizzable | null;
  public shadingShiftNode: Nodes.Node | null;
  public shadingToonyNode: Nodes.Node | null;
  public rimLightingMixNode: Nodes.Node | null;
  public rimMultiplyNode: Nodes.Node | null;
  public matcapNode: Nodes.Node | null;
  public parametricRimColorNode: Nodes.Swizzable | null;
  public parametricRimLiftNode: Nodes.Node | null;
  public parametricRimFresnelPowerNode: Nodes.Node | null;

  public uvAnimationScrollXOffset: number;
  public uvAnimationScrollYOffset: number;
  public uvAnimationRotationPhase: number;

  public isOutline: boolean;

  private _animatedUVNode: MToonAnimatedUVNode | null;

  public customProgramCacheKey(): string {
    let cacheKey = super.customProgramCacheKey();

    cacheKey += `isOutline:${this.isOutline}`;
    cacheKey += `outlineWidthMode:${this.outlineWidthMode}`;

    return cacheKey;
  }

  public constructor(parameters: MToonNodeMaterialParameters = {}) {
    super();

    if (parameters.transparentWithZWrite) {
      parameters.depthWrite = true;
    }
    delete parameters.transparentWithZWrite;

    this.emissiveNode = null;

    this.lights = true;

    this.color = new THREE.Color(1.0, 1.0, 1.0);
    this.map = null;
    this.emissive = new THREE.Color(0.0, 0.0, 0.0);
    this.emissiveIntensity = 1.0;
    this.emissiveMap = null;
    this.normalMap = null;
    this.normalScale = new THREE.Vector2(1.0, 1.0);
    this.shadeColorFactor = new THREE.Color(0.97, 0.81, 0.86);
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

  public setup(builder: Nodes.NodeBuilder): void {
    this._animatedUVNode = new MToonAnimatedUVNode(
      (this.uvAnimationMaskTexture && this.uvAnimationMaskTexture.isTexture === true) ?? false,
    );

    super.setup(builder);
  }

  public setupDiffuseColor(builder: Nodes.NodeBuilder): void {
    // we must apply uv scroll to the map
    // this.colorNode will be used in super.setupDiffuseColor() so we temporarily replace it
    let tempColorNode: Nodes.ShaderNodeObject<Nodes.Node> | null = null;

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

    // Set alpha to 1 if it is not transparent
    if (this.transparent === false) {
      Nodes.diffuseColor.a.assign(1.0);
    }

    // revert the colorNode
    if (this.colorNode === tempColorNode) {
      this.colorNode = null;
    }
  }

  public setupVariants({ stack }: Nodes.NodeBuilder): void {
    stack.assign(shadeColor, this._setupShadeColorNode());
    stack.assign(shadingShift, this._setupShadingShiftNode());
    stack.assign(shadingToony, this._setupShadingToonyNode());
    stack.assign(rimLightingMix, this._setupRimLightingMixNode());
    stack.assign(rimMultiply, this._setupRimMultiplyNode());
    stack.assign(matcap, this._setupMatcapNode());
    stack.assign(parametricRimColor, this._setupParametricRimColorNode());
    stack.assign(parametricRimLift, this._setupParametricRimLiftNode());
    stack.assign(parametricRimFresnelPower, this._setupParametricRimFresnelPowerNode());
  }

  public setupNormal(builder: Nodes.NodeBuilder): void {
    // we must apply uv scroll to the normalMap
    // this.normalNode will be used in super.setupNormal() so we temporarily replace it
    const tempNormalNode: Nodes.ShaderNodeObject<Nodes.Node> | null = this.normalNode;

    if (this.normalNode == null) {
      this.normalNode = Nodes.materialNormal;

      if (this.normalMap && this.normalMap.isTexture === true) {
        const map = refNormalMap.context({ getUV: () => this._animatedUVNode });
        this.normalNode = map.normalMap(refNormalScale);
      }

      if (this.isOutline) {
        this.normalNode = this.normalNode.negate();
      }
    }

    // the ordinary normal setup
    super.setupNormal(builder);

    // revert the normalNode
    this.normalNode = tempNormalNode;
  }

  public setupLighting(builder: Nodes.NodeBuilder): Nodes.Node {
    // we must apply uv scroll to the emissiveMap
    // this.emissiveNode will be used in super.setupLighting() so we temporarily replace it
    let tempEmissiveNode: Nodes.ShaderNodeObject<Nodes.Node> | null = null;

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
    builder: Nodes.NodeBuilder,
    outputNode: Nodes.ShaderNodeObject<Nodes.Node>,
  ): Nodes.ShaderNodeObject<Nodes.Node> {
    // mix or set outline color
    if (this.isOutline && this.outlineWidthMode !== MToonMaterialOutlineWidthMode.None) {
      outputNode = Nodes.vec4(
        Nodes.mix(refOutlineColorFactor, outputNode.xyz.mul(refOutlineColorFactor), refOutlineLightingMixFactor),
        outputNode.w,
      );
    }

    // the ordinary output setup
    return super.setupOutput(builder, outputNode);
  }

  public setupPosition(builder: Nodes.NodeBuilder): Nodes.ShaderNodeObject<Nodes.Node> {
    // we must apply outline position offset
    // this.positionNode will be used in super.setupPosition() so we temporarily replace it
    const tempPositionNode: Nodes.ShaderNodeObject<Nodes.Node> | null = this.positionNode;

    if (this.isOutline && this.outlineWidthMode !== MToonMaterialOutlineWidthMode.None) {
      this.positionNode ??= Nodes.positionLocal;

      const normalLocal = Nodes.normalLocal.normalize();

      let width: Nodes.ShaderNodeObject<Nodes.Node> = refOutlineWidthFactor;

      if (this.outlineWidthMultiplyTexture && this.outlineWidthMultiplyTexture.isTexture === true) {
        const map = refOutlineWidthMultiplyTexture.context({ getUV: () => this._animatedUVNode });
        width = width.mul(map);
      }

      const worldNormalLength = Nodes.length(Nodes.modelNormalMatrix.mul(normalLocal));
      const outlineOffset = width.mul(worldNormalLength).mul(normalLocal);

      if (this.outlineWidthMode === MToonMaterialOutlineWidthMode.WorldCoordinates) {
        this.positionNode = this.positionNode.add(outlineOffset);
      } else if (this.outlineWidthMode === MToonMaterialOutlineWidthMode.ScreenCoordinates) {
        const clipScale = Nodes.cameraProjectionMatrix.element(1).element(1);

        this.positionNode = this.positionNode.add(outlineOffset.div(clipScale).mul(Nodes.positionView.z.negate()));
      }

      this.positionNode ??= Nodes.positionLocal;
    }

    // the ordinary position setup
    const ret = super.setupPosition(builder);

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

  private _setupShadeColorNode(): Nodes.Swizzable {
    if (this.shadeColorNode != null) {
      return Nodes.vec3(this.shadeColorNode);
    }

    let shadeColorNode: Nodes.ShaderNodeObject<Nodes.Node> = refShadeColorFactor;

    if (this.shadeMultiplyTexture && this.shadeMultiplyTexture.isTexture === true) {
      const map = refShadeMultiplyTexture.context({ getUV: () => this._animatedUVNode });
      shadeColorNode = shadeColorNode.mul(map);
    }

    return shadeColorNode;
  }

  private _setupShadingShiftNode(): Nodes.Node {
    if (this.shadingShiftNode != null) {
      return Nodes.float(this.shadingShiftNode);
    }

    let shadingShiftNode: Nodes.ShaderNodeObject<Nodes.Node> = refShadingShiftFactor;

    if (this.shadingShiftTexture && this.shadingShiftTexture.isTexture === true) {
      const map = refShadeMultiplyTexture.context({ getUV: () => this._animatedUVNode });
      shadingShiftNode = shadingShiftNode.add(map.mul(refShadeMultiplyTextureScale));
    }

    return shadingShiftNode;
  }

  private _setupShadingToonyNode(): Nodes.Node {
    if (this.shadingToonyNode != null) {
      return Nodes.float(this.shadingToonyNode);
    }

    return refShadingToonyFactor;
  }

  private _setupRimLightingMixNode(): Nodes.Node {
    if (this.rimLightingMixNode != null) {
      return Nodes.float(this.rimLightingMixNode);
    }

    return refRimLightingMixFactor;
  }

  private _setupRimMultiplyNode(): Nodes.Swizzable {
    if (this.rimMultiplyNode != null) {
      return Nodes.vec3(this.rimMultiplyNode);
    }

    if (this.rimMultiplyTexture && this.rimMultiplyTexture.isTexture === true) {
      const map = refRimMultiplyTexture.context({ getUV: () => this._animatedUVNode });
      return map;
    }

    return Nodes.vec3(1.0);
  }

  private _setupMatcapNode(): Nodes.Swizzable {
    if (this.matcapNode != null) {
      return Nodes.vec3(this.matcapNode);
    }

    if (this.matcapTexture && this.matcapTexture.isTexture === true) {
      const map = refMatcapTexture.context({ getUV: () => Nodes.matcapUV.mul(1.0, -1.0).add(0.0, 1.0) });
      return map.mul(refMatcapFactor);
    }

    return Nodes.vec3(0.0);
  }

  private _setupParametricRimColorNode(): Nodes.Swizzable {
    if (this.parametricRimColorNode != null) {
      return Nodes.vec3(this.parametricRimColorNode);
    }

    return refParametricRimColorFactor;
  }

  private _setupParametricRimLiftNode(): Nodes.Node {
    if (this.parametricRimLiftNode != null) {
      return Nodes.float(this.parametricRimLiftNode);
    }

    return refParametricRimLiftFactor;
  }

  private _setupParametricRimFresnelPowerNode(): Nodes.Node {
    if (this.parametricRimFresnelPowerNode != null) {
      return Nodes.float(this.parametricRimFresnelPowerNode);
    }

    return refParametricRimFresnelPowerFactor;
  }
}
