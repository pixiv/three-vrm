import { VRM } from '../VRM';

/**
 * If the given VRM is VRM0.0, rotate the `vrm.scene` by 180 degrees around the Y axis.
 *
 * @param vrm The target VRM
 */
export function rotateVRM0(vrm: VRM): void {
  if (vrm.meta?.metaVersion === '0') {
    vrm.scene.rotation.y = Math.PI;
  }
}
