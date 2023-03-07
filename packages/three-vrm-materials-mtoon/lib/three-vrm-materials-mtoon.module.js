/*!
 * @pixiv/three-vrm-materials-mtoon v1.0.9
 * MToon (toon material) module for @pixiv/three-vrm
 *
 * Copyright (c) 2020-2023 pixiv Inc.
 * @pixiv/three-vrm-materials-mtoon is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
import * as THREE from 'three';

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
    if (parseInt(THREE.REVISION, 10) >= 136) {
        switch (encoding) {
            case THREE.LinearEncoding:
                return ['Linear', '( value )'];
            case THREE.sRGBEncoding:
                return ['sRGB', '( value )'];
            default:
                console.warn('THREE.WebGLProgram: Unsupported encoding:', encoding);
                return ['Linear', '( value )'];
        }
    }
    else {
        // COMPAT: pre-r136
        switch (encoding) {
            case THREE.LinearEncoding:
                return ['Linear', '( value )'];
            case THREE.sRGBEncoding:
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
        encoding = THREE.LinearEncoding;
    }
    if (parseInt(THREE.REVISION, 10) >= 133) {
        if (isWebGL2 &&
            map &&
            map.isTexture &&
            map.format === THREE.RGBAFormat &&
            map.type === THREE.UnsignedByteType &&
            map.encoding === THREE.sRGBEncoding) {
            encoding = THREE.LinearEncoding; // disable inline decode for sRGB textures in WebGL 2
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
class MToonMaterial extends THREE.ShaderMaterial {
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
        this.normalMapType = THREE.TangentSpaceNormalMap;
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
        if (parseInt(THREE.REVISION, 10) < 129) {
            parameters.skinning = parameters.skinning || false;
        }
        // COMPAT: pre-r131
        // See: https://github.com/mrdoob/three.js/pull/22169
        if (parseInt(THREE.REVISION, 10) < 131) {
            parameters.morphTargets = parameters.morphTargets || false;
            parameters.morphNormals = parameters.morphNormals || false;
        }
        // == uniforms =================================================================================
        this.uniforms = THREE.UniformsUtils.merge([
            THREE.UniformsLib.common,
            THREE.UniformsLib.normalmap,
            THREE.UniformsLib.emissivemap,
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
                shadingShiftTextureScale: { value: null },
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
            const threeRevision = parseInt(THREE.REVISION, 10);
            const defines = Object.entries(Object.assign(Object.assign({}, this._generateDefines()), this.defines))
                .filter(([token, macro]) => !!macro)
                .map(([token, macro]) => `#define ${token} ${macro}`)
                .join('\n') + '\n';
            // -- texture encodings ----------------------------------------------------------------------
            // COMPAT: pre-r137
            let encodings = '';
            if (parseInt(THREE.REVISION, 10) < 137) {
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
        const threeRevision = parseInt(THREE.REVISION, 10);
        if (threeRevision >= 132) {
            this.uniforms.alphaTest.value = this.alphaTest;
        }
        this.uniformsNeedUpdate = true;
    }
    /**
     * Returns a map object of preprocessor token and macro of the shader program.
     */
    _generateDefines() {
        const threeRevision = parseInt(THREE.REVISION, 10);
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
            this._materialParams[key] = new THREE.Color().fromArray(value);
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
                        this._materialParams[key].encoding = THREE.sRGBEncoding;
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
        outlineMaterial.side = THREE.BackSide;
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

export { MToonMaterial, MToonMaterialDebugMode, MToonMaterialLoaderPlugin, MToonMaterialOutlineWidthMode };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyZWUtdnJtLW1hdGVyaWFscy1tdG9vbi5tb2R1bGUuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCIuLi9zcmMvTVRvb25NYXRlcmlhbERlYnVnTW9kZS50cyIsIi4uL3NyYy9NVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZS50cyIsIi4uL3NyYy91dGlscy9nZXRUZXhlbERlY29kaW5nRnVuY3Rpb24udHMiLCIuLi9zcmMvdXRpbHMvZ2V0VGV4dHVyZUVuY29kaW5nRnJvbU1hcC50cyIsIi4uL3NyYy9NVG9vbk1hdGVyaWFsLnRzIiwiLi4vc3JjL0dMVEZNVG9vbk1hdGVyaWFsUGFyYW1zQXNzaWduSGVscGVyLnRzIiwiLi4vc3JjL01Ub29uTWF0ZXJpYWxMb2FkZXJQbHVnaW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2VzRGVjb3JhdGUoY3RvciwgZGVzY3JpcHRvckluLCBkZWNvcmF0b3JzLCBjb250ZXh0SW4sIGluaXRpYWxpemVycywgZXh0cmFJbml0aWFsaXplcnMpIHtcclxuICAgIGZ1bmN0aW9uIGFjY2VwdChmKSB7IGlmIChmICE9PSB2b2lkIDAgJiYgdHlwZW9mIGYgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkZ1bmN0aW9uIGV4cGVjdGVkXCIpOyByZXR1cm4gZjsgfVxyXG4gICAgdmFyIGtpbmQgPSBjb250ZXh0SW4ua2luZCwga2V5ID0ga2luZCA9PT0gXCJnZXR0ZXJcIiA/IFwiZ2V0XCIgOiBraW5kID09PSBcInNldHRlclwiID8gXCJzZXRcIiA6IFwidmFsdWVcIjtcclxuICAgIHZhciB0YXJnZXQgPSAhZGVzY3JpcHRvckluICYmIGN0b3IgPyBjb250ZXh0SW5bXCJzdGF0aWNcIl0gPyBjdG9yIDogY3Rvci5wcm90b3R5cGUgOiBudWxsO1xyXG4gICAgdmFyIGRlc2NyaXB0b3IgPSBkZXNjcmlwdG9ySW4gfHwgKHRhcmdldCA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBjb250ZXh0SW4ubmFtZSkgOiB7fSk7XHJcbiAgICB2YXIgXywgZG9uZSA9IGZhbHNlO1xyXG4gICAgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICB2YXIgY29udGV4dCA9IHt9O1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gY29udGV4dEluKSBjb250ZXh0W3BdID0gcCA9PT0gXCJhY2Nlc3NcIiA/IHt9IDogY29udGV4dEluW3BdO1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gY29udGV4dEluLmFjY2VzcykgY29udGV4dC5hY2Nlc3NbcF0gPSBjb250ZXh0SW4uYWNjZXNzW3BdO1xyXG4gICAgICAgIGNvbnRleHQuYWRkSW5pdGlhbGl6ZXIgPSBmdW5jdGlvbiAoZikgeyBpZiAoZG9uZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBhZGQgaW5pdGlhbGl6ZXJzIGFmdGVyIGRlY29yYXRpb24gaGFzIGNvbXBsZXRlZFwiKTsgZXh0cmFJbml0aWFsaXplcnMucHVzaChhY2NlcHQoZiB8fCBudWxsKSk7IH07XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9ICgwLCBkZWNvcmF0b3JzW2ldKShraW5kID09PSBcImFjY2Vzc29yXCIgPyB7IGdldDogZGVzY3JpcHRvci5nZXQsIHNldDogZGVzY3JpcHRvci5zZXQgfSA6IGRlc2NyaXB0b3Jba2V5XSwgY29udGV4dCk7XHJcbiAgICAgICAgaWYgKGtpbmQgPT09IFwiYWNjZXNzb3JcIikge1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSB2b2lkIDApIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsIHx8IHR5cGVvZiByZXN1bHQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3QgZXhwZWN0ZWRcIik7XHJcbiAgICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5nZXQpKSBkZXNjcmlwdG9yLmdldCA9IF87XHJcbiAgICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5zZXQpKSBkZXNjcmlwdG9yLnNldCA9IF87XHJcbiAgICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5pbml0KSkgaW5pdGlhbGl6ZXJzLnB1c2goXyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKF8gPSBhY2NlcHQocmVzdWx0KSkge1xyXG4gICAgICAgICAgICBpZiAoa2luZCA9PT0gXCJmaWVsZFwiKSBpbml0aWFsaXplcnMucHVzaChfKTtcclxuICAgICAgICAgICAgZWxzZSBkZXNjcmlwdG9yW2tleV0gPSBfO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICh0YXJnZXQpIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGNvbnRleHRJbi5uYW1lLCBkZXNjcmlwdG9yKTtcclxuICAgIGRvbmUgPSB0cnVlO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcnVuSW5pdGlhbGl6ZXJzKHRoaXNBcmcsIGluaXRpYWxpemVycywgdmFsdWUpIHtcclxuICAgIHZhciB1c2VWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbml0aWFsaXplcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YWx1ZSA9IHVzZVZhbHVlID8gaW5pdGlhbGl6ZXJzW2ldLmNhbGwodGhpc0FyZywgdmFsdWUpIDogaW5pdGlhbGl6ZXJzW2ldLmNhbGwodGhpc0FyZyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdXNlVmFsdWUgPyB2YWx1ZSA6IHZvaWQgMDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Byb3BLZXkoeCkge1xyXG4gICAgcmV0dXJuIHR5cGVvZiB4ID09PSBcInN5bWJvbFwiID8geCA6IFwiXCIuY29uY2F0KHgpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc2V0RnVuY3Rpb25OYW1lKGYsIG5hbWUsIHByZWZpeCkge1xyXG4gICAgaWYgKHR5cGVvZiBuYW1lID09PSBcInN5bWJvbFwiKSBuYW1lID0gbmFtZS5kZXNjcmlwdGlvbiA/IFwiW1wiLmNvbmNhdChuYW1lLmRlc2NyaXB0aW9uLCBcIl1cIikgOiBcIlwiO1xyXG4gICAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmLCBcIm5hbWVcIiwgeyBjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiBwcmVmaXggPyBcIlwiLmNvbmNhdChwcmVmaXgsIFwiIFwiLCBuYW1lKSA6IG5hbWUgfSk7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XHJcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xyXG4gICAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xyXG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIG8pIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCkpIF9fY3JlYXRlQmluZGluZyhvLCBtLCBwKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcclxuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgIHJldHVybiByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheSh0bywgZnJvbSwgcGFjaykge1xyXG4gICAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XHJcbiAgICAgICAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XHJcbiAgICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBmYWxzZSB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcclxufSkgOiBmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcclxuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcIm1cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgbWV0aG9kIGlzIG5vdCB3cml0YWJsZVwiKTtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4gKGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgOiBmID8gZi52YWx1ZSA9IHZhbHVlIDogc3RhdGUuc2V0KHJlY2VpdmVyLCB2YWx1ZSkpLCB2YWx1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRJbihzdGF0ZSwgcmVjZWl2ZXIpIHtcclxuICAgIGlmIChyZWNlaXZlciA9PT0gbnVsbCB8fCAodHlwZW9mIHJlY2VpdmVyICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiByZWNlaXZlciAhPT0gXCJmdW5jdGlvblwiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB1c2UgJ2luJyBvcGVyYXRvciBvbiBub24tb2JqZWN0XCIpO1xyXG4gICAgcmV0dXJuIHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgPT09IHN0YXRlIDogc3RhdGUuaGFzKHJlY2VpdmVyKTtcclxufVxyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cblxuLyoqXG4gKiBTcGVjaWZpZXJzIG9mIGRlYnVnIG1vZGUgb2Yge0BsaW5rIE1Ub29uTWF0ZXJpYWx9LlxuICpcbiAqIFNlZToge0BsaW5rIE1Ub29uTWF0ZXJpYWwuZGVidWdNb2RlfVxuICovXG5leHBvcnQgY29uc3QgTVRvb25NYXRlcmlhbERlYnVnTW9kZSA9IHtcbiAgLyoqXG4gICAqIFJlbmRlciBub3JtYWxseS5cbiAgICovXG4gIE5vbmU6ICdub25lJyxcblxuICAvKipcbiAgICogVmlzdWFsaXplIG5vcm1hbHMgb2YgdGhlIHN1cmZhY2UuXG4gICAqL1xuICBOb3JtYWw6ICdub3JtYWwnLFxuXG4gIC8qKlxuICAgKiBWaXN1YWxpemUgbGl0L3NoYWRlIG9mIHRoZSBzdXJmYWNlLlxuICAgKi9cbiAgTGl0U2hhZGVSYXRlOiAnbGl0U2hhZGVSYXRlJyxcblxuICAvKipcbiAgICogVmlzdWFsaXplIFVWIG9mIHRoZSBzdXJmYWNlLlxuICAgKi9cbiAgVVY6ICd1dicsXG59IGFzIGNvbnN0O1xuXG5leHBvcnQgdHlwZSBNVG9vbk1hdGVyaWFsRGVidWdNb2RlID0gdHlwZW9mIE1Ub29uTWF0ZXJpYWxEZWJ1Z01vZGVba2V5b2YgdHlwZW9mIE1Ub29uTWF0ZXJpYWxEZWJ1Z01vZGVdO1xuIiwiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uICovXG5cbmV4cG9ydCBjb25zdCBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZSA9IHtcbiAgTm9uZTogJ25vbmUnLFxuICBXb3JsZENvb3JkaW5hdGVzOiAnd29ybGRDb29yZGluYXRlcycsXG4gIFNjcmVlbkNvb3JkaW5hdGVzOiAnc2NyZWVuQ29vcmRpbmF0ZXMnLFxufSBhcyBjb25zdDtcblxuZXhwb3J0IHR5cGUgTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUgPVxuICB0eXBlb2YgTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGVba2V5b2YgdHlwZW9mIE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlXTtcbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuLy8gU2luY2UgdGhlc2UgY29uc3RhbnRzIGFyZSBkZWxldGVkIGluIHIxMzYgd2UgaGF2ZSB0byBkZWZpbmUgYnkgb3Vyc2VsdmVzXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cbmNvbnN0IFJHQkVFbmNvZGluZyA9IDMwMDI7XG5jb25zdCBSR0JNN0VuY29kaW5nID0gMzAwNDtcbmNvbnN0IFJHQk0xNkVuY29kaW5nID0gMzAwNTtcbmNvbnN0IFJHQkRFbmNvZGluZyA9IDMwMDY7XG5jb25zdCBHYW1tYUVuY29kaW5nID0gMzAwNztcbi8qIGVzbGludC1lbmFibGUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uICovXG5cbi8qKlxuICogQ09NUEFUOiBwcmUtcjEzN1xuICpcbiAqIFJlZjogaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9ibG9iL3IxMzYvc3JjL3JlbmRlcmVycy93ZWJnbC9XZWJHTFByb2dyYW0uanMjTDIyXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRFbmNvZGluZ0NvbXBvbmVudHMgPSAoZW5jb2Rpbmc6IFRIUkVFLlRleHR1cmVFbmNvZGluZyk6IFtzdHJpbmcsIHN0cmluZ10gPT4ge1xuICBpZiAocGFyc2VJbnQoVEhSRUUuUkVWSVNJT04sIDEwKSA+PSAxMzYpIHtcbiAgICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgICBjYXNlIFRIUkVFLkxpbmVhckVuY29kaW5nOlxuICAgICAgICByZXR1cm4gWydMaW5lYXInLCAnKCB2YWx1ZSApJ107XG4gICAgICBjYXNlIFRIUkVFLnNSR0JFbmNvZGluZzpcbiAgICAgICAgcmV0dXJuIFsnc1JHQicsICcoIHZhbHVlICknXTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvbnNvbGUud2FybignVEhSRUUuV2ViR0xQcm9ncmFtOiBVbnN1cHBvcnRlZCBlbmNvZGluZzonLCBlbmNvZGluZyk7XG4gICAgICAgIHJldHVybiBbJ0xpbmVhcicsICcoIHZhbHVlICknXTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gQ09NUEFUOiBwcmUtcjEzNlxuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgVEhSRUUuTGluZWFyRW5jb2Rpbmc6XG4gICAgICAgIHJldHVybiBbJ0xpbmVhcicsICcoIHZhbHVlICknXTtcbiAgICAgIGNhc2UgVEhSRUUuc1JHQkVuY29kaW5nOlxuICAgICAgICByZXR1cm4gWydzUkdCJywgJyggdmFsdWUgKSddO1xuICAgICAgY2FzZSBSR0JFRW5jb2Rpbmc6XG4gICAgICAgIHJldHVybiBbJ1JHQkUnLCAnKCB2YWx1ZSApJ107XG4gICAgICBjYXNlIFJHQk03RW5jb2Rpbmc6XG4gICAgICAgIHJldHVybiBbJ1JHQk0nLCAnKCB2YWx1ZSwgNy4wICknXTtcbiAgICAgIGNhc2UgUkdCTTE2RW5jb2Rpbmc6XG4gICAgICAgIHJldHVybiBbJ1JHQk0nLCAnKCB2YWx1ZSwgMTYuMCApJ107XG4gICAgICBjYXNlIFJHQkRFbmNvZGluZzpcbiAgICAgICAgcmV0dXJuIFsnUkdCRCcsICcoIHZhbHVlLCAyNTYuMCApJ107XG4gICAgICBjYXNlIEdhbW1hRW5jb2Rpbmc6XG4gICAgICAgIHJldHVybiBbJ0dhbW1hJywgJyggdmFsdWUsIGZsb2F0KCBHQU1NQV9GQUNUT1IgKSApJ107XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Vuc3VwcG9ydGVkIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBDT01QQVQ6IHByZS1yMTM3XG4gKlxuICogVGhpcyBmdW5jdGlvbiBpcyBubyBsb25nZXIgcmVxdWlyZWQgYmVnaW5uaW5nIGZyb20gcjEzN1xuICpcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvYmxvYi9yMTM2L3NyYy9yZW5kZXJlcnMvd2ViZ2wvV2ViR0xQcm9ncmFtLmpzI0w1MlxuICovXG5leHBvcnQgY29uc3QgZ2V0VGV4ZWxEZWNvZGluZ0Z1bmN0aW9uID0gKGZ1bmN0aW9uTmFtZTogc3RyaW5nLCBlbmNvZGluZzogVEhSRUUuVGV4dHVyZUVuY29kaW5nKTogc3RyaW5nID0+IHtcbiAgY29uc3QgY29tcG9uZW50cyA9IGdldEVuY29kaW5nQ29tcG9uZW50cyhlbmNvZGluZyk7XG4gIHJldHVybiAndmVjNCAnICsgZnVuY3Rpb25OYW1lICsgJyggdmVjNCB2YWx1ZSApIHsgcmV0dXJuICcgKyBjb21wb25lbnRzWzBdICsgJ1RvTGluZWFyJyArIGNvbXBvbmVudHNbMV0gKyAnOyB9Jztcbn07XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbi8qKlxuICogQ09NUEFUOiBwcmUtcjEzN1xuICpcbiAqIFRoaXMgZnVuY3Rpb24gaXMgbm8gbG9uZ2VyIHJlcXVpcmVkIGJlZ2lubmluZyBmcm9tIHIxMzdcbiAqXG4gKiBSZXRyaWV2ZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vbXJkb29iL3RocmVlLmpzL2Jsb2IvODhiNjMyODk5OGQxNTVmYTBhN2MxZjFlNWUzYmQ2YmZmNzUyNjhjMC9zcmMvcmVuZGVyZXJzL3dlYmdsL1dlYkdMUHJvZ3JhbXMuanMjTDkyXG4gKlxuICogRGlmZjpcbiAqICAgLSBSZW1vdmUgV2ViR0xSZW5kZXJUYXJnZXQgaGFuZGxlciBiZWNhdXNlIGl0IGluY3JlYXNlcyBjb2RlIGNvbXBsZXhpdGllcyBvbiBUeXBlU2NyaXB0XG4gKiAgIC0gQWRkIGEgYm9vbGVhbiBgaXNXZWJHTDJgIGFzIGEgc2Vjb25kIGFyZ3VtZW50LlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGV4dHVyZUVuY29kaW5nRnJvbU1hcChtYXA6IFRIUkVFLlRleHR1cmUsIGlzV2ViR0wyOiBib29sZWFuKTogVEhSRUUuVGV4dHVyZUVuY29kaW5nIHtcbiAgbGV0IGVuY29kaW5nO1xuXG4gIGlmIChtYXAgJiYgbWFwLmlzVGV4dHVyZSkge1xuICAgIGVuY29kaW5nID0gbWFwLmVuY29kaW5nO1xuICAgIC8vIH0gZWxzZSBpZiAoIG1hcCAmJiBtYXAuaXNXZWJHTFJlbmRlclRhcmdldCApIHtcbiAgICAvLyAgIGNvbnNvbGUud2FybiggJ1RIUkVFLldlYkdMUHJvZ3JhbXMuZ2V0VGV4dHVyZUVuY29kaW5nRnJvbU1hcDogZG9uXFwndCB1c2UgcmVuZGVyIHRhcmdldHMgYXMgdGV4dHVyZXMuIFVzZSB0aGVpciAudGV4dHVyZSBwcm9wZXJ0eSBpbnN0ZWFkLicgKTtcbiAgICAvLyAgIGVuY29kaW5nID0gbWFwLnRleHR1cmUuZW5jb2Rpbmc7XG4gIH0gZWxzZSB7XG4gICAgZW5jb2RpbmcgPSBUSFJFRS5MaW5lYXJFbmNvZGluZztcbiAgfVxuXG4gIGlmIChwYXJzZUludChUSFJFRS5SRVZJU0lPTiwgMTApID49IDEzMykge1xuICAgIGlmIChcbiAgICAgIGlzV2ViR0wyICYmXG4gICAgICBtYXAgJiZcbiAgICAgIG1hcC5pc1RleHR1cmUgJiZcbiAgICAgIG1hcC5mb3JtYXQgPT09IFRIUkVFLlJHQkFGb3JtYXQgJiZcbiAgICAgIG1hcC50eXBlID09PSBUSFJFRS5VbnNpZ25lZEJ5dGVUeXBlICYmXG4gICAgICBtYXAuZW5jb2RpbmcgPT09IFRIUkVFLnNSR0JFbmNvZGluZ1xuICAgICkge1xuICAgICAgZW5jb2RpbmcgPSBUSFJFRS5MaW5lYXJFbmNvZGluZzsgLy8gZGlzYWJsZSBpbmxpbmUgZGVjb2RlIGZvciBzUkdCIHRleHR1cmVzIGluIFdlYkdMIDJcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZW5jb2Rpbmc7XG59XG4iLCIvKiB0c2xpbnQ6ZGlzYWJsZTptZW1iZXItb3JkZXJpbmcgKi9cblxuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHZlcnRleFNoYWRlciBmcm9tICcuL3NoYWRlcnMvbXRvb24udmVydCc7XG5pbXBvcnQgZnJhZ21lbnRTaGFkZXIgZnJvbSAnLi9zaGFkZXJzL210b29uLmZyYWcnO1xuaW1wb3J0IHsgTVRvb25NYXRlcmlhbERlYnVnTW9kZSB9IGZyb20gJy4vTVRvb25NYXRlcmlhbERlYnVnTW9kZSc7XG5pbXBvcnQgeyBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZSB9IGZyb20gJy4vTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUnO1xuaW1wb3J0IHR5cGUgeyBNVG9vbk1hdGVyaWFsUGFyYW1ldGVycyB9IGZyb20gJy4vTVRvb25NYXRlcmlhbFBhcmFtZXRlcnMnO1xuaW1wb3J0IHsgZ2V0VGV4ZWxEZWNvZGluZ0Z1bmN0aW9uIH0gZnJvbSAnLi91dGlscy9nZXRUZXhlbERlY29kaW5nRnVuY3Rpb24nO1xuaW1wb3J0IHsgZ2V0VGV4dHVyZUVuY29kaW5nRnJvbU1hcCB9IGZyb20gJy4vdXRpbHMvZ2V0VGV4dHVyZUVuY29kaW5nRnJvbU1hcCc7XG5cbi8qKlxuICogTVRvb24gaXMgYSBtYXRlcmlhbCBzcGVjaWZpY2F0aW9uIHRoYXQgaGFzIHZhcmlvdXMgZmVhdHVyZXMuXG4gKiBUaGUgc3BlYyBhbmQgaW1wbGVtZW50YXRpb24gYXJlIG9yaWdpbmFsbHkgZm91bmRlZCBmb3IgVW5pdHkgZW5naW5lIGFuZCB0aGlzIGlzIGEgcG9ydCBvZiB0aGUgbWF0ZXJpYWwuXG4gKlxuICogU2VlOiBodHRwczovL2dpdGh1Yi5jb20vU2FudGFyaC9NVG9vblxuICovXG5leHBvcnQgY2xhc3MgTVRvb25NYXRlcmlhbCBleHRlbmRzIFRIUkVFLlNoYWRlck1hdGVyaWFsIHtcbiAgcHVibGljIHVuaWZvcm1zOiB7XG4gICAgbGl0RmFjdG9yOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5Db2xvcj47XG4gICAgYWxwaGFUZXN0OiBUSFJFRS5JVW5pZm9ybTxudW1iZXI+O1xuICAgIG9wYWNpdHk6IFRIUkVFLklVbmlmb3JtPG51bWJlcj47XG4gICAgbWFwOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5UZXh0dXJlIHwgbnVsbD47XG4gICAgbWFwVXZUcmFuc2Zvcm06IFRIUkVFLklVbmlmb3JtPFRIUkVFLk1hdHJpeDM+O1xuICAgIG5vcm1hbE1hcDogVEhSRUUuSVVuaWZvcm08VEhSRUUuVGV4dHVyZSB8IG51bGw+O1xuICAgIG5vcm1hbE1hcFV2VHJhbnNmb3JtOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5NYXRyaXgzPjtcbiAgICBub3JtYWxTY2FsZTogVEhSRUUuSVVuaWZvcm08VEhSRUUuVmVjdG9yMj47XG4gICAgZW1pc3NpdmU6IFRIUkVFLklVbmlmb3JtPFRIUkVFLkNvbG9yPjtcbiAgICBlbWlzc2l2ZUludGVuc2l0eTogVEhSRUUuSVVuaWZvcm08bnVtYmVyPjtcbiAgICBlbWlzc2l2ZU1hcDogVEhSRUUuSVVuaWZvcm08VEhSRUUuVGV4dHVyZSB8IG51bGw+O1xuICAgIGVtaXNzaXZlTWFwVXZUcmFuc2Zvcm06IFRIUkVFLklVbmlmb3JtPFRIUkVFLk1hdHJpeDM+O1xuICAgIHNoYWRlQ29sb3JGYWN0b3I6IFRIUkVFLklVbmlmb3JtPFRIUkVFLkNvbG9yPjtcbiAgICBzaGFkZU11bHRpcGx5VGV4dHVyZTogVEhSRUUuSVVuaWZvcm08VEhSRUUuVGV4dHVyZSB8IG51bGw+O1xuICAgIHNoYWRlTXVsdGlwbHlUZXh0dXJlVXZUcmFuc2Zvcm06IFRIUkVFLklVbmlmb3JtPFRIUkVFLk1hdHJpeDM+O1xuICAgIHNoYWRpbmdTaGlmdEZhY3RvcjogVEhSRUUuSVVuaWZvcm08bnVtYmVyPjtcbiAgICBzaGFkaW5nU2hpZnRUZXh0dXJlOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5UZXh0dXJlIHwgbnVsbD47XG4gICAgc2hhZGluZ1NoaWZ0VGV4dHVyZVV2VHJhbnNmb3JtOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5NYXRyaXgzPjtcbiAgICBzaGFkaW5nU2hpZnRUZXh0dXJlU2NhbGU6IFRIUkVFLklVbmlmb3JtPG51bWJlcj47XG4gICAgc2hhZGluZ1Rvb255RmFjdG9yOiBUSFJFRS5JVW5pZm9ybTxudW1iZXI+O1xuICAgIGdpRXF1YWxpemF0aW9uRmFjdG9yOiBUSFJFRS5JVW5pZm9ybTxudW1iZXI+O1xuICAgIG1hdGNhcEZhY3RvcjogVEhSRUUuSVVuaWZvcm08VEhSRUUuQ29sb3I+O1xuICAgIG1hdGNhcFRleHR1cmU6IFRIUkVFLklVbmlmb3JtPFRIUkVFLlRleHR1cmUgfCBudWxsPjtcbiAgICBtYXRjYXBUZXh0dXJlVXZUcmFuc2Zvcm06IFRIUkVFLklVbmlmb3JtPFRIUkVFLk1hdHJpeDM+O1xuICAgIHBhcmFtZXRyaWNSaW1Db2xvckZhY3RvcjogVEhSRUUuSVVuaWZvcm08VEhSRUUuQ29sb3I+O1xuICAgIHJpbU11bHRpcGx5VGV4dHVyZTogVEhSRUUuSVVuaWZvcm08VEhSRUUuVGV4dHVyZSB8IG51bGw+O1xuICAgIHJpbU11bHRpcGx5VGV4dHVyZVV2VHJhbnNmb3JtOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5NYXRyaXgzPjtcbiAgICByaW1MaWdodGluZ01peEZhY3RvcjogVEhSRUUuSVVuaWZvcm08bnVtYmVyPjtcbiAgICBwYXJhbWV0cmljUmltRnJlc25lbFBvd2VyRmFjdG9yOiBUSFJFRS5JVW5pZm9ybTxudW1iZXI+O1xuICAgIHBhcmFtZXRyaWNSaW1MaWZ0RmFjdG9yOiBUSFJFRS5JVW5pZm9ybTxudW1iZXI+O1xuICAgIG91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZTogVEhSRUUuSVVuaWZvcm08VEhSRUUuVGV4dHVyZSB8IG51bGw+O1xuICAgIG91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZVV2VHJhbnNmb3JtOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5NYXRyaXgzPjtcbiAgICBvdXRsaW5lV2lkdGhGYWN0b3I6IFRIUkVFLklVbmlmb3JtPG51bWJlcj47XG4gICAgb3V0bGluZUNvbG9yRmFjdG9yOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5Db2xvcj47XG4gICAgb3V0bGluZUxpZ2h0aW5nTWl4RmFjdG9yOiBUSFJFRS5JVW5pZm9ybTxudW1iZXI+O1xuICAgIHV2QW5pbWF0aW9uTWFza1RleHR1cmU6IFRIUkVFLklVbmlmb3JtPFRIUkVFLlRleHR1cmUgfCBudWxsPjtcbiAgICB1dkFuaW1hdGlvbk1hc2tUZXh0dXJlVXZUcmFuc2Zvcm06IFRIUkVFLklVbmlmb3JtPFRIUkVFLk1hdHJpeDM+O1xuICAgIHV2QW5pbWF0aW9uU2Nyb2xsWE9mZnNldDogVEhSRUUuSVVuaWZvcm08bnVtYmVyPjtcbiAgICB1dkFuaW1hdGlvblNjcm9sbFlPZmZzZXQ6IFRIUkVFLklVbmlmb3JtPG51bWJlcj47XG4gICAgdXZBbmltYXRpb25Sb3RhdGlvblBoYXNlOiBUSFJFRS5JVW5pZm9ybTxudW1iZXI+O1xuICB9O1xuXG4gIHB1YmxpYyBnZXQgY29sb3IoKTogVEhSRUUuQ29sb3Ige1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLmxpdEZhY3Rvci52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IGNvbG9yKHZhbHVlOiBUSFJFRS5Db2xvcikge1xuICAgIHRoaXMudW5pZm9ybXMubGl0RmFjdG9yLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG1hcCgpOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMubWFwLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgbWFwKHZhbHVlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCkge1xuICAgIHRoaXMudW5pZm9ybXMubWFwLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG5vcm1hbE1hcCgpOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMubm9ybWFsTWFwLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgbm9ybWFsTWFwKHZhbHVlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCkge1xuICAgIHRoaXMudW5pZm9ybXMubm9ybWFsTWFwLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG5vcm1hbFNjYWxlKCk6IFRIUkVFLlZlY3RvcjIge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLm5vcm1hbFNjYWxlLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgbm9ybWFsU2NhbGUodmFsdWU6IFRIUkVFLlZlY3RvcjIpIHtcbiAgICB0aGlzLnVuaWZvcm1zLm5vcm1hbFNjYWxlLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGVtaXNzaXZlKCk6IFRIUkVFLkNvbG9yIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5lbWlzc2l2ZS52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IGVtaXNzaXZlKHZhbHVlOiBUSFJFRS5Db2xvcikge1xuICAgIHRoaXMudW5pZm9ybXMuZW1pc3NpdmUudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgZW1pc3NpdmVJbnRlbnNpdHkoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5lbWlzc2l2ZUludGVuc2l0eS52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IGVtaXNzaXZlSW50ZW5zaXR5KHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLnVuaWZvcm1zLmVtaXNzaXZlSW50ZW5zaXR5LnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGVtaXNzaXZlTWFwKCk6IFRIUkVFLlRleHR1cmUgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5lbWlzc2l2ZU1hcC52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IGVtaXNzaXZlTWFwKHZhbHVlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCkge1xuICAgIHRoaXMudW5pZm9ybXMuZW1pc3NpdmVNYXAudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc2hhZGVDb2xvckZhY3RvcigpOiBUSFJFRS5Db2xvciB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMuc2hhZGVDb2xvckZhY3Rvci52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IHNoYWRlQ29sb3JGYWN0b3IodmFsdWU6IFRIUkVFLkNvbG9yKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5zaGFkZUNvbG9yRmFjdG9yLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHNoYWRlTXVsdGlwbHlUZXh0dXJlKCk6IFRIUkVFLlRleHR1cmUgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5zaGFkZU11bHRpcGx5VGV4dHVyZS52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IHNoYWRlTXVsdGlwbHlUZXh0dXJlKHZhbHVlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCkge1xuICAgIHRoaXMudW5pZm9ybXMuc2hhZGVNdWx0aXBseVRleHR1cmUudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc2hhZGluZ1NoaWZ0RmFjdG9yKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMuc2hhZGluZ1NoaWZ0RmFjdG9yLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgc2hhZGluZ1NoaWZ0RmFjdG9yKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLnVuaWZvcm1zLnNoYWRpbmdTaGlmdEZhY3Rvci52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBzaGFkaW5nU2hpZnRUZXh0dXJlKCk6IFRIUkVFLlRleHR1cmUgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5zaGFkaW5nU2hpZnRUZXh0dXJlLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgc2hhZGluZ1NoaWZ0VGV4dHVyZSh2YWx1ZTogVEhSRUUuVGV4dHVyZSB8IG51bGwpIHtcbiAgICB0aGlzLnVuaWZvcm1zLnNoYWRpbmdTaGlmdFRleHR1cmUudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc2hhZGluZ1NoaWZ0VGV4dHVyZVNjYWxlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMuc2hhZGluZ1NoaWZ0VGV4dHVyZVNjYWxlLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgc2hhZGluZ1NoaWZ0VGV4dHVyZVNjYWxlKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLnVuaWZvcm1zLnNoYWRpbmdTaGlmdFRleHR1cmVTY2FsZS52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBzaGFkaW5nVG9vbnlGYWN0b3IoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5zaGFkaW5nVG9vbnlGYWN0b3IudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCBzaGFkaW5nVG9vbnlGYWN0b3IodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMudW5pZm9ybXMuc2hhZGluZ1Rvb255RmFjdG9yLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGdpRXF1YWxpemF0aW9uRmFjdG9yKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMuZ2lFcXVhbGl6YXRpb25GYWN0b3IudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCBnaUVxdWFsaXphdGlvbkZhY3Rvcih2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5naUVxdWFsaXphdGlvbkZhY3Rvci52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBtYXRjYXBGYWN0b3IoKTogVEhSRUUuQ29sb3Ige1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLm1hdGNhcEZhY3Rvci52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IG1hdGNhcEZhY3Rvcih2YWx1ZTogVEhSRUUuQ29sb3IpIHtcbiAgICB0aGlzLnVuaWZvcm1zLm1hdGNhcEZhY3Rvci52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBtYXRjYXBUZXh0dXJlKCk6IFRIUkVFLlRleHR1cmUgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5tYXRjYXBUZXh0dXJlLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgbWF0Y2FwVGV4dHVyZSh2YWx1ZTogVEhSRUUuVGV4dHVyZSB8IG51bGwpIHtcbiAgICB0aGlzLnVuaWZvcm1zLm1hdGNhcFRleHR1cmUudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcGFyYW1ldHJpY1JpbUNvbG9yRmFjdG9yKCk6IFRIUkVFLkNvbG9yIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5wYXJhbWV0cmljUmltQ29sb3JGYWN0b3IudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCBwYXJhbWV0cmljUmltQ29sb3JGYWN0b3IodmFsdWU6IFRIUkVFLkNvbG9yKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5wYXJhbWV0cmljUmltQ29sb3JGYWN0b3IudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcmltTXVsdGlwbHlUZXh0dXJlKCk6IFRIUkVFLlRleHR1cmUgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5yaW1NdWx0aXBseVRleHR1cmUudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCByaW1NdWx0aXBseVRleHR1cmUodmFsdWU6IFRIUkVFLlRleHR1cmUgfCBudWxsKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5yaW1NdWx0aXBseVRleHR1cmUudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcmltTGlnaHRpbmdNaXhGYWN0b3IoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5yaW1MaWdodGluZ01peEZhY3Rvci52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IHJpbUxpZ2h0aW5nTWl4RmFjdG9yKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLnVuaWZvcm1zLnJpbUxpZ2h0aW5nTWl4RmFjdG9yLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJGYWN0b3IoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5wYXJhbWV0cmljUmltRnJlc25lbFBvd2VyRmFjdG9yLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgcGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlckZhY3Rvcih2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5wYXJhbWV0cmljUmltRnJlc25lbFBvd2VyRmFjdG9yLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHBhcmFtZXRyaWNSaW1MaWZ0RmFjdG9yKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMucGFyYW1ldHJpY1JpbUxpZnRGYWN0b3IudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCBwYXJhbWV0cmljUmltTGlmdEZhY3Rvcih2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5wYXJhbWV0cmljUmltTGlmdEZhY3Rvci52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBvdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmUoKTogVEhSRUUuVGV4dHVyZSB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLm91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZS52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IG91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZSh2YWx1ZTogVEhSRUUuVGV4dHVyZSB8IG51bGwpIHtcbiAgICB0aGlzLnVuaWZvcm1zLm91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZS52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBvdXRsaW5lV2lkdGhGYWN0b3IoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5vdXRsaW5lV2lkdGhGYWN0b3IudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCBvdXRsaW5lV2lkdGhGYWN0b3IodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMudW5pZm9ybXMub3V0bGluZVdpZHRoRmFjdG9yLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG91dGxpbmVDb2xvckZhY3RvcigpOiBUSFJFRS5Db2xvciB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMub3V0bGluZUNvbG9yRmFjdG9yLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgb3V0bGluZUNvbG9yRmFjdG9yKHZhbHVlOiBUSFJFRS5Db2xvcikge1xuICAgIHRoaXMudW5pZm9ybXMub3V0bGluZUNvbG9yRmFjdG9yLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG91dGxpbmVMaWdodGluZ01peEZhY3RvcigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLm91dGxpbmVMaWdodGluZ01peEZhY3Rvci52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IG91dGxpbmVMaWdodGluZ01peEZhY3Rvcih2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5vdXRsaW5lTGlnaHRpbmdNaXhGYWN0b3IudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdXZBbmltYXRpb25NYXNrVGV4dHVyZSgpOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMudXZBbmltYXRpb25NYXNrVGV4dHVyZS52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IHV2QW5pbWF0aW9uTWFza1RleHR1cmUodmFsdWU6IFRIUkVFLlRleHR1cmUgfCBudWxsKSB7XG4gICAgdGhpcy51bmlmb3Jtcy51dkFuaW1hdGlvbk1hc2tUZXh0dXJlLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHV2QW5pbWF0aW9uU2Nyb2xsWE9mZnNldCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLnV2QW5pbWF0aW9uU2Nyb2xsWE9mZnNldC52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IHV2QW5pbWF0aW9uU2Nyb2xsWE9mZnNldCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy51bmlmb3Jtcy51dkFuaW1hdGlvblNjcm9sbFhPZmZzZXQudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdXZBbmltYXRpb25TY3JvbGxZT2Zmc2V0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMudXZBbmltYXRpb25TY3JvbGxZT2Zmc2V0LnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgdXZBbmltYXRpb25TY3JvbGxZT2Zmc2V0KHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLnVuaWZvcm1zLnV2QW5pbWF0aW9uU2Nyb2xsWU9mZnNldC52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCB1dkFuaW1hdGlvblJvdGF0aW9uUGhhc2UoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy51dkFuaW1hdGlvblJvdGF0aW9uUGhhc2UudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCB1dkFuaW1hdGlvblJvdGF0aW9uUGhhc2UodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMudW5pZm9ybXMudXZBbmltYXRpb25Sb3RhdGlvblBoYXNlLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgdXZBbmltYXRpb25TY3JvbGxYU3BlZWRGYWN0b3IgPSAwLjA7XG4gIHB1YmxpYyB1dkFuaW1hdGlvblNjcm9sbFlTcGVlZEZhY3RvciA9IDAuMDtcbiAgcHVibGljIHV2QW5pbWF0aW9uUm90YXRpb25TcGVlZEZhY3RvciA9IDAuMDtcblxuICAvKipcbiAgICogV2hldGhlciB0aGUgbWF0ZXJpYWwgaXMgYWZmZWN0ZWQgYnkgZm9nLlxuICAgKiBgdHJ1ZWAgYnkgZGVmYXVsdC5cbiAgICovXG4gIHB1YmxpYyBmb2cgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBXaWxsIGJlIHJlYWQgaW4gV2ViR0xQcm9ncmFtc1xuICAgKlxuICAgKiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvYmxvYi80ZjUyMzZhYzNkNmY0MWQ5MDRhYTU4NDAxYjQwNTU0ZThmYmRjYjE1L3NyYy9yZW5kZXJlcnMvd2ViZ2wvV2ViR0xQcm9ncmFtcy5qcyNMMTkwLUwxOTFcbiAgICovXG4gIHB1YmxpYyBub3JtYWxNYXBUeXBlID0gVEhSRUUuVGFuZ2VudFNwYWNlTm9ybWFsTWFwO1xuXG4gIC8qKlxuICAgKiBXaGVuIHRoaXMgaXMgYHRydWVgLCB2ZXJ0ZXggY29sb3JzIHdpbGwgYmUgaWdub3JlZC5cbiAgICogYHRydWVgIGJ5IGRlZmF1bHQuXG4gICAqL1xuICBwcml2YXRlIF9pZ25vcmVWZXJ0ZXhDb2xvciA9IHRydWU7XG5cbiAgLyoqXG4gICAqIFdoZW4gdGhpcyBpcyBgdHJ1ZWAsIHZlcnRleCBjb2xvcnMgd2lsbCBiZSBpZ25vcmVkLlxuICAgKiBgdHJ1ZWAgYnkgZGVmYXVsdC5cbiAgICovXG4gIHB1YmxpYyBnZXQgaWdub3JlVmVydGV4Q29sb3IoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2lnbm9yZVZlcnRleENvbG9yO1xuICB9XG4gIHB1YmxpYyBzZXQgaWdub3JlVmVydGV4Q29sb3IodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9pZ25vcmVWZXJ0ZXhDb2xvciA9IHZhbHVlO1xuXG4gICAgdGhpcy5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIF92MENvbXBhdFNoYWRlID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFRoZXJlIGlzIGEgbGluZSBvZiB0aGUgc2hhZGVyIGNhbGxlZCBcImNvbW1lbnQgb3V0IGlmIHlvdSB3YW50IHRvIFBCUiBhYnNvbHV0ZWx5XCIgaW4gVlJNMC4wIE1Ub29uLlxuICAgKiBXaGVuIHRoaXMgaXMgdHJ1ZSwgdGhlIG1hdGVyaWFsIGVuYWJsZXMgdGhlIGxpbmUgdG8gbWFrZSBpdCBjb21wYXRpYmxlIHdpdGggdGhlIGxlZ2FjeSByZW5kZXJpbmcgb2YgVlJNLlxuICAgKiBVc3VhbGx5IG5vdCByZWNvbW1lbmRlZCB0byB0dXJuIHRoaXMgb24uXG4gICAqIGBmYWxzZWAgYnkgZGVmYXVsdC5cbiAgICovXG4gIGdldCB2MENvbXBhdFNoYWRlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl92MENvbXBhdFNoYWRlO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZXJlIGlzIGEgbGluZSBvZiB0aGUgc2hhZGVyIGNhbGxlZCBcImNvbW1lbnQgb3V0IGlmIHlvdSB3YW50IHRvIFBCUiBhYnNvbHV0ZWx5XCIgaW4gVlJNMC4wIE1Ub29uLlxuICAgKiBXaGVuIHRoaXMgaXMgdHJ1ZSwgdGhlIG1hdGVyaWFsIGVuYWJsZXMgdGhlIGxpbmUgdG8gbWFrZSBpdCBjb21wYXRpYmxlIHdpdGggdGhlIGxlZ2FjeSByZW5kZXJpbmcgb2YgVlJNLlxuICAgKiBVc3VhbGx5IG5vdCByZWNvbW1lbmRlZCB0byB0dXJuIHRoaXMgb24uXG4gICAqIGBmYWxzZWAgYnkgZGVmYXVsdC5cbiAgICovXG4gIHNldCB2MENvbXBhdFNoYWRlKHY6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl92MENvbXBhdFNoYWRlID0gdjtcblxuICAgIHRoaXMubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfZGVidWdNb2RlOiBNVG9vbk1hdGVyaWFsRGVidWdNb2RlID0gTVRvb25NYXRlcmlhbERlYnVnTW9kZS5Ob25lO1xuXG4gIC8qKlxuICAgKiBEZWJ1ZyBtb2RlIGZvciB0aGUgbWF0ZXJpYWwuXG4gICAqIFlvdSBjYW4gdmlzdWFsaXplIHNldmVyYWwgY29tcG9uZW50cyBmb3IgZGlhZ25vc2lzIHVzaW5nIGRlYnVnIG1vZGUuXG4gICAqXG4gICAqIFNlZToge0BsaW5rIE1Ub29uTWF0ZXJpYWxEZWJ1Z01vZGV9XG4gICAqL1xuICBnZXQgZGVidWdNb2RlKCk6IE1Ub29uTWF0ZXJpYWxEZWJ1Z01vZGUge1xuICAgIHJldHVybiB0aGlzLl9kZWJ1Z01vZGU7XG4gIH1cblxuICAvKipcbiAgICogRGVidWcgbW9kZSBmb3IgdGhlIG1hdGVyaWFsLlxuICAgKiBZb3UgY2FuIHZpc3VhbGl6ZSBzZXZlcmFsIGNvbXBvbmVudHMgZm9yIGRpYWdub3NpcyB1c2luZyBkZWJ1ZyBtb2RlLlxuICAgKlxuICAgKiBTZWU6IHtAbGluayBNVG9vbk1hdGVyaWFsRGVidWdNb2RlfVxuICAgKi9cbiAgc2V0IGRlYnVnTW9kZShtOiBNVG9vbk1hdGVyaWFsRGVidWdNb2RlKSB7XG4gICAgdGhpcy5fZGVidWdNb2RlID0gbTtcblxuICAgIHRoaXMubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfb3V0bGluZVdpZHRoTW9kZTogTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUgPSBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZS5Ob25lO1xuXG4gIGdldCBvdXRsaW5lV2lkdGhNb2RlKCk6IE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlIHtcbiAgICByZXR1cm4gdGhpcy5fb3V0bGluZVdpZHRoTW9kZTtcbiAgfVxuICBzZXQgb3V0bGluZVdpZHRoTW9kZShtOiBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZSkge1xuICAgIHRoaXMuX291dGxpbmVXaWR0aE1vZGUgPSBtO1xuXG4gICAgdGhpcy5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIF9pc091dGxpbmUgPSBmYWxzZTtcblxuICBnZXQgaXNPdXRsaW5lKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc091dGxpbmU7XG4gIH1cbiAgc2V0IGlzT3V0bGluZShiOiBib29sZWFuKSB7XG4gICAgdGhpcy5faXNPdXRsaW5lID0gYjtcblxuICAgIHRoaXMubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlYWRvbmx5IGJvb2xlYW4gdGhhdCBpbmRpY2F0ZXMgdGhpcyBpcyBhIFtbTVRvb25NYXRlcmlhbF1dLlxuICAgKi9cbiAgcHVibGljIGdldCBpc01Ub29uTWF0ZXJpYWwoKTogdHJ1ZSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwYXJhbWV0ZXJzOiBNVG9vbk1hdGVyaWFsUGFyYW1ldGVycyA9IHt9KSB7XG4gICAgc3VwZXIoeyB2ZXJ0ZXhTaGFkZXIsIGZyYWdtZW50U2hhZGVyIH0pO1xuXG4gICAgLy8gb3ZlcnJpZGUgZGVwdGhXcml0ZSB3aXRoIHRyYW5zcGFyZW50V2l0aFpXcml0ZVxuICAgIGlmIChwYXJhbWV0ZXJzLnRyYW5zcGFyZW50V2l0aFpXcml0ZSkge1xuICAgICAgcGFyYW1ldGVycy5kZXB0aFdyaXRlID0gdHJ1ZTtcbiAgICB9XG4gICAgZGVsZXRlIHBhcmFtZXRlcnMudHJhbnNwYXJlbnRXaXRoWldyaXRlO1xuXG4gICAgLy8gPT0gZW5hYmxpbmcgYnVuY2ggb2Ygc3R1ZmYgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgcGFyYW1ldGVycy5mb2cgPSB0cnVlO1xuICAgIHBhcmFtZXRlcnMubGlnaHRzID0gdHJ1ZTtcbiAgICBwYXJhbWV0ZXJzLmNsaXBwaW5nID0gdHJ1ZTtcblxuICAgIC8vIENPTVBBVDogcHJlLXIxMjlcbiAgICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvcHVsbC8yMTc4OFxuICAgIGlmIChwYXJzZUludChUSFJFRS5SRVZJU0lPTiwgMTApIDwgMTI5KSB7XG4gICAgICAocGFyYW1ldGVycyBhcyBhbnkpLnNraW5uaW5nID0gKHBhcmFtZXRlcnMgYXMgYW55KS5za2lubmluZyB8fCBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBDT01QQVQ6IHByZS1yMTMxXG4gICAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vbXJkb29iL3RocmVlLmpzL3B1bGwvMjIxNjlcbiAgICBpZiAocGFyc2VJbnQoVEhSRUUuUkVWSVNJT04sIDEwKSA8IDEzMSkge1xuICAgICAgKHBhcmFtZXRlcnMgYXMgYW55KS5tb3JwaFRhcmdldHMgPSAocGFyYW1ldGVycyBhcyBhbnkpLm1vcnBoVGFyZ2V0cyB8fCBmYWxzZTtcbiAgICAgIChwYXJhbWV0ZXJzIGFzIGFueSkubW9ycGhOb3JtYWxzID0gKHBhcmFtZXRlcnMgYXMgYW55KS5tb3JwaE5vcm1hbHMgfHwgZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gPT0gdW5pZm9ybXMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgdGhpcy51bmlmb3JtcyA9IFRIUkVFLlVuaWZvcm1zVXRpbHMubWVyZ2UoW1xuICAgICAgVEhSRUUuVW5pZm9ybXNMaWIuY29tbW9uLCAvLyBtYXBcbiAgICAgIFRIUkVFLlVuaWZvcm1zTGliLm5vcm1hbG1hcCwgLy8gbm9ybWFsTWFwXG4gICAgICBUSFJFRS5Vbmlmb3Jtc0xpYi5lbWlzc2l2ZW1hcCwgLy8gZW1pc3NpdmVNYXBcbiAgICAgIFRIUkVFLlVuaWZvcm1zTGliLmZvZyxcbiAgICAgIFRIUkVFLlVuaWZvcm1zTGliLmxpZ2h0cyxcbiAgICAgIHtcbiAgICAgICAgbGl0RmFjdG9yOiB7IHZhbHVlOiBuZXcgVEhSRUUuQ29sb3IoMS4wLCAxLjAsIDEuMCkgfSxcbiAgICAgICAgbWFwVXZUcmFuc2Zvcm06IHsgdmFsdWU6IG5ldyBUSFJFRS5NYXRyaXgzKCkgfSxcbiAgICAgICAgY29sb3JBbHBoYTogeyB2YWx1ZTogMS4wIH0sXG4gICAgICAgIG5vcm1hbE1hcFV2VHJhbnNmb3JtOiB7IHZhbHVlOiBuZXcgVEhSRUUuTWF0cml4MygpIH0sXG4gICAgICAgIHNoYWRlQ29sb3JGYWN0b3I6IHsgdmFsdWU6IG5ldyBUSFJFRS5Db2xvcigwLjk3LCAwLjgxLCAwLjg2KSB9LFxuICAgICAgICBzaGFkZU11bHRpcGx5VGV4dHVyZTogeyB2YWx1ZTogbnVsbCB9LFxuICAgICAgICBzaGFkZU11bHRpcGx5VGV4dHVyZVV2VHJhbnNmb3JtOiB7IHZhbHVlOiBuZXcgVEhSRUUuTWF0cml4MygpIH0sXG4gICAgICAgIHNoYWRpbmdTaGlmdEZhY3RvcjogeyB2YWx1ZTogMC4wIH0sXG4gICAgICAgIHNoYWRpbmdTaGlmdFRleHR1cmU6IHsgdmFsdWU6IG51bGwgfSxcbiAgICAgICAgc2hhZGluZ1NoaWZ0VGV4dHVyZVV2VHJhbnNmb3JtOiB7IHZhbHVlOiBuZXcgVEhSRUUuTWF0cml4MygpIH0sXG4gICAgICAgIHNoYWRpbmdTaGlmdFRleHR1cmVTY2FsZTogeyB2YWx1ZTogbnVsbCB9LFxuICAgICAgICBzaGFkaW5nVG9vbnlGYWN0b3I6IHsgdmFsdWU6IDAuOSB9LFxuICAgICAgICBnaUVxdWFsaXphdGlvbkZhY3RvcjogeyB2YWx1ZTogMC45IH0sXG4gICAgICAgIG1hdGNhcEZhY3RvcjogeyB2YWx1ZTogbmV3IFRIUkVFLkNvbG9yKDAuMCwgMC4wLCAwLjApIH0sXG4gICAgICAgIG1hdGNhcFRleHR1cmU6IHsgdmFsdWU6IG51bGwgfSxcbiAgICAgICAgbWF0Y2FwVGV4dHVyZVV2VHJhbnNmb3JtOiB7IHZhbHVlOiBuZXcgVEhSRUUuTWF0cml4MygpIH0sXG4gICAgICAgIHBhcmFtZXRyaWNSaW1Db2xvckZhY3RvcjogeyB2YWx1ZTogbmV3IFRIUkVFLkNvbG9yKDAuMCwgMC4wLCAwLjApIH0sXG4gICAgICAgIHJpbU11bHRpcGx5VGV4dHVyZTogeyB2YWx1ZTogbnVsbCB9LFxuICAgICAgICByaW1NdWx0aXBseVRleHR1cmVVdlRyYW5zZm9ybTogeyB2YWx1ZTogbmV3IFRIUkVFLk1hdHJpeDMoKSB9LFxuICAgICAgICByaW1MaWdodGluZ01peEZhY3RvcjogeyB2YWx1ZTogMC4wIH0sXG4gICAgICAgIHBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJGYWN0b3I6IHsgdmFsdWU6IDEuMCB9LFxuICAgICAgICBwYXJhbWV0cmljUmltTGlmdEZhY3RvcjogeyB2YWx1ZTogMC4wIH0sXG4gICAgICAgIGVtaXNzaXZlOiB7IHZhbHVlOiBuZXcgVEhSRUUuQ29sb3IoMC4wLCAwLjAsIDAuMCkgfSxcbiAgICAgICAgZW1pc3NpdmVJbnRlbnNpdHk6IHsgdmFsdWU6IDEuMCB9LFxuICAgICAgICBlbWlzc2l2ZU1hcFV2VHJhbnNmb3JtOiB7IHZhbHVlOiBuZXcgVEhSRUUuTWF0cml4MygpIH0sXG4gICAgICAgIG91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZTogeyB2YWx1ZTogbnVsbCB9LFxuICAgICAgICBvdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmVVdlRyYW5zZm9ybTogeyB2YWx1ZTogbmV3IFRIUkVFLk1hdHJpeDMoKSB9LFxuICAgICAgICBvdXRsaW5lV2lkdGhGYWN0b3I6IHsgdmFsdWU6IDAuNSB9LFxuICAgICAgICBvdXRsaW5lQ29sb3JGYWN0b3I6IHsgdmFsdWU6IG5ldyBUSFJFRS5Db2xvcigwLjAsIDAuMCwgMC4wKSB9LFxuICAgICAgICBvdXRsaW5lTGlnaHRpbmdNaXhGYWN0b3I6IHsgdmFsdWU6IDEuMCB9LFxuICAgICAgICB1dkFuaW1hdGlvbk1hc2tUZXh0dXJlOiB7IHZhbHVlOiBudWxsIH0sXG4gICAgICAgIHV2QW5pbWF0aW9uTWFza1RleHR1cmVVdlRyYW5zZm9ybTogeyB2YWx1ZTogbmV3IFRIUkVFLk1hdHJpeDMoKSB9LFxuICAgICAgICB1dkFuaW1hdGlvblNjcm9sbFhPZmZzZXQ6IHsgdmFsdWU6IDAuMCB9LFxuICAgICAgICB1dkFuaW1hdGlvblNjcm9sbFlPZmZzZXQ6IHsgdmFsdWU6IDAuMCB9LFxuICAgICAgICB1dkFuaW1hdGlvblJvdGF0aW9uUGhhc2U6IHsgdmFsdWU6IDAuMCB9LFxuICAgICAgfSxcbiAgICAgIHBhcmFtZXRlcnMudW5pZm9ybXMsXG4gICAgXSk7XG5cbiAgICAvLyA9PSBmaW5hbGx5IGNvbXBpbGUgdGhlIHNoYWRlciBwcm9ncmFtID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICB0aGlzLnNldFZhbHVlcyhwYXJhbWV0ZXJzKTtcblxuICAgIC8vID09IHVwbG9hZCB1bmlmb3JtcyB0aGF0IG5lZWQgdG8gdXBsb2FkID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHRoaXMuX3VwbG9hZFVuaWZvcm1zV29ya2Fyb3VuZCgpO1xuXG4gICAgLy8gPT0gdXBkYXRlIHNoYWRlciBzdHVmZiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgdGhpcy5jdXN0b21Qcm9ncmFtQ2FjaGVLZXkgPSAoKSA9PlxuICAgICAgW1xuICAgICAgICAuLi5PYmplY3QuZW50cmllcyh0aGlzLl9nZW5lcmF0ZURlZmluZXMoKSkubWFwKChbdG9rZW4sIG1hY3JvXSkgPT4gYCR7dG9rZW59OiR7bWFjcm99YCksXG4gICAgICAgIHRoaXMubWF0Y2FwVGV4dHVyZSA/IGBtYXRjYXBUZXh0dXJlRW5jb2Rpbmc6JHt0aGlzLm1hdGNhcFRleHR1cmUuZW5jb2Rpbmd9YCA6ICcnLFxuICAgICAgICB0aGlzLnNoYWRlTXVsdGlwbHlUZXh0dXJlID8gYHNoYWRlTXVsdGlwbHlUZXh0dXJlRW5jb2Rpbmc6JHt0aGlzLnNoYWRlTXVsdGlwbHlUZXh0dXJlLmVuY29kaW5nfWAgOiAnJyxcbiAgICAgICAgdGhpcy5yaW1NdWx0aXBseVRleHR1cmUgPyBgcmltTXVsdGlwbHlUZXh0dXJlRW5jb2Rpbmc6JHt0aGlzLnJpbU11bHRpcGx5VGV4dHVyZS5lbmNvZGluZ31gIDogJycsXG4gICAgICBdLmpvaW4oJywnKTtcblxuICAgIHRoaXMub25CZWZvcmVDb21waWxlID0gKHNoYWRlciwgcmVuZGVyZXIpID0+IHtcbiAgICAgIC8qKlxuICAgICAgICogV2lsbCBiZSBuZWVkZWQgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgd2Ugc2hvdWxkIGlubGluZSBjb252ZXJ0IHNSR0IgdGV4dHVyZXMgb3Igbm90LlxuICAgICAgICogU2VlOiBodHRwczovL2dpdGh1Yi5jb20vbXJkb29iL3RocmVlLmpzL3B1bGwvMjI1NTFcbiAgICAgICAqL1xuICAgICAgY29uc3QgaXNXZWJHTDIgPSByZW5kZXJlci5jYXBhYmlsaXRpZXMuaXNXZWJHTDI7XG5cbiAgICAgIGNvbnN0IHRocmVlUmV2aXNpb24gPSBwYXJzZUludChUSFJFRS5SRVZJU0lPTiwgMTApO1xuXG4gICAgICBjb25zdCBkZWZpbmVzID1cbiAgICAgICAgT2JqZWN0LmVudHJpZXMoeyAuLi50aGlzLl9nZW5lcmF0ZURlZmluZXMoKSwgLi4udGhpcy5kZWZpbmVzIH0pXG4gICAgICAgICAgLmZpbHRlcigoW3Rva2VuLCBtYWNyb10pID0+ICEhbWFjcm8pXG4gICAgICAgICAgLm1hcCgoW3Rva2VuLCBtYWNyb10pID0+IGAjZGVmaW5lICR7dG9rZW59ICR7bWFjcm99YClcbiAgICAgICAgICAuam9pbignXFxuJykgKyAnXFxuJztcblxuICAgICAgLy8gLS0gdGV4dHVyZSBlbmNvZGluZ3MgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgLy8gQ09NUEFUOiBwcmUtcjEzN1xuICAgICAgbGV0IGVuY29kaW5ncyA9ICcnO1xuXG4gICAgICBpZiAocGFyc2VJbnQoVEhSRUUuUkVWSVNJT04sIDEwKSA8IDEzNykge1xuICAgICAgICBlbmNvZGluZ3MgPVxuICAgICAgICAgICh0aGlzLm1hdGNhcFRleHR1cmUgIT09IG51bGxcbiAgICAgICAgICAgID8gZ2V0VGV4ZWxEZWNvZGluZ0Z1bmN0aW9uKFxuICAgICAgICAgICAgICAgICdtYXRjYXBUZXh0dXJlVGV4ZWxUb0xpbmVhcicsXG4gICAgICAgICAgICAgICAgZ2V0VGV4dHVyZUVuY29kaW5nRnJvbU1hcCh0aGlzLm1hdGNhcFRleHR1cmUsIGlzV2ViR0wyKSxcbiAgICAgICAgICAgICAgKSArICdcXG4nXG4gICAgICAgICAgICA6ICcnKSArXG4gICAgICAgICAgKHRoaXMuc2hhZGVNdWx0aXBseVRleHR1cmUgIT09IG51bGxcbiAgICAgICAgICAgID8gZ2V0VGV4ZWxEZWNvZGluZ0Z1bmN0aW9uKFxuICAgICAgICAgICAgICAgICdzaGFkZU11bHRpcGx5VGV4dHVyZVRleGVsVG9MaW5lYXInLFxuICAgICAgICAgICAgICAgIGdldFRleHR1cmVFbmNvZGluZ0Zyb21NYXAodGhpcy5zaGFkZU11bHRpcGx5VGV4dHVyZSwgaXNXZWJHTDIpLFxuICAgICAgICAgICAgICApICsgJ1xcbidcbiAgICAgICAgICAgIDogJycpICtcbiAgICAgICAgICAodGhpcy5yaW1NdWx0aXBseVRleHR1cmUgIT09IG51bGxcbiAgICAgICAgICAgID8gZ2V0VGV4ZWxEZWNvZGluZ0Z1bmN0aW9uKFxuICAgICAgICAgICAgICAgICdyaW1NdWx0aXBseVRleHR1cmVUZXhlbFRvTGluZWFyJyxcbiAgICAgICAgICAgICAgICBnZXRUZXh0dXJlRW5jb2RpbmdGcm9tTWFwKHRoaXMucmltTXVsdGlwbHlUZXh0dXJlLCBpc1dlYkdMMiksXG4gICAgICAgICAgICAgICkgKyAnXFxuJ1xuICAgICAgICAgICAgOiAnJyk7XG4gICAgICB9XG5cbiAgICAgIC8vIC0tIGdlbmVyYXRlIHNoYWRlciBjb2RlIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgIHNoYWRlci52ZXJ0ZXhTaGFkZXIgPSBkZWZpbmVzICsgc2hhZGVyLnZlcnRleFNoYWRlcjtcbiAgICAgIHNoYWRlci5mcmFnbWVudFNoYWRlciA9IGRlZmluZXMgKyBlbmNvZGluZ3MgKyBzaGFkZXIuZnJhZ21lbnRTaGFkZXI7XG5cbiAgICAgIC8vIC0tIGNvbXBhdCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgLy8gQ09NUEFUOiBwcmUtcjEzMlxuICAgICAgLy8gVGhyZWUuanMgcjEzMiBpbnRyb2R1Y2VzIG5ldyBzaGFkZXIgY2h1bmtzIDxub3JtYWxfcGFyc19mcmFnbWVudD4gYW5kIDxhbHBoYXRlc3RfcGFyc19mcmFnbWVudD5cbiAgICAgIGlmICh0aHJlZVJldmlzaW9uIDwgMTMyKSB7XG4gICAgICAgIHNoYWRlci5mcmFnbWVudFNoYWRlciA9IHNoYWRlci5mcmFnbWVudFNoYWRlci5yZXBsYWNlKCcjaW5jbHVkZSA8bm9ybWFsX3BhcnNfZnJhZ21lbnQ+JywgJycpO1xuICAgICAgICBzaGFkZXIuZnJhZ21lbnRTaGFkZXIgPSBzaGFkZXIuZnJhZ21lbnRTaGFkZXIucmVwbGFjZSgnI2luY2x1ZGUgPGFscGhhdGVzdF9wYXJzX2ZyYWdtZW50PicsICcnKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGlzIG1hdGVyaWFsLlxuICAgKlxuICAgKiBAcGFyYW0gZGVsdGEgZGVsdGFUaW1lIHNpbmNlIGxhc3QgdXBkYXRlXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl91cGxvYWRVbmlmb3Jtc1dvcmthcm91bmQoKTtcbiAgICB0aGlzLl91cGRhdGVVVkFuaW1hdGlvbihkZWx0YSk7XG4gIH1cblxuICBwdWJsaWMgY29weShzb3VyY2U6IHRoaXMpOiB0aGlzIHtcbiAgICBzdXBlci5jb3B5KHNvdXJjZSk7XG4gICAgLy8gdW5pZm9ybXMgYXJlIGFscmVhZHkgY29waWVkIGF0IHRoaXMgbW9tZW50XG5cbiAgICAvLyBCZWdpbm5pbmcgZnJvbSByMTMzLCB1bmlmb3JtIHRleHR1cmVzIHdpbGwgYmUgY2xvbmVkIGluc3RlYWQgb2YgcmVmZXJlbmNlXG4gICAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vbXJkb29iL3RocmVlLmpzL2Jsb2IvYTg4MTNiZTA0YTg0OWJkMTU1ZjdjZjZmMWIyM2Q4ZWUyZTBmYjQ4Yi9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyLmpzI0wzMDQ3XG4gICAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vbXJkb29iL3RocmVlLmpzL2Jsb2IvYTg4MTNiZTA0YTg0OWJkMTU1ZjdjZjZmMWIyM2Q4ZWUyZTBmYjQ4Yi9zcmMvcmVuZGVyZXJzL3NoYWRlcnMvVW5pZm9ybXNVdGlscy5qcyNMMjJcbiAgICAvLyBUaGlzIHdpbGwgbGVhdmUgdGhlaXIgYC52ZXJzaW9uYCB0byBiZSBgMGBcbiAgICAvLyBhbmQgdGhlc2UgdGV4dHVyZXMgd29uJ3QgYmUgdXBsb2FkZWQgdG8gR1BVXG4gICAgLy8gV2UgYXJlIGdvaW5nIHRvIHdvcmthcm91bmQgdGhpcyBpbiBoZXJlXG4gICAgLy8gSSd2ZSBvcGVuZWQgYW4gaXNzdWUgZm9yIHRoaXM6IGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvaXNzdWVzLzIyNzE4XG4gICAgdGhpcy5tYXAgPSBzb3VyY2UubWFwO1xuICAgIHRoaXMubm9ybWFsTWFwID0gc291cmNlLm5vcm1hbE1hcDtcbiAgICB0aGlzLmVtaXNzaXZlTWFwID0gc291cmNlLmVtaXNzaXZlTWFwO1xuICAgIHRoaXMuc2hhZGVNdWx0aXBseVRleHR1cmUgPSBzb3VyY2Uuc2hhZGVNdWx0aXBseVRleHR1cmU7XG4gICAgdGhpcy5zaGFkaW5nU2hpZnRUZXh0dXJlID0gc291cmNlLnNoYWRpbmdTaGlmdFRleHR1cmU7XG4gICAgdGhpcy5tYXRjYXBUZXh0dXJlID0gc291cmNlLm1hdGNhcFRleHR1cmU7XG4gICAgdGhpcy5yaW1NdWx0aXBseVRleHR1cmUgPSBzb3VyY2UucmltTXVsdGlwbHlUZXh0dXJlO1xuICAgIHRoaXMub3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlID0gc291cmNlLm91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZTtcbiAgICB0aGlzLnV2QW5pbWF0aW9uTWFza1RleHR1cmUgPSBzb3VyY2UudXZBbmltYXRpb25NYXNrVGV4dHVyZTtcblxuICAgIC8vID09IGNvcHkgbWVtYmVycyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHRoaXMubm9ybWFsTWFwVHlwZSA9IHNvdXJjZS5ub3JtYWxNYXBUeXBlO1xuXG4gICAgdGhpcy51dkFuaW1hdGlvblNjcm9sbFhTcGVlZEZhY3RvciA9IHNvdXJjZS51dkFuaW1hdGlvblNjcm9sbFhTcGVlZEZhY3RvcjtcbiAgICB0aGlzLnV2QW5pbWF0aW9uU2Nyb2xsWVNwZWVkRmFjdG9yID0gc291cmNlLnV2QW5pbWF0aW9uU2Nyb2xsWVNwZWVkRmFjdG9yO1xuICAgIHRoaXMudXZBbmltYXRpb25Sb3RhdGlvblNwZWVkRmFjdG9yID0gc291cmNlLnV2QW5pbWF0aW9uUm90YXRpb25TcGVlZEZhY3RvcjtcblxuICAgIHRoaXMuaWdub3JlVmVydGV4Q29sb3IgPSBzb3VyY2UuaWdub3JlVmVydGV4Q29sb3I7XG5cbiAgICB0aGlzLnYwQ29tcGF0U2hhZGUgPSBzb3VyY2UudjBDb21wYXRTaGFkZTtcbiAgICB0aGlzLmRlYnVnTW9kZSA9IHNvdXJjZS5kZWJ1Z01vZGU7XG4gICAgdGhpcy5vdXRsaW5lV2lkdGhNb2RlID0gc291cmNlLm91dGxpbmVXaWR0aE1vZGU7XG5cbiAgICB0aGlzLmlzT3V0bGluZSA9IHNvdXJjZS5pc091dGxpbmU7XG5cbiAgICAvLyA9PSB1cGRhdGUgc2hhZGVyIHN0dWZmID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICB0aGlzLm5lZWRzVXBkYXRlID0gdHJ1ZTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBVViBhbmltYXRpb24gc3RhdGUuXG4gICAqIEludGVuZGVkIHRvIGJlIGNhbGxlZCB2aWEge0BsaW5rIHVwZGF0ZX0uXG4gICAqIEBwYXJhbSBkZWx0YSBkZWx0YVRpbWVcbiAgICovXG4gIHByaXZhdGUgX3VwZGF0ZVVWQW5pbWF0aW9uKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnVuaWZvcm1zLnV2QW5pbWF0aW9uU2Nyb2xsWE9mZnNldC52YWx1ZSArPSBkZWx0YSAqIHRoaXMudXZBbmltYXRpb25TY3JvbGxYU3BlZWRGYWN0b3I7XG4gICAgdGhpcy51bmlmb3Jtcy51dkFuaW1hdGlvblNjcm9sbFlPZmZzZXQudmFsdWUgKz0gZGVsdGEgKiB0aGlzLnV2QW5pbWF0aW9uU2Nyb2xsWVNwZWVkRmFjdG9yO1xuICAgIHRoaXMudW5pZm9ybXMudXZBbmltYXRpb25Sb3RhdGlvblBoYXNlLnZhbHVlICs9IGRlbHRhICogdGhpcy51dkFuaW1hdGlvblJvdGF0aW9uU3BlZWRGYWN0b3I7XG5cbiAgICB0aGlzLnVuaWZvcm1zTmVlZFVwZGF0ZSA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogVXBsb2FkIHVuaWZvcm1zIHRoYXQgbmVlZCB0byB1cGxvYWQgYnV0IGRvZXNuJ3QgYXV0b21hdGljYWxseSBiZWNhdXNlIG9mIHJlYXNvbnMuXG4gICAqIEludGVuZGVkIHRvIGJlIGNhbGxlZCB2aWEge0BsaW5rIGNvbnN0cnVjdG9yfSBhbmQge0BsaW5rIHVwZGF0ZX0uXG4gICAqL1xuICBwcml2YXRlIF91cGxvYWRVbmlmb3Jtc1dvcmthcm91bmQoKTogdm9pZCB7XG4gICAgLy8gd29ya2Fyb3VuZDogc2luY2Ugb3BhY2l0eSBpcyBkZWZpbmVkIGFzIGEgcHJvcGVydHkgaW4gVEhSRUUuTWF0ZXJpYWxcbiAgICAvLyBhbmQgY2Fubm90IGJlIG92ZXJyaWRkZW4gYXMgYW4gYWNjZXNzb3IsXG4gICAgLy8gV2UgYXJlIGdvaW5nIHRvIHVwZGF0ZSBvcGFjaXR5IGhlcmVcbiAgICB0aGlzLnVuaWZvcm1zLm9wYWNpdHkudmFsdWUgPSB0aGlzLm9wYWNpdHk7XG5cbiAgICAvLyB3b3JrYXJvdW5kOiB0ZXh0dXJlIHRyYW5zZm9ybXMgYXJlIG5vdCB1cGRhdGVkIGF1dG9tYXRpY2FsbHlcbiAgICB0aGlzLl91cGRhdGVUZXh0dXJlTWF0cml4KHRoaXMudW5pZm9ybXMubWFwLCB0aGlzLnVuaWZvcm1zLm1hcFV2VHJhbnNmb3JtKTtcbiAgICB0aGlzLl91cGRhdGVUZXh0dXJlTWF0cml4KHRoaXMudW5pZm9ybXMubm9ybWFsTWFwLCB0aGlzLnVuaWZvcm1zLm5vcm1hbE1hcFV2VHJhbnNmb3JtKTtcbiAgICB0aGlzLl91cGRhdGVUZXh0dXJlTWF0cml4KHRoaXMudW5pZm9ybXMuZW1pc3NpdmVNYXAsIHRoaXMudW5pZm9ybXMuZW1pc3NpdmVNYXBVdlRyYW5zZm9ybSk7XG4gICAgdGhpcy5fdXBkYXRlVGV4dHVyZU1hdHJpeCh0aGlzLnVuaWZvcm1zLnNoYWRlTXVsdGlwbHlUZXh0dXJlLCB0aGlzLnVuaWZvcm1zLnNoYWRlTXVsdGlwbHlUZXh0dXJlVXZUcmFuc2Zvcm0pO1xuICAgIHRoaXMuX3VwZGF0ZVRleHR1cmVNYXRyaXgodGhpcy51bmlmb3Jtcy5zaGFkaW5nU2hpZnRUZXh0dXJlLCB0aGlzLnVuaWZvcm1zLnNoYWRpbmdTaGlmdFRleHR1cmVVdlRyYW5zZm9ybSk7XG4gICAgdGhpcy5fdXBkYXRlVGV4dHVyZU1hdHJpeCh0aGlzLnVuaWZvcm1zLm1hdGNhcFRleHR1cmUsIHRoaXMudW5pZm9ybXMubWF0Y2FwVGV4dHVyZVV2VHJhbnNmb3JtKTtcbiAgICB0aGlzLl91cGRhdGVUZXh0dXJlTWF0cml4KHRoaXMudW5pZm9ybXMucmltTXVsdGlwbHlUZXh0dXJlLCB0aGlzLnVuaWZvcm1zLnJpbU11bHRpcGx5VGV4dHVyZVV2VHJhbnNmb3JtKTtcbiAgICB0aGlzLl91cGRhdGVUZXh0dXJlTWF0cml4KFxuICAgICAgdGhpcy51bmlmb3Jtcy5vdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmUsXG4gICAgICB0aGlzLnVuaWZvcm1zLm91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZVV2VHJhbnNmb3JtLFxuICAgICk7XG4gICAgdGhpcy5fdXBkYXRlVGV4dHVyZU1hdHJpeCh0aGlzLnVuaWZvcm1zLnV2QW5pbWF0aW9uTWFza1RleHR1cmUsIHRoaXMudW5pZm9ybXMudXZBbmltYXRpb25NYXNrVGV4dHVyZVV2VHJhbnNmb3JtKTtcblxuICAgIC8vIENPTVBBVCB3b3JrYXJvdW5kOiBzdGFydGluZyBmcm9tIHIxMzIsIGFscGhhVGVzdCBiZWNvbWVzIGEgdW5pZm9ybSBpbnN0ZWFkIG9mIHByZXByb2Nlc3NvciB2YWx1ZVxuICAgIGNvbnN0IHRocmVlUmV2aXNpb24gPSBwYXJzZUludChUSFJFRS5SRVZJU0lPTiwgMTApO1xuXG4gICAgaWYgKHRocmVlUmV2aXNpb24gPj0gMTMyKSB7XG4gICAgICB0aGlzLnVuaWZvcm1zLmFscGhhVGVzdC52YWx1ZSA9IHRoaXMuYWxwaGFUZXN0O1xuICAgIH1cblxuICAgIHRoaXMudW5pZm9ybXNOZWVkVXBkYXRlID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgbWFwIG9iamVjdCBvZiBwcmVwcm9jZXNzb3IgdG9rZW4gYW5kIG1hY3JvIG9mIHRoZSBzaGFkZXIgcHJvZ3JhbS5cbiAgICovXG4gIHByaXZhdGUgX2dlbmVyYXRlRGVmaW5lcygpOiB7IFt0b2tlbjogc3RyaW5nXTogYm9vbGVhbiB8IG51bWJlciB8IHN0cmluZyB9IHtcbiAgICBjb25zdCB0aHJlZVJldmlzaW9uID0gcGFyc2VJbnQoVEhSRUUuUkVWSVNJT04sIDEwKTtcblxuICAgIGNvbnN0IHVzZVV2SW5WZXJ0ID0gdGhpcy5vdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmUgIT09IG51bGw7XG4gICAgY29uc3QgdXNlVXZJbkZyYWcgPVxuICAgICAgdGhpcy5tYXAgIT09IG51bGwgfHxcbiAgICAgIHRoaXMuZW1pc3NpdmVNYXAgIT09IG51bGwgfHxcbiAgICAgIHRoaXMuc2hhZGVNdWx0aXBseVRleHR1cmUgIT09IG51bGwgfHxcbiAgICAgIHRoaXMuc2hhZGluZ1NoaWZ0VGV4dHVyZSAhPT0gbnVsbCB8fFxuICAgICAgdGhpcy5yaW1NdWx0aXBseVRleHR1cmUgIT09IG51bGwgfHxcbiAgICAgIHRoaXMudXZBbmltYXRpb25NYXNrVGV4dHVyZSAhPT0gbnVsbDtcblxuICAgIHJldHVybiB7XG4gICAgICAvLyBUZW1wb3JhcnkgY29tcGF0IGFnYWluc3Qgc2hhZGVyIGNoYW5nZSBAIFRocmVlLmpzIHIxMjZcbiAgICAgIC8vIFNlZTogIzIxMjA1LCAjMjEzMDcsICMyMTI5OVxuICAgICAgVEhSRUVfVlJNX1RIUkVFX1JFVklTSU9OOiB0aHJlZVJldmlzaW9uLFxuXG4gICAgICBPVVRMSU5FOiB0aGlzLl9pc091dGxpbmUsXG4gICAgICBNVE9PTl9VU0VfVVY6IHVzZVV2SW5WZXJ0IHx8IHVzZVV2SW5GcmFnLCAvLyB3ZSBjYW4ndCB1c2UgYFVTRV9VVmAgLCBpdCB3aWxsIGJlIHJlZGVmaW5lZCBpbiBXZWJHTFByb2dyYW0uanNcbiAgICAgIE1UT09OX1VWU19WRVJURVhfT05MWTogdXNlVXZJblZlcnQgJiYgIXVzZVV2SW5GcmFnLFxuICAgICAgVjBfQ09NUEFUX1NIQURFOiB0aGlzLl92MENvbXBhdFNoYWRlLFxuICAgICAgVVNFX1NIQURFTVVMVElQTFlURVhUVVJFOiB0aGlzLnNoYWRlTXVsdGlwbHlUZXh0dXJlICE9PSBudWxsLFxuICAgICAgVVNFX1NIQURJTkdTSElGVFRFWFRVUkU6IHRoaXMuc2hhZGluZ1NoaWZ0VGV4dHVyZSAhPT0gbnVsbCxcbiAgICAgIFVTRV9NQVRDQVBURVhUVVJFOiB0aGlzLm1hdGNhcFRleHR1cmUgIT09IG51bGwsXG4gICAgICBVU0VfUklNTVVMVElQTFlURVhUVVJFOiB0aGlzLnJpbU11bHRpcGx5VGV4dHVyZSAhPT0gbnVsbCxcbiAgICAgIFVTRV9PVVRMSU5FV0lEVEhNVUxUSVBMWVRFWFRVUkU6IHRoaXMuX2lzT3V0bGluZSAmJiB0aGlzLm91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZSAhPT0gbnVsbCxcbiAgICAgIFVTRV9VVkFOSU1BVElPTk1BU0tURVhUVVJFOiB0aGlzLnV2QW5pbWF0aW9uTWFza1RleHR1cmUgIT09IG51bGwsXG4gICAgICBJR05PUkVfVkVSVEVYX0NPTE9SOiB0aGlzLl9pZ25vcmVWZXJ0ZXhDb2xvciA9PT0gdHJ1ZSxcbiAgICAgIERFQlVHX05PUk1BTDogdGhpcy5fZGVidWdNb2RlID09PSAnbm9ybWFsJyxcbiAgICAgIERFQlVHX0xJVFNIQURFUkFURTogdGhpcy5fZGVidWdNb2RlID09PSAnbGl0U2hhZGVSYXRlJyxcbiAgICAgIERFQlVHX1VWOiB0aGlzLl9kZWJ1Z01vZGUgPT09ICd1dicsXG4gICAgICBPVVRMSU5FX1dJRFRIX1dPUkxEOiB0aGlzLl9pc091dGxpbmUgJiYgdGhpcy5fb3V0bGluZVdpZHRoTW9kZSA9PT0gTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUuV29ybGRDb29yZGluYXRlcyxcbiAgICAgIE9VVExJTkVfV0lEVEhfU0NSRUVOOlxuICAgICAgICB0aGlzLl9pc091dGxpbmUgJiYgdGhpcy5fb3V0bGluZVdpZHRoTW9kZSA9PT0gTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUuU2NyZWVuQ29vcmRpbmF0ZXMsXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZVRleHR1cmVNYXRyaXgoc3JjOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5UZXh0dXJlIHwgbnVsbD4sIGRzdDogVEhSRUUuSVVuaWZvcm08VEhSRUUuTWF0cml4Mz4pOiB2b2lkIHtcbiAgICBpZiAoc3JjLnZhbHVlKSB7XG4gICAgICBpZiAoc3JjLnZhbHVlLm1hdHJpeEF1dG9VcGRhdGUpIHtcbiAgICAgICAgc3JjLnZhbHVlLnVwZGF0ZU1hdHJpeCgpO1xuICAgICAgfVxuXG4gICAgICBkc3QudmFsdWUuY29weShzcmMudmFsdWUubWF0cml4KTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IEdMVEZQYXJzZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyLmpzJztcbmltcG9ydCB7IE1Ub29uTWF0ZXJpYWxQYXJhbWV0ZXJzIH0gZnJvbSAnLi9NVG9vbk1hdGVyaWFsUGFyYW1ldGVycyc7XG5cbi8qKlxuICogTWF0ZXJpYWxQYXJhbWV0ZXJzIGhhdGVzIGB1bmRlZmluZWRgLiBUaGlzIGhlbHBlciBhdXRvbWF0aWNhbGx5IHJlamVjdHMgYXNzaWduIG9mIHRoZXNlIGB1bmRlZmluZWRgLlxuICogSXQgYWxzbyBoYW5kbGVzIGFzeW5jaHJvbm91cyBwcm9jZXNzIG9mIHRleHR1cmVzLlxuICogTWFrZSBzdXJlIGF3YWl0IGZvciB7QGxpbmsgR0xURk1Ub29uTWF0ZXJpYWxQYXJhbXNBc3NpZ25IZWxwZXIucGVuZGluZ30uXG4gKi9cbmV4cG9ydCBjbGFzcyBHTFRGTVRvb25NYXRlcmlhbFBhcmFtc0Fzc2lnbkhlbHBlciB7XG4gIHByaXZhdGUgcmVhZG9ubHkgX3BhcnNlcjogR0xURlBhcnNlcjtcbiAgcHJpdmF0ZSBfbWF0ZXJpYWxQYXJhbXM6IE1Ub29uTWF0ZXJpYWxQYXJhbWV0ZXJzO1xuICBwcml2YXRlIF9wZW5kaW5nczogUHJvbWlzZTxhbnk+W107XG5cbiAgcHVibGljIGdldCBwZW5kaW5nKCk6IFByb21pc2U8dW5rbm93bj4ge1xuICAgIHJldHVybiBQcm9taXNlLmFsbCh0aGlzLl9wZW5kaW5ncyk7XG4gIH1cblxuICBwdWJsaWMgY29uc3RydWN0b3IocGFyc2VyOiBHTFRGUGFyc2VyLCBtYXRlcmlhbFBhcmFtczogTVRvb25NYXRlcmlhbFBhcmFtZXRlcnMpIHtcbiAgICB0aGlzLl9wYXJzZXIgPSBwYXJzZXI7XG4gICAgdGhpcy5fbWF0ZXJpYWxQYXJhbXMgPSBtYXRlcmlhbFBhcmFtcztcbiAgICB0aGlzLl9wZW5kaW5ncyA9IFtdO1xuICB9XG5cbiAgcHVibGljIGFzc2lnblByaW1pdGl2ZTxUIGV4dGVuZHMga2V5b2YgTVRvb25NYXRlcmlhbFBhcmFtZXRlcnM+KGtleTogVCwgdmFsdWU6IE1Ub29uTWF0ZXJpYWxQYXJhbWV0ZXJzW1RdKTogdm9pZCB7XG4gICAgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX21hdGVyaWFsUGFyYW1zW2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXNzaWduQ29sb3I8VCBleHRlbmRzIGtleW9mIE1Ub29uTWF0ZXJpYWxQYXJhbWV0ZXJzPihcbiAgICBrZXk6IFQsXG4gICAgdmFsdWU6IG51bWJlcltdIHwgdW5kZWZpbmVkLFxuICAgIGNvbnZlcnRTUkdCVG9MaW5lYXI/OiBib29sZWFuLFxuICApOiB2b2lkIHtcbiAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fbWF0ZXJpYWxQYXJhbXNba2V5XSA9IG5ldyBUSFJFRS5Db2xvcigpLmZyb21BcnJheSh2YWx1ZSk7XG5cbiAgICAgIGlmIChjb252ZXJ0U1JHQlRvTGluZWFyKSB7XG4gICAgICAgIHRoaXMuX21hdGVyaWFsUGFyYW1zW2tleV0uY29udmVydFNSR0JUb0xpbmVhcigpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBhc3NpZ25UZXh0dXJlPFQgZXh0ZW5kcyBrZXlvZiBNVG9vbk1hdGVyaWFsUGFyYW1ldGVycz4oXG4gICAga2V5OiBULFxuICAgIHRleHR1cmU6IHsgaW5kZXg6IG51bWJlciB9IHwgdW5kZWZpbmVkLFxuICAgIGlzQ29sb3JUZXh0dXJlOiBib29sZWFuLFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBwcm9taXNlID0gKGFzeW5jICgpID0+IHtcbiAgICAgIGlmICh0ZXh0dXJlICE9IG51bGwpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5fcGFyc2VyLmFzc2lnblRleHR1cmUodGhpcy5fbWF0ZXJpYWxQYXJhbXMsIGtleSwgdGV4dHVyZSk7XG5cbiAgICAgICAgaWYgKGlzQ29sb3JUZXh0dXJlKSB7XG4gICAgICAgICAgdGhpcy5fbWF0ZXJpYWxQYXJhbXNba2V5XS5lbmNvZGluZyA9IFRIUkVFLnNSR0JFbmNvZGluZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pKCk7XG5cbiAgICB0aGlzLl9wZW5kaW5ncy5wdXNoKHByb21pc2UpO1xuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgYXNzaWduVGV4dHVyZUJ5SW5kZXg8VCBleHRlbmRzIGtleW9mIE1Ub29uTWF0ZXJpYWxQYXJhbWV0ZXJzPihcbiAgICBrZXk6IFQsXG4gICAgdGV4dHVyZUluZGV4OiBudW1iZXIgfCB1bmRlZmluZWQsXG4gICAgaXNDb2xvclRleHR1cmU6IGJvb2xlYW4sXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLmFzc2lnblRleHR1cmUoa2V5LCB0ZXh0dXJlSW5kZXggIT0gbnVsbCA/IHsgaW5kZXg6IHRleHR1cmVJbmRleCB9IDogdW5kZWZpbmVkLCBpc0NvbG9yVGV4dHVyZSk7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCAqIGFzIFYxTVRvb25TY2hlbWEgZnJvbSAnQHBpeGl2L3R5cGVzLXZybWMtbWF0ZXJpYWxzLW10b29uLTEuMCc7XG5pbXBvcnQgdHlwZSB7IEdMVEYsIEdMVEZMb2FkZXJQbHVnaW4sIEdMVEZQYXJzZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyLmpzJztcbmltcG9ydCB7IE1Ub29uTWF0ZXJpYWwgfSBmcm9tICcuL01Ub29uTWF0ZXJpYWwnO1xuaW1wb3J0IHR5cGUgeyBNVG9vbk1hdGVyaWFsUGFyYW1ldGVycyB9IGZyb20gJy4vTVRvb25NYXRlcmlhbFBhcmFtZXRlcnMnO1xuaW1wb3J0IHsgTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUgfSBmcm9tICcuL01Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlJztcbmltcG9ydCB7IEdMVEZNVG9vbk1hdGVyaWFsUGFyYW1zQXNzaWduSGVscGVyIH0gZnJvbSAnLi9HTFRGTVRvb25NYXRlcmlhbFBhcmFtc0Fzc2lnbkhlbHBlcic7XG5pbXBvcnQgeyBNVG9vbk1hdGVyaWFsTG9hZGVyUGx1Z2luT3B0aW9ucyB9IGZyb20gJy4vTVRvb25NYXRlcmlhbExvYWRlclBsdWdpbk9wdGlvbnMnO1xuaW1wb3J0IHR5cGUgeyBNVG9vbk1hdGVyaWFsRGVidWdNb2RlIH0gZnJvbSAnLi9NVG9vbk1hdGVyaWFsRGVidWdNb2RlJztcbmltcG9ydCB7IEdMVEYgYXMgR0xURlNjaGVtYSB9IGZyb20gJ0BnbHRmLXRyYW5zZm9ybS9jb3JlJztcblxuLyoqXG4gKiBQb3NzaWJsZSBzcGVjIHZlcnNpb25zIGl0IHJlY29nbml6ZXMuXG4gKi9cbmNvbnN0IFBPU1NJQkxFX1NQRUNfVkVSU0lPTlMgPSBuZXcgU2V0KFsnMS4wJywgJzEuMC1iZXRhJ10pO1xuXG5leHBvcnQgY2xhc3MgTVRvb25NYXRlcmlhbExvYWRlclBsdWdpbiBpbXBsZW1lbnRzIEdMVEZMb2FkZXJQbHVnaW4ge1xuICBwdWJsaWMgc3RhdGljIEVYVEVOU0lPTl9OQU1FID0gJ1ZSTUNfbWF0ZXJpYWxzX210b29uJztcblxuICAvKipcbiAgICogVGhpcyB2YWx1ZSB3aWxsIGJlIGFkZGVkIHRvIGByZW5kZXJPcmRlcmAgb2YgZXZlcnkgbWVzaGVzIHdobyBoYXZlIE1hdGVyaWFsc01Ub29uLlxuICAgKiBUaGUgZmluYWwgcmVuZGVyT3JkZXIgd2lsbCBiZSBzdW0gb2YgdGhpcyBgcmVuZGVyT3JkZXJPZmZzZXRgIGFuZCBgcmVuZGVyUXVldWVPZmZzZXROdW1iZXJgIGZvciBlYWNoIG1hdGVyaWFscy5cbiAgICogYDBgIGJ5IGRlZmF1bHQuXG4gICAqL1xuICBwdWJsaWMgcmVuZGVyT3JkZXJPZmZzZXQ6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlcmUgaXMgYSBsaW5lIG9mIHRoZSBzaGFkZXIgY2FsbGVkIFwiY29tbWVudCBvdXQgaWYgeW91IHdhbnQgdG8gUEJSIGFic29sdXRlbHlcIiBpbiBWUk0wLjAgTVRvb24uXG4gICAqIFdoZW4gdGhpcyBpcyB0cnVlLCB0aGUgbWF0ZXJpYWwgZW5hYmxlcyB0aGUgbGluZSB0byBtYWtlIGl0IGNvbXBhdGlibGUgd2l0aCB0aGUgbGVnYWN5IHJlbmRlcmluZyBvZiBWUk0uXG4gICAqIFVzdWFsbHkgbm90IHJlY29tbWVuZGVkIHRvIHR1cm4gdGhpcyBvbi5cbiAgICogYGZhbHNlYCBieSBkZWZhdWx0LlxuICAgKi9cbiAgcHVibGljIHYwQ29tcGF0U2hhZGU6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIERlYnVnIG1vZGUgZm9yIHRoZSBtYXRlcmlhbC5cbiAgICogWW91IGNhbiB2aXN1YWxpemUgc2V2ZXJhbCBjb21wb25lbnRzIGZvciBkaWFnbm9zaXMgdXNpbmcgZGVidWcgbW9kZS5cbiAgICpcbiAgICogU2VlOiB7QGxpbmsgTVRvb25NYXRlcmlhbERlYnVnTW9kZX1cbiAgICovXG4gIHB1YmxpYyBkZWJ1Z01vZGU6IE1Ub29uTWF0ZXJpYWxEZWJ1Z01vZGU7XG5cbiAgcHVibGljIHJlYWRvbmx5IHBhcnNlcjogR0xURlBhcnNlcjtcblxuICAvKipcbiAgICogTG9hZGVkIG1hdGVyaWFscyB3aWxsIGJlIHN0b3JlZCBpbiB0aGlzIHNldC5cbiAgICogV2lsbCBiZSB0cmFuc2ZlcnJlZCBpbnRvIGBnbHRmLnVzZXJEYXRhLnZybU1Ub29uTWF0ZXJpYWxzYCBpbiB7QGxpbmsgYWZ0ZXJSb290fS5cbiAgICovXG4gIHByaXZhdGUgcmVhZG9ubHkgX21Ub29uTWF0ZXJpYWxTZXQ6IFNldDxNVG9vbk1hdGVyaWFsPjtcblxuICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gTVRvb25NYXRlcmlhbExvYWRlclBsdWdpbi5FWFRFTlNJT05fTkFNRTtcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJzZXI6IEdMVEZQYXJzZXIsIG9wdGlvbnM6IE1Ub29uTWF0ZXJpYWxMb2FkZXJQbHVnaW5PcHRpb25zID0ge30pIHtcbiAgICB0aGlzLnBhcnNlciA9IHBhcnNlcjtcblxuICAgIHRoaXMucmVuZGVyT3JkZXJPZmZzZXQgPSBvcHRpb25zLnJlbmRlck9yZGVyT2Zmc2V0ID8/IDA7XG4gICAgdGhpcy52MENvbXBhdFNoYWRlID0gb3B0aW9ucy52MENvbXBhdFNoYWRlID8/IGZhbHNlO1xuICAgIHRoaXMuZGVidWdNb2RlID0gb3B0aW9ucy5kZWJ1Z01vZGUgPz8gJ25vbmUnO1xuXG4gICAgdGhpcy5fbVRvb25NYXRlcmlhbFNldCA9IG5ldyBTZXQoKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBiZWZvcmVSb290KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMuX3JlbW92ZVVubGl0RXh0ZW5zaW9uSWZNVG9vbkV4aXN0cygpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGFmdGVyUm9vdChnbHRmOiBHTFRGKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgZ2x0Zi51c2VyRGF0YS52cm1NVG9vbk1hdGVyaWFscyA9IEFycmF5LmZyb20odGhpcy5fbVRvb25NYXRlcmlhbFNldCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0TWF0ZXJpYWxUeXBlKG1hdGVyaWFsSW5kZXg6IG51bWJlcik6IHR5cGVvZiBUSFJFRS5NYXRlcmlhbCB8IG51bGwge1xuICAgIGNvbnN0IHYxRXh0ZW5zaW9uID0gdGhpcy5fZ2V0TVRvb25FeHRlbnNpb24obWF0ZXJpYWxJbmRleCk7XG4gICAgaWYgKHYxRXh0ZW5zaW9uKSB7XG4gICAgICByZXR1cm4gTVRvb25NYXRlcmlhbDtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBleHRlbmRNYXRlcmlhbFBhcmFtcyhtYXRlcmlhbEluZGV4OiBudW1iZXIsIG1hdGVyaWFsUGFyYW1zOiBNVG9vbk1hdGVyaWFsUGFyYW1ldGVycyk6IFByb21pc2U8YW55PiB8IG51bGwge1xuICAgIGNvbnN0IGV4dGVuc2lvbiA9IHRoaXMuX2dldE1Ub29uRXh0ZW5zaW9uKG1hdGVyaWFsSW5kZXgpO1xuICAgIGlmIChleHRlbnNpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLl9leHRlbmRNYXRlcmlhbFBhcmFtcyhleHRlbnNpb24sIG1hdGVyaWFsUGFyYW1zKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBsb2FkTWVzaChtZXNoSW5kZXg6IG51bWJlcik6IFByb21pc2U8VEhSRUUuR3JvdXAgfCBUSFJFRS5NZXNoIHwgVEhSRUUuU2tpbm5lZE1lc2g+IHtcbiAgICBjb25zdCBwYXJzZXIgPSB0aGlzLnBhcnNlcjtcbiAgICBjb25zdCBqc29uID0gcGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAgIGNvbnN0IG1lc2hEZWYgPSBqc29uLm1lc2hlcz8uW21lc2hJbmRleF07XG5cbiAgICBpZiAobWVzaERlZiA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBNVG9vbk1hdGVyaWFsTG9hZGVyUGx1Z2luOiBBdHRlbXB0IHRvIHVzZSBtZXNoZXNbJHttZXNoSW5kZXh9XSBvZiBnbFRGIGJ1dCB0aGUgbWVzaCBkb2Vzbid0IGV4aXN0YCxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgcHJpbWl0aXZlc0RlZiA9IG1lc2hEZWYucHJpbWl0aXZlcztcblxuICAgIGNvbnN0IG1lc2hPckdyb3VwID0gYXdhaXQgcGFyc2VyLmxvYWRNZXNoKG1lc2hJbmRleCk7XG5cbiAgICBpZiAocHJpbWl0aXZlc0RlZi5sZW5ndGggPT09IDEpIHtcbiAgICAgIGNvbnN0IG1lc2ggPSBtZXNoT3JHcm91cCBhcyBUSFJFRS5NZXNoO1xuICAgICAgY29uc3QgbWF0ZXJpYWxJbmRleCA9IHByaW1pdGl2ZXNEZWZbMF0ubWF0ZXJpYWw7XG5cbiAgICAgIGlmIChtYXRlcmlhbEluZGV4ICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5fc2V0dXBQcmltaXRpdmUobWVzaCwgbWF0ZXJpYWxJbmRleCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGdyb3VwID0gbWVzaE9yR3JvdXAgYXMgVEhSRUUuR3JvdXA7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByaW1pdGl2ZXNEZWYubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgbWVzaCA9IGdyb3VwLmNoaWxkcmVuW2ldIGFzIFRIUkVFLk1lc2g7XG4gICAgICAgIGNvbnN0IG1hdGVyaWFsSW5kZXggPSBwcmltaXRpdmVzRGVmW2ldLm1hdGVyaWFsO1xuXG4gICAgICAgIGlmIChtYXRlcmlhbEluZGV4ICE9IG51bGwpIHtcbiAgICAgICAgICB0aGlzLl9zZXR1cFByaW1pdGl2ZShtZXNoLCBtYXRlcmlhbEluZGV4KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBtZXNoT3JHcm91cDtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgdXNlIG9mIGBLSFJfbWF0ZXJpYWxzX3VubGl0YCBmcm9tIGl0cyBgbWF0ZXJpYWxzYCBpZiB0aGUgbWF0ZXJpYWwgaXMgdXNpbmcgTVRvb24uXG4gICAqXG4gICAqIFNpbmNlIEdMVEZMb2FkZXIgaGF2ZSBzbyBtYW55IGhhcmRjb2RlZCBwcm9jZWR1cmUgcmVsYXRlZCB0byBgS0hSX21hdGVyaWFsc191bmxpdGBcbiAgICogd2UgaGF2ZSB0byBkZWxldGUgdGhlIGV4dGVuc2lvbiBiZWZvcmUgd2Ugc3RhcnQgdG8gcGFyc2UgdGhlIGdsVEYuXG4gICAqL1xuICBwcml2YXRlIF9yZW1vdmVVbmxpdEV4dGVuc2lvbklmTVRvb25FeGlzdHMoKTogdm9pZCB7XG4gICAgY29uc3QgcGFyc2VyID0gdGhpcy5wYXJzZXI7XG4gICAgY29uc3QganNvbiA9IHBhcnNlci5qc29uIGFzIEdMVEZTY2hlbWEuSUdMVEY7XG5cbiAgICBjb25zdCBtYXRlcmlhbERlZnMgPSBqc29uLm1hdGVyaWFscztcbiAgICBtYXRlcmlhbERlZnM/Lm1hcCgobWF0ZXJpYWxEZWYsIGlNYXRlcmlhbCkgPT4ge1xuICAgICAgY29uc3QgZXh0ZW5zaW9uID0gdGhpcy5fZ2V0TVRvb25FeHRlbnNpb24oaU1hdGVyaWFsKTtcblxuICAgICAgaWYgKGV4dGVuc2lvbiAmJiBtYXRlcmlhbERlZi5leHRlbnNpb25zPy5bJ0tIUl9tYXRlcmlhbHNfdW5saXQnXSkge1xuICAgICAgICBkZWxldGUgbWF0ZXJpYWxEZWYuZXh0ZW5zaW9uc1snS0hSX21hdGVyaWFsc191bmxpdCddO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0TVRvb25FeHRlbnNpb24obWF0ZXJpYWxJbmRleDogbnVtYmVyKTogVjFNVG9vblNjaGVtYS5WUk1DTWF0ZXJpYWxzTVRvb24gfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IHBhcnNlciA9IHRoaXMucGFyc2VyO1xuICAgIGNvbnN0IGpzb24gPSBwYXJzZXIuanNvbiBhcyBHTFRGU2NoZW1hLklHTFRGO1xuXG4gICAgY29uc3QgbWF0ZXJpYWxEZWYgPSBqc29uLm1hdGVyaWFscz8uW21hdGVyaWFsSW5kZXhdO1xuXG4gICAgaWYgKG1hdGVyaWFsRGVmID09IG51bGwpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgYE1Ub29uTWF0ZXJpYWxMb2FkZXJQbHVnaW46IEF0dGVtcHQgdG8gdXNlIG1hdGVyaWFsc1ske21hdGVyaWFsSW5kZXh9XSBvZiBnbFRGIGJ1dCB0aGUgbWF0ZXJpYWwgZG9lc24ndCBleGlzdGAsXG4gICAgICApO1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBjb25zdCBleHRlbnNpb24gPSBtYXRlcmlhbERlZi5leHRlbnNpb25zPy5bTVRvb25NYXRlcmlhbExvYWRlclBsdWdpbi5FWFRFTlNJT05fTkFNRV0gYXNcbiAgICAgIHwgVjFNVG9vblNjaGVtYS5WUk1DTWF0ZXJpYWxzTVRvb25cbiAgICAgIHwgdW5kZWZpbmVkO1xuICAgIGlmIChleHRlbnNpb24gPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBjb25zdCBzcGVjVmVyc2lvbiA9IGV4dGVuc2lvbi5zcGVjVmVyc2lvbjtcbiAgICBpZiAoIVBPU1NJQkxFX1NQRUNfVkVSU0lPTlMuaGFzKHNwZWNWZXJzaW9uKSkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBgTVRvb25NYXRlcmlhbExvYWRlclBsdWdpbjogVW5rbm93biAke01Ub29uTWF0ZXJpYWxMb2FkZXJQbHVnaW4uRVhURU5TSU9OX05BTUV9IHNwZWNWZXJzaW9uIFwiJHtzcGVjVmVyc2lvbn1cImAsXG4gICAgICApO1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICByZXR1cm4gZXh0ZW5zaW9uO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfZXh0ZW5kTWF0ZXJpYWxQYXJhbXMoXG4gICAgZXh0ZW5zaW9uOiBWMU1Ub29uU2NoZW1hLlZSTUNNYXRlcmlhbHNNVG9vbixcbiAgICBtYXRlcmlhbFBhcmFtczogTVRvb25NYXRlcmlhbFBhcmFtZXRlcnMsXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIC8vIFJlbW92aW5nIG1hdGVyaWFsIHBhcmFtcyB0aGF0IGlzIG5vdCByZXF1aXJlZCB0byBzdXByZXNzIHdhcm5pbmdzLlxuICAgIGRlbGV0ZSAobWF0ZXJpYWxQYXJhbXMgYXMgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWxQYXJhbWV0ZXJzKS5tZXRhbG5lc3M7XG4gICAgZGVsZXRlIChtYXRlcmlhbFBhcmFtcyBhcyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbFBhcmFtZXRlcnMpLnJvdWdobmVzcztcblxuICAgIGNvbnN0IGFzc2lnbkhlbHBlciA9IG5ldyBHTFRGTVRvb25NYXRlcmlhbFBhcmFtc0Fzc2lnbkhlbHBlcih0aGlzLnBhcnNlciwgbWF0ZXJpYWxQYXJhbXMpO1xuXG4gICAgYXNzaWduSGVscGVyLmFzc2lnblByaW1pdGl2ZSgndHJhbnNwYXJlbnRXaXRoWldyaXRlJywgZXh0ZW5zaW9uLnRyYW5zcGFyZW50V2l0aFpXcml0ZSk7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnbkNvbG9yKCdzaGFkZUNvbG9yRmFjdG9yJywgZXh0ZW5zaW9uLnNoYWRlQ29sb3JGYWN0b3IpO1xuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25UZXh0dXJlKCdzaGFkZU11bHRpcGx5VGV4dHVyZScsIGV4dGVuc2lvbi5zaGFkZU11bHRpcGx5VGV4dHVyZSwgdHJ1ZSk7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnblByaW1pdGl2ZSgnc2hhZGluZ1NoaWZ0RmFjdG9yJywgZXh0ZW5zaW9uLnNoYWRpbmdTaGlmdEZhY3Rvcik7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnblRleHR1cmUoJ3NoYWRpbmdTaGlmdFRleHR1cmUnLCBleHRlbnNpb24uc2hhZGluZ1NoaWZ0VGV4dHVyZSwgdHJ1ZSk7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnblByaW1pdGl2ZSgnc2hhZGluZ1NoaWZ0VGV4dHVyZVNjYWxlJywgZXh0ZW5zaW9uLnNoYWRpbmdTaGlmdFRleHR1cmU/LnNjYWxlKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduUHJpbWl0aXZlKCdzaGFkaW5nVG9vbnlGYWN0b3InLCBleHRlbnNpb24uc2hhZGluZ1Rvb255RmFjdG9yKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduUHJpbWl0aXZlKCdnaUVxdWFsaXphdGlvbkZhY3RvcicsIGV4dGVuc2lvbi5naUVxdWFsaXphdGlvbkZhY3Rvcik7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnbkNvbG9yKCdtYXRjYXBGYWN0b3InLCBleHRlbnNpb24ubWF0Y2FwRmFjdG9yKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduVGV4dHVyZSgnbWF0Y2FwVGV4dHVyZScsIGV4dGVuc2lvbi5tYXRjYXBUZXh0dXJlLCB0cnVlKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduQ29sb3IoJ3BhcmFtZXRyaWNSaW1Db2xvckZhY3RvcicsIGV4dGVuc2lvbi5wYXJhbWV0cmljUmltQ29sb3JGYWN0b3IpO1xuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25UZXh0dXJlKCdyaW1NdWx0aXBseVRleHR1cmUnLCBleHRlbnNpb24ucmltTXVsdGlwbHlUZXh0dXJlLCB0cnVlKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduUHJpbWl0aXZlKCdyaW1MaWdodGluZ01peEZhY3RvcicsIGV4dGVuc2lvbi5yaW1MaWdodGluZ01peEZhY3Rvcik7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnblByaW1pdGl2ZSgncGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlckZhY3RvcicsIGV4dGVuc2lvbi5wYXJhbWV0cmljUmltRnJlc25lbFBvd2VyRmFjdG9yKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduUHJpbWl0aXZlKCdwYXJhbWV0cmljUmltTGlmdEZhY3RvcicsIGV4dGVuc2lvbi5wYXJhbWV0cmljUmltTGlmdEZhY3Rvcik7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnblByaW1pdGl2ZSgnb3V0bGluZVdpZHRoTW9kZScsIGV4dGVuc2lvbi5vdXRsaW5lV2lkdGhNb2RlIGFzIE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduUHJpbWl0aXZlKCdvdXRsaW5lV2lkdGhGYWN0b3InLCBleHRlbnNpb24ub3V0bGluZVdpZHRoRmFjdG9yKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduVGV4dHVyZSgnb3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlJywgZXh0ZW5zaW9uLm91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZSwgZmFsc2UpO1xuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25Db2xvcignb3V0bGluZUNvbG9yRmFjdG9yJywgZXh0ZW5zaW9uLm91dGxpbmVDb2xvckZhY3Rvcik7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnblByaW1pdGl2ZSgnb3V0bGluZUxpZ2h0aW5nTWl4RmFjdG9yJywgZXh0ZW5zaW9uLm91dGxpbmVMaWdodGluZ01peEZhY3Rvcik7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnblRleHR1cmUoJ3V2QW5pbWF0aW9uTWFza1RleHR1cmUnLCBleHRlbnNpb24udXZBbmltYXRpb25NYXNrVGV4dHVyZSwgZmFsc2UpO1xuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25QcmltaXRpdmUoJ3V2QW5pbWF0aW9uU2Nyb2xsWFNwZWVkRmFjdG9yJywgZXh0ZW5zaW9uLnV2QW5pbWF0aW9uU2Nyb2xsWFNwZWVkRmFjdG9yKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduUHJpbWl0aXZlKCd1dkFuaW1hdGlvblNjcm9sbFlTcGVlZEZhY3RvcicsIGV4dGVuc2lvbi51dkFuaW1hdGlvblNjcm9sbFlTcGVlZEZhY3Rvcik7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnblByaW1pdGl2ZSgndXZBbmltYXRpb25Sb3RhdGlvblNwZWVkRmFjdG9yJywgZXh0ZW5zaW9uLnV2QW5pbWF0aW9uUm90YXRpb25TcGVlZEZhY3Rvcik7XG5cbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduUHJpbWl0aXZlKCd2MENvbXBhdFNoYWRlJywgdGhpcy52MENvbXBhdFNoYWRlKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduUHJpbWl0aXZlKCdkZWJ1Z01vZGUnLCB0aGlzLmRlYnVnTW9kZSk7XG5cbiAgICBhd2FpdCBhc3NpZ25IZWxwZXIucGVuZGluZztcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIHdpbGwgZG8gdHdvIHByb2Nlc3NlcyB0aGF0IGlzIHJlcXVpcmVkIHRvIHJlbmRlciBNVG9vbiBwcm9wZXJseS5cbiAgICpcbiAgICogLSBTZXQgcmVuZGVyIG9yZGVyXG4gICAqIC0gR2VuZXJhdGUgb3V0bGluZVxuICAgKlxuICAgKiBAcGFyYW0gbWVzaCBBIHRhcmdldCBHTFRGIHByaW1pdGl2ZVxuICAgKiBAcGFyYW0gbWF0ZXJpYWxJbmRleCBUaGUgbWF0ZXJpYWwgaW5kZXggb2YgdGhlIHByaW1pdGl2ZVxuICAgKi9cbiAgcHJpdmF0ZSBfc2V0dXBQcmltaXRpdmUobWVzaDogVEhSRUUuTWVzaCwgbWF0ZXJpYWxJbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgZXh0ZW5zaW9uID0gdGhpcy5fZ2V0TVRvb25FeHRlbnNpb24obWF0ZXJpYWxJbmRleCk7XG4gICAgaWYgKGV4dGVuc2lvbikge1xuICAgICAgY29uc3QgcmVuZGVyT3JkZXIgPSB0aGlzLl9wYXJzZVJlbmRlck9yZGVyKGV4dGVuc2lvbik7XG4gICAgICBtZXNoLnJlbmRlck9yZGVyID0gcmVuZGVyT3JkZXIgKyB0aGlzLnJlbmRlck9yZGVyT2Zmc2V0O1xuXG4gICAgICB0aGlzLl9nZW5lcmF0ZU91dGxpbmUobWVzaCk7XG5cbiAgICAgIHRoaXMuX2FkZFRvTWF0ZXJpYWxTZXQobWVzaCk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGUgb3V0bGluZSBmb3IgdGhlIGdpdmVuIG1lc2gsIGlmIGl0IG5lZWRzLlxuICAgKlxuICAgKiBAcGFyYW0gbWVzaCBUaGUgdGFyZ2V0IG1lc2hcbiAgICovXG4gIHByaXZhdGUgX2dlbmVyYXRlT3V0bGluZShtZXNoOiBUSFJFRS5NZXNoKTogdm9pZCB7XG4gICAgLy8gT0ssIGl0J3MgdGhlIGhhY2t5IHBhcnQuXG4gICAgLy8gV2UgYXJlIGdvaW5nIHRvIGR1cGxpY2F0ZSB0aGUgTVRvb25NYXRlcmlhbCBmb3Igb3V0bGluZSB1c2UuXG4gICAgLy8gVGhlbiB3ZSBhcmUgZ29pbmcgdG8gY3JlYXRlIHR3byBnZW9tZXRyeSBncm91cHMgYW5kIHJlZmVyIHNhbWUgYnVmZmVyIGJ1dCBkaWZmZXJlbnQgbWF0ZXJpYWwuXG4gICAgLy8gSXQncyBob3cgd2UgZHJhdyB0d28gbWF0ZXJpYWxzIGF0IG9uY2UgdXNpbmcgYSBzaW5nbGUgbWVzaC5cblxuICAgIC8vIG1ha2Ugc3VyZSB0aGUgbWF0ZXJpYWwgaXMgbXRvb25cbiAgICBjb25zdCBzdXJmYWNlTWF0ZXJpYWwgPSBtZXNoLm1hdGVyaWFsO1xuICAgIGlmICghKHN1cmZhY2VNYXRlcmlhbCBpbnN0YW5jZW9mIE1Ub29uTWF0ZXJpYWwpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gY2hlY2sgd2hldGhlciB3ZSByZWFsbHkgaGF2ZSB0byBwcmVwYXJlIG91dGxpbmUgb3Igbm90XG4gICAgaWYgKHN1cmZhY2VNYXRlcmlhbC5vdXRsaW5lV2lkdGhNb2RlID09PSAnbm9uZScgfHwgc3VyZmFjZU1hdGVyaWFsLm91dGxpbmVXaWR0aEZhY3RvciA8PSAwLjApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBtYWtlIGl0cyBtYXRlcmlhbCBhbiBhcnJheVxuICAgIG1lc2gubWF0ZXJpYWwgPSBbc3VyZmFjZU1hdGVyaWFsXTsgLy8gbWVzaC5tYXRlcmlhbCBpcyBndWFyYW50ZWVkIHRvIGJlIGEgTWF0ZXJpYWwgaW4gR0xURkxvYWRlclxuXG4gICAgLy8gZHVwbGljYXRlIHRoZSBtYXRlcmlhbCBmb3Igb3V0bGluZSB1c2VcbiAgICBjb25zdCBvdXRsaW5lTWF0ZXJpYWwgPSBzdXJmYWNlTWF0ZXJpYWwuY2xvbmUoKSBhcyBNVG9vbk1hdGVyaWFsO1xuICAgIG91dGxpbmVNYXRlcmlhbC5uYW1lICs9ICcgKE91dGxpbmUpJztcbiAgICBvdXRsaW5lTWF0ZXJpYWwuaXNPdXRsaW5lID0gdHJ1ZTtcbiAgICBvdXRsaW5lTWF0ZXJpYWwuc2lkZSA9IFRIUkVFLkJhY2tTaWRlO1xuICAgIG1lc2gubWF0ZXJpYWwucHVzaChvdXRsaW5lTWF0ZXJpYWwpO1xuXG4gICAgLy8gbWFrZSB0d28gZ2VvbWV0cnkgZ3JvdXBzIG91dCBvZiBhIHNhbWUgYnVmZmVyXG4gICAgY29uc3QgZ2VvbWV0cnkgPSBtZXNoLmdlb21ldHJ5OyAvLyBtZXNoLmdlb21ldHJ5IGlzIGd1YXJhbnRlZWQgdG8gYmUgYSBCdWZmZXJHZW9tZXRyeSBpbiBHTFRGTG9hZGVyXG4gICAgY29uc3QgcHJpbWl0aXZlVmVydGljZXMgPSBnZW9tZXRyeS5pbmRleCA/IGdlb21ldHJ5LmluZGV4LmNvdW50IDogZ2VvbWV0cnkuYXR0cmlidXRlcy5wb3NpdGlvbi5jb3VudCAvIDM7XG4gICAgZ2VvbWV0cnkuYWRkR3JvdXAoMCwgcHJpbWl0aXZlVmVydGljZXMsIDApO1xuICAgIGdlb21ldHJ5LmFkZEdyb3VwKDAsIHByaW1pdGl2ZVZlcnRpY2VzLCAxKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFRvTWF0ZXJpYWxTZXQobWVzaDogVEhSRUUuTWVzaCk6IHZvaWQge1xuICAgIGNvbnN0IG1hdGVyaWFsT3JNYXRlcmlhbHMgPSBtZXNoLm1hdGVyaWFsO1xuICAgIGNvbnN0IG1hdGVyaWFsU2V0ID0gbmV3IFNldDxUSFJFRS5NYXRlcmlhbD4oKTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KG1hdGVyaWFsT3JNYXRlcmlhbHMpKSB7XG4gICAgICBtYXRlcmlhbE9yTWF0ZXJpYWxzLmZvckVhY2goKG1hdGVyaWFsKSA9PiBtYXRlcmlhbFNldC5hZGQobWF0ZXJpYWwpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWF0ZXJpYWxTZXQuYWRkKG1hdGVyaWFsT3JNYXRlcmlhbHMpO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgbWF0ZXJpYWwgb2YgbWF0ZXJpYWxTZXQpIHtcbiAgICAgIGlmIChtYXRlcmlhbCBpbnN0YW5jZW9mIE1Ub29uTWF0ZXJpYWwpIHtcbiAgICAgICAgdGhpcy5fbVRvb25NYXRlcmlhbFNldC5hZGQobWF0ZXJpYWwpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlUmVuZGVyT3JkZXIoZXh0ZW5zaW9uOiBWMU1Ub29uU2NoZW1hLlZSTUNNYXRlcmlhbHNNVG9vbik6IG51bWJlciB7XG4gICAgLy8gdHJhbnNwYXJlbnRXaXRoWldyaXRlIHJhbmdlcyBmcm9tIDAgdG8gKzlcbiAgICAvLyBtZXJlIHRyYW5zcGFyZW50IHJhbmdlcyBmcm9tIC05IHRvIDBcbiAgICBjb25zdCBlbmFibGVkWldyaXRlID0gZXh0ZW5zaW9uLnRyYW5zcGFyZW50V2l0aFpXcml0ZTtcbiAgICByZXR1cm4gKGVuYWJsZWRaV3JpdGUgPyAwIDogMTkpICsgKGV4dGVuc2lvbi5yZW5kZXJRdWV1ZU9mZnNldE51bWJlciA/PyAwKTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBb0dBO0FBQ08sU0FBUyxTQUFTLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFO0FBQzdELElBQUksU0FBUyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsT0FBTyxLQUFLLFlBQVksQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxVQUFVLE9BQU8sRUFBRSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENB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
