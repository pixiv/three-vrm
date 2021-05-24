#ifdef RENDERTYPE_CUTOUT
  uniform float cutoff;
#endif

#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
// #include <alphamap_pars_fragment>
// #include <aomap_pars_fragment>
// #include <lightmap_pars_fragment>
// #include <envmap_pars_fragment>
#include <fog_pars_fragment>
// #include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

// == main procedure ===========================================================
void main() {
  #include <clipping_planes_fragment>

  vec4 diffuseColor = vec4( 1.0 );

  #include <logdepthbuf_fragment>

  // #include <map_fragment>
  #ifdef USE_MAP
    diffuseColor *= mapTexelToLinear( texture2D( map, vUv ) );
  #endif

  #include <color_fragment>
  // #include <alphamap_fragment>

  // MToon: alpha
  // #include <alphatest_fragment>
  #ifdef RENDERTYPE_CUTOUT
    if ( diffuseColor.a <= cutoff ) { discard; }
    diffuseColor.a = 1.0;
  #endif

  #ifdef RENDERTYPE_OPAQUE
    diffuseColor.a = 1.0;
  #endif

  // #include <specularmap_fragment>

  ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );

  // accumulation (baked indirect lighting only)
  #ifdef USE_LIGHTMAP
    reflectedLight.indirectDiffuse += texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;
  #else
    reflectedLight.indirectDiffuse += vec3( 1.0 );
  #endif

  // modulation
  // #include <aomap_fragment>

  reflectedLight.indirectDiffuse *= diffuseColor.rgb;
  vec3 outgoingLight = reflectedLight.indirectDiffuse;

  // #include <envmap_fragment>

  gl_FragColor = vec4( outgoingLight, diffuseColor.a );

  #include <premultiplied_alpha_fragment>
  #include <tonemapping_fragment>
  #include <encodings_fragment>
  #include <fog_fragment>
}