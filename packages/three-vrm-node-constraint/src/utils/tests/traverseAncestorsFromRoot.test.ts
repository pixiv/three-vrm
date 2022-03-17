import * as THREE from 'three';
import { traverseAncestorsFromRoot } from '../traverseAncestorsFromRoot';

describe('traverseAncestorsFromRoot', () => {
  it('should traverse ancestors from root', () => {
    /**
     * - scene
     *   - objA
     *     - objB
     *       - objC <- this is gonna be given to the function
     *         - objD <- this is a dummy
     */

    const scene = new THREE.Scene();

    const objA = new THREE.Object3D();
    scene.add(objA);

    const objB = new THREE.Object3D();
    objA.add(objB);

    const objC = new THREE.Object3D();
    objB.add(objC);

    const objD = new THREE.Object3D();
    objC.add(objD);

    const processed: THREE.Object3D[] = [];

    traverseAncestorsFromRoot(objC, (obj) => processed.push(obj));

    expect(processed).toEqual([scene, objA, objB, objC]);
  });
});
