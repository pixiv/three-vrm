/* eslint-env jest */

import * as THREE from 'three';
import { toBeCloseToQuaternion } from './matchers/toBeCloseToQuaternion';
import { VRMRollConstraint } from '../VRMRollConstraint';

expect.extend({ toBeCloseToQuaternion });

/**
 * No rotation
 */
const quatIdentity = new THREE.Quaternion(0.0, 0.0, 0.0, 1.0);

/**
 * Turn the right to front
 */
const quatNY90 = new THREE.Quaternion(0.0, -0.707, 0.0, 0.707);

/**
 * Turn the right to front-right
 */
const quatNY45 = new THREE.Quaternion(0.0, -0.383, 0.0, 0.924);

/**
 * Turn the up to left
 */
const quatPZ90 = new THREE.Quaternion(0.0, 0.0, 0.707, 0.707);

/**
 * Turn the up to front
 */
const quatPX90 = new THREE.Quaternion(0.707, 0.0, 0.0, 0.707);

/**
 * Rotate 180deg around Y axis
 */
const quatPY180 = new THREE.Quaternion(0.0, 1.0, 0.0, 0.0);

/**
 * XYZ -> -Y-ZX
 */
const quatPX90PZ90 = new THREE.Quaternion(0.5, -0.5, 0.5, 0.5);

describe('VRMRollConstraint', () => {
  describe('update', () => {
    let scene: THREE.Scene;
    let destination: THREE.Object3D;
    let source: THREE.Object3D;
    let constraint: VRMRollConstraint;

    function initConstraint(): void {
      constraint = new VRMRollConstraint(destination, source);

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

      describe('when the roll axis is Y', () => {
        beforeEach(() => {
          constraint.rollAxis = 'Y';
        });

        it('does not do anything', () => {
          constraint.update();
          expect(destination.quaternion).toBeCloseToQuaternion(quatIdentity);
        });

        describe('when the source is rotated around Y axis', () => {
          beforeEach(() => {
            source.quaternion.multiply(quatNY90);
          });

          it('makes the destination rotate around Y axis', () => {
            constraint.update();
            expect(destination.quaternion).toBeCloseToQuaternion(quatNY90);
          });

          describe('when the weight of the constraint is 0.5', () => {
            beforeEach(() => {
              constraint.weight = 0.5;
            });

            it('makes the destination rotate around Y axis but smaller', () => {
              constraint.update();
              expect(destination.quaternion).toBeCloseToQuaternion(quatNY45);
            });
          });
        });

        describe('when the source is rotated around Z axis', () => {
          beforeEach(() => {
            source.quaternion.multiply(quatPZ90);
          });

          it('does not do anything', () => {
            constraint.update();

            expect(destination.quaternion).toBeCloseToQuaternion(quatIdentity);
          });
        });
      });

      describe('when the source has a rest rotation', () => {
        beforeEach(() => {
          source.applyQuaternion(quatPX90);
          initConstraint();
        });

        describe('when the roll axis is Y', () => {
          beforeEach(() => {
            constraint.rollAxis = 'Y';
          });

          it('does not do anything', () => {
            constraint.update();
            expect(destination.quaternion).toBeCloseToQuaternion(quatIdentity);
          });

          describe('when the source is rotated around Y axis', () => {
            beforeEach(() => {
              source.quaternion.multiply(quatNY90);
            });

            it('does not do anything', () => {
              constraint.update();
              expect(destination.quaternion).toBeCloseToQuaternion(quatIdentity);
            });
          });

          describe('when the source is rotated around Z axis', () => {
            beforeEach(() => {
              source.quaternion.multiply(quatPZ90);
            });

            it('makes the destination rotate around Y axis', () => {
              constraint.update();
              expect(destination.quaternion).toBeCloseToQuaternion(quatNY90);
            });
          });
        });
      });

      describe('when the destination has a rest rotation around X axis', () => {
        beforeEach(() => {
          destination.applyQuaternion(quatPX90);
          initConstraint();
        });

        describe('when the roll axis is Z', () => {
          beforeEach(() => {
            constraint.rollAxis = 'Z';
          });

          it('does not do anything', () => {
            constraint.update();
            expect(destination.quaternion).toBeCloseToQuaternion(quatPX90);
          });

          describe('when the source is rotated around Y axis', () => {
            beforeEach(() => {
              source.quaternion.multiply(quatNY90);
            });

            it('makes the destination rotate around Z axis', () => {
              constraint.update();
              expect(destination.quaternion).toBeCloseToQuaternion(quatPX90PZ90);
            });
          });

          describe('when the source is rotated around Z axis', () => {
            beforeEach(() => {
              source.quaternion.multiply(quatPZ90);
            });

            it('does not do anything', () => {
              constraint.update();
              expect(destination.quaternion).toBeCloseToQuaternion(quatPX90);
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
        parent.quaternion.copy(quatPZ90);
        scene.add(parent);

        destination = new THREE.Object3D();
        parent.add(destination);

        source = new THREE.Object3D();
        parent.add(source);

        initConstraint();
      });

      describe('when the roll axis is Y', () => {
        beforeEach(() => {
          constraint.rollAxis = 'Y';
        });

        describe('when the source is rotated', () => {
          beforeEach(() => {
            source.quaternion.multiply(quatNY90);
          });

          it('applies the constraint properly', () => {
            constraint.update();

            expect(destination.quaternion).toBeCloseToQuaternion(quatNY90);
          });
        });
      });
    });

    describe('when destination and source has different parents', () => {
      let parentDst: THREE.Object3D;
      let parentSrc: THREE.Object3D;

      beforeEach(() => {
        scene = new THREE.Scene();

        parentDst = new THREE.Object3D();
        parentDst.quaternion.copy(quatPZ90);
        scene.add(parentDst);

        parentSrc = new THREE.Object3D();
        parentSrc.quaternion.copy(quatPY180);
        scene.add(parentSrc);

        destination = new THREE.Object3D();
        parentDst.add(destination);

        source = new THREE.Object3D();
        parentSrc.add(source);

        initConstraint();
      });

      describe('when the roll axis is Y', () => {
        beforeEach(() => {
          constraint.rollAxis = 'Y';
        });

        describe('when the source is rotated', () => {
          beforeEach(() => {
            source.quaternion.multiply(quatNY90);
          });

          it('applies the constraint properly', () => {
            constraint.update();

            expect(destination.quaternion).toBeCloseToQuaternion(quatNY90);
          });
        });
      });
    });
  });
});
