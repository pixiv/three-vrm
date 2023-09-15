import * as THREE from 'three';
import { VRMHumanBoneName } from '@pixiv/three-vrm';
import type { createVRMAnimationClip } from './createVRMAnimationClip';

/**
 * Represents a single VRM Animation.
 * You probably want to create an AnimationClip using {@link createVRMAnimationClip}.
 */
export class VRMAnimation {
  public duration: number;
  public restHipsPosition: THREE.Vector3;

  public humanoidTracks: {
    translation: Map<VRMHumanBoneName, THREE.VectorKeyframeTrack>;
    rotation: Map<VRMHumanBoneName, THREE.QuaternionKeyframeTrack>;
  };
  public expressionTracks: Map<string, THREE.NumberKeyframeTrack>;
  public lookAtTrack: THREE.VectorKeyframeTrack | null;

  public constructor() {
    this.duration = 0.0;
    this.restHipsPosition = new THREE.Vector3();

    this.humanoidTracks = {
      translation: new Map(),
      rotation: new Map(),
    };

    this.expressionTracks = new Map();
    this.lookAtTrack = null;
  }
}
