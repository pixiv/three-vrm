import { VRM } from '../VRM';

export function rotateVRM0(vrm: VRM): void {
  if (vrm.meta?.metaVersion === '0') {
    vrm.scene.rotation.y = Math.PI;
  }
}
