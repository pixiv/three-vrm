import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import { VRMSpringBoneJoint } from '../VRMSpringBoneJoint';
import { VRMSpringBoneManager } from '../VRMSpringBoneManager';

function createJoint(center: THREE.Object3D): VRMSpringBoneJoint {
  const bone = new THREE.Object3D();
  const child = new THREE.Object3D();
  child.position.y = 1;
  center.add(bone);
  bone.add(child);

  const joint = new VRMSpringBoneJoint(bone, child);
  joint.center = center;
  return joint;
}

describe('VRMSpringBoneJoint', () => {
  it('keeps a shared center usable after another joint clears its center', () => {
    const center = new THREE.Object3D();
    const originalElements = center.matrixWorld.elements;
    const first = createJoint(center);
    const second = createJoint(center);
    const manager = new VRMSpringBoneManager();
    manager.addJoint(first);
    manager.addJoint(second);
    center.updateMatrixWorld(true);
    manager.setInitState();

    first.center = null;
    for (let frame = 0; frame < 2; frame++) {
      center.position.x += 3;
      center.updateMatrixWorld(true);
      manager.update(1 / 60);

      expect(second.bone.quaternion.angleTo(new THREE.Quaternion())).toBeCloseTo(0);
    }

    second.center = null;
    expect(center.matrixWorld.elements).toBe(originalElements);
  });
});
