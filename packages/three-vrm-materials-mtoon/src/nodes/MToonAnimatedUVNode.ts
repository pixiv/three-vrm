import * as Nodes from 'three/addons/nodes/Nodes.js';
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
      uvAnimationMask = Nodes.vec4(refUVAnimationMaskTexture).context({ getUV: () => Nodes.uv() }).r;
    }

    let uv: Nodes.ShaderNodeObject<Nodes.Swizzable> = Nodes.uv();

    // rotate
    const phase = refUVAnimationRotationPhase.mul(uvAnimationMask);

    // WORKAROUND: Nodes.rotateUV causes an issue with the mask texture
    // We are going to spin using a 100% organic handmade rotation matrix
    // uv = Nodes.rotateUV(uv, phase, Nodes.vec2(0.5, 0.5));

    const c = Nodes.cos(phase);
    const s = Nodes.sin(phase);
    uv = uv.sub(Nodes.vec2(0.5, 0.5));
    uv = uv.mul(Nodes.mat2(c, s, s.negate(), c));
    uv = uv.add(Nodes.vec2(0.5, 0.5));

    // scroll
    const scroll = Nodes.vec2(refUVAnimationScrollXOffset, refUVAnimationScrollYOffset).mul(uvAnimationMask);
    uv = uv.add(scroll);

    return uv.temp('AnimatedUV');
  }
}
