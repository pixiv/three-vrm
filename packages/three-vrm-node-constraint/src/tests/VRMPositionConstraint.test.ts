/* eslint-env jest */

import * as THREE from 'three';
import { VRMPositionConstraint } from '../VRMPositionConstraint';
import { setRandomTransform } from './utils/setRandomTransform';
import { Xorshift } from './utils/Xorshift';
import { toBeCloseToVector3 } from './matchers/toBeCloseToVector3';
import { Vector3 } from 'three';
import { setRandomVector3 } from './utils/setRandomVector3';

beforeEach(() => {
  expect.extend({ toBeCloseToVector3 });
});

describe('VRMPositionConstraint', () => {
  let rng = new Xorshift(123456);

  let scene = new THREE.Scene();
  let modelRoot = new THREE.Object3D();
  let object = new THREE.Object3D();
  let parent = new THREE.Object3D();
  let source = new THREE.Object3D();
  let move = new THREE.Vector3();

  let constraint = new VRMPositionConstraint(object, modelRoot);

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

    move = new THREE.Vector3();
    setRandomVector3(move, () => rng.gen());

    constraint = new VRMPositionConstraint(object, modelRoot);
    constraint.setSource(source);

    scene.updateMatrixWorld();
  });

  describe('update', () => {
    describe.each(['local', 'model'])('When source space is %s', (sourceSpace) => {
      let sourceDelta = new THREE.Vector3();

      beforeEach(() => {
        constraint.sourceSpace = sourceSpace;

        sourceDelta = move.clone();

        if (sourceSpace === 'model') {
          const positionBeforeMove = new THREE.Vector3();
          source.getWorldPosition(positionBeforeMove);

          source.position.add(move);
          source.updateWorldMatrix(false, false);

          source.getWorldPosition(sourceDelta);
          sourceDelta.sub(positionBeforeMove);

          // revert
          source.position.sub(move);
          source.updateWorldMatrix(false, false);
        }
      });

      describe('When destination space is LOCAL', () => {
        beforeEach(() => {
          constraint.destinationSpace = 'local';

          constraint.setInitState();
        });

        it('should apply the constraint properly', () => {
          const expected = object.position.clone().add(sourceDelta);

          source.position.add(move);
          constraint.update();
          scene.updateMatrixWorld();

          expect(object.position).toBeCloseToVector3(expected);
        });
      });

      describe('When destination space is MODEL', () => {
        beforeEach(() => {
          constraint.destinationSpace = 'model';

          constraint.setInitState();
        });

        it('should apply the constraint properly', () => {
          const expected = object.getWorldPosition(new Vector3()).add(sourceDelta);

          source.position.add(move);
          constraint.update();
          scene.updateMatrixWorld();

          const actual = object.getWorldPosition(new Vector3());

          expect(actual).toBeCloseToVector3(expected);
        });
      });
    });
  });
});
