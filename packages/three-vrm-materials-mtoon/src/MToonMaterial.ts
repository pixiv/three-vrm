/* tslint:disable:member-ordering */

import * as THREE from 'three';
import { getTexelDecodingFunction } from './utils/getTexelDecodingFunction';
import vertexShader from './shaders/mtoon.vert';
import fragmentShader from './shaders/mtoon.frag';
import { MToonMaterialDebugMode } from './MToonMaterialDebugMode';
import { MToonMaterialOutlineWidthMode } from './MToonMaterialOutlineWidthMode';
import type { MToonMaterialParameters } from './MToonMaterialParameters';

/**
 * MToon is a material specification that has various features.
 * The spec and implementation are originally founded for Unity engine and this is a port of the material.
 *
 * See: https://github.com/Santarh/MToon
 */
export class MToonMaterial extends THREE.ShaderMaterial {
  public uniforms: {
    litFactor: THREE.IUniform<THREE.Color>;
    map: THREE.IUniform<THREE.Texture | null>;
    normalMap: THREE.IUniform<THREE.Texture | null>;
    normalScale: THREE.IUniform<THREE.Vector2>;
    emissive: THREE.IUniform<THREE.Color>;
    emissiveMap: THREE.IUniform<THREE.Texture | null>;
    shadeColorFactor: THREE.IUniform<THREE.Color>;
    shadeMultiplyTexture: THREE.IUniform<THREE.Texture | null>;
    shadingShiftFactor: THREE.IUniform<number>;
    shadingShiftTexture: THREE.IUniform<THREE.Texture | null>;
    shadingShiftTextureScale: THREE.IUniform<number>;
    shadingToonyFactor: THREE.IUniform<number>;
    giIntensityFactor: THREE.IUniform<number>;
    matcapTexture: THREE.IUniform<THREE.Texture | null>;
    parametricRimColorFactor: THREE.IUniform<THREE.Color>;
    rimMultiplyTexture: THREE.IUniform<THREE.Texture | null>;
    rimLightingMixFactor: THREE.IUniform<number>;
    parametricRimFresnelPowerFactor: THREE.IUniform<number>;
    parametricRimLiftFactor: THREE.IUniform<number>;
    outlineWidthMultiplyTexture: THREE.IUniform<THREE.Texture | null>;
    outlineWidthFactor: THREE.IUniform<number>;
    outlineColorFactor: THREE.IUniform<THREE.Color>;
    outlineLightingMixFactor: THREE.IUniform<number>;
    uvAnimationMaskTexture: THREE.IUniform<THREE.Texture | null>;
    uvAnimationScrollXOffset: THREE.IUniform<number>;
    uvAnimationScrollYOffset: THREE.IUniform<number>;
    uvAnimationRotationPhase: THREE.IUniform<number>;
  };

  public get color(): THREE.Color {
    return this.uniforms.litFactor.value;
  }
  public set color(value: THREE.Color) {
    this.uniforms.litFactor.value = value;
  }

  public get map(): THREE.Texture | null {
    return this.uniforms.map.value;
  }
  public set map(value: THREE.Texture | null) {
    this.uniforms.map.value = value;
  }

  public get normalMap(): THREE.Texture | null {
    return this.uniforms.normalMap.value;
  }
  public set normalMap(value: THREE.Texture | null) {
    this.uniforms.normalMap.value = value;
  }

  public get normalScale(): THREE.Vector2 {
    return this.uniforms.normalScale.value;
  }
  public set normalScale(value: THREE.Vector2) {
    this.uniforms.normalScale.value = value;
  }

  public get emissive(): THREE.Color {
    return this.uniforms.emissive.value;
  }
  public set emissive(value: THREE.Color) {
    this.uniforms.emissive.value = value;
  }

  public get emissiveMap(): THREE.Texture | null {
    return this.uniforms.emissiveMap.value;
  }
  public set emissiveMap(value: THREE.Texture | null) {
    this.uniforms.emissiveMap.value = value;
  }

  public get shadeColorFactor(): THREE.Color {
    return this.uniforms.shadeColorFactor.value;
  }
  public set shadeColorFactor(value: THREE.Color) {
    this.uniforms.shadeColorFactor.value = value;
  }

  public get shadeMultiplyTexture(): THREE.Texture | null {
    return this.uniforms.shadeMultiplyTexture.value;
  }
  public set shadeMultiplyTexture(value: THREE.Texture | null) {
    this.uniforms.shadeMultiplyTexture.value = value;
  }

  public get shadingShiftFactor(): number {
    return this.uniforms.shadingShiftFactor.value;
  }
  public set shadingShiftFactor(value: number) {
    this.uniforms.shadingShiftFactor.value = value;
  }

  public get shadingShiftTexture(): THREE.Texture | null {
    return this.uniforms.shadingShiftTexture.value;
  }
  public set shadingShiftTexture(value: THREE.Texture | null) {
    this.uniforms.shadingShiftTexture.value = value;
  }

  public get shadingShiftTextureScale(): number {
    return this.uniforms.shadingShiftTextureScale.value;
  }
  public set shadingShiftTextureScale(value: number) {
    this.uniforms.shadingShiftTextureScale.value = value;
  }

  public get shadingToonyFactor(): number {
    return this.uniforms.shadingToonyFactor.value;
  }
  public set shadingToonyFactor(value: number) {
    this.uniforms.shadingToonyFactor.value = value;
  }

  public get giIntensityFactor(): number {
    return this.uniforms.giIntensityFactor.value;
  }
  public set giIntensityFactor(value: number) {
    this.uniforms.giIntensityFactor.value = value;
  }

  public get matcapTexture(): THREE.Texture | null {
    return this.uniforms.matcapTexture.value;
  }
  public set matcapTexture(value: THREE.Texture | null) {
    this.uniforms.matcapTexture.value = value;
  }

  public get parametricRimColorFactor(): THREE.Color {
    return this.uniforms.parametricRimColorFactor.value;
  }
  public set parametricRimColorFactor(value: THREE.Color) {
    this.uniforms.parametricRimColorFactor.value = value;
  }

  public get rimMultiplyTexture(): THREE.Texture | null {
    return this.uniforms.rimMultiplyTexture.value;
  }
  public set rimMultiplyTexture(value: THREE.Texture | null) {
    this.uniforms.rimMultiplyTexture.value = value;
  }

  public get rimLightingMixFactor(): number {
    return this.uniforms.rimLightingMixFactor.value;
  }
  public set rimLightingMixFactor(value: number) {
    this.uniforms.rimLightingMixFactor.value = value;
  }

  public get parametricRimFresnelPowerFactor(): number {
    return this.uniforms.parametricRimFresnelPowerFactor.value;
  }
  public set parametricRimFresnelPowerFactor(value: number) {
    this.uniforms.parametricRimFresnelPowerFactor.value = value;
  }

  public get parametricRimLiftFactor(): number {
    return this.uniforms.parametricRimLiftFactor.value;
  }
  public set parametricRimLiftFactor(value: number) {
    this.uniforms.parametricRimLiftFactor.value = value;
  }

  public get outlineWidthMultiplyTexture(): THREE.Texture | null {
    return this.uniforms.outlineWidthMultiplyTexture.value;
  }
  public set outlineWidthMultiplyTexture(value: THREE.Texture | null) {
    this.uniforms.outlineWidthMultiplyTexture.value = value;
  }

  public get outlineWidthFactor(): number {
    return this.uniforms.outlineWidthFactor.value;
  }
  public set outlineWidthFactor(value: number) {
    this.uniforms.outlineWidthFactor.value = value;
  }

  public get outlineColorFactor(): THREE.Color {
    return this.uniforms.outlineColorFactor.value;
  }
  public set outlineColorFactor(value: THREE.Color) {
    this.uniforms.outlineColorFactor.value = value;
  }

  public get outlineLightingMixFactor(): number {
    return this.uniforms.outlineLightingMixFactor.value;
  }
  public set outlineLightingMixFactor(value: number) {
    this.uniforms.outlineLightingMixFactor.value = value;
  }

  public get uvAnimationMaskTexture(): THREE.Texture | null {
    return this.uniforms.uvAnimationMaskTexture.value;
  }
  public set uvAnimationMaskTexture(value: THREE.Texture | null) {
    this.uniforms.uvAnimationMaskTexture.value = value;
  }

  public get uvAnimationScrollXOffset(): number {
    return this.uniforms.uvAnimationScrollXOffset.value;
  }
  public set uvAnimationScrollXOffset(value: number) {
    this.uniforms.uvAnimationScrollXOffset.value = value;
  }

  public get uvAnimationScrollYOffset(): number {
    return this.uniforms.uvAnimationScrollYOffset.value;
  }
  public set uvAnimationScrollYOffset(value: number) {
    this.uniforms.uvAnimationScrollYOffset.value = value;
  }

  public get uvAnimationRotationPhase(): number {
    return this.uniforms.uvAnimationRotationPhase.value;
  }
  public set uvAnimationRotationPhase(value: number) {
    this.uniforms.uvAnimationRotationPhase.value = value;
  }

  public uvAnimationScrollXSpeedFactor = 0.0;
  public uvAnimationScrollYSpeedFactor = 0.0;
  public uvAnimationRotationSpeedFactor = 0.0;

  /**
   * Will be read in WebGLPrograms
   *
   * See: https://github.com/mrdoob/three.js/blob/4f5236ac3d6f41d904aa58401b40554e8fbdcb15/src/renderers/webgl/WebGLPrograms.js#L190-L191
   */
  public normalMapType = THREE.TangentSpaceNormalMap;

  /**
   * The material will call this in its constructor.
   * See {@link VRMCMaterialsMToonExtensionPlugin.setMToonMaterial} for more details.
   *
   * It will called also when it's copied.
   */
  public onLoadMaterial?: (material: MToonMaterial) => void;

  /**
   * When this is `true`, vertex colors will be ignored.
   * `true` by default.
   */
  private _ignoreVertexColor = true;

  /**
   * When this is `true`, vertex colors will be ignored.
   * `true` by default.
   */
  public get ignoreVertexColor(): boolean {
    return this._ignoreVertexColor;
  }
  public set ignoreVertexColor(value: boolean) {
    this._ignoreVertexColor = value;

    this._updateShaderCode();
  }

  private _debugMode: MToonMaterialDebugMode = MToonMaterialDebugMode.None;

  get debugMode(): MToonMaterialDebugMode {
    return this._debugMode;
  }
  set debugMode(m: MToonMaterialDebugMode) {
    this._debugMode = m;

    this._updateShaderCode();
  }

  private _outlineWidthMode: MToonMaterialOutlineWidthMode = MToonMaterialOutlineWidthMode.None;

  get outlineWidthMode(): MToonMaterialOutlineWidthMode {
    return this._outlineWidthMode;
  }
  set outlineWidthMode(m: MToonMaterialOutlineWidthMode) {
    this._outlineWidthMode = m;

    this._updateShaderCode();
  }

  private _isOutline = false;

  get isOutline(): boolean {
    return this._isOutline;
  }
  set isOutline(b: boolean) {
    this._isOutline = b;

    this._updateShaderCode();
  }

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
    this.uniforms = THREE.UniformsUtils.merge([
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
      parameters.uniforms,
    ]);

    // == finally compile the shader program =======================================================
    this.setValues(parameters);

    // == update shader stuff ======================================================================
    this._updateShaderCode();

    // == call onLoadMaterial ======================================================================
    this.onLoadMaterial?.(this);
  }

  /**
   * Update this material.
   *
   * @param delta deltaTime since last update
   */
  public update(delta: number): void {
    this.uniforms.uvAnimationScrollXOffset.value += delta * this.uvAnimationScrollXSpeedFactor;
    this.uniforms.uvAnimationScrollYOffset.value += delta * this.uvAnimationScrollYSpeedFactor;
    this.uniforms.uvAnimationRotationPhase.value += delta * this.uvAnimationRotationSpeedFactor;

    this.uniformsNeedUpdate = true;
  }

  public copy(source: this): this {
    super.copy(source);
    // uniforms are already copied at this moment

    // == copy members =============================================================================
    this.normalMapType = source.normalMapType;

    this.uvAnimationScrollXSpeedFactor = source.uvAnimationScrollXSpeedFactor;
    this.uvAnimationScrollYSpeedFactor = source.uvAnimationScrollYSpeedFactor;
    this.uvAnimationRotationSpeedFactor = source.uvAnimationRotationSpeedFactor;

    this.ignoreVertexColor = source.ignoreVertexColor;

    this.debugMode = source.debugMode;
    this.outlineWidthMode = source.outlineWidthMode;

    this.isOutline = source.isOutline;

    // == update shader stuff ======================================================================
    this._updateShaderCode();

    // == call onLoadMaterial ======================================================================
    this.onLoadMaterial = source.onLoadMaterial;
    this.onLoadMaterial?.(this);

    return this;
  }

  private _updateShaderCode(): void {
    const useUvInVert = this.outlineWidthMultiplyTexture !== null;
    const useUvInFrag =
      this.map !== null ||
      this.shadeMultiplyTexture !== null ||
      this.shadingShiftTexture !== null ||
      this.rimMultiplyTexture !== null ||
      this.uvAnimationMaskTexture !== null;

    this.defines = {
      // Temporary compat against shader change @ Three.js r126
      // See: #21205, #21307, #21299
      THREE_VRM_THREE_REVISION_126: parseInt(THREE.REVISION) >= 126,

      OUTLINE: this._isOutline,
      MTOON_USE_UV: useUvInVert || useUvInFrag, // we can't use `USE_UV` , it will be redefined in WebGLProgram.js
      MTOON_UVS_VERTEX_ONLY: useUvInVert && !useUvInFrag,
      USE_SHADEMULTIPLYTEXTURE: this.shadeMultiplyTexture !== null,
      USE_SHADINGSHIFTTEXTURE: this.shadingShiftTexture !== null,
      USE_MATCAPTEXTURE: this.matcapTexture !== null,
      USE_RIMMULTIPLYTEXTURE: this.rimMultiplyTexture !== null,
      USE_OUTLINEWIDTHMULTIPLYTEXTURE: this.outlineWidthMultiplyTexture !== null,
      USE_UVANIMATIONMASKTEXTURE: this.uvAnimationMaskTexture !== null,
      IGNORE_VERTEX_COLOR: this._ignoreVertexColor === true,
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
