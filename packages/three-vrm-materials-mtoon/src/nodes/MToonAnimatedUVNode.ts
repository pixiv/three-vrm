import * as THREE from 'three/webgpu';
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

  public setup(): THREE.ShaderNodeObject<THREE.VarNode> {
    let uvAnimationMask: THREE.NodeRepresentation = 1.0;

    if (this.hasMaskTexture) {
      uvAnimationMask = THREE.vec4(refUVAnimationMaskTexture).context({ getUV: () => THREE.uv() }).r;
    }

    let uv: THREE.ShaderNodeObject<THREE.Swizzable> = THREE.uv();

    // rotate
    const phase = refUVAnimationRotationPhase.mul(uvAnimationMask);

    // WORKAROUND: THREE.rotateUV causes an issue with the mask texture
    // We are going to spin using a 100% organic handmade rotation matrix
    // uv = THREE.rotateUV(uv, phase, THREE.vec2(0.5, 0.5));

    const c = THREE.cos(phase);
    const s = THREE.sin(phase);
    uv = uv.sub(THREE.vec2(0.5, 0.5));
    uv = uv.mul(THREE.mat2(c, s, s.negate(), c));
    uv = uv.add(THREE.vec2(0.5, 0.5));

    // scroll
    const scroll = THREE.vec2(refUVAnimationScrollXOffset, refUVAnimationScrollYOffset).mul(uvAnimationMask);
    uv = uv.add(scroll);

    return uv.temp('AnimatedUV');
  }
}
