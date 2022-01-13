import * as THREE from 'three';

/**
 * Traverse given object and remove unnecessarily bound joints from every `THREE.SkinnedMesh`.
 * Some environments like mobile devices have a lower limit of bones and might be unable to perform mesh skinning, this function might resolve such an issue.
 * Also this function might greatly improve the performance of mesh skinning.
 *
 * @param root Root object that will be traversed
 */
export function removeUnnecessaryJoints(root: THREE.Object3D): void {
  // some meshes might share a same skinIndex attribute and this map prevents to convert the attribute twice
  const skeletonList: Map<THREE.BufferAttribute, THREE.Skeleton> = new Map();

  // Traverse an entire tree
  root.traverse((obj) => {
    if (obj.type !== 'SkinnedMesh') {
      return;
    }

    const mesh = obj as THREE.SkinnedMesh;
    const geometry = mesh.geometry;
    const attribute = geometry.getAttribute('skinIndex') as THREE.BufferAttribute;

    // look for existing skeleton
    let skeleton = skeletonList.get(attribute);

    if (!skeleton) {
      // generate reduced bone list
      const bones: THREE.Bone[] = []; // new list of bone
      const boneInverses: THREE.Matrix4[] = []; // new list of boneInverse
      const boneIndexMap: { [index: number]: number } = {}; // map of old bone index vs. new bone index

      // create a new bone map
      const array = attribute.array as number[];
      for (let i = 0; i < array.length; i++) {
        const index = array[i];

        // new skinIndex buffer
        if (boneIndexMap[index] === undefined) {
          boneIndexMap[index] = bones.length;
          bones.push(mesh.skeleton.bones[index]);
          boneInverses.push(mesh.skeleton.boneInverses[index]);
        }

        array[i] = boneIndexMap[index];
      }

      // replace with new indices
      attribute.copyArray(array);
      attribute.needsUpdate = true;

      // replace with new indices
      skeleton = new THREE.Skeleton(bones, boneInverses);
      skeletonList.set(attribute, skeleton);
    }

    mesh.bind(skeleton, new THREE.Matrix4());
    //                  ^^^^^^^^^^^^^^^^^^^ transform of meshes should be ignored
    // See: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#skins
  });
}
