import * as THREE from 'three';
import { LimitBufferGeometry } from './LimitBufferGeometry';
import { VRMSpringBoneLimitSpherical } from '../../VRMSpringBoneLimitSpherical';

const ARC_SEGMENTS = 17;

export class LimitSphericalBufferGeometry extends THREE.BufferGeometry implements LimitBufferGeometry {
  private readonly _attrPos: THREE.BufferAttribute;
  private readonly _attrIndex: THREE.BufferAttribute;
  private readonly _limit: VRMSpringBoneLimitSpherical;
  private _currentPitch = 0;
  private _currentYaw = 0;

  public constructor(limit: VRMSpringBoneLimitSpherical) {
    super();

    this._limit = limit;

    this._attrPos = new THREE.BufferAttribute(new Float32Array(3 * (ARC_SEGMENTS + 4 * (ARC_SEGMENTS - 1) + 1)), 3);
    this.setAttribute('position', this._attrPos);

    this._attrIndex = new THREE.BufferAttribute(new Uint16Array(2 * (5 * (ARC_SEGMENTS - 1) + 6)), 1);
    this.setIndex(this._attrIndex);

    this._buildIndex();
    this.update();
  }

  public update(): void {
    let shouldUpdateGeometry = false;

    if (this._currentPitch !== this._limit.pitch) {
      this._currentPitch = this._limit.pitch;
      shouldUpdateGeometry = true;
    }

    if (this._currentYaw !== this._limit.yaw) {
      this._currentYaw = this._limit.yaw;
      shouldUpdateGeometry = true;
    }

    if (shouldUpdateGeometry) {
      this._buildPosition();
    }
  }

  private _buildPosition(): void {
    // y-z pitch angle
    for (let i = 0; i < ARC_SEGMENTS; i++) {
      const pitch = this._currentPitch * (2.0 * (i / (ARC_SEGMENTS - 1)) - 1.0);

      this._attrPos.setXYZ(i, 0, Math.cos(pitch), Math.sin(pitch));
    }

    // pitch arc at edges
    {
      const cosYaw = Math.cos(this._currentYaw);
      const sinYaw = Math.sin(this._currentYaw);

      for (let i = 0; i < ARC_SEGMENTS - 1; i++) {
        const pitch = this._currentPitch * (2.0 * (i / (ARC_SEGMENTS - 1)) - 1.0);
        const cosPitch = Math.cos(pitch);
        const sinPitch = Math.sin(pitch);

        this._attrPos.setXYZ(ARC_SEGMENTS + i, sinYaw, cosYaw * cosPitch, cosYaw * sinPitch);
        this._attrPos.setXYZ(ARC_SEGMENTS + 2 * (ARC_SEGMENTS - 1) + i, -sinYaw, cosYaw * cosPitch, -cosYaw * sinPitch);
      }
    }

    // yaw arc at edges
    {
      const cosPitch = Math.cos(this._currentPitch);
      const sinPitch = Math.sin(this._currentPitch);

      for (let i = 0; i < ARC_SEGMENTS - 1; i++) {
        const yaw = this._currentYaw * (2.0 * (i / (ARC_SEGMENTS - 1)) - 1.0);
        const cosYaw = Math.cos(yaw);
        const sinYaw = Math.sin(yaw);

        this._attrPos.setXYZ(ARC_SEGMENTS + ARC_SEGMENTS - 1 + i, -sinYaw, cosYaw * cosPitch, cosYaw * sinPitch);
        this._attrPos.setXYZ(ARC_SEGMENTS + 3 * (ARC_SEGMENTS - 1) + i, sinYaw, cosYaw * cosPitch, -cosYaw * sinPitch);
      }
    }

    this._attrPos.setXYZ(ARC_SEGMENTS + 4 * (ARC_SEGMENTS - 1), 0, 0, 0);

    this._attrPos.needsUpdate = true;
  }

  private _buildIndex(): void {
    for (let i = 0; i < ARC_SEGMENTS - 1; i++) {
      this._attrIndex.setXY(i * 2, i, i + 1);
    }

    for (let i = 0; i < 4 * (ARC_SEGMENTS - 1); i++) {
      const i1 = (i + 1) % (4 * (ARC_SEGMENTS - 1));
      this._attrIndex.setXY(2 * (ARC_SEGMENTS - 1 + i), ARC_SEGMENTS + i, ARC_SEGMENTS + i1);
    }

    this._attrIndex.setXY(2 * (5 * (ARC_SEGMENTS - 1)), ARC_SEGMENTS + 4 * (ARC_SEGMENTS - 1), 0);
    this._attrIndex.setXY(2 * (5 * (ARC_SEGMENTS - 1) + 1), ARC_SEGMENTS + 4 * (ARC_SEGMENTS - 1), ARC_SEGMENTS - 1);
    this._attrIndex.setXY(2 * (5 * (ARC_SEGMENTS - 1) + 2), ARC_SEGMENTS + 4 * (ARC_SEGMENTS - 1), ARC_SEGMENTS);
    this._attrIndex.setXY(
      2 * (5 * (ARC_SEGMENTS - 1) + 3),
      ARC_SEGMENTS + 4 * (ARC_SEGMENTS - 1),
      ARC_SEGMENTS + (ARC_SEGMENTS - 1),
    );
    this._attrIndex.setXY(
      2 * (5 * (ARC_SEGMENTS - 1) + 4),
      ARC_SEGMENTS + 4 * (ARC_SEGMENTS - 1),
      ARC_SEGMENTS + 2 * (ARC_SEGMENTS - 1),
    );
    this._attrIndex.setXY(
      2 * (5 * (ARC_SEGMENTS - 1) + 5),
      ARC_SEGMENTS + 4 * (ARC_SEGMENTS - 1),
      ARC_SEGMENTS + 3 * (ARC_SEGMENTS - 1),
    );

    this._attrIndex.needsUpdate = true;
  }
}
