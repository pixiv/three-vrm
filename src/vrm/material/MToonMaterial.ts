/* tslint:disable:member-ordering */

import * as THREE from 'three';
import { getTexelDecodingFunction } from './getTexelDecodingFunction';
import vertexShader from './shaders/mtoon.vert';
import fragmentShader from './shaders/mtoon.frag';

const TAU = 2.0 * Math.PI;

export interface MToonParameters extends THREE.ShaderMaterialParameters {
  mToonVersion?: number; // _MToonVersion

  cutoff?: number; // _Cutoff
  color?: THREE.Vector4; // rgb of _Color
  shadeColor?: THREE.Vector4; // _ShadeColor
  map?: THREE.Texture; // _MainTex
  mainTex?: THREE.Texture; // _MainTex (will be renamed to map)
  mainTex_ST?: THREE.Vector4; // _MainTex_ST
  shadeTexture?: THREE.Texture; // _ShadeTexture
  bumpScale?: number; // _BumpScale (will be converted to normalScale)
  normalMap?: THREE.Texture; // _BumpMap
  normalMapType?: THREE.NormalMapTypes; // Three.js specific value
  normalScale?: THREE.Vector2; // _BumpScale in Three.js fashion
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
  uvAnimMaskTexture?: THREE.Texture; // _UvAnimMaskTexture
  uvAnimScrollX?: number; // _UvAnimScrollX
  uvAnimScrollY?: number; // _UvAnimScrollY
  uvAnimRotation?: number; // _uvAnimRotation

  debugMode?: MToonMaterialDebugMode | number; // _DebugMode
  blendMode?: MToonMaterialRenderMode | number; // _BlendMode
  outlineWidthMode?: MToonMaterialOutlineWidthMode | number; // OutlineWidthMode
  outlineColorMode?: MToonMaterialOutlineColorMode | number; // OutlineColorMode
  cullMode?: MToonMaterialCullMode | number; // _CullMode
  outlineCullMode?: MToonMaterialCullMode | number; // _OutlineCullMode
  srcBlend?: number; // _SrcBlend
  dstBlend?: number; // _DstBlend
  zWrite?: number; // _ZWrite (will be renamed to depthWrite)

  isOutline?: boolean;
}

export enum MToonMaterialCullMode {
  Off,
  Front,
  Back,
}

export enum MToonMaterialDebugMode {
  None,
  Normal,
  LitShadeRate,
  UV,
}

export enum MToonMaterialOutlineColorMode {
  FixedColor,
  MixedLighting,
}

export enum MToonMaterialOutlineWidthMode {
  None,
  WorldCoordinates,
  ScreenCoordinates,
}

export enum MToonMaterialRenderMode {
  Opaque,
  Cutout,
  Transparent,
  TransparentWithZWrite,
}

/**
 * MToon is a material specification that has various features.
 * The spec and implementation are originally founded for Unity engine and this is a port of the material.
 *
 * See: https://github.com/Santarh/MToon
 */
export class MToonMaterial extends THREE.ShaderMaterial {
  /**
   * Readonly boolean that indicates this is a [[MToonMaterial]].
   */
  public readonly isMToonMaterial: boolean = true;

  public cutoff = 0.5; // _Cutoff
  public color = new THREE.Vector4(1.0, 1.0, 1.0, 1.0); // _Color
  public shadeColor = new THREE.Vector4(0.97, 0.81, 0.86, 1.0); // _ShadeColor
  public map: THREE.Texture | null = null; // _MainTex
  public mainTex_ST = new THREE.Vector4(0.0, 0.0, 1.0, 1.0); // _MainTex_ST
  public shadeTexture: THREE.Texture | null = null; // _ShadeTexture
  // public shadeTexture_ST = new THREE.Vector4(0.0, 0.0, 1.0, 1.0); // _ShadeTexture_ST (unused)
  public normalMap: THREE.Texture | null = null; // _BumpMap. again, THIS IS _BumpMap
  public normalMapType = THREE.TangentSpaceNormalMap; // Three.js requires this
  public normalScale = new THREE.Vector2(1.0, 1.0); // _BumpScale, in Vector2
  // public bumpMap_ST = new THREE.Vector4(0.0, 0.0, 1.0, 1.0); // _BumpMap_ST (unused)
  public receiveShadowRate = 1.0; // _ReceiveShadowRate
  public receiveShadowTexture: THREE.Texture | null = null; // _ReceiveShadowTexture
  // public receiveShadowTexture_ST = new THREE.Vector4(0.0, 0.0, 1.0, 1.0); // _ReceiveShadowTexture_ST (unused)
  public shadingGradeRate = 1.0; // _ShadingGradeRate
  public shadingGradeTexture: THREE.Texture | null = null; // _ShadingGradeTexture
  // public shadingGradeTexture_ST = new THREE.Vector4(0.0, 0.0, 1.0, 1.0); // _ShadingGradeTexture_ST (unused)
  public shadeShift = 0.0; // _ShadeShift
  public shadeToony = 0.9; // _ShadeToony
  public lightColorAttenuation = 0.0; // _LightColorAttenuation
  public indirectLightIntensity = 0.1; // _IndirectLightIntensity
  public rimTexture: THREE.Texture | null = null; // _RimTexture
  public rimColor = new THREE.Vector4(0.0, 0.0, 0.0, 1.0); // _RimColor
  public rimLightingMix = 0.0; // _RimLightingMix
  public rimFresnelPower = 1.0; // _RimFresnelPower
  public rimLift = 0.0; // _RimLift
  public sphereAdd: THREE.Texture | null = null; // _SphereAdd
  // public sphereAdd_ST = new THREE.Vector4(0.0, 0.0, 1.0, 1.0); // _SphereAdd_ST (unused)
  public emissionColor = new THREE.Vector4(0.0, 0.0, 0.0, 1.0); // _EmissionColor
  public emissiveMap: THREE.Texture | null = null; // _EmissionMap
  // public emissionMap_ST = new THREE.Vector4(0.0, 0.0, 1.0, 1.0); // _EmissionMap_ST (unused)
  public outlineWidthTexture: THREE.Texture | null = null; // _OutlineWidthTexture
  // public outlineWidthTexture_ST = new THREE.Vector4(0.0, 0.0, 1.0, 1.0); // _OutlineWidthTexture_ST (unused)
  public outlineWidth = 0.5; // _OutlineWidth
  public outlineScaledMaxDistance = 1.0; // _OutlineScaledMaxDistance
  public outlineColor = new THREE.Vector4(0.0, 0.0, 0.0, 1.0); // _OutlineColor
  public outlineLightingMix = 1.0; // _OutlineLightingMix
  public uvAnimMaskTexture: THREE.Texture | null = null; // _UvAnimMaskTexture
  public uvAnimScrollX = 0.0; // _UvAnimScrollX
  public uvAnimScrollY = 0.0; // _UvAnimScrollY
  public uvAnimRotation = 0.0; // _uvAnimRotation

  public shouldApplyUniforms = true; // when this is true, applyUniforms effects

  private _debugMode = MToonMaterialDebugMode.None; // _DebugMode
  private _blendMode = MToonMaterialRenderMode.Opaque; // _BlendMode
  private _outlineWidthMode = MToonMaterialOutlineWidthMode.None; // _OutlineWidthMode
  private _outlineColorMode = MToonMaterialOutlineColorMode.FixedColor; // _OutlineColorMode
  private _cullMode = MToonMaterialCullMode.Back; // _CullMode
  private _outlineCullMode = MToonMaterialCullMode.Front; // _OutlineCullMode
  // public srcBlend = 1.0; // _SrcBlend (is not supported)
  // public dstBlend = 0.0; // _DstBlend (is not supported)
  // public zWrite = 1.0; // _ZWrite (will be converted to depthWrite)

  private _isOutline = false;

  private readonly _colorSpaceGamma: boolean;

  private _uvAnimOffsetX = 0.0;
  private _uvAnimOffsetY = 0.0;
  private _uvAnimPhase = 0.0;

  // TODO: ここにcolorSpaceGammaあるのダサい
  constructor(colorSpaceGamma: boolean, parameters?: MToonParameters) {
    super();

    this._colorSpaceGamma = colorSpaceGamma;

    if (parameters === undefined) {
      parameters = {};
    }

    // == these parameter has no compatibility with this implementation ========
    [
      'mToonVersion',
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
        uvAnimMaskTexture: { value: null },
        uvAnimOffsetX: { value: 0.0 },
        uvAnimOffsetY: { value: 0.0 },
        uvAnimTheta: { value: 0.0 },
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

  get bumpMap(): THREE.Texture | null {
    return this.normalMap;
  }

  set bumpMap(t: THREE.Texture | null) {
    this.normalMap = t;
  }

  /**
   * Getting the `bumpScale` reutrns its x component of `normalScale` (assuming x and y component of `normalScale` are same).
   */
  get bumpScale(): number {
    return this.normalScale.x;
  }

  /**
   * Setting the `bumpScale` will be convert the value into Vector2 `normalScale` .
   */
  set bumpScale(t: number) {
    this.normalScale.set(t, t);
  }

  get emissionMap(): THREE.Texture | null {
    return this.emissiveMap;
  }

  set emissionMap(t: THREE.Texture | null) {
    this.emissiveMap = t;
  }

  get blendMode(): MToonMaterialRenderMode {
    return this._blendMode;
  }

  set blendMode(m: MToonMaterialRenderMode) {
    this._blendMode = m;

    this.depthWrite = this._blendMode !== MToonMaterialRenderMode.Transparent;
    this.transparent =
      this._blendMode === MToonMaterialRenderMode.Transparent ||
      this._blendMode === MToonMaterialRenderMode.TransparentWithZWrite;
    this._updateShaderCode();
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

  get outlineColorMode(): MToonMaterialOutlineColorMode {
    return this._outlineColorMode;
  }

  set outlineColorMode(m: MToonMaterialOutlineColorMode) {
    this._outlineColorMode = m;

    this._updateShaderCode();
  }

  get cullMode(): MToonMaterialCullMode {
    return this._cullMode;
  }

  set cullMode(m: MToonMaterialCullMode) {
    this._cullMode = m;

    this._updateCullFace();
  }

  get outlineCullMode(): MToonMaterialCullMode {
    return this._outlineCullMode;
  }

  set outlineCullMode(m: MToonMaterialCullMode) {
    this._outlineCullMode = m;

    this._updateCullFace();
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
    this._updateCullFace();
  }

  /**
   * Update this material.
   * Usually this will be called via [[VRM.update]] so you don't have to call this manually.
   *
   * @param delta deltaTime since last update
   */
  public updateVRMMaterials(delta: number): void {
    this._uvAnimOffsetX = this._uvAnimOffsetX + delta * this.uvAnimScrollX;
    this._uvAnimOffsetY = this._uvAnimOffsetY + delta * this.uvAnimScrollY;
    this._uvAnimPhase = this._uvAnimPhase + delta * this.uvAnimRotation;

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
    this.normalMap = source.normalMap;
    this.normalMapType = source.normalMapType;
    this.normalScale.copy(this.normalScale);
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
    this.uvAnimMaskTexture = source.uvAnimMaskTexture;
    this.uvAnimScrollX = source.uvAnimScrollX;
    this.uvAnimScrollY = source.uvAnimScrollY;
    this.uvAnimRotation = source.uvAnimRotation;

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
   */
  private _applyUniforms(): void {
    this.uniforms.uvAnimOffsetX.value = this._uvAnimOffsetX;
    this.uniforms.uvAnimOffsetY.value = this._uvAnimOffsetY;
    this.uniforms.uvAnimTheta.value = TAU * this._uvAnimPhase;

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
    this.uniforms.normalMap.value = this.normalMap;
    this.uniforms.normalScale.value.copy(this.normalScale);
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
    this.uniforms.uvAnimMaskTexture.value = this.uvAnimMaskTexture;

    this._updateCullFace();
  }

  private _updateShaderCode(): void {
    this.defines = {
      OUTLINE: this._isOutline,
      BLENDMODE_OPAQUE: this._blendMode === MToonMaterialRenderMode.Opaque,
      BLENDMODE_CUTOUT: this._blendMode === MToonMaterialRenderMode.Cutout,
      BLENDMODE_TRANSPARENT:
        this._blendMode === MToonMaterialRenderMode.Transparent ||
        this._blendMode === MToonMaterialRenderMode.TransparentWithZWrite,
      USE_SHADETEXTURE: this.shadeTexture !== null,
      USE_RECEIVESHADOWTEXTURE: this.receiveShadowTexture !== null,
      USE_SHADINGGRADETEXTURE: this.shadingGradeTexture !== null,
      USE_RIMTEXTURE: this.rimTexture !== null,
      USE_SPHEREADD: this.sphereAdd !== null,
      USE_OUTLINEWIDTHTEXTURE: this.outlineWidthTexture !== null,
      USE_UVANIMMASKTEXTURE: this.uvAnimMaskTexture !== null,
      DEBUG_NORMAL: this._debugMode === MToonMaterialDebugMode.Normal,
      DEBUG_LITSHADERATE: this._debugMode === MToonMaterialDebugMode.LitShadeRate,
      DEBUG_UV: this._debugMode === MToonMaterialDebugMode.UV,
      OUTLINE_WIDTH_WORLD: this._outlineWidthMode === MToonMaterialOutlineWidthMode.WorldCoordinates,
      OUTLINE_WIDTH_SCREEN: this._outlineWidthMode === MToonMaterialOutlineWidthMode.ScreenCoordinates,
      OUTLINE_COLOR_FIXED: this._outlineColorMode === MToonMaterialOutlineColorMode.FixedColor,
      OUTLINE_COLOR_MIXED: this._outlineColorMode === MToonMaterialOutlineColorMode.MixedLighting,
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
    this.vertexShader = vertexShader;
    this.fragmentShader = encodings + fragmentShader;

    // == set needsUpdate flag =================================================
    this.needsUpdate = true;
  }

  private _updateCullFace(): void {
    if (!this.isOutline) {
      if (this.cullMode === MToonMaterialCullMode.Off) {
        this.side = THREE.DoubleSide;
      } else if (this.cullMode === MToonMaterialCullMode.Front) {
        this.side = THREE.BackSide;
      } else if (this.cullMode === MToonMaterialCullMode.Back) {
        this.side = THREE.FrontSide;
      }
    } else {
      if (this.outlineCullMode === MToonMaterialCullMode.Off) {
        this.side = THREE.DoubleSide;
      } else if (this.outlineCullMode === MToonMaterialCullMode.Front) {
        this.side = THREE.BackSide;
      } else if (this.outlineCullMode === MToonMaterialCullMode.Back) {
        this.side = THREE.FrontSide;
      }
    }
  }
}
