import * as THREE from 'three';
import { VRMSpringBoneManager } from '../springbone';
import { VRMDebugOptions } from './VRMDebugOptions';
import { VRMSpringBoneDebug } from './VRMSpringBoneDebug';
import { VRM_GIZMO_RENDER_ORDER } from './VRMDebug';

const _colliderGizmoMaterial = new THREE.MeshBasicMaterial({
  color: 0xff00ff,
  wireframe: true,
  transparent: true,
  depthTest: false,
});

/**
 * Represents a single spring bone group of a VRM.
 */
export type VRMSpringBoneGroupDebug = VRMSpringBoneDebug[];

export class VRMSpringBoneManagerDebug extends VRMSpringBoneManager {
  public setupHelper(scene: THREE.Scene, debugOption: VRMDebugOptions): void {
    if (debugOption.disableSpringBoneHelper) return;

    this.springBoneGroupList.forEach((springBoneGroup) => {
      springBoneGroup.forEach((springBone) => {
        if ((springBone as any).getGizmo) {
          const gizmo = (springBone as VRMSpringBoneDebug).getGizmo();
          scene.add(gizmo);
        }
      });
    });

    this.colliderGroups.forEach((colliderGroup) => {
      colliderGroup.colliders.forEach((collider) => {
        collider.material = _colliderGizmoMaterial;
        collider.renderOrder = VRM_GIZMO_RENDER_ORDER;
      });
    });
  }
}
