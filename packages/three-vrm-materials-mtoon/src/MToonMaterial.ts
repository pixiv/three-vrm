/* tslint:disable:member-ordering */

import * as THREE from 'three';
import { getTexelDecodingFunction } from './utils/getTexelDecodingFunction';
import vertexShader from './shaders/mtoon.vert';
import fragmentShader from './shaders/mtoon.frag';
import { MToonMaterialDebugMode } from './MToonMaterialDebugMode';
import { MToonMaterialOutlineWidthMode } from './MToonMaterialOutlineWidthMode';
import type { MToonMaterialParameters } from './MToonMaterialParameters';

const TAU = 2.0 * Math.PI;

/**
 * MToon is a material specification that has various features.
 * The spec and implementation are originally founded for Unity engine and this is a port of the material.
 *
 * See: https://github.com/Santarh/MToon
 */
export class MToonMaterial extends THREE.ShaderMaterial {
  public color = new THREE.Color(1.0, 1.0, 1.0);
  public map: THREE.Texture | null = null;
  public normalMap: THREE.Texture | null = null;
  public normalMapType = THREE.TangentSpaceNormalMap;
  public normalScale = new THREE.Vector2(1.0, 1.0);
  public emissive = new THREE.Color(0.0, 0.0, 0.0);
  public emissiveMap: THREE.Texture | null = null;
  public shadeColorFactor = new THREE.Color(0.97, 0.81, 0.86);
  public shadeMultiplyTexture: THREE.Texture | null = null;
  public shadingShiftFactor = 0.0;
  public shadingShiftTexture: THREE.Texture | null = null;
  public shadingShiftTextureScale = 1.0;
  public shadingToonyFactor = 0.9;
  public giIntensityFactor = 0.1;
  public matcapTexture: THREE.Texture | null = null;
  public parametricRimColorFactor = new THREE.Color(0.0, 0.0, 0.0);
  public rimMultiplyTexture: THREE.Texture | null = null;
  public rimLightingMixFactor = 0.0;
  public parametricRimFresnelPowerFactor = 1.0;
  public parametricRimLiftFactor = 0.0;
  public outlineWidthFactor = 0.5;
  public outlineWidthMultiplyTexture: THREE.Texture | null = null;
  public outlineColorFactor = new THREE.Color(0.0, 0.0, 0.0);
  public outlineLightingMixFactor = 1.0;
  public uvAnimationMaskTexture: THREE.Texture | null = null;
  public uvAnimationScrollXSpeedFactor = 0.0;
  public uvAnimationScrollYSpeedFactor = 0.0;
  public uvAnimationRotationSpeedFactor = 0.0;

  public shouldApplyUniforms = true; // when this is true, applyUniforms effects

  /**
   * See: {@link MToonMaterialParameters.onLoadMaterial}.
   * It will called also when it's copied.
   */
  public onLoadMaterial?: (material: MToonMaterial) => void;

  private _debugMode: MToonMaterialDebugMode = MToonMaterialDebugMode.None;
  private _outlineWidthMode: MToonMaterialOutlineWidthMode = MToonMaterialOutlineWidthMode.None;

  private _isOutline = false;

  private _uvAnimationScrollXOffset = 0.0;
  private _uvAnimationScrollYOffset = 0.0;
  private _uvAnimationRotationPhase = 0.0;

  /**
   * Readonly boolean that indicates this is a [[MToonMaterial]].
   */
  public get isMToonMaterial(): true {
    return true;
  }

  constructor(parameters: MToonMaterialParameters = {}) {
    super();

    // have onLoadMaterial as a variable before it attempts to import this as a member
    this.onLoadMaterial = parameters.onLoadMaterial;
    delete parameters.onLoadMaterial;

    // override depthWrite with transparentWithZWrite
    if (parameters.transparentWithZWrite) {
      parameters.depthWrite = true;
    }
    delete parameters.transparentWithZWrite;

    // == enabling bunch of stuff ==================================================================
    parameters.fog = true;
    parameters.lights = true;
    parameters.clipping = true;

    parameters.skinning = parameters.skinning || false;
    parameters.morphTargets = parameters.morphTargets || false;
    parameters.morphNormals = parameters.morphNormals || false;

    // == uniforms =================================================================================
    parameters.uniforms = THREE.UniformsUtils.merge([
      THREE.UniformsLib.common, // map
      THREE.UniformsLib.normalmap, // normalMap
      THREE.UniformsLib.emissivemap, // emissiveMap
      THREE.UniformsLib.fog,
      THREE.UniformsLib.lights,
      {
        litFactor: { value: new THREE.Color(1.0, 1.0, 1.0) },
        colorAlpha: { value: 1.0 },
        shadeColorFactor: { value: new THREE.Color(0.97, 0.81, 0.86) },
        shadeMultiplyTexture: { value: null },
        shadingShiftFactor: { value: 0.0 },
        shadingShiftTexture: { value: null },
        shadingShiftTextureScale: { value: null },
        shadingToonyFactor: { value: 0.9 },
        giIntensityFactor: { value: 0.1 },
        matcapTexture: { value: null },
        parametricRimColorFactor: { value: new THREE.Color(0.0, 0.0, 0.0) },
        rimMultiplyTexture: { value: null },
        rimLightingMixFactor: { value: 0.0 },
        parametricRimFresnelPowerFactor: { value: 1.0 },
        parametricRimLiftFactor: { value: 0.0 },
        emissive: { value: new THREE.Color(0.0, 0.0, 0.0) },
        outlineWidthMultiplyTexture: { value: null },
        outlineWidthFactor: { value: 0.5 },
        outlineColorFactor: { value: new THREE.Color(0.0, 0.0, 0.0) },
        outlineLightingMixFactor: { value: 1.0 },
        uvAnimationMaskTexture: { value: null },
        uvAnimationScrollXOffset: { value: 0.0 },
        uvAnimationScrollYOffset: { value: 0.0 },
        uvAnimationRotationPhase: { value: 0.0 },
      },
    ]);

    // == finally compile the shader program =======================================================
    this.setValues(parameters);

    // == update shader stuff ======================================================================
    this._updateShaderCode();
    this._applyUniforms();

    // == call onLoadMaterial ======================================================================
    this.onLoadMaterial?.(this);
  }

  get debugMode(): MToonMaterialDebugMode {
    return this._debugMode;
  }

  set debugMode(m: MToonMaterialDebugMode) {
    this._debugMode = m;

    this._updateShaderCode();
  }

  get outlineWidthMode(): MToonMaterialOutlineWidthMode {
    return this._outlineWidthMode;
  }

  set outlineWidthMode(m: MToonMaterialOutlineWidthMode) {
    this._outlineWidthMode = m;

    this._updateShaderCode();
  }

  get zWrite(): number {
    return this.depthWrite ? 1 : 0;
  }

  set zWrite(i: number) {
    this.depthWrite = 0.5 <= i;
  }

  get isOutline(): boolean {
    return this._isOutline;
  }

  set isOutline(b: boolean) {
    this._isOutline = b;

    this._updateShaderCode();
  }

  /**
   * Update this material.
   *
   * @param delta deltaTime since last update
   */
  public update(delta: number): void {
    this._uvAnimationScrollXOffset = this._uvAnimationScrollXOffset + delta * this.uvAnimationScrollXSpeedFactor;
    this._uvAnimationScrollYOffset = this._uvAnimationScrollYOffset - delta * this.uvAnimationScrollYSpeedFactor; // Negative since t axis of uvs are opposite from Unity's one
    this._uvAnimationRotationPhase = this._uvAnimationRotationPhase + delta * this.uvAnimationRotationSpeedFactor;

    this._applyUniforms();
  }

  public copy(source: this): this {
    super.copy(source);

    // == copy members =============================================================================
    this.color.copy(source.color);
    this.map = source.map;
    this.normalMap = source.normalMap;
    this.normalMapType = source.normalMapType;
    this.normalScale.copy(this.normalScale);
    this.emissive.copy(source.emissive);
    this.emissiveMap = source.emissiveMap;
    this.shadeColorFactor.copy(source.shadeColorFactor);
    this.shadeMultiplyTexture = source.shadeMultiplyTexture;
    this.shadingShiftFactor = source.shadingShiftFactor;
    this.shadingShiftTexture = source.shadingShiftTexture;
    this.shadingShiftTextureScale = source.shadingShiftTextureScale;
    this.shadingToonyFactor = source.shadingToonyFactor;
    this.giIntensityFactor = source.giIntensityFactor;
    this.matcapTexture = source.matcapTexture;
    this.parametricRimColorFactor.copy(source.parametricRimColorFactor);
    this.rimMultiplyTexture = source.rimMultiplyTexture;
    this.rimLightingMixFactor = source.rimLightingMixFactor;
    this.parametricRimFresnelPowerFactor = source.parametricRimFresnelPowerFactor;
    this.parametricRimLiftFactor = source.parametricRimLiftFactor;
    this.outlineWidthMultiplyTexture = source.outlineWidthMultiplyTexture;
    this.outlineWidthFactor = source.outlineWidthFactor;
    this.outlineColorFactor.copy(source.outlineColorFactor);
    this.outlineLightingMixFactor = source.outlineLightingMixFactor;
    this.uvAnimationMaskTexture = source.uvAnimationMaskTexture;
    this.uvAnimationScrollXSpeedFactor = source.uvAnimationScrollXSpeedFactor;
    this.uvAnimationScrollYSpeedFactor = source.uvAnimationScrollYSpeedFactor;
    this.uvAnimationRotationSpeedFactor = source.uvAnimationRotationSpeedFactor;

    this.debugMode = source.debugMode;
    this.outlineWidthMode = source.outlineWidthMode;

    this.isOutline = source.isOutline;

    this.onLoadMaterial = source.onLoadMaterial;
    this.onLoadMaterial?.(this);

    return this;
  }

  /**
   * Apply updated uniform variables.
   */
  private _applyUniforms(): void {
    this.uniforms.uvAnimationScrollXOffset.value = this._uvAnimationScrollXOffset;
    this.uniforms.uvAnimationScrollYOffset.value = this._uvAnimationScrollYOffset;
    this.uniforms.uvAnimationRotationPhase.value = TAU * this._uvAnimationRotationPhase;

    if (!this.shouldApplyUniforms) {
      return;
    }
    this.shouldApplyUniforms = false;

    this.uniforms.litFactor.value.copy(this.color);
    this.uniforms.opacity.value = this.opacity;
    this.uniforms.map.value = this.map;
    this.uniforms.normalMap.value = this.normalMap;
    this.uniforms.normalScale.value.copy(this.normalScale);
    this.uniforms.emissive.value.copy(this.emissive);
    this.uniforms.emissiveMap.value = this.emissiveMap;
    this.uniforms.shadeColorFactor.value.copy(this.shadeColorFactor);
    this.uniforms.shadeMultiplyTexture.value = this.shadeMultiplyTexture;
    this.uniforms.shadingShiftFactor.value = this.shadingShiftFactor;
    this.uniforms.shadingShiftTexture.value = this.shadingShiftTexture;
    this.uniforms.shadingShiftTextureScale.value = this.shadingShiftTextureScale;
    this.uniforms.shadingToonyFactor.value = this.shadingToonyFactor;
    this.uniforms.giIntensityFactor.value = this.giIntensityFactor;
    this.uniforms.matcapTexture.value = this.matcapTexture;
    this.uniforms.parametricRimColorFactor.value.copy(this.parametricRimColorFactor);
    this.uniforms.rimMultiplyTexture.value = this.rimMultiplyTexture;
    this.uniforms.rimLightingMixFactor.value = this.rimLightingMixFactor;
    this.uniforms.parametricRimFresnelPowerFactor.value = this.parametricRimFresnelPowerFactor;
    this.uniforms.parametricRimLiftFactor.value = this.parametricRimLiftFactor;
    this.uniforms.outlineWidthMultiplyTexture.value = this.outlineWidthMultiplyTexture;
    this.uniforms.outlineWidthFactor.value = this.outlineWidthFactor;
    this.uniforms.outlineColorFactor.value.copy(this.outlineColorFactor);
    this.uniforms.outlineLightingMixFactor.value = this.outlineLightingMixFactor;
    this.uniforms.uvAnimationMaskTexture.value = this.uvAnimationMaskTexture;
  }

  private _updateShaderCode(): void {
    this.defines = {
      // Temporary compat against shader change @ Three.js r126
      // See: #21205, #21307, #21299
      THREE_VRM_THREE_REVISION_126: parseInt(THREE.REVISION) >= 126,

      OUTLINE: this._isOutline,
      USE_SHADEMULTIPLYTEXTURE: this.shadeMultiplyTexture !== null,
      USE_SHADINGSHIFTTEXTURE: this.shadingShiftTexture !== null,
      USE_ADDITIVETEXTURE: this.matcapTexture !== null,
      USE_RIMMULTIPLYTEXTURE: this.rimMultiplyTexture !== null,
      USE_OUTLINEWIDTHMULTIPLYTEXTURE: this.outlineWidthMultiplyTexture !== null,
      USE_UVANIMATIONMASKTEXTURE: this.uvAnimationMaskTexture !== null,
      DEBUG_NORMAL: this._debugMode === 'normal',
      DEBUG_LITSHADERATE: this._debugMode === 'litShadeRate',
      DEBUG_UV: this._debugMode === 'uv',
      OUTLINE_WIDTH_WORLD: this._outlineWidthMode === MToonMaterialOutlineWidthMode.WorldCoordinates,
      OUTLINE_WIDTH_SCREEN: this._outlineWidthMode === MToonMaterialOutlineWidthMode.ScreenCoordinates,
    };

    // == texture encodings ========================================================================
    const encodings =
      (this.matcapTexture !== null
        ? getTexelDecodingFunction('matcapTextureTexelToLinear', this.matcapTexture.encoding) + '\n'
        : '') +
      (this.shadeMultiplyTexture !== null
        ? getTexelDecodingFunction('shadeMultiplyTextureTexelToLinear', this.shadeMultiplyTexture.encoding) + '\n'
        : '') +
      (this.rimMultiplyTexture !== null
        ? getTexelDecodingFunction('rimMultiplyTextureTexelToLinear', this.rimMultiplyTexture.encoding) + '\n'
        : '');

    // == generate shader code =====================================================================
    this.vertexShader = vertexShader;
    this.fragmentShader = encodings + fragmentShader;

    // == set needsUpdate flag =====================================================================
    this.needsUpdate = true;
  }
}
