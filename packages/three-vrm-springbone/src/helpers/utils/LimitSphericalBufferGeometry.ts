import * as THREE from 'three';
import { LimitBufferGeometry } from './LimitBufferGeometry';
import { VRMSpringBoneLimitSpherical } from '../../VRMSpringBoneLimitSpherical';

const ARC_SEGMENTS = 17;

export class LimitSphericalBufferGeometry extends THREE.BufferGeometry implements LimitBufferGeometry {
  private readonly _attrPos: THREE.BufferAttribute;
  private readonly _attrIndex: THREE.BufferAttribute;
  private readonly _limit: VRMSpringBoneLimitSpherical;
  private _currentPhi = 0;
  private _currentTheta = 0;

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

    if (this._currentPhi !== this._limit.phi) {
      this._currentPhi = this._limit.phi;
      shouldUpdateGeometry = true;
    }

    if (this._currentTheta !== this._limit.theta) {
      this._currentTheta = this._limit.theta;
      shouldUpdateGeometry = true;
    }

    if (shouldUpdateGeometry) {
      this._buildPosition();
    }
  }

  private _buildPosition(): void {
    // y-z phi angle
    for (let i = 0; i < ARC_SEGMENTS; i++) {
      const phi = this._currentPhi * (2.0 * (i / (ARC_SEGMENTS - 1)) - 1.0);

      this._attrPos.setXYZ(i, 0, Math.cos(phi), Math.sin(phi));
    }

    // phi arc at edges
    {
      const cosTheta = Math.cos(this._currentTheta);
      const sinTheta = Math.sin(this._currentTheta);

      for (let i = 0; i < ARC_SEGMENTS - 1; i++) {
        const phi = this._currentPhi * (2.0 * (i / (ARC_SEGMENTS - 1)) - 1.0);
        const cosPhi = Math.cos(phi);
        const sinPhi = Math.sin(phi);

        this._attrPos.setXYZ(ARC_SEGMENTS + i, sinTheta, cosTheta * cosPhi, cosTheta * sinPhi);
        this._attrPos.setXYZ(
          ARC_SEGMENTS + 2 * (ARC_SEGMENTS - 1) + i,
          -sinTheta,
          cosTheta * cosPhi,
          -cosTheta * sinPhi,
        );
      }
    }

    // theta arc at edges
    {
      const cosPhi = Math.cos(this._currentPhi);
      const sinPhi = Math.sin(this._currentPhi);

      for (let i = 0; i < ARC_SEGMENTS - 1; i++) {
        const theta = this._currentTheta * (2.0 * (i / (ARC_SEGMENTS - 1)) - 1.0);
        const cosTheta = Math.cos(theta);
        const sinTheta = Math.sin(theta);

        this._attrPos.setXYZ(ARC_SEGMENTS + ARC_SEGMENTS - 1 + i, -sinTheta, cosTheta * cosPhi, cosTheta * sinPhi);
        this._attrPos.setXYZ(
          ARC_SEGMENTS + 3 * (ARC_SEGMENTS - 1) + i,
          sinTheta,
          cosTheta * cosPhi,
          -cosTheta * sinPhi,
        );
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
