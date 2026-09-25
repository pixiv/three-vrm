import * as THREE from 'three';
import { LimitBufferGeometry } from './LimitBufferGeometry';
import { VRMSpringBoneLimitHinge } from '../../VRMSpringBoneLimitHinge';

const ARC_SEGMENTS = 17;

export class LimitHingeBufferGeometry extends THREE.BufferGeometry implements LimitBufferGeometry {
  private readonly _attrPos: THREE.BufferAttribute;
  private readonly _attrIndex: THREE.BufferAttribute;
  private readonly _limit: VRMSpringBoneLimitHinge;
  private _currentAngle = 0;

  public constructor(limit: VRMSpringBoneLimitHinge) {
    super();

    this._limit = limit;

    this._attrPos = new THREE.BufferAttribute(new Float32Array(3 * (ARC_SEGMENTS + 1)), 3);
    this.setAttribute('position', this._attrPos);

    this._attrIndex = new THREE.BufferAttribute(new Uint16Array(2 * (ARC_SEGMENTS + 1)), 1);
    this.setIndex(this._attrIndex);

    this._buildIndex();
    this.update();
  }

  public update(): void {
    let shouldUpdateGeometry = false;

    if (this._currentAngle !== this._limit.angle) {
      this._currentAngle = this._limit.angle;
      shouldUpdateGeometry = true;
    }

    if (shouldUpdateGeometry) {
      this._buildPosition();
    }
  }

  private _buildPosition(): void {
    for (let i = 0; i < ARC_SEGMENTS; i++) {
      const t = this._currentAngle * (2.0 * (i / (ARC_SEGMENTS - 1)) - 1.0);

      this._attrPos.setXYZ(i, 0, Math.cos(t), Math.sin(t));
    }

    this._attrPos.setXYZ(ARC_SEGMENTS, 0, 0, 0);

    this._attrPos.needsUpdate = true;
  }

  private _buildIndex(): void {
    for (let i = 0; i < ARC_SEGMENTS - 1; i++) {
      this._attrIndex.setXY(i * 2, i, i + 1);
    }

    this._attrIndex.setXY(ARC_SEGMENTS * 2 - 2, ARC_SEGMENTS - 1, ARC_SEGMENTS);
    this._attrIndex.setXY(ARC_SEGMENTS * 2, ARC_SEGMENTS, 0);

    this._attrIndex.needsUpdate = true;
  }
}
