import * as Nodes from 'three/examples/jsm/nodes/Nodes.js';
import {
  matcap,
  parametricRimColor,
  parametricRimFresnelPower,
  parametricRimLift,
  rimLightingMix,
  rimMultiply,
  shadeColor,
  shadingShift,
  shadingToony,
} from './immutableNodes';

// TODO: 0% confidence about function types.

const linearstep = Nodes.tslFn(
  ({
    a,
    b,
    t,
  }: {
    a: Nodes.ShaderNodeObject<Nodes.Node>;
    b: Nodes.ShaderNodeObject<Nodes.Node>;
    t: Nodes.ShaderNodeObject<Nodes.Node>;
  }) => {
    const top = t.sub(a);
    const bottom = b.sub(a);
    return top.div(bottom).clamp();
  },
);

/**
 * Convert NdotL into toon shading factor using shadingShift and shadingToony
 */
const getShading = Nodes.tslFn(({ dotNL }: { dotNL: Nodes.ShaderNodeObject<Nodes.Node> }) => {
  const shadow = 1.0; // TODO

  const feather = Nodes.float(1.0).sub(shadingToony);

  let shading: Nodes.ShaderNodeObject<Nodes.Node> = dotNL.add(shadingShift);
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
const getDiffuse = Nodes.tslFn(
  ({
    shading,
    lightColor,
  }: {
    shading: Nodes.ShaderNodeObject<Nodes.Node>;
    lightColor: Nodes.ShaderNodeObject<Nodes.Node>;
  }) => {
    const diffuseColor = Nodes.mix(shadeColor, Nodes.diffuseColor, shading);
    const col = lightColor.mul(Nodes.BRDF_Lambert({ diffuseColor }));

    return col;
  },
);

/**
 * Do the rim lighting.
 */
const getParametricRim = Nodes.tslFn(() => {
  const viewDir = Nodes.modelViewPosition.normalize();
  const dotNV = Nodes.transformedNormalView.dot(viewDir.negate());

  const rim = Nodes.float(1.0).sub(dotNV).add(parametricRimLift).clamp().pow(parametricRimFresnelPower);

  return rim.mul(parametricRimColor);
});

interface MToonLightingModelContext {
  lightDirection: Nodes.ShaderNodeObject<Nodes.Node>;
  lightColor: Nodes.ShaderNodeObject<Nodes.Node>;
  irradiance: Nodes.ShaderNodeObject<Nodes.Node>;
  reflectedLight: {
    directDiffuse: Nodes.ShaderNodeObject<Nodes.Node>;
    directSpecular: Nodes.ShaderNodeObject<Nodes.Node>;
    indirectDiffuse: Nodes.ShaderNodeObject<Nodes.Node>;
    indirectSpecular: Nodes.ShaderNodeObject<Nodes.Node>;
  };
}

export class MToonLightingModel extends Nodes.LightingModel {
  constructor() {
    super();
  }

  direct({ lightDirection, lightColor, reflectedLight }: MToonLightingModelContext) {
    const dotNL = Nodes.transformedNormalView.dot(lightDirection).clamp(-1.0, 1.0);

    // toon diffuse
    const shading = getShading({
      dotNL,
    });

    reflectedLight.directDiffuse.addAssign(
      getDiffuse({
        shading,
        lightColor,
      }),
    );

    // rim
    const rim = getParametricRim();
    reflectedLight.directSpecular.addAssign(
      rim
        .add(matcap)
        .mul(rimMultiply)
        .mul(Nodes.mix(Nodes.vec3(0.0), lightColor, rimLightingMix)),
    );
  }

  indirectDiffuse({ irradiance, reflectedLight }: MToonLightingModelContext) {
    // indirect irradiance
    reflectedLight.indirectDiffuse.addAssign(
      irradiance.mul(
        Nodes.BRDF_Lambert({
          diffuseColor: Nodes.diffuseColor,
        }),
      ),
    );
  }

  indirectSpecular({ reflectedLight }: MToonLightingModelContext) {
    // rim
    const rim = getParametricRim();
    reflectedLight.indirectSpecular.addAssign(
      rim
        .add(matcap)
        .mul(rimMultiply)
        .mul(Nodes.mix(Nodes.vec3(1.0), Nodes.vec3(0.0), rimLightingMix)),
    );
  }
}
