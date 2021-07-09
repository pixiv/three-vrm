/* eslint-env jest */

import * as THREE from 'three';
import { VRMNodeConstraint } from '../VRMNodeConstraint';
import { VRMMockedConstraint } from './VRMMockedConstraint';

describe('VRMNodeConstraint', () => {
  let scene = new THREE.Scene();
  let modelRoot = new THREE.Object3D();
  let object = new THREE.Object3D();

  beforeEach(() => {
    scene = new THREE.Scene();

    modelRoot = new THREE.Object3D();
    scene.add(modelRoot);

    object = new THREE.Object3D();
    modelRoot.add(object);
  });

  it('must be instantiated properly', () => {
    const constraint = new VRMMockedConstraint(object, modelRoot);
    expect(constraint).toBeInstanceOf(VRMNodeConstraint);
  });

  let constraint = new VRMMockedConstraint(object, modelRoot);

  beforeEach(() => {
    constraint = new VRMMockedConstraint(object, modelRoot);
  });

  describe('get source', () => {
    let source = new THREE.Object3D();

    beforeEach(() => {
      source = new THREE.Object3D();
      constraint.setSource(source);
    });

    it('must return its source', () => {
      expect(constraint.source).toBe(source);
    });
  });

  describe('get dependencies', () => {
    describe('when source is specified', () => {
      let source = new THREE.Object3D();

      beforeEach(() => {
        source = new THREE.Object3D();
        constraint.setSource(source);
      });

      it('must have the source as a dependency', () => {
        expect(constraint.dependencies).toContain(source);
      });
    });

    describe('when its destination space is local', () => {
      beforeEach(() => {
        constraint.destinationSpace = 'local';
      });

      it('must not have the parent of the object as a dependency', () => {
        expect(constraint.dependencies).not.toContain(object.parent!);
      });
    });

    describe('when its destination space is model', () => {
      beforeEach(() => {
        constraint.destinationSpace = 'model';
      });

      it('must have the parent of the object as a dependency', () => {
        expect(constraint.dependencies).toContain(object.parent!);
      });
    });
  });
});
