/* eslint-env jest */

import * as THREE from 'three';
import { getWorldQuaternionLite } from '../getWorldQuaternionLite';
import { toBeCloseToQuaternion } from './matchers/toBeCloseToQuaternion';

const RECEP_SQRT2 = Math.SQRT1_2;

beforeEach(() => {
  expect.extend({ toBeCloseToQuaternion });
});

describe('getWorldQuaternionLite', () => {
  it('returns the world quaternion of the given object', () => {
    const scene = new THREE.Scene();

    const child = new THREE.Object3D();
    child.quaternion.set(RECEP_SQRT2, 0.0, 0.0, RECEP_SQRT2);
    scene.add(child);

    const grandchild = new THREE.Object3D();
    grandchild.quaternion.set(0.0, RECEP_SQRT2, 0.0, RECEP_SQRT2);
    child.add(grandchild);

    grandchild.updateWorldMatrix(true, false);
    const result = new THREE.Quaternion();
    getWorldQuaternionLite(grandchild, result);

    const expected = new THREE.Quaternion(0.5, 0.5, 0.5, 0.5);
    expect(result).toBeCloseToQuaternion(expected);
  });

  it('does not implicitly recalculate the world matrix', () => {
    const obj = new THREE.Object3D();
    obj.quaternion.set(RECEP_SQRT2, 0.0, 0.0, RECEP_SQRT2);

    const result = new THREE.Quaternion();
    getWorldQuaternionLite(obj, result);

    const expected = new THREE.Quaternion(0.0, 0.0, 0.0, 1.0);
    expect(result).toBeCloseToQuaternion(expected);
  });
});
