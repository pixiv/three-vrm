import * as THREE from 'three/webgpu';
import { float, Fn, modelViewPosition, transformedNormalView } from 'three/tsl';

export const mtoonParametricRim = Fn(
  ({
    parametricRimLift,
    parametricRimFresnelPower,
    parametricRimColor,
  }: {
    parametricRimLift: THREE.Node<'float'>;
    parametricRimFresnelPower: THREE.Node<'float'>;
    parametricRimColor: THREE.Node<'vec3'>;
  }) => {
    const viewDir = modelViewPosition.normalize();
    const dotNV = transformedNormalView.dot(viewDir.negate());

    const rim = float(1.0).sub(dotNV).add(parametricRimLift).clamp().pow(parametricRimFresnelPower);

    return rim.mul(parametricRimColor);
  },
);
