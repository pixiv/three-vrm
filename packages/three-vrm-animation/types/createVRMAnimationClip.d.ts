import * as THREE from 'three';
import type { VRMCore, VRMExpressionManager, VRMExpressionPresetName, VRMHumanBoneName, VRMHumanoid } from '@pixiv/three-vrm-core';
import type { VRMAnimation } from './VRMAnimation';
export declare function createVRMAnimationHumanoidTracks(vrmAnimation: VRMAnimation, humanoid: VRMHumanoid, metaVersion: '0' | '1'): {
    translation: Map<'hips', THREE.VectorKeyframeTrack>;
    rotation: Map<VRMHumanBoneName, THREE.QuaternionKeyframeTrack>;
};
export declare function createVRMAnimationExpressionTracks(vrmAnimation: VRMAnimation, expressionManager: VRMExpressionManager): {
    preset: Map<VRMExpressionPresetName, THREE.NumberKeyframeTrack>;
    custom: Map<string, THREE.NumberKeyframeTrack>;
};
export declare function createVRMAnimationLookAtTrack(vrmAnimation: VRMAnimation, trackName: string): THREE.KeyframeTrack | null;
/**
 * Create an AnimationClip out of the given VRMAnimation and the VRM.
 *
 * @param vrmAnimation A {@link VRMAnimation}.
 * @param vrm A {@link VRMCore}.
 * @returns An AnimationClip
 */
export declare function createVRMAnimationClip(vrmAnimation: VRMAnimation, vrm: VRMCore): THREE.AnimationClip;
