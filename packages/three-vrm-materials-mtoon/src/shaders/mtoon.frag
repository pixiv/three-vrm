// #define PHONG

uniform vec3 litFactor;

uniform float opacity;

uniform vec3 shadeFactor;
#ifdef USE_SHADEMULTIPLYTEXTURE
  uniform sampler2D shadeMultiplyTexture;
#endif

uniform float shadingShiftFactor;
uniform float shadingToonyFactor;
uniform float lightColorAttenuationFactor;
uniform float giIntensityFactor;

uniform vec3 rimFactor;
#ifdef USE_RIMMULTIPLYTEXTURE
  uniform sampler2D rimMultiplyTexture;
#endif
uniform float rimLightingMixFactor;
uniform float rimFresnelPowerFactor;
uniform float rimLiftFactor;

#ifdef USE_ADDITIVETEXTURE
  uniform sampler2D additiveTexture;
#endif

uniform vec3 emissive;

uniform vec3 outlineFactor;
uniform float outlineLightingMixFactor;

#ifdef USE_UVANIMATIONMASKTEXTURE
  uniform sampler2D uvAnimationMaskTexture;
#endif

uniform float uvAnimationScrollXOffset;
uniform float uvAnimationScrollYOffset;
uniform float uvAnimationRotationPhase;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>

// #include <uv_pars_fragment>
#if defined( USE_MAP ) || defined( USE_SHADEMULTIPLYTEXTURE ) || defined( USE_NORMALMAP ) || defined( USE_RIMMULTIPLYTEXTURE ) || defined( USE_EMISSIVEMAP ) || defined( USE_OUTLINEWIDTHMULTIPLYTEXTURE ) || defined( USE_UVANIMATIONMASKTEXTURE )
  varying vec2 vUv;
#endif

#include <uv2_pars_fragment>
#include <map_pars_fragment>
// #include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
// #include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
// #include <envmap_pars_fragment>
// #include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>

// #include <lights_phong_pars_fragment>
varying vec3 vViewPosition;

#ifndef FLAT_SHADED
  varying vec3 vNormal;
#endif

#define Material_LightProbeLOD( material ) (0)

#include <shadowmap_pars_fragment>
// #include <bumpmap_pars_fragment>

// #include <normalmap_pars_fragment>
#ifdef USE_NORMALMAP

  uniform sampler2D normalMap;
  uniform vec2 normalScale;

#endif

#ifdef OBJECTSPACE_NORMALMAP

  uniform mat3 normalMatrix;

#endif

#if ! defined ( USE_TANGENT ) && defined ( TANGENTSPACE_NORMALMAP )

  // Per-Pixel Tangent Space Normal Mapping
  // http://hacksoflife.blogspot.ch/2009/11/per-pixel-tangent-space-normal-mapping.html

  // three-vrm specific change: it requires `uv` as an input in order to support uv scrolls

  vec3 perturbNormal2Arb( vec2 uv, vec3 eye_pos, vec3 surf_norm, vec3 mapN ) {

    // Workaround for Adreno 3XX dFd*( vec3 ) bug. See #9988

    vec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );
    vec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );
    vec2 st0 = dFdx( uv.st );
    vec2 st1 = dFdy( uv.st );

    float scale = sign( st1.t * st0.s - st0.t * st1.s ); // we do not care about the magnitude

    vec3 S = ( q0 * st1.t - q1 * st0.t ) * scale;
    vec3 T = ( - q0 * st1.s + q1 * st0.s ) * scale;

    // three-vrm specific change: Workaround for the issue that happens when delta of uv = 0.0
    // TODO: Is this still required? Or shall I make a PR about it?

    if ( length( S ) == 0.0 || length( T ) == 0.0 ) {
      return surf_norm;
    }

    S = normalize( S );
    T = normalize( T );
    vec3 N = normalize( surf_norm );

    #ifdef DOUBLE_SIDED

      // Workaround for Adreno GPUs gl_FrontFacing bug. See #15850 and #10331

      bool frontFacing = dot( cross( S, T ), N ) > 0.0;

      mapN.xy *= ( float( frontFacing ) * 2.0 - 1.0 );

    #else

      mapN.xy *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );

    #endif

    mat3 tsn = mat3( S, T, N );
    return normalize( tsn * mapN );

  }

#endif

// #include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

// == lighting stuff ===========================================================
float getLightIntensity(
  const in IncidentLight directLight,
  const in GeometricContext geometry,
  const in float shadow
) {
  float lightIntensity = dot( geometry.normal, directLight.direction );
  lightIntensity = 0.5 + 0.5 * lightIntensity;
  lightIntensity = lightIntensity * shadow;
  lightIntensity = lightIntensity * 2.0 - 1.0;
  return shadingToonyFactor == 1.0
    ? step( shadingShiftFactor, lightIntensity )
    : smoothstep( shadingShiftFactor, shadingShiftFactor + ( 1.0 - shadingToonyFactor ), lightIntensity );
}

vec3 getLighting( const in vec3 lightColor ) {
  vec3 lighting = lightColor;
  lighting = mix(
    lighting,
    vec3( max( 0.001, max( lighting.x, max( lighting.y, lighting.z ) ) ) ),
    lightColorAttenuationFactor
  );

  #ifndef PHYSICALLY_CORRECT_LIGHTS
    lighting *= PI;
  #endif

  return lighting;
}

vec3 getDiffuse(
  const in vec3 lit,
  const in vec3 shade,
  const in float lightIntensity,
  const in vec3 lighting
) {
  #ifdef DEBUG_LITSHADERATE
    return vec3( BRDF_Diffuse_Lambert( lightIntensity * lighting ) );
  #endif

  return lighting * BRDF_Diffuse_Lambert( mix( shade, lit, lightIntensity ) );
}

vec3 calcDirectDiffuse(
  const in vec2 uv,
  const in vec3 lit,
  const in vec3 shade,
  in GeometricContext geometry,
  inout ReflectedLight reflectedLight
) {
  IncidentLight directLight;
  vec3 lightingSum = vec3( 0.0 );

  #if ( NUM_POINT_LIGHTS > 0 )
    PointLight pointLight;

    #pragma unroll_loop_start
    for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
      pointLight = pointLights[ i ];
      getPointDirectLightIrradiance( pointLight, geometry, directLight );

      float atten = 1.0;
      #ifdef USE_SHADOWMAP
        atten = all( bvec2( pointLight.shadow, directLight.visible ) ) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
      #endif

      float shadow = 0.5 + 0.5 * atten;
      float lightIntensity = getLightIntensity( directLight, geometry, shadow );
      vec3 lighting = getLighting( directLight.color );
      reflectedLight.directDiffuse += getDiffuse( lit, shade, lightIntensity, lighting );
      lightingSum += lighting;
    }
    #pragma unroll_loop_end
  #endif

  #if ( NUM_SPOT_LIGHTS > 0 )
    SpotLight spotLight;

    #pragma unroll_loop_start
    for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
      spotLight = spotLights[ i ];
      getSpotDirectLightIrradiance( spotLight, geometry, directLight );

      float atten = 1.0;
      #ifdef USE_SHADOWMAP
        atten = all( bvec2( spotLight.shadow, directLight.visible ) ) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;
      #endif

      float shadow = 0.5 + 0.5 * atten;
      float lightIntensity = getLightIntensity( directLight, geometry, shadow );
      vec3 lighting = getLighting( directLight.color );
      reflectedLight.directDiffuse += getDiffuse( lit, shade, lightIntensity, lighting );
      lightingSum += lighting;
    }
    #pragma unroll_loop_end
  #endif

  #if ( NUM_DIR_LIGHTS > 0 )
    DirectionalLight directionalLight;

    #pragma unroll_loop_start
    for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
      directionalLight = directionalLights[ i ];
      getDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );

      float atten = 1.0;
      #ifdef USE_SHADOWMAP
        atten = all( bvec2( directionalLight.shadow, directLight.visible ) ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
      #endif

      float shadow = 0.5 + 0.5 * atten;
      float lightIntensity = getLightIntensity( directLight, geometry, shadow );
      vec3 lighting = getLighting( directLight.color );
      reflectedLight.directDiffuse += getDiffuse( lit, shade, lightIntensity, lighting );
      lightingSum += lighting;
    }
    #pragma unroll_loop_end
  #endif

  return lightingSum;
}

// == post correction ==========================================================
void postCorrection() {
  #include <tonemapping_fragment>
  #include <encodings_fragment>
  #include <fog_fragment>
  #include <premultiplied_alpha_fragment>
  #include <dithering_fragment>
}

// == main procedure ===========================================================
void main() {
  #include <clipping_planes_fragment>

  vec2 uv = vec2(0.5, 0.5);

  #if defined( USE_MAP ) || defined( USE_SHADEMULTIPLYTEXTURE ) || defined( USE_NORMALMAP ) || defined( USE_RIMMULTIPLYTEXTURE ) || defined( USE_EMISSIVEMAP ) || defined( USE_OUTLINEWIDTHMULTIPLYTEXTURE ) || defined( USE_UVANIMATIONMASKTEXTURE )
    uv = vUv;

    float uvAnimMask = 1.0;
    #ifdef USE_UVANIMATIONMASKTEXTURE
      uvAnimMask = texture2D( uvAnimationMaskTexture, uv ).x;
    #endif

    uv = uv + vec2( uvAnimationScrollXOffset, uvAnimationScrollYOffset ) * uvAnimMask;
    float uvRotCos = cos( uvAnimationRotationPhase * uvAnimMask );
    float uvRotSin = sin( uvAnimationRotationPhase * uvAnimMask );
    uv = mat2( uvRotCos, uvRotSin, -uvRotSin, uvRotCos ) * ( uv - 0.5 ) + 0.5;
  #endif

  #ifdef DEBUG_UV
    gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
    #if defined( USE_MAP ) || defined( USE_SHADEMULTIPLYTEXTURE ) || defined( USE_NORMALMAP ) || defined( USE_RIMMULTIPLYTEXTURE ) || defined( USE_EMISSIVEMAP ) || defined( USE_OUTLINEWIDTHMULTIPLYTEXTURE ) || defined( USE_UVANIMATIONMASKTEXTURE )
      gl_FragColor = vec4( uv, 0.0, 1.0 );
    #endif
    return;
  #endif

  vec4 diffuseColor = vec4( litFactor, opacity );
  ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
  vec3 totalEmissiveRadiance = emissive;

  #include <logdepthbuf_fragment>

  // #include <map_fragment>
  #ifdef USE_MAP
    vec4 texelColor = texture2D( map, uv );
    texelColor = mapTexelToLinear( texelColor );
    diffuseColor *= texelColor;
  #endif

  #include <color_fragment>

  // #include <alphamap_fragment>

  #include <alphatest_fragment>

  #if defined( OUTLINE ) && defined( OUTLINE_COLOR_FIXED ) // omitting DebugMode
    gl_FragColor = vec4( outlineFactor, diffuseColor.a );
    postCorrection();
    return;
  #endif

  // #include <specularmap_fragment>
  #include <normal_fragment_begin>

  #ifdef OUTLINE
    normal *= -1.0;
  #endif

  // #include <normal_fragment_maps>

  #ifdef OBJECTSPACE_NORMALMAP

    normal = texture2D( normalMap, uv ).xyz * 2.0 - 1.0; // overrides both flatShading and attribute normals

    #ifdef FLIP_SIDED

      normal = - normal;

    #endif

    #ifdef DOUBLE_SIDED

      normal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );

    #endif

    normal = normalize( normalMatrix * normal );

  #elif defined( TANGENTSPACE_NORMALMAP )

    vec3 mapN = texture2D( normalMap, uv ).xyz * 2.0 - 1.0;
    mapN.xy *= normalScale;

    #ifdef USE_TANGENT

      normal = normalize( vTBN * mapN );

    #else

      normal = perturbNormal2Arb( uv, -vViewPosition, normal, mapN );

    #endif

  #endif

  // #include <emissivemap_fragment>
  #ifdef USE_EMISSIVEMAP
    totalEmissiveRadiance *= emissiveMapTexelToLinear( texture2D( emissiveMap, uv ) ).rgb;
  #endif

  #ifdef DEBUG_NORMAL
    gl_FragColor = vec4( 0.5 + 0.5 * normal, 1.0 );
    return;
  #endif

  // -- MToon: lighting --------------------------------------------------------
  // accumulation
  // #include <lights_phong_fragment>
  // #include <lights_fragment_begin>
  vec3 lit = diffuseColor.rgb;
  vec3 shade = shadeFactor;
  #ifdef USE_SHADEMULTIPLYTEXTURE
    shade *= shadeMultiplyTextureTexelToLinear( texture2D( shadeMultiplyTexture, uv ) ).rgb;
  #endif

  GeometricContext geometry;

  geometry.position = - vViewPosition;
  geometry.normal = normal;
  geometry.viewDir = normalize( vViewPosition );

  vec3 lighting = calcDirectDiffuse( uv, diffuseColor.rgb, shade, geometry, reflectedLight );

  vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
  #if ( NUM_HEMI_LIGHTS > 0 )
    #pragma unroll_loop_start
    for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
      irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );
    }
    #pragma unroll_loop_end
  #endif

  // #include <lights_fragment_maps>
  #ifdef USE_LIGHTMAP
    vec3 lightMapIrradiance = texture2D( lightMap, vUv2 ).rgb * lightMapIntensity;
    #ifndef PHYSICALLY_CORRECT_LIGHTS
      lightMapIrradiance *= PI; // factor of PI should not be present; included here to prevent breakage
    #endif
    irradiance += lightMapIrradiance;
  #endif

  // #include <lights_fragment_end>
  reflectedLight.indirectDiffuse += giIntensityFactor * irradiance * BRDF_Diffuse_Lambert( lit );

  // modulation
  #include <aomap_fragment>

  vec3 col = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;

  #if defined( OUTLINE ) && defined( OUTLINE_COLOR_MIXED )
    gl_FragColor = vec4(
      outlineFactor.rgb * mix( vec3( 1.0 ), col, outlineLightingMixFactor ),
      diffuseColor.a
    );
    postCorrection();
    return;
  #endif

  #ifdef DEBUG_LITSHADERATE
    gl_FragColor = vec4( col, diffuseColor.a );
    postCorrection();
    return;
  #endif

  // -- MToon: parametric rim lighting -----------------------------------------
  vec3 viewDir = normalize( vViewPosition );
  vec3 rimMix = mix(vec3(1.0), lighting + giIntensityFactor * irradiance, rimLightingMixFactor);
  vec3 rim = rimFactor * pow( saturate( 1.0 - dot( viewDir, normal ) + rimLiftFactor ), rimFresnelPowerFactor );
  #ifdef USE_RIMMULTIPLYTEXTURE
    rim *= rimMultiplyTextureTexelToLinear( texture2D( rimMultiplyTexture, uv ) ).rgb;
  #endif
  col += rim;

  // -- MToon: additive matcap -------------------------------------------------
  #ifdef USE_ADDITIVETEXTURE
    {
      vec3 x = normalize( vec3( viewDir.z, 0.0, -viewDir.x ) );
      vec3 y = cross( viewDir, x ); // guaranteed to be normalized
      vec2 sphereUv = 0.5 + 0.5 * vec2( dot( x, normal ), -dot( y, normal ) );
      vec3 matcap = additiveTextureTexelToLinear( texture2D( additiveTexture, sphereUv ) ).xyz;
      col += matcap;
    }
  #endif

  // -- MToon: Emission --------------------------------------------------------
  col += totalEmissiveRadiance;

  // #include <envmap_fragment>

  // -- Almost done! -----------------------------------------------------------
  gl_FragColor = vec4( col, diffuseColor.a );
  postCorrection();
}