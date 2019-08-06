/* tslint:disable:member-ordering */

import * as THREE from 'three';

export class Unlit extends THREE.ShaderMaterial {
  public readonly isVRMUnlit: boolean = true;

  public cutoff: number = 0.5;
  public map: THREE.Texture | null = null; // _MainTex
  public mainTex_ST: THREE.Vector4 = new THREE.Vector4(0.0, 0.0, 1.0, 1.0); // _MainTex_ST
  private _renderType: UnlitRenderType = UnlitRenderType.Opaque;

  public shouldApplyUniforms: boolean = true; // when this is true, applyUniforms effects

  constructor(parameters?: UnlitParameters) {
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
    this.updateShaderCode();
  }

  get mainTex(): THREE.Texture | null {
    return this.map;
  }

  set mainTex(t: THREE.Texture | null) {
    this.map = t;
  }

  get renderType(): UnlitRenderType {
    return this._renderType;
  }

  set renderType(t: UnlitRenderType) {
    this._renderType = t;

    this.depthWrite = this._renderType !== UnlitRenderType.Transparent;
    this.transparent =
      this._renderType === UnlitRenderType.Transparent || this._renderType === UnlitRenderType.TransparentWithZWrite;
    this.updateShaderCode();
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
   * Strongly recommended to call this in `Object3D.onBeforeRender` .
   */
  public applyUniforms() {
    if (!this.shouldApplyUniforms) {
      return;
    }
    this.shouldApplyUniforms = false;

    this.uniforms.cutoff.value = this.cutoff;
    this.uniforms.map.value = this.map;
    this.uniforms.mainTex_ST.value.copy(this.mainTex_ST);
  }

  private updateShaderCode() {
    this.defines = {
      RENDERTYPE_OPAQUE: this._renderType === UnlitRenderType.Opaque,
      RENDERTYPE_CUTOUT: this._renderType === UnlitRenderType.Cutout,
      RENDERTYPE_TRANSPARENT:
        this._renderType === UnlitRenderType.Transparent || this._renderType === UnlitRenderType.TransparentWithZWrite,
    };

    this.vertexShader = require('./shaders/unlit.vert');
    this.fragmentShader = require('./shaders/unlit.frag');

    // == set needsUpdate flag =================================================
    this.needsUpdate = true;
  }
}

export interface UnlitParameters extends THREE.ShaderMaterialParameters {
  cutoff?: number; // _Cutoff
  map?: THREE.Texture; // _MainTex
  mainTex?: THREE.Texture; // _MainTex (will be renamed to map)
  mainTex_ST?: THREE.Vector4; // _MainTex_ST

  renderType?: UnlitRenderType | number;
}

export enum UnlitRenderType {
  Opaque,
  Cutout,
  Transparent,
  TransparentWithZWrite,
}
