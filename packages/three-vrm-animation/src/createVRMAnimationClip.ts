import * as THREE from 'three';
import type {
  VRMCore,
  VRMExpressionManager,
  VRMExpressionPresetName,
  VRMHumanBoneName,
  VRMHumanoid,
} from '@pixiv/three-vrm-core';
import type { VRMAnimation } from './VRMAnimation';
import { VRMLookAtQuaternionProxy } from './VRMLookAtQuaternionProxy';

export function createVRMAnimationHumanoidTracks(
  vrmAnimation: VRMAnimation,
  humanoid: VRMHumanoid,
  metaVersion: '0' | '1',
): {
  translation: Map<'hips', THREE.VectorKeyframeTrack>;
  rotation: Map<VRMHumanBoneName, THREE.QuaternionKeyframeTrack>;
} {
  const translation = new Map<'hips', THREE.VectorKeyframeTrack>();
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
      translation.set(name, track);
    }
  }

  return { translation, rotation };
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
  tracks.push(...humanoidTracks.translation.values());
  tracks.push(...humanoidTracks.rotation.values());

  if (vrm.expressionManager != null) {
    const expressionTracks = createVRMAnimationExpressionTracks(vrmAnimation, vrm.expressionManager);
    tracks.push(...expressionTracks.preset.values());
    tracks.push(...expressionTracks.custom.values());
  }

  if (vrm.lookAt != null) {
    // search VRMLookAtQuaternionProxy
    let proxy = vrm.scene.children.find((obj) => obj instanceof VRMLookAtQuaternionProxy);

    if (proxy == null) {
      // if not found, create a new one
      console.warn(
        'createVRMAnimationClip: VRMLookAtQuaternionProxy is not found. Creating a new one automatically. To suppress this warning, create a VRMLookAtQuaternionProxy manually',
      );

      proxy = new VRMLookAtQuaternionProxy(vrm.lookAt);
      proxy.name = 'VRMLookAtQuaternionProxy';
      vrm.scene.add(proxy);
    } else if (proxy.name == null) {
      // if found but name is not set, set the name automatically
      console.warn(
        'createVRMAnimationClip: VRMLookAtQuaternionProxy is found but its name is not set. Setting the name automatically. To suppress this warning, set the name manually',
      );

      proxy.name = 'VRMLookAtQuaternionProxy';
    }

    // create a track
    const track = createVRMAnimationLookAtTrack(vrmAnimation, `${proxy.name}.quaternion`);
    if (track != null) {
      tracks.push(track);
    }
  }

  return new THREE.AnimationClip('Clip', vrmAnimation.duration, tracks);
}
