import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { VRMSpringBoneLimitHinge } from '../VRMSpringBoneLimitHinge';
import './matchers/toBeCloseToVector3';

const SQRT3 = Math.sqrt(3.0);

const IDENTITY_MATRIX = new THREE.Matrix4();
const POSITIVE_X = new THREE.Vector3(1.0, 0.0, 0.0);
const NEGATIVE_X = new THREE.Vector3(-1.0, 0.0, 0.0);
const POSITIVE_Y = new THREE.Vector3(0.0, 1.0, 0.0);
const NEGATIVE_Y = new THREE.Vector3(0.0, -1.0, 0.0);
const NEGATIVE_Z = new THREE.Vector3(0.0, 0.0, -1.0);
const QUAT_PX90 = new THREE.Quaternion(0.707, 0.0, 0.0, 0.707);

function prepareLimit(limit: VRMSpringBoneLimitHinge, boneAxis = POSITIVE_Y): VRMSpringBoneLimitHinge {
  limit.internalPrecalcRotation(IDENTITY_MATRIX, boneAxis);
  return limit;
}

describe('VRMSpringBoneLimitHinge', () => {
  describe('input angle clamping', () => {
    it('clamps angles to [0, PI]', () => {
      expect(new VRMSpringBoneLimitHinge({ angle: -1.0 }).angle).toBe(0.0);
      expect(new VRMSpringBoneLimitHinge({ angle: 3.15 }).angle).toBe(Math.PI);
    });
  });

  describe('calculateLimit', () => {
    it('leaves a direction inside the hinge unchanged', () => {
      const limit = prepareLimit(new VRMSpringBoneLimitHinge({ angle: Math.PI / 2.0 }));
      const tailDir = new THREE.Vector3(0.0, Math.SQRT1_2, Math.SQRT1_2);

      expect(limit.calculateLimit(tailDir)).toBe(false);
      expect(tailDir).toBeCloseToVector3(new THREE.Vector3(0.0, Math.SQRT1_2, Math.SQRT1_2));
    });

    it('constrains a direction within the disc plane to the hinge boundary', () => {
      const limit = prepareLimit(new VRMSpringBoneLimitHinge({ angle: Math.PI / 4.0 }));
      const tailDir = NEGATIVE_Z.clone();

      expect(limit.calculateLimit(tailDir)).toBe(true);
      expect(tailDir).toBeCloseToVector3(new THREE.Vector3(0.0, Math.SQRT1_2, -Math.SQRT1_2));
    });

    it('constrains a direction outside the disc plane to the hinge boundary', () => {
      const limit = prepareLimit(new VRMSpringBoneLimitHinge({ angle: Math.PI / 4.0 }));
      const tailDir = new THREE.Vector3(-SQRT3 / 3, SQRT3 / 3, -SQRT3 / 3);

      expect(limit.calculateLimit(tailDir)).toBe(true);
      expect(tailDir).toBeCloseToVector3(new THREE.Vector3(0.0, Math.SQRT1_2, -Math.SQRT1_2));
    });

    it('resolves the +X singularity toward +Y', () => {
      const limit = prepareLimit(new VRMSpringBoneLimitHinge({ angle: Math.PI / 4.0 }));
      const tailDir = POSITIVE_X.clone();

      expect(limit.calculateLimit(tailDir)).toBe(true);
      expect(tailDir).toBeCloseToVector3(POSITIVE_Y);
    });

    it('resolves the -X singularity toward +Y', () => {
      const limit = prepareLimit(new VRMSpringBoneLimitHinge({ angle: Math.PI / 4.0 }));
      const tailDir = NEGATIVE_X.clone();

      expect(limit.calculateLimit(tailDir)).toBe(true);
      expect(tailDir).toBeCloseToVector3(POSITIVE_Y);
    });

    it('resolves the -Y singularity toward +Z-side boundary', () => {
      const limit = prepareLimit(new VRMSpringBoneLimitHinge({ angle: Math.PI / 4.0 }));
      const tailDir = NEGATIVE_Y.clone();

      expect(limit.calculateLimit(tailDir)).toBe(true);
      expect(tailDir).toBeCloseToVector3(new THREE.Vector3(0.0, Math.SQRT1_2, Math.SQRT1_2));
    });

    it('respects the configured limit rotation', () => {
      const limit = prepareLimit(new VRMSpringBoneLimitHinge({ angle: Math.PI / 4.0, rotation: QUAT_PX90 }));
      const tailDir = POSITIVE_Y.clone();

      expect(limit.calculateLimit(tailDir)).toBe(true);
      expect(tailDir).toBeCloseToVector3(new THREE.Vector3(0.0, Math.SQRT1_2, Math.SQRT1_2));
    });
  });
});
