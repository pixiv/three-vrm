import * as THREE from 'three';
import { GLTFNode, VRMSchema } from '../types';
import { GIZMO_RENDER_ORDER, VRMSpringBone } from './VRMSpringBone';
import { VRMSpringBoneColliderGroup, VRMSpringBoneColliderMesh } from './VRMSpringBoneColliderGroup';
import { VRMSpringBoneGroup, VRMSpringBoneManager } from './VRMSpringBoneManager';

/**
 * An importer that imports a [[VRMSpringBoneManager]] from a VRM extension of a GLTF.
 */
export class VRMSpringBoneImporter {
  protected get isColiderMeshVisible(): boolean {
    return false;
  }

  /**
   * Import a [[VRMLookAtHead]] from a VRM.
   *
   * @param gltf A parsed result of GLTF taken from GLTFLoader
   */
  public async import(gltf: THREE.GLTF): Promise<VRMSpringBoneManager | null> {
    if (
      !gltf.parser.json.extensions ||
      !gltf.parser.json.extensions.VRM ||
      !gltf.parser.json.extensions.VRM.secondaryAnimation
    ) {
      return null;
    }

    // 衝突判定球体メッシュ。
    const colliderGroups = await this.getColliderMeshGroups(gltf);
    colliderGroups.forEach((group) => gltf.scene.add(...group.colliders));

    // 同じ属性（stiffinessやdragForceが同じ）のボーンはboneGroupにまとめられている。
    // 一列だけではないことに注意。
    const springBoneGroupList = await this.getSpringBoneGroupList(gltf, colliderGroups);

    return new VRMSpringBoneManager(springBoneGroupList);
  }

  protected createSpringBone(
    gltf: THREE.GLTF,
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

  private async getSpringBoneGroupList(
    gltf: THREE.GLTF,
    colliderGroups: VRMSpringBoneColliderGroup[],
  ): Promise<VRMSpringBoneGroup[]> {
    const springBoneGroups: VRMSchema.SecondaryAnimationSpring[] = gltf.parser.json.extensions!.VRM!.secondaryAnimation!
      .boneGroups;

    const springBoneGroupList: VRMSpringBoneGroup[] = [];

    springBoneGroups.forEach((vrmBoneGroup) => {
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
      const gravityDir = new THREE.Vector3(
        vrmBoneGroup.gravityDir.x,
        vrmBoneGroup.gravityDir.y,
        vrmBoneGroup.gravityDir.z,
      );
      const gravityPower = vrmBoneGroup.gravityPower;
      const dragForce = vrmBoneGroup.dragForce;
      const hitRadius = vrmBoneGroup.hitRadius;

      const colliders: VRMSpringBoneColliderMesh[] = [];
      vrmBoneGroup.colliderGroups.forEach((colliderIndex) => {
        colliders.push(...colliderGroups[colliderIndex].colliders);
      });

      const springBoneGroup: VRMSpringBoneGroup = [];
      vrmBoneGroup.bones.forEach(async (nodeIndex) => {
        // VRMの情報から「揺れモノ」ボーンのルートが取れる
        const springRootBone: GLTFNode = await gltf.parser.getDependency('node', nodeIndex);

        // it's weird but there might be cases we can't find the root bone
        if (!springRootBone) {
          return;
        }

        springRootBone.traverse((bone) => {
          const springBone = this.createSpringBone(
            gltf,
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
      });

      springBoneGroupList.push(springBoneGroup);
    });

    return springBoneGroupList;
  }

  /**
   * Create an array of [[VRMSpringBoneColliderGroup]].
   */
  private async getColliderMeshGroups(gltf: THREE.GLTF): Promise<VRMSpringBoneColliderGroup[]> {
    const vrmExt: VRMSchema.VRM | undefined = gltf.parser.json.extensions && gltf.parser.json.extensions.VRM;
    if (vrmExt === undefined) {
      return [];
    }
    const secondaryAnimation = vrmExt.secondaryAnimation;
    if (secondaryAnimation === undefined) {
      return [];
    }
    const vrmColliderGroups = secondaryAnimation.colliderGroups;
    if (vrmColliderGroups === undefined) {
      return [];
    }

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

        const offsetMatrix = new THREE.Matrix4().makeTranslation(
          collider.offset.x,
          collider.offset.y,
          -collider.offset.z, // this is pretty weird. See: https://github.com/dwango/UniVRM/issues/65
        );
        const visible = this.isColiderMeshVisible;
        const colliderMesh = new THREE.Mesh(
          new THREE.SphereBufferGeometry(collider.radius, 8, 4),
          new THREE.MeshBasicMaterial({
            color: 0xff00ff,
            visible,
            wireframe: true,
            transparent: true,
            depthTest: false,
          }),
        );
        (colliderMesh.material as any).renderOrder = GIZMO_RENDER_ORDER;

        // the name have to be this in order to exclude colliders from bounding box
        // (See Viewer.ts, search for child.name === 'vrmColliderSphere')
        colliderMesh.name = 'vrmColliderSphere';

        // We will use the radius of the sphere for collision vs bones.
        // `boundingSphere` must be created to compute the radius.
        colliderMesh.geometry.computeBoundingSphere();

        // The colliderMesh must sync with the bone.
        // Attaching bone's matrix to the colliderMesh at every update.
        // (colliderMesh will move automecicallty)
        colliderMesh.updateMatrixWorld = () => {
          colliderMesh.matrixWorld.copy(bone.matrixWorld).multiply(offsetMatrix);
        };
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
}
