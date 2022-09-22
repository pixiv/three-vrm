/* eslint-env jest */

import * as THREE from 'three';
import { toBeCloseToQuaternion } from './matchers/toBeCloseToQuaternion';
import { VRMRotationConstraint } from '../VRMRotationConstraint';

expect.extend({ toBeCloseToQuaternion });

/**
 * No rotation
 */
const quatIdentity = new THREE.Quaternion(0.0, 0.0, 0.0, 1.0);

/**
 * X45, Y45, Z45, in extrinsic XYZ
 */
const quatA = new THREE.Quaternion(0.191, 0.462, 0.191, 0.845);

/**
 * X-45, Y-45, Z-45, in extrinsic XYZ
 */
const quatB = new THREE.Quaternion(-0.462, -0.191, -0.462, 0.733);

/**
 * X30, Y45, Z60, in extrinsic XYZ
 */
const quatC = new THREE.Quaternion(0.022, 0.44, 0.36, 0.822);

/**
 * X-30, Y-45, Z-60, in extrinsic XYZ
 */
const quatD = new THREE.Quaternion(-0.392, -0.201, -0.532, 0.723);

describe('VRMRotationConstraint', () => {
  describe('update', () => {
    let scene: THREE.Scene;
    let destination: THREE.Object3D;
    let source: THREE.Object3D;
    let constraint: VRMRotationConstraint;

    function initConstraint(): void {
      constraint = new VRMRotationConstraint(destination, source);

      scene.updateMatrixWorld();
      constraint.setInitState();
    }

    describe('when both destination and source are direct children of the scene', () => {
      beforeEach(() => {
        scene = new THREE.Scene();

        destination = new THREE.Object3D();
        scene.add(destination);

        source = new THREE.Object3D();
        scene.add(source);

        initConstraint();
      });

      describe('when both destination and source are in its rest state', () => {
        it('does not do anything', () => {
          constraint.update();
          expect(destination.quaternion).toBeCloseToQuaternion(quatIdentity);
        });
      });

      describe('when the source is rotated', () => {
        beforeEach(() => {
          source.quaternion.multiply(quatB);
        });

        it('applies the constraint properly', () => {
          constraint.update();
          expect(destination.quaternion).toBeCloseToQuaternion(quatB);
        });

        describe('when the weight of the constraint is 0.5', () => {
          beforeEach(() => {
            constraint.weight = 0.5;
          });

          it('applies the constraint properly', () => {
            constraint.update();

            const expected = quatIdentity.clone().slerp(quatB, 0.5);
            expect(destination.quaternion).toBeCloseToQuaternion(expected);
          });
        });
      });

      describe('when the source has a rest rotation', () => {
        beforeEach(() => {
          source.quaternion.copy(quatA);
          initConstraint();
        });

        it('does not do anything', () => {
          constraint.update();

          expect(destination.quaternion).toBeCloseToQuaternion(quatIdentity);
        });

        describe('when the source is rotated', () => {
          beforeEach(() => {
            source.quaternion.multiply(quatB);
          });

          it('applies the constraint properly', () => {
            constraint.update();
            expect(destination.quaternion).toBeCloseToQuaternion(quatB);
          });
        });
      });

      describe('when the destination has a rest rotation', () => {
        beforeEach(() => {
          destination.quaternion.copy(quatA);
          initConstraint();
        });

        it('does not do anything', () => {
          constraint.update();

          expect(destination.quaternion).toBeCloseToQuaternion(quatA);
        });

        describe('when the source is rotated', () => {
          beforeEach(() => {
            source.quaternion.multiply(quatB);
          });

          it('applies the constraint properly', () => {
            constraint.update();

            const expected = quatA.clone().multiply(quatB);
            expect(destination.quaternion).toBeCloseToQuaternion(expected);
          });

          describe('when the weight of the constraint is 0.5', () => {
            beforeEach(() => {
              constraint.weight = 0.5;
            });

            it('applies the constraint properly', () => {
              constraint.update();

              const preExpected = quatA.clone().multiply(quatB);
              const expected = quatA.clone().slerp(preExpected, 0.5);
              expect(destination.quaternion).toBeCloseToQuaternion(expected);
            });
          });
        });
      });
    });

    describe('when both destination and source are children of a parent with a rest rotation', () => {
      let parent: THREE.Object3D;

      beforeEach(() => {
        scene = new THREE.Scene();

        parent = new THREE.Object3D();
        parent.quaternion.copy(quatC);
        scene.add(parent);

        destination = new THREE.Object3D();
        parent.add(destination);

        source = new THREE.Object3D();
        parent.add(source);

        initConstraint();
      });

      describe('when the source is rotated', () => {
        beforeEach(() => {
          source.quaternion.multiply(quatB);
        });

        it('applies the constraint properly', () => {
          constraint.update();
          expect(destination.quaternion).toBeCloseToQuaternion(quatB);
        });
      });
    });

    describe('when destination and source has different parents', () => {
      let parentDst: THREE.Object3D;
      let parentSrc: THREE.Object3D;

      beforeEach(() => {
        scene = new THREE.Scene();

        parentDst = new THREE.Object3D();
        parentDst.quaternion.copy(quatC);
        scene.add(parentDst);

        parentSrc = new THREE.Object3D();
        parentSrc.quaternion.copy(quatD);
        scene.add(parentSrc);

        destination = new THREE.Object3D();
        parentDst.add(destination);

        source = new THREE.Object3D();
        parentSrc.add(source);

        initConstraint();
      });

      describe('when the source is rotated', () => {
        beforeEach(() => {
          source.quaternion.multiply(quatB);
        });

        it('applies the constraint properly', () => {
          constraint.update();
          expect(destination.quaternion).toBeCloseToQuaternion(quatB);
        });
      });
    });
  });
});
