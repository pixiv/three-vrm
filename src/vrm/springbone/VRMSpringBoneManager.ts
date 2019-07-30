import * as THREE from 'three';
import { GLTF, GLTFNode } from '../types';
import * as Raw from '../types/VRM';
import { GIZMO_RENDER_ORDER, VRMSpringBone } from './VRMSpringBone';
import { ColliderMesh, VRMSpringBoneColliderGroup } from './VRMSpringBoneColliderGroup';

export type VRMSpringBoneGroup = VRMSpringBone[];

/**
 * A class manages all the spring bones of a VRM.
 * You usually don't have to care of this class, sometimes you might want to call [[reset]] though.
 */
export class VRMSpringBoneManager {
  public readonly springBoneGroupList: VRMSpringBoneGroup[] = [];

  /**
   * Create a new VRMSpringBoneManager.
   */
  constructor(gltf: GLTF, nodesMap: GLTFNode[]) {
    const springBoneGroups: Raw.RawVrmSecondaryanimationSpring[] | undefined =
      gltf.parser.json.extensions &&
      gltf.parser.json.extensions.VRM &&
      gltf.parser.json.extensions.VRM.secondaryAnimation &&
      gltf.parser.json.extensions.VRM.secondaryAnimation.boneGroups;
    if (springBoneGroups === undefined) {
      return;
    }

    // 衝突判定球体メッシュ。
    const colliderMeshGroups = this.getColliderMeshGroups(gltf, nodesMap);
    colliderMeshGroups.forEach((group) => gltf.scene.add(...group.colliders));

    // 同じ属性（stiffinessやdragForceが同じ）のボーンはboneGroupにまとめられている。
    // 一列だけではないことに注意。
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

      const colliders: ColliderMesh[] = [];
      vrmBoneGroup.colliderGroups.forEach((colliderIndex) => {
        colliders.push(...colliderMeshGroups[colliderIndex].colliders);
      });

      const springBoneGroup: VRMSpringBoneGroup = [];
      vrmBoneGroup.bones.forEach((nodeIndex) => {
        // VRMの情報から「揺れモノ」ボーンのルートが取れる
        const springRootBone = nodesMap[nodeIndex];

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

      this.springBoneGroupList.push(springBoneGroup);
    });
  }

  /**
   * Update all the spring bones belongs to this manager.
   * Usually this will be called via [[VRM.update]] so you don't have to call this manually.
   *
   * @param delta deltaTime
   */
  public lateUpdate(delta: number): void {
    this.springBoneGroupList.forEach((springBoneGroup) => {
      springBoneGroup.forEach((springBone) => {
        springBone.update(delta);
      });
    });
  }

  /**
   * Reset all the spring bones belongs to this manager.
   */
  public reset(): void {
    this.springBoneGroupList.forEach((springBoneGroup) => {
      springBoneGroup.forEach((springBone) => {
        springBone.reset();
      });
    });
  }

  protected isColiderMeshVisible(): boolean {
    return false;
  }

  protected createSpringBone(
    gltf: GLTF,
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

  /**
   * Create an array of [[VRMSpringBoneColliderGroup]].
   */
  private getColliderMeshGroups(gltf: GLTF, nodesMap: GLTFNode[]): VRMSpringBoneColliderGroup[] {
    const vrmExt: Raw.RawVrm | undefined = gltf.parser.json.extensions && gltf.parser.json.extensions.VRM;
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
    vrmColliderGroups.forEach((colliderGroup) => {
      if (colliderGroup.node === undefined || colliderGroup.colliders === undefined) {
        return;
      }

      const bone = nodesMap[colliderGroup.node];
      const colliders: ColliderMesh[] = [];
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
        const visible = this.isColiderMeshVisible();
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
