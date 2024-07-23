import * as THREE from 'three/webgpu';
import {
  matcap,
  parametricRim,
  rimLightingMix,
  rimMultiply,
  shadeColor,
  shadingShift,
  shadingToony,
} from './immutableNodes';

// TODO: 0% confidence about function types.

const linearstep = THREE.tslFn(
  ({
    a,
    b,
    t,
  }: {
    a: THREE.ShaderNodeObject<THREE.Node>;
    b: THREE.ShaderNodeObject<THREE.Node>;
    t: THREE.ShaderNodeObject<THREE.Node>;
  }) => {
    const top = t.sub(a);
    const bottom = b.sub(a);
    return top.div(bottom).clamp();
  },
);

/**
 * Convert NdotL into toon shading factor using shadingShift and shadingToony
 */
const getShading = THREE.tslFn(({ dotNL }: { dotNL: THREE.ShaderNodeObject<THREE.Node> }) => {
  const shadow = 1.0; // TODO

  const feather = THREE.float(1.0).sub(shadingToony);

  let shading: THREE.ShaderNodeObject<THREE.Node> = dotNL.add(shadingShift);
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
const getDiffuse = THREE.tslFn(
  ({
    shading,
    lightColor,
  }: {
    shading: THREE.ShaderNodeObject<THREE.Node>;
    lightColor: THREE.ShaderNodeObject<THREE.Node>;
  }) => {
    const diffuseColor = THREE.mix(shadeColor, THREE.diffuseColor, shading);
    const col = lightColor.mul(THREE.BRDF_Lambert({ diffuseColor }));

    return col;
  },
);

export class MToonLightingModel extends THREE.LightingModel {
  constructor() {
    super();
  }

  direct({ lightDirection, lightColor, reflectedLight }: THREE.LightingModelDirectInput) {
    const dotNL = THREE.transformedNormalView.dot(lightDirection).clamp(-1.0, 1.0);

    // toon diffuse
    const shading = getShading({
      dotNL,
    });

    // Unable to use `addAssign` in the current @types/three, we use `assign` and `add` instead
    // TODO: Fix the `addAssign` issue from the `@types/three` side

    (reflectedLight.directDiffuse as THREE.ShaderNodeObject<THREE.Node>).assign(
      (reflectedLight.directDiffuse as THREE.ShaderNodeObject<THREE.Node>).add(
        getDiffuse({
          shading,
          lightColor: lightColor as THREE.ShaderNodeObject<THREE.Node>,
        }),
      ),
    );

    // rim
    (reflectedLight.directSpecular as THREE.ShaderNodeObject<THREE.Node>).assign(
      (reflectedLight.directSpecular as THREE.ShaderNodeObject<THREE.Node>).add(
        parametricRim
          .add(matcap)
          .mul(rimMultiply)
          .mul(THREE.mix(THREE.vec3(0.0), THREE.BRDF_Lambert({ diffuseColor: lightColor }), rimLightingMix)),
      ),
    );
  }

  indirectDiffuse({ irradiance, reflectedLight }: THREE.LightingModelIndirectInput) {
    // indirect irradiance
    (reflectedLight.indirectDiffuse as THREE.ShaderNodeObject<THREE.Node>).assign(
      (reflectedLight.indirectDiffuse as THREE.ShaderNodeObject<THREE.Node>).add(
        (irradiance as THREE.ShaderNodeObject<THREE.Node>).mul(
          THREE.BRDF_Lambert({
            diffuseColor: THREE.diffuseColor,
          }),
        ),
      ),
    );
  }

  indirectSpecular({ reflectedLight }: THREE.LightingModelIndirectInput) {
    // rim
    (reflectedLight.indirectSpecular as THREE.ShaderNodeObject<THREE.Node>).assign(
      (reflectedLight.indirectSpecular as THREE.ShaderNodeObject<THREE.Node>).add(
        parametricRim
          .add(matcap)
          .mul(rimMultiply)
          .mul(THREE.mix(THREE.vec3(1.0), THREE.vec3(0.0), rimLightingMix)),
      ),
    );
  }
}
