import * as THREE from 'three';
import type { VRMExpressionPresetName, VRMHumanBoneName } from '@pixiv/three-vrm-core';
/**
 * Represents a single VRM Animation.
 * You probably want to create an AnimationClip using {@link createVRMAnimationClip}.
 */
export declare class VRMAnimation {
    duration: number;
    restHipsPosition: THREE.Vector3;
    humanoidTracks: {
        translation: Map<'hips', THREE.VectorKeyframeTrack>;
        rotation: Map<VRMHumanBoneName, THREE.QuaternionKeyframeTrack>;
    };
    expressionTracks: {
        preset: Map<VRMExpressionPresetName, THREE.NumberKeyframeTrack>;
        custom: Map<string, THREE.NumberKeyframeTrack>;
    };
    lookAtTrack: THREE.QuaternionKeyframeTrack | null;
    constructor();
}
