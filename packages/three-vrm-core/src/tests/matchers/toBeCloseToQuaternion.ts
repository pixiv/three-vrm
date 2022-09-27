import * as THREE from 'three';

function quatToString(quat: THREE.Quaternion): string {
  return `Quaternion(${quat.x.toFixed(3)}, ${quat.y.toFixed(3)}, ${quat.z.toFixed(3)}; ${quat.w.toFixed(3)})`;
}

export function toBeCloseToQuaternion(
  received: THREE.Quaternion,
  expected: THREE.Quaternion,
  precision = 2,
): jest.CustomMatcherResult {
  const expectedDiff = Math.pow(10.0, -precision) / 2;

  const dot = received.dot(expected);
  const diff = 1.0 - Math.abs(dot);

  if (expectedDiff < diff) {
    return {
      pass: false,
      message: () => `The received quaternion doesn't match to the expected quaternion:
  expected ${quatToString(expected)}, received ${quatToString(received)}`,
    };
  } else {
    return {
      pass: true,
      message: () => 'The received quaternion approximately matches to the expected quaternion',
    };
  }
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    // eslint-disable-line
    interface Matchers<R> {
      toBeCloseToQuaternion(expected: THREE.Quaternion, precision?: number): R;
    }
  }
}
