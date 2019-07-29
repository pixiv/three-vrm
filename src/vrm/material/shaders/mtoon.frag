// #define PHONG

#ifdef BLENDMODE_CUTOUT
  uniform float cutoff;
#endif

uniform vec3 color;
uniform float colorAlpha;
uniform vec3 shadeColor;
#ifdef USE_SHADETEXTURE
  uniform sampler2D shadeTexture;
#endif

uniform float receiveShadowRate;
#ifdef USE_RECEIVESHADOWTEXTURE
  uniform sampler2D receiveShadowTexture;
#endif

uniform float shadingGradeRate;
#ifdef USE_SHADINGGRADETEXTURE
  uniform sampler2D shadingGradeTexture;
#endif

uniform float shadeShift;
uniform float shadeToony;
uniform float lightColorAttenuation;
uniform float indirectLightIntensity;

#ifdef USE_SPHEREADD
  uniform sampler2D sphereAdd;
#endif

uniform vec3 emissionColor;

uniform vec3 outlineColor;
uniform float outlineLightingMix;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>

// #include <uv_pars_fragment>
#if defined( USE_MAP ) || defined( USE_SHADETEXTURE ) || defined( USE_NORMALMAP ) || defined( USE_RECEIVESHADOWTEXTURE ) || defined( USE_SHADINGGRADETEXTURE ) || defined( USE_EMISSIVEMAP ) || defined( USE_OUTLINEWIDTHTEXTURE )
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
  uniform float bumpScale;

  // this number is very random, this is still a 対処療法
  #define UV_DERIVATIVE_EPSILON 1E-6

  // Per-Pixel Tangent Space Normal Mapping
  // http://hacksoflife.blogspot.ch/2009/11/per-pixel-tangent-space-normal-mapping.html
  vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {
    // Workaround for Adreno 3XX dFd*( vec3 ) bug. See #9988
    vec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );
    vec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );
    vec2 st0 = dFdx( vUv.st );
    vec2 st1 = dFdy( vUv.st );

    float scale = sign( st1.t * st0.s - st0.t * st1.s ); // we do not care about the magnitude
    vec3 S = ( q0 * st1.t - q1 * st0.t ) * scale;
    vec3 T = ( - q0 * st1.s + q1 * st0.s ) * scale;

    // See: https://hub.vroid.com/characters/5207275812824687366/models/1630298405840303507
    if ( length( S ) == 0.0 || length( T ) == 0.0 ) {
      return surf_norm;
    }

    S = normalize( S );
    T = normalize( T );

    vec3 N = normalize( surf_norm );
    mat3 tsn = mat3( S, T, N );
    vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
    mapN.xy *= bumpScale;
    mapN.xy *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );
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
  const in float shadow,
  const in float shadingGrade
) {
  float lightIntensity = dot( geometry.normal, directLight.direction );
  lightIntensity = 0.5 + 0.5 * lightIntensity;
  lightIntensity = lightIntensity * shadow;
  lightIntensity = lightIntensity * shadingGrade;
  lightIntensity = lightIntensity * 2.0 - 1.0;
  return smoothstep( shadeShift, shadeShift + ( 1.0 - shadeToony ), lightIntensity );
}

vec3 getDiffuse(
  const in vec3 lit,
  const in vec3 shade,
  const in float lightIntensity,
  const in vec3 lightColor
) {
  vec3 lighting = lightColor;
  lighting = mix(
    lighting,
    vec3( max( 0.001, max( lighting.x, max( lighting.y, lighting.z ) ) ) ),
    lightColorAttenuation
  );

  #ifndef PHYSICALLY_CORRECT_LIGHTS
    lighting *= PI;
  #endif

  #ifdef DEBUG_LITSHADERATE
    return vec3( BRDF_Diffuse_Lambert( lightIntensity * lighting ) );
  #endif

  return lighting * BRDF_Diffuse_Lambert( mix( shade, lit, lightIntensity ) );
}

void calcDirectDiffuse(
  const in vec3 lit,
  const in vec3 shade,
  in GeometricContext geometry,
  inout ReflectedLight reflectedLight
) {
  IncidentLight directLight;

  float shadingGrade = 1.0;
  #ifdef USE_SHADINGGRADETEXTURE
    shadingGrade = 1.0 - shadingGradeRate * ( 1.0 - texture2D( shadingGradeTexture, vUv ).r );
  #endif

  float receiveShadow = receiveShadowRate;
  #ifdef USE_RECEIVESHADOWTEXTURE
    receiveShadow *= texture2D( receiveShadowTexture, vUv ).a;
  #endif

  #if ( NUM_POINT_LIGHTS > 0 )
    PointLight pointLight;

    #pragma unroll_loop
    for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
      pointLight = pointLights[ i ];
      getPointDirectLightIrradiance( pointLight, geometry, directLight );

      float atten = 1.0;
      #ifdef USE_SHADOWMAP
        atten = all( bvec2( pointLight.shadow, directLight.visible ) ) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
      #endif

      float shadow = 1.0 - receiveShadow * ( 1.0 - ( 0.5 + 0.5 * atten ) );
      float lightIntensity = getLightIntensity( directLight, geometry, shadow, shadingGrade );
      reflectedLight.directDiffuse += getDiffuse( lit, shade, lightIntensity, directLight.color );
    }
  #endif

  #if ( NUM_SPOT_LIGHTS > 0 )
    SpotLight spotLight;

    #pragma unroll_loop
    for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
      spotLight = spotLights[ i ];
      getSpotDirectLightIrradiance( spotLight, geometry, directLight );

      float atten = 1.0;
      #ifdef USE_SHADOWMAP
        atten = all( bvec2( spotLight.shadow, directLight.visible ) ) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;
      #endif

      float shadow = 1.0 - receiveShadow * ( 1.0 - ( 0.5 + 0.5 * atten ) );
      float lightIntensity = getLightIntensity( directLight, geometry, shadow, shadingGrade );
      reflectedLight.directDiffuse += getDiffuse( lit, shade, lightIntensity, directLight.color );
    }
  #endif

  #if ( NUM_DIR_LIGHTS > 0 )
    DirectionalLight directionalLight;

    #pragma unroll_loop
    for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
      directionalLight = directionalLights[ i ];
      getDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );

      float atten = 1.0;
      #ifdef USE_SHADOWMAP
        atten = all( bvec2( directionalLight.shadow, directLight.visible ) ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
      #endif

      float shadow = 1.0 - receiveShadow * ( 1.0 - ( 0.5 + 0.5 * atten ) );
      float lightIntensity = getLightIntensity( directLight, geometry, shadow, shadingGrade );
      reflectedLight.directDiffuse += getDiffuse( lit, shade, lightIntensity, directLight.color );
    }
  #endif
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

  #ifdef DEBUG_UV
    gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
    #if defined( USE_MAP ) || defined( USE_NORMALMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP )
      gl_FragColor = vec4( vUv, 0.0, 1.0 );
    #endif
    return;
  #endif

  vec4 diffuseColor = vec4( color, colorAlpha );
  ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
  vec3 totalEmissiveRadiance = emissionColor;

  #include <logdepthbuf_fragment>

  // #include <map_fragment>
  #ifdef USE_MAP
    diffuseColor *= mapTexelToLinear( texture2D( map, vUv ) );
  #endif

  #include <color_fragment>
  // #include <alphamap_fragment>

  // -- MToon: alpha -----------------------------------------------------------
  // #include <alphatest_fragment>
  #ifdef BLENDMODE_CUTOUT
    if ( diffuseColor.a <= cutoff ) { discard; }
    diffuseColor.a = 1.0;
  #endif

  #ifdef BLENDMODE_OPAQUE
    diffuseColor.a = 1.0;
  #endif

  #if defined( OUTLINE ) && defined( OUTLINE_COLOR_FIXED ) // omitting DebugMode
    gl_FragColor = vec4( outlineColor, diffuseColor.a );
    postCorrection();
    return;
  #endif

  // #include <specularmap_fragment>
  #include <normal_fragment_begin>

  #ifdef OUTLINE
    normal *= -1.0;
  #endif

  #include <normal_fragment_maps>

  // #include <emissivemap_fragment>
  #ifdef USE_EMISSIVEMAP
    totalEmissiveRadiance *= emissiveMapTexelToLinear( texture2D( emissiveMap, vUv ) ).rgb;
  #endif

  if (normal.z < 0.0) { // TODO: temporary treatment against Snapdragon issue
    normal = -normal;
  }

  #ifdef DEBUG_NORMAL
    gl_FragColor = vec4( 0.5 + 0.5 * normal, 1.0 );
    return;
  #endif

  // -- MToon: lighting --------------------------------------------------------
  // accumulation
  // #include <lights_phong_fragment>
  // #include <lights_fragment_begin>
  vec3 lit = diffuseColor.rgb;
  vec3 shade = shadeColor;
  #ifdef USE_SHADETEXTURE
    shade *= shadeTextureTexelToLinear( texture2D( shadeTexture, vUv ) ).rgb;
  #endif

  GeometricContext geometry;

  geometry.position = - vViewPosition;
  geometry.normal = normal;
  geometry.viewDir = normalize( vViewPosition );

  calcDirectDiffuse( diffuseColor.rgb, shade, geometry, reflectedLight );

  vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
  #if ( NUM_HEMI_LIGHTS > 0 )
    #pragma unroll_loop
    for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
      irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );
    }
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
  reflectedLight.indirectDiffuse += indirectLightIntensity * irradiance * BRDF_Diffuse_Lambert( lit );

  // modulation
  #include <aomap_fragment>

  vec3 col = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;

  #if defined( OUTLINE ) && defined( OUTLINE_COLOR_MIXED ) // omitting DebugMode
    gl_FragColor = vec4(
      outlineColor.rgb * mix( vec3( 1.0 ), col, outlineLightingMix ),
      diffuseColor.a
    );
    postCorrection();
    return;
  #endif

  // -- MToon: additive matcap -------------------------------------------------
  #ifdef USE_SPHEREADD
    {
      vec3 viewDir = normalize( vViewPosition );
      vec3 x = normalize( vec3( viewDir.z, 0.0, -viewDir.x ) );
      vec3 y = cross( viewDir, x ); // guaranteed to be normalized
      vec2 uv = 0.5 + 0.5 * vec2( dot( x, normal ), -dot( y, normal ) );
      vec4 rimLighting = sphereAddTexelToLinear( texture2D( sphereAdd, uv ) );
      col.rgb += rimLighting.rgb;
    }
  #endif

  // -- MToon: Emission --------------------------------------------------------
  col += totalEmissiveRadiance;

  // #include <envmap_fragment>

  // -- Almost done! -----------------------------------------------------------
  gl_FragColor = vec4( col, diffuseColor.a );
  postCorrection();
}