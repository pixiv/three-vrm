import * as THREE from 'three/webgpu';
import { BRDF_Lambert, diffuseColor, float, mix, ShaderNodeObject, vec3 } from 'three/tsl';
import {
  matcap,
  parametricRim,
  rimLightingMix,
  rimMultiply,
  shadeColor,
  shadingShift,
  shadingToony,
} from './immutableNodes';
import { FnCompat } from './utils/FnCompat';
import { normalViewCompat } from './utils/normalViewCompat';

// TODO: 0% confidence about function types.

const linearstep = FnCompat(
  ({
    a,
    b,
    t,
  }: {
    a: ShaderNodeObject<THREE.Node>;
    b: ShaderNodeObject<THREE.Node>;
    t: ShaderNodeObject<THREE.Node>;
  }) => {
    const top = t.sub(a);
    const bottom = b.sub(a);
    return top.div(bottom).clamp();
  },
);

/**
 * Convert NdotL into toon shading factor using shadingShift and shadingToony
 */
const getShading = FnCompat(({ dotNL }: { dotNL: ShaderNodeObject<THREE.Node> }) => {
  const shadow = 1.0; // TODO

  const feather = float(1.0).sub(shadingToony);

  let shading: ShaderNodeObject<THREE.Node> = dotNL.add(shadingShift);
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
const getDiffuse = FnCompat(
  ({ shading, lightColor }: { shading: ShaderNodeObject<THREE.Node>; lightColor: ShaderNodeObject<THREE.Node> }) => {
    const feathered = mix(shadeColor, diffuseColor, shading);
    const col = lightColor.mul(BRDF_Lambert({ diffuseColor: feathered }));

    return col;
  },
);

export class MToonLightingModel extends THREE.LightingModel {
  constructor() {
    super();
  }

  direct({
    lightDirection,
    lightColor,
    reflectedLight,
  }: THREE.LightingModelDirectInput & { lightDirection: THREE.Node; lightColor: THREE.Node }) {
    const dotNL = normalViewCompat.dot(lightDirection).clamp(-1.0, 1.0);

    // toon diffuse
    const shading = getShading({
      dotNL,
    });

    (reflectedLight.directDiffuse as ShaderNodeObject<THREE.Node>).addAssign(
      getDiffuse({
        shading,
        lightColor: lightColor as ShaderNodeObject<THREE.Node>,
      }),
    );

    // rim
    (reflectedLight.directSpecular as ShaderNodeObject<THREE.Node>).addAssign(
      parametricRim
        .add(matcap)
        .mul(rimMultiply)
        .mul(mix(vec3(0.0), BRDF_Lambert({ diffuseColor: lightColor }), rimLightingMix)),
    );
  }

  // COMPAT: pre-r174
  // `builderOrContext`: `THREE.NodeBuilder` in >= r174, `LightingModelIndirectInput` (`LightingContext`) otherwise
  indirect(builderOrContext: THREE.NodeBuilder | THREE.LightingContext) {
    const context: THREE.LightingContext =
      'context' in builderOrContext ? (builderOrContext.context as unknown as THREE.LightingContext) : builderOrContext;

    this.indirectDiffuse(context);
    this.indirectSpecular(context);
  }

  indirectDiffuse(context: THREE.LightingContext) {
    const { irradiance, reflectedLight } = context;

    // indirect irradiance
    (reflectedLight.indirectDiffuse as ShaderNodeObject<THREE.Node>).addAssign(
      (irradiance as ShaderNodeObject<THREE.Node>).mul(BRDF_Lambert({ diffuseColor })),
    );
  }

  indirectSpecular(context: THREE.LightingContext) {
    const { reflectedLight } = context;

    // rim
    (reflectedLight.indirectSpecular as ShaderNodeObject<THREE.Node>).addAssign(
      parametricRim
        .add(matcap)
        .mul(rimMultiply)
        .mul(mix(vec3(1.0), vec3(0.0), rimLightingMix)),
    );
  }
}
