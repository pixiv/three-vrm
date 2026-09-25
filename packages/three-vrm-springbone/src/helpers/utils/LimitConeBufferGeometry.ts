import * as THREE from 'three';
import { LimitBufferGeometry } from './LimitBufferGeometry';
import { VRMSpringBoneLimitCone } from '../../VRMSpringBoneLimitCone';

const QUARTER_ARC_SEGMENTS = 4;
const ARC_SEGMENTS = 4 * QUARTER_ARC_SEGMENTS;

export class LimitConeBufferGeometry extends THREE.BufferGeometry implements LimitBufferGeometry {
  private readonly _attrPos: THREE.BufferAttribute;
  private readonly _attrIndex: THREE.BufferAttribute;
  private readonly _limit: VRMSpringBoneLimitCone;
  private _currentAngle = 0;

  public constructor(limit: VRMSpringBoneLimitCone) {
    super();

    this._limit = limit;

    this._attrPos = new THREE.BufferAttribute(new Float32Array(3 * (ARC_SEGMENTS + 1)), 3);
    this.setAttribute('position', this._attrPos);

    this._attrIndex = new THREE.BufferAttribute(new Uint16Array(2 * (ARC_SEGMENTS + 4)), 1);
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
    const cos = Math.cos(this._currentAngle);
    const sin = Math.sin(this._currentAngle);

    for (let i = 0; i < ARC_SEGMENTS; i++) {
      const t = 2.0 * Math.PI * (i / ARC_SEGMENTS);

      this._attrPos.setXYZ(i, sin * Math.cos(t), cos, sin * Math.sin(t));
    }

    this._attrPos.setXYZ(ARC_SEGMENTS, 0, 0, 0);

    this._attrPos.needsUpdate = true;
  }

  private _buildIndex(): void {
    for (let i = 0; i < ARC_SEGMENTS; i++) {
      const i1 = (i + 1) % ARC_SEGMENTS;

      this._attrIndex.setXY(i * 2, i, i1);
    }

    this._attrIndex.setXY(ARC_SEGMENTS * 2, ARC_SEGMENTS, 0);
    this._attrIndex.setXY(ARC_SEGMENTS * 2 + 2, ARC_SEGMENTS, QUARTER_ARC_SEGMENTS);
    this._attrIndex.setXY(ARC_SEGMENTS * 2 + 4, ARC_SEGMENTS, 2 * QUARTER_ARC_SEGMENTS);
    this._attrIndex.setXY(ARC_SEGMENTS * 2 + 6, ARC_SEGMENTS, 3 * QUARTER_ARC_SEGMENTS);

    this._attrIndex.needsUpdate = true;
  }
}
