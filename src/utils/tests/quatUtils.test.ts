import * as THREE from 'three';
import { quatExp, quatLog } from '../quatUtils';

describe('quatLog', () => {
  it('must compute a log of the identity quaternion correctly', () => {
    const quat = new THREE.Quaternion();

    quatLog(quat);

    expect(quat.x).toBeCloseTo(0.0);
    expect(quat.y).toBeCloseTo(0.0);
    expect(quat.z).toBeCloseTo(0.0);
    expect(quat.w).toBeCloseTo(0.0);
  });

  it('must compute a log of a unit quaternion correctly', () => {
    const axis = new THREE.Vector3(1.0, 2.0, 3.0).normalize();
    const theta = 0.8;
    const quat = new THREE.Quaternion().setFromAxisAngle(axis, theta);

    quatLog(quat);

    expect(quat.x).toBeCloseTo(0.5 * theta * axis.x);
    expect(quat.y).toBeCloseTo(0.5 * theta * axis.y);
    expect(quat.z).toBeCloseTo(0.5 * theta * axis.z);
    expect(quat.w).toBeCloseTo(0.0);
  });
});

describe('quatExp', () => {
  it('must compute an exp of the exponential map of the identity quaternion correctly', () => {
    const quat = new THREE.Quaternion().set(0.0, 0.0, 0.0, 0.0);

    quatExp(quat);

    expect(quat.x).toBeCloseTo(0.0);
    expect(quat.y).toBeCloseTo(0.0);
    expect(quat.z).toBeCloseTo(0.0);
    expect(quat.w).toBeCloseTo(1.0);
  });

  it('must compute an exp of an exponential map of a unit quaternion correctly', () => {
    const axis = new THREE.Vector3(1.0, 2.0, 3.0).normalize();
    const theta = 0.8;

    const quat = new THREE.Quaternion().set(0.5 * theta * axis.x, 0.5 * theta * axis.y, 0.5 * theta * axis.z, 0.0);

    quatExp(quat);

    const quatExpected = new THREE.Quaternion().setFromAxisAngle(axis, theta);

    expect(quat.x).toBeCloseTo(quatExpected.x);
    expect(quat.y).toBeCloseTo(quatExpected.y);
    expect(quat.z).toBeCloseTo(quatExpected.z);
    expect(quat.w).toBeCloseTo(quatExpected.w);
  });
});
