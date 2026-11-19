import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import { removeUnnecessaryVertices } from '../src/VRMUtils/removeUnnecessaryVertices';

describe('VRMUtils.removeUnnecessaryVertices', () => {
  it.each([false, true])('preserves evaluated zero morphs when morphTargetsRelative is %s', (relative) => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute([2, 3, 4, 5, 3, 4, 2, 6, 4, 7, 8, 9], 3));
    geometry.setIndex([0, 1, 2]);
    geometry.morphTargetsRelative = relative;
    geometry.morphAttributes.position = [new THREE.Float32BufferAttribute(new Float32Array(12), 3)];

    const mesh = new THREE.Mesh(geometry);
    mesh.morphTargetInfluences![0] = 1;
    const positionBefore = mesh.getVertexPosition(0, new THREE.Vector3());

    removeUnnecessaryVertices(mesh);

    expect(mesh.geometry.getAttribute('position').count).toBe(3);
    expect(mesh.getVertexPosition(0, new THREE.Vector3()).toArray()).toEqual(positionBefore.toArray());
    if (relative) {
      expect(mesh.geometry.morphAttributes.position).toBeUndefined();
    } else {
      expect(mesh.geometry.morphAttributes.position).toHaveLength(1);
    }
  });
});
