/* tslint:disable:member-ordering */

import * as THREE from 'three';
import vertexShader from './shaders/unlit.vert';
import fragmentShader from './shaders/unlit.frag';

export interface VRMUnlitMaterialParameters extends THREE.ShaderMaterialParameters {
  cutoff?: number; // _Cutoff
  map?: THREE.Texture; // _MainTex
  mainTex?: THREE.Texture; // _MainTex (will be renamed to map)
  mainTex_ST?: THREE.Vector4; // _MainTex_ST

  renderType?: VRMUnlitMaterialRenderType | number;
}

export enum VRMUnlitMaterialRenderType {
  Opaque,
  Cutout,
  Transparent,
  TransparentWithZWrite,
}

/**
 * This is a material that is an equivalent of "VRM/Unlit***" on VRM spec, those materials are already kinda deprecated though...
 */
export class VRMUnlitMaterial extends THREE.ShaderMaterial {
  /**
   * Readonly boolean that indicates this is a [[VRMUnlitMaterial]].
   */
  public readonly isVRMUnlitMaterial: boolean = true;

  public cutoff = 0.5;
  public map: THREE.Texture | null = null; // _MainTex
  public mainTex_ST = new THREE.Vector4(0.0, 0.0, 1.0, 1.0); // _MainTex_ST
  private _renderType = VRMUnlitMaterialRenderType.Opaque;

  public shouldApplyUniforms = true; // when this is true, applyUniforms effects

  constructor(parameters?: VRMUnlitMaterialParameters) {
    super();

    if (parameters === undefined) {
      parameters = {};
    }

    // == enabling bunch of stuff ==============================================
    parameters.fog = true;
    parameters.clipping = true;

    parameters.skinning = parameters.skinning || false;
    parameters.morphTargets = parameters.morphTargets || false;
    parameters.morphNormals = parameters.morphNormals || false;

    // == uniforms =============================================================
    parameters.uniforms = THREE.UniformsUtils.merge([
      THREE.UniformsLib.common, // map
      THREE.UniformsLib.fog,
      {
        cutoff: { value: 0.5 },
        mainTex_ST: { value: new THREE.Vector4(0.0, 0.0, 1.0, 1.0) },
      },
    ]);

    // == finally compile the shader program ===================================
    this.setValues(parameters);

    // == update shader stuff ==================================================
    this._updateShaderCode();
    this._applyUniforms();
  }

  get mainTex(): THREE.Texture | null {
    return this.map;
  }

  set mainTex(t: THREE.Texture | null) {
    this.map = t;
  }

  get renderType(): VRMUnlitMaterialRenderType {
    return this._renderType;
  }

  set renderType(t: VRMUnlitMaterialRenderType) {
    this._renderType = t;

    this.depthWrite = this._renderType !== VRMUnlitMaterialRenderType.Transparent;
    this.transparent =
      this._renderType === VRMUnlitMaterialRenderType.Transparent ||
      this._renderType === VRMUnlitMaterialRenderType.TransparentWithZWrite;
    this._updateShaderCode();
  }

  /**
   * Update this material.
   * Usually this will be called via [[VRM.update]] so you don't have to call this manually.
   *
   * @param delta deltaTime since last update
   */
  public updateVRMMaterials(delta: number): void {
    this._applyUniforms();
  }

  public copy(source: this): this {
    super.copy(source);

    // == copy members =========================================================
    this.cutoff = source.cutoff;
    this.map = source.map;
    this.mainTex_ST.copy(source.mainTex_ST);
    this.renderType = source.renderType;

    return this;
  }

  /**
   * Apply updated uniform variables.
   */
  private _applyUniforms(): void {
    if (!this.shouldApplyUniforms) {
      return;
    }
    this.shouldApplyUniforms = false;

    this.uniforms.cutoff.value = this.cutoff;
    this.uniforms.map.value = this.map;
    this.uniforms.mainTex_ST.value.copy(this.mainTex_ST);
  }

  private _updateShaderCode(): void {
    this.defines = {
      RENDERTYPE_OPAQUE: this._renderType === VRMUnlitMaterialRenderType.Opaque,
      RENDERTYPE_CUTOUT: this._renderType === VRMUnlitMaterialRenderType.Cutout,
      RENDERTYPE_TRANSPARENT:
        this._renderType === VRMUnlitMaterialRenderType.Transparent ||
        this._renderType === VRMUnlitMaterialRenderType.TransparentWithZWrite,
    };

    this.vertexShader = vertexShader;
    this.fragmentShader = fragmentShader;

    // == set needsUpdate flag =================================================
    this.needsUpdate = true;
  }
}
