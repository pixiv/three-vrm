import * as Nodes from 'three/examples/jsm/nodes/Nodes.js';
import {
  refUVAnimationMaskTexture,
  refUVAnimationRotationPhase,
  refUVAnimationScrollXOffset,
  refUVAnimationScrollYOffset,
} from './materialReferences';

export class MToonAnimatedUVNode extends Nodes.TempNode {
  public readonly hasMaskTexture: boolean;

  public constructor(hasMaskTexture: boolean) {
    super('vec2');

    this.hasMaskTexture = hasMaskTexture;
  }

  public setup(): Nodes.ShaderNodeObject<Nodes.VarNode> {
    let uvAnimationMask: Nodes.NodeRepresentation = 1.0;

    if (this.hasMaskTexture) {
      uvAnimationMask = refUVAnimationMaskTexture.context({ getUV: () => Nodes.uv() }).r;
    }

    let uv: Nodes.ShaderNodeObject<Nodes.Swizzable> = Nodes.uv();

    // scroll
    const scroll = Nodes.vec2(refUVAnimationScrollXOffset, refUVAnimationScrollYOffset).mul(uvAnimationMask);
    const phase = refUVAnimationRotationPhase.mul(uvAnimationMask);
    uv = uv.add(scroll);
    uv = Nodes.rotateUV(uv, phase, Nodes.vec2(0.5, 0.5));

    return uv.temp('AnimatedUV');
  }
}
