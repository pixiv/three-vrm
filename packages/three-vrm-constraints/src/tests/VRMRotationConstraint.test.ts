/* eslint-env jest */

import * as THREE from 'three';
import { setRandomTransform } from './utils/setRandomTransform';
import { Xorshift } from './utils/Xorshift';
import { toBeCloseToQuaternion } from './matchers/toBeCloseToQuaternion';
import { VRMRotationConstraint } from '../VRMRotationConstraint';
import { setRandomQuaternion } from './utils/setRandomQuaternion';

beforeEach(() => {
  expect.extend({ toBeCloseToQuaternion });
});

describe('VRMRotationConstraint', () => {
  let rng = new Xorshift(123456);

  let scene = new THREE.Scene();
  let modelRoot = new THREE.Object3D();
  let object = new THREE.Object3D();
  let parent = new THREE.Object3D();
  let source = new THREE.Object3D();
  let rot = new THREE.Quaternion();

  let constraint = new VRMRotationConstraint(object, modelRoot);

  beforeEach(() => {
    rng = new Xorshift(123456);

    scene = new THREE.Scene();

    modelRoot = new THREE.Object3D();
    scene.add(modelRoot);

    parent = new THREE.Object3D();
    setRandomTransform(parent, () => rng.gen());
    modelRoot.add(parent);

    object = new THREE.Object3D();
    setRandomTransform(object, () => rng.gen());
    parent.add(object);

    source = new THREE.Object3D();
    setRandomTransform(source, () => rng.gen());
    parent.add(source);

    rot = new THREE.Quaternion();
    setRandomQuaternion(rot, () => rng.gen());

    constraint = new VRMRotationConstraint(object, modelRoot);
    constraint.setSource(source);

    scene.updateMatrixWorld();
  });

  describe('update', () => {
    describe.each(['local', 'model'])('When source space is %s', (sourceSpace) => {
      let sourceDelta = new THREE.Quaternion();

      beforeEach(() => {
        constraint.sourceSpace = sourceSpace;

        sourceDelta = rot.clone();

        if (sourceSpace === 'model') {
          const quatBeforeRotate = new THREE.Quaternion();
          source.getWorldQuaternion(quatBeforeRotate);

          source.quaternion.multiply(rot);
          source.updateWorldMatrix(false, false);

          source.getWorldQuaternion(sourceDelta);
          sourceDelta.multiply(quatBeforeRotate.clone().inverse());

          // revert
          source.quaternion.multiply(rot.clone().inverse());
          source.updateWorldMatrix(false, false);
        }
      });

      describe('When destination space is LOCAL', () => {
        beforeEach(() => {
          constraint.destinationSpace = 'local';

          constraint.setInitState();
        });

        it('should apply the constraint properly', () => {
          const expected = object.quaternion.clone().multiply(sourceDelta);

          source.quaternion.multiply(rot);
          constraint.update();
          scene.updateMatrixWorld();

          expect(object.quaternion).toBeCloseToQuaternion(expected);
        });
      });

      describe('When destination space is MODEL', () => {
        beforeEach(() => {
          constraint.destinationSpace = 'model';

          constraint.setInitState();
        });

        it('should apply the constraint properly', () => {
          const expected = object.getWorldQuaternion(new THREE.Quaternion()).premultiply(sourceDelta);

          source.quaternion.multiply(rot);
          constraint.update();
          scene.updateMatrixWorld();

          const actual = object.getWorldQuaternion(new THREE.Quaternion());
          expect(actual).toBeCloseToQuaternion(expected);
        });
      });
    });
  });
});
