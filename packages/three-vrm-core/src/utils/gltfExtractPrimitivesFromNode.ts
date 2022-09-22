import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { GLTF as GLTFSchema } from '@gltf-transform/core';

function extractPrimitivesInternal(gltf: GLTF, nodeIndex: number, node: THREE.Object3D): THREE.Mesh[] | null {
  const json = gltf.parser.json as GLTFSchema.IGLTF;

  /**
   * Let's list up every possible patterns that parsed gltf nodes with a mesh can have,,,
   *
   * "*" indicates that those meshes should be listed up using this function
   *
   * ### A node with a (mesh, a signle primitive)
   *
   * - `THREE.Mesh`: The only primitive of the mesh *
   *
   * ### A node with a (mesh, multiple primitives)
   *
   * - `THREE.Group`: The root of the mesh
   *   - `THREE.Mesh`: A primitive of the mesh *
   *   - `THREE.Mesh`: A primitive of the mesh (2) *
   *
   * ### A node with a (mesh, multiple primitives) AND (a child with a mesh, a single primitive)
   *
   * - `THREE.Group`: The root of the mesh
   *   - `THREE.Mesh`: A primitive of the mesh *
   *   - `THREE.Mesh`: A primitive of the mesh (2) *
   *   - `THREE.Mesh`: A primitive of a MESH OF THE CHILD
   *
   * ### A node with a (mesh, multiple primitives) AND (a child with a mesh, multiple primitives)
   *
   * - `THREE.Group`: The root of the mesh
   *   - `THREE.Mesh`: A primitive of the mesh *
   *   - `THREE.Mesh`: A primitive of the mesh (2) *
   *   - `THREE.Group`: The root of a MESH OF THE CHILD
   *     - `THREE.Mesh`: A primitive of the mesh of the child
   *     - `THREE.Mesh`: A primitive of the mesh of the child (2)
   *
   * ### A node with a (mesh, multiple primitives) BUT the node is a bone
   *
   * - `THREE.Bone`: The root of the node, as a bone
   *   - `THREE.Group`: The root of the mesh
   *     - `THREE.Mesh`: A primitive of the mesh *
   *     - `THREE.Mesh`: A primitive of the mesh (2) *
   *
   * ### A node with a (mesh, multiple primitives) AND (a child with a mesh, multiple primitives) BUT the node is a bone
   *
   * - `THREE.Bone`: The root of the node, as a bone
   *   - `THREE.Group`: The root of the mesh
   *     - `THREE.Mesh`: A primitive of the mesh *
   *     - `THREE.Mesh`: A primitive of the mesh (2) *
   *   - `THREE.Group`: The root of a MESH OF THE CHILD
   *     - `THREE.Mesh`: A primitive of the mesh of the child
   *     - `THREE.Mesh`: A primitive of the mesh of the child (2)
   *
   * ...I will take a strategy that traverses the root of the node and take first (primitiveCount) meshes.
   */

  // Make sure that the node has a mesh
  const schemaNode = json.nodes?.[nodeIndex];
  if (schemaNode == null) {
    console.warn(`extractPrimitivesInternal: Attempt to use nodes[${nodeIndex}] of glTF but the node doesn't exist`);
    return null;
  }

  const meshIndex = schemaNode.mesh;
  if (meshIndex == null) {
    return null;
  }

  // How many primitives the mesh has?
  const schemaMesh = json.meshes?.[meshIndex];
  if (schemaMesh == null) {
    console.warn(`extractPrimitivesInternal: Attempt to use meshes[${meshIndex}] of glTF but the mesh doesn't exist`);
    return null;
  }

  const primitiveCount = schemaMesh.primitives.length;

  // Traverse the node and take first (primitiveCount) meshes
  const primitives: THREE.Mesh[] = [];
  node.traverse((object) => {
    if (primitives.length < primitiveCount) {
      if ((object as any).isMesh) {
        primitives.push(object as THREE.Mesh);
      }
    }
  });

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
