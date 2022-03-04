/* eslint-env jest */

import * as THREE from 'three';
import { VRMNodeConstraintManager } from '../VRMNodeConstraintManager';
import { VRMMockedConstraint } from './VRMMockedConstraint';

describe('VRMNodeConstraintManager', () => {
  let manager: VRMNodeConstraintManager;

  beforeEach(() => {
    manager = new VRMNodeConstraintManager();
  });

  describe('addConstraint', () => {
    let destination: THREE.Object3D;
    let source: THREE.Object3D;
    let constraint: VRMMockedConstraint;

    beforeEach(() => {
      destination = new THREE.Object3D();
      source = new THREE.Object3D();
      constraint = new VRMMockedConstraint(destination, source);
    });

    it('adds a constraint', () => {
      manager.addConstraint(constraint);

      expect(manager.constraints).toContain(constraint);
    });
  });

  describe('deleteConstraint', () => {
    let destination: THREE.Object3D;
    let source: THREE.Object3D;
    let constraint: VRMMockedConstraint;

    beforeEach(() => {
      destination = new THREE.Object3D();
      source = new THREE.Object3D();
      constraint = new VRMMockedConstraint(destination, source);

      manager.addConstraint(constraint);
    });

    it('deletes a constraint', () => {
      manager.deleteConstraint(constraint);

      expect(manager.constraints).not.toContain(constraint);
    });
  });

  describe('setInitState', () => {
    describe('when there are no dependencies', () => {
      let scene: THREE.Scene;

      let destinationA: THREE.Object3D;
      let sourceA: THREE.Object3D;
      let destinationB: THREE.Object3D;
      let sourceB: THREE.Object3D;

      let constraintA: VRMMockedConstraint;
      let constraintB: VRMMockedConstraint;

      beforeEach(() => {
        scene = new THREE.Scene();

        destinationA = new THREE.Object3D();
        scene.add(destinationA);

        sourceA = new THREE.Object3D();
        scene.add(sourceA);

        destinationB = new THREE.Object3D();
        scene.add(destinationB);

        sourceB = new THREE.Object3D();
        scene.add(sourceB);

        constraintA = new VRMMockedConstraint(destinationA, sourceA);
        constraintB = new VRMMockedConstraint(destinationB, sourceB);

        manager.addConstraint(constraintA);
        manager.addConstraint(constraintB);
      });

      it('initializes constraints', () => {
        const constraintsInit: string[] = [];
        constraintA.onSetInitState = () => constraintsInit.push('A');
        constraintB.onSetInitState = () => constraintsInit.push('B');

        manager.setInitState();

        expect(constraintsInit).toEqual(['A', 'B']);
      });
    });
  });

  describe('update', () => {
    describe('when there are no dependencies', () => {
      let scene: THREE.Scene;

      let destinationA: THREE.Object3D;
      let sourceA: THREE.Object3D;
      let destinationB: THREE.Object3D;
      let sourceB: THREE.Object3D;

      let constraintA: VRMMockedConstraint;
      let constraintB: VRMMockedConstraint;

      beforeEach(() => {
        scene = new THREE.Scene();

        destinationA = new THREE.Object3D();
        scene.add(destinationA);

        sourceA = new THREE.Object3D();
        scene.add(sourceA);

        destinationB = new THREE.Object3D();
        scene.add(destinationB);

        sourceB = new THREE.Object3D();
        scene.add(sourceB);

        constraintA = new VRMMockedConstraint(destinationA, sourceA);
        constraintB = new VRMMockedConstraint(destinationB, sourceB);

        manager.addConstraint(constraintA);
        manager.addConstraint(constraintB);
      });

      it('updates constraints', () => {
        const constraintsUpdated: string[] = [];
        constraintA.onUpdate = () => constraintsUpdated.push('A');
        constraintB.onUpdate = () => constraintsUpdated.push('B');

        manager.update();

        expect(constraintsUpdated).toEqual(['A', 'B']);
      });
    });

    describe('when there is a dependency', () => {
      /**
       * - scene
       *   - objA (depends on objB)
       *   - objB (depends on objC)
       *   - objC
       */

      let scene: THREE.Scene;

      let objA: THREE.Object3D;
      let objB: THREE.Object3D;
      let objC: THREE.Object3D;

      let constraintA: VRMMockedConstraint;
      let constraintB: VRMMockedConstraint;

      beforeEach(() => {
        scene = new THREE.Scene();

        objA = new THREE.Object3D();
        scene.add(objA);

        objB = new THREE.Object3D();
        scene.add(objB);

        objC = new THREE.Object3D();
        scene.add(objC);

        constraintA = new VRMMockedConstraint(objA, objB);
        constraintA.dependencies.add(objB);

        constraintB = new VRMMockedConstraint(objB, objC);
        constraintB.dependencies.add(objC);

        manager.addConstraint(constraintA);
        manager.addConstraint(constraintB);
      });

      it('initializes constraints in a proper order', () => {
        const constraintsUpdated: string[] = [];
        constraintA.onUpdate = () => constraintsUpdated.push('A');
        constraintB.onUpdate = () => constraintsUpdated.push('B');

        manager.update();

        expect(constraintsUpdated).toEqual(['B', 'A']);
      });
    });

    describe('when there is a dependency in ancestor', () => {
      /**
       * - scene
       *   - objA (depends on objBChild)
       *   - objB (depends on objC)
       *     - objBChild
       *   - objC
       */

      let scene: THREE.Scene;

      let objA: THREE.Object3D;
      let objB: THREE.Object3D;
      let objBChild: THREE.Object3D;
      let objC: THREE.Object3D;

      let constraintA: VRMMockedConstraint;
      let constraintB: VRMMockedConstraint;

      beforeEach(() => {
        scene = new THREE.Scene();

        objA = new THREE.Object3D();
        scene.add(objA);

        objB = new THREE.Object3D();
        scene.add(objB);

        objBChild = new THREE.Object3D();
        objB.add(objBChild);

        objC = new THREE.Object3D();
        scene.add(objC);

        constraintA = new VRMMockedConstraint(objA, objBChild);
        constraintA.dependencies.add(objBChild);

        constraintB = new VRMMockedConstraint(objB, objC);
        constraintB.dependencies.add(objC);

        manager.addConstraint(constraintA);
        manager.addConstraint(constraintB);
      });

      it('initializes constraints in a proper order', () => {
        const constraintsUpdated: string[] = [];
        constraintA.onUpdate = () => constraintsUpdated.push('A');
        constraintB.onUpdate = () => constraintsUpdated.push('B');

        manager.update();

        expect(constraintsUpdated).toEqual(['B', 'A']);
      });
    });
  });
});
