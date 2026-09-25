import * as THREE from 'three/webgpu';
import { BRDF_Lambert, diffuseColor, float, Fn, mix, transformedNormalView, vec3 } from 'three/tsl';
import {
  matcap,
  parametricRim,
  rimLightingMix,
  rimMultiply,
  shadeColor,
  shadingShift,
  shadingToony,
} from './propertyNodes';

const linearstep = Fn(({ a, b, t }: { a: THREE.Node<'float'>; b: THREE.Node<'float'>; t: THREE.Node<'float'> }) => {
  const top = t.sub(a);
  const bottom = b.sub(a);
  return top.div(bottom).clamp();
});

/**
 * Convert NdotL into toon shading factor using shadingShift and shadingToony
 */
const getShading = Fn(({ dotNL }: { dotNL: THREE.Node<'float'> }) => {
  const shadow = 1.0; // TODO

  const feather = float(1.0).sub(shadingToony);

  let shading = dotNL.add(shadingShift);
  shading = linearstep({
    a: feather.negate(),
    b: feather,
    t: shading,
  });
  shading = shading.mul(shadow);
  return shading;
});

/**
 * Mix diffuseColor and shadeColor using shading factor and light color
 */
const getDiffuse = Fn(({ shading, lightColor }: { shading: THREE.Node<'float'>; lightColor: THREE.Node<'vec3'> }) => {
  const feathered = mix(shadeColor, diffuseColor, shading);
  const col = lightColor.mul(BRDF_Lambert({ diffuseColor: feathered }));

  return col;
});

export class MToonLightingModel extends THREE.LightingModel {
  constructor() {
    super();
  }

  direct({ lightDirection, lightColor, reflectedLight }: THREE.LightingModelDirectInput) {
    const dotNL = transformedNormalView.dot(lightDirection as THREE.Node<'vec3'>).clamp(-1.0, 1.0);

    // toon diffuse
    const shading = getShading({
      dotNL,
    });

    (reflectedLight.directDiffuse as THREE.Node<'vec3'>).addAssign(
      getDiffuse({
        shading,
        lightColor: lightColor as THREE.Node<'vec3'>,
      }),
    );

    // rim
    (reflectedLight.directSpecular as THREE.Node<'vec3'>).addAssign(
      parametricRim
        .add(matcap)
        .mul(rimMultiply)
        .mul(mix(vec3(0.0), BRDF_Lambert({ diffuseColor: lightColor as THREE.Node<'vec3'> }), rimLightingMix)),
    );
  }

  indirect(builder: THREE.NodeBuilder) {
    this.indirectDiffuse(builder);
    this.indirectSpecular(builder);
  }

  indirectDiffuse(builder: THREE.NodeBuilder) {
    const context = builder.context as THREE.LightingContext;
    const { irradiance, reflectedLight } = context;

    // indirect irradiance
    (reflectedLight.indirectDiffuse as THREE.Node<'vec3'>).addAssign(
      (irradiance as THREE.Node<'vec3'>).mul(BRDF_Lambert({ diffuseColor })),
    );
  }

  indirectSpecular(builder: THREE.NodeBuilder) {
    const context = builder.context as THREE.LightingContext;
    const { reflectedLight } = context;

    // rim
    (reflectedLight.indirectSpecular as THREE.Node<'vec3'>).addAssign(
      parametricRim
        .add(matcap)
        .mul(rimMultiply)
        .mul(mix(vec3(1.0), vec3(0.0), rimLightingMix)),
    );
  }
}
