/// <reference types="jest" />
import * as THREE from 'three';
export declare function toBeCloseToQuaternion(received: THREE.Quaternion, expected: THREE.Quaternion, precision?: number): jest.CustomMatcherResult;
declare global {
    namespace jest {
        interface Matchers<R> {
            toBeCloseToQuaternion(expected: THREE.Quaternion, precision?: number): R;
        }
    }
}
