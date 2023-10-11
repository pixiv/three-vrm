/* tslint:disable:member-ordering */

import * as THREE from 'three';
import vertexShader from './shaders/mtoon.vert';
import fragmentShader from './shaders/mtoon.frag';
import { MToonMaterialDebugMode } from './MToonMaterialDebugMode';
import { MToonMaterialOutlineWidthMode } from './MToonMaterialOutlineWidthMode';
import type { MToonMaterialParameters } from './MToonMaterialParameters';
import { getTextureColorSpace } from './utils/getTextureColorSpace';

/**
 * MToon is a material specification that has various features.
 * The spec and implementation are originally founded for Unity engine and this is a port of the material.
 *
 * See: https://github.com/Santarh/MToon
 */
export class MToonMaterial extends THREE.ShaderMaterial {
  public uniforms: {
    litFactor: THREE.IUniform<THREE.Color>;
    alphaTest: THREE.IUniform<number>;
    opacity: THREE.IUniform<number>;
    map: THREE.IUniform<THREE.Texture | null>;
    mapUvTransform: THREE.IUniform<THREE.Matrix3>;
    normalMap: THREE.IUniform<THREE.Texture | null>;
    normalMapUvTransform: THREE.IUniform<THREE.Matrix3>;
    normalScale: THREE.IUniform<THREE.Vector2>;
    emissive: THREE.IUniform<THREE.Color>;
    emissiveIntensity: THREE.IUniform<number>;
    emissiveMap: THREE.IUniform<THREE.Texture | null>;
    emissiveMapUvTransform: THREE.IUniform<THREE.Matrix3>;
    shadeColorFactor: THREE.IUniform<THREE.Color>;
    shadeMultiplyTexture: THREE.IUniform<THREE.Texture | null>;
    shadeMultiplyTextureUvTransform: THREE.IUniform<THREE.Matrix3>;
    shadingShiftFactor: THREE.IUniform<number>;
    shadingShiftTexture: THREE.IUniform<THREE.Texture | null>;
    shadingShiftTextureUvTransform: THREE.IUniform<THREE.Matrix3>;
    shadingShiftTextureScale: THREE.IUniform<number>;
    shadingToonyFactor: THREE.IUniform<number>;
    giEqualizationFactor: THREE.IUniform<number>;
    matcapFactor: THREE.IUniform<THREE.Color>;
    matcapTexture: THREE.IUniform<THREE.Texture | null>;
    matcapTextureUvTransform: THREE.IUniform<THREE.Matrix3>;
    parametricRimColorFactor: THREE.IUniform<THREE.Color>;
    rimMultiplyTexture: THREE.IUniform<THREE.Texture | null>;
    rimMultiplyTextureUvTransform: THREE.IUniform<THREE.Matrix3>;
    rimLightingMixFactor: THREE.IUniform<number>;
    parametricRimFresnelPowerFactor: THREE.IUniform<number>;
    parametricRimLiftFactor: THREE.IUniform<number>;
    outlineWidthMultiplyTexture: THREE.IUniform<THREE.Texture | null>;
    outlineWidthMultiplyTextureUvTransform: THREE.IUniform<THREE.Matrix3>;
    outlineWidthFactor: THREE.IUniform<number>;
    outlineColorFactor: THREE.IUniform<THREE.Color>;
    outlineLightingMixFactor: THREE.IUniform<number>;
    uvAnimationMaskTexture: THREE.IUniform<THREE.Texture | null>;
    uvAnimationMaskTextureUvTransform: THREE.IUniform<THREE.Matrix3>;
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

  public get emissiveIntensity(): number {
    return this.uniforms.emissiveIntensity.value;
  }
  public set emissiveIntensity(value: number) {
    this.uniforms.emissiveIntensity.value = value;
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

  public get giEqualizationFactor(): number {
    return this.uniforms.giEqualizationFactor.value;
  }
  public set giEqualizationFactor(value: number) {
    this.uniforms.giEqualizationFactor.value = value;
  }

  public get matcapFactor(): THREE.Color {
    return this.uniforms.matcapFactor.value;
  }
  public set matcapFactor(value: THREE.Color) {
    this.uniforms.matcapFactor.value = value;
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
   * Whether the material is affected by fog.
   * `true` by default.
   */
  public fog = true;

  /**
   * Will be read in WebGLPrograms
   *
   * See: https://github.com/mrdoob/three.js/blob/4f5236ac3d6f41d904aa58401b40554e8fbdcb15/src/renderers/webgl/WebGLPrograms.js#L190-L191
   */
  public normalMapType = THREE.TangentSpaceNormalMap;

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

    this.needsUpdate = true;
  }

  private _v0CompatShade = false;

  /**
   * There is a line of the shader called "comment out if you want to PBR absolutely" in VRM0.0 MToon.
   * When this is true, the material enables the line to make it compatible with the legacy rendering of VRM.
   * Usually not recommended to turn this on.
   * `false` by default.
   */
  get v0CompatShade(): boolean {
    return this._v0CompatShade;
  }

  /**
   * There is a line of the shader called "comment out if you want to PBR absolutely" in VRM0.0 MToon.
   * When this is true, the material enables the line to make it compatible with the legacy rendering of VRM.
   * Usually not recommended to turn this on.
   * `false` by default.
   */
  set v0CompatShade(v: boolean) {
    this._v0CompatShade = v;

    this.needsUpdate = true;
  }

  private _debugMode: MToonMaterialDebugMode = MToonMaterialDebugMode.None;

  /**
   * Debug mode for the material.
   * You can visualize several components for diagnosis using debug mode.
   *
   * See: {@link MToonMaterialDebugMode}
   */
  get debugMode(): MToonMaterialDebugMode {
    return this._debugMode;
  }

  /**
   * Debug mode for the material.
   * You can visualize several components for diagnosis using debug mode.
   *
   * See: {@link MToonMaterialDebugMode}
   */
  set debugMode(m: MToonMaterialDebugMode) {
    this._debugMode = m;

    this.needsUpdate = true;
  }

  private _outlineWidthMode: MToonMaterialOutlineWidthMode = MToonMaterialOutlineWidthMode.None;

  get outlineWidthMode(): MToonMaterialOutlineWidthMode {
    return this._outlineWidthMode;
  }
  set outlineWidthMode(m: MToonMaterialOutlineWidthMode) {
    this._outlineWidthMode = m;

    this.needsUpdate = true;
  }

  private _isOutline = false;

  get isOutline(): boolean {
    return this._isOutline;
  }
  set isOutline(b: boolean) {
    this._isOutline = b;

    this.needsUpdate = true;
  }

  /**
   * Readonly boolean that indicates this is a [[MToonMaterial]].
   */
  public get isMToonMaterial(): true {
    return true;
  }

  constructor(parameters: MToonMaterialParameters = {}) {
    super({ vertexShader, fragmentShader });

    // override depthWrite with transparentWithZWrite
    if (parameters.transparentWithZWrite) {
      parameters.depthWrite = true;
    }
    delete parameters.transparentWithZWrite;

    // == enabling bunch of stuff ==================================================================
    parameters.fog = true;
    parameters.lights = true;
    parameters.clipping = true;

    // COMPAT: pre-r129
    // See: https://github.com/mrdoob/three.js/pull/21788
    if (parseInt(THREE.REVISION, 10) < 129) {
      (parameters as any).skinning = (parameters as any).skinning || false;
    }

    // COMPAT: pre-r131
    // See: https://github.com/mrdoob/three.js/pull/22169
    if (parseInt(THREE.REVISION, 10) < 131) {
      (parameters as any).morphTargets = (parameters as any).morphTargets || false;
      (parameters as any).morphNormals = (parameters as any).morphNormals || false;
    }

    // == uniforms =================================================================================
    this.uniforms = THREE.UniformsUtils.merge([
      THREE.UniformsLib.common, // map
      THREE.UniformsLib.normalmap, // normalMap
      THREE.UniformsLib.emissivemap, // emissiveMap
      THREE.UniformsLib.fog,
      THREE.UniformsLib.lights,
      {
        litFactor: { value: new THREE.Color(1.0, 1.0, 1.0) },
        mapUvTransform: { value: new THREE.Matrix3() },
        colorAlpha: { value: 1.0 },
        normalMapUvTransform: { value: new THREE.Matrix3() },
        shadeColorFactor: { value: new THREE.Color(0.97, 0.81, 0.86) },
        shadeMultiplyTexture: { value: null },
        shadeMultiplyTextureUvTransform: { value: new THREE.Matrix3() },
        shadingShiftFactor: { value: 0.0 },
        shadingShiftTexture: { value: null },
        shadingShiftTextureUvTransform: { value: new THREE.Matrix3() },
        shadingShiftTextureScale: { value: 1.0 },
        shadingToonyFactor: { value: 0.9 },
        giEqualizationFactor: { value: 0.9 },
        matcapFactor: { value: new THREE.Color(0.0, 0.0, 0.0) },
        matcapTexture: { value: null },
        matcapTextureUvTransform: { value: new THREE.Matrix3() },
        parametricRimColorFactor: { value: new THREE.Color(0.0, 0.0, 0.0) },
        rimMultiplyTexture: { value: null },
        rimMultiplyTextureUvTransform: { value: new THREE.Matrix3() },
        rimLightingMixFactor: { value: 0.0 },
        parametricRimFresnelPowerFactor: { value: 1.0 },
        parametricRimLiftFactor: { value: 0.0 },
        emissive: { value: new THREE.Color(0.0, 0.0, 0.0) },
        emissiveIntensity: { value: 1.0 },
        emissiveMapUvTransform: { value: new THREE.Matrix3() },
        outlineWidthMultiplyTexture: { value: null },
        outlineWidthMultiplyTextureUvTransform: { value: new THREE.Matrix3() },
        outlineWidthFactor: { value: 0.5 },
        outlineColorFactor: { value: new THREE.Color(0.0, 0.0, 0.0) },
        outlineLightingMixFactor: { value: 1.0 },
        uvAnimationMaskTexture: { value: null },
        uvAnimationMaskTextureUvTransform: { value: new THREE.Matrix3() },
        uvAnimationScrollXOffset: { value: 0.0 },
        uvAnimationScrollYOffset: { value: 0.0 },
        uvAnimationRotationPhase: { value: 0.0 },
      },
      parameters.uniforms,
    ]);

    // == finally compile the shader program =======================================================
    this.setValues(parameters);

    // == upload uniforms that need to upload ======================================================
    this._uploadUniformsWorkaround();

    // == update shader stuff ======================================================================
    this.customProgramCacheKey = () =>
      [
        ...Object.entries(this._generateDefines()).map(([token, macro]) => `${token}:${macro}`),
        this.matcapTexture ? `matcapTextureColorSpace:${getTextureColorSpace(this.matcapTexture)}` : '',
        this.shadeMultiplyTexture
          ? `shadeMultiplyTextureColorSpace:${getTextureColorSpace(this.shadeMultiplyTexture)}`
          : '',
        this.rimMultiplyTexture ? `rimMultiplyTextureColorSpace:${getTextureColorSpace(this.rimMultiplyTexture)}` : '',
      ].join(',');

    this.onBeforeCompile = (shader) => {
      const threeRevision = parseInt(THREE.REVISION, 10);

      const defines =
        Object.entries({ ...this._generateDefines(), ...this.defines })
          .filter(([token, macro]) => !!macro)
          .map(([token, macro]) => `#define ${token} ${macro}`)
          .join('\n') + '\n';

      // -- generate shader code -------------------------------------------------------------------
      shader.vertexShader = defines + shader.vertexShader;
      shader.fragmentShader = defines + shader.fragmentShader;

      // -- compat ---------------------------------------------------------------------------------

      // COMPAT: pre-r154
      // Three.js r154 renames the shader chunk <colorspace_fragment> to <encodings_fragment>
      if (threeRevision < 154) {
        shader.fragmentShader = shader.fragmentShader.replace(
          '#include <colorspace_fragment>',
          '#include <encodings_fragment>',
        );
      }

      // COMPAT: pre-r132
      // Three.js r132 introduces new shader chunks <normal_pars_fragment> and <alphatest_pars_fragment>
      if (threeRevision < 132) {
        shader.fragmentShader = shader.fragmentShader.replace('#include <normal_pars_fragment>', '');
        shader.fragmentShader = shader.fragmentShader.replace('#include <alphatest_pars_fragment>', '');
      }
    };
  }

  /**
   * Update this material.
   *
   * @param delta deltaTime since last update
   */
  public update(delta: number): void {
    this._uploadUniformsWorkaround();
    this._updateUVAnimation(delta);
  }

  public copy(source: this): this {
    super.copy(source);
    // uniforms are already copied at this moment

    // Beginning from r133, uniform textures will be cloned instead of reference
    // See: https://github.com/mrdoob/three.js/blob/a8813be04a849bd155f7cf6f1b23d8ee2e0fb48b/examples/jsm/loaders/GLTFLoader.js#L3047
    // See: https://github.com/mrdoob/three.js/blob/a8813be04a849bd155f7cf6f1b23d8ee2e0fb48b/src/renderers/shaders/UniformsUtils.js#L22
    // This will leave their `.version` to be `0`
    // and these textures won't be uploaded to GPU
    // We are going to workaround this in here
    // I've opened an issue for this: https://github.com/mrdoob/three.js/issues/22718
    this.map = source.map;
    this.normalMap = source.normalMap;
    this.emissiveMap = source.emissiveMap;
    this.shadeMultiplyTexture = source.shadeMultiplyTexture;
    this.shadingShiftTexture = source.shadingShiftTexture;
    this.matcapTexture = source.matcapTexture;
    this.rimMultiplyTexture = source.rimMultiplyTexture;
    this.outlineWidthMultiplyTexture = source.outlineWidthMultiplyTexture;
    this.uvAnimationMaskTexture = source.uvAnimationMaskTexture;

    // == copy members =============================================================================
    this.normalMapType = source.normalMapType;

    this.uvAnimationScrollXSpeedFactor = source.uvAnimationScrollXSpeedFactor;
    this.uvAnimationScrollYSpeedFactor = source.uvAnimationScrollYSpeedFactor;
    this.uvAnimationRotationSpeedFactor = source.uvAnimationRotationSpeedFactor;

    this.ignoreVertexColor = source.ignoreVertexColor;

    this.v0CompatShade = source.v0CompatShade;
    this.debugMode = source.debugMode;
    this.outlineWidthMode = source.outlineWidthMode;

    this.isOutline = source.isOutline;

    // == update shader stuff ======================================================================
    this.needsUpdate = true;

    return this;
  }

  /**
   * Update UV animation state.
   * Intended to be called via {@link update}.
   * @param delta deltaTime
   */
  private _updateUVAnimation(delta: number): void {
    this.uniforms.uvAnimationScrollXOffset.value += delta * this.uvAnimationScrollXSpeedFactor;
    this.uniforms.uvAnimationScrollYOffset.value += delta * this.uvAnimationScrollYSpeedFactor;
    this.uniforms.uvAnimationRotationPhase.value += delta * this.uvAnimationRotationSpeedFactor;

    this.uniformsNeedUpdate = true;
  }

  /**
   * Upload uniforms that need to upload but doesn't automatically because of reasons.
   * Intended to be called via {@link constructor} and {@link update}.
   */
  private _uploadUniformsWorkaround(): void {
    // workaround: since opacity is defined as a property in THREE.Material
    // and cannot be overridden as an accessor,
    // We are going to update opacity here
    this.uniforms.opacity.value = this.opacity;

    // workaround: texture transforms are not updated automatically
    this._updateTextureMatrix(this.uniforms.map, this.uniforms.mapUvTransform);
    this._updateTextureMatrix(this.uniforms.normalMap, this.uniforms.normalMapUvTransform);
    this._updateTextureMatrix(this.uniforms.emissiveMap, this.uniforms.emissiveMapUvTransform);
    this._updateTextureMatrix(this.uniforms.shadeMultiplyTexture, this.uniforms.shadeMultiplyTextureUvTransform);
    this._updateTextureMatrix(this.uniforms.shadingShiftTexture, this.uniforms.shadingShiftTextureUvTransform);
    this._updateTextureMatrix(this.uniforms.matcapTexture, this.uniforms.matcapTextureUvTransform);
    this._updateTextureMatrix(this.uniforms.rimMultiplyTexture, this.uniforms.rimMultiplyTextureUvTransform);
    this._updateTextureMatrix(
      this.uniforms.outlineWidthMultiplyTexture,
      this.uniforms.outlineWidthMultiplyTextureUvTransform,
    );
    this._updateTextureMatrix(this.uniforms.uvAnimationMaskTexture, this.uniforms.uvAnimationMaskTextureUvTransform);

    // COMPAT workaround: starting from r132, alphaTest becomes a uniform instead of preprocessor value
    const threeRevision = parseInt(THREE.REVISION, 10);

    if (threeRevision >= 132) {
      this.uniforms.alphaTest.value = this.alphaTest;
    }

    this.uniformsNeedUpdate = true;
  }

  /**
   * Returns a map object of preprocessor token and macro of the shader program.
   */
  private _generateDefines(): { [token: string]: boolean | number | string } {
    const threeRevision = parseInt(THREE.REVISION, 10);

    const useUvInVert = this.outlineWidthMultiplyTexture !== null;
    const useUvInFrag =
      this.map !== null ||
      this.emissiveMap !== null ||
      this.shadeMultiplyTexture !== null ||
      this.shadingShiftTexture !== null ||
      this.rimMultiplyTexture !== null ||
      this.uvAnimationMaskTexture !== null;

    return {
      // Temporary compat against shader change @ Three.js r126
      // See: #21205, #21307, #21299
      THREE_VRM_THREE_REVISION: threeRevision,

      OUTLINE: this._isOutline,
      MTOON_USE_UV: useUvInVert || useUvInFrag, // we can't use `USE_UV` , it will be redefined in WebGLProgram.js
      MTOON_UVS_VERTEX_ONLY: useUvInVert && !useUvInFrag,
      V0_COMPAT_SHADE: this._v0CompatShade,
      USE_SHADEMULTIPLYTEXTURE: this.shadeMultiplyTexture !== null,
      USE_SHADINGSHIFTTEXTURE: this.shadingShiftTexture !== null,
      USE_MATCAPTEXTURE: this.matcapTexture !== null,
      USE_RIMMULTIPLYTEXTURE: this.rimMultiplyTexture !== null,
      USE_OUTLINEWIDTHMULTIPLYTEXTURE: this._isOutline && this.outlineWidthMultiplyTexture !== null,
      USE_UVANIMATIONMASKTEXTURE: this.uvAnimationMaskTexture !== null,
      IGNORE_VERTEX_COLOR: this._ignoreVertexColor === true,
      DEBUG_NORMAL: this._debugMode === 'normal',
      DEBUG_LITSHADERATE: this._debugMode === 'litShadeRate',
      DEBUG_UV: this._debugMode === 'uv',
      OUTLINE_WIDTH_WORLD: this._isOutline && this._outlineWidthMode === MToonMaterialOutlineWidthMode.WorldCoordinates,
      OUTLINE_WIDTH_SCREEN:
        this._isOutline && this._outlineWidthMode === MToonMaterialOutlineWidthMode.ScreenCoordinates,
    };
  }

  private _updateTextureMatrix(src: THREE.IUniform<THREE.Texture | null>, dst: THREE.IUniform<THREE.Matrix3>): void {
    if (src.value) {
      if (src.value.matrixAutoUpdate) {
        src.value.updateMatrix();
      }

      dst.value.copy(src.value.matrix);
    }
  }
}
