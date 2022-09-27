/* eslint-env jest */

import * as THREE from 'three';
import { VRMSpringBoneColliderShapeCapsule } from '../VRMSpringBoneColliderShapeCapsule';
import { toBeCloseToArray } from './matchers/toBeCloseToArray';
import { toBeCloseToVector3 } from './matchers/toBeCloseToVector3';

beforeEach(() => {
  expect.extend({ toBeCloseToArray, toBeCloseToVector3 });
});

describe('VRMSpringBoneColliderShapeCapsule', () => {
  it('must be instantiated properly', () => {
    const shape = new VRMSpringBoneColliderShapeCapsule({
      radius: 1.0,
      offset: new THREE.Vector3(0.0, 0.0, 0.0),
    });
    expect(shape).toBeInstanceOf(VRMSpringBoneColliderShapeCapsule);
  });

  it('must fallback its offset to (0.0, 0.0, 0.0) if not specified', () => {
    const shape = new VRMSpringBoneColliderShapeCapsule();
    expect(shape.offset).toBeCloseToVector3(new THREE.Vector3(0.0, 0.0, 0.0));
  });

  it('must fallback its tail to (0.0, 0.0, 0.0) if not specified', () => {
    const shape = new VRMSpringBoneColliderShapeCapsule();
    expect(shape.tail).toBeCloseToVector3(new THREE.Vector3(0.0, 0.0, 0.0));
  });

  describe('calculateCollision', () => {
    it('must calculate a collision properly', () => {
      const shape = new VRMSpringBoneColliderShapeCapsule({
        radius: 1.0,
      });

      const colliderMatrix = new THREE.Matrix4().makeTranslation(1.0, 0.0, 0.0);
      const objectPosition = new THREE.Vector3(2.0, 1.0, 0.0);
      const objectRadius = 1.0;

      const dir = new THREE.Vector3();
      const dist = shape.calculateCollision(colliderMatrix, objectPosition, objectRadius, dir);

      expect(dist).toBeCloseTo(-0.585786); // sqrt(2) - 2
      expect(dir).toBeCloseToVector3(new THREE.Vector3(1.0, 1.0, 0.0).normalize());
    });

    it('must not modify the input values', () => {
      const shape = new VRMSpringBoneColliderShapeCapsule({
        radius: 1.0,
      });

      const colliderMatrix = new THREE.Matrix4().makeTranslation(1.0, 0.0, 0.0);
      const prevColliderMatrix = colliderMatrix.clone();
      const objectPosition = new THREE.Vector3(2.0, 1.0, 0.0);
      const prevObjectPosition = objectPosition.clone();
      const objectRadius = 1.0;

      const dir = new THREE.Vector3();
      shape.calculateCollision(colliderMatrix, objectPosition, objectRadius, dir);

      expect(colliderMatrix.elements).toBeCloseToArray(prevColliderMatrix.elements);
      expect(objectPosition).toBeCloseToVector3(prevObjectPosition);
    });

    describe('when offset and tail is specified', () => {
      let shape: VRMSpringBoneColliderShapeCapsule;

      beforeEach(() => {
        shape = new VRMSpringBoneColliderShapeCapsule({
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

        expect(distSq).toBeCloseTo(-0.585786); // sqrt(2) - 2
        expect(dir).toBeCloseToVector3(new THREE.Vector3(-1.0, 0.0, 1.0).normalize());
      });

      it('must calculate a collision properly, object is near the tail', () => {
        const colliderMatrix = new THREE.Matrix4();
        const objectPosition = new THREE.Vector3(3.0, 0.0, 0.0);
        const objectRadius = 1.0;

        const dir = new THREE.Vector3();
        const distSq = shape.calculateCollision(colliderMatrix, objectPosition, objectRadius, dir);

        expect(distSq).toBeCloseTo(0.44949); // sqrt(6) - 2
        expect(dir).toBeCloseToVector3(new THREE.Vector3(2.0, -1.0, -1.0).normalize());
      });

      it('must calculate a collision properly, object is between two ends', () => {
        const colliderMatrix = new THREE.Matrix4();
        const objectPosition = new THREE.Vector3(0.0, 0.0, 0.0);
        const objectRadius = 1.0;

        const dir = new THREE.Vector3();
        const distSq = shape.calculateCollision(colliderMatrix, objectPosition, objectRadius, dir);

        expect(distSq).toBeCloseTo(-1.42265); // sqrt(3) / 3 - 2
        expect(dir).toBeCloseToVector3(new THREE.Vector3(1.0, -1.0, -1.0).normalize());
      });
    });
  });
});
