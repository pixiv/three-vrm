import * as THREE from 'three';
import type { VRMSpringBoneJoint } from './VRMSpringBoneJoint';
import type { VRMSpringBoneLimitHelper } from './helpers/VRMSpringBoneLimitHelper';

const VEC3_POSITIVE_Y = /*@__PURE__*/ new THREE.Vector3(0, 1, 0);

const _quatBoneAxis = /*@__PURE__*/ new THREE.Quaternion();

/**
 * Represents an angle limit of a spring bone.
 */
export abstract class VRMSpringBoneLimit {
  /**
   * The rotation from the default orientation of the cone limit.
   */
  public rotation: THREE.Quaternion;

  /**
   * The cache for the total rotation of the cone limit.
   * It will be calculated in {@link internalPrecalcRotation}.
   */
  protected _totalRotationCache: THREE.Quaternion;

  /**
   * The cache for the total rotation of the cone limit.
   * It will be calculated in {@link internalPrecalcRotation}.
   *
   * This is a public property to use in {@link VRMSpringBoneLimitHelper}.
   * Do not touch this property as we might change the interface without notice.
   */
  public get internalTotalRotationCache(): THREE.Quaternion {
    return this._totalRotationCache;
  }

  /**
   * The cache for the inverse of the {@link _totalRotationCache}.
   * It will be calculated in {@link internalPrecalcRotation}.
   */
  protected _totalRotationInvCache: THREE.Quaternion;

  public constructor() {
    this.rotation = new THREE.Quaternion();
    this._totalRotationCache = new THREE.Quaternion();
    this._totalRotationInvCache = new THREE.Quaternion();
  }

  /**
   * Precalculate the rotation of the limit.
   *
   * This is intended to be called from {@link VRMSpringBoneJoint.update}.
   * Do not touch this property as we might change the interface without notice.
   *
   * @param worldSpaceInitialMatrix The initial local matrix in the current world space
   * @param boneAxis The initial axis of the child bone, in local unit
   */
  public internalPrecalcRotation(worldSpaceInitialMatrix: THREE.Matrix4, boneAxis: THREE.Vector3): void {
    _quatBoneAxis.setFromUnitVectors(VEC3_POSITIVE_Y, boneAxis);
    this._totalRotationCache
      .setFromRotationMatrix(worldSpaceInitialMatrix)
      .normalize()
      .multiply(_quatBoneAxis)
      .multiply(this.rotation);
    this._totalRotationInvCache.copy(this._totalRotationCache).invert();
  }

  /**
   * Calculate the limit direction.
   * If the direction is limited, it will return `true`.
   *
   * @param tailDir The tail direction in world space
   */
  public abstract calculateLimit(tailDir: THREE.Vector3): boolean;
}
