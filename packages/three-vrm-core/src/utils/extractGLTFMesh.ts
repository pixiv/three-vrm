import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

export async function extractGLTFMesh(gltf: GLTF, index: number): Promise<THREE.Mesh[]> {
  const meshes: THREE.Mesh[] = [];

  const groupOrMesh: THREE.Group | THREE.Mesh = await gltf.parser.getDependency('mesh', index);

  if ((groupOrMesh as any).isMesh) {
    meshes.push(groupOrMesh as THREE.Mesh);
  } else {
    const primitivesCount = gltf.parser.json.meshes[index].primitives.length;

    // assuming first (primitivesCount) children are its primitives
    for (let i = 0; i < primitivesCount; i++) {
      meshes.push(groupOrMesh.children[i] as THREE.Mesh);
    }
  }

  return meshes;
}

export async function extractGLTFMeshes(gltf: GLTF): Promise<THREE.Mesh[][]> {
  const gltfMeshesMap: (THREE.Group | THREE.Mesh)[] = await gltf.parser.getDependencies('mesh');

  return gltfMeshesMap.map((groupOrMesh, index) => {
    const meshes: THREE.Mesh[] = [];

    if ((groupOrMesh as any).isMesh) {
      meshes.push(groupOrMesh as THREE.Mesh);
    } else {
      const primitivesCount = gltf.parser.json.meshes[index].primitives.length;

      // assuming first (primitivesCount) children are its primitives
      for (let i = 0; i < primitivesCount; i++) {
        meshes.push(groupOrMesh.children[i] as THREE.Mesh);
      }
    }

    return meshes;
  });
}
