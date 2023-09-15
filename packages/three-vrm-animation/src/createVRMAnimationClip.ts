import * as THREE from 'three';
import type { VRMCore, VRMExpressionManager, VRMHumanoid } from '@pixiv/three-vrm-core';
import type { VRMAnimation } from './VRMAnimation';

function createHumanoidTracks(
  vrmAnimation: VRMAnimation,
  humanoid: VRMHumanoid,
  metaVersion: '0' | '1',
): THREE.KeyframeTrack[] {
  const tracks: THREE.KeyframeTrack[] = [];

  for (const [name, origTrack] of vrmAnimation.humanoidTracks.rotation.entries()) {
    const nodeName = humanoid.getNormalizedBoneNode(name)?.name;

    if (nodeName != null) {
      const track = new THREE.QuaternionKeyframeTrack(
        `${nodeName}.quaternion`,
        origTrack.times,
        origTrack.values.map((v, i) => (metaVersion === '0' && i % 2 === 0 ? -v : v)),
      );
      tracks.push(track);
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
      tracks.push(track);
    }
  }

  return tracks;
}

function createExpressionTracks(
  vrmAnimation: VRMAnimation,
  expressionManager: VRMExpressionManager,
): THREE.KeyframeTrack[] {
  const tracks: THREE.KeyframeTrack[] = [];

  for (const [name, origTrack] of vrmAnimation.expressionTracks.entries()) {
    const trackName = expressionManager.getExpressionTrackName(name);

    if (trackName != null) {
      const track = origTrack.clone();
      track.name = trackName;
      tracks.push(track);
    }
  }

  return tracks;
}

function createLookAtTrack(vrmAnimation: VRMAnimation, trackName: string): THREE.KeyframeTrack | null {
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

  tracks.push(...createHumanoidTracks(vrmAnimation, vrm.humanoid, vrm.meta.metaVersion));

  if (vrm.expressionManager != null) {
    tracks.push(...createExpressionTracks(vrmAnimation, vrm.expressionManager));
  }

  if (vrm.lookAt != null) {
    const lookAtTarget = vrm.lookAt.target;

    if (lookAtTarget == null) {
      console.warn('`vrm.lookAt.target` of the given VRM is not defined. Skipping lookAt animation');
    } else {
      const track = createLookAtTrack(vrmAnimation, `${lookAtTarget.name}.position`);

      if (track != null) {
        tracks.push(track);
      }
    }
  }

  return new THREE.AnimationClip('Clip', vrmAnimation.duration, tracks);
}
