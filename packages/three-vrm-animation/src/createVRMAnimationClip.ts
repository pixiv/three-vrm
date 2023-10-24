import * as THREE from 'three';
import type {
  VRMCore,
  VRMExpressionManager,
  VRMExpressionPresetName,
  VRMHumanBoneName,
  VRMHumanoid,
} from '@pixiv/three-vrm-core';
import type { VRMAnimation } from './VRMAnimation';

export function createVRMAnimationHumanoidTracks(
  vrmAnimation: VRMAnimation,
  humanoid: VRMHumanoid,
  metaVersion: '0' | '1',
): {
  position: Map<'hips', THREE.VectorKeyframeTrack>;
  rotation: Map<VRMHumanBoneName, THREE.QuaternionKeyframeTrack>;
} {
  const position = new Map<'hips', THREE.VectorKeyframeTrack>();
  const rotation = new Map<VRMHumanBoneName, THREE.VectorKeyframeTrack>();

  for (const [name, origTrack] of vrmAnimation.humanoidTracks.rotation.entries()) {
    const nodeName = humanoid.getNormalizedBoneNode(name)?.name;

    if (nodeName != null) {
      const track = new THREE.QuaternionKeyframeTrack(
        `${nodeName}.quaternion`,
        origTrack.times,
        origTrack.values.map((v, i) => (metaVersion === '0' && i % 2 === 0 ? -v : v)),
      );
      rotation.set(name, track);
    }
  }

  for (const [name, origTrack] of vrmAnimation.humanoidTracks.translation.entries()) {
    const nodeName = humanoid.getNormalizedBoneNode(name)?.name;

    if (nodeName != null) {
      const animationY = vrmAnimation.restHipsPosition.y;
      const humanoidY = humanoid.normalizedRestPose.hips!.position![1];
      const scale = humanoidY / animationY;

      const track = origTrack.clone();
      track.values = track.values.map((v, i) => (metaVersion === '0' && i % 3 !== 1 ? -v : v) * scale);
      track.name = `${nodeName}.position`;
      position.set(name, track);
    }
  }

  return { position, rotation };
}

export function createVRMAnimationExpressionTracks(
  vrmAnimation: VRMAnimation,
  expressionManager: VRMExpressionManager,
): {
  preset: Map<VRMExpressionPresetName, THREE.NumberKeyframeTrack>;
  custom: Map<string, THREE.NumberKeyframeTrack>;
} {
  const preset = new Map<VRMExpressionPresetName, THREE.NumberKeyframeTrack>();
  const custom = new Map<string, THREE.NumberKeyframeTrack>();

  for (const [name, origTrack] of vrmAnimation.expressionTracks.preset.entries()) {
    const trackName = expressionManager.getExpressionTrackName(name);

    if (trackName != null) {
      const track = origTrack.clone();
      track.name = trackName;
      preset.set(name, track);
    }
  }

  for (const [name, origTrack] of vrmAnimation.expressionTracks.custom.entries()) {
    const trackName = expressionManager.getExpressionTrackName(name);

    if (trackName != null) {
      const track = origTrack.clone();
      track.name = trackName;
      custom.set(name, track);
    }
  }

  return { preset, custom };
}

export function createVRMAnimationLookAtTrack(
  vrmAnimation: VRMAnimation,
  trackName: string,
): THREE.KeyframeTrack | null {
  if (vrmAnimation.lookAtTrack == null) {
    return null;
  }

  const track = vrmAnimation.lookAtTrack.clone();
  track.name = trackName;
  return track;
}

/**
 * Create an AnimationClip out of the given VRMAnimation and the VRM.
 *
 * @param vrmAnimation A {@link VRMAnimation}.
 * @param vrm A {@link VRMCore}.
 * @returns An AnimationClip
 */
export function createVRMAnimationClip(vrmAnimation: VRMAnimation, vrm: VRMCore): THREE.AnimationClip {
  const tracks: THREE.KeyframeTrack[] = [];

  const humanoidTracks = createVRMAnimationHumanoidTracks(vrmAnimation, vrm.humanoid, vrm.meta.metaVersion);
  tracks.push(...humanoidTracks.position.values());
  tracks.push(...humanoidTracks.rotation.values());

  if (vrm.expressionManager != null) {
    const expressionTracks = createVRMAnimationExpressionTracks(vrmAnimation, vrm.expressionManager);
    tracks.push(...expressionTracks.preset.values());
    tracks.push(...expressionTracks.custom.values());
  }

  if (vrm.lookAt != null) {
    const lookAtTarget = vrm.lookAt.target;

    if (lookAtTarget == null) {
      console.warn('`vrm.lookAt.target` of the given VRM is not defined. Skipping lookAt animation');
    } else {
      if (lookAtTarget.name === '') {
        console.warn(
          '`vrm.lookAt.target.name` of the given VRM is empty. Setting the name `lookAtTarget` automatically',
        );
        lookAtTarget.name = 'lookAtTarget';
      }

      const track = createVRMAnimationLookAtTrack(vrmAnimation, `${lookAtTarget.name}.position`);

      if (track != null) {
        tracks.push(track);
      }
    }
  }

  return new THREE.AnimationClip('Clip', vrmAnimation.duration, tracks);
}
