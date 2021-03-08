import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

function extractPrimitivesInternal(gltf: GLTF, nodeIndex: number, node: THREE.Object3D): THREE.Mesh[] | null {
  const schemaNode: any = gltf.parser.json.nodes[nodeIndex];
  const meshIndex = schemaNode.mesh;
  if (meshIndex == null) {
    return null;
  }

  const schemaMesh: any = gltf.parser.json.meshes[meshIndex];

  const primitives: THREE.Mesh[] = [];

  if ((node as any).isMesh) {
    primitives.push(node as THREE.Mesh);
  } else {
    const primitivesCount = schemaMesh.primitives.length;

    // assuming first (primitivesCount) children are its primitives
    for (let i = 0; i < primitivesCount; i++) {
      primitives.push(node.children[i] as THREE.Mesh);
    }
  }

  return primitives;
}

/**
 * Extract primitives ( `THREE.Mesh[]` ) of a node from a loaded GLTF.
 * The main purpose of this function is to distinguish primitives and children from a node that has both meshes and children.
 *
 * It utilizes the behavior that GLTFLoader adds mesh primitives to the node object ( `THREE.Group` ) first then adds its children.
 *
 * @param gltf A GLTF object taken from GLTFLoader
 * @param nodeIndex The index of the node
 */
export async function gltfExtractPrimitivesFromNode(gltf: GLTF, nodeIndex: number): Promise<THREE.Mesh[] | null> {
  const node: THREE.Object3D = await gltf.parser.getDependency('node', nodeIndex);
  return extractPrimitivesInternal(gltf, nodeIndex, node);
}

/**
 * Extract primitives ( `THREE.Mesh[]` ) of nodes from a loaded GLTF.
 * See {@link gltfExtractPrimitivesFromNode} for more details.
 *
 * It returns a map from node index to extraction result.
 * If a node does not have a mesh, the entry for the node will not be put in the returning map.
 *
 * @param gltf A GLTF object taken from GLTFLoader
 */
export async function gltfExtractPrimitivesFromNodes(gltf: GLTF): Promise<Map<number, THREE.Mesh[]>> {
  const nodes: THREE.Object3D[] = await gltf.parser.getDependencies('node');
  const map = new Map<number, THREE.Mesh[]>();

  nodes.forEach((node, index) => {
    const result = extractPrimitivesInternal(gltf, index, node);
    if (result != null) {
      map.set(index, result);
    }
  });

  return map;
}
