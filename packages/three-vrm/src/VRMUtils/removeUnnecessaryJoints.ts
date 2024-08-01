import * as THREE from 'three';

/**
 * Traverse the given object and remove unnecessarily bound joints from every `THREE.SkinnedMesh`.
 *
 * Some environments like mobile devices have a lower limit of bones
 * and might be unable to perform mesh skinning with many bones.
 * This function might resolve such an issue.
 *
 * Also, this function might significantly improve the performance of mesh skinning.
 *
 * @param root Root object that will be traversed
 */
export function removeUnnecessaryJoints(
  root: THREE.Object3D,
  options?: {
    /**
     * If `true`, this function will compensate skeletons with dummy bones to keep the bone count same between skeletons.
     *
     * This option might be effective for the shader compilation performance that matters to the initial rendering time in WebGPURenderer,
     * especially when the model loaded has many materials and the dependent bone count is different between them.
     *
     * Consider this parameter as experimental. We might modify or delete this API without notice in the future.
     *
     * `false` by default.
     */
    experimentalSameBoneCounts?: boolean;
  },
): void {
  const experimentalSameBoneCounts = options?.experimentalSameBoneCounts ?? false;

  // Traverse an entire tree, and collect all skinned meshes
  const skinnedMeshes: THREE.SkinnedMesh[] = [];

  root.traverse((obj) => {
    if (obj.type !== 'SkinnedMesh') {
      return;
    }

    skinnedMeshes.push(obj as THREE.SkinnedMesh);
  });

  // A map from meshes to bones and boneInverses
  // some meshes might share a same skinIndex attribute, and this map also prevents to convert the attribute twice
  const bonesList: Map<
    THREE.SkinnedMesh,
    {
      bones: THREE.Bone[];
      boneInverses: THREE.Matrix4[];
    }
  > = new Map();

  // A maximum number of bones
  let maxBones = 0;

  // Iterate over all skinned meshes and collect bones and boneInverses
  for (const mesh of skinnedMeshes) {
    const geometry = mesh.geometry;
    const attribute = geometry.getAttribute('skinIndex') as THREE.BufferAttribute;

    const bones: THREE.Bone[] = []; // new list of bone
    const boneInverses: THREE.Matrix4[] = []; // new list of boneInverse
    const boneIndexMap: { [index: number]: number } = {}; // map of old bone index vs. new bone index

    // create a new bone map
    const array = attribute.array;
    for (let i = 0; i < array.length; i++) {
      const index = array[i];

      // new skinIndex buffer
      if (boneIndexMap[index] == null) {
        boneIndexMap[index] = bones.length;
        bones.push(mesh.skeleton.bones[index]);
        boneInverses.push(mesh.skeleton.boneInverses[index]);
      }

      array[i] = boneIndexMap[index];
    }

    // replace with new indices
    attribute.copyArray(array);
    attribute.needsUpdate = true;

    // update boneList
    bonesList.set(mesh, { bones, boneInverses });

    // update max bones count
    maxBones = Math.max(maxBones, bones.length);
  }

  // Let's actually set the skeletons
  for (const mesh of skinnedMeshes) {
    const { bones, boneInverses } = bonesList.get(mesh)!;

    // if `experimentalSameBoneCounts` is `true`, compensate skeletons with dummy bones to keep the bone count same between skeletons
    if (experimentalSameBoneCounts) {
      for (let i = bones.length; i < maxBones; i++) {
        bones[i] = bones[0];
        boneInverses[i] = boneInverses[0];
      }
    }

    const skeleton = new THREE.Skeleton(bones, boneInverses);
    mesh.bind(skeleton, new THREE.Matrix4());
    //                  ^^^^^^^^^^^^^^^^^^^ transform of meshes should be ignored
    // See: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#skins
  }
}
