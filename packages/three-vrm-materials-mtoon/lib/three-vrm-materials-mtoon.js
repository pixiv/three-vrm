/*!
 * @pixiv/three-vrm-materials-mtoon v1.0.0-beta.7
 * MToon (toon material) module for @pixiv/three-vrm
 *
 * Copyright (c) 2020-2021 pixiv Inc.
 * @pixiv/three-vrm-materials-mtoon is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three')) :
    typeof define === 'function' && define.amd ? define(['exports', 'three'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.THREE_VRM_MATERIALS_MTOON = {}, global.THREE));
}(this, (function (exports, THREE) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }

    var THREE__namespace = /*#__PURE__*/_interopNamespace(THREE);

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    const getEncodingComponents = (encoding) => {
        switch (encoding) {
            case THREE__namespace.LinearEncoding:
                return ['Linear', '( value )'];
            case THREE__namespace.sRGBEncoding:
                return ['sRGB', '( value )'];
            case THREE__namespace.RGBEEncoding:
                return ['RGBE', '( value )'];
            case THREE__namespace.RGBM7Encoding:
                return ['RGBM', '( value, 7.0 )'];
            case THREE__namespace.RGBM16Encoding:
                return ['RGBM', '( value, 16.0 )'];
            case THREE__namespace.RGBDEncoding:
                return ['RGBD', '( value, 256.0 )'];
            case THREE__namespace.GammaEncoding:
                return ['Gamma', '( value, float( GAMMA_FACTOR ) )'];
            case THREE__namespace.LogLuvEncoding:
                return ['LogLuv', '( value )'];
            default:
                throw new Error('unsupported encoding: ' + encoding);
        }
    };

    const getTexelDecodingFunction = (functionName, encoding) => {
        const components = getEncodingComponents(encoding);
        return 'vec4 ' + functionName + '( vec4 value ) { return ' + components[0] + 'ToLinear' + components[1] + '; }';
    };

    var vertexShader = "// #define PHONG\n\nvarying vec3 vViewPosition;\n\n#ifndef FLAT_SHADED\n  varying vec3 vNormal;\n#endif\n\n#include <common>\n\n// #include <uv_pars_vertex>\n#ifdef MTOON_USE_UV\n  varying vec2 vUv;\n  uniform mat3 uvTransform;\n#endif\n\n#include <uv2_pars_vertex>\n// #include <displacementmap_pars_vertex>\n// #include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\n#ifdef USE_OUTLINEWIDTHMULTIPLYTEXTURE\n  uniform sampler2D outlineWidthMultiplyTexture;\n  uniform mat3 outlineWidthMultiplyTextureUvTransform;\n#endif\n\nuniform float outlineWidthFactor;\n\nvoid main() {\n\n  // #include <uv_vertex>\n  #ifdef MTOON_USE_UV\n    vUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n  #endif\n\n  #include <uv2_vertex>\n  #include <color_vertex>\n\n  #include <beginnormal_vertex>\n  #include <morphnormal_vertex>\n  #include <skinbase_vertex>\n  #include <skinnormal_vertex>\n\n  // we need this to compute the outline properly\n  objectNormal = normalize( objectNormal );\n\n  #include <defaultnormal_vertex>\n\n  #ifndef FLAT_SHADED // Normal computed with derivatives when FLAT_SHADED\n    vNormal = normalize( transformedNormal );\n  #endif\n\n  #include <begin_vertex>\n\n  #include <morphtarget_vertex>\n  #include <skinning_vertex>\n  // #include <displacementmap_vertex>\n  #include <project_vertex>\n  #include <logdepthbuf_vertex>\n  #include <clipping_planes_vertex>\n\n  vViewPosition = - mvPosition.xyz;\n\n  float outlineTex = 1.0;\n\n  #ifdef OUTLINE\n    #ifdef USE_OUTLINEWIDTHMULTIPLYTEXTURE\n      vec2 outlineWidthMultiplyTextureUv = ( outlineWidthMultiplyTextureUvTransform * vec3( vUv, 1 ) ).xy;\n      outlineTex = texture2D( outlineWidthMultiplyTexture, outlineWidthMultiplyTextureUv ).g;\n    #endif\n\n    #ifdef OUTLINE_WIDTH_WORLD\n      float worldNormalLength = length( transformedNormal );\n      vec3 outlineOffset = outlineWidthFactor * outlineTex * worldNormalLength * objectNormal;\n      gl_Position = projectionMatrix * modelViewMatrix * vec4( outlineOffset + transformed, 1.0 );\n    #endif\n\n    #ifdef OUTLINE_WIDTH_SCREEN\n      vec3 clipNormal = ( projectionMatrix * modelViewMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n      vec2 projectedNormal = normalize( clipNormal.xy );\n      projectedNormal.x *= projectionMatrix[ 0 ].x / projectionMatrix[ 1 ].y;\n      gl_Position.xy += 2.0 * outlineWidthFactor * outlineTex * projectedNormal.xy;\n    #endif\n\n    gl_Position.z += 1E-6 * gl_Position.w; // anti-artifact magic\n  #endif\n\n  #include <worldpos_vertex>\n  // #include <envmap_vertex>\n  #include <shadowmap_vertex>\n  #include <fog_vertex>\n\n}";

    var fragmentShader = "// #define PHONG\n\nuniform vec3 litFactor;\n\nuniform float opacity;\n\nuniform vec3 shadeColorFactor;\n#ifdef USE_SHADEMULTIPLYTEXTURE\n  uniform sampler2D shadeMultiplyTexture;\n#endif\n\nuniform float shadingShiftFactor;\nuniform float shadingToonyFactor;\n\n#ifdef USE_SHADINGSHIFTTEXTURE\n  uniform sampler2D shadingShiftTexture;\n  uniform mat3 shadingShiftTextureUvTransform;\n  uniform float shadingShiftTextureScale;\n#endif\n\nuniform float giEqualizationFactor;\n\nuniform vec3 parametricRimColorFactor;\n#ifdef USE_RIMMULTIPLYTEXTURE\n  uniform sampler2D rimMultiplyTexture;\n  uniform mat3 rimMultiplyTextureUvTransform;\n#endif\nuniform float rimLightingMixFactor;\nuniform float parametricRimFresnelPowerFactor;\nuniform float parametricRimLiftFactor;\n\n#ifdef USE_MATCAPTEXTURE\n  uniform vec3 matcapFactor;\n  uniform sampler2D matcapTexture;\n  uniform mat3 matcapTextureUvTransform;\n#endif\n\nuniform vec3 emissive;\n\nuniform vec3 outlineColorFactor;\nuniform float outlineLightingMixFactor;\n\n#ifdef USE_UVANIMATIONMASKTEXTURE\n  uniform sampler2D uvAnimationMaskTexture;\n  uniform mat3 uvAnimationMaskTextureUvTransform;\n#endif\n\nuniform float uvAnimationScrollXOffset;\nuniform float uvAnimationScrollYOffset;\nuniform float uvAnimationRotationPhase;\n\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n\n// #include <uv_pars_fragment>\n#if ( defined( MTOON_USE_UV ) && !defined( MTOON_UVS_VERTEX_ONLY ) )\n  varying vec2 vUv;\n#endif\n\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n\n#ifdef USE_MAP\n  uniform mat3 mapUvTransform;\n#endif\n\n// #include <alphamap_pars_fragment>\n\n#if THREE_VRM_THREE_REVISION >= 132\n  #include <alphatest_pars_fragment>\n#endif\n\n#include <aomap_pars_fragment>\n// #include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n\n#ifdef USE_EMISSIVEMAP\n  uniform mat3 emissiveMapUvTransform;\n#endif\n\n// #include <envmap_common_pars_fragment>\n// #include <envmap_pars_fragment>\n// #include <cube_uv_reflection_fragment>\n#include <fog_pars_fragment>\n\n// #include <bsdfs>\nvec3 BRDF_Lambert( const in vec3 diffuseColor ) {\n  return RECIPROCAL_PI * diffuseColor;\n}\n\n#include <lights_pars_begin>\n\n#if THREE_VRM_THREE_REVISION >= 132\n  #include <normal_pars_fragment>\n#endif\n\n// #include <lights_phong_pars_fragment>\nvarying vec3 vViewPosition;\n\n#if THREE_VRM_THREE_REVISION < 132\n  #ifndef FLAT_SHADED\n    varying vec3 vNormal;\n  #endif\n#endif\n\nstruct MToonMaterial {\n  vec3 diffuseColor;\n  vec3 shadeColor;\n  float shadingShift;\n};\n\nfloat linearstep( float a, float b, float t ) {\n  return clamp( ( t - a ) / ( b - a ), 0.0, 1.0 );\n}\n\n/**\n * Convert NdotL into toon shading factor using shadingShift and shadingToony\n */\nfloat getShading(\n  const in float dotNL,\n  const in float shadow,\n  const in float shadingShift\n) {\n  float shading = dotNL;\n  shading = shading + shadingShift;\n  shading = linearstep( -1.0 + shadingToonyFactor, 1.0 - shadingToonyFactor, shading );\n  shading *= shadow;\n  return shading;\n}\n\n/**\n * Mix diffuseColor and shadeColor using shading factor and light color\n */\nvec3 getDiffuse(\n  const in MToonMaterial material,\n  const in float shading,\n  in vec3 lightColor\n) {\n  #ifdef DEBUG_LITSHADERATE\n    return vec3( BRDF_Lambert( shading * lightColor ) );\n  #endif\n\n  #if THREE_VRM_THREE_REVISION < 132\n    #ifndef PHYSICALLY_CORRECT_LIGHTS\n      lightColor *= PI;\n    #endif\n  #endif\n\n  vec3 col = lightColor * BRDF_Lambert( mix( material.shadeColor, material.diffuseColor, shading ) );\n\n  // The \"comment out if you want to PBR absolutely\" line\n  #ifdef V0_COMPAT_SHADE\n    col = min( col, material.diffuseColor );\n  #endif\n\n  return col;\n}\n\nvoid RE_Direct_MToon( const in IncidentLight directLight, const in GeometricContext geometry, const in MToonMaterial material, const in float shadow, inout ReflectedLight reflectedLight ) {\n  float dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n  vec3 irradiance = directLight.color;\n\n  #if THREE_VRM_THREE_REVISION < 132\n    #ifndef PHYSICALLY_CORRECT_LIGHTS\n      irradiance *= PI;\n    #endif\n  #endif\n\n  // directSpecular will be used for rim lighting, not an actual specular\n  reflectedLight.directSpecular += irradiance;\n\n  irradiance *= dotNL;\n\n  float shading = getShading( dotNL, shadow, material.shadingShift );\n\n  // toon shaded diffuse\n  reflectedLight.directDiffuse += getDiffuse( material, shading, directLight.color );\n}\n\nvoid RE_IndirectDiffuse_MToon( const in vec3 irradiance, const in GeometricContext geometry, const in MToonMaterial material, inout ReflectedLight reflectedLight ) {\n  // indirect diffuse will use diffuseColor, no shadeColor involved\n  reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n\n  // directSpecular will be used for rim lighting, not an actual specular\n  reflectedLight.directSpecular += irradiance;\n}\n\n#define RE_Direct RE_Direct_MToon\n#define RE_IndirectDiffuse RE_IndirectDiffuse_MToon\n#define Material_LightProbeLOD( material ) (0)\n\n#include <shadowmap_pars_fragment>\n// #include <bumpmap_pars_fragment>\n\n// #include <normalmap_pars_fragment>\n#ifdef USE_NORMALMAP\n\n  uniform sampler2D normalMap;\n  uniform mat3 normalMapUvTransform;\n  uniform vec2 normalScale;\n\n#endif\n\n#ifdef OBJECTSPACE_NORMALMAP\n\n  uniform mat3 normalMatrix;\n\n#endif\n\n#if ! defined ( USE_TANGENT ) && defined ( TANGENTSPACE_NORMALMAP )\n\n  // Per-Pixel Tangent Space Normal Mapping\n  // http://hacksoflife.blogspot.ch/2009/11/per-pixel-tangent-space-normal-mapping.html\n\n  // three-vrm specific change: it requires `uv` as an input in order to support uv scrolls\n\n  // Temporary compat against shader change @ Three.js r126\n  // See: #21205, #21307, #21299\n  #if THREE_VRM_THREE_REVISION >= 126\n\n    vec3 perturbNormal2Arb( vec2 uv, vec3 eye_pos, vec3 surf_norm, vec3 mapN, float faceDirection ) {\n\n      vec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );\n      vec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );\n      vec2 st0 = dFdx( uv.st );\n      vec2 st1 = dFdy( uv.st );\n\n      vec3 N = normalize( surf_norm );\n\n      vec3 q1perp = cross( q1, N );\n      vec3 q0perp = cross( N, q0 );\n\n      vec3 T = q1perp * st0.x + q0perp * st1.x;\n      vec3 B = q1perp * st0.y + q0perp * st1.y;\n\n      // three-vrm specific change: Workaround for the issue that happens when delta of uv = 0.0\n      // TODO: Is this still required? Or shall I make a PR about it?\n      if ( length( T ) == 0.0 || length( B ) == 0.0 ) {\n        return surf_norm;\n      }\n\n      float det = max( dot( T, T ), dot( B, B ) );\n      float scale = ( det == 0.0 ) ? 0.0 : faceDirection * inversesqrt( det );\n\n      return normalize( T * ( mapN.x * scale ) + B * ( mapN.y * scale ) + N * mapN.z );\n\n    }\n\n  #else\n\n    vec3 perturbNormal2Arb( vec2 uv, vec3 eye_pos, vec3 surf_norm, vec3 mapN ) {\n\n      // Workaround for Adreno 3XX dFd*( vec3 ) bug. See #9988\n\n      vec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );\n      vec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );\n      vec2 st0 = dFdx( uv.st );\n      vec2 st1 = dFdy( uv.st );\n\n      float scale = sign( st1.t * st0.s - st0.t * st1.s ); // we do not care about the magnitude\n\n      vec3 S = ( q0 * st1.t - q1 * st0.t ) * scale;\n      vec3 T = ( - q0 * st1.s + q1 * st0.s ) * scale;\n\n      // three-vrm specific change: Workaround for the issue that happens when delta of uv = 0.0\n      // TODO: Is this still required? Or shall I make a PR about it?\n\n      if ( length( S ) == 0.0 || length( T ) == 0.0 ) {\n        return surf_norm;\n      }\n\n      S = normalize( S );\n      T = normalize( T );\n      vec3 N = normalize( surf_norm );\n\n      #ifdef DOUBLE_SIDED\n\n        // Workaround for Adreno GPUs gl_FrontFacing bug. See #15850 and #10331\n\n        bool frontFacing = dot( cross( S, T ), N ) > 0.0;\n\n        mapN.xy *= ( float( frontFacing ) * 2.0 - 1.0 );\n\n      #else\n\n        mapN.xy *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\n      #endif\n\n      mat3 tsn = mat3( S, T, N );\n      return normalize( tsn * mapN );\n\n    }\n\n  #endif\n\n#endif\n\n// #include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\n// == post correction ==========================================================\nvoid postCorrection() {\n  #include <tonemapping_fragment>\n  #include <encodings_fragment>\n  #include <fog_fragment>\n  #include <premultiplied_alpha_fragment>\n  #include <dithering_fragment>\n}\n\n// == main procedure ===========================================================\nvoid main() {\n  #include <clipping_planes_fragment>\n\n  vec2 uv = vec2(0.5, 0.5);\n\n  #if ( defined( MTOON_USE_UV ) && !defined( MTOON_UVS_VERTEX_ONLY ) )\n    uv = vUv;\n\n    float uvAnimMask = 1.0;\n    #ifdef USE_UVANIMATIONMASKTEXTURE\n      vec2 uvAnimationMaskTextureUv = ( uvAnimationMaskTextureUvTransform * vec3( uv, 1 ) ).xy;\n      uvAnimMask = texture2D( uvAnimationMaskTexture, uvAnimationMaskTextureUv ).b;\n    #endif\n\n    uv = uv + vec2( uvAnimationScrollXOffset, uvAnimationScrollYOffset ) * uvAnimMask;\n    float uvRotCos = cos( uvAnimationRotationPhase * uvAnimMask );\n    float uvRotSin = sin( uvAnimationRotationPhase * uvAnimMask );\n    uv = mat2( uvRotCos, uvRotSin, -uvRotSin, uvRotCos ) * ( uv - 0.5 ) + 0.5;\n  #endif\n\n  #ifdef DEBUG_UV\n    gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );\n    #if ( defined( MTOON_USE_UV ) && !defined( MTOON_UVS_VERTEX_ONLY ) )\n      gl_FragColor = vec4( uv, 0.0, 1.0 );\n    #endif\n    return;\n  #endif\n\n  vec4 diffuseColor = vec4( litFactor, opacity );\n  ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n  vec3 totalEmissiveRadiance = emissive;\n\n  #include <logdepthbuf_fragment>\n\n  // #include <map_fragment>\n  #ifdef USE_MAP\n    vec2 mapUv = ( mapUvTransform * vec3( uv, 1 ) ).xy;\n    vec4 texelColor = texture2D( map, mapUv );\n    texelColor = mapTexelToLinear( texelColor );\n    diffuseColor *= texelColor;\n  #endif\n\n  // #include <color_fragment>\n  #if ( defined( USE_COLOR ) && !defined( IGNORE_VERTEX_COLOR ) )\n    diffuseColor.rgb *= vColor;\n  #endif\n\n  // #include <alphamap_fragment>\n\n  #include <alphatest_fragment>\n\n  // #include <specularmap_fragment>\n  #include <normal_fragment_begin>\n\n  #ifdef OUTLINE\n    normal *= -1.0;\n  #endif\n\n  // #include <normal_fragment_maps>\n\n  #ifdef OBJECTSPACE_NORMALMAP\n\n    vec2 normalMapUv = ( normalMapUvTransform * vec3( uv, 1 ) ).xy;\n    normal = texture2D( normalMap, normalMapUv ).xyz * 2.0 - 1.0; // overrides both flatShading and attribute normals\n\n    #ifdef FLIP_SIDED\n\n      normal = - normal;\n\n    #endif\n\n    #ifdef DOUBLE_SIDED\n\n      // Temporary compat against shader change @ Three.js r126\n      // See: #21205, #21307, #21299\n      #if THREE_VRM_THREE_REVISION >= 126\n\n        normal = normal * faceDirection;\n\n      #else\n\n        normal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\n      #endif\n\n    #endif\n\n    normal = normalize( normalMatrix * normal );\n\n  #elif defined( TANGENTSPACE_NORMALMAP )\n\n    vec2 normalMapUv = ( normalMapUvTransform * vec3( uv, 1 ) ).xy;\n    vec3 mapN = texture2D( normalMap, normalMapUv ).xyz * 2.0 - 1.0;\n    mapN.xy *= normalScale;\n\n    #ifdef USE_TANGENT\n\n      normal = normalize( vTBN * mapN );\n\n    #else\n\n      // Temporary compat against shader change @ Three.js r126\n      // See: #21205, #21307, #21299\n      #if THREE_VRM_THREE_REVISION >= 126\n\n        normal = perturbNormal2Arb( uv, -vViewPosition, normal, mapN, faceDirection );\n\n      #else\n\n        normal = perturbNormal2Arb( uv, -vViewPosition, normal, mapN );\n\n      #endif\n\n    #endif\n\n  #endif\n\n  // #include <emissivemap_fragment>\n  #ifdef USE_EMISSIVEMAP\n    vec2 emissiveMapUv = ( emissiveMapUvTransform * vec3( uv, 1 ) ).xy;\n    totalEmissiveRadiance *= emissiveMapTexelToLinear( texture2D( emissiveMap, emissiveMapUv ) ).rgb;\n  #endif\n\n  #ifdef DEBUG_NORMAL\n    gl_FragColor = vec4( 0.5 + 0.5 * normal, 1.0 );\n    return;\n  #endif\n\n  // -- MToon: lighting --------------------------------------------------------\n  // accumulation\n  // #include <lights_phong_fragment>\n  MToonMaterial material;\n\n  material.diffuseColor = diffuseColor.rgb;\n\n  material.shadeColor = shadeColorFactor;\n  #ifdef USE_SHADEMULTIPLYTEXTURE\n    material.shadeColor *= shadeMultiplyTextureTexelToLinear( texture2D( shadeMultiplyTexture, uv ) ).rgb;\n  #endif\n\n  #if ( defined( USE_COLOR ) && !defined( IGNORE_VERTEX_COLOR ) )\n    material.shadeColor.rgb *= vColor;\n  #endif\n\n  material.shadingShift = shadingShiftFactor;\n  #ifdef USE_SHADINGSHIFTTEXTURE\n    vec2 shadingShiftTextureUv = ( shadingShiftTextureUvTransform * vec3( uv, 1 ) ).xy;\n    material.shadingShift += texture2D( shadingShiftTexture, shadingShiftTextureUv ).r * shadingShiftTextureScale;\n  #endif\n\n  // #include <lights_fragment_begin>\n\n  // MToon Specific changes:\n  // Since we want to take shadows into account of shading instead of irradiance,\n  // we had to modify the codes that multiplies the results of shadowmap into color of direct lights.\n\n  GeometricContext geometry;\n\n  geometry.position = - vViewPosition;\n  geometry.normal = normal;\n  geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );\n\n  #ifdef CLEARCOAT\n\n    geometry.clearcoatNormal = clearcoatNormal;\n\n  #endif\n\n  IncidentLight directLight;\n\n  // since these variables will be used in unrolled loop, we have to define in prior\n  float shadow;\n\n  #if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\n    PointLight pointLight;\n    #if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0\n    PointLightShadow pointLightShadow;\n    #endif\n\n    #pragma unroll_loop_start\n    for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\n      pointLight = pointLights[ i ];\n\n      #if THREE_VRM_THREE_REVISION >= 132\n        getPointLightInfo( pointLight, geometry, directLight );\n      #else\n        getPointDirectLightIrradiance( pointLight, geometry, directLight );\n      #endif\n\n      shadow = 1.0;\n      #if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )\n      pointLightShadow = pointLightShadows[ i ];\n      shadow = all( bvec2( directLight.visible, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;\n      #endif\n\n      RE_Direct( directLight, geometry, material, shadow, reflectedLight );\n\n    }\n    #pragma unroll_loop_end\n\n  #endif\n\n  #if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\n    SpotLight spotLight;\n    #if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0\n    SpotLightShadow spotLightShadow;\n    #endif\n\n    #pragma unroll_loop_start\n    for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\n      spotLight = spotLights[ i ];\n\n      #if THREE_VRM_THREE_REVISION >= 132\n        getSpotLightInfo( spotLight, geometry, directLight );\n      #else\n        getSpotDirectLightIrradiance( spotLight, geometry, directLight );\n      #endif\n\n      shadow = 1.0;\n      #if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n      spotLightShadow = spotLightShadows[ i ];\n      shadow = all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n      #endif\n\n      RE_Direct( directLight, geometry, material, shadow, reflectedLight );\n\n    }\n    #pragma unroll_loop_end\n\n  #endif\n\n  #if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\n    DirectionalLight directionalLight;\n    #if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0\n    DirectionalLightShadow directionalLightShadow;\n    #endif\n\n    #pragma unroll_loop_start\n    for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\n      directionalLight = directionalLights[ i ];\n\n      #if THREE_VRM_THREE_REVISION >= 132\n        getDirectionalLightInfo( directionalLight, geometry, directLight );\n      #else\n        getDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );\n      #endif\n\n      shadow = 1.0;\n      #if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )\n      directionalLightShadow = directionalLightShadows[ i ];\n      shadow = all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n      #endif\n\n      RE_Direct( directLight, geometry, material, shadow, reflectedLight );\n\n    }\n    #pragma unroll_loop_end\n\n  #endif\n\n  // #if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n\n  //   RectAreaLight rectAreaLight;\n\n  //   #pragma unroll_loop_start\n  //   for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\n  //     rectAreaLight = rectAreaLights[ i ];\n  //     RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );\n\n  //   }\n  //   #pragma unroll_loop_end\n\n  // #endif\n\n  #if defined( RE_IndirectDiffuse )\n\n    vec3 iblIrradiance = vec3( 0.0 );\n\n    vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\n    #if THREE_VRM_THREE_REVISION >= 133\n      irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );\n    #else\n      irradiance += getLightProbeIrradiance( lightProbe, geometry );\n    #endif\n\n    #if ( NUM_HEMI_LIGHTS > 0 )\n\n      #pragma unroll_loop_start\n      for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\n        irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\n      }\n      #pragma unroll_loop_end\n\n    #endif\n\n  #endif\n\n  // #if defined( RE_IndirectSpecular )\n\n  //   vec3 radiance = vec3( 0.0 );\n  //   vec3 clearcoatRadiance = vec3( 0.0 );\n\n  // #endif\n\n  #include <lights_fragment_maps>\n  #include <lights_fragment_end>\n\n  // modulation\n  #include <aomap_fragment>\n\n  vec3 col = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;\n\n  #if defined( OUTLINE )\n    gl_FragColor = vec4(\n      outlineColorFactor.rgb * mix( vec3( 1.0 ), col, outlineLightingMixFactor ),\n      diffuseColor.a\n    );\n    postCorrection();\n    return;\n  #endif\n\n  #ifdef DEBUG_LITSHADERATE\n    gl_FragColor = vec4( col, diffuseColor.a );\n    postCorrection();\n    return;\n  #endif\n\n  // -- MToon: rim lighting -----------------------------------------\n  vec3 viewDir = normalize( vViewPosition );\n\n  #ifndef PHYSICALLY_CORRECT_LIGHTS\n    reflectedLight.directSpecular /= PI;\n  #endif\n  vec3 rimMix = mix( vec3( 1.0 ), reflectedLight.directSpecular, 1.0 );\n\n  vec3 rim = parametricRimColorFactor * pow( saturate( 1.0 - dot( viewDir, normal ) + parametricRimLiftFactor ), parametricRimFresnelPowerFactor );\n\n  #ifdef USE_MATCAPTEXTURE\n    {\n      vec3 x = normalize( vec3( viewDir.z, 0.0, -viewDir.x ) );\n      vec3 y = cross( viewDir, x ); // guaranteed to be normalized\n      vec2 sphereUv = 0.5 + 0.5 * vec2( dot( x, normal ), -dot( y, normal ) );\n      sphereUv = ( matcapTextureUvTransform * vec3( sphereUv, 1 ) ).xy;\n      vec3 matcap = matcapTextureTexelToLinear( texture2D( matcapTexture, sphereUv ) ).rgb;\n      rim += matcapFactor * matcap;\n    }\n  #endif\n\n  #ifdef USE_RIMMULTIPLYTEXTURE\n    vec2 rimMultiplyTextureUv = ( rimMultiplyTextureUvTransform * vec3( uv, 1 ) ).xy;\n    rim *= rimMultiplyTextureTexelToLinear( texture2D( rimMultiplyTexture, rimMultiplyTextureUv ) ).rgb;\n  #endif\n\n  col += rimMix * rim;\n\n  // -- MToon: Emission --------------------------------------------------------\n  col += totalEmissiveRadiance;\n\n  // #include <envmap_fragment>\n\n  // -- Almost done! -----------------------------------------------------------\n  gl_FragColor = vec4( col, diffuseColor.a );\n  postCorrection();\n}";

    /* eslint-disable @typescript-eslint/naming-convention */
    /**
     * Specifiers of debug mode of {@link MToonMaterial}.
     *
     * See: {@link MToonMaterial.debugMode}
     */
    const MToonMaterialDebugMode = {
        /**
         * Render normally.
         */
        None: 'none',
        /**
         * Visualize normals of the surface.
         */
        Normal: 'normal',
        /**
         * Visualize lit/shade of the surface.
         */
        LitShadeRate: 'litShadeRate',
        /**
         * Visualize UV of the surface.
         */
        UV: 'uv',
    };

    /* eslint-disable @typescript-eslint/naming-convention */
    const MToonMaterialOutlineWidthMode = {
        None: 'none',
        WorldCoordinates: 'worldCoordinates',
        ScreenCoordinates: 'screenCoordinates',
    };

    /**
     * Retrieved from https://github.com/mrdoob/three.js/blob/88b6328998d155fa0a7c1f1e5e3bd6bff75268c0/src/renderers/webgl/WebGLPrograms.js#L92
     *
     * Diff:
     *   - Remove WebGLRenderTarget handler because it increases code complexities on TypeScript
     *   - Add a boolean `isWebGL2` as a second argument.
     */
    function getTextureEncodingFromMap(map, isWebGL2) {
        let encoding;
        if (map && map.isTexture) {
            encoding = map.encoding;
            // } else if ( map && map.isWebGLRenderTarget ) {
            //   console.warn( 'THREE.WebGLPrograms.getTextureEncodingFromMap: don\'t use render targets as textures. Use their .texture property instead.' );
            //   encoding = map.texture.encoding;
        }
        else {
            encoding = THREE__namespace.LinearEncoding;
        }
        if (parseInt(THREE__namespace.REVISION, 10) >= 133) {
            if (isWebGL2 &&
                map &&
                map.isTexture &&
                map.format === THREE__namespace.RGBAFormat &&
                map.type === THREE__namespace.UnsignedByteType &&
                map.encoding === THREE__namespace.sRGBEncoding) {
                encoding = THREE__namespace.LinearEncoding; // disable inline decode for sRGB textures in WebGL 2
            }
        }
        return encoding;
    }

    /* tslint:disable:member-ordering */
    /**
     * MToon is a material specification that has various features.
     * The spec and implementation are originally founded for Unity engine and this is a port of the material.
     *
     * See: https://github.com/Santarh/MToon
     */
    class MToonMaterial extends THREE__namespace.ShaderMaterial {
        constructor(parameters = {}) {
            super({ vertexShader, fragmentShader });
            this.uvAnimationScrollXSpeedFactor = 0.0;
            this.uvAnimationScrollYSpeedFactor = 0.0;
            this.uvAnimationRotationSpeedFactor = 0.0;
            /**
             * Will be read in WebGLPrograms
             *
             * See: https://github.com/mrdoob/three.js/blob/4f5236ac3d6f41d904aa58401b40554e8fbdcb15/src/renderers/webgl/WebGLPrograms.js#L190-L191
             */
            this.normalMapType = THREE__namespace.TangentSpaceNormalMap;
            /**
             * When this is `true`, vertex colors will be ignored.
             * `true` by default.
             */
            this._ignoreVertexColor = true;
            this._v0CompatShade = false;
            this._debugMode = MToonMaterialDebugMode.None;
            this._outlineWidthMode = MToonMaterialOutlineWidthMode.None;
            this._isOutline = false;
            // override depthWrite with transparentWithZWrite
            if (parameters.transparentWithZWrite) {
                parameters.depthWrite = true;
            }
            delete parameters.transparentWithZWrite;
            // == enabling bunch of stuff ==================================================================
            parameters.fog = true;
            parameters.lights = true;
            parameters.clipping = true;
            // COMPAT
            // See: https://github.com/mrdoob/three.js/pull/21788
            if (parseInt(THREE__namespace.REVISION, 10) < 129) {
                parameters.skinning = parameters.skinning || false;
            }
            // COMPAT
            // See: https://github.com/mrdoob/three.js/pull/22169
            if (parseInt(THREE__namespace.REVISION, 10) < 131) {
                parameters.morphTargets = parameters.morphTargets || false;
                parameters.morphNormals = parameters.morphNormals || false;
            }
            // == uniforms =================================================================================
            this.uniforms = THREE__namespace.UniformsUtils.merge([
                THREE__namespace.UniformsLib.common,
                THREE__namespace.UniformsLib.normalmap,
                THREE__namespace.UniformsLib.emissivemap,
                THREE__namespace.UniformsLib.fog,
                THREE__namespace.UniformsLib.lights,
                {
                    litFactor: { value: new THREE__namespace.Color(1.0, 1.0, 1.0) },
                    mapUvTransform: { value: new THREE__namespace.Matrix3() },
                    colorAlpha: { value: 1.0 },
                    normalMapUvTransform: { value: new THREE__namespace.Matrix3() },
                    shadeColorFactor: { value: new THREE__namespace.Color(0.97, 0.81, 0.86) },
                    shadeMultiplyTexture: { value: null },
                    shadeMultiplyTextureUvTransform: { value: new THREE__namespace.Matrix3() },
                    shadingShiftFactor: { value: 0.0 },
                    shadingShiftTexture: { value: null },
                    shadingShiftTextureUvTransform: { value: new THREE__namespace.Matrix3() },
                    shadingShiftTextureScale: { value: null },
                    shadingToonyFactor: { value: 0.9 },
                    giEqualizationFactor: { value: 0.9 },
                    matcapFactor: { value: new THREE__namespace.Color(1.0, 1.0, 1.0) },
                    matcapTexture: { value: null },
                    matcapTextureUvTransform: { value: new THREE__namespace.Matrix3() },
                    parametricRimColorFactor: { value: new THREE__namespace.Color(0.0, 0.0, 0.0) },
                    rimMultiplyTexture: { value: null },
                    rimMultiplyTextureUvTransform: { value: new THREE__namespace.Matrix3() },
                    rimLightingMixFactor: { value: 0.0 },
                    parametricRimFresnelPowerFactor: { value: 1.0 },
                    parametricRimLiftFactor: { value: 0.0 },
                    emissive: { value: new THREE__namespace.Color(0.0, 0.0, 0.0) },
                    emissiveMapUvTransform: { value: new THREE__namespace.Matrix3() },
                    outlineWidthMultiplyTexture: { value: null },
                    outlineWidthMultiplyTextureUvTransform: { value: new THREE__namespace.Matrix3() },
                    outlineWidthFactor: { value: 0.5 },
                    outlineColorFactor: { value: new THREE__namespace.Color(0.0, 0.0, 0.0) },
                    outlineLightingMixFactor: { value: 1.0 },
                    uvAnimationMaskTexture: { value: null },
                    uvAnimationMaskTextureUvTransform: { value: new THREE__namespace.Matrix3() },
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
            this.customProgramCacheKey = () => [
                this._ignoreVertexColor ? 'ignoreVertexColor' : '',
                this._v0CompatShade ? 'v0CompatShade' : '',
                this._debugMode !== 'none' ? `debugMode:${this._debugMode}` : '',
                this._outlineWidthMode !== 'none' ? `outlineWidthMode:${this._outlineWidthMode}` : '',
                this._isOutline ? 'isOutline' : '',
                ...Object.entries(this._generateDefines()).map(([token, macro]) => `${token}:${macro}`),
                this.matcapTexture ? `matcapTextureEncoding:${this.matcapTexture.encoding}` : '',
                this.shadeMultiplyTexture ? `shadeMultiplyTextureEncoding:${this.shadeMultiplyTexture.encoding}` : '',
                this.rimMultiplyTexture ? `rimMultiplyTextureEncoding:${this.rimMultiplyTexture.encoding}` : '',
            ].join(',');
            this.onBeforeCompile = (shader, renderer) => {
                /**
                 * Will be needed to determine whether we should inline convert sRGB textures or not.
                 * See: https://github.com/mrdoob/three.js/pull/22551
                 */
                const isWebGL2 = renderer.capabilities.isWebGL2;
                const threeRevision = parseInt(THREE__namespace.REVISION, 10);
                const defines = Object.entries(Object.assign(Object.assign({}, this._generateDefines()), this.defines))
                    .filter(([token, macro]) => !!macro)
                    .map(([token, macro]) => `#define ${token} ${macro}`)
                    .join('\n') + '\n';
                // -- texture encodings ----------------------------------------------------------------------
                const encodings = (this.matcapTexture !== null
                    ? getTexelDecodingFunction('matcapTextureTexelToLinear', getTextureEncodingFromMap(this.matcapTexture, isWebGL2)) + '\n'
                    : '') +
                    (this.shadeMultiplyTexture !== null
                        ? getTexelDecodingFunction('shadeMultiplyTextureTexelToLinear', getTextureEncodingFromMap(this.shadeMultiplyTexture, isWebGL2)) + '\n'
                        : '') +
                    (this.rimMultiplyTexture !== null
                        ? getTexelDecodingFunction('rimMultiplyTextureTexelToLinear', getTextureEncodingFromMap(this.rimMultiplyTexture, isWebGL2)) + '\n'
                        : '');
                // -- generate shader code -------------------------------------------------------------------
                shader.vertexShader = defines + shader.vertexShader;
                shader.fragmentShader = defines + encodings + shader.fragmentShader;
                // -- compat ---------------------------------------------------------------------------------
                // COMPAT
                // Three.js r132 introduces new shader chunks <normal_pars_fragment> and <alphatest_pars_fragment>
                if (threeRevision < 132) {
                    shader.fragmentShader = shader.fragmentShader.replace('#include <normal_pars_fragment>', '');
                    shader.fragmentShader = shader.fragmentShader.replace('#include <alphatest_pars_fragment>', '');
                }
            };
        }
        get color() {
            return this.uniforms.litFactor.value;
        }
        set color(value) {
            this.uniforms.litFactor.value = value;
        }
        get map() {
            return this.uniforms.map.value;
        }
        set map(value) {
            this.uniforms.map.value = value;
        }
        get normalMap() {
            return this.uniforms.normalMap.value;
        }
        set normalMap(value) {
            this.uniforms.normalMap.value = value;
        }
        get normalScale() {
            return this.uniforms.normalScale.value;
        }
        set normalScale(value) {
            this.uniforms.normalScale.value = value;
        }
        get emissive() {
            return this.uniforms.emissive.value;
        }
        set emissive(value) {
            this.uniforms.emissive.value = value;
        }
        get emissiveMap() {
            return this.uniforms.emissiveMap.value;
        }
        set emissiveMap(value) {
            this.uniforms.emissiveMap.value = value;
        }
        get shadeColorFactor() {
            return this.uniforms.shadeColorFactor.value;
        }
        set shadeColorFactor(value) {
            this.uniforms.shadeColorFactor.value = value;
        }
        get shadeMultiplyTexture() {
            return this.uniforms.shadeMultiplyTexture.value;
        }
        set shadeMultiplyTexture(value) {
            this.uniforms.shadeMultiplyTexture.value = value;
        }
        get shadingShiftFactor() {
            return this.uniforms.shadingShiftFactor.value;
        }
        set shadingShiftFactor(value) {
            this.uniforms.shadingShiftFactor.value = value;
        }
        get shadingShiftTexture() {
            return this.uniforms.shadingShiftTexture.value;
        }
        set shadingShiftTexture(value) {
            this.uniforms.shadingShiftTexture.value = value;
        }
        get shadingShiftTextureScale() {
            return this.uniforms.shadingShiftTextureScale.value;
        }
        set shadingShiftTextureScale(value) {
            this.uniforms.shadingShiftTextureScale.value = value;
        }
        get shadingToonyFactor() {
            return this.uniforms.shadingToonyFactor.value;
        }
        set shadingToonyFactor(value) {
            this.uniforms.shadingToonyFactor.value = value;
        }
        get giEqualizationFactor() {
            return this.uniforms.giEqualizationFactor.value;
        }
        set giEqualizationFactor(value) {
            this.uniforms.giEqualizationFactor.value = value;
        }
        get matcapFactor() {
            return this.uniforms.matcapFactor.value;
        }
        set matcapFactor(value) {
            this.uniforms.matcapFactor.value = value;
        }
        get matcapTexture() {
            return this.uniforms.matcapTexture.value;
        }
        set matcapTexture(value) {
            this.uniforms.matcapTexture.value = value;
        }
        get parametricRimColorFactor() {
            return this.uniforms.parametricRimColorFactor.value;
        }
        set parametricRimColorFactor(value) {
            this.uniforms.parametricRimColorFactor.value = value;
        }
        get rimMultiplyTexture() {
            return this.uniforms.rimMultiplyTexture.value;
        }
        set rimMultiplyTexture(value) {
            this.uniforms.rimMultiplyTexture.value = value;
        }
        get rimLightingMixFactor() {
            return this.uniforms.rimLightingMixFactor.value;
        }
        set rimLightingMixFactor(value) {
            this.uniforms.rimLightingMixFactor.value = value;
        }
        get parametricRimFresnelPowerFactor() {
            return this.uniforms.parametricRimFresnelPowerFactor.value;
        }
        set parametricRimFresnelPowerFactor(value) {
            this.uniforms.parametricRimFresnelPowerFactor.value = value;
        }
        get parametricRimLiftFactor() {
            return this.uniforms.parametricRimLiftFactor.value;
        }
        set parametricRimLiftFactor(value) {
            this.uniforms.parametricRimLiftFactor.value = value;
        }
        get outlineWidthMultiplyTexture() {
            return this.uniforms.outlineWidthMultiplyTexture.value;
        }
        set outlineWidthMultiplyTexture(value) {
            this.uniforms.outlineWidthMultiplyTexture.value = value;
        }
        get outlineWidthFactor() {
            return this.uniforms.outlineWidthFactor.value;
        }
        set outlineWidthFactor(value) {
            this.uniforms.outlineWidthFactor.value = value;
        }
        get outlineColorFactor() {
            return this.uniforms.outlineColorFactor.value;
        }
        set outlineColorFactor(value) {
            this.uniforms.outlineColorFactor.value = value;
        }
        get outlineLightingMixFactor() {
            return this.uniforms.outlineLightingMixFactor.value;
        }
        set outlineLightingMixFactor(value) {
            this.uniforms.outlineLightingMixFactor.value = value;
        }
        get uvAnimationMaskTexture() {
            return this.uniforms.uvAnimationMaskTexture.value;
        }
        set uvAnimationMaskTexture(value) {
            this.uniforms.uvAnimationMaskTexture.value = value;
        }
        get uvAnimationScrollXOffset() {
            return this.uniforms.uvAnimationScrollXOffset.value;
        }
        set uvAnimationScrollXOffset(value) {
            this.uniforms.uvAnimationScrollXOffset.value = value;
        }
        get uvAnimationScrollYOffset() {
            return this.uniforms.uvAnimationScrollYOffset.value;
        }
        set uvAnimationScrollYOffset(value) {
            this.uniforms.uvAnimationScrollYOffset.value = value;
        }
        get uvAnimationRotationPhase() {
            return this.uniforms.uvAnimationRotationPhase.value;
        }
        set uvAnimationRotationPhase(value) {
            this.uniforms.uvAnimationRotationPhase.value = value;
        }
        /**
         * When this is `true`, vertex colors will be ignored.
         * `true` by default.
         */
        get ignoreVertexColor() {
            return this._ignoreVertexColor;
        }
        set ignoreVertexColor(value) {
            this._ignoreVertexColor = value;
            this.needsUpdate = true;
        }
        /**
         * There is a line of the shader called "comment out if you want to PBR absolutely" in VRM0.0 MToon.
         * When this is true, the material enables the line to make it compatible with the legacy rendering of VRM.
         * Usually not recommended to turn this on.
         * `false` by default.
         */
        get v0CompatShade() {
            return this._v0CompatShade;
        }
        /**
         * There is a line of the shader called "comment out if you want to PBR absolutely" in VRM0.0 MToon.
         * When this is true, the material enables the line to make it compatible with the legacy rendering of VRM.
         * Usually not recommended to turn this on.
         * `false` by default.
         */
        set v0CompatShade(v) {
            this._v0CompatShade = v;
            this.needsUpdate = true;
        }
        /**
         * Debug mode for the material.
         * You can visualize several components for diagnosis using debug mode.
         *
         * See: {@link MToonMaterialDebugMode}
         */
        get debugMode() {
            return this._debugMode;
        }
        /**
         * Debug mode for the material.
         * You can visualize several components for diagnosis using debug mode.
         *
         * See: {@link MToonMaterialDebugMode}
         */
        set debugMode(m) {
            this._debugMode = m;
            this.needsUpdate = true;
        }
        get outlineWidthMode() {
            return this._outlineWidthMode;
        }
        set outlineWidthMode(m) {
            this._outlineWidthMode = m;
            this.needsUpdate = true;
        }
        get isOutline() {
            return this._isOutline;
        }
        set isOutline(b) {
            this._isOutline = b;
            this.needsUpdate = true;
        }
        /**
         * Readonly boolean that indicates this is a [[MToonMaterial]].
         */
        get isMToonMaterial() {
            return true;
        }
        /**
         * Update this material.
         *
         * @param delta deltaTime since last update
         */
        update(delta) {
            this._uploadUniformsWorkaround();
            this._updateUVAnimation(delta);
        }
        copy(source) {
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
        _updateUVAnimation(delta) {
            this.uniforms.uvAnimationScrollXOffset.value += delta * this.uvAnimationScrollXSpeedFactor;
            this.uniforms.uvAnimationScrollYOffset.value += delta * this.uvAnimationScrollYSpeedFactor;
            this.uniforms.uvAnimationRotationPhase.value += delta * this.uvAnimationRotationSpeedFactor;
            this.uniformsNeedUpdate = true;
        }
        /**
         * Upload uniforms that need to upload but doesn't automatically because of reasons.
         * Intended to be called via {@link constructor} and {@link update}.
         */
        _uploadUniformsWorkaround() {
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
            this._updateTextureMatrix(this.uniforms.outlineWidthMultiplyTexture, this.uniforms.outlineWidthMultiplyTextureUvTransform);
            this._updateTextureMatrix(this.uniforms.uvAnimationMaskTexture, this.uniforms.uvAnimationMaskTextureUvTransform);
            // COMPAT workaround: starting from r132, alphaTest becomes a uniform instead of preprocessor value
            const threeRevision = parseInt(THREE__namespace.REVISION, 10);
            if (threeRevision >= 132) {
                this.uniforms.alphaTest.value = this.alphaTest;
            }
            this.uniformsNeedUpdate = true;
        }
        /**
         * Returns a map object of preprocessor token and macro of the shader program.
         */
        _generateDefines() {
            const threeRevision = parseInt(THREE__namespace.REVISION, 10);
            const useUvInVert = this.outlineWidthMultiplyTexture !== null;
            const useUvInFrag = this.map !== null ||
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
                MTOON_USE_UV: useUvInVert || useUvInFrag,
                MTOON_UVS_VERTEX_ONLY: useUvInVert && !useUvInFrag,
                V0_COMPAT_SHADE: this._v0CompatShade,
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
        }
        _updateTextureMatrix(src, dst) {
            if (src.value) {
                if (src.value.matrixAutoUpdate) {
                    src.value.updateMatrix();
                }
                dst.value.copy(src.value.matrix);
            }
        }
    }

    /**
     * MaterialParameters hates `undefined`. This helper automatically rejects assign of these `undefined`.
     * It also handles asynchronous process of textures.
     * Make sure await for {@link GLTFMToonMaterialParamsAssignHelper.pending}.
     */
    class GLTFMToonMaterialParamsAssignHelper {
        constructor(parser, materialParams) {
            this._parser = parser;
            this._materialParams = materialParams;
            this._pendings = [];
        }
        get pending() {
            return Promise.all(this._pendings);
        }
        assignPrimitive(key, value) {
            if (value != null) {
                this._materialParams[key] = value;
            }
        }
        assignColor(key, value, convertSRGBToLinear) {
            if (value != null) {
                this._materialParams[key] = new THREE__namespace.Color().fromArray(value);
                if (convertSRGBToLinear) {
                    this._materialParams[key].convertSRGBToLinear();
                }
            }
        }
        assignTexture(key, texture, isColorTexture) {
            return __awaiter(this, void 0, void 0, function* () {
                const promise = (() => __awaiter(this, void 0, void 0, function* () {
                    if (texture != null) {
                        yield this._parser.assignTexture(this._materialParams, key, texture);
                        if (isColorTexture) {
                            this._materialParams[key].encoding = THREE__namespace.sRGBEncoding;
                        }
                    }
                }))();
                this._pendings.push(promise);
                return promise;
            });
        }
        assignTextureByIndex(key, textureIndex, isColorTexture) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.assignTexture(key, textureIndex != null ? { index: textureIndex } : undefined, isColorTexture);
            });
        }
    }

    class MToonMaterialLoaderPlugin {
        constructor(parser, options = {}) {
            var _a, _b, _c;
            this.parser = parser;
            this.renderOrderOffset = (_a = options.renderOrderOffset) !== null && _a !== void 0 ? _a : 0;
            this.v0CompatShade = (_b = options.v0CompatShade) !== null && _b !== void 0 ? _b : false;
            this.debugMode = (_c = options.debugMode) !== null && _c !== void 0 ? _c : 'none';
            this._mToonMaterialSet = new Set();
        }
        get name() {
            return MToonMaterialLoaderPlugin.EXTENSION_NAME;
        }
        beforeRoot() {
            return __awaiter(this, void 0, void 0, function* () {
                this._removeUnlitExtensionIfMToonExists();
            });
        }
        afterRoot(gltf) {
            return __awaiter(this, void 0, void 0, function* () {
                gltf.userData.vrmMToonMaterials = Array.from(this._mToonMaterialSet);
            });
        }
        getMaterialType(materialIndex) {
            const v1Extension = this._getMToonExtension(materialIndex);
            if (v1Extension) {
                return MToonMaterial;
            }
            return null;
        }
        extendMaterialParams(materialIndex, materialParams) {
            const extension = this._getMToonExtension(materialIndex);
            if (extension) {
                return this._extendMaterialParams(extension, materialParams);
            }
            return null;
        }
        loadMesh(meshIndex) {
            return __awaiter(this, void 0, void 0, function* () {
                const parser = this.parser;
                const json = parser.json;
                const meshDef = json.meshes[meshIndex];
                const primitivesDef = meshDef.primitives;
                const meshOrGroup = yield parser.loadMesh(meshIndex);
                if (primitivesDef.length === 1) {
                    const mesh = meshOrGroup;
                    const materialIndex = primitivesDef[0].material;
                    if (materialIndex != null) {
                        this._setupPrimitive(mesh, materialIndex);
                    }
                }
                else {
                    const group = meshOrGroup;
                    for (let i = 0; i < primitivesDef.length; i++) {
                        const mesh = group.children[i];
                        const materialIndex = primitivesDef[i].material;
                        if (materialIndex != null) {
                            this._setupPrimitive(mesh, materialIndex);
                        }
                    }
                }
                return meshOrGroup;
            });
        }
        /**
         * Delete use of `KHR_materials_unlit` from its `materials` if the material is using MToon.
         *
         * Since GLTFLoader have so many hardcoded procedure related to `KHR_materials_unlit`
         * we have to delete the extension before we start to parse the glTF.
         */
        _removeUnlitExtensionIfMToonExists() {
            const parser = this.parser;
            const json = parser.json;
            const materialDefs = json.materials;
            materialDefs.map((materialDef, iMaterial) => {
                var _a;
                const extension = this._getMToonExtension(iMaterial);
                if (extension && ((_a = materialDef.extensions) === null || _a === void 0 ? void 0 : _a['KHR_materials_unlit'])) {
                    delete materialDef.extensions['KHR_materials_unlit'];
                }
            });
        }
        _getMToonExtension(materialIndex) {
            var _a;
            const parser = this.parser;
            const json = parser.json;
            const materialDef = json.materials[materialIndex];
            const extension = (_a = materialDef.extensions) === null || _a === void 0 ? void 0 : _a[MToonMaterialLoaderPlugin.EXTENSION_NAME];
            if (extension == null) {
                return undefined;
            }
            const specVersion = extension.specVersion;
            if (specVersion !== '1.0-beta') {
                return undefined;
            }
            return extension;
        }
        _extendMaterialParams(extension, materialParams) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                // Removing material params that is not required to supress warnings.
                delete materialParams.metalness;
                delete materialParams.roughness;
                const assignHelper = new GLTFMToonMaterialParamsAssignHelper(this.parser, materialParams);
                assignHelper.assignPrimitive('transparentWithZWrite', extension.transparentWithZWrite);
                assignHelper.assignColor('shadeColorFactor', extension.shadeColorFactor);
                assignHelper.assignTexture('shadeMultiplyTexture', extension.shadeMultiplyTexture, true);
                assignHelper.assignPrimitive('shadingShiftFactor', extension.shadingShiftFactor);
                assignHelper.assignTexture('shadingShiftTexture', extension.shadingShiftTexture, true);
                assignHelper.assignPrimitive('shadingShiftTextureScale', (_a = extension.shadingShiftTexture) === null || _a === void 0 ? void 0 : _a.scale);
                assignHelper.assignPrimitive('shadingToonyFactor', extension.shadingToonyFactor);
                assignHelper.assignPrimitive('giEqualizationFactor', extension.giEqualizationFactor);
                assignHelper.assignColor('matcapFactor', extension.matcapFactor);
                assignHelper.assignTexture('matcapTexture', extension.matcapTexture, true);
                assignHelper.assignColor('parametricRimColorFactor', extension.parametricRimColorFactor);
                assignHelper.assignTexture('rimMultiplyTexture', extension.rimMultiplyTexture, true);
                assignHelper.assignPrimitive('rimLightingMixFactor', extension.rimLightingMixFactor);
                assignHelper.assignPrimitive('parametricRimFresnelPowerFactor', extension.parametricRimFresnelPowerFactor);
                assignHelper.assignPrimitive('parametricRimLiftFactor', extension.parametricRimLiftFactor);
                assignHelper.assignPrimitive('outlineWidthMode', extension.outlineWidthMode);
                assignHelper.assignPrimitive('outlineWidthFactor', extension.outlineWidthFactor);
                assignHelper.assignTexture('outlineWidthMultiplyTexture', extension.outlineWidthMultiplyTexture, false);
                assignHelper.assignColor('outlineColorFactor', extension.outlineColorFactor);
                assignHelper.assignPrimitive('outlineLightingMixFactor', extension.outlineLightingMixFactor);
                assignHelper.assignTexture('uvAnimationMaskTexture', extension.uvAnimationMaskTexture, false);
                assignHelper.assignPrimitive('uvAnimationScrollXSpeedFactor', extension.uvAnimationScrollXSpeedFactor);
                assignHelper.assignPrimitive('uvAnimationScrollYSpeedFactor', extension.uvAnimationScrollYSpeedFactor);
                assignHelper.assignPrimitive('uvAnimationRotationSpeedFactor', extension.uvAnimationRotationSpeedFactor);
                assignHelper.assignPrimitive('v0CompatShade', this.v0CompatShade);
                assignHelper.assignPrimitive('debugMode', this.debugMode);
                yield assignHelper.pending;
            });
        }
        /**
         * This will do two processes that is required to render MToon properly.
         *
         * - Set render order
         * - Generate outline
         *
         * @param mesh A target GLTF primitive
         * @param materialIndex The material index of the primitive
         */
        _setupPrimitive(mesh, materialIndex) {
            const extension = this._getMToonExtension(materialIndex);
            if (extension) {
                const renderOrder = this._parseRenderOrder(extension);
                mesh.renderOrder = renderOrder + this.renderOrderOffset;
                this._generateOutline(mesh);
                this._addToMaterialSet(mesh);
                return;
            }
        }
        /**
         * Generate outline for the given mesh, if it needs.
         *
         * @param mesh The target mesh
         */
        _generateOutline(mesh) {
            // OK, it's the hacky part.
            // We are going to duplicate the MToonMaterial for outline use.
            // Then we are going to create two geometry groups and refer same buffer but different material.
            // It's how we draw two materials at once using a single mesh.
            // make sure the material is mtoon
            const surfaceMaterial = mesh.material;
            if (!(surfaceMaterial instanceof MToonMaterial)) {
                return;
            }
            // check whether we really have to prepare outline or not
            if (surfaceMaterial.outlineWidthMode === 'none' || surfaceMaterial.outlineWidthFactor <= 0.0) {
                return;
            }
            // make its material an array
            mesh.material = [surfaceMaterial]; // mesh.material is guaranteed to be a Material in GLTFLoader
            // duplicate the material for outline use
            const outlineMaterial = surfaceMaterial.clone();
            outlineMaterial.name += ' (Outline)';
            outlineMaterial.isOutline = true;
            outlineMaterial.side = THREE__namespace.BackSide;
            mesh.material.push(outlineMaterial);
            // make two geometry groups out of a same buffer
            const geometry = mesh.geometry; // mesh.geometry is guaranteed to be a BufferGeometry in GLTFLoader
            const primitiveVertices = geometry.index ? geometry.index.count : geometry.attributes.position.count / 3;
            geometry.addGroup(0, primitiveVertices, 0);
            geometry.addGroup(0, primitiveVertices, 1);
        }
        _addToMaterialSet(mesh) {
            const materialOrMaterials = mesh.material;
            const materialSet = new Set();
            if (Array.isArray(materialOrMaterials)) {
                materialOrMaterials.forEach((material) => materialSet.add(material));
            }
            else {
                materialSet.add(materialOrMaterials);
            }
            for (const material of materialSet) {
                if (material instanceof MToonMaterial) {
                    this._mToonMaterialSet.add(material);
                }
            }
        }
        _parseRenderOrder(extension) {
            var _a;
            // transparentWithZWrite ranges from 0 to +9
            // mere transparent ranges from -9 to 0
            const enabledZWrite = extension.transparentWithZWrite;
            return (enabledZWrite ? 0 : 19) + ((_a = extension.renderQueueOffsetNumber) !== null && _a !== void 0 ? _a : 0);
        }
    }
    MToonMaterialLoaderPlugin.EXTENSION_NAME = 'VRMC_materials_mtoon';

    exports.MToonMaterial = MToonMaterial;
    exports.MToonMaterialDebugMode = MToonMaterialDebugMode;
    exports.MToonMaterialLoaderPlugin = MToonMaterialLoaderPlugin;
    exports.MToonMaterialOutlineWidthMode = MToonMaterialOutlineWidthMode;

    Object.defineProperty(exports, '__esModule', { value: true });

    Object.assign(THREE, exports);

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyZWUtdnJtLW1hdGVyaWFscy1tdG9vbi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIi4uL3NyYy91dGlscy9nZXRFbmNvZGluZ0NvbXBvbmVudHMudHMiLCIuLi9zcmMvdXRpbHMvZ2V0VGV4ZWxEZWNvZGluZ0Z1bmN0aW9uLnRzIiwiLi4vc3JjL01Ub29uTWF0ZXJpYWxEZWJ1Z01vZGUudHMiLCIuLi9zcmMvTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUudHMiLCIuLi9zcmMvdXRpbHMvZ2V0VGV4dHVyZUVuY29kaW5nRnJvbU1hcC50cyIsIi4uL3NyYy9NVG9vbk1hdGVyaWFsLnRzIiwiLi4vc3JjL0dMVEZNVG9vbk1hdGVyaWFsUGFyYW1zQXNzaWduSGVscGVyLnRzIiwiLi4vc3JjL01Ub29uTWF0ZXJpYWxMb2FkZXJQbHVnaW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19jcmVhdGVCaW5kaW5nID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9KTtcclxufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBvW2syXSA9IG1ba107XHJcbn0pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBvKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIHApKSBfX2NyZWF0ZUJpbmRpbmcobywgbSwgcCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XHJcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICByZXR1cm4gcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXkodG8sIGZyb20pIHtcclxuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IGZyb20ubGVuZ3RoLCBqID0gdG8ubGVuZ3RoOyBpIDwgaWw7IGkrKywgaisrKVxyXG4gICAgICAgIHRvW2pdID0gZnJvbVtpXTtcclxuICAgIHJldHVybiB0bztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xyXG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xyXG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgcHJpdmF0ZU1hcCkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIGdldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwcml2YXRlTWFwLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBwcml2YXRlTWFwLCB2YWx1ZSkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIHNldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHByaXZhdGVNYXAuc2V0KHJlY2VpdmVyLCB2YWx1ZSk7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG5leHBvcnQgY29uc3QgZ2V0RW5jb2RpbmdDb21wb25lbnRzID0gKGVuY29kaW5nOiBUSFJFRS5UZXh0dXJlRW5jb2RpbmcpOiBbc3RyaW5nLCBzdHJpbmddID0+IHtcbiAgc3dpdGNoIChlbmNvZGluZykge1xuICAgIGNhc2UgVEhSRUUuTGluZWFyRW5jb2Rpbmc6XG4gICAgICByZXR1cm4gWydMaW5lYXInLCAnKCB2YWx1ZSApJ107XG4gICAgY2FzZSBUSFJFRS5zUkdCRW5jb2Rpbmc6XG4gICAgICByZXR1cm4gWydzUkdCJywgJyggdmFsdWUgKSddO1xuICAgIGNhc2UgVEhSRUUuUkdCRUVuY29kaW5nOlxuICAgICAgcmV0dXJuIFsnUkdCRScsICcoIHZhbHVlICknXTtcbiAgICBjYXNlIFRIUkVFLlJHQk03RW5jb2Rpbmc6XG4gICAgICByZXR1cm4gWydSR0JNJywgJyggdmFsdWUsIDcuMCApJ107XG4gICAgY2FzZSBUSFJFRS5SR0JNMTZFbmNvZGluZzpcbiAgICAgIHJldHVybiBbJ1JHQk0nLCAnKCB2YWx1ZSwgMTYuMCApJ107XG4gICAgY2FzZSBUSFJFRS5SR0JERW5jb2Rpbmc6XG4gICAgICByZXR1cm4gWydSR0JEJywgJyggdmFsdWUsIDI1Ni4wICknXTtcbiAgICBjYXNlIFRIUkVFLkdhbW1hRW5jb2Rpbmc6XG4gICAgICByZXR1cm4gWydHYW1tYScsICcoIHZhbHVlLCBmbG9hdCggR0FNTUFfRkFDVE9SICkgKSddO1xuICAgIGNhc2UgVEhSRUUuTG9nTHV2RW5jb2Rpbmc6XG4gICAgICByZXR1cm4gWydMb2dMdXYnLCAnKCB2YWx1ZSApJ107XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcigndW5zdXBwb3J0ZWQgZW5jb2Rpbmc6ICcgKyBlbmNvZGluZyk7XG4gIH1cbn07XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBnZXRFbmNvZGluZ0NvbXBvbmVudHMgfSBmcm9tICcuL2dldEVuY29kaW5nQ29tcG9uZW50cyc7XG5cbmV4cG9ydCBjb25zdCBnZXRUZXhlbERlY29kaW5nRnVuY3Rpb24gPSAoZnVuY3Rpb25OYW1lOiBzdHJpbmcsIGVuY29kaW5nOiBUSFJFRS5UZXh0dXJlRW5jb2RpbmcpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBjb21wb25lbnRzID0gZ2V0RW5jb2RpbmdDb21wb25lbnRzKGVuY29kaW5nKTtcbiAgcmV0dXJuICd2ZWM0ICcgKyBmdW5jdGlvbk5hbWUgKyAnKCB2ZWM0IHZhbHVlICkgeyByZXR1cm4gJyArIGNvbXBvbmVudHNbMF0gKyAnVG9MaW5lYXInICsgY29tcG9uZW50c1sxXSArICc7IH0nO1xufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiAqL1xuXG4vKipcbiAqIFNwZWNpZmllcnMgb2YgZGVidWcgbW9kZSBvZiB7QGxpbmsgTVRvb25NYXRlcmlhbH0uXG4gKlxuICogU2VlOiB7QGxpbmsgTVRvb25NYXRlcmlhbC5kZWJ1Z01vZGV9XG4gKi9cbmV4cG9ydCBjb25zdCBNVG9vbk1hdGVyaWFsRGVidWdNb2RlID0ge1xuICAvKipcbiAgICogUmVuZGVyIG5vcm1hbGx5LlxuICAgKi9cbiAgTm9uZTogJ25vbmUnLFxuXG4gIC8qKlxuICAgKiBWaXN1YWxpemUgbm9ybWFscyBvZiB0aGUgc3VyZmFjZS5cbiAgICovXG4gIE5vcm1hbDogJ25vcm1hbCcsXG5cbiAgLyoqXG4gICAqIFZpc3VhbGl6ZSBsaXQvc2hhZGUgb2YgdGhlIHN1cmZhY2UuXG4gICAqL1xuICBMaXRTaGFkZVJhdGU6ICdsaXRTaGFkZVJhdGUnLFxuXG4gIC8qKlxuICAgKiBWaXN1YWxpemUgVVYgb2YgdGhlIHN1cmZhY2UuXG4gICAqL1xuICBVVjogJ3V2Jyxcbn0gYXMgY29uc3Q7XG5cbmV4cG9ydCB0eXBlIE1Ub29uTWF0ZXJpYWxEZWJ1Z01vZGUgPSB0eXBlb2YgTVRvb25NYXRlcmlhbERlYnVnTW9kZVtrZXlvZiB0eXBlb2YgTVRvb25NYXRlcmlhbERlYnVnTW9kZV07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cblxuZXhwb3J0IGNvbnN0IE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlID0ge1xuICBOb25lOiAnbm9uZScsXG4gIFdvcmxkQ29vcmRpbmF0ZXM6ICd3b3JsZENvb3JkaW5hdGVzJyxcbiAgU2NyZWVuQ29vcmRpbmF0ZXM6ICdzY3JlZW5Db29yZGluYXRlcycsXG59IGFzIGNvbnN0O1xuXG5leHBvcnQgdHlwZSBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZSA9IHR5cGVvZiBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZVtrZXlvZiB0eXBlb2YgTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGVdO1xuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIFJldHJpZXZlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvYmxvYi84OGI2MzI4OTk4ZDE1NWZhMGE3YzFmMWU1ZTNiZDZiZmY3NTI2OGMwL3NyYy9yZW5kZXJlcnMvd2ViZ2wvV2ViR0xQcm9ncmFtcy5qcyNMOTJcbiAqXG4gKiBEaWZmOlxuICogICAtIFJlbW92ZSBXZWJHTFJlbmRlclRhcmdldCBoYW5kbGVyIGJlY2F1c2UgaXQgaW5jcmVhc2VzIGNvZGUgY29tcGxleGl0aWVzIG9uIFR5cGVTY3JpcHRcbiAqICAgLSBBZGQgYSBib29sZWFuIGBpc1dlYkdMMmAgYXMgYSBzZWNvbmQgYXJndW1lbnQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRUZXh0dXJlRW5jb2RpbmdGcm9tTWFwKG1hcDogVEhSRUUuVGV4dHVyZSwgaXNXZWJHTDI6IGJvb2xlYW4pOiBUSFJFRS5UZXh0dXJlRW5jb2Rpbmcge1xuICBsZXQgZW5jb2Rpbmc7XG5cbiAgaWYgKG1hcCAmJiBtYXAuaXNUZXh0dXJlKSB7XG4gICAgZW5jb2RpbmcgPSBtYXAuZW5jb2Rpbmc7XG4gICAgLy8gfSBlbHNlIGlmICggbWFwICYmIG1hcC5pc1dlYkdMUmVuZGVyVGFyZ2V0ICkge1xuICAgIC8vICAgY29uc29sZS53YXJuKCAnVEhSRUUuV2ViR0xQcm9ncmFtcy5nZXRUZXh0dXJlRW5jb2RpbmdGcm9tTWFwOiBkb25cXCd0IHVzZSByZW5kZXIgdGFyZ2V0cyBhcyB0ZXh0dXJlcy4gVXNlIHRoZWlyIC50ZXh0dXJlIHByb3BlcnR5IGluc3RlYWQuJyApO1xuICAgIC8vICAgZW5jb2RpbmcgPSBtYXAudGV4dHVyZS5lbmNvZGluZztcbiAgfSBlbHNlIHtcbiAgICBlbmNvZGluZyA9IFRIUkVFLkxpbmVhckVuY29kaW5nO1xuICB9XG5cbiAgaWYgKHBhcnNlSW50KFRIUkVFLlJFVklTSU9OLCAxMCkgPj0gMTMzKSB7XG4gICAgaWYgKFxuICAgICAgaXNXZWJHTDIgJiZcbiAgICAgIG1hcCAmJlxuICAgICAgbWFwLmlzVGV4dHVyZSAmJlxuICAgICAgbWFwLmZvcm1hdCA9PT0gVEhSRUUuUkdCQUZvcm1hdCAmJlxuICAgICAgbWFwLnR5cGUgPT09IFRIUkVFLlVuc2lnbmVkQnl0ZVR5cGUgJiZcbiAgICAgIG1hcC5lbmNvZGluZyA9PT0gVEhSRUUuc1JHQkVuY29kaW5nXG4gICAgKSB7XG4gICAgICBlbmNvZGluZyA9IFRIUkVFLkxpbmVhckVuY29kaW5nOyAvLyBkaXNhYmxlIGlubGluZSBkZWNvZGUgZm9yIHNSR0IgdGV4dHVyZXMgaW4gV2ViR0wgMlxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBlbmNvZGluZztcbn1cbiIsIi8qIHRzbGludDpkaXNhYmxlOm1lbWJlci1vcmRlcmluZyAqL1xuXG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBnZXRUZXhlbERlY29kaW5nRnVuY3Rpb24gfSBmcm9tICcuL3V0aWxzL2dldFRleGVsRGVjb2RpbmdGdW5jdGlvbic7XG5pbXBvcnQgdmVydGV4U2hhZGVyIGZyb20gJy4vc2hhZGVycy9tdG9vbi52ZXJ0JztcbmltcG9ydCBmcmFnbWVudFNoYWRlciBmcm9tICcuL3NoYWRlcnMvbXRvb24uZnJhZyc7XG5pbXBvcnQgeyBNVG9vbk1hdGVyaWFsRGVidWdNb2RlIH0gZnJvbSAnLi9NVG9vbk1hdGVyaWFsRGVidWdNb2RlJztcbmltcG9ydCB7IE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlIH0gZnJvbSAnLi9NVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZSc7XG5pbXBvcnQgdHlwZSB7IE1Ub29uTWF0ZXJpYWxQYXJhbWV0ZXJzIH0gZnJvbSAnLi9NVG9vbk1hdGVyaWFsUGFyYW1ldGVycyc7XG5pbXBvcnQgeyBnZXRUZXh0dXJlRW5jb2RpbmdGcm9tTWFwIH0gZnJvbSAnLi91dGlscy9nZXRUZXh0dXJlRW5jb2RpbmdGcm9tTWFwJztcblxuLyoqXG4gKiBNVG9vbiBpcyBhIG1hdGVyaWFsIHNwZWNpZmljYXRpb24gdGhhdCBoYXMgdmFyaW91cyBmZWF0dXJlcy5cbiAqIFRoZSBzcGVjIGFuZCBpbXBsZW1lbnRhdGlvbiBhcmUgb3JpZ2luYWxseSBmb3VuZGVkIGZvciBVbml0eSBlbmdpbmUgYW5kIHRoaXMgaXMgYSBwb3J0IG9mIHRoZSBtYXRlcmlhbC5cbiAqXG4gKiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9TYW50YXJoL01Ub29uXG4gKi9cbmV4cG9ydCBjbGFzcyBNVG9vbk1hdGVyaWFsIGV4dGVuZHMgVEhSRUUuU2hhZGVyTWF0ZXJpYWwge1xuICBwdWJsaWMgdW5pZm9ybXM6IHtcbiAgICBsaXRGYWN0b3I6IFRIUkVFLklVbmlmb3JtPFRIUkVFLkNvbG9yPjtcbiAgICBhbHBoYVRlc3Q6IFRIUkVFLklVbmlmb3JtPG51bWJlcj47XG4gICAgb3BhY2l0eTogVEhSRUUuSVVuaWZvcm08bnVtYmVyPjtcbiAgICBtYXA6IFRIUkVFLklVbmlmb3JtPFRIUkVFLlRleHR1cmUgfCBudWxsPjtcbiAgICBtYXBVdlRyYW5zZm9ybTogVEhSRUUuSVVuaWZvcm08VEhSRUUuTWF0cml4Mz47XG4gICAgbm9ybWFsTWFwOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5UZXh0dXJlIHwgbnVsbD47XG4gICAgbm9ybWFsTWFwVXZUcmFuc2Zvcm06IFRIUkVFLklVbmlmb3JtPFRIUkVFLk1hdHJpeDM+O1xuICAgIG5vcm1hbFNjYWxlOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5WZWN0b3IyPjtcbiAgICBlbWlzc2l2ZTogVEhSRUUuSVVuaWZvcm08VEhSRUUuQ29sb3I+O1xuICAgIGVtaXNzaXZlTWFwOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5UZXh0dXJlIHwgbnVsbD47XG4gICAgZW1pc3NpdmVNYXBVdlRyYW5zZm9ybTogVEhSRUUuSVVuaWZvcm08VEhSRUUuTWF0cml4Mz47XG4gICAgc2hhZGVDb2xvckZhY3RvcjogVEhSRUUuSVVuaWZvcm08VEhSRUUuQ29sb3I+O1xuICAgIHNoYWRlTXVsdGlwbHlUZXh0dXJlOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5UZXh0dXJlIHwgbnVsbD47XG4gICAgc2hhZGVNdWx0aXBseVRleHR1cmVVdlRyYW5zZm9ybTogVEhSRUUuSVVuaWZvcm08VEhSRUUuTWF0cml4Mz47XG4gICAgc2hhZGluZ1NoaWZ0RmFjdG9yOiBUSFJFRS5JVW5pZm9ybTxudW1iZXI+O1xuICAgIHNoYWRpbmdTaGlmdFRleHR1cmU6IFRIUkVFLklVbmlmb3JtPFRIUkVFLlRleHR1cmUgfCBudWxsPjtcbiAgICBzaGFkaW5nU2hpZnRUZXh0dXJlVXZUcmFuc2Zvcm06IFRIUkVFLklVbmlmb3JtPFRIUkVFLk1hdHJpeDM+O1xuICAgIHNoYWRpbmdTaGlmdFRleHR1cmVTY2FsZTogVEhSRUUuSVVuaWZvcm08bnVtYmVyPjtcbiAgICBzaGFkaW5nVG9vbnlGYWN0b3I6IFRIUkVFLklVbmlmb3JtPG51bWJlcj47XG4gICAgZ2lFcXVhbGl6YXRpb25GYWN0b3I6IFRIUkVFLklVbmlmb3JtPG51bWJlcj47XG4gICAgbWF0Y2FwRmFjdG9yOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5Db2xvcj47XG4gICAgbWF0Y2FwVGV4dHVyZTogVEhSRUUuSVVuaWZvcm08VEhSRUUuVGV4dHVyZSB8IG51bGw+O1xuICAgIG1hdGNhcFRleHR1cmVVdlRyYW5zZm9ybTogVEhSRUUuSVVuaWZvcm08VEhSRUUuTWF0cml4Mz47XG4gICAgcGFyYW1ldHJpY1JpbUNvbG9yRmFjdG9yOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5Db2xvcj47XG4gICAgcmltTXVsdGlwbHlUZXh0dXJlOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5UZXh0dXJlIHwgbnVsbD47XG4gICAgcmltTXVsdGlwbHlUZXh0dXJlVXZUcmFuc2Zvcm06IFRIUkVFLklVbmlmb3JtPFRIUkVFLk1hdHJpeDM+O1xuICAgIHJpbUxpZ2h0aW5nTWl4RmFjdG9yOiBUSFJFRS5JVW5pZm9ybTxudW1iZXI+O1xuICAgIHBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJGYWN0b3I6IFRIUkVFLklVbmlmb3JtPG51bWJlcj47XG4gICAgcGFyYW1ldHJpY1JpbUxpZnRGYWN0b3I6IFRIUkVFLklVbmlmb3JtPG51bWJlcj47XG4gICAgb3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5UZXh0dXJlIHwgbnVsbD47XG4gICAgb3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlVXZUcmFuc2Zvcm06IFRIUkVFLklVbmlmb3JtPFRIUkVFLk1hdHJpeDM+O1xuICAgIG91dGxpbmVXaWR0aEZhY3RvcjogVEhSRUUuSVVuaWZvcm08bnVtYmVyPjtcbiAgICBvdXRsaW5lQ29sb3JGYWN0b3I6IFRIUkVFLklVbmlmb3JtPFRIUkVFLkNvbG9yPjtcbiAgICBvdXRsaW5lTGlnaHRpbmdNaXhGYWN0b3I6IFRIUkVFLklVbmlmb3JtPG51bWJlcj47XG4gICAgdXZBbmltYXRpb25NYXNrVGV4dHVyZTogVEhSRUUuSVVuaWZvcm08VEhSRUUuVGV4dHVyZSB8IG51bGw+O1xuICAgIHV2QW5pbWF0aW9uTWFza1RleHR1cmVVdlRyYW5zZm9ybTogVEhSRUUuSVVuaWZvcm08VEhSRUUuTWF0cml4Mz47XG4gICAgdXZBbmltYXRpb25TY3JvbGxYT2Zmc2V0OiBUSFJFRS5JVW5pZm9ybTxudW1iZXI+O1xuICAgIHV2QW5pbWF0aW9uU2Nyb2xsWU9mZnNldDogVEhSRUUuSVVuaWZvcm08bnVtYmVyPjtcbiAgICB1dkFuaW1hdGlvblJvdGF0aW9uUGhhc2U6IFRIUkVFLklVbmlmb3JtPG51bWJlcj47XG4gIH07XG5cbiAgcHVibGljIGdldCBjb2xvcigpOiBUSFJFRS5Db2xvciB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMubGl0RmFjdG9yLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgY29sb3IodmFsdWU6IFRIUkVFLkNvbG9yKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5saXRGYWN0b3IudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgbWFwKCk6IFRIUkVFLlRleHR1cmUgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5tYXAudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCBtYXAodmFsdWU6IFRIUkVFLlRleHR1cmUgfCBudWxsKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5tYXAudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgbm9ybWFsTWFwKCk6IFRIUkVFLlRleHR1cmUgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5ub3JtYWxNYXAudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCBub3JtYWxNYXAodmFsdWU6IFRIUkVFLlRleHR1cmUgfCBudWxsKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5ub3JtYWxNYXAudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgbm9ybWFsU2NhbGUoKTogVEhSRUUuVmVjdG9yMiB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMubm9ybWFsU2NhbGUudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCBub3JtYWxTY2FsZSh2YWx1ZTogVEhSRUUuVmVjdG9yMikge1xuICAgIHRoaXMudW5pZm9ybXMubm9ybWFsU2NhbGUudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgZW1pc3NpdmUoKTogVEhSRUUuQ29sb3Ige1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLmVtaXNzaXZlLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgZW1pc3NpdmUodmFsdWU6IFRIUkVFLkNvbG9yKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5lbWlzc2l2ZS52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBlbWlzc2l2ZU1hcCgpOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMuZW1pc3NpdmVNYXAudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCBlbWlzc2l2ZU1hcCh2YWx1ZTogVEhSRUUuVGV4dHVyZSB8IG51bGwpIHtcbiAgICB0aGlzLnVuaWZvcm1zLmVtaXNzaXZlTWFwLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHNoYWRlQ29sb3JGYWN0b3IoKTogVEhSRUUuQ29sb3Ige1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLnNoYWRlQ29sb3JGYWN0b3IudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCBzaGFkZUNvbG9yRmFjdG9yKHZhbHVlOiBUSFJFRS5Db2xvcikge1xuICAgIHRoaXMudW5pZm9ybXMuc2hhZGVDb2xvckZhY3Rvci52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBzaGFkZU11bHRpcGx5VGV4dHVyZSgpOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMuc2hhZGVNdWx0aXBseVRleHR1cmUudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCBzaGFkZU11bHRpcGx5VGV4dHVyZSh2YWx1ZTogVEhSRUUuVGV4dHVyZSB8IG51bGwpIHtcbiAgICB0aGlzLnVuaWZvcm1zLnNoYWRlTXVsdGlwbHlUZXh0dXJlLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHNoYWRpbmdTaGlmdEZhY3RvcigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLnNoYWRpbmdTaGlmdEZhY3Rvci52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IHNoYWRpbmdTaGlmdEZhY3Rvcih2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5zaGFkaW5nU2hpZnRGYWN0b3IudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc2hhZGluZ1NoaWZ0VGV4dHVyZSgpOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMuc2hhZGluZ1NoaWZ0VGV4dHVyZS52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IHNoYWRpbmdTaGlmdFRleHR1cmUodmFsdWU6IFRIUkVFLlRleHR1cmUgfCBudWxsKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5zaGFkaW5nU2hpZnRUZXh0dXJlLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHNoYWRpbmdTaGlmdFRleHR1cmVTY2FsZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLnNoYWRpbmdTaGlmdFRleHR1cmVTY2FsZS52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IHNoYWRpbmdTaGlmdFRleHR1cmVTY2FsZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5zaGFkaW5nU2hpZnRUZXh0dXJlU2NhbGUudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc2hhZGluZ1Rvb255RmFjdG9yKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMuc2hhZGluZ1Rvb255RmFjdG9yLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgc2hhZGluZ1Rvb255RmFjdG9yKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLnVuaWZvcm1zLnNoYWRpbmdUb29ueUZhY3Rvci52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBnaUVxdWFsaXphdGlvbkZhY3RvcigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLmdpRXF1YWxpemF0aW9uRmFjdG9yLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgZ2lFcXVhbGl6YXRpb25GYWN0b3IodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMudW5pZm9ybXMuZ2lFcXVhbGl6YXRpb25GYWN0b3IudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgbWF0Y2FwRmFjdG9yKCk6IFRIUkVFLkNvbG9yIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5tYXRjYXBGYWN0b3IudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCBtYXRjYXBGYWN0b3IodmFsdWU6IFRIUkVFLkNvbG9yKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5tYXRjYXBGYWN0b3IudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgbWF0Y2FwVGV4dHVyZSgpOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMubWF0Y2FwVGV4dHVyZS52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IG1hdGNhcFRleHR1cmUodmFsdWU6IFRIUkVFLlRleHR1cmUgfCBudWxsKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5tYXRjYXBUZXh0dXJlLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHBhcmFtZXRyaWNSaW1Db2xvckZhY3RvcigpOiBUSFJFRS5Db2xvciB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMucGFyYW1ldHJpY1JpbUNvbG9yRmFjdG9yLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgcGFyYW1ldHJpY1JpbUNvbG9yRmFjdG9yKHZhbHVlOiBUSFJFRS5Db2xvcikge1xuICAgIHRoaXMudW5pZm9ybXMucGFyYW1ldHJpY1JpbUNvbG9yRmFjdG9yLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHJpbU11bHRpcGx5VGV4dHVyZSgpOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMucmltTXVsdGlwbHlUZXh0dXJlLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgcmltTXVsdGlwbHlUZXh0dXJlKHZhbHVlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCkge1xuICAgIHRoaXMudW5pZm9ybXMucmltTXVsdGlwbHlUZXh0dXJlLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHJpbUxpZ2h0aW5nTWl4RmFjdG9yKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMucmltTGlnaHRpbmdNaXhGYWN0b3IudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCByaW1MaWdodGluZ01peEZhY3Rvcih2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5yaW1MaWdodGluZ01peEZhY3Rvci52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBwYXJhbWV0cmljUmltRnJlc25lbFBvd2VyRmFjdG9yKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMucGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlckZhY3Rvci52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IHBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJGYWN0b3IodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMudW5pZm9ybXMucGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlckZhY3Rvci52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBwYXJhbWV0cmljUmltTGlmdEZhY3RvcigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLnBhcmFtZXRyaWNSaW1MaWZ0RmFjdG9yLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgcGFyYW1ldHJpY1JpbUxpZnRGYWN0b3IodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMudW5pZm9ybXMucGFyYW1ldHJpY1JpbUxpZnRGYWN0b3IudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgb3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlKCk6IFRIUkVFLlRleHR1cmUgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5vdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmUudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCBvdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmUodmFsdWU6IFRIUkVFLlRleHR1cmUgfCBudWxsKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5vdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmUudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgb3V0bGluZVdpZHRoRmFjdG9yKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMub3V0bGluZVdpZHRoRmFjdG9yLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgb3V0bGluZVdpZHRoRmFjdG9yKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLnVuaWZvcm1zLm91dGxpbmVXaWR0aEZhY3Rvci52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBvdXRsaW5lQ29sb3JGYWN0b3IoKTogVEhSRUUuQ29sb3Ige1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLm91dGxpbmVDb2xvckZhY3Rvci52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IG91dGxpbmVDb2xvckZhY3Rvcih2YWx1ZTogVEhSRUUuQ29sb3IpIHtcbiAgICB0aGlzLnVuaWZvcm1zLm91dGxpbmVDb2xvckZhY3Rvci52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBvdXRsaW5lTGlnaHRpbmdNaXhGYWN0b3IoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5vdXRsaW5lTGlnaHRpbmdNaXhGYWN0b3IudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCBvdXRsaW5lTGlnaHRpbmdNaXhGYWN0b3IodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMudW5pZm9ybXMub3V0bGluZUxpZ2h0aW5nTWl4RmFjdG9yLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHV2QW5pbWF0aW9uTWFza1RleHR1cmUoKTogVEhSRUUuVGV4dHVyZSB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLnV2QW5pbWF0aW9uTWFza1RleHR1cmUudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCB1dkFuaW1hdGlvbk1hc2tUZXh0dXJlKHZhbHVlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCkge1xuICAgIHRoaXMudW5pZm9ybXMudXZBbmltYXRpb25NYXNrVGV4dHVyZS52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCB1dkFuaW1hdGlvblNjcm9sbFhPZmZzZXQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy51dkFuaW1hdGlvblNjcm9sbFhPZmZzZXQudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCB1dkFuaW1hdGlvblNjcm9sbFhPZmZzZXQodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMudW5pZm9ybXMudXZBbmltYXRpb25TY3JvbGxYT2Zmc2V0LnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHV2QW5pbWF0aW9uU2Nyb2xsWU9mZnNldCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLnV2QW5pbWF0aW9uU2Nyb2xsWU9mZnNldC52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IHV2QW5pbWF0aW9uU2Nyb2xsWU9mZnNldCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy51bmlmb3Jtcy51dkFuaW1hdGlvblNjcm9sbFlPZmZzZXQudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdXZBbmltYXRpb25Sb3RhdGlvblBoYXNlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMudXZBbmltYXRpb25Sb3RhdGlvblBoYXNlLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgdXZBbmltYXRpb25Sb3RhdGlvblBoYXNlKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLnVuaWZvcm1zLnV2QW5pbWF0aW9uUm90YXRpb25QaGFzZS52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIHV2QW5pbWF0aW9uU2Nyb2xsWFNwZWVkRmFjdG9yID0gMC4wO1xuICBwdWJsaWMgdXZBbmltYXRpb25TY3JvbGxZU3BlZWRGYWN0b3IgPSAwLjA7XG4gIHB1YmxpYyB1dkFuaW1hdGlvblJvdGF0aW9uU3BlZWRGYWN0b3IgPSAwLjA7XG5cbiAgLyoqXG4gICAqIFdpbGwgYmUgcmVhZCBpbiBXZWJHTFByb2dyYW1zXG4gICAqXG4gICAqIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9ibG9iLzRmNTIzNmFjM2Q2ZjQxZDkwNGFhNTg0MDFiNDA1NTRlOGZiZGNiMTUvc3JjL3JlbmRlcmVycy93ZWJnbC9XZWJHTFByb2dyYW1zLmpzI0wxOTAtTDE5MVxuICAgKi9cbiAgcHVibGljIG5vcm1hbE1hcFR5cGUgPSBUSFJFRS5UYW5nZW50U3BhY2VOb3JtYWxNYXA7XG5cbiAgLyoqXG4gICAqIFdoZW4gdGhpcyBpcyBgdHJ1ZWAsIHZlcnRleCBjb2xvcnMgd2lsbCBiZSBpZ25vcmVkLlxuICAgKiBgdHJ1ZWAgYnkgZGVmYXVsdC5cbiAgICovXG4gIHByaXZhdGUgX2lnbm9yZVZlcnRleENvbG9yID0gdHJ1ZTtcblxuICAvKipcbiAgICogV2hlbiB0aGlzIGlzIGB0cnVlYCwgdmVydGV4IGNvbG9ycyB3aWxsIGJlIGlnbm9yZWQuXG4gICAqIGB0cnVlYCBieSBkZWZhdWx0LlxuICAgKi9cbiAgcHVibGljIGdldCBpZ25vcmVWZXJ0ZXhDb2xvcigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faWdub3JlVmVydGV4Q29sb3I7XG4gIH1cbiAgcHVibGljIHNldCBpZ25vcmVWZXJ0ZXhDb2xvcih2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2lnbm9yZVZlcnRleENvbG9yID0gdmFsdWU7XG5cbiAgICB0aGlzLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX3YwQ29tcGF0U2hhZGUgPSBmYWxzZTtcblxuICAvKipcbiAgICogVGhlcmUgaXMgYSBsaW5lIG9mIHRoZSBzaGFkZXIgY2FsbGVkIFwiY29tbWVudCBvdXQgaWYgeW91IHdhbnQgdG8gUEJSIGFic29sdXRlbHlcIiBpbiBWUk0wLjAgTVRvb24uXG4gICAqIFdoZW4gdGhpcyBpcyB0cnVlLCB0aGUgbWF0ZXJpYWwgZW5hYmxlcyB0aGUgbGluZSB0byBtYWtlIGl0IGNvbXBhdGlibGUgd2l0aCB0aGUgbGVnYWN5IHJlbmRlcmluZyBvZiBWUk0uXG4gICAqIFVzdWFsbHkgbm90IHJlY29tbWVuZGVkIHRvIHR1cm4gdGhpcyBvbi5cbiAgICogYGZhbHNlYCBieSBkZWZhdWx0LlxuICAgKi9cbiAgZ2V0IHYwQ29tcGF0U2hhZGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3YwQ29tcGF0U2hhZGU7XG4gIH1cblxuICAvKipcbiAgICogVGhlcmUgaXMgYSBsaW5lIG9mIHRoZSBzaGFkZXIgY2FsbGVkIFwiY29tbWVudCBvdXQgaWYgeW91IHdhbnQgdG8gUEJSIGFic29sdXRlbHlcIiBpbiBWUk0wLjAgTVRvb24uXG4gICAqIFdoZW4gdGhpcyBpcyB0cnVlLCB0aGUgbWF0ZXJpYWwgZW5hYmxlcyB0aGUgbGluZSB0byBtYWtlIGl0IGNvbXBhdGlibGUgd2l0aCB0aGUgbGVnYWN5IHJlbmRlcmluZyBvZiBWUk0uXG4gICAqIFVzdWFsbHkgbm90IHJlY29tbWVuZGVkIHRvIHR1cm4gdGhpcyBvbi5cbiAgICogYGZhbHNlYCBieSBkZWZhdWx0LlxuICAgKi9cbiAgc2V0IHYwQ29tcGF0U2hhZGUodjogYm9vbGVhbikge1xuICAgIHRoaXMuX3YwQ29tcGF0U2hhZGUgPSB2O1xuXG4gICAgdGhpcy5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIF9kZWJ1Z01vZGU6IE1Ub29uTWF0ZXJpYWxEZWJ1Z01vZGUgPSBNVG9vbk1hdGVyaWFsRGVidWdNb2RlLk5vbmU7XG5cbiAgLyoqXG4gICAqIERlYnVnIG1vZGUgZm9yIHRoZSBtYXRlcmlhbC5cbiAgICogWW91IGNhbiB2aXN1YWxpemUgc2V2ZXJhbCBjb21wb25lbnRzIGZvciBkaWFnbm9zaXMgdXNpbmcgZGVidWcgbW9kZS5cbiAgICpcbiAgICogU2VlOiB7QGxpbmsgTVRvb25NYXRlcmlhbERlYnVnTW9kZX1cbiAgICovXG4gIGdldCBkZWJ1Z01vZGUoKTogTVRvb25NYXRlcmlhbERlYnVnTW9kZSB7XG4gICAgcmV0dXJuIHRoaXMuX2RlYnVnTW9kZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWJ1ZyBtb2RlIGZvciB0aGUgbWF0ZXJpYWwuXG4gICAqIFlvdSBjYW4gdmlzdWFsaXplIHNldmVyYWwgY29tcG9uZW50cyBmb3IgZGlhZ25vc2lzIHVzaW5nIGRlYnVnIG1vZGUuXG4gICAqXG4gICAqIFNlZToge0BsaW5rIE1Ub29uTWF0ZXJpYWxEZWJ1Z01vZGV9XG4gICAqL1xuICBzZXQgZGVidWdNb2RlKG06IE1Ub29uTWF0ZXJpYWxEZWJ1Z01vZGUpIHtcbiAgICB0aGlzLl9kZWJ1Z01vZGUgPSBtO1xuXG4gICAgdGhpcy5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIF9vdXRsaW5lV2lkdGhNb2RlOiBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZSA9IE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlLk5vbmU7XG5cbiAgZ2V0IG91dGxpbmVXaWR0aE1vZGUoKTogTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUge1xuICAgIHJldHVybiB0aGlzLl9vdXRsaW5lV2lkdGhNb2RlO1xuICB9XG4gIHNldCBvdXRsaW5lV2lkdGhNb2RlKG06IE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlKSB7XG4gICAgdGhpcy5fb3V0bGluZVdpZHRoTW9kZSA9IG07XG5cbiAgICB0aGlzLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX2lzT3V0bGluZSA9IGZhbHNlO1xuXG4gIGdldCBpc091dGxpbmUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2lzT3V0bGluZTtcbiAgfVxuICBzZXQgaXNPdXRsaW5lKGI6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9pc091dGxpbmUgPSBiO1xuXG4gICAgdGhpcy5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogUmVhZG9ubHkgYm9vbGVhbiB0aGF0IGluZGljYXRlcyB0aGlzIGlzIGEgW1tNVG9vbk1hdGVyaWFsXV0uXG4gICAqL1xuICBwdWJsaWMgZ2V0IGlzTVRvb25NYXRlcmlhbCgpOiB0cnVlIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHBhcmFtZXRlcnM6IE1Ub29uTWF0ZXJpYWxQYXJhbWV0ZXJzID0ge30pIHtcbiAgICBzdXBlcih7IHZlcnRleFNoYWRlciwgZnJhZ21lbnRTaGFkZXIgfSk7XG5cbiAgICAvLyBvdmVycmlkZSBkZXB0aFdyaXRlIHdpdGggdHJhbnNwYXJlbnRXaXRoWldyaXRlXG4gICAgaWYgKHBhcmFtZXRlcnMudHJhbnNwYXJlbnRXaXRoWldyaXRlKSB7XG4gICAgICBwYXJhbWV0ZXJzLmRlcHRoV3JpdGUgPSB0cnVlO1xuICAgIH1cbiAgICBkZWxldGUgcGFyYW1ldGVycy50cmFuc3BhcmVudFdpdGhaV3JpdGU7XG5cbiAgICAvLyA9PSBlbmFibGluZyBidW5jaCBvZiBzdHVmZiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBwYXJhbWV0ZXJzLmZvZyA9IHRydWU7XG4gICAgcGFyYW1ldGVycy5saWdodHMgPSB0cnVlO1xuICAgIHBhcmFtZXRlcnMuY2xpcHBpbmcgPSB0cnVlO1xuXG4gICAgLy8gQ09NUEFUXG4gICAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vbXJkb29iL3RocmVlLmpzL3B1bGwvMjE3ODhcbiAgICBpZiAocGFyc2VJbnQoVEhSRUUuUkVWSVNJT04sIDEwKSA8IDEyOSkge1xuICAgICAgKHBhcmFtZXRlcnMgYXMgYW55KS5za2lubmluZyA9IChwYXJhbWV0ZXJzIGFzIGFueSkuc2tpbm5pbmcgfHwgZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gQ09NUEFUXG4gICAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vbXJkb29iL3RocmVlLmpzL3B1bGwvMjIxNjlcbiAgICBpZiAocGFyc2VJbnQoVEhSRUUuUkVWSVNJT04sIDEwKSA8IDEzMSkge1xuICAgICAgKHBhcmFtZXRlcnMgYXMgYW55KS5tb3JwaFRhcmdldHMgPSAocGFyYW1ldGVycyBhcyBhbnkpLm1vcnBoVGFyZ2V0cyB8fCBmYWxzZTtcbiAgICAgIChwYXJhbWV0ZXJzIGFzIGFueSkubW9ycGhOb3JtYWxzID0gKHBhcmFtZXRlcnMgYXMgYW55KS5tb3JwaE5vcm1hbHMgfHwgZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gPT0gdW5pZm9ybXMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgdGhpcy51bmlmb3JtcyA9IFRIUkVFLlVuaWZvcm1zVXRpbHMubWVyZ2UoW1xuICAgICAgVEhSRUUuVW5pZm9ybXNMaWIuY29tbW9uLCAvLyBtYXBcbiAgICAgIFRIUkVFLlVuaWZvcm1zTGliLm5vcm1hbG1hcCwgLy8gbm9ybWFsTWFwXG4gICAgICBUSFJFRS5Vbmlmb3Jtc0xpYi5lbWlzc2l2ZW1hcCwgLy8gZW1pc3NpdmVNYXBcbiAgICAgIFRIUkVFLlVuaWZvcm1zTGliLmZvZyxcbiAgICAgIFRIUkVFLlVuaWZvcm1zTGliLmxpZ2h0cyxcbiAgICAgIHtcbiAgICAgICAgbGl0RmFjdG9yOiB7IHZhbHVlOiBuZXcgVEhSRUUuQ29sb3IoMS4wLCAxLjAsIDEuMCkgfSxcbiAgICAgICAgbWFwVXZUcmFuc2Zvcm06IHsgdmFsdWU6IG5ldyBUSFJFRS5NYXRyaXgzKCkgfSxcbiAgICAgICAgY29sb3JBbHBoYTogeyB2YWx1ZTogMS4wIH0sXG4gICAgICAgIG5vcm1hbE1hcFV2VHJhbnNmb3JtOiB7IHZhbHVlOiBuZXcgVEhSRUUuTWF0cml4MygpIH0sXG4gICAgICAgIHNoYWRlQ29sb3JGYWN0b3I6IHsgdmFsdWU6IG5ldyBUSFJFRS5Db2xvcigwLjk3LCAwLjgxLCAwLjg2KSB9LFxuICAgICAgICBzaGFkZU11bHRpcGx5VGV4dHVyZTogeyB2YWx1ZTogbnVsbCB9LFxuICAgICAgICBzaGFkZU11bHRpcGx5VGV4dHVyZVV2VHJhbnNmb3JtOiB7IHZhbHVlOiBuZXcgVEhSRUUuTWF0cml4MygpIH0sXG4gICAgICAgIHNoYWRpbmdTaGlmdEZhY3RvcjogeyB2YWx1ZTogMC4wIH0sXG4gICAgICAgIHNoYWRpbmdTaGlmdFRleHR1cmU6IHsgdmFsdWU6IG51bGwgfSxcbiAgICAgICAgc2hhZGluZ1NoaWZ0VGV4dHVyZVV2VHJhbnNmb3JtOiB7IHZhbHVlOiBuZXcgVEhSRUUuTWF0cml4MygpIH0sXG4gICAgICAgIHNoYWRpbmdTaGlmdFRleHR1cmVTY2FsZTogeyB2YWx1ZTogbnVsbCB9LFxuICAgICAgICBzaGFkaW5nVG9vbnlGYWN0b3I6IHsgdmFsdWU6IDAuOSB9LFxuICAgICAgICBnaUVxdWFsaXphdGlvbkZhY3RvcjogeyB2YWx1ZTogMC45IH0sXG4gICAgICAgIG1hdGNhcEZhY3RvcjogeyB2YWx1ZTogbmV3IFRIUkVFLkNvbG9yKDEuMCwgMS4wLCAxLjApIH0sXG4gICAgICAgIG1hdGNhcFRleHR1cmU6IHsgdmFsdWU6IG51bGwgfSxcbiAgICAgICAgbWF0Y2FwVGV4dHVyZVV2VHJhbnNmb3JtOiB7IHZhbHVlOiBuZXcgVEhSRUUuTWF0cml4MygpIH0sXG4gICAgICAgIHBhcmFtZXRyaWNSaW1Db2xvckZhY3RvcjogeyB2YWx1ZTogbmV3IFRIUkVFLkNvbG9yKDAuMCwgMC4wLCAwLjApIH0sXG4gICAgICAgIHJpbU11bHRpcGx5VGV4dHVyZTogeyB2YWx1ZTogbnVsbCB9LFxuICAgICAgICByaW1NdWx0aXBseVRleHR1cmVVdlRyYW5zZm9ybTogeyB2YWx1ZTogbmV3IFRIUkVFLk1hdHJpeDMoKSB9LFxuICAgICAgICByaW1MaWdodGluZ01peEZhY3RvcjogeyB2YWx1ZTogMC4wIH0sXG4gICAgICAgIHBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJGYWN0b3I6IHsgdmFsdWU6IDEuMCB9LFxuICAgICAgICBwYXJhbWV0cmljUmltTGlmdEZhY3RvcjogeyB2YWx1ZTogMC4wIH0sXG4gICAgICAgIGVtaXNzaXZlOiB7IHZhbHVlOiBuZXcgVEhSRUUuQ29sb3IoMC4wLCAwLjAsIDAuMCkgfSxcbiAgICAgICAgZW1pc3NpdmVNYXBVdlRyYW5zZm9ybTogeyB2YWx1ZTogbmV3IFRIUkVFLk1hdHJpeDMoKSB9LFxuICAgICAgICBvdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmU6IHsgdmFsdWU6IG51bGwgfSxcbiAgICAgICAgb3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlVXZUcmFuc2Zvcm06IHsgdmFsdWU6IG5ldyBUSFJFRS5NYXRyaXgzKCkgfSxcbiAgICAgICAgb3V0bGluZVdpZHRoRmFjdG9yOiB7IHZhbHVlOiAwLjUgfSxcbiAgICAgICAgb3V0bGluZUNvbG9yRmFjdG9yOiB7IHZhbHVlOiBuZXcgVEhSRUUuQ29sb3IoMC4wLCAwLjAsIDAuMCkgfSxcbiAgICAgICAgb3V0bGluZUxpZ2h0aW5nTWl4RmFjdG9yOiB7IHZhbHVlOiAxLjAgfSxcbiAgICAgICAgdXZBbmltYXRpb25NYXNrVGV4dHVyZTogeyB2YWx1ZTogbnVsbCB9LFxuICAgICAgICB1dkFuaW1hdGlvbk1hc2tUZXh0dXJlVXZUcmFuc2Zvcm06IHsgdmFsdWU6IG5ldyBUSFJFRS5NYXRyaXgzKCkgfSxcbiAgICAgICAgdXZBbmltYXRpb25TY3JvbGxYT2Zmc2V0OiB7IHZhbHVlOiAwLjAgfSxcbiAgICAgICAgdXZBbmltYXRpb25TY3JvbGxZT2Zmc2V0OiB7IHZhbHVlOiAwLjAgfSxcbiAgICAgICAgdXZBbmltYXRpb25Sb3RhdGlvblBoYXNlOiB7IHZhbHVlOiAwLjAgfSxcbiAgICAgIH0sXG4gICAgICBwYXJhbWV0ZXJzLnVuaWZvcm1zLFxuICAgIF0pO1xuXG4gICAgLy8gPT0gZmluYWxseSBjb21waWxlIHRoZSBzaGFkZXIgcHJvZ3JhbSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgdGhpcy5zZXRWYWx1ZXMocGFyYW1ldGVycyk7XG5cbiAgICAvLyA9PSB1cGxvYWQgdW5pZm9ybXMgdGhhdCBuZWVkIHRvIHVwbG9hZCA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICB0aGlzLl91cGxvYWRVbmlmb3Jtc1dvcmthcm91bmQoKTtcblxuICAgIC8vID09IHVwZGF0ZSBzaGFkZXIgc3R1ZmYgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHRoaXMuY3VzdG9tUHJvZ3JhbUNhY2hlS2V5ID0gKCkgPT5cbiAgICAgIFtcbiAgICAgICAgdGhpcy5faWdub3JlVmVydGV4Q29sb3IgPyAnaWdub3JlVmVydGV4Q29sb3InIDogJycsXG4gICAgICAgIHRoaXMuX3YwQ29tcGF0U2hhZGUgPyAndjBDb21wYXRTaGFkZScgOiAnJyxcbiAgICAgICAgdGhpcy5fZGVidWdNb2RlICE9PSAnbm9uZScgPyBgZGVidWdNb2RlOiR7dGhpcy5fZGVidWdNb2RlfWAgOiAnJyxcbiAgICAgICAgdGhpcy5fb3V0bGluZVdpZHRoTW9kZSAhPT0gJ25vbmUnID8gYG91dGxpbmVXaWR0aE1vZGU6JHt0aGlzLl9vdXRsaW5lV2lkdGhNb2RlfWAgOiAnJyxcbiAgICAgICAgdGhpcy5faXNPdXRsaW5lID8gJ2lzT3V0bGluZScgOiAnJyxcbiAgICAgICAgLi4uT2JqZWN0LmVudHJpZXModGhpcy5fZ2VuZXJhdGVEZWZpbmVzKCkpLm1hcCgoW3Rva2VuLCBtYWNyb10pID0+IGAke3Rva2VufToke21hY3JvfWApLFxuICAgICAgICB0aGlzLm1hdGNhcFRleHR1cmUgPyBgbWF0Y2FwVGV4dHVyZUVuY29kaW5nOiR7dGhpcy5tYXRjYXBUZXh0dXJlLmVuY29kaW5nfWAgOiAnJyxcbiAgICAgICAgdGhpcy5zaGFkZU11bHRpcGx5VGV4dHVyZSA/IGBzaGFkZU11bHRpcGx5VGV4dHVyZUVuY29kaW5nOiR7dGhpcy5zaGFkZU11bHRpcGx5VGV4dHVyZS5lbmNvZGluZ31gIDogJycsXG4gICAgICAgIHRoaXMucmltTXVsdGlwbHlUZXh0dXJlID8gYHJpbU11bHRpcGx5VGV4dHVyZUVuY29kaW5nOiR7dGhpcy5yaW1NdWx0aXBseVRleHR1cmUuZW5jb2Rpbmd9YCA6ICcnLFxuICAgICAgXS5qb2luKCcsJyk7XG5cbiAgICB0aGlzLm9uQmVmb3JlQ29tcGlsZSA9IChzaGFkZXIsIHJlbmRlcmVyKSA9PiB7XG4gICAgICAvKipcbiAgICAgICAqIFdpbGwgYmUgbmVlZGVkIHRvIGRldGVybWluZSB3aGV0aGVyIHdlIHNob3VsZCBpbmxpbmUgY29udmVydCBzUkdCIHRleHR1cmVzIG9yIG5vdC5cbiAgICAgICAqIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9wdWxsLzIyNTUxXG4gICAgICAgKi9cbiAgICAgIGNvbnN0IGlzV2ViR0wyID0gcmVuZGVyZXIuY2FwYWJpbGl0aWVzLmlzV2ViR0wyO1xuXG4gICAgICBjb25zdCB0aHJlZVJldmlzaW9uID0gcGFyc2VJbnQoVEhSRUUuUkVWSVNJT04sIDEwKTtcblxuICAgICAgY29uc3QgZGVmaW5lcyA9XG4gICAgICAgIE9iamVjdC5lbnRyaWVzKHsgLi4udGhpcy5fZ2VuZXJhdGVEZWZpbmVzKCksIC4uLnRoaXMuZGVmaW5lcyB9KVxuICAgICAgICAgIC5maWx0ZXIoKFt0b2tlbiwgbWFjcm9dKSA9PiAhIW1hY3JvKVxuICAgICAgICAgIC5tYXAoKFt0b2tlbiwgbWFjcm9dKSA9PiBgI2RlZmluZSAke3Rva2VufSAke21hY3JvfWApXG4gICAgICAgICAgLmpvaW4oJ1xcbicpICsgJ1xcbic7XG5cbiAgICAgIC8vIC0tIHRleHR1cmUgZW5jb2RpbmdzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgIGNvbnN0IGVuY29kaW5ncyA9XG4gICAgICAgICh0aGlzLm1hdGNhcFRleHR1cmUgIT09IG51bGxcbiAgICAgICAgICA/IGdldFRleGVsRGVjb2RpbmdGdW5jdGlvbihcbiAgICAgICAgICAgICAgJ21hdGNhcFRleHR1cmVUZXhlbFRvTGluZWFyJyxcbiAgICAgICAgICAgICAgZ2V0VGV4dHVyZUVuY29kaW5nRnJvbU1hcCh0aGlzLm1hdGNhcFRleHR1cmUsIGlzV2ViR0wyKSxcbiAgICAgICAgICAgICkgKyAnXFxuJ1xuICAgICAgICAgIDogJycpICtcbiAgICAgICAgKHRoaXMuc2hhZGVNdWx0aXBseVRleHR1cmUgIT09IG51bGxcbiAgICAgICAgICA/IGdldFRleGVsRGVjb2RpbmdGdW5jdGlvbihcbiAgICAgICAgICAgICAgJ3NoYWRlTXVsdGlwbHlUZXh0dXJlVGV4ZWxUb0xpbmVhcicsXG4gICAgICAgICAgICAgIGdldFRleHR1cmVFbmNvZGluZ0Zyb21NYXAodGhpcy5zaGFkZU11bHRpcGx5VGV4dHVyZSwgaXNXZWJHTDIpLFxuICAgICAgICAgICAgKSArICdcXG4nXG4gICAgICAgICAgOiAnJykgK1xuICAgICAgICAodGhpcy5yaW1NdWx0aXBseVRleHR1cmUgIT09IG51bGxcbiAgICAgICAgICA/IGdldFRleGVsRGVjb2RpbmdGdW5jdGlvbihcbiAgICAgICAgICAgICAgJ3JpbU11bHRpcGx5VGV4dHVyZVRleGVsVG9MaW5lYXInLFxuICAgICAgICAgICAgICBnZXRUZXh0dXJlRW5jb2RpbmdGcm9tTWFwKHRoaXMucmltTXVsdGlwbHlUZXh0dXJlLCBpc1dlYkdMMiksXG4gICAgICAgICAgICApICsgJ1xcbidcbiAgICAgICAgICA6ICcnKTtcblxuICAgICAgLy8gLS0gZ2VuZXJhdGUgc2hhZGVyIGNvZGUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgc2hhZGVyLnZlcnRleFNoYWRlciA9IGRlZmluZXMgKyBzaGFkZXIudmVydGV4U2hhZGVyO1xuICAgICAgc2hhZGVyLmZyYWdtZW50U2hhZGVyID0gZGVmaW5lcyArIGVuY29kaW5ncyArIHNoYWRlci5mcmFnbWVudFNoYWRlcjtcblxuICAgICAgLy8gLS0gY29tcGF0IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAvLyBDT01QQVRcbiAgICAgIC8vIFRocmVlLmpzIHIxMzIgaW50cm9kdWNlcyBuZXcgc2hhZGVyIGNodW5rcyA8bm9ybWFsX3BhcnNfZnJhZ21lbnQ+IGFuZCA8YWxwaGF0ZXN0X3BhcnNfZnJhZ21lbnQ+XG4gICAgICBpZiAodGhyZWVSZXZpc2lvbiA8IDEzMikge1xuICAgICAgICBzaGFkZXIuZnJhZ21lbnRTaGFkZXIgPSBzaGFkZXIuZnJhZ21lbnRTaGFkZXIucmVwbGFjZSgnI2luY2x1ZGUgPG5vcm1hbF9wYXJzX2ZyYWdtZW50PicsICcnKTtcbiAgICAgICAgc2hhZGVyLmZyYWdtZW50U2hhZGVyID0gc2hhZGVyLmZyYWdtZW50U2hhZGVyLnJlcGxhY2UoJyNpbmNsdWRlIDxhbHBoYXRlc3RfcGFyc19mcmFnbWVudD4nLCAnJyk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhpcyBtYXRlcmlhbC5cbiAgICpcbiAgICogQHBhcmFtIGRlbHRhIGRlbHRhVGltZSBzaW5jZSBsYXN0IHVwZGF0ZVxuICAgKi9cbiAgcHVibGljIHVwZGF0ZShkZWx0YTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fdXBsb2FkVW5pZm9ybXNXb3JrYXJvdW5kKCk7XG4gICAgdGhpcy5fdXBkYXRlVVZBbmltYXRpb24oZGVsdGEpO1xuICB9XG5cbiAgcHVibGljIGNvcHkoc291cmNlOiB0aGlzKTogdGhpcyB7XG4gICAgc3VwZXIuY29weShzb3VyY2UpO1xuICAgIC8vIHVuaWZvcm1zIGFyZSBhbHJlYWR5IGNvcGllZCBhdCB0aGlzIG1vbWVudFxuXG4gICAgLy8gQmVnaW5uaW5nIGZyb20gcjEzMywgdW5pZm9ybSB0ZXh0dXJlcyB3aWxsIGJlIGNsb25lZCBpbnN0ZWFkIG9mIHJlZmVyZW5jZVxuICAgIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9ibG9iL2E4ODEzYmUwNGE4NDliZDE1NWY3Y2Y2ZjFiMjNkOGVlMmUwZmI0OGIvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlci5qcyNMMzA0N1xuICAgIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9ibG9iL2E4ODEzYmUwNGE4NDliZDE1NWY3Y2Y2ZjFiMjNkOGVlMmUwZmI0OGIvc3JjL3JlbmRlcmVycy9zaGFkZXJzL1VuaWZvcm1zVXRpbHMuanMjTDIyXG4gICAgLy8gVGhpcyB3aWxsIGxlYXZlIHRoZWlyIGAudmVyc2lvbmAgdG8gYmUgYDBgXG4gICAgLy8gYW5kIHRoZXNlIHRleHR1cmVzIHdvbid0IGJlIHVwbG9hZGVkIHRvIEdQVVxuICAgIC8vIFdlIGFyZSBnb2luZyB0byB3b3JrYXJvdW5kIHRoaXMgaW4gaGVyZVxuICAgIC8vIEkndmUgb3BlbmVkIGFuIGlzc3VlIGZvciB0aGlzOiBodHRwczovL2dpdGh1Yi5jb20vbXJkb29iL3RocmVlLmpzL2lzc3Vlcy8yMjcxOFxuICAgIHRoaXMubWFwID0gc291cmNlLm1hcDtcbiAgICB0aGlzLm5vcm1hbE1hcCA9IHNvdXJjZS5ub3JtYWxNYXA7XG4gICAgdGhpcy5lbWlzc2l2ZU1hcCA9IHNvdXJjZS5lbWlzc2l2ZU1hcDtcbiAgICB0aGlzLnNoYWRlTXVsdGlwbHlUZXh0dXJlID0gc291cmNlLnNoYWRlTXVsdGlwbHlUZXh0dXJlO1xuICAgIHRoaXMuc2hhZGluZ1NoaWZ0VGV4dHVyZSA9IHNvdXJjZS5zaGFkaW5nU2hpZnRUZXh0dXJlO1xuICAgIHRoaXMubWF0Y2FwVGV4dHVyZSA9IHNvdXJjZS5tYXRjYXBUZXh0dXJlO1xuICAgIHRoaXMucmltTXVsdGlwbHlUZXh0dXJlID0gc291cmNlLnJpbU11bHRpcGx5VGV4dHVyZTtcbiAgICB0aGlzLm91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZSA9IHNvdXJjZS5vdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmU7XG4gICAgdGhpcy51dkFuaW1hdGlvbk1hc2tUZXh0dXJlID0gc291cmNlLnV2QW5pbWF0aW9uTWFza1RleHR1cmU7XG5cbiAgICAvLyA9PSBjb3B5IG1lbWJlcnMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICB0aGlzLm5vcm1hbE1hcFR5cGUgPSBzb3VyY2Uubm9ybWFsTWFwVHlwZTtcblxuICAgIHRoaXMudXZBbmltYXRpb25TY3JvbGxYU3BlZWRGYWN0b3IgPSBzb3VyY2UudXZBbmltYXRpb25TY3JvbGxYU3BlZWRGYWN0b3I7XG4gICAgdGhpcy51dkFuaW1hdGlvblNjcm9sbFlTcGVlZEZhY3RvciA9IHNvdXJjZS51dkFuaW1hdGlvblNjcm9sbFlTcGVlZEZhY3RvcjtcbiAgICB0aGlzLnV2QW5pbWF0aW9uUm90YXRpb25TcGVlZEZhY3RvciA9IHNvdXJjZS51dkFuaW1hdGlvblJvdGF0aW9uU3BlZWRGYWN0b3I7XG5cbiAgICB0aGlzLmlnbm9yZVZlcnRleENvbG9yID0gc291cmNlLmlnbm9yZVZlcnRleENvbG9yO1xuXG4gICAgdGhpcy52MENvbXBhdFNoYWRlID0gc291cmNlLnYwQ29tcGF0U2hhZGU7XG4gICAgdGhpcy5kZWJ1Z01vZGUgPSBzb3VyY2UuZGVidWdNb2RlO1xuICAgIHRoaXMub3V0bGluZVdpZHRoTW9kZSA9IHNvdXJjZS5vdXRsaW5lV2lkdGhNb2RlO1xuXG4gICAgdGhpcy5pc091dGxpbmUgPSBzb3VyY2UuaXNPdXRsaW5lO1xuXG4gICAgLy8gPT0gdXBkYXRlIHNoYWRlciBzdHVmZiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgdGhpcy5uZWVkc1VwZGF0ZSA9IHRydWU7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgVVYgYW5pbWF0aW9uIHN0YXRlLlxuICAgKiBJbnRlbmRlZCB0byBiZSBjYWxsZWQgdmlhIHtAbGluayB1cGRhdGV9LlxuICAgKiBAcGFyYW0gZGVsdGEgZGVsdGFUaW1lXG4gICAqL1xuICBwcml2YXRlIF91cGRhdGVVVkFuaW1hdGlvbihkZWx0YTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy51bmlmb3Jtcy51dkFuaW1hdGlvblNjcm9sbFhPZmZzZXQudmFsdWUgKz0gZGVsdGEgKiB0aGlzLnV2QW5pbWF0aW9uU2Nyb2xsWFNwZWVkRmFjdG9yO1xuICAgIHRoaXMudW5pZm9ybXMudXZBbmltYXRpb25TY3JvbGxZT2Zmc2V0LnZhbHVlICs9IGRlbHRhICogdGhpcy51dkFuaW1hdGlvblNjcm9sbFlTcGVlZEZhY3RvcjtcbiAgICB0aGlzLnVuaWZvcm1zLnV2QW5pbWF0aW9uUm90YXRpb25QaGFzZS52YWx1ZSArPSBkZWx0YSAqIHRoaXMudXZBbmltYXRpb25Sb3RhdGlvblNwZWVkRmFjdG9yO1xuXG4gICAgdGhpcy51bmlmb3Jtc05lZWRVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwbG9hZCB1bmlmb3JtcyB0aGF0IG5lZWQgdG8gdXBsb2FkIGJ1dCBkb2Vzbid0IGF1dG9tYXRpY2FsbHkgYmVjYXVzZSBvZiByZWFzb25zLlxuICAgKiBJbnRlbmRlZCB0byBiZSBjYWxsZWQgdmlhIHtAbGluayBjb25zdHJ1Y3Rvcn0gYW5kIHtAbGluayB1cGRhdGV9LlxuICAgKi9cbiAgcHJpdmF0ZSBfdXBsb2FkVW5pZm9ybXNXb3JrYXJvdW5kKCk6IHZvaWQge1xuICAgIC8vIHdvcmthcm91bmQ6IHNpbmNlIG9wYWNpdHkgaXMgZGVmaW5lZCBhcyBhIHByb3BlcnR5IGluIFRIUkVFLk1hdGVyaWFsXG4gICAgLy8gYW5kIGNhbm5vdCBiZSBvdmVycmlkZGVuIGFzIGFuIGFjY2Vzc29yLFxuICAgIC8vIFdlIGFyZSBnb2luZyB0byB1cGRhdGUgb3BhY2l0eSBoZXJlXG4gICAgdGhpcy51bmlmb3Jtcy5vcGFjaXR5LnZhbHVlID0gdGhpcy5vcGFjaXR5O1xuXG4gICAgLy8gd29ya2Fyb3VuZDogdGV4dHVyZSB0cmFuc2Zvcm1zIGFyZSBub3QgdXBkYXRlZCBhdXRvbWF0aWNhbGx5XG4gICAgdGhpcy5fdXBkYXRlVGV4dHVyZU1hdHJpeCh0aGlzLnVuaWZvcm1zLm1hcCwgdGhpcy51bmlmb3Jtcy5tYXBVdlRyYW5zZm9ybSk7XG4gICAgdGhpcy5fdXBkYXRlVGV4dHVyZU1hdHJpeCh0aGlzLnVuaWZvcm1zLm5vcm1hbE1hcCwgdGhpcy51bmlmb3Jtcy5ub3JtYWxNYXBVdlRyYW5zZm9ybSk7XG4gICAgdGhpcy5fdXBkYXRlVGV4dHVyZU1hdHJpeCh0aGlzLnVuaWZvcm1zLmVtaXNzaXZlTWFwLCB0aGlzLnVuaWZvcm1zLmVtaXNzaXZlTWFwVXZUcmFuc2Zvcm0pO1xuICAgIHRoaXMuX3VwZGF0ZVRleHR1cmVNYXRyaXgodGhpcy51bmlmb3Jtcy5zaGFkZU11bHRpcGx5VGV4dHVyZSwgdGhpcy51bmlmb3Jtcy5zaGFkZU11bHRpcGx5VGV4dHVyZVV2VHJhbnNmb3JtKTtcbiAgICB0aGlzLl91cGRhdGVUZXh0dXJlTWF0cml4KHRoaXMudW5pZm9ybXMuc2hhZGluZ1NoaWZ0VGV4dHVyZSwgdGhpcy51bmlmb3Jtcy5zaGFkaW5nU2hpZnRUZXh0dXJlVXZUcmFuc2Zvcm0pO1xuICAgIHRoaXMuX3VwZGF0ZVRleHR1cmVNYXRyaXgodGhpcy51bmlmb3Jtcy5tYXRjYXBUZXh0dXJlLCB0aGlzLnVuaWZvcm1zLm1hdGNhcFRleHR1cmVVdlRyYW5zZm9ybSk7XG4gICAgdGhpcy5fdXBkYXRlVGV4dHVyZU1hdHJpeCh0aGlzLnVuaWZvcm1zLnJpbU11bHRpcGx5VGV4dHVyZSwgdGhpcy51bmlmb3Jtcy5yaW1NdWx0aXBseVRleHR1cmVVdlRyYW5zZm9ybSk7XG4gICAgdGhpcy5fdXBkYXRlVGV4dHVyZU1hdHJpeChcbiAgICAgIHRoaXMudW5pZm9ybXMub3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlLFxuICAgICAgdGhpcy51bmlmb3Jtcy5vdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmVVdlRyYW5zZm9ybSxcbiAgICApO1xuICAgIHRoaXMuX3VwZGF0ZVRleHR1cmVNYXRyaXgodGhpcy51bmlmb3Jtcy51dkFuaW1hdGlvbk1hc2tUZXh0dXJlLCB0aGlzLnVuaWZvcm1zLnV2QW5pbWF0aW9uTWFza1RleHR1cmVVdlRyYW5zZm9ybSk7XG5cbiAgICAvLyBDT01QQVQgd29ya2Fyb3VuZDogc3RhcnRpbmcgZnJvbSByMTMyLCBhbHBoYVRlc3QgYmVjb21lcyBhIHVuaWZvcm0gaW5zdGVhZCBvZiBwcmVwcm9jZXNzb3IgdmFsdWVcbiAgICBjb25zdCB0aHJlZVJldmlzaW9uID0gcGFyc2VJbnQoVEhSRUUuUkVWSVNJT04sIDEwKTtcblxuICAgIGlmICh0aHJlZVJldmlzaW9uID49IDEzMikge1xuICAgICAgdGhpcy51bmlmb3Jtcy5hbHBoYVRlc3QudmFsdWUgPSB0aGlzLmFscGhhVGVzdDtcbiAgICB9XG5cbiAgICB0aGlzLnVuaWZvcm1zTmVlZFVwZGF0ZSA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIG1hcCBvYmplY3Qgb2YgcHJlcHJvY2Vzc29yIHRva2VuIGFuZCBtYWNybyBvZiB0aGUgc2hhZGVyIHByb2dyYW0uXG4gICAqL1xuICBwcml2YXRlIF9nZW5lcmF0ZURlZmluZXMoKTogeyBbdG9rZW46IHN0cmluZ106IGJvb2xlYW4gfCBudW1iZXIgfCBzdHJpbmcgfSB7XG4gICAgY29uc3QgdGhyZWVSZXZpc2lvbiA9IHBhcnNlSW50KFRIUkVFLlJFVklTSU9OLCAxMCk7XG5cbiAgICBjb25zdCB1c2VVdkluVmVydCA9IHRoaXMub3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlICE9PSBudWxsO1xuICAgIGNvbnN0IHVzZVV2SW5GcmFnID1cbiAgICAgIHRoaXMubWFwICE9PSBudWxsIHx8XG4gICAgICB0aGlzLmVtaXNzaXZlTWFwICE9PSBudWxsIHx8XG4gICAgICB0aGlzLnNoYWRlTXVsdGlwbHlUZXh0dXJlICE9PSBudWxsIHx8XG4gICAgICB0aGlzLnNoYWRpbmdTaGlmdFRleHR1cmUgIT09IG51bGwgfHxcbiAgICAgIHRoaXMucmltTXVsdGlwbHlUZXh0dXJlICE9PSBudWxsIHx8XG4gICAgICB0aGlzLnV2QW5pbWF0aW9uTWFza1RleHR1cmUgIT09IG51bGw7XG5cbiAgICByZXR1cm4ge1xuICAgICAgLy8gVGVtcG9yYXJ5IGNvbXBhdCBhZ2FpbnN0IHNoYWRlciBjaGFuZ2UgQCBUaHJlZS5qcyByMTI2XG4gICAgICAvLyBTZWU6ICMyMTIwNSwgIzIxMzA3LCAjMjEyOTlcbiAgICAgIFRIUkVFX1ZSTV9USFJFRV9SRVZJU0lPTjogdGhyZWVSZXZpc2lvbixcblxuICAgICAgT1VUTElORTogdGhpcy5faXNPdXRsaW5lLFxuICAgICAgTVRPT05fVVNFX1VWOiB1c2VVdkluVmVydCB8fCB1c2VVdkluRnJhZywgLy8gd2UgY2FuJ3QgdXNlIGBVU0VfVVZgICwgaXQgd2lsbCBiZSByZWRlZmluZWQgaW4gV2ViR0xQcm9ncmFtLmpzXG4gICAgICBNVE9PTl9VVlNfVkVSVEVYX09OTFk6IHVzZVV2SW5WZXJ0ICYmICF1c2VVdkluRnJhZyxcbiAgICAgIFYwX0NPTVBBVF9TSEFERTogdGhpcy5fdjBDb21wYXRTaGFkZSxcbiAgICAgIFVTRV9TSEFERU1VTFRJUExZVEVYVFVSRTogdGhpcy5zaGFkZU11bHRpcGx5VGV4dHVyZSAhPT0gbnVsbCxcbiAgICAgIFVTRV9TSEFESU5HU0hJRlRURVhUVVJFOiB0aGlzLnNoYWRpbmdTaGlmdFRleHR1cmUgIT09IG51bGwsXG4gICAgICBVU0VfTUFUQ0FQVEVYVFVSRTogdGhpcy5tYXRjYXBUZXh0dXJlICE9PSBudWxsLFxuICAgICAgVVNFX1JJTU1VTFRJUExZVEVYVFVSRTogdGhpcy5yaW1NdWx0aXBseVRleHR1cmUgIT09IG51bGwsXG4gICAgICBVU0VfT1VUTElORVdJRFRITVVMVElQTFlURVhUVVJFOiB0aGlzLm91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZSAhPT0gbnVsbCxcbiAgICAgIFVTRV9VVkFOSU1BVElPTk1BU0tURVhUVVJFOiB0aGlzLnV2QW5pbWF0aW9uTWFza1RleHR1cmUgIT09IG51bGwsXG4gICAgICBJR05PUkVfVkVSVEVYX0NPTE9SOiB0aGlzLl9pZ25vcmVWZXJ0ZXhDb2xvciA9PT0gdHJ1ZSxcbiAgICAgIERFQlVHX05PUk1BTDogdGhpcy5fZGVidWdNb2RlID09PSAnbm9ybWFsJyxcbiAgICAgIERFQlVHX0xJVFNIQURFUkFURTogdGhpcy5fZGVidWdNb2RlID09PSAnbGl0U2hhZGVSYXRlJyxcbiAgICAgIERFQlVHX1VWOiB0aGlzLl9kZWJ1Z01vZGUgPT09ICd1dicsXG4gICAgICBPVVRMSU5FX1dJRFRIX1dPUkxEOiB0aGlzLl9vdXRsaW5lV2lkdGhNb2RlID09PSBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZS5Xb3JsZENvb3JkaW5hdGVzLFxuICAgICAgT1VUTElORV9XSURUSF9TQ1JFRU46IHRoaXMuX291dGxpbmVXaWR0aE1vZGUgPT09IE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlLlNjcmVlbkNvb3JkaW5hdGVzLFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVUZXh0dXJlTWF0cml4KHNyYzogVEhSRUUuSVVuaWZvcm08VEhSRUUuVGV4dHVyZSB8IG51bGw+LCBkc3Q6IFRIUkVFLklVbmlmb3JtPFRIUkVFLk1hdHJpeDM+KTogdm9pZCB7XG4gICAgaWYgKHNyYy52YWx1ZSkge1xuICAgICAgaWYgKHNyYy52YWx1ZS5tYXRyaXhBdXRvVXBkYXRlKSB7XG4gICAgICAgIHNyYy52YWx1ZS51cGRhdGVNYXRyaXgoKTtcbiAgICAgIH1cblxuICAgICAgZHN0LnZhbHVlLmNvcHkoc3JjLnZhbHVlLm1hdHJpeCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBHTFRGUGFyc2VyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlcic7XG5pbXBvcnQgeyBNVG9vbk1hdGVyaWFsUGFyYW1ldGVycyB9IGZyb20gJy4vTVRvb25NYXRlcmlhbFBhcmFtZXRlcnMnO1xuXG4vKipcbiAqIE1hdGVyaWFsUGFyYW1ldGVycyBoYXRlcyBgdW5kZWZpbmVkYC4gVGhpcyBoZWxwZXIgYXV0b21hdGljYWxseSByZWplY3RzIGFzc2lnbiBvZiB0aGVzZSBgdW5kZWZpbmVkYC5cbiAqIEl0IGFsc28gaGFuZGxlcyBhc3luY2hyb25vdXMgcHJvY2VzcyBvZiB0ZXh0dXJlcy5cbiAqIE1ha2Ugc3VyZSBhd2FpdCBmb3Ige0BsaW5rIEdMVEZNVG9vbk1hdGVyaWFsUGFyYW1zQXNzaWduSGVscGVyLnBlbmRpbmd9LlxuICovXG5leHBvcnQgY2xhc3MgR0xURk1Ub29uTWF0ZXJpYWxQYXJhbXNBc3NpZ25IZWxwZXIge1xuICBwcml2YXRlIHJlYWRvbmx5IF9wYXJzZXI6IEdMVEZQYXJzZXI7XG4gIHByaXZhdGUgX21hdGVyaWFsUGFyYW1zOiBNVG9vbk1hdGVyaWFsUGFyYW1ldGVycztcbiAgcHJpdmF0ZSBfcGVuZGluZ3M6IFByb21pc2U8YW55PltdO1xuXG4gIHB1YmxpYyBnZXQgcGVuZGluZygpOiBQcm9taXNlPHVua25vd24+IHtcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwodGhpcy5fcGVuZGluZ3MpO1xuICB9XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBhcnNlcjogR0xURlBhcnNlciwgbWF0ZXJpYWxQYXJhbXM6IE1Ub29uTWF0ZXJpYWxQYXJhbWV0ZXJzKSB7XG4gICAgdGhpcy5fcGFyc2VyID0gcGFyc2VyO1xuICAgIHRoaXMuX21hdGVyaWFsUGFyYW1zID0gbWF0ZXJpYWxQYXJhbXM7XG4gICAgdGhpcy5fcGVuZGluZ3MgPSBbXTtcbiAgfVxuXG4gIHB1YmxpYyBhc3NpZ25QcmltaXRpdmU8VCBleHRlbmRzIGtleW9mIE1Ub29uTWF0ZXJpYWxQYXJhbWV0ZXJzPihrZXk6IFQsIHZhbHVlOiBNVG9vbk1hdGVyaWFsUGFyYW1ldGVyc1tUXSk6IHZvaWQge1xuICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9tYXRlcmlhbFBhcmFtc1trZXldID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFzc2lnbkNvbG9yPFQgZXh0ZW5kcyBrZXlvZiBNVG9vbk1hdGVyaWFsUGFyYW1ldGVycz4oXG4gICAga2V5OiBULFxuICAgIHZhbHVlOiBudW1iZXJbXSB8IHVuZGVmaW5lZCxcbiAgICBjb252ZXJ0U1JHQlRvTGluZWFyPzogYm9vbGVhbixcbiAgKTogdm9pZCB7XG4gICAgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX21hdGVyaWFsUGFyYW1zW2tleV0gPSBuZXcgVEhSRUUuQ29sb3IoKS5mcm9tQXJyYXkodmFsdWUpO1xuXG4gICAgICBpZiAoY29udmVydFNSR0JUb0xpbmVhcikge1xuICAgICAgICB0aGlzLl9tYXRlcmlhbFBhcmFtc1trZXldLmNvbnZlcnRTUkdCVG9MaW5lYXIoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgYXNzaWduVGV4dHVyZTxUIGV4dGVuZHMga2V5b2YgTVRvb25NYXRlcmlhbFBhcmFtZXRlcnM+KFxuICAgIGtleTogVCxcbiAgICB0ZXh0dXJlOiB7IGluZGV4OiBudW1iZXIgfSB8IHVuZGVmaW5lZCxcbiAgICBpc0NvbG9yVGV4dHVyZTogYm9vbGVhbixcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcHJvbWlzZSA9IChhc3luYyAoKSA9PiB7XG4gICAgICBpZiAodGV4dHVyZSAhPSBudWxsKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuX3BhcnNlci5hc3NpZ25UZXh0dXJlKHRoaXMuX21hdGVyaWFsUGFyYW1zLCBrZXksIHRleHR1cmUpO1xuXG4gICAgICAgIGlmIChpc0NvbG9yVGV4dHVyZSkge1xuICAgICAgICAgIHRoaXMuX21hdGVyaWFsUGFyYW1zW2tleV0uZW5jb2RpbmcgPSBUSFJFRS5zUkdCRW5jb2Rpbmc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KSgpO1xuXG4gICAgdGhpcy5fcGVuZGluZ3MucHVzaChwcm9taXNlKTtcblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGFzc2lnblRleHR1cmVCeUluZGV4PFQgZXh0ZW5kcyBrZXlvZiBNVG9vbk1hdGVyaWFsUGFyYW1ldGVycz4oXG4gICAga2V5OiBULFxuICAgIHRleHR1cmVJbmRleDogbnVtYmVyIHwgdW5kZWZpbmVkLFxuICAgIGlzQ29sb3JUZXh0dXJlOiBib29sZWFuLFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5hc3NpZ25UZXh0dXJlKGtleSwgdGV4dHVyZUluZGV4ICE9IG51bGwgPyB7IGluZGV4OiB0ZXh0dXJlSW5kZXggfSA6IHVuZGVmaW5lZCwgaXNDb2xvclRleHR1cmUpO1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgKiBhcyBWMU1Ub29uU2NoZW1hIGZyb20gJ0BwaXhpdi90eXBlcy12cm1jLW1hdGVyaWFscy1tdG9vbi0xLjAnO1xuaW1wb3J0IHR5cGUgeyBHTFRGLCBHTFRGTG9hZGVyUGx1Z2luLCBHTFRGUGFyc2VyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlcic7XG5pbXBvcnQgeyBNVG9vbk1hdGVyaWFsIH0gZnJvbSAnLi9NVG9vbk1hdGVyaWFsJztcbmltcG9ydCB0eXBlIHsgTVRvb25NYXRlcmlhbFBhcmFtZXRlcnMgfSBmcm9tICcuL01Ub29uTWF0ZXJpYWxQYXJhbWV0ZXJzJztcbmltcG9ydCB7IE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlIH0gZnJvbSAnLi9NVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZSc7XG5pbXBvcnQgeyBHTFRGTVRvb25NYXRlcmlhbFBhcmFtc0Fzc2lnbkhlbHBlciB9IGZyb20gJy4vR0xURk1Ub29uTWF0ZXJpYWxQYXJhbXNBc3NpZ25IZWxwZXInO1xuaW1wb3J0IHsgTVRvb25NYXRlcmlhbExvYWRlclBsdWdpbk9wdGlvbnMgfSBmcm9tICcuL01Ub29uTWF0ZXJpYWxMb2FkZXJQbHVnaW5PcHRpb25zJztcbmltcG9ydCB0eXBlIHsgTVRvb25NYXRlcmlhbERlYnVnTW9kZSB9IGZyb20gJy4vTVRvb25NYXRlcmlhbERlYnVnTW9kZSc7XG5cbmV4cG9ydCBjbGFzcyBNVG9vbk1hdGVyaWFsTG9hZGVyUGx1Z2luIGltcGxlbWVudHMgR0xURkxvYWRlclBsdWdpbiB7XG4gIHB1YmxpYyBzdGF0aWMgRVhURU5TSU9OX05BTUUgPSAnVlJNQ19tYXRlcmlhbHNfbXRvb24nO1xuXG4gIC8qKlxuICAgKiBUaGlzIHZhbHVlIHdpbGwgYmUgYWRkZWQgdG8gYHJlbmRlck9yZGVyYCBvZiBldmVyeSBtZXNoZXMgd2hvIGhhdmUgTWF0ZXJpYWxzTVRvb24uXG4gICAqIFRoZSBmaW5hbCByZW5kZXJPcmRlciB3aWxsIGJlIHN1bSBvZiB0aGlzIGByZW5kZXJPcmRlck9mZnNldGAgYW5kIGByZW5kZXJRdWV1ZU9mZnNldE51bWJlcmAgZm9yIGVhY2ggbWF0ZXJpYWxzLlxuICAgKiBgMGAgYnkgZGVmYXVsdC5cbiAgICovXG4gIHB1YmxpYyByZW5kZXJPcmRlck9mZnNldDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGVyZSBpcyBhIGxpbmUgb2YgdGhlIHNoYWRlciBjYWxsZWQgXCJjb21tZW50IG91dCBpZiB5b3Ugd2FudCB0byBQQlIgYWJzb2x1dGVseVwiIGluIFZSTTAuMCBNVG9vbi5cbiAgICogV2hlbiB0aGlzIGlzIHRydWUsIHRoZSBtYXRlcmlhbCBlbmFibGVzIHRoZSBsaW5lIHRvIG1ha2UgaXQgY29tcGF0aWJsZSB3aXRoIHRoZSBsZWdhY3kgcmVuZGVyaW5nIG9mIFZSTS5cbiAgICogVXN1YWxseSBub3QgcmVjb21tZW5kZWQgdG8gdHVybiB0aGlzIG9uLlxuICAgKiBgZmFsc2VgIGJ5IGRlZmF1bHQuXG4gICAqL1xuICBwdWJsaWMgdjBDb21wYXRTaGFkZTogYm9vbGVhbjtcblxuICAvKipcbiAgICogRGVidWcgbW9kZSBmb3IgdGhlIG1hdGVyaWFsLlxuICAgKiBZb3UgY2FuIHZpc3VhbGl6ZSBzZXZlcmFsIGNvbXBvbmVudHMgZm9yIGRpYWdub3NpcyB1c2luZyBkZWJ1ZyBtb2RlLlxuICAgKlxuICAgKiBTZWU6IHtAbGluayBNVG9vbk1hdGVyaWFsRGVidWdNb2RlfVxuICAgKi9cbiAgcHVibGljIGRlYnVnTW9kZTogTVRvb25NYXRlcmlhbERlYnVnTW9kZTtcblxuICBwdWJsaWMgcmVhZG9ubHkgcGFyc2VyOiBHTFRGUGFyc2VyO1xuXG4gIC8qKlxuICAgKiBMb2FkZWQgbWF0ZXJpYWxzIHdpbGwgYmUgc3RvcmVkIGluIHRoaXMgc2V0LlxuICAgKiBXaWxsIGJlIHRyYW5zZmVycmVkIGludG8gYGdsdGYudXNlckRhdGEudnJtTVRvb25NYXRlcmlhbHNgIGluIHtAbGluayBhZnRlclJvb3R9LlxuICAgKi9cbiAgcHJpdmF0ZSByZWFkb25seSBfbVRvb25NYXRlcmlhbFNldDogU2V0PE1Ub29uTWF0ZXJpYWw+O1xuXG4gIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBNVG9vbk1hdGVyaWFsTG9hZGVyUGx1Z2luLkVYVEVOU0lPTl9OQU1FO1xuICB9XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBhcnNlcjogR0xURlBhcnNlciwgb3B0aW9uczogTVRvb25NYXRlcmlhbExvYWRlclBsdWdpbk9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMucGFyc2VyID0gcGFyc2VyO1xuXG4gICAgdGhpcy5yZW5kZXJPcmRlck9mZnNldCA9IG9wdGlvbnMucmVuZGVyT3JkZXJPZmZzZXQgPz8gMDtcbiAgICB0aGlzLnYwQ29tcGF0U2hhZGUgPSBvcHRpb25zLnYwQ29tcGF0U2hhZGUgPz8gZmFsc2U7XG4gICAgdGhpcy5kZWJ1Z01vZGUgPSBvcHRpb25zLmRlYnVnTW9kZSA/PyAnbm9uZSc7XG5cbiAgICB0aGlzLl9tVG9vbk1hdGVyaWFsU2V0ID0gbmV3IFNldCgpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGJlZm9yZVJvb3QoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5fcmVtb3ZlVW5saXRFeHRlbnNpb25JZk1Ub29uRXhpc3RzKCk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgYWZ0ZXJSb290KGdsdGY6IEdMVEYpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBnbHRmLnVzZXJEYXRhLnZybU1Ub29uTWF0ZXJpYWxzID0gQXJyYXkuZnJvbSh0aGlzLl9tVG9vbk1hdGVyaWFsU2V0KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRNYXRlcmlhbFR5cGUobWF0ZXJpYWxJbmRleDogbnVtYmVyKTogdHlwZW9mIFRIUkVFLk1hdGVyaWFsIHwgbnVsbCB7XG4gICAgY29uc3QgdjFFeHRlbnNpb24gPSB0aGlzLl9nZXRNVG9vbkV4dGVuc2lvbihtYXRlcmlhbEluZGV4KTtcbiAgICBpZiAodjFFeHRlbnNpb24pIHtcbiAgICAgIHJldHVybiBNVG9vbk1hdGVyaWFsO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHVibGljIGV4dGVuZE1hdGVyaWFsUGFyYW1zKG1hdGVyaWFsSW5kZXg6IG51bWJlciwgbWF0ZXJpYWxQYXJhbXM6IE1Ub29uTWF0ZXJpYWxQYXJhbWV0ZXJzKTogUHJvbWlzZTxhbnk+IHwgbnVsbCB7XG4gICAgY29uc3QgZXh0ZW5zaW9uID0gdGhpcy5fZ2V0TVRvb25FeHRlbnNpb24obWF0ZXJpYWxJbmRleCk7XG4gICAgaWYgKGV4dGVuc2lvbikge1xuICAgICAgcmV0dXJuIHRoaXMuX2V4dGVuZE1hdGVyaWFsUGFyYW1zKGV4dGVuc2lvbiwgbWF0ZXJpYWxQYXJhbXMpO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGxvYWRNZXNoKG1lc2hJbmRleDogbnVtYmVyKTogUHJvbWlzZTxUSFJFRS5Hcm91cCB8IFRIUkVFLk1lc2ggfCBUSFJFRS5Ta2lubmVkTWVzaD4ge1xuICAgIGNvbnN0IHBhcnNlciA9IHRoaXMucGFyc2VyO1xuICAgIGNvbnN0IGpzb24gPSBwYXJzZXIuanNvbjtcblxuICAgIGNvbnN0IG1lc2hEZWYgPSBqc29uLm1lc2hlc1ttZXNoSW5kZXhdO1xuICAgIGNvbnN0IHByaW1pdGl2ZXNEZWYgPSBtZXNoRGVmLnByaW1pdGl2ZXM7XG5cbiAgICBjb25zdCBtZXNoT3JHcm91cCA9IGF3YWl0IHBhcnNlci5sb2FkTWVzaChtZXNoSW5kZXgpO1xuXG4gICAgaWYgKHByaW1pdGl2ZXNEZWYubGVuZ3RoID09PSAxKSB7XG4gICAgICBjb25zdCBtZXNoID0gbWVzaE9yR3JvdXAgYXMgVEhSRUUuTWVzaDtcbiAgICAgIGNvbnN0IG1hdGVyaWFsSW5kZXggPSBwcmltaXRpdmVzRGVmWzBdLm1hdGVyaWFsIGFzIG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAgICAgaWYgKG1hdGVyaWFsSW5kZXggIT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9zZXR1cFByaW1pdGl2ZShtZXNoLCBtYXRlcmlhbEluZGV4KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZ3JvdXAgPSBtZXNoT3JHcm91cCBhcyBUSFJFRS5Hcm91cDtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJpbWl0aXZlc0RlZi5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBtZXNoID0gZ3JvdXAuY2hpbGRyZW5baV0gYXMgVEhSRUUuTWVzaDtcbiAgICAgICAgY29uc3QgbWF0ZXJpYWxJbmRleCA9IHByaW1pdGl2ZXNEZWZbaV0ubWF0ZXJpYWwgYXMgbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG4gICAgICAgIGlmIChtYXRlcmlhbEluZGV4ICE9IG51bGwpIHtcbiAgICAgICAgICB0aGlzLl9zZXR1cFByaW1pdGl2ZShtZXNoLCBtYXRlcmlhbEluZGV4KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBtZXNoT3JHcm91cDtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgdXNlIG9mIGBLSFJfbWF0ZXJpYWxzX3VubGl0YCBmcm9tIGl0cyBgbWF0ZXJpYWxzYCBpZiB0aGUgbWF0ZXJpYWwgaXMgdXNpbmcgTVRvb24uXG4gICAqXG4gICAqIFNpbmNlIEdMVEZMb2FkZXIgaGF2ZSBzbyBtYW55IGhhcmRjb2RlZCBwcm9jZWR1cmUgcmVsYXRlZCB0byBgS0hSX21hdGVyaWFsc191bmxpdGBcbiAgICogd2UgaGF2ZSB0byBkZWxldGUgdGhlIGV4dGVuc2lvbiBiZWZvcmUgd2Ugc3RhcnQgdG8gcGFyc2UgdGhlIGdsVEYuXG4gICAqL1xuICBwcml2YXRlIF9yZW1vdmVVbmxpdEV4dGVuc2lvbklmTVRvb25FeGlzdHMoKTogdm9pZCB7XG4gICAgY29uc3QgcGFyc2VyID0gdGhpcy5wYXJzZXI7XG4gICAgY29uc3QganNvbiA9IHBhcnNlci5qc29uO1xuXG4gICAgY29uc3QgbWF0ZXJpYWxEZWZzOiBhbnlbXSA9IGpzb24ubWF0ZXJpYWxzO1xuICAgIG1hdGVyaWFsRGVmcy5tYXAoKG1hdGVyaWFsRGVmLCBpTWF0ZXJpYWwpID0+IHtcbiAgICAgIGNvbnN0IGV4dGVuc2lvbiA9IHRoaXMuX2dldE1Ub29uRXh0ZW5zaW9uKGlNYXRlcmlhbCk7XG5cbiAgICAgIGlmIChleHRlbnNpb24gJiYgbWF0ZXJpYWxEZWYuZXh0ZW5zaW9ucz8uWydLSFJfbWF0ZXJpYWxzX3VubGl0J10pIHtcbiAgICAgICAgZGVsZXRlIG1hdGVyaWFsRGVmLmV4dGVuc2lvbnNbJ0tIUl9tYXRlcmlhbHNfdW5saXQnXTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldE1Ub29uRXh0ZW5zaW9uKG1hdGVyaWFsSW5kZXg6IG51bWJlcik6IFYxTVRvb25TY2hlbWEuVlJNQ01hdGVyaWFsc01Ub29uIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBwYXJzZXIgPSB0aGlzLnBhcnNlcjtcbiAgICBjb25zdCBqc29uID0gcGFyc2VyLmpzb247XG5cbiAgICBjb25zdCBtYXRlcmlhbERlZiA9IGpzb24ubWF0ZXJpYWxzW21hdGVyaWFsSW5kZXhdO1xuXG4gICAgY29uc3QgZXh0ZW5zaW9uOiBWMU1Ub29uU2NoZW1hLlZSTUNNYXRlcmlhbHNNVG9vbiB8IHVuZGVmaW5lZCA9XG4gICAgICBtYXRlcmlhbERlZi5leHRlbnNpb25zPy5bTVRvb25NYXRlcmlhbExvYWRlclBsdWdpbi5FWFRFTlNJT05fTkFNRV07XG4gICAgaWYgKGV4dGVuc2lvbiA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGNvbnN0IHNwZWNWZXJzaW9uID0gZXh0ZW5zaW9uLnNwZWNWZXJzaW9uO1xuICAgIGlmIChzcGVjVmVyc2lvbiAhPT0gJzEuMC1iZXRhJykge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICByZXR1cm4gZXh0ZW5zaW9uO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfZXh0ZW5kTWF0ZXJpYWxQYXJhbXMoXG4gICAgZXh0ZW5zaW9uOiBWMU1Ub29uU2NoZW1hLlZSTUNNYXRlcmlhbHNNVG9vbixcbiAgICBtYXRlcmlhbFBhcmFtczogTVRvb25NYXRlcmlhbFBhcmFtZXRlcnMsXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIC8vIFJlbW92aW5nIG1hdGVyaWFsIHBhcmFtcyB0aGF0IGlzIG5vdCByZXF1aXJlZCB0byBzdXByZXNzIHdhcm5pbmdzLlxuICAgIGRlbGV0ZSAobWF0ZXJpYWxQYXJhbXMgYXMgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWxQYXJhbWV0ZXJzKS5tZXRhbG5lc3M7XG4gICAgZGVsZXRlIChtYXRlcmlhbFBhcmFtcyBhcyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbFBhcmFtZXRlcnMpLnJvdWdobmVzcztcblxuICAgIGNvbnN0IGFzc2lnbkhlbHBlciA9IG5ldyBHTFRGTVRvb25NYXRlcmlhbFBhcmFtc0Fzc2lnbkhlbHBlcih0aGlzLnBhcnNlciwgbWF0ZXJpYWxQYXJhbXMpO1xuXG4gICAgYXNzaWduSGVscGVyLmFzc2lnblByaW1pdGl2ZSgndHJhbnNwYXJlbnRXaXRoWldyaXRlJywgZXh0ZW5zaW9uLnRyYW5zcGFyZW50V2l0aFpXcml0ZSk7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnbkNvbG9yKCdzaGFkZUNvbG9yRmFjdG9yJywgZXh0ZW5zaW9uLnNoYWRlQ29sb3JGYWN0b3IpO1xuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25UZXh0dXJlKCdzaGFkZU11bHRpcGx5VGV4dHVyZScsIGV4dGVuc2lvbi5zaGFkZU11bHRpcGx5VGV4dHVyZSwgdHJ1ZSk7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnblByaW1pdGl2ZSgnc2hhZGluZ1NoaWZ0RmFjdG9yJywgZXh0ZW5zaW9uLnNoYWRpbmdTaGlmdEZhY3Rvcik7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnblRleHR1cmUoJ3NoYWRpbmdTaGlmdFRleHR1cmUnLCBleHRlbnNpb24uc2hhZGluZ1NoaWZ0VGV4dHVyZSwgdHJ1ZSk7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnblByaW1pdGl2ZSgnc2hhZGluZ1NoaWZ0VGV4dHVyZVNjYWxlJywgZXh0ZW5zaW9uLnNoYWRpbmdTaGlmdFRleHR1cmU/LnNjYWxlKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduUHJpbWl0aXZlKCdzaGFkaW5nVG9vbnlGYWN0b3InLCBleHRlbnNpb24uc2hhZGluZ1Rvb255RmFjdG9yKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduUHJpbWl0aXZlKCdnaUVxdWFsaXphdGlvbkZhY3RvcicsIGV4dGVuc2lvbi5naUVxdWFsaXphdGlvbkZhY3Rvcik7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnbkNvbG9yKCdtYXRjYXBGYWN0b3InLCBleHRlbnNpb24ubWF0Y2FwRmFjdG9yKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduVGV4dHVyZSgnbWF0Y2FwVGV4dHVyZScsIGV4dGVuc2lvbi5tYXRjYXBUZXh0dXJlLCB0cnVlKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduQ29sb3IoJ3BhcmFtZXRyaWNSaW1Db2xvckZhY3RvcicsIGV4dGVuc2lvbi5wYXJhbWV0cmljUmltQ29sb3JGYWN0b3IpO1xuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25UZXh0dXJlKCdyaW1NdWx0aXBseVRleHR1cmUnLCBleHRlbnNpb24ucmltTXVsdGlwbHlUZXh0dXJlLCB0cnVlKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduUHJpbWl0aXZlKCdyaW1MaWdodGluZ01peEZhY3RvcicsIGV4dGVuc2lvbi5yaW1MaWdodGluZ01peEZhY3Rvcik7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnblByaW1pdGl2ZSgncGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlckZhY3RvcicsIGV4dGVuc2lvbi5wYXJhbWV0cmljUmltRnJlc25lbFBvd2VyRmFjdG9yKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduUHJpbWl0aXZlKCdwYXJhbWV0cmljUmltTGlmdEZhY3RvcicsIGV4dGVuc2lvbi5wYXJhbWV0cmljUmltTGlmdEZhY3Rvcik7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnblByaW1pdGl2ZSgnb3V0bGluZVdpZHRoTW9kZScsIGV4dGVuc2lvbi5vdXRsaW5lV2lkdGhNb2RlIGFzIE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduUHJpbWl0aXZlKCdvdXRsaW5lV2lkdGhGYWN0b3InLCBleHRlbnNpb24ub3V0bGluZVdpZHRoRmFjdG9yKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduVGV4dHVyZSgnb3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlJywgZXh0ZW5zaW9uLm91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZSwgZmFsc2UpO1xuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25Db2xvcignb3V0bGluZUNvbG9yRmFjdG9yJywgZXh0ZW5zaW9uLm91dGxpbmVDb2xvckZhY3Rvcik7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnblByaW1pdGl2ZSgnb3V0bGluZUxpZ2h0aW5nTWl4RmFjdG9yJywgZXh0ZW5zaW9uLm91dGxpbmVMaWdodGluZ01peEZhY3Rvcik7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnblRleHR1cmUoJ3V2QW5pbWF0aW9uTWFza1RleHR1cmUnLCBleHRlbnNpb24udXZBbmltYXRpb25NYXNrVGV4dHVyZSwgZmFsc2UpO1xuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25QcmltaXRpdmUoJ3V2QW5pbWF0aW9uU2Nyb2xsWFNwZWVkRmFjdG9yJywgZXh0ZW5zaW9uLnV2QW5pbWF0aW9uU2Nyb2xsWFNwZWVkRmFjdG9yKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduUHJpbWl0aXZlKCd1dkFuaW1hdGlvblNjcm9sbFlTcGVlZEZhY3RvcicsIGV4dGVuc2lvbi51dkFuaW1hdGlvblNjcm9sbFlTcGVlZEZhY3Rvcik7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnblByaW1pdGl2ZSgndXZBbmltYXRpb25Sb3RhdGlvblNwZWVkRmFjdG9yJywgZXh0ZW5zaW9uLnV2QW5pbWF0aW9uUm90YXRpb25TcGVlZEZhY3Rvcik7XG5cbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduUHJpbWl0aXZlKCd2MENvbXBhdFNoYWRlJywgdGhpcy52MENvbXBhdFNoYWRlKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduUHJpbWl0aXZlKCdkZWJ1Z01vZGUnLCB0aGlzLmRlYnVnTW9kZSk7XG5cbiAgICBhd2FpdCBhc3NpZ25IZWxwZXIucGVuZGluZztcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIHdpbGwgZG8gdHdvIHByb2Nlc3NlcyB0aGF0IGlzIHJlcXVpcmVkIHRvIHJlbmRlciBNVG9vbiBwcm9wZXJseS5cbiAgICpcbiAgICogLSBTZXQgcmVuZGVyIG9yZGVyXG4gICAqIC0gR2VuZXJhdGUgb3V0bGluZVxuICAgKlxuICAgKiBAcGFyYW0gbWVzaCBBIHRhcmdldCBHTFRGIHByaW1pdGl2ZVxuICAgKiBAcGFyYW0gbWF0ZXJpYWxJbmRleCBUaGUgbWF0ZXJpYWwgaW5kZXggb2YgdGhlIHByaW1pdGl2ZVxuICAgKi9cbiAgcHJpdmF0ZSBfc2V0dXBQcmltaXRpdmUobWVzaDogVEhSRUUuTWVzaCwgbWF0ZXJpYWxJbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgZXh0ZW5zaW9uID0gdGhpcy5fZ2V0TVRvb25FeHRlbnNpb24obWF0ZXJpYWxJbmRleCk7XG4gICAgaWYgKGV4dGVuc2lvbikge1xuICAgICAgY29uc3QgcmVuZGVyT3JkZXIgPSB0aGlzLl9wYXJzZVJlbmRlck9yZGVyKGV4dGVuc2lvbik7XG4gICAgICBtZXNoLnJlbmRlck9yZGVyID0gcmVuZGVyT3JkZXIgKyB0aGlzLnJlbmRlck9yZGVyT2Zmc2V0O1xuXG4gICAgICB0aGlzLl9nZW5lcmF0ZU91dGxpbmUobWVzaCk7XG5cbiAgICAgIHRoaXMuX2FkZFRvTWF0ZXJpYWxTZXQobWVzaCk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGUgb3V0bGluZSBmb3IgdGhlIGdpdmVuIG1lc2gsIGlmIGl0IG5lZWRzLlxuICAgKlxuICAgKiBAcGFyYW0gbWVzaCBUaGUgdGFyZ2V0IG1lc2hcbiAgICovXG4gIHByaXZhdGUgX2dlbmVyYXRlT3V0bGluZShtZXNoOiBUSFJFRS5NZXNoKTogdm9pZCB7XG4gICAgLy8gT0ssIGl0J3MgdGhlIGhhY2t5IHBhcnQuXG4gICAgLy8gV2UgYXJlIGdvaW5nIHRvIGR1cGxpY2F0ZSB0aGUgTVRvb25NYXRlcmlhbCBmb3Igb3V0bGluZSB1c2UuXG4gICAgLy8gVGhlbiB3ZSBhcmUgZ29pbmcgdG8gY3JlYXRlIHR3byBnZW9tZXRyeSBncm91cHMgYW5kIHJlZmVyIHNhbWUgYnVmZmVyIGJ1dCBkaWZmZXJlbnQgbWF0ZXJpYWwuXG4gICAgLy8gSXQncyBob3cgd2UgZHJhdyB0d28gbWF0ZXJpYWxzIGF0IG9uY2UgdXNpbmcgYSBzaW5nbGUgbWVzaC5cblxuICAgIC8vIG1ha2Ugc3VyZSB0aGUgbWF0ZXJpYWwgaXMgbXRvb25cbiAgICBjb25zdCBzdXJmYWNlTWF0ZXJpYWwgPSBtZXNoLm1hdGVyaWFsO1xuICAgIGlmICghKHN1cmZhY2VNYXRlcmlhbCBpbnN0YW5jZW9mIE1Ub29uTWF0ZXJpYWwpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gY2hlY2sgd2hldGhlciB3ZSByZWFsbHkgaGF2ZSB0byBwcmVwYXJlIG91dGxpbmUgb3Igbm90XG4gICAgaWYgKHN1cmZhY2VNYXRlcmlhbC5vdXRsaW5lV2lkdGhNb2RlID09PSAnbm9uZScgfHwgc3VyZmFjZU1hdGVyaWFsLm91dGxpbmVXaWR0aEZhY3RvciA8PSAwLjApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBtYWtlIGl0cyBtYXRlcmlhbCBhbiBhcnJheVxuICAgIG1lc2gubWF0ZXJpYWwgPSBbc3VyZmFjZU1hdGVyaWFsXTsgLy8gbWVzaC5tYXRlcmlhbCBpcyBndWFyYW50ZWVkIHRvIGJlIGEgTWF0ZXJpYWwgaW4gR0xURkxvYWRlclxuXG4gICAgLy8gZHVwbGljYXRlIHRoZSBtYXRlcmlhbCBmb3Igb3V0bGluZSB1c2VcbiAgICBjb25zdCBvdXRsaW5lTWF0ZXJpYWwgPSBzdXJmYWNlTWF0ZXJpYWwuY2xvbmUoKSBhcyBNVG9vbk1hdGVyaWFsO1xuICAgIG91dGxpbmVNYXRlcmlhbC5uYW1lICs9ICcgKE91dGxpbmUpJztcbiAgICBvdXRsaW5lTWF0ZXJpYWwuaXNPdXRsaW5lID0gdHJ1ZTtcbiAgICBvdXRsaW5lTWF0ZXJpYWwuc2lkZSA9IFRIUkVFLkJhY2tTaWRlO1xuICAgIG1lc2gubWF0ZXJpYWwucHVzaChvdXRsaW5lTWF0ZXJpYWwpO1xuXG4gICAgLy8gbWFrZSB0d28gZ2VvbWV0cnkgZ3JvdXBzIG91dCBvZiBhIHNhbWUgYnVmZmVyXG4gICAgY29uc3QgZ2VvbWV0cnkgPSBtZXNoLmdlb21ldHJ5OyAvLyBtZXNoLmdlb21ldHJ5IGlzIGd1YXJhbnRlZWQgdG8gYmUgYSBCdWZmZXJHZW9tZXRyeSBpbiBHTFRGTG9hZGVyXG4gICAgY29uc3QgcHJpbWl0aXZlVmVydGljZXMgPSBnZW9tZXRyeS5pbmRleCA/IGdlb21ldHJ5LmluZGV4LmNvdW50IDogZ2VvbWV0cnkuYXR0cmlidXRlcy5wb3NpdGlvbi5jb3VudCAvIDM7XG4gICAgZ2VvbWV0cnkuYWRkR3JvdXAoMCwgcHJpbWl0aXZlVmVydGljZXMsIDApO1xuICAgIGdlb21ldHJ5LmFkZEdyb3VwKDAsIHByaW1pdGl2ZVZlcnRpY2VzLCAxKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFRvTWF0ZXJpYWxTZXQobWVzaDogVEhSRUUuTWVzaCk6IHZvaWQge1xuICAgIGNvbnN0IG1hdGVyaWFsT3JNYXRlcmlhbHMgPSBtZXNoLm1hdGVyaWFsO1xuICAgIGNvbnN0IG1hdGVyaWFsU2V0ID0gbmV3IFNldDxUSFJFRS5NYXRlcmlhbD4oKTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KG1hdGVyaWFsT3JNYXRlcmlhbHMpKSB7XG4gICAgICBtYXRlcmlhbE9yTWF0ZXJpYWxzLmZvckVhY2goKG1hdGVyaWFsKSA9PiBtYXRlcmlhbFNldC5hZGQobWF0ZXJpYWwpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWF0ZXJpYWxTZXQuYWRkKG1hdGVyaWFsT3JNYXRlcmlhbHMpO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgbWF0ZXJpYWwgb2YgbWF0ZXJpYWxTZXQpIHtcbiAgICAgIGlmIChtYXRlcmlhbCBpbnN0YW5jZW9mIE1Ub29uTWF0ZXJpYWwpIHtcbiAgICAgICAgdGhpcy5fbVRvb25NYXRlcmlhbFNldC5hZGQobWF0ZXJpYWwpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlUmVuZGVyT3JkZXIoZXh0ZW5zaW9uOiBWMU1Ub29uU2NoZW1hLlZSTUNNYXRlcmlhbHNNVG9vbik6IG51bWJlciB7XG4gICAgLy8gdHJhbnNwYXJlbnRXaXRoWldyaXRlIHJhbmdlcyBmcm9tIDAgdG8gKzlcbiAgICAvLyBtZXJlIHRyYW5zcGFyZW50IHJhbmdlcyBmcm9tIC05IHRvIDBcbiAgICBjb25zdCBlbmFibGVkWldyaXRlID0gZXh0ZW5zaW9uLnRyYW5zcGFyZW50V2l0aFpXcml0ZTtcbiAgICByZXR1cm4gKGVuYWJsZWRaV3JpdGUgPyAwIDogMTkpICsgKGV4dGVuc2lvbi5yZW5kZXJRdWV1ZU9mZnNldE51bWJlciA/PyAwKTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIlRIUkVFIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQTtJQUNBO0FBQ0E7SUFDQTtJQUNBO0FBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0FBdURBO0lBQ08sU0FBUyxTQUFTLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFO0lBQzdELElBQUksU0FBUyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsT0FBTyxLQUFLLFlBQVksQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxVQUFVLE9BQU8sRUFBRSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO0lBQ2hILElBQUksT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLEVBQUUsVUFBVSxPQUFPLEVBQUUsTUFBTSxFQUFFO0lBQy9ELFFBQVEsU0FBUyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtJQUNuRyxRQUFRLFNBQVMsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtJQUN0RyxRQUFRLFNBQVMsSUFBSSxDQUFDLE1BQU0sRUFBRSxF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
