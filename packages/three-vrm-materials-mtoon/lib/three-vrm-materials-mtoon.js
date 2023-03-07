/*!
 * @pixiv/three-vrm-materials-mtoon v1.0.9
 * MToon (toon material) module for @pixiv/three-vrm
 *
 * Copyright (c) 2020-2023 pixiv Inc.
 * @pixiv/three-vrm-materials-mtoon is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three')) :
    typeof define === 'function' && define.amd ? define(['exports', 'three'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.THREE_VRM_MATERIALS_MTOON = {}, global.THREE));
})(this, (function (exports, THREE) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var THREE__namespace = /*#__PURE__*/_interopNamespace(THREE);

    /******************************************************************************
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

    var vertexShader = "// #define PHONG\n\nvarying vec3 vViewPosition;\n\n#ifndef FLAT_SHADED\n  varying vec3 vNormal;\n#endif\n\n#include <common>\n\n// #include <uv_pars_vertex>\n#ifdef MTOON_USE_UV\n  varying vec2 vUv;\n  uniform mat3 uvTransform;\n#endif\n\n#include <uv2_pars_vertex>\n// #include <displacementmap_pars_vertex>\n// #include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\n#ifdef USE_OUTLINEWIDTHMULTIPLYTEXTURE\n  uniform sampler2D outlineWidthMultiplyTexture;\n  uniform mat3 outlineWidthMultiplyTextureUvTransform;\n#endif\n\nuniform float outlineWidthFactor;\n\nvoid main() {\n\n  // #include <uv_vertex>\n  #ifdef MTOON_USE_UV\n    vUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n  #endif\n\n  #include <uv2_vertex>\n  #include <color_vertex>\n\n  #include <beginnormal_vertex>\n  #include <morphnormal_vertex>\n  #include <skinbase_vertex>\n  #include <skinnormal_vertex>\n\n  // we need this to compute the outline properly\n  objectNormal = normalize( objectNormal );\n\n  #include <defaultnormal_vertex>\n\n  #ifndef FLAT_SHADED // Normal computed with derivatives when FLAT_SHADED\n    vNormal = normalize( transformedNormal );\n  #endif\n\n  #include <begin_vertex>\n\n  #include <morphtarget_vertex>\n  #include <skinning_vertex>\n  // #include <displacementmap_vertex>\n  #include <project_vertex>\n  #include <logdepthbuf_vertex>\n  #include <clipping_planes_vertex>\n\n  vViewPosition = - mvPosition.xyz;\n\n  float outlineTex = 1.0;\n\n  #ifdef OUTLINE\n    #ifdef USE_OUTLINEWIDTHMULTIPLYTEXTURE\n      vec2 outlineWidthMultiplyTextureUv = ( outlineWidthMultiplyTextureUvTransform * vec3( vUv, 1 ) ).xy;\n      outlineTex = texture2D( outlineWidthMultiplyTexture, outlineWidthMultiplyTextureUv ).g;\n    #endif\n\n    #ifdef OUTLINE_WIDTH_WORLD\n      float worldNormalLength = length( transformedNormal );\n      vec3 outlineOffset = outlineWidthFactor * outlineTex * worldNormalLength * objectNormal;\n      gl_Position = projectionMatrix * modelViewMatrix * vec4( outlineOffset + transformed, 1.0 );\n    #endif\n\n    #ifdef OUTLINE_WIDTH_SCREEN\n      vec3 clipNormal = ( projectionMatrix * modelViewMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n      vec2 projectedNormal = normalize( clipNormal.xy );\n      projectedNormal.x *= projectionMatrix[ 0 ].x / projectionMatrix[ 1 ].y;\n      gl_Position.xy += 2.0 * outlineWidthFactor * outlineTex * projectedNormal.xy;\n    #endif\n\n    gl_Position.z += 1E-6 * gl_Position.w; // anti-artifact magic\n  #endif\n\n  #include <worldpos_vertex>\n  // #include <envmap_vertex>\n  #include <shadowmap_vertex>\n  #include <fog_vertex>\n\n}";

    var fragmentShader = "// #define PHONG\n\nuniform vec3 litFactor;\n\nuniform float opacity;\n\nuniform vec3 shadeColorFactor;\n#ifdef USE_SHADEMULTIPLYTEXTURE\n  uniform sampler2D shadeMultiplyTexture;\n  uniform mat3 shadeMultiplyTextureUvTransform;\n#endif\n\nuniform float shadingShiftFactor;\nuniform float shadingToonyFactor;\n\n#ifdef USE_SHADINGSHIFTTEXTURE\n  uniform sampler2D shadingShiftTexture;\n  uniform mat3 shadingShiftTextureUvTransform;\n  uniform float shadingShiftTextureScale;\n#endif\n\nuniform float giEqualizationFactor;\n\nuniform vec3 parametricRimColorFactor;\n#ifdef USE_RIMMULTIPLYTEXTURE\n  uniform sampler2D rimMultiplyTexture;\n  uniform mat3 rimMultiplyTextureUvTransform;\n#endif\nuniform float rimLightingMixFactor;\nuniform float parametricRimFresnelPowerFactor;\nuniform float parametricRimLiftFactor;\n\n#ifdef USE_MATCAPTEXTURE\n  uniform vec3 matcapFactor;\n  uniform sampler2D matcapTexture;\n  uniform mat3 matcapTextureUvTransform;\n#endif\n\nuniform vec3 emissive;\nuniform float emissiveIntensity;\n\nuniform vec3 outlineColorFactor;\nuniform float outlineLightingMixFactor;\n\n#ifdef USE_UVANIMATIONMASKTEXTURE\n  uniform sampler2D uvAnimationMaskTexture;\n  uniform mat3 uvAnimationMaskTextureUvTransform;\n#endif\n\nuniform float uvAnimationScrollXOffset;\nuniform float uvAnimationScrollYOffset;\nuniform float uvAnimationRotationPhase;\n\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n\n// #include <uv_pars_fragment>\n#if ( defined( MTOON_USE_UV ) && !defined( MTOON_UVS_VERTEX_ONLY ) )\n  varying vec2 vUv;\n#endif\n\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n\n#ifdef USE_MAP\n  uniform mat3 mapUvTransform;\n#endif\n\n// #include <alphamap_pars_fragment>\n\n#if THREE_VRM_THREE_REVISION >= 132\n  #include <alphatest_pars_fragment>\n#endif\n\n#include <aomap_pars_fragment>\n// #include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n\n#ifdef USE_EMISSIVEMAP\n  uniform mat3 emissiveMapUvTransform;\n#endif\n\n// #include <envmap_common_pars_fragment>\n// #include <envmap_pars_fragment>\n// #include <cube_uv_reflection_fragment>\n#include <fog_pars_fragment>\n\n// #include <bsdfs>\nvec3 BRDF_Lambert( const in vec3 diffuseColor ) {\n  return RECIPROCAL_PI * diffuseColor;\n}\n\n#include <lights_pars_begin>\n\n#if THREE_VRM_THREE_REVISION >= 132\n  #include <normal_pars_fragment>\n#endif\n\n// #include <lights_phong_pars_fragment>\nvarying vec3 vViewPosition;\n\n#if THREE_VRM_THREE_REVISION < 132\n  #ifndef FLAT_SHADED\n    varying vec3 vNormal;\n  #endif\n#endif\n\nstruct MToonMaterial {\n  vec3 diffuseColor;\n  vec3 shadeColor;\n  float shadingShift;\n};\n\nfloat linearstep( float a, float b, float t ) {\n  return clamp( ( t - a ) / ( b - a ), 0.0, 1.0 );\n}\n\n/**\n * Convert NdotL into toon shading factor using shadingShift and shadingToony\n */\nfloat getShading(\n  const in float dotNL,\n  const in float shadow,\n  const in float shadingShift\n) {\n  float shading = dotNL;\n  shading = shading + shadingShift;\n  shading = linearstep( -1.0 + shadingToonyFactor, 1.0 - shadingToonyFactor, shading );\n  shading *= shadow;\n  return shading;\n}\n\n/**\n * Mix diffuseColor and shadeColor using shading factor and light color\n */\nvec3 getDiffuse(\n  const in MToonMaterial material,\n  const in float shading,\n  in vec3 lightColor\n) {\n  #ifdef DEBUG_LITSHADERATE\n    return vec3( BRDF_Lambert( shading * lightColor ) );\n  #endif\n\n  #if THREE_VRM_THREE_REVISION < 132\n    #ifndef PHYSICALLY_CORRECT_LIGHTS\n      lightColor *= PI;\n    #endif\n  #endif\n\n  vec3 col = lightColor * BRDF_Lambert( mix( material.shadeColor, material.diffuseColor, shading ) );\n\n  // The \"comment out if you want to PBR absolutely\" line\n  #ifdef V0_COMPAT_SHADE\n    col = min( col, material.diffuseColor );\n  #endif\n\n  return col;\n}\n\nvoid RE_Direct_MToon( const in IncidentLight directLight, const in GeometricContext geometry, const in MToonMaterial material, const in float shadow, inout ReflectedLight reflectedLight ) {\n  float dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n  vec3 irradiance = directLight.color;\n\n  #if THREE_VRM_THREE_REVISION < 132\n    #ifndef PHYSICALLY_CORRECT_LIGHTS\n      irradiance *= PI;\n    #endif\n  #endif\n\n  // directSpecular will be used for rim lighting, not an actual specular\n  reflectedLight.directSpecular += irradiance;\n\n  irradiance *= dotNL;\n\n  float shading = getShading( dotNL, shadow, material.shadingShift );\n\n  // toon shaded diffuse\n  reflectedLight.directDiffuse += getDiffuse( material, shading, directLight.color );\n}\n\nvoid RE_IndirectDiffuse_MToon( const in vec3 irradiance, const in GeometricContext geometry, const in MToonMaterial material, inout ReflectedLight reflectedLight ) {\n  // indirect diffuse will use diffuseColor, no shadeColor involved\n  reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n\n  // directSpecular will be used for rim lighting, not an actual specular\n  reflectedLight.directSpecular += irradiance;\n}\n\n#define RE_Direct RE_Direct_MToon\n#define RE_IndirectDiffuse RE_IndirectDiffuse_MToon\n#define Material_LightProbeLOD( material ) (0)\n\n#include <shadowmap_pars_fragment>\n// #include <bumpmap_pars_fragment>\n\n// #include <normalmap_pars_fragment>\n#ifdef USE_NORMALMAP\n\n  uniform sampler2D normalMap;\n  uniform mat3 normalMapUvTransform;\n  uniform vec2 normalScale;\n\n#endif\n\n#ifdef OBJECTSPACE_NORMALMAP\n\n  uniform mat3 normalMatrix;\n\n#endif\n\n#if ! defined ( USE_TANGENT ) && defined ( TANGENTSPACE_NORMALMAP )\n\n  // Per-Pixel Tangent Space Normal Mapping\n  // http://hacksoflife.blogspot.ch/2009/11/per-pixel-tangent-space-normal-mapping.html\n\n  // three-vrm specific change: it requires `uv` as an input in order to support uv scrolls\n\n  // Temporary compat against shader change @ Three.js r126\n  // See: #21205, #21307, #21299\n  #if THREE_VRM_THREE_REVISION >= 126\n\n    vec3 perturbNormal2Arb( vec2 uv, vec3 eye_pos, vec3 surf_norm, vec3 mapN, float faceDirection ) {\n\n      vec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );\n      vec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );\n      vec2 st0 = dFdx( uv.st );\n      vec2 st1 = dFdy( uv.st );\n\n      vec3 N = normalize( surf_norm );\n\n      vec3 q1perp = cross( q1, N );\n      vec3 q0perp = cross( N, q0 );\n\n      vec3 T = q1perp * st0.x + q0perp * st1.x;\n      vec3 B = q1perp * st0.y + q0perp * st1.y;\n\n      // three-vrm specific change: Workaround for the issue that happens when delta of uv = 0.0\n      // TODO: Is this still required? Or shall I make a PR about it?\n      if ( length( T ) == 0.0 || length( B ) == 0.0 ) {\n        return surf_norm;\n      }\n\n      float det = max( dot( T, T ), dot( B, B ) );\n      float scale = ( det == 0.0 ) ? 0.0 : faceDirection * inversesqrt( det );\n\n      return normalize( T * ( mapN.x * scale ) + B * ( mapN.y * scale ) + N * mapN.z );\n\n    }\n\n  #else\n\n    vec3 perturbNormal2Arb( vec2 uv, vec3 eye_pos, vec3 surf_norm, vec3 mapN ) {\n\n      // Workaround for Adreno 3XX dFd*( vec3 ) bug. See #9988\n\n      vec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );\n      vec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );\n      vec2 st0 = dFdx( uv.st );\n      vec2 st1 = dFdy( uv.st );\n\n      float scale = sign( st1.t * st0.s - st0.t * st1.s ); // we do not care about the magnitude\n\n      vec3 S = ( q0 * st1.t - q1 * st0.t ) * scale;\n      vec3 T = ( - q0 * st1.s + q1 * st0.s ) * scale;\n\n      // three-vrm specific change: Workaround for the issue that happens when delta of uv = 0.0\n      // TODO: Is this still required? Or shall I make a PR about it?\n\n      if ( length( S ) == 0.0 || length( T ) == 0.0 ) {\n        return surf_norm;\n      }\n\n      S = normalize( S );\n      T = normalize( T );\n      vec3 N = normalize( surf_norm );\n\n      #ifdef DOUBLE_SIDED\n\n        // Workaround for Adreno GPUs gl_FrontFacing bug. See #15850 and #10331\n\n        bool frontFacing = dot( cross( S, T ), N ) > 0.0;\n\n        mapN.xy *= ( float( frontFacing ) * 2.0 - 1.0 );\n\n      #else\n\n        mapN.xy *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\n      #endif\n\n      mat3 tsn = mat3( S, T, N );\n      return normalize( tsn * mapN );\n\n    }\n\n  #endif\n\n#endif\n\n// #include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\n// == post correction ==========================================================\nvoid postCorrection() {\n  #include <tonemapping_fragment>\n  #include <encodings_fragment>\n  #include <fog_fragment>\n  #include <premultiplied_alpha_fragment>\n  #include <dithering_fragment>\n}\n\n// == main procedure ===========================================================\nvoid main() {\n  #include <clipping_planes_fragment>\n\n  vec2 uv = vec2(0.5, 0.5);\n\n  #if ( defined( MTOON_USE_UV ) && !defined( MTOON_UVS_VERTEX_ONLY ) )\n    uv = vUv;\n\n    float uvAnimMask = 1.0;\n    #ifdef USE_UVANIMATIONMASKTEXTURE\n      vec2 uvAnimationMaskTextureUv = ( uvAnimationMaskTextureUvTransform * vec3( uv, 1 ) ).xy;\n      uvAnimMask = texture2D( uvAnimationMaskTexture, uvAnimationMaskTextureUv ).b;\n    #endif\n\n    uv = uv + vec2( uvAnimationScrollXOffset, uvAnimationScrollYOffset ) * uvAnimMask;\n    float uvRotCos = cos( uvAnimationRotationPhase * uvAnimMask );\n    float uvRotSin = sin( uvAnimationRotationPhase * uvAnimMask );\n    uv = mat2( uvRotCos, -uvRotSin, uvRotSin, uvRotCos ) * ( uv - 0.5 ) + 0.5;\n  #endif\n\n  #ifdef DEBUG_UV\n    gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );\n    #if ( defined( MTOON_USE_UV ) && !defined( MTOON_UVS_VERTEX_ONLY ) )\n      gl_FragColor = vec4( uv, 0.0, 1.0 );\n    #endif\n    return;\n  #endif\n\n  vec4 diffuseColor = vec4( litFactor, opacity );\n  ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n  vec3 totalEmissiveRadiance = emissive * emissiveIntensity;\n\n  #include <logdepthbuf_fragment>\n\n  // #include <map_fragment>\n  #ifdef USE_MAP\n    vec2 mapUv = ( mapUvTransform * vec3( uv, 1 ) ).xy;\n    #if THREE_VRM_THREE_REVISION >= 137\n      vec4 sampledDiffuseColor = texture2D( map, mapUv );\n      #ifdef DECODE_VIDEO_TEXTURE\n        sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );\n      #endif\n      diffuseColor *= sampledDiffuseColor;\n    #else\n      // COMPAT: pre-r137\n      vec4 texelColor = texture2D( map, mapUv );\n      texelColor = mapTexelToLinear( texelColor );\n      diffuseColor *= texelColor;\n    #endif\n  #endif\n\n  // #include <color_fragment>\n  #if ( defined( USE_COLOR ) && !defined( IGNORE_VERTEX_COLOR ) )\n    diffuseColor.rgb *= vColor;\n  #endif\n\n  // #include <alphamap_fragment>\n\n  #include <alphatest_fragment>\n\n  // #include <specularmap_fragment>\n  #include <normal_fragment_begin>\n\n  #ifdef OUTLINE\n    normal *= -1.0;\n  #endif\n\n  // #include <normal_fragment_maps>\n\n  #ifdef OBJECTSPACE_NORMALMAP\n\n    vec2 normalMapUv = ( normalMapUvTransform * vec3( uv, 1 ) ).xy;\n    normal = texture2D( normalMap, normalMapUv ).xyz * 2.0 - 1.0; // overrides both flatShading and attribute normals\n\n    #ifdef FLIP_SIDED\n\n      normal = - normal;\n\n    #endif\n\n    #ifdef DOUBLE_SIDED\n\n      // Temporary compat against shader change @ Three.js r126\n      // See: #21205, #21307, #21299\n      #if THREE_VRM_THREE_REVISION >= 126\n\n        normal = normal * faceDirection;\n\n      #else\n\n        normal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\n      #endif\n\n    #endif\n\n    normal = normalize( normalMatrix * normal );\n\n  #elif defined( TANGENTSPACE_NORMALMAP )\n\n    vec2 normalMapUv = ( normalMapUvTransform * vec3( uv, 1 ) ).xy;\n    vec3 mapN = texture2D( normalMap, normalMapUv ).xyz * 2.0 - 1.0;\n    mapN.xy *= normalScale;\n\n    #ifdef USE_TANGENT\n\n      normal = normalize( vTBN * mapN );\n\n    #else\n\n      // Temporary compat against shader change @ Three.js r126\n      // See: #21205, #21307, #21299\n      #if THREE_VRM_THREE_REVISION >= 126\n\n        normal = perturbNormal2Arb( uv, -vViewPosition, normal, mapN, faceDirection );\n\n      #else\n\n        normal = perturbNormal2Arb( uv, -vViewPosition, normal, mapN );\n\n      #endif\n\n    #endif\n\n  #endif\n\n  // #include <emissivemap_fragment>\n  #ifdef USE_EMISSIVEMAP\n    vec2 emissiveMapUv = ( emissiveMapUvTransform * vec3( uv, 1 ) ).xy;\n    #if THREE_VRM_THREE_REVISION >= 137\n      totalEmissiveRadiance *= texture2D( emissiveMap, emissiveMapUv ).rgb;\n    #else\n      // COMPAT: pre-r137\n      totalEmissiveRadiance *= emissiveMapTexelToLinear( texture2D( emissiveMap, emissiveMapUv ) ).rgb;\n    #endif\n  #endif\n\n  #ifdef DEBUG_NORMAL\n    gl_FragColor = vec4( 0.5 + 0.5 * normal, 1.0 );\n    return;\n  #endif\n\n  // -- MToon: lighting --------------------------------------------------------\n  // accumulation\n  // #include <lights_phong_fragment>\n  MToonMaterial material;\n\n  material.diffuseColor = diffuseColor.rgb;\n\n  material.shadeColor = shadeColorFactor;\n  #ifdef USE_SHADEMULTIPLYTEXTURE\n    vec2 shadeMultiplyTextureUv = ( shadeMultiplyTextureUvTransform * vec3( uv, 1 ) ).xy;\n    #if THREE_VRM_THREE_REVISION >= 137\n      material.shadeColor *= texture2D( shadeMultiplyTexture, shadeMultiplyTextureUv ).rgb;\n    #else\n      // COMPAT: pre-r137\n      material.shadeColor *= shadeMultiplyTextureTexelToLinear( texture2D( shadeMultiplyTexture, shadeMultiplyTextureUv) ).rgb;\n    #endif\n  #endif\n\n  #if ( defined( USE_COLOR ) && !defined( IGNORE_VERTEX_COLOR ) )\n    material.shadeColor.rgb *= vColor;\n  #endif\n\n  material.shadingShift = shadingShiftFactor;\n  #ifdef USE_SHADINGSHIFTTEXTURE\n    vec2 shadingShiftTextureUv = ( shadingShiftTextureUvTransform * vec3( uv, 1 ) ).xy;\n    material.shadingShift += texture2D( shadingShiftTexture, shadingShiftTextureUv ).r * shadingShiftTextureScale;\n  #endif\n\n  // #include <lights_fragment_begin>\n\n  // MToon Specific changes:\n  // Since we want to take shadows into account of shading instead of irradiance,\n  // we had to modify the codes that multiplies the results of shadowmap into color of direct lights.\n\n  GeometricContext geometry;\n\n  geometry.position = - vViewPosition;\n  geometry.normal = normal;\n  geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );\n\n  #ifdef CLEARCOAT\n\n    geometry.clearcoatNormal = clearcoatNormal;\n\n  #endif\n\n  IncidentLight directLight;\n\n  // since these variables will be used in unrolled loop, we have to define in prior\n  float shadow;\n\n  #if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\n    PointLight pointLight;\n    #if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0\n    PointLightShadow pointLightShadow;\n    #endif\n\n    #pragma unroll_loop_start\n    for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\n      pointLight = pointLights[ i ];\n\n      #if THREE_VRM_THREE_REVISION >= 132\n        getPointLightInfo( pointLight, geometry, directLight );\n      #else\n        getPointDirectLightIrradiance( pointLight, geometry, directLight );\n      #endif\n\n      shadow = 1.0;\n      #if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )\n      pointLightShadow = pointLightShadows[ i ];\n      shadow = all( bvec2( directLight.visible, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;\n      #endif\n\n      RE_Direct( directLight, geometry, material, shadow, reflectedLight );\n\n    }\n    #pragma unroll_loop_end\n\n  #endif\n\n  #if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\n    SpotLight spotLight;\n    #if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0\n    SpotLightShadow spotLightShadow;\n    #endif\n\n    #pragma unroll_loop_start\n    for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\n      spotLight = spotLights[ i ];\n\n      #if THREE_VRM_THREE_REVISION >= 132\n        getSpotLightInfo( spotLight, geometry, directLight );\n      #else\n        getSpotDirectLightIrradiance( spotLight, geometry, directLight );\n      #endif\n\n      shadow = 1.0;\n      #if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n      spotLightShadow = spotLightShadows[ i ];\n      shadow = all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n      #endif\n\n      RE_Direct( directLight, geometry, material, shadow, reflectedLight );\n\n    }\n    #pragma unroll_loop_end\n\n  #endif\n\n  #if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\n    DirectionalLight directionalLight;\n    #if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0\n    DirectionalLightShadow directionalLightShadow;\n    #endif\n\n    #pragma unroll_loop_start\n    for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\n      directionalLight = directionalLights[ i ];\n\n      #if THREE_VRM_THREE_REVISION >= 132\n        getDirectionalLightInfo( directionalLight, geometry, directLight );\n      #else\n        getDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );\n      #endif\n\n      shadow = 1.0;\n      #if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )\n      directionalLightShadow = directionalLightShadows[ i ];\n      shadow = all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n      #endif\n\n      RE_Direct( directLight, geometry, material, shadow, reflectedLight );\n\n    }\n    #pragma unroll_loop_end\n\n  #endif\n\n  // #if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n\n  //   RectAreaLight rectAreaLight;\n\n  //   #pragma unroll_loop_start\n  //   for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\n  //     rectAreaLight = rectAreaLights[ i ];\n  //     RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );\n\n  //   }\n  //   #pragma unroll_loop_end\n\n  // #endif\n\n  #if defined( RE_IndirectDiffuse )\n\n    vec3 iblIrradiance = vec3( 0.0 );\n\n    vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\n    #if THREE_VRM_THREE_REVISION >= 133\n      irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );\n    #else\n      irradiance += getLightProbeIrradiance( lightProbe, geometry );\n    #endif\n\n    #if ( NUM_HEMI_LIGHTS > 0 )\n\n      #pragma unroll_loop_start\n      for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\n        #if THREE_VRM_THREE_REVISION >= 133\n          irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );\n        #else\n          irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n        #endif\n\n      }\n      #pragma unroll_loop_end\n\n    #endif\n\n  #endif\n\n  // #if defined( RE_IndirectSpecular )\n\n  //   vec3 radiance = vec3( 0.0 );\n  //   vec3 clearcoatRadiance = vec3( 0.0 );\n\n  // #endif\n\n  #include <lights_fragment_maps>\n  #include <lights_fragment_end>\n\n  // modulation\n  #include <aomap_fragment>\n\n  vec3 col = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;\n\n  #ifdef DEBUG_LITSHADERATE\n    gl_FragColor = vec4( col, diffuseColor.a );\n    postCorrection();\n    return;\n  #endif\n\n  // -- MToon: rim lighting -----------------------------------------\n  vec3 viewDir = normalize( vViewPosition );\n\n  #ifndef PHYSICALLY_CORRECT_LIGHTS\n    reflectedLight.directSpecular /= PI;\n  #endif\n  vec3 rimMix = mix( vec3( 1.0 ), reflectedLight.directSpecular, 1.0 );\n\n  vec3 rim = parametricRimColorFactor * pow( saturate( 1.0 - dot( viewDir, normal ) + parametricRimLiftFactor ), parametricRimFresnelPowerFactor );\n\n  #ifdef USE_MATCAPTEXTURE\n    {\n      vec3 x = normalize( vec3( viewDir.z, 0.0, -viewDir.x ) );\n      vec3 y = cross( viewDir, x ); // guaranteed to be normalized\n      vec2 sphereUv = 0.5 + 0.5 * vec2( dot( x, normal ), -dot( y, normal ) );\n      sphereUv = ( matcapTextureUvTransform * vec3( sphereUv, 1 ) ).xy;\n      #if THREE_VRM_THREE_REVISION >= 137\n        vec3 matcap = texture2D( matcapTexture, sphereUv ).rgb;\n      #else\n        // COMPAT: pre-r137\n        vec3 matcap = matcapTextureTexelToLinear( texture2D( matcapTexture, sphereUv ) ).rgb;\n      #endif\n      rim += matcapFactor * matcap;\n    }\n  #endif\n\n  #ifdef USE_RIMMULTIPLYTEXTURE\n    vec2 rimMultiplyTextureUv = ( rimMultiplyTextureUvTransform * vec3( uv, 1 ) ).xy;\n    #if THREE_VRM_THREE_REVISION >= 137\n      rim *= texture2D( rimMultiplyTexture, rimMultiplyTextureUv ).rgb;\n    #else\n      // COMPAT: pre-r137\n      rim *= rimMultiplyTextureTexelToLinear( texture2D( rimMultiplyTexture, rimMultiplyTextureUv ) ).rgb;\n    #endif\n  #endif\n\n  col += rimMix * rim;\n\n  // -- MToon: Emission --------------------------------------------------------\n  col += totalEmissiveRadiance;\n\n  // #include <envmap_fragment>\n\n  // -- Almost done! -----------------------------------------------------------\n  #if defined( OUTLINE )\n    col = outlineColorFactor.rgb * mix( vec3( 1.0 ), col, outlineLightingMixFactor );\n  #endif\n\n  gl_FragColor = vec4( col, diffuseColor.a );\n  postCorrection();\n}\n";

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

    // Since these constants are deleted in r136 we have to define by ourselves
    /* eslint-disable @typescript-eslint/naming-convention */
    const RGBEEncoding = 3002;
    const RGBM7Encoding = 3004;
    const RGBM16Encoding = 3005;
    const RGBDEncoding = 3006;
    const GammaEncoding = 3007;
    /* eslint-enable @typescript-eslint/naming-convention */
    /**
     * COMPAT: pre-r137
     *
     * Ref: https://github.com/mrdoob/three.js/blob/r136/src/renderers/webgl/WebGLProgram.js#L22
     */
    const getEncodingComponents = (encoding) => {
        if (parseInt(THREE__namespace.REVISION, 10) >= 136) {
            switch (encoding) {
                case THREE__namespace.LinearEncoding:
                    return ['Linear', '( value )'];
                case THREE__namespace.sRGBEncoding:
                    return ['sRGB', '( value )'];
                default:
                    console.warn('THREE.WebGLProgram: Unsupported encoding:', encoding);
                    return ['Linear', '( value )'];
            }
        }
        else {
            // COMPAT: pre-r136
            switch (encoding) {
                case THREE__namespace.LinearEncoding:
                    return ['Linear', '( value )'];
                case THREE__namespace.sRGBEncoding:
                    return ['sRGB', '( value )'];
                case RGBEEncoding:
                    return ['RGBE', '( value )'];
                case RGBM7Encoding:
                    return ['RGBM', '( value, 7.0 )'];
                case RGBM16Encoding:
                    return ['RGBM', '( value, 16.0 )'];
                case RGBDEncoding:
                    return ['RGBD', '( value, 256.0 )'];
                case GammaEncoding:
                    return ['Gamma', '( value, float( GAMMA_FACTOR ) )'];
                default:
                    throw new Error('unsupported encoding: ' + encoding);
            }
        }
    };
    /**
     * COMPAT: pre-r137
     *
     * This function is no longer required beginning from r137
     *
     * https://github.com/mrdoob/three.js/blob/r136/src/renderers/webgl/WebGLProgram.js#L52
     */
    const getTexelDecodingFunction = (functionName, encoding) => {
        const components = getEncodingComponents(encoding);
        return 'vec4 ' + functionName + '( vec4 value ) { return ' + components[0] + 'ToLinear' + components[1] + '; }';
    };

    /**
     * COMPAT: pre-r137
     *
     * This function is no longer required beginning from r137
     *
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
             * Whether the material is affected by fog.
             * `true` by default.
             */
            this.fog = true;
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
            // COMPAT: pre-r129
            // See: https://github.com/mrdoob/three.js/pull/21788
            if (parseInt(THREE__namespace.REVISION, 10) < 129) {
                parameters.skinning = parameters.skinning || false;
            }
            // COMPAT: pre-r131
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
                    matcapFactor: { value: new THREE__namespace.Color(0.0, 0.0, 0.0) },
                    matcapTexture: { value: null },
                    matcapTextureUvTransform: { value: new THREE__namespace.Matrix3() },
                    parametricRimColorFactor: { value: new THREE__namespace.Color(0.0, 0.0, 0.0) },
                    rimMultiplyTexture: { value: null },
                    rimMultiplyTextureUvTransform: { value: new THREE__namespace.Matrix3() },
                    rimLightingMixFactor: { value: 0.0 },
                    parametricRimFresnelPowerFactor: { value: 1.0 },
                    parametricRimLiftFactor: { value: 0.0 },
                    emissive: { value: new THREE__namespace.Color(0.0, 0.0, 0.0) },
                    emissiveIntensity: { value: 1.0 },
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
                // COMPAT: pre-r137
                let encodings = '';
                if (parseInt(THREE__namespace.REVISION, 10) < 137) {
                    encodings =
                        (this.matcapTexture !== null
                            ? getTexelDecodingFunction('matcapTextureTexelToLinear', getTextureEncodingFromMap(this.matcapTexture, isWebGL2)) + '\n'
                            : '') +
                            (this.shadeMultiplyTexture !== null
                                ? getTexelDecodingFunction('shadeMultiplyTextureTexelToLinear', getTextureEncodingFromMap(this.shadeMultiplyTexture, isWebGL2)) + '\n'
                                : '') +
                            (this.rimMultiplyTexture !== null
                                ? getTexelDecodingFunction('rimMultiplyTextureTexelToLinear', getTextureEncodingFromMap(this.rimMultiplyTexture, isWebGL2)) + '\n'
                                : '');
                }
                // -- generate shader code -------------------------------------------------------------------
                shader.vertexShader = defines + shader.vertexShader;
                shader.fragmentShader = defines + encodings + shader.fragmentShader;
                // -- compat ---------------------------------------------------------------------------------
                // COMPAT: pre-r132
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
        get emissiveIntensity() {
            return this.uniforms.emissiveIntensity.value;
        }
        set emissiveIntensity(value) {
            this.uniforms.emissiveIntensity.value = value;
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
                USE_OUTLINEWIDTHMULTIPLYTEXTURE: this._isOutline && this.outlineWidthMultiplyTexture !== null,
                USE_UVANIMATIONMASKTEXTURE: this.uvAnimationMaskTexture !== null,
                IGNORE_VERTEX_COLOR: this._ignoreVertexColor === true,
                DEBUG_NORMAL: this._debugMode === 'normal',
                DEBUG_LITSHADERATE: this._debugMode === 'litShadeRate',
                DEBUG_UV: this._debugMode === 'uv',
                OUTLINE_WIDTH_WORLD: this._isOutline && this._outlineWidthMode === MToonMaterialOutlineWidthMode.WorldCoordinates,
                OUTLINE_WIDTH_SCREEN: this._isOutline && this._outlineWidthMode === MToonMaterialOutlineWidthMode.ScreenCoordinates,
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

    /**
     * Possible spec versions it recognizes.
     */
    const POSSIBLE_SPEC_VERSIONS = new Set(['1.0', '1.0-beta']);
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
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                const parser = this.parser;
                const json = parser.json;
                const meshDef = (_a = json.meshes) === null || _a === void 0 ? void 0 : _a[meshIndex];
                if (meshDef == null) {
                    throw new Error(`MToonMaterialLoaderPlugin: Attempt to use meshes[${meshIndex}] of glTF but the mesh doesn't exist`);
                }
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
            materialDefs === null || materialDefs === void 0 ? void 0 : materialDefs.map((materialDef, iMaterial) => {
                var _a;
                const extension = this._getMToonExtension(iMaterial);
                if (extension && ((_a = materialDef.extensions) === null || _a === void 0 ? void 0 : _a['KHR_materials_unlit'])) {
                    delete materialDef.extensions['KHR_materials_unlit'];
                }
            });
        }
        _getMToonExtension(materialIndex) {
            var _a, _b;
            const parser = this.parser;
            const json = parser.json;
            const materialDef = (_a = json.materials) === null || _a === void 0 ? void 0 : _a[materialIndex];
            if (materialDef == null) {
                console.warn(`MToonMaterialLoaderPlugin: Attempt to use materials[${materialIndex}] of glTF but the material doesn't exist`);
                return undefined;
            }
            const extension = (_b = materialDef.extensions) === null || _b === void 0 ? void 0 : _b[MToonMaterialLoaderPlugin.EXTENSION_NAME];
            if (extension == null) {
                return undefined;
            }
            const specVersion = extension.specVersion;
            if (!POSSIBLE_SPEC_VERSIONS.has(specVersion)) {
                console.warn(`MToonMaterialLoaderPlugin: Unknown ${MToonMaterialLoaderPlugin.EXTENSION_NAME} specVersion "${specVersion}"`);
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

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyZWUtdnJtLW1hdGVyaWFscy1tdG9vbi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIi4uL3NyYy9NVG9vbk1hdGVyaWFsRGVidWdNb2RlLnRzIiwiLi4vc3JjL01Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlLnRzIiwiLi4vc3JjL3V0aWxzL2dldFRleGVsRGVjb2RpbmdGdW5jdGlvbi50cyIsIi4uL3NyYy91dGlscy9nZXRUZXh0dXJlRW5jb2RpbmdGcm9tTWFwLnRzIiwiLi4vc3JjL01Ub29uTWF0ZXJpYWwudHMiLCIuLi9zcmMvR0xURk1Ub29uTWF0ZXJpYWxQYXJhbXNBc3NpZ25IZWxwZXIudHMiLCIuLi9zcmMvTVRvb25NYXRlcmlhbExvYWRlclBsdWdpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXNEZWNvcmF0ZShjdG9yLCBkZXNjcmlwdG9ySW4sIGRlY29yYXRvcnMsIGNvbnRleHRJbiwgaW5pdGlhbGl6ZXJzLCBleHRyYUluaXRpYWxpemVycykge1xyXG4gICAgZnVuY3Rpb24gYWNjZXB0KGYpIHsgaWYgKGYgIT09IHZvaWQgMCAmJiB0eXBlb2YgZiAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRnVuY3Rpb24gZXhwZWN0ZWRcIik7IHJldHVybiBmOyB9XHJcbiAgICB2YXIga2luZCA9IGNvbnRleHRJbi5raW5kLCBrZXkgPSBraW5kID09PSBcImdldHRlclwiID8gXCJnZXRcIiA6IGtpbmQgPT09IFwic2V0dGVyXCIgPyBcInNldFwiIDogXCJ2YWx1ZVwiO1xyXG4gICAgdmFyIHRhcmdldCA9ICFkZXNjcmlwdG9ySW4gJiYgY3RvciA/IGNvbnRleHRJbltcInN0YXRpY1wiXSA/IGN0b3IgOiBjdG9yLnByb3RvdHlwZSA6IG51bGw7XHJcbiAgICB2YXIgZGVzY3JpcHRvciA9IGRlc2NyaXB0b3JJbiB8fCAodGFyZ2V0ID8gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGNvbnRleHRJbi5uYW1lKSA6IHt9KTtcclxuICAgIHZhciBfLCBkb25lID0gZmFsc2U7XHJcbiAgICBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgIHZhciBjb250ZXh0ID0ge307XHJcbiAgICAgICAgZm9yICh2YXIgcCBpbiBjb250ZXh0SW4pIGNvbnRleHRbcF0gPSBwID09PSBcImFjY2Vzc1wiID8ge30gOiBjb250ZXh0SW5bcF07XHJcbiAgICAgICAgZm9yICh2YXIgcCBpbiBjb250ZXh0SW4uYWNjZXNzKSBjb250ZXh0LmFjY2Vzc1twXSA9IGNvbnRleHRJbi5hY2Nlc3NbcF07XHJcbiAgICAgICAgY29udGV4dC5hZGRJbml0aWFsaXplciA9IGZ1bmN0aW9uIChmKSB7IGlmIChkb25lKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGFkZCBpbml0aWFsaXplcnMgYWZ0ZXIgZGVjb3JhdGlvbiBoYXMgY29tcGxldGVkXCIpOyBleHRyYUluaXRpYWxpemVycy5wdXNoKGFjY2VwdChmIHx8IG51bGwpKTsgfTtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gKDAsIGRlY29yYXRvcnNbaV0pKGtpbmQgPT09IFwiYWNjZXNzb3JcIiA/IHsgZ2V0OiBkZXNjcmlwdG9yLmdldCwgc2V0OiBkZXNjcmlwdG9yLnNldCB9IDogZGVzY3JpcHRvcltrZXldLCBjb250ZXh0KTtcclxuICAgICAgICBpZiAoa2luZCA9PT0gXCJhY2Nlc3NvclwiKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IHZvaWQgMCkgY29udGludWU7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IG51bGwgfHwgdHlwZW9mIHJlc3VsdCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBleHBlY3RlZFwiKTtcclxuICAgICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LmdldCkpIGRlc2NyaXB0b3IuZ2V0ID0gXztcclxuICAgICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LnNldCkpIGRlc2NyaXB0b3Iuc2V0ID0gXztcclxuICAgICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LmluaXQpKSBpbml0aWFsaXplcnMucHVzaChfKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoXyA9IGFjY2VwdChyZXN1bHQpKSB7XHJcbiAgICAgICAgICAgIGlmIChraW5kID09PSBcImZpZWxkXCIpIGluaXRpYWxpemVycy5wdXNoKF8pO1xyXG4gICAgICAgICAgICBlbHNlIGRlc2NyaXB0b3Jba2V5XSA9IF87XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHRhcmdldCkgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgY29udGV4dEluLm5hbWUsIGRlc2NyaXB0b3IpO1xyXG4gICAgZG9uZSA9IHRydWU7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19ydW5Jbml0aWFsaXplcnModGhpc0FyZywgaW5pdGlhbGl6ZXJzLCB2YWx1ZSkge1xyXG4gICAgdmFyIHVzZVZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA+IDI7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluaXRpYWxpemVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhbHVlID0gdXNlVmFsdWUgPyBpbml0aWFsaXplcnNbaV0uY2FsbCh0aGlzQXJnLCB2YWx1ZSkgOiBpbml0aWFsaXplcnNbaV0uY2FsbCh0aGlzQXJnKTtcclxuICAgIH1cclxuICAgIHJldHVybiB1c2VWYWx1ZSA/IHZhbHVlIDogdm9pZCAwO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcHJvcEtleSh4KSB7XHJcbiAgICByZXR1cm4gdHlwZW9mIHggPT09IFwic3ltYm9sXCIgPyB4IDogXCJcIi5jb25jYXQoeCk7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zZXRGdW5jdGlvbk5hbWUoZiwgbmFtZSwgcHJlZml4KSB7XHJcbiAgICBpZiAodHlwZW9mIG5hbWUgPT09IFwic3ltYm9sXCIpIG5hbWUgPSBuYW1lLmRlc2NyaXB0aW9uID8gXCJbXCIuY29uY2F0KG5hbWUuZGVzY3JpcHRpb24sIFwiXVwiKSA6IFwiXCI7XHJcbiAgICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KGYsIFwibmFtZVwiLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHByZWZpeCA/IFwiXCIuY29uY2F0KHByZWZpeCwgXCIgXCIsIG5hbWUpIDogbmFtZSB9KTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoZyAmJiAoZyA9IDAsIG9wWzBdICYmIChfID0gMCkpLCBfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19jcmVhdGVCaW5kaW5nID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcclxuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XHJcbiAgICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcclxuICAgIH1cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XHJcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgb1trMl0gPSBtW2tdO1xyXG59KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgbykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKSkgX19jcmVhdGVCaW5kaW5nKG8sIG0sIHApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5KHRvLCBmcm9tLCBwYWNrKSB7XHJcbiAgICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcclxuICAgICAgICAgICAgaWYgKCFhcikgYXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tLCAwLCBpKTtcclxuICAgICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IGZhbHNlIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xyXG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xyXG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgc3RhdGUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIGdldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHJlYWQgcHJpdmF0ZSBtZW1iZXIgZnJvbSBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xyXG4gICAgcmV0dXJuIGtpbmQgPT09IFwibVwiID8gZiA6IGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyKSA6IGYgPyBmLnZhbHVlIDogc3RhdGUuZ2V0KHJlY2VpdmVyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRTZXQocmVjZWl2ZXIsIHN0YXRlLCB2YWx1ZSwga2luZCwgZikge1xyXG4gICAgaWYgKGtpbmQgPT09IFwibVwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBtZXRob2QgaXMgbm90IHdyaXRhYmxlXCIpO1xyXG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgc2V0dGVyXCIpO1xyXG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3Qgd3JpdGUgcHJpdmF0ZSBtZW1iZXIgdG8gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiAoa2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIsIHZhbHVlKSA6IGYgPyBmLnZhbHVlID0gdmFsdWUgOiBzdGF0ZS5zZXQocmVjZWl2ZXIsIHZhbHVlKSksIHZhbHVlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEluKHN0YXRlLCByZWNlaXZlcikge1xyXG4gICAgaWYgKHJlY2VpdmVyID09PSBudWxsIHx8ICh0eXBlb2YgcmVjZWl2ZXIgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHJlY2VpdmVyICE9PSBcImZ1bmN0aW9uXCIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHVzZSAnaW4nIG9wZXJhdG9yIG9uIG5vbi1vYmplY3RcIik7XHJcbiAgICByZXR1cm4gdHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciA9PT0gc3RhdGUgOiBzdGF0ZS5oYXMocmVjZWl2ZXIpO1xyXG59XHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiAqL1xuXG4vKipcbiAqIFNwZWNpZmllcnMgb2YgZGVidWcgbW9kZSBvZiB7QGxpbmsgTVRvb25NYXRlcmlhbH0uXG4gKlxuICogU2VlOiB7QGxpbmsgTVRvb25NYXRlcmlhbC5kZWJ1Z01vZGV9XG4gKi9cbmV4cG9ydCBjb25zdCBNVG9vbk1hdGVyaWFsRGVidWdNb2RlID0ge1xuICAvKipcbiAgICogUmVuZGVyIG5vcm1hbGx5LlxuICAgKi9cbiAgTm9uZTogJ25vbmUnLFxuXG4gIC8qKlxuICAgKiBWaXN1YWxpemUgbm9ybWFscyBvZiB0aGUgc3VyZmFjZS5cbiAgICovXG4gIE5vcm1hbDogJ25vcm1hbCcsXG5cbiAgLyoqXG4gICAqIFZpc3VhbGl6ZSBsaXQvc2hhZGUgb2YgdGhlIHN1cmZhY2UuXG4gICAqL1xuICBMaXRTaGFkZVJhdGU6ICdsaXRTaGFkZVJhdGUnLFxuXG4gIC8qKlxuICAgKiBWaXN1YWxpemUgVVYgb2YgdGhlIHN1cmZhY2UuXG4gICAqL1xuICBVVjogJ3V2Jyxcbn0gYXMgY29uc3Q7XG5cbmV4cG9ydCB0eXBlIE1Ub29uTWF0ZXJpYWxEZWJ1Z01vZGUgPSB0eXBlb2YgTVRvb25NYXRlcmlhbERlYnVnTW9kZVtrZXlvZiB0eXBlb2YgTVRvb25NYXRlcmlhbERlYnVnTW9kZV07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cblxuZXhwb3J0IGNvbnN0IE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlID0ge1xuICBOb25lOiAnbm9uZScsXG4gIFdvcmxkQ29vcmRpbmF0ZXM6ICd3b3JsZENvb3JkaW5hdGVzJyxcbiAgU2NyZWVuQ29vcmRpbmF0ZXM6ICdzY3JlZW5Db29yZGluYXRlcycsXG59IGFzIGNvbnN0O1xuXG5leHBvcnQgdHlwZSBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZSA9XG4gIHR5cGVvZiBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZVtrZXlvZiB0eXBlb2YgTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGVdO1xuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG4vLyBTaW5jZSB0aGVzZSBjb25zdGFudHMgYXJlIGRlbGV0ZWQgaW4gcjEzNiB3ZSBoYXZlIHRvIGRlZmluZSBieSBvdXJzZWx2ZXNcbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiAqL1xuY29uc3QgUkdCRUVuY29kaW5nID0gMzAwMjtcbmNvbnN0IFJHQk03RW5jb2RpbmcgPSAzMDA0O1xuY29uc3QgUkdCTTE2RW5jb2RpbmcgPSAzMDA1O1xuY29uc3QgUkdCREVuY29kaW5nID0gMzAwNjtcbmNvbnN0IEdhbW1hRW5jb2RpbmcgPSAzMDA3O1xuLyogZXNsaW50LWVuYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cblxuLyoqXG4gKiBDT01QQVQ6IHByZS1yMTM3XG4gKlxuICogUmVmOiBodHRwczovL2dpdGh1Yi5jb20vbXJkb29iL3RocmVlLmpzL2Jsb2IvcjEzNi9zcmMvcmVuZGVyZXJzL3dlYmdsL1dlYkdMUHJvZ3JhbS5qcyNMMjJcbiAqL1xuZXhwb3J0IGNvbnN0IGdldEVuY29kaW5nQ29tcG9uZW50cyA9IChlbmNvZGluZzogVEhSRUUuVGV4dHVyZUVuY29kaW5nKTogW3N0cmluZywgc3RyaW5nXSA9PiB7XG4gIGlmIChwYXJzZUludChUSFJFRS5SRVZJU0lPTiwgMTApID49IDEzNikge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgVEhSRUUuTGluZWFyRW5jb2Rpbmc6XG4gICAgICAgIHJldHVybiBbJ0xpbmVhcicsICcoIHZhbHVlICknXTtcbiAgICAgIGNhc2UgVEhSRUUuc1JHQkVuY29kaW5nOlxuICAgICAgICByZXR1cm4gWydzUkdCJywgJyggdmFsdWUgKSddO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc29sZS53YXJuKCdUSFJFRS5XZWJHTFByb2dyYW06IFVuc3VwcG9ydGVkIGVuY29kaW5nOicsIGVuY29kaW5nKTtcbiAgICAgICAgcmV0dXJuIFsnTGluZWFyJywgJyggdmFsdWUgKSddO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBDT01QQVQ6IHByZS1yMTM2XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSBUSFJFRS5MaW5lYXJFbmNvZGluZzpcbiAgICAgICAgcmV0dXJuIFsnTGluZWFyJywgJyggdmFsdWUgKSddO1xuICAgICAgY2FzZSBUSFJFRS5zUkdCRW5jb2Rpbmc6XG4gICAgICAgIHJldHVybiBbJ3NSR0InLCAnKCB2YWx1ZSApJ107XG4gICAgICBjYXNlIFJHQkVFbmNvZGluZzpcbiAgICAgICAgcmV0dXJuIFsnUkdCRScsICcoIHZhbHVlICknXTtcbiAgICAgIGNhc2UgUkdCTTdFbmNvZGluZzpcbiAgICAgICAgcmV0dXJuIFsnUkdCTScsICcoIHZhbHVlLCA3LjAgKSddO1xuICAgICAgY2FzZSBSR0JNMTZFbmNvZGluZzpcbiAgICAgICAgcmV0dXJuIFsnUkdCTScsICcoIHZhbHVlLCAxNi4wICknXTtcbiAgICAgIGNhc2UgUkdCREVuY29kaW5nOlxuICAgICAgICByZXR1cm4gWydSR0JEJywgJyggdmFsdWUsIDI1Ni4wICknXTtcbiAgICAgIGNhc2UgR2FtbWFFbmNvZGluZzpcbiAgICAgICAgcmV0dXJuIFsnR2FtbWEnLCAnKCB2YWx1ZSwgZmxvYXQoIEdBTU1BX0ZBQ1RPUiApICknXTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndW5zdXBwb3J0ZWQgZW5jb2Rpbmc6ICcgKyBlbmNvZGluZyk7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIENPTVBBVDogcHJlLXIxMzdcbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIG5vIGxvbmdlciByZXF1aXJlZCBiZWdpbm5pbmcgZnJvbSByMTM3XG4gKlxuICogaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9ibG9iL3IxMzYvc3JjL3JlbmRlcmVycy93ZWJnbC9XZWJHTFByb2dyYW0uanMjTDUyXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRUZXhlbERlY29kaW5nRnVuY3Rpb24gPSAoZnVuY3Rpb25OYW1lOiBzdHJpbmcsIGVuY29kaW5nOiBUSFJFRS5UZXh0dXJlRW5jb2RpbmcpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBjb21wb25lbnRzID0gZ2V0RW5jb2RpbmdDb21wb25lbnRzKGVuY29kaW5nKTtcbiAgcmV0dXJuICd2ZWM0ICcgKyBmdW5jdGlvbk5hbWUgKyAnKCB2ZWM0IHZhbHVlICkgeyByZXR1cm4gJyArIGNvbXBvbmVudHNbMF0gKyAnVG9MaW5lYXInICsgY29tcG9uZW50c1sxXSArICc7IH0nO1xufTtcbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBDT01QQVQ6IHByZS1yMTM3XG4gKlxuICogVGhpcyBmdW5jdGlvbiBpcyBubyBsb25nZXIgcmVxdWlyZWQgYmVnaW5uaW5nIGZyb20gcjEzN1xuICpcbiAqIFJldHJpZXZlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvYmxvYi84OGI2MzI4OTk4ZDE1NWZhMGE3YzFmMWU1ZTNiZDZiZmY3NTI2OGMwL3NyYy9yZW5kZXJlcnMvd2ViZ2wvV2ViR0xQcm9ncmFtcy5qcyNMOTJcbiAqXG4gKiBEaWZmOlxuICogICAtIFJlbW92ZSBXZWJHTFJlbmRlclRhcmdldCBoYW5kbGVyIGJlY2F1c2UgaXQgaW5jcmVhc2VzIGNvZGUgY29tcGxleGl0aWVzIG9uIFR5cGVTY3JpcHRcbiAqICAgLSBBZGQgYSBib29sZWFuIGBpc1dlYkdMMmAgYXMgYSBzZWNvbmQgYXJndW1lbnQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRUZXh0dXJlRW5jb2RpbmdGcm9tTWFwKG1hcDogVEhSRUUuVGV4dHVyZSwgaXNXZWJHTDI6IGJvb2xlYW4pOiBUSFJFRS5UZXh0dXJlRW5jb2Rpbmcge1xuICBsZXQgZW5jb2Rpbmc7XG5cbiAgaWYgKG1hcCAmJiBtYXAuaXNUZXh0dXJlKSB7XG4gICAgZW5jb2RpbmcgPSBtYXAuZW5jb2Rpbmc7XG4gICAgLy8gfSBlbHNlIGlmICggbWFwICYmIG1hcC5pc1dlYkdMUmVuZGVyVGFyZ2V0ICkge1xuICAgIC8vICAgY29uc29sZS53YXJuKCAnVEhSRUUuV2ViR0xQcm9ncmFtcy5nZXRUZXh0dXJlRW5jb2RpbmdGcm9tTWFwOiBkb25cXCd0IHVzZSByZW5kZXIgdGFyZ2V0cyBhcyB0ZXh0dXJlcy4gVXNlIHRoZWlyIC50ZXh0dXJlIHByb3BlcnR5IGluc3RlYWQuJyApO1xuICAgIC8vICAgZW5jb2RpbmcgPSBtYXAudGV4dHVyZS5lbmNvZGluZztcbiAgfSBlbHNlIHtcbiAgICBlbmNvZGluZyA9IFRIUkVFLkxpbmVhckVuY29kaW5nO1xuICB9XG5cbiAgaWYgKHBhcnNlSW50KFRIUkVFLlJFVklTSU9OLCAxMCkgPj0gMTMzKSB7XG4gICAgaWYgKFxuICAgICAgaXNXZWJHTDIgJiZcbiAgICAgIG1hcCAmJlxuICAgICAgbWFwLmlzVGV4dHVyZSAmJlxuICAgICAgbWFwLmZvcm1hdCA9PT0gVEhSRUUuUkdCQUZvcm1hdCAmJlxuICAgICAgbWFwLnR5cGUgPT09IFRIUkVFLlVuc2lnbmVkQnl0ZVR5cGUgJiZcbiAgICAgIG1hcC5lbmNvZGluZyA9PT0gVEhSRUUuc1JHQkVuY29kaW5nXG4gICAgKSB7XG4gICAgICBlbmNvZGluZyA9IFRIUkVFLkxpbmVhckVuY29kaW5nOyAvLyBkaXNhYmxlIGlubGluZSBkZWNvZGUgZm9yIHNSR0IgdGV4dHVyZXMgaW4gV2ViR0wgMlxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBlbmNvZGluZztcbn1cbiIsIi8qIHRzbGludDpkaXNhYmxlOm1lbWJlci1vcmRlcmluZyAqL1xuXG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgdmVydGV4U2hhZGVyIGZyb20gJy4vc2hhZGVycy9tdG9vbi52ZXJ0JztcbmltcG9ydCBmcmFnbWVudFNoYWRlciBmcm9tICcuL3NoYWRlcnMvbXRvb24uZnJhZyc7XG5pbXBvcnQgeyBNVG9vbk1hdGVyaWFsRGVidWdNb2RlIH0gZnJvbSAnLi9NVG9vbk1hdGVyaWFsRGVidWdNb2RlJztcbmltcG9ydCB7IE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlIH0gZnJvbSAnLi9NVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZSc7XG5pbXBvcnQgdHlwZSB7IE1Ub29uTWF0ZXJpYWxQYXJhbWV0ZXJzIH0gZnJvbSAnLi9NVG9vbk1hdGVyaWFsUGFyYW1ldGVycyc7XG5pbXBvcnQgeyBnZXRUZXhlbERlY29kaW5nRnVuY3Rpb24gfSBmcm9tICcuL3V0aWxzL2dldFRleGVsRGVjb2RpbmdGdW5jdGlvbic7XG5pbXBvcnQgeyBnZXRUZXh0dXJlRW5jb2RpbmdGcm9tTWFwIH0gZnJvbSAnLi91dGlscy9nZXRUZXh0dXJlRW5jb2RpbmdGcm9tTWFwJztcblxuLyoqXG4gKiBNVG9vbiBpcyBhIG1hdGVyaWFsIHNwZWNpZmljYXRpb24gdGhhdCBoYXMgdmFyaW91cyBmZWF0dXJlcy5cbiAqIFRoZSBzcGVjIGFuZCBpbXBsZW1lbnRhdGlvbiBhcmUgb3JpZ2luYWxseSBmb3VuZGVkIGZvciBVbml0eSBlbmdpbmUgYW5kIHRoaXMgaXMgYSBwb3J0IG9mIHRoZSBtYXRlcmlhbC5cbiAqXG4gKiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9TYW50YXJoL01Ub29uXG4gKi9cbmV4cG9ydCBjbGFzcyBNVG9vbk1hdGVyaWFsIGV4dGVuZHMgVEhSRUUuU2hhZGVyTWF0ZXJpYWwge1xuICBwdWJsaWMgdW5pZm9ybXM6IHtcbiAgICBsaXRGYWN0b3I6IFRIUkVFLklVbmlmb3JtPFRIUkVFLkNvbG9yPjtcbiAgICBhbHBoYVRlc3Q6IFRIUkVFLklVbmlmb3JtPG51bWJlcj47XG4gICAgb3BhY2l0eTogVEhSRUUuSVVuaWZvcm08bnVtYmVyPjtcbiAgICBtYXA6IFRIUkVFLklVbmlmb3JtPFRIUkVFLlRleHR1cmUgfCBudWxsPjtcbiAgICBtYXBVdlRyYW5zZm9ybTogVEhSRUUuSVVuaWZvcm08VEhSRUUuTWF0cml4Mz47XG4gICAgbm9ybWFsTWFwOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5UZXh0dXJlIHwgbnVsbD47XG4gICAgbm9ybWFsTWFwVXZUcmFuc2Zvcm06IFRIUkVFLklVbmlmb3JtPFRIUkVFLk1hdHJpeDM+O1xuICAgIG5vcm1hbFNjYWxlOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5WZWN0b3IyPjtcbiAgICBlbWlzc2l2ZTogVEhSRUUuSVVuaWZvcm08VEhSRUUuQ29sb3I+O1xuICAgIGVtaXNzaXZlSW50ZW5zaXR5OiBUSFJFRS5JVW5pZm9ybTxudW1iZXI+O1xuICAgIGVtaXNzaXZlTWFwOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5UZXh0dXJlIHwgbnVsbD47XG4gICAgZW1pc3NpdmVNYXBVdlRyYW5zZm9ybTogVEhSRUUuSVVuaWZvcm08VEhSRUUuTWF0cml4Mz47XG4gICAgc2hhZGVDb2xvckZhY3RvcjogVEhSRUUuSVVuaWZvcm08VEhSRUUuQ29sb3I+O1xuICAgIHNoYWRlTXVsdGlwbHlUZXh0dXJlOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5UZXh0dXJlIHwgbnVsbD47XG4gICAgc2hhZGVNdWx0aXBseVRleHR1cmVVdlRyYW5zZm9ybTogVEhSRUUuSVVuaWZvcm08VEhSRUUuTWF0cml4Mz47XG4gICAgc2hhZGluZ1NoaWZ0RmFjdG9yOiBUSFJFRS5JVW5pZm9ybTxudW1iZXI+O1xuICAgIHNoYWRpbmdTaGlmdFRleHR1cmU6IFRIUkVFLklVbmlmb3JtPFRIUkVFLlRleHR1cmUgfCBudWxsPjtcbiAgICBzaGFkaW5nU2hpZnRUZXh0dXJlVXZUcmFuc2Zvcm06IFRIUkVFLklVbmlmb3JtPFRIUkVFLk1hdHJpeDM+O1xuICAgIHNoYWRpbmdTaGlmdFRleHR1cmVTY2FsZTogVEhSRUUuSVVuaWZvcm08bnVtYmVyPjtcbiAgICBzaGFkaW5nVG9vbnlGYWN0b3I6IFRIUkVFLklVbmlmb3JtPG51bWJlcj47XG4gICAgZ2lFcXVhbGl6YXRpb25GYWN0b3I6IFRIUkVFLklVbmlmb3JtPG51bWJlcj47XG4gICAgbWF0Y2FwRmFjdG9yOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5Db2xvcj47XG4gICAgbWF0Y2FwVGV4dHVyZTogVEhSRUUuSVVuaWZvcm08VEhSRUUuVGV4dHVyZSB8IG51bGw+O1xuICAgIG1hdGNhcFRleHR1cmVVdlRyYW5zZm9ybTogVEhSRUUuSVVuaWZvcm08VEhSRUUuTWF0cml4Mz47XG4gICAgcGFyYW1ldHJpY1JpbUNvbG9yRmFjdG9yOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5Db2xvcj47XG4gICAgcmltTXVsdGlwbHlUZXh0dXJlOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5UZXh0dXJlIHwgbnVsbD47XG4gICAgcmltTXVsdGlwbHlUZXh0dXJlVXZUcmFuc2Zvcm06IFRIUkVFLklVbmlmb3JtPFRIUkVFLk1hdHJpeDM+O1xuICAgIHJpbUxpZ2h0aW5nTWl4RmFjdG9yOiBUSFJFRS5JVW5pZm9ybTxudW1iZXI+O1xuICAgIHBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJGYWN0b3I6IFRIUkVFLklVbmlmb3JtPG51bWJlcj47XG4gICAgcGFyYW1ldHJpY1JpbUxpZnRGYWN0b3I6IFRIUkVFLklVbmlmb3JtPG51bWJlcj47XG4gICAgb3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5UZXh0dXJlIHwgbnVsbD47XG4gICAgb3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlVXZUcmFuc2Zvcm06IFRIUkVFLklVbmlmb3JtPFRIUkVFLk1hdHJpeDM+O1xuICAgIG91dGxpbmVXaWR0aEZhY3RvcjogVEhSRUUuSVVuaWZvcm08bnVtYmVyPjtcbiAgICBvdXRsaW5lQ29sb3JGYWN0b3I6IFRIUkVFLklVbmlmb3JtPFRIUkVFLkNvbG9yPjtcbiAgICBvdXRsaW5lTGlnaHRpbmdNaXhGYWN0b3I6IFRIUkVFLklVbmlmb3JtPG51bWJlcj47XG4gICAgdXZBbmltYXRpb25NYXNrVGV4dHVyZTogVEhSRUUuSVVuaWZvcm08VEhSRUUuVGV4dHVyZSB8IG51bGw+O1xuICAgIHV2QW5pbWF0aW9uTWFza1RleHR1cmVVdlRyYW5zZm9ybTogVEhSRUUuSVVuaWZvcm08VEhSRUUuTWF0cml4Mz47XG4gICAgdXZBbmltYXRpb25TY3JvbGxYT2Zmc2V0OiBUSFJFRS5JVW5pZm9ybTxudW1iZXI+O1xuICAgIHV2QW5pbWF0aW9uU2Nyb2xsWU9mZnNldDogVEhSRUUuSVVuaWZvcm08bnVtYmVyPjtcbiAgICB1dkFuaW1hdGlvblJvdGF0aW9uUGhhc2U6IFRIUkVFLklVbmlmb3JtPG51bWJlcj47XG4gIH07XG5cbiAgcHVibGljIGdldCBjb2xvcigpOiBUSFJFRS5Db2xvciB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMubGl0RmFjdG9yLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgY29sb3IodmFsdWU6IFRIUkVFLkNvbG9yKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5saXRGYWN0b3IudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgbWFwKCk6IFRIUkVFLlRleHR1cmUgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5tYXAudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCBtYXAodmFsdWU6IFRIUkVFLlRleHR1cmUgfCBudWxsKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5tYXAudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgbm9ybWFsTWFwKCk6IFRIUkVFLlRleHR1cmUgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5ub3JtYWxNYXAudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCBub3JtYWxNYXAodmFsdWU6IFRIUkVFLlRleHR1cmUgfCBudWxsKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5ub3JtYWxNYXAudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgbm9ybWFsU2NhbGUoKTogVEhSRUUuVmVjdG9yMiB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMubm9ybWFsU2NhbGUudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCBub3JtYWxTY2FsZSh2YWx1ZTogVEhSRUUuVmVjdG9yMikge1xuICAgIHRoaXMudW5pZm9ybXMubm9ybWFsU2NhbGUudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgZW1pc3NpdmUoKTogVEhSRUUuQ29sb3Ige1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLmVtaXNzaXZlLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgZW1pc3NpdmUodmFsdWU6IFRIUkVFLkNvbG9yKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5lbWlzc2l2ZS52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBlbWlzc2l2ZUludGVuc2l0eSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLmVtaXNzaXZlSW50ZW5zaXR5LnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgZW1pc3NpdmVJbnRlbnNpdHkodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMudW5pZm9ybXMuZW1pc3NpdmVJbnRlbnNpdHkudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgZW1pc3NpdmVNYXAoKTogVEhSRUUuVGV4dHVyZSB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLmVtaXNzaXZlTWFwLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgZW1pc3NpdmVNYXAodmFsdWU6IFRIUkVFLlRleHR1cmUgfCBudWxsKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5lbWlzc2l2ZU1hcC52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBzaGFkZUNvbG9yRmFjdG9yKCk6IFRIUkVFLkNvbG9yIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5zaGFkZUNvbG9yRmFjdG9yLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgc2hhZGVDb2xvckZhY3Rvcih2YWx1ZTogVEhSRUUuQ29sb3IpIHtcbiAgICB0aGlzLnVuaWZvcm1zLnNoYWRlQ29sb3JGYWN0b3IudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc2hhZGVNdWx0aXBseVRleHR1cmUoKTogVEhSRUUuVGV4dHVyZSB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLnNoYWRlTXVsdGlwbHlUZXh0dXJlLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgc2hhZGVNdWx0aXBseVRleHR1cmUodmFsdWU6IFRIUkVFLlRleHR1cmUgfCBudWxsKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5zaGFkZU11bHRpcGx5VGV4dHVyZS52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBzaGFkaW5nU2hpZnRGYWN0b3IoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5zaGFkaW5nU2hpZnRGYWN0b3IudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCBzaGFkaW5nU2hpZnRGYWN0b3IodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMudW5pZm9ybXMuc2hhZGluZ1NoaWZ0RmFjdG9yLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHNoYWRpbmdTaGlmdFRleHR1cmUoKTogVEhSRUUuVGV4dHVyZSB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLnNoYWRpbmdTaGlmdFRleHR1cmUudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCBzaGFkaW5nU2hpZnRUZXh0dXJlKHZhbHVlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCkge1xuICAgIHRoaXMudW5pZm9ybXMuc2hhZGluZ1NoaWZ0VGV4dHVyZS52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBzaGFkaW5nU2hpZnRUZXh0dXJlU2NhbGUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5zaGFkaW5nU2hpZnRUZXh0dXJlU2NhbGUudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCBzaGFkaW5nU2hpZnRUZXh0dXJlU2NhbGUodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMudW5pZm9ybXMuc2hhZGluZ1NoaWZ0VGV4dHVyZVNjYWxlLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHNoYWRpbmdUb29ueUZhY3RvcigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLnNoYWRpbmdUb29ueUZhY3Rvci52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IHNoYWRpbmdUb29ueUZhY3Rvcih2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5zaGFkaW5nVG9vbnlGYWN0b3IudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgZ2lFcXVhbGl6YXRpb25GYWN0b3IoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5naUVxdWFsaXphdGlvbkZhY3Rvci52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IGdpRXF1YWxpemF0aW9uRmFjdG9yKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLnVuaWZvcm1zLmdpRXF1YWxpemF0aW9uRmFjdG9yLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG1hdGNhcEZhY3RvcigpOiBUSFJFRS5Db2xvciB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMubWF0Y2FwRmFjdG9yLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgbWF0Y2FwRmFjdG9yKHZhbHVlOiBUSFJFRS5Db2xvcikge1xuICAgIHRoaXMudW5pZm9ybXMubWF0Y2FwRmFjdG9yLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG1hdGNhcFRleHR1cmUoKTogVEhSRUUuVGV4dHVyZSB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLm1hdGNhcFRleHR1cmUudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCBtYXRjYXBUZXh0dXJlKHZhbHVlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCkge1xuICAgIHRoaXMudW5pZm9ybXMubWF0Y2FwVGV4dHVyZS52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBwYXJhbWV0cmljUmltQ29sb3JGYWN0b3IoKTogVEhSRUUuQ29sb3Ige1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLnBhcmFtZXRyaWNSaW1Db2xvckZhY3Rvci52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IHBhcmFtZXRyaWNSaW1Db2xvckZhY3Rvcih2YWx1ZTogVEhSRUUuQ29sb3IpIHtcbiAgICB0aGlzLnVuaWZvcm1zLnBhcmFtZXRyaWNSaW1Db2xvckZhY3Rvci52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCByaW1NdWx0aXBseVRleHR1cmUoKTogVEhSRUUuVGV4dHVyZSB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLnJpbU11bHRpcGx5VGV4dHVyZS52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IHJpbU11bHRpcGx5VGV4dHVyZSh2YWx1ZTogVEhSRUUuVGV4dHVyZSB8IG51bGwpIHtcbiAgICB0aGlzLnVuaWZvcm1zLnJpbU11bHRpcGx5VGV4dHVyZS52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCByaW1MaWdodGluZ01peEZhY3RvcigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLnJpbUxpZ2h0aW5nTWl4RmFjdG9yLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgcmltTGlnaHRpbmdNaXhGYWN0b3IodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMudW5pZm9ybXMucmltTGlnaHRpbmdNaXhGYWN0b3IudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlckZhY3RvcigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLnBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJGYWN0b3IudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCBwYXJhbWV0cmljUmltRnJlc25lbFBvd2VyRmFjdG9yKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLnVuaWZvcm1zLnBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJGYWN0b3IudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcGFyYW1ldHJpY1JpbUxpZnRGYWN0b3IoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5wYXJhbWV0cmljUmltTGlmdEZhY3Rvci52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IHBhcmFtZXRyaWNSaW1MaWZ0RmFjdG9yKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLnVuaWZvcm1zLnBhcmFtZXRyaWNSaW1MaWZ0RmFjdG9yLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZSgpOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMub3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgb3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlKHZhbHVlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCkge1xuICAgIHRoaXMudW5pZm9ybXMub3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG91dGxpbmVXaWR0aEZhY3RvcigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLm91dGxpbmVXaWR0aEZhY3Rvci52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IG91dGxpbmVXaWR0aEZhY3Rvcih2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5vdXRsaW5lV2lkdGhGYWN0b3IudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgb3V0bGluZUNvbG9yRmFjdG9yKCk6IFRIUkVFLkNvbG9yIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5vdXRsaW5lQ29sb3JGYWN0b3IudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCBvdXRsaW5lQ29sb3JGYWN0b3IodmFsdWU6IFRIUkVFLkNvbG9yKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5vdXRsaW5lQ29sb3JGYWN0b3IudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgb3V0bGluZUxpZ2h0aW5nTWl4RmFjdG9yKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMub3V0bGluZUxpZ2h0aW5nTWl4RmFjdG9yLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgb3V0bGluZUxpZ2h0aW5nTWl4RmFjdG9yKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLnVuaWZvcm1zLm91dGxpbmVMaWdodGluZ01peEZhY3Rvci52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCB1dkFuaW1hdGlvbk1hc2tUZXh0dXJlKCk6IFRIUkVFLlRleHR1cmUgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy51dkFuaW1hdGlvbk1hc2tUZXh0dXJlLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgdXZBbmltYXRpb25NYXNrVGV4dHVyZSh2YWx1ZTogVEhSRUUuVGV4dHVyZSB8IG51bGwpIHtcbiAgICB0aGlzLnVuaWZvcm1zLnV2QW5pbWF0aW9uTWFza1RleHR1cmUudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdXZBbmltYXRpb25TY3JvbGxYT2Zmc2V0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMudXZBbmltYXRpb25TY3JvbGxYT2Zmc2V0LnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgdXZBbmltYXRpb25TY3JvbGxYT2Zmc2V0KHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLnVuaWZvcm1zLnV2QW5pbWF0aW9uU2Nyb2xsWE9mZnNldC52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCB1dkFuaW1hdGlvblNjcm9sbFlPZmZzZXQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy51dkFuaW1hdGlvblNjcm9sbFlPZmZzZXQudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCB1dkFuaW1hdGlvblNjcm9sbFlPZmZzZXQodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMudW5pZm9ybXMudXZBbmltYXRpb25TY3JvbGxZT2Zmc2V0LnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHV2QW5pbWF0aW9uUm90YXRpb25QaGFzZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLnV2QW5pbWF0aW9uUm90YXRpb25QaGFzZS52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IHV2QW5pbWF0aW9uUm90YXRpb25QaGFzZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy51bmlmb3Jtcy51dkFuaW1hdGlvblJvdGF0aW9uUGhhc2UudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyB1dkFuaW1hdGlvblNjcm9sbFhTcGVlZEZhY3RvciA9IDAuMDtcbiAgcHVibGljIHV2QW5pbWF0aW9uU2Nyb2xsWVNwZWVkRmFjdG9yID0gMC4wO1xuICBwdWJsaWMgdXZBbmltYXRpb25Sb3RhdGlvblNwZWVkRmFjdG9yID0gMC4wO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBtYXRlcmlhbCBpcyBhZmZlY3RlZCBieSBmb2cuXG4gICAqIGB0cnVlYCBieSBkZWZhdWx0LlxuICAgKi9cbiAgcHVibGljIGZvZyA9IHRydWU7XG5cbiAgLyoqXG4gICAqIFdpbGwgYmUgcmVhZCBpbiBXZWJHTFByb2dyYW1zXG4gICAqXG4gICAqIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9ibG9iLzRmNTIzNmFjM2Q2ZjQxZDkwNGFhNTg0MDFiNDA1NTRlOGZiZGNiMTUvc3JjL3JlbmRlcmVycy93ZWJnbC9XZWJHTFByb2dyYW1zLmpzI0wxOTAtTDE5MVxuICAgKi9cbiAgcHVibGljIG5vcm1hbE1hcFR5cGUgPSBUSFJFRS5UYW5nZW50U3BhY2VOb3JtYWxNYXA7XG5cbiAgLyoqXG4gICAqIFdoZW4gdGhpcyBpcyBgdHJ1ZWAsIHZlcnRleCBjb2xvcnMgd2lsbCBiZSBpZ25vcmVkLlxuICAgKiBgdHJ1ZWAgYnkgZGVmYXVsdC5cbiAgICovXG4gIHByaXZhdGUgX2lnbm9yZVZlcnRleENvbG9yID0gdHJ1ZTtcblxuICAvKipcbiAgICogV2hlbiB0aGlzIGlzIGB0cnVlYCwgdmVydGV4IGNvbG9ycyB3aWxsIGJlIGlnbm9yZWQuXG4gICAqIGB0cnVlYCBieSBkZWZhdWx0LlxuICAgKi9cbiAgcHVibGljIGdldCBpZ25vcmVWZXJ0ZXhDb2xvcigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faWdub3JlVmVydGV4Q29sb3I7XG4gIH1cbiAgcHVibGljIHNldCBpZ25vcmVWZXJ0ZXhDb2xvcih2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2lnbm9yZVZlcnRleENvbG9yID0gdmFsdWU7XG5cbiAgICB0aGlzLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX3YwQ29tcGF0U2hhZGUgPSBmYWxzZTtcblxuICAvKipcbiAgICogVGhlcmUgaXMgYSBsaW5lIG9mIHRoZSBzaGFkZXIgY2FsbGVkIFwiY29tbWVudCBvdXQgaWYgeW91IHdhbnQgdG8gUEJSIGFic29sdXRlbHlcIiBpbiBWUk0wLjAgTVRvb24uXG4gICAqIFdoZW4gdGhpcyBpcyB0cnVlLCB0aGUgbWF0ZXJpYWwgZW5hYmxlcyB0aGUgbGluZSB0byBtYWtlIGl0IGNvbXBhdGlibGUgd2l0aCB0aGUgbGVnYWN5IHJlbmRlcmluZyBvZiBWUk0uXG4gICAqIFVzdWFsbHkgbm90IHJlY29tbWVuZGVkIHRvIHR1cm4gdGhpcyBvbi5cbiAgICogYGZhbHNlYCBieSBkZWZhdWx0LlxuICAgKi9cbiAgZ2V0IHYwQ29tcGF0U2hhZGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3YwQ29tcGF0U2hhZGU7XG4gIH1cblxuICAvKipcbiAgICogVGhlcmUgaXMgYSBsaW5lIG9mIHRoZSBzaGFkZXIgY2FsbGVkIFwiY29tbWVudCBvdXQgaWYgeW91IHdhbnQgdG8gUEJSIGFic29sdXRlbHlcIiBpbiBWUk0wLjAgTVRvb24uXG4gICAqIFdoZW4gdGhpcyBpcyB0cnVlLCB0aGUgbWF0ZXJpYWwgZW5hYmxlcyB0aGUgbGluZSB0byBtYWtlIGl0IGNvbXBhdGlibGUgd2l0aCB0aGUgbGVnYWN5IHJlbmRlcmluZyBvZiBWUk0uXG4gICAqIFVzdWFsbHkgbm90IHJlY29tbWVuZGVkIHRvIHR1cm4gdGhpcyBvbi5cbiAgICogYGZhbHNlYCBieSBkZWZhdWx0LlxuICAgKi9cbiAgc2V0IHYwQ29tcGF0U2hhZGUodjogYm9vbGVhbikge1xuICAgIHRoaXMuX3YwQ29tcGF0U2hhZGUgPSB2O1xuXG4gICAgdGhpcy5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIF9kZWJ1Z01vZGU6IE1Ub29uTWF0ZXJpYWxEZWJ1Z01vZGUgPSBNVG9vbk1hdGVyaWFsRGVidWdNb2RlLk5vbmU7XG5cbiAgLyoqXG4gICAqIERlYnVnIG1vZGUgZm9yIHRoZSBtYXRlcmlhbC5cbiAgICogWW91IGNhbiB2aXN1YWxpemUgc2V2ZXJhbCBjb21wb25lbnRzIGZvciBkaWFnbm9zaXMgdXNpbmcgZGVidWcgbW9kZS5cbiAgICpcbiAgICogU2VlOiB7QGxpbmsgTVRvb25NYXRlcmlhbERlYnVnTW9kZX1cbiAgICovXG4gIGdldCBkZWJ1Z01vZGUoKTogTVRvb25NYXRlcmlhbERlYnVnTW9kZSB7XG4gICAgcmV0dXJuIHRoaXMuX2RlYnVnTW9kZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWJ1ZyBtb2RlIGZvciB0aGUgbWF0ZXJpYWwuXG4gICAqIFlvdSBjYW4gdmlzdWFsaXplIHNldmVyYWwgY29tcG9uZW50cyBmb3IgZGlhZ25vc2lzIHVzaW5nIGRlYnVnIG1vZGUuXG4gICAqXG4gICAqIFNlZToge0BsaW5rIE1Ub29uTWF0ZXJpYWxEZWJ1Z01vZGV9XG4gICAqL1xuICBzZXQgZGVidWdNb2RlKG06IE1Ub29uTWF0ZXJpYWxEZWJ1Z01vZGUpIHtcbiAgICB0aGlzLl9kZWJ1Z01vZGUgPSBtO1xuXG4gICAgdGhpcy5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIF9vdXRsaW5lV2lkdGhNb2RlOiBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZSA9IE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlLk5vbmU7XG5cbiAgZ2V0IG91dGxpbmVXaWR0aE1vZGUoKTogTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUge1xuICAgIHJldHVybiB0aGlzLl9vdXRsaW5lV2lkdGhNb2RlO1xuICB9XG4gIHNldCBvdXRsaW5lV2lkdGhNb2RlKG06IE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlKSB7XG4gICAgdGhpcy5fb3V0bGluZVdpZHRoTW9kZSA9IG07XG5cbiAgICB0aGlzLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX2lzT3V0bGluZSA9IGZhbHNlO1xuXG4gIGdldCBpc091dGxpbmUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2lzT3V0bGluZTtcbiAgfVxuICBzZXQgaXNPdXRsaW5lKGI6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9pc091dGxpbmUgPSBiO1xuXG4gICAgdGhpcy5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogUmVhZG9ubHkgYm9vbGVhbiB0aGF0IGluZGljYXRlcyB0aGlzIGlzIGEgW1tNVG9vbk1hdGVyaWFsXV0uXG4gICAqL1xuICBwdWJsaWMgZ2V0IGlzTVRvb25NYXRlcmlhbCgpOiB0cnVlIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHBhcmFtZXRlcnM6IE1Ub29uTWF0ZXJpYWxQYXJhbWV0ZXJzID0ge30pIHtcbiAgICBzdXBlcih7IHZlcnRleFNoYWRlciwgZnJhZ21lbnRTaGFkZXIgfSk7XG5cbiAgICAvLyBvdmVycmlkZSBkZXB0aFdyaXRlIHdpdGggdHJhbnNwYXJlbnRXaXRoWldyaXRlXG4gICAgaWYgKHBhcmFtZXRlcnMudHJhbnNwYXJlbnRXaXRoWldyaXRlKSB7XG4gICAgICBwYXJhbWV0ZXJzLmRlcHRoV3JpdGUgPSB0cnVlO1xuICAgIH1cbiAgICBkZWxldGUgcGFyYW1ldGVycy50cmFuc3BhcmVudFdpdGhaV3JpdGU7XG5cbiAgICAvLyA9PSBlbmFibGluZyBidW5jaCBvZiBzdHVmZiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBwYXJhbWV0ZXJzLmZvZyA9IHRydWU7XG4gICAgcGFyYW1ldGVycy5saWdodHMgPSB0cnVlO1xuICAgIHBhcmFtZXRlcnMuY2xpcHBpbmcgPSB0cnVlO1xuXG4gICAgLy8gQ09NUEFUOiBwcmUtcjEyOVxuICAgIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9wdWxsLzIxNzg4XG4gICAgaWYgKHBhcnNlSW50KFRIUkVFLlJFVklTSU9OLCAxMCkgPCAxMjkpIHtcbiAgICAgIChwYXJhbWV0ZXJzIGFzIGFueSkuc2tpbm5pbmcgPSAocGFyYW1ldGVycyBhcyBhbnkpLnNraW5uaW5nIHx8IGZhbHNlO1xuICAgIH1cblxuICAgIC8vIENPTVBBVDogcHJlLXIxMzFcbiAgICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvcHVsbC8yMjE2OVxuICAgIGlmIChwYXJzZUludChUSFJFRS5SRVZJU0lPTiwgMTApIDwgMTMxKSB7XG4gICAgICAocGFyYW1ldGVycyBhcyBhbnkpLm1vcnBoVGFyZ2V0cyA9IChwYXJhbWV0ZXJzIGFzIGFueSkubW9ycGhUYXJnZXRzIHx8IGZhbHNlO1xuICAgICAgKHBhcmFtZXRlcnMgYXMgYW55KS5tb3JwaE5vcm1hbHMgPSAocGFyYW1ldGVycyBhcyBhbnkpLm1vcnBoTm9ybWFscyB8fCBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyA9PSB1bmlmb3JtcyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICB0aGlzLnVuaWZvcm1zID0gVEhSRUUuVW5pZm9ybXNVdGlscy5tZXJnZShbXG4gICAgICBUSFJFRS5Vbmlmb3Jtc0xpYi5jb21tb24sIC8vIG1hcFxuICAgICAgVEhSRUUuVW5pZm9ybXNMaWIubm9ybWFsbWFwLCAvLyBub3JtYWxNYXBcbiAgICAgIFRIUkVFLlVuaWZvcm1zTGliLmVtaXNzaXZlbWFwLCAvLyBlbWlzc2l2ZU1hcFxuICAgICAgVEhSRUUuVW5pZm9ybXNMaWIuZm9nLFxuICAgICAgVEhSRUUuVW5pZm9ybXNMaWIubGlnaHRzLFxuICAgICAge1xuICAgICAgICBsaXRGYWN0b3I6IHsgdmFsdWU6IG5ldyBUSFJFRS5Db2xvcigxLjAsIDEuMCwgMS4wKSB9LFxuICAgICAgICBtYXBVdlRyYW5zZm9ybTogeyB2YWx1ZTogbmV3IFRIUkVFLk1hdHJpeDMoKSB9LFxuICAgICAgICBjb2xvckFscGhhOiB7IHZhbHVlOiAxLjAgfSxcbiAgICAgICAgbm9ybWFsTWFwVXZUcmFuc2Zvcm06IHsgdmFsdWU6IG5ldyBUSFJFRS5NYXRyaXgzKCkgfSxcbiAgICAgICAgc2hhZGVDb2xvckZhY3RvcjogeyB2YWx1ZTogbmV3IFRIUkVFLkNvbG9yKDAuOTcsIDAuODEsIDAuODYpIH0sXG4gICAgICAgIHNoYWRlTXVsdGlwbHlUZXh0dXJlOiB7IHZhbHVlOiBudWxsIH0sXG4gICAgICAgIHNoYWRlTXVsdGlwbHlUZXh0dXJlVXZUcmFuc2Zvcm06IHsgdmFsdWU6IG5ldyBUSFJFRS5NYXRyaXgzKCkgfSxcbiAgICAgICAgc2hhZGluZ1NoaWZ0RmFjdG9yOiB7IHZhbHVlOiAwLjAgfSxcbiAgICAgICAgc2hhZGluZ1NoaWZ0VGV4dHVyZTogeyB2YWx1ZTogbnVsbCB9LFxuICAgICAgICBzaGFkaW5nU2hpZnRUZXh0dXJlVXZUcmFuc2Zvcm06IHsgdmFsdWU6IG5ldyBUSFJFRS5NYXRyaXgzKCkgfSxcbiAgICAgICAgc2hhZGluZ1NoaWZ0VGV4dHVyZVNjYWxlOiB7IHZhbHVlOiBudWxsIH0sXG4gICAgICAgIHNoYWRpbmdUb29ueUZhY3RvcjogeyB2YWx1ZTogMC45IH0sXG4gICAgICAgIGdpRXF1YWxpemF0aW9uRmFjdG9yOiB7IHZhbHVlOiAwLjkgfSxcbiAgICAgICAgbWF0Y2FwRmFjdG9yOiB7IHZhbHVlOiBuZXcgVEhSRUUuQ29sb3IoMC4wLCAwLjAsIDAuMCkgfSxcbiAgICAgICAgbWF0Y2FwVGV4dHVyZTogeyB2YWx1ZTogbnVsbCB9LFxuICAgICAgICBtYXRjYXBUZXh0dXJlVXZUcmFuc2Zvcm06IHsgdmFsdWU6IG5ldyBUSFJFRS5NYXRyaXgzKCkgfSxcbiAgICAgICAgcGFyYW1ldHJpY1JpbUNvbG9yRmFjdG9yOiB7IHZhbHVlOiBuZXcgVEhSRUUuQ29sb3IoMC4wLCAwLjAsIDAuMCkgfSxcbiAgICAgICAgcmltTXVsdGlwbHlUZXh0dXJlOiB7IHZhbHVlOiBudWxsIH0sXG4gICAgICAgIHJpbU11bHRpcGx5VGV4dHVyZVV2VHJhbnNmb3JtOiB7IHZhbHVlOiBuZXcgVEhSRUUuTWF0cml4MygpIH0sXG4gICAgICAgIHJpbUxpZ2h0aW5nTWl4RmFjdG9yOiB7IHZhbHVlOiAwLjAgfSxcbiAgICAgICAgcGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlckZhY3RvcjogeyB2YWx1ZTogMS4wIH0sXG4gICAgICAgIHBhcmFtZXRyaWNSaW1MaWZ0RmFjdG9yOiB7IHZhbHVlOiAwLjAgfSxcbiAgICAgICAgZW1pc3NpdmU6IHsgdmFsdWU6IG5ldyBUSFJFRS5Db2xvcigwLjAsIDAuMCwgMC4wKSB9LFxuICAgICAgICBlbWlzc2l2ZUludGVuc2l0eTogeyB2YWx1ZTogMS4wIH0sXG4gICAgICAgIGVtaXNzaXZlTWFwVXZUcmFuc2Zvcm06IHsgdmFsdWU6IG5ldyBUSFJFRS5NYXRyaXgzKCkgfSxcbiAgICAgICAgb3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlOiB7IHZhbHVlOiBudWxsIH0sXG4gICAgICAgIG91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZVV2VHJhbnNmb3JtOiB7IHZhbHVlOiBuZXcgVEhSRUUuTWF0cml4MygpIH0sXG4gICAgICAgIG91dGxpbmVXaWR0aEZhY3RvcjogeyB2YWx1ZTogMC41IH0sXG4gICAgICAgIG91dGxpbmVDb2xvckZhY3RvcjogeyB2YWx1ZTogbmV3IFRIUkVFLkNvbG9yKDAuMCwgMC4wLCAwLjApIH0sXG4gICAgICAgIG91dGxpbmVMaWdodGluZ01peEZhY3RvcjogeyB2YWx1ZTogMS4wIH0sXG4gICAgICAgIHV2QW5pbWF0aW9uTWFza1RleHR1cmU6IHsgdmFsdWU6IG51bGwgfSxcbiAgICAgICAgdXZBbmltYXRpb25NYXNrVGV4dHVyZVV2VHJhbnNmb3JtOiB7IHZhbHVlOiBuZXcgVEhSRUUuTWF0cml4MygpIH0sXG4gICAgICAgIHV2QW5pbWF0aW9uU2Nyb2xsWE9mZnNldDogeyB2YWx1ZTogMC4wIH0sXG4gICAgICAgIHV2QW5pbWF0aW9uU2Nyb2xsWU9mZnNldDogeyB2YWx1ZTogMC4wIH0sXG4gICAgICAgIHV2QW5pbWF0aW9uUm90YXRpb25QaGFzZTogeyB2YWx1ZTogMC4wIH0sXG4gICAgICB9LFxuICAgICAgcGFyYW1ldGVycy51bmlmb3JtcyxcbiAgICBdKTtcblxuICAgIC8vID09IGZpbmFsbHkgY29tcGlsZSB0aGUgc2hhZGVyIHByb2dyYW0gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHRoaXMuc2V0VmFsdWVzKHBhcmFtZXRlcnMpO1xuXG4gICAgLy8gPT0gdXBsb2FkIHVuaWZvcm1zIHRoYXQgbmVlZCB0byB1cGxvYWQgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgdGhpcy5fdXBsb2FkVW5pZm9ybXNXb3JrYXJvdW5kKCk7XG5cbiAgICAvLyA9PSB1cGRhdGUgc2hhZGVyIHN0dWZmID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICB0aGlzLmN1c3RvbVByb2dyYW1DYWNoZUtleSA9ICgpID0+XG4gICAgICBbXG4gICAgICAgIC4uLk9iamVjdC5lbnRyaWVzKHRoaXMuX2dlbmVyYXRlRGVmaW5lcygpKS5tYXAoKFt0b2tlbiwgbWFjcm9dKSA9PiBgJHt0b2tlbn06JHttYWNyb31gKSxcbiAgICAgICAgdGhpcy5tYXRjYXBUZXh0dXJlID8gYG1hdGNhcFRleHR1cmVFbmNvZGluZzoke3RoaXMubWF0Y2FwVGV4dHVyZS5lbmNvZGluZ31gIDogJycsXG4gICAgICAgIHRoaXMuc2hhZGVNdWx0aXBseVRleHR1cmUgPyBgc2hhZGVNdWx0aXBseVRleHR1cmVFbmNvZGluZzoke3RoaXMuc2hhZGVNdWx0aXBseVRleHR1cmUuZW5jb2Rpbmd9YCA6ICcnLFxuICAgICAgICB0aGlzLnJpbU11bHRpcGx5VGV4dHVyZSA/IGByaW1NdWx0aXBseVRleHR1cmVFbmNvZGluZzoke3RoaXMucmltTXVsdGlwbHlUZXh0dXJlLmVuY29kaW5nfWAgOiAnJyxcbiAgICAgIF0uam9pbignLCcpO1xuXG4gICAgdGhpcy5vbkJlZm9yZUNvbXBpbGUgPSAoc2hhZGVyLCByZW5kZXJlcikgPT4ge1xuICAgICAgLyoqXG4gICAgICAgKiBXaWxsIGJlIG5lZWRlZCB0byBkZXRlcm1pbmUgd2hldGhlciB3ZSBzaG91bGQgaW5saW5lIGNvbnZlcnQgc1JHQiB0ZXh0dXJlcyBvciBub3QuXG4gICAgICAgKiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvcHVsbC8yMjU1MVxuICAgICAgICovXG4gICAgICBjb25zdCBpc1dlYkdMMiA9IHJlbmRlcmVyLmNhcGFiaWxpdGllcy5pc1dlYkdMMjtcblxuICAgICAgY29uc3QgdGhyZWVSZXZpc2lvbiA9IHBhcnNlSW50KFRIUkVFLlJFVklTSU9OLCAxMCk7XG5cbiAgICAgIGNvbnN0IGRlZmluZXMgPVxuICAgICAgICBPYmplY3QuZW50cmllcyh7IC4uLnRoaXMuX2dlbmVyYXRlRGVmaW5lcygpLCAuLi50aGlzLmRlZmluZXMgfSlcbiAgICAgICAgICAuZmlsdGVyKChbdG9rZW4sIG1hY3JvXSkgPT4gISFtYWNybylcbiAgICAgICAgICAubWFwKChbdG9rZW4sIG1hY3JvXSkgPT4gYCNkZWZpbmUgJHt0b2tlbn0gJHttYWNyb31gKVxuICAgICAgICAgIC5qb2luKCdcXG4nKSArICdcXG4nO1xuXG4gICAgICAvLyAtLSB0ZXh0dXJlIGVuY29kaW5ncyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAvLyBDT01QQVQ6IHByZS1yMTM3XG4gICAgICBsZXQgZW5jb2RpbmdzID0gJyc7XG5cbiAgICAgIGlmIChwYXJzZUludChUSFJFRS5SRVZJU0lPTiwgMTApIDwgMTM3KSB7XG4gICAgICAgIGVuY29kaW5ncyA9XG4gICAgICAgICAgKHRoaXMubWF0Y2FwVGV4dHVyZSAhPT0gbnVsbFxuICAgICAgICAgICAgPyBnZXRUZXhlbERlY29kaW5nRnVuY3Rpb24oXG4gICAgICAgICAgICAgICAgJ21hdGNhcFRleHR1cmVUZXhlbFRvTGluZWFyJyxcbiAgICAgICAgICAgICAgICBnZXRUZXh0dXJlRW5jb2RpbmdGcm9tTWFwKHRoaXMubWF0Y2FwVGV4dHVyZSwgaXNXZWJHTDIpLFxuICAgICAgICAgICAgICApICsgJ1xcbidcbiAgICAgICAgICAgIDogJycpICtcbiAgICAgICAgICAodGhpcy5zaGFkZU11bHRpcGx5VGV4dHVyZSAhPT0gbnVsbFxuICAgICAgICAgICAgPyBnZXRUZXhlbERlY29kaW5nRnVuY3Rpb24oXG4gICAgICAgICAgICAgICAgJ3NoYWRlTXVsdGlwbHlUZXh0dXJlVGV4ZWxUb0xpbmVhcicsXG4gICAgICAgICAgICAgICAgZ2V0VGV4dHVyZUVuY29kaW5nRnJvbU1hcCh0aGlzLnNoYWRlTXVsdGlwbHlUZXh0dXJlLCBpc1dlYkdMMiksXG4gICAgICAgICAgICAgICkgKyAnXFxuJ1xuICAgICAgICAgICAgOiAnJykgK1xuICAgICAgICAgICh0aGlzLnJpbU11bHRpcGx5VGV4dHVyZSAhPT0gbnVsbFxuICAgICAgICAgICAgPyBnZXRUZXhlbERlY29kaW5nRnVuY3Rpb24oXG4gICAgICAgICAgICAgICAgJ3JpbU11bHRpcGx5VGV4dHVyZVRleGVsVG9MaW5lYXInLFxuICAgICAgICAgICAgICAgIGdldFRleHR1cmVFbmNvZGluZ0Zyb21NYXAodGhpcy5yaW1NdWx0aXBseVRleHR1cmUsIGlzV2ViR0wyKSxcbiAgICAgICAgICAgICAgKSArICdcXG4nXG4gICAgICAgICAgICA6ICcnKTtcbiAgICAgIH1cblxuICAgICAgLy8gLS0gZ2VuZXJhdGUgc2hhZGVyIGNvZGUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgc2hhZGVyLnZlcnRleFNoYWRlciA9IGRlZmluZXMgKyBzaGFkZXIudmVydGV4U2hhZGVyO1xuICAgICAgc2hhZGVyLmZyYWdtZW50U2hhZGVyID0gZGVmaW5lcyArIGVuY29kaW5ncyArIHNoYWRlci5mcmFnbWVudFNoYWRlcjtcblxuICAgICAgLy8gLS0gY29tcGF0IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAvLyBDT01QQVQ6IHByZS1yMTMyXG4gICAgICAvLyBUaHJlZS5qcyByMTMyIGludHJvZHVjZXMgbmV3IHNoYWRlciBjaHVua3MgPG5vcm1hbF9wYXJzX2ZyYWdtZW50PiBhbmQgPGFscGhhdGVzdF9wYXJzX2ZyYWdtZW50PlxuICAgICAgaWYgKHRocmVlUmV2aXNpb24gPCAxMzIpIHtcbiAgICAgICAgc2hhZGVyLmZyYWdtZW50U2hhZGVyID0gc2hhZGVyLmZyYWdtZW50U2hhZGVyLnJlcGxhY2UoJyNpbmNsdWRlIDxub3JtYWxfcGFyc19mcmFnbWVudD4nLCAnJyk7XG4gICAgICAgIHNoYWRlci5mcmFnbWVudFNoYWRlciA9IHNoYWRlci5mcmFnbWVudFNoYWRlci5yZXBsYWNlKCcjaW5jbHVkZSA8YWxwaGF0ZXN0X3BhcnNfZnJhZ21lbnQ+JywgJycpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoaXMgbWF0ZXJpYWwuXG4gICAqXG4gICAqIEBwYXJhbSBkZWx0YSBkZWx0YVRpbWUgc2luY2UgbGFzdCB1cGRhdGVcbiAgICovXG4gIHB1YmxpYyB1cGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX3VwbG9hZFVuaWZvcm1zV29ya2Fyb3VuZCgpO1xuICAgIHRoaXMuX3VwZGF0ZVVWQW5pbWF0aW9uKGRlbHRhKTtcbiAgfVxuXG4gIHB1YmxpYyBjb3B5KHNvdXJjZTogdGhpcyk6IHRoaXMge1xuICAgIHN1cGVyLmNvcHkoc291cmNlKTtcbiAgICAvLyB1bmlmb3JtcyBhcmUgYWxyZWFkeSBjb3BpZWQgYXQgdGhpcyBtb21lbnRcblxuICAgIC8vIEJlZ2lubmluZyBmcm9tIHIxMzMsIHVuaWZvcm0gdGV4dHVyZXMgd2lsbCBiZSBjbG9uZWQgaW5zdGVhZCBvZiByZWZlcmVuY2VcbiAgICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvYmxvYi9hODgxM2JlMDRhODQ5YmQxNTVmN2NmNmYxYjIzZDhlZTJlMGZiNDhiL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXIuanMjTDMwNDdcbiAgICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvYmxvYi9hODgxM2JlMDRhODQ5YmQxNTVmN2NmNmYxYjIzZDhlZTJlMGZiNDhiL3NyYy9yZW5kZXJlcnMvc2hhZGVycy9Vbmlmb3Jtc1V0aWxzLmpzI0wyMlxuICAgIC8vIFRoaXMgd2lsbCBsZWF2ZSB0aGVpciBgLnZlcnNpb25gIHRvIGJlIGAwYFxuICAgIC8vIGFuZCB0aGVzZSB0ZXh0dXJlcyB3b24ndCBiZSB1cGxvYWRlZCB0byBHUFVcbiAgICAvLyBXZSBhcmUgZ29pbmcgdG8gd29ya2Fyb3VuZCB0aGlzIGluIGhlcmVcbiAgICAvLyBJJ3ZlIG9wZW5lZCBhbiBpc3N1ZSBmb3IgdGhpczogaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9pc3N1ZXMvMjI3MThcbiAgICB0aGlzLm1hcCA9IHNvdXJjZS5tYXA7XG4gICAgdGhpcy5ub3JtYWxNYXAgPSBzb3VyY2Uubm9ybWFsTWFwO1xuICAgIHRoaXMuZW1pc3NpdmVNYXAgPSBzb3VyY2UuZW1pc3NpdmVNYXA7XG4gICAgdGhpcy5zaGFkZU11bHRpcGx5VGV4dHVyZSA9IHNvdXJjZS5zaGFkZU11bHRpcGx5VGV4dHVyZTtcbiAgICB0aGlzLnNoYWRpbmdTaGlmdFRleHR1cmUgPSBzb3VyY2Uuc2hhZGluZ1NoaWZ0VGV4dHVyZTtcbiAgICB0aGlzLm1hdGNhcFRleHR1cmUgPSBzb3VyY2UubWF0Y2FwVGV4dHVyZTtcbiAgICB0aGlzLnJpbU11bHRpcGx5VGV4dHVyZSA9IHNvdXJjZS5yaW1NdWx0aXBseVRleHR1cmU7XG4gICAgdGhpcy5vdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmUgPSBzb3VyY2Uub3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlO1xuICAgIHRoaXMudXZBbmltYXRpb25NYXNrVGV4dHVyZSA9IHNvdXJjZS51dkFuaW1hdGlvbk1hc2tUZXh0dXJlO1xuXG4gICAgLy8gPT0gY29weSBtZW1iZXJzID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgdGhpcy5ub3JtYWxNYXBUeXBlID0gc291cmNlLm5vcm1hbE1hcFR5cGU7XG5cbiAgICB0aGlzLnV2QW5pbWF0aW9uU2Nyb2xsWFNwZWVkRmFjdG9yID0gc291cmNlLnV2QW5pbWF0aW9uU2Nyb2xsWFNwZWVkRmFjdG9yO1xuICAgIHRoaXMudXZBbmltYXRpb25TY3JvbGxZU3BlZWRGYWN0b3IgPSBzb3VyY2UudXZBbmltYXRpb25TY3JvbGxZU3BlZWRGYWN0b3I7XG4gICAgdGhpcy51dkFuaW1hdGlvblJvdGF0aW9uU3BlZWRGYWN0b3IgPSBzb3VyY2UudXZBbmltYXRpb25Sb3RhdGlvblNwZWVkRmFjdG9yO1xuXG4gICAgdGhpcy5pZ25vcmVWZXJ0ZXhDb2xvciA9IHNvdXJjZS5pZ25vcmVWZXJ0ZXhDb2xvcjtcblxuICAgIHRoaXMudjBDb21wYXRTaGFkZSA9IHNvdXJjZS52MENvbXBhdFNoYWRlO1xuICAgIHRoaXMuZGVidWdNb2RlID0gc291cmNlLmRlYnVnTW9kZTtcbiAgICB0aGlzLm91dGxpbmVXaWR0aE1vZGUgPSBzb3VyY2Uub3V0bGluZVdpZHRoTW9kZTtcblxuICAgIHRoaXMuaXNPdXRsaW5lID0gc291cmNlLmlzT3V0bGluZTtcblxuICAgIC8vID09IHVwZGF0ZSBzaGFkZXIgc3R1ZmYgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHRoaXMubmVlZHNVcGRhdGUgPSB0cnVlO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIFVWIGFuaW1hdGlvbiBzdGF0ZS5cbiAgICogSW50ZW5kZWQgdG8gYmUgY2FsbGVkIHZpYSB7QGxpbmsgdXBkYXRlfS5cbiAgICogQHBhcmFtIGRlbHRhIGRlbHRhVGltZVxuICAgKi9cbiAgcHJpdmF0ZSBfdXBkYXRlVVZBbmltYXRpb24oZGVsdGE6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMudW5pZm9ybXMudXZBbmltYXRpb25TY3JvbGxYT2Zmc2V0LnZhbHVlICs9IGRlbHRhICogdGhpcy51dkFuaW1hdGlvblNjcm9sbFhTcGVlZEZhY3RvcjtcbiAgICB0aGlzLnVuaWZvcm1zLnV2QW5pbWF0aW9uU2Nyb2xsWU9mZnNldC52YWx1ZSArPSBkZWx0YSAqIHRoaXMudXZBbmltYXRpb25TY3JvbGxZU3BlZWRGYWN0b3I7XG4gICAgdGhpcy51bmlmb3Jtcy51dkFuaW1hdGlvblJvdGF0aW9uUGhhc2UudmFsdWUgKz0gZGVsdGEgKiB0aGlzLnV2QW5pbWF0aW9uUm90YXRpb25TcGVlZEZhY3RvcjtcblxuICAgIHRoaXMudW5pZm9ybXNOZWVkVXBkYXRlID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGxvYWQgdW5pZm9ybXMgdGhhdCBuZWVkIHRvIHVwbG9hZCBidXQgZG9lc24ndCBhdXRvbWF0aWNhbGx5IGJlY2F1c2Ugb2YgcmVhc29ucy5cbiAgICogSW50ZW5kZWQgdG8gYmUgY2FsbGVkIHZpYSB7QGxpbmsgY29uc3RydWN0b3J9IGFuZCB7QGxpbmsgdXBkYXRlfS5cbiAgICovXG4gIHByaXZhdGUgX3VwbG9hZFVuaWZvcm1zV29ya2Fyb3VuZCgpOiB2b2lkIHtcbiAgICAvLyB3b3JrYXJvdW5kOiBzaW5jZSBvcGFjaXR5IGlzIGRlZmluZWQgYXMgYSBwcm9wZXJ0eSBpbiBUSFJFRS5NYXRlcmlhbFxuICAgIC8vIGFuZCBjYW5ub3QgYmUgb3ZlcnJpZGRlbiBhcyBhbiBhY2Nlc3NvcixcbiAgICAvLyBXZSBhcmUgZ29pbmcgdG8gdXBkYXRlIG9wYWNpdHkgaGVyZVxuICAgIHRoaXMudW5pZm9ybXMub3BhY2l0eS52YWx1ZSA9IHRoaXMub3BhY2l0eTtcblxuICAgIC8vIHdvcmthcm91bmQ6IHRleHR1cmUgdHJhbnNmb3JtcyBhcmUgbm90IHVwZGF0ZWQgYXV0b21hdGljYWxseVxuICAgIHRoaXMuX3VwZGF0ZVRleHR1cmVNYXRyaXgodGhpcy51bmlmb3Jtcy5tYXAsIHRoaXMudW5pZm9ybXMubWFwVXZUcmFuc2Zvcm0pO1xuICAgIHRoaXMuX3VwZGF0ZVRleHR1cmVNYXRyaXgodGhpcy51bmlmb3Jtcy5ub3JtYWxNYXAsIHRoaXMudW5pZm9ybXMubm9ybWFsTWFwVXZUcmFuc2Zvcm0pO1xuICAgIHRoaXMuX3VwZGF0ZVRleHR1cmVNYXRyaXgodGhpcy51bmlmb3Jtcy5lbWlzc2l2ZU1hcCwgdGhpcy51bmlmb3Jtcy5lbWlzc2l2ZU1hcFV2VHJhbnNmb3JtKTtcbiAgICB0aGlzLl91cGRhdGVUZXh0dXJlTWF0cml4KHRoaXMudW5pZm9ybXMuc2hhZGVNdWx0aXBseVRleHR1cmUsIHRoaXMudW5pZm9ybXMuc2hhZGVNdWx0aXBseVRleHR1cmVVdlRyYW5zZm9ybSk7XG4gICAgdGhpcy5fdXBkYXRlVGV4dHVyZU1hdHJpeCh0aGlzLnVuaWZvcm1zLnNoYWRpbmdTaGlmdFRleHR1cmUsIHRoaXMudW5pZm9ybXMuc2hhZGluZ1NoaWZ0VGV4dHVyZVV2VHJhbnNmb3JtKTtcbiAgICB0aGlzLl91cGRhdGVUZXh0dXJlTWF0cml4KHRoaXMudW5pZm9ybXMubWF0Y2FwVGV4dHVyZSwgdGhpcy51bmlmb3Jtcy5tYXRjYXBUZXh0dXJlVXZUcmFuc2Zvcm0pO1xuICAgIHRoaXMuX3VwZGF0ZVRleHR1cmVNYXRyaXgodGhpcy51bmlmb3Jtcy5yaW1NdWx0aXBseVRleHR1cmUsIHRoaXMudW5pZm9ybXMucmltTXVsdGlwbHlUZXh0dXJlVXZUcmFuc2Zvcm0pO1xuICAgIHRoaXMuX3VwZGF0ZVRleHR1cmVNYXRyaXgoXG4gICAgICB0aGlzLnVuaWZvcm1zLm91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZSxcbiAgICAgIHRoaXMudW5pZm9ybXMub3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlVXZUcmFuc2Zvcm0sXG4gICAgKTtcbiAgICB0aGlzLl91cGRhdGVUZXh0dXJlTWF0cml4KHRoaXMudW5pZm9ybXMudXZBbmltYXRpb25NYXNrVGV4dHVyZSwgdGhpcy51bmlmb3Jtcy51dkFuaW1hdGlvbk1hc2tUZXh0dXJlVXZUcmFuc2Zvcm0pO1xuXG4gICAgLy8gQ09NUEFUIHdvcmthcm91bmQ6IHN0YXJ0aW5nIGZyb20gcjEzMiwgYWxwaGFUZXN0IGJlY29tZXMgYSB1bmlmb3JtIGluc3RlYWQgb2YgcHJlcHJvY2Vzc29yIHZhbHVlXG4gICAgY29uc3QgdGhyZWVSZXZpc2lvbiA9IHBhcnNlSW50KFRIUkVFLlJFVklTSU9OLCAxMCk7XG5cbiAgICBpZiAodGhyZWVSZXZpc2lvbiA+PSAxMzIpIHtcbiAgICAgIHRoaXMudW5pZm9ybXMuYWxwaGFUZXN0LnZhbHVlID0gdGhpcy5hbHBoYVRlc3Q7XG4gICAgfVxuXG4gICAgdGhpcy51bmlmb3Jtc05lZWRVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBtYXAgb2JqZWN0IG9mIHByZXByb2Nlc3NvciB0b2tlbiBhbmQgbWFjcm8gb2YgdGhlIHNoYWRlciBwcm9ncmFtLlxuICAgKi9cbiAgcHJpdmF0ZSBfZ2VuZXJhdGVEZWZpbmVzKCk6IHsgW3Rva2VuOiBzdHJpbmddOiBib29sZWFuIHwgbnVtYmVyIHwgc3RyaW5nIH0ge1xuICAgIGNvbnN0IHRocmVlUmV2aXNpb24gPSBwYXJzZUludChUSFJFRS5SRVZJU0lPTiwgMTApO1xuXG4gICAgY29uc3QgdXNlVXZJblZlcnQgPSB0aGlzLm91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZSAhPT0gbnVsbDtcbiAgICBjb25zdCB1c2VVdkluRnJhZyA9XG4gICAgICB0aGlzLm1hcCAhPT0gbnVsbCB8fFxuICAgICAgdGhpcy5lbWlzc2l2ZU1hcCAhPT0gbnVsbCB8fFxuICAgICAgdGhpcy5zaGFkZU11bHRpcGx5VGV4dHVyZSAhPT0gbnVsbCB8fFxuICAgICAgdGhpcy5zaGFkaW5nU2hpZnRUZXh0dXJlICE9PSBudWxsIHx8XG4gICAgICB0aGlzLnJpbU11bHRpcGx5VGV4dHVyZSAhPT0gbnVsbCB8fFxuICAgICAgdGhpcy51dkFuaW1hdGlvbk1hc2tUZXh0dXJlICE9PSBudWxsO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIFRlbXBvcmFyeSBjb21wYXQgYWdhaW5zdCBzaGFkZXIgY2hhbmdlIEAgVGhyZWUuanMgcjEyNlxuICAgICAgLy8gU2VlOiAjMjEyMDUsICMyMTMwNywgIzIxMjk5XG4gICAgICBUSFJFRV9WUk1fVEhSRUVfUkVWSVNJT046IHRocmVlUmV2aXNpb24sXG5cbiAgICAgIE9VVExJTkU6IHRoaXMuX2lzT3V0bGluZSxcbiAgICAgIE1UT09OX1VTRV9VVjogdXNlVXZJblZlcnQgfHwgdXNlVXZJbkZyYWcsIC8vIHdlIGNhbid0IHVzZSBgVVNFX1VWYCAsIGl0IHdpbGwgYmUgcmVkZWZpbmVkIGluIFdlYkdMUHJvZ3JhbS5qc1xuICAgICAgTVRPT05fVVZTX1ZFUlRFWF9PTkxZOiB1c2VVdkluVmVydCAmJiAhdXNlVXZJbkZyYWcsXG4gICAgICBWMF9DT01QQVRfU0hBREU6IHRoaXMuX3YwQ29tcGF0U2hhZGUsXG4gICAgICBVU0VfU0hBREVNVUxUSVBMWVRFWFRVUkU6IHRoaXMuc2hhZGVNdWx0aXBseVRleHR1cmUgIT09IG51bGwsXG4gICAgICBVU0VfU0hBRElOR1NISUZUVEVYVFVSRTogdGhpcy5zaGFkaW5nU2hpZnRUZXh0dXJlICE9PSBudWxsLFxuICAgICAgVVNFX01BVENBUFRFWFRVUkU6IHRoaXMubWF0Y2FwVGV4dHVyZSAhPT0gbnVsbCxcbiAgICAgIFVTRV9SSU1NVUxUSVBMWVRFWFRVUkU6IHRoaXMucmltTXVsdGlwbHlUZXh0dXJlICE9PSBudWxsLFxuICAgICAgVVNFX09VVExJTkVXSURUSE1VTFRJUExZVEVYVFVSRTogdGhpcy5faXNPdXRsaW5lICYmIHRoaXMub3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlICE9PSBudWxsLFxuICAgICAgVVNFX1VWQU5JTUFUSU9OTUFTS1RFWFRVUkU6IHRoaXMudXZBbmltYXRpb25NYXNrVGV4dHVyZSAhPT0gbnVsbCxcbiAgICAgIElHTk9SRV9WRVJURVhfQ09MT1I6IHRoaXMuX2lnbm9yZVZlcnRleENvbG9yID09PSB0cnVlLFxuICAgICAgREVCVUdfTk9STUFMOiB0aGlzLl9kZWJ1Z01vZGUgPT09ICdub3JtYWwnLFxuICAgICAgREVCVUdfTElUU0hBREVSQVRFOiB0aGlzLl9kZWJ1Z01vZGUgPT09ICdsaXRTaGFkZVJhdGUnLFxuICAgICAgREVCVUdfVVY6IHRoaXMuX2RlYnVnTW9kZSA9PT0gJ3V2JyxcbiAgICAgIE9VVExJTkVfV0lEVEhfV09STEQ6IHRoaXMuX2lzT3V0bGluZSAmJiB0aGlzLl9vdXRsaW5lV2lkdGhNb2RlID09PSBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZS5Xb3JsZENvb3JkaW5hdGVzLFxuICAgICAgT1VUTElORV9XSURUSF9TQ1JFRU46XG4gICAgICAgIHRoaXMuX2lzT3V0bGluZSAmJiB0aGlzLl9vdXRsaW5lV2lkdGhNb2RlID09PSBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZS5TY3JlZW5Db29yZGluYXRlcyxcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlVGV4dHVyZU1hdHJpeChzcmM6IFRIUkVFLklVbmlmb3JtPFRIUkVFLlRleHR1cmUgfCBudWxsPiwgZHN0OiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5NYXRyaXgzPik6IHZvaWQge1xuICAgIGlmIChzcmMudmFsdWUpIHtcbiAgICAgIGlmIChzcmMudmFsdWUubWF0cml4QXV0b1VwZGF0ZSkge1xuICAgICAgICBzcmMudmFsdWUudXBkYXRlTWF0cml4KCk7XG4gICAgICB9XG5cbiAgICAgIGRzdC52YWx1ZS5jb3B5KHNyYy52YWx1ZS5tYXRyaXgpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgR0xURlBhcnNlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXIuanMnO1xuaW1wb3J0IHsgTVRvb25NYXRlcmlhbFBhcmFtZXRlcnMgfSBmcm9tICcuL01Ub29uTWF0ZXJpYWxQYXJhbWV0ZXJzJztcblxuLyoqXG4gKiBNYXRlcmlhbFBhcmFtZXRlcnMgaGF0ZXMgYHVuZGVmaW5lZGAuIFRoaXMgaGVscGVyIGF1dG9tYXRpY2FsbHkgcmVqZWN0cyBhc3NpZ24gb2YgdGhlc2UgYHVuZGVmaW5lZGAuXG4gKiBJdCBhbHNvIGhhbmRsZXMgYXN5bmNocm9ub3VzIHByb2Nlc3Mgb2YgdGV4dHVyZXMuXG4gKiBNYWtlIHN1cmUgYXdhaXQgZm9yIHtAbGluayBHTFRGTVRvb25NYXRlcmlhbFBhcmFtc0Fzc2lnbkhlbHBlci5wZW5kaW5nfS5cbiAqL1xuZXhwb3J0IGNsYXNzIEdMVEZNVG9vbk1hdGVyaWFsUGFyYW1zQXNzaWduSGVscGVyIHtcbiAgcHJpdmF0ZSByZWFkb25seSBfcGFyc2VyOiBHTFRGUGFyc2VyO1xuICBwcml2YXRlIF9tYXRlcmlhbFBhcmFtczogTVRvb25NYXRlcmlhbFBhcmFtZXRlcnM7XG4gIHByaXZhdGUgX3BlbmRpbmdzOiBQcm9taXNlPGFueT5bXTtcblxuICBwdWJsaWMgZ2V0IHBlbmRpbmcoKTogUHJvbWlzZTx1bmtub3duPiB7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHRoaXMuX3BlbmRpbmdzKTtcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJzZXI6IEdMVEZQYXJzZXIsIG1hdGVyaWFsUGFyYW1zOiBNVG9vbk1hdGVyaWFsUGFyYW1ldGVycykge1xuICAgIHRoaXMuX3BhcnNlciA9IHBhcnNlcjtcbiAgICB0aGlzLl9tYXRlcmlhbFBhcmFtcyA9IG1hdGVyaWFsUGFyYW1zO1xuICAgIHRoaXMuX3BlbmRpbmdzID0gW107XG4gIH1cblxuICBwdWJsaWMgYXNzaWduUHJpbWl0aXZlPFQgZXh0ZW5kcyBrZXlvZiBNVG9vbk1hdGVyaWFsUGFyYW1ldGVycz4oa2V5OiBULCB2YWx1ZTogTVRvb25NYXRlcmlhbFBhcmFtZXRlcnNbVF0pOiB2b2lkIHtcbiAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fbWF0ZXJpYWxQYXJhbXNba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3NpZ25Db2xvcjxUIGV4dGVuZHMga2V5b2YgTVRvb25NYXRlcmlhbFBhcmFtZXRlcnM+KFxuICAgIGtleTogVCxcbiAgICB2YWx1ZTogbnVtYmVyW10gfCB1bmRlZmluZWQsXG4gICAgY29udmVydFNSR0JUb0xpbmVhcj86IGJvb2xlYW4sXG4gICk6IHZvaWQge1xuICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9tYXRlcmlhbFBhcmFtc1trZXldID0gbmV3IFRIUkVFLkNvbG9yKCkuZnJvbUFycmF5KHZhbHVlKTtcblxuICAgICAgaWYgKGNvbnZlcnRTUkdCVG9MaW5lYXIpIHtcbiAgICAgICAgdGhpcy5fbWF0ZXJpYWxQYXJhbXNba2V5XS5jb252ZXJ0U1JHQlRvTGluZWFyKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGFzc2lnblRleHR1cmU8VCBleHRlbmRzIGtleW9mIE1Ub29uTWF0ZXJpYWxQYXJhbWV0ZXJzPihcbiAgICBrZXk6IFQsXG4gICAgdGV4dHVyZTogeyBpbmRleDogbnVtYmVyIH0gfCB1bmRlZmluZWQsXG4gICAgaXNDb2xvclRleHR1cmU6IGJvb2xlYW4sXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHByb21pc2UgPSAoYXN5bmMgKCkgPT4ge1xuICAgICAgaWYgKHRleHR1cmUgIT0gbnVsbCkge1xuICAgICAgICBhd2FpdCB0aGlzLl9wYXJzZXIuYXNzaWduVGV4dHVyZSh0aGlzLl9tYXRlcmlhbFBhcmFtcywga2V5LCB0ZXh0dXJlKTtcblxuICAgICAgICBpZiAoaXNDb2xvclRleHR1cmUpIHtcbiAgICAgICAgICB0aGlzLl9tYXRlcmlhbFBhcmFtc1trZXldLmVuY29kaW5nID0gVEhSRUUuc1JHQkVuY29kaW5nO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSkoKTtcblxuICAgIHRoaXMuX3BlbmRpbmdzLnB1c2gocHJvbWlzZSk7XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBhc3NpZ25UZXh0dXJlQnlJbmRleDxUIGV4dGVuZHMga2V5b2YgTVRvb25NYXRlcmlhbFBhcmFtZXRlcnM+KFxuICAgIGtleTogVCxcbiAgICB0ZXh0dXJlSW5kZXg6IG51bWJlciB8IHVuZGVmaW5lZCxcbiAgICBpc0NvbG9yVGV4dHVyZTogYm9vbGVhbixcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuYXNzaWduVGV4dHVyZShrZXksIHRleHR1cmVJbmRleCAhPSBudWxsID8geyBpbmRleDogdGV4dHVyZUluZGV4IH0gOiB1bmRlZmluZWQsIGlzQ29sb3JUZXh0dXJlKTtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0ICogYXMgVjFNVG9vblNjaGVtYSBmcm9tICdAcGl4aXYvdHlwZXMtdnJtYy1tYXRlcmlhbHMtbXRvb24tMS4wJztcbmltcG9ydCB0eXBlIHsgR0xURiwgR0xURkxvYWRlclBsdWdpbiwgR0xURlBhcnNlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXIuanMnO1xuaW1wb3J0IHsgTVRvb25NYXRlcmlhbCB9IGZyb20gJy4vTVRvb25NYXRlcmlhbCc7XG5pbXBvcnQgdHlwZSB7IE1Ub29uTWF0ZXJpYWxQYXJhbWV0ZXJzIH0gZnJvbSAnLi9NVG9vbk1hdGVyaWFsUGFyYW1ldGVycyc7XG5pbXBvcnQgeyBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZSB9IGZyb20gJy4vTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUnO1xuaW1wb3J0IHsgR0xURk1Ub29uTWF0ZXJpYWxQYXJhbXNBc3NpZ25IZWxwZXIgfSBmcm9tICcuL0dMVEZNVG9vbk1hdGVyaWFsUGFyYW1zQXNzaWduSGVscGVyJztcbmltcG9ydCB7IE1Ub29uTWF0ZXJpYWxMb2FkZXJQbHVnaW5PcHRpb25zIH0gZnJvbSAnLi9NVG9vbk1hdGVyaWFsTG9hZGVyUGx1Z2luT3B0aW9ucyc7XG5pbXBvcnQgdHlwZSB7IE1Ub29uTWF0ZXJpYWxEZWJ1Z01vZGUgfSBmcm9tICcuL01Ub29uTWF0ZXJpYWxEZWJ1Z01vZGUnO1xuaW1wb3J0IHsgR0xURiBhcyBHTFRGU2NoZW1hIH0gZnJvbSAnQGdsdGYtdHJhbnNmb3JtL2NvcmUnO1xuXG4vKipcbiAqIFBvc3NpYmxlIHNwZWMgdmVyc2lvbnMgaXQgcmVjb2duaXplcy5cbiAqL1xuY29uc3QgUE9TU0lCTEVfU1BFQ19WRVJTSU9OUyA9IG5ldyBTZXQoWycxLjAnLCAnMS4wLWJldGEnXSk7XG5cbmV4cG9ydCBjbGFzcyBNVG9vbk1hdGVyaWFsTG9hZGVyUGx1Z2luIGltcGxlbWVudHMgR0xURkxvYWRlclBsdWdpbiB7XG4gIHB1YmxpYyBzdGF0aWMgRVhURU5TSU9OX05BTUUgPSAnVlJNQ19tYXRlcmlhbHNfbXRvb24nO1xuXG4gIC8qKlxuICAgKiBUaGlzIHZhbHVlIHdpbGwgYmUgYWRkZWQgdG8gYHJlbmRlck9yZGVyYCBvZiBldmVyeSBtZXNoZXMgd2hvIGhhdmUgTWF0ZXJpYWxzTVRvb24uXG4gICAqIFRoZSBmaW5hbCByZW5kZXJPcmRlciB3aWxsIGJlIHN1bSBvZiB0aGlzIGByZW5kZXJPcmRlck9mZnNldGAgYW5kIGByZW5kZXJRdWV1ZU9mZnNldE51bWJlcmAgZm9yIGVhY2ggbWF0ZXJpYWxzLlxuICAgKiBgMGAgYnkgZGVmYXVsdC5cbiAgICovXG4gIHB1YmxpYyByZW5kZXJPcmRlck9mZnNldDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGVyZSBpcyBhIGxpbmUgb2YgdGhlIHNoYWRlciBjYWxsZWQgXCJjb21tZW50IG91dCBpZiB5b3Ugd2FudCB0byBQQlIgYWJzb2x1dGVseVwiIGluIFZSTTAuMCBNVG9vbi5cbiAgICogV2hlbiB0aGlzIGlzIHRydWUsIHRoZSBtYXRlcmlhbCBlbmFibGVzIHRoZSBsaW5lIHRvIG1ha2UgaXQgY29tcGF0aWJsZSB3aXRoIHRoZSBsZWdhY3kgcmVuZGVyaW5nIG9mIFZSTS5cbiAgICogVXN1YWxseSBub3QgcmVjb21tZW5kZWQgdG8gdHVybiB0aGlzIG9uLlxuICAgKiBgZmFsc2VgIGJ5IGRlZmF1bHQuXG4gICAqL1xuICBwdWJsaWMgdjBDb21wYXRTaGFkZTogYm9vbGVhbjtcblxuICAvKipcbiAgICogRGVidWcgbW9kZSBmb3IgdGhlIG1hdGVyaWFsLlxuICAgKiBZb3UgY2FuIHZpc3VhbGl6ZSBzZXZlcmFsIGNvbXBvbmVudHMgZm9yIGRpYWdub3NpcyB1c2luZyBkZWJ1ZyBtb2RlLlxuICAgKlxuICAgKiBTZWU6IHtAbGluayBNVG9vbk1hdGVyaWFsRGVidWdNb2RlfVxuICAgKi9cbiAgcHVibGljIGRlYnVnTW9kZTogTVRvb25NYXRlcmlhbERlYnVnTW9kZTtcblxuICBwdWJsaWMgcmVhZG9ubHkgcGFyc2VyOiBHTFRGUGFyc2VyO1xuXG4gIC8qKlxuICAgKiBMb2FkZWQgbWF0ZXJpYWxzIHdpbGwgYmUgc3RvcmVkIGluIHRoaXMgc2V0LlxuICAgKiBXaWxsIGJlIHRyYW5zZmVycmVkIGludG8gYGdsdGYudXNlckRhdGEudnJtTVRvb25NYXRlcmlhbHNgIGluIHtAbGluayBhZnRlclJvb3R9LlxuICAgKi9cbiAgcHJpdmF0ZSByZWFkb25seSBfbVRvb25NYXRlcmlhbFNldDogU2V0PE1Ub29uTWF0ZXJpYWw+O1xuXG4gIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBNVG9vbk1hdGVyaWFsTG9hZGVyUGx1Z2luLkVYVEVOU0lPTl9OQU1FO1xuICB9XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBhcnNlcjogR0xURlBhcnNlciwgb3B0aW9uczogTVRvb25NYXRlcmlhbExvYWRlclBsdWdpbk9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMucGFyc2VyID0gcGFyc2VyO1xuXG4gICAgdGhpcy5yZW5kZXJPcmRlck9mZnNldCA9IG9wdGlvbnMucmVuZGVyT3JkZXJPZmZzZXQgPz8gMDtcbiAgICB0aGlzLnYwQ29tcGF0U2hhZGUgPSBvcHRpb25zLnYwQ29tcGF0U2hhZGUgPz8gZmFsc2U7XG4gICAgdGhpcy5kZWJ1Z01vZGUgPSBvcHRpb25zLmRlYnVnTW9kZSA/PyAnbm9uZSc7XG5cbiAgICB0aGlzLl9tVG9vbk1hdGVyaWFsU2V0ID0gbmV3IFNldCgpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGJlZm9yZVJvb3QoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5fcmVtb3ZlVW5saXRFeHRlbnNpb25JZk1Ub29uRXhpc3RzKCk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgYWZ0ZXJSb290KGdsdGY6IEdMVEYpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBnbHRmLnVzZXJEYXRhLnZybU1Ub29uTWF0ZXJpYWxzID0gQXJyYXkuZnJvbSh0aGlzLl9tVG9vbk1hdGVyaWFsU2V0KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRNYXRlcmlhbFR5cGUobWF0ZXJpYWxJbmRleDogbnVtYmVyKTogdHlwZW9mIFRIUkVFLk1hdGVyaWFsIHwgbnVsbCB7XG4gICAgY29uc3QgdjFFeHRlbnNpb24gPSB0aGlzLl9nZXRNVG9vbkV4dGVuc2lvbihtYXRlcmlhbEluZGV4KTtcbiAgICBpZiAodjFFeHRlbnNpb24pIHtcbiAgICAgIHJldHVybiBNVG9vbk1hdGVyaWFsO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHVibGljIGV4dGVuZE1hdGVyaWFsUGFyYW1zKG1hdGVyaWFsSW5kZXg6IG51bWJlciwgbWF0ZXJpYWxQYXJhbXM6IE1Ub29uTWF0ZXJpYWxQYXJhbWV0ZXJzKTogUHJvbWlzZTxhbnk+IHwgbnVsbCB7XG4gICAgY29uc3QgZXh0ZW5zaW9uID0gdGhpcy5fZ2V0TVRvb25FeHRlbnNpb24obWF0ZXJpYWxJbmRleCk7XG4gICAgaWYgKGV4dGVuc2lvbikge1xuICAgICAgcmV0dXJuIHRoaXMuX2V4dGVuZE1hdGVyaWFsUGFyYW1zKGV4dGVuc2lvbiwgbWF0ZXJpYWxQYXJhbXMpO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGxvYWRNZXNoKG1lc2hJbmRleDogbnVtYmVyKTogUHJvbWlzZTxUSFJFRS5Hcm91cCB8IFRIUkVFLk1lc2ggfCBUSFJFRS5Ta2lubmVkTWVzaD4ge1xuICAgIGNvbnN0IHBhcnNlciA9IHRoaXMucGFyc2VyO1xuICAgIGNvbnN0IGpzb24gPSBwYXJzZXIuanNvbiBhcyBHTFRGU2NoZW1hLklHTFRGO1xuXG4gICAgY29uc3QgbWVzaERlZiA9IGpzb24ubWVzaGVzPy5bbWVzaEluZGV4XTtcblxuICAgIGlmIChtZXNoRGVmID09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYE1Ub29uTWF0ZXJpYWxMb2FkZXJQbHVnaW46IEF0dGVtcHQgdG8gdXNlIG1lc2hlc1ske21lc2hJbmRleH1dIG9mIGdsVEYgYnV0IHRoZSBtZXNoIGRvZXNuJ3QgZXhpc3RgLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBwcmltaXRpdmVzRGVmID0gbWVzaERlZi5wcmltaXRpdmVzO1xuXG4gICAgY29uc3QgbWVzaE9yR3JvdXAgPSBhd2FpdCBwYXJzZXIubG9hZE1lc2gobWVzaEluZGV4KTtcblxuICAgIGlmIChwcmltaXRpdmVzRGVmLmxlbmd0aCA9PT0gMSkge1xuICAgICAgY29uc3QgbWVzaCA9IG1lc2hPckdyb3VwIGFzIFRIUkVFLk1lc2g7XG4gICAgICBjb25zdCBtYXRlcmlhbEluZGV4ID0gcHJpbWl0aXZlc0RlZlswXS5tYXRlcmlhbDtcblxuICAgICAgaWYgKG1hdGVyaWFsSW5kZXggIT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9zZXR1cFByaW1pdGl2ZShtZXNoLCBtYXRlcmlhbEluZGV4KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZ3JvdXAgPSBtZXNoT3JHcm91cCBhcyBUSFJFRS5Hcm91cDtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJpbWl0aXZlc0RlZi5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBtZXNoID0gZ3JvdXAuY2hpbGRyZW5baV0gYXMgVEhSRUUuTWVzaDtcbiAgICAgICAgY29uc3QgbWF0ZXJpYWxJbmRleCA9IHByaW1pdGl2ZXNEZWZbaV0ubWF0ZXJpYWw7XG5cbiAgICAgICAgaWYgKG1hdGVyaWFsSW5kZXggIT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuX3NldHVwUHJpbWl0aXZlKG1lc2gsIG1hdGVyaWFsSW5kZXgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1lc2hPckdyb3VwO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZSB1c2Ugb2YgYEtIUl9tYXRlcmlhbHNfdW5saXRgIGZyb20gaXRzIGBtYXRlcmlhbHNgIGlmIHRoZSBtYXRlcmlhbCBpcyB1c2luZyBNVG9vbi5cbiAgICpcbiAgICogU2luY2UgR0xURkxvYWRlciBoYXZlIHNvIG1hbnkgaGFyZGNvZGVkIHByb2NlZHVyZSByZWxhdGVkIHRvIGBLSFJfbWF0ZXJpYWxzX3VubGl0YFxuICAgKiB3ZSBoYXZlIHRvIGRlbGV0ZSB0aGUgZXh0ZW5zaW9uIGJlZm9yZSB3ZSBzdGFydCB0byBwYXJzZSB0aGUgZ2xURi5cbiAgICovXG4gIHByaXZhdGUgX3JlbW92ZVVubGl0RXh0ZW5zaW9uSWZNVG9vbkV4aXN0cygpOiB2b2lkIHtcbiAgICBjb25zdCBwYXJzZXIgPSB0aGlzLnBhcnNlcjtcbiAgICBjb25zdCBqc29uID0gcGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAgIGNvbnN0IG1hdGVyaWFsRGVmcyA9IGpzb24ubWF0ZXJpYWxzO1xuICAgIG1hdGVyaWFsRGVmcz8ubWFwKChtYXRlcmlhbERlZiwgaU1hdGVyaWFsKSA9PiB7XG4gICAgICBjb25zdCBleHRlbnNpb24gPSB0aGlzLl9nZXRNVG9vbkV4dGVuc2lvbihpTWF0ZXJpYWwpO1xuXG4gICAgICBpZiAoZXh0ZW5zaW9uICYmIG1hdGVyaWFsRGVmLmV4dGVuc2lvbnM/LlsnS0hSX21hdGVyaWFsc191bmxpdCddKSB7XG4gICAgICAgIGRlbGV0ZSBtYXRlcmlhbERlZi5leHRlbnNpb25zWydLSFJfbWF0ZXJpYWxzX3VubGl0J107XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRNVG9vbkV4dGVuc2lvbihtYXRlcmlhbEluZGV4OiBudW1iZXIpOiBWMU1Ub29uU2NoZW1hLlZSTUNNYXRlcmlhbHNNVG9vbiB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgcGFyc2VyID0gdGhpcy5wYXJzZXI7XG4gICAgY29uc3QganNvbiA9IHBhcnNlci5qc29uIGFzIEdMVEZTY2hlbWEuSUdMVEY7XG5cbiAgICBjb25zdCBtYXRlcmlhbERlZiA9IGpzb24ubWF0ZXJpYWxzPy5bbWF0ZXJpYWxJbmRleF07XG5cbiAgICBpZiAobWF0ZXJpYWxEZWYgPT0gbnVsbCkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBgTVRvb25NYXRlcmlhbExvYWRlclBsdWdpbjogQXR0ZW1wdCB0byB1c2UgbWF0ZXJpYWxzWyR7bWF0ZXJpYWxJbmRleH1dIG9mIGdsVEYgYnV0IHRoZSBtYXRlcmlhbCBkb2Vzbid0IGV4aXN0YCxcbiAgICAgICk7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGNvbnN0IGV4dGVuc2lvbiA9IG1hdGVyaWFsRGVmLmV4dGVuc2lvbnM/LltNVG9vbk1hdGVyaWFsTG9hZGVyUGx1Z2luLkVYVEVOU0lPTl9OQU1FXSBhc1xuICAgICAgfCBWMU1Ub29uU2NoZW1hLlZSTUNNYXRlcmlhbHNNVG9vblxuICAgICAgfCB1bmRlZmluZWQ7XG4gICAgaWYgKGV4dGVuc2lvbiA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGNvbnN0IHNwZWNWZXJzaW9uID0gZXh0ZW5zaW9uLnNwZWNWZXJzaW9uO1xuICAgIGlmICghUE9TU0lCTEVfU1BFQ19WRVJTSU9OUy5oYXMoc3BlY1ZlcnNpb24pKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIGBNVG9vbk1hdGVyaWFsTG9hZGVyUGx1Z2luOiBVbmtub3duICR7TVRvb25NYXRlcmlhbExvYWRlclBsdWdpbi5FWFRFTlNJT05fTkFNRX0gc3BlY1ZlcnNpb24gXCIke3NwZWNWZXJzaW9ufVwiYCxcbiAgICAgICk7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiBleHRlbnNpb247XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF9leHRlbmRNYXRlcmlhbFBhcmFtcyhcbiAgICBleHRlbnNpb246IFYxTVRvb25TY2hlbWEuVlJNQ01hdGVyaWFsc01Ub29uLFxuICAgIG1hdGVyaWFsUGFyYW1zOiBNVG9vbk1hdGVyaWFsUGFyYW1ldGVycyxcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgLy8gUmVtb3ZpbmcgbWF0ZXJpYWwgcGFyYW1zIHRoYXQgaXMgbm90IHJlcXVpcmVkIHRvIHN1cHJlc3Mgd2FybmluZ3MuXG4gICAgZGVsZXRlIChtYXRlcmlhbFBhcmFtcyBhcyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbFBhcmFtZXRlcnMpLm1ldGFsbmVzcztcbiAgICBkZWxldGUgKG1hdGVyaWFsUGFyYW1zIGFzIFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsUGFyYW1ldGVycykucm91Z2huZXNzO1xuXG4gICAgY29uc3QgYXNzaWduSGVscGVyID0gbmV3IEdMVEZNVG9vbk1hdGVyaWFsUGFyYW1zQXNzaWduSGVscGVyKHRoaXMucGFyc2VyLCBtYXRlcmlhbFBhcmFtcyk7XG5cbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduUHJpbWl0aXZlKCd0cmFuc3BhcmVudFdpdGhaV3JpdGUnLCBleHRlbnNpb24udHJhbnNwYXJlbnRXaXRoWldyaXRlKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduQ29sb3IoJ3NoYWRlQ29sb3JGYWN0b3InLCBleHRlbnNpb24uc2hhZGVDb2xvckZhY3Rvcik7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnblRleHR1cmUoJ3NoYWRlTXVsdGlwbHlUZXh0dXJlJywgZXh0ZW5zaW9uLnNoYWRlTXVsdGlwbHlUZXh0dXJlLCB0cnVlKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduUHJpbWl0aXZlKCdzaGFkaW5nU2hpZnRGYWN0b3InLCBleHRlbnNpb24uc2hhZGluZ1NoaWZ0RmFjdG9yKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduVGV4dHVyZSgnc2hhZGluZ1NoaWZ0VGV4dHVyZScsIGV4dGVuc2lvbi5zaGFkaW5nU2hpZnRUZXh0dXJlLCB0cnVlKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduUHJpbWl0aXZlKCdzaGFkaW5nU2hpZnRUZXh0dXJlU2NhbGUnLCBleHRlbnNpb24uc2hhZGluZ1NoaWZ0VGV4dHVyZT8uc2NhbGUpO1xuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25QcmltaXRpdmUoJ3NoYWRpbmdUb29ueUZhY3RvcicsIGV4dGVuc2lvbi5zaGFkaW5nVG9vbnlGYWN0b3IpO1xuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25QcmltaXRpdmUoJ2dpRXF1YWxpemF0aW9uRmFjdG9yJywgZXh0ZW5zaW9uLmdpRXF1YWxpemF0aW9uRmFjdG9yKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduQ29sb3IoJ21hdGNhcEZhY3RvcicsIGV4dGVuc2lvbi5tYXRjYXBGYWN0b3IpO1xuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25UZXh0dXJlKCdtYXRjYXBUZXh0dXJlJywgZXh0ZW5zaW9uLm1hdGNhcFRleHR1cmUsIHRydWUpO1xuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25Db2xvcigncGFyYW1ldHJpY1JpbUNvbG9yRmFjdG9yJywgZXh0ZW5zaW9uLnBhcmFtZXRyaWNSaW1Db2xvckZhY3Rvcik7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnblRleHR1cmUoJ3JpbU11bHRpcGx5VGV4dHVyZScsIGV4dGVuc2lvbi5yaW1NdWx0aXBseVRleHR1cmUsIHRydWUpO1xuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25QcmltaXRpdmUoJ3JpbUxpZ2h0aW5nTWl4RmFjdG9yJywgZXh0ZW5zaW9uLnJpbUxpZ2h0aW5nTWl4RmFjdG9yKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduUHJpbWl0aXZlKCdwYXJhbWV0cmljUmltRnJlc25lbFBvd2VyRmFjdG9yJywgZXh0ZW5zaW9uLnBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJGYWN0b3IpO1xuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25QcmltaXRpdmUoJ3BhcmFtZXRyaWNSaW1MaWZ0RmFjdG9yJywgZXh0ZW5zaW9uLnBhcmFtZXRyaWNSaW1MaWZ0RmFjdG9yKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduUHJpbWl0aXZlKCdvdXRsaW5lV2lkdGhNb2RlJywgZXh0ZW5zaW9uLm91dGxpbmVXaWR0aE1vZGUgYXMgTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUpO1xuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25QcmltaXRpdmUoJ291dGxpbmVXaWR0aEZhY3RvcicsIGV4dGVuc2lvbi5vdXRsaW5lV2lkdGhGYWN0b3IpO1xuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25UZXh0dXJlKCdvdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmUnLCBleHRlbnNpb24ub3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlLCBmYWxzZSk7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnbkNvbG9yKCdvdXRsaW5lQ29sb3JGYWN0b3InLCBleHRlbnNpb24ub3V0bGluZUNvbG9yRmFjdG9yKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduUHJpbWl0aXZlKCdvdXRsaW5lTGlnaHRpbmdNaXhGYWN0b3InLCBleHRlbnNpb24ub3V0bGluZUxpZ2h0aW5nTWl4RmFjdG9yKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduVGV4dHVyZSgndXZBbmltYXRpb25NYXNrVGV4dHVyZScsIGV4dGVuc2lvbi51dkFuaW1hdGlvbk1hc2tUZXh0dXJlLCBmYWxzZSk7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnblByaW1pdGl2ZSgndXZBbmltYXRpb25TY3JvbGxYU3BlZWRGYWN0b3InLCBleHRlbnNpb24udXZBbmltYXRpb25TY3JvbGxYU3BlZWRGYWN0b3IpO1xuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25QcmltaXRpdmUoJ3V2QW5pbWF0aW9uU2Nyb2xsWVNwZWVkRmFjdG9yJywgZXh0ZW5zaW9uLnV2QW5pbWF0aW9uU2Nyb2xsWVNwZWVkRmFjdG9yKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduUHJpbWl0aXZlKCd1dkFuaW1hdGlvblJvdGF0aW9uU3BlZWRGYWN0b3InLCBleHRlbnNpb24udXZBbmltYXRpb25Sb3RhdGlvblNwZWVkRmFjdG9yKTtcblxuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25QcmltaXRpdmUoJ3YwQ29tcGF0U2hhZGUnLCB0aGlzLnYwQ29tcGF0U2hhZGUpO1xuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25QcmltaXRpdmUoJ2RlYnVnTW9kZScsIHRoaXMuZGVidWdNb2RlKTtcblxuICAgIGF3YWl0IGFzc2lnbkhlbHBlci5wZW5kaW5nO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgd2lsbCBkbyB0d28gcHJvY2Vzc2VzIHRoYXQgaXMgcmVxdWlyZWQgdG8gcmVuZGVyIE1Ub29uIHByb3Blcmx5LlxuICAgKlxuICAgKiAtIFNldCByZW5kZXIgb3JkZXJcbiAgICogLSBHZW5lcmF0ZSBvdXRsaW5lXG4gICAqXG4gICAqIEBwYXJhbSBtZXNoIEEgdGFyZ2V0IEdMVEYgcHJpbWl0aXZlXG4gICAqIEBwYXJhbSBtYXRlcmlhbEluZGV4IFRoZSBtYXRlcmlhbCBpbmRleCBvZiB0aGUgcHJpbWl0aXZlXG4gICAqL1xuICBwcml2YXRlIF9zZXR1cFByaW1pdGl2ZShtZXNoOiBUSFJFRS5NZXNoLCBtYXRlcmlhbEluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBleHRlbnNpb24gPSB0aGlzLl9nZXRNVG9vbkV4dGVuc2lvbihtYXRlcmlhbEluZGV4KTtcbiAgICBpZiAoZXh0ZW5zaW9uKSB7XG4gICAgICBjb25zdCByZW5kZXJPcmRlciA9IHRoaXMuX3BhcnNlUmVuZGVyT3JkZXIoZXh0ZW5zaW9uKTtcbiAgICAgIG1lc2gucmVuZGVyT3JkZXIgPSByZW5kZXJPcmRlciArIHRoaXMucmVuZGVyT3JkZXJPZmZzZXQ7XG5cbiAgICAgIHRoaXMuX2dlbmVyYXRlT3V0bGluZShtZXNoKTtcblxuICAgICAgdGhpcy5fYWRkVG9NYXRlcmlhbFNldChtZXNoKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZSBvdXRsaW5lIGZvciB0aGUgZ2l2ZW4gbWVzaCwgaWYgaXQgbmVlZHMuXG4gICAqXG4gICAqIEBwYXJhbSBtZXNoIFRoZSB0YXJnZXQgbWVzaFxuICAgKi9cbiAgcHJpdmF0ZSBfZ2VuZXJhdGVPdXRsaW5lKG1lc2g6IFRIUkVFLk1lc2gpOiB2b2lkIHtcbiAgICAvLyBPSywgaXQncyB0aGUgaGFja3kgcGFydC5cbiAgICAvLyBXZSBhcmUgZ29pbmcgdG8gZHVwbGljYXRlIHRoZSBNVG9vbk1hdGVyaWFsIGZvciBvdXRsaW5lIHVzZS5cbiAgICAvLyBUaGVuIHdlIGFyZSBnb2luZyB0byBjcmVhdGUgdHdvIGdlb21ldHJ5IGdyb3VwcyBhbmQgcmVmZXIgc2FtZSBidWZmZXIgYnV0IGRpZmZlcmVudCBtYXRlcmlhbC5cbiAgICAvLyBJdCdzIGhvdyB3ZSBkcmF3IHR3byBtYXRlcmlhbHMgYXQgb25jZSB1c2luZyBhIHNpbmdsZSBtZXNoLlxuXG4gICAgLy8gbWFrZSBzdXJlIHRoZSBtYXRlcmlhbCBpcyBtdG9vblxuICAgIGNvbnN0IHN1cmZhY2VNYXRlcmlhbCA9IG1lc2gubWF0ZXJpYWw7XG4gICAgaWYgKCEoc3VyZmFjZU1hdGVyaWFsIGluc3RhbmNlb2YgTVRvb25NYXRlcmlhbCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBjaGVjayB3aGV0aGVyIHdlIHJlYWxseSBoYXZlIHRvIHByZXBhcmUgb3V0bGluZSBvciBub3RcbiAgICBpZiAoc3VyZmFjZU1hdGVyaWFsLm91dGxpbmVXaWR0aE1vZGUgPT09ICdub25lJyB8fCBzdXJmYWNlTWF0ZXJpYWwub3V0bGluZVdpZHRoRmFjdG9yIDw9IDAuMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIG1ha2UgaXRzIG1hdGVyaWFsIGFuIGFycmF5XG4gICAgbWVzaC5tYXRlcmlhbCA9IFtzdXJmYWNlTWF0ZXJpYWxdOyAvLyBtZXNoLm1hdGVyaWFsIGlzIGd1YXJhbnRlZWQgdG8gYmUgYSBNYXRlcmlhbCBpbiBHTFRGTG9hZGVyXG5cbiAgICAvLyBkdXBsaWNhdGUgdGhlIG1hdGVyaWFsIGZvciBvdXRsaW5lIHVzZVxuICAgIGNvbnN0IG91dGxpbmVNYXRlcmlhbCA9IHN1cmZhY2VNYXRlcmlhbC5jbG9uZSgpIGFzIE1Ub29uTWF0ZXJpYWw7XG4gICAgb3V0bGluZU1hdGVyaWFsLm5hbWUgKz0gJyAoT3V0bGluZSknO1xuICAgIG91dGxpbmVNYXRlcmlhbC5pc091dGxpbmUgPSB0cnVlO1xuICAgIG91dGxpbmVNYXRlcmlhbC5zaWRlID0gVEhSRUUuQmFja1NpZGU7XG4gICAgbWVzaC5tYXRlcmlhbC5wdXNoKG91dGxpbmVNYXRlcmlhbCk7XG5cbiAgICAvLyBtYWtlIHR3byBnZW9tZXRyeSBncm91cHMgb3V0IG9mIGEgc2FtZSBidWZmZXJcbiAgICBjb25zdCBnZW9tZXRyeSA9IG1lc2guZ2VvbWV0cnk7IC8vIG1lc2guZ2VvbWV0cnkgaXMgZ3VhcmFudGVlZCB0byBiZSBhIEJ1ZmZlckdlb21ldHJ5IGluIEdMVEZMb2FkZXJcbiAgICBjb25zdCBwcmltaXRpdmVWZXJ0aWNlcyA9IGdlb21ldHJ5LmluZGV4ID8gZ2VvbWV0cnkuaW5kZXguY291bnQgOiBnZW9tZXRyeS5hdHRyaWJ1dGVzLnBvc2l0aW9uLmNvdW50IC8gMztcbiAgICBnZW9tZXRyeS5hZGRHcm91cCgwLCBwcmltaXRpdmVWZXJ0aWNlcywgMCk7XG4gICAgZ2VvbWV0cnkuYWRkR3JvdXAoMCwgcHJpbWl0aXZlVmVydGljZXMsIDEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVG9NYXRlcmlhbFNldChtZXNoOiBUSFJFRS5NZXNoKTogdm9pZCB7XG4gICAgY29uc3QgbWF0ZXJpYWxPck1hdGVyaWFscyA9IG1lc2gubWF0ZXJpYWw7XG4gICAgY29uc3QgbWF0ZXJpYWxTZXQgPSBuZXcgU2V0PFRIUkVFLk1hdGVyaWFsPigpO1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkobWF0ZXJpYWxPck1hdGVyaWFscykpIHtcbiAgICAgIG1hdGVyaWFsT3JNYXRlcmlhbHMuZm9yRWFjaCgobWF0ZXJpYWwpID0+IG1hdGVyaWFsU2V0LmFkZChtYXRlcmlhbCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBtYXRlcmlhbFNldC5hZGQobWF0ZXJpYWxPck1hdGVyaWFscyk7XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBtYXRlcmlhbCBvZiBtYXRlcmlhbFNldCkge1xuICAgICAgaWYgKG1hdGVyaWFsIGluc3RhbmNlb2YgTVRvb25NYXRlcmlhbCkge1xuICAgICAgICB0aGlzLl9tVG9vbk1hdGVyaWFsU2V0LmFkZChtYXRlcmlhbCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VSZW5kZXJPcmRlcihleHRlbnNpb246IFYxTVRvb25TY2hlbWEuVlJNQ01hdGVyaWFsc01Ub29uKTogbnVtYmVyIHtcbiAgICAvLyB0cmFuc3BhcmVudFdpdGhaV3JpdGUgcmFuZ2VzIGZyb20gMCB0byArOVxuICAgIC8vIG1lcmUgdHJhbnNwYXJlbnQgcmFuZ2VzIGZyb20gLTkgdG8gMFxuICAgIGNvbnN0IGVuYWJsZWRaV3JpdGUgPSBleHRlbnNpb24udHJhbnNwYXJlbnRXaXRoWldyaXRlO1xuICAgIHJldHVybiAoZW5hYmxlZFpXcml0ZSA/IDAgOiAxOSkgKyAoZXh0ZW5zaW9uLnJlbmRlclF1ZXVlT2Zmc2V0TnVtYmVyID8/IDApO1xuICB9XG59XG4iXSwibmFtZXMiOlsiVEhSRUUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQTtJQUNBO0FBQ0E7SUFDQTtJQUNBO0FBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0FBb0dBO0lBQ08sU0FBUyxTQUFTLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFO0lBQzdELElBQUksU0FBUyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsT0FBTyxLQUFLLFlBQVksQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxVQUFVLE9BQU8sRUFB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
