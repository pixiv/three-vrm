import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { GLTFNode, VRMSchema } from '../types';
import { VRMSpringBone } from './VRMSpringBone';
import { VRMSpringBoneColliderGroup, VRMSpringBoneColliderMesh } from './VRMSpringBoneColliderGroup';
import { VRMSpringBoneGroup, VRMSpringBoneManager } from './VRMSpringBoneManager';

const _v3A = new THREE.Vector3();

const _colliderMaterial = new THREE.MeshBasicMaterial({ visible: false });

/**
 * An importer that imports a [[VRMSpringBoneManager]] from a VRM extension of a GLTF.
 */
export class VRMSpringBoneImporter {
  /**
   * Import a [[VRMLookAtHead]] from a VRM.
   *
   * @param gltf A parsed result of GLTF taken from GLTFLoader
   */
  public async import(gltf: GLTF): Promise<VRMSpringBoneManager | null> {
    const vrmExt: VRMSchema.VRM | undefined = gltf.parser.json.extensions?.VRM;
    if (!vrmExt) return null;

    const schemaSecondaryAnimation: VRMSchema.SecondaryAnimation | undefined = vrmExt.secondaryAnimation;
    if (!schemaSecondaryAnimation) return null;

    // 衝突判定球体メッシュ。
    const colliderGroups = await this._importColliderMeshGroups(gltf, schemaSecondaryAnimation);

    // 同じ属性（stiffinessやdragForceが同じ）のボーンはboneGroupにまとめられている。
    // 一列だけではないことに注意。
    const springBoneGroupList = await this._importSpringBoneGroupList(gltf, schemaSecondaryAnimation, colliderGroups);

    return new VRMSpringBoneManager(colliderGroups, springBoneGroupList);
  }

  protected _createSpringBone(
    bone: THREE.Object3D,
    hitRadius: number,
    stiffiness: number,
    gravityDir: THREE.Vector3,
    gravityPower: number,
    dragForce: number,
    colliders: THREE.Mesh[] = [],
  ): VRMSpringBone {
    return new VRMSpringBone(bone, hitRadius, stiffiness, gravityDir, gravityPower, dragForce, colliders);
  }

  protected async _importSpringBoneGroupList(
    gltf: GLTF,
    schemaSecondaryAnimation: VRMSchema.SecondaryAnimation,
    colliderGroups: VRMSpringBoneColliderGroup[],
  ): Promise<VRMSpringBoneGroup[]> {
    const springBoneGroups: VRMSchema.SecondaryAnimationSpring[] = schemaSecondaryAnimation.boneGroups || [];

    const springBoneGroupList: VRMSpringBoneGroup[] = [];

    await Promise.all(
      springBoneGroups.map(async (vrmBoneGroup) => {
        if (
          vrmBoneGroup.stiffiness === undefined ||
          vrmBoneGroup.gravityDir === undefined ||
          vrmBoneGroup.gravityDir.x === undefined ||
          vrmBoneGroup.gravityDir.y === undefined ||
          vrmBoneGroup.gravityDir.z === undefined ||
          vrmBoneGroup.gravityPower === undefined ||
          vrmBoneGroup.dragForce === undefined ||
          vrmBoneGroup.hitRadius === undefined ||
          vrmBoneGroup.colliderGroups === undefined ||
          vrmBoneGroup.bones === undefined
        ) {
          return;
        }

        const stiffiness = vrmBoneGroup.stiffiness;
        const gravityDir = _v3A.set(vrmBoneGroup.gravityDir.x, vrmBoneGroup.gravityDir.y, vrmBoneGroup.gravityDir.z);
        const gravityPower = vrmBoneGroup.gravityPower;
        const dragForce = vrmBoneGroup.dragForce;
        const hitRadius = vrmBoneGroup.hitRadius;

        const colliders: VRMSpringBoneColliderMesh[] = [];
        vrmBoneGroup.colliderGroups.forEach((colliderIndex) => {
          colliders.push(...colliderGroups[colliderIndex].colliders);
        });

        const springBoneGroup: VRMSpringBoneGroup = [];
        await Promise.all(
          vrmBoneGroup.bones.map(async (nodeIndex) => {
            // VRMの情報から「揺れモノ」ボーンのルートが取れる
            const springRootBone: GLTFNode = await gltf.parser.getDependency('node', nodeIndex);

            // it's weird but there might be cases we can't find the root bone
            if (!springRootBone) {
              return;
            }

            springRootBone.traverse((bone) => {
              const springBone = this._createSpringBone(
                bone,
                hitRadius,
                stiffiness,
                gravityDir,
                gravityPower,
                dragForce,
                colliders,
              );
              springBoneGroup.push(springBone);
            });
          }),
        );

        springBoneGroupList.push(springBoneGroup);
      }),
    );

    return springBoneGroupList;
  }

  /**
   * Create an array of [[VRMSpringBoneColliderGroup]].
   *
   * @param gltf A parsed result of GLTF taken from GLTFLoader
   * @param schemaSecondaryAnimation A `secondaryAnimation` field of VRM
   */
  protected async _importColliderMeshGroups(
    gltf: GLTF,
    schemaSecondaryAnimation: VRMSchema.SecondaryAnimation,
  ): Promise<VRMSpringBoneColliderGroup[]> {
    const vrmColliderGroups = schemaSecondaryAnimation.colliderGroups;
    if (vrmColliderGroups === undefined) return [];

    const colliderGroups: VRMSpringBoneColliderGroup[] = [];
    vrmColliderGroups.forEach(async (colliderGroup) => {
      if (colliderGroup.node === undefined || colliderGroup.colliders === undefined) {
        return;
      }

      const bone = await gltf.parser.getDependency('node', colliderGroup.node);
      const colliders: VRMSpringBoneColliderMesh[] = [];
      colliderGroup.colliders.forEach((collider) => {
        if (
          collider.offset === undefined ||
          collider.offset.x === undefined ||
          collider.offset.y === undefined ||
          collider.offset.z === undefined ||
          collider.radius === undefined
        ) {
          return;
        }

        const offset = _v3A.set(collider.offset.x, collider.offset.y, collider.offset.z);
        const colliderMesh = this._createColliderMesh(collider.radius, offset);

        bone.add(colliderMesh);
        colliders.push(colliderMesh);
      });

      const colliderMeshGroup = {
        node: colliderGroup.node,
        colliders,
      };
      colliderGroups.push(colliderMeshGroup);
    });

    return colliderGroups;
  }

  /**
   * Create a collider mesh.
   *
   * @param radius Radius of the new collider mesh
   * @param offset Offest of the new collider mesh
   */
  protected _createColliderMesh(radius: number, offset: THREE.Vector3): VRMSpringBoneColliderMesh {
    const colliderMesh = new THREE.Mesh(new THREE.SphereBufferGeometry(radius, 8, 4), _colliderMaterial);

    colliderMesh.position.copy(offset);

    // the name have to be this in order to exclude colliders from bounding box
    // (See Viewer.ts, search for child.name === 'vrmColliderSphere')
    colliderMesh.name = 'vrmColliderSphere';

    // We will use the radius of the sphere for collision vs bones.
    // `boundingSphere` must be created to compute the radius.
    colliderMesh.geometry.computeBoundingSphere();

    return colliderMesh;
  }
}
