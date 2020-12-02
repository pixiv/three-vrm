/* eslint-env jest */

import * as THREE from 'three';
import { VRMNodeColliderShapeCapsule } from '../VRMNodeColliderShapeCapsule';
import { toBeCloseToVector3 } from './matchers/toBeCloseToVector3';

beforeEach(() => {
  expect.extend({ toBeCloseToVector3 });
});

describe('VRMNodeColliderShapeCapsule', () => {
  it('must be instantiated properly', () => {
    const shape = new VRMNodeColliderShapeCapsule({
      radius: 1.0,
      offset: new THREE.Vector3(0.0, 0.0, 0.0),
    });
    expect(shape).toBeInstanceOf(VRMNodeColliderShapeCapsule);
  });

  it('must fallback its offset to (0.0, 0.0, 0.0) if not specified', () => {
    const shape = new VRMNodeColliderShapeCapsule();
    expect(shape.offset).toBeCloseToVector3(new THREE.Vector3(0.0, 0.0, 0.0));
  });

  it('must fallback its tail to (0.0, 0.0, 0.0) if not specified', () => {
    const shape = new VRMNodeColliderShapeCapsule();
    expect(shape.tail).toBeCloseToVector3(new THREE.Vector3(0.0, 0.0, 0.0));
  });

  describe('calculateCollision', () => {
    it('must calculate a collision properly', () => {
      const shape = new VRMNodeColliderShapeCapsule({
        radius: 1.0,
      });

      const colliderMatrix = new THREE.Matrix4().makeTranslation(1.0, 0.0, 0.0);
      const objectPosition = new THREE.Vector3(2.0, 1.0, 0.0);
      const objectRadius = 1.0;

      const dir = new THREE.Vector3();
      const distSq = shape.calculateCollision(colliderMatrix, objectPosition, objectRadius, dir);

      expect(distSq).toBeCloseTo(-2.0);
      expect(dir).toBeCloseToVector3(new THREE.Vector3(1.0, 1.0, 0.0).normalize());
    });

    describe('when offset and tail is specified', () => {
      let shape: VRMNodeColliderShapeCapsule;

      beforeEach(() => {
        shape = new VRMNodeColliderShapeCapsule({
          radius: 1.0,
          offset: new THREE.Vector3(-1.0, 0.0, 0.0),
          tail: new THREE.Vector3(1.0, 1.0, 1.0),
        });
      });

      it('must calculate a collision properly, object is near the head', () => {
        const colliderMatrix = new THREE.Matrix4();
        const objectPosition = new THREE.Vector3(-2.0, 0.0, 1.0);
        const objectRadius = 1.0;

        const dir = new THREE.Vector3();
        const distSq = shape.calculateCollision(colliderMatrix, objectPosition, objectRadius, dir);

        expect(distSq).toBeCloseTo(-2.0);
        expect(dir).toBeCloseToVector3(new THREE.Vector3(-1.0, 0.0, 1.0).normalize());
      });

      it('must calculate a collision properly, object is near the tail', () => {
        const colliderMatrix = new THREE.Matrix4();
        const objectPosition = new THREE.Vector3(3.0, 0.0, 0.0);
        const objectRadius = 1.0;

        const dir = new THREE.Vector3();
        const distSq = shape.calculateCollision(colliderMatrix, objectPosition, objectRadius, dir);

        expect(distSq).toBeCloseTo(2.0);
        expect(dir).toBeCloseToVector3(new THREE.Vector3(2.0, -1.0, -1.0).normalize());
      });

      it('must calculate a collision properly, object is near the tail', () => {
        const colliderMatrix = new THREE.Matrix4();
        const objectPosition = new THREE.Vector3(3.0, 0.0, 0.0);
        const objectRadius = 1.0;

        const dir = new THREE.Vector3();
        const distSq = shape.calculateCollision(colliderMatrix, objectPosition, objectRadius, dir);

        expect(distSq).toBeCloseTo(2.0);
        expect(dir).toBeCloseToVector3(new THREE.Vector3(2.0, -1.0, -1.0).normalize());
      });

      it('must calculate a collision properly, object is between two ends', () => {
        const colliderMatrix = new THREE.Matrix4();
        const objectPosition = new THREE.Vector3(0.0, 0.0, 0.0);
        const objectRadius = 1.0;

        const dir = new THREE.Vector3();
        const distSq = shape.calculateCollision(colliderMatrix, objectPosition, objectRadius, dir);

        expect(distSq).toBeCloseTo(-3.666666667);
        expect(dir).toBeCloseToVector3(new THREE.Vector3(0.577, -0.577, -0.577).normalize());
      });
    });
  });
});
