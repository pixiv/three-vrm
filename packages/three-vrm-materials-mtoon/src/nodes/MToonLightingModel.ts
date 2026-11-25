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
const getShading = Fn(({ dotNL, shadow }: { dotNL: THREE.Node<'float'>; shadow: THREE.Node<'float'> }) => {
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
  const feathered = mix(shadeColor, diffuseColor.rgb, shading);
  const col = lightColor.mul(BRDF_Lambert({ diffuseColor: feathered }));

  return col;
});

/**
 * The parts of three's `AnalyticLightNode` that hold its shadow. They aren't in `@types/three`.
 */
type AnalyticLightNodeWithShadow = THREE.AnalyticLightNode<THREE.Light> & {
  colorNode: THREE.Node;
  baseColorNode: THREE.Node | null;
  shadowNode: THREE.Node | null;
};

/**
 * Split the shadow off a direct light's color.
 *
 * When a light casts a shadow on the object, three multiplies the shadow into the light's color
 * (`AnalyticLightNode.setupShadow`). MToon needs the two apart: the shadow goes into the toon shading,
 * so a shadowed fragment shows the shade color under the full light, as `mtoon.frag` does.
 * The color without the shadow comes from the light node's own `setupDirect`, run on its color before the shadow,
 * so the spot cone, distance attenuation and projected maps are kept for any light type.
 */
function splitShadow(
  lightNode: AnalyticLightNodeWithShadow | undefined,
  lightColor: THREE.Node<'vec3'>,
  builder: THREE.NodeBuilder,
): { lightColor: THREE.Node<'vec3'>; shadow: THREE.Node<'float'> } {
  const hasShadow =
    lightNode != null &&
    lightNode.shadowNode != null &&
    lightNode.baseColorNode != null &&
    lightNode.colorNode !== lightNode.baseColorNode && // the object receives the shadow
    !(builder.context as { getShadow?: unknown }).getShadow; // a pass with its own shadow handling: leave it

  if (!hasShadow) {
    return { lightColor, shadow: float(1.0) };
  }

  const shadowedColorNode = lightNode.colorNode;
  lightNode.colorNode = lightNode.baseColorNode!;
  const unshadowed = lightNode.setupDirect(builder)?.lightColor as THREE.Node<'vec3'> | undefined;
  lightNode.colorNode = shadowedColorNode;

  if (unshadowed == null) {
    return { lightColor, shadow: float(1.0) };
  }

  return { lightColor: unshadowed, shadow: lightNode.shadowNode as THREE.Node<'float'> };
}

export class MToonLightingModel extends THREE.LightingModel {
  constructor() {
    super();
  }

  direct(
    { lightDirection, lightColor: shadowedLightColor, lightNode, reflectedLight }: THREE.LightingModelDirectInput,
    builder: THREE.NodeBuilder,
  ) {
    const dotNL = transformedNormalView.dot(lightDirection as THREE.Node<'vec3'>).clamp(-1.0, 1.0);

    // the shadow goes into the toon shading, not the light color
    const { lightColor, shadow } = splitShadow(
      lightNode as AnalyticLightNodeWithShadow | undefined,
      shadowedLightColor as THREE.Node<'vec3'>,
      builder,
    );

    // toon diffuse
    const shading = getShading({
      dotNL,
      shadow,
    });

    (reflectedLight.directDiffuse as THREE.Node<'vec3'>).addAssign(
      getDiffuse({
        shading,
        lightColor,
      }),
    );

    // rim
    (reflectedLight.directSpecular as THREE.Node<'vec3'>).addAssign(
      parametricRim
        .add(matcap)
        .mul(rimMultiply)
        .mul(mix(vec3(0.0), BRDF_Lambert({ diffuseColor: lightColor }), rimLightingMix)),
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
      (irradiance as THREE.Node<'vec3'>).mul(BRDF_Lambert({ diffuseColor: diffuseColor.rgb })),
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
