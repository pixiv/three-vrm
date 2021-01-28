import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

export async function gltfExtractPrimitivesFromNode(gltf: GLTF, index: number): Promise<THREE.Mesh[]> {
  const primitives: THREE.Mesh[] = [];

  const node: THREE.Object3D = await gltf.parser.getDependency('node', index);

  if ((node as any).isMesh) {
    primitives.push(node as THREE.Mesh);
  } else {
    const meshIndex = gltf.parser.json.nodes[index].mesh;
    const primitivesCount = gltf.parser.json.meshes[meshIndex].primitives.length;

    // assuming first (primitivesCount) children are its primitives
    for (let i = 0; i < primitivesCount; i++) {
      primitives.push(node.children[i] as THREE.Mesh);
    }
  }

  return primitives;
}
