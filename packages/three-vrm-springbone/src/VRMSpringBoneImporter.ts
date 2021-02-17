import { VRMNodeCollider } from '@pixiv/three-vrm-node-collider';
import * as V0VRM from '@pixiv/types-vrm-0.0';
import * as V1SpringBoneSchema from '@pixiv/types-vrmc-springbone-1.0';
import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRMSpringBoneJoint } from './VRMSpringBoneJoint';
import { VRMSpringBoneManager } from './VRMSpringBoneManager';
import { VRMSpringBoneSettings } from './VRMSpringBoneSettings';

export class VRMSpringBoneImporter {
  /**
   * Create a new VRMSpringBoneImporter.
   */
  constructor() {
    // do nothing
  }

  /**
   * Import spring bones from a GLTF and return a {@link VRMSpringBoneManager}.
   * It might return `null` instead when it does not need to be created or something go wrong.
   *
   * @param gltf A parsed result of GLTF taken from GLTFLoader
   */
  public async import(
    gltf: GLTF,
    collidersMap?: Map<number, Set<VRMNodeCollider>>,
  ): Promise<VRMSpringBoneManager | null> {
    const v1Result = await this._v1Import(gltf, collidersMap);
    if (v1Result != null) {
      return v1Result;
    }

    const v0Result = await this._v0Import(gltf, collidersMap);
    if (v0Result != null) {
      return v0Result;
    }

    return null;
  }

  private async _v1Import(
    gltf: GLTF,
    collidersMap?: Map<number, Set<VRMNodeCollider>>,
  ): Promise<VRMSpringBoneManager | null> {
    // early abort if it doesn't use spring bones
    const isSpringBoneUsed = gltf.parser.json.extensionsUsed.indexOf('VRMC_springBone-1.0') !== -1;
    if (!isSpringBoneUsed) {
      return null;
    }

    const manager = new VRMSpringBoneManager();

    const threeNodes: THREE.Object3D[] = await gltf.parser.getDependencies('node');

    const extension: V1SpringBoneSchema.SpringBone | undefined = gltf.parser.json.extensions?.['VRMC_springBone-1.0'];
    if (!extension) {
      return null;
    }

    extension.springs?.forEach((schemaSpring) => {
      const joints = schemaSpring.joints;

      // prepare colliders
      const colliders: VRMNodeCollider[] = [];
      schemaSpring.colliders?.forEach((index) => {
        const set = collidersMap?.get(index);
        if (set) {
          colliders.push(...Array.from(set));
        }
      });

      joints.forEach((joint) => {
        // prepare node
        const nodeIndex = joint.node;
        const node = threeNodes[nodeIndex];

        // prepare setting
        const setting: Partial<VRMSpringBoneSettings> = {
          dragForce: joint.dragForce,
          gravityPower: joint.gravityPower,
          stiffness: joint.stiffness,
          gravityDir: new THREE.Vector3().fromArray(joint.gravityDir ?? [0.0, 1.0, 0.0]),
        };

        // create spring bones
        const spring = new VRMSpringBoneJoint(node, joint.hitRadius, setting, colliders);
        manager.addSpringBone(spring);
      });
    });

    // init spring bones
    gltf.scene.updateMatrixWorld();
    manager.setInitState();

    return manager;
  }

  private async _v0Import(
    gltf: GLTF,
    collidersMap?: Map<number, Set<VRMNodeCollider>>,
  ): Promise<VRMSpringBoneManager | null> {
    // early abort if it doesn't use vrm
    const isVRMUsed = gltf.parser.json.extensionsUsed.indexOf('VRM') !== -1;
    if (!isVRMUsed) {
      return null;
    }

    // early abort if it doesn't have bone groups
    const extension: V0VRM.VRM | undefined = gltf.parser.json.extensions?.['VRM'];
    const boneGroups = extension?.secondaryAnimation?.boneGroups;
    if (!boneGroups) {
      return null;
    }

    const manager = new VRMSpringBoneManager();

    const threeNodes: THREE.Object3D[] = await gltf.parser.getDependencies('node');

    // import spring bones for each spring bone groups
    boneGroups?.forEach((group) => {
      const rootIndices = group.bones;
      if (!rootIndices) {
        return;
      }

      rootIndices.forEach((rootIndex) => {
        const root = threeNodes[rootIndex];

        // prepare setting
        const gravityDir = new THREE.Vector3();
        if (group.gravityDir) {
          gravityDir.set(group.gravityDir.x ?? 0.0, group.gravityDir.y ?? 0.0, group.gravityDir.z ?? 0.0);
        } else {
          gravityDir.set(0.0, -1.0, 0.0);
        }
        const setting: Partial<VRMSpringBoneSettings> = {
          dragForce: group.dragForce,
          gravityPower: group.gravityPower,
          stiffness: group.stiffiness,
          gravityDir,
        };

        // prepare colliders
        const colliders: VRMNodeCollider[] = [];
        group.colliderGroups?.forEach((index) => {
          const set = collidersMap?.get(index);
          if (set) {
            colliders.push(...Array.from(set));
          }
        });

        // create spring bones
        root.traverse((node) => {
          const spring = new VRMSpringBoneJoint(node, group.hitRadius, setting, colliders);
          manager.addSpringBone(spring);
        });
      });
    });

    // init spring bones
    gltf.scene.updateMatrixWorld();
    manager.setInitState();

    return manager;
  }
}
