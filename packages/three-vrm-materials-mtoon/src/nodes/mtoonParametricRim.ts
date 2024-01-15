import * as Nodes from 'three/examples/jsm/nodes/Nodes.js';

export const mtoonParametricRim = Nodes.tslFn(
  ({
    parametricRimLift,
    parametricRimFresnelPower,
    parametricRimColor,
  }: {
    parametricRimLift: Nodes.NodeRepresentation;
    parametricRimFresnelPower: Nodes.NodeRepresentation;
    parametricRimColor: Nodes.NodeRepresentation;
  }) => {
    const viewDir = Nodes.modelViewPosition.normalize();
    const dotNV = Nodes.transformedNormalView.dot(viewDir.negate());

    const rim = Nodes.float(1.0).sub(dotNV).add(parametricRimLift).clamp().pow(parametricRimFresnelPower);

    return rim.mul(parametricRimColor);
  },
);
