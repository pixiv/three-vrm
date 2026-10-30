import * as THREE_TSL from 'three/tsl';
import * as THREE_WEBGPU from 'three/webgpu';

/**
 * A compat for `normalView` / `transformedNormalView`.
 * `transformedNormalView` has been renamed to `normalView` in r178,
 * and the deprecated `transformedNormalView` has been removed in r187.
 * We are going to use this compat for a while.
 *
 * See: https://github.com/mrdoob/three.js/pull/31271
 * See: https://github.com/mrdoob/three.js/pull/34517
 */
export const normalViewCompat: typeof THREE_TSL.normalView = (() => {
  // COMPAT r178: `transformedNormalView` has been renamed to `normalView`
  // Before r178, `normalView` was the geometry normal, without normal maps applied
  // See: https://github.com/mrdoob/three.js/pull/31271
  const threeRevision = parseInt(THREE_WEBGPU.REVISION, 10);
  if (threeRevision >= 178) {
    return THREE_TSL.normalView;
  } else {
    return (THREE_TSL as any).transformedNormalView;
  }
})();
