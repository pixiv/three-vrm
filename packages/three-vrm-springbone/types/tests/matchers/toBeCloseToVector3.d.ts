/// <reference types="jest" />
import * as THREE from 'three';
export declare function toBeCloseToVector3(received: THREE.Vector3, expected: THREE.Vector3, precision?: number): jest.CustomMatcherResult;
declare global {
    namespace jest {
        interface Matchers<R> {
            toBeCloseToVector3(expected: THREE.Vector3, precision?: number): R;
        }
    }
}
