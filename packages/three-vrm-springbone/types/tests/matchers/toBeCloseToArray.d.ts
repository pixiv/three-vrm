/// <reference types="jest" />
export declare function toBeCloseToArray(received: number[], expected: number[], precision?: number): jest.CustomMatcherResult;
declare global {
    namespace jest {
        interface Matchers<R> {
            toBeCloseToArray(expected: number[], precision?: number): R;
        }
    }
}
