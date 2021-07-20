import * as THREE from 'three';

function vector3ToString(vector: THREE.Vector3): string {
  return `Vector3(${vector.x.toFixed(3)}, ${vector.y.toFixed(3)}, ${vector.z.toFixed(3)})`;
}

export function toBeCloseToVector3(
  received: THREE.Vector3,
  expected: THREE.Vector3,
  precision = 2,
): jest.CustomMatcherResult {
  const expectedDiff = Math.pow(10.0, -precision) / 2;

  const diff = received.distanceTo(expected);

  if (expectedDiff < diff) {
    return {
      pass: false,
      message: () => `The received vector doesn't match to the expected vector:
  expected ${vector3ToString(expected)}, received ${vector3ToString(received)}`,
    };
  } else {
    return {
      pass: true,
      message: () => 'The received vector approximately matches to the expected vector',
    };
  }
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    // eslint-disable-line
    interface Matchers<R> {
      toBeCloseToVector3(expected: THREE.Vector3, precision?: number): R;
    }
  }
}
