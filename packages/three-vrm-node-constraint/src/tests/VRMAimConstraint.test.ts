/* eslint-env jest */

import * as THREE from 'three';
import { toBeCloseToQuaternion } from './matchers/toBeCloseToQuaternion';
import { VRMAimConstraint } from '../VRMAimConstraint';

expect.extend({ toBeCloseToQuaternion });

/**
 * No rotation
 */
const quatIdentity = new THREE.Quaternion(0.0, 0.0, 0.0, 1.0);

/**
 * Turn the up to left
 */
const quatPZ90 = new THREE.Quaternion(0.0, 0.0, 0.707, 0.707);

/**
 * Turn the up to right
 */
const quatNZ90 = new THREE.Quaternion(0.0, 0.0, -0.707, 0.707);

/**
 * Turn the up to up-right
 */
const quatNZ45 = new THREE.Quaternion(0.0, 0.0, -0.383, 0.924);

/**
 * Turn the up to down-right
 */
const quatNZ135 = new THREE.Quaternion(0.0, 0.0, -0.924, 0.383);

/**
 * Turn the up to front
 */
const quatPX90 = new THREE.Quaternion(0.707, 0.0, 0.0, 0.707);

/**
 * Turn the right to front
 */
const quatNY90 = new THREE.Quaternion(0.0, -0.707, 0.0, 0.707);

/**
 * XYZ -> YZX
 */
const quatNZ90NY90 = new THREE.Quaternion(-0.5, -0.5, -0.5, 0.5);

/**
 * X is front, Y is up-right
 */
const quatNZ45NY90 = new THREE.Quaternion(-0.271, -0.653, -0.271, 0.653);

/**
 * Rotate 180deg around Y axis
 */
const quatPY180 = new THREE.Quaternion(0.0, 1.0, 0.0, 0.0);

/**
 * Rotate 90deg around axis (1, 0, 1)
 */
const quat90AroundXZ = new THREE.Quaternion(0.5, 0.0, 0.5, 0.707);

describe('VRMAimConstraint', () => {
  describe('update', () => {
    let scene: THREE.Scene;
    let destination: THREE.Object3D;
    let source: THREE.Object3D;
    let constraint: VRMAimConstraint;

    function initConstraint(): void {
      constraint = new VRMAimConstraint(destination, source);

      scene.updateMatrixWorld();
      constraint.setInitState();
    }

    describe('when both destination and source are direct children of the scene', () => {
      beforeEach(() => {
        scene = new THREE.Scene();

        destination = new THREE.Object3D();
        scene.add(destination);

        source = new THREE.Object3D();
        source.position.set(0.0, 1.0, 0.0);
        scene.add(source);

        initConstraint();
      });

      describe('when the aim axis is +Y', () => {
        beforeEach(() => {
          constraint.aimAxis = 'PositiveY';
        });

        it('makes the +Y of the destination look at +Y', () => {
          constraint.update();
          expect(destination.quaternion).toBeCloseToQuaternion(quatIdentity);
        });

        describe('when the source moves to the right of the destination', () => {
          beforeEach(() => {
            source.position.set(1.0, 0.0, 0.0);
          });

          it('makes the +Y of the destination look at +X', () => {
            constraint.update();
            expect(destination.quaternion).toBeCloseToQuaternion(quatNZ90);
          });

          describe('when the weight of the constraint is 0.5', () => {
            beforeEach(() => {
              constraint.weight = 0.5;
            });

            it('makes the +Y of the destination look at up-right', () => {
              constraint.update();
              expect(destination.quaternion).toBeCloseToQuaternion(quatNZ45);
            });
          });
        });

        describe('when the source moves to the front of the destination', () => {
          beforeEach(() => {
            source.position.set(0.0, 0.0, 1.0);
          });

          it('makes the +Y of the destination look at +Z', () => {
            constraint.update();
            expect(destination.quaternion).toBeCloseToQuaternion(quatPX90);
          });
        });
      });

      describe('when the aim axis is -Z', () => {
        beforeEach(() => {
          constraint.aimAxis = 'NegativeZ';
        });

        describe('when the source moves to the right of the destination', () => {
          beforeEach(() => {
            source.position.set(1.0, 0.0, 0.0);
          });

          it('makes the -Z of the destination look at +X', () => {
            constraint.update();
            expect(destination.quaternion).toBeCloseToQuaternion(quatNY90);
          });
        });
      });

      describe('when the source is at the right of the destination BY REST', () => {
        beforeEach(() => {
          source.position.set(1.0, 0.0, 0.0);
          initConstraint();
        });

        describe('when the aim axis is +Y', () => {
          beforeEach(() => {
            constraint.aimAxis = 'PositiveY';
          });

          it('makes the +Y of the destination look at +X', () => {
            constraint.update();
            expect(destination.quaternion).toBeCloseToQuaternion(quatNZ90);
          });
        });
      });

      describe('when the destination has a rest rotation', () => {
        beforeEach(() => {
          destination.quaternion.copy(quatNY90);
          initConstraint();
        });

        describe('when the aim axis is +Y', () => {
          beforeEach(() => {
            constraint.aimAxis = 'PositiveY';
          });

          describe('when the source moves to the right of the destination', () => {
            beforeEach(() => {
              source.position.set(1.0, 0.0, 0.0);
            });

            it('makes the +Y of the destination look at +X while preserving its rest roll', () => {
              constraint.update();
              expect(destination.quaternion).toBeCloseToQuaternion(quatNZ90NY90);
            });

            describe('when the weight of the constraint is 0.5', () => {
              beforeEach(() => {
                constraint.weight = 0.5;
              });

              it('makes the +Y of the destination look at up-right while preserving its rest roll', () => {
                constraint.update();
                expect(destination.quaternion).toBeCloseToQuaternion(quatNZ45NY90);
              });
            });
          });
        });
      });

      describe('when the destination is at (0, 1, 0) in the rest position', () => {
        beforeEach(() => {
          destination.position.set(0, 1, 0);
          initConstraint();
        });

        describe('when the aim axis is +Y', () => {
          beforeEach(() => {
            constraint.aimAxis = 'PositiveY';
          });

          describe('when the source moves to (1, 0, 0)', () => {
            beforeEach(() => {
              source.position.set(1.0, 0.0, 0.0);
            });

            it('makes the +Y of the destination look at down-right', () => {
              constraint.update();
              expect(destination.quaternion).toBeCloseToQuaternion(quatNZ135);
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
        parent.quaternion.copy(quatPY180);
        scene.add(parent);

        destination = new THREE.Object3D();
        parent.add(destination);

        source = new THREE.Object3D();
        parent.add(source);

        initConstraint();
      });

      describe('when the aim axis is +Y', () => {
        beforeEach(() => {
          constraint.aimAxis = 'PositiveY';
        });

        it('makes the +Y of the destination look at +Y', () => {
          constraint.update();
          expect(destination.quaternion).toBeCloseToQuaternion(quatIdentity);
        });

        describe('when the source moves to the right (which is left in world coord) of the destination', () => {
          beforeEach(() => {
            source.position.set(1.0, 0.0, 0.0);
          });

          it('makes the +Y of the destination look at +X in its local coordinate', () => {
            constraint.update();
            expect(destination.quaternion).toBeCloseToQuaternion(quatNZ90);
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
        parentDst.quaternion.copy(quatPY180);
        scene.add(parentDst);

        parentSrc = new THREE.Object3D();
        parentSrc.position.set(1.0, 0.0, 0.0);
        parentSrc.quaternion.copy(quatPX90);
        scene.add(parentSrc);

        destination = new THREE.Object3D();
        parentDst.add(destination);

        source = new THREE.Object3D();
        parentSrc.add(source);

        initConstraint();
      });

      describe('when the aim axis is +Y', () => {
        beforeEach(() => {
          constraint.aimAxis = 'PositiveY';
        });

        it('makes the +Y of the destination look at the source', () => {
          constraint.update();
          expect(destination.quaternion).toBeCloseToQuaternion(quatPZ90);
        });

        describe('when the source moves to the (0, -1, 0) in its local coordinate', () => {
          beforeEach(() => {
            source.position.set(0.0, -1.0, 0.0);
          });

          it('makes the +Y of the destination look at the source', () => {
            constraint.update();
            expect(destination.quaternion).toBeCloseToQuaternion(quat90AroundXZ);
          });
        });
      });
    });
  });
});
