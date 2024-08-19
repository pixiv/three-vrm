import * as THREE from 'three/webgpu';
import { FnCompat } from './utils/FnCompat';

export const mtoonParametricRim = FnCompat(
  ({
    parametricRimLift,
    parametricRimFresnelPower,
    parametricRimColor,
  }: {
    parametricRimLift: THREE.NodeRepresentation;
    parametricRimFresnelPower: THREE.NodeRepresentation;
    parametricRimColor: THREE.NodeRepresentation;
  }) => {
    const viewDir = THREE.modelViewPosition.normalize();
    const dotNV = THREE.transformedNormalView.dot(viewDir.negate());

    const rim = THREE.float(1.0).sub(dotNV).add(parametricRimLift).clamp().pow(parametricRimFresnelPower);

    return rim.mul(parametricRimColor);
  },
);
