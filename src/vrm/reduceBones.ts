import * as THREE from 'three';

export function reduceBones(root: THREE.Object3D): void {
  // Traverse an entire tree
  root.traverse((obj) => {
    if (obj.type !== 'SkinnedMesh') {
      return;
    }

    const mesh = obj as THREE.SkinnedMesh;
    const geometry = (mesh.geometry as THREE.BufferGeometry).clone();
    mesh.geometry = geometry;
    const attribute = geometry.getAttribute('skinIndex');

    // generate reduced bone list
    const bones: THREE.Bone[] = []; // new list of bone
    const boneInverses: THREE.Matrix4[] = []; // new list of boneInverse
    const boneIndexMap: { [index: number]: number } = {}; // map of old bone index vs. new bone index
    const array = (attribute.array as any).map((index: number) => {
      // new skinIndex buffer
      if (boneIndexMap[index] === undefined) {
        boneIndexMap[index] = bones.length;
        bones.push(mesh.skeleton.bones[index]);
        boneInverses.push(mesh.skeleton.boneInverses[index]);
      }
      return boneIndexMap[index];
    });

    // attach new skinIndex buffer
    geometry.removeAttribute('skinIndex');
    geometry.addAttribute('skinIndex', new THREE.BufferAttribute(array, 4, false));
    mesh.bind(new THREE.Skeleton(bones, boneInverses), new THREE.Matrix4());
    //                                                 ^^^^^^^^^^^^^^^^^^^ transform of meshes should be ignored
    // See: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#skins
  });
}
