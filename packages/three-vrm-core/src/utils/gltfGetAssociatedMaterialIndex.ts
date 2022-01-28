import * as THREE from 'three';
import { GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader.js';

/**
 * Get a material definition index of glTF from associated material.
 * It's basically a comat code between Three.js r133 or above and previous versions.
 * @param parser GLTFParser
 * @param material A material of gltf
 * @returns Material definition index of glTF
 */
export function gltfGetAssociatedMaterialIndex(parser: GLTFParser, material: THREE.Material): number | null {
  const threeRevision = parseInt(THREE.REVISION, 10);

  let index: number | null = null;

  if (threeRevision >= 133) {
    index = parser.associations.get(material)?.materials ?? null;
  } else {
    // COMPAT: structure of `parser.associations` has been changed @ r133
    // See: https://github.com/mrdoob/three.js/pull/21737
    // Ref: https://github.com/three-types/three-ts-types/commit/5246676e479b61a9ff2db71df4119f6f1462580d
    type GLTFReferencePre133 = {
      type: 'materials' | 'nodes' | 'textures' | 'meshes';
      index: number;
    };

    type GLTFAssociationsPre133 = Map<THREE.Object3D | THREE.Material | THREE.Texture, GLTFReferencePre133>;

    const associations = parser.associations as GLTFAssociationsPre133;

    const reference = associations.get(material);

    if (reference?.type === 'materials') {
      index = reference.index;
    }
  }

  return index;
}
