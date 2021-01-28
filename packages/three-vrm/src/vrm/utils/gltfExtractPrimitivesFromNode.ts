import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import type { GLTFPrimitive, GLTFSchema } from '../types';

function extractPrimitivesInternal(gltf: GLTF, nodeIndex: number, node: THREE.Object3D): GLTFPrimitive[] | null {
  const schemaNode: GLTFSchema.Node = gltf.parser.json.nodes[nodeIndex];
  const meshIndex = schemaNode.mesh;
  if (meshIndex == null) {
    return null;
  }

  const schemaMesh: GLTFSchema.Mesh = gltf.parser.json.meshes[meshIndex];

  const primitives: GLTFPrimitive[] = [];

  if ((node as any).isMesh) {
    primitives.push(node as GLTFPrimitive);
  } else {
    const primitivesCount = schemaMesh.primitives.length;

    // assuming first (primitivesCount) children are its primitives
    for (let i = 0; i < primitivesCount; i++) {
      primitives.push(node.children[i] as GLTFPrimitive);
    }
  }

  return primitives;
}

/**
 * Extract primitives ( `THREE.Mesh[]` ) of a node from a loaded GLTF.
 *
 * The main purpose of this function is to distinguish primitives and children from a node that has both meshes and children.
 * It also returns informations about the node and the mesh taken from schema as by-products though.
 *
 * It utilizes the behavior that GLTFLoader adds mesh primitives to the node object ( `THREE.Group` ) first then adds its children.
 *
 * @param gltf A GLTF object taken from GLTFLoader
 * @param nodeIndex The index of the node
 */
export async function gltfExtractPrimitivesFromNode(gltf: GLTF, nodeIndex: number): Promise<GLTFPrimitive[] | null> {
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
export async function gltfExtractPrimitivesFromNodes(gltf: GLTF): Promise<Map<number, GLTFPrimitive[]>> {
  const nodes: THREE.Object3D[] = await gltf.parser.getDependencies('node');
  const map = new Map<number, GLTFPrimitive[]>();

  nodes.forEach((node, index) => {
    const result = extractPrimitivesInternal(gltf, index, node);
    if (result != null) {
      map.set(index, result);
    }
  });

  return map;
}
