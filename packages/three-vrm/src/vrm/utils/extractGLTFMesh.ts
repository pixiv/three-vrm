import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { GLTFMesh, GLTFPrimitive } from '../types/types';

export async function extractGLTFMesh(gltf: GLTF, index: number): Promise<GLTFPrimitive[]> {
  const meshes: GLTFPrimitive[] = [];

  const groupOrMesh: GLTFMesh = await gltf.parser.getDependency('mesh', index);

  if ((groupOrMesh as any).isMesh) {
    meshes.push(groupOrMesh as GLTFPrimitive);
  } else {
    const primitivesCount = gltf.parser.json.meshes[index].primitives.length;

    // assuming first (primitivesCount) children are its primitives
    for (let i = 0; i < primitivesCount; i++) {
      meshes.push(groupOrMesh.children[i] as GLTFPrimitive);
    }
  }

  return meshes;
}

export async function extractGLTFMeshes(gltf: GLTF): Promise<GLTFPrimitive[][]> {
  const gltfMeshesMap: GLTFMesh[] = await gltf.parser.getDependencies('mesh');

  return gltfMeshesMap.map((groupOrMesh, index) => {
    const meshes: GLTFPrimitive[] = [];

    if ((groupOrMesh as any).isMesh) {
      meshes.push(groupOrMesh as GLTFPrimitive);
    } else {
      const primitivesCount = gltf.parser.json.meshes[index].primitives.length;

      // assuming first (primitivesCount) children are its primitives
      for (let i = 0; i < primitivesCount; i++) {
        meshes.push(groupOrMesh.children[i] as GLTFPrimitive);
      }
    }

    return meshes;
  });
}
