/* eslint-env jest */

import * as THREE from 'three';
import { setRandomTransform } from './utils/setRandomTransform';
import { Xorshift } from './utils/Xorshift';
import { toBeCloseToQuaternion } from './matchers/toBeCloseToQuaternion';
import { VRMAimConstraint } from '../VRMAimConstraint';
import { setRandomVector3 } from './utils/setRandomVector3';

const VEC3_UP = new THREE.Vector3(0.0, 1.0, 0.0);

beforeEach(() => {
  expect.extend({ toBeCloseToQuaternion });
});

describe('VRMAimConstraint', () => {
  let rng = new Xorshift(123456);

  let scene = new THREE.Scene();
  let modelRoot = new THREE.Object3D();
  let object = new THREE.Object3D();
  let parent = new THREE.Object3D();
  let source = new THREE.Object3D();
  let move = new THREE.Vector3();

  let constraint = new VRMAimConstraint(object, modelRoot);

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

    constraint = new VRMAimConstraint(object, modelRoot);
    constraint.setSource(source);

    scene.updateMatrixWorld();
  });

  describe('update', () => {
    describe.each(['local', 'model'])('When source space is %s', (sourceSpace) => {
      const sourcePos = new THREE.Vector3();
      const sourcePosAfter = new THREE.Vector3();

      beforeEach(() => {
        constraint.sourceSpace = sourceSpace;

        if (sourceSpace === 'local') {
          sourcePos.copy(source.position);

          sourcePosAfter.copy(source.position).add(move);
        } else {
          source.getWorldPosition(sourcePos);

          source.position.add(move);
          source.updateWorldMatrix(false, false);

          source.getWorldPosition(sourcePosAfter);

          // revert
          source.position.sub(move);
          source.updateWorldMatrix(false, false);
        }
      });

      describe('When destination space is LOCAL', () => {
        const destinationPos = new THREE.Vector3();
        const quatLookAtDelta = new THREE.Quaternion();

        beforeEach(() => {
          constraint.destinationSpace = 'local';

          destinationPos.copy(object.position);

          const quatInvLookAtBefore = new THREE.Quaternion()
            .setFromRotationMatrix(new THREE.Matrix4().lookAt(sourcePos, destinationPos, VEC3_UP))
            .inverse();
          quatLookAtDelta.setFromRotationMatrix(new THREE.Matrix4().lookAt(sourcePosAfter, destinationPos, VEC3_UP));
          quatLookAtDelta.multiply(quatInvLookAtBefore);

          constraint.setInitState();
        });

        it('should apply the constraint properly', () => {
          const expected = object.quaternion.clone().premultiply(quatLookAtDelta);

          source.position.add(move);
          constraint.update();
          scene.updateMatrixWorld();

          expect(object.quaternion).toBeCloseToQuaternion(expected);
        });
      });

      describe('When destination space is MODEL', () => {
        const destinationPos = new THREE.Vector3();
        const quatLookAtDelta = new THREE.Quaternion();

        beforeEach(() => {
          constraint.destinationSpace = 'model';

          object.getWorldPosition(destinationPos);

          const quatInvLookAtBefore = new THREE.Quaternion()
            .setFromRotationMatrix(new THREE.Matrix4().lookAt(sourcePos, destinationPos, VEC3_UP))
            .inverse();
          quatLookAtDelta.setFromRotationMatrix(new THREE.Matrix4().lookAt(sourcePosAfter, destinationPos, VEC3_UP));
          quatLookAtDelta.multiply(quatInvLookAtBefore);

          constraint.setInitState();
        });

        it('should apply the constraint properly', () => {
          const expected = object.getWorldQuaternion(new THREE.Quaternion()).premultiply(quatLookAtDelta);

          source.position.add(move);
          constraint.update();
          scene.updateMatrixWorld();

          const actual = object.getWorldQuaternion(new THREE.Quaternion());
          expect(actual).toBeCloseToQuaternion(expected);
        });
      });
    });
  });
});
