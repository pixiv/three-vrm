import * as THREE from 'three/webgpu';
import { float, positionView, transformedNormalView } from 'three/tsl';
import { FnCompat } from './utils/FnCompat';

export const mtoonParametricRim = FnCompat(
  ({
    parametricRimLift,
    parametricRimFresnelPower,
    parametricRimColor,
  }: {
    parametricRimLift: THREE.TSL.OperatorNodeParameter;
    parametricRimFresnelPower: THREE.TSL.OperatorNodeParameter;
    parametricRimColor: THREE.TSL.OperatorNodeParameter;
  }) => {
    // The view direction of each fragment, as `vViewPosition` in the GLSL MToon.
    // `modelViewPosition` would be the object's origin in view space, the same for the whole mesh.
    const viewDir = positionView.normalize();
    const dotNV = transformedNormalView.dot(viewDir.negate());

    const rim = float(1.0).sub(dotNV).add(parametricRimLift).clamp().pow(parametricRimFresnelPower);

    return rim.mul(parametricRimColor);
  },
);
