/*!
 * @pixiv/three-vrm-materials-mtoon v1.0.0-beta.7
 * MToon (toon material) module for @pixiv/three-vrm
 *
 * Copyright (c) 2020-2021 pixiv Inc.
 * @pixiv/three-vrm-materials-mtoon is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
import * as THREE from 'three';

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
        case THREE.LinearEncoding:
            return ['Linear', '( value )'];
        case THREE.sRGBEncoding:
            return ['sRGB', '( value )'];
        case THREE.RGBEEncoding:
            return ['RGBE', '( value )'];
        case THREE.RGBM7Encoding:
            return ['RGBM', '( value, 7.0 )'];
        case THREE.RGBM16Encoding:
            return ['RGBM', '( value, 16.0 )'];
        case THREE.RGBDEncoding:
            return ['RGBD', '( value, 256.0 )'];
        case THREE.GammaEncoding:
            return ['Gamma', '( value, float( GAMMA_FACTOR ) )'];
        case THREE.LogLuvEncoding:
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
        // COMPAT
        // See: https://github.com/mrdoob/three.js/pull/21788
        if (parseInt(THREE.REVISION, 10) < 129) {
            parameters.skinning = parameters.skinning || false;
        }
        // COMPAT
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
                matcapFactor: { value: new THREE.Color(1.0, 1.0, 1.0) },
                matcapTexture: { value: null },
                matcapTextureUvTransform: { value: new THREE.Matrix3() },
                parametricRimColorFactor: { value: new THREE.Color(0.0, 0.0, 0.0) },
                rimMultiplyTexture: { value: null },
                rimMultiplyTextureUvTransform: { value: new THREE.Matrix3() },
                rimLightingMixFactor: { value: 0.0 },
                parametricRimFresnelPowerFactor: { value: 1.0 },
                parametricRimLiftFactor: { value: 0.0 },
                emissive: { value: new THREE.Color(0.0, 0.0, 0.0) },
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
            const threeRevision = parseInt(THREE.REVISION, 10);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyZWUtdnJtLW1hdGVyaWFscy1tdG9vbi5tb2R1bGUuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCIuLi9zcmMvdXRpbHMvZ2V0RW5jb2RpbmdDb21wb25lbnRzLnRzIiwiLi4vc3JjL3V0aWxzL2dldFRleGVsRGVjb2RpbmdGdW5jdGlvbi50cyIsIi4uL3NyYy9NVG9vbk1hdGVyaWFsRGVidWdNb2RlLnRzIiwiLi4vc3JjL01Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlLnRzIiwiLi4vc3JjL3V0aWxzL2dldFRleHR1cmVFbmNvZGluZ0Zyb21NYXAudHMiLCIuLi9zcmMvTVRvb25NYXRlcmlhbC50cyIsIi4uL3NyYy9HTFRGTVRvb25NYXRlcmlhbFBhcmFtc0Fzc2lnbkhlbHBlci50cyIsIi4uL3NyYy9NVG9vbk1hdGVyaWFsTG9hZGVyUGx1Z2luLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XHJcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgb1trMl0gPSBtW2tdO1xyXG59KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgbykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKSkgX19jcmVhdGVCaW5kaW5nKG8sIG0sIHApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5KHRvLCBmcm9tKSB7XHJcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBmcm9tLmxlbmd0aCwgaiA9IHRvLmxlbmd0aDsgaSA8IGlsOyBpKyssIGorKylcclxuICAgICAgICB0b1tqXSA9IGZyb21baV07XHJcbiAgICByZXR1cm4gdG87XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcclxufSkgOiBmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcclxuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHByaXZhdGVNYXApIHtcclxuICAgIGlmICghcHJpdmF0ZU1hcC5oYXMocmVjZWl2ZXIpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImF0dGVtcHRlZCB0byBnZXQgcHJpdmF0ZSBmaWVsZCBvbiBub24taW5zdGFuY2VcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcHJpdmF0ZU1hcC5nZXQocmVjZWl2ZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgcHJpdmF0ZU1hcCwgdmFsdWUpIHtcclxuICAgIGlmICghcHJpdmF0ZU1hcC5oYXMocmVjZWl2ZXIpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImF0dGVtcHRlZCB0byBzZXQgcHJpdmF0ZSBmaWVsZCBvbiBub24taW5zdGFuY2VcIik7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlTWFwLnNldChyZWNlaXZlciwgdmFsdWUpO1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59XHJcbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuZXhwb3J0IGNvbnN0IGdldEVuY29kaW5nQ29tcG9uZW50cyA9IChlbmNvZGluZzogVEhSRUUuVGV4dHVyZUVuY29kaW5nKTogW3N0cmluZywgc3RyaW5nXSA9PiB7XG4gIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICBjYXNlIFRIUkVFLkxpbmVhckVuY29kaW5nOlxuICAgICAgcmV0dXJuIFsnTGluZWFyJywgJyggdmFsdWUgKSddO1xuICAgIGNhc2UgVEhSRUUuc1JHQkVuY29kaW5nOlxuICAgICAgcmV0dXJuIFsnc1JHQicsICcoIHZhbHVlICknXTtcbiAgICBjYXNlIFRIUkVFLlJHQkVFbmNvZGluZzpcbiAgICAgIHJldHVybiBbJ1JHQkUnLCAnKCB2YWx1ZSApJ107XG4gICAgY2FzZSBUSFJFRS5SR0JNN0VuY29kaW5nOlxuICAgICAgcmV0dXJuIFsnUkdCTScsICcoIHZhbHVlLCA3LjAgKSddO1xuICAgIGNhc2UgVEhSRUUuUkdCTTE2RW5jb2Rpbmc6XG4gICAgICByZXR1cm4gWydSR0JNJywgJyggdmFsdWUsIDE2LjAgKSddO1xuICAgIGNhc2UgVEhSRUUuUkdCREVuY29kaW5nOlxuICAgICAgcmV0dXJuIFsnUkdCRCcsICcoIHZhbHVlLCAyNTYuMCApJ107XG4gICAgY2FzZSBUSFJFRS5HYW1tYUVuY29kaW5nOlxuICAgICAgcmV0dXJuIFsnR2FtbWEnLCAnKCB2YWx1ZSwgZmxvYXQoIEdBTU1BX0ZBQ1RPUiApICknXTtcbiAgICBjYXNlIFRIUkVFLkxvZ0x1dkVuY29kaW5nOlxuICAgICAgcmV0dXJuIFsnTG9nTHV2JywgJyggdmFsdWUgKSddO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Vuc3VwcG9ydGVkIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpO1xuICB9XG59O1xuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgZ2V0RW5jb2RpbmdDb21wb25lbnRzIH0gZnJvbSAnLi9nZXRFbmNvZGluZ0NvbXBvbmVudHMnO1xuXG5leHBvcnQgY29uc3QgZ2V0VGV4ZWxEZWNvZGluZ0Z1bmN0aW9uID0gKGZ1bmN0aW9uTmFtZTogc3RyaW5nLCBlbmNvZGluZzogVEhSRUUuVGV4dHVyZUVuY29kaW5nKTogc3RyaW5nID0+IHtcbiAgY29uc3QgY29tcG9uZW50cyA9IGdldEVuY29kaW5nQ29tcG9uZW50cyhlbmNvZGluZyk7XG4gIHJldHVybiAndmVjNCAnICsgZnVuY3Rpb25OYW1lICsgJyggdmVjNCB2YWx1ZSApIHsgcmV0dXJuICcgKyBjb21wb25lbnRzWzBdICsgJ1RvTGluZWFyJyArIGNvbXBvbmVudHNbMV0gKyAnOyB9Jztcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cblxuLyoqXG4gKiBTcGVjaWZpZXJzIG9mIGRlYnVnIG1vZGUgb2Yge0BsaW5rIE1Ub29uTWF0ZXJpYWx9LlxuICpcbiAqIFNlZToge0BsaW5rIE1Ub29uTWF0ZXJpYWwuZGVidWdNb2RlfVxuICovXG5leHBvcnQgY29uc3QgTVRvb25NYXRlcmlhbERlYnVnTW9kZSA9IHtcbiAgLyoqXG4gICAqIFJlbmRlciBub3JtYWxseS5cbiAgICovXG4gIE5vbmU6ICdub25lJyxcblxuICAvKipcbiAgICogVmlzdWFsaXplIG5vcm1hbHMgb2YgdGhlIHN1cmZhY2UuXG4gICAqL1xuICBOb3JtYWw6ICdub3JtYWwnLFxuXG4gIC8qKlxuICAgKiBWaXN1YWxpemUgbGl0L3NoYWRlIG9mIHRoZSBzdXJmYWNlLlxuICAgKi9cbiAgTGl0U2hhZGVSYXRlOiAnbGl0U2hhZGVSYXRlJyxcblxuICAvKipcbiAgICogVmlzdWFsaXplIFVWIG9mIHRoZSBzdXJmYWNlLlxuICAgKi9cbiAgVVY6ICd1dicsXG59IGFzIGNvbnN0O1xuXG5leHBvcnQgdHlwZSBNVG9vbk1hdGVyaWFsRGVidWdNb2RlID0gdHlwZW9mIE1Ub29uTWF0ZXJpYWxEZWJ1Z01vZGVba2V5b2YgdHlwZW9mIE1Ub29uTWF0ZXJpYWxEZWJ1Z01vZGVdO1xuIiwiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uICovXG5cbmV4cG9ydCBjb25zdCBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZSA9IHtcbiAgTm9uZTogJ25vbmUnLFxuICBXb3JsZENvb3JkaW5hdGVzOiAnd29ybGRDb29yZGluYXRlcycsXG4gIFNjcmVlbkNvb3JkaW5hdGVzOiAnc2NyZWVuQ29vcmRpbmF0ZXMnLFxufSBhcyBjb25zdDtcblxuZXhwb3J0IHR5cGUgTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUgPSB0eXBlb2YgTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGVba2V5b2YgdHlwZW9mIE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlXTtcbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBSZXRyaWV2ZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vbXJkb29iL3RocmVlLmpzL2Jsb2IvODhiNjMyODk5OGQxNTVmYTBhN2MxZjFlNWUzYmQ2YmZmNzUyNjhjMC9zcmMvcmVuZGVyZXJzL3dlYmdsL1dlYkdMUHJvZ3JhbXMuanMjTDkyXG4gKlxuICogRGlmZjpcbiAqICAgLSBSZW1vdmUgV2ViR0xSZW5kZXJUYXJnZXQgaGFuZGxlciBiZWNhdXNlIGl0IGluY3JlYXNlcyBjb2RlIGNvbXBsZXhpdGllcyBvbiBUeXBlU2NyaXB0XG4gKiAgIC0gQWRkIGEgYm9vbGVhbiBgaXNXZWJHTDJgIGFzIGEgc2Vjb25kIGFyZ3VtZW50LlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGV4dHVyZUVuY29kaW5nRnJvbU1hcChtYXA6IFRIUkVFLlRleHR1cmUsIGlzV2ViR0wyOiBib29sZWFuKTogVEhSRUUuVGV4dHVyZUVuY29kaW5nIHtcbiAgbGV0IGVuY29kaW5nO1xuXG4gIGlmIChtYXAgJiYgbWFwLmlzVGV4dHVyZSkge1xuICAgIGVuY29kaW5nID0gbWFwLmVuY29kaW5nO1xuICAgIC8vIH0gZWxzZSBpZiAoIG1hcCAmJiBtYXAuaXNXZWJHTFJlbmRlclRhcmdldCApIHtcbiAgICAvLyAgIGNvbnNvbGUud2FybiggJ1RIUkVFLldlYkdMUHJvZ3JhbXMuZ2V0VGV4dHVyZUVuY29kaW5nRnJvbU1hcDogZG9uXFwndCB1c2UgcmVuZGVyIHRhcmdldHMgYXMgdGV4dHVyZXMuIFVzZSB0aGVpciAudGV4dHVyZSBwcm9wZXJ0eSBpbnN0ZWFkLicgKTtcbiAgICAvLyAgIGVuY29kaW5nID0gbWFwLnRleHR1cmUuZW5jb2Rpbmc7XG4gIH0gZWxzZSB7XG4gICAgZW5jb2RpbmcgPSBUSFJFRS5MaW5lYXJFbmNvZGluZztcbiAgfVxuXG4gIGlmIChwYXJzZUludChUSFJFRS5SRVZJU0lPTiwgMTApID49IDEzMykge1xuICAgIGlmIChcbiAgICAgIGlzV2ViR0wyICYmXG4gICAgICBtYXAgJiZcbiAgICAgIG1hcC5pc1RleHR1cmUgJiZcbiAgICAgIG1hcC5mb3JtYXQgPT09IFRIUkVFLlJHQkFGb3JtYXQgJiZcbiAgICAgIG1hcC50eXBlID09PSBUSFJFRS5VbnNpZ25lZEJ5dGVUeXBlICYmXG4gICAgICBtYXAuZW5jb2RpbmcgPT09IFRIUkVFLnNSR0JFbmNvZGluZ1xuICAgICkge1xuICAgICAgZW5jb2RpbmcgPSBUSFJFRS5MaW5lYXJFbmNvZGluZzsgLy8gZGlzYWJsZSBpbmxpbmUgZGVjb2RlIGZvciBzUkdCIHRleHR1cmVzIGluIFdlYkdMIDJcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZW5jb2Rpbmc7XG59XG4iLCIvKiB0c2xpbnQ6ZGlzYWJsZTptZW1iZXItb3JkZXJpbmcgKi9cblxuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgZ2V0VGV4ZWxEZWNvZGluZ0Z1bmN0aW9uIH0gZnJvbSAnLi91dGlscy9nZXRUZXhlbERlY29kaW5nRnVuY3Rpb24nO1xuaW1wb3J0IHZlcnRleFNoYWRlciBmcm9tICcuL3NoYWRlcnMvbXRvb24udmVydCc7XG5pbXBvcnQgZnJhZ21lbnRTaGFkZXIgZnJvbSAnLi9zaGFkZXJzL210b29uLmZyYWcnO1xuaW1wb3J0IHsgTVRvb25NYXRlcmlhbERlYnVnTW9kZSB9IGZyb20gJy4vTVRvb25NYXRlcmlhbERlYnVnTW9kZSc7XG5pbXBvcnQgeyBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZSB9IGZyb20gJy4vTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUnO1xuaW1wb3J0IHR5cGUgeyBNVG9vbk1hdGVyaWFsUGFyYW1ldGVycyB9IGZyb20gJy4vTVRvb25NYXRlcmlhbFBhcmFtZXRlcnMnO1xuaW1wb3J0IHsgZ2V0VGV4dHVyZUVuY29kaW5nRnJvbU1hcCB9IGZyb20gJy4vdXRpbHMvZ2V0VGV4dHVyZUVuY29kaW5nRnJvbU1hcCc7XG5cbi8qKlxuICogTVRvb24gaXMgYSBtYXRlcmlhbCBzcGVjaWZpY2F0aW9uIHRoYXQgaGFzIHZhcmlvdXMgZmVhdHVyZXMuXG4gKiBUaGUgc3BlYyBhbmQgaW1wbGVtZW50YXRpb24gYXJlIG9yaWdpbmFsbHkgZm91bmRlZCBmb3IgVW5pdHkgZW5naW5lIGFuZCB0aGlzIGlzIGEgcG9ydCBvZiB0aGUgbWF0ZXJpYWwuXG4gKlxuICogU2VlOiBodHRwczovL2dpdGh1Yi5jb20vU2FudGFyaC9NVG9vblxuICovXG5leHBvcnQgY2xhc3MgTVRvb25NYXRlcmlhbCBleHRlbmRzIFRIUkVFLlNoYWRlck1hdGVyaWFsIHtcbiAgcHVibGljIHVuaWZvcm1zOiB7XG4gICAgbGl0RmFjdG9yOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5Db2xvcj47XG4gICAgYWxwaGFUZXN0OiBUSFJFRS5JVW5pZm9ybTxudW1iZXI+O1xuICAgIG9wYWNpdHk6IFRIUkVFLklVbmlmb3JtPG51bWJlcj47XG4gICAgbWFwOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5UZXh0dXJlIHwgbnVsbD47XG4gICAgbWFwVXZUcmFuc2Zvcm06IFRIUkVFLklVbmlmb3JtPFRIUkVFLk1hdHJpeDM+O1xuICAgIG5vcm1hbE1hcDogVEhSRUUuSVVuaWZvcm08VEhSRUUuVGV4dHVyZSB8IG51bGw+O1xuICAgIG5vcm1hbE1hcFV2VHJhbnNmb3JtOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5NYXRyaXgzPjtcbiAgICBub3JtYWxTY2FsZTogVEhSRUUuSVVuaWZvcm08VEhSRUUuVmVjdG9yMj47XG4gICAgZW1pc3NpdmU6IFRIUkVFLklVbmlmb3JtPFRIUkVFLkNvbG9yPjtcbiAgICBlbWlzc2l2ZU1hcDogVEhSRUUuSVVuaWZvcm08VEhSRUUuVGV4dHVyZSB8IG51bGw+O1xuICAgIGVtaXNzaXZlTWFwVXZUcmFuc2Zvcm06IFRIUkVFLklVbmlmb3JtPFRIUkVFLk1hdHJpeDM+O1xuICAgIHNoYWRlQ29sb3JGYWN0b3I6IFRIUkVFLklVbmlmb3JtPFRIUkVFLkNvbG9yPjtcbiAgICBzaGFkZU11bHRpcGx5VGV4dHVyZTogVEhSRUUuSVVuaWZvcm08VEhSRUUuVGV4dHVyZSB8IG51bGw+O1xuICAgIHNoYWRlTXVsdGlwbHlUZXh0dXJlVXZUcmFuc2Zvcm06IFRIUkVFLklVbmlmb3JtPFRIUkVFLk1hdHJpeDM+O1xuICAgIHNoYWRpbmdTaGlmdEZhY3RvcjogVEhSRUUuSVVuaWZvcm08bnVtYmVyPjtcbiAgICBzaGFkaW5nU2hpZnRUZXh0dXJlOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5UZXh0dXJlIHwgbnVsbD47XG4gICAgc2hhZGluZ1NoaWZ0VGV4dHVyZVV2VHJhbnNmb3JtOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5NYXRyaXgzPjtcbiAgICBzaGFkaW5nU2hpZnRUZXh0dXJlU2NhbGU6IFRIUkVFLklVbmlmb3JtPG51bWJlcj47XG4gICAgc2hhZGluZ1Rvb255RmFjdG9yOiBUSFJFRS5JVW5pZm9ybTxudW1iZXI+O1xuICAgIGdpRXF1YWxpemF0aW9uRmFjdG9yOiBUSFJFRS5JVW5pZm9ybTxudW1iZXI+O1xuICAgIG1hdGNhcEZhY3RvcjogVEhSRUUuSVVuaWZvcm08VEhSRUUuQ29sb3I+O1xuICAgIG1hdGNhcFRleHR1cmU6IFRIUkVFLklVbmlmb3JtPFRIUkVFLlRleHR1cmUgfCBudWxsPjtcbiAgICBtYXRjYXBUZXh0dXJlVXZUcmFuc2Zvcm06IFRIUkVFLklVbmlmb3JtPFRIUkVFLk1hdHJpeDM+O1xuICAgIHBhcmFtZXRyaWNSaW1Db2xvckZhY3RvcjogVEhSRUUuSVVuaWZvcm08VEhSRUUuQ29sb3I+O1xuICAgIHJpbU11bHRpcGx5VGV4dHVyZTogVEhSRUUuSVVuaWZvcm08VEhSRUUuVGV4dHVyZSB8IG51bGw+O1xuICAgIHJpbU11bHRpcGx5VGV4dHVyZVV2VHJhbnNmb3JtOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5NYXRyaXgzPjtcbiAgICByaW1MaWdodGluZ01peEZhY3RvcjogVEhSRUUuSVVuaWZvcm08bnVtYmVyPjtcbiAgICBwYXJhbWV0cmljUmltRnJlc25lbFBvd2VyRmFjdG9yOiBUSFJFRS5JVW5pZm9ybTxudW1iZXI+O1xuICAgIHBhcmFtZXRyaWNSaW1MaWZ0RmFjdG9yOiBUSFJFRS5JVW5pZm9ybTxudW1iZXI+O1xuICAgIG91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZTogVEhSRUUuSVVuaWZvcm08VEhSRUUuVGV4dHVyZSB8IG51bGw+O1xuICAgIG91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZVV2VHJhbnNmb3JtOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5NYXRyaXgzPjtcbiAgICBvdXRsaW5lV2lkdGhGYWN0b3I6IFRIUkVFLklVbmlmb3JtPG51bWJlcj47XG4gICAgb3V0bGluZUNvbG9yRmFjdG9yOiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5Db2xvcj47XG4gICAgb3V0bGluZUxpZ2h0aW5nTWl4RmFjdG9yOiBUSFJFRS5JVW5pZm9ybTxudW1iZXI+O1xuICAgIHV2QW5pbWF0aW9uTWFza1RleHR1cmU6IFRIUkVFLklVbmlmb3JtPFRIUkVFLlRleHR1cmUgfCBudWxsPjtcbiAgICB1dkFuaW1hdGlvbk1hc2tUZXh0dXJlVXZUcmFuc2Zvcm06IFRIUkVFLklVbmlmb3JtPFRIUkVFLk1hdHJpeDM+O1xuICAgIHV2QW5pbWF0aW9uU2Nyb2xsWE9mZnNldDogVEhSRUUuSVVuaWZvcm08bnVtYmVyPjtcbiAgICB1dkFuaW1hdGlvblNjcm9sbFlPZmZzZXQ6IFRIUkVFLklVbmlmb3JtPG51bWJlcj47XG4gICAgdXZBbmltYXRpb25Sb3RhdGlvblBoYXNlOiBUSFJFRS5JVW5pZm9ybTxudW1iZXI+O1xuICB9O1xuXG4gIHB1YmxpYyBnZXQgY29sb3IoKTogVEhSRUUuQ29sb3Ige1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLmxpdEZhY3Rvci52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IGNvbG9yKHZhbHVlOiBUSFJFRS5Db2xvcikge1xuICAgIHRoaXMudW5pZm9ybXMubGl0RmFjdG9yLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG1hcCgpOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMubWFwLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgbWFwKHZhbHVlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCkge1xuICAgIHRoaXMudW5pZm9ybXMubWFwLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG5vcm1hbE1hcCgpOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMubm9ybWFsTWFwLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgbm9ybWFsTWFwKHZhbHVlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCkge1xuICAgIHRoaXMudW5pZm9ybXMubm9ybWFsTWFwLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG5vcm1hbFNjYWxlKCk6IFRIUkVFLlZlY3RvcjIge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLm5vcm1hbFNjYWxlLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgbm9ybWFsU2NhbGUodmFsdWU6IFRIUkVFLlZlY3RvcjIpIHtcbiAgICB0aGlzLnVuaWZvcm1zLm5vcm1hbFNjYWxlLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGVtaXNzaXZlKCk6IFRIUkVFLkNvbG9yIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5lbWlzc2l2ZS52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IGVtaXNzaXZlKHZhbHVlOiBUSFJFRS5Db2xvcikge1xuICAgIHRoaXMudW5pZm9ybXMuZW1pc3NpdmUudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgZW1pc3NpdmVNYXAoKTogVEhSRUUuVGV4dHVyZSB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLmVtaXNzaXZlTWFwLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgZW1pc3NpdmVNYXAodmFsdWU6IFRIUkVFLlRleHR1cmUgfCBudWxsKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5lbWlzc2l2ZU1hcC52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBzaGFkZUNvbG9yRmFjdG9yKCk6IFRIUkVFLkNvbG9yIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5zaGFkZUNvbG9yRmFjdG9yLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgc2hhZGVDb2xvckZhY3Rvcih2YWx1ZTogVEhSRUUuQ29sb3IpIHtcbiAgICB0aGlzLnVuaWZvcm1zLnNoYWRlQ29sb3JGYWN0b3IudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc2hhZGVNdWx0aXBseVRleHR1cmUoKTogVEhSRUUuVGV4dHVyZSB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLnNoYWRlTXVsdGlwbHlUZXh0dXJlLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgc2hhZGVNdWx0aXBseVRleHR1cmUodmFsdWU6IFRIUkVFLlRleHR1cmUgfCBudWxsKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5zaGFkZU11bHRpcGx5VGV4dHVyZS52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBzaGFkaW5nU2hpZnRGYWN0b3IoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5zaGFkaW5nU2hpZnRGYWN0b3IudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCBzaGFkaW5nU2hpZnRGYWN0b3IodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMudW5pZm9ybXMuc2hhZGluZ1NoaWZ0RmFjdG9yLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHNoYWRpbmdTaGlmdFRleHR1cmUoKTogVEhSRUUuVGV4dHVyZSB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLnNoYWRpbmdTaGlmdFRleHR1cmUudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCBzaGFkaW5nU2hpZnRUZXh0dXJlKHZhbHVlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCkge1xuICAgIHRoaXMudW5pZm9ybXMuc2hhZGluZ1NoaWZ0VGV4dHVyZS52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBzaGFkaW5nU2hpZnRUZXh0dXJlU2NhbGUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5zaGFkaW5nU2hpZnRUZXh0dXJlU2NhbGUudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCBzaGFkaW5nU2hpZnRUZXh0dXJlU2NhbGUodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMudW5pZm9ybXMuc2hhZGluZ1NoaWZ0VGV4dHVyZVNjYWxlLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHNoYWRpbmdUb29ueUZhY3RvcigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLnNoYWRpbmdUb29ueUZhY3Rvci52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IHNoYWRpbmdUb29ueUZhY3Rvcih2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5zaGFkaW5nVG9vbnlGYWN0b3IudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgZ2lFcXVhbGl6YXRpb25GYWN0b3IoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5naUVxdWFsaXphdGlvbkZhY3Rvci52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IGdpRXF1YWxpemF0aW9uRmFjdG9yKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLnVuaWZvcm1zLmdpRXF1YWxpemF0aW9uRmFjdG9yLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG1hdGNhcEZhY3RvcigpOiBUSFJFRS5Db2xvciB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMubWF0Y2FwRmFjdG9yLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgbWF0Y2FwRmFjdG9yKHZhbHVlOiBUSFJFRS5Db2xvcikge1xuICAgIHRoaXMudW5pZm9ybXMubWF0Y2FwRmFjdG9yLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG1hdGNhcFRleHR1cmUoKTogVEhSRUUuVGV4dHVyZSB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLm1hdGNhcFRleHR1cmUudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCBtYXRjYXBUZXh0dXJlKHZhbHVlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCkge1xuICAgIHRoaXMudW5pZm9ybXMubWF0Y2FwVGV4dHVyZS52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBwYXJhbWV0cmljUmltQ29sb3JGYWN0b3IoKTogVEhSRUUuQ29sb3Ige1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLnBhcmFtZXRyaWNSaW1Db2xvckZhY3Rvci52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IHBhcmFtZXRyaWNSaW1Db2xvckZhY3Rvcih2YWx1ZTogVEhSRUUuQ29sb3IpIHtcbiAgICB0aGlzLnVuaWZvcm1zLnBhcmFtZXRyaWNSaW1Db2xvckZhY3Rvci52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCByaW1NdWx0aXBseVRleHR1cmUoKTogVEhSRUUuVGV4dHVyZSB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLnJpbU11bHRpcGx5VGV4dHVyZS52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IHJpbU11bHRpcGx5VGV4dHVyZSh2YWx1ZTogVEhSRUUuVGV4dHVyZSB8IG51bGwpIHtcbiAgICB0aGlzLnVuaWZvcm1zLnJpbU11bHRpcGx5VGV4dHVyZS52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCByaW1MaWdodGluZ01peEZhY3RvcigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLnJpbUxpZ2h0aW5nTWl4RmFjdG9yLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgcmltTGlnaHRpbmdNaXhGYWN0b3IodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMudW5pZm9ybXMucmltTGlnaHRpbmdNaXhGYWN0b3IudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlckZhY3RvcigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLnBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJGYWN0b3IudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCBwYXJhbWV0cmljUmltRnJlc25lbFBvd2VyRmFjdG9yKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLnVuaWZvcm1zLnBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJGYWN0b3IudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcGFyYW1ldHJpY1JpbUxpZnRGYWN0b3IoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5wYXJhbWV0cmljUmltTGlmdEZhY3Rvci52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IHBhcmFtZXRyaWNSaW1MaWZ0RmFjdG9yKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLnVuaWZvcm1zLnBhcmFtZXRyaWNSaW1MaWZ0RmFjdG9yLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZSgpOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMub3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgb3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlKHZhbHVlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCkge1xuICAgIHRoaXMudW5pZm9ybXMub3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG91dGxpbmVXaWR0aEZhY3RvcigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLm91dGxpbmVXaWR0aEZhY3Rvci52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IG91dGxpbmVXaWR0aEZhY3Rvcih2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5vdXRsaW5lV2lkdGhGYWN0b3IudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgb3V0bGluZUNvbG9yRmFjdG9yKCk6IFRIUkVFLkNvbG9yIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy5vdXRsaW5lQ29sb3JGYWN0b3IudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCBvdXRsaW5lQ29sb3JGYWN0b3IodmFsdWU6IFRIUkVFLkNvbG9yKSB7XG4gICAgdGhpcy51bmlmb3Jtcy5vdXRsaW5lQ29sb3JGYWN0b3IudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgb3V0bGluZUxpZ2h0aW5nTWl4RmFjdG9yKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMub3V0bGluZUxpZ2h0aW5nTWl4RmFjdG9yLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgb3V0bGluZUxpZ2h0aW5nTWl4RmFjdG9yKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLnVuaWZvcm1zLm91dGxpbmVMaWdodGluZ01peEZhY3Rvci52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCB1dkFuaW1hdGlvbk1hc2tUZXh0dXJlKCk6IFRIUkVFLlRleHR1cmUgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy51dkFuaW1hdGlvbk1hc2tUZXh0dXJlLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgdXZBbmltYXRpb25NYXNrVGV4dHVyZSh2YWx1ZTogVEhSRUUuVGV4dHVyZSB8IG51bGwpIHtcbiAgICB0aGlzLnVuaWZvcm1zLnV2QW5pbWF0aW9uTWFza1RleHR1cmUudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdXZBbmltYXRpb25TY3JvbGxYT2Zmc2V0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMudW5pZm9ybXMudXZBbmltYXRpb25TY3JvbGxYT2Zmc2V0LnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgdXZBbmltYXRpb25TY3JvbGxYT2Zmc2V0KHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLnVuaWZvcm1zLnV2QW5pbWF0aW9uU2Nyb2xsWE9mZnNldC52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCB1dkFuaW1hdGlvblNjcm9sbFlPZmZzZXQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3Jtcy51dkFuaW1hdGlvblNjcm9sbFlPZmZzZXQudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCB1dkFuaW1hdGlvblNjcm9sbFlPZmZzZXQodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMudW5pZm9ybXMudXZBbmltYXRpb25TY3JvbGxZT2Zmc2V0LnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHV2QW5pbWF0aW9uUm90YXRpb25QaGFzZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLnV2QW5pbWF0aW9uUm90YXRpb25QaGFzZS52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IHV2QW5pbWF0aW9uUm90YXRpb25QaGFzZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy51bmlmb3Jtcy51dkFuaW1hdGlvblJvdGF0aW9uUGhhc2UudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyB1dkFuaW1hdGlvblNjcm9sbFhTcGVlZEZhY3RvciA9IDAuMDtcbiAgcHVibGljIHV2QW5pbWF0aW9uU2Nyb2xsWVNwZWVkRmFjdG9yID0gMC4wO1xuICBwdWJsaWMgdXZBbmltYXRpb25Sb3RhdGlvblNwZWVkRmFjdG9yID0gMC4wO1xuXG4gIC8qKlxuICAgKiBXaWxsIGJlIHJlYWQgaW4gV2ViR0xQcm9ncmFtc1xuICAgKlxuICAgKiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvYmxvYi80ZjUyMzZhYzNkNmY0MWQ5MDRhYTU4NDAxYjQwNTU0ZThmYmRjYjE1L3NyYy9yZW5kZXJlcnMvd2ViZ2wvV2ViR0xQcm9ncmFtcy5qcyNMMTkwLUwxOTFcbiAgICovXG4gIHB1YmxpYyBub3JtYWxNYXBUeXBlID0gVEhSRUUuVGFuZ2VudFNwYWNlTm9ybWFsTWFwO1xuXG4gIC8qKlxuICAgKiBXaGVuIHRoaXMgaXMgYHRydWVgLCB2ZXJ0ZXggY29sb3JzIHdpbGwgYmUgaWdub3JlZC5cbiAgICogYHRydWVgIGJ5IGRlZmF1bHQuXG4gICAqL1xuICBwcml2YXRlIF9pZ25vcmVWZXJ0ZXhDb2xvciA9IHRydWU7XG5cbiAgLyoqXG4gICAqIFdoZW4gdGhpcyBpcyBgdHJ1ZWAsIHZlcnRleCBjb2xvcnMgd2lsbCBiZSBpZ25vcmVkLlxuICAgKiBgdHJ1ZWAgYnkgZGVmYXVsdC5cbiAgICovXG4gIHB1YmxpYyBnZXQgaWdub3JlVmVydGV4Q29sb3IoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2lnbm9yZVZlcnRleENvbG9yO1xuICB9XG4gIHB1YmxpYyBzZXQgaWdub3JlVmVydGV4Q29sb3IodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9pZ25vcmVWZXJ0ZXhDb2xvciA9IHZhbHVlO1xuXG4gICAgdGhpcy5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIF92MENvbXBhdFNoYWRlID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFRoZXJlIGlzIGEgbGluZSBvZiB0aGUgc2hhZGVyIGNhbGxlZCBcImNvbW1lbnQgb3V0IGlmIHlvdSB3YW50IHRvIFBCUiBhYnNvbHV0ZWx5XCIgaW4gVlJNMC4wIE1Ub29uLlxuICAgKiBXaGVuIHRoaXMgaXMgdHJ1ZSwgdGhlIG1hdGVyaWFsIGVuYWJsZXMgdGhlIGxpbmUgdG8gbWFrZSBpdCBjb21wYXRpYmxlIHdpdGggdGhlIGxlZ2FjeSByZW5kZXJpbmcgb2YgVlJNLlxuICAgKiBVc3VhbGx5IG5vdCByZWNvbW1lbmRlZCB0byB0dXJuIHRoaXMgb24uXG4gICAqIGBmYWxzZWAgYnkgZGVmYXVsdC5cbiAgICovXG4gIGdldCB2MENvbXBhdFNoYWRlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl92MENvbXBhdFNoYWRlO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZXJlIGlzIGEgbGluZSBvZiB0aGUgc2hhZGVyIGNhbGxlZCBcImNvbW1lbnQgb3V0IGlmIHlvdSB3YW50IHRvIFBCUiBhYnNvbHV0ZWx5XCIgaW4gVlJNMC4wIE1Ub29uLlxuICAgKiBXaGVuIHRoaXMgaXMgdHJ1ZSwgdGhlIG1hdGVyaWFsIGVuYWJsZXMgdGhlIGxpbmUgdG8gbWFrZSBpdCBjb21wYXRpYmxlIHdpdGggdGhlIGxlZ2FjeSByZW5kZXJpbmcgb2YgVlJNLlxuICAgKiBVc3VhbGx5IG5vdCByZWNvbW1lbmRlZCB0byB0dXJuIHRoaXMgb24uXG4gICAqIGBmYWxzZWAgYnkgZGVmYXVsdC5cbiAgICovXG4gIHNldCB2MENvbXBhdFNoYWRlKHY6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl92MENvbXBhdFNoYWRlID0gdjtcblxuICAgIHRoaXMubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfZGVidWdNb2RlOiBNVG9vbk1hdGVyaWFsRGVidWdNb2RlID0gTVRvb25NYXRlcmlhbERlYnVnTW9kZS5Ob25lO1xuXG4gIC8qKlxuICAgKiBEZWJ1ZyBtb2RlIGZvciB0aGUgbWF0ZXJpYWwuXG4gICAqIFlvdSBjYW4gdmlzdWFsaXplIHNldmVyYWwgY29tcG9uZW50cyBmb3IgZGlhZ25vc2lzIHVzaW5nIGRlYnVnIG1vZGUuXG4gICAqXG4gICAqIFNlZToge0BsaW5rIE1Ub29uTWF0ZXJpYWxEZWJ1Z01vZGV9XG4gICAqL1xuICBnZXQgZGVidWdNb2RlKCk6IE1Ub29uTWF0ZXJpYWxEZWJ1Z01vZGUge1xuICAgIHJldHVybiB0aGlzLl9kZWJ1Z01vZGU7XG4gIH1cblxuICAvKipcbiAgICogRGVidWcgbW9kZSBmb3IgdGhlIG1hdGVyaWFsLlxuICAgKiBZb3UgY2FuIHZpc3VhbGl6ZSBzZXZlcmFsIGNvbXBvbmVudHMgZm9yIGRpYWdub3NpcyB1c2luZyBkZWJ1ZyBtb2RlLlxuICAgKlxuICAgKiBTZWU6IHtAbGluayBNVG9vbk1hdGVyaWFsRGVidWdNb2RlfVxuICAgKi9cbiAgc2V0IGRlYnVnTW9kZShtOiBNVG9vbk1hdGVyaWFsRGVidWdNb2RlKSB7XG4gICAgdGhpcy5fZGVidWdNb2RlID0gbTtcblxuICAgIHRoaXMubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfb3V0bGluZVdpZHRoTW9kZTogTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUgPSBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZS5Ob25lO1xuXG4gIGdldCBvdXRsaW5lV2lkdGhNb2RlKCk6IE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlIHtcbiAgICByZXR1cm4gdGhpcy5fb3V0bGluZVdpZHRoTW9kZTtcbiAgfVxuICBzZXQgb3V0bGluZVdpZHRoTW9kZShtOiBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZSkge1xuICAgIHRoaXMuX291dGxpbmVXaWR0aE1vZGUgPSBtO1xuXG4gICAgdGhpcy5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIF9pc091dGxpbmUgPSBmYWxzZTtcblxuICBnZXQgaXNPdXRsaW5lKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc091dGxpbmU7XG4gIH1cbiAgc2V0IGlzT3V0bGluZShiOiBib29sZWFuKSB7XG4gICAgdGhpcy5faXNPdXRsaW5lID0gYjtcblxuICAgIHRoaXMubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlYWRvbmx5IGJvb2xlYW4gdGhhdCBpbmRpY2F0ZXMgdGhpcyBpcyBhIFtbTVRvb25NYXRlcmlhbF1dLlxuICAgKi9cbiAgcHVibGljIGdldCBpc01Ub29uTWF0ZXJpYWwoKTogdHJ1ZSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwYXJhbWV0ZXJzOiBNVG9vbk1hdGVyaWFsUGFyYW1ldGVycyA9IHt9KSB7XG4gICAgc3VwZXIoeyB2ZXJ0ZXhTaGFkZXIsIGZyYWdtZW50U2hhZGVyIH0pO1xuXG4gICAgLy8gb3ZlcnJpZGUgZGVwdGhXcml0ZSB3aXRoIHRyYW5zcGFyZW50V2l0aFpXcml0ZVxuICAgIGlmIChwYXJhbWV0ZXJzLnRyYW5zcGFyZW50V2l0aFpXcml0ZSkge1xuICAgICAgcGFyYW1ldGVycy5kZXB0aFdyaXRlID0gdHJ1ZTtcbiAgICB9XG4gICAgZGVsZXRlIHBhcmFtZXRlcnMudHJhbnNwYXJlbnRXaXRoWldyaXRlO1xuXG4gICAgLy8gPT0gZW5hYmxpbmcgYnVuY2ggb2Ygc3R1ZmYgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgcGFyYW1ldGVycy5mb2cgPSB0cnVlO1xuICAgIHBhcmFtZXRlcnMubGlnaHRzID0gdHJ1ZTtcbiAgICBwYXJhbWV0ZXJzLmNsaXBwaW5nID0gdHJ1ZTtcblxuICAgIC8vIENPTVBBVFxuICAgIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9wdWxsLzIxNzg4XG4gICAgaWYgKHBhcnNlSW50KFRIUkVFLlJFVklTSU9OLCAxMCkgPCAxMjkpIHtcbiAgICAgIChwYXJhbWV0ZXJzIGFzIGFueSkuc2tpbm5pbmcgPSAocGFyYW1ldGVycyBhcyBhbnkpLnNraW5uaW5nIHx8IGZhbHNlO1xuICAgIH1cblxuICAgIC8vIENPTVBBVFxuICAgIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9wdWxsLzIyMTY5XG4gICAgaWYgKHBhcnNlSW50KFRIUkVFLlJFVklTSU9OLCAxMCkgPCAxMzEpIHtcbiAgICAgIChwYXJhbWV0ZXJzIGFzIGFueSkubW9ycGhUYXJnZXRzID0gKHBhcmFtZXRlcnMgYXMgYW55KS5tb3JwaFRhcmdldHMgfHwgZmFsc2U7XG4gICAgICAocGFyYW1ldGVycyBhcyBhbnkpLm1vcnBoTm9ybWFscyA9IChwYXJhbWV0ZXJzIGFzIGFueSkubW9ycGhOb3JtYWxzIHx8IGZhbHNlO1xuICAgIH1cblxuICAgIC8vID09IHVuaWZvcm1zID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHRoaXMudW5pZm9ybXMgPSBUSFJFRS5Vbmlmb3Jtc1V0aWxzLm1lcmdlKFtcbiAgICAgIFRIUkVFLlVuaWZvcm1zTGliLmNvbW1vbiwgLy8gbWFwXG4gICAgICBUSFJFRS5Vbmlmb3Jtc0xpYi5ub3JtYWxtYXAsIC8vIG5vcm1hbE1hcFxuICAgICAgVEhSRUUuVW5pZm9ybXNMaWIuZW1pc3NpdmVtYXAsIC8vIGVtaXNzaXZlTWFwXG4gICAgICBUSFJFRS5Vbmlmb3Jtc0xpYi5mb2csXG4gICAgICBUSFJFRS5Vbmlmb3Jtc0xpYi5saWdodHMsXG4gICAgICB7XG4gICAgICAgIGxpdEZhY3RvcjogeyB2YWx1ZTogbmV3IFRIUkVFLkNvbG9yKDEuMCwgMS4wLCAxLjApIH0sXG4gICAgICAgIG1hcFV2VHJhbnNmb3JtOiB7IHZhbHVlOiBuZXcgVEhSRUUuTWF0cml4MygpIH0sXG4gICAgICAgIGNvbG9yQWxwaGE6IHsgdmFsdWU6IDEuMCB9LFxuICAgICAgICBub3JtYWxNYXBVdlRyYW5zZm9ybTogeyB2YWx1ZTogbmV3IFRIUkVFLk1hdHJpeDMoKSB9LFxuICAgICAgICBzaGFkZUNvbG9yRmFjdG9yOiB7IHZhbHVlOiBuZXcgVEhSRUUuQ29sb3IoMC45NywgMC44MSwgMC44NikgfSxcbiAgICAgICAgc2hhZGVNdWx0aXBseVRleHR1cmU6IHsgdmFsdWU6IG51bGwgfSxcbiAgICAgICAgc2hhZGVNdWx0aXBseVRleHR1cmVVdlRyYW5zZm9ybTogeyB2YWx1ZTogbmV3IFRIUkVFLk1hdHJpeDMoKSB9LFxuICAgICAgICBzaGFkaW5nU2hpZnRGYWN0b3I6IHsgdmFsdWU6IDAuMCB9LFxuICAgICAgICBzaGFkaW5nU2hpZnRUZXh0dXJlOiB7IHZhbHVlOiBudWxsIH0sXG4gICAgICAgIHNoYWRpbmdTaGlmdFRleHR1cmVVdlRyYW5zZm9ybTogeyB2YWx1ZTogbmV3IFRIUkVFLk1hdHJpeDMoKSB9LFxuICAgICAgICBzaGFkaW5nU2hpZnRUZXh0dXJlU2NhbGU6IHsgdmFsdWU6IG51bGwgfSxcbiAgICAgICAgc2hhZGluZ1Rvb255RmFjdG9yOiB7IHZhbHVlOiAwLjkgfSxcbiAgICAgICAgZ2lFcXVhbGl6YXRpb25GYWN0b3I6IHsgdmFsdWU6IDAuOSB9LFxuICAgICAgICBtYXRjYXBGYWN0b3I6IHsgdmFsdWU6IG5ldyBUSFJFRS5Db2xvcigxLjAsIDEuMCwgMS4wKSB9LFxuICAgICAgICBtYXRjYXBUZXh0dXJlOiB7IHZhbHVlOiBudWxsIH0sXG4gICAgICAgIG1hdGNhcFRleHR1cmVVdlRyYW5zZm9ybTogeyB2YWx1ZTogbmV3IFRIUkVFLk1hdHJpeDMoKSB9LFxuICAgICAgICBwYXJhbWV0cmljUmltQ29sb3JGYWN0b3I6IHsgdmFsdWU6IG5ldyBUSFJFRS5Db2xvcigwLjAsIDAuMCwgMC4wKSB9LFxuICAgICAgICByaW1NdWx0aXBseVRleHR1cmU6IHsgdmFsdWU6IG51bGwgfSxcbiAgICAgICAgcmltTXVsdGlwbHlUZXh0dXJlVXZUcmFuc2Zvcm06IHsgdmFsdWU6IG5ldyBUSFJFRS5NYXRyaXgzKCkgfSxcbiAgICAgICAgcmltTGlnaHRpbmdNaXhGYWN0b3I6IHsgdmFsdWU6IDAuMCB9LFxuICAgICAgICBwYXJhbWV0cmljUmltRnJlc25lbFBvd2VyRmFjdG9yOiB7IHZhbHVlOiAxLjAgfSxcbiAgICAgICAgcGFyYW1ldHJpY1JpbUxpZnRGYWN0b3I6IHsgdmFsdWU6IDAuMCB9LFxuICAgICAgICBlbWlzc2l2ZTogeyB2YWx1ZTogbmV3IFRIUkVFLkNvbG9yKDAuMCwgMC4wLCAwLjApIH0sXG4gICAgICAgIGVtaXNzaXZlTWFwVXZUcmFuc2Zvcm06IHsgdmFsdWU6IG5ldyBUSFJFRS5NYXRyaXgzKCkgfSxcbiAgICAgICAgb3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlOiB7IHZhbHVlOiBudWxsIH0sXG4gICAgICAgIG91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZVV2VHJhbnNmb3JtOiB7IHZhbHVlOiBuZXcgVEhSRUUuTWF0cml4MygpIH0sXG4gICAgICAgIG91dGxpbmVXaWR0aEZhY3RvcjogeyB2YWx1ZTogMC41IH0sXG4gICAgICAgIG91dGxpbmVDb2xvckZhY3RvcjogeyB2YWx1ZTogbmV3IFRIUkVFLkNvbG9yKDAuMCwgMC4wLCAwLjApIH0sXG4gICAgICAgIG91dGxpbmVMaWdodGluZ01peEZhY3RvcjogeyB2YWx1ZTogMS4wIH0sXG4gICAgICAgIHV2QW5pbWF0aW9uTWFza1RleHR1cmU6IHsgdmFsdWU6IG51bGwgfSxcbiAgICAgICAgdXZBbmltYXRpb25NYXNrVGV4dHVyZVV2VHJhbnNmb3JtOiB7IHZhbHVlOiBuZXcgVEhSRUUuTWF0cml4MygpIH0sXG4gICAgICAgIHV2QW5pbWF0aW9uU2Nyb2xsWE9mZnNldDogeyB2YWx1ZTogMC4wIH0sXG4gICAgICAgIHV2QW5pbWF0aW9uU2Nyb2xsWU9mZnNldDogeyB2YWx1ZTogMC4wIH0sXG4gICAgICAgIHV2QW5pbWF0aW9uUm90YXRpb25QaGFzZTogeyB2YWx1ZTogMC4wIH0sXG4gICAgICB9LFxuICAgICAgcGFyYW1ldGVycy51bmlmb3JtcyxcbiAgICBdKTtcblxuICAgIC8vID09IGZpbmFsbHkgY29tcGlsZSB0aGUgc2hhZGVyIHByb2dyYW0gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHRoaXMuc2V0VmFsdWVzKHBhcmFtZXRlcnMpO1xuXG4gICAgLy8gPT0gdXBsb2FkIHVuaWZvcm1zIHRoYXQgbmVlZCB0byB1cGxvYWQgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgdGhpcy5fdXBsb2FkVW5pZm9ybXNXb3JrYXJvdW5kKCk7XG5cbiAgICAvLyA9PSB1cGRhdGUgc2hhZGVyIHN0dWZmID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICB0aGlzLmN1c3RvbVByb2dyYW1DYWNoZUtleSA9ICgpID0+XG4gICAgICBbXG4gICAgICAgIHRoaXMuX2lnbm9yZVZlcnRleENvbG9yID8gJ2lnbm9yZVZlcnRleENvbG9yJyA6ICcnLFxuICAgICAgICB0aGlzLl92MENvbXBhdFNoYWRlID8gJ3YwQ29tcGF0U2hhZGUnIDogJycsXG4gICAgICAgIHRoaXMuX2RlYnVnTW9kZSAhPT0gJ25vbmUnID8gYGRlYnVnTW9kZToke3RoaXMuX2RlYnVnTW9kZX1gIDogJycsXG4gICAgICAgIHRoaXMuX291dGxpbmVXaWR0aE1vZGUgIT09ICdub25lJyA/IGBvdXRsaW5lV2lkdGhNb2RlOiR7dGhpcy5fb3V0bGluZVdpZHRoTW9kZX1gIDogJycsXG4gICAgICAgIHRoaXMuX2lzT3V0bGluZSA/ICdpc091dGxpbmUnIDogJycsXG4gICAgICAgIC4uLk9iamVjdC5lbnRyaWVzKHRoaXMuX2dlbmVyYXRlRGVmaW5lcygpKS5tYXAoKFt0b2tlbiwgbWFjcm9dKSA9PiBgJHt0b2tlbn06JHttYWNyb31gKSxcbiAgICAgICAgdGhpcy5tYXRjYXBUZXh0dXJlID8gYG1hdGNhcFRleHR1cmVFbmNvZGluZzoke3RoaXMubWF0Y2FwVGV4dHVyZS5lbmNvZGluZ31gIDogJycsXG4gICAgICAgIHRoaXMuc2hhZGVNdWx0aXBseVRleHR1cmUgPyBgc2hhZGVNdWx0aXBseVRleHR1cmVFbmNvZGluZzoke3RoaXMuc2hhZGVNdWx0aXBseVRleHR1cmUuZW5jb2Rpbmd9YCA6ICcnLFxuICAgICAgICB0aGlzLnJpbU11bHRpcGx5VGV4dHVyZSA/IGByaW1NdWx0aXBseVRleHR1cmVFbmNvZGluZzoke3RoaXMucmltTXVsdGlwbHlUZXh0dXJlLmVuY29kaW5nfWAgOiAnJyxcbiAgICAgIF0uam9pbignLCcpO1xuXG4gICAgdGhpcy5vbkJlZm9yZUNvbXBpbGUgPSAoc2hhZGVyLCByZW5kZXJlcikgPT4ge1xuICAgICAgLyoqXG4gICAgICAgKiBXaWxsIGJlIG5lZWRlZCB0byBkZXRlcm1pbmUgd2hldGhlciB3ZSBzaG91bGQgaW5saW5lIGNvbnZlcnQgc1JHQiB0ZXh0dXJlcyBvciBub3QuXG4gICAgICAgKiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvcHVsbC8yMjU1MVxuICAgICAgICovXG4gICAgICBjb25zdCBpc1dlYkdMMiA9IHJlbmRlcmVyLmNhcGFiaWxpdGllcy5pc1dlYkdMMjtcblxuICAgICAgY29uc3QgdGhyZWVSZXZpc2lvbiA9IHBhcnNlSW50KFRIUkVFLlJFVklTSU9OLCAxMCk7XG5cbiAgICAgIGNvbnN0IGRlZmluZXMgPVxuICAgICAgICBPYmplY3QuZW50cmllcyh7IC4uLnRoaXMuX2dlbmVyYXRlRGVmaW5lcygpLCAuLi50aGlzLmRlZmluZXMgfSlcbiAgICAgICAgICAuZmlsdGVyKChbdG9rZW4sIG1hY3JvXSkgPT4gISFtYWNybylcbiAgICAgICAgICAubWFwKChbdG9rZW4sIG1hY3JvXSkgPT4gYCNkZWZpbmUgJHt0b2tlbn0gJHttYWNyb31gKVxuICAgICAgICAgIC5qb2luKCdcXG4nKSArICdcXG4nO1xuXG4gICAgICAvLyAtLSB0ZXh0dXJlIGVuY29kaW5ncyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICBjb25zdCBlbmNvZGluZ3MgPVxuICAgICAgICAodGhpcy5tYXRjYXBUZXh0dXJlICE9PSBudWxsXG4gICAgICAgICAgPyBnZXRUZXhlbERlY29kaW5nRnVuY3Rpb24oXG4gICAgICAgICAgICAgICdtYXRjYXBUZXh0dXJlVGV4ZWxUb0xpbmVhcicsXG4gICAgICAgICAgICAgIGdldFRleHR1cmVFbmNvZGluZ0Zyb21NYXAodGhpcy5tYXRjYXBUZXh0dXJlLCBpc1dlYkdMMiksXG4gICAgICAgICAgICApICsgJ1xcbidcbiAgICAgICAgICA6ICcnKSArXG4gICAgICAgICh0aGlzLnNoYWRlTXVsdGlwbHlUZXh0dXJlICE9PSBudWxsXG4gICAgICAgICAgPyBnZXRUZXhlbERlY29kaW5nRnVuY3Rpb24oXG4gICAgICAgICAgICAgICdzaGFkZU11bHRpcGx5VGV4dHVyZVRleGVsVG9MaW5lYXInLFxuICAgICAgICAgICAgICBnZXRUZXh0dXJlRW5jb2RpbmdGcm9tTWFwKHRoaXMuc2hhZGVNdWx0aXBseVRleHR1cmUsIGlzV2ViR0wyKSxcbiAgICAgICAgICAgICkgKyAnXFxuJ1xuICAgICAgICAgIDogJycpICtcbiAgICAgICAgKHRoaXMucmltTXVsdGlwbHlUZXh0dXJlICE9PSBudWxsXG4gICAgICAgICAgPyBnZXRUZXhlbERlY29kaW5nRnVuY3Rpb24oXG4gICAgICAgICAgICAgICdyaW1NdWx0aXBseVRleHR1cmVUZXhlbFRvTGluZWFyJyxcbiAgICAgICAgICAgICAgZ2V0VGV4dHVyZUVuY29kaW5nRnJvbU1hcCh0aGlzLnJpbU11bHRpcGx5VGV4dHVyZSwgaXNXZWJHTDIpLFxuICAgICAgICAgICAgKSArICdcXG4nXG4gICAgICAgICAgOiAnJyk7XG5cbiAgICAgIC8vIC0tIGdlbmVyYXRlIHNoYWRlciBjb2RlIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgIHNoYWRlci52ZXJ0ZXhTaGFkZXIgPSBkZWZpbmVzICsgc2hhZGVyLnZlcnRleFNoYWRlcjtcbiAgICAgIHNoYWRlci5mcmFnbWVudFNoYWRlciA9IGRlZmluZXMgKyBlbmNvZGluZ3MgKyBzaGFkZXIuZnJhZ21lbnRTaGFkZXI7XG5cbiAgICAgIC8vIC0tIGNvbXBhdCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgLy8gQ09NUEFUXG4gICAgICAvLyBUaHJlZS5qcyByMTMyIGludHJvZHVjZXMgbmV3IHNoYWRlciBjaHVua3MgPG5vcm1hbF9wYXJzX2ZyYWdtZW50PiBhbmQgPGFscGhhdGVzdF9wYXJzX2ZyYWdtZW50PlxuICAgICAgaWYgKHRocmVlUmV2aXNpb24gPCAxMzIpIHtcbiAgICAgICAgc2hhZGVyLmZyYWdtZW50U2hhZGVyID0gc2hhZGVyLmZyYWdtZW50U2hhZGVyLnJlcGxhY2UoJyNpbmNsdWRlIDxub3JtYWxfcGFyc19mcmFnbWVudD4nLCAnJyk7XG4gICAgICAgIHNoYWRlci5mcmFnbWVudFNoYWRlciA9IHNoYWRlci5mcmFnbWVudFNoYWRlci5yZXBsYWNlKCcjaW5jbHVkZSA8YWxwaGF0ZXN0X3BhcnNfZnJhZ21lbnQ+JywgJycpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoaXMgbWF0ZXJpYWwuXG4gICAqXG4gICAqIEBwYXJhbSBkZWx0YSBkZWx0YVRpbWUgc2luY2UgbGFzdCB1cGRhdGVcbiAgICovXG4gIHB1YmxpYyB1cGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX3VwbG9hZFVuaWZvcm1zV29ya2Fyb3VuZCgpO1xuICAgIHRoaXMuX3VwZGF0ZVVWQW5pbWF0aW9uKGRlbHRhKTtcbiAgfVxuXG4gIHB1YmxpYyBjb3B5KHNvdXJjZTogdGhpcyk6IHRoaXMge1xuICAgIHN1cGVyLmNvcHkoc291cmNlKTtcbiAgICAvLyB1bmlmb3JtcyBhcmUgYWxyZWFkeSBjb3BpZWQgYXQgdGhpcyBtb21lbnRcblxuICAgIC8vIEJlZ2lubmluZyBmcm9tIHIxMzMsIHVuaWZvcm0gdGV4dHVyZXMgd2lsbCBiZSBjbG9uZWQgaW5zdGVhZCBvZiByZWZlcmVuY2VcbiAgICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvYmxvYi9hODgxM2JlMDRhODQ5YmQxNTVmN2NmNmYxYjIzZDhlZTJlMGZiNDhiL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXIuanMjTDMwNDdcbiAgICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvYmxvYi9hODgxM2JlMDRhODQ5YmQxNTVmN2NmNmYxYjIzZDhlZTJlMGZiNDhiL3NyYy9yZW5kZXJlcnMvc2hhZGVycy9Vbmlmb3Jtc1V0aWxzLmpzI0wyMlxuICAgIC8vIFRoaXMgd2lsbCBsZWF2ZSB0aGVpciBgLnZlcnNpb25gIHRvIGJlIGAwYFxuICAgIC8vIGFuZCB0aGVzZSB0ZXh0dXJlcyB3b24ndCBiZSB1cGxvYWRlZCB0byBHUFVcbiAgICAvLyBXZSBhcmUgZ29pbmcgdG8gd29ya2Fyb3VuZCB0aGlzIGluIGhlcmVcbiAgICAvLyBJJ3ZlIG9wZW5lZCBhbiBpc3N1ZSBmb3IgdGhpczogaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9pc3N1ZXMvMjI3MThcbiAgICB0aGlzLm1hcCA9IHNvdXJjZS5tYXA7XG4gICAgdGhpcy5ub3JtYWxNYXAgPSBzb3VyY2Uubm9ybWFsTWFwO1xuICAgIHRoaXMuZW1pc3NpdmVNYXAgPSBzb3VyY2UuZW1pc3NpdmVNYXA7XG4gICAgdGhpcy5zaGFkZU11bHRpcGx5VGV4dHVyZSA9IHNvdXJjZS5zaGFkZU11bHRpcGx5VGV4dHVyZTtcbiAgICB0aGlzLnNoYWRpbmdTaGlmdFRleHR1cmUgPSBzb3VyY2Uuc2hhZGluZ1NoaWZ0VGV4dHVyZTtcbiAgICB0aGlzLm1hdGNhcFRleHR1cmUgPSBzb3VyY2UubWF0Y2FwVGV4dHVyZTtcbiAgICB0aGlzLnJpbU11bHRpcGx5VGV4dHVyZSA9IHNvdXJjZS5yaW1NdWx0aXBseVRleHR1cmU7XG4gICAgdGhpcy5vdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmUgPSBzb3VyY2Uub3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlO1xuICAgIHRoaXMudXZBbmltYXRpb25NYXNrVGV4dHVyZSA9IHNvdXJjZS51dkFuaW1hdGlvbk1hc2tUZXh0dXJlO1xuXG4gICAgLy8gPT0gY29weSBtZW1iZXJzID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgdGhpcy5ub3JtYWxNYXBUeXBlID0gc291cmNlLm5vcm1hbE1hcFR5cGU7XG5cbiAgICB0aGlzLnV2QW5pbWF0aW9uU2Nyb2xsWFNwZWVkRmFjdG9yID0gc291cmNlLnV2QW5pbWF0aW9uU2Nyb2xsWFNwZWVkRmFjdG9yO1xuICAgIHRoaXMudXZBbmltYXRpb25TY3JvbGxZU3BlZWRGYWN0b3IgPSBzb3VyY2UudXZBbmltYXRpb25TY3JvbGxZU3BlZWRGYWN0b3I7XG4gICAgdGhpcy51dkFuaW1hdGlvblJvdGF0aW9uU3BlZWRGYWN0b3IgPSBzb3VyY2UudXZBbmltYXRpb25Sb3RhdGlvblNwZWVkRmFjdG9yO1xuXG4gICAgdGhpcy5pZ25vcmVWZXJ0ZXhDb2xvciA9IHNvdXJjZS5pZ25vcmVWZXJ0ZXhDb2xvcjtcblxuICAgIHRoaXMudjBDb21wYXRTaGFkZSA9IHNvdXJjZS52MENvbXBhdFNoYWRlO1xuICAgIHRoaXMuZGVidWdNb2RlID0gc291cmNlLmRlYnVnTW9kZTtcbiAgICB0aGlzLm91dGxpbmVXaWR0aE1vZGUgPSBzb3VyY2Uub3V0bGluZVdpZHRoTW9kZTtcblxuICAgIHRoaXMuaXNPdXRsaW5lID0gc291cmNlLmlzT3V0bGluZTtcblxuICAgIC8vID09IHVwZGF0ZSBzaGFkZXIgc3R1ZmYgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHRoaXMubmVlZHNVcGRhdGUgPSB0cnVlO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIFVWIGFuaW1hdGlvbiBzdGF0ZS5cbiAgICogSW50ZW5kZWQgdG8gYmUgY2FsbGVkIHZpYSB7QGxpbmsgdXBkYXRlfS5cbiAgICogQHBhcmFtIGRlbHRhIGRlbHRhVGltZVxuICAgKi9cbiAgcHJpdmF0ZSBfdXBkYXRlVVZBbmltYXRpb24oZGVsdGE6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMudW5pZm9ybXMudXZBbmltYXRpb25TY3JvbGxYT2Zmc2V0LnZhbHVlICs9IGRlbHRhICogdGhpcy51dkFuaW1hdGlvblNjcm9sbFhTcGVlZEZhY3RvcjtcbiAgICB0aGlzLnVuaWZvcm1zLnV2QW5pbWF0aW9uU2Nyb2xsWU9mZnNldC52YWx1ZSArPSBkZWx0YSAqIHRoaXMudXZBbmltYXRpb25TY3JvbGxZU3BlZWRGYWN0b3I7XG4gICAgdGhpcy51bmlmb3Jtcy51dkFuaW1hdGlvblJvdGF0aW9uUGhhc2UudmFsdWUgKz0gZGVsdGEgKiB0aGlzLnV2QW5pbWF0aW9uUm90YXRpb25TcGVlZEZhY3RvcjtcblxuICAgIHRoaXMudW5pZm9ybXNOZWVkVXBkYXRlID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGxvYWQgdW5pZm9ybXMgdGhhdCBuZWVkIHRvIHVwbG9hZCBidXQgZG9lc24ndCBhdXRvbWF0aWNhbGx5IGJlY2F1c2Ugb2YgcmVhc29ucy5cbiAgICogSW50ZW5kZWQgdG8gYmUgY2FsbGVkIHZpYSB7QGxpbmsgY29uc3RydWN0b3J9IGFuZCB7QGxpbmsgdXBkYXRlfS5cbiAgICovXG4gIHByaXZhdGUgX3VwbG9hZFVuaWZvcm1zV29ya2Fyb3VuZCgpOiB2b2lkIHtcbiAgICAvLyB3b3JrYXJvdW5kOiBzaW5jZSBvcGFjaXR5IGlzIGRlZmluZWQgYXMgYSBwcm9wZXJ0eSBpbiBUSFJFRS5NYXRlcmlhbFxuICAgIC8vIGFuZCBjYW5ub3QgYmUgb3ZlcnJpZGRlbiBhcyBhbiBhY2Nlc3NvcixcbiAgICAvLyBXZSBhcmUgZ29pbmcgdG8gdXBkYXRlIG9wYWNpdHkgaGVyZVxuICAgIHRoaXMudW5pZm9ybXMub3BhY2l0eS52YWx1ZSA9IHRoaXMub3BhY2l0eTtcblxuICAgIC8vIHdvcmthcm91bmQ6IHRleHR1cmUgdHJhbnNmb3JtcyBhcmUgbm90IHVwZGF0ZWQgYXV0b21hdGljYWxseVxuICAgIHRoaXMuX3VwZGF0ZVRleHR1cmVNYXRyaXgodGhpcy51bmlmb3Jtcy5tYXAsIHRoaXMudW5pZm9ybXMubWFwVXZUcmFuc2Zvcm0pO1xuICAgIHRoaXMuX3VwZGF0ZVRleHR1cmVNYXRyaXgodGhpcy51bmlmb3Jtcy5ub3JtYWxNYXAsIHRoaXMudW5pZm9ybXMubm9ybWFsTWFwVXZUcmFuc2Zvcm0pO1xuICAgIHRoaXMuX3VwZGF0ZVRleHR1cmVNYXRyaXgodGhpcy51bmlmb3Jtcy5lbWlzc2l2ZU1hcCwgdGhpcy51bmlmb3Jtcy5lbWlzc2l2ZU1hcFV2VHJhbnNmb3JtKTtcbiAgICB0aGlzLl91cGRhdGVUZXh0dXJlTWF0cml4KHRoaXMudW5pZm9ybXMuc2hhZGVNdWx0aXBseVRleHR1cmUsIHRoaXMudW5pZm9ybXMuc2hhZGVNdWx0aXBseVRleHR1cmVVdlRyYW5zZm9ybSk7XG4gICAgdGhpcy5fdXBkYXRlVGV4dHVyZU1hdHJpeCh0aGlzLnVuaWZvcm1zLnNoYWRpbmdTaGlmdFRleHR1cmUsIHRoaXMudW5pZm9ybXMuc2hhZGluZ1NoaWZ0VGV4dHVyZVV2VHJhbnNmb3JtKTtcbiAgICB0aGlzLl91cGRhdGVUZXh0dXJlTWF0cml4KHRoaXMudW5pZm9ybXMubWF0Y2FwVGV4dHVyZSwgdGhpcy51bmlmb3Jtcy5tYXRjYXBUZXh0dXJlVXZUcmFuc2Zvcm0pO1xuICAgIHRoaXMuX3VwZGF0ZVRleHR1cmVNYXRyaXgodGhpcy51bmlmb3Jtcy5yaW1NdWx0aXBseVRleHR1cmUsIHRoaXMudW5pZm9ybXMucmltTXVsdGlwbHlUZXh0dXJlVXZUcmFuc2Zvcm0pO1xuICAgIHRoaXMuX3VwZGF0ZVRleHR1cmVNYXRyaXgoXG4gICAgICB0aGlzLnVuaWZvcm1zLm91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZSxcbiAgICAgIHRoaXMudW5pZm9ybXMub3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlVXZUcmFuc2Zvcm0sXG4gICAgKTtcbiAgICB0aGlzLl91cGRhdGVUZXh0dXJlTWF0cml4KHRoaXMudW5pZm9ybXMudXZBbmltYXRpb25NYXNrVGV4dHVyZSwgdGhpcy51bmlmb3Jtcy51dkFuaW1hdGlvbk1hc2tUZXh0dXJlVXZUcmFuc2Zvcm0pO1xuXG4gICAgLy8gQ09NUEFUIHdvcmthcm91bmQ6IHN0YXJ0aW5nIGZyb20gcjEzMiwgYWxwaGFUZXN0IGJlY29tZXMgYSB1bmlmb3JtIGluc3RlYWQgb2YgcHJlcHJvY2Vzc29yIHZhbHVlXG4gICAgY29uc3QgdGhyZWVSZXZpc2lvbiA9IHBhcnNlSW50KFRIUkVFLlJFVklTSU9OLCAxMCk7XG5cbiAgICBpZiAodGhyZWVSZXZpc2lvbiA+PSAxMzIpIHtcbiAgICAgIHRoaXMudW5pZm9ybXMuYWxwaGFUZXN0LnZhbHVlID0gdGhpcy5hbHBoYVRlc3Q7XG4gICAgfVxuXG4gICAgdGhpcy51bmlmb3Jtc05lZWRVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBtYXAgb2JqZWN0IG9mIHByZXByb2Nlc3NvciB0b2tlbiBhbmQgbWFjcm8gb2YgdGhlIHNoYWRlciBwcm9ncmFtLlxuICAgKi9cbiAgcHJpdmF0ZSBfZ2VuZXJhdGVEZWZpbmVzKCk6IHsgW3Rva2VuOiBzdHJpbmddOiBib29sZWFuIHwgbnVtYmVyIHwgc3RyaW5nIH0ge1xuICAgIGNvbnN0IHRocmVlUmV2aXNpb24gPSBwYXJzZUludChUSFJFRS5SRVZJU0lPTiwgMTApO1xuXG4gICAgY29uc3QgdXNlVXZJblZlcnQgPSB0aGlzLm91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZSAhPT0gbnVsbDtcbiAgICBjb25zdCB1c2VVdkluRnJhZyA9XG4gICAgICB0aGlzLm1hcCAhPT0gbnVsbCB8fFxuICAgICAgdGhpcy5lbWlzc2l2ZU1hcCAhPT0gbnVsbCB8fFxuICAgICAgdGhpcy5zaGFkZU11bHRpcGx5VGV4dHVyZSAhPT0gbnVsbCB8fFxuICAgICAgdGhpcy5zaGFkaW5nU2hpZnRUZXh0dXJlICE9PSBudWxsIHx8XG4gICAgICB0aGlzLnJpbU11bHRpcGx5VGV4dHVyZSAhPT0gbnVsbCB8fFxuICAgICAgdGhpcy51dkFuaW1hdGlvbk1hc2tUZXh0dXJlICE9PSBudWxsO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIFRlbXBvcmFyeSBjb21wYXQgYWdhaW5zdCBzaGFkZXIgY2hhbmdlIEAgVGhyZWUuanMgcjEyNlxuICAgICAgLy8gU2VlOiAjMjEyMDUsICMyMTMwNywgIzIxMjk5XG4gICAgICBUSFJFRV9WUk1fVEhSRUVfUkVWSVNJT046IHRocmVlUmV2aXNpb24sXG5cbiAgICAgIE9VVExJTkU6IHRoaXMuX2lzT3V0bGluZSxcbiAgICAgIE1UT09OX1VTRV9VVjogdXNlVXZJblZlcnQgfHwgdXNlVXZJbkZyYWcsIC8vIHdlIGNhbid0IHVzZSBgVVNFX1VWYCAsIGl0IHdpbGwgYmUgcmVkZWZpbmVkIGluIFdlYkdMUHJvZ3JhbS5qc1xuICAgICAgTVRPT05fVVZTX1ZFUlRFWF9PTkxZOiB1c2VVdkluVmVydCAmJiAhdXNlVXZJbkZyYWcsXG4gICAgICBWMF9DT01QQVRfU0hBREU6IHRoaXMuX3YwQ29tcGF0U2hhZGUsXG4gICAgICBVU0VfU0hBREVNVUxUSVBMWVRFWFRVUkU6IHRoaXMuc2hhZGVNdWx0aXBseVRleHR1cmUgIT09IG51bGwsXG4gICAgICBVU0VfU0hBRElOR1NISUZUVEVYVFVSRTogdGhpcy5zaGFkaW5nU2hpZnRUZXh0dXJlICE9PSBudWxsLFxuICAgICAgVVNFX01BVENBUFRFWFRVUkU6IHRoaXMubWF0Y2FwVGV4dHVyZSAhPT0gbnVsbCxcbiAgICAgIFVTRV9SSU1NVUxUSVBMWVRFWFRVUkU6IHRoaXMucmltTXVsdGlwbHlUZXh0dXJlICE9PSBudWxsLFxuICAgICAgVVNFX09VVExJTkVXSURUSE1VTFRJUExZVEVYVFVSRTogdGhpcy5vdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmUgIT09IG51bGwsXG4gICAgICBVU0VfVVZBTklNQVRJT05NQVNLVEVYVFVSRTogdGhpcy51dkFuaW1hdGlvbk1hc2tUZXh0dXJlICE9PSBudWxsLFxuICAgICAgSUdOT1JFX1ZFUlRFWF9DT0xPUjogdGhpcy5faWdub3JlVmVydGV4Q29sb3IgPT09IHRydWUsXG4gICAgICBERUJVR19OT1JNQUw6IHRoaXMuX2RlYnVnTW9kZSA9PT0gJ25vcm1hbCcsXG4gICAgICBERUJVR19MSVRTSEFERVJBVEU6IHRoaXMuX2RlYnVnTW9kZSA9PT0gJ2xpdFNoYWRlUmF0ZScsXG4gICAgICBERUJVR19VVjogdGhpcy5fZGVidWdNb2RlID09PSAndXYnLFxuICAgICAgT1VUTElORV9XSURUSF9XT1JMRDogdGhpcy5fb3V0bGluZVdpZHRoTW9kZSA9PT0gTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUuV29ybGRDb29yZGluYXRlcyxcbiAgICAgIE9VVExJTkVfV0lEVEhfU0NSRUVOOiB0aGlzLl9vdXRsaW5lV2lkdGhNb2RlID09PSBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZS5TY3JlZW5Db29yZGluYXRlcyxcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlVGV4dHVyZU1hdHJpeChzcmM6IFRIUkVFLklVbmlmb3JtPFRIUkVFLlRleHR1cmUgfCBudWxsPiwgZHN0OiBUSFJFRS5JVW5pZm9ybTxUSFJFRS5NYXRyaXgzPik6IHZvaWQge1xuICAgIGlmIChzcmMudmFsdWUpIHtcbiAgICAgIGlmIChzcmMudmFsdWUubWF0cml4QXV0b1VwZGF0ZSkge1xuICAgICAgICBzcmMudmFsdWUudXBkYXRlTWF0cml4KCk7XG4gICAgICB9XG5cbiAgICAgIGRzdC52YWx1ZS5jb3B5KHNyYy52YWx1ZS5tYXRyaXgpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgR0xURlBhcnNlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXInO1xuaW1wb3J0IHsgTVRvb25NYXRlcmlhbFBhcmFtZXRlcnMgfSBmcm9tICcuL01Ub29uTWF0ZXJpYWxQYXJhbWV0ZXJzJztcblxuLyoqXG4gKiBNYXRlcmlhbFBhcmFtZXRlcnMgaGF0ZXMgYHVuZGVmaW5lZGAuIFRoaXMgaGVscGVyIGF1dG9tYXRpY2FsbHkgcmVqZWN0cyBhc3NpZ24gb2YgdGhlc2UgYHVuZGVmaW5lZGAuXG4gKiBJdCBhbHNvIGhhbmRsZXMgYXN5bmNocm9ub3VzIHByb2Nlc3Mgb2YgdGV4dHVyZXMuXG4gKiBNYWtlIHN1cmUgYXdhaXQgZm9yIHtAbGluayBHTFRGTVRvb25NYXRlcmlhbFBhcmFtc0Fzc2lnbkhlbHBlci5wZW5kaW5nfS5cbiAqL1xuZXhwb3J0IGNsYXNzIEdMVEZNVG9vbk1hdGVyaWFsUGFyYW1zQXNzaWduSGVscGVyIHtcbiAgcHJpdmF0ZSByZWFkb25seSBfcGFyc2VyOiBHTFRGUGFyc2VyO1xuICBwcml2YXRlIF9tYXRlcmlhbFBhcmFtczogTVRvb25NYXRlcmlhbFBhcmFtZXRlcnM7XG4gIHByaXZhdGUgX3BlbmRpbmdzOiBQcm9taXNlPGFueT5bXTtcblxuICBwdWJsaWMgZ2V0IHBlbmRpbmcoKTogUHJvbWlzZTx1bmtub3duPiB7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHRoaXMuX3BlbmRpbmdzKTtcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJzZXI6IEdMVEZQYXJzZXIsIG1hdGVyaWFsUGFyYW1zOiBNVG9vbk1hdGVyaWFsUGFyYW1ldGVycykge1xuICAgIHRoaXMuX3BhcnNlciA9IHBhcnNlcjtcbiAgICB0aGlzLl9tYXRlcmlhbFBhcmFtcyA9IG1hdGVyaWFsUGFyYW1zO1xuICAgIHRoaXMuX3BlbmRpbmdzID0gW107XG4gIH1cblxuICBwdWJsaWMgYXNzaWduUHJpbWl0aXZlPFQgZXh0ZW5kcyBrZXlvZiBNVG9vbk1hdGVyaWFsUGFyYW1ldGVycz4oa2V5OiBULCB2YWx1ZTogTVRvb25NYXRlcmlhbFBhcmFtZXRlcnNbVF0pOiB2b2lkIHtcbiAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fbWF0ZXJpYWxQYXJhbXNba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3NpZ25Db2xvcjxUIGV4dGVuZHMga2V5b2YgTVRvb25NYXRlcmlhbFBhcmFtZXRlcnM+KFxuICAgIGtleTogVCxcbiAgICB2YWx1ZTogbnVtYmVyW10gfCB1bmRlZmluZWQsXG4gICAgY29udmVydFNSR0JUb0xpbmVhcj86IGJvb2xlYW4sXG4gICk6IHZvaWQge1xuICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9tYXRlcmlhbFBhcmFtc1trZXldID0gbmV3IFRIUkVFLkNvbG9yKCkuZnJvbUFycmF5KHZhbHVlKTtcblxuICAgICAgaWYgKGNvbnZlcnRTUkdCVG9MaW5lYXIpIHtcbiAgICAgICAgdGhpcy5fbWF0ZXJpYWxQYXJhbXNba2V5XS5jb252ZXJ0U1JHQlRvTGluZWFyKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGFzc2lnblRleHR1cmU8VCBleHRlbmRzIGtleW9mIE1Ub29uTWF0ZXJpYWxQYXJhbWV0ZXJzPihcbiAgICBrZXk6IFQsXG4gICAgdGV4dHVyZTogeyBpbmRleDogbnVtYmVyIH0gfCB1bmRlZmluZWQsXG4gICAgaXNDb2xvclRleHR1cmU6IGJvb2xlYW4sXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHByb21pc2UgPSAoYXN5bmMgKCkgPT4ge1xuICAgICAgaWYgKHRleHR1cmUgIT0gbnVsbCkge1xuICAgICAgICBhd2FpdCB0aGlzLl9wYXJzZXIuYXNzaWduVGV4dHVyZSh0aGlzLl9tYXRlcmlhbFBhcmFtcywga2V5LCB0ZXh0dXJlKTtcblxuICAgICAgICBpZiAoaXNDb2xvclRleHR1cmUpIHtcbiAgICAgICAgICB0aGlzLl9tYXRlcmlhbFBhcmFtc1trZXldLmVuY29kaW5nID0gVEhSRUUuc1JHQkVuY29kaW5nO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSkoKTtcblxuICAgIHRoaXMuX3BlbmRpbmdzLnB1c2gocHJvbWlzZSk7XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBhc3NpZ25UZXh0dXJlQnlJbmRleDxUIGV4dGVuZHMga2V5b2YgTVRvb25NYXRlcmlhbFBhcmFtZXRlcnM+KFxuICAgIGtleTogVCxcbiAgICB0ZXh0dXJlSW5kZXg6IG51bWJlciB8IHVuZGVmaW5lZCxcbiAgICBpc0NvbG9yVGV4dHVyZTogYm9vbGVhbixcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuYXNzaWduVGV4dHVyZShrZXksIHRleHR1cmVJbmRleCAhPSBudWxsID8geyBpbmRleDogdGV4dHVyZUluZGV4IH0gOiB1bmRlZmluZWQsIGlzQ29sb3JUZXh0dXJlKTtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0ICogYXMgVjFNVG9vblNjaGVtYSBmcm9tICdAcGl4aXYvdHlwZXMtdnJtYy1tYXRlcmlhbHMtbXRvb24tMS4wJztcbmltcG9ydCB0eXBlIHsgR0xURiwgR0xURkxvYWRlclBsdWdpbiwgR0xURlBhcnNlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXInO1xuaW1wb3J0IHsgTVRvb25NYXRlcmlhbCB9IGZyb20gJy4vTVRvb25NYXRlcmlhbCc7XG5pbXBvcnQgdHlwZSB7IE1Ub29uTWF0ZXJpYWxQYXJhbWV0ZXJzIH0gZnJvbSAnLi9NVG9vbk1hdGVyaWFsUGFyYW1ldGVycyc7XG5pbXBvcnQgeyBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZSB9IGZyb20gJy4vTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUnO1xuaW1wb3J0IHsgR0xURk1Ub29uTWF0ZXJpYWxQYXJhbXNBc3NpZ25IZWxwZXIgfSBmcm9tICcuL0dMVEZNVG9vbk1hdGVyaWFsUGFyYW1zQXNzaWduSGVscGVyJztcbmltcG9ydCB7IE1Ub29uTWF0ZXJpYWxMb2FkZXJQbHVnaW5PcHRpb25zIH0gZnJvbSAnLi9NVG9vbk1hdGVyaWFsTG9hZGVyUGx1Z2luT3B0aW9ucyc7XG5pbXBvcnQgdHlwZSB7IE1Ub29uTWF0ZXJpYWxEZWJ1Z01vZGUgfSBmcm9tICcuL01Ub29uTWF0ZXJpYWxEZWJ1Z01vZGUnO1xuXG5leHBvcnQgY2xhc3MgTVRvb25NYXRlcmlhbExvYWRlclBsdWdpbiBpbXBsZW1lbnRzIEdMVEZMb2FkZXJQbHVnaW4ge1xuICBwdWJsaWMgc3RhdGljIEVYVEVOU0lPTl9OQU1FID0gJ1ZSTUNfbWF0ZXJpYWxzX210b29uJztcblxuICAvKipcbiAgICogVGhpcyB2YWx1ZSB3aWxsIGJlIGFkZGVkIHRvIGByZW5kZXJPcmRlcmAgb2YgZXZlcnkgbWVzaGVzIHdobyBoYXZlIE1hdGVyaWFsc01Ub29uLlxuICAgKiBUaGUgZmluYWwgcmVuZGVyT3JkZXIgd2lsbCBiZSBzdW0gb2YgdGhpcyBgcmVuZGVyT3JkZXJPZmZzZXRgIGFuZCBgcmVuZGVyUXVldWVPZmZzZXROdW1iZXJgIGZvciBlYWNoIG1hdGVyaWFscy5cbiAgICogYDBgIGJ5IGRlZmF1bHQuXG4gICAqL1xuICBwdWJsaWMgcmVuZGVyT3JkZXJPZmZzZXQ6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlcmUgaXMgYSBsaW5lIG9mIHRoZSBzaGFkZXIgY2FsbGVkIFwiY29tbWVudCBvdXQgaWYgeW91IHdhbnQgdG8gUEJSIGFic29sdXRlbHlcIiBpbiBWUk0wLjAgTVRvb24uXG4gICAqIFdoZW4gdGhpcyBpcyB0cnVlLCB0aGUgbWF0ZXJpYWwgZW5hYmxlcyB0aGUgbGluZSB0byBtYWtlIGl0IGNvbXBhdGlibGUgd2l0aCB0aGUgbGVnYWN5IHJlbmRlcmluZyBvZiBWUk0uXG4gICAqIFVzdWFsbHkgbm90IHJlY29tbWVuZGVkIHRvIHR1cm4gdGhpcyBvbi5cbiAgICogYGZhbHNlYCBieSBkZWZhdWx0LlxuICAgKi9cbiAgcHVibGljIHYwQ29tcGF0U2hhZGU6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIERlYnVnIG1vZGUgZm9yIHRoZSBtYXRlcmlhbC5cbiAgICogWW91IGNhbiB2aXN1YWxpemUgc2V2ZXJhbCBjb21wb25lbnRzIGZvciBkaWFnbm9zaXMgdXNpbmcgZGVidWcgbW9kZS5cbiAgICpcbiAgICogU2VlOiB7QGxpbmsgTVRvb25NYXRlcmlhbERlYnVnTW9kZX1cbiAgICovXG4gIHB1YmxpYyBkZWJ1Z01vZGU6IE1Ub29uTWF0ZXJpYWxEZWJ1Z01vZGU7XG5cbiAgcHVibGljIHJlYWRvbmx5IHBhcnNlcjogR0xURlBhcnNlcjtcblxuICAvKipcbiAgICogTG9hZGVkIG1hdGVyaWFscyB3aWxsIGJlIHN0b3JlZCBpbiB0aGlzIHNldC5cbiAgICogV2lsbCBiZSB0cmFuc2ZlcnJlZCBpbnRvIGBnbHRmLnVzZXJEYXRhLnZybU1Ub29uTWF0ZXJpYWxzYCBpbiB7QGxpbmsgYWZ0ZXJSb290fS5cbiAgICovXG4gIHByaXZhdGUgcmVhZG9ubHkgX21Ub29uTWF0ZXJpYWxTZXQ6IFNldDxNVG9vbk1hdGVyaWFsPjtcblxuICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gTVRvb25NYXRlcmlhbExvYWRlclBsdWdpbi5FWFRFTlNJT05fTkFNRTtcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJzZXI6IEdMVEZQYXJzZXIsIG9wdGlvbnM6IE1Ub29uTWF0ZXJpYWxMb2FkZXJQbHVnaW5PcHRpb25zID0ge30pIHtcbiAgICB0aGlzLnBhcnNlciA9IHBhcnNlcjtcblxuICAgIHRoaXMucmVuZGVyT3JkZXJPZmZzZXQgPSBvcHRpb25zLnJlbmRlck9yZGVyT2Zmc2V0ID8/IDA7XG4gICAgdGhpcy52MENvbXBhdFNoYWRlID0gb3B0aW9ucy52MENvbXBhdFNoYWRlID8/IGZhbHNlO1xuICAgIHRoaXMuZGVidWdNb2RlID0gb3B0aW9ucy5kZWJ1Z01vZGUgPz8gJ25vbmUnO1xuXG4gICAgdGhpcy5fbVRvb25NYXRlcmlhbFNldCA9IG5ldyBTZXQoKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBiZWZvcmVSb290KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMuX3JlbW92ZVVubGl0RXh0ZW5zaW9uSWZNVG9vbkV4aXN0cygpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGFmdGVyUm9vdChnbHRmOiBHTFRGKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgZ2x0Zi51c2VyRGF0YS52cm1NVG9vbk1hdGVyaWFscyA9IEFycmF5LmZyb20odGhpcy5fbVRvb25NYXRlcmlhbFNldCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0TWF0ZXJpYWxUeXBlKG1hdGVyaWFsSW5kZXg6IG51bWJlcik6IHR5cGVvZiBUSFJFRS5NYXRlcmlhbCB8IG51bGwge1xuICAgIGNvbnN0IHYxRXh0ZW5zaW9uID0gdGhpcy5fZ2V0TVRvb25FeHRlbnNpb24obWF0ZXJpYWxJbmRleCk7XG4gICAgaWYgKHYxRXh0ZW5zaW9uKSB7XG4gICAgICByZXR1cm4gTVRvb25NYXRlcmlhbDtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBleHRlbmRNYXRlcmlhbFBhcmFtcyhtYXRlcmlhbEluZGV4OiBudW1iZXIsIG1hdGVyaWFsUGFyYW1zOiBNVG9vbk1hdGVyaWFsUGFyYW1ldGVycyk6IFByb21pc2U8YW55PiB8IG51bGwge1xuICAgIGNvbnN0IGV4dGVuc2lvbiA9IHRoaXMuX2dldE1Ub29uRXh0ZW5zaW9uKG1hdGVyaWFsSW5kZXgpO1xuICAgIGlmIChleHRlbnNpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLl9leHRlbmRNYXRlcmlhbFBhcmFtcyhleHRlbnNpb24sIG1hdGVyaWFsUGFyYW1zKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBsb2FkTWVzaChtZXNoSW5kZXg6IG51bWJlcik6IFByb21pc2U8VEhSRUUuR3JvdXAgfCBUSFJFRS5NZXNoIHwgVEhSRUUuU2tpbm5lZE1lc2g+IHtcbiAgICBjb25zdCBwYXJzZXIgPSB0aGlzLnBhcnNlcjtcbiAgICBjb25zdCBqc29uID0gcGFyc2VyLmpzb247XG5cbiAgICBjb25zdCBtZXNoRGVmID0ganNvbi5tZXNoZXNbbWVzaEluZGV4XTtcbiAgICBjb25zdCBwcmltaXRpdmVzRGVmID0gbWVzaERlZi5wcmltaXRpdmVzO1xuXG4gICAgY29uc3QgbWVzaE9yR3JvdXAgPSBhd2FpdCBwYXJzZXIubG9hZE1lc2gobWVzaEluZGV4KTtcblxuICAgIGlmIChwcmltaXRpdmVzRGVmLmxlbmd0aCA9PT0gMSkge1xuICAgICAgY29uc3QgbWVzaCA9IG1lc2hPckdyb3VwIGFzIFRIUkVFLk1lc2g7XG4gICAgICBjb25zdCBtYXRlcmlhbEluZGV4ID0gcHJpbWl0aXZlc0RlZlswXS5tYXRlcmlhbCBhcyBudW1iZXIgfCB1bmRlZmluZWQ7XG5cbiAgICAgIGlmIChtYXRlcmlhbEluZGV4ICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5fc2V0dXBQcmltaXRpdmUobWVzaCwgbWF0ZXJpYWxJbmRleCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGdyb3VwID0gbWVzaE9yR3JvdXAgYXMgVEhSRUUuR3JvdXA7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByaW1pdGl2ZXNEZWYubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgbWVzaCA9IGdyb3VwLmNoaWxkcmVuW2ldIGFzIFRIUkVFLk1lc2g7XG4gICAgICAgIGNvbnN0IG1hdGVyaWFsSW5kZXggPSBwcmltaXRpdmVzRGVmW2ldLm1hdGVyaWFsIGFzIG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAgICAgICBpZiAobWF0ZXJpYWxJbmRleCAhPSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5fc2V0dXBQcmltaXRpdmUobWVzaCwgbWF0ZXJpYWxJbmRleCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbWVzaE9yR3JvdXA7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlIHVzZSBvZiBgS0hSX21hdGVyaWFsc191bmxpdGAgZnJvbSBpdHMgYG1hdGVyaWFsc2AgaWYgdGhlIG1hdGVyaWFsIGlzIHVzaW5nIE1Ub29uLlxuICAgKlxuICAgKiBTaW5jZSBHTFRGTG9hZGVyIGhhdmUgc28gbWFueSBoYXJkY29kZWQgcHJvY2VkdXJlIHJlbGF0ZWQgdG8gYEtIUl9tYXRlcmlhbHNfdW5saXRgXG4gICAqIHdlIGhhdmUgdG8gZGVsZXRlIHRoZSBleHRlbnNpb24gYmVmb3JlIHdlIHN0YXJ0IHRvIHBhcnNlIHRoZSBnbFRGLlxuICAgKi9cbiAgcHJpdmF0ZSBfcmVtb3ZlVW5saXRFeHRlbnNpb25JZk1Ub29uRXhpc3RzKCk6IHZvaWQge1xuICAgIGNvbnN0IHBhcnNlciA9IHRoaXMucGFyc2VyO1xuICAgIGNvbnN0IGpzb24gPSBwYXJzZXIuanNvbjtcblxuICAgIGNvbnN0IG1hdGVyaWFsRGVmczogYW55W10gPSBqc29uLm1hdGVyaWFscztcbiAgICBtYXRlcmlhbERlZnMubWFwKChtYXRlcmlhbERlZiwgaU1hdGVyaWFsKSA9PiB7XG4gICAgICBjb25zdCBleHRlbnNpb24gPSB0aGlzLl9nZXRNVG9vbkV4dGVuc2lvbihpTWF0ZXJpYWwpO1xuXG4gICAgICBpZiAoZXh0ZW5zaW9uICYmIG1hdGVyaWFsRGVmLmV4dGVuc2lvbnM/LlsnS0hSX21hdGVyaWFsc191bmxpdCddKSB7XG4gICAgICAgIGRlbGV0ZSBtYXRlcmlhbERlZi5leHRlbnNpb25zWydLSFJfbWF0ZXJpYWxzX3VubGl0J107XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRNVG9vbkV4dGVuc2lvbihtYXRlcmlhbEluZGV4OiBudW1iZXIpOiBWMU1Ub29uU2NoZW1hLlZSTUNNYXRlcmlhbHNNVG9vbiB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgcGFyc2VyID0gdGhpcy5wYXJzZXI7XG4gICAgY29uc3QganNvbiA9IHBhcnNlci5qc29uO1xuXG4gICAgY29uc3QgbWF0ZXJpYWxEZWYgPSBqc29uLm1hdGVyaWFsc1ttYXRlcmlhbEluZGV4XTtcblxuICAgIGNvbnN0IGV4dGVuc2lvbjogVjFNVG9vblNjaGVtYS5WUk1DTWF0ZXJpYWxzTVRvb24gfCB1bmRlZmluZWQgPVxuICAgICAgbWF0ZXJpYWxEZWYuZXh0ZW5zaW9ucz8uW01Ub29uTWF0ZXJpYWxMb2FkZXJQbHVnaW4uRVhURU5TSU9OX05BTUVdO1xuICAgIGlmIChleHRlbnNpb24gPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBjb25zdCBzcGVjVmVyc2lvbiA9IGV4dGVuc2lvbi5zcGVjVmVyc2lvbjtcbiAgICBpZiAoc3BlY1ZlcnNpb24gIT09ICcxLjAtYmV0YScpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGV4dGVuc2lvbjtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX2V4dGVuZE1hdGVyaWFsUGFyYW1zKFxuICAgIGV4dGVuc2lvbjogVjFNVG9vblNjaGVtYS5WUk1DTWF0ZXJpYWxzTVRvb24sXG4gICAgbWF0ZXJpYWxQYXJhbXM6IE1Ub29uTWF0ZXJpYWxQYXJhbWV0ZXJzLFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBSZW1vdmluZyBtYXRlcmlhbCBwYXJhbXMgdGhhdCBpcyBub3QgcmVxdWlyZWQgdG8gc3VwcmVzcyB3YXJuaW5ncy5cbiAgICBkZWxldGUgKG1hdGVyaWFsUGFyYW1zIGFzIFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsUGFyYW1ldGVycykubWV0YWxuZXNzO1xuICAgIGRlbGV0ZSAobWF0ZXJpYWxQYXJhbXMgYXMgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWxQYXJhbWV0ZXJzKS5yb3VnaG5lc3M7XG5cbiAgICBjb25zdCBhc3NpZ25IZWxwZXIgPSBuZXcgR0xURk1Ub29uTWF0ZXJpYWxQYXJhbXNBc3NpZ25IZWxwZXIodGhpcy5wYXJzZXIsIG1hdGVyaWFsUGFyYW1zKTtcblxuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25QcmltaXRpdmUoJ3RyYW5zcGFyZW50V2l0aFpXcml0ZScsIGV4dGVuc2lvbi50cmFuc3BhcmVudFdpdGhaV3JpdGUpO1xuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25Db2xvcignc2hhZGVDb2xvckZhY3RvcicsIGV4dGVuc2lvbi5zaGFkZUNvbG9yRmFjdG9yKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduVGV4dHVyZSgnc2hhZGVNdWx0aXBseVRleHR1cmUnLCBleHRlbnNpb24uc2hhZGVNdWx0aXBseVRleHR1cmUsIHRydWUpO1xuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25QcmltaXRpdmUoJ3NoYWRpbmdTaGlmdEZhY3RvcicsIGV4dGVuc2lvbi5zaGFkaW5nU2hpZnRGYWN0b3IpO1xuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25UZXh0dXJlKCdzaGFkaW5nU2hpZnRUZXh0dXJlJywgZXh0ZW5zaW9uLnNoYWRpbmdTaGlmdFRleHR1cmUsIHRydWUpO1xuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25QcmltaXRpdmUoJ3NoYWRpbmdTaGlmdFRleHR1cmVTY2FsZScsIGV4dGVuc2lvbi5zaGFkaW5nU2hpZnRUZXh0dXJlPy5zY2FsZSk7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnblByaW1pdGl2ZSgnc2hhZGluZ1Rvb255RmFjdG9yJywgZXh0ZW5zaW9uLnNoYWRpbmdUb29ueUZhY3Rvcik7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnblByaW1pdGl2ZSgnZ2lFcXVhbGl6YXRpb25GYWN0b3InLCBleHRlbnNpb24uZ2lFcXVhbGl6YXRpb25GYWN0b3IpO1xuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25Db2xvcignbWF0Y2FwRmFjdG9yJywgZXh0ZW5zaW9uLm1hdGNhcEZhY3Rvcik7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnblRleHR1cmUoJ21hdGNhcFRleHR1cmUnLCBleHRlbnNpb24ubWF0Y2FwVGV4dHVyZSwgdHJ1ZSk7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnbkNvbG9yKCdwYXJhbWV0cmljUmltQ29sb3JGYWN0b3InLCBleHRlbnNpb24ucGFyYW1ldHJpY1JpbUNvbG9yRmFjdG9yKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduVGV4dHVyZSgncmltTXVsdGlwbHlUZXh0dXJlJywgZXh0ZW5zaW9uLnJpbU11bHRpcGx5VGV4dHVyZSwgdHJ1ZSk7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnblByaW1pdGl2ZSgncmltTGlnaHRpbmdNaXhGYWN0b3InLCBleHRlbnNpb24ucmltTGlnaHRpbmdNaXhGYWN0b3IpO1xuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25QcmltaXRpdmUoJ3BhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJGYWN0b3InLCBleHRlbnNpb24ucGFyYW1ldHJpY1JpbUZyZXNuZWxQb3dlckZhY3Rvcik7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnblByaW1pdGl2ZSgncGFyYW1ldHJpY1JpbUxpZnRGYWN0b3InLCBleHRlbnNpb24ucGFyYW1ldHJpY1JpbUxpZnRGYWN0b3IpO1xuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25QcmltaXRpdmUoJ291dGxpbmVXaWR0aE1vZGUnLCBleHRlbnNpb24ub3V0bGluZVdpZHRoTW9kZSBhcyBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZSk7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnblByaW1pdGl2ZSgnb3V0bGluZVdpZHRoRmFjdG9yJywgZXh0ZW5zaW9uLm91dGxpbmVXaWR0aEZhY3Rvcik7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnblRleHR1cmUoJ291dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZScsIGV4dGVuc2lvbi5vdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmUsIGZhbHNlKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduQ29sb3IoJ291dGxpbmVDb2xvckZhY3RvcicsIGV4dGVuc2lvbi5vdXRsaW5lQ29sb3JGYWN0b3IpO1xuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25QcmltaXRpdmUoJ291dGxpbmVMaWdodGluZ01peEZhY3RvcicsIGV4dGVuc2lvbi5vdXRsaW5lTGlnaHRpbmdNaXhGYWN0b3IpO1xuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25UZXh0dXJlKCd1dkFuaW1hdGlvbk1hc2tUZXh0dXJlJywgZXh0ZW5zaW9uLnV2QW5pbWF0aW9uTWFza1RleHR1cmUsIGZhbHNlKTtcbiAgICBhc3NpZ25IZWxwZXIuYXNzaWduUHJpbWl0aXZlKCd1dkFuaW1hdGlvblNjcm9sbFhTcGVlZEZhY3RvcicsIGV4dGVuc2lvbi51dkFuaW1hdGlvblNjcm9sbFhTcGVlZEZhY3Rvcik7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnblByaW1pdGl2ZSgndXZBbmltYXRpb25TY3JvbGxZU3BlZWRGYWN0b3InLCBleHRlbnNpb24udXZBbmltYXRpb25TY3JvbGxZU3BlZWRGYWN0b3IpO1xuICAgIGFzc2lnbkhlbHBlci5hc3NpZ25QcmltaXRpdmUoJ3V2QW5pbWF0aW9uUm90YXRpb25TcGVlZEZhY3RvcicsIGV4dGVuc2lvbi51dkFuaW1hdGlvblJvdGF0aW9uU3BlZWRGYWN0b3IpO1xuXG4gICAgYXNzaWduSGVscGVyLmFzc2lnblByaW1pdGl2ZSgndjBDb21wYXRTaGFkZScsIHRoaXMudjBDb21wYXRTaGFkZSk7XG4gICAgYXNzaWduSGVscGVyLmFzc2lnblByaW1pdGl2ZSgnZGVidWdNb2RlJywgdGhpcy5kZWJ1Z01vZGUpO1xuXG4gICAgYXdhaXQgYXNzaWduSGVscGVyLnBlbmRpbmc7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyB3aWxsIGRvIHR3byBwcm9jZXNzZXMgdGhhdCBpcyByZXF1aXJlZCB0byByZW5kZXIgTVRvb24gcHJvcGVybHkuXG4gICAqXG4gICAqIC0gU2V0IHJlbmRlciBvcmRlclxuICAgKiAtIEdlbmVyYXRlIG91dGxpbmVcbiAgICpcbiAgICogQHBhcmFtIG1lc2ggQSB0YXJnZXQgR0xURiBwcmltaXRpdmVcbiAgICogQHBhcmFtIG1hdGVyaWFsSW5kZXggVGhlIG1hdGVyaWFsIGluZGV4IG9mIHRoZSBwcmltaXRpdmVcbiAgICovXG4gIHByaXZhdGUgX3NldHVwUHJpbWl0aXZlKG1lc2g6IFRIUkVFLk1lc2gsIG1hdGVyaWFsSW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IGV4dGVuc2lvbiA9IHRoaXMuX2dldE1Ub29uRXh0ZW5zaW9uKG1hdGVyaWFsSW5kZXgpO1xuICAgIGlmIChleHRlbnNpb24pIHtcbiAgICAgIGNvbnN0IHJlbmRlck9yZGVyID0gdGhpcy5fcGFyc2VSZW5kZXJPcmRlcihleHRlbnNpb24pO1xuICAgICAgbWVzaC5yZW5kZXJPcmRlciA9IHJlbmRlck9yZGVyICsgdGhpcy5yZW5kZXJPcmRlck9mZnNldDtcblxuICAgICAgdGhpcy5fZ2VuZXJhdGVPdXRsaW5lKG1lc2gpO1xuXG4gICAgICB0aGlzLl9hZGRUb01hdGVyaWFsU2V0KG1lc2gpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlIG91dGxpbmUgZm9yIHRoZSBnaXZlbiBtZXNoLCBpZiBpdCBuZWVkcy5cbiAgICpcbiAgICogQHBhcmFtIG1lc2ggVGhlIHRhcmdldCBtZXNoXG4gICAqL1xuICBwcml2YXRlIF9nZW5lcmF0ZU91dGxpbmUobWVzaDogVEhSRUUuTWVzaCk6IHZvaWQge1xuICAgIC8vIE9LLCBpdCdzIHRoZSBoYWNreSBwYXJ0LlxuICAgIC8vIFdlIGFyZSBnb2luZyB0byBkdXBsaWNhdGUgdGhlIE1Ub29uTWF0ZXJpYWwgZm9yIG91dGxpbmUgdXNlLlxuICAgIC8vIFRoZW4gd2UgYXJlIGdvaW5nIHRvIGNyZWF0ZSB0d28gZ2VvbWV0cnkgZ3JvdXBzIGFuZCByZWZlciBzYW1lIGJ1ZmZlciBidXQgZGlmZmVyZW50IG1hdGVyaWFsLlxuICAgIC8vIEl0J3MgaG93IHdlIGRyYXcgdHdvIG1hdGVyaWFscyBhdCBvbmNlIHVzaW5nIGEgc2luZ2xlIG1lc2guXG5cbiAgICAvLyBtYWtlIHN1cmUgdGhlIG1hdGVyaWFsIGlzIG10b29uXG4gICAgY29uc3Qgc3VyZmFjZU1hdGVyaWFsID0gbWVzaC5tYXRlcmlhbDtcbiAgICBpZiAoIShzdXJmYWNlTWF0ZXJpYWwgaW5zdGFuY2VvZiBNVG9vbk1hdGVyaWFsKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGNoZWNrIHdoZXRoZXIgd2UgcmVhbGx5IGhhdmUgdG8gcHJlcGFyZSBvdXRsaW5lIG9yIG5vdFxuICAgIGlmIChzdXJmYWNlTWF0ZXJpYWwub3V0bGluZVdpZHRoTW9kZSA9PT0gJ25vbmUnIHx8IHN1cmZhY2VNYXRlcmlhbC5vdXRsaW5lV2lkdGhGYWN0b3IgPD0gMC4wKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gbWFrZSBpdHMgbWF0ZXJpYWwgYW4gYXJyYXlcbiAgICBtZXNoLm1hdGVyaWFsID0gW3N1cmZhY2VNYXRlcmlhbF07IC8vIG1lc2gubWF0ZXJpYWwgaXMgZ3VhcmFudGVlZCB0byBiZSBhIE1hdGVyaWFsIGluIEdMVEZMb2FkZXJcblxuICAgIC8vIGR1cGxpY2F0ZSB0aGUgbWF0ZXJpYWwgZm9yIG91dGxpbmUgdXNlXG4gICAgY29uc3Qgb3V0bGluZU1hdGVyaWFsID0gc3VyZmFjZU1hdGVyaWFsLmNsb25lKCkgYXMgTVRvb25NYXRlcmlhbDtcbiAgICBvdXRsaW5lTWF0ZXJpYWwubmFtZSArPSAnIChPdXRsaW5lKSc7XG4gICAgb3V0bGluZU1hdGVyaWFsLmlzT3V0bGluZSA9IHRydWU7XG4gICAgb3V0bGluZU1hdGVyaWFsLnNpZGUgPSBUSFJFRS5CYWNrU2lkZTtcbiAgICBtZXNoLm1hdGVyaWFsLnB1c2gob3V0bGluZU1hdGVyaWFsKTtcblxuICAgIC8vIG1ha2UgdHdvIGdlb21ldHJ5IGdyb3VwcyBvdXQgb2YgYSBzYW1lIGJ1ZmZlclxuICAgIGNvbnN0IGdlb21ldHJ5ID0gbWVzaC5nZW9tZXRyeTsgLy8gbWVzaC5nZW9tZXRyeSBpcyBndWFyYW50ZWVkIHRvIGJlIGEgQnVmZmVyR2VvbWV0cnkgaW4gR0xURkxvYWRlclxuICAgIGNvbnN0IHByaW1pdGl2ZVZlcnRpY2VzID0gZ2VvbWV0cnkuaW5kZXggPyBnZW9tZXRyeS5pbmRleC5jb3VudCA6IGdlb21ldHJ5LmF0dHJpYnV0ZXMucG9zaXRpb24uY291bnQgLyAzO1xuICAgIGdlb21ldHJ5LmFkZEdyb3VwKDAsIHByaW1pdGl2ZVZlcnRpY2VzLCAwKTtcbiAgICBnZW9tZXRyeS5hZGRHcm91cCgwLCBwcmltaXRpdmVWZXJ0aWNlcywgMSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRUb01hdGVyaWFsU2V0KG1lc2g6IFRIUkVFLk1lc2gpOiB2b2lkIHtcbiAgICBjb25zdCBtYXRlcmlhbE9yTWF0ZXJpYWxzID0gbWVzaC5tYXRlcmlhbDtcbiAgICBjb25zdCBtYXRlcmlhbFNldCA9IG5ldyBTZXQ8VEhSRUUuTWF0ZXJpYWw+KCk7XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShtYXRlcmlhbE9yTWF0ZXJpYWxzKSkge1xuICAgICAgbWF0ZXJpYWxPck1hdGVyaWFscy5mb3JFYWNoKChtYXRlcmlhbCkgPT4gbWF0ZXJpYWxTZXQuYWRkKG1hdGVyaWFsKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1hdGVyaWFsU2V0LmFkZChtYXRlcmlhbE9yTWF0ZXJpYWxzKTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IG1hdGVyaWFsIG9mIG1hdGVyaWFsU2V0KSB7XG4gICAgICBpZiAobWF0ZXJpYWwgaW5zdGFuY2VvZiBNVG9vbk1hdGVyaWFsKSB7XG4gICAgICAgIHRoaXMuX21Ub29uTWF0ZXJpYWxTZXQuYWRkKG1hdGVyaWFsKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZVJlbmRlck9yZGVyKGV4dGVuc2lvbjogVjFNVG9vblNjaGVtYS5WUk1DTWF0ZXJpYWxzTVRvb24pOiBudW1iZXIge1xuICAgIC8vIHRyYW5zcGFyZW50V2l0aFpXcml0ZSByYW5nZXMgZnJvbSAwIHRvICs5XG4gICAgLy8gbWVyZSB0cmFuc3BhcmVudCByYW5nZXMgZnJvbSAtOSB0byAwXG4gICAgY29uc3QgZW5hYmxlZFpXcml0ZSA9IGV4dGVuc2lvbi50cmFuc3BhcmVudFdpdGhaV3JpdGU7XG4gICAgcmV0dXJuIChlbmFibGVkWldyaXRlID8gMCA6IDE5KSArIChleHRlbnNpb24ucmVuZGVyUXVldWVPZmZzZXROdW1iZXIgPz8gMCk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXVEQTtBQUNPLFNBQVMsU0FBUyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRTtBQUM3RCxJQUFJLFNBQVMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sS0FBSyxZQUFZLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsVUFBVSxPQUFPLEVBQUUsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtBQUNoSCxJQUFJLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxFQUFFLFVBQVUsT0FBTyxFQUFFLE1BQU0sRUFBRTtBQUMvRCxRQUFRLFNBQVMsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDbkcsUUFBUSxTQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDdEcsUUFBUSxTQUFTLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxNQUFNLENBQUMsSUFBSSxHQUFHLE9B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
