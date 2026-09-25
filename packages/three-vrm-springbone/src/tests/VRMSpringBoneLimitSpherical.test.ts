import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { VRMSpringBoneLimitSpherical } from '../VRMSpringBoneLimitSpherical';
import './matchers/toBeCloseToVector3';

const IDENTITY_MATRIX = new THREE.Matrix4();
const POSITIVE_X = new THREE.Vector3(1.0, 0.0, 0.0);
const NEGATIVE_X = new THREE.Vector3(-1.0, 0.0, 0.0);
const POSITIVE_Y = new THREE.Vector3(0.0, 1.0, 0.0);
const NEGATIVE_Y = new THREE.Vector3(0.0, -1.0, 0.0);
const QUAT_PZ90 = new THREE.Quaternion(0.0, 0.0, 0.707, 0.707);

function prepareLimit(limit: VRMSpringBoneLimitSpherical, boneAxis = POSITIVE_Y): VRMSpringBoneLimitSpherical {
  limit.internalPrecalcRotation(IDENTITY_MATRIX, boneAxis);
  return limit;
}

describe('VRMSpringBoneLimitSpherical', () => {
  describe('input angle clamping', () => {
    it('clamps pitch to [0, PI]', () => {
      expect(new VRMSpringBoneLimitSpherical({ pitch: -1.0 }).pitch).toBe(0.0);
      expect(new VRMSpringBoneLimitSpherical({ pitch: 3.15 }).pitch).toBe(Math.PI);
    });

    it('clamps yaw to [0, PI/2]', () => {
      expect(new VRMSpringBoneLimitSpherical({ yaw: -1.0 }).yaw).toBe(0.0);
      expect(new VRMSpringBoneLimitSpherical({ yaw: 1.58 }).yaw).toBe(Math.PI / 2.0);
    });
  });

  describe('calculateLimit', () => {
    it('leaves a direction inside the spherical limit unchanged', () => {
      const limit = prepareLimit(new VRMSpringBoneLimitSpherical({ pitch: Math.PI / 4.0, yaw: Math.PI / 4.0 }));
      const tailDir = new THREE.Vector3(1.0, 3.0, 2.0).normalize();

      expect(limit.calculateLimit(tailDir)).toBe(false);
      expect(tailDir).toBeCloseToVector3(new THREE.Vector3(1.0, 3.0, 2.0).normalize());
    });

    it('constrains a direction outside the spherical limit to the boundary', () => {
      const limit = prepareLimit(new VRMSpringBoneLimitSpherical({ pitch: Math.PI / 4.0, yaw: Math.PI / 6.0 }));
      const tailDir = new THREE.Vector3(Math.SQRT1_2, 0.0, -Math.SQRT1_2);

      expect(limit.calculateLimit(tailDir)).toBe(true);
      expect(tailDir).toBeCloseToVector3(new THREE.Vector3(0.5, 0.612, -0.612));
    });

    it('resolves the +X singularity toward the +Y-side boundary', () => {
      const limit = prepareLimit(new VRMSpringBoneLimitSpherical({ pitch: Math.PI / 4.0, yaw: Math.PI / 4.0 }));
      const tailDir = POSITIVE_X.clone();

      expect(limit.calculateLimit(tailDir)).toBe(true);
      expect(tailDir).toBeCloseToVector3(new THREE.Vector3(Math.SQRT1_2, Math.SQRT1_2, 0.0));
    });

    it('resolves the -X singularity toward the +Y-side boundary', () => {
      const limit = prepareLimit(new VRMSpringBoneLimitSpherical({ pitch: Math.PI / 4.0, yaw: Math.PI / 4.0 }));
      const tailDir = NEGATIVE_X.clone();

      expect(limit.calculateLimit(tailDir)).toBe(true);
      expect(tailDir).toBeCloseToVector3(new THREE.Vector3(-Math.SQRT1_2, Math.SQRT1_2, 0.0));
    });

    it('resolves the -Y singularity toward the +Z-side boundary', () => {
      const limit = prepareLimit(new VRMSpringBoneLimitSpherical({ pitch: Math.PI / 4.0, yaw: Math.PI / 4.0 }));
      const tailDir = NEGATIVE_Y.clone();

      expect(limit.calculateLimit(tailDir)).toBe(true);
      expect(tailDir).toBeCloseToVector3(new THREE.Vector3(0.0, Math.SQRT1_2, Math.SQRT1_2));
    });

    it('respects the configured limit rotation', () => {
      const limit = prepareLimit(
        new VRMSpringBoneLimitSpherical({ pitch: Math.PI / 4.0, yaw: Math.PI / 4.0, rotation: QUAT_PZ90 }),
      );
      const tailDir = POSITIVE_Y.clone();

      expect(limit.calculateLimit(tailDir)).toBe(true);
      expect(tailDir).toBeCloseToVector3(new THREE.Vector3(-Math.SQRT1_2, Math.SQRT1_2, 0.0));
    });
  });
});
