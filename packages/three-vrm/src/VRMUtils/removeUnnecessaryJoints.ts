import * as THREE from 'three';

function isSuperset<T>(set: Set<T>, supersetCand: Set<T>): boolean {
  for (const elem of set) {
    if (!supersetCand.has(elem)) {
      return false;
    }
  }

  return true;
}

/**
 * Traverse given object and remove unnecessarily bound joints from every `THREE.SkinnedMesh`.
 * Some environments like mobile devices have a lower limit of bones and might be unable to perform mesh skinning, this function might resolve such an issue.
 * Also this function might greatly improve the performance of mesh skinning.
 *
 * @param root Root object that will be traversed
 */
export function removeUnnecessaryJoints(root: THREE.Object3D): void {
  // set of skinned meshes
  const skinnedMeshes: THREE.SkinnedMesh[] = [];

  // set of bones that are used by the skinned mesh, for each skinned mesh
  const usedBoneSetArray: Set<THREE.Bone>[] = [];

  // Traverse an entire tree to get all skinned meshes
  root.traverse((obj) => {
    if (obj.type !== 'SkinnedMesh') {
      return;
    }

    const mesh = obj as THREE.SkinnedMesh;
    skinnedMeshes.push(mesh);

    // list up used bones by seeing the skinIndex attribute
    const usedBoneSet = new Set<THREE.Bone>();

    const bones = mesh.skeleton.bones;

    const geometry = mesh.geometry;
    const skinIndexArray = (geometry.getAttribute('skinIndex') as THREE.BufferAttribute).array;
    const skinWeightArray = (geometry.getAttribute('skinWeight') as THREE.BufferAttribute).array;

    for (let i = 0; i < skinIndexArray.length; i++) {
      const index = skinIndexArray[i];
      const weight = skinWeightArray[i];
      if (weight !== 0) {
        usedBoneSet.add(bones[index]);
      }
    }

    usedBoneSetArray.push(usedBoneSet);
  });

  // find superset of used bones for each skinned mesh
  const supersetIndexArray: number[] = [];

  usedBoneSetArray.forEach((a, ia) => {
    let superset = a;
    let supersetIndex: number = ia;

    usedBoneSetArray.forEach((b, ib) => {
      if (isSuperset(a, b) && superset.size <= b.size) {
        superset = b;
        supersetIndex = ib;
      }
    });

    supersetIndexArray.push(supersetIndex);
  });

  // create a reduced skeleton and skin index for each skinned mesh
  const skeletonArray: (THREE.Skeleton | undefined)[] = [];

  skinnedMeshes.forEach((mesh, i) => {
    const supersetIndex = supersetIndexArray[i];
    let skeleton = skeletonArray[supersetIndex];

    const bones = Array.from(usedBoneSetArray[supersetIndex]);

    // create a new skeleton if not exists
    if (skeleton == null) {
      const mesh = skinnedMeshes[supersetIndex];
      const boneInverses = bones.map((bone) => {
        const index = mesh.skeleton.bones.indexOf(bone);
        return mesh.skeleton.boneInverses[index];
      });

      skeleton = new THREE.Skeleton(bones, boneInverses);
      skeletonArray[supersetIndex] = skeleton;
    }

    // create a map from old bone index to new bone index
    const boneIndexMap: (number | undefined)[] = [];
    bones.forEach((bone, i) => {
      boneIndexMap[mesh.skeleton.bones.indexOf(bone)] = i;
    });

    // replace with new indices
    const geometry = mesh.geometry;
    const skinIndexAttr = geometry.getAttribute('skinIndex') as THREE.BufferAttribute;
    const skinIndexArray = skinIndexAttr.array;
    const skinWeightArray = (geometry.getAttribute('skinWeight') as THREE.BufferAttribute).array;

    for (let i = 0; i < skinIndexArray.length; i++) {
      const index = skinIndexArray[i];
      const weight = skinWeightArray[i];

      if (weight !== 0) {
        skinIndexArray[i] = boneIndexMap[index]!;
      } else {
        skinIndexArray[i] = 0;
      }
    }

    skinIndexAttr.copyArray(skinIndexArray);
    skinIndexAttr.needsUpdate = true;

    mesh.bind(skeleton, new THREE.Matrix4());
    //                  ^^^^^^^^^^^^^^^^^^^ transform of meshes must be ignored
    // See: https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html#joint-hierarchy
  });
}
