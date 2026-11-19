import * as THREE from 'three/webgpu';
import { cos, mat2, ShaderNodeObject, sin, Swizzable, uv, vec2, vec4 } from 'three/tsl';
import {
  refUVAnimationMaskTexture,
  refUVAnimationRotationPhase,
  refUVAnimationScrollXOffset,
  refUVAnimationScrollYOffset,
} from './materialReferences';

export class MToonAnimatedUVNode extends THREE.TempNode {
  public readonly hasMaskTexture: boolean;

  public constructor(hasMaskTexture: boolean) {
    super('vec2');

    this.hasMaskTexture = hasMaskTexture;
  }

  public setup(): ShaderNodeObject<THREE.VarNode> {
    let uvAnimationMask: THREE.TSL.OperatorNodeParameter = 1.0;

    if (this.hasMaskTexture) {
      // The spec refers to the B channel of uvAnimationMaskTexture, as MToonMaterial does
      uvAnimationMask = vec4(refUVAnimationMaskTexture).context({ getUV: () => uv() }).b;
    }

    let animatedUv: ShaderNodeObject<Swizzable> = uv();

    // rotate
    const phase = refUVAnimationRotationPhase.mul(uvAnimationMask);

    // WORKAROUND: THREE.rotateUV causes an issue with the mask texture
    // We are going to spin using a 100% organic handmade rotation matrix
    // animatedUv = THREE.rotateUV(animatedUv, phase, THREE.vec2(0.5, 0.5));

    const c = cos(phase);
    const s = sin(phase);
    animatedUv = animatedUv.sub(vec2(0.5, 0.5));
    animatedUv = animatedUv.mul(mat2(c, s, s.negate(), c));
    animatedUv = animatedUv.add(vec2(0.5, 0.5));

    // scroll
    const scroll = vec2(refUVAnimationScrollXOffset, refUVAnimationScrollYOffset).mul(uvAnimationMask);
    animatedUv = animatedUv.add(scroll);

    return animatedUv.toVar('AnimatedUV');
  }
}
