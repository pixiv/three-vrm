import * as THREE from 'three';
import { calcAzimuthAltitude } from '../calcAzimuthAltitude';

describe('calcAzimuthAltitude', () => {
  it('processes a vector means azimuth = 0, altitude = 0', () => {
    const [azimuth, altitude] = calcAzimuthAltitude(new THREE.Vector3(1.0, 0.0, 0.0));
    expect(azimuth).toBeCloseTo(0.0);
    expect(altitude).toBeCloseTo(0.0);
  });

  it('processes a vector means azimuth = PI / 4, altitude = 0', () => {
    const [azimuth, altitude] = calcAzimuthAltitude(new THREE.Vector3(0.707, 0.0, -0.707));
    expect(azimuth).toBeCloseTo(0.25 * Math.PI);
    expect(altitude).toBeCloseTo(0.0);
  });

  it('processes a vector means azimuth = 0, altitude = PI / 4', () => {
    const [azimuth, altitude] = calcAzimuthAltitude(new THREE.Vector3(0.707, 0.707, 0.0));
    expect(azimuth).toBeCloseTo(0.0);
    expect(altitude).toBeCloseTo(0.25 * Math.PI);
  });

  it('processes a vector means azimuth = PI / 3, altitude = PI / 3', () => {
    const [azimuth, altitude] = calcAzimuthAltitude(new THREE.Vector3(0.25, 0.866, -0.433));
    expect(azimuth).toBeCloseTo(Math.PI / 3.0);
    expect(altitude).toBeCloseTo(Math.PI / 3.0);
  });
});
