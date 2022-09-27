import * as THREE from 'three';

export class FanBufferGeometry extends THREE.BufferGeometry {
  public theta: number;
  public radius: number;
  private _currentTheta = 0;
  private _currentRadius = 0;
  private readonly _attrPos: THREE.BufferAttribute;
  private readonly _attrIndex: THREE.BufferAttribute;

  public constructor() {
    super();

    this.theta = 0.0;
    this.radius = 0.0;
    this._currentTheta = 0.0;
    this._currentRadius = 0.0;

    this._attrPos = new THREE.BufferAttribute(new Float32Array(65 * 3), 3);
    this.setAttribute('position', this._attrPos);

    this._attrIndex = new THREE.BufferAttribute(new Uint16Array(3 * 63), 1);
    this.setIndex(this._attrIndex);

    this._buildIndex();
    this.update();
  }

  public update(): void {
    let shouldUpdateGeometry = false;

    if (this._currentTheta !== this.theta) {
      this._currentTheta = this.theta;
      shouldUpdateGeometry = true;
    }

    if (this._currentRadius !== this.radius) {
      this._currentRadius = this.radius;
      shouldUpdateGeometry = true;
    }

    if (shouldUpdateGeometry) {
      this._buildPosition();
    }
  }

  private _buildPosition(): void {
    this._attrPos.setXYZ(0, 0.0, 0.0, 0.0);

    for (let i = 0; i < 64; i++) {
      const t = (i / 63.0) * this._currentTheta;

      this._attrPos.setXYZ(i + 1, this._currentRadius * Math.sin(t), 0.0, this._currentRadius * Math.cos(t));
    }

    this._attrPos.needsUpdate = true;
  }

  private _buildIndex(): void {
    for (let i = 0; i < 63; i++) {
      this._attrIndex.setXYZ(i * 3, 0, i + 1, i + 2);
    }

    this._attrIndex.needsUpdate = true;
  }
}
