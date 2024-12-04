import { VRMCore } from '@pixiv/three-vrm-core';
/**
 * Combine morph targets by VRM expressions.
 *
 * This function prevents crashes caused by the limitation of the number of morph targets, especially on mobile devices.
 *
 * @param vrm The VRM instance
 */
export declare function combineMorphs(vrm: VRMCore): void;
