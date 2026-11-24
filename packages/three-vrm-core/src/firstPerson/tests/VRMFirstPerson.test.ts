import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import { VRMExpressionMorphTargetBind } from '../../expressions';
import { VRMHumanoid, type VRMHumanBones, VRMRequiredHumanBoneName } from '../../humanoid';
import { VRMFirstPerson } from '../VRMFirstPerson';

describe('VRMFirstPerson', () => {
  it('preserves initial and updated morph weights after erasing the head', () => {
    const head = new THREE.Bone();
    const hips = new THREE.Bone();
    const humanBones = Object.fromEntries(
      Object.values(VRMRequiredHumanBoneName).map((name) => [name, { node: new THREE.Object3D() }]),
    ) as VRMHumanBones;
    humanBones.head = { node: head };
    humanBones.hips = { node: hips };

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute([0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1], 3),
    );
    geometry.setAttribute(
      'skinIndex',
      new THREE.Uint16BufferAttribute([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0], 4),
    );
    geometry.setAttribute(
      'skinWeight',
      new THREE.Float32BufferAttribute([1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0], 4),
    );
    geometry.setIndex([0, 1, 2, 3, 4, 5]);
    geometry.morphAttributes.position = [
      new THREE.Float32BufferAttribute(new Float32Array(18).fill(1), 3),
      new THREE.Float32BufferAttribute(new Float32Array(18).fill(2), 3),
    ];
    geometry.morphTargetsRelative = true;

    const mesh = new THREE.SkinnedMesh(geometry, new THREE.MeshBasicMaterial());
    mesh.bind(new THREE.Skeleton([head, hips]));
    mesh.morphTargetInfluences![0] = 0.25;
    mesh.morphTargetInfluences![1] = 0.5;
    const parent = new THREE.Object3D().add(mesh);
    const firstPerson = new VRMFirstPerson(new VRMHumanoid(humanBones), [{ type: 'auto', meshes: [mesh] }]);

    firstPerson.setup();

    const erasedMesh = parent.children[1] as THREE.SkinnedMesh;
    expect(Array.from(erasedMesh.geometry.getIndex()!.array)).toEqual([3, 4, 5]);
    const initialWeights = erasedMesh.morphTargetInfluences!.slice();

    const bind = new VRMExpressionMorphTargetBind({ primitives: [mesh], index: 0, weight: 1 });
    bind.clearAppliedWeight();
    bind.applyWeight(0.75);

    expect(mesh.morphTargetInfluences).toEqual([0.75, 0.5]);
    expect([initialWeights, erasedMesh.morphTargetInfluences]).toEqual([
      [0.25, 0.5],
      [0.75, 0.5],
    ]);
  });
});
