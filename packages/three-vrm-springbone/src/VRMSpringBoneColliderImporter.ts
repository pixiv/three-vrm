import * as V0VRM from '@pixiv/types-vrm-0.0';
import * as V1NodeColliderSchema from '@pixiv/types-vrmc-node-collider-1.0';
import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRMNodeCollider } from './VRMSpringBoneCollider';
import { VRMNodeColliderShapeCapsule } from '@pixiv/three-vrm-node-collider/src/VRMNodeColliderShapeCapsule';
import { VRMNodeColliderShapeSphere } from '@pixiv/three-vrm-node-collider/src/VRMNodeColliderShapeSphere';

export class VRMNodeColliderImporter {
  /**
   * Create a new VRMNodeColliderImporter.
   */
  constructor() {
    // do nothing
  }

  /**
   * Import node colliders from a GLTF and return a map of set of {@link VRMNodeCollider}.
   * Key is a number that indicates node index (in v1) or collider group (in v0).
   * It might return `null` instead when it does not need to be created or something go wrong.
   *
   * @param gltf A parsed result of GLTF taken from GLTFLoader
   */
  public async import(gltf: GLTF): Promise<Map<number, Set<VRMNodeCollider>> | null> {
    const v1Result = await this._v1Import(gltf);
    if (v1Result != null) {
      return v1Result;
    }

    const v0Result = await this._v0Import(gltf);
    if (v0Result != null) {
      return v0Result;
    }

    return null;
  }

  private async _v1Import(gltf: GLTF): Promise<Map<number, Set<VRMNodeCollider>> | null> {
    // early abort if it doesn't use node colliders
    const isColliderUsed = gltf.parser.json.extensionsUsed.indexOf('VRMC_node_collider-1.0') !== -1;
    if (!isColliderUsed) {
      return null;
    }

    // node index vs. collider
    const map = new Map<number, Set<VRMNodeCollider>>();

    const threeNodes: THREE.Object3D[] = await gltf.parser.getDependencies('node');

    // import node colliders for each nodes
    threeNodes.forEach((node, nodeIndex) => {
      const extension: V1NodeColliderSchema.NodeCollider | undefined =
        node.userData?.gltfExtensions?.['VRMC_node_collider-1.0'];

      if (extension?.shapes) {
        const set = new Set<VRMNodeCollider>();

        extension?.shapes.forEach((schemaShape) => {
          if (schemaShape.sphere) {
            const shape = this._importSphereCollider(node, {
              offset: new THREE.Vector3().fromArray(schemaShape.sphere.offset ?? [0.0, 0.0, 0.0]),
              radius: schemaShape.sphere.radius ?? 0.0,
            });
            set.add(shape);
          } else if (schemaShape.capsule) {
            const shape = this._importCapsuleCollider(node, {
              offset: new THREE.Vector3().fromArray(schemaShape.capsule.offset ?? [0.0, 0.0, 0.0]),
              radius: schemaShape.capsule.radius ?? 0.0,
              tail: new THREE.Vector3().fromArray(schemaShape.capsule.tail ?? [0.0, 0.0, 0.0]),
            });
            set.add(shape);
          }
        });

        if (set.size !== 0) {
          map.set(nodeIndex, set);
        }
      }
    });

    return map;
  }

  private async _v0Import(gltf: GLTF): Promise<Map<number, Set<VRMNodeCollider>> | null> {
    // early abort if it doesn't use node colliders
    const isVRMUsed = gltf.parser.json.extensionsUsed.indexOf('VRM') !== -1;
    if (!isVRMUsed) {
      return null;
    }

    // early abort if it doesn't have collider groups
    const extension: V0VRM.VRM | undefined = gltf.parser.json.extensions?.['VRM'];
    const colliderGroups = extension?.secondaryAnimation?.colliderGroups;
    if (!colliderGroups) {
      return null;
    }

    // collider group vs. collider
    const map = new Map<number, Set<VRMNodeCollider>>();

    const threeNodes: THREE.Object3D[] = await gltf.parser.getDependencies('node');

    // import node colliders for each collider groups
    colliderGroups?.forEach((group, groupIndex) => {
      const node = group.node && threeNodes[group.node];
      if (!node) {
        return;
      }

      const set = new Set<VRMNodeCollider>();

      const colliders = group.colliders;
      colliders?.forEach((collider) => {
        const offset = new THREE.Vector3();
        if (collider.offset) {
          offset.set(collider.offset.x ?? 0.0, collider.offset.y ?? 0.0, collider.offset.z ?? 0.0);
        } else {
          offset.set(0.0, 0.0, 0.0);
        }
        const shape = this._importSphereCollider(node, {
          offset: offset,
          radius: collider.radius ?? 0.0,
        });
        set.add(shape);
      });

      if (set.size !== 0) {
        map.set(groupIndex, set);
      }
    });

    return map;
  }

  private _importSphereCollider(
    destination: THREE.Object3D,
    params: {
      offset: THREE.Vector3;
      radius: number;
    },
  ): VRMNodeCollider {
    const { offset, radius } = params;

    const shape = new VRMNodeColliderShapeSphere({ offset, radius });

    const collider = new VRMNodeCollider(shape);

    destination.add(collider);

    return collider;
  }

  private _importCapsuleCollider(
    destination: THREE.Object3D,
    params: {
      offset: THREE.Vector3;
      radius: number;
      tail: THREE.Vector3;
    },
  ): VRMNodeCollider {
    const { offset, radius, tail } = params;

    const shape = new VRMNodeColliderShapeCapsule({ offset, radius, tail });

    const collider = new VRMNodeCollider(shape);

    destination.add(collider);

    return collider;
  }
}
