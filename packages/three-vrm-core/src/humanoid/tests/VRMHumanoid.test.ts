import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import { VRMHumanoid } from '../VRMHumanoid';
import type { VRMHumanBones } from '../VRMHumanBones';
import { VRMRequiredHumanBoneName } from '../VRMRequiredHumanBoneName';

describe('VRMHumanoid', () => {
  it.each([true, false])('preserves the hips parent world matrix when automatic updates are %s', (autoUpdate) => {
    const bones = Object.fromEntries(
      Object.values(VRMRequiredHumanBoneName).map((name) => [name, { node: new THREE.Object3D() }]),
    ) as VRMHumanBones;

    const parent = new THREE.Object3D();
    parent.position.set(4, 6, 8);
    parent.scale.setScalar(2);
    const hips = bones.hips.node;
    hips.position.set(1, 2, 3);
    parent.add(hips);
    parent.updateMatrixWorld(true);
    parent.matrixWorldAutoUpdate = autoUpdate;
    const parentWorldMatrix = parent.matrixWorld.clone();

    const humanoid = new VRMHumanoid(bones);
    humanoid.getNormalizedBoneNode('hips')!.position.add(new THREE.Vector3(2, 4, 6));
    humanoid.update();

    expect(hips.position.toArray()).toEqual([2, 4, 6]);
    expect(parent.matrixWorld).toEqual(parentWorldMatrix);

    // The second update must start from the same world transform.
    humanoid.update();
    expect(hips.position.toArray()).toEqual([2, 4, 6]);
    expect(parent.matrixWorld).toEqual(parentWorldMatrix);
  });
});
