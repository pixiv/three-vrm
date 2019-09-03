/* tslint:disable:member-ordering */

import * as THREE from 'three';
import { getTexelDecodingFunction } from './texel-decoder';

/**
 * MToon is a material specification that has various features.
 * The spec and implementation are originally founded for Unity engine and this is a port of the material.
 *
 * See: https://github.com/Santarh/MToon
 */
export class MToon extends THREE.ShaderMaterial {
  /**
   * Readonly boolean that indicates this is a MToon material.
   */
  public readonly isVRMMToon: boolean = true;

  public cutoff: number = 0.5; // _Cutoff
  public color: THREE.Vector4 = new THREE.Vector4(1.0, 1.0, 1.0, 1.0); // _Color
  public shadeColor: THREE.Vector4 = new THREE.Vector4(0.97, 0.81, 0.86, 1.0); // _ShadeColor
  public map: THREE.Texture | null = null; // _MainTex
  public mainTex_ST: THREE.Vector4 = new THREE.Vector4(0.0, 0.0, 1.0, 1.0); // _MainTex_ST
  public shadeTexture: THREE.Texture | null = null; // _ShadeTexture
  // public shadeTexture_ST: THREE.Vector4 = new THREE.Vector4(0.0, 0.0, 1.0, 1.0); // _ShadeTexture_ST (unused)
  public bumpScale: number = 1.0; // _BumpScale
  public normalMap: THREE.Texture | null = null; // _BumpMap. again, THIS IS _BumpMap
  // public bumpMap_ST: THREE.Vector4 = new THREE.Vector4(0.0, 0.0, 1.0, 1.0); // _BumpMap_ST (unused)
  public receiveShadowRate: number = 1.0; // _ReceiveShadowRate
  public receiveShadowTexture: THREE.Texture | null = null; // _ReceiveShadowTexture
  // public receiveShadowTexture_ST: THREE.Vector4 = new THREE.Vector4(0.0, 0.0, 1.0, 1.0); // _ReceiveShadowTexture_ST (unused)
  public shadingGradeRate: number = 1.0; // _ShadingGradeRate
  public shadingGradeTexture: THREE.Texture | null = null; // _ShadingGradeTexture
  // public shadingGradeTexture_ST: THREE.Vector4 = new THREE.Vector4(0.0, 0.0, 1.0, 1.0); // _ShadingGradeTexture_ST (unused)
  public shadeShift: number = 0.0; // _ShadeShift
  public shadeToony: number = 0.9; // _ShadeToony
  public lightColorAttenuation: number = 0.0; // _LightColorAttenuation
  public indirectLightIntensity: number = 0.1; // _IndirectLightIntensity
  public rimTexture: THREE.Texture | null = null; // _RimTexture
  public rimColor: THREE.Vector4 = new THREE.Vector4(0.0, 0.0, 0.0, 1.0); // _RimColor
  public rimLightingMix: number = 0.0; // _RimLightingMix
  public rimFresnelPower: number = 1.0; // _RimFresnelPower
  public rimLift: number = 0.0; // _RimLift
  public sphereAdd: THREE.Texture | null = null; // _SphereAdd
  // public sphereAdd_ST: THREE.Vector4 = new THREE.Vector4(0.0, 0.0, 1.0, 1.0); // _SphereAdd_ST (unused)
  public emissionColor: THREE.Vector4 = new THREE.Vector4(0.0, 0.0, 0.0, 1.0); // _EmissionColor
  public emissiveMap: THREE.Texture | null = null; // _EmissionMap
  // public emissionMap_ST: THREE.Vector4 = new THREE.Vector4(0.0, 0.0, 1.0, 1.0); // _EmissionMap_ST (unused)
  public outlineWidthTexture: THREE.Texture | null = null; // _OutlineWidthTexture
  // public outlineWidthTexture_ST: THREE.Vector4 = new THREE.Vector4(0.0, 0.0, 1.0, 1.0); // _OutlineWidthTexture_ST (unused)
  public outlineWidth: number = 0.5; // _OutlineWidth
  public outlineScaledMaxDistance: number = 1.0; // _OutlineScaledMaxDistance
  public outlineColor: THREE.Vector4 = new THREE.Vector4(0.0, 0.0, 0.0, 1.0); // _OutlineColor
  public outlineLightingMix: number = 1.0; // _OutlineLightingMix

  public shouldApplyUniforms: boolean = true; // when this is true, applyUniforms effects

  private _debugMode: MToonDebugMode = MToonDebugMode.None; // _DebugMode
  private _blendMode: MToonRenderMode = MToonRenderMode.Opaque; // _BlendMode
  private _outlineWidthMode: MToonOutlineWidthMode = MToonOutlineWidthMode.None; // _OutlineWidthMode
  private _outlineColorMode: MToonOutlineColorMode = MToonOutlineColorMode.FixedColor; // _OutlineColorMode
  private _cullMode: MToonCullMode = MToonCullMode.Back; // _CullMode
  private _outlineCullMode: MToonCullMode = MToonCullMode.Front; // _OutlineCullMode
  // public srcBlend: number = 1.0; // _SrcBlend (is not supported)
  // public dstBlend: number = 0.0; // _DstBlend (is not supported)
  // public zWrite: number = 1.0; // _ZWrite (will be converted to depthWrite)

  private _isOutline: boolean = false;

  private readonly _colorSpaceGamma: boolean;

  // TODO: ここにcolorSpaceGammaあるのダサい
  constructor(colorSpaceGamma: boolean, parameters?: MToonParameters) {
    super();

    this._colorSpaceGamma = colorSpaceGamma;

    if (parameters === undefined) {
      parameters = {};
    }

    // == these parameter has no compatibility with this implementation ========
    [
      'shadeTexture_ST',
      'bumpMap_ST',
      'receiveShadowTexture_ST',
      'shadingGradeTexture_ST',
      'sphereAdd_ST',
      'emissionMap_ST',
      'outlineWidthTexture_ST',
      'srcBlend',
      'dstBlend',
    ].forEach((key) => {
      if ((parameters as any)[key] !== undefined) {
        // console.warn(`THREE.${this.type}: The parameter "${key}" is not supported.`);
        delete (parameters as any)[key];
      }
    });

    // == enabling bunch of stuff ==============================================
    parameters.fog = true;
    parameters.lights = true;
    parameters.clipping = true;

    parameters.skinning = parameters.skinning || false;
    parameters.morphTargets = parameters.morphTargets || false;
    parameters.morphNormals = parameters.morphNormals || false;

    // == uniforms =============================================================
    parameters.uniforms = THREE.UniformsUtils.merge([
      THREE.UniformsLib.common, // map
      THREE.UniformsLib.normalmap, // normalMap
      THREE.UniformsLib.emissivemap, // emissiveMap
      THREE.UniformsLib.fog,
      THREE.UniformsLib.lights,
      {
        cutoff: { value: 0.5 },
        color: { value: new THREE.Color(1.0, 1.0, 1.0) },
        colorAlpha: { value: 1.0 },
        shadeColor: { value: new THREE.Color(0.97, 0.81, 0.86) },
        mainTex_ST: { value: new THREE.Vector4(0.0, 0.0, 1.0, 1.0) },
        shadeTexture: { value: null },
        bumpScale: { value: 1.0 },
        receiveShadowRate: { value: 1.0 },
        receiveShadowTexture: { value: null },
        shadingGradeRate: { value: 1.0 },
        shadingGradeTexture: { value: null },
        shadeShift: { value: 0.0 },
        shadeToony: { value: 0.9 },
        lightColorAttenuation: { value: 0.0 },
        indirectLightIntensity: { value: 0.1 },
        rimTexture: { value: null },
        rimColor: { value: new THREE.Color(0.0, 0.0, 0.0) },
        rimLightingMix: { value: 0.0 },
        rimFresnelPower: { value: 1.0 },
        rimLift: { value: 0.0 },
        sphereAdd: { value: null },
        emissionColor: { value: new THREE.Color(0.0, 0.0, 0.0) },
        outlineWidthTexture: { value: null },
        outlineWidth: { value: 0.5 },
        outlineScaledMaxDistance: { value: 1.0 },
        outlineColor: { value: new THREE.Color(0.0, 0.0, 0.0) },
        outlineLightingMix: { value: 1.0 },
      },
    ]);

    // == finally compile the shader program ===================================
    this.setValues(parameters);

    // == update shader stuff ==================================================
    this.updateShaderCode();
    this._applyUniforms();
  }

  get mainTex(): THREE.Texture | null {
    return this.map;
  }

  set mainTex(t: THREE.Texture | null) {
    this.map = t;
  }

  get bumpMap(): THREE.Texture | null {
    return this.normalMap;
  }

  set bumpMap(t: THREE.Texture | null) {
    this.normalMap = t;
  }

  get emissionMap(): THREE.Texture | null {
    return this.emissiveMap;
  }

  set emissionMap(t: THREE.Texture | null) {
    this.emissiveMap = t;
  }

  get blendMode(): MToonRenderMode {
    return this._blendMode;
  }

  set blendMode(m: MToonRenderMode) {
    this._blendMode = m;

    this.depthWrite = this._blendMode !== MToonRenderMode.Transparent;
    this.transparent =
      this._blendMode === MToonRenderMode.Transparent || this._blendMode === MToonRenderMode.TransparentWithZWrite;
    this.updateShaderCode();
  }

  get debugMode(): MToonDebugMode {
    return this._debugMode;
  }

  set debugMode(m: MToonDebugMode) {
    this._debugMode = m;

    this.updateShaderCode();
  }

  get outlineWidthMode(): MToonOutlineWidthMode {
    return this._outlineWidthMode;
  }

  set outlineWidthMode(m: MToonOutlineWidthMode) {
    this._outlineWidthMode = m;

    this.updateShaderCode();
  }

  get outlineColorMode(): MToonOutlineColorMode {
    return this._outlineColorMode;
  }

  set outlineColorMode(m: MToonOutlineColorMode) {
    this._outlineColorMode = m;

    this.updateShaderCode();
  }

  get cullMode(): MToonCullMode {
    return this._cullMode;
  }

  set cullMode(m: MToonCullMode) {
    this._cullMode = m;

    this.updateCullFace();
  }

  get outlineCullMode(): MToonCullMode {
    return this._outlineCullMode;
  }

  set outlineCullMode(m: MToonCullMode) {
    this._outlineCullMode = m;

    this.updateCullFace();
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

    this.updateShaderCode();
    this.updateCullFace();
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
    this.color.copy(source.color);
    this.shadeColor.copy(source.shadeColor);
    this.map = source.map;
    this.mainTex_ST.copy(source.mainTex_ST);
    this.shadeTexture = source.shadeTexture;
    this.bumpScale = source.bumpScale;
    this.normalMap = source.normalMap;
    this.receiveShadowRate = source.receiveShadowRate;
    this.receiveShadowTexture = source.receiveShadowTexture;
    this.shadingGradeRate = source.shadingGradeRate;
    this.shadingGradeTexture = source.shadingGradeTexture;
    this.shadeShift = source.shadeShift;
    this.shadeToony = source.shadeToony;
    this.lightColorAttenuation = source.lightColorAttenuation;
    this.indirectLightIntensity = source.indirectLightIntensity;
    this.rimTexture = source.rimTexture;
    this.rimColor.copy(source.rimColor);
    this.rimLightingMix = source.rimLightingMix;
    this.rimFresnelPower = source.rimFresnelPower;
    this.rimLift = source.rimLift;
    this.sphereAdd = source.sphereAdd;
    this.emissionColor.copy(source.emissionColor);
    this.emissiveMap = source.emissiveMap;
    this.outlineWidthTexture = source.outlineWidthTexture;
    this.outlineWidth = source.outlineWidth;
    this.outlineScaledMaxDistance = source.outlineScaledMaxDistance;
    this.outlineColor.copy(source.outlineColor);
    this.outlineLightingMix = source.outlineLightingMix;

    this.debugMode = source.debugMode;
    this.blendMode = source.blendMode;
    this.outlineWidthMode = source.outlineWidthMode;
    this.outlineColorMode = source.outlineColorMode;
    this.cullMode = source.cullMode;
    this.outlineCullMode = source.outlineCullMode;

    this.isOutline = source.isOutline;

    return this;
  }

  /**
   * Apply updated uniform variables.
   * Strongly recommended to call this in `Object3D.onBeforeRender` .
   */
  private _applyUniforms() {
    if (!this.shouldApplyUniforms) {
      return;
    }
    this.shouldApplyUniforms = false;

    this.uniforms.cutoff.value = this.cutoff;
    this.uniforms.color.value.setRGB(this.color.x, this.color.y, this.color.z);
    if (!this._colorSpaceGamma) {
      this.uniforms.color.value.convertSRGBToLinear();
    }
    this.uniforms.colorAlpha.value = this.color.w;
    this.uniforms.shadeColor.value.setRGB(this.shadeColor.x, this.shadeColor.y, this.shadeColor.z);
    if (!this._colorSpaceGamma) {
      this.uniforms.shadeColor.value.convertSRGBToLinear();
    }
    this.uniforms.map.value = this.map;
    this.uniforms.mainTex_ST.value.copy(this.mainTex_ST);
    this.uniforms.shadeTexture.value = this.shadeTexture;
    this.uniforms.bumpScale.value = this.bumpScale;
    this.uniforms.normalMap.value = this.normalMap;
    this.uniforms.receiveShadowRate.value = this.receiveShadowRate;
    this.uniforms.receiveShadowTexture.value = this.receiveShadowTexture;
    this.uniforms.shadingGradeRate.value = this.shadingGradeRate;
    this.uniforms.shadingGradeTexture.value = this.shadingGradeTexture;
    this.uniforms.shadeShift.value = this.shadeShift;
    this.uniforms.shadeToony.value = this.shadeToony;
    this.uniforms.lightColorAttenuation.value = this.lightColorAttenuation;
    this.uniforms.indirectLightIntensity.value = this.indirectLightIntensity;
    this.uniforms.rimTexture.value = this.rimTexture;
    this.uniforms.rimColor.value.setRGB(this.rimColor.x, this.rimColor.y, this.rimColor.z);
    if (!this._colorSpaceGamma) {
      this.uniforms.rimColor.value.convertSRGBToLinear();
    }
    this.uniforms.rimLightingMix.value = this.rimLightingMix;
    this.uniforms.rimFresnelPower.value = this.rimFresnelPower;
    this.uniforms.rimLift.value = this.rimLift;
    this.uniforms.sphereAdd.value = this.sphereAdd;
    this.uniforms.emissionColor.value.setRGB(this.emissionColor.x, this.emissionColor.y, this.emissionColor.z);
    if (!this._colorSpaceGamma) {
      this.uniforms.emissionColor.value.convertSRGBToLinear();
    }
    this.uniforms.emissiveMap.value = this.emissiveMap;
    this.uniforms.outlineWidthTexture.value = this.outlineWidthTexture;
    this.uniforms.outlineWidth.value = this.outlineWidth;
    this.uniforms.outlineScaledMaxDistance.value = this.outlineScaledMaxDistance;
    this.uniforms.outlineColor.value.setRGB(this.outlineColor.x, this.outlineColor.y, this.outlineColor.z);
    if (!this._colorSpaceGamma) {
      this.uniforms.outlineColor.value.convertSRGBToLinear();
    }
    this.uniforms.outlineLightingMix.value = this.outlineLightingMix;

    this.updateCullFace();
  }

  private updateShaderCode() {
    this.defines = {
      OUTLINE: this._isOutline,
      BLENDMODE_OPAQUE: this._blendMode === MToonRenderMode.Opaque,
      BLENDMODE_CUTOUT: this._blendMode === MToonRenderMode.Cutout,
      BLENDMODE_TRANSPARENT:
        this._blendMode === MToonRenderMode.Transparent || this._blendMode === MToonRenderMode.TransparentWithZWrite,
      USE_SHADETEXTURE: this.shadeTexture !== null,
      USE_RECEIVESHADOWTEXTURE: this.receiveShadowTexture !== null,
      USE_SHADINGGRADETEXTURE: this.shadingGradeTexture !== null,
      USE_RIMTEXTURE: this.rimTexture !== null,
      USE_SPHEREADD: this.sphereAdd !== null,
      USE_OUTLINEWIDTHTEXTURE: this.outlineWidthTexture !== null,
      DEBUG_NORMAL: this._debugMode === MToonDebugMode.Normal,
      DEBUG_LITSHADERATE: this._debugMode === MToonDebugMode.LitShadeRate,
      DEBUG_UV: this._debugMode === MToonDebugMode.UV,
      OUTLINE_WIDTH_WORLD: this._outlineWidthMode === MToonOutlineWidthMode.WorldCoordinates,
      OUTLINE_WIDTH_SCREEN: this._outlineWidthMode === MToonOutlineWidthMode.ScreenCoordinates,
      OUTLINE_COLOR_FIXED: this._outlineColorMode === MToonOutlineColorMode.FixedColor,
      OUTLINE_COLOR_MIXED: this._outlineColorMode === MToonOutlineColorMode.MixedLighting,
    };

    // == texture encodings ====================================================
    const encodings =
      (this.shadeTexture !== null
        ? getTexelDecodingFunction('shadeTextureTexelToLinear', this.shadeTexture.encoding) + '\n'
        : '') +
      (this.sphereAdd !== null
        ? getTexelDecodingFunction('sphereAddTexelToLinear', this.sphereAdd.encoding) + '\n'
        : '');

    // == generate shader code =================================================
    this.vertexShader = require('./shaders/mtoon.vert');
    this.fragmentShader = encodings + require('./shaders/mtoon.frag');

    // == set needsUpdate flag =================================================
    this.needsUpdate = true;
  }

  private updateCullFace() {
    if (!this.isOutline) {
      if (this.cullMode === MToonCullMode.Off) {
        this.side = THREE.DoubleSide;
      } else if (this.cullMode === MToonCullMode.Front) {
        this.side = THREE.BackSide;
      } else if (this.cullMode === MToonCullMode.Back) {
        this.side = THREE.FrontSide;
      }
    } else {
      if (this.outlineCullMode === MToonCullMode.Off) {
        this.side = THREE.DoubleSide;
      } else if (this.outlineCullMode === MToonCullMode.Front) {
        this.side = THREE.BackSide;
      } else if (this.outlineCullMode === MToonCullMode.Back) {
        this.side = THREE.FrontSide;
      }
    }
  }
}

export interface MToonParameters extends THREE.ShaderMaterialParameters {
  cutoff?: number; // _Cutoff
  color?: THREE.Vector4; // rgb of _Color
  shadeColor?: THREE.Vector4; // _ShadeColor
  map?: THREE.Texture; // _MainTex
  mainTex?: THREE.Texture; // _MainTex (will be renamed to map)
  mainTex_ST?: THREE.Vector4; // _MainTex_ST
  shadeTexture?: THREE.Texture; // _ShadeTexture
  bumpScale?: number; // _BumpScale
  normalMap?: THREE.Texture; // _BumpMap
  bumpMap?: THREE.Texture; // _BumpMap (will be renamed to normalMap)
  receiveShadowRate?: number; // _ReceiveShadowRate
  receiveShadowTexture?: THREE.Texture; // _ReceiveShadowTexture
  shadingGradeRate?: number; // _ShadingGradeRate
  shadingGradeTexture?: THREE.Texture; // _ShadingGradeTexture
  shadeShift?: number; // _ShadeShift
  shadeToony?: number; // _ShadeToony
  lightColorAttenuation?: number; // _LightColorAttenuation
  indirectLightIntensity?: number; // _IndirectLightIntensity
  rimTexture?: THREE.Texture; // _RimTexture
  rimColor?: THREE.Vector4; // _RimColor
  rimLightingMix?: number; // _RimLightingMix
  rimFresnelPower?: number; // _RimFresnelPower
  rimLift?: number; // _RimLift
  sphereAdd?: THREE.Texture; // _SphereAdd
  emissionColor?: THREE.Vector4; // _EmissionColor
  emissiveMap?: THREE.Texture; // _EmissionMap
  emissionMap?: THREE.Texture; // _EmissionMap (will be renamed to emissiveMap)
  outlineWidthTexture?: THREE.Texture; // _OutlineWidthTexture
  outlineWidth?: number; // _OutlineWidth
  outlineScaledMaxDistance?: number; // _OutlineScaledMaxDistance
  outlineColor?: THREE.Vector4; // _OutlineColor
  outlineLightingMix?: number; // _OutlineLightingMix

  debugMode?: MToonDebugMode | number; // _DebugMode
  blendMode?: MToonRenderMode | number; // _BlendMode
  outlineWidthMode?: MToonOutlineWidthMode | number; // OutlineWidthMode
  outlineColorMode?: MToonOutlineColorMode | number; // OutlineColorMode
  cullMode?: MToonCullMode | number; // _CullMode
  outlineCullMode?: MToonCullMode | number; // _OutlineCullMode
  srcBlend?: number; // _SrcBlend
  dstBlend?: number; // _DstBlend
  zWrite?: number; // _ZWrite (will be renamed to depthWrite)

  isOutline?: boolean;
}

export enum MToonCullMode {
  Off,
  Front,
  Back,
}

export enum MToonDebugMode {
  None,
  Normal,
  LitShadeRate,
  UV,
}

export enum MToonOutlineColorMode {
  FixedColor,
  MixedLighting,
}

export enum MToonOutlineWidthMode {
  None,
  WorldCoordinates,
  ScreenCoordinates,
}

export enum MToonRenderMode {
  Opaque,
  Cutout,
  Transparent,
  TransparentWithZWrite,
}
