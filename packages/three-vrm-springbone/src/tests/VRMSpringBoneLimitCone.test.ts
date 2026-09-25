import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { VRMSpringBoneLimitCone } from '../VRMSpringBoneLimitCone';
import './matchers/toBeCloseToVector3';

const IDENTITY_MATRIX = new THREE.Matrix4();
const POSITIVE_Y = new THREE.Vector3(0.0, 1.0, 0.0);
const NEGATIVE_Y = new THREE.Vector3(0.0, -1.0, 0.0);
const QUAT_PZ90 = new THREE.Quaternion(0.0, 0.0, 0.707, 0.707);

function prepareLimit(limit: VRMSpringBoneLimitCone, boneAxis = POSITIVE_Y): VRMSpringBoneLimitCone {
  limit.internalPrecalcRotation(IDENTITY_MATRIX, boneAxis);
  return limit;
}

describe('VRMSpringBoneLimitCone', () => {
  describe('input angle clamping', () => {
    it('clamps angles to [0, PI]', () => {
      expect(new VRMSpringBoneLimitCone({ angle: -1.0 }).angle).toBe(0.0);
      expect(new VRMSpringBoneLimitCone({ angle: 3.15 }).angle).toBe(Math.PI);
    });
  });

  describe('calculateLimit', () => {
    it('leaves a direction inside the cone unchanged', () => {
      const limit = prepareLimit(new VRMSpringBoneLimitCone({ angle: Math.PI / 4.0 }));
      const tailDir = POSITIVE_Y.clone();

      expect(limit.calculateLimit(tailDir)).toBe(false);
      expect(tailDir).toBeCloseToVector3(POSITIVE_Y);
    });

    it('constrains a direction to the cone boundary', () => {
      const limit = prepareLimit(new VRMSpringBoneLimitCone({ angle: Math.PI / 4.0 }));
      const tailDir = new THREE.Vector3(Math.SQRT1_2, 0.0, -Math.SQRT1_2);

      expect(limit.calculateLimit(tailDir)).toBe(true);
      expect(tailDir).toBeCloseToVector3(new THREE.Vector3(0.5, Math.SQRT1_2, -0.5));
    });

    it('resolves the -Y singularity toward +Z-side boundary', () => {
      const limit = prepareLimit(new VRMSpringBoneLimitCone({ angle: Math.PI / 4.0 }));
      const tailDir = NEGATIVE_Y.clone();

      expect(limit.calculateLimit(tailDir)).toBe(true);
      expect(tailDir).toBeCloseToVector3(new THREE.Vector3(0.0, Math.SQRT1_2, Math.SQRT1_2));
    });

    it('respects the configured limit rotation', () => {
      const limit = prepareLimit(new VRMSpringBoneLimitCone({ angle: Math.PI / 4.0, rotation: QUAT_PZ90 }));
      const tailDir = POSITIVE_Y.clone();

      expect(limit.calculateLimit(tailDir)).toBe(true);
      expect(tailDir).toBeCloseToVector3(new THREE.Vector3(-Math.SQRT1_2, Math.SQRT1_2, 0.0));
    });
  });
});
