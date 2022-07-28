/* global THREE, mixamoVRMRigMap*/

/**
 * Mixamoのアニメーションを読み込み、VRM向けに調整して返す
 * @param {string} url Mixamoのモーションが入ったURL
 * @param {VRM} vrm VRMモデル
 * @returns {Promise<THREE.AnimationClip>} AnimationClip
 */
function loadMixamoAnimation(url, vrm) {
  const loader = new THREE.FBXLoader(); // FBXを読み込むLoader
  return loader.loadAsync(url).then((asset) => {
    const clip = THREE.AnimationClip.findByName(asset.animations, 'mixamo.com'); // AnimationClipを抽出する

    const tracks = []; // VRM用のKeyframeTrackをこの配列に格納する

    clip.tracks.forEach((track) => {
      // 各TrackをVRM向けに変換し、 `tracks` に格納する
      const trackSplitted = track.name.split('.');
      const mixamoRigName = trackSplitted[0];
      const vrmBoneName = mixamoVRMRigMap[mixamoRigName];
      const vrmNodeName = vrm.humanoid?.humanoidRig.getBoneNode(vrmBoneName)?.name;
      if (!vrmNodeName) {
        console.log(vrmBoneName);
      }
      if (vrmNodeName != null) {
        const propertyName = trackSplitted[1];

        if (track instanceof THREE.QuaternionKeyframeTrack) {
          tracks.push(
            new THREE.QuaternionKeyframeTrack(
              `${vrmNodeName}.${propertyName}`,
              track.times,
              track.values.map((v, i) => (vrm.meta?.metaVersion === '0' && i % 2 === 0 ? -v : v)),
            ),
          );
        } else if (track instanceof THREE.VectorKeyframeTrack) {
          tracks.push(
            new THREE.VectorKeyframeTrack(
              `${vrmNodeName}.${propertyName}`,
              track.times,
              track.values.map((v, i) => (vrm.meta?.metaVersion === '0' && i % 3 !== 1 ? -v : v) * 0.01),
            ),
          );
        }
      }

      console.log(track);
    });

    return new THREE.AnimationClip('vrmAnimation', clip.duration, tracks);
  });
}
